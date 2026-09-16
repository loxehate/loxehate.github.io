---
title: MariaDB-10.1.46-SRE-ANALYSIS
slug: MariaDB-10.1.46-SRE-ANALYSIS
published: 2026-09-16
description: 目标：建立“源码 → 配置 → 指标 → 日志 → 告警 → 根因 → 恢复 → 自动化”的闭环。
image: '../../assets/images/Dota-img/nevermore.png'
tags:
  - MariaDB
  - SRE
category: SRE
draft: false
lang: zh-CN
pinned: false
comment: true
---
# MariaDB 10.1.46 源码级 SRE 分析体系

> 目标：以源码为依据，以运行机制为核心，以可观测性为手段，以故障定位为目标，打通“源码 → 配置 → 指标 → 日志 → 告警 → 根因 → 恢复 → 自动化”。
>
> 适用版本：本仓库 `VERSION` 声明的 MariaDB 10.1.46。本文不把较新 MariaDB/MySQL 的行为反推到 10.1；生产中的编译选项、插件和 exporter 仍须以实例实测为准。

## 0. 使用边界与证据规则

### 0.1 证据分级

| 等级 | 证据 | 用法 |
|---|---|---|
| L1 | 本仓库中的函数、变量、默认值和错误字符串 | 本文的主要依据 |
| L2 | 实例运行时的 `SHOW VARIABLES/STATUS`、`SHOW ENGINE INNODB STATUS`、`SHOW SLAVE STATUS` | 证明编译和配置后的实际状态 |
| L3 | OS/cgroup、文件系统、网络和磁盘遥测 | 解释数据库外部原因 |
| L4 | exporter 对 L2 的指标转换 | 用于 PromQL；指标名不是 MariaDB 源码 ABI |

任何告警都至少要能回到 L2，任何根因结论都应同时有 L1 或 L3 支撑。单个指标只能提出假设，不能单独证明根因。

### 0.2 指标命名约定

本文 PromQL 假设使用常见 `mysqld_exporter` 命名：

```text
SHOW GLOBAL STATUS 变量 X  -> mysql_global_status_x
SHOW GLOBAL VARIABLES 变量 X -> mysql_global_variables_x
SHOW SLAVE STATUS 字段 X -> mysql_slave_status_x
```

实际 exporter 版本可能省略、改名或不采集某字段。上线前必须用 `/metrics` 验证，并通过 recording rules 统一成本文使用的 `mariadb:*` 指标。源码只定义 SQL 层状态语义，不定义 Prometheus 名称。

## 1. 架构与核心组件

### 1.1 总体数据流

```text
client
  -> TCP/Unix socket accept
  -> THD 创建与连接上限检查
  -> login/authentication
  -> do_command() 读取协议包
  -> dispatch_command() 分发 COM_*
  -> mysql_parse() 词法/语法分析
  -> mysql_execute_command() 权限、优化与执行分派
  -> handler API
  -> InnoDB/MyISAM/Aria 等存储引擎
  -> redo/binlog/数据页
  -> protocol response
  -> status/slow log/general log/error log
```

核心证据：

- 服务入口：`sql/main.cc:21-25` 调用 `mysqld_main()`；主体在 `sql/mysqld.cc:5558`。
- 配置加载：`sql/mysqld.cc:5591-5602`。
- 组件、网络和信号初始化：`sql/mysqld.cc:5801-5837`。
- 就绪日志：`sql/mysqld.cc:5946-5951`。只有出现该日志，才表示启动主路径已走完。
- accept、`THD` 创建和调度：`sql/mysqld.cc:6650-6759`。
- 会话循环：`sql/sql_connect.cc:1236-1350`。
- SQL 主链：`sql/sql_parse.cc:929`、`:1244`、`:7122`、`:2490`。
- 存储引擎插件注册：`sql/sql_plugin.cc:1524`、`sql/handler.cc:534`。
- InnoDB 初始化：`storage/innobase/handler/ha_innodb.cc:3438` 调用
  `storage/innobase/srv/srv0start.cc:1645` 的 `innobase_start_or_create_for_mysql()`。

### 1.2 核心模块职责

| 模块 | 主要源码 | 职责 | 关键观测面 |
|---|---|---|---|
| mysqld 生命周期 | `sql/mysqld.cc` | 早期变量、配置、插件、网络、信号、启动/关闭 | error log、uptime、process state |
| 连接与认证 | `sql/sql_connect.cc`、`sql/mysqld.cc` | `THD`、认证、会话循环、连接回收 | Connections、Threads_*、Aborted_* |
| SQL 协议与执行 | `sql/sql_parse.cc` | 读包、命令分发、解析、执行、慢日志判定 | Questions、Com_*、Slow_queries、digest |
| handler 层 | `sql/handler.cc` | SQL 层到存储引擎的统一接口、事务协调 | handler counters、引擎错误 |
| InnoDB | `storage/innobase` | buffer pool、redo、undo、锁、事务、刷脏、恢复 | Innodb_*、InnoDB status、error log |
| binlog | `sql/log.cc`、`sql/log_event.cc` | 事务事件记录、轮转、清理 | Binlog_*、磁盘空间、提交延迟 |
| 异步复制 | `sql/slave.cc`、`sql/rpl_*` | IO 拉取、relay log、SQL apply、并行 apply | SHOW SLAVE STATUS、replica 日志 |
| 日志 | `sql/log.cc`、`sql/sql_parse.cc` | error/general/slow log 路由与写入 | 日志写失败、slow query |
| Performance Schema | `storage/perfschema` | waits/statements 等运行时观测 | P_S 表；本版本默认关闭 |

### 1.3 关键线程

