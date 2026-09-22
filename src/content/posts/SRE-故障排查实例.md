---
title: SRE-故障排查实例
slug: SRE-故障排查实例
published: 2026-09-22
description: 先定位，再归因；先证伪，再深入；看变化，不只看绝对值。服务器角色不等于故障归因。
image: '../../assets/images/Dota-img/pudge_noob.jpg'
tags:
  - SRE
category: SRE
draft: false
lang: zh-CN
pinned: false
comment: true
---
# SRE 通用故障排查体系

> 核心原则：**先定位，再归因；先证伪，再深入；看变化，不只看绝对值。**
>
> 本文结合一次 MariaDB 主机 OOM 事件总结。最终确认内存异常来源是堡垒机
> Agent 的 `healthCheck.py`，而不是
> MariaDB。最重要的经验是：**服务器角色不等于故障归因。**

------------------------------------------------------------------------

# 1. 通用 SRE 排障主流程

推荐固定使用：

``` text
症状
 ↓
时间
 ↓
范围 Scope
 ↓
资源 Resource
 ↓
进程 Process
 ↓
组件 Component
 ↓
行为 Behavior
 ↓
变化 Change
 ↓
根因 Root Cause
```

## 1.1 不要把角色当成根因

错误：

``` text
MariaDB 服务器
 → 内存异常
 → 一定是 MariaDB
 → 开始分析 Buffer Pool / SQL / Performance Schema
```

正确：

``` text
主机内存异常
 → 哪个资源异常？
 → 哪个进程占用/增长？
 → 进程属于哪个组件？
 → 组件发生了什么？
 → 最终根因
```

因此：

-   MariaDB Server ≠ MariaDB 一定有问题
-   ES Server ≠ Elasticsearch 一定有问题
-   K8s Node ≠ Kubernetes 一定有问题
-   Pulsar Broker ≠ Pulsar 一定有问题

------------------------------------------------------------------------

# 2. 第一阶段：定义事实，而不是定义原因

不要写：

> MariaDB 内存异常。

应该写：

> 2026-09-22 01:03 左右，Linux 主机 Available Memory 从约 4GB 降至
> 500MB，随后发生 OOM。

只记录：

-   什么资源
-   什么时间
-   什么变化
-   什么结果

不要提前加入责任组件。

------------------------------------------------------------------------

# 3. Scope：先判断故障范围

必须回答：

``` text
什么时候开始？
是否周期性？
单机还是多机？
单进程还是多进程？
单实例还是所有实例？
所有用户还是部分用户？
```

例如"每天 01:00 左右发生"，优先检查：

-   cron
-   systemd timer
-   backup
-   logrotate
-   定时报表
-   health check
-   安全扫描
-   堡垒机 Agent
-   监控 Agent
-   日志采集

而不是直接假设数据库存在内存泄漏。

------------------------------------------------------------------------

# 4. Host：先看主机资源

基础检查：

``` bash
date
uptime
free -h
vmstat 1 5
top -b -n 1
df -h
df -i
iostat -xz 1 5
ss -s
```

内存重点：

``` bash
free -h
vmstat 1 5
```

OOM：

``` bash
dmesg -T | grep -Ei 'oom|out of memory|killed process'
journalctl -k | grep -Ei 'oom|out of memory|killed process'
```

------------------------------------------------------------------------

# 5. USE Method

对每种系统资源检查：

``` text
U = Utilization     利用率
S = Saturation      饱和程度
E = Errors          错误
```

## CPU

关注：

``` text
CPU utilization
Load
Run Queue
iowait
Steal
Errors
```

命令：

``` bash
vmstat 1 5
top
mpstat -P ALL 1 5
```

## Memory

关注：

``` text
available
swap
reclaim
OOM
```

## Disk

关注：

``` text
%util
IOPS
throughput
await
queue
IO errors
```

``` bash
iostat -xz 1 5
```

## Network

关注：

``` text
RX/TX
drops
errors
queue
connections
```

------------------------------------------------------------------------

# 6. Process：进程归因

找内存占用：

