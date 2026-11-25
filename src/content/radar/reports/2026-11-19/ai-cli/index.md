---
title: "AI CLI 工具社区动态日报"
published: 2026-11-19
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-19

> 生成时间: 2026-11-19 09:42 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-19)

## 1. 生态全景

当前 AI CLI 工具生态正从单一模型适配向**多云、多模型、多平台协同**阶段演进，Claude Code、OpenAI Codex 等头部工具已陆续支持跨云厂商 Auto Mode 与统一连接层（gRPC/MCP/ACP）。桌面端稳定性、凭证安全与超时机制成为各工具共同的技术瓶颈，社区对“可观测、可控、可恢复”的代理执行环境需求日益迫切。整体呈现“头部快速迭代、长尾工具停滞”的两极分化态势，开发者选型需兼顾功能丰富度与平台成熟度。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues (24h) | PR (24h) | 最新 Release | 核心发布内容 |
|------|------|-------------|---------|-------------|-------------|
| **Claude Code** | anthropics/claude-code | 50 条更新 | 0 条 | v2.1.328 | 多云 Auto Mode (Opus/Sonnet 4.6)、MCP Hook `onFailure: block` |
| **OpenAI Codex** | openai/codex | ~10+ 条活跃 | 10 条合并 | rust-v0.172.0-alpha.1 | gRPC 全面迁移、MCP 结果透传、模型目录回溯 |
| **Gemini CLI** | google-gemini/gemini-cli | ~10+ 条活跃 | 10 条合并 | v0.70.0-preview.0 / v0.69.0 | `/stats heatmap` Token 热图、模板占位符转义修复 |
| **DeepSeek Reasonix** | esengine/DeepSeek-Reasonix | 0 | 0 | 无 | 过去 24 小时无活动 |
| **OpenCode** | anomalyco/opencode | 29 条更新 | 50 条活动 | 无 | 无新版本，集中修复会话存储、TUI、Mistral 工具桥 |
| **Deepseek Harness** | deepseek-ai/deepseek-harness | 0 | 0 | dsh-v0.2.2-rc.5 | DeepSeek 模型搜索不再按次计费、统一 Search API |
| **Hermes** | NousResearch/hermes-agent | 13 条 | 50 条 | Canary v0.23.2+canary.20261119 | 终端快照凭证不落盘、网关日志 thread_id、thinking 内容块路由 |
| **OpenClaw** | openclaw/openclaw | 11 条 | 50 条 | 无 | 无新版本，集中修复 Windows 插件路径大小写、Gateway 启动优化 |

> 注：部分仓库仅披露精选 Issues/PR 数，实际总量可能略高；OpenCode、Hermes、OpenClaw 均披露约 50 条 PR 活动，属高频迭代梯队。

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重叠的诉求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **桌面端稳定性与跨平台一致性** | Claude Code、OpenAI Codex、Gemini CLI、Hermes | macOS/Windows/Linux 表现不一致；Windows 窗口捕获超时、Electron 主进程卡顿、Linux 快捷键冲突等问题普遍存在 |
| **MCP/ACP 协议与连接器成熟度** | Claude Code、OpenAI Codex、Gemini CLI | MCP 调用缺乏超时与重连机制、OAuth 失效后无自动恢复、结果透传与元数据泄露风险 |
| **超长上下文与会话管理** | Claude Code、OpenCode、Gemini CLI | 自动压缩触发阈值不合理、1M 窗口模型易触发 HTTP 400、空闲会话时间戳异常导致列表错乱 |
| **凭证安全与隐私隔离** | Claude Code、Hermes、OpenClaw | 终端环境快照将密钥写入磁盘、OAuth token 过期无重连提示、macOS 本地配对令牌缺失 |
| **工具调用治理与超时控制** | Claude Code、Gemini CLI、OpenCode | 浏览器工具长时间挂起无超时、需可配置 per-tool-call timeout、破坏性操作（如 `git reset --force`）缺乏拦截 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 多云 Auto Mode、桌面端任务规划、MCP 生态 | 企业级开发者、多云环境用户 | 原生支持 Amazon Bedrock / GCP Agent Platform / Microsoft Foundry，强调跨云无缝切换与桌面端集成 |
| **OpenAI Codex** | 协议层重构 (gRPC)、Computer Use、远程协作 | AI 原生应用开发者、IDE 插件开发者 | 后端向 gRPC 统一连接层迁移，强调跨设备会话续传与第三方主机嵌入（app-server） |
| **Gemini CLI** | 子代理 (Subagent)、浏览器代理、AST 感知代码理解 | 代码密集型开发者、自动化任务编排者 | 侧重 Subagent 轨迹可见性、浏览器自动化及 Token 使用可视化（heatmap） |
| **OpenCode** | 跨平台 ACP、会话存储、模型提供商适配 | 全平台 CLI 用户、付费模型订阅者 | 侧重 ACP 协议稳定性、超长上下文压缩及多模型（DeepSeek/Mistral）API 兼容性 |
| **Hermes** | 终端安全、凭证隔离、网关性能 | 安全敏感型企业、桌面客户端用户 | 强调终端环境快照不落盘、网关元数据操作优化、Electron 桌面端性能 |
| **OpenClaw** | Gateway 稳定性、插件生态、会话状态机 | 插件开发者、自托管网关运维者 | 侧重 Gateway 启动优化、插件 peer-link 审计、会话状态机一致性 |
| **Deepseek Harness** | 模型搜索计费优化、多模型兼容 | DeepSeek 模型用户、成本敏感型开发者 | 轻量级，侧重搜索能力统一与成本降低，社区活动较低 |
| **DeepSeek Reasonix** | — | — | 过去 24 小时无活动，生态活跃度存疑 |

## 5. 社区热度与成熟度

**高热度、快速迭代梯队：**
- **OpenCode、Hermes、OpenClaw**：单日 PR 活动均达 50 条，处于密集修复与功能扩展阶段，适合追求前沿特性的早期采用者，但需承受较高的变更频率与潜在回归风险。
- **Claude Code**：Issue 更新量最高（50 条），社区反馈强烈，但 PR 合并为 0，说明维护者侧重于 Issue 分类与回复，正式代码发布节奏相对保守。

**中等热度、稳步演进梯队：**
- **OpenAI Codex、Gemini CLI**：均有版本发布与 10 条左右的 PR 合并，架构重构（gRPC 迁移、AST 感知）有明确路线图，适合生产环境试点。

**低热度、停滞或维护模式：**
- **Deepseek Harness**：仅有 RC 版本发布，无 Issues/PR 更新，社区活跃度低。
- **DeepSeek Reasonix**：过去 24 小时完全无活动，建议谨慎纳入关键路径。

## 6. 值得关注的趋势信号

1. **协议层标准化加速**：OpenAI Codex 全面迁移 gRPC、Claude Code 强化 MCP Hook 策略、Gemini CLI 完善 ACP `session/close`，表明行业正在从“点对点集成”转向“统一连接层”，开发者应优先关注支持标准协议（MCP/ACP/gRPC）的工具，以降低供应商锁定风险。

2. **桌面端成为 AI CLI 的新战场**：Claude Code、Hermes、OpenClaw 大量 Issue 集中在桌面端渲染、快捷键冲突、窗口捕获等 GUI 问题，说明 CLI 工具正在向“桌面代理”形态延伸，跨平台桌面稳定性将成为下一轮差异化竞争点。

3. **安全与可观测性提升至 P0 级别**：Hermes 围绕终端快照凭证泄露展开多个安全修复 PR，Claude Code 关注 OAuth 重连，OpenCode 关注撤销操作误删文件，反映社区对“代理操作可审计、可回滚、不泄露凭证”的要求正在从锦上添花变为刚需。

4. **超长上下文与自动压缩仍是痛点**：OpenCode 1M 上下文会话未自动压缩、Claude Code `/compact` 被中断、Gemini CLI Subagent 超过 MAX_TURN 仍上报成功，说明当前模型窗口扩张速度快于上下文管理算法成熟度，开发者在部署长会话任务时需额外做压缩与断点续传策略。

5. **多云 Auto Mode 成为头部标配**：Claude Code 已支持 Bedrock/GCP Foundry/Microsoft Foundry 多云 Auto Mode，预示未来 AI CLI 工具将不再绑定单一模型供应商，技术决策者应评估工具的多云适配能力与模型切换成本。

