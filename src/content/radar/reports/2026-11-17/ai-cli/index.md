---
title: "AI CLI 工具社区动态日报"
published: 2026-11-17
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-17

> 生成时间: 2026-11-17 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-17)

## 1. 生态全景

当前 AI CLI 工具生态正从单一对话助手向多代理编排、企业级身份集成与跨平台桌面自动化方向演进。主流工具普遍进入“稳定性补丁期”，社区核心诉求集中在认证链路可靠性、子代理生命周期管理、跨平台（尤其是 Windows）底层兼容性以及 MCP/插件生态成熟度上。部分工具（如 Claude Code、OpenCode）出现版本回归与平台差异化 Bug，反映快速迭代下跨平台 QA 覆盖仍存在盲区。整体呈现“功能扩张与基础设施修复并行”的特征，企业级 SSO 与远程开发场景成为最大的技术瓶颈。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Issues 数 | 今日 PR 数 | 最新 Release | 核心动态 |
|------|------|---------------|-----------|-------------|---------|
| Claude Code | anthropics/claude-code | 10+（热点列表） | 1（已关闭） | v2.1.326 | 小版本补丁，PR 活动低，以 Issue 讨论为主 |
| OpenAI Codex | openai/codex | 10+（热点列表） | 10+（多为 bot 自动合并） | Rust 0.171.0-alpha.8/9/10 | 高频 Alpha 迭代，TUI/沙箱/子代理修复密集 |
| Gemini CLI | google-gemini/gemini-cli | 49 | 21 | 无新版本 | Issue/PR 双高，P1 级子代理与浏览器代理 Bug 集中 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 0 | 0 | 无 | 过去24小时无活动 |
| OpenCode | anomalyco/opencode | 10+（热点列表） | 10+ | @opencode/pty@0.6.0 | PTY 守护进程协议更新，V2 认证与 Compaction 缓存为焦点 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 过去24小时无活动 |
| Hermes | NousResearch/hermes-agent | 12 | 50 | v0.23.2（补丁，~1,989 个合并 PR 汇总） | 桌面端流式渲染与工具策略作用域修复活跃 |
| OpenClaw | openclaw/openclaw | 10+（热点列表） | 10+ | v2026.11.4 稳定版 / v2026.11.5-beta.4 | 大版本发布后，Gateway 内存泄漏与 SQLite 升级锁死为 P0/P1 焦点 |

> 注：表中 Issues/PR 数为文中明确披露或热点列表统计，部分仓库未公开总数，仅反映今日高关注度条目。

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重合的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **企业身份与 MCP 集成** | Claude Code、OpenCode | Claude Code 围绕 MCP OAuth + Entra ID（AADSTS9010010）展开高频讨论；OpenCode 关注 MCP 连接注册状态可见性与服务端会话同步 |
| **子代理与多代理编排** | Claude Code、Gemini CLI、OpenAI Codex | Claude Code Agent Teams 与 Code Mode 协同；Gemini CLI 子代理状态误报（MAX_TURNS 仍上报 success）与挂起；Codex 子代理中断摘要保留与边界中断 |
| **跨平台桌面稳定性（Windows 优先）** | Claude Code、OpenAI Codex、OpenCode、Hermes | Claude Code Windows MSIX 内核泄漏与 Git Bash 回归；Codex Computer Use 浏览器状态读取与全局 UI 卡顿；OpenCode Windows 孤儿 PTY 锁定目录；Hermes Windows 交互式会话检测缺陷 |
| **会话状态与缓存一致性** | Claude Code、OpenCode、OpenClaw | Claude Code Remote Control Ghost 会话与 Worktree 目录复用；OpenCode Compaction 缓存中断点异常与缓存前缀被破坏；OpenClaw 升级后 SQLite 锁定与会话重置 |
| **TUI/终端交互体验** | OpenAI Codex、OpenCode、Gemini CLI | Codex 侧边栏源码行列跳转与状态行降级；OpenCode TUI 模型列表隐藏与 TPS 峰值异常；Gemini CLI AST 感知代码读取与文档预览 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | Agent Teams 协作、企业 SSO、远程开发（Remote Control） | 企业开发团队、跨平台远程开发者 | Electron/桌面端为主，强调与 Anthropic 生态及 Microsoft Entra ID 集成，MDM 策略部署成熟 |
| **OpenAI Codex** | Computer Use（桌面自动化）、子代理编排、TUI 终端体验 | AI 原生开发者、桌面端自动化探索者 | Rust SDK/CLI 预览版迭代快，沙箱与 PTY 架构深度优化，Windows 桌面端是重点战场 |
| **Gemini CLI** | 代码理解（AST 感知读取）、浏览器代理、子代理稳定性 | 代码密集型开发者、复杂代码库维护者 | Node.js/TypeScript 生态，强调上下文压缩与外科手术式代码定位，浏览器子代理为差异化能力 |
| **OpenCode** | V2 服务端架构、MCP 插件生态、多模态（视频生成）、会话缓存 | 平台构建者、插件开发者、长上下文推理用户 | 服务端 + 客户端分离，PTY 守护进程协议版本化，向可扩展平台与多模态 Agent 演进 |
| **Hermes** | 桌面端流式渲染、工具策略作用域、凭证池限流、代码执行安全 | 桌面 AI Agent 用户、多平台机器人运营者 | Electron 桌面应用，覆盖 Microsoft Store/Docker，强调凭证池与工具执行沙箱的安全边界 |
| **OpenClaw** | Gateway 网关稳定性、自托管部署、Telegram 交互组件、Cron 自动化 | 自托管用户、私有部署团队、多 Agent 调度场景 | 自托管网关架构，SQLite 并发与 V8 堆内存管理是核心技术债，强调私有 LAN 安全与密钥出站替换 |
| **DeepSeek Reasonix / Harness** | — | — | 过去24小时无社区活动，处于低活跃或维护期 |

## 5. 社区热度与成熟度

- **高活跃、快速迭代**：OpenAI Codex（Alpha 版本连续发布、PR 由自动化机器人高频合并）、Gemini CLI（49 Issues/21 PR 更新、P1 Bug 集中）、OpenCode（V2 架构与 PTY 协议迭代活跃）。这些工具社区反馈循环短，但也伴随较多回归性 Bug。
- **稳定补丁期**：Claude Code（仅 1 个 PR，以 Issue 讨论为主）、Hermes（v0.23.2 汇补丁，~1,989 个合并 PR 汇总）、OpenClaw（大版本发布后进入修复期）。功能相对成熟，当前重心在修复长期悬而未决的平台差异化问题。
- **低活跃/停滞**：DeepSeek Reasonix、Deepseek Harness 过去24小时无任何活动，社区关注度低或处于维护期。

## 6. 值得关注的趋势信号

1. **认证链路成为企业采用的首要门槛**  
   Claude Code 的 Entra ID 参数格式缺陷、OpenAI Codex 的浏览器访问主机不可用、OpenCode 的 V2 认证策略分歧，均指向同一趋势：AI CLI 工具向企业环境渗透时，SSO/OAuth 与细粒度权限控制的稳定性直接决定可落地性。技术决策者应将身份集成成熟度列为选型优先级。

2. **子代理编排从“可用”转向“可观测与可控”**  
   Gemini CLI 的子代理状态误报、Codex 的子代理中断摘要保留、Claude Code 的 Agent Teams 协同，表明行业已超越单代理对话阶段，社区开始关注多代理生命周期的可靠性、轨迹可见性与中断恢复能力。

3. **Windows 桌面端是 AI CLI 的“最后一公里”挑战**  
   从 Claude Code 的 MSIX 内核泄漏、Codex 的 Computer Use 全局卡顿、OpenCode 的孤儿 PTY 锁定目录，可见 Windows 平台底层兼容性（PTY、沙箱、浏览器集成）是当前所有桌面端 AI 工具的共同技术债。Windows 开发者团队需额外评估稳定性风险。

4. **自托管与私有部署需求回升**  
   OpenClaw 的私有 LAN 密钥出站替换、OpenCode 的 V2 免认证标志请求、Claude Code 的 MDM 策略部署，反映企业用户对数据主权与内网部署的重视，纯 SaaS 模式的 AI CLI 工具可能面临更高的合规门槛。