``` bash
ps -eo pid,ppid,user,%cpu,%mem,rss,vsz,etime,cmd --sort=-rss | head -30
```

找 CPU：

``` bash
ps -eo pid,ppid,user,%cpu,%mem,rss,vsz,etime,cmd --sort=-%cpu | head -30
```

如果已知 PID：

``` bash
ps -p <PID> -o pid,ppid,%cpu,%mem,rss,vsz,etime,cmd
cat /proc/<PID>/status
```

重点关注：

``` text
VmRSS
VmSize
VmData
VmSwap
Threads
```

## 最大进程 ≠ 故障进程

例如：

``` text
mariadbd        6.0G → 6.1G
healthCheck.py  200M → 2.0G
```

真正应该深入的是 `healthCheck.py`。

因此：

> **静态占用用于发现目标，动态增长用于确认嫌疑。**

核心概念：

``` text
增长速度 = ΔRSS / Δtime
```

持续观察：

``` bash
watch -n 5 '
ps -eo pid,ppid,user,%cpu,%mem,rss,vsz,etime,cmd --sort=-rss | head -20
'
```

------------------------------------------------------------------------

# 7. Timeline：时间线分析

固定时间故障必须查：

``` bash
crontab -l
ls -lah /etc/cron.d/
ls -lah /etc/cron.daily/
systemctl list-timers --all
```

查看故障窗口：

``` bash
journalctl \
  --since "2026-09-22 00:50:00" \
  --until "2026-09-22 01:20:00"
```

服务：

``` bash
journalctl -u <service> \
  --since "2026-09-22 00:50:00" \
  --until "2026-09-22 01:20:00"
```

------------------------------------------------------------------------

# 8. Change Analysis

故障前检查：

``` text
应用发布
配置修改
数据库配置
OS / Kernel
JDK / Python
Agent
监控
日志采集
安全软件
定时任务
数据量
流量
依赖服务
DNS
证书
网络
```

特别不要遗漏：

``` text
Monitoring Agent
Log Agent
Bastion Agent
Security Agent
Backup
Cron
Systemd Timer
Health Check
```

------------------------------------------------------------------------

# 9. 假设 → 证据 → 证伪

错误：

``` text
假设 MariaDB
 → 深入 MariaDB
 → Buffer Pool
 → SQL
 → Performance Schema
 → 最后发现不是 MariaDB
```

正确：

``` text
假设：MariaDB 是内存增长来源
 ↓
证据：mysqld RSS 是否同步增长？
 ↓
如果否
 ↓
立即证伪
 ↓
检查其他进程
```

原则：

> **优先做成本最低、区分度最高的检查。**

------------------------------------------------------------------------

# 10. 五层故障模型

``` text
用户症状
 ↓
系统资源
 ↓
进程 / 组件
 ↓
子系统 / 行为
 ↓
根因
```

本次事件：

``` text
主机 OOM
 ↓
Memory Saturation
 ↓
healthCheck.py RSS 持续增长
 ↓
堡垒机 Agent
 ↓
healthCheck.py 内存异常
```

------------------------------------------------------------------------

# 11. 服务层：RED / Four Golden Signals

服务层可以采用：

``` text
R = Rate
E = Errors
D = Duration
```

Google SRE 常用 Four Golden Signals：

``` text
Latency
Traffic
Errors
Saturation
```

MariaDB 示例：

  维度         示例
------------ ----------------------------------------------
  Traffic      QPS / TPS / Connections
  Latency      Query Latency
  Errors       Timeout / Deadlock / Error
  Saturation   CPU / IO / Connections / Locks / Buffer Pool

注意：

> 服务指标异常不等于服务本身一定是根因。

------------------------------------------------------------------------

# 12. 依赖图必须包含旁路组件

不要只画：

``` text
用户 → 应用 → MariaDB → Linux
```

还应考虑：

``` text
                     ┌─ Monitoring Agent
                     ├─ Log Agent
                     ├─ Bastion Agent
                     ├─ Security Agent
                     ├─ Backup
                     ├─ Cron
                     └─ Systemd Timer
                            │
用户 → 应用 → MariaDB → Linux
```