**决策建议**：若追求生产稳定性，优先考虑 OpenAI Codex 或 Claude Code；若需要深度定制桌面代理或 Gateway 插件，OpenCode、Hermes、OpenClaw 的迭代速度更快但需承担更高维护成本；DeepSeek Reasonix 与 DeepSeek Harness 当前社区活跃度不足，不建议作为核心依赖。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-19）

## 1. 热门 Skills 排行

以下按 PR 列表展示顺序及社区讨论活跃度筛选，涵盖官方核心技能修复与新增技能提案：

| # | Skill / PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|---|-----------|---------|------------|------|------|
| #1742 | **mcp-builder** | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入路径变更及自定义 HTTP 头配置问题 | MCP 协议版本兼容性是社区高频痛点，直接影响技能与外部服务器的连接稳定性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| #1298 | **skill-creator** | 隔离触发评估（trigger evals），修复 Windows 子进程管道 `select()` 失效及运行时失败误判 | 触发机制可靠性直接决定技能是否能被 Claude 自动调用，跨平台兼容性受关注 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| #1245 | **notion-spec-to-implementation** / **quantitative-resume-auditor** | 前者将 Notion 产品/技术规格拆解为可执行任务；后者对简历进行定量审计 | 企业知识库（Notion）到代码实现的自动化转换，以及简历筛选等 HR 自动化场景需求强烈 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| #1980 | **webapp-testing** | 移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用自动化测试技能的安全加固，社区对供应链与代码注入风险敏感 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| #1792 | **docx** | LibreOffice 超时时返回错误而非成功，并校验输出 DOCX 修订痕迹 | 文档自动化处理的可靠性与错误上报机制，影响办公自动化场景的可用性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| #1771 | **proofcore-contract-auditor** | Solidity/Rust 智能合约静态分析，并将审计证明锚定至 TON 区块链 | Web3 安全审计与链上凭证，代表社区在区块链/合约安全领域的技能扩展方向 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| #525 | **pyxel** | 复古游戏开发技能，支持 Python 游戏实现、无头输入运行、帧检测与状态校验 | 游戏开发与交互式多媒体内容生成，体现社区对创意编程技能的需求 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| #2019 | **xlsx** | 修复工作表作用域定义名称与外部链接风险检测的误报/漏报 | Excel 表格处理技能的公式解析准确性，企业数据自动化场景的核心诉求 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/2019) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并至主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼出四个最显著的新 Skill 方向：

1. **工作流自动化与企业协作**
   - 组织内技能共享（Issue #228）：用户期望在 Claude.ai 内直接实现组织级技能库共享，避免手动下载/上传 `.skill` 文件。
   - Notion 规格到实现的自动化（PR #1245）：企业知识库到代码任务的端到端转换。

2. **代码审查与安全治理**
   - 智能合约审计（PR #1771）：静态分析 + 链上凭证。
   - Agent 治理模式（Issue #412）：策略执行、威胁检测、信任评分与审计追踪。
   - 文档/简历定量审计（PR #1245）：质量门禁与合规检查。

3. **测试生成与质量保障**
   - Web 应用测试安全加固（PR #1980）：消除 `shell=True` 注入风险。
   - 触发评估可靠性（Issue #556、#1352）：`run_eval.py` 触发率为 0 及并行 worker 交叉匹配 UUID 导致的假阴性，社区亟需可信的技能触发测试框架。

4. **文档处理与多媒体生成**
   - DOCX/XLSX/PPTX 修复与增强（PR #1792、#2019、#1734、#1975）：办公文档自动化是高频场景。
   - Markdown 转视频/音频（PR #1703）：零成本多媒体内容生成。
   - 文档排版质量控制（PR #514）：孤行、寡妇段落、编号对齐等 AI 生成文档的排版问题。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且修复了核心功能缺陷或引入了新能力，可能近期落地：

- **#1742 mcp-builder**：MCP 2.0 适配是技能与外部服务器互通的基础，兼容性修复优先级高。
- **#1298 skill-creator**：触发评估隔离与 Windows 兼容性修复，直接影响新技能的可用性与跨平台支持。
- **#1245 notion-spec-to-implementation / quantitative-resume-auditor**：两个实用新技能打包提交，企业自动化场景契合度高。
- **#1980 webapp-testing**：安全修复（CWE-78），属于高优先级的漏洞类修正。
- **#1792 docx**：错误上报与输出验证，提升办公自动化技能的鲁棒性。
- **#525 pyxel**：虽创建较早但持续更新（2026-11-01 仍有活动），复古游戏开发是社区创意方向的代表性技能。

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可信、安全、可跨平台复用的企业级自动化技能体系，重点围绕 MCP 协议兼容、触发机制可靠性、办公文档/代码审计自动化以及组织内技能共享与分发。**

---

# Claude Code 社区动态日报 (2026-11-19)

## 今日速览

Claude Code 今日发布 v2.1.328，主要引入了 Claude Opus 4.6 和 Sonnet 4.6 在多云平台（Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry 及 Claude apps gateway）的 auto mode 支持，并为 `mcp_tool` hooks 新增 `"onFailure": "block"` 策略。社区活跃度保持在高位，过去24小时内有50条 Issue 更新，桌面端（Desktop）稳定性、MCP 工具超时与权限重连、以及插件 pane 渲染成为开发者关注的核心痛点。今日暂无新 PR 合并或更新。

---

## 版本发布

### v2.1.328

- **多云 Auto Mode**：为 Claude Opus 4.6 和 Sonnet 4.6 在 Amazon Bedrock、Google Cloud 的 Agent Platform、Microsoft Foundry 以及 Claude apps gateway 上添加 auto mode 支持；在无权限模式（no permission mode）下启动的交互式会话将默认进入该模式。
- **MCP Hook 失败策略**：为 `mcp_tool` hooks 新增 `"onFailure": "block"` 选项，行为与 command 和 HTTP hooks 保持一致，便于开发者更精细地控制 MCP 工具调用失败时的降级策略。

