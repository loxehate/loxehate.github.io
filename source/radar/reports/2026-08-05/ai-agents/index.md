---
title: "OpenClaw 生态日报"
date: 2026-08-05
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# OpenClaw 生态日报 2026-08-05

> Issues: 251 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-05 00:35 UTC

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

# OpenClaw 项目动态日报 — 2026-08-05

## 1. 今日速览

过去24小时 OpenClaw 项目保持高度活跃：累计更新 Issue 251 条（其中新开/活跃 234 条，关闭 17 条），PR 更新 500 条（其中合并/关闭 117 条，待合并 383 条），同时发布了 2 个修正版本（v2026.7.1-1、v2026.7.1-2）。从 Issue 分布看，P1 级高优先级问题仍占相当比例（如实时语音状态泄漏、Gateway 主线程饱和、数据库迁移失败等），且大部分处于 `clawsweeper:no-new-fix-pr` 待维护者介入状态。值得留意的是，大量 Issue/PR 已由自动维护机器人 `clawsweeper` 完成初筛与标注，说明项目已建立较成熟的自动化 Issue 分流机制，但 `needs-maintainer-review` 标签的堆积也反映出维护者侧仍存在较重的审查负担。整体来看，项目正处于高频迭代与稳定性加固并行的阶段。

---

## 2. 版本发布

### v2026.7.1-2（最新）
- **修复内容**：修复 npm 插件更新机制——接受新版 npm 客户端产生的单例数组（singleton-array）元数据，确保受追踪的官方插件能够正确安装并更新至修订版本。（PR #108336）
- **破坏性变更**：无
- **迁移注意**：插件相关元数据格式兼容已处理，不需要用户额外操作。

### v2026.7.1-1
- **修复内容**：
  1. **Codex 进度回复**：在已投递进度消息后保持 app-server 回合继续运行，确保 GPT/Codex 能到达权威终态响应，不再中途停止。（issue #106961, #108487，感谢 @joshavant）
  2. **Memory Core 启动修复**：恢复派生的 legacy-index 及相关启动路径（摘要被截断，完整信息待查）。
- **破坏性变更**：无
- **迁移注意**：无特殊说明。

> 两个版本均为修复性小版本，未引入新功能或破坏性变更，建议受相关 bug 影响的用户升级。

---

## 3. 项目进展

今日共有 **117 条 PR 被合并或关闭**，383 条 PR 处于待合并状态。从活跃 PR 来看，以下方向正在持续推进：

