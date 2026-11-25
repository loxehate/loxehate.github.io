---
title: "AI CLI 工具社区动态日报"
published: 2026-11-25
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-25

> 生成时间: 2026-11-25 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-25)

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单一对话助手”向“多模态、多代理、可扩展开发平台”演进的关键期。主流工具普遍进入稳定版迭代与 Alpha 预览并行阶段，社区核心诉求已从基础功能补全转向跨平台稳定性、会话状态管理与 MCP 生态集成。安全沙箱、子代理生命周期及跨平台兼容性成为各工具共同的技术瓶颈，而多账号管理、IDE 深度集成与协作权限细化则凸显企业级场景的渗透加速。整体呈现“功能丰富但稳定性亟待打磨”的成熟度分化格局。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues 更新数 | PR 更新数 | 24 小时 Release 情况 | 核心活跃领域 |
|------|------|--------------|-----------|---------------------|-------------|
| Claude Code | anthropics/claude-code | 50 条 | 1 个 | 无新版本 | 多账号管理、MCP 会话标识、macOS 稳定性、IDE 集成 |
| OpenAI Codex | openai/codex | 未明确总数（10+ 热点） | 10+ 个（多为自动化 bot） | rust-v0.172.0 稳定版；rust-v0.174.0-alpha.1~4 连续迭代 | 跨平台桌面端崩溃、沙箱网络权限、MCP 工具调用 |
| Gemini CLI | google-gemini/gemini-cli | 10+ 热点 | 10+ 个 | v0.72.0-preview.0；v0.71.1；v0.71.0-nightly | Subagent 稳定性、浏览器代理、AST 代码理解、A2A 安全 |
| OpenCode | anomalyco/opencode | 14 条 | 50 个 | 无新版本 | MCP 技能体系、TUI/桌面端体验、Windows 兼容性、无障碍访问 |
| Hermes | NousResearch/hermes-agent | 14 条 | 50 个 | v0.23.4（汇总 229 个 PR）；Canary 构建 | 网关会话压缩、插件并发注册、Slack Connect、桌面语音交互 |
| OpenClaw | openclaw/openclaw | 10+ 热点 | 10+ 个 | v2026.11.10-beta.3；v2026.11.8 稳定版 | 更新恢复机制、冷转录处理、跨会话协作权限、网关事件循环 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 0 | 0 | 无 | — |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 无 | — |

> 注：DeepSeek Reasonix 与 Deepseek Harness 过去 24 小时无社区活动，已处于低活跃或维护停滞状态。

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重合的需求：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|---------|---------|------------|
| **MCP 生态与安全增强** | Claude Code、OpenAI Codex、Gemini CLI、OpenCode、Hermes | 缺少会话标识符（#41836）、MCP 工具调用失败（#55550、#53136）、MCP OAuth 来源一致性（#30454）、私有网络证书信任（#60041、#60039）、A2A 路由认证（#30449） |
| **跨平台稳定性（Windows/macOS）** | OpenAI Codex、Claude Code、Gemini CLI、OpenCode | Windows 权限选择器消失（#62975）、网络策略不一致（#53278）、MessagePort 中断导致应用崩溃（#62901、#63217）、macOS 长提示词截断（#90910）、Office 插件秒级消失（#111275） |
| **子代理 / 会话状态管理** | Gemini CLI、OpenCode、Hermes、OpenClaw | 子代理状态误报（#22323）、Generalist agent 挂起（#21409）、子代理转录内存无界增长（#63360）、会话历史回放截断（#61189）、网关会话压缩与上下文窗口溢出（#145249） |
| **IDE 与编辑器深度集成** | Claude Code、OpenCode | VS Code 多根工作区支持（#36949）、TUI 屏幕阅读器无障碍（#54652）、桌面端交互细节打磨（#62898） |
| **项目与会话生命周期** | Claude Code、OpenClaw | 一键项目迁移命令（#96018）、会话自动归档无退出（#60043）、冷转录检索与 Doctor 诊断（#204970、#204968） |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 多账号身份管理、桌面端稳定性、IDE 集成 | 企业开发者、多租户团队、桌面端重度用户 | Electron/桌面端为主，强调账号隔离与 Office 生态集成 |
| **OpenAI Codex** | 跨平台桌面客户端、沙箱权限、MCP 工具链 | 个人开发者、跨 OS 用户、需要本地沙箱执行的场景 | Rust CLI + 桌面端，Alpha 迭代频繁，侧重终端与 GUI 双端同步 |
| **Gemini CLI** | Subagent 编排、浏览器代理、AST 代码理解、A2A 协议 | AI 原生应用开发者、复杂代理编排场景 | 原生 CLI 为核心，重点投入子代理生命周期与浏览器自动化 |
| **OpenCode** | MCP 技能体系、TUI 无障碍、子代理内存优化 | 终端原生开发者、无障碍访问需求用户、长会话用户 | Bun/Rust 混合栈，强调技能按需加载与终端 UI 性能 |
| **Hermes** | 网关会话压缩、插件生态、Slack Connect、桌面语音 | 企业协作团队、多平台消息集成用户、桌面插件开发者 | 网关架构为核心，侧重会话持久化、插件运行时与跨平台消息桥接 |
| **OpenClaw** | 更新恢复机制、冷存储、跨会话协作权限 | 知识工作者、长期会话用户、多参与者协作团队 | 数据库驱动的会话状态，强调更新回滚与冷热数据分层访问 |

## 5. 社区热度与成熟度

- **高活跃、快速迭代**：OpenCode（50 条 PR 更新）、Hermes（50 条 PR 更新、v0.23.4 汇总 229 个 PR）、OpenAI Codex（多个 Alpha 版本连续发布）。这三类工具处于功能扩张期，版本迭代频繁，但随之而来的是跨平台回归 Bug 集中爆发。
- **中等活跃、稳定打磨**：Claude Code（50 条 Issue 更新，但仅 1 个 PR，无新版本）、Gemini CLI（多版本并行，安全补丁密集）、OpenClaw（beta.3 稳定性修复为主）。社区关注度高，但更多集中在 Bug 修复与稳定性回归，而非大规模新功能合并。
- **低活跃/停滞**：DeepSeek Reasonix、Deepseek Harness（过去 24 小时无任何活动），可能已进入维护期或社区转移。

## 6. 值得关注的趋势信号

1. **MCP 正从“协议规范”转向“生态基础设施”**  
   Claude Code、OpenAI Codex、Gemini CLI、OpenCode、Hermes 均在围绕 MCP 进行安全加固（OAuth 来源一致性、私有网络证书信任、A2A 路由认证）和会话标识增强。开发者应将 MCP 视为 AI 工具链的标准接入层，优先评估自身工具与 MCP 服务器的兼容性。

2. **子代理与会话状态管理成为稳定性瓶颈**  
   Gemini CLI、OpenCode、Hermes、OpenClaw 均出现子代理挂起、状态误报、内存无界增长等问题。长时间运行的多代理会话已成为常态，状态持久化与资源清理机制将是下一代 CLI 工具的核心竞争力。

3. **桌面端与终端端的“双端同步”压力增大**  
   OpenAI Codex、Claude Code、Gemini CLI 均出现桌面客户端崩溃、MessagePort 中断、跨平台沙箱权限不一致等问题。纯终端工具向桌面 GUI 延伸的过程中，IPC 通信稳定性与原生平台适配成为关键短板。

4. **企业级协作与多租户需求开始渗透 CLI 领域**  
   Claude Code 的多账号管理（#18435，1106 点赞）、OpenClaw 的会话邀请与参与者权限（#204920 系列 PR）、Hermes 的 Slack Connect 适配，表明 AI CLI 工具正从个人效率工具向团队协作平台演进，细粒度权限与会话共享将成为差异化卖点。

5. **无障碍访问（a11y）与长会话体验提升至产品优先级**  
   OpenCode 多个与屏幕阅读器相关的 Issue 和 PR 已获合并，反映开发者社区对可访问性的重视正在提升。对于面向企业和长时开发场景的工具，a11y 不再是可选特性，而是合规与用户体验的基线。

