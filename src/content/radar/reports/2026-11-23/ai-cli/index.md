---
title: "AI CLI 工具社区动态日报"
published: 2026-11-23
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-23

> 生成时间: 2026-11-23 00:00 UTC | 覆盖工具: 8 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Deepseek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [OpenClaw](https://github.com/openclaw/openclaw)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态横向对比分析报告 (2026-11-23)

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单轮对话助手”向“持续化工程工作空间”的关键转型期。各主流工具普遍进入功能深水区，社区反馈集中在跨平台稳定性、子代理编排、MCP/ACP 协议生产化以及安全策略与开发体验的平衡上。版本发布节奏分化明显：Gemini CLI 维持夜间构建，Deepseek Harness 发布 Alpha 迭代，其余工具暂无稳定版本更新，但 PR 与 Issue 活跃度整体偏高，说明社区正处于大规模补丁修复与架构调整阶段。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues 更新数 | PR 更新数 | 24 小时内 Release | 主要活跃特征 |
|------|------|--------------|----------|------------------|-------------|
| Claude Code | anthropics/claude-code | 50 条 | 0 条 | 无 | 以 Issue 讨论与 Bug 反馈为主，代码贡献低位 |
| OpenAI Codex | openai/codex | 42 条 | 29 条（全由机器人合并） | 无 | TUI 细节打磨与云端会话稳定性，自动化 PR 占比高 |
| Gemini CLI | google-gemini/gemini-cli | 未披露总数（Top 10 可见） | 10 条（Top 列出） | 有（夜间版 v0.71.0-nightly.20261122） | 子代理与 ACP 协议核心重构，夜间构建持续 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 0 | 0 | 无 | 无活动 |
| OpenCode | anomalyco/opencode | 10 条 | 50 条 | 无 | 桌面端兼容性与性能优化，PR 密集 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 有（v0.2.3-alpha.1 / alpha.2） | 插件生态与开发者协作体验，Alpha 阶段快速迭代 |
| Hermes | NousResearch/hermes-agent | 19 条 | 50 条 | 无 | Gateway 会话状态、桌面端安装、ACP 权限逻辑 |
| OpenClaw | openclaw/openclaw | 13 条 | 50 条 | 无 | macOS Gateway 安装、Agent 会话状态、本地模型支持 |

> 注：部分仓库仅披露了“热点/精选”条目数，总活跃度可能略高于表格所示。

## 3. 共同关注的功能方向

多个工具社区在以下维度上存在高度重合的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **跨平台兼容性与稳定性** | Claude Code、OpenAI Codex、OpenCode、OpenClaw、Hermes | Windows/WSL 路径映射、macOS 桌面端审批失效、Linux 沙箱/挂载问题、安装与启动失败 |
| **子代理与多代理编排** | Gemini CLI、OpenCode、OpenClaw | 子代理状态上报错误、父子代理生命周期同步、代理间任务委派与成本归属 |
| **MCP / ACP 协议生产化** | Claude Code、Gemini CLI、OpenCode | MCP 权限自动拒绝、Token 用量追踪、Hook 事件透传、并行工具调用 |
| **安全策略与开发体验平衡** | Claude Code、Hermes、OpenClaw | 密码输入阻断、模型安全误报（reasoning_extraction）、终端 Guard 误杀合法命令 |
| **桌面端/IDE 集成体验** | OpenAI Codex、OpenCode、OpenClaw | TUI 流式输出、编辑器打开（VSCodium 支持）、模型选择器性能、通知延迟 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 安全策略、权限细化、模型对齐 | 企业级开发团队、安全敏感场景 | 强调“安全优先”，倾向全局策略与 opt-in 例外机制并存 |
| **OpenAI Codex** | TUI 终端交互、云端会话、持续工作空间 | 终端重度用户、ChatGPT 生态用户 | 以 TUI 为核心，依赖云端状态同步，自动化机器人维护 PR |
| **Gemini CLI** | 子代理架构、ACP 协议、AST 感知代码理解 | AI 原生应用开发者、多代理工作流构建者 | 夜间构建快速迭代，ACP 从实验性走向稳定，强调代码结构感知 |
| **OpenCode** | 桌面端性能、自定义 Provider、本地模型集成 | 本地模型部署用户、轻量 API 封装追求者 | 强调轻量级与可扩展性，支持 LM Studio 等本地推理后端 |
| **Deepseek Harness** | 插件市场、智能体可观测性、代码审阅工作流 | 企业内部平台团队、插件开发者 | Alpha 阶段，插件化架构，Node.js 运行时现代化 |
| **Hermes** | Gateway 会话状态、主动调度、语音待机（GPT-Live） | 多模态助手用户、长时会话场景 | 网关-客户端分拓扑，主动代理与语音实时对话成本优化 |
| **OpenClaw** | 本地模型支持、Agent 自诊断/自愈、跨平台容器化 | 本地 LLM 用户、Android/容器化部署场景 | 强调 Agent 自省能力与非标准环境（外部 APFS、PRoot）适配 |

## 5. 社区热度与成熟度

- **高热度、高贡献**：OpenCode、Hermes、OpenClaw 均保持约 50 条/天的 PR 更新，社区代码贡献活跃，但 Issues 积压较多，处于“快速迭代、缺陷修复”阶段。
- **高热度、低代码贡献**：Claude Code（50 Issues / 0 PR）、OpenAI Codex（42 Issues / 29 机器人 PR），社区反馈强烈，但核心代码变更集中或受限，维护侧压力较大。
- **稳定发布、架构重构**：Gemini CLI 夜间构建持续，ACP 和子代理架构处于核心重构期，适合追求前沿特性的早期采用者。
- **Alpha 快速迭代**：Deepseek Harness 连续发布两个 Alpha 版本，功能增强明显，但 Issues/PR 更新为零，可能处于内部封闭开发或社区反馈滞后阶段。
- **停滞**：DeepSeek Reasonix 过去 24 小时无任何活动，社区热度极低，需关注项目维护状态。

## 6. 值得关注的趋势信号

1. **从“单代理”向“多代理编排”转型**  
   Gemini CLI、OpenCode、OpenClaw 均出现子代理状态管理、任务委派、成本归属等问题，说明行业正在从简单的 LLM 调用封装转向复杂的多代理工作流编排。开发者应关注代理间通信协议（如 ACP）的标准化进度。

2. **桌面端 AI CLI 成为标配，TUI/ GUI 融合加速**  
   OpenAI Codex、OpenCode、OpenClaw 大量集中在桌面端安装、TUI 流式输出、编辑器集成（VSCodium、VS Code）等问题，表明 CLI 工具正在向“桌面原生 AI 工作台”演进，纯终端体验已不足以满足主流开发者需求。

3. **安全策略成为用户体验瓶颈**  
   Claude Code 的密码阻断、Hermes 的终端 Guard 误报、OpenClaw 的模型选择器过滤等，均指向同一矛盾：安全防护机制与开发流程的摩擦加剧。未来能够提供“上下文感知”的细粒度权限策略（如 localhost opt-in、基于信任域的策略）的工具将具有竞争优势。

4. **本地模型与混合云架构需求上升**  
   OpenCode 与 LM Studio 的集成问题、OpenClaw 对 llama.cpp 的支持，反映开发者对本地模型部署和混合云推理的兴趣增长。工具链若能同时兼容云端 API 与本地推理后端，将覆盖更广泛的企业场景。

5. **协议层（MCP/ACP）成为生态护城河**  
   Claude Code、Gemini CLI、OpenCode 均在围绕 MCP/ACP 进行权限、Token 追踪、并行调用等底层能力建设。掌握协议标准并建立丰富插件/服务器生态的工具，更有可能在长期竞争中形成平台效应。

**决策建议**：若追求稳定性与企业级安全策略，Claude Code 需关注其权限细化路线图；若需要多代理与前沿协议支持，Gemini CLI 夜间版值得试点；若侧重本地模型与桌面端轻量集成，OpenCode 和 OpenClaw 是观察重点；DeepSeek Reasonix 的长期无活动需谨慎评估其生产可用性。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-23）

## 1. 热门 Skills 排行

基于 PR 更新活跃度与社区讨论维度，以下为当前关注度最高的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 `fix(mcp-builder)` | 适配 `mcp>=2.0.0` 的 `streamable_http_client` 导入变更，并支持自定义 HTTP 头配置 | MCP 协议版本迁移导致现有连接脚本失效，社区急需官方适配以保障 MCP Builder 技能可用性 | OPEN | https://github.com/anthropics/skills/pull/1742 |
| 2 | #1298 `fix(skill-creator)` | 隔离触发评估（trigger evals），修复 Windows 下 `select()` 管道失效及运行时失败误判问题 | 技能创建工具的跨平台稳定性与评估准确性是社区长期痛点 | OPEN | https://github.com/anthropics/skills/pull/1298 |
| 3 | #1245 `Add notion-spec-to-implementation...` | 新增 Notion 规格转实现技能与定量简历审计技能，将产品/技术规格拆解为可执行的 Notion 任务 | 企业知识管理与文档转代码工作流的自动化需求强烈 | OPEN | https://github.com/anthropics/skills/pull/1245 |
| 4 | #1980 `webapp-testing: avoid shell=True` | 移除 `with_server.py` 中 `subprocess.Popen(shell=True)`，消除命令注入风险（CWE-78） | Web 应用测试技能的安全加固，社区对供应链与代码注入风险高度敏感 | OPEN | https://github.com/anthropics/skills/pull/1980 |
| 5 | #1792 `fix(docx)` | LibreOffice 超时时返回错误而非伪成功，并验证输出 DOCX 无修订痕迹 | 文档自动化处理的可靠性与错误回传机制 | OPEN | https://github.com/anthropics/skills/pull/1792 |
| 6 | #1771 `feat(proofcore-contract-auditor)` | 新增 Solidity/Rust 智能合约静态分析技能，并将审计证明锚定至 TON 区块链 | Web3 开发者对链上合约审计与可验证证明的需求 | OPEN | https://github.com/anthropics/skills/pull/1771 |
| 7 | #525 `Add pyxel skill` | 为 Python 复古游戏框架 Pyxel 新增技能，涵盖实现、头less 运行、帧检查与状态验证 | 游戏开发与交互式多媒体内容生成的细分领域需求 | OPEN | https://github.com/anthropics/skills/pull/525 |
| 8 | #1703 `Add md2video-audio skill` | Markdown 文档转 MP4 视频（基于 Marp 幻灯片 + 人类化语音旁白） | 内容创作者希望零成本将文档转化为多媒体教学/演示素材 | OPEN | https://github.com/anthropics/skills/pull/1703 |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支，社区正围绕兼容性、安全性与新功能落地展开讨论。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进方向如下：

1. **工作流自动化与企业协作**
   - 组织内技能共享机制（Issue #228）：用户希望直接在 Claude.ai 内完成组织级技能分享，而非手动传递 `.skill` 文件。
   - Notion 规格转实现（PR #1245）：产品文档到可执行任务的自动拆解。

2. **代码质量与安全审计**
   - 智能合约审计（PR #1771）：Solidity/Rust 静态分析与链上公证。
   - Web 应用测试安全加固（PR #1980）：消除 `shell=True` 命令注入风险。
   - Agent 治理模式（Issue #412）：策略执行、威胁检测、审计追踪。

3. **测试生成与评估工具链**
   - `skill-creator` 触发评估修复（Issue #556、#1352、PR #1298）：`run_eval.py` 触发率为 0、多 worker 下 UUID 交叉匹配导致假阴性，社区急需可信的技能触发评估基础设施。

4. **文档处理与多模态内容**
   - DOCX/PPTX/XLSX 系列修复（PR #1792、#1734、#2019）：办公文档自动化的可靠性与边界情况处理。
   - Markdown 转视频/音频（PR #1703）：文档内容的多媒体化转化。

5. **账户与信任体系**
   - 账号邮箱变更机制（Issue #1143）：防止工作区数据丢失，与竞品对齐。
   - 社区技能信任边界（Issue #492）：社区技能冒用 `anthropic/` 命名空间导致的权限信任漏洞。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且解决了社区明确痛点，大概率在近期落地：

- **#1742 `fix(mcp-builder)`** — MCP 2.0 协议适配是技能生态基础设施的必修课，未合并将直接影响所有依赖 MCP 连接的技能可用性。
- **#1298 `fix(skill-creator)`** — 触发评估是技能自动化分发的核心前提，修复 Windows 兼容与运行时失败误判将显著提升社区自建技能的质量。
- **#1980 `webapp-testing: avoid shell=True`** — 安全漏洞修复（CWE-78）优先级最高，维护者倾向快速合并。
- **#1245 `Add notion-spec-to-implementation...`** — 功能完整且切中企业文档自动化场景，社区反馈正面。
- **#1681 `fix(skill-creator): support direct execution of package_skill.py`** — 修复技能打包脚本直接运行失败，降低社区贡献门槛，更新活跃至 11 月。

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可信、安全、可跨平台复用的技能基础设施（尤其是触发评估与打包工具链），并在此基础上快速落地企业文档自动化、Web3 审计及多媒体内容生成等垂直场景技能。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-23  
**数据来源**: github.com/anthropics/claude-code

---

## 1. 今日速览

过去 24 小时内，Claude Code 仓库未发布新版本，也无新的 Pull Request 合并。社区活动集中在 Issue 更新与讨论上，共 50 条 Issue 被活跃更新。核心关注点集中在 **权限与安全策略（如密码输入阻断、MCP 权限自动拒绝）**、**跨平台兼容性（Windows/macOS/Linux 差异）** 以及 **模型安全误报（reasoning_extraction 误杀正常开发工作）** 三个方向。

---

## 2. 版本发布

过去 24 小时内无新版本发布，本节省略。

---

## 3. 社区热点 Issues（精选 10 条）

以下是评论数、关注度及代表性较高的 10 个 Issue，按社区活跃度排序：

| # | 标题 | 状态 | 评论/👍 | 核心关注点 | 链接 |
|---|------|------|---------|------------|------|
| #78160 | Hard block on typing passwords breaks legitimate dev/test workflows | OPEN | 25 / 32 | 安全策略与开发体验冲突；社区强烈要求在自有开发环境下提供权限分级的 opt-in 机制，而非全局禁止输入密码。 | [查看](https://github.com/anthropics/claude-code/issues/78160) |
| #98256 | MCP elicitation: capability is declared but requests are auto-declined ("print mode") in interactive VSCode sessions | OPEN | 12 / 28 | MCP 能力在 VSCode 交互式会话中被自动拒绝，影响 MCP 服务器在 IDE 中的实际可用性，👍 数较高。 | [查看](https://github.com/claude-code/issues/98256) |
| #111336 | False-positive reasoning_extraction safeguard blocks on ordinary dev work | OPEN | 5 / 1 | 新近出现的模型安全误报问题，涉及 Fable 5.2 / Opus 5.5 / Sonnet 5.5，短期内产生 78 次误拦截，开发者反映强烈。 | [查看](https://github.com/claude-code/issues/111336) |
| #76624 | Account: allow changing the email address in-place | CLOSED (invalid) | 11 / 18 | 账户邮箱无法原地修改的长期诉求，虽被标记 invalid，但高 👍 数说明用户对账户管理灵活性的需求依然强烈。 | [查看](https://github.com/claude-code/issues/76624) |
| #91618 | Windows: isolation-worktree safety check rejects valid worktree due to case-sensitive drive-letter comparison | OPEN | 12 / 2 | Windows 特定回归 bug，驱动器字母大小写比较导致合法 worktree 被拒绝，影响 Windows 开发者的工作区隔离功能。 | [查看](https://github.com/claude-code/issues/91618) |
| #82700 | Pro subscription blocked in Claude Code — "organization has disabled subscription access" | OPEN | 10 / 1 | macOS 认证与订阅问题，Pro 用户在完成重新认证及支持升级后仍无法使用订阅权益，属于付费用户核心痛点。 | [查看](https://github.com/claude-code/issues/82700) |
| #84738 | Advisor turns roll up usage summed across iterations, doubling apparent context | OPEN | 4 / 4 | Token 用量统计异常，导致 auto-compact 提前触发（300-500K tokens），对子代理（subagents）影响尤为严重。 | [查看](https://github.com/claude-code/issues/84738) |
| #111729 | Unquoted heredoc with backticks executes embedded commands | OPEN | 2 / 0 | Linux 平台 Bash 执行安全问题，未加引号的 heredoc 会执行反引号内的命令，存在潜在安全风险。 | [查看](https://github.com/claude-code/issues/111729) |
| #111739 | Client ignores all keyboard input after /resume attaches to a busy background session | OPEN | 1 / 0 | Linux TUI 客户端在恢复忙碌后台会话后忽略所有键盘输入（含 Ctrl+C/D），导致会话无法中断，严重影响可用性。 | [查看](https://github.com/claude-code/issues/111739) |
| #109152 | --tools "" still primes agent actions, causing fabricated Write/Bash calls | OPEN | 1 / 0 | 空工具列表仍触发代理动作，产生虚假的文件写入/命令执行声明，涉及工具调用可靠性与模型幻觉问题。 | [查看](https://github.com/claude-code/issues/109152) |

---

## 4. 重要 PR 进展

过去 24 小时内 **无 Pull Request 更新或合并**（共 0 条）。社区目前的代码贡献活动处于低位，主要精力集中在 Issue 讨论与 Bug 反馈上。

---

## 5. 功能需求趋势

从近 24 小时更新的 50 条 Issue 中，可提炼出以下社区功能关注方向：

1. **权限分级与安全策略细化**  
   用户不再满足于“全开或全关”的二元安全模型。#78160 明确要求在开发者自有环境（localhost/自有测试服务器）下提供密码输入的 opt-in 机制；#94578 反映权限菜单 UX 不清晰（ESC 行为歧义）。社区倾向于更细粒度、可配置的权限策略。

2. **MCP 与 IDE 集成稳定性**  
   #98256 显示 MCP 能力在 VSCode 中被自动拒绝（“print mode”）；#84274 涉及 MCP OAuth token 未持久化，重启后回退到未认证状态。MCP 生态在桌面端/IDE 端的可用性仍是薄弱环节。

3. **跨平台一致性（Windows / macOS / Linux）**  
   Windows 侧出现多个平台特定 bug（#91618 驱动器字母大小写；#94527 侧边栏自定义组不可见）；macOS 侧有订阅阻断（#82700）和 TUI 输入失效（#111739）；Linux 侧有 heredoc 执行安全问题（#111729）。跨平台体验不一致是高频反馈点。

4. **模型安全误报与误杀**  
   #111336 报告 `reasoning_extraction` 安全防护对普通开发工作产生大量误报（78 次拦截），涉及多个最新模型版本。开发者希望安全策略能更精准地区分恶意行为与正常开发操作。

5. **Token 用量透明度与自动压缩机制**  
   #84738 指出 Advisor 轮次用量累计导致 auto-compact 提前触发；#94567 曾请求 API 错误的 Token 退还机制。用户对 Token 计费透明度和上下文管理逻辑的关注度持续升高。

---

## 6. 开发者关注点（痛点与高频需求）

综合所有 Issue 反馈，开发者目前最关注的痛点可归纳为：

- **安全限制过度影响合法工作流**：密码输入被全局阻断、MCP 请求被自动拒绝、模型安全防护误杀正常开发任务，开发者亟需“上下文感知”的权限例外机制。
- **平台差异导致体验碎片化**：Windows、macOS、Linux 在文件系统、TUI 输入、认证订阅等方面表现不一致，跨平台开发者难以获得统一体验。
- **工具调用可靠性存疑**：空工具列表仍触发代理动作、Stop Hook 报告虚假“未推送提交”、Bash heredoc 执行嵌入命令，均指向工具执行层的逻辑漏洞。
- **账户与订阅管理不便**：邮箱无法原地修改、Pro 订阅在组织策略下被阻断且难以自助解决，影响付费用户的留存体验。
- **缺乏事件驱动的 Hook**：#94424 请求会话用量或速率限制窗口变更时的事件通知，避免追踪器轮询，反映开发者希望获得更丰富的可编程扩展点。

---

**报告生成时间**: 2026-11-23  
**数据覆盖范围**: 2026-11-22 至 2026-11-23 的 GitHub 仓库活动

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-23  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

过去24小时内，OpenAI Codex 仓库未发布新版本，但社区活跃度保持高位，共更新 42 条 Issue 和 29 个 PR。核心动态集中在 **TUI 终端体验的持续打磨**、**Windows/WSL 路径与权限问题**、以及 **macOS 桌面端审批与文件访问故障** 三个方向。所有最新 PR 均由自动化机器人 @copyberry[bot] 提交并已合并，主要聚焦 TUI 交互细节与云端会话稳定性。

---

## 2. 版本发布

过去24小时内无新版本发布。

---

## 3. 社区热点 Issues（精选10条）

| # | 标题 | 核心标签 | 评论/👍 | 关注理由 |
|---|------|----------|---------|----------|
| [#57101](https://github.com/openai/codex/issues/57101) | Windows Computer Use: 截图后捕获访问权限及金色/黄色显示边框未关闭 | bug, windows-os, app, computer-use | 84 / 14 | 评论数最多的 Issue，涉及 Windows 计算机使用（Computer Use）功能的资源泄露与 UI 残留问题，影响桌面端自动化体验。 |
| [#61348](https://github.com/openai/codex/issues/61348) | 功能请求：将 ChatGPT + Work + Codex 打造为持续工程工作空间，而非一次性任务 | enhancement, subagent, session, memory, remote | 41 / 0 | 社区对“长期会话与记忆”的强烈需求，指向 Codex 从任务式工具向持续开发工作空间演进的方向。 |
| [#28094](https://github.com/openai/codex/issues/28094) | [Windows][WSL] 桌面端将 /home 项目路径重写为 C:\home，导致项目聊天关联丢失 | bug, windows-os, app, session | 27 / 2 | 长期未解决的跨平台路径兼容性问题，直接影响 WSL 开发者的项目管理与会话连续性。 |
| [#46110](https://github.com/openai/codex/issues/46110) | Linux 沙箱拒绝来自 snapd 的有效 nsfs 挂载根：mountinfo 路径不是绝对路径 | bug, sandbox, CLI | 26 / 21 | Linux 原生环境下的沙箱启动失败，👍数较高，影响 Ubuntu/Snap 用户的 CLI 工作流。 |
| [#59546](https://github.com/openai/codex/issues/59546) | [Desktop] 内置自动化限制阻止外部 Web 系统监控任务，与计划任务文档冲突 | bug, app, automations | 25 / 27 | macOS 桌面端自动化权限限制与文档不一致，👍数高，涉及安全策略与用户预期的冲突。 |
| [#58201](https://github.com/openai/codex/issues/58201) | [Windows 桌面] 更新后设置显示 Ultra，但 Astra 聊天滑块停在 Extra High，配置切换不可用 | bug, windows-os, app, config | 22 / 0 | 模型/推理等级配置前端显示异常，可能导致用户无法按预期使用高等级模型。 |
| [#53560](https://github.com/openai/codex/issues/53560) | macOS 桌面 Work 审批立即失败：“审批请求不再有效” | bug, sandbox, app | 20 / 5 | 审批流程在 macOS 客户端中即时失效，而 Web 端正常，客户端与服务端状态不同步。 |
| [#49883](https://github.com/openai/codex/issues/49883) | [Dots][macOS][Pro] 委托工作在任务完成或审批阻塞后停滞，需反复提醒 | bug, app, subagent, dots | 17 / 2 | 子代理（subagent）任务生命周期管理问题，影响长周期自动化任务的可靠性。 |
| [#60974](https://github.com/openai/codex/issues/60974) | [Windows][WSL] 启动策略检查跳过 CLI 重定位并执行不可执行的 WindowsApps 二进制文件 | bug, windows-os, app, app-server | 12 / 4 | 涉及 Windows 应用商店/MSIX 包的启动安全与 CLI 定位问题，可能影响新版本安装后的可用性。 |
| [#62899](https://github.com/openai/codex/issues/62899) | ChatGPT iOS 打开 Codex 标签页崩溃：SwiftUI 元数据 EXC_BAD_ACCESS | bug, iOS | 3 / 2 | iOS 端新出现的严重崩溃，桌面端正常，移动端稳定性亟待关注。 |

---

## 4. 重要 PR 进展（精选10条）

所有 PR 均于 2026-11-22 创建并合并，作者为 @copyberry[bot]，主要围绕 TUI 终端界面与云端会话体验优化：

| # | 标题 | 功能/修复说明 |
|---|------|--------------|
| [#63211](https://github.com/openai/codex/pull/63211) | TUI 中自动恢复断开的云端对话 | 终端断连后，云端已保存的回复可在后台重新附加到显示的对话中，避免消息丢失。 |
| [#63208](https://github.com/openai/codex/pull/63208) | Command Center 搜索增加创建时间排序 | 按“创建时间”而非“更新时间”排序，帮助用户更快找到最新匹配任务。 |
| [#63196](https://github.com/openai/codex/pull/63196) | 流式输出在内联历史重绘前保持可见 | 修复 Markdown 表格等流式内容在移入滚back 时短暂消失的问题。 |
| [#63195](https://github.com/openai/codex/pull/63195) | TUI 备用屏幕下尊重 tmux 鼠标设置 | 修复在 tmux 备用屏幕中切换鼠标选项后，Codex 捕获状态与 tmux 设置不同步的问题。 |
| [#63194](https://github.com/openai/codex/pull/63194) | 通知打断时保持 TUI 流式答案完整 | 避免警告或粘贴错误导致流式答案片段重复或在终端调整大小后丢失。 |
| [#63193](https://github.com/openai/codex/pull/63193) | 提示回退和分叉后丢弃 TUI 输入缓存 | 防止缓冲的回车键在用户编辑恢复的提示前意外提交。 |
| [#63192](https://github.com/openai/codex/pull/63192) | 主动输入期间延迟编号 TUI 问题 | 防止用户输入的数字（如“Phase 2”）被误识别为带编号选项的回答。 |
| [#63189](https://github.com/openai/codex/pull/63189) | 扩大 TUI 侧边栏标签关闭目标 | 将关闭按钮及两侧单元格合并为三列可点击区域，提升鼠标操作易用性。 |
| [#63184](https://github.com/openai/codex/pull/63184) | 允许 Codex 在终端侧边栏打开工作区文件 | 新增 `open_in_codex` MCP 工具，可将文档、图片或源码行与对话并排展示。 |
| [#63175](https://github.com/openai/codex/pull/63175) | 复用运行时认证的 Responses WebSocket | 避免每次请求重新握手和重发完整输入，提升云端会话效率。 |

---

## 5. 功能需求趋势

从 Issue 与 PR 中提炼出社区当前最关注的四个功能方向：

1. **持续工程工作空间与记忆**  
   如 #61348 所示，用户希望 Codex 能跨会话保留上下文、项目关联与长期记忆，从“一次性任务”向“持续开发环境”演进。

2. **跨平台路径与沙箱兼容性**  
   Windows/WSL 路径重写（#28094）、Linux snapd nsfs 挂载（#46110）等问题反映出跨操作系统文件系统抽象仍是核心痛点。

3. **桌面端审批与自动化权限**  
   macOS/Windows 桌面端的 Work 审批失效（#53560、#60139）和自动化限制（#59546）表明，客户端安全策略与用户自动化需求之间存在明显张力。

4. **TUI 终端交互体验**  
   大量 PR 集中于流式输出、鼠标支持、侧边栏操作、输入缓存等细节，说明终端用户对 Codex CLI/TUI 的日常使用频率很高，对交互流畅度要求苛刻。

---

## 6. 开发者关注点

**高频痛点：**
- **Windows 平台稳定性**：计算机使用资源残留（#57101）、WSL 路径映射（#28094）、启动策略与 CLI 重定位（#60974）、本地命令执行被安全策略阻断（#59941）。
- **macOS 桌面端审批与文件访问**：Work 审批即时失效（#53560）、附加 PDF/DOCX/TXT 文件助手不可用（#62667）、委托工作停滞（#49883）。
- **Linux 沙箱与 CLI**：snapd nsfs 挂载根被拒绝（#46110）、嵌套沙箱守护进程目录权限冲突（#53799）。
- **移动端崩溃**：iOS 打开 Codex 标签页崩溃（#62899）、远程会话消息丢失（#63212）。

**开发者期待：**
- 键盘快捷键切换模型与推理等级（#26819）；
- 子代理原生编排与提示缓存血缘保留（#24704、#51658）；
- 运行用量说明与优化建议直接显示在 Usage 面板（#54981）；
- 新对话默认不绑定上一个活跃项目（#24731）。

---

*本日报基于 GitHub openai/codex 仓库在 202

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-23)

## 今日速览

Gemini CLI 今日发布夜间版本 `v0.71.0-nightly.20261122`，社区围绕 **子代理（Subagent）架构**、**ACP（Agent Client Protocol）模式稳定性** 以及 **沙箱安全** 展开密集讨论与代码贡献。多个 P1 级 Bug 指向子代理状态上报错误与通用代理挂起问题，成为当前最高优先级的修复目标。

---

## 版本发布

**v0.71.0-nightly.20261122.geecccfcd5**  
- 发布时间：2026-11-22  
- 类型：Nightly 构建  
- 完整变更：https://github.com/google-gemini/gemini-cli/compare/v0.71.0-nightly.20261121.geecccfcd5...v0.71.0-nightly.20261122.geecccfcd5  

> 夜间版本主要包含自动化版本 bump 与核心模块的持续集成更新，未发布重大功能变更。

---

## 社区热点 Issues（Top 10）

| # | 标题 | 核心内容 | 关注度 | 链接 |
|---|------|----------|--------|------|
| #22323 | Subagent recovery after MAX_TURNS 报告为 GOAL 成功，掩盖中断 | `codebase_investigator` 子代理在触发最大轮次限制前未做任何分析，却仍上报 `status: "success"` 和 `Termination Reason: "GOAL"`，导致中断被掩盖。 | P1 Bug，14 条评论，2 👍 | https://github.com/google-gemini/gemini-cli/issues/22323 |
| #21409 | Generalist agent 挂起 | 当 `gemini-cli` 交给通用代理处理时会永久挂起，即使是简单的文件夹创建操作也会卡住一小时以上。禁用子代理可规避。 | P1 Bug，8 条评论，8 👍 | https://github.com/google-gemini/gemini-cli/issues/21409 |
| #19873 | 基于零依赖 OS 沙箱的模型 Bash 亲和性与后执行意图路由 | 提议利用 Gemini 3 模型对原生 Bash 工具（grep/cat/sed/awk）的天然亲和力，在不牺牲安全性与 UX 的前提下增强代码库探索与文件编辑能力。 | P2 Enhancement，9 条评论 | https://github.com/google-gemini/gemini-cli/issues/19873 |
| #22745 | 评估 AST 感知文件读取、搜索与映射的影响 | 探索 AST 感知工具是否能通过更精确的方法边界读取、减少 Token 浪费来提升代码导航效率。 | P2 Feature，7 条评论 | https://github.com/google-gemini/gemini-cli/issues/22745 |
| #21968 | Gemini 不足够使用技能和子代理 | 模型不会主动调用自定义技能（如 gradle、git）和子代理，除非用户显式指令，影响自动化体验。 | P2 Bug，7 条评论 | https://github.com/google-gemini/gemini-cli/issues/21968 |
| #22267 | Browser Agent 忽略 settings.json 覆盖（如 maxTurns） | 浏览器代理完全忽略全局或项目级 `settings.json` 中的配置覆盖，尽管 `AgentRegistry` 在初始化时已正确读取合并。 | P2 Bug，5 条评论 | https://github.com/google-gemini/gemini-cli/issues/22267 |
| #21983 | browser subagent 在 Wayland 下失败 | 浏览器子代理在 Wayland 显示服务器环境下异常终止，终止原因为 GOAL，但实际未完成任务。 | P1 Bug，4 条评论，1 👍 | https://github.com/google-gemini/gemini-cli/issues/21983 |
| #22232 | 增强 browser_agent 弹性：自动会话接管与锁恢复 | 浏览器管理器对锁定的浏览器配置文件采用“快速失败”策略，缺乏自动会话接管或孤立进程恢复机制。 | P3 Feature，4 条评论 | https://github.com/google-gemini/gemini-cli/issues/22232 |
| #21000 | 尝试使用原生文件工具创建和维护任务追踪器 | 提议将任务追踪从 LLM 上下文迁移到持久化文件，解决上下文腐烂、高 Token 成本及跨会话记忆丢失问题。 | P3 Bug，4 条评论 | https://github.com/google-gemini/gemini-cli/issues/21000 |
| #20079 | `~/.gemini/agents/filename.md` 作为符号链接时不被识别为代理 | 代理目录下的符号链接文件未被识别，影响用户通过共享代理文件进行复用的场景。 | P2 Bug，4 条评论 | https://github.com/google-gemini/gemini-cli/issues/20079 |

---

## 重要 PR 进展（Top 10）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #30409 | feat(core): allow agents to invoke other agents | CLOSED | 允许子代理调用其他代理，支持在 `tools` 前置声明中列出代理名，并引入嵌套深度限制，解决子代理无法委派任务的问题。 | https://github.com/google-gemini/gemini-cli/pull/30409 |
| #30297 | fix(acp): truncate large shell and mcp tool outputs in acp mode | OPEN | 在 ACP 模式下对 Shell 和 MCP 工具的大输出进行截断，避免海量日志或目录树直接塞满模型上下文。 | https://github.com/google-gemini/gemini-cli/pull/30297 |
| #30277 | fix(sandbox): improve permission denial detection and unsupported environment handling | OPEN | 修复 POSIX 沙箱权限拒绝检测遗漏，改进容器化和受限执行环境下的兼容性与错误处理。 | https://github.com/google-gemini/gemini-cli/pull/30277 |
| #30273 | fix(core): unify exit codes mapping and fatal error hierarchy | OPEN | 统一 `@google/gemini-cli-core` 的 CLI 退出码映射，将此前硬编码的数字字面量（如沙箱致命错误、轮次限制错误）纳入统一管理。 | https://github.com/google-gemini/gemini-cli/pull/30273 |
| #30353 | fix(acp): standardize token usage tracking and quota metadata | OPEN | 修复 ACP 模式下取消回合时丢失 `PromptResponse.usage` 的问题，并统一配额元数据，确保 ACP 客户端能正确获取 Token 用量。 | https://github.com/google-gemini/gemini-cli/pull/30353 |
| #30339 | fix(acp): surface BeforeAgent hook denial and stop reasons | OPEN | 在 ACP 模式下，当 BeforeAgent/AfterAgent Hook 拒绝提示词或停止执行时，将相关事件正确透传给 ACP 流消费者，避免事件丢失。 | https://github.com/google-gemini/gemini-cli/pull/30339 |
| #30316 | fix(core): preserve custom model alias generation settings | OPEN | 修复自定义模型别名（如指向 flash-lite）在模型选择时因字符串不匹配而导致生成设置未被保留的问题。 | https://github.com/google-gemini/gemini-cli/pull/30316 |
| #30298 | feat(acp): execute independent tool calls in parallel | OPEN | 在 ACP 模式下对独立的只读工具调用实现并行执行，提升工具调用效率，与标准 CLI 调度器行为保持一致。 | https://github.com/google-gemini/gemini-cli/pull/30298 |
| #30405 | fix(a2a-server): handle rejection of fire-and-forget scheduler.schedule() | OPEN | 为 A2A 服务器中被“发后即忘”的 `scheduler.schedule()` 添加拒绝处理，防止未处理的 Promise 拒绝导致整个进程崩溃。 | https://github.com/google-gemini/gemini-cli/pull/30405 |
| #30404 | fix(core): only strip the trailing .json from checkpoint names | OPEN | 修复检查点名称处理逻辑，仅剔除尾部 `.json`，避免 `package.json` 等文件名被错误截断导致 `/restore` 失败。 | https://github.com/google-gemini/gemini-cli/pull/30404 |

---

## 功能需求趋势

从近 24 小时的 Issue 与 PR 中可观察到以下社区关注方向：

1. **子代理协作与编排**  
   多个 Issue 和 PR 围绕“代理调用代理”（#30409, #28738）、子代理使用不足（#21968）、子代理轨迹可见性（#22598）展开，表明社区希望构建更复杂的多代理工作流，而非单代理模式。

2. **ACP（Agent Client Protocol）生产化**  
   大量 PR 集中在 ACP 模式的输出截断（#30297）、Token 用量追踪（#30353）、Hook 事件透传（#30339）及并行工具调用（#30298），说明 ACP 正从实验性功能走向稳定可用的集成接口。

3. **AST 感知的代码理解**  
   围绕 AST 感知文件读取、搜索与代码库映射的讨论（#22745, #22746, #22747）持续升温，社区希望通过更精确的代码结构感知降低 Token 消耗并提升导航精度。

4. **沙箱与安全加固**  
   零依赖 OS 沙箱（#19873）、权限拒绝检测（#30277）、受污染 Shell 命令规则（#30196）等安全相关议题频繁出现，反映开发者对在受限环境下运行 AI 代理的稳健性要求更高。

5. **持久化任务追踪与上下文管理**  
   多个 Issue 提出将任务追踪从 LLM 上下文迁移到文件系统（#21000, #18836），以解决长会话下的上下文腐烂和记忆丢失问题。

---

## 开发者关注点（痛点与高频需求）

- **子代理状态不可信**：子代理在触达 `MAX_TURNS` 后仍上报 `GOAL` 成功（#22323），导致上层无法

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-23)

## 今日速览

OpenCode 社区今日活跃度持续高涨，共更新 10 个 Issue 与 50 个 PR。开发者集中反馈了桌面端（Windows/Linux/macOS）的兼容性问题、内存占用过高以及子代理中断状态记录错误等核心缺陷；同时，ACP 会话配置、自定义 Provider 回归等功能需求引发广泛讨论。当前暂无新版本发布。

## 版本发布

过去 24 小时内无新版本 Release。

## 社区热点 Issues

以下 10 个 Issue 今日更新最为频繁或涉及核心体验，建议重点关注：

| # | 标题 | 状态 | 核心内容 | 社区反应 | 链接 |
|---|------|------|----------|----------|------|
| #65496 | [BUG]: RAM Usage Through the Roof | CLOSED | macOS 上 OpenCode v2.2.5 内存占用异常，被质疑“本应是轻量 API 封装” | 6 条评论，1 个 👍，反映用户对资源消耗的强烈不满 | [查看](https://github.com/anomalyco/opencode/issues/65496) |
| #62893 | Desktop: mermaid image nodes render without the image | OPEN | 桌面端 Markdown 查看器中 Mermaid 图片节点仅显示标签，图片缺失；普通 Markdown 图片正常 | 8 条评论，已复现，指向 `markdown-mermaid.ts` 组件 | [查看](https://github.com/anomalyco/opencode/issues/62893) |
| #63194 | Desktop (Linux): "Desktop IPC handler failed" ... plus VSCodium support | OPEN | Linux 桌面端未安装 VS Code 时“在编辑器中打开”失败，且列表仍显示 VS Code；用户请求支持 VSCodium | 4 条评论，已复现，兼容性与检测逻辑缺陷 | [查看](https://github.com/anomalyco/opencode/issues/63194) |
| #65578 | [FEATURE]: Please Bring Back the Custom Provider Option in OpenCode V2 Desktop | CLOSED | 用户怀念 V1 的自定义 Provider 功能，希望 V2 桌面端恢复该选项 | 4 条评论，功能回归需求明显 | [查看](https://github.com/anomalyco/opencode/issues/65578) |
| #61413 | core: foreground subagent interrupted by parent shutdown is recorded as a user stop | OPEN | 父进程关闭中断前台子代理时，清理逻辑错误地将其记录为用户主动停止 | 2 条评论，已复现，涉及核心子代理生命周期逻辑 | [查看](https://github.com/anomalyco/opencode/issues/61413) |
| #65638 | Windows: tool rows show absolute paths when the path uses / or another drive letter case | OPEN | Windows 时间线中 Glob/Grep/List 行显示绝对路径，而非项目内相对路径 | 1 条评论，跨平台路径处理问题 | [查看](https://github.com/anomalyco/opencode/issues/65638) |
| #65632 | [FEATURE]: ACP: support session/options for pre-session model discovery | OPEN | 请求在 ACP 中支持 `session/options`，实现会话前模型发现与配置选项 | 1 条评论，关联更大的 ACP v2 请求 #44877 | [查看](https://github.com/anomalyco/opencode/issues/65632) |
| #65628 | BUG: Local LLM Issues with Open Code connected to LM Studio | CLOSED | 连接 LM Studio 时出现重复生成导致输出速度降至 2 token/s，疑似 OpenCode 侧问题 | 1 条评论，本地大模型集成稳定性问题 | [查看](https://github.com/anomalyco/opencode/issues/65628) |
| #65637 | persistent-pty: repeated WS takeover connect/disconnect cycles degrade input delivery | OPEN | 持久 PTY WebSocket 连接断开重连约 25-30 次后，输入投递降级，重放缓冲区在未正常关闭帧的情况下失效 | 0 条评论，终端交互底层稳定性隐患 | [查看](https://github.com/anomalyco/opencode/issues/65637) |
| #65585 | [FEATURE]: 请求新老拉取合并 | CLOSED | 内容较为模糊，涉及新旧版本拉取合并请求 | 2 条评论，社区对版本迁移/合并有关注 | [查看](https://github.com/anomalyco/opencode/issues/65585) |

## 重要 PR 进展

今日更新的 50 个 PR 中，以下 10 个涉及核心修复与新功能，值得开发者追踪：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #65635 | fix(app): eliminate model picker layout thrash on open, scroll, and select | OPEN | 桌面端模型选择器在打开、滚动、选择时存在布局抖动，基于 92 模型/19 提供商目录进行性能剖析并优化 | [查看](https://github.com/anomalyco/opencode/pull/65635) |
| #65639 | fix(session-ui): show Windows tool paths relative to the project | OPEN | 修复 Windows 工具行显示绝对路径问题，关联 Issue #65638 | [查看](https://github.com/anomalyco/opencode/pull/65639) |
| #65261 | [contributor] feat(core): agent widgets | OPEN | 代理可在会话中展示交互式 Widget（PsychoScript 模板 + JSON 数据），由各客户端原生渲染 | [查看](https://github.com/anomalyco/opencode/pull/65261) |
| #65621 | fix(ai): flatten forced namespaced tool choices on flat protocols | OPEN | 扁平协议下强制命名空间工具选择的扁平化处理，修复工具选择传递问题 | [查看](https://github.com/anomalyco/opencode/pull/65621) |
| #63998 | [contributor] feat(server): experimental spaces | OPEN | 服务端实验性 Spaces 功能，支持 `PUT/DELETE /api/experimental/space/:space/:key` 写入，受 `spaces` 标志控制 | [查看](https://github.com/anomalyco/opencode/pull/63998) |
| #61414 | fix(core): preserve parent interruption reason in subagents | CLOSED | 修复父进程中断前台子代理时，清理逻辑错误调用子代理用户停止入口，关联 Issue #61413 | [查看](https://github.com/anomalyco/opencode/pull/61414) |
| #65633 | [contributor] feat(core,protocol,server): add experimental session cwd | OPEN | 会话可携带可选工作目录 `session.experimental.cwd`，独立于 `session.location`，受 `machines` 标志控制 | [查看](https://github.com/anomalyco/opencode/pull/65633) |
| #65631 | fix(app): stop timeline remount height collapses and scroll-frame layout thrash | OPEN | 修复时间线滚动不稳定，消除重装载行导致的高度坍缩与离屏行抖动 | [查看](https://github.com/anomalyco/opencode/pull/65631) |
| #65634 | perf(app): keep the background activity menu smooth with many subagents | OPEN | 后台活动菜单在 ~20 个运行中子代理时滚动低于 1 FPS，通过优化 memo、For 键与事件处理提升流畅度 | [查看](https://github.com/anomalyco/opencode/pull/65634) |
| #63406 | fix(desktop): list only installed apps in Open in on Linux | OPEN | Linux 桌面端“在编辑器中打开”仅列出已安装应用，修复 `checkAppExists` 未实际检查的问题，关联 Issue #63194 | [查看](https://github.com/anomalyco/opencode/pull/63406) |

## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **IDE 与编辑器集成**：Linux 桌面端对 VSCodium 的支持需求（#63194）、Windows 路径兼容性（#65638）、ACP 会话前模型发现（#65632），表明社区希望 OpenCode 更好地融入现有 IDE 工作流。
2. **自定义 Provider 与模型灵活性**：V2 桌面端用户强烈要求恢复 V1 的自定义 Provider 选项（#65578），反映对多模型供应商接入的刚性需求。
3. **桌面端稳定性与性能**：macOS 内存占用过高（#65496）、模型选择器布局抖动（#65635）、后台子代理菜单卡顿（#65634），性能与资源控制成为桌面客户端的核心痛点。
4. **子代理与会话生命周期**：前台子代理中断状态记录错误（#61413）、持久 PTY WebSocket 重连后输入降级（#65637），开发者关注会话与代理的底层稳定性。
5. **本地大模型集成**：与 LM Studio 等本地 LLM 的兼容性问题（#65628），显示社区对本地模型部署的兴趣日益增长。

## 开发者关注点

- **资源消耗**：macOS 上 CLI 内存占用异常被用户诟病，需进一步优化轻量级 API 封装的资源表现。
- **跨平台一致性**：Windows 路径大小写与分隔符处理、Linux 编辑器检测逻辑缺失，导致桌面端体验不一致。
- **子代理状态准确性**：父进程关闭时子代理被误记为用户主动停止，影响调试与审计可靠性。
- **功能回归**：V2 版本相较 V1 缺少自定义 Provider 等配置选项，部分老用户迁移意愿受影响。
- **终端交互稳定性**：持久 PTY WebSocket 频繁断连后输入投递降级，可能影响长时间会话的可用性。

---

*数据来源：GitHub anomalyco/opencode（过去 24 小时更新）*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 (2026-11-23)

**数据来源**: [github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

---

## 1. 今日速览

过去 24 小时，Deepseek Harness 连续发布了两个 Alpha 版本（`v0.2.3-alpha.1` 与 `v0.2.3-alpha.2`），重点增强了插件生态与开发者协作体验。主要变更包括插件市场支持 Git 仓库来源、新增实验性时间线插件、代码审阅页面上线，以及 Node.js 运行时版本要求提升。同期社区 Issues 与 Pull Requests 更新为空。

---

## 2. 版本发布

### dsh-v0.2.3-alpha.2
- **变更类型**: Chores / 依赖升级
- **核心内容**: 调整 Node.js 版本要求，现要求 24.x 系列需为 `24.22.3` 及以上，或 26.x 系列需为 `26.13.1` 及以上。
- **贡献者**: [@imccyu](https://github.com/imccyu)
- [查看完整 Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.3-alpha.2)

### dsh-v0.2.3-alpha.1
- **插件市场**: 支持添加 Git 仓库作为插件来源，私有仓库中的插件也能浏览和安装。([@acehinnnqru](https://github.com/acehinnnqru))
- **实验性时间线插件**: 可查看智能体任务树、阻塞事项和进展报告；点击进度条可展开任务树；任务与报告语言可选跟随对话。([@Magolor](https://github.com/Magolor))
- **代码审阅页面**: 新增集中查看本人相关 GitHub PR 的页面，支持浏览描述和变更，并在页内与智能体协作审阅。([@LegGasai](https://github.com/LegGasai))
- **代码审阅插件**: 新增扩展机制（具体内容因截断未完全展示）。
- [查看完整 Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.3-alpha.1)

---

## 3. 社区热点 Issues

**过去 24 小时内 Issues 更新数量：0 条**

由于该时间窗口内无新增或更新的 Issue，无法列出 10 个值得关注的 Issue。建议社区运营与维护者关注以下已发布功能的后续反馈：
- 插件市场私有 Git 仓库接入的权限与安全问题
- Node.js 版本强制升级对现有部署环境的兼容性影响
- 实验性时间线插件的稳定性与语言跟随功能体验

---

## 4. 重要 PR 进展

**过去 24 小时内 Pull Requests 更新数量：0 条**

该时间窗口内无合并或更新的 Pull Request，无法列出 10 个重要 PR。上述版本发布中的功能增强（插件市场 Git 支持、时间线插件、代码审阅页面等）应为近期社区贡献的主要成果，具体 PR 详情可查阅各 Release 的关联提交记录。

---

## 5. 功能需求趋势

基于本次两个版本的 Release Notes，可提炼出社区与维护团队当前关注的功能方向：

| 趋势方向 | 具体体现 | 预期价值 |
|---------|---------|---------|
| **插件生态开放** | 插件市场支持 Git 仓库来源，包括私有仓库 | 降低企业私有插件接入门槛，扩展第三方插件生态 |
| **智能体可观测性** | 实验性时间线插件，展示任务树、阻塞事项与进展报告 | 提升多步智能体任务的调试与监控能力 |
| **代码协作工作流** | 代码审阅页面集中查看 GitHub PR，支持页内智能体协作 | 将代码审查与 AI 协作深度集成，减少上下文切换 |
| **运行时现代化** | Node.js 最低版本提升至 24.22.3 / 26.13.1 | 获得更好的性能、安全性与现代 JavaScript 特性支持 |

---

## 6. 开发者关注点

根据本次发布内容，开发者可能关注的痛点与需求包括：

1. **环境兼容性**：Node.js 版本要求提升可能导致旧环境下的构建或运行失败，开发者需确认 CI/CD 与生产环境是否满足新版本要求。
2. **私有插件安全**：插件市场支持私有 Git 仓库后，身份验证、访问控制与供应链安全将成为关注重点。
3. **实验性功能稳定性**：时间线插件标记为“实验性”，开发者在生产使用前需评估其对任务树展示与语言跟随功能的可靠性。
4. **代码审阅集成深度**：页内与智能体协作审阅的具体交互模式、扩展机制的稳定性及文档完善程度，将影响开发者采用意愿。

---

> **说明**：本日报严格基于提供的 GitHub 数据生成。由于过去 24 小时内 Issues 与 Pull Requests 更新数量均为 0，第 3、4 章节无法列出 10 个条目，已如实说明并基于 Release Notes 提炼了相关趋势与关注点。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期**: 2026-11-23  
**仓库**: NousResearch/hermes-agent  

---

## 1. 今日速览

本周 Hermes 社区活跃度持续高位，24 小时内产生 19 条更新 Issue 与 50 条更新 PR。社区核心关注点集中在 **Gateway 会话状态管理、桌面端安装与启动稳定性、ACP 权限逻辑修复** 以及 **GPT-Live 语音待机等新功能落地** 上。当前暂无新版本发布，开发以补丁修复和功能特性 PR 为主。

---

## 2. 版本发布

过去 24 小时内无新版本 Release。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容与重要性 | 社区反应 | 链接 |
|---|------|------------------|----------|------|
| #148531 | owner-backfill 409s，桌面启动时“Exclusive maintenance refused” | 独立网关拥有 state.db 的分拓扑下，每次 macOS 桌面启动均触发 409 冲突，阻塞会话/Profile 初始化，P2 等级，影响核心启动流程。 | 7 条评论，持续跟踪，涉及 `sessions.py` 与 `web_server_sessions.py` 的维护锁逻辑。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/148531) |
| #156593 | 103 GB 可用空间仍报"No space left on device" | f2fs 文件系统下 inode 耗尽绕过所有磁盘守护，导致 gateway 在 241 字节写入时崩溃，P2 等级，涉及底层存储防护机制缺陷。 | 5 条评论，社区关注 inode 监控与磁盘守护逻辑。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/156593) |
| #130294 | Windows 安装失败："failed to remove directory *.data" | uv 依赖安装期间目录删除失败（os error 2），P2 等级，Windows 安装更新流程受阻，影响新用户上手。 | 5 条评论，涉及 Python 3.14 + uv 0.12.3 环境的兼容性问题。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/130294) |
| #127995 | terminal guard 拦截合法 venv-python heredoc | Python 位运算符 `&` 被误判为后台作业，导致合法命令被阻断，P2 等级，终端工具链误报问题。 | 4 条评论，开发者讨论 `_INERT_HEREDOC_CONSUMER_RE` 正则覆盖不足。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/127995) |
| #158976 | Gateway 结算结果在 state_meta 中永不删除，state.db 无限增长 | 每条结算结果包含完整 turn 数据，导致 state.db 增长约 1 GB，P2 等级，长期运行网关面临存储膨胀风险。 | 1 条评论，社区关注数据清理策略与存储上限。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/158976) |
| #127468 | `hermes pause` 不停止派发，5/6 个 dispatch_once 调用者忽略 ESTOP 信号 | 暂停后主机仍继续产生工作进程，P2 等级，控制面与执行层信号同步缺失。 | 1 条评论，涉及 gateway、cron、plugins 多组件协同。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/127468) |
| #159031 | ACP "Deny always" 仅为一次性拒绝 | 用户选择“永久拒绝”后，后续匹配命令仍会再次弹出提示，持久化逻辑缺失，P2 等级。 | 新创建 Issue（11-22），1 条评论，关联 PR #159030 正在处理。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/159031) |
| #158947 | Dashboard API 无法删除本地（非 Hub）技能 | 技能管理 API 缺少本地技能删除接口，仅支持通过 `skill_manage` 工具操作，P2 等级，Dashboard 功能不完整。 | 新创建 Issue（11-22），1 条评论，社区期待 REST API 补全。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/158947) |
| #159035 | Ark 篡改告警在 v0.23.3 后无限循环 | 更新后 `.env` 中明确存在 `ARK_PASSPHRASE`，但每次配置重载均判定为“移除”，P2 等级，更新回归问题。 | 新创建 Issue（11-22），0 条评论，需关注插件认证模块。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/159035) |
| #159034 | Bot-to-Bot 发送因“profile authority is not ready”被拒 | 多路复用安装下，若 multiplexer 漏掉一次 5s identify，消息路由即被拒绝，P2 等级，新创建（11-22）。 | 0 条评论，涉及 Profile 权威状态机与超时处理。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/159034) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 功能/修复说明 | 状态 | 链接 |
|---|------|--------------|------|------|
| #158289 | Hermes 自主调度帮助（行程、习惯、欠回复），每个任务弹“Schedule this job?”卡片 | 模型可主动识别未来需求并创建调度任务，执行前需用户确认，P3 特性，增强主动代理能力。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/158289) |
| #154444 | fix(gateway)：不再将新对话路由至已归档会话 | 修复归档会话仍被网关路由新消息的问题，区分“侧边栏隐藏”与“会话结束”语义。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/154444) |
| #156210 | fix(credential_pool)：在携带预刷新 OAuth 令牌的失败中正确归因 | 解决单次 OAuth 刷新在请求分发与失败恢复之间轮换令牌，导致 `api_key_hint` 不匹配的问题。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/156210) |
| #151431 | fix(tui)：退出摘要 epilogue 防御 KeyboardInterrupt | 修复 TUI 关闭时 `agent.i18n.t()` 区域未捕获 Ctrl-C，导致退出异常。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/151431) |
| #158717 | feat(regex)：引入 hermes_re facade 及 regex 设置 doctor 检查 | 基于 Google RE2 构建首层正则包，为后续模块迁移铺路，P3 特性。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/158717) |
| #155043 | fix(tools)：技能锁仅在针对技能本身时拒绝内联代码 | 修复技能锁守卫过度拦截读取锁定技能或写入无关检出的内联代码，P2 安全修复。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/155043) |
| #151463 | fix(cli)：接受幽灵文本建议的 Right、Ctrl+E、Ctrl+F 键 | 经典 CLI 幽灵文本仅支持 Tab 接受，现补全 prompt_toolkit 绑定的接受键，P2 体验修复。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/151463) |
| #159030 | fix(acp)：移除不支持的 deny-always 选项 | 与 Issue #159031 配套，移除承诺“永久拒绝”但实际仅一次性拒绝的选项，P2 修复。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/159030) |
| #159026 | feat(voice)：可选 GPT-Live 待机（wake_policy + idle_timeout_s） | 实现 Issue #158311，默认关闭，通过 `voice.gpt_live.standby_idle_seconds` 启用，P3 语音特性。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/159026) |
| #159032 | fix(browser)：持久用户数据目录跨轮次保留登录态 | 修复 Chromium 被 SIGTERM 后 Cookie 丢失，以及用户数据目录未正确持久化的问题，P2 修复。 | OPEN | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/159032) |

---

## 5. 功能需求趋势

从本周全部 Issues 中提炼，社区最关注的功能方向如下：

1. **主动代理与调度**  
   如 #158289，用户期待 Hermes 能主动识别行程、习惯及欠回复事项，并自主建立调度任务，体现“主动助手”而非“被动响应”的产品方向。

2. **语音/实时对话成本优化**  
   #158311 与配套 PR #159026 显示，社区对 OpenAI GPT-Live 待机（standby）功能需求强烈，希望通过 `wake_policy` + `idle_timeout_s` 按闲置时长按待机费率计费，降低长时语音会话成本。

3. **技能与插件生命周期管理**  
   #158947（Dashboard 删除本地技能）、#159021（加入 Rock Foundry 插件目录）表明，用户希望在 Dashboard 层面获得更完整的技能/插件增删改查能力，而不仅依赖后台工具。

4. **外部记忆与会话持久化**  
   #85135（外部记忆预取超时可配置）、#114935（桌面本地存储保留策略）、#151521（会话日志归档到 Obsidian）均指向对长期记忆、会话数据留存与

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报
**日期**: 2026-11-23  
**数据来源**: github.com/openclaw/openclaw  

---

## 1. 今日速览

过去 24 小时 OpenClaw 仓库未发布新版本，但社区活跃度较高：13 个 Issue 和 50 个 PR 获得更新。核心关注点集中在 **macOS Gateway 安装与凭证迁移**、**Agent 会话状态/数据库竞争**、**本地模型 Token 估算偏差** 以及 **iOS 端会话展示重构** 等方面。多个 P0/P1 级问题尚未获得修复 PR，建议维护团队优先评估。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 核心内容 | 为何值得关注 | 链接 |
|---|------|-------------|----------|--------------|------|
| #201468 | macOS 启动警报在 Gateway schema 迁移失败时给出通用凭证恢复步骤 | P0, diamond lobster, ux-release-blocker | OpenClaw.app 比本地 Gateway 更新时，bundled CLI 拒绝前向 schema 迁移，导致启动时凭证准备失败 | P0 级用户体验阻塞问题，直接影响 macOS 用户首次启动体验 | https://github.com/openclaw/openclaw/issues/201468 |
| #203637 | Agent DB：保留会话 Actor 在压缩/轮次期间触发“执行准入已关闭”（UNAVAILABLE） | P1, silver shellfish, session-state, message-loss | 使用约 7 万事件（261 MB）的主存储运行 `sessions compact` 时，Agent DB 拒绝准入，可能导致消息丢失 | 涉及会话状态完整性与数据丢失风险，P1 级严重性 | https://github.com/openclaw/openclaw/issues/203637 |
| #130257 | Tasks 账本未记录委派 ACP 运行的代币或成本，子运行支出无法归属 | P2, diamond lobster, clawsweeper:bulk-filed | 父运行显示 $0.04，子运行实际花费 $14.14，成本无法追踪 | 涉及多代理任务的成本归属与计费透明度，社区已有 10 条讨论 | https://github.com/openclaw/openclaw/issues/130257 |
| #203594 | `estimatedPromptTokens` 每轮膨胀，偏离提供商报告值超 2 倍，上下文条反复跳动 | P2, silver shellfish, session-state, ux-friction | 本地 lmstudio / llama.cpp 模型下，UI 上下文条与实际提示词大小不一致 | 直接影响长上下文会话的可用性与用户信任度 | https://github.com/openclaw/openclaw/issues/203594 |
| #144063 | “Gateway 重启 config-patch 成功”通知在下次启动数小时后才发送，原因已过期 | P2, diamond lobster, maturity:stable, ux-friction | 配置补丁后通知延迟，且携带陈旧原因和 `doctor --non-interactive` 建议 | 稳定版（maturity:stable）上的通知机制缺陷，影响运维可观测性 | https://github.com/openclaw/openclaw/issues/144063 |
| #203793 | 功能请求：隐藏 picker 中 model_not_found 或未本地安装的模型 | P2, silver shellfish, auth-provider, ux-friction | 模型选择器持续展示首次请求即失败的模型，建议仅列出已安装的本地 llama.cpp 聊天模型 | 典型的 UX 摩擦点，社区对模型选择器体验改进需求强烈 | https://github.com/openclaw/openclaw/issues/203793 |
| #60398 | 家目录在外部 APFS 卷时，Gateway 安装报错 5 | P2, stale, silver shellfish, ux-friction | macOS `launchd` 无法在外部 APFS 卷上引导 LaunchAgent，导致 `gateway install` 失败 | 长期未解决（2026-04 创建）的安装兼容性问题，影响特定 macOS 配置用户 | https://github.com/openclaw/openclaw/issues/60398 |
| #197963 | Claude/Codex 配对 Mac 目录间歇性消失，伴随 NODE_INVOKE_FAILED | P2, silver shellfish, ux-friction | 2026.11.3 版本下，侧边栏配对 Mac 来源在可用与不可用之间切换 | 跨设备协作功能的稳定性问题，影响多 Mac 工作流 | https://github.com/openclaw/openclaw/issues/197963 |
| #188274 | Diagnostics：SQLite 慢事务 hold 误导，Worker 日志缺少时间戳 | P2, diamond lobster | 308/317 条慢事务日志并非主线程阻塞，且 Worker 日志缺少发射时间戳 | 影响性能问题的根因定位，诊断工具本身需要改进 | https://github.com/openclaw/openclaw/issues/188274 |
| #194345 | 2026.11.5-beta.1：SQLite 维护心跳在 `/proc/self/ns/pid` 缺失时拒绝准入 | P2, diamond lobster | Android DSHBox/PRoot 环境下 `/proc/self/ns/pid` 不存在，导致 heartbeat 拒绝准入 | 容器化/非标准 Linux 环境兼容性问题，影响 Android 部署场景 | https://github.com/openclaw/openclaw/issues/194345 |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态/优先级 | 功能或修复内容 | 链接 |
|---|------|-------------|----------------|------|
| #203830 | feat: 让 Agent 能回答关于 OpenClaw 自身的问题 | OPEN, docs, agents, size: M | 使 Agent 能够检索文档并回答“如何连接 Telegram”“Gateway 为什么无法启动”等关于 OpenClaw 自身的问题，解决 Agent 只知道 docs 文件夹位置却难以定位具体页面的问题 | https://github.com/openclaw/openclaw/pull/203830 |
| #203004 | fix: 从模型发送的 malformed tool 参数中恢复 | OPEN, docs, agents, size: M, P2 | 当 Anthropic Messages 流以 malformed tool-call 参数结束时，OpenClaw 可尝试回退或让模型修复调用，而非直接返回通用终端失败 | https://github.com/openclaw/openclaw/pull/203004 |
| #194430 | fix(gateway): 恢复并发管理工作区编辑后的访客任务 | OPEN, gateway, size: XL, P0 | 修复管理员与访客同时编辑同一文件时，托管沙箱对话卡住的问题；保留双方版本并解决后续轮次的冲突提示 | https://github.com/openclaw/openclaw/pull/194430 |
| #194275 | fix: 会话中止时跳过惰性终端子代理 | OPEN, gateway, agents, size: M, P2 | 会话范围停止时，为已完成且无剩余工作的子代理准备不可用存储，避免子代理在另一兄弟代理停止排水期间被错误保留 | https://github.com/openclaw/openclaw/pull/194275 |
| #202689 | fix: 将已关闭的自动化失败排除在 Inbox 之外 | OPEN, app: web-ui, gateway, scripts, size: XL, P2 | 修复浏览器存储满、多标签页同时关闭或暂停/重新启用自动化后，失败记录重新出现在 Inbox 中的问题 | https://github.com/openclaw/openclaw/pull/202689 |
| #203814 | fix: 手机上保持 Workboard 选中的看板和人员可读 | OPEN, app: web-ui, size: S, P2 | 修复手机端选择人员时看板名称被压缩为首字母的问题，确保看板名与人员筛选 ID 同时可见 | https://github.com/openclaw/openclaw/pull/203814 |
| #203704 | fix: 手机上读取或编辑技能时显示完整文件路径 | OPEN, app: web-ui, size: XS, P2 | 修复长文件路径拉伸技能对话框超出屏幕边缘，导致文件名末尾和文本区域右侧不可见的问题 | https://github.com/openclaw/openclaw/pull/203704 |
| #203827 | improve(ui): 圆化聊天消息的角落 | OPEN, app: web-ui, size: XS, P3 | 标准聊天视图中已发送消息的圆角更圆润，不改变内边距、文本换行或现有外观 | https://github.com/openclaw/openclaw/pull/203827 |
| #203815 | fix: 过滤 Workboard 标签时保持 Save 按钮位置 | OPEN, app: web-ui, size: S, P2 | 修复标签选择器打开时搜索导致菜单收缩，Save/Cancel 按钮随结果移动甚至超出可见区域的问题 | https://github.com/openclaw/openclaw/pull/203815 |
| #203832 | fix(release): 尊重对已取消验证步骤的显式接受 | OPEN, docs, scripts, size: S | 允许发布操作员在某个精确步骤上显式接受已取消的发布验证作业，而无需将取消视为通过测试 | https://github.com/openclaw/openclaw/pull/203832 |

---

## 5. 功能需求趋势

从本期 Issues 与 PR 中可观察到以下社区关注方向：

1. **本地模型与模型选择器体验**  
   多个 Issue 指向本地 llama.cpp / lmstudio 模型的支持不足：模型选择器展示不可用模型（#203793）、Token 估算与实际偏差大（#203594）。社区期望更精准的模型可用性检测与 Token 统计。

2. **Agent 自我修复与自省能力**  
   PR #203830 与 Issue #203784 均围绕“让 OpenClaw Agent 能够理解并修复 OpenClaw 自身”，体现社区对 Agent 自诊断、自愈能力的强烈需求。

3. **跨平台与容器化兼容性**  
   macOS 外部 APFS 卷安装失败（#60398）、Android `/proc/self/ns/pid` 缺失（#194345）表明非标准部署环境的适配仍是痛点。

4. **会话状态与数据一

:::
