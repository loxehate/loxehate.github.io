---
title: bridge-mcp运维
slug: bridge-mcp运维
published: 2026-11-05
description: MCP Agent ops运维管理
image: '../../assets/images/Dota-img/hoodwink.png'
tags:
  - Agent
  - MCP
category: AI
draft: false
lang: zh-CN
pinned: false
comment: true
---
# bridge-mcp 运维手册

本文面向使用 Docker 部署 bridge-mcp、由通用 MCP Agent 管理 Linux/Windows OpenSSH 主机的运维场景。文档基于源码 tag `v4.1.0`。

## 1. 总体架构

```text
通用 MCP Agent
       │ MCP 2026-07-28 / HTTPS
       ▼
认证网关、VPN 或 SSH 隧道
       │
       ▼
bridge-mcp Docker（非 root 用户）
       │ SSH / ProxyJump
       ▼
堡垒机或管理网络
       │
       ├── Linux
       ├── Windows OpenSSH
       ├── Docker / K3s / Kubernetes
       └── 数据库及网络设备
```

安全原则：

- MCP HTTP 端口不直接暴露公网。
- bridge-mcp 使用独立 SSH 账户和独立密钥。
- 日常 Agent 与高权限管理员使用不同实例、不同密钥。
- 优先使用专用 `ssh_*` 工具，不依赖自由命令。
- 保持内置黑名单、输出脱敏和破坏性操作确认开启。

## 2. 准备目录

```bash
sudo install -d -m 0750 \
  /opt/bridge-mcp/config \
  /opt/bridge-mcp/ssh \
  /opt/bridge-mcp/audit

cd /opt/bridge-mcp
```

拉取固定版本镜像：

```bash
docker pull ghcr.io/muchiny/bridge-mcp:v4.1.0
```

如果镜像仓库没有对应版本，可在已经切换到 `v4.1.0` 的源码目录构建：

```bash
docker build -t bridge-mcp:v4.1.0 .
```

确认镜像内 bridge 用户的 UID/GID：

```bash
docker run --rm --entrypoint id ghcr.io/muchiny/bridge-mcp:v4.1.0
```

后续示例假设 UID/GID 为 `1000:1000`，实际部署时以该命令输出为准。

## 3. 创建专用 SSH 密钥

```bash
sudo ssh-keygen \
  -t ed25519 \
  -a 100 \
  -f /opt/bridge-mcp/ssh/id_ed25519_bridge \
  -C "bridge-mcp@production" \
  -N ""

sudo chown -R 1000:1000 /opt/bridge-mcp
sudo chmod 0700 /opt/bridge-mcp/ssh
sudo chmod 0600 /opt/bridge-mcp/ssh/id_ed25519_bridge
sudo chmod 0644 /opt/bridge-mcp/ssh/id_ed25519_bridge.pub
```

不要复用管理员个人私钥。开发、测试和生产环境使用不同密钥。

## 4. 批量创建 SSH 运维用户

### 4.1 推荐方式：Ansible 引导

首次创建 `mcpops` 用户应使用现有管理员通道、云控制台、Ansible、AWX 或云初始化完成。这一步发生在 bridge-mcp 之外，不受 `security.whitelist` 约束。

Inventory 示例：

```ini
[linux_servers]
prod-web-01 ansible_host=10.10.1.11
prod-web-02 ansible_host=10.10.1.12
prod-db-01 ansible_host=10.10.2.11

[linux_servers:vars]
ansible_user=existing-admin
ansible_port=22
ansible_ssh_common_args=-o ProxyJump=bootstrap-user@bastion.example.com
```

Playbook 示例：

```yaml
---
- name: Bootstrap bridge-mcp operator account
  hosts: linux_servers
  become: true
  serial: 10

  vars:
    bridge_user: mcpops
    bridge_group: mcpops
    bridge_public_key: >-
      {{ lookup('file', '/opt/bridge-mcp/ssh/id_ed25519_bridge.pub') }}

  tasks:
    - name: Create bridge group
      ansible.builtin.group:
        name: "{{ bridge_group }}"
        state: present

    - name: Create bridge user
      ansible.builtin.user:
        name: "{{ bridge_user }}"
        group: "{{ bridge_group }}"
        shell: /bin/bash
        create_home: true
        password_lock: true
        state: present

    - name: Create SSH directory
      ansible.builtin.file:
        path: "/home/{{ bridge_user }}/.ssh"
        state: directory
        owner: "{{ bridge_user }}"
        group: "{{ bridge_group }}"
        mode: "0700"

    - name: Install bridge public key
      ansible.builtin.copy:
        content: "{{ bridge_public_key }}\n"
        dest: "/home/{{ bridge_user }}/.ssh/authorized_keys"
        owner: "{{ bridge_user }}"
        group: "{{ bridge_group }}"
        mode: "0600"
```