| 方向 | 代表 PR | 状态 |
|------|---------|------|
| **Slack 工具评论转义修复** | [#119373 fix(slack): Fix bad escaping in slack tool commentary](https://github.com/openclaw/openclaw/pull/119373) | 待 proof，修复 Slack 中 Markdown 反斜杠显示问题 |
| **OpenRouter 长 TTL 缓存兼容** | [#91237 fix(providers/openrouter): treat OpenRouter as long-TTL-eligible for Anthropic cache_control](https://github.com/openclaw/openclaw/pull/91237) | 待维护者审查，扩大 `cache_control` 1 小时 TTL 适用范围 |
| **CI 发布证据保留** | [#119380 fix(ci): preserve release evidence across reruns](https://github.com/openclaw/openclaw/pull/119380) | 待维护者审查，修复发布检查失败重跑时证据丢失 |
| **xAI 可选能力延迟加载** | [#119374 improve(xai): defer optional capability runtimes](https://github.com/openclaw/openclaw/pull/119374) | 等待作者更新，减少 xAI 插件对启动时间的占用 |
| **TTS 文本结算优化** | [#83988 fix(tts): defer text settlement for final-mode TTS](https://github.com/openclaw/openclaw/pull/83988) | 待 proof，消除 Telegram 最终模式下的文本"抖动" |
| **文件系统安全加固** | [#119363 fix(fs): adopt fs-safe 0.5.2 untrusted filename sanitization](https://github.com/openclaw/openclaw/pull/119363) | 等待作者更新，增强不安全文件名的清洗能力 |
| **执行审计代际感知** | [#116796 fix(audit): keep execution attribution generation-aware](https://github.com/openclaw/openclaw/pull/116796) | 等待作者更新，修复运行 ID 复用导致的审计关联错误 |
| **CLI 会话上下文修复** | [#118796 fix(session): require a real context snapshot for CLI usage](https://github.com/openclaw/openclaw/pull/118796)（自动生成 PR） | 待合并，修复 CLI 会话 token 统计失真 |

整体来看，项目正在围绕 **存储安全、插件体系健壮性、语音/TTS 体验、审计可观测性** 等多个维度推进。自动修复机器人（clawsweeper）也在持续生成小型修复 PR，形成"机器人初筛 + 人工复核"的协作模式。

---

## 4. 社区热点

以下 Issue 在过去 24 小时获得了最高的讨论热度：

### 🔥 #116201 — Realtime voice work can retain unbounded provider and consult state（评论 58 条）
**标签**：P1 / diamond lobster / 影响 session-state  
**链接**：https://github.com/openclaw/openclaw/issues/116201  
**核心诉求**：实时语音会话在慢速/突发场景下会无限保留 provider 与 consult 状态，缺乏硬性资源上限。这是当前讨论最为激烈的问题，58 条评论表明社区对资源泄漏问题的高度关注。暂无 fix PR。

### 🔥 #44925 — Subagent completion silently lost — no retry, no notification（评论 23 条，👍 2）
**标签**：P1 / diamond lobster / 影响 message-loss  
**链接**：https://github.com/openclaw/openclaw/issues/44925  
**核心诉求**：子代理任务完成后可能静默丢失结果——无重试、无通知、无自动重启。该问题自 2026-03-13 提出至今已近 5 个月，仍处于 `needs-maintainer-review`，社区持续关注。

### 🔥 #48788 — Centralized filename encoding utility（评论 20 条）
**标签**：P3 / platinum hermit / 跨端文件名编码  
**链接**：https://github.com/openclaw/openclaw/issues/48788  
**核心诉求**：需要一个集中式文件名编码工具，处理多编码（Shift-JIS、EUC-KR、GB18030 等）下的 Content-Disposition 解析，解决飞书中文文件名乱码问题。讨论热度高，说明多字节编码问题在社区中有广泛困扰。

### 🔥 #118846 — Gateway main thread saturated from boot（评论 15 条）
**标签**：P1 / silver shellfish / 影响 crash-loop  
**链接**：https://github.com/openclaw/openclaw/issues/118846  
**核心诉求**：Docker 环境下 Gateway 主线程从启动起即被插件元数据快照和文件系统 stat 操作占满，导致本地 RPC 在 `ws_upgrade` 时以 1006 断连。P1 + crash-loop 的组合使该问题具有较高紧迫度。

### 其他高热度讨论
- [#115908](https://github.com/openclaw/openclaw/issues/115908)（评论 12）：会话记录投影在持续写入下可能 livelock，阻塞主线程导致所有通道传输停滞（P1）。
- [#45758](https://github.com/openclaw/openclaw/issues/45758)（评论 9，👍 2）：请求支持 YAML 配置文件格式，社区对配置文件可读性的需求持续存在。
- [#42840](https://github.com/openclaw/openclaw/issues/42840)（评论 9，👍 10）：请求 Control UI 支持 MathJax/LaTeX 渲染，👍 数最高，技术类用户对数学公式显示的需求强烈。

---

## 5. Bug 与稳定性

### 🔴 P1 级（严重，需优先关注）

| Issue | 描述 | 是否已有 Fix PR |
|-------|------|----------------|
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | Realtime voice 状态无限增长，缺乏硬性资源上限 | 否（`no-new-fix-pr`） |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成结果静默丢失，无重试/通知/自动重启（已存活近 5 个月） | 否 |
| [#118846](https://github.com/openclaw/openclaw/issues/118846) | Gateway 主线程从启动即被插件元数据快照占满，本地 RPC 断连 | 否 |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | 会话 transcript 投影在持续写入下 livelock，阻塞主线程 | 否 |
| [#111498](https://github.com/openclaw/openclaw/issues/111498) | Anthropic 认证恢复后，workspace-state 迁移阻塞主代理（回归） | 否 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool 子进程泄漏，zombie 累积导致运行时恶化（回归） | 否 |
| [#119263](https://github.com/openclaw/openclaw/issues/119263) | Agent DB v14→v15 迁移失败（`no such column: entry_valid`），Gateway 拒绝启动 | **是**（`linked-pr-open`） |
| [#107873](https://github.com/openclaw/openclaw/issues/107873) | 嵌入式 prompt-lock 会话接管中止 WebChat 回合，未重试（回归） | 否 |
| [#115700](https://github.com/openclaw/openclaw/issues/115700) | 模型完成后 `chat.send` 被拒（"thread switched branches"），stale leaf ID | **是**（`linked-pr-open`） |
| [#114653](https://github.com/openclaw/openclaw/issues/114653) | `sessions_send` 的临时失败与策略拒绝不可区分（安全边界模糊） | 否 |

### 🟡 P2 级（中等）

| Issue | 描述 | 是否已有 Fix PR |
|-------|------|----------------|
| [#116010](https://github.com/openclaw/openclaw/issues/116010) | 所有持久会话被硬编码限制为 128k 上下文，无视模型能力 | **是**（`linked-pr-open`） |
| [#90595](https://github.com/openclaw/openclaw/issues/90595) | Cron 失败通知在热重载/重试期间重复触发，造成告警疲劳 | 否 |
| [#107873](https://github.com/openclaw/openclaw/issues/107873) | 工具失败后 WebChat 回合中止而非重试 | 否 |
| [#116893](https://github.com/openclaw/openclaw/issues/116893) | 浏览器 click 创建的标签页未被跟踪/清理 | 否 |
| [#118018](https://github.com/openclaw/openclaw/issues/118018) | 过期子代理完成通知被投递到错误的 requester 生命周期 | **是**（`linked-pr-open`） |
| [#92769](https://github.com/openclaw/openclaw/issues/92769) | MiniMax M3 经 OpenRouter `:floor` 路由时 reasoning 字段丢失 | 否 |
| [#58139](https://github.com/openclaw/openclaw/issues/58139) | memory-lancedb 插件在 Windows Docker 绑定挂载下失败 | 否 |

### 🟢 其他值得关注
- [#116116](https://github.com/openclaw/openclaw/issues/116116)：生成的 anthropic `catalog.json` 违反自身 schema，导致所有 `openclaw models` 命令崩溃（P2，`linked-pr-open`）。
- [#118560](https://github.com/openclaw/openclaw/issues/118560)：WebChat canvas 在主会话重置后隐藏早期消息（P2，`fix-shape-clear` + `queueable-fix`，已具备修复条件）。

---

## 6. 功能请求与路线图信号

以下功能请求在过去 24 小时收到较多关注，或被标记为路线图候选：

| 功能请求 | Issue/PR | 热度/进展 | 可能纳入版本判断 |
|----------|----------|-----------|------------------|
| **集中式文件名编码工具**（多编码 Content-Disposition） | [#48788](https://github.com/openclaw/openclaw/issues/48788) | 评论 20，platinum hermit | 已有 PR #48578 修复最基础 UTF-8/Latin-1 场景，架构级方案可能进入后续版本 |
| **YAML 配置文件支持** | [#45758](https://github.com/openclaw/openclaw/issues/45758) | 👍 2 | 社区需求稳定，但未见明确 PR，短期可能不会排入 |
| **Control UI MathJax/LaTeX 渲染** | [#42840](https://github.com/openclaw/openclaw/issues/42840) | 👍 10（本期最高） | 用户呼声高，技术门槛低，预计中小型 PR 即可实现 |
| **WebChat 自托管 STT/TTS 支持** | [#45508](https://github.com/openclaw/openclaw/issues/45508) | 👍 2，diamond lobster | 涉及架构调整（网关代理语音），预计中远期 |
| **Heading-aware 记忆分块 + 实体提取** | [#44395](https://github.com/openclaw/openclaw/issues/44395) | 👍 2 | 增强记忆精度，与现有 memory 重构方向一致 |
| **内容级 Prompt 注入扫描** | [#79168](https://github.com/openclaw/openclaw/issues/79168) | 需安全审查 | 安全相关，可能被列为高优先级路线图 |
| **Compaction/summaryModel 回退链** | [#56781](https://github.com/openclaw/openclaw/issues/56781) | 评论 5 | 与稳定性强相关，可能纳入近期计划 |
| **CommitmentsConfig 可选 model 覆盖** | [#80752](https://github.com/openclaw/openclaw/issues/80752) | 👍 2 | 已有其他 config 的 model override 先例，模式可复用 |
| **原生 session TTL / 最大生命周期** | [#45390](https://github.com/openclaw/openclaw/issues/45390) | 评论 5 | 直接解决会话无限增长问题，可能与 #116010 的修复合并考量 |
| **Pace-aware 速率限制** | [#45771](https://github.com/openclaw/openclaw/issues/45771) | 评论 5 | 解决 LLM 限流，但实现成本较高 |
| **Pioneer.ai 提供商接入** | [#97566](https://github.com/openclaw/openclaw/pull/97566) | PR 待 proof | 新提供商接入，若完成 QA 可能进入 2026.7.x |
| **/new 与 /reset 增加确认步骤** | [#45564](https://github.com/openclaw/openclaw/issues/45564) | 评论 5 | 防误触，UI 小改动，可能快速落地 |

---

## 7. 用户反馈摘要

### 😤 痛点：静默失败与状态丢失
- [#44925](https://github.com/openclaw/openclaw/issues/44925) 用户 @IIIyban 描述：子代理完成通知失败、超时等模式会导致结果**静默丢失**，无重试、无通知。这种"错误不透明"的体验在自动化场景中尤为致命。
- [#107873](https://github.com/openclaw/openclaw/issues/107873) 用户 @Carcamo-ben 反馈：WebChat 在工具失败后直接中止回合而不会重试，用户需要手动重新输入。

### 😤 痛点：性能退化与资源占用
- [#118846](https://github.com/openclaw/openclaw/issues/118846) 用户 @islandpreneur007 实测数据：Gateway 主线程从进程启动起持续 100% CPU 占用，插件元数据快照是主要元凶。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) 用户 @avp717 反馈：长时间运行后 zombie 子进程累积导致整体性能下降。

### 🙂 正向反馈
- 多用户（如 @winston）对自动修复机器人 `clawsweeper` 的介入表示认可——生成的 PR（如 #118796、#118751）能在无需大量人工介入的情况下定位并修复问题。
- 用户 @Bartok9 在 PR #91237 中主动提交了 OpenRouter 长 TTL 缓存兼容修复，说明社区开发者愿意贡献代码解决实际使用中的成本/性能问题。
- 用户 @alex-xuweilong 在 #48788 中不仅报告了问题，还给出了完整的架构级解决方案建议（集中式编码工具），体现了高质量用户反馈。

### 🤔 争议/困惑
- [#43567](https://github.com/openclaw/openclaw/issues/43567) 用户 @prw760 反馈：系统内部消息（如"Pre-compaction memory flush"）有时会以普通用户消息的形式出现在对话流中，造成认知混乱。
- [#92769](https://github.com/openclaw/openclaw/issues/92769) 用户 @Wizongod 在跟进中澄清了问题的真正根因（OpenRouter `:floor` 路由后缀），提醒社区在报告问题是需要做更深入的原因定位。

---

## 8. 待处理积压

以下为长期未响应或处于停滞状态的重要 Issue/PR，建议维护者优先关注：

### ⚠️ 长期未关闭的高优 Issue（P1，已存活 >30 天）

| Issue | 创建时间 | 存活天数 | 问题 |
|-------|----------|----------|------|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 2026-03-13 | ~145 天 | 子代理结果静默丢失，P1，无 fix PR |
| [#111498](https://github.com/openclaw/openclaw/issues/111498) | 2026-07-19 | ~17 天 | Anthropic 认证恢复后 workspace-state 迁移阻塞（回归，P1，`recovery-stuck`） |
| [#108215](https://github.com/openclaw/openclaw/issues/108215) | 2026-07-15 | ~21 天 | 上下文用量从 57% 骤降至 13%，未压缩却丢失内容（P1） |
| [#107873](https://github.com/openclaw/openclaw/issues/107873) | 2026-07-15 | ~21 天 | 嵌入式 prompt-lock 会话接管中止 WebChat 回合（P1，回归） |

### ⚠️ 长期未合入的 PR（已存在 >60 天）

| PR | 创建时间 | 领域 |
|----|----------|------|
| [#81818 fix(skills): bound installer downloads](https://github.com/openclaw/openclaw/pull/81818) | 2026-05-14 | 技能安装器下载无限制，存在写入风险（diamond lobster，待维护者查看） |
| [#81208 fix(amazon-bedrock-mantle): dedupe IAM token-failure diagnostic](https://github.com/openclaw/openclaw/pull/81208) | 2026-05-12 | Bedrock 无凭证环境下日志刷屏（diamond lobster，待维护者查看） |
| [#91237 fix(providers/openrouter): long-TTL cache eligibility](https://github.com/openclaw/openclaw/pull/91237) | 2026-06-07 | OpenRouter 缓存 TTL 兼容（platinum hermit，待维护者查看） |
| [#91268 fix: doctor misreports trusted-proxy gateways](https://github.com/openclaw/openclaw/pull/91268) | 2026-06-07 | `openclaw doctor` 误报 trusted-proxy 为未认证（待维护者查看） |

### ⚠️ `clawsweeper` 标记需人工决策的堆积
大量 Issue 被标记为 `clawsweeper:needs-product-decision`（如 #48788、#45758、#42840、#45508、#44395 等），意味着产品方向需要明确。若长期不决策，这些功能请求将不断积压。建议维护者定期批量清理，明确"做 / 不做 / 延后"。

---

> **总结**：OpenClaw 在过去 24 小时保持了极高的社区活跃度，修复版本持续迭代，自动修复机器人有效分担了部分维护工作。但 P1 级问题存量较多且部分存在时间较长（如 #44925 已近 5 个月），维护者侧的 `needs-maintainer-review` 积压是当前最大的流程瓶颈。建议下一步优先处理：(1) 带 `linked-pr-open` 的 P1 问题（#119263、#115700、#118018），尽快合并对应修复；(2) 对 `needs-product-decision` 的长期 Issue 做一次集中批量决策；(3) 关注社区高赞需求（如 #42840 LaTeX 渲染）以提升用户满意度。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期**：2026-08-05  
**数据窗口**：过去 24 小时（2026-08-04 ~ 2026-08-05）  
**覆盖项目**：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw（9 个仓库）

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**从"聊天机器人"向"生产级 Agent 平台"跃迁的关键阶段**。9 个核心项目中 6 个保持高度活跃，单日 PR 更新总量超过 800 条，但"功能迭代速度"与"稳定性债务"之间的矛盾已全面显现：P1 级 Bug 积压（OpenClaw 近 10 个）、安全漏洞悬置（NanoBot API 密钥泄漏 30 天无修复、Zeroclaw webhook 未鉴权、LobsterAI agent 泄漏 model key 达 4 个月）等问题在多个项目中同时存在。值得注意的是，多个项目已开始引入**自动化维护机器人**（如 OpenClaw 的 clawsweeper）和**架构级治理手段**（如 IronClaw 的 stacked PR + 破坏性测试门禁），说明生态正从"野蛮生长"转向"工程化成熟"。共同的技术收敛方向高度清晰：记忆可靠性、上下文/成本优化、渠道统一抽象、工具/权限安全，以及多模型提供商兼容。

---

## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃 / 关闭） | PRs（合并/关闭 / 待合并） | Release | 健康度评估 |
|------|--------------------------|--------------------------|---------|------------|
| **OpenClaw** | 251（234 / 17） | 500（117 / 383） | v2026.7.1-1、v2026.7.1-2 | 🟢 高度活跃，迭代与加固并行；P1 积压较重，`needs-maintainer-review` 堆积 |
| **NanoBot** | 5（4 / 1） | 28（19 / 9） | 无 | 🟢 响应快（Opus 5 当日修复闭）；⚠️ 安全 Issue #4784 已开放 30 天无 PR |
| **Zeroclaw** | 11（9 / 2） | 50（2 / 48） | 无 | 🟡 密集开发但合并率仅 4%，大量 PR 卡 `needs-author-action`；P0 webhook 安全 Bug 在途 |
| **PicoClaw** | 2（2 / 0） | 2 新增待合并，另有 2 条旧 PR 被 stale 关闭 | 无 | 🟡 外部贡献积极但维护响应慢，修复型 PR 被机器人自动关闭；MCP 挂起 Bug 无修复 |
| **NanoClaw** | 0（0 / 0） | 5（1 / 4） | 无 | 🟡 核心库稳定，PR 评审积压严重（最长 22 天）；Discord 审批阻断 Bug 待合入 |
| **IronClaw** | 10（9 / 1） | 50（16 / 34） | 无（1.1.0-rc.1 前） | 🟢 架构治理强度高，Waves 0–4 系列密集合入；34 条待合并 PR 评审压力大 |
| **LobsterAI** | 1（1 / 0） | 13（10 / 3） | 2026.8.3（经 #2430 合入） | 🟢 发布后集中收尾、迭代节奏好；⚠️ 高危安全 Issue #1202 已 stale 4 个月 |
| **Moltis** | 0（0 / 0） | 1（0 / 1） | 无 | ⚪ 低活跃维护期，仅 Dependabot 依赖更新，无社区讨论 |
| **CoPaw** | 19（13 / 6） | 49（21 / 28） | 无 | 🟢 高活跃，时间戳问题多 PR 闭环、CI 补强；⚠️ Windows 回归与微信通道双 Bug 均无 fix PR |

> **说明**：健康度综合考量活跃度、Bug 响应速度、合并效率、安全积压。🟢=整体健康，🟡=存在瓶颈，⚪=低活跃维护期。

---

## 3. OpenClaw 在生态中的定位

### 3.1 规模绝对领先，是生态的"参照系"

OpenClaw 单日 PR 更新量（500 条）是其余 8 个项目总和的约 60%，Issue 量（251 条）是 CoPaw（第二名，19 条）的 13 倍。社区规模、问题复杂度、场景覆盖面均不在同一量级。其 `clawsweeper` 自动化 Issue 分流机制是当前生态中最成熟的机器人维护实践。

### 3.2 全栈覆盖 vs 垂直深耕

| 维度 | OpenClaw | 垂直型项目（Zeroclaw/IronClaw/CoPaw 等） |
|------|----------|---------------------------------------------|
| 技术栈 | 全功能单体：语音、TTS、存储、插件、审计、Gateway、多提供商 | 聚焦特定方向：权限分层（Zeroclaw）、架构治理（IronClaw）、渠道稳定性（CoPaw） |
| 迭代模式 | 高频发布（24h 内 2 个修复版），自动化机器人承担初筛 | 无发布或发布会话制，依赖人工 review |
| 社区结构 | 大规模外部贡献者 + 自动机器人 + 专职维护团队 | 小团队 + first-time-contributor 为主 |

### 3.3 技术路线差异

OpenClaw 走**"平台化 + 插件生态"**路线（npm 插件、官方插件追踪、长 TTL 缓存优化），而 IronClaw 走**"架构治理 + WASM 沙箱"**路线、Zeroclaw 走**"生产化安全"**路线（全工具权限分层、Goal Mode）。OpenClaw 的弱点恰在 P1 高优问题存量多、`needs-maintainer-review` 堆积——规模带来的审查瓶颈是其主要风险。

### 3.4 社区规模对比

OpenClaw 的 Issue/PR 绝对量级（数百）与垂直项目的个位数/数十位形成强烈反差，但垂直项目在**特定场景的打磨深度**上正在形成差异化竞争力。生态整体呈现"一超多强"格局：OpenClaw 定标准，垂直项目找缝隙。

---

## 4. 共同关注的技术方向

以下需求在多个项目中独立涌现，具有生态级共性：

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|----------|----------|
| **记忆与上下文管理** | OpenClaw（#116201 实时语音状态无限增长、#44395 记忆分块+实体提取）、IronClaw（#7185 跨对话记忆不可靠）、CoPaw（#6649 prompt caching、#6624 自动压缩不触发记忆流程）、Zeroclaw（#9504 上下文耗尽静默空转、#9713 裁剪 token 核算） | 会话状态需硬性资源上限；记忆召回需可靠且可观测；上下文裁剪需要透明的 token 核算；自动压缩与手动行为需语义一致 |
| **API 密钥与安全隔离** | NanoBot（#4784 密钥写入全局 `os.environ` 导致跨 Provider 污染）、LobsterAI（#1202 Agent 诱导泄漏 model key）、Zeroclaw（#9565 webhook 不验签不 fail-closed）、OpenClaw（#114653 临时失败与策略拒绝边界模糊） | 多 Provider 密钥隔离；Agent 对凭证的默认拒绝策略；webhook 入站必须强制鉴权；安全边界在代码层面显式化 |
| **渠道统一与 IM 稳定性** | CoPaw（#6695 微信审批无法触达、#6696 typing indicator 吞 token）、NanoClaw（#3185 Discord 审批按钮全解析失败）、Zeroclaw（#9756 Telegram 多配对码困惑）、PicoClaw（#3269 MCP 失败挂起聊天）、OpenClaw（#48788 飞书中文文件名乱码、Slack 转义 Bug） | 渠道适配器需统一错误与重试契约；审批/通知类交互在 IM 端必须可用；文件名多编码处理需集中式方案 |
| **MCP / 工具调用可靠性** | PicoClaw（#3269 MCP 连接失败致 agent loop 挂死）、NanoBot（#5237 MCP 业务错误信封被当作成功、空转至超时） | 外部工具故障需快速失败与降级；业务错误与协议错误的语义区分应在工具调用层统一建模 |
| **模型提供商兼容性** | NanoBot（#5235 Opus 5 温度参数被弃用，当日修复）、OpenClaw（#91237 OpenRouter 长 TTL、#92769 MiniMax reasoning 丢失）、CoPaw（#6667 DeepSeek 多轮 thinking 丢失）、Zeroclaw（#9757 Anthropic 工具图片嵌套块） | 提供商适配层需随模型迭代快速演进；thinking/reasoning 内容需要稳定的传递协议；缓存参数需兼容各端点差异 |
| **自动化与生态治理** | OpenClaw（clawsweeper 分流）、PicoClaw / LobsterAI（stale bot 自动关闭）、IronClaw（CI 门禁破坏性测试）、Moltis / LobsterAI（Dependabot 依赖更新） | 机器人协作从"初筛标注"走向"自动修复 + 强制门禁"；但 stale 误伤（PicoClaw 两条修复 PR 被关）需人工干预兜底 |
| **成本可观测性** | PicoClaw（#3251/#3317 缓存 token 调试输出）、OpenClaw（#83988 TTS 文本结算、#91237 缓存 TTL）、IronClaw（#7001 保持缓存前缀字节级稳定）、CoPaw（#6649 prompt caching 参数） | 用户对 token 消耗、缓存命中、裁剪归因的透明化需求已成刚需；成本控制从"黑盒"走向"可诊断" |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构差异 |
|------|----------|----------|--------------|
| **OpenClaw** | 全功能个人 AI 助手平台：语音/TTS、插件体系、多提供商、WebChat/Control UI、审计 | 个人开发者、进阶用户、插件作者 | 单体 + 插件市场；自动化机器人（clawsweeper）深度参与协作；npm 插件追踪机制 |
| **NanoBot** | 轻量级多渠道助手 + WebUI 现代化：MCP 工具、自动化、命令系统、渠道适配 | 快速部署的团队/个人、IM bot 用户 | 单二进制；WebUI 深度打磨（Vite HMR、浮动控件）；Anthropic/OpenAI 兼容优先 |
| **Zeroclaw** | 生产化 Agent 平台：Goal Mode、权限分层（Deny/Ask/Allow）、eval 测试体系、安全审计 | 需要可审计、可管控 Agent 的企业团队 | 全工具统一权限层（Claude Code 式）；RFC 驱动设计；eval 工具链三件套（CI 门禁 + live 模式 + pass@k） |
| **PicoClaw** | 嵌入式/轻量 Agent 运行时：Web 搜索 provider、MCP 扩展 | 嵌入式设备（Sipeed）、轻量部署场景 | 外部贡献驱动；Web 搜索多引擎抽象；与硬件生态绑定（Sipeed） |
| **NanoClaw** | 渠道连接器优先：Dial（SMS + AI 语音）、Discord、Telegram、Web 审批 | 需要多渠道触达 + 人工审批流的中小型组织 | 渠道适配器 + wizard 安装向导；`custom_id` 解析这类细节导向的渠道兼容；skill-owned capabilities 宿主接缝 |
| **IronClaw** | 企业级 Agent 基础架构：WASM 沙箱、可自建/自寻/自选技能（v1.1.0 Epic）、交付链路完整性 | 大规模部署、需要强治理与安全隔离的企业 | Waves 架构迁移（层边界门禁、inventory keying）；stacked PR 小步验证；CI 强制破坏性测试 |
| **LobsterAI** | 桌面端 AI 应用：登录/积分体系、Artifact 预览、Windows 安装器、模型错误分类 | 中国桌面用户、需要 GUI 的普通用户 | Electron 桌面壳；集成"积分活动"等产品化运营模块；React 19 / Headless UI 技术栈同步 |
| **Moltis** | 处于维护期的独立项目 | 小规模爱好者 | 核心库静默，仅 Dependabot 活跃，无社区讨论 |
| **CoPaw** | 多渠道 IM + 桌面 Agent：微信/Matrix/Telegram 深度适配、OpenAI 兼容层、集成测试 | 中国 IM 用户、开发 Agent 产品的研究者/团队 | AgentScope 后端 + 自研桌面壳；前端时间戳全链路时区感知；专门为微信 iLink 做了 context_token 生命周期管理 |

---

## 6. 社区热度与成熟度

### 6.1 活跃度分层

| 层级 | 项目 | 日 PR 量级 | 阶段特征 |
|------|------|-----------|----------|
| **T1：快速迭代** | OpenClaw、IronClaw、CoPaw、Zeroclaw | 49–500 条 | 高频提交，功能/修复并行；伴随 P1/P0 级 Bug 在途（OpenClaw 10 个 P1、Zeroclaw 1 个 P0、CoPaw 3 个高优无 PR） |
| **T2：稳步推进** | NanoBot、LobsterAI | 13–28 条 | 节奏可控，NanoBot 修复闭环快、LobsterAI 处于版本发布后收尾；均有安全积压（30 天 / 4 个月） |
| **T3：维护/低活跃** | PicoClaw、NanoClaw、Moltis | 0–5 条 | 依赖外部贡献或自动化流程维持；PicoClaw/NanoClaw 各有 1 个严重 Bug 无修复，Moltis 几乎静默 |

### 6.2 质量巩固 vs 功能扩张

- **明确处于质量巩固阶段的项目**：**IronClaw**（Waves 0–4 架构迁移 + CI 门禁破坏性测试，治理方法论最成熟）、**CoPaw**（时间戳时区问题从后端到前端 3 PR 系统性闭环）、**OpenClaw**（2 个修复性小版本密集发布，但 P1 存量仍高）。
- **仍以功能扩张为主的项目**：**Zeroclaw**（3 个架构级 RFC 同时讨论）、**PicoClaw**（新增 Exa Web Search provider）、**NanoClaw**（Dial 新渠道等待合入）。
- **值得警惕的成熟度信号**：
  - OpenClaw `needs-maintainer-review` 标签堆积 → 社区产出 > 维护者吞吐；
  - Zeroclaw 48 条待合并 PR 中 12 条 `needs-author-action` → 贡献者响应速度成为瓶颈；
  - PicoClaw 2 条有效修复 PR 被 stale bot 自动关闭 → 低活跃项目需调整机器人策略，避免误伤。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 从"对话工具"走向"生产参与者"
Zeroclaw 的 Goal Mode（跨多轮持久化推进用户目标）、IronClaw 的自动化 run-now 能力（#7193）、NanoClaw 的人工审批流、CoPaw 的微信审批触达诉求，都在指向同一个方向：**Agent 正在被放入真实业务流程中，承担有状态、可追溯、需审批的关键任务**。对开发者的参考价值：设计 Agent 架构时，需要将"持久化目标状态""人工审批中断/恢复""操作审计"作为一等公民，而非事后追加。

### 7.2 记忆可靠性成为"生死线"
IronClaw 多位测试者独立报告跨对话记忆丢失（#7185），OpenClaw 的子代理结果静默丢失（#44925，存活 145 天）至今无修复，CoPaw 用户对自动压缩与手动行为不一致感到困惑（#6624）。**记忆不可靠直接摧毁用户对 Agent 的信任**，其优先级应高于新功能开发。参考价值：记忆系统的可观测性（哪些内容被记住/被裁剪/为什么丢失）与可靠性同等重要，Zeroclaw 的裁剪 token 核算（#9713）是正确方向。

### 7.3 成本透明化需求集中爆发
PicoClaw 提交缓存 token 调试输出 PR、OpenClaw 扩大缓存 TTL 适用面、IronClaw 保持缓存前缀字节级稳定、CoPaw 用户请求 prompt caching 参数支持——**"我的 token 花在哪了"已成为用户的核心追问**。参考价值：模型调用层应默认内置成本/缓存/裁剪的诊断信息导出机制，而非依赖用户逆向分析日志。

### 7.4 安全不再只是"最好有"，而是"必须有"
NanoBot 密钥全局污染、Zeroclaw webhook 未鉴权（P0）、LobsterAI Agent 主动泄漏 model key、OpenClaw 安全边界模糊（#114653），**安全漏洞呈现"跨层分布"：环境变量层、网络入口层、Agent 行为层同时失守**。参考价值：Agent 安全需要纵深防御，尤其在提示词层面，Model 应被默认注入凭证保密指令（LobsterAI #1202 的教训），并且这一层不能依赖模型自觉。

### 7.5 渠道碎片化：统一抽象是刚需
仅本次日报涉及的 IM/非 IM 渠道就包括：微信、Discord、Telegram、Matrix、飞书、Slack、WhatsApp、Linq、WATI、邮件、短信、AI 语音、WebChat。每个渠道都有各自的 token 生命周期、文件名编码、消息格式、webhook 鉴权要求。**渠道适配器的工程质量（而非数量）正成为 Agent 产品能否落地 IM 场景的胜负手**。参考价值：渠道层应抽象出统一的"消息/事件/文件/审批"语义模型，并将错误重试契约内建到 SDK 中。

### 7.6 自动化维护机器人重塑开源协作
OpenClaw 的 clawsweeper 已能自动修复小问题、NanoBot 对 Opus 5 兼容作出当日修复闭环、IronClaw 用 CI 门禁保证架构迁移不回归，但 PicoClaw 的 stale bot 误关有效 PR 也表明：**机器人策略需要"人工兜底 + 可申诉机制"**。参考价值：开源项目引入自动化维护时，应设置"恢复通道"（如被关 PR 可一键 reopen 并通知维护者），避免自动化流程伤害贡献者积极性。

### 7.7 跨项目启示：合并队列即瓶颈
9 个项目中 6 个存在明显的 PR 评审积压（OpenClaw 383 条待合并、Zeroclaw 48 条、IronClaw 34 条、CoPaw 28 条、NanoBot 9 条、NanoClaw 4 条）。**"上游合并速度"正成为限制生态整体产能的单一瓶颈**。参考价值：维护者应优先批量处理"低风险 + 有测试覆盖"的 PR（如依赖更新、文档、单点修复），将稀缺的 review 精力集中在架构级变更上；同时为 P0/P1 安全类 PR 设置明确的 SLO（如 72 小时内首次响应），避免类似 NanoBot #4784（30 天）和 LobsterAI #1202（4 个月）的长期悬置。

---

**结论**：生态处于"规模扩张 → 工程化成熟"的转型期。OpenClaw 以绝对体量定义平台级基准，IronClaw/Zeroclaw 在架构与安全方向提供方法论，CoPaw/NanoBot 在渠道与模型兼容性上快速响应。短期内各项目的核心矛盾高度一致——**如何在海量功能需求与有限的 review/修复资源之间建立可持续的治理机制**。一个已明确但尚未被系统性解决的问题是**跨项目安全缺陷的模式复用**（密钥隔离、webhook 鉴权、Agent 泄密防护），这可能是社区协作的下一个最佳切入点。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-05

## 1. 今日速览

过去 24 小时 NanoBot 项目保持高度活跃：共处理 5 条 Issue（其中 1 条已关闭）和 28 条 PR（19 条已合并/关闭，9 条待合并），但无新版本发布。项目核心工作集中在 WebUI 体验打磨与 Anthropic Opus 5 兼容性修复上，其中 Opus 5 配置被拒的 Bug 已在当天完成修复闭环（#5235 → #5236）。值得警惕的是，一个涉及 Provider API 密钥全局泄漏的安全 Issue（#4784）仍处于开放状态，已持续近一个月，需维护团队重点关注。整体来看，项目迭代节奏快、社区贡献活跃，但安全类积压问题与 PR 合并积压（9 条待合并）是当前健康度的主要减分项。

---

## 2. 版本发布

**今日无新版本发布。**

---

## 3. 项目进展

今日共有 **19 条 PR 被合并/关闭**，主要集中在以下方向：

### 3.1 Anthropic Opus 5 支持（p1）
- **#5236 fix(anthropic): support Opus 5 effort controls** — 修复 Opus 5 因温度参数被弃用导致请求被 API 拒绝的问题。方案是用模型族版本阈值替代硬编码排除列表，为自适应模型发送 `output_config.effort` 参数，同时保留旧模型的 `budget_tokens` 行为。[PR #5236](https://github.com/HKUDS/nanobot/pull/5236)

### 3.2 WebUI 全面优化（7 条）
- **#5239 feat(webui): add integrated Vite dev mode**（p1）— 新增 `nanobot webui --dev` 一条命令启动网关和 Vite dev server，支持 HMR，大幅降低贡献者前端开发门槛。[PR #5239](https://github.com/HKUDS/nanobot/pull/5239)
- **#5244 fix(webui): render markdown in prompt rail previews** — 悬停预览中的助手回答现按 Markdown 渲染。[PR #5244](https://github.com/HKUDS/nanobot/pull/5244)
- **#5240 refactor(webui): unify floating controls** — 统一浮动控件的样式与交互语义。[PR #5240](https://github.com/HKUDS/nanobot/pull/5240)
- **#5241 fix(webui): refine inline token highlights** — 统一内联命令/提及/技能高亮样式。[PR #5241](https://github.com/HKUDS/nanobot/pull/5241)
- **#5243 fix(webui): align automation metadata with timestamps** — 自动化触发标记移至消息底部并与时间戳对齐。[PR #5243](https://github.com/HKUDS/nanobot/pull/5243)
- **#5245 fix(webui): align timestamp tooltip styles** — 统一时间戳 tooltip 样式。[PR #5245](https://github.com/HKUDS/nanobot/pull/5245)

### 3.3 命令系统增强
- **#5242 fix(commands): reject malformed slash commands** — 不再将未注册的斜杠命令转发给 LLM，并给出最接近的已注册命令建议。[PR #5242](https://github.com/HKUDS/nanobot/pull/5242)

### 3.4 渠道修复
- **#5223 fix(wecom): fall back when filename sanitization strips everything** — 修复 WeCom 文件名清洗后为空字符串导致写入目录本身的问题。[PR #5223](https://github.com/HKUDS/nanobot/pull/5223)
- **#5222 fix(telegram): keep fenced code intact when language has special chars** — 修复 `c++`、`objective-c` 等含特殊字符语言标签的代码块在 Telegram 中被截断的问题。[PR #5222](https://github.com/HKUDS/nanobot/pull/5222)
- **#1776 fix(telegram): add group_mode config field to TelegramConfig** — 补上 TelegramConfig 缺失的 `group_mode` 字段，此前该配置会被静默忽略（存在冲突标签，请注意核对）。[PR #1776](https://github.com/HKUDS/nanobot/pull/1776)

### 3.5 安全与部署
- **#5210 feat(webui): support trusted proxy bootstrap auth**（p1）— 为 Cloudflare Tunnel 等场景增加可信代理认证路径，支持 IPv4/IPv6 CIDR 白名单。[PR #5210](https://github.com/HKUDS/nanobot/pull/5210)

> 评估：项目在 WebUI 现代化、AI 模型兼容适配、渠道健壮性三条线上均有实质推进，特别是 Opus 5 修复当日闭环，体现了较高的响应效率。

---

## 4. 社区热点

> 注：PR 数据未提供评论数，以下分析基于 Issue 评论量与开放时长。

### 4.1 #4784 — Provider API 密钥全局泄漏（安全热点，开放 30 天，2 条评论）
[Issue #4784](https://github.com/HKUDS/nanobot/issues/4784) 指出 `OpenAICompatProvider._setup_env()` 将 Provider API 密钥直接写入进程全局 `os.environ`，导致不同 Provider 之间密钥互相覆盖。这是一个**跨 Provider 污染的架构级问题**，已开放近一个月仍无对应修复 PR，建议维护团队优先处理。

### 4.2 #5237 — MCP 工具超时误判（新开 Bug，1 条评论）
[Issue #5237](https://github.com/HKUDS/nanobot/issues/5237) 反馈 MCP 服务器返回业务错误信封（`{"code": 404, "msg": "data not exist"}`，`isError = False`）时，agent 将其视为成功调用并持续等待直至 `tool_timeout` 触发，且超时后仍无法识别真实原因。该问题会直接影响使用 MCP 的业务可靠性，社区关注度高。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue / PR | 问题描述 | 修复状态 |
|--------|-----------|---------|---------|
| 🔴 高 | [#4784](https://github.com/HKUDS/nanobot/issues/4784) | Provider API 密钥通过全局 `os.environ` 在 Provider 间泄漏/覆盖 | ❌ 无 PR，开放 30 天 |
| 🟠 中高 | [#5237](https://github.com/HKUDS/nanobot/issues/5237) | MCP 返回业务错误信封时 agent 无法识别失败，空转至超时 | ❌ 无 PR，新开 |
| 🟠 中高 | [#5238](https://github.com/HKUDS/nanobot/pull/5238) | 移除 request-scoped 访问授权层（#5211 引入），属回归修复，p1 优先级 | 🟡 待合并 |
| 🟡 中 | [#5235](https://github.com/HKUDS/nanobot/issues/5235) | Anthropic Opus 5 因温度参数被弃用导致配置被 API 拒绝 | ✅ 已由 [#5236](https://github.com/HKUDS/nanobot/pull/5236) 修复 |
| 🟡 中 | [#5156](https://github.com/HKUDS/nanobot/pull/5156) | Telegram 轮询在瞬时网络故障后静默停止，无日志无恢复（对应 #5171） | 🟡 待合并（开放 7 天） |
| 🟢 低 | [#5247](https://github.com/HKUDS/nanobot/issues/5247) | Matrix 机器人被邀请时不自动入房（Continuwuity 拒绝空 POST body） | 🟡 已有 [#5248](https://github.com/HKUDS/nanobot/pull/5248) 修复 PR |
| 🟢 低 | [#5246](https://github.com/HKUDS/nanobot/issues/5246) | `.gitignore` 规则导致 `memory/.cursor` 和 `memory/history.jsonl` 未被跟踪 | ❌ 无 PR，新开 |

---

## 6. 功能请求与路线图信号

### 6.1 可能纳入下一版本的新功能（已有实现 PR）

| PR | 功能 | 状态 | 信号强度 |
|----|------|------|---------|
| [#5234](https://github.com/HKUDS/nanobot/pull/5234) | **MST 元搜索 Provider** — 聚合 DuckDuckGo、Google、Brave、Bing 等多引擎结果，用 RRF 融合排序 | 🟡 待合并（p1） | 强：全新能力，丰富搜索覆盖 |
| [#4919](https://github.com/HKUDS/nanobot/pull/4919) | **Telegram 自定义 Bot API Base URL** — 支持自建 Bot API Server / 企业网关 | 🟡 待合并（开放 22 天） | 中：企业部署刚需 |
| [#5233](https://github.com/HKUDS/nanobot/pull/5233) | **Mattermost 线程独立群组策略** — `groupPolicyInThread` 配置区分线程与主频道提及要求 | 🟡 待合并（p2） | 中：渠道精细化管控 |
| [#5184](https://github.com/HKUDS/nanobot/pull/5184) | **Quick Chat 与 Temporary Chat** — 固定会话身份的快速聊天 + 连接级内存临时聊天 | 🟡 待合并（开放 6 天，有冲突） | 中强：WebUI 交互形态拓展 |
| [#5249](https://github.com/HKUDS/nanobot/pull/5249) | **WebUI 视觉一致性重构** — 两级 elevation、扁平化 Skills/Channels、去除回放动画 | 🟡 待合并（p2） | 中：UI 品质提升 |

### 6.2 用户诉求信号
- **安全加固需求**：Issue #4784 虽以 Bug 形式报告，但背后是用户对多 Provider 场景下密钥隔离的强烈诉求，建议在路线图中加入环境变量管理重构。
- **MCP 可靠性**：Issue #5237 反映 agent 对 MCP 业务错误语义理解不足，可能需要在工具调用协议层增加错误识别机制。

---

## 7. 用户反馈摘要

### 7.1 真实痛点
- **API 密钥管理担忧**（#4784）：用户指出 `os.environ` 全局覆盖会导致多 Provider 部署下密钥错乱，特别是 gateway 型 Provider 会不可预测地覆盖已有配置——这对生产环境是严重隐患。
- **MCP 超时失控**（#5237）：用户描述"agent waits until tool_timeout fires"且"cannot recognize the real cause"，体验上等同于工具调用"假死"，直接影响业务效率。
- **模型兼容性摩擦**（#5235）：Opus 5 发布后，用户立即遇到温度参数被拒问题，说明 Nanobot 对新模型适配存在滞后，好在当天已修复。
- **协作痛点**（#5246）：用户发现 `.gitignore` 规则导致 `memory/history.jsonl` 竟被 Git 跟踪提醒，暴露出工作区脚手架对 Dream 生成文件的追踪策略不够清晰。

### 7.2 满意点
- Opus 5 问题从报告（8 月 3 日）到修复 PR 合并（8 月 4 日）仅用 1 天，社区对项目响应速度的信任度会提升。
- WebUI 多项 PR 连续合并，展示出项目对前端体验的持续投入，这将增强普通用户对项目的粘性。

---

## 8. 待处理积压

| 项目 | 类型 | 开放时长 | 风险 / 说明 | 建议 |
|------|------|---------|------------|------|
| [#4784](https://github.com/HKUDS/nanobot/issues/4784) | 安全 Bug | 30 天 | Provider API 密钥全局泄漏，影响所有多 Provider 用户 | ⚠️ 建议本周内给出修复方案或至少安全公告 |
| [#4919](https://github.com/HKUDS/nanobot/pull/4919) | 功能 PR | 22 天 | Telegram 自定义 Bot API，企业用户明确需求，无冲突无阻塞 | 建议维护者 review 并合入 |
| [#5156](https://github.com/HKUDS/nanobot/pull/5156) | Bug 修复 PR | 7 天 | Telegram 轮询静默停止，生产环境稳定性问题 | 建议尽快合入并补充相关测试用例 |
| [#5184](https://github.com/HKUDS/nanobot/pull/5184) | 功能 PR | 6 天 | Quick Chat / Temporary Chat，存在冲突标签 | 需解决冲突后合入，否则可能搁置 |
| [#5238](https://github.com/HKUDS/nanobot/pull/5238) | 回归修复 PR | 1 天 | p1 优先级，涉及 Session 授权架构调整 | 需重点 review 权限变更影响，避免引入新回归 |

> **维护者关注提醒**：安全 Issue #4784 已持续 30 天无 PR 跟进，是当前项目最大的健康度隐患。此外 9 条待合并 PR 中，`priority: p1` 的 #5234 和 #5238 建议在下一个版本窗口优先处理，以维持社区贡献者的积极性。

---

*本日报基于 GitHub 公开数据生成，统计窗口为 2026-08-04 至 2026-08-05，仅供项目健康度参考。*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-05

## 1. 今日速览

过去 24 小时 Zeroclaw 仓库保持高活跃度：11 条 Issue 更新（9 条活跃、2 条关闭）、50 条 PR 更新（48 条待合并、2 条合并/关闭），无新版本发布。整体处于**密集开发、发布空窗**阶段——PR 提交量大，但合并率偏低（2/50），且大量 PR 卡在 `needs-author-action` 状态，合并瓶颈主要在贡献者响应速度而非维护者审查。Issue 侧 2 条关闭（#8568 MoA Provider RFC、#9630 ZeroCode 选择 Bug）表明讨论有收敛、小修复有落地；但 P0 级安全 Bug #9565（webhook 不 fail-closed）仍在处理中，且新增 1 条 S3 级 Bug #9756。社区讨论焦点集中在三个架构级 RFC（Goal Mode、全工具权限分层、统一附件架构），项目正处于 AI Agent 能力边界扩展的密集设计期。

## 2. 版本发布

过去 24 小时无新版本发布，本节省略。

## 3. 项目进展

**已关闭 Issues（2 条）：**

- [#8568 Mixture-of-Agents (MoA) 虚拟模型 Provider RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/8568) — 经 10 条评论讨论后于 08-04 关闭，多模型聚合方案讨论阶段收官。
- [#9630 ZeroCode transcript 无法从行侧空白处开始选择](https://github.com/zeroclaw-labs/zeroclaw/issues/9630) — S3 级 UI 缺陷，已修复并关闭。

**PR 合并/关闭（2 条）：** 具体编号未出现在评论数 Top-20 展示列表中，可见范围内全部 20 条 PR 仍处于 OPEN 状态，合并节奏需关注。

**新提交/活跃推进的 PR 亮点：**

- [#9713 feat(runtime): 历史裁剪事件暴露 token 核算](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)（08-05 更新）— 解决 #9619 中"大段整轮裁剪被误读为普通轮次消耗全部 token 预算"的诊断难题，让裁剪行为可观测。
- [#9757 fix(providers/anthropic): 工具结果图片以嵌套块形式传递](https://github.com/zeroclaw-labs/zeroclaw/pull/9757)（08-04 新建）— 修复工具返回的图片因 `tool_result.content` 被类型化为纯字符串而无法送达 Anthropic 模型的问题。
- [#9754 fix(channels): 门控 Slack 生命周期本地化辅助函数](https://github.com/zeroclaw-labs/zeroclaw/pull/9754)（08-04 新建）— 消除无 Slack 特性构建时编译无用代码，属构建卫生改进。

**整体判断：** 项目今日进展以"修复在途、合并在途"为主，eval 测试体系、provider 兼容性、安全加固是当前三条最清晰的主线。

## 4. 社区热点

讨论最活跃的 Issues（按评论数排序）：

| Issue | 评论数 | 主题 |
|---|---|---|
| [#8303 Goal mode v1 — bounded foreground Matrix work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 14（👍1） | 跨多轮持久化推进用户目标（含 restart handoff、channel admission、model-initiated control 等边界） |
| [#7155 高危 shell 命令确认分层 + Claude Code 式 allow/ask/deny 策略](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 13 | 08-04 发布 Revision 2，范围从 shell 扩展为**全工具统一权限层** |
| [#9488 Web 聊天与渠道统一附件架构](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | 12 | 附件在多渠道间的统一表达与传递 |
| [#8568 MoA 虚拟模型 Provider](https://github.com/zeroclaw-labs/zeroclaw/issues/8568) | 10 | 已关闭，聚合器/裁判模型多视角推理 |
| [#8692 维护者 RFC 决策队列 Tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 9 | RFC 与设计问题的集中裁决队列 |

**诉求分析：** 讨论热度高度集中于**生产化能力**——多轮任务持久化（#8303）、工具安全权限模型（#7155）、跨渠道附件一致性（#9488）——这与 Agent 平台从 demo 走向真实部署的核心痛点完全吻合。#8692 决策队列 Tracker 本身也说明 RFC 数量已超过维护者的裁决速度，设计讨论旺盛但决策需要提速。

## 5. Bug 与稳定性

| 严重度 | Issue | 状态 | 说明 |
|---|---|---|---|
| **P0 / S0** | [#9565 gateway webhook 处理器不 fail-closed（WhatsApp Cloud / Linq / WATI）](https://github.com/zeroclaw-labs/zeroclaw/issues/9565) | 处理中（in-progress） | 三路入站 webhook 未校验调用方身份即向 agent 派发消息，S0 数据丢失/安全风险。**目前未见对应 fix PR，需最高优先级跟进** |
| **S3** | [#9756 守护进程启动打印多个互不关联的 Telegram 配对码](https://github.com/zeroclaw-labs/zeroclaw/issues/9756) | 新报告（0 评论） | 全新 Telegram 渠道启动时输出多行不同的配对码，用户无法判断哪个生效。暂无修复 PR |
| **S3** | [#9630 ZeroCode transcript 选择不能从行侧空白开始](https://github.com/zeroclaw-labs/zeroclaw/issues/9630) | 已关闭 | 鼠标在行侧空白按下被拒绝，拖选回文本不可行；已修复 |

**在途 Bug 修复 PR（尚未合并）：**

- [#9313 WeChat 同步游标仅在后端入队成功后持久化](https://github.com/zeroclaw-labs/zeroclaw/pull/9313) — 防止崩溃窗口内消息丢失（P1）
- [#9320 cron 任务增加墙钟超时并释放锁](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) — 防止挂起任务永久占用 sqlite 锁（P1）
- [#9504 上下文耗尽结束轮次时显示终端提示](https://github.com/zeroclaw-labs/zeroclaw/pull/9504) — 消除 agent 静默空转假象
- [#9477 恢复被 `<tools>` 标签包裹的 tool-call 解析](https://github.com/zeroclaw-labs/zeroclaw/pull/9477) — 兼容 Qwen 等模型的包裹式输出
- [#9713 历史裁剪事件 token 核算](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — 见上文

## 6. 功能请求与路线图信号

**高讨论度 RFC（可能构成下一版本核心能力）：**

- [#8303 Goal Mode v1](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — 有界前台目标执行，Agent 多轮自主推进用户目标的控制面机制，若被接受将是重大能力升级。
- [#7155 全工具 Deny/Ask/Allow 权限分层](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — 已从 shell 推广到所有工具，与 Claude Code 策略对齐，是安全方向的关键设计。
- [#9488 统一附件架构](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — 打通 Web Chat 与各渠道的附件处理。

**已被接受/接近落地的信号：**

- [#9595 provider 元数据从单一 family registry 派生](https://github.com/zeroclaw-labs/zeroclaw/issues/9595) — 状态 `accepted`，属架构收敛型重构。
- eval 测试体系三连：[#9212 CI 门禁回归套件](https://github.com/zeroclaw-labs/zeroclaw/pull/9212)、[#9214 live 执行模式 + 沙箱工具面](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)、[#9224 pass@k / 误差棒重复运行](https://github.com/zeroclaw-labs/zeroclaw/pull/9224) — 同一作者系列 PR，evaluate 能力是当前最明确的主线之一。
- 安全加固方向：[#9410 命令审计日志默认关闭](https://github.com/zeroclaw-labs/zeroclaw/pull/9410)、[#9548 对危险 Codex CLI extra args 告警](https://github.com/zeroclaw-labs/zeroclaw/pull/9548) — 与 #7155 的权限层设计同属"安全诚实"路线。

**判断：** 下一版本大概率包含 eval 套件增强、Anthropic/兼容端点 provider 修复、安全审计默认策略调整；而 Goal Mode / 统一权限层若通过评审，将进入更远期的主版本规划。

## 7. 用户反馈摘要

- **Telegram 新用户配对体验困惑（#9756）：** 全新渠道首次启动时打印多行不同的一次性绑定码，"无法判断哪一个是生效的"，属于 onboarding 流程缺陷，建议尽快修复。
- **Agent 静默空转引发误判（#9504 对应报告）：** 上下文耗尽且历史裁剪不足以重试时，agent 没有任何终端提示直接"消失"，用户误以为卡死——已有对应修复 PR 待合并。
- **token 消耗账目不可诊断（#9619 → #9713）：** 历史整轮裁剪后，大段削减看起来像普通轮次"消耗了全部 token 预算"，用户难以区分正常消耗与异常裁剪，反馈推动了下游可观测性改进。
- **安全担忧（#9565）：** 三路 webhook 可被攻击者未认证注入消息，报告者定性为 S0 数据丢失/安全风险，社区期待 fail-closed 修复。
- **权限控制诉求（#7155）：** 用户明确提出希望拥有 Claude Code 风格的 allow/ask/deny 命令策略，并在 Revision 2 中被推广为覆盖全部工具的通用权限层，说明真实用户对"高危操作确认"有强烈需求。

## 8. 待处理积压

**长期未合并 PR：**

- [#6622 WhatsApp 持久化 LID allowlist 分发测试](https://github.com/zeroclaw-labs/zeroclaw/pull/6622) — 自 05-13 开启近 3 个月（size:L，P1），维护者已刷新分支并替换重复逻辑，但仍未合并，建议尽快完成 review。

**等待作者响应的 PR（`needs-author-action`，至少 12 条）：**

[#9527](https://github.com/zeroclaw-labs/zeroclaw/pull/9527)（CI 工具链 1.97.1）、[#9477](https://github.com/zeroclaw-labs/zeroclaw/pull/9477)（tool-call 解析）、[#9548](https://github.com/zeroclaw-labs/zeroclaw/pull/9548)（Codex 参数告警）、[#9224](https://github.com/zeroclaw-labs/zeroclaw/pull/9224)（eval pass@k）、[#9504](https://github.com/zeroclaw-labs/zeroclaw/pull/9504)（上下文耗尽提示）、[#9399](https://github.com/zeroclaw-labs/zeroclaw/pull/9399)（Quickstart 宽度）、[#9317](https://github.com/zeroclaw-labs/zeroclaw/pull/9317)（ZeroCode 视口渲染）、[#9313](https://github.com/zeroclaw-labs/zeroclaw/pull/9313)（WeChat 游标）、[#9304](https://github.com/zeroclaw-labs/zeroclaw/pull/9304)（reasoning 重试）、[#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)（eval live 模式）、[#9410](https://github.com/zeroclaw-labs/zeroclaw/pull/9410)（命令审计默认关闭）、[#9262](https://github.com/zeroclaw-labs/zeroclaw/pull/9262)（Anthropic refusal 类型化）——其中多条为 P1 级安全/数据可靠性修复，建议维护者集中催促作者更新并推进合并。

**等待维护者决策的 Issue：**

- [#8043 aardvark-sys crate 退役 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/8043) — `needs-author-action`，8 条评论，等待作者按维护者意见更新。
- [#8692 维护者决策队列](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 该 Tracker 本身即提醒：含 #8303、#7155、#9488、#8132 在内的多个 RFC/设计问题正排队等待维护者裁决，建议为 P0/P1 级安全 RFC 设置明确 SLO。

**风险提示：** P0 级 [#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)（webhook 未鉴权）当前无对应修复 PR，建议优先分配资源，避免安全窗口继续扩大。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-08-05）

## 1. 今日速览

过去 24 小时 PicoClaw 项目保持中等活跃度：新增/活跃 Issue 2 条、新增待合并 PR 2 条，另有 2 条旧 PR 被标记为 stale 并关闭。项目今日无新版本发布，进展集中于 Web 搜索 provider 与 LLM 缓存可观测性两个方向的外部贡献。社区讨论热点集中在 MCP 连接失败导致界面挂起和 Web UI 长历史输入卡顿两个稳定性问题上。整体来看，外部贡献者参与积极，但部分修复型 PR 因长期未处理被机器人自动关闭，维护响应速度有待提升。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日没有新的代码合入主分支。此前提交的两个修复型 PR 在 24 小时内被标记为 stale 并关闭，未能进入主干：

- [PR #3280] fix(auth): 使浏览器 OAuth 登录在真实世界回调条件下存活 —— 修复了 headless/远程环境下 OAuth 授权码被消耗后流程失败的问题，累计发现 4 个独立成因。因 stale 关闭，建议维护者人工介入并重新评估。
- [PR #3251] fix(providers): 捕获 Anthropic providers 中的提示缓存 token 使用情况 —— 补齐 Claude 缓存命中相关指标，便于操作者判断缓存是否生效。同样因 stale 关闭。

另有 2 条新功能 PR 进入待合并状态，构成下一版本可能的能力增量：

- [PR #3299] Add native Exa web search provider —— 为 `tools.web` / `web_search` 增加了原生 Exa 提供商，支持 `d/w/m/y` 时间范围过滤。功能完整，含配置项，具备合并基础。
- [PR #3317] feat(providers): 在 LLM 响应调试输出中记录提示缓存 token —— 在调试日志中补充缓存 token 信息，覆盖 DeepSeek 等通过 Cloudflare AI Gateway 透传缓存元数据的场景。

**项目健康度信号**：新功能贡献渠道畅通，但修复类 PR 积压和自动关闭问题需关注，否则会导致已知问题长期滞留。

## 4. 社区热点

过去 24 小时讨论最多的议题集中在稳定性与平台适配：

- [#3269 [BUG] MCP 服务器连接失败导致 agent 循环挂起，聊天界面停止回复](https://github.com/sipeed/picoclaw/issues/3269) —— 3 条评论，1 个 👍。用户报告当 MCP 服务不可用时，整个 agent loop 卡死，前端不再响应。评论区关注点在于失败重试与超时机制缺失，属于影响面较大的可靠性问题。
- [#3281 [BUG] Web UI chat input 在历史记录变长时非常卡顿](https://github.com/sipeed/picoclaw/issues/3281) —— 3 条评论，1 个 👍。用户反馈长会话下输入框延迟明显，涉及前端渲染性能与会话状态管理。
- [#3182 [BUG] Android version](https://github.com/sipeed/picoclaw/issues/3182) —— 6 条评论，今日因 stale 关闭。Android 端服务无法启动、无法修改路径的问题讨论时间较长，但始终未得到官方修复回应，今日被自动关闭。

社区核心诉求：**外部依赖故障时的降级能力**、**长会话性能优化**、**移动端可用性**。

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue 链接 | 描述 | 状态 |
| --- | --- | --- | --- |
| 🔴 严重 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP 服务器连接失败会导致 agent loop 永久挂起，聊天界面完全停止响应，用户无法继续使用 | 开放中，**无对应 fix PR** |
| 🟠 中等 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 在长聊天历史下输入延迟明显，影响日常编辑体验 | 开放中，**无对应 fix PR** |
| 🟡 平台相关 | [#3182](https://github.com/sipeed/picoclaw/issues/3182) | Android 端无法启动服务、无法修改存储路径，即使已授予全部权限 | 已关闭（stale），**问题可能仍存在** |

建议维护者优先关注 #3269，该问题可导致会话级不可恢复故障，且已在 nightly 版本中被验证。

## 6. 功能请求与路线图信号

当前有两个 PR 指向明确的功能增强，较可能进入下一版本：

- **原生 Exa Web Search provider（[PR #3299](https://github.com/sipeed/picoclaw/pull/3299)）**：将 Exa 搜索能力内建为 `tools.web` provider，完善 Agent 的实时检索能力。该 PR 实现完整，包含认证、时间过滤和配置项，是“工具生态扩张”的方向性信号。
- **缓存 token 可观测性（[PR #3317](https://github.com/sipeed/picoclaw/pull/3317)）**：在调试日志中记录 prompt cache token，帮助用户判断 DeepSeek 等 provider 的缓存是否命中，是成本优化与性能调试的基础能力。

两者均属于对现有能力的增量增强，不涉及破坏性变更。若维护者及时 review，有望随下个 minor 版本发布。

## 7. 用户反馈摘要

从近期 issue 评论中可以提炼出以下真实用户反馈：

- **移动端用户存在明确诉求但体验断裂**：Android 用户反馈“已授予全部权限仍无法启动服务”，且设置中无法更改路径，说明移动端在文件系统适配和权限处理上仍不完善，同时该 issue 长期无官方回应后被关闭，易引发用户流失。
- **长会话场景是 Web UI 的主要使用路径**：用户表示聊天历史变长后输入卡顿，说明 PicoClaw Web 被用于真实的中长对话场景，而非仅演示用途；历史消息渲染和状态更新需要性能优化。
- **用户对 MCP 扩展的可靠性有较高期望**：#3269 中用户使用 Qwen3 + nightly 版本复现了 MCP 连接失败导致的整体不可用，说明外部工具接入是用户高频使用的功能，但其失败隔离能力亟待加强。
- **用户愿意提供详细的复现环境与日志**：多个 issue 均包含版本号、Go 版本、模型 provider 和操作步骤，社区的问题报告质量整体较高，有助于维护者快速定位。

## 8. 待处理积压

以下事项需维护者重点关注：

- **[#3269 MCP 连接失败导致 agent loop 挂起](https://github.com/sipeed/picoclaw/issues/3269)** —— 开放超过 15 天，严重程度高，仍无修复 PR，建议尽快规划修复。
- **[#3281 Web UI 长历史输入卡顿](https://github.com/sipeed/picoclaw/issues/3281)** —— 开放超过 14 天，影响日常 Web 使用体验，需要前端性能专项处理。
- **[PR #3280 OAuth 登录修复](https://github.com/sipeed/picoclaw/pull/3280)** —— 已被 stale bot 关闭，但问题本身依然存在（headless 环境 OAuth 登录基本不可用），建议维护者手动重新打开或基于该补丁重新提交。
- **[PR #3251 Anthropic 缓存 token 统计修复](https://github.com/sipeed/picoclaw/pull/3251)** —— 同样因 stale 关闭，属于成本可观测性缺口，建议提取补丁内容合入。
- **[#3182 Android 端服务不可用](https://github.com/sipeed/picoclaw/issues/3182)** —— 虽已关闭，但移动端问题未被解决，建议在后续版本中针对 Android 文件路径与后台服务机制进行专项修复。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-05

> 数据来源：GitHub API（过去 24 小时窗口：2026-08-04 ~ 2026-08-05）｜ 自动生成，数据驱动

---

## 1. 今日速览

过去 24 小时 NanoClaw 整体活跃度中等偏低：Issues 侧完全静默（0 新增 / 0 关闭），社区公开讨论热度不足；PR 侧有 5 条更新，其中 4 条待合并、1 条已关闭（#3154，agent-runner 定时任务时间修复），且无新版本发布。当前项目处于"功能收尾 + 缺陷修复并行"的阶段：Dial 新渠道（SMS + AI 语音）两条 PR 已等待评审 3 周，Discord 审批按钮的严重 Bug 修复已提交等待合入。整体健康度良好，但 PR 评审积压是当前最需要关注的瓶颈。

---

## 2. 版本发布

无（过去 24 小时无新 Release）。

---

## 3. 项目进展

**今日关闭/合入（1 条）：**

- [#3154 [CLOSED] fix(agent-runner): give scheduled tasks current run time](https://github.com/nanocoai/nanoclaw/pull/3154)（作者 @Koshkoshinsk，core-team 标记）
  - 修复定时任务的时间语义问题：任务的 `time` 改为从有效计划发生时间（`process_after`）渲染，旧数据回退到创建时间戳；同时新增任务专属的 `current_time`（含星期几），在任务到达 agent 时生成。该合入完善了 agent-runner 的调度上下文，对依赖定时触发与时间感知的任务编排场景有实际价值。

**整体评估：** 今日仅 1 条 PR 合入，且为修复型而非功能型；项目主干稳定性在提升，但新功能（Dial 渠道、skill 架构重构）仍停留在待评审状态，路线图推进节奏偏慢。

---

## 4. 社区热点

今日 Issues 侧无公开讨论，PR 评论区也未见评论数据。以下 PR 基于其内容影响面与作者活跃度判断为社区焦点：

- **🔴 [#3185 fix(discord): strip \n delimiter in webhook interaction custom_id so approvals resolve correctly](https://github.com/nanocoai/nanoclaw/pull/3185)**（@omerh，8 月 4 日创建）
  - 直指一个**阻塞性缺陷**：Discord 上 `ask_question` / 审批卡片的按钮点击全部解析为错误选项，**用户即使点击 Approve 也会被拒绝**。该问题直接影响所有依赖 Discord 渠道做人工审批的用户，预计是今日社区最关心的 PR。

- **🟡 [#3186 refactor: add host seams for skill-owned capabilities](https://github.com/nanocoai/nanoclaw/pull/3186)**（@zvi-fried，8 月 4 日创建）
  - 架构级重构，为 skill 自有能力引入宿主接缝（host seams）。涉及扩展机制的底层设计，对 skill 生态开发者具有前瞻意义，但需核心维护者仔细评估兼容性。

- **🟡 [#3041 / #3050 Dial 渠道接入](https://github.com/nanocoai/nanoclaw/pull/3041)**（@OmriBenShoham，7 月 14 日创建，8 月 4 日仍在更新）
  - 两条 PR 构成完整的 Dial 渠道功能（SMS + AI 语音通话适配器 + 安装向导/channel picker）。创建超过 3 周仍保持活跃修改，说明作者在持续跟进评审意见，社区对非 IM 类渠道存在明确需求。

---

## 5. Bug 与稳定性

| 严重程度 | 问题描述 | 影响面 | 修复状态 |
|---|---|---|---|
| 🔴 严重 | Discord webhook 交互路径中，`custom_id` 以 `\n` 结尾时按 `:` 分割解析出错，审批卡片任何按钮（含 Approve）都会解析为错误选项，**导致所有 Discord 审批被拒绝** | 所有使用 Discord 渠道进行人工审批的用户 | 修复 PR 已提交待合并：[#3185](https://github.com/nanocoai/nanoclaw/pull/3185) |
| 🟡 中等 | 定时任务的 `time` 渲染为创建时间而非实际计划运行时间，且缺少任务到达 agent 时的"当前时间"（含星期几），影响时间敏感型任务逻辑 | 定时/调度任务用户 | 已修复并合入：[#3154](https://github.com/nanocoai/nanoclaw/pull/3154) |

无崩溃类、安全类或数据丢失类 Bug 报告。建议维护者优先合入 #3185，消除当前最严重的功能性缺陷。

---

## 6. 功能请求与路线图信号

今日无新 Issues 提出需求，但 PR 动向透露出明确的路线图信号：

- **Dial 渠道（SMS + AI 语音通话）即将落地**：[#3041](https://github.com/nanocoai/nanoclaw/pull/3041)（渠道适配器）与 [#3050](https://github.com/nanocoai/nanoclaw/pull/3050)（channel picker / wizard + runChannelSkill 模型）构成完整功能闭环。若合入，NanoClaw 将新增短信与 AI 语音通话类交互渠道，填补非 IM 场景的空白。这两条 PR 已开放 3 周且仍在更新，**大概率进入下一版本**。
- **Skill 生态架构升级**：[#3186](https://github.com/nanocoai/nanoclaw/pull/3186) 的 "host seams for skill-owned capabilities" 表明项目正在为 skill 提供更底层的宿主能力扩展点，可能是未来"skill 自主声明并使用宿主能力"机制的铺垫。属于中期架构方向，是否纳入下一版本取决于评审进度。

---

## 7. 用户反馈摘要

过去 24 小时 Issues/PR 评论区无公开评论，以下反馈信号从 PR 描述中间接提炼：

- **痛点：Discord 审批功能不可用**。用户实际使用中发现"点击审批按钮总是走到错误选项 / 总是被拒绝"，说明审批类交互是真实高频场景，该 Bug 已造成确定性影响（[#3185](https://github.com/nanocoai/nanoclaw/pull/3185)）。
- **痛点：定时任务时间错乱**。任务上下文中的时间与真实执行时间不一致，影响依赖时间信息的自动化逻辑；用户需要运行时准确的时间与星期信息（[#3154](https://github.com/nanocoai/nanoclaw/pull/3154)）。
- **诉求：扩展非 IM 渠道**。外部贡献者主动实现 Dial（SMS + 语音）适配器，说明社区对通讯渠道多样性有真实需求，且已有外部开发者愿意以完整 PR 形式贡献（[#3041](https://github.com/nanocoai/nanoclaw/pull/3041)、[#3050](https://github.com/nanocoai/nanoclaw/pull/3050)）。

---

## 8. 待处理积压

| PR / Issue | 主题 | 创建时间 | 待审时长 | 提醒 |
|---|---|---|---|---|
| [#3050](https://github.com/nanocoai/nanoclaw/pull/3050) | feat(setup): add Dial to the channel picker + wizard/skills | 2026-07-14 | ~22 天 | ⚠️ 功能完整但长期未合并，建议尽快评审或给出明确修改方向，避免贡献者流失 |
| [#3041](https://github.com/nanocoai/nanoclaw/pull/3041) | feat(channels): add Dial channel adapter (SMS + AI voice calls) | 2026-07-14 | ~22 天 | ⚠️ 与 #3050 为同一功能两部分，建议联动评审；作者 8/4 仍在更新，说明有合入意愿 |
| [#3185](https://github.com/nanocoai/nanoclaw/pull/3185) | fix(discord): strip \n delimiter in webhook interaction custom_id | 2026-08-04 | ~1 天 | 🔴 阻塞性 Bug 修复，建议优先安排 reviewer 并尽早合入 |
| [#3186](https://github.com/nanocoai/nanoclaw/pull/3186) | refactor: add host seams for skill-owned capabilities | 2026-08-04 | ~1 天 | 🟡 架构重构，建议核心维护者评审，确认对现有 skill 的兼容性 |

---

*报告结束。项目健康度总结：核心代码库维护活跃，Bug 响应及时，但 PR 评审周期偏长（最长超 3 周），建议维护者优先处理 #3185（严重 Bug）与 #3041/#3050（长尾功能 PR），以保持外部贡献者积极性。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-05

## 今日速览

过去24小时内，IronClaw 项目保持高度活跃的开发节奏：共产生10条 Issues（9条新开/活跃，1条关闭）和50条 PR 更新（34条待合并，16条已合并/关闭）。PR 合并/关闭率为32%（16/50），但待合并 PR 积压数量增至34条，反映出团队交付能力强与评审队列容量之间存在一定张力。无新版本发布，项目当前重心明显偏向 1.1.0-rc.1 前的架构治理与功能补全。值得关注的是，多个 PR 明确标注了严格的合并顺序依赖（stacked PR），说明近期存在成体系的架构迁移工作正在进行。

---

## 版本发布

**无**（过去24小时无新版本发布）

---

## 项目进展

今日合并/关闭的16条 PR 中，绝大部分来自 **Waves 0–4 架构迁移系列**（由 @BenKurrek 主导），这批 PR 体现了项目在向目标架构收敛上的系统性推进：

- **#7156**（已合并，L）：修复4项使 CI 形同虚设的 enforcement 缺陷，包括同层边级清单、composition 绝对 LOC 上限、D-E vendor 普查、ratchet slack。所有门禁均经过"注入违规→观察变红→恢复→观察变绿"的破坏性测试验证。
- **#7161**（已合并，XL）：将 "loud path-keyed gates" 转换为 inventory keying，确保 `git mv` 重构时，测量型门禁不会静默变绿。
- **#7160**（已合并，XL）：WS3 工作流，打通窄端口 reserve/reconcile/release 通道，mcp 和 sandbox 模块开始解除对 `ironclaw_resources` 的依赖，合并即闭环 #7067。
- **#7159**（已合并，XL）：WS5 工作流，通过端口反转（register 4→3）彻底切断 `conversations → turns` 边依赖。
- **#7197**（已关闭，S）：修复 Windows 身份变量未传递给 release smoke 测试的问题。值得注意的是，该 PR 主动缩小了范围——移除了对 Windows ACL 账户解析行为的改动，因为该行为自 1.0.0 起已上线，不适合在 release 分支变动。

**解读**：Waves 0–4 系列 PR 的密集合入表明，项目正在通过"合并顺序依赖 + 小步验证"的方式推进一次跨模块架构重组。这种做法的好处是每次合并都经过独立验证，降低了大爆炸式重构的风险。但同时，多组 stacked PR 也增加了评审负担和合并复杂性的管理成本。

🔗 [#7156](https://github.com/nearai/ironclaw/pull/7156) | [#7161](https://github.com/nearai/ironclaw/pull/7161) | [#7160](https://github.com/nearai/ironclaw/pull/7160) | [#7159](https://github.com/nearai/ironclaw/pull/7159) | [#7197](https://github.com/nearai/ironclaw/pull/7197)

---

## 社区热点

今日讨论最活跃的 Issues 集中在 #7190–#7194 这一批由 @ilblackdragon 创建、每条都有2条评论的条目，形成一个小型讨论簇：

- **#7194**（2评论）：请求允许管理员将共享频道（shared channel）配置为 outbound 投递目标。核心矛盾在于：agent 能用 `slack.send_message` 发消息到 Slack 频道，但宿主 delivery 层（唯一被允许传输最终回复的通道）无法路由到这些频道，造成能力割裂。
- **#7193**（2评论）：要求为自动化（automations）增加"立即运行"（run-now / manual fire）能力，覆盖模型能力、产品表面和 WebUI 三个入口。目前完整能力只有 list/pause/resume/rename/delete 五项。
- **#7192**（2评论）：WebUI 中乐观渲染的用户消息会暂时出现在 agent 输出下方，直到持久化数据到达才纠正位置，造成对话读序混乱。
- **#7191**（2评论）：内置时间工具 `builtin.time` 无法解析"24 hours ago"这类相对偏移表达式，且错误提示为不透明的 `input_error()`。
- **#7168**（1评论）：Agent 通过 `builtin.skill_install` 安装的技能不可见、不可激活，已关闭（状态见下节）。

**分析**：这批 Issue 集中于"交付链路完整性"——从消息路由（#7194）、自动化触发（#7193）、UI 渲染正确性（#7192）到工具输入解析（#7191），反映开发者在向"生产可用"方向打磨细节。尤其是 #7194 和 #7193，直指 agent 在真实工作流中的两个关键缺口，具有明确的产品价值。

🔗 [#7194](https://github.com/nearai/ironclaw/issues/7194) | [#7193](https://github.com/nearai/ironclaw/issues/7193) | [#7192](https://github.com/nearai/ironclaw/issues/7192) | [#7191](https://github.com/nearai/ironclaw/issues/7191)

---

## Bug 与稳定性

按严重程度排列：

**高 — 功能不可用/数据持久性缺陷**

- **#7168**（已关闭）：Agent 安装的技能在 Settings 和模型视图中完全不可见，无法激活。该问题已在本地开发环境中复现。状态已关闭，推测已定位或修复，但具体处理方式需关注后续提交。
  🔗 https://github.com/nearai/ironclaw/issues/7168

- **#7185**（无 PR）：多个测试者独立报告——跨对话记忆不可靠，一个对话中建立的信息在后续对话中无法稳定召回。涉及法律场景实际用例（Devon/Tobias 的反馈）。
  🔗 https://github.com/nearai/ironclaw/issues/7185

**中 — 功能缺陷/体验问题**

- **#7192**（无 PR）：WebUI 中乐观更新的用户消息渲染位置错误（显示在 agent 输出下方），导致对话顺序错乱。与 #7191 类似，已有明确修复方向，但尚无对应 PR。
  🔗 https://github.com/nearai/ironclaw/issues/7192

- **#7191**（无 PR）：`builtin.time` 无法解析相对时间表达式（如 "24 hours ago"），且错误信息不透明，直接导致 agent 在生产线程中无法完成日报自动化任务。
  🔗 https://github.com/nearai/ironclaw/issues/7191

**低 — 工具可靠性**

- **#7180**（无 PR）：用户反馈网页抓取/数据检索时好时坏，agent 在部分场景使用 `http` 工具而非 `web_search`，成功与否无规律可循。
  🔗 https://github.com/nearai/ironclaw/issues/7180

**稳定性趋势观察**：Bug 类 Issue 集中在"状态可见性"（技能、记忆、UI 渲染、投递状态）和"工具解析"（时间表达式、抓取路径选择）两类。前者可能与 #7178 提及的 1.1.0 迁移有关，后者则指向内置工具在真实场景下的健壮性不足。

---

## 功能请求与路线图信号

值得关注的功能请求：

| Issue | 功能需求 | 关联 PR / 路线图判断 |
|-------|---------|---------------------|
| **#7193** | 自动化的"立即运行"能力（run-now） | 明确列为 enhancement，size L，risk medium。自动化相关能力是 agent 产品化的核心，极可能纳入 v1.1.0 或下一个 feature 窗口 |
| **#7194** | 将管理员允许的共享频道作为 outbound 投递目标 | 与 delivery-layer 路由能力直接相关，属于权限模型 + 路由扩展，实现后能打通"agent 主动触达"与"宿主投递"之间的链路 |
| **#7183** | 按用户选择 LLM 模型（当前仅管理员可配置） | 来自 Champions 计划营销用户的直接诉求。当前管理面和用户面的权限边界清晰，实现成本可能在 LLM 配置模型的 per-user 覆盖层，而非底层改动 |
| **#7184**（PR） | Nostr 主机函数（`nostr-sign-event` 等3个 WASM 宿主函数） | 新功能 PR 已提交。若合入，将扩展 WASM sandbox 的签名与事件能力，值得关注评审进展 |

**路线图信号**：#6941（v1.1.0 Epic "模型可自建、自寻、自选技能"）在持续更新中，该 Epic 明确缩小了 #6565 的过泛范围，制定了可测量的验收标准。与 #7193 结合，说明 v1.1.0 的核心叙事是"让 agent 真正自主起来"——自己装技能、自己决定何时运行自动化、自己选择消息投递目标。

🔗 [#7193](https://github.com/nearai/ironclaw/issues/7193) | [#7194](https://github.com/nearai/ironclaw/issues/7194) | [#7183](https://github.com/nearai/ironclaw/issues/7183) | [#7184](https://github.com/nearai/ironclaw/pull/7184) | [#6941](https://github.com/nearai/ironclaw/issues/6941)

---

## 用户反馈摘要

从今日 Issue 中提炼的真实用户声音：

1. **记忆不可靠是最大痛点**（#7185）：多位 Champions 测试者（Devon、Tobias 等转述）独立观察到跨对话记忆丢失。从"法律场景中 agent 无法访问已有信息"的描述看，这不是技术上的小瑕疵，而是直接削弱 agent 可用性的核心问题。用户期望的是：只要有权限，就应当能回忆。

2. **模型选择权被剥夺**（#7183）：营销团队用户（Jeremy Koch）明确提出"为什么我不能自己选模型？"。当前 admin 控制一切的模式适合初期管控，但当产品进入更多业务团队时，用户自主性诉求会越来越强。

3. **网页抓取的随机失败让用户困惑**（#7180）：用户（Michael Kelly）反馈"能抓到一些、另一些直接失败，找不到规律"。这类问题最伤信任——用户无法判断是自己的操作有误还是系统缺陷。

4. **细节缺失影响实际生产任务**（#7191）：真实生产线程中，agent 因无法解析"24 hours ago"而卡壳。这暴露了工具输入设计中对自然语言表达覆盖不足的问题——用户在构建自动化时，期望时间表达符合直觉。

---

## 待处理积压

以下为长期未响应或可能存在阻塞的项目，建议维护者关注：

- **#5101**（创建 2026-06-20，截止今日 46 天未合并）：将 live-canary 的 `cargo install cargo-component --locked` 替换为 pinned `taiki-e/install-action`。PR 状态为 OPEN，最终更新时间为 2026-08-05，说明仍有活动，但跨度较长。CI 基础设施的现代化改造是长期健康度的保障，建议优先跟进。
  🔗 https://github.com/nearai/ironclaw/pull/5101

- **#6965**（创建 2026-07-31，5 天未合并）：为 IronHub 添加完整文档（3 个页面 + 侧边栏），并将 "ClawHub" 统一更名为 "IronHub"。文档类 PR 合并成本低，对用户体验提升直接，建议及时评审。
  🔗 https://github.com/nearai/ironclaw/pull/6965

- **#7001**（创建 2026-08-01，4 天未合并）：保持缓存系统前缀在模型调用间字节级稳定，防止 gateway 重写 prompt 前缀导致缓存失效。该 PR 直指 token 成本与推理性能优化，属于低风险高收益类改进，值得优先合入。
  🔗 https://github.com/nearai/ironclaw/pull/7001

- **#7140 与 #7022**（dependabot 批量依赖更新）：`everything-else` 组 8 项更新和 actions 组 2 项更新。依赖更新 PR 需要持续跟进，防止过期引发安全漏洞；其中 `actions/setup-node` 从 4.0.2 跨到 7.0.0 属大版本跳跃，需确认兼容性。
  🔗 [#7140](https://github.com/nearai/ironclaw/pull/7140) | [#7022](https://github.com/nearai/ironclaw/pull/7022)

---

**总体健康度评估**：IronClaw 当前处于"架构升级 + 功能打磨"并行的高速通道。Waves 0–4 系列合并展示了团队在工程治理上的决心和方法论；Issues 侧涌现的用户反馈则持续为产品方向提供校正信号。项目健康度良好，但需注意：① 34条待合并 PR 的评审积压；② 记忆不可靠（#7185）作为长尾问题如果没有系统性的修复方案，可能在用户口碑上造成持续损耗。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-05

## 1. 今日速览

过去 24 小时项目整体活跃度较高。PR 侧有 13 条更新，其中 10 条已合并/关闭，核心工作是完成 2026.8.3 版本的合入（#2430），涵盖登录体验优化、积分活动恢复与完善、模型错误分类修复、Artifact 自动预览开关等多项功能。Issue 侧仅 1 条活跃记录，为 #1202 安全相关的长期未关闭问题，需重点关注。整体来看，项目处于发布后的集中收尾阶段，功能迭代节奏快，但安全类问题的响应速度有待提升。

## 2. 版本发布

昨日无独立新版本发布，但通过 PR **#2430** 将 `release/2026.8.3` 分支合入 `main`，实质完成了 2026.8.3 版本的发布流程。该版本包含以下变更：

- **新增能力**：原生积分奖励活动（多个相关 PR 配合落地）、首次启动登录流程优化、Artifact 自动预览控制开关
- **修复与改进**：模型容量过载/速率限制的分类修正、Windows 安装器可靠性提升
- **涉及模块**：renderer、main、cowork，适配 Windows 平台

该版本无明确的破坏性变更说明，但涉及积分活动、登录流程等前端交互改动，建议关注后续用户反馈。

## 3. 项目进展

今日合并的 PR 主要集中在 2026.8.3 版本的功能整合与正式发布，项目整体向前推进了一个完整版本。值得关注的合并内容：

| PR | 内容 | 类型 |
|---|---|---|
| [#2430](https://github.com/netease-youdao/LobsterAI/pull/2430) | 合入 `release/2026.8.3` 至 `main`，完成版本发布 | 发布 |
| [#2424](https://github.com/netease-youdao/LobsterAI/pull/2424) | 恢复正在进行的积分活动，还原 500 积分领取流程（含 IPC、UI 与素材） | 功能恢复 |
| [#2425](https://github.com/netease-youdao/LobsterAI/pull/2425) | 新增 Artifact 自动预览开关，用户可关闭自动打开文件预览 | 新功能 |
| [#2426](https://github.com/netease-youdao/LobsterAI/pull/2426) | 将模型容量过载与速率限制分开分类，纠正误导性错误提示 | 修复 |
| [#2427](https://github.com/netease-youdao/LobsterAI/pull/2427) | 打包启动积分活动海报及 CTA 素材，本地渲染活动弹窗 | 功能完善 |
| [#2428](https://github.com/netease-youdao/LobsterAI/pull/2428) | 补全启动积分活动的分析字段，改进登录失败的错误上报 | 可观测性 |
| [#2429](https://github.com/netease-youdao/LobsterAI/pull/2429) | 优化登录页面视觉与交互 | UI 优化 |
| [#1282](https://github.com/netease-youdao/LobsterAI/pull/1282) [#1283](https://github.com/netease-youdao/LobsterAI/pull/1283) [#1284](https://github.com/netease-youdao/LobsterAI/pull/1284) | 依赖升级：@headlessui/react、react、react-syntax-highlighter | 技术债清理 |

此外，依赖机器人提交的 React 19、Headless UI 2.x 升级已顺利合入，说明项目在跟进前沿生态方面保持了较好节奏。

## 4. 社区热点

今日社区讨论最集中的是安全相关 Issue **#1202**：《【bug】agent泄漏model key信息，存在敏感信息泄漏风险》（[链接](https://github.com/netease-youdao/LobsterAI/issues/1202)）。该 Issue 创建于 2026-04-01，至今仍为 OPEN 状态，且已被标记为 stale。

该问题描述了 Agent 在用户询问 API key 配置时，不仅未拒绝回答，反而指引用户通过配置文件和环境变量获取敏感信息，存在实际泄漏风险。虽然评论仅 1 条，但考虑到问题性质（安全）与持续时间（4 个月未关闭），仍值得维护团队优先处理。背后反映的用户诉求是：**AI 助手应具备敏感信息防护意识，在交互层面对 key 等凭证采取默认拒绝策略**。

## 5. Bug 与稳定性

| 严重程度 | 问题 | 状态 | 是否有修复 PR |
|---|---|---|---|
| 高 | [#1202](https://github.com/netease-youdao/LobsterAI/issues/1202) Agent 可被诱导泄漏模型 key 信息，存在凭证泄露风险；4 个月未处理，已被标记 stale | OPEN | 暂无 |
| 中 | [#2426](https://github.com/netease-youdao/LobsterAI/pull/2426)（已合并）修复了模型容量过载被误归类为速率限制的问题，此前会误导用户立即重试 | 已修复 | ✅ 已合并 |

总体来看，新报告 Bug 为 0，之前积累的模型错误提示问题已在本次版本中修复，稳定性趋势向好。但安全类高危 issue 的长期悬置是当前主要风险点。

## 6. 功能请求与路线图信号

今日无新增功能请求 Issue，但两个已合并/待合并的 PR 反映了用户侧的实际需求：

- **隐藏侧边栏广告**（[#2374](https://github.com/netease-youdao/LobsterAI/pull/2374)，待合并）：在设置中增加“永久隐藏侧边栏广告”开关，解决此前只能临时关闭单个广告的痛点。对应 issue #2342 的用户诉求，若合入，预计将显著改善广告位体验。
- **Artifact 自动预览开关**（[#2425](https://github.com/netease-youdao/LobsterAI/pull/2425)，已合并）：允许用户关闭文件自动预览，同时保留手动预览能力，属于对“自动打断工作流”类抱怨的合理回应。

以上两项均有可能被纳入下一版本，尤其是 #2374 若合入，将成为 2026.8.x 的增量优化点。

## 7. 用户反馈摘要

- **安全敏感型用户的担忧**（来源：[#1202](https://github.com/netease-youdao/LobsterAI/issues/1202)）：技术用户测试发现 Agent 会逐步引导获取模型 key，反馈中对“agent 没有做防护”“存在安全风险”有明确不满。使用场景为自行部署/调试时验证安全边界，用户期待的是 agent 默认具备防御性行为，而非依赖用户自觉。
- **广告体验诉求**（来源：[#2342](https://github.com/netease-youdao/LobsterAI/issues/2342)，经 #2374 引出）：用户希望彻底关闭侧边栏广告，而非每次手动关掉，反映了对界面干扰项的零容忍倾向。

## 8. 待处理积压

当前存在 3 条长期未响应的 Issue/PR，均与安全或依赖健康相关，建议维护者优先关注：

| 项目 | 创建时间 | 状态 | 备注 |
|---|---|---|---|
| [#1202](https://github.com/netease-youdao/LobsterAI/issues/1202) Agent 泄漏 model key 安全漏洞 | 2026-04-01 | OPEN，已 stale | 高危安全问题，已积压 4 个月 |
| [#1205](https://github.com/netease-youdao/LobsterAI/pull/1205) 会话重命名失败时无错误提示 | 2026-04-01 | OPEN，已 stale | 功能缺口，PR 已就绪但未评审 |
| [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) electron 依赖升级 | 2026-04-02 | OPEN，已 stale | 依赖积压 4 个月，electron 从 40.x 到 43.x，存在安全/功能收益 |

其中 #1202 的修复方案建议纳入下一迭代的安全专项，同时 #1277 的 Electron 升级涉及安全更新，建议与 #1202 一并排期处理。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-05

## 1. 今日速览

过去 24 小时 Moltis 项目整体活跃度较低：无新开或关闭的 Issue，无新版本发布，仅收到 1 条依赖更新 PR。该 PR 由 Dependabot 自动提交，属于常规性的 npm 依赖升级（undici 7.28.0 → 7.29.0），尚未合并，也未引发社区讨论。总体来看，项目处于相对平静的维护期，无重大功能推进或用户反馈涌入，健康状况稳定。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日没有 PR 被合并或关闭，因此没有实质性的功能新增或 Bug 修复落地。唯一活跃的 PR 为依赖更新：

- [#1184 chore(deps-dev): bump undici from 7.28.0 to 7.29.0](https://github.com/moltis-org/moltis/pull/1184)（待合并，作者：@dependabot[bot]）

该 PR 将 `/website` 目录下开发依赖 `undici` 从 7.28.0 升级至 7.29.0。这是网站子项目的工具链维护，不涉及核心功能变更。项目核心代码今日无可见改动。

## 4. 社区热点

今日无高热度讨论。唯一活跃的 PR 为自动化依赖更新，暂无用户评论或互动（👍 0，评论 0）。未产生社区热点议题。

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。项目稳定性方面没有需要关注的负面信号。

## 6. 功能请求与路线图信号

今日无用户提出新的功能请求。唯一进入待合并状态的 PR 是依赖升级，不包含新功能信号。路线图方面暂无新增可见线索。

## 7. 用户反馈摘要

今日无用户 Issue 评论或 PR 讨论内容，无法提炼用户痛点和满意度信息。从当前活动形态判断，项目维护主要依赖自动化流程（Dependabot）驱动，人工代码提交与社区讨论均处于暂停状态。

## 8. 待处理积压

当前有 1 条待合并 PR，建议维护者及时处理：

- [#1184 chore(deps-dev): bump undici from 7.28.0 to 7.29.0 in /website](https://github.com/moltis-org/moltis/pull/1184) — Dependabot 提交的依赖升级，已等待约 1 天。无冲突提示，可快速合入，以免后续产生更多依赖漂移。

此外，今日无遗留的长期未响应 Issue 或 PR。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-05

> 数据窗口：2026-08-04 ~ 2026-08-05 ｜ 数据源：GitHub（agentscope-ai/QwenPaw）

---

## 今日速览

过去 24 小时 CoPaw 项目保持高度活跃：**更新 Issue 19 条**（新开/活跃 13，关闭 6），**更新 PR 49 条**（待合并 28，已合并/关闭 21），无新版本 Release。开发侧围绕 **渠道稳定性**（WeChat iLink、Matrix 重试）、**时间戳时区修复闭环**（3 个相关 PR 合并）、**插件系统隔离** 和 **CI 测试基础设施** 密集推进，同时有 3 位 first-time-contributor 提交 PR，社区参与度良好。值得警惕的是今日出现一个 **Windows 桌面端严重回归**（`PYTHONHOME` 注入导致所有 python 子进程崩溃，[#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697)），且微信通道两个阻塞性 Bug 尚无 fix PR。

---

## 项目进展

今日合并/关闭 21 条 PR，以下为主要进展：

### 时间戳时区转换问题完成闭环
由 [#6301](https://github.com/agentscope-ai/QwenPaw/issues/6301) 引发的 naive UTC 时间戳被误当作本地时间的问题，今日获得 3 个 PR 合并，形成从后端到前端的完整修复链路：
- [#6309](https://github.com/agentscope-ai/QwenPaw/pull/6309) `fix(chats): convert session timestamps across timezones` — 后端 AgentScope 消息时间戳转换修复
- [#6685](https://github.com/agentscope-ai/QwenPaw/pull/6685) `fix(timestamp): improve timestamp handling in agentscope_msg_to_message` — 补充修复同一转换函数
- [#6618](https://github.com/agentscope-ai/QwenPaw/pull/6618) `fix(console): remove forced UTC timestamp normalization` — 前端移除强制 `Z` 后缀，配合后端时区感知时间戳

### CI 集成测试稳定性修复
- [#6678](https://github.com/agentscope-ai/QwenPaw/pull/6678) `fix(ci): install Playwright Chromium for the integration suite` — 修复 nightly 全平台 7 例浏览器测试因 Chromium 缺失而失败的问题
- [#6686](https://github.com/agentscope-ai/QwenPaw/pull/6686) `test(integration): fix chrome contract mismatches and add missing p-tier markers` — 修补 PR gate 的 p-tier 标记覆盖漏洞
- [#6679](https://github.com/agentscope-ai/QwenPaw/pull/6679) `test(integration): align import-local with #6487 and widen a flaky poll window` — 适配 `/import-local` 的 `$HOME` 限制并放宽不稳定轮询窗口

### 核心功能修复
- [#6628](https://github.com/agentscope-ai/QwenPaw/pull/6628) `fix(scroll): use SystemMsg for compressed memory placeholder` — 将滚动压缩占位符从 `user` 改为 `system` 角色，修复 DeepSeek 等 OpenAI 兼容 API 返回 `Messages with role 'tool' must be a response to a preceding message with 'tool_calls'` 的错误（对应 [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)）
- [#6682](https://github.com/agentscope-ai/QwenPaw/pull/6682) `fix(console): sync legacy max_iters when saving iteration limit` — 修复 Loop Engineering 迁移后 Console 保存迭代上限时 `max_iters` 字段失同步的问题

> **整体评估**：时间戳问题多 PR 集中合并、CI 测试补强，说明项目正在系统性清理已知稳定性债务；但 28 条 PR 仍在待合并状态，合并队列存在一定积压。

---

## 社区热点

### 讨论热度最高

| Rank | Issue/PR | 评论数 | 主题 |
|---|---|---|---|
| 1 | [#6649](https://github.com/agentscope-ai/QwenPaw/issues/6649) | 13 | GPT-5.6 prompt caching 参数支持 |
| 2 | [#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) | 6 | 任务产出物不应堆积在 media 目录 |
| 3 | [#6667](https://github.com/agentscope-ai/QwenPaw/issues/6667) | 5 | DeepSeek 多轮 thinking mode 失败 |
| 3 | [#6642](https://github.com/agentscope-ai/QwenPaw/issues/6642) | 5 | 拖入文件应直接读原路径而非先上传 |

### 热点分析

**[#6649](https://github.com/agentscope-ai/QwenPaw/issues/6649) — GPT-5.6 prompt caching 支持（13 条评论）**：用户请求在 Responses API provider 中支持 `prompt_cache_key`、`prompt_cache_options`、`prompt_cache_breakpoint`，以在多轮 Agent 循环中复用缓存前缀。这是典型的 **成本与延迟敏感型用户诉求**，说明社区已有相当比例的用户在长会话场景中遇到 token 费用压力。评论区的深度讨论（13 条）表明该功能可能涉及 provider 层的架构设计分歧，值得维护者优先回应。

**[#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) + [#6642](https://github.com/agentscope-ai/QwenPaw/issues/6642) — 文件与产出物管理体验**：两条 issue 出自同一用户 @rerbin，共同指向 media 目录混乱和“上传-复制-读取”流程冗余的问题。用户明确对比“其他多数桌面 agent 工具”直接读取原路径的体验，反映了 **桌面版用户对本地文件系统集成深度的期望在提升**。

**[#6667](https://github.com/agentscope-ai/QwenPaw/issues/6667) — DeepSeek 多轮 thinking mode 失效**：用户在 v1.1.7 + DeepSeek V4 Pro 环境下发现 `reasoning_content` 在 OpenAI formatter 跳过 ThinkingBlock 后丢失，现有重试 fallback 仅对第一次生效。这指向 **模型兼容层的 ThinkingBlock 处理不完整**，影响面可能覆盖所有具备思考模式的 OpenAI 兼容模型。

---

## Bug 与稳定性

按严重程度排序。

### 🔴 严重（Critical）

| Issue | 描述 | Fix PR |
|---|---|---|
| [#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697) | **v2.1.0b1 桌面端向子进程注入 `PYTHONHOME`，导致 Windows 上所有 python 子进程启动即崩溃**（`encodings ModuleNotFoundError`）。升级至 beta 版后出现，影响所有依赖 python 子进程的功能 | ❌ 无 |

### 🟠 高（High）

| Issue | 描述 | Fix PR |
|---|---|---|
| [#6696](https://github.com/agentscope-ai/QwenPaw/issues/6696) | **WeChat iLink 通道一次性 `context_token` 被 typing indicator 消耗**，导致正式回复被拒绝（`ret=-2`）且 “working” 指示器卡死。微信通道核心收发链路受损 | ❌ 无 |
| [#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695) | **仅使用微信通道时，审批提示无法触达**（只能在 Console 里看到），5 分钟自动拒绝。涉及 `rm`/`kill` 等受限 shell 命令的安全审批流 | ❌ 无 |
| [#6667](https://github.com/agentscope-ai/QwenPaw/issues/6667) | DeepSeek 多轮对话 thinking mode 失败，`reasoning_content` 丢失，重试 fallback 仅首次生效 | ❌ 无（仅临时 workaround） |

### 🟡 中（Medium）

| Issue | 描述 | Fix PR |
|---|---|---|
| [#6690](https://github.com/agentscope-ai/QwenPaw/issues/6690) | `cron pause/resume` 不持久化 enabled 状态，重启后丢失 | ✅ [#6691](https://github.com/agentscope-ai/QwenPaw/pull/6691) |
| [#6683](https://github.com/agentscope-ai/QwenPaw/issues/6683) | App Center 安装 `qwenpaw-creator` 失败：插件顶层 `utils` 模块与全局 `utils` 命名冲突 | ✅ [#6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) |
| [#6624](https://github.com/agentscope-ai/QwenPaw/issues/6624) | Scroll 自动压缩不触发 `summarize_when_compact` 记忆流程，手动 `/compact` 可触发 | ✅ [#6629](https://github.com/agentscope-ai/QwenPaw/pull/6629) |
| [#6687](https://github.com/agentscope-ai/QwenPaw/issues/6687) | OpenRouter multimodal probe 将文档化能力覆盖为 false，导致能力探测结果不准确 | ❌ 无 |
| [#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684) | Matrix 频道启动失败无自动重试，服务重启后需手动重新保存频道 | ✅ [#6689](https://github.com/agentscope-ai/QwenPaw/pull/6689) |

### 🟢 低 / 已关闭

- [#5906](https://github.com/agentscope-ai/QwenPaw/issues/5906) 防重复功能误触发（已关闭）
- [#6673](https://github.com/agentscope-ai/QwenPaw/issues/6673) Frontend 会话窗口显示异常（已关闭）

> **稳定性判断**：微信通道两个高优 Bug（[#6696](https://github.com/agentscope-ai/QwenPaw/issues/6696)、[#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695)）和 Windows 严重回归（[#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697)）均无 fix PR 或仅 1 条评论，属于 **今日最需要维护者介入的缺口**。好消息是 5 个中等级 Bug 中 4 个已有对应 fix PR，修复管线畅通。

---

## 功能请求与路线图信号

### 可能纳入下一版本（已有 PR 支撑）

| Issue | 功能请求 | 对应 PR/状态 | 判断 |
|---|---|---|---|
| [#6690](https://github.com/agentscope-ai/QwenPaw/issues/6690) | cron 暂停/恢复状态持久化 | [#6691](https://github.com/agentscope-ai/QwenPaw/pull/6691) 已提交 | 低风险，预计快速合入 |
| [#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684) | 频道启动失败自动重试 | [#6689](https://github.com/agentscope-ai/QwenPaw/pull/6689) 已提交 | 共享重试契约，设计较完整 |
| [#6683](https://github.com/agentscope-ai/QwenPaw/issues/6683) | 插件顶层模块隔离 | [#6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) 已提交 | first-time-contributor，需 review 后合入 |
| — | ReMe 记忆搜索 reranker 支持 | [#6398](https://github.com/agentscope-ai/QwenPaw/pull/6398) 待合并（Under Review） | 新功能，后端已实现，可能进入下个 minor 版本 |
| — | Sandbox 未强制约束项上报 | [#6657](https://github.com/agentscope-ai/QwenPaw/pull/6657) 待合并 | 安全相关，建议优先 review |

### 社区呼声高、暂无 PR 的信号

| Issue | 功能请求 | 分析 |
|---|---|---|
| [#6649](https://github.com/agentscope-ai/QwenPaw/issues/6649) | GPT-5.6 prompt caching 参数支持 | 13 条评论为今日最高热度，成本优化诉求明确，但涉及 provider 架构设计，可能耗时较长 |
| [#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) | 任务产出物按任务建目录 | 与 [#6642](https://github.com/agentscope-ai/QwenPaw/issues/6642) 同源，改善 media 目录混乱问题；关联 PR [#6492](https://github.com/agentscope-ai/QwenPaw/pull/6492)（保留上传文件名）部分相关 |
| [#6455](https://github.com/agentscope-ai/QwenPaw/issues/6455) | 一个 agent 同时用多个模型运行并汇总结果 | 核心 Agent 架构级能力，涉及并行调度与结果聚合，短期实现难度高 |
| [#6694](https://github.com/agentscope-ai/QwenPaw/issues/6694) | 全局规则（类 `.agent` / `.claude` 顶层系统提示词） | 轻量级需求，可快速落地，建议社区确认后纳入 backlog |

---

## 用户反馈摘要

**1. 文件管理体验是桌面端高频痛点**
@rerbin 在 [#6642](https://github.com/agentscope-ai/QwenPaw/issues/6642) 和 [#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) 中连续反馈：拖入文件的“先上传复制再读取”流程“很奇怪”，且会在 media 目录“产生一堆额外的文件”；任务产出物全部堆积在 media 目录“很混乱”。这反映出 **桌面 Agent 用户对本地文件直读和工作区整洁度的预期在提高**，建议产品侧重新审视文件处理流水线。

**2. 微信通道用户处于“无法操作”状态**
@huyj1890 连续提交 [#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695) 和 [#6696](https://github.com/agentscope-ai/QwenPaw/issues/6696)：审批提示只在 Console 显示导致“不可能审批”，以及 typing indicator 吞掉 `context_token` 导致“回复被拒、指示器卡死”。**当用户只用 IM 通道时，核心交互链路完全断裂**，这是渠道支持中需要最高优先级修复的体验问题。

**3. 升级回归伤害信任感**
@AT8051 在 [#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697) 中报告升级 v2.1.0-beta.1 后“every python subprocess crashes at startup”，对 beta 质量构成明显负面影响。@Cederys 在 [#6624](https://github.com/agentscope-ai/QwenPaw/issues/6624) 中也表达了“不确定是设计如此还是缺陷”的困惑——自动压缩与手动 `/compact` 行为不一致，暴露了文档与实现之间的模糊地带。

**4. DeepSeek 用户的多轮稳定性诉求**
@xiaoman770521 在 [#6667](https://github.com/agentscope-ai/QwenPaw/issues/6667) 中提供了详细环境（v1.1.7 + DeepSeek V4 Pro + DashScope）和临时 workaround，指出 fallback“only works for the first occurrence”。用户配合度较高、描述专业，这类反馈对修复 ThinkingBlock 兼容性问题非常有价值。

**5. 自建服务用户的运维痛点**
@MCQSJ 在 [#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684) 中描述了自建 Matrix 场景下“每次服务器启动后都需要手动重新保存一次频道才能恢复连接”的重复劳动，反映出 **自托管用户对服务自愈能力的刚需**。

---

## 待处理积压

以下为长期未获维护者明确回应或处于长期待审状态的重要 Issue/PR，建议优先关注：

| 类型 | 编号 | 等待时长 | 说明 |
|---|---|---|---|
| Issue | [#6455](https://github.com/agentscope-ai/QwenPaw/issues/6455) 多模型并行运行 | 12 天（07-24 创建） | 架构级功能请求，用户 @rerbin 给出了明确使用场景（文件修改、事实核验），但暂无维护者回复。建议至少给出路线图层面的回应 |
| PR | [#6331](https://github.com/agentscope-ai/QwenPaw/pull/6331) 指定 Node.js 版本要求 | 14 天（07-22 创建） | first-time-contributor 的简单 chore PR，长期未合入容易打击新贡献者积极性 |
| PR | [#6398](https://github.com/agentscope-ai/QwenPaw/pull/6398) ReMe 记忆搜索 reranker 支持 | 13 天（07-23 创建） | 功能型 PR，已标记 Under Review，若持续搁置可能阻塞后续记忆搜索迭代 |
| PR | [#6492](https://github.com/agentscope-ai/QwenPaw/pull/6492) 上传文件保留原始文件名 | 9 天（07-27 创建） | 直接回应用户对文件管理体验的诉求（见 [#6642](https://github.com/agentscope-ai/QwenPaw/issues/6642)、[#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643)），建议加速 review |
| PR | [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) agentscope 兼容性与配置加载修复 | 5 天（07-31 创建） | 修复 [#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612)，first-time-contributor，涉及 proactive memory 响应，建议给予指引 |

> **噪音提醒**：[#6693](https://github.com/agentscope-ai/QwenPaw/issues/6693) 内容仅为 “DELTE”（已关闭）和 [#6681](https://github.com/agentscope-ai/QwenPaw/pull/6681)（test review bot 占位 PR）无实质内容，建议通过 issue 模板校验或 bot 自动标记来降低此类噪音。

---

## 健康度总结

| 维度 | 状态 | 说明 |
|---|---|---|
| 社区活跃度 | 🟢 高 | 19 Issues / 49 PR 日更新量，3 位新贡献者 |
| 修复速度 | 🟢 良好 | 5 个中等级 Bug 中 4 个已有对应 PR，时间戳问题多 PR 集中闭环 |
| 严重 Bug 响应 | 🔴 不足 | [#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697)、[#6696](https://github.com/agentscope-ai/QwenPaw/issues/6696)、[#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695) 三个高优问题均无 fix PR |
| 合并效率 | 🟡 一般 | 28 条 PR 待合并，多个 PR 等待超过 10 天 |
| 版本发布节奏 | ⚪ 无新版本 | 当前处于 2.x 迭代期（v2.1.0-beta.1 已发布） |

**当日重点建议**：优先处理微信通道双 Bug（[#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695)、[#6696](https://github.com/agentscope-ai/QwenPaw/issues/6696)）、Windows PYTHONHOME 回归（[#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697)）；疏通合并队列，至少对 [#6331](https://github.com/agentscope-ai/QwenPaw/pull/6331)、[#6492](https://github.com/agentscope-ai/QwenPaw/pull/6492) 这类低风险 PR 给予明确回应。

---

*本日报由 AI 自动生成，数据基于 2026-08-05 当日 GitHub 快照，仅供参考。*

</details>

</div>
