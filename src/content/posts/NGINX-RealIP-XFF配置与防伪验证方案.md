---
title: NGINX RealIP、X-Forwarded-For 配置与防伪验证方案
slug: NGINX RealIP、X-Forwarded-For 配置与防伪验证方案
published: 2026-11-11
description: X-Forwarded-For 配置与防伪验证方案
image: '../../assets/images/Dota-img/axe_noob.jpg'
tags:
  - Nginx
category: Linux
draft: false
lang: zh-CN
pinned: false
comment: true
---
# NGINX RealIP、X-Forwarded-For 配置与防伪验证方案

## 1. 目标和适用范围

- NGINX 版本/tag：`1.30.6`
- 使用模块：`ngx_http_realip_module`
- 支持以下四种访问链路：

```text
客户端 -> CDN -> WAF -> SLB -> NGINX
客户端 -> WAF -> SLB -> NGINX
客户端 -> CDN -> SLB -> NGINX
客户端 -> SLB -> NGINX
```

目标：

1. NGINX 的 `$remote_addr` 始终表示经过可信代理链解析后的客户端 IP。
2. `$realip_remote_addr` 保留直接连接 NGINX 的原始 TCP 对端，一般是 SLB 节点。
3. 基于 `allow`/`deny`、`geo`、限流等功能的客户端 IP 判断不能被公网客户端伪造 XFF 绕过。
4. 日志同时保留解析结果、连接来源和原始 XFF，满足审计和排障要求。

> 重要：`set_real_ip_from` 配置的是“有权声明客户端地址的可信代理”，不是客户端访问白名单。只要某台主机能够以可信源地址连接 NGINX，它就能通过 XFF 指定 `$remote_addr`。

## 2. 上游必须满足的条件

四种链路要使用同一套配置，WAF、CDN、SLB 必须统一使用 `X-Forwarded-For`：

| 链路 | NGINX 入口处预期的 XFF |
|---|---|
| 客户端 -> CDN -> WAF -> SLB | `客户端IP, CDN_IP, WAF_IP` |
| 客户端 -> WAF -> SLB | `客户端IP, WAF_IP` |
| 客户端 -> CDN -> SLB | `客户端IP, CDN_IP` |
| 客户端 -> SLB | `客户端IP` |

同时要求：

1. 面向公网的第一层代理必须覆盖客户端自带的 XFF，或者在其右侧追加经过连接信息确认的真实客户端 IP。
2. 后续代理只能按约定追加上一跳地址，不能把客户端提供的任意值直接当成真实来源。
3. NGINX 源站在网络层只允许 SLB 节点访问。
4. SLB、WAF、CDN 的出口地址变化时，应同步更新可信地址清单。
5. 如果某一层只提供 `True-Client-IP`、`CF-Connecting-IP` 等专用头，应先在上游统一转换为可信的 XFF；同一个域名存在多条链路时，不应依赖内容不同的客户端自报头。

## 3. RealIP 推荐配置

### 3.1 在 `http` 级别统一配置

适用于同一套 NGINX 或同一个域名可能经过任意一种链路的场景。

```nginx
http {
    # SLB 节点/回源地址：必须配置
    set_real_ip_from  192.168.1.0/24;
    set_real_ip_from  192.168.2.10;

    # WAF 回源出口地址
    set_real_ip_from  10.10.0.0/16;
    set_real_ip_from  2001:db8:10::/48;

    # CDN 回源出口地址
    set_real_ip_from  10.20.0.0/16;
    set_real_ip_from  2001:db8:20::/48;

    real_ip_header    X-Forwarded-For;
    real_ip_recursive on;

    # server {...}
}
```

所有示例地址都必须替换为生产环境真实地址。禁止为了省事配置：

```nginx
set_real_ip_from 0.0.0.0/0;
set_real_ip_from ::/0;
```

也不应无条件信任整个 RFC1918 私网。应优先配置精确的 SLB 节点地址或最小必要网段，并配合安全组、防火墙或网络 ACL。

### 3.2 在 `server` 级别配置