| 线程/模型 | 创建或主体位置 | 运行机制 | 卡住时的外部表现 |
|---|---|---|---|
| accept 线程 | `sql/mysqld.cc:6650-6764` | 接收套接字、创建 `THD`、交调度器 | 新连接超时，`Connections` 不增或 `Aborted_connects` 增 |
| one-thread-per-connection | `sql/scheduler.cc`、`sql/sql_connect.cc:1274` | 每个会话执行认证和命令循环，可使用 thread cache | Threads_connected/running 高，线程切换和内存压力 |
| thread pool | `sql/threadpool_common.cc` | 工作线程处理活跃连接 | 队列化延迟；连接数不等于活跃 OS 线程数 |
| InnoDB I/O | `storage/innobase/srv/srv0start.cc:534`、`:2122` | 异步数据读写 | pending reads/writes、buffer pool wait free 增 |
| page cleaner | `storage/innobase/buf/buf0flu.cc:2321` | 后台刷脏 | dirty pages 高、checkpoint/提交被反压 |
| master thread | `storage/innobase/srv/srv0srv.cc:2438` | 活跃/空闲后台维护与日志刷新 | 后台维护停滞、脏页和日志压力累积 |
| purge coordinator/workers | `storage/innobase/srv/srv0srv.cc:2822`、`srv0start.cc:2944` | 清理旧版本 | history list/undo 膨胀、读放大 |
| lock timeout | `storage/innobase/lock/lock0wait.cc:498` | 唤醒超时锁等待者、参与死锁处理 | lock waits、超时错误 |
| replica IO | `sql/slave.cc:4109` | 从主库拉 binlog 并 `queue_event()` 到 relay log | IO running=0、relay 不增长 |
| replica SQL | `sql/slave.cc:4680` | 从 relay log 执行事件 | SQL running=0 或 Seconds_Behind_Master 增 |

### 1.4 生命周期与就绪判断

启动阶段：

1. `init_early_variables()` 与 `my_init()`：只满足读取配置所需的最小初始化。
2. `load_defaults_or_exit()`：读取配置组并重构参数数组。
3. `sys_var_init()`、early options：注册并解析核心变量。
4. `init_server_components()`：初始化日志、插件、存储引擎、事务协调器等。
5. `network_init()`：创建监听套接字。
6. `start_signal_handler()`：创建 pidfile。
7. ACL、时区、UDF、复制等初始化。
8. 输出 `ready for connections` 对应的 `ER_STARTUP` 信息。
9. 进入连接处理循环。

关闭阶段由 `unireg_abort()` 进入 `clean_up()`（`sql/mysqld.cc:2021-2210`），先停止复制和连接，再结束调度器、插件、日志和全局资源。SRE 不应把“进程存在”当作就绪，也不应在正常关闭尚未完成时强杀；就绪探针至少要求 SQL 往返成功。

## 2. 源码实现

### 2.1 请求调用链

```text
handle_connections_sockets()
  -> new THD
  -> create_new_thread()
  -> scheduler.add_connection()
  -> handle_one_connection()
  -> do_handle_one_connection()
  -> thd_prepare_connection()
  -> login_connection()
  -> while alive: do_command()
  -> dispatch_command()
  -> mysql_parse()
  -> mysql_execute_command()
  -> SQL command implementation
  -> handler / storage engine
```

`create_new_thread()` 在 `sql/mysqld.cc:6435-6447` 用调度器的连接计数和
`max_connections + 1` 做上限判断，拒绝时返回 `ER_CON_COUNT_ERROR` 并增加
`denied_connections` 与 `connection_errors_max_connection`。因此“Too many
connections”的根因路径应从 `Threads_connected/max_connections`、连接增长率、应用连接池和慢 SQL 逐层查，而不是先调大上限。

`do_handle_one_connection()` 在 `sql/sql_connect.cc:1327-1333` 反复调用
`do_command()`；网络错误、KILL 或命令要求关闭会退出循环。连接线程创建时间超过
`slow_launch_time` 时，`:1295-1300` 增加 `Slow_launch_threads`。

### 2.2 配置加载与生效

配置组定义于 `include/mysqld_default_groups.h`：

```text
mysqld -> server -> MYSQL_BASE_VERSION -> mariadb ->
MARIADB_BASE_VERSION -> client-server -> [galera]
```

默认目录次序记录在 `mysys/my_default.c:130-149`。`--defaults-file`、
`--defaults-extra-file`、`--defaults-group-suffix` 必须位于命令行前部，见
`mysys/my_default.c:27-34`。后读取的重复项覆盖先前值，命令行参数位于 defaults
展开后的参数数组中。

系统变量由 `Sys_var_*` 注册，插件变量由 `MYSQL_SYSVAR_*`/`MYSQL_THDVAR_*`
注册。变量的 `READ_ONLY`、`GLOBAL_VAR`、`SESSION_VAR`、`ON_CHECK` 和
`ON_UPDATE` 决定作用域与动态行为。例如：

- `max_connections` 是早期解析的 global dynamic 变量，并通过
  `fix_max_connections()` 调整线程告警资源。
- `thread_handling` 是只读变量，启动后不能热切换。
- `innodb_buffer_pool_size` 在该版本是插件只读变量，需要重启。
- `innodb_io_capacity` 有 update callback；若大于 max，源码会修正并告警。
- `binlog_format` 是 session 变量，但事务中/临时表场景受检查函数限制；Galera
  路径只允许 ROW。

生产审计必须同时保存：

```sql
SHOW GLOBAL VARIABLES;
SHOW GLOBAL STATUS;
SHOW PLUGINS;
SHOW ENGINES;
SHOW VARIABLES LIKE 'version%';
```