执行：

```bash
ansible-playbook \
  -i /opt/bridge-mcp/bootstrap-inventory.ini \
  /opt/bridge-mcp/bootstrap-bridge-user.yml \
  --private-key ~/.ssh/existing-admin-key \
  --ask-become-pass
```

### 4.2 使用 bridge-mcp 创建用户

使用 `ssh_user_add` 前必须在 `config.yaml` 顶层启用工具组：

```yaml
tool_groups:
  listing: progressive
  groups:
    user_management: true
```

调用参数示例：

```json
{
  "host": "prod-web-01",
  "username": "appdeploy",
  "shell": "/bin/bash",
  "groups": "app",
  "create_home": true,
  "sudo": true
}
```

需要准确理解安全行为：

- `ssh_user_add` 是专用工具，不是自由命令。
- 在 v4.1.0 中，专用工具通过 `validate_builtin()`，跳过 whitelist，只检查 blacklist。
- `strict` 与 `standard` 都不会让 `ssh_user_add` 匹配 whitelist。
- `ssh_user_add` 标记为 `mutating`，不是 `destructive`；HTTP MCP 可以调用它。
- 是否能创建用户最终由目标机 SSH 用户权限决定。
- `sudo: true` 会把命令包装为 `sudo ... bash -c`，不适合授予通用 Agent 宽泛的免密 sudo。

因此生产环境推荐通过审核过的 Ansible/AWX Job Template 创建用户，而不是让通用 Agent 直接获得 root 级用户管理能力。

## 5. 批量配置 SSH 主机

创建 `/opt/bridge-mcp/ssh/config`：

```sshconfig
Host bastion-prod
    HostName bastion.example.com
    Port 22
    User mcpops
    IdentityFile /home/bridge/.ssh/id_ed25519_bridge
    IdentitiesOnly yes

Host prod-web-01
    HostName 10.10.1.11
    Port 22
    User mcpops
    IdentityFile /home/bridge/.ssh/id_ed25519_bridge
    IdentitiesOnly yes
    ProxyJump bastion-prod

Host prod-web-02
    HostName 10.10.1.12
    Port 22
    User mcpops
    IdentityFile /home/bridge/.ssh/id_ed25519_bridge
    IdentitiesOnly yes
    ProxyJump bastion-prod
```

bridge-mcp 自动导入支持 `Host`、`HostName`、`Port`、`User`、`IdentityFile` 和 `ProxyJump`。通配符 Host 不会作为单独主机导入。

设置权限：

```bash
sudo chown 1000:1000 /opt/bridge-mcp/ssh/config
sudo chmod 0600 /opt/bridge-mcp/ssh/config
```

## 6. known_hosts

从可信资产平台、云控制台或带外管理渠道获取服务器 SSH 主机公钥并写入：

```text
bastion.example.com ssh-ed25519 AAAA_BASTION_HOST_KEY
10.10.1.11 ssh-ed25519 AAAA_WEB01_HOST_KEY
10.10.1.12 ssh-ed25519 AAAA_WEB02_HOST_KEY
```

保存为 `/opt/bridge-mcp/ssh/known_hosts`：

```bash
sudo chown 1000:1000 /opt/bridge-mcp/ssh/known_hosts
sudo chmod 0600 /opt/bridge-mcp/ssh/known_hosts
```

`ssh-keyscan` 只能用于采集，必须通过可信渠道核对指纹后才能作为生产信任依据。

## 7. config.yaml 结构

`tool_groups` 是 `config.yaml` 的顶层配置，与 `hosts`、`security`、`limits`、`audit`、`http`、`ssh_config` 同级，不应放在 `security` 内部：

