---
title: "OpenClaw 生态日报"
published: 2026-09-05
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-05

> Issues: 241 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-05 00:00 UTC

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

# OpenClaw 项目动态日报
**日期：2026-09-05**

---

## 1. 今日速览

OpenClaw 仓库今日活动处于**高位震荡**状态：过去 24 小时 Issues 更新 241 条（仅关闭 12 条，净增 217 条）、PR 更新 500 条（待合并 351 条），活跃度指标显著高于日常基线，且 PR/Issue 比例接近 2:1，表明项目仍处于以"持续贡献、积压待审"为主的发展阶段。议题以 P1 高优先级 Bug 居多，多集中在**会话状态、消息投递、SQLite 持久化、网关冷启动**等核心路径上，且许多 Bug 已存在修复 PR 但仍标记为"等待维护者评审 / 需要 live repro"。无新版本发布，版本号仍停留在 2026.7.x 系列 beta。

---

## 2. 版本发布

**无新版本发布。** 最近可识别的发布仍为 2026.7.x beta 线（#119087、#119411 等仍基于 2026.7.2-beta.7 复现）。

---

## 3. 项目进展

今日合并/关闭的数据样本中，未见重大功能或破坏性合并的公开记录；以下 PR 已处于 **CLOSED/已合并或等待维护者复审** 的"ready for maintainer look"状态，代表项目下一步可能落地的进展方向：

- **#138671** — `test(memory): verify structured consolidation requests`（CLOSED，由 @steipete 提交）：补齐 memory 合并请求的发布验证测试，修复 release verification 因等待显式 owner 而超时的问题。链接：https://github.com/openclaw/openclaw/pull/138671
- **#138656** — `fix(terminal): stream wrapped table rows without argument limits`（OPEN，已具备足够 proof）：修复 CLI 表格在单元格换行时 `RangeError: Maximum call stack size exceeded` 的崩溃。链接：https://github.com/openclaw/openclaw/pull/138656
- **#138186** — `fix(android): build Mermaid assets package-locally`：修复 Android 贡献者在共享 worktree 下因 `ERR_PNPM_UNSAFE_TASK_RUN_STATE_PATH` 无法构建/测试手机 App 的问题。链接：https://github.com/openclaw/openclaw/pull/138186
- **#121156** — `fix(plugins): preserve unreadable retained npm markers during cleanup`：清理阶段不再误删被截断/不可读的 npm 插件保留标记（已合并 PR #113902 的后续）。链接：https://github.com/openclaw/openclaw/pull/121156
- **#138566 / #138623 系列（steipete）** — heartbeat 状态退役重构：保留已保存的 outcomes、scheduled tasks、scratch state 与原始指令文件，Doctor 中断后可继续自身转换而不覆盖后续编辑。链接：https://github.com/openclaw/openclaw/pull/138623

整体观感：**修复与重构多于新特性**，重心放在稳定性与生命周期清理。

---

## 4. 社区热点

### 4.1 评论数最多的 Issues（Top 5）