5. **MCP/插件生态正从“功能堆砌”转向“治理与可见性”**  
   OpenCode 要求公开 MCP 连接注册信号、Gemini CLI 修复系统 MCP 服务器权限检查、Claude Code 关注 MCP OAuth，说明插件生态已进入安全治理、状态可见性与版本兼容性的深水区。

**对开发者的参考建议**：若选型侧重企业级远程开发与 SSO，优先关注 Claude Code 与 OpenCode 的认证与会话管理修复进度；若侧重桌面自动化与多代理编排，OpenAI Codex 与 Gemini CLI 迭代最快但需承受 Alpha/预览版的不稳定性；若需自托管私有部署，OpenClaw 的网关内存泄漏与升级锁死问题需谨慎评估。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-17）

## 1. 热门 Skills 排行

以下按 PR 创建时间与更新活跃度综合排序，选取社区关注度较高的 8 个 Skills：

| 排名 | Skill / PR | 功能简介 | 社区讨论热点 | 状态 | 链接 |
|------|-----------|---------|------------|------|------|
| 1 | **mcp-builder** (#1742) | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入路径变更及自定义 HTTP 头配置问题，修复 `skills/mcp-builder/scripts/connections.py` 兼容性 | MCP 协议版本迁移导致现有 Skill 失效，开发者关注官方 Skill 对新版 MCP SDK 的适配速度 | OPEN | [#1742](https://github.com/anthropics/skills/pull/1742) |
| 2 | **skill-creator** (#1298) | 隔离触发评估（trigger evals），修复 Windows 下 `select()` 管道失效及运行时误判问题，避免非触发场景被错误标记为通过 | 技能创建工具本身的稳定性与跨平台兼容性，直接影响社区自建 Skill 的质量 | OPEN | [#1298](https://github.com/anthropics/skills/pull/1298) |
| 3 | **notion-spec-to-implementation** (#1245) | 将 Notion 产品/技术规格转换为 Claude Code 可执行的实现任务，包含任务拆分、验收标准与进度追踪 | 企业级文档到代码的自动化流程，社区对 Notion 生态集成需求强烈 | OPEN | [#1245](https://github.com/anthropics/skills/pull/1245) |
| 4 | **webapp-testing** (#1980) | 移除 `with_server.py` 中 `shell=True` 的子进程调用，消除命令注入风险（CWE-78） | 安全加固成为社区共识，Web 应用测试类 Skill 的安全性受到高度关注 | OPEN | [#1980](https://github.com/anthropics/skills/pull/1980) |
| 5 | **docx** (#1792) | 当 LibreOffice 超时时返回错误而非成功，并校验输出 DOCX 是否仍含修订痕迹（`w:ins`/`w:del` 等） | 文档处理 Skill 的鲁棒性与结果验证机制，社区关注 AI 生成文档的可信度 | OPEN | [#1792](https://github.com/anthropics/skills/pull/1792) |
| 6 | **proofcore-contract-auditor** (#1771) | Web3 智能合约审计 Skill，对 Solidity/Rust 合约进行静态分析，并将加密审计证明锚定至 TON 区块链 | 区块链/智能合约安全审计进入 Skills 生态，代表垂直领域专业化 Skill 的探索 | OPEN | [#1771](https://github.com/anthropics/skills/pull/1771) |
| 7 | **pyxel** (#525) | 复古游戏开发 Skill，指导 Python/Pyxel 游戏实现、无头输入驱动运行、帧检查与状态验证 | 游戏开发类 Skill 获得长期关注，创建时间较早但仍持续更新，显示娱乐/创意类 Skill 有稳定受众 | OPEN | [#525](https://github.com/anthropics/skills/pull/525) |
| 8 | **xlsx** (#2019) | 修复 `external_links_at_risk` 对工作表级定义名称与别名的识别，消除外部链接误报 | 电子表格类 Skill 的公式解析精度问题，社区关注 Office 文档处理的边界情况 | OPEN | [#2019](https://github.com/anthropics/skills/pull/2019) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼出四个最显著的需求方向：

### ① 安全与信任边界（Security & Trust）
- **#492**：社区技能被分发在 `anthropic/` 命名空间下，存在冒充官方技能的信任边界漏洞，用户可能误将社区技能当作官方技能授予高权限。（46 条评论，3 👍）
- **#1980**：Webapp-testing Skill 中 `shell=True` 导致命令注入风险，社区开始主动审计现有 Skill 的安全性。

### ② 组织内技能共享与分发（Org-wide Sharing）
- **#228**：希望在 Claude.ai 内直接实现组织级技能共享，避免手动下载 `.skill` 文件并通过 Slack/Teams 转发。（17 条评论，8 👍）
- **#189**：`document-skills` 与 `example-skills` 插件安装重复内容，导致 Claude Code 上下文窗口出现重复技能。（6 条评论，9 👍）

### ③ 技能创建与评估工链改进（Skill Creator / Eval Tooling）
- **#556**：`run_eval.py` 通过 `claude -p` 无法触发任何技能，触发率为 0%，导致技能评估失效。（13 条评论，7 👍）
- **#1352**：`run_eval.py` 多 worker 并行时会交叉匹配 Skill UUID，产生系统性误报。（6 条评论，3 👍）
- **#202**：`skill-creator` 技能本身更像开发者文档而非可执行技能，建议按最佳实践重写。（8 条评论，1 👍）

### ④ 垂直领域专业 Skill 提案
- **#1329**：`compact-memory`，面向长周期 Agent 的符号化紧凑状态记忆。（10 条评论）
- **#1385**：推理质量管道（Pre-task Calibration → Adversarial Review → Delivery Verification）。（7 条评论）
- **#412**：`agent-governance`，AI Agent 系统的安全策略、威胁检测与审计追踪。（6 条评论）
- **#1615**：`scnet-hpc`，面向 HPC 集群的 SSH/Slurm 操作技能。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、问题明确，若维护者审核通过，有望在近期合并：

1. **#1742 mcp-builder MCP 2.0 适配**  
   MCP 协议已升级至 2.x，该修复直接影响所有基于 `mcp-builder` 的 HTTP 类技能可用性，兼容性需求迫切。  
   [https://github.com/anthropics/skills/pull/1742](https://github.com/anthropics/skills/pull/1742)

2. **#1298 skill-creator 触发评估修复**  
   涉及 Windows 兼容性与误报问题，是社区自建技能质量控制的基础设施，修复后将提升新技能提交的可信度。  
   [https://github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

3. **#1245 notion-spec-to-implementation**  
   企业级需求明确，将 Notion 规格转为可执行任务，契合 Claude Code 在产品研发流程中的定位。  
   [https://github.com/anthropics/skills/pull/1245](https://github.com/anthropics/skills/pull/1245)

4. **#1980 webapp-testing 安全加固**  
   消除 `shell=True` 命令注入漏洞，符合社区对技能安全审计的高压态势，合并优先级高。  
   [https://github.com/anthropics/skills/pull/1980](https://github.com/anthropics/skills/pull/1980)

5. **#1792 docx 超时与修订验证**  
   提升文档处理技能的鲁棒性，解决“误报成功”问题，对依赖 LibreOffice 的文档工作流至关重要。  
   [https://github.com/anthropics/skills/pull/1792](https://github.com/anthropics/skills/pull/1792)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在官方技能集与社区贡献之间建立可信的安全边界与分发机制，同时完善技能创建、评估与跨平台兼容性的基础工链。**

---

# Claude Code 社区动态日报 (2026-11-17)

## 今日速览

Claude Code 发布 v2.1.326 小版本，主要完善 Agent Teams 与 Code Mode 的协同行为，并新增 CLI 工具参数校验警告。社区围绕 **MCP OAuth 与 Entra ID 认证**、**Remote Control 连接稳定性** 以及 **Windows 平台底层兼容性** 展开密集讨论，多个长期未解决的认证与会话管理问题持续获得高关注。

## 版本发布

**v2.1.326**  
- 支持在启用 Agent Teams 时开启 Code Mode；若已开启，携带 Teams 的会话将默认以 Code Mode 启动  
- 新增启动警告：当 `--allowedTools`、`--disallowedTools` 或 `--tools` 参数中包含格式不规范的条目时，提示用户  

[查看完整 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.326)

## 社区热点 Issues

以下 10 个 Issue 为过去 24 小时内评论数、点赞数或技术影响力最高的议题：

| # | 标题 | 状态 | 评论/👍 | 核心内容与重要性 | 链接 |
|---|------|------|---------|------------------|------|
| #34255 | Remote Control: 自动重连失效，连接静默断开无恢复 | OPEN | 74 / 112 | macOS/iOS 平台 Remote Control 连接断开后不自动恢复，影响远程开发场景的可用性，社区讨论持续半年以上。 | [链接](https://github.com/anthropics/claude-code/issues/34255) |
| #12346 | Add GitLab Integration (仓库连接、MR、移动端访问) | OPEN | 63 / 155 | 社区最高点赞的功能请求，呼吁原生支持 GitLab 仓库连接与合并请求，反映跨平台代码托管需求强烈。 | [链接](https://github.com/anthropics/claude-code/issues/12346) |
| #52871 | MCP OAuth 向 `resource` 参数追加尾部斜杠，导致 Entra ID 认证失败 (AADSTS9010010) | OPEN | 52 / 32 | macOS 平台 MCP OAuth 与 Microsoft Entra ID 集成缺陷，直接阻断企业级身份认证流程。 | [链接](https://github.com/anthropics/claude-code/issues/52871) |
| #44243 | 内置 Slack 连接器支持多工作空间 | CLOSED | 50 / 122 | 虽已关闭，但高点赞数显示多 Slack 工作空间支持是咨询/多租户场景用户的刚需，建议关注后续是否重新开放。 | [链接](https://github.com/anthropics/claude-code/issues/44243) |
| #44271 | OAuth 登录失败，返回 500 错误并 15s 超时，无法通过浏览器流程认证 | OPEN | 46 / 30 | 通用 OAuth 登录链路故障，影响新用户首次接入与现有用户重新认证。 | [链接](https://github.com/anthropics/claude-code/issues/44271) |
| #79808 | 无法登录 Claude Code：验证邮件被抑制，支持机器人无升级路径 | OPEN | 30 / 7 | 账号准入层面的问题，用户反馈验证邮件未送达且缺乏人工升级通道，属于高优先级客户体验问题。 | [链接](https://github.com/anthropics/claude-code/issues/79808) |
| #79366 | Worktree 会话复用之前会话的工作树目录，而非创建新目录 | OPEN | 21 / 21 | macOS 桌面端 Worktree 隔离机制缺陷，可能导致不同会话间文件混写，影响多任务并行开发的安全性。 | [链接](https://github.com/anthropics/claude-code/issues/79366) |
| #96870 | Windows MSIX 桌面端：通过 AppData 下的 Junction 打开路径时，每个子进程泄漏内核非分页池 (NtFC) | OPEN | 18 / 6 | Windows 特有的内核级内存泄漏，涉及 `bindflt.sys` 与 NTFS 连接点，长期运行可能导致系统不稳定。 | [链接](https://github.com/anthropics/claude-code/issues/96870) |
| #77372 | Remote Control：过期环境无法删除，Ghost 会话导致永久 404 错误 | OPEN | 10 / 2 | 远程控制环境管理缺陷，新环境注册后仍返回旧会话 404，阻断远程开发流程。 | [链接](https://github.com/anthropics/claude-code/issues/77372) |
| #110401 | 2.1.325 回归：裸 `claude` 命令在 Git Bash (mintty) 中退出，提示 "Input must be provided ... --print" | OPEN | 1 / 1 | 2.1.325 引入的回归性问题，影响 Windows 上使用 Git Bash 的开发者日常命令行工作流。 | [链接](https://github.com/anthropics/claude-code/issues/110401) |

## 重要 PR 进展

过去 24 小时内仅有 1 个更新的 Pull Request：

**#78049** `fix(mdm): Set-ClaudeCodePolicy.ps1` 在 32 位 PowerShell 主机中写入 Program Files (x86)  
- 状态：CLOSED  
- 内容：Intune 平台脚本默认在 32 位 PowerShell 主机中运行，`$env:ProgramFiles` 会指向 (x86) 路径，导致策略部署到错误目录。该修复针对 MDM 设备管理场景下的 Claude Code 策略部署问题。  
- [查看 PR](https://github.com/anthropics/claude-code/pull/78049)

> 注：社区近期 PR 活动较少，大部分更新集中在 Issue 讨论与 Bug 跟踪上。

## 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

1. **企业身份与 MCP 集成**  
   MCP OAuth 与 Microsoft Entra ID (Azure AD) 的兼容性问题高频出现（`resource` 参数尾部斜杠、AADSTS9010010/AADSTS650053 错误），企业级 SSO 集成是当前最大的技术瓶颈之一。

2. **第三代代码托管平台集成**  
   GitLab 原生集成请求点赞数遥遥领先，Slack 多工作空间支持也引发广泛讨论，用户希望 Claude Code 能更深度地嵌入现有企业协作栈。

3. **跨平台桌面稳定性**  
   Windows MSIX 内核内存泄漏、macOS Worktree 目录复用、Remote Control 幽灵会话等问题表明，桌面客户端在不同操作系统上的底层兼容性仍需加强。

4. **非开发者与个人自动化场景**  
   出现面向小学教师等非技术用户的“个人机器人套件”功能请求，显示社区开始关注低代码/无代码自动化编排能力。

5. **模型行为与成本控制**  
   Fable 5.2 未遵循配置的 PR 审查流程并浪费大量 Token，反映用户对模型指令遵循性与成本可预测性的要求提高。

## 开发者关注点

**高频痛点：**
- **认证与登录链路脆弱**：OAuth 500 错误、验证邮件抑制、Entra ID 参数格式问题，多个认证环节存在单点故障风险。
- **远程会话管理不稳定**：Remote Control 自动重连失效、Ghost 会话导致 404、Worktree 目录复用，影响远程开发和多会话隔离。
- **平台差异化 Bug**：Windows MSIX 内核泄漏、Git Bash 回归性问题、macOS 网络握手异常，提示跨平台 QA 覆盖仍有盲区。
- **支持升级路径缺失**：多个 Issue 提到支持机器人无法升级或缺乏人工介入通道，企业用户在遇到阻断性问题时反馈周期长。

**建议关注：**  
若您的团队依赖 Claude Code 进行企业级远程开发或 Entra ID 单点登录，建议优先评估 #52871、#34255 和 #44271 的修复进度；Windows 桌面端用户需留意 #96870 的内核泄漏风险。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-17  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

今日 Codex 社区围绕 **Windows 平台的 Computer Use 稳定性** 与 **跨平台性能回归** 展开密集讨论，多个长期未解决的 Windows 桌面端 Bug 在过去 24 小时内获得新评论。Rust 端连续发布三个 Alpha 版本（0.171.0-alpha.8/9/10），而 CLI/TUI 侧则有大量由自动化机器人合并的细粒度修复 PR，涉及沙箱、子代理、语音会话及文档预览等核心模块。

---

## 2. 版本发布

过去 24 小时内发布了 **Rust 端三个 Alpha 版本**，均属于 0.171.0 迭代系列：

| 版本 | 标签 | 说明 |
|------|------|------|
| rust-v0.171.0-alpha.8 | `0.171.0-alpha.8` | Rust SDK/CLI 预览版 |
| rust-v0.171.0-alpha.9 | `0.171.0-alpha.9` | Rust SDK/CLI 预览版 |
| rust-v0.171.0-alpha.10 | `0.171.0-alpha.10` | Rust SDK/CLI 预览版 |

> 注：发布说明未提供详细变更日志，建议关注 Rust 绑定或 CLI 工具链的下游消费者注意版本兼容性。

[查看所有 Release](https://github.com/openai/codex/releases)

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数及更新时效性）筛选，涵盖 Windows 桌面端、Linux/macOS 性能、模型行为及跨平台集成等方向。

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #51524 | [Windows] Computer Use 无法获取浏览器当前 URL（Chrome/Edge） | `sky.get_window_state({include_text:true})` 立即中断 Turn，导致 Windows 计算机使用功能在浏览器场景下不可用。 | 评论数最高（92 条），问题持续超一个月，Windows 用户反馈强烈。 | [查看 Issue](https://github.com/openai/codex/issues/51524) |
| #57641 | Windows 11 Brave 浏览器：Terminal CLI @Browser 提示 "browser access host is unavailable" | 桌面端更新至 26.1023.6123.0 后，CLI 浏览器访问主机不可用，Pro 订阅用户受影响。 | 53 条评论，40 个点赞，是本批次点赞数最高的 Issue，表明浏览器集成是高优先级痛点。 | [查看 Issue](https://github.com/openai/codex/issues/57641) |
| #56941 | Windows 计算机使用后全局 UI 卡顿，仅杀死 `codex-computer-use.exe` 可恢复 | 版本 26.1021.3705.0 下，使用 Computer Use 后整个 Windows 图形界面严重迟滞。 | 25 条评论，且在 **2026-11-17 今日更新**，说明问题仍在持续发酵。 | [查看 Issue](https://github.com/openai/codex/issues/56941) |
| #48369 | OpenAI 额度耗尽后 Send 按钮全局禁用 | 团队/个人订阅用量耗尽后，发送按钮持续置灰，无法恢复交互。 | 19 条评论，12 个点赞，涉及计费与 UX 的边界问题。 | [查看 Issue](https://github.com/openai/codex/issues/48369) |
| #60537 | Linux 桌面端：听写（Dictation）音频流异常导致播放增益永久降低 | Arch Linux 上流提前消失时，播放增益被永久“ducking”，影响音频体验。 | 15 条评论，Linux 平台音频生命周期缺陷。 | [查看 Issue](https://github.com/openai/codex/issues/60537) |
| #18620 | Windows 沙箱 Shell 命令失败：`CreateProcessWithLogonW` 错误 1326/1909 | 沙箱化工作区内执行 Shell 命令因登录凭证失败而中断，问题已悬而未决半年以上。 | 13 条评论，6 个点赞，长期存在的 Windows 沙箱认证痛点。 | [查看 Issue](https://github.com/openai/codex/issues/18620) |
| #44504 | Windows 桌面端 app-server 自身拒绝 feature key，远程状态标记为失败 | 桌面端 26.903.9818.0 附带 app-server 0.153.4，但自身拒绝其功能密钥，导致远程连接失败。 | 13 条评论，涉及本地服务与远程协作的版本不匹配。 | [查看 Issue](https://github.com/openai/codex/issues/44504) |
| #39816 | macOS 桌面端：空闲 `node_repl` 可视化内核堆积导致输入延迟 | 约 45 分钟内累积 60–70 个空闲内核（~600 MB），导致严重输入卡顿。 | 13 条评论，macOS 性能与内存泄漏问题。 | [查看 Issue](https://github.com/openai/codex/issues/39816) |
| #45021 | 模型输出文本丢失空格（单词与数字之间） | 影响 `exec` / `apply_patch` / `send_message_to_thread` 工具输出，出现于多个 CLI 版本。 | 12 条评论，14 个点赞，模型行为一致性问题，开发者关注度高。 | [查看 Issue](https://github.com/openai/codex/issues/45021) |
| #61294 | Windows 更新后本地 Codex 项目消失，历史聊天仍可访问 | 版本 26.1111 更新后本地项目列表丢失，引发数据可用性担忧。 | 6 条评论，创建于 2026-11-13，近期高优先级数据完整性问题。 | [查看 Issue](https://github.com/openai/codex/issues/61294) |

---

## 4. 重要 PR 进展（精选 10 条）

今日合并的 PR 绝大多数由 `copyberry[bot]` 自动化提交，均处于 CLOSED 状态，侧重于 **TUI 增强、沙箱稳定性、子代理中断机制及多平台兼容性**。

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #61916 | Preserve remote compaction summaries when interrupting child agents | 子代理在远程压缩期间被中断时保留摘要，防止答案丢失。 | [查看 PR](https://github.com/openai/codex/pull/61916) |
| #61915 | Fall back to the built-in status line for invalid providers | 无效的 `tui.status_line_provider` 不再阻止启动，改用内置状态行并发出警告。 | [查看 PR](https://github.com/openai/codex/pull/61915) |
| #61911 | Default Statsig metrics exports to Zstandard compression | Statsig 指标导出默认启用 Zstandard 压缩，降低遥测数据传输开销。 | [查看 PR](https://github.com/openai/codex/pull/61911) |
| #61910 | Preserve native sandbox executable paths and PTY dispatch names | 修复非 UTF-8 路径下沙箱可执行文件路径丢失，以及 PTY 自定义 `argv[0]` 调度问题。 | [查看 PR](https://github.com/openai/codex/pull/61910) |
| #61909 | Add opt-in item-boundary interrupts for subagents | 新增多代理 v2 设置 `interrupt_at_item_boundary`（默认关闭），允许子代理在完成当前输出项后中断。 | [查看 PR](https://github.com/openai/codex/pull/61909) |
| #61908 | Pass a per-call voice session ID through TUI realtime startup | TUI 实时通话生成 UUID v4 作为语音会话 ID，通过请求头与 `thread/realtime/start` 透传，便于追踪。 | [查看 PR](https://github.com/openai/codex/pull/61908) |
| #61902 | Filter thread listings before scanning rollout previews | 在读取会话元数据后立即应用线程过滤，避免扫描被排除的 Rollout 预览，提升列表性能。 | [查看 PR](https://github.com/openai/codex/pull/61902) |
| #61900 | Fix proc mount fallback detection for Bubblewrap 0.12 | 适配 Bubblewrap 0.12 的 proc 挂载失败路径，确保 Linux 沙箱预检能正确触发回退机制。 | [查看 PR](https://github.com/openai/codex/pull/61900) |
| #61898 | Tie Linux sandbox proxy bridges to the launcher lifetime | Linux 沙箱退出或取消时，主机代理桥随启动器生命周期关闭，避免描述符耗尽。 | [查看 PR](https://github.com/openai/codex/pull/61898) |
| #61890 | Open source file links at line and column targets in the TUI | TUI 侧边栏预览支持源码文件及行列定位（如 `./Makefile#L12C3`），并高亮目标行。 | [查看 PR](https://github.com/openai/codex/pull/61890) |

[查看所有 PR](https://github.com/openai/codex/pulls)

---

## 5. 功能需求趋势

从 Issues 与 PR 中提炼出的社区关注方向：

1. **跨平台桌面端稳定性（尤其是 Windows）**  
   Computer Use 在 Windows 上的浏览器状态读取、全局 UI 卡顿、沙箱 Shell 认证失败等问题集中爆发，表明 Windows 桌面端是当前最高优先级的修复领域。

2. **子代理与多代理编排**  
   多个 PR 围绕 `interrupt_at_item_boundary`、父代理自动唤醒、远程压缩摘要保留展开，社区正在推动更细粒度的子代理生命周期控制。

3. **TUI 与文档预览体验**  
   侧边栏文档预览、源码行列跳转、搜索与链接导航等 PR 密集合并，说明终端用户界面的可读性与交互能力正在快速迭代。

4

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-17)

## 今日速览

过去24小时内，Gemini CLI 仓库未发布新版本，但社区活跃度保持高位：49 个 Issue 和 21 个 PR 获得更新。核心讨论集中在 **子代理（Subagent）稳定性**、**浏览器代理兼容性** 以及 **AST 感知代码读取** 三个方向，多个 P1 级别 Bug 指向代理挂起和状态误报问题，亟待维护者跟进。

## 版本发布

过去24小时内无新版本发布。

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 评论/赞 | 关注理由 |
|---|------|-------------|---------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption | P1 / Bug | 13 / 2 | 子代理在触发最大轮次限制后仍上报 `status: "success"`，导致中断被掩盖，直接影响任务可靠性。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 / Bug | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，社区赞同度高，是当前最严重的可用性 Bug 之一。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 / Enhancement | 9 / 1 | 提出利用模型原生 Bash 能力构建零依赖 OS 沙箱，属于架构层面的安全与能力增强方向。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 7 / 1 | 探索 AST 感知的文件读取与搜索，旨在减少上下文膨胀并提升代码定位精度，是性能优化的重要方向。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 / Bug | 7 / 0 | 模型主动调用自定义技能和子代理的意愿不足，影响自动化工作流的落地体验。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | [BUG] Browser Agent ignores settings.json overrides (e.g., maxTurns) | P2 / Bug | 5 / 0 | 浏览器代理未遵循全局/项目级配置覆盖，导致 `maxTurns` 等关键参数失效。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 / Bug | 4 / 1 | 浏览器子代理在 Wayland 环境下失效，影响 Linux 桌面用户的可用性。 |
| [#30320](https://github.com/google-gemini/gemini-cli/issues/30320) | 403 TOS_VIOLATION (account disabled) on Cloud Code content generation | 待分级 | 1 / 0 | 新提交 Issue，账户因 TOS 违规被云端后端硬封禁，内容生成接口直接返回 403，属账号层面的紧急问题。 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Agent should stop/discourage destructive behavior | P2 / Customer Issue | 3 / 1 | 模型可能执行 `git reset --force` 等破坏性命令，社区呼吁增加安全拦截与提示机制。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done output hook causes crash | P1 / Bug | 3 / 0 | 输出钩子在打印用户摘要时导致 CLI 崩溃，影响交互流程的稳定性。 |

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#30321](https://github.com/google-gemini/gemini-cli/pull/30321) | chore(deps): update workspace dependencies and sandbox runtime packages | OPEN | 更新工作区 npm 依赖，并优化 Stage 2 沙箱容器 Dockerfile，使系统包、全局 npm 工具链与依赖 overrides 保持一致。 |
| [#30292](https://github.com/google-gemini/gemini-cli/pull/30292) | fix(core): preserve oversized background log tails and mark truncated reads | OPEN | 修复 `read_background_output` 在读取超过 64KB 日志时丢失首行的问题，防止单行超长日志输出被截断。 |
| [#30319](https://github.com/google-gemini/gemini-cli/pull/30319) | chore(gcp): push development worker to private artifact registry | OPEN | 将开发者 Worker 镜像推送目标从公共仓库改为私有 `gemini-code-containers` 制品库，提升供应链安全。 |
| [#30305](https://github.com/google-gemini/gemini-cli/pull/30305) | docs(extensions): stop recommending an excludeTools form that never matches | OPEN | 修正扩展文档中 `excludeTools` 的错误用法，文档此前承诺可阻止特定命令，但实际因全名匹配机制失效。 |
| [#30283](https://github.com/google-gemini/gemini-cli/pull/30283) | fix(cli): skip system MCP servers with insecure command permissions | CLOSED | 对系统级 MCP 服务器命令及脚本参数增加所有权与写权限检查，防止不安全配置被加载。 |
| [#30316](https://github.com/google-gemini/gemini-cli/pull/30316) | fix(core): preserve custom model alias generation settings | OPEN | 修复自定义模型别名在指向 `flash-lite` 等模型层级时，`applyModelSelection()` 因字符串不相等导致配置未生效的问题。 |
| [#30289](https://github.com/google-gemini/gemini-cli/pull/30289) | fix(cli): disclose canonical link path and default consent prompt to no | OPEN | `gemini extensions link` 命令及非交互式同意流程现通过 `fs.realpathSync` 解析规范路径，并将默认同意提示改为“否”。 |
| [#30315](https://github.com/google-gemini/gemini-cli/pull/30315) | fix(cli): detect local git clone from CLI path instead of cwd | OPEN | 修复自动更新在非克隆根目录运行时，误将本地源码检出识别为全局 npm 安装的问题。 |
| [#30097](https://github.com/google-gemini/gemini-cli/pull/30097) | fix(cli): make image paste work on WSL2 (WSLg clipboard detection + BMP fallback) | OPEN | 修复 WSL2/WSLg 环境下图片粘贴失效：新增 `WAYLAND_DISPLAY` / `DISPLAY` 回退检测及 BMP 格式降级。 |
| [#30281](https://github.com/google-gemini/gemini-cli/pull/30281) | fix(core): honor configured fetch timeouts on Node 26 | OPEN | 升级 Undici 至 7.30.2，使 Node 26 内置 fetch 能正确使用配置的全局调度器，并新增回归测试。 |

## 功能需求趋势

从近期 Issue 与 PR 中可提炼出以下社区关注方向：

1. **子代理与技能编排**：多个 Issue 指出子代理状态报告不准确（#22323）、主动调用不足（#21968）、轨迹不可见（#22598），社区希望获得更可靠、更透明的子代理生命周期管理。
2. **代码理解与上下文优化**：AST 感知的文件读取、搜索与映射（#22745、#22746、#22747）、外科手术式读取（#19561）反映开发者希望降低 Token 消耗并提升代码定位精度。
3. **跨平台与环境兼容性**：Wayland 浏览器代理失败（#21983）、WSL2 图片粘贴（#30097）、Windows Shell 描述准确性（#30312）显示跨平台体验仍是短板。
4. **安全与防护**：破坏性命令拦截（#22672）、MCP 服务器权限检查（#30283）、扩展同意流程（#30289）表明社区对代理自主操作的安全边界要求提高。
5. **配置与可扩展性**：`settings.json` 覆盖失效（#22267）、代理符号链接识别（#20079）、按工作区策略添加（#18397）等，开发者希望配置系统更灵活且生效可预期。

## 开发者关注点

- **稳定性痛点**：通用代理挂起（#21409）、输出钩子崩溃（#22186）、背景日志读取丢失（#30292）等问题直接影响日常使用，建议优先修复 P1 级 Bug。
- **子代理可观测性**：子代理轨迹无法通过 `/chat share` 方便共享（#22598），Bug 报告缺乏子代理上下文（#21763），调试成本较高。
- **浏览器代理脆弱性**：配置被忽略（#22267）、Wayland 环境失效（#21983）、会话锁恢复机制缺失（#22232），浏览器子代理仍是不稳定模块。
- **大工具集与上下文管理**：工具数量超过 128 个时触发 400 错误（#24246），模型倾向在随机位置生成临时脚本（#23571），上下文污染与工具作用域控制成为性能瓶颈。
- **账号与服务端限制**：新出现的 403 TOS_VIOLATION 问题（#30320）提示云端内容生成接口的账号封禁机制对 CLI 用户造成硬阻断，缺乏清晰的申诉与恢复路径。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-17)

## 今日速览

OpenCode 昨日发布 `opencode-pty@0.6.0`（protocol 9），并持续推进 v2 版本的核心稳定性修复。社区关注度集中在 **Windows 孤儿 PTY 进程**、**Compaction 缓存中断点异常**、**V2 服务端认证策略** 以及 **MCP 与插件生态** 等方向，多个高优先级 Bug 已进入修复流程。

---

## 版本发布

| 版本 | 更新内容 | 链接 |
|------|---------|------|
| `@opencode/pty@0.6.0` (protocol 9) | `process-daemon` 升级至 v0.6.0，发布至 npm。PTY 守护进程协议更新，为后续多平台终端管理奠定基础。 | [process-daemon-v0.6.0](https://github.com/anomalyco/opencode/releases/tag/process-daemon-v0.6.0) |

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 关注理由 | 链接 |
|---|------|------|---------|------|
| #28696 | Plugin/Agent/Skills 等市场/注册表/包分发系统 | CLOSED | 社区长期期待的统一市场/注册表功能，已获 38 👍 和 16 条讨论，属于生态扩展的核心需求。 | [查看](https://github.com/anomalyco/opencode/issues/28696) |
| #43039 | [2.0] 为 `opencode2 serve` 增加 no password 标志 | OPEN | V2 默认开启认证，与 V1 不一致，社区强烈请求增加免认证标志，已获 35 👍。 | [查看](https://github.com/anomalyco/opencode/issues/43039) |
| #54916 | Compaction 收缩会恢复被 compaction hook 移除的文本 | OPEN | severity:high。插件通过 `ctx.session.hook("compaction")` 进行的敏感信息编辑可能被重新暴露给模型，存在数据泄露风险。 | [查看](https://github.com/anomalyco/opencode/issues/54916) |
| #62554 | 单次提示（目标提醒、keep-alive 等）会破坏缓存前缀 | OPEN | 影响会话缓存命中率和长上下文性能，属于核心推理效率问题。 | [查看](https://github.com/anomalyco/opencode/issues/62554) |
| #64317 | 桌面端关闭 worktree 会话后，Windows 上残留孤儿 pty shell 锁定目录 | OPEN | 导致 worktree 目录无法删除，严重影响 Windows 开发者的工作流，需配合 `opencode-pty` 修复。 | [查看](https://github.com/anomalyco/opencode/issues/64317) |
| #64326 | `opencode run` 作为子进程直接启动时，`"bash": {"*": "deny"}` 权限规则被忽略 | CLOSED | 安全权限绕过问题，直接子进程与 shell 启动行为不一致，已修复并关闭。 | [查看](https://github.com/anomalyco/opencode/issues/64326) |
| #64321 | TUI 模型对话框隐藏搜索能找到的 provider 模型 | CLOSED | TUI 可用性 Bug，提供者下模型列表不完整，影响模型选择体验。 | [查看](https://github.com/anomalyco/opencode/issues/64321) |
| #64327 | 新增 Notebook/Scratchpad 用于保存提示片段和 Agent 输出 | OPEN | 社区提出的会话草稿本功能，反映用户希望在会话中更灵活地管理中间内容。 | [查看](https://github.com/anomalyco/opencode/issues/64327) |
| #64325 | 需公开信号表明客户端附加的 MCP 连接已注册（及其服务名称） | OPEN | MCP 生态可见性需求，客户端无法得知服务端何时会使用其工具。 | [查看](https://github.com/anomalyco/opencode/issues/64325) |
| #64322 | 服务端“标记为未读”会话（session.unview） | OPEN | 客户端本地标记无法同步，社区希望将会话未读状态下沉到服务端。 | [查看](https://github.com/anomalyco/opencode/issues/64322) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #63666 | feat(core): 在服务端视频服务中添加实验性视频生成工具 | OPEN | Agent 可生成视频，构建在 PR #64140 的视频 API 之上，扩展多模态能力。 | [查看](https://github.com/anomalyco/opencode/pull/63666) |
| #64140 | feat(server): 带磁盘备份媒体的异步视频生成 API | CLOSED | 视频生成的 HTTP 层实现，客户端可异步请求视频生成，媒体以磁盘方式备份。 | [查看](https://github.com/anomalyco/opencode/pull/64140) |
| #64316 | fix(core): 为每个 Code Mode 调用分配独立 ID（隐藏父级） | CLOSED | 修复 `execute` 程序内所有工具调用共享同一 ID 的问题，确保 `ctx.id`、`event.id` 和 `gen_ai.tool.call.id` 唯一。 | [查看](https://github.com/anomalyco/opencode/pull/64316) |
| #64313 | fix(core): 为每个 Code Mode 调用分配独立 ID | CLOSED | 同上修复的另一种方案，将 `execute` 调用 ID 设为字段而非隐藏父级，二者择一合并。 | [查看](https://github.com/anomalyco/opencode/pull/64313) |
| #64324 | fix(core): 为每个 Code Mode 调用分配独立 ID | OPEN | 另一份相同修复的 PR，允许插件正确区分程序内的每个工具调用。 | [查看](https://github.com/anomalyco/opencode/pull/64324) |
| #64318 | fix(session): 当 token 成批到达时停止 tok/s 峰值 | OPEN | 修复 #64308，解决 TUI 显示不切实际的高 TPS 数字问题。 | [查看](https://github.com/anomalyco/opencode/pull/64318) |
| #64309 | feat(core): 在 Code Mode 中添加 `shell_wait` 和基于状态的 shell 结果 | CLOSED | 开启 `full_codemode` 后，脚本可等待 shell 命令完成，`shell` 和新增 `shell_wait` 返回带状态的结果。 | [查看](https://github.com/anomalyco/opencode/pull/64309) |
| #64319 | feat(core): 使用 shell_status 等待 Code Mode shell | OPEN | 脚本可最多等待 10 秒 shell 完成，完善 Code Mode 下的 shell 交互。 | [查看](https://github.com/anomalyco/opencode/pull/64319) |
| #64314 | fix(core): 从 shell 结果中移除“移至后台”消息 | OPEN | 后台 shell 结果现在以 shell ID、PID 和输出路径开头，移除重复的“moved to the background”提示。 | [查看](https://github.com/anomalyco/opencode/pull/64314) |
| #64310 | fix(process-daemon): 将控制器切换测试与 PTY 输入同步 | CLOSED | 修复 macOS Intel 发布失败的测试夯实问题，提升 PTY 守护进程测试稳定性。 | [查看](https://github.com/anomalyco/opencode/pull/64310) |

---

## 功能需求趋势

从近 24 小时的 Issues 和 PR 可观察到以下社区关注方向：

1. **MCP 与插件生态成熟度**：用户希望获得更透明的 MCP 连接状态信号（#64325）、服务端会话状态同步（#64322），以及统一的插件/Agent 市场（#28696），表明社区正从单一工具向可扩展平台演进。
2. **会话缓存与长上下文优化**：多个 Issue 指向 Compaction 缓存中断点、单次提示破坏缓存前缀（#62554、#64311），说明长上下文推理效率是核心痛点。
3. **桌面端与跨平台稳定性**：Windows 孤儿 PTY 进程（#64317）、Android 侧边栏手势冲突（#63530）、macOS 快捷键不匹配（#64307）等问题集中爆发，跨平台客户端体验亟待加强。
4. **安全与权限细粒度控制**：V2 服务端认证策略（#43039）、子进程权限规则绕过（#64326）、敏感信息被 Compaction 恢复（#54916），安全合规成为高优先级需求。
5. **多模态与媒体支持**：视频生成工具（#63666、#64140）的加入，显示 OpenCode 正在向多模态 Agent 能力扩展。

---

## 开发者关注点

- **安全权限一致性**：`opencode run` 在直接子进程与 shell 启动下的权限执行不一致（#64326），开发者需确保所有启动路径均严格执行 deny 规则。
- **Compaction 数据安全**：Compaction 收缩时会丢弃插件通过 hook 所做的文本编辑（#54916），可能导致已 redact 的敏感内容重新进入模型上下文，需尽快修复。
- **Windows 资源锁定**：关闭 worktree 会话后 pty shell 孤立并锁定目录（#64317），影响开发者日常文件操作，与 `opencode-pty` 进程管理直接相关。
- **TUI 可用性缺陷**：模型对话框隐藏可用模型（#64321）、TPS 显示异常峰值（#64308/#64318）、快捷键标签与行为不符（#64307），均影响日常开发体验。
- **认证策略分歧**：V2 `serve` 默认开启认证与社区期望的免认证选项存在分歧（#43039），需在安全性与便捷性之间取得平

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 | 2026-11-17

## 今日速览

Hermes Agent 于 2026-11-16 发布补丁版本 **v0.23.2**，汇总了自 v0.23.1 以来约 1,989 个合并 PR，覆盖 CLI、安装程序、Microsoft Store、Docker 及 Hermes Cloud；完整变更日志将随 v0.24 发布。当日社区活跃度较高，12 条 Issue 和 50 个 PR 集中在桌面端流式渲染、工具策略作用域、凭证池限流、Windows 平台兼容性及代码执行内存泄漏等核心领域，维护者 @jquesnelle 和 @teknium1 贡献了大量桌面端与 CLI 修复。

## 版本发布

| 版本 | 发布日期 | 类型 | 更新摘要 |
|------|----------|------|----------|
| **v0.23.2** | 2026-11-16 | Patch | 稳定版补丁，汇总 ~1,989 个自 v0.23.1 以来的合并 PR。覆盖 CLI 和安装程序、Microsoft Store 应用、Docker 及 Hermes Cloud。完整 curated 变更说明将随 v0.24 发布。 |
| **v0.23.1+canary.20261116T070005Z** | 2026-11-16 | Canary | 金丝雀构建，提供 Hermes Desktop 下载（macOS Apple Silicon DMG 等）。 |

[查看完整 Release 页面](https://github.com/NousResearch/hermes-agent/releases)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 严重度/标签 | 关键指标 | 为何值得关注 | 链接 |
|---|------|-------------|----------|--------------|------|
| #135684 | openai-codex + 自动选择 openai-native 网络搜索，每次搜索均失败并返回 server_error | P3, bug, comp/agent, comp/tools, comp/plugins, tool/web, provider/openai, area/config, area/streaming | 创建：10-09 | 更新：11-16 | 评论：6 | 影响 openai-codex 提供商下的原生网络搜索功能，搜索调用本身已完成但最终返回通用服务器错误，已持续超过一个月，社区关注度高。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/135684) |
| #100077 | Email adapter 的 connect() 阻塞网关事件循环，导致其他平台（如 QQBot）心跳 RST 断连 | P2, bug, comp/plugins, platform/email | 创建：09-01 | 更新：11-16 | 评论：4 | `imaplib` 和 SMTP 阻塞调用直接写在 `async def` 中，未使用 `run_in_executor`，重连时会拖垮整个网关事件循环，跨平台影响大。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/100077) |
| #156706 | Web 应用（dist-webapp）获取 `/api/dashboard/plugins` 后丢弃，插件标签页 API 为 true、挂载为 false | P2, bug, comp/dashboard | 创建：11-16 | 更新：11-17 | 评论：1 | 桌面端 Web App 插件面板核心故障，API 返回完整插件列表但前端未渲染，直接影响插件可用性。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/156706) |
| #156677 | `check_execute_code_guard` 在无人值守上下文中短路评估，绕过后续拒绝策略 | P3, security, bug, comp/tools, tool/code-exec | 创建：11-16 | 更新：11-16 | 评论：1 | 安全漏洞：单查询 `-q` 模式和定时 Cron 任务等无人值守场景下，任意 Python 脚本执行可能绕过拒绝策略。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/156677) |
| #156641 | 凭证池：429 响应仅在消息体中携带重置窗口时，仍在同一键上等待；使用限制令牌不可按提供商配置 | P2, bug, comp/agent, area/auth, area/config | 创建：11-16 | 更新：11-16 | 评论：1 | 限流重试逻辑缺陷，PR #155714 修复不完整，可能导致 API 配额浪费和任务排队。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/156641) |
| #156637 | `session_search`：Cron 降级在 300 行扫描后执行，导致 300 条较新 Cron 消息掩盖所有交互式会话 | P2, bug, comp/tools, area/sessions | 创建：11-16 | 更新：11-16 | 评论：1 | 会话搜索发现逻辑缺陷，交互式会话被大量 Cron 消息淹没，影响检索体验。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/156637) |
| #156671 | `TodoStore._sanitize_parents` 从遍历根节点而非环节点弹出父级 | P2, bug, comp/tools | 创建：11-16 | 更新：11-16 | 评论：1 | 待办事项工具的循环引用修复逻辑错误，可能导致任务树结构损坏。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/156671) |
| #156668 | Windows `facts._windows_interactive_session` 在 kernel32 而非 user32 上调用 `GetProcessWindowStation` | P2, bug, os/windows | 创建：11-16 | 更新：11-16 | 评论：1 | Windows 平台特定 Bug，影响 RDP、快速用户切换等非控制台会话下的交互式会话检测。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/156668) |
| #155798 | 托管 Whisper STT 可能将配置的 `stt.prompt` 作为转录文本返回，Agent 随即回答该提示 | P3, bug, comp/tools, tool/tts | 创建：11-14 | 更新：11-16 | 评论：2 | 语音转文字弱解码时，词汇提示被误识别为转录内容，导致 Agent 对错误文本做出响应。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/155798) |
| #156723 | `execute_code` 会话内核在单元格出现 `MemoryError` 后未释放内存 | P2, perf, bug, comp/tools, tool/code-exec, area/config | 创建：11-16 | 更新：11-16 | 评论：0 | 内存泄漏：内核仅在超时/中断时释放，`MemoryError` 路径下未处理，长期运行会耗尽资源。 | [打开 Issue](https://github.com/NousResearch/hermes-agent/issues/156723) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 类型/标签 | 功能或修复摘要 | 链接 |
|---|------|------|-----------|----------------|------|
| #156728 | fix(tools): 工具策略读取应遵守托管作用域 | @jquesnelle | security, bug, comp/tools, tool/terminal, tool/web, tool/code-exec, area/config, P3 | 修复 `tools/url_safety.py`、`tools/env_passthrough.py`、`tools/credential_files.py` 三个工具层读取器忽略托管作用域的问题，统一读取 profile 的 `config` 而非错误作用域。 | [打开 PR](https://github.com/NousResearch/hermes-agent/pull/156728) |
| #156734 | fix(desktop): 回合结束报告未结算下一回合 | @jquesnelle | bug, comp/desktop | 修复桌面端在上一回合完成后立即启动新回合时，停止按钮和运行中回复状态异常保留的问题。 | [打开 PR](https://github.com/NousResearch/hermes-agent/pull/156734) |
| #156731 | fix(desktop): 网关报告完成的回复未显示为失败 | @jquesnelle | bug, P2, area/streaming | 修复当网关报告 `complete` 但回复文本以提供商错误开头时，桌面端错误将其显示为成功答案的问题。 | [打开 PR](https://github.com/NousResearch/hermes-agent/pull/156731) |
| #156726 | feat(desktop): 沙箱文件夹和站点请求的审批卡片 | @jquesnelle | feature, tool/terminal, P3, area/i18n | 为桌面端审批卡片新增文件夹和网站请求类型，支持 Allow / Always allow / Deny 及原因，首个用户为 OpenShell 插件。 | [打开 PR](https://github.com/NousResearch/hermes-agent/pull/156726) |
| #156733 | fix(dashboard): 晚期绑定辅助程序等待另一线程仍在导入的模块 | @jquesnelle | bug, P2 | 修复 `web_deps.late()` / `LateState()` 在并发首次调用时因循环导入而卡死，改为直接失败并报错。 | [打开 PR](https://github.com/NousResearch/hermes-agent/pull/156733) |
| #156732 | fix(desktop): 暂停后继续的回复未显示为停止 | @jquesnelle | bug, P2, area/streaming | 修复暂停后继续的回复在重载后或等待期间状态显示错误，新增“Continuing…”中间状态。 | [打开 PR](https://github.com/NousResearch/hermes-agent/pull/156732) |
| #156730 | fix(models): 在主端点探测中发送模型块的 key_env 凭证 | @jquesnelle | bug, area/auth, P2 | 修复带 `key_env` 或 `api_key` 的自定义模型在主端点元数据探测时返回 401 的问题。 | [打开 PR](https://github.com/NousResearch/hermes-agent/pull/156730) |
| #156725 | feat(profiles): 插件在其他位置运行时，绝不在主机上运行 profile | @jquesnelle | feature, comp/agent, comp/cli, comp/cron, P3, area/profiles | 允许插件在沙箱或其他主机启动器中运行 profile 后端，避免主机网关重复运行该 profile 的 cron

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报
**日期**: 2026-11-17  
**数据来源**: github.com/openclaw/openclaw

---

## 1. 今日速览

OpenClaw 今日发布稳定版 **v2026.11.4**（220 commits、125 PR、90 贡献者参与）及测试版 **v2026.11.5-beta.4**，后者引入 Telegram 交互组件渲染并修复并发数据库场景下的 Transcript 读取问题。社区高度关注 **Gateway 内存泄漏** 与 **2026.11.3→2026.11.4 升级 SQLite 锁死** 两个 P0/P1 级故障，多个相关修复 PR 已提交并等待合入。

---

## 2. 版本发布

### v2026.11.4（稳定版）
- 规模：220 commits，125 pull requests，90 contributors
- 完整发布说明：[Release notes](https://docs.openclaw.ai/releases/2026.11.4)

### v2026.11.5-beta.4（测试版）
**主要变更：**
- **Telegram widgets**：将交互式组件渲染为 Telegram 消息（#196991，@obviyus 贡献）
- **Transcripts and attachments**：在并发数据库准备期间保持 Transcript 读取可用，并释放已完成的 SQLite 读取器

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 核心内容 | 为何重要 | 链接 |
|---|------|------------|---------|---------|------|
| #200289 | 2026.11.3 → 2026.11.4 更新耗时数小时，网关切换时 SQLite 锁定，需 SSH 恢复 | P0, crash-loop, ux-release-blocker | 稳定版升级导致 Gateway 长时间不可用，记录 SQLite 锁定失败 | 直接影响生产环境升级体验，属发布阻塞级问题 | [查看](https://github.com/openclaw/openclaw/issues/200289) |
| #185578 | Gateway 堆上限仅单向增长，每运行一次 system prompt/skills 字符串保持可达（~25 MiB/h，直至 V8 上限中止） | P1, crash-loop, silver shellfish | 内存泄漏导致长期运行后进程被 V8 堆上限强制终止 | 影响多 Agent 高频会话场景的稳定性，已有 10 条社区讨论 | [查看](https://github.com/openclaw/openclaw/issues/185578) |
| #198802 | Gateway 堆每小时增长 ~90 MB：进程插件缓存保留每一代原生命名空间成员映射（含已禁用插件） | P1, crash-loop, diamond lobster | 插件缓存未按代释放，导致内存持续攀升 | 与 #185578 同属内存泄漏类问题，社区关注度高 | [查看](https://github.com/openclaw/openclaw/issues/198802) |
| #200309 | 来自已认证 Control UI 客户端的 sessions.create 在无用户操作下原位重置主会话（上下文+缓存前缀丢失，senderId 未知） | P1, session-state, gold shrimp | 单操作员部署中主会话在 16 秒内被重置 4 次 | 涉及会话状态完整性，属回归缺陷 | [查看](https://github.com/openclaw/openclaw/issues/200309) |
| #200307 | 无关同 Agent 会话创建中止 cron 条件并可能禁用 watcher | P1, fix-shape-clear, diamond lobster | 身份变更订阅者将两个缺失的会话 ID 视为相等，导致 cron 条件丢失操作员权限 | 影响定时自动化任务的可靠性 | [查看](https://github.com/openclaw/openclaw/issues/200307) |
| #200308 | 允许针对操作员允许列表私有 IP 的明文 HTTP 进行密钥出站替换 | P2, enhancement, security, diamond lobster | 自托管用户在私有 LAN 上使用明文 HTTP，需将受保护密钥替换到请求中 | 涉及私有网络安全与密钥管理，社区关注安全特性 | [查看](https://github.com/openclaw/openclaw/issues/200308) |
| #200271 | 启动时迁移已完成保留的 Agent 存储并因 vec0 错误崩溃 | P1, crash-loop, diamond lobster | 网关启动时尝试迁移已删除但保留的 Agent 数据库导致崩溃 | 已关闭，相关修复 PR #200284 已合入 | [查看](https://github.com/openclaw/openclaw/issues/200271) |
| #196048 | templates add 失败后新 Agent 被遗留，重试会产生重复 | P2, ux-friction, diamond lobster | 模板添加失败后回滚被配置名单守卫拒绝，留下半添加 Agent | 影响模板工作流的可用性，已关闭 | [查看](https://github.com/openclaw/openclaw/issues/196048) |
| #200296 | Getting Started 阅读提示缺少连字符（“First-time”） | P3, docs bug | 文档拼写错误 | 轻微文档问题，已关闭 | [查看](https://github.com/openclaw/openclaw/issues/200296) |
| #200312 | fix(cron)：刷新插件发布后的陈旧脚本准备 | size: S | 插件安装后已创建的脚本自动化因工具未定义而失败 | 影响插件热加载后的自动化任务恢复 | [查看](https://github.com/openclaw/openclaw/pull/200312) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|------|--------------|------|
| #200301 | improve(ui)：Cmd+K 优先列出命名设置并改进会话搜索 | @roboclaw-bot | OPEN | Web UI 快捷键搜索体验优化，提升设置与会话查找效率 | [查看](https://github.com/openclaw/openclaw/pull/200301) |
| #200253 | fix(gateway)：会话删除后发布结果无限重试 | @seriouslysean | OPEN | 修复会话在发布结算前被删除时，GitHub 发布结果在每次协调轮询中永久重试的问题 | [查看](https://github.com/openclaw/openclaw/pull/200253) |
| #197394 | feat(cron)：在空闲内存不足时最多运行 16 个自动化任务 | @daniel-lxs | OPEN | 提升 Cron 自动化并发上限，并在内存紧张时保留一个运行名额，避免 OOM | [查看](https://github.com/openclaw/openclaw/pull/197394) |
| #200313 | fix(ci)：修复 beta 资格边界 | @RomneyDa | OPEN | 修复发布资格验证失败，清理无用私有辅助函数与过期导出 | [查看](https://github.com/openclaw/openclaw/pull/200313) |
| #200306 | fix(storage)：允许缺失存储读取后创建第一个会话 | @vincentkoc | OPEN | 修复在读取到空 Agent 数据库后，首次会话创建失败的问题 | [查看](https://github.com/openclaw/openclaw/pull/200306) |
| #200303 | fix(templates)：提前释放模板管理的 Agent | @Patrick-Erichsen | OPEN | 新增 `openclaw templates release <agent-id>`，允许操作员在变更设置后保留 Agent 及工作区 | [查看](https://github.com/openclaw/openclaw/pull/200303) |
| #200284 | fix(state)：防止已保留删除的 Agent 阻塞网关启动 | @roboclaw-bot | CLOSED | 修复 #200271，允许活跃 Agent 启动而保留已删除 Agent 的文件不变 | [查看](https://github.com/openclaw/openclaw/pull/200284) |
| #200235 | fix(ui)：显示听写进度并保留待处理转录 | @daniel-lxs | OPEN | 修复听写无进度或错误消失，新录音可能丢弃仍在转录的文本 | [查看](https://github.com/openclaw/openclaw/pull/200235) |
| #200297 | fix：macOS 侧边栏会话 Control 点击重载整个仪表盘 | @e-jung | OPEN | 修复 macOS 下 Control 点击侧边栏会话导致整个仪表盘重载，而非仅打开会话菜单 | [查看](https://github.com/openclaw/openclaw/pull/200297) |
| #200304 | fix(ui)：保持会话状态徽章在换行标题旁紧凑显示 | @roboclaw-bot | OPEN | 修复会话标题换行时状态药丸过大，影响窄屏可读性 | [查看](https://github.com/openclaw/openclaw/pull/200304) |

---

## 5. 功能需求趋势

从近 24 小时的 Issues 与 PR 可观察到以下社区关注方向：

1. **网关内存与稳定性**：连续出现多个 P1 级内存泄漏与崩溃循环问题（堆上限单向增长、插件缓存未释放），社区对长期运行稳定性要求极高。
2. **升级与数据库并发**：SQLite 锁定、网关切换失败、启动迁移崩溃等问题集中在版本升级路径，说明自托管用户对平滑升级体验敏感。
3. **会话状态与自动化隔离**：会话意外重置、Cron 条件丢失、脚本自动化因插件加载失效，反映用户对会话生命周期与定时任务可靠性的关注。
4. **私有网络与安全**：明文 HTTP 密钥出站替换需求显示自托管部署在私有 LAN 场景下的安全合规诉求。
5. **Web UI 体验细节**：Cmd+K 搜索、听写进度、侧边栏交互等前端可用性改进持续活跃。

---

## 6. 开发者关注点

- **痛点**：
  - Gateway 在长时间运行下的内存泄漏（~25–90 Mi

:::
