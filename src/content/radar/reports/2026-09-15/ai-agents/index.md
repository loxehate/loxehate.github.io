---
title: "OpenClaw 生态日报"
published: 2026-09-15
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-15

> Issues: 87 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-15 00:00 UTC

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

# OpenClaw 项目动态日报 — 2026-09-15

## 1. 今日速览

过去 24 小时项目活跃度处于高位：87 条 Issue 更新（63 条新开/活跃、24 条已关闭），500 条 PR 更新（283 条待合并、217 条已合并/关闭），但当日无新版本发布。高度活跃的同时也暴露了可靠性隐忧：P0 级更新失败报告在 9.14 集中出现（global-install-failed、runtime-verification-failed 等至少 5 例），且 PR 待合并积压达 283 条，合并队列存在一定拥堵。值得注意的是，多个高价值重构 PR 正在围绕 worker 线程迁移和子代理生命周期统一推进，项目正朝着架构优化方向持续投入。

---

## 2. 版本发布

**无新版本发布。** 当前版本线索停留在 2026.9.3/2026.9.4，且这两个版本正面临一批更新可靠性相关的 P0 回归报告（详见第 5 节），建议维护者优先评估是否需要在近期发布补丁版本。

---

## 3. 项目进展

今日共有 **217 条 PR 合并/关闭**，虽未展开全部明细，但从已关闭 Issue 和 PR 来看，以下方向有实质性推进：

**🔧 已合入的修复（通过关闭 Issue 确认）：**

