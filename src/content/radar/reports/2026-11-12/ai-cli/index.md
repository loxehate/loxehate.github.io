---
title: "AI CLI 工具社区动态日报"
published: 2026-11-12
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-12

> 生成时间: 2026-11-12 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-12)

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单一对话助手”向“多代理协作平台”演进的关键期，各工具普遍进入稳定性补丁与生态扩展并行阶段。社区核心诉求集中在子代理生命周期可靠性、跨平台桌面端适配、MCP/OAuth 身份集成以及插件市场可信度四个维度。尽管版本发布频率分化明显，但 Issue 与 PR 的整体活跃度维持高位，说明开发者对 IDE 深度集成与自动化工作流的容忍度正在降低，对数据安全与错误可见性的要求显著提升。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues (24h) | PR (24h) | 新版本 Release | 主要版本状态 |
|------|------|-------------|---------|--------------|------------|
| **Claude Code** | anthropics/claude-code | 50 | 1 (已关闭未合并) | 无 | v2.1.322 (稳定) |
| **OpenAI Codex** | openai/codex | 大量 (精选10+) | 10+ (精选) | rust-v0.167.2 (稳定) / 多个 Alpha | 0.167.2 稳定 / 0.170 Alpha |
| **Gemini CLI** | google-gemini/gemini-cli | 10+ (精选) | 24 | 无 | 无新 Release |
| **DeepSeek Reasonix** | esengine/DeepSeek-Reasonix | 25 | 0 | v2.60.0 (Studio v2.6.0 / CLI v2.60.0) | v2.60.0 刚发布 |
| **OpenCode** | anomalyco/opencode | 19 | 50 | @opencode/pty@0.5.2 (protocol 8) | 核心组件持续发布 |
| **Deepseek Harness** | deepseek-ai/deepseek-harness | 0 | 0 | dsh-v0.2.2-rc.2 | RC 预发布 |
| **Hermes** | NousResearch/hermes-agent | 1 | 20 | 无 | 无新 Release |
| **OpenClaw** | openclaw/openclaw | 11 | 50 | 无 | 无新 Release |

**数据读取要点**：OpenCode 与 OpenClaw 的 PR 活跃度最高（各 50 个），Claude Code 的 Issue 讨论最密集（50 条）；Deepseek Harness 与 Reasonix 的 PR 活跃度为 0，但 Reasonix 刚完成 v2.60.0 重大发布，属于“发布后反馈收集期”。

## 3. 共同关注的功能方向

多个工具社区在以下四个方向上存在高度重叠的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **子代理 / 多代理生命周期** | Claude Code、Gemini CLI、OpenCode、Deepseek Harness | 子代理状态上报不准确（Gemini #22323）、会话恢复与执行权丢失（OpenCode #63415/#63416）、Cowork 定时任务权限模型（Claude Code #98287）、SubAgent 多层协作（Deepseek Harness v0.2.2-rc.2） |
| **跨平台桌面端稳定性** | Claude Code、OpenAI Codex、Gemini CLI、OpenClaw | macOS EDR 与 Seatbelt 沙箱兼容（Claude Code #92586、Codex #25719）、Windows 路径与进程启动失败（Codex #60867、OpenClaw #185092）、Wayland 下浏览器子代理失效（Gemini CLI #21983） |
| **MCP / OAuth 身份集成** | OpenAI Codex、OpenCode、Hermes | MCP 服务器配置体验不成熟（Codex）、OAuth 重定向与 Clerk 兼容（OpenCode #63408、#63403）、debug 日志与 memory-context 隐私泄露（Hermes #153698/#153655） |
| **错误可见性与“静默失败”** | Claude Code、OpenAI Codex、Gemini CLI、OpenCode | 插件同步静默失效（Claude Code #108745）、apply_patch 静默忽略上下文（Codex #60876）、子代理中断仍报 success（Gemini CLI #22323）、模型切换导致排队请求消失（OpenCode #63393） |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 插件市场、IDE 深度集成（VS Code）、云端 Cowork 定时任务 | 企业级开发团队、重度 IDE 用户 | 插件生命周期管理为核心，强调组织托管 MCP 与遥测策略 |
| **OpenAI Codex** | CLI 沙箱执行、跨平台桌面端、多模态（Images 2.6） | 个人开发者、跨平台 CLI 重度用户 | Rust 原生实现，Vertex AI / Bedrock 多云后端，强调增量工具声明 |
| **Gemini CLI** | 子代理（Subagent）、AST 感知代码理解、ACP 协议 | AI 原生应用开发者、Agent 构建者 | 基于 ACP 协议标准化，侧重代码定位精度与 Token 优化 |
| **DeepSeek Reasonix** | 内置浏览器 DOM 编辑、会话消息跨会话流转、桌面端 GUI | 前端/全栈开发者、本地网页编辑场景 | Studio + CLI 双端同步发布，内置浏览器与工作台文件树并排 |
| **OpenCode** | 子会话恢复、TUI 稳定性、插件 API 会话历史搜索 | 终端原生用户、插件开发者 | 进程守护进程（process-daemon）架构，npm 包分发，协议版本迭代快 |
| **Deepseek Harness** | Git Worktree 代码审阅、SubAgent 多层协作、桌面端更新渠道 | 代码审阅团队、企业内部 AI 平台 | 审阅工作流闭环（GitHub 评审同步）、正式版/开发版渠道切换 |
| **Hermes** | Plugin Catalog 生态扩展、安全加固（debug/memory 隐私）、多平台消息网关 | 插件开发者、隐私敏感场景用户 | 插件目录 pin 机制、sec-marathon 安全专项、Telegram/Email/Desktop 多渠道 |
| **OpenClaw** | Windows/macOS 节点浏览器控制、Cron 自动化限流、可访问性 | 桌面端 Agent 用户、企业自动化运维 | 网关 + 节点架构，强调计算机使用类（computer.act）能力与语音/文本交互 |

## 5. 社区热度与成熟度

- **最高活跃度**：OpenCode（50 PR + 19 Issue）和 OpenClaw（50 PR + 11 Issue）处于快速迭代与补丁密集期，适合追求前沿功能的早期采用者。
- **讨论最密集**：Claude Code（50 Issue）社区反馈最集中，插件市场与 IDE 集成问题引发广泛讨论，用户基数大且反馈及时。
- **稳定版发布最规范**：OpenAI Codex 拥有唯一明确的稳定版（rust-v0.167.2）及清晰的 Alpha 版本矩阵，适合生产环境评估。
- **刚完成重大发布**：DeepSeek Reasonix v2.60.0 发布后立即进入 UI 回归缺陷收集期（25 Issue），属于“发布后修复窗口期”，短期稳定性有待观察。
- **低活跃/维护期**：Deepseek Harness 过去 24 小时无 Issue 与 PR 更新，仅有 RC 版本发布，社区处于相对沉淀状态，适合观察其审阅工作流的长期采纳情况。

## 6. 值得关注的趋势信号

### (1) “静默失败”正成为行业共性痛点
Claude Code（插件同步静默失效）、Codex（apply_patch 静默忽略上下文）、Gemini CLI（子代理中断仍报 success）、OpenCode（模型切换导致排队请求消失）均出现“UI 显示成功但实际未执行”的问题。开发者对错误日志、调试可见性和状态一致性的容忍度正在降低，**错误可见性将成为下一代 CLI 工具的核心竞争力**。

### (2) 子代理协作从“功能演示”转向“生产可靠性”
Gemini CLI（MAX_TURNS 状态上报错误）、OpenCode（子会话重启后执行权丢失）、Deepseek Harness（SubAgent 多层协作）、Claude Code（Cowork 定时任务权限）均围绕子代理的生命周期管理、状态恢复与权限边界展开。这表明 **多代理协作已从概念验证进入工程化交付阶段**，可观测性与容错机制是关键。

### (3) 跨平台桌面端适配仍是短板
macOS（EDR、Seatbelt 沙箱、syspolicyd CPU 失控）、Windows（路径解析、CreateProcess 失败、Git 进程高 CPU）、Linux（Wayland 浏览器子代理）三大平台均有高优先级缺陷。对于需要桌面端自动化的团队，**跨平台一致性测试应纳入选型必检项**。

### (4) MCP/OAuth 身份集成进入深水区
Codex、OpenCode、Hermes 均出现 MCP 服务器配置、OAuth 重定向、第三方身份提供商（Clerk）兼容问题。随着插件生态扩张，**身份供应商适配与令牌生命周期管理**将成为 CLI 工具与企业 SSO 体系打通的瓶颈。

### (5) 插件市场与供应链可信度受关注
Claude Code（插件市场更新按钮失效、静默下载失败）、Hermes（插件目录 pin 机制、SHA 版本锁定）均反映出插件生命周期管理不成熟。企业用户在采纳前应评估 **插件签名、版本锁定与回滚能力**。

### 对开发者的参考建议
- **选型优先级**：若需生产环境稳定性，优先考虑 OpenAI Codex（有明确稳定版）或 Claude Code（社区反馈响应快）；若需插件扩展与多代理协作，关注 Gemini CLI 与 OpenCode 的 ACP/插件 API

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-12）

## 1. 热门 Skills 排行

