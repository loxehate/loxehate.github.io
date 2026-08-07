---
title: "OpenClaw 生态日报"
date: 2026-08-07
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# OpenClaw 生态日报 2026-08-07

> Issues: 126 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-07 02:37 UTC

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

# OpenClaw 项目动态日报 — 2026-08-07

## 1. 今日速览

过去 24 小时项目活跃度极高：**126 条 Issue 更新**（新开/活跃 101 条，关闭 25 条），**500 条 PR 更新**（待合并 399 条，已合并/关闭 101 条），无新版本发布。值得警惕的是，会话状态与消息丢失类 P0/P1 回归问题持续聚集（如 #118772 的 totalTokens 膨胀导致提前压缩、#119971 的 Codex 压缩 no-op 被误判为致命错误），且多数暂未合入修复 PR，稳定性压力较大。正面信号是社区提交了大量精准修复（Venice 工具签名、/new 上下文熔断、ingress 认领悬挂等），另有 PR #120115 跟进新发布的 Agent Plugins 1.0.0 开放标准，显示项目在生态兼容上保持积极。

---

## 3. 项目进展

今日 **101 条 PR 已合并/关闭、25 条 Issue 已关闭**。以下是在途关键 PR（按对项目健康度的影响排序）：

| PR | 内容 | 状态信号 |
|---|---|---|
| [#120115](https://github.com/openclaw/openclaw/pull/120115) | `feat(plugins): support the Agent Plugins bundle format` — 支持 OpenAI/Vercel/AWS/Cursor/Microsoft 于 2026-08-06 联合发布的 Agent Plugins 1.0.0 开放包格式（`plugin.json` + `skills/` + `mcp.json`） | 重大生态跟进，XL 规模，maintainer 提交 |
| [#120059](https://github.com/openclaw/openclaw/pull/120059) | `fix(sessions): scope transcript byte stats to the active reset window` — 修复 #119984（/new 后新会话每轮都报 "Context is too large"） | 直击高频用户痛点，S 规模，需补充 proof |
| [#120104](https://github.com/openclaw/openclaw/pull/120104) | `fix(channels): settle ingress claim when a turn fails before adoption` — 修复预检压缩抛错后 ingress claim 悬挂 300s 的问题（关联 #119971/#119979） | 与 P1 消息丢失问题联动修复 |
| [#120005](https://github.com/openclaw/openclaw/pull/120005) | `fix(agents): stop a leading @ from retargeting file-tool destinations` — 修复 `write`/`edit`/`apply_patch` 剥离前导 `@` 导致写错文件（关闭 #119270） | 数据安全类修复，proof 充分 |
| [#119850](https://github.com/openclaw/openclaw/pull/119850) | `fix(macos): recover onboarding and prove packaged bootstrap` — 修复 macOS 引导误报失败（修复 #120050），并验证打包后自举 | XL 规模，含 docs/scripts 改进 |
| [#119783](https://github.com/openclaw/openclaw/pull/119783) | `fix(venice): replay Gemini tool signatures by turn occurrence` — 按轮次回放 Venice 的不透明 tool signature，修复 Gemini 工具轮续请求失败 | P1 + diamond lobster 评级，待 maintainer 过目 |
| [#119400](https://github.com/openclaw/openclaw/pull/119400) | `fix: unhandled rejection crashes process when raw stream write fails` — 原始诊断流写入失败不再导致网关进程崩溃 | 稳定性修复，proof 充分 |
| [#119966](https://github.com/openclaw/openclaw/pull/119966) | `fix: prevent duplicate outbound delivery during concurrent recovery` — 修复 `openclaw message send` 与运行中网关并发恢复时重复投递 | P1 消息投递正确性修复 |
| [#119221](https://github.com/openclaw/openclaw/pull/119221) | `fix(sessions): reject a transcript turn when the session id rotates mid-append` — 会话 ID 旋转期间拒绝写入，防止消息落入错误会话 | P1 会话一致性修复 |
| [#119894](https://github.com/openclaw/openclaw/pull/119894) | `fix(cron): reject blank --model/--thinking on cron edit` — 拒绝空值 model/thinking 参数（关闭 #119893） | 小但解决了 clear-* 互斥被绕过的问题 |

此外，`refactor(agents): propagate attribution across execution runtimes`（[#116794](https://github.com/openclaw/openclaw/pull/116794)）作为 5 个堆叠 PR 中的第 3 个持续推进，目标是让执行归属在网关内部重启后不丢失——这直接服务于本周多起"归属错乱/生命周期串扰"类 Bug 的根治。

---

## 4. 社区热点

今日讨论最集中的 Issue 反映了三类诉求：**回归稳定、插件化扩展能力、跨平台兼容**。

- **[#87756](https://github.com/openclaw/openclaw/issues/87756)（9 评论）** — 回归：prompt 启动的 Lobster workflow 在嵌套 `/tools/invoke` 上挂起，而 curl 启动同一 workflow 正常。社区关心的是同一功能在不同入口行为不一致的问题，背后是对"prompt-launched 路径"与"外部 HTTP 路径"执行语义对齐的期待。

- **[#71736](https://github.com/openclaw/openclaw/issues/71736)（9 评论）** — RFC：为 Control UI 增加数据驱动的插件贡献槽位（chat modes、审批卡片、事件分类器、输入守卫、状态面板）。这是一个 SDK 提案，核心诉求是避免插件通过 patch `mode-switcher`、`app-tool-stream` 等内部组件来实现扩展——社区对"官方插件 API 边界"的呼声很高。

- **[#119796](https://github.com/openclaw/openclaw/issues/119796)（8 评论）** — Windows 上 vitest teardown 因 agent state DB（openclaw-agent.sqlite）句柄未释放导致 EBUSY 失败。Windows 开发者对测试基建的稳定性敏感度高，该 issue 同时被标记 `source-repro`，说明复现路径已明确。

- **[#15032](https://github.com/openclaw/openclaw/issues/15032)（7 评论，2 月 12 日开）** — 子代理按 spawn 粒度做工具权限限制。用户提出了完整的"DMZ Web 搜索"三区隔离方案来防御 prompt injection，但 issue 长期处于 `needs-product-decision` + `recovery-stuck`，社区持续在补充用例。

---

## 5. Bug 与稳定性

### 🔴 P0（数据丢失风险）

- **[#118772](https://github.com/openclaw/openclaw/issues/118772)** — 2026.7.1+ 嵌入式 agent-runner 的 `sessionEntry.totalTokens` 被多工具循环轮次的累计用量膨胀，导致会话在上下文窗口仅使用 4–8% 时触发提前压缩，**造成数据丢失**。已有 linked PR 在修，但尚未合入。这是当前项目最高优先级稳定性问题。

### 🟠 P1（消息丢失 / 会话状态损坏）

| Issue | 问题 | 修复状态 |
|---|---|---|
| [#119971](https://github.com/openclaw/openclaw/issues/119971) | Codex app-server 返回 `ok:true, compacted:false, reason:"owns automatic compaction"` 被预检逻辑当作致命错误，**用户本轮消息被丢弃** | 无 fix PR；#120104 仅覆盖关联的 ingress 悬挂 |
| [#119984](https://github.com/openclaw/openclaw/issues/119984) | `/new` 不重置 `maxActiveTranscriptBytes` 熔断器，新会话 0% 上下文却每轮报 "Context is too large" | [#120059](https://github.com/openclaw/openclaw/pull/120059) 已开 |
| [#118185](https://github.com/openclaw/openclaw/issues/118185) | 单次 claude-cli turn 被两个写入者按不同规则写入 transcript 两次（非字节一致），看起来像模型答了两次 | linked PR 在途 |
| [#118018](https://github.com/openclaw/openclaw/issues/118018) | 陈旧 subagent 完成事件被投递到已替换的 requester 生命周期，无法追踪 | linked PR 在途 |
| [#117635](https://github.com/openclaw/openclaw/issues/117635) | `docker compose run` 产生孤儿常驻容器，两个进程轮询同一 Telegram token 造成消息重复/双处理 | linked PR 在途 |

### 🟠 P1（稳定性与兼容性回归）

- **[#87407](https://github.com/openclaw/openclaw/issues/87407)** — Anthropic provider 的 `UND_ERR_SOCKET` keep-alive 故障（250–400ms）触发静默 fallback，用户对话被无感切换到 OpenAI/Codex。linked PR 在途。
- **[#119997](https://github.com/openclaw/openclaw/issues/119997)** — `diagnostics-otel` 在网关进程内重启后停止导出：`NodeSDK` 被关闭但全局注册未清理。**无 fix PR**。
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — 同步 SQLite `agent.write` 事务在 ~100 活跃会话规模下阻塞网关事件循环；批量删除会话后 ANALYZE 从不运行（实测 36.7s → 809ms 的差异）。**无 fix PR**。
- **[#120066](https://github.com/openclaw/openclaw/issues/120066)** — Gateway 守护进程重启后 exec-approvals 同步 socket 被销毁，`exec host=node` 永久返回 `SYSTEM_RUN_DENIED`。**无 fix PR**。
- **[#120070](https://github.com/openclaw/openclaw/issues/120070)** — `/tools/invoke` 路径下 `browser` 工具的 `before_tool_call` 钩子疑似被跳过。等待 live repro。
- **[#116663](https://github.com/openclaw/openclaw/issues/116663)** — xAI realtime 强制重连后首个 marker-recall 响应返回 `UNAVAILABLE`。**无 fix PR**。
- **[#116964](https://github.com/openclaw/openclaw/issues/116964)** — Docker 沙箱会话中 `apply_patch` 在 rw 挂载路径上失败且返回空错误负载（git apply 同内容却成功）。等待 live repro。

### 🟡 P2（跨平台与集成）

- [#119796](https://github.com/openclaw/openclaw/issues/119796) — Windows vitest teardown EBUSY（agent DB 句柄未释放）。
- [#119914](https://github.com/openclaw/openclaw/issues/119914) — Fastmail MCP OAuth 授权码交换反复失败 `invalid_request invalid signing_id`（2026.7.1-2，清理凭据后复现两次）。
- [#58139](https://github.com/openclaw/openclaw/issues/58139) — memory-lancedb 在 Windows Docker bind mount 下因文件系统同步延迟初始化失败。
- [#87756](https://github.com/openclaw/openclaw/issues/87756) — Lobster workflow 在 prompt 启动路径下嵌套 `/tools/invoke` 挂起（curl 路径正常）。
- [#119129](https://github.com/openclaw/openclaw/issues/119129) — owner-key TaskFlow 查找落在终态 flow 上，导致 cancel/show 跳过仍在运行的旧 flow。

---

## 6. 功能请求与路线图信号

**很可能进入下一版本：**

- **[Agent Plugins 1.0.0 支持（PR #120115）](https://github.com/openclaw/openclaw/pull/120115)** — 直接跟进 8 月 6 日发布的开放标准，支持 `plugin.json` + `skills/` + `mcp.json` 的 bundle 格式。这是今日最强的路线图信号，意味着 OpenClaw 将能直接复用五大厂商的 Agent 扩展生态，大幅降低插件迁移成本。
- **[GLM/llama-server 第一方 provider（#116765）](https://github.com/openclaw/openclaw/issues/116765)** — 用户希望内置 llama.cpp 的 OpenAI 兼容接入，省去手写 custom provider 的样板配置。已有 maintainer 标签 + product-decision 待定，本地推理诉求明确。
- **[Compaction/LCN 的 fallback model chain（#56781）](https://github.com/openclaw/openclaw/issues/56781)** — 压缩模型被限流时静默失败、会话无界增长的问题，与 #118772 的压缩数据丢失叠加，预计会加速该功能落地。
- **[Control UI 插件贡献槽位（#71736）](https://github.com/openclaw/openclaw/issues/71736)** — 官方 SDK 化 UI 扩展点的 RFC 已攒了 9 条评论，社区讨论充分，具备进入设计评审的条件。

**社区呼声高但仍在决策中的：**

- [#15032](https://github.com/openclaw/openclaw/issues/15032) 子代理按 spawn 粒度工具限制（安全，2 月起，recovery-stuck）
- [#116474](https://github.com/openclaw/openclaw/issues/116474) Agent 响应不应静默触发另一个 agent 分发的 loop guard
- [#116470](https://github.com/openclaw/openclaw/issues/116470) 运行时 agent 注册表（CLI 可查 handle/capability/heartbeat）
- [#119472](https://github.com/openclaw/openclaw/issues/119472) Telegram 自动 TTS 语音消息以静默消息发送（disable_notification）
- [#87002](https://github.com/openclaw/openclaw/issues/87002) Telegram DM 消息去抖/聚合窗口（500–1000ms）

---

## 7. 用户反馈摘要

- **"修了但没完全修"的信任问题**：[#119282](https://github.com/openclaw/openclaw/issues/119282) 用户发现 `imsg rpc` stderr 仍被全量以 ERROR 级别记录，指出 #79610 标记 completed 但其修复 PR #79760 **从未合入**。这是流程断裂的典型案例——issue 关闭但修复没落地，用户需要自己追踪到 PR 层面。

- **Codex 提示词污染**：[#119338](https://github.com/openclaw/openclaw/issues/119338) 用户反馈 Codex 的 `tool_suggest` 默认开启，向 OpenClaw 提示词中注入大段 `<recommended_plugins>` 块，影响输出质量与 token 成本。诉求是默认关闭或由 OpenClaw 显式控制。

- **移动端体验粗糙**：[#119866](https://github.com/openclaw/openclaw/issues/119866) iOS 应用内系统键盘触觉反馈完全失效（其他 App 正常），用户怀疑是 `.playAndRecord` 音频会话压制；[#119472](https://github.com/openclaw/openclaw/issues/119472) Telegram 上每条文本回复 + TTS 语音触发**两次通知**。

- **"建议本身不可用"的挫败感**：[#119984](https://github.com/openclaw/openclaw/issues/119984) 中 `/new` 后系统提示"Try /new to start a fresh session"，但 `/new` 恰恰无法修复该问题——PR #120059 的摘要直接点出 "The advice in that message is the thing that..."，说明错误提示与修复路径自相矛盾。

- **会话幽灵创建风险**：[#87336](https://github.com/openclaw/openclaw/issues/87336) 用户基于 5 月 11 日事故：拼错的 session key 被 `sessions_spawn/send` 静默地创建成幽灵会话，请求增加 `createOnMiss=false` 严格模式，让未知 key 快速失败而非悄悄扩张状态。

- **好消息**：macOS 引导误报失败（#120050）已有 PR #119850 修复；心跳跳过原因 `target-none` 措辞误导（#44534）已关闭；技能 SKILL.md 规格不合规问题（#69475）已关闭。

---

## 8. 待处理积压

以下 Issue 长期未决、影响明确，提醒维护者关注：

| Issue | 开启时间 | 积压原因 | 影响 |
|---|---|---|---|
| [#15032](https://github.com/openclaw/openclaw/issues/15032) 子代理按 spawn 粒度工具限制 | 2026-02-12 | `needs-product-decision` + security review + recovery-stuck | 安全（prompt injection 防御），社区已提供完整 DMZ 方案 |
| [#42646](https://github.com/openclaw/openclaw/issues/42646) Memory MVP：SQLite schema 定义 | 2026-03-11 | 长期无 assignee | 路线图级：本地优先记忆系统的地基 |
| [#44289](https://github.com/openclaw/openclaw/issues/44289) secretref 参考文档自动生成 | 2026-03-12 | `fix-shape-clear` + `queueable-fix` 但未排期 | 文档防漂移，工程效率 |
| [#56781](https://github.com/openclaw/openclaw/issues/56781) 压缩/LCM fallback model chain | 2026-03-29 | `needs-product-decision` | 压缩静默失败 → 会话无界增长 |
| [#58139](https://github.com/openclaw/openclaw/issues/58139) memory-lancedb Windows Docker bind mount | 2026-03-31 | `needs-info` | Windows 用户本地记忆功能不可用 |
| [#71736](https://github.com/openclaw/openclaw/issues/71736) Control UI 插件贡献槽位 RFC | 2026-04-25 | security review + product decision | 插件 API 边界，社区关注度高（9 评论） |
| [#74580](https://github.com/openclaw/openclaw/issues/74580) 钩子的 state-only 权限级别 | 2026-04-29 | security review + product decision | 非捆绑插件需全量会话权限的问题 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步 SQLite 事务阻塞事件循环 | 2026-08-05 | `needs-maintainer-review`（新上报） | 规模化部署的核心性能瓶颈，36.7s 级卡顿 |

---

**总结**：OpenClaw 今日生态活跃度处于高位，PR 合入/关闭量（101 条）说明工程吞吐强劲，社区贡献者覆盖测试基建、平台修复、新 provider 接入等多个方向。但 **P0/P1 级会话状态与消息丢失类问题呈聚集态势**（#118772、#119971、#119984、#118185、#118018），且多数仍处于"有修复 PR 但未合入"或"无修复 PR"状态——项目健康度的短期关键变量是这些修复能否尽快进入主线发布。长期看，Agent Plugins 标准支持与插件 API 槽位化（#71736）是最值得关注的路线图信号。

---

## 横向生态对比

## 个人AI助手/自主智能体开源生态横向对比分析报告

**日期：2026-08-07**

---

### 1. 生态全景

当前个人AI助手与自主智能体开源生态处于**高活跃迭代期**，头部项目单日PR更新量达50–500条，社区贡献密度显著。但快速扩张同时带来稳定性承压，**会话状态丢失、上下文管理缺陷、工具调用可靠性**成为多项目共性问题。同时，以Agent Plugins 1.0.0（OpenAI/Vercel等五大厂商联合发布）为代表的开放标准开始渗透，插件互操作性与生态兼容成为新赛道。安全与权限边界（API Key泄漏、pipeline权限绕过、沙箱隔离）和可观测性需求同步上升，整体呈现“**功能扩张快、稳定性待加固、标准化初现**”的态势。

---

### 2. 各项目活跃度对比

| 项目 | Issue更新数 | PR更新数 | Release | 健康度评估 |
|---|---|---|---|---|
| OpenClaw | 126（关闭25） | 500（合并/关闭101） | 无 | 高活跃，但P0/P1消息丢失类问题聚集，短期风险高 |
| NanoBot | 10（关闭1） | 17（合并/关闭5） | 无 | 高活跃，安全修复增多，WebUI持续优化 |
| Zeroclaw | 11（关闭7） | 50（合并/关闭7） | 无 | 高活跃，S0漏洞快速闭环，但新增2个稳定性Bug |
| PicoClaw | 0 | 2（合并1） | 无 | 平稳，无突发问题，功能推进中 |
| NanoClaw | 2（关闭1） | 14（合并/关闭8） | 无 | 中活跃，清理积压+稳定性加固 |
| IronClaw | 42（关闭19） | 50（合并/关闭17） | **v1.1.0** | 高活跃，发布稳定版，但P1 bug积压超一个月 |
| LobsterAI | 5 | 4（合并0） | 无 | 中低活跃，合入停滞，stale项积压 |
| Moltis | 0 | 0 | 无 | 无活动 |
| CoPaw | 12（关闭4） | 50（合并/关闭27） | 无 | 高活跃，架构收敛中，Bug类Issue占比偏高 |

---

### 3. OpenClaw 在生态中的定位

- **社区规模碾压级**：单日PR更新500条（其他项目多在10–50条），Issue更新126条，贡献者覆盖面广，是当前生态绝对核心。
- **功能覆盖最全面**：从多渠道网关、会话状态管理、工具调用到插件生态均有完整实现，且今日跟进Agent Plugins 1.0.0标准（PR #120115），显示对生态标准的敏锐响应。
- **技术路线差异**：采用“agent runner + 网关”的模块化架构，强调会话状态持久化与跨渠道一致性，同时推进Control UI插件槽位（#71736），为UI扩展提供官方SDK边界，优于其他项目依赖私有patch的方式。
- **需警惕的风险**：P0/P1级问题（#118772 totalTokens膨胀、#119971 Codex误判致命错误）多为会话数据丢失类，若不能快速合入修复，可能动摇用户信任。但工程吞吐能力强（101条PR合并/关闭），修复节奏有望加快。

---

### 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **模型管理与故障转移** | OpenClaw、NanoBot、PicoClaw、CoPaw | 会话级模型切换（NanoBot #5198）、默认fallback链（PicoClaw #3200）、带冷却的模型故障转移（CoPaw #6659）、压缩fallback chain（OpenClaw #56781） |
| **上下文与记忆可靠性** | OpenClaw、IronClaw、CoPaw、NanoBot | 上下文窗口膨胀导致提前压缩（OpenClaw #118772）、FTS查询召回缺陷（IronClaw #7289）、超大工具输出卡死会话（CoPaw #6700）、裁剪丢弃主动消息（NanoBot #5273） |
| **插件/协议标准化** | OpenClaw、Zeroclaw、IronClaw、CoPaw | Agent Plugins 1.0.0支持（OpenClaw #120115）、A2A出站协议（Zeroclaw #9106）、MCP服务器注册（IronClaw）、AG-UI协议端点（CoPaw #6337） |
| **安全与权限边界** | OpenClaw、Zeroclaw、CoPaw、NanoBot | 子代理工具权限隔离（OpenClaw #15032）、pipeline权限绕过（Zeroclaw #7947）、循环模式安全门控失效（CoPaw #6773）、API Key泄漏（NanoBot #5270/5269） |
| **渠道体验精细化** | Zeroclaw、IronClaw、NanoClaw、CoPaw | Telegram命令超100条上限（Zeroclaw #8950）、Slack DM投递修复（IronClaw #7300）、Telegram回复/提及语义（NanoClaw #2644/#2643）、MCP工具周期性失效（CoPaw #6732） |

---

### 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构/关键特征 |
|---|---|---|---|
| **OpenClaw** | 全功能个人AI助手网关 | 自托管用户、开发者、团队 | 模块化Agent Runner + 多通道网关，强大会话管理，插件生态扩展中 |
| **NanoBot** | 轻量级WebUI优先、高易用性 | 个人用户、非深度技术用户 | Python实现（受Google MCP启发），WebUI拖拽、临时聊天、IDE化趋势 |
| **Zeroclaw** | 安全加固、协议前瞻（A2A） | 关注权限隔离的开发者、企业PoC | 强调per-agent策略，Telegram/Matrix深度适配，有WASM插件超时控制 |
| **PicoClaw** | 特定平台（QQ频道）深度适配 | 依赖QQ渠道的国内用户 | Go语言，富媒体消息支持，轻量级部署 |
| **NanoClaw** | 自动化运维、调度可靠性 | DevOps、个人自动化爱好者 | 强化定时任务、失败通知、更新事务化，skill体系规范化 |
| **IronClaw** | 团队协作、可观测性 | 团队/运维、MCP重度用户 | 发布1.1.0稳定版，新增Inspector运维诊断API，Slack/MCP集成深入 |
| **LobsterAI** | Windows桌面端体验 | Windows用户、非技术用户 | 基于PowerShell，提供图形化安装器与网关，侧重易用性 |
| **CoPaw** | AgentScope生态、Qwen模型优化 | Qwen用户、AgentScope开发者 | 对齐AgentScope 2.0生命周期，AG-UI协议，浏览器驱动自愈 |

---

### 6. 社区热度与成熟度

- **第一梯队（活跃度极高，日PR>50）**：OpenClaw、Zeroclaw、IronClaw、CoPaw。其中OpenClaw社区规模最大，Zeroclaw安全修复效率高，IronClaw刚发布稳定版开始质量巩固，CoPaw正加速AgentScope 2.0架构收敛。
- **第二梯队（中高活跃，日PR 10–50）**：NanoBot、NanoClaw。NanoBot在WebUI和安全方向快速迭代；NanoClaw以清理积压PR为主，处于稳定性加固期。
- **第三梯队（低活跃或停滞）**：PicoClaw、LobsterAI、Moltis。PicoClaw平稳推进，LobsterAI合入停滞，Moltis无活动。

**互补观察**：IronClaw是唯一在当日发布稳定版的项目，且已建立Operational Inspector体系，显示其从“功能扩张”转向“运维成熟度”；NanoClaw通过合并积压PR完成了调度与Telegram渠道的补全，属于典型的“质量巩固”阶段；OpenClaw虽体量最大，但P0/P1问题未合入是当前最明确的健康度隐患。

---

### 7. 值得关注的趋势信号

- **Agent Plugins 1.0.0开放标准将重塑插件生态**：OpenClaw当日即提交支持PR，其他项目虽未正式跟进，但MCP、AG-UI、A2A等多种协议并存，标准化整合是必然方向。
- **会话上下文管理成为稳定性核心矛盾**：多个项目同时出现上下文膨胀、压缩失败、超大输出导致卡死问题，开发者需将上下文预算管理、压缩触发机制、输出截断列为架构设计的基础设施。
- **模型故障转移从“可选”变为“必备”**：PicoClaw、CoPaw、OpenClaw均收到fallback相关请求，主模型限流/超时场景下的自动切换和冷却机制，将成为生产可用的关键能力。
- **安全边界从“粗粒度”走向“精细化”**：pipeline权限绕过（Zeroclaw）、循环模式门控失效（CoPaw）、API Key泄漏（NanoBot）等事件表明，开发者正将安全重点转向“最小权限执行链”和“敏感数据隔离”。
- **可观测性与运维诊断成为新焦点**：IronClaw推出Inspector API，NanoBot请求token消耗日志，OpenClaw有诊断流崩溃修复，说明单机助手正在向“可管理、可审计”的企业级形态演进。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报

**日期：2026-08-07**

---

## 1. 今日速览

过去 24 小时 NanoBot 保持高活跃度：共更新 10 条 Issue（新开/活跃 9，关闭 1）和 17 条 PR（待合并 12，合并/关闭 5），无新版本发布。社区讨论集中在**会话内模型切换**、**cronjob + subagent 工作流中断**以及**会话历史/API Key 安全**等方向。安全类修复显著增多，尤其是针对 API Key 泄漏和会话数据覆写的 P0/P1 PR 已提交待审。WebUI 侧持续推进体验优化，今日有性能优化、交互动效、拖拽会话等 5 个 PR 合并/关闭。

---

## 3. 项目进展

今日共有 5 个 PR 标记为合并/关闭，主要集中在 WebUI 体验、性能与 Matrix 通道修复：

- **WebUI 会话拖拽排序与引用**：[#5261](https://github.com/HKUDS/nanobot/pull/5261) 支持将侧边栏会话拖入 composer 生成结构化提及，并支持拖拽调整会话顺序。
- **WebUI 冷启动性能优化**：[#5262](https://github.com/HKUDS/nanobot/pull/5262) 为生产环境 WebUI 资源预生成 gzip 压缩副本，并优化 React 运行时拆包，降低首屏负载。
- **WebUI 动效统一与可访问性**：[#5267](https://github.com/HKUDS/nanobot/pull/5267) 统一过渡动画时长，修复 reduced motion 下的布局抖动。
- **临时会话内存态约束**：[#5259](https://github.com/HKUDS/nanobot/pull/5259) 明确临时聊天不写入会话历史、WebUI transcript 或自动记忆，仅驻留进程内存。
- **Matrix 自动入房兼容性修复**：[#5248](https://github.com/HKUDS/nanobot/pull/5248) 修复 nio `join()` 空 POST body 导致 Continuwuity 拒绝请求的问题，对应 Issue #5247 已关闭。

除此之外，今日新提交了多个高优先级修复 PR，包括会话数据防覆写（P0）、CLI 子进程 API Key 泄漏（P1）、Provider API Key 写入全局环境变量（P1）等，若合入将显著提升安全性与数据可靠性。

---

## 4. 社区热点

- **Issue #5198：会话内无法切换模型**（3 条评论，持续活跃）  
  https://github.com/HKUDS/nanobot/issues/5198  
  用户反馈 NanoBot 总是以配置中的首选模型运行，点击聊天输入框附近的模型标识无法切换，`/model` 命令使用其他模型 ID 也似乎不生效，除非重新配置整个实例。这是当前讨论热度最高的 Issue，反映用户对多模型工作流中“会话级切换模型”的强烈需求。

- **Issue #4290：cronjob 在 subagent 运行后提前结束**（2 条评论，已积压近两个月）  
  https://github.com/HKUDS/nanobot/issues/4290  
  用户报告 cronjob 中 spawn subagent 后，主 agent 没有机会处理 subagent 返回结果，导致后续工作流失败。该 Issue 自 6 月 10 日创建以来持续被关注，仍未看到对应修复 PR。

- **Issue #5276：会话级临时文件隔离**（1 条评论，今日仍有更新）  
  https://github.com/HKUDS/nanobot/issues/5276  
  用户建议在 `restrictToWorkspace` 和 bwrap 沙箱之外，增加会话级临时文件隔离，避免多个会话共享全局 `~/.nanobot/workspace` 造成状态污染。该讨论与今日新增的 #5278 安全问题形成呼应，说明 workspace 隔离正在成为社区关注焦点。

---

## 5. Bug 与稳定性

按严重程度排列：

- **P0：后台任务保存可能覆盖会话数据**  
  https://github.com/HKUDS/nanobot/pull/5271  
  `maybe_generate_webui_title` 等后台任务持有 `Session` 引用，在等待 `provider.chat_with_retry(...)` 期间如果用户执行 `/new`，旧引用可能将已清空的会话数据重新写回。PR #5271 已提交修复。

- **安全（P1）：API Key 泄漏风险**  
  - CLI 启动应用子进程时直接继承完整环境变量，可能将 Provider API Key 暴露给不可信子进程：[#5270](https://github.com/HKUDS/nanobot/pull/5270) 通过白名单环境变量修复。
  - Provider 将 API Key 写入进程全局 `os.environ`，多 Provider 场景下可能互相覆盖或泄漏：[#5269](https://github.com/HKUDS/nanobot/pull/5269) 已提交修复。

- **安全（新 Issue）：会话历史不应存放在 agent workspace 内**  
  https://github.com/HKUDS/nanobot/issues/5278  
  用户指出此前 PR #713 将会话存储移入 `<workspace>/sessions/`，虽然实现 per-workspace 隔离，但也让 agent 可读写会话历史，存在安全暴露风险。当前尚无对应修复 PR。

- **功能缺陷：session 裁剪丢弃主动投递消息**  
  https://github.com/HKUDS/nanobot/issues/5273  
  会话保留策略裁剪历史时，会丢弃紧邻用户消息之前的 `_channel_delivery` 类主动消息（如 cron 通知），导致上下文不完整。PR [#5272](https://github.com/HKUDS/nanobot/pull/5272) 已提交修复。

- **功能缺陷：历史消息接口不返回 `media_urls`**  
  https://github.com/HKUDS/nanobot/issues/5264  
  当附件位于 media root 之外（如 `projects/` 目录），`GET /api/sessions/{key}/messages` 无法返回签名的 `media_urls`，刷新后附件链接丢失。PR [#5268](https://github.com/HKUDS/nanobot/pull/5268) 已覆盖该场景。

- **功能缺陷：数值参数接受 `NaN`/`Infinity`**  
  https://github.com/HKUDS/nanobot/pull/5265  
  Tool 参数经过 `float()` 转换后可能接受非有限数值，进而传入底层工具。该 PR 会增加 JSON Schema 校验。

- **已修复：Matrix bot 自动入房失败**  
  https://github.com/HKUDS/nanobot/issues/5247  
  问题由 nio `Api.join()` 发送空 POST body 导致，PR #5248 已修复并关闭。

- **仍未修复：会话内模型切换不可用、cronjob+subagent 提前结束**  
  分别见 [#5198](https://github.com/HKUDS/nanobot/issues/5198) 与 [#4290](https://github.com/HKUDS/nanobot/issues/4290)，目前均无对应 fix PR。

---

## 6. 功能请求与路线图信号

- **会话级临时文件隔离**  
  https://github.com/HKUDS/nanobot/issues/5276  
  用户希望在现有沙箱基础上进一步隔离临时文件，适合多会话共享部署场景。与 #5278 安全议题共同指向 session 数据边界重构。

- **Matrix 线程与回复语义改进**  
  - [Issue #5274](https://github.com/HKUDS/nanobot/issues/5274)：bot 应使用 Matrix reply 功能回复用户消息，而不是总发顶层消息。
  - [Issue #5275](https://github.com/HKUDS/nanobot/issues/5275)：用户在 thread 中发起回复时，bot 应像 Discord/Slack 一样建立独立 context。  
  这说明 Matrix 通道已从“可用”走向“体验对齐”阶段。

- **Token 消耗可视化与日志**  
  https://github.com/HKUDS/nanobot/issues/5266  
  用户反馈 token 消耗异常巨大，希望记录每次调用的耗时与 token 数，属于可观测性/成本治理需求，未来可能进入监控相关迭代。

- **WebUI 方向持续扩张**  
  今日开放 PR 中有：模型预设内联编辑器 [#5277](https://github.com/HKUDS/nanobot/pull/5277)、临时聊天模式 [#5252](https://github.com/HKUDS/nanobot/pull/5252)、共享交互式项目终端 [#5253](https://github.com/HKUDS/nanobot/pull/5253)。若合入，WebUI 将更接近完整 IDE 化工作台。

- **Agent 记忆与搜索能力扩展**  
  PR [#5231](https://github.com/HKUDS/nanobot/pull/5231) 为 Dream 增加空闲会话归档，使短暂 idle 会话也能参与记忆整理；PR [#5234](https://github.com/HKUDS/nanobot/pull/5234) 引入 mst-python 作为 metasearch provider，丰富搜索来源。两者均为路线图中“更强自主 agent”方向。

---

## 7. 用户反馈摘要

- **多模型切换是真实痛点**（[#5198](https://github.com/HKUDS/nanobot/issues/5198)）：用户期望像 Cloud SaaS 一样点一下模型 blip 即可切换，而不是重新配置整个实例；`/model` 命令在当前版本中的表现也不符合预期。

- **自动化流水线对 subagent 协作敏感**（[#4290](https://github.com/HKUDS/nanobot/issues/4290)）：cronjob 场景下主 agent 丢失 subagent 结果是致命问题，导致后续 workflow 无法继续，说明 agent 间结果回传是稳定性的关键链路。

- **用户对 workspace 隔离有明确边界意识**（[#5276](https://github.com/HKUDS/nanobot/issues/5276)、[#5278](https://github.com/HKUDS/nanobot/issues/5278)）：有用户认可 session 隔离带来的技能演进能力，但也指出全局 workspace 共享和 session 历史落入 agent 可写目录会带来跨会话污染与安全风险，属于“既要共享又要隔离”的典型矛盾。

- **成本敏感用户希望看到细粒度 token 消耗**（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）：有用户报告两小时消耗数百万 token，但用户侧无明显活动，迫切需要调用级日志来定位“隐形消耗”。

---

## 8. 待处理积压

- **[#4290](https://github.com/HKUDS/nanobot/issues/4290) cronjob+subagent 导致工作流提前结束**  
  创建于 6 月 10 日，已积压 58 天，最近更新 8 月 6 日，有 2 条评论，仍无修复 PR。属于影响自动化可靠性的核心 Bug，建议维护者优先排查。

- **[#5198](https://github.com/HKUDS/nanobot/issues/5198) 会话内无法切换模型**  
  创建于 7 月 31 日，今日仍有更新，评论 3 条，当前无对应 PR。该 Issue 与多模型使用体验直接相关，热度较高。

- **[#5231](https://github.com/HKUDS/nanobot/pull/5231) Dream 空闲会话归档 PR**  
  8 月 3 日提交，已等待 review 4 天，涉及记忆功能增强，建议尽快 review 避免积压。

- **[#5234](https://github.com/HKUDS/nanobot/pull/5234) mst-python metasearch provider PR**  
  8 月 3 日提交，同样等待 review，属新 provider 集成，带有 P1 标签，但已 4 天未合入。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-08-07）

## 1. 今日速览

过去 24 小时项目活跃度**高**：累计 11 条 Issue 更新（其中 7 条关闭）、50 条 PR 更新（其中 7 条合并/关闭），未见新版本发布。值得关注的是，**4 个已关闭的 Issue 均有对应修复 PR 同批合并**，包括 1 个 S0 级安全漏洞（#7947 → #9737），显示出维护团队对社区反馈的闭环速度较快。同时今日新上报 2 个由核心维护者提交的运行时稳定性 Bug（#9799 高 CPU 占用、#9800 终端状态未恢复），为 0.8.4 版本的稳定性风险提供了重要线索。整体看，项目正处于**高频迭代与安全加固并行**的阶段。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日 7 条 PR 被合并/关闭，从公开数据中可确认 4 条重要合入，均直接对应已关闭 Issue，形成完整修复闭环：

| PR | 对应 Issue | 内容 | 意义 |
|---|---|---|---|
| [#9737](https://github.com/zeroclaw-labs/zeroclaw/pull/9737) fix(tools): enforce agent policy in pipelines | #7947（S0 安全漏洞） | `execute_pipeline` 构建前先解析每-agent 工具策略与调用方 allowlist，并将外层 registry 的内存/ACP 投递谓词应用于子工具与内置技能 | **修复了 confused deputy 安全漏洞**——此前 pipeline 子步骤仅受全局 `[pipeline].allowed_tools` 约束，绕过 per-agent 的 `ToolAccessPolicy`，属高危权限绕过。合入后 agent 级工具门控在 pipeline 执行链中完整生效 |
| [#8963](https://github.com/zeroclaw-labs/zeroclaw/pull/8963) fix(channels): cap Telegram bot commands | #8950 | 在 `register_bot_command` 中修复命令截断逻辑，避免 `setMyCommands` 因超出 100 条上限被 Telegram API 拒绝 | 修复了 v0.8.2 中 Telegram 频道每次守护进程启动时命令菜单无法注册的回归问题 |
| [#8927](https://github.com/zeroclaw-labs/zeroclaw/pull/8927) fix(providers): remove unconditional strip_think_tags | #8615 | 移除 compatible provider 对 `<think>` 标签的无条件剥除，仅对上游独立返回 `reasoning_content` 的场景做处理 | 修复了 MiniMax 等 OpenAI 兼容上游将思维链内联在 `content` 中时内容被静默删除的问题 |
| [#9659](https://github.com/zeroclaw-labs/zeroclaw/pull/9659) fix(docs): disambiguate contextual protected literals | #9657 | 仅当源条目提供产品上下文时，才将 `Signal`、`Filesystem` 等歧义注册名视为受保护字面量 | 修复了 mdBook 文档检查器将普通英文单词误判为产品名导致文档构建告警的问题 |

**综合判断**：项目在 24 小时内完成了「安全漏洞修复 + 两个渠道/Provider 稳定性修复 + 文档工具链修复」，尤其安全修复的快速合入表明维护者对高危漏洞的响应优先级很高。当前仍有 43 个 PR 处于待合并状态，其中包含多个大型功能分支（Matrix 进度草稿、Anthropic OAuth、上下文压缩比率等），后续合入节奏值得关注。

---

## 4. 社区热点

**#8692 [Maintainer decision queue for RFCs and design issues]**（评论 11，OPEN）
https://github.com/zeroclaw-labs/zeroclaw/issues/8692

这是一个**维护者决策追踪器**，用于排队需要 maintainer/code-owner 裁决的 RFC、设计问题、发布策略与协作追踪事项。11 条评论的活跃度说明**项目内部存在一批待决策的技术方向问题**，而该 tracker 的创建本身也是社区对「决策透明化、避免 RFC 石沉大海」诉求的响应。值得注意的是它带有 `status:accepted` 和 `status:no-stale` 标记，说明已被正式采纳为长期运转机制。

**#9106 [RFC: A2A outbound client (A2ATool)]**（评论 11，OPEN，risk: high）
https://github.com/zeroclaw-labs/zeroclaw/issues/9106

这是目前**最值得关注的架构级功能需求**。背景是 #3566 将 A2A 支持拆分为 A2AServer（入站，已在 v0.8.2 随 gateway 发布）和 A2ATool（出站），而当前 ZeroClaw agent **无法主动调用外部符合 A2A 协议的 agent**，agent 间协作只能通过渠道强制中转。该 RFC 累计 11 条评论、`risk: high`，已获 `status: accepted`，说明社区对**跨 agent 直接协作**的需求强烈，且讨论焦点集中在协议兼容性与安全边界上。这个方向的落地将显著影响项目在 multi-agent 领域的定位。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 修复状态 |
|---|---|---|---|
| **S0 安全风险** | [#7947](https://github.com/zeroclaw-labs/zeroclaw/issues/7947) `execute_pipeline` bypasses per-agent tool gating（confused deputy） | pipeline 子工具仅按全局配置鉴权，无视调用 agent 的 `ToolAccessPolicy`，属于权限绕过 | ✅ 已修复，PR [#9737](https://github.com/zeroclaw-labs/zeroclaw/pull/9737) 合入 |
| **S2 内容丢失** | [#8615](https://github.com/zeroclaw-labs/zeroclaw/issues/8615) compatible provider 无条件剥离 `<think>` 标签 | 内联思维链被强制删除，未闭合标签导致空回复，用户不可见地丢失内容 | ✅ 已修复，PR [#8927](https://github.com/zeroclaw-labs/zeroclaw/pull/8927) 合入 |
| **S2 功能受损** | [#8950](https://github.com/zeroclaw-labs/zeroclaw/issues/8950) Telegram 命令菜单注册失败（BOT_COMMANDS_TOO_MUCH） | 工具+技能+内置命令超 100 条时 `setMyCommands` 被 API 拒绝，每次启动都报错 | ✅ 已修复，PR [#8963](https://github.com/zeroclaw-labs/zeroclaw/pull/8963) 合入 |
| **S2 功能受损** | [#9657](https://github.com/zeroclaw-labs/zeroclaw/issues/9657) 文档保护字面量误判 "Signal" | 因 `Signal` 是注册频道名，文档中所有独立单词 "Signal" 都被误判为产品字面量 | ✅ 已修复，PR [#9659](https://github.com/zeroclaw-labs/zeroclaw/pull/9659) 合入 |
| **S2 测试不稳定** | [#9763](https://github.com/zeroclaw-labs/zeroclaw/issues/9763) flaky test: onepassword_reference_load_does_not_block_runtime_worker | CI 负载下基于墙钟时间的断言不稳定，影响 CI 可靠性 | ⚠️ 未见对应修复 PR |
| **待确认** | [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) Bedrock Nova 2 Lite 随机缓存报错 | 用户希望支持通过配置禁用 cachePoint，已关闭但未看到明确修复说明 | ⚠️ 已关闭，未确认修复方式 |
| **新增** | [#9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799) **长生命周期 ephemeral daemon CPU 超 100%** | 0.8.4 debug daemon 运行 17 小时后 CPU 持续 140–177%，`lsof` 显示大量重复数据库句柄、关闭的 Telegram socket | ⚠️ 今日新报，待处理 |
| **新增** | [#9800](https://github.com/zeroclaw-labs/zeroclaw/issues/9800) **SIGTERM 后终端 raw/mouse-tracking 模式未恢复** | TUI 被 SIGTERM 终止后终端残留特殊模式，鼠标活动打印 SGR 序列，需手动 `reset` | ⚠️ 今日新报，待处理 |

**重点风险提示**：#9799 和 #9800 均由核心维护者 @Audacity88 在今日提交，分别指向**资源泄漏**（数据库句柄重复打开）和**终端状态恢复缺陷**，均影响 0.8.4 版本的长时间运行体验。考虑到 #9799 有 17 小时持续高 CPU 的表现，建议优先排查句柄泄漏路径。

---

## 6. 功能请求与路线图信号

以下功能请求/设计已有明确推进，可能进入下一版本：

**已 accepted 的 RFC**
- [#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) **A2A outbound client（A2ATool）** — `status: accepted`，risk: high。一旦落地，ZeroClaw agent 将具备主动调用外部 A2A 兼容 agent 的能力，补齐双向 agent 协作拼图。

**已有实现 PR 在途的功能**

| 功能 | Issue / PR | 状态 |
|---|---|---|
| **上下文压缩锚定到模型窗口比例** | PR [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) feat(runtime): anchor context compaction to model window ratio | OPEN，新增 `runtime_profiles.<name>.context_compact_ratio` 设置，比例模式为 opt-in，保留旧版绝对预算行为 |
| **Anthropic 存储型 OAuth 配置文件支持** | PR [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) fix(anthropic): support stored OAuth profiles | OPEN，增加 `auth_mode = "oauth"`，每个 alias 只从同名存储配置解析凭证 |
| **WASM 插件墙钟超时限制** | PR [#9403](https://github.com/zeroclaw-labs/zeroclaw/pull/9403) fix(plugins): bound WASM exports by a wall-clock deadline | OPEN，新增 `plugins.limits.call_timeout_ms`（默认 30s），防止插件无限期阻塞宿主 |
| **Telegram 媒体组批量发送** | PR [#8955](https://github.com/zeroclaw-labs/zeroclaw/pull/8955) fix(telegram): batch media group attachments | OPEN，支持相册跨 `getUpdates` 响应聚合为同一轮 agent 会话 |
| **Telegram 群聊 per_user_session 开关** | PR [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) feat(telegram): add per_user_session toggle | OPEN，解决多人协作同一群组时共享 sender scope 导致上下文串扰的问题 |
| **安全策略：forbidden_paths 支持 glob 模式** | PR [#9776](https://github.com/zeroclaw-labs/zeroclaw/pull/9776) feat(security): extend forbidden_paths with workspace-relative glob patterns | OPEN，新增 `ForbiddenPatternSet` 分类匹配（glob/精确路径/目录前缀/basename） |
| **Gateway WebSocket keepalive** | PR [#9701](https://github.com/zeroclaw-labs/zeroclaw/pull/9701) feat(gateway): keep chat WebSockets alive | OPEN，新增 `[gateway].websocket_ping_interval_secs` 配置，防止 Web UI 长连接被中间层断开 |
| **Eval 基线与回归门禁** | PR [#9221](https://github.com/zeroclaw-labs/zeroclaw/pull/9221) feat(eval): baseline files with paired regression gating | OPEN，引入 git 版本化基线与逐用例回归 diff，为 #7065 Phase 2 的一部分 |

**路线图信号**：#9172（单一命令描述符来源）已关闭，暗示 ZeroCode slash command 体系重构可能已完成设计或进入实现；连同 #9535 的上下文管理优化，下一版本在 **agent 可观测性、配置灵活性和安全边界** 三个方向有明显发力。

---

## 7. 用户反馈摘要

从今日更新的 Issue 评论中可提炼以下真实用户声音：

- **Bedrock Nova 2 Lite 用户的缓存配置困境（#8720）**：用户 @ngamradt 明确表示「I can use it, but I am randomly getting a caching error. I want to disable the caching feature」——说明在使用新模型时，平台侧缓存机制与模型的兼容性问题会直接影响可用性，用户期望通过配置文件获得**细粒度的模型行为开关**，而不是依赖默认值。

- **Telegram 高频场景下的命令上限冲击（#8950）**：当用户启用的工具、技能和内置命令合计超过 100 条时，Telegram 的 `setMyCommands` 直接 400 拒绝，且每次守护进程启动都会复现。该用户使用的还是 v0.8.2 release binary（macOS arm64），说明这一问题是**较长生命周期配置演进后的必然碰撞**——默认截断策略未能自动适配 Telegram 的 API 限制。

- **OpenAI-compatible 上游的内容静默丢失（#8615）**：用户 @NiuBlibing 指出，MiniMax 等推理模型将思维链内联在 `content` 中时，compatible provider 的「无条件剥离」策略导致用户**在无感知的情况下丢失了部分回复内容**，且未闭合标签还会产生空回复。这类问题比显式报错更危险，因为它侵蚀用户对输出的信任。

- **维护者自身的 dogfooding 反馈（#9799、#9800）**：两个新 Bug 均由 @Audacity88 提交，且描述详尽（含 17 小时运行数据、`lsof` 输出、复现步骤）。这说明**核心团队正在高频使用 0.8.4 的 daemon 与 TUI 模式**，并愿意将自身遇到的稳定性问题第一时间公开归档，是项目健康度的一个积极信号。

---

## 8. 待处理积压

**需维护者决策/关注的长期开放项**：

| 项目 | 类型 | 创建时间 | 当前状态 | 关注原因 |
|---|---|---|---|---|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) Maintainer decision queue for RFCs and design issues | Tracker | 2026-07-04 | OPEN，11 评论 | 本身即「决策积压」的显式化。建议维护者审视队列中的 RFC 是否有超期未裁决项，避免设计决策成为迭代瓶颈 |
| [#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) A2A outbound client（A2ATool） | RFC | 2026-07-16 | OPEN，accepted，risk: high | 架构级能力，已 accepted 但尚无对应实现 PR。考虑到涉及跨 agent 协议与安全模型，建议明确排期或拆分里程碑 |
| [#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443) feat(matrix): single-message progress drafts | PR | 2026-06-28 | OPEN，40 天未合并 | 大型功能 PR（size: XL，risk: high），涉及 Matrix 流式消息与工具溯源，长时间停留 open 状态需确认是否存在阻塞性 review 意见 |
| [#8496](https://github.com/zeroclaw-labs/zeroclaw/pull/8496) fix(tools/mcp): centralize deferred-MCP access policy | PR | 2026-06-29 | OPEN，带 `needs-author-action` 标签 | MCP 访问策略是安全相关修复（对应 #8054），且已标记需要作者回应，建议跟进避免安全修复滞留 |
| [#9221](https://github.com/zeroclaw-labs/zeroclaw/pull/9221) feat(eval): baseline files with paired regression gating | PR | 2026-07-20 | OPEN，带 `needs-author-action` | 评估体系是项目长期质量基座，PR 体积 XL，建议维护者给出明确的分阶段合入计划 |
| [#9403](https://github.com/zeroclaw-labs/zeroclaw/pull/9403) fix(plugins): bound WASM exports by a wall-clock deadline | PR | 2026-07-26 | OPEN，priority: p1 | WASM 插件无限期阻塞属于稳定性风险，p1 优先级与当前 open 状态不匹配，建议尽快进入合并流程 |

**观察**：#8692 tracker 目前是理解项目「决策瓶颈」的关键入口——RFC、设计问题、发布策略等都在排队等待 maintainer 裁决。结合今日 `accepted` 状态的 #9106 尚无实现，以及多个大型 PR 长期在途，**维护者带宽可能是当前项目迭代速率的主要约束**。建议社区在下一期规划中考虑增加 maintainer 轮值或 code-owner 分身机制。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-07

> 数据来源：github.com/sipeed/picoclaw | 统计区间：2026-08-06 ~ 2026-08-07

## 1. 📋 今日速览

过去24小时内，PicoClaw 项目 **Issues 无新增/关闭**，**PR 有 2 条活跃记录**（其中 1 条合并关闭、1 条仍在讨论中），**无新版本发布**。整体活跃度处于健康但平稳的水平——无突发 Bug 报告，项目功能演进仍在持续推进，尤其是 QQ 频道附件支持能力获得实质性增强。Model Fallback Chain 相关 PR 仍处于开放状态，值得持续关注。

---

## 2. 🚀 版本发布

**无新版本发布**。最新 Releases 仍为空，项目可能处于功能开发密集期，距离下一次正式发版尚有时日。

---

## 3. 🛠️ 项目进展

过去24小时内，**1 个 PR 已合并/关闭，1 个仍处于开放状态**。 以下是重点关注内容：

### ✅ 合并：QQ 频道附件类型支持增强
**[#1349 [CLOSED] feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349)**
- **作者**: @aishannon
- **创建**: 2026-03-11 | **关闭**: 2026-08-06
- **类型**: enhancement / domain: channel / go

**合并内容摘要**：
1. 支持解析 QQ 频道 emoji 结构
2. 支持处理来自 QQ 频道的语音、图片、视频和文件消息
3. 支持回复时上传本地语音、图片、视频和文件附件（发送前先上传）
4. 回复消息时优先使用 Markdown 格式，失败后自动降级

**评估**：该 PR 从创建到合并历时近 5 个月，将 PicoClaw 的 QQ 频道适配能力提升了一个台阶——从文本交互扩展到富媒体交互，补全了多模态消息处理的关键拼图。这是本周项目在**集成能力**方向上的一个重要推进。

---

## 4. 🔥 社区热点

由于过去 24 小时 Issues 层面无更新，社区讨论热度主要集中在两条 PR 上。

### 最受关注 PR（按讨论活跃度排序）

1. **[#3200 [OPEN] feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200)**
   - 作者: @lc6464 | 创建: 2026-07-01 | 最近更新: 2026-08-06
   - 核心诉求：支持在 Web UI 中配置默认模型回退链，并通过后端 API 持久化配置。

2. **[#1349 [CLOSED] feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349)**
   - 作者: @aishannon | 创建: 2026-03-11 | 最近更新: 2026-08-06
   - 核心诉求：丰富 QQ 频道的附件解析与回复能力。

**分析**：#3200 的持续活跃反映出社区对**模型管理灵活性和可用性**的强烈需求——用户希望在多个模型之间自动切换，但当前缺少一个直观易用的配置界面。#1349 的关闭则为 QQ 频道用户带来了更完整的富媒体交互体验。

---

## 5. 🐛 Bug 与稳定性

过去 24 小时**无新增 Bug/崩溃/回归问题报告**。

Issues 层面数据为 0，说明项目当前处于相对稳定的窗口期。没有需要按严重程度排序的修复事项。

---

## 6. 💡 功能请求与路线图信号

虽然今日无新 Issues 提交，但结合现有 PR 状态，以下功能信号值得关注：

### 信号一：模型回退链（高概率进入下一版本）
- **来源**: [#3200](https://github.com/sipeed/picoclaw/pull/3200)
- **请求内容**：在 Web UI 中配置默认模型、添加备用模型、调整回退顺序，并通过后端 API 持久化。
- **判断依据**：该 PR 已开放超过一个月仍在活跃更新，说明开发者在认真打磨。一旦合并，将直接提升项目的生产可用性，适合作为下一版本的核心卖点之一。

### 信号二：QQ 频道富媒体支持（已落地）
- **来源**: [#1349](https://github.com/sipeed/picoclaw/pull/1349)
- **状态**：已合并，将随下一个版本发布。
- **影响**：对依赖 QQ 频道作为消息入口的用户来说，这是一个刚需增强，预计会提升 QQ 渠道的采用率。

---

## 7. 👥 用户反馈摘要

由于今日无新的 Issues 更新，且近24小时无新增评论，暂无法从今日数据中提炼新的用户反馈。

**基于现有数据的推断**：
- 用户对 QQ 渠道的富媒体支持有明显期待（PR #1349 的持续跟进即证明）
- 用户对模型管理的自动化需求正在积累（PR #3200 的长期开放状态）

> ⚠️ 注：两个 PR 的评论数均显示 undefined，无法获取更细粒度的用户互动数据。

---

## 8. 📌 待处理积压

### 需重点关注：模型回退链 PR 已等待 38 天
**[#3200 feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200)**
- **创建时间**: 2026-07-01
- **最近更新**: 2026-08-06（仍在活跃修改）
- **提示**：该 PR 已存在超过一个月，涉及 Web UI 改动和 API 持久化，属于中等偏大范围的功能。建议维护者尽快完成 Review 并给出明确意见（合并或要求改动），避免长期悬置给社区传递不确定信号。

---

**日报总结**：PicoClaw 项目今日处于**平稳推进**状态——既有功能落地（QQ 附件支持），也有新功能在途（模型回退链），无稳定性问题爆发。项目整体健康度良好，但需要关注 #3200 的推进节奏，以避免功能积压。

---
*本日报由 AI 自动生成，数据基于 2026-08-07 前的 GitHub 公开信息。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-07

## 1. 今日速览

过去 24 小时 NanoClaw 仓库保持较高活跃度：共 2 条 Issue 更新（1 条新开、1 条关闭），14 条 PR 更新（6 条待合并、8 条已合并/关闭），无新版本发布。值得关注的是核心维护者 @glifocat 在报告 `/update-nanoclaw` 更新机制存在"不可恢复切换点"缺陷（#3194）的同时，24 小时内即提交了事务化修复 PR（#3195），响应速度很快。此外，一批 5-6 月积压的调度、Telegram、用户 ID 命名空间等修复 PR 在近两天集中合并，项目整体处于"清理积压 + 稳定性加固"的收敛阶段。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

过去 24 小时共有 8 条 PR 合并/关闭，多项长期积压修复落地，项目在以下方面取得实质推进：

- **清理失效内置技能**：[#3172](https://github.com/nanocoai/nanoclaw/pull/3172) 移除依赖外部未配置服务的 `get-qodo-rules`、`qodo-pr-resolver` 及 Google MCP skills，直接关闭 Issue #3171。
- **调度模块健壮性提升**（作者 @yairixStudio 两项修复同时落地）：
  - [#2678](https://github.com/nanocoai/nanoclaw/pull/2678)：定时任务永久失败后重新武装下一次循环，避免任务链断裂。
  - [#2679](https://github.com/nanocoai/nanoclaw/pull/2679)：新增 `notifyFailedTasks` 钩子，将永久失败的定时任务主动通知用户，替代仅记录日志。
- **Telegram 渠道交互补全**：
  - [#2644](https://github.com/nanocoai/nanoclaw/pull/2644)：`extractReplyContext` 现在可识别"回复机器人自身消息"，正确设置 `isReplyToBot`。
  - [#2643](https://github.com/nanocoai/nanoclaw/pull/2643)：路由器的 `pattern` 模式接线现在能响应直接 @提及、DM 和 reply-to-bot，即使文本本身不含关键词。
  - [#2213](https://github.com/nanocoai/nanoclaw/pull/2213)：接受无文字说明的纯媒体消息（照片/视频/文件），不再静默丢弃。
- **用户 ID 命名空间修复**：[#2591](https://github.com/nanocoai/nanoclaw/pull/2591) 将用户 ID 改为按 channel-type 前缀而非裸冒号命名，消除跨渠道 ID 冲突。
- **/update-skills 预检拆分**：[#2873](https://github.com/nanocoai/nanoclaw/pull/2873) 将预检逻辑与凭据逻辑拆分，使 `/update-skills` 可独立刷新技能代码。

整体来看，Telegram 渠道的消息完整性和调度模块的失败处理能力是本次合并的主要受益方向，项目正向更稳定、更可维护的状态迈进。

## 4. 社区热点

今日所有 Issue/PR 均为 0 评论、0 表情反应，讨论热度较低。但有两个形成"问题-修复"闭环的议题值得关注：

- **[#3194](https://github.com/nanocoai/nanoclaw/issues/3194) [OPEN] `/update-nanoclaw` 可能在不具备可恢复切换点的情况下标记成功**（@glifocat，2026-08-06 创建）：指出更新流程存在四个失败窗口——回滚点只保护 Git，不保护 SQLite 数据库、gitignored 配置及更新过程中被改动的外部组件。同作者已在次日提交修复 PR [#3195](https://github.com/nanocoai/nanoclaw/pull/3195)（事务化升级），形成紧密的 issue-fix 配对。
- **[#3171](https://github.com/nanocoai/nanoclaw/issues/3171) [CLOSED] 两个 qodo skills 依赖未配置的集成并拦截正常编码请求**（@glifocat，2026-08-01 创建，8-06 关闭）：用户报告捆绑的 `get-qodo-rules` 和 `qodo-pr-resolver` 依赖仓库中从未设置的 Qodo SaaS 账号，从 `~/.qodo/config.json` 读取 API key，且会拦截正常编码请求。该 Issue 已由 #3172 的移除 PR 关闭。

两个热点反映了同一类社区诉求：**内置功能不应依赖隐式外部配置，且失败场景必须可感知、可回滚**。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 编号 | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#3194](https://github.com/nanocoai/nanoclaw/issues/3194) | `/update-nanoclaw` 在通过验证前即切换运行中 checkout，回滚点不覆盖 SQLite 数据库、gitignored 配置与外部组件，存在四个失败窗口，可能"假成功" | 已有对应修复 PR [#3195](https://github.com/nanocoai/nanoclaw/pull/3195)（OPEN，core-team） |
| 🟠 中 | [#3171](https://github.com/nanocoai/nanoclaw/issues/3171) | 两个捆绑 skill 依赖未配置的 Qodo 外部集成，读取不存在的配置文件并拦截正常编码请求 | 已修复（#3172 移除 skills，Issue 已关闭） |
| 🟡 中 | [#2705](https://github.com/nanocoai/nanoclaw/pull/2705) | `use-native-credential-proxy` 实际未绕过 OneCLI gateway：`nativeCredentialsEnabled()` 只读 `process.env`，在真实 launchd/systemd 安装下静默回退到 gateway，凭据行为与文档不符 | OPEN，待 review，已积压约 2 个月 |
| 🟢 已修复 | [#2213](https://github.com/nanocoai/nanoclaw/pull/2213) / [#2678](https://github.com/nanocoai/nanoclaw/pull/2678) / [#2644](https://github.com/nanocoai/nanoclaw/pull/2644) / [#2643](https://github.com/nanocoai/nanoclaw/pull/2643) / [#2591](https://github.com/nanocoai/nanoclaw/pull/2591) | 纯媒体消息被静默丢弃、定时任务失败后不再循环、Telegram 无法识别回复 bot、@提及/直聊不触发 wiring、用户 ID 命名空间冲突 | 均已合并/关闭 |

## 6. 功能请求与路线图信号

- **Tavily MCP 搜索工具**（[#3190](https://github.com/nanocoai/nanoclaw/pull/3190)，OPEN）：新增 utility skill，通过 Tavily 提供外部搜索能力。若合并，将为 agent 增加实时信息检索工具，符合"扩展渠道与集成"方向。
- **Telegram 富消息支持**（[#3193](https://github.com/nanocoai/nanoclaw/pull/3193)，OPEN）：更新 Chat SDK 以支持富消息，与已合并的 #2213（纯媒体消息）互补，Telegram 渠道能力持续补全。
- **skill 宿主接缝（host seams）重构**（[#3186](https://github.com/nanocoai/nanoclaw/pull/3186)，OPEN）：为 skill 自有能力增加宿主接缝，属架构级可扩展性改进，可能为后续更多 skill 能力注入铺路。
- **CLI 挂载读写标志**（[#3149](https://github.com/nanocoai/nanoclaw/pull/3149)，OPEN）：为 `groups config add-mount` 增加 `--rw` 标志，小型 CLI 增强。

结合近期合并的 #2873（预检/凭据拆分）与 #3172（移除失效 skills），可判断当前路线图重点为：**skill 体系规范化 + 渠道消息处理补全**。Tavily 与 Telegram 富消息 PR 如通过 review，预计进入下一版本。

## 7. 用户反馈摘要

今日 Issue/PR 条目均无评论互动，直接用户反馈有限，以下提炼自 Issue 描述中的使用场景：

- **对内置技能"开箱即用"的期望**（#3171）：用户指出捆绑技能依赖"仓库里没有任何设置"的外部 SaaS 服务，且会主动拦截正常编码请求——这类行为严重违背内置功能开箱即用的预期，也干扰正常工作流。项目方处理方式（直接移除而非补配置文档）体现了"不维护即下线"的干净策略。
- **对更新安全性的信任问题**（#3194）：描述的场景一旦发生——更新失败但数据库/配置已被改动、无法回滚、却显示成功——对用户数据安全和自动化运维影响较大。用户强调"无可恢复切换点（recoverable cutover）"，反映对更新操作透明度和可恢复性的高要求。
- **多渠道消息完整性的真实痛点**（#2213 关联场景）：用户发送无说明文字的照片/视频/文件时消息被静默丢弃，这是高频真实使用场景；该修复落地后 Telegram 等渠道的媒体消息能力将补齐。

## 8. 待处理积压

- **[#2705](https://github.com/nanocoai/nanoclaw/pull/2705)（OPEN，2026-06-07 创建，已积压 2 个月）**：`use-native-credential-proxy` 绕过 OneCLI gateway 的修复。涉及凭据安全，真实安装环境下会静默回退到 gateway，建议维护者优先 review。
- **[#3149](https://github.com/nanocoai/nanoclaw/pull/3149)（OPEN，2026-07-29 创建，已 9 天）**：CLI `groups config add-mount` 增加 `--rw` 标志，小型改动，等待 review。
- **[#3186](https://github.com/nanocoai/nanoclaw/pull/3186)（OPEN，2026-08-04 创建）**：skill 宿主接缝重构，架构级改动，需要核心维护者评估设计方向。
- **[#3195](https://github.com/nanocoai/nanoclaw/pull/3195)（OPEN，2026-08-06 创建，core-team）**：事务化升级修复，与高严重度 bug #3194 直接相关，建议尽快安排 review 与回归测试。

---

**项目健康度小结**：无新版本发布但 PR 合并率较高（8/14），Issue 关闭率 50%（1/2），高严重度 bug 均有对应的 fix PR 在 24 小时内跟进，维护者响应积极。需关注两点：一是 #2705 的长期积压（2 个月）可能影响凭据安全相关用户；二是 #3194 所揭示的更新流程设计缺陷，在修复合并前，用户升级时仍面临数据/配置无法回滚的风险。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-07

## 1. 今日速览

过去 24 小时项目活跃度处于高位：**42 条 Issue 更新**（新开/活跃 23 条、关闭 19 条）、**50 条 PR 更新**（待合并 33 条、合入/关闭 17 条），并发布 **1.1.0 稳定版**。开发重心落在 Inspector 运维诊断（API 已合入，前端与模型统计跟进中）与多项可靠性修复（FTS 召回、Docker 健康检查、文档泄露）上。与此同时，6 月底遗留的 P1 例程 bug（#5456、#5415）仍未分配 fix，QA bug 积压超过一个月，是当前最大的健康度风险。

## 2. 版本发布

### ironclaw-v1.1.0（2026-08-06 发布）
链接：https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.1.0

- **定位**：1.0.0 以来首个稳定版，将 `1.1.0-rc.1` 转正并包含其后的修复。
- **核心新能力**（Release Notes 可读部分）：
  - 注册任意托管的 MCP 服务器
  - 通过 IronHub 深链接安装
  - 跨渠道持久文件附件
  - Slack 相关增强（Release Notes 被截断，完整内容待查）
- **破坏性变更**：无明确说明。由于 Release Notes 不完整，建议升级用户关注 #5508（Slack 投递目标）和 #5522（Slack DM 读取）等 Slack 相关 issue，确认升级后行为符合预期。

## 3. 项目进展

今日合并/关闭并推进项目的关键 PR：

- **#7235 feat(inspector): 操作员检查 API + 实时诊断流**（已合入）— 新增仅操作员可用的诊断快照、Prompt 检查、工具详情读取和实时事件流 API，支持游标续传、去重和保活。关闭了 #7220。
  链接：https://github.com/nearai/ironclaw/pull/7235
- **#7259 docs: 强制 docs/ 发布边界**（已合入）— 修复 `docs/design` 与 `docs/research` 在公开 Mintlify 站点上作为隐藏页面 URL 可直达的泄露问题，并增加 CI 门禁防止回归。
  链接：https://github.com/nearai/ironclaw/pull/7259
- **#7303 fix(docker): 安装 curl 使 orchestrator 健康检查可用**（已合入）— 修复 1.1.0 镜像因缺少 curl 导致节点状态显示 error 的问题。
  链接：https://github.com/nearai/ironclaw/pull/7303
- **#7289 fix(memory): 净化 FTS 查询，libSQL 自然语言召回可用**（已合入）— 关闭 #7275，修复跨会话持久记忆召回缺陷，对函数词标准化并对 FTS5 查询词加引号。
  链接：https://github.com/nearai/ironclaw/pull/7289

进行中的重点 PR（路线图信号较强）：

- **Inspector 前端三件套**：#7236（debug panel shell）、#7239（Prompt 检查与 Prompt 标签页）、#7277（模型调用统计）均待合并，预计构成完整的运维诊断界面。
  链接：https://github.com/nearai/ironclaw/pull/7236 | https://github.com/nearai/ironclaw/pull/7239 | https://github.com/nearai/ironclaw/pull/7277
- **#7288 fix(filesystem): libSQL FTS 改为纯文本契约**（OPEN）— 与 #7289 配合，在文件系统边界修复自然语言召回。
  链接：https://github.com/nearai/ironclaw/pull/7288
- **#7300 fix(slack): 恢复个人 DM 投递 + 标准化 canary**（OPEN）— 修复 OAuth 后个人 DM 目标缺失问题。
  链接：https://github.com/nearai/ironclaw/pull/7300
- **#7309 fix(auth): OAuth scope 为空时省略该参数**（OPEN）— 关闭 #7308，修复 RFC 6749 协议违规。
  链接：https://github.com/nearai/ironclaw/pull/7309
- **#7305 fix(webui): 软化失败工具摘要的红色告警**（OPEN）— 关闭 #7302。
  链接：https://github.com/nearai/ironclaw/pull/7305

此外，过去 24 小时关闭了 19 个 issue，包括 #3533（Telegram 自动设置）、#5504（例程创建挂起）、#5557（日志深链）等长期 bug。

## 4. 社区热点

评论最多的 Issues：

- **#5553 审批通知消失**（4 评论，OPEN，P2）— 审批通知点击后消失或根本不出现。
  链接：https://github.com/nearai/ironclaw/issues/5553
- **#5702 GitHub issue 搜索/创建 HTTP 403**（4 评论，OPEN，P2）— 集成已配置但完全不可用。
  链接：https://github.com/nearai/ironclaw/issues/5702
- **#5522 Slack DM 读取缺失 + capability_info 重试循环**（3 评论，OPEN）— 例程因缺少 Slack 读取能力而失败并陷入重试。
  链接：https://github.com/nearai/ironclaw/issues/5522
- **#5701 活动面板隐藏工具详情且不实时更新**（3 评论，OPEN，P2）— 用户无法在运行中观察工具调用。
  链接：https://github.com/nearai/ironclaw/issues/5701

**热点分析**：高评论 issue 集中在**通知可靠性**和**第三方集成可用性**上，都是在 agent 自主运行场景下的关键体验点。用户的隐含诉求是：运行过程要有历史可查、失败要有明确原因、第三方工具要开箱即用。

## 5. Bug 与稳定性

按严重程度排列（标注 fix 状态）：

### P1（高）
- **#5456 runner lease 过期导致例程失败**（6/30 创建，OPEN）— 90 秒不活动阈值对多工具例程过严，是 6/30 测试的主要失败模式。**无 fix PR**。
  链接：https://github.com/nearai/ironclaw/issues/5456
- **#5415 多工具 Google Sheets 工作流协议违规**（6/29 创建，OPEN）— 18-25 次工具调用后一致性失败。**无 fix PR**。
  链接：https://github.com/nearai/ironclaw/issues/5415

### P2（中）
- **#5553 审批通知消失**（OPEN）— **无 fix PR**。
  链接：https://github.com/nearai/ironclaw/issues/5553
- **#5702 GitHub API 403**（OPEN）— **无 fix PR**。
  链接：https://github.com/nearai/ironclaw/issues/5702
- **#5707 例程创建响应暴露内部实现细节**（OPEN）— 用户看到 cron 语法、trigger ID 等开发信息。**无 fix PR**。
  链接：https://github.com/nearai/ironclaw/issues/5707
- **#5508 Slack 已连接但报无投递目标**（OPEN）— **#7300 部分覆盖**。
  链接：https://github.com/nearai/ironclaw/issues/5508
- **#5509 聊天创建延迟随历史增长**（OPEN）— 删除聊天历史可恢复性能。**无 fix PR**。
  链接：https://github.com/nearai/ironclaw/issues/5509
- **#5552 多工具失败后通用 “invalid result”**（OPEN）— 无法定位失败工具。**无 fix PR**。
  链接：https://github.com/nearai/ironclaw/issues/5552

### P3（低，今日已关闭）
- **#5705 终端图标无法禁用**（CLOSED）— 今日关闭，未见对应修复 PR
  链接：https://github.com/nearai/ironclaw/issues/5705
- **#5704 图片预览变透明**（CLOSED）
  链接：https://github.com/nearai/ironclaw/issues/5704
- **#5706 侧边栏显示原始线程 ID**（CLOSED）
  链接：https://github.com/nearai/ironclaw/issues/5706

### 已合入修复
- **#7289** → 修复 #7275 FTS 召回
- **#7303** → 修复 Docker 健康检查
- **#7259** → 修复文档泄露

### 修复进行中
- **#7309** → 修复 #7308 OAuth scope
- **#7305** → 修复 #7302 失败工具摘要 UI
- **#7300** → 修复 Slack 个人 DM 投递

## 6. 功能请求与路线图信号

- **Inspector 运维诊断**（强信号）：API 已合入，前端面板/模型统计/Prompt 检查三个 PR 待合并，大概率进入下一版本。
  链接：https://github.com/nearai/ironclaw/issues/7220
- **#7157 显式频道投递工具**：双通道模型（会话生命周期通道 + 通知通道），设计已批准，实施中，将删除现有投递启发式逻辑。
  链接：https://github.com/nearai/ironclaw/pull/7157
- **#7214 显式 Docker/Railway 沙箱配置**：工作区/检查点隔离到租户+用户，非 root Python worker 运行。
  链接：https://github.com/nearai/ironclaw/pull/7214
- **#7253 自定义 MCP 注册保持私有、仅定义**：注册不触发安装/激活/发布。
  链接：https://github.com/nearai/ironclaw/pull/7253
- **#7184 WASM 工具新增 Nostr 主机函数**：nostr-sign-event 等 3 个函数，由新贡献者 @Kampouse 提出。
  链接：https://github.com/nearai/ironclaw/pull/7184
- **用户功能请求**：#5705 终端图标可设为禁用（已关闭）；#5510 删除旧例程（OPEN）。
  链接：https://github.com/nearai/ironclaw/issues/5510

## 7. 用户反馈摘要

以下反馈来自今日更新 issue 的描述与摘要：

- **审批通知不可靠**：审批通知“闪一下”就消失，后续审批根本不显示，用户需要审批历史可追溯（#5553）。
  链接：https://github.com/nearai/ironclaw/issues/5553
- **GitHub 集成“配了却不能用”**：配置正常但搜索/创建 issue 直接 403，无降级方案（#5702）。
  链接：https://github.com/nearai/ironclaw/issues/5702

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-08-07）

## 1. 今日速览

- 过去 24 小时 LobsterAI 共更新 5 条 Issue、4 条 PR，无新版本发布，也无 Issue/PR 被关闭或合并。
- 社区侧仍以“使用体验反馈”为主：工作目录文件强制生成、网关重启状态不可见、输入框换行交互等问题被集中提出。
- 代码侧今日没有合入动作，4 条 PR 全部处于待合并状态，其中 2 条为较新的修复 PR，2 条为带 `stale` 标记的旧功能 PR。
- 整体活跃度中等：Issue 讨论持续，但主干合入节奏放缓；长期未响应的 stale 项需要维护者重点关注。

---

## 2. 版本发布

今日无新版本发布，因此不展开说明。

---

## 3. 项目进展

今日没有 PR 被合并或关闭，因此没有可确认进入主干的代码变更。项目“向前迈进”主要体现在新增/活跃的待合并 PR 上，其中两条较新的修复 PR 值得关注：

- [#2446 [OPEN] fix(win-installer): rescue null watchdog exit code via extractor](https://github.com/netease-youdao/LobsterAI/pull/2446)  
  由 @fisherdaddy 提交，针对 Windows 安装器，修复 watchdog 退出码为空时的异常处理问题，可能涉及安装/升级流程稳定性。

- [#2445 [OPEN] fix(openclaw): strip plugin-index-managed keys from config.set](https://github.com/netease-youdao/LobsterAI/pull/2445)  
  同样由 @fisherdaddy 提交，针对 OpenClaw 配置，在 `config.set` 中去除由 plugin-index 管理的键，避免配置冲突或冗余。

这两条 PR 尚未合并，但可以看出项目正在修复 Windows 安装器与 OpenClaw 配置管理方面的实际问题。

---

## 4. 社区热点

今日评论数最多的 Issue 是两条带 `stale` 标记的旧 Issue，均为 1 条评论：

- [#1196 [OPEN] 不要强制在工作目录中建立 Agents.md、User.md等6个文件](https://github.com/netease-youdao/LobsterAI/issues/1196)  
  用户反对每次切换工作目录都强制生成 `AGENTS.md`、`USER.md` 等 6 个系统文件，认为这会让工作目录变得混乱，删除后又会重建。背后诉求是：希望支持全局 `agents.md`，或将配置文件放入隐藏目录，减少对用户工作区的侵入。

- [#1198 [OPEN] 网关重启到一半进度条消失，也不知道重启状态，后面的对话都显示模型不可用](https://github.com/netease-youdao/LobsterAI/issues/1198)  
  用户反馈网关重启过程中 UI 状态丢失，无法感知重启进度；即使浏览器已打开，页面仍提示“浏览器服务不可用”，导致后续对话全部不可用。背后诉求是：需要更明确、稳定的重启状态展示和服务可用性反馈。

另外，今日新提交的 [#2444 输入框编辑模式](https://github.com/netease-youdao/LobsterAI/issues/2444) 虽然还没有评论，但问题描述详细，涉及高频编辑场景，也是较典型的社区声音。

---

## 5. Bug 与稳定性

今日 Bug 类 Issue 按严重程度排列如下：

1. **中等：模型 ID 含斜杠的自定义 Provider 无法在界面中使用（SiliconFlow）**  
   [#2443 [OPEN] Bug 反馈：模型 ID 含斜杠的自定义 Provider 无法在界面中使用（SiliconFlow）](https://github.com/netease-youdao/LobsterAI/issues/2443)  
   - 影响范围：所有模型 ID 带斜杠的 OpenAI 兼容服务商，如 SiliconFlow。  
   - 现象：模型 ID 为 `deepseek-ai/DeepSeek-V4-Flas...` 时，界面无法选择该模型。  
   - 是否已有 fix PR：否。

2. **中高：网关重启过程状态缺失，导致模型后续不可用**  
   [#1198 [OPEN] 网关重启到一半进度条消失，也不知道重启状态，后面的对话都显示模型不可用](https://github.com/netease-youdao/LobsterAI/issues/1198)  
   - 现象：网关重启进度条中途消失；浏览器已打开但提示服务不可用；后续对话全部显示模型不可用。  
   - 是否已有 fix PR：否。该 Issue 已带 `stale` 标记，需要维护者重新确认是否可复现。

3. **兼容性疑问：为什么内核仍是 PowerShell 5.1，而不是 7.4**  
   [#2442 [OPEN] 为什么LobsterAI软件的内核还是 ps5.1 始终没有升级到 ps7.4。](https://github.com/netease-youdao/LobsterAI/issues/2442)  
   - 这更像一个运行时选型问题，而非崩溃类 Bug。推测是 Node.js 默认在 Windows 上调用 `powershell.exe` 而非 `pwsh.exe`，加上兼容性兜底考虑。  
   - 是否已有 fix PR：否。

---

## 6. 功能请求与路线图信号

今日用户提出的功能需求，以及待合并 PR 所暗示的路线图信号包括：

- **输入框编辑模式**  
  [#2444 [OPEN] 输入框编辑模式](https://github.com/netease-youdao/LobsterAI/issues/2444)  
  用户希望支持“Enter 换行、Ctrl+Enter 发送”，或提供编辑模式开关，避免长 Prompt 编辑时误发送。这是典型的编辑器交互优化需求，若被采纳，很可能进入下一轮 UI 改进。

- **工作目录配置文件管理重构**  
  [#1196 [OPEN] 不要强制在工作目录中建立 Agents.md、User.md等6个文件](https://github.com/netease-youdao/LobsterAI/issues/1196)  
  用户希望配置从“强制写工作目录”改为“全局配置 + 隐藏目录”，这涉及到系统提示词和作用域设计，属于产品级路线图信号。

- **模型级 contextWindow / maxTokens 配置**  
  [#1199 [OPEN] feat(model): add context window and token settings](https://github.com/netease-youdao/LobsterAI/pull/1199)  
  该 PR 提议为每个模型增加 `contextWindow` 和 `maxTokens` 设置，并在直连聊天、Cowork/OpenClaw 中传播使用。虽然目前仍是待合并状态，但说明“模型级参数配置”已经在社区和贡献者侧形成实际需求。

- **Agent 管理页面交互优化**  
  [#1197 [OPEN] Feature/Agent 管理页面交互优化](https://github.com/netease-youdao/LobsterAI/pull/1197)  
  用户指出 Agent 删除操作路径过深，需要进入详情面板才能操作；侧边栏交互也有优化空间。这属于管理界面易用性迭代的一部分。

---

## 7. 用户反馈摘要

从今日活跃 Issue 的描述和评论中，可以提炼出以下真实用户痛点：

- **工作目录被配置文件“污染”**  
  用户 @daiqi1235 在 [#1196](https://github.com/netease-youdao/LobsterAI/issues/1196) 中表示：每次选择不同工作目录都会强制生成 `AGENTS.md`、`USER.md` 等 6 个文件，“删了还要重建”，并且“agents 里一大堆东西”，希望改为全局或隐藏目录方案。

- **网关重启过程不透明，影响后续使用**  
  用户 @Cathylkx 在 [#1198](https://github.com/netease-youdao/LobsterAI/issues/1198) 中反馈：网关重启到一半进度条消失，用户无法判断重启状态；即使 Chrome 已打开，页面仍提示浏览器服务不可用，导致后续对话全部异常。这说明当前重启流程缺少明确的“结束/成功/失败”状态呈现。

- **长 Prompt 编辑容易误发送**  
  用户 @PYUDNG 在 [#2444](https://github.com/netease-youdao/LobsterAI/issues/2444) 中描述了高频场景：输入长 Prompt 需要换行，但必须按住 `Shift+Enter`；一旦忘记按 `Shift`，消息编辑到一半就会直接发送。这是非常具体且影响效率的输入交互问题。

- **对默认 PowerShell 版本有疑问**  
  用户 @woxinsj 在 [#2442](https://github.com/netease-youdao/LobsterAI/issues/2442) 中质疑为什么 LobsterAI 使用 PS 5.1 而非 PS 7.4。虽然这不一定是 Bug，但说明技术型用户对底层运行时选型有较高关注。

---

## 8. 待处理积压

以下 Issue/PR 存在时间较长，且带有 `stale` 标记，或长期未获得合并处理，建议维护者优先关注：

- [#1196 [OPEN] 不要强制在工作目录中建立 Agents.md、User.md等6个文件](https://github.com/netease-youdao/LobsterAI/issues/1196)  
  创建于 2026-04-01，最后更新 2026-08-06，有用户评论，长期未关闭。属于产品设计层面的反馈，建议明确“当前设计是否保留/调整”。

- [#1198 [OPEN] 网关重启到一半进度条消失，也不知道重启状态，后面的对话都显示模型不可用](https://github.com/netease-youdao/LobsterAI/issues/1198)  
  创建于 2026-04-01，最后更新 2026-08-06，是稳定性相关问题，需要确认是否仍在现有版本复现。

- [#1197 [OPEN] Feature/Agent 管理页面交互优化](https://github.com/netease-youdao/LobsterAI/pull/1197)  
  创建于 2026-04-01，最后更新 2026-08-06，带 `stale` 标记，且与主分支存在冲突。若该功能仍符合规划，应尽快 rebase 并推动 review；否则明确关闭。

- [#1199 [OPEN] feat(model): add context window and token settings](https://github.com/netease-youdao/LobsterAI/pull/1199)  
  创建于 2026-04-01，最后更新 2026-08-06，带 `stale` 标记。涉及模型级 token 设置，功能价值较高，建议维护者评估是否纳入后续版本。

以上积压项的时间成本正在累积，若不及时处理，后续 merge 或复现成本会进一步增加。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-07

## 今日速览

过去 24 小时项目保持高活跃度：共更新 12 条 Issue（新开/活跃 8 条，关闭 4 条）和 50 条 PR（待合并 23 条，已合并/关闭 27 条），无新版本发布。当日 Bug 报告密集，集中在 MCP 工具稳定性（#6732）、Agent 死循环（#6768）与安全门控失效（#6773）三个方向，且均有社区提交的对应修复 PR 在途，反映出维护者和用户对稳定性问题的高度重视。架构层面，`refactor(context): align Scroll and memory with AgentScope lifecycle`（#6611）与 `fix(providers): return typed tagged tool calls`（#6605）完成合并，标志着项目正在加速向 AgentScope 2.0 生命周期范式收敛。

## 版本发布

无新版本发布。

---

## 项目进展

今日关闭/合并的 PR 中，以下三项对项目演进有实质推进：

- [#6611 refactor(context): align Scroll and memory with AgentScope lifecycle](https://github.com/agentscope-ai/QwenPaw/pull/6611)：将 Scroll 收敛为唯一上下文协议，消除了 Native/Scroll 双分支和自定义 ContextManager 协议的重复职责，从根本上降低状态恢复、自动记忆与手动压缩之间的不一致风险。这是本周最具分量的架构级改动。
- [#6605 fix(providers): return typed tagged tool calls](https://github.com/agentscope-ai/QwenPaw/pull/6605)：将从 thinking/text 标签中恢复的工具调用重水合为 AgentScope 2.0 `ToolCallBlock` 对象，并保留原始 JSON 参数作为 block 输入，修复了工具调用在多轮流式累积场景下的类型丢失问题，对依赖工具调用的上层应用是重要修复。
- [#6664 fix(harnesses): degrade gracefully without Codex CLI](https://github.com/agentscope-ai/QwenPaw/pull/6664)：让 harness 在未安装 Codex CLI 时优雅降级，消除了硬依赖导致的启动失败。

另有 #6741（ReMe embedding 生命周期改进）与 #6739（embedding 配置文档）因来源 fork 被删除而关闭，其内容已分别由新提交的 #6772 与 #6771 接续，功能不会丢失。

整体来看，项目正处于围绕 AgentScope 2.0 基座做架构收敛的关键阶段，同时社区贡献者在浏览器驱动自愈（#6776）、共享文件系统持久化加固（#6767）等实际运维痛点上持续补强。

---

## 社区热点

今日讨论最集中的议题呈现出“稳定性痛点 + 新协议期待”的双主线：

- [#6588 `spawn_subagent` treats empty batch placeholders as batch mode in single-task calls](https://github.com/agentscope-ai/QwenPaw/issues/6588)（6 条评论，已关闭）：这是今日评论数最高的 Issue。`spawn_subagent` 将部分 provider 返回的空 `batch` 占位符误判为批量模式，导致单任务调用行为异常。该问题已关闭，说明已有解决方案或明确结论。
- [#6732 mcp工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732)（3 条评论）：用户报告 MCP 工具每隔数小时失效、需重启 Docker 容器才能恢复。这是 MCP 稳定性方向的典型运维痛点，评论区应重点关注是否有临时规避方案。
- [#6700 超大工具输出导致历史会话加载卡死](https://github.com/agentscope-ai/QwenPaw/issues/6700)（3 条评论，已关闭）：用户遭遇数 MB 工具输出导致 Web 端会话无响应，并在 Issue 中明确建议“增加输出截断和历史消息分页”——这既是 Bug 反馈也是产品改进建议。

值得关注的是，上述高讨论度 Issue 均为 Bug 而非功能讨论，说明当前社区最迫切的诉求是**稳定性**。

---

## Bug 与稳定性

按严重程度排列：

**严重（需优先处理）**

- [#6773 On Linux doom-loop / rubric gates never activate in `/goal` or `/mission`; `in_loop_modes` is a no-op](https://github.com/agentscope-ai/QwenPaw/issues/6773)：安全门控在循环模式下静默失效——doom-loop 重复保护和 rubric 完成门控均未注册，属安全相关的高风险配置契约违例。**已有对应修复 PR #6774**（`fix(modes): honor in_loop_modes for goal and mission gates`），建议加速审查。
- [#6768 Agent enters infinite loop after completing multi-step task, session blocked for hours](https://github.com/agentscope-ai/QwenPaw/issues/6768)：Agent 在多步骤任务（REST API 导入财务记录）完成后进入死循环，用户消息持续被接收但从未处理，会话阻塞数小时。需排查循环终止条件与任务完成后的状态机转换逻辑。
- [#6732 mcp工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732)：MCP 工具定时失效且需重启容器恢复，影响所有依赖 MCP 的自动化流程，属于高频复发问题。

**中等**

- [#6756 `run_tool_batch` 工具报错 No toolkit available in current context](https://github.com/agentscope-ai/QwenPaw/issues/6756)：2.1.0b1 中 `run_tool_batch` 在所有 agent 上都会失败，`current_toolkit` ContextVar 未按预期在 POST_AGENT_BUILD 阶段注入。
- [#6775 Malware Bytes found Trojan Loader in Desktop Version Windows](https://github.com/agentscope-ai/QwenPaw/issues/6775)：Windows 桌面版被 Malware Bytes 标记为 Trojan Loader，用户已明确表示“在团队回应前将卸载”。无论是否为误报，都需官方快速澄清并给出安全说明，否则将持续侵蚀用户信任。
- [#6700 超大工具输出导致历史会话加载卡死](https://github.com/agentscope-ai/QwenPaw/issues/6700)（已关闭）：数 MB 级工具输出导致 Web 端会话加载无响应，且该输出继续参与后续模型请求，有触发上下文超限的风险。用户已给出截断与分页的具体建议。

**轻微**

- [#6762 Desktop 2.1.0b1 Tool-call block 长 shell 命令溢出不换行](https://github.com/agentscope-ai/QwenPaw/issues/6762)（已关闭）：CodeMirror 缺少 `lineWrapping` 导致的 UI 显示问题。
- [#6760 qwenpaw task cmdline 更新到 2.0.1 后报错](https://github.com/agentscope-ai/QwenPaw/issues/6760)（已关闭）：命令行模式更新后出现 sandbox 不可用告警。
- [#6588 `spawn_subagent` 空 batch 占位符误判为批量模式](https://github.com/agentscope-ai/QwenPaw/issues/6588)（已关闭）：已在关闭前获得足够讨论，修复方案待确认。

---

## 功能请求与路线图信号

- [MCP 2026-07-28（stateless）规范支持 #6761](https://github.com/agentscope-ai/QwenPaw/issues/6761)：用户询问 QwenPaw 是否支持 MCP 最新无状态规范。这是 **MCP 协议发布以来最大的一次破坏性变更**，支持与否将直接影响 QwenPaw 在 MCP 生态中的兼容性。若尚未规划，建议维护者明确回应并评估适配窗口。
- [模型 fallback 与冷却机制 #6659](https://github.com/agentscope-ai/QwenPaw/pull/6659)（Under Review）：实现主模型因限流/超时/服务错误时的自动故障切换，带冷却机制避免反复命中故障 provider。该 PR 关联 #2199、#1327、#2089 三个历史 Issue，属于用户长期诉求，很可能进入 2.1 正式版。
- [用户 Chrome 标签生命周期可配置 #6770](https://github.com/agentscope-ai/QwenPaw/issues/6770)：允许用户控制 Chrome 标签跨响应周期的存活时间，适合需要持久化浏览器上下文的自动化场景。
- [欧盟语言支持（匈牙利语等）#6765](https://github.com/agentscope-ai/QwenPaw/issues/6765)：来自非开发者的热情用户请求。考虑到 Qwen 家族的多语言能力，该请求实现成本可能较低，可作为本地化路线的参考。
- [AG-UI 协议端点 #6337](https://github.com/agentscope-ai/QwenPaw/pull/6337)（Under Review，7 月 22 日提交）：新增 `/protocol/agui/chat` 端点，以 SSE 流式输出标准 AG-UI 协议事件。若合并，QwenPaw 将成为兼容 AG-UI 的 Agent 服务端，对生态集成意义较大。

---

## 用户反馈摘要

从今日 Issue 评论中可提炼以下真实用户声音：

- **安全软件误报直接导致用户流失**（[#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775)）：英文用户 Brendan 在报告 Malware Bytes 报毒时表示已经卸载产品，但同时说“PS. I love your work. Thanks for all you do.”——用户对项目有情感认同，但安全疑虑足以抵消这种认同。建议官方尽快发布声明，并考虑提交 Malware Bytes 白名单。
- **MCP 失效的运维负担**（[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)）：用户每隔数小时就需要重启 Docker 容器恢复 MCP 工具，这一手动干预成本在自动化部署场景下不可接受。
- **超大输出成为会话“毒药”**（[#6700](https://github.com/agentscope-ai/QwenPaw/issues/6700)）：用户对工具输出未做截断表达了明确不满，并主动给出了“输出截断 + 历史分页”的组合方案，这是高质量的社区反哺。
- **非开发者用户的存在**（[#6765](https://github.com/agentscope-ai/QwenPaw/issues/6765)）：来自布达佩斯的用户自述“not software developer but an enthusiastic QwenPaw user”，说明项目已触达非技术人群，多语言与易用性需求会随用户基数增长而增加。

---

## 待处理积压

以下 PR/Issue 已等待较长时间，建议维护者优先关注：

- [#6337 feat(agui): expose AG-UI protocol via /protocol/agui/chat endpoint](https://github.com/agentscope-ai/QwenPaw/pull/6337)：7 月 22 日提交，处于 Under Review 已 16 天。该 PR 补全了 AgentScope 2.0 的 AGUIProtocolMiddleware 对外暴露能力，是生态集成的重要拼图，建议尽快安排 review。
- [#6564 fix(memory): flush pending turns before compression](https://github.com/agentscope-ai/QwenPaw/pull/6564)：7 月 30 日提交，修复压缩前未刷新待处理 turns 导致记忆丢失的问题，关联 #6555。等待 review 已达 8 天。
- [#6659 feat(providers): implement model fallback with cooldown mechanism](https://github.com/agentscope-ai/QwenPaw/pull/6659)：8 月 3 日提交，社区长期诉求的模型故障转移能力，已关联多个历史 Issue。
- [#6615 fix(config): handle corrupted agent config and invalid JSON in load_agent_config](https://github.com/agentscope-ai/QwenPaw/pull/6615)：7 月 31 日提交的 first-time-contributor PR，为损坏的 `agent.json` 增加优雅错误处理。初次贡献者的 PR 若长期未处理会影响社区贡献意愿。
- [#6723 fix(provider): expire stale capability cache entries and clear on model switch](https://github.com/agentscope-ai/QwenPaw/pull/6723)：8 月 5 日提交，修复能力缓存永不失效的问题（一次短暂的上游路由错误会导致模型能力被永久错误记忆）。

---

**总体健康度评估**：项目处于高活跃迭代期，AgentScope 2.0 架构收敛方向明确，社区贡献者持续涌入（今日有多个 first-time-contributor PR）。但 Bug 类 Issue 占比偏高，且 MCP 稳定性、安全门控这类直接影响生产环境的问题尚未有正式版本修复，建议在下一个版本发布前优先合入 #6774、#6776、#6767 等稳定性修复。

</details>

</div>
