---
title: "OpenClaw 生态日报"
date: 2026-07-21
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# OpenClaw 生态日报 2026-07-21

> Issues: 133 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-07-21 00:36 UTC

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

好的，这是根据您提供的 OpenClaw 项目 GitHub 数据生成的 2026-07-21 项目动态日报。

---

## OpenClaw 项目动态日报 | 2026-07-21

### 1. 今日速览

过去 24 小时，OpenClaw 项目呈现出**极高强度的社区活跃度**，共处理 **133 条 Issue 和 500 条 PR**，系统处于高度迭代和社区反馈释放期。尽管当日无新版本发布，但项目关闭了 13 个 Issue 和 114 个 PR，修复节奏紧凑。

讨论的核心热点集中在 **“内存安全”与“会话架构稳定性”** 两大领域，大量被标记为 `P1` 和 `Diamond Lobster`（最高严重性）的安全漏洞与数据一致性问题引发了广泛讨论。值得关注的是，高达 386 个 PR 处于“待合并”状态，项目维护团队的审查积压问题较为严峻。

### 2. 版本发布

**无。** 今日无新版本发布。

### 3. 项目进展

今日合并/关闭的关键 PR 和 Issue 主要集中在**关键 Bug 修复**与**跨平台体验统一**两个方面，显示了项目在稳定性和功能完整性上的持续推进：

