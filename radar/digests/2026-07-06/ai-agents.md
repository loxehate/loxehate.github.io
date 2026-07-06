# OpenClaw 生态日报 2026-07-06

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-07-06 08:58 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告



---

## 横向生态对比

好的。以下基于您提供的2026-07-06项目动态，从生态全景、项目活跃度、定位差异、共同趋势等维度进行横向对比分析。

---

## 1. 生态全景

当前个人AI助手/智能体开源生态呈现

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 | 2026-07-06

## 📊 今日速览
过去 24 小时项目活跃度极高：**12 个 Issue 更新**（新开 4，关闭 8），**500 个 PR 更新**（但仅合并/关闭 4 个，其余 496 个仍待审查）。社区提交量爆发但合并率极低，维护者审核压力显著。修复集中在 **Gateway 状态自愈**、**OpenAI 兼容工具调用解析** 与 **CLI 流式响应** 等稳定性方面；同时新浮现 **QQ 通道重连风暴**、**Telegram 长消息截断** 等质量缺陷。无新版本发布。

---

## ✅ 项目进展（今日合并/关闭的重要 PR）

| PR | 要点 | 关联 Issue |
|----|------|------------|
| [#4770](https://github.com/HKUDS/nanobot/pull/4770) `fix(gateway)` | 修复 Gateway 状态刷新时配置文件路径读取错误，保持 `#4547` 的自愈行为 | #4511 / #4547 依赖 |
| [#4547](https://github.com/HKUDS/nanobot/pull/4547) `fix(gateway): self-heal PID` | Windows 下 `/restart` 后 Gateway 状态文件 PID 未更新问题，通过启动时重新读取 PID 自愈 | #4511 |
| [#4017](https://github.com/HKUDS/nanobot/pull/4017) `fix(providers): parse text-format tool_calls` | 解析 OpenAI 兼容提供商（如小米 MiMo）以文本形式嵌入的工具调用，转成结构化 `tool_calls` | #4061 |
| [#4654](https://github.com/HKUDS/nanobot/pull/4654) `fix(cli): print response text when streaming fails` | 交互模式下流式失败时不再静默丢弃 `msg.content`，确保用户看到完整回答 | — |

> 项目今日净修复 **4 个缺陷**，Gateway 子系统与多 provider 兼容性得到增强。

---

## 🔥 社区热点（评论 / 讨论最活跃）

1. **#4061 — OpenAI 兼容工具调用未解析**（6 条评论，已关闭）  
   用户 @hamb1y 发现某些 provider 在 assistant content 中嵌入纯文本工具调用标记，导致 agent 无法分发工具。社区讨论了多种解析策略，最终合并了 `#4017`。  
   [→ Issue](https://github.com/HKUDS/nanobot/issues/4061)

2. **#4511 — Windows Gateway `--background` PID 不一致**（4 条评论，已关闭）  
   @Quincy-Zh 报告重启后状态文件与实际 PID 不符，引发对进程管理的疑问。`#4547` 与 `#4770` 联合修复。  
   [→ Issue](https://github.com/HKUDS/nanobot/issues/4511)

3. **#3436 — 请求支持外部 Agent 集成**（3 条评论，开放 2 月余）  
   @jsapede 希望 Nanobot 能依赖 OpenCode/Codex 等外部 agent 框架工作。至今未合入对应 PR，但社区持续关注。  
   [→ Issue](https://github.com/HKUDS/nanobot/issues/3436)

4. **#4765 — Python SDK 示例 `async with` 立即报错**（2 条评论，已关闭）  
   @The-Markitecht 发现官方文档示例中 `Nanobot` 不支持异步上下文管理器协议。虽然 WebUI 正常，但 SDK 文档存在误导。  
   [→ Issue](https://github.com/HKUDS/nanobot/issues/4765)

---

## 🐛 Bug 与稳定性（按严重程度排列）

### 今日新报 / 仍开放的 Bug

| Issue | 描述 | 严重性 | 状态 / 修复 PR |
|-------|------|--------|----------------|
| [#4767](https://github.com/HKUDS/nanobot/issues/4767) | QQ 通道 WebSocket 重连无退避，DNS/网络故障时每秒刷满错误日志 | ⚠️ 中等（日志洪水） | **PR #4768** 已提交（指数退避） |
| [#4655](https://github.com/HKUDS/nanobot/issues/4655) | `long_task` 工具引用内置技能文件 `skills/long-goal/SKILL.md` 找不到，导致长期目标失败 | 🔴 高（功能阻塞） | 无对应 fix PR |
| [#4637](https://github.com/HKUDS/nanobot/issues/4637) | Telegram 长消息分割后前半部分无法渲染（Markdown 截断） | 🟡 中（UI 异常） | 无 fix PR |
| [#4544](https://github.com/HKUDS/nanobot/issues/4544) | Windows 下 `exec` 对单行/多行命令分别使用 cmd.exe 与 PowerShell，语义不一致 | 🟡 中（跨平台行为） | 无 fix PR |
| [#4068](https://github.com/HKUDS/nanobot/issues/4068) | Matrix 通道流缓冲区

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>



</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>



</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

好的，根据您提供的 NanoClaw 项目数据，我为您生成了 2026-07-06 的完整项目动态日报。

---

# NanoClaw 项目动态日报 | 2026-07-06

**项目健康度评估：** 🟢 稳健迭代中。核心功能开发（Agent 模板、SSF 标准化）进入收尾阶段，基础设施（守卫模块、格式化开光）与安全基线（Guardrails）持续巩固。

## 1. 今日速览
过去 24 小时内 NanoClaw 维持较高技术迭代活跃度。共有 **3 个特性 PR 被合并/关闭**，核心贡献者 @amit-shafnir 完成了 Codex 服务商下的模板集成及守卫模块的初次提交，这标志着项目正在向更安全、更标准化的架构迈进。社区层面，用户提出了 1 项关于图像生成能力的新需求。目前有 **3 个高价值 PR 待审**，主要集中在 Agent 模板 Setup 流程与模型路由能力上。

## 2. 版本发布
（当日无新版本发布，此节省略。）

## 3. 项目进展
今日合并/关闭的 3 个 PR 标志着多项基础设施的完善与重大功能的推进：

- **Codex 提供商完成 Agent 模板集成 `#2908 [CLOSED]`**：该 PR 由 @amit-shafnir 贡献，针对 Codex 提供商完成了 `persona prepend` 和 `git-independent skill discovery`。这解除了 Agent 模板系列功能（特指 `#2909`）的最后阻塞，实现了在 Codex 提供商下的端到端运行。
    - [PR #2908](https://github.com/nanocoai/nanoclaw/pull/2908)

- **“守卫”安全技能正式入库 `#2726 [CLOSED]`**

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>



</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 | 2026年7月6日

---

## 1. 今日速览

项目今日保持**高强度开发节奏**。过去 24 小时内，共合并/关闭 **7 个 Pull Request**，无新 Issue 报告。虽然社区直接互动较少（0 评论、0 点赞），但开发侧高度活跃，核心贡献者 `@fisherdaddy`、`@btc69m979y-dotcom` 和 `@liuzhq1986` 密集推进了多项关键功能。重点聚焦在 **AI 提供商生态拓展（xAI/Grok 接入）**、**内置生产力工具升级（邮件多账户）** 以及 **Agent/Cowork 交互体验重构**。项目整体健康度良好，维护团队处理速度极快，当日 PR 全部结清，无积压。

---

## 2. 版本发布

_无。_ 今日无新版本发布。

---

## 3. 项目进展

今日合并的 7 个 PR 反映出项目在**功能深度**与**架构健壮性**两方面的并行推进：

### 核心功能扩展

- **PR #2276** `feat(providers): add xAI (Grok) OAuth login support`
  @fisherdaddy
  **摘要：** 实现了针对 xAI/Grok 的浏览器 PKCE OAuth 登录，并在回调端口被占用时提供了 Device Code 回退机制。凭证被写入 OpenClaw 认证配置存储，xAI 正式成为可选模型提供方。
  **链接：** https://github.com/netease-youdao/LobsterAI/pull/2276

- **PR #2278** `feat(openclaw): add heartbeat toggle setting`
  @btc69m979y-dotcom
  **摘要：** 在 Settings > Agent Engine 中为 OpenClaw 添加了心跳检测开关（默认开启），并通过 Cowork 配置实现持久化同步。
  **链接：** https://github.com/netease-youdao/LobsterAI/pull/2278

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

好的，这是为您生成的 CoPaw (QwenPaw) 项目 2026-07-06 动态日报。

---

## CoPaw (QwenPaw) 项目动态日报 | 2026-07-06

**分析师注释：** 本报告基于 `agentscope-ai/QwenPaw` 开源仓库的公开数据。虽然项目名称为“CoPaw”，但所有数据均来源于 QwenPaw 仓库。为准确反映项目状态，本报告在提及项目时使用 “QwenPaw”，但整体分析框架与上下文仍针对您所关注的“CoPaw”项目。

---

### 1. 今日速览

项目在2026年7月6日展现出极高的维护活跃度，社区贡献与核心团队协同并进。**今日焦点**在于两大方面：一是由社区贡献者 `@hanson-hex` 领导的大规模回归测试体系建设，一口气提交了多个测试相关的 PR，显著增强了项目的代码健壮性与稳定性保障；二是针对 v2.0.0 预发布版本暴露出的问题及累积的技术债务，核心团队与贡献者在修复、内存管理和新渠道集成上持续发力。尽管没有新版本发布，但密集的 PR 合并与 Issue 闭环表明项目正持续向内稳定性和外延功能两个方向稳步推进。

- **活跃度评估：** 极高。27 条 Issue 更新与 36 条 PR 更新，表明社区反馈和开发活动均处于高位。
- **贡献趋势：** 社区贡献活跃，特别是 `@hanson-hex` 和 `@Osamaali313` 等新贡献者提交了重要的质量保障和 Bug 修复。
- **稳定性建设：** 回归测试套件的大量补充（如 #5813, #5812, #5811 等）是今日最值得关注的项目健康度信号，显示项目正从功能开发转向质量巩固阶段。

### 2. 版本发布

- **暂无新版本发布。**

### 3. 项目进展（今日合并/关闭的重要 PR）

今日项目在 Bug 修复、架构对齐和功能增强方面取得了多项关键进展，以下为已合并/关闭的核心 PR：

- **修复 OpenRouter OAuth 路由丢失问题**：[#5806](https://github.com/agentscope-ai/QwenPaw/pull/5806) - 由核心成员 `@rayrayraykk` 修复了在 Runtime 2.0 重构中意外被丢弃的 OpenRouter OAuth 端点，保障了第三方提供商的认证链路。
- **修复定时任务时区问题**：[#5783](https://github.com/agentscope-ai/QwenPaw/pull/5783) - 合并了 `@wananing` 的修复，解决了 `cron state` API 返回 UTC 时间而非任务配置时区的 Bug (#5779)，提升了定时任务的可用性。
- **修复元宝渠道连接失败**：[#5804](https://github.com/agentscope-ai/QwenPaw/pull/5804) - 由 `@hongxicheng` 修复了因 `api_domain` 为空字符串和缺少 proto 描述符导致的连接失败问题，并优化了构建配置。
- **修复 Runtime 回归错误**：[#5803](https://github.com/agentscope-ai/QwenPaw/pull/5803) - 由 `@rayrayraykk` 修复了 `_process_memory_section` 调用中一个过时的 `language` 参数，清理了 PR #5396 引入的预提交回归。
- **新增 Auto-memory 状态管理**：[#5777](https://github.com/agentscope-ai/QwenPaw/pull/5777) - `@jinliyl` 实现了基于会话的 auto-memory 状态追踪，通过引入 `_auto_memory_turn_states` 字典，解决了跨请求代理重建导致的内存状态丢失问题，对应 Issue #5775。
- **修复“/api”路径重复导致的 404**：[#5769](https://github.com/agentscope-ai/QwenPaw/issues/5769) - 该严重 Bug 已于今日关闭。问题根源在于控制台前端打包后的 JS 中，API 调用拼接了重复的 `/api` 前缀，此修复消除了 v2.0.0b2 版本的访问障碍。
- **修复 Mission Mode 与 Runtime v2 架构断裂**：[#5442](https://github.com/agentscope-ai/QwenPaw/pull/5442) - 一个重要的架构对齐 PR 被合并。该 PR 解决了 Mission Mode 在执行引擎、命令注册与会话标志等方面与全新的 Runtime v2 架构完全脱节的问题。

**总结：** 今日项目通过修复时区、OAuth、路径错误等多项实际 Bug，并推进了关键模块（Memory、Mission Mode）向新架构的迁移，项目整体的集成度和稳定性得到显著提升。

### 4. 社区热点

今日社区讨论焦点主要集中在用户体验与即时通讯（IM）集成稳定性上。

- **最热 Issue：**[#5757 [Bug] 飞书信息不回复情况](https://github.com/agentscope-ai/QwenPaw/issues/5757)
  - **动态：** 该问题获得 10 条评论，是今日讨论最热烈的议题。
  - **分析：** 用户反馈在 Docker 版本和官方 AgentScope Platform 上，飞书（Feishu）Bot 在回复第一条消息后便“失声”，尽管显示“已收到”。这暴露了飞书渠道在长连接或会话状态管理上可能存在严重缺陷，影响了核心IM集成体验。
- **持久热点：**[#5273 [Tracking] QwenPaw v2.0.0 Pre-release Bug Tracker](https://github.com/agentscope-ai/QwenPaw/issues/5273)
  - **动态：** 持续更新，是 v2.0.0 预发布版本的唯一集中问题追踪点。
  - **分析：** 该 Issue 作为“总看板”，其持续的活跃度表明 v2.0.0 的稳定性仍是社区和开发团队的首要关切。
- **新晋热点：**[#5775 [Bug] Auto-memory interval never triggers](https://github.com/agentscope-ai/QwenPaw/issues/5775)
  - **动态：** 该 Bug 由 `@howyoungchen` 提交并详细分析了根因，很快便有了对应的修复 PR (#5777)。
  - **分析：** 这是一个v2.0.0b3版本的严重功能 Bug，社区用户提供了高质量的根因分析，驱动了快速修复，体现了健康社区的正向反馈循环。

### 5. Bug 与稳定性

今日报告的 Bug 涵盖了从阻断性问题到兼容性等多个层面，以下为按严重程度排列的关键 Bug。

| 严重程度 | 标题/编号 | 简介 | 修复状态 |
| :--- | :--- | :--- | :--- |
| **严重** | [#5775](https://github.com/agentscope-ai/QwenPaw/issues/5775) Auto-memory 间隔永不触发 | MemoryMiddleware 状态在每次请求重建 Agent 时丢失，导致**自动记忆功能完全失效**。 | **已有 fix PR (#5777)，已合并。** |
| **严重** | [#5782](https://github.com/agentscope-ai/QwenPaw/issues/5782) Google Gemini Embedding 不兼容 | API调用成功，但 SDK 解析的 index 为 None，导致**向量搜索静默回退为关键词搜索**，用户无感知。 | 暂无修复 |
| **严重** | [#5789](https://github.com/agentscope-ai/QwenPaw/issues/5789) 上下文压缩时模型输出超长导致崩溃 | 在上下文压缩过程中，模型输出超过JSON Schema限制，`jsonschema.validate()` 抛出异常，导致流程中断。 | 暂无修复 |
| **中等** | [#5757](https://github.com/agentscope-ai/QwenPaw/issues/5757) 飞书信息不回复 | IM渠道 Bot 在回复第一条后挂起，导致**核心沟通渠道不可用**。 | 暂无修复 |
| **中等** | [#5725](https://github.com/agentscope-ai/QwenPaw/issues/5725) Console 流式输出卡顿 | 流式输出过程中浏览器出现明显卡顿，响应完成后恢复，对比竞品体验不佳。 | 暂无修复 |
| **中等** | [#5779](https://github.com/agentscope-ai/QwenPaw/issues/5779) cron state 返回 UTC 时间 | 定时任务状态 API 硬编码 UTC 时间，忽略任务配置的时区，**导致前端展示时间与用户预期不符**。 | **已修复并合并 (#5783)** |
| **轻微** | [#5771](https://github.com/agentscope-ai/QwenPaw/issues/5771) 调试日志误用 WARNING 级别 | `model_factory.py` 中调试日志使用 `WARNING` 级别，导致**日志刷屏**，干扰问题排查。 | 暂无修复 |

### 6. 功能请求与路线图信号

今日用户提出的新功能需求更偏向于团队协作与精细化管理。

- **团队账号管理：**[#5780](https://github.com/agentscope-ai/QwenPaw/issues/5780) - 用户 `@24krmb` 提出了多用户账号管理的强烈需求，希望实现基于角色的访问控制和按用户配置的策略。这表明项目正从个人工具向团队级平台演进，是**重要的路线图信号**。
- **定时任务弹窗开关：**[#5797](https://github.com/agentscope-ai/QwenPaw/issues/5797) 与 **[#5793](https://github.com/agentscope-ai/QwenPaw/issues/5793) 时间戳常驻开关** - 两者都体现了用户对**个性化配置**的诉求，反对“一刀切”的设计。这些是典型的“社区驱动”的功能打磨点，实现成本低但能显著提升用户体验。
- **新渠道：**[#5168](https://github.com/agentscope-ai/QwenPaw/issues/5168) (Zalo Bot) 与 [#5762](https://github.com/agentscope-ai/QwenPaw/pull/5762) (Azure Bot) - 对新增 IM 渠道的呼声仍在持续。`@hongxicheng` 提交的 Azure Bot 渠道 PR (#5762) 是一个积极的信号，表明项目有意通过 Azure Bot Framework 间接支持 Teams、Slack 等多个平台。
- **Web控制台消息自动刷新：**[#5795](https://github.com/agentscope-ai/QwenPaw/issues/5795) - 用户反馈 Web Console 无法实时显示微信渠道的新消息，需要手动切换页面。这是一个基础体验问题，可能涉及到 WebSocket 推送机制的完善。

### 7. 用户反馈摘要

- **对 v2.0.0 的期待：** 用户 `@vipcys001-bot` 在 [#5770](https://github.com/agentscope-ai/QwenPaw/issues/5770) 中表达了对 v2.0 正式版的期待，反映了社区对重大版本更新的关注。
- **对性能（卡顿）的不满：** 用户在 [#5725](https://github.com/agentscope-ai/QwenPaw/issues/5725) 中对比 DeepSeek 网页版，明确指出了 Console 端流式输出的卡顿问题，这是一个清晰的**竞品体验劣势**。
- **对 IM 稳定性的担忧：** 飞书渠道“石沉大海”的问题（#5757）和微信消息延迟问题（#5795），表明 IM 渠道作为核心交互入口，其可靠性是用户最在意的痛点之一。
- **对“因噎废食”的吐槽：** 用户 `@happieme` 在功能请求 [#5797](https://github.com/agentscope-ai/QwenPaw/issues/5797) 中，以“千问不要因噎废食”的措辞，表达了开发者决策不应完全替代用户选择的诉求，社区对个性化控制权的呼声渐高。

### 8. 待处理积压

- **v2.0.0 关键 Bug：** `#5776` [Stale pinned first user message treated as active task](https://github.com/agentscope-ai/QwenPaw/issues/5776) 和 `#5775` (已修复) 等直接影响 v2.0.0 预发布版核心体验的 Bug 虽已有关注和修复，但问题追踪 (#5273) 仍在持续，提醒维护者需持续关注跟踪看板，避免新 Bug 积压。
- **社区工具需求：** `#5168` [Add official Zalo Bot channel support](https://github.com/agentscope-ai/QwenPaw/issues/5168) 自6月13日提出后，除初始讨论外无跟进，对于越南及东南亚社区用户来说，这是一个被等待的反馈。如果支持计划有变，建议官方给予回应。
- **新晋阻塞性问题：** `#5789` [Context compression crashes](https://github.com/agentscope-ai/QwenPaw/issues/5789) 是一个可能导致任务流程中断的严重 Bug，且暂无 PR 关联。鉴于其对核心 Agent 功能的破坏性，建议维护者优先评估并处理。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>