---
title: "AI CLI 工具社区动态日报"
published: 2026-10-24
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-24

> 生成时间: 2026-10-24 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-10-24)

## 1. 生态全景

当前 AI CLI 工具正处于从“单一对话助手”向“可编排、可扩展的开发操作系统”演进的关键期。各主流工具普遍进入稳定版迭代与桌面端深水区，社区核心诉求已从功能新增转向跨平台可靠性、数据迁移安全与自动化边界管控。插件生态（Mods/Hooks/MCP）与 Agent-Client 协议（ACP）成为连接 IDE 与终端的共同技术底座，而 Windows 桌面端稳定性与长会话数据一致性则是行业共性痛点。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Issues 更新 | 今日 PR 更新 | 最新 Release | 核心版本状态 |
|------|------|------------------|--------------|--------------|--------------|
| Claude Code | anthropics/claude-code | 10 条精选（最高 269 评论） | 0 条 | v2.1.310 | 稳定版，无新 PR 合并 |
| OpenAI Codex | openai/codex | 10 条精选（最高 48 评论） | 10 条合并 | rust-v0.164.0 / v0.165.0-alpha | 稳定版 + Alpha 预览 |
| Gemini CLI | google-gemini/gemini-cli | 49 条更新 | 31 条更新 | v0.67.0-nightly | 夜间版快速迭代 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 10 条精选 | 20+ 条（精选 10） | Studio v2.50.0 / CLI v2.50.0 | 稳定版桌面端 |
| OpenCode | anomalyco/opencode | 14 条更新 | 50 条更新 | 无新版本 | v2.1.x 回归修复期 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 条 | 0 条 | v0.2.1-rc.3 | RC 候选版，活动低 |
| Hermes | NousResearch/hermes-agent | 10 条精选 | 10 条更新 | v0.22.5 | 补丁版本汇总 81 个 PR |
| OpenClaw | openclaw/openclaw | 6 条更新 | 50 条更新 | 无新版本 | Gateway 稳定性与 Web UI 打磨 |

**数据读取**：Gemini CLI、OpenCode、OpenClaw 的 PR 更新量最高（30–50 条/天），处于活跃代码合并期；Claude Code 和 Deepseek Harness 今日无 PR 合并，处于版本稳定窗口或发布间歇期。

## 3. 共同关注的功能方向

多个工具社区在以下维度上呈现高度共鸣：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|----------|----------|--------------|
| **跨平台桌面端稳定性（Windows 优先）** | Claude Code、OpenAI Codex、OpenCode | Windows 下 Cowork 挂载失败、组织设置加载失败、控制台进程闪烁、侧边栏不渲染等问题集中爆发，跨平台一致性成为首要改进点 |
| **数据迁移与向后兼容性** | OpenCode、Claude Code | v1→v2 会话消息丢失（#58543）、网关请求失败等迁移回归问题，用户期望无损升级 |
| **插件/扩展生态（Hooks/MCP/Mods）** | Claude Code、OpenAI Codex、Gemini CLI | 可扩展性提升 10 倍议题最高热（#91870）；MCP 工具权限、代理穿透、会话同步等集成需求频繁出现 |
| **自动化边界与数据安全** | Claude Code、OpenAI Codex、Gemini CLI | Auto 模式下未经请求的文件删除（#94453）、沙箱策略阻断无复审路径（#45403）、MCP 堆栈泄露（#39783），安全边界与审计机制受到高度关注 |
| **Agent 与子代理可靠性** | Gemini CLI、DeepSeek Reasonix | 子代理误报成功（#22323）、挂起（#21409）、思考后重复回复（#13702），长会话与多代理协作的稳定性是共同短板 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|----------|----------|--------------|
| **Claude Code** | 可扩展性（Mods/Hooks）、企业级网关监控（Bedrock/Vertex/Foundry） | 企业开发团队、高级脚本化用户 | 插件化架构，强调 Hook 机制与多云网关适配 |
| **OpenAI Codex** | CLI 工作流自动化（/presets、/model、/permissions）、事件驱动唤醒 | 重度 CLI 用户、自动化流程构建者 | Rust 核心，内联参数配置，侧重终端交互效率 |
| **Gemini CLI** | 子代理编排、ACP 协议、IDE 深度集成（VS Code/JetBrains/Zed） | AI 原生开发者、IDE 插件生态参与者 | Agent-Client Protocol，向 IDE 嵌入式终端延伸 |
| **DeepSeek Reasonix** | 桌面端工作台、子代理标签页、记忆管理、项目面板 | 桌面端 AI 助手用户、多项目并行开发者 | Electron/桌面端优先，强调 UI/UX 与可视化工作台 |
| **OpenCode** | TUI/WebSocket 细节、v1→v2 数据迁移、IDE 桥接（live-follow chip） | 终端原生开发者、开源社区贡献者 | TUI 优先，内容寻址存储（media_blob），按需加载媒体 |
| **Deepseek Harness** | 会话状态持久性、插件可发现性、多认证模式模型列表对齐 | 对话式 Agent 构建者、插件开发者 | 侧重会话草稿保存与插件入口统一 |
| **Hermes** | 统一网关（Unified Gateway）、MCP 信任门、跨平台消息平台（Slack/QQ/Discord） | 多平台机器人运维者、企业通信集成用户 | 网关架构汇总 81 个 PR，侧重跨平台消息路由与审计 |
| **OpenClaw** | Gateway 运维兜底（systemd Doctor）、Web UI 性能、插件热重载 | 自托管企业用户、运维团队 | 非容器化部署适配（bootc/rpm-ostree），强调系统级可靠性 |

## 5. 社区热度与成熟度

- **高热度、快速迭代**：Gemini CLI（49 Issues / 31 PR）、OpenCode（14 Issues / 50 PR）、OpenClaw（6 Issues / 50 PR）。这三类工具处于代码活跃合并期，适合早期采用者参与功能塑造，但也伴随更高的回归风险。
- **稳定版维护期**：Claude Code（v2.1.310，今日无 PR）、OpenAI Codex（rust-v0.164.0 稳定版 + Alpha）、DeepSeek Reasonix（v2.50.0）。功能相对成熟，社区讨论集中在具体 Bug 修复与细节打磨。
- **低活动/发布间歇期**：Deepseek Harness（今日 0 Issues / 0 PR，v0.2.1-rc.3）、Claude Code（今日无 PR 合并）。可能处于 RC 候选或重大版本间歇，适合评估生产环境引入。

## 6. 值得关注的趋势信号

1. **从“聊天界面”到“操作系统层”**：Claude Code 的 Mods、Gemini CLI 的 ACP、OpenCode 的 TUI+WebSocket 桥接，均指向 AI CLI 不再是独立终端工具，而是正在成为 IDE、浏览器与操作系统之间的中间层。开发者应关注协议层（MCP/ACP）的标准化进展。

2. **桌面端成为稳定性瓶颈**：Windows 与 macOS 桌面端的 Cowork 挂载、组织设置加载、控制台闪烁等问题在多个仓库高频出现，说明跨平台 GUI 渲染与原生集成是当前行业共性短板，桌面端可靠性将成为产品差异化关键。

3. **自动化安全边界亟待标准化**：Auto 模式下的文件删除、沙箱策略无复审路径、MCP 堆栈泄露等安全问题频发，企业用户对“无人值守场景下的可信度”要求提升。建议开发者在选型时重点评估工具的审计日志、权限回滚与数据留存策略。

4. **数据迁移成本成为采用门槛**：OpenCode v1→v2 消息丢失、Claude Code 网关兼容性问题表明，版本升级的无损迁移能力已成为企业级采购的重要考量因素。

5. **多模态与多平台消息集成兴起**：Hermes 在 Slack/QQ/Discord 等即时通讯平台上的深度集成，以及 OpenClaw 的 Web UI 体验优化，显示 AI CLI 正在向多入口、多通道的协作入口演进。

**对技术决策者的建议**：若追求功能前沿与社区参与度，可优先关注 Gemini CLI、OpenCode；若侧重生产环境稳定性与企业级网关能力，Claude Code 和 OpenAI Codex 的稳定版更为合适；若涉及自托管部署，OpenClaw 的 systemd 运维兜底能力值得关注。所有选型均应将“跨平台桌面端稳定性”与“数据迁移安全性”列为必测项。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-24）

## 1. 热门 Skills 排行

以下按社区关注度（PR 更新活跃度与讨论维度）排序，列出当前最受关注的 8 个 Skills PR：