| # | 标题 | 评论 | 👍 |
|---|---|---|---|
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration 不稳定：并发 agents add/config 覆盖、session-lock 失败、子任务脱离 | 15 | 1 |
| [#53628](https://github.com/openclaw/openclaw/issues/53628) | `${XDG_CONFIG_HOME}` 在 skill 安装时未被解析 | 15 | 1 |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | Umbrella：跨通道的 transcript 重复、重放、context 组装缺陷 | 15 | 0 |
| [#113306](https://github.com/openclaw/openclaw/issues/113306) | SQLite snapshot restore 缺乏端到端 crash 与 identity 保障 | 13 | 0 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 子进程泄漏：hook/tool 子进程未被回收，累积 zombie，主进程降级 | 10 | 1 |

### 4.2 👍 反应最高的 Issues

- [#26037](https://github.com/openclaw/openclaw/issues/26037) — **阿里云百炼 coding plan 支持（含 thinking/reasoning）**，👍 4，社区对国产模型集成需求强烈。
- [#6757](https://github.com/openclaw/openclaw/issues/6757) — **Agent 自主触发的 context compaction（self-compact tool）**，👍 2。
- [#81484](https://github.com/openclaw/openclaw/issues/81484) — Discord Guild 回复回归（👍 2）。
- [#110368](https://github.com/openclaw/openclaw/issues/110368) — ACP + WebChat 同提示重复回复（👍 2）。

### 4.3 诉求分析

- **多代理/会话一致性** 是当前最热的诉求线（#43367、#69208、#114211），且往往以 umbrella 形式聚合跨通道相同根因。
- **容器化/PID 复用下的锁失效** 是新的高赞方向（#114234、#113149、#97616），反映 OpenClaw 在 systemd/容器重启语义上的短板。
- **国产模型与 Pro 套餐路径**（#26037、#83954）提示海外/企业订阅路径需要更清晰的文档。

---

## 5. Bug 与稳定性

按严重程度（impact 标签 + 复现成熟度）排序：

### 🔴 P1 / Diamond Lobster（关键链路存在数据/会话/消息丢失）

| Issue | 标题摘要 | 是否已有 fix PR |
|---|---|---|
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | 多代理编排：并发 add/config 覆盖、session-lock 失败 | ✅ linked-pr-open |
| [#113306](https://github.com/openclaw/openclaw/issues/113306) | SQLite snapshot restore 缺乏端到端 crash/identity 保障 | ❌ 无 |
| [#114211](https://github.com/openclaw/openclaw/issues/114211) | Matrix 房间 agent 出现 no-reply 循环与重放过期会话 | ❌ 无 |
| [#71689](https://github.com/openclaw/openclaw/issues/71689) | `tasks/runs.sqlite` 损坏时任务注册表恢复失败 | ❌ 无 |
| [#114234](https://github.com/openclaw/openclaw/issues/114234) | 使用成本刷新锁在容器 PID 复用下不可释放 | ❌ 无 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步 SQLite `agent.write` 阻塞网关事件循环；ANALYZE 未运行（36.7s → 809ms 复现） | ❌ 无 |
| [#120162](https://github.com/openclaw/openclaw/issues/120162) | safeguard compaction：qualityGuard 重试与 summarization 共享超时预算 | ❌ 无 |
| [#90378](https://github.com/openclaw/openclaw/issues/90378) | 5.28→6.1 升级：cron store 静默迁移至 SQLite，新作业默认 `delivery.mode=announce` | ❌ 无 |
| [#92241](https://github.com/openclaw/openclaw/issues/92241) | 网关在 update/rollback 后持有陈旧模块路径，入站消息静默丢弃（ERR_MODULE_NOT_FOUND） | ❌ 无 |
| [#101793](https://github.com/openclaw/openclaw/issues/101793) | Signal 通道：同轮内工具调用前的助手文本被丢弃（Anthropic/Sonnet 非流式） | ✅ linked-pr-open |
| [#118793](https://github.com/openclaw/openclaw/issues/118793) | Claude CLI "session limit" 错误返回 surface_error 而非触发 fallback 链 | ✅ linked-pr-open |

### 🟠 P1 / Silver Shellfish（功能可用性受损）

| Issue | 标题摘要 | 是否已有 fix PR |
|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 子进程泄漏导致 zombie 累积 | ❌ 无 |
| [#119087](https://github.com/openclaw/openclaw/issues/119087) | 2026.7.1→7.2 网关冷启动回归 ~2.5x | ✅ linked-pr-open |
| [#114154](https://github.com/openclaw/openclaw/issues/114154) | bundle-mcp：tools.allow/deny 通过，但 ToolSearch 找不到 | ❌ 无 |
| [#129314](https://github.com/openclaw/openclaw/issues/129314) | "next-turn runtime context" 被作为可见轮次发出 | ❌ 无 |
| [#119565](https://github.com/openclaw/openclaw/issues/119565) | Codex 原生 hook 下并发 MCP 调用内存放大 | ✅ linked-pr-open |
| [#112564](https://github.com/openclaw/openclaw/issues/112564) | WhatsApp v7 群发失败（UNAVAILABLE），私聊不受影响 | ❌ 无 |
| [#119992](https://github.com/openclaw/openclaw/issues/119992) | 单轮内重复答案风暴：message tool 缺少单轮预算 | ✅ linked-pr-open |
| [#119861](https://github.com/openclaw/openclaw/issues/119861) | Slack `auth.test` 启动超时（in-process），身份持续 degraded | ❌ 无 |
| [#103159](https://github.com/openclaw/openclaw/issues/103159) | 反复出现 "LLM request failed: provider rejected the request schema"，28 小时 6 次（CLOSED） | — |

### 🟡 P2 回归与性能

- [#40919](https://github.com/openclaw/openclaw/issues/40919) — session memory sync 全删全插导致 JSONL 退化。✅ linked-pr-open
- [#119411](https://github.com/openclaw/openclaw/issues/119411) — memory watcher 不重索引，但 `memory status` 报告 `Dirty: no`。❌ 无
- [#87447](https://github.com/openclaw/openclaw/issues/87447) — DREAMS.md 无界增长（134 KB / 6 周）。❌ 无
- [#44734](https://github.com/openclaw/openclaw/issues/44734) — Gemini 多模态索引拒绝 OGG/Opus。❌ 无
- [#45469](https://github.com/openclaw/openclaw/issues/45469) — `scheduleReconnect()` 无限重试，堆积 WS 监听器与僵尸进程。❌ 无
- [#87544](https://github.com/openclaw/openclaw/issues/87544) — 通道范围内会话的 transcript 与客户端投递不一致（Discord 表现明显）。❌ 无
- [#95840](https://github.com/openclaw/openclaw/issues/95840) — `contextPruning cache-ttl` 对 OpenAI 模型永不触发。✅ linked-pr-open
- [#81484](https://github.com/openclaw/openclaw/issues/81484) — 2026.5.7 Discord guild 回复回归。❌ 无
- [#118560](https://github.com/openclaw/openclaw/issues/118560) — WebChat 主会话 reset 后 canvas 隐藏早期消息。✅ linked-pr-open
- [#110368](https://github.com/openclaw/openclaw/issues/110368) — ACP + Control UI WebChat 同一提示出现重复气泡。❌ 无

### 🟢 文档/可观测性

- [#42408](https://github.com/openclaw/openclaw/issues/42408) — `memory_search` 在 local+hybrid 下质量不稳（extraPaths 漂移 + benchmark 文件污染）。
- [#115256](https://github.com/openclaw/openclaw/issues/115256) — 桌面 App 与 gateway 启动循环；`doctor` 推荐修复被 App 立即撤销。
- [#107902](https://github.com/openclaw/openclaw/issues/107902) — 健康 gateway.log 被良性 WARN 事件淹没。
- [#71417](https://github.com/openclaw/openclaw/issues/71417) — `openclaw agent` 默认 `--channel=last`，静默恢复最近会话。

> **健康度观察**：标记 `clawsweeper:linked-pr-open` 的 Bug 数量可观，但绝大多数 PR 仍停留在"needs proof / waiting on author"状态，说明**修复 → 验证 → 合并**链条存在明显阻塞。

---

## 6. 功能请求与路线图信号

| 候选功能 | Issue | 关联 PR / 状态 | 路线图可能性 |
|---|---|---|---|
| Agent 自主触发 context compaction | [#6757](https://github.com/openclaw/openclaw/issues/6757) | 无（与 `qualityGuard` budget 重叠 #120162） | 高（与 safeguard compaction 改造同源） |
| 阿里云百炼 coding plan（含 reasoning） | [#26037](https://github.com/openclaw/openclaw/issues/26037) | 无 | 中（👍 4，但需官方合作） |
| Telegram quote/reply 作为一等公民持久入站契约 | [#88032](https://github.com/openclaw/openclaw/issues/88032) | 无 | 中（与 #69208 umbrella 重叠） |
| 可配置 lane wait 诊断阈值 | [#14747](https://github.com/openclaw/openclaw/issues/14747) | 无 | 中（属低成本可观测性增强） |
| secretref 参考文档自动生成 | [#44289](https://github.com/openclaw/openclaw/issues/44289) | 无 | 低（文档侧） |
| Plugin SDK：generated-video URL 物化安全说明 | [#132601](https://github.com/openclaw/openclaw/issues/132601) | 无 | 中（文档/安全边界） |
| ACP / WebChat 重复气泡（已是 bug，但稳态后即变增强） | [#110368](https://github.com/openclaw/openclaw/issues/110368) | 无 | 中 |
| SQLite ANALYZE / PRAGMA optimize 自动维护 | [#119720](https://github.com/openclaw/openclaw/issues/119720) | 无 | 高（与性能回归直接相关） |
| mcp / mcp doctor 后端能正确触发 ToolSearch 实际装配 | [#114154](https://github.com/openclaw/openclaw/issues/114154) | 无 | 高（#138694 已着手） |
| 执行审批提示展示自然语言目的 | — | ✅ [#138712 feat(exec)](https://github.com/openclaw/openclaw/pull/138712) | 高（已落地） |

下一版本最可能吸纳的方向：**会话状态/锁语义修复（#114234、#113149、#119720）** + **多代理编排稳健化（#43367）** + **WebChat/ACP 体验一致性（#110368、#118560、#69208）**。

---

## 7. 用户反馈摘要

- **多代理编排**：#43367 的报告者（@waliddafif）描述在 2026.3.8 上做小规模并行编码任务时，"agents add/config 被反复覆盖，只剩一份子集配置，session-lock 失败，子任务被脱离主进程"，认为多代理运行"在实践中不可靠"。
- **容器/PID 复用**（#114234）：`@lujiajing1126` 指出 gateway 在容器中重启后 PID 复用，导致 usage-cost refresh lock 永久冻结——是较新的运维痛点。
- **升级静默行为**（#90378）：5.28→6.1 升级中 cron store 从 JSON 静默迁移到 SQLite 且新作业默认 `delivery.mode=announce`，引发投递失败；用户要求**显式迁移可见性 + 显式默认声明**。
- **国产/Pro 模型路径**（#26037、#83954）：用户希望 OpenClaw 文档化 gpt-5.5-pro、Pro 套餐以及阿里云百炼 coding plan 的使用路径。
- **WebChat 一致性**（#110771、#118560、#110368）：升级到 2026.7.1-2 后 WebChat 出现"内部记录持久化到可见 transcript"、"canvas 隐藏早期消息"、"ACP 双气泡"等多发症状，用户一致指出**升级回归**与**会话展示语义不一致**。
- **梦境日记无界增长**（#87447）：两个 agent 在 6 周内 DREAMS.md 增长至 134 KB，用户担心存储与检索成本。
- **桌面 App + doctor 自相矛盾**（#115256）：@A1fred-AI 测量到 32s~727s 不规则重启、关闭 App 后 14h44m 无重启；`doctor` 推荐的修复被 App 自身立即撤销——对新手极不友好。
- **Discord guild 投递异常**（#81484）：DM 正常但 guild 通道出现畸形 send payload 或重复 outbound loop，反映通道分支测试覆盖不足。
- **gateway 日志噪音**（#107902）：良性 per-turn / per-reconnect 事件以 WARN 输出，主导日志；用户要求降级为 debug 或加 verbose 开关。

---

## 8. 待处理积压（提醒维护者关注）

> 以下 Issue 已存在较长时间、影响面广、且尚未合并修复：

- **[#114234](https://github.com/openclaw/openclaw/issues/114234)** — Usage-cost refresh lock 在容器 PID 复用下不可释放。已有较清晰根因分析，等待 PR。
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — SQLite ANALYZE/optimize 未在大量会话删除后运行；提供 36.7s → 809ms 的复现路径，等待 fix PR。
- **[#87447](https://github.com/openclaw/openclaw/issues/87447)** — DREAMS.md 无界增长（影响长期运行 agent 的存储成本）。
- **[#45469](https://github.com/openclaw/openclaw/issues/45469)** — `scheduleReconnect()` 无限重试，积累 WS 监听器与僵尸进程。
- **[#43367](https://github.com/openclaw/openclaw/issues/43367)** — Multi-agent 编排不稳定（聚合 15 条讨论，仍未合并 fix）。
- **[#69208](https://github.com/openclaw/openclaw/issues/69208)** — 跨通道 transcript 重复与 context 组装 umbrella。
- **[#113306](https://github.com/openclaw/openclaw/issues/113306)** — SQLite snapshot restore 缺乏端到端 crash/identity 保障（数据丢失风险）。
- **[#92241](https://github.com/openclaw/openclaw/issues/92241)** — 网关 rollback 后保留陈旧模块路径导致 ERR_MODULE_NOT_FOUND，消息静默丢弃。
- **[#114211](https://github.com/openclaw/openclaw/issues/114211)** — Matrix 房间 agent 自维持循环（no-reply / 重放）。
- **[#90378](https://github.com/openclaw/openclaw/issues/90378)** — 升级路径 cron 静默迁移，回归风险显著。
- **[#120162](https://github.com/openclaw/openclaw/issues/120162)** — safeguard compaction 中 qualityGuard 与 summarization 共享 abort 信号。
- **[#119411](https://github.com/openclaw/openclaw/issues/119411)** — memory 文件 watcher 永不重索引（`Dirty: no` 与索引计数不符）。
- **[#115256](https://github.com/openclaw/openclaw/issues/115256)** — 桌面 App 与 gateway 启动循环、`doctor` 修复被立即撤销。
- **[#64103](https://github.com/openclaw/openclaw/issues/64103)** — Session `status` 字段语义误导 agent 复制会话。
- **[#71417](https://github.com/openclaw/openclaw/issues/71417)** — `openclaw agent --channel last` 静默恢复最近会话（操作可发现性差）。

### 维护者复审等待中的 PR（高质量）

- [#138694](https://github.com/openclaw/openclaw/pull/138694) — `fix(mcp): keep healthy tools connected during hot reload`（XL）
- [#138671](https://github.com/openclaw/openclaw/pull/138671) — `test(memory): verify structured consolidation requests`
- [#138566 / #138623](https://github.com/openclaw/openclaw/pull/138623) — heartbeat 状态退役重构
- [#126457](https://github.com/openclaw/openclaw/pull/126457) — `fix(gateway): prevent Tailscale orphan crash loops on launchd restart`
- [#118358](https://github.com/openclaw/openclaw/pull/118358) — `fix(gateway): cancelled tasks no longer continue running`
- [#138595](https://github.com/openclaw/openclaw/pull/138595) — `fix(codex): restore inference with required managed hooks`
- [#138473](https://github.com/openclaw/openclaw/pull/138473) — `fix(codex): preserve native threads after interrupted compaction`
- [#138438](https://github.com/openclaw/openclaw/pull/138438) — `fix(cli): automations runs required --id while sibling commands took a positional id`

---

### 健康度小结

- **优点**：用户参与度高、跨版本/跨通道 Bug 报告清晰、附有复现脚本与版本号；社区已自发形成 umbrella 聚合（#69208）。
- **风险**：
  1. 大量 P1 Bug 已具备 `linked-pr-open` 但仍处 `needs proof / waiting on author` 状态，**合并漏斗较窄**；
  2. 容器化/PID 复用、WebChat 一致性、SQLite 维护三类问题叠加，构成 2026.7.x 系列的稳定性主线；
  3. 文档/默认行为（#90378、#71417、#115256）对新用户不友好，存在升级摩擦；
  4. 多代理编排（#43367）尚无成熟修复，制约"agent swarm"叙事。

**建议优先级**：
1. 推动 [#114234](https://github.com/openclaw/openclaw/issues/114234)、[#119720](https://github.com/openclaw/openclaw/issues/119720)、[#90378](https://github.com/openclaw/openclaw/issues/90378) 三类"零散但影响面大"的 P1 进入 RC；
2. 集中处理 [#138694](https://github.com/openclaw/openclaw/pull/138694)、[#118358](https://github.com/openclaw/openclaw/pull/118358) 等"ready for maintainer look"的高质量 PR；
3. 在 2026.7.x → 2026.8 的发布说明中显式覆盖升级迁移（cron store、WebChat transcript、codex 线程恢复）。

---

*本日报基于公开 GitHub 数据生成，所有 Issue/PR 编号与链接均可通过 https://github.com/openclaw/openclaw 检索。*

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向对比报告
**日期：2026-09-05**

---

## 1. 生态全景

2026 年 9 月，个人 AI 助手与自主智能体开源生态呈现**"高活跃、高分化、强收敛"**的总体态势：以 OpenClaw、NanoBot、CoPaw 为代表的成熟项目进入"质量收敛期"，聚焦稳定性修复与生命周期治理；LobsterAI 凭借网易有道的工程化能力保持"日更版本列车"节奏；NanoClaw、IronClaw、PicoClaw、Zeroclaw 处于"功能扩张期"，并发力 Provider 抽象、渠道稳健性与企业级能力；Moltis 则呈"静默但有方向感"的状态，单条 PR 折射架构演进意图。整体来看，**SQLite 持久化、容器/PID 复用、多代理会话一致性、Provider 契约统一化**已成为横跨多个项目的共性技术债，而**国产模型集成、WebUI 可观测性、Bot 平台消息语义**则是新兴的差异化竞争点。

---

## 2. 各项目活跃度对比

| 项目 | 新开/活跃 Issue | PR 总数 | 已合并/关闭 PR | 新版本 | 健康度 | 当前阶段 |
|------|-----------------|---------|----------------|--------|--------|----------|
| **OpenClaw** | 241 | 500 | ~149 | ❌ | 🟡 中位震荡 | 质量收敛+积压消化 |
| **NanoBot** | 2 | 30 | 8 | ❌ | 🟢 高 | 资源治理+WebUI打磨 |
| **CoPaw** | 23 | 38 | 14 | ❌ | 🟢 高 | 2.2 GA 收敛 |
| **LobsterAI** | 1 | 29 | 29 | ✅ 2026.9.3/9.4 | 🟢 高 | 日更版本列车 |
| **NanoClaw** | 2 | 18 | 2 | ❌ | 🟢 稳定 | Provider契约重构 |
| **IronClaw** | 6 | 14 | 2 | ❌ | 🟢 稳定 | UX打磨+LLM架构 |
| **PicoClaw** | 4 | 21 | 19 | ❌ | 🟢 高（清理中） | 历史清理+主干同步 |
| **Zeroclaw** | 5 | 50 | 8 | ❌ | 🟠 review 积压 | v0.9 大版本窗口 |
| **Moltis** | 0 | 1 | 0 | ❌ | ⚪ 静默 | 架构演进蓄势 |

**关键观察**：OpenClaw 的 PR/Issue 数量远超同类（PR 500、Issue 241），但合并率仅 ~30%，反映**维护者 review 漏斗较窄**这一核心瓶颈；Zeroclaw 同样面临 84% PR 待合并的积压问题；LobsterAI 是唯一连续发布双版本的项目，交付节奏最快；Moltis 是唯一完全静默的项目，需警惕社区参与度下降风险。

---

## 3. OpenClaw 在生态中的定位

### 核心参照地位
OpenClaw 是本次对比的基准项目，其社区规模、议题广度与技术纵深均居首位，是事实上的**生态参照系**。

### 与同类项目的对比

| 维度 | OpenClaw | NanoBot | CoPaw | NanoClaw | PicoClaw |
|------|----------|---------|-------|----------|----------|
| **议题广度** | 极广（241 条） | 聚焦（2 条） | 中（23 条） | 窄（2 条） | 窄（4 条） |
| **架构成熟度** | 高（多通道、多代理） | 中（v0.3.0 回归修复） | 中高（2.2 GA） | 中（Provider 抽象中） | 中（清理期） |
| **社区规模** | 最大（含企业/个人/团队） | 中（深度用户） | 中（Hub 路线图驱动） | 小（核心贡献者驱动） | 小（边缘部署用户） |
| **技术路线** | 多代理+多通道+SQLite 持久化 | TUI+WebUI 双前端 | 多租户 Hub+Console | 容器化+A2A 通信 | Provider 矩阵+边缘设备 |

### 优势
- **议题覆盖最全**：从会话状态、WebChat 一致性、容器 PID 复用到国产模型集成，几乎涵盖所有同类项目痛点；
- **PR 储备最深**：#138694（mcp 热重载）、#138623（heartbeat 重构）等高质量 PR 处于"ready for maintainer look"状态；
- **社区自发聚合**：#69208（跨通道 transcript umbrella）等用户主导的议题聚合行为，显示出**自组织能力**。

### 短板
- **合并漏斗窄**：大量 `linked-pr-open` 仍停留在 `needs proof / waiting on author`；
- **升级摩擦大**：5.28→6.1 静默迁移（#90378）、WebChat 回归（#110771/#118560/#110368）等问题提示**升级契约可见性不足**；
- **多代理编排尚不稳健**：#43367 仍是开放议题，制约 agent swarm 叙事。

---

## 4. 共同关注的技术方向

### 4.1 SQLite 持久化的稳定性与维护
- **OpenClaw**：#113306（snapshot restore 缺乏 crash/identity 保障）、#71689（tasks/runs.sqlite 损坏恢复失败）、#119720（ANALYZE 未运行，36.7s→809ms 复现）、#119411（memory watcher 不重索引）、#87447（DREAMS.md 无界增长）
- **LobsterAI**：#1071（SQLite 三连缺陷：CASCADE 失效、save 非原子写、`storeInitPromise` 超时永久故障）
- **信号**：SQLite 已成为 AI 智能体的默认存储引擎，但**事务化写入、外键约束、统计信息维护、文件 watcher 与索引一致性**四大问题在多项目复现，是当前最普遍的工程债。

### 4.2 容器化/PID 复用下的锁语义失效
- **OpenClaw**：#114234（usage-cost refresh lock 容器 PID 复用下不可释放）、#113149、#97616（子进程泄漏→zombie 累积）
- **信号**：随着 systemd/容器部署普及，传统基于 PID 文件的锁机制在 PID 复用下失效，需引入**抽象锁服务**或**租约机制**。

### 4.3 Provider 契约与国产/企业模型集成
- **NanoClaw**：#3586/#3588/#3584/#3591（OpenCode/Codex Provider 契约统一化）、#3722（OpenCode 适配技能）
- **PicoClaw**：#1683（OpenAI 兼容严格模式）、#1858（Ollama 思考回退）、#1860（Azure AI Foundry 识别）、#2260（xAI 兼容）、#2624（OpenAI 兼容 Embeddings）
- **OpenClaw**：#26037（阿里云百炼 coding plan，含 thinking/reasoning，👍 4）、#83954（Pro 套餐路径）
- **信号**：Provider 抽象层正在从"各自实现"走向"契约统一"，**OpenAI 兼容协议 + 推理字段（thinking/reasoning）** 成为事实标准；国产模型集成诉求强烈但缺乏官方合作通道。

### 4.4 WebUI 可观测性与上下文透明度
- **NanoBot**：#5631 → #5660（WebUI 展示模型速度、上下文用量，对齐 DeepSeek Harness）
- **CoPaw**：#7560（Loop 模式选择持久化）、#7552/#7555（Loop 模式显示丢失）
- **OpenClaw**：#118560（WebChat canvas 隐藏早期消息）、#110368（ACP+WebChat 重复气泡）
- **信号**：用户希望从"黑盒对话"转向"透明上下文"，**token 消耗、模型速度、上下文窗口**成为 WebUI 标配诉求。

### 4.5 渠道消息语义的一致性
- **NanoBot**：#5567（飞书多轮回复整合为单条流式卡片）
- **OpenClaw**：#69208（跨通道 transcript 重复、重放、context 组装 umbrella）、#87544（通道范围内会话 transcript 与客户端投递不一致）、#88032（Telegram quote/reply 持久入站契约）
- **PicoClaw**：#1855/#2090/#2091/#2092（飞书/Telegram 群组、流式、重复消息修复）
- **信号**：IM 渠道的"一问一答"心智模型与 agent 的"多阶段输出"现实之间存在结构性冲突，**流式整合 + 持久入站契约** 是解决方向。

### 4.6 多代理/任务生命周期的并发正确性
- **OpenClaw**：#43367（多代理编排不稳定，session-lock 失败）
- **CoPaw**：#7559（任务执行中触发 409 报错，未进队列）、#7567（点击停止但实际仍在执行）、#6921（多步任务静默停止）
- **NanoClaw**：#3718/#3719（A2A 通信身份丢失、失败反馈缺失）
- **信号**：并发场景下**UI 与执行真相的偏差**是用户信任度的最大杀手，需建立**统一的执行状态机 + 队列语义**。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|----------|----------|------------------|
| **OpenClaw** | 全功能多代理平台 | 个人/团队/企业，最广泛用户群 | 多通道+多代理+SQLite 持久化+容器化部署 |
| **NanoBot** | TUI+WebUI 双前端 + DeepSeek Harness 式体验 | 深度技术用户、终端控 | OpenTUI 0.5.10 + WebSocketChannel 重构 |
| **CoPaw** | 企业级多租户 Hub | 团队/企业，强调协作 | Hub 多租户 + Console/Desktop/Mobile 多端 |
| **LobsterAI** | 一体化桌面应用 + 商业化订阅 | C 端为主，订阅制商业模式 | 应用内浏览器 + 订阅链路 + IM Bot 多实例 |
| **NanoClaw** | Provider 抽象 + A2A 通信 | 平台型用户，关注互操作性 | 容器化 + 技能安装硬化 + Provider 契约 |
| **IronClaw** | WebUI 命令面板 + LLM 缓存优化 | UX 敏感用户 | prompt-cache 键派生 + 沙箱执行器（规划中） |
| **PicoClaw** | Provider 矩阵 + 边缘/嵌入式部署 | ARM/Raspberry Pi/路由器用户 | OpenAI 兼容严格模式 + 边缘优化 |
| **Zeroclaw** | Rust 性能 + 多媒体（TTS/Matrix 语音） | 性能敏感 + 多媒体交互场景 | Rust 全栈 + TtsManager + Matrix MSC3245 |
| **Moltis** | 外部 Agent 流式接入 | 架构探索者 | AGY CLI OAuth 复用 + 事件协议统一 |

**关键差异化判断**：
- **OpenClaw vs CoPaw**：前者是"广度优先"的通用平台，后者是"深度优先"的企业协作；
- **NanoBot vs IronClaw**：前者侧重 CLI/TUI 体验，后者侧重 WebUI 命令面板打磨；
- **PicoClaw vs Zeroclaw**：前者走 Provider 矩阵路线，后者走 Rust 性能路线；
- **NanoClaw**：定位最接近"Agent 互操作性平台"，A2A 通信是其差异化标签。

---

## 6. 社区热度与成熟度

### 第一梯队：快速迭代 + 高活跃度
- **OpenClaw**（241 Issue + 500 PR）：议题/代码量双冠，但合并率偏低，处于"积压消化期"
- **LobsterAI**（29 PR + 双版本发布）：日更版本列车，交付节奏最快
- **CoPaw**（23 Issue + 38 PR）：2.2 GA 收敛期，质量与节奏平衡良好

### 第二梯队：质量巩固 + 方向明确
- **NanoBot**（2 Issue + 30 PR）：聚焦资源治理与 WebUI 打磨，单点修复效率高
- **Zeroclaw**（50 PR）：v0.9 大版本窗口已开启，但 review 积压严重（仅 16% 合并率）
- **NanoClaw**（18 PR）：Provider 契约重构是清晰主线

### 第三梯队：清理/静默/扩张
- **PicoClaw**（19 PR 合并）：历史 stale PR 批量清理 + 大规模主干对齐（#2810 同步 1095 commits）
- **IronClaw**（14 PR）：UI/UX 打磨为主，UX-Issue-PR 同日闭环率 4/4
- **Moltis**（1 PR）：静默但有架构意图（#1258 external-agents）

---

## 7. 值得关注的趋势信号

### 趋势一：SQLite 成为 AI 智能体的"默认存储引擎"，但治理能力滞后
**信号强度**：🔴 强（OpenClaw + LobsterAI 多 Bug 复现）
**对开发者的参考**：在生产部署中，SQLite 需配合**WAL 模式、外键启用、定期 ANALYZE、备份与灾难恢复**四件套；不要假设 SQLite "开箱即用"足够安全。

### 趋势二：Provider 抽象层正在走向"契约统一"
**信号强度**：🟡 中（NanoClaw + PicoClaw 主推）
**对开发者的参考**：设计新 Provider 时应优先实现**OpenAI 兼容协议 + reasoning/thinking 字段透传 + 流式 usage**，而不是各家私有协议；这将显著降低接入成本。

### 趋势三：WebUI 可观测性成为差异化竞争点
**信号强度**：🟡 中（NanoBot + CoPaw + OpenClaw 均在投入）
**对开发者的参考**：用户期望看到 token 消耗、模型速度、上下文窗口、工具调用链路，**"黑盒对话"正在被"透明上下文"取代**。

### 趋势四：容器/PID 复用暴露传统锁机制的脆弱性
**信号强度**：🟠 中高（OpenClaw 多个 S2/S3 级 Bug）
**对开发者的参考**：在 systemd/容器/K8s 环境下，应避免基于 PID 的锁，改用**分布式锁、租约、抽象锁服务**。

### 趋势五：UI 与执行真相的一致性是用户信任的底线
**信号强度**：🔴 强（CoPaw #7567、OpenClaw #43367、NanoClaw #3718）
**对开发者的参考**：必须建立**统一的执行状态机**，让"点击停止"等于"任务终止"，让"已发送"等于"已进入队列"，否则用户对模型能力的信任会被结构性消耗。

### 趋势六：国产模型集成是新兴蓝海，但官方合作通道缺失
**信号强度**：🟡 中（OpenClaw #26037 👍 4，PicoClaw #3366）
**对开发者的参考**：阿里云百炼、DeepSeek、智谱 GLM 等国产模型的 OpenAI 兼容层已相对成熟，**做好 reasoning/thinking 字段透传 + prompt cache 头**即可低成本接入；建议优先支持阿里云百炼 coding plan（社区呼声最高）。

### 趋势七：版本"日更列车" vs "长周期 GA" 的两条路线
**信号强度**：🟢 观察级
**对开发者的参考**：LobsterAI 的日更模式适合 C 端商业化产品（快速响应用户反馈），OpenClaw/CoPaw 的长周期 GA 模式适合平台型项目（保证企业级稳定性）；选择哪条路线取决于用户容忍度与发布工程能力。

---

## 附录：健康度风险提示

| 项目 | 主要风险 | 建议关注 |
|------|----------|----------|
| OpenClaw | 合并漏斗窄（30% 合并率）、升级摩擦大 | 推动 #114234/#119720/#90378 进入 RC |
| Zeroclaw | 84% PR 待合并，6 条安全 PR 超 40 天 review | 集中 review #9419/#10337/#9002 |
| LobsterAI | SQLite 三连缺陷已 stale 159 天 | 优先响应 #1071 |
| PicoClaw | 大规模主干同步（#2810）潜在回归 | 0.3.2 前做集成回归 |
| CoPaw | 2.2 GA 前的并发正确性（#7559/#7567/#7534） | GA 前完成收敛 |
| Moltis | 社区参与度过低 | 主动 ping reviewer 推动 #1258 |

---

*报告基于 2026-09-05 各项目 GitHub 公开数据生成，所有 Issue/PR 编号均可通过对应仓库检索。*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目日报
**日期：2026-09-05**

---

## 1. 今日速览

NanoBot 今日整体活跃度**较高**，Issues 板块新增 2 条、关闭 3 条，PR 板块涌入 30 条更新（22 条待合并、8 条已合/闭），呈现典型的"集中提交日"特征。技术主线集中在 **OpenCode 会话亲和性头修复（紧急）**、**渠道缓存/资源泄漏治理**、以及 **WebUI 体验打磨**三大方向。无新版本发布，迭代节奏健康。值得关注的是，9 月 6 日起 OpenCode Zen/Go 将强制要求 `x-opencode-session` 头，相关修复（[#5662](https://github.com/HKUDS/nanobot/pull/5662)）已标记为 **P1 优先级**，属于强时效性需求。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展（已合并/关闭的重要 PR）

今日共有 8 条 PR 被关闭，剔除维护性合并后，以下 4 条具有实质性推进意义：

- **[#5660](https://github.com/HKUDS/nanobot/pull/5660) feat(webui): show model generation speed in context usage popover** —— 闭环了 [#5631](https://github.com/HKUDS/nanobot/issues/5631) 的体验诉求，在 WebUI 上下文用量弹窗中新增了模型生成速度（tokens/s）指标，与已有的生成耗时并列展示，对齐 DeepSeek Harness 体验。
- **[#5639](https://github.com/HKUDS/nanobot/pull/5639) fix: stabilize session labels, TUI streaming, and pairing prompts** —— 综合性修复：居中项目会话句柄与标题、升级 OpenTUI 0.5.3 → 0.5.10 解决流式围栏代码不可见问题、保留活动终端前景色让围栏代码块可见。
- **[#5657](https://github.com/HKUDS/nanobot/pull/5657) refactor(webui): extract outbound wire encoding** —— 重构 WebSocketChannel，将 `recovery_state` 与 `turn_end` 类型化载荷编码器抽出，替换按事件传输方法为共享 `send_payload` 原语。
- **[#5665](https://github.com/HKUDS/nanobot/pull/5665) fix(mcp): bound browser OAuth flows**（**P2**）—— 修复 MCP OAuth 浏览器流在内存中无上限增长的隐患。

**整体评估：** 项目在 **资源治理（缓存/会话/OAuth 流的容量上限）**、**WebUI 可观测性** 和 **运行时上下文控制** 上迈出了坚实一步。

---

## 4. 社区热点

按评论数排序，今日最具讨论价值的话题如下：

| 排名 | 编号 | 标题 | 评论数 | 👍 |
|---|---|---|---|---|
| 1 | [#5567](https://github.com/HKUDS/nanobot/issues/5567) | 飞书渠道应整合多轮回复为单条流式卡片消息 | 4 | 0 |
| 2 | [#5631](https://github.com/HKUDS/nanobot/issues/5631) | 在 webui 里面展示上下文、模型速度这些信息 | 2 | 0 |
| 3 | [#5645](https://github.com/HKUDS/nanobot/issues/5645) | 0.3.0 中 Current Time runtime context 默认缺失 | 1 | 0 |
| 4 | [#5644](https://github.com/HKUDS/nanobot/issues/5644) | WebUI 渠道 locale 注册表并发加载丢 locale | 1 | 0 |

**诉求分析：**
- **飞书渠道消息整合（[#5567](https://github.com/HKUDS/nanobot/issues/5567)）** 是当前社区最热门议题：用户在飞书侧看到的是多条分散消息（流式阶段、工具提示、最终回复），与"一问一答"的认知不符。该问题已存在近 10 天，仍未合入修复方案，建议维护者优先处理。
- **WebUI 信息可见性** 是另一条强诉求，用户希望像 DeepSeek Harness 一样能直观看到模型速度与上下文消耗，目前已通过 [#5660](https://github.com/HKUDS/nanobot/pull/5660) 落地。
- **0.3.0 回归问题**（[#5645](https://github.com/HKUDS/nanobot/issues/5645)）虽讨论少但属严重：运行时上下文中"当前时间"块默认缺失，与文档承诺不符，破坏下游应用。

---

## 5. Bug 与稳定性

按严重程度排序：

### 🔴 P1 - 高严重度（时效性强制）
- **[#5661](https://github.com/HKUDS/nanobot/issues/5661) OpenCode Zen/Go 会话亲和性头缺失** —— 自 **2026-09-06 起** 未携带 `x-opencode-session` 头将触发错误并丧失 prompt cache 优化。**已配套修复 PR：[#5662](https://github.com/HKUDS/nanobot/pull/5662)**（标记 P1，OPEN 状态）。**维护者须在今晚前合并。**

### 🟠 P2 - 中等严重度（已修复或修复中）
- **[#5645](https://github.com/HKUDS/nanobot/issues/5645)** 0.3.0 缺失默认 Current Time runtime context — **已关闭**，由 [#5659](https://github.com/HKUDS/nanobot/pull/5659)（feat(runtime-context): opt-out ephemeral runtime-context blocks）提供解法。
- **[#5644](https://github.com/HKUDS/nanobot/issues/5644)** WebUI locale 注册表并发丢 locale（如 `en`）— **已关闭**，暂无单独修复 PR 关联说明。
- **[#5664](https://github.com/HKUDS/nanobot/pull/5664) fix(agent): bound idle summary cache** — `AutoCompact._summaries` 字典无界，已修复。
- **[#5663](https://github.com/HKUDS/nanobot/pull/5663) fix(mattermost): bound thread context cache** — Mattermost `_thread_context_attempted` 集合无界，已修复。
- **[#5665](https://github.com/HKUDS/nanobot/pull/5665) fix(mcp): bound browser OAuth flows** — MCP OAuth 流内存无界，已修复。
- **[#5658](https://github.com/HKUDS/nanobot/pull/5658) fix(webui): generate session title when envelope omits webui flag** — WebUI 会话标题未生成，已修复。
- **[#5648](https://github.com/HKUDS/nanobot/pull/5648) fix(webui): check session metadata when generating webui titles** — WebUI 标题生成时检查会话元数据，已修复。
- **[#5490](https://github.com/HKUDS/nanobot/pull/5490) fix(webui): clarify aggregate turn token usage** — 多请求聚合 token 用量显示不清，标记 conflict 待解决。

**整体评估：** 本日 Bug 修复主题高度聚焦——**"无界内存增长"成为系统性主题**，涉及 idle summary、mattermost thread、mcp oauth、agent schedule 四处。这反映出 v0.3.0 系列在缓存/资源管理上的一致性短板，已被批量识别并修复。

---

## 6. 功能请求与路线图信号

| 需求 | 对应 Issue/PR | 进入下版本可能性 |
|---|---|---|
| OpenCode `x-opencode-session` 头 | [#5661](https://github.com/HKUDS/nanobot/issues/5661) / [#5662](https://github.com/HKUDS/nanobot/pull/5662) | ⚡ **极高（强制）** |
| 飞书渠道多消息合并为单条流式卡片 | [#5567](https://github.com/HKUDS/nanobot/issues/5567) | 🟢 高（持续热门，4 条评论） |
| 上下文压缩（`/compact`）在渠道中可见 | [#5656](https://github.com/HKUDS/nanobot/pull/5656) | 🟢 高（PR 已开） |
| aimlapi.com 作为内置 OpenAI-兼容 provider | [#5666](https://github.com/HKUDS/nanobot/pull/5666) | 🟡 中（外部商业合作 PR，待评审） |
| 文件系统 `copy_file` / `move_file` 工具 | [#5626](https://github.com/HKUDS/nanobot/pull/5626) | 🟢 高（社区刚需） |
| Langfuse tracing for Codex | [#5520](https://github.com/HKUDS/nanobot/pull/5520) | 🟡 中（仅 Codex 用户受益） |
| 心跳机制支持共享会话 / 自定义模型 | [#4551](https://github.com/HKUDS/nanobot/pull/4551) / [#4549](https://github.com/HKUDS/nanobot/pull/4549) | 🟡 中（已挂起 2 个月） |
| 后台任务失败上报 | [#5431](https://github.com/HKUDS/nanobot/pull/5431) | 🟡 中 |
| 模型重试状态在 UI 暴露 | [#5504](https://github.com/HKUDS/nanobot/pull/5504) | 🟡 中 |
| Memory 完整保留 consolidation 输入 | [#5379](https://github.com/HKUDS/nanobot/pull/5379) | 🟢 高（长期挂起 23 天） |

---

## 7. 用户反馈摘要

从 Issues 评论与 PR 描述中提炼：

- **可观测性诉求强烈**：WebUI 用户希望像 DeepSeek Harness 一样直接看到 **模型速度、上下文用量**（[#5631](https://github.com/HKUDS/nanobot/issues/5631)），目前已在 [#5660](https://github.com/HKUDS/nanobot/pull/5660) 中得到回应。
- **渠道体验割裂**：飞书用户对"一问多答"的体验不满（[#5567](https://github.com/HKUDS/nanobot/issues/5567)），认为 agent 回复应当收敛为单条流式消息，与飞书 IM 习惯对齐。
- **0.3.0 回归担忧**：用户在升级到 0.3.0 后发现 Current Time runtime context 消失，与文档承诺不符（[#5645](https://github.com/HKUDS/nanobot/issues/5645)），这反映出**版本升级的隐式行为变化**对下游用户有切实影响。
- **生态接入需求**：外部 AI 聚合平台（aimlapi）主动提交 PR 寻求成为内置 provider（[#5666](https://github.com/HKUDS/nanobot/pull/5666)），说明 NanoBot 在第三方生态中已具备一定吸引力。

---

## 8. 待处理积压（提醒维护者关注）

以下 PR/Issue **长期挂起**，需要维护者关注：

| 编号 | 类型 | 标题 | 挂起天数 |
|---|---|---|---|
| [#4551](https://github.com/HKUDS/nanobot/pull/4551) | PR (P2) | feat(heartbeat): add isolated_session config | ~71 天 |
| [#4549](https://github.com/HKUDS/nanobot/pull/4549) | PR (P2) | feat(heartbeat): add model_override config | ~71 天 |
| [#5379](https://github.com/HKUDS/nanobot/pull/5379) | PR (P2) | fix(memory): preserve full consolidation input | ~23 天 |
| [#5431](https://github.com/HKUDS/nanobot/pull/5431) | PR | fix(agent): report background task failures | ~18 天 |
| [#5490](https://github.com/HKUDS/nanobot/pull/5490) | PR (P2, conflict) | fix(webui): clarify aggregate turn token usage | ~14 天，**存在冲突需 rebase** |
| [#5504](https://github.com/HKUDS/nanobot/pull/5504) | PR (P2) | fix(ui): surface model retry status (NAN-34) | ~12 天 |
| [#5520](https://github.com/HKUDS/nanobot/pull/5520) | PR (P2) | feat(provider): langfuse tracing for codex | ~12 天 |
| [#5626](https://github.com/HKUDS/nanobot/pull/5626) | PR | feat(tools): add copy_file and move_file filesystem tools | ~4 天 |
| [#5567](https://github.com/HKUDS/nanobot/issues/5567) | Issue | 飞书渠道多轮回复整合 | ~9 天，**4 条评论无 PR 关联** |

**建议：** 心跳相关的 [#4551](https://github.com/HKUDS/nanobot/pull/4551) 和 [#4549](https://github.com/HKUDS/nanobot/pull/4549) 已挂起超过 10 周，建议维护者要么合并要么关闭以清理 backlog；[#5490](https://github.com/HKUDS/nanobot/pull/5490) 的合并冲突需作者尽快 rebase；[#5567](https://github.com/HKUDS/nanobot/issues/5567) 作为当前评论数最高的 Issue 仍无对应修复 PR，建议优先响应。

---

*日报基于 2026-09-04 至 2026-09-05 的 GitHub 公开数据自动生成。*

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报

**日期：2026-09-05**
**数据周期：过去 24 小时**

---

## 1. 今日速览

Zeroclaw 今日整体活跃度处于**中高水平**，过去 24 小时内共产生 5 条 Issue 更新和 **50 条 PR 更新**（其中 42 条仍处于待合并状态），但**无新版本发布**。当日工作重点明显集中在两条主线：(1) **渠道/TTS 多媒体层的稳健性修复**（Matrix 语音时长、TTS provider 注册可见性、媒体占位符泄漏）；(2) **运行时与 agent 生命周期的协调重构**（PR #10621 引入共享 live-config 权限）。合并/关闭率（8/50 = 16%）较低，结合 42 条 open PR 反映维护者面临显著的 review backlog。

---

## 2. 版本发布

⚠️ **无新版本发布**。当前发布节奏似乎处于间歇期；v0.8.5 stabilization tracker（#9459）显示该稳定线已超过 8 月 30 日截止日，建议关注维护者是否会在近期 cut 一个补丁版本。

---

## 3. 项目进展

今日有 **8 条 PR 进入已合并/已关闭** 状态，重要进展如下：

| PR | 标题 | 状态 | 推进点 |
|---|---|---|---|
| [#10587](https://github.com/zeroclaw-labs/zeroclaw/pull/10587) | chore(deps): bump rust-all group (49 updates) | CLOSED | Rust 全量依赖更新收口 |
| [#10153](https://github.com/zeroclaw-labs/zeroclaw/pull/10153) | feat(whatsapp-web): port to whatsapp-rust 0.7.0 | CLOSED | 6 个 git-pinned 依赖替换为 crates.io 0.7.0，为 `zeroclaw-channels` 发布铺路 |

**观察**：今日实质性合并的 feature/fix PR 较少，多数关闭动作为依赖类与协调性工作。安全与稳定性修复类（provider 凭证轮换 #9419、git allowed-roots #10337、cron 超时 #9320）仍滞留在待合并队列，意味着高风险修复的 review 周期偏长。

---

## 4. 社区热点

按评论数与议题热度排序：

1. **[#8720 — Bedrock Nova 2 Lite 缓存点关闭需求](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)** — 🔥 **10 条评论**，是过去 24h 内最活跃的讨论帖。用户 @ngamradt 在使用 `us.amazon.nova-2-lite-v1:0` 时随机遭遇缓存报错，希望通过配置文件禁用 cachePoint。已 CLOSED，说明已有解决方案或已被替代方案覆盖。
2. **[#10390 — 进入非活跃 Chat pane 阻塞 ZeroCode 导航](https://github.com/zeroclaw-labs/zeroclaw/issues/10390)** — TUI 组件的 S2 级退化，已 CLOSED。
3. **[#9459 — v0.8.5 稳定线追踪](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)** — 类型为 release tracker 的里程碑帖，仍 OPEN，长期追踪。

**诉求分析**：Bedrock 缓存报错议题的高评论数（10）反映出 AWS Bedrock 用户群体对**配置灵活度**的强烈需求——他们不愿意通过修改模型调用栈，而是希望保留上层 provider 切换能力的前提下做细粒度关闭。

---

## 5. Bug 与稳定性

### 🔴 S2 级（严重降级行为）

| Issue | 标题 | 影响面 | 是否有 fix PR |
|---|---|---|---|
| [#10626](https://github.com/zeroclaw-labs/zeroclaw/issues/10626) | TTS 逐字合成 Markdown 与 emoji | provider / TTS 全链路 | ✅ [#10628](https://github.com/zeroclaw-labs/zeroclaw/pull/10628) 已挂关联修复（TTS provider 注册可见性） |
| [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | 内部 `[media attachment]` 占位符泄漏给纯文本模型用户 | channel 全量 | ❌ 暂无直接 fix PR |
| [#10390](https://github.com/zeroclaw-labs/zeroclaw/issues/10390) | 进入非活跃 Chat pane 阻塞导航 | zerocode/TUI | ✅ 已 CLOSED（修复内容未在 PR 列表中明确展示） |

### 🟡 P2 / 中风险（待合并修复）

- **[#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)** `fix(tools): honor allowed roots for git operations` — 高风险安全类（do-not-merge 中），size XL，需 maintainer 重审。
- **[#9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419)** `fix(providers): rotate live credentials after rate limits` — 多 provider 凭证轮换，needs-maintainer-review。
- **[#10016](https://github.com/zeroclaw-labs/zeroclaw/pull/10016)** `fix(hooks): correlate webhook audit calls by identity` — 维护者新增 commit `a677fdd60b` 修复 after-hook 未到达时参数残留内存问题。

**稳定性信号**：本期 bug 多集中在**多媒体边界**（语音/TTS/Markdown/媒体附件），属于历史累积型而非新增回归。

---

## 6. 功能请求与路线图信号

| 信号源 | 需求 | 可能落地版本 |
|---|---|---|
| [#10613](https://github.com/zeroclaw-labs/zeroclaw/pull/10613) | **VI 约束标签对齐规范**（payment.* → mandate. 前缀） | 下个 minor（约束标识格式已固定） |
| [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) | **agent 生命周期变更协调**（daemon/gateway/ACP/CLI 共享 live-config 权限） | 大版本信号，可能进 v0.9 |
| [#10158](https://github.com/zeroclaw-labs/zeroclaw/pull/10158) | **workspace crates.io 发布**（23 crate 协调发布） | 重大里程碑，配套 v0.9 |
| [#10489](https://github.com/zeroclaw-labs/zeroclaw/pull/10489) | **Matrix MSC3245 语音回复**（TtsManager 扩展至 Matrix 渠道） | 当前 minor 内 |
| [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) | **Gateway WebSocket viewer 断开后保留 agent turn** | 当前 minor |

**路线图读数**：`v0.8.5` 稳定线已进入收尾（#9459），而 `crates.io` 集中发布（#10158）+ agent 生命周期重构（#10621）+ VI 规范对齐（#10613）三项叠加，强烈暗示 **v0.9 大版本窗口已开启**。

---

## 7. 用户反馈摘要

### 🎯 真实用户痛点

- **@ngamradt**（[#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)）：在 Bedrock Nova 2 Lite 上"随机遭遇缓存错误"，希望"通过配置文件而非改代码"的方式关闭 cachePoint。说明用户群体中存在大量 **AWS Bedrock 适配者**，希望 Zeroclaw 提供更细粒度的 provider 行为开关。
- **@sebkraemer**（[#10626](https://github.com/zeroclaw-labs/zeroclaw/issues/10626)）：在 self-hosted 部署中反馈 TTS 将 Markdown 标记和 emoji 名字直接朗读出来，影响语音交互自然度。
- **@sebkraemer**（[#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)）：当用户与不带视觉能力的模型对话时，看到的是字面量 `[media attachment]` 占位符，体验非常差。
- **@Audacity88**（[#10390](https://github.com/zeroclaw-labs/zeroclaw/issues/10390)）：ZeroCode 在 Chat pane 处于 inactive 重试态时，全局模式切换被阻塞，反映出**异步初始化边界条件**未充分考虑。

### ✅ 满意信号
社区 PR #10627（Matrix 真实语音时长）、#10628（TTS provider 可见性）几乎是 @sebkraemer 当日连续开单后即配套挂出的修复，表明维护者响应链条紧密。

---

## 8. 待处理积压 ⚠️

以下高优先级 PR **已挂起 30 天以上**，建议维护者优先 review：

| PR | 标题 | 挂起时长 | 卡点原因 |
|---|---|---|---|
| [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) | fix(gateway): keep agent turns alive after viewer disconnect | ~56 天 | needs-author-action，size XL |
| [#9272](https://github.com/zeroclaw-labs/zeroclaw/pull/9272) | feat(anthropic): handle refusals with fallback notices | ~44 天 | needs-maintainer-review |
| [#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) | fix(cron): bound agent job runs with wall-clock timeout | ~44 天 | needs-maintainer-review |
| [#9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419) | fix(providers): rotate live credentials after rate limits | ~41 天 | needs-maintainer-review，do-not-merge |
| [#9317](https://github.com/zeroclaw-labs/zeroclaw/pull/9317) | fix(zerocode): render transient frames as viewport slice | ~44 天 | needs-maintainer-review |
| [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) | feat(runtime): expose token accounting on history-trim | ~33 天 | status:blocked |
| [#10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) | fix(channels): restore supervised shell approval routing | ~14 天 | status:blocked |

**健康度告警**：6 条 PR 超过 40 天 review 周期，其中 #9419（凭证轮换）和 #9002（gateway viewer 断开保护）均为**安全/可用性相关**，积压会带来实际生产风险。

---

### 📊 项目健康度总评

| 维度 | 评分 | 说明 |
|---|---|---|
| 提交活跃度 | ⭐⭐⭐⭐ | 50 条 PR/日，依赖与功能并进 |
| Review 吞吐 | ⭐⭐ | 仅 16% PR 当日关闭，积压严重 |
| Bug 响应 | ⭐⭐⭐⭐ | @sebkraemer 当日连续开单 + 关联 fix |
| 版本节奏 | ⭐⭐ | 无发布，v0.8.5 已超期 |
| 社区参与 | ⭐⭐⭐ | 评论集中在少数用户，多元化不足 |

**维护者行动建议**：(1) 集中 review 高风险安全 PR（#9419、#10337）；(2) 给出 v0.8.5 收尾或切到 v0.9 的明确公告；(3) 对 #10625（媒体占位符泄漏）指派 owner，避免成为下一个长尾 bug。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报

**报告日期**：2026-09-05
**项目地址**：[github.com/sipeed/picoclaw](https://github.com/sipeed/picoclaw)
**数据周期**：过去 24 小时（2026-09-04 至 2026-09-05）

---

## 一、今日速览

PicoClaw 今日整体处于**清理与整合阶段**，仓库无新版本发布，活跃度以 PR 合入为主。过去 24 小时内共处理 21 个 PR，其中 19 个已合并/关闭（多数为积压已久的 stale PR 集中关闭），仅 2 个 PR 待合并；Issues 侧有 4 条更新，其中 2 条为昨日新开。值得关注的是，大量来自贡献者 @badgerbees 的早期 PR（创建于 2026-03~04 月）被集中批量处理，同时伴随一次大型 upstream 同步（PR #2810，1095 commits）。整体反映出维护团队正在做一次历史遗留 PR 的清理与主干对齐工作，社区讨论热度较平稳。

---

## 二、版本发布

⚠️ 无新版本发布。

当前最新版本仍为 **v0.3.1**（nightly 构建亦报告为 0.3.1）。考虑到近期批量合入大量修复与新 provider 支持，下一版本（可能为 0.3.2 或 0.4.0）的发布窗口或已临近。

---

## 三、项目进展

今日共 19 个 PR 被合并/关闭，项目进展按方向归纳如下：

### 🔌 Provider（模型供应商）生态显著扩展
- **#1683** [[OPENAI 兼容严格模式]](https://github.com/sipeed/picoclaw/pull/1683)：为 `openai_compat` provider 实现 strict mode 兼容性，自动剥离第三方 provider 的 `strict: true` 标记（Fail-Safe Sanitization）。
- **#1858** [[Ollama 思考回退]](https://github.com/sipeed/picoclaw/pull/1858)：在 OpenAI 兼容 provider 中加入 `thinking` / `reasoning` 字段支持，避免 DeepSeek-R1 等推理模型在 Ollama 上输出丢失。
- **#1860** [[Azure AI Foundry 识别]](https://github.com/sipeed/picoclaw/pull/1860)：识别 `*.services.ai.azure.com` 端点，启用 prompt caching 与 native search。
- **#2240** [[GitHub Copilot stdio]](https://github.com/sipeed/picoclaw/pull/2240)：为 GitHub Copilot provider 增加 stdio 传输支持。
- **#2260** [[xAI 兼容支持]](https://github.com/sipeed/picoclaw/pull/2260)：通过 OpenAI 兼容路径接入 xAI，附带别名、默认配置与测试。
- **#2522** [[流式 usage]](https://github.com/sipeed/picoclaw/pull/2522)：为原生 OpenAI 与 Azure OpenAI 启用 `stream_options.include_usage`。
- **#2624** [[OpenAI 兼容 Embeddings]](https://github.com/sipeed/picoclaw/pull/2624)：为 vLLM 风格端点提供 embedding 支持。

### 💬 Channel（消息渠道）稳定性增强
- **#1855** [[Telegram 群组 ID 修复]](https://github.com/sipeed/picoclaw/pull/1855)：修复 Telegram 负整数群/频道 ID 被误判的问题。
- **#2090** [[Telegram 流式路由]](https://github.com/sipeed/picoclaw/pull/2090)：修复流式输出残留草稿与 Forum/Topic 路由错误。
- **#2091** [[飞书 @ 检测]](https://github.com/sipeed/picoclaw/pull/2091)：启动时探测 bot display name，解决飞书群 @ 误识别。
- **#2092** [[Telegram 重复消息]](https://github.com/sipeed/picoclaw/pull/2092)：流式编辑超时时避免发送重复消息。
- **#2089** [[Slack mention 竞态]](https://github.com/sipeed/picoclaw/pull/2089)：解决 Slack `message` 与 `app_mention` 同时触发导致的会话分裂。

### 🤖 Agent 健壮性提升
- **#1854** [[tool_call_id 去重]](https://github.com/sipeed/picoclaw/pull/1854)：occurrence-aware 工具 ID 清洗，修复 Anthropic/Cerebras 的 400 错误。
- **#2014** [[Token 估算]](https://github.com/sipeed/picoclaw/pull/2014)：将 `SystemParts` 纳入 token 估算，避免上下文溢出。
- **#2016** [[上下文溢出检测]](https://github.com/sipeed/picoclaw/pull/2016)：改进对 Anthropic / ZhipuAI / GLM 上下文溢出错误的识别。
- **#2088** [[Bot 默认安全审计]](https://github.com/sipeed/picoclaw/pull/2088)：对 `allow_from` 为空的 bot 默认开放状态加入安全提示。

### 🛠 工具与同步
- **#2298** [[exec preflight fail-closed]](https://github.com/sipeed/picoclaw/pull/2298)：脚本预检歧义时改为 fail-closed，避免静默跳过校验。
- **#3337** [[MCP 失败导致 agent loop 卡死]](https://github.com/sipeed/picoclaw/pull/3337)：修复 MCP 服务器连接失败时聊天完全无响应的问题。
- **#2810** [[upstream 同步]](https://github.com/sipeed/picoclaw/pull/2810)：与 upstream/main 同步 1095 commits，并前向移植 magicform 自定义改动（影响 agent/tools/channel 目录结构调整）。

**综合评价**：本次合入覆盖面广（providers / channels / agent / tools），是一次显著的功能扩张与稳定性提升，但同时伴随大规模主干同步（#2810），存在一定的合并冲突与回归风险，建议在下次发版前加强回归测试。

---

## 四、社区热点

按评论数与活跃度排序：

| 排名 | 议题 | 类型 | 评论数 | 👍 | 状态 |
|------|------|------|--------|-----|------|
| 1 | [#3287 IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287) | Feature | 10 | 0 | Open (stale) |
| 2 | [#3281 Web UI 输入卡顿](https://github.com/sipeed/picoclaw/issues/3281) | Bug | 9 | 2 | Open |

**诉求分析**：
- **#3287** 反映用户希望 PicoClaw 在 IRCv3 中正确处理被自动切分的 512 字节以上长消息（视为单一消息），属于协议层语义理解需求。讨论 10 条评论说明社区已有较多关注，但标记 stale 后更新停滞。
- **#3281** 是用户实际体验问题——历史会话稍长时 Web UI 输入框出现明显卡顿（v0.3.1 + Go 1.25.11）。2 个点赞表明问题具有代表性，但暂未见关联修复 PR。

---

## 五、Bug 与稳定性

按严重程度排序：

### 🔴 严重
- **[#3365 QQ 渠道 401 鉴权失败](https://github.com/sipeed/picoclaw/issues/3365)**（新开）
  - 现象：`botgo v0.2.1` + `resty v2.17.1` 在 aarch64（Orange Pi 3B）下报 `Authorization参数格式错误`。
  - 根因已定位为 botgo/resty 兼容性问题。
  - 暂无关联 fix PR。**优先级：建议立即响应并发布补丁版本。**

### 🟠 中等
- **[#3281 Web UI 输入卡顿](https://github.com/sipeed/picoclaw/issues/3281)**（持续）
  - 现象：会话历史稍长时输入框明显 lag。
  - 暂无 fix PR。

### 🟢 已修复（今日关闭但需回归验证）
- #3337 MCP 失败致 agent loop 卡死
- #1854 / #1855 / #1858 / #1860 / #2088 / #2089 / #2090 / #2091 / #2092 / #2014 / #2016 / #2298 / #2522

建议在 0.3.2 中对所有今日合入的 bug fix 做一轮集成回归，尤其是 #2810 的大规模同步带来的潜在冲突。

---

## 六、功能请求与路线图信号

| 请求 | 用户诉求 | 与现有 PR 的关联 |
|------|----------|------------------|
| [#3366 OpenAI 兼容自定义 Provider](https://github.com/sipeed/picoclaw/issues/3366) | 支持自托管路由器（如 9Router） | 与 #1683（严格模式）、#2624（embeddings）方向一致；可整合入下一版本 |
| [#3287 IRC 长消息语义](https://github.com/sipeed/picoclaw/issues/3287) | IRC 长消息应视为单一消息 | 目前无相关 PR，建议纳入 IRC 渠道增强路线图 |

**信号解读**：用户对 provider 灵活性的需求增长明显（自托管、第三方 OpenAI 兼容路由），PicoClaw 团队已经在 OpenAI 兼容层持续投入（#1683、#2240、#2260、#2522、#2624），预计下一版本将进一步完善 provider 矩阵。

---

## 七、用户反馈摘要

从 Issues 与 PR 描述中提炼的真实痛点：

- **🚨 桌面端/嵌入式设备运行受限**：#3365 报告在 Orange Pi 3B（RK3566）上 QQ 渠道完全不可用（401 鉴权错误），影响 ARM/aarch64 边缘部署用户。
- **🖥 Web UI 性能瓶颈**：#3281 用户反映 Web UI 在中等长度会话下输入卡顿，提示前端虚拟滚动或渲染优化存在缺口。
- **📡 IRC 协议语义不完整**：#3287 用户认为 PicoClaw 将 512 字节切分的消息视为多条独立消息会破坏上下文连贯性。
- **🔌 想要更多 provider 选项**：#3366 用户希望以低成本接入自托管模型路由器，反映出 PicoClaw 用户群体中存在不少私有化部署诉求。
- **🤖 工具调用兼容性**：#1854 修复的 `tool_call_id` 重复问题影响到 Anthropic / Cerebras 用户，说明严格 LLM provider 的兼容性仍是稳定运营的关键。

---

## 八、待处理积压提醒

下列议题已较长时间未获实质响应，建议维护者关注：

| 议题 | 标题 | 创建时间 | 状态 | 链接 |
|------|------|----------|------|------|
| #3287 | IRC 长消息支持 | 2026-07-22 | Open, stale | [🔗](https://github.com/sipeed/picoclaw/issues/3287) |
| #3281 | Web UI 输入卡顿 | 2026-07-21 | Open | [🔗](https://github.com/sipeed/picoclaw/issues/3281) |
| #2810 | upstream 同步 (1095 commits) | 2026-05-07 | Closed（需验证合并完整性） | [🔗](https://github.com/sipeed/picoclaw/pull/2810) |

**健康度提示**：今日批量关闭 stale PR 有助于仓库整洁，但也需关注 stale 标记的判定是否过于激进，避免误关仍在迭代的提案。QQ 渠道 401（#3365）为最高优先级待处理项。

---

*本报告基于 GitHub 公开数据生成，数据驱动分析仅供参考。*

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报

**日期：2026-09-05**

---

## 1. 今日速览

NanoClaw 项目今日整体保持中高度活跃。过去 24 小时共有 2 条新 Issue 被提出，18 条 PR 更新（其中 16 条仍处待合并状态，2 条已关闭），社区贡献热度集中在 Provider 契约重构、技能安装机制加固以及 Agent-to-Agent（A2A）通信修复三条主线。无新版本发布。整体健康度评估为：**稳定**——大量 PR 仍处于评审/早期阶段但方向明确，2 条新 Issue 均涉及生产环境稳定性问题需重点关注。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日共有 2 条 PR 被关闭（均来自 `@tamasPetki`，提交于 2026-05-03，长期未合并后于今日关闭）：

| PR | 标题 | 链接 |
|----|------|------|
| #2232 | `fix(chat-sdk-bridge): fall back to URL fetch for adapters without fetchData` | https://github.com/nanocoai/nanoclaw/pull/2232 |
| #2231 | `feat(chat-sdk-bridge): add sendAsRaw flag to bypass adapter Markdown round-trip` | https://github.com/nanocoai/nanoclaw/pull/2231 |

两条 PR 均与 chat-sdk-bridge 适配器相关，#2231 已被 #2232 替代并关闭。这种"以 PR 关闭旧 PR"的方式表明维护者正在清理长期挂起的 Chat SDK 适配器相关工作。项目核心推进仍依赖大量未合并 PR（见下文待处理积压部分）。

---

## 4. 社区热点

**今日新开 Issues（按评论数排序）：**

1. **#3716** — `PreCompact conversation-archive` 每次触发都会完整重写整个会话历史到磁盘，无轮转、无上限，是生产环境 OOM 崩溃循环的真实根因。  
   作者：@DawoudIO | 评论：2 | 👍：0  
   链接：https://github.com/nanocoai/nanoclaw/issues/3716

2. **#3714** — Operator 环境变量覆盖（auto-compact 窗口、transcript rotation）从未传递给会话容器，三个文档化的 env override 实际上无法生效。  
   作者：@nilsborg | 评论：0 | 👍：0  
   链接：https://github.com/nanocoai/nanoclaw/issues/3714

**讨论热度最高的 PR（按作者活跃度）：**

今日最活跃贡献者为 **@zvi-fried**，贡献了 10 条 PR 更新，覆盖 Provider 契约重构（OpenCode/Codex/Cursor）、技能安装硬化、Source 安装可选项等核心方向。其次为 **@Koshkoshinsk**（2 条 A2A 通信修复）。

**诉求分析：** 新开 Issues 均围绕"容器内环境治理与资源控制"主题，反映用户对生产部署下配置可达性、磁盘/内存资源可预测性的强烈诉求。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（生产事故级）

**#3716** — `PreCompact conversation-archive` 无界全量重写导致 OOM 崩溃循环  
- **影响：** 直接触发生产环境崩溃循环  
- **原因：** PreCompact 钩子每次触发都会将完整会话历史重新序列化写入新文件，目录无轮转、无清理上限  
- **方向：** 需要 rotation/cap/cleanup 机制  
- **状态：** 暂无对应 fix PR  
- 链接：https://github.com/nanocoai/nanoclaw/issues/3716

### 🟠 中等（功能失效/安全相关）

**#3714** — Operator env overrides 无法到达会话容器  
- **影响：** 三个文档化的环境变量（auto-compact 窗口、transcript rotation 等）实际不可用  
- **状态：** 暂无对应 fix PR，是 #1820 的跟进 Issue  
- 链接：https://github.com/nanocoai/nanoclaw/issues/3714

### 🟡 一般（行为偏差）

**#3718 / #3719** — A2A 通信中发送方身份丢失、失败反馈缺失  
- **修复 PR：** #3718（保留发送方身份与命令边界）、#3719（将通信失败反馈给源端）  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3718 ｜ https://github.com/nanocoai/nanoclaw/pull/3719

**#3717** — `agent-runner` 中嵌入 payload 转义问题  
- **风险：** 嵌入 payload 可能闭合其所在 block 并伪造结构  
- **修复 PR：** #3717（已存在 fix）  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3717

**#3680** — `validateSpec` 中 allowlisted-extra 挂载绕过漏洞  
- **修复 PR：** #3680（挂载安全修复）  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3680

**#3440** — `docker-driver`：SELinux 阻止挂载、组可写 rw 挂载、残留 NUL 字节  
- **修复 PR：** #3440（已存在 fix）  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3440

---

## 6. 功能请求与路线图信号

### 新功能 PR（候选纳入下个版本）

| PR | 功能 | 链接 |
|----|------|------|
| #3592 | `feat(groups)`：新增 core-owned 的 `speed` 推理属性（CLI 支持 `ncl groups config update --speed <tier>`） | https://github.com/nanocoai/nanoclaw/pull/3592 |
| #3355 | `feat(skills)`：新增 `/add-cursor` 提供商安装技能 | https://github.com/nanocoai/nanoclaw/pull/3355 |
| #3356 | `feat(providers)`：新增 Cursor Agent SDK payload | https://github.com/nanocoai/nanoclaw/pull/3356 |
| #3720 | `feat(skills)`：增加 opt-in 源安装与受保护恢复机制（`ncl skills list/plan/apply`） | https://github.com/nanocoai/nanoclaw/pull/3720 |
| #3715 | `feat`：新增 Zapier MCP 工具技能（无需把私有连接令牌放入 NanoClaw 配置） | https://github.com/nanocoai/nanoclaw/pull/3715 |

### 路线图信号

- **Provider 标准化趋势明显**：#3586（声明 setup provider 契约）、#3588（OpenCode 实现）、#3584（Codex 实现）、#3722（OpenCode 适配技能）、#3591（核心持有 canon 渲染）共同构成"Provider 契约统一化"主题，下一版本预计将形成完整的 Provider 抽象层。
- **技能安装硬化**：#3721 + #3720 表明维护者正在收紧能力安装路径——强制显式调用、源安装默认关闭、agent approval 不能启用。
- **A2A 通信体系完善**：#3718 + #3719 是 Agent-to-Agent 协议的身份认证与失败反馈补丁，属于基础通信设施建设。

---

## 7. 用户反馈摘要

### 生产环境痛点（来自 #3716 评论）

- 用户实际遭遇 **OOM 崩溃循环**，且为真实生产事故  
- 痛点核心：**PreCompact 钩子行为不可预测**——磁盘与内存的消耗随会话长度线性增长直至触发资源耗尽  
- 用户期望：归档目录应有 rotation、cap、cleanup 机制，与实际清理策略保持一致

### 配置不可达痛点（来自 #3714）

- 用户场景：操作员需要调整 auto-compact 窗口与 transcript rotation，但**文档化的环境变量无法生效**  
- 痛点核心：host→container 的 env 转发链路缺失，operator 不得不通过 patch 源码解决问题  
- 这是一个 **文档与实际行为不一致** 的典型案例，反映出容器边界处的配置治理漏洞

---

## 8. 待处理积压

以下 PR 创建时间较早但仍未合并，维护者应重点关注：

| PR | 标题 | 创建日期 | 链接 |
|----|------|---------|------|
| #2231 | `feat(chat-sdk-bridge)` add sendAsRaw flag | 2026-05-03 | https://github.com/nanocoai/nanoclaw/pull/2231 |
| #2232 | `fix(chat-sdk-bridge)` fall back to URL fetch | 2026-05-03 | https://github.com/nanocoai/nanoclaw/pull/2232 |
| #3355 | `feat(skills)` add /add-cursor provider install skill | 2026-08-19 | https://github.com/nanocoai/nanoclaw/pull/3355 |
| #3356 | `feat(providers)` add Cursor Agent SDK payload | 2026-08-19 | https://github.com/nanocoai/nanoclaw/pull/3356 |
| #3440 | `docker-driver` fix SELinux mounts / NUL byte | 2026-08-22 | https://github.com/nanocoai/nanoclaw/pull/3440 |
| #3584 | `refactor(providers)` implement codex provider contract | 2026-08-27 | https://github.com/nanocoai/nanoclaw/pull/3584 |
| #3586 | `refactor(providers)` declare setup provider contract | 2026-08-27 | https://github.com/nanocoai/nanoclaw/pull/3586 |
| #3588 | `refactor(providers)` implement opencode provider contract | 2026-08-27 | https://github.com/nanocoai/nanoclaw/pull/3588 |
| #3591 | `refactor(providers)` render provider instructions from core-owned canon | 2026-08-27 | https://github.com/nanocoai/nanoclaw/pull/3591 |
| #3592 | `feat(groups)` add a core-owned speed inference property | 2026-08-28 | https://github.com/nanocoai/nanoclaw/pull/3592 |
| #3680 | `fix(mount-security)` close allowlisted-extra mount bypass | 2026-08-30 | https://github.com/nanocoai/nanoclaw/pull/3680 |

**提醒维护者关注：**

- **#3716**（OOM 崩溃循环）作为生产事故级 Bug，建议优先排期并指定 owner。
- **#3714**（env override 无法到达容器）属于基础配置治理缺陷，影响所有 operator 自定义配置路径。
- **#2231 / #2232** 已于今日关闭，长期挂起条目得到处理，chat-sdk-bridge 适配器方向明确收尾。

---

**报告生成时间：** 2026-09-05  
**数据来源：** GitHub Issues / Pull Requests 过去 24 小时变更

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目日报
**日期：2026-09-05**
**数据周期：过去 24 小时**

---

## 1. 今日速览

IronClaw 今日继续保持较高的开发活跃度，共产生 6 条 Issues 新开/活跃、14 条 PR 更新（其中 2 条已关闭）。工作重心集中在两个方向：**WebUI 命令面板的可用性打磨**（同一作者 `@italic-jinxin` 在 24 小时内连开 4 条 UI 问题与对应修复 PR）和 **LLM/Subagent 底层架构优化**（`@henrypark133` 主导 XL 级别 PR）。无新版本发布，项目整体处于功能迭代与 UX 修正并行的稳定开发期。

---

## 2. 版本发布

**无新版本发布。**

过去 24 小时内未产生新的 Release Tag。当前仍处于迭代开发阶段，建议关注 `feat(loop)` 上下文窗口动态派生 PR (#8053) 的合并进展。

---

## 3. 项目进展

今日已关闭的 2 条 PR 均体现"质量工程"导向：

- **#8062 [XL] `fix(llm): send conversation cache keys on OpenAI request paths`** — 已关闭
  为 loop-host gateway 派生稳定、域分离的伪名 prompt-cache key，并在 OpenAI Responses 与 OpenAI-compatible Chat Completions 路径上发送该 key，可显著降低重复 prompt 的推理成本。详见 [PR #8062](https://github.com/nearai/ironclaw/pull/8062)。

- **#8060 [S] `ci(nextest): give the whole-tree architecture scans real timeout headroom`** — 已关闭
  针对 `ironclaw_architecture_tests` 在 180s 临界值（实测 176.8s）易超时的问题给出更长超时。详见 [PR #8060](https://github.com/nearai/ironclaw/pull/8060)。

**整体进展评估**：项目向"成本可控 + 稳定性"维度稳健迈进一格，prompt-cache 键的引入是面向多模型/多供应商的优化基础设施，长期对单位用户推理开销有积极影响。

---

## 4. 社区热点

今日评论与点赞数整体偏低（多数 0–2 条），但存在两条值得关注的高层级议题：

- **#7903 [enhancement, risk: high] Decision spike: persistent per-user sandboxed executor behind the trusted host kernel**
  作者：@serrrfirat | 评论：2 | 风险标签 high
  提出将"完整 agent loop 留在 trusted host、只下发 `builtin.shell`"的现有 Reborn 架构演进为"持久化、按用户的沙箱执行器"，是项目架构演进方向的关键决策点。详见 [Issue #7903](https://github.com/nearai/ironclaw/issues/7903)。

- **#8053 [XL, risk: medium] `feat(loop): derive the prompt context budget from the model's advertised window`**
  作者：@henrypark133 | 取代硬编码的 128k/20k 预算，改为根据供应商宣告窗口动态派生（取 90%）。详见 [PR #8053](https://github.com/nearai/ironclaw/pull/8053)。

**诉求分析**：核心贡献者关注的是架构长期演化（沙箱边界、上下文预算）与供应商无关的工程抽象，反映出项目正在为多模型/多部署形态做底层准备。

---

## 5. Bug 与稳定性

按严重程度从高到低排列：

| 级别 | Issue | 描述 | 是否有对应修复 PR |
|------|-------|------|-------------------|
| 中 | [#8074](https://github.com/nearai/ironclaw/issues/8074) | 已配对用户在"未连接共享频道"中收到配对文案而非频道未连接文案，文案错配 | 已有相关前置修复 #8054 |
| 中 | [#8066](https://github.com/nearai/ironclaw/issues/8066) | 命令结果卡片在消息流的 flex 布局中塌缩为水平线 | ✅ [#8071](https://github.com/nearai/ironclaw/pull/8071) |
| 低 | [#8064](https://github.com/nearai/ironclaw/issues/8064) | 命令结果卡片缺少关闭/收起操作，累积占用对话空间 | ✅ [#8069](https://github.com/nearai/ironclaw/pull/8069) |
| 低 | [#8063](https://github.com/nearai/ironclaw/issues/8063) | 斜杠命令菜单在键盘/鼠标导航时不会自动滚动到当前选项 | ✅ [#8068](https://github.com/nearai/ironclaw/pull/8068) |
| 低 | [#8065](https://github.com/nearai/ironclaw/issues/8065) | 斜杠命令菜单中命令名宽度不一，导致标题/描述起点错位 | ✅ [#8070](https://github.com/nearai/ironclaw/pull/8070) |
| 低 | [#8059 相关](https://github.com/nearai/ironclaw/pull/8059) | `/api/v1/responses/{id}/cancel` 在任何状态下均返回 400，run 不会中止 | ✅ [#8059](https://github.com/nearai/ironclaw/pull/8059) |

**亮点**：除 #8074 与 #8066 外，今日报告的 UI 类 Bug 均已由同一作者 (@italic-jinxin) 当日提交对应 PR，形成"报告→修复"快速闭环，回归风险低。

---

## 6. 功能请求与路线图信号

**直接来自用户的体验类请求**（已具备修复 PR，极有可能进入下一版本）：

- 命令结果卡片支持手动关闭 ([#8064](https://github.com/nearai/ironclaw/issues/8064) → [PR #8069](https://github.com/nearai/ironclaw/pull/8069))
- 命令结果卡片不被压缩 ([#8066](https://github.com/nearai/ironclaw/issues/8066) → [PR #8071](https://github.com/nearai/ironclaw/pull/8071))
- 斜杠命令菜单元数据对齐 ([#8065](https://github.com/nearai/ironclaw/issues/8065) → [PR #8070](https://github.com/nearai/ironclaw/pull/8070))
- 斜杠命令菜单当前项保持可见 ([#8063](https://github.com/nearai/ironclaw/issues/8063) → [PR #8068](https://github.com/nearai/ironclaw/pull/8068))

**架构级路线图信号**：

- [#7903](https://github.com/nearai/ironclaw/issues/7903) 提出的"持久化、按用户的沙箱执行器"是 high-risk 决策级 spike，若通过将影响 Reborn 全栈。
- [#8053](https://github.com/nearai/ironclaw/pull/8053) 模型自适应上下文窗口预算，是面向多模型支持的底层基础设施升级。

**Telegram 集成增强**（[PR #8072](https://github.com/nearai/ironclaw/pull/8072)）：在 extension 激活时通过 Bot API `setMyCommands` 注册聊天菜单命令（`/model`、`/status`、`/new`、`/stop`、`/interrupt`），属于"已声明能力可见化"的渐进式 UX 改进。

---

## 7. 用户反馈摘要

由于今日新开 Issues 评论数据较少（多数 0 条评论），用户反馈主要来自 Issue 描述文本：

- **痛点集中区 — WebUI 命令面板**：
  用户 @italic-jinxin 反映，连续执行 `/model` 等命令后，结果卡片会塌缩为"只剩水平线"；菜单在视觉上不对齐、键盘/鼠标导航时滚动不跟随、缺少关闭入口。这是典型的"高频路径 UX 粗糙"反馈，提示项目在聊天交互的微观体验上仍有改进空间。

- **部署可见性反馈**（来自 PR #8073 摘要）：
  当管理员未配置 Telegram personal-account 访问凭据时，原错误信息错误地把责任归到"用户的账号"，被修正为"管理员未配置"。表明社区已开始关注部署侧错误文案的可读性。

- **首次接触体验**（来自 PR #8054 摘要）：
  未配对 Telegram 用户的首次 `/start` 仅看到"可用命令"列表，下一条消息才提示配对，被调整为"先配对检查再命令准入"。反映出"用户认知模型"与"产品工作流顺序"不一致的真实摩擦。

> ⚠️ 本节反馈基于 Issue/PR 摘要文本，未观察到大量用户自由评论，整体属于开发者主导驱动的改进，尚未形成显著的社区舆情信号。

---

## 8. 待处理积压

按"创建时间久 + 未合并/未关闭"维度筛选：

- **[Issue #7903](https://github.com/nearai/ironclaw/issues/7903) — 创建于 2026-08-26（10 天前），风险 high，仍 OPEN**
  涉及 Reborn 架构关键决策（持久化按用户沙箱执行器），至今评论仅 2 条，决策节奏偏慢，建议维护者尽快组织评审以避免阻塞下游工作。

- **[PR #7988](https://github.com/nearai/ironclaw/pull/7988) — 创建于 2026-08-29（7 天前），由 CI bot 生成的 `chore(agents): refresh codebase knowledge graph`，仍 OPEN**
  属于定期自动刷新，合并风险低，但长期滞留会影响后续快照生成节奏。

- **[PR #8053](https://github.com/nearai/ironclaw/pull/8053) — 创建于 2026-09-03，size: XL，risk: medium，OPEN**
  上下文窗口预算动态派生是面向多模型的关键改动，XL 规模 + medium 风险，建议维护者优先评审，避免与其他循环层重构冲突。

- **[PR #8059](https://github.com/nearai/ironclaw/pull/8059) — 新贡献者 (@jlwaugh) 首次贡献，OPEN**
  涉及 `/api/v1/responses/{id}/cancel` 全状态返回 400 的功能性 Bug，建议维护者给予较快速响应以鼓励新贡献者留存。

---

## 附：今日数据看板

| 指标 | 数值 |
|------|------|
| 新开/活跃 Issues | 6 |
| 已关闭 Issues | 0 |
| 待合并 PR | 12 |
| 已合并/关闭 PR | 2 |
| 新版本发布 | 0 |
| 高风险 Issue | 1 (#7903) |
| 报告/修复同日闭环率 | 4/4（WebUI 议题） |

---
*报告生成时间：2026-09-05 | 数据源：IronClaw GitHub Repository*

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报
**日期：2026-09-05**

---

## 1. 今日速览

LobsterAI 今日继续保持高强度迭代节奏，单日合并/关闭 PR 达 **29 条**，并接连发布 **2026.9.3 与 2026.9.4 两个版本**，发布间隔仅 1 天，体现出活跃的版本列车模式。Issues 侧仅 1 条更新，且属于存量审计类报告（标记 stale），社区主动反馈流入放缓。整体来看，项目处于**高活跃、高交付、低外部投诉**的健康状态，研发精力集中在内嵌浏览器、订阅/发布链路、Cowork 与 IM 模块的体验打磨上。

---

## 2. 版本发布

### 🚀 v2026.9.4（2026-09-04 发布）
配套 Release PR：[#2618](https://github.com/netease-youdao/LobsterAI/pull/2618)

**主要更新：**
- **feat(browser): restore interactive in-app browser**（[#2602](https://github.com/netease-youdao/LobsterAI/pull/2602)）—— 恢复应用内可交互浏览器能力。
- **feat(update): confirm before install and quitting the app**（[#2609](https://github.com/netease-youdao/LobsterAI/pull/2609)）—— 更新前增加确认弹窗，避免误操作导致更新中断退出。

**升级提示：** 无破坏性变更公告。若曾依赖旧版应用内浏览器逻辑，需重新验证相关脚本任务流。

---

### 🚀 v2026.9.3（2026-09-03 发布）

**主要更新：**
- **feat(cowork): show login prompt before unauthenticated chat**（[#2573](https://github.com/netease-youdao/LobsterAI/pull/2573)）—— 未登录用户发起聊天时优先展示欢迎/登录引导。
- **feat(browser): add interactive in-app browser**（[#2574](https://github.com/netease-youdao/LobsterAI/pull/2574)）—— 新增应用内浏览器能力。
- **feat(onboarding):** 入职引导相关优化（描述截断，疑涉及首次启动体验与配置引导）。

**升级提示：** 未登录态下的对话入口逻辑变更，未配置自定义模型的用户会先看到登录弹窗。

---

## 3. 项目进展

今日合并/关闭的 29 条 PR 中，以下几条代表了项目的主要推进方向：

### 🌐 内嵌浏览器（In-App Browser）能力深化
连续两天迭代，是本次版本列车最显著的功能线：
- [#2617](https://github.com/netease-youdao/LobsterAI/pull/2617) **OPEN**：改进应用内登录反馈可关闭性、标签页改为可滚动 tab strip，并优化相邻标签关闭行为。
- [#2615](https://github.com/netease-youdao/LobsterAI/pull/2615) **CLOSED**：支持 Unicode 路径下的 Windows 安装。
- [#2602](https://github.com/netease-youdao/LobsterAI/pull/2602) **CLOSED**：恢复可交互内嵌浏览器（已合入 9.4）。
- [#2574](https://github.com/netease-youdao/LobsterAI/pull/2574) **CLOSED**：新增可交互内嵌浏览器（已合入 9.3）。

> **判断**：浏览器能力在两天内从「新增」走向「打磨」，已具备对外稳定可用的雏形，是本期最具产品价值的进展。

### 💳 订阅与发布链路完善
- [#2613](https://github.com/netease-youdao/LobsterAI/pull/2613) **CLOSED**：完善订阅恢复引导与资源状态同步，覆盖 Artifact/资料库/站点详情三个入口，新增埋点并补充测试环境与契约文档。
- [#2614](https://github.com/netease-youdao/LobsterAI/pull/2614) **CLOSED**：测试模式服务端 API 地址回切至标准内网环境。

> **判断**：商业化链路（订阅恢复、资源重新部署）的体验闭环正在补齐。

### 💬 Cowork & 聊天体验打磨
- [#2612](https://github.com/netease-youdao/LobsterAI/pull/2612) **CLOSED**：登录刷新期间保留模型展示，避免空态闪退。
- [#2573](https://github.com/netease-youdao/LobsterAI/pull/2573) **CLOSED**：未登录聊天引导（已合入 9.3）。
- [#2521](https://github.com/netease-youdao/LobsterAI/pull/2521) **CLOSED**：保留右键菜单触发的消息选中状态。
- [#2603](https://github.com/netease-youdao/LobsterAI/pull/2603) **CLOSED**：优化语音额度耗尽提示文案。

### 🧩 技能/插件/IM 与编辑器细节
- [#2501](https://github.com/netease-youdao/LobsterAI/pull/2501) **CLOSED**：技能升级进度遮罩渲染至 document.body，跨视图一致。
- [#2520](https://github.com/netease-youdao/LobsterAI/pull/2520) **CLOSED**：插件安装弹窗对长错误可滚动，避免按钮被遮挡。
- [#2503](https://github.com/netease-youdao/LobsterAI/pull/2503) **CLOSED**：为文本输入控件注册原生编辑右键菜单（剪切/复制/粘贴/全选）。
- [#2599](https://github.com/netease-youdao/LobsterAI/pull/2599) **CLOSED**：优化 IM 多实例 Bot 卡片布局。
- [#2532](https://github.com/netease-youdao/LobsterAI/pull/2532) **CLOSED**：侧边栏免费额度提示 5 秒淡出。

### 🔧 工程基础设施
- [#2616](https://github.com/netease-youdao/LobsterAI/pull/2616) **CLOSED**：将 CI 中 Skill 的 npm 审计显式化并限制为 90 秒，避免阻塞流水线。
- [#2596](https://github.com/netease-youdao/LobsterAI/pull/2596) **CLOSED**：聊天登录 CTA 点击埋点上报。

> **整体评估**：项目整体明显向前推进，重点从「功能可用」过渡到「交互稳定、体验闭环、商业链路可观测」。

---

## 4. 社区热点

今日 PR 数据集中，无高评论/高点赞条目涌现（PR 评论数普遍为 undefined，点赞 0），Issues 仅 1 条存量更新。**最值得社区关注的话题**集中在以下两条：

1. **应用内浏览器（In-App Browser）连续高强度迭代** —— 两天内 4 个相关 PR，标签涉及 `area: browser / main / openclaw / renderer`，覆盖功能新增、登录交互、Windows 路径兼容性、标签交互。该功能正在成为 LobsterAI 的「事实平台能力」，社区后续可重点关注其安全边界与跨平台一致性。
   - [PR #2617](https://github.com/netease-youdao/LobsterAI/pull/2617)、[#2615](https://github.com/netease-youdao/LobsterAI/pull/2615)、[#2602](https://github.com/netease-youdao/LobsterAI/pull/2602)、[#2574](https://github.com/netease-youdao/LobsterAI/pull/2574)

2. **SQLite 存储层三连缺陷报告**（[Issue #1071](https://github.com/netease-youdao/LobsterAI/issues/1071)）—— 由社区用户 @MaoQianTu 在 03-30 提交，今日被 stale-bot 触发更新一次。涉及 CASCADE 失效导致孤儿消息、`save()` 非原子写、`storeInitPromise` 超时后永久故障三个**生产级数据可靠性缺陷**，是当前最严重的待办技术债之一。

---

## 5. Bug 与稳定性

| 严重度 | 问题 | 链接 | 修复 PR | 状态 |
|---|---|---|---|---|
| 🔴 **严重（数据可靠性）** | SQLite 存储层三连缺陷：孤儿消息累积、save 非原子写崩溃损坏、`storeInitPromise` 超时后永久故障 | [#1071](https://github.com/netease-youdao/LobsterAI/issues/1071) | ❌ 暂无 | OPEN（已被 stale 标记，需维护者介入） |
| 🟡 中 | Windows Unicode 路径下内嵌浏览器启动失败 | [#2615](https://github.com/netease-youdao/LobsterAI/pull/2615) | ✅ 已在 #2615 修复 | CLOSED |
| 🟡 中 | 登录刷新期间模型列表短暂为空，影响对话可用性 | [#2612](https://github.com/netease-youdao/LobsterAI/pull/2612) | ✅ 已在 #2612 修复 | CLOSED |
| 🟢 轻 | 插件安装失败时弹窗按钮被长错误遮挡 | [#2520](https://github.com/netease-youdao/LobsterAI/pull/2520) | ✅ 已修复 | CLOSED |
| 🟢 轻 | 文本输入控件缺失原生编辑右键菜单 | [#2503](https://github.com/netease-youdao/LobsterAI/pull/2503) | ✅ 已修复 | CLOSED |
| 🟢 轻 | 语音额度耗尽文案未适配新订阅话术 | [#2603](https://github.com/netease-youdao/LobsterAI/pull/2603) | ✅ 已修复 | CLOSED |
| 🟢 轻 | CI npm 审计阻塞流水线 | [#2616](https://github.com/netease-youdao/LobsterAI/pull/2616) | ✅ 已修复 | CLOSED |

> **建议关注**：Issue #1071 涉及**数据丢失与永久故障**风险面，且已被自动标记为 stale，维护者应优先响应。

---

## 6. 功能请求与路线图信号

今日无显式新功能需求 Issue。但从合并 PR 的方向可以推断下个版本的路线图信号：

| 信号 | 证据 PR | 可能的下一版本方向 |
|---|---|---|
| 应用内浏览器登录体系完善 | [#2617](https://github.com/netease-youdao/LobsterAI/pull/2617) | 浏览器登录 UX 稳定化、tab 管理能力 |
| 订阅恢复 + 资源状态同步 | [#2613](https://github.com/netease-youdao/LobsterAI/pull/2613) | 发布链路闭环，自动化恢复与重新部署 |
| CI 安全审计可控化 | [#2616](https://github.com/netease-youdao/LobsterAI/pull/2616) | 第三方 Skill 安全治理流程化 |
| 编辑控件原生化 | [#2503](https://github.com/netease-youdao/LobsterAI/pull/2503) | 跨平台编辑体验一致性 |
| 入职引导与未登录态引导 | [#2573](https://github.com/netease-youdao/LobsterAI/pull/2573) | 新用户转化漏斗优化 |

---

## 7. 用户反馈摘要

今日 Issues 评论数为 1，且为维护性更新，真实用户痛点样本有限。可提取的反馈信号如下：

- **数据可靠性焦虑（来自 @MaoQianTu 在 [#1071](https://github.com/netease-youdao/LobsterAI/issues/1071)）**：
  - 关注点不是 UI，而是**存储层的正确性**。三个缺陷都是生产场景下可能造成不可恢复数据丢失或永久故障的「沉默错误」，说明社区中存在专业用户在做深度审计。
  - 截至目前尚无 maintainer 正面回应，**满意/不满意倾向偏负面**，但点赞为 0，说明曝光有限。

- **跨平台兼容性（隐含于 [#2615](https://github.com/netease-youdao/LobsterAI/pull/2615)）**：
  - Windows 用户在非 ASCII 安装路径下出现启动异常，这是国内/海外用户都会遇到的常见场景，得到快速响应。

---

## 8. 待处理积压

| 优先级 | 条目 | 类型 | 等待时长 | 链接 |
|---|---|---|---|---|
| 🔴 P0 | SQLite 存储层三连缺陷（数据丢失/永久故障风险） | Issue（已 stale） | ~159 天（自 03-30 起） | [#1071](https://github.com/netease-youdao/LobsterAI/issues/1071) |
| 🟠 P1 | 改进应用内浏览器登录与标签页交互 | PR（待合并） | 1 天 | [#2617](https://github.com/netease-youdao/LobsterAI/pull/2617) |

> **建议**：维护者在推进下个版本前，优先评估 Issue #1071 的修复方案（涉及 SQLite 外键启用、事务化写入、超时后的可恢复策略），并尽快给出官方回应，避免核心数据可靠性问题长期悬而未决。

---

*日报基于 2026-09-05 过去 24 小时 GitHub 数据生成。*

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目日报 · 2026-09-05

---

## 📌 今日速览

Moltis 今日社区活跃度处于**低位静默状态**。过去 24 小时内没有新的 Issue 提交或关闭，也没有 PR 被合并；唯一可见的活动来自 1 条仍处于 Open 状态的功能型 PR（#1258），其内容是关于新增对 AGY CLI 的原生流式传输支持。无新版本发布。整体而言，项目处于**常规维护/功能开发期**，未出现紧急修复或社区争议事件。

---

## 🚀 版本发布

**今日无新版本发布。** 本节省略。

---

## 🛠 项目进展

### 今日合并/关闭的重要 PR
**无**。过去 24 小时没有 PR 被合并或关闭，#1258 仍处于待评审状态。

### 在途的功能推进
- **PR #1258** — *feat(external-agents): add direct AGY streaming*  
  作者：[@GTanger](https://github.com/GTanger)｜创建/更新：2026-09-04  
  链接：https://github.com/moltis-org/moltis/pull/1258  
  该 PR 旨在为官方 `agy` CLI 增加**第一类流式传输通道**，复用其已有的 Google OAuth 会话，**无需 Gemini CLI 或额外 API Key**，并将其版本化的 `stream-json` 输出转译为 Moltis 原生的 text / reasoning / notice / tool / sub-agent / usage / 可恢复会话 等事件类型。  
  **意义**：若合并，将显著降低 Moltis 接入 AGY 体系的成本，并有望取代当前的桥接方式，是一个**架构层面的能力扩展**，值得维护者优先 Review。

---

## 💬 社区热点

- **PR #1258** — https://github.com/moltis-org/moltis/pull/1258  
  当前评论数与点赞数均为 0，但议题本身具备较高讨论潜力：它触及了 *外部 Agent 接入* 与 *凭据复用* 两个社区长期关注的痛点（详见下文“功能请求”章节）。

---

## 🐛 Bug 与稳定性

**今日无新增 Bug 报告、崩溃或回归问题。** 社区层面的问题反馈渠道（Issues）过去 24 小时完全静止。考虑到无 PR 合并，Bug 风险面无变化，项目整体处于**稳定区间**。

---

## 💡 功能请求与路线图信号

从 PR #1258 的方向可以读出以下**用户/贡献者诉求信号**：

| 诉求 | 证据 | 可能的路线图影响 |
| --- | --- | --- |
| **降低外部 Agent 接入门槛** | 复用 AGY 现有 OAuth 会话，省去 API Key | 后续或扩展到更多官方 CLI，形成统一的 external-agent 流式协议层 |
| **统一事件协议** | 将外部 CLI 的 `stream-json` 翻译为 Moltis 原生事件类型 | 暗示 Moltis 在朝“事件/会话中台”演进 |
| **可恢复会话（resumable session）** | PR 摘要明确提及该事件类型 | 与 AI Agent 长时间任务的工程化方向一致 |

由于无对应 Issue 可交叉验证**，优先级判断需结合后续维护者的 Review 反馈**。

---

## 🗣 用户反馈摘要

今日 Issues 区域无新评论，**暂无用户痛点或场景数据可提炼**。仅有的反馈信息来自 PR #1258 的描述，体现的是**贡献者视角**（对架构清洁度和接入便利性的追求），而非终端用户反馈。

---

## 📋 待处理积压

| 类型 | 编号 | 标题 | 链接 | 备注 |
| --- | --- | --- | --- | --- |
| PR（待合并） | #1258 | feat(external-agents): add direct AGY streaming | https://github.com/moltis-org/moltis/pull/1258 | 创建于 2026-09-04，至今 24 小时未获 Review，建议维护者优先过目 |

> 由于今日 Issues 区域为 0，无法列出长期未响应的 Issue；若昨日之前已存在历史 Issue，建议另起一份专项清单跟进。

---

## 🩺 项目健康度评估

- **活跃度**：⭐⭐☆☆☆（24 小时仅 1 条 PR 提交，无 Issue / 无合并）
- **稳定性**：⭐⭐⭐⭐⭐（无新增 Bug 报告）
- **路线图可见性**：⭐⭐⭐☆☆（有明确的架构级 PR，但缺乏社区层面的讨论背书）
- **社区响应速度**：暂无数据点（Issues 为 0）

**结论**：项目处于**静默但有方向感**的状态——单条 PR 质量较高（触及核心架构），但社区参与面仍较窄，建议维护者主动 ping 关键 reviewer 以推动 #1258 进入评审流程，同时考虑在外部 Agent 方向公开征集 Issue 反馈，以扩大信号源。

---

*日报基于 2026-09-05 当日 GitHub 公开数据生成。*

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目日报

**日期：2026-09-05**
**项目地址：** [github.com/agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)

---

## 一、今日速览

CoPaw 今日整体处于**高强度迭代期**：过去 24 小时共产生 23 条 Issue 更新和 38 条 PR 更新，其中 24 个 PR 仍待合并、14 个已合并或关闭，仓库活跃度位居历史高位。讨论焦点高度集中在 **2.2 版本系列**的稳定性与多租户 Hub 路线图，社区对多用户管理、任务调度优化、企业级存储后端等方向的呼声明显上升。无新版本发布，团队仍处于 2.2 系列（2.2.0-beta.7 / 2.2.1b1）的打磨阶段。

---

## 二、版本发布

**今日无新版本发布。**

当前活跃版本仍为 2.2 系列（含 2.2.0-beta.7 与 2.2.1b1）。从仓库动向来看，2.2 正式版的核心修复（Loop 模式、409 冲突、Channel 启动慢、Playwright 卡启动、MCP 白名单）正在收尾，**2.2.0 正式版**与多租户版 **QwenPaw Hub 2.2.0** 预计在接下来的窗口期内陆续释出。

---

## 三、项目进展

以下 PR 已于 24 小时内合并或关闭，对项目稳定性与产品体验具有实质性推进意义：

| PR | 标题 | 影响 | 链接 |
|----|------|------|------|
| #7504 | fix(mcp): enforce per-tool whitelist on the agent runtime path | 修复 MCP 工具白名单未在 agent 运行时路径生效的安全/权限问题 | [#7504](https://github.com/agentscope-ai/QwenPaw/pull/7504) |
| #7560 | fix(console): preserve selected loop mode query | 修复 Loop 模式（目标/使命）选择无法传至后端的 Bug，闭环 #7552、#7555 | [#7560](https://github.com/agentscope-ai/QwenPaw/pull/7560) |
| #7183 | feat(skills): add workspace-scoped preload configuration | 落地 #7182：支持 workspace 级 Skill 预加载策略 | [#7183](https://github.com/agentscope-ai/QwenPaw/pull/7183) |

此外已关闭的 Issue 中，#6921（多步任务静默停止）、#7023（Playwright 同步安装阻塞启动）、#7510（`/memory/status` 500）、#7555（Loop 模式显示丢失）、#7567（点击停止但实际仍在执行）均与 #7552、#7559 一同被打通或锁定，反映出团队正集中精力为 2.2 GA（正式版）扫清最后的体验类阻塞。

整体而言，CoPaw 正从“功能扩张期”转入“质量收敛期”：Hub 多租户、移动端、Creator 插件等大颗粒 PR 仍处于评审或草稿状态，而 Console、Runtime、MCP、Plugin 等主干模块的健壮性修复已成为本阶段主线。

---

## 四、社区热点

**讨论最活跃 / 评论最多 / 关注度最高的议题：**

1. **#7318 — QwenPaw Hub 多租户版（2.2.0）路线图征集** 🔥
   - 作者：@rayrayraykk ｜ 评论：22 ｜ 👍：3
   - 关联：#2324（多用户访问与管理）、近期多个团队部署诉求
   - 这是当前社区最热议题，热度来源于它直接回应了"如何把 QwenPaw 用作团队助手"这一长期未解的诉求，团队明确以 Hub 多租户版作为下一里程碑方向。
   - 链接：https://github.com/agentscope-ai/QwenPaw/issues/7318

2. **#7505 — 局域网 LLM Server 频繁 client disconnect**
   - 作者：@yjyz1011 ｜ 评论：12
   - 揭示 LM Studio + 本地模型（如 qwen3.8 flash next q3）的流式连接兼容性问题，影响"内网部署 + 私有模型"这一典型用户场景。
   - 链接：https://github.com/agentscope-ai/QwenPaw/issues/7505

3. **#6921 — 多步任务静默停止（已关闭）**
   - 作者：@rerbin ｜ 评论：12
   - LLM 输出规划性语句后不再继续执行，必须手动输入"继续"。这类"体验不可见"的问题极易造成用户对模型能力的误判。
   - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6921

4. **#7559 — 任务执行中触发 409 报错**
   - 作者：@rerbin ｜ 评论：4
   - 用户对"任务运行中再次提交新消息应进入队列而非抛错"的期望，反映出 UI 与后端契约在并发场景下的一致性问题。
   - 链接：https://github.com/agentscope-ai/QwenPaw/issues/7559

**整体诉求画像：** 个人/团队用户希望 CoPaw 既能在 2.2 上"更稳"，又能在 2.2.0 Hub 上"能用得起来"——稳定性、企业级能力、并发正确性是社区关心的三大主线。

---

## 五、Bug 与稳定性

按严重程度排列（均为 24 小时内仍在更新或新建的报告）：

| 严重度 | Issue | 现象 | 修复 PR | 链接 |
|--------|-------|------|---------|------|
| 🔴 高 | #7559 | 任务执行中发送新消息触发 409 错误，未进队列 | 待跟进 | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) |
| 🔴 高 | #7534 | 飞书 session 高优先级消息卡死后整条会话静默无响应，consumer 无法重建 | 待跟进 | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) |
| 🔴 高 | #7567（已关闭）| 点击"停止"实际未终止任务 | 已修复/复盘 | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) |
| 🔴 高 | #7552（已关闭）| Loop 模式（目标/使命）选择未传至后端 | ✅ #7560 | [#7552](https://github.com/agentscope-ai/QwenPaw/issues/7552) |
| 🟠 中 | #7505 | 局域网 LLM 流式连接频繁断开 | 待跟进 | [#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505) |
| 🟠 中 | #7549 | Volcengine Ark Responses API：以 assistant 文本结尾的 input 被拒（400 MissingParameter: partial） | 待跟进 | [#7549](https://github.com/agentscope-ai/QwenPaw/issues/7549) |
| 🟠 中 | #7367 | 仅启用 console 渠道时启动仍 30–45s（lark_oapi 等被无条件 import） | 待跟进 | [#7367](https://github.com/agentscope-ai/QwenPaw/issues/7367) |
| 🟠 中 | #7548 | 切换会话或重启后导航记录丢失 | 待跟进 | [#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548) |
| 🟡 中低 | #7554 | Windows 下 Shell 子进程继承 stdin，Ctrl+C 无法终止 | 待跟进 | [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554) |
| 🟢 已修复 | #7510 | `/memory/status` 在 2.2.0-beta.7 返回 500 | 已关闭 | [#7510](https://github.com/agentscope-ai/QwenPaw/issues/7510) |
| 🟢 已修复 | #6921 | 多步任务输出后静默停止 | 已关闭 | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) |
| 🟢 已修复 | #7023 | Desktop 启动阻塞 ~60s 安装 Playwright | 已关闭 | [#7023](https://github.com/agentscope-ai/QwenPaw/issues/7023) |

**稳定性画像：** 本批 Bug 集中在三个面：(1) 并发与任务生命周期（409、停止无效、Loop 模式丢失）；(2) 启动/导入开销（渠道 import、Playwright 同步安装）；(3) 第三方模型/平台兼容性（Ark Responses、LM Studio、飞书 consumer）。这些是 2.2 GA 的核心阻塞点，需要在正式发布前完成收敛。

---

## 六、功能请求与路线图信号

1. **企业级与多租户**——直接被 #7318 列为 2.2.0 Hub 的下一阶段议题，包含多用户访问、admin 管理的 skills 等子项。
2. **闲时/批量任务调度** —— #7568 提出对接 DeepSeek 等厂商低谷折扣与 Batch API，降低长时任务成本，与现有 Loop 模式（目标/使命）形成互补。
3. **可插拔关系型存储后端** —— #7558 请求为 WAL 敏感场景引入 PostgreSQL/MySQL，反映 K8s/Swarm HA 部署诉求。
4. **MCP 策略级 fallback** —— #7556 期望 Driver 层在策略拒绝时具备链式回退，避免多 agent 部署下整条链路静默失败。
5. **Skill 版本与依赖元数据** —— #7557 在多 workspace / 多 agent 场景下需求强烈。
6. **QwenPaw 镜像预装/一键安装第三方 CLI（codex cli 等）** —— #7550。
7. **Console 侧栏与设置改版** —— 已有 PR #7502 进行中，可纳入下一版本。
8. **QwenPaw Mobile 原生客户端（草稿）** —— #7378 已进入早期评审，但带 DO NOT MERGE 标记，预计短期不会合入主干。
9. **Creator 1.1.2 多时间轴 / 媒体生成调度** —— #7486 是来自上游 fork 的大颗粒合入，需重点 review。
10. **产物输出展示区重构** —— #7553 期望产物集中展示在时间戳上方，属于体验优化类。

**路线图信号判断：** 2.2 正式版预计以"稳定性修复 + Hub 多租户基础"为主线；2.3/2.4 之后大概率纳入可插拔存储、Skill 元数据、闲时任务调度等企业级能力。Console 侧栏改版与 PawPort（#6960）也有较大概率在 2.2 后续小版本中落地。

---

## 七、用户反馈摘要

从近 24 小时活跃 Issue 评论中提炼的真实用户声音：

- **多步任务的"静默终止"让人困惑**（#6921）：用户反馈 LLM 经常输出"Now 2.1, 3.1, 3.2. Let me do all three."这类规划语句后就停住，没有任何视觉提示，必须手动输入"继续"。这会显著拉低用户对模型能力的信任度。
- **"看起来停了 ≠ 实际停了"**（#7567）：用户点击停止后 UI 反馈已停，但实际任务仍在执行，再次提交即触发 409。这种 UI 与执行真相的偏差是当前最严重的体验信任问题之一。
- **Loop 模式选择后被回退**（#7555）：用户选了"目标"模式，切换页面后 UI 又显示成"默认"，但用户无法判断后端究竟按哪个模式运行。
- **飞书长会话"假死"**（#7534）：高优先级（卡片类）消息处理后 consumer 不再返回，整条 DM 静默无响应，需要用户重启 session。提示飞书渠道在多会话/优先级队列下的健壮性不足。
- **Ark Responses 兼容性**（#7549）：当 input 以 assistant 文本回合结尾时，Ark 直接 400 报错，影响火山引擎用户的实际可用性。
- **本地/局域网 LLM 体验差**（#7505）：qwenpaw 访问 LM Studio + qwen3.8 flash next q3 频繁重试—超时，是"内网私有模型"用户的典型痛点。
- **企业部署：存储后端硬编码 SQLite + WAL**（#7558）：在 Docker Swarm / K8s HA 下无法工作，强烈阻碍企业落地。
- **镜像中第三方 agent CLI 脆弱**（#7550）：codex cli 等随镜像更新被清空，配置丢失。
- **Hub 多租户诉求明确**（#7318）：希望引入多用户访问、admin 管理的 skills、可视化 dashboard、与团队账号绑定等能力。

整体看，**用户对 2.2 的核心期待可以归纳为三句话：**
> "别再静默停下；别让 UI 与执行真相不一致；让我能把团队用起来。"

---

## 八、待处理积压（提醒维护者关注）

以下 Issue/PR 已超过一周仍在 OPEN 状态，建议维护团队优先 review：

| 类型 | 编号 | 标题 | 创建时间 | 链接 |
|------|------|------|----------|------|
| PR | #6381 | perf(drivers): avoid blocking on stale capabilities | 2026-07-23 | [#6381](https://github.com/agentscope-ai/QwenPaw/pull/6381) |
| PR | #6874 | feat(mcp): add configurable tool call timeout | 2026-08-10 | [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) |
| PR | #6960 | feat(pawport): import flow from Codex/Qoder | 2026-08-13 | [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) |
| Issue | #7367 | 仅启用 console 渠道时启动仍需 30–45s | 2026-08-28 | [#7367](https://github.com/agentscope-ai/QwenPaw/issues/7367) |
| PR | #7378 | feat(mobile): QwenPaw native mobile experience（DO NOT MERGE） | 2026-08-28 | [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) |
| PR | #7401 | fix(acp): prevent Windows ACP agent stalls during workspace bootstrap | 2026-08-29 | [#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401) |
| PR | #7486 | feat(creator) 1.1.2 大合集 | 2026-09-02 | [#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486) |
| PR | #7502 | feat(console): redesign sidebar and settings experience | 2026-09-02 | [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) |
| PR | #7497 | fix(tool guard): deny sensitive paths in off mode | 2026-09-02 | [#7497](https://github.com/agentscope-ai/QwenPaw/pull/7497) |
| Issue | #7505 | qwenpaw 访问局域网 LLM 频繁 disconnect | 2026-09-02 | [#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505) |
| PR | #7538 | feat: unify runtime environment management | 2026-09-03 | [#7538](https://github.com/agentscope-ai/QwenPaw/pull/7538) |

**特别提示：**
- #6381（Driver 性能）已悬置近 6 周，建议优先安排 review；
- #6960（PawPort 跨 agent 导入）是企业用户高频诉求，建议评估拆分为更小的 PR 以加速合入；
- #7505（局域网 LLM 重试）影响"内网私有模型"核心使用场景，应在 2.2 GA 前给出明确解决方案或临时 workaround。

---

**项目健康度评估：** 🟢 **活跃且方向清晰**。社区参与度高，2.2 主线修复接近收敛，Hub 多租户、移动端、Creator 插件三条增量线齐头推进。下一阶段关键风险点在于：**并发与任务生命周期正确性**、**第三方模型/平台兼容性**、**企业级存储与多租户架构**。

:::
