---
title: SRE-Categraf
slug: SRE-Categraf
published: 2026-09-22
description: categraf采集通用配置。
image: '../../assets/images/Dota-img/spirit_breaker_noob.jpg'
tags:
  - Categraf
  - SRE
category: SRE
draft: false
lang: zh-CN
pinned: false
comment: true
---
```
当前 `v0.3.45` 默认已经覆盖：

- CPU 总体使用率
- 内存和 Swap 容量
- Load Average
- 文件系统容量和 inode
- 磁盘 IOPS、吞吐、耗时、队列
- 网卡流量、丢包、错误
- 系统进程状态
- 内核中断、上下文切换
- Socket、conntrack 等基础指标
- OOM Kill 计数

主要缺口是：内存回收过程、单核热点、TCP 协议异常、关键进程归因、服务重启、时间同步和业务端口可用性。
```

## 一、所有 Linux 服务器建议启用

### 1. 扩充 kernel_vmstat

默认配置基本只启用了：

```toml
oom_kill = 1
```

这只能知道发生过 OOM，无法知道 OOM 前是否出现换页、直接回收、脏页回写和内存抖动。

修改 `conf/input.kernel_vmstat/kernel_vmstat.toml`：

```toml
[white_list]
oom_kill = 1

# Swap 换页
pswpin = 1
pswpout = 1

# 缺页
pgfault = 1
pgmajfault = 1

# 脏页与回写
nr_dirty = 1
nr_writeback = 1
nr_dirtied = 1
nr_written = 1

# 工作集抖动
workingset_refault = 1
workingset_activate = 1
workingset_nodereclaim = 1

# 后台内存回收
pgscan_kswapd_normal = 1
pgsteal_kswapd_normal = 1

# 业务线程直接回收
pgscan_direct_normal = 1
pgsteal_direct_normal = 1
pgscan_direct_throttle = 1
allocstall = 1

# 内存碎片整理
compact_stall = 1
compact_fail = 1
compact_success = 1
```

不同内核的 `/proc/vmstat` 字段可能不同；不存在的字段不会产生指标。

重点告警：

```promql
increase(kernel_vmstat_oom_kill[5m]) > 0
```

```promql
rate(kernel_vmstat_pswpout[5m]) > 0
```

```promql
rate(kernel_vmstat_pgmajfault[5m]) > 0
```

```promql
rate(kernel_vmstat_pgscan_direct_normal[5m]) > 0
```

这组指标是通用服务器最值得补齐的内容。

---

### 2. 开启每个 CPU 核心的指标

默认只采集整体 CPU，可能发现不了：

- 单核跑满
- 软中断集中在单核
- IRQ 不均衡
- 单线程业务瓶颈

修改 `conf/input.cpu/cpu.toml`：

```toml
collect_per_cpu = true
```

查询单核热点：

```promql
100 - cpu_usage_idle{ident="$ident",cpu!="cpu-total"}
```

找最繁忙的 CPU：

```promql
topk(
  5,
  100 - cpu_usage_idle{ident="$ident",cpu!="cpu-total"}
)
```

核心数非常多的机器会增加时序数量，但通常仍在可控范围内。

---

### 3. 开启 TCP/IP 扩展统计

默认网卡层已经采集流量、错误、丢包，但：

```toml
tcp_ext = false
ip_ext = false
```

因此无法完整判断：

- TCP 重传
- Listen 队列溢出
- SYN 丢弃
- TCP reset
- 超时
- IP 层丢包

修改 `conf/input.netstat/netstat.toml`：

```toml
disable_summary_stats = false

# 保持关闭，避免大量连接机器遍历所有 socket
disable_connection_stats = true

tcp_ext = true
ip_ext = true
```

建议保持：

```toml
disable_connection_stats = true
```

因为逐连接扫描在连接数很多的服务器上开销可能较大。TCP/IP 扩展计数直接读取 `/proc/net/netstat`，成本相对较低。

另外可以在 `conf/input.net/net.toml` 中启用：

```toml
collect_protocol_stats = true
```

但它与 `netstat` 的部分协议指标会有重叠。通常优先开启 `tcp_ext` 和 `ip_ext` 即可。

---

### 4. 开启 NTP 时间偏差

默认 `input.ntp` 没有配置服务器，所以不会采集。