**决策建议**：若选型偏向稳定性与企业集成，Claude Code 与 OpenClaw 的当前修复节奏更宜谨慎观察；若需要前沿代理编排与多平台实验，OpenAI Codex、Gemini CLI 和 OpenCode 的快速迭代更具吸引力，但需预留更多适配与回归测试成本。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-25）

## 1. 热门 Skills 排行

基于 PR 更新频率、社区讨论持续度及功能覆盖面，以下为当前关注度最高的 8 个 Skills 相关 PR：

| 排名 | PR | Skill 名称 | 功能简述 | 状态 | 链接 |
|------|-----|-----------|---------|------|------|
| 1 | #1742 | **mcp-builder** | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入变更及自定义 HTTP 头配置，解决 MCP 连接脚本兼容性问题 | OPEN | https://github.com/anthropics/skills/pull/1742 |
| 2 | #1298 | **skill-creator** | 修复触发评估（trigger evals）误报问题，解决 Windows 下 `select()` 管道失效及运行时失败误判为非触发的问题 | OPEN | https://github.com/anthropics/skills/pull/1298 |
| 3 | #1245 | **notion-spec-to-implementation / quantitative-resume-auditor** | 前者将 Notion 产品/技术规格拆解为可执行的 Claude Code 任务与验收标准；后者用于简历定量审计 | OPEN | https://github.com/anthropics/skills/pull/1245 |
| 4 | #1980 | **webapp-testing** | 移除 `with_server.py` 中 `shell=True` 的不安全子进程调用，修复命令注入风险（CWE-78） | OPEN | https://github.com/anthropics/skills/pull/1980 |
| 5 | #1792 | **docx** | 修复 LibreOffice 超时时误报成功，新增对 DOCX 修订痕迹（`w:ins`/`w:del` 等）的输出验证 | OPEN | https://github.com/anthropics/skills/pull/1792 |
| 6 | #1771 | **proofcore-contract-auditor** | Web3 方向：对 Solidity/Rust 智能合约进行静态分析，并将审计证明锚定至 TON 区块链 | OPEN | https://github.com/anthropics/skills/pull/1771 |
| 7 | #1703 | **md2video-audio** | 零成本将 Markdown 文档编译为带真人感语音的 MP4 视频（基于 Marp 幻灯片） | OPEN | https://github.com/anthropics/skills/pull/1703 |
| 8 | #525 | **pyxel** | 复古游戏开发技能，涵盖 Pyxel 实现指导、无头输入驱动运行、帧检测与状态验证 | OPEN | https://github.com/anthropics/skills/pull/525 |

> **注意**：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。社区讨论集中在 MCP 协议兼容、技能创建器可靠性、文档/办公自动化（Notion/Docx/Xlsx）以及 Web3 合约审计等领域。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区目前最期待的新 Skill 方向与改进诉求如下：

### 核心需求方向
1. **工作流自动化与企业协作**
   - 组织内技能共享（Issue #228）：期待在 Claude.ai 内直接实现组织级技能共享，避免手动下载/上传 `.skill` 文件。
   - Notion 规格转实现（PR #1245）：产品规格到可执行任务的自动化拆解需求强烈。

2. **代码质量与安全审计**
   - 智能合约审计（PR #1771）：Solidity/Rust 静态分析 + 区块链存证。
   - Agent 治理与安全模式（Issue #412）：策略执行、威胁检测、审计追踪。
   - 文档技能质量控制（Issue #1487）：`claude-api` 技能一次注入 ~156k token 导致上下文窗口耗尽，亟需按需注入/懒加载机制。

3. **测试与评估工具链**
   - 技能触发评估可靠性（Issue #556、#1352）：`run_eval.py` 触发率为 0%、多 worker 下 UUID 交叉匹配导致假阴性，社区高度关注评估工具链的稳定性。
   - 技能创建器最佳实践（Issue #202）：`skill-creator` 过于偏向开发者文档，缺乏可执行的操作指南。

4. **文档与办公自动化**
   - DOCX/Xlsx/PPTX 系列技能的稳定性修复（PR #1792、#2019、#1975）：批注检测、外部链接解析、缩略图参数校验等。
   - 排版质量控制（PR #514）：AI 生成文档的孤行、孤段、编号对齐等排版问题。

5. **跨平台与账户管理**
   - 账户邮箱变更（Issue #1143，👍20）：防止工作区数据丢失，与竞品（OpenAI Codex）功能对齐。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且修复了明确的痛点，可能近期落地：

| PR | 技能/模块 | 关键价值 | 状态 | 链接 |
|-----|-----------|---------|------|------|
| #1681 | **skill-creator** | 修复 `package_skill.py` 直接执行失败及过时的 CLI 路径引用，降低社区贡献新技能的门槛 | OPEN（最近更新 2026-11-19） | https://github.com/anthropics/skills/pull/1681 |
| #1950 | **claude-api** | 更新 Python `pause_turn` 运行器指导，适配 Python SDK 1.1.0 自动恢复特性，避免不必要的外层重启循环 | OPEN（最近更新 2026-11-10） | https://github.com/anthropics/skills/pull/1950 |
| #2019 | **xlsx** | 修复工作表级定义名称与外部链接别名的误报，提升 Excel 公式分析准确性 | OPEN（最近更新 2026-11-03） | https://github.com/anthropics/skills/pull/2019 |
| #1742 | **mcp-builder** | 适配 `mcp>=2.0.0` 协议变更，是 MCP 技能继续可用的前提 | OPEN（最近更新 2026-10-08） | https://github.com/anthropics/skills/pull/1742 |
| #1298 | **skill-creator** | 修复跨平台触发评估失效，直接影响新技能的质量把关能力 | OPEN（最近更新 2026-09-16） | https://github.com/anthropics/skills/pull/1298 |

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在构建垂直领域自动化技能（办公文档、Web3 审计、MCP 集成）的同时，亟需通过修复技能创建器与触发评估工具链来保障社区贡献的质量与可信度，并解决组织内技能共享与上下文窗口管理等平台级瓶颈。**

---

# Claude Code 社区动态日报 (2026-11-25)

## 今日速览

过去24小时内，Claude Code 仓库未发布新版本，但社区活跃度保持高位，共50条Issue获得更新。核心关注点集中在**多账号管理**、**MCP会话标识缺失**、**macOS平台稳定性**以及**IDE集成体验**四个方向。值得注意的是，多个长期悬而未决的高赞Issue（如#18435多账号切换、#36949 VS Code多根工作区支持）持续获得社区关注，反映开发者对跨平台工作流和账号管理的强烈需求。

## 版本发布

过去24小时内无新版本发布。

## 社区热点 Issues

以下10个Issue基于评论数、点赞数及社区影响力筛选，代表了当前社区最活跃的讨论方向：