```yaml
hosts: {}

ssh_config:
  enabled: true
  path: /home/bridge/.ssh/config
  exclude:
    - retired-server

security:
  mode: standard
  require_elicitation_on_destructive: true
  whitelist:
    - '^uptime$'
    - '^hostname$'
  sanitize:
    enabled: true
    entropy_detection: true

limits:
  command_timeout_seconds: 60
  connection_timeout_seconds: 10
  max_concurrent_commands: 5
  max_output_chars: 40000

audit:
  enabled: true
  path: /home/bridge/audit/audit.log
  max_size_mb: 100
  retain_days: 90

tool_groups:
  listing: progressive
  groups:
    journald: true
    storage: true
    diagnostics: true
    docker: true
    container_logs: true

    # 高权限工具按需启用
    user_management: false
    key_management: false
    package: false
    firewall: false

http:
  bind: "0.0.0.0:3000"
  max_body_size: 1048576
  allowed_origins:
    - "https://mcp.example.com"
  allow_unsafe_bind: true
```

如果不配置 `tool_groups`，v4.1.0 默认启用8个基础组：`core`、`file_ops`、`directory`、`process`、`monitoring`、`network`、`systemd` 和 `sessions`。其他组必须显式设为 `true`。

### 7.1 当前部署实际启用的工具组

本文档配套的当前 `config.yaml` 使用 `listing: progressive`，共显式启用58个工具组、325个实际工具。13个Windows工具组全部关闭；另外，当前未接入对应基础设施的 `k3s`、`esxi`、`ldap`、`awx`、`terraform`、`vault` 也保持关闭。

| 分类 | 已启用工具组 |
|---|---|
| 基础与文件 | `core`、`config`、`file_transfer`、`file_ops`、`directory`、`sessions`、`pty`、`tunnels`、`templates` |
| 系统与日志 | `monitoring`、`process`、`network`、`systemd`、`systemd_timers`、`package`、`firewall`、`cron`、`cron_analysis`、`user_management`、`storage`、`journald`、`security_modules`、`performance`、`capacity` |
| 容器与集群 | `docker`、`podman`、`cri`、`kubernetes`、`container_logs` |
| Web与证书 | `nginx`、`apache`、`letsencrypt`、`certificates`、`network_equipment`、`network_security` |
| 数据与目录 | `database`、`redis`、`postgresql`、`mysql`、`mongodb` |
| 自动化与密钥 | `git`、`ansible`、`key_management`、`orchestration`、`runbooks` |
| 备份与安全 | `backup`、`diagnostics`、`security_scan`、`compliance`、`drift`、`recording` |
| 云与事件 | `cloud`、`inventory`、`multicloud`、`alerting`、`incident`、`log_aggregation`、`chatops` |

当前显式关闭的非Windows工具组：

```yaml
k3s: false
esxi: false
ldap: false
awx: false
terraform: false
vault: false
```

Windows相关组全部关闭：

```yaml
windows_services: false
windows_events: false
active_directory: false
scheduled_tasks: false
windows_firewall: false
iis: false
windows_updates: false
windows_perf: false
hyperv: false
windows_registry: false
windows_features: false
windows_network: false
windows_process: false
```

修改工具组后必须重新启动容器，并执行 `validate` 与 `list-tools --groups-only` 验证生效结果。

## 8. whitelist 与工具的关系

```text
自由命令工具
  └── validate()：blacklist + whitelist

专用 ssh_* 工具
  └── validate_builtin()：只检查 blacklist
```

受 whitelist 约束的典型自由命令入口：

- `ssh_exec`
- `ssh_exec_multi`
- `ssh_session_exec`
- `ssh_canary_exec`
- `ssh_rolling_exec`
- `ssh_fleet_diff`

不依赖 whitelist 的专用工具示例：

- `ssh_user_add`
- `ssh_service_status`
- `ssh_metrics`
- `ssh_docker_ps`
- `ssh_k8s_get`
- `ssh_file_write`

专用工具仍会受到内置 blacklist、目标机权限、参数校验、速率限制、审计和破坏性工具门禁约束。因此不要显式写一个不完整的 `security.blacklist`；显式配置会替换内置黑名单，而不是追加。

## 9. Docker Compose

创建 `/opt/bridge-mcp/compose.yaml`：

