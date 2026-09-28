---
title: "OpenClaw 生态日报"
published: 2026-09-28
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-28

> Issues: 12 | PRs: 50 | 覆盖项目: 11 个 | 生成时间: 2026-09-28 00:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-28

## 1. 今日速览

过去 24 小时项目保持高活跃：**12 条 Issue 更新**（全部处于活跃状态，0 关闭），**50 条 PR 更新**（46 条待合并，4 条已合并/关闭），**无新版本发布**。Issue 侧重心集中在配置热重载阻塞、消息丢失与更新可靠性等稳定性问题上；PR 侧以 UI 修复、测试稳定性与多轮 "deslop" 重构为主。项目整体处于**"修复与整理并行"**阶段，但需注意：两条 P0 级 Issue（#155715、#159839）仍未关闭且暂无对应 fix PR，P1 级热重载卡顿问题（#159698）自昨日报告后亦无修复进展，稳定性风险积聚。

| 指标 | 数值 |
|---|---|
| Issues 更新 | 12（活跃 12 / 关闭 0） |
| PR 更新 | 50（待合并 46 / 合并关闭 4） |
| 新版本发布 | 0 |
| 待处理 P0 Issue | 2 |
| 待处理 P1 Issue | 3 |

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

过去 24 小时共 4 条 PR 合并/关闭，可见的已关闭 PR 为：