- **关键 Bug 修复与自愈机制：**
  - **[核心] 会话压缩与上下文计数修复：** 关闭了三个关键的 P1 级别 Bug。
    - **#108238** 修复了 `2026.7.1` 版本中将 `cacheRead` 累计误算进 `totalTokens`，导致会话被误判为上下文超限并卡住压缩的严重问题。
    - **#107655** 修复了当聚合工具结果压力触发时，即使投影截断成功仍会强制进行压缩的 Bug。
    - **#108183** 修复了 Dashboard 会话标题因 `systemSent` 标志守卫而永远不会触发生成的回归问题。
  - **[PR #101920] 会话自愈合：** 修复了 Codex app-server 中 `reply-session-init` 冲突导致会话永久卡死的 Bug，引入了自愈逻辑，显著提升了会话韧性。

- **跨平台与多网关功能：**
  - **[PR #111932] 多网关同时连接：** 合并了支持在官方应用中同时连接多个 Gateway 的功能，解决了此前移动端独占连接、桌面端无法分窗口管理的痛点。
  - **[PR #111933] Linux 桌面端 Widget 渲染：** 为 Linux 的 Quick Chat 客户端增加了原生 Widget 渲染支持（`show_widget`），填补了该平台的功能空白。
  - **macOS 网关管理 (进行中)：** @steipete 提交了 [#111986](https://github.com/openclaw/openclaw/issues/111986) 功能 PR，旨在为 macOS 应用增加管理多个 Gateway 配置文件和独立窗口的能力，目前待维护者审查。

> 相关链接：[#108238](https://github.com/openclaw/openclaw/issues/108238)， [#107655](https://github.com/openclaw/openclaw/issues/107655)， [#108183](https://github.com/openclaw/openclaw/issues/108183)， [#101920](https://github.com/openclaw/openclaw/pull/101920)， [#111932](https://github.com/openclaw/openclaw/pull/111932)， [#111933](https://github.com/openclaw/openclaw/pull/111933)

### 4. 社区热点

今日讨论最活跃的帖子，焦点集中在 **AI Agent 的“信任边界”与“安全可控”** 上，反映出核心用户群对 Agent 安全性的深度忧虑。

- **🔥 内存攻击防御（Diamond Lobster 级）：**
  - **[#7707] 内存信任标签**（19 条评论）：社区呼吁引入“内存信任标记”机制，要求根据信息来源（用户指令、网页抓取、第三方技能）打上信任等级标签。这是对大型语言模型记忆中毒攻击的直接防御。目前该诉求已成为项目安全讨论的绝对核心。
  - **[#10659] 遮蔽密钥系统**（15 条评论，4 👍）：为防止提示注入窃取凭据，用户要求增加“遮蔽密钥”系统，让 Agent 可以**使用** API 密钥但无法**看到** API 密钥。该提案获得了极高的支持率。

- **🚧 会话架构瓶颈（Diamond Lobster 级）：**
  - **[#96975] 子代理上下文隔离**（11 条评论）：用户提出当子代理完成复杂任务（如生成大报告）时，仅仅返回“状态 + 子会话链接”，而不是将整个执行路径内容注入到父上下文中。这反映了多代理工作流在高负载下的实际性能困境。
  - **[#78562] 递归压缩循环**（9 条评论，2 👍）：一个严重破坏用户体验的 Bug。用户报告在 Telegram 中使用工具后，会话会陷入“压缩成功 → 下一轮立即溢出 → 再压缩”的无限循环。该问题直接导致 Agent 无法正常工作，社区对此非常焦虑。

- **⚡ 生态演进需求：**
  - **[#84527] 支持 Antigravity CLI（agy）**（5 条评论，11 👍）：由于 Google 宣布关闭 `gemini-cli`，社区强烈要求快速接入新的 `agy` 作为 CLI 后端，以保持与 Google AI 生态的兼容性。该请求获得了当日 **最多 👍**。

> 相关链接：[#7707](https://github.com/openclaw/openclaw/issues/7707)， [#10659](https://github.com/openclaw/openclaw/issues/10659)， [#96975](https://github.com/openclaw/openclaw/issues/96975)， [#78562](https://github.com/openclaw/openclaw/issues/78562)， [#84527](https://github.com/openclaw/openclaw/issues/84527)

### 5. Bug 与稳定性

今日报告了大量影响稳定性与安全性的 Bug，严重程度较高。部分已有修复 PR，部分仍在讨论中。

| 严重程度 | 编号 | 标题摘要 | 状态与关联 |
| :--- | :--- | :--- | :--- |
| **Critical (P1/Security)** | [#111654](https://github.com/openclaw/openclaw/issues/111654) | `runWithModelFallback` 在所有回退尝试中共享同一个 `abortSignal`，导致启动延迟被错误报告为 Provider 超时。 | **新 Bug，待审查** |
| | [#109017](https://github.com/openclaw/openclaw/issues/109017) | Anthropic Provider 模型列表是静态的，手动添加模型会崩溃，且新模型（Fable 5/Haiku 4.5）永远不会出现。 | **P1，UI/Provider 崩溃** |
| | [#86684](https://github.com/openclaw/openclaw/issues/86684) | `sessions_yield` 子代理唤醒时，即使在低上下文使用率下也会压缩父分支，导致状态损坏。 | **回归 bug，P1，待修复** |
| | [#101349](https://github.com/openclaw/openclaw/issues/101349) | Agent 创建的 Cron 任务继承了不可清除的默认 `toolsAllow` 列表，导致 `claude-cli` 后端拒绝任务。 | **P1，安全风险** |
| | [#93251](https://github.com/openclaw/openclaw/issues/93251) | Telegram 渠道会向用户泄露原始工具失败的内部错误信息，成为可靠性及安全风险。 | **P1，严重 UX 问题** |
| **High (P2)** | [#111498](https://github.com/openclaw/openclaw/issues/111498) | macOS 主 Agent 因持久的遗留 workspace-state 迁移阻塞，拒绝处理任何 Anthropic 返回的会话。 | **回归 bug，新提交** |
| | [#108215](https://github.com/openclaw/openclaw/issues/108215) | 会话上下文用量在未触发压缩的情况下，从 57% 突然下降到 13%，引发会话状态一致性担忧。 | **P2，状态异常** |
| | [#57278](https://github.com/openclaw/openclaw/issues/57278) | 用户在 Telegram 中回复机器人发送的图片时，机器人会将自身发送的图片误作“用户附件”重新处理，导致反馈循环。 | **P2，行为异常，关联 PR 待合并** |

### 6. 功能请求与路线图信号

从今日的新增和活跃功能请求来看，OpenClaw 社区的需求正在从“功能有无”转向“**企业级安全**”与“**可编程管控**”。

- **🛡️ 安全生态标准化（近期路线图信号强）：**
  - **[#12219] 技能权限清单标准**：要求为第三方 Skills 提供类似手机 App 的权限声明清单（读写文件、网络访问等），这是构建安全插件生态的关键基石。
  - **[#6792] 插件清单 ConfigPatch**：允许在安装插件时自动修改配置文件，简化配置流程。用户反馈当前“安装 → 注册 → 改配置”的多步骤流程极易出错。

- **⚙️ 运维与开发者控制（开发管线信号强）：**
  - **[#10142] `session:end` 内部钩子事件**：允许在工作流编排系统（如 Temporal）中监听会话完成事件，实现复杂的自动化流程。**已有关联修复 PR 存在。**
  - **[#9912] `maxTurns` / `maxToolCalls` 配置**：用于限制 Agent 在陷入无限思考循环时的最大迭代次数，定位解决特定模型（如 KIMI K2）忽略系统指令的问题。
  - **[#80752] CommitmentsConfig 模型覆盖**：用户希望对特定任务（如 Active Memory）指定专用模型，而不是与主模型绑定，以优化成本与延迟。

- **🌐 多 Agent 与通讯增强：**
  - **[#10467] 子代理多车道并发**：要求将子代理调度从单队列改为多车道，解决复杂多代理工作流中的瓶颈问题。
  - **[#8299] 配置选项以抑制子代理通知**：用户指出当前依赖模型回复“ANNOUNCE_SKIP”来抑制通知的机制极其脆弱，希望有硬性配置开关。

> 相关链接：[#12219](https://github.com/openclaw/openclaw/issues/12219)， [#10142](https://github.com/openclaw/openclaw/issues/10142)， [#9912](https://github.com/openclaw/openclaw/issues/9912)

### 7. 用户反馈摘要

- **痛点反馈：**
  - **模型指令遵循度差：** #8299 的用户明确指出：“抑制子代理通知的唯一办法是让模型回复 `ANNOUNCE_SKIP`，但模型**经常忽略这条系统指令**”导致信息轰炸。这表明当前系统提示词的控制力在面对不同厂商模型时波动极大。
  - **UI 交互可发现性差：** #111971 反馈 Control UI 设置页中的麦克风/摄像头权限授权按钮设计不合理，用户必须自行“发现”那个刷新按钮是权限操作入口。
  - **长链工具中的合约遗忘：** #100367 指出，在 `message_tool_only` 配置的通道中，模型在长工具链中会遗忘“必须通过消息工具交付”的路由合约，导致最终回复丢失。用户认为需要“定期提醒”机制。

- **使用场景表达：**
  - **工作流集成：** #10142 的提出者明确表示希望将 OpenClaw 集成到 Temporal 等编排系统中，将 Agent 视为工作流中的一个任务执行节点。
  - **公共演示与内容创作：** #7403 提出“隐私模式”，希望在不暴露个人 Workspace 数据的情况下进行公开演示或直播，说明了其用户群体已拓展到专业的内容创作者和演示者。

### 8. 待处理积压

- **长期未决策的重要 Issue（社区期待路线图澄清）：**
  - **[#7707] 内存信任标签（2026-02-03）** 和 **[#12219] 技能权限清单（2026-02-09）**：这两个被视为项目安全基石的功能，自今年 2 月提出并收获大量讨论后，仍处于 `needs-product-decision`（等待产品决策）和 `needs-maintainer-review`（等待维护者审查）状态，长达 5 个月的悬而未决可能挫伤社区贡献热情。

- **陷入停滞的关键 PR（审查/作者响应瓶颈）：**
  - **[#101248] 子代理原生 announceTarget 路由（@nicknmorty）**：一个高价值的增强功能，已通过充分验证，但处于“等待作者更新”（`waiting on author`）状态超过两周。
  - **[#101276] Exec 审批拒绝列表（@nicknmorty）**：企业级安全需求，同样在等待作者回应。
  - **[#89419] 明确主 Agent 绑定（@1052326311）**：修复了多 Agent 配置时的核心路由 Bug，自 6 月 2 日提交后一直处于“等待验证”（`needs proof`）状态。

- **维护者预警：**
  - **[PR #111992] “UCO_india”**：被标记为 `low-signal-docs`（低质文档）和 `blank-template`（空白模板），内容为商业广告推广。这表明项目可能开始吸引无关的低质量贡献，维护者需要警惕并考虑强化 CI 机器人或贡献门槛。

> 相关链接：[#7707](https://github.com/openclaw/openclaw/issues/7707)， [#12219](https://github.com/openclaw/openclaw/issues/12219)， [#101248](https://github.com/openclaw/openclaw/pull/101248)， [#101276](https://github.com/openclaw/openclaw/pull/101276)

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期：2026-07-21**  
**分析范围：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、CoPaw/QwenPaw、Moltis**

---

## 1. 生态全景

当前个人 AI 助手开源生态正处于 **“广度扩张 + 安全补课 + 多 Agent 工程化”** 的三期叠加阶段。头部项目（OpenClaw、CoPaw、IronClaw）在功能维度已趋于完整，但维护者审查积压与回归 Bug 频发显示高速迭代带来的稳定性成本；第二梯队（NanoBot、NanoClaw、Zeroclaw）在特定赛道（多代理协作、安全治理、评估框架）建立差异化，贡献者活跃度飙升。**安全信任（内存标签、密钥遮蔽、权限清单）和多 Agent 上下文隔离**成为跨项目集体共振的第一议题；本地推理性能、Agent 循环控制、多渠道一致性则构成用户体验的主要瓶颈。生态整体从“功能有无”向“企业级可靠”过渡，评估与可观测性标准化需求浮出水面。

---

## 2. 各项目活跃度对比

| 项目 | Issues 处理数 | PR 处理数 | 合并/关闭 PR 数 | 版本发布 | 核心活跃特征 | 健康度评估 |
|------|-------------|-----------|----------------|----------|-------------|-----------|
| **OpenClaw** | 133 | 500 | 114 | 无 | 极高强度，但 386 个 PR 待合并 | 🔴 社区贡献远超维护能力，审查积压严重 |
| **CoPaw/QwenPaw** | 18 | 42 | 10 | 无 | 功能扩张 + 生态 SDK 落地 | 🟡 活跃但长期 Issue (#4873) 未解 |
| **IronClaw** | 6 | 50 | 29 | 无 (RC.1 准备) | 遗留代码清理重构为主 | 🟢 架构简化有序，CI 短暂红色后修复 |
| **Zeroclaw** | 9 | 50 | 数项关键合入 | 无 | 评估系统密集交付 + 硬件通信修复 | 🟡 S1 CI 门禁阻断需紧急处理 |
| **NanoBot** | 6 | 30 | 11 | 无 | 子代理重构后颠簸期 | 🟠 性能 (Ollama) 与安全 (#4803) 缺口 |
| **NanoClaw** | 多条安全审计 Issue | 6 合并 (另有待合) | 6 | 无 | 权限系统审计密集，WhatsApp 兼容修复 | 🟡 安全 PR 节奏快，但 LINE 等积压 18 天 |
| **LobsterAI** | 0 | 15 | 10 | 无 | Cowork 协作 + AI 皮肤 + Windows 部署 | 🟢 活跃稳定，无显著风险 |
| **PicoClaw** | 11 | 10 | 5 | 无 | 回归 Bug 集中，社区贡献多 (i18n, TTS) | 🔴 三处严重 Bug (#3274, #3278, #3269) 无修复 PR |
| **Moltis** | 0 | 0 | 0 | — | 无活动 | ⚫ 停摆 |

> **说明：** “处理数”指当日被创建、评论或关闭的 Issue/PR 总量。合并/关闭 PR 数反映当日实际落地产出。OpenClaw 的规模使其作为生态流量入口，但维护效率亟需优化。

---

## 3. OpenClaw 在生态中的定位

**社区规模断崖领先：** 单日 500 PR / 133 Issue 的处理量是第二名 IronClaw 的 10 倍，贡献者网络与话题广度无出其右。其核心功能（多网关同时连接、会话自愈合、Dashboard）直接定义个人 AI 助手基线。

**技术路线差异：**
- **会话压缩与上下文计数修复（#108238）** 精准解决 token 误算导致卡死——此类底层稳定性投入是 OpenClaw 的技术护城河。
- **多网关同时连接（#111932）** 实现跨平台窗口管理，远超其他项目仅支持单通道绑定。
- **内存信任标签（#7707）与技能权限清单（#12219）** 提出了业界最完整的安全信任框架，虽然决策冻结 5 个月，但方向引领生态。

**瓶颈与风险：** 386 个 PR 待合并，维护者反应滞后（#7707 等待产品决策 5 个月），可能挫伤第三方贡献积极性。相比之下，NanoClaw、CoPaw 等项目的安全修复 PR 能在 1-3 天内合入，敏捷性更强。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 / Issue 示例 |
|---------|---------|----------------------|
| **安全与信任边界** | OpenClaw, NanoBot, NanoClaw, Zeroclaw, CoPaw | - 内存信任标签 / 信息来源标记（OC #7707）<br>- 遮蔽密钥系统（OC #10659）<br>- 密钥导出安全（NB #4803）<br>- CLI 角色授予审计（NC #3097-#3100）<br>- 常量时间比较防时序攻击（ZC #9110）<br>- 工具权限声明（OC #12219, NB #5006） |
| **多 Agent 上下文隔离/协作** | OpenClaw, NanoBot, CoPaw | - 子代理上下文隔离，仅返回状态+链接（OC #96975）<br>- 多代理协作持久身份/共享状态（NB #5000）<br>- 子代理并发无限轮询（CP #4873）<br>- Doom Loop 检测（CP #5961, #6041） |
| **Agent 评估与可观测性** | Zeroclaw, CoPaw, IronClaw | - 统一评估框架 / LLM-as-Judge / JUnit 报告（ZC #7065, #9220-#9223）<br>- Langfuse 可观测性增强（CP #5922）<br>- 流式超时修复（IC #6337） |
| **渠道扩张与本地化** | OpenClaw, NanoBot, PicoClaw, NanoClaw, LobsterAI | - 多网关同时连接（OC #111932）<br>- 飞书 groupPolicy（NB #5009）<br>- 日语本地化（PC #3272）<br>- LINE 通道（NC #2918, #3096）<br>- 微信音频 / DashScope TTS（PC #3270）<br>- 静默安装（LA #2368） |
| **本地推理与缓存优化** | NanoBot, CoPaw, OpenClaw | - Ollama Prompt 缓存命中失败（NB #4867）<br>- KIMI K2 忽略系统指令（OC #9912） |
| **Agent 循环控制** | OpenClaw, CoPaw | - maxTurns / maxToolCalls 限制（OC #9912）<br>- Doom Loop Gate 误杀正常记忆读取（CP #6041） |
| **可编程运维** | OpenClaw, Zeroclaw, NanoClaw, LobsterAI | - session:end 钩子（OC #10142）<br> - Dokploy 一键模板（ZC #5007）<br>- 容器添加 --init 回收僵尸进程（NC #3060）<br>- Windows 静默安装（LA #2368） |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|----------------|
| **OpenClaw** | 全功能个人 AI 助手（会话、网关、技能、Dashboard） | 开发者 / 高阶用户，追求极致可控 | 复杂的会话压缩引擎、多网关抽象、代理路由；安全框架最完整但落地慢 |
| **NanoBot** | 子代理 / 多代理协作深度优化，即时通讯全渠道 | 社区用户 / 团队协作（QQ、飞书、Telegram） | `TurnContext` 状态机重构 `#4993`；子代理结果通道统一；渠道适配器丰富 |
| **Zeroclaw** | Agent 评估体系（eval harness）+ 硬件通信 + ZeroCode TUI | 硬件开发者 / 评估工程师 | 固件通信协议、LLM-as-Judge 评分器、ADR 规范驱动架构；TUI 为第一界面 |
| **PicoClaw** | 轻量嵌入式（Sipeed 硬件）+ 多 Provider 快速适配 | 嵌入式爱好者 / 低资源环境 | 低内存占用、多 Provider 默认模型自动刷新、TTS 扩展 |
| **NanoClaw** | CLI 安全管理 + 企业级审批 + WhatsApp/容器部署 | 运维与安全团队 | `ncl roles` 权限模型、工具审批路由、容器镜像内置 CalDAV MCP |
| **IronClaw** | 遗留系统重塑（Reborn）+ 生产级部署稳定性 | 面向正式部署的团队 | Tier B 架构清理、`DeploymentConfig` 统一配置、流式稳定性增强 |
| **LobsterAI** | Cowork 实时协作 + AI 皮肤 + Windows 原生分发 | 网易生态用户 / 桌面办公人群 | 协作富媒体注释、RPC Ack 配置热更新、NSIS 静默安装 |
| **CoPaw/QwenPaw** | 通用 Agent 平台（计算机控制、统一浏览器、PawApp SDK） | 通用开发者 / Qwen 模型生态用户 | Agent Mode 标准化 `#6210`、Unified Browser、长期记忆 ReMe Light、Doom Loop Gate |

**总结：** OpenClaw 在广度上覆盖面最大，CoPaw 和 IronClaw 在架构现代化上最激进，NanoBot/NanoClaw 在多 Agent 与安全治理上深度切入，Zeroclaw 独占评估赛道，PicoClaw 和 LobsterAI 则分别在轻量和协作场景占据生态位。

---

## 6. 社区热度与成熟度分层

### 🔥 第一梯队：极高活跃 / 大规模贡献
- **OpenClaw**（单日 500 PR / 133 Issue）—— 生态流量中心，但维护效率成为瓶颈，社区信心可能因决策积压受挫。
- **CoPaw**（单日 42 PR / 18 Issue）—— 功能扩张 + 插件生态启动，贡献者粘性强；长期 Bug #4873 成为成熟度瑕疵。

### ⚡ 第二梯队：高活跃 / 重构或特色聚焦
- **IronClaw**（50 PR）—— 架构清理节奏紧凑，RC.1 冲刺，CI 暂时中断但快速修复，成熟度较高。
- **Zeroclaw**（50 PR）—— 评估体系密集交付，模块边界清晰，但 CI 门禁阻断需立即关注。
- **NanoBot**（30 PR）—— 重构后颠簸期，大量 P1 补丁排队，安全基线待加强，但渠道修复响应快。
- **NanoClaw**（~20-30 更新）—— 安全审计效率极高，特性 PR 积压天数较短（18 天），整体健康。

### 🛠 第三梯队：中等活跃 / 局部迭代
- **LobsterAI**（15 PR）—— 稳定迭代无拥堵，无新 Issue 表明用户需求满足较好，适合成熟桌面场景。
- **PicoClaw**（10 PR）—— 社区贡献积极（i18n, TTS），但维护者反应滞后导致三处严重 Bug 无修复，稳定性波动。

### ⚫ 停滞
- **Moltis**—— 24 小时无活动。

**成熟度排序（估算）：** IronClaw ≥ LobsterAI > CoPaw > OpenClaw (功能多但稳定性起伏) > Zeroclaw > NanoClaw > NanoBot > PicoClaw。

---

## 7. 值得关注的趋势信号

### 1️⃣ “信任边界” 成为跨项目第一优先级
- 内存标签、遮蔽密钥、工具权限清单、CLI 角色审批守卫——五个项目同时扑向安全，表明社区不再接受“黑盒 Agent”。
- **启示：** 新项目或功能设计应内置来源追溯、最小权限、可审计的审批流；不设安全基线的 Agent 将丧失企业用户信任。

### 2️⃣ 评估与可观测性正在标准化
- Zeroclaw 的 LLM-as-Judge + JUnit 报告直接对接 CI 管线；CoPaw 强化 Langfuse；OpenClaw 社区呼吁 `session:end` 钩子集成 Temporal。
- **启示：** Agent 质量不能只靠观察聊天日志，结构化评估框架（Eval Harness）将成为刚需，开发者应尽早对接 OpenTelemetry 等可观测性标准。

### 3️⃣ 多 Agent 协作从概念进入工程化瓶颈
- 子代理上下文膨胀导致父会话被污染、并发轮询死锁、Doom Loop 误杀——这些细节暴露了简单的“子代理=函数调用”思路不可持续。
- **启示：** 需要引入上下文隔离契约、限定并发车道、状态机监管（honest state machine）。IronClaw 和 CoPaw 的 Gate 模式提供可参考方案。

### 4️⃣ 区域性渠道崛起：LINE、飞书、微信音频
- 日语本地化、LINE 通道、飞书 `groupPolicy`、微信音频 TTS——生态不再仅盯 Telegram/Discord，亚洲 IM 平台成为新战场。
- **启示：** 多平台支持不仅仅是 Webhook 适配，还需要适配各平台的 @提及、群组策略、消息样式和监管要求。

### 5️⃣ 本地推理与 Provider 兼容性仍是核心痛点
- NanoBot 的 Ollama 缓存摧毁（每轮多 60 秒）、CoPaw 的模型指令遵循度波动、PicoClaw 的 Antigravity OAuth 被 Google 策略屏蔽——说明 Provider 抽象层仍脆弱。
- **启示：** 需要建立 Provider 适配器测试套件（类似 Zeroclaw 的评估框架），以及主动降级/回退机制（OpenClaw #111654）。

### 6️⃣ “安全左移” 在 CLI 和配置设计上体现明显
- NanoClaw 的权限审计 PR 直接修改 `ncl roles` 默认行为；OpenClaw 要求 `maxTurns` 配置；CoPaw 允许禁用内置工具描述——用户希望运行时配置而非硬编码。
- **启示：** AI 助手应提供可编程的治理策略（策略即代码），而非单纯依赖系统提示词。

---

**总结：** 2026-07-21 的生态动态显示，个人 AI 助手已告别“能否对话”的原始阶段。安全、评估、多 Agent 架构、渠道本地化成为四大竞争主轴。对于技术决策者：选择项目时需权衡功能广度（OpenClaw）与迭代速度（IronClaw/CoPaw），并优先确认该项目的安全治理和评估体系成熟度。对于开发者：可关注 NanoClaw 的权限模型、Zeroclaw 的 eval harness、以及 CoPaw 的 Unified Browser 作为模块化复用参考。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

好的，以下是根据您提供的 GitHub 数据生成的 NanoBot 项目动态日报（2026-07-21）。

---

## NanoBot 开源项目动态日报 | 2026-07-21

### 1. 今日速览

过去 24 小时，NanoBot 项目维持高强度迭代，社区贡献者活跃度保持在极高水平。共处理 30 条 Pull Requests（其中 11 条已合并/关闭），以及 6 条 Issues（3 条已关闭）。核心方向已从前期的“子代理系统重构”全面转向“重构后的稳定性巩固与多渠道体验打磨”。值得警惕的是，**Ollama 本地缓存摧毁问题**引发了自项目成立以来最强烈的性能负面反馈，同时 **API 存储安全问题**连续被社区提及，成为悬而未决的安全红线。

---

### 2. 版本发布

*无新版本发布。*（距上次发布已有一段间隔，当前大量 P1 级别的修复和重构处于待合入状态，推测近期将迎来一次较大的补丁版本或里程碑发布。）

---

### 3. 项目进展（核心推进项）

昨日项目在架构底层统一与渠道稳定性修复上取得了扎实进展：

- **【核心架构统一】** `#4993` (by @chengyongru) 已合并。该 PR 重构了内部消息（`channel="system"`）的生命周期，消除了子代理结果绕开正常 `TurnContext` 状态机的“第二循环”。这标志着多代理协作的基础设施建设迈出了里程碑式的一步，但**随后衍生出多个相关的 P1 视觉/路由 Bug**。

- **【通信可靠性三连击】** 社区贡献者密集修复了三起可能导致进程挂起的严重死循环 Bug，显著提升了渠道鲁棒性：
    - `#4768` (by @gola)：QQ 频道 WebSocket 重试增加**指数退避**策略，避免 DNS 故障下的日志洪灾。
    - `#4981` (by @santhreal)：修复 Telegram 消息分割在 `max_len <= 0` 时的循环挂起。
    - `#4982` (by @santhreal)：修复飞书消息分块同样逻辑缺陷的死循环。

- **【部署生态拓展 & 多模态修复】**
    - `#4937` (by @Ho1yShif)：新增 **Render 一键部署**支持，继续降低托管门槛。
    - `#5008` (by @bllackhu)：修复了连续多模态用户内容合并时**只保留最后一张图片**的回归 Bug。
    - `#4998` (by @chengyongru)：新增 **Ollama Prompt 缓存诊断文档**，直接回应用户在本地推理性能上的核心药方。

*项目健康度评估：* 核心架构处于重构后的“颠簸期”，大量 P1 补丁正在排队修复；部署生态持续扩展，安全基线存在明显缺口。

---

### 4. 社区热点

- **Ollama 缓存摧毁问题（`#4867`）**
  - *热度：* 15 条评论 | *状态：* **已关闭**
  - *分析：* 这是本周最激烈的用户负反馈。用户 @The-Markitecht 明确指出，NanoBot 在调用 Ollama 时无法保留精确的 Prompt 前缀并导致**每轮额外增加 60 秒延迟**，在 32GB VRAM 下“完全不可用”。该 Issue 虽已关闭，但其反映的 **本地推理性能优化** 是阻挡中端用户大规模采用的关键路障。

- **多代理协作系统的进化蓝图（`#5000`）**
  - *热度：* 1 条评论 | *状态：* **开放**
  - *分析：* 用户 @bingqilinweimaotai 提出了继 `#4999` 后的修订版提案，要求将当前的“子代理”进化为“多代理协作”。虽然评论数不多，但该提案定义了**持久身份、共享任务状态、代理间通信**等核心概念，极大概率被纳入下一阶段的 Roadmap。

- **飞书渠道的深度集成（`#5009`）**
  - *热度：* 开发者密集跟进 | *状态：* **开放**
  - *分析：* 飞书相关贡献正在迎来爆发。`#5009` 提出的 `groupPolicy: listen`（静默积累上下文，@机器人时才回答）是典型的**高优 UX 功能**，显示出企业级协作场景正在成为项目重点攻克的方向。

---

### 5. Bug 与稳定性（按优先级排列）

| 严重程度 | 编号 | 核心问题 | 状态 | 备注 |
|---|---|---|---|---|
| P1 - 核心性能 | #4867 | Prompt 前缀丢失导致 Ollama 缓存命中失败，延迟暴增 60s | **已关闭** | 已作为已知行为记录，需等待平台层针对非标准 API 的兼容性修复 |
| P1 - 回归 | #4988 | 后台(Cron)任务结束时，无文本输出会错误显示“无法生成最终答案”占位符 | **待合并** | 社区已提出针对性修复 |
| P1 - 视觉缺陷 | #4954 / #4992 / #4928 | **子代理结果在 WebUI 中不可见**、新轮次分配错误、心跳路由混乱 | **开放中** | 这是重构后最集中的 Bug 群，涉及 3 个并行的 P1 修复 PR |
| P1 - 稳定性 | #5004 | 部分共享文件系统不支持目录 `fsync`，导致会话存储崩溃 | **待合并** | @amplifierplus 提出优雅修复 |
| P1 - 安全 | #5005 | 工具执行中的 `rm` 命令拒绝规则过于宽泛，导致合法的测试清理脚本被误杀 | **待合并** | 已替换为更精准的目标感知守卫 |
| P2 - 稳定性 | #4981 / #4982 | 非正数 `limit` 导致消息分割函数**无限循环** | **已合并** | 修复已落地 |

---

### 6. 功能请求与路线图信号

- **安全基线升级（极有可能纳入下版本）**
  - `#5010` (Open)：建议 SECURITY.md 文档优先推荐环境变量引用，而不是明文存储密钥。
  - `#5006` (Open)：提出**限权工具网关（ToolGateway）**，渠道插件可声明性开启，非代理操作不在 agent context 下执行。
  - *研判：* 鉴于 `#4803` 的持续呼吁与最近一周的密集提案，**API Key 排他性导出与工具隔离**将是近期最重要的边界拓展。

- **一键部署普惠化（超长期需求终于落地）**
  - `#5007` (Open)：回应了自 3 月即提出的 `#1503` Dokploy 模板需求。
  - *研判：* 标志着项目从“技术爱好者部署”逐渐向“非技术人员自助托管”倾斜。

- **UI/UX 大修（长期规划）**
  - `#4963` (Open)：@Re-bin 提交了 WebUI 的打磨，包括统一工具调用日志语言、流式 Markdown 修复、原生推理进度条等。*注：[conflict] 标签意味着需与上述 P1 WebUI Bug 修复协同合入。*

---

### 7. 用户反馈摘要

- **痛点与不满：**
  - **性能隔离之痛（#4867）**：“Ollama 下每一轮，即便最简单的问题，也被拖慢了 60 秒……在 32GB VRAM 上根本不可用。” —— 这表明现有的 Provider 抽象层对特定后端（如 LlamaCpp/Ollama 本地缓存）的优化适配严重不足。
  - **安全焦虑（#4803）**：“`api_key` 虽然设置了 `repr=False`，但 `model_dump()` 依然会导出，这很危险。” —— 用户明确表达了“隐藏不等于安全”的安全成熟度诉求。
  - **易用门槛（#1503/Dokploy）**：“请为非技术人员提供官方模板。” —— 长期未被满足的诉求，直至昨日才终于收到 `#5007` 的 PR。

- **肯定与期待：**
  - **对架构创新的期待（#5000）**：“当前的子代理系统更像是后台任务分配……希望进化到真正的多代理协作。” —— 用户虽指出了局限，但表达了认为 NanoBot 有潜力成为通用 AI OS 的极高期望。
  - **修复响应速度（#4768, #4981）**：社区对 QQ/飞书/Telegram 死循环 Bug 的修复效率极高，反馈在 Issue 提出后 1-4 天内即有对应的修复 PR。

---

### 8. 待处理积压与关注提醒

- **⚠️ 紧急安全告警（关注严重度：极高）**
  `#4803` **API 密钥核心存储安全问题**已开放 **15 天**。尽管 `#5010` 提出了文档层面的修复，但**尚未有真正将敏感字段从序列化中排除的核心代码修复**。如果项目在近期发布新版本，这将构成合规性重大风险。建议维护者优先推进底层反序列化逻辑的修复，而非仅改进文档。

- **⚠️ 重构并发症（关注严重度：高）**
  `#4928`、`#4954`、`#4988`、`#4992` 共 4 个 P1 优先级 PR 同时开放，全部聚焦于**子代理/WebUI/心跳**的稳定性。这实际上是 `#4993` 重构合并后产生的“并发症”。若无法在本周转为合并，将严重破坏“多代理”新功能的可用性。建议维护团队介入协调，避免 PR 并行冲突和功能碎裂。

- **⏳ 长期搁置的代表性请求：**
  `#1503` **Dokploy 模板请求**（2026-03-04 提出，历时 139 天）。昨日 `#5007` 才提交对应模板 PR，希望维护者尽快审核。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

好的，以下是根据您提供的 GitHub 数据生成的 Zeroclaw 项目动态日报。

---

# Zeroclaw 项目动态日报 | 2026-07-21

## 1. 今日速览

过去 24 小时内，Zeroclaw 项目活跃度极高，共计产生 50 条 PR 与 9 条 Issue 更新。开发重心高度聚焦于 **`zeroclaw eval` 评估子系统的批量交付**，标志着社区长期关注的 #7065 需求进入落地冲刺阶段。同时，多个严重硬件通信 Bug 与 ZeroCode TUI 体验问题被集中关闭，项目稳定性与用户体验显著提升。项目整体健康度良好，处于深度功能扩展期，但存在一个 **S1 级 CI 门禁阻断问题 (#9216)** 亟待团队响应。

## 2. 版本发布

*无*

## 3. 项目进展

过去 24 小时项目完成了多项关键推进，尤其是基础设施与稳定性大幅加固：

- **评估体系核心模块密集提交**：开发者在 24 小时内连续提交了 4 个与评估系统强相关的开放 PR（#9220, #9221, #9222, #9223），内容涵盖 LLM-as-Judge 评分器、JUnit 报告格式、回归基线比较与运行回执系统。这是对 #7065 需求的全面落地，意味着 `zeroclaw eval` 即将成为可供社区使用的一流特性。
- **硬件层关键 Bug 修复落地**：**PR #9157 (已合并)** 彻底修复了串口通信的帧失同步问题（对应 Issue #9078），通过精准跳过不匹配帧保证了硬件请求的正确序列。
- **CI/DevOps 基础设施加固**：**PR #9108 (已合并)** 为固件协议 crate 新增了独立的格式化、Clippy 与测试 CI 门禁，弥补了此前固件代码不受质量门控的风险（对应 Issue #9079）。
- **Web UI 与 ZeroCode 用户痛点清理**：多项用户体验 Bug 在本日合入关闭，包括 Markdown 链接跳转 (#9088，改用新标签页)、ZeroCode 键盘快捷键被终端拦截的替代方案 (#9173、新增 `/help` 与 `/browse` 命令) 以及 Web 权限配置 UI 的统一 (#8879)。
- **架构文档持续标准化**：**PR #9168 (已合并)** 提交了关于生成级实时配置生效的 ADR-012，为 live-config 架构提供了规范化的决策记录。

## 4. 社区热点

- **评估系统集成热潮（#9220, #9221, #9222, #9223）**
    - **作者**：@IftekharUddin
    - **分析**：虽然近期 PR 的评论数在数据中未显示，但作者在短短 24 小时内连续提交 4 个功能性强相关的 PR，构成了项目最显眼的开发战线。这直接响应了 **Issue #7065（Agent 评估工具需求）** 中长期积累的社区呼声。LLM-as-Judge 的引入代表了评估自动化的前沿尝试，**JUnit 报告格式** 则表明项目已在对接标准化的 CI 测试报告生态。

- **长期需求 Issue #7065 Agent 评估工具**
    - **热度**：创建于 2026-06-01，更新于 2026-07-20，共 3 条评论。
    - **诉求分析**：用户 `@mn13` 提出的核心诉求是改变“没有统一方式量化评测 Agent 行为”的现状。社区急需一种能在 Replay 和 Live 模式下运行的评估框架。团队对该 Issue 的积极承接（通过上述 4 个 PR）表明项目完全接受了这一路线图信号。

## 5. Bug 与稳定性

| 严重程度 | Issue / PR | 问题描述 | 当前状态 |
| :--- | :--- | :--- | :--- |
| **S1 - 工作流阻断** | **#9216**[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9216) | `comment-hygiene` 门禁检测在 master 分支失败，CI 流水线被彻底阻断。 | **OPEN** - 需立即响应 |
| **S2 - 行为降级** | **#9078**[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9078) | 串口通信响应 ID 不匹配后导致状态失同步，后续请求被污染。 | **已关闭** - 已由 #9157 修复 |
| **S2 - 行为降级** | **#8664**[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8664) | ZeroCode 复制代码块时包含了 Markdown 围栏与高亮标记。 | **已关闭** |
| **S2 - 行为降级** | **#8765**[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8765) | ZeroCode UI 组件（侧边栏、选择器）继承终端背景色，与暗色主题不协调。 | **已关闭** |
| **S2 - 行为降级** | **#8944**[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8944) | ZeroCode 转录区鼠标交互过度，阻止了用户进行常规的文字选中复制。 | **已关闭** |
| **安全风险** | **PR #9110**[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9110) | Lark 频道 URL 验证使用了不安全的 `==` 比较，存在时序攻击风险。 | **OPEN** (待合并) - 已提交 `constant_time_eq` 修复 |

## 6. 功能请求与路线图信号

- **Agent 评估体系 (Eval Harness - #7065)**：已不再是简单请求，而是进入了密集开发交付阶段。PR #9220-#9223 如果顺利合并，`zeroclaw eval` 将成为 v0.9.0 或后续版本的核心能力，这将极大地提升开发者对 Agent 质量的把控能力。
- **Agent 记忆系统增强 (PR #8895, #8900)**：Gated Rerank 与 Typed Memory 提取持续处于 `needs-author-action`，这属于 Memory 子系统的史诗级特性。虽然当前阻塞，但表明项目正从简单的记忆存取演进到精细化、类型化管控，是远期路线的关键标记。
- **渠道能力扩展 (PR #8443, #8830)**：Matrix 单消息进度草稿与渠道核心装配路径的重构是提升多平台体验和架构整洁度的基建工作，高价值、高影响，等待突破阻塞状态。

## 7. 用户反馈摘要

- **评估工作的痛点满足**：Issue #7065 的用户 `@mn13` 详细描述了缺乏评估工具带来的困境（如只能在本地开发、无法量化 prompt 质量）。当前 PR 系列的成功推进是对此最强有力的正面回应。
- **ZeroCode TUI 体验集体改善**：用户 `@Audacity88` 报告的一系列 TUI 问题（#8664、#8765、#8944）在过去 24 小时内全部关闭。这些反馈直指真实用户在日常使用中的高频痛点（复制、选取、主题一致性），它们的快速修复反映了项目团队对细粒度用户体验的重视。
- **硬件开发者反馈得到解决**：Issue #9078 的提出者 `@Rhoahndur` 遇到的串口通信失步问题已经通过 #9157 得到修复，这将稳定使用串口外设进行硬件开发的用户群体。

## 8. 待处理积压

以下为当前需要维护者关注或社区推动的长期未解决项目：

- **【阻塞的新功能 - 高风险】** **PR #8443**[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8443) (`feat(matrix): single-message progress drafts`)
    - 已创建 23 天，标记为 `needs-author-action`，涉及跨多个渠道的复杂逻辑。维护者需评估是否接替或联系作者。
- **【阻塞的记忆特性 - 高影响】** **PR #8895**[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8895) (`feat(memory): gated rerank stage`)
    - 同样被 `needs-author-action` 卡住。记忆系统是 Agent 长期能力的核心，应尽快推动解套。
- **【架构重构 - 高风险】** **PR #8830**[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8830) (`refactor(channels): route start_channels tool assembly`)
    - 存在 13 天，风险高（`risk:high`），涉及核心渠道启动路径的重构，是后续渠道功能的基础。
- **【安全修复 - 待合入】** **PR #9110**[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9110) (`fix(lark): use constant_time_eq`)
    - 修复了 Larks 验证漏洞，虽然改动极小（XS），但安全问题不应久置，建议立即审查合并。
- **【长期追踪器】** **Issue #8691**[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) (ADR 审计) 与 **Issue #7432**[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) (v0.9.0 特性追踪)
    - 两个追踪器均已存在 2 周以上，虽然标记了 `no-stale`，但项目进入密集开发期时，此类跨部门调度工作需警惕执行落地进度。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 | 2026-07-21

## 1. 今日速览

过去 24 小时项目保持高活跃度：共处理 11 个 Issue（新开/活跃 7 个，关闭 4 个）和 10 个 PR（待合并 5 个，已合并/关闭 5 个），无新版本发布。**多处回归与严重 Bug 集中涌现**——Antigravity provider 因代码变更出现 `INVALID_ARGUMENT` 错误，Google OAuth 认证被官方策略拦截，MCP 连接失败会导致 Agent 永久挂起。与此同时社区贡献积极，日语本地化、DashScope TTS 以及 9 家 AI provider 默认模型更新均已提交 PR。项目正处于密集迭代期，短期需优先修复影响用户正常使用的稳定性问题。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### ✅ 已合并/关闭的 PR 亮点

| PR | 说明 |
|----|------|
| [#3277](https://github.com/sipeed/picoclaw/pull/3277) | **工具可见性修复**：解决 deferred MCP 工具因进程重启或 TTL 过期而静默丢失的问题，加入滑动 TTL 机制与 SSE tool‑call 索引修正。该 PR 直接影响多工具 agent 场景的可靠性。 |
| [#3192](https://github.com/sipeed/picoclaw/pull/3192) | 将 goreleaser 基础镜像升级至 `alpine:3.23`，保持与主 Dockerfile 一致，属于持续集成基础设施更新。 |
| [#3191](https://github.com/sipeed/picoclaw/pull/3191) | 清理 `.gitignore` 中重复的 `build/` 条目。 |
| [#276](https://github.com/sipeed/picoclaw/pull/276) & [#277](https://github.com/sipeed/picoclaw/pull/277) | 文档措辞润色与 `make deps` 逻辑优化（长期未处理的旧 PR 今日统一清理关闭）。 |

### 🆕 新提交的 PR（待合并）

- **日语本地化**：[#3273](https://github.com/sipeed/picoclaw/pull/3273) —— 为 WebUI 添加完整日语翻译（968 行），对应 Feature Request [#3272](https://github.com/sipeed/picoclaw/issues/3272)。
- **AI provider 默认模型刷新**：[#3271](https://github.com/sipeed/picoclaw/pull/3271) —— 更新 9 个 provider 的默认模型名（如 OpenAI → `gpt-5.6-*`、Anthropic → `claude-4.5-*`），降低用户使用过期模型的风险。
- **DashScope TTS + 微信音频发送**：[#3270](https://github.com/sipeed/picoclaw/pull/3270) —— 新增阿里云 DashScope 语音合成 provider 及微信平台音频文件发送能力。

**项目整体向前迈进一步**：工具生命周期管理得到关键性修复；多语言和 TTS 扩展了应用场景；模型默认值跟上业界更新。

---

## 4. 社区热点

| 讨论焦点 | 链接 | 反应热度 | 分析 |
|----------|------|----------|------|
| **Android 版无法启动服务** | [#3182](https://github.com/sipeed/picoclaw/issues/3182) | 4 评论 | 反馈者拥有完整权限但无法更改路径、服务无法启动。该 Issue 已存在近一个月，虽今天无新评论但状态仍为 Open，反映 Android 端长期缺少维护者关注。 |
| **Matrix 同步无重连逻辑** | [#3203](https://github.com/sipeed/picoclaw/issues/3203) | 3 评论，1 👍 | 用户描述 `/sync` 长轮询在网络断开或服务器重启后永久死亡，进程存活但无自动重连，导致 systemd 无法触发重启。此问题影响 Matrix 通道的可靠运行，社区期待明确的重新连接策略。 |
| **Google OAuth 被拦截** | [#3278](https://github.com/sipeed/picoclaw/issues/3278) | 新开 | 刚提交即引起注意：Google 提示应用“不符合 OAuth 2.0 安全政策”，Antigravity provider 的登录流程完全受阻。该问题直接影响所有依赖 Google 账号的用户，预计会成为今日讨论热点。 |

---

## 5. Bug 与稳定性

按严重程度排列，标注是否已有修复 PR。

| 严重性 | Issue | 描述 | 修复状态 |
|--------|-------|------|----------|
| 🔴 严重 | [#3278](https://github.com/sipeed/picoclaw/issues/3278) | **Antigravity OAuth 被 Google 策略屏蔽**，用户无法完成登录。影响所有 antigravity provider 使用者。 | 尚无 PR |
| 🔴 严重 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | **MCP 服务器连接失败导致 agent 循环挂起**，聊天界面彻底停止回复，需重启进程。影响使用 MCP 工具的任意场景。 | 尚无 PR |
| 🔴 严重 | [#3274](https://github.com/sipeed/picoclaw/issues/3274) | **Antigravity provider 回归**：`main` 分支 (85dcfcc) 出现 `INVALID_ARGUMENT` 错误，`tool_schema_transform: "simple"` 不再生效，系 v0.3.1 后引入的回归。 | 尚无 PR |
| 🟡 中等 | [#3203](https://github.com/sipeed/picoclaw/issues/3203) | Matrix 同步无重连逻辑（已有 #3203 讨论，标记 stale）。 | 尚无 PR，但社区已给出环境细节 |
| 🟢 已解决 | [#3275](https://github.com/sipeed/picoclaw/issues/3275) | Launcher WebUI 重写配置时丢失 `api_keys` 字段（今日关闭，推测已通过其他提交修复）。 | 已关闭 |
| 🟢 已解决 | [#3230](https://github.com/sipeed/picoclaw/issues/3230) | Gemini 通过 OpenAI 兼容格式调用时缺少 `thought_signature`。 | 已关闭 |
| 🟢 已解决 | [#3231](https://github.com/sipeed/picoclaw/issues/3231) | SearXNG 搜索需 BasicAuth 请求头（Feature）。 | 已关闭 |

**风险提示**：今日出现的三处严重 Bug 中，Antigravity 相关问题（#3278、#3274）直接威胁用户认证与请求成功率，且无对应 PR，维护者需尽快介入。

---

## 6. 功能请求与路线图信号

| 功能 | Issue / PR | 信号强度 | 说明 |
|------|------------|----------|------|
| **日语本地化** | [#3272](https://github.com/sipeed/picoclaw/issues/3272) + [#3273](https://github.com/sipeed/picoclaw/pull/3273) | ★★★★★ | 已有完整 PR，968 行翻译 + dayjs 适配，极可能纳入下一个小版本。 |
| **DashScope TTS + 微信音频** | [#3270](https://github.com/sipeed/picoclaw/pull/3270) | ★★★★☆ | 新 provider 与平台集成，适合中文用户场景，PR 已提交等待 review。 |
| **Provider 默认模型更新** | [#3271](https://github.com/sipeed/picoclaw/pull/3271) | ★★★★☆ | 基础设施改进，避免用户使用已废弃的模型 ID，应尽快合并。 |
| **Launcher 支持外部 systemd 管理** | [#3276](https://github.com/sipeed/picoclaw/issues/3276) | ★★★☆☆ | 用户来自头服务部署场景，反馈 Launcher WebUI 不应硬接管 gateway 生命周期。目前无 PR，但反映了服务器部署的普遍需求，值得路线图考虑。 |
| **Anthropic 对话缓存断点** | [#3229](https://github.com/sipeed/picoclaw/issues/3229) | ★★☆☆☆ | 虽已关闭，但该 proposal 提出的“滚动缓存”对 token 成本优化有价值，未来可能重新讨论。 |

**路线图信号**：多语言、TTS、多 provider 适配是当前社区贡献的重点方向；服务端运维体验（systemd、launcher 行为）正成为重度用户的新诉求。

---

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中提炼真实场景与痛点：

- **“Can’t launch service in the android”** —— Android 用户即使给予全部权限仍无法运行服务，设置路径无效（[#3182](https://github.com/sipeed/picoclaw/issues/3182)）。
- **“Silent death after network/server disruption”** —— Matrix 同步在断网或重启后静默死亡，进程活着但不工作，用户只能用 `restart=always` 绕过，但不能 root cause（[#3203](https://github.com/sipeed/picoclaw/issues/3203)）。
- **“picoclaw chat interface to stop replying to users”** —— MCP server 连接失败后 agent 循环永久卡住，用户必须手动重启 PicoClaw（[#3269](https://github.com/sipeed/picoclaw/issues/3269)）。
- **“You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy”** —— 用户尝试使用 antigravity 登录时直接被 Google 拒绝，完全无法使用该 provider（[#3278](https://github.com/sipeed/picoclaw/issues/3278)）。
- **“WebUI Launcher 目前没有日语”** —— 用户表示主文档已是日语，但 WebUI 未提供，期望一致的多语言体验（[#3272](https://github.com/sipeed/picoclaw/issues/3272)）。
- **“config rewrites lose api_keys”** —— 通过 Launcher WebUI 操作后，手动写入的 `api_keys` 字段被覆盖，需要重新添加（[#3275](https://github.com/sipeed/picoclaw/issues/3275)）。

---

## 8. 待处理积压

以下为长期未响应或处于 **stale** 状态的重要 Issue / PR，需维护者关注：

| 类型 | 编号 | 问题 | 时长 | 备注 |
|------|------|------|------|------|
| Issue | [#3182](https://github.com/sipeed/picoclaw/issues/3182) | Android 版本无法启动服务 | 创建 2026-06-26，近一个月 | 无维护者回复，社区评论已给出截图与日志 |
| Issue | [#3203](https://github.com/sipeed/picoclaw/issues/3203) | Matrix 同步无重连逻辑 | 创建 2026-07-02，标记 stale | 影响持续运行的 Matrix 通道可靠性 |
| PR | [#3254](https://github.com/sipeed/picoclaw/pull/3254) | 模型解析优化（verbatim match 优先） | 创建 2026-07-13，标记 stale | 需 review，修复多 entry 匹配优先级问题 |
| PR | [#3251](https://github.com/sipeed/picoclaw/pull/3251) | Anthropic provider 捕获 prompt cache 用量 | 创建 2026-07-12，标记 stale | 运维监控功能，社区等待整合 |

**提醒**：上述积压项涉及 Android 平台可用性、核心通信通道稳定性以及模型配置纠错，建议下一轮 sprint 优先评估。

---

> **项目健康度总结**：PicoClaw 当前处于高速迭代阶段，社区贡献活跃，但回归频次较高导致稳定性波动。Antigravity 相关的认证与请求错误、MCP 挂死是今日最需响应的红线问题；日语本地化、TTS 等功能 PR 体现社区对多平台多语言场景的持续期待。建议维护者及时合并 #3273 等低风险功能 PR，并分配人力解决 #3274 / #3278 等严重 Bug 以稳定用户信心。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

好的，NanoClaw 项目动态日报已为您整理完成。

---

# NanoClaw 项目动态日报 | 2026-07-21

**数据来源：** `github.com/nanocoai/nanoclaw`
**数据统计周期：** 过去 24 小时

---

## 1. 今日速览

项目今日活跃度极高，尽管没有版本发布，但社区贡献的力度和质量非常亮眼。**过去 24 小时内，Issue 与 PR 的更新量共计 26 条，其中近半数处于待处理/审查状态。**

核心看点是来自 @k-fls 的一系列**权限系统安全审计报告与修复 PR**（共计 4 个 Issue + 4 个 PR），直指当前 CLI 角色管理和审批流中的系统性缺陷。同时，以 @glifocat 和 @cfis 为代表的贡献者在 **WhatsApp Cloud 升级兼容性**与 **跨通道附件数据处理** 上进行了密集修复。项目在响应安全与稳定性 Bug 上非常迅速，但积压了数周的特性级 PR（如 LINE 通道、本地语音转写）仍待核心维护者推进。

**项目健康度评估：** 高活跃度，贡献者生态优质，但短期的安全修复与长期的特性路线图之间存在一定张力。

---

## 2. 版本发布

*（无新版本发布，本节省略。）*

---

## 3. 项目进展

今日共有 **6 个 PR 被合并/关闭**，主要聚焦于修复关键的运行时问题与技术债务清理：

- **💾 附件处理链路增强：**
  - [`#3108 - fix(chat-sdk-bridge): rehydrate inbound attachments when adapters carry no fetchData`](https://github.com/nanocoai/nanoclaw/pull/3108) - 修复了部分适配器（如 iMessage）不带 `fetchData` 时，Bridge 无法正确反序列化附件的问题，填补了传统通道的接入空白。
- **💬 WhatsApp 通道稳定性：**
  - [`#3107 - fix(add-whatsapp-cloud): copy the adoption module and document the row re-key`](https://github.com/nanocoai/nanoclaw/pull/3107) - 为 `#3106` 的修复提供前置模块支持，解决实例 Key 变更导致的数据库行悬空。
  - [`#3087 - fix(whatsapp): engage mention-mode wirings on typed @-mentions in groups`](https://github.com/nanocoai/nanoclaw/pull/3087) - 修复了群组中 `@提及` 功能的连接性问题。
- **🧩 容器与基础设施：**
  - [`#3110 - feat(container): bake caldav-mcp into the agent image`](https://github.com/nanocoai/nanoclaw/pull/3110) - 将日历协议（CalDAV）MCP 服务直接内置于基础 Agent 镜像中，降低了日历工具集成的复杂度。
  - [`#2642 - fix(add-telegram): pin chat-adapter to 4.26.0 to match installed chat`](https://github.com/nanocoai/nanoclaw/pull/2642) - 锁定了 Telegram 通道的适配器版本，解决了长期存在的 `peerDependency` 冲突。
  - [`#1110 - fix: update container-runtime tests to match implementation`](https://github.com/nanocoai/nanoclaw/pull/1110) - 更新了容器运行时测试用例，对齐代码实现。

**进展小结：** 项目在**附件处理管道的稳健性**、**WhatsApp 通道的升级兼容性**以及**容器基础设施的标准化**上迈出了坚实一步。

---

## 4. 社区热点

今日社区讨论的焦点高度集中，呈现出“**安全审计冲锋**”与“**通道扩张诉求**”并存的局面。

- **🔥 热度最高：@k-fls 发起的权限系统全面审计**
  贡献者 @k-fls 一口气提交了 4 个相互关联的 Issue，直指 NanoClaw CLI 角色与审批模块的设计缺陷，并同步提交了修复 PR。这套操作引发了社区的广泛关注。
  - **诉求分析：** 用户对于 CLI 工具的 **信任与透明度** 提出了更高要求。`ncl roles` 命令的默认行为缺乏安全边界（全局权限静默授予、自我批准、无最终保护），这对于运行敏感 AI Agent 的生产环境是不可接受的。社区显然希望看到一个 **“安全优先”的治理模型**。

- **💬 活跃讨论：#3105 WhatsApp Cloud 升级故障**
  - 该 Issue 由 @glifocat 报告，并配套了 PR `#3106` 和 `#3107`。核心痛点在于**现有用户的平滑升级体验被破坏**。旧实例通过 `/update-skills` 升级后，Meta 的 Webhook 仍在持续推送，但 Agent 端因数据库字段变更导致消息被静默丢弃。这是一个典型的生产环境 **“静默失败”** 案例，对用户伤害极大。

- **🇯🇵🇹🇼🇹🇭 亚洲市场信号：#3096 请求 LINE 通道**
  - [Issue #3096](https://github.com/nanocoai/nanoclaw/issues/3096) 明确遵循了 README 中的 RFS（请求技能）流程，要求添加 LINE 官方账号支持。这是一个强烈的市场扩张信号，表明社区用户正在将 NanoClaw 推向日本、台湾、泰国等 LINE 主导的地区。

---

## 5. Bug 与稳定性

今日报告的 Bug 呈现明显的 **“系统性安全设计缺陷”** 特征，由 @k-fls 集中发现，按严重程度排列如下：

### 🔴 严重 / 安全
| Issue | 描述 | 影响 | 是否已有修复 PR |
| :--- | :--- | :--- | :--- |
| [`#3100`](https://github.com/nanocoai/nanoclaw/issues/3100) | **撤销唯一全局所有者未被阻止** | 系统可能丢失“信任根”，导致永远无法执行 owner 级别操作。 | [`#3104`](https://github.com/nanocoai/nanoclaw/pull/3104) |
| [`#3099`](https://github.com/nanocoai/nanoclaw/issues/3099) | **审批路由可无视权限，且可路由到目标自身** | 权限提升风险（如用户 X 可以批准撤销自己权限的请求）。 | [`#3103`](https://github.com/nanocoai/nanoclaw/pull/3103) |
| [`#3097`](https://github.com/nanocoai/nanoclaw/issues/3097) | **角色授予静默赋予全局管理权限** | 用户因遗漏 `--group` 参数可导致意外越权。 | [`#3101`](https://github.com/nanocoai/nanoclaw/pull/3101) |

### 🟡 高 / 功能与回归
| Issue | 描述 | 影响 | 是否已有修复 PR |
| :--- | :--- | :--- | :--- |
| [`#3105`](https://github.com/nanocoai/nanoclaw/issues/3105) | **WhatsApp Cloud 升级导致消息静默丢弃** | 现有用户升级后通道失效，属于升级回归问题。 | [`#3106`](https://github.com/nanocoai/nanoclaw/pull/3106), [`#3107`](https://github.com/nanocoai/nanoclaw/pull/3107) |
| [`#3044`](https://github.com/nanocoai/nanoclaw/issues/2888) | **入站附件数据（`fetchData`）丢失** | 导致 Telegram 语音、iMessage 附件等无法被 Agent 读取。 | [`#3044`](https://github.com/nanocoai/nanoclaw/pull/3044), [`#3108`](https://github.com/nanocoai/nanoclaw/pull/3108), [`#3109`](https://github.com/nanocoai/nanoclaw/pull/3109) |

### 🔵 中 / 可用性
| Issue | 描述 | 影响 | 是否已有修复 PR |
| :--- | :--- | :--- | :--- |
| [`#3098`](https://github.com/nanocoai/nanoclaw/issues/3098) | **审批卡片仅回显原始命令，无效果描述** | 管理员难以理解自己批准的具体操作，降低可用性与信任度。 | [`#3102`](https://github.com/nanocoai/nanoclaw/pull/3102) |

**稳定性总结：** @k-fls 发现的问题属于设计层面的缺陷，但幸运的是均已有高完成度的修复 PR，预计会在下个小版本集中合入。附件与 WhatsApp 的修复链条也处于“待合并”的活跃状态。

---

## 6. 功能请求与路线图信号

结合今日的 Issue 与活跃 PR，可以判断出项目的下一阶段发展方向：

- **🚀 最可能优先进入下一版本的组别：安全修复 + 附件修复**
  - @k-fls 的 4 个 PR（`#3101`-`#3104`）几乎是**必合项**，因为目前的权限模型存在明显的逻辑漏洞。
  - @cfis 和 @mashkovtsevlx 主导的附件修复链（`#3108`, `#3109`, `#3044`）解决了用户日常使用的痛点，优先级极高。

- **🌏 通道扩张信号：**
  - **LINE 通道**：`#2918`（PR）与 `#3096`（RFS Issue）指同一个需求。考虑到 @joshm1230212 同时提交了繁体中文文档 PR（`#2950`），这组 PR 的可能性很高，主要卡在审查进度上。
  - **Dial 通道**：`#3041` 和 `#3050` 提供了 SMS + 语音通话的通道支持，属于全新的交互模式，具有战略前瞻性。

- **🎤 超期重要特性：**
  - [`#2459 - feat(skill): add /add-voice-transcription-chat-sdk`](https://github.com/nanocoai/nanoclaw/pull/2459) - 本地语音转写（whisper.cpp）已运行超过 2 个月。如果项目希望在隐私和企业级市场获得优势，此功能的落地是关键信号。

---

## 7. 用户反馈摘要

从今日的 Issue 讨论与 PR 描述中提炼的核心用户画像与痛点点：

- **运维/安全人员（@k-fls 代表）：**
  - **不满：** `ncl roles` 工具的设计不够严谨，易误操作导致安全风险。“It makes accidental privilege escalation easy” 是非常直白的批评。
  - **诉求：** 需要**明确的 Scope 声明、强制性的操作确认、以及防止系统自毁的根权限保护**。
- **现有升级用户（@glifocat 代表）：**
  - **痛感：** 升级流程的兼容性测试不充分。“silently mutes WhatsApp” 是对数据完整性丧失的严重警告。用户期望 `/update-skills` 是无损的。
  - **应对：** 用户非常专业，不仅提交了 Bug，还直接给出了 Code Fix（`#3106`, `#3107`），显示了极强的社区粘性与“自愈”文化。
- **功能尝鲜者（@joshm1230212, @OmriBenShoham 代表）：**
  - **诉求：** 拥抱特定区域市场（LINE）和新交互模式（Dial）。他们遵循社区治理流程（RFS），显示出成熟的项目社区氛围。

---

## 8. 待处理积压

以下 Issue 或 PR 处于长时间未合并/响应的状态，提请维护者关注：

| 编号 | 类型 | 概要 | 时间跨度 | 潜在风险 / 建议 |
| :--- | :--- | :--- | :--- | :--- |
| [`#2459`](https://github.com/nanocoai/nanoclaw/pull/2459) | PR (Feature) | 本地语音转写技能 | 2026-05-13 至今 (69天) | **风险：** 长期搁置会消耗社区贡献者热情。这是隐私计算的关键拼图，建议尽快 Review。 |
| [`#2918`](https://github.com/nanocoai/nanoclaw/pull/2918) | PR (Feature) | 添加 LINE 通道 | 2026-07-03 至今 (18天) | **风险：** 社区呼声极高 (#3096)，且 RFS 流程走完。若再拖延可能会导致冗余 PR 出现。 |
| [`#3060`](https://github.com/nanocoai/nanoclaw/pull/3060) | PR (Fix) | Agent 容器添加 `--init` 以回收僵尸进程 | 2026-07-16 至今 (5天) | **分析：** 这是一个重要的运行稳定性修复，描述清晰，改动量小，应尽快合入。 |
| [`#3044`](https://github.com/nanocoai/nanoclaw/pull/3044) | PR (Fix) | 修复入站附件丢失（多适配器） | 2026-07-14 至今 (7天) | **分析：** 与 `#3108`/`#3109` 高度相关，建议作为同一个修复批次统一合并，避免冲突。 |

---
**编辑：** AI 智能体与个人 AI 助手领域开源项目分析师
**日期：** 2026-07-21

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 | 2026-07-21

## 1. 今日速览

过去 24 小时项目保持高强度开发状态：共产生 **6 条新 Issue**（全部活跃中）和 **50 条 PR**，其中 **29 条已合并/关闭**，**21 条待合并**。核心团队持续执行 Tier‑B 遗留代码清理（v1 monolith 删除及部署切换），同时密集合并依赖更新和多项重构 PR，并开始为 RC.1 候选版本做发布准备。整体活跃度极高，项目健康度良好，但需关注因大规模删除导致的 CI 红色修复（#6379）及潜在的回归风险。

---

## 2. 版本发布

**今日无新版本发布。**

- 但 **#6370**（`docs(release): 1.0.0-rc.1 release notes + destale reborn-binary.md`）已于今日合并，该 PR 准备了 `CHANGELOG.md` 中的发布说明，是 `ironclaw-v1.0.0-rc.1` 标签推送的先决条件；
- **#5598**（`chore: release`）仍处于打开状态，涉及 `ironclaw_common`、`ironclaw_skills` 的 API breaking changes，但该 PR 已停滞近三周，可能与 RC.1 发布时间线协调有关。

---

## 3. 项目进展

今日合并/关闭的关键 PR 主要集中在 **Reborn 架构简化、v1 遗留代码清理、及持续集成修复** 三大模块：

### 3.1 遗留系统退役（Tier B 核心步骤）
- **#6375** `refactor(tier-b): delete v1 legacy monolith (src/) and cut deploy over to Reborn`  
  合并了超大型重构：从代码树中彻底移除 v1 单体（`src/`，原 `ironclaw-legacy` 二进制），并将生产部署配置（Railway、GCP systemd 单元、Docker CI）全部指向 Reborn 栈。这是 Tier B 计划的关键里程碑，大幅简化了项目结构。
- **#6368** `refactor(reborn-migration): decouple from ironclaw_legacy before Tier B`  
  在删除前解耦 `ironclaw_reborn_migration` 对 `ironclaw_legacy` 的依赖，消除架构边界违规。

### 3.2 架构简化（§4.4 消除 Local* 部署类型）
- **#6374** `refactor(composition): eliminate local_trigger_access; trigger-fire access is config + identity (§4.4)`  
  移除了 `local_trigger_access` 模块（约 1,464 行），将其功能整合到配置与身份层，消除最后一种 `Local*` 部署类型残留。
- **#6377** `chore(runner): remove dead libsql-secrets feature and its module`  
  清理 `ironclaw_runner` 中已废弃的 `libsql-secrets` 特性孤岛。
- **#6378** `chore(runner): remove dead feature flags (libsql-secrets, filesystem-goal-store)`  
  进一步将 runner 的特性标记从三个削减至一个。

### 3.3 流式与重试机制修复
- **#6337** `fix: keep chat streams active and resume without replay`  
  修复聊天流式接口的活性问题：不再以总响应时间判定超时，改为非活动超时；移除语义延续变通方案，要求真实终端标记；消除流中断后不必要的重放。

### 3.4 发布准备与 CI 修复
- **#6370** `docs(release): 1.0.0-rc.1 release notes + destale reborn-binary.md`（已合）
- **#6379** `fix(tier-b): repair post-merge red main (release-plz + replay-gate legacy refs)`（打开但已修复 CI）  
  修复因 #6375 合并导致的 main CI 变红：`release-plz.toml` 中残留对已删除包的引用导致发布管线崩溃，以及 replay-gate 工作流引用已删除模块。

### 3.5 依赖更新（批量合并 29 条）
大量 Dependabot 合并（#6288、#6186 等），涵盖 tokio、rustls、tower-http、futures 等核心依赖的升级与兼容调整，保持项目生态前沿。

---

## 4. 社区热点

- **#6375** `refactor(tier-b): delete v1 legacy monolith`  
  毫无疑问是今日最重磅 PR。近 30 个 scope 标签覆盖全部模块，合并标志着遗留系统正式下线。该 PR 的讨论（回顾）集中在 rebase 策略、依赖边界验证以及后续 gap 追踪。
- **#6369** `Tier B follow-up: gaps left by v1 (src/) retirement`  
  与 #6375 直接绑定，由同一位作者发起，用于追踪删除后产生的缺口。获得 3 条评论，是目前最活跃的 Issue，社区关注哪些功能因删除而暂时丢失。
- **#6274** `Finish DeploymentConfig as the main composition config`  
  连续两天有更新，讨论如何将 `DeploymentConfig` 从残留草图完善为全功能配置入口。反映了核心团队对统一配置模型的持续迭代。

---

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 摘要 | 状态 |
|----------|----------|------|------|
| **P1 – 体验阻断** | **#6360** `[bug_bash_P1] Provider onboarding has no way to navigate back` | 本地 CLI 提供商配置流程无法返回上一步，选错提供商后只能重来或退出 | 无 fix PR，新开 Issue |
| **P1 – 功能冗余** | **#6362** `[bug_bash_P2] Duplicate "Test connection" and "Fetch models" flows create UX confusion` | 两个按钮执行相同验证，已识别为先有设计缺陷 | 无 fix PR，新开 Issue |
| **P2 – CI 故障** | **#6379** `fix(tier-b): repair post-merge red main` | 合并 #6375 后 release-plz 和 replay-gate 工作流异常，导致 main 红色 | 已有修复 PR（打开/待合） |
| **P2 – 流式稳定性** | **#6337**（已合） | 修复了流式聊天在超时和断连场景下的重播问题 | 已合 |

还需要注意 **#6369** 中列出的 gaps 可能包含潜在的隐蔽回归，需在后续测试覆盖。

---

## 6. 功能请求与路线图信号

- **#6384** `[reborn] Prioritized backlog for in-chat command coverage (feeds #3286)`  
  今日新开，系统盘点 Reborn 中缺失的聊天内命令类别，形成优先级队列。该 Issue 明确声明“不提议实现”，但为后续版本（极可能是 RC.1 后的迭代）提供了明确的开发依据。
- **#6274** `Finish DeploymentConfig as the main composition config`  
  要求完善 §4.4/§5.6/§5.11 定义的 `DeploymentConfig` 结构，使其成为真正的全局组合配置。与 #6374、#6375 等重构工作有强依赖关系。
- **#6371** `Discussion: narrow Reborn hooks to invocation authorization policy`  
  讨论将 hook 框架收窄到仅用于调用授权策略，避免复杂度增加。该 Issue 目前无评论，但可能影响后续权限模型设计。
- **#6116** `feat(reborn): unified generic extension runtime + Option A honest state machine`（长期 open）  
  大规模功能 PR，旨在统一扩展运行时（generic extension runtime），并引入诚实状态机。虽然今天没有合并动态，但持续有更新（上次更新 7 月 20 日），预计在 RC.1 之后会成为主要关注点。

---

## 7. 用户反馈摘要

从 Bug Bash 类 Issue 中可提炼出清晰的用户痛点：

- **#6360**：提供商配置流程缺少导航返回功能，一旦选错只能取消或完整退出重来，严重降低初次配置体验。用户期望 CLI 能提供“上一步”能力。
- **#6362**：“Test connection”和“Fetch models”两个按钮功能重叠，用户不清楚两者区别，且验证通过后 UI 已经显示可用模型数量，使“Fetch models”按钮显得多余。反馈倾向于合并或隐藏其中一个。

这些反馈表明用户对 CLI/WebUI 的交互流畅度有较高期待，目前的 Beta 阶段产物在可用性上仍有打磨空间。另外，从 **#6384** 的命令覆盖调查可以看出，社区希望 Reborn 尽快补齐与 v1 接近的功能完整性。

---

## 8. 待处理积压

以下 Issue/PR 长期未合或缺乏响应，建议维护团队关注：

| 项目 | 创建时间 | 简介 | 当前状态 |
|------|----------|------|----------|
| **#5598** `chore: release` | 2026-07-03 | 发布新版本，含 `ironclaw_common` 和 `ironclaw_skills` 的 breaking changes。已停滞 18 天，可能与 RC.1 发布策略冲突。 | Open，依赖 #6370（已合） |
| **#5664** `chore(deps): bump the actions group … 16 updates` | 2026-07-05 | 大量 GitHub Actions 升级（包括 checkout v4→v7、claude-code-action 等），已有 16 天未合并，存在安全与兼容风险。 | Open，需 review |
| **#6116** `feat(reborn): unified generic extension runtime …` | 2026-07-15 | 大型功能 PR，涉及统一扩展运行时与状态机，fork 点已有 92 个 commit 差异，持续更新。需安排架构评审与合并计划。 | Open，持续更新 |
| **#6274** `Finish DeploymentConfig as the main composition config` | 2026-07-19 | 配置模型完善任务，虽创建不足 3 天，但由于与 #6375/#6374 紧密相关，宜尽快跟进。 | Open，3 条评论 |
| **#6369** `Tier B follow-up: gaps left by v1 (src/) retirement` | 2026-07-20 | 追踪删除 v1 后可能遗漏的缺口，若不及时分配负责人，可能成为后续技术债务。 | Open，3 条评论 |

---

*数据截止时间：2026-07-21 23:59 UTC。以上分析基于 GitHub Issues/PR 元数据及摘要，未访问私有讨论与外部沟通。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

## LobsterAI 项目动态日报 — 2026-07-21

---

### 1. 今日速览

过去 24 小时内项目共处理 15 条 Pull Request（其中 10 条已被合并或关闭，5 条处于开放状态），无新 Issue 产生，也无新版本发布。合并内容覆盖了 Cowork 协作、AI 皮肤、Windows 构建与安装、以及多项稳定性修复，表明团队在持续迭代核心功能并修复已知问题。依赖升级 PR 仍有多条处于积压状态。整体活跃度较高，开发节奏紧凑。

---

### 2. 版本发布

无。

---

### 3. 项目进展

今日合并/关闭的 10 条 PR 中，以下几项对功能完整性与系统稳定性有显著推进：

- **浏览器多注释附件**（[#2366](https://github.com/netease-youdao/LobsterAI/pull/2366)）  
  内置浏览器中支持批量创建注释并保存裁剪截图，将注释作为草稿附件展示、清理、排队和发送，并在 Cowork 消息 metadata 中传递结构化注释上下文。协作场景下的富媒体交互能力得到增强。

- **AI 皮肤创建流程**（[#2361](https://github.com/netease-youdao/LobsterAI/pull/2361)）  
  在“外观”设置中新增持久化的 AI 皮肤创建入口，提供首次使用引导，并保持皮肤工作流在多轮对话中可用。用户创建个性化皮肤的门槛降低。

- **Windows 构建通道入口**（[#2367](https://github.com/netease-youdao/LobsterAI/pull/2367)）  
  将 Windows 各分发版本的构建变量显式传递并隔离，消除环境变量泄漏的风险，为后续多通道构建提供基础。

- **OpenClaw 配置热更新改用 RPC Ack**（[#2365](https://github.com/netease-youdao/LobsterAI/pull/2365)）  
  避免基于文件的配置热更新可能出现的竞态，改为 RPC 确认机制，提升配置分发可靠性。

- **多项协作用户端 Bug 修复**（[#2364](https://github.com/netease-youdao/LobsterAI/pull/2364)（会话刷新滚动跳转）、[#2363](https://github.com/netease-youdao/LobsterAI/pull/2363)（IM 消息周期性闪烁）、[#2359](https://github.com/netease-youdao/LobsterAI/pull/2359)（预览面板 / 输入区布局闪动））  
  大幅改善 Cowork 模块的交互稳定性，减少界面抖动和消息错乱。

- **登录重试与回调修复**（[#2360](https://github.com/netease-youdao/LobsterAI/pull/2360)）  
  在多次或并发登录尝试中复用回调服务器，增加诊断日志与回归测试。

- **Cron UI 与 POPO 验证修复**（[#2362](https://github.com/netease-youdao/LobsterAI/pull/2362)、[#1349](https://github.com/netease-youdao/LobsterAI/pull/1349)）  
  Cron 界面错误修复；POPO 连接测试现在会真正调用 API 验证凭据，而非仅检查非空。

上述合并使 Cowork 协作和 AI 皮肤两大特性更加成熟，同时将多个长期存在的体验问题一并修复，项目整体向前迈出了实质性的一步。

---

### 4. 社区热点

今日所有 PR 与 Issue 的评论数均为 0，未出现大规模讨论或高反馈量的条目。值得留意的是新开放的 **#2368**（[#2368](https://github.com/netease-youdao/LobsterAI/pull/2368)），该 PR 为 Windows 版添加静默安装能力（通过 NSIS `/S` 参数 + PowerShell Start-Process 提权安装，并在完成后自动重新启动）。该功能直击企业批量部署的场景痛点，若被合并，将显著提升管理员分发体验。建议关注后续 Review 进展。

---

### 5. Bug 与稳定性

今日无新 Issue 报告 Bug，但已合并的 PR 中包含了多项稳定性修复，按影响面排列如下：

- **高** – Cowork 消息闪烁与滚动跳转（[#2363](https://github.com/netease-youdao/LobsterAI/pull/2363)、[#2364](https://github.com/netease-youdao/LobsterAI/pull/2364)）：直接影响消息阅读连贯性，且涉及周期性闪烁，是较为明显的用户感知问题。
- **中** – 预览面板布局闪动（[#2359](https://github.com/netease-youdao/LobsterAI/pull/2359)）、登录回调失败（[#2360](https://github.com/netease-youdao/LobsterAI/pull/2360)）：影响输入区稳定性和认证流程流畅度。
- **低** – Cron UI 显示错误（[#2362](https://github.com/netease-youdao/LobsterAI/pull/2362)）、POPO 连接测试误判（[#1349](https://github.com/netease-youdao/LobsterAI/pull/1349)）：功能层面问题，已一并修复。

当前尚未发现新的回归或崩溃报告。

---

### 6. 功能请求与路线图信号

今日虽无新开 Feature Request Issue，但从已合并和开放的 PR 可看出下个版本的潜在方向：

- **浏览器多注释附件**（[#2366](https://github.com/netease-youdao/LobsterAI/pull/2366)）已合并，预计将纳入下一发布版。
- **AI 皮肤创建流程增强**（[#2361](https://github.com/netease-youdao/LobsterAI/pull/2361)）已合并，外观定制化体验提升。
- **Windows 静默安装**（[#2368](https://github.com/netease-youdao/LobsterAI/pull/2368)）仍在开放，若通过 Review 将改善分发部署。
- 三条依赖升级 PR（[#1282](https://github.com/netease-youdao/LobsterAI/pull/1282)、[#1283](https://github.com/netease-youdao/LobsterAI/pull/1283)、[#1284](https://github.com/netease-youdao/LobsterAI/pull/1284)）分别涉及 `@headlessui/react`、`react`、`react-syntax-highlighter` 的 Major 升级（均已停滞 110 天），可能因破坏性变更而未合并，团队需要评估是否适配或关闭。

---

### 7. 用户反馈摘要

今日无 Issue 或 PR 评论数据，因此无法直接提炼用户声音。从已合并的修复类型判断，近期用户可能遇到的以下痛点已得到解决：  
- Cowork 会话中消息列表随机闪烁与滚动错乱  
- 预览面板展开时输入框高度跳跃  
- 登录重试时回调丢失导致重复登录  
- POPO 连接测试显示假阳性结果  

这些修复均为直接对用户体验的改善，但缺乏用户评论来进一步确认满意度。

---

### 8. 待处理积压

以下开放条目长期未取得进展，建议维护者重点关注：

| 编号 | 类型 | 标题 | 已开放 | 链接 |
|------|------|------|--------|------|
| #1277 | 依赖升级 | `electron` / `electron-builder` 升级（40→43） | 110天 | [链接](https://github.com/netease-youdao/LobsterAI/pull/1277) |
| #1282 | 依赖升级 | `@headlessui/react` 1→2 | 110天 | [链接](https://github.com/netease-youdao/LobsterAI/pull/1282) |
| #1283 | 依赖升级 | `react` 18→19 | 110天 | [链接](https://github.com/netease-youdao/LobsterAI/pull/1283) |
| #1284 | 依赖升级 | `react-syntax-highlighter` 15→16 | 110天 | [链接](https://github.com/netease-youdao/LobsterAI/pull/1284) |
| #2368 | 新功能 | Windows 静默安装（待 Review） | 1天 | [链接](https://github.com/netease-youdao/LobsterAI/pull/2368) |

其中 #1277、#1282、#1283、#1284 均为依赖 Major 升级，可能存在 Breaking Changes。此外 #2368 尚未获得 Review，建议优先处理以避免错失窗口。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw / QwenPaw 开源项目日报 | 2026-07-21

---

## 1. 今日速览

QwenPaw 项目今日保持 **极高活跃度**，24 小时内累计处理 18 条 Issues（14 条活跃 / 4 条关闭）和 42 条 PRs（32 条开放 / 10 条合并或关闭）。核心架构方面，Agent Mode 标准化（#6210 已合并）和 Unified Browser 框架的推进标志着 QwenPaw 正加速从“对话工具”向“通用 Agent 平台”进化。尽管社区报告了多工具调用推理块重复等严重 Bug，但对应的修复 PR（#6280）已及时提交，修复速度值得肯定。PawApp 插件 SDK 正式落地并产出了 Creator 应用，社区贡献者踊跃接入新 Provider 和功能模块，项目生态健康度良好。

---

## 2. 版本发布

无新版本发布。当前稳定版为 **v2.0.0.post3**，开发版 **v2.0.1b1** 持续迭代中。

---

## 3. 项目进展 — 今日合并/关闭的重要内容

### 🔀 合入的核心 PR

| PR | 要点 | 贡献者 |
|---|---|---|
| **#6235** (已合并) 链接 | **ReMe Light 长期记忆集中增强**：索引重建改为显式操作，升级 reme-ai 至 0.4.1.3，增加错峰定时任务与 Markdown 分块优化，大幅提升记忆稳定性。 | @jinliyl |
| **#6150** (已合并) 链接 | **PawApp SDK 与看板应用**：正式定义一等公民的插件应用结构，为插件生态奠定框架基础。 | @zhijianma |
| **#5922** (已合并) 链接 | **Langfuse 可观测性增强**：传播 user_id / session_id 到 Trace 中，修复 Trace ID 格式与 Span 父子关系。 | @alvinlee518 |
| **#6210** (已合并) 链接 | **默认循环标准化为 Agent Mode**：ReAct 循环成为一等 `DefaultMode`，Gate 所有权从 Builder 中剥离，理清生命周期。 | @rayrayraykk |

### ✅ 关闭的关键 Issue

| Issue | 描述 |
|---|---|
| **#5961** (已关闭) 链接 | v2.0.0 **循环执行（Doom Loop）** Bug 得到解决，搭配 qwen3.7-plus 的反复写入/删除问题修复。 |
| **#6101** (已关闭) 链接 | 跨 Agent 模式的**会话重置生命周期不一致**问题完成重构。 |
| **#5958 / #5959** (已关闭) | 社区关于 AgentScope 权限功能和脚本升级路径的疑问得到解答。 |

> **项目向前迈进的关键信号：** Agent 底层 Mode/Gate 模型重构基本落定，PawApp 插件生态从 SDK 走向实际应用（Creato r），记忆层稳定性获显著提升。

---

## 4. 社区热点 — 今日讨论最活跃的话题

### 🔥 #6257 / #6282 — 多工具调用 Thinking 块「完全重复」
- 链接: #6257 | #6282
- 热度: 共 14 条评论，项目今日最热的 Bug 讨论。
- **诉求分析:** 当 Agent 单轮发起多次工具调用时，所有调用输出 `同样的 Thinking 块内容`，而非独立推理。这直接破坏了多步推理的价值。社区反应迅速，**已有 Fix PR #6280** 对齐处理，属于“开发组与社区高度联动”的正面案例。

### 🧩 #6276 / #6157 — 浏览器统一化与 Chrome 扩展
- 链接: #6276 | #6157
- **诉求分析:** 两条 PR 带来一个统一的 `browser` 工具（可对接多后端）以及 Chrome 扩展配对桥。社区关注度极高，反映出用户对 **Agent 具备强大且可控的浏览器操控能力** 有明确刚需。

### 🤝 #6271 — 社区贡献新 Provider「AIOnly」
- 链接: #6271
- **诉求分析:** @Z2Rikka 主动为 QwenPaw 新增聚合 190+ 模型的 AIOnly Provider。此举引发正面讨论，证明 **QwenPaw 的 Provider 接入框架灵活好用**，社区贡献者愿意为丰富模型生态出力。

---

## 5. Bug 与稳定性 — 按严重程度排列

| 严重程度 | Issue / PR | 描述 | 当前状态 |
|---|---|---|---|
| 🔴 **严重** | #6257 / #6282 | 多工具调用 Thinking 块完全重复，推理能力失效 | ✅ **已有 Fix PR #6280**，待合入 |
| 🔴 **严重** | #6197 | Desktop 版在 `nvidia-smi` 挂死时**启动卡死**（Windows + GPU 环境） | ⏳ 待分配，未关联 PR |
| 🟡 **高** | #4873 | 同时启动两个 subagent 导致主 Agent **无限快速轮询**，且飞书渠道无法打断 | ⏳ 积压 51 天，待处理 |
| 🟡 **高** | #6273 | 同会话并发语义混乱，不同入口的序列化行为不一致 | ⏳ 待 PR / 方案 |
| 🟡 **高** | #6242 | Console 中 Embedding 维度设置因 `use_dimensions` 未暴露而**无法生效** | ⏳ 待修复 |
| 🟢 **中** | #6277 | Langfuse Trace ID 格式从 `.hex` 变更为 `str(uuid)` 导致 Langfuse 拒绝写入 | ✅ **已有 Fix PR #6277** |
| 🟢 **中** | #6041 (PR) | `DoomLoopGate` 将正常记忆读取（3次以上）误判为死循环并终止 | ⏳ **待 Review**，关键 UX 修复 |
| ⚪ **低** | #5688 | 前端 CSS 类名 `ant-` vs `qwenpaw-` 不一致，存在样式失效风险 | ⏳ 积压 20 天 |

---

## 6. 功能请求与路线图信号

### 🎯 很可能进入下个版本的功能

| 信号 | 描述 | 对应 PR / Issue |
|---|---|---|
| **🖥️ 计算机控制与统一浏览器** | Unified Browser SDK + Chrome 扩展 + Windows UIA 组成完整矩阵，是 QwenPaw 2.x 的**核心差异化能力** | #6276, #6157, #5187 |
| **🤖 Human-in-the-Loop** | 新增 `ask_user_question` 工具，Agent 在模糊操作前向用户提问，生产环境安全刚需 | #6274 (请求热度高) |
| **📝 用户可编辑 Agent Mode** | 允许用户在运行时自定义 Agent 行为模式 | #6270 (PR 已提交) |

### 💡 社区功能建议汇总

| Issue | 功能诉求 |
|---|---|
| **#6283** 链接 | 自动在当前会话上下文附加**真实时间信息**，解决隔天重启旧会话的日期混淆问题 |
| **#6286** 链接 | 允许用户**禁用/自定义内置工具描述**，当前 22 个内置工具每次消耗 8k-10k Tokens |
| **#6285** 链接 | 阿里云 Token 计划模型列表**新增 qwen3.8-max-preview** |
| **#6287** 链接 | Desktop 版左侧栏增加**会话分组/文件夹功能**，提升导航体验 |
| **#6281** 链接 | **Web 控制台适配移动端**，方便移动设备操作 |
| **#6268** 链接 | 建议内置接入 **AIOnly Provider（190+ 模型）**（PR #6271 已提） |

---

## 7. 用户反馈摘要

### 用户痛点（真实反馈摘录）

> **「长时间循环、无法打断」**
> “搭配 qwen3.7-plus 模型使用时，发现智能体总会反反复复的写入、删除、写入、删除，很长时间也不能完成一个简单任务！”（#5961，已修复）
>
> **「Token 消耗大」**
> “22 个内置系统工具总是加载完整描述…… 消耗约 8,000-10,000 tokens/次。有些工具几乎没用但还是消耗着 tokens。”（#6286）
>
> **「时间感知缺失」**
> “隔多天重启旧会话时模型混淆历史对话日期，误把旧聊天日期当成当下日期。”（#6283）
>
> **「并发控制不便」**
> “同时开两个 subagent 作为后台任务，导致非常频繁的 check_agent_task 调用和 LLM 请求，且飞书侧无法打断。”（#4873）

### 满意 / 认可

- 社区用户主动贡献 **AIOnly Provider** 并得到欢迎（#6268），说明 Provider 接入框架设计成功。
- 用户对齐模型版本节奏敏感度高，第一时间要求加入 `qwen3.8-max-preview`（#6285），说明核心用户群对 QwenPaw 作为首选 Agent 工具的粘性在增强。

---

## 8. 待处理积压 — 需维护者关注

| 类型 | 编号 | 存量天数 | 问题描述 | 建议行动 |
|---|---|---|---|---|
| 🔴 Issue | **#4873** 链接 | **51 天** | subagent 并发导致主 Agent 无限轮询 + 飞书无法打断 | **高优先级**，建议分配专人复现并排期修复 |
| 🟡 PR | **#6041** 链接 | 8 天（待 Review） | 只读工具免于 Doom Loop 误杀（如多次记忆读取） | **尽早 Review & Merge**，影响普通用户体验 |
| 🟡 PR | **#6151** 链接 | 6 天 | 后台工具调用卸载机制的大型重构，修复 #6056 三个 Bug | 复杂度高，建议保持跟踪，避免成为迷路 PR |
| ⚪ Issue | **#5688** 链接 | 20 天 | 前端 CSS 前缀 `ant-` vs `qwenpaw-` 不统一的前端债务 | 推荐在下个 UI 重构周期集中解决 |
| ⚪ Issue | **#6197** 链接 | 5 天 | Desktop 版 `nvidia-smi` 启动挂死 | 若团队有 Windows 环境请尽快复现，影响首次启动体验 |

---

**总结：** QwenPaw 处于大版本（v2.0.x）后的快速修复与功能扩张期。核心架构的标准化收尾、生态插件化启动、以及浏览器/计算机控制方向的投入，都指向一个更通用的 Agent 平台。社区活跃度高且贡献踊跃，若能加快几项长期积压 Bug（#4873、#6197）的解决，项目健康度将进一步提升。

</details>

</div>
