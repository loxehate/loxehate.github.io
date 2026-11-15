---
title: "AI CLI 工具社区动态日报"
published: 2026-11-15
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-15

> 生成时间: 2026-11-15 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-15)

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单次任务助手”向“持续工程工作空间”的范式转型期。主流工具普遍进入 V2 架构迭代或 Canary 频道发布阶段，社区核心诉求集中在多代理协作、跨平台稳定性、会话记忆持久化以及资源治理四个维度。安全与合规（出站策略、凭据掩码、OAuth 路由）已从边缘需求上升为 P1 级开发优先级。整体呈现“功能丰富但平台碎片化严重”的特征，Windows、macOS、Linux 及 Wayland 环境下的体验差异仍是制约企业级采用的关键瓶颈。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues (24h 更新) | PR (24h 更新) | Release 情况 | 社区活跃度 |
|------|------|-------------------|---------------|--------------|------------|
| Claude Code | anthropics/claude-code | 50 条 | 4 条 (待合并) | 无新版本 | 高 |
| OpenAI Codex | openai/codex | 未披露总数 (精选 10 条热点) | 10+ 条 (今日合并) | rust-v0.171.0-alpha.5 预览版 | 高 |
| Gemini CLI | google-gemini/gemini-cli | 50 条 | 33 条 | 无新版本 | 高 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 0 | 0 | 无 | 无活动 |
| OpenCode | anomalyco/opencode | 未披露总数 (精选 10 条) | 50 条 | 无新版本 | 高 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 无活动 |
| Hermes | NousResearch/hermes-agent | 13 条 | 50 条 | v0.23.1+canary (macOS Apple Silicon) | 中高 |
| OpenClaw | openclaw/openclaw | 7 条 | 50 条 | 无新版本 | 中 |

**注**：DeepSeek Reasonix 与 Deepseek Harness 过去 24 小时无社区活动，已从活跃对比中边缘化。

## 3. 共同关注的功能方向