| 排名 | PR | 功能简介 | 社区讨论热点 | 状态 | 链接 |
|------|------|---------|-------------|------|------|
| 1 | #1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills | 新增两个技能：将产品/技术规格拆解为可执行的 Notion 任务；定量简历审计与评分。 | 企业知识管理与人力资源自动化方向需求强烈；PR 长期未合并（创建于 6 月，10 月仍有更新），社区持续关注其落地进度。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 2 | #525 Add pyxel skill for retro game development | 基于 Pyxel 框架的复古游戏开发技能，涵盖实现、无头输入运行、帧检测与状态校验。 | 游戏开发垂直领域技能的代表性需求；创建于 3 月但长期悬而未决，显示社区对娱乐/创意类技能的持续期待。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| 3 | #1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers | 修复 `mcp-builder` 在 `mcp>=2.0.0` 下的导入路径变更与自定义 HTTP 头配置问题。 | MCP 协议版本迭代导致的兼容性问题是当前基础设施类技能的核心痛点，开发者关注度高。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 4 | #1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures | 修复 `skill-creator` 触发评估的误报/漏报，解决 Windows 子进程管道问题及运行时失败误判。 | 技能创建工具链本身的稳定性与跨平台支持是社区二级构建者关注的核心。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 5 | #1771 feat(skills): add proofcore-contract-auditor for smart contract notarization | Web3 智能合约静态审计技能，支持 Solidity/Rust，并将审计证明锚定至 TON 区块链。 | 区块链/智能合约安全审计是新兴垂直领域，体现社区对专业领域（Vertical）技能的扩展需求。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 6 | #1703 Add md2video-audio skill | 零成本将 Markdown 文档编译为带真人语音的 MP4 视频（基于 Marp 生成幻灯片）。 | 内容创作与多模态输出（文档→视频）的自动化需求，反映社区希望技能覆盖更丰富的交付形态。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1703) |
| 7 | #1792 fix(docx): report LibreOffice timeout as an error and verify the output | 修复 `docx` 技能中 LibreOffice 超时被误报为成功的问题，增加输出校验。 | 文档处理类技能的可靠性与错误处理是企业级文档自动化场景的关键关注点。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| 8 | #1681 fix(skill-creator): support direct execution of package_skill.py and update usage paths | 修复 `package_skill.py` 直接执行时的模块导入失败，更新过时的文档与 CLI 路径。 | 技能打包与分发工具的可用性直接影响社区技能贡献门槛。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1681) |

> **注意**：所有上述 PR 均处于 **OPEN** 状态，尚未合并入主分支，说明社区贡献的技能审核与合并周期较长。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进方向如下：

### 新 Skill 方向
1. **工作流自动化与企业协作**
   - 组织内技能共享（Issue #228）：期望在 Claude.ai 内直接实现 org-wide 技能共享，避免手动下载/上传 `.skill` 文件。
   - 记忆压缩与状态管理（Issue #1329）：提出 `compact-memory` 技能，用符号化表示压缩长期 Agent 状态，降低上下文开销。
   - 文档全生命周期管理：DOCX 孤立评论检测（Issue #1868）、ODT/OpenDocument 支持（PR #486）、排版质量控制（PR #514）。

2. **代码审查与安全治理**
   - 智能合约审计（PR #1771）：Solidity/Rust 静态分析 + 区块链存证。
   - Agent 治理模式（Issue #412）：策略执行、威胁检测、信任评分与审计追踪。
   - 技能质量与安全分析（Issue #83）：元技能用于评估其他技能的结构、文档与安全性。

3. **测试与评估工具链**
   - 技能触发评估可靠性（Issue #556）：`run_eval.py` 中 `claude -p` 无法触发技能，触发率为 0%，亟需修复。
   - 技能创建器最佳实践（Issue #202）：`skill-creator` 技能本身需更新为操作导向，而非开发者文档。

4. **文档与内容创作**
   - Markdown 转视频/音频（PR #1703）、字体排版质量控制（PR #514）、Notion 规格转实现（PR #1245）。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，且功能切合明确场景，可能在近期落地：

