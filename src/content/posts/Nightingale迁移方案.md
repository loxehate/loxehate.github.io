---
title: Nightingale迁移方案
slug: Nightingale迁移方案
published: 2026-09-14
description: Nightingale跨云节点角色互换迁移方案。
image: '../../assets/images/Dota-img/axe.png'
tags:
  - Nightingale
category: 监控观测
draft: false
lang: zh-CN
pinned: false
comment: true
---
# Nightingale迁移方案

## 1. 文档目的

本文用于在**不迁移现有 RDS MySQL、不删除任何节点**的前提下，完成以下角色互换：

| 节点 | 切换前角色 | 切换前 EngineName | 切换后角色 | 切换后 EngineName |
| --- | --- | --- | --- | --- |
| `a-bj4` | `n9e-edge` | `a-bj4` | `n9e-server` | `a-bj4` |
| `bj4` | `n9e-server` | `bj4` | `n9e-edge` | `bj4` |
| `dg` | `n9e-edge` | `dg` | 不变 | `dg` |
| `bj1` | `n9e-edge` | `bj1` | 不变 | `bj1` |

切换后，`a-bj4` 上的 `n9e-server` 继续连接当前 RDS MySQL。本文不修改 `datasource.cluster_name` 和 `target.engine_name`，也不包含后续 `bj4`、`bj1` 节点下线工作。

## 2. 核心原则

1. `EngineName` 保持不变，只互换进程角色。
2. 新旧 server 不同时运行，避免并发执行数据库迁移和重复执行中心任务。
3. 切换期间只允许一个对外可写的 center API。
4. `a-bj4` 新 server 复用当前 server 使用的 RDS MySQL 和 center Redis。
5. `bj4` 新 edge 必须使用独立的 edge Redis，不能与 center Redis 共用。
6. 两台机器使用完全相同版本、相同构建来源的 `n9e`/`n9e-edge`。
7. 原 bj4 server 配置、二进制、数据目录和服务定义至少保留 7 天，不立即删除。

## 3. 源码相关结论

- `n9e-server` 启动时连接 `[DB]`、设置 `IsCenter=true`，并自动执行数据库迁移。
- `n9e-edge` 不直接连接 MySQL，设置 `IsCenter=false`，通过 `[CenterApi]` 访问 server。
- edge 会把收到的主机心跳强制标记为本节点的 `EngineName`。
- edge 只加载 `cluster_name` 与自身 `EngineName` 相同或为空的数据源。
- server 和 edge 都参与告警引擎心跳和告警计算，因此互换时保留 EngineName 可避免数据源、主机归属同时发生变化。

## 4. 变更范围

### 4.1 本次变更包含

- 在 `a-bj4` 停止 `n9e-edge`，部署并启动 `n9e-server`。
- 在 `bj4` 停止 `n9e-server`，部署并启动 `n9e-edge`。
- 将 `dg`、`bj1`、`bj4` edge 的 `CenterApi.Addrs` 指向新的 a-bj4 server。
- 将 Web、API、Agent 直连入口从旧 bj4 server 切换至新 a-bj4 server。
- 验证 EngineName、数据源、主机心跳、告警及通知。

### 4.2 本次变更不包含

- RDS MySQL 迁移。
- center Redis 迁移。
- `datasource.cluster_name` 批量修改。
- `target.engine_name` 批量修改。
- EmbeddedTSDB 历史数据迁移。
- `bj4`、`bj1` 节点或云资源删除。

## 5. 变更前必须确认的信息

执行前填写下表，不能留空：

