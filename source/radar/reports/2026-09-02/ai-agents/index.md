---
title: "OpenClaw 生态日报"
date: 2026-09-02
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# OpenClaw 生态日报 2026-09-02

> Issues: 138 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-02 00:00 UTC

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

**日期**：2026-09-02
**数据周期**：过去 24 小时

---

## 1. 今日速览

OpenClaw 今日维持高强度迭代节奏：过去 24 小时共产生 **138 条 Issue 更新**（112 新开/活跃、26 已关闭）和 **500 条 PR 更新**（355 待合并、145 已合并/关闭），同时发布了 **v2026.8.2 新版本**。Issue 活跃度较常规日明显抬升，多个 P0/P1 关键回归缺陷集中浮现（包括 Perplexity 插件启动崩溃、Windows doctor --fix 异常、2026.8.1/8.2 Gateway crash-loop 等），与昨日版本发布直接相关，**项目处于「热修复 + 稳定性回稳」阶段**。PR 端大型特性持续合入（插件图标打包、提供商登录、Cloud Workers 预热），主分支向前推进显著。

---

## 2. 版本发布

### 🚀 v2026.8.2 已发布

**主要亮点**：

- **Home 代理与工作区并行**：通过 `Cmd/Ctrl+Shift+H` 在右侧或底部 dock 打开 open Home，保持当前页面可见，支持预览/移除 work-context snapshot，或将选中文本附加到消息中（关联 #133632 / #133676）。
- **桌面 companion 体验改进**：本次同步推进 macOS companion 相关修复（与 #135272 描述的间歇性 `COMPANION_APP_UNAVAILABLE` 相关）。

**⚠️ 用户反馈的回归问题（影响升级决策）**：

- **#135171 [已关闭]**：2026.8.1 / 2026.8.2 出现 Gateway crash-loop，bundled Perplexity 插件需要 capability consent 但无法检查/启用/禁用 → 建议升级前先禁用或移除 perplexity 插件。
- **#135272 [P1 OPEN]**：macOS 截图/OCR/UI-control 间歇性 `COMPANION_APP_UNAVAILABLE`。
- **#134453 [P0 OPEN]**：Windows 上 `openclaw doctor --fix` 报 `file not found`，交互式 `openclaw doctor` 正常 → 建议 Windows 用户暂使用交互式 doctor。
- **#134925 [P1 OPEN]**：ARM64/Raspberry Pi 上 Gateway 主线程每次 agent turn 接近 100% CPU。

**迁移建议**：升级前备份配置；对 Perplexity、Windows 自动修复、ARM64 单板机用户建议在主分支进一步修复前观望。

---

## 3. 项目进展（已合并/关闭的重要 PR）