1. **#1245 notion-spec-to-implementation & quantitative-resume-auditor**  
   创建于 2026-06-02，截至 2026-10-15 仍有更新，社区对企业知识管理与 HR 自动化技能需求明确，合并概率较高。  
   [查看 PR](https://github.com/anthropics/skills/pull/1245)

2. **#1742 mcp-builder MCP 2.0 兼容性修复**  
   创建于 2026-09-08，10 月仍有活跃更新，修复的是官方基础设施技能的版本兼容性，属于高优先级修复。  
   [查看 PR](https://github.com/anthropics/skills/pull/1742)

3. **#1298 skill-creator 触发评估与 Windows 兼容性修复**  
   涉及技能创建工具链的核心稳定性，跨平台支持问题影响广泛，社区关注度持续。  
   [查看 PR](https://github.com/anthropics/skills/pull/1298)

4. **#1771 proofcore-contract-auditor**  
   Web3 智能合约审计技能，垂直领域明确，若审核通过将丰富安全类技能生态。  
   [查看 PR](https://github.com/anthropics/skills/pull/1771)

5. **#525 pyxel 复古游戏开发**  
   虽然悬而未决时间较长（3 月创建），但 10 月仍有更新，代表社区对创意/娱乐类技能的持续诉求。  
   [查看 PR](https://github.com/anthropics/skills/pull/525)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可靠、可共享、可跨平台运行的垂直领域技能，并修复技能创建与触发评估工具链的基础稳定性问题。**

---

# Claude Code 社区动态日报 (2026-10-24)

## 今日速览

Claude Code 发布 v2.1.310，新增 Bedrock、Vertex 与 Foundry 的 Monitor 工具及插件监控，并修复了部分网关下的请求失败问题。社区围绕可扩展性（Mods/Hooks）、Windows 平台稳定性及数据安全展开广泛讨论，其中“Mods 让 Claude 可扩展性提升 10 倍”议题以 269 条评论、131 个赞成为今日最高热度。过去 24 小时内无新 Pull Request 合并或更新。

---

## 版本发布

**v2.1.310**  
- 新增 Monitor 工具，并在 Bedrock、Vertex、Foundry 上线插件监控；当遥测或非必要流量被禁用时，长时间前台休眠也会被阻止。  
- 修复了部分网关及兼容服务器因拒绝 `effort-2025-` 相关请求而导致的请求失败问题。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 关注理由 |
|---|------|------|---------|----------|
| [#91870](https://github.com/anthropics/claude-code/issues/91870) | Mods - make Claude 10x more extensible | OPEN | 269 / 131 | 社区最高热度议题。围绕 Hooks 与 Plugins 的可扩展性展开，维护者已发布社区更新，正在快速响应反馈，预计将成为 Claude Code 生态的重要里程碑。 |
| [#93482](https://github.com/claude-code/issues/93482) | [BUG] Cowork: device_commit_files reports success on overwrites but on-disk content lags one commit behind | OPEN | 22 / 2 | Windows 平台数据一致性问题，涉及“静默过期写入”，对协作场景下的文件同步可靠性构成潜在风险。 |
| [#76187](https://github.com/claude-code/issues/76187) | [BUG] Cowork (Windows): project context folders never mount in new sessions | OPEN | 18 / 4 | 回归性 Bug，导致 Windows 上嵌套文件夹无法挂载，且会话中文件夹“掉线”，严重影响桌面端协作体验。 |
| [#104117](https://github.com/claude-code/issues/104117) | [BUG] Desktop Code tab: text written between tool calls is replaced by app-written summary | OPEN | 2 / 0 | 桌面端 UI 缺陷，工具调用之间输入的文本会被应用生成的摘要替换，导致问题与代码块丢失，直接影响编辑体验。 |
| [#94453](https://github.com/claude-code/issues/94453) | Unrequested `Remove-Item -Recurse -Force` permanently deleted user data in auto mode | OPEN | 2 / 0 | 高优先级数据丢失风险，Auto 模式下未经请求即执行递归强制删除，社区对自动化操作的安全边界高度敏感。 |
| [#102551](https://github.com/claude-code/issues/102551) | Artifact publish refuses every artifact-type instance | OPEN | 2 / 0 | Artifact 发布权限缺陷，所有者也无法发布 Design/Design System 类型画布，限制了团队协作中的设计资产共享。 |
| [#101096](https://github.com/claude-code/issues/101096) | [BUG] session.compact hook: N tool uses written as N assistant records, dropping N−1 results | OPEN | 1 / 0 | Hook 机制中的记录配对缺陷，会导致会话压缩时丢失大部分工具调用结果，对依赖 Hook 的自动化工作流影响较大。 |
| [#103836](https://github.com/claude-code/issues/103836) | [Bug] Assistant exceeds scope, breaks written rules, and misreports its own actions | OPEN | 1 / 0 | 模型行为越界并误报自身操作，引发对 Auto 模式下模型可信度与规则遵守的讨论。 |
| [#104730](https://github.com/claude-code/issues/104730) | [Bug] `pkill -f "vite" -U $(id -u)` on macOS kills Chromium/Electron apps | OPEN | 1 / 0 | macOS 下子代理误杀 Electron/Chromium 进程的 shell 命令缺陷，涉及沙箱与进程管理安全。 |
| [#82300](https://github.com/claude-code/issues/82300) | [FEATURE] Computer Use support in Claude Code CLI on Windows | OPEN | 1 / 2 | Windows 用户长期期待的 Computer Use 能力，反映社区对跨平台桌面自动化功能的强烈需求。 |

---

## 重要 PR 进展

过去 24 小时内 **Claude Code 仓库无 Pull Request 更新**（共 0 条）。  
建议开发者持续关注上述热点 Issue 的后续评论与维护者回复，许多高优先级 Bug（如数据丢失、Cowork 挂载、Artifact 发布）可能会在近期版本中通过快速补丁修复。

---

## 功能需求趋势

从近期 Issue 中可提炼出以下社区关注方向：

1. **可扩展性与插件生态**：Hooks、Plugins、Mods 相关讨论最为活跃，社区希望通过更开放的扩展机制定制 Claude Code 行为。
2. **跨平台桌面稳定性**：Windows 与 macOS 桌面端的 Cowork 挂载、UI 摘要覆盖、进程误杀等问题集中暴露，桌面端可靠性成为首要改进点。
3. **成本与 Token 控制**：多个 Issue 要求提供“禁用 Cash Usage Credits”或“客户端 opt-out 付费 Token 超额”的开关，反映企业与个人用户对预算可控性的强烈需求。
4. **MCP 与外部工具集成**：Playwright MCP 代理穿透、MCP 服务器列表获取、Auto 模式下 MCP 工具权限等问题频繁出现，MCP 生态的顺畅集成是社区关注重点。
5. **数据安全与自动化边界**：Auto 模式下的文件删除、会话记录残留、密码字段拒绝填充等问题，表明开发者对自动化操作的安全边界与数据留存策略日益敏感。

---

## 开发者关注点（痛点与高频需求）

- **数据丢失风险**：`Remove-Item -Recurse -Force` 静默删除用户数据、会话删除仅移除注册表而留下明文转录、Artifact 发布被拒等问题，均直接关乎用户数据安全。
- **Windows 平台体验落后**：Cowork 文件夹挂载失败、上下文悬停恢复、MCP 列表首轮未获取等多个 Bug 集中在 Windows，跨平台一致性亟待提升。
- **Auto 模式可信度**：模型越界、误报自身行为、分类器拒绝已允许的 MCP 调用，导致无人值守场景下的可靠性受质疑。
- **Hook 与会话压缩缺陷**：`session.compact` 中助手消息与工具结果配对错误，导致自动化工作流中结果丢失，影响高级用户的脚本化使用。
- **桌面端 UI 细节**：Markdown 标题层级难以区分、侧边栏会话分组缺乏“显示更多”设置、Code 标签页文本被摘要替换等，虽非致命但持续影响日常编辑效率。

---

*注：本日报基于 github.com/anthropics/claude-code 过去 24 小时的公开 Release、Issue 与 PR 数据生成，仅供技术参考。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-10-24  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

Codex 近期发布了 CLI 稳定版 `rust-v0.164.0` 与 `rust-v0.165.0-alpha.1`，重点引入可编号保存的 `/presets` 提示槽位以及 `/model`、`/permissions` 内联参数，进一步强化 CLI 的可配置性与工作流自动化。与此同时，社区高频反映的问题仍集中在 Windows 桌面端（组织设置加载失败、Computer Use 截图超时、沙箱权限策略阻断）及 macOS/Web 端的稳定性缺陷上，安装脚本 404 等基础设施问题也引发开发者关注。

---

## 2. 版本发布

### rust-v0.164.0（稳定版）
- **可复用提示与斜杠命令**：新增十个编号 `/presets` 槽位，支持保存常用提示和斜杠命令，并提供键盘菜单快速调用。([#54380](https://github.com/openai/codex/issues/54380), [#54381](https://github.com/openai/codex/issues/54381))
- **内联模型与权限配置**：新增 `/model` 和 `/permissions` 参数，可直接在命令行设置模型、推理努力、速度及权限配置文件。([#54378](https://github.com/openai/codex/issues/54378), [#54383](https://github.com/openai/codex/issues/54383))

### rust-v0.165.0-alpha.1 / rust-v0.164.0-alpha.11.1
- 两个 Alpha 预览版已发布，具体变更细节尚未在 Release Notes 中详细披露。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 评论/👍 | 核心问题与社区反应 | 链接 |
|---|------|---------|-------------------|------|
| #48324 | Windows 桌面端：加载组织设置失败，阻止会话启动 | 48 / 8 | **严重阻塞**。ChatGPT Windows 桌面应用中 Codex 启动即报 "Unable to load organization settings"，Composer 从未出现，用户无法输入 `/` 提交反馈或获取会话 ID。Web 与 CLI 正常，问题桌面端特有。 | [查看](https://github.com/openai/codex/issues/48324) |
| #49383 | Windows Computer Use 截图捕获失败（FrameArrived 超时） | 35 / 1 | **Computer Use 功能受限**。Windows 上窗口检测与截图捕获不可靠，影响 "Computer Use" 插件的核心场景。 | [查看](https://github.com/openai/codex/issues/49383) |
| #50329 | Windows App：read_thread 仅返回 chatgpt-content-reference | 27 / 5 | **MCP 数据泄露/不完整**。已完成的 ChatGPT 回复中，read_thread 只返回引用内容而丢失完整线程，影响 MCP 客户端对话同步。 | [查看](https://github.com/openai/codex/issues/50329) |
| #51308 | Windows 桌面端模型选择器缺失 GPT-6 系列模型 | 23 / 0 | **模型支持滞后**。GPT-6 Sol、GPT-6.1 Sol、GPT-6 Luna 未出现在模型选择器中，Pro 用户无法通过 UI 直接选择。 | [查看](https://github.com/openai/codex/issues/51308) |
| #45403 | Windows 沙箱：强制清理测试文件被策略阻断，无复审路径 | 23 / 5 | **权限策略僵化**。"Full access" 模式下，显式授权的 PowerShell 清理操作仍被 "blocked by policy" 拦截，缺乏例外申诉或复审机制。 | [查看](https://github.com/openai/codex/issues/45403) |
| #32188 | CLI：后台执行会话完成时需要事件驱动唤醒 | 21 / 23 | **高赞功能需求**。长时间运行命令目前依赖模型轮询 `write_stdin` 或长时间工具调用，产生额外 Token 消耗。社区强烈希望支持事件驱动唤醒机制。 | [查看](https://github.com/openai/codex/issues/32188) |
| #52483 | macOS：更新后响应选择菜单缺失 "More details" | 19 / 19 | **macOS UI 回归 bug**。版本 26.1007.21159 后，响应选择菜单中 "More details" 选项消失，影响调试与透明度。 | [查看](https://github.com/openai/codex/issues/52483) |
| #51867 | Windows Cloud Computer Use 列出应用失败：codex app-server 未找到 | 16 / 0 | **Cloud Computer Use 断裂**。Windows 端无法启动 codex app-server，导致应用列表功能不可用，Pro 100 订阅用户同样受影响。 | [查看](https://github.com/openai/codex/issues/51867) |
| #37925 | Android 远程配对在两台 Windows PC 上失败 | 14 / 6 | **跨平台配对问题**。移除手机关联设备后，Android 应用无法与 Windows 桌面端重新配对，影响移动端与桌面端协作流程。 | [查看](https://github.com/openai/codex/issues/37925) |
| #39783 | 桌面端临时线程摘要通过 thread/unsubscribe 泄露完整 MCP 堆栈 | 12 / 3 | **安全/隐私隐患**。线程摘要生成路径会继承并启动用户完整的全局 stdio MCP 配置，摘要完成后未清理，可能暴露敏感 MCP 堆栈信息。 | [查看](https://github.com/openai/codex/issues/39783) |

---

## 4. 重要 PR 进展（精选 10 条）

过去 24 小时内合并的 PR 多由 `@copyberry[bot]` 提交，集中在 Guardian 安全层、追踪（Tracing）、本地消息板、SQLite 优化及配置管理等底层基础设施：

| # | 标题 | 主要变更 | 链接 |
|---|------|---------|------|
| #56560 | 允许在提供商设置中配置 GCP 项目和位置 | Vertex AI 端点支持直接在 GCP 提供商配置中指定 `project_id` 和 `location`，不再仅依赖环境变量。 | [查看](https://github.com/openai/codex/pull/56560) |
| #56559 | 移除 Guardian 快照特定的上下文辅助函数 | 清理快照指令去重、保留助手 framing 及遗漏元数据特例，改用 `retain_new_instructions`。 | [查看](https://github.com/openai/codex/pull/56559) |
| #56557 | 在 Guardian 传输测试中使用保留采样 | 传输测试改用生产环境保留采样器，统一响应所有权与取消路径。 | [查看](https://github.com/openai/codex/pull/56557) |
| #56556 | 为所有 Guardian v2 异步分类使用对话 | 始终使用保留对话后端进行异步分类；保留 `async_classifier_mode` 兼容性但忽略其值。 | [查看](https://github.com/openai/codex/pull/56556) |
| #56555 | 在转录准备期间应用同步 Guardian 消息限制 | 将同步 Guardian 助手与推理条目的截断延迟至 `ContextProfile::prepare_transcript`，使消息限制在渲染前生效。 | [查看](https://github.com/openai/codex/pull/56555) |
| #56554 | 为本地代理签名启用掩码 AWS 凭证 | 在 MITM 权限配置 v2 中暴露 `aws_sigv4` 动作，为本地托管命令提供占位符 AWS 凭证。 | [查看](https://github.com/openai/codex/pull/56554) |
| #56553 | 在线程钩子列表中包含环境钩子 | `hooks/list` 新增 `threadId`，返回当前线程选定执行环境提供的钩子，防止遗漏可阻塞回合的钩子。 | [查看](https://github.com/openai/codex/pull/56553) |
| #56552 | 在 NFS 上使用 DELETE 日志初始化 SQLite 数据库 | NFS 文件系统使用 DELETE 日志模式，其余使用 WAL；独立探测日志目录。 | [查看](https://github.com/openai/codex/pull/56552) |
| #56543 | 按后端跟踪简历选择器分页与选择元数据 | 新增线程目录，按后端维护游标、待处理请求和耗尽状态，支持错误重试与重置后拒绝过期完成项。 | [查看](https://github.com/openai/codex/pull/56543) |
| #56535 | 将头尾缓冲区提取为实用工具 crate | 新增 `codex-utils-head-tail-buffer` crate，支持显式字节预算的输出省略标记。 | [查看](https://github.com/openai/codex/pull/56535) |

---

## 5. 功能需求趋势

从近期 Issues 与 PR 可观察到以下社区关注方向：

1. **跨平台稳定性（Windows 优先）**：Windows 桌面端的组织设置加载、Computer Use 截图、沙箱权限策略、Android 远程配对等问题集中爆发，桌面端可用性是最高优先级。
2. **CLI 工作流自动化**：`#32188` 等高赞 Issue 表明开发者希望减少轮询，增加事件驱动唤醒、后台会话管理及更细粒度的权限/模型内联控制（与 `rust-v0.164.0` 的 `/presets`、`/model` 方向一致）。
3. **MCP 与安全边界**：MCP 栈泄露、`read_thread` 数据不完整、Sites 插件被沙箱阻断等问题显示，社区对 MCP 工具的数据隔离、权限审计与复审路径要求更高。
4. **Web/iPadOS 兼容性**：Safari 下 `DisposableStack` 导致消息提交失败（`#55271`, `#55361`），Web 端在移动浏览器上的稳定性亟待修复。
5. **安装与分发基础设施**：`install.sh` 返回 404（`#56254`, `#56607

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-10-24)

## 今日速览

Gemini CLI 今日发布夜间版本 `v0.67.0-nightly.20261023.ga713410ab`，主要修复了 A2A 服务器与核心模块的 Token 用量元数据保留问题，并确保所有携带函数调用的模型回合都能正确接收思考签名。社区活跃度保持高位，49 个 Issue 与 31 个 PR 在过去 24 小时内更新，核心关注点集中在子代理（Subagent）稳定性、终端渲染性能以及 ACP（Agent-Client Protocol）交互能力增强上。

## 版本发布

**v0.67.0-nightly.20261023.ga713410ab**

- **fix(a2a-server,core)**: 保留扩展 Token 用量元数据，并统一每回合（per-turn）上报逻辑，提升计费与监控准确性（@jvargassanchez-dot，PR #29834）。
- **fix(core)**: 确保所有包含函数调用的模型回合都能接收到思考签名（thought signatures），修复部分回合缺失推理标记的问题（@amelidev）。

[查看完整 Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.67.0-nightly.20261023.ga713410ab)

## 社区热点 Issues

以下选取 10 个优先级高、讨论活跃或对用户影响大的 Issue：

| # | 标题 | 优先级 | 评论/👍 | 核心问题与重要性 | 链接 |
|---|------|--------|---------|------------------|------|
| #22323 | Subagent recovery after MAX_TURN 被误报为 GOAL 成功，掩盖中断 | P1 | 13 / 2 | 子代理在达到最大回合限制前未执行任何分析，却上报 `status: "success"`，导致用户无法感知任务实际失败，严重影响可靠性。 | [链接](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | 通用代理（Generalist agent）挂起 | P1 | 8 / 8 | 代理在处理简单操作（如创建文件夹）时无限期挂起，用户需等待一小时才能取消，仅禁用子代理委派可缓解，属于严重可用性缺陷。 | [链接](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #22186 | get-shit-done 输出钩子导致崩溃 | P1 | 3 / 0 | 在输出用户摘要近乎完成时触发崩溃，影响交付体验，需优先修复。 | [链接](https://github.com/google-gemini/gemini-cli/issues/22186) |
| #21983 | Browser 子代理在 Wayland 下失败 | P1 | 4 / 1 | 浏览器子代理在 Wayland 显示服务器环境下无法正常工作，影响 Linux 桌面用户。 | [链接](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #19873 | 基于零依赖 OS 沙箱的模型 Bash 亲和性路由 | P2 | 9 / 1 | 提议利用 Gemini 3 模型对原生 Bash 工具的偏好，构建安全的零依赖沙箱与执行后意图路由，属于大型架构增强方向。 | [链接](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | 评估 AST 感知的文件读取、搜索与代码映射 | P2 | 7 / 1 | 探索基于 AST 的精准代码读取与导航，有望减少上下文膨胀与 Token 浪费，提升代码库理解效率。 | [链接](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini 主动使用技能与子代理不足 | P2 | 7 / 0 | 模型不会自主调用自定义技能与子代理，需显式指令才会触发，限制了自动化工作流的效率。 | [链接](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #22267 | Browser Agent 忽略 settings.json 覆盖（如 maxTurns） | P2 | 4 / 0 | 浏览器代理未正确读取全局/项目级配置覆盖，导致 `maxTurns` 等关键参数失效。 | [链接](https://github.com/google-gemini/gemini-cli/issues/22267) |
| #24246 | 超过 128 个工具时遇到 400 错误 | P2 | 3 / 0 | 工具数量过多时模型请求失败，需更智能的工具作用域限制机制。 | [链接](https://github.com/google-gemini/gemini-cli/issues/24246) |
| #22672 | 代理应阻止/劝阻破坏性行为 | P2 | 3 / 1 | 在 Git 重置、数据库修改等高风险操作中，模型可能使用不安全命令，需增加安全引导与确认机制。 | [链接](https://github.com/google-gemini/gemini-cli/issues/22672) |

## 重要 PR 进展

选取 10 个代表性 PR，涵盖修复、功能与文档：

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #29904 | fix(cli): 终端宽度变更后限制内联历史重渲染 | OPEN | 限制 `ui.useAlternateBuffer: false` 模式下终端宽度变更时的重渲染工作量，减少重复输出，改善 resize 体验。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29904) |
| #29880 | feat(cli): 新增 `models` 命令与 `--list-models` 标志 | CLOSED | 新增机器可读（JSON）与人类可读的模型发现命令，便于程序化查询可用模型。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29880) |
| #29899 | fix(cli): Claude Hook 超时迁移时秒转毫秒 | CLOSED | 修复 `gemini hooks migrate --from-claude` 中超时单位错误，避免 Hook 提前 1000 倍终止。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29899) |
| #29876 | fix(core): 防止旧检查点回退中的路径遍历 | OPEN | 修复 `Logger._getCheckpointPath()` 与 `deleteCheckpoint()` 的路径遍历漏洞，提升安全性。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29876) |
| #29879 | fix(core,cli,sdk): 中流错误或重试时丢弃缓冲工具调用 | OPEN | 在模型流中途失败、重试或异常终止时，丢弃已缓冲的工具调用请求，防止状态不一致。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29879) |
| #29901 | feat(acp): 允许客户端干预正在进行的回合 | OPEN | ACP 模式下，客户端（Zed、JetBrains、VS Code 等）可在不取消回合的情况下向运行中的 `session/prompt` 追加用户消息，实现中途引导。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29901) |
| #29881 | fix(core,cli): ACP 重试进度更新与重试延迟上限 | OPEN | 修复 ACP 模式下 429 配额错误时缺少进度信号，并对重试延迟与模型回退进行限制。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29881) |
| #29838 | fix(core): 相对文件路径解析到活动 IDE 工作区根 | CLOSED | 文件读写工具将相对路径解析到 IDE 上下文中的活动工作区根，而非固定回退目录，修复 IDE 集成下的路径错误。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29838) |
| #29895 | fix(cli): 无头模式下保留结构化 API 错误 | OPEN | 无头模式将非 Error 值转换为真实 Error，避免结构化 API 错误被字符串化为 `[object Object]`。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29895) |
| #29859 | fix(cli): 在任务树中显示执行中的子代理工具调用 | OPEN | 修复子代理工具调用在执行期间从任务树消失的问题，提升多代理协作的可视化。 | [链接](https://github.com/google-gemini/gemini-cli/pull/29859) |

## 功能需求趋势

从近 24 小时的 Issue 与 PR 中提炼出以下社区关注方向：

1. **子代理（Subagent）可靠性与可见性**：多个 P1/P2 Issue 指出子代理在达到回合上限后误报成功、挂起、未主动调用技能，以及 Bug 报告缺乏子代理上下文。社区期待更稳定的子代理生命周期管理与更透明的轨迹可见性（如 `/chat share` 支持子代理轨迹）。
2. **IDE 与终端集成体验**：PR #29904、#29905、#29838 等聚焦终端宽度变更渲染、歧义宽度字符显示、IDE 工作区路径解析，反映开发者希望在 IDE 内嵌终端中获得更流畅的 CLI 体验。
3. **ACP（Agent-Client Protocol）能力增强**：#29901、#29881 等 PR 致力于让外部客户端能够干预运行中的回合、处理配额重试与进度上报，显示向 IDE 插件生态（VS Code/JetBrains/Zed）深度集成的趋势。
4. **代码理解精准度**：AST 感知的文件读取、搜索与代码映射（#22745、#22746、#22747）被反复提及，旨在减少上下文膨胀、降低 Token 成本并提升代

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 (2026-10-24)

## 1. 今日速览

Reasonix 今日发布 **Studio v2.50.0** 与配套 **CLI v2.50.0**，重点增强子代理工作台标签页、导航入口自定义及正文栏拖拽布局，并修复多处显示与对齐问题。社区反馈集中在上下文压缩失败、Agent 思考后重复回复、记忆“忘记”失效等核心稳定性问题，开发者当天合并了 20+ 个桌面端修复与功能 PR。

---

## 2. 版本发布

### Reasonix Studio v2.50.0 / CLI v2.50.0
- **子代理工作台标签页**：子代理可在工作台内以标签页形式打开并读取完整执行记录。
- **导航入口管理**：设置 → 外观新增「导航入口」，可隐藏或调整图标栏与侧栏入口，两处同步；会话、反馈、账号、设置始终保留。
- **正文栏可拖宽**：正文栏左右边线支持拖动，两侧等量变宽/收窄，缩至“适宜阅读”宽度或撑至窗口全宽，被挡住的侧栏按设定比例让位。
- **反馈表单 Markdown 预览**：正文可切换至「预览」查看渲染效果，公开议题原文仍保留在代码块中。
- **其他**：新增计费方式与放大设置窗口，修复多处卡住、显示与对齐问题。

[Release: studio-v2.50.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.50.0) | [Release: Reasonix CLI v2.50.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.50.0)

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 关注点 | 链接 |
|---|------|------|--------|------|
| #13013 | 桌面端上下文自动压缩失败 | OPEN | 核心功能 Bug，v2.39.0 出现自动压缩失败，已有 14 条评论跟进，影响长会话稳定性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/13013) |
| #13702 | 思考后一直说“好” | OPEN | Agent 行为异常，Windows 11 上思考后持续回复“好”，网络正常，推断为模型或上下文状态问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/13702) |
| #14151 | 找不到该文件，它可能已被移动或删除 | OPEN | Studio 反馈，文件明确存在但反复报错找不到，涉及文件路径解析或索引失效。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14151) |
| #14295 | 储存的记忆点击“忘记”后，重启仍然存在 | OPEN | 数据一致性 Bug，用户删除记忆点后重启依然出现，影响记忆管理可信度。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14295) |
| #14197 | 1.0 定时任务功能在 2.0 缺少图形界面入口 | OPEN | 功能回归需求，用户希望 2.0 恢复定时任务的 GUI 入口。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14197) |
| #14049 | 技能目录普通 skill 与智能体混在一起 | OPEN | UI/UX 改进建议，建议将智能体单独列出，避免与普通 skill 混淆。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14049) |
| #14319 | 项目顶部栏建议增加“最近” | OPEN | 新反馈，项目增多后易遗忘最近运行的项目，建议顶部栏增加最近任务入口。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14319) |
| #14318 | 每个项目增加统一的管理面板 | OPEN | 新反馈，参考 Workbuddy 面板，期望快速查看项目状态与进程。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14318) |
| #14315 | 很慢，其他窗口也很慢 | OPEN | 性能反馈，用户报告整体响应缓慢并拖累其他窗口，尚未获分配评论。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14315) |
| #14302 | reload 命令弹出来的是 reload-cmd | CLOSED | 已修复，补全命令补全端点返回的 `typed` 字段，解决输入 `/reload` 时菜单显示异常。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14302) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #14320 | Let the reading column's grips, sidebars and composer move together | CLOSED | 修复阅读栏拖拽手柄第二次拖动失效问题，CSS 变量继承优先级导致。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14320) |
| #14322 | fix(compaction): a finished fold is announced with a code and a typed payload | CLOSED | 修复上下文折叠完成通知缺少代码块，导致多语言环境下显示英文原文。关联 #14307。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14322) |
| #14321 | Keep the plan panel from pushing the rail and the jump arrows | CLOSED | 修复打开待办面板时消息轨道与跳转按钮意外位移的布局问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14321) |
| #14300 | feat(studio): a shortcut sheet in the settings | CLOSED | 外观设置新增快捷键速查表，涵盖查找、搜索、三视图切换、工作台切换等十余个组合键。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14300) |
| #14296 | feat(studio): fold a crowded conversation rail, and let a question be starred | CLOSED | 会话轨道拥挤时自动折叠相邻问题，悬停显示范围，支持星标标记。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14296) |
| #14299 | feat(studio): export a conversation as Markdown | CLOSED | 会话菜单新增 Markdown 导出，仅保留问答顺序，便于阅读与分享（JSON 仍保留完整字段）。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14299) |
| #14301 | feat(studio): match case and regular expressions in the find bar | CLOSED | 查找栏新增“区分大小写”和“正则表达式”开关，提升代码/会话检索精度。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14301) |
| #14313 | fix(stats): an endpoint's zero cache hit is a full miss, not an absence | CLOSED | OpenAI 兼容用量归一化中，`cached_tokens: 0` 视为显式完全未命中，修正统计偏差。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14313) |
| #14316 | test(delegation): observe the running fleet job before the children are released | CLOSED | 修复测试竞态，在释放子任务前观察舰队任务状态，避免断言读取空列表。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14316) |
| #14312 | fix(studio): show exact slash command alongside completions | CLOSED | 修复输入完整斜杠命令时补全菜单只显示 `/reload-cmd` 而隐藏 `/reload` 的问题。关联 #14302。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14312) |

---

## 5. 功能需求趋势

从近 24 小时 Issues 与 PR 可观察到以下社区关注方向：

1. **工作台与子代理可视化**：用户希望子代理任务执行过程直接在工作台展开（#13523），并支持标签页查看完整记录，已在 v2.50.0 部分落地。
2. **项目与任务管理增强**：多条反馈要求增加“最近项目”入口（#14319）和统一项目管理面板（#14318），表明多项目并行场景下的状态追踪需求强烈。
3. **记忆与上下文管理**：记忆删除失效（#14295）、上下文压缩失败（#13013）反复出现，社区对长期记忆一致性与上下文压缩稳定性要求提高。
4. **Agent 行为可控性**：思考后重复回复（#13702）、多步任务中过度自查（#14311）等问题显示用户希望 Agent 决策路径更透明、可干预。
5. **跨模型体验一致性**：缓存命中率仅在 DeepSeek 模型下较高，换用其他模型后下降（#14309），社区期望优化非 DeepSeek 模型的上下文缓存策略。

---

## 6. 开发者关注点

- **稳定性痛点**：桌面端上下文压缩失败、文件路径误报、记忆“忘记”后重启仍存，均为影响核心流程的 Bug，建议优先排查。
- **性能反馈**：出现“很慢，其他窗口也很慢”的泛性能投诉（#14315），需进一步定位是渲染、索引还是后台任务导致。
- **国际化与本地化**：后台任务启动通知、上下文压缩遥测等系统提示仍以英文硬编码出现（#14308、#14307、#14314），用户明确要求“可以中文吗”，i18n 覆盖不足。
- **功能回归**：1.0 版本的定时任务 GUI 入口在 2.0 中缺失（#14197），

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-10-24)

## 今日速览

OpenCode 社区今日活跃度较高，共记录 14 条更新的 Issue 和 50 条更新的 PR。核心关注点集中在 **v1→v2 数据迁移稳定性**、**TUI/WebSocket 细节修复** 以及 **跨平台桌面端体验** 上。值得注意的是，v2.1.x 版本发布后出现多个回归问题（如侧边栏不渲染、会话消息丢失），社区正通过快速跟进的 PR 进行修复。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues

以下 10 个 Issue 今日更新最为频繁或影响范围较广，建议开发者重点关注：

| # | 标题 | 状态 | 关注理由 | 链接 |
|---|------|------|----------|------|
| #34344 | Unlimited usage Exploit on opencode models | CLOSED | 免费模型速率限制绑定 IP，通过 VPN 切换即可重置，存在无限使用漏洞。已有 33 条讨论，社区对滥用防护机制关注度高。 | [查看](https://github.com/anomalyco/opencode/issues/34344) |
| #52266 | Windows: every spawned console process flashes a black window | OPEN | Windows 下每秒约 1 次控制台闪烁（git.exe 等），为历史问题重报，影响桌面端日常使用体验。 | [查看](https://github.com/anomalyco/opencode/issues/52266) |
| #58543 | migration: sessions created via 1.19 /api/session lose all messages on v1->v2 migration | OPEN | **severity:high**。1.19 数据库升级至 2.1.3 后，通过旧 API 创建的会话消息全部丢失，仅保留会话行，属严重数据迁移回归。 | [查看](https://github.com/anomalyco/opencode/issues/58543) |
| #58550 | Free usage exceeded, tho my first time Using opencode | OPEN | 新用户安装后首次使用即提示“免费额度已超”，可能与 IP 检测或代理有关，反映免费额度初始化逻辑存在问题。 | [查看](https://github.com/anomalyco/opencode/issues/58550) |
| #58553 | 额度限制有误 | OPEN | 中文 Issue，用户未使用却显示超额，更换本地 IP 仍无效，指向额度检测机制的普遍性问题。 | [查看](https://github.com/anomalyco/opencode/issues/58553) |
| #55536 | Desktop: "Toggle Sidebar" doesn't do anything | OPEN | macOS 桌面端 2.0.29 侧边栏切换无反应，影响会话切换等核心交互。 | [查看](https://github.com/anomalyco/opencode/issues/55536) |
| #57541 | tool dispatch: shell tool silently removed mid-session | CLOSED | 长会话（~20 小时）中 shell/dispatch 工具静默消失，助手开始将工具调用 XML 当作普通文本输出，影响长时间任务稳定性。 | [查看](https://github.com/anomalyco/opencode/issues/57541) |
| #58555 | tui: WebSocket editor selection_changed line numbers are off by one | OPEN | WebSocket 编辑器选择事件携带 0-based 行号直接显示，导致行号偏差，已有对应修复 PR 跟进。 | [查看](https://github.com/anomalyco/opencode/issues/58555) |
| #58554 | tui: "Modified Files" sidebar section never renders on 2.1.4 | OPEN | 2.1.4 版本“修改的文件”侧边栏不渲染，即使 diff 端点返回数据，影响文件变更可视化。 | [查看](https://github.com/anomalyco/opencode/issues/58554) |
| #58250 | [FEATURE]: Add a /goal Command for Autonomous Goal Pursuit | CLOSED | 社区提出自主目标追求命令，期望 Agent 自动拆解目标并执行，反映用户对更高级自主能力的需求。 | [查看](https://github.com/anomalyco/opencode/issues/58250) |

---

## 重要 PR 进展

今日新增/更新的 10 个重要 PR，涵盖 TUI 修复、国际化、核心迁移及生态文档：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|---------------|------|
| #58556 | fix(tui): render 1-based line numbers for WebSocket editor selections | OPEN | 修复 #58555，将 WebSocket 编辑器选择的 0-based 行号转换为 1-based 显示，修正行号偏差。 | [查看](https://github.com/anomalyco/opencode/pull/58556) |
| #58549 | [contributor] fix(core): preserve 1.19 API messages during migration | OPEN | 修复 #58543，在 v1→v2 迁移中保留通过 1.19 `/api/session` 创建的消息，解决两个删除点导致的数据丢失。 | [查看](https://github.com/anomalyco/opencode/pull/58549) |
| #58548 | fix(session): regenerate a title from an empty title on every update path | OPEN | 修复 #58547，插件调用 `session.update({ title: "" })` 时应重新生成标题，与 HTTP 路由行为保持一致。 | [查看](https://github.com/anomalyco/opencode/pull/58548) |
| #58545 | fix(tui): strip ANSI from tool errors and generic output | OPEN | 对工具错误和通用输出应用 `stripAnsi()` 清理，避免 ANSI 转义码在执行对话框中渲染异常。 | [查看](https://github.com/anomalyco/opencode/pull/58545) |
| #58433 | feat(tui): live IDE follow chip in prompt | OPEN | 新增可选 `live-follow` TUI 实验功能，在提示行镜像当前 IDE 跟踪状态，增强 IDE 与终端的协作体验。 | [查看](https://github.com/anomalyco/opencode/pull/58433) |
| #58552 | feat(i18n): complete Czech localization | OPEN | 完善捷克语本地化，修复错误词义、复数和语法问题，补充 235 条待翻译字符串。 | [查看](https://github.com/anomalyco/opencode/pull/58552) |
| #58551 | docs(ecosystem): add opencode-plugin-jit-context to ecosystem plugins | OPEN | 在生态插件页面新增 `opencode-plugin-jit-context` 条目，丰富社区插件生态索引。 | [查看](https://github.com/anomalyco/opencode/pull/58551) |
| #56989 | [contributor] fix(core): omit read media from the experimental timeline | OPEN | 实验性时间线路由亦忽略读取工具返回的内联 `data:` 文件，避免重复加载已通过路径打开的图片。 | [查看](https://github.com/anomalyco/opencode/pull/56989) |
| #57729 | [contributor] feat(app): hydrate user attachments on demand | OPEN | 按需加载用户附件，避免打开含大量图片的会话时一次性下载所有字节，通过新实验路由按需获取媒体。 | [查看](https://github.com/anomalyco/opencode/pull/57729) |
| #56991 | [contributor] feat(core): store session media in a content-addressed media_blob table | OPEN | 将会话媒体从 base64 存储迁移至内容寻址的 `media_blob` 表，预计可大幅减少数据库体积与重复数据。 | [查看](https://github.com/anomalyco/opencode/pull/56991) |

---

## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **数据迁移与向后兼容性**：v1→v2 升级过程中的会话消息丢失、旧 API 数据保留成为最高优先级，用户期望无损迁移。
2. **IDE 与编辑器深度集成**：WebSocket 行号修复、实时跟踪芯片（live-follow chip）、附件按需加载等，表明社区正推动 OpenCode 与外部 IDE/编辑器的无缝协作。
3. **TUI 交互细节打磨**：侧边栏渲染、行号显示、ANSI 清理、Cmd+X 剪切等终端交互问题频繁出现，用户对桌面/终端体验的完整度要求较高。
4. **自主 Agent 能力**：`/goal` 自主目标追求等功能请求显示用户希望 Agent 具备更强的任务规划与自主执行能力。
5. **多语言支持**：捷克语本地化 PR 反映社区开始关注非英语地区的本地化体验。

---

## 开发者关注点

**高频痛点：**
- **额度/限流机制**：多个用户反馈免费额度异常（新用户即超额、IP 检测导致误判），额度初始化与检测逻辑需要澄清与修复。
- **Windows 桌面端稳定性**：控制台进程闪烁、侧边栏无反应等平台特定问题持续存在，跨平台一致性有待提升。
- **长会话工具丢失**：shell/dispatch 工具在长时间会话中静默消失，导致助手无法执行命令并输出原始 XML，影响长任务可用性。

**开发者行动建议：**
- 优先合并 #58549 等迁移修复 PR，防止 v2.1.x 用户数据进一步丢失。
- 对 #58550、#58553 等额度问题进行根因分析，明确免费额度的 IP 绑定与重置策略。
- 持续推进 TUI 与 WebSocket 协议的细节修复，提升 IDE 桥接体验的可靠性。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 (2026-10-24)

## 1. 今日速览

Deepseek Harness 于昨日发布 **v0.2.1-rc.3** 候选版本，本次更新聚焦于界面体验优化与会话交互 Bug 修复，包括新增插件「更多」菜单、修复跨会话草稿丢失问题，以及统一 DeepSeek API Key 适配器的模型列表更新逻辑。过去 24 小时内，社区 Issues 与 Pull Requests 均无新增更新，整体活动以正式版本迭代为主。

## 2. 版本发布

### dsh-v0.2.1-rc.3
**发布链接：** [https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.2.1-rc.3](https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.2.1-rc.3)

**主要变更：**

| 类别 | 更新内容 | 贡献者 |
|------|---------|--------|
| 体验优化 | 新增左侧栏、会话视图和右侧栏的「更多」菜单，方便浏览和创建插件 | @Yifffan, @imccyu |
| Bug 修复 | 修复切换会话后，点击「新会话」找不回未发送草稿的问题 | @imccyu |
| 其他变更 | DeepSeek API Key 适配器的模型列表更新方式与账号登录模式保持一致 | @LegGasai |

## 3. 社区热点 Issues

过去 24 小时内 **无 Issues 更新**（共 0 条），暂无可追踪的热点议题。

## 4. 重要 PR 进展

过去 24 小时内 **无 Pull Requests 更新**（共 0 条），暂无可追踪的代码合并活动。

## 5. 功能需求趋势

基于本次 Release 的变更方向，可推断社区与开发团队近期关注的功能维度包括：

- **插件生态可发现性**：通过在左侧栏、会话视图和右侧栏统一引入「更多」菜单，表明插件浏览与创建入口的优化是当前产品重点。
- **会话状态持久性**：修复切换会话后未发送草稿丢失的问题，反映用户对多会话切换时草稿自动保存与恢复能力的需求较高。
- **API Key 与模型列表体验**：将 API Key 适配器的模型列表更新方式与账号登录模式对齐，显示社区对不同认证模式下模型列表一致性的关注。

> 注：由于过去 24 小时内无 Issues 数据，上述趋势基于本次 Release 的变更内容推断，而非基于 Issue 统计。

## 6. 开发者关注点

从本次版本的修复项与优化项可看出，开发者当前的痛点与高频需求集中在：

1. **跨会话交互体验**：切换会话后草稿丢失影响连续对话效率，状态保持机制是开发者关注的核心痛点。
2. **插件管理便捷性**：插件入口分散导致浏览与创建成本较高，统一「更多」菜单的设计回应了对插件生态可用性的改进诉求。
3. **多认证模式下的信息一致性**：API Key 模式与账号登录模式在模型列表更新上的差异，可能导致开发者在不同环境下体验不一致，统一逻辑是提升配置可预测性的关键。

---

**仓库主页：** [https://github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)  
**数据截止：** 2026-10-24（过去 24 小时）

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-10-24)

## 1. 今日速览

Hermes Agent 发布补丁版本 **v0.22.5**，汇总了自 v0.22.4 以来约 81 个 PR 的稳定性修复，覆盖 CLI、安装程序、Microsoft Store、Docker 及 Hermes Cloud。社区当前高度关注 **统一网关（Unified Gateway）合并后的遗留问题**、**MCP 信任门安全机制** 以及 **桌面端会话与模型配置相关的多个 P2 级 Bug**。安全与计费领域出现多个新问题，包括 Slack Connect 消息重复处理和会话成本重复定价。

## 2. 版本发布

**Hermes Agent v0.22.5** (2026-10-22)  
- 类型：补丁版本 (Patch release)  
- 内容：回滚/汇总自 v0.22.4 以来约 81 个已合并 PR，为 CLI、安装程序、Microsoft Store 应用、Docker 及 Hermes Cloud 提供稳定版本。  
- 备注：此版本的完整策划发布说明将随 v0.23.0 一同发布。  
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.5

## 3. 社区热点 Issues

以下 10 个 Issue 在过去 24 小时内更新活跃，或涉及核心组件与安全合规，建议重点跟进：

| # | 标题 | 核心标签 | 为何重要 | 社区反应 |
|---|------|----------|----------|----------|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) | Unified gateway: open post-merge problems on main | `comp/gateway`, `P2`, `desktop`, `windows` | 统一网关于 10 月 14 日合并主干，所有本地对话（CLI、TUI、Desktop、API、Cron、Kanban 等）现统一由单一网关进程处理，合并后遗留问题可能影响全平台稳定性。 | 10 条评论，@dokterdok 创建，社区正在跟进合并后的回归问题。 |
| [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) | RFC: The doc-chain substrate's network | `comp/agent`, `tool/memory`, `P2`, `area/compression` | 提出文档链底层网络的读取、治理与压缩机制，涉及会话压缩后耐久记录的溯源与重读，属于架构层面的长期方向。 | 10 条评论，@c0wb0yp0tat0 发起 RFC，尚未进入实施阶段。 |
| [#96703](https://github.com/NousResearch/hermes-agent/issues/96703) | MCP trust-gate approval card: show call arguments | `type/bug`, `comp/gateway`, `tool/mcp`, `P2` | MCP 非信任写操作的审批卡片未显示调用参数，且 Session/Always 按钮表现为 Once，影响团队运维场景下的外部变更审计。 | 4 条评论，已有对应 PR #143795 尝试修复参数展示。 |
| [#143305](https://github.com/NousResearch/hermes-agent/issues/143305) | Plugin admission fails for Python deps on android split | `type/bug`, `area/install-update`, `P2` | 带有 Python 依赖的插件（如 homeassistant 需 aiohttp）因核心 uv.lock 无法为 `sys_platform == 'android'` 分片重新解析而被拒绝准入，阻断插件生态扩展。 | 3 条评论，@JRoppert 报告，影响插件安装流程。 |
| [#134677](https://github.com/NousResearch/hermes-agent/issues/134677) | Desktop Project → New session Nous Portal auth error | `type/bug`, `provider/nous`, `area/auth`, `P2` | 桌面端从 Project 视图新建会话时，会错误发送 Nous 客户端覆盖并触发 Nous Portal 认证错误，尽管配置文件默认模型路径正常。 | 2 条评论，标记 `needs-repro`，需进一步复现。 |
| [#136929](https://github.com/NousResearch/hermes-agent/issues/136929) | Desktop model picker doesn't update `_primary_runtime` | `type/bug`, `comp/agent`, `area/config`, `P2` | 桌面端模型选择器切换模型后未更新 `_primary_runtime` 快照，导致下一轮对话回退至全局默认模型并产生虚假回退提示。 | 2 条评论，@williamxhero 提供了具体代码路径定位。 |
| [#143792](https://github.com/NousResearch/hermes-agent/issues/143792) | Slack Connect external user message handled twice | `type/security`, `comp/gateway`, `platform/slack`, `P3` | Slack Connect 共享频道中外部组织用户消息被处理两次，且其中一条会话被错误定位到未安装应用的工作区；外部 DM 策略失效。 | 1 条评论，@doudoujay 新建，涉及跨组织数据隔离安全风险。 |
| [#143797](https://github.com/NousResearch/hermes-agent/issues/143797) | Session cost reprices whole history at current model | `type/bug`, `comp/portal`, `area/billing`, `P2` | 会话中途更换模型后，系统按当前模型费率对全量历史代币重新计价，导致实际未计费的代币被错误计入消费，影响账单准确性。 | 0 条评论，@xristosvasilopoulos-eng 新建，计费敏感问题。 |
| [#143785](https://github.com/NousResearch/hermes-agent/issues/143785) | Cron monitor-gated job persists empty session row | `type/bug`, `comp/cron`, `P2`, `area/sessions` | 受监控脚本门控的 Cron 任务每次触发都会写入空会话行，16 小时内产生 484 行空记录，占用 95% 个人资料会话空间。 | 1 条评论，@xristosvasilopoulos-eng 报告，影响数据库卫生。 |
| [#40470](https://github.com/NousResearch/hermes-agent/issues/40470) | Prompt & Response Sanitization Layer | `type/feature`, `comp/agent`, `area/auth`, `P3` | 社区长期请求的敏感数据保护层，用于对 API Key、SSH Key、邮箱、数据库连接字符串等进行脱敏，适合企业合规场景。 | 2 条评论，1 个赞，功能需求持续受关注。 |

## 4. 重要 PR 进展

以下 10 个 PR 在过去 24 小时内更新，涵盖安全修复、跨平台适配、插件生态及桌面端体验改进：

| # | 标题 | 类型 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| [#143795](https://github.com/NousResearch/hermes-agent/pull/143795) | fix(mcp): untrusted MCP write approvals show call's arguments | `type/security`, `P2` | 非信任 MCP 写操作审批提示现在显示调用参数（密钥脱敏，JSON 限 1200 字符），帮助审批人确认外部变更内容；修复 #96703 部分问题。 | https://github.com/NousResearch/hermes-agent/pull/143795 |
| [#143800](https://github.com/NousResearch/hermes-agent/pull/143800) | fix(gateway): send plain audio as attachment, not voice note | `type/bug`, `P2` | 修复 Discord 及同类平台上音频文件被错误上传为语音消息（`.ogg` + voice flag）的问题，现按附件形式发送，保留原始格式。 | https://github.com/NousResearch/hermes-agent/pull/143800 |
| [#50929](https://github.com/NousResearch/hermes-agent/pull/50929) | fix(qqbot): flag splits_long_messages to stop truncating QQ output | `type/bug`, `P2` | QQ 机器人长消息（>4000 字符）被 DeliveryRouter 截断，现声明 `splits_long_messages = True`，让路由器传递完整载荷并保留审计文件。 | https://github.com/NousResearch/hermes-agent/pull/50929 |
| [#143799](https://github.com/NousResearch/hermes-agent/pull/143799) | Update burnclock to 0.2.0: dashboard page | `type/feature`, `P3` | 将 burnclock 目录条目升级至 0.2.0，桌面插件新增 Burnclock 左侧导航工作区页面，展示缓存余额、运行期等信息。 | https://github.com/NousResearch/hermes-agent/pull/143799 |
| [#143801](https://github.com/NousResearch/hermes-agent/pull/143801) | feat(desktop): switch off popups for blocked kanban tasks | `type/feature`, `P3` | 在 Settings ▸ Plugins ▸ Kanban 新增“阻塞任务弹窗”开关，关闭后停止为 `blocked` / `block_loop_detected` 事件弹出 Toast 和系统通知。 | https://github.com/NousResearch/hermes-agent/pull/143801 |
| [#143787](https://github.com/NousResearch/hermes-agent/pull/143787) | YOLO and approvals.mode off no longer prompt for untrusted MCP writes | `type/feature`, `P3` | YOLO 模式或 `approvals.mode: off` 时跳过非信任 MCP 写操作提示，但跨越支出限额的调用仍会询问并拒绝；修复信任门检查未查询模式的根因。 | https://github.com/NousResearch/hermes-agent/pull/143787 |
| [#143791](https://github.com/NousResearch/hermes-agent/pull/143791) | feat(plugins): ctx.side_question asks session's own agent after turn | `type/feature`, `P3` | 插件可在回合结束后向会话自身代理发送短文本侧边问题，复用同一模型、系统提示、记忆及提示缓存，解决 `ctx.llm` 无会话上下文的问题。 | https://github.com/NousResearch/hermes-agent/pull/143791 |
| [#143784](https://github.com/NousResearch/hermes-agent/pull/143784) | fix(skills): plugin skills load when called as plugin:<ns>:<skill> | `type/bug`, `P2` | 修复可移植插件技能（如 Blender）在按技能索引呈现的方式调用时无法加载的问题，现可正确定位并执行。 | https://github.com/N

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报
**日期**: 2026-10-24  
**数据来源**: github.com/openclaw/openclaw  

---

## 1. 今日速览

过去 24 小时 OpenClaw 社区未发布新版本，但活跃度保持在较高水平：共更新 6 条 Issue 和 50 条 Pull Request。核心关注点集中在 **Gateway 稳定性（systemd 预启动检查、工具超时恢复）**、**Web UI 体验细节（会话置顶、文件预览、侧边栏性能）** 以及 **插件热重载机制** 上。P1 级别的 systemd 安装缺陷值得维护者优先跟进。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

以下按重要性与社区影响力排序，涵盖所有更新的 Issue 及代表性 PR 相关议题：

| # | 标题 | 状态/优先级 | 核心内容 | 为何重要 | 链接 |
|---|------|-------------|----------|----------|------|
| #178346 | systemd installs have no pre-start Doctor step | OPEN / P1 | systemd 托管安装缺少预启动 Doctor 修复步骤，包在 `openclaw update` 外部被替换后，Gateway 会保持停止状态，需手动运行 `openclaw doctor` | **P1 级别崩溃循环风险**，直接影响生产环境可用性，属于运维兜底能力缺失 | [查看](https://github.com/openclaw/openclaw/issues/178346) |
| #181958 | Update failure: package-doctor (2026.10.3) | OPEN / P2 | darwin/arm64 平台（Node 26.12.1）在 2026.10.3 版本更新时出现 package-doctor 失败 | 最新版本回归问题，涉及 macOS Apple Silicon 用户，需确认是否为发布回归 | [查看](https://github.com/openclaw/openclaw/issues/181958) |
| #181884 | Unknown-tool-name failure kept as run error after model recovery | OPEN / P2 | 模型调用不存在工具名后，即使通过 Tool Search 恢复并成功完成任务，NO_REPLY cron 运行仍被标记为失败 | 影响 Agent 运行状态准确性，导致误报和告警疲劳 | [查看](https://github.com/openclaw/openclaw/issues/181884) |
| #182024 | Plugin reload hands running turns to new generation at step boundaries | OPEN / enhancement | `openclaw plugins reload` 应在运行中轮次的下一步边界切换至新插件代码，而非等待轮次结束 | 插件热更新体验的关键特性，减少重启等待时间 | [查看](https://github.com/openclaw/openclaw/issues/182024) |
| #181859 | Rebuild memory indexes as part of agent database port | CLOSED / P2 | `openclaw database port` 迁移 Agent 存储后，应在报告成功前重建内存索引，避免首次回调懒加载 | 数据库迁移后的数据一致性与首次体验问题 | [查看](https://github.com/openclaw/openclaw/issues/181859) |
| #181719 | Control UI: unarchiving restores previous personal session pin | CLOSED / P2 | 取消归档会话后，之前的个人会话置顶状态被恢复，不符合预期 | UI 状态同步缺陷，影响会话管理直观性 | [查看](https://github.com/openclaw/openclaw/issues/181719) |
| #180247 | fix(agents): preserve tool timeout recovery checkpoints | OPEN / P2 | 保留工具执行看门狗阶段，将超时持久化为可中断恢复检查点，并拒绝无法强制执行的 CLI 运行时 | Agent 超时恢复机制的核心可靠性改进 | [查看](https://github.com/openclaw/openclaw/pull/180247) |
| #180200 | fix(github): open reconnect flow from active sessions | OPEN / P2 | GitHub OAuth 凭证过期时，无法从活跃会话直接进入重连流，长时间运行工作需中断等待 | 影响长周期任务的连续性，运维体验痛点 | [查看](https://github.com/openclaw/openclaw/pull/180200) |
| #181997 | fix(agents): system prompt advertises /update and /reasoning even when commands disabled | OPEN / P2 | 禁用聊天命令后，系统提示词仍向模型宣传 `/update` 和 `/restart`，导致模型推荐不可用命令 | 配置与模型行为不一致，可能引发误操作 | [查看](https://github.com/openclaw/openclaw/pull/181997) |
| #181990 | fix(auto-reply): add localized abort triggers | OPEN / P2 | 中止检测主要识别英文及少数语言，西班牙语、法语、印地语、阿语用户无法可靠中止自动回复 | 多语言支持缺口，影响非英语区用户体验 | [查看](https://github.com/openclaw/openclaw/pull/181990) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 状态/优先级 | 功能或修复内容 | 链接 |
|---|------|------|-------------|----------------|------|
| #180247 | fix(agents): preserve tool timeout recovery checkpoints | @RomneyDa | OPEN / P2 | 持久化工具超时中断恢复检查点，强制回放安全续拒，保留旧运行时兼容性 | [查看](https://github.com/openclaw/openclaw/pull/180247) |
| #180200 | fix(github): open reconnect flow from active sessions | @RomneyDa | OPEN / P2 | 从活跃会话直接打开 GitHub OAuth 重连流，避免长时间运行工作中断 | [查看](https://github.com/openclaw/openclaw/pull/180200) |
| #151009 | fix(windows): launch terminal shims with versioned Node runtimes | @ly85206559 | OPEN / P2 | 修复 Windows 终端会话在使用 `node24.exe` 等版本化 Node 可执行文件时，无法启动 npm 安装的 CLI | [查看](https://github.com/openclaw/openclaw/pull/151009) |
| #182015 | fix(ui): hide unrelated sessions from Involving me | @roboclaw-bot | CLOSED / P2 | 修复“Involving me”侧边栏显示不相关的 PR 工作，仅显示 Gateway 识别为涉及当前用户的会话 | [查看](https://github.com/openclaw/openclaw/pull/182015) |
| #182002 | perf(cron): avoid roster allocation in availability checks | @steipete | OPEN / P2 | 避免 cron 可用性检查中重复构建完整 Agent 名单，降低大规模舰队下的临时分配开销 | [查看](https://github.com/openclaw/openclaw/pull/182002) |
| #182019 | perf(gateway): reuse mention presentations and trim sidebar packing | @steipete | OPEN / M | 复用提及展示对象并精简侧边栏打包，减少重复分配，无线路或权限行为变更 | [查看](https://github.com/openclaw/openclaw/pull/182019) |
| #182023 | fix(ui): preserve mounted plugin catalog detail routes on startup | @AmelioMansour | OPEN / S | 修复 Control UI 挂载在子路径下时，插件目录详情链接错误打开聊天的问题 | [查看](https://github.com/openclaw/openclaw/pull/182023) |
| #182016 | fix: typing filters an open assignment menu | @roboclaw-bot | OPEN / P2 | 修复在“Assign to”子菜单中输入时会关闭菜单而非过滤人员和 Agent | [查看](https://github.com/openclaw/openclaw/pull/182016) |
| #182007 | fix(gateway): keep public reads available during session updates | @steipete | CLOSED / P2 | 修复公开对话在匿名读者加载时发生变更导致的间歇性 HTTP 503 | [查看](https://github.com/openclaw/openclaw/pull/182007) |
| #182020 | fix(workboard): clearing card selection loses keyboard focus | @AmelioMansour | OPEN / S | 修复 Workboard 卡片清除选择后键盘焦点丢失到页面 body，影响无障碍操作 | [查看](https://github.com/openclaw/openclaw/pull/182020) |

---

## 5. 功能需求趋势

从近 24 小时的 Issues 和 PR 中，可提炼出以下社区关注方向：

1. **Agent 可靠性与恢复机制**  
   工具超时检查点持久化（#180247）、模型调用错误工具名后的状态恢复（#181884）、插件热重载不中断运行中轮次（#182024），表明社区正在推动 Agent 在异常和升级场景下的“无缝续航”能力。

2. **系统级部署与运维兜底**  
   systemd 预启动 Doctor 步骤（#178346）、Windows 版本化 Node 运行时支持（#151009），反映企业级自托管部署对非 Docker 环境（bootc、rpm-ostree、发行版包）的适配需求日益迫切。

3. **Web UI 细节打磨与多语言支持**  
   会话置顶状态同步（#181719）、“Involving me”侧边栏过滤（#182015）、文件预览而非链接（#181937）、多语言中止触发器（#181990），显示社区对日常交互体验和国际化可用性的要求在提升。

4. **性能与资源优化**  
   cron 可用性检查避免名单分配（#182002）、侧边栏提及对象复用（#182019）、沙箱慢设置归因（#181996），性能优化正从 Gateway 核心向侧边栏、沙箱等边缘场景延伸。

---

## 6. 开发者关注点

- **P1 级 systemd 缺陷亟待修复**：#178346 暴露出非容器化部署环境下，Gateway 因外部包替换而长期停止的风险，建议维护者优先评估预启动 Doctor 步骤的落地计划。
- **最新版本回归风险**：#18195

:::
