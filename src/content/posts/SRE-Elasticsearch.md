---
title: Elasticsearch-7.17.9-SRE-ANALYSIS
slug: Elasticsearch-7.17.9-SRE-ANALYSIS
published: 2026-09-16
description: 目标：建立“源码 → 配置 → 指标 → 日志 → 告警 → 根因 → 恢复 → 自动化”的闭环。
image: '../../assets/images/Dota-img/luna.png'
tags:
  - Elasticsearch
  - SRE
category: SRE
draft: false
lang: zh-CN
pinned: false
comment: true
---
# Elasticsearch 7.17.9 源码驱动的 SRE 分析体系

> 适用范围：本仓库的 [`Version.CURRENT`](../server/src/main/java/org/elasticsearch/Version.java#L172) 为 Elasticsearch 7.17.9。本文以 `server/src/main/java` 的实现为主，X-Pack 特有能力不作为基础可用性判断的前提。
>
> 核心原则：先判断控制面还是数据面，再用“集群 → 节点 → 资源 → 线程池 → 索引 → 分片 → 请求”逐层缩小范围，最后回到产生状态、指标或日志的源码位置。

## 0. 统一分析模型

### 0.1 证据链

每个事件都按以下链路保存证据，不以单条日志直接定根因：

```text
业务 SLO 受损
  → REST/Exporter 指标异常
  → 集群或节点状态变化
  → 日志中的状态转换/异常
  → 当前配置与默认值的差异
  → 对应线程、队列、分片或资源
  → 源码中的触发条件与异常分支
  → 可验证的根因假设
  → 恢复动作及恢复后反证
```

### 0.2 控制面与数据面

| 平面 | 核心对象 | 典型故障 | 首要证据 |
|---|---|---|---|
| 控制面 | master、`Coordinator`、`MasterService`、cluster state、allocation | 无主、状态发布超时、分片长期未分配 | `_cluster/health`、pending tasks、master 日志、cluster state 版本 |
| 数据面 | shard、`IndexShard`、`InternalEngine`、search/bulk action、thread pool | 搜索超时、写入拒绝、GC、磁盘阻塞、恢复拥塞 | `_nodes/stats`、索引/分片 stats、slowlog、拒绝计数 |

控制面异常会向所有索引传播；数据面异常通常先集中在某些节点、索引或分片。告警路由和处置优先级必须体现这一差异。

## 1. 架构与核心组件

### 1.1 节点生命周期

进程入口由 [`Elasticsearch.java`](../server/src/main/java/org/elasticsearch/bootstrap/Elasticsearch.java) 进入 [`Bootstrap.java`](../server/src/main/java/org/elasticsearch/bootstrap/Bootstrap.java)，配置环境在 [`InternalSettingsPreparer.java`](../server/src/main/java/org/elasticsearch/node/InternalSettingsPreparer.java#L52) 中准备。它固定读取 `config/elasticsearch.yml`，再由 `SettingsModule` 注册并校验节点级和集群级设置。

[`Node.start()`](../server/src/main/java/org/elasticsearch/node/Node.java#L1143) 的关键启动顺序是：

1. 启动 indices、cluster-state shard listener、snapshot、repository、search、文件系统健康检查和资源监控。
2. 启动节点连接、gateway 和 transport。
3. 加载持久化元数据，启动 discovery。
4. 启动 `ClusterService`，等待首次 discovery state。
5. 最后启动 HTTP transport，对外提供 REST 服务。

因此：

- transport 未就绪时 HTTP 不应被当作节点已完全可服务的唯一判据；
- 日志出现 `started` 代表完整启动序列完成；
- 卡在 `waiting to join the cluster` 应优先查 discovery/transport/master，而不是业务索引；
- `FsHealthService` 在 discovery 之前启动，磁盘路径或 node lock 异常可阻止节点以健康状态加入。

停止顺序在 [`Node.close()`](../server/src/main/java/org/elasticsearch/node/Node.java#L1338) 中显式编排，避免先销毁线程池而仍有组件提交任务。

### 1.2 集群协调与状态发布

核心组件：

- [`Coordinator`](../server/src/main/java/org/elasticsearch/cluster/coordination/Coordinator.java)：选主、join、leader/follower 检查、cluster state 发布。
- [`MasterService`](../server/src/main/java/org/elasticsearch/cluster/service/MasterService.java)：在单一 `masterService#updateTask` 线程中串行执行 cluster state update task。
- [`Publication`](../server/src/main/java/org/elasticsearch/cluster/coordination/Publication.java)：先发布 proposed state，获得提交法定票数后发送 apply-commit。
- [`ClusterApplierService`](../server/src/main/java/org/elasticsearch/cluster/service/ClusterApplierService.java)：每个节点串行应用已提交的 cluster state。
- [`GatewayService`](../server/src/main/java/org/elasticsearch/gateway/GatewayService.java)：首次选主后恢复持久化 cluster metadata。

关键状态流：

```text
REST/内部事件
  → submitStateUpdateTask
  → MasterService 串行计算新 ClusterState
  → Coordinator.publish
  → Publication 向 master-eligible 节点收集响应
  → 达到法定票数，提交
  → 各节点 ClusterApplierService.applyChanges
  → routing/index settings/listener 生效
```

控制面延迟可能发生在三个不同阶段：

1. `pending_tasks` 增长：任务排队，master update thread 忙或被长任务阻塞。
2. 计算慢：`MasterService` 输出 slow master task。
3. 发布/应用慢：日志出现 `failed to commit cluster state`、`took ... failed to publish` 或 `failed to apply updated cluster state`。

### 1.3 分片分配与恢复

[`AllocationService`](../server/src/main/java/org/elasticsearch/cluster/routing/allocation/AllocationService.java) 根据 allocation deciders 和 allocator 生成 routing table。关键 decider 包括：

- `DiskThresholdDecider`：磁盘水位；
- `ThrottlingAllocationDecider`：节点并发恢复；
- `ConcurrentRebalanceAllocationDecider`：全集群并发 rebalance；
- `AwarenessAllocationDecider`：机架/可用区感知；
- `FilterAllocationDecider`：include/exclude/require；
- `SameShardAllocationDecider`：主副本不得共置；
- `EnableAllocationDecider`：是否允许 allocation/rebalance。

`DiskThresholdMonitor` 消费 cluster info：

- 超过 low：不再向节点分配 replica；
- 超过 high：触发 reroute，将 shard 迁出；
- 超过 flood stage：给节点上所有相关索引设置 `index.blocks.read_only_allow_delete`；
- 水位恢复后，7.17.9 默认自动解除该 block。

分片恢复从 [`IndexShard.startRecovery()`](../server/src/main/java/org/elasticsearch/index/shard/IndexShard.java#L3127) 进入，按本地 store、peer、snapshot 或 empty store 等恢复源分派。peer recovery 经过文件阶段、translog/sequence-number 操作回放、finalize，再转为 started。

### 1.4 写入链路

```text
HTTP _bulk/index
  → TransportBulkAction.doExecute
  → ingest pipeline / auto-create index
  → 按 shard 分组
  → TransportShardBulkAction.performOnPrimary
  → IndexShard.applyIndexOperationOnPrimary
  → InternalEngine.index
  → Lucene IndexWriter + Translog
  → TransportReplicationAction 复制到 in-sync replicas
  → ack
```

源码入口：

- [`TransportBulkAction.doExecute()`](../server/src/main/java/org/elasticsearch/action/bulk/TransportBulkAction.java#L183)
- [`TransportShardBulkAction.performOnPrimary()`](../server/src/main/java/org/elasticsearch/action/bulk/TransportShardBulkAction.java#L161)
- [`IndexShard.applyIndexOperationOnPrimary()`](../server/src/main/java/org/elasticsearch/index/shard/IndexShard.java#L890)
- [`InternalEngine`](../server/src/main/java/org/elasticsearch/index/engine/InternalEngine.java)

写入可靠性依赖 primary term、sequence number、local/global checkpoint 和 in-sync allocation IDs。默认 `index.translog.durability=request`，成功响应前执行 translog durability 语义；改为 `async` 会扩大节点崩溃时的数据丢失窗口。

### 1.5 搜索链路

```text
HTTP _search
  → TransportSearchAction.doExecute
  → 解析目标索引和 shard iterator
  → AbstractSearchAsyncAction fan-out
  → 每个 shard 的 SearchService query/DFS
  → 协调节点 reduce
  → 必要时 fetch phase
  → 合并 SearchResponse
```

源码入口：

- [`TransportSearchAction.doExecute()`](../server/src/main/java/org/elasticsearch/action/search/TransportSearchAction.java#L284)
- [`AbstractSearchAsyncAction`](../server/src/main/java/org/elasticsearch/action/search/AbstractSearchAsyncAction.java#L57)：分片失败时尝试下一个副本。
- [`SearchService.executeQueryPhase()`](../server/src/main/java/org/elasticsearch/search/SearchService.java#L462)
- [`SearchService.executeFetchPhase()`](../server/src/main/java/org/elasticsearch/search/SearchService.java#L742)

搜索是 fan-out/fan-in 模型。单个慢分片、过多 shards、聚合 bucket 爆炸或协调节点 heap 压力，都能抬高端到端延迟。

### 1.6 线程与执行模型

[`ThreadPool`](../server/src/main/java/org/elasticsearch/threadpool/ThreadPool.java#L190) 按处理器数构造线程池：

| 线程池 | 类型/默认队列 | 主要工作 | 风险信号 |
|---|---|---|---|
| `write` | fixed，size=`processors`，queue=10000 | bulk/index/delete/update | queue 持续增长、rejected 增量 |
| `search` | fixed auto queue，size=`(processors*3)/2+1`，初始 queue=1000 | shard query/fetch | active 饱和、rejected、P99 上升 |
| `search_coordination` | fixed，约 `processors/2`，queue=1000 | 协调/reduce | 大聚合、跨大量 shard 查询 |
| `get` | fixed，size=`processors`，queue=1000 | GET | 热点 routing/id |
| `management` | scaling 1..min(5, processors) | 管理动作 | 控制面辅助任务迟滞 |
| `refresh` | scaling | refresh | segment 增长、IO 压力 |
| `flush` | scaling | flush/translog commit | 磁盘慢、translog 堆积 |
| `generic` | scaling | 恢复及通用异步任务 | 恢复风暴、插件任务 |

线程池拒绝是保护结果，不是根因。根因通常是下游 CPU、heap、磁盘、远端节点或 shard fan-out 无法及时消费任务。

## 2. 源码实现

### 2.1 配置加载与动态更新

1. `Bootstrap` 调用 `InternalSettingsPreparer.prepareEnvironment()`。
2. `InternalSettingsPreparer` 合并启动参数、系统属性和 `elasticsearch.yml`。
3. `SettingsModule` 注册已知 setting；未知、非法或 secure setting 放错位置会失败。
4. 节点级静态设置在启动时固化。
5. 带 `Dynamic`/`OperatorDynamic` 属性的设置通过 cluster settings API 更新。
6. `ClusterApplierService.applyChanges()` 先应用 incoming persistent/transient settings，再通知其他 appliers/listeners。

排障时必须同时采集：

```http
GET /_cluster/settings?include_defaults=true&flat_settings=true
GET /_nodes/settings?flat_settings=true
```

不要只看 `elasticsearch.yml`：动态 cluster setting 可能覆盖文件配置。

### 2.2 Cluster state 状态机

`MasterService` 串行执行任务并等待 publication 完成。源码在发布期间会阻塞等待 future，因此网络慢、部分 master-eligible 节点应用慢或状态过大，都能反压后续 cluster tasks。

关键日志与源码语义：

| 日志片段 | 源码位置 | 语义 |
|---|---|---|
| `failing [...]: failed to commit cluster state version` | `MasterService.onPublicationFailed()` | 未成功提交，不是普通 listener 异常 |
| `took [...] and then failed to publish updated cluster state` | `MasterService.handleException()` | 发布失败，关注网络、GC、目标节点应用时间 |
| `failed to apply updated cluster state` | `ClusterApplierService` | 某节点应用已提交状态失败或过慢 |
| `master node changed` / node delta | `ClusterApplierService.applyChanges()` | 成员或 master 发生变化 |
| slow master task | `MasterService.logExecutionTime()` | cluster state 计算/通知超过阈值 |

### 2.3 异常与保护机制

- `EsRejectedExecutionException`：线程池或 indexing pressure 主动拒绝，通常映射 HTTP 429。
- `CircuitBreakingException`：预计或实际内存超过 breaker limit，保护进程免于 OOM。
- `FailedToCommitClusterStateException`：控制面 publication 无法形成提交。
- shard failure：通过 `ShardStateAction` 上报 master，随后 routing 变为 failed/unassigned 并触发重新分配。
- corruption：engine/store 标记损坏，副本可用时从健康 copy 恢复；没有健康副本时不能通过重启“修好”。

## 3. 配置参数

### 3.1 源码默认值与建议

| 参数 | 7.17.9 源码默认值 | 推荐策略 | 影响路径 |
|---|---:|---|---|
| `cluster.publish.info_timeout` | 10s | 保持默认；触发即调查 | publication 慢日志 |
| `cluster.publish.timeout` | 30s | 不用加大掩盖网络/GC；跨高延迟网络需压测 | master 提交 cluster state |
| `cluster.service.slow_master_task_logging_threshold` | 10s | 生产可按控制面 SLO 调至 5–10s | master update task |
| follower/leader check `interval` | 1s | 保持默认 | 故障检测频率 |
| follower/leader check `timeout` | 10s | 同城保持默认；不要为偶发 GC 随意加大 | 单次探测 |
| follower/leader check `retry_count` | 3 | 保持默认；网络抖动先修网络 | 宣告节点/master 失败 |
| disk low/high/flood | 85%/90%/95% 已用空间 | 大盘建议同时设置绝对剩余空间；阈值间要留出至少一次迁移窗口 | allocation/reroute/index block |
| disk reroute interval | 60s | 保持默认，避免频繁 reroute | disk monitor |
| parent breaker | 实际内存模式 95% | 保持 real-memory；不要用提高上限代替减载 | 所有 child breaker + real heap |
| fielddata breaker | 40% heap，overhead 1.03 | keyword/doc_values 优先，不依赖调大 | fielddata |
| request breaker | 60% heap | 聚合/大请求应限流和拆分 | request accounting |
| inflight breaker | 100% heap，overhead 2.0 | 限制 bulk/request 大小 | transport/http in-flight |
| `indexing_pressure.memory.limit` | 10% heap | 默认优先；用 429 驱动客户端退避 | coordinating+primary，replica 为其 1.5 倍 |
| `indices.recovery.max_bytes_per_sec` | 40MB/s | 以磁盘 30–50% 可持续带宽起步压测 | peer/snapshot recovery |
| incoming/outgoing recoveries | 2/2 | HDD 保守；SSD 只在 IO/CPU 有余量时逐级加 | 节点恢复并发 |
| initial primary recoveries | 4 | 本地盘恢复通常可保持；监控 IO await | primary local recovery |
| cluster concurrent rebalance | 2 | 保持默认，扩容窗口可临时提高并回滚 | rebalance |
| `index.refresh_interval` | 1s | 日志/批量写入常用 5–30s；有实时要求保留 1s | refresh、segment、搜索可见性 |
| translog durability | `request` | 强一致生产保持 | 写响应与持久性 |
| translog sync interval | 5s | 仅对 `async` durability 影响关键 | fsync |
| translog flush threshold | 512MB | 通常保持；磁盘恢复时间要求可压测调整 | flush/recovery |
| `search.default_search_timeout` | -1，无默认超时 | 应按业务 SLO 设置请求 timeout；谨慎设全局值 | 长查询资源占用 |
| `search.max_open_scroll_context` | 500 | 优先改为 PIT/search_after；监控 open contexts | search context/heap |
| `search.max_buckets` | 65536 | 业务按需降低，禁止靠升高解决聚合失败 | aggregation/reduce/breaker |
| `cluster.max_shards_per_node` | 1000 | 这是安全上限，不是容量目标；目标通常远低于此值 | 创建索引时 shard 校验 |
| `monitor.fs.health.refresh_interval` | 120s | 保持默认 | 数据路径写+fsync 健康检查 |
| `monitor.fs.health.slow_path_logging_threshold` | 5s | SSD 可按基线收紧，但避免噪声 | FS health 日志 |
| GC overhead warn/info/debug | 50%/25%/10% | 保持默认，告警用指标提前量 | JVM GC monitor |

默认值依据：

- 磁盘设置：[`DiskThresholdSettings`](../server/src/main/java/org/elasticsearch/cluster/routing/allocation/DiskThresholdSettings.java#L31)
- 熔断器：[`HierarchyCircuitBreakerService`](../server/src/main/java/org/elasticsearch/indices/breaker/HierarchyCircuitBreakerService.java#L61)
- 写入压力：[`IndexingPressure`](../server/src/main/java/org/elasticsearch/index/IndexingPressure.java#L25)
- 恢复：[`RecoverySettings`](../server/src/main/java/org/elasticsearch/indices/recovery/RecoverySettings.java#L182)
- 故障检测：[`FollowersChecker`](../server/src/main/java/org/elasticsearch/cluster/coordination/FollowersChecker.java#L68)、[`LeaderChecker`](../server/src/main/java/org/elasticsearch/cluster/coordination/LeaderChecker.java#L64)
- 索引设置：[`IndexSettings`](../server/src/main/java/org/elasticsearch/index/IndexSettings.java#L75)
- 搜索限制：[`SearchService`](../server/src/main/java/org/elasticsearch/search/SearchService.java#L186)、[`MultiBucketConsumerService`](../server/src/main/java/org/elasticsearch/search/aggregations/MultiBucketConsumerService.java#L29)

### 3.2 不建议常态修改

- 不要关闭 `cluster.routing.allocation.disk.threshold_enabled`。
- 不要把 breaker 设置为超高值或禁用来“解决”429。
- 不要常态设置 `cluster.routing.allocation.enable=none`。
- 不要长期提高 recovery 并发而不观察磁盘 latency、merge 和业务 P99。
- 不要把 `index.number_of_replicas=0` 当容量优化。
- 不要在未理解法定票数时修改 voting exclusions 或强制选主相关状态。

## 4. 可观测性

### 4.1 指标产生位置

[`NodeService.stats()`](../server/src/main/java/org/elasticsearch/node/NodeService.java#L127) 是节点统计的聚合点，组合：

- indices/shard stats；
- OS、process、JVM；
- thread pool；
- filesystem；
- transport、HTTP；
- circuit breakers；
- discovery；
- ingest；
- indexing pressure。

REST 入口是 [`RestNodesStatsAction`](../server/src/main/java/org/elasticsearch/rest/action/admin/cluster/RestNodesStatsAction.java)，集群健康入口是 [`RestClusterHealthAction`](../server/src/main/java/org/elasticsearch/rest/action/admin/cluster/RestClusterHealthAction.java)。

最低采集集：

```http
GET /_cluster/health?level=indices
GET /_cluster/pending_tasks
GET /_nodes/stats/jvm,process,os,fs,thread_pool,breaker,transport,http,indices,ingest,indexing_pressure
GET /_nodes/hot_threads?threads=10&ignore_idle_threads=true
GET /_cat/allocation?v&bytes=gb
GET /_cat/shards?v&bytes=gb
GET /_cat/recovery?v&active_only=true&bytes=mb
GET /_cat/thread_pool/write,search,search_coordination?v
GET /_cluster/allocation/explain
GET /_tasks?detailed=true&group_by=parents
```

建议间隔：节点/集群指标 15–30s；索引维度 30–60s；分片明细按需拉取，避免监控本身扩大 cluster state/响应负担。

### 4.2 指标语义与关联

| REST 字段 | 类型 | 正确用法 | 关联分析 |
|---|---|---|---|
| `jvm.mem.heap_used_percent` | gauge | 看持续值和 GC 后基线 | 配合 old GC 时间、breaker、search/write queue |
| `jvm.gc.collectors.*.collection_time_in_millis` | counter | 对 counter 求 rate | 与延迟、CPU、heap sawtooth 对齐 |
| `thread_pool.*.rejected` | counter | 对 counter 求 increase/rate | 同时检查 active、queue 和下游资源 |
| `breakers.*.tripped` | counter | 看增量 | request/fielddata/inflight 类型决定业务来源 |
| `fs.data.available_in_bytes` | gauge | 按 node/path 取最小值 | 与 shard relocation、read-only block 关联 |
| `indices.indexing.index_time_in_millis` | counter | `rate(time)/rate(count)` 得平均时延 | 与 write rejection、merge、refresh 关联 |
| `indices.search.query_time_in_millis` | counter | 同上 | 与 search queue、slowlog、shard 数关联 |
| `indices.merges.current_size_in_bytes` | gauge | 看并发 merge 工作集 | 与磁盘吞吐、index throttle 关联 |
| `indices.refresh.total_time_in_millis` | counter | rate | 与 1s refresh、segment 数关联 |
| `indexing_pressure.*.rejections` | counter | 看角色维度增量 | 区分 coordinating/primary/replica |
| `discovery.cluster_state_queue.*` | gauge/counter | 查 cluster state backlog | 与 pending tasks、master 日志关联 |

### 4.3 日志

应结构化采集这些字段：`@timestamp`、`log.level`、`log.logger`、`elasticsearch.node.name`、`elasticsearch.cluster.name`、`trace.id`（若上游注入）、`message`、异常类型和 stacktrace。

关键 logger/模式：

| 类/模式 | 告警意义 |
|---|---|
| `o.e.c.c.Coordinator` + `master not discovered`/publication | 选主、法定票数或网络 |
| `o.e.c.s.MasterService` + `took`/`failed to commit` | master task 或发布 |
| `o.e.c.s.ClusterApplierService` + `failed to apply` | 节点应用状态失败 |
| `o.e.c.r.a.DiskThresholdMonitor` + `watermark` | low/high/flood 状态转换 |
| `o.e.m.j.JvmGcMonitorService` + `[gc] overhead` | GC 时间占比 |
| `o.e.m.f.FsHealthService` + `health check ... failed/took` | 数据路径不可写或 fsync 慢 |
| `o.e.i.e.InternalEngine` + `now throttling indexing` | merge backlog 触发写节流 |
| `CircuitBreakingException` | 内存保护 |
| `EsRejectedExecutionException` | thread pool/indexing pressure 拒绝 |
| `CorruptIndexException`/`mark store corrupted` | Lucene/store 损坏 |

日志是状态转换证据，指标是持续影响证据。只有日志、没有指标影响时通常不应直接触发最高级别事件。

### 4.4 Trace 与请求关联

7.17.9 核心并不提供覆盖搜索/写入所有阶段的原生分布式 Trace。可用的替代证据：

- 上游网关生成 request/trace ID，并将其写入应用日志；
- HTTP tracer logger 只在短时诊断启用，避免记录敏感请求或造成日志放大；
- search/index slowlog 定位到 index/shard；
- Tasks API 关联长任务和 parent task；
- audit log（若使用 Security）关联用户与动作；
- hot threads 将 CPU 栈映射回 Lucene/Elasticsearch 执行阶段。

## 5. 关键故障场景

### 5.1 Master 丢失或网络分区

传播链：

```text
网络丢包/长 GC/节点停机
→ leader/follower check 连续失败
→ 节点被移除或 master 退位
→ 重新选举
→ cluster state 暂停推进
→ 索引创建、mapping、allocation 等控制面操作失败/超时
→ 部分数据面请求继续，随后因 shard/master 依赖受损
```

证据：

- `number_of_nodes`/master 变化；
- `master not discovered`、`failed to commit cluster state`；
- pending task 时间增长；
- master 候选节点同时间窗 GC、CPU steal、transport disconnect。

根因判定：如果多个节点同时报告与同一 master 断连，先查 master/网络；若只有单节点报告，先查该节点网络和 GC。

### 5.2 磁盘水位与只读

源码传播链：

```text
available 降低
→ DiskThresholdMonitor
→ low: 禁止新 replica
→ high: reroute
→ relocation 增加 IO 与网络
→ flood: index.blocks.read_only_allow_delete
→ 写入 403/blocked
```

关键点：high 水位后的迁移会额外消耗磁盘和网络，若所有节点都高水位则没有可迁移目标。删数据前先确认 snapshot/ILM/保留策略；不要先手工解除 block 而不释放空间。

### 5.3 Heap、GC 与熔断

传播链：

```text
高基数聚合/大 bulk/fielddata/过多 shard
→ heap 或 accounting 增长
→ old GC 频繁
→ STW 导致 transport/fault detection 延迟
→ breaker trip 或节点被误判失联
→ 请求 429、master 波动、恢复风暴
```

判定顺序：

1. 看 GC 后 heap 是否回落；不回落说明常驻对象/缓存/上下文压力。
2. 看 breaker 类型和增量。
3. 看 open scroll/search contexts、fielddata、segments、request 大小。
4. 用 heap dump 只能作为最后手段，需预留磁盘并评估 STW/IO 风险。

### 5.4 Thread pool 拒绝

```text
生产速率 > 消费速率
→ active 达上限
→ queue 填满
→ rejected counter 增长
→ HTTP 429 / shard failure
```

- `write` 拒绝：检查 bulk 大小/并发、indexing pressure、merge、refresh、磁盘 latency。
- `search` 拒绝：检查 shard fan-out、慢查询、聚合、协调节点 CPU/heap。
- 不应首先扩大 queue；大 queue 只会把拒绝变成长尾延迟和更高 heap。

### 5.5 Recovery storm

节点重启或网络恢复后，大量 unassigned shard 同时恢复：

```text
recovery 并发
→ 磁盘 read/write + 网络上升
→ merge/refresh/业务 IO 被挤压
→ search/write P99 上升
→ fault detection 可能再次超时
→ 反复掉线和恢复
```

先稳定节点，再逐步恢复；必要时临时降低 recovery 并发/带宽，而不是提高。

### 5.6 Red shard 与数据损坏

- red 代表至少一个 primary unassigned。
- 先执行 allocation explain，区分磁盘、过滤规则、无有效 shard copy、版本/路径或 corruption。
- 有健康 replica：让 allocation 从健康 copy 恢复。
- 无健康 copy：优先 restore snapshot。
- `allocate_stale_primary`/`allocate_empty_primary` 具有明确数据丢失风险，只能在确认无其他副本和备份恢复路径后执行并留审计记录。

### 5.7 慢查询/热点分片

症状组合：

- 集群整体 CPU 未满但个别节点 search active/queue 高；
- 单个索引或 shard query time 占比异常；
- slowlog 集中在相同 query、routing 或 shard；
- hot threads 显示聚合、script、wildcard、global ordinals 或 segment 操作。

根因通常是 shard/数据倾斜、查询复杂度或映射问题，而非 search 线程数不足。

## 6. 告警体系设计

### 6.1 Prometheus 适配约定

Elasticsearch 7.17.9 原生 REST 字段不是 Prometheus 指标名。以下 PromQL 采用常见 `elasticsearch_exporter` 命名；上线前必须用 `/metrics` 校对标签和名称。推荐先建立内部 recording rules，屏蔽 exporter 差异：

```yaml
groups:
  - name: es-normalized
    rules:
      - record: es:scrape_up
        expr: elasticsearch_clusterinfo_up
      - record: es:cluster_red
        expr: max by (cluster) (elasticsearch_cluster_health_status{color="red"})
      - record: es:cluster_yellow
        expr: max by (cluster) (elasticsearch_cluster_health_status{color="yellow"})
      - record: es:unassigned_shards
        expr: max by (cluster) (elasticsearch_cluster_health_unassigned_shards)
      - record: es:heap_used_ratio
        expr: elasticsearch_jvm_memory_used_bytes{area="heap"} / elasticsearch_jvm_memory_max_bytes{area="heap"}
      - record: es:disk_available_ratio
        expr: elasticsearch_filesystem_data_available_bytes / elasticsearch_filesystem_data_size_bytes
```

### 6.2 核心告警

```promql
# P1：集群 red 持续 2 分钟
es:cluster_red == 1

# P1：连续 2 分钟监控不可达；用多个探针避免 exporter 单点误报
max_over_time(es:scrape_up[2m]) == 0

# P2：yellow 持续 15 分钟；单节点开发集群另行抑制
es:cluster_yellow == 1

# P1/P2：unassigned 持续或增长
es:unassigned_shards > 0
delta(elasticsearch_cluster_health_unassigned_shards[15m]) > 0

# P2：heap 持续 > 85%；P1 需叠加 old GC/不可用
avg_over_time(es:heap_used_ratio[10m]) > 0.85

# P2：GC 时间占比 > 25%，持续 10 分钟
sum by (cluster, name) (rate(elasticsearch_jvm_gc_collection_seconds_sum[5m])) > 0.25

# P2：任意 breaker 在 5 分钟内触发
sum by (cluster, name, breaker) (increase(elasticsearch_breakers_tripped[5m])) > 0

# P2：write/search 拒绝
sum by (cluster, name, type) (
  increase(elasticsearch_thread_pool_rejected_count{type=~"write|search|search_coordination"}[5m])
) > 0

# P2：磁盘低于 15%；低于 10% 升 P1，需同时考虑绝对剩余字节
min by (cluster, name) (es:disk_available_ratio) < 0.15
min by (cluster, name) (es:disk_available_ratio) < 0.10

# P2：文件描述符 > 80%
elasticsearch_process_open_files_count
/
elasticsearch_process_max_files_count > 0.80
```

恢复速度和趋势告警应基于容量：

```promql
# 预测 6 小时内磁盘耗尽；至少使用 6h 历史降低短时 relocation 误报
predict_linear(elasticsearch_filesystem_data_available_bytes[6h], 6 * 3600) < 0

# 拒绝率相对请求量；具体请求 counter 按 exporter 校准
sum(rate(elasticsearch_thread_pool_rejected_count{type="write"}[5m]))
/
clamp_min(sum(rate(elasticsearch_indices_indexing_index_total[5m])), 1)
> 0.001
```

### 6.3 分级与抑制

| 级别 | 条件 | 行动 |
|---|---|---|
| P1 | red 且影响在线流量；无 master；多节点不可达；flood 导致关键索引不可写 | 立即响应、冻结变更、建立事件频道 |
| P2 | yellow 持续；拒绝/GC/breaker；磁盘 high；恢复影响 SLO | 15 分钟内响应 |
| P3 | 容量趋势、shard 偏斜、slowlog 增长、低频 FS 慢 | 工作时间处理 |

抑制规则：

- `cluster_down` 抑制同集群的 node、shard、exporter 派生告警。
- `no_master` 抑制 pending/unassigned 的派生告警，但不抑制磁盘和网络根因告警。
- 节点维护窗口抑制该节点 unreachable，但不抑制 cluster red。
- flood-stage 告警关联并抑制同节点普通 disk-high 告警。
- 同一集群的 rejection、latency、GC 告警合并，根因标签优先 `gc`/`disk`/`recovery`。

## 7. 故障定位流程

### 7.1 从告警到根因

1. **确认用户影响**：读写错误率、P95/P99、关键索引、影响开始时间。
2. **确认集群面**：`_cluster/health`、master、节点数、pending tasks。
3. **确认节点面**：对比所有节点 JVM、CPU、FS、FD、transport、thread pool。
4. **确认资源面**：heap/GC、磁盘余量与 latency、网络重传、CPU steal。
5. **确认业务对象**：索引、shard、pipeline、query、bulk client。
6. **确认状态原因**：`_cluster/allocation/explain`，不要凭 unassigned reason 猜。
7. **确认源码分支**：用精确日志文本搜索仓库，检查触发条件和后续动作。
8. **执行最小恢复动作**：减载、释放空间、隔离坏节点、修正 allocation。
9. **反证**：指标恢复、队列排空、无新拒绝、状态稳定至少两个观察窗口。

### 7.2 标准证据包

```bash
curl -s "$ES/_cluster/health?level=indices"
curl -s "$ES/_cluster/pending_tasks"
curl -s "$ES/_cluster/settings?include_defaults=true&flat_settings=true"
curl -s "$ES/_nodes/stats/jvm,process,os,fs,thread_pool,breaker,transport,http,indices,ingest,indexing_pressure"
curl -s "$ES/_cat/nodes?v&h=name,ip,node.role,master,heap.percent,ram.percent,cpu,load_1m,disk.avail"
curl -s "$ES/_cat/shards?v&bytes=gb"
curl -s "$ES/_cat/recovery?v&active_only=true&bytes=mb"
curl -s "$ES/_tasks?detailed=true&group_by=parents"
curl -s "$ES/_nodes/hot_threads?threads=10&ignore_idle_threads=true"
```

证据包必须带采集时间、ES 端点、集群 UUID、版本和当前变更记录。敏感认证信息不得写入工单。

### 7.3 源码反查方法

```bash
# 用完整日志短语找到产生位置
rg -n -F "failed to commit cluster state version" server/src/main/java

# 用配置名找到默认值、动态属性和消费者
rg -n -F "cluster.routing.allocation.disk.watermark.high" server/src/main/java

# 用异常类型找抛出点
rg -n "new (CircuitBreakingException|EsRejectedExecutionException)" server/src/main/java
```

读取设置时重点看：

- 默认值；
- 最小/最大校验；
- `Dynamic`、`NodeScope`、`IndexScope`；
- `addSettingsUpdateConsumer`；
- 日志分支之后执行了什么状态变更。

## 8. 恢复与优化

### 8.1 应急处置矩阵

| 故障 | 第一动作 | 禁止的第一动作 | 恢复验证 |
|---|---|---|---|
| 无 master | 稳定 master-eligible 节点、网络和 GC | 连续重启所有 master 候选 | master 稳定、state version 推进 |
| flood-stage | 释放/扩容磁盘，确认水位下降 | 只解除 read-only block | block 解除且余量持续安全 |
| heap/GC | 降低查询/写入并发，终止异常长任务 | 立即提高 breaker | GC 后 heap 回落，无新 trip |
| write rejection | 客户端指数退避、缩小 bulk/并发 | 扩大 queue | queue 排空，拒绝归零，吞吐稳定 |
| recovery storm | 降低恢复并发/带宽，保业务 IO | 提高并发追求更快变绿 | P99 恢复，recovery 稳步前进 |
| red/corruption | 找健康副本或 snapshot | 直接 empty/stale primary | primary active，校验数据完整 |
| 慢查询 | 限制异常 query、定位 shard/query | 增加 search 线程 | P99、CPU、queue 同时恢复 |

### 8.2 自动化恢复策略

只自动执行低风险、幂等、可回滚动作：

- 告警自动附带 evidence bundle、allocation explain 和最近变更；
- 写入 429 时客户端 exponential backoff + jitter；
- rollover/ILM 在达到容量线前执行；
- 节点维护使用 allocation exclusion，等待迁移完成后再停机；
- flood-stage 恢复依赖源码自动解除 block；若未解除，只在所有相关节点低于 high 且查明原因后自动修复；
- 自动限流 recovery 必须有上/下限、TTL 和恢复后回滚；
- 任何 allocation setting 临时变更都记录旧值并自动过期。

不得全自动：

- `allocate_stale_primary`、`allocate_empty_primary`；
- 删除索引/快照；
- 重启多数 master-eligible 节点；
- 禁用磁盘阈值、熔断器或 replica；
- 清理 data path、translog 或 Lucene 文件。

### 8.3 长期优化

- shard：控制单 shard 大小、单节点 shard 数和 cluster state 元数据规模；
- 写入：按客户端、索引限流，bulk 以延迟/拒绝反馈闭环；
- 搜索：减少 fan-out，使用 routing、preference、合理 shard 数，限制 bucket 和 script；
- JVM：固定 `Xms=Xmx`，避免 swap，给 filesystem cache 留内存；
- 磁盘：容量与 IOPS 双预算，watermark 前预留迁移空间；
- 网络：master 与 data 节点间监控 RTT、丢包、重传和连接重置；
- 变更：mapping/template/ILM 变更先评估 cluster state 和 shard 增长。

## 9. 最佳实践

### 9.1 Grafana 大盘

1. **集群总览**：health、master、nodes、active/unassigned shards、pending tasks、请求错误率。
2. **JVM/进程**：heap、GC count/time、CPU、load、FD、uptime、breaker。
3. **节点资源**：每 path 磁盘、IO latency/throughput、网络、CPU steal。
4. **线程池**：active/queue/rejected/completed，按 write/search/get/management。
5. **索引与分片**：docs、store、index/search rate 与 latency、merge、refresh、flush、segments。
6. **恢复与分配**：initializing/relocating/unassigned、recovery bytes/s、recovery stage。
7. **控制面**：master 变化、pending task age、cluster state update/publish/apply 时间。
8. **业务 SLO**：按 API/tenant/index 的吞吐、错误率、P95/P99。

所有图表必须支持 cluster → node → index → shard drill-down，并在同一时间轴叠加发布、扩容、重启、ILM 和配置变更。

### 9.2 容量规划

至少分别建模：

- 磁盘容量：主数据 × (1+replicas) × segment/merge 暂态 × watermark 余量 × 增长周期；
- heap：shard/segment 固定开销 + query/aggregation + indexing buffer + cluster metadata；
- IO：正常写入 + refresh/merge + recovery 峰值；
- 网络：replica 写入 + search fan-out + recovery/snapshot；
- 控制面：index、shard、mapping field 和 template 数量。

容量目标不应顶到源码硬上限。`cluster.max_shards_per_node=1000` 是创建保护阈值，不代表节点能在目标 SLO 下承载 1000 shards。

### 9.3 压测指标

- steady-state 至少持续覆盖一次完整 merge/flush 周期；
- 分别压测写、查、混合流量和节点故障恢复；
- 记录吞吐、P50/P95/P99/P99.9、429、GC、heap 基线、磁盘 latency；
- 注入单 data node 故障、单 master 候选故障、网络延迟和磁盘逼近 high watermark；
- 验证客户端退避、timeout、重试不会形成重试风暴；
- 压测结束后观察 queue、merge 和 recovery 是否真正排空。

### 9.4 日常巡检

- 集群 UUID、版本、master、节点角色是否符合预期；
- 无 red/yellow、无长期 unassigned/initializing；
- pending tasks 最大等待时间；
- heap GC 后基线、old GC 时间占比；
- breaker 和 thread pool rejection 增量；
- 每个 data path 的剩余空间和耗尽预测；
- shard 分布、单 shard 大小、热点索引；
- segment、deleted docs、merge、refresh、flush 趋势；
- snapshot 最近成功时间及定期恢复演练；
- 动态 cluster settings 是否存在过期临时值；
- voting exclusions、allocation exclusions、read-only blocks 是否残留；
- 证书、license（若适用）、磁盘与容量到期时间。

### 9.5 升级注意事项

- 7.17 是进入 8.x 前的重要兼容版本；升级前处理 deprecation log 和 migration API 报告。
- 检查插件与目标版本完全匹配。
- 先验证 snapshot 可恢复，再滚动升级。
- 保持 master-eligible 法定票数，逐节点升级，不同时重启多数派。
- 升级期间不要并行执行大规模 shard relocation、force merge 或 mapping 变更。
- 比较升级前后 `_cluster/settings?include_defaults=true`，避免默认值变化。
- 预演 mixed-version 下的索引、CCR/remote cluster、snapshot repository 和客户端兼容。
- 升级后验证 cluster state publication、recovery、GC、拒绝率和业务 SLO，而不只看 green。

## 10. 事件关闭标准

事件只有同时满足以下条件才能关闭：

1. 用户影响消失，核心 SLO 连续稳定至少两个告警窗口；
2. cluster state 稳定，无 master 抖动、无新增 unassigned；
3. queue 已排空，rejection/breaker 不再增长；
4. heap 在 GC 后回到正常基线，磁盘离开危险区；
5. 临时配置已回滚或登记了明确 TTL；
6. 根因能被“指标 + 日志 + 配置 + 源码触发条件”共同解释；
7. 已建立预防项、负责人和验证日期。