仅保存 `my.cnf` 不足以证明实际值，因为启动参数、编译能力、插件回调和自动修正都会改变最终状态。

### 2.3 事务与 InnoDB 状态

SQL 层通过 handlerton 回调进入 InnoDB。`innobase_commit()` 和
`innobase_rollback()` 位于 `storage/innobase/handler/ha_innodb.cc:4371`、
`:4458`。引擎内部以 `trx_t` 保存事务和锁状态，以 buffer pool 缓存页，以 redo
保证崩溃恢复，以 undo/MVCC 保留旧版本。

提交耐久性关键分支由 `innodb_flush_log_at_trx_commit` 控制，源码说明位于
`ha_innodb.cc:19029-19041`：

- `1`：每次提交写并刷 redo，崩溃耐久性最强。
- `2`：提交写 redo、约每秒刷盘；mysqld 崩溃通常可保留，OS/掉电可能丢。
- `0`：约每秒写并刷；任意崩溃均无单事务耐久保证。
- `3`：prepare 和 commit 均刷，通常更慢。

若同时需要 binlog 与 InnoDB 一致性，不能只检查该变量；还要检查
`sync_binlog` 和事务协调路径。

### 2.4 异常处理

| 异常 | 源码处理 | 对外结果 |
|---|---|---|
| 启动组件失败 | 多处调用 `unireg_abort(1)` | 清理后非零退出，error log 有最后失败阶段 |
| 连接超限 | `mysqld.cc:6437-6447` | `ER_CON_COUNT_ERROR`，拒绝计数增加 |
| 线程初始化/OOM | `sql_connect.cc:1282-1287` | 关闭连接，`Aborted_connects` 增 |
| 锁等待超时 | `lock0wait.cc:397` 设置 `DB_LOCK_WAIT_TIMEOUT` | handler 转 SQL 错误；默认只回滚语句 |
| 死锁 | lock 模块选 victim，设置 `DB_DEADLOCK` | victim 事务回滚；最近死锁写 InnoDB status |
| 磁盘满 | `mysys/my_write.c:77` 对 ENOSPC/EDQUOT 进入等待/重试 | 写入停滞，error log 出现固定字符串 |
| replica IO 错 | IO 线程重连或退出 | `Slave_IO_Running=No`，`Last_IO_Error` |
| replica SQL 错 | `slave.cc:4663` 记录并中止 SQL thread | `Slave_SQL_Running=No`，`Last_SQL_Error` |

## 3. 配置参数

### 3.1 源码默认值与生产建议

“推荐值”是起始原则，不是无条件常数。最终值必须由工作集、SLO、恢复目标和压测决定。

| 参数 | 10.1.46 源码默认 | 建议起点 | 影响路径与风险 |
|---|---:|---|---|
| `max_connections` | 151 (`sql/sql_const.h:160`) | 峰值并发的 1.2–1.5 倍，并受内存/FD 上限约束 | `create_new_thread()`；过大把过载从拒绝变成 OOM/抖动 |
| `thread_handling` | Windows 且编译 thread pool 时为 `pool-of-threads`，其他构建为 `one-thread-per-connection` (`sys_vars.cc:2739-2760`) | 高连接、低活跃比例评估 pool；压测后选 | 改变调度和线程模型，需重启 |
| `thread_cache_size` | 0 (`sys_vars.cc:3257-3261`) | 使 `Threads_created/Connections` 稳定低于 1%，避免盲目增大 | 缓存 OS 线程，换内存和更低连接成本 |
| `table_open_cache` | 2000 (`sql/sql_const.h:138`) | 由活跃表数、并发、FD 预算反推 | 命中不足导致 `Opened_tables` 增；过大耗 FD/内存 |
| `open_files_limit` | 0=自动 (`sys_vars.cc:2328-2335`) | OS limit 高于 MariaDB 请求，预留 binlog/临时/监控空间 | 启动时可自动压低连接数或 table cache |
| `tmp_table_size` | 16 MiB (`sys_vars.cc:3426-3432`) | 与 `max_heap_table_size` 一起调；先优化 SQL | 每会话潜在内存；小则磁盘临时表增 |
| `max_heap_table_size` | 16 MiB (`sys_vars.cc:1495-1500`) | 不高于可承受的会话内存预算 | 内部内存临时表受两者较小值约束 |
| `wait_timeout` | 28,800 s / 8 h (`include/mysql_com.h:349`) | 结合连接池 idle timeout，数据库略高 | 太高积累空闲连接，太低造成连接抖动 |
| `slow_query_log` | OFF (`sys_vars.cc:4263-4270`) | 生产 ON；配合采样、轮转和隐私治理 | 写日志有 I/O 成本，但为根因定位必需 |
| `long_query_time` | 10 s (`sys_vars.cc:1282-1290`) | OLTP 常从 0.5–1 s 起，再按 SLO 下调 | 影响 slow flag 与 Slow_queries |
| `performance_schema` | OFF (`sys_vars.cc:76-80`) | 先在同负载压测开销，再按需开启 instruments | 只读启动变量；没有它将失去细粒度 waits/digest |
| `innodb_buffer_pool_size` | 128 MiB (`ha_innodb.cc:19218-19221`) | 专用数据库常从可用内存 60–70% 评估，给连接/OS 留余量 | 太小增加物理读；太大导致 swap/OOM |
| `innodb_log_file_size` | 48 MiB/个 (`ha_innodb.cc:19469-19472`) | 以峰值 redo 速率和期望 checkpoint 窗口反推 | 太小频繁 checkpoint；太大增加最坏恢复时间 |
| `innodb_log_buffer_size` | 16 MiB (`ha_innodb.cc:19464-19467`) | 足够容纳大事务 redo，观察 `Innodb_log_waits` | 太小前台等待，过大收益有限 |
| `innodb_flush_log_at_trx_commit` | 1 | 核心账务 1；可容忍约 1 秒数据损失才考虑 2 | 直接改变提交延迟和掉电 RPO |
| `sync_binlog` | 0 (`sys_vars.cc:4700-4704`) | 强一致/RPO=0 使用 1，并压测 fsync | 0 在 OS 崩溃时可丢 binlog，影响复制/恢复 |
| `innodb_io_capacity` | 200 (`ha_innodb.cc:18915-18917`) | 以稳定随机写 IOPS 的保守比例起步 | 控制后台 IO；低则刷脏滞后，高则抢业务 IO |
| `innodb_max_dirty_pages_pct` | 75% (`ha_innodb.cc:19079-19081`) | 与低水位、IO 能力联调，避免接近硬上限 | 高峰时可能产生剧烈刷脏 |
| `innodb_lock_wait_timeout` | 50 s (`ha_innodb.cc:927-929`) | OLTP 常需更短，但必须让应用正确重试 | 过长拖住连接；过短放大瞬态冲突 |
| `innodb_purge_threads` | 1 (`ha_innodb.cc:18963-18968`) | 长事务清理跟不上时结合版本/CPU压测增加 | 只读；不能替代治理长事务 |
| `innodb_read_io_threads` | 4 (`ha_innodb.cc:19443-19446`) | 看 pending IO 与设备并行度 | 线程多不等于磁盘更快 |
| `innodb_write_io_threads` | 4 (`ha_innodb.cc:19448-19451`) | 看写延迟、队列和设备并行度 | 过高可增加竞争 |
| `innodb_file_per_table` | ON (`ha_innodb.cc:18985-18988`) | 保持 ON | 便于空间回收和表级管理 |
| `binlog_format` | STATEMENT (`sys_vars.cc:559-570`) | 复制正确性优先评估 ROW；注意容量增长 | Galera 强制 ROW；改变日志量与复现语义 |
| `slave_parallel_threads` | 0 (`sys_vars.cc:1904-1914`) | 有可并行事务且 SQL thread 落后时逐步增加 | IO/CPU 上升；并行度受 group commit/GTID domain 影响 |
| `slave_net_timeout` | 3600 s (`sql/slave.h:44`) | 与网络故障发现目标、heartbeat 配套缩短 | 过大延迟发现断链，过小导致抖动重连 |
| `relay_log_space_limit` | 0=无限 (`sys_vars.cc:4681-4684`) | 有磁盘预算时设硬边界，并告警接近上限 | 达限会反压 IO thread；过小限制追赶 |