| 项目 | 当前值 |
| --- | --- |
| 当前 bj4 server 地址 | `<OLD_CENTER_URL>` |
| 新 a-bj4 server 地址 | `<NEW_CENTER_URL>` |
| 当前 RDS 地址 | `<RDS_HOST>:<RDS_PORT>` |
| 当前 center Redis 地址 | `<CENTER_REDIS_HOST>:<PORT>` |
| bj4 edge 独立 Redis 地址 | `<BJ4_EDGE_REDIS_HOST>:<PORT>` |
| server systemd 服务名 | `<SERVER_UNIT>` |
| edge systemd 服务名 | `<EDGE_UNIT>` |
| server 配置目录 | `<SERVER_CONFIG_DIR>` |
| edge 配置目录 | `<EDGE_CONFIG_DIR>` |
| Nightingale 版本 | `<VERSION>` |
| server 二进制 SHA256 | `<SHA256>` |
| `--crypto-key` 来源 | `<SECRET_MANAGER_OR_UNIT>` |
| Web/API 对外域名 | `<PUBLIC_N9E_DOMAIN>` |
| CenterApi 稳定域名 | `<CENTER_API_DOMAIN>` |

如果不是 systemd 部署，应把本文的 `systemctl`/`journalctl` 命令替换为实际的 Docker、Kubernetes 或进程管理命令。

## 6. 网络与依赖检查

### 6.1 a-bj4 新 server 必须可访问

- 当前 RDS MySQL。
- 当前 center Redis。
- 所有需要由中心查询或测试的数据源。
- 通知渠道、Webhook、SMTP、IM 平台。
- 外部 TSDB Writer。
- SSO、LDAP、OIDC 等认证服务。

建议全部走专线、VPN 或云内网互联，不建议长期通过公网连接 RDS/Redis。

在 a-bj4 执行：

```bash
nc -vz <RDS_HOST> <RDS_PORT>
nc -vz <CENTER_REDIS_HOST> <CENTER_REDIS_PORT>
mysql -h <RDS_HOST> -P <RDS_PORT> -u <N9E_DB_USER> -p -e "SELECT 1"
redis-cli -h <CENTER_REDIS_HOST> -p <CENTER_REDIS_PORT> PING
```

同时确认：

- RDS 白名单已经放行 a-bj4 的实际出口地址。
- Redis ACL/白名单已经放行 a-bj4。
- a-bj4 入站已开放 server HTTP 端口，默认 `17000`。
- a-bj4 入站已按需要开放 Ibex RPC 端口，默认 `20090`。
- bj4 入站已开放 edge HTTP 端口，默认 `19000`。
- 所有节点时间同步正常。

### 6.2 跨云延迟检查

本次不迁移 RDS，因此 a-bj4 server 的数据库访问会变成跨云访问。变更前至少连续观测 15 分钟：

```bash
ping <RDS_HOST>
```

并用数据库客户端重复执行轻量查询，记录平均和最大耗时。若出现持续丢包、明显抖动或链路只有单路径，不应实施本次角色互换。

## 7. 备份与基线采集

### 7.1 配置和程序备份

在 bj4 和 a-bj4 分别备份：

- 当前配置目录。
- systemd unit 或容器编排文件。
- 当前二进制/镜像 digest。
- 环境变量文件。
- TLS 证书和私钥。
- `--crypto-key` 的引用方式，禁止把明文密钥写入本文或普通日志。
- `logs/evallog`。
- 如果启用了 EmbeddedTSDB，备份其数据目录。

推荐备份目录命名：

```text
/opt/n9e/backup/role-swap-YYYYMMDD-HHMM/
```

### 7.2 版本和校验值

在两台机器执行并保存结果：

```bash
/opt/n9e/n9e -version
/opt/n9e/n9e-edge -version
sha256sum /opt/n9e/n9e /opt/n9e/n9e-edge
```

如果实际路径不同，替换为真实路径。两边版本必须完全一致。

### 7.3 数据库基线

在当前 RDS 执行：

```sql
SELECT NOW() AS db_time, @@hostname AS db_host, @@version AS db_version;

SELECT engine_name, COUNT(*) AS target_count
FROM target
GROUP BY engine_name
ORDER BY engine_name;

SELECT cluster_name, COUNT(*) AS datasource_count
FROM datasource
GROUP BY cluster_name
ORDER BY cluster_name;

SELECT instance, engine_cluster, datasource_id,
       FROM_UNIXTIME(clock) AS last_heartbeat
FROM alerting_engines
ORDER BY engine_cluster, instance, datasource_id;
```