| 方向 | PR | 说明 |
|---|---|---|
| 渠道交付 | [#126424](https://github.com/openclaw/openclaw/pull/126424) | `fix(gateway): keep conversation delivery within agent bindings` — 修复多智能体场景下对话工具跨 agent 投递问题，覆盖 Discord/iMessage/Matrix/Mattermost/Slack/Telegram/Feishu 等渠道。 |
| 渠道发现 | [#122586](https://github.com/openclaw/openclaw/pull/122586) | `fix(doctor): stop scanning sibling account state directories` — 关闭 #68170，`openclaw doctor` 不再扫描其他账户状态目录。 |
| CLI 体验 | [#135273](https://github.com/openclaw/openclaw/pull/135273) | `fix(cli): keep agent exec run errors when cleanup fails` — 保留 `agent exec` 主错误码，正确分类超时。 |
| 测试稳定性 | [#134443](https://github.com/openclaw/openclaw/pull/134443) | `test(release): scope Plugin SDK temp cleanup` — CI 中 Plugin SDK 取消测试更稳定。 |
| 测试稳定性 | [#120105](https://github.com/openclaw/openclaw/pull/120105) | `fix(scripts): stabilize Vitest shard timing keys` — 修复 Vitest 分片时序键重排问题。 |
| 测试稳定性 | [#133897](https://github.com/openclaw/openclaw/pull/133897) | `test(ci): await checkout fixture cleanup` — CI 清理逻辑确定化。 |

**整体进度**：合并的 PR 集中在「渠道消息投递正确性 + doctor 体验 + 测试稳定性」三条线，是 v2026.8.2 发布后「先稳住再继续推特性」的典型节奏。功能侧大型 PR 仍处待合并（见下节）。

---

## 4. 社区热点

按评论数与 👍 数综合排序，今日社区关注度最高的议题如下：

| 类型 | 标题 | 链接 | 评论 | 👍 | 关注点 |
|---|---|---|---|---|---|
| 🦐 稳定性 | Realtime voice 状态无界保留 | [#116201](https://github.com/openclaw/openclaw/issues/116201) | 59 | 0 | 长期高优问题，realtime 会话资源/咨询状态无硬上限 |
| 🦞 稳定性 | 大型 SQLite 转录清理阻塞 gateway 事件循环 | [#112423](https://github.com/openclaw/openclaw/issues/112423) | 16 | 0 | P1，会话归档导致事件循环卡死 |
| 🦞 稳定性 | 多渠道转录/重放/上下文组装重复 umbrella | [#69208](https://github.com/openclaw/openclaw/issues/69208) | 14 | 0 | 影响 MSTeams/Telegram/Slack 等多渠道 |
| 🦞 安全 | sandbox `workspaceAccess: none` 仍可写 | [#37634](https://github.com/openclaw/openclaw/issues/37634) | 9 | **8** | 👍 数最高 — sandbox 隔离模型被破坏，安全影响 |
| 🌊 增强 | 内置 headless 浏览器 | [#53763](https://github.com/openclaw/openclaw/issues/53763) | 13 | 0 | 多层讨论，希望摆脱外部依赖 |
| 🦞 稳定性 | 强制 memory 重建使共享 DB 膨胀至 35 GB | [#135347](https://github.com/openclaw/openclaw/issues/135347) | 6 | 0 | 由 steipete 报告（核心维护者），影响数据恢复路径 |
| 🦞 稳定性 | Claude-CLI 工具调用 SDK 中断未传播 | [#128001](https://github.com/openclaw/openclaw/pull/128001) | — | — | requester abort → ACP spawn 的修复 |

**诉求归纳**：

1. **可靠性兜底**：用户对 v2026.8.x 的回归问题非常敏感，最关心「能不能不丢消息、不会 crash-loop」。
2. **隔离模型真实化**：sandbox `workspaceAccess: none` 但仍可写入的问题拿到 8 个 👍，反映出企业用户对真实隔离的强需求。
3. **跨渠道一致性**：转录、重放、上下文组装 umbrella 显示用户希望官方对「多渠道一致性」给出统一治理。
4. **能力开箱即用**：内置 headless 浏览器呼声较高，叠加 Agent-specific TTS/STT（#66252）说明用户希望减少外部依赖与多语言/多 Agent 场景的灵活配置。

---

## 5. Bug 与稳定性（按严重程度）

### 🔴 P0 — 关键回归 / 启动阻塞

| Issue | 描述 | Fix PR |
|---|---|---|
| [#135171](https://github.com/openclaw/openclaw/issues/135171) | 2026.8.1/8.2 Gateway crash-loop（Perplexity 插件） | 已关闭（hotfix），需关注后续 |
| [#134453](https://github.com/openclaw/openclaw/issues/134453) | Windows `doctor --fix` 报 file not found | 修复候选：#135395 |

### 🟠 P1 — 主要功能受影响

| Issue | 描述 | Fix PR |
|---|---|---|
| [#135347](https://github.com/openclaw/openclaw/issues/135347) | 强制 memory reindex 致共享 agent DB 膨胀至 35 GB，恢复路径会销毁 session | 暂无 |
| [#135661](https://github.com/openclaw/openclaw/pull/135661) | `openclaw node worker` 停止时 stdin/插件子进程持有 event loop 永不退出 | 暂无关联 fix |
| [#135272](https://github.com/openclaw/openclaw/issues/135272) | macOS companion UI-control 间歇性 `COMPANION_APP_UNAVAILABLE` | 暂无 |
| [#134925](https://github.com/openclaw/openclaw/issues/134925) | ARM64/Pi 上 Gateway 主线程 ~100% CPU | 暂无 |
| [#134557](https://github.com/openclaw/openclaw/issues/134557) | Control UI 审批 system-agent 配置变更被静默丢弃 | 暂无 |
| [#135305](https://github.com/openclaw/openclaw/issues/135305) | Session observer 在投递失败后自我禁用，announce 路径 Slack 消息被静默丢弃（错误日志为空 `{}`） | 暂无 |
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | Realtime voice 无界状态保留（评论 59，最热） | 暂无 |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) | 大型 SQLite 转录清理阻塞事件循环 | 暂无 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw 泄漏未收割的 hook/tool 子进程（zombie 累积） | 暂无 |
| [#115546](https://github.com/openclaw/openclaw/issues/115546) | CLI-budget compaction 4.9s 提前超时，~100% 失败 | 暂无 |
| [#117262](https://github.com/openclaw/openclaw/issues/117262) | SQLite 3 个并发写句柄导致 ~33s 事件循环停顿（DEF-61） | 暂无 |
| [#121187](https://github.com/openclaw/openclaw/issues/121187) | yield 后 requester 完成重试 NO_REPLY | 暂无 |
| [#113130](https://github.com/openclaw/openclaw/issues/113130) | Moonshot/Kimi 拒绝含父级 anyOf 的工具 schema | 暂无 |

### 🟡 P2 — 行为异常 / 用户体验

- [#116512](https://github.com/openclaw/openclaw/issues/116512) Telegram 进度条 snapshot ID 变化时首条评论重复
- [#133956](https://github.com/openclaw/openclaw/issues/133956) `session.members.add` 接受永不匹配的 channel-scoped actor id
- [#133855](https://github.com/openclaw/openclaw/issues/133855) Browser Talk `agent-consult` 将内部 prompt 持久化为用户轮次
- [#116348](https://github.com/openclaw/openclaw/issues/116348) mention-gated 群组「无回复」回退刷屏无法抑制
- [#115437](https://github.com/openclaw/openclaw/issues/115437) claude-cli runtime 缺少 fast mode 支持
- [#116315](https://github.com/openclaw/openclaw/issues/116315) ChatGPT OAuth 限流 + 回退链静默失效
- [#135566](https://github.com/openclaw/openclaw/issues/135566) Utility simple-completion 忽略 Claude CLI runtime
- [#134557](https://github.com/openclaw/openclaw/issues/134557) Control UI 审批 system-agent 提案被静默丢弃
- [#41120](https://github.com/openclaw/openclaw/issues/41120) Browser-heavy 会话阻塞所有主通道
- [#68105](https://github.com/openclaw/openclaw/issues/68105) RTL bidi 隔离在 gateway/outbound 边界缺失
- [#90711](https://github.com/openclaw/openclaw/issues/90711) launchd plist StandardErrorPath 硬编码 `/dev/null`
- [#98753](https://github.com/openclaw/openclaw/issues/98753) `openclaw health/cron list` 在 doctor fix 后 WebSocket 1006 关闭
- [#57031](https://github.com/openclaw/openclaw/issues/57031) `QueuedFileWriter` 静默吞写错误
- [#111923](https://github.com/openclaw/openclaw/issues/111923) Dreaming REM 阶段提取噪声主题无过滤
- [#62968](https://github.com/openclaw/openclaw/issues/62968) subagent announce direct-send 错误被静默吞掉
- [#87407](https://github.com/openclaw/openclaw/issues/87407) Anthropic provider `UND_ERR_SOCKET` 静默回退
- [#103804](https://github.com/openclaw/openclaw/issues/103804) service-env 生成器双重引号破坏 AWS_REGION
- [#112349](https://github.com/openclaw/openclaw/issues/112349) memory-core dreaming deep-phase 忽略 minRecallCount

### 🦞 已关闭/已修复

- [#135576](https://github.com/openclaw/openclaw/issues/135576) Codex-harness sessions_spawn detached requester-settle 未绑定
- [#135414](https://github.com/openclaw/openclaw/issues/135414) 联合 memory/wiki 搜索遗漏 memory index repair 提示
- [#134975](https://github.com/openclaw/openclaw/issues/134975) LINE select 控件丢弃问题与溢出选项
- [#134421](https://github.com/openclaw/openclaw/issues/134421) 多 agent fleet 上 `channels login/logout` 不可达

---

## 6. 功能请求与路线图信号

| 方向 | Issue / PR | 状态 | 路线图概率 |
|---|---|---|---|
| Cloud Workers 预热 | [#134931](https://github.com/openclaw/openclaw/pull/134931) | OPEN, maintainer 维护中 | 🟢 高 — 续 #133822 的姊妹工作 |
| 插件热加载 | [#135599](https://github.com/openclaw/openclaw/pull/135599) | OPEN, XL, maintainer | 🟢 高 — steipete 主推，覆盖 memory-lancedb/canvas/codex 等 |
| 提供商登录统一 | [#134431](https://github.com/openclaw/openclaw/pull/134431) | OPEN, XL, P1 | 🟢 高 — 跨 chat/控制 UI 同一登录流 |
| 插件图标打包 | [#131511](https://github.com/openclaw/openclaw/pull/131511) + [#131510](https://github.com/openclaw/openclaw/pull/131510) | OPEN, L/XL, maintainer | 🟢 高 — 渠道设置面板已存在重复数据问题 |
| 安装策略警告 | [#120900](https://github.com/openclaw/openclaw/pull/120900) | CLOSED, 已合入 | ✅ 完成 |
| 内置 headless 浏览器 | [#53763](https://github.com/openclaw/openclaw/issues/53763) | 讨论中 | 🟡 中 — 需求强但实现复杂 |
| Agent-specific TTS/STT | [#66252](https://github.com/openclaw/openclaw/issues/66252) | 讨论中 | 🟡 中 — 多语言/多 agent 真实场景 |
| Per-model generation timeout | [#8724](https://github.com/openclaw/openclaw/issues/8724) | 长期讨论 | 🟡 中 — Google/Gemini Flash 死循环场景 |
| Signal 频道 live tool-call 进度 | [#77202](https://github.com/openclaw/openclaw/issues/77202) | 讨论中 | 🟡 中 — 跨渠道一致性 |
| 调度落点 ACK/接收 telemetry | [#76247](https://github.com/openclaw/openclaw/issues/76247) | 讨论中 | 🟡 中 — 多 agent 运维需要 |
| Per-session identity 注入（stdio MCP） | [#127358](https://github.com/openclaw/openclaw/issues/127358) | 讨论中，需安全评审 | 🟡 中 |
| 插件熔断器 | [#41899](https://github.com/openclaw/openclaw/issues/41899) | 讨论中 | 🟠 较低 — 需更明确的"是什么"再决定 |
| linux/riscv64 Docker 镜像 | [#11977](https://github.com/openclaw/openclaw/issues/11977) | 讨论中 | 🟠 较低 — 边缘平台 |
| Bedrock anthropic_beta 自定义 | [#39734](https://github.com/openclaw/openclaw/issues/39734) | 讨论中 | 🟠 较低 — 利基但具体 |
| Chat-first Android 表面 | [#46058](https://github.com/openclaw/openclaw/issues/46058) | 讨论中（非上游） | 🟠 较低 — 第三方 fork 探索 |
| 浏览器专用 lane | [#41120](https://github.com/openclaw/openclaw/issues/41120) | 讨论中 | 🟡 中 — 真实痛点 |

**关键观察**：维护者 steipete 当前在 PR 端高强度输出（XL size 大量出现），社区侧大型 PR 多由其与 @Patrick-Erichsen、@obviyus、@RomneyDa 等核心贡献者推进，路线图呈「平台化（providers/cloud workers/plugins）+ 体验一致性（login/discovery/UI）」并行的态势。

---

## 7. 用户反馈摘要

### 痛点场景

1. **升级即坏**：v2026.8.x 在 Perplexity 插件、Windows doctor、ARM64、macOS companion 等多个表面引入回归，用户对「跨小版本升级」失去安全感。
2. **静默失败普遍**：`QueuedFileWriter` 吞错、announce 路径错误为空 `{}`、No-Reply 回退刷屏、Control UI 审批被丢 —— 用户对"系统不告诉我发生了什么"普遍不满。
3. **会话/数据恢复恐惧**：35 GB memory DB 膨胀（#135347）、删除恢复 DB 销毁 session —— 用户担心操作"踩雷"后无法回到正常状态。
4. **多 agent 复杂度**：#134421 显示 `agents.ownership: "explicit"` 下 `channels login/logout` 不可达，#117262 显示 3 个写句柄冲突 —— 多 agent 部署仍有不少边角未覆盖。
5. **跨渠道一致性差**：Telegram snapshot ID 变化致重复、Slack observer 自我禁用致丢失、line select 控件丢问题 —— 同样的 announce 模式被各渠道实现出不同的 bug。
6. **回退链不透明**：ChatGPT OAuth 限流、Anthropic 静默回退到 OpenAI/Codex —— 用户不知道是 fallback 在工作。

### 满意方向

- **Plugins SDK / 插件发现**（#131510、#131511 推进）：用户对"统一的插件元数据"普遍期待。
- **Cloud Workers 预热**（#134931）：减少冷启动等待，UX 直觉改善。
- **doctor 改进**（#135395、#122586 已合入）：用户乐于看到 doctor 行为更可预测。
- **Home agent 并行 dock**：v2026.8.2 新功能让"工作 + Home"同时可见，社区初步反响正向。

### 反映的开发者画像

- 大量 issue 来自多 agent（20+ agent 单 gateway）部署场景
- 平台覆盖完整：Windows、macOS、Linux、ARM64/Pi、Docker（amd64/arm64，未来 riscv64）
- 渠道覆盖 30+（Discord / Telegram / Slack / Signal / LINE / iMessage / Matrix / Mattermost / MS Teams / Feishu / WhatsApp / Zalo / Tlon / Reef / Raft / Buzz / A2A / SMS / IRC / QA-Channel / Twitch 等）
- 中东/东亚本地化需求浮现：RTL bidi（#68105）、Feishu/Twitch/Zalo 等本地渠道

---

## 8. 待处理积压（提醒维护者关注）

### 长期未响应 / 高优先级

| Issue | 标题 | 创建 | 优先级 | 备注 |
|---|---|---|---|---|
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | Umbrella: 重复转录/重放/上下文组装 | 2026-04-20 | P1 | 14 评论，影响多渠道 |
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | Realtime voice 状态无界保留 | 2026-07-30 | P1 | 59 评论，长期高优 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool 子进程泄漏 | 2026-06-29 | P1 | 👍 1，无 fix PR |
| [#117262](https://github.com/openclaw/openclaw/issues/117262) | SQLite 3 写句柄争用 DEF-61 | 2026-08-01 | P1 | 👍 2，无 fix PR |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | 内置 headless 浏览器 | 2026-03-24 | P3 | 13 评论，需求强烈但未排期 |
| [#37634](https://github.com/openclaw/openclaw/issues/37634) | sandbox `workspaceAccess: none` 仍可写 | 2026-03-06 | P1 | 👍 8，**安全相关**仍 OPEN |
| [#115546](https://github.com/openclaw/openclaw/issues/115546) | CLI-budget compaction 提前超时 | 2026-07-29 | P1 | 100% 失败率，无 fix |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) | 大 SQLite 转录清理阻塞事件循环 | 2026-07-21 | P1 | 16 评论，无 fix |
| [#121187](https://github.com/openclaw/openclaw/issues/121187) | yield 后 requester 重试 NO_REPLY | 2026-08-09 | P1 | 无 fix |

### 长期未合入的 PR

| PR | 标题 | 创建 | 备注 |
|---|---|---|---|
| [#96662](https://github.com/openclaw/openclaw/pull/96662) | `fix(codex): surface native subagent task updates` | 2026-06-25 | 已 stale，需 proof |
| [#95132](https://github.com/openclaw/openclaw/pull/95132) | `refactor(skills): trim bundled starter set` | 2026-06-19 | 依赖 #95664 |

### 建议关注

1. **sandbox 隔离缺陷 #37634** 安全相关且 8 个 👍，应优先处理。
2. **#116201 (realtime voice)** 评论最多（59 条），可能已有收敛但仍需明确计划。
3. **Cloud Workers 预热 #134931** 与 **插件热加载 #135599** 由核心维护者主推，建议优先评审放行以稳住 v2026.9 路线图。
4. **多渠道一致性 umbrella #69208** 应有 maintainer 给出处置意见（拆分 / 统一修复 / 文档化）。
5. **多 agent 部署文档/错误信息** 需补强：`agents.ownership: "explicit"` 下多个工作流不可达是反复出现的主题。

---

## 项目健康度评估

| 维度 | 评级 | 说明 |
|---|---|---|
| 迭代速度 | ⭐⭐⭐⭐⭐ | 500 PR/日，节奏非常密集 |
| 稳定性 | ⭐⭐☆☆☆ | 多个 P0/P1 回归集中在 8.x 系列，doctor 表现不稳定 |
| 社区活跃 | ⭐⭐⭐⭐ | 评论与 👍 数健康，跨平台/跨渠道用户参与深 |
| 维护响应 | ⭐⭐⭐ | P0/P1 通常当日 hotfix，但长期 P1 仍有积压 |
| 路线图清晰度 | ⭐⭐⭐⭐ | 大型特性集中（cloud workers、plugin hot-reload、provider login）方向明确 |

**总评**：项目处于「高速迭代 + 阶段性回稳」窗口。v2026.8.2 引入若干 UX 改进（Home agent 并行），但也带回了 P0 级回归。建议维护者将本周焦点放在「稳定性收敛」（sandbox 隔离、worker stop 退出、SQLite 争用、memory DB 膨胀）后再推下一波特性。

---

*报告基于 GitHub 公开数据生成。所有链接指向 `github.com/openclaw/openclaw`。*

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态 · 横向对比分析报告

**报告日期**：2026-09-02
**覆盖项目**：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw（共 9 个）

---

## 1. 生态全景

个人 AI 助手与自主智能体赛道已进入**多极竞速 + 平台化深化**的成熟期：本日 9 个项目合计产生约 700 条 Issue/PR 更新，其中 OpenClaw、IronClaw、CoPaw 三家占据 70% 以上流量，体现明显的"头部虹吸"。技术焦点高度收敛于 **MCP 协议工程化、Provider 抽象下沉、多 Agent 协同、沙箱安全隔离** 四大主题，同时 v2026.8.x、v2.2.0-beta、v1.4.0 等多个版本窗口并行推进，"安全回归 + Provider 生态扩张 + 设计系统收尾"成为下一阶段共性主线。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | 当日 Release | 当日合并率 | 健康度 | 当前阶段 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 138 | 500 | ✅ v2026.8.2 | ~29% (145/500) | ⭐⭐⭐ | 高速迭代 + 稳定性回稳 |
| **NanoBot** | 6 | 19 | ❌ | ~47% (9/19) | ⭐⭐⭐⭐ | 稳健迭代期 |
| **Zeroclaw** | 5 | 50 | ❌ | ~30% (15/50) | ⭐⭐⭐ | 安全集中修复 |
| **PicoClaw** | 3 | 4 | ❌ | 0% (0/4) | ⭐⭐⭐ | 中低活跃，外部 PR 积压 |
| **NanoClaw** | 2 | 13 | ❌ | ~8% (1/13) | ⭐⭐⭐⭐ | providers 重构冲刺 |
| **IronClaw** | 16 | 24 | ❌ | ~38% (9/24) | ⭐⭐⭐⭐ | v1.4.0 收尾 + v1.5 预研 |
| **LobsterAI** | 13 | 9 | ❌ | ~56% (5/9) | ⭐⭐⭐ | 清理 + 新功能合并 |
| **Moltis** | 2 | 3 | ❌ | ~67% (2/3) | ⭐⭐⭐⭐⭐ | 维护性更新，质量优秀 |
| **CoPaw** | 21 | 15 | ✅ v2.2.0-beta.6 | 高（具体未披露） | ⭐⭐⭐⭐ | v2.2.0 GA 冲刺 |

**关键观察**：
- **OpenClaw 一家独大**：500 PR/日 是第二名 Zeroclaw (50) 的 10 倍，规模化效应显著
- **Moltis 合并率最高**（67%），但绝对量小，体现"小而精"的维护节奏
- **PicoClaw 合并率 0%** 当日无 PR 合并，且 Exa PR 被 stale 关闭，社区响应链路值得警惕

---

## 3. OpenClaw 在生态中的定位

### 核心参照系地位

OpenClaw 以 **138 Issue / 500 PR** 的当日体量稳居生态核心参照，其迭代速度比第二梯队（Zeroclaw/IronClaw）高出一个数量级，是事实上的"行业基准线"。

### 优势对比

| 维度 | OpenClaw | 同类最佳对比 |
|---|---|---|
| **渠道覆盖** | 30+ 渠道（Discord/Telegram/Slack/Signal/LINE/iMessage/Matrix/Mattermost/MS Teams/Feishu/WhatsApp/Zalo 等） | NanoBot/CoPaw 主要覆盖 5-8 个核心渠道 |
| **平台覆盖** | Windows/macOS/Linux/ARM64-Pi/Docker（amd64/arm64 + 未来 riscv64） | Zeroclaw/NanoBot 主要聚焦 Linux/Docker |
| **多 Agent 编排** | 显式支持 20+ agent 单 gateway 部署 | NanoBot/CoPaw 有雏形但未规模化 |
| **桌面伴侣体验** | macOS companion + Home agent 并行 dock | LobsterAI/CoPaw 有桌面端但深度有限 |

### 技术路线差异

- **OpenClaw**：**平台化 + 插件生态** 战略（Plugins SDK、Provider 登录、Cloud Workers）
- **NanoBot / IronClaw**：**核心抽象打磨** 路线（Agent loop 重构、capability stage 分解）
- **Zeroclaw / NanoClaw**：**Provider 抽象下沉** 战略（运行时/宿主/setup 三层契约）
- **CoPaw**：**桌面优先 + 长期记忆** 路线（ReMe 集成、Windows 打包）
- **Moltis**：**轻量 + 部署友好**（Docker 一等公民、MCP 类型化）

### 社区规模

OpenClaw 的社区参与深度（30+ 渠道、5+ 平台、本地化 RTL/Feishu/Twitch/Zalo）显著领先，单日评论数与 👍 数活跃度是中小项目的 5-10 倍。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **MCP 协议工程化** | OpenClaw、Zeroclaw、NanoBot、NanoClaw、IronClaw、Moltis、CoPaw | MCP 类型安全（streamable-http 别名识别）、目录规模化（47k 工具 tool_search 不可达）、安全治理（stdio 命令注入边界） |
| **Provider 抽象下沉** | NanoClaw（zvi-fried 6 PR 重构）、Zeroclaw（多模型 profile）、IronClaw（NEAR AI 能力标签） | 单一凭证托管多模型、契约标准化降低接入门槛 |
| **多 Agent 协同与异常回流** | OpenClaw、CoPaw（#7450 主子 Agent 心跳缺位） | 子 Agent 失败时主 Agent 主动巡检、turn-state 并发安全 |
| **沙箱安全隔离** | OpenClaw（#37634 workspaceAccess:none 仍可写，8 👍）、Zeroclaw（#8279 delegate 越权）、NanoClaw（#3680 mount 绕过）、CoPaw（#7470 MCP 白名单不生效）、Moltis（#1249 容器 loopback 识别） | 隔离模型真实化、能力继承安全、白名单执行一致性 |
| **静默失败治理** | OpenClaw（QueuedFileWriter/announce 空错）、Zeroclaw（#9779 SOP 无报错）、NanoClaw（#3427 send_card 谎报成功） | 用户对"系统不说发生了什么"的普遍不满 |
| **静默回退/计费透明** | OpenClaw（ChatGPT OAuth 限流静默回退）、LobsterAI（#2589 plan mode 200 credits） | 回退链与配额消耗的可观测性 |
| **设计系统统一** | IronClaw（4 条配套 PR 集中替换）、CoPaw（Console UI 打磨）、NanoBot（WebUI 新手引导） | 共享组件下沉、Storybook/InlineNotice 复用 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 全渠道多 Agent 网关 | 企业 / 重度 IM 用户 / 多平台部署者 | 微内核 + 插件市场 + Cloud Workers |
| **NanoBot** | Agent loop 稳健性 + TUI | 开发者 / 命令行重度用户 | ReAct 阶段协调 + 工具执行边界分离 |
| **Zeroclaw** | Provider 灵活性 + ZeroCode IDE | 多模型实验者 / IDE 重度用户 | 多模型 profile + SOP 无头运行 |
| **PicoClaw** | 轻量级硬件亲和 | 树莓派 / 旧安卓 / 边缘设备玩家 | 低资源占用 + 群聊上下文 |
| **NanoClaw** | Provider 契约重构 | 框架集成者 / 第三方 Provider 作者 | 三层契约（runtime/host/setup）+ 安装校验器 |
| **IronClaw** | WebUI 设计系统 + 大型重构 | 设计师 / 产品体验敏感用户 | DESIGN.md 真理之源 + capability stage 分解 |
| **LobsterAI** | Onboarding + Artifacts 分享 | 新用户 / 内容创作者 | 视频分享链路 + 首次使用埋点 |
| **Moltis** | Docker 一等公民 + MCP 诊断 | 容器化部署者 / MCP 集成者 | typed MCP transport + doctor 诊断准确 |
| **CoPaw** | 桌面端 + 长期记忆（ReMe） | Windows/macOS 桌面用户 | PyInstaller 打包 + ReMe Python 集成 |

**关键差异点**：
- **OpenClaw vs IronClaw**：前者平台化扩张（横向），后者能力内化（纵向）
- **NanoClaw vs Zeroclaw**：前者契约抽象（理论先行），后者产品形态成熟（ZeroCode IDE）
- **CoPaw vs Moltis**：前者桌面重客户端，后者轻量容器化

---

## 6. 社区热度与成熟度分层

### 第一梯队：高速规模化迭代

- **OpenClaw**（500 PR/日）、**IronClaw**（40 更新/日）、**CoPaw**（36 更新/日 + beta.6）
- 特征：大型重构并行、版本窗口密集、社区响应快但容易引入回归

### 第二梯队：稳健迭代 + 平台化深化

- **NanoBot**（19 PR/日，47% 合并率）、**NanoClaw**（13 PR/日，providers 重构集中）
- 特征：节奏稳定、PR 评审吞吐量高、技术债清理与新特性并行

### 第三梯队：集中修复 + 质量巩固

- **Zeroclaw**（50 PR/日但仅 30% 合并率，安全回归集中）、**LobsterAI**（22 更新/日，清理 stale）
- 特征：审阅带宽成瓶颈、安全与计费信任议题浮现

### 第四梯队：低活跃 / 风险信号

- **PicoClaw**（4 PR/日 0 合并）、**Moltis**（3 PR/日但质量优秀）
- 特征：前者外部贡献者响应链路停滞，后者处于维护期

---

## 7. 值得关注的趋势信号

### 🔥 趋势一：MCP 从"协议"走向"操作系统级基础设施"

**证据**：IronClaw #8012（47k 工具目录不可达）、Zeroclaw #9841（SOP 无头运行）、NanoBot #5251（MCP Apps host）、Moltis #1251（typed MCP transport）、CoPaw #7470（MCP 白名单不生效）

**对开发者的意义**：MCP 正在从单点工具协议演化为需要解决**规模化（数万工具）、类型安全（多 transport）、安全治理（白名单/命令注入）**的复合系统。未来 6 个月，"MCP 工具网关"可能成为独立的产品品类。

### 🔥 趋势二："诚实性修复"成为新的质量基线

**证据**：NanoClaw #3427（send_card 谎报成功）、Zeroclaw #9896（启动横幅说 Memory:none 但实际在用）、OpenClaw 多个静默失败 issue

**对开发者的意义**：用户对**系统状态展示与实际状态的一致性**、**计费透明度**、**错误信号完整性** 的容忍度持续下降。"不撒谎的日志"和"诚实的 UI 状态"正在从 nice-to-have 变为 must-have。

### 🔥 趋势三：安全治理进入"能力继承"深水区

**证据**：OpenClaw #37634（sandbox 失效 8 👍）、Zeroclaw #8279（delegate 越权 S0 70 天未修）、NanoClaw #3680（mount 白名单绕过）、CoPaw #7470（MCP 白名单未生效）

**对开发者的意义**：父 Agent 对子 Agent 的能力过滤、容器 mount 的真实隔离、MCP 工具的 per-tool 权限——这些"能力继承"问题是 AI Agent 系统特有的安全挑战，传统的进程级沙箱模型不足以应对。

### 🔥 趋势四：Provider 抽象从"配置层"下沉到"契约层"

**证据**：NanoClaw zvi-fried 一人贡献 6 条契约 PR、Zeroclaw #9809（多模型 profile）、IronClaw #7970/#7971（能力标签端到端贯通）

**对开发者的意义**：第三方模型/Agent 引擎的接入正在从"写配置文件"走向"实现标准契约"，未来 Provider 生态可能出现类似 Kubernetes CRD 的标准化模式。

### 🔥 趋势五：多 Agent 协同的"心跳与异常回流"成为新瓶颈

**证据**：CoPaw #7450（主子 Agent 异常不汇报）、OpenClaw #117262（SQLite 3 写句柄争用）、IronClaw #8016（lock-free turn-state 间歇超时）

**对开发者的意义**：随着单 gateway 多 Agent 部署成为常态，**异步编排层的心跳、超时、死锁检测** 将成为下一个需要系统性解决的问题域。

---

## 总结建议

| 角色 | 建议 |
|---|---|
| **技术决策者** | 关注 OpenClaw/IronClaw/CoPaw 的稳定性收敛窗口；评估 MCP 工具网关作为独立基础设施的可行性 |
| **AI 智能体开发者** | 优先学习 MCP typed transport 与 Provider 契约模式；警惕"静默失败"和"能力继承"两类陷阱 |
| **生态观察者** | 关注 NanoClaw providers 重构与 IronClaw v1.5 传输层演进，这两条线可能定义下一年的事实标准 |

---

*报告基于 2026-09-02 各项目 GitHub 公开数据生成 · 横向对比维度：活跃度、技术方向、定位、成熟度、趋势信号*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目日报

**日期：2026-09-02**

---

## 1. 今日速览

NanoBot 今日保持中高活跃度，过去24小时内共产生 **6 条 Issue 更新** 和 **19 条 PR 更新**，整体呈现"高频小步快跑"的开发节奏。Issue 侧新开/活跃 4 条、关闭 2 条；PR 侧仍有 10 条待合并、9 条已合并或关闭，**当日合并率约 47%**，迭代效率良好。今日工作集中在三个方向：**(1) Agent 执行循环的稳健性修复**（后台任务、上下文压缩、工具调用边界）；**(2) Channel/WebUI 的体验打磨**（Telegram 富文本流式、WebSocket 健康检查、新手引导）；**(3) 安全与沙箱**（per-session sandbox、ephemeral runtime context）。无新版本发布。

---

## 2. 版本发布

本周期无新 Release 发布。

---

## 3. 项目进展

今日合并/关闭的 PR 较多，覆盖多个关键模块：

### 🔧 Agent 核心循环改进
- **#5430** [合并] *fix(agent): release completed task groups* — 修复 `AgentLoop._active_tasks` 在任务完成后残留空集合的内存泄漏问题，配套单任务、多任务、替换组三种生命周期用例的测试。
  🔗 https://github.com/HKUDS/nanobot/pull/5430

- **#5569** [合并] *refactor(agent): extract tool execution boundary* — 将工具调用的准备、执行、批处理、错误观测和安全分类从 `AgentRunner` 抽出至独立的 `nanobot.agent.tools.execution` 边界，让 `AgentRunner` 回归 ReAct 阶段协调职责。
  🔗 https://github.com/HKUDS/nanobot/pull/5569

- **#5622** [关闭] *fix(dream): stop duplicating SOUL/USER/MEMORY into the Dream prompt* — 修复 Dream 整合流程中 `SOUL.md` / `USER.md` / `memory/MEMORY.md` 被重复加载（既通过 `process_direct` 又通过 `build_dream_prompt()`）的 prompt 浪费问题。
  🔗 https://github.com/HKUDS/nanobot/pull/5622

### 💬 Channel / TUI 修复
- **#5621** [关闭] *fix(tui): preserve input typed after submit* — 修复 TUI 中提交后丢失用户已输入内容的回归问题，保留原有 IME 延迟提交行为；测试覆盖 163 项全绿。
  🔗 https://github.com/HKUDS/nanobot/pull/5621

- **#5617** [关闭] *fix(websocket): stop treating SO_ACCEPTCONN as portable* — 移除 listener 健康检查中对非可移植 socket 选项 `SO_ACCEPTCONN` 的依赖，**修复了 macOS / BSD 平台下 WebSocket Channel 启动崩溃的 P1 级回归**。
  🔗 https://github.com/HKUDS/nanobot/pull/5617

### 📜 文档与体验
- **#5604** [合并] *docs(edit_file): state that match selectors are mutually exclusive* — 明确 `edit_file` 工具的 `occurrence` / `line_hint` / `replace_all` 三种匹配选择器互斥，与运行时行为保持一致。
  🔗 https://github.com/HKUDS/nanobot/pull/5604

### 🚪 关闭但未合并
- **#5603** [关闭/invalid] *Detect a turn that claims an action it never performed* — 关于"幻觉执行"的检测提案被判定为 invalid，但相关讨论对 #1697 的追踪仍有价值。
  🔗 https://github.com/HKUDS/nanobot/pull/5603

### 🌟 新增闭环
- **#5428** Issue 被 **#5623** PR 接续（见下文待处理），**#5586** Issue 被 **#5619** PR 接续，**#5513** Issue 被 **#5620** PR 接续，说明社区反馈到实现的响应链路通畅。

整体看，NanoBot 在 **Agent 资源治理**、**跨平台兼容性**、**记忆/上下文效率** 三个维度上均有实质推进，项目健康度良好。

---

## 4. 社区热点

按评论数与影响面排序：

| 排名 | 议题 | 类型 | 评论 | 信号 |
|------|------|------|------|------|
| 1 | **#2061** [OPEN] Bug: 工作区内无法复制文件 | Bug | 3 | 用户实际工作流受阻，agent 行为异常 |
| 2 | **#5251** [OPEN] MCP Apps host for WebUI | Enhancement | 3 | 体现 MCP 生态向 UI 集成的趋势 |
| 3 | **#5513** [CLOSED] cron 路由与批量归档 | Feature | 1 | 运营场景痛点，已被 PR #5620 接续 |

- **#2061**：用户在使用飞书与 nanobot 对话时，要求复制工作区文件却只能看到 agent 反复 `list_dir` + `read_file`，始终不执行写入操作——这与今日新合并/待合并的 **#5626（`copy_file` / `move_file` 工具）** 完美呼应，说明社区诉求已被捕获。
  🔗 https://github.com/HKUDS/nanobot/issues/2061

- **#5251**：提议 WebUI 端支持 MCP Apps（`io.modelcontextprotocol/ui`），把 MCP 调用结果渲染为可交互 UI 组件，是 MCP 协议演进的天然延伸。
  🔗 https://github.com/HKUDS/nanobot/issues/5251

- **#5513**：Cron 结果需要支持可配置通道投递与批量归档，已落地为 PR #5620。
  🔗 https://github.com/HKUDS/nanobot/pull/5620

---

## 5. Bug 与稳定性

| 严重度 | 议题 | 描述 | Fix 状态 |
|--------|------|------|----------|
| 🔴 **P1** | #5617 | `SO_ACCEPTCONN` 在 macOS / BSD 不可移植，导致 WebSocket listener 健康检查异常 | ✅ 已关闭（已合并修复） |
| 🟠 **P2** | #2061 | 工作区内文件复制操作 agent 无法完成（飞书渠道） | 🛠 **#5626** 已新增 `copy_file` / `move_file` 工具待审 |
| 🟠 **P2** | #5624 | WebUI 新建 pane 在首条消息持久化前无法删除 | 🛠 PR #5624 已提交（含 e2e 回归测试） |
| 🟠 **P2** | #5622 | Dream 整合 prompt 重复加载 SOUL/USER/MEMORY | ✅ 已关闭 |
| 🟠 **P2** | #5621 | TUI 提交后输入内容丢失 | ✅ 已关闭 |
| 🟡 **P2** | #5428 | `AgentLoop` 完成后残留空任务集合导致内存累积 | 🛠 **#5623** PR 已提交（fix #5428） |

**关键回归风险**：#5617 修复之前，macOS / BSD 用户的 WebSocket Channel 基本不可用，属于典型的平台可移植性陷阱，已在 24 小时内闭环，值得肯定。

🔗 https://github.com/HKUDS/nanobot/pull/5617
🔗 https://github.com/HKUDS/nanobot/pull/5624
🔗 https://github.com/HKUDS/nanobot/pull/5623

---

## 6. 功能请求与路线图信号

### 高确定性（已有对应 PR 跟进）
1. **#5626** *feat(tools): add copy_file and move_file* — 为 filesystem 工具集补齐 `copy_file` / `move_file`，回应 #2061。**下个版本极有可能纳入**。
   🔗 https://github.com/HKUDS/nanobot/pull/5626

2. **#5620** *feat(cron): configurable delivery + batch archive* — 直接对应已关闭 Issue #5513。已进入 PR 队列。
   🔗 https://github.com/HKUDS/nanobot/pull/5620

3. **#5619** *feat(runtime-context): ephemeral blocks* — 对应 #5586，让运行时上下文块可选择不进入历史持久化。
   🔗 https://github.com/HKUDS/nanobot/pull/5619

4. **#5625** *feat(webui): guide first-run AI setup* — 用"Choose your AI"新手引导替代初次安装时的错误态，提升首因体验。
   🔗 https://github.com/HKUDS/nanobot/pull/5625

5. **#5283** *feat(workspace): per-session sandbox isolation* — 为非 WebUI channel 提供 per-session 文件沙箱，安全方向的关键演进。
   🔗 https://github.com/HKUDS/nanobot/pull/5283

### 中等确定性（方向明确，待 PR）
- **#5493**（文档预览）：增加 `.html` / `.txt` / `.md` 文档的原生预览（建议 iframe srcdoc 沙箱方案）。
  🔗 https://github.com/HKUDS/nanobot/issues/5493

- **#5586**（ephemeral runtime-context）：已被 #5619 PR 接续，预计纳入下版本。

### 长期方向
- **#5251** MCP Apps host — 反映 WebUI 走向"协议化组件渲染"的趋势，路线图级信号。

---

## 7. 用户反馈摘要

> ⚠️ 多数条目评论量较低，以下基于可见评论与摘要提炼：

- **真实痛点**：用户通过 **飞书** 与 nanobot 对话时，复制文件类指令无法被正确执行（#2061），表面上是工具缺失，根因是模型在没有显式 `copy_file` 工具时倾向于自我循环读取。
- **运营场景诉求**：Cron 任务结果应支持投递到指定通道而非全部灌入当前会话，避免"运维噪音污染个人聊天"（#5513 → #5620）。
- **体验期待**：WebUI 用户希望看到 **文档预览**（HTML / Markdown / TXT），当前 Channel 列表里缺这块（#5493）。
- **TUI 使用反馈**：提交后输入被吞掉的回归问题被快速捕获（#5621），反映用户对键盘流体验的高敏感度。
- **正面信号**：从 PR 标题与作者分布看，社区贡献者（@Re-bin、@BrianMwangi21、@wylovelyi、@KailBug、@DannyYTL、@chengyongru、@linhongyu510、@xiexiahao、@wzrayyy、@lmzopq）覆盖广泛，**项目不依赖单一维护者**，生态健康。

---

## 8. 待处理积压

提醒维护者关注以下 **长时间未关闭 / 更新稀疏** 的条目：

| 编号 | 类型 | 创建日期 | 状态 | 备注 |
|------|------|----------|------|------|
| **#2061** | Bug | 2026-03-15 | OPEN | 已超 5 个月，今日借由 #5626 PR 间接回应，建议正式关联并关单 |
| **#2078** | Channel/Zalo 重构 | 2026-03-16 | OPEN | Zalo 集成重构长期停留，可能阻塞该渠道用户 |
| **#5251** | Enhancement (MCP Apps) | 2026-08-05 | OPEN | 路线图级，暂无 PR 跟进 |
| **#5493** | Feature (文档预览) | 2026-08-23 | OPEN | 0 评论、无 PR，关注度不足 |
| **#5283** | Feature (per-session sandbox) | 2026-08-07 | OPEN | 安全方向关键 PR，仍待审 |
| **#5431** | fix(agent): report background task failures | 2026-08-18 | OPEN | 与 #5430 互补，建议合并 |
| **#5568** | refactor(agent): runner 拥有上下文压缩 | 2026-08-27 | OPEN | 与 #5569 同方向，需协调 |
| **#5614** | feat(tg): 流式富文本 | 2026-08-30 | OPEN | 作者自述待复审 |
| **#5623** | fix(agent): drop empty active-task groups | 2026-09-01 | OPEN | 已 fix #5428，建议优先 review |

🔗 完整列表可参考仓库 Issues/PR 面板：https://github.com/HKUDS/nanobot

---

### 健康度评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 迭代速度 | ⭐⭐⭐⭐ | 当日合并/关闭 9 条 PR，响应迅速 |
| 社区活跃 | ⭐⭐⭐⭐ | 多名独立贡献者并行提交 |
| Bug 响应 | ⭐⭐⭐⭐⭐ | P1 跨平台兼容问题 24h 内闭环 |
| 文档同步 | ⭐⭐⭐⭐ | 行为变更（#5604）同步更新文档 |
| 待办积压 | ⭐⭐⭐ | 个别 Issue（#2061/#2078）停留超 5 个月 |

**综合判断**：项目处于 **稳健迭代期**，开发节奏与社区参与度均良好；建议维护者重点清理 **>3 个月未关闭的 P2 条目**，并对 #5431 / #5568 / #5623 进行集中评审，以保持 PR 队列吞吐。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# zeroclaw 项目动态日报

**报告日期**：2026-09-02
**数据来源**：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

zeroclaw 仓库今日处于**高活跃、强负载**状态：过去 24 小时共产生 5 条 Issue 更新与 50 条 PR 更新（其中待合并 PR 达 35 条），但**无新版本发布**。PR 合并/关闭率约 30%（15/50），意味着大量提交仍在审阅通道中积压。从标签分布看，今日讨论高度集中在 **runtime 安全（sandbox、delegate 越权）、provider 兼容性、ZeroCode IDE 体验**三大主线，整体项目处于"集中修复 + 大型功能落地"的并行阶段。值得关注的是，5 个被更新的 Issue 中有 2 个为 **P1 高风险安全类 bug**（#9779 SOP 静默失效、#8279 delegate 越权父级 allowlist），表明安全治理仍是当前最高优先级。

---

## 2. 版本发布

⚠️ **今日无新版本发布**。建议关注 master 分支上正在合入的下列高优先级 PR，它们很可能进入下一个版本：
- #9402 Docker 沙箱嵌套修复
- #10262 RPC 连接在 daemon reload 时正确关闭
- #9841 SOP 无头运行 + 五项缺陷修复

---

## 3. 项目进展

今日有 **15 个 PR** 被合并或关闭，主要推进方向包括：

| PR | 方向 | 状态 |
|---|---|---|
| [#10392](https://github.com/zeroclaw-labs/zeroclaw/pull/10392) | ZeroCode SOP 导航刷新期间保持响应 | ✅ 已关闭 |
| [#10466](https://github.com/zeroclaw-labs/zeroclaw/pull/10466) | ZeroCode 丢失 prompt 完成事件的修复（用 `session/prompt` 作为生命周期栅栏） | ✅ 已关闭 |
| [#10528](https://github.com/zeroclaw-labs/zeroclaw/pull/10528) | mdBook 预处理器改走 xtask | ✅ 新提交 |
| [#10441](https://github.com/zeroclaw-labs/zeroclaw/pull/10441) | CodeQL Rust 分析路由到 Blacksmith runner | ✅ 新提交 |
| [#10467](https://github.com/zeroclaw-labs/zeroclaw/pull/10467) | WebSocket 传输依赖改为特性门控 | ✅ 新提交 |
| [#10471](https://github.com/zeroclaw-labs/zeroclaw/pull/10471) | 测试夹具不再执行 Edge TTS 脚本 | ✅ 新提交 |
| [#10482](https://github.com/zeroclaw-labs/zeroclaw/pull/10482) | 成本缓存与账本追加保持对齐 | ✅ 新提交 |

**整体判断**：今日项目向"运行时健壮性"与"开发者体验"两端同时推进。ZeroCode 相关两条修复直接提升了 IDE 交互稳定性；CI/构建链（mdBook、CodeQL、WebSocket feature gate）的多项改动则在降低未来维护成本。**健康度评估：良好，但合并速度（15/50 = 30%）低于 Issues 更新率（4/5 仍 OPEN = 80%），提示审阅带宽可能成为短期瓶颈。**

---

## 4. 社区热点

按 Issue/PR 互动量排序，最受关注的讨论集中在以下方向：

### 🔥 高关注 Issue
1. **[#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)** — `sops_dir` 文档默认值与守护进程行为不一致，SOP 子系统**静默不加载**（无报错、无日志）— 5 条评论，影响 Cron / channel 全部依赖 SOP 的链路。**核心诉求：静默失败远比显式失败危险**。
2. **[#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)** — `delegate` 工具绕过父级 allowlist，**子 agent 可调用被父策略排除的工具** — 4 条评论，标注为 S0 级（数据丢失/安全风险）。

### 🔥 高复杂度 PR
1. **[#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)** — `feat(providers): support multiple models per provider profile` — XL 级，跨 16 个文件领域标签。诉求：单一凭证/endpoint 下托管多个模型。
2. **[#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841)** — SOP 无头运行 + 关闭 #9494 评审中发现的 5 项缺陷 — XL 级，含安全、架构、SOP 工具域。
3. **[#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)** — ZeroCode 多会话窗格 + 智能体侧边栏 — XL 级，ACP 通道用户体验升级。
4. **[#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — 在 history-trim 事件上暴露 token 账目 — XL 级，关联 #9619 报告的"大整轮截断看起来像普通轮次消耗全部预算"。

**社区诉求分析**：当前讨论集中在三个真实痛点——**安全边界（delegate/SOP）**、**多模型 provider 配置灵活性**、**ZeroCode 作为 IDE 形态的成熟度**。这三个方向均有大量代码投入，说明它们已被维护者纳入正式路线。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 关联 PR | 状态 |
|---|---|---|---|---|
| 🔴 **S0 / P1 高风险** | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | `delegate` 绕过父级工具 allowlist，子 agent 可越权 | 暂未见专门修复 PR | OPEN |
| 🔴 **P1 高风险** | [#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) | SOP 子系统在文档默认路径下静默不加载 | [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841) 部分覆盖（SOP 无头运行），但根因（`is_some()` 闸门）仍需单独修复 | OPEN |
| 🟡 **P1 中风险** | [#10063](https://github.com/zeroclaw-labs/zeroclaw/issues/10063) | Anthropic 兼容网关拒绝 tool result 中的 image_url | — | ✅ 已关闭 |
| 🟡 **P2 中风险** | [#9896](https://github.com/zeroclaw-labs/zeroclaw/issues/9896) | 启动横幅在 SQLite 实际生效时仍显示 `Memory: none` | — | OPEN |
| 🟢 **P3 中风险** | [#7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899) | OpenAI STT provider 忽略环境变量凭证 | — | OPEN |

**特别提示**：
- **#8279（S0 安全缺陷）** 自 2026-06-24 创建至今已逾两个月，仍无修复 PR 合并，**应作为最高优先级处理**。
- **#9779** 与 **#9841 PR** 方向部分重叠，但 PR 描述未明确覆盖根因（`sops_dir.is_some()` 闸门），合并时需确认是否彻底解决"零配置 SOP 失效"场景。

---

## 6. 功能请求与路线图信号

基于 PR 方向与 Issue 标签，下一版本最可能纳入的特性：

| 信号强度 | 特性 | 来源 |
|---|---|---|
| ⭐⭐⭐⭐⭐ | **多模型 provider profile**（单凭证托管多模型） | [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) |
| ⭐⭐⭐⭐⭐ | **ZeroCode 多会话 + 智能体侧边栏** | [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739) |
| ⭐⭐⭐⭐⭐ | **Cron pre_hook 前提条件闸门** | [#10220](https://github.com/zeroclaw-labs/zeroclaw/pull/10220) |
| ⭐⭐⭐⭐ | **WhatsApp Web 表情回应**（add/remove_reaction） | [#9894](https://github.com/zeroclaw-labs/zeroclaw/pull/9894) |
| ⭐⭐⭐⭐ | **Crusoe Managed Inference 一等 OpenAI 兼容 provider** | [#9338](https://github.com/zeroclaw-labs/zeroclaw/pull/9338) |
| ⭐⭐⭐ | **history-trim 事件暴露 token 账目**（修复观测盲区） | [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) |
| ⭐⭐⭐ | **RPC 描述 ZeroCode 交互上下文** | [#10382](https://github.com/zeroclaw-labs/zeroclaw/pull/10382) |

**路线图解读**：项目下一阶段明确聚焦三件事——**1) Provider 生态扩张**（多模型、Crusoe）、**2) ZeroCode 产品化**（多会话、侧边栏、栈安全修复）、**3) Cron/SOP 等长生命周期任务的可靠性工程**（pre_hook、无头运行）。

---

## 7. 用户反馈摘要

从评论与 Issue 摘要中提炼的真实用户痛点：

- 🗣️ **静默失败最令人焦虑**（#9779）：用户在 Cron 与 channel 链路完全失效时**得不到任何错误信号**，"no error, no warning, and no log line"——文档默认值与代码默认值的漂移是头号信任杀手。
- 🗣️ **多模型配置过于笨重**（#9809 衍生诉求）：每个模型都要单独建立 provider profile，被社区反复请求"用 alias 复用凭证"。
- 🗣️ **观测性盲区**（#9713、#9896）：用户在 `#9896` 中吐槽"启动横幅显示 `Memory: none` 但运行时实际在用 sqlite"——状态展示与实际状态分离，会让运维误判生产配置。
- 🗣️ **子 agent 安全边界不清晰**（#8279）：开发者期望"父策略对子工具的过滤应当传递"，但当前实现以 unfiltered 父集合填充——这是 AI agent 系统中典型的**能力继承漏洞**。
- 🗣️ **WhatsApp 设备绑定失败**（#10084 衍生）：passkey 闸门阻挡了设备链接，提示移动 IM 通道的设备注册流程仍欠打磨。
- 🗣️ **可观察但未修复**：从评论节奏看，用户对项目整体响应速度**基本满意**，但对"长期 OPEN 超过 60 天的安全类 Issue"耐心下降。

---

## 8. 待处理积压

**以下重要条目已进入 OPEN 状态超过 60 天，建议维护者优先响应：**

| 编号 | 类型 | 创建日期 | 累计天数 | 链接 |
|---|---|---|---|---|
| **#8279** | 🔴 S0 安全 bug | 2026-06-24 | ~70 天 | [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) |
| **#7899** | P3 bug（OpenAI STT 环境变量凭证） | 2026-06-17 | ~77 天 | [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7899) |
| **#9402** | PR（Docker 沙箱嵌套） | 2026-07-26 | ~38 天 | [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/9402) |
| **#9561** | PR（personality 文件名标签） | 2026-07-30 | ~34 天，标注 `needs-author-action` | [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/9561) |
| **#9871** | PR（Matrix homeserver 解析） | 2026-08-09 | ~24 天，标注 `needs-author-action` + `stale-candidate` | [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/9871) |
| **#9894** | PR（WhatsApp 表情回应） | 2026-08-10 | ~23 天，标注 `needs-author-action` + `stale-candidate` | [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/9894) |
| **#9809** | PR（多模型 provider profile） | 2026-08-07 | ~26 天，XL 级、跨多域 | [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) |

**给维护者的提醒**：
1. **#8279 是仓库当前最危险的长期开放项**——S0 安全缺陷且无修复 PR，建议本周内出修复分支并指定 owner。
2. **3 个 PR 已标 `stale-candidate` + `needs-author-action`**（#9561、#9871、#9894），再不推进将被机器人自动关闭，建议维护者主动联系作者确认意向。
3. **#9809（多模型 provider）** 因 XL 规模长期未推进，建议拆分评审或邀请领域 reviewer 加速。

---

> 📌 **整体健康度判断**：项目活跃度高、社区讨论质量好，但**审阅吞吐量与安全 P1 处理速度**是当前两大风险点。建议短期内集中力量闭合 #8279 与 #9779，并在下一个发布窗口明确"安全+SOP+ZeroCode"三条主线。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-02**

---

## 1. 今日速览

PicoClaw 项目今日活跃度处于**中等偏低**水平，过去 24 小时内共 3 条 Issue 更新和 4 条 PR 更新，无新版本发布。社区贡献集中在两条主线：**Telegram 频道交互体验的连续性修复**（3 个相关 PR）和**配置兼容性 Bug 的反馈**（飞书频道）。值得注意的是，前一日提交的一个集成 Exa 网络搜索的 PR 因长期无人响应被标记为 stale 后关闭，暴露出外部贡献者 PR 流程中的响应延迟问题。整体而言，项目核心维护活跃度尚可，但社区提案类 Issue（如边缘设备 worker 模式）以及较老的稳定性 Bug 仍处于停滞状态，需重点关注。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日无 PR 合并，但有 1 条 PR 被关闭：

- **#3299 [已关闭]** Add native Exa web search provider — [@kesku](https://github.com/sipeed/picoclaw/pull/3299)
  - 由 [@kesku](https://github.com/sipeed/picoclaw/pull/3299) 于 2026-07-26 提交，集成 Exa 作为原生 web 搜索 provider，支持 `d`/`w`/`m`/`y` 时间范围过滤
  - 因超过 50 天未更新被标记为 stale 后关闭，未合并进主干
  - **信号**：项目对外部贡献的 PR 响应链路偏慢，外部贡献者纳入流程存在积压风险；Exa 这一搜索能力补强功能并未进入代码库

**值得关注的未合并 PR（@hugodeco 集中提交，今日 3 个）：**

- **#3358** [待合并] fix(agent): thread responses to the originating question message — [链接](https://github.com/sipeed/picoclaw/pull/3358)
  - 修复群聊中非回复消息触发的机器人回答与原问题脱节的体验问题
- **#3357** [待合并] fix(telegram): treat replies to the bot's own messages as implicit mentions — [链接](https://github.com/sipeed/picoclaw/pull/3357)
  - 修复 `mention_only: true` 模式下回复机器人消息被静默忽略的问题
- **#3356** [待合并] fix(telegram): re-attach quoted documents when replying to a file message — [链接](https://github.com/sipeed/picoclaw/pull/3356)
  - 修复引用文档消息时只传递 `[file]` 占位符而非真实文档引用的问题

> 这三个 PR 共同指向**群聊交互上下文的完整性**，反映出 PicoClaw 在多轮对话与媒体上下文传递上的若干边界场景正在被系统性修补。

---

## 4. 社区热点

按评论数与活跃度排序：

1. **#3269**（评论 8，👍 1）— [链接](https://github.com/sipeed/picoclaw/issues/3269)
   - **MCP server 连接失败导致 agent loop 挂起，聊天界面停止回复**
   - 创建于 2026-07-20，已被标记 stale，是当前社区讨论最密集的议题
   - **诉求**：当外部 MCP 服务不可用时，agent 应优雅降级而非整体卡死，这关系到系统鲁棒性
2. **#3345**（评论 1，👍 0）— [链接](https://github.com/sipeed/picoclaw/issues/3345)
   - **Proposal: lightweight PicoClaw worker mode for household edge compute**
   - 创建于 2026-08-25，由 [@kvnloo](https://github.com/sipeed/picoclaw/issues/3345) 提出
   - **诉求**：希望 PicoClaw 支持 10–20 MB 内存的 RISC-V/ARM/MIPS 设备、旧安卓手机、树莓派作为分布式 worker，与一台主力 PC 协同构成家庭边缘计算网络

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 标题 | 是否有 Fix PR |
|---|---|---|---|
| 🔴 **高** | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP server 连接失败导致 agent loop hang、聊天停止回复 | ❌ 暂无对应 PR |
| 🟡 **中** | [#3355](https://github.com/sipeed/picoclaw/issues/3355) | 飞书频道配置报错：`config.json contains unknown field(s): channel_list.feishu.app_id` | ❌ 暂无对应 PR |
| 🟢 **低（已修复待合并）** | [#3358](https://github.com/sipeed/picoclaw/pull/3358) / [#3357](https://github.com/sipeed/picoclaw/pull/3357) / [#3356](https://github.com/sipeed/picoclaw/pull/3356) | Telegram 群聊回复上下文相关 3 个体验性 Bug | ✅ PR 已就绪 |

**分析**：
- **#3269** 是当前最严重的稳定性问题：MCP 连接失败会**直接阻塞整个 agent 循环**，导致用户长时间得不到响应。这不仅影响功能完整性，对部署在生产环境的用户来说是一种"假死"故障。
- **#3355** 涉及配置文件 schema 校验过严或文档滞后：用户按照飞书集成文档配置 `channel_list.feishu.app_id` 时被拒绝，提示字段未知。属于配置兼容性回归。
- 三个 Telegram 相关 Bug 严重程度虽低，但**累计影响群聊体验的基本可用性**——尤其是引用文档被吞掉、`mention_only` 模式下对话链断裂，这些场景在客服、社群运营类使用中频繁触发。

---

## 6. 功能请求与路线图信号

**主要新需求：**

- **#3345 — 轻量级 Worker 模式 / 家庭边缘计算**
  - 由 [@kvnloo](https://github.com/sipeed/picoclaw/issues/3345) 提出
  - 核心想法：将 PicoClaw 部署到家中闲置的低算力设备（树莓派、旧安卓、RISC-V 开发板），组成小型分布式网络
  - **路线图信号**：这与 PicoClaw 本身的硬件亲和定位高度契合，若纳入路线图，可能演化为 v0.x 后续版本的重点特性；但目前评论仅 1 条，社区共识尚未形成
  - **判断**：作为长期愿景值得立项，但短期内进入主线发布的概率较低，需要更多 PoC 与架构设计

**潜在被纳入下一版本的功能**：
- Exa 搜索 provider（PR #3299）**本次已被关闭**，短期内不会进入主线
- Telegram 群聊上下文相关的 3 个 PR（#3356/#3357/#3358）若能在维护者审阅窗口内通过，极有可能合入下一个补丁版本

---

## 7. 用户反馈摘要

**真实用户痛点：**

- **🤖 智能体不可用时的"假死"体验**（来自 #3269 的 8 条评论）：用户对 MCP server 故障导致整个聊天界面"卡住但不报错"的现象表达了明显不满，普遍呼吁**超时降级**或**熔断机制**
- **📱 飞书集成配置门槛高**（来自 #3355）：用户在跟随文档配置 `channel_list.feishu.app_id` 时遭遇 schema 校验拒绝，说明**配置文档与代码 schema 不同步**，对新用户构成接入障碍
- **💬 群聊对话断片**（来自 #3356/#3357/#3358 的 PR 描述）：在繁忙群聊中，"机器人答非所问""回复被忽略""文档内容丢失"是高频痛点，社区贡献者 [@hugodeco](https://github.com/sipeed/picoclaw/pull/3358) 一日内连续提交 3 个 PR 修复同一类问题，反映此痛点的真实普遍性

**使用场景观察：**
- 用户倾向于在群聊场景使用 PicoClaw 进行客服或社群助手工作
- 飞书作为国内办公场景的核心 IM，飞书频道配置问题会直接影响中文用户的采用率
- 用户开始探索 PicoClaw 在家庭边缘设备上的部署可能，说明项目的硬件亲和力正在被进一步挖掘

---

## 8. 待处理积压

以下 Issue/PR 长期未响应，维护者需尽快介入：

| 类型 | 编号 | 标题 | 创建至今 | 状态 |
|---|---|---|---|---|
| 🔴 Bug | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP 连接失败导致 agent loop hang | ~44 天 | OPEN + stale |
| 🟡 Proposal | [#3345](https://github.com/sipeed/picoclaw/issues/3345) | 轻量级 worker mode 提案 | ~8 天 | OPEN + stale |
| 🟢 已关闭 | [#3299](https://github.com/sipeed/picoclaw/pull/3299) | Exa 搜索 provider PR | ~38 天 | CLOSED（stale 后关闭） |
| 🟢 待合并 | [#3356](https://github.com/sipeed/picoclaw/pull/3356) / [#3357](https://github.com/sipeed/picoclaw/pull/3357) / [#3358](https://github.com/sipeed/picoclaw/pull/3358) | Telegram 上下文 3 个修复 | <1 天 | OPEN |

**重点提醒：**
- **#3269** 是当前最严重的稳定性 Bug，已被自动标记 stale 但仍未解决，存在被进一步忽略的可能。建议维护者本周内给出回应或指派处理
- **#3345** 作为架构级提案，应由核心维护者明确表态方向，避免社区预期落空
- 外部贡献者 PR（#3299）的 38 天无人响应周期，提示**贡献者体验**这一长期风险，需要更明确的 PR triage 流程

---

*日报生成基于 GitHub 公开数据；如需深入某条 Issue/PR 的历史对话或代码变更，请点击对应链接跳转。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报

**日期**：2026-09-02
**数据周期**：过去 24 小时
**项目仓库**：[qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)

---

## 1. 今日速览

NanoClaw 今日维持较高活跃度，过去 24 小时共产生 **2 条新 Issue** 与 **13 条 PR 更新**（12 条待合并、1 条已关闭），但无新版本发布。社区贡献仍以 **providers 重构系列**（@zvi-fried 主导的多份契约 PR）为最大主线，同时在 **mount 安全修复**、**sweep idle timeout 配置化**、**send_card 回调诚实化** 等方向有持续推进。整体健康度良好，核心团队对 Issue 响应及时，未见长期无人问津的积压。

---

## 2. 版本发布

🚫 **无新版本发布**。昨日 PR #3698（容器内 Bun 1.3.12 → 1.4.0、Claude Code 2.1.238 → 2.1.257、Claude Agent SDK 0.3.238 → 0.3.257 的运行时升级）虽已被关闭，但当日并未触发任何 release tag。维护者可能正在等待 providers 重构系列 PR 合并后统一发版。

---

## 3. 项目进展

### ✅ 已关闭 / 已合并

- **[PR #3698 — chore(container): bump Bun and Claude runtimes](https://github.com/nanocoai/nanoclaw/pull/3698)** · 作者：@omri-maya
  同步升级容器运行时栈（Bun 1.4.0、Claude Code 2.1.257、Claude Agent SDK 0.3.257），并使 CI、registry-skill 校验和 release 验证全部对齐 Bun 1.4.0。这是当日唯一被关闭的 PR，代表项目运行时基线向前推进了一步。

### 🔄 持续推进但尚未合并

| PR | 标题 | 推进内容 |
|---|---|---|
| [#3581](https://github.com/nanocoai/nanoclaw/pull/3581) | refactor(providers): declare the runtime provider contract | 声明运行时 provider 契约 |
| [#3585](https://github.com/nanocoai/nanoclaw/pull/3585) | refactor(providers): declare the host provider contract | 声明宿主 provider 契约 |
| [#3586](https://github.com/nanocoai/nanoclaw/pull/3586) | refactor(providers): declare the setup provider contract and install verifier | 声明 setup 契约与安装校验器 |
| [#3588](https://github.com/nanocoai/nanoclaw/pull/3588) | refactor(providers): implement the opencode provider contract | 实现 opencode 契约 |
| [#3584](https://github.com/nanocoai/nanoclaw/pull/3584) | refactor(providers): implement the codex provider contract | 实现 codex 契约 |
| [#3591](https://github.com/nanocoai/nanoclaw/pull/3591) | refactor(providers): render provider instructions from core-owned canon | 统一 provider 指令渲染来源 |
| [#3592](https://github.com/nanocoai/nanoclaw/pull/3592) | feat(groups): add a core-owned speed inference property | 新增 core 拥有的 speed 推断属性 |

这一组 **providers 重构系列** 当日均被刷新更新，呈现"齐头并进"的合并前评审状态，反映出核心团队正在系统性地把 provider 抽象下沉到 core 层。

---

## 4. 社区热点

当日新开 Issue 与 PR 的 👍 与评论数均为 0，无明显讨论热度。但从提交动作的密集度看，社区热点集中在以下两个方向：

- **🔥 providers 抽象重构**：@zvi-fried 一人贡献 6 条相关 PR（#3581/#3584/#3585/#3586/#3588/#3591/#3592），是当前最受维护者关注的工程化方向。
  → 详见 [PR #3585](https://github.com/nanocoai/nanoclaw/pull/3585)、[PR #3586](https://github.com/nanocoai/nanoclaw/pull/3586)
- **🔥 安全与诚实性修复**：#3680（mount 白名单绕过）、#3427（send_card 隐瞒被丢回调）、#3646（sweep 误杀慢推理）三条"让系统不再撒谎/不再越权"性质的修复同时活跃。
  → 详见 [PR #3680](https://github.com/nanocoai/nanoclaw/pull/3680)、[PR #3427](https://github.com/nanocoai/nanoclaw/pull/3427)、[PR #3646](https://github.com/nanocoai/nanoclaw/pull/3646)

---

## 5. Bug 与稳定性

| 严重度 | Issue / PR | 描述 | 是否有 fix |
|---|---|---|---|
| 🔴 高 | [#3700 — Destination local-names don't repoint when their target messaging-group is recreated](https://github.com/nanocoai/nanoclaw/issues/3700) | 真实生产环境（2026-08-27 至 09-01）复现：修复 wiring Discord `--platform-id` 错误后，删除旧 messaging-group 并新建后，destination 的 local-name 不会自动重指向，导致外发消息对"死目标"返回 success | ❌ 暂无 fix PR |
| 🟡 中 | [#3699 — ncl destinations create/remove don't auto-fill --agent-group-id](https://github.com/nanocoai/nanoclaw/issues/3699) | 与 `tasks` 等其他 group-scoped 命令不一致，缺失 `groupArg(args, ctx)` 自动填充逻辑，影响 CLI 一致性 | ❌ 暂无 fix PR |
| 🟡 中 | [#3427 — fix(agent-runner): tell the agent send_card drops callback actions](https://github.com/nanocoai/nanoclaw/pull/3427) | Chat SDK bridge 静默丢弃 callback actions，但 send_card 仍向 agent 上报成功，误导 agent 决策 | ✅ 已有 fix PR |
| 🟡 中 | [#3680 — fix(mount-security): close allowlisted-extra mount bypass in validateSpec](https://github.com/nanocoai/nanoclaw/pull/3680) | 容器 mount 白名单存在绕过路径，需在 validateSpec 收紧 | ✅ 已有 fix PR |
| 🟠 中-高 | [#3646 — fix(sweep): make the idle timeout configurable and apply it to both kill paths](https://github.com/nanocoai/nanoclaw/pull/3646) | sweep 用硬编码 30 分钟阈值且仅基于 provider stream 心跳，导致本地慢模型推理被误判为死进程 | ✅ 已有 fix PR |

---

## 6. 功能请求与路线图信号

- **[#3696 — feat(scheduling): per-task missed-run policy for recurring tasks](https://github.com/nanocoai/nanoclaw/pull/3696)** · 作者：@ljluestc
  关闭 #2398，为每个周期任务显式声明"错过执行"的策略（不再隐式 always-late + 跳到下一未来槽位）。✅ **有望纳入下一版本**，已带规范 PR 模板与 issue 闭环。

- **[#3697 — feat: add Keenable MCP tool skill](https://github.com/nanocoai/nanoclaw/pull/3697)** · 作者：@ilya-bogin-keenable
  新增 `/add-keenable-tool` 技能，把 Keenable 网页搜索/抓取注册为远程 MCP 工具。🆕 第三方集成技能，预计若审核通过将作为社区 skill 上架。

- **providers 抽象层全面重写**（#3581/#3584/#3585/#3586/#3588/#3591）— 这是来自核心团队明确的路线图信号：**opencode、codex 等新 provider 的接入门槛将显著降低**，未来第三方 provider 适配将更标准化。

---

## 7. 用户反馈摘要

当日新 Issue 评论数均为 0，暂无用户直接文字反馈。但从 #3700 的描述中可以提炼出真实使用场景与痛点：

- **真实生产环境痛点**：用户 @DawoudIO 在 8 月 27 日至 9 月 1 日的实装中踩到两层问题：先是 Discord `--platform-id` 格式错误（与 #3576 相邻上下文），再是修复后 destination 的 local-name 不会跟随 messaging-group 的"删除-重建"自动重指向，导致 API **对死目标返回成功**。这反映出 **资源标识与引用关系的级联一致性** 是当前 CLI 的薄弱点。
- **CLI 一致性诉求**：#3699 体现出用户已经熟悉 `tasks create/update/cancel/run` 的隐式 `groupArg` 自动填充行为，对 `destinations` 命令的"行为不一致"感到违和——这是典型的"用多了之后自然产生的一致性期望"。

---

## 8. 待处理积压

以下 PR 已创建超过 24 小时但仍未被合并，建议维护者优先评审：

| PR | 创建日期 | 等待天数 | 备注 |
|---|---|---|---|
| [#3427 — fix(agent-runner): send_card drops callback actions](https://github.com/nanocoai/nanoclaw/pull/3427) | 2026-08-21 | ~12 天 | 高价值诚实性修复，建议优先 |
| [#3581 — refactor(providers): runtime provider contract](https://github.com/nanocoai/nanoclaw/pull/3581) | 2026-08-27 | ~6 天 | providers 重构基石 |
| [#3584 — refactor(providers): codex provider contract](https://github.com/nanocoai/nanoclaw/pull/3584) | 2026-08-27 | ~6 天 | — |
| [#3585 — refactor(providers): host provider contract](https://github.com/nanocoai/nanoclaw/pull/3585) | 2026-08-27 | ~6 天 | — |
| [#3586 — refactor(providers): setup provider contract](https://github.com/nanocoai/nanoclaw/pull/3586) | 2026-08-27 | ~6 天 | — |
| [#3588 — refactor(providers): opencode provider contract](https://github.com/nanocoai/nanoclaw/pull/3588) | 2026-08-27 | ~6 天 | — |
| [#3591 — refactor(providers): render provider instructions](https://github.com/nanocoai/nanoclaw/pull/3591) | 2026-08-27 | ~6 天 | — |
| [#3592 — feat(groups): speed inference property](https://github.com/nanocoai/nanoclaw/pull/3592) | 2026-08-28 | ~5 天 | — |
| [#3646 — fix(sweep): configurable idle timeout](https://github.com/nanocoai/nanoclaw/pull/3646) | 2026-08-29 | ~4 天 | 中-高严重度 |
| [#3680 — fix(mount-security): close allowlisted-extra mount bypass](https://github.com/nanocoai/nanoclaw/pull/3680) | 2026-08-30 | ~3 天 | 🔐 安全修复，建议优先 |

**特别提醒**：#3427（agent 误报成功）与 #3680（mount 安全绕过）两条 PR 已等待超过一周且都涉及"用户被误导 / 安全边界"问题，建议核心团队尽快评审合并。

---

*报告生成时间：2026-09-02 · 数据来源：GitHub REST API · 报告由 AI 助手基于公开数据生成*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 · 2026-09-02

> 数据来源：GitHub (github.com/nearai/ironclaw) · 统计周期：过去 24 小时

---

## 1. 今日速览

IronClaw 在过去 24 小时内保持了**中高强度的工程节奏**：共 16 条 Issue 更新与 24 条 PR 更新同步推进，Issue 与 PR 数量基本平衡，无新版本发布。重点集中在三条主线——**WebUI 设计系统收尾**（DESIGN.md 治理 + 共享组件替换）、**agent-loop 大型重构**（capability stage 与状态对齐）、以及 **Slack/Channels 通道稳定性修复**（live-QA 多项 P0 缺陷）。同时存在一些值得关注的稳定性问题（rootless Docker sandbox、CI 无锁测试超时、tool_search 巨型目录不可达），整体健康度**良好偏谨慎**：主线功能持续推进，但 QA 与基础设施层面的 bug 密度也在上升。

---

## 2. 版本发布

**无新版本发布。** 当前仍处于 v1.4.0 周期内，待合并的 PR 中包含了多项面向 v1.4.0 收尾的修复与共享组件迁移。

---

## 3. 项目进展

过去 24 小时共有 9 个 PR 进入合并/关闭状态，推动了多个关键模块的前进：

### 🔀 agent-loop 大型重构（连续推进）

- **[#8028](https://github.com/nearai/ironclaw/pull/8028)** `refactor(agent-loop): align state and stage ownership` —— 将 agent loop 的 checkpoint state 拆分为内聚的 compaction、recovery、reply-admission、stop-control 模块，同时把模型用量记账移入 `ModelStage`、turn 完成 nudge 机制移入 `StopStage`。**对外公开路径与序列化字节完全保持兼容**，是面向后续能力扩展的重要底层重构。✅ 已关闭

- **[#8031](https://github.com/nearai/ironclaw/pull/8031)** `refactor(agent-loop): decompose capability stage mechanics` —— 将 `executor/capabilities.rs` 从 **2,938 行压缩到 890 行**，同时保留唯一的 `CapabilityStage::process` 执行路径，提取出 batch 调度、dispatch/recovery、failure normalization、outcome 持久化等专职 owner。⏳ 待合并

### 🌐 WebUI 共享组件替换（设计系统治理）

本日关闭的两条里程碑 Issue 对应 PR 均已落地：
- **[#7970](https://github.com/nearai/ironclaw/issues/7970)** → **[#7998](https://github.com/nearai/ironclaw/pull/7998)** `feat(llm): preserve NEAR AI model capabilities through discovery` ✅ 已关闭
- **[#7971](https://github.com/nearai/ironclaw/issues/7971)** → **[#7997](https://github.com/nearai/ironclaw/pull/7997)** `feat(webui): show model capability icons across Inference` ✅ 已关闭

这两条共同完成了"模型能力标签从后端到前端的端到端贯通"，用户可在 Provider 配置、Workspace Allowed models、Workspace default、Caller-scoped 多个控件中看到模型支持文本/图像输入输出的图标与本地化描述。

### 🐛 GitHub 扩展性能修复

- **[#7986](https://github.com/nearai/ironclaw/issues/7986)** → **[#7996](https://github.com/nearai/ironclaw/pull/7996)** `perf(github): compact repository list responses` ✅ 已关闭  
  解决了"列出我的 GitHub repos"返回 519 KB（98 个仓库 × 81 个原始字段）的严重性能问题，改为投影到模型真正有用的字段，并复用于 `search_repositories`。同时重建了 GitHub WASM artifact 并新增了测试覆盖。

### 🧰 CI 基础设施

- **[#8013](https://github.com/nearai/ironclaw/pull/8013)** `ci: parallelize affected crate tests with nextest` ✅ 已关闭  
  使用 nextest + 4 进程并行替代 Cargo 的串行调度，缩短受影响 crate 的测试时间，并保留 `harness = false` 等特殊目标走原有路径。

### 💬 Slack 通道稳定性（live-QA 系列修复）

- **[#8027](https://github.com/nearai/ironclaw/pull/8027)** `fix(live-qa): find the Slack run by message identity, not envelope event_id` ✅ 已关闭  
  **修复了 `qa_7d_slack_bug_message_trigger` 连续 33 次失败的金丝雀事故**：事件实际上总是被接收，问题在于 harness 通过 envelope event_id 查找 run，而非消息自身标识。
- **[#8014](https://github.com/nearai/ironclaw/pull/8014)** `fix(slack): preserve explicit mentions across callback dedup` ✅ 已关闭  
  当 Slack 把同一条线程消息同时作为 `message` 和 `app_mention` 回调投递时，仅忽略易混淆的 reply 形态回调，让权威的 `app_mention` 回调保留显式 mention 后开启 turn。

---

## 4. 社区热点

本日评论/讨论活跃度整体偏低（多数 Issue 评论数 ≤ 1），但**主题高度集中**——所有热点都聚焦于两个方向：

### 🔥 Epic 推动者

- **[#7781 Epic: Design System Phases 2–3](https://github.com/nearai/ironclaw/issues/7781)** — `@rdisandro` 推动的设计系统治理 Epic（DESIGN.md + 主题换肤 + UI reskin），今日获得更新并合并了原 #7038 的 governance 阶段，**取代并关闭了 #7733**。配套 PR **[#7994](https://github.com/nearai/ironclaw/pull/7994)** 已提交，新增 `DESIGN.md` 作为书面真理之源并接入 Storybook。
- **[#8026 Epic: Dogfooding & QA bug fixing 08/31 - 09/06](https://github.com/nearai/ironclaw/issues/8026)** — 上一周期 Epic **[#7843](https://github.com/nearai/ironclaw/issues/7843)** 在今日关闭，新周期 Epic 启动，体现项目持续迭代的节奏感。

### 🔍 值得关注但讨论尚少的「沉默热点」

- **[#8012 47k-tool hosted-MCP catalog 不可达](https://github.com/nearai/ironclaw/issues/8012)** `@pranavraja99` 报告：47,337 个工具的 hosted-MCP 目录能完整摄取，但通过 `tool_search` **没有任何工具可达**；截断到 2,000 个则正常。这是企业级 MCP 部署的关键瓶颈，预计将在社区引发进一步讨论。配套修复 PR **[#7984](https://github.com/nearai/ironclaw/pull/7984)** 已在路上（`size tool_search replies to the first-look envelope`）。

---

## 5. Bug 与稳定性

按严重程度从高到低排列：

| 严重度 | Issue | 描述 | 修复 PR |
|---|---|---|---|
| 🔴 **High** | [#8012](https://github.com/nearai/ironclaw/issues/8012) | 47k 工具 hosted-MCP 目录 `tool_search` 完全不可达；介于 2k~47k 之间存在临界点 | [#7984](https://github.com/nearai/ironclaw/pull/7984) ⏳ OPEN |
| 🟠 **Medium-High** | [#8015](https://github.com/nearai/ironclaw/issues/8015) `[QA]` | Rootless Docker sandbox workspace 不可写：UID/GID namespace 不匹配，导致非 root 用户跑 v1.4.0 失败 | ❌ 暂无 |
| 🟡 **Medium** | [#8016](https://github.com/nearai/ironclaw/issues/8016) `[ci]` | `tests/reborn_turn_state_lock_free_submit_parity.rs` 间歇性 5 秒超时（CI） | ❌ 暂无 |
| 🟢 **Low** | [#8025](https://github.com/nearai/ironclaw/issues/8025) | 输入字段特殊字符未正确转义，可能与上次发布的编码改动相关 | ❌ 暂无 |
| ✅ **已修复** | [#7892](https://github.com/nearai/ironclaw/issues/7892) | agent-loop 延迟工具被找到 15 次但从未真正调用，123s 跑无终止守卫 | 重构已在 [#8031](https://github.com/nearai/ironclaw/pull/8031)、[#8028](https://github.com/nearai/ironclaw/pull/8028) 处理 ✅ |
| ✅ **已修复** | [#7986](https://github.com/nearai/ironclaw/issues/7986) | `github.list_repos` 单次返回 519 KB 性能问题 | [#7996](https://github.com/nearai/ironclaw/pull/7996) ✅ |

**注**：Slack 通道相关的 [#8027](https://github.com/nearai/ironclaw/pull/8027)、[#8014](https://github.com/nearai/ironclaw/pull/8014)、[#8029](https://github.com/nearai/ironclaw/pull/8029) 已合并或待合并，属于 live-QA 紧急修复链。

---

## 6. 功能请求与路线图信号

今日新增的 Issue 透露出明显的**设计系统统一化路线**信号：

### WebUI 共享组件替换矩阵（由 `@italic-jinxin` 集中推动，已形成完整 PR 配套）

| Issue | 描述 | 配套 PR |
|---|---|---|
| [#8018](https://github.com/nearai/ironclaw/issues/8018) | SettingsField 改用共享 Input / SelectMenu | [#8021](https://github.com/nearai/ironclaw/pull/8021) ⏳ OPEN |
| [#8019](https://github.com/nearai/ironclaw/issues/8019) | Automations status banners 迁移到 InlineNotice | [#8022](https://github.com/nearai/ironclaw/pull/8022) ⏳ OPEN |
| [#8020](https://github.com/nearai/ironclaw/issues/8020) | Workspace / Logs 过滤器改用共享 SearchField（需新增 sm 尺寸） | [#8024](https://github.com/nearai/ironclaw/pull/8024) ⏳ OPEN |
| [#8017](https://github.com/nearai/ironclaw/issues/8017) | Extension Configure 流程接入共享表单 + InlineNotice | [#8023](https://github.com/nearai/ironclaw/pull/8023) ⏳ OPEN |

**判断**：这一组 4 条 Issue + 4 条 PR 是典型的「Issue-first」节奏，**全部极有可能纳入 v1.4.0 后期或 v1.4.x 点版本**。配套 PR 均已就绪，等待 review。

### Channels / Slack 大型功能

- **[#8006](https://github.com/nearai/ironclaw/pull/8006)** `feat(channels): add durable progressive replies and native Slack Agent UI` (XL, low risk) ⏳ OPEN  
  引入 provider-neutral 的 `ReplyDocument`（bounded-by-construction），把"显示文本/推理摘要/..."的呈现完全放到 provider 边缘。是 Web 与 Slack 双端的统一回复模型。
- **[#8010](https://github.com/nearai/ironclaw/pull/8010)** `feat(webui): session-event transport unification and web-app run-completion notifications` (XL, medium risk) ⏳ OPEN  
  实现 2026-08-13 已批准的设计：类型化 stream contract + 单一 ticket 鉴权多路复用 session WebSocket + 持久化通知。

**判断**：这两条是**面向 v1.5+ 的方向性功能**，涉及向后兼容的传输层重构，落地节奏会偏慢。

### 长期信号

- **[#7988](https://github.com/nearai/ironclaw/pull/7988)** `chore(agents): refresh codebase knowledge graph` — 每晚由 CI 触发的知识图谱快照刷新，反映项目在 RAG/agent 记忆方向持续投入。

---

## 7. 用户反馈摘要

由于多数 Issue 评论数较少（≤ 1），本日的「用户原声」主要来自 Issue 描述本身：

- **企业级 MCP 用户痛点**（[#8012](https://github.com/nearai/ironclaw/issues/8012)）：当托管的 MCP 目录达到数万工具级别时，`tool_search` 完全失效，意味着 IronClaw 当前**无法承载企业级 MCP 目录**。该用户通过「2,000 个能跑、47,000 个不能跑」的对比实验精确定位了临界点。
- **本地化部署痛点**（[#8015](https://github.com/nearai/ironclaw/issues/8015)）：rootless Docker 是**生产环境推荐的沙箱方案**，但 UID/GID namespace 不匹配让 workspace 不可写，使得「以非 root 用户跑 v1.4.0」这一安全最佳实践实际无法工作。
- **CI 信任度信号**（[#8016](https://github.com/nearai/ironclaw/issues/8016)）：lock-free turn-state 测试间歇性超时 5s，说明并行提交下的 turn-state 一致性在 CI 环境偶发不稳定，会降低开发者对"绿色 CI 即安全"的信心。
- **特殊字符处理回归**（[#8025](https://github.com/nearai/ironclaw/issues/8025)）：用户怀疑与最近一次编码改动有关，**提示维护者注意 release notes 中的行为变更需充分沟通**。
- **Slack 渠道长期不可靠**（[#8027](https://github.com/nearai/ironclaw/pull/8027)）：金丝雀连续 33 次失败说明此前 Slack 通道在生产中**长期处于"看似正常实则失败"的危险状态**，本次修复对生产用户的体验改善可能是显著但未被察觉的。

---

## 8. 待处理积压

| Issue / PR | 标题 | 风险 | 状态 |
|---|---|---|---|
| [#7831](https://github.com/nearai/ironclaw/pull/7831) | `ci(webui): publish Storybook to Chromatic as a non-blocking lane` | medium | ⏳ OPEN · 自 2026-08-23 起挂起，**已 rescope**，需关注 token 部分迁出后是否能顺利合并 |
| [#7984](https://github.com/nearai/ironclaw/pull/7984) | `fix(tools): size tool_search replies to the first-look envelope` | low | ⏳ OPEN · 自 2026-08-28 起，对应 [#8012](https://github.com/nearai/ironclaw/issues/8012) 这类企业级痛点，**建议优先推进** |
| [#8015](https://github.com/nearai/ironclaw/issues/8015) | Rootless Docker sandbox 不可写 | — | ❌ 暂无修复 · 影响所有非 root 部署，建议作为 **P1** 关注 |
| [#8016](https://github.com/nearai/ironclaw/issues/8016) | CI lock-free 测试间歇超时 | — | ❌ 暂无修复 · 间歇性问题最易被忽视，建议关联 [#8028](https://github.com/nearai/ironclaw/pull/8028) 重构做回归验证 |
| [#8025](https://github.com/nearai/ironclaw/issues/8025) | 特殊字符处理 bug | — | ❌ 暂无修复 · 用户已怀疑是 release 回归，**建议快速响应以避免扩散** |

---

## 健康度总评

| 维度 | 评分 | 说明 |
|---|---|---|
| 活跃度 | ⭐⭐⭐⭐ | 24h 内 40 条 Issue/PR 流动，节奏稳定 |
| 主线推进 | ⭐⭐⭐⭐⭐ | 设计系统、agent-loop 重构双线齐头并进 |
| 稳定性 | ⭐⭐⭐ | 多个 High/Medium bug 浮现，但 fix 在路上 |
| 社区响应 | ⭐⭐⭐ | 评论密度偏低，需关注长尾 Issue 反馈 |
| 路线图清晰度 | ⭐⭐⭐⭐⭐ | v1.4.0 收尾工作齐备，v1.5+ 通道/传输层重构方向明确 |

**给维护者的建议**：
1. **优先推进 [#7984](https://github.com/nearai/ironclaw/pull/7984)** —— 它直接解锁企业级 MCP 场景，是用户增长的关键瓶颈。
2. **[#8015](https://github.com/nearai/ironclaw/issues/8015) rootless Docker 修复** 应作为 v1.4.0 收尾必修项，否则推荐部署方案与实际可用性之间存在公开矛盾。
3. **WebUI 共享组件 4 条配套 PR（[#8021](https://github.com/nearai/ironclaw/pull/8021)、[#8022](https://github.com/nearai/ironclaw/pull/8022)、[#8023](https://github.com/nearai/ironclaw/pull/8023)、[#8024](https://github.com/nearai/ironclaw/pull/8024)）** 由同一作者批量提交，**建议集中 review、统一合并**，避免设计系统在落地过程中出现风格漂移。

---

*报告生成时间：2026-09-02 · 数据基于 GitHub 过去 24 小时公开活动*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目日报
**日期：2026-09-02**
**仓库：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

---

## 1. 今日速览

LobsterAI 过去 24 小时整体活跃度中等偏低，主要以**清理长期未响应的 Stale Issues 与历史 PR**为主，无新版本发布。13 条 Issue 更新中 9 条为关闭（多数为 stale 标记的旧议题），4 条为新增/活跃；9 条 PR 更新中 5 条已关闭、4 条仍待合并。今日亮点集中在**新功能合并**：视频分享能力与新手引导（Onboarding）相关 3 个 PR 被合并完成，同时出现 1 个高优先级的**MCP 安全加固 PR**尚待评审。社区方面新开 Issue #2589 对 plan mode 计费合理性提出投诉，值得关注。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

过去 24 小时共关闭/合并 5 个 PR，主要推进方向：

| PR | 标题 | 推进价值 |
|---|---|---|
| [#2593](https://github.com/netease-youdao/LobsterAI/pull/2593) | feat(artifacts): 支持模型生成视频分享 | **重要功能**：新增模型生成视频的分享链路，包含来源溯源、权限管控、远程预览，并禁止本地视频绕过来源校验。强化了 Artifacts 模块的内容分享能力。 |
| [#2591](https://github.com/netease-youdao/LobsterAI/pull/2591) | feat(onboarding): add first-run analytics | 完善首次使用埋点，覆盖 onboarding 漏斗、登录交接、欢迎任务创建与生命周期，仅上报结构化字段（不上传 prompt 文本），兼顾产品迭代与隐私。 |
| [#2594](https://github.com/netease-youdao/LobsterAI/pull/2594) | fix(onboarding): polish guide transitions and CTAs | 优化新手引导交互细节：缩小光标、加速结果弹层、复用登录彩虹按钮样式、修复单帧布局闪烁。 |
| [#2592](https://github.com/netease-youdao/LobsterAI/pull/2592) | Liuzhq/fix user guide | 用户指引相关修复（具体内容未列）。 |
| [#2595](https://github.com/netease-youdao/LobsterAI/pull/2595) | [platform: windows] fix: nsis web staging drive preflight | Windows 平台 NSIS Web 安装包的盘符预检修复，提升 Windows 安装体验。 |

**整体评估**：项目在 Artifacts 分享、Onboarding 体验、Windows 安装链路上都有明显推进，方向集中且务实。

---

## 4. 社区热点

| 热度 | 议题 | 评论数 | 摘要 |
|---|---|---|---|
| 🔥🔥🔥 | [#1614](https://github.com/netease-youdao/LobsterAI/issues/1614) | 3 | 建议将 hermes-agent 接入作为可选 AI 引擎（类似 openclaw） |
| 🔥🔥🔥 | [#1622](https://github.com/netease-youdao/LobsterAI/issues/1622) | 3 | 添加自定义模型时测试失败 |
| 🔥🔥🔥 | [#1627](https://github.com/netease-youdao/LobsterAI/issues/1627) | 3 | 执行稍复杂任务时客户端崩溃 |
| 🔥🔥 | [#1632](https://github.com/netease-youdao/LobsterAI/issues/1632) | 3 | 切换本地模型后原有 skill 不可用，如何安装？ |
| 🔥🔥 | [#1112](https://github.com/netease-youdao/LobsterAI/issues/1112) | 2 | Table 顶部/底部出现不明留白 |
| 🔥🔥 | [#1586](https://github.com/netease-youdao/LobsterAI/issues/1586) | 2 | 切换语言后部分内容（条款、工具风格）未翻译 |

**诉求分析**：
- **可扩展性诉求突出**：#1614 与 #1632 都指向"接入新模型/Agent 引擎"以及"切换本地模型后生态兼容"的痛点，说明用户希望 LobsterAI 成为更开放的平台，而非绑定特定模型。
- **多语言国际化完整性**：#1586 暴露了 i18n 的覆盖盲区，是中长期需要投入的方向。
- **新反馈情绪**：#2589（plan mode 消耗 200 credits）虽然评论数为 0，但来自流失用户的措辞较激烈（"you guys don't expect a repeat customer"），需关注计费透明度。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 状态 | 是否有 Fix PR | 说明 |
|---|---|---|---|---|
| 🔴 P0 | [#2589](https://github.com/netease-youdao/LobsterAI/issues/2589) | OPEN（新） | ❌ | plan mode 一次性消耗 200 credits，疑似计费/配额 Bug |
| 🟠 P1 | [#1627](https://github.com/netease-youdao/LobsterAI/issues/1627) | CLOSED（stale） | ❌ | 复杂任务执行时客户端崩溃（OpenClaw ws 事件流相关） |
| 🟠 P1 | [#1589](https://github.com/netease-youdao/LobsterAI/issues/1589) | CLOSED（stale） | ❌ | macOS 会话与定时任务功能异常（版本 2026.04.08） |
| 🟠 P1 | [#1587](https://github.com/netease-youdao/LobsterAI/issues/1587) | CLOSED（stale） | ❌ | 更新最新版本后首次启动闪退 |
| 🟡 P2 | [#1622](https://github.com/netease-youdao/LobsterAI/issues/1622) | CLOSED（stale） | ❌ | 自定义模型测试连接失败 |
| 🟡 P2 | [#1617](https://github.com/netease-youdao/LobsterAI/issues/1617) | CLOSED（stale） | ❌ | 技能删除后列表未同步，且重启后残留 |
| 🟢 P3 | [#1632](https://github.com/netease-youdao/LobsterAI/issues/1632) | CLOSED（stale） | ❌ | 切换本地模型后 skill 不可用（更偏产品行为） |
| 🟢 P3 | [#1112](https://github.com/netease-youdao/LobsterAI/issues/1112) | OPEN（stale） | ❌ | Table 顶部/底部留白（UI 细节） |

**关键观察**：今日关闭的多数 Bug 报告属于 stale 状态自动归档，但其中 P1 级别的崩溃类问题（#1627、#1587、#1589）若未真正修复就关闭，存在**重复报告风险**，建议维护者回查是否已在某个版本中解决并补充 release notes 关联。

**值得注意的已开放 Bug**：
- [#1105](https://github.com/netease-youdao/LobsterAI/issues/1105) 钉钉定时任务 IM 通知因 conversationId 前缀导致无法送达 → 已有对应 Fix PR [#1106](https://github.com/netease-youdao/LobsterAI/pull/1106) 待合并。
- [#1107](https://github.com/netease-youdao/LobsterAI/issues/1107) 定时任务 pollOnce 无并发保护导致幽灵事件 → 已有对应 Fix PR [#1108](https://github.com/netease-youdao/LobsterAI/pull/1108) 待合并。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 现状 | 入版可能性 |
|---|---|---|---|
| 接入 hermes-agent 作为可选引擎 | [#1614](https://github.com/netease-youdao/LobsterAI/issues/1614) | 已 stale 关闭，社区有反响但维护者未表态 | 中（取决于项目是否走"开放引擎生态"战略） |
| 定时任务完成后推送系统通知 | [#1620](https://github.com/netease-youdao/LobsterAI/issues/1620) | 已 stale 关闭，但需求清晰（macOS Notification Center / Windows Toast / Linux libnotify），且已有权限引导设计草案 | **高**（细节成熟，符合用户预期） |
| 钉钉 IM 通知路由修复 | [#1105](https://github.com/netease-youdao/LobsterAI/issues/1105) | 已有 PR #1106 待合并 | **极高**（已有完整修复） |
| 定时任务轮询并发保护 | [#1107](https://github.com/netease-youdao/LobsterAI/issues/1107) | 已有 PR #1108 待合并 | **极高**（已有完整修复） |
| OpenClaw 配置延迟同步在负载清空时立即 flush | [#1113](https://github.com/netease-youdao/LobsterAI/pull/1113) | PR 已 OPEN 待合并 | **高** |

**路线图信号**：项目在「**Onboarding/Analytics → Artifacts 分享 → 定时任务可靠性 → OpenClaw 同步治理**」上形成了一条较清晰的演进链，值得在下次 Release Notes 中聚合发布。

---

## 7. 用户反馈摘要

- **痛点：模型/Agent 生态封闭**
  用户希望像 openclaw 一样接入 hermes-agent（[#1614](https://github.com/netease-youdao/LobsterAI/issues/1614)），并反映切换到本地模型后原有 skill 失效不知如何处理（[#1632](https://github.com/netease-youdao/LobsterAI/issues/1632)），说明**模型可替换性与 skill 可移植性**是核心使用门槛。

- **痛点：多语言覆盖不全**
  切换语言后"条款"、"工具风格"等页面未本地化（[#1586](https://github.com/netease-youdao/LobsterAI/issues/1586)），影响海外用户体验。

- **痛点：稳定性与首启体验**
  多名用户在 macOS 上反馈更新后崩溃（[#1587](https://github.com/netease-youdao/LobsterAI/issues/1587)）、会话与定时任务失效（[#1589](https://github.com/netease-youdao/LobsterAI/issues/1589)），属于典型"升级恐惧"场景。

- **痛点：UI 状态同步缺失**
  删除技能后前端未刷新且重启无效（[#1617](https://github.com/netease-youdao/LobsterAI/issues/1617)），反映出**前端状态与后端真实态不一致**的常见 bug 模式。

- **新反馈情绪警示**
  #2589 用户措辞强烈（"you guys don't expect a repeat customer"），直指 plan mode 计费消耗异常（200 credits），需尽快回应并核实，避免演变为公开信任危机。

---

## 8. 待处理积压

以下 Issue/PR 已存在较长时间或与生产事故密切相关，建议维护者优先处理：

| 类型 | 编号 | 标题 | 关联关系 |
|---|---|---|---|
| PR（stale） | [#1106](https://github.com/netease-youdao/LobsterAI/pull/1106) | 钉钉 IM 通知路由 conversationId 前缀修复 | 关闭 #1105，已有完整方案 |
| PR（stale） | [#1108](https://github.com/netease-youdao/LobsterAI/pull/1108) | 定时任务 pollOnce 重入保护与幽灵事件修复 | 关闭 #1107，已有完整方案 |
| PR（stale） | [#1113](https://github.com/netease-youdao/LobsterAI/pull/1113) | OpenClaw 延迟配置同步在负载清空时立即 flush | 待评审 |
| PR（新） | [#2590](https://github.com/netease-youdao/LobsterAI/pull/2590) | **fix(security): 强化 MCP stdio 命令与外部 URL 边界** | 安全加固，高优先级，建议加速评审 |
| Issue（新） | [#2589](https://github.com/netease-youdao/LobsterAI/issues/2589) | plan mode 消耗 200 credits | 需尽快回应，疑似计费 Bug |

**给维护者的建议**：
1. 三个 stale 状态的高质量 Fix PR（#1106、#1108、#1113）建议一次性合入并打包发布，避免积压导致后续合并冲突。
2. 安全类 PR #2590（MCP 命令注入与 shell.openExternal 协议校验）应优先评审，建议在下一个 patch 版本内发布。
3. 对 #2589 给出官方说明：要么确认是 bug 并修复，要么解释 plan mode 的计费规则并优化 UI 提示。
4. 建议为今日合并的 Artifacts 视频分享功能补充用户向文档与示例。

---

*报告生成时间：2026-09-02 ｜ 数据范围：过去 24 小时 GitHub 活动*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 · 2026-09-02

> 数据范围：2026-09-01 至 2026-09-02 · 数据源：GitHub Issues / Pull Requests

---

## 1. 今日速览

Moltis 过去 24 小时呈现**维护性更新**的小幅活跃状态：2 条 Issue 均已关闭（无新增开放），3 条 PR 中 2 条已合并 / 关闭、1 条文档 PR 仍待合并。无新版本发布。整体节奏健康，主要工作集中在 **Docker 部署场景下的认证与初始化异常** 与 **`moltis doctor` 对 streamable-http MCP 服务器的误判** 两个方向，均已通过 PR 完成修复并闭环，社区反馈通道畅通。

---

## 2. 版本发布

本周期内**无新版本发布**。最近一次正式版本为 `20260827.01`（仍是 #1250 的复现基线）。

---

## 3. 项目进展

今日合并 / 关闭的两条 PR 均已闭环对应 Issue，交付质量较高：

- **PR #1249 — fix(auth): let Docker loopback-only deployments count as local**
  - 作者：@Saraswat123 · 状态：CLOSED ✅
  - 修复 `crates/auth/src/locality.rs` 中过于严格的 `is_local_connection()` 判断。原逻辑要求 TCP 源 IP 必须精确等于 loopback，但 Docker 默认 bridge 网络会在容器侧重写源地址为 bridge 网段地址（如 `172.17.0.x`），导致 Tier 2 本地便利能力（含 `auth_disabled`）失效。
  - **直接关闭** Issue #1112，让容器化部署的用户配置真正生效，是一次关键的安全 / 可用性修复。
  - 链接：https://github.com/moltis-org/moltis/pull/1249

- **PR #1251 — Fix doctor validation for streamable HTTP MCP servers**
  - 作者：@penso · 状态：CLOSED ✅
  - 修复 `moltis doctor` 误报 `streamable-http` 类型 MCP 服务器"缺少 command"的问题：引入共享的 typed MCP transport 定义，识别 `streamable-http` 及其别名；对远程 URL（字面量与 config 解析后）做合法性校验；将凭据存储中未解析的 URL 占位符降级为信息性提示而非失败。
  - **直接对应** Issue #1250，提升诊断工具的准确性。
  - 链接：https://github.com/moltis-org/moltis/pull/1251

两条修复都属于**"小而准"**的类型化重构 + 配置语义修正，体现了项目对 MCP 协议类型安全和部署环境适配的持续投入。

---

## 4. 社区热点

本周期内 Issues / PRs 评论量普遍偏低（最多 1 条评论），未形成集中讨论热点。但围绕 **Docker 部署体验** 的两条 PR 与 Issue 形成了完整的"用户报告 → 复现 → 修复 → 文档化"闭环，是本周期最值得关注的话题主线：

- Issue #1112（auth_disabled 在 Docker 下失效）→ PR #1249（修复）→ PR #1252（文档补全，待合并）
- Issue #1250（doctor 误判 streamable-http MCP）→ PR #1251（修复）

社区诉求清晰：**容器化 / 远程 MCP 集成场景下的配置与诊断正确性**。

---

## 5. Bug 与稳定性

| 严重程度 | Issue / 标题 | 复现版本 | 状态 | 是否有 fix PR |
|---|---|---|---|---|
| 🟠 中（可用性） | [#1112](https://github.com/moltis-org/moltis/issues/1112) Disabling auth doesn't seem to disable auth (Docker) | Docker 默认 bridge 网络 | ✅ 已关闭 | ✅ PR #1249 已合并 |
| 🟡 中（诊断误导） | [#1250](https://github.com/moltis-org/moltis/issues/1250) doctor treats working streamable-http MCP server as missing command | `20260827.01` | ✅ 已关闭 | ✅ PR #1251 已关闭 |

两条 Bug 均**当日关闭且有对应修复**，无遗留回归风险。值得注意的是 PR #1249 的修复思路（桥接网络识别为 loopback 等效）需要后续安全审计确认是否引入了其他攻击面变化，建议在下一版本 changelog 中明确说明。

---

## 6. 功能请求与路线图信号

本周期内**未出现新功能请求** Issue。但从已合并的修复可以读出路线图信号：

- **MCP transport 类型化重构**（PR #1251）：暗示项目正在为更复杂的 MCP 集成（多 transport、远程凭据解析）打基础，未来可能扩展 OAuth / bearer token 远程 MCP 支持。
- **容器化部署的"一等公民"化**（PR #1249 + PR #1252）：Docker / compose 场景被作为正式支持路径，预计下一版本会进一步完善容器部署文档与权限模型。
- **PR #1252** 仍 OPEN，旨在将 bind-mount 权限修复写进文档，关联老 Issue #293，说明项目在持续清理历史容器化部署陷阱。

---

## 7. 用户反馈摘要

- **@methompson（#1112）**：反映 Docker 默认 bridge 网络下 `auth_disabled=true` 不生效，本地开发体验受阻；期望容器化部署能"开箱即用"，不必为绕开认证手动改源码或换网络模式。
- **@xorets（#1250）**：使用 `20260827.01` 版本，配置 `streamable-http` 远程 MCP 服务器后，`moltis doctor` 误报失败；用户痛点是**诊断工具不可信**——一旦 doctor 红就难以快速判断是配置错误还是工具 bug。
- **整体情绪**：偏向积极。用户报告清晰、提供 minimal config 复现，问题响应与修复速度较快（多数 24 小时内闭环）。

---

## 8. 待处理积压

- **PR #1252 — docs(docker): document the bind-mount permission fix for fresh deploys**
  - 作者：@Saraswat123 · 状态：🟡 OPEN，等待 Review
  - 该 PR 关闭的是 Issue #293（一个较早的容器部署痛点），建议维护者优先 review，完成"修复 + 文档"闭环的最后一步。
  - 链接：https://github.com/moltis-org/moltis/pull/1252

此外 Issue #1112 与 #1250 虽然已关闭，但用户在同一时期反复遇到 Docker / MCP 配置类问题，建议维护者考虑：

1. 在 README 与 docs 中增加 **Docker 部署的 FAQ 章节**（覆盖 bridge 网络、bind-mount 权限、auth_disabled 行为）；
2. 增强 `moltis doctor` 对远程 MCP transport 的覆盖度，避免类似 #1250 的误报再次出现。

---

*本报告基于公开 GitHub 数据生成；评论与 reactions 数据截至 2026-09-02。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目日报

**日期**：2026-09-02
**数据周期**：过去 24 小时
**项目**：agentscope-ai/CoPaw（QwenPaw）

---

## 1. 今日速览

CoPaw 过去 24 小时继续保持高强度迭代节奏：发布 1 个 Beta 版本（v2.2.0-beta.6），合并/关闭 15 个 PR，新增并活跃 21 个 Issue。当前社区活跃度处于 **v2.2.0 Beta 周期** 的典型高位——桌面端 ReMe 长期记忆链路、Windows 打包与启动链路、MCP 工具治理三线并发修复，另有移动端、pawport 导入、ReMe 升级等较大特性处于评审阶段。项目整体处于"为 v2.2.0 正式版清障"的冲刺状态。

---

## 2. 版本发布

### v2.2.0-beta.6

- **类型**：Beta（pre-release）
- **Release-Duty Issue**：[#7475](https://github.com/agentscope-ai/QwenPaw/issues/7475)（发布后 4 小时内完成安装验证）

**已合入的关键改动**：

- [#7458](https://github.com/agentscope-ai/QwenPaw/pull/7458) `fix(desktop)`：桌面端打包时补齐 ReMe 入口点插件，呼应 [#7446](https://github.com/agentscope-ai/QwenPaw/issues/7446) 报告的"重建内存索引 500 错误"。
- [#7452](https://github.com/agentscope-ai/QwenPaw/pull/7452) `test(console)`：扩展 Console 单元测试，新增 617 个用例，语句覆盖率提升 10.61pp，Console 端质量防线进一步加固。

**升级提示**：v2.2.0-beta.6 在 Windows 桌面安装包上对 ReMe Python 核心打包逻辑做了修复（PyInstaller onedir 漏包），从 beta.5 升级到 beta.6 的用户需重新安装桌面端才能获得完整长期记忆功能。

---

## 3. 项目进展

### 已合并/关闭的重要 PR（节选）

| PR | 主题 | 影响 |
|---|---|---|
| [#7468](https://github.com/agentscope-ai/QwenPaw/pull/7468) | `fix(memory)`：在模型配置前启动 ReMe | 修复全新桌面安装 + 未完成 onboarding 场景下的启动崩溃，避免 ProviderError 上抛导致工作区内存服务不可用 |
| [#7472](https://github.com/agentscope-ai/QwenPaw/pull/7472) | `fix(governance)`：阻止 shell 行续行符绕过敏感路径检查 | **安全修复**——POSIX shell 在分词前会去除 `\<newline>`，旧 Tool Guard 检查原文本而执行规范化文本，存在可被绕过的安全缝隙 |
| [#7453](https://github.com/agentscope-ai/QwenPaw/pull/7453) | `fix(pack)`：在 PyInstaller onedir 中捆绑 reme-ai Python 核心 | 修复 [#7446](https://github.com/agentscope-ai/QwenPaw/issues/7446)，Windows 安装包中 `_internal/reme/` 为空导致的 `_reme is None` 运行错误 |
| [#7466](https://github.com/agentscope-ai/QwenPaw/pull/7466) | `fix(console)`：Daily Paper 链接指向 QwenPaw 自身文档 | 文档一致性改进 |
| [#7432](https://github.com/agentscope-ai/QwenPaw/pull/7432) | `fix(config)`：在工作区目录中展开 `~` | 修复 `~` 配置的工作区未进入 `/api/agent-stats/llm-tool-trend` 聚合 |
| [#7439](https://github.com/agentscope-ai/QwenPaw/pull/7439) | `fix`：截图保存到当前项目目录 | 修复合法截图指令产生"预览错误"的问题 |
| [#7416](https://github.com/agentscope-ai/QwenPaw/pull/7416) | `feat(console)`：暴露钉钉宽屏卡片 `card_auto_layout` 开关 | 落地 [#7404](https://github.com/agentscope-ai/QwenPaw/issues/7404) |

**整体评价**：今日合入的修复覆盖了"安全绕过 + 启动崩溃 + 桌面打包漏包 + Console UI 完整性"四类关键问题，v2.2.0 正式版前最严重的回归已得到系统性处理。

---

## 4. 社区热点

按评论数排序，最受关注的 Issue：

1. **[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)（5 条评论）** —— 主 Agent + 多子 Agent 协同场景下，子 Agent 异常时主 Agent 不会主动巡检进度，必须用户开口询问。`@rerbin` 在 [Issue 评论](https://github.com/agentscope-ai/QwenPaw/issues/7450)中描述：长时间无响应且失败时仍不汇报。这是当前最热议题，反映**多 Agent 编排的"心跳与异常回流"机制** 缺位。
2. **[#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443)（4 条评论）** —— `dangerous instructions` 容易逃避审查。涉及 QwenPaw 安全/提示词注入防御层，社区关注的是 2.1.0 → 2.2.0 期间是否引入了退化。
3. **[#7464](https://github.com/agentscope-ai/QwenPaw/issues/7464)（3 条评论）** —— DashScope Embedding 索引重建始终显示"配置未保存"。[#7465](https://github.com/agentscope-ai/QwenPaw/pull/7465) 已尝试规范化 `use_dimensions` 字段，但 Issue 仍在 OPEN，根因可能更深。
4. **[#7446](https://github.com/agentscope-ai/QwenPaw/issues/7446)（3 条评论，已关闭）** —— Embedding index rebuild 500 错误。**已有 fix**：[#7453](https://github.com/agentscope-ai/QwenPaw/pull/7453) 已合并入 beta.6。

**诉求归纳**：v2.2.0 beta 用户对**多 Agent 协同稳定性、安全防御可靠性、ReMe/Embedding 链路完整性** 三方面表达出强烈不满。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 已有 Fix？ |
|---|---|---|---|
| 🔴 高 | [#7446](https://github.com/agentscope-ai/QwenPaw/issues/7446)（已关闭） | Windows 桌面端"重建内存索引"500 错误 | ✅ [#7453](https://github.com/agentscope-ai/QwenPaw/pull/7453) |
| 🔴 高 | [#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469) | ReMe 后台 embedding/indexing 因 `as_embedding:default` 在 `start()` 前被访问而**静默失败**，新记忆无法入库 | ⚠️ [#7468](https://github.com/agentscope-ai/QwenPaw/pull/7468) 修了一部分，但该 Issue 描述的 OpenAI 兼容后端路径尚未完全收敛 |
| 🔴 高 | [#7470](https://github.com/agentscope-ai/QwenPaw/issues/7470) | MCP per-tool 白名单（`card.config.tools`）**未在主 Agent runtime 路径生效**——安全配置形同虚设 | ❌ 暂无 PR |
| 🟠 中 | [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) | 多 Agent 协同下，子 Agent 异常不被主 Agent 主动发现 | ❌ 暂无 PR |
| 🟠 中 | [#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474) | PR #7337 引入 `max_tokens → max_output_length` 迁移后，custom provider 模型无法加载 | ❌ 暂无 PR（迁移文档/兼容层缺位） |
| 🟠 中 | [#7476](https://github.com/agentscope-ai/QwenPaw/issues/7476) | Cron 任务在 misfire_grace 窗口内被重复调度，备份脚本执行两次 | ❌ 暂无 PR |
| 🟡 中 | [#7467](https://github.com/agentscope-ai/QwenPaw/issues/7467) | `loop.rubric` 强制确认轮 + console 自动折叠遮盖实质性首条回复（2.2.0 beta 引入） | ❌ 暂无 PR（回归） |
| 🟡 中 | [#7464](https://github.com/agentscope-ai/QwenPaw/issues/7464) | DashScope Embedding 索引重建按钮始终报告"未保存" | ⚠️ [#7465](https://github.com/agentscope-ai/QwenPaw/pull/7465) 部分相关，仍 OPEN |
| 🟡 中 | [#7479](https://github.com/agentscope-ai/QwenPaw/issues/7479) | 消息通道拼错的命令（如 `/mew`）仍被作为消息转发给 Agent | ❌ 暂无 PR |
| 🟡 中 | [#7471](https://github.com/agentscope-ai/QwenPaw/issues/7471) | MCP Clients 页面 `.mcpSection` 容器在暗色模式下渲染为白色 | ✅ [#7473](https://github.com/agentscope-ai/QwenPaw/pull/7473) 待合并 |
| 🟢 低 | [#7463](https://github.com/agentscope-ai/QwenPaw/issues/7463)（已关闭） | 自带 llama.cpp 加载 Spark-X2.5 GGUF 失败（unknown arch 'spark2_5'） | 待上游 llama.cpp 支持 |

---

## 6. 功能请求与路线图信号

| 请求 | 链接 | 现状 |
|---|---|---|
| 全部自带"云端提供商"应可统一停用（Kilo Code/opencode 当前不可停用） | [#7455](https://github.com/agentscope-ai/QwenPaw/issues/7455) | 已关闭（Enhancement，1 条评论），但**未见对应实现 PR**，维护者需澄清处理方式 |
| 通过 pawport 从其他 Agent（Codex、Qoder）导入 instructions/settings/skills/plugins/projects/recent work | [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) | PR OPEN，已存在 20 天，仍在评审，**首个贡献者** |
| 引入 QwenPaw Mobile（Expo/React Native 客户端，覆盖 Android/iOS） | [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) | PR OPEN，`DO NOT MERGE` 草稿，方向性提案 |
| 每会话模型覆盖（per-session model overrides） | [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | PR OPEN 49 天，**Under Review**，首个贡献者 |
| ReMe 升级到 0.4.1.11 并加入"Auto Fin"作为定时长期记忆源 | [#7441](https://github.com/agentscope-ai/QwenPaw/pull/7441) | PR OPEN，方向明确 |
| ReMeLightMemoryCard 增加 reranker UI 配置面板 | [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) | PR OPEN 41 天，**Under Review** |
| Chat 滚动锁 + 富文本编辑器 caret 可见性 | [#7356](https://github.com/agentscope-ai/QwenPaw/pull/7356)、[#7347](https://github.com/agentscope-ai/QwenPaw/pull/7347) | PR OPEN，Console 体验改进 |
| Session thinking 与 model 管理精细化 | [#7163](https://github.com/agentscope-ai/QwenPaw/pull/7163) | PR OPEN 13 天 |
| 第三方记忆层 ViBo（声称节省 97.5% token） | [#7003](https://github.com/agentscope-ai/QwenPaw/issues/7003) | 已关闭（Proposal 形式被婉拒/归档），2 条评论 |

**信号归纳**：v2.3 路线图候选清单已经非常清晰——**多 Agent 协同机制、移动端、第三方生态导入、Console 体验打磨** 是四个最显著方向。

---

## 7. 用户反馈摘要

- **多 Agent 协同**（[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)）：用户实际工作流是"主 Agent + 多子 Agent"处理复杂任务，但子 Agent 失败或长时间卡顿时，主 Agent 不会主动回探，必须用户问"进度如何"才查询。**核心痛点**：编排层缺少异步异常回流/心跳机制。
- **Embedding 链路**（[#7464](https://github.com/agentscope-ai/QwenPaw/issues/7464)、[#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469)、[#7446](https://github.com/agentscope-ai/QwenPaw/issues/7446)）：用户在 v2.2.0 beta.5 上集中遇到 Embedding 索引/重建/后台任务异常，本质是 **ReMe 集成层在 2.2 重构后引入了多处回归**。
- **安全治理**（[#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443)、[#7470](https://github.com/agentscope-ai/QwenPaw/issues/7470)、[#7472](https://github.com/agentscope-ai/QwenPaw/pull/7472)）：用户对"危险指令绕过"和"MCP 白名单不生效"表达担忧，今日 [#7472](https://github.com/agentscope-ai/QwenPaw/pull/7472) 安全修复已被合并，反映治理类问题进入了快速通道。
- **Console UI 体验**（[#7471](https://github.com/agentscope-ai/QwenPaw/issues/7471)、[#7467](https://github.com/agentscope-ai/QwenPaw/issues/7467)、[#7479](https://github.com/agentscope-ai/QwenPaw/issues/7479)）：暗色模式白块、自动折叠遮盖回复、拼错命令被当消息处理——Console 在 2.2 仍有较多打磨空间。
- **满意度信号**：[#7455](https://github.com/agentscope-ai/QwenPaw/issues/7455) 等 enhancement 已被快速响应（当日关闭但需关注是否有后续 PR），[#7466](https://github.com/agentscope-ai/QwenPaw/pull/7466) 文档链接收敛反映维护者对一致性的重视，整体响应节奏健康。

---

## 8. 待处理积压

以下 Issue/PR 已 OPEN 较长时间，建议维护者关注：

| 类型 | 编号 | 标题 | 已开 | 状态 |
|---|---|---|---|---|
| PR | [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | Add per-session model overrides | **49 天** | Under Review（first-time-contributor） |
| PR | [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) | feat: add reranker UI config panel to ReMeLightMemoryCard | **41 天** | Under Review |
| PR | [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) | feat(pawport): import flow from another agent | 20 天 | OPEN（first-time-contributor） |
| PR | [#7163](https://github.com/agentscope-ai/QwenPaw/pull/7163) | feat: refine session thinking and model management | 13 天 | OPEN |
| PR | [#7348](https://github.com/agentscope-ai/QwenPaw/pull/7348) | chore: release notes for v2.2.0 | 6 天 | OPEN（release-blocker 候选） |
| PR | [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) | feat(mobile): QwenPaw native mobile | 5 天 | `DO NOT MERGE` 草稿 |
| PR | [#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401) | fix(acp): prevent Windows ACP agent stalls during workspace bootstrap | 4 天 | Under Review |
| Issue | [#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443) | dangerous instructions evade | 2 天 | 安全类，需提速 |
| Issue | [#7470](https://github.com/agentscope-ai/QwenPaw/issues/7470) | MCP per-tool whitelist 未生效 | 1 天 | **安全类**，需优先响应 |

**维护者提示**：

1. **安全类**（#7443、#7470）应优先指派 owner；
2. **release notes**（#7348）若不开合并将阻碍 v2.2.0 GA；
3. **first-time-contributor**（#6960、#5992）若长时间不响应，会挫伤新人贡献意愿；
4. **多 Agent 心跳/异常回流**（#7450）缺少 owner，属于长期架构议题，建议在路线图中明确排期。

---

**日报小结**：v2.2.0 beta.6 的发布让 CoPaw 在桌面端长期记忆与打包稳定性上迈过了最关键的几个坑，但 v2.2.0 距离 GA 仍需解决 MCP 白名单、多 Agent 协同、安全指令防御、custom provider 迁移等议题。社区活跃度处于高位，建议维护团队在冲刺 GA 的同时，提前公开 v2.3 的方向性信号，以平衡贡献者预期。

</details>

</div>