基于 PR 活跃度与社区关注度，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简介 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 `fix(mcp-builder)` | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入路径变更及自定义 HTTP 头配置问题 | MCP 协议版本兼容性是社区痛点，直接影响技能构建器的稳定性 | OPEN | [#1742](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 `fix(skill-creator)` | 修复触发评估误报/漏报、Windows 子进程管道兼容性及运行时失败处理 | Skill 创建工具链的可靠性直接影响社区贡献门槛 | OPEN | [#1298](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 `Add notion-spec-to-implementation...` | 新增 Notion 规格转实现技能与定量简历审计技能 | 产品规格到代码的自动化落地，以及简历审计等垂直场景需求强烈 | OPEN | [#1245](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1980 `webapp-testing` | 移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用测试技能的安全加固，社区对供应链安全关注度高 | OPEN | [#1980](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 `fix(docx)` | LibreOffice 超时改为报错，并验证输出 DOCX 无修订痕迹 | 文档自动化处理的可靠性与错误处理机制 | OPEN | [#1792](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 `feat(skills): add proofcore-contract-auditor` | 新增 Solidity/Rust 智能合约静态分析技能，并将审计证明锚定至 TON 区块链 | Web3/智能合约安全审计是新兴高价值技能方向 | OPEN | [#1771](https://github.com/anthropics/skills/pull/1771) |
| 7 | #525 `Add pyxel skill` | 新增 Python 复古游戏开发技能（Pyxel），支持头less 运行与帧检查 | 游戏开发等创意编程领域的技能扩展 | OPEN | [#525](https://github.com/anthropics/skills/pull/525) |
| 8 | #2019 `fix(xlsx)` | 修复工作表级定义名称与外部链接风险检测的假阴性问题 | Excel/表格自动化处理的精确性修复 | OPEN | [#2019](https://github.com/anthropics/skills/pull/2019) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并至主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进诉求如下：

1. **工作流自动化与文档落地**  
   - `notion-spec-to-implementation`（将产品/技术规格转为可执行任务）  
   - `compact-memory`（符号化紧凑代理状态，减少长上下文占用）  
   - `document-typography`（AI 生成文档的排版质量控制）

2. **代码审查与安全治理**  
   - `proofcore-contract-auditor`（智能合约静态分析 + 区块链锚证）  
   - `agent-governance`（AI 代理系统的策略执行、威胁检测与审计追踪）  
   - `webapp-testing` 安全加固（消除 `shell=True` 命令注入风险）

3. **测试生成与技能评估工具链**  
   - `skill-creator` / `run_eval.py` 的触发率评估、Windows 兼容性、并行 worker UUID 交叉匹配等基础设施问题亟待修复  
   - 社区普遍反映技能触发率为 0% 或异常偏低，影响实用性

4. **企业协作与权限管理**  
   - 组织内技能共享（Issue #228，避免手动通过 Slack/Teams 传递 `.skill` 文件）  
   - 社区技能信任边界问题（Issue #492，非官方技能冒用 `anthropic/` 命名空间造成安全风险）

5. **跨平台文档与表格处理**  
   - `docx`、`xlsx`、`pptx` 等办公文档自动化的稳定性与边界情况处理（超时、定义名称、缩略图参数校验等）

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且功能切合社区痛点，大概率在近期落地：

| PR | 技能/方向 | 潜力理由 | 最近更新 | 链接 |
|------|-----------|----------|----------|------|
| #1245 | `notion-spec-to-implementation` + `quantitative-resume-auditor` | 覆盖产品交付与简历审计两个高频垂直场景，社区需求明确 | 2026-10-15 | [#1245](https://github.com/anthropics/skills/pull/1245) |
| #1742 | `mcp-builder` MCP 2.0 兼容性修复 | MCP 是 Claude Code 生态核心基础设施，该修复影响所有基于 MCP 构建的技能 | 2026-10-08 | [#1742](https://github.com/anthropics/skills/pull/1742) |
| #1298 | `skill-creator` 触发评估与 Windows 兼容性 | 直接关系到社区自建技能的可用性，是技能贡献流程的基石 | 2026-09-16 | [#1298](https://github.com/anthropics/skills/pull/1298) |
| #1980 | `webapp-testing` 安全加固 | 消除命令注入漏洞，符合企业级安全合规要求，优先级高 | 2026-11-01 | [#1980](https://github.com/anthropics/skills/pull/1980) |
| #1771 | `proofcore-contract-auditor` | Web3 智能合约审计是差异化赛道，区块链锚证机制具有技术新颖性 | 2026-09-16 | [#1771](https://github.com/anthropics/skills/pull/1771) |
| #525 | `pyxel` 复古游戏开发 | 创意编程与游戏开发领域填补空白，作者持续维护（更新至 2026-11-01） | 2026-11-01 | [#525](https://github.com/anthropics/skills/pull/525) |

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可信、可靠、可落地的垂直领域自动化技能，同时修复技能创建与评估工具链的基础性缺陷，以降低社区贡献门槛并确保企业级安全合规。**

---

# Claude Code 社区动态日报 (2026-11-12)

## 今日速览

过去24小时内，Claude Code 仓库未发布新版本，但社区活跃度保持在较高水平，共更新 50 条 Issue 和 1 条 PR。核心讨论集中在 **插件市场交互异常**、**Cowork 定时任务权限限制**、**语音模式功能缺失** 以及 **VS Code 扩展遥测设置导致插件同步失效** 等问题，开发者对 IDE 集成稳定性和跨平台体验的关注度显著提升。

## 版本发布

过去24小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

以下 Issue 按社区关注度（评论数、点赞数及问题严重性）筛选，均在过去24小时内有更新：

| # | 标题 | 状态 | 核心内容 | 社区反应/重要性 | 链接 |
|---|------|------|----------|----------------|------|
| #45810 | Marketplace update button is disabled/not pressable even when version is outdated | CLOSED | 插件市场 UI 中“更新”按钮在版本过期时置灯不可点击，无法触发插件更新。 | 评论数最多（18条），8个👍，插件生态核心功能受影响，社区关注度最高。 | https://github.com/anthropics/claude-code/issues/45810 |
| #98287 | Cowork scheduled tasks: permission classifier refuses owner-authorized email sends | OPEN | Cowork 云端定时任务中，权限分类器拒绝账户所有者授权的 Gmail 发送（标记为“现实世界交易”），而同一操作在交互式会话中可成功；缺乏单任务允许列表。 | 8条评论，涉及云端自动化与安全权限边界，对依赖 Cowork 的企业用户影响大。 | https://github.com/anthropics/claude-code/issues/98287 |
| #102545 | Voice mode: add text-to-speech responses, continuous listening, and auto-submit in tap mode | OPEN | 语音模式仅支持听写，缺乏响应朗读、持续监听和会话自动启动语音；录音在15秒静默或2分钟后自动停止。 | 4条评论，3个👍，反映社区对无手操作（hands-free）工作流的强烈需求。 | https://github.com/anthropics/claude-code/issues/102545 |
| #108955 | /model picker omits Fable 5.2, though /model claude-fable-5-2 works | OPEN | Windows 平台 v2.1.322 中，/model 选择器仅显示 Fable 5.1，但直接命令 `/model claude-fable-5-2` 可用。 | 3条评论，4个👍，新模型支持同步滞后，影响 Max 计划用户体验。 | https://github.com/anthropics/claude-code/issues/108955 |
| #81814 | Add native spellcheck support to the chat input box in the VS Code extension | OPEN | VS Code 扩展聊天输入框缺乏原生拼写检查功能。 | 3条评论，11个👍（点赞最高），IDE 集成体验细节受到广泛关注。 | https://github.com/anthropics/claude-code/issues/81814 |
| #92573 | .claude/worktrees/* pool: worktree slot appears reused/reset while session active, causing mass file loss | CLOSED | Agent 使用 `isolation: "worktree"` 时，工作树槽位在会话仍活跃时被重置/复用，导致约5900个文件中途丢失。 | 2条评论，标记 `data-loss`，涉及数据安全，是高优先级稳定性问题。 | https://github.com/anthropics/claude-code/issues/92573 |
| #92586 | Bash tool kills every command after ~5s when EDR transiently hard-links new files | CLOSED | macOS 上安装 Genian Insights EDR 后，Bash 工具每条命令约5秒后被强制终止，报错“output file was replaced or could no longer be verified”。 | 2条评论，涉及沙箱与第三方安全软件的兼容性，对企业 macOS 用户影响大。 | https://github.com/anthropics/claude-code/issues/92586 |
| #90329 | Desktop app: per-workspace plugin store syncs on schedule but never downloads | CLOSED | Windows 桌面应用的插件商店按计划同步，所有指示灯绿色，但从不实际下载插件。 | 2条评论，插件下载链路静默失败，排查困难。 | https://github.com/anthropics/claude-code/issues/90329 |
| #108745 | VS Code extension 2.1.322: telemetry.telemetryLevel=off silently disables claude.ai plugin sync | OPEN | 关闭 VS Code 遥测后，claude.ai 插件同步静默失效，组织托管的 MCP 服务器、Agent 和技能全部消失，无任何 UI 提示。 | 1条评论，隐私设置与功能可用性意外耦合，属回归问题（regression）。 | https://github.com/anthropics/claude-code/issues/108745 |
| #108839 | `claude --resume` on a session spawned by background Remote Control server attaches to the server | OPEN | 由 `claude --bg remote-control` 产生的会话，其 jobId 被服务器占用，导致 `--resume` 和 `attach` 无法连接到实际子会话。 | 1条评论，影响远程控制与会话恢复工作流，Linux 平台用户反馈。 | https://github.com/anthropics/claude-code/issues/108839 |

---

## 重要 PR 进展

过去24小时内仅有 1 条 PR 更新，详情如下：

| # | 标题 | 状态 | 功能/修复内容 | 链接 |
|---|------|------|--------------|------|
| #26230 | Feature/path validation hooks | CLOSED | 拦截 Agent 工具调用中的相对路径，以更好地支持安全沙箱（secure sandboxing）。该 PR 已关闭，未合并，社区可关注后续是否有替代方案。 | https://github.com/anthropics/claude-code/pull/26230 |

> 注：因近24小时内仅有上述 1 条 PR 更新，本部分未凑齐 10 条，其余 Issue 均为已关闭或陈旧（stale）问题，未见新的重大功能合并。

---

## 功能需求趋势

从近期 Issue 中可提炼出社区最关注的四个功能方向：

1. **语音与无障碍交互**  
   用户希望语音模式从单向听写进化为完整的语音工作流，包括 TTS 朗读、持续监听、会话自动语音启动等（#102545）。

2. **IDE 集成体验细节**  
   VS Code 扩展的原生拼写检查（#81814）、状态栏与模式徽章布局优化（#109141）等需求表明，开发者希望编辑器内嵌体验更贴近原生 IDE。

3. **插件与扩展生态稳定性**  
   插件市场更新按钮失效（#45810）、桌面端插件商店静默下载失败（#90329）、遥测设置误导致插件同步中断（#108745），插件生命周期管理成为痛点。

4. **跨平台与云端任务（Cowork）权限模型**  
   定时任务的权限分类器过于严格，缺乏任务级授权机制（#98287），反映用户对云端自动化与本地交互式会话之间权限对等性的诉求。

---

## 开发者关注点（痛点与高频需求）

1. **数据安全与会话稳定性**  
   工作树（worktree）槽位复用导致大规模文件丢失（#92573）、大图片附件静默杀死会话（#90802）、Windows 桌面更新后无法重启（0x80070020，#92614），开发者对数据丢失和会话中断极为敏感。

2. **沙箱与第三方安全软件兼容性**  
   macOS 上 EDR 导致 Bash 工具命令被强制终止（#92586）、JVM 项目无法在保持文件系统隔离的同时关闭网络隔离（#92609），沙箱策略需要更细粒度的配置。

3. **模型选择器与新模型同步**  
   `/model` 选择器未及时列出新模型（如 Fable 5.2，#108955），虽然直接命令可用，但 UI 体验滞后，影响模型切换效率。

4. **权限与认证体验**  
   Chrome 桥接在空闲/关闭后要求重新授权（#109036）、Cowork 定时任务缺少任务级允许列表（#98287）、API 内容过滤误报（#92604），认证与权限边界需要更透明的配置和反馈。

5. **错误可见性与调试能力**  
   多个 Issue 提到“静默失败”（无错误写入转录、UI 显示成功但实际未发送、所有指示灯绿色但无下载），开发者普遍希望获得更清晰的错误日志和调试信息。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-12  
**数据来源**: github.com/openai/codex  

---

## 1. 今日速览

Codex 近期发布了稳定版 **rust-v0.167.2**，主要变更为在 Google Cloud Vertex AI 上默认启用增量工具声明（可通过 `config.toml` 关闭）。社区活跃度集中在 macOS/Windows 桌面端的资源占用、CLI 工具调用稳定性，以及 MCP 服务器配置等领域，今日新增大量 Windows 路径处理与沙箱执行相关的 Bug 报告。

---

## 2. 版本发布

| 版本 | 类型 | 核心更新 |
|------|------|----------|
| **rust-v0.167.2** | 稳定版 | Codex 现在默认在 Google Cloud Vertex AI 上增量发送工具更新。如需退出，可在 `config.toml` 的 `[features]` 下设置 `incremental_tools_legacy_gcp = false`。([#60617](https://github.com/openai/codex/pull/60617), [#60848](https://github.com/openai/codex/pull/60848)) |
| rust-v0.170.0-alpha.1 | Alpha | 发布 0.170.0-alpha.1 |
| rust-v0.169.0-alpha.11 / .11.1 / .10 | Alpha | 连续发布多个 0.169.x Alpha 版本 |
| rust-v0.167.0-alpha.4.2 / .4.3 | Alpha | 连续发布多个 0.167.0-alpha.4.x 版本 |

> 稳定版仅 0.167.2 一项，其余均为 Alpha 预览版，建议生产环境优先关注 0.167.2 的变更。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心指标 | 为什么重要 | 链接 |
|---|------|----------|------------|------|
| #25719 | macOS 反复触发 `syspolicyd` / `trustd` CPU 和内存失控 | 92 评论 / 398 👍 | 长期未解决的桌面端性能重灾区，直接影响 macOS 用户的日常使用体验，社区关注度最高。 | [查看](https://github.com/openai/codex/issues/25719) |
| #22085 | Windows：Codex 产生大量 Git for Windows 进程，导致持续高 CPU | 21 评论 / 28 👍 | Windows 平台性能问题，后台进程失控会拖慢开发机器，与版本更新相关。 | [查看](https://github.com/openai/codex/issues/22085) |
| #58447 | macOS：dot 原生线程读取返回 `DesktopThreadReadUnavailableError` | 24 评论 / 2 👍 | 涉及跨平台桌面线程读取，已授权的桌面环境下仍无法读取已有线程，影响多设备协作。 | [查看](https://github.com/openai/codex/issues/58447) |
| #59890 | Images 2.6 on Codex OAuth：无模型选择、复杂度/SVG 被忽略、GIF 被拒绝 | 7 评论 / 3 👍 | 新图像模型（gpt-image-2.6-*）在第三方 OAuth 客户端中功能受限，影响多模态工作流。 | [查看](https://github.com/openai/codex/issues/59890) |
| #60212 | Codex Desktop：项目线程列表在“显示更多”后无法恢复初始大小 | 6 评论 | 桌面端 UI 交互缺陷，影响线程管理的可用性。 | [查看](https://github.com/openai/codex/issues/60212) |
| #60867 | Windows Codex CLI 0.167.1：`exec_command` CreateProcess 失败 | 5 评论 | Windows CLI 在沙箱预检下出现可重复的原生进程启动失败，直接阻断命令执行。 | [查看](https://github.com/openai/codex/issues/60867) |
| #60310 | Windows → Android Remote 拒绝 live task（尽管本地后台服务器可用） | 4 评论 | 跨平台远程任务调度问题，涉及 CLI 与 app-server 版本不一致。 | [查看](https://github.com/openai/codex/issues/60310) |
| #60876 | `apply_patch` 静默忽略缺失的最终空白上下文行 | 2 评论 | 补丁应用工具在上下文不匹配时仍报告成功，可能导致静默的文件损坏。 | [查看](https://github.com/openai/codex/issues/60876) |
| #60926 | Windows：使用历史不完整，缺少 Dot 任务，配额覆盖未确认 | 1 评论 | 涉及 Dot 自动化任务的可见性与配额追踪，对依赖自动化工作流的用户影响较大。 | [查看](https://github.com/openai/codex/issues/60926) |
| #60920 | ChatGPT 账户连续 20 小时达到使用限额 | 1 评论 | 账户配额卡住问题，直接影响用户可用性，紧急程度高。 | [查看](https://github.com/openai/codex/issues/60920) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 功能/修复内容 | 链接 |
|---|------|--------------|------|
| #60848 | 为 GCP 启用增量工具声明 | 稳定 `incremental_tools_legacy_gcp` 特性，默认开启，控制常规 GCP Responses 上的增量工具声明，与 Amazon Bedrock 独立。 | [查看](https://github.com/openai/codex/pull/60848) |
| #60846 | 修复包含空格的查询的线程搜索片段 | 在匹配前不再对空白字符进行归一化，防止线程搜索对重复空格、换行或制表符产生错误片段。 | [查看](https://github.com/openai/codex/pull/60846) |
| #60845 | 从重叠根目录中去重文件搜索结果 | 跳过重复的搜索根目录，并在重叠子树中去重路径，避免同一路径占用多个结果槽位。 | [查看](https://github.com/openai/codex/pull/60845) |
| #60842 | 使 TUI 线程标题对生成失败具有韧性 | 在自动标题生成挂起或失败时提供可见标题；隐藏的标题生成请求不再出现在前台对话中。 | [查看](https://github.com/openai/codex/pull/60842) |
| #60841 | 遵守广告的 WebSocket 消息大小限制 | 从握手响应中读取 `x-codex-websocket-max-message-bytes` 并检查，避免超大消息无故回退到 HTTP。 | [查看](https://github.com/openai/codex/pull/60841) |
| #60840 | 对超大 WebSocket 请求立即回退到 HTTP | 对 WebSocket 关闭码 `1009` 进行分类处理，直接通过 HTTP 重试，而非再次尝试 WebSocket。 | [查看](https://github.com/openai/codex/pull/60840) |
| #60839 | 在回滚重放中保留保留的助手修订版 | 捕获并持久化助手投递时的保留来源，避免重放时重新分配新的保留修订版。 | [查看](https://github.com/openai/codex/pull/60839) |
| #60872 | 修复 Windows 原子写入并刷新构建维护 | 使用 `std::fs::rename` 实现 Windows 上的原子文件替换，支持重叠读取器；替换旧沙箱捕获中的 PowerShell fixture。 | [查看](https://github.com/openai/codex/pull/60872) |
| #60871 | 等待进程内初始化握手完成 | 在发送请求前等待 `initialized` 通知已处理，避免通道容量竞争导致 `WouldBlock` 失败。 | [查看](https://github.com/openai/codex/pull/60871) |
| #60849 | 保护 MCP OAuth 持久化免受过时凭证写入 | 在令牌刷新时加锁并重新验证存储的凭证，防止覆盖较新登录或在登出后重新创建凭证。 | [查看](https://github.com/openai/codex/pull/60849) |

---

## 5. 功能需求趋势

从近 24 小时的 Issues 和 PR 中可以观察到以下社区关注方向：

1. **跨平台桌面端稳定性**：macOS 上的系统进程资源失控（`syspolicyd`/`trustd`）和 Windows 上的 Git 进程高 CPU 问题持续发酵，桌面端性能与资源管控成为首要痛点。
2. **CLI 与沙箱执行可靠性**：大量 Windows 相关的 `exec_command`、`fs/readDirectory`、`process/writeStdin` 及 PTY 问题，表明开发者对 CLI 在 Windows 沙箱下的文件系统与进程控制稳定性要求很高。
3. **MCP 服务器管理**：多个关于 `codex mcp add` 的 Issue（路径解析、URL 校验、设置重置、源丢失）显示 MCP 生态配置体验尚不成熟，亟需更严格的输入校验与状态保护。
4. **多模态与模型选择**：Images 2.6 在 Codex OAuth 客户端中缺乏模型选择和新特性控制，反映社区希望 Codex 能更好地暴露新模型能力。
5. **Dot 自动化任务可见性**：用户反馈无法可靠发现 Dot 启动的所有任务，且使用历史不完整，指向对自动化代理（Agent）审计与追踪功能的需求。

---

## 6. 开发者关注点

**高频痛点：**
- **Windows 平台适配问题**：路径中的 `#` 被误解析为 Git 引用分隔符、非换行空格（U+00A0）导致路径截断、PTY `closeStdin` 直接终止子进程而非发送 EOF、市场源移除失败后配置丢失等，Windows 文件系统与进程交互是当前 Bug 多发区。
- **沙箱与权限限制**：macOS Seatbelt 沙箱拒绝 `kern.nisdomainname` 导致 .NET 8 `CookieContainer` 和 HTTP 客户端异常，说明沙箱策略与主流开发语言运行时仍存在兼容性缺口。
- **静默失败与数据一致性**：`apply_patch` 静默忽略

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-12)

## 1. 今日速览

今日 Gemini CLI 社区围绕 **Agent 稳定性与子代理机制** 展开密集讨论，多个 P1/P2 级 Bug 指向子代理在达到最大轮次后错误报告成功、通用代理挂起以及浏览器子代理在 Wayland 环境下失效等核心问题。与此同时，开发者通过 20+ 个 PR 持续修复 CLI 核心模块，涵盖环境变量解析、PowerShell 阻塞、二进制数据截断及 ACP 协议增强等方面，暂无新版本发布。

## 2. 版本发布

过去 24 小时内无新版本 Release。

## 3. 社区热点 Issues

以下选取评论数较多且对用户体验影响显著的 10 个 Issue：

| # | 标题 | 优先级/类型 | 评论/👍 | 关注理由 |
|---|------|-------------|---------|---------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption | P1 / Bug | 13 / 2 | 子代理达到最大轮次后仍上报 `status: "success"`，掩盖任务中断，可能导致开发者误以为分析已完成，严重影响可信度。 |
| [#21409](https://github.com/github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 / Bug | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，社区👍数最高，亟待修复。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 / Enhancement | 9 / 1 | 提议利用 Gemini 3 模型的原生 Bash 能力，通过零依赖 OS 沙箱增强代理操作系统能力，方向前瞻。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 7 / 1 | 探索 AST 感知的文件读取与代码映射，有望大幅减少 Token 浪费并提升代码定位精度。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 / Bug | 7 / 0 | 模型不主动调用自定义技能和子代理，需显式指令才能触发，影响 Agent 工作流自动化。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | [BUG] Browser Agent ignores settings.json overrides (e.g., maxTurns) | P2 / Bug | 5 / 0 | 浏览器子代理忽略全局/项目级 `settings.json` 配置，导致 `maxTurns` 等设置失效。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 / Bug | 4 / 1 | Wayland 环境下浏览器子代理直接失败，影响 Linux 桌面用户体验。 |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | Enhance browser_agent resilience: Automatic session takeover and lock recovery | P3 / Feature | 4 / 0 | 浏览器代理采用“快速失败”策略，缺乏会话接管与锁恢复机制，建议增强韧性。 |
| [#21000](https://github.com/google-gemini/gemini-cli/issues/21000) | Experiment with using native file tools for creating and maintaining the task tracker | P3 / Bug | 4 / 0 | 提议使用原生文件工具替代上下文内任务追踪，解决“上下文腐烂”和跨会话记忆丢失问题。 |
| [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) | ~/.gemini/agents/filename.md is not recognized as an agent if filename.md is a symlink | P2 / Bug | 4 / 0 | 代理目录下的符号链接不被识别，影响用户通过链接方式管理自定义子代理。 |

## 4. 重要 PR 进展

今日共 24 个 PR 更新，选取 10 个对核心稳定性与协议兼容性影响较大的条目：

| # | 标题 | 状态 | 核心内容 |
|---|------|------|---------|
| [#30250](https://github.com/google-gemini/gemini-cli/pull/30250) | fix(cli): apply default in `${VAR:-default}` when variable is set but empty | CLOSED | 修复环境变量占位符解析，使 `${VAR:-default}` 在变量为空字符串时也能正确回退默认值，符合 Bash/POSIX 语义。 |
| [#30247](https://github.com/google-gemini/gemini-cli/pull/30247) | fix(core): avoid blocking PowerShell parsing during shell checks | OPEN | 避免在 Windows 上解析 PowerShell 命令时阻塞 Node.js 事件循环，修复 Thinking spinner 冻结问题。 |
| [#30228](https://github.com/google-gemini/gemini-cli/pull/30228) | fix(core): preserve interrupted placeholder after empty model responses to tool turns | CLOSED | 修复模型对工具输出返回空响应时导致的 `400 Bad Request` 及用户提示词错误合并到 `functionResponse` 轮次的问题。 |
| [#30176](https://github.com/google-gemini/gemini-cli/pull/30176) | fix(cli): preserve selected worktree across authentication restarts | CLOSED | 在认证重启（退出码 199）后保留 `--worktree` 选定的 Git 工作树，覆盖 bootstrap 与 legacy 两种 supervisor。 |
| [#30220](https://github.com/google-gemini/gemini-cli/pull/30220) | fix(cli): preserve Unicode prompts and strip ANSI fragments in session previews | CLOSED | 修复会话预览与搜索中非 ASCII 字符（国际脚本、表情符号）被错误过滤，并正确剥离 ANSI 转义序列。 |
| [#30246](https://github.com/google-gemini/gemini-cli/pull/30246) | fix(core): quote IDE CLI path for cmd.exe in /ide install on Windows | OPEN | 修复 Windows 上路径含空格时 `/ide install` 失败的问题，正确引用编辑器 CLI 路径。 |
| [#30241](https://github.com/google-gemini/gemini-cli/pull/30241) | fix(core): keep injected binary data intact when truncating tool responses | OPEN | 修复 `read_file` 对大于 48KB 的音频/视频文件导致 Base64 解码失败，确保二进制注入数据在截断时不被损坏。 |
| [#30234](https://github.com/google-gemini/gemini-cli/pull/30234) | fix(acp): truncate large tool outputs for the model like the CLI does | OPEN | ACP 协议现在会像 CLI 一样截断大型工具输出，避免单次调用产生数十万 Token 的输入。 |
| [#30236](https://github.com/google-gemini/gemini-cli/pull/30236) | fix(acp): run parallelizable tool calls together like the CLI scheduler | OPEN | ACP 现支持并行执行独立工具调用，消除串行等待带来的延迟（如四次 `sleep 3` 将并行而非累加）。 |
| [#30232](https://github.com/google-gemini/gemini-cli/pull/30232) | feat(acp): support session/close so clients can release a session | OPEN | 为 ACP 客户端实现 `session/close` 方法，允许释放会话资源，避免配置、聊天和 MCP 连接长期占用。 |

## 5. 功能需求趋势

从近期 Issues 与 PR 中可清晰识别出以下社区关注方向：

1. **子代理（Subagent）稳定性与可见性**  
   多个 P1/P2 Bug 指向子代理状态上报错误、挂起、配置被忽略，以及轨迹不可共享（`/chat share` 不可见）。社区期望子代理行为更可预测、可观测。

2. **AST 感知的代码理解能力**  
   围绕 `codebase_investigator` 的多个 Issue 提出使用 AST 感知工具进行精确方法边界读取、代码搜索与映射，以降低 Token 消耗并提升定位精度。

3. **跨平台与终端兼容性**  
   Windows PowerShell 阻塞、Wayland 下浏览器子代理失效、路径含空格导致 `/ide install` 失败，表明社区高度关注 CLI 在不同操作系统与终端环境下的鲁棒性。

4. **ACP（Agent Communication Protocol）协议完善**  
   近期多个 PR 集中在 ACP 层：会话关闭、并行工具调用、大输出截断、二进制数据处理，显示协议标准化与性能优化是当前开发重点。

5. **技能与子代理自动调用**  
   用户反馈模型不会主动使用自定义技能（如 gradle、git）和子代理，需要更强的自动触发机制或更好的模型引导。

## 6. 开发者关注点

**高频痛点：**
- **子代理状态不准确**：达到 `MAX_TURNS` 后仍报告 `GOAL` 成功，掩盖真实中断情况，导致调试困难。
- **通用代理挂起**：即使是简单的文件系统操作也可能导致代理无响应，需手动取消。
- **配置覆盖失效**：`settings.json` 中的 `maxTurns` 等覆盖设置在 Browser Agent 中不生效。
- **上下文管理**：基于上下文的任务追踪（WriteToDo）易导致上下文腐烂和跨会话记忆丢失，社区呼吁持久化文件任务追踪。

**开发者建议方向：**
- 增强子代理恢复机制与中断上报准确性；
- 为浏览器子代理增加会话接管与锁恢复能力；
- 扩展 AST 感知工具链（如 AST grep、tilth、glyph）以优化代码读取与搜索；
- 完善 ACP 协议的会话生命周期管理与工具调用并发模型；
- 改进模型对自定义技能与子代理的自动发现与调用意愿。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 (2026-11-12)

## 1. 今日速览

DeepSeek Reasonix 今日发布 **v2.60.0** 版本，Reasonix Studio 与 CLI 同步更新，重点增强了内置浏览器的页面元素点选与本地网页直接编辑能力，并优化了会话消息流转机制（默认允许跨会话消息直接交给模型，无需批准卡）。社区反馈活跃，过去24小时内新增/更新 25 条 Issue，集中在 v2.60.0 的 UI 稳定性、跨平台兼容性及会话管理体验上；暂无新 Pull Request 提交。

## 2. 版本发布

### Reasonix Studio v2.6.0 / CLI v2.60.0

**核心新增：**
- **内置浏览器「点选页面元素」**：点击页面元素即可查看其选择器、文字内容和颜色信息（提交 `6c9c6851a`）。
- **本地网页直接编辑并保存**：从工作区本地文件打开的网页，支持直接修改所选元素的文字、文字颜色、背景色和字号，并保存回本地文件；若源码中找不到对应元素，会提示原因且不写入（提交 `6c9c6851a`）。
- **工作台文件树并排显示**：在打开的文件旁边直接展示文件树（提交 `2ff95dbc5`）。

**重要变更：**
- 当「让模型把任务交给其他会话」开关开启（默认开启）时，来自你自己的其他会话的消息将直接交给模型处理，不再出现批准确认卡。

**发布链接：**
- [Reasonix CLI v2.60.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.60.0)
- [Reasonix Studio v2.60.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.60.0)

---

## 3. 社区热点 Issues（精选 10 条）

以下是过去24小时内更新最活跃、影响范围最广的 10 条 Issue，按关注度排序：

| # | 标题 | 状态 | 关注理由 | 链接 |
|---|------|------|----------|------|
| #15099 | 所有任务全部在等CI，疑似GitHub服务问题 | OPEN | 用户反馈多个智能体任务均卡在CI等待阶段，涉及CI/CD基础设施稳定性，需排查是否为GitHub侧故障。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15099) |
| #15078 | 上一条任务完成后，下一条任务无法发出 | OPEN | 会话任务队列可能存在阻塞或状态同步问题，直接影响多轮对话的连续性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15078) |
| #15055 | 历史会话开启新窗口报错，v57.0正常 | OPEN | 版本回退兼容性问题，历史会话打开失败，影响用户对旧对话的访问与续写。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15055) |
| #14985 | 重启后之前对话无法打开，提示「没有这个对话」 | OPEN | 会话持久化或本地索引损坏问题，属于数据可靠性高优先级缺陷。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14985) |
| #15098 | 文件夹内有内容但显示为空（v2.60.0） | OPEN | 新版本文件树/资源管理器渲染异常，与本次发布的「文件树并排显示」功能直接相关，需尽快修复。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15098) |
| #15097 | 设置页组件浮于边框上方（v2.60.0） | OPEN | v2.60.0 新增的UI回归缺陷，设置页布局错位影响可用性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15097) |
| #15095 | 页面双滚动条，会话右键加星标无响应（v2.60.0） | OPEN | 桌面端交互缺陷，影响会话管理核心功能（星标/收藏），且出现双滚动条影响阅读体验。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15095) |
| #15093 | 输入框下方模型选择项与图标换行错乱（v2.60.0） | OPEN | 输入区域UI布局异常，直接影响日常对话输入体验。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15093) |
| #15091 | Windows 10 LTSB 2016 上多个小问题 | OPEN | 反映旧系统/轻量化环境下的兼容性压力，部分AI Agent已无法运行，Reasonix虽可运行但GUI存在启动问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15091) |
| #15089 | 设置页右上角最小化/全屏/关闭按钮无法点击（v2.60.0） | OPEN | 窗口控制按钮失效，严重影响桌面端基本操作，需高优先级修复。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15089) |

**社区反应总结：** 大部分热点Issue集中在 **v2.60.0 发布后的UI回归缺陷**（设置页布局、滚动条、按钮点击、模型选择栏错乱）及 **会话数据持久化** 问题。用户反馈积极，多为通过 Studio 内置反馈通道提交，带有详细环境信息和截图。

---

## 4. 重要 PR 进展

**过去24小时内，该仓库无新增或更新的 Pull Requests（共 0 条）。**

社区活动目前主要集中在 Issue 反馈与 Bug 报告上，未出现外部贡献者的代码合并请求。建议开发团队关注已关闭的高价值Issue（如 #15090 默认始终允许设置、#15014 安卓图标统一、#13375 会话结束卡片等），评估其是否已在 v2.60.0 中得到解决，或计划纳入后续版本迭代。

---

## 5. 功能需求趋势

从近24小时全部25条Issue中提炼，社区最关注的功能方向如下：

1. **会话管理与持久化**
   - 历史会话跨版本/重启后的可靠打开（#14985、#15055）
   - 会话任务队列的顺序执行与状态同步（#15078）
   - 多会话角色模式与子代理持久化分配（#15090）

2. **IDE/工作台体验增强**
   - 文件树与编辑器并排布局的稳定性（#15098）
   - 资源树左右拉动与文字完整显示（#15096）
   - 反馈界面全屏支持（#15087）

3. **跨平台与旧系统兼容性**
   - Windows 10 LTSB 2016 等轻量/旧系统上的GUI运行问题（#15091）
   - macOS Homebrew Cask 安装不可读（#15071）
   - 安卓启动图标与应用内品牌统一（#15014）

4. **本地化与细节打磨**
   - 货币显示（人民币/美元）设置不生效（#15065）
   - 块级公式显示不完整与间距问题（#15082、#15092）
   - 插件说明免责声明补充（#15086）

---

## 6. 开发者关注点（痛点与高频需求）

**高频痛点：**
- **v2.60.0 UI 回归缺陷密集**：设置页组件浮边框、双滚动条、窗口控制按钮不可点、模型选择栏换行错乱等，表明新版本在桌面端布局测试覆盖不足。
- **会话数据脆弱**：重启后对话丢失、历史会话打开报错，涉及本地存储与索引机制，属于用户信任度核心问题。
- **CI/CD 任务阻塞**：多个智能体任务卡在CI等待，可能影响自动化工作流的可用性。

**开发者建议关注：**
1. 尽快发布 v2.60.x 补丁版本，修复桌面端UI布局与窗口控制缺陷（#15097、#15095、#15093、#15089）。
2. 排查会话持久化与本地索引重建机制，解决重启后对话无法打开的问题（#14985、#15055）。
3. 评估「默认始终允许」及多会话子代理功能的需求优先级（#15090），以减少批准卡打断并提升自动化工作流体验。
4. 加强旧Windows系统（LTSB 2016等）及macOS Homebrew的安装与运行测试，扩大平台覆盖面（#15091、#15071）。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-12)

## 今日速览

OpenCode 社区今日活跃度较高，共更新 19 个 Issue 和 50 个 PR。核心围绕 **MCP 协议稳定性**、**桌面端多平台适配** 以及 **子会话/子代理生命周期** 展开修复。npm 发布了 `@opencode/pty@0.5.2`，多个与子会话恢复、MCP OAuth、TUI 崩溃相关的缺陷已在当日修复并关闭。

## 版本发布

**@opencode/pty@0.5.2** (protocol 8)  
来源：`packages/process-daemon`，已发布至 npm。  
该版本为进程守护进程（process-daemon）的 PTY 组件更新，协议版本升至 8，为后续终端相关修复奠定基础。

[查看 Release 详情](https://github.com/anomalyco/opencode/releases/tag/process-daemon-v0.5.2)

## 社区热点 Issues

以下 10 个 Issue 今日更新频繁或社区关注度高，建议重点跟进：

| # | 标题 | 状态 | 核心内容 | 为何值得关注 | 链接 |
|---|------|------|----------|--------------|------|
| #59387 | [zen] Free tier issues: read this first, then post your report here | OPEN | 免费层使用超限、重置失效、桌面版本过期等问题汇总 | 社区热度最高（354 条评论、27 👍），是免费用户反馈的主集散地，持续影响大量用户体验 | [链接](https://github.com/anomalyco/opencode/issues/59387) |
| #63393 | Changing the model vanished queued requests | OPEN | 切换模型后已排队请求消失，用户数据丢失风险 | 新提交的严重缺陷，涉及用户队列数据丢失，需优先评估修复优先级 | [链接](https://github.com/anomalyco/opencode/issues/63393) |
| #63417 | client: reconnect splash every <=10s (HA add-on) | OPEN | Home Assistant 插件运行时每 10 秒出现一次全屏重连提示，手动重连导致会话不可用 | 直接影响 HA 环境下的可用性，属于高频阻塞性问题 | [链接](https://github.com/anomalyco/opencode/issues/63417) |
| #63418 | TUI crash: SyntaxStyle requires an explicit resource owner | CLOSED | TUI 崩溃，缺少 renderer.nativeScene 或 ResourceContext | 今日新增并已关闭的 TUI 稳定性修复，命令行用户应关注 | [链接](https://github.com/anomalyco/opencode/issues/63418) |
| #63408 | MCP OAuth sign-in fails on Clerk-backed servers | CLOSED | Clerk 后台 MCP 服务器 OAuth 登录失败，redirect_uri 不匹配 | MCP 生态兼容性问题，涉及第三方身份提供商集成 | [链接](https://github.com/anomalyco/opencode/issues/63408) |
| #63092 | mcp: documented 5s timeout default is actually 30s | OPEN | 文档声称 5s 默认超时，实际客户端使用 30s；标量 timeout 会覆盖 12h 执行窗口 | 配置文档与实现不一致，可能导致 MCP 服务器行为异常 | [链接](https://github.com/anomalyco/opencode/issues/63092) |
| #63205 | lsp: v2.2.7 accepts lsp config but never starts servers | CLOSED | LSP 配置被接受但从不启动语言服务器，未注入诊断 | 影响代码智能感知功能，已修复关闭 | [链接](https://github.com/anomalyco/opencode/issues/63205) |
| #63214 | desktop: Review panel file tree doesn't refresh when files are created/deleted by shell commands (Windows) | CLOSED | Windows 桌面端 Review 面板文件树在 shell 操作后不刷新 | 桌面端文件系统监听缺陷，影响 Windows 开发者工作流 | [链接](https://github.com/anomalyco/opencode/issues/63214) |
| #63419 | desktop: second macOS user account can't start service — port 49374 held | CLOSED | 同一机器第二个 macOS 用户无法启动服务，端口被其他账号占用 | 多用户环境下的端口冲突与服务隔离问题 | [链接](https://github.com/anomalyco/opencode/issues/63419) |
| #54800 | desktop: session column capped at 744px on wide monitors | OPEN | 宽屏下会话列被硬限制 744px，截断图表和表格 | UI 适配需求，影响宽屏用户的阅读体验 | [链接](https://github.com/anomalyco/opencode/issues/54800) |

## 重要 PR 进展

今日合并或更新的 10 个重要 PR，涵盖核心、桌面、MCP、TUI 及插件系统：

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #63415 | fix(core): resume directly driven child sessions after restart | OPEN | 修复重启后直接驱动的子会话无法恢复，解决执行权（execution claim）被误清除的问题 | [链接](https://github.com/anomalyco/opencode/pull/63415) |
| #63416 | fix(core): recover parent wakes after subagent report acknowledgement | OPEN | 子代理报告确认后崩溃会导致父会话挂起，本次修复恢复父会话唤醒机制 | [链接](https://github.com/anomalyco/opencode/pull/63416) |
| #63413 | refactor(core): remove the subagent notify option | CLOSED | 移除子代理 `notify` 选项，所有子会话空闲时均向父会话汇报，统一行为 | [链接](https://github.com/anomalyco/opencode/pull/63413) |
| #63409 | feat(core): run local Windows shell commands in the process daemon | CLOSED | 本地 Windows shell 命令可通过进程守护进程在服务器重启后存活，提升跨平台稳定性 | [链接](https://github.com/anomalyco/opencode/pull/63409) |
| #63412 | fix(mcp): propagate active trace context | OPEN | 在 MCP 工具、提示、资源和目录请求中转发 W3C 追踪上下文，增强可观测性 | [链接](https://github.com/anomalyco/opencode/pull/63412) |
| #63403 | fix(core): use the localhost redirect when an MCP OAuth server rewrites 127.0.0.1 | CLOSED | 修复 MCP OAuth 重定向地址被 Clerk 等服务重写为 127.0.0.1 时的登录失败 | [链接](https://github.com/anomalyco/opencode/pull/63403) |
| #63410 | feat(plugin): expose paginated session messages | OPEN | 插件 API 新增 `ctx.session.message.list`，支持分页检索会话历史消息 | [链接](https://github.com/anomalyco/opencode/pull/63410) |
| #63411 | feat(core): add session history search and inspect tools | OPEN | 基于 #63410，为 Agent 提供会话历史搜索与检查工具，需开启 `experimental.session_search` | [链接](https://github.com/anomalyco/opencode/pull/63411) |
| #63420 | test(tui): wait for the closed terminal frame before reopening | OPEN | 修复 TUI 终端重开时的 CI 失败，等待旧终端销毁后再重新打开 | [链接](https://github.com/anomalyco/opencode/pull/63420) |
| #63030 | fix(core): stop keeping the whole file in memory for tail reads | CLOSED | 修复读取大文件尾部时整个文件驻留内存的问题（曾出现 108 MiB 文件占用），优化内存占用 | [链接](https://github.com/anomalyco/opencode/pull/63030) |

## 功能需求趋势

从今日 Issues 和 PR 中提炼出的社区关注方向：

1. **MCP 生态与 OAuth 兼容性**  
   多个 Issue/PR 围绕 MCP 超时配置不一致、OAuth 重定向不匹配、语言服务器未启动等展开，说明 MCP 协议集成是当前社区的重点痛点。

2. **子会话与子代理生命周期管理**  
   子会话重启丢失执行权、父会话唤醒恢复、移除 `notify` 选项等，表明开发者对多代理协作（subagent）的稳定性要求极高。

3. **桌面端多平台适配**  
   Windows 文件树不刷新、macOS 多用户端口冲突、Android LAN 权限缺失，桌面端跨平台一致性仍需持续打磨。

4. **IDE 插件集成**  
   VS Code 侧边栏 UI、GitHub PR 生命周期关联、会话历史搜索等功能请求显示社区希望 OpenCode 更深度嵌入现有 IDE 工作流。

5. **A2UI 与新协议支持**  
   有社区成员提议在核心中支持 A2UI，暗示对新一代 Agent 交互界面标准的探索已开始。

## 开发者关注点

- **数据丢失风险**：模型切换导致排队请求消失（#63393）是今日最严重的用户可见缺陷，建议核心团队优先评估。
- **TUI 稳定性**：SyntaxStyle 资源所有者缺失导致的崩溃（#63418）反映终端渲染层仍存在边界情况。
- **配置与文档一致性**：MCP 超时默认值文档与实现不符（#63092），可能误导开发者配置。
- **免费层体验**：#59387 持续聚集大量免费用户反馈，限额重置失效和订阅提示问题仍未根本解决。
- **插件 API 扩展**：会话历史分页与搜索工具（#63410、#63411）的加入，表明插件开发者需要更丰富的会话元数据访问能力。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 (2026-11-12)

## 1. 今日速览

过去 24 小时，Deepseek Harness 社区核心动态集中于 **dsh-v0.2.2-rc.2** 的发布。该版本重点增强了 Git Worktree 代码审阅工作流、SubAgent 多层协作能力以及桌面端更新渠道管理。与此同时，Issues 与 Pull Requests 在过去 24 小时内均无更新记录。

## 2. 版本发布

### dsh-v0.2.2-rc.2

**发布链接：** [https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.2.2-rc.2](https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.2.2-rc.2)

**主要新增功能：**
- **Git Worktree 审阅增强**：支持按分支、提交和文件类型审阅改动，可直接处理 GitHub 评审、同步已审阅进度并更新分支。贡献者：@LegGasai
- **SubAgent 具名与多层协作**：AgentTeam 可按会话开启，成员与任务面板共用，支持更复杂的多 Agent 协作场景。贡献者：@Dudu-0223, @Yifffan
- **桌面端更新渠道切换**：在设置中新增正式版与开发版更新渠道的切换选项。贡献者：@winewill

**体验优化：**
- 代码审阅时的评论体验得到改善（具体详情因原文截断未完全展示）。

> 注：上述内容基于提供的 Release Notes 片段整理，完整变更列表请查阅上方发布链接。

## 3. 社区热点 Issues

过去 24 小时内，**Issues 更新数量为 0**，暂无新增或更新的 Issue 可供追踪。

社区成员可通过以下链接关注历史及最新讨论：
- [Issues 页面](https://github.com/deepseek-ai/deepseek-harness/issues)

## 4. 重要 PR 进展

过去 24 小时内，**Pull Requests 更新数量为 0**，暂无新增或合并的 PR 可供汇总。

社区成员可通过以下链接关注代码贡献进度：
- [Pull Requests 页面](https://github.com/deepseek-ai/deepseek-harness/pulls)

## 5. 功能需求趋势

基于本次 v0.2.2-rc.2 的发布内容，可推断社区及开发团队当前关注的功能方向包括：

| 趋势方向 | 体现 | 可能意义 |
|---------|------|---------|
| **代码审阅工作流集成** | Git Worktree 按分支/提交/文件类型审阅，GitHub 评审同步 | 提升 AI 辅助代码审阅在实际工程中的可用性与闭环能力 |
| **多 Agent 协作架构** | SubAgent 具名、多层协作，AgentTeam 共享会话与任务面板 | 朝向更复杂的任务分解与多模型协同演进 |
| **桌面端交付体验** | 正式版/开发版更新渠道切换 | 增强桌面客户端的版本管理与灰度发布能力 |
| **审阅交互体验** | 代码审阅评论体验优化 | 关注人机协作界面的细节打磨 |

## 6. 开发者关注点

从本次 Release 的改进侧面反映，开发者当前的高频关注点与潜在痛点包括：

1. **代码审阅效率**：开发者希望在不离开 Harness 环境的情况下，完成按分支、提交及文件类型的差异审阅，并与 GitHub 评审状态保持同步。
2. **复杂任务的 Agent 编排**：单 Agent 模式已难以满足多步骤、多角色协作需求，社区对具名 SubAgent 及共享任务面板的需求明显。
3. **桌面端版本控制**：对稳定版与开发版切换的需求表明，桌面端用户对版本可控性和更新频率有更细粒度的管理诉求。
4. **审阅交互流畅度**：代码审阅评论体验的优化说明，交互细节（如评论定位、进度同步）仍是用户体验的关键短板。

---

**数据来源：** [github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)  
**报告日期：** 2026-11-12

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期**: 2026-11-12  
**仓库**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

- 过去24小时内 Hermes 仓库**无新版本发布**，仅有 1 条 Issue 更新，集中在 CLI 更新机制的 systemd 单元重启缺陷。
- 社区活跃度集中在 **Plugin Catalog 生态扩展**与 **安全修复**两个方向，共 20 条被跟踪的 PR 中，包含多个 P1 级安全补丁及大量插件目录新增/更新。
- 安全专项（sec-marathon）持续推进，两个 P1 级安全 PR 分别针对 `/debug` 日志上传同意机制与内存上下文泄露问题，值得开发者高度关注。

---

## 2. 版本发布

过去24小时内**无新 Release 发布**。

---

## 3. 社区热点 Issues

过去24小时内仅有 **1 条 Issue** 更新，详情如下：

| # | 标题 | 状态 | 优先级 | 核心内容 | 链接 |
|---|------|------|--------|----------|------|
| #152200 | `hermes update` 从未重启 `hermes-gateway*`/`serve*`/`dashboard*` 以外的 Hermes 单元 | OPEN | P2 | 更新到 v0.23.0 后，命名不在扫描白名单内的 systemd 单元仍运行旧版代码，但 updater 报告成功，导致版本不一致。 | [查看详情](https://github.com/NousResearch/hermes-agent/issues/152200) |

> **说明**：数据源中过去24小时内仅该 1 条 Issue 有更新，故本期“社区热点 Issues”仅呈现该条目。该 Issue 暂无点赞与评论，但涉及更新可靠性，建议运维与部署团队跟进。

---

## 4. 重要 PR 进展

从近24小时更新的 20 条 PR 中，筛选出以下 10 条具有代表性的进展：

| # | 标题 | 状态 | 类型 | 核心内容 | 链接 |
|---|------|------|------|----------|------|
| #153698 | fix(debug): 要求显式同意后才上传 /debug 内容 | OPEN | 安全 (P1) | 修复 `/debug` 与 `POST /api/ops/debug-share` 直接上传日志到公共粘贴站的隐私问题，隐私通知将前置于粘贴操作。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/153698) |
| #153655 | fix(memory): 将回显的 memory-context 从已完成回复中隔离 | OPEN | 安全 (P1) | 修复模型可能回显注入的 `<memory-context>` 块，已完成回复中仅剥离 think-blocks，未经过 post-stream  scrub，可能导致记忆上下文泄露。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/153655) |
| #154157 | Fix/docker host path mapping | OPEN | Bug (P2) | 当 Hermes 网关本身运行在 Docker 容器内时，沙箱构建器生成的 bind-mount 源路径（skills/、凭证文件、缓存等）为容器内路径而非宿主机路径，需修正主机路径映射。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/154157) |
| #151763 | fix(telegram): 轮询波动期间被拒绝的回复在恢复后重发 | CLOSED | Bug (P2) | 修复 Telegram 连接短暂中断时回复被标记为失败且不再重试的问题，现轮询恢复后立即重发待发消息。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/151763) |
| #153100 | catalog: 更新 Prevent This Next Time 至 0.3.0 | CLOSED | Feature | 插件目录更新，新增 macOS/Linux 本地受保护配置文件支持，可在无 Telegram Bot 的情况下运行，通过 `pre_llm_call` 钩子处理原始用户消息。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/153100) |
| #153457 | feat(plugin-catalog): 添加 sql-dryrun | OPEN | Feature | 新增 `sql-dryrun` 插件，通过 `pre_tool_call` 钩子在执行 DELETE/UPDATE/DROP/TRUNCATE 前以只读 `SELECT COUNT(*)` 估算影响行数，并可升级为阻断操作。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/153457) |
| #153027 | plugin-catalog: 添加 ceo-pack v0.3.0 | CLOSED | Feature | Hermes 黑客松参赛插件，安装 CEO/CFO/COO/CTO 等高管级 Agent 团队，为企业提供 C-Suite 决策支持。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/153027) |
| #152918 | Add Look browser companion to plugin catalog | CLOSED | Feature | 面向 Apple Silicon macOS 的浏览器伴侣插件，支持在 Chrome 中指向内容并向 Hermes 提问，包含私有回答卡片、受保护的浏览器动作及可选本地语音/眼动追踪。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/152918) |
| #154034 | feat(plugin-catalog): 添加 chat-tree | OPEN | Feature | 新增 Hermes Desktop 侧边栏插件，将打开的聊天及其分支绘制为 Git 图，支持在任意已回答交叉点分支、合并及导出对话树。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/154034) |
| #153852 | plugin-catalog: 添加 TempleOS for Hermes v0.2.0 | OPEN | Feature | 新增 TempleOS 家族客户端插件，在本地 QEMU 中运行， pinned 至 v0.2.0 发布版本。 | [查看详情](https://github.com/NousResearch/hermes-agent/pull/153852) |

---

## 5. 功能需求趋势

从近期 Issues 与 PR 的标签与内容可提炼出以下社区关注方向：

1. **插件生态快速扩展（Plugin Catalog）**
   - 大量 PR 集中于 `comp/plugins` 与 `tool/mcp`，涵盖 SQL 安全干预（sql-dryrun）、高管决策团队（ceo-pack）、浏览器伴侣（Look）、对话树可视化（chat-tree）等垂直场景。
   - 社区倾向于通过插件目录而非核心代码扩展 Hermes 能力，插件审核与 pin 机制（ci-reviewed）日趋成熟。

2. **安全与隐私加固（Security / Privacy）**
   - `sec-marathon` 专项下出现多个 P1 级安全 PR，聚焦敏感数据（debug 日志、memory-context）的意外外泄与未经同意的上传。
   - 社区对数据主权与本地优先（local-only）操作的要求提升，如 Prevent This Next Time 支持无需 Telegram Bot 的本地受保护配置。

3. **跨平台与容器化部署稳定性**
   - Docker 主机路径映射（#154157）与 systemd 单元更新重启（#152200）反映出在容器化及系统服务场景下的部署痛点，运维友好性成为改进重点。

4. **即时通讯与多平台适配**
   - Telegram 轮询恢复机制（#151763）及平台标签（platform/telegram, platform/email, platform/desktop）显示多渠道消息网关的可靠性仍在持续优化中。

---

## 6. 开发者关注点

- **更新机制可靠性**：`hermes update` 对非网关/serve/dashboard 命名的 systemd 单元无法触发重启，可能导致生产环境运行旧版代码而无感知，建议运维团队在更新后手动核查相关单元版本。
- **敏感信息泄露风险**：两个 P1 安全 PR 指出 debug 日志与内存上下文可能在未经明确同意的情况下被外泄或回显，开发者在集成 Hermes 至对隐私敏感的环境前应评估相关补丁的适用性。
- **Docker 嵌套部署路径问题**：当 Hermes 网关自身容器化时，沙箱 bind-mount 路径解析存在宿主机/容器路径混淆，影响技能文件、凭证及缓存的正确挂载。
- **插件审核与版本锁定**：大量插件目录 PR 涉及版本 bump 与重新 pin，社区对插件供应链可追溯性（SHA pinning）与所有者提交规则（rule 5）的关注度较高。

---

*本日报基于 GitHub 仓库 NousResearch/hermes-agent 在 2026-11-11 至 2026-11-12 期间的公开 Issue 与 PR 数据生成，仅供社区参考。*

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-12)

## 今日速览

OpenClaw 社区今日活跃度较高，共 11 个 Issue 和 50 个 PR 更新，围绕 Windows 节点浏览器控制、macOS 后台服务权限、子代理生命周期以及 Cron 自动化限流等核心领域展开讨论。当前无新版本发布，社区重心集中在 P1/P2 级别的 Bug 修复与稳定性改进上。

## 版本发布

过去 24 小时内无新版本 Release。

## 社区热点 Issues

以下选取 10 个最具代表性的 Issue，按优先级与影响范围排序：

| # | 标题 | 状态/优先级 | 核心内容 | 关注点 | 链接 |
|---|------|-------------|----------|--------|------|
| #111019 | codex: clean `final:true` / `sessions_yield` close interrupts the turn | OPEN / P1 | Codex 终端动态工具结果导致 turn 被中断，错误写入 "user interrupted" 标记 | 影响会话状态一致性，diamond lobster 评级，需产品决策 | [查看](https://github.com/openclaw/openclaw/issues/111019) |
| #185092 | Windows node paired but browser control fails with listener ownership/authentication error | OPEN / P2 | Windows 节点显示已配对，但浏览器会话控制因监听器所有权/认证失败而不可靠 | 影响 UX，Windows 端核心功能缺陷 | [查看](https://github.com/openclaw/openclaw/issues/185092) |
| #196836 | Windows Node does not advertise computer.act despite Screen Capture being enabled | OPEN / P2 (回归) | 已启用屏幕捕获，但 Windows 节点不宣传 `computer.act` 能力 | 回归性 Bug，影响计算机使用类 Agent 功能 | [查看](https://github.com/openclaw/openclaw/issues/196836) |
| #197132 | Update failure: package-install (2026.10.10-beta.2) | OPEN / P2 | darwin/arm64 平台包安装更新失败 | 影响 macOS 用户升级路径 | [查看](https://github.com/openclaw/openclaw/issues/197132) |
| #192347 | tts.auto "inbound" answers a text-only reply to a voice note with a voice note | CLOSED / P2 | 文本回复语音消息时，TTS 自动模式错误合成语音回复 | 语音/文本交互逻辑缺陷，已修复 | [查看](https://github.com/openclaw/openclaw/issues/192347) |
| #197416 | Background skill review loops on context overflow when inherited context exceeds hydration cap | CLOSED / P2 | 后台技能评审因继承上下文超过水合上限而循环 | 后台任务稳定性问题，已修复 | [查看](https://github.com/openclaw/openclaw/issues/197416) |
| #197304 | HTML session export loses visible ancestry for parentless legacy rows | CLOSED / P2 | 旧版转录中缺少 parentId 的行，HTML 导出丢失可见祖先关系 | 会话导出数据完整性问题，已修复 | [查看](https://github.com/openclaw/openclaw/issues/197304) |
| #197414 | 2026.11.2 rejects gateway.controlUi.experimental.templates and skips reload | CLOSED / P2 | 新版本将 `gateway.controlUi.experimental.templates: true` 视为无效键，导致热重载跳过 | 配置兼容性回归，已修复 | [查看](https://github.com/openclaw/openclaw/issues/197414) |
| #184709 | Support keyterm prompting in ElevenLabs batch transcription | OPEN / P3 | 希望在 ElevenLabs 批量转录中支持显式关键词/术语表 | 语音转录功能增强需求 | [查看](https://github.com/openclaw/openclaw/issues/184709) |
| #197417 | New Session: make project sources discoverable with explicit remote search | OPEN / P3 | 新建会话项目选择器缺乏本地/远程项目统一发现入口 | 用户体验摩擦，产品决策待定 | [查看](https://github.com/openclaw/openclaw/issues/197417) |

**社区反应摘要**：今日新增 Issue 多为 2026-11-11 创建并当日更新，反映社区对新版本（2026.11.x）的快速反馈。P1 级 Issue #111019 虽然创建较早，但持续获得关注（4 条评论，2 个赞），说明会话状态中断是长期痛点。

## 重要 PR 进展

选取 10 个具有代表性的 PR，涵盖修复、功能与性能优化：

| # | 标题 | 状态/优先级 | 功能或修复内容 | 链接 |
|---|------|-------------|----------------|------|
| #197420 | fix(gateway): surface refused service management on preserved-definition restart | OPEN / P2 | 当网关服务管理被拒绝时，`gateway restart --preserve-definition` 仅输出模糊失败信息，本 PR 改进错误提示，覆盖非默认状态目录、外部监督模式等场景 | [查看](https://github.com/openclaw/openclaw/pull/197420) |
| #195408 | feat(control-ui): inspect people and role permission limits | OPEN / P2 | 在 Control UI 新增只读 **People** 与 **Roles** 视图，支持查看权限上限 | [查看](https://github.com/openclaw/openclaw/pull/195408) |
| #195800 | fix(ios): VoiceOver finds an unnamed chat message editor | OPEN / P2 | 修复 iOS 聊天编辑器缺乏可访问性名称的问题，改进 VoiceOver 体验 | [查看](https://github.com/openclaw/openclaw/pull/195800) |
| #197421 | feat(macos): one OpenClaw ID approval sets up the Mac's node, chat and dashboard | OPEN / XL | 简化 Mac 端一次 OpenClaw ID 审批后即可完成节点、聊天与面板全套设置，消除重复审批与死路按钮 | [查看](https://github.com/openclaw/openclaw/pull/197421) |
| #197415 | fix: show why steering falls back to queued input | CLOSED / P2 | 增强转向降级日志，区分运行时是立即拒绝输入还是在转录截止后撤回已接受输入 | [查看](https://github.com/openclaw/openclaw/pull/197415) |
| #197301 | perf(worktrees): prewarm templates when main advances | OPEN / P2 | 在 `origin/main` 推进时预热托管与沙箱模板，避免新会话启动时阻塞前台工作 | [查看](https://github.com/openclaw/openclaw/pull/197301) |
| #197323 | fix(subagents): suspended descendants no longer hold a completion | OPEN / P1 | 修复子代理会话结束时子任务仍在运行导致完成状态悬而未决的问题，避免 7 天滞留 | [查看](https://github.com/openclaw/openclaw/pull/197323) |
| #197393 | fix(macos): app resends a rejected gateway token until auth rate limit locks it out | OPEN / P1 | 修复 macOS 应用在首次连接或新网关地址时重复发送被拒绝的共享网关令牌，导致触发认证限流 | [查看](https://github.com/openclaw/openclaw/pull/197393) |
| #197391 | fix(knowledge): scribes keep stale run messages and history after an update | OPEN / P2 | 修复知识文档员在更新后仍运行旧版运行消息与增长的对话历史，导致错过新行为 | [查看](https://github.com/openclaw/openclaw/pull/197391) |
| #197099 | fix(cron): avoid delaying condition checks when capacity frees up | OPEN / P1 | 修复 Cron 条件检查在容量释放时仍被延迟，避免多个自动化任务同时到期时检查间隔被拉长至一小时以上 | [查看](https://github.com/openclaw/openclaw/pull/197099) |

## 功能需求趋势

从今日 Issues 与 PR 中提炼出的社区关注方向：

1. **跨平台节点稳定性（Windows/macOS）**：Windows 节点浏览器控制、屏幕捕获能力宣传、macOS 后台服务 GUI 访问限制等问题集中出现，说明桌面端 Agent 能力是当前社区的核心关注点。
2. **会话与子代理生命周期管理**：多个 PR 与 Issue 涉及子代理完成状态、会话中断标记、上下文水合上限等，反映开发者希望提升多代理协作的可靠性与状态一致性。
3. **可访问性与无障碍体验**：iOS VoiceOver 修复、Control UI 权限查看等需求表明社区开始重视产品级可用性与管理员可见性。
4. **自动化与 Cron 调度优化**：多个 Cron 相关 PR 聚焦于限流、降级策略与跨提供商回退，显示社区对定时任务稳定性与资源调度的要求提升。
5. **配置兼容性与升级体验**：`gateway.controlUi.experimental.templates` 被新版拒绝、包安装更新失败等问题，提示社区对平滑升级与配置向后兼容性的敏感度较高。

## 开发者关注点

- **错误信息不透明**：如 #197420 所述，网关服务管理拒绝时仅输出 "The CLI command failed."，缺乏具体原因，调试困难。
- **认证与令牌重试机制**：macOS 应用重复发送被拒绝令牌导致限流锁定（#197393），反映认证流程缺乏退避与状态感知。
- **后台服务权限边界**：macOS launchd 代理无法调用 `exec(open)` 打开 Finder（#197418），暴露后台服务与 GUI 会话隔离的痛点。
- **自动化任务资源争用**：Cron 自动化在高并发到期时检查被延迟（#197099），开发者期望更细粒度的运行槽与退避策略。
- **产品决策阻塞**：多个 P3 功能 Issue（如 #197417、#197418）标记 `needs-product-decision`，说明部分需求已进入等待产品层面裁决的阶段，社区期待更明确的路线图反馈。

:::