多个工具社区在近 24 小时内出现高度重合的需求集群，反映出行业共性痛点：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **多代理/子代理协作与会话管理** | Claude Code、Gemini CLI、OpenCode、Hermes | 子代理会话续传失败 (OpenCode #59293)、子代理挂起与状态误报 (Gemini CLI #21409/#22323)、团队共享记忆与跨成员上下文流转 (Claude Code #38536)、多 Profile 生命周期管理 (Hermes #155595) |
| **跨平台桌面端稳定性** | Claude Code、OpenAI Codex、Gemini CLI、OpenClaw | macOS fseventsd 失控 (Claude Code #98769)、Windows Computer Use 权限释放 (Codex #57101)、Wayland 浏览器代理失效 (Gemini CLI #21983)、Windows 节点能力宣传回归 (OpenClaw #196836) |
| **会话持久化与多端同步** | OpenCode、Hermes、Claude Code | 桌面/CLI 会话缺乏 iOS 推送 (OpenCode #63992)、会话存储损坏导致 "No reply" (Hermes #147839)、SSH 远程会话状态管理不足 (Claude Code #85873) |
| **安全与凭据治理** | Hermes、OpenClaw、Claude Code | 网关鉴权与凭据路由加固 (Hermes sec-marathon PR)、出站消息不可绕过策略 (OpenClaw #56349)、插件 Hook 路径与元数据修复 (Claude Code #95698/#81672) |
| **上下文与资源管控** | OpenAI Codex、Claude Code、Gemini CLI | Base64 图片重复传输导致上下文膨胀 (Codex #28316)、Agent 进程树资源治理 (Claude Code #91081)、Rollout 预算与成本核算 (Codex #61578-#61580) |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 团队协作、插件生态、Agent 资源治理 | 工程团队、企业开发者 | 插件化架构强，Hook 机制成熟，侧重多用户共享记忆与 macOS/Linux 桌面端稳定性 |
| **OpenAI Codex** | 持续工程工作空间、多模态上下文、Rollout 预算 | 个人开发者、AI 原生应用构建者 | Rust 端预览版迭代快，侧重 ChatGPT/Web/桌面端三端统一，预算与成本管控成熟 |
| **Gemini CLI** | 子代理自动化、浏览器代理、ACP 协议模式 | AI Agent 开发者、复杂任务编排用户 | ACP (Agent Client Protocol) 为核心技术路线，并行工具调用与 AST 感知代码理解为差异化优势 |
| **OpenCode** | V2 TUI 体验、多端会话同步、远程开发 (SSH/WSL) | 跨平台开发者、移动端协作用户 | Electron/Rune 桌面端双轨制，OpenTUI 插件生态，侧重 TUI 标签页管理与 iOS 推送通知 |
| **Hermes** | 网关安全、多 Profile 管理、插件目录维护 | 多租户环境、安全敏感型组织 | Canary 频道快速迭代，sec-marathon 安全专项突出，侧重 Feishu/Telegram/Discord 等网关机器人场景 |
| **OpenClaw** | Windows 稳定性、出站安全策略、跨渠道适配 (WhatsApp/Android/Web UI) | Windows 用户、多渠道自动化用户 | 侧重 Claw Sweeper 稳定性报告、媒体描述 OAuth 路由回退，UI/UX 细节打磨频繁 |

## 5. 社区热度与成熟度

- **高热度、快速迭代**：OpenCode (50 PR/天)、Hermes (50 PR + Canary 版本)、Gemini CLI (33 PR + 50 Issue)、Claude Code (50 Issue)。这些工具处于架构重构或功能扩张期，版本发布频繁但 Bug 亦多，适合早期采用者和愿景驱动的团队。
- **中等热度、稳健打磨**：OpenClaw (50 PR 但仅 7 Issue，偏向修复与细节优化)、OpenAI Codex (有预览版发布，PR 多为基础设施自动化提交)。社区更关注稳定性回归和跨平台一致性，适合生产环境试点。
- **低活跃/停滞**：DeepSeek Reasonix、Deepseek Harness (24 小时无活动)。这两个工具目前缺乏社区维护或用户反馈，技术选型时需谨慎评估其生态可持续性。

## 6. 值得关注的趋势信号

### (1) 从“单次对话”转向“持续工程工作空间”
OpenAI Codex (#61348)、Claude Code (#38536)、OpenCode (#63993) 均出现跨会话、跨工具的持续记忆需求。这表明 AI CLI 工具的下一代竞争点不再是单轮推理能力，而是**会话状态的跨平台持久化与团队知识沉淀**。

### (2) 多代理协作成为标配，但可靠性仍是瓶颈
Gemini CLI、OpenCode、Claude Code 都在集中修复子代理会话续传、状态上报误报、挂起崩溃等问题。**多代理编排已从概念验证进入工程化交付阶段**，但会话 ID 传输、进程树资源治理等基础设施尚未成熟。

### (3) 安全与合规前置化 (Shift-Left Security)
Hermes 的 sec-marathon 专项、OpenClaw 的“出站消息不可绕过策略”、Claude Code 的插件 Hook 路径修复，均显示**安全审计、凭据掩码、OAuth 路由控制**已从可选功能上升为 P1 级开发优先级，企业采购时应将其作为必评项。

### (4) 跨平台碎片化仍是最大采用障碍
Windows (fseventsd 替代方案、Computer Use 权限)、macOS (Tahoe 审批失效)、Linux/Wayland (浏览器代理、文件描述符泄漏) 的平台特定 Bug 高频出现。**无统一跨平台桌面端运行时的工具，在企业级多操作系统环境下难以大规模部署**。

### (5) 成本与资源管控进入精细化阶段
OpenAI Codex 的 Rollout 预算、分数额度、MCP 钩子成本核算；Claude Code 的 Agent 进程树内存上限；Gemini CLI 的工具数量上限导致 400 错误——**AI CLI 工具的资源治理正从“无限制”转向“可预测、可计费、可隔离”**，这对企业预算管控和多租户部署具有直接参考价值。

---

**决策建议**：若追求团队协作与插件扩展性，优先评估 Claude Code；若需跨平台桌面端与多端推送，关注 OpenCode V2 迭代；若构建复杂 Agent 编排，Gemini CLI 的 ACP 路线值得试点；若涉及多租户网关与安全合规，Hermes 的 Canary 版本可作为参考；Windows 为主力环境的团队应密切跟踪 OpenClaw 的稳定性修复进度。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-15）

## 1. 热门 Skills 排行

基于 PR 活跃度与社区关注度，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 `fix(mcp-builder)` | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 重命名及自定义 HTTP 头配置问题，修复 `skills/mcp-builder/scripts/connections.py` 兼容性 | MCP 协议版本迁移导致的连接脚本失效，直接影响所有基于 MCP Builder 的技能开发 | OPEN | https://github.com/anthropics/skills/pull/1742 |
| 2 | #1298 `fix(skill-creator)` | 修复触发评估（trigger evals）误报/漏报，解决 Windows 下 `select()` 管道失败及运行时失败被误判为非触发的问题 | 技能触发机制的可靠性是社区核心痛点，尤其跨平台（Windows）支持 | OPEN | https://github.com/anthropics/skills/pull/1298 |
| 3 | #1245 `Add notion-spec-to-implementation...` | 新增两个技能：Notion 规格转实现（将产品/技术规格拆解为 Notion 任务与验收标准）和定量简历审计师 | 企业级文档转代码工作流自动化，以及简历/人力资源类自动化审计需求 | OPEN | https://github.com/anthropics/skills/pull/1245 |
| 4 | #1980 `webapp-testing: avoid shell=True` | 移除 `with_server.py` 中 `subprocess.Popen(shell=True)`，消除命令注入风险（CWE-78） | Web 应用测试技能的安全加固，社区对代码注入与安全编码高度敏感 | OPEN | https://github.com/anthropics/skills/pull/1980 |
| 5 | #1792 `fix(docx)` | 修复 LibreOffice 超时时误报成功，新增对 DOCX 修订痕迹（`w:ins`/`w:del` 等）的输出验证 | 文档自动化处理的可靠性与错误上报机制 | OPEN | https://github.com/anthropics/skills/pull/1792 |
| 6 | #1771 `feat(skills): add proofcore-contract-auditor` | 新增 Web3 智能合约审计技能，对 Solidity/Rust 合约进行静态分析，并将审计证明锚定至 TON 区块链 | 区块链/智能合约安全审计进入 Claude Code Skills 生态，代表垂直领域扩展 | OPEN | https://github.com/anthropics/skills/pull/1771 |
| 7 | #1703 `Add md2video-audio skill` | 基于 Marp 将 Markdown 转为带真人般配音的 MP4 视频，零成本文档转视频 | 内容创作与多媒体自动化，文档到视频的端到端转换需求 | OPEN | https://github.com/anthropics/skills/pull/1703 |
| 8 | #525 `Add pyxel skill` | 为 Python 复古游戏开发框架 Pyxel 新增技能，涵盖实现、无头输入运行、帧检查与状态验证 | 游戏开发与交互式多媒体技能的社区贡献 | OPEN | https://github.com/anthropics/skills/pull/525 |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并至主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进方向如下：

1. **工作流自动化与企业协作**
   - 组织内技能共享（Issue #228）：期望在 Claude.ai 内直接实现 org-wide 技能共享，避免手动下载/上传 `.skill` 文件。
   - 规格到实现转换（Issue #1245 关联）：将产品规格自动拆解为可执行任务与验收标准。

2. **代码审查与安全治理**
   - 智能合约审计（Issue #1771 关联）：Solidity/Rust 静态分析与链上证明。
   - Agent 治理模式（Issue #412）：策略执行、威胁检测、信任评分与审计追踪。
   - 文档技能安全（Issue #1487）：`claude-api` 技能一次注入 ~156k token 导致上下文窗口耗尽，亟需按需加载/懒加载机制。

3. **测试生成与触发机制可靠性**
   - `run_eval.py` 触发率为 0（Issue #556）：`claude -p` 无法触发技能/命令，评估流程失效。
   - 并行 worker 下技能 UUID 交叉匹配导致假阴性（Issue #1352）：多 worker 评估时触发率系统性偏低。
   - 技能创建器最佳实践（Issue #202）：`skill-creator` 技能本身过于冗长，需更新为符合最佳实践的操作型技能。

4. **文档与多媒体处理**
   - DOCX/PPTX/XLSX 文档自动化（Issue #1792、#1734、#2019）：批注检测、缩略图渲染、外部链接定义名解析等。
   - Markdown 转视频/音频（Issue #1703）：内容创作自动化。

5. **账户与数据管理**
   - 账号邮箱变更（Issue #1143）：防止工作区数据丢失，与竞品（OpenAI/Codex）功能对齐。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，尚未合并，可能近期落地：

- **#1245** `Add notion-spec-to-implementation and quantitative-resume-auditor skills`  
  创建于 2026-06-02，最后更新 2026-10-15，跨月持续活跃，涉及企业级文档转代码工作流，合并价值高。  
  https://github.com/anthropics/skills/pull/1245

- **#525** `Add pyxel skill for retro game development`  
  创建于 2026-03-05，最后更新 2026-11-01，存活时间长且近期仍有维护，代表社区对游戏开发技能的持续需求。  
  https://github.com/anthropics/skills/pull/525

- **#1742** `fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers`  
  修复 MCP 2.0 破坏性变更，影响所有 MCP 相关技能，修复窗口集中，合并紧迫性高。  
  https://github.com/anthropics/skills/pull/1742

- **#1980** `webapp-testing: avoid shell=True in with_server.py`  
  涉及 CWE-78 命令注入安全漏洞，安全类修复通常优先级较高，近期（10-11 月）仍在更新。  
  https://github.com/anthropics/skills/pull/1980

- **#1792** `fix(docx): report LibreOffice timeout as an error and verify the output`  
  文档技能可靠性修复，11 月仍有更新，大概率近期合并。  
  https://github.com/anthropics/skills/pull/1792

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：提升技能触发与评估的可靠性（尤其是跨平台与并行场景），并通过企业工作流自动化、安全审计与多媒体文档转换等垂直领域技能扩展 Claude Code 的实用边界。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-15  
**来源**: [anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 1. 今日速览

过去 24 小时内，Claude Code 仓库未发布新版本，但社区活跃度保持在较高水平。50 条更新的 Issue 中，以 **团队共享记忆（Shared Team Memory）** 功能请求讨论最为热烈（34 条评论），而 macOS 文件系统事件失控（fseventsd runaway）和 Agent 进程树资源治理等性能问题也引发了开发者的广泛关注。4 个待合并的 PR 主要集中在插件元数据修复、后台任务执行及 Hook 路径处理等细节改进上。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 核心内容与社区反应 | 链接 |
|---|------|------|---------|-------------------|------|
| #38536 | Feature Request: Shared Team Memory for Claude Code | OPEN | 34 / 11 | **社区最高关注度**。提出跨成员共享 Claude Code 记忆上下文，解决工程团队知识在 handoff、评审和调查间无法流转的问题。讨论集中在多用户协作模式与隐私边界的平衡。 | [查看 Issue](https://github.com/anthropics/claude-code/issues/38536) |
| #98769 | macOS: fseventsd runaway on agent-heavy Macs | OPEN | 19 / 1 | **严重性能 Bug**。在高负载 Mac 上，fseventsd 占用高达 24 GB 内存并长期占用一个 CPU 核心，导致 Claude Code 启动阻塞且无自恢复机制。社区认为这是影响 macOS 开发者体验的核心缺陷。 | [查看 Issue](https://github.com/claude-code/issues/98769) |
| #91081 | Resource governance for agent-spawned process trees | OPEN | 19 / 0 | **架构级增强需求**。Claude Code 执行的 Bash、后台任务和子 Agent 缺乏内存上限、系统压力反馈及会话结束时的进程树销毁保证，可能影响主机交互体验。讨论聚焦于资源隔离与优雅退出机制。 | [查看 Issue](https://github.com/claude-code/issues/91081) |
| #97369 | A changed MCP tool description never reaches a session | OPEN | 9 / 0 | **MCP 生态 Bug**。MCP 工具描述或输入 Schema 变更后，已加载该工具的会话不会重新同步，即使重连、禁用启用或退出重入也无效。影响依赖动态 MCP 工具的工作流稳定性。 | [查看 Issue](https://github.com/claude-code/issues/97369) |
| #85873 | Scheduled tasks created inside an SSH remote session never run | CLOSED | 8 / 0 | **远程开发场景缺陷**。SSH 远程会话中创建的定时任务因工作目录校验针对本地文件系统且未持久化主机绑定而无法执行。已关闭，但反映了远程会话状态管理的不足。 | [查看 Issue](https://github.com/claude-code/issues/85873) |
| #63901 | Feature: navigate/jump to previous user prompts | CLOSED | 6 / 9 | **TUI 体验改进请求**。在默认终端视图中缺乏快速跳转到当前对话中早期用户提示的方式，仅能依赖终端原生滚动条。虽已关闭，但 9 个赞表明该需求仍有社区支持。 | [查看 Issue](https://github.com/claude-code/issues/63901) |
| #96860 | security-guidance never runs its model reviews for subscription sign-ins | OPEN | 5 / 1 | **安全与插件 Bug**。security-guidance 插件在订阅登录时不执行模型评审，且此前两次同类报告（#77450、#87145）均被无回复关闭，开发者对处理流程表示不满。 | [查看 Issue](https://github.com/claude-code/issues/96860) |
| #98725 | Claude Desktop (Linux/Wayland): renderer leaks deleted /dev/shm file descriptors | OPEN | 5 / 0 | **Linux 稳定性 Bug**。渲染进程泄漏已删除的 `/dev/shm` 文件描述符，直至达到 1024 限制导致窗口冻结，影响约 7–25 小时的连续使用。Wayland 用户受影响尤为明显。 | [查看 Issue](https://github.com/claude-code/issues/98725) |
| #101782 | Plugin API: a plugin's own hooks are skipped for $.agent.spawn | OPEN | 2 / 1 | **插件 API 缺陷**。插件在 Hook 返回后发起的 `$.agent.spawn` 会跳过自身 Hook，导致 auto 模式下因缺少 `tool.check` 审批而拒绝生成。直接影响插件开发者的自动化编排能力。 | [查看 Issue](https://github.com/claude-code/issues/101782) |
| #110106 / #110103 / #110102 / #110099 | [MODEL] Ignored instructions: extra complaint N of 100 | OPEN | 各 1 / 0 | **模型指令遵循问题**。同一作者在当日集中提交多条关于模型忽略指令的投诉（涉及页面含义等），虽单条评论少，但批量出现反映部分用户对模型指令遵循质量的持续担忧。 | [查看 #110106](https://github.com/claude-code/issues/110106) |

---

## 4. 重要 PR 进展（共 4 条）

| # | 标题 | 作者 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|------|--------------|------|
| #78445 | docs: correct plugin descriptions and version that contradict the plugins | @Atishyy27 | OPEN | 修复插件索引/市集元数据与插件实际行为不一致的三处文档错误，包括 `security-guidance` 的 Hook 事件和模式计数等，已针对插件源码验证。 | [查看 PR](https://github.com/anthropics/claude-code/pull/78445) |
| #106972 | Run dedupe agents in the foreground | @bpasero-ant | OPEN | 解决去重 Agent 因后台任务被提前终止的问题。通过在去重步骤设置 `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` 并等待每个 Agent 完成，确保任务不被截断。 | [查看 PR](https://github.com/anthropics/claude-code/pull/106972) |
| #95698 | fix(plugins): run ralph-wiggum and output-style .sh hooks through bash with a quoted path | @claude[bot] | OPEN | 修复三个内置插件（ralph-wiggum、output-style 等）将 Hook 注册为未加引号的裸脚本路径问题，统一通过 `bash` 并加引号处理路径，避免特殊字符导致的执行失败。 | [查看 PR](https://github.com/anthropics/claude-code/pull/95698) |
| #81672 | fix(hookify): make package import independent of the install directory name | @ozdemirsarman | OPEN | 修复 `hookify` 包导入依赖插件目录必须命名为 `hookify` 的问题。当前通过 `sys.path` 注入目录名硬编码，导致市集安装时导入失败，现改为与安装目录名解耦。 | [查看 PR](https://github.com/anthropics/claude-code/pull/81672) |

---

## 5. 功能需求趋势

从近 24 小时更新的全部 Issue 中，可提炼出以下社区关注方向：

1. **多用户协作与团队记忆**  
   #38536 的高讨论量表明，开发者强烈希望 Claude Code 支持跨成员的共享上下文与团队级记忆，以适配真实工程团队的知识流转场景。

2. **Agent 资源治理与进程隔离**  
   #91081、#98769 等 Issue 指向对 Agent  spawned 进程树的内存上限、系统压力反馈及会话生命周期管理的需求，尤其是在 macOS 等共享主机环境下。

3. **MCP 工具链稳定性**  
   #97369 反映出开发者对 MCP 工具描述变更实时同步、会话中工具元数据刷新机制的期待，MCP 生态成熟度成为关注点。

4. **跨平台桌面端稳定性**  
   macOS（fseventsd、SSH 远程会话）、Linux/Wayland（文件描述符泄漏）、Windows（PTY 生命周期、插件 Hook）等平台特定 Bug 集中出现，桌面端跨平台一致性亟待提升。

5. **插件与 Hook 机制完善**  
   #101782、#95698、#81672 等围绕插件 API、Hook 执行顺序及路径处理展开，说明插件开发者正在推动更可靠的自动化编排能力。

---

## 6. 开发者关注点

- **性能与资源管控**：macOS 上 fseventsd 失控及 Agent 进程树无资源上限，已成为影响长时间高强度使用的首要痛点。
- **远程开发与多平台支持**：SSH 远程会话中的定时任务失效、Linux Wayland 窗口冻结、Windows PTY 生命周期问题，表明跨环境一致性仍有缺口。
- **模型指令遵循质量**：近日出现多条关于模型忽略指令的投诉，用户对模型行为可预测性的要求在提高。
- **安全与审计流程透明度**：#96860 等重复报告被无回复关闭的情况，反映开发者对 Bug 处理反馈机制和安全审计流程的透明度有更高期待。
- **插件开发体验**：Hook 被跳过、路径未加引号、包导入依赖目录名等问题，直接影响插件生态的可扩展性与稳定性。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-15  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

Codex 社区今日围绕 **跨平台稳定性** 与 **上下文/预算管理** 展开密集讨论。Windows 与 macOS 桌面端的 Computer Use、Work 审批及图片传输问题持续发酵；CLI 侧则集中于 rollout 预算、MCP 钩子生命周期及 TUI 性能优化。发布了 Rust 端 `0.171.0-alpha.5` 预览版。

---

## 2. 版本发布

| 版本 | 说明 |
|------|------|
| **rust-v0.171.0-alpha.5** | Codex Rust 端发布 `0.171.0-alpha.5` 预览版，具体变更详见 Release 页面。 |

> 🔗 [rust-v0.171.0-alpha.5 Release](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.5)

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区讨论热度（评论数、点赞数）及代表性筛选，涵盖桌面端、CLI 及跨平台核心场景：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #57101 | Windows Computer Use：截图后捕获访问权限及金色/黄色显示边框未关闭 | Windows 桌面端 Computer Use 插件在截图产生的 turn 完成后，摄像头/屏幕捕获权限及边框覆盖层未释放，导致资源占用。 | 32 条评论，3 👍，Windows 用户高度关注 | [查看 Issue](https://github.com/openai/codex/issues/57101) |
| #28316 | Codex 不应在后续上下文中重新发送大 base64 图片工具输出 | 图片提交后，完整 base64 载荷被持久化并在后续 `/v1/responses` 请求中重复发送，导致上下文无界增长。 | 29 条评论，10 👍，高赞，性能痛点 | [查看 Issue](https://github.com/openai/codex/issues/28316) |
| #61348 | 功能请求：将 ChatGPT + Work + Codex 打造为持续工程工作区，而非一次性任务 | 呼吁构建跨会话、跨工具的持续工程记忆与工作空间，避免任务孤岛。 | 28 条评论，0 👍，新提需求，讨论活跃 | [查看 Issue](https://github.com/openai/codex/issues/61348) |
| #41338 | 内联图片输出约 230 tokens，但实际传输 4.2 MB，token 计费机制无法发现阻塞线程的载荷 | Token 计数与实际网络负载严重不符，导致上下文管理失效，线程卡死。 | 15 条评论，0 👍，技术细节深入 | [查看 Issue](https://github.com/openai/codex/issues/41338) |
| #18629 | 桌面线程被内联 base64 工具图片“污染”，恢复时出现 `Bad Request` | 历史记录中累积过多 `input_image` base64 载荷后，线程恢复失败，且 token 使用量虚高。 | 15 条评论，4 👍，与 #28316/#41338 形成问题簇 | [查看 Issue](https://github.com/openai/codex/issues/18629) |
| #53560 | macOS 桌面端 Work 审批立即失败，提示“审批请求不再有效” | macOS Tahoe 上点击 Allow/Approve 后立即失败，网页端正常，桌面端受影响。 | 15 条评论，4 👍，macOS 用户反馈集中 | [查看 Issue](https://github.com/openai/codex/issues/53560) |
| #51478 | 带 Retry-After 的 HTTP 429 阻止在 ChatGPT Web 和 Windows 桌面端加载现有对话 | 速率限制导致历史对话无法加载，影响日常使用。 | 13 条评论，0 👍，跨平台影响 | [查看 Issue](https://github.com/openai/codex/issues/51478) |
| #60537 | Linux 桌面端：听写（Dictation）音频降噪在流提前结束时永久降低播放增益 | Arch Linux 上音频流生命周期缺陷导致播放音量异常。 | 13 条评论，4 👍，Linux 平台特有问题 | [查看 Issue](https://github.com/openai/codex/issues/60537) |
| #20805 | 图片密集型聊天反复重新连接并变得非常缓慢 | 附件图片增多后，App 几乎每次新提示都重连，线程响应极慢。 | 11 条评论，9 👍，高赞，用户体验差 | [查看 Issue](https://github.com/openai/codex/issues/20805) |
| #52197 | 桌面/Dots：`send_message_to_thread` 对已存在的可见 Dot 返回“线程未找到” | 先前成功后，后续向现有 Dot 发送消息失败，影响多步协作。 | 11 条评论，0 👍，桌面端集成问题 | [查看 Issue](https://github.com/openai/codex/issues/52197) |

---

## 4. 重要 PR 进展（精选 10 条）

今日合并的 PR 多为自动化机器人（`copyberry[bot]`）提交的核心基础设施改进，侧重于 **rollout 预算管控、MCP 钩子生命周期、TUI 稳定性及云端会话管理**：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #61580 | 将同步 MCP post-hook 成本计入 rollout 预算 | 允许成功的同步 `PostModelRequest` MCP 钩子在 `structuredContent` 中返回 `extra_codex_rollout_budget_units`，并计入 rollout 花费，同时保留提供商用量分离。 | [查看 PR](https://github.com/openai/codex/pull/61580) |
| #61579 | 支持分数 rollout 预算和可配置上下文提醒 | 新增 `features.rollout_budget.limit_budget`（正有限数），与 `limit_tokens` 互斥；在提醒和计费中保留分数余额。 | [查看 PR](https://github.com/openai/codex/pull/61579) |
| #61578 | 在启动工具工作前重新检查 rollout 预算 | 避免工具调用在等待执行槽位/审批/生命周期回调期间预算已耗尽，仍开始新工作。 | [查看 PR](https://github.com/openai/codex/pull/61578) |
| #61577 | 添加完成后的响应处理与用量核算 | 允许调用者等待流式响应完成及同步 post-hook，以便预算执行在工具启动前拦截耗尽预算的响应。 | [查看 PR](https://github.com/openai/codex/pull/61577) |
| #61562 | 统一采样与压缩之间的模型请求钩子生命周期 | 为每次采样或压缩尝试配对 `PreModelRequest`/`PostModelRequest` 钩子，区分 `sampling`/`compaction` 类型并上报取消。 | [查看 PR](https://github.com/openai/codex/pull/61562) |
| #61535 | 向 Responses 请求添加可信请求国家元数据 | 新增 `RequestCountry` 字段，由主机提供两字母 ASCII 国家码，未知值序列化为 `null`，防止回退到请求来源地。 | [查看 PR](https://github.com/openai/codex/pull/61535) |
| #4334 | feat: 为 Markdown 代码块添加语法高亮 | TUI 侧使用 `syntect` 实现 Markdown 代码块语法高亮，支持主题，并通过特性标志控制。 | [查看 PR](https://github.com/openai/codex/pull/4334) |
| #61494 | 在功能标志后按环境描述上下文和权限 | 选定环境可拥有不同文件系统和网络权限，新增默认关闭的 `per_environment_context` 标志。 | [查看 PR](https://github.com/openai/codex/pull/61494) |
| #61490 | 保留当前云任务直到导航就绪 | 在加载新云任务历史期间，保持当前聊天、草稿和回复流完整，避免中途丢失状态。 | [查看 PR](https://github.com/openai/codex/pull/61490) |
| #61486 | 保持归档线程只读并在 TUI 中支持取消归档 | 显示归档通知并冻结输入，同时保留缓存转录、草稿等；按 `U` 取消归档并恢复线程。 | [查看 PR](https://github.com/openai/codex/pull/61486) |

---

## 5. 功能需求趋势

从近 24 小时的 Issues 与 PR 中可观察到以下社区关注方向：

1. **持续工程工作空间与跨会话记忆**  
   用户不再满足于“一次性任务”，强烈希望 ChatGPT、Work 与 Codex 能形成连续的工程上下文（#61348），支持长期项目的状态保留与记忆。

2. **多模态上下文与传输优化**  
   Base64 图片在对话历史中的重复发送、Token 计数与实际载荷不符、线程被“污染”导致 `Bad Request` 等问题高频出现（#28316、#41338、#18629、#20805），社区急需图片压缩、引用替换或增量传输机制。

3. **预算与成本管控精细化**  
   Rollout 预算、分数额度、MCP 钩子成本核算等 PR 集中发布（#61578–#61580），说明开发者和企业用户对 Codex 自主运行成本的可预测性要求提高。

4. **跨平台桌面端稳定性（Windows/macOS/Linux）**  
   Computer Use 权限释放（#57101）、Work 审批失效（#53560）、线程未找到（#52197）、Linux 音频增益（#60537）等问题表明，桌面端不同操

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-15)

## 1. 今日速览

Gemini CLI 社区今日无新版本发布，但 Issue 和 PR 活跃度较高，共 50 条更新的 Issue 与 33 条更新的 PR。社区核心关注点集中在 **子代理（Subagent）稳定性**、**浏览器代理（Browser Agent）兼容性** 以及 **ACP（Agent Client Protocol）模式的工具调用优化** 上，多个 P1 级别的挂起与崩溃 Bug 亟待修复。

## 2. 版本发布

过去 24 小时内无新版本 Release。

## 3. 社区热点 Issues

以下选取 10 个最值得关注的 Issue，按社区讨论热度与严重程度排序：

| # | 标题 | 类型/优先级 | 评论/👍 | 关注理由 |
|---|------|-------------|---------|----------|
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 / Bug | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时会无限挂起，严重影响可用性，社区关注度高。 |
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS reported as GOAL success | P1 / Bug | 13 / 2 | 子代理达到最大轮次后仍错误报告 `GOAL` 成功，掩盖中断情况，可能导致任务状态误判。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done output hook causes crash | P1 / Bug | 3 / 0 | 输出钩子在任务接近完成时导致 CLI 崩溃，影响核心工作流。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 / Bug | 4 / 1 | 浏览器子代理在 Wayland 环境下失效，影响 Linux 桌面用户体验。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 / Enhancement | 9 / 1 | 提议利用模型原生 Bash 亲和性，构建零依赖 OS 沙箱，属于重大架构增强方向。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 7 / 1 | 探索 AST 感知的文件读取与搜索，旨在减少上下文膨胀并提升代码定位精度。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 / Bug | 7 / 0 | 模型不主动调用自定义技能和子代理，需显式指令才能触发，影响自动化体验。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides | P2 / Bug | 5 / 0 | 浏览器代理忽略全局/项目级 `settings.json` 中的 `maxTurns` 等配置覆盖。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | Gemini CLI encounters 400 error with > 128 tools | P2 / Bug | 3 / 0 | 工具数量超过阈值时触发 400 错误，限制大型工具集的使用场景。 |
| [#23571](https://github.com/google-gemini/gemini-cli/issues/23571) | Model frequently creates tmp scripts in random spots | P2 / Bug | 3 / 0 | 模型在工作区随机位置生成临时脚本，增加清理与提交成本。 |

## 4. 重要 PR 进展

以下选取 10 个重要 PR，涵盖 ACP 模式优化、核心修复与文档同步：

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#30298](https://github.com/google-gemini/gemini-cli/pull/30298) | feat(acp): execute independent tool calls in parallel | OPEN | ACP 模式下并行执行独立工具调用，替代之前的串行循环，提升读取类工具效率。 |
| [#30297](https://github.com/google-gemini/gemini-cli/pull/30297) | fix(acp): truncate large shell and mcp tool outputs | OPEN | ACP 模式下对 Shell 和 MCP 工具输出进行截断，避免大日志或目录树撑爆上下文。 |
| [#30296](https://github.com/google-gemini/gemini-cli/pull/30296) | fix(core): evict rejected OAuth client initialization promises | OPEN | 修复 OAuth 初始化失败时 promise 被缓存污染的问题，避免后续认证请求受影响。 |
| [#30295](https://github.com/google-gemini/gemini-cli/pull/30295) | fix(core): preserve ASK_USER decision on shell parse failure | OPEN | YOLO 模式下 Shell 命令解析失败时保留 `ASK_USER` 决策，而非一律返回 `ALLOW`。 |
| [#30207](https://github.com/google-gemini/gemini-cli/pull/30207) | fix(build): clear bundle/ before esbuild | OPEN | 修复自 2026-11-05 起每夜构建因 `bundle/` 目录残留导致的 413 请求过大错误。 |
| [#30174](https://github.com/google-gemini/gemini-cli/pull/30174) | fix(core): stop body timeouts from killing long model turns | OPEN | 修复流式请求因 5 分钟无数据而被 undici 超时中止，导致整个请求重试的问题。 |
| [#30178](https://github.com/google-gemini/gemini-cli/pull/30178) | fix(cli): submit full text when IME commit and Enter arrive | OPEN | 修复中文/韩文 IME 输入法下，回车提交时最后一个音节被丢失的问题。 |
| [#30301](https://github.com/google-gemini/gemini-cli/pull/30301) | docs(cli): sync ACP flag rows in CLI reference | OPEN | 同步 CLI 参考文档，移除已废弃的 `--experimental-zed-integration` 标志，补充 ACP 相关参数。 |
| [#30051](https://github.com/google-gemini/gemini-cli/pull/30051) | fix(cli): kill active shells and persist tool calls on headless interruption | CLOSED | 修复无头模式下中断信号导致 Shell 进程孤立及退出码错误的问题。 |
| [#28405](https://github.com/google-gemini/gemini-cli/pull/28405) | fix: prevent scroll position jump during content updates | OPEN | 修复虚拟列表在内容更新时滚动位置跳转的问题，改善交互体验。 |

## 5. 功能需求趋势

从近期 Issue 中可提炼出以下社区关注方向：

1. **子代理（Subagent）可靠性与自动化**：社区普遍反映子代理调用不足（#21968）、状态上报不准确（#22323）以及挂起问题（#21409），提升子代理的自主调用能力与容错恢复是核心需求。
2. **浏览器代理（Browser Agent）跨平台支持**：Wayland 兼容（#21983）、配置覆盖失效（#22267）、会话锁恢复（#22232）等问题表明，浏览器代理在非标准桌面环境下的稳定性亟待加强。
3. **ACP 模式性能与上下文管理**：并行工具调用（#30298）、大输出截断（#30297）以及工具数量上限导致的 400 错误（#24246），显示社区希望 ACP 模式在处理复杂工具集时更高效、更稳定。
4. **代码理解精度提升**：AST 感知的文件读取、搜索与代码库映射（#22745、#22747）成为提升代码定位精度、降低 Token 消耗的重要方向。
5. **安全与破坏性操作防护**：社区希望 Agent 能主动识别并阻止 `git reset --force` 等破坏性命令（#22672），提升自主代理在生产环境下的安全性。

## 6. 开发者关注点

- **高频痛点**：子代理挂起与状态误报、浏览器代理在 Wayland 下失效、OAuth 缓存污染导致认证失败、IME 输入法下字符丢失。
- **配置一致性**：多个 Issue 指出 `settings.json` 的配置覆盖在特定 Agent（如 Browser Agent）中不生效，配置系统需要更统一的生效机制。
- **构建与发布稳定性**：夜间构建因 `bundle/` 残留文件导致发布失败，构建流程需要更清洁的增量编译策略。
- **文档同步**：CLI 参考文档与实际注册的标志（尤其是 ACP 模式相关）存在滞后，需要及时同步以避免用户误用废弃参数。

---

*数据来源：github.com/google-gemini/gemini-cli（2026-11-14 更新的 Issues 与 PR）*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-15)

## 今日速览

OpenCode 社区今日围绕 V2 版本的稳定性与可用性展开密集讨论，子代理（subagent）会话续传失效、会话图片重复发送导致后端限制失效等核心 Bug 成为高频关注点；同时，TUI 标签页管理、iOS 推送通知及跨平台会话同步等功能需求持续涌现，社区正在从基础功能修复转向多端协作与体验打磨阶段。

## 版本发布

过去 24 小时内无新版本发布。

## 社区热点 Issues

以下 10 个 Issue 今日更新频繁或涉及核心功能缺陷，建议重点跟进：

| # | 标题 | 状态 | 核心内容 | 为何重要 | 链接 |
|---|------|------|----------|----------|------|
| #59293 | subagent: sessionID continuation always fails with 'Subagent session not found: ses' | OPEN | 子代理 sessionID 续传始终失败，模型仅发送 "ses" 前缀而非完整 ID，导致无法恢复已有子代理对话 | 直接影响多代理协作场景的可用性，是 V2 架构中的核心缺陷 | https://github.com/anomalyco/opencode/issues/59293 |
| #59794 | session: all history images are re-sent on every request | OPEN | 每次模型请求都重新发送会话中所有历史图片，无剪枝，导致图片限制后端（如 vLLM）会话永久不可用 | 对多模态工作流影响严重，可能导致会话彻底不可用 | https://github.com/anomalyco/opencode/issues/59794 |
| #42670 | tui: prompt and steer selected subagents | OPEN | V2 TUI 可选中并查看子会话，但 composer 仍由父会话拥有，无法对选中子代理进行提示或引导 | 限制了子代理的交互式管理能力，影响复杂任务拆解体验 | https://github.com/anomalyco/opencode/issues/42670 |
| #59778 | tui: agent/model row wraps mid-word on home screen | OPEN | 主页及会话页脚的代理/模型/提供商行在宽度不足时按单词中间截断而非优雅省略 | V2 TUI 的 UI 打磨问题，影响多语言环境下的显示体验 | https://github.com/anomalyco/opencode/issues/59778 |
| #63992 | Notify the iOS app for sessions started from desktop or CLI | OPEN | 桌面端或 CLI 发起的会话不向配对的 iPhone 推送通知，仅 iOS App 发起的会话或 `metadata.notification.always === true` 时才通知 | 多端会话通知机制缺失，影响移动端用户的实时感知 | https://github.com/anomalyco/opencode/issues/63992 |
| #63994 | free-usage-limit problem | CLOSED | 免费额度问题持续超三周，超过显示的重置时间后仍无法恢复使用 | 涉及计费/额度重置逻辑，直接影响免费用户的正常使用 | https://github.com/anomalyco/opencode/issues/63994 |
| #63993 | Show related fork sessions as contextual TUI tabs | OPEN | 请求在 TUI 中以标签页形式展示相关分叉会话，当前用户依赖 Windows Terminal 原生标签管理 | 反映用户对会话分叉管理与可视化导航的需求 | https://github.com/anomalyco/opencode/issues/63993 |
| #63991 | TUI: add Delete and Fork to the session tab menu | OPEN | TUI 会话标签页右键菜单缺少“删除”和“分叉”选项，清理旧会话不便 | 基础会话生命周期管理功能缺口 | https://github.com/anomalyco/opencode/issues/63991 |
| #63990 | GUI plugins for sessions on every connected server | OPEN | 请求在 Web App 和 Desktop 端为每个连接服务器的会话提供 GUI 插件支持 | 指向插件生态向 GUI 客户端扩展的方向 | https://github.com/anomalyco/opencode/issues/63990 |
| #63987 | subagent: resume fails — sessionID emitted as bare "ses" prefix | CLOSED | 子代理恢复失败，sessionID 仅发送 "ses" 前缀，且后台子代理完成报告缺少 sessionID | 与 #59293 为同类问题，说明子代理会话 ID 传输存在系统性缺陷 | https://github.com/anomalyco/opencode/issues/63987 |

## 重要 PR 进展

今日更新的 50 个 PR 中，以下 10 个具有较高代表性，涵盖桌面端、SSH 连接、TUI 体验及生态文档等方面：

| # | 标题 | 状态 | 功能/修复内容 | 链接 |
|---|------|------|---------------|------|
| #63601 | fix(app): show requests pending on idle sessions in the inbox | CLOSED | 桌面端 Inbox 仅读取活跃会话的待处理请求，现已修复，使空闲会话的请求也能在收件箱中显示 | https://github.com/anomalyco/opencode/pull/63601 |
| #63988 | fix(desktop): connect to SSH and WSL servers whatever their OpenCode version | OPEN | 将 Rune 桌面端的“放宽服务器版本检查”变更移植到 Electron 桌面端的 SSH 连接，解决版本不匹配导致的连接失败 | https://github.com/anomalyco/opencode/pull/63988 |
| #63542 | fix(ssh): recover when the remote service port is taken | OPEN | SSH 连接断开后重连可能因远程服务端口被占用而失败，本 PR 改进重连恢复机制 | https://github.com/anomalyco/opencode/pull/63542 |
| #63477 | cli: port to native | OPEN | CLI 移植至原生实现（参考 opencode-native-preview），可能旨在减少对 Electron 的依赖 | https://github.com/anomalyco/opencode/pull/63477 |
| #63986 | feat(tui): show tool elapsed time in V2 clients | OPEN | V2 客户端 TUI 中显示工具执行耗时，替代已关闭的 V1 方案，提升操作透明度 | https://github.com/anomalyco/opencode/pull/63986 |
| #63989 | Opentui 0.9.0 | OPEN | OpenTUI 升级至 0.9.0，插件 Markdown 代码块渲染器接口变更，peer 依赖提升至 >=0.9.0（对使用 `token.raw` 的插件有破坏性） | https://github.com/anomalyco/opencode/pull/63989 |
| #63648 | docs(ecosystem): add Sikemux to projects | OPEN | 在生态项目表中添加 Sikemux（原生 Mac/Linux 项目） | https://github.com/anomalyco/opencode/pull/63648 |
| #55528 | refactor(browser): stream proxy traffic over binary WebSockets | CLOSED | 浏览器代理流量改为通过二进制 WebSocket 传输，远程连接下 6 MiB 图片测试从 ~70s 缩短至 ~4s（约 18× 提速） | https://github.com/anomalyco/opencode/pull/55528 |
| #55496 | feat(app): add subagents side-panel tab | CLOSED | 为桌面端 App 添加“子代理”侧边栏标签页，将 V1 功能移植至当前架构 | https://github.com/anomalyco/opencode/pull/55496 |
| #55450 | fix(core): chunk session import message inserts under the SQLite parameter limit | CLOSED | 会话导入时将消息插入分块，避免超出 SQLite 参数上限，修复大型转录导入失败问题 | https://github.com/anomalyco/opencode/pull/55450 |

## 功能需求趋势

从今日 Issues 与 PR 可提炼出以下社区关注方向：

1. **多代理协作与会话管理**：子代理 sessionID 续传失效（#59293、#63987）反复出现，且社区持续请求 TUI 侧边栏子代理面板（#55496）、分叉会话标签页（#63993）及标签页删除/分叉功能（#63991），说明用户对复杂会话拆解与可视化管理的需求强烈。
2. **多端同步与通知**：桌面/CLI 会话缺乏 iOS 推送（#63992）、Web/Desktop 端 GUI 插件支持（#63990），社区正在推动跨平台会话状态同步与通知统一。
3. **TUI V2 体验打磨**：单词中间换行（#59778）、选中子代理无法提示引导（#42670）、工具耗时显示（#63986）等，表明 V2 TUI 仍处于快速迭代与细节修补阶段。
4. **远程连接稳定性**：SSH/WSL 版本检查放宽（#63988）、远程端口占用恢复（#63542）、浏览器代理二进制 WebSocket 优化（#55528），显示远程开发场景是社区的重要使用场景。

## 开发者关注点

- **核心缺陷优先级**：子代理 sessionID 传输异常（仅发送 "ses" 前缀）已在多个 Issue 中重复报告，建议核心团队优先定位会话 ID 序列化与传输链路。
- **多模态会话稳定性**：历史图片无剪枝重发问题可能导致会话在图片限制后端下永久不可用，亟需实现图片上下文剪枝或按需发送机制。
- **免费额度重置逻辑**：#63994 反映免费额度在显示重置时间后仍未恢复，可能涉及计费后端或客户端缓存同步问题，影响用户留存。
- **插件生态兼容性**：OpenTUI 0.9.0 引入破坏性接口变更，现有依赖 `token.raw` 的插件可能失效，需提供迁移指南或兼容层。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-15)

## 1. 今日速览

Hermes Agent 于 2026-11-14 发布了 Canary 版本 `v0.23.1+canary.20261114T064334Z`，主要面向 macOS Apple Silicon 桌面端用户。社区活跃度较高，24 小时内更新了 13 个 Issue 和 50 个 PR，核心关注点集中在 **会话持久化、插件目录维护、网关安全加固以及 CLI 交互体验** 四个方向。值得关注的是，多个与 `sec-marathon-2026-11-13` 相关的安全修复已合并，体现了项目对凭据泄露和网关鉴权的持续重视。

## 2. 版本发布

**Hermes Agent v0.23.1+canary.20261114T064334Z**  
- 发布日期：2026-11-14  
- 可用下载：Hermes Desktop (macOS, Apple Silicon M-series, DMG)  
- 说明：这是 Canary 频道的最新构建，建议桌面端用户及时更新以获取最新修复。

[查看 Release 详情](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.1%2Bcanary.20261114T064334Z)

## 3. 社区热点 Issues

以下 10 个 Issue 按社区关注度（评论数、严重程度、影响范围）排序：

| # | 标题 | 状态/优先级 | 核心内容 | 为何重要 | 链接 |
|---|------|-------------|----------|----------|------|
| #136486 | Replayed `reasoning` 别名与 `reasoning_content` 冲突导致 HTTP 400，字段拒绝学习未触发 | CLOSED / P1 | OpenAI 兼容端点中 `reasoning` 作为别名与 `reasoning_content` 重复，导致每轮都回退 | 涉及模型推理字段兼容性，直接影响对话稳定性，已有 20 条社区讨论 | [查看](https://github.com/NousResearch/hermes-agent/issues/136486) |
| #155595 | Profile 创建与生命周期追踪（配置、凭据、Honcho 清理等） | OPEN / P3 | 整合 profile 供给、模型继承、克隆安全、客户端反馈等全生命周期工作 | 决定多 Profile 管理的基础架构方向，8 条评论显示社区关注度高 | [查看](https://github.com/NousResearch/hermes-agent/issues/155595) |
| #147839 | 单次 20s `worker_receipt_timeout` 导致会话存储损坏，用户见 "No reply" | OPEN / P2 | Kanban 工作者回合因超时中断，底层文件存储被污染，出现 11 次集群故障 | 直接导致用户端无回复，属会话持久性严重缺陷 | [查看](https://github.com/NousResearch/hermes-agent/issues/147839) |
| #135262 | macOS 桌面端 Bot Screen 无法粘贴，Cmd+V 输出字母 "v" | OPEN / P2 | 剪贴板粘贴失效，菜单栏 "编辑 > 粘贴" 也无效 | 桌面端基础交互缺陷，影响日常使用体验 | [查看](https://github.com/NousResearch/hermes-agent/issues/135262) |
| #152308 | Lane C PR 追踪：Profile、配置值与 Secrets 迁移 | OPEN / P3 | 11 步迁移计划中的配置与密钥迁移子任务，部分可在移入 `hermes_agent/` 前合并 | 涉及敏感配置与 Secrets 管理，关系到多租户安全边界 | [查看](https://github.com/NousResearch/hermes-agent/issues/152308) |
| #148002 | Kanban 工作树修剪保护基于目录名且无日志，运行中卡片可能丢失工作区 | OPEN / P2 | 运行中的卡片工作树被误删并报告为崩溃，记录中无关联信息 | 可能导致开发者工作丢失，属数据安全与可观测性问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/148002) |
| #155892 | 网关模式下后台审查 API 失败静默，警告状态在回合结束后丢失 | OPEN / P2 | Feishu/Telegram/Discord 等网关模式下，后台内存/技能审查失败后用户无感知 | 多平台机器人场景下的错误可见性缺失，影响运维排查 | [查看](https://github.com/NousResearch/hermes-agent/issues/155892) |
| #135306 | `hermes update` 时重复 uv 工作区成员导致依赖解析失败 | OPEN / P2 | 同一插件安装到多个 Profile 主目录时，uv 拒绝重复包名 | 影响多 Profile 环境下的插件更新流程 | [查看](https://github.com/NousResearch/hermes-agent/issues/135306) |
| #155829 | `hermes-mobile-push` 定时任务 `deliver: bot-chat` 发送两条推送通知 | OPEN / P2 | `_on_session_end` 与其他路径重复触发，iOS 用户收到重复推送 | 移动端推送重复会严重干扰用户体验 | [查看](https://github.com/NousResearch/hermes-agent/issues/155829) |
| #155897 | CLI 批量澄清面板中 `multi_select` 按 Enter 提交表单而非切换选项 | OPEN | Enter 锁定当前勾选状态并进入下一问题，Space 虽可切换但不易发现 | CLI 交互可用性问题，影响批量操作效率 | [查看](https://github.com/NousResearch/hermes-agent/issues/155897) |

## 4. 重要 PR 进展

以下 10 个 PR 按功能影响力分类，涵盖安全加固、插件维护、Bug 修复与功能改进：

### 安全与网关加固（sec-marathon-2026-11-13 相关）
1. **#155427** `fix(dashboard)`: HTTPS-only 前缀 Cookie、Kanban WS 主机/来源校验、媒体代理逐跳白名单  
   仪表板安全加固第 3.2 节，防止 Cookie 名冲突与未授权媒体代理访问。  
   [查看](https://github.com/NousResearch/hermes-agent/pull/155427)

2. **#155442** `fix(redact)`: 读取常见凭据文件时掩码秘密（`.aws/credentials`, `.netrc`, `.pgpass` 等）  
   扩展秘密文件识别范围，防止 `read_file` / `search_files` / 终端 `cat` 泄露明文凭据。  
   [查看](https://github.com/NousResearch/hermes-agent/pull/155442)

3. **#155566** `fix(providers)`: 防止 Claude Code OAuth Token 发送至 Azure Foundry 端点  
   凭据路由加固，避免在 `*.azure.com` 主机上误发 Anthropic 凭据。  
   [查看](https://github.com/NousResearch/hermes-agent/pull/155566)

4. **#155567** `fix(gateway)`: 拒绝多路复用器未服务的命名 Profile  
   修复 `_resolve_profile_home_for_source` 对未注册/停用 Profile 的错误回退，防止 Webhook 路径越权。  
   [查看](https://github.com/NousResearch/hermes-agent/pull/155567)

### 插件目录与依赖维护
5. **#155896** `Catalog` 移除四个代码已不存在的插件（agssh, dxmt, scribase, pidgeon）  
   清理失效插件条目，避免用户安装必然失败的插件。  
   [查看](https://github.com/NousResearch/hermes-agent/pull/155896)

6. **#155890** `chore(plugin-catalog)`: 重新 pin `ctx_checkpoint` 至 0.7.0  
   插件版本同步，修复检查点插件的已知问题。  
   [查看](https://github.com/NousResearch/hermes-agent/pull/155890)

7. **#155886 / #155885 / #155884** `chore(plugin-catalog)`: 分别 bump `fractal-memory-engine` (1.0.3)、`werracle-evm-guard` (1.0.2)、`verifiable-math-kernel` (1.0.6)  
   黑客松后插件的例行维护更新。  
   [查看 #155886](https://github.com/NousResearch/hermes-agent/pull/155886) | [查看 #155885](https://github.com/NousResearch/hermes-agent/pull/155885) | [查看 #155884](https://github.com/NousResearch/hermes-agent/pull/155884)

### 功能修复与 CLI 改进
8. **#155895** `fix(code-kernel)`: `search_files` helper 始终返回文档化的 `matches` 键  
   修复代码执行内核搜索助手在 ≥5 匹配时因 densify 逻辑丢失字段的问题。  
   [查看](https://github.com/NousResearch/hermes-agent/pull/155895)

9. **#155894** `fix(checkpoints)`: 将不可达的大小上限与实际修剪错误分开计数  
   修复 `hermes checkpoints prune --max-size-mb` 对健康存储误报 `Errors: 1` 的问题。  
   [查看](https://github.com/NousResearch/hermes-agent/pull/155894)

10. **#155438** `fix(cron)`: 计划任务在 Provider 5xx/过载后自动重试，而非跳过整个周期  
    在 5、15、30 分钟后自动重新运行失败任务，避免日报等定时任务整天缺失。  
    [查看](https://github.com/NousResearch/hermes-agent/pull/155438)

## 5. 功能需求趋势

从近 24 小时的 Issue 和 PR 中，可以提炼出社区最关注的四个功能方向：

1. **多 Profile 与配置生命周期管理**  
   #155595、#152308、#135306 均围绕 Profile 创建、配置值、Secrets 迁移及多主目录插件冲突展开，说明用户对跨环境

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报

**日期**: 2026-11-15  
**数据来源**: github.com/openclaw/openclaw  
**定位**: AI 开发工具技术分析

---

## 1. 今日速览

今日社区无新版本发布，但活跃度保持在较高水平：共 7 条 Issue 更新、50 条 PR 提交。核心关注点集中在 **Windows 平台稳定性**、**出站消息安全策略**、**UI 交互细节修复** 以及 **跨平台适配（Android/WhatsApp/Web UI）** 上。值得关注的是，P1 级安全相关 PR #199299 涉及媒体描述的 OAuth 路由回退，可能影响多模态功能的可用性。

---

## 2. 版本发布

过去 24 小时内 **无新版本 Release**。

---

## 3. 社区热点 Issues（精选 10 条）

由于 Issue 总数仅 7 条，以下列出全部更新 Issue，并按重要性排序：

| # | 标题 | 类型/优先级 | 关键点 | 链接 |
|---|------|-------------|--------|------|
| #56349 | [Feature]: Unbypassable outbound policy enforcement (pre-send guarantee) | enhancement, P2, impact:security | 提出在消息发送前建立单一强制验证/修改边界，覆盖所有出站路径（agent 回复、自动回复、工具调用、通道适配器），属于安全加固方向，已有 8 条讨论。 | [查看](https://github.com/openclaw/openclaw/issues/56349) |
| #196836 | [Bug]: Windows Node does not advertise computer.act despite Screen Capture being enabled | bug, regression, P2, impact:ux-friction | Windows 节点在启用屏幕捕获后仍不宣传 `computer.act` 能力，属于回归问题，影响 Windows 端自动化交互。 | [查看](https://github.com/openclaw/openclaw/issues/196836) |
| #199324 | [Windows] Stability report after 2026.10.7 → 2026.11.3 | clawsweeper:intake:bug | 用户反馈升级后启动耗时多分钟、升级记录错误为失败、运行时警告反复出现，Windows 端可靠性亟待提升。 | [查看](https://github.com/openclaw/openclaw/issues/199324) |
| #199065 | [Bug]: Browser microphone permission prompt stops Control UI dictation | P2, impact:ux-friction | Safari 26.6 和 Chrome for Testing 156 中，Control UI 听写在麦克风权限弹窗出现时中断，点击允许后无法恢复监听。 | [查看](https://github.com/openclaw/openclaw/issues/199065) |
| #199316 | [Bug]: kimi-coding: interim assistant text arrives without commentary phase signature | bug:behavior, P3 | kimi/kimi-for-coding 的中间助手文本未渲染为斜体评论/前言行，影响 Telegram 等渠道的进度草稿显示。 | [查看](https://github.com/openclaw/openclaw/issues/199316) |
| #199318 | Consolidate inline-command benchmark build verification | P3 | 两个内联命令基准运行器重复相同的检出、构建、Codex 包和原生二进制验证循环，建议合并为单一辅助函数。 | [查看](https://github.com/openclaw/openclaw/issues/199318) |
| #198449 | Browser: agent gets a "user used this browser" note without take-over | CLOSED, P3 | 点击或输入浏览器面板后，即使未点击“接管”，代理浏览器工具结果仍会添加用户使用浏览器的备注，已关闭。 | [查看](https://github.com/openclaw/openclaw/issues/198449) |

> **社区反应总结**：当前 Issues 多为近 2 天内新建或更新，评论数普遍较少（0-8 条），显示社区处于持续提交 Bug 和改进建议的阶段，尚未形成大规模讨论热点。安全类 Issue #56349 因涉及“pre-send guarantee”机制，值得后续跟踪。

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 优先级/标签 | 功能或修复说明 | 链接 |
|---|------|------|-------------|----------------|------|
| #199299 | fix(media): image descriptions use the ChatGPT OAuth route when OpenAI has no API key | @etzelm | P1, security-sensitive-changed, security-review-required | 当 OpenAI 仅通过 ChatGPT OAuth 连接且未启用 Codex 插件时，图片描述功能回退使用 OAuth 路由，修复 `No API key found for provider "openai"` 失败问题。 | [查看](https://github.com/openclaw/openclaw/pull/199299) |
| #199325 | perf(sessions): reduce queries in full context snapshots | @steipete | scripts, size: M | 优化 SQLite 全上下文读取，减少每条选中消息的单独 payload 查询，降低 CPU 和内存分配，返回结果一致。 | [查看](https://github.com/openclaw/openclaw/pull/199325) |
| #199320 | fix(android): choose automation time zones without typing IDs | @roboclaw-bot | P2, docs, app: android | Android 自动化编辑器时区字段新增可搜索选项、网关默认选项及显式自定义输入，无需手动输入时区 ID。 | [查看](https://github.com/openclaw/openclaw/pull/199320) |
| #199283 | fix(agents): sessions_yield awaits wake-armed background commands in one-shot runs | @obviyus | P2, docs, gateway, agents | 修复一次性运行无法等待后台命令唤醒的问题，解决隐藏子代理或隔离 cron 代理无法通过退出唤醒的场景。 | [查看](https://github.com/openclaw/openclaw/pull/199283) |
| #199317 | fix(whatsapp): avoid unlinked claims when status is unknown | @roboclaw-bot | P2, channel: whatsapp-web | WhatsApp 设置在状态未知时不再显示“未链接”或负面连接事实，避免在首次读取失败或认证稳定前误导用户。 | [查看](https://github.com/openclaw/openclaw/pull/199317) |
| #199150 | fix(oc-path): numeric filters match blank fields as zero | @LinzeShi | P2, docs, extensions: oc-path | 修复 `openclaw path find` 将空白或仅空格字段误判为数字零的问题，影响 JSON/YAML/JSONL 数值过滤。 | [查看](https://github.com/openclaw/openclaw/pull/199150) |
| #199149 | fix(ui): stop asking users to load files already loading | @roboclaw-bot | P3, app: web-ui | 修复文件面板在库存请求已运行且刷新按钮禁用时，仍提示用户“加载代理工作区文件”的问题。 | [查看](https://github.com/openclaw/openclaw/pull/199149) |
| #199146 | fix(ui): avoid false empty cloud profiles before configuration loads | @roboclaw-bot | P2, app: web-ui | 修复云环境在配置加载前或首次读取失败时，错误显示“无云设备配置文件”的问题。 | [查看](https://github.com/openclaw/openclaw/pull/199146) |
| #199319 | refactor(bench): share inline command build verification | @vincentkoc | P3, scripts | 合并两个内联命令基准运行器的构建和原生二进制验证逻辑，关联 Issue #199318，无用户可见行为变更。 | [查看](https://github.com/openclaw/openclaw/pull/199319) |
| #199307 | fix(cli): cancel gateway call reads that land after Ctrl+C | @wangmiao0668000666 | P2, cli | 修复 CLI 中断后网关读取请求仍挂起的问题，支持 Ctrl+C 及时取消，避免需外部 SIGKILL。 | [查看](https://github.com/openclaw/openclaw/pull/199307) |

---

## 5. 功能需求趋势

从本日 Issues 和 PR 中提炼出的社区关注方向：

1. **安全与策略执行**  
   Issue #56349 提出的“出站策略不可绕过（pre-send guarantee）”表明社区开始关注 AI 消息发送链路的安全边界，预计后续会有更多关于消息审计、合规和预发送拦截的需求。

2. **Windows 平台稳定性**  
   Issue #196836（回归）和 #199324（升级后稳定性报告）集中反映 Windows 节点在启动速度、能力宣传（`computer.act`）、升级状态记录方面存在问题，Windows 端可靠性是短期高频需求。

3. **多模态与模型提供商适配**  
   PR #199299（OpenAI ChatGPT OAuth 路由回退）和 Issue #199316（kimi-coding 注释渲染）显示社区在推动对不同模型提供商（OpenAI、Kimi）及多模态能力（图片描述、听写）的更好适配。

4. **UI/UX 细节打磨**  
   大量 PR（#199149、#199146、#199129、#199145 等）集中在 Web UI 的加载状态、空状态提示、快捷键抖动、Toast 颜色等交互细节，说明产品正从功能完善转向体验优化。

5. **跨平台与本地化适配**  
   PR #199320（Android 时区选择）和 #199317（WhatsApp 状态处理）体现社区对移动端和即时通讯渠道适配的持续投入。

---

## 6. 开发者关注点

- **Windows 端回归与稳定性**：开发者反馈升级后启动缓慢、能力宣传缺失、运行时警告反复，建议将 Windows 可靠性作为后续发布的优先级。
- **安全审计需求**：Issue #56349 涉及出站消息的强制预发送验证，开发者关注如何在不破坏现有交付路径的前提下引入统一安全边界。
- **CI/基准测试维护成本**：Issue #199318 和 PR #199319 指出基准构建验证逻辑重复，开发者希望通过代码复用降低维护负担。
- **CLI 中断体验**：PR #199307 反

:::