| # | 标题 | 状态 | 评论/👍 | 核心关注点 | 链接 |
|---|------|------|---------|-----------|------|
| #18435 | [FEATURE] Add the ability to manage multiple Claude accounts within the Claude Desktop app | OPEN | 254 / 1106 | **最高关注度**：多账号管理与配置切换，涉及auth与desktop领域，社区长期期待的企业/个人多身份切换能力 | https://github.com/anthropics/claude-code/issues/18435 |
| #111275 | [BUG] Claude for Microsoft 365 Office add-in vanishes seconds after install on macOS | OPEN | 25 / 5 | **回归bug**：macOS上Office插件安装后秒级消失，疑与Claude Desktop/Cowork Office会话冲突相关，影响企业办公集成场景 | https://github.com/anthropics/claude-code/issues/111275 |
| #41836 | No session/conversation identifier sent to MCP servers | OPEN | 20 / 42 | **MCP架构缺陷**：HTTP MCP服务器无法区分并发会话，导致无法维护服务器端每会话状态，阻碍MCP生态复杂应用开发 | https://github.com/anthropics/claude-code/issues/41836 |
| #36949 | Add claudeCode.workingDirectory VS Code setting for multi-root workspaces | OPEN | 7 / 67 | **IDE集成**：VS Code多根工作区下缺少工作目录配置，高点赞数反映开发者对多项目并行开发支持的需求 | https://github.com/anthropics/claude-code/issues/36949 |
| #90910 | [BUG] Long prompt silently truncated from the start on macOS/Warp | OPEN | 9 / 1 | **输入可靠性**：macOS/Warp终端下长提示词被静默截断（762/2211字符），发生在单词中间，影响复杂任务提交 | https://github.com/anthropics/claude-code/issues/90910 |
| #96018 | [FEATURE] `claude project mv` — one command to re-point a project's state | OPEN | 8 / 4 | **项目管理**：项目目录移动后缺乏一键迁移命令（转录、内存、提示历史、会话注册表、配置文件），影响本地开发工作流 | https://github.com/anthropics/claude-code/issues/96018 |
| #94564 | Invoked skill not re-attached after manual /compact | OPEN | 7 / 3 | **核心功能缺陷**：手动/compact后技能未重新附加，仅摘要改写存活，违背技能文档预期行为，影响上下文压缩场景 | https://github.com/anthropics/claude-code/issues/94564 |
| #60043 | Long working sessions auto-archive mid-conversation; no opt-out | CLOSED | 10 / 6 | **会话管理**：长时间工作会话被自动归档且无退出选项，中断开发者连续编码流程，社区持续讨论替代方案 | https://github.com/anthropics/claude-code/issues/60043 |
| #92158 | Desktop app: local-agent-mode task sandboxes never get cleaned up | OPEN | 4 / 0 | **资源泄漏**：Cowork模式下本地代理任务沙箱（~300MB/个）未清理，导致磁盘每日填满，影响桌面应用长期稳定性 | https://github.com/anthropics/claude-code/issues/92158 |
| #82846 | [BUG] Leading whitespace stops a slash command being dispatched | CLOSED | 5 / 0 | **交互体验**：TUI中前导空格导致斜杠命令被发送给模型而非触发，已复现，影响命令行操作习惯 | https://github.com/anthropics/claude-code/issues/82846 |

## 重要 PR 进展

过去24小时内仅有 **1个Pull Request** 更新，社区代码贡献相对平静：

| # | 标题 | 作者 | 状态 | 更新时间 | 说明 | 链接 |
|---|------|------|------|----------|------|------|
| #45553 | resolve duplicate IPs | @johnkohler00 | CLOSED | 2026-11-24 | 解决重复IP问题，具体变更详情未披露，可能涉及网络连接或代理配置修复 | https://github.com/anthropics/claude-code/pull/45553 |

> 注：过去24小时内仓库仅记录到上述1条PR更新，未出现新功能合并或重大架构变更。

## 功能需求趋势

从近期Issue中可提炼出以下社区最关注的功能方向：

1. **多账号与身份管理**：#18435 的高评论数（254条）和点赞（1106个）表明，开发者强烈希望在Claude Desktop中实现多账号切换与配置隔离，以支持个人/工作账号分离或多租户场景。
2. **MCP协议增强**：#41836 指出MCP服务器缺少会话标识符，社区期待在HTTP MCP连接中引入会话ID，以支持服务器端维护并发对话状态，这是构建复杂MCP应用的基础能力。
3. **IDE与编辑器集成深化**：#36949（VS Code多根工作区）、#99355（VS Code会话标签页）等反映开发者希望Claude Code在IDE中更好地适配多项目、多会话并行的开发模式。
4. **项目与会话生命周期管理**：#96018（`claude project mv`）、#60043（会话自动归档）显示开发者需要更灵活的项目目录迁移和会话存档控制能力。
5. **跨平台稳定性**：macOS、Windows、Linux平台上的TUI截断、插件消失、沙箱未清理等问题集中暴露，社区对桌面端和终端端的稳定性要求提升。

## 开发者关注点

开发者反馈中的核心痛点与高频需求包括：

- **会话与上下文管理**：长会话自动归档无法退出（#60043）、技能在/compact后未重新附加（#94564）、嵌套子代理回复路由错误（#111841），均指向会话状态管理和上下文压缩机制的可靠性问题。
- **桌面端资源与稳定性**：本地代理任务沙箱未清理导致磁盘填满（#92158）、Office插件在macOS上安装后秒级消失（#111275）、远程控制会话未标记未读（#96222），反映桌面应用在资源清理和跨平台兼容性上的不足。
- **输入与命令交互**：长提示词静默截断（#90910）、前导空格阻断斜杠命令（#82846）、云端停止钩子对未跟踪文件的误报（#103869），影响日常命令行操作体验。
- **认证与集成状态同步**：MCP连接器错误报告“需认证”且无法通过重新授权清除（#101509）、远程控制会话因缺少scope后无法从UI重连（#95001），开发者期待更透明的认证状态机和恢复机制。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-25  
**数据来源**: github.com/openai/codex  

---

## 1. 今日速览

Codex 社区近24小时活跃度较高，Rust CLI 连续发布多个 0.174.0-alpha 迭代版本，并推送了 0.172.0 稳定版新特性（会话链跳转、斜杠命令 Tab 补全等）。与此同时，GitHub Issues 侧集中爆发了多个跨平台客户端崩溃与沙箱权限问题，尤其是 Windows 和 macOS 桌面端的 `MessagePort` 连接中断、网络访问配置失效以及 MCP 工具调用异常，成为开发者关注的核心痛点。

---

## 2. 版本发布

过去24小时内，Codex Rust 端发布了以下版本：

| 版本 | 类型 | 更新说明 |
|------|------|----------|
| **rust-v0.172.0** | 稳定版 | 新增从搜索结果和转录中关注线程链接，以在终端中打开保存的对话和嵌套代理（#62332）；支持按 `Tab` 补全受支持斜杠命令的参数（如 `/mcp lo` → `/mcp login`）（#62343）；支持任务组间跳转。 |
| rust-v0.174.0-alpha.4 | Alpha | 迭代发布，未附详细变更说明。 |
| rust-v0.174.0-alpha.3 | Alpha | 迭代发布，未附详细变更说明。 |
| rust-v0.174.0-alpha.2 | Alpha | 迭代发布，未附详细变更说明。 |
| rust-v0.174.0-alpha.1 | Alpha | 迭代发布，未附详细变更说明。 |
| rust-v0.173.0-alpha.5 | Alpha | 迭代发布，未附详细变更说明。 |

> 注：0.174.0 系列为连续 Alpha 迭代，建议生产环境优先关注 0.172.0 稳定版。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区讨论热度（评论数、点赞数）及问题影响范围筛选：