保存查询结果，作为切换后对照。不要删除 `alerting_engines` 记录。

### 7.4 功能基线

变更前记录：

- 当前活动主机数量。
- 各 EngineName 对应的数据源数量。
- 当前告警数量。
- 最近一条成功通知时间。
- 每个 EngineName 至少一条可用于验证的测试规则。
- Web 登录、仪表盘查询、数据源查询的截图或结果。

## 8. 配置准备

### 8.1 a-bj4 新 server 配置

以**当前 bj4 server 的完整配置目录**为基础复制到 a-bj4，不要以 edge 配置为基础拼接 server 配置。至少修改以下内容：

```toml
[HTTP]
Host = "0.0.0.0"
Port = 17000

[DB]
DBType = "mysql"
DSN = "<保持当前RDS的DSN>"

[Redis]
Address = "<保持当前center Redis地址>"
RedisType = "<保持当前center Redis类型>"

[Alert]
[Alert.Heartbeat]
IP = "<a-bj4可被其他节点访问的地址>"
Interval = 1000
EngineName = "a-bj4"
```

同时原样保留或逐项核对：

- `[HTTP.JWTAuth]`、`[HTTP.APIForAgent]`、`[HTTP.APIForService]`。
- `[Center]`、SSO、LDAP、OIDC 配置。
- `[Pushgw]` 和所有 Writer。
- `[Ibex]`。
- 通知、Webhook 和代理配置。
- RSA 配置。
- 启动使用的 `--crypto-key`。

注意：新 server 第一次启动会连接现有 RDS 并执行自动 schema 检查/迁移，所以只能在旧 bj4 server 停止后启动。

### 8.2 EmbeddedTSDB 检查

检查当前 bj4 server 的实际配置：

```toml
[EmbeddedTSDB]
Enable = true|false
```

若为 `false`，继续执行。

若为 `true`，必须明确接受以下影响后才能切换：

- 历史指标仍在 bj4 本地磁盘，不会因角色互换自动出现在 a-bj4。
- 新 a-bj4 server 如果使用空目录启动，会得到一个新的 EmbeddedTSDB。
- bj4 改成 edge 后，即使配置中仍有 `[EmbeddedTSDB] Enable=true`，edge 进程也会忽略该配置。

本次既然不迁移本地 TSDB，推荐在变更单中明确记录“EmbeddedTSDB 历史暂留 bj4，旧目录禁止删除”，或者在实施前关闭本次变更，另行制定 TSDB 迁移方案。

### 8.3 bj4 新 edge 配置

以当前 a-bj4 的 edge 配置为模板，在 bj4 创建独立 edge 配置目录：

```toml
[CenterApi]
Addrs = ["https://<NEW_CENTER_URL>"]
BasicAuthUser = "<与新server的APIForService匹配>"
BasicAuthPass = "<与新server的APIForService匹配>"
Timeout = 9000

[HTTP]
Host = "0.0.0.0"
Port = 19000

[Alert]
[Alert.Heartbeat]
IP = "<bj4可被a-bj4访问的地址>"
Interval = 1000
EngineName = "bj4"

[Redis]
Address = "<bj4 edge独立Redis>"
RedisType = "<standalone/cluster/sentinel>"
```

`[Pushgw]` 和 Writer 应按 bj4 当前指标写入链路配置，不能无条件照抄 a-bj4 的 Writer 地址。

bj4 edge 配置中不要继续使用 center Redis。

### 8.4 dg、bj1 配置

提前生成但不要立即生效：

```toml
[CenterApi]
Addrs = ["https://<NEW_CENTER_URL>"]
```

其余配置，特别是 `EngineName = "dg"` 和 `EngineName = "bj1"`，保持不变。

### 8.5 推荐的配置目录隔离

建议明确分离：

```text
/opt/n9e/etc-server/
/opt/n9e/etc-edge/
```

