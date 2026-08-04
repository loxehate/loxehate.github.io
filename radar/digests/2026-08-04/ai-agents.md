# OpenClaw 生态日报 2026-08-04

> Issues: 182 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-04 00:37 UTC

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

# OpenClaw 项目动态日报 — 2026-08-04

---

## 1. 今日速览

过去 24 小时项目保持**极高水平**的社区活跃度：共产生 182 条 Issue 更新（其中新开/活跃 173 条，关闭 9 条）和 500 条 PR 更新（待合并 332 条，已合并/关闭 168 条），显示项目正处于高频迭代与社区反馈集中爆发期。无新版本发布，但合并/关闭的 168 条 PR 表明维护团队正在快速消化累积的修复成果。**值得高度关注**的是，今日高热度 Issue 高度集中在**消息丢失（message-loss）、会话状态损坏（session-state）、崩溃循环（crash-loop）**三类 P1 级稳定性问题上，其中多个为钻石龙虾（diamond lobster）最高优先评级，且大量已关联修复 PR（clawsweeper:linked-pr-open），说明团队正针对核心稳定性问题展开集中攻坚。

---

## 2. 版本发布

**今日无新版本发布。** 最近一个已知版本为 2026.7.2-beta.7（Docker 部署中已被多次提及），建议关注后续 patch 版本的发布，以修复当前积压的大量 P1 问题。

---

## 3. 项目进展

今日无明确展示的"已合并/关闭 PR"具体列表，但 24 小时内共关闭/合并 168 条 PR，涵盖修复、QA 覆盖、文档与 SDK 增强。以下从当前待合并队列中筛选出最接近合入状态（标记为 `ready for maintainer look` 或 `proof: sufficient`）的关键 PR，反映项目即将推进的重要方向：