修改 `conf/input.ntp/ntp.toml`：

```toml
interval = 60

ntp_servers = [
  "公司内部NTP地址",
  "备用NTP地址"
]

timeout = 3
```

产生：

```promql
ntp_offset_ms
```

时间偏差会影响：

- 日志时间线
- 分布式事务
- TLS证书校验
- Token有效期
- 集群选主
- 故障事件关联

建议使用内部 NTP，避免所有服务器频繁访问公网 NTP。

---

## 二、按服务器角色启用

### 5. 关键进程的 procstat

默认只有服务器进程总数和状态：

```promql
processes_total
processes_running
processes_blocked
```

默认不会采集每个应用进程的 CPU、RSS、I/O、FD 和线程。

应为以下关键进程配置 `procstat`：

- 主业务进程
- 数据库
- Web服务器
- 容器运行时
- 日志采集 Agent
- 监控 Agent
- 堡垒机 Agent
- 安全 Agent
- 备份进程

示例：

```toml
interval = 15

[[instances]]
search_exec_substring = "categraf"
labels = { process_group = "monitor-agent" }

gather_total = true
gather_per_pid = true
gather_more_metrics = [
  "mem",
  "cpu",
  "io",
  "fd",
  "threads",
  "uptime",
  "limit"
]

[[instances]]
search_cmdline_substring = "healthCheck.py"
labels = { process_group = "bastion-agent" }

gather_total = true
gather_per_pid = true
gather_more_metrics = [
  "mem",
  "cpu",
  "io",
  "fd",
  "threads",
  "uptime"
]
```

关键指标：

```promql
procstat_mem_rss
procstat_mem_swap
procstat_cpu_usage
procstat_read_bytes
procstat_write_bytes
procstat_num_fds
procstat_num_threads
procstat_uptime
procstat_lookup_count
```

需要特别监控“变化速度”，而不仅是当前最大值：

```promql
deriv(procstat_mem_rss{ident="$ident"}[15m])
```

```promql
deriv(procstat_num_fds{ident="$ident"}[15m])
```

```promql
deriv(procstat_num_threads{ident="$ident"}[15m])
```

#### 是否采集全部进程

技术上可以：

```toml
[[instances]]
search_exec_regexp = ".*"
labels = { process_group = "all" }

gather_total = false
gather_per_pid = true
gather_more_metrics = ["mem", "cpu"]
```

但不建议在全部服务器长期使用，因为 PID 不断变化会造成很高的时序基数。

更合理的方式是：

- 长期监控关键进程和所有旁路 Agent。
- 故障期间临时开启全进程采集。
- 对进程较少、故障要求较高的服务器，可以接受全进程采集。

---

### 6. 开启 systemd 服务状态

当前配置默认：

```toml
enable = false
```

建议只采集关键服务，不要直接匹配所有 unit。

修改 `conf/input.systemd/systemd.toml`：

```toml
enable = true

unit_include = '^(sshd|chronyd|categraf|docker|containerd|业务服务)\.service$'

enable_start_time_metrics = true
enable_task_metrics = true
enable_restarts_metrics = true
```

用于识别：

- 服务停止或失败
- 服务频繁重启
- 最近启动时间
- Tasks/线程异常增长
- 故障时间是否与服务重启一致

业务服务名称需要按机器角色调整。

---

### 7. 配置端口可用性检查

基础主机指标不能证明服务端口可以接受连接。

修改 `conf/input.net_response/net_response.toml`：

```toml
[[instances]]
targets = [
  "127.0.0.1:22",
  "127.0.0.1:3306",
  "127.0.0.1:6379"
]

protocol = "tcp"
timeout = "1s"

labels = { check_type = "local_port" }
```

不过本机端口检查只能证明：

- 端口正在监听
- 本机可以完成 TCP 连接

不能证明外部用户能够访问。更完整的做法是在独立探测节点配置远程检查。

对于 HTTP 服务，应优先使用 `http_response`，检查：

- HTTP状态码
- 响应耗时
- 返回内容
- TLS连接

---

## 三、存储服务器和裸金属建议启用

### 8. SMART/NVMe健康指标

Categraf 有 `input.smart`，但需要：

