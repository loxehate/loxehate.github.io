---
title: OpenClaw 生态日报
published: 2026-08-08
report: ai-agents
tags:
  - radar
  - AI
---
# OpenClaw 生态日报 2026-08-08

> Issues: 256 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-08 01:27 UTC

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

# OpenClaw 项目动态日报 — 2026-08-08

## 1. 今日速览

今日 OpenClaw 社区活跃度处于极高水平：24 小时内 256 条 Issues 更新（250 条新开/活跃，6 条关闭）、500 条 PR 动态（89 条已合并/关闭），但无正式版本发布。PR #120375 正在准备 2026.8.1 发布管线，版本对齐工作已启动。项目健康度的主要风险集中在两处 P0 级稳定性问题：网关内存泄漏（#91588，60 天未修）与 Agent DB v14→v15 迁移失败（#119263，阻断升级路径）；同时安全与上下文管理方向的社区讨论热度显著上升。

## 2. 版本发布

今日无新版本发布（最新 Releases 为空）。需关注的是 PR #120375 已打开，正在将根包、macOS、package 与插件元数据从 2026.7.2 对齐至 2026.8.1，表明下一个小版本已进入发布准备阶段。

## 3. 项目进展

今日共 89 条 PR 被合并/关闭，从可见条目看主要推进了以下方向：