旁路组件同样可能造成 CPU、内存、IO、FD、网络问题。

------------------------------------------------------------------------

# 13. 5 分钟应急排障法

## 30 秒：确认事实

``` bash
date
uptime
free -h
```

## 1 分钟：找资源

``` bash
vmstat 1 5
top -b -n 1
iostat -xz 1 5
```

## 1 分钟：找进程

``` bash
ps -eo pid,ppid,%cpu,%mem,rss,vsz,etime,cmd --sort=-rss | head -20
ps -eo pid,ppid,%cpu,%mem,rss,vsz,etime,cmd --sort=-%cpu | head -20
```

## 1 分钟：找时间线

``` bash
journalctl --since "1 hour ago"
systemctl list-timers --all
crontab -l
```

## 最后 1 分钟

``` text
谁在增长？
什么时候开始？
是否周期性？
最近发生了什么变化？
```

在确认 MariaDB 是根因之前：

> **不要进入 MariaDB 内部深挖。**

------------------------------------------------------------------------

# 14. MariaDB Performance Schema：什么时候开始查？

只有完成：

``` text
Host
 ↓
Memory
 ↓
Process
 ↓
确认 mysqld RSS 明显增长
```

之后，才进入 MariaDB 内部。

推荐顺序：

``` text
mysqld RSS
 ↓
Buffer Pool
 ↓
Connection / Thread
 ↓
SQL / Statement
 ↓
Temporary Table
 ↓
Sort / Join
 ↓
Performance Schema
 ↓
Storage Engine
 ↓
具体 EVENT_NAME
```

------------------------------------------------------------------------

# 15. MariaDB Performance Schema 内存监控

参考文档：

```
https://mariadb.com/docs/server/reference/system-tables/performance-schema/performance-schema-digests
```

用户实际环境：

``` text
MariaDB 10.6.13-MariaDB-log
```

确认：

``` sql
SHOW VARIABLES LIKE 'performance_schema';
```

启用配置：

``` ini
[mysqld]
performance_schema=ON
performance-schema-instrument='memory/%=ON'
```

启用后需要重启 MariaDB。

检查 memory instrumentation：

``` sql
SELECT *
FROM performance_schema.setup_instruments
WHERE NAME LIKE 'memory/%'
LIMIT 20;
```

------------------------------------------------------------------------

# 16. 核心表：memory_summary_global_by_event_name

核心查询：

``` sql
SELECT
    EVENT_NAME,
    CURRENT_NUMBER_OF_BYTES_USED,
    HIGH_NUMBER_OF_BYTES_USED,
    SUM_NUMBER_OF_BYTES_ALLOC,
    SUM_NUMBER_OF_BYTES_FREE,
    COUNT_ALLOC,
    COUNT_FREE
FROM performance_schema.memory_summary_global_by_event_name
WHERE CURRENT_NUMBER_OF_BYTES_USED > 0
   OR HIGH_NUMBER_OF_BYTES_USED > 0
ORDER BY CURRENT_NUMBER_OF_BYTES_USED DESC
LIMIT 50;
```

------------------------------------------------------------------------

# 17. 字段解释

  字段                           含义
------------------------------ -----------------------------
  EVENT_NAME                     memory instrumentation 名称
  CURRENT_NUMBER_OF_BYTES_USED   当前使用内存
  HIGH_NUMBER_OF_BYTES_USED      历史最高使用量
  SUM_NUMBER_OF_BYTES_ALLOC      累计分配字节
  SUM_NUMBER_OF_BYTES_FREE       累计释放字节
  COUNT_ALLOC                    累计分配次数
  COUNT_FREE                     累计释放次数

判断：

``` text
CURRENT → 当前占用
HIGH → 历史峰值
ALLOC/FREE → 分配释放行为
COUNT_ALLOC/FREE → 次数
```

例如：

``` text
CURRENT = 100MB
HIGH    = 2GB
```

只能说明历史峰值很高，不能直接证明当前泄漏。

------------------------------------------------------------------------

