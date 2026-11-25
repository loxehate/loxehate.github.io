---
title: "AI CLI 工具社区动态日报"
published: 2026-11-21
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-21

> 生成时间: 2026-11-21 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-21）

## 1. 生态全景

当前 AI CLI 工具生态正从单一的“命令行助手”向“多模态、多代理、企业级协作平台”演进。各主流工具均在加强跨平台桌面端稳定性、MCP 协议标准化支持以及子代理/多代理协作机制，但安全过滤误报、会话状态持久化与跨端同步仍是普遍痛点。企业级功能（如组织登录、细粒度权限隔离）成为差异化竞争新高地，而开发者社区对成本可见性、本地自动化兼容性及桌面端 UI 一致性的关注度持续升高。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Issues 更新 | 今日 PR 更新 | 最新 Release | 核心版本状态 |
|------|------|-----------------|-------------|-------------|-------------|
| Claude Code | anthropics/claude-code | 49 条 | 1 条 | v2.1.330 | 稳定版，企业特性迭代 |
| OpenAI Codex | openai/codex | 10 条（精选） | 10 条（精选） | rust-v0.171.0 / 0.173.0-alpha | 稳定版 + Alpha 预览并行 |
| Gemini CLI | google-gemini/gemini-cli | 10 条（精选） | 10 条（精选） | v0.71.0-nightly.20261120 | 夜间构建，快速迭代 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 0 | 0 | 无 | 无活动（休眠/停滞） |
| OpenCode | anomalyco/opencode | 8 条 | 50 条 | 无 | PR 活跃，无新版本发布 |
| Hermes | NousResearch/hermes-agent | 10 条（精选） | 10 条（精选） | v0.23.3 / Canary | 补丁版本 + Canary 构建 |
| OpenClaw | openclaw/openclaw | 7 条 | 50 条 | 无 | PR 活跃，无新版本发布 |

> 注：部分仓库仅披露“精选”热点数量，非全量统计；OpenCode 与 OpenClaw PR 数量较高，但未伴随正式 Release，说明处于持续集成/内部迭代阶段。

## 3. 共同关注的功能方向

多个工具社区在以下四个方向上呈现高度一致的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **跨平台桌面端稳定性** | Claude Code、OpenAI Codex、Gemini CLI、OpenCode | macOS 启动崩溃（Codex NSUnknownKeyException）、自动更新导致远程会话中断（Claude Code）、Windows/Linux 路径与权限问题（Gemini CLI、OpenCode） |
| **MCP 协议与安全** | Claude Code、Gemini CLI、OpenCode、Hermes | MCP OAuth Token 重放与重定向安全（Gemini CLI）、MCP 协议协商与事件订阅头（OpenCode）、插件/网关权限隔离（Hermes、OpenClaw） |
| **多代理/子代理协作** | Claude Code、Gemini CLI、OpenCode、Hermes | 一键会话交接与队友协作（Claude Code）、Subagent 状态上报不准与挂起（Gemini CLI）、Agent 自主协作无需用户中继（OpenCode）、自主调度建议（Hermes） |
| **会话状态与远程协作** | Claude Code、OpenAI Codex、OpenCode | 云端线程就绪协议异常（Codex）、Remote Control 插件 UI 不渲染（Claude Code）、TUI 压缩行渲染缺失（OpenCode） |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 企业组织管理、内置图表（easel）、Remote Control 远程协作 | 企业开发团队、需要组织级策略与云网关集成的用户 | 基于 Anthropic 模型，强调企业 Admin Console 集成与桌面端远程控制 |
| **OpenAI Codex** | TUI 工作区、GPT-6.2 Sol/Astra 模型、Computer Use（屏幕操作） | 个人开发者、需要原生多模态与桌面自动化的用户 | Electron 桌面应用 + CLI，侧重 TUI 与云端线程同步，Windows/macOS 双端重点 |
| **Gemini CLI** | Subagent 子代理、AST 感知代码读取、Token 热图统计 | 代码库导航与大规模重构场景的开发者 | 轻量 CLI 为主，夜间构建频繁，强调工具调用治理（callTimeout）与代码结构理解 |
| **OpenCode** | Agent Widgets 交互组件、MCP 协议协商、多代理自主协作 | 插件开发者、构建自定义 Agent 工作流的团队 | Go 中继架构，强调 SDK API 语义与客户端原生渲染，社区 PR 活跃度高 |
| **Hermes** | 仪表盘/网关架构、应用内 Offer 对话框、自主调度（行程/习惯） | 消费级 AI 助手用户、桌面端与 Webapp 跨端体验追求者 | 桌面应用 + Dashboard SPA + 网关，侧重用户生命周期与多设备通知去重 |
| **OpenClaw** | Control UI 会话侧边栏、CLI 媒体发送、会话归档与自动化链接分享 | 运维人员、Headless/SSH 场景下的会话管理用户 | Gateway 权限隔离、会话共享（Session Share）与模板生命周期管理 |
| **DeepSeek Reasonix** | 无活动 | — | 过去 24 小时无社区动态，生态活跃度极低 |

## 5. 社区热度与成熟度

- **高活跃、快速迭代**：OpenCode（50 个 PR 更新）、OpenClaw（50 个 PR 更新）、Gemini CLI（夜间版持续发布）。这三类工具处于功能补完与平台化扩张阶段，版本迭代频繁，但正式 Release 较少，适合早期采用者参与塑造。
- **稳定版主导、企业导向**：Claude Code（v2.1.330 正式发布企业登录与 easel）、OpenAI Codex（rust-v0.171.0 稳定版）。社区 Issue 数量较多，集中在启动崩溃、数据丢失等稳定性问题，说明用户基数大，对生产可用性要求高。
- **低活跃/停滞**：DeepSeek Reasonix 过去 24 小时无任何 Issues/PR/Release，社区关注度极低，不建议作为关键依赖选型。

## 6. 值得关注的趋势信号

1. **安全过滤与正常开发工作流的摩擦加剧**  
   Claude Code 的 Opus 4.8 对嵌入式固件调试误报、Gemini CLI 的 MCP OAuth Token 重放风险、OpenCode 的 Fork PR 安全加固，均表明“安全即功能”已成为核心设计约束。开发者选型时应重点评估工具的误报机制、策略可配置性及审计能力。

2. **多代理协作从“功能请求”转向“架构基础设施”**  
   OpenCode 的 Agent Widgets、Gemini CLI 的 Subagent 可观测性、Claude Code 的会话交接需求，显示单代理模式已无法满足复杂工程任务。未来 CLI 工具的竞争力将取决于子代理调度、上下文隔离与跨代理状态同步能力。

3. **桌面端 CLI 化与 CLI 桌面端化双向融合**  
   Codex、Claude Code、Hermes 均在推动 Electron/原生桌面应用与 CLI 能力的深度融合（Remote Control、TUI 与 GUI 并存）。对于需要在服务器与本地桌面间切换的开发团队，跨端会话一致性将成为选型的决定性因素。

4. **企业级权限模型成为标配**  
   Claude Code 的组织登录、OpenClaw 的会话级细粒度邀请、Hermes 的治理门禁与审计轨迹，表明 AI CLI 工具正从“个人效率工具”向“团队协作平台”转型。企业采购应优先考虑支持 RBAC、会话隔离与审计日志的工具。

**决策建议**：若追求企业级稳定性与组织管理，Claude Code 与 OpenAI Codex 更成熟；若需要高度可定制的 Agent 工作流与 MCP 生态，OpenCode 与 Gemini CLI 迭代更快；DeepSeek Reasonix 目前社区活跃度不足，建议观望。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-21）

## 1. 热门 Skills 排行

