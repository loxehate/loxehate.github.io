---
title: "OpenClaw 生态日报"
published: 2026-09-17
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-17

> Issues: 121 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-17 02:26 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-17

## 1. 今日速览

过去 24 小时项目活跃度极高：共 121 条 Issue 更新（新开/活跃 96 条，关闭 25 条），500 条 PR 更新（已合并/关闭 209 条），无新版本发布。当前的主要矛盾集中在 **P0 级稳定性问题**——Windows 更新通道连续出现多起失败（#150386 等）、Gateway 在 632-agent 规模下事件循环饥饿（#149538）、以及升级 2026.7.x → 2026.9.4 后需要一天手动修复（#150452）。与此同时，修复 PR 的产出和合并速度同样很快，多个 P0/P1 问题已在今日关闭。**健康度评估：活跃但偏脆弱，生产环境大规模部署和 Windows 平台是当前最明显的短板。**

## 2. 版本发布

今日无新版本发布，最新版本仍为 2026.9.4。但近日大量更新失败报告（#150386、#150378、#150369、#150366、#150332）表明 **2026.9.3 → 2026.9.4 的更新通道存在系统性问题**，涉及 Windows 路径处理、SQLite schema 预检、npm 安装模式识别等多个环节，建议维护者优先排查。

## 3. 项目进展

今日共 209 条 PR 被合并/关闭，从已关闭的 Issue 和可见 PR 推断，以下关键修复已合入：

- **会话与崩溃修复**：#145116（批量会话身份锁获取导致 Gateway 栈溢出崩溃）已关闭；#150126（浏览器目标崩溃导致整个 Gateway 退出，杀死所有 in-flight agent 运行和 cron）已关闭。
- **平台适配**：#146719（Windows 更新时 `OPENCLAW_STATE_DIR` 未展开导致候选快照 mkdir 失败，阻塞 9.4 升级）已关闭；#134430（macOS Cookie sync 开启后 MainActor 隔离检查崩溃循环）已关闭。
- **渠道与集成**：#142574（IMAP 单部分 HTML 邮件解析失败，影响邮件清扫）已关闭；#147546（OpenRouter 免费模型每日额度被误判为瞬时限流，导致无效重试）已关闭；#150240（Control UI 保存配置时 Matrix SecretRef 校验失败）已关闭。
- **UI 修复**：#150298（Control UI Browser 面板输入时丢失空格键，2026.9.4 回归）已关闭。

在开放 PR 中，较值得关注的方向：
- **#150421**：`2026.7.33` 分支的第二批 backports，涉及 Matrix/Slack/Feishu/WhatsApp Web 等多个渠道和大量插件，维护老版本分支的稳定性。
- **#150309**：允许 dashboard 对话通过官方插件读取其账号有权限访问的频道消息，属于权限边界的增强。
- **#150509**：模型身份保持与思考策略集中化重构，修复别名和多选择路径导致模型被重命名/重置的问题。

## 4. 社区热点

今日讨论最集中的 Issue 反映了社区对**长期运行稳定性**和**多 Agent 生产部署**的强烈关注：