当每个域名的接入链路固定，并希望采用最小信任范围时，可以写在对应 `server` 中：

```nginx
server {
    listen 443 ssl;
    server_name protected.example.com;

    set_real_ip_from 192.168.1.0/24;  # SLB
    set_real_ip_from 10.10.0.0/16;    # WAF
    set_real_ip_from 10.20.0.0/16;    # CDN

    real_ip_header X-Forwarded-For;
    real_ip_recursive on;

    location / {
        proxy_pass http://application_backend;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;
        proxy_set_header X-Forwarded-Port  $server_port;
    }
}
```

只经过 SLB 的域名可以进一步缩小为：

```nginx
server {
    listen 443 ssl;
    server_name direct.example.com;

    set_real_ip_from 192.168.1.0/24;
    real_ip_header X-Forwarded-For;
    real_ip_recursive on;

    location / {
        proxy_pass http://application_backend;
        proxy_set_header Host            $host;
        proxy_set_header X-Real-IP       $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

不建议在普通业务 `location` 中才启用 realip。否则不同 location 的日志、白名单、限流和应用转发可能看到不同的客户端地址。

### 3.3 华为云 ELB 出口地址的获取与确认

本方案的四条链路最终都经过 ELB/SLB 到达 NGINX，因此 ELB 与后端服务器通信时使用的源地址是 `set_real_ip_from` 中最关键的一层。

#### 方法一：通过 ELB 控制台确认后端子网

对于独享型 ELB，可按以下路径确认：

1. 登录华为云“弹性负载均衡 ELB”控制台。
2. 在负载均衡器列表中进入目标 ELB。
3. 在“基本信息”中找到“后端子网”。
4. 打开对应子网详情，记录其 IPv4/IPv6 CIDR。
5. 将实际用于 ELB 到后端通信的最小必要网段配置为 NGINX 的可信代理地址。

示例：

```nginx
# 独享型 ELB 后端子网示例，必须替换为实际网段
set_real_ip_from 192.168.1.0/24;
```

独享型 ELB 会从后端子网分配地址，用于业务转发和健康检查。不要仅根据一个当前观测到的节点 IP 推断长期地址范围；应以控制台显示的实际后端子网和当前产品规则为准。

#### 方法二：在 NGINX 后端观察实际连接来源

启用 RealIP 之前，默认日志中的 `$remote_addr` 一般是 ELB 的连接源地址；启用 RealIP 之后，`$remote_addr` 已被改写为客户端地址，此时必须查看 `$realip_remote_addr`。

建议使用：

```nginx
log_format main escape=json
    '{"remote_addr":"$remote_addr",'
    '"realip_remote_addr":"$realip_remote_addr",'
    '"http_forwarded_for":"$http_x_forwarded_for",'
    '"host":"$host",'
    '"request":"$request",'
    '"status":"$status"}';