### 3.2 内存与文件描述符预算

内存上限不要写成“buffer pool + max_connections × 单一参数”。更稳妥的容量式：

```text
RSS_peak ≈ global_fixed
         + innodb_buffer_pool_size
         + key/query caches
         + active_connections × active_session_working_set
         + idle_connections × idle_THD_cost
         + replication/background
         + allocator fragmentation
```

其中 session working set 包括 sort/join/read buffer、网络 buffer、临时表、语句内存和存储引擎事务对象；很多缓冲按需分配。用压测中 RSS 对 active connections 的斜率校准，至少留 20% OS/突发余量，禁止 swap 成为常态。

源码在 `sql/mysqld.cc:4321-4390` 按连接数、table cache、额外文件计算 FD 请求；OS 无法满足时会降低参数并写 warning。启动后必须比较：

```sql
SHOW GLOBAL VARIABLES WHERE Variable_name IN
('open_files_limit','max_connections','table_open_cache');
SHOW GLOBAL STATUS WHERE Variable_name IN
('Open_files','Opened_files','Open_tables','Opened_tables');
```

## 4. 可观测性

### 4.1 Metrics 产生位置与语义

全局状态表在 `sql/mysqld.cc:8347` 的 `status_vars[]`，SQL 命令分项在
`:3669` 的 `com_status_vars[]`。插件通过 `add_status_vars()` 合并状态，实现在
`sql/sql_show.cc:3107-3159`。InnoDB 状态表在
`storage/innobase/handler/ha_innodb.cc:941`。

关键映射：

| SQL 状态量 | 源码位置/来源 | 类型 | 正确解释 |
|---|---|---|---|
| Threads_connected | `mysqld.cc:8527` → `connection_count` | gauge | 当前连接，不等于正在执行 |
| Threads_running | `mysqld.cc:8529` → `thread_running` | gauge | 当前活跃线程，需结合 CPU/锁/IO |
| Max_used_connections | `mysqld.cc:6452-6453` | high-water mark | FLUSH STATUS/重启窗口内峰值 |
| Aborted_connects | `mysqld.cc:8349` | counter | 认证、握手、资源等连接建立失败 |
| Slow_queries | `mysqld.cc:8473` | counter | 慢条件命中；即使慢日志关闭也可增加 |
| Created_tmp_disk_tables | `mysqld.cc:8370` | counter | 内部磁盘临时表；看占总临时表比例 |
| Opened_tables | `mysqld.cc:8435`，`table.cc:3053` 增加 | counter | table cache miss/失效的近似信号 |
| Table_locks_waited | `mysqld.cc:8516` | counter | server/table lock 等待，不等于 InnoDB row lock |
| Bytes_received/sent | `sql_class.cc:4007/:3994` | counter | 协议流量 |
| Innodb_buffer_pool_reads | `ha_innodb.cc:974-975` | counter | 未命中后物理页读 |
| Innodb_buffer_pool_read_requests | `ha_innodb.cc:972-973` | counter | 逻辑页读请求 |
| Innodb_buffer_pool_wait_free | `ha_innodb.cc:976-977` | counter | 无可用页而等待刷脏，严重反压信号 |
| Innodb_log_waits | `ha_innodb.cc:1002-1003` | counter | redo buffer 空间不足等待 |
| Innodb_row_lock_current_waits | `ha_innodb.cc:1027` | gauge | 当前行锁等待 |
| Innodb_row_lock_waits/time | `ha_innodb.cc:1029-1035` | counter | 累积锁等待次数/毫秒 |
| Innodb_data_pending_* | `ha_innodb.cc:982-987` | gauge | InnoDB 等待完成的 IO |