- **[#97616] OpenClaw 泄漏未回收的 hook/tool 子进程，僵尸进程累积导致运行时退化**（30 评论，👍 1，创建于 2026-06-29，至今未关闭）
  这是当前**评论最多的 Issue**，用户报告 `openclaw-hooks`、`bash`、`codex` 等子进程成为僵尸并持续累积。该问题已存在近三个月，社区持续关注但缺乏修复 PR，是项目健康度的一个重要减分项。
  https://github.com/openclaw/openclaw/issues/97616

- **[#144911] MCP server 初始化超时导致 Gateway 崩溃**（24 评论，P1）
  stdio MCP server 在 30 秒内未完成 initialize 时，child-process 清理路径抛出未处理的 promise rejection，拖垮整个 Gateway。该问题影响 MCP 生态的可靠性。
  https://github.com/openclaw/openclaw/issues/144911

- **[#126360] 多 Agent 显式 ownership 下 AgentSelectionRequiredError 日志洪水**（17 评论，P1）
  在 `agents.ownership: "explicit"` 且无默认 agent 的配置下，logbook 插件、Control UI 全局 RPC、system-agent 轮次都因缺少 agentId 而持续报错。多 Agent 配置是高级用户的常见场景，该问题直接损害可观测性。
  https://github.com/openclaw/openclaw/issues/126360

- **[#150201] Windows 更新候选快照失败，Gateway SQLite 检查超时**（14 评论，P0）
  9 月 16 日报告的 Windows 更新阻塞问题，标题已确认 2026.9.3 快照失败，并伴随 Gateway SQLite 检查超时，与当日一系列更新失败报告相互印证。
  https://github.com/openclaw/openclaw/issues/150201

## 5. Bug 与稳定性

### P0 — 严重崩溃 / 阻断升级 / 数据风险

| Issue | 问题 | 状态 |
|---|---|---|
| [#150201](https://github.com/openclaw/openclaw/issues/150201) | Windows 2026.9.3 候选快照失败，SQLite 检查超时 | OPEN，无直接 fix PR |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 632-agent 舰队中 Gateway 就绪后不响应任何 /health，事件循环饥饿，RSS 持续增长直至 OOM | OPEN，需 live repro |
| [#150452](https://github.com/openclaw/openclaw/issues/150452) | 2026.7.1-2 → 2026.9.4 升级需约一天手动修复：配置迁移无效、Telegram 崩溃循环、iOS 节点需重新批准、Usage 页面空白 | OPEN，新报告 |
| [#150496](https://github.com/openclaw/openclaw/issues/150496) | `openclaw channels logout --channel ""` 会清除唯一已配置频道的已保存认证，存在数据丢失风险 | OPEN，已有 linked PR |
| [#150386](https://github.com/openclaw/openclaw/issues/150386) / [#150378](https://github.com/openclaw/openclaw/issues/150378) / [#150369](https://github.com/openclaw/openclaw/issues/150369) / [#150366](https://github.com/openclaw/openclaw/issues/150366) / [#150332](https://github.com/openclaw/openclaw/issues/150332) | 多个 `runtime-verification-failed` / `unexpected-error` / `not-git-install` / `database-schema-preflight` 更新失败，覆盖 win32/x64、win32/arm64、linux/x64 | OPEN，均无 fix PR |
| [#150126](https://github.com/openclaw/openclaw/issues/150126) | 浏览器目标崩溃触发未处理 Playwright rejection，退出整个 Gateway，杀死所有 in-flight 运行 | **已关闭**（修复已合入） |

### P1 — 重要回归 / 功能异常

- **[#97616] 子进程僵尸累积**（30 评论）— 长期问题，无 fix PR。 https://github.com/openclaw/openclaw/issues/97616
- **[#144911] MCP 初始化超时崩溃 Gateway**（24 评论）— OPEN，无 fix PR。 https://github.com/openclaw/openclaw/issues/144911
- **[#137332] 混合 requester-settle 批次在 ownership 检查后永远重试**（13 评论）— 含 failed/timed-out/cancelled 子代理的批次永久挂起，OPEN。 https://github.com/openclaw/openclaw/issues/137332
- **[#148529] 632-agent Gateway 启动时间从 ~2 秒恶化到 ~12 分钟**（6 评论）— 性能严重回归，OPEN，需 live repro。 https://github.com/openclaw/openclaw/issues/148529
- **[#148707] 第二次运行抢占 in-flight 回合导致回复丢失**（8 评论）— 2026.9.4 回归，OPEN。 https://github.com/openclaw/openclaw/issues/148707
- **[#101929] context-overflow 预估超计 ~2.3-2.6×**（8 评论）— 导致不必要的截断恢复，OPEN，需维护者评审。 https://github.com/openclaw/openclaw/issues/101929

## 6. 功能请求与路线图信号

- **[#150219] 支持多个配对扩展浏览器（按设备）并轻松切换**（P2，需安全评审，评论 2）
  用户运行 Gateway 于 WSL2，希望多个设备上的 Chrome/Edge 扩展能同时配对，而不是共用一个扩展槽位。该请求涉及安全边界，但符合多设备工作流趋势。
  https://github.com/openclaw/openclaw/issues/150219

- **[#150441] 官方非模型 HDS worker，用于受限的开发评审 hold**（P3，需安全评审）
  请求一个受信任的官方组件，将 broker 的开发环境人工决策 hold 转换为原生插件审批卡片。属于自动化治理方向。
  https://github.com/openclaw/openclaw/issues/150441

- **[#7406] Telegram 论坛主题在会话下拉框中显示人类可读名称**（P2，创建于 2026-02-02，4 评论，👍 1）
  老牌功能请求，希望将 `agent:main:telegram:group:-123456789:topic:42` 显示为 `Telegram : GroupName : TopicName`。长期未关闭，本次更新后有新的讨论。
  https://github.com/openclaw/openclaw/issues/7406

- **WebUI 体验优化持续成为主线**：维护者 @vyctorbrzezowski 连续提交了多个 WebUI 问题——测量滚动补偿触发多余历史加载（#149727）、会话打开时 transcript 向上跳动（#150508）、启动时错误主题闪现（#150506）。结合已合入的 #150298（Browser 面板空格键）以及开放 PR #149330（Ask OpenClaw 上下文插件帮助）、#149331（按 manifest 元数据分组插件设置），**WebUI 的打磨与性能优化很可能进入下一版本的重点范围**。

## 7. 用户反馈摘要

- **升级痛苦是今日最强烈的情绪**：#150452 用户描述"2026.7.1-2 → 2026.9.4 升级花了一整天手动修复"，涉及配置迁移、Telegram 崩溃循环、iOS 节点重复批准、Usage 页面空白多项问题。结合多条 Windows 更新失败报告，升级通道的可靠性已显著影响用户信任。
  https://github.com/openclaw/openclaw/issues/150452

- **大规模部署性能焦虑**：#148529 和 #149538 来自同一 632-agent 舰队用户，启动时间从 2 秒恶化到 12 分钟，且就绪后不响应健康检查。用户明确指出这是**与 2026.7.1-2 相比的严重回归**，并附了分阶段耗时分解。
  https://github.com/openclaw/openclaw/issues/148529

- **长期运行下的资源泄漏担忧**：#97616（僵尸进程）和 #142965（每个会话的 MCP 子进程不回收）都指向同一模式——**长期运行的 Gateway 内存/进程数无界增长，直到重启才能恢复**。这类问题对生产部署的伤害最大，用户反馈也最积极。
  https://github.com/openclaw/openclaw/issues/142965

- **"回复丢失"是最令用户沮丧的故障**：#148707 中用户看到"Reply operation has no active tool authority snapshot"，回复完全丢失且无重试。#144908 用户表示该错误"反复出现，不是一次性"。
  https://github.com/openclaw/openclaw/issues/144908

## 8. 待处理积压

以下重要 Issue/PR 长期未解决或未合并，建议维护者优先关注：

- **[#7406] Telegram 可读主题名** — 创建于 2026-02-02，至今 7.5 个月未关闭，已标记 `needs-product-decision`。
  https://github.com/openclaw/openclaw/issues/7406

- **[#97616] hook/tool 子进程僵尸累积** — 创建于 2026-06-29，30 评论仍无 fix PR，是当前社区最关注的问题。
  https://github.com/openclaw/openclaw/issues/97616

- **[#101929] context-overflow 预估超计 2.3-2.6×** — 创建于 2026-07-08，已标记 `no-new-fix-pr` 和 `needs-maintainer-review`，影响 tool-heavy 场景的稳定性。
  https://github.com/openclaw/openclaw/issues/101929

- **[#123354] Matrix E2EE 在 Megolm 会话轮换后停止解密** — 创建于 2026-08-13，涉及加密通信可靠性，已标记 `needs-live-repro`。
  https://github.com/openclaw/openclaw/issues/123354

- **长期未合并的 PR**（均超过一个月仍为 OPEN）：
  - [#82290](https://github.com/openclaw/openclaw/pull/82290)（2026-05-15，pin daemon runtime paths）
  - [#99556](https://github.com/openclaw/openclaw/pull/99556)（2026-07-03，聊天历史中 redact Responses media blocks）
  - [#110179](https://github.com/openclaw/openclaw/pull/110179)（2026-07-17，ADC-only 提供商走 Gateway 认证）
  - [#111367](https://github.com/openclaw/openclaw/pull/111367)（2026-07-19，xhigh reasoning effort 兼容性）
  - [#114032](https://github.com/openclaw/openclaw/pull/114032)（2026-07-26，Control UI 新线程即时打开）

---

*本日报基于 OpenClaw 公开 GitHub 数据自动生成，数据统计区间为 2026-09-16 至 2026-09-17。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**日期：2026-09-17 | 数据窗口：2026-09-16 至 2026-09-17 | 覆盖项目：9 个**

---

## 1. 生态全景

今日生态呈现"**多项目并行、痛点高度趋同**"的格局：9 个项目中 8 个有活跃动态，累计 PR 更新超过 600 条，但无任何项目发布新版本，整个生态处于"密集开发、谨慎发版"的阶段。最突出的共性矛盾是**生产级稳定性**——OpenClaw 的 632-agent 舰队事件循环饥饿、CoPaw 的三路径内存 OOM、PicoClaw 的 22.8 万次 Telegram 限流式编辑循环，均指向"长期运行的资源治理"这一未完全解决的难题。与此同时，社区关注点正从"单机个人助手"向"多 Agent 舰队 + 团队多租户"迁移：OpenClaw 的大规模部署报告与 CoPaw Hub 多租户规划（29 条评论）遥相呼应。记忆系统架构分层（ZeroClaw 4 个 RFC）、MCP 基础设施自愈、安全默认收紧则是跨越多个仓库的共同技术诉求。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 版本发布 | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 121 条（新开/活跃 96，关闭 25） | 500 条（合并/关闭 209） | 无（最新 2026.9.4） | ⚠️ **活跃但脆弱**：P0 升级失败、大规模部署稳定性短板明显 |
| **CoPaw** | 17 条（新开/活跃 11，关闭 6） | 36 条（合并/关闭 12，待合并 24） | 无 | ✅ **健康**：功能推进与稳定性修复并行，Hub 路线图清晰 |
| **NanoClaw** | 2 条（新开） | 34 条（合并/关闭 9，待合并 25） | 无 | ✅ **高活跃**：CI 挂起问题当日响应、隔日修复，生命力强 |
| **ZeroClaw** | 30 条（全部开放） | 50 条（全部待合并，0 合并） | 无 | ⚠️ **架构讨论密集、交付放缓**：RFC 活跃但 PR 审查积压 |
| **NanoBot** | 3 条（活跃 2，关闭 1） | 20 条（合并/关闭 4，待合并 16） | 无 | ✅ **良好**：P1 回归修复已提交，但 PR 合并效率需关注 |
| **LobsterAI** | 9 条（全部 stale 关闭） | 15 条（3 合并，12 stale 关闭） | 无 | ✅ **维护整理期**：存量清理彻底，3 个可靠性 PR 实质推进 |
| **Moltis** | 2 条（新开 1，关闭 1） | 3 条（新 PR 1，待合并 1，长期 PR 关闭 1） | 无 | ✅ **中等**：沙箱 per-agent 配置值得期待，MCP 故障需响应 |
| **PicoClaw** | 1 条（关闭） | 3 条（关闭 2，待合并 1） | 无 | ✅ **平稳维护**：Telegram 体验修复收尾，但高危 stale 关闭需核实 |
| **IronClaw** | 0 | 0 | 无 | ⚪ **停滞**：24 小时无任何动态 |

> OpenClaw 单日 PR 更新量（500）是第二名 CoPaw/NanoClaw（~35）的 **14 倍以上**，生态核心地位在数据层面无可争议。

---

## 3. OpenClaw 在生态中的定位

### 3.1 核心参照，生态规模的绝对主导者

OpenClaw 是当前生态的**基准实现（reference implementation）**。不仅因为其 PR/Issue 吞吐量高出 1-2 个数量级，更因为其他项目在命名体系（ZeroClaw、NanoClaw、PicoClaw、IronClaw）和集成深度（LobsterAI 整个项目围绕 OpenClaw 的修复/配置流程构建）上都明确以 OpenClaw 为上游。

**优势：**
- **渠道/平台覆盖最广**：Windows、macOS、Linux 三平台；Telegram、Slack、飞书、WhatsApp、IMAP、Matrix 等多渠道；OpenRouter 等多模型提供商。
- **社区反馈闭环最快**：209 个 PR 在 24 小时内合并/关闭，P0 级浏览器目标崩溃（#150126）当日即修复合入。
- **独有的大规模部署实证**：632-agent 舰队的性能报告（#148529、#149538）在生态中独一无二，虽暴露问题但也为行业提供了稀缺的生产级数据。

### 3.2 技术路线差异

| 维度 | OpenClaw | 差异化项目 |
|---|---|---|
| 架构风格 | 单体 Gateway + 插件生态，开箱即用 | NanoBot 模块化框架；ZeroClaw RFC 驱动的分层设计；Moltis per-agent 沙箱 |
| 演进策略 | 快速迭代（2026.7.x → 2026.9.4），但升级管线脆弱 | LobsterAI 反向投入升级时序修复；NanoClaw 以 CI 工程化保障演进质量 |
| 目标场景 | 生产级多 Agent 部署 | CoPaw 瞄准团队 Hub 商业化；Moltis 锁定安全隔离；PicoClaw 轻量维护 |

### 3.3 核心短板

升级通道可靠性（多起 Windows 更新失败、2026.7→9.4 需一天手动修复）、长期运行资源泄漏（#97616 僵尸进程 3 个月未修复）、以及超大舰队下的 Gateway 稳定性，是 OpenClaw 当前最被社区诟病的三个方向——而这些恰好是 LobsterAI（升级修复）、CoPaw（内存治理）等外围项目正在补齐的缝隙。

---

## 4. 共同关注的技术方向

### 4.1 长期运行稳定性与资源泄漏治理（涉及：OpenClaw、CoPaw、PicoClaw）

| 项目 | 具体问题 |
|---|---|
| OpenClaw | #97616 hook/tool 子进程僵尸累积（30 评论，3 个月未修复）；#142965 每会话 MCP 子进程不回收 |
| CoPaw | #7722 无界流缓冲区 + 实例堆积 + gate 绕过三条复合路径导致容器 OOM |
| PicoClaw | #3343 单次失败回合触发 22.8 万次 Telegram 编辑，遭服务端限流 |

**共性诉求**：进程/内存无界增长是生产部署的最大威胁，"失败后快速降级而非继续重试"成为共识。

### 4.2 MCP 基础设施的故障自愈（涉及：OpenClaw、Moltis、CoPaw、ZeroClaw）

- OpenClaw #144911：stdio MCP 30 秒初始化超时，未处理 rejection 拖垮整个 Gateway（P1，无修复 PR）。
- Moltis #1271：MCP 启动失败后永不重试，失败状态"传染"所有后续调用，且无任何响应。
- CoPaw #6969：MCP 工具返回 structuredContent 时结果重复（待合并已超 30 天）。
- ZeroClaw：MCP launcher 及分平台分发 PR 栈式依赖推进中。

**共性诉求**：MCP 已事实成为 Agent 工具调用标准，但"最后一公里"的容错、超时、重试、去重机制普遍缺失。

### 4.3 记忆与上下文管理的架构分层（涉及：ZeroClaw、OpenClaw、NanoBot、CoPaw）

- ZeroClaw 一日内 4 个活跃 RFC（#6850 生命周期解耦、#9103 存储与 enrichment 分离、#9048 会话历史与长期记忆分离、#8891 parity tracker），是生态中最系统的记忆架构讨论。
- OpenClaw #101929：context-overflow 预估超计 2.3-2.6×，导致不必要的截断恢复。
- NanoBot #5379：记忆整合需保留完整原始输入，避免历史信息丢失。
- CoPaw #4171：memory-distill 工具插件（标题差异对比，宣称 92% 噪声消减）历经 4 个月今日终合入。

**共性诉求**：记忆正从"单一存储"走向"分层架构"——会话历史、长期记忆、存储后端、enrichment 连接器需要明确边界。

### 4.4 升级/安装管线的可靠性（涉及：OpenClaw、NanoClaw、LobsterAI）

- OpenClaw：2026.9.3→9.4 更新通道系统性失败（Windows 路径、SQLite schema 预检、npm 模式识别）；#150452 用户升级花费一整天手动修复。
- NanoClaw #3839：Bun `spawnSync` 缺陷导致 CI 挂起 6 小时——基础设施层面的"升级/验证管线"同样脆弱。
- LobsterAI 今日合入的 #2689 专门修复启动修复顺序对配置文件的隐式依赖，可视为对 OpenClaw 升级痛点的外围补强。

**共性诉求**：升级体验直接决定用户信任，schema 迁移、快照回滚、失败预检成为必备能力。

### 4.5 多 Agent/多会话并发正确性（涉及：OpenClaw、NanoBot、CoPaw）

- OpenClaw：#149538 632-agent Gateway 事件循环饥饿；#148529 启动时间从 2 秒恶化到 12 分钟；#126360 ownership 缺失日志洪水。
- NanoBot：#5792 同会话并发 dispatch 消息乱序（P1）；#5794 跨会话响应投递错误（A 会话回复出现在 B 会话）。
- CoPaw：#7382 修复空白会话切走再返回后的会话串扰。

**共性诉求**：并发正确性是规模化部署的前提，"回复归属错误"是最令用户沮丧的故障类型。

### 4.6 沙箱隔离与安全默认收紧（涉及：Moltis、CoPaw、ZeroClaw）

- Moltis #1272（待合并）：per-agent mounts、run_as、强制沙箱，隔离策略从"全局"细化到"个体"。
- CoPaw #7120（已合并）：7 项 shell 逃逸检测全部默认开启，安全基线显著右移。
- ZeroClaw #10923：沙箱发现忽略 TUI PATH，shell 二进制解析行为不一致。

**共性诉求**：安全能力不能依赖用户手动配置，默认安全、per-agent 精细化控制成为趋势。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能多 Agent 编排、多平台多渠道 | 个人/企业生产级部署 | 单体 Gateway + 插件生态，规模最大但复杂度最高 |
| **CoPaw** | Hub 多租户、Console 前端、Creator 创作工具链 | 团队协作、内容创作者 | 最接近 SaaS 商业化形态（2.2.0 推多租户 Hub + 模型网关 + 成员治理） |
| **NanoBot** | TUI 优先的开发者框架、推理成本控制 | 开发者、技术用户 | 模块化 Provider 抽象，测试完备，#4419 自动推理努力升级是生态独有方向 |
| **ZeroClaw** | 记忆架构分层、Goal Mode 范畴治理 | 架构敏感型开发者 | RFC 驱动设计流程，记忆生命周期与存储解耦的探索最深入 |
| **NanoClaw** | 网关抽象（Iron Proxy）、CI 工程化 | 基础设施型用户 | 集中化凭证网关契约 + Tools-only 交付模式，关注供应商兼容性 |
| **Moltis** | 沙箱精细化隔离、构建优化 | 安全敏感的多 Agent 部署 | per-agent 挂载/运行身份/强制沙箱，隔离粒度生态最细 |
| **LobsterAI** | OpenClaw 桌面集成层与修复工具 | OpenClaw 桌面端用户 | 深度绑定 OpenClaw 生态，补其升级/修复体验短板 |
| **PicoClaw** | 轻量级适配器维护 | 轻量部署用户 | 维护节奏慢，专注于 Telegram 等核心渠道体验打磨 |
| **IronClaw** | 无动态 | — | 处于停滞状态，观察为主 |

> **值得注意**：LobsterAI（网易有道）与 CoPaw（AgentScope）均有中国背景，前者围绕 OpenClaw 做集成层，后者独立走 Hub 商业化路线——两条路径分别代表了"依附生态"与"自成生态"的中国团队策略。

---

## 6. 社区热度与成熟度分层

### 第一梯队：高活跃、快速迭代（日 PR 30+）
- **OpenClaw**：吞吐量断层第一，但 P0 积压与升级信任危机并存，处于"速度掩盖脆弱"的阶段
- **CoPaw**：功能与稳定并行，社区讨论质量高（#7318 达 29 评论），成熟度快速上升
- **NanoClaw**：核心架构重构期，CI 问题响应速度当日达，工程文化优秀

### 第二梯队：中活跃、质量巩固（日 PR 3-20）
- **NanoBot**：提交质量高（测试说明完善），但 16 个 PR 待合并、#5152 悬置 50 天，合并效率是瓶颈
- **ZeroClaw**：架构讨论极活跃但交付停滞（50 个 PR 全部待合并、0 合并），存在"设计过度、落地不足"风险
- **LobsterAI**：存量清理后进入正常维护节奏，今日 3 个 PR 集中在 OpenClaw 集成可靠性，方向聚焦
- **Moltis**：体量虽小，但沙箱 per-agent 配置与构建缓存优化方向务实

### 第三梯队：维护期 / 停滞
- **PicoClaw**：Telegram 修复收尾，高危 Issue #3343 以 stale 关闭但无对应修复 PR，需警惕"假关闭"
- **IronClaw**：24 小时完全无活动，建议关注是否已进入休眠

---

## 7. 值得关注的趋势信号

### 7.1 规模化部署的稳定性是当前最大技术债
OpenClaw 632-agent 实例暴露的启动时间从 2 秒恶化到 12 分钟、就绪后事件循环饥饿直至 OOM，是生态中罕见的真实生产级数据。**对开发者的启示**：在设计 Agent 框架时，事件循环调度、健康检查、资源回收机制需要在百 agent 规模下做压测，而非仅验证单实例功能。

### 7.2 记忆系统正在经历"架构觉醒"
ZeroClaw 的 4 个记忆 RFC、CoPaw 的 memory-distill、NanoBot 的记忆整合保留完整输入、OpenClaw 的 context-overflow 超计修正——四个项目从不同角度指向同一结论：**记忆不是"多存点东西"，而是需要明确生命周期、存储边界、会话/长期分层、以及成本可预估性的独立子系统**。这将深刻影响后续 Agent 框架的数据模型设计。

### 7.3 MCP 从"能用"到"可靠"的最后一公里
MCP 已确立为工具调用事实标准，但初始化超时崩溃（OpenClaw）、失败永不重试（Moltis）、结果重复（CoPaw）说明**协议层之下的运行时容错机制严重滞后**。当 MCP server 数量增长后，单个 server 的故障不应拖垮整个 Gateway——这需要熔断、隔离、重试语义的标准化。

### 7.4 推理成本的精细化可编程控制
NanoBot #4419（自动推理努力升级）是生态中最明确的方向：同一配置无法适配不同复杂度任务，系统应根据问题难度自动分级调整推理强度。配合 OpenClaw 的 context 超计修正，**"成本感知"正在成为 Agent 框架的必要能力**，而非可选项。

### 7.5 升级管线成为信任基石
OpenClaw 升级失败引发当日最强烈的社区负面情绪（"花了一整天手动修复"），而 LobsterAI 的应对（快照回滚、schema 迁移前置）提供了一种值得借鉴的解法。**在快速迭代的生态中，升级体验与功能开发同等重要**——一个失败的升级足以抵消十个新功能带来的信任增量。

### 7.6 团队化/多租户成为商业化必经之路
CoPaw Hub 2.2.0 规划（模型网关 + 成员治理 + 用量看板）与 OpenClaw 的权限边界增强（#150309）显示了同一趋势：个人 AI 助手正在向团队协作平台演进。社区对"Hub 下一步做什么"的高讨论度（29 条评论、4 个 👍）表明**自托管多租户能力是当前最强烈的未满足需求**。

### 7.7 安全默认值系统性右移
CoPaw 默认开启全部 shell 逃逸检测（#7120）、Moltis 提供 per-agent 强制沙箱（#1272）、ZeroClaw 的 first-run 配置信任问题（#8505）——三个信号共同指向：**安全不能依赖用户手动开启，必须成为框架的默认基线**。随着 Agent 权限边界扩大（浏览器控制、shell 执行、文件读写），默认安全策略将是下一代框架的核心竞争力。

---

*报告基于 2026-09-17 各项目 GitHub 公开数据自动生成，数据覆盖 9 个仓库、600+ 条 PR 更新、170+ 条 Issue 更新。分析立场：独立第三方技术视角。*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-17

## 今日速览

过去 24 小时 NanoBot 项目保持高度活跃：共收到 20 条 PR 更新，其中 4 条已合并/关闭，16 条待合并；Issues 侧有 3 条更新（新开/活跃 2 条，关闭 1 条）。PR 提交密度高，覆盖 bug 修复、Provider 集成增强、TUI 体验优化和文档更新，且多数 PR 带有完善的测试说明，显示项目维护者与社区贡献者的协作节奏良好。同时，本周有 P1 级回归修复进入提交流程，长期开放的 issue #4419 持续推进中——整体项目健康度良好，但需关注积压 PR 的合并效率与个别老 Issue 的响应时效。

---

## 项目进展

今日共合并/关闭 4 个 PR，主要集中在体验修复、安全测试加固和文档更新层面：

- **TUI：保持 Agent 输出期间输入框响应**（[#5791](https://github.com/HKUDS/nanobot/pull/5791)，已关闭）— 修复终端 UI 在 agent 输出流期间输入回调被饿死的问题，通过有界 FIFO 批处理 drain 输出、保留 IME 延迟提交时序，并维持了 FIFO 顺序、会话 attach 失效处理及断连状态排序等既有行为。该修复直接改善了高频用户日常使用 TUI 的交互流畅度。

- **测试安全：代理清理 fixtures 在系统级代理环境下的隔离性**（[#5756](https://github.com/HKUDS/nanobot/pull/5756)，已关闭）— 修复 SSRF/代理相关测试模块在 Windows 注册表、macOS SystemConfiguration 等系统级代理存在时无法彻底隔离环境变量的问题，保证 CI 与本地测试的可复现性。

- **文档：刷新 README WebUI 截图**（[#5789](https://github.com/HKUDS/nanobot/pull/5789)，已关闭）— 更新 README 中的 WebUI 画廊，覆盖新主题 hero 编辑器、多窗格工作台、上下文用量与缓存复用界面、MCP 目录及 Automations 日历视图，方便新用户快速了解当前前端能力。

- **重构：工具进度文本变量重命名**（[#2595](https://github.com/HKUDS/nanobot/pull/2595)，已关闭，标记 conflict）— 将 `AgentLoop._run_agent_loop()` 中 `thought` 重命名为 `display_text` 并补充注释，提升代码可读性；该 PR 最终以关闭收尾，可能因冲突或维护者决定不合并。

> 值得关注：仍有 16 个 PR 处于待合并状态，其中包含多个 P2 级修复（cron 调度冲突校验、跨会话响应投递、`edit_file` 空白保留等）。建议维护者评估批量合并节奏，避免修复分支长期漂移。

---

## 社区热点

今日讨论热度集中在 #4419，其余 Issue/PR 评论数较少，整体社区讨论仍以功能设计与问题报告为主。各条热点的分析如下：

- **[#4419](https://github.com/HKUDS/nanobot/issues/4419)：自动推理努力升级（默认 + 升级层级）**（评论 5 条，6 月创建，持续活跃至今）— 作者 @orrinwitt 提出为 reasoning 模型引入自动化的推理努力升级机制：在 `reasoningEffort` 已有配置的基础上，增加默认与可升级的层级策略，使模型可以在低复杂度问题上使用低推理强度以节省成本，在难题上自动升级推理深度。该 Issue 讨论周期长、覆盖成本优化与智能路由两个维度，反映社区用户对「推理成本可编程控制」的明确诉求。

- **[#5731](https://github.com/HKUDS/nanobot/issues/5731)：将 AnySearch 添加为 web_fetch 后端（免 key、匿名配额）**（评论 1 条）— 来自 AnySearch 官方的集成请求，提供免 API key 的实时搜索能力作为 web_fetch 后端选项，定位是 AI Agent 的统一搜索基础设施。该需求具有明确的外部合作属性，可能影响 web_fetch 模块的架构扩展方向。

- **[#5790](https://github.com/HKUDS/nanobot/issues/5790)：代码仓库访问请求**（已关闭）— 用户请求代码仓库邀请链接，非技术性问题，由维护者关闭，推测为类似「如何加入组织」的简短问答。

> 小结：当前社区热点集中在「推理成本优化」与「外部数据/搜索服务集成」两个主题，前者与 LLM 推理侧的成本敏感性高度相关，后者体现 NanoBot 作为 AI 助手框架对外部工具生态兼容性的期待。

---

## Bug 与稳定性

今日提交的 PR 中有大量 bug 修复，按严重程度与影响范围排列如下：

**P1 级（高优先级）**

- **[#5792](https://github.com/HKUDS/nanobot/pull/5792)：修复 Agent 按会话串行化与批处理消息** — 回归修复：同一会话的并发 dispatch 任务会竞争同一 session worker，导致消息乱序；方案为安装单一 FIFO 收件箱、单 worker 处理、模型请求前做有界快照。该 PR 为 P1 级，直接影响多会话并发场景下的数据一致性，需优先评审。

**P2 级（常规修复，已有 PR）**

- **[#5794](https://github.com/HKUDS/nanobot/pull/5794)：跨会话响应投递错误** — 会话 A 的响应可能出现在会话 B；根因在于 `AgentLoop._dispatch` 的上下文处理缺陷，修复后保证响应归属正确会话。
- **[#5796](https://github.com/HKUDS/nanobot/pull/5796)：`edit_file` 内联替换丢失分隔符空白** — 修复非 Markdown 文件行尾空白被剥离导致相邻 token 语义改变的问题。
- **[#5795](https://github.com/HKUDS/nanobot/pull/5795)：`edit_file` 换行结尾回退编辑丢缩进/多空行** — `_find_trim_matches` 对 `old_text` 末尾换行的匹配不完整导致。
- **[#5793](https://github.com/HKUDS/nanobot/pull/5793)：递归 `list_dir` 忽略目录作用域过宽** — 当请求目录或其父目录名为 `build`/`dist`/`_IGNORE_DIRS` 中条目时，递归列举被错误置空，修复为仅针对列出根目录生效。
- **[#5765](https://github.com/HKUDS/nanobot/pull/5765)：OpenAI 兼容端点 `stream` 参数未严格按布尔解析** — JSON 字符串 `"false"` 被当作 truthy 导致误入 SSE 模式，现已要求严格布尔值。
- **[#5766](https://github.com/HKUDS/nanobot/pull/5766)：cron 工具未拒绝冲突调度字段** — 同时提供 `every_seconds`/`cron_expr`/`at` 时仅取首值，现改为直接拒绝以防静默丢弃用户配置。
- **[#5762](https://github.com/HKUDS/nanobot/pull/5762)：cron 工具接受过去的一次性调度** — 过去 `at` 的 job 永远不被触发却仍显示成功，修复为预校验并拒绝。
- **[#5769](https://github.com/HKUDS/nanobot/pull/5769)：NIM 风格超时错误未触发故障转移** — 仅按异常类名判断超时，无法识别 `RuntimeError: timed out after 300s` 这类消息；修复后允许 `FallbackProvider` 对超时/连接类错误切换模型。
- **[#5764](https://github.com/HKUDS/nanobot/pull/5764)：半开状态并发探测未串行化** — 冷却期后多个并发请求可能同时到达恢复中的主 Provider，修复为只允许单个探针请求进入半开验证。
- **[#5379](https://github.com/HKUDS/nanobot/pull/5379)：记忆整合保留完整输入** — 重定基到当前结构化整合流程，确保 `history.jsonl` 条目在 `last_consolidated` 推进前保留所有公开原始字符，且保持单条安全上限、不增加 Provider 调用。

**已合并的稳定性修复**

- [#5791](https://github.com/HKUDS/nanobot/pull/5791) TUI 输入响应修复（见「项目进展」）。
- [#5756](https://github.com/HKUDS/nanobot/pull/5756) 测试代理清理修复（见「项目进展」）。

> 风险评估：今日未发现崩溃级或数据丢失级 bug，但 #5792（P1）所涉及的会话消息乱序是用户可感知的严重回归，建议优先安排评审与合并。

---

## 功能请求与路线图信号

今日可见的功能需求与已提交的功能型 PR 如下，其中部分具有明显进入下一版本的可能性：

**高可能进入下个版本**

- **[#5718](https://github.com/HKUDS/nanobot/pull/5718)：OpenRouter 原生图像生成 API 支持** — 已提交实现，使 `generate_image` 后端可对接 OpenRouter Images API，扩展现有图像生成 Provider 生态。配套文档与测试齐备，P2 优先级，具备合并条件。
- **[#5520](https://github.com/HKUDS/nanobot/pull/5520)：Codex 的 Langfuse 追踪** — 为 Codex Provider 增加 Langfuse 原生 SDK 追踪（OpenAI 兼容 Provider 已有该能力），每次真实 HTTP 请求生成一条 generation 记录，区分主请求与压缩请求。属可观测性补全型能力，预计维护者会接受。

**中等可能，需进一步讨论**

- **[#5652](https://github.com/HKUDS/nanobot/pull/5652)：签名直投 Webhook** — 新增可选鉴权 webhook，将通知文本直接导入 outbound 消息总线，绕过 agent loop 与模型调用，面向 CI/监控/计费等可信系统。该功能涉及网关安全模型，需评估签名机制设计。
- **[#4419](https://github.com/HKUDS/nanobot/issues/4419)：自动推理努力升级** — 社区需求明确，但尚无对应 PR；若与现有 `reasoningEffort` 配置体系衔接顺利，可能出现在中期路线图。
- **[#5731](https://github.com/HKUDS/nanobot/issues/5731)：AnySearch 作为 web_fetch 后端** — 若达成外部协作，将作为新的 web_fetch 后端（免 key + 匿名配额）合入，降低用户搜索接入成本。

**其他**

- [#5797](https://github.com/HKUDS/nanobot/pull/5797)：为 Parallel Search 的 HTTP 请求添加 `nanobot/<version>` 用户代理 — 虽是小型改动，但便于 Parallel 统计集成用量，属 Provider 合作维护型增强。

---

## 用户反馈摘要

从今日活跃的 Issue 与 PR 讨论中可提炼以下真实用户诉求：

1. **推理成本与深度控制的精细化诉求**（[#4419](https://github.com/HKUDS/nanobot/issues/4419)）：用户希望从「手动指定 `reasoningEffort`」进化为「系统自动分级升级」。其核心痛点在于：同一配置无法适配不同复杂度任务——简单任务上用高推理配置是资源浪费，复杂任务上的默认低推理配置又不够聪明。这是成本敏感型用户的典型声音。

2. **外部服务集成时的低摩擦诉求**（[#5731](https://github.com/HKUDS/nanobot/issues/5731)）：AnySearch 团队主动提出免 API key 的集成方案，减少用户配置负担。这类「零配置可用」的诉求在 Agent 框架生态中越来越常见，用户希望搜索、抓取等基础能力开箱即用，而非逐个注册服务获取密钥。

3. **并发/多会话场景的响应正确性焦虑**（[#5794](https://github.com/HKUDS/nanobot/pull/5794)、[#5792](https://github.com/HKUDS/nanobot/pull/5792)）：用户在快速切换会话并发发送消息时，出现「A 会话的回复出现在 B 会话」的错乱现象，严重干扰多任务并行时的信任感。此类问题虽不常见，但一旦触发便极其影响体验。

4. **文档与上手体验的持续关注**（[#5789](https://github.com/HKUDS/nanobot/pull/5789) README 截图更新）：维护者主动刷新截图、对齐最新 WebUI，说明项目重视新用户的首次印象与功能传达，也侧面反映用户对文档「跟上版本」的期望。

5. **社区参与门槛**（[#5790](https://github.com/HKUDS/nanobot/issues/5790)）：有用户直接询问代码仓库邀请，虽然并非技术类 Issue，但提示项目可进一步明确贡献者入口与协作指引，降低参与门槛。

---

## 待处理积压

以下为长期未合入/未响应的重要 PR 与 Issue，建议维护者重点关注：

**老牌待合并 PR**

- **[#5152](https://github.com/HKUDS/nanobot/pull/5152)**（7 月 28 日创建）：子代理部分完成结果标记 — 为后台兄弟任务添加 `subagent_remaining_count` 元数据与仅面向模型的通知机制，避免 WebUI/外部渠道历史被刷屏。功能复杂、涉及多端一致性，悬置 50 天，值得安排专项评审。
- **[#5379](https://github.com/HKUDS/nanobot/pull/5379)**（8 月 13 日创建）：记忆整合保留完整输入 — 虽已 rebase 到当前结构化整合流程，但 34 天未合并，记忆相关修复宜早合入避免持续冲突。
- **[#5520](https://github.com/HKUDS/nanobot/pull/5520)**（8 月 24 日创建）：Codex Langfuse 追踪 — 24 天未动，文档、测试齐全，具备合并条件。

**长期活跃 Issue**

- **[#4419](https://github.com/HKUDS/nanobot/issues/4419)**（6 月 20 日创建）：自动推理努力升级 — 从 6 月至今评论不断但无 PR 跟进，若规划中请给出路线图回应，否则建议标记「考虑中」避免社区等待。
- **[#5731](https://github.com/HKUDS/nanobot/issues/5731)**（9 月 11 日创建）：AnySearch 后端集成 — 等待维护者回复合作意愿或实现方案，避免外部团队悬置。

**其他**

- [#5718](https://github.com/HKUDS/nanobot/pull/5718)（OpenRouter 图像生成，9 月 9 日创建）与 [#5652](https://github.com/HKUDS/nanobot/pull/5652)（签名直投 webhook，9 月 4 日创建）均已存在 8-13 天，处于可评审状态，请安排 review 以免堆积。

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

## ZeroClaw 项目动态日报 — 2026-09-17

### 1. 今日速览

ZeroClaw 今日整体活跃度较高：24小时内新增/活跃 Issue 30条（全部开放）、PR更新50条（全部待合并），但无合并/关闭事件，也无新版本发布，审查积压幅度进一步加大。讨论焦点集中在记忆系统架构分层的三个 RFC（#6850、#9103、#9048）以及 Goal Mode 实施路线（#8303、#9702、#10341），反映社区对架构边界和长期技术方向的高度关注。即时 Bug 类反馈（Telegram 配置、bootstrap 截断）持续出现，整体处于架构讨论密集、合并节奏放缓的阶段。

---

### 2. 版本发布

今日无新版本发布。

---

### 3. 项目进展

今日无 PR 合并/关闭，项目推进主要体现在代码审查与分支更新层面：

- **PR 审查待办增加**：50条 PR 均为开放状态，其中 4 条标注 `needs-maintainer-review`（#10623、#10583、#10401、#10511），是当前最接近可合并的候选。
- **eval 能力栈底层就绪**：#9214（live execution mode）的旧 base 分支 #9212 已合并，后续 #9217、#9219、#9220、#9221、#9222、#9224、#9244 等以栈式依赖推进，说明 eval 框架整体仍处于活跃开发状态，但多数标注 `needs-author-action`，需作者更新分支。
- **运行时稳定性修复在审查中**：#10696 修复了历史消息裁剪逻辑（从“以 cap 为触发和回填目标”改为“裁剪至 low-water target”），对工具密集型会话的上下文管理有直接改善。
- **记忆可观测性增强 PR 待合**：#10567 为记忆召回条目添加存储日期，提升记忆内容的时间可辨识性；#10652 修复 CLI 记忆指令对 PostgreSQL/Qdrant 等存储后端的解析问题。

---

### 4. 社区热点

今日讨论最活跃的 Issue 集中在两个方向：**记忆架构分层**与**Goal Mode 范畴控制**。

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) RFC: 记忆生命周期策略与存储后端解耦 | 25 | Memory trait 不应同时承担后端存储与生命周期治理，需明确边界 |
| [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) RFC: Goal Mode v1 — 有界前台工作 | 22 | 追求跨多轮的有界用户目标持久化，但须收敛重启交接、渠道准入等首次交付范围 |
| [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) RFC: 权威记忆存储与 enrichment 连接器分离 | 19 | 维护存储/增强的架构边界，避免 connector 与权威存储耦合 |
| [#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) RFC: 会话历史与长期记忆分离 | 16 | runtime/gateway/channel 将对话轮次写入 MemoryCategory::Conversation，与长期记忆混淆 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) Tracker: 维护者决策队列 | 15 | 为 RFC 和设计问题提供集中的维护者决策排队机制 |

**分析**：社区对记忆子系统的分层诉求非常强烈，四个活跃 Issue 分别从生命周期、存储边界、会话历史、enrichment 四个维度切入，配合 #8891 parity tracker，表明记忆系统重构是当前社区最关注的技术债。Goal Mode 方面，V1（#8303）与 V2（#9702）均已被接受，V3（#9703）仍处于 blocked 状态，说明维护者对异步子任务范畴持谨慎态度，先推进 V1/V2 的落地。

---

### 5. Bug 与稳定性

今日报告 5 个 Bug，按严重程度排列：

**【P1 / 高影响】**

- [#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505) **Telegram 频道无法配置**（S1，workflow blocked）：quickstart 与 zerocode 已设置频道，但 `channels doctor` 仍声称未配置，bot 不响应 TG 消息，CLI 回复正常。此问题影响面大，社区已关联 #8766（E2E 覆盖）与 #6416（配置验证），暂无直接 fix PR。
- [#10523](https://github.com/zeroclaw-labs/zeroclaw/issues/10523) **Bootstrap 文件截断不可见**（S2，degraded）：`compact_context` 下 AGENTS.md、SOUL.md、IDENTITY.md、USER.md 均在 6000 字符处被截断后注入 system prompt，且操作员无感知。暂无 fix PR。

**【P2 / 中等影响】**

- [#10924](https://github.com/zeroclaw-labs/zeroclaw/issues/10924) **Runtime 命令回执进入会话语音路由**（新报告，S2）：`stop_reply_message` 构建 `/stop` 确认时未设置 `suppress_voice`，导致命令回执被当作普通会话消息进入语音路由。
- [#10923](https://github.com/zeroclaw-labs/zeroclaw/issues/10923) **沙箱发现忽略 TUI PATH**（新报告，S2）：launcher 解析（#10381 后）已遵循子进程 PATH，但 sandbox discovery 未同步，导致 shell 二进制解析行为不一致。
- [#5269](https://github.com/zeroclaw-labs/zeroclaw/issues/5269) **nix run 安装路径未验证/未文档化**（S2）：用户从 nix run 安装遇到阻碍，文档缺失，已标记 `help wanted` 与 `good first issue`。

**趋势判断**：Operator UX 相关的配置/告警类 Bug 占比较高，且多与 first-run 路径相关（#8505、#10523），说明新用户引导链路仍然是稳定性薄弱环节。

---

### 6. 功能请求与路线图信号

今日新增 2 个功能请求：

- [#10925](https://github.com/zeroclaw-labs/zeroclaw/issues/10925) **Matrix 镜像语音回复**：支持 `output_modality = "mirror"` 的输入驱动语音回复，Matrix 当前文档明确标注该模式未实现。
- [#10891](https://github.com/zeroclaw-labs/zeroclaw/issues/10891) **频道来源溯源**：将可信的频道消息 provenance 贯穿 runtime admission 与 mid-turn steering，作为 #6971 的第一个实现切片。

结合已有 PR 判断，以下方向最可能进入下一版本：

1. **Operator UX 优化（确定性较高）**：
   - [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401)（Telegram 未授权通知可配置，对应 #10400）已进入维护者审查；
   - [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511)（quickstart 提供商凭据验证）已进入审查阶段；
   - [#6416](https://github.com/zeroclaw-labs/zeroclaw/issues/6416)（config.toml 校验与警告）状态 accepted，与 #8505 形成联动。

2. **Goal Mode 路线推进**：[#10341](https://github.com/zeroclaw-labs/zeroclaw/issues/10341) tracker 将 #8303（V1）和 #9702（V2）列为已接受的策略权威，#9703（V3）保持 blocked，近期实现将以 V1/V2 为边界。

3. **记忆分层重构（中期方向）**：#6850、#9103、#9048 三个 RFC 持续活跃，配合 #8891 parity tracker，预计后续将出现对应的实现 PR。

4. **Eval 框架完整化**：[#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214) 系列（live 模式、graders、receipts、baselines、JUnit 输出等）已构成完整能力栈，若作者尽快响应 `needs-author-action`，有望在后续版本统一落地。

---

### 7. 用户反馈摘要

从今日 Issue 描述与评论中提炼的真实用户反馈：

1. **配置路径信任度受损**（#8505）：用户在按 quickstart 和 zerocode 完成 Telegram 配置后，`channels doctor` 依然称未设置、bot 不响应，而 CLI 可正常回复。这直接打击新用户对配置工具的信任，属于 first-run 体验的致命缺陷。

2. **本地优先用户对 prompt 预算敏感**（#5287）：社区希望定义紧凑的本地运行 profile，减少 prompt 膨胀、禁用宽松 fallback 解析，并防止工具/系统指令泄漏到用户可见输出。该 Issue 获得 2 个 👍，说明本地模型用户群体有明确诉求。

3. **静默截断缺乏透明度**（#10523）：用户发现 `compact_context` 会静默截断 bootstrap 文件至 6000 字符，且操作员完全无法感知重要上下文丢失——期望有显式的截断提示或警告机制。

4. **会话历史与长期记忆行为混淆**（#9048）：用户观察到 runtime/gateway/channel 的自动保存路径将对话轮次写入 `MemoryCategory::Conversation`，与长期记忆在实现中混用，导致记忆行为不一致。

5. **新用户安装路径不畅通**（#5269）：用户从 nix run 路径安装遇到问题，搜索 issues 未发现类似反馈，文档缺失导致安装受阻。

---

### 8. 待处理积压

以下重要 Issue/PR 长期未获响应或等待作者行动，建议维护者关注：

**长期未落地 Issue（按创建时间排序）**

- [#5269](https://github.com/zeroclaw-labs/zeroclaw/issues/5269) — nix run 安装路径验证与文档化，2026-04-04 创建，状态 accepted，5 个月未落地，直接影响新用户安装。
- [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) — 本地 small profile 定义，2026-04-04 创建，状态 in-progress/accepted，5 个月进展缓慢，但用户期待度较高（👍 2）。
- [#6416](https://github.com/zeroclaw-labs/zeroclaw/issues/6416) — quickstart 配置校验与警告，2026-05-06 创建，status accepted，与 #8505 直接相关，4 个月无实质推进。
- [#8387](https://github.com/zeroclaw-labs/zeroclaw/issues/8387) — ZeroCode 守护进程重启控制，2026-06-27 创建，status accepted 但 0 评论，完全未展开讨论。

**等待作者行动的 PR（needs-author-action）**

- eval 系列 [#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)、[#9217](https://github.com/zeroclaw-labs/zeroclaw/pull/9217)、[#9219](https://github.com/zeroclaw-labs/zeroclaw/pull/9219)、[#9220](https://github.com/zeroclaw-labs/zeroclaw/pull/9220)、[#9221](https://github.com/zeroclaw-labs/zeroclaw/pull/9221)、[#9222](https://github.com/zeroclaw-labs/zeroclaw/pull/9222)、[#9223](https://github.com/zeroclaw-labs/zeroclaw/pull/9223)、[#9224](https://github.com/zeroclaw-labs/zeroclaw/pull/9224)、[#9244](https://github.com/zeroclaw-labs/zeroclaw/pull/9244)、[#9245](https://github.com/zeroclaw-labs/zeroclaw/pull/9245)、[#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248) — 均为 7 月 20-21 日创建，已近 2 个月。其中 #9214 的 base 分支已合并，作者需尽快刷新分支以免过期。
- [#10591](https://github.com/zeroclaw-labs/zeroclaw/pull/10591) — MCP launcher 及分平台分发，9 月 3 日创建，栈式依赖 #10590。
- [#10652](https://github.com/zeroclaw-labs/zeroclaw/pull/10652) — CLI 记忆指令存储解析修复，9 月 6 日创建，涉及 PostgreSQL/Qdrant 兼容性。

**积压风险提示**：50 条待合并 PR 中约 1/4 标注 `needs-author-action`，栈式依赖复杂度较高，建议维护者与作者沟通分级合并策略，优先处理 base 分支 PR，避免整条依赖链阻塞。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报 — 2026-09-17

## 1. 今日速览

今日 PicoClaw 仓库在 24 小时窗口内保持中等活跃度：共有 3 条 PR 和 1 条 Issue 被更新，其中 2 个 Telegram 相关修复 PR 关闭、1 个手机配对功能 PR 仍待合并，另有一条历史 Bug Issue 被标记关闭。全部条目均带 `[stale]` 标签，表明当日主要动作是对积压问题的集中清理与更新，而非新增大量讨论。整体来看，项目处于平稳维护节奏，社区提交持续但响应速度存在一定时间延迟，项目健康度良好。

---

## 2. 版本发布

今日无新版本发布，无破坏性变更或迁移注意事项需要同步。

---

## 3. 项目进展

今日合并/关闭的 PR 集中在 **Telegram 集成体验** 的修复上，均为 `@hugodeco` 提交：

- **[PR #3357 - fix(telegram): treat replies to the bot's own messages as implicit mentions](https://github.com/sipeed/picoclaw/pull/3357)**（已关闭）  
  修复在 `mention_only: true` 的群组中，用户直接回复机器人消息却被忽略的问题。此前用户必须同时包含 @提及才能触发响应，破坏了对话连续性。此修复让"回复"操作本身即可作为隐式提及，是 Telegram 群聊体验的重要补全。

- **[PR #3356 - fix(telegram): re-attach quoted documents when replying to a file message](https://github.com/sipeed/picoclaw/pull/3356)**（已关闭）  
  修复引用/回复文档消息时，`quotedTelegramMediaRefs()` 只重新关联语音和音频媒体、却丢失文档附件的问题。此前 agent 在跟进文件对话时收到的是占位符 `[file]` 而非实际文件，此修复确保文档上下文完整传递。

这两个 PR 均与 Telegram adapter 的对话上下文完整性直接相关，关闭标记说明代码已合入或完成评审，项目在消息处理链路（提及识别、媒体上下文保留）上向前迈进了两个实质改进。另有 **PR #3344**（Build Remote Agent 手机配对）仍在开放中，是当前最大的待合并功能。

---

## 4. 社区热点

今日最受关注的条目是 **[Issue #3343 - Tool feedback animation can edit a Telegram message indefinitely after a failed turn](https://github.com/sipeed/picoclaw/issues/3343)**，共获得 4 条评论，为今日评论数最高。

**核心问题**：工具反馈动画在 agent 回合停止推进后，仍每 3 秒调用一次 Telegram 的 `editMessageText`，持续数天，累计发起 **228,000+ 次编辑尝试**，最终触发 Telegram 服务端限流（`retry_after`）。

**社区诉求分析**：评论区关注的焦点大概率集中在**防止失控循环**和**限流保护自动化**上。用户希望项目引入更严格的编辑频率限制或错误熔断机制，避免单一卡死回合长期占用 API 配额。这一问题也反映出 Telegram adapter 需要更健壮的状态机管理。

---

## 5. Bug 与稳定性

今日仅 1 条 Bug 相关条目，但严重性较高：

| 严重程度 | Issue | 状态 | 是否有修复 PR |
|---------|-------|------|--------------|
| 🔴 高（资源耗尽/API 限流） | [#3343 工具反馈动画无限编辑 Telegram 消息](https://github.com/sipeed/picoclaw/issues/3343) | 已关闭（stale） | 无直接对应修复 PR |

**分析**：该 Bug 已持续 25 天后被标记关闭，但关闭原因可能为 **stale 自动过期**，而非确认修复。22.8 万次编辑尝试引发的限流属于生产环境严重事故，建议维护者核实问题是否仍在。与之相关的 #3357 和 #3356 虽已修复上下文传递问题，但并不直接解决编辑循环——若存在类似反馈动画的路径，风险可能仍潜伏。建议：
- 确认 #3343 的关闭是否伴随修复提交；
- 检查 Telegram adapter 是否有编辑频率上限或 watchdog 机制。

---

## 6. 功能请求与路线图信号

**[PR #3344 - Add Build Remote Agent phone pairing (gbr/1)](https://github.com/sipeed/picoclaw/pull/3344)**（开放中）是本日唯一的功能性 PR：

- **功能内容**：新增 Build Remote Agent 配对适配器，允许手机通过 `gbr/1` 协议"旁观"桌面 agent。
- **使用方式**：安装 MIT 协议的 `gbr-agent` v0.6.0+，执行 `gbr-agent pair`（同时支持二维码和 8 位字符码），然后 `gbr-agent run`。
- **连接范围**：仅允许连接 `http://127.0.0.1:8788` 或 stdio，安全边界明确。
- **路线图信号**：该 PR 若合入，PicoClaw 将获得移动端远程观察能力，为"AI 助手从桌面走向移动"铺路。尽管作者非核心贡献者，但其思路与项目长期愿景（个人 AI 助手多端协作）一致，值得关注是否被纳入下一版本计划。

---

## 7. 用户反馈摘要

从今日更新的 Issue 评论中可提炼以下用户反馈：

- **痛点一：失控的循环调用**（来源 [#3343](https://github.com/sipeed/picoclaw/issues/3343)）  
  用户报告了 agent 在逻辑卡死后仍持续进行无意义的 Telegram API 调用，不仅浪费资源，还因限流影响正常功能。真实使用场景中，**失败回合需要快速降级**，而非继续重试。

- **痛点二：群聊回复体验割裂**（来源 [PR #3357](https://github.com/sipeed/picoclaw/pull/3357)）  
  在 `mention_only` 模式下，用户跟随机器人回复却得不到回应，必须额外 @提及。用户期望的自然交互是"回复即对话"，该 PR 的关闭表明这一体验已被接受。

- **满意点**：暂无正面反馈在今日数据中显式出现，但 Telegram 相关 PR 的持续贡献说明该 channel 集成是社区主要使用路径之一。

---

## 8. 待处理积压

| 条目 | 类型 | 最后更新 | 状态 | 提醒原因 |
|------|------|---------|------|---------|
| [PR #3344: Add Build Remote Agent phone pairing](https://github.com/sipeed/picoclaw/pull/3344) | 功能 PR | 2026-09-16 | OPEN | 已开放 24 天，无合并/关闭动作，可能有冲突或需维护者评审。建议明确合入意向或给出反馈。 |
| [Issue #3343: 无限编辑 Telegram 消息](https://github.com/sipeed/picoclaw/issues/3343) | Bug | 2026-09-16 | CLOSED（stale） | 严重程度高但以 stale 关闭，需确认是否真的有修复落地，否则应重新打开并跟进。 |

---

*报告生成时间：2026-09-17 | 数据来源：github.com/sipeed/picoclaw*

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-17

## 1. 今日速览

过去 24 小时 NanoClaw 保持着较高的开发活跃度：共产生 2 条新 Issue 和 34 条 PR 更新，其中 9 条 PR 被合并/关闭，25 条仍在待合并状态。核心主题集中在 **CI 稳定性修复**（Bun `spawnSync` 挂起问题）与 **Iron Proxy 网关集成**（前端代理修复与凭证连接接口）两条主线上。值得注意的是，今日两条新 Issue 均指向同一根因——Bun 1.4.0 的 `spawnSync` 缺陷导致的 CI 六小时挂起，项目组已提交修复 PR，响应迅速。无新版本发布，项目处于密集开发迭代阶段。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日有 9 条 PR 合并/关闭，以下为已明确的重要变更：

- **[#3843 [CLOSED] fix(iron-proxy): complete WebSocket handshakes and keep upstream framing in the tunnel](https://github.com/nanocoai/nanoclaw/pull/3843)** — 修复了 Codex 供应商通过 Iron 端到端跑通时发现的两个前端代理问题：WebSocket 握手未完成和上游帧结构丢失。该 PR 目标是 `feat/iron-proxy-gateway` 分支，将由 @zvi-fried 合并进 #3817，直接推动 Iron Proxy 网关功能的完善。
- **[#3836 [CLOSED] ci(registry-skills): bound the skill test jobs at 20 minutes](https://github.com/nanocoai/nanoclaw/pull/3836)** — 将 registry-skills 测试任务的上限设为 20 分钟，防止挂起的 `bun test` 占用 runner 直到 GitHub 6 小时默认时限。这是对 #3839 所暴露问题的直接运维加固。
- **[#3824 [CLOSED] refactor(gateway): add provider credential connections](https://github.com/nanocoai/nanoclaw/pull/3824)** — 添加共享的凭证连接接口，允许代理供应商在不拥有网关管理 API 的情况下描述认证方式。这是为 #3815 做的基础铺垫。

此外，有 25 条 PR 仍在待合并状态，其中多条标注 `core-team` 的 PR（#3815、#3817、#3781 等）在今日有更新，说明主干功能的开发仍在持续推进。项目整体处于 **网关抽象层重构 + 技能生态扩展** 的前进轨道上。

## 4. 社区热点

今日评论数数据缺失（均显示 undefined），但以下 PR/Issue 因多方关注或编辑活跃值得注意：

- **[#3839 [OPEN] registry-skills: add-opencode reapply pass hangs in bun test until the 6-hour cancel](https://github.com/nanocoai/nanoclaw/issues/3839)** — 核心 CI 挂起 Bug，被标记为 `triage/unresolved` 和 `triage/needs-repro`，是当前最受关注的稳定性问题。
- **[#3842 [OPEN] [hardening] upload-trace still runs curl through Bun's spawnSync, which can wedge the poll loop](https://github.com/nanocoai/nanoclaw/issues/3842)** — 被标记为 `[hardening]` 的加固议题，指出同一根因（`spawnSync`）仍存在于 upload-trace 工具中，说明社区或维护者对 Bun 的 `spawnSync` 已有系统性质疑。
- **[#3841 [OPEN] fix(opencode): run the memory hook with async spawn so bun test cannot wedge](https://github.com/nanocoai/nanoclaw/pull/3841)** — 针对上述问题的修复 PR，由 @glifocat 提交，并已在描述中指明 #3839 的根因。

**诉求分析**：集中在 **CI 基础设施的可靠性** 上。六小时挂起对开源项目的自动化验证是致命打击，社区期望的是彻底规避 Bun `spawnSync` 在 CI 场景下的使用，而非仅靠超时兜底。这也解释了为何 #3842 特意标注 `[hardening]`——防止同类问题在其他代码路径上复发。

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| **P1 - 阻断CI** | [#3839](https://github.com/nanocoai/nanoclaw/issues/3839) | `add-opencode` 的 reapply pass 在 bun test 中挂起直到 6 小时取消，根因是 Bun 1.4.0 `spawnSync` 丢失子进程退出事件并 100% CPU 空转（oven-sh/bun#34069） | 已有修复 PR [#3841](https://github.com/nanocoai/nanoclaw/pull/3841) |
| **P1 - 风险延续** | [#3842](https://github.com/nanocoai/nanoclaw/issues/3842) | 加固项：#3841 修复后，upload-trace 仍通过 Bun 的 `spawnSync` 运行 curl，可能再次 wedge 轮询循环 | OPEN，暂无对应 PR |
| **P2 - 安装缺陷** | PR [#3844](https://github.com/nanocoai/nanoclaw/pull/3844) | `setup.sh` 的 pnpm-install 回退在 Linux 发行版包安装 Node.js 时永久失败（EACCES），Fedora 43 可复现 | 已有修复 PR 待合并 |
| **P3 - 测试脆弱** | [#3803](https://github.com/nanocoai/nanoclaw/pull/3803) | webhook 恢复测试使用随机端口可能已被占用，导致 `EADDRINUSE` + `ECONNREFUSED` 的偶发失败 | 修复 PR 已提交 |

## 6. 功能请求与路线图信号

今日无新的功能请求 Issue，但 PR 动态清晰地展示了项目路线图方向：

- **Iron Proxy 网关成为下一版本核心候选**：一组相互关联的 PR（[#3817](https://github.com/nanocoai/nanoclaw/pull/3817) 添加 Iron Proxy 网关技能、[#3818](https://github.com/nanocoai/nanoclaw/pull/3818) 简化 setup 中的网关选择、[#3825](https://github.com/nanocoai/nanoclaw/pull/3825) OpenCode 通过 Iron Proxy 认证、[#3815](https://github.com/nanocoai/nanoclaw/pull/3815) 集中化凭证网关契约）均在今日有更新，表明该功能正在快速收尾。
- **Tools-only 交付模式**（[#3781](https://github.com/nanocoai/nanoclaw/pull/3781) 和 [#3713](https://github.com/nanocoai/nanoclaw/pull/3713)）：为无法稳定输出 final-text 信封的供应商提供纯工具交付模式，是面向供应商兼容性的重要增强。
- **GitHub 集成技能扩展**：[#2301](https://github.com/nanocoai/nanoclaw/pull/2301) 新增轮询模式，允许 NAT/防火墙后的操作者无需开放入站端口即可使用 GitHub 集成。
- **AWS 凭证代理集成**：[#2634](https://github.com/nanocoai/nanoclaw/pull/2634) 添加 `add-paws4claws` 操作技能，将 AWS 凭证代理守护进程集成到 NanoClaw。

这些 PR 若合并，下一版本将具备更完善的网关抽象、凭证管理、安装体验改进和供应商适配能力。

## 7. 用户反馈摘要

由于今日 Issues 和 PR 均无评论，以下反馈摘自 Issue/PR 描述中的一手信息：

- **开发者痛点（环境差异化）**：[#3844](https://github.com/nanocoai/nanoclaw/pull/3844) 的作者明确描述了 Fedora 43 用户使用发行版包管理器安装 Node.js 后，`setup.sh` 因权限问题永久失败，且 `sudo` 重试机制无效。这是 **Linux 发行版碎片化** 对安装脚本的典型挑战。
- **开发者对 Bun 稳定性的不信任**：[#3839](https://github.com/nanocoai/nanoclaw/issues/3839) 和 [#3842](https://github.com/nanocoai/nanoclaw/issues/3842) 连续指出 Bun `spawnSync` 的缺陷，且 #3842 特意标注 `[hardening]` 强调 upload-trace 仍在使用该 API，说明维护者对 Bun 运行时在 CI 场景下的可靠性已有关切。
- **WhatsApp 通道体验优化**：PR [#3752](https://github.com/nanocoai/nanoclaw/pull/3752) 和 [#3751](https://github.com/nanocoai/nanoclaw/pull/3751) 持续优化 WhatsApp 通道（保持所有 pending 问题可回答、忽略 @newsletter JID 入站消息），显示出真实的用户使用场景中，群聊/新闻账号噪音和会话持续性是需要解决的现实问题。

## 8. 待处理积压

以下 PR/Issue 长期未合并或未响应，按待处理时长排序：

1. **[#101 [CLOSED] Add GitHub integration skill](https://github.com/nanocoai/nanoclaw/pull/101)** — 创建于 2026-02-06，历时 7 个月后今日被关闭，标记为 `Status: Needs Review`。此 PR 已被 #2301 等后续 PR 取代，建议维护者确认最终合并状态并清理标签。
2. **[#2301 [OPEN] feat(add-github): polling mode, git access question, safe OneCLI secret merge](https://github.com/nanocoai/nanoclaw/pull/2301)** — 创建于 2026-05-06，已 4 个月未合并。轮询模式对 NAT/防火墙场景有明确价值，且作者持续在更新 PR，建议维护者安排评审。
3. **[#2634 [OPEN] feat: add add-paws4claws skill](https://github.com/nanocoai/nanoclaw/pull/2634)** — 创建于 2026-05-28，已 3 个多月。AWS 凭证代理集成对 AWS 用户是实用的能力，但可能受限于当前 Iron Proxy 网关工作的优先级。
4. **[#2681 [OPEN] fix(service): skip linger on per-home-encrypted systems](https://github.com/nanocoai/nanoclaw/pull/2681)** — 创建于 2026-06-03，修复系统级 systemd linger 对加密 home 目录的不兼容问题。该问题影响特定安全配置的用户群体，已超过 3 个月未获关注。

---

**项目健康度评估**：NanoClaw 当前处于 **核心架构重构（网关抽象）与基础设施加固并行** 的高活跃阶段。核心团队对 CI 挂起问题响应迅速（#3839 → #3841 修复间隔不足一天），项目生命力较强。但需注意：长期积压 PR 数量较多（最早可追溯至 5 月），且今日关闭的 PR 中有 7 个月历史的老 PR（#101），建议维护者定期清理积压，避免社区贡献者的积极性受挫。

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

过去24小时无活动。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-17

## 1. 今日速览

昨日项目更新量较大（27 条 Issue/PR 变更），但整体呈现**存量清理**特征：9 条 Issues 与 12 条 PR 全部为带 `stale` 标记的历史条目（创建于 3 月底，9 月 16 日批量关闭），**无新开 Issue、无待合并 PR、无新版本发布**。实质性进展集中在 3 个新合并的 PR（#2690、#2689、#2688），围绕 OpenClaw 修复流程的可靠性、配置迁移顺序与代理认证策略展开。综合来看，项目处于**维护整理期**，开发活跃度中等，核心贡献者集中在 OpenClaw 集成层优化，而社区反馈的高优先级功能/修复此前已完成并在此轮收尾。

## 2. 版本发布

过去 24 小时内无新版本发布。当前版本对应的 Release 信息暂无更新。

## 3. 项目进展

今日合入的 3 个 PR 聚焦 OpenClaw 深度集成的可靠性，项目在**故障自愈链路**和**上游认证容错**两个方向有所推进。

- **[#2690] feat(openclaw): add repair snapshot rollback and agent media migration handling**（作者：@fisherdaddy）
  按修复阶段（preparation/snapshot/doctor/configuration/gateway）跟踪 Quick Repair 失败点，并支持从修复前快照回滚。将共享错误消息解析提取至 `openclawRepair.ts`，新增独立 UI 状态展示修复进度。提升了用户运行修复工具时的可观测性与安全性。
  链接：https://github.com/netease-youdao/LobsterAI/pull/2690

- **[#2689] feat(openclaw): migrate shared state schema before startup repair**（作者：@fisherdaddy）
  新增 prepare-startup 兼容模式，在 Doctor/配置修复之前先行备份并迁移 OpenClaw SQLite 状态 schema，避免旧版配置迁移在隔离环境中执行，且不再依赖可读且格式良好的配置文件。修复了启动修复顺序对配置文件的隐式依赖。
  链接：https://github.com/netease-youdao/LobsterAI/pull/2689

- **[#2688] fix(auth): bypass LobsterAI proxy credential cooldowns**（作者：@Mind-Hand）
  上游模型认证/计费故障可能导致共享 `lobsterai-server` 代理凭证被禁用长达五小时，进而阻塞后续所有请求。此 PR 将受管 provider 从 OpenClaw 凭证冷却机制中豁免，并区分上游服务故障与用户侧问题。减少了单点故障对多模型服务的影响。
  链接：https://github.com/netease-youdao/LobsterAI/pull/2688

**项目进步评估**：三个 PR 分别修复了「修复工具本身的恢复能力」「启动修复的时序依赖」「共享代理的单点故障」三个层面的可靠性问题，OpenClaw 集成的健壮性得到可见增强。

## 4. 社区热点

今日关闭的 9 条 Issues 评论数均为 2-3 条，整体热度偏低，讨论最集中的条目是：

- **[#1112] [Bug] 表格 Table 的顶部和底部，有不明意义的留白** — 3 条评论
  用户 @Toreant 提交了问题截图与期望截图，明确对比视觉差异，是典型的 UI 细节反馈。
  链接：https://github.com/netease-youdao/LobsterAI/issues/1112

另一个值得关注的现象是：**今日关闭的 Issues/PRs 中，有 8 条来自同一位贡献者 @MaoQianTu**（涵盖 IM 并发竞态、钉钉路由前缀、定时任务重入、键盘快捷键、会话 Retry 等功能/修复），且每条都有对应的实现 PR。这说明该贡献者在 3 月底集中提交了一批高质量的改进，今日被批量关闭（很可能已合入或判定为过期）。社区诉求集中在**并发正确性**与**交互效率**两个主题上。

## 5. Bug 与稳定性

今日关闭的陈旧 Bug 中，以下问题按严重程度排列，且大多已有对应修复 PR：

| 严重度 | Issue | 问题描述 | 修复 PR |
|--------|-------|----------|---------|
| 🔴 高 | [#1099](https://github.com/netease-youdao/LobsterAI/issues/1099) | IM 消息并发导致重复会话创建和消息响应丢失 | [#1100](https://github.com/netease-youdao/LobsterAI/pull/1100) |
| 🔴 高 | [#1107](https://github.com/netease-youdao/LobsterAI/issues/1107) | 定时任务 pollOnce() 无重入保护，stopPolling() 后仍发送幽灵事件 | [#1108](https://github.com/netease-youdao/LobsterAI/pull/1108) |
| 🟠 中 | [#1105](https://github.com/netease-youdao/LobsterAI/issues/1105) | 钉钉定时任务 IM 通知因 conversationId 带前缀无法送达 | [#1106](https://github.com/netease-youdao/LobsterAI/pull/1106) |
| 🟠 中 | [#1096](https://github.com/netease-youdao/LobsterAI/issues/1096) | md 转 pdf 时在线服务打开三个浏览器页面且结果中多余会员框 | 未见明确修复 PR |
| 🟡 低 | [#1112](https://github.com/netease-youdao/LobsterAI/issues/1112) | 表格顶部底部异常留白（CSS 问题） | [#1122](https://github.com/netease-youdao/LobsterAI/pull/1122) |
| 🟡 低 | [#1139](https://github.com/netease-youdao/LobsterAI/issues/1139) | 新建重名 agent 后任务记录未自动刷新 | 未见明确修复 PR |
| 🟡 低 | [#1124](https://github.com/netease-youdao/LobsterAI/issues/1124) | 退出登录后安装新版仍弹出「Lobster AI 无法关闭」 | 未见明确修复 PR |

其他在陈旧 PR 中体现的稳定性修复（同样在今日关闭）：
- [#1127](https://github.com/netease-youdao/LobsterAI/pull/1127) fix(mcp): 取消 stop() 中的强制关闭定时器，防止误关新 server 连接
- [#1130](https://github.com/netease-youdao/LobsterAI/pull/1130) fix(api): 修复 Anthropic SSE 流式解析未行缓冲导致的数据丢失（Closes #922）
- [#1101](https://github.com/netease-youdao/LobsterAI/pull/1101) fix(cowork): 修复跨 provider 切换模型后立即发消息的竞态条件

**稳定性评价**：本轮批量清理的 Bug 覆盖了并发、流式解析、定时器泄漏、UI 细节等维度，且大部分已有对应修复 PR 同步合入，项目对社区报告的响应链路较为完整。

## 6. 功能请求与路线图信号

今日关闭的功能请求均来自 3 月底的集中提交，且已全部有对应实现 PR：

| 功能请求 | PR 实现 | 状态 |
|----------|---------|------|
| [#1117](https://github.com/netease-youdao/LobsterAI/issues/1117) 工具权限弹窗支持键盘快捷键（Enter/Escape） | [#1119](https://github.com/netease-youdao/LobsterAI/pull/1119) | 已实现 |
| [#1120](https://github.com/netease-youdao/LobsterAI/issues/1120) 会话出错后一键 Retry 重发最后一条消息 | [#1121](https://github.com/netease-youdao/LobsterAI/pull/1121) | 已实现 |

在陈旧 PR 中沉淀的增强功能（未来版本候选）：
- [#1125](https://github.com/netease-youdao/LobsterAI/pull/1125) feat(cowork): 会话内容全文搜索与关键词高亮 — 扩展搜索维度，提升历史会话检索效率
- [#1103](https://github.com/netease-youdao/LobsterAI/pull/1103) feat(settings): Docker 沙箱就绪探测与状态 UI — 降低 OpenClaw 工具执行的配置门槛
- [#1138](https://github.com/netease-youdao/LobsterAI/pull/1138) feat(cowork): 工具调用错误高亮 + 跳转最新消息按钮 — 优化会话可读性

**路线图信号**：交互效率类功能（快捷键、Retry、搜索）是社区持续贡献的方向，且均已具备实现，预计将在下一个版本中随 Release 发布。

## 7. 用户反馈摘要

从今日关闭的 Issues 评论中提炼的真实用户声音：

- **安装体验痛点**：@liangshuang24yy-bit 反馈即使完全退出并注销 Lobster，安装新版时仍会弹出「Lobster AI 无法关闭」对话框（[#1124](https://github.com/netease-youdao/LobsterAI/issues/1124)）。这可能是安装器检测进程的残留逻辑缺陷，影响升级体验。
- **在线转换服务不满**：@buzhishishi 对 md 转 pdf 功能提出两点不满：一是转换过程会打开三个浏览器页面且不自动关闭，二是在线服务页面中混入了会员推广框（[#1096](https://github.com/netease-youdao/LobsterAI/issues/1096)）。用户期待的是干净、自动化的本地转换体验。
- **数据一致性困惑**：@tzhouzhou 发现新建重名 agent 后，界面已切换但任务记录为空，需切换后再切回才能正常显示（[#1139](https://github.com/netease-youdao/LobsterAI/issues/1139)）。属于典型的状态同步延迟问题，影响用户对数据可靠性的信任。
- **视觉细节关注**：@Toreant 对表格留白问题提交了精确的截图对比（[#1112](https://github.com/netease-youdao/LobsterAI/issues/1112)），说明用户对 UI 细节品质有期待。

总体反馈积极：用户愿意提交带截图、可复现步骤的详细报告，社区参与质量较高。

## 8. 待处理积压

当前积压状态健康：**无待合并 PR、无长期未响应 Issue、无新开 Issue 积压**。今日 9 条 Issues 和 18 条 PR 全部关闭，历史积压已基本清空。

值得关注的现象是：大量陈旧 Issue/PR 在同一天被批量关闭（更新日期均为 2026-09-16），可能由维护者手动清理或 stale bot 自动标记。建议维护者注意：

1. **已关闭但可能未合入的 PR**：部分 stale PR（如 #1100、#1108、#1106、#1119、#1121 等）对应的修复内容是否已进入主干？若未合入，建议在关闭前明确标注「已合入」或「被 superseded」，避免贡献者困惑。
2. **以下问题在关闭时未见关联 fix PR**，若问题仍存在于最新版本，建议重新打开或建立后续跟踪：
   - [#1124](https://github.com/netease-youdao/LobsterAI/issues/1124) 安装时误报「Lobster AI 无法关闭」
   - [#1139](https://github.com/netease-youdao/LobsterAI/issues/1139) 重名 agent 任务记录不刷新
   - [#1096](https://github.com/netease-youdao/LobsterAI/issues/1096) md 转 pdf 在线服务体验问题
3. **PR #1090（CoworkRunner 并发保护）** 虽为 stale 关闭，但其描述的问题（流式消息损坏/重复）在 [#1099](https://github.com/netease-youdao/LobsterAI/issues/1099) 中已有替代修复（#1100），建议确认两者是否同一问题，避免修复遗漏。

---

*本日报由 AI 分析师基于 GitHub 公开数据自动生成，数据截至 2026-09-17 00:00 UTC。*

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报 —— 2026-09-17

## 今日速览
过去 24 小时项目整体活跃度中等：新增/活跃 Issue 1 条，关闭 Issue 1 条；新 PR 1 条，另有 1 条 PR 进入待合并队列、1 条长期 PR 被关闭（合并或放弃）。无新版本发布。社区焦点集中在沙箱（sandbox）配置能力的扩展与构建缓存优化上；MCP 服务器稳定性问题有新的真实用户报告，值得维护者关注。

## 版本发布
过去 24 小时无新版本发布。

## 项目进展
- **PR #926 关闭**（feat: add /btw, /fast, /insights, /steer, /queue commands and auxiliary model config）

  创建于 2026-04-29，历时近 5 个月后于 2026-09-16 关闭。该 PR 引入 5 个新的斜杠命令和辅助模型配置框架，明显扩展了聊天交互能力。这是近期较大的功能面推进，关闭意味着相关工作已进入收尾（合并或放弃），建议后续关注 release notes 确认功能是否落地。
  https://github.com/moltis-org/moltis/pull/926

- **PR #1272 待合并**（feat(sandbox): per-agent mounts, run_as and a forced sandbox）

  新增 per-agent 的沙箱配置：`sandbox.mounts`（额外宿主挂载）、`sandbox.run_as`（容器运行身份 uid:gid）、`sandbox.force`（禁止该智能体在沙箱外运行）。这将使多智能体场景下的隔离策略更灵活，属于架构级增强。
  https://github.com/moltis-org/moltis/pull/1272

- **PR #1270 待合并**（feat(build): cache cargo across image builds, and script building the image）

  将 cargo 的 target 目录和 crate registry 改为 BuildKit 缓存挂载，避免每次镜像构建全量重编依赖树。对 CI 和本地构建体验优化明显。
  https://github.com/moltis-org/moltis/pull/1270

## 社区热点
- **Issue #1271**（远程 MCP 服务器启动失败后永不重试）是本日新开的唯一 Issue，暂无评论，但问题描述非常具体：`McpManager::start_enabled` 在启动失败后直接放弃，且健康监控只对状态变化的服务器重启，导致后续所有调用均失败。这触及网关层健壮性的核心，虽评论少但潜在影响大。
  https://github.com/moltis-org/moltis/issues/1271

- **Issue #1246**（沙箱添加节点后无法运行）是今日唯一有评论的 Issue（1 条评论），已在 09-16 被关闭。该问题从 08-28 持续了约三周，关闭说明已得到处理。沙箱相关话题连续出现在 Issue 和 PR 中，说明该模块是当前用户关注的集中点。
  https://github.com/moltis-org/moltis/issues/1246

## Bug 与稳定性
按影响面排序：

1. **远程 MCP 服务器启动失败后永不重试，且会话丢失导致后续调用全部失败**（#1271，OPEN，严重）

   - 用户环境：Moltis 20260913.02，远程 MCP over streamable HTTP
   - 问题性质：启动失败不可自愈，且状态机设计缺陷（仅"状态变化"才触发重启）会污染后续所有调用
   - 目前无关联 fix PR，建议优先排查 `crates/gateway/src/mcp_health.rs` 的重试逻辑
   https://github.com/moltis-org/moltis/issues/1271

2. **沙箱添加节点后无法运行**（#1246，CLOSED）

   - 问题已关闭，但无公开评论说明是否为修复关闭。建议关注相关 commit 或 release，确认 root cause 已解决
   https://github.com/moltis-org/moltis/issues/1246

## 功能请求与路线图信号
- **沙箱 per-agent 配置**（PR #1272）是明显的路线图信号：用户需要按智能体差异化设置挂载、运行身份和强制沙箱策略。结合刚关闭的沙箱相关 Issue #1246，可以判断沙箱模块正在经历密集的功能补强，大概率进入下一版本。
  https://github.com/moltis-org/moltis/pull/1272

- **构建缓存优化**（PR #1270）虽属开发者体验范畴，但为后续高频构建、CI 加速扫清障碍，可能为更频繁的发布节奏铺路。
  https://github.com/moltis-org/moltis/pull/1270

- **辅助模型配置**（PR #926）作为功能脚手架，未来可能支撑更多"轻量模型处理侧任务"的特性，值得关注后续演进方向。
  https://github.com/moltis-org/moltis/pull/926

## 用户反馈摘要
本日可提炼的用户反馈有限，主要来自两个 Issue：

- **沙箱可用性痛点**（#1246）：用户反馈在沙箱中添加节点后整个沙箱无法运行，说明沙箱的运行时变更能力还不够稳健。该问题已关闭，但用户的具体场景和复现步骤值得维护者复盘，避免同类回归。
  https://github.com/moltis-org/moltis/issues/1246

- **MCP 服务器故障自愈缺失**（#1271）：用户描述的场景非常贴近生产实践——一个 MCP 服务器启动失败后，系统不会自动重试，且失败状态会"传染"给后续所有调用。用户对故障行为观察细致（指出 `McpManager::start_enabled` 和 `mcp_health.rs` 的具体逻辑），说明 Moltis 的 MCP 网关层在当前实现下对上游故障过于脆弱。
  https://github.com/moltis-org/moltis/issues/1271

## 待处理积压
- **PR #926 长期未合并后关闭**：从 4 月 29 日到 9 月 16 日，跨度近 5 个月才关闭，期间应有大量 review 沟通或搁置。提醒维护者核实该 PR 是否被合并，避免功能"蒸发"。
  https://github.com/moltis-org/moltis/pull/926

- **PR #1270 与 PR #1272 等待合并**：两项 PR 均为 9 月中下旬创建，等待期尚短，但都是直接提升可用性的变更，建议维护者尽快安排 review。
  https://github.com/moltis-org/moltis/pull/1270
  https://github.com/moltis-org/moltis/pull/1272

- **Issue #1271 无任何响应**：作为 09-16 新开的严重问题，当前评论数为 0。建议至少添加 `bug` / `MCP` 标签并确认优先级，避免用户等待过久。
  https://github.com/moltis-org/moltis/issues/1271

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-17

## 今日速览

过去 24 小时项目活跃度较高：Issue 更新 17 条（新开/活跃 11，关闭 6），PR 更新 36 条（待合并 24，合并/关闭 12），无新版本发布。社区讨论焦点集中在 **QwenPaw Hub 多租户版本的路线图规划**（#7318 累计 29 条评论），Console 前端稳定性和 SSE 流健壮性成为近期 Bug 报告集中区。值得关注的是，已合入的 PR 覆盖了聊天队列稳定性、统一工作台外壳、ACP 体验改进及安全默认加固等多个方向，项目整体处于**功能推进与稳定性修复并行**的健康节奏。

---

## 项目进展

过去 24 小时共合并/关闭 12 个 PR，其中与产品功能、稳定性直接相关的关键合并如下：

### 🎯 聊天与前端体验

- **[#7382] feat(chat): adapt AgentScopeRuntimeWebUI 1.2 and stabilize queues**（已合并）  
  修复了空白对话首条消息发送后切走再返回时的会话串扰问题，并确保自定义取消操作会先请求后端 Stop 再终止本地 SSE，避免队列状态不一致。
  https://github.com/agentscope-ai/QwenPaw/pull/7382

- **[#7790] feat(console): add unified chat workbench shell**（已合并）  
  引入会话级、可调整宽度的右侧工作台外壳（Workbench），将 Files/Changes/Terminal/Tools 等能力改为可配置的闭合标签页，默认保持轻量加载。
  https://github.com/agentscope-ai/QwenPaw/pull/7790

### 🔌 ACP 与插件体系

- **[#7783] fix(ACP): Improves the experience of delegating work to external ACP runners**（已合并）  
  修复 ACP 回复被重复发送（增量 + 全文各一次）及碎片化的问题，提升外部 ACP runner 协作体验。
  https://github.com/agentscope-ai/QwenPaw/pull/7783

### 🛡️ 安全加固

- **[#7120] security: enable shell evasion checks by default + regression test**（已合并）  
  将全部 7 项 shell 逃逸检测（命令替换、混淆 flags、反斜杠转义空白等）从默认关闭改为默认开启，并增加了回归测试，显著加固了对恶意 shell 命令的防御基线。
  https://github.com/agentscope-ai/QwenPaw/pull/7120

### 🧠 知识管理

- **[#4171] feat: add memory-distill tool plugin with title-diffing distillation engine**（已合并）  
  新增记忆蒸馏工具插件，基于标题差异对比引擎，可从每日笔记中识别真正的新信息，宣称约 92% 噪声消减率，补齐了长期记忆整合能力。
  https://github.com/agentscope-ai/QwenPaw/pull/4171

> **整体评估**：上述合并推动了聊天队列稳定性、控制台可扩展性、ACP 协作体验、默认安全水位和记忆管理五条线的实质性进展，尤其是 #7382 和 #7120 对生产环境的稳定性与安全有直接正向影响。

---

## 社区热点

### 🔥 讨论焦点

- **[#7318] [Discussion] QwenPaw Hub 多租户版将于 2.2.0 推出：你希望我们接下来做什么？**（29 条评论，👍 4）  
  作者 @rayrayraykk 在帖子中汇总了社区对多用户访问、管理端技能、团队协作的长期诉求，并公开征集 Hub 下一步建设意见，是当前社区路线图讨论的核心锚点。
  https://github.com/agentscope-ai/QwenPaw/issues/7318

- **[#6318] [Feature] 支持按 conversation 级别指定模型，而非仅绑定 agent**（7 条评论）  
  社区对"每个对话可独立选模型"的诉求持续累积，涉及后端配置模型、前端 UI 与 SDK 三端联动，属于高频工作流需求。
  https://github.com/agentscope-ai/QwenPaw/issues/6318

- **[#7722] [Bug] 内存耗尽经三条路径复合加剧**（5 条评论）  
  该 Issue 以受控复现和最小修复方案详细拆解了容器 OOM 的三种叠加路径，引发了对长驻服务内存治理的讨论。
  https://github.com/agentscope-ai/QwenPaw/issues/7722

### 📌 诉求分析

社区当前最强烈的三个信号：**①团队化/多租户部署**（#7318）；**②对话级模型灵活配置**（#6318）；**③长驻服务稳定性**（#7722、#7813、#7815 等）。三者分别对应 Hub 商业化路径、专业用户工作流效率和自托管可靠性，是后续版本优先级的有效参考。

---

## Bug 与稳定性

按严重程度降序排列：

### 🔴 严重

- **[#7722] 内存耗尽 — 无界流缓冲区 + keep-alive 实例堆积 + doomb-loop gate 绕过（受控复现 + 最小修复）**  
  容器内内存以约 1MB/s 速率持续增长直至 OOM，作者定位为三条复合路径而非单一缺陷，是当前最严重的稳定性报告。目前已有修复 PR **[#7808]**（DoomLoopGate 接受 dict 类型 stages）部分覆盖路径 C，另需跟进 stream buffer 与 keep-alive 实例的治理。
  https://github.com/agentscope-ai/QwenPaw/issues/7722
  https://github.com/agentscope-ai/QwenPaw/pull/7808

- **[#7813] Console 流式对话在 SSE 帧为裸 `null` 字面量时永久冻结**  
  单个畸形 SSE 帧即可中断整个流式回合，且异常仅被记录、不会终止客户端响应，用户侧表现为对话"卡死"。
  https://github.com/agentscope-ai/QwenPaw/issues/7813

- **[#7815] Console 无法从懒加载页面块加载失败中恢复，所有导航停留于错误屏**  
  懒加载页面失败后，重试机制无法成功，错误边界也未能重置，只能整页刷新，严重降低 Console 可用性。
  https://github.com/agentscope-ai/QwenPaw/issues/7815

### 🟡 中等

- **[#7814] Console SSE: `_strip_event_headlines` 可能输出裸 `null` payload，且失败时无终止事件**  
  与 #7813 同源，属于 SSE 链路的健壮性缺口，需在序列化层和流终止层双端修复。
  https://github.com/agentscope-ai/QwenPaw/issues/7814

- **[#7812] 桌面端启动后立即输入斜杠命令作用于 fallback 会话（/compact 报告空内存）**  
  竞态条件导致启动初期斜杠命令绑定到错误的会话上下文。
  https://github.com/agentscope-ai/QwenPaw/issues/7812

- **[#7720] Creator 将提示词同步阻塞器隐藏在 GATED 之后，且缺少手动图片接受入口**  
  用户无法从场景图推进到分镜图，产品只报告 `BLOCKED / GATED`，隐藏了真实阻塞原因。
  https://github.com/agentscope-ai/QwenPaw/issues/7720

- **[#7693] Creator 多图生成期间点击「审核通过」中断执行中图片任务且不重新调度，任务永久卡在 RUNNING**  
  并发槽释放与任务调度的衔接缺陷，导致任务状态永久悬挂。
  https://github.com/agentscope-ai/QwenPaw/issues/7693

- **[#7726] ACP `trusted: true` 静默回退到交互式提示 — `_pick_allow_option` 仅匹配 `allow_*` optionId**  
  用户期望信任模式完全自动化，但实际仍弹出批准请求，影响 ACP 无人值守场景。
  https://github.com/agentscope-ai/QwenPaw/issues/7726

> **修复 PR 对应情况**：#7722 部分对应 #7808；#7813/#7814 暂无明确修复 PR；其余均处于待修复状态。建议优先推进 SSE 链路（#7813/#7814）与 Creator 调度（#7693）的修复。

---

## 功能请求与路线图信号

### 🗺️ 路线图明确信号

- **[#7318] QwenPaw Hub 多租户版即将在 2.2.0 推出** — 社区正在为 Hub 的下一步建设投票/提建议，结合已开放的 PR **#7779**（feat(hub): add model gateway, member governance and usage dashboard），Hub 正在从"个人助手"向"团队模型网关 + 成员治理 + 用量看板"演进，组织级模型发布和密钥托管能力已进入实现阶段。
  https://github.com/agentscope-ai/QwenPaw/issues/7318
  https://github.com/agentscope-ai/QwenPaw/pull/7779

### ✨ 高潜功能请求

- **[#6318] 按 conversation 级别指定模型** — agent 设默认模型，对话级可覆盖。该需求已累计 7 条评论，是"专业用户工作流"类呼声最高的功能之一，预计有望在后续版本中纳入配置模型重构。
  https://github.com/agentscope-ai/QwenPaw/issues/6318

- **[#7809] Tool approval 卡片与通知硬编码英文 — 增加 i18n 支持** — 中文等多语言环境下，高风险工具调用的审批卡片和通知文本无法本地化，影响非英文用户的安全操作判断。
  https://github.com/agentscope-ai/QwenPaw/issues/7809

- **[#7817] 飞书/Lark 频道 p2p 消息 230101 错误及文件事件缺失的框架层改进建议** — 用户已给出根因分析（p2p 场景不应以 open_id 作为 receive_id），并建议框架层支持。这是飞书渠道完善度的重要信号。
  https://github.com/agentscope-ai/QwenPaw/issues/7817

### 🧩 可被现有 PR 承接的信号

- **[#7752] fix(console): make vi and pt-BR language selection work**（待合并）— 后端 `_VALID_LANGUAGES` 漏配 `vi`，前端 `pt-BR` 语言选择也存在问题，说明多语言路径此前未经过系统测试。该 PR 合并后可改善 #7809 所反映的本地化基础架构。
  https://github.com/agentscope-ai/QwenPaw/pull/7752

---

## 用户反馈摘要

- **上下文管理设置"爆表"**（#7810）：用户反馈在模型中设置了 131k 上限，但每次提交会话实际都直接飙到 271k，压缩阈值设为 0.5 也不触发压缩，且网络中断会导致压缩选项丢失。用户称"我问了 QwenPaw 机器人，也问 AI 了，都没有解决"。这暴露出上下文管理设置的可用性和文档存在明显短板。
  https://github.com/agentscope-ai/QwenPaw/issues/7810

- **云端部署配置困惑**（#7768）：用户询问 GitHub 账号绑定后的活跃度要求、资料完善后的重新申请等待时长，并建议文档补充说明。新用户上手流程的信息透明度有待提升。
  https://github.com/agentscope-ai/QwenPaw/issues/7768

- **频道参数透传 MCP 工具的需求**（#7650）：用户希望频道请求 JSON 顶层数据（如电话号码、工号）能够透传给 MCP 工具，并强调"原则是不让 LLM 来传，因为 LLM 来传会有被改写的风险"。这是对数据安全与链路完整性的明确诉求。
  https://github.com/agentscope-ai/QwenPaw/issues/7650

- **Hub 多租户呼声**（#7318）："QwenPaw started as a personal AI assistant, but the community has repeatedly asked for a better way to run it for a team" — 社区对团队化运行模式的渴望已反复出现，Hub 的推出是对该声音的直接回应。

---

## 待处理积压

### ⚠️ 长期未合并 PR（按等待时长排序）

| PR | 主题 | 创建时间 | 状态 | 备注 |
|---|---|---|---|---|
| [#4171](https://github.com/agentscope-ai/QwenPaw/pull/4171) | memory-distill 工具插件 | 2026-05-10 | ✅ 已合并 | 今天终于合入，此前等待超 4 个月 |
| [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) | 修复 Playwright driver 死连接无法自愈 | 2026-08-07 | 🔄 待合并 | "die once, dead forever" 严重健壮性问题 |
| [#7067](https://github.com/agentscope-ai/QwenPaw/pull/7067) | 控制台路由从 /chat/:sessionId 改为 /chat/:agentId/:sessionId | 2026-08-16 | 🔄 待合并 | 多 agent 场景深链定位问题 |
| [#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211) | 防止注入上下文被持久化为用户可见聊天历史 | 2026-08-21 | 🔄 待合并 | 涉及数据隐私，值得优先关注 |
| [#6969](https://github.com/agentscope-ai/QwenPaw/pull/6969) | 修复 MCP 工具返回 structuredContent 时结果重复 | 2026-08-13 | 🔄 待合并 | 影响工具调用结果准确性 |
| [#7057](https://github.com/agentscope-ai/QwenPaw/pull/7057) | shell 子进程 PATH 增加用户本地 bin 目录 | 2026-08-15 | 🔄 待合并 | systemd/Docker 下用户 CLI 不可用问题 |

### ⏳ 长期未关闭 Issue

- **[#6318] 按 conversation 指定模型**（2026-07-21 创建，已近 2 个月，7 条评论无 assignee）
  https://github.com/agentscope-ai/QwenPaw/issues/6318

### 📌 维护者提醒

1. **#6776（Playwright 永久死锁）** 属于"一次死，永远死"级健壮性缺陷，等待已超 40 天，建议优先合并。
2. **#7211（注入上下文被持久化为用户消息）** 涉及数据隐私与上下文污染，长时间搁置可能积累技术债。
3. **#7722（内存三条复合路径）** 作为当前最活跃的高严重度 Bug，建议在下一个 patch 版本中至少合入 #7808 并启动对另外两条路径的修复。
4. **#7768 中的文档建议** 成本极低但能显著改善新用户云部署体验，可随手合入。

:::