```yaml
services:
  bridge-mcp:
    image: ghcr.io/muchiny/bridge-mcp:v4.1.0
    container_name: bridge-mcp
    restart: unless-stopped

    command:
      - --config
      - /home/bridge/.config/bridge-mcp/config.yaml
      - serve-http

    environment:
      RUST_LOG: info
      MCP_REQUEST_STATE_KEY: ${MCP_REQUEST_STATE_KEY}

    ports:
      - "127.0.0.1:3000:3000"

    volumes:
      - ./config/config.yaml:/home/bridge/.config/bridge-mcp/config.yaml:ro
      - ./ssh:/home/bridge/.ssh:ro
      - ./audit:/home/bridge/audit

    read_only: true
    tmpfs:
      - /tmp:size=64m,mode=1777
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
```

生成请求状态签名密钥：

```bash
cd /opt/bridge-mcp
printf 'MCP_REQUEST_STATE_KEY=%s\n' "$(openssl rand -hex 32)" | sudo tee .env
sudo chmod 0600 .env
```

启动：

```bash
docker compose config
docker compose up -d
docker compose logs -f --tail=100 bridge-mcp
```

## 10. MCP 接入

生产环境在 bridge-mcp 前部署 HTTPS/OAuth 网关、VPN 或 SSH 隧道。容器端口只映射到宿主机 `127.0.0.1`。

通用 Agent 配置示例：

```json
{
  "mcpServers": {
    "bridge-mcp": {
      "type": "streamable-http",
      "url": "https://mcp.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${MCP_TOKEN}"
      }
    }
  }
}
```

Agent 需要支持 MCP `2026-07-28`。渐进发现流程：

```text
mcp_list_tool_groups
  → mcp_search_tools
  → mcp_describe_tool
  → mcp_call_tool
```

当前Docker部署使用普通Streamable HTTP POST。由于HTTP请求没有可用于破坏性操作确认的会话上下文，并且配置保持 `security.require_elicitation_on_destructive: true`，所有 `destructiveHint: true` 工具都会失败关闭，不会执行。需要人工确认的高风险操作应使用隔离的管理员stdio通道；不要在生产环境通过关闭门禁来绕过限制。

当前325个已启用工具按源码注解划分如下：

| 注解 | 数量 | HTTP可用性 |
|---|---:|---|
| `read_only` | 210 | 可调用，只读 |
| `mutating` | 72 | 可调用，会修改目标状态 |
| `mutating_idempotent` | 15 | 可调用，会修改状态，但重复执行通常收敛 |
| `destructive` | 28 | 当前HTTP部署拒绝执行 |

`mutating` 和 `mutating_idempotent` 不经过destructive确认门禁，但仍受SSH账户权限、白名单/黑名单、参数校验、速率限制和目标系统授权约束。非destructive不等于低风险，例如 `ssh_exec_multi`、`ssh_session_exec`、`ssh_pty_exec`、`ssh_docker_exec`、`ssh_k8s_exec` 与数据库查询工具都可能产生真实变更。

## 11. 目标服务器无法直接 SSH

目标能出站但不能入站时，使用目标服务器主动连接堡垒机的反向 SSH 隧道：

```text
目标服务器 ── SSH -R ──► 堡垒机 127.0.0.1:22001
bridge-mcp ── ProxyJump ──► 堡垒机 ──► 127.0.0.1:22001
```

目标服务器 systemd 服务的核心命令：

```bash
/usr/bin/ssh \
  -T \
  -i /etc/bridge-tunnel/id_ed25519 \
  -o BatchMode=yes \
  -o ExitOnForwardFailure=yes \
  -o StrictHostKeyChecking=yes \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  -R 127.0.0.1:22001:127.0.0.1:22 \
  tunnel@bastion.example.com
```

每台服务器使用独立隧道密钥和唯一端口，反向端口只绑定堡垒机回环地址。服务器数量较多时优先建设 WireGuard/IPsec 管理网。

## 12. 验证

配置验证：

```bash
docker compose run --rm bridge-mcp \
  --config /home/bridge/.config/bridge-mcp/config.yaml \
  validate
```

查看主机：

```bash
docker compose run --rm bridge-mcp \
  --config /home/bridge/.config/bridge-mcp/config.yaml \
  tool ssh_status
```

测试指标：

```bash
docker compose run --rm bridge-mcp \
  --config /home/bridge/.config/bridge-mcp/config.yaml \
  tool ssh_metrics \
  host=prod-web-01 \
  'metrics=["load","memory","disk"]'
```

查看工具组：