推荐 recording rules 见 `support-files/mariadb-sre-alerts.yml`，核心派生量：

```promql
# QPS
rate(mysql_global_status_questions[5m])

# 连接利用率
mysql_global_status_threads_connected
/
mysql_global_variables_max_connections

# buffer pool 物理读占逻辑读
rate(mysql_global_status_innodb_buffer_pool_reads[5m])
/
clamp_min(rate(mysql_global_status_innodb_buffer_pool_read_requests[5m]), 1)

# 磁盘临时表比例
rate(mysql_global_status_created_tmp_disk_tables[5m])
/
clamp_min(rate(mysql_global_status_created_tmp_tables[5m]), 1)

# 平均行锁等待毫秒
rate(mysql_global_status_innodb_row_lock_time[5m])
/
clamp_min(rate(mysql_global_status_innodb_row_lock_waits[5m]), 1)
```

Counter 必须使用 `rate/increase`，gauge 直接聚合。重启会让 counter 归零；不要对 counter 原值做固定阈值告警。

### 4.2 日志产生位置与关联

| 日志 | 入口 | 内容与用途 | 风险 |
|---|---|---|---|
| error log | `LOGGER::error_log_print()`，`sql/log.cc:1117`；`sql_print_error/warning` | 启停、恢复、复制、损坏、磁盘、插件错误 | 多行事件需正确聚合；路径可重定向 |
| slow log | `sql_parse.cc:2018-2086` → `LOGGER::slow_log_print()` | query time、lock time、rows examined 等 | SQL/参数可能含敏感数据；需轮转 |
| general log | `LOGGER::general_log_write()`，`sql/log.cc:1338` | 所有连接/命令 | 高开销、高容量，只短时定向使用 |
| binlog | `MYSQL_BIN_LOG`，`sql/log.cc` | 恢复与复制，不是普通排障日志 | 禁止直接文本处理和随意删除 |
| relay log | replica IO/SQL 线程 | 复制中间队列 | 空间受限会反压 IO thread |
| InnoDB status | `SHOW ENGINE INNODB STATUS` | 最近死锁、事务、锁、IO、buffer pool | 瞬时快照，应在告警时自动采集 |

慢 SQL 的关键语义来自 `sql/sql_parse.cc:2031-2066`：`Slow_queries` 不依赖
slow log 开启；真正写日志还要经过 global/session 开关、采样和 filter。因而
`Slow_queries` 增但找不到日志，首先检查开关、rate limit、filter 和日志写失败，
不能认定指标错误。

### 4.3 Trace 与关联键

本版本没有原生跨服务 distributed trace。可用关联键：

1. 应用 trace/span ID 写入 SQL 注释，例如 `/*trace_id=...*/`，同时进入应用日志和慢日志。
2. `CONNECTION_ID()` 对应 THD/thread id，用于关联 processlist、日志和连接。
3. query digest 用于聚合同形 SQL；需启用并验证 Performance Schema。
4. replica 以 GTID 或 binlog file/position 关联主从事件。
5. 锁问题以 `INFORMATION_SCHEMA.INNODB_TRX` 中事务、thread id 与 processlist 关联。

不要把 SQL 注释当作访问控制；限制长度、字符集并脱敏。若 exporter 使用低权限账号，
确认其能读取所需 `INFORMATION_SCHEMA`/`SHOW SLAVE STATUS`。

## 5. 关键故障场景

### 5.1 连接耗尽

传播链：

```text
慢 SQL/锁等待/连接泄漏/流量突增
 -> 会话占用时间增长
 -> Threads_connected 接近 max_connections
 -> create_new_thread() 拒绝
 -> ER_CON_COUNT_ERROR
 -> 应用重试风暴
 -> CPU/网络/日志进一步放大
```

指标：连接利用率、Threads_running、Connections rate、Aborted_connects rate、
Max_used_connections。日志/客户端特征：`Too many connections`。定位关键是分叉：

- Threads_connected 高、Threads_running 低：连接池/idle timeout/泄漏。
- 两者都高且 CPU 高：容量或重查询。
- 两者都高且 CPU 低：锁、IO、下游或线程池队列。

恢复：先在入口限流/熔断重试；终止明确的失控查询或空闲泄漏会话；仅在内存和 FD
有余量时临时提高上限。长期做连接池总预算、慢 SQL 和锁治理。

### 5.2 慢 SQL、CPU 饱和与临时表

传播链：

```text
执行计划退化/缺索引/数据倾斜
 -> rows examined、sort、临时表增加
 -> CPU/磁盘 IO 上升
 -> query latency 上升
 -> 会话驻留
 -> 连接耗尽
```

指标：QPS、Slow_queries rate、Com_select/insert/update、磁盘临时表比例、
Bytes_sent、CPU、磁盘延迟。日志：slow log 中 Query_time、Lock_time、
Rows_examined。定位时先区分 `Lock_time` 高还是 `Rows_examined` 高，再对 SQL 做
`EXPLAIN`；不要在生产直接执行可能改变数据的 `EXPLAIN` 变体。

