---
title: "OpenClaw 生态日报"
published: 2026-09-07
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-07

> Issues: 97 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-07 00:00 UTC

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

# OpenClaw 项目日报
**日期：2026-09-07**

---

## 1. 今日速览

OpenClaw 项目今日延续高强度迭代节奏，过去 24 小时共产生 **97 条 Issue 更新**（新开/活跃 72，关闭 25）与 **500 条 PR 更新**（待合并 296，已合并/关闭 204）。当日**无新版本发布**，但合并/关闭了 204 个 PR，活跃度极高。讨论焦点集中在 **2026.9.2 版本的多个回归问题**（OAuth 鉴权、会话状态、xAI/Grok 目录污染等）以及 **会话恢复链路（session recovery / compaction / tombstone）的稳定性**，多个 P0/P1 级别 Bug 被集中浮现。整体来看项目进入"集中清账 + 重构推进"阶段，维护者（@steipete 等）批量提交了大量 XS–M 级别的 refactor PR，社区分诊工具 `clawsweeper` 标记也提示需维护者决策的积压项显著增加。

---

## 2. 版本发布

**今日无新版本发布。**

近期可关注的版本基线：
- 当前生产暴露的回归多围绕 **v2026.8.x → v2026.9.1/9.2** 升级路径。
- 多个高优 PR 仍处于 `📣 needs proof` 或 `👀 ready for maintainer look` 状态，尚未合入主干，预计下次发版前会有一次集中合并。

---

## 3. 项目进展

今日合并/关闭的 PR 共 204 条，重要进展包括：