| PR | 关联模块 | 解决的问题 | 当前状态 |
|---|---|---|---|
| [#119021](https://github.com/openclaw/openclaw/pull/119021) | QA 实验室 | 为 `apply_patch`/`edit` 工具建立主 QA 证据，验证工作区字节级持久化与工具拒绝路径 | 新开，maintainer 提交 |
| [#119025](https://github.com/openclaw/openclaw/pull/119025) | QA 实验室 | 覆盖网关直接工具调用的端到端测试，补充双传输路径产品级证明 | 新开，maintainer 提交 |
| [#119028](https://github.com/openclaw/openclaw/pull/119028) | QA 实验室 | 覆盖 Agent 会话流式的产品边界：有序 delta、单次终止、规范转录消息持久化 | 新开，maintainer 提交 |
| [#119029](https://github.com/openclaw/openclaw/pull/119029) | QA 实验室 | 证明 Agent 工具审批控制的实际执行路径，而非仅归因于 followthrough 场景 | 新开，maintainer 提交 |
| [#119023](https://github.com/openclaw/openclaw/pull/119023) | Slack 通道 | 修复 bot 开启回复线程时丢失频道上下文的问题 | 新开，待审 |
| [#119024](https://github.com/openclaw/openclaw/pull/119024) | 会话管理 | 当 transcript 追加被拒绝时，错误信息能准确标识会话身份 | 新开，待审 |
| [#101248](https://github.com/openclaw/openclaw/pull/101248) | 子代理 | 为子代理完成路由新增原生 `announceTarget` 支持（#27445） | 等待 maintainer review |
| [#118363](https://github.com/openclaw/openclaw/pull/118363) | 工具搜索 | 保留 MCP 工具 `isError: true` 的失败状态，不再被 Tool Search 吞掉 | 等待 maintainer review |
| [#118977](https://github.com/openclaw/openclaw/pull/118977) | SDK | 支持实时转录 WebSocket 子协议协商（修复 FunASR 服务器 HTTP 400 拒绝） | 等待 maintainer review |
| [#117719](https://github.com/openclaw/openclaw/pull/117719) | WhatsApp | 入站媒体下载瞬时失败时自动重试，不再永久替换为 `[whatsapp attachment unavailable]` | 等待 maintainer review |

**项目状态判断：** 维护者（vincentkoc、steipete 等）今日密集提交 QA 覆盖类 PR，结合新增的 `QA: primary proof for containers and external app SDK`（#118785）Issue，说明项目正在系统性地补齐**质量验证体系**，为下一阶段的大规模发布夯实基础。同时，子代理完成路由（#101248）、MCP 失败保留（#118363）、Slack 线程上下文修复（#119023）等合入后，将直接缓解多个 P1 级会话状态问题。

---

## 4. 社区热点

今日讨论热度最高的 Issue 反映了社区对**核心稳定性与消息可靠性**的强烈关注：

| Issue | 评论数 | 热度原因 | 核心诉求 |
|---|---|---|---|
| [#116277 DeepSeek v4 Flash 静默回复失败](https://github.com/openclaw/openclaw/issues/116277)（已关闭） | 100 | 极高的评论数，模型静默失败后仅输出泛化 fallback 消息，直接影响日常使用 | 要求：失败时给出明确错误原因，而非无声降级 |
| [#116201 Realtime voice 无界状态保留](https://github.com/openclaw/openclaw/issues/116201) | 50 | 实时语音会话在慢速/突发 provider 行为下无限保留 superseded consult work、pre-ready audio 等，资源无硬性上限 | 要求：为实时语音会话增加硬性资源所有权边界 |
| [#84516 Codex 长回复静默截断](https://github.com/openclaw/openclaw/issues/84516) | 11 | 回复在 ~1000-1100 字符处被静默截断，`aborted: false`、无错误码，但文本戛然而止 | 要求：定位截断根因并明确报错 |
| [#52249 ACP 父会话卡死](https://github.com/openclaw/openclaw/issues/52249) | 9 | 子会话完成后父会话保持无响应，必须手动刷新 UI 才能恢复 | 要求：修复 ACP 父流 relay 的 transcript 检测逻辑 |

**热点诉求归纳：** 社区最强烈的呼声集中在 Model/Agent 运行时的**静默失败**（silent failure）问题上。无论是 DeepSeek 回复缺失、Codex 截断、还是 ACP 会话卡死，共同点是系统未能向用户提供及时的、可操作的错误信号。这已成为当前影响用户信任度的首要问题。

---

## 5. Bug 与稳定性

以下按严重程度排列今日活跃的稳定性问题：

### 🔴 P0 — 数据丢失风险

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#117742](https://github.com/openclaw/openclaw/issues/117742) | 多文件 `apply_patch` 失败后，**之前的删除/写入已永久提交**，但工具调用整体返回失败，破坏事务原子性 | 无关联 fix PR，需立即关注 |

### 🟠 P1 — 消息丢失 / 会话状态损坏

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#116277](https://github.com/openclaw/openclaw/issues/116277) | DeepSeek v4 Flash 静默失败，已关闭 | 已关闭 |
| [#84516](https://github.com/openclaw/openclaw/issues/84516) | Codex 长回复静默截断在 ~1000-1100 字符 | 无新 fix PR，等待 live repro |
| [#115700](https://github.com/openclaw/openclaw/issues/115700) | `chat.send` 被 "thread switched branches" 拒绝，`expectedLeafEntryId` 过期未刷新 | 已关联 fix PR |
| [#115037](https://github.com/openclaw/openclaw/issues/115037) | 恢复中断会话时合成 "No response requested."，导致用户消息被降级模型静默处理 | 已关联 fix PR |
| [#118625](https://github.com/openclaw/openclaw/issues/118625) | 主会话压缩持有写锁超过 60s 超时，子代理 announce 超时放弃，**静默丢失结果** | 已关联 fix PR |
| [#89095](https://github.com/openclaw/openclaw/issues/89095) | 子代理运行超时后父会话不收到任何通知，完成事件静默丢弃 | 无 fix PR，recovery-stuck |
| [#114234](https://github.com/openclaw/openclaw/issues/114234) | 容器内 PID 复用导致 usage-cost 刷新锁永久不可释放，缓存永久冻结 | 已关联 fix PR |
| [#118018](https://github.com/openclaw/openclaw/issues/118018) | 过期的子代理完成事件被投递到错误的请求者生命周期 | 已关联 fix PR |
| [#115228](https://github.com/openclaw/openclaw/issues/115228) | killed 的后台 Agent 留下孤儿 `<task-notification>`，吞掉下一条用户消息 | 已关联 fix PR |
| [#106704](https://github.com/openclaw/openclaw/issues/106704) | 子代理首轮调用 `sessions_yield` 被静默视为 `ok` 空结果 | 无 fix PR，等待 product decision |
| [#114184](https://github.com/openclaw/openclaw/issues/114184) | Slack 同频道两个线程被错误串行化，ingress lane 键缺少 `thread_ts` | 等待 maintainer review |
| [#118534](https://github.com/openclaw/openclaw/issues/118534) | Codex 原生子代理在首次工具调用前报 "Native hook relay unavailable" | 等待 maintainer review |
| [#118684](https://github.com/openclaw/openclaw/issues/118684) | `networkProxy` 发出的 `:project_roots` 配置 token 导致所有沙箱 exec 失败 | 待 live repro |
| [#118846](https://github.com/openclaw/openclaw/issues/118846) | 网关主线程从启动起持续 ~100% CPU，导致本地 RPC 1006 断开 | 等待 maintainer review |
| [#118678](https://github.com/openclaw/openclaw/issues/118678) | 每 Agent contextTokens 与内嵌 precheck budget 不一致（200k vs 128k） | 无 fix PR |

### 🟡 P2 — 行为异常 / 体验问题

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#91144](https://github.com/openclaw/openclaw/issues/91144) | Windows 原生 CLI 网关 Scheduled Task 无法保持运行 | 已有 fix shape，等待产品决策 |
| [#116010](https://github.com/openclaw/openclaw/issues/116010) | 所有持久会话被强制限制在 128k 上下文，忽略模型配置 | 已关联 fix PR |
| [#118242](https://github.com/openclaw/openclaw/issues/118242) | exec-approvals 迁移拒绝旧版 null 字段，且不指明问题条目 | 已关联 fix PR |
| [#111857](https://github.com/openclaw/openclaw/issues/111857) | CLI budget 反复压缩已压缩的低上下文父会话，浪费 token | 无 fix PR |
| [#117358](https://github.com/openclaw/openclaw/issues/117358) | 压缩逻辑忽略边界，延迟已完成回复的投递 | 已关联 fix PR |
| [#116575](https://github.com/openclaw/openclaw/issues/116575) | Webhooks 插件无法激活（secrets 被 redact、路径不持久化） | 无 fix PR |

**今日稳定性判断：** 修复 PR 的覆盖率较高，约 60% 的 P1 级问题已有关联 PR；但 **#117742（apply_patch 部分提交）** 和 **#89095（子代理超时静默）** 仍无有效修复，属于高风险积压项。

---

## 6. 功能请求与路线图信号

| Issue | 功能需求 | 信号强度 |
|---|---|---|
| [#115924](https://github.com/openclaw/openclaw/issues/115924) | **Idea Shower** — Agent 执行任务时并行收集用户想法的"平行思维"交互模式 | P3，无 PR，处于概念验证阶段 |
| [#74722](https://github.com/openclaw/openclaw/issues/74722) | 语言感知的 TTS 路由 — 按输入语言自动选择 TTS 音色和模型 | P2，无 PR，已获 1 👍 |
| [#80752](https://github.com/openclaw/openclaw/issues/80752) | `CommitmentsConfig` 增加可选 `model` 覆盖字段 | P2，无 PR，社区 2 👍，已有先例可循（active-memory/compaction） |
| [#58407](https://github.com/openclaw/openclaw/issues/58407) | Discord 线程会话注入父频道置顶消息作为上下文 | P2，无 PR，star 级需求（diamond lobster） |
| [#39343](https://github.com/openclaw/openclaw/issues/39343) | 网关层图片批处理 / 媒体组缓冲（Telegram 相册不再逐张触发回复） | P2，无 PR，长期未解决（3 月提出） |
| [#51534](https://github.com/openclaw/openclaw/issues/51534) | Discord 回复时自动注入 `@mention`，确保通知触达 | P2，无 PR，multi-agent 高频痛点 |
| [#14079](https://github.com/openclaw/openclaw/issues/14079) | Linux 桌面通知支持（`notify-send`/libnotify/D-Bus） | P2，无 PR，2 月提出至今未解决 |
| [#13601](https://github.com/openclaw/openclaw/issues/13601) | 持久化 Cron 执行历史 + 过滤能力 | P2，无 PR，2 月提出 |
| [#47606](https://github.com/openclaw/openclaw/issues/47606) | 执行防漂移守卫：artifact 门控状态、升级计时器、green 后无空闲 | P3，无 PR，需求较为前瞻 |

**路线图判断：** 今日值得注意的新增 feature 为 **Idea Shower**（#115924），其"并行思考"交互模式如果落地，将显著改变 Agent 与人的协作方式。与此同时，**两个 2 月提出的老 feature（#14079 Linux 通知、#13601 Cron 历史）至今无任何推进信号**，说明团队当前资源集中在稳定性修复而非新功能开发。

---

## 7. 用户反馈摘要

### 核心痛点（按出现频率排序）

**1. 静默失败是最大的信任杀手**
> 多个 Issue（#116277、#84516、#115228）的共性反馈是：系统不报错、不 abort、不提示，但结果就是不出现。用户无法区分"模型在思考"还是"系统已失败"。一位用户在 #116277 中评论道，fallback 消息 "No reply was generated" 是"最糟糕的失败模式" —— 它没有告诉用户为什么失败，也没有任何重试机制。

**2. 上下文/压缩机制反复触发，浪费 token 且延迟回复**
> #111857、#117358 多位用户反映：长会话父代在子代理完成后被重复压缩，即使上下文使用率仅 6%（65k/1.05M），仍判断需要压缩。用户 @itanyplus 在 #111857 中反馈："每次子代理完成后都要等 20-40 秒的压缩，而我的会话明明完全没有压缩需求。"

**3. 子代理/后台任务的生命周期管理混乱**
> #52249、#89095、#115228、#106704 均与此相关。用户 @dapzthelegend 描述："子代理完成时父会话卡死，刷新后才恢复，但我不知道在这期间有没有丢消息。" 完成事件不通知、孤儿通知吃消息、yield 被静默吞掉——子代理机制的用户信任度较低。

**4. 通道适配层的体验细节缺失**
> Discord `@mention` 不自动补全（#51534）、微信 ACP 中间文本丢失（#92199）、Telegram exec 输出渲染为图片（#105342）、LINE 图片逐张轰炸（#39343）——多通道场景下，用户感知到"OpenClaw 在非 Telegram/Slack 通道上体验不完整"。

**5. 部署与升级的碎片化问题**
> Windows Scheduled Task 不稳定（#91144）、容器 PID 复用导致锁死（#114234）、插件版本与核心漂移（#83337）、Linux OOM（#89315）——不同部署形态的用户遇到各自的环境特定 bug，反映出测试矩阵仍有覆盖盲区。

---

## 8. 待处理积压

以下为长期未解决或需维护团队重点关注的问题：

### 🔴 高优先级积压（P0/P1 + 长时间未解决）

| Issue / PR | 提出时间 | 最后更新 | 备注 |
|---|---|---|---|
| [#14079](https://github.com/openclaw/openclaw/issues/14079) Linux 桌面通知 | 2026-02-11 | 2026-08-04 | 半年未解决，P2 但用户持续关注（1 👍），每日仍有更新但无 PR |
| [#13601](https://github.com/openclaw/openclaw/issues/13601) Cron 执行历史持久化 | 2026-02-10 | 2026-08-03 | 半年未解决，P2，审计与可靠性需求 |
| [#39343](https://github.com/openclaw/openclaw/issues/39343) 图片批处理/媒体组缓冲 | 2026-03-08 | 2026-08-03 | 5 个月未解决，P2 diamond lobster |
| [#83337](https://github.com/openclaw/openclaw/issues/83337) 插件/核心版本漂移静默失败 | 2026-05-18 | 2026-08-03 | 2.5 个月未解决，P1 diamond lobster，等待产品决策 |
| [#89095](https://github.com/openclaw/openclaw/issues/89095) 子代理超时不通知父会话 | 2026-06-01 | 2026-08-04 | 2 个月未解决，P1 diamond lobster，无 fix PR |
| [#89718](https://github.com/openclaw/openclaw/issues/89718) ACP streamTo 静默 stall | 2026-06-03 | 2026-08-03 | 2 个月未解决，P1 platinum hermit，等待 live repro |
| [#106777](https://github.com/openclaw/openclaw/issues/106777) exec-approvals 锁泄漏导致全面 fail-closed（已关闭） | 2026-07-13 | 2026-08-03 | 已关闭但值得复盘：关闭是否表示已修复？需确认 |
| [#81185](https://github.com/openclaw/openclaw/pull/81185) Redact exec 工具结果载荷 | 2026-05-12 | 2026-08-04 | 大 PR（XL），安全相关，等待作者更新 3 个月 |
| [#101276](https://github.com/openclaw/openclaw/pull/101276) exec deny-over-allow 黑名单 | 2026-07-07 | 2026-08-04 | 合并风险高（兼容性+安全边界），等待作者更新 |
| [#117742](https://github.com/openclaw/openclaw/issues/117742) apply_patch 部分提交（P0） | 2026-08-02 | 2026-08-03 | 无 fix PR，数据丢失风险 |

### 需 maintainer 决策的 PR（waiting on author / needs maintainer review）

- [#110569](https://github.com/openclaw/openclaw/pull/110569) docs 术语表 git 查找超时修复 — 等待作者
- [#115968](https://github.com/openclaw/openclaw/pull/115968) 按候选独立压缩超时 — 等待作者
- [#117034](https://github.com/openclaw/openclaw/pull/117034) 执行身份审查（XL）— 等待作者
- [#118813](https://github.com/openclaw/openclaw/pull/118813) Gateway update/setup RPCs QA 覆盖 — 等待作者
- [#118953](https://github.com/openclaw/openclaw/pull/118953) Custodian 设置一键取消 — 等待作者（screenshot proof）

---

**日报总结语：** OpenClaw 项目正处于**高活跃、高压力、高修复效率**的三高状态。社区反馈集中指向"静默失败"类问题，而维护团队通过密集的 QA 覆盖 PR（今日 6 个 qa-lab PR）展示了对质量体系建设的重视。建议下一步优先解决 **#117742（apply_patch 部分提交）** 与 **#89095（子代理超时静默）** 两个无修复 PR 的高危问题，并尽快推进 **#116277 类失败模式的根因可视化** —— 这将直接提升用户对系统的信任度。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-04 | 数据窗口：过去 24 小时 | 覆盖项目：9 个**

---

## 1. 生态全景

当前个人 AI 助手开源生态呈现**"超级头部 + 长尾分化"**结构：OpenClaw 以单日 182 条 Issue、500 条 PR 的体量远超其他项目总和，是绝对的核心参照系；第二梯队（IronClaw、Zeroclaw、CoPaw）围绕架构重构、安全加固、渠道扩展形成差异化竞争。贯穿全生态的共性痛点是**"静默失败"**——DeepSeek 静默无回复（OpenClaw #116277）、微信推送假成功（CoPaw #6614）、会话静默丢失（NanoClaw #3184）等案例表明，系统不报错但结果不出现正在成为用户信任的头号杀手。与此同时，MCP（Model Context Protocol）已从协议概念走向全生态的标准化集成底座（Moltis #1183、IronClaw #7024、NanoClaw #3092 均围绕其展开），而多家头部项目开始系统性补建 QA/验证体系（OpenClaw QA 实验室、CoPaw real-behavior proof），标志着行业正从"功能扩张期"转向"质量巩固期"。

## 2. 各项目活跃度对比

| 项目 | Issues（24h） | PRs（24h） | Release | 合并/关闭效率 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 182 更新（173 新开/活跃，9 关闭） | 500 更新（332 待合并，168 合并/关闭） | 无（最近 2026.7.2-beta.7） | 33.6% 合并率 | ⚠️ 极高活跃+高压力；P1 稳定性集中攻坚，60% P1 已关联 fix PR |
| **IronClaw** | ~70 条总更新（Issue 关闭 2） | 70 条总更新（18 合并） | 无（确立周三发布节奏） | 较高 | ⚠️ 高活跃、中高风险；Wave 3 大重构与 bug_bash 并行，pre-existing 技术债集中暴露 |
| **CoPaw** | 11 更新 | 50 更新（24 合并/关闭） | **v2.1.0-beta.1** | 48% 合并率 | ⚠️ 已发版+基建修复落地；但微信推送、飞书阻塞、WebView2 黑屏三大高影响 bug 无修复 PR |
| **Zeroclaw** | 8 新增/活跃，1 关闭 | 50 更新（8 合并，42 待合并） | 无 | 16% 合并率 | ⚠️ 安全加固阶段方向明确；维护者决策队列（#8692）成瓶颈，P1 安全 PR 积压 |
| **NanoBot** | 2 更新（1 新开，1 关闭） | 36 更新（25 合并/关闭，11 待合并） | 无 | **69% 合并率（最高）** | ✅ 健康；Eden AI/ModelScope/codex 双模式落地，Opus 5 兼容性问题需快速响应 |
| **LobsterAI** | 2 更新（均为 stale） | 11 更新（6 合并/关闭） | 无 | 55% 合并率 | ✅ 有序迭代；4 月积压的 7 项 Issue/PR 长期 stale，需清理 |
| **NanoClaw** | 1 新开 | 9 更新（6 合并/关闭） | 无 | 67% 合并率 | ✅ 修复+加固周期；Node 版本兼容 bug 尚无响应 |
| **PicoClaw** | 8 更新（3 活跃，5 关闭） | 8 活动（5 合并，3 待合并） | 无 | 63% 合并率 | ✅ 流程闭环良好；两个高影响 bug（MCP 挂起、WebUI 卡顿）无修复 PR |
| **Moltis** | 0 | 1 更新（1 待合并） | 无 | 0% | 🔶 低活跃但方向明确（MCP 仓库化管理）；PR 合并节奏偏慢 |

## 3. OpenClaw 在生态中的定位

**社区规模绝对领先**：单日 Issue/PR 总量（682）超过其余 8 个项目之和（约 190），是唯一达到"平台级"社区密度的项目。

**技术路线差异**：
- **全链路自研 + 多通道优先**：OpenClaw 直接面向 end-to-end 助手运行时（Agent 运行时、子代理路由、会话压缩、网关）叠加 Slack/WhatsApp/Discord/Telegram 等丰富的通道适配器；而 NanoBot 定位为轻量多提供商网关、IronClaw 专注架构分层重构、CoPaw/LobsterAI 侧重桌面与 IM 渠道闭环。
- **率先建立 QA 证据体系**：今日 6 个 maintainer 提交的 QA 实验室 PR（#119021 等），系统性地为工具调用、网关路由、会话流式建立"主证据"，这在全生态中独树一帜——其他项目仍依赖零散 E2E 或 CI 门禁（CoPaw #6653、IronClaw #7087）。
- **社区驱动的问题收敛机制**：P1 问题（消息丢失、会话状态损坏、崩溃循环）全部关联 `clawsweeper:linked-pr-open` 标签，实现"issue→fix PR"的自动化追踪，远超同行的手动管理。

**相对短板**：超高活跃度伴随 P1 积压。多文件 `apply_patch` 部分提交（#117742，P0 数据丢失风险）与子代理超时静默（#89095）尚无修复 PR；静默失败类问题（#116277 等）直接侵蚀用户信任。体量本身既是生态位优势，也是稳定性治理的放大镜。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求（代表性条目） |
|---|---|---|
| **静默失败 & 错误可视化** | OpenClaw、CoPaw、NanoClaw、Zeroclaw | OpenClaw #116277（fallback 无原因）；CoPaw #6614（微信推送 4400 万 token 假成功）；NanoClaw #3184（`No conversation found` 无自愈）；Zeroclaw #9642（审批超时伪造审计轨迹） |
| **MCP 生态标准化** | Moltis、IronClaw、NanoClaw、OpenClaw | Moltis #1183（仓库包化管理）；IronClaw #7024（OAuth 元数据解析）；NanoClaw #3092（远程 Streamable HTTP）；OpenClaw #118363（MCP 工具 `isError` 状态保留） |
| **子代理/多 Agent 生命周期治理** | OpenClaw、CoPaw、IronClaw、PicoClaw | OpenClaw #89095（超时不通知）；CoPaw #6588（空 batch 占位符误判）；IronClaw #7075（失败后忽略新问题）；PicoClaw #3301（routed-agent 下 /clear 失效） |
| **模型 API 高频变更的适配韧性** | NanoBot、LobsterAI、OpenClaw | NanoBot #5235（Opus 5 弃用 temperature 致全部请求被拒）；LobsterAI #1206（kimi2.5 重复回复）；OpenClaw #116277（DeepSeek 静默失败） |
| **上下文压缩与成本控制** | OpenClaw、PicoClaw、CoPaw | OpenClaw #111857（6% 使用率仍被压缩）；PicoClaw #3301（路由后压缩失效）；CoPaw #6649（GPT-5.6 prompt caching 降本诉求） |
| **CI/QA 验证体系加固** | OpenClaw、IronClaw、CoPaw | OpenClaw QA 实验室 6 PR；IronClaw #7087（CI planner 路径误判）；CoPaw #6653（Evidence 被剥离） |
| **渠道适配"长尾补齐"** | OpenClaw、CoPaw、PicoClaw、NanoClaw | OpenClaw #119023（Slack 线程上下文）；CoPaw #6608（飞书长命令阻塞）；PicoClaw #3315（Telegram 私聊主题）；NanoClaw #3181（iMessage 显式 opt-in） |

## 5. 差异化定位分析

| 项目 | 核心定位 | 目标用户 | 关键架构特征 | 独特差异点 |
|---|---|---|---|---|
| **OpenClaw** | 通用个人 AI 助手 + Agent 框架 | 开发者/极客/自部署者 | 多通道网关 + Agent 运行时 + 子代理路由 + 会话压缩 | 生态最全、迭代最快；QA 证据体系独有 |
| **IronClaw** | 可组合 Agent 运行时（Rust） | 平台工程师/架构师 | WIT 组件化分层（loops/substrates/products） | 架构重构力度最大；周三发布纪律 |
| **CoPaw** | 多渠道助理（桌面 + IM） | 中国及亚洲用户 | 桌面端 + 微信/飞书/Telegram 通道 | 贴近中国 IM 生态；v2.1.0-beta.1 已发版 |
| **Zeroclaw** | SOP 驱动的合规 Agent 平台 | 企业/合规敏感团队 | SOP 权限契约 + 审计追踪 + 结构化可观测性 | 安全边界与审计完整性为第一优先级 |
| **NanoBot** | 轻量多提供商网关 | 快速原型/个人用户 | OpenAI 兼容 API 统一接入（Eden AI/ModelScope/DeepSeek 等） | PR 合并率最高（69%），迭代质量稳 |
| **LobsterAI** | 桌面多智能体协同（Electron） | 中国桌面用户 | 侧边栏多 Agent 任务流 + 积分增长体系 | 网易系产品背景，增长功能（如积分活动）直接落地 |
| **NanoClaw** | 安全加固的 Agent 运行时 | 安全敏感/托管环境用户 | 加固镜像基线 + 参与度策略自治 | 安全基线可复现（digest 一致），Agent 自服务方向 |
| **PicoClaw** | 轻量 routed-agent 管理 | 嵌入式/轻部署场景 | 分发规则路由多 Agent + 自定义白名单 | @j-v 等社区贡献者单日多 PR，协作密度高 |
| **Moltis** | MCP 基础设施管理 | 企业 MCP 多实例团队 | 托管仓库包 + Vault 生命周期集成 | 专注 MCP 管理单点；社区早期阶段 |

**渠道阵营分化明显**：全球向项目（OpenClaw、NanoBot、IronClaw）围绕 Slack/Discord/Telegram；中国向项目（CoPaw、LobsterAI）围绕微信/飞书，且更重视桌面端体验与增长运营。

## 6. 社区热度与成熟度分层

**第一梯队：爆发式迭代（每日 PR > 100）**
- **OpenClaw**：社区规模一骑绝尘，但 P1 稳定性问题成建制出现，处于"规模倒逼质量"阶段。168 条 PR 合并/关闭说明维护团队消化能力极强，QA 实验室的建立是向成熟期过渡的明确信号。

**第二梯队：高活跃重构/巩固（每日 PR 30-70）**
- **IronClaw**：架构重构主导，技术债集中暴露（"pre-existing"标签频繁），健康度为中高风险。周三发布节奏的确立是走向可预期交付的关键一步。
- **CoPaw**：已发版 + 基建修复双线推进，但三大高影响 bug（微信/飞书/WebView2）无修复方案，版本发布未能完全缓解信任压力。
- **Zeroclaw**：安全加固方向正确，但 16% 的 PR 合并率与维护者决策队列积压（#8692）构成主要瓶颈——社区热情与决策效率之间存在剪刀差。

**第三梯队：稳定迭代/质量巩固（每日 PR < 20）**
- **NanoBot**：69% 合并率表现最佳，功能与修复节奏均衡，是新提供商适配的标杆项目。
- **NanoClaw**、**PicoClaw**、**LobsterAI**：均在各自细分方向稳定推进，共同问题是 1-2 个高影响 bug 长期无 fix PR（NanoClaw Node 兼容、PicoClaw MCP 挂起、LobsterAI kimi2.5 重复回复），以及 4 个月级 stale 积压侵蚀贡献者信心。

**第四梯队：早期/低频**
- **Moltis**：单 PR 驱动，社区互动为零，尚处于能力构建期。

## 7. 值得关注的趋势信号

1. **"静默失败"正成为全行业信任头号杀手，显式错误信号将从"最佳实践"变为"必备设计"**。OpenClaw #116277 用户称 fallback 消息是"最糟糕的失败模式"；CoPaw #6614 的微信推送假成功消耗 4400 万 token——这提示开发者：**错误路径的可见性与主路径同等重要**，可操作的失败提示（原因 + 重试路径）应列入 Agent 框架的核心设计原则。

2. **QA/验证体系成为项目成熟度的分水岭**。OpenClaw 的 QA 实验室（维护者亲自提交主证据 PR）、CoPaw 的 real-behavior-proof CI 门禁、IronClaw 对 CI planner 可靠性的修复，共同指向一个趋势：**头部项目正在为"Agent 行为不可证明"这一根本难题建立工程化答案**。对开发者而言，选择框架时其验证体系的完备度将比功能数量更具参考价值。

3. **MCP 正在完成从协议到生态的跃迁**。单日出现三条独立线程：Moltis 做仓库包化管理、IronClaw 做认证元数据解析、NanoClaw 做远程 Streamable HTTP——MCP 已成为 Agent 工具互联的"USB-C 接口"。值得警惕的是失败状态保留问题（OpenClaw #118363），说明**协议普及的下半场是错误语义的标准化**。

4. **模型 API 的破坏性变更（如 Opus 5 弃用 temperature）暴露出提供商适配层的系统性脆弱**。NanoBot 的 `omit_temperature` 硬编码列表是典型的"补丁式适配"。行业需要**声明式能力协商**（见 NanoBot #5204 的 ResponsesCapabilities 重构方向），而非逐模型打补丁。

5. **上下文压缩机制已成为高频痛点**。OpenClaw 用户反馈"6% 上下文使用率仍被压缩、每次子代理完成等 20-40 秒"，CoPaw 用户诉求 prompt caching——**压缩策略的智能化和成本可观测性将是下一轮体验竞争的关键战场**。

6. **子代理生命周期管理是普遍的"半成品区"**。完成事件不通知（OpenClaw #89095）、失败后忽略新指令（IronClaw #7075）、孤儿通知吞消息（OpenClaw #115228）——多 Agent 协作的可靠性仍远未成熟，这既是风险也是开源贡献者的机会窗口。

7. **渠道适配呈现明显的"长尾欠账"**。主流渠道（Telegram/Slack）之外的 Discord @mention 缺失、LINE 图片轰炸、飞书长命令阻塞、微信推送失效，反复印证：**多通道不是简单的 API 对接，而是每个渠道都需要一等公民级的状态管理与错误语义设计**。中国向项目（CoPaw、LobsterAI）在本土渠道上有天然优势，但同样受困于渠道长尾。

8. **维护者响应速度正在成为社区健康度的核心指标**。Zeroclaw 的决策队列（#8692）、LobsterAI 的 4 个月 stale 积压、IronClaw 的 32 天 release PR 悬挂，已引发社区不满；而 NanoBot 的 69% 合并率、PicoClaw 的 issue→PR 快速转化则展示了正向循环。**建议技术决策者在评估项目时，将"PR 从提交到合并的中位时间"列为关键选型指标。**

---

*报告基于 9 个项目 2026-08-04 的 GitHub 社区动态，数据来源为各项目日报摘要。所有结论均以公开 Issue/PR 编号为证据支撑。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-04


## 1. 今日速览

过去 24 小时 NanoBot 保持高活跃迭代节奏：共 36 条 PR 更新，其中 25 条已合并/关闭（合并率约 69%），11 条待合并；Issue 侧仅 2 条更新（1 新开、1 关闭）。值得注意的信号是：长期积压的 codex 双模式 PR（#1550，3 月创建）于昨日关闭，说明维护者正在清理历史积压；同时新浮现的 Anthropic Opus 5 配置被 API 拒绝问题（#5235）是当前最需要关注的兼容性风险。整体项目健康度良好，修复与功能推进双线并行，社区贡献活跃。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

昨日合并/关闭的 25 条 PR 中，以下对项目整体推进较为关键：

**新能力落地**

- **Eden AI 网关提供商正式合入**（#4861，7/9 创建→8/3 合并）：新增 `providers.edenai`，支持以 OpenAI 兼容方式接入 Eden AI 网关，保留 `provider/model` 模型 ID 格式。该 PR 从创建到合并历时近一个月，属于"新提供商"路线上的重要里程碑。[链接](https://github.com/HKUDS/nanobot/pull/4861)
- **ModelScope（魔搭）文档补齐**（#5038）：内置 ModelScope 提供商的使用文档正式合入，包含 LLM 与图像生成的 JSON 配置示例、API base 说明以及异步图像提交/轮询行为。[链接](https://github.com/HKUDS/nanobot/pull/5038)
- **openai_codex 双模式（OAuth + 自定义 Responses）合入**（#1550，3/5 创建→8/3 关闭）：该 PR 在积压 5 个月后终于关闭，为 `openai_codex` 增加最小侵入式的双模式运行能力，解决了用户配置 `api_base` / `api_key` 后仍被强制走 OAuth 的痛点。[链接](https://github.com/HKUDS/nanobot/pull/1550)

**稳定性与体验修复（多集中于 WebUI）**

- **WebUI i18n 全面审计**（#5227）：修正简/繁中文术语（如 `网页` → `网络`），补齐 key 与插值不一致，并本地化剩余硬编码 UI 文案。[链接](https://github.com/HKUDS/nanobot/pull/5227)
- **本地触发器消息持久化**（#5228）：会话弹窗现在能显示实际触发的本地消息内容，不再只显示可复制的触发命令。[链接](https://github.com/HKUDS/nanobot/pull/5228)
- **IME 输入期间线程稳定**（#5229）：修复中文等输入法组合输入期间 textarea 自动缩放导致滚动跳动的问题。[链接](https://github.com/HKUDS/nanobot/pull/5229)
- **移动端键盘自动收起**（#5226）：发送后自动关闭移动端虚拟键盘，同时保留桌面端聚焦行为。[链接](https://github.com/HKUDS/nanobot/pull/5226)

**核心链路修复**

- **DeepSeek reasoning 内容序列化修复**（#5214）：OpenAI Responses API 路由下，DeepSeek 的 reasoning 字段类型混用导致整段对话被端点拒绝，已修复为 wire-valid 格式。[链接](https://github.com/HKUDS/nanobot/pull/5214)
- **Gateway 停止时资源确定性关闭**（#5215）：修复停止 gateway 时 exec 会话 / MCP 子进程导致的 asyncio teardown 噪音与停机卡顿。[链接](https://github.com/HKUDS/nanobot/pull/5215)
- **插件安装回退到 uv**（#5213）：当 `python -m pip` 缺失（如 `uv tool` 安装环境），`nanobot plugins enable` 自动回退使用 `uv`。[链接](https://github.com/HKUDS/nanobot/pull/5213)
- **history.jsonl 尾部读取容错**（#5221）：`_read_last_entry` 对 4KiB 窗口截断在 UTF-8 多字节字符中间的情况做了容错处理。[链接](https://github.com/HKUDS/nanobot/pull/5221)
- **cron 表达式创建时校验**（#5141）：在保存调度计划前即对 cron 表达式做语法校验，避免静默失败。[链接](https://github.com/HKUDS/nanobot/pull/5141)

## 4. 社区热点

当前 API 数据中 PR 评论数字段未采集（显示为 `undefined`），Issues 侧评论数均为 0，无法依据评论量做热度排名。但从 PR 数量、标签优先级和更新时序来看，以下条目属于昨日社区关注焦点：

- **#5235 [OPEN] Opus 5 配置被 API 拒绝** — 新开 Issue，0 评论但严重性极高：Anthropic 最新 Opus 5（7/24 发布）已完全弃用 temperature 参数，而 Nanobot 的 `omit_temperature` 列表尚未包含 `"opus-5"`，导致所有 Opus 5 请求携带 temperature 被 API 拒绝。这属于"新模型发布→兼容性滞后"的典型问题。[链接](https://github.com/HKUDS/nanobot/issues/5235)
- **#5233 / #5232 Mattermost 线程分组策略** — 同一功能提交了两个 PR：先提交 #5232 后关闭，随即重新开放 #5233（当前为 OPEN）。此举说明贡献者在积极迭代该功能（跟随 #4459 的 Mattermost 支持，新增 `groupPolicyInThread` 配置项并在 WebUI 暴露）。[链接](https://github.com/HKUDS/nanobot/pull/5233)
- **#5234 [OPEN] mst-python 元搜索提供商** — 新 PR，优先级 p1。Meta-Search Tool 聚合 DuckDuckGo、Google、Brave、Bing 等多搜索引擎结果并通过 RRF 融合，是搜索能力的重要增强，潜在影响面较大。[链接](https://github.com/HKUDS/nanobot/pull/5234)

## 5. Bug 与稳定性

按严重程度排列：

**高优先级（阻塞新模型/新模型切换场景）**

- **Anthropic Opus 5 所有请求被 API 拒绝**（#5235，OPEN）：`omit_temperature` 子串列表缺少 `"opus-5"`，Opus 5 已完全弃用 temperature，导致每次请求都发送该参数而被拒。影响所有使用 Opus 5 的用户，且目前没有对应的 fix PR，需要维护者快速响应。[Issue 链接](https://github.com/HKUDS/nanobot/issues/5235)
- **Gemini 收到跨提供商工具调用时 400 INVALID_ARGUMENT**（#5230，OPEN + fix PR）：历史中包含其他提供商产生的工具调用（中途切换模型 / fallback 路由）时，Gemini 会因缺少签名报 400 错误。已有 fix PR 待合并，方案是丢弃未签名的工具调用。[PR 链接](https://github.com/HKUDS/nanobot/pull/5230)

**中优先级（功能正确性受损，已有 fix PR）**

- **Telegram 围栏代码块被破坏**（#5222，OPEN）：语言标签含特殊字符（如 `c++`、`objective-c`）时，正则 ` ```[\w]* ` 在首个非单词字符处截断，导致代码块内容被错误解析。[PR 链接](https://github.com/HKUDS/nanobot/pull/5222)

**已修复（昨日合入）**

- **MIME type "text/plain" 导致前端 JS 模块加载失败**（#5190，CLOSED 8/3）：已解决。
- **history.jsonl 尾部 UTF-8 截断崩溃**（#5221，CLOSED 8/3）：已修复。
- **DeepSeek reasoning 反序列化错误**（#5214，CLOSED 8/3）：已修复。
- **gateway 停止时 asyncio teardown 噪音 / 停机卡顿**（#5215，CLOSED 8/3）：已修复。
- **pip 缺失导致插件启用失败**（#5213，CLOSED 8/3）：已修复。
- **cron 非法表达式静默失败**（#5141，CLOSED 8/3）：已修复。
- **WebUI 一系列体验问题**（#5227 / #5228 / #5229 / #5226，均已合并）：i18n、触发器消息、IME 稳定、移动端键盘。

## 6. 功能请求与路线图信号

以下待合并 PR 反映了近期功能方向，按优先级排列：

**Provider 生态扩展**

- **#5234（p1）mst-python 元搜索提供商**：聚合多搜索引擎 + RRF 融合，提升搜索覆盖质量，是 Web Search 能力的重大升级。[链接](https://github.com/HKUDS/nanobot/pull/5234)
- **#5204（p1）Responses capabilities 声明式重构**：将 OpenAI Responses 相关的 provider-name 判断改为 `ResponsesCapabilities` 声明式 profile，覆盖 OpenAI、GitHub Copilot、DeepSeek 的路由/推理回放/压缩/API override 等行为。属于架构层面的可维护性重构，且带有 `conflict` 标签，说明需要先解决冲突。[链接](https://github.com/HKUDS/nanobot/pull/5204)

**Agent / 会话能力增强**

- **#5211 跨会话搜索和提及**：新增 `search_sessions` 与 `read_session` API，让 WebUI 用户可在 `@` 提及面板中选择其他会话，并持久化稳定会话引用。对多会话工作流是显著增强。[链接](https://github.com/HKUDS/nanobot/pull/5211)
- **#5231 Dream 空闲会话归档**：目前 `history.jsonl` 只记录超过 `retain_recent_legal_suffix` 保护窗口的会话；空闲会话永远不会产生输入。该 PR 添加归档机制，使 Dream 能处理此类会话。[链接](https://github.com/HKUDS/nanobot/pull/5231)

**渠道/WebUI**

- **#5233（p2）Mattermost 线程独立分组策略**：为线程与主频道配置不同的提及要求，并在 WebUI 中暴露。[链接](https://github.com/HKUDS/nanobot/pull/5233)

## 7. 用户反馈摘要

本期 Issues 均无评论，以下从 Bug 描述中提炼用户痛点：

- **新版模型适配滞后**：#5235 用户指出 Opus 5（7/24 发布）的 temperature 弃用让 Nanobot 的 `omit_temperature` 列表过期问题"newly relevant"——说明用户期待项目能紧跟上游模型 API 变更，而不是等模型发布近两周才暴露问题。[链接](https://github.com/HKUDS/nanobot/issues/5235)
- **前端部署环境兼容性**：#5190 用户反馈"项目启动后前端 JS 加载失败，服务器返回 `text/plain` MIME 类型"——此类问题常见于简单的静态文件服务配置不当场景，用户期望开箱即用。[链接](https://github.com/HKUDS/nanobot/issues/5190)
- **跨提供商切换的隐形成本**：#5230 描述的场景（中途切换模型 / fallback 路由）暴露了多提供商互操作性的短板，用户对"同一会话跨模型迁移"有实际需求，但目前会直接硬失败。[链接](https://github.com/HKUDS/nanobot/pull/5230)
- **CJK 输入体验**：#5229 针对 IME 组合输入期间滚动跳动的修复，反映了中文/日文/韩文用户对 WebUI 输入体验的精细化要求，说明非英文用户群体在持续增长。[链接](https://github.com/HKUDS/nanobot/pull/5229)

## 8. 待处理积压

- **#5204 Responses capabilities 重构带 `conflict` 标签**：重要架构重构（p1），但存在合并冲突，需要维护者协调解决或引导贡献者 rebase。[链接](https://github.com/HKUDS/nanobot/pull/5204)
- **#5235 Opus 5 温度参数问题无 fix PR**：新开且高影响，目前还没有对应的修复 PR 或认领人，建议尽快分配。[链接](https://github.com/HKUDS/nanobot/issues/5235)
- **#5232/#5233 重复提交**：#5232 已关闭但 #5233 重新开放同标题 PR，建议维护者确认关闭原因（是流程问题还是内容问题），避免贡献者困惑。[#5232 链接](https://github.com/HKUDS/nanobot/pull/5232) / [#5233 链接](https://github.com/HKUDS/nanobot/pull/5233)

---

*数据窗口：2026-08-03 ~ 2026-08-04（过去 24 小时）*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-04

## 今日速览

Zeroclaw 项目今日保持高强度迭代节奏：24小时内新增/活跃 Issue 8 条、关闭 1 条，PR 更新 50 条（其中 42 条待合并，8 条已合并/关闭），无新版本发布。项目当前处于 **v0.9.0 目标周期内的密集开发与安全加固阶段**，核心议题集中在 **SOP 权限契约、可观测性增强、Provider 运行时稳定性** 三大方向。值得关注的是，多个高优先级（P1）安全修复 PR（如 Gemini API 密钥泄露、Git shell 策略加固）仍在等待作者响应，维护者决策队列（#8692）持续积压，建议关注。

---

## 版本发布

**无新版本发布。**

---

## 项目进展

今日合并/关闭的 PR 数量为 8 条，其中可见的合并项包括：

- **[#9698] chore(deps): bump actions/attest-build-provenance from 3.2.0 to 4.1.1**（已关闭）— 依赖更新，提升 CI 供应链安全。

其余合并/关闭的 PR 未在 Top 20 列表中展示，但结合 Issue 动态可推断，项目正在推进以下方向：

- **Provider 运行时修复**：多个 P1/P2 级 PR（如 #9606、#9484、#9419）处于待合并状态，涉及 OpenAI 代理支持、Provider 刷新顺序、凭据轮换等关键运行时行为。
- **安全加固**：#9678（Git shell 策略参数加固）、#9435（Gemini API 密钥泄露修复）等安全相关 PR 已提交，等待维护者审核。
- **可观测性重构**：#9451（退役 DORA 遥测）为大型重构 PR，涉及破坏性变更，需谨慎评估。

> 项目整体处于 **“安全与稳定性优先”** 的收敛阶段，大量修复集中在运行时可靠性和安全边界，而非新功能开发。

---

## 社区热点

### 1. #8303 — RFC: Goal mode v1 — bounded foreground Matrix work
- **评论 11 条 | 👍 1 | 更新于 2026-08-03**
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8303

**分析**：这是当前社区讨论最激烈的 RFC，涉及跨多轮 agent 对话的持久化目标追踪。评论者关注点集中在**控制面边界**（重启交接、通道准入、模型发起控制）的界定，说明社区对“有界目标执行”有强烈需求，但实现复杂度高，需要维护者明确设计边界。

### 2. #8692 — [Tracker]: Maintainer decision queue for RFCs and design issues
- **评论 8 条 | 状态: accepted**
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8692

**分析**：该 tracker 已成为社区反馈维护者决策效率的窗口。8 条评论中，社区成员在催促对多个 RFC（如 #8303、#7232、#9598）的明确决策。这反映出**项目决策流程存在瓶颈**，建议维护者优先处理该队列。

### 3. #7232 — RFC: Structured Observability Enhancement
- **评论 5 条 | 更新于 2026-08-04**
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/7232

**分析**：可观测性增强的 RFC 持续获得关注，社区对 OTel trace 关联、敏感数据脱敏的需求明确。该 RFC 与 #9451 PR（移除 DORA 遥测）形成呼应，说明项目正在重构可观测性基座。

---

## Bug 与稳定性

### 严重度：高（P1）

| Issue | 描述 | 状态 | Fix PR |
|-------|------|------|--------|
| [#9642](https://github.com/zeroclaw-labs/zeroclaw/issues/9642) | 审批超时被记录为显式操作员拒绝，**伪造审计轨迹** | 已关闭 | 无 |
| [#9606](https://github.com/zeroclaw-labs/zeroclaw/pull/9606) | OpenAI Responses 路径未遵守运行时代理配置 | 待合并 | #9606 |
| [#9435](https://github.com/zeroclaw-labs/zeroclaw/pull/9435) | Gemini API Key 在错误文本中泄露 | 待合并 | #9435 |

### 按度：S2（降级行为）

| Issue | 严重 | 状态 | Fix PR |
|-------|------|------|--------|
| [#9718](https://github.com/zeroclaw-labs/zeroclaw/issues/9718) | Telegram 频道在模型同时输出 tool_call 和 content 时发送重复消息 | 开放 | 无 |
| [#9719](https://github.com/zeroclaw-labs/zeroclaw/issues/9719) | 过期的 provider 刷新可能变更替换后的会话 | 开放 | [#9484](https://github.com/zeroclaw-labs/zeroclaw/pull/9484) |

### 分析

- **#9642 已关闭**，但审计轨迹伪造问题严重，建议维护者确认修复方案已落地并补充回归测试。
- **#9718 和 #9719** 均为新报告（8 月 3-4 日），尚无对应修复 PR，需关注。
- **#9435** 为安全敏感问题，PR 已提交但等待审核，建议优先处理。

---

## 功能请求与路线图信号

### 高潜力纳入下一版本

| RFC/Issue | 描述 | 状态 | 分析 |
|-----------|------|------|------|
| [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | Goal mode v1 — 有界前台 Matrix 工作 | 开放，11 评论 | 核心功能需求，但设计复杂度高，可能进入 v0.9.0 或 v0.10.0 |
| [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) | SOP 能力权限契约 | Rev 2，目标 v0.9.0 | 已明确目标版本，是 v0.9.0 的安全基础 |
| [#7232](https://github.com/zeroclaw-labs/zeroclaw/issues/7232) | 结构化可观测性增强 | 开放 | 与 #9451 PR 联动，可能随重构一并落地 |
| [#9530](https://github.com/zeroclaw-labs/zeroclaw/issues/9530) | 高风险路径中测试变更的风险优先级 | 开放 | 文档类，可能随维护者文档更新合入 |

### 路线图信号

- **v0.9.0 重点**：SOP 权限契约（#9598）是明确目标，预计将合入。
- **长期方向**：Goal mode（#8303）和可观测性重构（#7232）是社区关注重点，但实现周期较长。

---

## 用户反馈摘要

### 真实用户痛点

1. **审计轨迹可信度**（#9642 评论）：用户指出审批超时被记录为“显式拒绝”会伪造审计轨迹，影响合规性。这是对审计完整性的严重担忧。
2. **重复消息干扰**（#9718）：Telegram 用户反馈重复消息影响使用体验，属于 S2 降级行为。
3. **配置迁移困惑**（#9707）：用户反馈裸 `vision_model_provider` 配置无法选择迁移后的 V3 别名，说明配置迁移文档和兼容性需改进。

### 使用场景

- **多轮任务执行**（#8303）：社区对“有界目标执行”有明确需求，期望 agent 能在多轮对话中持续追踪一个目标。
- **安全审计**（#9642）：企业用户关注审计日志的准确性，期望 ZeroClaw 能提供可信的合规记录。

### 满意度

- **正面**：社区对安全修复类 PR（如 #9435）反馈积极，感谢贡献者快速定位问题。
- **负面**：维护者决策速度成为社区关注点（#8692），多个 RFC 等待时间较长。

---

## 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建时间 | 最后更新 | 积压天数 | 重要性 |
|-------|----------|----------|----------|--------|
| [#7232](https://github.com/zeroclaw-labs/zeroclaw/issues/7232) | 2026-06-05 | 2026-08-04 | 60 天 | 高风险 RFC，可观测性核心 |
| [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 2026-06-24 | 2026-08-03 | 41 天 | 高风险 RFC，社区关注度高 |
| [#8431](https://github.com/zeroclaw-labs/zeroclaw/issues/8431) | 2026-06-28 | 2026-08-03 | 37 天 | 临时工件清理，存储压力 |

### 待合并的关键 PR

| PR | 创建时间 | 最后更新 | 积压 | 风险 |
|----|----------|----------|------|------|
| [#9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419) | 2026-07-26 | 2026-08-04 | 9 天 | 高风险，凭证轮换 |
| [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) | 2026-07-27 | 2026-08-03 | 8 天 | 高风险，Anthropic 响应分类 |
| [#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214) | 2026-07-20 | 2026-08-03 | 14 天 | 高风险，eval 沙箱 |

### 维护者提醒

- **#8692 决策队列**：多个 RFC 等待维护者决策，建议优先处理 #8303 和 #7232，避免社区等待时间过长。
- **安全修复优先级**：#9435（Gemini 密钥泄露）和 #9606（OpenAI 代理）均为 P1 安全修复，建议尽快合并。

---

> **项目健康度评估**：整体活跃度高，社区参与积极，但维护者决策效率成为瓶颈。安全修复类 PR 积压时间较长，建议优先处理。核心功能（Goal mode、SOP 权限）处于设计阶段，预计 v0.9.0 将迎来重要更新。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-04

## 1. 今日速览

过去 24 小时项目保持中等活跃度：8 条 Issue 更新（3 活跃 / 5 关闭）、8 条 PR 活动（3 待合并 / 5 关闭合并），流程闭合情况良好；无新版本发布。社区贡献集中，@j-v 一人提交 3 个 PR（[#3316](https://github.com/sipeed/picoclaw/pull/3316)、[#3314](https://github.com/sipeed/picoclaw/pull/3314)、[#3313](https://github.com/sipeed/picoclaw/pull/3313)），覆盖 routed-agent 上下文管理与命令白名单修复；@genuss 提交 Telegram 私聊主题支持。当日关闭的 5 条 PR 中，日文本地化、路由 ID 规范化、antigravity token 刷新修复均已落地。仍有两项影响核心体验的 Bug（Web UI 输入延迟、MCP 连接失败导致挂起）无对应修复 PR，是当前稳定性短板。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日关闭/合并的 5 个 PR 对项目的具体推进如下：

- [PR #3273](https://github.com/sipeed/picoclaw/pull/3273)（feat(webui): add Japanese localization）— 为 WebUI 添加完整日文本地化（ja.json 共 968 行），对应 Issue [#3272](https://github.com/sipeed/picoclaw/issues/3272) 同步关闭。项目国际化迈出一步，后续版本将覆盖日文用户。
- [PR #3202](https://github.com/sipeed/picoclaw/pull/3202)（fix(routing): strip leading/trailing underscores in ID normalization）— 修复 `NormalizeAgentID` / `NormalizeAccountID` 对下划线边界的处理，使输出符合 `^[a-z0-9][a-z0-9_-]{0,63}$` 规范，增强路由解析的健壮性。
- [PR #3267](https://github.com/sipeed/picoclaw/pull/3267)（fix scope bug for refresh agy token）— 修复 antigravity provider token 刷新时 scope 传递错误，解决 `PERMISSION_DENIED: Request had insufficient authentication scope` 问题。
- [PR #3313](https://github.com/sipeed/picoclaw/pull/3313)（Fix: agent not able to execute shell command added to customAllowPatterns）— 与 [#3314](https://github.com/sipeed/picoclaw/pull/3314) 为同一修复的两个版本：#3313 已关闭，修正版 #3314 仍处待合并状态。修复内容为 `customAllowPatterns` 不生效、默认 deny 规则优先级过高的问题。
- [PR #3310](https://github.com/sipeed/picoclaw/pull/3310)（Feat/auto pr）— 由自动化工具生成的 PR，已关闭，属工具链实验性提交。

整体来看，项目在本地化覆盖、路由规范性和第三方 provider 兼容性上各有实质推进。三个新开放 PR（[#3316](https://github.com/sipeed/picoclaw/pull/3316)、[#3315](https://github.com/sipeed/picoclaw/pull/3315)、[#3314](https://github.com/sipeed/picoclaw/pull/3314)）若合入，将补齐 routed-agent 上下文管理、Telegram 私聊主题支持和命令白名单行为一致性，值得关注。

## 4. 社区热点

评论和互动最集中的问题集中在以下两个方向：

- [Issue #3281](https://github.com/sipeed/picoclaw/issues/3281)（[BUG] Web UI chat input is very laggy when history has a little bit long）— 3 条评论、1 👍，为今日互动最多 Issue。用户报告 Web UI 在会话历史较长时输入严重卡顿。这一反馈直指前端长会话渲染性能，目前无对应 PR，说明该问题尚未有明确的修复路线，是社区最集中的体验痛点。
- [Issue #3269](https://github.com/sipeed/picoclaw/issues/3269)（[BUG] If the MCP server connection fails, the agent loop will hang）— 2 条评论、1 👍。MCP 连接失败导致整个 agent 循环挂起、聊天界面停止回复，对依赖 MCP 工具链的用户影响很大。目前无修复 PR。

从互动内容看，社区当前的核心诉求是「长会话下的 Web UI 性能」和「外部依赖故障时的系统韧性」——两者均直接影响日常可用性。值得注意的是 Issue [#3301](https://github.com/sipeed/picoclaw/issues/3301)（routed-agent 下 /clear 失效）在今日获得对应修复 PR [#3316](https://github.com/sipeed/picoclaw/pull/3316)，说明由 issue 到 patch 的社区闭环正在形成。

## 5. Bug 与稳定性

按严重程度排列今日关注的 Bug 状态：

| 严重度 | Issue | 问题描述 | 状态 |
|--------|-------|----------|------|
| 高 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP 服务连接失败导致 agent 循环挂起，聊天界面无响应 | 开放，无修复 PR |
| 高 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 在会话历史稍长时输入卡顿严重 | 开放，无修复 PR |
| 中 | [#3301](https://github.com/sipeed/picoclaw/issues/3301) | 经由 dispatch rules 路由到非默认 agent 的会话中，/clear 与自动压缩失效 | 开放，已有修复 PR [#3316](https://github.com/sipeed/picoclaw/pull/3316) |
| 中 | [#3313](https://github.com/sipeed/picoclaw/pull/3313) / [#3314](https://github.com/sipeed/picoclaw/pull/3314) | 自定义命令白名单 `customAllowPatterns` 不生效，默认 deny 规则优先 | 修复 PR 待合并（#3314） |
| 低 | [#3268](https://github.com/sipeed/picoclaw/issues/3268) | exec 工具 `action` 参数被设为必填，AI 调用漏传即失败 | 已关闭，建议已获处理 |
| 低 | [#3265](https://github.com/sipeed/picoclaw/issues/3265) | 未配置 deltachat 时 gateway 启动仍报未知 channel 类型错误 | 已关闭 |
| 低 | [#3264](https://github.com/sipeed/picoclaw/issues/3264) | `SplitMessage` 在超大 fenced-code info 字符串上死循环 | 已关闭 |

当前最需要维护者介入的是 #3269 和 #3281：前者是核心链路可靠性问题，后者是高频 UI 性能问题，二者均无对应修复 PR，且已进入 stale 标记状态。

## 6. 功能请求与路线图信号

- **日文本地化已合入**：Issue [#3272](https://github.com/sipeed/picoclaw/issues/3272) 与 PR [#3273](https://github.com/sipeed/picoclaw/pull/3273) 同日关闭，WebUI 日文支持基本确定进入主线。
- **Telegram 私聊主题支持（新方向）**：[PR #3315](https://github.com/sipeed/picoclaw/pull/3315) 扩展了 Telegram 频道对 forum topic 的判断逻辑，使私聊 bot 会话也能识别 `IsTopicMessage`。这是一个此前未覆盖的场景，功能方向明确，如果合入将补齐 Telegram 渠道在私聊场景下的主题能力。
- **外部管理系统网关**：Issue [#3276](https://github.com/sipeed/picoclaw/issues/3276)（Launcher 支持 systemd 外部托管 gateway）已关闭。当前方案未能进入实现，但从 headless 部署角度看仍有真实需求，后续可能会以其他形式回归。
- **exec 工具参数默认化**：[#3268](https://github.com/sipeed/picoclaw/issues/3268) 已关闭，但对应的代码改动（`action` 默认值设为 `"run"`）未见独立 PR，预测已在其他提交中直接修改，或维护者已排入下个版本。

下一版本最可能合入的新能力：routed-agent 上下文管理修复（#3316）、Telegram 私聊主题（#3315）、自定义命令白名单修复（#3314）。

## 7. 用户反馈摘要

- **长会话性能是主要抱怨点**：[#3281](https://github.com/sipeed/picoclaw/issues/3281) 中用户明确反馈「历史稍长，输入框就开始卡顿」，说明 Web 前端在消息列表渲染和状态管理上存在性能瓶颈，与前端框架选型或虚拟滚动策略相关。
- **外部依赖故障影响可控性**：[#3269](https://github.com/sipeed/picoclaw/issues/3269) 用户表示 MCP server 连接失败后「PicoClaw chat interface stops replying」，失去了故障降级能力。这对生产环境使用是硬伤，用户期待至少能超时退出或跳过不可用工具。
- **配置解析存在意外行为**：[#3265](https://github.com/sipeed/picoclaw/issues/3265) 用户在没有配置 deltachat 的情况下仍遇到启动报错，说明 gateway 可能隐式加载了带未知类型字段的默认配置。此类体验会增加部署时的排障成本。
- **路由分发带来的行为不一致**：[#3301](https://github.com/sipeed/picoclaw/issues/3301) 用户发现会话经由 dispatch rules 后被路由至非默认 agent，导致 `/clear`、自动压缩失效。用户核心诉求是「行为应与会话绑定，而不是与 agent 绑定」。
- **社区参与意愿强**：@j-v 在 24 小时内提交 4 个 PR（#3316、#3314、#3313、#3310），展示了社区深度用户愿意自修 Bug 并回馈上游的积极生态。但 #3313 关闭后 #3314 仍在等待审查，维护者需要及时响应以免挫伤贡献者积极性。

## 8. 待处理积压

以下为需要维护者重点关注、长期未解决或等待响应的事项：

- [Issue #3269](https://github.com/sipeed/picoclaw/issues/3269)（MCP 故障挂起）— 创建于 07-20，已 stale，至今无修复 PR，对依赖 MCP 工具链的用户影响持续存在。
- [Issue #3281](https://github.com/sipeed/picoclaw/issues/3281)（Web UI 输入延迟）— 创建于 07-21，评论最多、社区关注度最高，需从性能优化层面立项解决。
- [PR #3316](https://github.com/sipeed/picoclaw/pull/3316)（routed-agent 上下文管理修复）— 尚未获得 maintainer review，是当前最重要、影响面最明确的待合并补丁。
- [PR #3315](https://github.com/sipeed/picoclaw/pull/3315)（Telegram 私聊主题支持）— 新功能贡献，等待 reviewed。
- [PR #3314](https://github.com/sipeed/picoclaw/pull/3314)（customAllowPatterns 修复）— 与已关闭的 #3313 为同组修复，需明确合入路径，避免贡献者困惑。

整体评估：项目社区活跃度健康，Issue 到 PR 的转化效率正在提升；但维护者对 open PR 的 review 速度与 stale 标记的跟进节奏，是当前影响项目良性循环的关键变量。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-04

## 1. 今日速览

过去 24 小时 NanoClaw 保持中高活跃度：1 条新 Issue、9 条 PR 更新（6 条关闭/合并、3 条待合并），无新版本发布。合并内容集中在 Agent 镜像安全加固（hardened-2026-08-02）、审批卡片上下文保留、iMessage 显式接入与参与度策略自治。新增一个环境兼容性 Bug（`node:util` 的 `styleText` 导出在低版本 Node 下不可用），目前尚无修复 PR。另有两条社区提交的会话连续性修复（[#3184](https://github.com/nanocoai/nanoclaw/pull/3184) / [#3183](https://github.com/nanocoai/nanoclaw/pull/3183)）等待合并。整体判断：项目处于“修复与加固”周期，维护者响应速度良好，功能探索以远程 MCP 支持（[#3092](https://github.com/nanocoai/nanoclaw/pull/3092)）为主线。

## 2. 项目进展

今日 6 条 PR 关闭/合并，主要推进方向如下：

- **安全基线加固（2 条）**
  - [#3182](https://github.com/nanocoai/nanoclaw/pull/3182) 将 Agent 镜像重新固定至 `hardened-2026-08-02`（sha `af60e54f…`，621 MB，2026-08-02 构建）。新旧构建的 NanoClaw 内容 digest 完全一致（`dce9da56…`），属于纯基础镜像加固、无上层行为变更。
  - [#3180](https://github.com/nanocoai/nanoclaw/pull/3180) 在 `update` 流程中显式提示用户完成加固镜像迁移，避免用户升级后仍运行旧镜像而遗漏安全更新。

- **会话与审批体验修复（2 条）**
  - [#3143](https://github.com/nanocoai/nanoclaw/pull/3143) 合并后，已处理的审批卡片保留标题、请求详情、决策人与超时状态，按钮替换后不再丢失上下文，终端卡片在刷新后也可存活。
  - [#3181](https://github.com/nanocoai/nanoclaw/pull/3181) 修复 iMessage 频道需通过「向指定线路发送第一条消息」完成显式 opt-in 的接入流程。

- **参与度策略与 Agent 自治能力（1 条）**
  - [#3137](https://github.com/nanocoai/nanoclaw/pull/3137) 合并后：累积消息可保留为上下文但不会触发 warm-container 额外轮次；group-scoped Agent 可自查 wiring 并请求已批准的参与度策略更新；非法 JavaScript 参与度正则将被拒绝。

- **其他**
  - [#3178](https://github.com/nanocoai/nanoclaw/pull/3178) 因误开仓库由作者自行关闭，无上游变更。

整体来看，项目在安全加固、长会话稳定性与 Agent 自治能力三个方向各前进一步，合并 PR 质量较高，均为针对性修复。

## 3. 社区热点

今日讨论热度不高（唯一 Issue 评论 1 条），但两个信号值得关注：

- **[#3179 SyntaxError: node:util 缺少 styleText 导出](https://github.com/nanocoai/nanoclaw/issues/3179)**：唯一新增 Issue，1 条评论。问题直指 `@clack/core@1.2.0` 依赖 `node:util` 的 `styleText`（Node.js ≥ v20.12 / v21.7 才可用）。从路径 `/home/jovyan/` 看，用户运行于受管的 Jupyter/远程环境，Node 版本偏旧，属于真实环境门槛问题。
- **[#3092 支持远程 Streamable HTTP MCP 服务器](https://github.com/nanocoai/nanoclaw/pull/3092)**：7/19 创建、8/3 仍有更新，带 `core-team` 标签，是社区持续关注的功能型 PR，已实质成为路线图议题。

## 4. Bug 与稳定性

| 严重度 | 编号 | 问题描述 | 修复状态 |
|---|---|---|---|
| 高 | [#3179](https://github.com/nanocoai/nanoclaw/issues/3179) | CLI 启动即崩溃：`@clack/core@1.2.0` 从 `node:util` 导入 `styleText` 失败，Node 版本过低 | 无 fix PR；需引导升级 Node ≥ 20.12 或调整依赖 |
| 中 | [#3184](https://github.com/nanocoai/nanoclaw/pull/3184) | 续聊时若已存 transcript 文件缺失，消息直接报 `No conversation found with session ID: <uuid>`，会话永久不可用 | 已有 fix PR 待合并：缺失时自动 rotate 到新会话 |
| 中 | [#3183](https://github.com/nanocoai/nanoclaw/pull/3183) | 超过 30 天未活跃的频道被 retention 清理「误杀」，用户再次发言收到原始错误且会话无法恢复 | 已有 fix PR 待合并：固定 `cleanupPeriodDays`，防止冷会话被回收清理 |

两个「会话找不到」类问题（#3184/#3183）指向同一类稳定性短板——内部状态异常时缺少自愈机制。建议优先合入这两条社区修复，并为 #3179 补充 Node 版本下限校验。

## 5. 功能请求与路线图信号

- **远程 MCP 支持（[#3092](https://github.com/nanocoai/nanoclaw/pull/3092)）**：支持 Streamable HTTP 协议的远程 MCP server。该 PR 已开放两周且持续更新、带 core-team 标签，是确定性较高的下一版本候选功能。
- **Agent 自服务方向（[#3137](https://github.com/nanocoai/nanoclaw/pull/3137)，今日合并）**：让 group-scoped Agent 能自查 wiring、请求参与度策略更新，释放 Agent 自治能力，后续可能延伸出更多管理面 API 与策略控制入口。

## 6. 用户反馈摘要

- **环境门槛挫败感（[#3179](https://github.com/nanocoai/nanoclaw/issues/3179)）**：用户在 `pnpm` 安装的 `@clack/core` 上直接遭遇启动崩溃，反馈当前版本对 Node 版本下限缺乏检测与友好提示，建议在 README 或 CLI 启动时显式校验。
- **错误信息不友好（[#3183](https://github.com/nanocoai/nanoclaw/pull/3183) / [#3184](https://github.com/nanocoai/nanoclaw/pull/3184) 背景）**：两条 PR 均指出同一类体验问题——内部状态异常（transcript 缺失、会话被清理）时，用户收到的只是原始 `No conversation found with session ID: <uuid>`，没有可操作提示或自动恢复。
- **贡献流程噪音（[#3178](https://github.com/nanocoai/nanoclaw/pull/3178)）**：有贡献者误向本仓库提交 PR 后自行关闭，反映贡献入口说明仍有轻微歧义，可考虑在 contributing 指南中强化「先确认目标仓库」的提示。

## 7. 待处理积压

- **[#3092 远程 Streamable HTTP MCP 支持](https://github.com/nanocoai/nanoclaw/pull/3092)**：7/19 创建，8/3 仍有更新，长期未合并亦未关闭。建议维护者明确评审结论或给出纳入版本的时间表，避免社区贡献长期悬置。
- **[#3179 Node.js `styleText` 兼容性 Bug](https://github.com/nanocoai/nanoclaw/issues/3179)**：尚无维护者响应，需尽快给出 Node 版本支持矩阵或依赖层面的修复方案。
- **[#3183 / #3184 会话连续性修复](https://github.com/nanocoai/nanoclaw/pull/3183)**：均为社区贡献、标注 `follows-guidelines`，等待维护者 review 与合并。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-04

## 1. 今日速览

过去 24 小时共发生 70 条 Issue/PR 更新，其中 Wave 3 架构重构（WS2/WS3/WS4）的多个大型 PR 与 bug_bash 暴露的 P1 问题修复并行推进。核心成员 @BenKurrek 一个人在一天内新开 7 个架构相关 Issue 并提交 3 个重构 PR。虽然尚无新版本发布，但渠道层（`wit/` 移动、sandbox lane 合并、MCP 契约翻转）的重构进入收尾阶段，同时 bug_bash 报告了 3 个 P1 问题（#7069 当天即被 #7077 修复）。总体看，项目处于**高活跃、中高风险**状态——重构力度大，但很多 Issue 标记为 "pre-existing"，说明 CI 与架构债的历史问题正在集中暴露和清理。

---

## 2. 版本发布

**无新版本发布。**

`release` 跟踪 PR #5598（7 月 3 日创建）仍处于打开状态，等待 `ironclaw_common` 0.5.0 与 `ironclaw_skills` 0.4.0 的破坏性变更合并。今日有文档 PR #7049（已关闭）确立了每周三的生产发布节奏，预计后续版本发布将走向常态化。

---

## 3. 项目进展

### 今日合并/关闭的重点 PR

| PR | 内容 | 影响 |
|---|---|---|
| [#7070](https://github.com/nearai/ironclaw/pull/7070) | 修复 WebUI v2 五个 E2E 测试（SSE keep_alive 游标、admin 重试、过期选择器） | 主分支 Code Coverage 自 #6876 起连续 5 天红盘，本次一次性修复全部五个测试。其中 SSE keep_alive 游标和 admin load-more 重试属于真实用户可见的生产 bug 修复 |
| [#7024](https://github.com/nearai/ironclaw/pull/7024) | 在注册阶段解析自定义 MCP 认证（RFC 9728/RFC 8414 元数据） | 修复了 MCP 认证时序问题——`Auto` 模式仅做无凭证握手，成功解析为 `NoAuth`，有 OAuth 元数据时才要求授权 |
| [#7040](https://github.com/nearai/ironclaw/pull/7040) | WS2 收尾：关闭三个 CHECKLIST 行，修正两处过期声明 | 重构进度文档的准确性修正。发现"WS2 行"中 `ironclaw_contracts` 与 `ironclaw_loop_host` 各有一处声明的状态与实际 `main` 不符，已以日期修订注记更正 |
| [#7064](https://github.com/nearai/ironclaw/pull/7064) | 拆解 loop 层：model gateway 与 tool disclosure 移入 `ironclaw_loop_host` | 纯移动 + 两个 `layer =` 行变更，不改变行为。为 WS4 的 loop 重分层铺路 |
| [#7049](https://github.com/nearai/ironclaw/pull/7049) | 新增每周三生产发布策略文档 | 明确了周一 RC cut、周二 QA、周三 promotion 的发布节奏。对项目版本交付的可预期性有直接改善 |

### 今日新开但尚未合并的重要 PR

- [#7094](https://github.com/nearai/ironclaw/pull/7094)：WS2 最终收尾——extensions 注册表重新分层、include_str! 清除、嵌套树覆盖率修复。**覆盖了 Issue #7083（覆盖率 bug）**
- [#7090](https://github.com/nearai/ironclaw/pull/7090)：`host_runtime/obligations.rs` 按三分契约拆分（obligation 处理/分阶段/构建器）
- [#7084](https://github.com/nearai/ironclaw/pull/7084)：`wit/` 目录移入所属 crate（Wave 3 渠道层移动），**已解决 #7087 的 planner 阻塞问题**
- [#7065](https://github.com/nearai/ironclaw/pull/7065)：sandbox lane 合并 + MCP 契约翻转——这是 Wave 3 的主结构发现，"sandbox 合并"与"MCP 依赖"实为同一问题

**综合判断**：Wave 3 重构行进度推进约 1/3 到 1/2（WS2 基本收尾，WS3 中 obligations 拆分、skill-install 移动、sandbox 合并三大行均在今天有实际落地），项目架构正在向 "loops/substrates/products" 的目标分层收敛。

---

## 4. 社区热点

### 今日讨论最活跃

| 条目 | 评论数 | 性质 | 分析 |
|---|---|---|---|
| [#7087](https://github.com/nearai/ironclaw/issues/7087) | 3 | CI 阻塞 bug | "Reborn PR test planner" 对 `.claude/`、`Dockerfile` 等路径的任意修改都会 hard-fail 整个 `Tests (Reborn)` workflow。该问题导致 #7084 的 46 个变更路径中有 18 个被 planner 误判。作者被迫在 PR 中放弃一行 `.claude/` 编辑作为 workaround。**社区关注点：CI planner 的路径判定策略过于脆弱** |
| [#7069](https://github.com/nearai/ironclaw/issues/7069) | 1 | bug_bash_P1 | 尽管评论数只有 1，但该 Issue 直接触发 #7077 修复 PR，且拆出了新的架构 Issue #7078（OAuth scope 上限是 store-wide 而非 per-caller）。**这是从 bug 到架构改进的完整案例** |

### 需求信号分析

热点集中在两条主线上：
1. **CI/planner 的可靠性**（#7087）——开发者的痛点是 CI 规划器对文件路径的误判造成无谓阻塞，且该问题"pre-existing、积压已久"
2. **OAuth 授权的用户体验**（#7069 + #7077 + #7078）——用户每次使用 Google 服务都要重新认证，根本原因是 vendor recipe union 的作用域是 store-wide，在架构层面限定了修复方案只能走"一次授权、共享 credential"路径，无法做到精细的 per-caller scope

---

## 5. Bug 与稳定性

按严重程度排列（P1 > P2 > 其他）：

### P1 级

| Issue | 描述 | 状态 |
|---|---|---|
| [#7074](https://github.com/nearai/ironclaw/issues/7074) | 多工具会议研究流在取回日历数据后失败——模型尝试调用一个不可用的函数（Google Calendar/Docs/新闻三工具协同场景） | 未修复，无关联 PR |
| [#7069](https://github.com/nearai/ironclaw/issues/7069) | Google 服务每个扩展要求单独授权，重复认证 | 由 [#7077](https://github.com/nearai/ironclaw/pull/7077) 修复，但 #7077 暴露了更深的架构问题（#7078） |

### P2 级

| Issue | 描述 | 状态 |
|---|---|---|
| [#7071](https://github.com/nearai/ironclaw/issues/7071) | 流式更新期间状态指示器反复闪烁 "Reconnecting" | 未修复 |
| [#7075](https://github.com/nearai/ironclaw/issues/7075) | 运行失败后 agent 忽略用户的跟进问题，继续执行旧任务 | 未修复 |
| [#7073](https://github.com/nearai/ironclaw/issues/7073) | Agent 在用户可见回复中泄露工具名与投递路由等内部细节 | 未修复 |

### 架构/工具链 bug（影响开发者效率）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7087](https://github.com/nearai/ironclaw/issues/7087) | Reborn test planner 对特定路径（`.claude/` 等）hard-fail | 已在 #7084 中绕过，根因未修 |
| [#7083](https://github.com/nearai/ironclaw/issues/7083) | `crates/extensions/` 下全部 5 个 crate 对覆盖率工具不可见（CRATE_RE 要求 crate 直接位于 `crates/` 下） | 在 #7094 中修复 |
| [#7085](https://github.com/nearai/ironclaw/issues/7085) | `check-version-bumps.sh` 在 macOS（BSD sed）上静默跳过 WIT_TOOL_VERSION 交叉检查 | 未修复 |
| [#7082](https://github.com/nearai/ironclaw/issues/7082) | `builtin.skill_install` 输入门拒绝多文件内联安装、静默丢弃 url 安装的 files/source/source_url | 未修复（CodeRabbit 在 #7080 上发现） |
| [#7081](https://github.com/nearai/ironclaw/issues/7081) | Docker fail-closed 测试门未接线（`IRONCLAW_REQUIRE_DOCKER_TESTS` 从未被 CI 设置） | 未修复 |

**健康度观察**：今日 PR 合并数（18）远高于 Issue 关闭数（2），且大量 bug 为 "pre-existing"（至少在 3 个 Issue 中显式标注）。说明项目正处于"重构为主、bug 修复为辅"的阶段，bug 积压/流转效率是需关注的指标。

---

## 6. 功能请求与路线图信号

| 信号 | 来源 | 与现有工作的关联 | 下一版本可能性 |
|---|---|---|---|
| **渠道优先引导（channel-first onboarding）** | Issue #7044（epic）——新用户首次进入 WebUI 是空白页，无引导案例 | 与 #6994（OOBE 自动化任务原型，UI-only，已 rebase 待合入）直接对应 | **高**——#6994 就是该 epic 的 UI 原型 |
| **技能自创建/自发现/自选择** | Issue #6941（epic）——拆分自 #6565，将 21 条验收标准中 4 条分配给他人工作 | 与 #7080（skill-install 执行器移动）同属 skills 赛道 | 中——需要先完成架构移动，再叠加能力 |
| **IronHub 包生命周期管理** | PR #6957——持久化已安装工具/技能的收据（版本、digest、catalog 来源），支持 `ironhub.status` 与 `ironhub.update` | 今日无直接冲突 PR | 中——XL 规模，已有一周未被 negative review，合入后是重要能力 |
| **一次认证覆盖账户下所有扩展** | PR #7077——正在合入的授权改进 | 由 P1 bug 驱动，但实际是扩展生命周期的基础设施改进 | **高**——修复 P1 的必经之路 |
| **每周三定期发布** | PR #7049（已合并） | 流程而非功能 | 确定纳入，非功能项 |

---

## 7. 用户反馈摘要

今日反馈全部来自 bug_bash 测试实例（Railway 部署，`ironclaw-qa-testing-libsql.up.railway.app`）：

**真实痛点（按重复度）**

1. **认证与授权割裂**（#7069）——"每个 Google 服务都单独要求授权，即使我已经完成过多次 Google 授权流程"。P1 影响直接阻碍多工具工作流落地
2. **多工具协同不稳定**（#7074）——"模型成功取回日历数据后，尝试调用不可用函数导致整个 run 失败"。说明工具注册表与实际可调用函数之间存在不一致
3. **UI/UX 干扰**（#7071）——"每块流式响应块都闪一次 Reconnecting，虽然流式本身是成功的"。状态指示器设计造成用户困惑
4. **上下文恢复错误**（#7075）——"run 失败后，用户发新问题，agent 却继续执行旧任务"。对话状态机在失败后的恢复逻辑有缺陷
5. **信息透明度失衡**（#7073）——"agent 把工具名和投递路由逻辑暴露给用户"。这是"太透明"的反向问题，说明提示工程在 user-facing 摘要层还需要打磨

**满意点**：暂无正面反馈条目。但可以侧面推断——#7049 的发布策略文档被接受，说明维护者团队对发布纪律的追求在增强。

---

## 8. 待处理积压

### 长期未合并的 PR

| PR | 创建时间 | 已等待 | 说明 |
|---|---|---|---|
| [#5598](https://github.com/nearai/ironclaw/pull/5598) `chore: release` | 2026-07-03 | **32 天** | release 自动化 PR，包含 `ironclaw_common` 0.5.0 和 `ironclaw_skills` 0.4.0 的破坏性变更。长时间未合入意味着这两个 crate 的破坏性变更始终未发布到上游 |
| [#6957](https://github.com/nearai/ironclaw/pull/6957) `feat(reborn-ironhub)` | 2026-07-31 | 4 天 | IronHub 包生命周期管理。XL 规模，尚无 review 记录，需维护者分配 reviewer |
| [#6994](https://github.com/nearai/ironclaw/pull/6994) `feat(webui): OOBE` | 2026-08-01 | 3 天 | OOBE 自动化任务原型（UI-only），与 #7044 epic 直接对应，待 UI review |

### 长期未处理的 Issue

| Issue | 创建时间 | 说明 |
|---|---|---|
| [#6941](https://github.com/nearai/ironclaw/issues/6941) skills epic | 2026-07-31 | 大型 epic（拆分自 #6565），当前只有 1 条评论，核心作者确认"太大无法单人完成"，但尚未见 owner 分配或任务拆解 |
| [#7087](https://github.com/nearai/ironclaw/issues/7087) CI planner 误判 | 2026-08-03 | 虽已绕过但根因未修。**这类"pre-existing + workaround"的 technical debt 在今日多个 Issue 中反复出现（#7085、#7081、#7082），建议维护者专项清理** |

### 维护者提醒

1. **#7078** 是由 P1 修复牵出的架构问题（OAuth scope ceiling 设计缺陷），但当前**无 assignee**，风险是被 P1 修复掩盖后遗忘
2. **#7095、#7093、#7092、#7091** 四个架构重构 Issue 全部由 @BenKurrek 在 8 月 4 日集中提出，说明 WS2/WS3 行已接近完成，接下来需要安排 reviewer 及时跟进其 PR（#7090、#7094），避免形成新的 PR 积压
3. `dependabot` 的批量依赖更新 PR（#7089）与已合并的 #7023 内容高度重合，建议合入 #7089 并注意 base64 0.22→0.23 的破坏性变更（虽然 PR 标记 risk: low）

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-04

## 今日速览

过去24小时内，LobsterAI 共产生 2 条 Issue 更新（均为存量 stale 状态）和 11 条 PR 更新，其中 6 条已合并/关闭、5 条仍待处理，PR 活跃度明显高于 Issue。合并的 PR 覆盖了 Windows 安装包进程终止修复、侧边栏多智能体任务过滤器、启动积分活动等方向，安全性、稳定性和功能迭代均有推进。值得注意的是，多个来自 4 月初的 PR 已进入 stale 状态，存在长期积压无人处理的健康度信号。项目整体处于有序迭代状态，但社区反馈的积压问题值得关注。

---

## 项目进展

过去24小时共 6 条 PR 被合并/关闭，其中包含功能新增、修复和依赖更新，项目在稳定性、用户增长策略和开发者体验方面均有推进：

- **[#2420] fix(nsis): re-kill survivor processes on every stop poll round**（已合并）— @fisherdaddy 修复了 Windows 安装包卸载/升级时，部分残留进程因内核回收超时或中途重生而存活的问题。修复方案改为在每一轮轮询中反复执行 Stop-Process，并在超时时输出进程名/PID/路径等详细信息，提升了 Windows 平台安装流程的可靠性。
  https://github.com/netease-youdao/LobsterAI/pull/2420

- **[#2418] feat(sidebar): add multi-agent task activity filter**（已合并）— @liuzhq1986 在侧边栏新增了类似 Codex 的多智能体任务活动过滤器，可快速筛选需要关注的任务。该功能在侧边栏折叠时自动隐藏按钮，有活动时显示蓝色指示器，推动了多智能体协同场景下的任务管理效率。
  https://github.com/netease-youdao/LobsterAI/pull/2418

- **[#2419] feat(activity): add startup credit campaign**（已合并）— @btc69m979y-dotcom 为桌面客户端新增了可配置的启动积分活动体验，包括启动弹窗、新会话页常驻入口、登录续接等功能，用于网易拉新活动，属于用户增长侧的功能落地。
  https://github.com/netease-youdao/LobsterAI/pull/2419

- **[#2421] / [#2422] / [#2423] Liuzhq/fix btw tools 及回退**（已合并/关闭）— @liuzhq1986 提交了 btw tools 的修复，随后又提交了回退（Revert）PR。从标签来看涉及 renderer、docs、main、openclaw、cowork、artifacts 等多个核心模块，说明该修复可能引入了副作用或需要调整方向，最终选择回退。这一系列操作提示相关工具链仍在调整中。
  https://github.com/netease-youdao/LobsterAI/pull/2423
  https://github.com/netease-youdao/LobsterAI/pull/2422
  https://github.com/netease-youdao/LobsterAI/pull/2421

---

## 社区热点

今日最受关注的讨论集中在一个旧 Issue 和一个旧 PR 上，两者均因长期无更新被标记为 stale，但最近一天内仍有动态更新，显示出社区仍有诉求：

- **[#1206] 【bug】私有化部署的 kimi2.5 模型分析文档会重复处理或回复进度**（1条评论，stale）— 这是今日讨论热度最高的问题。用户在 4 月报告了 kimi2.5 模型在分析文档时重复回复当前动作的 bug，且复现概率为「当前任务必现」，切换到其他模型后正常。该问题与特定模型强相关，已积压 4 个月。最近的评论可能来自用户追问或维护者回应，值得跟进。
  https://github.com/netease-youdao/LobsterAI/issues/1206

- **[#1213] 【功能建议】为会话详情添加「导出为 Markdown」功能**（1条评论，stale）— 该功能建议同样积压 4 个月，且已有对应的实现 PR（#1214）。社区的持续关注表明这是一个真实存在的用户痛点——图片导出不便于编辑和检索，文本格式才能满足用户引用和整理对话的需求。
  https://github.com/netease-youdao/LobsterAI/issues/1213

---

## Bug 与稳定性

今日活跃的 Bug 相关内容包括一个旧问题和一个稳定性修复 PR：

| 严重程度 | 问题 | 状态 | 说明 |
|---------|------|------|------|
| 中 | [#1206] kimi2.5 模型重复处理/回复进度 | 待修复（stale） | 私有化部署的 kimi2.5 在分析文档时，会重复回复当前动作，用户无法判断是 Bug 还是需要继续等待。复现概率为必现，切换模型后恢复正常。该问题已积压 4 个月，暂时没有对应 fix PR。 |
| 低 | [#2420] NSIS 安装器残留进程存活 | 已修复 | 修复了 Windows 安装/卸载过程中残留进程可能绕过关闭机制的问题，属于安装体验和系统洁净度的稳定性提升。 |

从整体来看，今日没有新增 Bug 报告，稳定性走势平稳，但 #1206 长期未修复仍是项目稳定性的一个隐患，且该问题影响私有化部署用户的体验。

---

## 功能请求与路线图信号

社区提出的功能需求和已有 PR 中有几个方向值得关注，可能在未来版本中落地：

1. **会话导出为 Markdown** — Issue #1213 提出导出 Markdown 的诉求，已有 PR #1214 实现了该功能（复用 buildDisplayItems 数据结构，支持工具调用摘要和自动截断）。虽然 PR 目前处于 stale，但需求本身明确，落地可能性较大。
   https://github.com/netease-youdao/LobsterAI/issues/1213
   https://github.com/netease-youdao/LobsterAI/pull/1214

2. **自定义模型提供商数量扩容** — PR #1212 将自定义模型提供商上限从 10 个提升到 20 个，解决了用户同时保留多套自定义配置的需求。该 PR 仍处于待合并状态，若合并将提升产品的可扩展性。
   https://github.com/netease-youdao/LobsterAI/pull/1212

3. **多智能体任务活动过滤**（已合并）— 合并的 #2418 表明项目正在借鉴 Codex 的任务管理模式，强化多智能体场景下的任务筛选能力，是协同工作流优化的一个信号。
   https://github.com/netease-youdao/LobsterAI/pull/2418

4. **重试机制** — PR #1208 为 Cowork 会话增加手动重试按钮，针对 429、网络故障等服务端瞬时错误提供一键重试能力，提升交互体验，目前仍在等待合并。
   https://github.com/netease-youdao/LobsterAI/pull/1208

---

## 用户反馈摘要

从今日更新的 Issues 中提炼出的真实用户反馈：

- **模型兼容性是私有化部署的关键痛点**（#1206）：用户使用 kimi2.5 模型时遇到重复回复的 bug，且必现。这反映出 LobsterAI 在第三方模型兼容性上仍有不足，当一个模型出现问题时会直接影响用户的工作流。用户原话「重复的情况不清楚是出现 bug 还是要继续等待执行」，体现出对交互反馈的不确定性感到困惑。

- **导出功能是明确的效率诉求**（#1213）：用户希望将完整对话（包括用户输入、AI 回复及工具调用信息）导出为 `.md` 文件保存到本地。原始需求中指出当前只能导出图片，「操作繁琐，且图片格式不便于后续编辑和检索」，这说明用户在真实工作流中存在整理、引用和分享对话记录的需求，尤其是需要进一步编辑的场景。

---

## 待处理积压

以下 Issue 和 PR 长期未得到有效处理，建议维护团队优先关注：

| 类型 | 编号 | 标题 | 积压时长 | 说明 |
|------|------|------|---------|------|
| Bug | #1206 | kimi2.5 模型重复处理/回复进度 | 约 4 个月 | 复现概率高，影响私有化部署的核心体验，至今无 fix PR |
| PR | #1208 | 新增手动重试按钮 | 约 4 个月 | 针对 429/网络故障的体验优化，仍处于 stale 状态 |
| PR | #1209 | 修复 web-search 不支持 Chrome flags 问题 | 约 4 个月 | 涉及外部注入的 `--disable-blink-features=AutomationControlled` flag 的兼容性处理 |
| PR | #1212 | 允许最多 20 个自定义提供商 | 约 4 个月 | 简单且明确的功能扩容，长期未合并 |
| PR | #1214 | 会话导出为 Markdown（对应 Issue #1213） | 约 4 个月 | 已有明确 Issue 诉求，PR 也已存在，但仍未合并 |
| 功能请求 | #1213 | 导出为 Markdown | 约 4 个月 | 用户呼声明确，有 PR 对应，建议尽快推进 |
| PR | #1277 | dependabot 依赖更新（electron 40 → 43） | 约 4 个月 | 依赖更新涉及 electron 和 electron-builder，长期未合并可能带来安全隐患 |

以上项目的共同特点是均创建于 4 月，且已进入 stale 状态。考虑到其中 #1206 是用户必现的 Bug、#1214 有明确的 Issue 支撑，建议维护者在后续迭代中优先处理这批积压内容，降低社区参与者的等待成本。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Moltis 项目动态日报 — 2026-08-04

> 数据来源：GitHub（github.com/moltis-org/moltis） | 统计周期：过去 24 小时

---

### 1. 今日速览

过去 24 小时 Moltis 项目整体活跃度较低但方向明确：**无新 Issue、无新版本发布**，仅出现 1 条 Pull Request 更新（待合并）。该 PR（#1183）为 MCP 子系统的功能性增强，提出托管仓库包的管理能力，内容具体且覆盖面广，是当前唯一的活跃开发线程。社区层面讨论与反馈量为零，说明项目处于功能开发期而非社区互动高峰。项目健康度总体平稳，但 PR 合并效率与社区参与度值得关注。

---

### 2. 版本发布

今日无新版本发布。

---

### 3. 项目进展

**唯一活跃 PR：**[#1183 feat(mcp): add managed repository bundles](https://github.com/moltis-org/moltis/pull/1183)

- **作者**：@penso
- **创建**：2026-08-02 | **最近更新**：2026-08-03
- **状态**：待合并

该 PR 是今日项目进展的核心信号，代表 MCP（Model Context Protocol）子系统的一次重要功能扩容。其摘要要点如下：

- 新增**托管 Git 仓库包**机制，覆盖 MCP 服务器的发现、预览、安装、更新、回滚和移除全生命周期管理。
- 支持 **HTTPS 凭据**与**固定的托管 SSH 传输**，强化安全性与远程仓库兼容性。
- 提供**保险库生命周期集成**（Vault lifecycle integration），与项目既有的密钥管理能力衔接。
- 支持**导入基于仓库的 MCP 配置**，并简化 Web 端引导流程（onboarding）。

**影响评估**：若该 PR 被合并，Moltis 将从“用户手动配置 MCP 服务器”跨入“通过仓库包进行集中化、版本化管理”的阶段，显著降低企业级部署中 MCP 生态的管理复杂度。但当前 PR 仍待 review，项目主线的净进展尚未落地，合并后的稳定性验证将是下一步关键。

---

### 4. 社区热点

今日无评论密集或高反响的 Issue/PR。由于 Issues 活跃数为 0，且 PR #1183 的评论数为 undefined（即无有效评论数据），社区互动热度极低。

唯一可关注的讨论焦点集中在 [PR #1183](https://github.com/moltis-org/moltis/pull/1183) 本身——该 PR 涉及凭据处理、SSH 传输固定等安全敏感点，通常会在 review 中引发技术质询。但截至当前，尚未形成公开的评论线程。建议维护者在 PR review 阶段引导讨论，披露设计决策细节，以弥补公开沟通的缺失。

---

### 5. Bug 与稳定性

今日未报告任何 Bug、崩溃或回归问题。结合近 24 小时 Issue 关闭量为 0，当前 master 分支未出现因 Issue 驱动的紧急修复需求。稳定性的潜在风险取决于 PR #1183 合并后的效果，尤其是新增的凭据存储与 SSH 传输路径对既有逻辑的兼容性，需在 code review 和测试中重点验证。

---

### 6. 功能请求与路线图信号

今日无新功能请求 Issue。但 [PR #1183](https://github.com/moltis-org/moltis/pull/1183) 本身构成了明确的路线图信号：

- **路线图方向**：MCP 服务器管理正向“仓库化/集中化”演进，目标用户是需要在多环境、多实例中统一管理 MCP 接入的团队。
- **潜在纳入下一版本的功能**：
  - 基于 Git 仓库的 MCP 配置分发与版本回滚（若 PR 合并）；
  - HTTPS/SSH 凭据的安全存储与注入机制；
  - Web 界面对 MCP 仓库包的引导式安装流程。

建议维护者将该 PR 视为 MCP 子系统的阶段性里程碑，合并后纳入 2026 年下半年路线图文档，并以此为基础收集用户反馈。

---

### 7. 用户反馈摘要

今日无真实用户反馈可提炼（Issues 评论为 0）。由于项目处于开源早期或功能冲刺阶段，公开反馈样本不足。若 PR #1183 进入社区试用阶段，建议重点关注以下潜在反馈点：

- 凭据管理方式的易用性与安全平衡；
- “托管仓库包”是否真的能简化用户安装 MCP 服务器的操作；
- Web 引导流程是否对非技术用户友好。

---

### 8. 待处理积压

- **[PR #1183](https://github.com/moltis-org/moltis/pull/1183)** （2026-08-02 创建，至今未合并）：当前唯一的待合并 PR，已存在 2 天。过去 24 小时有更新（说明作者仍在推动），但迟迟未进入合并阶段。建议维护者：
  - 尽快安排 reviewer 进行代码审查，避免 PR 长期挂起；
  - 明确合并后所需的测试范围（尤其安全相关路径）。

除此之外，无长期未响应的 Issue 或 PR，积压情况整体良好。

---

**项目健康度总结**：开发方向明确（MCP 管理增强）、无活跃 Bug 压力、积压量小；但社区互动为零、PR 合并节奏偏慢。综合评估为“平稳推进，需加速合并审查以维持动量”。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-04

> 数据统计周期：过去 24 小时 | 数据来源：GitHub Issues / PRs / Releases


## 1. 今日速览

项目昨日整体活跃度**高**：共产生 11 条 Issue 更新与 50 条 PR 更新，并发布了 v2.1.0-beta.1 新版本。在 PR 侧，约一半（24 条）已合并/关闭，其中 6 条重要修复已落地（Windows 探测、桌面脚本执行、CI 稳定性等）；但 Issue 侧仍有多条**高影响缺陷未修复**——微信定时推送静默失败、飞书会话被长命令阻塞 1.5 小时、桌面 UI 在 WebView2 崩溃后全黑，均无对应 fix PR，属于当前项目健康度的主要风险点。社区侧对 model fallback 功能呼声最高（已有两个独立 PR 实现），GPT-5.6 prompt caching 的 feature request 仍在等待路由决策。


## 2. 版本发布

**v2.1.0-beta.1**（2026-08-03 发布）

- 链接：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.1
- 主要更新：
  - `fix(chat)`: 防止旧会话的 channel 身份泄漏到新会话（PR #6382）
  - `feat(inbox)`: 新审批到达时侧边栏 inbox 图标抖动 + 徽标圆点颜色区分
- 破坏性变更：Beta 版本，暂无明确破坏性变更说明。
- 迁移注意事项：该版本由 release-duty bot（#6656）跟进安装验证，安装或升级失败可关注该 issue 的验证结果。


## 3. 项目进展

过去 24 小时共有 **24 条 PR 合并/关闭**，重要进展如下（含昨日合并项）：

**稳定性/基础设施修复（已合并）**
- [PR #6203](https://github.com/agentscope-ai/QwenPaw/pull/6203) — Windows 下 `tasklist` 进程探测增加超时与输出隐藏，防止命令执行器卡死
- [PR #6579](https://github.com/agentscope-ai/QwenPaw/pull/6579) — 桌面端脚本执行改用**内置 Python**，解决系统依赖问题（对应 Issue #6160）
- [PR #6653](https://github.com/agentscope-ai/QwenPaw/pull/6653) — CI "Real behavior proof" 门禁修复：不再剥离 fenced code block 形式的 Evidence（修复 #6626）
- [PR #6654](https://github.com/agentscope-ai/QwenPaw/pull/6654) — Playwright 版本锁定至 1.62 以下，修复 macOS 桌面验证超时
- [PR #6646](https://github.com/agentscope-ai/QwenPaw/pull/6646) — fork PR 的 real-behavior-proof 检查通过 API 获取 PR body，修复所有 fork PR 的 CI 失败（修复 #6563）

**功能/逻辑修复（已合并）**
- [PR #6609](https://github.com/agentscope-ai/QwenPaw/pull/6609) — 修复 `spawn_subagent` 参数 schema 生成错误（`Optional[...]` → `list | str | None`），单任务前台调用不再被误判为 batch 模式（修复 #6588 的 schema 部分）

**重要观察**：Issue #6588 出现了三个叠加 PR（#6609 已合并，#6595 与 #6658 仍在开放），说明该问题的修复路径尚未收敛，后续仍需关注是否重复。


## 4. 社区热点

今日讨论度最高的几个议题：

**① [#6649 GPT-5.6 prompt caching 参数支持（8 评论）](https://github.com/agentscope-ai/QwenPaw/issues/6649)**
Feature Request：要求 Responses API provider 支持 GPT-5.6 的 `prompt_cache_key` 等参数，以便多轮 Agent 对话复用缓存前缀。8 条评论在一天内产生，说明社区对**降低 LLM 调用成本**有强烈诉求。

**② [#6588 spawn_subagent 空 batch 占位符误判（6 评论）](https://github.com/agentscope-ai/QwenPaw/issues/6588)**
某些模型在单任务调用时返回空 `batch` 占位符，QwenPaw 将任何非 `None` 值都视为 batch 模式。涉及 3 个 PR 跟进，属于当前 Agent 工具链中的**实际可用性问题**。

**③ [#6160 QwenPaw 能否配备独立 Python 环境（4 评论，已关闭）](https://github.com/agentscope-ai/QwenPaw/issues/6160)**
Windows 用户因系统未预装 Python 而无法执行生成的脚本，社区要求内置 Python 或复用后端解释器。该问题**已在 v2.1.0-beta.1 中通过 PR #6579 修复**，诉求得到响应。

**④ [#6655 Console 通道不渲染审批提示（3 评论，已关闭）](https://github.com/agentscope-ai/QwenPaw/issues/6655)**
Console 通道下安全审批请求不渲染，用户无感知等待超时，命令被静默拒绝。反映**安全审批跨通道的一致性**仍需完善。


## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 修复 PR |
|---|---|---|---|
| 🔴 严重 | [#6608](https://github.com/agentscope-ai/QwenPaw/issues/6608) | 超长 shell 命令绕过 `shell_command_timeout`，阻塞飞书会话 1.5 小时；取消后留下孤儿子进程 | ⚠️ 无 |
| 🔴 严重 | [#6614](https://github.com/agentscope-ai/QwenPaw/issues/6614) | 微信 cron 定时推送静默失败（`ret=-2 context_token` 失效），任务显示 success 但从未送达，已消耗约 4400 万 token | ⚠️ 无 |
| 🟠 中等 | [#6647](https://github.com/agentscope-ai/QwenPaw/issues/6647) | Windows 桌面端 WebView2 进程崩溃（STATUS_IN_PAGE_ERROR 0xc0000006）后 UI 全黑，无恢复路径 | ⚠️ 无 |
| 🟠 中等 | [#6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) | `spawn_subagent` 空 batch 占位符被当作 batch 模式 | ✅ [#6609](https://github.com/agentscope-ai/QwenPaw/pull/6609) 已合并；[#6595](https://github.com/agentscope-ai/QwenPaw/pull/6595)、[#6658](https://github.com/agentscope-ai/QwenPaw/pull/6658) 待跟进 |
| 🟡 一般 | [#6625](https://github.com/agentscope-ai/QwenPaw/issues/6625) | ACP `delegate_external_agent` 在 notification 与 response 同段到达时报 "completed without text output" | ✅ [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) 已提交 |
| ⚪ 已解决 | [#6626](https://github.com/agentscope-ai/QwenPaw/issues/6626) | CI "Real behavior proof" 剥离纯 fenced Evidence 代码块 | ✅ [#6653](https://github.com/agentscope-ai/QwenPaw/pull/6653) 已合并 |

**风险评估**：前三项严重/中等问题均无修复 PR，其中微信推送（#6614）与飞书阻塞（#6608）直接造成**用户资金/信任损失**，建议维护者优先安排。


## 6. 功能请求与路线图信号

| 需求 | 来源 | 当前状态 | 信号强度 |
|---|---|---|---|
| **Model fallback 自动故障转移** | PR [#2199](https://github.com/agentscope-ai/QwenPaw/pull/2199)（3 月创建） + 新 PR [#6659](https://github.com/agentscope-ai/QwenPaw/pull/6659) | 两个 PR 同时开放，后者为全新实现，含 cooldown 机制 | 🔥 强（社区一直等） |
| **GPT-5.6 prompt caching** | [#6649](https://github.com/agentscope-ai/QwenPaw/issues/6649) | 新 issue，暂无 PR | 📈 中-强（8 评论/24h） |
| **文件管理 REST API** | PR [#6651](https://github.com/agentscope-ai/QwenPaw/pull/6651) | 已提交，补齐 `/files` 路由 6 个缺失操作（删除/重命名/移动/创建目录/上传下载/目录列表） | ✅ 实现中 |
| **拖拽文件直接读原路径** | [#6642](https://github.com/agentscope-ai/QwenPaw/issues/6642) | 新 issue，要求去掉上传-下载往返，直接读取原路径文件 | 📈 中（桌面体验优化） |
| **Skill API 轻量化** | PR [#6650](https://github.com/agentscope-ai/QwenPaw/pull/6650) | 列表接口不再返回 content/config/scripts | ✅ 实现中 |
| **Sandbox 约束透明化** | PR [#6657](https://github.com/agentscope-ai/QwenPaw/pull/6657) | 后端不支持的 sandbox 配置需显式警告，避免静默失效 | ✅ 实现中 |

**综合判断**：model fallback 已变成"双 PR 并行"状态，建议维护者尽快审核取舍，避免社区贡献浪费；GPT-5.6 prompt caching 因自带降本效益，大概率会进入下一迭代。


## 7. 用户反馈摘要

- **桌面端 Python 环境（#6160）**：Windows 用户使用 Conda 管理多环境，系统级 Python 缺失导致脚本无法运行。用户偏好"内置 Python 或复用后端自带解释器"——**该反馈已在本次 beta 中回应**（PR #6579）。
- **安全审批可见性（#6655）**：Console 通道下审批请求不渲染，用户对被拦截命令"静默超时"感到困惑。社区期望**所有通道都有一致的审批交互**。
- **微信推送信任危机（#6614）**：cron 任务持续报 success 但从未送达，排查过程消耗约 4400 万 token。该案例反映**静默失败的危害大于显式报错**，用户希望有更可靠的成功确认机制。
- **拖拽文件的"上传-复制"行为（#6642）**：用户认为先上传再读取"很奇怪"，且会在 media 目录产生多余文件。诉求是跟随主流桌面 Agent 工具的"直接读原路径"模式。
- **ACP 竞态问题（#6625）**：外部 agent 明明产出了文本，却因 notification 与 response 同段到达而被报告为无输出，影响集成方对结果的信任。


## 8. 待处理积压

| 类型 | 编号/链接 | 创建时间 | 状态 | 备注 |
|---|---|---|---|---|
| PR | [#2199 Model fallback](https://github.com/agentscope-ai/QwenPaw/pull/2199) | 2026-03-24 | Open，无 review | 已积压 4 个月+；新 PR #6659 同主题，建议两者协调 |
| PR | [#5930 SSE 结构化 run outcome](https://github.com/agentscope-ai/QwenPaw/pull/5930) | 2026-07-10 | Open | API 自动化场景需要显式对话结束标记，等待合并；已近一个月 |
| Issue | [#6647 WebView2 崩溃全黑屏](https://github.com/agentscope-ai/QwenPaw/issues/6647) | 2026-08-03 | Open，无 PR | 桌面端严重体验问题，暂无恢复路径 |
| Issue | [#6614 微信推送静默失败](https://github.com/agentscope-ai/QwenPaw/issues/6614) | 2026-07-31 | Open，无 PR | 44M token 损失的高成本 bug，需优先排期 |
| PR | [#6302 Provider 发现统一化大重构](https://github.com/agentscope-ai/QwenPaw/pull/6302) | 2026-07-21 | Open | 大改动，涉及 provider 发现/路由/Console 管理，需谨慎 review |

---

**一句话总结**：v2.1.0-beta.1 正常发布，CI 与桌面脚本执行等基建问题得到修复，但三个高影响 bug（微信推送、飞书阻塞、WebView2 黑屏）仍悬而未决；社区对 model fallback 与降本类功能（GPT-5.6 caching）期待明确，建议维护者尽快收敛对应的双 PR 状态并回应积压老 PR。

</details>