对应启动方式：

```bash
/opt/n9e/n9e -configs /opt/n9e/etc-server -crypto-key '<由安全机制注入>'
/opt/n9e/n9e-edge -configs /opt/n9e/etc-edge -crypto-key '<由安全机制注入>'
```

也可以使用源码支持的环境变量：

```bash
N9E_CONFIGS=/opt/n9e/etc-server
N9E_EDGE_CONFIGS=/opt/n9e/etc-edge
```

不要让 server 和 edge 读取同一个混合配置目录。

## 9. 流量入口规划

### 9.1 CenterApi

推荐所有 edge 使用一个稳定域名：

```text
https://<CENTER_API_DOMAIN> -> a-bj4:17000
```

切换前指向 bj4 server，切换时原子修改到 a-bj4 server。

切换期间不要把两个地址同时放进 `CenterApi.Addrs`。当两个地址都健康时，edge 可能随机向任意一个地址发请求，导致中心写流量分散。

### 9.2 Agent/Pushgw 入口

如果 Agent 当前直接访问：

- `a-bj4:19000`：切换后需要改到 `a-bj4:17000`，或通过反向代理把旧入口转发到新 server。
- `bj4:17000`：切换后需要改到 `bj4:19000`，或通过反向代理把旧入口转发到新 edge。

如果已有域名或负载均衡，优先只修改后端，不批量修改 Agent。

### 9.3 Web/API 入口

Web、OpenAPI、回调地址、SSO redirect URI、Webhook 回调等统一检查是否依赖旧 bj4 IP。能使用稳定域名的全部使用域名。

## 10. 正式切换步骤

以下步骤按顺序执行。每一步失败时停止继续操作。

### 10.1 进入维护窗口

1. 暂停 Nightingale 配置变更。
2. 通知业务方进入维护窗口。
3. 如有必要，创建临时告警静默，避免进程恢复时产生重复通知。
4. 确认 a-bj4 server、bj4 edge 配置已经完成但尚未启动。
5. 确认 dg、bj1 的新 CenterApi 配置已经准备好。

### 10.2 停止 a-bj4 旧 edge

```bash
sudo systemctl stop <A_BJ4_EDGE_UNIT>
sudo systemctl is-active <A_BJ4_EDGE_UNIT>
```

期望结果为 `inactive`。确认没有残留进程：

```bash
pgrep -a n9e-edge
ss -lntp | grep ':19000'
```

保留其原配置和本地 Redis，不删除。

### 10.3 停止 bj4 旧 server

```bash
sudo systemctl stop <BJ4_SERVER_UNIT>
sudo systemctl is-active <BJ4_SERVER_UNIT>
```

确认：

```bash
pgrep -a '/opt/n9e/n9e'
ss -lntp | grep ':17000'
```

记录停止时间。此时开始计算 center API 中断时间。

### 10.4 启动 a-bj4 新 server

```bash
sudo systemctl start <A_BJ4_SERVER_UNIT>
sudo systemctl status <A_BJ4_SERVER_UNIT> --no-pager
sudo journalctl -u <A_BJ4_SERVER_UNIT> -n 200 --no-pager
```

重点检查日志中不能出现：

- MySQL 连接错误。
- Redis 连接错误。
- RSA/JWT/配置解密错误。
- schema migration 错误。
- 端口占用。
- Writer 或通知渠道初始化失败。

本机检查：

```bash
ss -lntp | grep ':17000'
curl -fsS http://127.0.0.1:17000/metrics >/dev/null
```

如果配置了 HTTPS，使用实际 HTTPS 地址和证书参数。

### 10.5 切换 CenterApi 稳定入口

将 `<CENTER_API_DOMAIN>` 或负载均衡后端从 bj4 切换到 a-bj4。

从 dg、bj1、bj4 分别验证：

```bash
curl -fsS https://<CENTER_API_DOMAIN>/metrics >/dev/null
```

