---
title: "AI CLI 工具社区动态日报"
published: 2026-09-15
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-15

> 生成时间: 2026-09-15 00:00 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Deepseek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告

**日期：2026-09-15** | **覆盖工具：Claude Code / OpenAI Codex / Gemini CLI / DeepSeek Reasonix / OpenCode / Hermes / Deepseek Harness**


## 1. 生态全景

AI CLI 工具赛道正处于**从"能用"向"可信、可控、可观测"过渡的关键阶段**。六个头部工具在 24 小时内合计更新超过 210 条 Issue 与 250 条 PR，版本迭代密度极高（6 个工具共发布 8 个版本）。社区反馈的焦点已从"功能多少"转向**数据安全（会话迁移丢失、记忆隐私）、配额透明度（计费异常、静默降级）、跨平台稳定性（Windows/macOS 沙箱与远程协作）**——这些是决定付费用户与专业开发者是否长期投入信任的核心问题。同时，各工具也在加速构建差异化能力：Claude Code 深耕 Mods 插件生态，Codex 强化企业级沙箱与 Guardian 审查，Gemini 押注 AST 感知与零依赖沙盒，OpenCode 则在可观测性与多模型协议层发力。


## 2. 各工具活跃度对比

| 工具 | 活跃 Issues | 新增/更新 PRs | 版本发布（24h） | 关键版本内容 | 社区热度信号 |
|---|---|---|---|---|---|
| **Claude Code** | 10 个重点（最热 #38335 达 **851 评论 / 476 👍**） | 5 个重点（3 合并） | **v2.1.271** | Remote Sessions fast mode；/config 鼠标支持 | 高热度 Issue 持续时间最长（近 6 个月） |
| **OpenAI Codex** | 10 个重点（35 条总更新） | 10 个重点（50 条总更新） | **rust-v0.155.0-alpha.4**、**alpha.2.4** | 未提供变更说明（Alpha 迭代） | 高赞集中于 #45019（26 👍）、#17401（21 👍） |
| **Gemini CLI** | 10 个重点（最高 13 评论） | 10 个重点 | **v0.61.0-nightly.20260914** | 策略目录权限审计、A2A 凭据保护、沙箱防崩溃 | 8 个 👍 即进入最高榜，社区体量偏小但反馈集中 |
| **DeepSeek Reasonix** | 10 个重点（共 20 条活跃） | 10 个重点（5 合并，含 5 个架构级 PR） | **v1.38.8**（CLI/Desktop）+ **Studio v2.15.0** | 会话存储 v4 迁移（引发严重回归）；Studio 重构执行权威 | 发布后即爆发多起数据丢失类 Issue，热度由回归驱动 |
| **OpenCode** | 8 条活跃 | 10 个重点（50 条总更新） | **v1.18.31** | ACP 会话模型/推理边界修复；TUI 认证错误显式提示 | 体量最小但议题前沿（W3C trace、二进制类型） |
| **Hermes** | 4 条（全部） | 10 个重点（50 条总更新） | **v0.21.3**（v2026.9.14，积压约 338 PR） | 修复 remote-gateway 登录；稳定 Docker/Cloud 标签 | 单日 PR 吞吐量最高（约 338 合并） |
| **Deepseek Harness** | — | — | 无 | 过去 24 小时无活动 | 处于静默期 |


## 3. 共同关注的功能方向

### 3.1 平台稳定性：Windows 已成集体短板

| 工具 | 具体问题 | 影响 |
|---|---|---|
| **Claude Code** | Cowork Plan9 挂载因 KB5124008 全面失败（#92984）、PowerShell 调用延迟 154 秒（#94344） | 远程协作不可用 |
| **OpenAI Codex** | Computer Use 截图失败（#25178）、lsass 句柄泄漏（#33356）、输出 >2MiB 被静默丢弃 | 桌面自动化瘫痪 + 系统性能退化 |
| **DeepSeek Reasonix** | bash 工具因 sandbox 配置失效完全不可用（#10292） | Agent 无法执行命令 |
| **Hermes** | gateway 非交互启动永久挂起 + 双重启动竞态（#106934） | 自动化/CI 场景被阻塞 |
| **OpenCode** | Defender 将可执行文件标记为木马（#49047）；后台服务启动失败仅显示笼统 timeout（#49040） | 安装与排障双重受阻 |

**共同诉求**：Windows 用户需要与 macOS/Linux 对等的沙箱实现、进程隔离与 UI 稳定性——这已成为各工具扩大用户基数的首要门槛。

### 3.2 会话数据完整性与恢复可靠性

| 工具 | 具体问题 |
|---|---|
| **DeepSeek Reasonix** | v4 迁移后新建会话写入 deletedTopics 并从 UI 消失（#10286）；压缩上下文失效（#10289） |
| **Claude Code** | 流式响应中 thinking 块间文本静默丢失，影响约 3,738 实例（#85443） |
| **OpenCode** | ACP 会话恢复时模型/effort/推理边界丢失（v1.18.31 修复） |
| **Hermes** | opencode-zen 会话被永久污染，重试全部失败（#111309） |
| **Gemini CLI** | /compress 不写回 session 文件，重启即失效（#21335） |

**共同诉求**：会话不仅是聊天记录，更是工作状态的载体。各工具需保证**迁移不丢数据、压缩可持久、恢复后行为与原始会话一致**。

### 3.3 沙箱与权限控制的精细化

| 工具 | 代表性需求 |
|---|---|
| **Gemini CLI** | 零依赖 OS 沙盒 + 执行后意图路由，释放 bash 原生能力（#19873）；策略目录权限审计（#29336） |
| **OpenAI Codex** | Unix socket 权限跨平台对齐（#45548/#45534）；Windows 沙箱注册包执行（#45550） |
| **DeepSeek Reasonix** | `[sandbox] bash = "off"` 真正生效（#10297） |
| **OpenCode** | 每项目独立 `/tmp` 目录，实现更细粒度隔离（#49073） |
| **Hermes** | MCP 服务器 `allowed_tools` 白名单强制实施（#106989） |

**共同诉求**：从"全有或全无"的沙箱开关走向**按项目、按工具、按网络策略分层的可控执行模型**，同时保证权限变更可审计、不静默失效。

### 3.4 用量可预期性与成本透明

| 工具 | 代表性需求 |
|---|---|
| **Claude Code** | Max 套餐额度异常消耗 #38335（当前全社区最热 Issue） |
| **OpenAI Codex** | 可执行任务预算（#45536）、项目级优先级调度（#45539）、限额到达时不应中断活动 turn（#45444） |
| **Gemini CLI** | 模型简写解析不一致（--model sonnet 指向旧版） |
| **Hermes** | OpenRouter 组织预算超限 403 被误判为 auth 错误（#107173） |

**共同诉求**：用户要求**预算上限可设置、用量消耗可追踪、达到限额时行为可预期**。这已从"显示层需求"上升为"调度层功能"。

### 3.5 模型行为可见性与精确控制

| 工具 | 代表性需求 |
|---|---|
| **OpenCode** | Qwen3.8 `xhigh` 变体静默禁用推理——HTTP 200 但思考从未启用（#49079）；DeepSeek V4 `none` 变体（#31795） |
| **OpenAI Codex** | 暴露内置图像模型并支持选择（#43965） |
| **Gemini CLI** | 子代理中断原因被误报为 GOAL 成功（#22323），错误报告失真 |
| **Claude Code** | 用量限制警告显示父模型而非实际子代理模型（#93046） |

**共同诉求**：**模型变体、推理强度、用量归因必须与实际行为一致，任何形式的"静默降级"都不可接受**。


## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特征 | 差异化优势 | 当前最大挑战 |
|---|---|---|---|---|---|
| **Claude Code** | 通用开发者优先的 Agentic IDE/CLI | 前端/全栈开发者、Anthropic 付费用户 | Remote Sessions 云托管 + Cowork 桌面协作；Mods 插件体系 | 社区规模最大（850+ 评论 issue）、生态化路径清晰（function hooks 数周内落地） | 计费信任危机 + Windows Cowork 体验崩塌 |
| **OpenAI Codex** | 安全至上的企业级 Agent 平台 | 企业团队、安全敏感型组织、Windows 重度用户 | Rust 核心；Guardian 审查机制；多平台沙箱（Seatbelt/Bubblewrap/Windows） | 企业级治理（Guardian）+ 跨平台沙箱一致性投入最大 | Windows 桌面自动化与沙箱稳定性问题最集中 |
| **Gemini CLI** | 深度集成 Google 生态的轻量 Agent | GCP 开发者、多模态工作流用户、Linux 桌面 | 子代理编排；策略目录权限体系；AST 感知工具探索 | 安全设计前瞻性（策略目录审计/A2A 凭据保护）；nightly 节奏快 | 子代理可靠性（误报/挂起）损害信任；社区体量偏小 |
| **DeepSeek Reasonix** | 高性价比的多模型桌面/CLI 混合体 | 成本敏感型开发者、第三方 API 用户（Ollama/中转站） | Electron 桌面 + Studio 可视化；双轨执行架构重构中 | 版本迭代激进（同时发 3 个版本）；Studio 架构重构有魄力 | v1.38.8 迁移事故暴露升级流程风险；Windows 基础体验待补 |
| **OpenCode** | 协议级可插拔的 Agent 基础设施 | 追求定制化的资深开发者、Nix 用户、自托管团队 | AI 协议层重构（Protocol.withBody）；codemode 二进制类型支持；W3C trace 传播 | 技术前瞻性最强（观测性/多模型方言）；TUI 轻量 | 社区体量最小；Windows Defender 误报阻碍采用 |
| **Hermes** | 多通道（Telegram/桌面/TUI）多渠道 Agent 框架 | 自动化重度用户、开源社区、消息驱动工作流 | Python 生态；Kanban 任务编排；MCP 深度集成；约 338 PR/批次的滚动发布 | 渠道覆盖面最广（bot/DM/桌面）；Kanban 自动化最成熟 | 依赖供应链安全（GHSA 漏洞）；长会话状态易污染 |


## 5. 社区热度与成熟度

### 成熟型社区（高热度、高讨论深度）

**Claude Code** 和 **OpenAI Codex** 构成第一梯队。Claude Code 的 #38335 以 851 条评论、持续 6 个月的讨论周期，展示了头部社区惊人的问题追踪耐力；Codex 则以日均 35 条 Issue + 50 条 PR 的吞吐量保持最高事务密度。两者的问题讨论已进入"功能设计 + 商业信任 + 生态治理"的深水区，远超单纯的 bug 修复层面。

### 快速迭代型（高发布频率、稳定性波动期）

**DeepSeek Reasonix** 和 **Hermes** 处于快速迭代期。Reasonix 单日连发 3 个版本（CLI/Desktop/Studio），但 v1.38.8 的迁移事故证明其发布流程需要更严谨的灰度与回滚机制；Hermes 以单日约 338 个 PR 的滚动合并速度刷新认知，但供应链漏洞与会话污染问题警示"速度 ≠ 成熟"。