1. **[#62212](https://github.com/openai/codex/issues/62212) — Codex 桌面端：不支持的音频工具输出导致后续纯文本轮次返回 HTTP 400**  
   - 评论 34 / 点赞 8 | 状态：Open  
   - 重要性：涉及多模态工具输出与后续对话状态的兼容性，影响 macOS 桌面端使用 GPT-6.2 Sol 的用户。  
   - 社区反应：讨论集中在音频工具调用后会话状态污染，需修复工具输出类型校验。

2. **[#62975](https://github.com/openai/codex/issues/62975) — [Windows] 发送首条消息后权限选择器消失；Work 强制 Cloud/TPP，无 Local 选项**  
   - 评论 27 / 点赞 10 | 状态：Open  
   - 重要性：Windows 桌面端核心权限交互异常，直接阻断本地工作区模式使用。  
   - 社区反应：Pro 订阅用户反馈强烈，涉及订阅层级与本地沙箱选项的逻辑冲突。

3. **[#53278](https://github.com/openai/codex/issues/53278) — Codex Desktop on Windows 尽管启用网络访问，仍应用 networkAccess=false**  
   - 评论 23 / 点赞 3 | 状态：Open  
   - 重要性：沙箱网络配置未生效，影响需要联网的开发工具链。  
   - 社区反应：持续跟踪超过一个月，Windows 环境下网络策略不一致。

4. **[#62901](https://github.com/openai/codex/issues/62901) — [Windows] 发送消息时 ChatGPT 桌面应用关闭并重新打开（Peer closed MessagePort connection）**  
   - 评论 16 | 状态：Open  
   - 重要性：主进程 JavaScript 错误导致应用崩溃重启，影响新旧对话均不可用。  
   - 社区反应：多用户确认在 26.1117 版本上复现，属严重回归。

5. **[#62967](https://github.com/openai/codex/issues/62967) — [macOS] Local Work 忽略启用的网络访问设置，强制 CODEX_SANDBOX_NETWORK_DISABLED=1**  
   - 评论 11 / 点赞 4 | 状态：Open  
   - 重要性：macOS 桌面端本地工作区网络设置被覆盖，与用户意图违背。  
   - 社区反应：Apple Silicon 用户反馈集中，涉及沙箱环境变量优先级问题。

6. **[#63217](https://github.com/openai/codex/issues/63217) — macOS 桌面端：发送按钮禁用，26.1117.41037 出现 “Peer closed MessagePort connection”**  
   - 评论 10 | 状态：Open  
   - 重要性：与 #62901 同类崩溃，但发生在 macOS Apple Silicon 设备上，说明跨平台存在 IPC 通信不稳定。  
   - 社区反应：新报告，用户无法可靠打开现有对话或发起新对话。

7. **[#63249](https://github.com/openai/codex/issues/63249) — [macOS] ChatGPT 桌面端在 Screens 虚拟显示变更时于 CFUUIDCreateString 崩溃**  
   - 评论 10 / 点赞 1 | 状态：Open  
   - 重要性：与多显示器/虚拟显示切换相关的原生崩溃，影响 macOS 27.0.1 用户。  
   - 社区反应：涉及底层框架（Codex Framework 158.0.8127.37），需原生层修复。

8. **[#53136](https://github.com/openai/codex/issues/53136) — [Dots][macOS] 点号开头任务无法访问启用的本地 MCP 工具**  
   - 评论 9 / 点赞 7 | 状态：Open  
   - 重要性：MCP 工具链在特定任务命名规则下失效，影响本地插件生态。  
   - 社区反应：开发者对 MCP 本地集成的稳定性提出关切。

9. **[#55550](https://github.com/openai/codex/issues/55550) — [macOS][Work] Codex 聊天工具调用 MCP 失败（-32000），同一操作在 Codex 中成功**  
   - 评论 9 / 点赞 1 | 状态：Open  
   - 重要性：Work 模式与 Codex 模式在 MCP 权限路径上存在不一致。  
   - 社区反应：质疑是否为 intentional restriction 或兼容性问题。

10. **[#23442](https://github.com/openai/codex/issues/23442) — codex app-server 硬编码 SessionSource::VSCode，无 --session-source 标志**  
    - 评论 9 / 点赞 1 | 状态：Open  
    - 重要性：第三方主机嵌入 Codex 时无法自定义会话来源，限制扩展性。  
    - 社区反应：嵌入式场景开发者长期关注的 CLI 可配置性问题。

---

## 4. 重要 PR 进展（精选 10 条）

过去24小时内合并/关闭的 PR 多由 `copyberry[bot]` 自动化提交，主要集中在 TUI 稳定性、Guardian 沙箱审计、MCP/工具调用、状态栏与性能优化：

| PR | 标题 | 核心变更 |
|----|------|----------|
| [#63773](https://github.com/openai/codex/pull/63773) | Make Bazel Rust tests portable across Linux environments | 修复测试夹具对宿主 `python3` 路径和 Rust 构造函数参数的依赖，提升跨 Linux 环境可移植性。 |
| [#63770](https://github.com/openai/codex/pull/63770) | Include parent evidence in recorded Guardian reviews | 允许客户端向 `thread/guardian` 提供可选 `rootEvidence`，补全存档工作者转录中缺失的原始用户指令与助手上下文。 |
| [#63769](https://github.com/openai/codex/pull#63769) | Track additional context in conversation world state | 持久化渲染指纹和历史条目 ID，避免恢复对话时重复追加已存在的上下文。 |
| [#63767](https://github.com/openai/codex/pull/63767) | Stabilize code-mode panic and process metrics tests | 修复恐慌回溯格式化超过 RPC 截止时间导致的竞态，稳定代码模式指标测试。 |
| [#63766](https://github.com/openai/codex/pull/63766) | Support structured dynamic tool results in Code Mode | 动态工具请求声明 `supportedResultFormat: "structured"`，避免脚本需解析文本 JSON。 |
| [#63762](https://github.com/openai/codex/pull/63762) | Add a process-wide runtime for Statsig evaluations | 引入进程级 Statsig 运行时，支持读取本地特性门禁与动态配置，替代账号作用域决策。 |
| [#63758](https://github.com/openai/codex/pull/63758) | Search inline link labels in user messages | 搜索匹配改为使用内联 Markdown 链接标签而非链接目标，提升搜索片段准确性。 |
| [#63757](https://github.com/openai/codex/pull/63757) | Add whitespace preservation to status line text | 状态行文本节点新增 `preserveWhitespace` 属性，保留缩进与对齐。 |
| [#63755](https://github.com/openai/codex/pull/63755) | Support inline code in custom status lines | 状态行树新增 `code` 元素，支持命令等字面量的间距保留。 |
| [#63752](https://github.com/openai/codex/pull/63752) | Add vertical layouts to custom status lines | 新增 `col` 元素支持垂直堆叠子元素，可与 `row` 嵌套，增强终端 UI 布局能力。 |

---

## 5. 功能需求趋势

从 Issues 与 PR 中提炼，社区当前最关注的功能方向：

1.

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-25)

## 今日速览

Gemini CLI 近24小时发布了多个版本，包括 v0.72.0-preview.0 预览版和 v0.71.1 补丁版，重点修复了 `.gitignore` 嵌套否定模式处理、Windows 路径引用以及 A2A 服务器的身份验证安全问题。社区围绕 Subagent 稳定性、浏览器代理兼容性及工具调用安全展开广泛讨论，P1 级别的 Agent 挂起与状态误报问题成为当前最高优先级的修复目标。

---

## 版本发布

### v0.72.0-preview.0
- 修复 `dir/**` 模式下嵌套 `.gitignore` 否定规则的处理（@urielefrenvirtusa）
- 修复 Windows 平台下 IDE CLI 命令路径引用问题（@urielefrenvirtusa）
- 更新 v0.70.0 变更日志

### v0.71.1
- 将 v0.71.0 的补丁提取并发布为 v0.71.1（@gemini-cli-robot）

### v0.71.0-nightly.20261124.gaafdfdfb5
- **A2A 服务器安全加固**：强制执行 Bearer Token 认证，并对请求输入进行验证（@diegogodinezr）

[完整发布列表](https://github.com/google-gemini/gemini-cli/releases)

---

## 社区热点 Issues

以下选取近24小时更新活跃、优先级较高或社区关注度显著的 10 个 Issue：

| # | 标题 | 优先级 | 评论/👍 | 核心问题 | 链接 |
|---|------|--------|---------|----------|------|
| #22323 | Subagent recovery after MAX_TURNS 报告为 GOAL 成功，掩盖中断 | P1 | 14 / 2 | 子代理在达到最大轮次限制后仍返回 `status: "success"`，导致中断被隐藏 | [查看](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent 挂起 | P1 | 8 / 8 | 代理 defer 到通用代理后无限期挂起，甚至简单操作（如创建文件夹）也会卡住 | [查看](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | 通过零依赖 OS 沙箱利用模型 Bash 亲和力 | P2 | 9 / 1 | 增强模型对原生 POSIX 工具（grep/cat/sed/awk）的调用能力，同时保障安全 | [查看](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | 评估 AST 感知的文件读取、搜索和代码映射 | P2 | 7 / 1 | 探索基于 AST 的精确代码读取与导航，以减少 Token 浪费和误读 | [查看](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini 不足够使用技能和子代理 | P2 | 7 / 0 | 模型不会主动调用自定义技能和子代理，需要显式指令才能触发 | [查看](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #22267 | Browser Agent 忽略 settings.json 覆盖（如 maxTurns） | P2 | 5 / 0 | 浏览器代理未正确读取全局/项目级 settings.json 配置 | [查看](https://github.com/google-gemini/gemini-cli/issues/22267) |
| #21983 | Browser subagent 在 Wayland 下失败 | P1 | 4 / 1 | 浏览器子代理在 Wayland 显示服务器环境下无法正常工作 | [查看](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #24246 | 工具数量超过 128 个时遇到 400 错误 | P2 | 3 / 0 | 可用工具过多导致请求失败，需要更智能的工具作用域限制 | [查看](https://github.com/google-gemini/gemini-cli/issues/24246) |
| #22186 | get-shit-done 输出钩子导致崩溃 | P1 | 3 / 0 | 输出摘要打印时触发 CLI 崩溃 | [查看](https://github.com/google-gemini/gemini-cli/issues/22186) |
| #22741 | 允许本地代理后台运行 | P3 | 1 / 2 | 用户希望通过 Ctrl+B 将子代理发送到后台，支持非阻塞探索任务 | [查看](https://github.com/google-gemini/gemini-cli/issues/22741) |

---

## 重要 PR 进展

以下选取近24小时内创建或更新的 10 个重要 Pull Request：

| # | 标题 | 类型 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #30454 | fix(core): enforce origin consistency and display endpoint origin in MCP OAuth flow | P1 / 安全 | 强制执行 RFC 8414 第 3.3 节的颁发者匹配，并在 MCP OAuth 元数据发现中显示授权端点来源 | [查看](https://github.com/google-gemini/gemini-cli/pull/30454) |
| #30449 | fix(a2a-server): authenticate manually-mounted routes in the A2A server | 安全 | 修复 A2A 服务器中五条手动挂载路由缺乏身份验证的问题（如 `/tasks`、`/execute`） | [查看](https://github.com/google-gemini/gemini-cli/pull/30449) |
| #30453 | fix(core): unwrap shell wrappers and decompose AST before substitution and policy checks | P1 / 安全 | 加固 shell 包装器解包、命令替换检测与策略执行，防止绕过 `PolicyEngine` 规则 | [查看](https://github.com/google-gemini/gemini-cli/pull/30453) |
| #30451 | fix(core): inspect shell wrapper variants for command substitution and policy checks | 安全 | 硬化 shell 包装器检测，确保命令替换和被禁命令在包装调用中被一致强制执行 | [查看](https://github.com/google-gemini/gemini-cli/pull/30451) |
| #30448 | fix(core): normalize hook command names with leading environment variable assignments | 核心 | 修正带有内联环境变量赋值的 Hook 命令名规范化（如 `NODE_ENV=production node script.js`） | [查看](https://github.com/google-gemini/gemini-cli/pull/30448) |
| #30443 | fix(core): add per-request timeout to MCP OAuth discovery fetches | 核心 | 为 MCP OAuth 元数据获取添加每请求超时，避免主机不响应时阻塞长达 60 秒 | [查看](https://github.com/google-gemini/gemini-cli/pull/30443) |
| #30415 | fix(core): add a time limit to web search and stop retries on abort | P1 / Agent | 为 `google_web_search` 工具添加时间限制，并在中止时停止重试，解决工具调用无限挂起 | [查看](https://github.com/google-gemini/gemini-cli/pull/30415) |
| #30390 | fix(core): quote IDE CLI command path on Windows for cmd.exe | 核心 | 在 Windows 上引用 IDE CLI 路径，修复路径包含空格时 `/ide install` 失败的问题 | [查看](https://github.com/google-gemini/gemini-cli/pull/30390) |
| #30109 | fix(core): cap grep_search output size and tell the model to narrow broad searches | P2 / Agent | 限制 `grep_search` 输出大小，并提示模型缩小过宽的搜索范围，避免上下文溢出 | [查看](https://github.com/google-gemini/gemini-cli/pull/30109) |
| #30423 | chore(deps): bump the npm-dependencies group across 1 directory with 69 updates | 依赖 | 批量更新 69 个 npm 依赖，包括 simple-git、@octokit/rest 等 | [查看](https://github.com/google-gemini/gemini-cli/pull/30423) |

---

## 功能需求趋势

从近期 Issues 和 PR 中可以看出，社区开发者和维护者正在重点推动以下功能方向：

1. **子代理（Subagent）稳定性与可观测性**
   - 子代理在达到轮次上限后状态误报（#22323）、通用代理挂起（#21409）、子代理轨迹可见性（#22598）等问题反复出现，表明子代理生命周期管理是当前核心痛点。

2. **浏览器代理与跨平台兼容性**
   - 浏览器代理忽略配置覆盖（#22267）、Wayland 环境下失败（#21983）、会话接管与锁恢复（#22232），显示社区希望在不同操作系统和显示服务器上获得一致的浏览器自动化体验。

3. **代码理解与上下文优化**
   - AST 感知的文件读取、搜索和代码映射（#22745、#22746、#22747）、Tactful Extraction（#19561）、grep_search 输出限制（#30109），反映社区希望通过更精确的代码定位来降低 Token 消耗并提升检索质量。

4. **安全与策略执行**
   - Shell 包装器解包与命令替换检测（#30453、#30451）、MCP OAuth 来源一致性（#30454）、A2A 路由认证（#30449），安全加固成为近期 PR 的高频主题。

5. **本地代理与后台执行**
   - 允许本地代理后台运行（#22741）、持久化文件任务追踪（#18836），用户希望子代理支持非阻塞、可恢复的后台任务模式。

---

## 开发者关注点

### 高频痛点
- **Agent 挂起与状态不一致**：Generalist agent 无限挂起（#21409）和子代理状态误报（#22323）直接影响自动化任务的可靠性，社区对 P1 级 Bug 的修复进度关注度极高。
- **配置不生效**：Browser Agent 忽略 `settings.json` 覆盖（#22267）、Symlink 代理未被识别（#20079），配置层与 Agent 执行层之间存在断层。
- **工具调用失控**：`grep_search` 输出过大（#30109）、

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报
**日期**: 2026-11-25  
**数据来源**: github.com/anomalyco/opencode  

---

## 1. 今日速览

过去 24 小时 OpenCode 仓库未发布新版本，但社区活跃度保持高位：14 条 Issue 和 50 条 PR 更新集中在 TUI/桌面端体验、MCP 技能体系、Windows 兼容性及无障碍访问性四个方向。值得关注的是，多个与屏幕阅读器和会话内存占用相关的长期问题在 v2 版本中获得了修复进展。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 核心内容 | 关注理由 | 链接 |
|---|------|------|----------|----------|------|
| #64073 | [FEATURE]: Restore Foreground Subagent Execution | OPEN | 请求恢复前台子代理执行功能 | 评论数最多（27 条）、点赞 12，核心用户对子代理执行模式的变更反应强烈，涉及工作流重大调整 | [查看](https://github.com/anomalyco/opencode/issues/64073) |
| #48411 | [FEATURE]: Better execution permissions and sandboxing | OPEN | 改进执行权限和沙箱机制，包括权限模式更易访问 | 点赞 7，评论 14，安全与沙箱是 AI 代理工具的核心关切，社区讨论持续两个月 | [查看](https://github.com/anomalyco/opencode/issues/48411) |
| #61189 | Session history replay truncates after edit-and-resend | OPEN | 长会话（legacy schema）编辑重发消息后，会话历史回放截断，UI 停止渲染更早检查点 | 数据完整但 UI 渲染异常，影响长时间运行会话的可用性，评论 4 | [查看](https://github.com/anomalyco/opencode/issues/61189) |
| #66146 | skills: deleting a git worktree wipes project skills from shared registry | CLOSED | 删除包含 SKILL.md 的 git worktree 会导致共享服务重新扫描已删除目录，清空其他项目的技能注册表 | 插件/技能系统的严重 Bug，已在当日闭环，提醒用户注意 worktree 操作风险 | [查看](https://github.com/anomalyco/opencode/issues/66146) |
| #62898 | [FEATURE]: desktop: add emoji reactions to messages | CLOSED | 桌面端消息添加表情反应（👍 ❤️ 😂 🎉），实现低成本反馈 | 用户体验增强需求，已关闭，可能已纳入规划或拒绝 | [查看](https://github.com/anomalyco/opencode/issues/62898) |
| #66192 | scripts: path comparisons break on Windows | OPEN | Windows 下 `Bun.Glob` 返回平台分隔符，与硬编码 `/` 比较失败，导致 pre-push hook 和升级脚本异常 | 跨平台兼容性问题，影响 Windows 开发者的日常构建流程 | [查看](https://github.com/anomalyco/opencode/issues/66192) |
| #65883 | tui: idle terminal replaces the session environment | OPEN | 两个终端共享会话时，空闲终端的 shell 环境会覆盖发送提示的终端环境，工具运行变量错误 | macOS 平台 TUI 环境隔离 Bug，版本 2.3.2，影响多终端协作场景 | [查看](https://github.com/anomalyco/opencode/issues/65883) |
| #66203 | tui: Model variant becomes sticky after selecting any variant | CLOSED | TUI 中选择带推理变体的模型（如 `#high`）后，模型/变体选择器变得“粘滞”，无法切换 | TUI 交互 Bug，已关闭，影响模型切换体验 | [查看](https://github.com/anomalyco/opencode/issues/66203) |
| #63360 | tui: keeps every subagent's full transcript loaded | OPEN | 根会话运行数小时、100+ 子代理时，TUI 内存无界增长（685 MB → 815 MB） | 性能与内存泄漏类问题，直接影响长时间会话的稳定性 | [查看](https://github.com/anomalyco/opencode/issues/63360) |
| #54652 | bug(session-ui): V2 still hides streaming assistant content from screen readers | CLOSED | V2 正在生成时，屏幕阅读器无法访问可见的助手文本、推理和工具步骤 | 无障碍访问性（a11y）长期问题，已关闭，体现社区对可访问性的持续关注 | [查看](https://github.com/anomalyco/opencode/issues/54652) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #66201 | feat(core): load skills from MCP servers | OPEN | 新增对 MCP Skills 规范的支持，允许从 MCP 服务器加载技能，扩展技能来源 | [查看](https://github.com/anomalyco/opencode/pull/66201) |
| #60041 | feat(mcp): trust private-network server certificates on first use | OPEN | 实现私有网络 MCP 服务器自签名证书的首次使用信任流程，增强远程 MCP 安全性 | [查看](https://github.com/anomalyco/opencode/pull/60041) |
| #66204 | fix(client): store a session's messages only once its transcript is asked for | OPEN | 仅在请求会话转录时才存储消息，降低子代理会话内存占用（样本中 93% 增长来自子代理） | [查看](https://github.com/anomalyco/opencode/pull/66204) |
| #60039 | feat(mcp): support per-server TLS trust for remote MCP servers | OPEN | 为远程 MCP 服务器配置可选 `tls` 块，支持单服务器信任自签名/私有 CA 证书 | [查看](https://github.com/anomalyco/opencode/pull/60039) |
| #51084 | fix(session-ui): expose streaming assistant steps | CLOSED | 修复 V2 时间线渲染器中正在生成的助手行被 `aria-hidden` 隐藏的问题，改善屏幕阅读器体验 | [查看](https://github.com/anomalyco/opencode/pull/51084) |
| #66120 | fix(session-ui): stop hiding a working turn from screen readers | CLOSED | 覆盖新时间线渲染器，修复工作中的回合对屏幕阅读器不可见的问题（关联 #54652） | [查看](https://github.com/anomalyco/opencode/pull/66120) |
| #66168 | fix(app): order messages by transcript position, not IDs | OPEN | 修复消息按 ID 文本比较导致的回退（revert）后时间线空白或消息丢失问题 | [查看](https://github.com/anomalyco/opencode/pull/66168) |
| #66163 | feat(server): run above normal priority on Windows behind server_priority | OPEN | Windows 服务器主线程优先级提升，避免在繁忙机器上响应延迟 | [查看](https://github.com/anomalyco/opencode/pull/66163) |
| #66198 | fix(core): restore files from the reverted assistant message | OPEN | 撤销助手消息时，将选中消息的快照纳入文件恢复计划，避免文件编辑残留在磁盘上 | [查看](https://github.com/anomalyco/opencode/pull/66198) |
| #66197 | refactor(core): let skills load content on demand | CLOSED | 技能 SKILL.md 内容和虚拟文件按需加载，而非预先驻留内存，为技能系统优化奠定基础 | [查看](https://github.com/anomalyco/opencode/pull/66197) |

---

## 5. 功能需求趋势

从本日全部 Issues 和 PR 中提炼，社区最关注的功能方向如下：

1. **MCP 技能体系扩展**：多个 PR（#66201、#60041、#60039）围绕 MCP 服务器技能加载、TLS 信任和证书首次使用展开，表明社区正推动 OpenCode 向更开放的 MCP 生态靠拢。
2. **跨平台兼容性（尤其是 Windows）**：#66192（路径比较）、#66203（模型变体粘滞）、#66163（Windows 服务器优先级）集中暴露 Windows 下的细节缺陷，跨平台支持成为紧迫需求。
3. **无障碍访问性（a11y）**：#54652、#57512 及相关修复 PR（#51084、#66120）显示屏幕阅读器对流式内容的支持是持续关注点。
4. **子代理与会话内存管理**：#63360（子代理转录无界增长）、#66204（按需存储消息）反映用户在长时间、多子代理会话中对内存占用的担忧。
5. **桌面端交互增强**：#62898（表情反应）、#66200（插件面板常驻）、#66196（Ctrl+H 搜索最近关闭标签）指向桌面 GUI 体验的细节打磨。

---

## 6. 开发者关注点

**痛点与高频需求总结：**

- **子代理执行模式变更引发争议**：#64073 请求恢复前台子代理执行，获得 27 条评论和 12 个点赞，说明当前子代理后台/前台切换机制未完全符合部分重度用户的工作流预期。
- **安全与沙箱控制不足**：#48411 持续获得社区关注，用户希望权限模式更易访问，并加强执行沙箱，反映 AI 代理工具在本地执行代码时的安全顾虑。
- **长会话稳定性**：#61189（历史回放截断）和 #63360（内存无界增长）均指向长时间运行会话的鲁棒性问题，是 v2 版本需要重点优化的领域。
- **Windows 开发者体验亟待提升**：路径分隔符、模型选择器粘

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期**: 2026-11-25  
**数据来源**: github.com/NousResearch/hermes-agent

---

## 1. 今日速览

Hermes Agent 近期发布了补丁版本 **v0.23.4**（汇总自 v0.23.3 以来约 229 个 PR）及 Canary 构建 `canary.20261124T064706Z-v0.23.3`，社区目前集中关注网关会话压缩、插件提供商并发注册、Slack Connect 兼容性以及桌面端语音交互等核心问题。过去 24 小时内新增 14 条 Issue 和 50 条 PR 更新，其中多个与安全边界、会话状态和工具调用相关的修复 PR 已合并。

---

## 2. 版本发布

| 版本 | 发布时间 | 类型 | 更新摘要 |
|------|---------|------|---------|
| **v0.23.4** | 2026-11-23 | Patch | 将 v0.23.3 以来约 229 个 PR 汇总为稳定版，涵盖 CLI、安装程序、Microsoft Store 应用、Docker 和 Hermes Cloud。完整变更说明将随 v0.24.0 发布。 |
| **canary.20261124T064706Z-v0.23.3** | 2026-11-24 | Canary | 基于 v0.23.3 的 Canary 构建，面向早期采用者和持续集成场景。 |

> 📥 下载链接及平台支持详见 [GitHub Releases](https://github.com/NousResearch/hermes-agent/releases)

---

## 3. 社区热点 Issues（精选 10 条）

以下 Issue 按社区讨论活跃度与潜在影响力排序，均在过去 24 小时内有更新：

| # | 标题 | 核心内容 | 为何值得关注 | 链接 |
|---|------|---------|-------------|------|
| #143379 | RFC: THE DOC-CHAIN SUBSTRATE'S NETWORK | 探讨文档链底层网络的读取、治理与压缩机制，旨在让耐久记录在会话压缩后保留来源并可重读。 | 评论数最高（50 条），属于架构层面的长期 RFC，对 Hermes 持久化与上下文管理方向影响深远。 | [查看](https://github.com/NousResearch/hermes-agent/issues/143379) |
| #156709 | FooteredReply breaks copy.deepcopy in gateway/session_events.py | 启用 `display.runtime_footer.enabled` 后，网关发布完成事件时 `copy.deepcopy(payload)` 抛出 `TypeError: missing 'footer'`。 | 直接影响网关会话事件发布的稳定性，已有 13 条讨论，P2 优先级。 | [查看](https://github.com/NousResearch/hermes-agent/issues/156709) |
| #156660 | Messaging surfaces: show 💎 icon for Ruby tool calls | 聊天界面为 Python 工具调用显示 🐍 图标，但 Ruby 缺乏对应语言感知图标。 | 典型的 UI/UX 细节需求，体现社区对多语言工具调用可视化的关注。 | [查看](https://github.com/NousResearch/hermes-agent/issues/156660) |
| #156899 | Concurrent first lookup of a profile's provider plugin leaves it "Unknown provider" until restart | 长运行进程中，配置文件的提供商插件并发首次查找可能导致“未知提供商”，需重启才能恢复。 | 涉及插件系统并发安全与多 Profile 隔离，P2 优先级，已有 8 条讨论。 | [查看](https://github.com/NousResearch/hermes-agent/issues/156899) |
| #145249 | Gateway hygiene: full transcript sent past context window while summary in flight | 网关会话卫生摘要进行中时，后续轮次仍发送完整未压缩转录，导致提供商返回 HTTP 400。 | 直接导致对话中断，属于上下文压缩与网关卫生的核心缺陷。 | [查看](https://github.com/NousResearch/hermes-agent/issues/145249) |
| #159617 | Slack native task cards fall back to text for Slack Connect authors from another org | Slack Connect 跨组织作者触发 `chat.startStream` 返回 `user_not_found`，原生任务卡片降级为可编辑文本。 | 涉及跨组织协作场景的平台适配，影响企业级 Slack 集成可用性。 | [查看](https://github.com/NousResearch/hermes-agent/issues/159617) |
| #159689 | A tool with no parameters fails when the model sends `null` arguments | 无参数工具时，模型发送 `null` 而非 `{}` 导致 Hermes 拒绝调用。 | 工具调用参数校验边界问题，影响无参工具的可靠性。 | [查看](https://github.com/NousResearch/hermes-agent/issues/159689) |
| #144188 | Proposal: scoped native media surface and linked-player API for Desktop plugins | 桌面端插件需要可停靠、可弹出、支持全屏的原生媒体表面及链接播放器 API。 | 桌面插件生态扩展方向，涉及 HermesTV 等媒体类插件的原生能力需求。 | [查看](https://github.com/NousResearch/hermes-agent/issues/144188) |
| #143155 | Desktop Skills panel has no way to uninstall a hub-installed skill | 桌面技能面板仅提供启用/禁用开关，缺少卸载 hub 安装技能的入口，需通过终端手动移除。 | 桌面端技能管理体验缺口，影响普通用户的可用性。 | [查看](https://github.com/NousResearch/hermes-agent/issues/143155) |
| #159829 | Desktop voice conversation: separate "speak replies in voice chat" preference | 语音对话回复朗读与“Read replies aloud”开关强绑定，用户希望独立控制语音对话中的 TTS 行为。 | 桌面端语音交互配置细化需求，反映社区对多模态交互体验的优化诉求。 | [查看](https://github.com/NousResearch/hermes-agent/issues/159829) |

---

## 4. 重要 PR 进展（精选 10 条）

以下 PR 覆盖安全修复、会话状态、插件生态、桌面端及 MCP 等关键领域：

| # | 标题 | 类型 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #128104 | fix(gateway): gate bare-word approvals and slash-confirm replies on the slash admin policy | 安全 (P2) | 修复非管理员可通过输入 `yes`/`always` 绕过斜杠管理策略批准危险命令的问题，加强网关审计边界。 | [查看](https://github.com/NousResearch/hermes-agent/pull/128104) |
| #128103 | fix(agent): close a raw tool tail left by failed turns that skip the finalizer | Bug (P2) | 修复失败轮次跳过 `finalize_turn` 时遗留的原始工具结果尾部，影响截断退出、内容策略拒绝等场景。 | [查看](https://github.com/NousResearch/hermes-agent/pull/128103) |
| #128129 | fix(platform): keep IPv6 brackets when rebuilding a server_json endpoint | Bug (P2) | 修复 IPv6 回环地址重建端点时丢失方括号，导致 MCP 客户端无法连接 `http://[::1]:8765`。 | [查看](https://github.com/NousResearch/hermes-agent/pull/128129) |
| #128369 | fix(aux): scope auxiliary Anthropic 429 pool recovery to the failed model | Bug (P2) | 修复辅助 Anthropic 429 连接池恢复未指定失败模型，导致整个密钥被禁用长达一小时的问题。 | [查看](https://github.com/NousResearch/hermes-agent/pull/128369) |
| #129926 | fix(update): atomically renew desktop ownership marker | Bug (P2) | 桌面更新所有权标记改为原子化可续期声明，通过独占硬链接防止竞争条件。 | [查看](https://github.com/NousResearch/hermes-agent/pull/129926) |
| #131086 | chore(mcp): upgrade Python SDK to 2.2.0 | 依赖升级 (P3) | 将 Python MCP SDK 从 2.0.0 升级至 2.2.0，兼容现有 v2 API 客户端传输与 OAuth 适配器。 | [查看](https://github.com/NousResearch/hermes-agent/pull/131086) |
| #131088 | fix(pm): resolve plugin runtime workspaces for the host platform | Bug (P3) | 修复 macOS 上插件运行时工作区重锁时错误评估未选 extra 的 Android 分支导致的构建失败。 | [查看](https://github.com/NousResearch/hermes-agent/pull/131088) |
| #159826 | catalog: add decider delegation backend | 功能 (P3) | 向社区目录添加 `decider` 委派后端插件，作为自动路由器的独立目录条目发布。 | [查看](https://github.com/NousResearch/hermes-agent/pull/159826) |
| #159802 | fix(gateway): Desktop bot relay deliveries no longer rejected for their id | Bug (P2) | 修复桌面机器人中继投递因缺少 `id` 字段被网关返回 JSON-RPC 4000 错误的问题。 | [查看](https://github.com/NousResearch/hermes-agent/pull/159802) |
| #152168 | feat(desktop): introduce redesigned agent workspace with classic recovery | 功能 (P3) | 桌面端重新设计的 Agent 工作区集成分支，包含引导式上线与经典恢复路径，正在审核栈中。 | [查看](https://github.com/NousResearch/hermes-agent/pull/152168) |

---

## 5. 功能需求趋势

从近期 Issue 与 PR 中可提炼出以下社区关注方向：

1. **上下文压缩与会话卫生**  
   多个 Issue（如 #145249、#143379）围绕会话摘要、转录压缩及上下文窗口溢出展开，表明社区对长对话稳定性与持久化记忆的需求日益迫切。

2. **多语言工具调用可视化**  
   #156660 等需求显示，用户希望聊天界面能根据工具语言（Ruby、Python 等）显示差异化图标，提升工具调用的可读性。

3. **桌面端

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-25)

## 今日速览

OpenClaw 今日围绕 **v2026.11.10-beta.3** 的稳定性修复与 **v2026.11.8** 的后续问题排查展开。社区集中反馈了多个 P1/P2 级别的回归 Bug，核心集中在更新恢复机制、网关事件循环阻塞、冷转录（Cold Transcript）处理以及跨会话协作功能上。开发者正推进多个与“会话邀请与参与权限”相关的 PR 堆栈，试图在 Control UI 中落地细粒度的协作控制。

---

## 版本发布

### v2026.11.10-beta.3
- **更新恢复机制**：中断的包和源更新现在可恢复，包括跨架构更改或机器重启的场景（#200273、#200366、#200460、#200866、#200994、#201600，@fuller-stack-dev）。
- **可靠的委托工作**：部分相关改进已纳入，具体细节见完整发布说明。

### v2026.11.8（稳定版）
- 规模：314 commits · 210 PRs · 86 contributors。
- 该版本发布后，社区已陆续提交多个与更新回滚、Doctor 校验及冷存储相关的回归问题，后续修复集中在 beta.3 及后续补丁中。

[查看完整 Release 页面](https://github.com/openclaw/openclaw/releases)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 关注理由 | 链接 |
|---|------|------------|---------|------|
| #204931 | `[Bug] /stop 在活跃运行后面排队而非中断它` | P1, ux-friction | 用户在 Chat/CLI 通道输入 `/stop` 时，命令会排队等待当前运行结束，而非立即中断，影响交互响应。 | [链接](https://github.com/openclaw/openclaw/issues/204931) |
| #204834 | `[Bug] 更新到 2026.11.8 受阻：Doctor session.import.batch 拒绝有效冷转录` | P1, session-state, 回归 | 从 2026.11.6 更新时，Doctor 在冷存储转录上失败并回滚，阻断正常升级路径。 | [链接](https://github.com/openclaw/openclaw/issues/204834) |
| #204952 | `[Bug] 异步提供者发现和身份验证准备会同步阻塞网关事件循环（Windows beta.3）` | P1, crash-loop | Windows 平台下，Provider 发现与外部认证准备会同步占用网关主线程，导致健康检查和 WebSocket 心跳延迟。 | [链接](https://github.com/openclaw/openclaw/issues/204952) |
| #204746 | `[Bug] memory-core 做梦在 REM 阶段入驻时丢弃 Dream Diary 条目` | P2, session-state, diamond lobster | 短期回顾存储达到 512 条上限时，夜间扫描生成的 Dream Diary 叙事被丢弃，影响会话状态持久性。 | [链接](https://github.com/openclaw/openclaw/issues/204746) |
| #204975 | `Update failure: gateway-recovery-verification (2026.10.7)` | P2, 新创建 | 旧版本 2026.10.7 的网关恢复验证失败，涉及更新回滚路径的兼容性问题。 | [链接](https://github.com/openclaw/openclaw/issues/204975) |
| #204970 | `sessions search 无法访问冷转录，且排除逻辑被三重强制执行` | P2, session-state, diamond lobster | 启用冷存储后，超过 7 天的转录会静默退出文本搜索，检索覆盖度存在缺口。 | [链接](https://github.com/openclaw/openclaw/issues/204970) |
| #204968 | `Doctor 持续报告 historical_transcript_deferred（2026.11.8），且无确认方式` | P2, ux-friction, diamond lobster | macOS 环境下 Doctor 反复报告 546 个已不存在的归档转录延迟，缺乏确认/忽略机制，干扰日常诊断。 | [链接](https://github.com/openclaw/openclaw/issues/204968) |
| #204238 | `Beam-1.0 via OpenRouter: 400 'assistant turn at messages[2] is missing its reasoning'` | P1, auth-provider, diamond lobster | 2026.11.6/11.7 引入回归，OpenRouter 端要求 `reasoning_content`，但 OpenClaw 在准备下一请求时移除了该字段，导致单轮会话报错。 | [链接](https://github.com/openclaw/openclaw/issues/204238) |
| #204775 | `Design: prepared-release updates（状态、所有权和计划）` | P2, 需要产品决策 | 收集新更新路径的设计共识，明确各模块所有权，避免多人协作时对同一文件的设计冲突。 | [链接](https://github.com/openclaw/openclaw/issues/204775) |
| #197180 | `Feature: 将工作面板链接归类于 Workboard 导航项，而非顶层 Pages 条目` | P3, ux-friction | Control UI 导航优化需求，社区持续关注工作面板入口的层级组织方式。 | [链接](https://github.com/openclaw/openclaw/issues/197180) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型/优先级 | 功能或修复摘要 | 链接 |
|---|------|------------|--------------|------|
| #204977 | `fix: keep gateway responsive during async provider discovery` | Bug 修复 | 修复异步提供者发现与外部认证准备同步阻塞网关主线程的问题，关联 Issue #204952。 | [链接](https://github.com/openclaw/openclaw/pull/204977) |
| #204973 | `feat(macos): use the signed-in person's saved session pins` | 功能 | macOS 应用使用登录用户的已保存会话置顶，与 Web 侧边栏行为保持一致。 | [链接](https://github.com/openclaw/openclaw/pull/204973) |
| #204956 | `feat: allow rollback across compatible database changes` | 功能 | 允许在兼容的数据库变更间进行回滚，避免旧网关因新增可安全忽略的存储而拒绝打开状态。 | [链接](https://github.com/openclaw/openclaw/pull/204956) |
| #204957 | `fix: backport compatible database reader floors to 2026.11.15` | 修复/回港 | 将兼容数据库读取下限回港至 `release/2026.11.15` 稳定分支，提升旧版本对新状态的容忍度。 | [链接](https://github.com/openclaw/openclaw/pull/204957) |
| #204943 | `fix: release pressured background integrity readers` | Bug 修复 | 释放因检查点压力而被阻塞的后台完整性读取器，改善 SQLite 快照一致性。 | [链接](https://github.com/openclaw/openclaw/pull/204943) |
| #204920 | `feat: invitation, sharing and participant controls in the Control UI` | 功能（Part 6/6） | Control UI 中引入邀请、共享与参与者控制，完成会话协作功能的最后一环。 | [链接](https://github.com/openclaw/openclaw/pull/204920) |
| #204899 | `feat: let invited people read, suggest or send in your session within role limits` | 功能（Part 4/6） | 允许受邀人员在角色限制内读取、建议或发送会话内容，细化协作权限。 | [链接](https://github.com/openclaw/openclaw/pull/204899) |
| #204858 | `feat: send participant exec approvals to the session creator` | 功能（Part 3/6） | 参与者执行审批请求发送给会话创建者，强化会话安全边界。 | [链接](https://github.com/openclaw/openclaw/pull/204858) |
| #204950 | `fix: remove stray backticks from conversation previews` | Bug 修复 | 修复对话版本和会话预览中连续内联代码跨度后出现的多余反引号问题，关联 #204940。 | [链接](https://github.com/openclaw/openclaw/pull/204950) |
| #204925 | `fix: prevent false context overflow in fresh Knowledge chats` | Bug 修复 | 修复新建 Knowledge 对话在未开启工具搜索时，因工具 Schema 定价过高而误报上下文溢出的问题，关联 #204902。 | [链接](https://github.com/openclaw/openclaw/pull/204925) |

---

## 功能需求趋势

从近 24 小时的 Issues 和 PR 中可观察到以下社区关注方向：

1. **会话协作与权限细化**  
   一系列围绕 `#202552` 拆分的 PR（邀请、参与者限制、执行审批、共享发布）表明，社区正在推动 OpenClaw 从单用户工具向多参与者协作平台演进，Control UI 的权限模型成为核心需求。

2. **更新与回滚的可靠性**  
   多个 Issue 指向更新过程中 Doctor 校验失败、冷转录处理不当、跨架构更新中断等问题。社区对“可恢复更新”和“兼容数据库回滚”的需求明显，#204956 与 #204957 的回港工作也印证了这一点。

3. **冷存储与历史数据可访问性**  
   冷转录（Cold Transcript）在搜索、Doctor 诊断、Dream Diary 叙事中反复出现，用户希望归档数据不应被完全排除，而是应提供可控的访问与确认机制。

4. **跨平台与提供商兼容性**  
   Windows 网关事件循环阻塞、OpenRouter `reasoning_content` 回归、Flatpak 打包请求

:::