```bash
docker compose run --rm bridge-mcp \
  --config /home/bridge/.config/bridge-mcp/config.yaml \
  list-tools --groups-only
```

查看用户工具：

```bash
docker compose run --rm bridge-mcp \
  --config /home/bridge/.config/bridge-mcp/config.yaml \
  list-tools --search user
```

## 13. 工具概览

v4.1.0 实现476个实际工具、77个工具组，另有4个渐进发现元工具。下表覆盖全部工具组；“状态”以本文档配套的当前 `config.yaml` 为准。

### 13.1 Linux与跨平台工具组（43组）

| 工具组 | 状态 | 功能说明 |
|---|---|---|
| `core` | 启用 | SSH状态、健康检查、自由命令、批量执行、历史记录、异步输出和跨主机差异比较。 |
| `config` | 启用 | 读取和修改远程主机上的结构化或文本配置。 |
| `file_transfer` | 启用 | 通过SSH/SFTP上传、下载和同步文件或目录。 |
| `file_ops` | 启用 | 读取、写入、批量写入、权限/属主修改、状态、差异、补丁和模板渲染。 |
| `sessions` | 启用 | 创建、复用、列出、执行和关闭持久SSH命令会话。 |
| `monitoring` | 启用 | 采集CPU、内存、负载、磁盘、网络等指标，并支持多主机采集和日志尾随。 |
| `tunnels` | 启用 | 创建、列出和关闭SSH本地/远程端口转发隧道。 |
| `directory` | 启用 | 列目录、递归查找文件以及获取目录内容。 |
| `database` | 启用 | 通用数据库查询、导出和恢复，具体能力取决于目标机数据库客户端。 |
| `redis` | 启用 | 查询Redis状态、执行Redis命令和检索键。 |
| `postgresql` | 启用 | PostgreSQL状态检查和SQL查询。 |
| `mysql` | 启用 | MySQL/MariaDB状态检查和SQL查询。 |
| `mongodb` | 启用 | MongoDB运行状态和基础健康检查。 |
| `backup` | 启用 | 创建、列出、验证、调度、快照和恢复备份。 |
| `docker` | 启用 | 管理Docker容器、镜像、日志、执行、Compose、网络、卷和资源统计。 |
| `podman` | 启用 | 管理Podman容器、镜像、日志、执行和Compose工作负载。 |
| `esxi` | 关闭 | 查询ESXi主机、数据存储和网络，并管理虚拟机电源及快照。 |
| `cri` | 启用 | 使用crictl查询CRI Pod、容器、镜像、日志、统计，并执行容器命令或清理镜像。 |
| `k3s` | 关闭 | K3s状态、配置、etcd快照、证书、镜像、ServiceLB、插件、升级和卸载管理。 |
| `kubernetes` | 启用 | Kubernetes资源查询、日志、应用、删除、扩缩容、执行、RBAC、存储及Helm发布管理。 |
| `git` | 启用 | 仓库状态、日志、差异、克隆、拉取、分支和检出管理。 |
| `ansible` | 启用 | 执行Playbook、Ad-hoc任务，查看Inventory、回顾结果和后台任务。 |
| `awx` | 关闭 | AWX Inventory、Host、Project、Template、Job、Workflow、审批、同步和事件输出管理。 |
| `terraform` | 关闭 | Terraform初始化、计划、应用、State和Output管理。 |
| `vault` | 关闭 | HashiCorp Vault状态、读取、列举和写入Secret。 |
| `systemd` | 启用 | systemd服务状态、列表、日志、启动、停止、重启、启禁用和daemon-reload。 |
| `systemd_timers` | 启用 | systemd Timer列表、详情、启用、禁用和手动触发。 |
| `network` | 启用 | 网络连接、接口、路由、Ping、Traceroute和DNS诊断。 |
| `process` | 启用 | 进程列表、资源排行、详情和终止进程。 |
| `package` | 启用 | 软件包列表、搜索、安装、更新和卸载。 |
| `firewall` | 启用 | 查询防火墙状态和规则，并添加允许或拒绝规则。 |
| `cron` | 启用 | 列出、新增和删除Cron计划任务。 |
| `cron_analysis` | 启用 | 分析Cron配置、执行历史、冲突和一次性at任务。 |
| `certificates` | 启用 | 检查TLS证书详情、证书链和过期时间。 |
| `letsencrypt` | 启用 | 查询Let's Encrypt/Certbot证书和续期状态。 |
| `nginx` | 启用 | Nginx状态、配置测试、站点列表和安全重载。 |
| `apache` | 启用 | Apache状态、虚拟主机和基础配置检查。 |
| `user_management` | 启用 | Linux用户和用户组的查询、创建、修改和删除。 |
| `storage` | 启用 | 块设备、文件系统、挂载、卸载、LVM、分区表和fstab检查。 |
| `journald` | 启用 | 查询、跟随Journal日志，查看启动记录和日志磁盘占用。 |
| `security_modules` | 启用 | SELinux、AppArmor状态/策略检查和主机安全审计。 |
| `network_equipment` | 启用 | 查询网络设备运行配置、接口、路由、ARP、版本和VLAN，并提交/保存配置。 |
| `ldap` | 关闭 | LDAP搜索、用户信息、组成员查询以及目录对象新增和修改。 |