### 技术先锋型（体量小、但议题前沿）

**OpenCode** 和 **Gemini CLI** 代表两种"小而锐"的路线。OpenCode 社区体量最小，但其讨论议题（W3C traceparent、二进制类型跨界、模型推理变体语义）技术含金量极高；Gemini CLI 的 nightly 节奏和策略目录权限审计展示了 Google 系的安全工程底蕴，只是社区声量尚未跟上。

### 静默观察型

**Deepseek Harness** 连续 24 小时无活动。在其余工具高歌猛进的时间窗口，这种静默值得关注——可能是内部重构期，也可能是项目活跃度下降的信号。


## 6. 值得关注的趋势信号

### 6.1 会话迁移与升级信任 —— 平台型工具的"生死线"

DeepSeek Reasonix v1.38.8 因会话迁移导致数据从 UI 消失、上下文压缩失效，直接引发用户回滚；Claude Code 的流式文本静默丢失影响数千实例。**"升级是否安全"正成为用户是否长期采用的决定性因素**。建议：任何涉及存储格式变更的版本，必须提供**自动备份、预迁移校验、一键回滚**三件套，并在发布前完成跨平台数据完整性测试矩阵。

### 6.2 "静默降级"是比报错更危险的行为

OpenCode 的 `xhigh` 变体（HTTP 200 但推理从未启用）、Gemini 的 MAX_TURNS 误报为成功、Codex 的输出 >2MiB 静默丢弃——这三者指向同一个行业级问题：**AI 工具在无法完整执行意图时，往往选择"假装成功"而非明确失败**。开发者对这类行为的容忍度为零。工具方应建立"降级即告警"的强制机制，任何未按请求执行的模型调用或工具操作都必须在界面和日志中显式标注。

### 6.3 预算控制权从"显示"走向"执行"

Claude Code 的计费争议与 Codex 的可执行任务预算请求共同表明：**用户不再满足于看到花了多少，而是要求在执行层面设定"硬上限"**。下一阶段，AI CLI 工具的核心竞争力将包括：
- 任务级预算（turn 数 / token 量 / 成本）设置
- 达到预算时的策略选项（暂停、降级、仅只读）
- 子代理与主任务的用量独立核算

### 6.4 Windows 是当前最大的"增量市场"和"信任洼地"

六大工具中有五个在 Windows 平台遭遇集中性 bug（沙箱崩溃、进程挂起、文件共享失效、杀毒误报、PowerShell 延迟）。这揭示了一个结构性机会：**谁能率先在 Windows 上交付与 macOS/Linux 同等可靠的沙箱与远程协作体验，谁就能在 2026 年下半年的企业桌面市场占据先机**。建议 Windows 用户在选择工具时优先关注其对平台问题的响应速度与专项测试投入。

### 6.5 企业级安全治理正在前移

Gemini 的策略目录权限审计、Codex 的 Guardian 审查生命周期重构、Hermes 的 MCP 工具白名单——安全能力正在从"事后拦截"走向"事前声明"：策略目录的写入权限、MCP 工具的可见性、子代理的终止原因，都需要在架构层面成为一等公民。企业选型时，建议重点考察：**策略配置是否可版本化？权限变更是否可审计？第三方扩展（MCP/Mods/Skills）是否在沙箱内受限执行？**

### 6.6 多模型时代的"协议层"竞争悄然开始

OpenCode 的 Protocol.withBody 重构、Codex 的 Azure Foundry 协议判别器、Hermes 的 OpenRouter 计费错误分类，都在做同一件事：**将"特定模型/特定提供商的怪异行为"抽象为通用协议语义**。未来 AI CLI 的护城河不再只是"接入了多少模型"，而是"能否以统一、可预测的方式驾驭异构模型生态"——包括推理变体、缓存策略、多模态格式、错误分类。技术决策者应关注工具在此层的投入深度，这决定了其长期适配上限。


## 附：横向对比总览表

| 维度 | Claude Code | OpenAI Codex | Gemini CLI | DeepSeek Reasonix | OpenCode | Hermes |
|---|---|---|---|---|---|---|
| **今日 Release** | v2.1.271 | 2 个 Alpha | 1 个 Nightly | 3 个版本 | v1.18.31 | v0.21.3 |
| **活跃 Issues（重点）** | 10 | 10 | 10 | 10 | 8 | 4 |
| **PR 更新量** | 5+ | 50 | 10+ | 10 | 50 | 50 |
| **最热 Issue 热度** | 851 评论 | 59 评论 | 13 评论 | 6 评论 | 6 评论 | 2 评论 |
| **核心关键词** | 计费信任、Mods 生态 | Windows 沙箱、Guardian | 子代理可靠性、隐私 | 迁移事故、架构重构 | 可观测性、协议抽象 | Kanban、渠道广度 |
| **社区成熟度** | ★★★★★ | ★★★★★ | ★★★☆ | ★★★☆ | ★★★ | ★★★☆ |
| **风险等级（当前）** | 中高（计费信任） | 中（Windows 问题密集） | 中（子代理可靠性） | **高**（数据迁移回归） | 中低 | 中（供应链漏洞） |
| **推荐关注场景** | 通用 Agentic 开发、团队协作 | 企业级安全部署、Windows 桌面 | Google 生态、Linux 开发者 | 成本敏感型多模型工作流 | 自托管与协议定制 | 自动化与多渠道 Agent |

---

*报告基于 2026-09-15 各工具 GitHub 社区公开数据自动生成。所有 Issue/PR 编号均可在对应仓库中追溯原始讨论。*

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据源**：github.com/anthropics/skills | **统计截止**：2026-09-15
**说明**：本次抓取的热门 PR 前 20 条均为 **Open** 状态（无 merged/draft），表明社区最活跃的讨论集中在尚未落地的改进上。以下排序综合关联 Issue 热度、更新频率与话题价值。

---

## 1. 热门 Skills 排行

### ① #1298 fix(skill-creator)：评估管线召回率 0% 修复
- **功能**：修复 `run_eval.py` 在所有场景下报告 `recall=0%` 的严重缺陷——导致 skill 描述优化链路（`run_loop.py` / `improve_description.py`）全部"对着噪声优化"。同时修复 Windows 流读取、触发器检测和并行 worker 问题。
- **社区热点**：直指 Issue #556（12 条评论、7 👍，10+ 次独立复现），是当前生态最集中的可靠性诉求。
- **状态**：Open ⏳
- 🔗 https://github.com/anthropics/skills/pull/1298

### ② #1742 fix(mcp-builder)：适配 MCP SDK 2.0+ 接口变更
- **功能**：修复 `mcp>=2.0.0` 中 `streamablehttp_client` 重命名为 `streamable_http_client` 的兼容性断裂，并适配新的 `create_mcp_http_client` 请求头配置方式。
- **社区热点**：对应 Issue #1668。MCP 生态快速迭代，SDK 升级导致的断链是近期高频痛点。
- **状态**：Open ⏳
- 🔗 https://github.com/anthropics/skills/pull/1742

### ③ #525 Add pyxel skill：复古游戏开发
- **功能**：由 Pyxel 引擎作者 @kitao 亲自提交，为 pyxel-mcp 封装"写代码 → 运行截帧 → 检查 → 迭代"的完整工作流，覆盖像素风 / 8-bit 游戏开发。
- **社区热点**：9/13 仍有更新，活跃度高。官方工具作者主动贡献 Skill，代表生态正吸引核心方共建。
- **状态**：Open ⏳
- 🔗 https://github.com/anthropics/skills/pull/525

### ④ #1703 Add md2video-audio：零成本 Markdown 转视频
- **功能**：通过 Marp 将 Markdown 编译为演示文稿，再合成带真人感配音的 MP4 视频，全程零 API 成本。
- **社区热点**：9 月初提交、9/14 仍在更新。"零成本"特性切中社区对 token 开销的敏感，内容创作自动化是新方向。
- **状态**：Open ⏳
- 🔗 https://github.com/anthropics/skills/pull/1703

### ⑤ #1628 Add Hivemind：零成本多智能体编排
- **功能**：将机械性工作委派给运行免费模型的无头 opencode worker，Claude Code 保留规划、审查与合并决策权。
- **社区热点**：直击"昂贵模型的上下文才是稀缺资源"这一核心痛点，代表社区对成本优化的强烈诉求。
- **状态**：Open ⏳
- 🔗 https://github.com/anthropics/skills/pull/1628

### ⑥ #514 Add document-typography：文档排版质量控制
- **功能**：解决 AI 生成文档的三大排版顽疾——孤词换行（1-6 词溢出到下一行）、孤行标题（段首标题悬在页底）、编号错位。
- **社区热点**：覆盖所有 Claude 生成文档场景，属于跨领域的通用高频需求。
- **状态**：Open ⏳
- 🔗 https://github.com/anthropics/skills/pull/514

### ⑦ #486 Add ODT skill：OpenDocument 全流程支持
- **功能**：支持 .odt/.ods 的创建、模板填充、读取及 ODT→HTML 转换，覆盖 LibreOffice 与 ISO 标准文档场景。
- **社区热点**：补齐办公文档格式版图中 ODF 的关键缺口，与已成熟的 docx/pptx/xlsx skills 互补。
- **状态**：Open ⏳
- 🔗 https://github.com/anthropics/skills/pull/486

### ⑧ #83 新增 skill-quality-analyzer 与 skill-security-analyzer
- **功能**：新增两个元技能——质量分析器从结构文档（20%）、示例、资源等五维评估 Skill；安全分析器聚焦 Skill 安全审查。
- **社区热点**：直接呼应 Issue #492（43 条评论）对社区 Skill 安全与质量失控的担忧，是"治理 Skill 的 Skill"。
- **状态**：Open ⏳
- 🔗 https://github.com/anthropics/skills/pull/83

---

## 2. 社区需求趋势

**🔐 安全与信任边界（最高热度）** — Issue #492（43 条评论，持续 4 个月未关闭）：社区 Skill 被分发在 `anthropic/` 命名空间下冒充官方技能，形成信任边界滥用漏洞——用户可能向社区 Skill 授予本应仅限官方的权限。这是当前最尖锐的治理问题。

**👥 组织级 Skill 共享** — Issue #228（16 条评论、8 👍）：用户要求 Skill 可组织内直接共享，而非手动下载 .skill 文件、经 Slack/Teams 传输、再手动上传安装。共享库或直接分享链接是明确诉求——对应"工作流自动化"方向的基础设施需求。

**🧪 评估与触发可靠性** — Issue #556（12 条评论、7 👍）：`run_eval.py` 对所有查询的技能触发率均为 0%，意味着整个 skill 优化循环在"对着噪声优化"。工具链可信度是当前最根本的痛点。

**📦 插件去重与数据稳定** — Issue #189（9 👍）：document-skills 与 example-skills 插件安装相同内容导致重复加载、浪费上下文窗口；Issue #62（10 条评论）报告技能消失与数据丢失错误。