**CI / 工程基础设施**
- [#120399](https://github.com/openclaw/openclaw/pull/120399) fix(ci): restore embedded run registry lint — 修复 CI lint 通道因嵌入式运行注册表测试超过 1,001 行上限而失败的问题，恢复 `main` 分支 CI 门禁。
- [#120397](https://github.com/openclaw/openclaw/pull/120397) test(agent): split run lifecycle coverage — 拆分嵌入式运行生命周期测试，使两个文件均保持在 1,000 行 lint 限制以内。
- [#120068](https://github.com/openclaw/openclaw/pull/120068) chore(ui): refresh control ui locales — 控制 UI 语言环境文件的自动化同步更新。

**Agent 行为修复**
- [#120400](https://github.com/openclaw/openclaw/pull/120400) fix(agents): carry complete tool args from content_block_start input — 修复 Discord 进度草稿中工具行仅渲染"图标 + 工具名"、丢失已解析命令/参数的问题（关联 #120306）。

**尚未合并的重要 PR**
- [#120375](https://github.com/openclaw/openclaw/pull/120375) chore(release): prepare 2026.8.1 — 2026.8.1 版本发布准备。
- [#120405](https://github.com/openclaw/openclaw/pull/120405) fix(codex): preserve warm sessions and approvals — 修复多 Codex 会话交替使用时反复冷启动、丢失文件变更审批的问题。
- [#120087](https://github.com/openclaw/openclaw/pull/120087) fix(slack): route Enterprise Grid messages by workspace — Slack Enterprise Grid 多工作区消息路由修复。
- [#119915](https://github.com/openclaw/openclaw/pull/119915) fix(agents): defer requester-settle wakes until gateway request scope is ready — 修复网关重启后子代理恢复调度的竞态问题。
- [#113429](https://github.com/openclaw/openclaw/pull/113429) fix(codex): prevent session-changed errors after /new — 修复 Codex 会话在 `/new` 后永久拒绝消息（关联 #116022）。

## 4. 社区热点

| 排名 | Issue | 评论数 | 主题 |
|---|---|---|---|
| 1 | [#116277](https://github.com/openclaw/openclaw/issues/116277) | 129 | DeepSeek v4 Flash 在 Telegram 群消息中静默无回复，仅输出通用回退文案（已关闭） |
| 2 | [#116201](https://github.com/openclaw/openclaw/issues/116201) | 59 | 实时语音会话在慢速/突发 provider 行为下保留无界 provider 与咨询状态（P1） |
| 3 | [#7707](https://github.com/openclaw/openclaw/issues/7707) | 29 | 记忆信任标签：按来源打标，防止记忆投毒攻击（P2） |
| 4 | [#77598](https://github.com/openclaw/openclaw/issues/77598) | 23 | 对 Pash 的 dev agent 进行 24 小时行为观察记录（P2） |
| 5 | [#91588](https://github.com/openclaw/openclaw/issues/91588) | 22 | 网关内存泄漏：RSS 从 350MB 涨至 15.5GB 触发 OOM（P0） |

社区热点反映三类核心诉求：**模型静默失败的可见性与可观测性**（#116277 与 #90789、#86050 同主题）、**资源边界控制**（#116201 与 #91588 同主题）、**安全与信任**（#7707 与 #78308、#45608 形成主题群）。

PR 侧，今日最受关注的是 [#120373](https://github.com/openclaw/openclaw/pull/120373)（Meta Muse Spark 1.2 模型支持）与 [#120287](https://github.com/openclaw/openclaw/pull/120287)（会话目录历史导入分页绑定）。

## 5. Bug 与稳定性

### P0 — 严重

- **[#91588](https://github.com/openclaw/openclaw/issues/91588) 网关内存泄漏**（6月9日创建，60 天，无 fix PR）— RSS 从 350MB 增长至 15.5GB，触发 OOM 与 `launchd-handoff` 重启循环。
- **[#119263](https://github.com/openclaw/openclaw/issues/119263) Agent DB v14→v15 迁移失败**（8月4日创建）— `openclaw doctor --fix` 报 `no such column: entry_valid`，网关拒绝启动，升级被阻断。

### P1 — 高

- [#116277](https://github.com/openclaw/openclaw/issues/116277) DeepSeek v4 Flash 静默回复失败（已关闭，129 评论）。
- [#116201](https://github.com/openclaw/openclaw/issues/116201) 实时语音工作保留无界状态（59 评论，维护者确认，等待产品决策，无 fix PR）。
- [#115700](https://github.com/openclaw/openclaw/issues/115700) `chat.send` 报 "thread switched branches" — 模型完成后 `expectedLeafEntryId` 过期，关联 PR 已打开。
- [#116022](https://github.com/openclaw/openclaw/issues/116022) `/new` 复用稳定会话 ID，无法恢复退役 Codex 绑定 — beta.5 仍存在，关联 PR #113429。
- [#49876](https://github.com/openclaw/openclaw/issues/49876) Cron 会话在工具调用失败时产出幻觉输出 — 信任安全问题，无 fix PR。
- [#45494](https://github.com/openclaw/openclaw/issues/45494) Cron 任务在 LLM API 持续 500 时耗尽完整超时窗口而非快速失败 — 无 fix PR。
- [#94939](https://github.com/openclaw/openclaw/issues/94939) 6.x 迁移后 SQLite 会话存储为 0 字节，MS Teams 主动发送失败 — 关联 PR 打开。
- [#117609](https://github.com/openclaw/openclaw/issues/117609) 嵌入式助手阶段不重试瞬时 LLM/socket 错误，长会话因单次瞬时错误整体死亡。
- [#86050](https://github.com/openclaw/openclaw/issues/86050) 网关缓冲 claude-cli 流事件，WebChat/TUI 只看到最终消息。

### P2 — 中等

- [#51429](https://github.com/openclaw/openclaw/issues/51429) 工作路径硬编码 — 用户发现 `/Users/wangtao` 被硬编码并已发布，13 评论。
- [#67419](https://github.com/openclaw/openclaw/issues/67419) 引导文件每轮重注入，浪费 20-30% tokens（11 评论）。
- [#88079](https://github.com/openclaw/openclaw/issues/88079) WebChat 不流式传输 Kimi Code / DeepSeek Reasoner 的推理内容。
- [#99586](https://github.com/openclaw/openclaw/issues/99586) 运行时工具面在网关触碰操作后返回空白。
- [#86119](https://github.com/openclaw/openclaw/issues/86119) 孤儿 `node server.js` 进程在子代理/cron 运行后积累。
- [#93917](https://github.com/openclaw/openclaw/issues/93917) `genericRepeat` 熔断器在 exec 结果变化时不触发。
- [#119557](https://github.com/openclaw/openclaw/issues/119557) chat delta 节流无尾随刷新，被保留的块等待下一个事件。
- [#118028](https://github.com/openclaw/openclaw/issues/118028) `AbortSignal.any()` 破坏信号身份依赖（`===`、Map/WeakMap 键）。
- [#117445](https://github.com/openclaw/openclaw/issues/117445) `@openclaw/feishu` 将入站 DM 解码为 "?"，永不回复。
- [#112864](https://github.com/openclaw/openclaw/issues/112864) 网关热重载时部分 JSON 读取导致崩溃循环（已关闭）。

## 6. 功能请求与路线图信号

**安全主题（可能被优先纳入）**
- **[#7707](https://github.com/openclaw/openclaw/issues/7707) 记忆信任标签**（29 评论，186 天）— 按来源标记记忆条目信任级别，防止记忆投毒。与 #78308（MCP 审批信封）、#45608（/new 前记忆刷新）共同构成安全加固路线。
- **[#78308](https://github.com/openclaw/openclaw/issues/78308) MCP 工具调用的通道调解审批**（16 评论，94 天）— 扩展 `/approve` 管线到 MCP 工具。

**上下文与成本管理**
- **[#22438](https://github.com/openclaw/openclaw/issues/22438) 分层引导文件加载**（18 评论，168 天）— 渐进式上下文控制，避免子代理/cron 加载无关引导文件。
- **[#44395](https://github.com/openclaw/openclaw/issues/44395) 标题感知分块 + 实体提取**（7 评论）— 改进记忆搜索质量。
- **[#13219](https://github.com/openclaw/openclaw/issues/13219) 按模型使用日志**（7 评论）— 原生成本追踪与模型混合优化。
- **[#54373](https://github.com/openclaw/openclaw/issues/54373) 上下文来源/易变性元数据**（7 评论）— 区分静态注入与实时读取内容，增强 agent 对上下文可信度的判断。

**多代理与生态**
- **[#35203](https://github.com/openclaw/openclaw/issues/35203) 多代理协作增强 RFC**（11 评论，156 天）— 能力画像 + 共享黑板 + 分层记忆 + Token 成本治理。
- **[#99551](https://github.com/openclaw/openclaw/issues/99551) Codex worker 失控强化冲刺**（16 评论）— 已拆分子 Issue 跟踪。
- **[#95516](https://github.com/openclaw/openclaw/issues/95516) 技能生命周期管理**（5 评论）— 失败自动优化 + 基于使用量的技能退休。

**PR 侧路线图信号**
- [#120373](https://github.com/openclaw/openclaw/pull/120373) Meta Muse Spark 1.2 模型支持（Contributor 层）。
- [#120389](https://github.com/openclaw/openclaw/pull/120389) Android 客户端会话回复通知。
- [#120388](https://github.com/openclaw/openclaw/pull/120388) Web UI 侧边栏显示自定义提交年龄。

## 7. 用户反馈摘要

- **成本失控案例**：[#119009](https://github.com/openclaw/openclaw/issues/119009) 用户报告 Discord 会话对模型调用重试 1,081 次（3 小时 11 分）+ 252 次（3 小时 21 分），合计 **$204.74** 计量费用；每次重试都重置进度时钟，停滞检测器永不触发。这是重试逻辑缺乏熔断机制的真实代价。
- **内存泄漏影响生产**：[#91588](https://github.com/openclaw/openclaw/issues/91588) 报告者指出 RSS 在 2-3 天内从 350MB 涨至 15.5GB，"正常使用"即触发 OOM，已导致多次重启循环。
- **升级被硬阻断**：[#119263](https://github.com/openclaw/openclaw/issues/119263) 用户升级到 2026.7.2 后网关无法启动，`doctor --fix` 无法迁移 v14→v15 数据库，属发布阻断级别体验。
- **对硬编码路径的讽刺**：[#51429](https://github.com/openclaw/openclaw/issues/51429) 中文用户报告 `openclaw` 创建 `/Users/wangtao` 目录并设为工作区，"这位 wangtao 是谁？"
- **生产多用户瓶颈**：[#96477](https://github.com/openclaw/openclaw/issues/96477) 生产用户指出单写者会话锁在 Slack + Telegram 多用户并发下成为瓶颈。
- **可访问性改进获好评**：[#95601](https://github.com/openclaw/openclaw/issues/95601) macOS VoiceOver 用户感谢 v2026.6.9 将剩余用量信息放到模型选择器附近，键盘可达。
- **对静默失败的担忧**：[#49876](https://github.com/openclaw/openclaw/issues/49876) 用户指出 Cron 会话在工具失败时会"伪造合理输出"，属于信任与安全级别的问题。

## 8. 待处理积压

**最需维护者关注的长期未解决 Items**

**P0/P1 级**
- **[#91588](https://github.com/openclaw/openclaw/issues/91588) 网关内存泄漏**（P0，2026-06-09，60 天，无 fix PR）— 生产环境 OOM 重启循环，项目健康度风险最高。
- **[#49876](https://github.com/openclaw/openclaw/issues/49876) Cron 会话幻觉输出**（P1，2026-03-18，143 天，无 fix PR）— 信任与安全级别的错误行为。
- **[#45494](https://github.com/openclaw/openclaw/issues/45494) Cron 任务未快速失败**（P1，2026-03-13，148 天，无 fix PR）— LLM 持续 500 时浪费完整超时窗口。
- **[#86050](https://github.com/openclaw/openclaw/issues/86050) claude-cli 流事件被缓冲**（P1，2026-05-24，76 天，无 fix PR）— 实时性体验受损。
- **[#94939](https://github.com/openclaw/openclaw/issues/94939) SQLite 会话存储迁移为空**（P1，2026-06-19，50 天，关联 PR 打开）— MS Teams 主动发送失败。

**高热度功能请求**
- **[#7707](https://github.com/openclaw/openclaw/issues/7707) 记忆信任标签**（P2，2026-02-03，186 天，29 评论）— 最受欢迎的安全功能请求之一。
- **[#22438](https://github.com/openclaw/openclaw/issues/22438) 分层引导文件加载**（P2，2026-02-21，168 天，18 评论）— 需求热度高但未进入实施。
- **[#35203](https://github.com/openclaw/openclaw/issues/35203) 多代理协作增强**（P2，2026-03-05，156 天，11 评论）— RFC 仍在讨论。
- **[#78308](https://github.com/openclaw/openclaw/issues/78308) MCP 审批信封**（P2，2026-05-06，94 天，16 评论）— 安全路线图相关。

**长期未合并 PR**
- **[#89040](https://github.com/openclaw/openclaw/pull/89040) perf: 避免 embedded_run 引导期间事件循环停滞**（2026-06-01，68 天）— 修复 14-22 秒事件循环阻塞导致的消息丢失；状态为"📣 needs proof"。
- **[#113429](https://github.com/openclaw/openclaw/pull/113429) fix(codex): 防止 /new 后会话变更错误**（2026-07-24，15 天）— 关联 #116022，待维护者审查。

---

## 横向生态对比

## 1. 生态全景

个人 AI 助手/自主智能体开源生态在 2026-08-08 呈现高度活跃但分化明显的态势：头部项目日 PR 更新量达到 50—500 条，处于高强度迭代期，而中小项目则围绕渠道、体验与稳定性进行精细化打磨。社区共识正从“功能可用”转向“可信、可观测、可治理”，成本失控、内存泄漏、安全边界和文档漂移成为跨项目的高频议题。多个项目不约而同推进记忆管理、插件开放标准、本地化部署与多模型兼容，表明生态正在从单点助手向可组合的智能体基础设施演化。

## 2. 各项目活跃度对比

| 项目 | Issues 动态（新开/活跃） | PR 动态（合并/关闭） | Release | 健康度评估 |
|---|---|---|---|---|
| OpenClaw | 256（250 新开 / 6 关闭） | 500（89 合并/关闭） | 无（2026.8.1 发布准备中） | 高活跃但承压：2 个 P0 长期未修，升级路径被阻断 |
| NanoBot | 10（8 活跃 / 2 关闭） | 21（11 合并/关闭） | 无 | 良好：合并快、无 P0；但存在成本透明度与渠道 P1 |
| Zeroclaw | 12（12 活跃） | 50（3 合并/关闭） | 无 | 良好：3 个 P1 有修复 PR 跟进；但 8 个 PR 待作者行动 |
| PicoClaw | 4（3 活跃 / 1 关闭） | 14（2 合并/关闭） | 无 | 中等：stale 积压明显，WhatsApp 紧急修复待合并 |
| NanoClaw | 0 | 10（2 合并/关闭） | 无 | 一般：长期 PR 等待 3 个月，社区讨论冷清 |
| IronClaw | 16 | 50（12 合并/关闭） | 无 | 高活跃/良好：集中关闭 6 个 P1，但仍有 39 天未动的 P1 |
| LobsterAI | 4（3 关闭） | 7（6 合并/关闭） | 2026.8.7 | 健康稳定：有 4 个月未响应的 stale Issue |
| Moltis | 0 | 0 | 无 | 停滞：24 小时无任何活动 |
| CoPaw | 22（15 活跃 / 7 关闭） | 47（21 合并/关闭） | v2.1.0-beta.2 | 非常活跃但有回归风险：桌面端稳定性问题集中 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态的事实主干与参照实现：其 24 小时 PR 动态达 500 条、Issue 更新 256 条，较 Zeroclaw、IronClaw、CoPaw 高出一个数量级，社区规模与贡献者网络远超其他项目。技术路线上，OpenClaw 采用“网关 + Agent 运行时 + 多客户端 UI”一体化 Monorepo，以网关为中心统一 Discord、Slack、Telegram、飞书、WebChat 等渠道的会话、记忆与工具调度，并已建立 2026.8.1 的版本发布管线。相比之下，同类项目更多采用轻量化、模块化或垂直化路线：Zeroclaw 强调 Rust 安全边界与 SOP 自动化，IronClaw 聚焦生产级可信交付与文档治理，NanoBot / PicoClaw 走轻量自托管路线。OpenClaw 的另一关键生态价值是“被集成”：LobsterAI 等桌面客户端以兼容 OpenClaw 配置为卖点，下游生态围绕其演进，但也意味着其 P0 级内存泄漏与数据库迁移问题会对更广用户群产生放大效应。

## 4. 共同关注的技术方向

- **成本可观测性与失控防护**  
  OpenClaw 用户遭遇单会话 1,081 次重试、产生 $204.74 费用（#119009）；NanoBot 出现 2 小时消耗百万 token 且无日志可查（#5266）；Zeroclaw 的 Anthropic 成本核算恒为 $0（#9816）。各项目普遍缺少熔断、预算上限与调用级成本归因。

- **安全边界与信任机制**  
  OpenClaw 提出记忆信任标签以防范记忆投毒（#7707）；NanoBot 将会话历史移出 agent 工作区并推进 per-session 沙箱（#5278/#5279/#5276）；Zeroclaw 修复 `forbidden_paths` 失效与 shell 子进程逃逸（#9815/#9827/#9839）；CoPaw 为插件增加命名空间级导入隔离（#6688）。安全已从“外围配置”上升为架构级设计。

- **记忆与上下文管理**  
  OpenClaw 推进分层引导文件加载、标题感知分块与上下文来源元数据（#22438/#44395/#54373）；NanoBot 为 Dream 记忆系统增加短会话归档（#5231/#5280）；IronClaw 通过 MEMORY.md 常开提示通道解决跨会话记忆丢失（#7365）；CoPaw 正在重构 ReMe 记忆配置与 Embedding 生命周期（#6772）。记忆正在成为智能体的核心基础设施。

- **多模型兼容与协议标准化**  
  LobsterAI 修复模型 ID 含斜杠导致 provider 不可选（#2443）；Zeroclaw 遭遇模型输出字面量 `<TOOLCALL>` 而非真实函数调用（#9820）；CoPaw 遇到严格 OpenAI 兼容提供方拒绝 Responses-API 字段、Gemini 拒绝带 `$schema` 的 tool schema（#6803/#6812）；Zeroclaw 与 NanoBot 均开始对接 Agent Plugins 1.0 开放标准（#9810/#5288）。模型无关性与互操作成为新竞争点。

- **无人值守自动化可靠性**  
  OpenClaw 长期存在 Cron 任务幻觉输出与不快速失败问题（#49876/#45494）；Zeroclaw 的 SOP 自动模式在 cron/频道触发下永久卡死（#9805）；IronClaw 的 Routine 因 runner 租约过期而失败（#5456）。后台任务的 heartbeat、超时、熔断与可观测性普遍不足。

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键特征 |
|---|---|---|---|
| OpenClaw | 全功能个人 AI 中枢、多渠道网关、Agent 运行时 | 开发者、自托管用户、团队 | 大型 Monorepo，网关 + Agent + UI 一体化；插件元数据与多客户端生态 |
| NanoBot | 轻量部署、WebUI 优先、会话/记忆管护 | 个人自托管、轻量用户 | Node.js/TypeScript 模块化；WebSocket 与 REST 并行接口，强调 API 收敛 |
| Zeroclaw | 安全边界、SOP 自动化、本地/边缘部署 | 安全敏感用户、树莓派等本地部署者 | Rust；命令策略、sandbox、cron/SOP 自主流程，注重二进制体积与可控性 |
| PicoClaw | 多渠道通信、依赖跟随上游 | IM 渠道重度个人用户 | Go；Dependabot 高频依赖升级，WhatsApp/钉钉/微信/TTS 等渠道扩展 |
| NanoClaw | 渠道集成 v2、技能与 Agent 模板化 | 开发者、团队内部助手 | TypeScript；ChannelAdapter 架构，技能库 + setup wizard 模板化 |
| IronClaw | 生产级可信交付、文档治理、沙箱隔离 | 企业/生产部署 | Rust；doc-truth CI 门禁、显式 Docker/Railway 沙箱、持久化状态兼容 |
| LobsterAI | 桌面端“第二大脑”、OpenClaw 兼容层 | 桌面知识工作者 | Electron；Cowork 会话搜索、IM Agent 与模型绑定、OpenClaw 配置兼容 |
| CoPaw | 记忆增强、插件市场、国产模型生态 | 中文用户、Qwen/阿里云生态 | Python/agentscope；ReMe 记忆链路、OneBot/微信等 IM 渠道、Web/桌面/Docker 多端 |

## 6. 社区热度与成熟度

- **第一梯队（高速迭代）**：OpenClaw、CoPaw、Zeroclaw、IronClaw。它们日 PR 更新量均达到 50 条量级，且同时推进多条功能主线与安全修复。其中 IronClaw 已进入发布前加固期，通过 bug_bash 和高密度 P1 关闭体现成熟度；OpenClaw 仍处于功能扩张与版本准备并存阶段，但 P0 积压显示其治理压力大于其他项目。

- **第二梯队（稳步打磨）**：NanoBot、PicoClaw、LobsterAI。NanoBot 正在经历发布前稳定化，WebUI/API 收敛类 PR 密集；PicoClaw 功能性 PR 与 stale 积压并存，说明有持续贡献但维护者评审带宽不足；LobsterAI 完成 2026.8.7 发布，处于发布后修复节奏。

- **第三梯队（低活跃/停滞）**：NanoClaw、Moltis。NanoClaw 虽有核心团队驱动的技能与渠道 PR，但 Issues 零更新、外部反馈稀疏；Moltis 24 小时无任何动态。

- **质量巩固 vs 功能扩张**：IronClaw 与 NanoBot 明确处在质量巩固阶段，IRonClaw 在文档真实性和持久化兼容性上建立 CI 级保障；OpenClaw、CoPaw、Zeroclaw、PicoClaw 仍以功能快速落地为主，修复与回归控制相对被动。

## 7. 值得关注的趋势信号

- **成本失控已成为智能体最直接的生产事故**  
  OpenClaw 单次重试风暴产生 $204.74 费用、NanoBot 百万 token 消耗无日志，说明“静默烧钱”正在侵蚀用户信任。开发者应把调用级 token 计量、预算上限、重试熔断与停滞检测作为第一优先级特性，而非事后优化。

- **“诚实失败”正取代“尽可能成功”成为设计原则**  
  IronClaw 修复了模型在工具失败后编造“需要租户管理员”的幻觉；OpenClaw 用户指出 Cron 会话在工具失败时伪造合理输出。智能体必须能够如实上报失败原因，而不是用生成式内容掩盖错误。

- **文档与代码一致性开始进入 CI 门禁**  
  IronClaw 的 doc-truth 验证管道（5 个 PR）将文档事实契约测试纳入 CI，因为过期文档不仅误导开发者，还会被模型学习并产生“频道不能连接”等拒答幻觉。文档漂移已从工程债务升级为模型行为缺陷。

- **本地化、隐私优先部署成为明确细分市场**  
  Zeroclaw 在树莓派 + NVIDIA NIM 环境被真实用户验证，PicoClaw 修复本地 whisper 因强制 token 而不可用，NanoBot 推进 per-session 沙箱。离线优先、无云端依赖、边缘设备可运行已成为差异化竞争力。

- **插件生态正从“私有格式”走向开放标准**  
  Zeroclaw 的 Agent Plugins 1.0 RFC、统一 catalog 提案，NanoBot 的 Agent Plugins 包格式统一，OpenClaw 的插件元数据对齐，均指向同一趋势：项目间插件互操作、技能可移植、配置可共享将成为智能体生态的基础设施。

- **渠道体验正在对标消费级 IM 产品**  
  音频收发、贴纸、消息反应、会话切换、审批按钮回调鉴权、富媒体上传等需求密集出现于 NanoBot、PicoClaw、NanoClaw、CoPaw。用户期望 AI 助手在既有 IM 中拥有与原生应用一致的能力，渠道不再是简单的文本收发管道。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-08-08）

## 1. 今日速览

过去 24 小时项目保持高度活跃：**10 条 Issue 更新**（新开/活跃 8 条、关闭 2 条），**21 条 PR 更新**（10 条待合并、11 条已合并/关闭），无新版本发布。核心开发方向集中在 **WebUI 体验打磨**（5 个相关 PR 合并/关闭）、**会话与记忆管护**（Dream 闲置会话归档落地、session 保留逻辑修复）以及 **安全边界重构**（会话历史移出工作区、per-session 沙箱隔离）。值得关注的是，token 异常消耗（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）成为社区讨论热点，用户对成本可观测性有迫切诉求；同时以 [#5278](https://github.com/HKUDS/nanobot/issues/5278) 为代表的安全设计讨论正在推动工作区隔离机制走向成熟。整体项目健康度良好：合并节奏快、响应及时，但渠道功能（如音频）与成本透明度仍是潜在的信任风险点。

## 2. 版本发布

本期无新版本发布。

## 3. 项目进展

今日共 **11 个 PR 合并/关闭**，覆盖 WebUI、会话记忆、渠道稳定性、工程质量四个方向。

**WebUI/API 层**（5 个 PR）——进入精细打磨阶段：
- [#5268](https://github.com/HKUDS/nanobot/pull/5268) `fix(webui): stage out-of-media-root attachments on history reads`：修复历史会话中媒体 URL 丢失问题，使 WebSocket 与 REST 历史接口行为对齐。
- [#5285](https://github.com/HKUDS/nanobot/pull/5285) `fix(webui): preserve newly created topic route`：修复新建频道路由跳转回归。
- [#5281](https://github.com/HKUDS/nanobot/pull/5281) `fix(webui): keep activity text crisp while fading edges`：WebUI 文本渲染细节优化。
- [#5277](https://github.com/HKUDS/nanobot/pull/5277) `feat(webui): expand model preset editor inline`：新增模型预设内联编辑器，改善配置交互。
- [#5284](https://github.com/HKUDS/nanobot/pull/5284) `refactor(webui): remove legacy session messages route`：移除不再有调用方的 `/api/sessions/{key}/messages` 路由。结合 #5268 的修复后移除，说明团队正在完成 API 层的兼容过渡与收敛。

**会话与记忆管护**（3 个 PR）——持续强化数据留存与裁剪逻辑：
- [#5272](https://github.com/HKUDS/nanobot/pull/5272) `fix(session): preserve proactive channel delivery during session retention trimming`：修复会话裁剪时丢弃主动投递消息（如 cron 通知）的回归，对应 [#5273](https://github.com/HKUDS/nanobot/issues/5273)。
- [#5280](https://github.com/HKUDS/nanobot/pull/5280) 与 [#5231](https://github.com/HKUDS/nanobot/pull/5231) `feat/fix(memory): archive idle sessions for Dream`：为 Dream 记忆系统补充短空闲会话的归档能力，确保短会话也能生成 `history.jsonl` 输入源。

**渠道稳定与默认值保护**（2 个 PR）：
- [#5263](https://github.com/HKUDS/nanobot/pull/5263) `fix(weixin): harden protocol delivery, streaming, and login`：全面加固微信渠道的协议头、登录、投递与重试逻辑。
- [#5287](https://github.com/HKUDS/nanobot/pull/5287) `fix(channels): preserve global progress defaults`：修复渠道默认值被意外覆盖的问题。

**工程质量**（1 个 PR）：
- [#5282](https://github.com/HKUDS/nanobot/pull/5282) `fix: modernize dependency recovery guidance`：将过时的依赖安装指引切换为 `nanobot plugins enable` 标准流程。

**里程碑信号**：Dream 记忆归档功能从 [#5231](https://github.com/HKUDS/nanobot/pull/5231) 到 [#5280](https://github.com/HKUDS/nanobot/pull/5280) 的补强，标志着记忆子系统已具备完整的短会话处理链路；同时多个 WebUI 修复 PR 在同日内密集合并，说明 v-next 正在经历发布前的稳定化周期。

## 4. 社区热点

**🔥 [Issue #5266](https://github.com/HKUDS/nanobot/issues/5266) `Logs about token consumption` —— 10 条评论，当日最高热度**
用户反馈 nanobot 在 2 小时内消耗超过百万 token 且用户端无感知，要求记录“何时、哪个调用、消耗多少 token”。该问题具有很强的普适性——所有依赖 LLM API 的用户都面临成本失控风险。尽管是 enhancement，但其背后是**成本可观测性**这一核心诉求，预计后续会吸引更多用户参与讨论。

**💬 [Issue #5149](https://github.com/HKUDS/nanobot/issues/5149) `no audio ?` —— 5 条评论，持续发酵中**
WhatsApp 渠道只能接收音频、无法发送音频文件，日志显示 `ffmpeg WARNING`。该问题已存在 10+ 天且无对应 fix PR，属于当前渠道功能完整性的明显短板，用户等待时间较长，需要维护者关注。

**💬 [Issue #5198](https://github.com/HKUDS/nanobot/issues/5198) `Not possible to change models in a specific session` —— 3 条评论**
用户对比 Cloud SaaS 的交互体验，指出 nanobot 在会话内切换模型不可行（`/model` 命令无效），只能通过重配整个实例实现。这反映了**灵活性与易用性**的期待差，是 WebUI 与指令系统体验设计的重要反馈。

**📌 值得注意的新声音**：[Issue #5289](https://github.com/HKUDS/nanobot/issues/5289) 由机器人账号提出 Telegram 贴纸与消息反应支持，虽是 bot 提交，但代表了渠道富媒体能力的重要演进方向。

## 5. Bug 与稳定性

按严重程度排列：

**P1 级——核心功能受损或成本失控**

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#5149](https://github.com/HKUDS/nanobot/issues/5149) | WhatsApp 渠道无法发送音频消息，接收正常 | ❌ 无对应 fix PR，待处理 |
| [#5256](https://github.com/HKUDS/nanobot/issues/5256) | `/goal` 命令产生数十条重复回复，直到用户介入或模型标记取消 | ❌ 无对应 fix PR，待处理 |
| [#5266](https://github.com/HKUDS/nanobot/issues/5266) | 2 小时异常消耗百万 token，无有效日志追踪 | ❌ 无对应 fix PR，已升级为功能需求讨论 |

**P2 级——安全边界与体验缺陷**

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#5278](https://github.com/HKUDS/nanobot/issues/5278) | 会话历史存放在 agent workspace 内，agent 可读文件工具可能触达会话记录 | ✅ 已有 fix PR [#5279](https://github.com/HKUDS/nanobot/pull/5279) 待合并 |
| [#5198](https://github.com/HKUDS/nanobot/issues/5198) | 会话内无法切换模型，只能重配实例 | ❌ 无对应 fix PR，讨论中 |

**P3 级——已修复**

- [#5264](https://github.com/HKUDS/nanobot/issues/5264) `media_urls` 不返回 → 由 [#5268](https://github.com/HKUDS/nanobot/pull/5268) 修复。
- [#5273](https://github.com/HKUDS/nanobot/issues/5273) 会话裁剪丢弃主动投递消息 → 由 [#5272](https://github.com/HKUDS/nanobot/pull/5272) 修复。

**风险提示**：#5268 修复的历史消息路由在 [#5284](https://github.com/HKUDS/nanobot/pull/5284) 中被移除，两者看似矛盾，实为兼容期后的 API 收敛。升级用户应留意客户端依赖的接口是否已切换至新的 `/webui-thread` 等替代路径。

## 6. 功能请求与路线图信号

**新增功能请求：**
- **Token 消耗追踪**（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）：用户要求按调用记录 token 用量，属于可观测性基建，有望被纳入下一版本运维能力规划。
- **会话级临时文件隔离**（[#5276](https://github.com/HKUDS/nanobot/issues/5276)）：在现有 `restrictToWorkspace` 与 bwrap 基础上，进一步要求多会话之间的 R/W 隔离。已有对应 PR [#5283](https://github.com/HKUDS/nanobot/pull/5283) 进入待合并队列。
- **Telegram 贴纸与消息反应**（[#5289](https://github.com/HKUDS/nanobot/issues/5289)）：丰富 Telegram 渠道的富媒体表现力，属于渠道差异化竞争能力。

**已在 PR 阶段、可能纳入下一版本：**
- **Agent Plugins 生态整合**（[#5288](https://github.com/HKUDS/nanobot/pull/5288)）：将 CLI Apps 目录与 Agent Plugins v1 包格式统一，是插件生态的关键拼图。
- **Per-session 沙箱隔离**（[#5283](https://github.com/HKUDS/nanobot/pull/5283)）：为每个非 WebUI 会话建立独立文件系统沙箱，安全分级更进一步。
- **会话历史移出工作区**（[#5279](https://github.com/HKUDS/nanobot/pull/5279)）：消除 agent 工具触达会话历史的安全隐患。
- **子代理会话转录持久化**（[#5291](https://github.com/HKUDS/nanobot/pull/5291)）：保留子代理完整调用链，便于事后审查。
- **Matrix 线程隔离**（[#5286](https://github.com/HKUDS/nanobot/pull/5286)）：按 thread 隔离 Matrix 会话，避免串话。
- **Temporary Chat 模式**（[#5252](https://github.com/HKUDS/nanobot/pull/5252)）：非持久化的临时对话，适合一次性询问场景。

**长期路线图信号：** PR [#4276](https://github.com/HKUDS/nanobot/pull/4276)（model-agnostic computer use + browser tools）已开放近 60 天仍未合并，若该能力落地，将成为 nanobot 在 agent 工具能力上的重要差异化卖点。

## 7. 用户反馈摘要

- **成本透明度焦虑（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）** ：用户明确表示“2 小时内百万 token 消耗，且无任何用户可感知的活动”，这是对系统不可解释性的强烈不满。诉求不仅是一个日志开关，而是完整的调用链成本归因能力。该反馈已积累 10 条评论，说明不少用户同样面临“静默烧钱”的处境。

- **渠道能力不对等（[#5149](https://github.com/HKUDS/nanobot/issues/5149)）** ：用户指出“能接收音频但无法发送音频”，留言简短但问题明确。这类“单向能力”的 bug 最容易消耗用户信任，且持续 10 天未修复，应优先响应。

- **模型切换的体验落差（[#5198](https://github.com/HKUDS/nanobot/issues/5198)）** ：用户对比“Cloud SaaS AIs”的界面交互，认为 nanobot 的模型选择器形同虚设。背后诉求是**运行时灵活配置**，而不是启动时固定拓扑。这条反馈对 WebUI 交互设计有直接指导意义。

- **自动化失控的恐惧（[#5256](https://github.com/HKUDS/nanobot/issues/5256)）** ：用户描述“单个 /goal 消息产生了数十条近似重复的回复，直到用户介入或模型自行中止”，这不仅是 bug 报告，更是智能体在生产环境中“自主性失控”的真实案例，应作为 P1 级稳定性问题对待。

- **安全模型的深入思考（[#5278](https://github.com/HKUDS/nanobot/issues/5278)、[#5276](https://github.com/HKUDS/nanobot/issues/5276)）** ：用户已理解 `restrictToWorkspace` 与 bwrap 的作用，但仍指出“全局共享工作区 + 会话历史同目录”的残余风险。这类用户对 nanobot 的信任度较高，且具备安全专业视角，他们的反馈对架构演进有极高的参考价值。

## 8. 待处理积压

**⚠️ 长期未合并/未响应，提醒维护者关注：**

- **[PR #4276](https://github.com/HKUDS/nanobot/pull/4276) `feat(tools): model-agnostic computer use`（6 月 10 日创建，已开放 59 天）** ：computer use + browser 工具是重大能力项，但目前没有状态更新。建议维护者明确时间表或阶段性反馈，避免贡献者空等。

- **[Issue #5149](https://github.com/HKUDS/nanobot/issues/5149) `no audio?`（7 月 28 日创建，10+ 天）** ：WhatsApp 音频发送故障，无 fix PR，5 条评论持续积累。核心渠道的功能缺陷不宜久拖。

- **[PR #5156](https://github.com/HKUDS/nanobot/pull/5156) `fix(telegram): recover from silently stalled polling`（7 月 29 日创建，9 天）** ：修复 Telegram 轮询静默卡死问题，指向 [#5171](https://github.com/HKUDS/nanobot/issues/5171)。生产环境消息中断是高风险故障，建议优先评审。

- **[Issue #5198](https://github.com/HKUDS/nanobot/issues/5198) 会话内切换模型受限（7 月 31 日创建，8 天）** ：目前停留在讨论阶段，无 assignee、无 fix PR。该问题直接影响日常使用体验，建议排期到 WebUI 迭代计划中。

- **[Issue #5266](https://github.com/HKUDS/nanobot/issues/5266) token 消耗日志（8 月 6 日创建，但已是 10 评论热点）** ：虽是新 issue，但热度攀升极快，若长期无官方回应，可能演变为用户信任危机。建议至少给出设计方向或 workaround（如临时通过日志轮转缓解）。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-08

## 1. 今日速览

过去 24 小时，Zeroclaw 项目保持高强度迭代：新增/活跃 Issue 12 条、PR 更新 50 条（47 条待合并、3 条合并/关闭），无新版本发布。3 条 P1 级 Bug 被标记为 accepted（Anthropic 成本核算、forbidden_paths 策略失效、SOP 自动执行卡死），且均有对应修复 PR 在途（#9494/#9841、#9827/#9839），显示出「问题快速暴露 + 修复同步跟进」的闭环节奏。功能侧，web_research 代理工具、agent 配置编写、根包重命名等 PR 集中落地，工具链扩展与安全边界加固是当前两大主线。项目整体处于活跃且健康的状态，但 8 条 PR 挂着 `needs-author-action`，维护者需警惕高价值贡献失活。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

### 已合并/关闭

- **#9836** [CLOSED] fix(transcription): make local_whisper bearer_token optional — @aldoeliacim
  修复 `LocalWhisperProvider::from_config` 在 `bearer_token` 缺失/为空时硬失败的问题。`local_whisper` 标准部署（whisper.cpp loopback server）不实现鉴权，此前强制要求 token 导致本地转录后端无法配置。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9836

### 在途关键修复（对应已接受 Bug，尚未合入）

- **#9841** fix(sop): drive headless SOP runs，并关闭评审 #9494 时发现的五个缺陷 — @JordanTheJet。今日新开，基于 #9494 rebase，直接对应 #9805（SOP auto 模式卡死），横跨 cron、gateway、runtime、tool:delegate、tool:sop 多模块。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9841
- **#9494** fix(sop): drive cron-started headless runs — @Lusitaniae。今日再次更新，是 #9805 的修复主线之一，与 #9841 形成清晰的修复拓扑。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9494
- **#9839** feat(security): deny irreversible destructive commands in every posture — @JordanTheJet。修复 `is_command_allowed` 中 `*` 通配 + `block_high_risk_commands=false` 的短路，使不可逆破坏性命令在所有安全姿态下都被拒绝。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9839
- **#9827** fix(security): stop shell children from escaping their validated confinement — @JordanTheJet。三个 shell 隔离修复（含 sandbox wrap 丢失工作目录等），与 #9815 的 security 域直接相关。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9827
- **#9838** fix(channel/telegram): authorize the account that taps an approval button — @JordanTheJet。修复 Telegram inline-keyboard 回调路径完全缺失 allowlist 校验的问题（只读 `id`/`data` 不读 `from`），安全合规缺口。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9838

## 4. 社区热点

- **#9346** RFC: Define the unified package/capability/config/runtime-state catalog contract — 4 条评论，今日讨论最活跃。@Audacity88 提出将 CLI 插件目录（#8908）、网关包目录（#8909）等分散视图统一为一个产品级 catalog，回应 #6489 的全量目录诉求。架构级、风险 high，正在等待 maintainer review。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9346

- **#9825** leak detection: entropy heuristic redacts public blockchain addresses — 2 条评论。@bitsbyritik 报告泄漏检测器把公开区块链地址误判为高熵密钥并脱敏，导致支付请求 URL 不可投递。用户明确点出这是「按设计工作的误报」，诉求是检测器需要结合数据的公开语义，而非仅凭熵值判断。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9825

- **#9810** RFC: Load Agent Plugins 1.0 skill and MCP packages — 2 条评论。提议接入 vendor-neutral 的 [Agent Plugins](https://agent-plugins.org/) 1.0.0 标准，加载 `plugin.json` + `skills/` + `mcp.json` 社区插件包。与 #9346 的 unified catalog 互相呼应，反映出社区对开放插件生态的强烈期待。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9810

## 5. Bug 与稳定性

### S1 — 工作流阻断

- **#9840** daemon steals daemon.sock on start and unlinks it on exit — @JordanTheJet。`crates/zeroclaw-runtime/src/rpc/local.rs` 中两个未加保护的操作：启动时强占 socket 路径、退出时 unlink，使第二个 daemon 能破坏第一个存活 daemon 的 socket。已有详细根因分析，暂无对应 fix PR。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9840

### P1 — 高优先级（已 accepted）

- **#9816** cost: anthropic provider reports $0.00 spend — @bitsbyritik。所有 usage 记录 `cost_usd: 0.0`，导致 `zeroclaw status` 显示花费为 $0，且日/月预算上限永远不会触发。无对应 fix PR。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9816

- **#9815** security: forbidden_paths is unreachable — @bitsbyritik。`is_path_allowed` 在 allowed-root 检查处直接返回 `true`，永远不会进入 forbidden-path 循环，`forbidden_paths` 在 `allowed_roots`/workspace 下完全失效。相关安全加固 PR #9827/#9839 在途。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9815

- **#9805** SOP: auto-mode runs from channel/cron triggers are never executed — @JordanTheJet。headless dispatch 无 agent loop，`ExecuteStep` 永远不执行，run 卡在 step 1 永久持有并发槽位且跨 daemon 重启存活。已有修复 PR：#9494 / #9841。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9805

### S3 / 其他

- **#9834** intermittent zeroclaw-runtime test failures — @JordanTheJet。进程级共享状态（turn_streamed receipts + model_switch）导致 `cargo test -p zeroclaw-runtime` 间歇失败，6 次基线运行中复现 2 次（含一次 6 失败）。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9834

- **#9832** zeroclaw-hardware fails to compile with --features hardware — @fabricioartur。aarch64 Linux（Debian trixie / Raspberry Pi）下 `unresolved import aardvark_sys::AardvarkHandle`。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9832

- **#9821** cron tool: agent never invokes it — @fabricioartur。Raspberry Pi 5 + NVIDIA NIM（llama-3.3-nemotron-super-49b-v1）环境下，cron 虽在 `allowed_tools` 中，agent 仍回退到 shell `crontab` 并被策略拦截。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9821

- **#9820** calculator tool: model emits literal `<TOOLCALL>` pseudo-syntax — @fabricioartur。同一 NIM 模型输出字面量 `<TOOLCALL>` 伪语法而非真实函数调用，指向工具调用协议对非标准模型家族的兼容性缺口。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9820

- **#9825** leak detection false positive on public blockchain addresses — @bitsbyritik。设计使然的误报，但实际阻断支付 URL 场景，见「社区热点」。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9825

## 6. 功能请求与路线图信号

- **Agent Plugins 1.0 标准接入**（#9810）：RFC 要求支持 vendor-neutral 插件打包标准，若落地将显著降低社区插件的分发与安装成本，与 #9346 的 unified catalog 构成「插件生态」方向上的两步棋。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9810

- **Web 工具面简化**（#9824 → #9833）：@JordanTheJet 提议将 5 个重叠 web 工具收敛为 `web_fetch` / `web_research` / `http_request` 三个动词，原始 `web_search_tool` 下沉到 research 子 agent。同日 PR **#9833** 已实现 `web_research` delegate（8 次工具调用 / 180 秒墙钟限制的有界子代理循环），该需求正快速落地，大概率进入下一版本。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9824
  https://github.com/zeroclaw-labs/zeroclaw/pull/9833

- **Agent 配置编写能力**（#9828）：新 PR 为 agent 提供经过校验、需 operator 批准的策略预览配置修改路径，替代「shell 直接 echo > config.toml」的粗暴方式，是 agent 自治与安全边界的重要平衡设计。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9828

- **cron 投递契约显式化**（#9842）：今日新 PR，将 cron agent turn 的模型可见 framing 从单纯 `[cron:id name] prompt` 扩展为显式说明「回复会被如何处理」，补齐自主 turn 的披露缺口。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9842

- **根包重命名**（#9835）：`zeroclawlabs` → `zeroclaw`，原 crates.io 包名占用问题已解决，属于发布治理收尾。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9835

- **Skill 加载性能优化**（#9837）：只 digest 加载决策可观察到的字节，降低每条入站消息路径上的全量哈希开销。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9837

## 7. 用户反馈摘要

- **Raspberry Pi 真实环境是重要战场**：@fabricioartur 单日提交 3 条 Issue（#9820/#9821/#9832），覆盖 0.8.4 预编译 arm64 版与源码构建。核心反馈指向 NVIDIA NIM 模型在工具调用上的协议兼容性——模型输出伪 `<TOOLCALL>` 语法、拒绝调用 cron 工具，说明工具调用协议对非主流模型家族的适配仍是短板，建议维护者关注模型兼容性测试矩阵。

- **安全策略与真实业务的语义鸿沟**：@bitsbyritik 的 #9825 是典型样本——泄漏检测器「按设计工作」却误杀公开区块链地址，直接阻断支付 URL 投递。用户对「静默失效」的配置（#9815 的 `forbidden_paths`）容忍度最低，这类问题比显式报错更具信任杀伤力。

- **自动化运维可信度受挫**：@JordanTheJet 的 #9805 揭示 cron/频道触发的 SOP auto 模式永久卡死且占用并发槽位，对依赖无人值守自动化的用户影响直接；不过对应修复 PR 已快速跟进，反馈闭环良好。

- **本地部署细节待打磨**：#9836 显示 whisper 本地转录因强制 bearer_token 而无法配置，说明本地优先（local-first）场景有真实用户在使用，且对「不必要的云端假设」敏感。

## 8. 待处理积压

### 长期未合入的重要 PR

- **#8337** feat(observability): herdr agent reporting integration — @eugeneb50，6/26 开启，`needs-author-action`，size:XL / risk:high，已悬置超 6 周。若 Herdr 侧集成不属于路线图项，建议维护者明确关闭或接手。
  https://github.com/zeroclaw-labs/zeroclaw/pull/8337

- **#8965** feat(skills): declarative auto-activation with provider switch — @ATECHPCS，7/11 开启，stacked on #9563，size:XL。功能覆盖面大但依赖链复杂，需要维护者协调评审资源并明确是否仍按原拆分策略推进。
  https://github.com/zeroclaw-labs/zeroclaw/pull/8965

- **#8948** fix(tools): reap exited stdio MCP server processes — @ozpool，7/10 开启，priority:p1（对应 #8731 zombie 进程）。作者自述 #9418 的 stdio 重写已覆盖大部分修复，需维护者确认原 PR 是合入、关闭还是转为跟踪项。
  https://github.com/zeroclaw-labs/zeroclaw/pull/8948

- **#9384** fix(security): resolve shell command path arguments to block symlink escapes — @Nillth，7/26 开启，priority:p1，distinguished contributor。作者明确这是部分缓解而非完整修复，需评估其在安全加固路线中的优先级。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9384

- **#9346** RFC: unified catalog contract — 7/24 开启，4 条评论后等待 maintainer review。架构级 RFC 若长期不评审会阻塞后续 #8908/#8909 系列工作的收口，建议安排专项评审。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9346

### 值得注意的模式

以下 PR 均挂有 `needs-author-action`，说明维护者已review并要求作者跟进：#9634（Telegram allowed_groups）、#9636（Windows nul 重定向）、#9494（SOP cron）、#9563（Telegram media envelope）、#9757（Anthropic tool-result images）、#8964（streaming draft sanitize）、#8965、#8337。建议维护者批量梳理这些 PR 的阻塞点，避免高价值贡献因等待而失活。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 项目日报 — 2026-08-08

---

### 1. 今日速览

过去 24 小时项目活跃度中等偏上：新增/更新 **4 条 Issues**（3 条活跃、1 条关闭）与 **14 条 PR**（12 条待合并、2 条关闭），无新版本发布。PR 侧以依赖自动升级为主（Dependabot 占 6 条），同时有 3 条高质量功能性修复于今日新提交（WhatsApp 连接修复、前缀缓存优化、exec 工具超时修复），说明核心维护仍在推进。值得关注的是，**大量 Issue/PR 已被 stale bot 标记**（7 条 issue/PR 均带 `[stale]` 标签），提示仓库存在人工 review/合并积压，依赖升级与社区 PR 的流转速度需引起维护者注意。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

过去 24 小时有 **2 条 PR 关闭**（#3291、#3289），均为 Dependabot 依赖升级：

| PR | 变更 | 状态 |
|---|---|---|
| [**#3291**](https://github.com/sipeed/picoclaw/pull/3291) | `github.com/github/copilot-sdk/go` 0.2.0 → 1.0.8（跨大版本升级） | 已关闭 |
| [**#3289**](https://github.com/sipeed/picoclaw/pull/3289) | `github.com/pion/rtp` 1.10.2 → 1.10.5 | 已关闭 |

依赖升级保持了第三方库与上游同步。跨大版本的 copilot-sdk 升级值得留意，未来或引入新的 API 特性/破坏性变更。

另有 **3 条新提交的功能性 PR** 进入待合并队列，指向明确的改进方向：

- [**#3321 fix(agent): move dynamic context after history to preserve prefix caching**](https://github.com/sipeed/picoclaw/pull/3321) — 将动态上下文块移至历史记录之后，避免因前缀缓存位置偏移导致每次请求全量重算，对长对话场景的 **成本与延迟优化** 有直接价值。
- [**#3320 fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"**](https://github.com/sipeed/picoclaw/pull/3320) — 修复 WhatsApp 渠道因客户端版本过旧而断开且不重连的问题，属于渠道可用性紧急修复。
- [**#3319 fix(tools): honor exec timeout and boolean run options**](https://github.com/sipeed/picoclaw/pull/3319) — 修复 `exec` 工具忽略单次 `timeout` 参数、`background`/`pty` 类型声明错误的问题，提升工具执行的一致性和可靠性。

这几条 PR 如果在近期合并，项目将在**渠道稳定性、LLM 调用成本、工具执行正确性**三方面得到实际提升。

---

### 4. 社区热点

- [**#3093 [Feature] I need SimpleX or tox**](https://github.com/sipeed/picoclaw/issues/3093)（💬 6 条评论 | 👍 1 | 已关闭）
  今日评论最多的 Issue，用户明确要求新增 SimpleX / Wire / Tox 网关支持。虽然该 Issue 已被关闭，但 6 条评论说明仍有用户关注，背后诉求是 **PicoClaw 作为个人 AI 助手需要覆盖更多去中心化/隐私优先通信渠道**。
- [**#3308 [Code Review] Concurrency hazards, goroutine leaks…**](https://github.com/sipeed/picoclaw/issues/3308)（💬 1 条评论）
  这是一份针对 SeaHorse、Channel Manager 和 Hooks 的详细代码审查，提出了并发风险、goroutine 泄漏及内存/速度优化建议。虽然评论数不多，但内容专业且富有建设性，代表社区中 **高级开发者深度参与技术讨论** 的积极信号。

---

### 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| 🔴 高 | **WhatsApp 渠道失效**：服务端拒绝当前 whatsmeow 客户端版本，连接 5 秒后以 `Client outdated (405)` 断开且不重连，渠道完全不可用 | 已报告 | [**#3320**](https://github.com/sipeed/picoclaw/pull/3320)（已提交，待合并） |
| 🟠 中高 | **exec 工具行为与文档不一致**：`timeout` 参数被静默忽略，始终使用全局超时；`background`/`pty` 模式声明为字符串但实际应为布尔值 | 已报告 | [**#3319**](https://github.com/sipeed/picoclaw/pull/3319)（已提交，待合并） |
| 🟡 中 | **工具调用格式泄漏到 LLM 摘要**：seahorse 的 `partsToReadableContent` 会将工具调用格式混入用户/摘要消息，影响模型理解质量 | 已报告 | [**#3279**](https://github.com/sipeed/picoclaw/pull/3279)（待合并） |
| 🟡 中 | **代码审查发现并发风险**：SeaHorse/Channel Manager/Hooks 存在 goroutine 泄漏和并发访问隐患，暂未对应 fix PR | 已报告 | 暂无 |

前三个 Bug 均有对应修复 PR 待合并，建议维护者优先处理。

---

### 6. 功能请求与路线图信号

今日活跃的功能请求集中在 **渠道扩展** 与 **协议/标准化支持** 两方面：

| Issue/PR | 类型 | 请求内容 | 纳入下一版本可能性 |
|---|---|---|---|
| [**#3307**](https://github.com/sipeed/picoclaw/issues/3307) | Feature | Telegram 等聊天渠道缺少会话列表/切换命令（Web UI 已有完整会话管理） | 中高 — 用户需求明确，且其他 PR 正在加渠道能力 |
| [**#3302**](https://github.com/sipeed/picoclaw/issues/3302) | Feature | 为 MCP 服务器支持 OAuth 2.1（同 #2546） | 中 — 属于标准化方向，有先例 Issue |
| [**#3093**](https://github.com/sipeed/picoclaw/issues/3093) | Feature | 新增 SimpleX / Wire / Tox 网关 | 低 — 已关闭，且渠道优先级不如 Telegram/WhatsApp |
| [**#3270**](https://github.com/sipeed/picoclaw/pull/3270) | PR（已提交） | 新增 DashScope TTS 支持 + 微信音频消息发送 | 功能已完成，待 review |
| [**#3283**](https://github.com/sipeed/picoclaw/pull/3283) | PR（已提交） | 钉钉渠道支持图片消息 | 功能已完成，待 review |
| [**#3271**](https://github.com/sipeed/picoclaw/pull/3271) | PR（已提交） | 更新 9 个 Provider 的默认模型名为 2026-07 最新 | 例行维护，建议尽快合入 |
| [**#3200**](https://github.com/sipeed/picoclaw/pull/3200) | PR（已提交） | Web UI 可配置默认模型 fallback 链 | 功能较完整，待 review |

**路线图信号**：渠道层（钉钉、微信、Telegram、WhatsApp）的扩展明显是当前社区关注重点；同时 prefix caching、TTS、模型 fallback 链等一批 PR 表明项目正在从"可用"向"好用/低成本"演进。

---

### 7. 用户反馈摘要

- **多渠道体验不均**：Web UI 有完整的会话管理（列表/切换/删除），但 Telegram 等聊天渠道完全没有对应能力（[#3307](https://github.com/sipeed/picoclaw/issues/3307)）。用户期望在不同入口获得一致体验。
- **去中心化通信需求真实存在**：有用户明确请求 SimpleX 或 Tox 网关（[#3093](https://github.com/sipeed/picoclaw/issues/3093)），隐私优先的通信协议在 PicoClaw 用户群中有一定需求。
- **对代码质量的深度关注**：社区开发者主动提交了详尽的代码审查报告（[#3308](https://github.com/sipeed/picoclaw/issues/3308)），针对并发安全、goroutine 泄漏和内存优化提出了具体建议，说明社区不仅关注功能，也关注项目的长期稳定性。
- **即时通讯渠道稳定性是痛点**：WhatsApp 因客户端版本过期直接断连且不自动恢复（[#3320](https://github.com/sipeed/picoclaw/pull/3320)），这类问题会严重影响日常使用，需要更快响应。

---

### 8. 待处理积压

**功能性 PR（非 Dependabot）积压较多，均已被 stale bot 标记，建议维护者优先 review/合并：**

| PR | 提交时间 | 状态 | 说明 |
|---|---|---|---|
| [**#3200**](https://github.com/sipeed/picoclaw/pull/3200) | 2026-07-01 | OPEN + stale | 可配置默认模型 fallback 链，功能价值高，等待超 5 周 |
| [**#3270**](https://github.com/sipeed/picoclaw/pull/3270) | 2026-07-20 | OPEN + stale | DashScope TTS + 微信音频发送 |
| [**#3271**](https://github.com/sipeed/picoclaw/pull/3271) | 2026-07-20 | OPEN + stale | 全面更新默认模型名，过期信息会直接影响用户体验 |
| [**#3279**](https://github.com/sipeed/picoclaw/pull/3279) | 2026-07-21 | OPEN + stale | 修复 seahorse 工具调用格式泄漏，属 Bug 修复 |
| [**#3283**](https://github.com/sipeed/picoclaw/pull/3283) | 2026-07-22 | OPEN + stale | 钉钉图片消息支持 |

**Dependabot 依赖升级积压：**

| PR | 升级内容 | 备注 |
|---|---|---|
| [**#3306**](https://github.com/sipeed/picoclaw/pull/3306) | aws-sdk-go-v2/config → 1.32.33 | 涉及 AWS 配置模块 |
| [**#3305**](https://github.com/sipeed/picoclaw/pull/3305) | bedrockruntime → 1.56.2 | 涉及 Bedrock 模型调用 |
| [**#3304**](https://github.com/sipeed/picoclaw/pull/3304) | anthropic-sdk-go → 1.61.0 | 涉及 Claude 模型调用 |
| [**#3303**](https://github.com/sipeed/picoclaw/pull/3303) | actions/stale → 11 | 升级 stale bot 本身，有助于改善当前 stale 标记积压 |

**长期未响应的 Issue：**
- [**#3302**](https://github.com/sipeed/picoclaw/issues/3302)（OAuth 2.1 for MCP）与 [**#3307**](https://github.com/sipeed/picoclaw/issues/3307)（Telegram 会话管理）均创建于 2026-07-30，已 8 天未获维护者回应。

> 📌 **维护者提示**：目前有 **7 条功能性 PR 或问题等待超过一周**，其中 2 条为 Bug 修复。建议安排一个 review 批次集中处理，避免社区贡献者流失；同时可考虑尽快发布一个补丁版本，包含 WhatsApp 修复（#3320）、前缀缓存优化（#3321）和 exec 工具修复（#3319）。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-08

## 1. 今日速览

过去24小时项目保持稳定的开发活跃度：**无新增 Issues，10 条 PR 有动态**（其中 2 条已关闭/合并，8 条仍在待合并队列）。今日核心事件是 **Mattermost 集成 PR #3199 以 v2 ChannelAdapter 架构全新提交**，以替代已过时的 #546（后者今天正式关闭）——这标志着渠道集成已彻底切换到新架构。另外有一个 **bug fix PR #3197 已合并**，改进了飞书卡片失败原因展示。整体来看，项目目前围绕「技能扩展」和「渠道接入」两条主线推进，生态持续丰富，但 Issues 活跃度为零，社区公开反馈较少，讨论热度主要集中在开发侧而非用户侧。

---

## 2. 版本发布

无新版本发布。最新 Release 仍为空/未记录。项目已进入较长的开发迭代周期，尚未接近下一个里程碑切割点。

---

## 3. 项目进展

今日 2 条 PR 关闭（其中 1 条合并），值得关注：

### 🔀 已合并
- **[[PR: Fix] fix(progress): 失败状态展示具体原因 #3197](https://github.com/nanocoai/nanoclaw/pull/3197)**（作者: @tier2tech-tian，8 月 7 日合并）
  - 修复了 agent-runner 过程卡失败标题只使用工具动作的泛化文案问题（如「执行系统检查失败」），改为从 `resultSummary` 中提取首条有效原因，展示为「动作失败：具体原因」。
  - 复用既有脱敏逻辑，限制 38 字符单行，避免卡片二次截断。
  - 附带 reducer 单测和飞书卡片 JSON 跨层测试，全量测试通过 **1427 项**，验证充分。这是今日唯一真正合入主干的变更，提升了任务失败排查效率。

### 🔁 已关闭（被取代）
- **[[PR: Skill, Status: Blocked] Add Mattermost channel skill /add-mattermost #546](https://github.com/nanocoai/nanoclaw/pull/546)**（作者: @wakqasahmed，8 月 7 日关闭）
  - 该 PR 创建于 2026-02-26，长期处于 Blocked 状态，因为其针对的是 pre-v2 的 `Channel`/`registry.ts` 架构。今天由全新 PR #3199 取代并正式关闭，**代表了旧渠道架构的集成方式完成历史使命**。

### 📌 其他值得关注的动态
- **[[PR: core-team] feat(setup): template setup flow in the wizard #2909](https://github.com/nanocoai/nanoclaw/pull/2909)** 虽然没有被合并，但注释说明其依赖的 template loader（#2890）已先行落地，该 PR 作为「Agent 模板」功能第二阶段（设置向导 + 首代 stamped agent）正在推进中。项目在 Agent 模板化能力上已建立清晰路线。

---

## 4. 社区热点

今日所有 Issues/PR 的评论数与 👍 数均未记录（评论: `undefined`），因此无法依据评论量或反应数判断真实热度。但从 PR 标签与作者团队分布可以观察：

- **带 `core-team` 标签的 PR 共 2 条**：
  - [feat(setup): template setup flow in the wizard #2909](https://github.com/nanocoai/nanoclaw/pull/2909)
  - [Add AnyDoc document conversion skill #3198](https://github.com/nanocoai/nanoclaw/pull/3198)
  
  `core-team` 标记说明这两项由核心团队直接推进，是本周重点方向（Agent 模板化 + 文档转换技能）。

- **Mattermost 新旧 PR 交替（#546 → #3199）** 是最明显的社区「事件」：旧 PR 从 2 月挂到今天被正式关闭，新 PR #3199 一天内就完成提交，说明社区外部贡献者（@wakqasahmed）有意愿跟进项目架构演进、重写实现。这类长期 PR 换新的过程值得其他外部贡献者参考。

> 结论：今日社区讨论冷清，但外部贡献者的持续性投入（如 @wakqasahmed 坚持 5 个月重新实现 Mattermost 集成）体现了一定社群粘性。

---

## 5. Bug 与稳定性

今日合并了一条 bug fix，另有 3 条修复类 PR 待合并，按严重程度排序：

| 严重程度 | 问题描述 | PR | 状态 |
|---|---|---|---|
| 🟠 中 | **失败状态展示泛化**：过程卡失败标题仅显示工具动作，用户看不到具体原因 | [#3197](https://github.com/nanocoai/nanoclaw/pull/3197) | ✅ 已合并，已修复 |
| 🟠 中 | **未知斜杠命令被 SDK 当作 Claude Code 命令处理**：导致响应被静默丢弃（category 误判为 passthrough） | [#2346](https://github.com/nanocoai/nanoclaw/pull/2346) | ⏳ 待合并（5 月 8 日提出，等待 3 个月） |
| 🟡 低 | **DB 迁移缺失**：现有 messaging-group wirings 缺少 channel destinations，需要 migration 021 回填 | [#3145](https://github.com/nanocoai/nanoclaw/pull/3145) | ⏳ 待合并（迁移逻辑保留所有现有 destination 和自定义本地名） |
| 🟡 低 | **挂载未设为只读**：涉及容器/安全性的 mount readonly 修复 | [#3196](https://github.com/nanocoai/nanoclaw/pull/3196) | ⏳ 待审查（8 月 7 日提交） |

其中 **#2346 已等待约 3 个月**，属于「行为静默丢失」的隐蔽 bug，建议维护者优先处理。

---

## 6. 功能请求与路线图信号

今日 10 条 PR 中有 4 条新提交/更新的功能类 PR，释放了明确的路线图信号：

- **渠道集成扩张（Feature skill）**：
  - [Mattermost channel integration v2 #3199](https://github.com/nanocoai/nanoclaw/pull/3199) — 全新实现，注册到 `ChannelAdapter`/`channel-registry.ts`，是 v2 架构下 Mattermost 的唯一实现。大概率将被合入并作为官方渠道。
  - [Add Dial to channel picker + wizard/skills #3050](https://github.com/nanocoai/nanoclaw/pull/3050) — 进一步扩展渠道选择器，将 Dial 整合进 setup wizard（runChannelSkill 模型），说明项目在低门槛接入多渠道上有明确规划。

- **技能库扩充（Utility skill）**：
  - [Tavily MCP tool skill #3190](https://github.com/nanocoai/nanoclaw/pull/3190) — 增加 Tavily 搜索工具的 MCP 技能。
  - [AnyDoc document conversion skill #3198](https://github.com/nanocoai/nanoclaw/pull/3198) — 由 core-team 提出，增加文档转换能力。

- **Agent 模板化**（[#2909](https://github.com/nanocoai/nanoclaw/pull/2909)）：设置向导中新增「如何创建第一个 Agent」步骤，支持 Fresh agent / 模板 stamping。结合已落地的 template loader（#2890），**Agent 模板系统基本成型**，预计下一版本将正式开放。

> 路线图推断：下一版本可能是「渠道增多（Mattermost + Dial）+ Agent 模板化 + 文档处理能力增强」的组合更新。

---

## 7. 用户反馈摘要

由于今日 Issues 无更新，且 PR 评论数未记录，无法从评论区提取直接用户反馈。但从 PR 描述中可以读取到明确的真实痛点：

- **失败排查效率低**（来自 #3197）：用户运行 agent-runner 时，过程卡只显示「执行系统检查失败」这样的泛化文案，看不到具体原因，导致排障困难。该问题已在本次修改后解决。
- **命令被静默丢弃**（来自 #2346）：当用户输入未知斜杠命令时，系统会将其当作 Claude Code 命令处理，输出结果被丢弃，用户会感觉「命令没反应」——这是可用性 bug。
- **已有 Mattermost 用户被架构变迁卡住**（来自 #546 的关闭）：旧集成针对 pre-v2 架构开发，长期无法合并，相关用户等待了 5 个月。幸好新 PR #3199 已替代，但这也是一个关于「架构升级时外部贡献者体验」的警示信号。

---

## 8. 待处理积压

以下 PR 长期未合并/无响应，提醒维护者关注：

| PR | 提出时间 | 等待时长 | 潜在风险 |
|---|---|---|---|
| [fix(formatter): treat unknown slash commands as normal chat #2346](https://github.com/nanocoai/nanoclaw/pull/2346)（@SidhayaPravda618） | 2026-05-08 | ~3 个月 | bug 修复长期悬置，用户命令静默丢失问题持续存在 |
| [feat(setup): template setup flow in the wizard #2909](https://github.com/nanocoai/nanoclaw/pull/2909)（@amit-shafnir, core-team） | 2026-07-02 | ~5 周 | 功能依赖已合入（#2890），但主 PR 未合并，阻塞 Agent 模板化整体进度 |
| [feat(setup): add Dial to channel picker #3050](https://github.com/nanocoai/nanoclaw/pull/3050)（@OmriBenShoham） | 2026-07-14 | ~3.5 周 | 与 #3199 同属渠道扩展，建议合并完 Mattermost 后处理 |

另外建议维护者关注 **[#3145 数据库迁移 PR](https://github.com/nanocoai/nanoclaw/pull/3145)**（#3145，提出约 1.5 周）：它涉及既有存量数据的兼容性修复，如果长期不加，可能导致老用户升级后 message wiring 异常。

---

*报告生成时间：2026-08-08，基于 GitHub 数据自动整理。数据源：[github.com/qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-08

> 数据来源：GitHub（github.com/nearai/ironclaw）| 统计窗口：过去 24 小时 | 生成时间：2026-08-08

---

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：共产生 16 条 Issue 更新和 50 条 PR 更新，其中大型 PR（size: XL/L）占比较高，多个 PR 形成系列化推进。**最突出的信号是"文档真实性（doc-truth）"治理**：Issue #7317 提出的文档验证管道已由 5 个配套 PR（#7375–#7381）系统性落地，直接回应社区对"文档与发布行为不一致"的长期抱怨。**稳定性修复与回归测试同步推进**：6 个 bug_bash P1 级 Issue（Slack、Telegram 相关）在今日关闭，同时新增了 2 个关注基础设施稳定性的新 Issue（#7368、#7369）。整体来看，项目正处于 **v1.x 发布前的高强度加固期**——工具披露（tool disclosure）性能优化、持久化兼容性保障、压力测试覆盖是当前三大核心战线。

---

## 3. 项目进展

### 已合入（今日合并/关闭的 12 条 PR 中值得关注的 4 条）

- **[#7157] feat: explicit channel delivery tool — 两通道模型落地（已合并）** — 实现了"会话生命周期"与"通知频道"分离的双通道交付模型，删除了旧的投递启发式逻辑。这是频道架构的一次重要革。合入后 #7377（run-as-invoker）作为 follow-up 已基于它展开。
  https://github.com/nearai/ironclaw/pull/7157

- **[#7214] feat(sandbox): 添加显式 Docker 与 Railway 用户沙箱配置（已合并）** — 工作区/检查点重新按"租户+用户"隔离，每条命令在全新的非 root Python worker 中运行，剥离调用方环境变量。沙箱安全模型明显收紧。
  https://github.com/nearai/ironclaw/pull/7214

- **[#7372] test(disclosure): 固定宽目录 schema-token 缩减下限（已合并）** — 为 91 工具基准测试新增 schema-token 缩减的硬性下限断言，防止性能优势被悄然侵蚀。属于 #6810 的收尾加固。
  https://github.com/nearai/ironclaw/pull/7372

- **[#7324] chore(deps): 批量依赖升级（已合并）** — 包含 base64、toml、rstest 等 11 项 Rust 依赖更新。常规维护，风险低。
  https://github.com/nearai/ironclaw/pull/7324

### 系列 PR 推进中（构成今日最大进展的"doc-truth"系列）

针对 Issue #7317，社区成员 @thisisjoshford 一次性提交了 5 个 PR，构成一条完整的文档治理流水线：

| PR | 定位 | 状态 |
|---|---|---|
| #7375 | 修复 extension/Responses/channel 文档的实时漂移（1/5） | OPEN |
| #7376 | 将 CI 路径引用门扩展到 docs/ 全部页面（2/5） | OPEN |
| #7378 | 为 CLI/manifest/Responses 增加文档事实契约测试（3/5） | OPEN |
| #7379 | 引入 docs-live 部署分支，消除"main 分支部署 vs tag 发布"的错位（4/5） | OPEN |
| #7381 | 记录 doc-truth 管道的设计决策（5/5） | OPEN |

这套方案从**事实测试、CI 门禁、发布机制**三个层面解决文档漂移，直接回应了 #7317 的提案。
https://github.com/nearai/ironclaw/pull/7375

---

## 4. 社区热点

### 今日讨论最活跃的 Issue

- **[#7317] Proposal: Doc-Truth Verification Pipeline（3 条评论）** — 社区对文档与代码脱节的痛点集中爆发。发起人 @cuongdcdev 直接引用了代码库中的真实案例（如 `origin_gate_matrix` 成为必填字段但文档未更新），引发后续 5-PR 系列行动。说明社区对"文档可信度"有极强的修复意愿。
  https://github.com/nearai/ironclaw/issues/7317

- **[#7360] 扩展内置/持久化写入路径的压力测试覆盖（2 条评论）** — 提出当前 API 压测场景的 mock 模型不产生工具调用，导致内置能力写入路径回归无法被夜间压测捕获。该 Issue 已获得 PR #7382 的积极响应。
  https://github.com/nearai/ironclaw/issues/7360

- **[#6476] Slack extension_activate 编码错误导致模型幻觉（2 条评论，已关闭）** — 该 bug 的根因被拆分为两半：#7367（文档漂移，今日关闭）和 #6476 的幻觉问题（今日关闭）。社区的讨论焦点在于"工具失败信息没有被如实上报给模型"，反而被模型编造成了租户管理员要求。
  https://github.com/nearai/ironclaw/issues/6476

### 诉求分析

三个热点背后的共同诉求是 **"让系统对用户诚实"**：文档必须反映真实行为（#7317）、压测必须覆盖真实路径（#7360）、失败必须透明传达而非被模型掩盖（#6476）。这标志着社区关注点正从"功能可用"转向"可信可靠"。

---

## 5. Bug 与稳定性

今日 Issue 更新中，一半是 bug 相关的关闭/拆分/新报告。按严重程度排列：

### 已关闭（P1，bug_bash 发现，均已修复或有明确 fix PR）

| Issue | 问题 | 状态 |
|---|---|---|
| #6476 | Slack `extension_activate` 编码错误，模型幻觉"需要租户管理员" | 已关闭 |
| #6644 | Telegram 回复投递到错误的用户消息 | 已关闭 |
| #6643 | Telegram 配对后消息被接受但永不处理 | 已关闭（根因转 #7368 跟踪） |
| #6475 | Telegram `/pair` 命令被当作文本，用户陷入配对循环 | 已关闭 |
| #7367 | 发布文档仍称"聊天不能连接频道"，加剧模型拒答 | 已关闭（doc-truth PR 1/5 修复） |
| #6810 | 渐进式工具披露默认开启的收尾 | 已关闭 |

⚠️ 注意：#6643 和 #6475 虽关闭，但**深层问题并未完全消失**——#7368 正是其根因拆分后的延后跟踪项（见下）。

https://github.com/nearai/ironclaw/issues/6476
https://github.com/nearai/ironclaw/issues/7367

### 新增/仍开放（按风险排序）

- **[#7368] 频道消息轮次在 DeepSeek 级模型上可能耗时数分钟（新开，根因追踪）** — 从已关闭的 #6643 拆分出来。QA 日志显示同一 Telegram 线程上连续 6 次运行耗时极长，是"消息未处理"表象背后的真实原因。已确认部分反馈机制已合入，但模型延迟问题仍待优化。
  https://github.com/nearai/ironclaw/issues/7368

- **[#7298] 请求在发送前失败 / 监控系统与 runner 失联（开放）** — 两类基础设施错误，Railway 实例上出现，仍在排查。
  https://github.com/nearai/ironclaw/issues/7298

- **[#5456] Routine 运行因 runner 租约过期而失败（开放，6/30 提出）** — 90 秒不活动阈值对多工具 Routine（模型推理 + 外部 API）过于激进，是 6/30 测试的主要失败模式。**最重要的问题是：至今已 39 天仍开放**。
  https://github.com/nearai/ironclaw/issues/5456

- **[#7074] 多工具会议研究在获取日历数据后失败（开放）** — 模型调用了一个不可用的函数，发生在 Google Calendar/Docs/新闻检索的组合场景。
  https://github.com/nearai/ironclaw/issues/7074

- **[#7369] Agent 报错时无 UI 按钮可捕获 traces（新开）** — 可观测性缺口，影响用户反馈效率。
  https://github.com/nearai/ironclaw/issues/7369

### 值得注意的修复 PR

- **[#7384] fix(reborn): 加载 operator .env，停止将会话故障误报为 API 密钥错误** — 真实案例：用户看到"API key 无效"错误，实际是 .env 未加载导致。这类误导性错误消息会严重延长用户排障时间。
  https://github.com/nearai/ironclaw/pull/7384

---

## 6. 功能请求与路线图信号

### 明确进入实施阶段

- **Doc-Truth 验证管道（#7317 → PR #7375–#7381）** — 不再只是请求，5 个 PR 已在 48 小时内完成设计并提交。预计下一版本将内置"文档事实契约测试"这一 CI 门禁。这是文档工程能力的一次重要升级。
  https://github.com/nearai/ironclaw/issues/7317

- **脚本化工具调用压测（#7360 → PR #7382）** — PR #7382 已实现 Phase 1：mock LLM sidecar 驱动确定性内置/记忆工具序列，并验证持久化写读回。这是夜间压测体系从"对话级"升级为"工具级"的第一步。
  https://github.com/nearai/ironclaw/issues/7360
  https://github.com/nearai/ironclaw/pull/7382

### 新路线图信号（可能进入 v1.2）

- **[#7380] Epic: 合并前强制持久化状态兼容性** — 由 `1.0.0-rc.1` → `1.1.0-rc.1` 升级暴露的缺口：SQL 迁移不足以证明新二进制能读取旧版本写入的持久化状态。该 epic 可能引入"发布前兼容性测试门禁"，与 doc-truth 形成"行为可信 + 数据可迁移"的双重保障。
  https://github.com/nearai/ironclaw/issues/7380

- **[#7166] Epic: 工具披露 follow-up（v1.2.0）** — 渐进式工具披露在 Reborn 中默认启用后，继续优化 "model can discover and invoke every authorized deferred capability"。配套 PR #7374（bulk tool_describe）和 #7385（披露指标）都在推进中。
  https://github.com/nearai/ironclaw/issues/7166
  https://github.com/nearai/ironclaw/pull/7374

- **[#7365] feat(memory): 记忆保存指导 + 常开 MEMORY.md 提示通道** — 解决跨会话记忆丢失问题（#7185），已在 PR 阶段。三处根因（系统提示未告知记忆存在、无保存偏好指令、无记忆读写通道）一次修复。
  https://github.com/nearai/ironclaw/pull/7365

### 仍在早期/讨论中

- **Google 扩展紧凑能力（#5503，PR 开放自 7/1）** — 实验性 PR，已超一个月未合并，状态需要维护者确认。
  https://github.com/nearai/ironclaw/pull/5503

- **技能选择权移交模型（#6938，PR 开放自 7/31）** — 从关键词评分器回归到模型自主选择技能，属于 epic #6941 的一部分，已等待一周有余。
  https://github.com/nearai/ironclaw/pull/6938

---

## 7. 用户反馈摘要

- **"文档教的是旧格式"问题突出**：Issue #7317 中用户 @cuongdcdev 以 `origin_gate_matrix` 为例指出"发布破坏性变更时文档没跟上"。@BenKurrek 在 #7367 中进一步证实，过期文档不仅误导用户，还会**让模型产生"频道不能连接"的幻觉并拒绝执行**——文档漂移已从开发体验问题升级为产品行为问题。

- **"工具调用失败后模型编造解释"让用户困惑**：在 #6476 中，Slack 接入失败后模型没有如实报告工具编码错误，反而声称"需要租户管理员配置"。这类"AI 幻觉掩盖真实错误"的现象对用户信任伤害较大，也已在此次迭代中修复。

- **Telegram 用户遭遇"消息石沉大海"**：#6643 中用户完成配对后发消息无响应，#6475 中 `/pair` 命令不被识别。QA 定位到部分是模型推理延迟 + 缺少进度反馈所致（#7368），而非消息真正丢失。反馈核心诉求是："**慢可以接受，但要让我知道它在处理**"。

- **"API key 无效"是假警报**：PR #7384 披露了一个典型案例——用户收到"凭据无效"错误，实际是 `.env` 未加载。误导性错误信息让用户花费大量时间检查配置，而根因在服务端。这类问题的修复能显著提升开发者满意度。

---

## 8. 待处理积压

### 高危长尾（建议优先关注）

- **[#5456] Runner 租约过期导致 Routine 失败（开放 39 天）** — bug_bash_P1，6/30 提出，90 秒不活动阈值对多工具 Routine 过于激进。当前是**最长寿的 P1 bug**，需要产品/架构层面决策（是调阈值还是改心跳机制）。
  https://github.com/nearai/ironclaw/issues/5456

- **[#7298] 请求发送前失败 / 监控系统与 runner 失联（开放 2 天）** — 基础设施级稳定性问题，涉及 Railway 部署，可能导致用户"请求凭空消失"，建议优先级上调。
  https://github.com/nearai/ironclaw/issues/7298

### 长期开放的 PR（等待审查或决策）

- **[#5503] 实验性 Google 扩展（开放 38 天）** — 自 7/1 起无实质推进，是合并还是关闭需要维护者明确表态。
  https://github.com/nearai/ironclaw/pull/5503

- **[#6938] 技能选择权移交模型（开放 8 天）** — 属于 epic #6941 的关键分支，stacked on #6745，等待审查。
  https://github.com/nearai/ironclaw/pull/6938

- **[#7131] 触发式运行失败通知（开放 4 天）** — 解决"运行失败但创建者不知情"的体验缺口，已有完整实现，等待合入。
  https://github.com/nearai/ironclaw/pull/7131

### 治理关注（代码健康度）

- **[#7383] tool_disclosure_port.rs 已达 4,425 行** — 架构规则要求超过 3000 行的文件必须有分解跟踪 Issue。当前 #7374 还在为该文件增加约 675 行，建议项目组规划分解窗口，否则代码可维护性将持续承压。
  https://github.com/nearai/ironclaw/issues/7383

---

**日报总结**：IronClaw 正在经历一个从"功能迭代"到"可信交付"的转型期。doc-truth 5-PR 系列、持久化兼容性 epic、脚本化压测三线并进，表明项目团队正系统性地解决"文档可信、数据可迁移、回归可拦截"三大发布前痛点。社区侧，Telegram/Slack 等渠道 bug 的快速关闭（6 个 P1 在 24 小时内闭合）传递了积极信号。真正的风险点集中在 #5456（39 天未动的 P1）和 #5503（38 天未动的实验 PR）——它们是衡量项目"清理旧债"决心的试金石。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-08

## 1. 今日速览

过去 24 小时项目保持中等偏活跃水平：发布 1 个新版本（2026.8.7），6 个 PR 被合并/关闭，1 个针对模型 ID 斜杠问题的修复 PR 处于待合并状态；Issues 侧以新 bug 报告和 stale 清理为主。版本迭代节奏稳健，社区反馈集中在「OpenClaw 配置兼容性」「输入框编辑体验」等方向，项目健康度整体良好，但存在若干超 4 个月未响应的 stale Issue 值得关注。

- 新版本发布：2026.8.7
- 合并/关闭 PR：6 条 ｜ 待合并 PR：1 条
- 新开/活跃 Issue：4 条 ｜ 关闭 Issue：3 条

---

## 2. 版本发布

### LobsterAI 2026.8.7（2026-08-07 发布）

**主要更新内容：**

- ✨ **Cowork 会话标题栏搜索**（[#2435](https://github.com/netease-youdao/LobsterAI/pull/2435)）：支持在会话内按标题进行对话检索，提升长会话信息定位效率。
- ✨ **Markdown LaTeX 数学公式分隔符支持**（[#2449](https://github.com/netease-youdao/LobsterAI/pull/2449)）：改善数学公式渲染兼容性。
- 🛠️ **Windows 安装器修复**（[#2446](https://github.com/netease-youdao/LobsterAI/pull/2446)）：修复 watchdog 退出码为 null 时的崩溃问题。

**破坏性变更**：无。

**迁移注意事项**：无特殊要求，正常升级即可。

---

## 3. 项目进展

今日项目完成了多个模块的修复与功能合并，整体向前推进明显。主要进展包括：

- **2026.8.5 发布分支合并至 main**（[#2451](https://github.com/netease-youdao/LobsterAI/pull/2451)）：将 8.5 版本的会话搜索、数学渲染、IM 分析、OpenClaw 配置、Windows 安装/更新可靠性等改动全部收编主干。
- **Cowork 全屏代码工具栏点击修复**（[#2450](https://github.com/netease-youdao/LobsterAI/pull/2450)）：调整全屏覆盖层脱离 Electron 标题栏拖拽区域，恢复 Windows 下工具栏点击可用性。
- **OpenClaw 插件配置安全修复**（[#2445](https://github.com/netease-youdao/LobsterAI/pull/2445)）：从 `config.set` 中剥离插件索引管理的键，避免配置冲突。
- **聊天搜索修复**（[#2448](https://github.com/netease-youdao/LobsterAI/pull/2448)）：修复 Cowork 聊天搜索相关问题。
- **Markdown 数学公式分隔符**（[#2449](https://github.com/netease-youdao/LobsterAI/pull/2449)）：合并进入发布版本。

**待合并 PR：**
- [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452)（Open）：修复 OpenClaw 中模型 ID 含斜杠时丢失 provider 前缀的问题，已针对性回应社区 Issue [#2443](https://github.com/netease-youdao/LobsterAI/issues/2443)。

---

## 4. 社区热点

### 热点 1：模型 ID 含斜杠导致自定义 Provider 无法在界面选择（[#2443](https://github.com/netease-youdao/LobsterAI/issues/2443)）

昨日（8 月 6 日）新开的 Issue，今日获得 1 条评论，并已有对应修复 PR（[#2452](https://github.com/netease-youdao/LobsterAI/pull/2452)）被创建，属于快速响应样本。该问题影响所有使用 OpenAI 兼容服务商（如 SiliconFlow）且模型 ID 带 `/` 的用户，社区反馈积极性高。

### 热点 2：执行无结果无错误信息（[#2447](https://github.com/netease-youdao/LobsterAI/issues/2447)）

报告于 8 月 7 日，用户遇到执行无结果且无错误提示的问题，随附截图。当前尚无维护者回复，属于待明确优先级的新增 bug。

### 热点 3：自建 Skill 安装后技能面板不显示（[#1195](https://github.com/netease-youdao/LobsterAI/issues/1195)）

虽是 4 月旧 Issue（stale），但今仍有更新，说明用户持续关注。问题根源指向 skill 被安装到 OpenClaw 目录而非 LobsterAI 技能面板识别路径，属于跨系统集成路径问题。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 高 | [#1273](https://github.com/netease-youdao/LobsterAI/issues/1273)（已 stale 关闭） | sql.js（WASM）高频操作导致 `memory access out of bounds` 崩溃，且非原子写入有数据损坏风险 | 已关闭，无对应 fix PR，建议维护者复核 |
| 🟠 中高 | [#1195](https://github.com/netease-youdao/LobsterAI/issues/1195)（Open） | 自建 skill 被安装到 OpenClaw 目录，重启后技能面板无显示 | Open，4 个月未响应 |
| 🟠 中 | [#2443](https://github.com/netease-youdao/LobsterAI/issues/2443)（Open） | 模型 ID 含斜杠的自定义 Provider 无法在界面中使用 | **已有 fix PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452)** |
| 🟡 中 | [#2447](https://github.com/netease-youdao/LobsterAI/issues/2447)（Open） | 执行无结果、无错误信息 | Open，待复现与确认 |
| 🟢 低 | [#1263](https://github.com/netease-youdao/LobsterAI/issues/1263)（已 stale 关闭） | 定时任务在 UI 上重复显示，且报 API rate limit | 已关闭，疑似与 API 调用策略相关 |

---

## 6. 功能请求与路线图信号

- **多 Agent 绑定不同 IM 机器人与模型**（[#1265](https://github.com/netease-youdao/LobsterAI/issues/1265)）：用户希望不同 Agent 可绑定不同 IM 机器人和模型，以支撑「调度 Agent + 任务 Agent」的团队协作模式。与当前 OpenClaw 配置相关改动（[#2445](https://github.com/netease-youdao/LobsterAI/pull/2445)、[#2452](https://github.com/netease-youdao/LobsterAI/pull/2452)）方向一致，**可能纳入后续版本**。

- **输入框编辑模式**（[#2444](https://github.com/netease-youdao/LobsterAI/issues/2444)）：提出回车默认换行 + Ctrl+Enter 发送、可扩展编辑区等方案，涉及 UI/交互层改动。考虑到近期 commit 活跃于 renderer 领域，**有较大概率被评估**。

- **Cowork 会话搜索**（已通过 [#2435](https://github.com/netease-youdao/LobsterAI/pull/2435) 进入发布）：「会话可检索」能力进一步补全 Cowork 作为「第二大脑」的基础设施，后续可能延伸出全文搜索等能力。

---

## 7. 用户反馈摘要

- **路径混乱问题**（[#1195](https://github.com/netease-youdao/LobsterAI/issues/1195)）：用户安装 skill 后显示成功但重启不生效，实际安装到了 OpenClaw 目录——反馈「提示成功」与「实际位置」不一致，直接影响用户信任。
- **限制人工操作**（[#1265](https://github.com/netease-youdao/LobsterAI/issues/1265)）：用户明确表达多 Agent 场景下「不同职责用不同模型」的诉求，认为当前统一模型配置限制了 Agent 团队化的可能性。
- **稳定性担忧**（[#1273](https://github.com/netease-youdao/LobsterAI/issues/1273)）：WASM 内存越界崩溃和数据库损坏风险属于严重可靠性问题，用户反馈「必须强制退出」的体验，需要维护者确认是否已在新架构中规避。
- **交互效率痛点**（[#2444](https://github.com/netease-youdao/LobsterAI/issues/2444)）：长 Prompt 编辑需要频繁 Shift+Enter 换行，误按 Enter 直接发送导致输入内容丢失，是即时通讯式交互在专业编辑器场景的典型不适配。

---

## 8. 待处理积压

| Issue/PR | 创建时间 | 最后更新 | 说明 |
|---------|---------|---------|------|
| [#1195](https://github.com/netease-youdao/LobsterAI/issues/1195) | 2026-04-01 | 2026-08-07 | 自建 skill 安装路径错误，Open 状态超过 4 个月，建议尽快分诊；技能安装是高频用户操作 |
| [#1265](https://github.com/netease-youdao/LobsterAI/issues/1265) | 2026-04-02 | 2026-08-07 | 多 Agent 绑定不同 IM/模型需求，已 stale 关闭但代表真实路线图信号，建议纳入后续规划讨论 |
| [#1273](https://github.com/netease-youdao/LobsterAI/issues/1273) | 2026-04-02 | 2026-08-07 | WASM 崩溃/数据库损坏，虽然关闭但仍需确认新版底层存储是否有替换或加固计划 |
| [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) | 2026-08-07 | 2026-08-07 | 模型 ID 斜杠修复 PR，当前待合并，建议尽快 review 合入以关闭 #2443 |

---

*以上日报基于 GitHub 公开数据自动生成，供项目维护者与社区参阅。*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-08


## 1. 今日速览

过去 24 小时 CoPaw（QwenPaw）项目保持**高活跃度**：共产生 22 条 Issue 更新（15 条新开/活跃、7 条关闭）和 47 条 PR 更新（21 条合并/关闭、26 条待合并），并发布了补丁版本 `v2.1.0-beta.2`。值得关注的是，今日社区反馈集中在** Windows 桌面端稳定性**（安装锁文件、文本无法选中复制）、**插件生态兼容性**（qwenpaw-creator 在 Windows 上无法工作）以及**严格 OpenAI 兼容提供方的请求格式兼容**等方向。此外，多位首次贡献者提交了高质量的 bug 修复 PR（shell 临时文件泄漏、Playwright 驱动死连接自愈、自定义 persona 文件显示回归等），显示出社区参与度正在上升。

- 活跃度评估：**高**（Issue + PR 合计 69 条更新，多项长时间悬而未决的问题获得修复 PR）
- 健康度信号：版本迭代节奏快、多方向修复同步推进，但 2.0.1/2.1.0b2 用户的稳定性反馈集中，需关注回归控制


## 2. 版本发布

### v2.1.0-beta.2

于 2026-08-07 发布，主要包含两项修复：

- **fix(ci): fence-aware section extraction in real-behavior-proof (fixes #6626)** — 修复 CI 真实行为验证中代码围栏感知的段落提取逻辑。
- **fix(checkpoints): restore auto snapshots in web workspace bootstrap** — 修复 Web 工作区启动时自动快照恢复。

🔗 发布链接：https://github.com/agentscope-ai/QwenPaw/releases

> ⚠️ **注意事项**：本次为 beta 版本，社区反馈 v2.1.0b2 存在桌面模式文本无法选中复制（#6797）、Agent Kanban 创建 Issue 返回 405（#6794）等问题，建议生产环境用户暂缓升级，等待稳定版。


## 3. 项目进展

今日合并/关闭了 21 条 PR，以下为值得关注的项目级推进（含近期合并的重要 PR）：

- **PR #4694（已合并）feat(website): downloads UI Refactoring and opt** — 官网下载页面 UI 重构与体验优化，历时 2 个多月后完成合并，预计改善用户获取安装包的流程。🔗 https://github.com/agentscope-ai/QwenPaw/pull/4694

- **PR #6564（Under Review）fix(memory): flush pending turns before compression (#6555)** — 修复 Scroll 压缩前未刷新待处理 turns 的问题，补齐内存管理生命周期缺口。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6564

- **PR #6615（Under Review）fix(config): handle corrupted agent config and invalid JSON** — 增强 `load_agent_config` 对损坏 agent 配置的容错性，避免因 JSON 解析失败导致整个 Agent 无法加载。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6615

- **PR #6623（Under Review）fix(acp): prevent final text loss when notifications race the prompt response** — 修复 ACP 传输层中通知与提示响应竞争导致的最终文本丢失问题。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6623

- **PR #6688（Under Review）fix(plugins): isolate bare absolute imports per plugin namespace** — 修复插件安装时 `No module named 'utils.env'` 的失败问题，为插件提供命名空间级绝对导入隔离。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6688

- **PR #6772（Open）feat(memory): enhance ReMe configuration, embedding lifecycle, and Daily Paper** — 大型功能 PR：引入统一 Embedding 模型工厂（OpenAI-compatible / DashScope / DashScope Multimodal）、新增 Daily Paper 定时论文简报、重构 Console 记忆配置页面。此 PR 标志着记忆模块从“可用”走向“可配置、可观测”。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6772

> 整体来看，项目正在同时推进：
> 1. **稳定性修复**（配置容错、ACP 文本丢失、shell 输出泄漏、Playwright 死连接）
> 2. **开发者体验**（插件隔离、CI 修复、官网下载改造）
> 3. **功能深化**（ReMe 记忆链路、OneBot 媒体消息支持、邮件管家）


## 4. 社区热点

### 讨论最活跃的 Issues

1. **#6116 [Bug] Doom loop: agent repeatedly triggers same tool call in single turn**（评论 8）
   - 作者 @feng183043996 报告 Agent 在单轮对话中陷入死循环，重复调用同一工具约 6 次才被系统拦截，浪费大量 API 调用和 Token。
   - 该问题已关闭（wontfix），但 8 条评论表明社区关注度较高。类似的循环保护问题在 #6773 中再次出现（Linux 上 doom-loop/rubric 门控失效）。
   - 🔗 https://github.com/agentscope-ai/QwenPaw/issues/6116

2. **#6782 [Bug] 2.0.1 docker 版本，插件市场、应用市场始终提示维护中**（评论 8）
   - 作者 @Sakura7301 反馈 Docker 版插件/应用市场不可用，8 条评论中有多用户复现，说明该问题影响面较广且尚未定位。
   - 🔗 https://github.com/agentscope-ai/QwenPaw/issues/6782

3. **#6810 [Bug] Windows 安装/更新在覆盖文件前应终止所有占用安装目录的进程**（评论 2）
   - NSIS 安装器弹出 4+ 个“无法打开要写入的文件”错误（python.exe、VCRUNTIME140.dll 等），根源是浏览器扩展 NM host 锁文件未释放。需求明确：安装前应自动终止占用进程。
   - 🔗 https://github.com/agentscope-ai/QwenPaw/issues/6810

4. **#6490 [Feature] Add Volcengine Agent Plan and Xiaomi MiMo Standard API as built-in providers**（评论 4）
   - 用户请求内置火山引擎 Agent Plan 订阅制接口和 Xiaomi MiMo 标准 API。4 条评论中维护者和用户有互动，说明功能可能进入评估队列。
   - 🔗 https://github.com/agentscope-ai/QwenPaw/issues/6490


## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 问题描述 | 状态 |
|--------|-------|----------|------|
| 🔴 高 | #6810 | Windows 安装/更新时因进程占用目录（NM host 锁文件）导致 NSIS 报错、安装失败 | 新开，无 PR |
| 🔴 高 | #6782 | 2.0.1 Docker 版插件市场/应用市场持续显示“维护中”，功能完全不可用 | 新开，无 PR |
| 🔴 高 | #6780 | 2.0.1 版本闲置几十分钟后进程卡死，只能强制重启 | 新开，无 PR |
| 🟠 中 | #6803 | OpenAI 兼容 Chat 请求携带 Responses-API `input_text` 类型+裸流字段，被 StepFun 等严格提供方拒绝（400） | 新开，已有 PR #6809 |
| 🟠 中 | #6811 | OpenAI Responses 续写摘要忽略 `disable_thinking`，60 秒取消误报为格式错误 | 新开，无 PR |
| 🟠 中 | #6813 | `consume_model_response` 在 agentscope 2.x ChatResponse 上抛 `KeyError: '__aiter__'`，导致聊天自动标题生成失败 | 新开，无 PR |
| 🟠 中 | #6812 | Gemini provider 发送带 `$schema` 字段的 tool schema，被 Google API 拒绝，模型执行失败 | 新开，无 PR |
| 🟡 低 | #6794 | Agent Kanban 创建 Issue 返回 405，热重载时 404 | 新开，无 PR |
| 🟡 低 | #6792 | 内置 ACP runner 引用已弃用 npm 包名（`@zed-industries/claude-agent-acp` 等） | 新开，无 PR |
| 🟡 低 | #6785 | 自定义 persona .md 文件无法在 Console Files 页面切换（回归） | 新开，已有 PR #6808 |
| 🟡 低 | #6797 | v2.1.0b2 桌面模式无法选中复制对话文字 | 已关闭，有 PR #6801/#6802 |
| 🟡 低 | #6796 | v2.1.0b2 任务执行时无法在对话框提交新会话（回归） | 已关闭，无 PR |
| ⚪ 已修复 | #6773 | Linux 上 doom-loop/rubric 门控失效（`in_loop_modes` 无效） | 已关闭 |
| ⚪ 已修复 | #6565 | shell 多行命令换行被折叠 + 后台进程卡住 | 已关闭 |
| ⚪ 已修复 | #6480 | `nohup`/`&` 启动的进程导致 agent 卡住 | 已关闭 |

> **关键发现**：
> - **多用户报告 2.0.x/2.1.0b2 的稳定性回归**（#6780 卡死、#6810 安装失败、#6797 文本选中、#6796 会话提交），建议维护团队重点排查 beta 引入的桌面端/工作区变更。
> - **严格 OpenAI 兼容提供方的兼容性问题成为新趋势**（#6803, #6812），说明 QwenPaw 用户正在接入更多第三方模型 API，协议兼容性需加强。
> - 今日 Bug 中已有对应修复 PR 的：#6803→PR #6809， #6785→PR #6808， #6797→PR #6801/#6802。其余高严重度问题尚无修复。


## 6. 功能请求与路线图信号

### 值得关注的新功能请求

| Issue | 请求内容 | 分析 |
|-------|----------|------|
| #6490 | 内置 Volcengine Agent Plan + Xiaomi MiMo Standard API | 用户对国产模型 API 接入需求明显；若能落地可获得大量国内用户。维护者已互动，有较大概率进入路线图 |
| #6285 | Aliyun Token Plan 模型列表中增加 `qwen3.8-max-preview` | 硬编码模型列表未及时跟随阿里云更新；属于低成本小改动，适合快速跟进 |
| #6770 | 用户 Chrome 标签页生命周期可配置化 | 跨响应周期保持 Chrome 标签页存活，对浏览器自动化类 Agent 场景有实际价值，值得评估 |
| #6800（PR） | 智能邮件管理助手（mailbox） | 新功能 PR，支持多邮箱提供方、实时监控、访问控制；功能完整度高但需仔细评审安全模型 |

### 路线图信号

- **记忆/上下文管理是当前重点**：PR #6772（ReMe 增强）+ PR #6564（压缩前 flush）共同指向项目在长对话记忆方向的持续投入。
- **多平台渠道支持继续扩展**：PR #6715（OneBot 远程媒体）、PR #6804（微信中文审批回复）表明 IM 渠道兼容性仍在持续打磨。
- **插件生态隔离与安全**：PR #6688 修复插件导入隔离 + #6806/#6807 反馈 Windows 插件不可用，说明插件系统是当前薄弱环节，也是短期内主攻方向。


## 7. 用户反馈摘要

- **痛点 1：桌面端基础体验回归** — 多个用户反馈 v2.1.0b2 桌面模式无法选中/复制文本（#6797）、无法在任务执行时提交新会话（#6796）。这些是高频基础交互，回归影响感知极强。

- **痛点 2：安装升级体验差** — #6810 用户详细描述 NSIS 安装器因文件占用反复报错、升级卡死，建议安装前自动终止占用进程。这与常见 Windows 软件安装器行为预期不符。

- **痛点 3：Docker 部署功能不可用** — #6782 多个用户复现插件/应用市场持续“维护中”，推测与 Docker 环境配置或 CDN 地址访问有关。

- **痛点 4：空闲卡死影响长时间运行** — #6780 用户报告闲置几十分钟后进程卡死，对 7x24 小时运行的服务器场景构成严重困扰。

- **正面反馈**：PR #6772 的 ReMe 记忆增强和 PR #6800 的邮件助手获得社区关注，说明用户对“智能体记忆”和“自动化办公”类功能期待值高。


## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建时间 | 时间跨度 | 内容 | 备注 |
|-------|---------|---------|------|------|
| #6116 | 2026-07-14 | 25 天 | Agent 单轮重复调用工具的 doom loop（已 wontfix 关闭） | 已关闭，但 #6773 表明同类问题在 Linux 上仍存在 |
| #6285 | 2026-07-20 | 19 天 | 内置模型列表未更新 `qwen3.8-max-preview` | 低修复成本，建议快速处理 |
| #6490 | 2026-07-27 | 12 天 | Volcengine / Xiaomi MiMo 内置 provider 请求 | 有维护者互动，建议明确排期 |

### 待关注状态 PR

| PR | 内容 | 状态 | 等待时间 |
|----|------|------|---------|
| #6615 | 修复损坏 agent 配置容错 | Under Review | 8 天 |
| #6617 | 流式重试路径上遵守 Retry-After 上限 | Under Review | 8 天 |
| #6623 | 修复 ACP 最终文本丢失 | Under Review | 7 天 |
| #6688 | 插件裸绝对导入隔离（修复 #6683） | Open | 4 天 |
| #6750 | 会话身份死锁、提前保存、超长 prompt 折叠 | Open | 2 天 |

### 给维护者的提醒

1. **#6782（Docker 市场不可用）** 影响面大且无响应，建议优先排查 Docker 构建中的市场 URL/内网访问配置。
2. **#6780（空闲卡死）** 涉及核心进程稳定性，建议复现并检查空闲时的连接保活/GC 逻辑。
3. **#6810（Windows 安装锁）** 是 NSIS 安装器的常见坑，建议安装脚本中增加 `taskkill`/检测逻辑。
4. **多个 PR 已停留 Under Review 超过一周**（#6615, #6617, #6623），建议加速 review 节奏，避免社区贡献者流失。

---

*本日报由 AI 自动生成，数据截止 2026-08-08。所有链接均指向 GitHub 原始 Issue/PR 页面。*

</details>