### 13.2 高级运维工具组（21组）

| 工具组 | 状态 | 功能说明 |
|---|---|---|
| `diagnostics` | 启用 | 根据症状进行单调用综合诊断、事件分诊和系统状态比较。 |
| `runbooks` | 启用 | 列出、校验并执行YAML定义的多步骤标准运维流程。 |
| `orchestration` | 启用 | 多主机金丝雀执行、滚动执行和集群范围差异比较。 |
| `recording` | 启用 | 启停、列出、回放和验证防篡改操作会话记录。 |
| `drift` | 启用 | 采集环境快照、比较状态并检测配置漂移。 |
| `security_scan` | 启用 | 生成SBOM、执行漏洞扫描和基础安全合规检查。 |
| `performance` | 启用 | 性能追踪、I/O追踪、网络延迟测试和基准测试。 |
| `container_logs` | 启用 | 跨容器搜索日志、统计事件并分析历史健康状态。 |
| `network_security` | 启用 | 端口扫描、TLS审计、网络抓包和Fail2ban状态检查。 |
| `compliance` | 启用 | 执行CIS/STIG检查，计算合规评分并生成报告。 |
| `cloud` | 启用 | 云CLI调用、实例元数据、标签和成本信息查询。 |
| `inventory` | 启用 | 主机发现、Inventory/CMDB同步和资产标签管理。 |
| `multicloud` | 启用 | 多云资源统一列举、同步和环境差异比较。 |
| `alerting` | 启用 | 检查指标阈值、列出告警和配置告警规则。 |
| `capacity` | 启用 | 采集容量数据、分析趋势并预测资源需求。 |
| `incident` | 启用 | 构建故障时间线并关联不同来源的故障事件。 |
| `log_aggregation` | 启用 | 跨主机聚合、搜索和实时跟踪日志。 |
| `key_management` | 启用 | 生成、分发和审计SSH密钥。 |
| `chatops` | 启用 | 向Slack、Teams或通用Webhook发送运维通知。 |
| `templates` | 启用 | 列出、查看、验证、比较和应用配置模板。 |
| `pty` | 启用 | 创建交互式PTY命令会话、持续交互和调整终端尺寸。 |

### 13.3 Windows工具组（13组，当前全部关闭）

| 工具组 | 状态 | 功能说明 |
|---|---|---|
| `windows_services` | 关闭 | Windows服务列表、状态、启动、停止、重启、启禁用和配置。 |
| `windows_events` | 关闭 | Windows事件日志、来源、查询、实时尾随和导出。 |
| `active_directory` | 关闭 | AD用户、组、成员、计算机和域信息查询。 |
| `scheduled_tasks` | 关闭 | Windows计划任务列表、详情、运行、启用和禁用。 |
| `windows_firewall` | 关闭 | Windows防火墙状态、规则列表以及允许、拒绝和删除规则。 |
| `iis` | 关闭 | IIS站点、应用池、状态及启停重启管理。 |
| `windows_updates` | 关闭 | Windows更新搜索、安装、历史记录和更新后重启。 |
| `windows_perf` | 关闭 | Windows CPU、内存、磁盘、网络和综合性能指标。 |
| `hyperv` | 关闭 | Hyper-V主机、虚拟机、虚拟交换机和快照管理。 |
| `windows_registry` | 关闭 | Windows注册表查询、列举、写入、删除和导出。 |
| `windows_features` | 关闭 | Windows Feature列表、详情、安装和移除。 |
| `windows_network` | 关闭 | Windows IP、网卡、连接、路由、Ping和DNS诊断。 |
| `windows_process` | 关闭 | Windows进程列表、排行、详情、按名称查询和终止。 |