# 18. 按 MariaDB 内存类别聚合

``` sql
SELECT
    CASE
        WHEN EVENT_NAME LIKE 'memory/innodb/%' THEN 'innodb'
        WHEN EVENT_NAME LIKE 'memory/sql/%' THEN 'sql'
        WHEN EVENT_NAME LIKE 'memory/performance_schema/%'
            THEN 'performance_schema'
        ELSE 'other'
    END AS category,
    SUM(CURRENT_NUMBER_OF_BYTES_USED) AS current_bytes,
    SUM(HIGH_NUMBER_OF_BYTES_USED) AS high_bytes
FROM performance_schema.memory_summary_global_by_event_name
GROUP BY category
ORDER BY current_bytes DESC;
```

用于快速判断：

``` text
InnoDB
SQL
Performance Schema
Other
```

哪个类别占用较大。

------------------------------------------------------------------------

# 19. Buffer Pool

常见 instrumentation：

``` text
memory/innodb/buf_buf_pool
```

查询：

``` sql
SELECT
    EVENT_NAME,
    CURRENT_NUMBER_OF_BYTES_USED,
    HIGH_NUMBER_OF_BYTES_USED
FROM performance_schema.memory_summary_global_by_event_name
WHERE EVENT_NAME = 'memory/innodb/buf_buf_pool';
```

同时：

``` sql
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
```

如果：

``` text
innodb_buffer_pool_size = 2147483648
```

即：

``` text
2 GiB
```

看到约 2GiB Buffer Pool 并不能直接判定泄漏。

------------------------------------------------------------------------

# 20. SQL / Connection 相关内存

常见事件：

``` text
memory/sql/THD::main_mem_root
memory/sql/thd::main_mem_root
memory/sql/TABLE
memory/sql/TABLE_SHARE::mem_root
memory/sql/sp_head::main_mem_root
```

同时检查连接：

``` sql
SHOW GLOBAL STATUS LIKE 'Threads_connected';
SHOW GLOBAL STATUS LIKE 'Threads_running';
SHOW GLOBAL STATUS LIKE 'Max_used_connections';
```

还应检查：

``` sql
SHOW VARIABLES LIKE 'max_connections';
SHOW VARIABLES LIKE 'sort_buffer_size';
SHOW VARIABLES LIKE 'join_buffer_size';
SHOW VARIABLES LIKE 'read_buffer_size';
SHOW VARIABLES LIKE 'read_rnd_buffer_size';
SHOW VARIABLES LIKE 'thread_stack';
```

注意：

> per-thread 参数很多是按需分配，不能简单用
> `max_connections × 所有 buffer` 当成实际 RSS。

它更适合作为潜在风险上限。

------------------------------------------------------------------------

# 21. 临时表与 SQL 行为

检查：

``` sql
SHOW GLOBAL STATUS LIKE 'Created_tmp_tables';
SHOW GLOBAL STATUS LIKE 'Created_tmp_disk_tables';

SHOW VARIABLES LIKE 'tmp_table_size';
SHOW VARIABLES LIKE 'max_heap_table_size';
```

如果临时表持续增长，再深入：

``` text
GROUP BY
ORDER BY
JOIN
临时表大小
磁盘临时表
具体 SQL
```

------------------------------------------------------------------------

# 22. Statement Consumer

如果需要继续追踪：

``` text
哪个 SQL
哪个线程
什么时间
```

可以考虑：

``` ini
performance-schema-consumer-events-statements-current=ON
performance-schema-consumer-events-statements-history=ON
performance-schema-consumer-statements-digest=ON
```

高连接数生产环境对：

``` ini
performance-schema-consumer-events-statements-history-long=ON
```

应谨慎评估。

建议：

  Consumer                  建议
------------------------- ----------
  statements-current        建议开启
  statements-history        建议开启
  statements-history-long   谨慎
  statements-digest         建议开启

------------------------------------------------------------------------

# 23. Categraf 采集 Performance Schema Memory

可以使用 MySQL 自定义 Query 将：

``` text
performance_schema.memory_summary_global_by_event_name
```