- 安装 `smartctl`
- NVMe场景安装 `nvme-cli`
- Categraf具有读取设备的权限

重点监控：

- SMART健康状态
- 介质错误
- 重映射扇区
- CRC错误
- NVMe critical warning
- 温度
- 可用备用空间
- 磁盘寿命百分比

云服务器的虚拟云盘通常读不到底层 SMART，这种情况下应使用云厂商指标监控：

- 云盘IOPS和吞吐限制
- Burst额度
- 排队时间
- 云盘状态与错误
- 后端存储延迟

### 9. 修正 diskio 设备范围

默认会采集所有设备和分区，可能同时出现：

```text
vda
vda1
dm-0
```

同一次 I/O 在不同设备层重复出现，不应相加。

可以按实际设备配置：

```toml
devices = [
  "sd*",
  "vd*",
  "xvd*",
  "nvme*",
  "dm-*"
]
```

但仍要通过 `lsblk`、`dmsetup`、LVM 信息建立设备映射，明确：

```text
dm-0 → LVM → vda2 → vda
```

告警一般以最底层物理盘或云盘为主，逻辑卷用于定位业务挂载点。

---

## 四、容器宿主机额外启用

如果服务器运行 Docker或Kubernetes，仅靠宿主机指标不够，需要启用 Docker、cAdvisor或Kubelet指标：

- 容器内存使用量与限制
- Working Set
- 容器OOM
- 容器重启次数
- CPU throttling
- 容器Block I/O
- 容器网络丢包和错误
- Pod状态
- 临时存储
- inode
- conntrack使用率

否则会出现：

```text
宿主机资源正常
但单个容器已经达到 cgroup limit
```

对于容器化 Categraf，还要确保它能访问宿主机：

- `/proc`
- `/sys`
- PID namespace
- Docker socket或容器运行时接口

---

## 五、按业务风险配置

### 10. 目录文件数量

`filecount` 适合监控可能堆积的目录：

- `/tmp`
- 日志目录
- 消息堆积目录
- 上传目录
- 备份目录
- 邮件队列
- 应用spool目录

不要递归扫描特别大的目录，否则采集本身可能产生开销。

### 11. Ping、DNS和HTTP探测

按机器角色启用：

- `ping`：网关、依赖服务、存储节点
- `dns_query`：内部关键域名和DNS服务器
- `http_response`：本机和远程健康检查
- `net_response`：TCP端口
- `ntp`：时间同步

这些指标补充的是“依赖是否可用”，不是主机资源。

### 12. NFS或远程存储

使用NFS、CephFS、FUSE或其他远程存储时，需要单独启用对应客户端指标。否则：

```text
Load高
processes_blocked高
iowait高
但本地diskio正常
```

这类故障会缺少归因证据。

---

## 六、默认不建议开启

以下项目不建议所有服务器无差别启用：

- `netstat.disable_connection_stats=false`：大量连接时可能较耗CPU。
- 全进程、全PID的完整 `procstat`。
- 所有 systemd units。
- 高频SMART扫描。
- 对超大目录递归执行 filecount。
- 所有磁盘分区与Device Mapper指标求和。
- 大量外部地址15秒一次的Ping、HTTP或TCP探测。
- 无限制的容器标签、进程命令行标签。

## 推荐通用基线

所有服务器统一开启：

1. 扩展 `kernel_vmstat`。
2. 每CPU核心指标。
3. `netstat tcp_ext/ip_ext`。
4. NTP偏差。
5. Categraf自身、日志Agent、安全Agent、堡垒机Agent的 `procstat`。
6. 关键systemd服务状态和重启次数。
7. 至少一个本地关键端口检查。
8. OOM内核日志采集和告警。

按服务器角色开启：

9. 业务进程 `procstat`。
10. Docker/Kubernetes/cgroup指标。
11. SMART或云盘指标。
12. NFS/远程存储指标。
13. HTTP、DNS、TCP依赖探测。
14. 关键目录文件堆积监控。
15. 备份、定时任务和批处理的成功、失败、耗时指标。

这套基线能支持：

```text
什么时候发生
→ 哪类资源异常
→ 哪个进程增长
→ 哪个服务重启
→ 是否换页/OOM
→ 是否磁盘或网络饱和
→ 是否依赖故障
→ 是否定时任务或变更引起
```