[查看完整 Release 详情](https://github.com/anthropics/claude-code/releases/tag/v2.1.328)

---

## 社区热点 Issues（精选 10 条）

以下按社区关注度与技术影响力筛选，涵盖桌面端稳定性、MCP 集成、上下文管理及插件生态等方向：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|---------|---------|------|
| #102600 | Desktop app task list: plan is skipped or never advances mid-turn | macOS 桌面端任务列表计划在对话中途被跳过或不再推进，影响多步骤任务的可追踪性。 | 4 条评论，持续跟踪中 | [查看 Issue](https://github.com/anthropics/claude-code/issues/102600) |
| #106557 | Claude Desktop (Linux): client-side MCP calls from cloud chats stall or fail | Linux 桌面端云端对话中的客户端 MCP 调用在其他对话活跃时会卡顿或失败，关联计算机后可恢复。 | 3 条评论，标记 stale | [查看 Issue](https://github.com/claude-code/issues/106557) |
| #107242 | Claude Code does not offer reconnect when a claude.ai connector's auth is invalidated | 自定义 OAuth 连接器 token 过期或撤销后，Claude Code 不提供重连提示，工具调用直接失败。 | 2 条评论，认证与 MCP 相关 | [查看 Issue](https://github.com/claude-code/issues/107242) |
| #104471 | Usage side panel for Claude Code Desktop | 请求在桌面端增加使用情况侧边栏，展示限额、自动压缩上下文、会话及可读 Token 单位。 | 2 条评论，1 👍，社区有可用 mod | [查看 Issue](https://github.com/claude-code/issues/104471) |
| #107209 | Desktop: queued task-notification dequeued during /compact | `/compact` 运行期间，排队的 task-notification 被出队并打断压缩，导致模型回复 "Compact was interrupted"。 | 2 条评论，影响核心工作流 | [查看 Issue](https://github.com/claude-code/issues/107209) |
| #107054 | Desktop: SendMessage result text misleads, held-message status stale | Windows 桌面端跨会话 SendMessage 存在送达延迟、状态显示滞后、ReadNotifications 无法查看 held 消息等问题。 | 2 条评论，涉及 46 次跨会话测量 | [查看 Issue](https://github.com/claude-code/issues/107054) |
| #106694 | Desktop Code tab: update_plan items/scope 条件依赖未在 schema 中强制表达 | `mcp__ccd_turn__update_plan` 调用缺少顶层 `scope` 时反复失败，模型错误恢复能力不足。 | 2 条评论，参数契约缺陷 | [查看 Issue](https://github.com/claude-code/issues/106694) |
| #106539 | Browser tool call stalled 23 min, no timeout; 761,578 tokens wasted | Windows 桌面端浏览器工具调用卡顿 23 分钟且无超时机制，导致 76 万余 Token 浪费。 | 2 条评论，严重资源浪费 | [查看 Issue](https://github.com/claude-code/issues/106539) |
| #106431 | Read size-refusal 误报上下文不足 | 当 Read 调用超过单次上限时，拒绝信息误导模型认为上下文已耗尽，导致模型开始节约上下文。 | 2 条评论，影响 1M 窗口模型 | [查看 Issue](https://github.com/claude-code/issues/106431) |
| #105137 | Remote Control 浏览器 pane 工具调用挂起会话 | 从 claude.ai 项目远程控制时，桌面端内置浏览器 pane 工具调用会挂起会话，最终出现 `worker_stuck`。 | 1 条评论，1 👍，跨平台远程控制痛点 | [查看 Issue](https://github.com/claude-code/issues/105137) |

---

## 重要 PR 进展

过去 24 小时内 **Claude Code 仓库无新 Pull Request 更新**（共 0 条）。社区目前的代码贡献与修复主要集中在 Issue 反馈与讨论阶段，建议开发者关注上述热点 Issue 的后续维护者回复与补丁进度。

---

## 功能需求趋势

从近 24 小时更新的 50 条 Issue 中，可提炼出以下社区功能关注方向：

1. **桌面端稳定性与状态同步**  
   大量 Issue 指向 Desktop App（macOS / Windows / Linux）的任务列表推进、消息送达状态、侧边栏预览、快捷键冲突等 UI/UX 稳定性问题，社区亟需更可靠的桌面端体验。

2. **MCP 工具链与认证重连**  
   多个 Issue 涉及 MCP 调用超时、无超时机制导致 Token 浪费、OAuth 认证失效后缺乏重连提示，表明开发者对 MCP 生态的可用性与容错能力要求更高。

3. **上下文管理与 Read/Write 工具优化**  
   上下文窗口拒绝信息误导、自动压缩被打断、上下文节约行为等问题反映出开发者希望获得更透明、更可控的上下文管理机制。

4. **插件/Mod 生态增强**  
   插件 pane 渲染延迟、SVG 交互、composer 行按钮插槽、会话级插件加载等需求集中出现，社区正在推动 Claude Desktop 向更可扩展的插件平台演进。

5. **多设备与远程控制**  
   设备标签、远程控制权限旁路、跨设备会话识别等功能请求显示出开发者在多 Mac/iPhone 场景下对 Claude Code 协作能力的期待。

---

## 开发者关注点（痛点与高频需求）

### 高频痛点
- **桌面端跨平台不一致**：macOS 与 Windows 上 Code tab 对指令的遵循程度存在差异，Linux 上快捷键与系统截图冲突且无法禁用。
- **MCP 调用缺乏超时与恢复机制**：浏览器工具调用可长时间卡顿且无超时，OAuth 失效后无自动重连提示，导致会话中断与资源浪费。
- **上下文拒绝信息不准确**：Read 工具在窗口仍有大量空闲时误报上下文不足，干扰模型决策。

### 高频功能需求
- **使用情况侧边栏**：展示 Token 消耗、限额、会话状态与自动压缩进度，使用可读单位。
- **跨会话待办事项统一视图**：一个跨会话的 "Waiting on you" 列表，聚合决策、回复、日期等待处理事项。
- **插件 pane 增强**：支持交互式 SVG、composer 行按钮插槽、会话级立即渲染，减少插件界面加载延迟。
- **多设备会话标识**：在远程控制与多设备场景下，清晰标识会话运行所在设备，避免图标混淆。

---

*本日报基于 github.com/anthropics/claude-code 过去 24 小时的 Release、Issue 与 PR 数据生成，仅供技术参考。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 (2026-11-19)

## 1. 今日速览

Codex 社区今日围绕跨平台稳定性与远程协作展开密集讨论，macOS 远程控制线程冲突（`already has an active writer`）及 Windows 计算机使用（Computer Use）窗口捕获超时成为评论量最高的两个长尾回归问题。与此同时，Rust 端发布 `rust-v0.172.0-alpha.1` 预览版，多个与 gRPC 迁移、MCP 结果透传、模型目录回溯相关的 PR 在当日合并，显示后端架构正向更统一的连接与元数据模型演进。

## 2. 版本发布

- **rust-v0.172.0-alpha.1**  
  发布了 `0.172.0-alpha.1` 预览版。目前公开信息未包含详细变更日志，建议关注后续完整 Release Notes 以了解具体改进与破坏性变更。

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #37403 | macOS 远程控制/CLI 线程回归：`already has an active writer` | 8 月更新后，macOS 桌面端无法恢复通过移动端 Remote Control 发起的 Codex CLI 线程，影响跨设备会话续传。 | 68 条评论 / 54 👍，社区讨论最活跃，属于高优先级回归缺陷。 | https://github.com/openai/codex/issues/37403 |
| #57101 | Windows Computer Use：截图后捕获访问与金色/黄色边框未关闭 | Windows 客户端（26.1021.3705.0）在截图产生的回合完成后，捕获权限及显示边框仍保持打开状态。 | 67 条评论 / 12 👍，Windows Computer Use 模块的持续性问题。 | https://github.com/openai/codex/issues/57101 |
| #60778 | iOS Codex 显示“No tasks yet”，但搜索仍可访问历史对话 | iPhone 端 Codex 界面主机状态显示绿色在线，但任务/对话列表为空，仅通过搜索可找到历史会话。 | 23 条评论 / 14 👍，移动端同步与列表渲染异常。 | https://github.com/openai/codex/issues/60778 |
| #62212 | macOS 桌面端：不支持的音频工具输出导致后续文本回合返回 HTTP 400 | macOS 27.2.1 / Apple Silicon，使用 GPT-6.2 Sol 时，音频工具输出异常后会污染后续纯文本回合。 | 19 条评论，新近报告（11-18 创建），多模态工具链稳定性问题。 | https://github.com/openai/codex/issues/62212 |
| #48504 | Windows MCP HTTP 响应解码失败，应用连接器不可用 | `codex-cli 0.158.0-alpha.2.1` 及桌面端在 Windows 11 上出现 `error decoding response body`，MCP 连接器无法使用。 | 16 条评论，涉及 MCP 协议层与网络连接性。 | https://github.com/openai/codex/issues/48504 |
| #52754 | Windows 10：Computer Use 窗口捕获超时（Notepad 与 Electron 应用） | 应用发现与可访问性文本提取正常，但截图捕获反复超时，导致本地桌面工作流无法完成。 | 15 条评论，Windows 平台 Computer Use 的典型捕获失败案例。 | https://github.com/openai/codex/issues/52754 |
| #54540 | Windows 目标与子代理工作流中反复出现“工作区路由发现超时” | Windows 客户端在目标（Goals）和子代理工作流中周期性超时，影响多步自动化任务。 | 14 条评论 / 3 👍，子代理与工作区路由模块的稳定性瓶颈。 | https://github.com/openai/codex/issues/54540 |
| #42846 | 为 Linux 桌面端添加官方 Computer Use 支持 | Linux 原生应用已可用，但 Computer Use 功能尚未开放，限制 Linux 用户的桌面操作自动化。 | 8 条评论 / 6 👍，跨平台功能对等的典型功能需求。 | https://github.com/openai/codex/issues/42846 |
| #30233 | 线程管理工具未暴露，尽管线程创建已可用 | 桌面端会话中应可通过工具搜索访问 `create_thread`、`send_message_to_thread` 等，但实际未暴露。 | 8 条评论 / 14 👍，多线程会话编排能力的缺失。 | https://github.com/openai/codex/issues/30233 |
| #23442 | `codex app-server` 硬编码 `SessionSource::VSCode`，缺少 `--session-source` 标志 | 第三方主机嵌入 Codex 时无法通过 CLI 覆盖会话来源，限制了 IDE/编辑器集成的灵活性。 | 7 条评论 / 1 👍，面向插件开发者与嵌入场景的接口限制。 | https://github.com/openai/codex/issues/23442 |

## 4. 重要 PR 进展（精选 10 条）

今日合并的 PR 多由 `@copyberry[bot]` 自动化提交，集中在协议层迁移、MCP 元数据增强、模型目录回溯及 TUI 体验优化：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #62476 | Use gRPC for all code-mode host connections | 移除传统 framed stdio 协议及其客户端/服务端，本地 Codex 启动独立主机时默认使用 `--listen grpc+stdio://`，`stdio` 别名现指向 gRPC over stdio。 | https://github.com/openai/codex/pull/62476 |
| #62474 | Send authorized connector results over Responses WebSockets | 对 Responses WebSocket 采样应用与 HTTP 采样相同的目标和账户检查，授权连接器结果才可透传，避免私有连接器体泄露。 | https://github.com/openai/codex/pull/62474 |
| #62447 | Update the `openai-docs` skill for GPT-6.2 | 将 GPT-6.2 Astra 与 Sol 请求指向共享迁移指南，替换早期指向 Astra 快速入门的 GPT-6 迁移文档。 | https://github.com/openai/codex/pull/62447 |
| #62439 | Add Windows MXC sandbox launch diagnostics | 在 Windows 沙箱运行时日志中按进程 ID 记录 MXC 启动阶段，区分文件系统助手等阶段，便于诊断启动错误与超时。 | https://github.com/openai/codex/pull/62439 |
| #57337 | [0.165.0-alpha.1.2] Backport GPT-6.1 Terra to the model catalogs | 将 GPT-6.1 Terra 回溯到 `0.165.0-alpha.1.2` 发布基线，仅在 Vertex 请求测试中出现 cherry-pick 冲突并已解决。 | https://github.com/openai/codex/pull/57337 |
| #62437 | Defer Git worktree status until the turn starts | 将 Git 工作区状态扫描延迟至回合开始，避免在可能被丢弃的设置阶段浪费扫描时间。 | https://github.com/openai/codex/pull/62437 |
| #62435 | Let extensions attach metadata to MCP tool requests | 新增 `ToolLifecycleContributor::mcp_tool_request_meta`，允许扩展基于线程/回合数据向 MCP 请求附加 `_meta` 条目。 | https://github.com/openai/codex/pull/62435 |
| #62434 | Expand connector result metadata coverage across auth configurations | 将解析后的结果体目标传入采样，基于所有者在保留锁下选择保留的结果体，扩展跨认证配置的连接器结果元数据覆盖。 | https://github.com/openai/codex/pull/62434 |
| #62432 | Add opt-in OAuth discovery to config server loaders | 配置服务器 bundle 与认证加载器支持从 OAuth 元数据发现授权/令牌端点及可选设备授权端点（需显式启用）。 | https://github.com/openai/codex/pull/62432 |
| #62403 | Reconcile unfinished Cloud replies in the TUI transcript | 修复 TUI 记录中从历史恢复的未完成 Cloud 回复在最终文本到达后仍留下陈旧前缀的问题。 | https://github.com/openai/codex/pull/62403 |

## 5. 功能需求趋势

从近 24 小时的 Issue 与 PR 中可观察到以下社区关注方向：

1. **跨平台 Computer Use 与窗口捕获**  
   Windows（Notepad、Electron、WeChat/QQ）和 Linux 均反复出现窗口截图超时、捕获几何信息缺失，以及 macOS 远程控制线程冲突。社区强烈希望 Computer Use 能在 Windows 10/11 与 Linux 上获得与 macOS 相当的稳定性与官方支持。

2. **MCP 与连接器生态成熟度**  
   多个 Issue 涉及 MCP HTTP 响应解码失败、结果体元数据泄露凭证、连接器不可用等；今日多个 PR 致力于增强 MCP 结果透传、元数据覆盖与认证发现，说明连接器协议层正处于快速迭代期。

3. **远程协作与多设备会话同步**  
   macOS 远程控制无法恢复、iOS 任务列表空白、Windows ARM64 远程控制 HTTP 409 等问题集中暴露远程会话状态同步与设备配对的脆弱点。

4. **模型目录与新模型支持**  
   GPT-6.2 Astra/Sol、GPT-6.1 Terra 的技能文档更新与模型目录回溯显示，社区对新一代模型（GPT-6.x 系列）的适配与迁移指南需求旺盛。

5. **IDE/编辑器嵌入与会话源自定义**  
   `app-server` 硬编码 `SessionSource::VSCode` 缺少覆盖标志，反映第三方主机嵌入 Codex 时对会话来源标识与 CLI 灵活性的需求。

## 6. 开发者关注点

- **高频痛点**：Windows 平台

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-19)