基于 PR 活跃度与社区关注度，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简介 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers | 修复 MCP Builder 技能，适配 `mcp>=2.0.0` 中 `streamable_http_client` 的重命名及自定义 HTTP 头配置方式 | MCP 协议版本迁移导致技能失效，社区关注官方技能对新版 MCP 的兼容性 | OPEN | [#1742](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures | 修复 skill-creator 的触发评估机制，解决 Windows 下 subprocess 管道问题及运行时失败误报 | 技能创建工具的稳定性与跨平台支持，影响社区自建技能的质量 | OPEN | [#1298](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills | 新增 Notion 规格转实现技能与定量简历审计技能，将产品/技术规格拆解为可执行的 Notion 任务 | 企业级文档转代码工作流自动化需求强烈 | OPEN | [#1245](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1980 webapp-testing: avoid shell=True in with_server.py | 移除 Web App 测试技能中 `subprocess.Popen(shell=True)` 的命令注入风险 | 技能脚本安全性（CWE-78），社区对供应链安全日益敏感 | OPEN | [#1980](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 fix(docx): report LibreOffice timeout as an error and verify the output | 修复 DOCX 技能中 LibreOffice 超时被误报为成功的问题，增加输出校验 | 文档处理技能的可靠性与错误处理机制 | OPEN | [#1792](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 feat(skills): add proofcore-contract-auditor for smart contract notarization | 新增 Web3 智能合约审计技能，对 Solidity/Rust 合约进行静态分析并将审计证明锚定到 TON 区块链 | 区块链/智能合约安全审计是社区新兴关注领域 | OPEN | [#1771](https://github.com/anthropics/skills/pull/1771) |
| 7 | #525 Add pyxel skill for retro game development | 新增 Pyxel 复古游戏开发技能，涵盖实现、头less 运行、帧检测与状态验证 | 游戏开发与交互式多媒体技能的社区需求 | OPEN | [#525](https://github.com/anthropics/skills/pull/525) |
| 8 | #1681 fix(skill-creator): support direct execution of package_skill.py and update usage paths | 修复 skill-creator 打包脚本直接执行失败及过时的引用路径 | 技能打包与分发流程的易用性，影响社区技能贡献门槛 | OPEN | [#1681](https://github.com/anthropics/skills/pull/1681) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并至主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进方向如下：

1. **工作流自动化与企业协作**
   - 组织内技能共享机制（Issue #228）：用户期望在 Claude.ai 内直接实现组织级技能共享，而非手动通过 Slack/Teams 传递 `.skill` 文件。
   - Notion 规格转实现（PR #1245）：将产品/技术文档自动拆解为可执行任务，体现对文档到代码流水线的需求。

2. **代码审查与安全审计**
   - 智能合约审计（PR #1771）：针对 Solidity/Rust 的静态分析与区块链锚定证明。
   - Agent 治理模式（Issue #412）：策略执行、威胁检测、信任评分与审计追踪，关注 AI Agent 系统的安全边界。

3. **测试生成与质量门禁**
   - 技能触发评估可靠性（Issue #556、#1352）：`run_eval.py` 触发率为 0 且多 worker 下 UUID 交叉匹配导致误报，社区急需可信的技能触发与评估基础设施。
   - 推理质量门禁流水线（Issue #1385）：预任务校准 → 对抗审查 → 交付验证的三门质量门禁。

4. **文档处理与排版质量**
   - DOCX/XLSX/PPTX 系列技能的稳定性修复（PR #1792、#2019、#1975）：文档技能是社区高频使用场景，但存在超时误报、外部链接解析错误等问题。
   - 文档排版质量控制（PR #514）：孤行词、寡妇段落、编号错位等 AI 生成文档的排版问题。

5. **账户与数据管理**
   - 账户邮箱修改机制（Issue #1143）：防止工作区数据丢失，与竞品（OpenAI/Codex）功能对齐，获得较高点赞（18 👍）。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，尚未合并，可能近期落地：

- **#1681 fix(skill-creator): support direct execution of package_skill.py**  
  最近更新于 2026-11-19，直接影响社区技能打包与分发流程，修复后将降低贡献门槛。  
  [链接](https://github.com/anthropics/skills/pull/1681)

- **#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills**  
  更新于 2026-10-15，涉及企业级文档转代码工作流，社区关注度持续。  
  [链接](https://github.com/anthropics/skills/pull/1245)

- **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client**  
  更新于 2026-10-08，适配 MCP 2.x 协议，对依赖 MCP 的技能生态具有基础设施意义。  
  [链接](https://github.com/anthropics/skills/pull/1742)

- **#1980 webapp-testing: avoid shell=True**  
  更新于 2026-11-01，修复命令注入漏洞，安全类修复通常优先级较高。  
  [链接](https://github.com/anthropics/skills/pull/1980)

- **#1298 fix(skill-creator): isolate trigger evals**  
  更新于 2026-09-16，解决跨平台触发评估失效，是 skill-creator 可用性的关键修复。  
  [链接](https://github.com/anthropics/skills/pull/1298)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可信、安全、可跨组织共享的技能基础设施，并将 AI 能力从单次对话扩展到企业级文档流水线、代码审计与自动化测试等可落地的业务场景。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-21  
**数据来源**: github.com/anthropics/claude-code

---

## 1. 今日速览

Claude Code 发布 v2.1.330，引入企业组织登录支持及内置图表绘图模组 `easel`。社区围绕桌面端自动更新导致远程会话中断、Git Worktree 钩子路径覆盖、以及 Opus 4.8 安全过滤对嵌入式开发的误报等问题展开广泛讨论，安全与稳定性成为当前开发者关注的核心。

---

## 2. 版本发布

### v2.1.330

- **企业组织登录**：`claude auth login` 后，Claude Code 会自动应用 Anthropic Enterprise Admin Console 中组织的设置，并使用其云服务商或网关。
- **内置 `easel` 模组**：新增可绘制图表的内置模组，支持在请求时及 MCP 指标结果中生成图表。

[查看完整 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.330)

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 关注理由 |
|---|------|------|---------|----------|
| [#95364](https://github.com/anthropics/claude-code/issues/95364) | macOS 桌面端自动更新（“隐秘更新”）在用户离开时退出并重启应用，导致所有 Remote Control 会话断开 | OPEN | 22 / 23 | **最高优先级稳定性问题**。影响日常使用 Remote Control 的开发者，会话丢失直接中断工作流。 |
| [#88747](https://github.com/anthropics/claude-code/issues/88747) | Worktree 创建将绝对 `core.hooksPath` 写入 `config.worktree`，导致 worktree 运行主检出的钩子 | OPEN | 21 / 1 | Git 工作流核心问题，可能导致意外的钩子执行，影响多 worktree 并行开发。 |
| [#27474](https://github.com/anthropic/claude-code/issues/27474) | `claude --worktree` 覆盖 `$GIT_COMMON_DIR/config` 中的 `core.hooksPath` | OPEN | 17 / 17 | 长期未解决的 Worktree 配置污染问题，社区关注度持续高涨。 |
| [#99217](https://github.com/anthropic/claude-code/issues/99217) | 插件 `ui.render`（AbovePrompt/Pane）在桌面/iOS Remote Control 视图中不渲染 | OPEN | 13 / 12 | 跨平台一致性问题，限制了插件在远程协作场景下的可用性。 |
| [#94247](https://github.com/anthropic/claude-code/issues/94247) | Gmail 连接器将消息正文中的 URL 和裸域重写为 google.com/url 跳转链接 | OPEN | 10 / 13 | 集成可用性问题，影响邮件草稿的链接可读性和可点击性。 |
| [#98937](https://github.com/anthropic/claude-code/issues/98937) | [FEATURE] 从 Claude Code CLI 一键将会话交接给队友 | OPEN | 7 / 0 | 协作功能需求，反映团队对会话状态迁移和知识交接的强烈需求。 |
| [#111275](https://github.com/anthropic/claude-code/issues/111275) | macOS 上 Claude for Microsoft 365 Office 插件安装后数秒内消失 | OPEN | 5 / 0 | 新报告（11-20），涉及 Office 生态集成稳定性，可能与桌面端/Cowork 会话冲突。 |
| [#108098](https://github.com/anthropic/claude-code/issues/108098) | AskUserQuestion 隐藏同一轮中助手写入的文本，用户仅看到对话框 | OPEN | 4 / 0 | TUI 交互缺陷，影响多模态输出和用户确认流程的体验。 |
| [#101895](https://github.com/anthropic/claude-code/issues/101895) | 桌面端“允许站点”对话框拒绝所有域名，提示“被组织策略阻止” | OPEN | 3 / 1 | 跨平台（Linux/Windows）策略配置问题，阻碍个人用户使用内置浏览器工具。 |
| [#110184](https://github.com/anthropic/claude-code/issues/110184) | 隐私模组误报包含入站邮件头名称的本地脚本 | OPEN | 3 / 1 | 安全过滤误报问题，影响本地自动化脚本的正常执行。 |

> **补充观察**：近期同一用户 @sworrl 提交的多个嵌入式固件/单片机调试问题（#94161–#94167）因 Opus 4.8 安全过滤误报被标记为 `session-halted`，虽已关闭，但反映出安全策略对底层硬件开发场景的过度拦截，值得团队持续关注。

---

## 4. 重要 PR 进展

过去 24 小时内仓库仅有 **1 个** 更新的 Pull Request：

| # | 标题 | 作者 | 状态 | 说明 |
|---|------|------|------|------|
| [#111198](https://github.com/anthropic/claude-code/pull/111198) | 不在来自 Fork 的拉取请求上运行 @claude 提及 | @mhegazy | OPEN | **安全加固**：防止 Fork 仓库的 PR 通过 `@claude` 提及触发未经审查的代码执行，降低供应链攻击面。 |

> 由于近期 PR 活动较少，社区讨论主要集中在 Issue 反馈与 Bug 报告上。

---

## 5. 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

1. **跨平台会话与远程协作**  
   Remote Control 在桌面/iOS 上的插件 UI 渲染缺失（#99217）、会话交接一键化需求（#98937）、自动更新导致会话中断（#95364），表明开发者希望在多设备间获得无缝、可恢复的协作体验。

2. **IDE 与编辑器集成深化**  
   VS Code 相关问题（会话列表焦点高亮 #94324、include/exclude 切换恢复 #94347）以及 Office 插件稳定性（#111275），显示社区对主流 IDE/办公软件集成的完善度有较高期待。

3. **安全过滤与误报优化**  
   隐私模组误报本地脚本（#110184）、Opus 4.8 对嵌入式调试的过度拦截（#9416x 系列）、Gmail URL 重写（#94247），反映安全机制与正常开发工作流之间仍存在摩擦。

4. **Git 工作流与多环境支持**  
   Worktree 钩子路径污染（#88747、#27474）、Bash 权限走行器对嵌套命令替换的处理（#94350），表明在复杂 Git 仓库和多环境开发场景下，Claude Code 的工具链兼容性仍需打磨。

---

## 6. 开发者关注点（痛点与高频需求）

### 核心痛点
- **稳定性**：桌面端自动更新在无人值守时强制重启，导致 Remote Control 会话丢失（#95364）。
- **配置污染**：`--worktree` 模式下对 Git 全局/共享配置的覆盖行为（#88747、#27474）。
- **安全误报**：网络安全过滤对嵌入式固件调试、本地脚本执行的误拦截，导致会话中断（#9416x 系列、#110184）。

### 高频需求
- **协作能力**：一键会话交接、队友协作（#98937）。
- **插件生态**：跨平台插件 UI 渲染一致性（#99217）、MCP OAuth 持久化（#94321 已关闭但反映需求）。
- **成本可见性**：中途成本修正后模型批量发起 MCP 调用导致超支（#94330 已关闭），用户希望有更细粒度的支出确认与节流机制。

---

**数据注**：本日报基于 2026-11-21 的 GitHub 仓库活动生成，Issues 共 49 条更新，PR 共 1 条更新。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-21  
**来源**: github.com/openai/codex

---

## 1. 今日速览

Codex 近期发布了 `rust-v0.171.0` 稳定版，引入 GPT-6.2 Sol/Astra 模型并将 TUI 工作区设为默认；同时连续推送了多个 `0.173.0-alpha` 预览版。社区今日高度集中在 macOS 桌面应用的启动崩溃（`NSUnknownKeyException`）、Windows 项目/会话丢失，以及跨账号协作、外部事件注入等功能需求上。

---

## 2. 版本发布

### rust-v0.171.0（稳定版）
- **新模型支持**：将 GPT-6.2 Sol 和 Astra 加入模型目录，Sol 设为默认目录选项（#62106）
- **TUI 工作区默认启用**：内置可搜索的文档预览、图片预览及子代理转录，与主对话并排展示（#61352、#61888、#61889、#61919 等）

### rust-v0.173.0-alpha.1 / .2 / .3
- 连续发布三个 Alpha 预览版，具体变更未在发布说明中详述，建议关注后续 Changelog。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 评论/👍 | 核心问题 | 为什么重要 | 链接 |
|---|------|---------|----------|------------|------|
| #57101 | Windows Computer Use：截图后捕获访问权和金/黄色边框未关闭 | 74 / 13 | Windows 端 Computer Use 插件在截图产生后，摄像头/屏幕捕获权限及显示边框持续占用 | 评论数最高，涉及隐私与系统资源泄露，影响 Windows 用户体验 | [查看](https://github.com/openai/codex/issues/57101) |
| #62650 | macOS Codex App 26.1117.31558 在壁纸色调回退时启动崩溃 | 52 / 16 | 受影响壁纸配置下启动即退出，甚至连 Apple 自带壁纸也触发 | 启动阻塞型回归，影响广泛，需紧急修复 | [查看](https://github.com/openai/codex/issues/62650) |
| #62683 | macOS 26.1117.31558 启动崩溃：NSUnknownKeyException: valueForUndefinedKey: Desktop | 15 / 2 | Electron 主窗口初始化后，Objective-C 桥接抛出未定义键异常 | 与 #62650 同版本集中爆发，macOS 稳定性主要矛盾 | [查看](https://github.com/openai/codex/issues/62683) |
| #62716 | macOS App 每次启动均崩溃：NSUnknownKeyException 'Desktop' | 5 / 0 | 同上异常，用户在 Apple Silicon macOS 27.3 Beta 上复现 | 说明该崩溃在新系统版本上也存在，兼容性风险 | [查看](https://github.com/openai/codex/issues/62716) |
| #58677 | macOS 桌面版：创建聊天后“完全访问”权限控制消失 | 25 / 4 | 新建对话显示“完全访问”，进入已有对话后权限控制整体缺失 | 涉及沙盒权限与数据访问边界，安全与合规敏感 | [查看](https://github.com/openai/codex/issues/58677) |
| #42695 | 会话压缩期间可能复活过时指令，导致执行报告错误 | 25 / 1 | `send_message_to_thread` 触发的自动压缩后，代理回退至已完成的旧指令 | 直接影响任务正确性，属于核心执行逻辑缺陷 | [查看](https://github.com/openai/codex/issues/42695) |
| #61294 | Windows 更新后本地 Codex 项目消失，旧聊天仍可访问 | 13 / 1 | 更新后本地项目丢失，聊天历史未受影响 | 数据丢失类问题，用户关注度高 | [查看](https://github.com/openai/codex/issues/61294) |
| #57674 | macOS 云端线程就绪状态无限重试，尽管云端线程可读 | 11 / 0 | 桌面端反复报告 `thread placement not found`，部分 `thread/read` 返回访问拒绝 | 云端同步与就绪协议异常，影响多客户端协作 | [查看](https://github.com/openai/codex/issues/57674) |
| #60974 | Windows WSL 启动策略检查跳过 CLI 重定位，执行不可执行的 WindowsApps 二进制文件 | 11 / 4 | WSL 环境下启动失败，策略读取协议异常 | 跨平台（Windows+WSL）启动链路问题 | [查看](https://github.com/openai/codex/issues/60974) |
| #33556 | 功能请求：将外部/异步事件作为回合注入可见会话 | 7 / 7 | 目前仅支持 headless 远程控制，无法向可见会话注入外部事件 | 社区高度赞同（👍7），指向自动化与工作流集成方向 | [查看](https://github.com/openai/codex/issues/33556) |

---

## 4. 重要 PR 进展（精选 10 条）

以下 PR 均于 2026-11-20 更新，大部分由 `copyberry[bot]` 提交，多为自动化合并或基础设施改进：

| # | 标题 | 功能/修复内容 | 链接 |
|---|------|--------------|------|
| #62865 | Defer Windows sandbox owner restoration until sign-in | Windows 沙盒服务在登录前延迟恢复会话所有者，避免缺失会话或令牌导致失败 | [查看](https://github.com/openai/codex/pull/62865) |
| #62864 | Keep agent concurrency guidance when native tools are disabled | 禁用原生多代理工具时，保留代理并发数量指导，避免主机端准入限制丢失 | [查看](https://github.com/openai/codex/pull/62864) |
| #62863 | Ask the Responses API to omit the echoed tool catalog | 通过 `x-codex-exclude: tools` 请求头要求 Responses API 不回显工具目录，减少冗余 | [查看](https://github.com/openai/codex/pull/62863) |
| #62859 | Define the startup OAuth protocol for config servers | 为配置服务器启动 OAuth 协议定义 `target` 字段，支持 `configServer` 目标 | [查看](https://github.com/openai/codex/pull/62859) |
| #62858 | Keep Cloud threads current in the Agents overview | 利用云端流通知更新代理概览中的线程状态，解决 TUI 无对话流时状态过期问题 | [查看](https://github.com/openai/codex/pull/62858) |
| #62857 | Defer built-in Default mode instructions until after Plan mode | 仅在线程使用 Plan 模式后才注入内置 Default 模式指令，避免冗余提示 | [查看](https://github.com/openai/codex/pull/62857) |
| #62854 | Specialize OpenTelemetry providers for HTTP traces and metrics | 为 HTTP 追踪和 Statsig 指标分别专用 OpenTelemetry 提供商，减少未使用信号的构建开销 | [查看](https://github.com/openai/codex/pull/62854) |
| #62852 | Limit guardian response resampling to one retry | 守护者响应重新采样限制为一次重试，防止重复模型请求导致回合无法结束 | [查看](https://github.com/openai/codex/pull/62852) |
| #62849 | Reduce allocations when preparing tool schemas and catalogs | 工具 Schema 预检和 Responses Lite 目录构建时减少克隆与 JSON 缓冲区分配 | [查看](https://github.com/openai/codex/pull/62849) |
| #62846 | Return an assessment for explicit Guardian reviews | 显式 Guardian 审查请求必须返回非空评估，确保调用方获得审查 verdict | [查看](https://github.com/openai/codex/pull/62846) |

---

## 5. 功能需求趋势

从近期 Issues 中可提炼出社区关注的四个主要功能方向：

1. **跨平台与多端协作**  
   - 跨账号团队项目、共享代理上下文与交接（#48339）  
   - 本地聊天跨平台迁移（Windows/macOS/Linux）(#47087)  
   - 云端线程删除与生命周期管理（#50618）

2. **外部事件与自动化集成**  
   - 向可见会话注入异步事件（文件监听、Webhook、消息通知）(#33556)  
   - VS Code Remote SSH 重连后线程锁定与只读历史交接（#46936）

3. **IDE 与编辑器生态**  
   - VS Code 扩展远程 SSH 稳定性（#46936）  
   - MCP 连接器（如 Notion）工具发现与运行时不一致（#19924）

4. **性能与资源管控**  
   - 长对话 + 侧边栏 UI 卡顿（#59614）  
   - Windows 下虚拟内存异常占用导致系统重启（#38877）

---

## 6. 开发者关注点

**高频痛点：**

- **macOS 启动崩溃**：版本 `26.1117.31558` 集中出现 `NSUnknownKeyException` 导致无法启动，已有多个独立 Issue 汇报，是当前最高优先级的稳定性问题。
- **Windows 项目/会话丢失**：更新后本地项目消失、全局状态 JSON 损坏导致置顶项目丢失，涉及用户数据可靠性。
- **Computer Use 权限泄露**：Windows 端截图后摄像头/屏幕捕获及边框未释放，隐私与资源占用问题引发广泛讨论。
- **会话压缩与上下文一致性**：自动压缩可能导致代理回退到过时指令，影响任务执行正确性。
- **云端同步就绪协议**：云端线程就绪状态无限重试、访问被拒，影响多客户端（桌面/CLI/Web）协作体验。

**建议后续跟踪

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-21)

## 1. 今日速览

Gemini CLI 今日发布夜间版本 `v0.71.0-nightly.20261120`，修复了模板占位符中 `$` 字符的转义问题，并新增 `/stats heatmap` 子命令用于查看每日 Token 使用热图。社区围绕 **Subagent 稳定性**、**MCP 安全** 及 **跨平台兼容性（Windows/Android/Wayland）** 展开广泛讨论，多个 P1 级 Bug 仍待修复，开发者对代理挂起、OAuth Token 重放及工具调用 UI 可见性等问题关注度较高。

---

## 2. 版本发布

**v0.71.0-nightly.20261120.gd4cb1713f**  
[发布页面](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0-nightly.20261120.gd4cb1713f)

- **fix(core,cli)**: 修复模板占位符替换过程中字面量 `$` 字符被错误处理的问题（@jesussamuel-byte，[PR #30136](https://github.com/google-gemini/gemini-cli/pull/30136)）
- **feat(cli)**: 新增 `/stats heatmap` 子命令，用于查看每日 Token 使用热图（@jvargassanchez-dot）

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 评论 | 关注理由 | 链接 |
|---|------|------------|------|---------|------|
| #22323 | Subagent recovery after MAX_TURNS 报告为 GOAL 成功，掩盖中断 | P1 / Bug | 13 | 子代理在达到最大轮次限制后仍上报成功状态，导致中断被隐藏，影响任务可靠性。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent 挂起 | P1 / Bug | 8（👍8） | 通用代理在处理简单操作（如创建文件夹）时无限期挂起，严重影响可用性。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | 利用模型 Bash 亲和力，通过零依赖 OS 沙箱与后执行意图路由 | P2 / Enhancement | 9 | 探索让模型更安全地使用原生 POSIX 工具，提升代码库探索与编辑能力。 | [查看](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | 评估 AST 感知文件读取、搜索与映射的影响 | P2 / Feature | 7 | 探索基于 AST 的精确代码读取，以减少 Token 浪费并提升导航精度。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini 不足够使用 Skills 和 Sub-agents | P2 / Bug | 7 | 模型在相关任务中未主动调用自定义技能和子代理，需显式指令才触发。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #30391 | 存储的 MCP OAuth Token 会重放到重定向的服务器 URL，无 URL 检查和再同意 | 待分级 | 4 | 涉及 MCP 服务器重定向时的安全风险，Token 可能被重放至恶意地址。 | [查看](https://github.com/google-gemini/gemini-cli/issues/30391) |
| #21983 | browser subagent 在 Wayland 下失败 | P1 / Bug | 4（👍1） | 浏览器子代理在 Wayland 环境下无法正常工作，影响 Linux 桌面用户。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #24246 | 工具数量超过 128 个时出现 400 错误 | P2 / Bug | 3 | 工具列表过大导致请求失败，需更智能的工具作用域限制。 | [查看](https://github.com/google-gemini/gemini-cli/issues/24246) |
| #22186 | get-shit-done 输出钩子导致崩溃 | P1 / Bug | 3 | 输出钩子在打印用户摘要时导致 CLI 崩溃，影响工作流结束体验。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22186) |
| #22672 | 代理应阻止/劝阻破坏性行为 | P2 / Feature | 3（👍1） | 模型可能执行 `git reset --force` 等危险操作，需要更强的安全防护机制。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22672) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|---------|------|
| #30390 | fix(core): Windows 上引用 IDE CLI 命令路径 | OPEN | 修复 `/ide install` 在 VS Code 等默认安装路径（含空格）下失败的问题。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30390) |
| #30094 | fix(cli): 在 UI 状态中显示执行中的 Subagent 工具调用 | OPEN | 修复非根调度器的工具调用过滤问题，确保 Subagent 的读取/搜索等调用在 UI 中可见。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30094) |
| #30389 | fix(cli): 恢复最近活跃会话而非最近启动会话 | CLOSED | 修复 `gemini --resume latest` 按 `startTime` 排序导致打开错误会话的问题。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30389) |
| #30376 | fix(cli): Windows 展示主目录相对路径（波浪号和反斜杠） | CLOSED | 修复 `~\...` 路径在 Windows 上未展开，导致策略路径、扩展注册表等指向错误位置。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30376) |
| #30370 | fix(core): 处理 `dir/**` 模式下的嵌套 `.gitignore` 否定 | CLOSED | 修复 `GitIgnoreParser` 在嵌套 `.gitignore` 下错误忽略被重新包含的文件。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30370) |
| #30268 | fix(core): 在污点和构建文件检查中尊重活跃 YOLO 模式 | OPEN | 让 `--approval-mode=yolo` 在交互式和无头运行中不再被确认提示或策略拦截中断。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30268) |
| #30212 | feat(core): 添加可配置的每个工具调用超时（tools.callTimeout） | OPEN | 新增 `tools.callTimeout` 设置（秒），超时后工具调用以可恢复错误结束，模型可切换方案。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30212) |
| #30104 | fix(cli): `/skills link` 后刷新斜杠命令 | OPEN | 修复链接新技能后斜杠命令列表未及时更新的问题。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30104) |
| #30156 | fix(telemetry): 在 OTel SDK 就绪前缓冲聊天压缩事件 | CLOSED | 修复 `logChatCompression` 在 OTel SDK 初始化前直接发送指标导致遥测丢失的问题。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30156) |
| #30154 | fix(cli): 进入 ACP 模式前刷新缓冲的 stdio | CLOSED | 修复 ACP 模式下 stderr 警告（如 `AfterAgent` 钩子失败）因缓冲未刷新而丢失的问题。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30154) |

---

## 5. 功能需求趋势

从近期 Issues 和 PR 中可观察到以下社区关注方向：

1. **Subagent 可观测性与稳定性**  
   多个 Issue 指出 Subagent 状态上报不准确（如 MAX_TURNS 仍报成功）、UI 中不可见工具调用、轨迹无法通过 `/chat share` 分享等，社区希望增强子代理的透明度与可恢复性。

2. **跨平台兼容性（Windows / Android / Wayland）**  
   近期多个修复集中在 Windows 路径处理（空格、波浪号、反斜杠）、Android/Termux 下 ripgrep 回退，以及 Wayland 下的浏览器子代理崩溃，说明跨平台支持仍是痛点。

3. **MCP 与安全**  
   OAuth Token 重放缺陷（#30391）引发对 MCP 认证安全的关注，社区期待更严格的 URL 校验与再同意机制。

4. **工具调用治理与超时控制**  
   针对工具数量过多导致 400 错误、单个工具调用无限期阻塞等问题，社区推动可配置的 `tools.callTimeout` 与更智能的工具作用域限制。

5. **代码库理解能力提升**  
   AST 感知的文件读取、搜索与映射（#22745、#22746）以及“战术式提取”（#19561）等提案，反映开发者希望降低 Token 消耗并提升代码导航精度。

---

## 6. 开发者关注点

- **代理挂起与崩溃**：Generalist agent 无限期挂起（#21409）、get-shit-done 钩子导致崩溃（#22186）是影响核心体验的高优先级 Bug。
- **子代理使用不足**：模型在相关任务中未主动调用 Skills/Sub-agents（#21968），开发者期待更智能的自动代理路由。
- **破坏性操作防护**：缺乏对 `git reset --force` 等危险命令的拦截或警告机制（#22672）。
- **Windows 路径与特殊环境**：含空格的 IDE 路径、主目录相对路径解析、Android

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报
**日期**: 2026-11-21  
**数据来源**: github.com/anomalyco/opencode

---

## 1. 今日速览

过去24小时 OpenCode 社区无新版本发布，但活跃度保持在较高水平：8 个 Issue 更新（其中 4 个仍为开放状态），50 个 PR 更新（20 个公开列表中，约半数仍为 OPEN 状态）。核心关注点集中在 **Desktop 端跨平台兼容性（macOS/Windows/Linux）**、**MCP 协议增强**、**TUI 交互体验** 以及 **Agent 协作与子代理机制** 四个方向。

---

## 2. 版本发布

过去24小时内无新版本 Release。

---

## 3. 社区热点 Issues（10 个）

以下按更新时间与社区影响力筛选，包含全部 8 个最新 Issue 及 2 个高关注度的历史 Issue：

| # | 标题 | 状态 | 核心内容 | 为什么重要 | 链接 |
|---|------|------|----------|------------|------|
| #65281 | desktop: no Polish spellcheck suggestions when en-US is enabled alongside pl on Windows | OPEN | Windows 上同时启用 en-US 和 pl 时，波兰语拼写错误仅显示红色下划线，右键菜单无波兰语修正建议 | 暴露了多语言 Hunspell 字典协同缺陷，影响非英语区用户体验 | https://github.com/anomalyco/opencode/issues/65281 |
| #65251 | plugin-recorded compaction result renders an unlabeled compaction row in the TUI | OPEN | 插件通过 `result` 返回压缩内容时，TUI 仅绘制分割线，行内容为空（无标签、无摘要、无用量） | 直接影响插件生态与 TUI 会话压缩功能的可用性，开发者需修复渲染逻辑 | https://github.com/anomalyco/opencode/issues/65251 |
| #65279 | session.interrupt reports every caller as reason="user", including opencode-initiated stops | OPEN | 公开 `session.interrupt` API 发布的中断事件全部标记为 `reason: "user"`，包括系统自发停止 | SDK API 语义不准确，影响上层应用对中断来源的判断与处理 | https://github.com/anomalyco/opencode/issues/65279 |
| #65277 | core(subagent): parent gemini-4-neon hallucinates `<subagent state="completed">` blocks | OPEN | 父会话使用 `opencode/gemini-4-neon` 时，子代理运行期间会幻觉生成伪 XML 子代理状态块及原始 `user`/`model` 分隔符 | 涉及核心模型行为与子代理协作机制，可能导致会话上下文污染 | https://github.com/anomalyco/opencode/issues/65277 |
| #65276 | Additional Context: Agents Should Be Able to Collaborate Autonomously Without Using the User as a Message Relay | CLOSED | 社区强烈支持 Agent 之间自主协作，无需用户充当消息中继 | 反映社区对多代理协作（Multi-Agent Collaboration）的高度关注，已进入产品讨论阶段 | https://github.com/anomalyco/opencode/issues/65276 |
| #65278 | Desktop: Inbox session row content paints above the sidebar list, inside the 8px drag inset | CLOSED (INVALID) | macOS OpenCode Desktop 2.3.2 中，Inbox 会话行内容偶尔绘制在侧边栏容器之上，出现在窗口顶部拖拽区内 | 桌面端 UI 渲染缺陷，虽标记为 INVALID 但提示跨平台适配仍需打磨 | https://github.com/anomalyco/opencode/issues/65278 |
| #52067 | [triaging] The `edit` tool intermittently reports "Could not find oldString" | CLOSED | `edit` 工具间歇性报告找不到 `oldString`，尽管文本确实存在；且仅前导空格不同的字符串对被误判为相同 | 核心文件编辑工具稳定性问题，曾有 3 个社区赞同，影响日常代码修改流程 | https://github.com/anomalyco/opencode/issues/52067 |
| #41518 | gpt-5.6-luna 经 OpenCode Go 中继访问返回 403: "This model is not available in your region" | CLOSED | 通过 OpenCode Go 中继访问 `gpt-5.6-luna` 返回 403 区域限制错误 | 涉及模型代理与区域合规，对依赖中继访问海外模型的用户有直接影响 | https://github.com/anomalyco/opencode/issues/41518 |

---

## 4. 重要 PR 进展（10 个）

从过去24小时更新的 50 个 PR 中筛选，重点关注功能新增与核心修复：

| # | 标题 | 状态 | 功能/修复内容 | 链接 |
|---|------|------|--------------|------|
| #64784 | release: promote dev to production | OPEN | 将 `dev` 提升至 `production`，包含 Tidepool Alpha Free 和 Gemini 4 Neon 的控制台文档，以及核心、App 和 CLI 变更 | https://github.com/anomalyco/opencode/pull/64784 |
| #65261 | [contributor] feat(core): agent widgets | OPEN | Agent 可在会话中展示交互式组件（PsychoScript 模板 + JSON 数据），由各客户端原生渲染 | https://github.com/anomalyco/opencode/pull/65261 |
| #65282 | feat(mcp): negotiate the newest protocol by default | OPEN | MCP 服务器未设置 `protocol` 时默认协商最新协议（2026-07-28），而非使用 legacy `initialize` 握手 | https://github.com/anomalyco/opencode/pull/65282 |
| #65271 | feat(mcp): mirror event subscription arguments into Mcp-Param headers | OPEN | 实现 MCP Events beta (SEP-3415) 要求的 Streamable HTTP 客户端参数镜像到 `Mcp-Param` 头 | https://github.com/anomalyco/opencode/pull/65271 |
| #65193 | fix(core): run Code Mode tools called at the top level | OPEN | 修复较弱模型在顶层调用 Code Mode 工具时的执行问题 | https://github.com/anomalyco/opencode/pull/65193 |
| #65283 | fix(core): watch PRs and pushes again after the shell exitCode rename | CLOSED | 修复因 shell 工具结果字段 `exit` 重命名为 `exitCode` 导致的 Console watch 功能中断 | https://github.com/anomalyco/opencode/pull/65283 |
| #65280 | fix(core): prefer standard model offerings by default | CLOSED | 模型发现列表中默认优先选择标准模型产品，而非替代服务层级 | https://github.com/anomalyco/opencode/pull/65280 |
| #65263 | [contributor] feat(cli): add hidden login shortcut for auth login | CLOSED | `opencode login` 作为 `opencode auth login` 的隐藏快捷方式，不出现在 `--help` 和补全中 | https://github.com/anomalyco/opencode/pull/65263 |
| #65268 | [contributor] feat(cli): add, list and remove machines | CLOSED | 新增 `opencode machine add/list/remove` 及三条配套路由，实现终端侧机器配对的服务端半部分 | https://github.com/anomalyco/opencode/pull/65268 |
| #65284 | fix(cli): allow slower curl upgrades | OPEN | 将安装器 curl 下载解压超时从五分钟放宽，避免慢网络下活跃下载被中断（修复 #65253） | https://github.com/anomalyco/opencode/pull/65284 |

---

## 5. 功能需求趋势

从 Issues 与 PR 中提炼，社区当前最关注的功能方向：

1. **多代理自主协作（Multi-Agent Collaboration）**  
   Issue #65276 明确提出 Agent 应能直接互通，无需用户充当消息中继；配合 #65277 中子代理（subagent）的幻觉问题，说明多代理架构已成为核心产品方向。

2. **MCP 协议生态增强**  
   连续多个 PR（#65282、#65271）围绕 MCP 协议协商、事件订阅头展开，显示社区正在加速构建标准化的模型上下文协议支持。

3. **桌面端跨平台体验（Desktop Cross-Platform）**  
   macOS 侧边栏渲染（#65278）、Windows 拼写检查（#65281）、Linux TUI 压缩行渲染（#65251）三大平台均有反馈，桌面端适配是短期重点。

4. **TUI 交互与外部文件引用**  
   #61299 提出支持 `@-mention` 项目目录外的文件，表明用户希望 TUI 端具备更灵活的文件引用与上下文管理能力。

5. **SDK API 语义完善**  
   #65279 中断原因分类不准确，反映开发者对公开 API 事件语义精确度的要求在提升。

---

## 6. 开发者关注点

开发者反馈中的痛点与高频需求总结：

- **核心工具稳定性**：`edit` 工具的 `oldString` 匹配偶尔失效（#52067），直接影响代码编辑可靠性，是开发者日常使用中的高频痛点。
- **模型行为与幻觉**：父代理在子代理运行期间生成伪 XML 状态块（#65277），说明特定模型（如 `gemini-4-neon）在复杂子代理场景下的提示词工程与输出约束仍需优化。
- **区域与代理访问限制**：通过 OpenCode Go 中继访问模型遇到 403 区域限制（#41518），海外模型可用性对部分用户是阻塞点。
- **桌面端 UI 细节**：macOS 拖拽区内内容误绘（#65278）、Windows 多语言拼写建议缺失（#65281），提示桌面客户端在不同操作系统上的原生适配仍有不足。
- **安装与更新体验**：CLI 安装器在慢网络下下载超时（#65284），影响新用户首次安装与现有用户升级体验。

---

**数据截止**: 2026-11-20 24:00（UTC+8）  
**报告生成**: 2026-11-21

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 | 2026-11-21

## 今日速览

Hermes Agent 于近日发布 v0.23.3 补丁版本，整合了自 v0.23.2 以来约 370 个 PR 的稳定更新，并同步推送 Canary 构建。社区今日集中反馈了多个影响部署稳定性与多模态体验的 P2 级缺陷，其中 Docker 运行时缺失模块、原生图片未按预算缩放导致 413 错误，以及 Kanban 看板状态竞争问题成为讨论焦点。与此同时，serve-to-gateway 迁移系列 PR 持续推进，仪表盘与网关架构正在经历重构。

## 版本发布

### Hermes Agent v0.23.3
- **发布日期**：2026-11-19
- **类型**：Patch 版本
- **更新内容**：该版本汇总了自 v0.23.2 以来合并的约 370 个 PR，面向 CLI、安装程序、Microsoft Store 应用、Docker 及 Hermes Cloud 提供稳定发布。完整的变更日志将随 v0.24.0 一同发布。
- **下载链接**：[GitHub Release](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.3)

### Hermes Agent Canary v0.23.3+canary.20261120T064609Z
- **发布日期**：2026-11-20
- **类型**：Canary 构建
- **说明**：面向 macOS Apple Silicon（M 系列）等平台提供桌面端安装包，适合追求最新特性的开发者尝鲜。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 为何值得关注 | 社区反应 | 链接 |
|---|------|---------|-------------|---------|------|
| #131859 | 通过 API 创建 Pull Request 报 CreatePullRequest 权限错误 | 从 Fork 仓库向主仓库创建 PR 失败，issue 创建与 Fork PR 正常 | 影响外部贡献者协作流程，已有 65 条评论，社区关注度最高 | 讨论活跃，但暂无官方修复 | [查看](https://github.com/NousResearch/hermes-agent/issues/131859) |
| #158266 | Docker 部署后每次聊天请求报 `ModuleNotFoundError: No module named 'hermes_state_runtime'` | 镜像摘要一致但运行时缺失模块，导致 OpenAI 兼容 API 全面不可用 | 直接影响 Docker 用户的生产可用性，属 P2 级部署缺陷 | 新提交，尚未收到大量反馈 | [查看](https://github.com/NousResearch/hermes-agent/issues/158266) |
| #158409 | 原生用户图片全尺寸发送且未按预算驱逐，导致 ~10 MB 封顶提供商返回 413 | 多模态对话中手机照片易超出提供商请求体积限制 | 影响多模态体验，涉及图片预算管理与自动缩放缺失 | 新提交，尚未评论 | [查看](https://github.com/NousResearch/hermes-agent/issues/158409) |
| #157274 | 运行时治理门禁 + 防篡改审计轨迹 | 缺乏统一的副作用动作策略机制与不可篡改的审计日志 | 安全与合规方向，P3 但长期重要 | 新提交，2 条评论 | [查看](https://github.com/NousResearch/hermes-agent/issues/157274) |
| #157146 | `core_lock_upgrades()` 强制 `-P` pin，导致插件上限依赖永远无法被接纳 | v0.23.2 引入的回归缺陷，插件锁定逻辑与 `uv lock -P` 交互异常 | 影响插件生态兼容性，P2 级回归问题 | 新提交，2 条评论 | [查看](https://github.com/NousResearch/hermes-agent/issues/157146) |
| #93592 | `background_review` 在主提供商失败时忽略 auxiliary `fallback_chain` 配置 | 备用链配置未被咨询，审查静默失败，`calls=0` | 影响后台审查可靠性，P2 级配置缺陷 | 已更新，7 条评论 | [查看](https://github.com/NousResearch/hermes-agent/issues/93592) |
| #156335 | Kanban 看板移除必须不孤立在途写入者 | Linux/POSIX 下 SQLite 写入竞争，COMMIT 可能报成功但未落盘 | 涉及数据一致性与并发安全，P2 | 已更新，5 条评论 | [查看](https://github.com/NousResearch/hermes-agent/issues/156335) |
| #158400 | `search_files` 缺失路径建议查询无超时，macOS 受保护文件夹下可阻塞 180s | 终端超时被占用，影响 CLI 响应性 | 性能问题，P2，macOS 用户高频触发 | 新提交，尚未评论 | [查看](https://github.com/NousResearch/hermes-agent/issues/158400) |
| #158403 | macOS 27 上 pm worker 测试因范围测试服务器监听 backlog 溢出而失败 | CI 在 Apple M4 机器上不稳定 | 影响 macOS 开发者的本地测试与 CI 稳定性 | 新提交，尚未评论 | [查看](https://github.com/NousResearch/hermes-agent/issues/158403) |
| #158405 | `desktop:all` 与 HUD 工具链测试假设 x64 Linux 主机 | arm64 Linux 上 `just check-js-ci` 失败 | 跨平台 CI 覆盖不足，P2 | 新提交，尚未评论 | [查看](https://github.com/NousResearch/hermes-agent/issues/158405) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 功能/修复说明 | 链接 |
|---|------|------|-------------|------|
| #158316 | `feat(dashboard)`: 应用内 offer 对话框 | Feature | 为 Hermes Dashboard SPA 增加 Nous Portal 内应 offer 对话框，完成桌面端与 Webapp 之后的第三个展示入口。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158316) |
| #158060 | `feat(desktop)`: 桌面端与 Webapp 应用内 offer 对话框 | Feature | 基于 `free_tier.status` 为已登录用户展示可关闭的 offer 对话框，Webapp 与桌面端共享渲染器。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158060) |
| #157430 | `feat(gateway)`: 迁移 `--backends --apply/--restore/--status` 并支持回滚 | Feature | serve-to-gateway 迁移第 6 部分，引入 per-home 运行锁与更新标记，支持旧后端安全迁移。 | [查看](https://github.com/NousResearch/hermes-agent/pull/157430) |
| #158289 | Hermes 自主调度帮助（行程、习惯、欠款回复），每个任务自行询问“Schedule this job？” | Feature | 从被动调度转为主动感知，对行程、预约、习惯及欠款回复自动建议调度，并通过卡片征求用户确认。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158289) |
| #158407 | `feat(gateway)`: 识别每轮对话的发送客户端及最近使用的附加客户端 | Feature | 让插件能够区分用户当前在哪个客户端活跃，避免向已在查看回复的设备发送重复通知。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158407) |
| #158408 | `feat(model-catalog)`: 向 OpenRouter 选择器添加 Gemini 4 Neon/Hydrogen/Carbon | Feature | 新增三款 Google Gemini 4 系列模型至 OpenRouter 精选列表，均已验证支持工具调用。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158408) |
| #158406 | `fix(compression)`: 按行首而非全文本判定 lean 章节是否存在 | Bug Fix | 修复 `ContextCompressor` 判定确定性 lean 章节时的误报问题，避免重复注入。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158406) |
| #158402 | `fix(mcp)`: 常规发现不再唤醒被有意回收的 stdio 服务器 | Bug Fix | 避免因 `idle_timeout_seconds` 或 `max_lifetime_seconds` 回收的服务器被错误重新激活。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158402) |
| #156270 | `chore(plugin-catalog)`: 将 3ds-platform 升级至 0.3.1 | Chore | 插件目录依赖更新，包含 0.3.0 特性及审查反馈的修复。 | [查看](https://github.com/NousResearch/hermes-agent/pull/156270) |
| #158300 | `chore(catalog)`: 将 nexus 重新锁定至 v0.22.65 发布提交 | Chore | 插件目录依赖重锁，同步更新 README 与图片链接。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158300) |

---

## 功能需求趋势

从近 24 小时的 Issues 与 PR 来看，社区关注的功能方向呈现以下趋势：

1. **多模态与媒体预算管理**：#158409 反映用户希望系统自动对原生图片进行缩放与预算驱逐，避免触及提供商请求体积上限（413 错误）。这表明多模态体验正成为核心痛点。
2. **自主调度与主动代理**：#158289 显示社区期待 Hermes 能基于上下文（行程、习惯、欠款回复）主动发起调度建议，而非仅被动响应指令，代理自主性正在增强。
3. **客户端感知与通知去重**：#158407 表明开发者需要网关层识别消息来源客户端，以实现更精细的通知策略，避免在多设备场景下产生干扰。
4. **新

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报
**日期**: 2026-11-21  
**数据来源**: github.com/openclaw/openclaw

---

## 1. 今日速览

今日社区围绕 **Control UI 会话侧边栏渲染异常**、**CLI 媒体消息发送失败** 以及 **会话归档与自动化链接分享** 等核心体验问题展开讨论。当前无新版本发布，但有 7 个 Issue 更新和 50 个 PR 活跃，其中多个与 Web UI、Gateway 权限隔离及插件目录相关的修复正在审核中。

---

## 2. 版本发布

过去 24 小时内 **无新版本 Release**。

---

## 3. 社区热点 Issues（精选 7 条）

以下为过去 24 小时内更新的全部 Issue，按社区关注度排序：

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #200781 | Control UI Sessions 侧边栏仅渲染 Agent 头部，无 Session 行 | OPEN | 2026.11.5 版本后，Sessions 侧边栏只显示 Agent 标题（如 `RPK-16`、`QQ 潘多拉`），不渲染 Session 行，点击 Agent 无反应，控制台无功能报错。影响 UX，已有 9 条评论。 | [查看](https://github.com/openclaw/openclaw/issues/200781) |
| #202794 | `openclaw message send --media` 在多 Agent 网关报 `AgentSelectionRequiredError` | OPEN | 文本消息可正常发送，但带 `--media` 参数时在显式多 Agent 网关失败，尽管账号绑定有效。CLI 媒体发送路径存在 Agent 解析缺陷。 | [查看](https://github.com/openclaw/openclaw/issues/202794) |
| #202787 | CLI 新增 `openclaw sessions list --archived` 列出归档会话 | OPEN | 针对 headless Gateway 或 SSH 场景，运维人员需要通过 CLI 查找归档 Session Key 用于保留审查。属 P2 级 UX 摩擦问题，需产品决策。 | [查看](https://github.com/openclaw/openclaw/issues/202787) |
| #202796 | 保存的自动化操作菜单新增“复制链接” | OPEN | 编写运行手册或交接排期时，需要直接指向自动化本身的链接，而非仅靠名称或“检查运行”链接。 | [查看](https://github.com/openclaw/openclaw/issues/202796) |
| #200795 | 迁移后的 Claw/Template 安装记录仍强制同意来源，但无管理或退役方式 | CLOSED | 2026.11.5 迁移后，`claw_installs` → `template_installs` 架构下仍强制同意来源，缺乏支持的管理/退役机制。 | [查看](https://github.com/openclaw/openclaw/issues/200795) |
| #202354 | Logs 延迟滚轮滚动可能导致 Auto-follow 未恢复 | CLOSED | 滚轮事件在读取器意图空闲截止后才到达，导致返回日志末尾时 Auto-follow 保持关闭。 | [查看](https://github.com/openclaw/openclaw/issues/202354) |
| #202357 | 冷转录放置可能将未测量的前置行引入正常流 | CLOSED | 视口初始放置完成后，可能在首次读取手势前插入更早行，导致保留行因估算误差移动。 | [查看](https://github.com/openclaw/openclaw/issues/202357) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|------|--------------|------|
| #202797 | chore(ui): refresh control ui locales | @openclaw-mantis[bot] | OPEN | 自动刷新 Control UI 本地化文件，避免绕过受保护分支检查。 | [查看](https://github.com/openclaw/openclaw/pull/202797) |
| #202784 | fix: align Plugins navigation tests with current catalog behavior | @vincentkoc | OPEN | 修复 Plugins 工作区导航测试，适配目录隐藏已安装插件及 Skills 操作标签变更。 | [查看](https://github.com/openclaw/openclaw/pull/202784) |
| #202795 | fix(ui): restore Plugins first-visit asset budget | @steipete | OPEN | 修复 Plugins 首次访问资源预算回归，将资源数从 58/57 恢复至预算内的 56。 | [查看](https://github.com/openclaw/openclaw/pull/202795) |
| #202785 | fix: keep the Gateway memory threshold internal | @vincentkoc | OPEN | 将 Gateway 资源配置模块的内存阈值设为内部，修复 Knip 依赖检查，不改变 8 GiB 阈值。 | [查看](https://github.com/openclaw/openclaw/pull/202785) |
| #202789 | refactor: unify async SQLite descriptor admission | @roboclaw-bot | OPEN | 统一普通 Worker 打开与私有暂存的 SQLite 描述符准备流程，移除无创建权限的同步文件系统路径。 | [查看](https://github.com/openclaw/openclaw/pull/202789) |
| #202654 | feat: prepare restricted connections for Session Share steering | @vincentkoc | OPEN | 为远程发布集成构建受限传输，用于 Session Share 转向，不授予设备人类身份或通用聊天/管理权限。 | [查看](https://github.com/openclaw/openclaw/pull/202654) |
| #202788 | fix: keep terminal formatting out of Meme Maker SVGs | @ZengWen-DT | OPEN | 修复 Meme Maker 从彩色终端输出复制标题时，SVG 文件包含原始控制字符导致无法打开的问题。 | [查看](https://github.com/openclaw/openclaw/pull/202788) |
| #202552 | feat: invite someone to help in one session without giving them Gateway-wide write access | @jalehman | OPEN | 支持会话所有者邀请队友协作单个会话，而无需授予整个 Gateway 的写入权限，实现细粒度权限隔离。 | [查看](https://github.com/openclaw/openclaw/pull/202552) |
| #202786 | fix: show the Template review card only when it is ready | @Patrick-Erichsen | OPEN | 修复创建 Template 时，慢速审查请求提前显示禁用状态的“Template draft”卡片，改善聊天进度可见性。 | [查看](https://github.com/openclaw/openclaw/pull/202786) |
| #202792 | fix: isolate sidebar sessions opened in managed clones | @roboclaw-bot | OPEN | 修复侧边栏 `+` 流在共享克隆的 `main` 检出上启动新会话的问题，区分“新工作区”与保存的文件夹。 | [查看](https://github.com/openclaw/openclaw/pull/202792) |

---

## 5. 功能需求趋势

从本日 Issues 与 PR 中提炼出的社区关注方向：

1. **CLI 会话管理增强**  
   用户强烈希望通过 CLI 完成更多会话运维操作，如列出归档会话（`--archived`）、在多 Agent 网关下明确指定发送 Agent 等，表明头less/SSH 运维场景需求增长。

2. **Control UI 会话侧边栏稳定性**  
   Sessions 侧边栏渲染异常（仅显示 Agent 头部、无 Session 行）是当前最高优先级的 UX 缺陷，直接影响会话发现与切换体验。

3. **细粒度权限与协作隔离**  
   多个 PR（如 #202552、#202654）聚焦于“在不授予 Gateway-wide 权限的前提下协作单个会话/会话共享”，体现企业团队对权限最小化原则的重视。

4. **自动化与模板生命周期管理**  
   “复制自动化链接”、Template 审查卡片状态修复、迁移记录退役等需求显示，用户开始关注自动化资产的分享、审计与退役流程。

5. **Web UI 性能与资源预算**  
   Plugins 首次访问资源预算、导航测试适配、本地化刷新等 PR 表明社区正在持续优化前端加载性能与目录浏览体验。

---

## 6. 开发者关注点

- **UX 摩擦点高发**：多个 Issue 标记为 `impact:ux-friction`，涉及侧边栏渲染、日志 Auto-follow、冷转录放置等，建议优先处理影响核心工作流的体验缺陷。
- **多 Agent 网关的 CLI 支持不足**：`openclaw message send --media` 在多 Agent 场景下缺乏显式 Owner 解析，文本与媒体发送路径不一致，需统一 Agent 解析逻辑。
- **迁移遗留问题**：2026.11.5 版本的 Claw/Template 安装记录迁移后，同意来源管理与退役机制缺失，可能影响现有用户的合规与资产清理。
- **审核与维护者投入**：多个 P2 级 Issue 标记 `clawsweeper:needs-maintainer-review` / `needs-product-decision`，说明社区期待维护者对归档会话 CLI、产品决策类问题给出明确回应。

---

**报告生成时间**: 2026-11-21  
**数据覆盖范围**: 过去 24 小时内更新的 Issues（7 条）与 PR（50 条，展示评论数最多的 20 条）

:::