如果没有稳定域名，则依次替换 dg、bj1 配置中的 `CenterApi.Addrs`，滚动重启；不要同时保留旧、新两个健康地址。

### 10.6 启动 bj4 新 edge

```bash
sudo systemctl start <BJ4_EDGE_UNIT>
sudo systemctl status <BJ4_EDGE_UNIT> --no-pager
sudo journalctl -u <BJ4_EDGE_UNIT> -n 200 --no-pager
```

检查：

```bash
ss -lntp | grep ':19000'
redis-cli -h <BJ4_EDGE_REDIS_HOST> -p <BJ4_EDGE_REDIS_PORT> PING
```

日志中不能持续出现：

- `failed to post to center`
- `failed to heartbeat`
- `failed to get datasource`
- 数据源解密错误
- Writer 连接错误

### 10.7 更新 dg、bj1

如果使用稳定 CenterApi 域名且域名已经切换，只需要验证，不一定重启。

如果配置中写的是旧 bj4 IP，则分别执行：

1. 修改 dg `CenterApi.Addrs`。
2. 重启 dg edge 并验证。
3. 修改 bj1 `CenterApi.Addrs`。
4. 重启 bj1 edge 并验证。

一次只操作一个 edge。

### 10.8 切换 Web/API 入口

将用户访问域名、API 网关或负载均衡后端切换至 a-bj4 server。

检查：

- 登录正常。
- 原有登录会话仍可使用；若不可用，检查新 server 是否连接了原 center Redis。
- 页面查询和配置读取正常。
- API Token 和用户 Token 正常。
- SSO 回调正常。

## 11. 切换后验证

### 11.1 引擎心跳

在 RDS 执行：

```sql
SELECT instance, engine_cluster, datasource_id,
       FROM_UNIXTIME(clock) AS last_heartbeat
FROM alerting_engines
WHERE clock > UNIX_TIMESTAMP() - 30
ORDER BY engine_cluster, instance, datasource_id;
```

预期活动 EngineName 包含：

- `a-bj4`，实例地址为新 a-bj4 server。
- `bj4`，实例地址为新 bj4 edge。
- `dg`，地址不变。
- `bj1`，地址不变。

旧心跳行可能继续保留约 10 分钟，这是正常现象；判断活动实例必须使用最近 30 秒条件。

### 11.2 归属不变检查

```sql
SELECT engine_name, COUNT(*) AS target_count
FROM target
GROUP BY engine_name
ORDER BY engine_name;

SELECT cluster_name, COUNT(*) AS datasource_count
FROM datasource
GROUP BY cluster_name
ORDER BY cluster_name;
```

与变更前基线比较，不应出现大规模 EngineName 或 cluster_name 变化。

如果发现大量主机从 `bj4` 变成 `a-bj4` 或相反，说明 Agent 入口被错误切换，应立即检查负载均衡和 Agent 上报地址。

### 11.3 数据源验证

每个 EngineName 至少验证一个数据源：

1. 页面执行即时查询。
2. 检查数据源连通性。
3. 检查相应 edge/server 日志。
4. 检查 `alerting_engines` 是否出现对应 `datasource_id`。

### 11.4 主机心跳验证

分别选择属于 `a-bj4`、`bj4`、`dg`、`bj1` 的主机：

- 心跳更新时间持续刷新。
- IP、标签、业务组未发生异常变化。
- `engine_name` 保持原值。
- 主机失联规则未出现集中误报。

### 11.5 告警验证

每个 EngineName 至少执行一项：

- 规则测试。
- 人工制造可控阈值越界。
- 验证告警产生、恢复、通知和事件入库。

同时检查是否出现重复通知。同一规则重复通知时，首先检查旧 server 或旧 edge 是否仍有残留进程。

### 11.6 系统指标

持续观察至少 2 小时：

- a-bj4 server CPU、内存、文件句柄、goroutine。
- a-bj4 到 RDS 的延迟、连接数、错误率。
- a-bj4 到 center Redis 的延迟和错误率。
- 所有 edge 的 center API 请求错误。
- 告警评估耗时、心跳错误、通知失败。
- TSDB 写入队列和失败数。