恢复：限流重查询、暂停非关键批任务、建立安全索引或回退发布。长期以 digest 的
总耗时贡献排序，而非只看单次最慢。

### 5.3 行锁等待与死锁

传播链：

```text
长事务/访问顺序不一致/缺索引扩大锁范围
 -> lock wait graph
 -> Threads_running 与 current waits 上升
 -> timeout 或 deadlock victim
 -> 应用回滚重试
 -> 冲突放大
```

源码：lock wait timeout 线程在 `lock0wait.cc:498`；超时设置
`DB_LOCK_WAIT_TIMEOUT` 在 `:397`；最近死锁标题在 `lock0lock.cc:6206`；handler
把 `DB_DEADLOCK`/timeout 映射为 SQL 错误在 `ha_innodb.cc:1976-1990`。

采集：

```sql
SHOW ENGINE INNODB STATUS\G
SELECT * FROM information_schema.innodb_trx\G
SELECT * FROM information_schema.innodb_locks\G
SELECT * FROM information_schema.innodb_lock_waits\G
SHOW FULL PROCESSLIST;
```

恢复：找到 blocker，不要只杀 waiter；确认业务影响后优先让 blocker 提交/回滚，
或 `KILL <processlist_id>`。死锁是并发控制的正常结果之一，应用必须对 victim 做
有上限、带抖动的事务级重试。长期统一表/行访问顺序、缩短事务并补索引。

### 5.4 buffer pool/刷脏/redo 反压

传播链：

```text
工作集超过缓存 或 写入突增
 -> 物理读/dirty pages/redo 生成上升
 -> page cleaner 与 IO 饱和
 -> Innodb_buffer_pool_wait_free 或 Innodb_log_waits
 -> 前台查询/提交等待
 -> 连接堆积
```

根因分叉：

- 物理读率高、命中变差、磁盘读高：buffer pool 不足或扫表。
- dirty ratio 高、pending writes 高、写延迟高：刷脏能力不足。
- `Innodb_log_waits` 增、磁盘不忙：log buffer 太小或超大事务。
- checkpoint 压力周期性尖峰：redo 太小或 IO capacity 不匹配。

恢复：削峰/暂停批写，保留磁盘空间，不以重启“清空压力”；重启会丢缓存并触发恢复。
长期用 redo 生成速率、设备持续 IOPS 和恢复时间目标联调 log size、IO capacity
和 buffer pool。

### 5.5 磁盘满或 inode/配额耗尽

源码固定错误字符串位于 `mysys/errors.c:43`；`my_write.c:77` 对
`ENOSPC/EDQUOT` 进行等待重试。因此进程可能仍存活，但写路径已停顿。

传播链：

```text
binlog/relay/slow log/temp/数据增长
 -> free bytes/inodes 接近 0
 -> 写/扩展失败或等待
 -> 事务提交、复制、查询停顿
 -> 连接堆积
```

恢复优先级：

1. 停止制造空间的非关键流量。
2. 识别增长对象和文件句柄，保留 error log、redo、数据文件、当前 binlog/relay log。
3. 用 MariaDB 支持的 `PURGE BINARY LOGS`/复制流程清理，禁止直接删除活跃数据库文件。
4. 扩容或迁移日志/临时目录。
5. 空间恢复后验证 SQL、复制和 checkpoint，而非只看进程。

自动化只允许做“通知、限流、扩容建议、已验证的过期日志轮转”；不要自动 `rm` 数据、
binlog 或 relay log。

### 5.6 复制中断与延迟

传播链：

```text
网络/认证/主库 binlog 问题 -> IO thread 停止
或 relay 中坏事件/冲突/DDL -> SQL thread 停止
或 apply 能力不足 -> relay backlog 与 delay 增长
```

源码链：

```text
handle_slave_io() [slave.cc:4109]
 -> read event
 -> queue_event() [slave.cc:5599]
 -> relay log
handle_slave_sql() [slave.cc:4680]
 -> read relay event
 -> apply Log_event
```

判定矩阵：

| IO | SQL | lag/backlog | 优先检查 |
|---|---|---|---|
| No | Yes/No | 不可靠 | Last_IO_Error、网络、账号、主库 binlog |
| Yes | No | 增长 | Last_SQL_Error、冲突事件、表结构 |
| Yes | Yes | 增长 | apply CPU/IO、长事务、单线程瓶颈、并行配置 |
| Yes | Yes | 0 | 再比较 GTID/position 和业务数据，不仅信 lag |

禁止把 `Seconds_Behind_Master=0` 单独当作数据一致证明；IO thread 中断时该字段可能
为空或失真。跳过复制错误会制造永久数据分叉，只有在明确事件语义、完成数据校验并留
审计记录后才能执行。

### 5.7 崩溃恢复与页损坏

启动主路径明确标注 InnoDB log read 可能耗时（`mysqld.cc:5793-5796`）。
恢复期间探针应允许更长 startup timeout，但 readiness 必须保持失败。

页校验/LSN 异常路径在 `storage/innobase/buf/buf0buf.cc:835-946`，doublewrite
恢复在 `buf0dblwr.cc`。遇到 corruption：

1. 立即保护原数据目录和错误日志，停止反复重启。
2. 记录文件、space id、page no、LSN 和首次错误时间。
3. 检查磁盘、内存、内核和虚拟化层错误。
4. 优先从已验证备份恢复到隔离实例并应用 binlog。
5. `innodb_force_recovery` 只用于受控导出，不是修复手段；逐级、只读、留副本。

## 6. 告警体系设计