```

然后通过 ELB 发起请求并观察：

```bash
tail -F /var/log/nginx/access.log
```

正常七层代理场景中：

- `$remote_addr` 应是 RealIP 解析后的客户端地址。
- `$realip_remote_addr` 应属于 ELB 出口地址范围。
- `$http_x_forwarded_for` 应符合对应链路的地址顺序。

日志观测用于验证控制台网段和发现遗漏节点，不应只把一次日志中出现的单个 ELB 地址配置成长期可信列表。

#### 共享型与独享型 ELB 的差异

| ELB 类型/模式 | 后端通常看到的连接源地址 | 配置和验证要点 |
|---|---|---|
| 共享型 ELB | 通常来自 `100.125.0.0/16` | 后端安全策略通常需要放通该网段；官方说明部分区域在该网段资源不足时可能使用 `214.0.0.0/8`，应以所在区域的官方文档和实际日志为准 |
| 独享型 ELB | ELB 后端子网中的地址 | 查看目标 ELB 的实际后端子网，将最小必要 CIDR 加入可信代理和后端安全策略 |
| 四层 TCP/UDP 开启“获取客户端 IP” | 后端网络层可能直接看到客户端 IP | 这时连接源不再是普通 ELB 出口地址；应按监听器类型重新设计安全组规则，不能机械套用七层 XFF 方案 |

对于本方案使用的 HTTP/HTTPS + XFF + RealIP 模式，应确认监听器实际工作在七层代理模式。若使用四层源地址透传，NGINX 的 `$remote_addr` 已可能是真实客户端地址，而且连接来源不满足“固定 ELB 网段”这一假设，应单独评审网络访问控制。

华为云官方资料还说明，共享型 ELB 的四层监听器开启“获取客户端 IP”后，安全组和网络 ACL 的处理规则与普通 SNAT 模式不同。变更此开关前必须根据当前监听器类型查阅对应区域的产品文档并重新验证。

### 3.4 华为云 WAF 回源地址的获取与确认

WAF 回源地址因接入模式不同而不同。在本方案的链路中，请区分两个用途：

- WAF 地址出现在 XFF 代理链中时，需要加入 NGINX `set_real_ip_from`，供 `real_ip_recursive on` 判断可信代理。
- 因为四条链路最终都是 `... -> ELB -> NGINX`，NGINX 安全组的直接来源通常仍是 ELB，而不是 WAF；不要把 WAF 回源网段误当成 NGINX 的直接 TCP 来源。

#### 云模式（CNAME）

1. 登录华为云 Web 应用防火墙控制台。
2. 进入“资产管理 > 防护对象”。
3. 单击网站列表上方的“Web应用防火墙回源 IP 网段”。
4. 使用“复制 IP 段”获取当前全部 IPv4/IPv6 回源网段。
5. 将实际会出现在 XFF 链路中的 WAF 网段加入 NGINX 可信代理配置。

示例：

```nginx
# 示例地址，必须替换为控制台的当前结果
set_real_ip_from 122.112.208.32/28;
set_real_ip_from 49.4.56.64/27;
set_real_ip_from 2407:c080:804::/48;
```

云模式 WAF 集群可能扩容或新增节点，应关注华为云控制台的回源 IP 变更通知，并在变更窗口前更新 NGINX 配置、安全策略和验证记录。

#### 独享模式

1. 登录 WAF 控制台。
2. 进入“资产管理 > WAF 独享引擎”。
3. 获取每个目标独享引擎的“IP 地址”及其所属子网信息。
4. 部署多个独享引擎时，必须覆盖所有实际参与转发的实例地址。
5. 地址变化、扩容或故障切换后重新执行链路验证。

#### API 查询

可以调用华为云 WAF `ShowSourceIp` API 查询回源 IP 信息：

```http
GET /v1/{project_id}/waf/config/source-ip
```

接口需要相应 IAM 权限，当前官方 API 文档列出的授权项为：

```text
waf:sourceIp:get
```

响应中的 `source_ip` 字段包含回源网段列表。建议用自动化任务定期查询、与已部署的可信地址清单比较；发现变化时先评审，再执行 `nginx -t` 和平滑 reload，不要未经校验直接覆盖生产配置。

#### WAF 地址验证

通过各条实际链路发起请求，检查 NGINX 日志：

```text
客户端 -> CDN -> WAF -> ELB -> NGINX
XFF: 客户端IP, CDN_IP, WAF_IP