- [#159657 [CLOSED] fix(slack): keep top-level turns quiet and finish progress without "Working"](https://github.com/openclaw/openclaw/pull/159657) — 修复 Slack 顶层回复残留 "Working" 卡片及错误打开会话的问题，并保留用户自定义进度文案（commentary-only / custom-label）不被静默覆盖。由 @steipete 提交。

另有 46 条 PR 处于待合并状态，其中多条已标注 "👀 ready for maintainer look"，包括：

- [#159279 refactor(packages): deslop shared packages second pass](https://github.com/openclaw/openclaw/pull/159279) — 继续消除共享包中重复的流处理/模式构建逻辑，声明无运行时与 API 变更。
- [#159516 feat(approvals): show plugin requester context and outcome](https://github.com/openclaw/openclaw/pull/159516) — 审批侧增加插件请求者身份、来源与 320 字上下文，改善 Slack 协作审批体验。
- [#158567 feat(gateway): let operators disable client file and image uploads](https://github.com/openclaw/openclaw/pull/158567) — 新增 `gateway.uploads.enabled` 配置，允许运维关闭客户端上传而不影响文字对话。
- [#159546 fix(workers): one network reset during the worker runtime download fails a cloud provision](https://github.com/openclaw/openclaw/pull/159546) — 云 worker 运行时下载时单次网络抖动不再导致整个 provisioning 失败。

整体判断：今日合并节奏偏慢（4 条），但 PR 队列中有大量已就绪的 UI、CLI、worker 稳定性修复等待维护者合并，一旦合入将显著改善上传体验、Windows 启动兼容性（#151016）与云会话稳定性。

## 4. 社区热点

今日评论最集中的 Issues（各 2 条评论）：

- [#159698 [P1] Config hot reload blocks the gateway event loop 20-33s](https://github.com/openclaw/openclaw/issues/159698) — 每次热重载需同步抓取所有非 bundled 插件源码（拷贝/符号链接/哈希），网关主事件循环冻结 20-33 秒，期间 CLI 在途调用丢失。社区反响强烈，直指生产环境不可接受。
- [#159912 [P1] Memory background callbacks retain retired plugin registry after reload](https://github.com/openclaw/openclaw/issues/159912) — 插件重载后后台回调仍引用已退役注册表，本地向量索引持续失败数小时，但健康检查保持绿色，引发对"假健康"问题的讨论。
- [#155715 [P0] WhatsApp inbound message lost from session transcript](https://github.com/openclaw/openclaw/issues/155715) — sendPolicy deny 场景下 6 条连续入站消息被网关完整记录却未进入会话，属于静默数据丢失，社区关注度极高。
- [#121921 [P1] Feishu inbound mentions cascade into replies again after #93522](https://github.com/openclaw/openclaw/issues/121921) — 飞书多机器人 @ 级联回归，此前 #71396/#93522 两次修复后再次复发，社区对回归引入路径表示关注。

**诉求分析**：今日热点集中于**状态一致性与消息可靠性**——热重载导致的假死、插件重载后的假健康、通道消息静默丢失。用户核心诉求是网关在长时间运行、频繁配置变更下的确定性行为。

## 5. Bug 与稳定性

按严重程度排列：

**P0**

- [#155715 [P0] WhatsApp 入站消息从会话记录中丢失](https://github.com/openclaw/openclaw/issues/155715) — 6 条连续消息被网关接收并记录，但因内嵌 agent 运行失败而未写入会话。标记 `message-loss` / `data-loss`，**无 fix PR**，已开放 6 天。
- [#159839 [P0] Telegram 更新导致 macOS Gateway 离线](https://github.com/openclaw/openclaw/issues/159839) — 候选版本通过校验后停止托管 Gateway，激活 Doctor 配置提审遭遇 `authority-check-failed`，网关未恢复。标记 `security` / `crash-loop` / `ux-release-blocker`，**无 fix PR**，需安全审查。

**P1**

- [#159698 [P1] 配置热重载阻塞网关事件循环 20-33 秒](https://github.com/openclaw/openclaw/issues/159698) — 同步抓取插件源码导致 CLI 在途调用超时，**无 fix PR**（标记 needs-live-repro）。
- [#159912 [P1] 内存后台回调持有已退役插件注册表](https://github.com/openclaw/openclaw/issues/159912) — 重载后索引拒绝服务但健康检查为绿，标记 `queueable-fix` / `fix-shape-clear`，可排期修复。
- [#121921 [P1] 飞书入站 mention 级联回归](https://github.com/openclaw/openclaw/issues/121921) — 修复 #93522 后再次复发，已有 **linked PR 在推进**。

**P2**

- [#127428 [P2] QA 场景命令生命周期保留无界 stdout/stderr](https://github.com/openclaw/openclaw/issues/127428) — 子进程结算前完整保留双流并二次拷贝，存在内存膨胀风险。8 月 21 日提出，标记 `not-repro-on-main`，尚无复现路径。
- [#159966 [未标注级别] 全局安装更新失败（global-install-foreign-destination）](https://github.com/openclaw/openclaw/issues/159966) — 2026.9.6 版本、linux/x64 + Node 24.21.0 环境下 CLI 更新失败。

**P3**

- [#159736 [P3] doctor 配置流程无条件覆盖 agents.ownership=explicit](https://github.com/openclaw/openclaw/issues/159736) — roster 迁移时即使已显式设置也会被改写，标记 `ux-friction`，无 fix PR。

另有新报告 Bug：[#159971 Telegram mini-app /dashboard 与内置命令冲突](https://github.com/openclaw/openclaw/issues/159971)（两个 bundled 命令注册同名 `dashboard`，导致 mini-app 入口不显示）。今日无新增关闭的 Bug，P0/P1 积压未见缓解。

## 6. 功能请求与路线图信号

**新功能请求**

- [#159968 [P2, security] 允许协调者 agent 维护 Markdown 记忆而无需通用文件系统写权限](https://github.com/openclaw/openclaw/issues/159968) — 提出独立可授予的 capability，若被接受将影响 agent 权限模型设计，与当前最小权限方向一致。
- [#156198 [P2, enhancement] 减少 SQLite worker 命令拷贝](https://github.com/openclaw/openclaw/issues/156198) — broker 快照后 `postMessage` 再次克隆序列化字节，大命令内存开销翻倍，建议优化传输路径。

**可能进入下个版本的功能信号（来自待合并 PR）**

- [#154093 feat(android): receive prepared incoming data calls](https://github.com/openclaw/openclaw/pull/154093) — Android 端接收来电数据的完整链路。
- [#158567 feat(gateway): 允许禁用客户端文件/图片上传](https://github.com/openclaw/openclaw/pull/158567) — 运维可配置 `gateway.uploads.enabled`。
- [#159516 feat(approvals): 展示插件请求者上下文与审批结果](https://github.com/openclaw/openclaw/pull/159516) — 审批信息透明化。
- [#159970 fix: HTML 组件上限提升至 10 MiB](https://github.com/openclaw/openclaw/pull/159970) — 解除 256 KiB 自包含报告发布限制。
- [#159960 fix(ui): 允许超大 PNG 附件并在浏览器端压缩](https://github.com/openclaw/openclaw/pull/159960) — 改善上传体验。

上述信号共同指向**权限管控细化、移动端能力补全、附件/上传体验优化**三个方向，与今日 #159968 的安全诉求互相印证。

## 7. 用户反馈摘要

从今日更新 Issue 及评论中提炼的用户声音：

- **热重载卡顿是真实痛点**（#159698）：用户报告网关冻结期间 CLI 在途调用"丢失"，20-33 秒不可用窗口对生产网关不可接受，且"退役的捕获文件从不清理"加剧长期运行负担。
- **"假健康"损害运维信任**（#159912）：用户指出嵌入服务器与网关总体正常、健康检查绿灯，但后台索引拒绝服务数小时，监控失去意义。
- **消息丢失零容忍**（#155715）：用户详细记录了 6 条连续消息被 `gateway/channels/whatsapp/inbound` 与 `web-inbound` 完整记录却未进入会话的过程，属于静默丢失，影响信任。
- **更新链路挫败感**（#159966、#159839）：全局安装更新报 `global-install-foreign-destination` 错误；macOS 用户在 Telegram 触发更新后网关直接离线，升级路径缺乏安全感。
- **文档与实现不一致**（#127360）：setup 文档仅写 "Node 24.15+ recommended"，而实际 engine 契约是分段不连续的（`>=22.22.3 <23 || >=24.15.0 <25 || >=25.9.0`），25.9+/26 被遗漏，用户可能据此部署不受支持的 Node 版本。

## 8. 待处理积压

需维护者重点关注的长周期未决项：

- [#155715 [P0, 2026-09-22 创建] WhatsApp 消息丢失](https://github.com/openclaw/openclaw/issues/155715) — 当前最严重未决数据丢失问题，无 fix PR，已开放 6 天。
- [#68236 [PR, 2026-04-17 创建] OAuth e2e 回归测试覆盖](https://github.com/openclaw/openclaw/pull/68236) — 状态 "⏳ waiting on author"，已搁置 5 个多月。认证属安全敏感面，建议尽快推进或明确关闭。
- [#121921 [P1, 2026-08-11 创建] 飞书 mention 级联回归](https://github.com/openclaw/openclaw/issues/121921) — 开放超 6 周，虽有 linked PR 但尚未合并。
- [#127428 [P2, 2026-08-21 创建] QA stdout/stderr 无界保留](https://github.com/openclaw/openclaw/issues/127428) — 标记 `not-repro-on-main`，缺少复现路径，存在内存风险。
- [#127360 [P3, 2026-08-21 创建] 文档遗漏 Node 25.9+/26 支持范围](https://github.com/openclaw/openclaw/issues/127360) — 等待产品决策（needs-product-decision）。

此外，PR 队列中存在多个 "⏳ waiting on author" 或 "📣 needs proof" 状态的条目（#158840、#157966、#68236、#153824、#155581 等），建议维护者本周内统一 triage，避免积压进一步扩大。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向分析报告

**日期**: 2026-09-28  
**分析对象**: OpenClaw 及同生态 10 个关联项目  
**数据窗口**: 过去 24 小时 GitHub 公开动态

---

## 1. 生态全景

当前个人 AI 助手开源生态正处于**"规模扩张与稳定性承压"并行的关键阶段**。以 OpenClaw 为核心的"Claw 系"项目群（至少 8 个衍生/关联项目）已形成明显的生态簇，单日合计产生约 130 条 PR 动态与 30 条 Issue 动态，但头部项目 OpenClaw 出现 2 个 P0 级数据丢失问题无修复 PR，衍生项目 NanoClaw 和 Zeroclaw 也分别积压 29~47 条待合并 PR，说明生态整体处于"功能快速堆叠、稳定性债累积"的状态。与此同时，各项目不约而同将资源投向**消息可靠性、热重载一致性、渠道兼容性、安全加固**四大方向，反映出行业对智能体"可长期稳定运行于生产环境"的要求正在取代单纯的功能扩展。生态分化明显：头部项目拼渠道广度与平台完整性，腰部项目拼垂直体验（桌面端、电商、低配硬件），尾部项目已进入休眠。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 待合并 PR | 健康度评级 | 关键风险 |
|------|------------|---------|---------|-----------|-----------|---------|
| **OpenClaw** | 12（0 关闭） | 50（4 合并） | 无 | 46 | ⚠️ 中风险 | 2 个 P0 无 fix，热重载阻塞 20-33s |
| **NanoBot** | 5 | 17（6 合并） | 无 | 11 | ✅ 良好 | P0 cron 数据丢失已有修复 PR，闭环快 |
| **Zeroclaw** | 2 | 50（3 合并） | 无 | 47 | ⚠️ 中风险 | 成本追踪数据断裂（S2），PR 积压严重 |
| **NanoClaw** | 0（新增） | 39（10 合并） | 无 | 29 | ✅ 良好 | 更新后全量失败 bug 的修复未合并 |
| **CoPaw** | 7（2 关闭） | 4（0 合并） | 无 | 4 | ✅ 良好 | MCP 超时 PR 搁置 49 天 |
| **LobsterAI** | 5（多为 stale） | 8（7 关闭） | 无 | 1 | 🟡 腰部 | 活跃度被 stale 流程主导，社区偏冷 |
| **IronClaw** | 1 | 6（1 合并） | 无 | 5 | ✅ 稳定 | 36 天未合并的 wasm 依赖升级 |
| **PicoClaw** | 3（1 stale 关闭） | 2（0 合并） | 无 | 2 | 🟡 平稳 | 钉钉/飞书重连 panic 无修复 |
| **EasyClaw** | 0 | 0 | **v1.9.24** | 0 | ✅ 健康稳定 | 无积压，维护期 |
| **TinyClaw** | — | — | — | — | 💤 休眠 | 24h 无活动 |
| **ZeptoClaw** | — | — | — | — | 💤 休眠 | 24h 无活动 |

**数据解读**：
- **单日 PR 合并率**：NanoBot 最高（6/17，35%），NanoClaw 次之（10/39，26%），OpenClaw 与 Zeroclaw 均不足 10%，合并吞吐是当前生态的普遍瓶颈。
- **问题闭环能力**：NanoBot 几乎所有 bug 均在 1-2 日内开出修复 PR，是闭环效率标杆；OpenClaw 的 P0/P1 积压则已形成稳定性风险。
- **唯一发布**：EasyClaw 发布 v1.9.24 补丁版，其余 10 个项目 24h 内均无新版本，多数项目"有大量待合并 PR 但未发版"，版本节奏滞后于代码产出。

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位：生态核心参照系与架构源头

OpenClaw 是整个 "Claw 系"生态的**上游核心**，其 gateway + 插件 + 多渠道适配的架构模式被至少 7 个项目（Zeroclaw、NanoClaw、PicoClaw、CoPaw、TinyClaw、ZeptoClaw、LobsterAI 的 openclaw 域）直接继承或参考。生态内命名高度趋同（Zeroclaw、NanoClaw、PicoClaw、TinyClaw、ZeptoClaw），实质是围绕同一套智能体运行时做的**差异化裁剪**。

### 3.2 核心优势

| 维度 | OpenClaw | 同类对比 |
|------|----------|----------|
| **渠道覆盖** | WhatsApp、Telegram、Slack、飞书、Discord、Matrix、Signal 等全渠道 | 生态内最广，Zeroclaw 渠道数接近但为衍生 |
| **社区规模** | 单日 12 Issue + 50 PR，评论活跃度高 | NanoBot 17 PR、NanoClaw 39 PR，但 Issue 讨论密度远低于 OpenClaw |
| **架构完整性** | 网关事件循环 + 插件注册表 + 审批流 + worker 云置备 | 衍生项目多为单进程或裁剪版 |
| **治理结构** | 有明确 P0/P1 分级、maintainer review 流程、多个 "👀 ready" PR 排队 | 部分项目（PicoClaw、LobsterAI）依赖 stale bot 清理积压 |

### 3.3 技术路线差异

OpenClaw 走的是**重网关 + 全渠道 + 云 worker 置备**的"平台型"路线，这使其拥有最丰富的功能矩阵，但也直接导致了今日的核心矛盾——热重载时同步抓取所有非 bundled 插件源码导致网关事件循环冻结 20-33 秒（#159698）。相比之下，NanoBot 选择了更轻的 **providers 抽象层路线**（Responses API 兼容优先），通过精简架构换取更高的修复闭环速度；NanoClaw 则专注**安装/更新链路可靠性**，以 "让部署一次成功" 为核心卖点。

### 3.4 社区规模对比

```
社区活跃度（单日 PR+Issue 总量）:
OpenClaw    ████████████████████ 62
Zeroclaw    ████████████████████ 52
NanoClaw    ███████████████ 39
NanoBot     █████████ 22
LobsterAI   █████ 13
CoPaw       █████ 11
IronClaw    ███ 7
PicoClaw    ██ 5
EasyClaw    █ 1 (但有 release)
```

OpenClaw 作为核心参照，社区体量约为第二梯队的 1.2~3 倍，且是唯一有外部贡献者提交安全修复（Zeroclaw 的 SSRF 加固也借鉴了其模式）并形成跨项目影响的项目。但需注意：OpenClaw 的 **P0 问题响应速度已落后于 NanoBot**，若稳定性债持续累积，可能削弱其"生产可用"的公信力，为衍生项目创造替代空间。

---

## 4. 共同关注的技术方向

### 4.1 消息可靠性与零数据丢失（涉及：OpenClaw、NanoBot、Zeroclaw）
- **OpenClaw**: WhatsApp 6 条连续消息被网关完整记录却未写入会话（#155715，P0，无 fix）
- **NanoBot**: cron 存储写盘失败时待执行动作静默丢失（#5932，P0，已有修复 PR）
- **Zeroclaw**: OpenRouter 成本数据未被摄取，90 次请求/210 万 tokens 费用显示 $0.00（#11204，S2）

**共性诉求**：数据从"接收/生成"到"持久化/展示"的链路中，任何一环失败都不能静默吞掉数据，需要显式告警与重试机制。

### 4.2 热重载/动态更新后的状态一致性（涉及：OpenClaw、NanoClaw、CoPaw）
- **OpenClaw**: 配置热重载冻结网关 20-33 秒；插件重载后后台回调持已退役注册表，健康检查仍为绿（"假健康"）
- **NanoClaw**: 执行 `/update-nanoclaw` 后 Iron 代理被误停，所有 agent spawn 失败
- **CoPaw**: 上下文显示圈不随对话切换更新，需重启才恢复

**共性诉求**：配置变更、重载、更新应具备事务性——要么原子生效，要么明确失败并回滚；监控指标必须反映真实运行状态。

### 4.3 渠道兼容性与回归控制（涉及：OpenClaw、NanoBot、Zeroclaw、PicoClaw）
- **OpenClaw**: 飞书 mention 级联回归两次修复后第三次复发（#121921）
- **NanoBot**: 飞书内部检查点消息泄漏给终端用户（#5903）
- **Zeroclaw**: WhatsApp Web Ctrl+C 导致 supervisor 无限重启（#9155，已修复）
- **PicoClaw**: 钉钉/飞书流式重连 panic 在 v0.3.1 上仍然复现（#3382）

**共性诉求**：即时通讯渠道 SDK 更新频繁，重连、消息格式、事件语义的回归是多项目共同痛点，需要更系统的渠道集成测试。

### 4.4 安全加固与最小权限（涉及：Zeroclaw、OpenClaw、LobsterAI）
- **Zeroclaw**: 合并 SSRF 加固 PR #10070，为 file_download 增加 private-host opt-in
- **OpenClaw**: 新功能请求——允许协调者维护 Markdown 记忆而无需通用文件系统写权限（#159968）
- **LobsterAI**: 此前已修复 IPC 任意文件读取 + SSRF 漏洞（#1041/#1042），但 Deep Link 校验缺失仍开放（#977）

**共性诉求**：智能体工具调用的权限边界正在从"全有或全无"走向"细粒度可授予 capability"；SSRF、任意文件读写是桌面端与网关类项目的共性高危面。

### 4.5 安装/更新体验的"最后一公里"（涉及：NanoClaw、OpenClaw、EasyClaw）
- **NanoClaw**: 9 条安装/更新相关 PR，覆盖容器残留、代理中断、配置误检测
- **OpenClaw**: 全局安装更新失败（#159966）、Telegram 更新致网关离线（#159839）
- **EasyClaw**: 以 v1.9.24 维持稳定小步发布节奏

**共性诉求**：升级路径的安全性（失败可回滚、不中断服务）、安装过程的可诊断性是用户是否信任"智能体常驻运行"的前提。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|----------|----------|------------------|
| **OpenClaw** | 全渠道智能体网关，云 worker 置备，审批流 | 中大型部署/技术深度用户 | 重网关 + 插件注册表 + 云置备，功能最全但复杂度最高 |
| **NanoBot** | Providers 层兼容性（Responses API）、WebUI 体验 | 追求前沿模型（GPT-6）快速接入的开发者 | 轻量架构，以 provider 抽象为核心，闭环速度快 |
| **Zeroclaw** | 全渠道 + 安全加固 + 会话持久化（SQLite 附件） | 从 OpenClaw 迁移但需要更强安全管控的团队 | 在 OpenClaw 基础上强化 SSRF 防护、沙箱策略 schema |
| **NanoClaw** | 安装/更新可靠性、本地/私有模型支持、低配运行 | 内网部署、低配硬件、非 Docker 专家用户 | 聚焦 setup/update 流水线，Iron 代理 + 容器生命周期管理 |
| **PicoClaw** | 轻量级、OneBot/QQ 场景 | 个人开发者、硬件（Sipeed）用户 | 精简版，渠道选择性支持，社区驱动的小步迭代 |
| **CoPaw** | 桌面端体验（Electron）、MCP 工具超时控制 | 桌面重度用户、对 UI 敏感者 | 桌面壳 + WebUI 双端，关注设置 UX 与上下文管理可视化 |
| **LobsterAI** | AI 文档工作流（Word 编辑）、聊天产物管理 | 内容创作者、办公场景 | Electron 桌面应用，renderer/main 双进程，强调 artifacts 能力 |
| **IronClaw** | Rust 实现、工具编排优化（turn-0 预选提案） | Rust 生态开发者、对性能敏感者 | 技术栈差异化（Rust），当前以依赖维护为主，属早期 |
| **EasyClaw** | TK（TikTok）电商场景的 SPS 分析 | 跨境电商运营者 | 垂直场景专用，非通用智能体，迭代节奏稳定 |

**关键判断**：生态内的差异化主要体现为三个轴——**架构复杂度**（OpenClaw/Zeroclaw 重，NanoBot/PicoClaw 轻）、**场景垂直度**（EasyClaw 电商、LobsterAI 文档、NanoClaw 内网部署）、**技术栈选择**（IronClaw 的 Rust 是唯一非 TS/JS 系）。目前尚无项目在"易用性 + 生产级可靠性"上形成对 OpenClaw 的替代性优势，但 NanoClaw（部署体验）和 NanoBot（模型适配速度）各自在细分维度建立了差异化壁垒。

---

## 6. 社区热度与成熟度

### 第一梯队：快速迭代期（合并吞吐高、Issue 响应快）
| 项目 | 特征 | 证据 |
|------|------|------|
| **NanoBot** | 最健康的高速迭代 | 17 PR 中 6 条当日合并，P0 当日即有修复 PR，GPT-6 兼容问题 1-2 日内闭环 |
| **NanoClaw** | 密集修复期 | 39 PR/日，10 条合并，方向高度聚焦（安装/更新链路） |

### 第二梯队：规模化扩张期（功能多、但合并与稳定性承压）
| 项目 | 特征 | 证据 |
|------|------|------|
| **OpenClaw** | 社区最大但稳定性债累积 | 46 条待合并 PR，P0 无 fix，热重载问题引发社区强烈反馈 |
| **Zeroclaw** | 安全驱动 + 功能密集 | 50 PR/日但仅 3 合并，SSRF 修复落地，47 条积压 |
| **CoPaw** | 需求集中爆发 | 7 条 Issue 涵盖桌面端多个痛点，PR 队列虽短但关键项搁置 49 天 |

### 第三梯队：质量巩固期（节奏平缓、侧重打磨）
| 项目 | 特征 | 证据 |
|------|------|------|
| **IronClaw** | 依赖维护主导 | 6 条 PR 中 5 条为 dependabot，1 条 CI 自动刷新，无用户功能迭代 |
| **LobsterAI** | 核心开发维持、外部参与度低 | 12/13 条更新为 stale 状态变更，仅有 2 条真实 PR |
| **PicoClaw** | 社区小但需求明确 | 3 Issue + 2 PR，OneBot 配置项当日即出实现 PR |
| **EasyClaw** | 稳定维护期 | 零 Issue/PR，但保持版本发布节奏（v1.9.24） |

### 第四梯队：休眠期
**TinyClaw、ZeptoClaw**：24h 完全无活动，可能已停止维护或处于长期静默。

---

## 7. 值得关注的趋势信号

### 7.1 生产级可靠性正在取代功能数量成为竞争焦点
OpenClaw 的 P0 消息丢失 + 热重载 20-33 秒冻结、NanoBot 的 cron 数据丢失、Zeroclaw 的成本数据断裂——三家头部项目同日暴露数据正确性问题，这不是巧合。**"假健康"（健康检查绿灯但实际服务拒绝）** 在 OpenClaw #159912 中被明确讨论，标志着社区开始要求监控系统验证"服务真实可用"而非仅"进程存活"。对开发者的参考价值：在设计 agent 系统时，应将**数据写入确认、端到端可观测、健康检查语义细化**作为一等公民，而非事后补丁。

### 7.2 热更新/热重载是智能体长稳运行的最大技术瓶颈
OpenClaw 的重载冻结、NanoClaw 的更新后 agent 全挂、CoPaw 的上下文状态不刷新，三个项目从不同层面暴露同一命题：**智能体常驻进程的动态配置能力还远未成熟**。这指向一个明确的架构机会——支持原子热切换、插件生命周期隔离、重载事务性的运行时设计，将是下一阶段生态的核心竞争力。

### 7.3 权限模型从"进程级"走向"能力级"
Zeroclaw 的 SSRF 加固、OpenClaw 的"记忆维护独立 capability"提案（#159968）、LobsterAI 的 IPC 输入校验，共同指向一个方向：**智能体工具的权限正在从"是否有文件系统访问权"细化为"是否有写 Markdown 记忆的权利"**。细粒度、可授予、可审计的 capability 模型（而非扁平的文件/网络权限）将成为智能体安全架构的标准。

### 7.4 渠道接入的"长尾维护成本"被严重低估
飞书 mention 三次回归（OpenClaw）、钉钉/飞书重连 panic 持续复现（PicoClaw）、WhatsApp supervisor 无限重启（Zeroclaw）——**每个 IM 渠道都是一个需要持续维护的"小项目"**。开发者应评估渠道接入的 ROI，或借助 NanoBot 式的 provider 抽象层隔离渠道差异，而非为每个渠道写死逻辑。

### 7.5 本地/私有化部署需求快速上升
NanoClaw 的私有 CA 信任、本地模型 URL 校验、minimalContext 轻量运行模式；Zeroclaw 对私有主机访问的 opt-in；OpenClaw 对 Node 版本支持范围的文档讨论（#127360）——**"数据不出内网 + 自带模型"正从小众诉求变为主流部署选项**。对开发者的参考价值：优先保证配置项支持自定义 CA、自定义 endpoint、离线运行模式，这正在成为智能体框架的"标配能力"。

### 7.6 模型适配速度成为社区口碑的晴雨表
NanoBot 在 GPT-6 系列发布后 1-2 日内即完成 Copilot/Codex 双通道适配，获得了显著的正向社区反馈；而其他项目若对前沿模型支持滞后，则容易触发用户"升级后不可用"的抱怨（如 NanoBot #5898 的 v0.3.5 兼容性问题）。**provider 抽象层的设计质量直接决定了项目对模型快速迭代的响应能力**。

### 7.7 工具编排进入"预选/裁剪"优化阶段
IronClaw 提出的 turn-0 工具预选机制（BM25F + embedding 混合评分，仅广播预测工具 + 4 个发现桥）是值得关注的架构创新信号。它回应的是工具数量膨胀导致的上下文开销问题——这与 OpenClaw 的插件系统复杂度、NanoClaw 的 lean-tasks 降本思路一脉相承。**"如何在保持能力完整性的同时减小每次请求的决策空间"将成为智能体性能优化的下一个主战场。**

---

## 结语

当前生态的宏观图景是：**OpenClaw 确立了平台范式，但稳定性债正在消耗其先发优势；NanoBot 以闭环速度证明了轻量架构的竞争力；NanoClaw 等衍生项目在垂直场景（部署、安全、桌面、电商）逐步建立壁垒**。对于技术决策者，选择底座时建议优先评估三个维度——消息可靠性的工程投入、热更新/重载的事务性设计、以及权限模型的细粒度程度，这三者正是今日生态中暴露最多、也最影响长期生产价值的问题。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-28

## 今日速览

过去24小时NanoBot项目保持高水平活跃度：新增/活跃Issue 5条，PR更新17条（其中6条已合并/关闭），无新版本发布。今日修复集中在**providers层Responses API兼容性**（3个PR合入）、**cron持久化数据安全**（对应p0级Issue已开出修复PR）以及**WebUI体验打磨**（历史分页、GitHub星标邀请优化）。值得注意的是，多个Issue聚焦于GPT-6系列模型在GitHub Copilot和OpenAI Codex中的兼容性问题，已各有对应修复PR跟进，说明项目对前沿模型的支持响应迅速。综合来看，项目维护活跃、问题闭环速度快，健康度良好。


## 项目进展

今日合并/关闭的 PR 共 6 条，核心推进了以下方向：

**🔄 Providers 层稳定性（3 条，优先级均为 P1）**
- [#5937 fix(providers): stop Responses streams at terminal events](https://github.com/HKUDS/nanobot/pull/5937)：修复 SSE 与 SDK Responses 解析器在 `response.completed`/`response.incomplete` 后未及时停止流的问题，避免等待传输 EOF 带来的延迟和资源占用。
- [#5938 fix(providers): preserve optional tool parameters in Responses requests](https://github.com/HKUDS/nanobot/pull/5938)：修复工具参数转换时丢弃显式 `strict` 设置的问题，该问题可能导致可选 MCP 过滤器被误设为必填，或强制将不兼容参数合并到同一个调用。
- [#5935 fix(copilot): route GPT-6 through Responses](https://github.com/HKUDS/nanobot/pull/5935)（已合并）：将 Copilot GPT-6 模型路由到 Responses API，并保留仅支持 Responses 的 GPT-6 模型在模型目录中。

**🖥️ WebUI 体验**
- [#5934 fix(webui): unblock earlier-history pagination and show retry states](https://github.com/HKUDS/nanobot/pull/5934)：修复当最新一页未填满视口时无法向上翻页的问题，并为加载/失败状态增加反馈。
- [#5944 feat(webui): polish the GitHub star invitation](https://github.com/HKUDS/nanobot/pull/5944)：GitHub 星标邀请 UI 美化，新增橙色虎斑猫插画、十种语言的文案优化及响应式布局。

**其他**
- [#5865 fix(webui): preserve primary context window with smaller fallbacks](https://github.com/HKUDS/nanobot/pull/5865)：修复主上下文窗口被较小回退窗口拉低的问题，保留 256K 主预设的上下文预算。
- [#5936 fix(weixin): silence polling request logs](https://github.com/HKUDS/nanobot/pull/5936)：屏蔽微信轮询产生的每 18 秒一次的 INFO 日志，解决日志刷屏问题。

> 另注：#5933（p0）修复 cron 数据丢失问题的 PR 仍在待合并队列，对应 Issue 见下文。


## 社区热点

### 最活跃 Issue
**[Issue #5903 — Feishu: hidden session-checkpoint marker delivered to user after idle compaction](https://github.com/HKUDS/nanobot/issues/5903)**（3 条评论）
- 飞书渠道在空闲自动压缩后，内部会话检查点标记（"Continue the active task from the working-memory checkpoint above."）被当作普通聊天消息推送给用户，并且该消息被持久化且带 `_hidden` 标记。用户对这类内部消息泄漏到客户端明显不满。

### 值得关注的新增 Issue
**[Issue #5939 — OpenAI Codex model discovery omits GPT-6 Sol and Luna with pinned client_version](https://github.com/HKUDS/nanobot/issues/5939)**
- WebUI 模型预设选择器中 Codex provider 只显示了 GPT-6 Astra 和 GPT-5.6，缺少 GPT-6 Sol 和 Luna。刚开出 Issue 即已关联修复 PR #5940，回应极快。

**[Issue #5932 — cron: pending actions are lost if the merged store cannot be saved](https://github.com/HKUDS/nanobot/issues/5932)**
- `CronService._merge_action()` 在调用 `_save_store()` 前就清空了 `action.jsonl`。若写入失败（如磁盘满），已接受的待执行动作将从磁盘永久丢失，而失败服务仍保留脏内存快照。已触发 p0 级 PR #5933 跟进。


## Bug 与稳定性

今日报告的 Bug 按严重程度排列：

| 严重度 | Issue | 描述 | 是否有修复 PR |
|--------|-------|------|---------------|
| 🔴 P0 | [#5932 cron pending actions lost on store save failure](https://github.com/HKUDS/nanobot/issues/5932) | 存储写盘失败时待执行动作从磁盘丢失，可能造成任务静默丢失 | ✅ [#5933](https://github.com/HKUDS/nanobot/pull/5933)（待合并） |
| 🟠 P1 | [#5898 gpt-6 via GitHub Copilot fails](https://github.com/HKUDS/nanobot/issues/5898) | v0.3.5 下 Copilot 的 GPT-6 模型请求报 provider 错误 | ✅ [#5935](https://github.com/HKUDS/nanobot/pull/5935)（已合并） |
| 🟡 P2 | [#5903 Feishu checkpoint marker delivered to user](https://github.com/HKUDS/nanobot/issues/5903) | 飞书渠道内部检查点消息泄漏给终端用户 | ❌ 暂无 |
| 🟡 P2 | [#5924 Agent stuck in sudo loop](https://github.com/HKUDS/nanobot/issues/5924) | sudo 授权仅维持一轮，Agent 陷入循环，且达到最大迭代后仍执着于无法执行的命令 | ❌ 暂无 |
| 🟡 P2 | [#5939 Codex omits GPT-6 Sol/Luna](https://github.com/HKUDS/nanobot/issues/5939) | 固定 client_version 导致模型发现遗漏两个 GPT-6 模型 | ✅ [#5940](https://github.com/HKUDS/nanobot/pull/5940)（待合并） |

整体来看，多数 Bug 都能当日或 1-2 日内开出对应修复 PR，闭环速度良好。仍有两项（#5903、#5924）缺乏修复方案，建议维护者优先关注。


## 功能请求与路线图信号

今日无新功能特性请求，主要以 Bug 修复和体验打磨为主。但有几个信号值得关注：

1. **GPT-6 模型系列全面适配**（#5898、#5935、#5939、#5940）：Copilot 与 Codex 双通道的 GPT-6 支持正在快速补齐，模型底座升级是当前开发重点之一。

2. **持久化架构向 SQLite 迁移**（PR #5580、#5943）：两个 PR 均在推进将 session 持久化从 JSONL/文件锁迁移到 SQLite 事务 + 有界 worker，这属于架构级重构，预示着后续版本在稳定性和并发能力上的提升。

3. **远程实例互联**（PR #5941）：实现本地 WebUI 连接服务器上已有的 nanobot 实例，属于 NAN-157 里程碑功能，仍为待合并状态。


## 用户反馈摘要

从今日 Issue 评论中可提炼以下用户声音：

- **飞书用户体验受到噪音消息干扰**（#5903）：用户对内部会话维护消息被推送到聊天界面感到困扰，这类消息破坏了对话的整洁性和用户体验。评论区的讨论反映出：即使消息被持久化时带 `_hidden` 标记，仍会通过飞书渠道实际送达，说明隐藏标记在部分渠道未被尊重。

- **升级后兼容性焦虑**（#5898）：用户从旧版本升级到 v0.3.5 后遇到 Copilot 模型请求失败，直接在 Issue 中描述了报错现象。这提示模型适配是一个持续性问题，用户对新模型的支持速度有较高期待。

- **Agent 自主性的边界问题**（#5924）：sudo 授权只在单轮有效导致 Agent 陷入死循环，用户在描述中明确表达了挫败感（"becomes unusable"）。这反映出在真实运维场景中，Agent 的自我决策能力与系统安全策略之间的冲突需要更优雅的解决方式。

- **数据安全仍是首要关切**（#5932）：cron 任务在写盘失败时静默丢失已接受动作，属于数据丢失类问题，触发 p0 优先级反馈，说明用户对自动化任务可靠性要求极高。


## 待处理积压

以下为长期未获回应或仍未关闭的重要项，提醒维护者关注：

| 项目 | 创建时间 | 积压天数 | 说明 |
|------|----------|----------|------|
| [PR #5257 fix(agent): bound sustained-goal continuation when the turn goes idle](https://github.com/HKUDS/nanobot/pull/5257) | 2026-08-05 | 54天 | p2 优先级，防止 Agent 在空闲时反复自动续作消耗迭代预算。关联 #5924 的 sudo 循环问题与此有相通之处 |
| [PR #5780 fix: stop sending context compaction notifications](https://github.com/HKUDS/nanobot/pull/5780) | 2026-09-15 | 13天 | 标记 `conflict`，使自动上下文压缩的通知对用户不可见。与 #5903 飞书消息泄漏问题相关联 |
| [PR #5864 fix(discord): cancel delayed reaction tasks on runtime reset](https://github.com/HKUDS/nanobot/pull/5864) | 2026-09-22 | 6天 | 修复 Discord 渠道运行时重置时未清理延迟反应任务的问题，对应 #5806 |
| [Issue #5924 Agent stuck in sudo loop](https://github.com/HKUDS/nanobot/issues/5924) | 2026-09-26 | 2天 | 尚无修复方案，可能导致 Agent 在特权命令场景下不可用 |

---

*本日报基于 GitHub 公开数据自动生成，统计窗口为 2026-09-27 至 2026-09-28。*

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报 — 2026-09-28

## 1. 今日速览

过去 24 小时项目保持高强度迭代：共 50 条 PR 更新（其中 47 条处于待合并状态）、2 条 Issue 更新。安全方面取得实质进展，重要 SSRF 加固 PR #10070 经维护者修复后合并，长期困扰用户的 WhatsApp Web 无限重启 bug（#9155）随之关闭。与此同时，新上报 1 个 S2 级 Bug——OpenRouter 成本追踪全面失效（#11204），直接影响用户费用可视化，需优先关注。整体来看，项目处于功能密集开发与安全加固并行的活跃阶段，但大量 PR 排队待合并，合并吞吐可能成为下一步瓶颈。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日共有 3 条 PR 合并/关闭（数据概览口径），重要进展如下：

- **[PR #10070] feat(tools): gate file_download against SSRF with private-host opt-in（已合并）**  
  为 `file_download` 工具增加 SSRF 防护，并支持私有主机（private-host）选择加入。该 PR 原由社区贡献者 @wangmiao0668000666 发起，维护者 @Audacity88 在关联 PR #10072/#10075 关闭后推入维护者修复，保留了原始 SSRF 加固意图，同时纳入了 NAT64 和 live-config 的有用改动。这是今日最重要的安全加固动作。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10070

- **[Issue #9155] WhatsApp Web Ctrl+C 引发 supervisor 无限重启（已关闭）**  
  该问题自 2026-07-18 起持续开放，属于 P2 优先级。关闭意味着对应的修复已合并到主分支，频道生命周期管理的这一长期缺陷得到解决。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9155

- **其余合并/关闭条目**：另有一条 PR 在未展示列表中完成合并/关闭，整体合并节奏保持平稳。

值得注意的进展信号：`--version` 目前无法区分同一版本号内的 333 个 commit（见 #11196），说明 0.8.5 分支已积累大量未发版改动；大量功能 PR（持久会话附件、沙箱策略 schema、ACP 中断恢复等）均在待合并队列中，下一版本发布时预计有较丰富的内容。

## 4. 社区热点

本次数据快照未提供评论/反应计数，以下基于 PR 规模、标签广度和话题性进行筛选：

- **[PR #10407] feat(sessions): add persistent session prompt attachments（大热候选）**  
  标签覆盖全部渠道（core/slack/telegram/discord/matrix/whatsapp/lark/mattermost/signal/acp），横跨 agent、runtime、security 等多域，是近期体量最大、影响面最广的 PR（size:XL）。它提出的 SQLite-backed 持久会话提示附件机制，涉及所有渠道的会话行为，讨论热度与维护成本均处于高位。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10407

- **[PR #11076] feat(tools): add agy_cli coding-CLI tool for Antigravity CLI**  
  针对 Google 已将终端 Gemini 迁移至 Antigravity CLI（`agy`）的重大生态变化做出响应，使 ZeroClaw 的委托编码工具矩阵保持完整。这类跟随上游生态演进的功能通常社区关注度较高。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11076

- **[Issue #11204] OpenRouter spend 显示 $0.00（新热点）**  
  新上报的 S2 级问题，直接冲击用户的费用管理核心场景。若影响范围扩大，预计将迅速升温。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11204

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 编号 | 问题 | 状态 |
|---|---|---|---|
| S2 | [#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204) | OpenRouter 费用显示 $0.00，约 90 次请求/210 万 tokens 全部被标记为“free tok”，usage.cost 从未被摄取，Dashboard 各维度成本报告全部失效 | 新上报，无 fix PR |
| S2 | [#9155](https://github.com/zeroclaw-labs/zeroclaw/issues/9155) | WhatsApp Web Ctrl+C 导致监听器退出后 supervisor 无限重启 | 已关闭（修复已合并） |

**开放中的 Bug 修复 PR（待合并）**：

- **[PR #10480] fix(runtime): recover from rejected image requests**（XL）  
  针对图像请求被 HTTP 400 拒绝后无法恢复的问题，重试时自动剔除“新增图像”并复用 replay-safe provider/model 请求。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10480

- **[PR #10843] fix(channels): implement Telegram add_reaction/remove_reaction, fail loudly on unsupported channels**（L）  
  Telegram 渠道的反应功能此前继承 trait 默认实现，静默伪造成功（无实际 API 调用），此 PR 将其修正为真实调用并在不支持时明确报错。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10843

- **[PR #11146] fix(browser): report agent-browser probe timeouts**（XS）  
  将超时与可执行文件缺失区分报告，并在返回前终止超时子进程。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11146

- **[PR #11060] fix(channels/whatsapp-web): queue a forced reply outside a voice chat**（M）  
  修复语音聊天场景下强制回复（`force_voice`）无法送达的问题，与 #11057 形成堆叠修复对。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11060

## 6. 功能请求与路线图信号

以下新功能 PR 指向下一版本的可能方向（按路线图信号强度排序）：

- **[PR #11068] feat(channels): narrow channel turns by sender role**（XL）  
  为 `peer_groups.<name>` 增加 `risk_profile` 发送者角色概念——同名组中的 `external_peers` 优先级高于 `"*"`，平级冲突时拒绝会话。权限精细化方向，符合安全架构演进趋势。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11068

- **[PR #10407] feat(sessions): add persistent session prompt attachments**（XL）  
  SQLite 持久化会话级提示附件（每会话最多 4 个），跨守护进程重启存留，会话删除时事务性清理。将显著增强多轮任务连续性。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10407

- **[PR #11076] feat(tools): add agy_cli coding-CLI tool**（XL）  
  将编码委托工具从 Gemini CLI 扩展至 Antigravity CLI（`agy`），对上游生态变化做出主动适配。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11076

- **[PR #11099] feat(enroll): print a relay frontdoor link and QR with the pairing code**（M）  
  在配对码打印时同时输出中继前门链接和二维码，改善设备配网体验（依赖 #11089，已合并）。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11099

- **[PR #11039] docs(tools): add You.com MCP search server example**（XS）  
  扩展 MCP 生态文档，新增 You.com 认证及免认证端点示例。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11039

## 7. 用户反馈摘要

- **成本追踪可信度受损（#11204）**：用户 @alperylimaz 反馈，连续使用 OpenRouter 约 90 次请求、消耗约 210 万 tokens 后，Dashboard 的 Session / Daily / Monthly / By Model / By Agent 全部显示 `$0.000000`，且所有 token 被分类为 `free tok`。这表明 `usage.cost` 字段在摄取链路中完全断裂，用户无法获得任何成本可见性。在生产环境中，这将直接影响预算管理与模型选型决策。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11204

- **WhatsApp 频道无法干净退出（#9155，已修复）**：用户 @Audacity88 反馈，`zeroclaw channel start` 运行中按下 Ctrl+C，监听器虽退出但命令本身未终止，supervisor 将干净退出视为意外并无限重启，导致频道实例无法停止。这暴露了 supervisor 对“干净退出”与“异常退出”的判别缺陷。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9155

## 8. 待处理积压

以下条目长期开放或处于阻塞状态，建议维护者优先关注：

- **[PR #7821] feat(security): canonical sandbox_policy schema with application-layer enforcement**（开放 3 个月+，size:XL，含 `needs-maintainer-review`）  
  创建于 2026-06-17，是 filesystem 安全策略的核心架构 PR，引入 `SandboxPolicyConfig` 规范模型，涉及 OS-sandbox 构造与运行时多路径的一致性。长期未合并可能阻塞后续安全策略相关功能。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/7821

- **[PR #10197] fix(acp): persist interrupted turn progress**（开放 1 个月+，size:XL，含 `needs-maintainer-review`）  
  为 Code/ACP 回合增加检查点与中断恢复能力，是 ACP 会话可靠性的关键补丁。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10197

- **[PR #11090] docs(runtime): propose the runtime composition contract**（状态 blocked）  
  依赖 #11092 的 Core Team 评审，需在 ADR-016 框架下批准 exception row 后方可合并，属于架构类文档决策项。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11090

- **[PR #10652] fix(memory): route CLI memory factory through storage-aware resolver**（含 `stale-candidate`，9 月 6 日创建）  
  修复 `zeroclaw memory list/get/stats` 与 PostgreSQL `clear` 在存储别名解析上的老路径失败问题。已进入 stale 候选，需作者或维护者推进避免失活。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10652

- **整体积压信号**：当前 47 条 PR 待合并，其中至少 6 条标注 `needs-author-action`（#10407、#7821、#10652、#10843、#11099、#11146），依赖作者响应。建议维护者审视队列，加速核心安全/可靠性 PR 的评审，控制积压规模。

---

**总结**：ZeroClaw 项目健康度良好——社区贡献活跃、安全修复持续推进、Bug 闭环效率尚可。主要风险点集中在两点：一是 #11204 成本追踪断裂属于数据正确性缺陷，且无 fix PR，需尽快定位；二是 PR 合并积压（47 条）可能推迟重要功能的发布节奏，建议适当提升合并吞吐。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

## PicoClaw 项目日报 · 2026-09-28

### 1. 今日速览

过去 24 小时 PicoClaw 处于低强度但健康的维护节奏：共 3 条 Issue 更新（2 条 open、1 条 stale 关闭），2 条 PR 待审，无新版本发布、无 PR 合入。社区活跃度主要体现在 OneBot 通道的功能请求（#3395）与对应实现 PR（#3396）在同一天内先后出现，显示用户诉求能快速转化为代码贡献。另一方面，钉钉/飞书流式重连 panic（#3382）仍是突出的稳定性风险，且已进入 stale 状态，需要维护者介入。整体看，项目当前无紧急回归，社区围绕"可配置化"的演进方向较为明确。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日无 PR 被合并或关闭，代码主干没有新提交。当日动态主要包括：

- **新 PR #3396**：为 OneBot 通道新增 `reaction_enabled` 可选开关（默认 `false`），用于控制 `ReactToMessage` 是否自动发送 `set_msg_emoji_like` 表情回应。该 PR 直接响应 #3395 的用户请求，若通过审查，将解决"QQ 群每条消息都被自动添加表情"的硬编码问题。
- **Issue #3287 关闭（stale）**：IRC 长消息支持请求在 14 条评论后因长期未推进被自动关闭，暂未进入开发管线。

---

### 4. 社区热点

- **#3287 [Feature] Better support long messages in IRC**（已关闭，stale，14 评论）
  https://github.com/sipeed/picoclaw/issues/3287

  这是近期评论量最高的 Issue。用户的核心诉求是：IRC 协议默认限制 512 字节，超长消息会被客户端自动拆分为多条，而 PicoClaw 目前将其视为多条独立消息，破坏了语义完整性。虽然 Issue 已被 stale bot 关闭，但评论量说明该需求有真实用户基础，建议维护者引导用户重新提交更完整的用例说明。

- **#3395 [Feature] Make OneBot auto-ack reaction configurable**（新开，0 评论）
  https://github.com/sipeed/picoclaw/issues/3395

  用户 @ycsqwan 报告在 OneBot + NapCat（QQ）场景下，每条群消息都会被自动调用 `set_msg_emoji_like`（emoji 289），该行为硬编码在 `OneBotChannel.ReactToMessage` 中无法关闭。Issue 发布数小时内作者即提交了实现 PR（#3396），说明该需求改动清晰、价值明确，值得优先评审。

---

### 5. Bug 与稳定性

按严重程度排序：

1. **高 — DingTalk/Feishu 流式重连 panic 回归（#3382）**
   状态：Open，stale；目前无修复 PR
   https://github.com/sipeed/picoclaw/issues/3382

   报告者称在 v0.3.1（commit `2cf030d2`）上仍可稳定复现 #973 中描述的 "send on closed channel" panic，根因指向上游 `dingtalk-stream-sdk-go` v0.9.1 的重连路径。该问题涉及钉钉和飞书两个渠道，属于生产环境高危崩溃，建议优先分配处理，避免被 stale bot 自动关闭。

2. **中 — 工具反馈动画无限编辑消息（#3353，修复 PR 待审）**
   状态：PR Open，stale
   https://github.com/sipeed/picoclaw/pull/3353

   PR 修复了生命周期清理失败导致工具反馈动画持续编辑频道消息的问题：动画在 5 分钟后强制停止（与 Telegram typing 反馈上限一致），并在首次编辑报错时立即终止。该 PR 自 8 月 31 日创建，已进入 stale 状态，需要维护者安排评审。

3. **低 — IRC 长消息被拆分为多条（#3287）**
   状态：已关闭（stale）
   https://github.com/sipeed/picoclaw/issues/3287

   属于协议层行为问题而非崩溃，但影响 IRC 用户对消息上下文的感知。因长期无进展被关闭，暂无修复计划。

---

### 6. 功能请求与路线图信号

- **OneBot `reaction_enabled` 配置项（#3395 + #3396）**
  https://github.com/sipeed/picoclaw/issues/3395 | https://github.com/sipeed/picoclaw/pull/3396

  用户提出、作者同日提交实现，改动范围小、默认行为为关闭（opt-in），对现有部署影响可控，较大概率进入下一版本（v0.3.2+）。值得注意：若合入，现有用户升级后自动表情回应行为将默认关闭，需在 release notes 中明示。

- **IRC 长消息语义合并（#3287）**
  https://github.com/sipeed/picoclaw/issues/3287

  虽已关闭，但 14 条评论显示其用户需求热度较高。若社区愿意重新提出，可考虑在 IRC 通道层做 512 字节分片重组，或引入消息 ID 关联机制。目前未进入路线图，建议维护者评估后将作为 roadmap 候选。

---

### 7. 用户反馈摘要

- **对硬编码行为的反感（#3395）**：用户明确指出"每条群消息都被加表情回应"是不可控、不可关闭的，属于典型的配置缺失问题。反馈体现了用户对可观测性和控制权的明确期待——bot 不应在未经授权的情况下对用户消息主动产生副作用。
- **对回归问题的失望（#3382）**：用户强调"同一 panic 在 v0.3.1 上仍然可复现"，说明之前针对 #973 的修复并未彻底覆盖重连场景。用户提供了精确的复现时间、环境与 commit 版本，反馈质量高，侧面反映其对该问题长期未解的耐心正在消耗。
- **对消息语义完整性的期待（#3287）**：IRC 协议 512 字节限制导致长消息被客户端切割，PicoClaw 将其视为多条独立消息，用户希望 bot 保持上下文连贯。这表明 IRC 用户对对话连续性和 bot 理解能力有较高要求。

---

### 8. 待处理积压

以下项已进入或即将进入 stale 状态，建议维护者逐项处理，避免有效贡献被自动清理：

- **#3353（PR）**：工具反馈动画修复，创建于 2026-08-31，已 stale。修复内容明确、风险较低，建议安排 review 或给出明确关闭理由。
  https://github.com/sipeed/picoclaw/pull/3353

- **#3382（Issue）**：钉钉/飞书流重连 panic，报告于 2026-09-20，目前仅有 1 条评论且已 stale。该问题直接关系到生产稳定性，建议从 stale 流程中豁免，转入 milestone 或指派负责人。
  https://github.com/sipeed/picoclaw/issues/3382

- **#3287（Issue）**：IRC 长消息支持，已关闭，但拥有 14 条评论的高热度，建议作为路线图候选重新整理为可执行的 spec Issue，避免原始讨论中的有效信息丢失。
  https://github.com/sipeed/picoclaw/issues/3287

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-28

## 1. 今日速览

- 过去 24 小时无新增 Issues、无新版本发布，项目反馈入口保持平静，未见新问题涌入。
- PR 侧非常活跃：共 39 条 PR 更新，其中 **29 条等待合并、10 条已合并/关闭**，说明大量修复已就绪，但合并通道存在一定积压。
- 活跃开发者集中在 2 位（@glifocat、@barnuri），提交内容偏向**安装/更新流程可靠性修复**与**本地/私有模型支持增强**。
- 综合来看，项目正处于**密集修复+能力扩展**的高活跃阶段，核心稳定性问题是当前攻坚重点，整体健康度良好，但需关注合并积压对交付节奏的影响。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

过去 24 小时有 10 条 PR 被合并/关闭（数据源未逐条列出明细），结合 29 条待合并 PR 的内容，项目当前推进方向清晰：

- **安装/更新链路大幅加固**：多条 PR 针对 setup、update 流程中的容器残留、控制器加载失败、网关误检测等问题进行了系统性修复，直接降低用户在安装和升级时的失败率。
- **Agent Runner 行为修正**：避免 agent 之间互相发送失败通知导致的死循环、重复发送回复等边界情况得到修复，提升多 agent 协作的稳定性。
- **本地/私有模型支持增强**：新增对私有 CA、轻量上下文运行模式的支持，为内网部署和小模型场景铺路。
- **新增能力模块**：`/add-lean-tasks` 技能、provider 包装层等新功能已提交，等待合入。

> 注：由于已合并 PR 未逐条列出，以上进展主要基于待合并 PR 推断，实际合并内容可能略有偏差。

## 4. 社区热点

以下 PR 虽评论数据缺失，但均触及安装/更新核心路径，属于用户高频踩坑点，关注度预计最高：

- **[#3878](https://github.com/nanocoai/nanoclaw/pull/3878) — fix(setup): 停止 ping agent 容器后再删除其文件夹** — 解决 setup 后临时容器残留问题，涉及资源泄漏，用户感知明显。
- **[#3919](https://github.com/nanocoai/nanoclaw/pull/3919) — fix(opencode): 在提示符阶段拒绝 Iron Proxy 无法服务的本地模型 URL** — 提前暴露配置错误而非运行期失败，改善安装体验。
- **[#3950](https://github.com/nanocoai/nanoclaw/pull/3950) — feat(iron): 信任操作者的名称受限私有 CA** — 让 `https://models.home.arpa/v1` 等内网模型服务可用，反映私有化部署的诉求。
- **[#3948](https://github.com/nanocoai/nanoclaw/pull/3948) — fix(update): 保持 Iron 代理在切换和残留清理期间运行** — 修复更新后所有 agent spawn 失败的严重回归，直接影响可用性。

**用户诉求共性**：安装/升级过程应“一次成功、不留残余、失败可诊断”；内网/本地模型部署是被明确期待的使用场景。

## 5. Bug 与稳定性

已报告的 Bug 均已有对应 Fix PR，按严重程度排列：

| 严重程度 | 问题描述 | Fix PR |
|---|---|---|
| **严重** | 执行 `/update-nanoclaw` 后 Iron 代理被误停，导致所有 agent spawn 失败 | [#3948](https://github.com/nanocoai/nanoclaw/pull/3948) |
| **高** | 更新控制器在 gateway 抽取后无法加载，更新流程中断 | [#3913](https://github.com/nanocoai/nanoclaw/pull/3913) |
| **高** | setup 清理时临时 agent 容器未停止即删除文件夹，产生僵尸容器 | [#3878](https://github.com/nanocoai/nanoclaw/pull/3878) |
| **中** | 删除 session 或 agent group 后容器仍运行，直到下次重启才清理 | [#3947](https://github.com/nanocoai/nanoclaw/pull/3947) |
| **中** | 卸载/重装后 Iron Control 数据库残留，重装非干净状态 | [#3883](https://github.com/nanocoai/nanoclaw/pull/3883) |
| **中** | Mattermost 运行时验证因缺少 `MATTERMOST_CALLBACK_SECRET` 而失败 | [#3949](https://github.com/nanocoai/nanoclaw/pull/3949) |
| **中** | pnpm 输出含警告时，更新流程误报“未检测到已安装网关” | [#3910](https://github.com/nanocoai/nanoclaw/pull/3910) |
| **低** | skill 步骤失败时只显示通用错误，掩盖真实原因 | [#3946](https://github.com/nanocoai/nanoclaw/pull/3946) |
| **低** | OpenCode 端点未验证时无日志输出，排障困难 | [#3905](https://github.com/nanocoai/nanoclaw/pull/3905) |

另有两条稳定性测试修复：**[#3887](https://github.com/nanocoai/nanoclaw/pull/3887)** 修复 CI 负载下重启就绪探测超时误报；**[#3945](https://github.com/nanocoai/nanoclaw/pull/3945)** 减少 drain 测试 seed 量避免磁盘争用超时。

## 6. 功能请求与路线图信号

- **私有/内网环境支持是明确方向**：[#3950](https://github.com/nanocoai/nanoclaw/pull/3950) 允许 Iron 信任自有 CA；[#3919](https://github.com/nanocoai/nanoclaw/pull/3919) 改进本地模型 URL 校验。可见项目正着力打通“本地模型服务器”的完整链路。
- **低成本/轻量运行模式**：[#3931](https://github.com/nanocoai/nanoclaw/pull/3931) 为 Claude provider 增加 `minimalContext` 选项；配套技能 **[#3932](https://github.com/nanocoai/nanoclaw/pull/3932)** 提供 `/add-lean-tasks`，让定时任务可在小模型上低成本运行。这组 PR 可能进入下一版本。
- **Provider 可扩展性**：[#3925](https://github.com/nanocoai/nanoclaw/pull/3925) 引入 provider 包装层，允许按查询切换模型、重试失败请求，为多模型 fallback 等高级能力铺路；[#3930](https://github.com/nanocoai/nanoclaw/pull/3930) 统一 OpenCode 的环境解析来源，属于基础一致性修复。

## 7. 用户反馈摘要

过去 24 小时无新增 Issues/评论，因此无直接用户反馈可供提炼。从 PR 摘要反推，以下场景是用户真实痛点：

- **安装与升级的“最后一公里”**：容器残留、代理中断、配置检测误判等问题，说明用户在 setup/update 过程中仍会遇到不少异常。
- **内网模型部署**：私有 CA 和本地 URL 相关 PR 表明用户希望在 NAT/内网环境下使用自有模型服务。
- **低配硬件运行**：lean-tasks 和 minimalContext 的出现暗示部分用户尝试用小模型/低内存环境运行 NanoClaw，现有全量上下文模式可能过重。

## 8. 待处理积压

当前 **29 条 PR 等待合并**，以下为创建时间较早、等待较久的 PR，建议维护者优先审阅：

- [#3878](https://github.com/nanocoai/nanoclaw/pull/3878) — 创建于 09-23，setup 容器清理修复
- [#3883](https://github.com/nanocoai/nanoclaw/pull/3883) — 创建于 09-24，Iron Control 数据库残留修复
- [#3887](https://github.com/nanocoai/nanoclaw/pull/3887) — 创建于 09-24，重启探测超时与测试 flake 修复
- [#3905](https://github.com/nanocoai/nanoclaw/pull/3905) — 创建于 09-25，setup 日志完善
- [#3908](https://github.com/nanocoai/nanoclaw/pull/3908) — 创建于 09-25，agent 失败通知死循环修复

**观察**：9月23~27日的修复型 PR 仍未合并，可能形成积压。若其中包含阻塞性问题（尤其 [#3948](https://github.com/nanocoai/nanoclaw/pull/3948) 的更新后全量失败问题），建议尽快安排合并与发布。

---

*本日报基于 2026-09-28 获取的 GitHub 数据生成，链接均指向原始 PR。由于数据源未提供评论数/点赞数，社区热点部分基于内容重要性主观判断，仅供参考。*

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报 — 2026-09-28

> 数据窗口：2026-09-27 ~ 2026-09-28 | 数据来源：github.com/nearai/ironclaw


## 1. 今日速览

过去 24 小时 IronClaw 项目处于**温和的维护活跃期**：无新版本发布，功能开发动作较少；Issue 侧仅有 1 条新功能提案（#8113）提交，尚无社区讨论；PR 侧保持 6 条动态，其中 5 条为自动依赖更新（dependabot），1 条为 CI 知识图谱刷新。值得关注的是 #8113 提案提出“turn-0 工具预选”机制，为 AI Agent 工具编排带来了新的优化思路，但尚处概念阶段，距实现落地仍有距离。整体来看，项目以依赖健康度维护和基础设施建设为主要节奏。

- **Issue 更新**：1 条（新开 1，关闭 0）
- **PR 更新**：6 条（合并/关闭 1，待合并 5）
- **新版本发布**：0 个


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日仅 1 条 PR 被关闭（合并）：

- ##### [#8104 [CLOSED] chore(deps): bump the everything-else group with 29 updates](https://github.com/nearai/ironclaw/pull/8104)
  - **作者**：@dependabot[bot]
  - **内容**：批量升级 29 个 Rust 依赖（含 `uuid` 1.24.0 → 1.26.1、`base64` 0.22.1 → 0.23.1、`rust_decimal` 等）。
  - **意义**：完成一轮例行依赖维护，保持生态兼容与安全补丁同步。该 PR 自 2026-09-20 创建，经历约一周的 CI 验证后合并，流程正常。

除合并的依赖更新外，今日没有面向用户的功能性 PR 被合并。项目当前的工作重心集中在依赖健康度管理和自动化基础设施维护上，属于典型“稳步维护期”，没有显著的功能里程碑推进。

**另需注意**：来自 @ironclaw-ci[bot] 的 PR [#7988](https://github.com/nearai/ironclaw/pull/7988)（刷新代码库知识图谱）今日被更新，由 nightly 自动化工作流生成，仍在等待人工审查，属于基础设施持续维护的一部分。


## 4. 社区热点

今日社区讨论活跃度较低，唯一值得关注的是新提交的功能提案：

- ##### [#8113 [OPEN] Proposal: opt-in turn-0 tool selection (BM25F + embeddings)](https://github.com/nearai/ironclaw/issues/8113)
  - **作者**：@CjS77 | **创建时间**：2026-09-27
  - **评论**：0 | **👍**：0
  - **提案核心**：在对话启动时（turn-0），利用首条用户消息通过混合 BM25F + embedding 评分预测工具需求，仅广播预测的工具，外加四个固定的发现桥（`tool_search`、`tool_describe`、`tool_call`、`result_read`），从而减少工具集规模，降低模型处理负担。

虽然该 Issue 目前没有评论和点赞，但其设计思想直指 AI Agent 工具编排的核心痛点——工具数量膨胀导致的上下文开销和选择准确性问题。若实现，将显著提升多工具场景下的 Agent 响应效率。后续社区讨论值得关注。


## 5. Bug 与稳定性

今日**无**新报告的 Bug、崩溃或回归问题。

所有活跃 PR 均为依赖升级，其中部分升级可能隐含稳定性修正（如 `tower-http`、`tokio-tungstenite`、`wasmtime` 等），但未见明确的 bugfix 关联说明。


## 6. 功能请求与路线图信号

本期出现 1 项明确的功能提案：

- ##### [#8113 Proposal: opt-in turn-0 tool selection (BM25F + embeddings)](https://github.com/nearai/ironclaw/issues/8113)
  该提案围绕“对话首轮工具预选”展开，属于 Agent 工具编排（tool orchestration）能力的优化方向。结合项目已有的 `tool_search` / `tool_describe` / `tool_call` / `result_read` 四个固定发现桥设计，该提案试图在不破坏现有发现机制的前提下引入一个可选的预测层。这是一个有潜力的路线图信号，可能会被纳入后续版本规划（尤其是涉及工具路由与延迟优化的版本）。

**判断**：该提案目前属于早期讨论（0 评论），尚未进入开发阶段。短期路线图仍以依赖维护与稳定性为主。


## 7. 用户反馈摘要

本期公开数据中缺乏实质性用户评论。唯一新 Issue #8113 的提案者 @CjS77 可视为资深用户/贡献者，其诉求核心是：

- **痛点**：工具数量过多时，模型在 turn-0 需要处理的候选集过大，影响首轮响应的效率与准确性；
- **期望方案**：通过混合检索（BM25F + embeddings）做工具预选，以轻量级预测替代全量枚举；
- **设计取向**：保持可选的 opt-in 机制，避免对现有工具发现流程造成破坏。

除此之外，没有其他可提取的用户满意度/不满意信号。整体来说，社区处于平静期，公开反馈有限。


## 8. 待处理积压

以下 PR 长期未合并，建议维护者关注：

| PR | 主题 | 创建日期 | 等待时长 | 风险/规模 |
|----|------|----------|----------|-----------|
| [#7834](https://github.com/nearai/ironclaw/pull/7834) | chore(deps): bump the wasm group (4 updates) | 2026-08-23 | **36 天** | size: L, risk: medium |
| [#7988](https://github.com/nearai/ironclaw/pull/7988) | chore(agents): refresh codebase knowledge graph | 2026-08-29 | 30 天 | size: XS, risk: low |
| [#8078](https://github.com/nearai/ironclaw/pull/8078) | chore(deps): bump the tokio-ecosystem group (2 updates) | 2026-09-06 | 22 天 | dependencies, rust |
| [#8103](https://github.com/nearai/ironclaw/pull/8103) | chore(deps): bump the actions group (8 updates) | 2026-09-20 | 8 天 | dependencies, github_actions |
| [#8114](https://github.com/nearai/ironclaw/pull/8114) | chore(deps): bump the everything-else group (31 updates) | 2026-09-27 | 1 天 | size: XL, risk: low |

**重点关注**：

1. **#7834**（wasm 组依赖升级）：已积压 36 天，涉及 `wasmtime` / `wasmtime-wasi` 等核心 WebAssembly 运行时组件，标注为“size: L, risk: medium”，这可能是长期未合并的原因——需要更谨慎的回归测试。建议维护团队评估是否可以拆分或加速审查。
2. **#7988**（知识图谱刷新）：由 CI 机器人自动生成，等待 30 天。该类 PR 通常只是数据快照更新，风险极低（XS），长期积压会削弱自动化流程的时效性，建议简化 review 流程。

**总结**：项目当前健康度良好，无重大 bug 或安全事件，依赖维护节奏稳定。主要风险在于部分低风险 PR 积压时间偏长，建议优化审查队列；同时 #8113 提案为后续功能迭代提供了新方向，值得持续关注社区反馈。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-28

> 分析范围：2026-09-26 至 2026-09-27 GitHub 数据 | 数据源: [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. 今日速览

过去 24 小时项目共产生 13 条 GitHub 更新（5 条 Issues、8 条 PRs），但需注意其中 12 条为历史条目的 stale 状态变更，非当日的真实新增讨论。真正的开发活动集中在两个新 PR：修复 Vite dev 热更新失效的 `#2769`，以及合并了横跨 7 个代码域的大功能「Word 文档编辑」 `#2770`。安全方向的修复（如 SSRF 和任意文件读取漏洞）在 PR 层面已有关闭记录，但对应关联 Issue `#1041` 仍以 CLOSED 状态归档，表明相关修复已落地。整体判断：项目处于腰部活跃状态，核心开发者仍在持续投入，但外部社区参与度一般、讨论偏冷。

---

## 3. 项目进展

### 已合并/关闭的 PR（共 7 条）
近期真正产生代码变更的合并集中在以下两条（其余为历史 stale 条目的关闭操作）：

- **[#2770](https://github.com/netease-youdao/LobsterAI/pull/2770) — `feat: Word 文档编辑功能`（已合并）**
  这是本次统计周期内体量最大的一个 PR，涉及 `renderer`、`main`、`build`、`docs`、`openclaw`、`skills`、`artifacts` 等 7 个代码区域。功能上为聊天产物（artifacts）引入了 Word 文档的编辑/生成能力，是渲染层与主进程能力的一次系统性扩展，对提升产物编辑的工作流完整性具有实质推进意义。

- **[#2769](https://github.com/netease-youdao/LobsterAI/pull/2769) — `fix(dev): 修复 Vite watch 忽略渲染层 artifacts 源码的问题`（已合并）**
  修复了一个开发体验回归问题：仓库根目录的 `artifacts/` 排除规则误伤 `src/renderer/components/artifacts/`，导致 electron:dev 模式下 artifact 面板、渲染器及 Markdown 编辑器无法热更新。该修复通过锚定仓库根目录的绝对路径排除规则解决，属于提效型修复。

### 其他关闭的 PR（stale 清理）
- [#1042](https://github.com/netease-youdao/LobsterAI/pull/1042)（安全修复，关联 #1041）、[#1038](https://github.com/netease-youdao/LobsterAI/pull/1038)（流式响应 reader 释放）、[#1045](https://github.com/netease-youdao/LobsterAI/pull/1045)（Agent 切换未保存提示）、[#1044](https://github.com/netease-youdao/LobsterAI/pull/1044)（Windows 安装路径处理）均为 3 月的 PR，本次以 staleness 标记关闭。其中 #1042 与 #1038 对应修复在 3 月已合入主干。

---

## 4. 社区热点

由于所有现有 Issue/PR 均被标记为 `[stale]`，且评论数仅为 1-2 条，当前社区讨论热度整体偏低。相对最受关注的是**安全类议题**：

- **[#1041](https://github.com/netease-youdao/LobsterAI/issues/1041)（CLOSED）— `api:fetch/stream IPC 可被用于 SSRF 攻击，readFileAsDataUrl 可读取任意本地文件`**
  2 条评论。该议题详细披露了主进程 IPC 的 URL 校验缺失、任意本地文件读取漏洞，并给出了具体代码定位和攻击路径。属于 P0 安全漏洞，已有对应修复 PR #1042 合入。

- **[#977](https://github.com/netease-youdao/LobsterAI/issues/977)（OPEN）— `代码中 URL 缺少安全检查`**
  1 条评论。同样指出 `handleDeepLink` 函数中 deep link URL 校验不严，可能引发认证流程干扰或敏感信息泄露，与 #1041 的安全诉求一脉相承。

- **[#976](https://github.com/netease-youdao/LobsterAI/issues/976)（OPEN）— `断网情况下问答提示有两个 timeout`**
  2 条评论。属于异常场景交互体验问题，用户对断网时的提示混乱表示不满，反映了对弱网/离线场景的体验打磨需求。

> 💡 **分析**：社区当前最主要的呼声集中在**安全加固**（IPC 输入校验、deep link 来源验证）和**异常场景体验**（离线提示、配置灵活性），这两类诉求在未来版本中值得优先响应。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | 议题 | 状态 | 关联修复 |
|---------|------|------|---------|
| 🔴 P0 — 任意文件读取 / SSRF | [#1041](https://github.com/netease-youdao/LobsterAI/issues/1041) | CLOSED（stale） | PR [#1042](https://github.com/netease-youdao/LobsterAI/pull/1042) 已合入 |
| 🟠 P1 — Deep Link 安全校验缺失 | [#977](https://github.com/netease-youdao/LobsterAI/issues/977) | OPEN | 暂无对应 PR |
| 🟡 P2 — 流式响应 reader 泄漏 | PR [#1038](https://github.com/netease-youdao/LobsterAI/pull/1038) | 已合并 | 修复后仍建议回归测试 |
| 🟡 P2 — 离线场景双重 timeout 提示 | [#976](https://github.com/netease-youdao/LobsterAI/issues/976) | OPEN | 暂无对应 PR |
| 🟢 P3 — Agent 技能清除后切换重新出现 | [#1047](https://github.com/netease-youdao/LobsterAI/issues/1047) | CLOSED（stale） | 需确认是否已修复 |
| 🟢 P3 — 上下文窗口被限制为 200K 而非模型原生的 1M | [#1046](https://github.com/netease-youdao/LobsterAI/issues/1046) | CLOSED（stale） | 属文档/配置需求，非缺陷 |

需要警惕的是：多数问题在 3 月即被提出，本次批量关闭不代表问题已全部解决——`#977` 至今无对应修复 PR，仍应被视为活跃风险点。建议维护者对 `#977` 进行复核。

---

## 6. 功能请求与路线图信号

从 Issue 与 PR 交叉分析，以下方向可能被纳入下一版本：

- **💬 聊天会话文件夹分组** — PR [#978](https://github.com/netease-youdao/LobsterAI/pull/978)（`Feature/add chat folder`，仍 OPEN）
  该 PR 为侧边栏任务（会话）提供自定义文件夹分类能力，涉及 SQLite 迁移和 12 个文件改动，已完成主体实现。属于长期挂起的功能型 PR，若补测通过，预计是下一版本候选功能。

- **📝 Word 文档编辑能力** — PR [#2770](https://github.com/netease-youdao/LobsterAI/pull/2770)（已合并）
  已进入主干，后续版本将直接可用。

- **⚙️ 模型上下文窗口可配置化** — Issue [#1046](https://github.com/netease-youdao/LobsterAI/issues/1046)
  用户明确询问能否将上下文窗口从 200K 提升至 Qwen3.5-Plus 官方支持的 1M，属于配置灵活性的产品诉求。虽然该 issue 被 stale 关闭，但说明用户对模型参数开放度有期待，可作为「自定义 provider 参数」需求的路线图参考。

- **🛡️ Deep Link 安全加固** — Issue [#977](https://github.com/netease-youdao/LobsterAI/issues/977)
  安全类改进建议，考虑到 #1042 已合入同类修复，该方向具备延续性，建议在后续安全版本中覆盖。

---

## 7. 用户反馈摘要

- **离线体验痛点（#976）**：用户反映断网时问答会出现两个 timeout 提示，交互不符合异常场景规范，体验不友好。说明弱网/离线场景的容错设计仍有优化空间。
- **配置透明度诉求（#1046）**：用户对官方文档未说明上下文窗口为何被限制在 200K（而非 1M）、能否自定义、平台侧是否有配置选项表示困惑。这类「参数透明度」问题直接影响专业用户的信任感。
- **状态一致性困惑（#1047）**：用户报告清除技能后切换 Agent 再切回，技能重新出现，反映出状态管理存在不一致，容易让用户产生「删除未生效」的误判。
- **安全敏感度提升（#977、#1041）**：多位用户自主挖掘并上报安全漏洞，说明社区中已有具备安全背景的核心用户群体，对输入校验、链接合法性等安全设计足够敏感。

---

## 8. 待处理积压

以下为长期未得到有效响应、需要维护者关注的事项：

| 事项 | 类型 | 创建时间 | 当前状态 | 建议动作 |
|------|------|---------|---------|---------|
| [#978](https://github.com/netease-youdao/LobsterAI/pull/978) — 聊天文件夹功能 | PR | 2026-03-27 | OPEN（stale） | 距离提交已 6 个月，功能完成度较高，建议安排 review 或明确回绝/接管 |
| [#977](https://github.com/netease-youdao/LobsterAI/issues/977) — Deep Link 安全检查缺失 | Issue | 2026-03-27 | OPEN（stale） | 安全相关问题，建议不要 stale 关闭，应排期修复或给出安全说明 |
| [#976](https://github.com/netease-youdao/LobsterAI/issues/976) — 断网双重 timeout 提示 | Issue | 2026-03-27 | OPEN（stale） | 属于体验优化，建议标记 `good first issue` 或纳入 UI 优化批次 |

---

*本报告由数据分析生成，所有结论均基于 GitHub 公开数据，供项目维护者与社区成员参考。*

:::

:::details{title="TinyClaw" repo="TinyAGI/tinyclaw"}

过去24小时无活动。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 · 2026-09-28

> 数据来源：CoPaw GitHub（agentscope-ai/QwenPaw）

---

## 1. 今日速览

过去 24 小时内 CoPaw 社区活跃度较高：共产生 7 条 Issue 动态（5 条新开/活跃、2 条关闭）与 4 条待合并 PR；无新版本发布。用户反馈集中于桌面端体验（双开导致后端终止、UI 字体不可调、上下文压缩触发机制不理解）与 WebUI 编辑能力缺失，其中上下文压缩与状态更新问题由同一用户连续提交两个 Issue 并均被标记为 "Close-and-review-later"，需关注其后续处理结果。值得肯定的是，#7995 文件面板刷新 Bug 已快速获得对应修复 PR #7996，社区「报 Bug → 提修复」的闭环效率良好。整体来看，项目正处于功能需求集中爆发期，维护者响应速度正常，但长周期 PR #6874 的积压需引起注意。

---

## 2. 版本发布

**无**（过去 24 小时无新 Release）。

---

## 3. 项目进展

今日 **无 PR 被合并或关闭**，但队列中有 4 个待合并 PR，均处于活跃状态或审查中。具体进展如下：

| PR | 标题 | 状态 | 影响范围 |
|---|---|---|---|
| [#8001](https://github.com/agentscope-ai/QwenPaw/pull/8001) | fix(runtime): keep timeout tool results recoverable | OPEN | 运行时稳定性 |
| [#7996](https://github.com/agentscope-ai/QwenPaw/pull/7996) | fix(console): refresh expanded folders in Files panel | OPEN | 前端文件面板 |
| [#7956](https://github.com/agentscope-ai/QwenPaw/pull/7956) | feat(console): unify settings UX and smooth conversation transitions | OPEN | 设置界面与对话切换体验 |
| [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) | feat(mcp): add configurable tool call timeout | OPEN（Under Review） | MCP 工具调用超时 |

**分析**：
- #8001 修复工具执行超时后父模型无法拿到结果的问题，将超时说明作为成功结果返回（对应 Issue #7981），属于运行时稳定性的重要补丁。
- #7996 是针对今日提交的 #7995 的定向修复，已做到「新 Bug 提交当天产生针对 PR」，维护链路畅通。
- #7956 从设计规范层面统一设置页 UX，并修复工作区选择器溢出与欢迎页闪烁问题，属于体验打磨型改动，预计可显著改善桌面端设置界面一致性。
- #6874 已开放 49 天且仍处于 "Under Review"，该项为 MCP 工具调用超时配置，是 #8001 的上层配套能力，建议维护者加速审阅。

**项目整体状态**：虽有 PR 积压，但无阻塞性回归；Bug 修复与功能开发并行推进，健康度良好。

---

## 4. 社区热点

| 议题 | 类型 | 评论数 | 热度分析 |
|---|---|---|---|
| [#7957](https://github.com/agentscope-ai/QwenPaw/issues/7957) | 功能需求 | 3 | 最高评论数，用户希望手动停用/禁用预制模型和频道，提及「强迫症」类心理诉求，反映部分用户对界面信息密度敏感 |
| [#8000](https://github.com/agentscope-ai/QwenPaw/issues/8000) | Bug | 1 | Windows 双开导致第一个实例后端被终止，直击桌面端基础稳定性痛点 |
| [#7994](https://github.com/agentscope-ai/QwenPaw/issues/7994) | Bug | 1 | 上下文显示圈不随对话切换更新、压缩阈值形同虚设，用户连续提交两个 Issue 说明对上下文管理的强烈困惑 |

**核心诉求分析**：
1. **上下文压缩机制透明化**：#7994 与 #7998 均来自同一用户（@xiaohushi512），核心质疑是「Agent 自动提交时为何不触发压缩，仅人工提交才触发」，且设置压缩阈值 0.5 却 91.7K/131.1K 仍拒绝压缩。这不仅是 Bug，更反映上下文管理逻辑与用户预期的落差——用户期待工具按阈值自动压缩，而非依赖人工操作。
2. **桌面端多实例防御**：#8000 指出 Windows 平台缺少单实例守护，属桌面应用常见但致命的问题。
3. **界面可控性需求**：#7957 的「禁用不使用的功能」与 #7999 的「字体大小可调」本质一致：用户希望桌面端 UI 提供更多个性化控制权。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue | 描述 | 修复状态 |
|---|---|---|---|
| 🔴 高 | [#8000](https://github.com/agentscope-ai/QwenPaw/issues/8000) | Windows 桌面版双开：第二个窗口导致第一个实例的 live backend 被终止。官方构建版本 2.2.1 受影响。可能伴随数据丢失或任务中断风险 | ⚠️ 无 |
| 🟡 中 | [#7994](https://github.com/agentscope-ai/QwenPaw/issues/7994) | 上下文显示状态不及时更新（切换对话后仍显示旧数据，需重启）；且压缩阈值 0.5 形同虚设，91.7K/131.1K 点击压缩被拒 | ✅ 已关闭（Close-and-review-later），未见对应 fix PR |
| 🟡 中 | [#7998](https://github.com/agentscope-ai/QwenPaw/issues/7998) | 上下文压缩仅在人工提交对话时触发，Agent 自动提交超阈值不压缩（2.2.3b） | ✅ 已关闭（question 类） |
| 🟢 低 | [#7995](https://github.com/agentscope-ai/QwenPaw/issues/7995) | 文件面板刷新按钮不更新已展开的文件夹（Agent 新增文件后需整个页面刷新才可见） | ✅ 已修复（PR #7996 待合并） |

**观察**：
- #8000 是今日最严重问题，涉及桌面应用多实例防御，建议在下一版本加入单实例锁（如 mutex 或命名管道检测）。
- 两个与上下文压缩相关的 Issue 已被维护者标记后关闭，但从公开信息无法确认是否已在内部排期解决。建议维护者回复明确的处理路径。
- 今日无崩溃类/数据丢失类 Bug 报告，整体稳定性可控。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 与现有 PR 的关联判断 |
|---|---|---|
| 手动停用/禁用预制模型和频道 | [#7957](https://github.com/agentscope-ai/QwenPaw/issues/7957) | 当前无对应 PR，独立功能需求，可能需设置层架构调整。可结合 #7956 的「统一设置 UX」一并设计 |
| 桌面端 UI 字体大小可调 | [#7999](https://github.com/agentscope-ai/QwenPaw/issues/7999) | 无直接 PR，但 #7956（统一设置 UX）提供了可挂载的「可复用控件」基础，实现门槛较低（原 Issue 建议标记为 `good first issue`） |
| WebUI 消息撤回/编辑 + 工作区回滚 | [#7997](https://github.com/agentscope-ai/QwenPaw/issues/7997) | 无直接 PR，属于 WebUI 交互层的较大功能，涉及会话历史截断与文件快照回滚，预计工作量较大 |
| MCP 工具调用超时可配置 | [PR #6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) | 已实现，等待合并。增加 `tool_call_timeout` 参数（默认 300s），并提高 HTTP/SSE 读取预算以支持超长超时 |
| 超时工具结果可恢复 | [PR #8001](https://github.com/agentscope-ai/QwenPaw/pull/8001) | 已实现，等待合并。将超时说明作为成功结果返回，避免中断 Agent 推理链 |

**路线图信号**：今日需求普遍集中在「桌面端个性化」与「上下文管理透明化」两大方向。结合 PR #7956 和 #6874，下一版本有望在设置体验和 Agent 运行时控制方面有显著提升。建议维护者考虑将 #7957 / #7999 合并进 Console UX 统一重构的范畴。

---

## 7. 用户反馈摘要

| 用户 | 痛点/场景 | 诉求实质 |
|---|---|---|
| @xiaohushi512 | 2.2.3b 桌面版上下文显示不更新（重启才恢复）；Agent 提交约 200 次请求几乎全程打满 131k 上下文，但压缩从未自动触发，手动点击压缩也被拒 | 期望 Agent 自动提交过程中，一旦超过阈值比例（如 0.5），在下一次提交前自动压缩；同时上下文状态指示器需实时切换 |
| @hehaidong1222 | Windows 桌面版双开，第二个窗口出现后第一个实例后端被终止 | 期望单实例守护，双开时提示「已存在实例」并聚焦已有窗口 |
| @hjfb42241-hub | 默认字体过小；视力较弱、高 DPI 显示器、投屏至大屏场景难以阅读 | 期望字体大小多档位或连续调整（小/默认/大/特大） |
| @dylanleesky | 预制模型和频道数量多且无法隐藏，视觉杂乱感强 | 期望可手动停用/禁用，降低干扰（提及强迫症人群） |
| @ysf7762-dev | WebUI 中已发送消息无法编辑或撤回，导致错误消息污染后续对话 | 期望编辑/撤回后自动截断对话历史，并可选回滚工作区文件快照 |
| @iluv7 | Agent 在磁盘新建了文件，但文件面板刷新按钮不更新已展开文件夹，需整个页面刷新 | 期望刷新按钮重新拉取该工作区所有展开目录，并在刷新期间避免旧请求覆盖新结果 |

**整体情感倾向**：中性偏正向。用户愿意详细描述场景和版本信息（部分附带截图与配置细节），说明对 CoPaw 有较高投入度。吐槽集中在「上下文管理黑盒」和「桌面端交互细节」，无对项目方向的质疑。

---

## 8. 待处理积压

需维护者重点关注的长期未响应/未关闭项：

| 类别 | 编号 | 标题 | 静默时长 | 备注 |
|---|---|---|---|---|
| PR | [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) | feat(mcp): add configurable tool call timeout | 49 天（2026-08-10 创建，仍在 Under Review） | 长时间无 reviewer 回复；该功能与 #8001 配套，阻塞 MCP 超时配置能力。建议明确责任人并给出审阅计划 |
| Issue | [#7957](https://github.com/agentscope-ai/QwenPaw/issues/7957) | Feature: 手动停用/禁用预制模型和频道 | 4 天（2026-09-23 创建，仍 OPEN） | 已有 3 条评论，但无维护者表态或标签更新。属于低成本高满意度的 UI 控制项，可考虑快速回应 |
| Issue | [#7994](https://github.com/agentscope-ai/QwenPaw/issues/7994) | Bug: 上下文显示状态信息不及时更新和不压缩 | 已关闭，但标记为 Close-and-review-later | 与 #7998 同源，当前状态存疑：若修复已排期，建议关联 Issue/PR 便于追踪；若驳回，需说明理由 |
| Issue | [#7998](https://github.com/agentscope-ai/QwenPaw/issues/7998) | Question: 上下文什么时候触发压缩？ | 同上 | 用户已明确表达对压缩机制的困惑，该回答可沉淀为 FAQ 或文档文档中的「上下文管理」章节 |

**维护者行动建议**：
1. 优先为 #6874 安排 reviewer，避免 PR 长期搁置导致的代码冲突风险。
2. 对 #7957 至少回复「业务决策层」结论（是/否/延后），缓解用户等待焦虑。
3. 考虑将 #7994/#7998 的压缩行为梳理成一份说明文档，并附上当前设计逻辑与预计改进版本，内置到桌面应用设置页中可大幅降低此类提问。

---

> **一句话总结**：CoPaw 今日社区动态以「桌面端体验」为主战场——Bug（双开、上下文显示）与功能请求（字体、隐藏功能）齐飞，MCP 超时配置 PR 的长期积压是当前最明确的流程风险。建议维护者以「上下文压缩机制透明化」作为近期用户沟通与产品优化重点。

:::

:::details{title="ZeptoClaw" repo="qhkm/zeptoclaw"}

过去24小时无活动。

:::

:::details{title="EasyClaw" repo="gaoyangz77/easyclaw"}

# EasyClaw 项目动态日报

**日期**: 2026-09-28  
**数据来源**: [github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)  
**统计周期**: 过去 24 小时

---

## 1. 今日速览

EasyClaw 今日进入**维护性发布节奏**：过去 24 小时无新 Issue、无新 PR，社区讨论处于静默状态，但项目发布了 **v1.9.24** 补丁版本。本次发布聚焦两个具体修复：一是将 SPS 分析功能限定到受支持的店铺并修正店铺选择范围，二是修复长页面底部留白不足问题。整体来看，项目当前活跃度偏低（Issue/PR 均为 0），但版本迭代节奏未中断，属于**稳定性维护期**。仓库健康度良好，无明显社区积压或未响应问题。

---

## 2. 版本发布

### [v1.9.24 - TK Copilot v1.9.24](https://github.com/gaoyangz77/easyclaw/releases)

**发布时间**: 2026-09-28（统计周期内）

#### 更新内容

| 类型 | 变更项 | 说明 |
|------|--------|------|
| 🎯 功能修正 | SPS 分析仅展示支持的店铺 | 此前分析视图会列出所有店铺，现仅展示受支持的店铺；店铺选择范围同步限定在分析视图内 |
| 🎨 UI 修复 | 长页面底部留白 | 修复长内容页面在桌面窗口底部被截断或贴底问题，保留适当留白间距 |

#### 破坏性变更

**无破坏性变更**。本次为纯修复型发布，API、数据结构、配置格式均未改变。

#### 迁移注意事项

- **SPS 功能用户**：升级后，分析页面的店铺列表将收窄至"受支持的店铺"。如果你的店铺不在列表中，说明该店铺不在当前 SPS 分析支持范围内，请检查店铺平台/地区是否满足要求。
- **桌面端用户**：长页面底部间距会自动修复，无需手动调整。
- **升级路径**：常规安装包替换即可，配置和数据不受影响。

---

## 3. 项目进展

今日**无合并或关闭的 PR**（统计周期内 PR 更新为 0），项目核心进展体现为 v1.9.24 版本的发布。

从版本内容判断，项目当前处于**修复累积后的集中发布阶段**。v1.9.24 中的两项变更（SPS 店铺支持范围修正、页面底部布局优化）说明项目在持续打磨 UI 细节和功能边界，整体方向是**增强稳定性与使用体验**，而非扩张新功能。

---

## 4. 社区热点

**今日无**活跃的 Issues 或 PRs 讨论（新开/活跃 0 条，已关闭 0 条）。

未观测到社区热点事件或高互动讨论。该状态可能源于：
- 项目处于功能稳定期，用户诉求已在前序版本中消化；
- 或维护者刚完成版本发布，社区处于观察窗口期。

---

## 5. Bug 与稳定性

今日无新增 Bug 报告。v1.9.24 本身修复了两个既有问题：

| 严重程度 | 问题描述 | 状态 | 对应修复 |
|----------|----------|------|----------|
| 🟡 中等 | SPS 分析页面展示不被支持的店铺，导致数据统计范围与预期不符 | ✅ 已修复 | [v1.9.24](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.24) |
| 🟢 轻微 | 长页面底部内容被桌面窗口裁切或紧贴底部，影响可读性 | ✅ 已修复 | [v1.9.24](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.24) |

无崩溃、数据丢失、安全漏洞等严重问题报告。

---

## 6. 功能请求与路线图信号

今日**无新功能请求**。

从 v1.9.24 的变更可以解读出两个方向性信号：
- **SPS 分析功能正在收敛边界**：明确"支持的店铺"范围是功能走向成熟的前置动作，后续可能拓展更多店铺类型；
- **UI 细节持续打磨**：底部留白这类细节修复表明维护者重视桌面端使用体验，未来可能在桌面端布局交互上有更多优化。

结合仓库历史 PR 趋势，下一版本大概率仍是**小步快跑的修复迭代**，暂未观测到重大功能重构信号。

---

## 7. 用户反馈摘要

因今日无新增 Issue/PR 评论，无法提取实时用户声音。基于 v1.9.24 的发布内容做合理推断：

- **预期反馈**：使用 SPS 分析的用户可能曾困惑于店铺列表完整性，本次修复预计会收到"数据范围更准确"的正面评价；
- **潜在关注**：部分用户可能关心"我的店铺为什么不在支持列表"，这需要维护者在后续文档中明确支持范围矩阵。

> 注：本部分为基于发布内容的逻辑推断，非直接用户评论。

---

## 8. 待处理积压

**当前无长期未响应的 Issue 或 PR。**

仓库积压状态健康：
- 未关闭的 Issue / PR：0 条（今日更新数据）
- 待合并 PR：0 条

维护者响应及时，社区无历史包袱。

---

## 总结

| 维度 | 状态 | 评价 |
|------|------|------|
| 活跃度 | ⬇️ 低 | 24h 零 Issue/PR，符合维护期特征 |
| 发布节奏 | ✅ 正常 | v1.9.24 如期发布，修复内容明确 |
| 社区健康度 | ✅ 良好 | 零积压、零未响应 |
| 稳定性 | ✅ 稳定 | 无严重 Bug，2 项修复已验证发布 |

**项目评级**: 🟢 **健康稳定**。建议关注下一个迭代是否引入新功能请求，以判断项目是否从维护期转入功能拓展期。

---
*本报告由 AI 分析师自动生成，数据截至 2026-09-28 23:59 UTC。*

:::
