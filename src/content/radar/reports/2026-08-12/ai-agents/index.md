---
title: OpenClaw 生态日报
published: 2026-08-12
report: ai-agents
tags:
  - radar
  - AI
---
# OpenClaw 生态日报 2026-08-12

> Issues: 195 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-12 01:52 UTC

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

# OpenClaw 项目动态日报 — 2026-08-12

## 今日速览

过去24小时项目活跃度极高：共更新195条Issue（新开/活跃154条，关闭41条）和500条PR（待合并273条，合并/关闭227条），无新版本发布。社区讨论焦点集中在消息投递可靠性（silent reply failures持续复发）、Realtime voice会话状态管理、以及工具调用间文本泄漏至消息渠道等P1级问题上。多个修复PR正在推进中，包括UI可访问性改进、Windows原生CLI启动修复、以及配置验证与文档一致性修复，整体项目处于高频迭代状态。

---

## 项目进展

今日共合并/关闭227个PR，以下为值得关注的重要合并：

### UI / 前端
- **[#122312] fix(ui): show a placeholder for remote markdown images**（已合并）— 修复远程Markdown图片被阻止加载后仅显示alt文本、无任何视觉提示的问题，现显示占位符并提示用户可点击查看。关闭 #122281
- **[#122294] fix(ui): let short Canvas previews fit their content**（已合并）— 修复Control UI中短Canvas组件预览框无法收缩至160px以下、留下大片空白区域的问题，将高度下限降至48px。关闭 #122272
- **[#122368] fix(gateway): avoid cold title reads on first session list**（已合并）— 优化Gateway启动后首次会话列表加载性能，避免冷读取会话标题，启动预暖现已包含派生标题。

### Windows / 跨平台
- **[#122334] fix(windows): launch npm-installed native session CLIs**（已合并）— 修复Windows上npm安装的扩展less POSIX shim可能导致OpenClaw选择错误的npm shim或通过cmd.exe路由.cmd shim的问题，影响acpx、anthropic、codex、opencode等扩展。

### 测试与性能
- **[#122369] improve: speed up audit event writer tests**（已合并）— 将审计事件写入器测试套件从39.03秒显著缩短，通过合并重叠的worker线程场景减少测试热点。

### 架构与集成
- **[#107295] refactor(qqbot): install plugin from Tencent package**（已关闭）— 将QQBot从OpenClaw monorepo中解耦，改为从腾讯包安装，消除所有权重复，使腾讯Connect可独立发布该渠道。

### 其他重要合并
- **[#91370] fix(agents): skip text-direct fallback for sessions_yield completions**（已关闭，superseded）— 修复sessions_yield暂停的子代理完成时，原始子文本在父代理回复前直接投递到DM渠道导致重复/乱序消息的问题。

---

## 社区热点

### 讨论最活跃的 Issues

| Issue | 评论数 | 主题 | 状态 |
|-------|--------|------|------|
| [#121058] Silent reply failures still recurring after #116277 closed | 69 | 静默回复失败在#116277关闭后仍持续发生，监控cron持续记录新事件 | OPEN |
| [#116201] Realtime voice work can retain unbounded provider and consult state | 64 | Realtime voice会话在慢速/停滞/突发provider行为下可保留无界状态 | OPEN |
| [#25592] Text between tool calls leaks to messaging channels | 46 | 工具调用间的内部处理文本被路由到Slack/iMessage等可见消息渠道 | OPEN |
| [#7707] Feature Request: Memory Trust Tagging by Source | 43 | 按来源（用户命令/网页抓取/第三方技能）为记忆条目打信任标签，防记忆投毒 | OPEN |

### 分析

**#121058（69评论）** 是当前社区最关注的问题——用户明确表示#116277关闭后问题依旧，监控系统持续记录新事件。这反映出修复未真正覆盖根因，社区对“关闭但未解决”的issue处理方式存在不满情绪。

**#116201（64评论）** 聚焦Realtime voice的资源边界问题，涉及会话状态、provider帧、预就绪音频等无界保留，属于架构层面的深层问题，被标记为diamond lobster高优先级。

**#25592（46评论）** 讨论工具调用间文本泄漏至消息渠道的UX问题，用户认为内部处理输出不应作为可见消息发送，已持续近6个月未解决，社区耐心正在消耗。

**#7707（43评论）** 提出的记忆信任标签是安全相关功能请求，针对记忆投毒攻击场景，社区讨论热烈但尚未进入实施阶段。

---

## Bug 与稳定性

### P1 级（高优先级）

| Issue | 问题描述 | 状态 | Fix PR |
|-------|---------|------|--------|
| [#121058] | Silent reply failures持续复发，无排队回复payload | OPEN | 无 |
| [#116201] | Realtime voice可保留无界provider/consult状态 | OPEN | 无 |
| [#25592] | 工具调用间文本泄漏至消息渠道 | OPEN | 无 |
| [#92201] | Anthropic thinking签名在重放时间歇性无效，恢复包装器因错误文本泛化不触发 | CLOSED | 已关闭 |
| [#92076] | 子代理完成投递在请求方会话不活跃且transcript锁定时失败 | CLOSED | 已关闭 |
| [#98435] | MCP loopback传输在Gateway重启后不自动重连，recovered=1具有误导性 | OPEN | 无 |
| [#112668] | sessions_yield abort-settle超时仍丢弃子代理announce（2026.7.1-2） | OPEN | 无 |
| [#106704] | sessions_yield在子代理首轮（无子代、无唤醒源）时静默将run标记为ok并返回空结果 | OPEN | 无 |
| [#97616] | hook/tool子进程泄漏导致zombie积累和运行时退化 | OPEN | 无 |
| [#114020] | Feishu/Telegram渠道分发失败：runChannelInboundEvent需要runDispatchLifecycle | OPEN | 无 |

### P2 级（中优先级）

| Issue | 问题描述 | 状态 |
|-------|---------|------|
| [#47975] | 子代理会话完成后持续存在，主会话无响应 | OPEN |
| [#83337] | 插件/核心版本漂移导致静默渠道故障 | OPEN |
| [#90781] | memory-core叙事生成静默无文本，写入fallback日记条目 | OPEN |
| [#97335] | Cron fallback模型在正常会话可用但cron触发时LLM请求失败 | OPEN |
| [#105342] | Telegram上所有exec命令输出被渲染为图片而非文本 | OPEN |
| [#74986] | openclaw infer在2026.4.27上无限挂起，子进程100% CPU零网络I/O | OPEN |

### 今日新增值得关注的 Bug

- **[#121953] Cron agent turns stall on DeepSeek** — OpenClaw为cron agentTurn用户消息添加的`[cron:<jobId> <name>]`前缀导致DeepSeek API边缘服务将请求降优先级，造成数十秒至数分钟的停滞。已有PR #121818关联。

---

## 功能请求与路线图信号

### 高热度功能请求

| Issue | 功能 | 评论/反应 | 分析 |
|-------|------|----------|------|
| [#7707] | Memory Trust Tagging by Source | 43评论 | 安全相关，防记忆投毒，社区关注度高 |
| [#42475] | Per-agent cost budget enforcement at gateway level | 21评论/1👍 | 成本控制需求，已有session-cost-usage.ts基础 |
| [#72741] | Standard Interface for External Security and Guardrail Checks | 10评论/1👍 | 安全防护标准化，与#107158（AI safety taxonomy）相关 |
| [#42840] | MathJax/LaTeX Support to Control UI | 8评论/10👍 | 科学计算用户刚需，👍数最高 |
| [#14785] | Reduce tool schema token overhead (~3,500 tok/session) | 9评论 | 成本优化，影响所有会话 |

### 路线图信号

- **UI可访问性改进**成为近期PR密集区：#122316（模型快捷键按搜索焦点门控）、#122066（键盘可达身份菜单底部控件）、#122296（composer能力菜单保持在视口内）均处于开放状态，显示维护者正在系统性地改进键盘导航和UI可用性。
- **配置验证与文档一致性**修复系列（#120332、#117302、#119356、#118148、#117287、#118157、#120736）由同一作者@ayaangazali提交，集中修复“文档声明的配置项被schema拒绝”的问题，涉及IRC、Feishu、Mattermost、Nostr、Twitch等十余个渠道。这些PR若合并将显著提升配置体验。
- **Windows原生支持**是当前重点：#122334已合并修复npm安装的原生会话CLI启动问题，显示项目正在加强Windows平台的生产就绪度。

---

## 用户反馈摘要

### 真实痛点

1. **“关闭但未解决”的挫败感**（#121058）：用户@sloptop-the-terrible明确指出#116277关闭后问题依旧，监控cron持续记录新事件。这种“关闭但未修复”的处理方式正在消耗社区信任。

2. **内部处理文本泄漏**（#25592）：用户@doomclaw描述工具调用间的错误处理、处理确认等内部文本被当作可见消息发送到Slack/iMessage，造成显著UX问题。该问题自2026-02-24提出，已持续近6个月。

3. **exec输出渲染为图片**（#105342）：Telegram用户@Ashowt报告所有exec工具输出被渲染为图片而非文本，无法复制、搜索或引用。2个👍显示这是共性问题。

4. **AGENTS.md启动序列未强制执行**（#87857）：用户@niteshdamani-hue报告代理可跳过AGENTS.md定义的强制启动序列（读取SOUL.md、USER.md、记忆文件等），3个👍表明这是配置型用户的常见诉求。

5. **可访问性正面反馈**（#95601）：macOS VoiceOver用户@xiaopinpin-music感谢v2026.6.9将剩余用量信息移至模型选择器附近，使键盘可达区域更集中。这是少见的正面反馈，说明可访问性改进被用户感知。

### 使用场景洞察

- **多机器人共存场景**成为问题高发区：#40768（Feishu多bot共享群组时@提及不识别）、#38302（多代理Slack应用斜杠命令冲突）均反映真实的多代理部署需求。
- **成本敏感用户**持续关注token开销（#14785）和成本预算（#42475），显示OpenClaw正被用于生产级、7x24小时运行的工作负载。
- **记忆系统稳定性**（#114612 SQLite无界增长、#90781 narrative生成静默失败、#95746 dreaming上下文耗尽）是近期集中反馈的领域，memory-core插件需要更多维护关注。

---

## 待处理积压

### 长期未解决的高优先级 Issue

| Issue | 创建时间 | 持续时间 | 优先级 | 备注 |
|-------|---------|---------|--------|------|
| [#25592] Text between tool calls leaks to messaging channels | 2026-02-24 | ~5.5个月 | P1 | 46评论，社区持续关注 |
| [#7707] Memory Trust Tagging by Source | 2026-02-03 | ~6个月 | P2 | 43评论，安全相关 |
| [#14785] Reduce tool schema token overhead | 2026-02-12 | ~6个月 | P2 | 影响所有会话成本 |
| [#42475] Per-agent cost budget enforcement | 2026-03-10 | ~5个月 | P2 | 已有session-cost-usage.ts基础 |
| [#39811] Model configuration accepts unvalidated model names | 2026-03-08 | ~5个月 | P2 | 静默配置错误风险 |
| [#40982] Raise/remove 3-minute no-output watchdog cap on CLI | 2026-03-09 | ~5个月 | P1 | 2👍，影响长时运行任务 |

### 需维护者关注的 PR 积压

- **[#121327] fix(claws): freeze installed tool profile authority** — 已就绪等待维护者审查，涉及安全边界，标记为P1，等待合并。
- **[#122346] fix(slack): scope enterprise channel and user policies by workspace** — 修复Enterprise Grid组织安装中策略误应用到错误工作区的问题，P1安全边界相关。
- **[#115531] fix(imessage): reconcile send timeouts by exact attempt ID** — 修复iMessage发送超时重试导致重复消息的问题，依赖openclaw/imsg#235，处于“needs proof”状态。
- **[#93247] fix(diagnostics): idle ownerless state after failed recovery** — 修复失败恢复后遗留无主诊断条目非空闲状态的问题，已就绪等待维护者查看。

---

*本日报由 AI 分析师基于 GitHub 公开数据自动生成，数据截至 2026-08-12。所有链接均指向 openclaw/openclaw 仓库。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期**：2026-08-12  
**分析范围**：OpenClaw、NanoBot、PicoClaw、NanoClaw、IronClaw、LobsterAI、CoPaw、Moltis（Zeroclaw 数据缺失，不纳入定量对比）


## 1. 生态全景

当前个人 AI 助手开源生态正处于**高速迭代的活跃期**，各项目在消息可靠性、记忆管理、安全边界与渠道适配四个维度密集投入，且普遍采用高频 PR 合并节奏（单日数十条量级）支撑功能演进。社区反馈呈现"生产环境真实痛点"驱动的特征——静默失败、状态泄漏、配置失效等问题频发，意味着该生态已从 demo 阶段进入**真实工作负载考验期**。同时，远程 MCP 连接、成本观测、跨平台支持等方向开始形成共性投入，预示下一阶段竞争将从功能数量转向 **可靠性工程与生态兼容性**。整体看，生态处于"创造性旺盛但工程质量参差"的阶段性状态。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | Issues（关闭） | PR（待合并） | PR（合并/关闭） | Release | 健康度评估 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 154 | 41 | 273 | 227 | 无 | 极高活跃，但 P1 积压严重，社区存在"关闭但未解决"的信任危机 |
| **IronClaw** | 6 | 5 | 25 | 25 | 无 | 高活跃，核心维护者产出密集，外部贡献增加，v1.3.0 前期收敛 |
| **NanoBot** | 2（另有4条关闭） | 4 | 21 | 119 | 无 | 高活跃，安全与稳定性主线明确，合并效率高（119/140） |
| **CoPaw** | 7 | 9 | 23 | 25 | v2.1.0-beta.3 | 高活跃，合并率高（25/48），v2.1.0 正式版密集收尾期 |
| **LobsterAI** | 1 | 3 | 3 | 7 | 2026.8.11 | 中高活跃，有版本产出，但历史积压（4+个月）与限流隐患并存 |
| **NanoClaw** | 1 | 0 | 5 | 3 | 无 | 中活跃，核心功能推进清晰，但 PR 审查积压（最老 105 天） |
| **PicoClaw** | 2 | 1 | 6 | 0 | 无 | 低活跃度中显拥堵：社区产出旺盛（当日 Issue 即获 PR），但 0 合并、4 个 PR stale，**审查吞吐是瓶颈** |
| **Moltis** | 0 | 0 | 1 | 0 | 无 | 低迷，单一 PR 无评论，社区互动极少 |

**注释**：Zeroclaw 当日数据采集失败，未纳入对比。


## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态中体量最大、问题最复杂、社区声量最高的"基础设施级"项目**，其单一仓库日 PR 量（500 条）即超过多数对标项目全仓库总量。与同类相比：

- **社区规模碾压级差异**：最热 Issue 讨论达 69 条评论，是 NanoBot（10条）、CoPaw（10条）、PicoClaw（3条）同指标的 6~20 倍。生态辐射力差异显著。
- **技术路线：Monorepo 全栈覆盖**。从 UI（Control UI）到网关（Gateway）、渠道（Feishu/Telegram/Slack/iMessage）、子代理（subagents）、记忆系统（memory-core）全自研，而 NanoBot/CoPaw 走轻量集成路线，IronClaw 依赖 NEAR 生态底座。这使 OpenClaw 灵活性最高，但技术债与维护复杂度也最大——P1 问题积压（10+ 个长期开放）即是成本。
- **社区情绪分化**：OpenClaw 用户群已从"尝鲜者"转向"生产依赖者"，对"关闭但未解决"（#121058）和长期未修的 UX 缺陷（#25592，近 6 个月）表现出的挫败感，正是大社区高期待带来的双刃剑。

**一句话总结**：OpenClaw 是生态的"风向标"与"问题库"——它定义了大多数功能边界（子代理、渠道、记忆），但也以自身的复杂性为整个生态的可靠性挑战树立了警示样本。


## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求与案例 |
|---|---|---|
| **消息投递可靠性与可观测性** | OpenClaw、NanoBot、NanoClaw | 三项目同日出现同类问题：OpenClaw #121058 静默回复失败复发；NanoBot #5256/#5327 重复消息输出；NanoClaw #3226 入站消息静默丢弃。共性诉求是"**失败必须可见**"，宁可延迟或报错也不静默吞消息 |
| **记忆/上下文管理的稳定性与安全** | OpenClaw、IronClaw、CoPaw、PicoClaw | OpenClaw #7707 记忆信任标签（防投毒）、#114612 SQLite 无界增长；IronClaw #7505 memory 契约跨 provider 不一致；CoPaw #6564 记忆未在压缩前刷新；PicoClaw #3301 路由 agent 上下文不记忆。跨项目印证记忆系统是当前最不成熟的模块 |
| **工具/插件执行安全边界** | NanoBot、CoPaw、OpenClaw、IronClaw | NanoBot #5306 exec 白名单绕过；CoPaw #6916 插件可静默创建定时任务；OpenClaw #121327 工具权限冻结；IronClaw #7487 disclosure 安全网瓦解。安全从"功能请求"变为"漏洞报告"，说明攻击面随能力扩展同步扩大 |
| **渠道适配与配置一致性** | OpenClaw、PicoClaw、CoPaw、LobsterAI | OpenClaw 配置验证修复系列（涉及十余渠道）、#114020 Feishu/Telegram 分发失败；PicoClaw #3328 Line webhook 配置无消费者；CoPaw #6909 渠道冲突检测；LobsterAI #1237 配置静默丢失。渠道数量竞赛之后，"配置可信度"成为新战场 |
| **LLM 成本观测与控制** | OpenClaw、IronClaw、PicoClaw | OpenClaw #14785 工具 schema token 压缩（约3,500 tok/会话）、#42475 每代理成本预算；IronClaw #6997/#7274 Anthropic prompt cache 优化；PicoClaw #3317 日志输出 cache token 统计。成本透明化正在成为生产部署的刚需 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能自主 agent（多渠道、子代理、记忆、技能），通用型 | 高级开发者、追求最大灵活性的自托管用户 | Monorepo 全栈自研，网关 + 渠道 + 执行层统一，生态集成丰富但复杂度高 |
| **IronClaw** | NEAR AI 生态优先的通用 agent，自动化运行与 WebUI 体验并重 | NEAR 生态开发者、部署自动化场景用户 | 与 NEAR AI provider 深度绑定，v1.3.0 聚焦 automation 可靠性，CLI（ACP 协议）与 WebUI 双入口 |
| **NanoBot** | 轻量级个人助理，强调快速部署与模型 provider 兼容 | 个人开发者、中小型部署场景 | 模块化架构，大量功能以 PR 生态生长；exec 沙箱安全与插件系统是当前焦点 |
| **CoPaw** | 桌面优先（Console/Desktop）的全能 agent，中文社区活跃 | 桌面端用户、企业协作场景（QQ/Feishu） | 桌面应用形态 + 自托管后端，文件工作区、Computer Use 等本地能力投入明显 |
| **LobsterAI** | 桌面端（Electron）AI 协作客户端，Cowork 模式 | 桌面重度用户、协作/多 agent 管理需求 | 客户端形态，与 OpenClaw 深度兼容，专注会话管理、本地文件工作流、任务可视化 |
| **PicoClaw** | 轻量多渠道聊天机器人框架，树莓派等边缘设备可跑 | 极客、轻量部署场景、聊天机器人用户 | 强调低资源占用，平台适配（Discord/Telegram/Line）优先，但目前审查管线是短板 |
| **NanoClaw** | 远程 MCP 支持与模板/插件体系现代化 | 需要 MCP 生态接入的开发者 | 模板向 Agent Plugins 1.0 迁移，MCP 支持从 stdio 扩展至 Streamable HTTP |
| **Moltis** | 本地数据连接器（CalDAV 等）与 agent 只读数据访问 | 本地优先（local-first）/ 数据隐私敏感用户 | 连接器持久化 + 代理工具只读访问，理念清晰但项目成熟度极低 |


## 6. 社区热度与成熟度

**第一梯队：高活跃 + 密集迭代期（功能快速膨胀，质量波动中）**
- **OpenClaw**：日 PR 500 条，功能覆盖面最广，但 P1 积压与技术债同步累积。
- **IronClaw**：日 PR 50 条，核心维护者稳定输出，v1.3.0 前功能收敛，项目控制力强。
- **CoPaw**：日 PR 48 条，合并效率高（52%），处于 v2.1.0 发布前夕的"集中打磨期"。

**第二梯队：中高活跃 + 质量巩固期（功能扩张放缓，聚焦稳定性）**
- **NanoBot**：合并效率极高（85%），安全修复与稳定性改进为主线，社区互动规模中等。
- **LobsterAI**：有版本节奏（本轮发布 2026.8.11），功能推进快，但社区 PR 合入率低（#1239/#1241 被 stale 关闭）且历史 bug 久拖未决。
- **NanoClaw**：活跃度中等，核心方向明确（MCP、插件体系），但审查积压（105 天）暗示维护人力有限。

**第三梯队：低活跃/瓶颈期（社区产出与维护吞吐不匹配）**
- **PicoClaw**：5 个 PR 待合并、4 个 stale，Issue #3301 高严重 bug 已 14 天无维护者响应，**合并管线是当前核心瓶颈**。
- **Moltis**：接近静默状态，单 PR 悬置，无社区讨论，项目处于早期孵化或停滞边缘。

**分层总结**：第一梯队是生态引擎，但需要警惕"迭代速度 > 质量收敛"的风险；第二梯队是生态的中坚力量，在产品化与稳定性上投入更谨慎；第三梯队若不能解决审查吞吐问题，将面临贡献者流失的恶性循环。


## 7. 值得关注的趋势信号

**① 安全边界正在从"功能需求"变为"漏洞挖掘"主题**
NanoBot exec 白名单绕过（shell 链拼接）、CoPaw 插件无确认静默创建定时任务、OpenClaw 工具权限冻结 PR、IronClaw disclosure 安全网修正——四个项目同日出现安全议题，且均出自具有安全研究深度的用户。这是生态走向生产环境的必然阵痛。**信号**：具备安全审计能力的贡献者将成为稀缺资源，权限模型（插件、工具、exec）的标准化设计是下一轮竞争焦点。

**② 消息投递语义从"尽力而为"转向"明确可观测"**
OpenClaw 静默回复失败、NanoBot 重复回复、NanoClaw 入站消息静默丢弃——三个项目各自的"静默"问题本质同一：**失败不可观测 = 用户信任流失**。**信号**：消息幂等语义、去重丢弃告警、发送确认机制将很快成为 agent 框架的标配能力。

**③ 记忆系统是"看起来热闹、实际上最不成熟"的模块**
记忆信任标签、跨 provider 契约一致性、无界增长、压缩前刷新、路由场景失效——五个项目在记忆方向各有一个独立痛点，说明**没有任何项目已解决记忆可靠性问题**。**信号**：记忆将是从"demo 功能"到"生产可用"门槛最高的模块，率先实现记忆可观测、可回滚、可信溯源的项目将获得差异化优势。

**④ 远程 MCP 与网关型 provider 成为扩展性共识**
NanoClaw 完成 Streamable HTTP MCP 全 provider 覆盖、CoPaw 集成 AnySearch/OrcaRouter、NanoBot 新增 OrcaRouter gateway——生态正在从"本地工具调用"向"云端工具生态接入"演进。**信号**：MCP over HTTP 的标准化支持将会成为个人 AI 助手连接外部服务的事实标准。

**⑤ 成本透明化（token 级观测）成为生产部署刚需**
OpenClaw 工具 schema token 压缩请求、IronClaw Anthropic prompt cache 显式断点、PicoClaw 日志输出 cache tokens——三个项目同日推进成本观测与优化。**信号**：下一个版本中，per-session token 统计、缓存命中率展示、工具 schema 压缩很可能成为默认功能。

**⑥ 渠道数量竞赛进入"配置可信度"阶段**
各项目已覆盖主流 IM 渠道，但用户痛点从"缺少渠道"转向"配置了没效果"（PicoClaw Line、OpenClaw 多渠道配置验证、LobsterAI 配置静默丢失）。**信号**：配置 schema 校验、冲突检测、静默配置告警将取代"新增渠道"成为差异化方向。

**⑦ Windows 与边缘设备的生产就绪度被公开检验**
OpenClaw 合并 Windows npm 原生 CLI 修复、PicoClaw 面向树莓派部署、LobsterAI 的 Windows 遮罩循环 bug 持续 4+ 个月——非 macOS/Linux 服务器环境正在成为真实用户场景。**信号**：跨平台 CI 覆盖与 Windows 专项测试将进入核心维护者的优先级列表。

---

*本报告基于 2026-08-12 各项目 GitHub 公开动态数据生成，旨在为技术决策者提供生态横截面参考。数据来源包括 openclaw/openclaw、HKUDS/nanobot、sipeed/picoclaw、qwibitai/nanoclaw、nearai/ironclaw、netease-youdao/LobsterAI、agentscope-ai/CoPaw、moltis-org/moltis。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 (2026-08-12)

## 1. 今日速览

过去 24 小时 NanoBot 社区高度活跃：共 140 条 PR 更新，其中 119 条被合并/关闭，21 条待合并；6 条 Issue 更新，其中 4 条已关闭。无新版本发布。安全与稳定性是今日主线——两个 API 密钥暴露问题（#4783、#4784）已关闭，但仍有一个 `exec` 命令白名单绕过漏洞（#5306）保持开放；重复响应类 bug（#5327 已修复关闭，#5256 仍在跟进）成为社区讨论最集中的体验痛点。新增 PR 聚焦进程树清理（#5346）、WebUI 重新设计（#5342）与循环工具调用告警（#5344），整体迭代节奏健康。

## 3. 项目进展

今日共有 119 条 PR 被合并或关闭，另有 21 条处于待合并状态。从公示数据可观察到以下推进方向：

**一批早期功能 PR 今日以 `[conflict]` 状态关闭**（创建于 2-3 月，更新于今日），覆盖小米 MiMo 支持（[#2181](https://github.com/HKUDS/nanobot/pull/2181)）、Tavily 搜索工具（[#1321](https://github.com/HKUDS/nanobot/pull/1321)）、fallback 模型支持（[#1199](https://github.com/HKUDS/nanobot/pull/1199)）、cron 热重载（[#1114](https://github.com/HKUDS/nanobot/pull/1114)）、OpenCode Zen 提供商（[#1094](https://github.com/HKUDS/nanobot/pull/1094)）、Telegram 内联键盘（[#1020](https://github.com/HKUDS/nanobot/pull/1020)）等。标注冲突关闭而非合并，提示项目架构在过去几个月内快速演进，早期实现已无法与当前代码库自动兼容，需维护者决策是否基于新架构重做。

**安全修复方面**，两个安全 Issue 已关闭（[#4784](https://github.com/HKUDS/nanobot/issues/4784)、[#4783](https://github.com/HKUDS/nanobot/issues/4783)），相关修复预计已合入主分支，环境变量泄漏问题得到控制。

**新提交/活跃 PR 清晰指向稳定性与体验增强**：
- [fix(exec): terminate one-shot process trees on cleanup #5346](https://github.com/HKUDS/nanobot/pull/5346)（今日新建）：修复超时/取消时仅杀 root shell、子进程残留后台运行的问题。
- [feat(webui): redesign apps discovery #5342](https://github.com/HKUDS/nanobot/pull/5342)：重构 WebUI 应用发现界面，加入 Disvoer/Installed/All 视图与 Featured 推荐位。
- [fix(agent): warn instead of silently spiraling on repeated identical tool calls #5344](https://github.com/HKUDS/nanobot/pull/5344)：为工具调用循环增加重复检测与告警，避免 `max_iterations` 被静默耗尽。
- [fix(skills): make weather workflow Windows-safe #5341](https://github.com/HKUDS/nanobot/pull/5341)：修复 Windows PowerShell 下 `curl` 别名导致的天气技能失效。

## 4. 社区热点

**[Issue #5327 — “Nanobot repeats multiple times the same message while reasoning”](https://github.com/HKUDS/nanobot/issues/5327)**（10 条评论，今日更新并关闭）是近 24 小时讨论热度最高的问题。现象是智能体在推理过程中随机重复同一句话，虽不阻断任务但严重影响对话质量。该 Issue 已关闭，意味着问题得到定位和修复。

**安全类议题形成讨论集群**，三条相关 Issue 集中出现关注 API 密钥管理与命令执行边界：
- [#4784 — Provider API keys leaked between providers via global os.environ mutation](https://github.com/HKUDS/nanobot/issues/4784)（已关闭）
- [#4783 — CLI apps run with full os.environ；API keys leaked to installed app subprocesses](https://github.com/HKUDS/nanobot/issues/4783)（已关闭）
- [#5306 — `exec.allowPatterns` shell-chain bypass allows unintended command execution](https://github.com/HKUDS/nanobot/issues/5306)（开放中）

其中 [#5306](https://github.com/HKUDS/nanobot/issues/5306) 目前仅 1 条评论但属于安全漏洞，应优先关注（详见下节）。

**[Issue #5256 — “/goal message produces dozens of repeated replies”](https://github.com/HKUDS/nanobot/issues/5256)** 仍开放，与 #5327 现象类似但触发场景不同（等待用户回答时持续输出）。用户 @shakewingo 同时提交了修复 PR [#5257](https://github.com/HKUDS/nanobot/pull/5257)，说明社区已形成“报告-修复”闭环。

此外，[#5333 — OpenRouter 支持 Server Tools](https://github.com/HKUDS/nanobot/issues/5333) 是本期唯一新功能请求，虽无评论，但代表用户对网关型提供商集成的需求。

## 5. Bug 与稳定性

按严重程度排列（高 → 低）：

1. **高 — `exec.allowPatterns` shell 链绕过（[#5306，开放中）**  
   允许绕过命令白名单执行未预期的 shell 命令，属于安全边界失效。目前无关联 fix PR，建议维护者尽快评估。

2. **中 — `/goal` 消息产生数十条重复回复（[#5256，开放中）**  
   在等待用户回答期间持续循环输出，直到用户干预或模型自我识别为系统循环。已有对应修复 PR [#5257](https://github.com/HKUDS/nanobot/pull/5257) 在待合并列表。

3. **中 — 推理时重复相同消息（[#5327，已关闭）**  
   随机出现、影响对话体验。已关闭，修复已合入（无对应 PR 展示）。

4. **低 — API 密钥环境变量泄漏（[#4784](https://github.com/HKUDS/nanobot/issues/4784)、[#4783](https://github.com/HKUDS/nanobot/issues/4783)，均已关闭）**  
   gateway 型 provider 会覆盖已有 `env_key`，CLI 子进程继承完整环境变量。昨日已关闭，预计修复合入。

**已有修复 PR 的 Stability 改进（待合并）**：
- [#5346 fix(exec)](https://github.com/HKUDS/nanobot/pull/5346)：确保超时/取消/异常时终止整个进程树，防止子进程残留。
- [#5344 fix(agent)](https://github.com/HKUDS/nanobot/pull/5344)：重复工具调用时发出警告而非静默空转。
- [#5314 fix(providers)](https://github.com/HKUDS/nanobot/pull/5314)：按 schema 解码嵌套 JSON 工具参数，修复部分 OpenAI 兼容 provider 的兼容性问题。
- [#5341 fix(skills)](https://github.com/HKUDS/nanobot/pull/5341)：修复 Windows 下天气技能的 curl 兼容性。

## 6. 功能请求与路线图信号

**新增功能请求**：
- [#5333 支持 OpenRouter Server Tools](https://github.com/HKUDS/nanobot/issues/5333)（已关闭）：用户请求支持 Web Search、Web Fetch 等 server tools，说明网关型 provider 的工具透传能力是社区关注点。结合 [#5328 OrcaRouter gateway PR](https://github.com/HKUDS/nanobot/pull/5328)，项目正在加强网关提供商支持。

**正在开发的新功能（有开放 PR，可能进入下一版本）**：
- **WebUI 应用发现重构**（[#5342](https://github.com/HKUDS/nanobot/pull/5342)）：Discover/Installed/All 视图切换 + Featured 推荐位。
- **per-session 沙箱隔离**（[#5283](https://github.com/HKUDS/nanobot/pull/5283)）：非 WebUI 渠道的会话级文件系统隔离，可选开启。
- **subagents 模型预设**（[#4291](https://github.com/HKUDS/nanobot/pull/4291)）：子代理可指定父代理预设之外的模型，已开放 2 个月。
- **天气技能修复**（[#4145](https://github.com/HKUDS/nanobot/pull/4145)）：同样为长驻 PR，已开放 2 个月。

**`[conflict]` 关闭的 PR 所代表的需求方向**（可能需重做或明确关闭）：Tavily 搜索（[#1321](https://github.com/HKUDS/nanobot/pull/1321)）、fallback 模型（[#1199](https://github.com/HKUDS/nanobot/pull/1199)）、Telegram 内联键盘（[#1020](https://github.com/HKUDS/nanobot/pull/1020)）、cron 热重载（[#1114](https://github.com/HKUDS/nanobot/pull/1114)）等功能仍具社区价值，建议维护者基于当前架构评估是否重新实现。

## 7. 用户反馈摘要

- **重复响应是当前最集中的体验痛点**。[#5327](https://github.com/HKUDS/nanobot/issues/5327) 用户报告“随机重复同一句话”；[#5256](https://github.com/HKUDS/nanobot/issues/5256) 用户描述“/goal 产生几十条近似相同的回复，只有用户干预才停止”。两者叠加说明 agent 循环控制逻辑仍有缺陷，社区对对话质量的期望较高。

- **安全用户画像偏专业**。报告者 @hamb1y 同时提交了 [#4784](https://github.com/HKUDS/nanobot/issues/4784) 与 [#4783](https://github.com/HKUDS/nanobot/issues/4783)，从 `os.environ` 可变性与子进程环境继承两个角度指出 API 密钥泄漏路径，说明用户对密钥隔离有系统性思考。另 [#5306](https://github.com/HKUDS/nanobot/issues/5306) 的复现路径（shell 链拼接绕过 `allowPatterns`）也体现了安全研究者的深度。

- **正向反馈与需求并存**。[#5333](https://github.com/HKUDS/nanobot/issues/5333) 作者明确表示“感谢创建如此出色的项目”，同时提出 OpenRouter server tools 集成需求，反映第三方提供商生态的期望值在提升。

## 8. 待处理积压

**需要维护者决策的长驻 PR**（开放超 2 个月）：
- [#4291 feat(spawn)：subagents 模型预设](https://github.com/HKUDS/nanobot/pull/4291)（6-11 创建，已开放 2 个月）
- [#4145 fix：天气技能修复](https://github.com/HKUDS/nanobot/pull/4145)（6-01 创建，已开放 2 个月）

**仍需快速响应的安全/功能问题**：
- [#5306 `exec.allowPatterns` 绕过漏洞](https://github.com/HKUDS/nanobot/issues/5306)（开放 3 天，安全相关，建议最高优先级）
- [#5256 `/goal` 重复回复 bug](https://github.com/HKUDS/nanobot/issues/5256)（开放 7 天，有修复 PR [#5257](https://github.com/HKUDS/nanobot/pull/5257) 等待合并）

**当前 21 条待合并 PR 中值得重点关注的**（除上述外）：
- [#5346 exec 进程树清理修复](https://github.com/HKUDS/nanobot/pull/5346)（今日创建，稳定性）
- [#5342 WebUI apps 发现重构](https://github.com/HKUDS/nanobot/pull/5342)（体验方向）
- [#5344 工具调用循环告警](https://github.com/HKUDS/nanobot/pull/5344)（稳定性）
- [#5328 OrcaRouter 网关提供商](https://github.com/HKUDS/nanobot/pull/5328)（新能力）
- [#5314 嵌套 JSON 参数解码修复](https://github.com/HKUDS/nanobot/pull/5314)（兼容性）

建议维护者按“安全漏洞 → 稳定性 bug → 功能 PR”的优先级分批审查，避免长驻 PR 进一步扩大冲突面。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时项目无新版本发布；3 条 Issue 更新（2 条活跃、1 条已关闭），6 条 PR 全部处于待合并状态，无合并/关闭。社区贡献较为活跃，新 Issue #3328（Line webhook 配置失效）在当日即获得 PR #3329 认领，形成快速修复闭环。但需警惕的是，6 个待合并 PR 中有 4 个已被标记为 `[stale]`，且 Issue #3294 因长期无活动被直接关闭，表明维护者审查吞吐可能是当前项目的主要瓶颈。整体来看，项目正处于功能与修复的排队累积期，健康度中等——社区产出旺盛，但合并节奏滞后。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日 **0 个 PR 被合并或关闭**，没有新的功能或修复在当日落地主线。唯一关闭的 Issue #3294（`/list models` 显示不完整）是以 `[stale]` 状态被清理，而非修复后关闭，说明该问题实际未解决。

不过，待合并管线中有多项高价值修复值得关注：

- **[#3316](https://github.com/sipeed/picoclaw/pull/3316) 修复路由 agent 上下文管理**：解决 dispatch rules 路由后的聊天不记忆历史、自动压缩/摘要永不触发的问题，直接对应最活跃的 Issue #3301；
- **[#3314](https://github.com/sipeed/picoclaw/pull/3314) 修复 customAllowPatterns 失效**：默认拒绝规则总是优先于用户允许列表，导致 `git push` 等合法命令被拦截；
- **[#3329](https://github.com/sipeed/picoclaw/pull/3329) 修复 Line webhook 配置被静默忽略**：将无效配置行为改为显式告警，提升配置系统的可信度。

这三项一旦合并，将集中解决社区近期反馈最密集的三类生产环境缺陷。

## 4. 社区热点

- **[#3301 [BUG] 路由 agent 的 /clear 与自动压缩失效](https://github.com/sipeed/picoclaw/issues/3301)** — 3 条评论，今日讨论度最高。用户 @j-v 在树莓派 + Discord/Telegram + DeepSeek 的真实部署中复现问题，并同步提交了修复 PR #3316。其背后诉求是：多 agent 路由场景下的会话上下文管理必须与默认 agent 行为一致，这是多通道生产部署的刚需。
- **[#3294 [/list models 只显示当前模型]](https://github.com/sipeed/picoclaw/issues/3294)** — 3 条评论但已作为 stale 关闭。用户依据命令描述"Configured models"预期看到全部已配置模型，实际只输出当前模型，暴露了命令语义与实现不符的产品一致性问题。
- **[#3328 [Line webhook 配置无消费者]](https://github.com/sipeed/picoclaw/issues/3328)** — 虽无评论，但创建当日即有 PR 认领，是今日"报告即修复"效率最高的议题。用户 @qing-wang 通过代码审计发现配置声明、默认值、文档三者齐全，但代码中无人读取，体现了社区对配置系统可靠性的较高要求。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 问题描述 | 修复 PR |
|---|---|---|---|
| 🔴 高 | [#3328](https://github.com/sipeed/picoclaw/issues/3328) | `line.settings.webhook_host/webhook_port` 配置被静默忽略——声明、默认值、文档齐全但无任何代码消费，用户设置后无效果也无警告 | 已有 [#3329](https://github.com/sipeed/picoclaw/pull/3329) |
| 🔴 高 | [#3301](https://github.com/sipeed/picoclaw/issues/3301) | 经 dispatch rules 路由的聊天中 `/clear` 与自动压缩失效，agent 无法跨消息记忆，压缩永不触发，导致上下文无限增长 | 已有 [#3316](https://github.com/sipeed/picoclaw/pull/3316) |
| 🟠 中高 | [#3314](https://github.com/sipeed/picoclaw/pull/3314) | `customAllowPatterns` 不生效：默认拒绝模式总是优先，用户添加到允许列表的 `git push` 仍被拦截，与测试预期相悖 | 修复 PR 即 [#3314](https://github.com/sipeed/picoclaw/pull/3314) 本身 |
| 🟡 低 | [#3294](https://github.com/sipeed/picoclaw/issues/3294) | `/list models` 只显示当前模型，与命令描述"Configured models"不符 | 无，已按 stale 关闭 |

前三个问题全部已有对应修复 PR，但均未合并，处于等待审查状态。

## 6. 功能请求与路线图信号

- **[PR #3299 原生 Exa 网络搜索 provider](https://github.com/sipeed/picoclaw/pull/3299)** — 新增 `tools.web` / `web_search` 的 Exa 后端，支持 `d/w/m/y` 时间范围过滤。这是对已有搜索生态的实质性扩展，很可能进入下一版本。
- **[PR #3315 Telegram 私有聊天支持 topics](https://github.com/sipeed/picoclaw/pull/3315)** — 补全 Telegram 平台能力，当前仅在 forum supergroup 中处理 topic，私有机器人聊天中的 `IsTopicMessage` 被忽略。
- **[PR #3317 日志输出 prompt cache tokens](https://github.com/sipeed/picoclaw/pull/3317)** — 在 LLM 响应 debug 日志中增加缓存 token 统计，对 DeepSeek / Cloudflare AI Gateway 用户的成本与性能观测有直接价值。

综合来看，**Exa 搜索 + Telegram topics + 缓存观测** 构成了下一个版本可能的功能增量；而路由上下文修复（#3316）与执行白名单修复（#3314）则是优先级更高的稳定性补丁。

## 7. 用户反馈摘要

- **配置信任问题**：@qing-wang 指出配置了 webhook 地址却完全无效且无任何警告，用户对"文档存在但代码不消费"的配置项表示强烈不信任（[#3328](https://github.com/sipeed/picoclaw/issues/3328)）。
- **多 agent 路由的生产级痛点**：@j-v 在 Discord 频道通过 dispatch rules 路由 agent，发现会话完全不记忆、自动压缩不触发，属于影响日常使用的关键缺陷（[#3301](https://github.com/sipeed/picoclaw/issues/3301)）。
- **权限模型与文档预期偏差**：@j-v 将 `git push` 加入 exec 允许列表仍被拦截，且与测试预期不符，说明 `guardCommand` 的实际优先级逻辑与文档/测试相悖（[#3314](https://github.com/sipeed/picoclaw/pull/3314)）。
- **命令语义困惑**：@2suige-coder 根据 `/list models` 的描述"Configured models"合理预期列出全部模型，结果只显示当前模型，产品文案与行为不一致（[#3294](https://github.com/sipeed/picoclaw/issues/3294)）。
- **平台细节洞察**：@genuss 发现 Telegram 的 forum supergroup 与 private bot chat 在 topic 处理上机制不同，PicoClaw 仅覆盖前者，用户对 IM 平台差异的敏锐度较高（[#3315](https://github.com/sipeed/picoclaw/pull/3315)）。

## 8. 待处理积压

以下事项长期未获维护者响应，建议重点关注：

- **[PR #3299 原生 Exa 搜索 provider](https://github.com/sipeed/picoclaw/pull/3299)** — 07-26 开放，已 stale 17 天。功能完整的新集成，持续搁置将消耗贡献者耐心。
- **[PR #3316 路由 agent 上下文修复](https://github.com/sipeed/picoclaw/pull/3316)** — 08-03 开放，已 stale。对应 Issue #3301，是当前最严重生产 bug 的修复，应优先审查合并。
- **[Issue #3301](https://github.com/sipeed/picoclaw/issues/3301)** — 07-29 创建至今 14 天，3 条评论，无维护者回复迹象；社区在等待明确反馈或合并信号。
- **[PR #3315 Telegram 私有聊天 topics](https://github.com/sipeed/picoclaw/pull/3315)** — 08-03 开放，已 stale。
- **[PR #3317 prompt cache token 日志](https://github.com/sipeed/picoclaw/pull/3317)** — 08-04 开放，已 stale。

此外，Issue #3294 以 stale 方式关闭但问题并未修复，建议维护者确认是否需要在未来版本中重新打开或修复 `/list models` 的行为。

---

**项目健康度小结**：社区贡献质量高、响应快（新 Issue 当日即有 PR），但 6 个 PR 全部积压、4 个进入 stale 状态，合并管线明显拥堵。建议维护者优先处理 #3316 与 #3314 两个高影响修复，并尽快对 Exa 搜索 PR 给予明确审查意见，以避免贡献者流失。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时 NanoClaw 保持中高活跃度：1 条新 Issue、8 条 PR 更新，其中 3 条已关闭/合并。核心团队与社区在三条主线上推进：远程 Streamable HTTP MCP 服务器支持已覆盖全部 provider（#3092、#3221）、Agent 模板向 Agent Plugins 1.0.0 格式迁移的引擎级改动就绪（#3220）、Tavily 搜索工具技能合入（#3190）。同时，社区报告了一则值得警惕的可靠性问题（#3226：平台复用 message id 时入站消息被静默丢弃），目前尚无对应修复 PR。整体看项目迭代节奏健康，但 PR 审查存在一定积压（最老的 #2134 已开放 105 天）。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日 3 条 PR 关闭/合并，均为实质功能推进：

- **远程 Streamable HTTP MCP 服务器支持（引擎 + Claude provider）— #3092 [已关闭]**
  引擎与 Claude provider 现在可接受 `{ type: 'http', url }` 形式的 `mcpServers` 配置，打破此前仅支持 stdio 的限制，为接入远程 MCP 生态打开通道。
  https://github.com/nanocoai/nanoclaw/pull/3092

- **codex 与 opencode provider 的远程 HTTP MCP 支持 — #3221 [已关闭]**
  #3092 的配套收尾：此前 codex/opencode 的配置写入仍假设 stdio-only 的 `McpServerConfig`，HTTP 条目会在配置写入阶段抛错。此 PR 修复了 provider 间行为不一致，使远程 MCP 支持在该分支上全面对齐。
  https://github.com/nanocoai/nanoclaw/pull/3221

- **新增 Tavily MCP 工具技能 — #3190 [已关闭]**
  以 utility skill 形式（`.claude/skills/<name>/`，无源码改动）新增 Tavily 搜索工具，扩充了 Agent 的"开箱即用"技能生态。
  https://github.com/nanocoai/nanoclaw/pull/3190

另有 5 条 PR 待合并，其中核心方向为：**#3220**（agent templates 升级为 Agent Plugins 1.0.0 目录，属破坏性格式迁移，并附带 stamp-time symlink/caps/secret 安全加固）与 **#2909**（模板设置向导 + 首个 agent stamping，模板功能 2/2 部分）。两者需协同合入，是模板/插件体系进入 1.0 形态的关键两半。

## 4. 社区热点

今日社区讨论并不热烈，唯一带评论的讨论项是新 Issue：

- **#3226 入站消息被静默丢弃（@dweekly，1 条评论）**
  当平台在同一会话中复用 message id 时，入站消息被静默丢弃——既不送达 Agent，也无任何用户可见提示。从用户视角看，这与"Agent 无视了我"完全无法区分。
  https://github.com/nanocoai/nanoclaw/issues/3226

该问题虽只有 1 条评论，但触及 AI Agent 产品的核心信任点：**静默失败**。背后诉求本质是消息幂等/去重语义的明确化——即使去重是合理行为，丢弃也必须可观测（日志、事件或用户提示）。建议维护者尽快确认网关层的预期幂等行为，并为丢弃场景补充可见信号。

## 5. Bug 与稳定性

按严重程度排列：

- **[高] 入站消息静默丢失 — #3226（新报告，无修复 PR）**
  平台复用 message id 时消息被静默丢弃，Agent 收不到且无任何用户可见提示。属于消息丢失类可靠性问题，用户无法区分"消息丢了"和"Agent 没理我"，易造成信任流失。建议排查现有去重机制，补充丢弃告警或事件日志。
  https://github.com/nanocoai/nanoclaw/issues/3226

- **[中] 升级过程非事务性 — #3195（修复 PR 待合并，core-team/follows-guidelines）**
  使 NanoClaw 升级具备事务性。此前升级中断或失败可能使安装处于不一致状态，影响系统可维护性。
  https://github.com/nanocoai/nanoclaw/pull/3195

- **[中] 存量 wiring 缺少 channel destinations — #3145（DB 迁移 PR 待合并）**
  通过 migration 021 为既有 messaging-group wirings 回填缺失的 channel destinations，保留既有 destination 与自定义本地名，属数据完整性修复。
  https://github.com/nanocoai/nanoclaw/pull/3145

- **[中低] stamp-time symlink / caps / secret 安全加固 — 包含于 #3220**
  模板升级同时修复了 stamp 过程涉及的符号链接、capabilities 与 secret 处理问题。安全修复随功能 PR 一并合入，建议 review 时给予充分关注。
  https://github.com/nanocoai/nanoclaw/pull/3220

## 6. 功能请求与路线图信号

- **Agent 模板 → Agent Plugins 1.0.0（确定性方向）**
  #3220 将 agent templates 正式迁移为 Agent Plugins 1.0.0 目录（含破坏性变更与安全加固），#2909 补齐设置向导中的模板流程与首个 agent stamping。两者配合落地后，模板/插件体系将进入 1.0 形态，极有可能进入下一版本。
  https://github.com/nanocoai/nanoclaw/pull/3220
  https://github.com/nanocoai/nanoclaw/pull/2909

- **远程 Streamable HTTP MCP 全面落地（基本完成）**
  #3092 + #3221 合入后，远程 HTTP MCP 支持已覆盖 engine、Claude、codex、opencode。这为后续接入云端 MCP 工具目录、鉴权配置 UI 或服务器健康检查等能力铺平了道路，是下一阶段扩展的信号。

- **更多 MCP 工具技能（持续信号）**
  #3190 Tavily 技能的合入表明社区对开箱即用 MCP 工具持续感兴趣，预计后续会有更多类似的 utility skill 提交。

## 7. 用户反馈摘要

- **#3226（@dweekly）**：用户描述了明确的痛点——同一会话内平台复用 message id 时，消息既不到达 Agent 也无任何提示。核心诉求是 **失败的可观测性**：即使去重合理，丢弃也必须是可见的（日志/事件/用户提示），否则用户会把问题归因于 Agent 能力不足。这是典型的可靠性敏感型反馈：宁可延迟或报错，也不要静默吞消息。
  https://github.com/nanocoai/nanoclaw/issues/3226

## 8. 待处理积压

以下 PR 长期未合并，建议维护者关注：

- **#2134 fix(setup): Apple Silicon + Colima 环境变量写入 launchd plist — 已开放 105 天**
  创建于 2026-04-29，针对 macOS 用户的实际 setup 体验，至今未合并，相关用户可能持续受影响。
  https://github.com/nanocoai/nanoclaw/pull/2134

- **#2909 模板设置向导与首个 agent stamping — 已开放 41 天**
  创建于 2026-07-02，模板功能 2/2 部分，需与 #3220 协同合入，建议一并排期。
  https://github.com/nanocoai/nanoclaw/pull/2909

- **#3145 DB migration 021 回填 destinations — 已开放 15 天**
  创建于 2026-07-28，数据完整性修复，等待 review。
  https://github.com/nanocoai/nanoclaw/pull/3145

- **#3195 事务性升级 — 已开放 6 天**
  创建于 2026-08-06，稳定性相关，建议优先合并。
  https://github.com/nanocoai/nanoclaw/pull/3195

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：11 条 Issue 更新（新开/活跃 6，关闭 5）、50 条 PR 更新（待合并 25，已合并/关闭 25），无新版本发布。按时间折算约每 2.2 小时一条 Issue、每小时 2 条 PR。今日合入/关闭的 PR 集中在 **LLM 缓存性能（P0）**、**进程运行稳定性**与 **WebUI 可用性**三个方向；同时，memory 契约正确性（[#7505](https://github.com/nearai/ironclaw/issues/7505) → [#7512](https://github.com/nearai/ironclaw/pull/7512)）、持久化 profile 重构（[#7467](https://github.com/nearai/ironclaw/issues/7467) → [#7456](https://github.com/nearai/ironclaw/pull/7456)）与自动化建议卡片（[#7038](https://github.com/nearai/ironclaw/issues/7038) → [#7498](https://github.com/nearai/ironclaw/pull/7498)）三条主线正并行推进。整体看，项目处于 **v1.3.0 前期的高频迭代状态**，核心维护者产出密集（@serrrfirat、@henrypark133、@BenKurrek），外部贡献者提交也在增加（[#7516](https://github.com/nearai/ironclaw/pull/7516)、[#7513](https://github.com/nearai/ironclaw/pull/7513)）。

---

## 2. 版本发布

**无新版本发布**（过去 24 小时 Releases 为 0）。

---

## 3. 项目进展

今日关闭/合入的重要 PR 主要锚定在稳定性与性能上，摘要如下：

| PR | 主题 | 项目意义 |
|---|---|---|
| [#6997](https://github.com/nearai/ironclaw/pull/6997) | 两个 Anthropic 传输通道均放置显式 `cache_control` 断点 | 关闭 P0 issue [#6984](https://github.com/nearai/ironclaw/issues/6984)，pi-harness 采用计划第 1 项完成，解决 OAuth 通道此前完全不发缓存指令的问题 |
| [#7471](https://github.com/nearai/ironclaw/pull/7471) | 租约过期时在安全检查点恢复运行，而非直接失败；隔离 journal 心跳连接池 | 提升无人值守进程运行（automation）的可靠性 |
| [#7470](https://github.com/nearai/ironclaw/pull/7470) | 恢复无投影元数据的 `thread_index` 行在侧边栏的可见性 | 修复已验证 bug：部分线程存在但从不显示在 `list_threads` 中 |
| [#7503](https://github.com/nearai/ironclaw/pull/7503) | 上下文逐出时保留已接受的任务；超限时报 `BudgetExceeded` 而非静默丢弃 | 防止长对话截断导致用户指令丢失 |
| [#7480](https://github.com/nearai/ironclaw/pull/7480) | 左侧导航悬停时以跑马灯展示完整对话标题 | 对应 issue [#7481](https://github.com/nearai/ironclaw/issues/7481) 已关闭，改善长标题可读性 |
| [#7514](https://github.com/nearai/ironclaw/pull/7514) | 为 hosted volume profile 启用 Railway shell（严格 release-only） | 完善托管部署下的沙箱运维体验 |

此外，仍有 **25 条 PR 处于待合并状态**，其中 XL 级核心改动包括：持久化 profile 无关化（[#7456](https://github.com/nearai/ironclaw/pull/7456)）、统一 ChannelAdapter 模型（[#7477](https://github.com/nearai/ironclaw/pull/7477)）、自动化建议卡片后端（[#7498](https://github.com/nearai/ironclaw/pull/7498)）、模型绑定密钥脱敏（[#7509](https://github.com/nearai/ironclaw/pull/7509)）等。这些 PR 的持续更新说明项目正在向 **v1.3.0 的功能面收敛**。

---

## 4. 社区热点

> 说明：本次快照中 PR 的评论数字段未公开，Issue 侧仅极少数条目带评论计数，因此以下基于作者活跃度、Issue 交叉引用与修复 PR 的对应关系判断热点。

- **[#7505](https://github.com/nearai/ironclaw/issues/7505) Memory target-alias 解析应在领域层完成（+1 评论）**：核心作者 @serrrfirat 当日开出该 issue，并同步提交修复 PR [#7512](https://github.com/nearai/ironclaw/pull/7512)。这暴露了“同一套 memory 工具提示词被两个 provider 复用，但只有 native 解析了 `target:` 别名”的契约不一致问题，是当前 memory 主线最受关注的议题。
- **[#7487](https://github.com/nearai/ironclaw/issues/7487) / [#7488](https://github.com/nearai/ironclaw/issues/7488)（disclosure 工具链安全网修复，各 +1 评论）**：两个 issue 同日开出、同日关闭，修复随 PR 合入。讨论焦点在于：`tool_search` 不应在未返回 schema 的情况下“解除”工具披露状态，以及三个 disclosure 工具不应全部硬编码为 `Exclusive` 并发。这组变更直接关系到模型盲调（blind-call spiral）风险，属于架构级修正。
- **[#7508](https://github.com/nearai/ironclaw/issues/7508) GitHub MCP 启动时的端点验证困惑**：来自 QA 环境（Railway）的实机反馈，描述“已注册已安装”之后又质疑端点验证的割裂体验。代表了插件生态实际使用中的接入摩擦。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| **高** | [#7505](https://github.com/nearai/ironclaw/issues/7505) | memory `target` 别名解析只在一个 provider 中实现，mem0 会原样存储 `target: "memory"`，导致跨 provider 的 `MEMORY.md` 读取失败 | OPEN，已有修复 PR [#7512](https://github.com/nearai/ironclaw/pull/7512) |
| **高** | [#7487](https://github.com/nearai/ironclaw/issues/7487) | `tool_search` 将工具标记为“已披露”却不返回 schema，瓦解 describe-first 安全网；`oneOf` 必填约束坍缩为空 | CLOSED，修复已合入 |
| **中** | [#7470](https://github.com/nearai/ironclaw/pull/7470) 关联 bug | 无投影元数据的线程行存在但不出现在 `list_threads` 结果中 | PR 已关闭，修复完成 |
| **中** | [#7488](https://github.com/nearai/ironclaw/issues/7488) | disclosure 桥接工具全部硬编码 `Exclusive`，`tool_search`/`tool_describe` 这类无副作用元数据查询被串行化 | CLOSED，修复已合入 |
| **中** | [#7483](https://github.com/nearai/ironclaw/issues/7483) | 默认 NEAR AI provider 配置下，`test-connection` 与 `list-models` 在 API key 留空时失败 | CLOSED，修复已合入 |
| **低** | [#7508](https://github.com/nearai/ironclaw/issues/7508) | GitHub MCP 扩展启动时出现“端点验证”困惑提示而非直接连接 | OPEN，暂无 fix PR |
| **低** | [#7481](https://github.com/nearai/ironclaw/issues/7481) | 侧边栏长对话标题被截断且悬停不可读 | CLOSED，修复为 [#7480](https://github.com/nearai/ironclaw/pull/7480) |

---

## 6. 功能请求与路线图信号

- **高概率进入 v1.3.0（已有对应 PR/Epic 在推进）**
  - [#7467](https://github.com/nearai/ironclaw/issues/7467) Reborn 持久状态 profile 无关化 + 迁移遗留 profile 根目录：对应 PR [#7456](https://github.com/nearai/ironclaw/pull/7456) 待合并，风险标记为 high。
  - [#7038](https://github.com/nearai/ironclaw/issues/7038) Storybook + AI-first Design System 大 Epics：今日有后端落地 PR [#7498](https://github.com/nearai/ironclaw/pull/7498)（自动化建议卡片 V1）。
  - [#6879](https://github.com/nearai/ironclaw/issues/6879) Automation 运行可靠性（v1.3.0 Epic）：当前无人值守运行会被当作普通交互式聊天执行，是自动化功能的关键短板。
- **新方向信号（以 PR 形式出现）**
  - [#7516](https://github.com/nearai/ironclaw/pull/7516) 在 WebUI 的 Extensions 页为 IronHub agent link 增加运维操作面（CLI-only → WebUI 可完成）。
  - [#7513](https://github.com/nearai/ironclaw/pull/7513) CLI 新增 `acp serve` 命令，支持 stdio 传输、流式输出与取消，可对接 GitHub Copilot CLI、VS Code 等外部 ACP 客户端。
  - [#7515](https://github.com/nearai/ironclaw/pull/7515) Slack 绑定剩余的 8 个核心标准消息操作（编辑、删除、reactions、open_dm 等），补齐渠道层能力。
- **用户直接提出的功能请求**
  - [#7517](https://github.com/nearai/ironclaw/issues/7517) Cloud.near.ai 在 Google/GitHub 登录方式下提供 staking 路径（目前 credits 仅支持 Stripe，且无法将 NEAR 钱包附加到已有第三方账户）。

---

## 7. 用户反馈摘要

本轮快照中用户直接评论较少，可提炼的反馈如下：

- **[#7517](https://github.com/nearai/ironclaw/issues/7517) 登录方式与支付/质押能力割裂**：使用 Google/GitHub 登录的用户无法对推理进行 staking，只有 Stripe credits 可用；希望“Sign in with NEAR”能作为可附加到现有账户的钱包方式。
- **[#7508](https://github.com/nearai/ironclaw/issues/7508) 插件接入流程令人困惑**：GitHub MCP 扩展已经“注册并安装”，却仍弹出端点验证的担忧提示，没有干净利落地进入可用状态。
- **[#7481](https://github.com/nearai/ironclaw/issues/7481) 长对话标题不可读**：侧边栏截断且无悬停提示，属于直接影响日常浏览的 UI 体验问题（已修复）。
- **[#7467](https://github.com/nearai/ironclaw/issues/7467) profile 切换造成“数据丢失”假象**：用户/部署者切换 profile 后会看到空部署，实际历史会话、密钥、扩展均被遗留在旧 profile 目录下——这是由实现方式（按 profile 索引持久化）引发的信任问题，正在通过 [#7456](https://github.com/nearai/ironclaw/pull/7456) 从根本上解决。

---

## 8. 待处理积压

以下 Issue / PR 已开放较长时间或有被忽略风险，提请维护者关注：

- **[#5910](https://github.com/nearai/ironclaw/pull/5910) `fix: hydrate approval gates on notification open`**：由 @ironloopai[bot] 创建，已开放 **33 天**（2026-07-10），最近一次更新为 08-11，说明仍在活动，但长期未合并。涉及审批门在通知打开时的水合逻辑，建议维护者给出明确 review 结论。
- **[#6879](https://github.com/nearai/ironclaw/issues/6879) Automation runs are hit-or-miss（v1.3.0 Epic）**：开放 **14 天**，0 评论。该问题直接影响无人值守自动化的核心价值，且已被识别为结构性缺陷（触发执行被当作普通交互轮），需要持续投入。
- **[#7274](https://github.com/nearai/ironclaw/pull/7274) `fix(llm): preserve Anthropic prompt cache across tool promotion`**：开放 **6 天**，属于 LLM 成本与缓存关键路径，XL 体量，当前评论/审查信号偏弱。
- **[#7365](https://github.com/nearai/ironclaw/pull/7365) `feat(memory): memory-save guidance + always-on MEMORY.md prompt lane`**：开放 **5 天**，对应 bug [#7185](https://github.com/nearai/ironclaw/issues/7185)（跨会话事实不回忆），是 memory 方向的用户可见功能修复，建议保持审查节奏。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时，LobsterAI 保持高活跃度：发布 1 个新版本（2026.8.11），10 条 PR 中 7 条合并/关闭，4 条 Issue 中 3 条关闭。核心事件为 `release/2026.8.10` 合入 main（[#2477](https://github.com/netease-youdao/LobsterAI/pull/2477)），落地了可配置模型思考强度、本地文件右键菜单、设置交互优化等一批能力。开发线仍在推进：按模型独立记忆思考强度的修复（[#2475](https://github.com/netease-youdao/LobsterAI/pull/2475)）已提交待合并。值得一提的是，多条 4 月创建的社区 Issue/PR 被标记 stale 并关闭，其中"任务栏闪烁提醒"（[#1239](https://github.com/netease-youdao/LobsterAI/pull/1239)）与"设置未保存确认"（[#1241](https://github.com/netease-youdao/LobsterAI/pull/1241)）均未进入主线，需维护者确认取舍。综合来看，项目迭代节奏快，但存在历史积压与限流类可靠性隐患。

## 2. 版本发布

### LobsterAI 2026.8.11（2026-08-11 发布）
[查看 Release 页面](https://github.com/netease-youdao/LobsterAI/releases)

变更内容：
- feat(cowork): 新增 collapse-agent-tasks 快捷键，并允许输入时使用修饰键快捷键（@fisherdaddy，[#2469](https://github.com/netease-youdao/LobsterAI/pull/2469)）
- feat(cowork): 在侧边栏标记定时任务会话（@liuzhq1986）

此外，`release/2026.8.10` 已通过 [PR #2477](https://github.com/netease-youdao/LobsterAI/pull/2477) 合入 main，涵盖：
- 服务端驱动的模型思考强度选项与默认值（含 product 级 `max` → runtime 级 `xhigh` 别名映射）
- 每会话/每代理的思考强度持久化，以及版本化模型请求参数
- Cowork 进度可见性、定时任务识别、本地文件工作流、启动/运行时可靠性、设置交互改进

**破坏性变更与迁移注意事项**：本次 Release 未声明破坏性变更。但新增了思考强度持久化字段与 OpenClaw alias 映射，建议升级后验证旧会话的模型请求参数兼容性；本地文件新增的 `dialog:saveFileCopy` IPC 需要主进程与 preload 层同步更新。

## 3. 项目进展

今日合并/关闭的 PR 集中在"AI 会话体验"与"桌面端可靠性"两条线：

- **[#2477](https://github.com/netease-youdao/LobsterAI/pull/2477) Release/2026.8.10 合入 main** — 里程碑式合并，聚合思考强度、Cowork 可见性、本地文件工作流、可靠性等多项能力
- **[#2473](https://github.com/netease-youdao/LobsterAI/pull/2473) feat(cowork): 本地文件链接右键菜单** — 新增 open-with / save-as / copy-path / copy-contents / copy-image / reveal-in-folder 操作，并新增 `dialog:saveFileCopy` IPC
- **[#2476](https://github.com/netease-youdao/LobsterAI/pull/2476) feat(ui): Escape 关闭最上层浮层** — 修复模态框 portal 嵌套导致的按键重复响应问题，并兼容 IME 组合输入
- **[#2457](https://github.com/netease-youdao/LobsterAI/pull/2457) feat(models): 可配置思考强度** — 服务端驱动选项与默认值、按会话/代理持久化，构成 2026.8.10 核心功能
- **[#2474](https://github.com/netease-youdao/LobsterAI/pull/2474) fix(sidebar): 对齐 sites 图标描边粗细** — UI 细节打磨

社区提交的 [#1239](https://github.com/netease-youdao/LobsterAI/pull/1239)（任务栏/Dock 闪烁提醒）与 [#1241](https://github.com/netease-youdao/LobsterAI/pull/1241)（设置未保存确认）以 stale 状态关闭，未进入主线。

## 4. 社区热点

今日讨论集中在三条历史 Issue（各 2 条评论），均为真实使用痛点：

- **[#1240 单一模型限流导致全局瘫痪](https://github.com/netease-youdao/LobsterAI/issues/1240)** — 用户反馈某模型 API 限流后，切换其他模型/其他会话仍全部受限；重启失败，还原配置文件后依然受限，且"该 API 在其他龙虾上运行畅通"。反映限流状态可能被全局共享或错误持久化，是当前最突出的可靠性隐患。
- **[#2062 任务超过最大时长](https://github.com/netease-youdao/LobsterAI/issues/2062)** — 24 小时长任务触发 `Task timed out`，用户无法判断任务是被停止还是仍在后台运行，状态透明度不足。
- **[#1237 Settings 配置静默丢失](https://github.com/netease-youdao/LobsterAI/issues/1237)** — 修改 API Key 后未点 Save 直接关闭弹窗即丢失，无任何提示。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 状态 | 说明 |
|---|---|---|---|
| 🔴 高 | [#1240 限流导致所有会话/任务受限](https://github.com/netease-youdao/LobsterAI/issues/1240) | 已关闭（stale） | 无对应 fix PR；建议确认 2026.8.10 "runtime reliability" 改进是否包含限流隔离 |
| 🟠 中高 | [#1183 网关启动遮罩循环弹出](https://github.com/netease-youdao/LobsterAI/issues/1183) | **仍 OPEN** | Windows 环境，添加模型后关闭开关并保存即触发，持续 4+ 个月未修复 |
| 🟡 中 | [#2062 任务超时状态不明](https://github.com/netease-youdao/LobsterAI/issues/2062) | 已关闭（stale） | 需明确超时任务是否继续后台运行，建议增加任务记录与恢复机制 |
| 🟡 中 | [#1237 Settings 修改静默丢失](https://github.com/netease-youdao/LobsterAI/issues/1237) | 已关闭（stale） | 关联修复 PR [#1241](https://github.com/netease-youdao/LobsterAI/pull/1241) 同样关闭，功能未进入主线 |

## 6. 功能请求与路线图信号

- **按模型独立记忆思考强度** — 新 PR [#2475](https://github.com/netease-youdao/LobsterAI/pull/2475)（OPEN）修复"一个模型设思考强度会冲掉另一个模型"的互斥问题，基于已合并的 #2457，预计进入下一版本。
- **本地文件操作增强** — [#2473](https://github.com/netease-youdao/LobsterAI/pull/2473) 已合并，右键菜单的 open-with / save-as / copy 系列能力表明本地文件工作流是重点投入方向。
- **任务栏/Dock 闪烁提醒**（[#1239](https://github.com/netease-youdao/LobsterAI/pull/1239)）与 **设置未保存确认**（[#1241](https://github.com/netease-youdao/LobsterAI/pull/1241)）虽被 stale 关闭，但对应痛点（#1237）依然真实存在，未来版本可能以其他形式实现。
- **Electron 大版本升级** — dependabot PR [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) 将 electron 从 40.2.1 升级到 43.3.0（跨 3 个大版本），涉及依赖安全与兼容性维护，长时间未合并。

## 7. 用户反馈摘要

- **限流隔离诉求**（[#1240](https://github.com/netease-youdao/LobsterAI/issues/1240)）：用户核心诉求是"一个 API 受限不应拖垮整个应用"。其完整复现路径（烧光请求次数 → 其他会话/agent 连锁受限 → 重启失败）指向状态同步逻辑存在缺陷，用户情绪明显受挫（"lobsterai 整体陷入瘫痪"）。
- **长任务透明度**（[#2062](https://github.com/netease-youdao/LobsterAI/issues/2062)）：用户面对超时报错时无法判断任务是否仍在后台运行，需要明确的超时语义与可恢复机制。
- **配置安全**（[#1237](https://github.com/netease-youdao/LobsterAI/issues/1237)）：用户对 API Key 等敏感配置的静默丢失零容忍，期望关闭前有未保存修改确认。
- **积极信号**：Release/2026.8.10 与 2026.8.11 显示 Cowork 功能迭代速度快（快捷键、定时任务标记、右键菜单），社区对协作/自动化场景需求旺盛，整体满意度倾向积极。

## 8. 待处理积压

提醒维护者关注以下长期未响应事项：

- **[#1183 网关启动遮罩循环](https://github.com/netease-youdao/LobsterAI/issues/1183)** — OPEN，2026-04-01 创建，Windows 可复现，4+ 个月无修复，今日仍有活跃更新
- **[#1181 隐藏 OpenClaw 主 agent 会话](https://github.com/netease-youdao/LobsterAI/pull/1181)** — OPEN，2026-04-01 创建，4+ 个月未合并（涉及 `cowork_sessions` 表新增 `hidden` 列的 schema 变更，需评估）
- **[#1277 electron 依赖升级](https://github.com/netease-youdao/LobsterAI/pull/1277)** — OPEN，2026-04-02 创建，跨 3 个大版本，建议优先处理
- **[#2475 模型思考强度互斥修复](https://github.com/netease-youdao/LobsterAI/pull/2475)** — OPEN，2026-08-11 新提交，待 review，建议合入

---

**项目健康度评估**：迭代活跃、功能推进稳健，但需关注三点——① 限流/网关类稳定性问题（#1240、#1183）长期未根治；② 社区 PR 合入率偏低，存在贡献流失风险；③ 依赖升级（electron）积压形成技术债。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-12

## 1. 今日速览
过去 24 小时项目活跃度较低，无新 Issue、无版本发布，仅提交 1 个新 Pull Request（#1190，待合并）。该 PR 旨在为本地 CalDAV 连接器增加持久化、快照、调度、全文搜索等功能，并引入新的只读 `connectors` 代理工具，属于功能性增强，尚未获得评论或关注。整体看项目处于功能开发与积压的平稳期，社区互动偏少。

## 2. 版本发布
今日无新版本发布，此部分省略。

## 3. 项目进展
今日没有 PR 被合并或关闭，项目状态未发生实际变更。但值得关注的是，`@penso` 于 2026-08-11 提交了新 PR **[#1190 - Add durable local CalDAV connectors](https://github.com/moltis-org/moltis/pull/1190)**，当前处于 OPEN 状态。该 PR 涉及以下改进方向：
- 提供与供应商无关的连接器持久化机制；
- 原子化 CalDAV 快照、调度与投影；
- 受限的本地全文搜索；
- 基于提示编译的数据集计划；
- 可信的只读 `connectors` 代理工具，用于本地数据集访问；
- 设置中新增连接器账户、数据集管理入口（描述后段被截断）。

虽然该 PR 尚未合并，但若被接受，将显著增强 Moltis 对本地数据源（如日历）的支持能力，为 Agent 提供更可靠的本地数据访问基础。

## 4. 社区热点
今日无 Issues/PRs 产生评论或高反应，未形成热点讨论。唯一的活跃项是上述 PR #1190，但当前评论数为 0，点赞数 0，尚未引发社区广泛关注。若后续有维护者或用户参与设计和反馈，可能成为下一轮社区讨论的焦点。

## 5. Bug 与稳定性
今日无 Bug、崩溃或回归问题报告，项目稳定性未见新告警。

## 6. 功能请求与路线图信号
虽然今日没有用户提出的新功能 Issue，但 PR #1190 本身透露了明确的路线图信号：Moltis 正在向“本地持久化数据连接器”方向演进，重点包括：
- 本地 CalDAV 支持（邮箱/日历场景）；
- 连接器状态的持久化与恢复；
- 本地全文搜索能力；
- 为 Agent 提供可信任的只读访问工具。

这些功能与个人 AI 助手的数据隐私和本地优先（local-first）趋势吻合，很可能在后续版本中集成。若社区有类似需求，可关注该 PR 的进展并参与评审。

## 7. 用户反馈摘要
今日无 Issues 评论或新 Issue 可提炼用户反馈，暂无用户场景、痛点或满意度方面的数据。

## 8. 待处理积压
目前最需要关注的是 PR **[#1190](https://github.com/moltis-org/moltis/pull/1190)**，自创建以来（2026-08-11）已过 1 天，仍无评论或合并信号。该 PR 横跨多个模块（连接层、持久化、搜索、Agent 工具），改动可能较大，建议维护者尽快安排代码评审，明确是否合入或要求修改，以避免长时间无人响应的积压状态。除此 PR 外，暂无其他历史积压项可参考。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-12

## 1. 今日速览

CoPaw 项目过去 24 小时保持高度活跃：共处理 16 条 Issue（关闭 9 条，新开/活跃 7 条）和 48 条 PR（合并/关闭 25 条，待合并 23 条），并发布了 v2.1.0-beta.3 版本。社区讨论集中在 MCP 工具稳定性、LaTeX 公式渲染、插件安全权限模型等方向，其中多个高热度 Issue 已在今日关闭或进入修复流程。整体来看，项目正处于 v2.1.0 正式版发布前的密集迭代期，PR 合并效率高，社区反馈响应及时，项目健康度良好。

---

## 2. 版本发布

### v2.1.0-beta.3（Beta）

- **发布时间**：2026-08-11
- **发布链接**：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.3

**主要更新内容：**

- **Feat/files workspace blog**（PR #6783）：新增文件工作区博客功能，由 @zhaozhuang521 贡献。
- **fix(provider): expire stale capability cache entries and clear on model switch**（PR #6723）：修复 provider 能力缓存过期问题，在模型切换时自动清理陈旧缓存条目，由 @ningblue 提交。
- **chore: bump the version to 2.**：版本号升级。

**破坏性变更与迁移注意事项：**

- 当前为 Beta 版本，建议生产环境用户暂缓升级。
- 涉及 provider 缓存逻辑变更，升级后首次模型切换可能需要重新建立缓存。
- 文件工作区为新增功能，使用旧版本创建的会话在加载时可能涉及媒体路径兼容性处理（参见 PR #6873）。

---

## 3. 项目进展

今日合并/关闭的 PR 主要推进了以下方向：

### 3.1 代码块与公式渲染体验统一（已合并）

- **PR #6911**：统一代码块渲染体验，标准代码块保留语法高亮/复制/下载，LaTeX 和 Mermaid 块新增 Preview/Source 标签页，并适配明暗主题。直接回应了社区长期反馈的公式渲染问题（#5453、#4756、#6893）。
- 链接：https://github.com/agentscope-ai/QwenPaw/pull/6911

### 3.2 文件工作区修复（已合并）

- **PR #6915**：修复 Unicode PDF 文件名和 SVG 文件的预览失败问题，并统一文件预览界面与 Console 暗色主题。下载响应改用 RFC 5987 编码处理非 ASCII 文件名。
- 链接：https://github.com/agentscope-ai/QwenPaw/pull/6915

### 3.3 渠道配置冲突检测（已合并）

- **PR #6909**：在保存渠道配置前增加冲突检查——当另一个运行中的 agent 使用相同 Bot 身份启用了同一内置渠道时，Console 会弹出确认对话框提示冲突 agent。
- 链接：https://github.com/agentscope-ai/QwenPaw/pull/6909

### 3.4 内存管理修复（已合并）

- **PR #6564**：修复自动记忆在上下文压缩前未刷新待处理 turns 的问题（#6555），确保记忆持久化与压缩生命周期一致。
- 链接：https://github.com/agentscope-ai/QwenPaw/pull/6564

### 3.5 Computer Use 原生输入改进（已合并）

- **PR #6891**：改进桌面端 Computer Use 输入可靠性，新增有界键盘序列操作、逐步限速、部分完成报告和刷新观察处理。
- 链接：https://github.com/agentscope-ai/QwenPaw/pull/6891

### 3.6 工具描述修正（已合并）

- **PR #6898**：修正 `read_file` 工具描述，明确其仅适用于文本文件，避免模型误用读取二进制文件。
- 链接：https://github.com/agentscope-ai/QwenPaw/pull/6898

### 3.7 发布文档准备（已合并）

- **PR #6875**：准备 v2.1.0 发布文档，新增中英文 release notes、2026-08-12 News 条目，并同步 README 翻译。
- 链接：https://github.com/agentscope-ai/QwenPaw/pull/6875

**整体评估**：今日合并的 PR 覆盖了渲染体验、文件处理、渠道配置、内存管理、Computer Use 和文档建设等多个方面，项目正在为 v2.1.0 正式版做全面收尾。

---

## 4. 社区热点

### 4.1 MCP 工具规律性失效（10 条评论，已关闭）

- **Issue #6732**：用户报告 MCP 工具每隔数小时失效，报错"未注册或不存在"，重启 Docker 容器后恢复。该问题已关闭，相关修复可能已合入 v2.1.0-beta.3 的 provider 缓存修复（PR #6723）。
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/6732

### 4.2 公式渲染 + 会话分组 + 活动会话背景（7 条评论，已关闭）

- **Issue #6893**：用户反馈 LaTeX 公式无法渲染（显示为原始符号串），同时提出会话分组管理和活动会话背景两个 UI 增强建议。公式渲染问题已通过 PR #6911 解决。
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/6893

### 4.3 CopilotKit 集成咨询（3 条评论，开放中）

- **Issue #6882**：用户询问如何集成 CopilotKit，希望获得示例或思路。目前暂无官方回复，建议维护者关注。
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/6882

**分析**：社区热点集中在两个方向——一是稳定性问题（MCP 失效），二是渲染体验（LaTeX 公式）。两者均已在今日获得修复或关闭，说明项目对社区反馈的响应速度较快。

---

## 5. Bug 与稳定性

按严重程度排列：

### 5.1 高严重度

- **Issue #6919**：qwenpaw-v2.0.1 频繁崩溃，pip 安装 + 虚拟环境 + Web 端使用场景下 console channel 报错。**状态：开放中，暂无 fix PR。**
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6919

- **Issue #6916**：插件可在无用户确认的情况下静默创建定时任务并注入用户可见消息，属于权限模型安全漏洞（中高严重度）。**状态：开放中，暂无 fix PR。**
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6916

### 5.2 中严重度

- **Issue #6918**：Inter-agent 消息导致每条消息生成新的 agent session，产生并发"影子实例"并造成重复对话。**状态：开放中，暂无 fix PR。**
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6918

- **Issue #6910**：单渠道配置接口（`PUT /api/config/channels/{channel_name}`）对无效 payload 返回 HTTP 500 而非 422。**已有 fix PR #6912（开放中）。**
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6910

### 5.3 已关闭/已修复

- **Issue #6732**：MCP 工具规律性失效——已关闭，修复合入 v2.1.0-beta.3。
- **Issue #6697**：v2.1.0b1 Desktop 向子进程注入 PYTHONHOME 导致 Python 子进程崩溃——已关闭。
- **Issue #6897**：QQ bot 工作流信息过多触发限流——已关闭（功能优化建议）。

---

## 6. 功能请求与路线图信号

### 6.1 可能纳入 v2.1.0 正式版的功能

- **LaTeX/Mermaid 渲染支持**：PR #6911 已合并，代码块统一渲染体验将随 v2.1.0 发布，解决 #5453、#4756、#6893 等长期诉求。
- **文件工作区增强**：PR #6783（files workspace blog）已合入 beta.3，PR #6873（legacy 媒体路径兼容）仍在开放中，可能赶在正式版前合入。

### 6.2 新提出的功能需求

- **Issue #6917**：Agent 应能将任意报告/消息主动投递进收件箱（Inbox），不限于 cron/heartbeat/记忆任务。该需求涉及 Core/Backend 改动，目前无对应 PR。
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6917

- **Issue #6882**：CopilotKit 集成咨询，目前无官方回复。
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6882

- **Issue #6895**：用户建议建立微信群便于交流，属于社区运营诉求。
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6895

### 6.3 路线图信号

- **PR #6302**（开放中）：统一 provider 发现、模型元数据、路由和 agent 控制，是 #6167 的大型重构，可能影响 v2.1.0 或 v2.2.0 的模型管理体验。
- **PR #6880**（开放中）：统一 apps/plugins/skills 市场到共享 `/market` 页面，与 #6916 的插件安全讨论相关。
- **PR #6817**（开放中）：集成 AnySearch 作为内置 Web 搜索能力，替换 Tavily。

---

## 7. 用户反馈摘要

### 7.1 稳定性痛点

- **MCP 工具失效**（#6732）：用户反馈 MCP 工具"每隔一个晚上或几个小时"就失效，必须重启容器才能恢复，严重影响自动化流程可靠性。
- **频繁崩溃**（#6919）：v2.0.1 在 Windows + pip 虚拟环境 + Web 端场景下"经常性崩溃"，用户直接要求修复。

### 7.2 体验问题

- **公式渲染**（#6893、#4756、#5453）：多位用户反馈 LaTeX 公式无法渲染，显示为原始符号串，对比 Cherry Studio 等工具"很尴尬"。该问题已通过 PR #6911 解决。
- **QQ bot 信息轰炸**（#6897）：用户反馈 QQ bot 将详细工作流全部推送到 QQ 消息中，触发限流且打扰用户，建议优化信息粒度。

### 7.3 安全顾虑

- **插件权限**（#6916）：用户指出插件可静默创建定时任务并注入消息，表达了对权限模型的担忧，认为"已安装插件即可持久化地在用户对话中注入消息并执行定时动作"风险较高。

### 7.4 积极反馈

- 用户对项目迭代速度表示认可，多个 Issue 在一天内获得关闭或修复。
- #6895 用户主动建议建立微信群，侧面反映社区活跃度和用户粘性在提升。

---

## 8. 待处理积压

### 8.1 长期未响应的开放 PR

- **PR #6302**（7 月 21 日创建，已开放 22 天）：大型重构 PR，统一 provider 发现、模型元数据、路由和 agent 控制。涉及面广，建议维护者明确时间表或拆分评审。
  - 链接：https://github.com/agentscope-ai/QwenPaw/pull/6302

- **PR #5869**（7 月 8 日创建，已开放 35 天）：在 TUI 和 Web console 的斜杠命令自动补全中暴露系统命令。标记为 Under Review，但长期未合并。
  - 链接：https://github.com/agentscope-ai/QwenPaw/pull/5869

- **PR #5490**（6 月 24 日创建，已开放 49 天）：聊天媒体全屏图片画廊功能。功能价值明确，建议尽快评审。
  - 链接：https://github.com/agentscope-ai/QwenPaw/pull/5490

### 8.2 需要维护者关注的问题

- **Issue #6916**（插件安全权限模型）：涉及安全漏洞，建议优先处理，考虑在 v2.1.0 正式版前加入插件权限确认机制。
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6916

- **Issue #6919**（v2.0.1 频繁崩溃）：影响存量用户，建议尽快定位并发布 hotfix。
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6919

- **Issue #6882**（CopilotKit 集成咨询）：已开放 2 天无官方回复，建议至少给出方向性指引。
  - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6882

---

**日报生成时间**：2026-08-12 | **数据来源**：CoPaw GitHub 仓库（github.com/agentscope-ai/CoPaw）

</details>