### 🔧 重要修复（已合并/关闭）
| PR | 标题 | 影响 |
|---|---|---|
| [#140527](https://github.com/openclaw/openclaw/pull/140527) | refactor(qa): reuse canonical process-counter parsers | QA Lab 复用 Plugin SDK 解析器，#135868 拆分战役清理 |
| [#140529](https://github.com/openclaw/openclaw/pull/140529) | fix(gateway): avoid false 304 responses for quoted ETags | 关闭 [#140528](https://github.com/openclaw/openclaw/issues/140528)，修复网关误判 ETag |
| [#140517](https://github.com/openclaw/openclaw/pull/140517) | refactor(update): reuse sealed SQLite admission helpers | 更新逻辑共享 URI 编码与状态写入规则 |
| [#140522](https://github.com/openclaw/openclaw/pull/140522) | refactor(daemon): simplify LaunchAgent policy branches | 守护进程端口选择逻辑去重 |
| [#140525](https://github.com/openclaw/openclaw/pull/140525) | refactor(tests): share exact agent-turn failure fixtures | 测试清理（#139428） |
| [#140520](https://github.com/openclaw/openclaw/pull/140520) | refactor(channels): reuse normalized allowlist results | 频道入口规范化复用 |
| [#140516](https://github.com/openclaw/openclaw/pull/140516) | refactor(plugin-sdk): consolidate provider preset construction | Provider 预设统一构造 |
| [#140477](https://github.com/openclaw/openclaw/pull/140477) | fix(android): show full settings metrics and copy instance IDs | Android 设置页可读性 + 实例 ID 复制 |
| [#140521](https://github.com/openclaw/openclaw/pull/140521) | refactor(tests): reuse Doctor command fixtures | Doctor 测试清理 |
| [#140524](https://github.com/openclaw/openclaw/pull/140524) | refactor(googlechat): avoid unused text buffers | Google Chat 文本缓冲优化 |
| [#140507](https://github.com/openclaw/openclaw/pull/140507) | refactor(memory): reuse current index identity resolution during sync | memory-core 同步逻辑重构 |

### 📦 已关闭但值得关注的修复链路
- [#139249](https://github.com/openclaw/openclaw/issues/139249)（P1，钻石龙虾） — Codex pending preview 阻塞 settlement，已带 PR 关闭。
- [#138959](https://github.com/openclaw/openclaw/issues/138959)（P1，钻石龙虾） — WebSocket 错误分类导致 final-answer 恢复失败，已修复关闭。
- [#137214](https://github.com/openclaw/openclaw/issues/137214)（P1，钻石龙虾） — Restart-recovery tombstone 自我阻塞 /new 命令，已修复关闭。
- [#134495](https://github.com/openclaw/openclaw/issues/134495)（P2） — `mcp.sessionIdleTtlMs` 在 v2026.8.1 被移除导致长生命周期 MCP 服务中断，已关闭。

**总体评估**：今日合并以**重构与测试清理为主**（@steipete 单人贡献大量 refactor PR），P0/P1 修复链路持续推进，但用户侧"会话语义稳定性"的核心问题（tombstone、watermark、idle retry）仍未完全闭环。

---

## 4. 社区热点

按评论数排序的 TOP Issues：

| 排名 | Issue | 评论 | 核心诉求 |
|---|---|---|---|
| 1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) — OpenClaw 泄漏未回收的 hook/tool 子进程，僵尸进程累积 | 14 | 进程生命周期治理；hook/tool 终止语义需统一 |
| 2 | [#135111](https://github.com/openclaw/openclaw/issues/135111) — v2026.8.1 间歇性 "Provider completed tool call with malformed JSON arguments" | 14 | claude-sonnet-5 上的工具调用参数序列化回归 |
| 3 | [#124991](https://github.com/openclaw/openclaw/issues/124991) — CLI session reseed 在 SQLite session store 上失效 | 9 | 旧 JSONL vs 新 SQLite 会话存储不兼容 |
| 4 | [#51572](https://github.com/openclaw/openclaw/issues/51572) — session-memory hook 仅在 compaction 触发，缺失于 reset/prune | 8 | 记忆钩子触发时机扩展 |
| 5 | [#139714](https://github.com/openclaw/openclaw/issues/139714) — post-core update resume 子进程永久卡死 `update in progress` | 7 | update_runs 终态写入条件不一致 |
| 6 | [#139578](https://github.com/openclaw/openclaw/issues/139578) — llama.cpp EmbeddingGemma ubatch=512 回归（疑似 #134389 引入） | 6 | 默认推理参数变更导致本地推理性能/正确性退化 |
| 7 | [#99910](https://github.com/openclaw/openclaw/issues/99910) — Memory dreaming 占满 gateway 事件循环 ~10min | 6 | 后台任务与主循环隔离 |
| 8 | [#137729](https://github.com/openclaw/openclaw/issues/137729) — transcript replay 中未守卫的 `.trim()` 调用 | 6 | 代码库已有修复模式但未复用 |
| 9 | [#137927](https://github.com/openclaw/openclaw/issues/137927) — Internal context block 泄漏到 Telegram 可见消息 | 5 | 安全/隐私：内部 prompt 渲染边界 |
| 10 | [#120006](https://github.com/openclaw/openclaw/issues/120006) — CLI session reset 丢弃工具历史 + 并发 CLI 会话共享 key | 5 | `claude-cli` 后端并发模型缺陷 |

**分析**：社区热度集中在两类问题——**(a) 会话状态机语义模糊**（reseed/tombstone/reset/watermark 多个边缘 case 互相影响），以及 **(b) v2026.8.x → 9.x 升级路径上的回归**。多个 issue 被 `clawsweeper` 工具批量标记 `bulk-filed`，反映短期内涌入大量相似报告。

---

## 5. Bug 与稳定性

### 🔴 P0（UX 发布阻塞）
- [#140482](https://github.com/openclaw/openclaw/issues/140482) — **xAI OAuth 登录覆盖 Grok OAuth 目录为 API 目录**。v2026.9.2 上 OAuth 登录会破坏已有 xAI OAuth 配置。**暂无 fix PR**，处于 `clawsweeper:fix-shape-clear / queueable-fix` 标记。影响所有 Grok OAuth 用户。

### 🟠 P1（高优先级，影响会话/鉴权/消息丢失）
| Issue | 严重程度 | 已有 fix PR? |
|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸子进程累积 | 银贝壳 P1 | ❌ 无 |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) — claude-sonnet-5 tool JSON 畸形 | 铂金隐士 P1 | ❌ 无 |
| [#139714](https://github.com/openclaw/openclaw/issues/139714) — update_runs 永久卡死 | 钻石龙虾 P2 | ❌ 无 |
| [#139578](https://github.com/openclaw/openclaw/issues/139578) — EmbeddingGemma ubatch 回归 | 铂金隐士 P1 | ❌ 无 |
| [#99910](https://github.com/openclaw/openclaw/issues/99910) — Memory dreaming 占满事件循环 | 铂金隐士 P1 | ❌ 无 |
| [#137927](https://github.com/openclaw/openclaw/issues/137927) — Internal context 泄漏到 Telegram | 安全/会话 P1 | ❌ 无 |
| [#119454](https://github.com/openclaw/openclaw/issues/119454) — Stuck-session recovery 自抑制 | 钻石龙虾 P1 | ❌ 无 |
| [#118028](https://github.com/openclaw/openclaw/issues/118028) — `AbortSignal.any()` 破坏信号身份 | 钻石龙虾 P1 | ✅ 有 [#118028](https://github.com/openclaw/openclaw/issues/118028) 关联 |
| [#118885](https://github.com/openclaw/openclaw/issues/118885) — 重复 SQLite 完整性检查 | 钻石龙虾 P1 | ❌ 无 |
| [#140129](https://github.com/openclaw/openclaw/issues/140129) — Anthropic cache 卡在 ~46k 工具前缀 | 金虾 P2 | ❌ 无（`needs-info`） |
| [#140466](https://github.com/openclaw/openclaw/issues/140466) — xAI OAuth auto alias 解析失败 | 钻石龙虾 P1 | ❌ 无 |
| [#132758](https://github.com/openclaw/openclaw/issues/132758) — claude-cli 后端不传会话历史 | 钻石龙虾 P1 | ❌ 无 |
| [#135955](https://github.com/openclaw/openclaw/issues/135955) — Secret egress proxy 忽略 NODE_EXTRA_CA_CERTS | 钻石龙虾 P1 | ❌ 无 |
| [#137690](https://github.com/openclaw/openclaw/issues/137690) — sessions_spawn 在 Telegram 会话上报"unknown parent" | 钻石龙虾 P1 | ❌ 无 |
| [#139485](https://github.com/openclaw/openclaw/issues/139485) — Managed upgrade 卡在 finalizer 非终态 | 银贝壳 P1 | ❌ 无 |
| [#139672](https://github.com/openclaw/openclaw/issues/139672) — claude-cli subagent spawn 权限错配 | 金虾 P1 | ❌ 无（`needs-info`） |
| [#140455](https://github.com/openclaw/openclaw/issues/140455) — google-meet 2026.9.2 语音会话崩溃 | 钻石龙虾 P1 | ❌ 无 |
| [#119601](https://github.com/openclaw/openclaw/issues/119601) — 中途中止的用户消息下次批量重答 | 银贝壳 P1 | ❌ 无 |
| [#130965](https://github.com/openclaw/openclaw/issues/130965) — Codex settled turn call_id 超长 | 钻石龙虾 P1 | ❌ 无 |
| [#128395](https://github.com/openclaw/openclaw/issues/128395) — claude-cli tools.deny 不生效 | 钻石龙虾 P1（安全） | ❌ 无 |
| [#139110](https://github.com/openclaw/openclaw/issues/139110) — OpenAI Responses 过期 arguments 覆盖 | 钻石龙虾 P1 | ❌ 无 |

### 🟡 已修复关闭的 P1
- [#139249](https://github.com/openclaw/openclaw/issues/139249)、[#138959](https://github.com/openclaw/openclaw/issues/138959)、[#137214](https://github.com/openclaw/openclaw/issues/137214)（均钻石龙虾）— 均已带 PR 关闭。

### 🔍 回归问题集中爆发点
v2026.8.1 / v2026.9.2 共出现至少 6 条独立报告的回归 bug，集中在 **OAuth 鉴权、会话历史、Compaction、Settlement** 四大路径，强烈建议维护者对 9.x 分支启动集中回归审计。

---

## 6. 功能请求与路线图信号

| Issue | 请求 | 已有 PR 关联? |
|---|---|---|
| [#51572](https://github.com/openclaw/openclaw/issues/51572) | session-memory hook 在 reset/prune 时也触发 | ❌ |
| [#45503](https://github.com/openclaw/openclaw/issues/45503) | 工具结果手动上下文清理 | ❌ |
| [#82011](https://github.com/openclaw/openclaw/issues/82011) | 输入文本错别字/语法检测（中文场景） | ❌ |
| [#139188](https://github.com/openclaw/openclaw/issues/139188) | diagnostics-prometheus 暴露 provider 订阅用量窗口 | ❌ |
| [#42373](https://github.com/openclaw/openclaw/issues/42373) | `costCurrency` 配置项自定义成本显示货币 | ❌ |
| [#55943](https://github.com/openclaw/openclaw/issues/55943) | subagent session 也触发 session-memory hook | ❌ |
| [#136431](https://github.com/openclaw/openclaw/issues/136431) | 按触发器配置 turn 超时（interactive vs cron vs heartbeat） | ❌ |
| [#132601](https://github.com/openclaw/openclaw/issues/132601) | plugin-sdk 文档澄清安全视频 URL materialization | ❌ |
| [#134685](https://github.com/openclaw/openclaw/issues/134685) | Connect failed updates 与 Gateway startup 接入 triage 流程 | ❌（已关闭） |

**路线图信号**：
- **可观测性** 方向呼声较强（Prometheus 暴露 provider 用量）。
- **国际化** 仍是边缘需求（中文错别字、成本货币本地化）。
- **生命周期钩子扩展**（session-memory）出现多条相互关联的请求，可能在下一版本合并处理。
- **按触发器配置超时** 是较成熟的需求（[#136431](https://github.com/openclaw/openclaw/issues/136431)），建议优先评估。

---

## 7. 用户反馈摘要

### 真实痛点
- **"我的 agent 不响应，但日志说它在工作"**——多 Issue 描述 gateway 主线程被后台任务阻塞（[#99910](https://github.com/openclaw/openclaw/issues/99910)、[#139710](https://github.com/openclaw/openclaw/issues/139710)），需要外部 watchdog 强制 kill 才能恢复。
- **"升级后 OAuth/会话全坏"**——v2026.8.1 → 9.1/9.2 升级路径中多个用户报告 OAuth 配置被覆盖（[#140482](https://github.com/openclaw/openclaw/issues/140482)、[#140466](https://github.com/openclaw/openclaw/issues/140466)），需要回滚才能恢复。
- **"Telegram 用户看到了不该看到的内部指令"**——[#137927](https://github.com/openclaw/openclaw/issues/137927) 反映出 prompt 注入可视化风险，社区对内部块渲染边界敏感。
- **"我的长会话卡在 Anthropic cache 46k"**——[#140129](https://github.com/openclaw/openclaw/issues/140129) 暴露 prompt cache 指纹污染问题，影响所有长会话的 Anthropic 用户。
- **"会话状态机难以预测"**——多个 P1 issue（[#119454](https://github.com/openclaw/openclaw/issues/119454)、[#119601](https://github.com/openclaw/openclaw/issues/119601)、[#137214](https://github.com/openclaw/openclaw/issues/137214)、[#120006](https://github.com/openclaw/openclaw/issues/120006)）共同指向 **stuck/reset/recovery 的状态语义不够清晰**，用户难以判断何时应主动 /reset。

### 正面信号
- 多位维护者（@steipete、@Colton-Harris、@DonnieFi 等）持续在 24h 内闭环 issue。
- `clawsweeper` 自动化 triage 标记活跃，说明分诊流程运转良好。
- 重构类 PR 大量合并（Plugin SDK、QA Lab、Daemon、Memory、Tests 等多个模块），表明项目在持续偿还技术债。

### 不满/担忧
- `needs-maintainer-review` + `needs-product-decision` + `bulk-filed` 标签的 issue 数量显著增加，反映**维护者注意力瓶颈**。
- 部分 issue 已存活 3+ 个月（如 [#51572](https://github.com/openclaw/openclaw/issues/51572) 自 2026-03、[#55943](https://github.com/openclaw/openclaw/issues/55943) 自 2026-03、[#45503](https://github.com/openclaw/openclaw/issues/45503) 自 2026-03），仍未进入实现阶段。

---

## 8. 待处理积压

> 以下 Issue/PR 长期处于等待维护者决策状态，建议优先关注：

### 🔥 长期未关闭的高优先级 Issue（按严重度）
| Issue | 创建日期 | 等待时长 | 状态 |
|---|---|---|---|
| [#51572](https://github.com/openclaw/openclaw/issues/51572) | 2026-03-21 | ~170 天 | `needs-product-decision` |
| [#55943](https://github.com/openclaw/openclaw/issues/55943) | 2026-03-27 | ~165 天 | `needs-product-decision` |
| [#45503](https://github.com/openclaw/openclaw/issues/45503) | 2026-03-13 | ~180 天 | `needs-product-decision`（👍2） |
| [#43690](https://github.com/openclaw/openclaw/issues/43690) | 2026-03-12 | 已关闭 | — |
| [#82011](https://github.com/openclaw/openclaw/issues/82011) | 2026-05-15 | ~115 天 | `needs-product-decision` |
| [#42373](https://github.com/openclaw/openclaw/issues/42373) | 2026-03-10 | ~180 天 | `needs-product-decision`（👍2） |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | ~70 天 | 无新 fix PR（👍1） |
| [#99910](https://github.com/openclaw/openclaw/issues/99910) | 2026-07-04 | ~65 天 | 无新 fix PR（👍1） |
| [#134495](https://github.com/openclaw/openclaw/issues/134495) | 2026-08-31 | 已关闭 | — |

### ⏳ 长期等待 Maintainer 决策的 PR
| PR | 创建日期 | 等待时长 | 标签 |
|---|---|---|---|
| [#110046](https://github.com/openclaw/openclaw/pull/110046) — bound gateway TLS file reads | 2026-07-17 | ~52 天 | `needs maintainer proof decision` |
| [#117582](https://github.com/openclaw/openclaw/pull/117582) — plugin reference pages 生成 | 2026-08-01 | ~37 天 | `needs maintainer proof decision` |
| [#135366](https://github.com/openclaw/openclaw/pull/135366) — firecrawl DNS diagnostic | 2026-09-01 | ~6 天 | 待 maintainer |
| [#137936](https://github.com/openclaw/openclaw/pull/137936) — heartbeat retry storm | 2026-09-04 | ~3 天 | `needs proof` |
| [#102165](https://github.com/openclaw/openclaw/pull/102165) — feishu 撤回消息取消 agent | 2026-07-08 | ~60 天 | `needs proof`（高 merge-risk） |
| [#118598](https://github.com/openclaw/openclaw/pull/118598) — CI 路由绕开 Blacksmith | 2026-08-03 | ~35 天 | `waiting on author` |
| [#75336](https://github.com/openclaw/openclaw/pull/75336) — compaction 后标识符保留校验 | 2026-05-01 | ~130 天 | `needs proof` |
| [#115510](https://github.com/openclaw/openclaw/pull/115510) — Ed25519 verify 输入绑定 | 2026-07-29 | ~40 天 | `needs proof`（安全相关） |
| [#125146](https://github.com/openclaw/openclaw/pull/125146) — 用户消息在失败时保留 | 2026-08-17 | ~21 天 | `needs proof` |
| [#117151](https://github.com/openclaw/openclaw/openclaw/pull/117151) — Unix descendants 清理 | 2026-08-01 | ~37 天 | `needs proof`（与 [#97616](https://github.com/openclaw/openclaw/issues/97616) 直接相关） |

### 📊 维护者提醒
1. **僵尸进程问题（[#97616](https://github.com/openclaw/openclaw/issues/97616)）与 [#117151](https://github.com/openclaw/openclaw/pull/117151) 高度关联**，建议协调 [#97616](https://github.com/openclaw/openclaw/issues/97616) 报告人与 PR 作者对齐方案。
2. **`claude-cli` 后端问题集中爆发**（[#132758](https://github.com/openclaw/openclaw/issues/132758)、[#128395](https://github.com/openclaw/openclaw/issues/128395)、[#139672](https://github.com/openclaw/openclaw/issues/139672)、[#120006](https://github.com/openclaw/openclaw/issues/120006)、[#137910](https://github.com/openclaw/openclaw/issues/137910)），建议建立专项 triage。
3. **xAI OAuth 系列**（[#140466](https://github.com/openclaw/openclaw/issues/140466)、[#140482](https://github.com/openclaw/openclaw/issues/140482)）需紧急响应，直接影响 2026.9.2 升级用户。
4. **Compaction 相关 PR/Issue** 长期积压（[#75336](https://github.com/openclaw/openclaw/pull/75336)、[#102078](https://github.com/openclaw/openclaw/issues/102078)），是核心技术债务。

---

**报告生成时间**：2026-09-07  
**数据来源**：OpenClaw GitHub Issues & Pull Requests API（openclaw/openclaw）

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期**：2026-09-07
**覆盖项目**：OpenClaw / NanoBot / Zeroclaw / PicoClaw / NanoClaw / IronClaw / LobsterAI / Moltis / CoPaw
**分析维度**：活跃度、技术方向、社区成熟度、OpenClaw 生态定位

---

## 1. 生态全景

个人 AI 助手与自主智能体（Agent）开源生态在 2026-09-07 呈现出**"高位震荡、收敛分化"**的总体格局。**OpenClaw 与 CoPaw** 双双进入"高 PR 流入 + 高 P0/P1 暴露"的回归清账窗口，反映出快速迭代期的复杂代价；**NanoBot、Moltis、NanoClaw** 处于架构稳定与定向加固阶段，工作集中在契约化重构、可观测性补齐与 CI 优化等"内功"；**PicoClaw、IronClaw、LobsterAI** 则呈现维护放缓或纯依赖滚动特征。整体上，**会话状态机语义、Provider 契约化、多通道（IM/邮件/Webhook）治理、Anthropic 缓存成本优化** 是当前生态的四条主线技术挑战，跨多个项目重复出现，说明这些是行业级而非单点问题。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 今日 Release | 健康度 | 当前阶段特征 |
|---|---|---|---|---|---|
| **OpenClaw** | 97（活跃 72 / 关闭 25） | 500（待合并 296 / 关闭 204） | ❌ 无 | ⚠️ 承压 | 回归清账 + 重构推进，多 P0/P1 集中浮现 |
| **CoPaw** | 21（活跃 18 / 关闭 3） | 10（待合并 9 / 关闭 1） | ❌ 无 | 🟡 亚健康 | v2.2.0 回归修复密集，first-time contributor 活跃 |
| **Zeroclaw** | 10（新开 8 / 关闭 2） | 50（待合并 44 / 关闭 6） | ❌ 无 | 🟢 健康 | v0.8.5 收尾，下阶段（缓存策略、ACP 恢复）规划中 |
| **NanoClaw** | 2 | 15（待合并 8 / 关闭 7） | ❌ 无 | 🟢 健康 | Provider 契约化重构集中收割 |
| **NanoBot** | 0（新增） | 13（待合并 10 / 关闭 3） | ❌ 无 | 🟢 良好 | 稳态推进，CI 与基础设施加固 |
| **IronClaw** | 0 | 9（8 Dependabot + 1 人工） | ❌ 无 | 🟢 平稳 | 纯依赖维护期，2 项人工 Bug 修复 |
| **Moltis** | 0 | 2（OPEN） | ❌ 无 | 🟡 待观察 | 安静维护，等待评审 |
| **PicoClaw** | 4 | 2 | ❌ 无 | 🔴 风险 | 关键 Bug 已 stale，维护响应迟缓 |
| **LobsterAI** | 1（仅 stale 自动触发） | 0 | ❌ 无 | 🔴 风险 | 维护真空，5 个月无实质进展 |

> **关键观察**：今日 **9 个项目均无新版本发布**，生态进入"代码合并密集、发版节奏放缓"的特殊窗口期，可能预示着多个项目正在为下一波版本做集中重构铺垫。

---

## 3. OpenClaw 在生态中的定位

### 与同类项目的横向对比

| 维度 | OpenClaw | CoPaw | NanoBot | Zeroclaw |
|---|---|---|---|---|
| **PR/日均** | 500+ | 10 | 13 | 50 |
| **Issues/日均** | 97 | 21 | <1 | 10 |
| **重构占比** | 高（refactor PR 主导） | 中（Bug 修复为主） | 中（CI/测试为主） | 低（Feature 为主） |
| **版本节奏** | 频繁（每月多次） | 中等 | 稳定 | 稳定（v0.8.5 周线） |
| **生态规模** | 🔴 大型（核心参照） | 🟡 中型 | 🟡 中型 | 🟡 中型 |
| **会话状态机复杂度** | 极高 | 高 | 中 | 中 |
| **Provider 矩阵** | 全（Claude/xAI/Anthropic/本地） | 多 | 多 | 多 |

### OpenClaw 的核心优势
1. **社区规模与活跃度绝对领先**：日均 500 PR、97 Issues 的吞吐远超同类项目，处于生态核心位置。
2. **重构债务管理成熟**：`clawsweeper` 自动化 triage、统一的 `needs-maintainer-review` / `needs-product-decision` 标签体系，是其他项目可借鉴的治理范式。
3. **模块化深度**：Plugin SDK、QA Lab、Daemon、Memory、Channels 五大子系统并行推进，Provider 契约化方向（与 NanoClaw 同源思路）已开始落地。

### 技术路线差异
- **OpenClaw**：走**"重平台 + 重状态机"路线**，tombstone / watermark / recovery 等概念已被多个项目反向借鉴。
- **CoPaw**：**多 Agent 协作 + 多通道**为差异化亮点，主-子 Agent 范式领先。
- **NanoBot / NanoClaw**：侧重**轻量化与契约化**，单点突破能力强。
- **Zeroclaw**：在 Anthropic 缓存、ZeroCode/ACP 长任务可靠性上**深度优化**。

---

## 4. 共同关注的技术方向

以下问题在多个项目中**重复涌现**，代表行业级挑战：

| 技术方向 | 涉及项目 | 核心诉求 |
|---|---|---|
| **会话状态机语义不清** | OpenClaw（#119454/#119601/#137214/#120006）、CoPaw（#7579/#7584/#7589）、PicoClaw（#3351） | reset / recovery / tombstone / compaction 边界模糊，用户难以预测状态；助手回复持久化后再读时丢失成为系统性 bug |
| **Provider 契约化与多后端支持** | NanoClaw（#3581-#3586 全套）、OpenClaw、CoPaw、Zeroclaw（#10197） | Provider 从"flag 拼凑"升级为可执行契约，Cursor / OpenCode / Codex 矩阵同步；向后兼容性是核心约束 |
| **Anthropic 缓存策略优化** | Zeroclaw（#10660/#10662/#10663）、OpenClaw（#140129）、CoPaw | 缓存 TTL 可配置（5min → 1h）、断点位置优化、OAuth 路径断点浪费；直接影响生产账单 |
| **通道（Telegram/飞书/Slack）治理** | OpenClaw（#137927）、NanoClaw（#3728/#3730）、CoPaw（#7570/#7585/#7586）、Zeroclaw（#10358/#9997） | 入站静默失败可观测性、流式输出渲染（表格/折叠/中间消息清理）、配置语义与行为一致性 |
| **事件循环阻塞与异步治理** | OpenClaw（#99910）、NanoBot（#5580 P1）、CoPaw（#7363） | 持久化/同步调用阻塞主循环，需架构级异步化重构 |
| **可观测性需求** | NanoBot（#5520 Langfuse）、OpenClaw（#139188 Prometheus）、Zeroclaw（#10664 /health 泄漏） | 内部状态外部化、Provider 用量窗口暴露、错误分类精细化 |
| **多 Agent 协作范式** | CoPaw（#7450/#7580 wait_agent_task）、OpenClaw（subagent 相关） | 主 Agent 主动巡检子任务、阻塞式等待工具、跨会话记忆继承 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构差异 |
|---|---|---|---|
| **OpenClaw** | 全平台通用 Agent 框架，重会话/重鉴权 | 高级用户、企业、CLI 工具链 | tombstone + watermark + SQLite session store + 多 Provider 强契约 |
| **CoPaw** | 多 Agent 协作 + 多通道 IM | 团队协作、桌面端用户 | 主-子 Agent 协议、QwenPaw 命名空间继承、Telegram/飞书流式渲染 |
| **Zeroclaw** | 长任务可靠性 + Anthropic 成本优化 | 大文档处理、生产环境重成本用户 | ZeroCode/ACP 会话恢复、SSE webhook 流式、persistent session attachments |
| **NanoClaw** | Provider 契约化与生态扩展 | 多后端集成商、终端用户 | Provider 强注册校验、speed/effort/model 三元组、CLI + 浏览器门户双入口 |
| **NanoBot** | 轻量化与跨平台 CI | 开发者、CI/CD 集成方 | pytest-xdist 加速、TUI 上下文可视化、SSRF 防护 |
| **IronClaw** | 协议层安全与适配边界 | 协议研究者、安全敏感用户 | MCP egress 诊断分层、HTTP/stdio/SSE 多通道错误分类 |
| **Moltis** | Rust 实现的诊断精度 + TLS 收敛 | Rust 开发者、安全敏感用户 | cargo 测试严格化、ALPN 协议约束、spawn 错误上下文 |
| **PicoClaw** | 端侧 AI（嵌入式 / RISC-V） | 嵌入式开发者、隐私敏感用户 | jsonl 持久化、Web UI 性能、RV1106 平台适配 |
| **LobsterAI** | 网易有道孵化项目（中文场景） | 中文教育/办公用户 | Agent 列表 + 任务列表的状态同步（中文场景） |

---

## 6. 社区热度与成熟度

### 🔥 高强度迭代层（活跃度评分 ⭐⭐⭐⭐⭐）
- **OpenClaw**：500 PR / 97 Issues 日均吞吐，处于"代码快速合并 + Bug 集中暴露"的成长期阵痛。
- **CoPaw**：21 Issues + 10 PR + 5 个 first-time contributor，**新贡献者参与度最佳**，处于功能扩张期。

### 🟢 质量巩固层（活跃度评分 ⭐⭐⭐⭐）
- **Zeroclaw**：50 PR 流入 + 路线图清晰（v0.8.5 周线 tracker），处于版本收尾与下阶段规划并行的稳态。
- **NanoClaw**：Provider 契约化集中收割（7 条 PR 关闭），架构主线明确。
- **NanoBot**：13 PR 全为质量加固（CI、TUI、技能、安全测试），稳态推进。

### 🟡 维护放缓层（活跃度评分 ⭐⭐⭐）
- **Moltis**：2 PR 待评审，无社区互动，存在冷启动风险。
- **IronClaw**：9 PR 中 8 条为 Dependabot 自动发起，功能性维护节奏放缓。

### 🔴 风险信号层（活跃度评分 ⭐⭐）
- **PicoClaw**：关键 Bug（#3351 数据丢失、#3350 端侧卡顿）已打 stale 标签，维护者响应链断裂。
- **LobsterAI**：唯一活跃 Issue 已 stale 5 个月，**项目实质性停滞**，社区参与度接近归零。

> **规律**：项目活跃度与 Issue 响应率呈强正相关。**OpenClaw/CoPaw/Zeroclaw/NanoClaw** 在高速迭代的同时保持了相对健康的响应节奏，而 **PicoClaw/LobsterAI** 在活跃度下降后迅速进入"维护真空"，说明**社区持续投入是项目生命力的核心指标**。

---

## 7. 值得关注的趋势信号

### 趋势一：从"功能堆叠"走向"会话语义稳定"
OpenClaw 的 tombstone/watermark/recovery 反思、CoPaw 的上下文丢失 P1（#7579/#7584）、PicoClaw 的 jsonl 物理删除（#3351）共同指向：**Agent 框架的核心瓶颈已从"能做什么"转向"状态可预测"**。开发者应重点关注持久化层（SQLite + 压缩 + watermark）的设计严谨性。

### 趋势二：Provider 契约化与"速度档位"成为新范式
NanoClaw 的 `speed` 属性、OpenClaw 的 Plugin SDK 契约化、CoPaw 的多模型适配表明：**Provider 不再是字符串配置，而是声明式能力矩阵**。Cursor / OpenCode / Codex 正在快速建立"byte-identical 输出"的契约标准，多 Provider 矩阵的同步节奏将决定未来 6 个月的生态位。

### 趋势三：多 Agent 协作范式进入"自治等待"阶段
CoPaw 的 `wait_agent_task`（#7580）需求揭示了**主-子 Agent 范式的下一道关卡**：从"派发任务"走向"主动巡检 + 阻塞式等待 + 异常回收"。这一方向目前尚无成熟实现，是差异化机会窗口。

### 趋势四：通道治理（IM/邮件/Webhook）成为体验护城河
Telegram / 飞书 / Slack / Proton Mail / WeCom 的可观测性、流式渲染、配置一致性，已从"加分项"变为"必选项"。**入站静默失败（NanoClaw #3728）** 这类问题对生产用户的伤害远大于功能缺失。

### 趋势五：Anthropic 缓存优化从"工程技巧"上升为"产品能力"
Zeroclaw 的 #10660/#10662/#10663 三连提议表明，**Provider 层的成本可控性正在成为用户选型的关键决策点**。可配置 TTL、断点优化、断点槽位预算应作为生产级 Agent 框架的标准能力。

### 对 AI 智能体开发者的参考价值

1. **构建新框架时**：优先设计"会话状态机的形式化语义"，tombstone / watermark / recovery 应作为一等公民而非补丁。
2. **集成多 Provider 时**：采用声明式契约而非 flag 拼凑，预留 byte-identical 测试能力。
3. **面向生产部署时**：将"通道入站可观测性"和"Provider 缓存可配置"作为上线 checklist 必选项。
4. **关注社区治理**：从 OpenClaw 的 `clawsweeper` 自动化 triage 中借鉴标签与分诊流程，可显著降低维护者注意力瓶颈。

---

## 附录：今日关键风险预警

| 项目 | 风险等级 | 核心风险 | 建议响应窗口 |
|---|---|---|---|
| OpenClaw | 🔴 高 | xAI OAuth 覆盖 Grok OAuth 目录（#140482）无 fix PR | 24h |
| CoPaw | 🔴 高 | v2.2.0 上下文丢失（#7579/#7584）用户标注"非常严重" | 24-48h |
| PicoClaw | 🔴 高 | 数据物理删除（#3351）已 stale，建议立即响应避免社区信任流失 | 立即 |
| NanoBot | 🟠 中 | P1 会话持久化阻塞事件循环（#5580）滞留 ~10 天 | 一周内 |
| LobsterAI | 🔴 高 | 维护真空，5 个月无实质进展 | 评估项目存续 |

---

**报告说明**：本报告基于 9 个项目在 2026-09-07 过去 24 小时的 GitHub 公开数据，所有 Issue / PR 编号均可追溯至对应仓库原地址。报告侧重趋势提炼与横向对比，单项目深度分析请参见各项目独立日报。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报
**日期：2026-09-07**

---

## 1. 今日速览

NanoBot 过去 24 小时整体活跃度处于**中高位**，开发节奏稳定。Issues 端无新增或活跃讨论，但 Pull Request 端有 **13 条更新**（10 条仍开放，3 条已关闭/合并），呈现典型的"以 PR 推进为主、社区讨论平淡"的特征。从主题分布看，今日工作集中在 **CI/CD 基础设施优化**、**TUI/WebUI 体验修复**、**Provider 容错与可观测性**以及 **MCP 安全测试覆盖**，整体方向偏向"加固既有能力"而非引入新范式。项目健康度评估：**良好**。

---

## 2. 版本发布

⚠️ 今日无新版本发布。

---

## 3. 项目进展（已合并/关闭的重要 PR）

| PR | 标题 | 作者 | 影响 |
|---|---|---|---|
| [#5680](https://github.com/HKUDS/nanobot/pull/5680) | ci: 并行化测试并过滤无关 job | @chengyongru | 引入 `pytest-xdist` 加速 Linux/Windows Python 测试，启用 uv 依赖缓存，缩短 CI 反馈周期。 |
| [#5679](https://github.com/HKUDS/nanobot/pull/5679) | fix(tui): 在 footer 显示上下文窗口使用率 | @chengyongru | TUI 底部从聚合 token 吞吐改为显示真实上下文占用（如 `11% context`），更准确反映当前请求状态。 |
| [#5309](https://github.com/HKUDS/nanobot/pull/5309) | fix(skills): 允许 marketplace 技能覆盖内建技能 | @KDB-Wind | 修复 marketplace 把工作区同名技能误标为"已安装"导致安装按钮失效的回归问题。 |

**今日推进方向**：3 条已关闭 PR 均属"质量与体验修复"范畴——CI 速度、TUI 可读性、技能加载语义正确性。未触及新功能主干，可视为一次**稳态推进**。

---

## 4. 社区热点

过去 24 小时所有 PR 与 Issue 的评论数均未披露（标记为 `undefined`），点赞数也均为 0，无法基于互动数据精确排序。**但从更新热度看**，以下 PR 在窗口期被频繁刷新：

- [#5580](https://github.com/HKUDS/nanobot/pull/5580) **fix(session): 将持久化移出事件循环**（@chengyongru，p1）——涉及会话存储 I/O 与事件循环解耦，是高优先级性能/稳定性修复，虽未合并但关注度较高。
- [#5677](https://github.com/HKUDS/nanobot/pull/5677) **test: 稳定 Windows 上 flaky 与环境依赖型测试**（@KDB-Wind）——解决跨平台测试可信度问题。
- [#5678](https://github.com/HKUDS/nanobot/pull/5678) **test(security): 覆盖 redirect 与 pinned-DNS SSRF 防护面**（@KDB-Wind）——补齐安全防护的回归测试，回应了 SSRF 攻击面验证缺失的诉求。

**诉求分析**：维护者当前最关心的是**稳定性、可观测性、安全性测试**这三块"防御性"工作，而非新功能。

---

## 5. Bug 与稳定性

| 严重度 | Issue/PR | 描述 | 是否已有修复 |
|---|---|---|---|
| 🔴 P1 | [#5580](https://github.com/HKUDS/nanobot/pull/5580) | 会话持久化在事件循环上执行，慢存储/文件锁阻塞其他对话与运行时事件 | ✅ 有 PR（未合并） |
| 🟠 P2（Bug+Regression） | [#5675](https://github.com/HKUDS/nanobot/pull/5675) | 主模型挂起耗尽 runner 截止时间后，`FallbackProvider` 无法触发备用模型（修复 [#5674](https://github.com/HKUDS/nanobot/issues/5674)） | ✅ 有 PR（OPEN） |
| 🟠 P2（WebUI Bug） | [#5309](https://github.com/HKUDS/nanobot/pull/5309) | Marketplace 把 workspace 技能误标为已安装，安装按钮失效 | ✅ 已合并 |
| 🟢 P2（TUI） | [#5679](https://github.com/HKUDS/nanobot/pull/5679) | TUI footer 显示聚合 token 而非真实上下文窗口占用 | ✅ 已合并 |

**整体评估**：所有报告的 Bug 均已附挂修复 PR，未出现"裸奔 Bug"。最值得关注的是 **#5580 的 P1 会话持久化问题**，一旦线上触发将直接影响多个并发用户的体验，建议维护者优先合并。

---

## 6. 功能请求与路线图信号

| PR | 功能 | 状态 | 进入下一版本的概率 |
|---|---|---|---|
| [#5676](https://github.com/HKUDS/nanobot/pull/5676) | CLI 增加 Desktop-only 目标选择（`nanobot` 与 `nanobot webui` 支持 per-invocation target） | OPEN | 🟢 高 —— 明确的使用场景，UX 改进型 |
| [#5388](https://github.com/HKUDS/nanobot/pull/5388) | Agent：为模型可见的 MCP schema 增加字节预算（默认关闭） | OPEN（已迭代近 1 个月） | 🟡 中 —— 默认关闭降低风险，但需确认 token 节省的实际收益 |
| [#5386](https://github.com/HKUDS/nanobot/pull/5386) | MCP：保留 MCP Apps 结果元数据（rich call-result 单独通道） | OPEN（已迭代近 1 个月） | 🟡 中 —— 与 #5388 配套 |
| [#4551](https://github.com/HKUDS/nanobot/pull/4551) | Heartbeat：`isolated_session` 配置允许共享会话 | OPEN（已开放 2.5 个月） | 🟡 中 —— 长期未合并，需维护者明确取舍 |
| [#4549](https://github.com/HKUDS/nanobot/pull/4549) | Heartbeat：`model_override` 配置（低成本心跳模型） | OPEN（已开放 2.5 个月） | 🟡 中 —— 与 #4551 同主题，可能需合并处理 |
| [#5520](https://github.com/HKUDS/nanobot/pull/5520) | Provider：Codex 接入 Langfuse tracing（原生 SDK，每次 HTTP 一个 generation） | OPEN | 🟢 高 —— 补齐 OpenAI-compatible 之外的追踪能力 |

**信号**：路线图当前在往"**Desktop/WebUI 多端统一**"+"**MCP 应用层增强**"+"**可观测性补全**"三个方向收敛，但 [#4549](https://github.com/HKUDS/nanobot/pull/4549) / [#4551](https://github.com/HKUDS/nanobot/pull/4551) 已搁置 2.5 个月，建议关注是否被遗忘。

---

## 7. 用户反馈摘要

⚠️ 今日 Issues 无新增且无活跃评论，**无法从 Issue 区提炼真实用户痛点**。

可从 PR 描述侧写的隐含信号：
- **测试体验差**：连续出现 [#5677](https://github.com/HKUDS/nanobot/pull/5677) "flaky tests on Windows" 与 [#5680](https://github.com/HKUDS/nanobot/pull/5680) "parallelize tests"，表明贡献者对 CI 等待时间与稳定性已有体感抱怨。
- **可观测性诉求**：[#5520](https://github.com/HKUDS/nanobot/pull/5520) 与 [#5679](https://github.com/HKUDS/nanobot/pull/5679) 分别从 trace 与 UI 两个层面增加可观测信息，反映用户希望"看清系统在做什么"。
- **安全焦虑**：[#5678](https://github.com/HKUDS/nanobot/pull/5678) 的 SSRF 防护回归测试，反映出对生产环境网络出站安全的高度重视。

---

## 8. 待处理积压（提醒维护者）

| 滞留时长 | PR/Issue | 备注 |
|---|---|---|
| 🔴 **~2.5 个月** | [#4549](https://github.com/HKUDS/nanobot/pull/4549)、[#4551](https://github.com/HKUDS/nanobot/pull/4551) | Heartbeat 配置系列，无更新动作，建议明确合并/关闭/拆分决策 |
| 🟠 **~25 天** | [#5386](https://github.com/HKUDS/nanobot/pull/5386)、[#5388](https://github.com/HKUDS/nanobot/pull/5388) | MCP 增强对，与 #5520 配合可能构成 MCP 主题版本 |
| 🟠 **~10 天** | [#5580](https://github.com/HKUDS/nanobot/pull/5580)（**P1**） | 高优先级会话持久化修复，滞留时间已较长，建议加速 review |
| 🟡 **~14 天** | [#5520](https://github.com/HKUDS/nanobot/pull/5520) | Codex Langfuse 追踪，需求清晰，可推进 |
| 🟡 **~29 天** | [#5309](https://github.com/HKUDS/nanobot/pull/5309) | ⚠️ 今日刚合并，滞留时长实际为窗口前 |

---

**总结**：NanoBot 今日呈现"无大型新功能上线、多条质量与基础设施 PR 并行推进"的稳态特征。**最需维护者立刻关注的是 #5580（P1 性能/稳定性）** 与两条滞留超 2 个月的 Heartbeat 配置 PR。建议下一个迭代窗口聚焦：(1) 合并 #5580；(2) 对 #4549/#4551 给出明确决策；(3) 集中合并 MCP 增强三件套（#5386、#5388、#5520）形成可发布单元。

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报

**日期：** 2026-09-07
**数据周期：** 过去 24 小时
**项目仓库：** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

Zeroclaw 在过去 24 小时呈现"高 PR 流入、低版本产出"的典型稳定期特征：**50 条 PR 更新（44 待合并、6 已关闭）**与 **10 条 Issue 更新**同步活跃，但**无新版本发布**。Issues 端新开 8 条、关闭 2 条，关闭率仅 25%，与近期 v0.8.5 稳定线的收尾节奏吻合。今日新增议题高度集中在 **Anthropic 缓存策略**（#10660/#10662/#10663）与 **ZeroCode/ACP 会话恢复**（#10659/#10667）两条线，反映出团队正在为下一阶段的成本与可靠性优化做前置规划。整体健康度良好，活跃度评分约 **7.5/10**。

---

## 2. 版本发布

⚠️ 过去 24 小时**无新版本发布**。距离上一次稳定发布（v0.8.5 周线，详见 [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)）仍处于"仅合入就绪工作"的冻结收尾阶段。

---

## 3. 项目进展

今日共 **6 条 PR 已合并/关闭**，项目核心能力得到多处强化：

| PR | 标题 | 影响 |
|------|------|------|
| [#10487](https://github.com/zeroclaw-labs/zeroclaw/pull/10487) | fix(channels/matrix): resolve transcription providers from live config | **关闭**。Matrix 频道转写配置从构造期快照改为实时读取，使 `[providers.transcription.*]` 类型的别名能在运行时注册生效。 |
| [#10650](https://github.com/zeroclaw-labs/zeroclaw/pull/10650) | ci(channels/matrix): execute every Matrix lib test | **关闭**。修复 CI 只运行 Matrix 单个 lib 模块而跳过其余测试的盲点，提升回归覆盖。 |

> 📌 注：今日数据集中显示 6 条 PR 已合并/关闭，但完整明细未在本批次给出（仅展示了高评论 PR 前 20 条与已关闭条目）。上述两条为已确认关闭项中信息完整的代表。

**进展评估：** 进展较轻量，主要在 Matrix 转写、CI 选择器等周边环节推进；核心 ACP 会话恢复（[#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)）和 Anthropic 不完整响应分类（[#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)）等 XL 级改动仍处 `in-progress`，未合入。

---

## 4. 社区热点

按更新密度与议题重要性排序，今日最值得关注的话题：

1. **🔥 Anthropic 缓存策略三连发** — [@Audacity88](https://github.com/Audacity88) 连续提交 #10660/#10662/#10663，提议在上一轮最后一条消息上增加第三缓存断点、修正 OAuth 系统前缀低于最小阈值的断点浪费、并允许配置 1 小时 TTL 而非默认 5 分钟。三条 Issue 互相耦合，反映用户对 **Anthropic API 调用成本与缓存命中率** 的高度关注。
2. **🔥 ZeroCode/ACP 会话恢复稳定性** — #10659（预算超限后丢失可见进度）、#10667（重复渲染流式响应）两条 Bug 直指 **长时间任务的可靠性**。
3. **🔧 频道治理与安全** — [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)（Telegram 安全模型选择器）状态 `blocked / do-not-merge`，需维护者复核；[#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358)（Mattermost 审批流）同样阻塞。
4. **💬 长期开放的老议题** — [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)（Cron agent 无 wall-clock 超时，3 评论）持续引发关注。

---

## 5. Bug 与稳定性

按严重程度排序：

### 🚨 S1 - 工作流阻塞（P1 + risk:high）

| Issue | 描述 | 是否有 fix PR |
|------|------|----------------|
| [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659) | 预算超限后 Code/ACP 会话恢复时丢失可见进度 | ❌ 无 |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron agent 任务无 wall-clock 超时，进程内锁仅在启动时清理 | ❌ 无（仅讨论中） |

### ⚠️ S2 - 行为退化（P2）

| Issue | 描述 | 是否有 fix PR |
|------|------|----------------|
| [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) | ZeroCode 在 TurnComplete 前收到 prompt 完成时重复渲染响应 | ❌ 无 |
| [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) | OAuth 系统前缀缓存标记低于 Anthropic 最小缓存门槛，占用宝贵断点槽位 | ❌ 无（仅议题） |

### 🛠 已有修复方向的 Bug PR

- [#10654](https://github.com/zeroclaw-labs/zeroclaw/pull/10654) `fix(runtime): bound RPC dispatch stack usage` — 防止 RPC handler future 膨胀拖垮 WebSocket worker。
- [#10664](https://github.com/zeroclaw-labs/zeroclaw/pull/10664) `fix(gateway): sanitize public health errors` — 防止 `/health` 泄漏内部诊断信息。
- [#10655](https://github.com/zeroclaw-labs/zeroclaw/pull/10655) `fix(runtime): expose tool-result truncation` — 保留字节级截断度量，避免重复损耗。
- [#10652](https://github.com/zeroclaw-labs/zeroclaw/pull/10652) `fix(memory): route CLI memory factory through storage-aware resolver` — CLI memory 命令支持 postgres/qdrant 后端。
- [#10627](https://github.com/zeroclaw-labs/zeroclaw/pull/10627) `fix(channels/matrix): report real duration on outbound voice notes` — 修复 opus_duration 在多逻辑流下计算错误。

> 🔍 **稳定性观察**：今日新开 Bug 议题 **5 条**，但配套 fix PR 仅覆盖约一半，剩余 4 条仍处于"已知问题"状态，建议维护者排期。

---

## 6. 功能请求与路线图信号

### Anthropic Provider 深度优化（[#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) / [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) / [#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)）

三连提议围绕 Anthropic 缓存策略：第三断点、TTL 可配置（默认从 5 分钟升到 1 小时）、修复 OAuth 浪费断点。**很可能成为 v0.8.6+ 路线图的优先项**，因对生产环境的成本影响显著。

### ZeroCode 可配置性增强（[#10665](https://github.com/zeroclaw-labs/zeroclaw/issues/10665)）

将每窗格硬编码 8 个会话上限改为可配置。P3 优先级，**可能纳入下一个小版本**，因改动局部、风险中等。

### 已存在的 PR 实现，可能进入下个版本：

- [#10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450) `feat(gateway): stream webhook chat turns over SSE` — Webhook 支持 SSE 流式输出。
- [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) `feat(sessions): add persistent session prompt attachments` — 会话级持久化提示附件（最多 4 个），单次使用审批。
- [#10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411) `feat(channels): serialize same session messages` — 同会话消息序列化，避免并发轮次竞争。

> 📊 **路线图判断**：上述三项均为 XL/L 级增强，处于 `needs-author-action` 阶段，短期合入概率低，但代表了 "会话附件 / 流式 / 顺序保证" 的明确方向。

---

## 7. 用户反馈摘要

从议题摘要与描述中提炼的真实诉求：

- **💸 成本敏感**：Anthropic 缓存默认 5 分钟 TTL 被认为过短，运维希望可配置 1 小时；OAuth 路径下断点浪费问题反映出对**生产账单**的持续焦虑（#10662/#10663）。
- **⏱ 长时间任务可靠性**：ZeroCode/ACP 用户对**预算耗尽后能恢复到上次可见进度**有强需求，#10659 的描述指出"已完成工具调用但 UI 看不到任何东西"是核心痛点。
- **🔄 重复渲染**：#10667 揭示流式响应 + TurnComplete 时序竞争影响体验，用户希望"只看到一次完成提示"。
- **🛡 内部信息泄漏**：[#10664](https://github.com/zeroclaw-labs/zeroclaw/pull/10664) 显示 `/health` 端点暴露诊断快照被视为安全问题，运维期待最小化公开面。
- **📚 文档缺口**：#10572（WeCom 频道）已关闭，说明"实现存在但文档缺失"是社区文档化的常见诉求。
- **⚙️ 后端灵活性**：[#10652](https://github.com/zeroclaw-labs/zeroclaw/pull/10652) 反映 CLI memory 命令硬走 sqlite，postgres/qdrant 用户被静默拒绝。

---

## 8. 待处理积压

以下高优先级议题/PR 已长时间开放，建议维护者关注：

| Issue/PR | 标题 | 状态 | 风险 |
|----------|------|------|------|
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron agent 任务无 wall-clock 超时 | 2026-07-20 开，in-progress | high |
| [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) | v0.8.5 周稳定线 tracker | 2026-07-27 开 | high |
| [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) | fix(anthropic): classify incomplete terminal responses | 2026-07-27 开，in-progress | medium |
| [#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283) | fix(tools): decompress gzip/brotli/deflate web_fetch | 2026-07-23 开，stale-candidate | high |
| [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) | feat(runtime): expose token accounting on history-trim | blocked / do-not-merge | medium |
| [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) | feat(channels/telegram): secure model picker | blocked / do-not-merge | high |
| [#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358) | feat(channels): Mattermost approval prompts | blocked / do-not-merge | high |
| [#9378](https://github.com/zeroclaw-labs/zeroclaw/pull/9378) | fix(acp): persist failed and cancelled turn transcripts | needs-author-action, stale-candidate | medium |
| [#10016](https://github.com/zeroclaw-labs/zeroclaw/pull/10016) | fix(hooks): correlate webhook audit calls by identity | needs-maintainer-review | high |
| [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) | fix(acp): persist interrupted turn progress | 2026-08-20 开，in-progress | high |
| [#10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411) | feat(channels): serialize same session messages | needs-author-action | high |

> ⚠️ **风险提示**：`stale-candidate` 标签出现 [#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283) 与 [#9378](https://github.com/zeroclaw-labs/zeroclaw/pull/9378)，若 7 天内无作者响应可能进入 stale 处理流程，建议作者尽快 rebase 并响应评审意见。

---

## 📈 项目健康度总览

| 维度 | 评分 | 说明 |
|------|------|------|
| 活跃度 | ⭐⭐⭐⭐ | 50 PR + 10 Issue，更新密集 |
| 合并效率 | ⭐⭐ | 50 PR 中仅 6 条已关闭，44 条仍在积压 |
| Bug 响应 | ⭐⭐⭐ | 今日新 Bug 多有对应 fix PR 起草 |
| 路线清晰度 | ⭐⭐⭐⭐ | v0.8.5 周线 tracker 在持续更新 |
| 社区参与 | ⭐⭐⭐ | 多位贡献者（vrurg / minato32 / Project516 / sebkraemer / atirna 等）参与 |

**总体评估：🟢 健康稳定，处于版本收尾与下阶段规划并行的关键窗口。**

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目日报

**日期**：2026-09-07
**数据周期**：过去 24 小时
**项目**：[sipeed/picoclaw](https://github.com/sipeed/picoclaw)

---

## 1. 今日速览

PicoClaw 在过去 24 小时活跃度处于**中低位水平**：共 4 条 Issue 更新与 2 条 PR 更新，无新版本发布。社区焦点集中在**持久化存储可靠性**、**低性能设备 Web UI 体验**与**Provider/Channel 兼容性扩展**三类问题。值得注意的是，已关闭 1 条长期挂起的 Enhancement Issue（#675，约 6 个月）和 1 条 QQ Channel 附件能力 PR（#1349，约 6 个月），整体仓库仍存在**大量陈旧未响应项**（含 stale 标签的 Issue/PR 各 1 条），维护者响应节奏需关注。

---

## 2. 版本发布

本周期无新版本发布。

---

## 3. 项目进展

今日**实质性合并/关闭**的活动主要清理了两条历史挂起项：

- **PR #1349 已关闭**：[feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349)
  - 由 @aishannon 于 2026-03-11 提出，旨在扩展 QQ Channel 对 emoji、voice、image、video、file 等附件类型的解析与回复能力，并优先使用 Markdown 回复。
  - 该 PR 历经约 6 个月未推进，本日被关闭（未明示合并或拒绝）。**建议关注后续是否拆分重组或由维护者接手重写**。

- **Issue #675 已关闭**：[Add more LLM Provider Support](https://github.com/sipeed/picoclaw/issues/675)
  - 由 @sheying2013 于 2026-02-23 提出的 Provider 增强请求，共 7 条评论，今日关闭。
  - 关闭动作本身可视为路线图信号：项目可能在 LLM Provider 扩展上已选定不同实施路径（参考今日 Issue #3369 关于 OpenCode Go 的 Header 支持即为 Provider 适配的延伸方向）。

**整体评估**：今日无功能性代码合入主线，项目向前推进幅度有限，更多体现为 backlog 清理。

---

## 4. 社区热点

按评论数与议题重要性排序的活跃讨论：

| 排名 | 议题 | 类型 | 评论数 | 链接 |
|------|------|------|--------|------|
| 1 | [Add more LLM Provider Support](https://github.com/sipeed/picoclaw/issues/675) | Enhancement | 7 | #675 |
| 2 | [自动压缩会物理删除 session 原始记录](https://github.com/sipeed/picoclaw/issues/3351) | Bug/Stale | 1 | #3351 |
| 2 | [嵌入式设备下 Web UI 输入框卡顿](https://github.com/sipeed/picoclaw/issues/3350) | Bug/Stale | 1 | #3350 |

**诉求分析**：
- **#675（Provider 扩展）**：长期诉求，反映用户对 PicoClaw 作为通用 AI Agent 入口的兼容性期待。今日已关闭，需关注是否被更细分的 Provider 适配任务（如 #3369）取代。
- **#3351（持久化存储）**：触及**数据可靠性**这一核心痛点，开发者已定位到 `pkg/memory/jsonl.go` 中 `SetHistory → rewriteJSONL` 的覆盖式重写逻辑，诉求偏向"append-only + 压缩分层"。
- **#3350（嵌入式性能）**：指向 PicoClaw Launcher 在 RV1106、RISC-V 等低算力平台上的可用性，是项目差异化定位（端侧 AI）的重要反馈。

---

## 5. Bug 与稳定性

| 严重程度 | 议题 | 描述 | 是否有 Fix PR |
|----------|------|------|---------------|
| 🔴 高 | [#3351](https://github.com/sipeed/picoclaw/issues/3351) | session 自动压缩**物理删除** `.jsonl` 原始记录，失忆后无法找回历史；违反用户对持久化的预期 | ❌ 无 |
| 🟡 中 | [#3350](https://github.com/sipeed/picoclaw/issues/3350) | 嵌入式/低性能设备 Web UI 输入框打字严重卡顿，疑似前端未做长会话惰性渲染 | ❌ 无 |
| 🟢 低 | [#3369](https://github.com/sipeed/picoclaw/issues/3369) | OpenCode Go 缺少 `x-opencode-session` Header，影响特定 Provider 接入 | ❌ 无（属功能请求） |

**关键风险**：
- **#3351 涉及数据丢失**，即便非崩溃级 bug，也直接影响用户信任。建议优先响应。
- 两个 Bug Issue 均已被打上 **stale** 标签，提示机器人已判定维护者长期未跟进，可能被自动关闭，需立即关注。

---

## 6. 功能请求与路线图信号

| 议题/ PR | 类别 | 信号强度 | 链接 |
|----------|------|----------|------|
| OpenCode Go Session Header 支持 | Provider 适配 | 🟢 强 | [#3369](https://github.com/sipeed/picoclaw/issues/3369) |
| Czech (cs) 代码包裹标签补全 | i18n | 🟡 中 | [PR #3348](https://github.com/sipeed/picoclaw/pull/3348) |
| QQ Channel 附件扩展 | Channel 能力 | 🟡 中（已关闭，待重生） | [PR #1349](https://github.com/sipeed/picoclaw/pull/1349) |

**判断**：
- **#3369** 范围明确、影响面集中，最有可能在下一版本中纳入。
- **PR #3348** 为纯翻译补全，合并门槛低，但目前同样被 stale 标记，需维护者 review。
- **PR #1349** 的关闭可能意味着 QQ Channel 附件扩展将以更小颗粒度拆分后重新提交。

---

## 7. 用户反馈摘要

从评论与 Issue 描述提炼的真实痛点：

1. **数据持久化焦虑**（[#3351](https://github.com/sipeed/picoclaw/issues/3351)）
   - 用户明确验证 `.jsonl` 文件"真的变少了"，反映出对**前端显示与底层存储一致性**的强烈敏感性。
   - 诉求核心：希望压缩机制做成"分层存储 + 可回溯"，而不是"覆盖式丢弃"。

2. **端侧性能瓶颈**（[#3350](https://github.com/sipeed/picoclaw/issues/3350)）
   - 真实使用场景：RV1106、RISC-V 等嵌入式板子上跑 PicoClaw Launcher + Web UI。
   - 痛点：聊天记录一长，输入框就开始卡顿——用户认为这是**不应与聊天长度耦合**的体验问题。

3. **Provider 多样性期待**（[#675](https://github.com/sipeed/picoclaw/issues/675)）
   - 7 条评论显示社区对更多 LLM Provider 的明确呼声，但缺乏具体的 Provider 名单（数据不足以判断优先级）。

4. **OpenCode Go 接入需求**（[#3369](https://github.com/sipeed/picoclaw/issues/3369)）
   - 用户场景：将 PicoClaw 用作 OpenCode Go 的会话前端，需 Provider 层正确传递 session header。

**整体满意度信号**：暂无正面反馈出现，活跃议题均带有"问题/缺失"性质。

---

## 8. 待处理积压

以下条目已带 **stale** 标签或长期未响应，建议维护者优先 review 以避免被自动关闭：

| 类型 | 编号 | 标题 | 创建时间 | 未响应时长 | 链接 |
|------|------|------|----------|-----------|------|
| Issue | [#3351](https://github.com/sipeed/picoclaw/issues/3351) | session 自动压缩物理删除原始记录 | 2026-08-30 | ~8 天 | 🔴 高优先 |
| Issue | [#3350](https://github.com/sipeed/picoclaw/issues/3350) | 嵌入式设备 Web UI 输入卡顿 | 2026-08-30 | ~8 天 | 🔴 高优先 |
| PR | [#3348](https://github.com/sipeed/picoclaw/pull/3348) | i18n: complete Czech code wrap labels | 2026-08-29 | ~9 天 | 🟡 中 |

**提醒**：
- #3351 与 #3350 涉及数据安全与核心使用体验，建议在下一维护窗口内**至少给出官方回应**（即使为"已记录，将在 vX.Y 修复"）。
- #3348 为低风险翻译类 PR，合并成本极低，建议尽快 ack。

---

### 📊 项目健康度速记

| 维度 | 评估 |
|------|------|
| 代码合入节奏 | 🟡 缓慢（24h 无主线合并） |
| Issue 响应及时性 | 🔴 不足（关键 Bug 已 stale） |
| 社区参与度 | 🟢 中等（Issue 描述质量高，已附源码定位） |
| 数据可靠性 | 🔴 风险项（#3351） |
| 端侧可用性 | 🟡 待优化（#3350） |
| 多 Provider 兼容性 | 🟢 在演进（#3369 推动中） |

---

*日报基于 GitHub 公开数据自动整理，建议结合内部维护看板综合决策。*

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目日报

**日期：2026-09-07**

---

## 1. 今日速览

NanoClaw 今日维持较高活跃度，过去 24 小时共产生 2 条新 Issue 和 15 条 PR 更新，其中 7 条 PR 已合并/关闭，8 条仍待合并。**核心主题明显集中在 `refactor(providers)` 系列重构**——由 @zvi-fried 主导的 Provider 契约化改造正在集中收割，7 条已关闭的 PR 中有 6 条与此相关。此外，社区渠道（Slack、Telegram）和新通道（Proton Mail、Cursor Provider）方向均有新动向。整体来看，项目处于**架构清理与生态扩展并行推进**的阶段。

---

## 2. 版本发布

**无新版本发布。** 最新版本仍为 **v2.3.0**（2026-08-24 发布），距今约 14 天。

---

## 3. 项目进展

今日合并/关闭的 7 条 PR 几乎全部围绕 **Provider 契约化重构**，这是 NanoClaw 近期最重要的架构演进：

| PR | 标题 | 影响 |
|---|---|---|
| [#3586](https://github.com/nanocoai/nanoclaw/pull/3586) | refactor(providers): declare the setup provider contract and install verifier | 确立安装提供方的契约声明与验证机制 |
| [#3585](https://github.com/nanocoai/nanoclaw/pull/3585) | refactor(providers): declare the host provider contract | 将 host 侧的 provider spawn / group-init 接入声明式契约 |
| [#3581](https://github.com/nanocoai/nanoclaw/pull/3581) | refactor(providers): declare the runtime provider contract | 容器运行时的 provider 接缝变成可执行契约 |
| [#3584](https://github.com/nanocoai/nanoclaw/pull/3584) | refactor(providers): implement the codex provider contract | Codex payload 绑定契约，向后兼容旧 core |
| [#3591](https://github.com/nanocoai/nanoclaw/pull/3591) / [#3727](https://github.com/nanocoai/nanoclaw/pull/3727) | refactor(providers): render provider instructions from core-owned canon | Provider 指令文本由 core 统一渲染，根除"各自重述核心语义"的乱象 |
| [#3592](https://github.com/nanocoai/nanoclaw/pull/3592) | feat(groups): add a core-owned speed inference property | 引入 `speed` 推理档位（与 `model` / `effort` 并列），`ncl groups config update --speed` 支持 |

**推进意义：**
- Provider 抽象从"flag 拼凑"升级为**注册校验的强契约**，新增 provider 必须实现声明的能力。
- `speed` 属性让用户可在 agent group 级别控制推理速度（fast/balanced/...），与 `model`、`effort` 形成完整的推理控制三元组。
- Agent 指令文本统一由 core 渲染，**显著降低多 provider 文档/语义不一致导致的运行时歧义**。

---

## 4. 社区热点

今日新增条目互动量均不高（评论与反应均为 0），但 **Issue #3728** 因其问题性质具有最高潜在讨论价值：

- 🔥 **[#3728 - Telegram 静默死亡 4 天](https://github.com/nanocoai/nanoclaw/issues/3728)** — @ergut 报告 Telegram 入站 pollingLoop 无重试上限、无成功日志，导致 inbound 静默失败 4 天，期间 host 显示 `active`、出站消息正常、计划任务也照常执行。**这类"静默失败"问题对生产环境危害最大**，预计会引发社区共鸣。
- 🔥 **[#3730 - Slack shared session 失效](https://github.com/nanocoai/nanoclaw/issues/3730)** — @bjsheppa 报告 `session_mode: "shared"` 配置下，每个 DM 顶层消息仍会创建新的 per-thread session，与配置语义不符。
- 📈 **[#3729 - 浏览器门户化社区接入](https://github.com/nanocoai/nanoclaw/pull/3729)** — @gavrielc 提出将 Echo / Slack 设置迁入浏览器门户并接入 WorkOS 单点登录，是面向非技术用户的体验升级。

**背后诉求分析：** 用户既要求**对运维故障有可观测性**（Telegram 日志缺口），也要求**配置语义与实际行为一致**（Slack session_mode），同时期待**面向最终用户的低门槛上手路径**（浏览器门户）。

---

## 5. Bug 与稳定性

按严重程度排列：

| 等级 | Issue | 现象 | 是否有 fix PR |
|---|---|---|---|
| 🔴 **高** | [#3728](https://github.com/nanocoai/nanoclaw/issues/3728) | Telegram pollingLoop 无重试上限，inbound 静默失败可达 4 天，host 状态无异常 | ❌ 尚无 fix PR |
| 🟠 **中** | [#3730](https://github.com/nanocoai/nanoclaw/issues/3730) | Slack `session_mode: "shared"` 行为不符合预期，每条 DM 顶层消息仍创建新 session | ❌ 尚无 fix PR |
| 🟡 **低** | [#3654](https://github.com/nanocoai/nanoclaw/pull/3654) | `host.docker.internal` 未加入 `NO_PROXY`，导致 host 端 MCP 不可达 | ✅ fix PR 待合并 |

**稳定性观察：** 两条高/中级 Bug 均无 fix PR 跟进，**维护者应及时响应**，尤其 #3728 涉及生产可用性，#3654 已存在 fix PR 等待 review。

---

## 6. 功能请求与路线图信号

| PR | 信号 | 纳入下版本的可能性 |
|---|---|---|
| [#3729](https://github.com/nanocoai/nanoclaw/pull/3729) | **浏览器门户 + WorkOS SSO** —— 把 CLI 流程下沉到 GUI | ⭐⭐⭐ 高，扩展受众 |
| [#3726](https://github.com/nanocoai/nanoclaw/pull/3726) | **Proton Mail 原生适配器**（通过 Proton Mail Bridge） | ⭐⭐⭐ 高，补齐邮件通道 |
| [#3355](https://github.com/nanocoai/nanoclaw/pull/3355) | `/add-cursor` 安装 skill —— Cursor Agent SDK 一键接入 | ⭐⭐⭐ 高，与 #3588 / #3356 配套 |
| [#3588](https://github.com/nanocoai/nanoclaw/pull/3588) | OpenCode provider 契约实现（byte-identical 输出） | ⭐⭐⭐ 高，已锁定兼容 |
| [#3356](https://github.com/nanocoai/nanoclaw/pull/3356) | Cursor Agent SDK payload | ⭐⭐⭐ 高，与 #3588 同源推进 |
| [#3592](https://github.com/nanocoai/nanoclaw/pull/3592) | `speed` 推理档位（已合并） | ✅ 已落地下版本 |

**路线图主线：**
1. **Provider 契约化收尾** —— OpenCode / Cursor / Codex 全部对齐到统一契约。
2. **通道生态扩张** —— Slack 修复、Proton Mail 新增、Telegram 可观测性增强。
3. **用户入口升级** —— 从纯 CLI 走向 CLI + 浏览器门户并行的混合模式。

---

## 7. 用户反馈摘要

由于今日新增 Issue 评论均为 0，**直接的用户声音来自 Issue 描述本身**，可提炼如下真实痛点：

- **可观测性缺失（Telegram）**：@ergut 反映"host active、出站正常、计划任务也跑了，唯独 inbound 静默死亡"——说明**当前的健康检查未覆盖通道入站侧**，用户无从感知故障。
- **配置语义失真（Slack）**：@bjsheppa 指出 `session_mode: "shared"` 的承诺与实际行为不符，**"看似工作但其实每个 DM 都新建 session"** 会对有状态对话体验产生破坏性影响。
- **新通道期待（Proton）**：@drsmk238 在 PR #3726 中明确指出"Raspberry Pi 安装无法用 Proton Mail Bridge（无 ARM 二进制），且 Proton 无 IMAP/SMTP"——表明社区中已有大量隐私敏感型用户希望接入加密邮件通道。

---

## 8. 待处理积压

**长期未响应的重要条目**（按存在天数估算）：

| 条目 | 标题 | 创建日 | 已等待 |
|---|---|---|---|
| [#3356](https://github.com/nanocoai/nanoclaw/pull/3356) | feat(providers): add Cursor Agent SDK payload | 2026-08-19 | **19 天** |
| [#3355](https://github.com/nanocoai/nanoclaw/pull/3355) | feat(skills): add /add-cursor provider install skill | 2026-08-19 | **19 天** |
| [#3464](https://github.com/nanocoai/nanoclaw/pull/3464) | Remove v1-only session-commands.ts superseded by v2 command gate（修复 #2603） | 2026-08-23 | **15 天** |

**提醒维护者：**
- #3356 / #3355 是 Cursor 接入链路的关键 PR（与今日 #3588 OpenCode 契约为同源系列），建议**优先 review 以保持 provider 矩阵同步节奏**。
- #3464 修复的是**长达 15 天前** 提出的问题，且涉及 v1 → v2 命令门控的清理，**应在下一次发版前纳入**。

---

> **整体健康度评估：⭐⭐⭐⭐（4/5）** —— 架构重构主线清晰且持续推进，通道生态持续扩张；但存在两条影响生产的高/中级 Bug 无 fix PR 跟进，且部分早期 PR 接近 3 周未关闭，需关注响应时效。
>
> **本报告所有数据基于 GitHub 公开事件，截至 2026-09-07 抓取时刻。**

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报

**报告日期**：2026-09-07  
**数据范围**：过去 24 小时（基于 2026-09-06 GitHub 活动）  
**仓库**：[nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日速览

IronClaw 今日呈现"**纯依赖维护驱动 + 少量定向 Bug 修复**"的典型形态。过去 24 小时内 **Issues 零活动**（新开/活跃/关闭均为 0），**PR 共 9 条**但其中 8 条由 Dependabot 自动发起，仅 1 条为人工合并/关闭记录。无新版本发布。从活跃度看，仓库处于**低强度维护期**：核心功能层无新提交，社区无新增反馈通道，但维护者对依赖卫生与已知缺陷修复保持稳定节奏。整体项目健康度评估为 **平稳**，无显著风险信号。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

过去 24 小时有 **3 条 PR 合并/关闭**，构成今日主要推进内容：

### 3.1 依赖批量更新已收敛
- **PR #8049**（[链接](https://github.com/nearai/ironclaw/pull/8049)）– `everything-else` 组 19 项依赖批量更新（uuid 1.24.0→1.26.0、base64 0.22.1→0.23.1、toml 等），已 **CLOSED**。这是 9 月初发起的常规依赖滚动更新，与今日新开的 #8080 形成接力（后者继续推进到 21 项）。
- **PR #7835**（[链接](https://github.com/nearai/ironclaw/pull/7835)）– `actions` 组 5 项 GitHub Actions 依赖更新（含 anthropics/claude-code-action 1.0.183→1.0.210、actions/setup-node 4.0.2→7.0.0），**CLOSED**。setup-node 跳到主版本号 7.x 属于潜在 breaking change，但其 LOW/MEDIUM 风险标记说明已通过 CI 验证。
- **PR #7020**（[链接](https://github.com/nearai/ironclaw/pull/7020)）– `tokio-tungstenite` 0.29.0→0.30.0 minor 升级，**CLOSED**。注意此 PR 自 8 月 2 日开启，挂起 1 个月后于今日关闭，可能与 WebSocket 行为变更风险有关。

**整体判断**：今日"项目进展"主要在**依赖卫生**层推进，**未涉及功能性里程碑**。核心代码层面无新能力落地。

---

## 4. 社区热点

> **数据说明**：今日所有 PR 的评论数均为 `undefined`（即 0 评论），点赞数均为 0。这意味着：
> - 没有"讨论最活跃"的条目
> - 没有"反应最多"的条目
> - 所有 Dependabot PR 均处于无人 review 状态

**值得关注的非依赖类 PR（人工提交）**：
- **PR #8077** – [fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)（作者：@linhongyu510）  
  关闭 Issue #8009，涉及 MCP egress 诊断逻辑重构。此为今日**唯一带 Issue 关联**的功能性修复，反映社区/维护者对 **MCP（Model Context Protocol）安全边界**的关注。
- **PR #8076** – [fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)（作者：@be-student）  
  区分"已配对用户的断连共享频道"与"未配对账户"，涉及 Slack 适配器与 OpenAI 兼容接口的一致性错误分类。

**诉求分析**：两个非依赖 PR 均聚焦于**错误分类的精细化**，反映出在多通道（Slack、OpenAI 兼容、MCP）场景下，错误信息的可观测性与用户体验正在成为持续打磨方向。

---

## 5. Bug 与稳定性

今日 Issues 区域**零活动**，无新增 Bug 报告。但从 PR 侧可识别两个修复中或已修复的问题：

| 严重程度 | 问题 | 状态 | 链接 |
|---------|------|------|------|
| 中 | **MCP response leak 诊断错误归类**（Issue #8009）– 主机侧阻断泄露时，MCP 通道未能保留可区分的错误原因 | 已有 fix PR #8077（待合并） | [#8009](#) / [#8077](https://github.com/nearai/ironclaw/pull/8077) |
| 中 | **共享频道断连状态与未配对账户混淆** – Slack 适配器中两类用户消息被错误归为同一拒绝类别 | 已有 fix PR #8076（待合并） | [#8076](https://github.com/nearai/ironclaw/pull/8076) |
| 低 | **tokio-tungstenite 0.29→0.30 升级潜在兼容性问题** | PR #7020 已 CLOSED（关闭而非合并，说明可能通过其他方式处理或放弃） | [#7020](https://github.com/nearai/ironclaw/pull/7020) |

**回归风险提示**：
- `actions/setup-node` 4.0.2 → **7.0.0** 主版本跳跃（PR #7835/#8079），需关注 CI 节点环境是否需要 Node.js 版本对齐调整。
- `wasmtime` 等 wasm 组（PR #7834，OPEN 自 8 月 23 日，挂起 14 天）尚未合并，存在中等风险敞口。

---

## 6. 功能请求与路线图信号

由于今日**无新开 Issue**，无法从用户侧直接提取功能请求。但从 PR #8077 的标题与摘要可推断一条**隐含的路线图信号**：

> **MCP 安全与可观测性增强**：将 `response_leak_blocked` 集中到 `ironclaw_host_api::http` 模块，并让 MCP 通道识别特定 sentinel。这意味着 IronClaw 正在构建一个**分层的安全拦截体系**（主机侧拦截 + 协议侧可观测性），未来可能扩展到更多协议通道（HTTP/stdio/SSE 等）。

**判断**：今日无强信号指向"即将发布的新功能"，路线图更多体现在**稳定性收口**而非能力扩张。

---

## 7. 用户反馈摘要

今日 Issues 评论数 = 0，**无真实用户反馈可提炼**。

侧面观察：所有 Dependabot PR 评论数均为 0 且无 review 活动，**项目维护者对这些自动 PR 的响应节奏较慢**（例如 #7834 wasm 组 PR 已挂起 14 天）。这可能反映出：
1. 维护团队当前优先级在功能性 Bug 修复（#8076、#8077）而非依赖滚动；
2. Dependabot 策略可能配置过于激进，导致 PR 数量超出 review 容量。

---

## 8. 待处理积压

按挂起时长排序的**长期未响应 PR**：

| 挂起天数 | PR | 标题 | 风险等级 | 链接 |
|---------|-----|------|---------|------|
| **14 天** | #7834 | chore(deps): bump the wasm group（wasmtime 等 4 项） | medium | [链接](https://github.com/nearai/ironclaw/pull/7834) |
| 1 天 | #8080 | chore(deps): everything-else 组 21 项更新 | – | [链接](https://github.com/nearai/ironclaw/pull/8080) |
| 1 天 | #8078 | chore(deps): tokio-ecosystem 组 2 项更新 | – | [链接](https://github.com/nearai/ironclaw/pull/8078) |
| 1 天 | #8079 | chore(deps): actions 组 6 项更新（含 setup-node v7） | – | [链接](https://github.com/nearai/ironclaw/pull/8079) |
| 1 天 | #8077 | fix(mcp): classify response leak diagnostics | – | [链接](https://github.com/nearai/ironclaw/pull/8077) |
| 1 天 | #8076 | fix(assistant): distinguish disconnected shared channels | – | [链接](https://github.com/nearai/ironclaw/pull/8076) |

**提醒维护者关注**：
- **#7834（wasm 组）** 是最关键的积压项，wasmtime/wit-component/wit-parser 涉及 WASM 工具链，**挂起 14 天无 review**，存在中等兼容性风险敞口，建议优先处理。
- 今日新开的 4 条 Dependabot PR（#8080、#8078、#8079、#7020 后续）若批量合并，可一次完成依赖滚动，但需逐一 CI 验证。

---

## 附录：数据完整性说明

- 本报告基于 GitHub API 抓取的 Issues/PR 数据快照。
- 所有 `评论: undefined` 字段实际等价于评论数 = 0。
- 部分 PR（如 #8077）关闭了具体的 Issue（#8009），但 #8009 本身未出现在今日活跃 Issues 列表中，可能因更新时间窗口差异。

**报告生成时间**：2026-09-07  
**分析师角色**：AI 智能体与个人 AI 助手领域开源项目分析师

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报

**日期：2026-09-07**
**项目地址：https://github.com/netease-youdao/LobsterAI**

---

## 1. 今日速览

LobsterAI 项目今日整体活跃度处于**低位**。过去 24 小时内仅出现 1 条 Issue 更新（无新开 Issue、无 PR 活动、无版本发布），仓库呈现出接近静默的状态。值得关注的是，该条活跃 Issue（#1068）是一份标记为 [stale] 的长期未修复 Bug 报告，今日仅因自动机制被重新激活而出现时间戳更新。综合来看，项目维护节奏放缓，社区互动响应迟缓，需警惕长期不活跃带来的维护风险。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日无 PR 合并或关闭记录，项目代码层面**无实质性推进**。

---

## 4. 社区热点

今日唯一活跃的 Issue 为 [#1068](https://github.com/netease-youdao/LobsterAI/issues/1068)，由用户 @OnePieceJoker 于 2026-03-30 创建，至今已有近 5 个月时间。该 Issue 收到 1 条评论和 0 个点赞，互动度较低，但反映出**真实用户场景下的可用性问题**：用户在删除当前 Agent 后切换至其他 Agent（或仅剩 main agent），任务列表未能自动刷新，导致界面状态与实际操作不一致。

这种"看似小却影响体验"的状态同步类问题，往往是用户高频工作流中的痛点，理应获得维护者优先响应。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | Fix PR |
|---------|-------|------|--------|
| 中 | [#1068](https://github.com/netease-youdao/LobsterAI/issues/1066) | 删除当前 Agent 后切换未触发任务列表自动刷新，导致仅剩 main agent 时任务列表无法显示 | ❌ 暂无 |

**说明**：此 Bug 已超过 5 个月未修复，且被打上 `[stale]` 标签，反映维护者响应存在明显延迟。该问题影响 Agent 切换的核心交互流程，建议优先处理。

---

## 6. 功能请求与路线图信号

今日无新的功能请求类 Issue 提交。结合历史观察，Agent 列表与任务列表的状态同步机制可能是下一个迭代中需要补齐的基础能力，但目前缺乏明确的产品承诺或路线图信号。

---

## 7. 用户反馈摘要

- **痛点**：Agent 删除与切换操作的**前端状态未同步**，需要手动刷新才能看到正确的任务列表，用户体验割裂。
- **使用场景**：用户会频繁在不同 Agent 之间切换并查看各自的任务执行情况，状态滞后直接影响工作效率。
- **满意度**：暂无正面反馈信号，沉默的社区往往意味着用户对问题解决失去信心。

---

## 8. 待处理积压

- **#1068**（Bug）：创建至今约 158 天，已被标记 stale，**强烈建议维护者介入**，评估修复优先级或与用户沟通替代方案，避免社区参与度进一步流失。

---

### 📊 项目健康度评估

| 指标 | 状态 | 备注 |
|------|------|------|
| 代码活跃度 | 🟡 低 | 无 PR、无 Release |
| Issue 响应速度 | 🔴 差 | 长期 Issue 未处理 |
| 社区互动 | 🔴 弱 | 互动数极低 |
| 版本节奏 | ⚪ 无数据 | 缺乏发布信号 |

**总结**：LobsterAI 当前处于**维护放缓期**。短期内无版本迭代动力，但存量 Issue 已出现响应真空。建议维护团队梳理 backlog、清理 stale Issue 并发布阶段性进展公告，以重振社区信心。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目日报

**日期：** 2026-09-07
**数据周期：** 过去 24 小时（基于 GitHub 公开数据）
**报告角色：** AI 智能体与个人 AI 助手开源项目分析师

---

## 1. 今日速览

Moltis 项目在过去 24 小时内整体处于**低强度维护状态**，仓库活跃度偏低但质量稳定。**无新增 Issue，无新版本发布**，仅出现 2 条由同一贡献者 `@be-student` 提交的修复型 Pull Request，均处于 Open 状态等待评审。从两条 PR 的性质来看，社区关注点集中在 **TLS 协议安全性收紧** 与 **Shell 执行错误诊断精度** 两个工程化细节方向，未涉及大型新功能演进。整体而言，项目处于**稳步打补丁的维护窗口期**，健康度良好但社区互动不活跃。

- 活跃度评级：🟢 低-中（修复为主，无新需求涌入）
- 维护响应健康度：🟡 待观察（PR 均无 reviewer 互动，无评论）

---

## 2. 版本发布

⚠️ **今日无新版本发布。**

最近一次版本动态未在本数据快照范围内体现，建议关注 [Moltis Releases 页面](https://github.com/moltis-org/moltis/releases) 以获取最新发布情况。

---

## 3. 项目进展

今日无 PR 被合并或关闭，所有 Pull Request 均处于 **Open 等待评审** 状态。以下为今日新增但尚未合入的修复提案：

### 🔧 PR #1261 — fix(tls): restrict ALPN to HTTP/1.1
- **作者：** [@be-student](https://github.com/be-student)
- **状态：** Open（待合并）
- **关联 Issue：** #245
- **链接：** https://github.com/moltis-org/moltis/pull/1261
- **核心变更：**
  - 在 TLS 握手阶段仅通告 HTTP/1.1 ALPN，排除 HTTP/2
  - 在现有 TLS 配置测试中固定 ALPN 列表
  - 在贡献者文档中补充协议约束说明
- **完成验证：** `cargo test -p moltis-tls` 18 项测试全部通过
- **战略意义：** 这是为尚未支持 [RFC 8441](https://datatracker.ietf.org/doc/rfc8441/) WebSocket over HTTP/2 升级前的**安全防御性措施**，避免不当协议协商导致的安全或兼容性问题。属于"小步快跑"的稳健工程实践。

### 🔧 PR #1260 — fix(exec): report missing shell accurately
- **作者：** [@be-student](https://github.com/be-student)
- **状态：** Open（待合并）
- **关联 Issue：** #279
- **链接：** https://github.com/moltis-org/moltis/pull/1260
- **核心变更：** 在 spawn `NotFound` 错误分类时引入配置的 `cwd`（工作目录）作为上下文，避免因 `cwd` 存在而掩盖 `sh` 在 `PATH` 中缺失的真实错误。
- **完成验证：** 聚焦默认特性测试通过；`cargo check -p moltis-tools` 通过；reduced-feature 套件 915/916 通过（1 个 WAIT 测试未通过，需关注）
- **战略意义：** 提升执行子系统的错误可观测性，是 Agent 框架调试体验的重要改进。

**整体推进评估：** 项目今日在**稳定性与诊断能力**方向小幅推进，未涉及架构层面进展。

---

## 4. 社区热点

📭 **今日社区无热门讨论。**

两条 PR 均无评论、零点赞、零评审互动，Issues 端也未有新讨论涌现。社区参与度处于**冰点状态**，建议维护者主动触发评审流程，避免 PR 积压导致贡献者流失。

---

## 5. Bug 与稳定性

| 严重程度 | 问题 | 关联 PR | 是否已有 fix |
|---------|------|--------|-------------|
| 🟡 中 | TLS ALPN 配置可通告 HTTP/2，但项目尚未支持 RFC 8441 WebSocket 升级，存在协议层风险 | [#245](https://github.com/moltis-org/moltis/issues/245) | ✅ [#1261](https://github.com/moltis-org/moltis/pull/1261) |
| 🟢 低 | 执行子系统在 `sh` 缺失但 `cwd` 存在时，错误信息误报 cwd | [#279](https://github.com/moltis-org/moltis/issues/279) | ✅ [#1260](https://github.com/moltis-org/moltis/pull/1260) |
| 🟡 待观察 | PR #1260 验证中存在 1/916 WAIT 测试失败，原因未在快照中说明 | N/A | ⚠️ 需关注 |

**稳定性评估：** 今日两个被修复的 Bug 均为工程精度问题，未涉及崩溃、数据丢失或安全漏洞级别。但 **PR #1260 的 1 项未通过测试需要重点确认**，建议维护者在合并前要求作者明确 WAIT 状态原因。

---

## 6. 功能请求与路线图信号

今日**无新增功能请求或 Feature 类型 Issue**。从两条修复 PR 推断出的路线图信号如下：

1. **🔐 TLS 协议收敛策略已启动** —— PR #1261 明确表态 "until RFC 8441 WebSocket upgrades are supported"，暗示未来版本可能引入 **WebSocket over HTTP/2** 支持（参见 RFC 8441），这是个人 AI 助手类项目（特别是基于 browser-based frontend 的项目）向 HTTP/2 / HTTP/3 多路复用演进的重要信号。
2. **🛠️ 错误诊断基础设施持续优化** —— PR #1260 体现项目对执行子系统**可观测性**的持续投入，符合 AI Agent 框架"行为可追溯、可调试"的核心诉求。

---

## 7. 用户反馈摘要

⚠️ **今日无用户侧评论或反馈数据。**

Issues 与 PRs 评论数均为 0 或 undefined，无法提炼真实用户痛点。建议关注历史 Issue 中已有的诉求模式，以判断 Moltis 社区的主流使用场景。

---

## 8. 待处理积压

### 📋 维护者提醒清单

| 优先级 | 项目 | 类型 | 停留状态 | 建议动作 |
|-------|------|------|---------|---------|
| 🟠 高 | [#1261](https://github.com/moltis-org/moltis/pull/1261) | PR（TLS ALPN 修复） | Open，等待评审 | 涉及安全相关，建议 24h 内 review |
| 🟠 高 | [#1260](https://github.com/moltis-org/moltis/pull/1260) | PR（Shell 错误诊断） | Open，1 项测试 WAIT | 需确认 WAIT 失败原因后合并 |
| 🟡 中 | [#245](https://github.com/moltis-org/moltis/issues/245) | Issue（TLS 协议约束） | 已有 fix，等待合并后关闭 | 合并 PR #1261 后即可关闭 |
| 🟡 中 | [#279](https://github.com/moltis-org/moltis/issues/279) | Issue（执行错误诊断） | 已有 fix，等待合并后关闭 | 合并 PR #1260 后即可关闭 |
| 🟢 低 | 整体社区互动 | 活跃度 | 0 评论、0 点赞 | 建议触发 CONTRIBUTING 文档推广 |

**关键观察：** 两条 Issue（#245、#279）均已配对修复 PR，处于**只待合并即可闭环**的状态。建议维护者集中精力评审这两条 PR，可在 1-2 个工作日内完成此批积压清理。

---

## 📊 项目健康度总评

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码活跃度 | 🟡 中 | 有提交但量小，无 reviewer 互动 |
| 响应及时性 | 🟢 良 | Issue-PR 闭环结构清晰 |
| 社区参与度 | 🔴 低 | 0 评论、0 反应，潜在冷启动风险 |
| 工程质量 | 🟢 良 | 测试覆盖到位，PR 描述规范 |
| 路线图清晰度 | 🟢 良 | 修复方向明确，前瞻性约束合理 |

**一句话总结：** Moltis 今日处于"安静维护期"，两条高质量修复 PR 已就位等待评审，维护者只需完成 review 即可显著提升项目推进度与社区信心。

---

*报告生成时间：2026-09-07 | 数据来源：GitHub 公开 API | 报告基于过去 24 小时数据快照*

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报

**日期：2026-09-07**
**项目：[agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)**
**数据周期：过去 24 小时**

---

## 1. 今日速览

CoPaw 今日整体处于**高活跃、高问题密度**的运营状态。过去 24 小时内，仓库（实际数据指向 `agentscope-ai/QwenPaw` 命名空间）共产生 **21 条 Issue 更新**（18 条活跃/3 条关闭）与 **10 条 PR 更新**（9 条待合并/1 条关闭），但**无任何版本发布**。讨论焦点高度集中在三个方向：**主-子 Agent 协作的进度查询机制**、**长上下文下的消息持久化与丢失**、以及**Telegram / 飞书等通道的流式输出渲染**。值得关注的是，多个长期未解决 Bug（#7579、#7584 的上下文丢失，#7363 的事件循环阻塞）持续在 v2.2.0 版本上复现，提示近期版本可能存在回归风险。社区贡献方面，5 个 `first-time-contributor` 标签的 PR 集中提交，说明新贡献者参与度良好，问题驱动开发的节奏明显。

---

## 2. 版本发布

**今日无新版本发布。**

最近可观察的版本仍为社区报告中提及的 v2.1.0 / v2.1.1b1 / v2.2.0 / 2.2beta3，未观察到正式 Tag 发布或 Release Notes 更新。

---

## 3. 项目进展

### 已关闭的 PR（1 条）

| PR | 标题 | 状态 | 价值 |
|---|---|---|---|
| [#2134](https://github.com/agentscope-ai/QwenPaw/pull/2134) | feat(heartbeat): Support configurable heartbeat timeout | CLOSED | 提交于 2026-03-23，时隔近半年今日关闭，但未在数据中显示合并状态，建议维护者确认是否实际合入主干。该 PR 旨在将 heartbeat 硬编码 120s 超时改为运行时可配置，以解决长任务被强制中断问题。 |

### 重要待合并 PR（按价值排序）

| PR | 主题 | 关联 Issue | 价值评估 |
|---|---|---|---|
| [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) | fold consumed thinking under context pressure | 上下文膨胀导致模型"失忆" | **高优先级**。直接缓解 #7579/#7584 反馈的"模型回复从上下文丢失"问题，通过追踪 ThinkingBlock ID 并在上下文压力下折叠已消费的思考内容。 |
| [#7546](https://github.com/agentscope-ai/QwenPaw/pull/7546) | lazy-load unused builtin channel modules | 启动慢 | 修复控制台启动时强制导入全部 18 个内置通道（如 `lark_oapi`）导致的几十秒级延迟，纯控制台工作区受益明显。 |
| [#7547](https://github.com/agentscope-ai/QwenPaw/pull/7547) | recover stuck session queue consumers | 飞书通道卡死 | 修复高优先级句柄卡住后，后续消息被错误判定为"已在运行"而丢弃。 |
| [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577) | enqueue follow-up messages when chat task is running | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | 修复 409 报错，应将新消息入队而非拒绝，提升任务执行中的交互体验。 |
| [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) | log exceptions in coordinator _drain() | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572) | 工具派发层异常栈恢复记录，提升可观测性。 |
| [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) | render Markdown tables as `<pre>` in Telegram | [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585) | 修复 Telegram 表格乱码。 |
| [#7591](https://github.com/agentscope-ai/QwenPaw/pull/7591) | auto-collapse reasoning streaming card (Feishu) | [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) | 飞书思考流式卡自动折叠。 |
| [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) | optional cleanup of Telegram intermediate messages | [#7586](https://github.com/agentscope-ai/QwenPaw/issues/7586) | Telegram 最终回复后清理中间消息，默认关闭，行为兼容。 |
| [#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593) | restore session direct path input | [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588) | 恢复 v2.1.0 路径直输设计。 |

**整体评估：** 今日 PR 池以"通道体验优化"和"上下文/队列健壮性"两条主线推进，Issue-to-PR 闭环做得较好（9 个待合并 PR 多数精准对应今日 Issue），但缺乏合并动作，建议维护者加速评审。

---

## 4. 社区热点

按评论数与反馈强度排序：

| 排名 | 编号 | 标题 | 评论 | 社区诉求 |
|---|---|---|---|---|
| 1 | [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) | 主 agent 不主动查询子 agent 进度 | 8 | **多 Agent 协作的自主性问题**。用户期望主 Agent 应具备子任务超时/异常的主动巡检能力，而非被动响应查询。 |
| 2 | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | 任务执行中触发 409 报错 | 5 | **API 行为不符合用户预期**：用户希望任务运行中提交的新消息进入消息队列而非被拒。 |
| 3 | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | 同步调用阻塞事件循环，timeout 失效 | 4 | **核心性能/可用性**。启动 118–135s 卡死、发消息 126s 卡死，Windows 桌面端体验受损严重。 |
| 4 | [#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814) | SIGBUS 崩溃 in `sqlite3WalFindFrame`（已关闭） | 4 | macOS Scroll 启动崩溃，已关闭但建议复盘回归测试覆盖。 |
| 5 | [#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513) | DeepSeek-V4-Pro 工具调用混用问题 | 3 | 模型流式回复与工具调用边界识别问题。 |
| 6 | [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) | DeepSeek scroll 压缩 role=user 导致报错 | 3 | 上下文压缩实现细节对 OpenAI 兼容接口的契约不符合。 |

**热点背后的核心诉求：**
- **多 Agent 协作的"自治 + 实时性"**：用户希望主 Agent 主动巡检子任务，而非依赖人工"踢一脚"。
- **长任务的稳健性**：长上下文任务的消息持久化、压缩策略、事件循环不能阻塞主线程。
- **通道体验统一**：Telegram/飞书用户对流式输出 UI（中间消息折叠、表格渲染、Markdown 兼容）有较高期待。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 是否已有 Fix PR | 备注 |
|---|---|---|---|---|
| 🔴 严重 | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) / [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) | **模型回复从上下文意外丢失**——助手回复已持久化但后续请求中缺失，导致 AI 行为错乱、重复陷入 toolcall 死循环。用户标注"非常严重"。 | 部分（#7521 处理上下文折叠，方向相关但未直接闭合） | 需核心架构层面排查持久化/上下文注入一致性。 |
| 🔴 严重 | [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) | **Heartbeat cron session feedback loop**：消息重复堆积，agent 失响应约 2 小时，需人工恢复 | 无 | v2.0.1 至 main 分支均可复现。 |
| 🟠 高 | [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) | 主 Agent 不主动查询子 Agent 状态，需用户询问 | [#7580](https://github.com/agentscope-ai/QwenPaw/issues/7580) 提议 `wait_agent_task` 工具，但无 fix PR | 设计层面问题，需要协议改进。 |
| 🟠 高 | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | 同步调用阻塞事件循环 118–135s，timeout 失效 | 无 | Windows 桌面 2.1.1b1，影响启动与消息发送。 |
| 🟠 高 | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | 任务执行中新消息触发 409 | **有 PR [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577)** | 等待合并。 |
| 🟡 中 | [#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)（已关闭） | 长上下文早期消息彻底丢失 | 无明确 fix | 已关闭，但 #7579/#7584 显示同类问题仍存在，需复盘。 |
| 🟡 中 | [#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513) | DeepSeek 工具调用混用 | 无 | 需流式解析层改进。 |
| 🟡 中 | [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) | DeepSeek scroll 压缩 role=user | 无 | 影响特定模型+压缩策略组合。 |
| 🟡 中 | [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) | Agent"记不住"路径规则，反复遗忘约束 | 无 | 长期记忆/规则遵守问题。 |
| 🟡 中 | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572) | 工具派发层 `_drain` 吞掉异常栈 | **有 PR [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578)** | 等待合并。 |
| 🟡 中 | [#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548)（已关闭） | 导航记录丢失 | 无 | 关闭后建议关注回归。 |
| 🟢 低 | [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585) | Telegram Markdown 表格不渲染 | **有 PR [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590)** | 等待合并。 |
| 🟢 低 | [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587) | WUSRouter Cloudflare 403 | 无 | 需更新 WUSRouter 客户端 UA/headers 兼容性。 |

---

## 6. 功能请求与路线图信号

| Issue | 主题 | 已有对应 PR | 纳入下版本的概率 |
|---|---|---|---|
| [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588) | 恢复 v2.1.0 主工作目录切换 | [#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593) | **极高**——是回归诉求且 PR 已就位。 |
| [#7586](https://github.com/agentscope-ai/QwenPaw/issues/7586) | Telegram 最终回复后清理中间消息 | [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) | **高**——默认关闭，行为兼容，体验改进明显。 |
| [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) | 飞书思考流式卡自动折叠 | [#7591](https://github.com/agentscope-ai/QwenPaw/pull/7591) | **高**——作者已附本地验证。 |
| [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585) | Telegram 表格渲染 | [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) | **高**——fix 已 PR。 |
| [#7580](https://github.com/agentscope-ai/QwenPaw/issues/7580) | `wait_agent_task` 阻塞式工具 | 无 | **中**——与 #7450 同源，建议作为多 Agent 协作路线图的核心能力。 |
| [#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583) | 与 AgentScope 社区联动（登录、信箱、反馈） | 无 | **中**——是生态战略方向，需维护者评估产品优先级。 |
| [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) | 插件商店体验（避免整页刷新、一键更新、变更通知） | 无 | **中**——影响多设备用户运维效率。 |

**路线图信号总结：** 通道体验（Telegram / 飞书）正在成为新版本重点；多 Agent 协作的"自治等待"机制（#7580）若被采纳，将显著补齐主-子 Agent 范式短板；AgentScope 社区联动是中长期战略方向。

---

## 7. 用户反馈摘要

### 真实痛点
- **多 Agent 进度不透明**（#7450）：用户使用"主 agent + 多子 agent"处理复杂任务时，遇到严重问题时长达数小时无动静，必须反复手动询问"进度如何"才能让主 agent 查询子 agent 状态。期望主 agent 应主动巡检。
- **长文档/长上下文任务易崩**（#7447/#7579/#7584）：160 页中文 Word 文档 OCR 校对场景下，早期上下文在手工压缩后仍出现"前几天的记录彻底丢失"，且 #7579/#7584 进一步揭示助手回复持久化后再读时丢失，导致 AI 行为错乱、陷入"工具调用→结果丢失→再次 toolcall"死循环。
- **任务执行中无法追加消息**（#7559）：用户提交文件时遇 409 报错，期望应入队而非拒绝。
- **同步调用冻结 UI**（#7363）：Windows 桌面 2.1.1b1 启动卡 118–135s、发消息卡 126s，timeout 完全失效，用户需等待近 2 分钟。
- **大模型记忆/规则遵守不足**（#7571）：明确"只在 B 路径生成 TODO 文件"等约束，Agent 反复遗忘、违反，跨多日仍复发，用户感到无助。
- **Heartbeat 反馈循环**（#7589）：v2.0.1 至 main 分支可复现的 cron session 消息重复堆积，agent 失响应 2 小时。
- **第三方模型兼容性**（#7513/#6541/#7587）：DeepSeek 工具调用边界识别、scroll 压缩 role 字段、Cloudflare 403 等问题影响 OpenAI-compatible provider 集成。
- **Telegram/飞书 UI 体验**（#7570/#7585/#7586）：流式输出刷屏、Markdown 表格不渲染、思考卡不折叠。

### 使用场景
- **多设备插件管家运维**（#7582）：用户在多台机器安装 QwenPaw，装大量插件，希望统一更新通知。
- **多通道（飞书/Telegram）作为长期 Agent 交互入口**：流式 UI、思考折叠、Markdown 渲染是核心需求。
- **长文档 OCR 校对**（#7447）：160 页 Word 文档的中文处理，对上下文稳定性要求极高。

### 满意度
- 总体偏向**积极但带保留**：核心能力（多 Agent、工具调用）受到肯定，但 v2.2.0 引入的回归（#7588 路径输入缺失、#7450 协作范式问题、#7447 上下文丢失）让一部分用户表达"还不如 v2.1.0"的失望。
- 社区贡献意愿强：今日 5 个 first-time-contributor PR，说明维护者与社区互动相对开放。

---

## 8. 待处理积压

### 长期未响应的重要 Issue（按时间倒序，优先级标注）

| Issue | 标题 | 创建日期 | 已开放天数 | 优先级 |
|---|---|---|---|---|
| [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | 同步调用阻塞事件循环 | 2026-08-27 | 10 天 | 🔴 严重性能/可用性，无 fix PR |
| [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) | DeepSeek scroll 压缩 role=user | 2026-07-29 | 39 天 | 🟠 跨模型兼容性 |
| [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) | 主 agent 不主动查询子 agent 状态 | 2026-09-01 | 6 天 | 🟠 范式问题，但仅 👍0 |
| [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) | 模型回复从上下文丢失 | 2026-09-06 | 1 天 | 🔴 用户明确标注"非常严重" |
| [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) | 严重 ⚠️⚠️ 模型回复意外丢失 | 2026-09-06 | 1 天 | 🔴 与 #7579 同源 |
| [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) | Heartbeat cron 反馈循环 | 2026-09-06 | 1 天 | 🔴 高严重度，main 分支可复现 |

### 维护者关注建议

1. **#7579/#7584 上下文丢失**是当下最严重的稳定性问题，建议成立专项调查（数据库持久化、上下文注入层、scroll 压缩链路），并优先合并 [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) 作为短期缓解。
2. **#7363 事件循环阻塞**已 10 天无 fix，建议评估是否可拆分为同步调用转异步的专项重构。
3. **#7450 多 Agent 进度巡检**与 **#7580 wait_agent_task 工具**形成完整闭环，建议作为下一版本的主打特性推进。
4. **PR 评审积压**：当前 9 个待合并 PR 多数精准对应今日 Issue，建议批量评审以维持社区贡献热情。
5. **PR #2134** 状态存疑（创建 2026-03-23，今日关闭但未明确合并），建议在主干中确认相关 heartbeat timeout 能力是否已落地。

---

*本报告由 CoPaw 项目分析师自动生成。如需补充某条 Issue/PR 的深入分析或历史趋势，请告知。*

:::