**🧠 上下文窗口效率** — Issue #1487：`claude-api` skill 单次工具调用注入约 156k tokens、直接耗尽上下文；Issue #1175 亦表达文档处理类 Skill 的安全与上下文开销担忧。

**🆕 新方向提案**：
- **agent-governance**（代理安全治理模式，#412，6 条评论）
- **compact-memory**（符号化紧凑代理状态，降低长时运行 agent 的记忆开销，#1329，9 条评论）
- **Reasoning Quality Gate Pipeline**（推理质量门控：预校准 → 对抗审查 → 交付验证，#1385）

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、修复/功能明确，且近期有更新，落地概率较高：

| PR | Skill | 潜力信号 | 状态 |
|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评估修复 | 对应 12 评论高热 Issue #556，强需求 | Open |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder 兼容修复 | 对应 #1668，修复范围小、价值明确 | Open |
| [#1703](https://github.com/anthropics/skills/pull/1703) | md2video-audio | 9/14 仍有更新，新技能关注度高 | Open |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel 游戏开发 | 官方引擎作者提交，9/13 活跃 | Open |
| [#1627](https://github.com/anthropics/skills/pull/1627) | buffer-api 社媒调度 | 跨 agent（Claude/Cursor/Codex/n8n）GraphQL 调度，通用性强 | Open |
| [#1615](https://github.com/anthropics/skills/pull/1615) | scnet-hpc 集群操作 | 专业域技能，SSH/Slurm 工作流完整 | Open |
| [#1628](https://github.com/anthropics/skills/pull/1628) | Hivemind 多智能体编排 | 成本优化主题新颖，社区讨论活跃 | Open |

---

## 4. Skills 生态洞察

**当前社区最集中的诉求是"可信度"与"成本"的双重焦虑**：一方面要求评估管线真实可靠（0% 召回）、安全边界清晰（命名空间滥用）、上下文开销可控（156k token 注入）；另一方面通过零成本执行方案（md2video-audio、Hivemind）与多 agent 编排，试图在质量不降级的前提下，把昂贵模型的上下文花在刀刃上。

---

# Claude Code 社区动态日报
**日期：2026-09-15** | 数据来源：github.com/anthropics/claude-code

---

## 1. 今日速览

昨日发布 v2.1.271，为 Remote Sessions 添加 fast mode，并为全屏 /config 面板引入鼠标支持。社区侧最热事件是 #38335（Claude Max 套餐额度异常消耗）持续发酵，已积累 851 条评论；同时 #91870「Mods 扩展性增强」获 171 条讨论，成为社区最关注的功能方向。Windows 平台 Cowork 相关 bug 集中爆发（#92984、#93071），值得留意。

---

## 2. 版本发布

**v2.1.271** 已于昨日发布，主要变更：

- **Remote Sessions 新增 fast mode**：适用于云托管和自托管 runner，可通过宿主端 fast-mode 设置或会话内输入 `/fast` 启用（需组织允许）。
- **全屏模式 /config 面板支持鼠标**：滚轮可滚动设置项。

发布链接：https://github.com/anthropics/claude-code/releases

---

## 3. 社区热点 Issues（Top 10）

### 🔥 #38335 — [BUG] Claude Max 套餐会话额度自 2026-03-23 起异常快速耗尽（CLI）
- **作者**: @karenrebecag | **评论**: 851 | **👍**: 476
- **状态**: OPEN | **创建**: 2026-03-24 | **更新**: 2026-09-14
- **为什么重要**: 社区最热 Issue，持续近半年仍无定论。用户报告 CLI 用量在正常操作下额度消耗远超预期，涉及计费与配额机制的可信度，直接影响付费用户的信任。
- 链接: https://github.com/anthropics/claude-code/issues/38335

### 🧩 #91870 — [增强] Mods：让 Claude 扩展性提升 10 倍
- **作者**: @poteat | **评论**: 171 | **👍**: 104
- **状态**: OPEN | **创建**: 2026-09-03 | **更新**: 2026-09-14
- **为什么重要**: 官方确认 function hooks 将在数周内（而非数月）落地，社区反馈积极。Mods 被视为 Claude Code 生态化的关键一步。
- 链接: https://github.com/anthropics/claude-code/issues/91870

### 🪟 #92984 — [BUG] Windows Cowork：KB5124008 更新后所有 Plan9 共享挂载失败
- **作者**: @tomokuri8 | **评论**: 112 | **👍**: 58
- **状态**: OPEN | **创建**: 2026-09-09 | **更新**: 2026-09-14
- **为什么重要**: 影响面广的 Windows 平台回归——一次系统更新即导致 Cowork 的 Plan9 文件共享机制全面失效，卸载 KB 可恢复。已确认可复现。
- 链接: https://github.com/anthropics/claude-code/issues/92984

### 💬 #36146 — [BUG] VS Code 扩展中首条用户消息固定在聊天面板顶部无法滚动
- **作者**: @francisco-robles-kuik | **评论**: 29 | **👍**: 43
- **状态**: OPEN | **创建**: 2026-03-19 | **更新**: 2026-09-14
- **为什么重要**: 长期未修复的 IDE 集成 UI 缺陷，影响 VS Code 用户的日常阅读体验，近半年仍未解决。
- 链接: https://github.com/anthropics/claude-code/issues/36146

### 🌐 #74715 — [BUG] Chrome 扩展「Always allow」权限持久化为「once」，白名单永远为空
- **作者**: @kir-kopylov | **评论**: 18 | **👍**: 5
- **状态**: OPEN | **创建**: 2026-07-06 | **更新**: 2026-09-14
- **为什么重要**: Claude-in-Chrome 的站点授权无法真正持久化，每次浏览器操作都会重复弹窗确认，影响自动化流程。
- 链接: https://github.com/anthropics/claude-code/issues/74715

### 🎨 #62804 — [BUG] 聊天中代码块片段显示为行内代码
- **作者**: @JordanBettridge | **评论**: 9 | **👍**: 11
- **状态**: OPEN | **创建**: 2026-05-27 | **更新**: 2026-09-14
- **为什么重要**: VS Code 扩展渲染层缺陷，代码块在聊天中被错误渲染为行内代码，影响可读性。
- 链接: https://github.com/anthropics/claude-code/issues/62804

### 📑 #69542 — [BUG] Chrome 中每个新会话都创建新标签组而非复用
- **作者**: @Athlazi | **评论**: 7 | **👍**: 5
- **状态**: OPEN | **创建**: 2026-06-19 | **更新**: 2026-09-14
- **为什么重要**: Claude 桌面/Web 应用与 Chrome 扩展的会话管理体验割裂，标签组堆积影响工作流效率。
- 链接: https://github.com/anthropics/claude-code/issues/69542

### 🖥️ #72707 — [BUG] VS Code 长用户提示无法折叠
- **作者**: @ezwep | **评论**: 4 | **👍**: 14
- **状态**: OPEN | **创建**: 2026-07-01 | **更新**: 2026-09-14
- **为什么重要**: 长 prompt 的折叠/展开开关失效导致聊天区域被永久占据，IDE 场景下高频触发。
- 链接: https://github.com/anthropics/claude-code/issues/72707

### 🔌 #93707 — [BUG] macOS 远程机器 SSH 连接因缺少本地网络权限失败
- **作者**: @niuhomelab | **评论**: 4 | **👍**: 0
- **状态**: OPEN | **创建**: 2026-09-11 | **更新**: 2026-09-14
- **为什么重要**: TCC（隐私权限）机制下子进程未获得 Local Network 授权导致 SSH 连接失败，涉及 macOS 平台权限体系与桌面应用的集成问题。
- 链接: https://github.com/anthropics/claude-code/issues/93707

### ⚡ #94344 — [BUG] Windows 桌面应用 PowerShell 工具调用延迟约 154 秒
- **作者**: @marcoraepple-sys | **评论**: 2 | **👍**: 0
- **状态**: OPEN | **创建**: 2026-09-14 | **更新**: 2026-09-14
- **为什么重要**: 新建 Issue，报告 Windows 桌面应用中每个 PowerShell 调用前置等待约 154 秒，而 Bash 即时响应；#57960 曾报告同一问题后关闭，现仍在 2.1.270 上复现。
- 链接: https://github.com/anthropics/claude-code/issues/94344

---

## 4. 重要 PR 进展

### #94184 — [已合并] mods/diff：停靠面板与内置 /diff 逐帧对齐
- **作者**: @poteat | **更新**: 2026-09-14
- **内容**: 停靠面板现与内置 /diff 面板完全一致——头部、基线和 8 行文件列表保持固定，滚轮 3 行/次滚动 hunks，悬停溢出列表时按文件滚动；支持 ctrl/opt+↑↓ 和 ctrl+x b 快捷键。
- 链接: https://github.com/anthropics/claude-code/pull/94184

### #93951 — [已合并] mods：diff、sec-default 与 telemetry 测试移至对应 mods 目录
- **作者**: @poteat | **更新**: 2026-09-14
- **内容**: 行为测试从 Claude Code 主仓库移入 `mods/<mod>/tests/`，每个单元对应 `hooks/` 下独立文件，由 `claude plugin test` 运行；面板视图与 /diff 流程从引擎视角执行。
- 链接: https://github.com/anthropics/claude-code/pull/93951

### #87079 — [开放] fix(security-guidance)：使 ** glob 模式匹配零深度路径
- **作者**: @anishsamant | **更新**: 2026-09-14
- **内容**: 修复 `glob_match` 委托给 fnmatch 导致 `**/*.ts` 不匹配顶层文件的缺陷。由于是安全规则，失败模式为静默不匹配，风险较高。
- 链接: https://github.com/anthropics/claude-code/pull/87079

### #71627 — [开放] docs(sandbox)：注明 prompt 批准的主机为会话级作用域
- **作者**: @mahirhir | **更新**: 2026-09-14
- **内容**: 在 `examples/settings/README.md` 的 Tips 中补充说明——prompt 时批准的 sandbox 网络主机仅在当前会话有效，重启后丢失。
- 链接: https://github.com/anthropics/claude-code/pull/71627

### #83890 — [已关闭] Create pylint.yml
- **作者**: @KrypticKode007 | **更新**: 2026-09-14
- **内容**: 新增 pylint CI 工作流配置。
- 链接: https://github.com/anthropics/claude-code/pull/83890

---

## 5. 功能需求趋势

从近期 Issues 中可以提炼出以下社区最关注的功能方向：

| 方向 | 代表 Issue | 说明 |
|------|-----------|------|
| **Mods/插件系统扩展** | #91870 | 社区对 function hooks 的期待极高，官方承诺数周内交付 |
| **讨论模式（Discussion Mode）** | #91301, #85848 | 多次出现「只读+可对话但不出计划」的模式请求，介于 chat 和 plan 之间的缺失环节 |
| **权限管理精细化** | #86451, #74715 | 包括 bypassPermissions 下 auto mode 的误判、Chrome 站点授权的持久化 |
| **模型选择与解析一致化** | #93646 | `--model sonnet` 解析到 Sonnet 4.5 而非 Sonnet 5，与 /model 选择器不一致 |
| **启动配置时机** | #87150 | 用户希望 startup 配置（settings.json、CLAUDE.md）在首个 prompt 之前处理，而非之后 |
| **远程/Cowork 体验** | #92984, #93071, #93707 | Windows/macOS 平台上远程开发与桌面协作的稳定性成为新痛点 |

其中 **Discussion Mode** 和 **启动配置时机** 均被标记为 enhancement 且获得开发者附议，是潜力较大的功能方向。

---

## 6. 开发者关注点

### 痛点 1：计费与配额透明度不足
#38335 以 851 条评论成为绝对热点。核心诉求是 Claude Max 会话额度的消耗速度异常，用户希望 Anthropic 提供更透明的用量明细和可预期的配额机制。该问题长期未关闭，已影响到部分用户的续费决策。

### 痛点 2：Windows 平台兼容性集中爆发
Cowork 在 Windows 上遭遇多重问题：KB5124008 更新导致 Plan9 挂载全面失败（#92984）、sandbox-helper 无 Plan9 共享导致的 device_bash 失效（#93071）、设备提交文件内容落后一个版本（#93482）、PowerShell 工具调用 154 秒延迟（#94344）。Windows 用户对 Cowork 的可用性信心受到较大冲击。

### 痛点 3：数据可靠性问题
#85443 报告了流式响应中夹在 thinking 块之间的文本块从未写入会话 JSONL（静默丢失），影响面估计达 3,738 个实例；#93482 则报告 Cowork 文件覆盖写入内容滞后。这类静默数据丢失问题对开发者信任伤害极大。

### 痛点 4：权限提示的持久化与误判
Chrome 扩展的「Always allow」无法持久化（#74715）、auto mode 在 bypassPermissions 会话中错误拦截工具调用（#86451，已关闭但被标记为 duplicate），都指向权限系统的交互设计仍有改进空间。

### 痛点 5：模型简写与用量提示的准确性
`--model sonnet` 解析到旧版模型（#93646）、用量限制警告显示父模型而非实际子代理模型（#93046），反映出模型命名解析和用量归因的细节问题，影响多模型工作流的可信度。

---

*本日报由 AI 自动生成，数据截至 2026-09-15 00:00 UTC。*
*报告链接均指向 GitHub 原始讨论，点击可查看完整上下文。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 — 2026-09-15

## 今日速览

昨日 Codex 仓库共更新 35 条 Issue、50 条 PR，其中 Windows 平台问题占据主导，涉及沙箱句柄泄漏、Computer Use 截图失败等。功能需求集中于 AGENTS.md 组合、用量控制与项目级 Skills 视图；PR 侧则以 Windows 沙箱安全加固和 Guardian 审查机制重构为主线。

---

## 版本发布

| 版本 | 说明 |
|---|---|
| [rust-v0.155.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.4) | 发布 0.155.0-alpha.4（未提供变更说明） |
| [rust-v0.155.0-alpha.2.4](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.2.4) | 发布 0.155.0-alpha.2.4（未提供变更说明） |

两个 Rust 工具链版本均为 Alpha 通道迭代，尚无详细变更日志，建议关注后续稳定版发布说明。

---

## 社区热点 Issues（10 个）

### 1. Windows Computer Use 截图失败（#25178）
- **链接**: https://github.com/openai/codex/issues/25178
- **热度**: 👍 25 · 💬 59 条评论（高热度）
- **状态**: OPEN · [bug, windows-os, app, computer-use]

在 Windows 10 22H2 上，Codex Desktop 的 Computer Use 能列出窗口、读取无障碍文本、发送键盘输入，但任何需要截图的 `get_window_state` 调用都会在捕获前报 `SetIsBorderRequired failed: 0x80004002`。这是目前社区讨论最激烈的问题之一，Windows 用户无法使用桌面自动化核心能力。

### 2. 分页滚动输出产生重复序号，冻结线程历史（#41566）
- **链接**: https://github.com/openai/codex/issues/41566
- **热度**: 💬 32 条评论
- **状态**: OPEN · [bug, windows-os, app, session]

分页（paginated）输出在未完成的 turn 后可能发出重复序号，导致整个线程历史投影永久冻结。影响长对话的连续性和可恢复性，Windows 用户反馈较多。

### 3. App-server 排队后续消息失效（#45019）
- **链接**: https://github.com/openai/codex/issues/45019
- **热度**: 👍 26 · 💬 5 条评论（高赞）
- **状态**: OPEN · [bug, app, app-server]

26.908.40834 版本中，排队的后续消息报 “App-server queued follow-up no longer exists”，用户尝试发送追问时失败，且界面展示异常。26 个 👍 说明影响面较广，且与 #45209 重复相关。

### 4. Windows 沙箱 exec 泄漏 lsass 句柄（#33356）
- **链接**: https://github.com/openai/codex/issues/33356
- **热度**: 💬 13 条评论
- **状态**: OPEN · [bug, windows-os, sandbox, exec, CLI, performance]

`codex-cli 0.144.4` 在 Windows 上每次沙箱命令执行泄漏 3–5 个 lsass 句柄，长时间会话会导致整个操作系统性能退化。这是 Windows 沙箱实现的资源管理缺陷，对重度用户影响显著。

### 5. macOS 14.2 沙箱启动失败：`TIOCSTI` 未绑定变量（#45119）
- **链接**: https://github.com/openai/codex/issues/45119
- **热度**: 💬 12 条评论
- **状态**: OPEN · [bug, sandbox, CLI]

macOS 14.2（Apple Silicon）上沙箱启动报 `unbound variable TIOCSTI`，当前上游 `main` 分支同样存在此问题。macOS 用户在 14.x 版本上无法使用沙箱功能。

### 6. 合法逆向工程被误报“网络滥用”策略（#30271）
- **链接**: https://github.com/openai/codex/issues/30271
- **热度**: 👍 4 · 💬 10 条评论
- **状态**: OPEN · [bug, safety-check]

用户已通过 chatgpt.com/cyber 验证，但执行合法的漏洞分析与逆向工程时仍收到安全策略误报。这直接阻断安全研究人员的正常工作任务，涉及安全策略精度问题。

### 7. `@include` 指令：可组合的 AGENTS.md（#17401）
- **链接**: https://github.com/openai/codex/issues/17401
- **热度**: 👍 21 · 💬 12 条评论（高赞）
- **状态**: OPEN · [enhancement, context]

社区希望支持 `@path/to/file.md` 指令，在指令组装阶段将引用文件内联到 AGENTS.md 中，实现模块化、可维护的项目指令管理。获得 21 个 👍，是当前最受期待的功能增强之一。

### 8. 使用限制达到时活动 turn 被强制停止（#45444）
- **链接**: https://github.com/openai/codex/issues/45444
- **热度**: 👍 1 · 💬 2 条评论（新回归）
- **状态**: OPEN · [bug, rate-limits]

这是一个新报告的回归：之前达到用量上限时，当前任务可继续完成；现在直接中断正在运行的 turn，浪费已消耗的额度。影响长任务场景的可靠性。

### 9. 暴露内置图像生成模型及选择器（#43965）
- **链接**: https://github.com/openai/codex/issues/43965
- **热度**: 👍 9 · 💬 4 条评论
- **状态**: OPEN · [enhancement, app, imagen]

Windows 桌面版内置图像生成工具没有暴露实际使用的模型，也无法选择。用户希望在有多个图像模型可用时能查看并选择模型，获得 9 个 👍。

### 10. `codex mcp add/remove` 重写全部 MCP 配置，丢失注释（#45432）
- **链接**: https://github.com/openai/codex/issues/45432
- **热度**: 💬 2 条评论
- **状态**: OPEN · [bug, mcp, CLI, config]

`codex mcp add` 会重写 `config.toml` 中**所有** `[mcp_servers.*]` 条目，静默丢弃未知键、注释和原有格式。这对配置管理是高风险行为，容易造成不可逆的信息丢失。

---

## 重要 PR 进展（10 个）

### 1. Windows 沙箱增加可选注册包执行（#45550）
- **链接**: https://github.com/openai/codex/pull/45550
- **状态**: CLOSED

为 Windows 沙箱增加“注册包（registered package）”执行支持：在启动时捕获 `CODEX_WINDOWS_REGISTERED_CORE=1` 并传播选择，通过服务记录的别名启动注册 runner，同时校验所有权和 OS 包身份。增强了沙箱的安全边界和包隔离能力。

### 2. 保留 turn 终止时的流式答案和计划（#45549）
- **链接**: https://github.com/openai/codex/pull/45549
- **状态**: CLOSED

修复中断或失败的 turn 可能丢弃已缓冲的答案/计划源的问题，现在会在终止前合并并保留流式内容，再写入转写文本，避免不完整的数学内容丢失或无法正确回流。

### 3. Seatbelt 遵守预置 Unix socket 权限（#45548）
- **链接**: https://github.com/openai/codex/pull/45548
- **状态**: CLOSED

修复 Seatbelt（macOS 沙箱）忽略 `ManagedNetworkSandboxContext` 中预置 Unix socket 权限的问题，改为使用预置上下文中的 `allow_unix_sockets` 和 `dangerously_allow_all_unix_sockets` 设置，避免遗漏允许的 socket 或错误继承代理的宽松权限。

### 4. 守护进程包移出独立 CLI 安装（#45546）
- **链接**: https://github.com/openai/codex/pull/45546
- **状态**: CLOSED

将 daemon 从独立 CLI 安装包中拆出，建立专用包，使 daemon 更新不再耦合可见的 CLI 安装，保留用户的 CLI 选择和 shell profile。

### 5. 禁止记录完整图像生成结果（#45544）
- **链接**: https://github.com/openai/codex/pull/45544
- **状态**: CLOSED

更新图像生成工具指南，避免通过 `text()` 或 `notify()` 打印完整的 base64 图像数据，仅建议输出必要的小体积元数据，以减少日志噪音和上下文开销。

### 6. 图像内容重构为共享 `ImageReference` 类型（#45543）
- **链接**: https://github.com/openai/codex/pull/45543
- **状态**: CLOSED

将 `ContentItem` 和 `FunctionCallOutputContentItem` 中的图像统一为 `ImageReference::Inline`，保持 `image_url` 线上格式不变，并更新所有图像生产者和消费者。

### 7. Windows 沙箱账户增加服务管理包注册（#45542）
- **链接**: https://github.com/openai/codex/pull/45542
- **状态**: CLOSED

新增 `registered_core` 配置模式，为托管沙箱账户注册应用包并记录 runner 别名，调用方通过服务的包族 ID 进行身份验证。与 #45550 配套，完善 Windows 沙箱的服务化管理。

### 8. Guardian 审查生命周期移入扩展（#45537）
- **链接**: https://github.com/openai/codex/pull/45537
- **状态**: CLOSED

将 Guardian 审查的生命周期管理从核心逻辑移到扩展中：父级关闭或历史重置时立即停止审查；关闭时先完成审查清理再关闭父级持久历史，包括处理等待重试中的审查。

### 9. 工具分析事件按调用来源分类（#45535）
- **链接**: https://github.com/openai/codex/pull/45535
- **状态**: CLOSED

为工具分析事件新增 `tool_event_type` 字段，通过调用 ID 精确区分 `model_tool_call` 和 `inner_tool_call`。当证据缺失或冲突时序列化为 `null`，后续证据不会改变已发送事件。

### 10. Linux 托管沙箱遵守显式 Unix socket 授权（#45534）
- **链接**: https://github.com/openai/codex/pull/45534
- **状态**: CLOSED

修复 Linux 代理路由沙箱在启用 `dangerously_allow_all_unix_sockets` 时仍拒绝显式授权 Unix socket 的问题，在 `ManagedNetworkSandboxContext` 中传递 Unix socket 权限设置，实现与 macOS 端一致的行为。

---

## 功能需求趋势

从近期 Issue 中可提炼出以下社区关注方向：

| 方向 | 代表 Issue | 热度信号 |
|---|---|---|
| **AGENTS.md 模块化** | #17401 `@include` 指令 | 👍 21 |
| **用量/预算控制** | #45536 可执行任务预算；#45539 项目级优先级调度；#45444 限额回归 | 新提交密集 |
| **Windows 沙箱稳定性** | #33356 lsass 句柄泄漏；#45540 输出 >2MiB 被静默丢弃 | 高频反馈 |
| **图像生成透明度** | #43965 暴露图像模型与选择器 | 👍 9 |
| **项目级 Skills 管理** | #45551 项目级 Skills 视图（新建） | 新提交 |
| **MCP 配置安全** | #45432 mcp add 重写配置丢注释 | 数据安全诉求 |
| **会话恢复可靠性** | #41566 分页线程冻结；#41512 无法恢复分页线程 | 评论数高 |

---

## 开发者关注点

1. **Windows 平台问题最密集**：Computer Use 截图失败、lsass 句柄泄漏、输出数据丢失、滚动异常等均集中在 Windows 端，Windows 用户对沙箱和桌面自动化的稳定性有强烈诉求。

2. **沙箱一致性与权限控制**：macOS `TIOCSTI` 启动失败、Linux/Unix socket 权限处理，说明跨平台沙箱行为仍有不少边界场景未对齐；多个 PR 同时指向 Unix socket 权限，说明这是当前重点修复方向。

3. **配置破坏性写入**：MCP 命令重写全部配置并丢注释、协作模式恢复丢失 Plan 模式等，表明用户对“配置不可逆修改”高度敏感，希望工具具备更保守的写入策略。

4. **用量与预算控制**：出现多个要求“限制任务消耗”“设置优先级”的请求，表明重度用户对用量可预期性的需求已上升到功能层面，而不仅仅是额度显示。

5. **安全策略误报影响真实工作流**：逆向工程、安全分析被误标，会直接阻断专业用户的正常任务；需要更精细的策略判定或用户认证后的豁免机制。

---

*本日报由 AI 工具分析师基于 github.com/openai/codex 公开数据自动生成，数据截至 2026-09-15。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-09-15）

## 今日速览

今日社区焦点集中在**子代理可靠性**与**安全加固**两条主线：#22323 揭示的子代理"MAX_TURNS 中断被误报为 GOAL 成功"问题以 13 条评论成为最热议题，多个 P1 级 Bug（通用代理挂起、Shell 命令卡死、get-shit-done 崩溃）持续发酵。PR 方面，官方密集提交了策略目录权限审计、A2A 服务器凭据保护、沙箱扩展防崩溃等关键修复，并发布 v0.61.0-nightly.20260914 版本。

## 版本发布

**v0.61.0-nightly.20260914.g9c1b0a610** 于 9 月 14 日发布，包含多项核心修复，完整变更见 [Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260913.g9c1b0a610...v0.61.0-nightly.20260914.g9c1b0a610)。

---

## 社区热点 Issues

以下为过去 24 小时内更新且讨论热度最高的 10 个 Issue：

### 1. Subagent 中断被误报为成功 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
**P1 / Bug · 13 评论 · 2 👍**
`codebase_investigator` 子代理在达到 MAX_TURNS 限制后仍报告 `status: "success"`，Termination Reason 为 "GOAL"，但实际上未执行任何分析。该问题导致真实中断原因被完全掩盖，严重损害用户对子代理结果的信任。

### 2. Generalist 代理永久挂起 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
**P1 / Bug · 8 评论 · 8 👍**
通用子代理在执行简单操作（如创建文件夹）时无限期挂起，用户等待长达一小时只能手动取消。8 个 👍 表明影响面较大，社区强烈关注。

### 3. Shell 命令执行后卡"等待输入" | [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
**P1 / Bug · 4 评论 · 3 👍**
极简单的 CLI 命令执行完成后，界面仍显示 "Awaiting user input"，命令实际早已结束。该问题在多个场景下复现，导致流程无法自动继续。

### 4. 零依赖 OS 沙盒与执行后意图路由 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)
**P2 / Enhancement · 9 评论**
提案指出 Gemini 3 模型天生习惯用 bash 工具链探索代码库，主张通过零依赖 OS 沙盒 + 执行后意图路由，在安全前提下释放模型的 bash 原生能力。获得大量技术讨论。

### 5. Auto Memory 存在敏感信息提前泄露风险 | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
**P2 / 安全 · 5 评论**
Auto Memory 会在"去敏感化"之前就将本地 transcript 内容发送到模型上下文，redaction 提示词为时已晚。此外，服务还可能记录现有技能内容，触及 LLM 工具的隐私红线。

### 6. Gemini 不主动使用 Skills 和子代理 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
**P2 / Bug · 6 评论**
用户反馈除非显式指示，Gemini 几乎不会自主调用自定义 skills 和子代理，即使任务高度相关（如 gradle/git skill）。这直接削弱了自定义工作流的价值。

### 7. get-shit-done 输出钩子崩溃 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186)
**P1 / Bug · 3 评论**
get-shit-done 模式在输出接近完成（打印用户摘要）时反复崩溃，说明输出管线在结束阶段存在未捕获异常。

### 8. AST 感知文件读取的价值评估 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
**P2 / Feature · 7 评论**
EPIC 跟踪 AST 感知工具在精确读取方法边界、减少 token 噪声、提升代码导航效率方面的价值。当前约 36.6k 的上下文基线让社区期待更"外科手术式"的代码读取方式。

### 9. Wayland 下浏览器子代理失败 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
**P1 / Bug · 4 评论**
浏览器子代理在 Wayland 会话中直接失败（Termination Reason: GOAL 但实际未完成目标），严重影响 Linux 桌面用户。

### 10. /compress 命令在会话恢复后失效 | [#21335](https://github.com/google-gemini/gemini-cli/issues/21335)
**P2 / Bug · 2 评论 · 2 👍**
`/compress` 只在内存中替换聊天历史，不会写回 session 文件。重启后压缩失效，token 节省效果无法持久。

---

## 重要 PR 进展

以下为过去 24 小时内更新或提交的 10 个重要 PR：

### 1. 修复 AgentLoopContext 属性在对象展开中丢失 | [#29335](https://github.com/google-gemini/gemini-cli/pull/29335)
**P1 / Core · size/m**
`Config` 类此前用原型 getter 实现 `AgentLoopContext` 接口，对象 spread 后关键属性（config、toolRegistry、messageBus 等）会丢失。此 PR 确保属性在展开后正确保留。

### 2. A2A 服务器：尊重 LOG_LEVEL 且凭据脱敏 | [#29328](https://github.com/google-gemini/gemini-cli/pull/29328)
**P1 / Security · size/l**
LOG_LEVEL 虽被 allow-list 加入 `process.env`，但 logger 硬编码为 `info`；同时启动日志可能泄露凭据。此 PR 双管齐下，让配置真正生效并保护敏感信息。

### 3. 保护非系统策略目录写入权限 | [#29336](https://github.com/google-gemini/gemini-cli/pull/29336)
**P2 / Enterprise · size/l · Fixes #29311**
将 `isDirectorySecure` 验证从仅限系统目录扩展到所有层级，并在 POSIX 和 Windows 上支持按当前用户所有权判断，防止策略目录被提权篡改。

### 4. 审计策略目录权限检查逻辑 | [#29333](https://github.com/google-gemini/gemini-cli/pull/29333)
**P2 / Enterprise · size/m**
`filterSecurePolicyDirectories` 原本只对系统策略目录执行 `isDirectorySecure`，用户/工作区目录因"CLI 主动读取"而跳过检查。此 PR 修复这处安全盲区。

### 5. 限制单次调用的沙箱扩展频率 | [#29332](https://github.com/google-gemini/gemini-cli/pull/29332)
**P2 / Core · size/m**
当工具对 `sandbox_expansion_required` 持续响应"拒绝"时，`_execute` 会无限递归最终 OOM 崩溃。此 PR 增加轮数上限，将致命错误转为可控失败。

### 6. 修复 SdkAgentShell 忽略 env 和 timeoutSeconds | [#29327](https://github.com/google-gemini/gemini-cli/pull/29327)
**P2 / SDK · size/m**
`exec('sleep 30', { timeoutSeconds: 1 })` 会真的等 30 秒——env 从未传给子进程，timeout 从未生效。此修复让 SDK 选项名副其实。

### 7. 截断 stdin 后暂停读入而非销毁 | [#29329](https://github.com/google-gemini/gemini-cli/pull/29329)
**P2 / Core · size/s**
原先截断后直接 `stdin.destroy()`，进程生命周期内无法再次读取。改为暂停读入，并在放弃时明确提示用户。

### 8. 修复会话消息更新中的纯函数违规 | [#29330](https://github.com/google-gemini/gemini-cli/pull/29330)
**P2 / Core · size/m**
`setCurrentSessionMessages` 的 updater 中调用 `setPastSessionMessages` 违反 React 纯函数规则，回归测试还发现了一个非 StrictMode 模式下的连带问题。

### 9. 修复嵌套 .gitignore 尾斜杠模式锚定 | [#29323](https://github.com/google-gemini/gemini-cli/pull/29323)
**P2 / Core · size/l · Fixes #29290**
`pkg/.gitignore` 中的 `build/` 被错误地锚定到 `.gitignore` 所在目录，而非从任意深度匹配。此 PR 修正了尾斜杠模式的语义，并附带了完整测试。

### 10. 设置编辑器拒绝非有限数字 | [#29229](https://github.com/google-gemini/gemini-cli/pull/29229)
**P2 / Core · size/s · Fixes #29226**
`parseEditedValue` 只拒绝 `NaN`，`1e309` 会解析为 `Infinity` 并通过校验，JSON 序列化时静默变为 `null`。改用 `Number.isFinite` 覆盖 NaN 和无穷值。

---

## 功能需求趋势

基于近期 Issue 与 PR，社区需求集中在以下方向：

1. **子代理可靠性与可观测性**：大量 P1 Bug 围绕子代理误报状态、挂起、崩溃，"信任"成为关键词。用户需要子代理轨迹可见、中断原因真实、bugreport 包含子代理上下文。
2. **Auto Memory 隐私与治理**：redaction 时机、低信号会话去重、无效补丁隔离——记忆系统需要更严谨的隐私边界和队列管理，相关跟踪 issue #26516 持续推进。
3. **零依赖沙盒与权限模型**：让模型自由调用 bash 但受控于 OS 级沙箱（#19873），配合策略目录权限审计，构建企业级安全底座。
4. **AST 感知代码工具**：从 grep 到 AST 导航（#22745/#22746），减少 token 消耗并提高编辑精度，是下一阶段 Agent 能力升级的重要方向。
5. **浏览器代理韧性**：Wayland 兼容性、锁恢复、settings.json 配置覆盖失效（#22267），浏览器自动化场景需要更 robust 的会话管理。

---

## 开发者关注点

- **错误报告失真**：MAX_TURNS 被报告为 GOAL 成功（#22323）、bugreport 不含子代理上下文（#21763）——错误信息不透明显著加剧调试成本。
- **挂起与卡死普遍**：通用代理挂起（#21409）、Shell 卡"等待输入"（#25166）、vite 交互提示卡死（#22465），多个 P1 问题直指执行引擎的交互控制缺陷。
- **配置系统脆弱**：settings.json 覆盖被忽略（#22267）、symlink agent 不被识别（#20079）、/compress 不持久（#21335），配置一致性亟需加强。
- **隐私安全焦虑**：Auto Memory 在 redaction 前就上传 transcript 的问题（#26525），触及用户对本地数据边界最敏感的神经。
- **Skills 生态落地难**：模型不主动使用自定义 skills（#21968），投入产出比存疑，社区期待更强的意图识别与工具选择能力。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-15

## 今日速览

昨日连续发布 v1.38.8（CLI/Desktop）与 Studio v2.15.0 三个版本，其中 Desktop v1.38.8 引入的会话存储 v4 迁移引发多起数据丢失、空白输出等严重回归，社区反馈集中。与此同时，多个修复 PR 已被合并至 main-v2，包括资源占用限制、会话权威重构等架构级改动，显示团队正在快速响应。

## 版本发布

### Reasonix CLI / Desktop v1.38.8（稳定版）
桌面端可靠性与易用性改进，包括统一会话持久化、目标生命周期修复和安装程序更新。

- 发布渠道：稳定版
- [英文更新日志](https://reasonix.io/changelog/v1.38.8/?lang=en) · [网页版完整更新日志](https://reasonix.io/changelog/v1.38.8/)

### Reasonix Studio v2.15.0
本版主线是把「谁有权决定」和「谁有权改写」各自收回一处：工具成为一条声明而不是三处分支；会话授权按主体记录；委派运行越过写入围栏时向人发问；被占用会话改为只读打开。供应商侧 DeepSeek 目录、视觉能力与官方价格收敛为一份声明，九个迁移函数退役。自 2.14.1 起共 67 个提交，三平台照旧自更新，无需人工步骤。

## 社区热点 Issues（10 个）

### 🔴 数据安全与严重回归

**[#10286] v1.38.8 会话存储 v4 迁移后，新建会话被写入 deletedTopics 并从列表消失（磁盘数据仍在）**
- 作者：@NevermoreSouls | 👍 2 | 评论 4
- 为什么重要：直接导致用户数据从 UI 消失的严重数据丢失问题，Windows 11 上复现，且 UI 留下的是「墓碑」而非删除记录。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10286)

**[#10292] Windows 上 bash 工具完全不可用：sandbox 配置被忽略（exit 0xc0000142）**
- 作者：@Aresitoo | 评论 0
- 为什么重要：v1.38.7 可用的 bash 工具在 v1.38.8 成为回归，`[sandbox] bash = "off"` 配置不生效，导致所有 bash 调用失败，Agent 完全无法工作。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10292)

**[#10294] v1.38.8（Windows）v4 迁移后推理期间助手输出完全不显示（26 分钟重启 6 次）**
- 作者：@Aresitoo | 评论 0
- 为什么重要：核心工作流彻底阻断，用户被迫回滚到 1.38.7。与 #10279 同属「推理期间无输出」类问题，疑似会话迁移导致渲染管线异常。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10294)

**[#10296] Desktop v1.38.8: React error #185（Maximum update depth exceeded）导致大会话 tab 水合崩溃**
- 作者：@asdkjasdfla | 评论 0
- 为什么重要：React 渲染栈溢出，发生在 streaming-markdown 路径，加载大会话时直接崩溃，影响长会话用户。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10296)

**[#10289] v1.38.8 更新后会话上下文被挤爆，内置压缩命令失效**
- 作者：@QIUZAIYOU | 评论 2
- 为什么重要：更新后此前压缩过的上下文恢复为未压缩状态，导致上下文超限、会话无法继续。压缩功能本身也失效，属于 v4 迁移的次生问题。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10289)

### 🖥️ 桌面端稳定性与体验

**[#10202] 崩溃界面增加「杀进程」或「重启」按钮**
- 作者：@QIUZAIYOU | 评论 6
- 为什么重要：社区高共鸣的功能请求（评论最多），v2 版本崩溃场景较多，用户希望崩溃后能一键恢复而非手动处理。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10202)

**[#10290] Desktop 渲染致命错误，但后端仍在运行**
- 作者：@lingchenheiye | 评论 1
- 为什么重要：渲染层崩溃但后端服务存活，说明 Electron 前端与后端服务生命周期脱节，用户在 Windows 11 上触发，原因不明。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10290)

**[#10285] 最近几个版本（macOS）：会话阻塞、回复中断、布局错乱、图标不适配**
- 作者：@lowjh | 评论 0
- 为什么重要：macOS 用户的集中反馈，跨度 5 个版本的功能退化，包含多个症状（会话卡死、回复不完整、UI 错位），影响日常使用。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10285)

**[#10279] 中转站 API：未连通时无显示，连通后必须点击左侧会话才能看到新内容**
- 作者：@123456abcde789 | 评论 3
- 为什么重要：第三方 API 与 UI 刷新逻辑存在问题，推理结果不主动推送，影响使用中转 API 的开发者。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10279)

**[#10211] 项目从 D 盘剪切到 F 盘后，左侧出现随机数字的临时历史对话**
- 作者：@xgh5188 | 评论 3
- 为什么重要：工作区路径变更后出现脏数据会话，且切换会话时卡死需强杀进程。反映路径变更场景下的状态管理缺陷。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10211)

## 重要 PR 进展（10 个）

### 已合并（Closed）— Desktop 2.15.0 架构级改动

**[#10291] 用 Harness 式 turn-loop 取代双重会话执行权威**
- 作者：@SivanCola
- 内容：将 `Controller` 与 `session.Runtime.Activity` 双轨生命周期替换为单一 Harness 式 turn-loop，`idle/running/cancelling/finalizing/recovering` 状态机成为唯一执行权威，并加固热重建与关停路径。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10291)

**[#10295] 限制桌面会话资源占用**
- 作者：@SivanCola
- 内容：将本地与远程转录驻留限制为双向三页窗口（含活动会话 live tail），为内容读取、Markdown 发布、大表格、工具预览等增加显式共享预算，防止长会话资源膨胀。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10295)

**[#10284] 从持久化会话日志分叉已结束轮次**
- 作者：@SivanCola
- 内容：支持从已保存的会话日志中分叉已完成轮次，更新了持久化分叉协议与远程会话文档，定义了最终锚点、操作日志、拒绝模式与验证证据。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10284)

**[#10287] 模型启动失败时仍可恢复会话历史**
- 作者：@SivanCola
- 内容：当已保存的模型连接不存在或 controller 启动失败时，仍能从持久化的 `SessionID` 恢复会话历史并读取，不会因模型配置失效而丢失数据访问。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10287)

**[#10280] 由运行实例持有 Dock 文件导航**
- 作者：@SivanCola
- 内容：文件导航改为「命令驱动 + 运行实例持有」模式，资源身份与访问凭据分离，删除全局取消与按路径沿用 `toolCallId` 的做法，防止点击触发渲染循环。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10280)

### 开放中（Open）— 关键修复与功能

**[#10297] 修复 sandbox.bash="off" 不生效的问题**
- 作者：@BuGlessRB
- 内容：直接对应 #10292。`specForCall` 此前强制覆盖配置为 `enforce` 模式，本 PR 让 `[sandbox] bash = "off"` 真正生效，并跳过 bubblewrap 探测。Windows 上 bash 工具的救星。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10297)

**[#10084] 修复 DeepSeek 思考模式重复 400 错误**
- 作者：@BuGlessRB
- 内容：通过在 thinking 模式下**每个**助手续轮（含纯文本轮次）回传 `reasoning_content` 字段，修复 `The reasoning_content in the thinking mode must be passed back to the API` 的 400 错误。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10084)

**[#10244] 按模型启用工具执行策略（action_policy）**
- 作者：@boscocp
- 内容：`ModelActionPolicy` 已编译进二进制但不可达，本 PR 通过 `model_overrides.<model>.action_policy = true` 逐模型开启，默认关闭，不影响未启用模型的 provider 字节输出。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10244)

**[#10245] 识别被服务端静默截断的提示词**
- 作者：@boscocp
- 内容：Ollama 超长提示词时不报错而是静默截断（200 OK + 截断后 token 数），Reasonix 现有溢出恢复无法感知。本 PR 从响应 token 计数识别该退化，拒绝据此校准，并在当轮发出警告。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10245)

**[#10246] edit_file 匹配空行数量不同的 old_string**
- 作者：@boscocp
- 内容：允许 `edit_file`/`multi_edit` 在 old_string 仅空行数量不同时完成匹配（PEP 8 风格的空行数量差异），作为最后手段，不放松空行存在与否，保持唯一匹配规则。
- [GitHub 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10246)

## 功能需求趋势

从全部 20 条 Issue 中提炼社区最关注的方向：

1. **会话数据安全与迁移可靠性**（最高优先级）：v1.38.8 的会话存储 v4 迁移引发数据丢失、上下文失效、空白输出等多起事故，社区最关切的是**升级过程中的数据完整性与可回滚性**。
2. **崩溃恢复与错误处理**：多个 Issue 提及崩溃后无法恢复、渲染层崩溃但后端存活、崩溃界面缺少重启入口。社区期待**一键恢复/重启**能力。
3. **Windows 平台体验**：bash 工具可用性、控制台窗口闪现、窗口几何持久化错误等问题集中暴露在 Windows 上，Windows 是当前 bug 高发平台。
4. **多会话与标签管理**：用户反映 v1.38.8 找不到经典多会话 tab 模式，希望恢复或改进多会话切换体验。
5. **配置灵活性与沙箱控制**：`[sandbox] bash = "off"` 不生效、工作区外文件访问等需求表明，开发者希望**更精细的控制粒度**而非全有全无。

## 开发者关注点

- **v1.38.8 是「高危版本」**：会话存储 v4 迁移引入多个回归，用户普遍反映需要回滚到 1.38.7。若尚未升级，建议等待 1.38.9 修复合入后再升级。
- **数据丢失类问题最受关注**：`deletedTopics` 误写、上下文压缩失效等问题直接威胁用户数据，社区反应强烈（#10286 为当前最高赞 Issue）。
- **sandbox 配置不生效是阻断性问题**：Windows 用户 bash 工具不可用直接导致 Agent 无法执行任何命令，好在 #10297 已提交修复。
- **团队响应积极**：v2.15.0 合并的 5 个架构级 PR（#10291/#10295/#10280/#10284/#10287）表明团队正在从根因上重构桌面端可靠性，而非仅打补丁。
- **Ollama 用户注意 #10245**：Ollama 静默截断提示词的问题意味着「上下文超限」可能以「模型变笨」的形式表现，该 PR 合并后将有明确警告。

---

*数据来源：[github.com/esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)，统计时间范围 2026-09-14 至 2026-09-15。*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

## OpenCode 社区动态日报 — 2026-09-15

### 1. 今日速览

**v1.18.31 补丁发布**，修复了 ACP 会话恢复时模型上下文与推理边界丢失的问题，并优化了 TUI 远程配置认证错误的提示。社区方面，可观测性（W3C traceparent 传播）与模型推理变体控制成为讨论焦点，同时核心团队提交了多项模型解析与 AI 协议层的重构 PR，为后续扩展奠定基础。

---

### 2. 版本发布

**v1.18.31**（过去 24 小时发布）

- **Core**：修复加载、恢复或分叉会话时，ACP 会话模型、effort、模式及推理块边界丢失的问题（@JacobNWolf）。
- **TUI**：远程配置认证失败时，在启动阶段即显示错误并以失败状态退出，避免静默卡死。
- **Extensions**：包含改进，具体细节未完整披露。

---

### 3. 社区热点 Issues

过去 24 小时共有 8 条活跃 Issue，以下按关注度排序：

| # | Issue | 说明 |
|---|-------|------|
| 1 | [#49047](https://github.com/anomalyco/opencode/issues/49047) — Windows Defender 将 OpenCode 可执行文件标记为木马（6 评论） | 杀毒软件误报 `Trojan.Win32.Generic`，导致程序被隔离或阻止运行。**直接影响用户安装与升级，社区关注度高。** |
| 2 | [#49038](https://github.com/anomalyco/opencode/issues/49038) — 在出站 LLM 请求上传播 W3C traceparent（4 评论） | 希望 OpenCode 在向 LLM 提供商发送 HTTP 请求时携带 W3C trace context，使 OTLP 网关/代理能正确关联父 span。与 #46856（MCP tools/call `_meta` 中的 trace context）互补。 |
| 3 | [#49028](https://github.com/anomalyco/opencode/issues/49028) — PDF 无法被 Z.AI/GLM 5.3 Flash 通过 OpenCode 读取（2 评论） | 同一 PDF 在 web 端可正常解析，但通过 OpenCode 1.18.30 调用 GLM API 时提示 "Failed to parse the file"。图片（PNG）无此问题，推测为 PDF 解析器兼容性缺陷。 |
| 4 | [#49073](https://github.com/anomalyco/opencode/issues/49073) — 每个项目应有专用 `/tmp` 目录（1 评论） | 建议为每个项目分配独立临时目录（如 `/tmp/opencode/{UUID}`），实现更好的沙箱隔离，避免项目间临时文件冲突。 |
| 5 | [#49079](https://github.com/anomalyco/opencode/issues/49079) — Qwen3.8 Flash：`variant=xhigh` 静默禁用推理（0 评论） | 选择 `xhigh` 变体时，OpenCode 发送不含 `thinking` 块的 `output_config.effort`，请求返回 HTTP 200 但推理从未启用。**静默失败比报错更隐蔽，需尽快修复。** |
| 6 | [#49070](https://github.com/anomalyco/opencode/issues/49070) — 文档仅提及 DeepSeek V4 Flash 的 ZDR 月度续订，未说明 V4.1（1 评论） | 文档对 V4.1 Flash 的 ZDR（零数据保留）协议适用范围存在歧义，官方需明确该安排是否同样覆盖 V4.1。 |
| 7 | [#49063](https://github.com/anomalyco/opencode/issues/49063) — node_modules FOD 哈希针对单一 bun 版本校准，其他版本构建失败（0 评论） | Nix flake 的 fixed-output derivation 哈希由特定 bun 版本（flake 自带 nixpkgs）生成，下游消费者若使用不同 nixpkgs 会导致哈希不匹配、构建失败。**影响 Nix 用户的可复现构建。** |
| 8 | [#49053](https://github.com/anomalyco/opencode/issues/49053) — 引用旧 Issue #21736 称"此问题仍然相关"（2 评论） | 未提供新复现步骤，但明确表示旧问题（具体见 #21736）在当前版本中依然存在。此类持续性问题值得维护者排查并更新状态。 |

---

### 4. 重要 PR 进展

过去 24 小时共有 50 条 PR 更新，以下为最值得关注的 10 条：

| # | PR | 类型 | 摘要 |
|---|-----|------|------|
| 1 | [#48943](https://github.com/anomalyco/opencode/pull/48943) — refactor(core): 重构模型解析逻辑 | 重构 | 重写模型解析流程，修复缺失 variant 的边界逻辑。作为 core 层的基础重构，影响所有模型解析路径。 |
| 2 | [#49068](https://github.com/anomalyco/opencode/pull/49068) — refactor(ai): 添加协议体扩展 | 重构 | 新增 `Protocol.withBody` 支持类型化请求体方言，允许扩展调用基础 lowerer 处理原始或投影请求；迁移 Alibaba 和 Z.AI Messages 方言至新架构。 |
| 3 | [#49052](https://github.com/anomalyco/opencode/pull/49052) — fix(ai): 添加 Foundry 消息判别器 | 修复 | 将 Azure Foundry Responses 定义为独立 `azure-responses` 协议方言，仅对 `*.services.ai.azure.com/api/projects/...` 端点启用，并添加显式 `type: "message"` 判别字段，避免与 Azure 传统网关冲突。 |
| 4 | [#49076](https://github.com/anomalyco/opencode/pull/49076) — feat(codemode): 添加 Uint8Array、TextEncoder、TextDecoder | 功能 | 首个二进制类型支持：字节以副本形式跨入扩展；工具边界拒绝二进制数据并提示先编码为文本。补齐 `interpreter-support.md` 中的二进制支持缺口。 |
| 5 | [#49065](https://github.com/anomalyco/opencode/pull/49065) — feat(codemode): 跨 Set、RegExp、URLSearchParams 至宿主 | 功能 | 修复工具/结果边界对 `Set`、`RegExp`、`URLSearchParams` 调用 `JSON.stringify` 导致数据静默丢失（如 `Set` 变成 `{}`）的问题，以有用的形式传递这些对象。 |
| 6 | [#49066](https://github.com/anomalyco/opencode/pull/49066) — feat(app): Agents fleet 标签页带 token 火花图 | 功能 | 新增跨项目的 **Agents** 集群视图：每个 agent 的状态脉冲、编排器/子代理上下文、阶段标签（SPEC/PLAN/BUILD/GATE/REVIEW 等）、输入/输出 token、滚动 tok/s、cache 占比、预估费用、TTFT 延迟及 64 桶输出 token 火花图。 |
| 7 | [#49046](https://github.com/anomalyco/opencode/pull/49046) — fix(observability): 在出站 LLM 请求上传播 W3C traceparent | 修复/功能 | 在发往 LLM 提供商的 HTTP 请求上附加 W3C trace context，使 OTLP 兼容网关/代理能够正确建立 server span 的父级关系。**直接关停 #49038。** |
| 8 | [#49071](https://github.com/anomalyco/opencode/pull/49071) — fix(ai): 使用允许列表处理 OpenAI 提示缓存键 | 修复 | `lowerOptions` 原先无条件将 `request.promptCacheKey` 转为小写 `prompt_cache_key`，改为允许列表匹配，避免对非预期字段做错误转换。关停 #45113。 |
| 9 | [#49040](https://github.com/anomalyco/opencode/pull/49040) — fix(client): 显示被竞争者重叠隐藏的持久服务启动失败 | 修复 | 当两个后台服务竞争者重叠时，第一个竞争者的启动错误可能被丢弃。此 PR 确保持久性启动失败正确上报，避免仅显示无上下文的 "Timed out waiting for the background service to start"（影响 Windows 用户）。 |
| 10 | [#31795](https://github.com/anomalyco/opencode/pull/31795) — feat(opencode): 为 deepseek-v4 模型添加 none effort 级别 | 功能 | 为 DeepSeek V4 模型增加非思考模式（`none` variant），解决这些模型"过度思考"的问题。此 PR 已存在 3 个月，更新后重新进入活跃状态。 |

---

### 5. 功能需求趋势

从过去 24 小时的 Issue 与 PR 中可以提炼出以下社区关注方向：

- **可观测性与分布式追踪**：#49038（LLM 出站请求传播 traceparent）与 #49046（实现 PR）表明，社区对端到端链路追踪的需求正在增长，尤其是面向 OTLP 网关的 LLM 调用追踪。
- **模型推理行为精细化控制**：#49079（Qwen3.8 xhigh 变体静默禁用推理）与 #31795（DeepSeek V4 none 变体）显示，用户希望在变体选择时能精确控制模型是否思考、思考强度，并且**任何静默降级行为都不可接受**。
- **沙箱与项目隔离**：#49073（每个项目独立 `/tmp` 目录）延续了 OpenCode 在代码执行与文件系统隔离方面的一贯诉求，预计未来会有更多对权限边界细粒度的要求。
- **文件格式兼容性**：#49028（PDF 解析失败）提示，多模态输入的文件解析（尤其是 PDF 这类复杂格式）仍是高频痛点，需覆盖不同 PDF 格式与扫描件场景。
- **构建可复现性**：#49063（Nix FOD 哈希）反映了一部分用户对构建链可复现性的关注，希望 CI 产物哈希能跨环境稳定。

---

### 6. 开发者关注点

- **安全告警的误报问题**：#49047 中 Windows Defender 将 OpenCode 标记为 Trojan 是社区最强烈的反馈，涉及安装、更新和执行全流程。开发者期待官方能提供签名或白名单指导，以便与杀毒软件厂商沟通解除误报。
- **后台服务启动失败的排障体验**：#49040 指出，Windows 下 `opencode2` 可能因竞争者重叠而丢失启动错误详情，仅显示笼统的 timeout 提示。此类“模糊失败”在本地开发环境中对用户判断造成了显著困扰。
- **远程配置认证错误的可见性**：v1.18.31 的 TUI 修复表明，配置认证阶段的问题（如 token 过期、代理认证失败）此前可能在启动时静默通过，直到后续请求才暴露。提升启动时失败反馈的显式程度，是开发者关注的高频体验问题。
- **会话与推理状态的精确恢复**：v1.18.31 对 ACP 会话中 model/effort/mode/reasoning 边界的修复，说明在会话恢复、fork 等操作中，模型上下文的一致性仍是复杂且容易出错的环节。开发者期望 fork 后的会话与原始会话在推理行为上完全等价。
- **社区对“静默功能失效”零容忍**：#49079 的 xhigh 变体问题，以及 #49065 中 `Set` 被序列化为 `{}` 的案例，都指向同一类痛点——功能未报错但行为不正确。开发者普遍期望 OpenCode 在无法完整表达语义时，要么明确报错，要么以显式警告提示数据可能丢失。

---
*本日报由 GitHub 数据自动生成，仅供参考。覆盖时间范围：2026-09-14 至 2026-09-15。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-15

> 数据来源：github.com/NousResearch/hermes-agent

## 今日速览

Hermes Agent 发布 v0.21.3（v2026.9.14）补丁版本，汇总了约 338 个 PR，重点修复 remote-gateway 登录问题，为 Docker 镜像及云端部署提供稳定标签。社区侧过去 24 小时共更新 4 个 Issue 与 50 个 PR，其中 MCP 依赖安全漏洞、opencode-zen 会话永久中毒、Gemini 3.8 Flash 图片解析失败等成为关注焦点；Kanban 自动化与 Windows 平台稳定性相关的 PR 持续活跃。

## 版本发布

**v2026.9.14: Hermes Agent v0.21.3** （补丁版）

- 发布日期：2026 年 9 月 14 日
- 内容：滚动集成自 v0.21.2 以来合并的约 338 个 PR，形成稳定标签供下游（Docker 镜像、Hermes Cloud、托管部署）消费。
- 主要修复：remote-gateway 登录相关问题的修复被纳入本次发布。

🔗 https://github.com/NousResearch/hermes-agent/releases

## 社区热点 Issues

过去 24 小时共更新 4 个 Issue，按严重性与社区关注度排列如下：

### 1. MCP 依赖存在公开 GHSA 漏洞且被强制固定（P3，安全）
**#108219** — `pyproject.toml` 在 `dev`、`mcp`、`computer-use` extras 中固定 `httpx2==2.7.0`，且 `[all]` 通过 `hermes-agent[mcp]` 重新引入；`httpcore2==2.7.0` 因 httpx2 的精确依赖声明被连带锁定。尽管上游已有补丁与 GHSA 公告，项目仍强制使用受影响版本。

**重要性**：供应链安全风险，影响所有标准安装路径。社区讨论 2 条，关注补丁升级的具体时间表。

🔗 https://github.com/NousResearch/hermes-agent/issues/108219

### 2. opencode-zen 封装错误导致会话永久中毒（P2，会话状态）
**#111309** — 通过 `muse-spark-1.3-contributor-free` 长会话运行 opencode-zen 时，出现 HTTP 400：`encrypted_content was not issued to this caller`。一旦触发，同一会话内所有重试均失败，会话被永久污染，用户被迫新建会话。

**重要性**：P2 级别，影响长会话的可用性，用户需频繁重启工作流。社区已有 2 条评论。

🔗 https://github.com/NousResearch/hermes-agent/issues/111309

### 3. Gemini 3.8 Flash 无法处理图片（新提交，多模态兼容性）
**#111311** — Hermes Desktop 中通过 OpenRouter 调用 `google/gemini-3.8-flash` 解释图片时，模型尝试读取图片即返回 HTTP 400，报错为“corrupted thought signature”。

**重要性**：新模型兼容性问题，阻断多模态功能；Issue 刚创建（2026-09-15），尚无评论，期望快速响应。

🔗 https://github.com/NousResearch/hermes-agent/issues/111311

### 4. Kanban 自动回收永不推进失败计数，导致无限循环（P3，自动化）
**#111306** — Kanban 卡片可能陷入“claim → stale-reclaim → claim”死循环：自动回收路径不推进 `consecutive_failures`，`failure_threshold` 永不触发，无任何阻塞或升级机制。

**重要性**：暴露 Kanban 自动化在边界条件下的设计缺陷，可能导致任务卡死且不可自愈。

🔗 https://github.com/NousResearch/hermes-agent/issues/111306

---

## 重要 PR 进展

从过去 24 小时更新的 50 个 PR 中选出 10 个代表性条目：

### 1. 注册 `file_tools.hosted_ocr` 配置，支持可选无密钥 OCR（P2，配置）
**#97688** — 新增显式 `file_tools.hosted_ocr` 配置：`true` 启用无密钥云端 OCR，`false` 即使有密钥也禁用上传，`null` 保持原密钥门控默认值；同时注册到配置默认值。

🔗 https://github.com/NousResearch/hermes-agent/pull/97688

### 2. 强制实施 MCP 服务器 `allowed_tools` 白名单（P3，安全）
**#106989** — `mcp_servers.<name>.allowed_tools` 此前只是摆设——MCP 注册从不读取它，配置了 `allowed_tools: [safe_tool]` 的多工具服务器仍会注册全部工具。本 PR 使白名单真正生效。

🔗 https://github.com/NousResearch/hermes-agent/pull/106989

### 3. Bot 模式服务 DM 使用当前 Hermes 安装实例（P2，消息投递）
**#111298** — 修复 bot 消息从 service PATH 误启动无关 `hermes` 的问题；保留原作者 #100673 的贡献，使用现有解析器处理本地与 peer 传输 argv，并新增可复现的原生 Electron 测试矩阵。

🔗 https://github.com/NousResearch/hermes-agent/pull/111298

### 4. TUI-Gateway：处理 `prompt.submit` 5072 错误并回滚已认领的 turn（P2，会话状态）
**#106991** — 当 `_ensure_session_db_row` 返回 False 触发 5072 错误时，按 5070/5071 相同的路径回滚 `_lock_in_submit_turn` 已认领的 turn，避免会话滞留 running 状态并残留 `inflight_turn`。

🔗 https://github.com/NousResearch/hermes-agent/pull/106991

### 5. Windows Gateway 非交互式启动挂起与双重启动修复（P2，Windows）
**#106934** — `hermes gateway start` 在管道 stdin、agent 工具调用等非交互场景下，`prompt_yes_no()` 的 `input()` 会因管道不 EOF 永久挂起；超时/被杀后又可能双重启动两个 gateway。本 PR 修复该竞态。

🔗 https://github.com/NousResearch/hermes-agent/pull/106934

### 6. 合并 Telegram DM 会话被合成 thread_id 拆分的问题（P2，消息投递）
**#107145** — 私有 DM 会话 key 中包含 `message_thread_id`，回复派生的 ID 为每次入站生成新 key，导致同一 chat 并发运行多个 `_handle_message_with_agent` turn 与多个最终发送。本 PR 将 key 改为稳定形式。

🔗 https://github.com/NousResearch/hermes-agent/pull/107145

### 7. 将 OpenRouter 组织预算超限 403 归类为计费错误（P2，计费）
**#107173** — OpenRouter 组织级月预算返回的 `Budget limit exceeded (monthly limit)` 403 被 `_status_403` 误判为 `auth`。本 PR 扩展计费模式匹配，正确分类。

🔗 https://github.com/NousResearch/hermes-agent/pull/107173

### 8. Kanban：按任务原型校准 worker 预算（新功能）
**#111310** — 引入版本化 `kanban-archetype-v1` 策略，根据任务文本派生确定性任务原型，为不同类型工作（如验证、交接、实现）分配差异化 turn 预算，避免一刀切。

🔗 https://github.com/NousResearch/hermes-agent/pull/111310

### 9. 本地执行：工具子进程与网关同 PGID 时跳过 killpg（P2，终端）
**#107032** — Darwin 上 #97296 的缓解移除了 `start_new_session`，终端工具子进程可能共享网关进程组；`_kill_process_group_posix` 的 `killpg` 会误杀网关自身。本 PR 修复此致命错误。

🔗 https://github.com/NousResearch/hermes-agent/pull/107032

### 10. Kanban：auto-decompose 不再阻塞已就绪任务的 spawn（P3，自动化）
**#106990** — 开启 `kanban.auto_decompose` 时，调度器会先等待 `auto_decompose_tick` 完成再 `tick_once`；一次缓慢的 triage 分解会延迟所有无关 `ready` 任务的派生。本 PR 将分解逻辑改为并行。

🔗 https://github.com/NousResearch/hermes-agent/pull/106990

---

## 功能需求趋势

从全部 Issues 与 PR 中可提炼出以下社区关注方向：

1. **Kanban 自动化能力增强**：多个 PR 围绕 Kanban worker 预算（按原型差异化配额 #111310）、自动分解不阻塞 #106990、creator-parent 边不阻塞子任务就绪 #107001、worker 派生时的审批模式 #106999——社区正推动 Kanban 向更智能、更健壮的自动化方向演进。
2. **MCP 安全与配置**：安全白名单（#106989）与依赖安全（#108219）双线推进，显示社区对 MCP 生态的安全治理诉求显著。
3. **Windows 平台体验修复**：gateway 启动/更新（#106934、#107008）、桌面端会话与滚动（#107031、#107003）等 Windows 专项修复占比高，表明 Windows 用户基数正在扩大且对稳定性有明确要求。
4. **多模型与多提供商兼容**：Gemini 3.8 Flash（#111311）、Ollama 原生工具调用（#107119）、OpenRouter 计费错误分类（#107173）——新模型接入与提供商边界情况处理是持续热点。
5. **桌面端体验打磨**：侧边栏分页数调整（#107100）、组合器 resize 不干扰滚动恢复（#107003）、服务 DM 使用当前安装实例（#111298）——桌面 TUI/Electron 体验优化进入精细化阶段。

## 开发者关注点

1. **会话稳定性是首要痛点**：`encrypted_content was not issued to this caller`（#111309）与 TUI 5072 错误（#106991）都指向会话状态管理在长会话场景下的脆弱性——“一次错误永久污染”的反馈模式值得团队重视。
2. **供应链安全的紧迫感**：httpx2 GHSA 公告已公开且上游有补丁，但项目仍固定受影响版本（#108219），开发者希望加快依赖升级节奏。
3. **自动化任务的可观测与可控性**：Kanban 无限循环（#111306）暴露了自动化失败处理机制缺失，开发者期待引入更明确的失败计数与熔断升级路径。
4. **Windows 专项问题仍是高频区域**：非交互启动挂起（#106934）、更新后 Job Object 杀进程（#107008）、未知会话租约导致首轮失败（#107031）——Windows 用户建议增加专项测试矩阵。
5. **新模型接入的预期管理**：Gemini 3.8 Flash 与 Ollama Gemma3nTools 的兼容性问题（#111311、#107119）说明社区对新模型支持速度要求极高，且希望错误信息能直接指出根因（如“corrupted thought signature”）。

:::