转成 Prometheus 指标。

示例：

``` toml
[[instances.queries]]
measurement = "performance_schema_memory"

tag_fields = ["event_name"]

metric_fields = [
  "current_bytes",
  "high_bytes",
  "alloc_bytes",
  "free_bytes",
  "count_alloc",
  "count_free"
]

timeout = "3s"

request = '''
SELECT
    EVENT_NAME AS event_name,
    CURRENT_NUMBER_OF_BYTES_USED AS current_bytes,
    HIGH_NUMBER_OF_BYTES_USED AS high_bytes,
    SUM_NUMBER_OF_BYTES_ALLOC AS alloc_bytes,
    SUM_NUMBER_OF_BYTES_FREE AS free_bytes,
    COUNT_ALLOC AS count_alloc,
    COUNT_FREE AS count_free
FROM performance_schema.memory_summary_global_by_event_name
WHERE CURRENT_NUMBER_OF_BYTES_USED > 0
   OR HIGH_NUMBER_OF_BYTES_USED > 0
ORDER BY CURRENT_NUMBER_OF_BYTES_USED DESC
LIMIT 30
'''
```

注意：

> Categraf 具体字段名以当前版本 schema 为准，通常使用
> `measurement`，不要误写成 `mesurement`。

------------------------------------------------------------------------

# 24. PromQL

当前内存占用：

``` promql
topk(
  20,
  performance_schema_memory_current_bytes
)
```

按 event：

``` promql
sum by (event_name) (
  performance_schema_memory_current_bytes
)
```

如果增加 category 标签：

``` promql
sum by (category) (
  performance_schema_memory_current_bytes
)
```

观察增长趋势：

``` promql
deriv(
  performance_schema_memory_current_bytes[15m]
)
```

实际生产中应结合指标采集周期和 event 的行为选择合适窗口。

------------------------------------------------------------------------

# 25. MariaDB OOM 完整 Checklist

## Host

``` bash
free -h
vmstat 1 5
top
ps aux --sort=-%mem | head -20
dmesg -T | grep -Ei 'oom|out of memory|killed process'
```

## mysqld

``` bash
pidof mariadbd
pidof mysqld

ps -p <PID> -o pid,ppid,%cpu,%mem,rss,vsz,etime,cmd
```

## MariaDB

``` sql
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';

SHOW GLOBAL STATUS LIKE 'Threads_connected';
SHOW GLOBAL STATUS LIKE 'Threads_running';
SHOW GLOBAL STATUS LIKE 'Max_used_connections';

SHOW GLOBAL STATUS LIKE 'Created_tmp_tables';
SHOW GLOBAL STATUS LIKE 'Created_tmp_disk_tables';
```

## Performance Schema

``` sql
SELECT
    EVENT_NAME,
    CURRENT_NUMBER_OF_BYTES_USED,
    HIGH_NUMBER_OF_BYTES_USED,
    SUM_NUMBER_OF_BYTES_ALLOC,
    SUM_NUMBER_OF_BYTES_FREE,
    COUNT_ALLOC,
    COUNT_FREE
FROM performance_schema.memory_summary_global_by_event_name
ORDER BY CURRENT_NUMBER_OF_BYTES_USED DESC
LIMIT 50;
```

## Timeline

``` bash
systemctl list-timers --all
crontab -l
journalctl --since "1 hour ago"
```

------------------------------------------------------------------------

# 26. 常见错误排障模式

## 错误一：按服务器角色归因

``` text
MariaDB Server
 → MariaDB 有问题
```

正确：

``` text
MariaDB Server
 → Linux Memory
 → 哪个进程？
 → 哪个组件？
```

## 错误二：看到最大进程就认定根因

``` text
mysqld RSS 最大
 → mysqld 导致 OOM
```

正确：

``` text
最大进程
+
增长速度
+
时间线
+
事件关联
```

## 错误三：一开始就进入应用内部

错误：

``` text
MariaDB
 → Buffer Pool
 → SQL
 → Performance Schema
```

正确：