### 6.1 分级原则

| 级别 | 含义 | 响应目标 | 例子 |
|---|---|---|---|
| P1 | 数据不可用、可能丢失/损坏、主从双失效 | 立即呼叫 | 实例不可达、磁盘将满且写停、corruption、主库无可用副本 |
| P2 | SLO 正在恶化、单点或容量余量很低 | 15 分钟内 | 连接 >90%、复制线程停止、持续刷脏反压 |
| P3 | 趋势风险或需要工作时处理 | 工作时段 | cache miss 增、慢查询率升、容量预测不足 |

阈值以基线和耗尽时间为主。固定百分比是冷启动保护线，稳定运行 2–4 周后应用分位数
和业务 SLO 校准。

### 6.2 核心 PromQL

完整规则在 `support-files/mariadb-sre-alerts.yml`。代表性规则：

```promql
# P1：实例连续不可抓取
mysql_up == 0

# P2：连接耗尽风险
mysql_global_status_threads_connected
/
mysql_global_variables_max_connections > 0.90

# P2：发生前台 buffer pool 等待
increase(mysql_global_status_innodb_buffer_pool_wait_free[5m]) > 0

# P2：redo buffer 等待
increase(mysql_global_status_innodb_log_waits[5m]) > 0

# P2：复制延迟持续超过 60 秒
mysql_slave_status_seconds_behind_master > 60

# P3：物理读占比超过 5%，且逻辑读有足够流量
rate(mysql_global_status_innodb_buffer_pool_reads[10m])
/
clamp_min(rate(mysql_global_status_innodb_buffer_pool_read_requests[10m]), 1)
> 0.05
and rate(mysql_global_status_innodb_buffer_pool_read_requests[10m]) > 100
```

### 6.3 抑制与关联

- `mysql_up=0` 时抑制该实例所有 SQL 级指标告警，但不抑制主机磁盘、进程退出和副本可用性告警。
- 计划维护使用显式 maintenance label 和到期时间，不允许永久 silence。
- replica IO/SQL stopped 抑制 lag 告警，因为 lag 此时不可信。
- 主机磁盘延迟高时，将多个 DB IO 告警聚合为一个主事件。
- 连接高 + row lock waits 高：首要假设为锁传播。
- 连接高 + CPU 高 + slow query 高：首要假设为查询/容量。
- 连接高 + CPU 低 + pending IO 高：首要假设为存储。
- 告警标签至少含 `service`、`cluster`、`role`、`instance`、`environment`、`owner`。

## 7. 故障定位流程

### 7.1 从告警到源码的标准链路

```text
告警真实性
 -> 服务/集群与角色
 -> 实例和时间窗
 -> OS资源
 -> MariaDB线程/会话
 -> 数据库/表/事务/复制对象
 -> 配置实际值
 -> error/slow日志
 -> 源码分支
 -> 根因与证据反证
```

执行步骤：

1. **确认告警**：检查 scrape 是否成功、counter 是否刚重启、同集群其他实例是否同现象。
2. **确定角色**：主库、级联副本、只读副本或 Galera 节点；错误处置的角色风险不同。
3. **固定时间窗**：记录首发、变更、流量和依赖异常时间，不使用“现在看起来正常”否定历史故障。
4. **看 OS**：CPU user/iowait、memory/RSS/swap、磁盘 latency/queue/free inode、网络丢包/重传、进程 FD。
5. **看服务**：uptime、Threads、Connections、QPS、错误、慢查询、InnoDB pending/lock。
6. **下钻对象**：processlist → trx → lock → table/index；或 slave channel → GTID/file-position → event。
7. **核对配置**：用运行时值，不用配置仓库的期望值替代事实。
8. **关联日志**：同一 thread id/trace id/GTID/file position 和相同分钟窗口。
9. **映射源码**：找到计数产生位置、错误分支和后续动作，确认指标语义。
10. **形成根因**：至少包含触发因素、放大因素、防护为何未生效和恢复为何有效。

### 7.2 最小诊断 SQL

见 `support-files/mariadb-sre-diagnostic.sql`。执行前提：

- 使用只读诊断账号。
- 设置客户端超时，避免监控本身挂住。
- 大表 `INFORMATION_SCHEMA` 查询需评估开销。
- 告警触发时自动保存输出、error log 尾部和 InnoDB status，设置保留期与脱敏。

### 7.3 根因结论模板

```text
现象：
影响：
开始/恢复时间：
触发因素：
故障传播链：
源码行为：
配置条件：
指标证据：
日志证据：
排除项：
临时恢复：
长期修复：
防复发验证：
```

## 8. 恢复与优化

### 8.1 应急处置优先级

1. 保护数据与恢复路径：确认备份、binlog、复制位置，不执行不可逆清理。
2. 阻断放大器：入口限流、暂停批任务、停止无界重试。
3. 恢复核心读写：故障转移、释放安全空间、处理 blocker 或隔离坏节点。
4. 验证：SQL 读写、事务提交、复制、业务校验、关键指标回落。
5. 观察一个完整业务高峰或规定稳定窗口后再关闭事件。

### 8.2 自动恢复边界

适合自动化：

- exporter/scrape 自检与重启。
- 有上限的连接池降载和入口限流。
- 磁盘预测、扩容工单和安全日志轮转。
- 复制线程因瞬态网络错误停止时，在错误白名单、重试次数和位置未变化保护下重启。
- 告警时采集只读诊断快照。

不应无人工判断自动化：

- `KILL` 未识别业务事务。
- 跳过复制错误、重置 GTID/position。
- 删除 binlog/relay log/redo/ibdata/ibd。
- 启用 `innodb_force_recovery`。
- 自动主从切换但没有 fencing、写入仲裁和旧主隔离。