## 今日速览

Gemini CLI 今日发布 v0.70.0-preview.0 与 v0.69.0 两个版本，重点引入 `/stats heatmap` 每日 Token 使用热图并修复模板占位符转义问题。社区围绕 **Subagent 稳定性**、**浏览器代理兼容性** 及 **Windows 平台 UI 卡死** 展开广泛讨论，多个 P1 级 Bug 仍待修复，ACP（Agent 协议）与工具超时控制成为活跃的改进方向。

---

## 版本发布

### v0.70.0-preview.0
- 合并 v0.69.0-preview.0 与 v0.68.0 的变更日志
- 发布 nightly 版本 `0.70.0-nightly.20261110.g1603e9b`

### v0.69.0
- **fix(core,cli)**: 修复模板占位符替换过程中字面量 `$` 字符被错误处理的问题（@jesussamuel-byte）
- **feat(cli)**: 新增 `/stats heatmap` 子命令，用于查看每日 Token 使用热图（@jvargassanchez-dot）

[查看 v0.70.0-preview.0 发布详情](https://github.com/google-gemini/gemini-cli/releases/tag/v0.70.0-preview.0) | [查看 v0.69.0 发布详情](https://github.com/google-gemini/gemini-cli/releases/tag/v0.69.0)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级 | 评论/👍 | 关注理由 |
|---|------|--------|---------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURN is reported as GOAL success, hiding interruption | P1 | 13 / 2 | 子代理在达到最大轮次后仍上报 `status: "success"`，掩盖中断，导致用户误以为任务已完成，严重影响任务可靠性。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，最高等待超一小时，是当前最高优先级的稳定性 Bug。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 | 9 / 1 | 探索零依赖 OS 沙箱，充分发挥模型原生 Bash 能力，属于架构层面的重大增强提案。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 | 7 / 1 | 评估 AST 感知的文件读取/搜索/代码映射价值，旨在减少 Token 浪费并提升代码导航精度。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 | 7 / 0 | 模型主动调用自定义技能和子代理的意愿不足，需显式指令才会触发，影响自动化体验。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides (e.g., maxTurns) | P2 | 5 / 0 | 浏览器代理忽略全局/项目级 `settings.json` 配置覆盖，导致 `maxTurns` 等设置失效。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 | 4 / 1 | 浏览器子代理在 Wayland 环境下失败，涉及 Linux 桌面平台兼容性问题。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | Gemini CLI encounters 400 error with > 128 tools | P2 | 3 / 0 | 工具数量超过 128 个时触发 400 错误，反映工具作用域限制机制存在缺陷。 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Agent should stop/discourage destructive behavior | P2 | 3 / 1 | 模型可能执行 `git reset --force` 等破坏性操作，社区呼吁增加安全拦截与警示机制。 |
| [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) | Feat: Subagent trajectory should be visible via `/chat share` | P3 | 2 / 1 | 子代理轨迹虽被录制但不易查看，建议通过 `/chat share` 暴露以便审计与评估。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#30334](https://github.com/google-gemini/gemini-cli/pull/30334) | fix(core,cli): parse PowerShell commands asynchronously to prevent UI spinner freeze | OPEN | 修复 Windows 下 PowerShell 命令解析导致 UI Spinner 冻结数秒的问题，异步化解析避免阻塞事件循环。 |
| [#30212](https://github.com/google-gemini/gemini-cli/pull/30212) | feat(core): add configurable per-tool-call timeout (tools.callTimeout) | OPEN | 新增 `tools.callTimeout` 配置（秒，默认 0 禁用），单次工具调用超时后触发可恢复的 `TOOL_CALL_TIMEOUT` 错误，让模型可调整策略。 |
| [#30363](https://github.com/google-gemini/gemini-cli/pull/30363) | fix(core): avoid duplicating the pending prompt in managed history | OPEN | 修复历史管理中待处理提示词重复追加问题，确保当前提示词仅发送一次，修复 #30069。 |
| [#30362](https://github.com/google-gemini/gemini-cli/pull/30362) | fix(acp): report stopped agent reasons | OPEN | ACP 模式下处理 `AgentExecutionStopped` 事件，将停止原因作为 assistant message 发送给客户端，避免空转。 |
| [#30335](https://github.com/google-gemini/gemini-cli/pull/30335) | fix(core): stop overriding core.sshCommand with an empty string | OPEN | 修复 `getSafeGitEnv()` 将 `core.sshCommand` 设为空字符串导致 Git SSH 操作失败的问题（`cannot run : No such file or directory`）。 |
| [#30246](https://github.com/google-gemini/gemini-cli/pull/30246) | fix(core): quote IDE CLI path for cmd.exe in /ide install on Windows | OPEN | 修复 Windows 路径含空格时 `/ide install` 失败的问题，对 IDE CLI 路径进行引号处理。 |
| [#30230](https://github.com/google-gemini/gemini-cli/pull/30230) | fix(core): keep the synthetic binary ack so injected audio/video stays in its own turn | OPEN | 修复 Gemini 3 模型下读取音频/视频文件时触发 400 错误的问题，保持合成二进制 ACK 使注入媒体独立成 turn。 |
| [#30232](https://github.com/google-gemini/gemini-cli/pull/30232) | feat(acp): support session/close so clients can release a session | OPEN | ACP 客户端现可通过 `session/close` 释放会话，之前会返回 `-32601 Method not found`，会话配置与 MCP 连接将被正确释放。 |
| [#30241](https://github.com/google-gemini/gemini-cli/pull/30241) | fix(core): keep injected binary data intact when truncating tool responses | OPEN | 修复 `truncateFunctionResponsePart` 截断工具响应时损坏 `__binary_injection__` 中的 Base64 数据，导致音频/视频读取失败。 |
| [#30239](https://github.com/google-gemini/gemini-cli/pull/30239) | fix(core): keep a tier alias's config when the tier resolves to its first model | OPEN | 修复分层别名（如 `flash-lite`、`flash`、`pro`）的 `generateContentConfig` 被错误重置的问题，保留自定义配置。 |

---

## 功能需求趋势

从近期 Issues 与 PR 可观察到以下社区关注方向：

1. **子代理（Subagent）稳定性与可观测性**：P1 级 Bug 集中在子代理恢复、挂起及上下文丢失；社区强烈要求通过 `/chat share` 暴露子代理轨迹，并改进 Bug 报告中的子代理上下文。
2. **浏览器代理（Browser Agent）平台兼容**：Wayland 失败、`settings.json` 配置被忽略、会话锁恢复等问题反复出现，说明跨平台浏览器自动化是当前薄弱环节。
3. **工具调用治理**：引入 `tools.callTimeout` 超时控制、限制 >128 工具时的 400 错误、阻止破坏性 Git 操作，体现社区对工具调用安全性与可控性的需求。
4. **代码理解与 Token 优化**：AST 感知的文件读取/搜索/映射、"Tactful Extraction" 外科手术式读取等提案，旨在降低上下文膨胀并提升代码导航精度。
5. **ACP（Agent 协议）生态完善**：会话关闭（`session/close`）、钩子（SessionStart/Notification）触发、stderr 实时刷新等 ACP 相关修复频繁，说明第三方客户端集成需求在增加。

---

## 开发者关注点

- **高频痛点**：子代理在达到 `MAX_TURNS` 后仍上报成功、通用代理无限挂起、Windows PowerShell 解析导致 UI 卡死，均直接影响日常使用体验。
- **配置一致性**：浏览器代理忽略 `settings.json` 覆盖、Symlink 代理文件未被识别、分层别名配置被重置，均指向配置系统在不同代理/场景下的执行不一致。
- **安全与破坏性操作**：社区多次提及模型可能执行 `git reset --force` 等高风险命令，期望 CLI 增加拦截、警示或确认机制。
- **跨平台支持**：Wayland 下的浏览器代理失败、Windows 路径空格导

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-19)

## 今日速览

OpenCode 社区今日活跃度较高，共 29 条 Issue 更新及 50 条 PR 活动。社区重点集中在 **Windows 平台 ACP 协议挂死**、**1M 上下文会话自动压缩失效**、**LLM API 重试机制** 以及 **DeepSeek V4 Flash 隐私设置缺失** 等核心稳定性问题。当前暂无新版本发布，开发者正通过多个 PR 修复会话存储、TUI 侧边栏、Mistral 工具桥等问题。

## 版本发布

过去 24 小时内无新版本 Release。

## 社区热点 Issues

以下 10 个 Issue 今日更新活跃或影响范围广，建议重点关注：

| # | 标题 | 核心内容 | 为何重要 | 链接 |
|---|------|---------|---------|------|
| #50155 | opencode-go: DeepSeek V4 Flash requires Global regions but Privacy setting is missing | 付费订阅用户使用 DeepSeek V4 Flash 失败，提示需在工作区隐私设置中选择 Global，但界面缺失该选项 | 评论数最多（28 条），👍17，直接影响高付费模型的可用性，属于配置与权限缺陷 | [查看](https://github.com/anomalyco/opencode/issues/50155) |
| #64686 | acp: every session method hangs forever on Windows | Windows 上 `opencode acp` 握手成功后，所有会话方法（session/new、session/list 等）永久挂起，根因是 Bun fetch 被全局 SSE 流饿死 | severity:high，Windows 平台 ACP 功能不可用，影响 IDE 插件与远程客户端集成 | [查看](https://github.com/anomalyco/opencode/issues/64686) |
| #50574 | compaction: 1M-context sessions never auto-compact before provider returns HTTP 400 | 1M 上下文模型（如 deepseek-v4.1-flash）的自动压缩触发阈值过高，导致在提供商返回 400 之前从不压缩，且 400 未被识别为上下文溢出 | 影响超长上下文会话的稳定性，可能导致长时间会话突然中断 | [查看](https://github.com/anomalyco/opencode/issues/50574) |
| #58128 | do not stop retrying on llm API failures | 当前 LLM API 失败重试为固定 10 次、最大 10s 退避，开发者认为该硬编码默认值过于保守，网络抖动或后端重启即可中断任务 | 核心稳定性问题，社区呼吁将重试策略改为可配置或无限重试 | [查看](https://github.com/anomalyco/opencode/issues/58128) |
| #64632 | Undo deletes ignored files (.env, build/) when the undone step edited .gitignore | 撤销编辑 `.gitignore` 的步骤时，会将原本被忽略但已存在的文件（如 `.env`、`build/`）从磁盘删除，且重做无法恢复 | severity:high，存在数据丢失风险，涉及文件系统操作的安全性 | [查看](https://github.com/anomalyco/opencode/issues/64632) |
| #63920 | session: idle sessions gain time_updated after a service restart and jump to the top | 空闲会话在服务重启后会被赋予新的 `time_updated`，导致未产生任何可见活动的会话跳转到列表顶部 | 会话存储与排序逻辑缺陷，影响大量会话用户的日常体验 | [查看](https://github.com/anomalyco/opencode/issues/63920) |
| #54044 | agents: browser tools exposed despite agent-level "deny browser" when the agent has execute | 子代理明确拒绝浏览器工具，但只要拥有 `execute`（Code Mode）工具，仍会获得完整 `browser` 命名空间（44 个工具） | 权限隔离缺陷，可能导致 Agent 越权调用浏览器能力，涉及安全边界 | [查看](https://github.com/anomalyco/opencode/issues/54044) |
| #64752 | shell: output capture fails - missing ~/.local/share/opencode/shell directory | Shell 工具因无法自动创建输出捕获目录而无法执行任何命令 | 核心工具链不可用，macOS 用户普遍受影响 | [查看](https://github.com/anomalyco/opencode/issues/64752) |
| #64274 | service: /api/info takes seconds while the service is busy | 后台服务繁忙时，`GET /api/info` 响应耗时 2-28 秒，客户端在健康检查停顿期间可能替换掉存活服务并终止所有运行 | severity:high，服务可用性与客户端容错机制存在设计缺陷 | [查看](https://github.com/anomalyco/opencode/issues/64274) |
| #37173 | No way to hide questions or read text | Agent 提问弹窗遮挡对话内容，字体放大后无法阅读提问前的文本，导致无法回答问题 | 可访问性与 TUI 交互问题，👍3，影响残障用户和大字体用户 | [查看](https://github.com/anomalyco/opencode/issues/37173) |

## 重要 PR 进展

今日共 50 条 PR 更新，以下 10 条具有较高修复或功能价值：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|-------------|------|
| #64812 | fix(core): walk the read path, not its symlink target, for AGENTS.md | OPEN | 修复通过符号链接目录读取文件时，AGENTS.md 查找从解析后路径开始而非实际读取路径的问题 | [查看](https://github.com/anomalyco/opencode/pull/64812) |
| #64819 | fix(tui): load older messages when todo sidebar is empty after restart | OPEN | 修复 TUI 重启后，若最新 `todowrite` 不在首次加载的 20 条消息中，待办事项侧边栏为空的问题 | [查看](https://github.com/anomalyco/opencode/pull/64819) |
| #64821 | fix(ai): bridge tool results before system updates for Mistral models | OPEN | 修复 Mistral 家族模型在系统更新跟随工具结果后，工具桥被跳过的问题 | [查看](https://github.com/anomalyco/opencode/pull/64821) |
| #64784 | [contributor] release: promote dev to production | OPEN | 将 dev 分支提升至生产环境，包含 Tidepool Alpha Free、Gemini 4 Neon 控制台文档及 core/app/CLI 变更 | [查看](https://github.com/anomalyco/opencode/pull/64784) |
| #63002 | feat(desktop): signed-in browser pane with extensions, previews, prompts and agent safeguards | OPEN | 桌面端新增已登录浏览器窗格，支持一键导入 Chrome/Edge/Firefox 等 11 种浏览器登录状态，链接点击即在对话旁打开 | [查看](https://github.com/anomalyco/opencode/pull/63002) |
| #62845 | [contributor] refactor(app): share the bounded session index | OPEN | 将有界会话索引与查询从 Home 移至 `runtime/server`，供 Home、侧边栏、收件箱等共享 | [查看](https://github.com/anomalyco/opencode/pull/62845) |
| #62850 | [contributor] refactor(app): share Home project actions and menus | OPEN | 将 Home 的可复用项目菜单、动作、导入状态机和目录助手提取为共享组件 | [查看](https://github.com/anomalyco/opencode/pull/62850) |
| #62851 | [contributor] feat(app): add a reusable running sessions list | OPEN | 在 `shell/sidebar` 下新增可复用的 `RunningSessions` 列表 | [查看](https://github.com/anomalyco/opencode/pull/62851) |
| #62552 | fix(i18n): fill the missing zh / zht keys in the app and ui dictionaries | CLOSED | 补全中文/繁体中文缺失的国际化键，消除中文界面中的英文回退字符串 | [查看](https://github.com/anomalyco/opencode/pull/62552) |
| #64823 | docs: add documentation page for goal command | CLOSED | 为原生 `/goal` 命令新增文档页面，并链接至文档导航 | [查看](https://github.com/anomalyco/opencode/pull/64823) |

## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **桌面端与 IDE 集成增强**：用户强烈希望在 OpenCode Desktop 中获得原生 Git 工作流 UI（暂存、提交、推送）、搜索功能的“查找上一条/下一条”控件，以及已登录浏览器窗格等更深度的桌面集成功能（#64824、#64825、#63002）。
2. **跨平台稳定性（尤其是 Windows）**：Windows 平台的 ACP 挂死、触摸设备 Enter 键行为异常、证书链问题等反馈集中，说明跨平台兼容性是当前短板（#64686、#64828、#64835）。
3. **超长上下文与会话管理**：1M 上下文模型的自动压缩失效、空闲会话时间戳异常、会话存储重启后排序错乱，表明社区对超长会话的稳定性与管理体验要求提升（#50574、#63920）。
4. **模型提供商适配与 API 兼容性**：DeepSeek V4 Flash 区域设置缺失、Mistral 工具桥角色顺序、Anthropic 严格端点的空 system block 导致 400，反映对新模型和严格 API 端点的适配压力（#50155、#64820、#64834）。
5. **可配置的重试与超时策略**：多个 Issue 指出 LLM API 重试次数和超时硬编码，社区希望能根据网络环境（如需 VPN 的地区）自定义重试行为（#58128、#64817）。

## 开发者关注点

开发者反馈中的高频痛点与需求包括：

- **数据安全与文件操作**：撤销操作误删被忽略文件（#64632）、Shell 工具因目录缺失不可用（#647

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 (2026-11-19)

## 1. 今日速览

过去24小时，Deepseek Harness 社区主要围绕 **dsh-v0.2.2-rc.5** 候选版本展开，核心更新为 DeepSeek 模型搜索功能的体验优化与计费模式调整。与此同时，Issues 与 Pull Requests 在过去24小时内均无新增更新，社区活动处于相对平稳状态。

## 2. 版本发布

### dsh-v0.2.2-rc.5
- **发布时间**：2026-11-19（过去24小时内）
- **GitHub 链接**：https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.2.2-rc.5

**主要更新内容（体验优化）：**
- **DeepSeek 模型**：改用 DeepSeek 服务端搜索，搜索不再按次收费，降低用户使用成本。
- **其他模型**：默认改用 DeepSeek Search API，统一搜索服务入口。

该版本为候选版本（rc.5），建议关注后续正式版发布及社区反馈。

## 3. 社区热点 Issues

过去24小时内，**仓库无新增或更新的 Issues（共 0 条）**。因此暂无可列出的热点 Issue 条目。

> 建议持续关注仓库 Issues 页面：https://github.com/deepseek-ai/deepseek-harness/issues

## 4. 重要 PR 进展

过去24小时内，**仓库无新增或更新的 Pull Requests（共 0 条）**。因此暂无可列出的重要 PR 条目。

> 建议持续关注仓库 Pull Requests 页面：https://github.com/deepseek-ai/deepseek-harness/pulls

## 5. 功能需求趋势

基于本次唯一发布版本（v0.2.2-rc.5）的更新方向，可初步推断社区当前的功能关注点：

| 趋势方向 | 依据 | 说明 |
|---------|------|------|
| **搜索能力增强** | 服务端搜索切换、Search API 默认化 | 社区对模型联网搜索功能的稳定性与易用性有较高关注 |
| **成本优化** | DeepSeek 模型搜索不按次收费 | 开发者对 API 调用成本敏感，期望更多免费或低成本的搜索方案 |
| **多模型兼容性** | 其他模型默认使用 DeepSeek Search API | 社区希望非 DeepSeek 模型也能统一接入 DeepSeek 的搜索服务 |

> 注：由于过去24小时无 Issues/PR 数据，上述趋势仅基于单一 Release 内容推断，不代表完整社区需求全貌。

## 6. 开发者关注点

从本次版本更新内容可推断，开发者当前的高频关注点与潜在痛点包括：

1. **搜索计费模式**：DeepSeek 模型用户关切服务端搜索是否产生额外费用，本次“按次收费”取消直接回应了此痛点。
2. **API 统一性**：开发者希望不同模型之间搜索调用方式保持一致，降低接入与切换成本。
3. **候选版本稳定性**：v0.2.2-rc.5 为 RC 版本，开发者可能关注其与正式版的差异及升级风险。

---

**数据来源**：https://github.com/deepseek-ai/deepseek-harness  
**报告日期**：2026-11-19

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-19)

## 今日速览

Hermes Agent 今日发布 Canary 版本 `v0.23.2+canary.20261119`，社区围绕**终端环境快照中的凭证泄露**展开密集讨论与修复，多个安全相关 PR 已合并或正在审核中。与此同时，Windows 平台的网关元数据操作风暴、Electron 主进程卡顿及 MSIX 控制台闪现等平台特定问题成为开发者关注的焦点。

## 版本发布

**Hermes Agent v0.23.2+canary.20261119T064637Z**  
- 发布日期：2026-11-19  
- 发布渠道：Canary  
- 下载：提供 macOS Apple Silicon (M-series) DMG 包  
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.2+canary.20261119T064637Z

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 类型/优先级 | 核心内容 | 社区反应 | 链接 |
|---|------|------------|---------|---------|------|
| #62336 | Terminal 环境快照将包含凭证的 env vars 写入磁盘 | Security / P3 | `tools/environments/base.py` 通过 `export -p` 将所有环境变量（含 `bws run --` 注入的 Bitwarden 凭证）持久化到 `cache/terminal/` 磁盘，存在凭证泄露风险。 | 22 条评论，讨论活跃，多个安全修复 PR 围绕此问题展开。 | https://github.com/NousResearch/hermes-agent/issues/62336 |
| #146538 | 网关在 Windows 上大量配置文件下产生 3.4k–9.9k 次/秒文件系统元数据操作 | Perf / P2 | 66 个配置文件共享单个 `hermes gateway run` 进程时，技能签名遍历、配置重枚举及未缓存 `realpath` 导致内核池增长，占用近一个 CPU 核心。 | 12 条评论，Windows 用户关注度高。 | https://github.com/NousResearch/hermes-agent/issues/146538 |
| #86620 | Tool Search 需可配置的延迟豁免白名单 | Feature / P3 | 目前无法在不修改源码（`_HERMES_CORE_TOOLS`）的情况下，将特定 MCP/插件工具固定为“始终急加载”。 | 8 条评论，1 个点赞，插件开发者关注。 | https://github.com/NousResearch/hermes-agent/issues/86620 |
| #140646 | 图像路径：三项保障、字段映射及最小首步 | Feature / P3 | 客户端视觉路径提案，附自有 resizer 测量数据及模型运行质量数据，可复现。 | 5 条评论，偏技术提案性质。 | https://github.com/NousResearch/hermes-agent/issues/140646 |
| #156888 | Windows 桌面 Electron 主进程周期性 2–4 秒卡顿 | Bug / P2 | 主进程在活跃使用期间每 1–4 分钟出现零 CPU 阻塞卡顿，通常在消息发送/轮次开始时发生，原因尚未归因。 | 3 条评论，Windows 桌面用户反馈。 | https://github.com/NousResearch/hermes-agent/issues/156888 |
| #151311 | `sessions repair-profiles --apply` 将本地会话路径移出自身存储 | Bug / P2 | 多路复用网关下，该命令会破坏压缩与重置功能，影响命名配置文件的会话隔离。 | 3 条评论。 | https://github.com/NousResearch/hermes-agent/issues/151311 |
| #151908 | `uv --no-config` 丢弃项目 `[tool.uv] exclude-newer` | Bug / P3 | 导致 uv 重新解析，所有锁定的 PM 运行时构建失败。 | 2 条评论，AI 生成披露，由 Hermes agent 协助撰写。 | https://github.com/NousResearch/hermes-agent/issues/151908 |
| #157363 | 客户端丢弃引擎返回的工具调用文本（Micro-empty 循环） | Bug / P2 | 自托管网关会话出现重复 `Empty response (no content or reasoning)` 警告，工具调用文本被客户端 strip 掉。 | 1 条评论，新提交。 | https://github.com/NousResearch/hermes-agent/issues/157363 |
| #157735 | Windows MSIX：工具生成可见控制台；飞书群回复失效 | Bug / P2 | 工具生成会附带可见控制台（黑窗口闪现），自动更新后孤儿子进程持续生成 conhost 对；飞书群回复仅通过重发横幅送达。 | 0 条评论，今日新提交。 | https://github.com/NousResearch/hermes-agent/issues/157735 |
| #157707 | `sessions export --format md` 自引用会话的 SHA256 验证误报 | Bug / P3 | Markdown 导出的 body-hash 方案在会话内容引用导出器自身源码或之前导出文件时出现验证假阴性。 | 0 条评论，今日新提交。 | https://github.com/NousResearch/hermes-agent/issues/157707 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|-------------|------|
| #157669 | Terminal 密钥不再落入磁盘会话快照，命令速度提升约 2 倍 | CLOSED | 修复 #62336，秘密值改为在内存中传递，快照文件不再包含密钥，终端命令性能显著提升。 | https://github.com/NousResearch/hermes-agent/pull/157669 |
| #157740 | fix(providers): 使提供商插件快照不被基于时间的临时文件清理删除 | OPEN | 修复 #156493，挽救 #156209，防止提供商插件的冻结副本被系统 temp 目录的年龄清理机制误删。 | https://github.com/NousResearch/hermes-agent/pull/157740 |
| #157739 | fix(gateway): 在“响应就绪”日志行中记录 thread_id | OPEN | 为网关日志添加 `thread_id=` 字段，便于通过 `grep thread_id` 定位线程消息，而非依赖会话键最后一段。 | https://github.com/NousResearch/hermes-agent/pull/157739 |
| #157599 | fix(agent): 将类型化 thinking 内容块路由到推理通道 | OPEN | 修复 Mistral 等非严格 OpenAI 兼容后端在 `delta.content` 中流式推理而非 `reasoning_content` 字段的问题。 | https://github.com/NousResearch/hermes-agent/pull/157599 |
| #157736 | fix(desktop): 远程模式下无需本地正则化器即可解析远程预览目标 | OPEN | 避免 Windows 上 WSL 网关路径被 Electron 本地正则化器错误解析为本地文件系统路径。 | https://github.com/NousResearch/hermes-agent/pull/157736 |
| #157573 | fix: 解决问题 #157415 | OPEN | 网关相关修复，具体内容关联 issue #157415。 | https://github.com/NousResearch/hermes-agent/pull/157573 |
| #72652 | fix: 防止终端环境快照中泄露密钥 | CLOSED | 使用 Bash 3.2 兼容循环过滤 `compgen -e`，保留 `docker_forward_env` 和技能所需的允许列表。 | https://github.com/NousResearch/hermes-agent/pull/72652 |
| #148406 | fix(tools): 从终端会话快照中擦除秘密形状的 env 变量 | CLOSED | 针对终端会话快照机制的两部分安全修复（CWE-312），擦除名称形似密钥的环境变量。 | https://github.com/NousResearch/hermes-agent/pull/148406 |
| #134941 | fix(environments): 从持久化 Bash 会话快照中排除 INFISICAL_* | CLOSED | 防止 Infisical 密钥（含 `INFISICAL_UNIVERSAL_*`）被写入 `hermes-snap-*.sh` 并重新加载。 | https://github.com/NousResearch/hermes-agent/pull/134941 |
| #102287 | fix: 将凭证排除应用到两个快照写入器 | CLOSED | 回应 #102210 的审查反馈，确保所有快照写入路径均应用凭证排除。 | https://github.com/NousResearch/hermes-agent/pull/102287 |

---

## 功能需求趋势

从本日更新的 13 个 Issue 与 50 个 PR 可观察到以下社区关注方向：

1. **终端安全与凭证隔离**：围绕 `hermes-snap-*.sh` 快照机制的凭证泄露是今日最集中的讨论主题，多个安全修复 PR 相继合并，社区对“本地凭证不落盘”的需求强烈。
2. **跨平台性能优化（尤其是 Windows）**：网关元数据操作风暴、Electron 主进程卡顿、MSIX 控制台闪现等问题集中在 Windows 平台，表明 Windows 桌面与网关性能是当前的短板。
3. **工具搜索与插件系统灵活性**：开发者希望能够配置 Tool Search 的延迟加载豁免白名单，无需改动源码即可固定特定 MCP/插件工具为急加载。
4. **会话与配置文件管理稳定性**：`sessions repair-profiles`、`profile rename` 等命令在多路复用、命名配置文件场景下存在路径迁移与标签重命名缺陷，社区对会话存储一致性要求较高。
5. **桌面插件 SDK 扩展性**：出现可替换侧边栏配置文件轨道、公开配置文件名单读取与 `switchTo(route)` 动词的需求，显示社区正在向更开放的桌面插件生态演进。

---

## 开发者关注点

- **安全合规压力**：终端环境变量快照将 Bitwarden、Infisical 等密钥明文写入磁盘，已引发多个 CWE-31

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-19)

## 1. 今日速览

今日 OpenClaw 社区活跃度较高，共 11 个 Issue 和 50 个 PR 在过去 24 小时内更新，但未发布新版本。核心关注点集中在 **Windows 平台兼容性**、**会话状态与认证机制** 以及 **Gateway 稳定性** 三个方向，其中 P1 级别的 Windows 插件路径大小写问题已引发多个并行修复 PR。

---

## 2. 版本发布

过去 24 小时内无新版本 Release。

---

## 3. 社区热点 Issues

以下选取 10 个最具代表性的 Issue（按优先级、影响范围及更新时间排序）：

| # | 标题 | 优先级/标签 | 核心内容 | 社区反应 | 链接 |
|---|------|------------|---------|---------|------|
| #201589 | Windows 插件 peer-link 审计按主机路径区分大小写，更新后通道保持阻塞 | P1, `message-loss`, `diamond lobster` | Windows 下插件路径大小写不一致导致 `missing-openclaw-peer-link`，通道更新后持续被阻塞。今日新建，已有多个 PR 并行修复。 | 高度关注，直接影响 Windows 用户可用性 | [查看 Issue](https://github.com/openclaw/openclaw/issues/201589) |
| #141172 | 运行在首次会话提交前死亡会永久泄漏 `agent.run.started`，导致轨迹刷新外键失败且不记录 `agent.run.finished` | P2, `session-state`, `silver shellfish` | 会话状态机缺陷，运行中途崩溃会导致状态永久卡住，影响轨迹完整性与审计。 | 13 条评论，讨论集中在执行所有者侧的新会话提供商耗尽追踪 | [查看 Issue](https://github.com/openclaw/openclaw/issues/141172) |
| #164559 | `agent_end` 插件钩子每次模型尝试触发一次，而非每次运行触发一次；429 失败切换下报告 `success=false` 且无 `final/willRetry` 字段 | P2, `diamond lobster`, `stale` | 插件生命周期语义错误，导致下游插件无法正确判断重试与终止状态。 | 8 条评论，涉及产品决策与源码复现需求 | [查看 Issue](https://github.com/openclaw/openclaw/issues/164559) |
| #143206 | 带失败和待处理叙事的 Dreaming 运行被记录为 OK 且无重试 | P2, `diamond lobster` | 托管 `memory-core` Dreaming 自动化在叙事生成失败后仍标记为成功，待处理工作不重试，影响记忆核心可靠性。 | 8 条评论，需维护者与产品团队决策 | [查看 Issue](https://github.com/openclaw/openclaw/issues/143206) |
| #151766 | 主动记忆召回意图模式缺少德语 (DE)，默认 `mode: "escalate"` 对德语用户不生效 | P2, `session-state`, `diamond lobster` | 多语言支持缺口，德语用户无法触发深度召回子代理，影响本地化体验。 | 5 条评论，2 人点赞，社区对国际化支持有明确诉求 | [查看 Issue](https://github.com/openclaw/openclaw/issues/151766) |
| #198334 | 2026.11.1 更新修复在 Doctor 最终化阶段失败 | P2, `silver shellfish`, `ux-friction` | 更新预检与配置验证通过，但 Doctor 最终化阶段报 `inactive-driver-dead`，导致更新回滚或中断。 | 5 条评论，影响升级路径稳定性 | [查看 Issue](https://github.com/openclaw/openclaw/issues/198334) |
| #166707 | macOS 应用本地设备配对连接 (ui/node) 永不发送认证令牌，无限循环 `token_missing` | P0, `auth-provider`, `ux-release-blocker`, `silver shellfish` | macOS 客户端认证链路断裂，WebSocket 连接因缺少令牌持续重连，严重影响本地配对体验。 | 4 条评论，P0 级别但标记 stale，需确认是否仍在主分支复现 | [查看 Issue](https://github.com/openclaw/openclaw/issues/166707) |
| #155908 | memory-wiki 编译缓存清理超过生命周期超时，导致 wiki 语料库不可用 | P2, `silver shellfish` | 缓存清理任务耗时过长，导致 wiki 语料库长期不可用，影响记忆模块核心功能。 | 3 条评论，11 月 18 日复测显示部分恢复，但超时问题仍需关注 | [查看 Issue](https://github.com/openclaw/openclaw/issues/155908) |
| #201751 | 本地 TUI 报告 GitHub Copilot 登录成功，但重启前无法使用令牌 | P2, `auth-provider`, `silver shellfish` | 认证状态未及时加载到运行时，导致登录后下一条消息即失败。今日新建。 | 1 条评论，典型的凭证加载时序问题 | [查看 Issue](https://github.com/openclaw/openclaw/issues/201751) |
| #201753 | 2026.11.3 → 2026.11.5 候选 Doctor 仍拒绝 WhatsApp 迁移原因变更 | P1, `ux-friction` | 即使移除未使用的 WhatsApp 配置和旧凭据，Doctor 仍因延迟的 WhatsApp 迁移义务拒绝更新。今日新建并已关闭。 | 1 条评论，升级路径中的迁移逻辑存在残余状态检查问题 | [查看 Issue](https://github.com/openclaw/openclaw/issues/201753) |

---

## 4. 重要 PR 进展

以下选取 10 个重要 PR（按影响范围与紧急程度排序）：

| # | 标题 | 类型 | 核心修复/功能 | 状态 | 链接 |
|---|------|------|--------------|------|------|
| #201754 | fix: 保持 Windows 插件别名绑定到同一主机目录 | Bug 修复 | 修复 Windows 插件主机连接点保留不同大小写路径的问题，直接关联 #201589。草稿中，Linux 证明完成，Windows 回放与 Gateway 集成测试尚需执行。 | OPEN | [查看 PR](https://github.com/openclaw/openclaw/pull/201754) |
| #201760 | fix: 当安装路径使用不同大小时保持 Windows 通道插件正常工作 | Bug 修复 | 针对 NTFS/ReFS 大小写不敏感但插件审计区分大小写的问题，修复 Slack/Discord/Feishu 等插件加载失败。关联 #201589。 | OPEN | [查看 PR](https://github.com/openclaw/openclaw/pull/201760) |
| #201735 | fix: 更新 pnpm 安装后保持 openclaw 命令和 Gateway 正常工作 | Bug 修复 | 修复 pnpm 全局安装场景下 `openclaw update` 导致命令和 Gateway 失效的问题，涉及 Docker 单元从 2026.11.4 到 2026.11.5 的真实更新。 | OPEN, P1 | [查看 PR](https://github.com/openclaw/openclaw/pull/201735) |
| #201716 | fix(gateway): 启动时原位升级状态而非因副本空间拒绝 | Bug 修复 | 新版本启动时不再将整个状态目录复制到私有影子目录，避免大文件（如 Codex 会话历史）被无谓迁移，提升启动速度与可用性。 | OPEN, P1, 等待作者 | [查看 PR](https://github.com/openclaw/openclaw/pull/201716) |
| #201757 | fix: 保持跨 Gateway 重启的定时工作 (cron) | Bug 修复 | 网关重启时不再错误地将 cron 执行标记为需运营商恢复，避免普通对话中的自动化请求被误判为用户发起。 | OPEN | [查看 PR](https://github.com/openclaw/openclaw/pull/201757) |
| #201758 | improve: 减少刷新会话行时的重复工作 | 性能优化 | 频繁的转录发布会反复过滤和冻结已发布会话行的所有字段，优化刷新切片避免重复解析运行时位置和模型上下文。 | OPEN | [查看 PR](https://github.com/openclaw/openclaw/pull/201758) |
| #201756 | fix: PostgreSQL 端口后保持会话内存可搜索 | Bug 修复 | 修复嵌入式 NUL 字符导致 PostgreSQL 重建会话内存索引失败，以及旧 SQLite 索引阻塞数据库端口的问题。 | OPEN | [查看 PR](https://github.com/openclaw/openclaw/pull/201756) |
| #201697 | refactor(gateway): 请求开始时一次性检查代理运行时权限 | 重构 | 消除单次请求中对代理运行时权限的重复检查（之前在队列前、处理器启动、处理器内部及每次响应后均有检查），提升网关请求处理性能。 | OPEN, 安全敏感变更 | [查看 PR](https://github.com/openclaw/openclaw/pull/201697) |
| #201680 | fix: 插件重载等待时保存代理不再显示失败 | Bug 修复 | 修复 Control UI 中保存代理名称/表情/头像时，因插件变更仍在等待运行工作完成而出现红色错误（“未确认/延迟”）。 | CLOSED, 等待维护者审查 | [查看 PR](https://github.com/openclaw/openclaw/pull/201680) |
| #201393 | fix(onboard): 不再将 Funnel 运行指向令牌认证 | Bug 修复 | 修复 `openclaw onboard --non-interactive --tailscale funnel` 失败并误导用户使用 `--gateway-auth token` 的问题，Funnel 始终将网关切换为密码认证。 | OPEN | [查看 PR](https://github.com/openclaw/openclaw/pull/201393) |

---

## 5. 功能需求趋

:::