### 13.4 当前可写工具清单

以下清单仅包含当前已启用工具组中的 `mutating` 和 `mutating_idempotent` 工具；已关闭工具组中的工具不计入。

#### `mutating`（72个）

```text
alerting: ssh_alert_set
ansible: ssh_ansible_recap, ssh_ansible_run_background
backup: ssh_backup_create, ssh_backup_schedule, ssh_backup_snapshot
chatops: ssh_notify, ssh_webhook_send
config: ssh_config_set
core: ssh_exec_multi
cri: ssh_crictl_exec
cron: ssh_cron_add
database: ssh_db_dump, ssh_db_query
docker: ssh_docker_exec
file_ops: ssh_file_chmod, ssh_file_chown, ssh_file_template
file_transfer: ssh_download, ssh_sync, ssh_upload
firewall: ssh_firewall_allow
git: ssh_git_branch, ssh_git_checkout, ssh_git_clone, ssh_git_pull
inventory: ssh_host_tags
key_management: ssh_key_generate
kubernetes: ssh_helm_install, ssh_helm_test, ssh_helm_upgrade,
  ssh_k8s_create_configmap, ssh_k8s_create_secret, ssh_k8s_create_token,
  ssh_k8s_exec, ssh_k8s_kubeconfig_generate, ssh_k8s_rbac_create,
  ssh_k8s_rollout, ssh_k8s_scale, ssh_k8s_volume_expand
mysql: ssh_mysql_query
network_equipment: ssh_net_equip_save
orchestration: ssh_canary_exec, ssh_rolling_exec
package: ssh_pkg_install
performance: ssh_benchmark
podman: ssh_podman_compose, ssh_podman_exec
postgresql: ssh_postgresql_query
pty: ssh_pty_exec, ssh_pty_interact, ssh_pty_resize
recording: ssh_recording_start, ssh_recording_stop
redis: ssh_redis_cli
security_modules: ssh_selinux_booleans
sessions: ssh_session_close, ssh_session_create, ssh_session_exec
storage: ssh_storage_mount, ssh_storage_umount
systemd: ssh_service_disable, ssh_service_enable, ssh_service_start
systemd_timers: ssh_timer_disable, ssh_timer_enable, ssh_timer_trigger
tunnels: ssh_tunnel_close, ssh_tunnel_create
user_management: ssh_group_add, ssh_user_add, ssh_user_modify
```

#### `mutating_idempotent`（15个）

```text
key_management: ssh_key_distribute
kubernetes: ssh_helm_dependency, ssh_helm_pull, ssh_helm_repo_add,
  ssh_helm_repo_update, ssh_k8s_apply, ssh_k8s_auth_reconcile,
  ssh_k8s_connectivity_test, ssh_k8s_cordon, ssh_k8s_patch,
  ssh_k8s_set, ssh_k8s_uncordon
nginx: ssh_nginx_reload
systemd: ssh_service_daemon_reload, ssh_service_restart
```

注解由v4.1.0源码工具注册信息决定，不能在 `config.yaml` 中覆盖。`tool_groups` 只决定工具是否注册和暴露，不能改变工具的风险分类。

## 14. 上线检查清单

- [ ] 镜像固定为 v4.1.0，而不是 latest。
- [ ] MCP HTTP 端口没有直接暴露公网。
- [ ] HTTPS/OAuth、VPN或SSH隧道已经启用。
- [ ] 使用独立 SSH 用户和独立密钥。
- [ ] 主机指纹经过带外核验。
- [ ] `security.mode` 为 `standard`。
- [ ] whitelist 全部首尾锚定。
- [ ] 未用不完整配置覆盖内置 blacklist。
- [ ] 输出脱敏和熵检测已启用。
- [ ] 破坏性操作确认已启用。
- [ ] 只启用了必要工具组。
- [ ] 高权限工具组未暴露给日常 Agent。
- [ ] 审计日志已持久化并接入日志系统。
- [ ] `validate`、`ssh_status`、`ssh_metrics` 验证成功。