- **[#140309] fix(gateway): Tailscale serve fails at boot before the daemon connects** — 修复了 logon 触发场景下 Tailscale daemon 未就绪导致 Gateway 启动即退出的问题，解决了 #139097。这是 Windows 用户在重启后反复遇到的痛点故障。
  https://github.com/openclaw/openclaw/pull/140309

- **[#141122] Gateway heap leak: AsyncLocalStorage 泄漏已关闭** — 每个 agent run 创建且永不 `.disable()` 的 AsyncLocalStorage 导致 Node 内部 `storageList` 无限增长，内存泄漏问题已通过修复合入解决。
  https://github.com/openclaw/openclaw/issues/141122

- **[#138954] GPT-6 Astra tool-calling 在 Zero Data Retention 组织上失败** 已关闭 — 上游兼容性问题得到处理。
  https://github.com/openclaw/openclaw/issues/138954

- **[#138531] 模型 fallback 未触发** 的 upstream issue 已关闭。
  https://github.com/openclaw/openclaw/issues/138531

**🛠️ 架构重构（多个 Stacked PR 串行推进）：**

- **#148213 refactor(mcp): share scoped worker reads and batch requester status** — MCP OAuth 检查与 provider 准备相关的 worker 读取共享，属于 SQLite worker 迁移的一部分。
  https://github.com/openclaw/openclaw/pull/148213

- **#148560 refactor(skills): move library resource metadata reads off the Gateway thread** — 将技能库元数据读取从 Gateway 主线程移出，避免阻塞事件循环。Stacked on #148213。
  https://github.com/openclaw/openclaw/pull/148560

- **#148623 refactor(projects): move registry removal to the state worker** — 项目删除的事务匹配查询和 DELETE 操作移入共享状态 worker。
  https://github.com/openclaw/openclaw/pull/148623

- **#142954 refactor(android): share the Gateway client with Wear OS** — 共享 Android 手机与 Wear OS 的 Gateway 连接层，消除重复实现。

**📋 其他值得关注的合入/提交：**

- **#148625 fix(doctor): stopped private inputs replay after session repair** — 修复 Doctor 修复会话后，已停止的私有子结果被重新执行的问题。
  https://github.com/openclaw/openclaw/pull/148625

- **#148619 fix(gateway): preserve private continuation timeout receipts** — 修复私有父级续作超时被记录为通用失败的问题（closes #148613）。
  https://github.com/openclaw/openclaw/pull/148619

- **#148606 fix(memory): drain agent state before watcher fixture cleanup** — 测试稳定性修复，已合并。
  https://github.com/openclaw/openclaw/pull/148606

整体来看，项目正在大规模推进 **worker 线程迁移**（MCP、skills、projects、backup 等多个模块），目标是将阻塞性 SQLite 操作从 Gateway 主线程移出；同时在 **子代理生命周期** 方向上也有一系列修复和重构在联动推进。

---

## 4. 社区热点

**🔥 [#97616] OpenClaw 泄漏未回收的 hook/tool 子进程，导致僵尸进程累积和运行时降级** （30 条评论，P1）

长达近 3 个月的 issue 今日仍在活跃讨论。用户报告 `openclaw-hooks`、`bash`、`codex` 等子进程在 main 进程下累积为僵尸进程，导致 runtime 性能持续下降。这是当前社区讨论度最高的问题，反映出用户在长时间运行场景下对进程生命周期管理的强烈诉求。
https://github.com/openclaw/openclaw/issues/97616

**🔥 [#144911] MCP server 初始化超时导致整个 Gateway 崩溃** （16 条评论，P1）

一个 stdio MCP server 无法在 30s 内完成 `initialize`，触发的子进程清理路径抛出了未处理的 promise rejection（`service child cleanup identity lost`），将整个 Gateway 进程拖垮。讨论热度高说明 MCP 生态接入的稳定性对用户影响面较大。
https://github.com/openclaw/openclaw/issues/144911

**🔥 [#145252] [Tracking] 2026.9.3 / 2026.9.4 更新、升级与恢复可靠性** （9 条评论，P0）

维护者创建的协调索引，聚合跟踪 update/upgrade/Doctor/migration/rollback/restart 的可靠性问题。与当日多份 P0 更新失败报告直接相关，显示 9.3/9.4 版本的更新链路存在系统性风险。
https://github.com/openclaw/openclaw/issues/145252

**🔥 [#144809] claude-cli 长 turn 丢失全部生成回复**（7 条评论，P1）

运行数分钟后模型已产出结果，但回复因 `RUN_STALE_TAKEOVER_MS` 机制被整体丢弃——"no active tool authority snapshot"。用户报告在 Ubuntu 24.04 / macOS 上均可复现，且包含一次 42 秒的 turn 同样失败，意味着正常速度的对话也可能受影响。
https://github.com/openclaw/openclaw/issues/144809

**分析：** 社区热度集中在 **进程生命周期管理**、**MCP 生态稳定性**、**更新链路可靠性** 和 **长时间运行任务的状态丢失** 四个主题。前两者反映架构层面的系统性问题，后两者直接影响用户的日常使用信心，尤其是 9.3/9.4 的更新可靠性正在成为社区信任度的关键风险点。

---

## 5. Bug 与稳定性

### P0（UX release blocker）

| Issue | 描述 | 状态 |
|-------|------|------|
| [#145252] | 2026.9.3/9.4 更新可靠性 Tracking（update/upgrade/recovery） | 维护者跟踪中 |
| [#146783] | 更新失败: unexpected-error (2026.9.3, darwin/arm64) | needs-info |
| [#148614] | 更新失败: runtime-verification-failed (2026.9.3) | 待处理 |
| [#148436] | 更新失败: managed-service-preflight (2026.9.3, win32/x64) | needs-info |
| [#148395] | 更新失败: global-install-failed (2026.9.4, Node 26.8.1) | needs-info |
| [#148449] | 更新失败: global-install-failed (2026.9.3→2026.9.4) | 待处理 |
| [#134430] | macOS app 启用 Cookie sync 后崩溃循环（MainActor isolation trap） | fix-shape-clear / queueable-fix，修复形状已明确 |
| [#139468] | Windows + Norton 360: 任务计划启动的 Gateway 被杀软拦截（IDP.HELU.PSE90），2026.9.1/9.2 回归 | 需安全审查 |
| [#147370] | Provider-level baseUrl 在 Gateway 路由上被忽略，preferDiscoveredTransport 反转了 baseUrl 优先级 | 需补充信息 |
| [#148601] | Windows 上 doctor --fix / gateway status 损坏：`windowsHide:true` 导致 PowerShell 5.1 exit 2 | 需 live repro，尚无修复 PR |

### P1（高影响）

| Issue | 描述 | 是否有 fix PR |
|-------|------|--------------|
| [#97616] | Hook/tool 子进程泄漏为僵尸进程累积，runtime 降级（30 评论热点） | ❌ 无 PR，待修复 |
| [#144911] | MCP server 初始化超时触发 unhandled rejection，拖垮整个 Gateway | ✅ fix-shape-clear / queueable-fix |
| [#144809] | claude-cli 长 turn 回复整体丢失（RUN_STALE_TAKEOVER_MS 竞争） | ❌ needs-info |
| [#148584] | Plugin 自带的 CLI backend 在 Gateway 启动时被跳过（api 为核心内置时） | ✅ fix-shape-clear / queueable-fix |
| [#104992] | Transcript redaction (`***`) 在会话恢复时回放进模型上下文，模型复用已遮蔽值——安全/数据泄漏风险 | ❌ 需产品决策 + 安全审查 |
| [#145184] | 632-agent 大规模 fleet 上 Gateway 事件循环阻塞 70-82s（启动时）+ 13-17s/5min（prewarm） | ❌ 无 PR |
| [#109659] | 频道自动重启在 abort signal 竞争 backoff sleep 时被静默吞掉，导致永久卡死且无日志 | ✅ linked-pr-open |
| [#112832] | Extension-driver 浏览器中继在 Gateway 重启后不自动启动 | ✅ linked-pr-open |
| [#137281] | `[[tts:...]]` 自由文本回复被剥离为空，最终显示 "No reply was generated" | ✅ fix-shape-clear / queueable-fix |
| [#148412] | claude-cli 凭据解析在相同配置下 per-agent 结果不一致（回退到过期环境变量） | ❌ 需维护者审查 |
| [#148557] | OAuth auth profile 在共享 auth store 为 state-db 时无法解析为可用路由 | ❌ 无 PR |
| [#148559] | gpt-5.4-nano 未匹配任何 OpenAI 路由集，拒绝所有凭据 | ❌ 无 PR |

### 关键稳定性观察

- **更新链路是当前最大风险面**：仅 9.14 一天就新增了 5 份 P0 更新失败报告（#146783/#148614/#148436/#148395/#148449），覆盖 darwin/arm64 和 win32/x64 两个平台，涉及 unexpected-error、runtime-verification、global-install-failed 等多种失败阶段。这与 #145252 tracking issue 直接对应，是 2026.9.4 发布质量的重大隐患。
- **transcript 相关的安全问题值得警惕**：#104992 中 redaction 遮蔽的内容在会话恢复后被模型重新使用，可能导致 token 等敏感信息被间接输出；#85687 中 heartbeat transcript 修复也可能污染后续上下文。
- **好消息**：多个 P1 问题已有清晰的 fix 形状（fix-shape-clear / queueable-fix），包括 #144911、#148584、#137281 等，预计会在近期 PR 中批量落地。

---

## 6. 功能请求与路线图信号

**🧭 子代理生命周期统一与回归测试（强烈信号，可能纳入下个版本）：**

- **#148294 [P1 enhancement] Unify subagent resume and completion ownership across entry points** — 由 @jalehman 提出，要求统一跨入口的子代理暂停/恢复/完成所有权。
  https://github.com/openclaw/openclaw/issues/148294

- **#148298 [enhancement] Add end-to-end regression coverage for subagent continuation and visible completion** — 同一作者配套的测试覆盖需求。
  https://github.com/openclaw/openclaw/issues/148298

  结合当日合入的 #148619（continuation timeout receipts）、#148625（stopped private inputs replay）和 #148600（context-engine quarantine），可以看出 **子代理生命周期** 是当前主动治理的重点方向，下一版本大概率会包含系统性改进。

**⚙️ 其他功能请求：**

- **#7406 [P2] Human-readable Telegram topic names in session dropdown** — 7 个月前提出，希望 session 下拉框显示 `Telegram : GroupName : TopicName` 而非原始 key。尚未有 PR，但 UI 改进类需求通常优先级较低。
  https://github.com/openclaw/openclaw/issues/7406

- **#140646 [P2] Gateway hook to register a ledger row when any sub-agent primitive starts** — 希望原生 Task/Agent CLI 子代理也进入 job ledger，避免无法审计的问题。
  https://github.com/openclaw/openclaw/issues/140646

- **#146841 [CLOSED] Feature Request: Add privacy controls** — 提出数据保留期、会话管理、导出等隐私控制，今日已关闭，具体原因未在数据中说明（可能已转内部或重复）。
  https://github.com/openclaw/openclaw/issues/146841

**📊 趋势判断：** 子代理/多代理协作的可观测性和生命周期管理是当前路线图上最明显的增量方向；MCP 生态的稳定性修复（#144911 等）预计紧随其后；隐私控制类需求有讨论度但落地优先级较低。

---

## 7. 用户反馈摘要

**😤 痛点：长任务状态丢失**

> "A turn runs normally for minutes, the model produces output, and then the reply is discarded." — [#144809]

claude-cli 用户在长时间运行后回复被静默丢弃，生产环境中信任成本极高。

**😤 痛点：僵尸进程累积拖垮性能**

> "Over time these accumulate as zombies under the main openclaw process... runtime degradation." — [#97616]

用户使用了约 3 个月，进程泄漏持续恶化，说明该问题在长时间运行场景下不可避免。

**😨 痛点：健康检查失明**

> "Permanently stuck with no restart, no log line, and no error — while /health and the Docker healthcheck both stay green. In production this cost us two multi-hour outages on a Zalo personal channel: ~34h total." — [#109659]

这是非常严重的可观测性缺口：系统看似健康，实际 channel 已死。用户为此付出了约 34 小时的中断代价。

**😤 痛点：大规模部署时 Gateway 阻塞**

> "Two main-thread blocks on a large-fleet Gateway... 70-82 s after ready hydrating every agent's sessions, and 13-17 s every ~5 min in the session-list prewarm, on a 632-agent fleet." — [#145184]

企业级用户在大规模 agent 部署时遭受严重的事件循环阻塞，影响面大。

**😕 痛点：本地模型被安全策略误伤**

> "When using local/Ollama models (like qwen3.6:27b-mlx) as the primary model, web_search and web_fetch tools fail with 'Tool not found'. The small-model security block at runtime prevents these models from accessing search capabilities." — [#145137]

用户被迫从本地模型切换到付费 API，与开源项目的本地优先理念相悖。

**😤 痛点：Buzz 房间线程串行化**

> "All threads in one Buzz room share a single execution session, so concurrent conversations with the same bot serialize behind each other. A long turn in one thread blocks every other thread." — [#144331]

多线程场景下对话被一个长 turn 阻塞，且 Buzz 不显示排队状态，用户无法区分等待与故障。（已有 #148514 PR 尝试关闭此 issue）

**✅ 整体满意度信号：** 用户对 OpenClaw 的功能深度和扩展性认可度较高，愿意大规模部署（632-agent）并在生产环境依赖（Zalo channel 等）。但可靠性和可观测性问题是当前用户满意度的最大减分项。

---

## 8. 待处理积压

**⏳ 长期未关闭的 Issue（社区持续关注中）：**

- **[#7406] Telegram 话题名人类可读显示** — 2026-02-02 创建，已超过 7 个月，仅 4 条评论，长期低优先级。
  https://github.com/openclaw/openclaw/issues/7406

- **[#90499] Discord DM 读取被 allowlist 错误拒绝** — 2026-06-05 创建，3 个月未解决，影响 owner/operator 的基本使用场景。
  https://github.com/openclaw/openclaw/issues/90499

- **[#85687] Heartbeat transcript 修复产物污染后续上下文** — 2026-05-23 创建，近 4 个月，标记 no-stale。
  https://github.com/openclaw/openclaw/issues/85687

- **[#104992] Transcript redaction 回放导致敏感值复用** — 2026-07-12 创建，P1 安全相关问题，等待产品决策 + 安全审查，已搁置 2 个月。
  https://github.com/openclaw/openclaw/issues/104992

**⚠️ 已有 PR 但尚未合并的关键修复（请维护者优先 review）：**

- **[#109659] 频道自动重启静默丢失**（P1，linked-pr-open）— 用户在等待，修复 PR 已存在。
  https://github.com/openclaw/openclaw/issues/109659

- **[#112832] 浏览器中继不自动启动**（P1，linked-pr-open）— 配对扩展在每次 Gateway 重启后需要手动触发，PR 已存在。
  https://github.com/openclaw/openclaw/issues/112832

**🚨 需要特别注意的 PR：**

- **[#148622] chore(macos): original activity proof carrier - MUST NOT MERGE** — 这是一个 **不得合并** 的测试载体 PR，仅为建立原始行为观测覆盖，请维护者与 #130388 的后续生产清理 PR 区分对待。
  https://github.com/openclaw/openclaw/pull/148622

**📌 维护者关注建议：**

1. 优先聚合处理 **2026.9.3/9.4 更新失败** 的 5 份 P0 报告（#146783/#148614/#148436/#148395/#148449），在 #145252 跟踪下推动统一修复。
2. **PR 待合并积压达 283 条**，明显高于正常水位，建议检查 CI 或 review 流程是否存在瓶颈。
3. #97616 声明了 **Beta release blocker = No**，但作为社区讨论度最高（30 评论）且直接影响长跑稳定性的 P1 问题，建议考虑将其纳入近期迭代承诺。

---

*本日报基于 OpenClaw GitHub 仓库 2026-09-15 公开数据自动生成，所有链接指向原始 Issue/PR。*
*数据范围：过去 24 小时更新（2026-09-14 至 2026-09-15）。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期：2026-09-15** ｜ **数据范围：过去 24 小时 GitHub 公开动态**

---

## 1. 生态全景

当前个人 AI 助手开源生态正处于**"规模扩张与可靠性承压"并存的阶段**。以 OpenClaw 为首的核心项目日 PR 更新量达 500 条，是第二梯队项目的 10 倍，但同样集中暴露了更新链路 P0 失败、PR 合并积压、僵尸进程等系统性问题。与此同时，NanoClaw、CoPaw、Zeroclaw 等围绕"Claw 系"命名的衍生项目与独立项目 NanoBot、LobsterAI 等，不约而同地将 MCP 生态稳定性、子代理生命周期统一、安全默认值加固作为当前迭代主线。生态整体呈现**从"功能堆叠"转向"生产化治理"**的明确信号——多智能体编排、后台任务确定性交付、进程/内存生命周期管理成为跨项目共识性痛点。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新（新/活跃/关闭） | PR 更新（待合并/合并关闭） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 87（63 新/活跃，24 关） | 500（283 待，217 合） | 无 | ⚠️ 高活跃、架构重构期，但 9.14 单日 5 份 P0 更新失败报告 + 283 条 PR 积压，质量风险突出 |
| **NanoClaw** | 4（2 新，2 关） | 50（12 待，38 合，合并率 76%） | 无 | ✅ 高活跃且健康，大规模积压清理完成，Setup 安全与通道稳定性双线推进 |
| **CoPaw** | 18（14 活跃，4 关） | 50（39 待，11 合） | 无 | ⚠️ 高频迭代，但定时任务输出丢失、subAgent 100% 超时、内存 OOM 三座大山压制用户体验 |
| **Zeroclaw** | 4（1 新，3 关） | 50（38 待，12 合） | 无 | ✅ 活跃，安全加固主线清晰，但 38 条待合并 PR 显示 review 资源偏紧 |
| **NanoBot** | 2 | 26（15 待，11 合） | 无 | ✅ 整体健康，cron 与 provider 故障转移修复扎实，社区反馈转化快 |
| **LobsterAI** | 1 | 24（14 待，10 合） | 无 | 🟡 稳健但动力偏弱，10 条合入中 8 条为 Dependabot 自动更新，人工核心变更仅 2 条 |
| **IronClaw** | 1 新 | 1 待 | 无 | 🟡 低活跃维护态，靠每日失败分类报告维持质量透明度 |
| **PicoClaw** | 1 | 1 合 + 1 stale | 无 | 🟡 中低活跃，QQ 通道 401 故障与 Keenable PR 均面临 stale 自动关闭风险 |
| **Moltis** | 0 | 0 | 1（20260913.02） | 🟢 静默期，无社区互动，仅维持发布节奏 |

> **健康度分级**：✅ 健康（迭代+修复良性循环） ｜ 🟡 关注（活跃度或可靠性存在短板） ｜ ⚠️ 警惕（高活跃伴随高风险） ｜ 🟢 静默

---

## 3. OpenClaw 在生态中的定位

**无可争议的生态核心与基础设施底座。** 三个维度可证：

- **规模代差**：24 小时 500 条 PR 更新 / 87 条 Issue 更新，是第二梯队（NanoClaw、CoPaw、Zeroclaw 均为 50 条 PR）的 **10 倍**；Issue 量约为 CoPaw 的 5 倍、Zeroclaw 的 22 倍。283 条待合并 PR 反衬出其贡献者基数远超同类。
- **平台属性**：LobsterAI 在今日将内嵌运行时从 OpenClaw v2026.6.1 升级至 v2026.8.1（PR #2665），直接证明 OpenClaw 已被其他项目作为**可嵌入的运行时依赖**——这是生态中唯一具备"平台底座"定位的项目。NanoClaw、Zeroclaw、PicoClaw 的命名及 worker 线程迁移、Gateway 架构等概念均与其技术路线同源。
- **技术路线差异**：OpenClaw 走 **Node.js Gateway + SQLite + worker 线程迁移**路径，当前核心投入是将 MCP/skills/projects 等模块的阻塞性操作移出主线程，并统一子代理生命周期。相比 NanoClaw 的"聊天即建 agent"、CoPaw 的"Console + ReMe 记忆体系"、Zeroclaw 的"多渠道安全网关"，OpenClaw 更底层、更通用，但这也意味着它的每次架构调整（如 2026.9.3/9.4 更新链路）会波及其生态追随者。

**核心风险**：更新可靠性 P0 报告（9.14 单日 5 份）与 632-agent 大规模部署性能问题（#145184）提示，OpenClaw 正处于"社区规模跑赢工程质量"的临界点，其 P0 修复节奏将直接影响整个生态对"Claw 系"技术的信任度。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 / 证据 |
|---|---|---|
| **MCP 生态稳定性与错误诊断** | OpenClaw、CoPaw、IronClaw、NanoBot | OpenClaw #144911（MCP init 超时拖垮整个 Gateway）；CoPaw #7729（Java jsonRpcError 信封识别）、#7716（HTTP 错误二次解压）；IronClaw #8077（响应泄漏诊断分类）；NanoBot #5674（NIM 超时误判为模型输出）。**共识：MCP 已从"能否接入"进入"故障隔离与错误分类"阶段。** |
| **子代理 / 多智能体生命周期编排** | OpenClaw、CoPaw、NanoClaw、Zeroclaw | OpenClaw #148294/#148298（统一 resume/completion + 回归测试）；CoPaw #7678（subAgent 100% timeout）；NanoClaw #3813（持久交接台账 + 指纹化契约）；Zeroclaw PR #10621（agent 生命周期协调，size:XL）。**共识：多 agent 协作需从 demo 走向可审计、可恢复的生产形态。** |
| **后台 / 定时任务结果确定性交付** | OpenClaw、NanoBot、CoPaw、LobsterAI | NanoBot #5686/#5751（cron 调度可靠性三连修）；CoPaw #7709（定时任务输出被折叠在 thinking 中）；LobsterAI #1035（消息被去重缓存静默丢弃）；OpenClaw 更新链路 P0 中亦含 Doctor/migration 恢复问题。**共识："无感知失败"是用户第一大信任杀手。** |
| **进程 / 内存 / 连接生命周期治理** | OpenClaw、CoPaw、NanoClaw | OpenClaw #97616（hook/tool 子进程僵尸化）；CoPaw #7722（三路径内存泄漏直至 OOM）；NanoClaw #3811（SQLite 锁竞争无 busy_timeout）。**共识：长时运行场景下资源生命周期管理决定框架上限。** |
| **安全默认值加固** | Zeroclaw、CoPaw、NanoClaw | Zeroclaw（配对码 6 位数字→32 字符、出站 HTTP 全走代理、沙箱镜像可配置）；CoPaw #7726（trusted 模式静默降级无告警）；NanoClaw #3484（密钥不进 argv）。**共识：安全不能依赖用户配置，必须由框架默认承载。** |
| **更新 / 升级链路可靠性** | OpenClaw、LobsterAI | OpenClaw 5 份 P0 失败报告覆盖 darwin/arm64 与 win32/x64 的 unexpected-error、global-install-failed 等阶段；LobsterAI 为 OpenClaw 运行时升级同步适配 POPO 插件（#2664）。**共识：运行时升级是生态级事件，需配套兼容性测试。** |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|---|---|---|---|
| **OpenClaw** | 通用 AI 助手框架 / Gateway 运行时 | 开发者、重度个人用户 | Node.js Gateway + SQLite；worker 线程迁移中；跨平台桌面优先 |
| **NanoClaw** | 聊天驱动的 agent 创建 + 团队 IM 集成 | 团队协作、Slack/Telegram/WhatsApp 企业用户 | 模板化 agent（#3396/#3428）；Setup 安全加固；结构化 host 健康检查 |
| **CoPaw** | 全功能助手 + 记忆体系 + 数据分析 | 中文用户、进阶个人用户 | Qwen 系模型适配；ReMe 记忆；QwenPaw-Data 分析引擎；Console UI 厚重 |
| **Zeroclaw** | 多渠道网关 + 安全加固 | 生产环境多渠道部署者 | 渠道层统一重构（transcription/代理/配对码）；安全默认值密集落地 |
| **NanoBot** | 轻量 bot + cron 自动化 + provider 聚合 | 自动化场景、个人开发者 | Python 实现；FallbackProvider 故障转移；内部模型流式调用（#5730） |
| **LobsterAI** | 桌面 IM 内嵌 AI 助手 | 企业内部用户、网易生态 | Electron 43.5 + 内嵌 OpenClaw v2026.8.1；POPO IM 绑定；IM 可靠性是短板 |
| **IronClaw** | 模型质量评测基础设施 | AI 研究员、模型开发者 | Daily failure taxonomy；OfficeQA benchmark 持续跟踪模型退化 |
| **PicoClaw** | 边缘设备 / ARM 平台 agent | 嵌入式 / 极客 | 轻量化 nightly 构建；QQ 通道依赖兼容性是当前主要风险 |
| **Moltis** | 低活跃，定位不明 | 数据不足 | 维持版本发布节奏，社区协作近乎停滞 |

**一句话概括**：OpenClaw 做"地基"，Zeroclaw/NanoClaw 做"管道与工位"，CoPaw/NanoBot/LobsterAI 做"面向具体用户的整机"，IronClaw/PicoClaw/Moltis 分别占住评测、边缘与静默角落。

---

## 6. 社区热度与成熟度

| 分层 | 项目 | 特征 |
|---|---|---|
| **快速迭代期（日 PR ≥ 50）** | OpenClaw、NanoClaw、CoPaw、Zeroclaw | 功能与重构并行，PR 量大。NanoClaw 以 76% 合并率处于健康清理态；OpenClaw 与 CoPaw 则是"高活跃 + 高可靠性风险"并存，需警惕技术债累积 |
| **稳定建设期（日 PR 20-50）** | NanoBot、LobsterAI | NanoBot 是综合健康度最高的项目，cron/provider 修复直击痛点，Issue 响应闭环好；LobsterAI 以 Dependabot 依赖维护为主，人工核心开发信号偏弱 |
| **维护观望期（日 PR ≤ 2）** | PicoClaw、IronClaw、Moltis | IronClaw 以自动化质量监控维持存在感（每日失败分类），属于"有基建无热度"；PicoClaw 与 Moltis 面临 stale 自动关闭与社区静默风险 |

**成熟度判断**：OpenClaw 用户已将其用于 632-agent 生产级部署，生态成熟度最高但工程质量正被规模反噬；NanoBot、Zeroclaw 处于"小而稳"的良性状态；CoPaw 功能迭代速度领先但可靠性拖后腿，正处于从"个人项目"到"生产工具"的爬坡期。

---

## 7. 值得关注的趋势信号

1. **"静默失败"是当前用户第一痛点。** 六个项目的最热 Issue 中有五个属于"无感知故障"——OpenClaw 长 turn 回复被丢弃、CoPaw 定时任务结果折叠、LobsterAI 消息被去重缓存吞掉、NanoBot 搜索挂起阻塞会话、Zeroclaw Telegram 无限重试卡死通道。**可观测性（真实反映状态的健康检查、错误分类、结构化日志）正在从附加功能变成框架核心竞争力。** 对开发者的启示：在 agent 产品中，一个明确的错误提示比"看起来正常"更有价值。

2. **MCP 进入"生产化深水区"。** 四个项目同时在修 MCP 的错误分类、超时隔离、协议信封识别、响应保真。**接入已不是问题，故障模式治理才是。** 建议 MCP 生态贡献者优先补齐超时规范、错误码标准与诊断面，而非继续堆工具数量。

3. **安全默认值运动全面铺开。** 从 Zeroclaw 的强配对码、CoPaw 的 trusted 降级告警，到 NanoClaw 的密钥不进 argv——**"默认安全、无需用户配置"** 正在成为 agent 框架的准入门槛。这与 agent 权限边界（工具访问、工作区写入）的争议（OpenClaw #145137 本地模型被误伤）共同指向一个核心问题：**安全策略需要感知模型/工具上下文，而非一刀切。**

4. **大规模部署正在定义新需求。** OpenClaw 632-agent 事件循环阻塞 70-82 秒、Zeroclaw 生产通道事故、CoPaw 容器 OOM，这些讨论已完全脱离"我的笔记本能否运行"，转向**"生产环境能否 7×24 稳定"**。性能与可靠性问题开始以"fleet 规模"为前提被重新定义。

5. **子代理编排是明确的下一站。** OpenClaw、CoPaw、NanoClaw、Zeroclaw 四个项目同时在子代理生命周期、持久交接、失败恢复上投入。**"多 agent 协作的可审计性"**（谁在何时调用了谁、失败如何恢复、结果如何确定性交付）正在从论文概念变为工程需求，提前布局该方向的项目将在下一阶段获得差异化优势。

6. **本地模型优先理念与安全策略存在张力。** OpenClaw 用户被迫从本地 Ollama 模型切换回付费 API，因为工具级安全策略阻止了本地模型的 web_search/web_fetch。**开源 agent 项目若不能在安全策略中妥善对待本地模型，将流失最核心的"本地优先"用户群。**

---

*本报告基于 2026-09-15 各项目公开社区数据自动生成，数据源全部指向各仓库原始 Issue/PR。*
*报告中的健康度评级为主观研判，仅代表当前快照状态，不构成对该项目长期趋势的预测。*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-15

## 1. 今日速览

过去 24 小时内 NanoBot 项目保持高度活跃：PR 更新 26 条，其中 11 条已合并/关闭，15 条待合并，显示核心维护与社区贡献双线并行。Issues 侧相对平稳（2 条更新），但其中的 DuckDuckGo 搜索挂起问题（#2804）已关闭，说明此前报告的严重阻塞问题已获解决。新增 PR 集中在 cron 调度、API 参数校验、FallbackProvider 故障转移等稳定性领域，整体项目健康度良好，迭代节奏紧凑。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日共 11 条 PR 合并/关闭，主要覆盖 cron 可靠性、内部模型调用超时、WebUI 体验与文档更新。

**cron 调度可靠性（3 条）**
- [#5686 fix(cron): defer timer rearming while jobs execute](https://github.com/HKUDS/nanobot/pull/5686) — 修复 cron 回调执行期间 `_arm_timer()` 取消自身计时器任务，导致任务收到 `CancelledError` 而丢失结果的问题。这是 cron 系统的重要稳健性修复。
- [#5751 fix(cron): preserve pending runs when editing automation details](https://github.com/HKUDS/nanobot/pull/5751) — 修复编辑自动化名称/指令时，即使调度未变化也错误重算下次执行时间的问题，避免一次性任务永远无法触发。
- [#5760 fix(webui): adapt chat toolbar to available width](https://github.com/HKUDS/nanobot/pull/5760) — 响应式调整聊天工具栏布局，宽屏使用侧边紧凑工具条，窄屏自动切换，改善多面板场景下的 WebUI 体验。

**内部模型调用与内存（2 条）**
- [#5730 fix: stream internal model calls with idle timeouts](https://github.com/HKUDS/nanobot/pull/5730) — Dream 等内部任务改用流式请求，避免长耗时模型调用反复触发 120 秒 HTTP 超时并耗尽 runner 300 秒总限额。
- [#5734 fix(memory): clarify Dream prompt write permissions](https://github.com/HKUDS/nanobot/pull/5734) — 在 identity 提示中明确只有 Dream 任务可编辑 profile 与长期记忆文件，修复 `/dream` 期间 Codex 拒绝更新记忆的问题。

**WebUI 与文档（2 条）**
- [#5743 fix(webui): simplify settings catalog controls and headings](https://github.com/HKUDS/nanobot/pull/5743) — 简化 Automations 设置界面，Calendar 设为默认视图，统一通过共享 composer 创建自动化任务。
- [#5684 docs: refresh README with current WebUI feature gallery](https://github.com/HKUDS/nanobot/pull/5684) — 更新 README，加入新版 WebUI 截图导览与当前功能展示。

整体来看，项目今日在 cron 调度正确性、长耗时模型调用稳定性、WebUI 易用性三个维度均有实质推进，修复了数个可能导致静默失败或数据丢失的缺陷。

## 4. 社区热点

今日讨论最活跃的是已关闭的 Issue [#2804 web_search via DuckDuckGo hangs indefinitely, blocking all messages on session](https://github.com/HKUDS/nanobot/issues/2804)（4 条评论）。该问题描述了当 DuckDuckGo 作为搜索 provider 时，`asyncio.to_thread(ddgs.text, ...)` 可能无限期挂起，阻塞整个会话的消息处理管道。用户 @hoaresky 在 4 月报告，历经 5 个月后于 9 月 14 日关闭，期间社区持续关注。这一问题的核心诉求是对外部依赖（搜索引擎 API）的超时保护与故障隔离，确保单个工具调用失败不会拖垮整个 agent 会话。

另一热点是 [#5674 agent stops working when provider Nvidia NIM returns a specific error](https://github.com/HKUDS/nanobot/issues/5674)，尽管评论数较少（1 条），但其描述的"NIM 超时错误被误认为模型输出导致 agent 永久停止"问题直接对应今日的高优先级 PR [#5769 fix(providers): fail over on NIM-style timeout errors](https://github.com/HKUDS/nanobot/pull/5769)，显示社区反馈正在快速转化为修复。

## 5. Bug 与稳定性

按严重程度排序：

**严重 — 阻碍 Agent 核心功能**

- **NIM 超时导致 agent 停止工作**（[#5674](https://github.com/HKUDS/nanobot/issues/5674)，开放中）— 当 Nvidia NIM 返回 `timed out after 300s/600s` 错误时，NanoBot 将其误认为模型输出，导致 agent 永久停止。**已有修复 PR**：[#5769](https://github.com/HKUDS/nanobot/pull/5769) 通过异常消息文本识别超时错误，并允许 FallbackProvider 在超时/连接类错误时切换模型。

- **DuckDuckGo 搜索无限挂起**（[#2804](https://github.com/HKUDS/nanobot/issues/2804)，已关闭）— 搜索调用可无限期阻塞，且阻塞整个会话管道，影响所有后续消息。该 Issue 已关闭，但关闭原因（是否因修复 PR 合并）未在本次数据中明确。

**中等 — 数据完整性 / 行为错误**

- [#5761 edit_file 删除行尾换行符](https://github.com/HKUDS/nanobot/pull/5761)（待合并）— 行内后缀清理逻辑错误删除换行符，导致相邻行意外拼接。修复同时统一了编辑成功的摘要输出。**本 PR 即修复**。

- [#5762 cron 接受过去的一次性调度](https://github.com/HKUDS/nanobot/pull/5762)（待合并）— `at` 值在过去时任务永远不会触发，但仍报告创建成功，对用户产生误导。**本 PR 即修复**。

- [#5766 cron 接受冲突的调度字段](https://github.com/HKUDS/nanobot/pull/5766)（待合并）— 当 `every_seconds`、`cron_expr`、`at` 同时提供时，静默丢弃其他字段。**本 PR 即修复**。

**较轻 — API 行为不符合规范**

- [#5765 stream 参数接受非布尔真值](https://github.com/HKUDS/nanobot/pull/5765)（待合并）— `"stream": "false"` 字符串被当作 truthy，意外进入 SSE 模式。**本 PR 即修复**。

- [#5763 多模态字段类型错误返回 500](https://github.com/HKUDS/nanobot/pull/5763)（待合并）— 畸形多模态 JSON 字段类型应返回 400 客户端错误，而非服务器错误。**本 PR 即修复**。

**并发 / 竞态条件**

- [#5764 FallbackProvider 半开探测并发穿透](https://github.com/HKUDS/nanobot/pull/5764)（待合并）— 冷却期结束后多个并发请求同时进入恢复中的主 provider，破坏半开状态的单探测语义。**本 PR 即修复**。

## 6. 功能请求与路线图信号

- **新 Provider 接入（aimlapi.com）** — [#5666 feat(providers): add aimlapi.com as an OpenAI-compatible gateway provider](https://github.com/HKUDS/nanobot/pull/5666) 由 aimlapi 官方团队提交，提供 1000+ 模型聚合网关。已开放 10 天仍待合并，建议维护者确认合作条款与代码质量后推进合并，这将进一步丰富 NanoBot 的 provider 生态。

- **Telegram 自定义 Bot API** — [#4919 feat(telegram): support custom Bot API base URL and extra headers](https://github.com/HKUDS/nanobot/pull/4919) 实现自托管 Bot API server / 企业网关支持，自 7 月 14 日提交至今已两个月未合并。此功能对企业用户和网络受限环境有明确价值，需确认是否因 review 积压或技术原因搁置。

- **WebUI 波兰语本地化** — [#5767 feat(webui): add Polish localization](https://github.com/HKUDS/nanobot/pull/5767) 完整翻译 1,536 条 UI 消息与 497 条配置面板消息，语言选择可应用到加载屏幕与文档描述。国际化推进的信号明确。

- **工具调用上下文暴露** — [#5750 feat(tools): expose stable per-invocation tool context](https://github.com/HKUDS/nanobot/pull/5750) 通过 ContextVar 向工具实现暴露 `tool_call_id`，修复 #5749。这属于开发者体验改进，为更复杂的工具链路追踪和生命周期管理铺路。

## 7. 用户反馈摘要

- **搜索挂起的"雪崩效应"**（来自 [#2804](https://github.com/HKUDS/nanobot/issues/2804)）：用户反馈最痛的点不仅是搜索本身变慢，而是"一个工具挂起导致整个会话所有后续消息被阻塞"，网关失去响应。这反映了 agent 框架中工具调用隔离性的重要性——单一外部依赖故障不应拖垮整体服务。

- **NIM 超时错误的误判**（来自 [#5674](https://github.com/HKUDS/nanobot/issues/5674)）：用户使用 Nvidia NIM 时，provider 返回超时错误后，NanoBot 将错误信息当作模型输出，agent 就此"静默死亡"。用户对错误分类不清晰、缺乏自动恢复机制感到困扰，期望超时类错误应触发重试或切换 provider 而非终止。

## 8. 待处理积压

- **[#4919 feat(telegram): support custom Bot API base URL](https://github.com/HKUDS/nanobot/pull/4919)** — 开放已 2 个月（7 月 14 日创建），实现完整但迟迟未合并。可能存在 review 资源不足或对配置项设计仍有分歧，建议维护者明确状态。

- **[#5601 fix(webui): roll back rejected message side effects](https://github.com/HKUDS/nanobot/pull/5601)** — 开放已 17 天，修复 WebUI 消息被拒绝时遗留附件和 WebSocket 订阅的问题。涉及 side-effect 清理，逻辑较敏感，可能需要更仔细的 review。

- **[#5666 feat(providers): add aimlapi.com](https://github.com/HKUDS/nanobot/pull/5666)** — 开放已 11 天，aimlapi 官方渠道提交。若项目有意拓展 provider 生态，建议给予明确回应或加速 review。

- **[#5674 NIM 超时导致 agent 停止工作](https://github.com/HKUDS/nanobot/issues/5674)** — 开放 10 天，虽然有对应 PR #5769，但 Issue 尚未关闭。建议在 PR 合并后及时关闭并感谢用户报告，形成正向反馈闭环。

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报 — 2026-09-15

## 1. 今日速览

过去 24 小时项目活跃度较高：共 4 条 Issue 更新（1 条新开、3 条关闭），50 条 PR 更新（12 条合并/关闭、38 条待合并），无新版本发布。关闭的 PR 集中在安全加固（统一配对码策略、代理路由、Docker 沙箱镜像可配置）、渠道层重构（transcription manager 统一）以及配置默认值优化。值得关注的是新开的 S1 级 Issue #10863（Telegram 语音更新无限重试阻塞消息流），需要维护者优先响应。整体来看，项目正处于密集的合并与重构周期，安全与渠道稳定性是当前主线。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日共有 12 条 PR 合并/关闭，以下为重点变更：

**安全加固**
- [PR #10307 [CLOSED] fix(gateway): one shared pairing-code policy, stronger default](https://github.com/zeroclaw-labs/zeroclaw/pull/10307)：统一所有通道的配对码生成策略，修复此前 `pairing.rs` 硬编码 6 位数字、配置项实际不生效的问题。这是对 Issue #6613 的最终落地。
- [PR #10748 [CLOSED] fix(channels): route every outbound HTTP client through the runtime proxy](https://github.com/zeroclaw-labs/zeroclaw/pull/10748)：普查并修复 Slack/Telegram/Matrix/Email/Linq/Notion/clawdtalk/WeChat 等所有渠道的出站 HTTP 客户端未经过运行时代理的问题，确保部署代理策略全覆盖。
- [PR #10745 [CLOSED] feat(security): make the docker sandbox image configurable](https://github.com/zeroclaw-labs/zeroclaw/pull/10745)：`[security.sandbox].image` 此前在文档中出现但代码中不存在对应配置，现已实现可配置化。

**渠道层重构**
- [PR #10747 [CLOSED] refactor(channels): build every channel's transcription manager one way](https://github.com/zeroclaw-labs/zeroclaw/pull/10747)：将 8 个原生渠道中各自复制的 `with_transcription` 实现统一为单一构建路径，修复此前因代码漂移产生的 4 个重复 bug（#9153、#10032、#10487、#10494）。

**配置与默认值**
- [PR #10589 [CLOSED] feat(config): default multimodal.max_image_size_mb to the 20 MiB ceiling](https://github.com/zeroclaw-labs/zeroclaw/pull/10589)：默认值从 5 MiB 提升至 20 MiB 上限，避免 5–20 MiB 的普通手机照片被错误丢弃。对应 Issue #10588。

**RPC 与 CI**
- [PR #9930 [CLOSED] feat(rpc): add sops/run-detail returning a run's full step results](https://github.com/zeroclaw-labs/zeroclaw/pull/9930)：为 SOP 运行提供完整的步骤级结果查询接口。
- [PR #10727 [CLOSED] ci(release): compose the X and Discord announcements from the release notes](https://github.com/zeroclaw-labs/zeroclaw/pull/10727)：修复发布公告按字母序截断 `feat:` 提交信息的问题，改为从 release notes 生成有意义的通告。

**整体评估**：项目在安全策略统一、渠道代码去重、配置默认值合理性上均有实质推进，尤其是配对码策略与代理路由的修复直接降低了生产环境的安全风险。

---

## 4. 社区热点

- [Issue #10863 [OPEN] [Bug]: Telegram retries rejected voice updates indefinitely, blocking later messages](https://github.com/zeroclaw-labs/zeroclaw/issues/10863) ⭐ **今日最热**
  - 创建于 2026-09-14，S1（workflow blocked）严重度，1 条评论。RO-mix 在 PR #10640 评论区报告了生产事故：被持续拒绝的语音更新导致 Telegram 长轮询卡死，后续消息无法投递。该问题直接阻塞用户工作流，且涉及 Telegram 渠道核心机制，预计会有修复 PR 快速跟进。

- [Issue #6613 [CLOSED] [Feature]: Allow setting, and default to, a much stronger pairing code than 6 numeric digits](https://github.com/zeroclaw-labs/zeroclaw/issues/6613)
  - 3 条评论，今日随 PR #10307 合并而关闭。该 Issue 自 5 月提出，历经 4 个月最终落地，社区对安全默认值的诉求强烈。

- [PR #10621 [OPEN] feat(runtime): coordinate agent lifecycle mutations](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)（size:XL）
  - 虽未标注评论数，但作为 XL 规模、横跨 daemon/gateway/渠道/CLI 的运行时生命周期协调改造，涉及面广，值得关注其后续 reviewer 讨论。

---

## 5. Bug 与稳定性

**S1 - 阻塞**
- [Issue #10863 [OPEN] Telegram retries rejected voice updates indefinitely, blocking later messages](https://github.com/zeroclaw-labs/zeroclaw/issues/10863)
  - 影响：Telegram 长轮询被卡死，后续消息全部阻塞，已有生产事故报告。引用自 PR #10640 的 comment。
  - 状态：**无 fix PR**，需紧急排查。

**S3 - 轻微**
- [Issue #10794 [CLOSED] Advisory Windows nextest fails publish_contract::published_crates_never_include_files_outside_their_own_directory](https://github.com/zeroclaw-labs/zeroclaw/issues/10794)
  - 非必需的 Windows CI 任务持续失败，测试对某个 crate 的豁免规则需要更新。今日已关闭。

**通过 PR 修复的 Bug**
- 代理路由缺失（#10748）——影响所有未走运行时代理的渠道出站请求，已修复。
- 配对码配置失效（#10307 修复 #6613）——6 位数字配对码搜索空间过小，已修复。
- max_image_size_mb 默认值过小（#10589 修复 #10588）——5–20 MiB 图片被误删，已修复。
- transcription manager 代码漂移（#10747）——4 个重复的序列化 bug，已重构修复。

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 状态 |
|------|------|------|
| 更强的配对码（任意长度、字母+数字、默认 32 字符） | [#6613](https://github.com/zeroclaw-labs/zeroclaw/issues/6613) | ✅ 已实现（PR #10307） |
| `max_image_size_mb` 默认提升至 20 并文档化上限 | [#10588](https://github.com/zeroclaw-labs/zeroclaw/issues/10588) | ✅ 已实现（PR #10589） |
| 生成 llms.txt / llms-full.txt 供 LLM 消费文档 | [PR #10840](https://github.com/zeroclaw-labs/zeroclaw/pull/10840) | 🟡 待合并 |
| 在 channel context 中注入当前星期 | [PR #10856](https://github.com/zeroclaw-labs/zeroclaw/pull/10856) | 🟡 待合并 |
| 完整浏览器自动化改为 opt-in | [PR #9830](https://github.com/zeroclaw-labs/zeroclaw/pull/9830) | 🟡 待合并（open 39 天） |
| Discord 按角色授权 | [PR #9971](https://github.com/zeroclaw-labs/zeroclaw/pull/9971) | 🟡 待合并（open 33 天） |

**路线图信号**：近期合并的 PR 表明维护者正在集中处理“安全默认值”类需求——将弱默认（6 位数字配对码、5 MiB 图片限制、代理绕过）逐一修正为安全且合理的默认。渠道层的一致化重构（transcription、代理、配对码）暗示下一版本可能包含一次渠道子系统的整合。

---

## 7. 用户反馈摘要

- **生产事故反馈**：RO-mix 在 [#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863) 报告 Telegram 语音更新无限重试导致消息通道完全阻塞，“workflow blocked”的严重度评估，说明该问题已直接影响真实用户的核心工作流。
- **配对码强度**：用户 @sken130 在 [#6613](https://github.com/zeroclaw-labs/zeroclaw/issues/6613) 中明确表示“6 位数字太弱”，要求支持任意长度、大小写字母+数字的配对码。该反馈最终落地为默认 32 字符的强配对码策略。
- **图片处理体验**：@JordanTheJet 在 [#10588](https://github.com/zeroclaw-labs/zeroclaw/issues/10588) 中指出 5 MiB 上限低于所有主流视觉 API 的接受范围，普通手机照片也被误拒，属于影响日常使用体验的配置缺陷。
- **渠道一致性**：多个渠道（Slack/Telegram/Matrix/Email 等）的 outbound HTTP 客户端未走代理，反映出多通道代码复用不足导致的行为漂移。维护者通过重构而非逐渠道打补丁的方式解决，方向正确。

---

## 8. 待处理积压

**长期未合并的关键 PR（提醒维护者关注）**

- [PR #9272 feat(anthropic): handle refusals with fallback notices](https://github.com/zeroclaw-labs/zeroclaw/pull/9272) — 打开 **54 天**，处理 Anthropic 模型 refusal 响应类型化，涉及 XL 规模改动。
- [PR #9753 fix(config): distinguish absent vs empty risk-profile allowed_tools](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) — 打开 42 天，安全策略边界（未配置 vs 空配置）语义区分，标记 needs-maintainer-review。
- [PR #9830 fix(browser): make full browser automation opt-in](https://github.com/zeroclaw-labs/zeroclaw/pull/9830) — 打开 39 天，安全默认值修复（浏览器自动化应显式开启）。
- [PR #9971 feat(channels): authorize Discord members by role](https://github.com/zeroclaw-labs/zeroclaw/pull/9971) — 打开 33 天，Discord 角色授权，标记 needs-author-action。
- [PR #10197 fix(acp): persist interrupted turn progress](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) — 打开 26 天，中断恢复，标记 needs-maintainer-review。
- [PR #10381 fix(security): resolve host launchers before workspace cwd](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) — 打开 20 天，安全修复（工作目录解析顺序），标记 needs-maintainer-review，XL 规模。

**风险提示**：上述 PR 中有 4 个标注了 risk:high 或涉及安全边界（#9753、#9830、#9971、#10381），同时多个被标记为 needs-maintainer-review 或 needs-author-action。建议维护者在下一轮 review 中优先处理安全类 PR，避免积压导致的安全窗口扩大。

---

*本日报基于 GitHub 公开数据自动生成，数据截至 2026-09-15。*

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报 2026-09-15

## 1. 今日速览

过去 24 小时 PicoClaw 项目无新版本发布，整体活跃度中等。1 条存量 Issue 获得更新，核心是 QQ 通道 401 认证故障，且已定位到 `botgo v0.2.1` 与 `resty ≥ v2.17` 的兼容性根因；PR 侧 1 份 v0.10.0 sprint 设计文档被关闭/合并，另有 1 个 Keenable 搜索 provider 的 PR 处于 stale 待处理状态。值得关注的是，功能性 PR（#3370）已被 stale 标记，需要维护者尽快做出合并或关闭决定。

## 2. 项目进展

**v0.10.0 迭代规划文档合入**

[#3379 docs: v0.10.0 sprint plan](https://github.com/sipeed/picoclaw/pull/3379) 在今日关闭/合并。该 PR 将 `.todo.md` 草案深化为 `docs/design/v0.10.0-sprint.md`，覆盖 Track 60–66 的可实施细节，并明确了 **60 → 65 → 61 → 62 → 63 → 64 → 66** 的落地顺序，采用每个 Track 一个 PR 的推进策略。这标志着项目下一个迭代进入可执行阶段，后续可预期该系列 Track 的代码实现会陆续提交。

## 3. 社区热点

**讨论最集中的 Issue：[#3365](https://github.com/sipeed/picoclaw/issues/3365)**

- 👍 1 · 💬 2 · 标记为 `[stale]`
- 核心议题：QQ 通道调用时返回 `401 "Authorization参数格式错误"`，影响用户正常使用。
- 背后的诉求：根因已定位为 `botgo v0.2.1` 与 `resty >= v2.17` 的兼容性问题，社区期待维护者确认修复方案（依赖降级、botgo 升级或绕行补丁），并给出明确的版本兼容矩阵。

## 4. Bug 与稳定性

**中高严重度：QQ 通道 401 认证失败**

- Issue: [#3365](https://github.com/sipeed/picoclaw/issues/3365)（创建于 2026-09-04，更新于 2026-09-14）
- 环境：Orange Pi 3B (RK3566, aarch64)，picoclaw nightly (0.3.1)
- 根因：`botgo v0.2.1` + `resty v2.17.1` 组合导致 `Authorization` 参数格式违规
- 严重程度：功能性故障，影响 QQ 渠道接入，无已知 workaround
- Fix PR 状态：**暂无**关联修复 PR，需维护者跟进

## 5. 功能请求与路线图信号

**Keenable 搜索服务接入申请**

[#3370 feat(tools): add Keenable web search provider](https://github.com/sipeed/picoclaw/pull/3370) 仍处于开放状态但已被 stale 标记。该 PR 新增 `tools.web.keenable.enabled` 配置项，支持免 API key 调用 Keenable 公共搜索端点。

结合已合入的 v0.10.0 sprint 规划（Track 60–66），若其中包含工具链/搜索相关 track，则此 provider 可作为插件化扩展纳入计划；但目前无证据表明其已被列入路线图，存在被自动关闭的风险。

## 6. 用户反馈摘要

从 [#3365](https://github.com/sipeed/picoclaw/issues/3365) 的评论中可提炼出用户痛点：

- 在 ARM 设备（Orange Pi 3B）上使用 nightly 版本，QQ 通道即装即用体验受损；
- 用户已自行定位到根因依赖组合，说明具备一定技术能力并倾向于社区自救，但对项目方迟迟无正式修复或版本指引表示焦虑；
- 存在 1 个 👍，说明该问题在社区中有一定共鸣，并非孤例。

## 7. 待处理积压

| 类型 | 编号 | 说明 | 提醒 |
|------|------|------|------|
| Issue | [#3365](https://github.com/sipeed/picoclaw/issues/3365) | QQ 通道 401，已带根因分析，标注 stale | 建议尽快确认修复方向，避免被机器人自动关闭 |
| PR | [#3370](https://github.com/sipeed/picoclaw/pull/3370) | Keenable web search provider，已 stale | 维护者需明确：是否纳入规划，或关闭并在路线图中记录 |

两条均超过一周未有维护者动作，若短期仍无响应，将被 stale bot 自动关闭。建议维护团队在本周内给出明确处理结论。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 2026-09-15

## 1. 今日速览

过去 24 小时项目保持高活跃度。PR 侧共 50 条更新，其中 38 条已合并/关闭、12 条待合并，合并关闭率达 76%；Issue 侧新开 2 条、关闭 2 条，无新版本发布。大批 8 月下旬至 9 月初积压的 PR 在今天被集中合并清理，涵盖聊天模板、通道修复、Setup 安全加固、可观测性等多个方向。值得注意的是，今日新报告的 2 条 Issue 分别指向公共频道错误泄漏与中央数据库锁竞争，均属稳定性/安全性问题，建议优先跟进。

## 2. 版本发布

本日无新版本发布。

## 3. 项目进展

今日合并/关闭的 38 条 PR 中，核心维护者 @amit-shafnir 的系列工作占绝大多数，按主题可归纳为以下几项：

**Agent 模板与聊天创建**
- [#3396](https://github.com/nanocoai/nanoclaw/pull/3396) feat: create agents from templates in chat — `create_agent` 支持从模板实例化 agent，不再只能创建空 agent
- [#3428](https://github.com/nanocoai/nanoclaw/pull/3428) feat(slack-agent-flow): carry the template ref through Slack creation — 修复 Slack 流程创建子 agent 时模板引用丢失的问题
- [#3090](https://github.com/nanocoai/nanoclaw/pull/3090) fix(templates): prepend all top-level context Markdown — 统一模板上下文 Markdown 的注入位置

**通道修复与改进**
- [#3093](https://github.com/nanocoai/nanoclaw/pull/3093) fix(chat): keep typing active for processing turns — 处理期间保持“正在输入”状态
- [#3094](https://github.com/nanocoai/nanoclaw/pull/3094) fix(telegram): retry transient bot identity lookup — Telegram 机器人身份查找增加瞬时错误重试
- [#3465](https://github.com/nanocoai/nanoclaw/pull/3465) fix(channels): Chat SDK 4.29.0 → 4.32.0 lockstep bump — 同步升级并修复 Telegram 带下划线/星号/波浪号链接导致消息无法送达
- [#3468](https://github.com/nanocoai/nanoclaw/pull/3468) feat(whatsapp-cloud): declare the 25 s typing-indicator lifetime — 适配 WhatsApp Cloud 打字指示器 25 秒生命周期，减少 4 秒刷新造成的冗余调用

**Setup 与安装体验**
- [#3483](https://github.com/nanocoai/nanoclaw/pull/3483) fix: harden uninstall ownership and failure handling — 加固卸载流程，避免扫描与删除之间目标被替换导致的误删
- [#3484](https://github.com/nanocoai/nanoclaw/pull/3484) setup: keep pasted auth secrets out of argv — OAuth token/API key 不再经子进程命令行参数传递
- [#3486](https://github.com/nanocoai/nanoclaw/pull/3486) feat(setup): expose the build-time preseed catalog (--catalog-preseeds) — 暴露 setup 设置的预填充目录与校验规则
- [#3487](https://github.com/nanocoai/nanoclaw/pull/3487) feat(setup): accept a client timezone preseed (--tz) — 支持以参数形式指定时区预置

**系统健康与可观测性**
- [#3482](https://github.com/nanocoai/nanoclaw/pull/3482) feat: expose structured host health — CLI 可通过只读调用获知安装状态，区分空安装与故障安装

**构建与配置修复**
- [#3470](https://github.com/nanocoai/nanoclaw/pull/3470) fix(pnpm): turn the minimumReleaseAge gate on (channels twin) 与 [#3471](https://github.com/nanocoai/nanoclaw/pull/3471) fix(pnpm): turn the minimumReleaseAge gate on (providers twin) — 修复 `minimumReleaseAge: 4320` 因嵌套在 `pnpm:` 键内而未生效的问题

整体评估：项目今日完成了一次大规模积压清理（最早含 7 月中旬 PR），在通道稳定性、Setup 安全性和内部可观测性三个方向有显著推进。

## 4. 社区热点

- **#3706** [CLOSED]（2 条评论）——[ncl groups config add-mount silently produces a broken double-nested path when --container is an absolute path](https://github.com/nanocoai/nanoclaw/issues/3706)  
  当前 Issue 中讨论最活跃的一条。用户指出 `add-mount --container` 的 `--help` 说明未限定路径必须相对，而其他命令均接受绝对路径，自然输入绝对路径后产生静默的双重嵌套坏路径。诉求核心是 CLI 参数约束的文档一致性与输入校验。

- **#3660** [CLOSED]（1 条评论）——[Session DB readonly errors blocking message delivery](https://github.com/nanocoai/nanoclaw/issues/3660)  
  Session SQLite 数据库变为只读，导致 Discord 等通道无法发送消息。属于影响面较大的故障，已关闭。

- **#3654** [OPEN]——[fix(onecli): NO_PROXY for host.docker.internal so host-side MCP servers are reachable](https://github.com/nanocoai/nanoclaw/pull/3654)  
  在展示的 PR 序列中居首，开放已超两周。讨论焦点是 OneCLI 注入的代理变量导致容器内 Bun 无法访问宿主机侧明文 HTTP MCP 服务器。

## 5. Bug 与稳定性

按严重程度排列：

**高**
- [#3814](https://github.com/nanocoai/nanoclaw/issues/3814)（OPEN，暂无 fix PR）——`deliverErrorResult` 将 SDK 原始错误文本逐字投递到触发轮次的任意通道，未校验目标是否为公共频道。若容器子进程中途死亡，内部错误信息可能泄漏至公开渠道，存在隐私/安全风险。

- [#3811](https://github.com/nanocoai/nanoclaw/issues/3811)（OPEN，暂无 fix PR）——中央数据库（`src/db/compose.ts`）以 WAL 模式打开但未设置 `busy_timeout`，两个进程同时写入时锁竞争直接抛错，而非等待后重试，容易被误判为数据库损坏。影响任务/调度等共享状态场景的可靠性。

**中**
- [#3706](https://github.com/nanocoai/nanoclaw/issues/3706)（CLOSED）——`add-mount` 接受绝对路径后产生双重嵌套路径，已关闭。
- [#3660](https://github.com/nanocoai/nanoclaw/issues/3660)（CLOSED）——Session DB 只读导致消息全面投递失败，已关闭。
- [#3654](https://github.com/nanocoai/nanoclaw/pull/3654)（OPEN，已有 fix PR）——host 侧 MCP 服务器受代理变量影响不可达，修复 PR 待合并。

## 6. 功能请求与路线图信号

- **OpenCode 集成**（[@glifocat](https://github.com/glifocat)，三连 PR）：[#3747](https://github.com/nanocoai/nanoclaw/pull/3747) feat(add-opencode): integrate setup and host assistance、[#3733](https://github.com/nanocoai/nanoclaw/pull/3733) feat(add-opencode): implement provider contracts and host authentication、[#3746](https://github.com/nanocoai/nanoclaw/pull/3746) fix: preserve provider cancellation, failure delivery, and skill files。  
  这三个 PR 构成一个完整功能：将 OpenCode 作为可选技能接入 Setup 与宿主运行时，自持工具、MCP、取消、压缩、续跑恢复、认证与模型选择等全链路能力。是目前体量最大的路线图信号，若合并将显著扩展支持的模型与交互方式。

- **Durable handoff 与 mission control**（[#3813](https://github.com/nanocoai/nanoclaw/pull/3813)）：今日新开，引入宿主持有的持久交接台账（指纹化源/审查方契约、append-only 事件、CLI 资源），并在 Slack bridge 层强制结构化 agent 到 agent 投递。指向多 agent 协作场景下的安全与可审计性。

- **模板化 agent 创建**已在今日落地（#3396、#3428），说明“从聊天中直接创建业务 agent”是明确需求，后续可能继续完善模板分享与目录管理。

## 7. 用户反馈摘要

- @DawoudIO 是今日最活跃的 Issue 报告者，提交了 #3814、#3811 两个新 Issue，并关闭了此前报告的两个 Issue（#3706、#3660）。
- 来自 [#3706](https://github.com/nanocoai/nanoclaw/issues/3706) 的反馈反映了一类共性问题：CLI 帮助文档对参数约束（相对 vs 绝对路径）说明不足，且缺少校验——用户按直觉输入绝对路径后得到的是静默的坏路径，没有警告，排查成本高。
- 来自 [#3660](https://github.com/nanocoai/nanoclaw/issues/3660) 的反馈表明，“数据库只读导致全通道消息阻塞”这类故障对生产使用影响极大，用户期望更早的预警与自动恢复机制。
- Setup 相关的多项合并（#3484、#3486、#3487）表明维护者正在积极回应“配置过程不透明、密钥处理不安全”的社区诉求。

## 8. 待处理积压

- **#3654**（OPEN，8月29日创建，已两周+）——[NO_PROXY for host.docker.internal](https://github.com/nanocoai/nanoclaw/pull/3654)。修复长期存在，建议维护者安排 review 并尽快合并。
- **#3719**（OPEN，9月4日创建）——[fix(a2a): report communication failures to the source](https://github.com/nanocoai/nanoclaw/pull/3719)。A2A 通讯失败时向源 agent 系统提示说明原因，并同步回写发起会话，涉及 agent 协作体验，建议加快推进。
- **OpenCode 系列三个 PR**（#3733 已开放一周，#3747、#3746 紧随其后）——功能体量大、涉及 `area/agent-runner`、`area/containers`、`area/core`、`area/providers`、`area/skills` 等多个模块，建议维护者明确合并时间表，避免长时间漂移带来大量 rebase 成本。

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报 — 2026-09-15

## 1. 今日速览
过去 24 小时项目活跃度较低：新增 1 条 Issue（每日失败分类报告），1 条 PR 更新（待合并），无新版本发布。项目处于稳步维护状态——自动化质量监控持续运行，MCP 相关修复等待合并。社区层面暂无高互动讨论，整体节奏偏安静，但基础设施与修复工作仍在推进。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日无合并或关闭的 PR，但有一条待合并的修复 PR 状态更新：

- [#8077 fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)  
  创建于 2026-09-06，更新于 2026-09-14。该 PR 旨在修复 MCP 出口诊断，集中管理 `response_leak_blocked` 哨兵，并让 MCP 通道能够正确识别该信号，从而在保证主机泄漏阻断安全的同时提供清晰的 MCP 侧错误原因。关联 issue #8009，目前仍待合并。  
  此外，新增的 Issue [#8100 Daily ironclaw failure taxonomy — 2026-09-14](https://github.com/nearai/ironclaw/issues/8100) 表明项目团队正在系统性地分析每日测试失败，为模型质量改进提供数据驱动的基础。

## 4. 社区热点
今日无高互动、高评论的 Issue 或 PR。相对活跃的条目为：

- [#8100 Daily ironclaw failure taxonomy — 2026-09-14](https://github.com/nearai/ironclaw/issues/8100)（新开，评论 0）  
- [#8077 fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)（更新，评论 0）  

虽无用户讨论，但 #8100 作为每日失败分类报告，持续为社区提供质量透明度，值得关注。

## 5. Bug 与稳定性
- **MCP 诊断分类缺陷**（中等）  
  [#8077](https://github.com/nearai/ironclaw/pull/8077) 修复了 MCP 出口诊断中响应泄漏被错误分类的问题，避免泄漏阻断逻辑被误伤。已有修复 PR，待合并。
- **OfficeQA 套件存在 43 个非通过任务**（质量回归信号）  
  [#8100](https://github.com/nearai/ironclaw/issues/8100) 指出这些失败「几乎全部是真正的模型质量错误」，涉及 DeepSeek-V4-Flash 等模型。该报告属于质量监控，并非代码 bug，但需关注模型迭代对 benchmark 的影响。

## 6. 功能请求与路线图信号
今日未发现新的用户功能请求。#8100 的失败分类数据可能为下一步模型优化或套件调整提供方向，但这更多是现有路线图的质量保障环节。PR #8077 则聚焦于可观测性改进，这类基础设施增强通常为未来功能铺路。

## 7. 用户反馈摘要
今日无来自评论区的直接用户反馈。从 #8100 的失败分类可间接推测：模型在 officeqa 基准上的表现仍有明显短板，可能影响端到端的 agent 任务体验，用户或许期待模型质量在后续版本中获得针对性提升。

## 8. 待处理积压
- [#8077 fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)  
  该 PR 自 2026-09-06 创建，已等待超过 9 天仍未合并，最近更新于 09-14。为避免修复长期滞留，建议维护者跟进 review 进度或推动合并/关闭决策。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-15

## 1. 今日速览

LobsterAI 过去 24 小时整体活跃度较高：共更新 24 条 PR（待合并 14 条、关闭/合并 10 条），但绝大多数为 Dependabot 自动依赖更新，人工驱动的核心变更集中在 3 条 PR 上。其中，**OpenClaw 运行时升级（#2665）已合入**，是近期最大的一次能力迭代；另有 2 条开发体验与 IM 稳定性修复（#2663、#2664）。Issue 侧仅 1 条更新，但值得关注的是 3 月提交的 **IM 消息被静默丢弃 bug（#1035）** 在 9 月 14 日被再次激活，属于长期未解决的高影响问题。今日无新版本发布，项目整体处于"依赖自动维护 + 少量手动迭代"的稳健运行状态，但核心功能开发信号偏弱。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合入/关闭的 PR 中，**2 条为人工提交的核心变更**，其余 8 条为 Dependabot 自动更新（多数因超时被自动关闭，由新 PR 重新替代）。

### 重点合入

- **[#2665] feat: upgrade OpenClaw to v2026.8.1 and improve artifact workflows（已合并）**
  链接：https://github.com/netease-youdao/LobsterAI/pull/2665
  
  这是今日最大的进展。将内置 OpenClaw 运行时从 v2026.6.1 升级到 **v2026.8.1**，Electron 从 40.2.1 升级到 **43.5.0**，并同步适配了运行时集成层和用户态迁移。同时改进了 Markdown 编辑体验、Library 组织方式和应用内浏览器。PR 覆盖面横跨 renderer / build / docs / main / openclaw / cowork / im 等多个标签，是未来几周功能演进的基座，值得重点关注后续是否有跟随性修复。

- **[#2663] fix(dev): exclude generated directories from Vite watching（已合并）**
  链接：https://github.com/netease-youdao/LobsterAI/pull/2663

  修复了 Windows 下临时目录包含循环 junction 时，Vite 开发服务器启动超时/崩溃的问题。将 `.work`、`artifacts`、`dist-electron` 从 Vite 目录监视中排除，提升开发者本地启动体验，属于低风险高收益的开发基建修复。

### 依赖更新节奏

今日关闭的 8 条 Dependabot PR（如 #2587、#2464、#2582、#2586、#2583、#2578）均被新 PR 重新发起（如 #2672、#2671、#2670、#2669、#2667 等），说明这些依赖升级尚未完成合入，仍在反复提交中，维护者需关注是否有手动解决冲突或测试受阻。

## 4. 社区热点

今日所有 PR 的评论数均为未统计状态，无法直接按评论量排序。结合内容维度，社区的实际讨论焦点集中在两类问题上：

- **[#1035] NimGateway 重连后消息去重缓存未清空，导致正常消息被静默丢弃（OPEN，今日更新）**
  链接：https://github.com/netease-youdao/LobsterAI/issues/1035

  这是今日唯一有实质讨论的 Issue。3 月创建至今，被标记 [stale] 后在 9 月 14 日收到新更新（评论数 1），说明用户/维护者重新关注到 IM 模块这一隐蔽故障。用户诉求非常明确：**重连后去重缓存应随会话生命周期重置，而不是作为模块级全局变量长期驻留**。该问题直接关系到 IM 消息可靠性，预计后续会有对应修复 PR 出现。

- **[#2664] fix(openclaw): avoid POPO SDK loading races（OPEN，待合并）**
  链接：https://github.com/netease-youdao/LobsterAI/pull/2664

  由社区开发者提交，针对 OpenClaw v2026.8.1 升级后 POPO 2.1.13 插件加载时出现 `ERR_REQUIRE_ESM_RACE_CONDITION`，导致网关缺少 POPO 账户监听器的问题。这是一条与 #2665 升级直接相关的配套修复，说明升级已进入社区适配阶段，反馈链路畅通。

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排序如下：

| 严重度 | 问题 | 状态 | 对应修复 |
|---|---|---|---|
| **高** | IM 消息去重缓存为模块级全局变量，重连后正常消息被静默丢弃，用户无感知 | OPEN（#1035） | 尚无 PR |
| **中** | POPO 2.1.13 在网关重启后 ESM 加载竞态，导致账户监听器丢失 | OPEN（#2664） | 已有 PR #2664 待合并 |
| **低** | Windows 下 Vite 因循环 junction 导致启动超时/崩溃 | 已修复 | PR #2663 已合入 |

其中 #1035 值得格外关注：这类"无感知数据丢失"比显式报错更难排查，且 5 分钟 TTL 的残留窗口意味着**每次重连后的前 5 分钟新消息都可能被丢弃**。建议维护者尽快评估修复方案，例如将去重缓存从模块级改为实例级，或清理时机绑定到 start()。

## 6. 功能请求与路线图信号

今日无新的纯功能请求 Issue，但从合入的 #2665 可以读出明确的路线图信号：

- **OpenClaw 运行时持续跟进**：升级到 v2026.8.1 不是终点，配套的 #2664 说明运行时升级会带动 IM/插件生态的适配工作；
- **Markdown 编辑体验改进**：已在 #2665 中体现，后续可能随编辑器升级继续深化；
- **Library 组织方式优化**：属于知识管理模块的体验迭代，推测与AI助手个人知识库方向一致；
- **应用内浏览器能力增强**：表明 LobsterAI 正在往更完整的本地 Web 容器形态演进。

这些能力多与 `openclaw`、`cowork`、`artifacts` 模块相关，建议关注下一版本 Release 时是否会有对应的用户可见功能说明。

## 7. 用户反馈摘要

今日可提炼的真实用户反馈主要来自 #1035 的 issue 描述和 #2664 的 PR 提交动机：

- **IM 场景的"无声故障"最影响信任感**：用户在 #1035 中明确指出，消息被静默丢弃后"用户无任何感知"，这种故障远比报错更可怕。真实使用场景是网络抖动触发重连后，用户发出的消息会"凭空消失"，严重破坏使用体验；
- **升级后的插件兼容性风险**：#2664 反馈了 POPO 2.1.13 在 OpenClaw v2026.8.1 升级后的加载竞态，说明用户已经实际部署新版本并遇到了网关账户监听器失效的问题。这类问题会直接影响 IM 账号在线状态，需要在下个 patch 中优先合入 #2664。

整体来看，用户对项目的迭代速度有期待（今日 PR 中出现了社区贡献者 btc69m979y-dotcom 的提交），但对 IM 可靠性问题的修复进度仍有不满。

## 8. 待处理积压

以下为长期未响应/未解决的重要 Issue 和 PR，建议维护者优先关注：

- **[#1035] OPEN：NimGateway 消息去重缓存问题（3 月创建，9 月重新激活）**
  链接：https://github.com/netease-youdao/LobsterAI/issues/1035
  高影响 bug，已被 [stale] 标记后再次更新，继续积压可能导致用户流失。

- **[#2664] OPEN：POPO SDK 加载竞态修复（今日创建，等待合并）**
  链接：https://github.com/netease-youdao/LobsterAI/pull/2664
  与 #2665 升级直接相关，建议尽快推进 review 并合入。

- **[#1277] OPEN：electron group 依赖升级（4 月 2 日创建，至今未合并）**
  链接：https://github.com/netease-youdao/LobsterAI/pull/1277
  electron 43.5.0 → 44.3.0 的批量升级已积压 5 个月，虽然 #2665 已将 Electron 升级到 43.5.0，但仍需确认此 PR 是否已过时或可关闭。

- **[#2459] OPEN：@nodesecure/js-x-ray 依赖升级（8 月创建，标记 [stale]）**
  链接：https://github.com/netease-youdao/LobsterAI/pull/2459

- **[#2460] OPEN：rimraf 6.1.3 依赖升级（8 月创建）**
  链接：https://github.com/netease-youdao/LobsterAI/pull/2460

- **[#2461] OPEN：eslint-plugin-react-hooks 7.1.1 升级（8 月创建，标记 [stale]）**
  链接：https://github.com/netease-youdao/LobsterAI/pull/2461

以上多条 PR 均存在 1 个月以上未合并的情况，建议维护者统一清理：要么手动合并，要么关闭后由 Dependabot 另行开新 PR，避免积压噪音。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

## Moltis 项目动态日报 (2026-09-15)

**数据周期**: 2026-09-14 ~ 2026-09-15 | **数据源**: [github.com/moltis-org/moltis](https://github.com/moltis-org/moltis)

### 1. 今日速览

过去24小时内，Moltis 项目在 Issues 与 PR 层面均无新增或变动（新开/活跃: 0，关闭/合并: 0），社区讨论处于静默状态。唯一可见的动作为发布了一个新 Release（`20260913.02`），表明维护者仍在持续推进版本迭代，但公开协作活动的节奏较缓。整体活跃度评估为 **低位运行**，项目健康度中等——无累积 Bug 反馈亦无新增功能诉求，处于稳定的维护间歇期。需关注随后几日是否有针对该 Release 的用户反馈与配套 PR 动态。

---

### 2. 版本发布

- **版本号**: [20260913.02](https://github.com/moltis-org/moltis/releases)
- **发布时间**: 2026-09-13（基于版本号推断）
- **更新内容**: 本次 Release 的发布说明未随数据提供，具体更新范围（功能增强/Bug 修复/依赖升级）无法从现有信息确认。
- **破坏性变更**: 暂无记录，建议维护者核实该版本是否包含需要用户手动调整的配置或接口变更。
- **迁移注意事项**: 由于 release notes 缺失，暂无法提供针对性的迁移指引。建议下游用户关注项目仓库的后续说明或 commit 历史。

> 提示：数据接口未返回该 Release 的详细描述字段，建议直接访问 [Releases 页面](https://github.com/moltis-org/moltis/releases) 查看完整信息。

---

### 3. 项目进展

过去24小时没有 PR 被合并或关闭（待合并: 0，已合并/关闭: 0）。项目代码主干的演进主要体现在新 Release 的发布动作上，推测为前一阶段 PR 合并成果的打包输出。由于缺乏 PR 明细，无法量化本次版本推进的功能广度，但版本号的持续递增（`.02`）表明发布管线运行正常。项目整体处于 **版本交付期**，而非功能开发密集期。

---

### 4. 社区热点

今日无活跃 Issues 或 PRs 讨论（新开/活跃: 0，评论数: 0）。社区热度较低，没有涌现热门话题。这与项目处于维护间歇期的状态一致，用户可能尚在消化前一版本（`20260913.02`）的实际使用体验，预计未来几天可能出现针对新版本的反馈或使用问题。

---

### 5. Bug 与稳定性

过去24小时 **无新增 Bug 报告**，无崩溃、回归或稳定性相关问题被提交。结合近期 Release 的发布，当前版本状态较为平稳，没有爆发集中的质量投诉。由于历史 Bug 数据库中的数据未在本次数据范围内提供，暂无法评估存量缺陷的清理情况。建议维护者保持对下个统计周期的关注，以确认新版本未引入隐性回归。

---

### 6. 功能请求与路线图信号

今日无新功能请求提交，亦无相关 PR 表明路线图上的新特性正在开发中。从项目历史版本节奏来看，`20260913.02` 可能为小型迭代或修复版本，而非引入重大功能的主版本。若社区存在中长期功能需求（如 AI 代理增强、多模态支持等），目前尚未在本数据周期内形成公开讨论信号。路线图走向需结合后续 Issue/PR 动态继续观察。

---

### 7. 用户反馈摘要

今日无用户反馈内容（Issues 评论为 0）。因此无法提炼具体的用户痛点、使用场景或满意度信息。该状态可能反映大多数用户在当前版本上运行稳定（无投诉需求），也可能说明项目用户基数较小或使用社区反馈渠道的意愿不高。建议维护者主动在 README 或 Discussion 板块引导用户反馈，以丰富项目迭代的用户依据。

---

### 8. 待处理积压

由于当前数据周期内无任何打开或悬置的 Issue/PR（`0 条`），暂无长期未响应的项目需要标记提醒。该数据 **可能** 意味着维护者响应及时、积压已清零，也可能受限于数据接口仅返回“过去24小时”范围的限制，历史遗留的未关闭条目未完整映射。为稳妥起见，建议直接查看 [Issues 列表](https://github.com/moltis-org/moltis/issues) 和 [Pull Requests 列表](https://github.com/moltis-org/moltis/pulls) 进行交叉确认。

---

### 总结

Moltis 项目在过去24小时处于 **低活跃度状态**：无协作者互动，但保持发布节奏。核心建议如下：
- 维护者可补充发布 `20260913.02` 的详细 release notes，降低用户升级成本；
- 社区活跃度偏低，可考虑通过示例项目、文档更新或讨论话题引导提升关注；
- 下个数据周期（24h后）重点关注新版本的反馈 Issue 是否出现，以评估实际用户反应。

指标 | 数值
---|---
Issues（新开/活跃） | 0
Issues（关闭） | 0
PR（待合并） | 0
PR（合并/关闭） | 0
Releases | 1 (`20260913.02`)
讨论热度 | 静默

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-15

> 数据快照时间：2026-09-15 | 数据来源：github.com/agentscope-ai/CoPaw

---

## 1. 今日速览

过去 24 小时 CoPaw 项目保持着高强度的社区互动：共产生 18 条 Issue 更新（14 条活跃、4 条关闭）和 50 条 PR 更新（39 条待合并、11 条已合并/关闭），无新版本发布。Issue 侧的核心议题集中在**运行时稳定性**上——定时任务输出丢失（#7709）、subAgent 调用全面超时（#7678）、容器内存耗尽（#7722）构成了今日最突出的三个用户痛点；同时有 4 条 Issue 获得关闭（含 2 条 ReMe/记忆体系相关提问），说明维护团队正在消化此前积压的社区问题。PR 侧呈现出鲜明的**安全加固 + MCP 兼容性修复**双主线，且有 3 个 first-time-contributor PR 进入队列，社区参与度健康。整体判断：项目处于高频迭代期，可靠性问题反馈集中，但修复响应也较为及时。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

数据概览显示今日有 **11 条 PR 已合并/关闭**（快照未提供具体清单）。从可观察的 Issue 关闭状态与 PR 队列可以确认以下进展：

**已关闭 Issue（4 条）**

- [#7199](https://github.com/agentscope-ai/QwenPaw/issues/7199)（CLOSED）— `daily_paper` 的 `write_atomic` 在 PDF 包含代理字符（U+D800–U+DFFF）时崩溃的问题已关闭，说明该 Bug 已获处理。
- [#6840](https://github.com/agentscope-ai/QwenPaw/issues/6840)（CLOSED）— 关于 ReMe Light 与 ReMe4 路线图的提问已关闭，团队应已给出答复。
- [#6222](https://github.com/agentscope-ai/QwenPaw/issues/6222)（CLOSED）— MEMORY.md 与 Dream digest 定位之问已关闭。
- [#7771](https://github.com/agentscope-ai/QwenPaw/issues/7771)（CLOSED）— 上下文管理压缩/新对话产生空白标签的问题已关闭。

**待合并 PR 中直接修复已知 Issue 的条目**

| PR | 修复对象 | 方向 |
|---|---|---|
| [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) fix(acp): select permission options by protocol kind | 修复 [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) ACP `trusted: true` 静默降级问题 | 安全/权限 |
| [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) fix(mcp): recognize Java jsonRpcError envelope | 修复 #7728 Java MCP 服务 discover 探测失败 | MCP 兼容性 |
| [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) fix(mcp): preserve decoded HTTP error responses | 修复 #7716 HTTP 错误响应二次解压问题 | MCP 稳定性 |
| [#7763](https://github.com/agentscope-ai/QwenPaw/pull/7763) fix(plugins): handle catalog response read failures | 修复 #7730 插件目录 CDN 响应中断崩溃 | 插件系统 |

**整体判断**：项目正在从三个方向推进——**安全加固**（#7769 本地 API 认证、#7766 文件预览认证、#7683 Hub 审计日志）、**MCP 生态兼容**（Java SDK 信封格式、HTTP 错误保真、Dagu 客户端）、**Console 体验打磨**（#7750 发送文件展示、#7681 侧边栏持久化、#7752 语言选择修复）。QwenPaw-Data 0.3.0（[#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637)）仍在 Under Review 中，若合并将成为下一个功能版本的重要组成。

---

## 4. 社区热点

**今日讨论最活跃的 Issue 均围绕"核心功能不可用"展开：**

| 排名 | Issue | 评论数 | 核心诉求 |
|---|---|---|---|
| 1 | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) 定时任务经常无输出，结果被折叠在步骤/thinking 中 | 6 | v2.2.1 中定时任务输出频繁丢失，正常对话也间歇性出现 |
| 2 | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) spawn subAgent 任务全部 timeout 失败 | 6 | 用户报告 subAgent 任务 100% 失败率，调长 timeout 无效 |
| 3 | [#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660) Installation failed | 4 | 安装失败，缺少环境上下文 |
| 4 | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) 内存耗尽三路径复合问题 | 4 | 容器内存以 ~1MB/s 持续增长直至 OOM，附深度根因分析 |
| 5 | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) Daily Paper 静默失败，错误信息误导 | 4 | arxiv.org 不可达时给出"completed with no returned content"的误导性提示 |

**需求信号解读**：排名前两位的 Issue（#7709、#7678）分别击中**定时任务可靠性**和**多智能体编排可靠性**，这两个能力正是 AI Agent 从 Demo 走向生产的关键路径。用户对"结果被折叠在 thinking 中"的抱怨表明——**过程可见性不等于结果可达性**，框架需要保证最终产物在 UI 层的确定性呈现。#7722 则体现了社区技术深度（用户定位出三条独立的内存泄漏路径），这类高质量报告应作为优先处理对象。

**PR 侧热度**：所有 PR 评论数均未超过 5，但 [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)（fix ACP 权限选择）标记为 `ready-for-human-review`，且与今日高热度 Issue #7726 直接关联，预计会吸引较多关注。

---

## 5. Bug 与稳定性

**🔴 严重（服务不可用/数据丢失）**

| Bug | 影响 | 状态 |
|---|---|---|
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) 内存耗尽三路径复合（无界流缓冲、keep-alive 实例堆叠、doom-loop 门逃避） | 容器内存以 ~1MB/s 速度增长直至 OOM 挂起，服务完全不可用 | 无 fix PR；#7748 修复了循环警告/预算恢复，但未完全覆盖 |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) spawn subAgent 任务全部 timeout 失败 | 多智能体核心功能 100% 失败，调长 timeout 无效 | 待处理，已活跃 4 天 |

**🟠 高（功能异常/误导用户）**

| Bug | 影响 | 状态 |
|---|---|---|
| [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) 定时任务无输出，结果被折叠 | 高频核心功能不可用；正常对话也会间歇性触发 | 待处理 |
| [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) Daily Paper 静默失败（arxiv 不可达） | 错误信息"completed with no returned content"掩盖真实原因，误导排查 | 待处理 |
| [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) 越界写入硬阻塞不识别 kimi-code 的 Write 工具 `_paths` 格式 | 安全机制被绕过：工作区外写入未触发拦截 | 待处理 |
| [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) ACP `trusted: true` 静默回退到交互式提示 | 信任模式被静默降级，安全预期失效 | **已有 fix PR** [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) |

**🟡 中（功能受限）**

| Bug | 影响 | 状态 |
|---|---|---|
| [#7764](https://github.com/agentscope-ai/QwenPaw/issues/7764) MCP dagu 客户端因 httpx.DecodingError 始终 inactive | 无法列出工具 | 待处理 |
| [#7772](https://github.com/agentscope-ai/QwenPaw/issues/7772) 无法连接 newapi 代理后的模型 | 2.2.0 配置 newapi 后测试报错 | 待处理 |
| [#7767](https://github.com/agentscope-ai/QwenPaw/issues/7767) 守卫插件暴露 4 个 Bug（控制台附件陈旧 blob、一次性 cron 丢触发、尾部丢失、on_acting 不触发） | 插件开发体验受损 | 待处理 |

**🟢 低（体验问题）**

| Bug | 影响 | 状态 |
|---|---|---|
| [#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660) Installation failed | 安装失败 | 已活跃 5 天，信息不足 |
| [#7771](https://github.com/agentscope-ai/QwenPaw/issues/7771) 上下文管理压缩产生空白标签 | 历史列表出现 "Compact Chat Session Title" 无意义条目 | **已关闭** |

---

## 6. 功能请求与路线图信号

| Issue/PR | 请求内容 | 路线图信号 |
|---|---|---|
| [#7746](https://github.com/agentscope-ai/QwenPaw/issues/7746) | Skills 适用 channel 列表不全，希望自定义 channel 可限制 skill 使用范围 | 与渠道体系深度绑定，可能纳入 Channels + Skills 的权限模型演进 |
| [#7754](https://github.com/agentscope-ai/QwenPaw/issues/7754) | 自定义频道支持原生 `followUpQuestions`，避免二次 LLM 请求的开销 | 直接改善 token 成本与响应延迟，属于对开发者友好的诉求 |
| [#7755](https://github.com/agentscope-ai/QwenPaw/issues/7755) | 会话级缓存隔离，参考 dsh 三层方案；当前 deepseek 配置 `user_id` 报错 | 缓存命中率比官方低 2-5%，影响真实使用成本；**高价值路线图候选** |
| [#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703) | 上下文视觉压缩改进（稳定图像批、源文本召回、可读压缩预设） | 与 #7709 的"结果被折叠"有隐式关联，可能间接改善输出可见性 |
| [#7750](https://github.com/agentscope-ai/QwenPaw/pull/7750) | `send_file_to_user` 文件在响应工件区展示 | 已进入 Under Review，大概率进入下一版本 |
| [#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) | QwenPaw-Data app 0.3.0 集成（托管分析引擎 + QPD Data Console） | 功能级 PR，仍在 Review 中，是下一版本的最大功能候选 |

**路线图判断**：#7755（缓存隔离）和 #7746（skill-channel 绑定）都是开发者直接提出的生产力诉求，且方案明确（参考实现已给出），有望进入短期规划；#7754 的 followUpQuestions 则触及多轮对话交互范式的补全。

---

## 7. 用户反馈摘要

- **定时任务可靠性是最大痛点**（[#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709)）：用户反映"定时任务经常无输出，理应输出的结果经常被折叠在步骤或者 thinking 中"，且"正常对话也会时不时出现这种不显示的情况"，说明这不仅影响 cron 场景，也波及常规交互的可信度。

- **subAgent 功能在当前版本形同虚设**（[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)）：用户明确表示"任务一旦进行 spawn subAgent 处理，我遇到的，没有一个执行的下去，全都任务失败，全都 timeout 失败了"，并将 timeout "设置很长很长也没用"——这表明问题不在超时阈值，而在底层调用链。

- **高级用户贡献了深度技术分析**（[#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)）：该用户不仅报告了 OOM，还定位出"三条复合路径"（无界流缓冲、keep-alive 实例堆叠、doom-loop 门逃避），并附上了受控复现方法与最小修复建议。这类高质量反馈值得维护团队优先响应。

- **错误信息误导排查方向**（[#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)）：Daily Paper 任务在 arxiv.org 不可达时显示"completed with no returned content"，用户被误导以为是没有结果而非网络故障，暴露出错误处理链路对用户不透明的问题。

- **安全机制存在"静默降级"问题**（[#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726)）：用户指出"trusted: true"配置下 ACP 会话因 `_pick_allow_option` 只匹配 `allow_*` 前缀而回退到交互式提示，且**没有告警**。安全功能静默失效比直接报错更危险。

- **开发者在意成本与缓存效率**（[#7755](https://github.com/agentscope-ai/QwenPaw/issues/7755)）：配置 deepseek 的多项目用户发现缓存命中率比官方数据低 2-5%，试图按官方文档配置 `user_id` 却报错"意外参数 user_id"，说明框架在透传模型供应商高级参数方面需要增强灵活性。

---

## 8. 待处理积压

**优先关注（高影响、长时间未解决）**

| 条目 | 创建时间 | 活跃天数 | 备注 |
|---|---|---|---|
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) spawn subAgent 全部 timeout 失败 | 09-11 | 4 天 | 核心功能 100% 失败，无 maintainer 回复记录 |
| [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) 定时任务输出丢失/折叠 | 09-11 | 4 天 | 6 条评论，高频场景，无 fix 信号 |
| [#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660) Installation failed | 09-10 | 5 天 | 信息不足，需 maintainer 主动索取环境细节 |
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) 内存耗尽三路径 | 09-12 | 3 天 | 深度分析值得置顶；无 fix PR 认领 |

**需 maintainer 注意的 PR**

| PR | 创建时间 | 备注 |
|---|---|---|
| [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) fix(acp): select permission options by protocol kind | 09-12 | 已标记 `ready-for-human-review`，直接修复安全相关的 #7726，建议优先评审 |
| [#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) feat(qwenpaw-data): QwenPaw-Data app 0.3.0 | 09-08 | Under Review 已 7 天，功能级 PR，需确认是否进入下一版本 |

**低活跃/易被遗忘**

- [#7768](https://github.com/agentscope-ai/QwenPaw/issues/7768)（Question，1 评论）— 云端部署后关于绑定 GitHub 账号活跃度与重新申请等待时间的问题，涉及文档完善，建议回复后同步更新部署文档。
- [#7754](https://github.com/agentscope-ai/QwenPaw/issues/7754)（Feature，1 评论）— 自定义频道 followUpQuestions 的请求，已有明确方案描述，值得评估。

---

*本日报由 AI 自动生成，数据基于 2026-09-15 的 GitHub 快照，部分 PR 合并详情未包含在数据源中。*

:::