客户端 -> WAF -> ELB -> NGINX
XFF: 客户端IP, WAF_IP
```

日志中出现的 WAF 地址应属于控制台或 API 返回的当前网段。若不属于，应先确认是否存在新集群、跨区域回源、链路顺序变化或异常伪造，不能直接扩大 `set_real_ip_from`。

## 4. RealIP 解析结果

假设：

```text
客户端：203.0.113.100
WAF：10.10.1.20
CDN：10.20.1.30
SLB：192.168.1.10
```

配置 `real_ip_recursive on` 后，NGINX 从 XFF 右侧向左跳过可信地址，选择最右侧的非可信地址：

| 链路 | NGINX 收到的 XFF | `$remote_addr` | `$realip_remote_addr` |
|---|---|---|---|
| CDN + WAF + SLB | `203.0.113.100, 10.20.1.30, 10.10.1.20` | `203.0.113.100` | `192.168.1.10` |
| WAF + SLB | `203.0.113.100, 10.10.1.20` | `203.0.113.100` | `192.168.1.10` |
| CDN + SLB | `203.0.113.100, 10.20.1.30` | `203.0.113.100` | `192.168.1.10` |
| SLB | `203.0.113.100` | `203.0.113.100` | `192.168.1.10` |

## 5. 业务转发头配置

推荐让 NGINX 作为安全边界，只向后端发送已经解析出的客户端地址：

```nginx
location / {
    proxy_pass http://application_backend;

    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

不建议在启用 realip 后继续使用：

```nginx
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

因为 `$proxy_add_x_forwarded_for` 会把改写后的 `$remote_addr` 再追加到原始 XFF，可能形成：

```text
客户端IP, CDN_IP, WAF_IP, 客户端IP
```

如果后端确实需要完整链路，可使用：

```nginx
map $http_x_forwarded_for $forwarded_for_to_backend {
    ""      $remote_addr;
    default "$http_x_forwarded_for, $realip_remote_addr";
}

location / {
    proxy_pass http://application_backend;
    proxy_set_header X-Real-IP       $remote_addr;
    proxy_set_header X-Forwarded-For $forwarded_for_to_backend;
}
```

使用完整链路方案前，应确认 SLB 没有把自身地址重复写入 XFF。

## 6. 日志配置

生产日志至少同时记录以下三个字段：

```nginx
log_format main escape=json
    '{"@timestamp":"$time_iso8601",'
    '"remote_addr":"$remote_addr",'
    '"realip_remote_addr":"$realip_remote_addr",'
    '"http_forwarded_for":"$http_x_forwarded_for",'
    '"host":"$host",'
    '"request":"$request",'
    '"status":"$status",'
    '"request_time":"$request_time",'
    '"http_user_agent":"$http_user_agent"}';
```

- `remote_addr`：realip 模块认定的客户端地址，也是 `allow`/`deny` 通常使用的地址。
- `realip_remote_addr`：建立 TCP 连接的原始来源，正常情况下应属于 SLB 地址范围。
- `http_forwarded_for`：收到的原始 XFF，仅用于审计，不应由后端应用自行选择其中某个地址作为可信客户端地址。

原日志中的以下配置带有一个多余空格：

```nginx
"bytes_sent":"$bytes_sent "
```

应改为：

```nginx
"bytes_sent":"$bytes_sent"
```

## 7. 客户端白名单配置

realip 在访问控制阶段前改写 `$remote_addr`，所以 `allow`/`deny` 可以基于解析后的客户端 IP 判断：

```nginx
location /admin/ {
    allow 203.0.113.10;       # 客户端白名单 IPv4
    allow 2001:db8:100::/48;  # 客户端白名单 IPv6
    deny  all;

    proxy_pass http://application_backend;
    proxy_set_header X-Real-IP       $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
}
```

不要把客户端白名单地址写入 `set_real_ip_from`。两者含义完全不同：

- `set_real_ip_from`：哪些代理有权提供真实客户端地址。
- `allow`/`deny`：哪些解析后的客户端地址可以访问资源。

## 8. 上线前临时验证端点

建议在非生产环境先完整测试；生产验证时使用随机、不可猜测路径，并在完成后立即删除。

在 `http` 中临时加入专用日志：

```nginx
log_format realip_verify escape=json
    '{"time":"$time_iso8601",'
    '"host":"$host",'
    '"status":"$status",'
    '"remote_addr":"$remote_addr",'
    '"realip_remote_addr":"$realip_remote_addr",'
    '"xff":"$http_x_forwarded_for",'
    '"request":"$request"}';
```

在待验证域名的 `server` 中临时加入：

```nginx
location = /__realip_verify_7f36b21e {
    access_log /var/log/nginx/realip_verify.log realip_verify;

    # 替换为真实的客户端白名单测试地址
    allow 203.0.113.10;
    deny  all;

    return 204;
}
```

该接口不回显内部地址，只通过状态码和专用日志验证。正式环境不要长期保留调试端点。

检查并加载配置：

```bash
nginx -V 2>&1 | grep -- --with-http_realip_module
nginx -t
nginx -s reload
```

检查完整生效配置，避免配置被其他 include 覆盖：

```bash
nginx -T 2>&1 | grep -E 'set_real_ip_from|real_ip_header|real_ip_recursive|server_name'
```

## 9. XFF 防伪验证方案

### 9.1 测试准备

准备两台公网测试客户端：

- `WHITE_IP`：已加入 `allow` 的真实公网地址。
- `ATTACKER_IP`：未加入 `allow` 的真实公网地址。

记录：

- 四种链路分别对应的测试域名。
- NGINX 源站地址 `ORIGIN_IP`。
- SLB、WAF、CDN 的真实出口地址范围。
- 临时验证路径 `/__realip_verify_7f36b21e`。

执行测试时持续观察：

```bash
tail -F /var/log/nginx/realip_verify.log
```

### 9.2 正常白名单测试

从 `WHITE_IP` 分别访问四种链路对应的域名：

```bash
curl -sk -o /dev/null -w '%{http_code}\n' \
  https://cdn-waf.example.com/__realip_verify_7f36b21e

curl -sk -o /dev/null -w '%{http_code}\n' \
  https://waf.example.com/__realip_verify_7f36b21e

curl -sk -o /dev/null -w '%{http_code}\n' \
  https://cdn.example.com/__realip_verify_7f36b21e

curl -sk -o /dev/null -w '%{http_code}\n' \
  https://slb.example.com/__realip_verify_7f36b21e
```

预期：

- HTTP 状态均为 `204`。
- 日志 `remote_addr` 等于 `WHITE_IP`。
- 日志 `realip_remote_addr` 属于 SLB 网段。
- XFF 的地址数量和顺序与对应链路一致。

### 9.3 公网非白名单基线测试

从 `ATTACKER_IP` 访问同样的地址：

```bash
curl -sk -o /dev/null -w '%{http_code}\n' \
  https://cdn-waf.example.com/__realip_verify_7f36b21e
```

预期：

- HTTP 状态为 `403`。
- 日志 `remote_addr` 等于 `ATTACKER_IP`，不能等于白名单地址。
- 日志 `realip_remote_addr` 属于 SLB 网段。

### 9.4 从公网伪造单个白名单 XFF

从 `ATTACKER_IP` 发送白名单地址：

```bash
curl -sk -o /dev/null -w '%{http_code}\n' \
  -H 'X-Forwarded-For: 203.0.113.10' \
  https://cdn-waf.example.com/__realip_verify_7f36b21e
```

对四种链路对应的域名全部执行一次。

预期：

- 全部返回 `403`。
- `remote_addr` 必须仍是 `ATTACKER_IP`。
- 上游可能覆盖伪造头，也可能把经过连接确认的 `ATTACKER_IP` 追加在伪造值右侧；两种行为都必须使 realip 最终选择 `ATTACKER_IP`。

如果返回 `204`，说明公网客户端能够控制 realip 最终选择的地址，应立即停止上线并检查第一层代理和 SLB 的 XFF 策略。

### 9.5 伪造多级代理链

从 `ATTACKER_IP` 依次执行：

```bash
curl -sk -o /dev/null -w '%{http_code}\n' \
  -H 'X-Forwarded-For: 203.0.113.10, 10.20.1.30, 10.10.1.20' \
  https://cdn-waf.example.com/__realip_verify_7f36b21e

curl -sk -o /dev/null -w '%{http_code}\n' \
  -H 'X-Forwarded-For: 198.51.100.77, 203.0.113.10' \
  https://cdn-waf.example.com/__realip_verify_7f36b21e

curl -sk -o /dev/null -w '%{http_code}\n' \
  -H 'X-Forwarded-For: 203.0.113.10, 127.0.0.1, 10.10.1.20' \
  https://cdn-waf.example.com/__realip_verify_7f36b21e
```

还应覆盖：

- 前后空格和多个逗号。
- IPv4 与 IPv6 混合。
- 重复的 XFF 请求头。
- 白名单 IP 放在 XFF 左侧、中间、右侧。
- WAF/CDN 可信地址放入伪造 XFF。

预期始终为 `403`，`remote_addr` 始终为经过公网入口确认的 `ATTACKER_IP`。不要只检查 XFF 文本，应以 NGINX 日志中的 `remote_addr` 和最终状态码为准。

### 9.6 绕过 SLB 直连 NGINX 源站

从 `ATTACKER_IP` 尝试直接连接源站，同时伪造 Host、SNI 和 XFF：

```bash
curl -sk -o /dev/null -w '%{http_code}\n' \
  --resolve protected.example.com:443:ORIGIN_IP \
  -H 'X-Forwarded-For: 203.0.113.10' \
  https://protected.example.com/__realip_verify_7f36b21e
```

最佳预期：

- TCP 连接失败或被安全组/防火墙丢弃。
- NGINX access log 中没有该请求。

次级预期（网络隔离尚未完成时）：

- NGINX 因来源不属于 `set_real_ip_from` 而忽略 XFF。
- `remote_addr` 等于 `ATTACKER_IP`，返回 `403`。

即使次级预期能够阻止本次绕过，也应完成网络层源站保护，不能把公网源站暴露作为正常设计。

### 9.7 可信代理网段内部测试

这是最关键的反向测试。

从一个位于 `set_real_ip_from` 网段内、但不是正式 SLB/WAF/CDN 节点的测试主机，尝试直接访问 NGINX：

```bash
curl -sk -o /dev/null -w '%{http_code}\n' \
  --resolve protected.example.com:443:ORIGIN_IP \
  -H 'X-Forwarded-For: 203.0.113.10' \
  https://protected.example.com/__realip_verify_7f36b21e
```

安全的预期：

- 该测试主机无法连接 NGINX；或者
- 其源地址不属于精确配置的可信地址，因此返回 `403`。

如果返回 `204`，这是 realip 的正常信任语义，但代表当前安全边界过宽：该主机可以伪造任意白名单客户端。应采取以下措施：

1. 将 `set_real_ip_from` 从大网段缩小为 SLB/WAF/CDN 的精确回源地址。
2. 用安全组、防火墙、ACL 限制只有正式 SLB 节点可以访问 NGINX 监听端口。
3. 隔离共享网段中的普通业务主机、容器和运维跳板机。
4. 必要时使用 PROXY Protocol、mTLS 或云厂商提供的后端身份机制增强源站认证。

### 9.8 不是白名单绕过，但必须单独验证的链路绕过

RealIP/XFF 只能解析“客户端是谁”，不能可靠证明请求经过了哪一条链路。本方案同时允许以下四条合法链路：

```text
客户端 -> CDN -> WAF -> SLB -> NGINX
客户端 -> WAF -> SLB -> NGINX
客户端 -> CDN -> SLB -> NGINX
客户端 -> SLB -> NGINX
```

因此，不能在所有域名和 SLB 入口上统一配置成“WAF 只接受 CDN、SLB 只接受 WAF”，否则会错误阻断另外三条合法链路。

如果不同域名分别要求固定链路，应按域名、SLB 监听器或独立后端池实施约束：

| 域名预期链路 | 可实施的链路约束 |
|---|---|
| CDN -> WAF -> SLB | WAF 的对应入口只接受 CDN 回源；SLB 的对应监听器/后端只接受 WAF 回源 |
| WAF -> SLB | WAF 对公网提供服务；SLB 的对应监听器/后端只接受 WAF 回源 |
| CDN -> SLB | CDN 对公网提供服务；SLB 的对应监听器/后端只接受 CDN 回源 |
| SLB 直连 | SLB 对公网提供服务；NGINX 仍只接受 SLB 节点回源 |

如果同一个域名或同一个 SLB 监听器必须同时支持四条链路，则不能仅依靠来源 IP 强制其中某一条链路，只能允许对应入口并通过 RealIP 正确解析客户端地址。若业务还需要识别实际经过的链路，可采用以下机制：

- WAF、CDN、SLB 使用独立监听器、独立后端池或独立回源端口。
- WAF/CDN 回源使用 mTLS 或云厂商提供的后端身份机制。
- 各代理覆盖并写入不可由公网客户端透传的链路标识/鉴权头，由下一跳验证后重新生成。
- NGINX 入口在网络层始终只允许正式 SLB 节点访问。
- 不以客户端能够控制的 XFF 内容作为“经过 WAF/CDN”的唯一证明。

## 10. 验收矩阵

| 测试 | 来源 | 伪造 XFF | 预期状态 | 预期 `$remote_addr` |
|---|---|---|---|---|
| 白名单正常访问 | `WHITE_IP` | 无 | `204` | `WHITE_IP` |
| 非白名单正常访问 | `ATTACKER_IP` | 无 | `403` | `ATTACKER_IP` |
| 非白名单伪造白名单 IP | `ATTACKER_IP` | `WHITE_IP` | `403` | `ATTACKER_IP` |
| 非白名单伪造完整代理链 | `ATTACKER_IP` | 白名单 + WAF/CDN | `403` | `ATTACKER_IP` |
| 绕过 SLB 直连源站 | `ATTACKER_IP` | `WHITE_IP` | 连接失败，至少应为 `403` | 不应进入 NGINX；否则为 `ATTACKER_IP` |
| 可信网段普通主机直连 | 内部测试主机 | `WHITE_IP` | 连接失败或 `403` | 不应成为 `WHITE_IP` |

四个域名/四种链路都必须完成公网伪造测试，不能只抽测其中一条。

## 11. 判定标准

全部满足以下条件才可判定通过：

1. 白名单真实来源通过四种链路均能访问。
2. 非白名单来源无论如何构造 XFF 都返回 `403`。
3. 四种链路下，日志 `remote_addr` 都等于真实公网测试地址。
4. 日志 `realip_remote_addr` 始终是已知 SLB 节点地址。
5. 公网无法绕过 SLB 直接连接 NGINX。
6. 可信网段中的普通主机无法直接连接 NGINX 并伪造白名单地址。
7. `set_real_ip_from` 中不存在 `0.0.0.0/0`、`::/0` 或无必要的超大网段。
8. 第一层公网代理对客户端自带 XFF 的处理策略已通过抓包、日志或厂商配置确认。

## 12. 验证完成后的清理

1. 删除临时的 `/__realip_verify_7f36b21e` location。
2. 删除临时 `realip_verify` 日志格式和专用 access log 配置。
3. 执行 `nginx -t`。
4. 平滑 reload。
5. 保留测试记录和脱敏后的日志作为上线证据。
6. 按日志保留策略轮转或清理临时验证日志。

## 13. 官方参考

- RealIP 模块：<https://nginx.org/en/docs/http/ngx_http_realip_module.html>
- Proxy 模块及 `$proxy_add_x_forwarded_for`：<https://nginx.org/en/docs/http/ngx_http_proxy_module.html>
- Access 模块 `allow`/`deny`：<https://nginx.org/en/docs/http/ngx_http_access_module.html>
- 华为云 ELB：配置后端服务器的安全组（共享型）：<https://support.huaweicloud.com/usermanual-elb/elb_ug_hd_0002.html>
- 华为云 ELB：为什么 100 或 214 开头的 IP 在频繁访问后端服务器：<https://support.huaweicloud.com/elb_faq/elb_faq_0068.html>
- 华为云 ELB：共享型 ELB 获取客户端真实 IP：<https://support.huaweicloud.com/intl/zh-cn/usermanual-elb/elb_ug_jt_0515.html>
- 华为云 WAF API：查询 WAF 回源 IP 信息（ShowSourceIp）：<https://support.huaweicloud.com/api-waf/ShowSourceIp.html>
- 华为云社区参考文章：<https://bbs.huaweicloud.com/blogs/509918>