自动恢复必须具有：幂等、最大重试、冷却时间、前置条件、审计日志、回滚/停止开关和
成功后业务校验。若动作连续失败两次，应升级人工而不是加快重试。

### 8.3 长期优化闭环

```text
SLO/容量目标
 -> 代表性压测
 -> 采集基线
 -> 单变量变更
 -> 对比延迟/QPS/资源/恢复时间
 -> 灰度
 -> 生产验证
 -> 更新告警和 runbook
```

优化目标必须含尾延迟、错误率和恢复时间，不能只追求峰值 QPS。

## 9. 最佳实践

### 9.1 Grafana 大盘

建议五层大盘，每层保留到下一层的 drill-down 链接：

1. **集群总览**：up、角色、QPS、P95/P99 应用延迟、错误率、连接利用率、复制健康、磁盘耗尽时间。
2. **实例资源**：CPU/iowait、RSS/swap、磁盘 IOPS/latency/queue、网络、FD。
3. **SQL/连接**：Threads、Connections/Aborted、Com_*、slow rate、tmp disk ratio、table cache churn。
4. **InnoDB**：buffer pool 命中、dirty ratio、pending IO、log waits、row lock、rows、redo/checkpoint。
5. **复制/恢复**：IO/SQL state、lag、relay space、GTID/position、binlog growth、backup age/restore test。

所有 rate 图统一窗口，显示部署/DDL/切换/备份注释；gauge 和 counter 使用不同图例。

### 9.2 容量规划

每周计算：

- 存储：数据、索引、binlog、relay、slow/general、temp 的日增长和 P95，预测 30/60/90 天。
- 计算：业务高峰 CPU 与 QPS 斜率、单核吞吐、尾延迟拐点。
- 内存：工作集、buffer pool、连接活跃度、RSS 峰值和 page fault。
- 连接：峰值、增长率、驻留时间和每个调用方连接池配额。
- 复制：峰值生成速率与 apply 速率差、追赶时间、故障窗口可承受 backlog。
- 恢复：全量恢复 + binlog replay 的实测 RTO/RPO，而非备份任务“成功”状态。

### 9.3 压测指标

压测至少覆盖稳态、突发、长事务、热点更新、大查询、磁盘逼近高水位、副本追赶和重启恢复。
记录：

- 吞吐和 P50/P95/P99/P99.9 延迟。
- 错误/超时/重试率。
- CPU、RSS、IO latency、fsync、network。
- Threads、tmp table、buffer pool、log waits、dirty pages、lock waits。
- 复制 lag/backlog 和恢复到 0 的时间。
- crash recovery 到 readiness 的时间。

### 9.4 巡检项

每日：实例/复制、备份新鲜度、磁盘耗尽预测、error log 新错误、连接/慢 SQL 异常。

每周：容量趋势、top digest、长事务、表增长、binlog/relay 保留、告警噪声和 runbook 链接。

每月：恢复演练、权限审计、证书到期、配置漂移、失败自动化审计、慢查询治理效果。

每季度：故障转移/fencing 演练、全量恢复+PITR、容量模型校准、版本和依赖升级评审。

### 9.5 升级注意事项

本仓库属于旧版 10.1 分支。升级不能只做 SQL 兼容测试：

1. 比较默认值、弃用/移除变量和存储格式。
2. 验证 binlog format、GTID、复制拓扑和跨版本回退边界。
3. 在数据副本上运行升级检查与真实数据回放。
4. 比较 optimizer plan、字符集/collation、权限认证、P_S 开销和 exporter 指标。
5. 实测崩溃恢复、备份恢复和故障转移。
6. 升级前保留可验证备份和回退位置；涉及不可逆数据字典/格式变化时，回退应采用恢复/复制方案，不能原地降级。

## 10. 从信号到动作的速查表

| 信号 | 先验证 | 常见根因 | 源码落点 | 安全动作 |
|---|---|---|---|---|
| up=0 | 进程、端口、error log、启动阶段 | crash、恢复、配置、磁盘 | `mysqld_main()` / `unireg_abort()` | 保护日志和数据，判断恢复还是故障转移 |
| connection ratio 高 | running、CPU、锁、IO | 泄漏、慢 SQL、锁、容量 | `create_new_thread()` | 限流、处理 blocker/慢 SQL |
| Aborted_connects 增 | 错误码、认证、网络 | 密码、握手、资源、超限 | `sql_connect.cc` | 修客户端/账号/网络，避免无界重试 |
| tmp disk ratio 高 | SQL digest、磁盘 temp IO | 排序/聚合、内存阈值 | tmp table status | 优化 SQL/索引，再评估内存 |
| log waits 增 | 大事务、redo 率、磁盘 | log buffer 小/突发 | InnoDB log | 削峰，评估 log buffer/事务 |
| wait free 增 | dirty、pending writes、IO latency | 刷脏跟不上 | page cleaner | 降写、查存储与 IO capacity |
| row waits 高 | blocker/waiter、事务年龄 | 长事务、热点、索引 | lock subsystem | 处理 blocker，统一访问顺序 |
| replica IO No | Last_IO_Error、网络、主 binlog | 断链/认证/日志缺失 | `handle_slave_io()` | 修复原因后受控 START SLAVE |
| replica SQL No | Last_SQL_Error、事件位置 | 数据冲突/DDL/坏事件 | `handle_slave_sql()` | 禁止盲跳，校验后修复 |
| disk forecast <24h | 文件分类、增长者 | binlog/relay/log/data/temp | mysys write retry | 停增长、扩容、受控 purge |