``` text
Host
 → Resource
 → Process
 → Component
 → Application internals
```

## 错误四：只看瞬时值

应该比较：

``` text
RSS(t0)
RSS(t1)
RSS(t2)
```

而不是只看：

``` text
RSS(now)
```

## 错误五：忽略旁路组件

必须考虑：

``` text
Agent
Monitor
Log Collector
Security Agent
Backup
Cron
Systemd Timer
Health Check
```

------------------------------------------------------------------------

# 27. 长期固定 Checklist

## Scope

``` text
[ ] 什么时候开始？
[ ] 是否周期性？
[ ] 单机还是多机？
[ ] 单进程还是多进程？
[ ] 单实例还是全部实例？
[ ] 所有用户还是部分用户？
```

## Resource

``` text
[ ] CPU
[ ] Memory
[ ] Disk
[ ] Network
[ ] Load
[ ] IO Wait
[ ] File Descriptor
[ ] Process
[ ] Thread
[ ] Connection
[ ] Kernel
[ ] Cgroup
```

## Process

``` text
[ ] CPU 最高？
[ ] RSS 最大？
[ ] RSS 增长最快？
[ ] FD 增长？
[ ] Thread 增长？
[ ] IO 异常？
[ ] Network 异常？
[ ] 是否频繁重启？
```

## Change

``` text
[ ] 最近发布？
[ ] 配置变化？
[ ] 数据量变化？
[ ] 流量变化？
[ ] 定时任务？
[ ] Agent 更新？
[ ] 监控变化？
[ ] 日志变化？
[ ] OS/Kernel 更新？
[ ] 依赖服务变化？
```

------------------------------------------------------------------------

# 28. 本次 MariaDB OOM 事件的正确复盘

错误路径：

``` text
MariaDB Server
 ↓
凌晨内存上涨
 ↓
认为 MariaDB 内存异常
 ↓
Buffer Pool
 ↓
Performance Schema
 ↓
SQL
 ↓
最终发现不是 MariaDB
```

正确路径：

``` text
主机 Memory Saturation
 ↓
OOM
 ↓
检查进程 RSS
 ↓
发现多个进程
 ↓
比较 RSS 增长速度
 ↓
healthCheck.py 快速增长
 ↓
确认属于堡垒机 Agent
 ↓
继续分析 Agent
 ↓
最终定位 Agent 内存异常
```

真正应该沉淀的不是：

> "以后 MariaDB OOM 要检查 healthCheck.py。"

而是：

> **以后任何 OOM，都先完成 Host → Process
> Attribution，再决定进入哪个组件。**

------------------------------------------------------------------------

# 29. 最终脑回路

遇到任何生产故障，强制自己先问：

``` text
1. 我看到的是事实，还是我的解释？

2. 故障什么时候开始？

3. 是单机、单进程，还是整个系统？

4. 哪一个资源异常？

5. 哪个进程在占用？

6. 哪个进程在增长？

7. 这个进程属于哪个组件？

8. 这个组件发生了什么行为？

9. 最近发生了什么变化？

10. 当前假设有什么证据？
```

最重要的一句：

> **不要先问"哪个组件最可能有问题"，先问"什么证据能够证明或证伪它"。**

------------------------------------------------------------------------

# 30. 一页纸总纲

``` text
症状
 ↓
时间线
 ↓
Scope
 ↓
Resource
 ├─ CPU
 ├─ Memory
 ├─ Disk
 ├─ Network
 └─ FD / Thread / Connection
 ↓
Process
 ├─ 谁占用？
 └─ 谁增长？
 ↓
Component
 ↓
Behavior
 ↓
Change
 ↓
Root Cause
```

方法论组合：

``` text
Host        → USE
Service     → RED / Four Golden Signals
Process     → Attribution / ΔRSS
Timeline    → Change Analysis
Component   → Internal Metrics
MariaDB     → Performance Schema
Root Cause  → Evidence + Falsification
```

## 核心口诀

> **先症状，后原因；先主机，后进程；先资源，后组件；先证伪，后深入；看增长，不只看绝对值。**