推荐稳定观察 24 小时后再安排后续节点迁空或下线。

## 12. 成功标准

以下条件全部满足才算完成：

- a-bj4 只运行 `n9e-server`，EngineName 为 `a-bj4`。
- bj4 只运行 `n9e-edge`，EngineName 为 `bj4`。
- dg、bj1 角色和 EngineName 不变。
- 所有 edge 只指向新 a-bj4 center API。
- 同一时间只有一个 server 对外提供中心写服务。
- RDS 数据没有迁移，也没有分叉。
- `target.engine_name` 和 `datasource.cluster_name` 数量与切换前基本一致。
- 数据源查询、主机心跳、告警、恢复和通知全部正常。
- 无持续 MySQL、Redis、CenterApi、Writer 错误。
- 旧 bj4 server 配置和程序仍可用于回滚。

## 13. 回滚触发条件

出现任一情况立即回滚：

- a-bj4 无法稳定连接 RDS 或 center Redis。
- 新 server 启动出现数据库迁移、RSA、JWT 或配置解密错误。
- 多个 EngineName 的数据源持续无法查询或告警不评估。
- 主机 EngineName 出现大规模错误漂移。
- 出现大规模重复通知。
- 跨云数据库链路持续丢包或延迟不可接受。
- CenterApi 错误持续超过预定窗口。

## 14. 回滚步骤

由于本次继续使用同一个 RDS，不存在数据库反向同步问题，回滚相对直接。

1. 冻结配置修改并临时静默通知。
2. 停止 bj4 新 edge。
3. 停止 a-bj4 新 server。
4. 恢复 CenterApi 稳定入口到旧 bj4。
5. 启动 bj4 原 server，使用原配置、原 RDS、原 center Redis。
6. 验证 bj4 server 登录、数据库、Redis、数据源和告警。
7. 启动 a-bj4 原 edge。
8. 将 dg、bj1 的 `CenterApi.Addrs` 恢复到旧 bj4，逐个重启验证。
9. 恢复 Web/API 入口到旧 bj4。
10. 检查最近 30 秒的 `alerting_engines` 心跳。
11. 解除告警静默和配置冻结。

回滚命令模板：

```bash
# bj4
sudo systemctl stop <BJ4_EDGE_UNIT>
sudo systemctl start <BJ4_SERVER_UNIT>

# a-bj4
sudo systemctl stop <A_BJ4_SERVER_UNIT>
sudo systemctl start <A_BJ4_EDGE_UNIT>
```

回滚后旧、新实例产生的过期 `alerting_engines` 行会在约 10 分钟后自动清理，不需要立即手工删除。

## 15. 变更记录模板

| 时间 | 操作 | 执行人 | 结果 | 证据/日志 |
| --- | --- | --- | --- | --- |
| `<TIME>` | 进入维护窗口 |  |  |  |
| `<TIME>` | 停 a-bj4 edge |  |  |  |
| `<TIME>` | 停 bj4 server |  |  |  |
| `<TIME>` | 启 a-bj4 server |  |  |  |
| `<TIME>` | 切 CenterApi |  |  |  |
| `<TIME>` | 启 bj4 edge |  |  |  |
| `<TIME>` | 更新 dg |  |  |  |
| `<TIME>` | 更新 bj1 |  |  |  |
| `<TIME>` | 切 Web/API |  |  |  |
| `<TIME>` | SQL 验证 |  |  |  |
| `<TIME>` | 告警验证 |  |  |  |
| `<TIME>` | 解除维护 |  |  |  |

## 16. 后续事项

本次角色互换稳定后，再分别立项处理：

1. RDS MySQL 向 a-bj4 云迁移。
2. center Redis 迁移或高可用改造。
3. EmbeddedTSDB/evallog 等本地数据处理。
4. `bj4`、`bj1` 的数据源和主机迁空。
5. `bj4`、`bj1` 节点下线与资源删除。
