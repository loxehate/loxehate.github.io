---
title: "AI CLI 工具社区动态日报"
published: 2026-11-20
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-20

> 生成时间: 2026-11-20 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-20)

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单轮对话”向“多代理协作与跨平台工作空间”演进的关键期。主流工具普遍在强化 Auto Mode 自动化能力、MCP 生态集成及跨端会话同步，同时面临 Windows 桌面端稳定性、长会话内存泄漏及安全误报等共性挑战。版本发布呈现“预览版/Canary 为主、稳定版为辅”的节奏，说明各厂商仍在快速迭代核心架构，生产环境可用性尚待进一步验证。安全治理（Guardian/Safeguard）与开发效率之间的张力成为社区反馈的高频焦点。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 近24h Issues 数 | 近24h PR 数 | 近24h Release | 核心版本状态 |
|------|------|----------------|------------|--------------|-------------|
| Claude Code | anthropics/claude-code | 10+（精选） | 1 | v2.1.328 / v2.1.329 | 稳定版 |
| OpenAI Codex | openai/codex | 10+（精选） | 10+（精选） | rust-v0.172.0-alpha.2 / v0.171.0-alpha.13.1 | Alpha |
| Gemini CLI | google-gemini/gemini-cli | 10+（精选） | 10+（精选） | v0.71.0-preview.0 | Preview |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 0 | 0 | 无 | 无活动 |
| OpenCode | anomalyco/opencode | 9 | 50 | 无 | 无新版本 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 无活动 |
| Hermes | NousResearch/hermes-agent | 13 | 10+（精选） | v0.23.2+canary.20261119 | Canary |
| OpenClaw | openclaw/openclaw | 10+（精选） | 10+（精选） | v2026.11.10-beta.1 / v2026.11.6 | Beta |

**活跃度梯队：**
- **第一梯队（高活跃）**：OpenCode（PR 变更达 50 个）、Claude Code（连续发布 2 个稳定版）、Gemini CLI（P1 级 Bug 密集、版本迭代频繁）
- **第二梯队（中活跃）**：OpenAI Codex（自动化 PR 为主、Alpha 版本迭代）、Hermes（Canary 版本、跨平台适配器讨论活跃）、OpenClaw（Beta 版本、P0 级升级缺陷引发关注）
- **第三梯队（低活跃/停滞）**：DeepSeek Reasonix、Deepseek Harness（过去 24 小时无任何活动）

## 3. 共同关注的功能方向

多个工具社区在以下四个方向上存在高度重叠的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **跨端工作空间与上下文连续性** | OpenAI Codex、Claude Code | ChatGPT + Work + Codex 连续工程工作空间；移动端与桌面端会话漫游；项目上下文双向交接 |
| **MCP 生态与代理治理** | OpenAI Codex、Hermes、OpenCode | MCP 客户端采样支持；`tools/list_changed` 动态工具发现；Guardian 策略刷新与 V2 评分；ACP 会话管理 |
| **长会话稳定性与内存管理** | Gemini CLI、Claude Code | 20 小时超长会话 OOM 崩溃；子代理状态误报；上下文压缩手动触发权限 |
| **桌面端/跨平台稳定性** | OpenAI Codex、Claude Code、Gemini CLI、OpenCode | Windows MSIX 更新锁死；macOS 窗口卡死；Windows 路径解析与 PowerShell UI 冻结；跨平台一致性差 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 企业级 Auto Mode、多云模型网关（Bedrock/GCP/Foundry）、Hooks 安全策略 | 企业开发团队、云原生开发者 | 原生 TUI 为主，桌面端扩展，强调托管设置与安全审计 |
| **OpenAI Codex** | 跨端工程工作空间、MCP 治理、会话预算与成本可见性 | 个人开发者、AI 原生应用构建者 | Rust 端 Alpha，TUI + 桌面端双轨，侧重 Guardian 策略与 App Server 架构 |
| **Gemini CLI** | 子代理（Subagent）协作、AST 感知代码读取、长会话内存优化 | 代码库探索者、重度 CLI 用户 | Node/TS 生态，夜间构建频繁，侧重本地代码理解与 Token 效率 |
| **OpenCode** | 跨机器分布式执行（machines）、交互式 PTY 终端、SQLite 会话并发 | 高级开发者、CI/CD 自动化场景 | 插件化架构，强调多机器路径与持久交互终端，社区 PR 密度最高 |
| **Hermes** | 即时通讯适配器（Teams/Telegram/BlueBubbles）、多配置文件、状态数据库维护 | 协作型团队、跨平台消息集成用户 | Electron 桌面端，Canary 发布，侧重多账号凭证池与即时通讯桥接 |
| **OpenClaw** | Agent 模板一键安装（ClawHub）、对话恢复、Worker 失败诊断 | 插件开发者、Agent 工作流构建者 | Beta 阶段，侧重 Agent 模板化与工作空间升级可靠性 |

## 5. 社区热度与成熟度

- **最活跃社区**：OpenCode。单日 50 个 PR 变更和 9 个 Issue 更新，社区贡献密度远超其他工具，功能迭代聚焦于核心基础设施（会话存储、跨机器执行、MCP 集成）。
- **快速迭代阶段**：Claude Code（连续发布两个稳定版本，修复 Auto Mode 和 Hooks 安全）、Gemini CLI（Preview 版本快速跟进 P1 Bug 修复）、OpenClaw（Beta 版本修复 P0 升级缺陷）。
- **成熟度偏低/停滞**：DeepSeek Reasonix 和 Deepseek Harness 过去 24 小时无任何社区活动，可能处于维护期或开发空窗期，需关注其长期维护状态。
- **预览/Canary 为主**：OpenAI Codex（Alpha）、Gemini CLI（Preview）、Hermes（Canary）、OpenClaw（Beta），说明大多数工具尚未进入完全稳定的生产发布节奏。

## 6. 值得关注的趋势信号

### 6.1 从“单模型对话”转向“多代理编排”
Claude Code 的 Auto Mode、Gemini CLI 的 Subagent 可靠性问题、OpenClaw 的子代理跨重启存活，均表明社区正在将 AI CLI 用作多代理工作流的编排层，而非简单的代码助手。开发者应关注子代理状态一致性、任务恢复能力及上下文隔离机制。

### 6.2 MCP 成为标准集成接口
OpenAI Codex、OpenCode 和 Hermes 均出现了 MCP 相关的 Issue 和 PR（客户端采样、动态工具发现、ACP 能力声明）。MCP 正在从“可选插件”演变为 AI CLI 的标准通信层，建议开发者在选型时评估工具对 MCP 协议的成熟度。

### 6.3 安全治理与开发效率的矛盾凸显
Claude Code 的 Safeguard 误报（固件开发、代码审计场景）、OpenCode 的 PowerShell 权限提示被跳过、Gemini CLI 的破坏性命令拦截需求，均反映出安全拦截机制与合法开发行为之间的张力。未来能够提供透明误报申诉、细粒度白名单和上下文感知安全策略的工具将更具竞争力。

### 6.4 Windows 桌面端成为稳定性短板
OpenAI Codex（MSIX 更新锁死）、Claude Code（Windows 交互异常、静默脏写）、OpenCode（Git 插件安装卡死、PowerShell 权限提示缺失）均集中暴露 Windows 平台问题。跨平台一致性仍是 AI CLI 工具从“开发者玩具”迈向“企业级工具”的关键门槛。

### 6.5 长时间运行任务的可控性成为刚需
OpenCode 的交互式 PTY 工具需求、Gemini CLI 的长会话 OOM 崩溃、OpenAI Codex 的会话预算与成本可见性，都指向同一个趋势：AI CLI 正在承担长时间运行的自动化任务（CI/CD、数据管道、渗透测试），对会话恢复、资源限制和成本追踪的要求正在快速提升。

---

**决策建议**：若团队需要企业级多云模型网关和安全审计，Claude Code 是当前最成熟的选择；若侧重跨端工程协作和 MCP 治理，OpenAI Codex 和 OpenCode 值得重点跟踪；若主要场景是本地代码库探索与 AST 感知，Gemini CLI 的迭代速度较快；DeepSeek 系列工具因近期无活动，建议在生产选型前进一步确认维护状态。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-20）

## 1. 热门 Skills 排行

基于 PR 更新频率与社区讨论持续度，以下为关注度最高的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简介 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 `fix(mcp-builder)` | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入路径变更及自定义 HTTP 头配置问题 | MCP 协议版本迁移导致现有技能失效，社区急需兼容性修复 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 `fix(skill-creator)` | 隔离触发器评估（trigger evals），修复 Windows 子进程管道兼容性及运行时失败误判 | 技能创建工具链稳定性，跨平台（Windows）支持与触发率准确性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 `Add notion-spec-to-implementation...` | 新增 Notion 规格转实现技能与定量简历审计技能 | 产品规格到代码任务的自动化拆解，企业文档工作流集成 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1980 `webapp-testing` | 移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用测试技能的安全加固，供应链安全关注度提升 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 `fix(docx)` | LibreOffice 超时改为报错，并验证输出 DOCX 无修订痕迹 | 文档自动化处理的可靠性与错误处理，企业级 DOCX 流程 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 `proofcore-contract-auditor` | Web3 智能合约静态分析技能，支持 Solidity/Rust，审计证明锚定至 TON 区块链 | 区块链/智能合约安全审计，零知识证明与链上存证 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 7 | #525 `Add pyxel skill` | 复古游戏开发技能，支持 Pyxel 游戏实现、头less 运行、帧检测与状态验证 | 游戏开发垂直领域，社区存活周期最长的技能 PR 之一（持续更新至 11 月） | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| 8 | #2019 `fix(xlsx)` | 修复工作表级定义名称与外部链接别名解析，消除误报 | 电子表格自动化与外部链接风险检测，财务/数据类技能完善 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/2019) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并至主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进诉求如下：

1. **工作流自动化与文档工程**
   - `notion-spec-to-implementation`：将产品/技术规格自动拆解为可执行的 Notion 任务与验收标准（Issue #1245 关联）。
   - `compact-memory`：面向长周期 Agent 的符号化紧凑状态记忆，降低上下文开销（Issue #1329）。
   - `agent-governance`：AI Agent 系统的安全策略、威胁检测、信任评分与审计追踪（Issue #412）。

2. **代码审查与安全审计**
   - `proofcore-contract-auditor`：智能合约静态分析与链上存证（PR #1771）。
   - `webapp-testing` 安全加固：消除 `shell=True` 命令注入风险（PR #1980）。
   - `xlsx` 外部链接风险检测：防止电子表格中的隐蔽外部引用（PR #2019）。

3. **测试生成与技能评估工具链**
   - `skill-creator` / `run_eval.py`：触发器评估隔离、并行 worker UUID 交叉匹配误报、YAML frontmatter 标量解析等（Issue #556、#1352、PR #1298、#1997）。
   - 社区普遍反映技能触发率为 0% 或误报，急需完善评估与调试能力。

4. **多模态与内容生成**
   - `md2video-audio`：Markdown 直接编译为带人声旁白的 MP4 视频（PR #1703）。
   - `pyxel`：复古游戏开发全流程支持（PR #525）。
   - `document-typography`：AI 生成文档的排版质量控制（孤行、寡行、编号对齐等）（PR #514）。

5. **组织协作与信任边界**
   - 组织内技能共享：避免手动通过 Slack/Teams 传递 `.skill` 文件（Issue #228）。
   - 社区技能信任边界：防止非官方技能冒充 `anthropic/` 命名空间，导致权限滥用（Issue #492，评论数最高达 46 条）。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且对齐社区核心痛点，可能近期落地：

- **#1742 `fix(mcp-builder)`** — MCP 2.0 兼容性是当前技能生态的基础设施级问题，修复后将直接影响所有依赖 MCP 的技能可用性。
- **#1298 `fix(skill-creator)`** — 触发器评估与跨平台稳定性是技能创作者的核心工具链，合并后将显著提升社区自建技能的质量。
- **#1980 `webapp-testing`** — 命令注入安全修复具有高优先级，符合企业对 AI 工具安全合规的要求。
- **#1771 `proofcore-contract-auditor`** — Web3 审计是差异化垂直领域，若合并将丰富技能仓库在区块链安全方向的覆盖。
- **#1245 `notion-spec-to-implementation`** — 企业文档到代码的自动化转换是高频业务场景，社区需求明确。

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建安全、可信、可评估的技能基础设施（MCP 兼容、触发器准确性、命令注入防护），并在此基础上扩展企业文档自动化、智能合约审计及多模态内容生成等垂直能力。**

---

# Claude Code 社区动态日报 (2026-11-20)

## 今日速览

Claude Code 近 24 小时发布了 v2.1.328 和 v2.1.329 两个版本，重点引入了 Amazon Bedrock、Google Cloud Agent Platform 及 Microsoft Foundry 的 Auto Mode，并加强了 Hooks 的安全提示与失败处理机制。社区方面，Windows 桌面端交互异常、配置文件静默覆盖导致的数据丢失、以及移动端认证问题成为开发者关注的焦点；安全误报（Safeguard false positive）相关 Issue 仍呈高频闭合状态。

---

## 版本发布

### v2.1.329
- 新增 **trust dialog 警告**，明确告知文件夹的 Hooks 声明位置，提升配置透明度。
- 在 Claude Desktop 及其他非交互式主机中，当托管设置（managed settings）中的 Hooks 加载失败时，会在对话中显示警告。
- 新增本次会话的定时任务（scheduled tasks）、`/loop` 唤醒以及目标（goal）等信息的展示。

### v2.1.328
- 为 **Claude Opus 4.6 和 Sonnet 4.6** 在 Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry 及 Claude Apps Gateway 上启用 **Auto Mode**；无权限模式的交互式会话默认进入该模式。
- 为 `mcp_tool` Hooks 新增 `"onFailure": "block"` 选项，行为与 command 和 HTTP Hooks 一致。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 关注理由 | 链接 |
|---|------|------|---------|----------|------|
| #102132 | Desktop Code tab: next-step box 可在回复写入前结束 turn | OPEN | 23 / 28 | Windows 桌面端核心交互 Bug，`wrap_up` 携带 `ask` 时 turn 过早结束，直接影响人机协作流程，社区关注度最高。 | [查看](https://github.com/anthropics/claude-code/issues/102132) |
| #93482 | Cowork: device_commit_files 覆盖后磁盘内容滞后一个 commit | OPEN | 27 / 2 | 涉及 **数据丢失**，Windows 平台下“静默脏写”可能导致开发者误以为文件已保存，严重性高。 | [查看](https://github.com/anthropics/claude-code/issues/93482) |
| #105770 | Android 根机/解锁 Bootloader 设备签名失败 (HTTP 400) | OPEN | 18 / 16 | 移动端认证在特定设备环境下受 Play Integrity 限制，影响部分高级用户和开发者设备的使用。 | [查看](https://github.com/anthropics/claude-code/issues/105770) |
| #110657 | 不可读的 .claude.json 被静默替换，root 运行后设置全丢 | OPEN | 5 / 1 | Linux 平台配置文件权限问题导致配置丢失，属于数据安全类问题，需尽快修复。 | [查看](https://github.com/anthropics/claude-code/issues/110657) |
| #111255 | 桌面端 compact context 按钮随 token 阈值动态隐藏 | OPEN | 1 / 0 | macOS 新创建 Issue，用户希望可随时手动触发上下文压缩，而非受阈值限制，反映对上下文管理控制权的需求。 | [查看](https://github.com/anthropics/claude-code/issues/111255) |
| #111244 | Desktop mod pane 无法关闭，Tab 组误标为 "Plugin" | OPEN | 1 / 0 | macOS 桌面端 UI 缺陷，术语不一致（mod vs plugin）且无法关闭单 pane，影响多窗口工作流。 | [查看](https://github.com/anthropics/claude-code/issues/111244) |
| #104769 | 受信任设备模式下 Remote Control 每隔数小时掉线 (HTTP 403) | OPEN | 1 / 0 | macOS 桌面端远程控制凭证重新铸造失败，影响长连接稳定性，与企业级受信设备策略相关。 | [查看](https://github.com/anthropics/claude-code/issues/104769) |
| #102723 | macOS Code tab 问答表单和权限卡固定宽度 ~480px | OPEN | 1 / 1 | 高分辨率显示器下 UI 布局异常，影响超宽屏用户体验。 | [查看](https://github.com/anthropics/claude-code/issues/102723) |
| #87973 | 请求完全禁用 "accept edits" 选项 | OPEN | 1 / 1 | 权限控制类功能需求，部分团队希望在自动化流程中彻底关闭编辑接受确认。 | [查看](https://github.com/anthropics/claude-code/issues/87973) |
| #109250 | iOS Simulator 点击坐标偏移 (0.96x) | OPEN | 1 / 0 | macOS/iOS 模拟器工具精度问题，影响移动端自动化测试场景。 | [查看](https://github.com/anthropics/claude-code/issues/109250) |

> 注：近期大量 `#941xx` 系列 Issue 均为 CLOSED 状态的 **Safeguard 安全误报（false positive）**，涉及 Linux 平台下固件开发、代码审计、UI 布局等场景，虽然已关闭，但反映出安全过滤器对合法开发行为的拦截仍是社区高频反馈点。

---

## 重要 PR 进展（近 24 小时）

近 24 小时内仓库仅有 **1 条** 更新的 Pull Request：

- **#111198**: Don't run @claude mentions on pull requests from forks  
  防止从 Fork 仓库发起的 PR 上 `@claude` 提及被执行，降低供应链安全风险，避免未受信任代码触发 Claude 自动化操作。  
  作者：@mhegazy | 状态：OPEN | [查看](https://github.com/anthropics/claude-code/pull/111198)

---

## 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

1. **桌面端 IDE 体验优化**：Windows/macOS Code tab 的交互稳定性、UI 自适应布局（如固定宽度卡片、mod pane 管理）成为高频反馈。
2. **权限与自动化控制**：开发者希望获得更细粒度的权限策略，例如完全禁用 "accept edits"、Auto Mode 的默认行为配置等。
3. **移动端与模拟器支持**：Android 签名兼容性、iOS Simulator 坐标精度等跨平台工具链问题亟待解决。
4. **上下文管理主动权**：用户希望能手动触发上下文压缩（compact context），而不受 token 阈值自动隐藏限制。
5. **安全误报与误拦截**：Safeguard 机制对嵌入式固件、代码审计等合法开发场景的误报较多，社区期望更透明的误报申诉与白名单机制。

---

## 开发者关注点（痛点总结）

- **数据安全风险**：配置文件静默覆盖（`.claude.json`）、Cowork 文件写入滞后等 Bug 可能导致代码或设置丢失，是开发者最敏感的痛点。
- **跨平台一致性差**：Windows、macOS、Linux 以及 Android/iOS 端在 Hooks 行为、UI 渲染、认证流程上存在明显差异。
- **安全机制与开发效率的冲突**：Safeguard 误报导致会话中断（session-halted），尤其在固件开发、渗透测试等场景下频繁触发，影响授权工作的连续性。
- **长连接稳定性**：桌面端 Remote Control 在受信任设备策略下周期性掉线，影响远程开发场景的可用性。

---

*本日报基于 github.com/anthropics/claude-code 近 24 小时的 Release、Issue 和 PR 数据生成，仅供技术参考。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期：** 2026-11-20  
**数据来源：** github.com/openai/codex

---

## 1. 今日速览

过去24小时，Codex 社区围绕**跨平台会话同步**、**桌面端稳定性**以及 **MCP/Guardian 治理能力**展开密集讨论。Rust 端连续发布两个 Alpha 版本（v0.172.0-alpha.2、v0.171.0-alpha.13.1），而 GitHub Issues 侧则涌现大量关于 Windows/MSIX 更新失效、macOS 窗口卡死、远程控制连接中断等客户端 Bug。功能请求方面，社区持续呼吁构建“ChatGPT + Work + Codex”的连续工程工作空间，并强化对长时间运行任务的暂停/恢复与成本可见性支持。

---

## 2. 版本发布

| 版本 | 发布时间 | 备注 |
|------|---------|------|
| `rust-v0.172.0-alpha.2` | 2026-11-19 | Rust 端 Alpha 迭代，具体变更未在发布说明中详述 |
| `rust-v0.171.0-alpha.13.1` | 2026-11-19 | Rust 端 Alpha 补丁版本 |

> 注：以上为过去24小时内的最新 Release，均为预发布版本，建议生产环境谨慎升级。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 评论/👍 | 核心内容与社区关注点 | 链接 |
|---|------|---------|---------------------|------|
| #61348 | Feature request: make ChatGPT + Work + Codex a continuous engineering workspace | 38 / 0 | 提出将 ChatGPT、Work 与 Codex 打造为“连续工程工作空间”而非一次性任务，强调来源可追溯与评审机制，是社区讨论最活跃的功能愿景。 | [查看](https://github.com/openai/codex/issues/61348) |
| #62212 | Codex desktop: unsupported audio tool output causes later text-only turns to return HTTP 400 | 28 / 4 | macOS 桌面端（v26.1111.21308）在处理不支持的音频工具输出后，后续纯文本对话返回 HTTP 400，影响多模态会话稳定性。 | [查看](https://github.com/openai/codex/issues/62212) |
| #25770 | Windows Store Codex repeatedly fails to update because old MSIX package remains locked/in use | 25 / 5 | Windows 商店版因旧 MSIX 包被占用导致更新反复失败，长期未解决，影响大量 Windows 用户。 | [查看](https://github.com/openai/codex/issues/25770) |
| #32519 | ChatGPT–Codex shared project context and bidirectional task handoff | 12 / 1 | 请求在移动端 ChatGPT 与桌面端 Codex 之间实现项目上下文共享与双向任务交接，体现社区对跨端工作流的强烈需求。 | [查看](https://github.com/openai/codex/issues/32519) |
| #30417 | ChatGPT mobile incorrectly blocks Codex Cloud when Remote Control is disabled | 10 / 6 | 移动端错误地将整个 Codex 移动端功能锁定在“远程控制”权限后，尽管 Codex Cloud 在 Web/Slack 上可正常使用。 | [查看](https://github.com/openai/codex/issues/30417) |
| #37550 | macOS desktop: primary window stuck on loading screen while tasks continue | 10 / 0 | macOS 桌面端主窗口卡在加载界面，后台任务仍在运行；新建窗口可恢复但浏览器状态丢失，影响体验。 | [查看](https://github.com/openai/codex/issues/37550) |
| #4929 | Feature Request: Add MCP Client Sampling Support to Codex | 9 / 7 | 请求 Codex CLI 支持 MCP 客户端采样（Client Sampling），使 MCP 服务器能通过 CLI 调用 AI 模型，已关闭但社区关注度高。 | [查看](https://github.com/openai/codex/issues/4929) |
| #60941 | Windows-created ChatGPT chats missing from web and iPhone | 8 / 0 | Windows 端创建的 ChatGPT 对话在 Web 和 iPhone 上不可见，存在跨端同步缺失问题。 | [查看](https://github.com/openai/codex/issues/60941) |
| #45735 | ChatGPT project visible on web but missing from Windows desktop app Projects sidebar | 7 / 0 | 项目在 Web 端可见，但 Windows 桌面端 Projects 侧边栏显示“无项目”，账号数据与侧边栏显示不一致。 | [查看](https://github.com/openai/codex/issues/45735) |
| #53738 | Codex extension fails to start after VS Code update when connected to WSL | 7 / 0 | VS Code 更新后，连接 WSL 时 Codex 扩展无法启动，影响跨平台开发场景下的 IDE 集成稳定性。 | [查看](https://github.com/openai/codex/issues/53738) |

---

## 4. 重要 PR 进展（精选 10 条）

近24小时内合并的 PR 多由 `copyberry[bot]` 自动化提交，集中在 **Guardian 策略刷新、会话预算控制、App Server 通信优化、TUI 体验改进** 等底层基础设施领域：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #62624 | Share slash command argument range mapping in the TUI | CLOSED | 在聊天作曲器与斜杠命令分发之间共享 `slash_args_elements`，将文本元素字节范围转换为相对于命令参数的偏移量。 | [查看](https://github.com/openai/codex/pull/62624) |
| #30963 | Validate approval responses against pending authority | OPEN | 修复审批响应仅按字符串 ID 匹配的安全问题，防止 exec 响应错误消耗补丁等待器，强化审批边界校验。 | [查看](https://github.com/openai/codex/pull/30963) |
| #62621 | Handle rollout budget decisions in each accounting path | CLOSED | 将 `SamplingUsage` 传入数值用量会计路径，主机端用尽停止新工作，轮次端用尽返回 `SessionBudgetExceeded`。 | [查看](https://github.com/openai/codex/pull/62621) |
| #62615 | Split in-memory execution policy rules into a separate crate | CLOSED | 将执行策略构建、规则验证与评估拆分至独立 crate `codex-execpolicy`，解耦 Starlark 解析器依赖。 | [查看](https://github.com/openai/codex/pull/62615) |
| #62614 | Refresh Guardian policy on config reload and account changes | CLOSED | 配置重载、登录/登出后刷新 Guardian 策略，确保运行中的线程及时采纳新的审批要求。 | [查看](https://github.com/openai/codex/pull/62614) |
| #62609 | Apply backpressure to app-server request replay on thread resume | CLOSED | 线程恢复时对 App Server 请求重放施加背压，避免客户端读取缓慢时出队列填满或线程监听器阻塞。 | [查看](https://github.com/openai/codex/pull/62609) |
| #62607 | Enable Guardian V2 scoring with an explicit Guardian provider | CLOSED | 修复显式 Guardian 提供商配置会禁用 Guardian V2 评分的问题，支持自动审计使用后台评分。 | [查看](https://github.com/openai/codex/pull/62607) |
| #62604 | Expose current turn admission state on `CodexThread` | CLOSED | 新增 `turn_admission_state()` 接口，区分轮次处于 `Idle`、`Pending` 还是已获准执行的状态。 | [查看](https://github.com/openai/codex/pull/62604) |
| #62601 | Retry transient exec-server connection failures | CLOSED | 对 exec-server 瞬时连接失败进行重试，避免传输在初始化响应前关闭时误报就绪失败。 | [查看](https://github.com/openai/codex/pull/62601) |
| #62599 | Stream app-server `fs/readFile` responses over stdio | CLOSED | 大文件读取不再先分配 base64 字符串和完整 JSON，而是直接将字节流编码到 stdout，降低内存占用。 | [查看](https://github.com/openai/codex/pull/62599) |

---

## 5. 功能需求趋势

从 Issues 与 PR 中提炼出社区当前最关注的四个功能方向：

1. **跨端工作空间与上下文连续性**  
   社区反复呼吁在 ChatGPT（移动端/Web）与 Codex（桌面端/CLI）之间实现项目上下文共享、双向任务交接及会话漫游（#61348、#32519、#60941）。

2. **长时间运行任务的可控性与成本可见性**  
   需求包括事件驱动的休眠/自动恢复（#62611）、每 LLM 请求的 Token 用量与会话成本日志（#33189）、会话预算控制（#62621），适用于 CI/CD 与多代理工作流。

3. **MCP 与代理治理能力增强**  
   社区希望 Codex 更深度集成 MCP（客户端采样支持 #4929），并加强 Guardian 策略刷新、V2 评分、主机端推理提供商选择等治理机制（#62614、#62607、#62588）。

4. **桌面端与 IDE 集成稳定性**  
   Windows MSIX 更新锁死（#25770）、WSL 下 VS Code 扩展启动失败（#53738）、macOS 窗口卡死（#37550）等客户端问题成为高频痛点。

---

## 6. 开发者关注点

**高频痛点：**
- **Windows 平台更新与锁定问题**：MSIX 包被占用导致更新失败（#25770）、MSIX 更新打断活跃构建并关闭由 Codex 启动的桌面应用（#62605）。
- **跨端会话同步缺失**：Windows 创建的对话在 Web/iPhone 不可见（#60941）、项目在 Web 可见但 Windows 侧边栏缺失（#45735）。
- **桌面端崩溃与卡顿**：macOS 主窗口加载卡死（#37550）、大型会话存储导致 SQLite 状态回填超时引发启动崩溃循环（#41614）、Linux 全屏内置浏览

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-20)

## 1. 今日速览

Gemini CLI 近期持续发布预览版与夜间构建，最新版本 **v0.71.0-preview.0** 已上线，社区围绕 **子代理（Subagent）稳定性、长会话内存管理及 AST 感知代码读取** 展开密集讨论。多个 P1 级 Bug 仍未修复，其中通用代理挂起、子代理状态误报及长时间会话 OOM 崩溃成为开发者最关注的痛点。

## 2. 版本发布

| 版本 | 发布时间 | 核心更新 |
|------|---------|---------|
| **v0.71.0-preview.0** | 2026-11-19 | 夜间构建版本，包含自动化 Changelog 与版本号 bump；具体功能变更以后续完整 Release Notes 为准。 |
| **v0.70.0** | 2026-11-10 | 稳定版发布，包含 v0.68.0 与 v0.69.0-preview.0 的累积变更。 |
| **v0.69.0** | 2026-11-10 | - `fix(core,cli)`: 修复模板占位符替换过程中字面量 `$` 字符被错误处理的问题 (@jesussamuel-byte)<br>- `feat(cli)`: 新增 `/stats heatmap` 子命令，用于查看每日 Token 使用热力图 (@jvargassanchez-dot) |

> 相关 PR: [#30378](https://github.com/google-gemini/gemini-cli/pull/30378)、[#30380](https://github.com/google-gemini/gemini-cli/pull/30380)、[#30361](https://github.com/google-gemini/gemini-cli/pull/30361)、[#30365](https://github.com/google-gemini/gemini-cli/pull/30365)

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 评论/👍 | 关注理由 |
|---|------|------------|---------|---------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS is reported as GOAL success | P1 / Bug | 13 / 2 | 子代理在达到最大轮次限制后仍上报 `status: "success"`，掩盖了任务中断，直接影响代理可靠性。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 / Bug | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，用户需手动取消，严重影响可用性。 |
| [#30352](https://github.com/google-gemini/gemini-cli/issues/30352) | [Crash]: OOM after long-running session (~182.4M tokens, 20h uptime) | need-triage | 3 / 0 | 长时间会话（20 小时、1.82 亿 Token）后触发 V8 堆内存溢出导致崩溃，暴露长会话内存泄漏风险。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | P2 / Enhancement | 9 / 1 | 提议利用模型原生 Bash 能力，通过零依赖 OS 沙箱增强代码库探索与文件编辑，方向具有前瞻性。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 7 / 1 | 探索 AST 感知的文件读取与代码映射，有望大幅减少 Token 浪费并提升代码定位精度。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 / Bug | 7 / 0 | 模型主动调用自定义技能与子代理的意愿不足，需显式指令才会触发，影响自动化体验。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides | P2 / Bug | 5 / 0 | 浏览器代理未遵循全局/项目级 `settings.json` 中的 `maxTurns` 等配置，导致配置失效。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done output hook causes crash | P1 / Bug | 3 / 0 | 输出钩子在打印用户摘要时导致 CLI 崩溃，影响工作流结束体验。 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Agent should stop/discourage destructive behavior | P2 / Bug | 3 / 1 | 模型可能执行 `git reset --force` 等破坏性操作，社区呼吁增加安全拦截与提示。 |
| [#21763](https://github.com/google-gemini/gemini-cli/issues/21763) | Bugreport doesn't provide context of the subagent | P1 / Bug | 2 / 0 | `/bug` 报告未包含子代理上下文，调试多代理会话时缺乏关键信息。 |

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|---------|
| [#30370](https://github.com/google-gemini/gemini-cli/pull/30370) | fix(core): handle nested .gitignore negations under dir/** patterns | CLOSED | 修复 `GitIgnoreParser` 对嵌套 `.gitignore` 否定模式（如 `logs/**` 与 `!keep.txt`）的处理错误。 |
| [#30376](https://github.com/google-gemini/gemini-cli/pull/30376) | fix(cli): expand Windows home-relative paths using tilde and backslash | OPEN | 修复 Windows 下 `~\...` 路径无法展开 `~` 的问题，影响策略路径、扩展注册表与包含目录。 |
| [#30334](https://github.com/google-gemini/gemini-cli/pull/30334) | fix(core,cli): parse PowerShell commands asynchronously to prevent UI spinner freeze | CLOSED | 修复 Windows 下 PowerShell 命令解析导致 UI 思考指示器冻结数秒的问题。 |
| [#30368](https://github.com/google-gemini/gemini-cli/pull/30368) | fix(acp): support closing sessions | OPEN | 实现 ACP `session/close` 能力，允许客户端在进程退出前主动释放会话资源。 |
| [#30363](https://github.com/google-gemini/gemini-cli/pull/30363) | fix(core): avoid duplicating the pending prompt in managed history | OPEN | 避免在历史记录硬化后重复追加待处理提示，修复首轮及多轮提示重复发送问题。 |
| [#30362](https://github.com/google-gemini/gemini-cli/pull/30362) | fix(acp): report stopped agent reasons | OPEN | ACP 模式下将代理停止原因作为助手消息发送给客户端，而非静默结束空轮次。 |
| [#30335](https://github.com/google-gemini/gemini-cli/pull/30335) | fix(core): stop overriding core.sshCommand with an empty string | OPEN | 修复 `getSafeGitEnv()` 将 `core.sshCommand` 设为空字符串导致 Git SSH 操作失败的问题。 |
| [#30212](https://github.com/google-gemini/gemini-cli/pull/30212) | feat(core): add configurable per-tool-call timeout (tools.callTimeout) | OPEN | 新增 `tools.callTimeout` 配置（秒，默认 0 禁用），单工具调用超时后可恢复性报错，避免模型无限等待。 |
| [#30375](https://github.com/google-gemini/gemini-cli/pull/30375) | docs: fix broken internal links | OPEN | 修复文档中缺失 `.md` 后缀、错误绝对路径及失效锚点等内部链接问题。 |
| [#30360](https://github.com/google-gemini/gemini-cli/pull/30360) | chore(deps): bump the npm-dependencies group with 67 updates | OPEN | Dependabot 自动化依赖升级，涉及 67 个 npm 包的小版本更新。 |

## 5. 功能需求趋势

从近期 Issues 与 PR 可观察到以下社区关注方向：

1. **子代理（Subagent）可靠性与可观测性**  
   社区高度关注子代理状态误报（#22323）、调用意愿不足（#21968）、轨迹可见性（#22598）及上下文缺失（#21763），表明多代理协作已成为核心使用场景，但稳定性仍需加强。

2. **长会话性能与内存管理**  
   #30352 暴露出 20 小时超长会话下的 OOM 崩溃，社区对内存泄漏、上下文滚动及长时间运行稳定性的需求日益迫切。

3. **代码理解精度提升（AST 感知）**  
   #22745、#22746、#19561 均围绕 AST 感知的文件读取、代码映射与“战术式提取”（Tactful Extraction）展开，旨在降低 Token 浪费并提升代码定位精度。

4. **跨平台与本地化体验**  
   Windows 路径解析（#30376）、PowerShell UI 冻结（#30334）等修复表明跨平台兼容性仍是持续改进点。

5. **Agent 安全与防护**  
   #22672 呼吁限制破坏性命令（如 `git reset --force`），#22232 提议浏览器代理会话锁恢复，安全防护机制成为新兴需求。

## 6. 开发者关注点

- **P1 级 Bug 积压**：#21409（通用代理挂起）、#22323（子代理状态误报）、#22186（输出钩子崩溃）等高优先级问题长期未闭合，影响生产环境可用性。
- **配置不一致**：浏览器代理忽略 `settings.json` 覆盖（#22267）、`.gemini/agents` 下软链接代理不被识别（#20079），配置

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-20)

## 今日速览

OpenCode 社区今日活跃度较高，共产生 9 个 Issue 更新和 50 个 PR 变更。核心动态集中在 **Claude Agent 计费标签修复**、**跨机器路径支持 (machines)** 以及 **Windows 平台多项回归问题** 上。社区正在推动 v2 版本向生产环境促进，同时关注交互式终端、SQLite 并发和插件系统稳定性等核心能力。

> 📭 **版本发布**：过去 24 小时内无新版本发布，暂无版本更新内容。

---

## 社区热点 Issues

以下选取 10 个最具代表性的 Issue（含已关闭但影响重大的），按社区关注度与技术影响排序：

| # | 标题 | 状态 | 核心内容 | 为何重要 | 链接 |
|---|------|------|----------|----------|------|
| #61072 | Claude Agent: 5-hour plan limit drains ~1.8x faster because the SDK labels requests `sdk-ts` | CLOSED | Claude Agent 通过 SDK 启动时设置 `CLAUDE_CODE_ENTRYPOINT=sdk-ts`，导致请求被错误标记，Claude 5 小时额度消耗速度比原生 TUI 快约 1.8 倍 | 直接影响用户成本与计费体验，已有配套修复 PR 合并 | [查看](https://github.com/anomalyco/opencode/issues/61072) |
| #65020 | Concurrent `opencode run` processes fail mid-session with "Failed to execute statement" (SQLITE_BUSY not retried) | OPEN | 多个 `opencode run` 并发操作同一 `opencode.db` 时，大量进程因 SQLite 锁竞争中途失败，未重试且无错误码 | 涉及会话存储层并发稳定性，对批量运行和 CI 场景影响大 | [查看](https://github.com/anomalyco/opencode/issues/65020) |
| #65015 | plugins: git plugin install waits forever on a credential prompt in the background service | OPEN | Windows 下后台服务安装私有 Git 插件时卡在凭据提示，导致 `/api/model` 和 `/api/provider` 返回 503，桌面端无模型可用 | 插件系统阻塞会导致整个服务不可用，Windows 用户受影响明显 | [查看](https://github.com/anomalyco/opencode/issues/65015) |
| #65014 | shell: background tasks cancelled on server restart (regression) | OPEN | 后台 shell 任务在 OpenCode 服务器重启时被取消，此前可存活；长时间运行的数据管道、心跳脚本等受影响 | 回归性问题，破坏长期运行任务的可靠性 | [查看](https://github.com/anomalyco/opencode/issues/65014) |
| #65017 | feat(core): add interactive pty tool for retained REPL, debugger, and EOF-driven terminal sessions | OPEN | 请求新增原生交互式 PTY 工具，支持跨步驟驱动 Python/Node REPL、gdb/lldb/pdb、psql/redis-cli 及交互式安装向导 | 当前 shell 工具仅适合一次性命令，缺乏持久交互终端能力，是 Agent 工作流的常见痛点 | [查看](https://github.com/anomalyco/opencode/issues/65017) |
| #65018 | feat(core): expose structured truncation counts and output file path in shell tool metadata | OPEN | 要求 shell 工具元数据中暴露结构化的截断统计（字节数、行数、保留窗口等）及输出文件路径 | 提升大输出命令的可观测性与可控性，对调试和自动化流程有价值 | [查看](https://github.com/anomalyco/opencode/issues/65018) |
| #64117 | `notifications/tools/list_changed` does not surface newly-enabled tools to the model | OPEN | MCP 服务器发送 `tools/list_changed` 并广告新工具后，新工具不会变为模型可调用状态 | MCP 生态集成的关键缺陷，影响动态工具发现能力 | [查看](https://github.com/anomalyco/opencode/issues/64117) |
| #65008 | Shell permission ask is skipped for PowerShell script invocation on Windows (OpenCode 2.3.0) | OPEN | Windows 下 PowerShell 脚本通过 shell 工具执行时，未显示预期的权限审批提示 | 安全审计与权限控制缺失，可能绕过用户配置的 `ask` 规则 | [查看](https://github.com/anomalyco/opencode/issues/65008) |
| #65010 | tui: /btw status and dialog do not sync across clients viewing the same session | OPEN | 两个 TUI 客户端查看同一会话时，一个客户端启动 `/btw` 后，另一个不会同步状态或弹出对话框 | 多客户端协作场景下的状态一致性问题 | [查看](https://github.com/anomalyco/opencode/issues/65010) |
| #65003 | feat(core): use models.dev's recommended API behind a flag | OPEN | 新增 `recommended_api` 标志，让 OpenCode 使用 models.dev 中每个模型推荐的 API | 模型适配与 API 选型自动化，有助于降低手动配置成本 | [查看](https://github.com/anomalyco/opencode/pull/65003) |

---

## 重要 PR 进展

选取 10 个代表性 PR，涵盖已合并修复与待审核功能：

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|---------------|------|
| #65016 | fix(core): label Claude Agent entry point | CLOSED | 将 Claude Code 入口点标签设为 `opencode` (`CLAUDE_CODE_ENTRYPOINT`)，修复 #61072 导致的计费额度异常消耗问题 | [查看](https://github.com/anomalyco/opencode/pull/65016) |
| #61073 | fix(core): label Claude Agent entry point | CLOSED | 由 @Salloxy 提交的原始修复，携带至 #65016 合并，解决 SDK 标记 `sdk-ts` 导致的计费问题 | [查看](https://github.com/anomalyco/opencode/pull/61073) |
| #65013 | feat(core): machine names in paths | CLOSED | 工具路径可命名其他计算机，如 `gpu:/work/train.py` 可在名为 `gpu` 的机器上读写编辑运行；受 `machines` 标志控制 | [查看](https://github.com/anomalyco/opencode/pull/65013) |
| #65019 | feat(core): tell the model which machines it can reach | CLOSED | 模型被告知可达的其他计算机，可使用 `gpu:/work/file` 等路径；基于 #65013 的机器名路径功能 | [查看](https://github.com/anomalyco/opencode/pull/65019) |
| #64997 | feat(core): machine list | CLOSED | 服务器维护已知计算机列表，作为 worker 连接的交接点；当前产品尚未读写该列表，为多机能力奠定基础 | [查看](https://github.com/anomalyco/opencode/pull/64997) |
| #64784 | release: promote dev to production | OPEN | 由 opencode-agent[bot] 发起，将 `dev` 提升至 `production`，包含 Tidepool Alpha Free 和 Gemini 4 Neon 的 Console 文档，以及 core、app、CLI 变更 | [查看](https://github.com/anomalyco/opencode/pull/64784) |
| #65006 | fix(ai): continue Google Interactions responses split across requests | CLOSED | 修复 Google Interactions 响应被拆分为多个请求时的续接问题，确保完整响应处理 | [查看](https://github.com/anomalyco/opencode/pull/65006) |
| #65009 | fix(core): preserve session recency on permission sync | OPEN | 浏览器附加/分离时持久化权限变更，并在写入时更新 `time_updated`，使空闲会话正确排序 | [查看](https://github.com/anomalyco/opencode/pull/65009) |
| #65012 | refactor(session-ui): derive timeline summaries from facts | OPEN | 会话 UI 时间线摘要从事实派生，修复因非“一调用一工具”行导致的计数偏差 | [查看](https://github.com/anomalyco/opencode/pull/65012) |
| #65011 | refactor(codemode): use the psychoscript package for the language | OPEN | Code Mode 的语言核心（编译器、VM、运行时、stdlib 等）迁移至 `psychoscript@0.1.0` npm 包，`packages/codemode` 仅保留工具层 | [查看](https://github.com/anomalyco/opencode/pull/65011) |

---

## 功能需求趋势

从今日 Issues 与 PR 中提炼出的社区关注方向：

1. **交互式终端与持久会话**  
   #65017 明确请求原生 PTY 工具，反映开发者希望在 Agent 中直接操作 REPL、调试器和交互式 CLI，而非仅限一次性 shell 命令。

2. **多机器/分布式执行能力**  
   #64997、#65013、#65019 形成完整的“机器列表 → 机器名路径 → 模型感知可达机器”功能链，显示社区对跨机器代码执行和远程资源调度的强烈需求。

3. **MCP 生态集成完善**  
   #64117 暴露 MCP 工具动态发现的缺陷，说明随着 MCP 服务器增多，客户端对 `tools/list_changed` 等通知的处理已成为关键短板。

4. **Shell 工具可观测性增强**  
   #65018 要求暴露结构化截断统计和输出路径，体现用户对大输出命令处理的精细化控制需求。

5. **模型适配自动化**  
   #65003 提出基于 models.dev 的推荐 API 自动选型，降低手动配置不同模型端点的成本。

---

## 开发者关注点

1. **Windows 平台稳定性问题集中爆发**  
   今日多个 Windows 专属回归问题：Git 插件安装卡死导致服务 503（#65015）、PowerShell 权限提示被跳过（#65008）、TUI `/btw` 状态不同步（#65010）、后台 shell 任务重启后被取消（#65014）。Windows 平台的测试覆盖和回归防护亟待加强。

2. **会话存储并发能力不足**  
   #65

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-20)

## 今日速览

Hermes Agent 于 2026-11-19 发布了 canary 版本 `v0.23.2+canary.20261119T064637Z`，桌面端支持 macOS Apple Silicon。社区今日活跃度较高，13 个 Issue 更新，其中多个涉及多配置文件安装、Anthropic 速率限制恢复、SSL 证书处理及跨平台适配器（Teams/Telegram/BlueBubbles）的核心缺陷；PR 侧则集中在桌面端性能优化、插件目录扩展及状态数据库维护等方向。

---

## 版本发布

**Hermes Agent v0.23.2+canary.20261119T064637Z**  
- 发布日期：2026-11-19  
- 可下载平台：Hermes Desktop（macOS Apple Silicon M-series 提供 DMG 包，更多架构见发布页）  
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.2%2Bcanary.20261119T064637Z  

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态/优先级 | 核心内容 | 为何值得关注 | 链接 |
|---|------|-------------|----------|--------------|------|
| #154627 | Multi-profile install: plugin dependency resolution fails with duplicate `clawlink-hermes-plugin` workspace member | OPEN / P2 | 多配置文件安装时插件依赖解析失败，导致 Hindsight 缺少 `hindsight-client` | 涉及多配置文件场景下的插件依赖冲突，直接影响插件生态可用性，已有 4 条社区讨论 | https://github.com/NousResearch/hermes-agent/issues/154627 |
| #147070 | `_recover_rate_limit` sleeps up to 600s on `Retry-After` before rotating credential pool | OPEN / P2 | Anthropic 账户触发速率限制时，凭证池轮换最多延迟 600 秒 | 影响多账号/高并发场景下的可用性，属于 P2 级别 Agent 运行时缺陷 | https://github.com/NousResearch/hermes-agent/issues/147070 |
| #148241 | 0.22.6 provider clients ignore `SSL_CERT_FILE`, TLS fails behind intercepting proxies | CLOSED / P2 | 自 0.22.6 起，提供商客户端忽略 `SSL_CERT_FILE` 证书包，导致 TLS 拦截代理下模型调用全部失败 | 已修复，但提醒用户及时升级以避免代理环境下的连接中断 | https://github.com/NousResearch/hermes-agent/issues/148241 |
| #158023 | Gateway-owned Group Chats never show "needs you" for @user mentions | OPEN / P2 | 网关拥有的群聊中 `@user` 提及不会点亮“需你”徽章，与文档承诺不符 | 影响 Bot Mode 下的人机协作体验，文档与实际行为不一致 | https://github.com/NousResearch/hermes-agent/issues/158023 |
| #149586 | nixosModules provisions group-write hermesHome that CLI discovery rejects | OPEN / P3 | NixOS 模块配置的 `hermesHome` 为组可写（2770），但 CLI 发现检查会拒绝组可写控制目录 | 涉及 NixOS 部署与 CLI 安全检查的冲突，对 Nix 用户有直接影响 | https://github.com/NousResearch/hermes-agent/issues/149586 |
| #156941 | Test suite fails from checkout at default install location (`~/.hermes/hermes-agent`) | OPEN / P2 | 家目录 I/O 守卫拒绝导入时的引导探测，导致默认安装路径下的测试套件失败 | 影响开发者本地贡献与 CI 测试，属于开发体验问题 | https://github.com/NousResearch/hermes-agent/issues/156941 |
| #158024 | BlueBubbles read-receipt task is not kept referenced and is not cancelled on disconnect | OPEN / P3 | `send_read_receipts` 开启时，读取回执任务被 `asyncio.create_task` 丢弃，断开连接后未取消 | 可能导致任务泄漏，影响 iOS 桥接插件的稳定性 | https://github.com/NousResearch/hermes-agent/issues/158024 |
| #158022 | Teams adapter: channel sessions have an empty chat name | OPEN / P2 | Teams 频道会话中 `chat_name` 为空，代理无法得知被 @ 提及的团队或频道 | 直接影响 Teams 适配器的上下文感知能力，属于跨平台适配缺陷 | https://github.com/NousResearch/hermes-agent/issues/158022 |
| #158017 | Add `meta/muse-ember` to curated OpenRouter model catalog | OPEN / P2 | OpenRouter 已上架 `meta/muse-ember` 并支持 tools，但未加入 Hermes 策展模型清单 | 社区对新模型支持的需求，反映模型目录维护的滞后性 | https://github.com/NousResearch/hermes-agent/issues/158017 |
| #158013 | Telegram: support `disable_notification` for silent sends | OPEN / P3 | 希望 Telegram 发送支持静默发送（不弹通知），适用于定时报告等低优先级消息 | 用户对消息通知控制的细粒度需求，体现即时通讯集成的深化 | https://github.com/NousResearch/hermes-agent/issues/158013 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #153066 | fix(desktop): propagate profile-route failures instead of dialing twice | OPEN | 桌面端配置文件路由失败传播，避免重复拨号与 20s 超时误判 | https://github.com/NousResearch/hermes-agent/pull/153066 |
| #157986 | Core PRs that break a pinned catalog plugin now fail CI | OPEN | 当核心变更破坏已固定目录插件的导入时，CI 直接失败并指出插件名与具体 import，防止线上回归 | https://github.com/NousResearch/hermes-agent/pull/157986 |
| #153067 | feat(desktop): show staged profile-switch status with inline retry | OPEN | 桌面端配置文件切换显示分阶段状态与内联重试，替换全屏“正在唤醒”覆盖层 | https://github.com/NousResearch/hermes-agent/pull/153067 |
| #66252 | fix(acp): advertise `mcpCapabilities` (http/sse) in initialize response | OPEN | ACP 初始化响应中声明 `mcpCapabilities`，避免规范客户端丢弃 HTTP/SSE MCP 服务器 | https://github.com/NousResearch/hermes-agent/pull/66252 |
| #141437 | fix(opencode-go): route Go Gemini models through the native wire | CLOSED | 将 Go 端 Gemini 模型路由至 Google 原生协议，修复 `/zen/go/v1/chat/completions` 返回 400 的问题 | https://github.com/NousResearch/hermes-agent/pull/141437 |
| #153069 | perf(desktop): defer markdown preprocessing and avoid stream-end reparsing | OPEN | 桌面端推迟 Markdown 预处理，避免流结束时重新解析，提升流式渲染性能 | https://github.com/NousResearch/hermes-agent/pull/153069 |
| #153068 | perf(desktop): reduce streaming and terminal hot-path work | OPEN | 桌面端流式与终端热路径性能优化，保留已定稿转录身份，仅在缓存未命中时去重工具调用 | https://github.com/NousResearch/hermes-agent/pull/153068 |
| #158015 | plugins: update Inline to 1.2.5 so agent progress and status lines stay quiet | OPEN | 将 Inline 平台条目从 1.2.2 升级至 1.2.5，修复状态行噪声问题 | https://github.com/NousResearch/hermes-agent/pull/158015 |
| #158021 | state.db can drop old tool output while keeping every conversation | OPEN | 新增可选设置 `sessions.tool_payload_retention_days`，保留全部对话但将旧工具输出替换为单行标记，控制 `state.db` 增长 | https://github.com/NousResearch/hermes-agent/pull/158021 |
| #158019 | feat(cli): add guided shell completion setup | OPEN | CLI 增加交互式 Shell 补全引导（Bash/Zsh/Fish），支持非交互式参数 | https://github.com/NousResearch/hermes-agent/pull/158019 |

---

## 功能需求趋势

从近 24 小时的 Issues 与 PR 可观察到以下社区关注方向：

1. **跨平台适配器增强**：Teams 频道会话上下文（#158022）、Telegram 静默发送（#158013）、BlueBubbles 读取回执任务管理（#158024），表明用户正在将 Hermes 推向更多即时通讯与协作场景。
2. **模型目录与提供商支持**：新增 OpenRouter 模型 `meta/muse-ember`（#158017）、Go Gemini 原生线路修复（#141437），社区期望更快跟进第三方模型平台的新模型与协议。
3. **桌面端性能与体验**：Markdown 预处理延迟（#153069）、流式热路径优化（#153068）、配置文件切换状态 UI（#153067），桌面端渲染与配置管理成为性能优化重点。
4. **状态数据库与会话维护**：工具输出保留策略（#158021，基于 #110543），用户希望在不删除完整对话的前提下控制 `state.db` 体积。
5. **插件生态稳定性**：CI 中检测目录插件破坏性变更（#157986）、Inline 插件升级（#158015），反映社区对插件兼容性与回归防护的重视。

---

## 开发者关注点

- **多配置文件安装与插件依赖冲突**：#154627 暴露出多配置文件场景下工作区成员重复导致依赖解析失败，需优化插件安装器的依赖去重与隔离逻辑。
- **速率限制恢复机制**：Anthropic 账户触发 429 时，凭证池轮换

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-20)

## 今日速览

OpenClaw 今日发布了 **v2026.11.10-beta.1** 与 **v2026.11.6** 两个版本，重点在 Agent 模板一键安装、升级路径修复与对话恢复能力上。社区围绕会话状态同步、Telegram 轮询启动失败、首次运行体验以及 Worker 失败诊断等问题展开活跃讨论，P0 级别的更新验证缺陷引发高度关注。

---

## 版本发布

### v2026.11.10-beta.1
- **Agent Templates**：支持直接从 ClawHub 包添加 Agent，仅需单个 `CLAW.md` 清单及随附技能文件夹，经原生信任流校验后即可安装。（#195707, #196322, #196348，@steipete）
- **OpenClaw ID**：节点连接能力（内容被截断，详见发布页）

### v2026.11.6
- **更平滑的升级**：将 2026.11.5 更新器桥接至当前发布路径，并在 Windows 上正确验证暂存插件依赖。（#200662, #200595，@steipete）
- **更具韧性的对话**：子代理与对话恢复相关改进（内容被截断）

[查看完整 Release 页面](https://github.com/openclaw/openclaw/releases)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 核心摘要 | 为何值得关注 | 链接 |
|---|------|------------|---------|------------|------|
| #197083 | Post-install Doctor WAL publication verification leaves 11.3 update partially finalized | P0, ux-release-blocker | 从 11.1 到 11.3 的托管 npm 升级激活新核心后，Doctor 验证 SQLite WAL 提交失败，导致更新部分完成且无法回滚。 | P0 级发布阻塞器，直接影响升级可靠性，评论数达 29 条，社区关注度最高。 | [链接](https://github.com/openclaw/openclaw/issues/197083) |
| #199569 | Telegram poller never starts after boot while channels status reports connected | P1, message-loss | 启动后 Telegram 账户显示 connected，但轮询器未启动，offset 排队未提交，导致消息丢失风险。 | 涉及消息丢失，P1 紧急程度，对依赖 Telegram 通道的用户影响直接。 | [链接](https://github.com/openclaw/openclaw/issues/199569) |
| #202132 | Control UI first-run setup should match the macOS welcome flow | P2, ux-friction | 新安装的控制面板首次运行卡片会自动选择 AI 并测试，用户无法查看或选择，失败后仅显示 Gateway 错误。 | 首次用户体验（UX）问题，影响新用户留存，刚于 11-20 更新。 | [链接](https://github.com/openclaw/openclaw/issues/202132) |
| #186973 | Chat /clear state check keeps rendering a stale update-history banner | P2, session-state | WebChat `/clear` 状态检查持续渲染数周前的过期更新历史横幅，CLI doctor 则正常。 | 会话状态残留问题，跨网关重启和完整重启仍存在。 | [链接](https://github.com/openclaw/openclaw/issues/186973) |
| #177210 | Webchat continuation turn acts on a stale echoed user request | P2, session-state | 长时间运行的 WebChat 会话中，续写轮次基于注入的运行时上下文中的陈旧用户请求，产生未请求的重复回答。 | 导致模型工作浪费和幻觉回复，影响对话质量。 | [链接](https://github.com/openclaw/openclaw/issues/177210) |
| #151766 | active-memory recall-intent patterns missing German (DE) | P2, session-state | 主动记忆回调意图模式未覆盖德语，导致德语用户默认 `mode: "escalate"` 永远不触发深度回调子代理。 | 国际化/本地化缺口，已有 2 个赞，影响非英语用户体验。 | [链接](https://github.com/openclaw/openclaw/issues/151766) |
| #202129 | GitHub Copilot sol-fast success reported as model route change | P2, ux-friction | 成功运行保留 `github-copilot/gpt-5.6-sol-fast` 作为终端模型，但提供商路由通知错误报告为模型路由变更。 | 路由分类混淆，影响用户对模型选择的感知。 | [链接](https://github.com/openclaw/openclaw/issues/202129) |
| #202118 | Claude CLI progress notes show as replies in the Control UI | P2, ux-friction | Claude CLI 运行时，代理在工具调用前写的简短进度笔记（如“检查配置中...”）在控制面板中显示为普通回复。 | UI 语义混淆，进度指示被误认为最终回答。 | [链接](https://github.com/openclaw/openclaw/issues/202118) |
| #202134 | Plugin helper-session cleanup rescans every orphan transcript | Bug | 插件辅助会话结束时，`session.lifecycle.artifacts-prepare` 在独占 SQLite 写入器中执行完整孤立转录扫描，耗时 8.6–13 秒，导致 Active Memory 回调超时。 | 性能瓶颈，直接导致 Active Memory 功能超时，需优化数据库写入路径。 | [链接](https://github.com/openclaw/openclaw/issues/202134) |
| #176246 | cli: infer audio/video ignore --model when media models are configured | P2, auth-provider | 当 `tools.media.models` 中有对应能力条目时，`--model` 标志被忽略，文件上传到配置的条目而非用户指定的提供商。 | CLI 行为与用户显式参数不一致，涉及媒体模型配置优先级问题。 | [链接](https://github.com/openclaw/openclaw/issues/176246) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态/优先级 | 功能或修复内容 | 链接 |
|---|------|------------|-------------|------|
| #202029 | fix: preserve the real reason a worker failed | CLOSED, P2 | 修复 Worker 失败时仅上报“Native worker task channel closed”的问题，保留原始异常或退出码，便于诊断。修复 #202022。 | [链接](https://github.com/openclaw/openclaw/pull/202029) |
| #202128 | fix: stop worktree pack consolidation inflating delta storage | OPEN, P2 | 修复工作树 Git 清理在合并单链接包时导致磁盘占用膨胀，复现输出/输入增长达 1.454×。 | [链接](https://github.com/openclaw/openclaw/pull/202128) |
| #202133 | feat: use GPT-Live-1.1 with an OpenAI API key | OPEN, docs/openai | 支持 OpenAI 新发布的 `gpt-live-1.1` 模型，此前 OpenClaw 仅识别 `gpt-live-1`，导致新模型被视为未列出的 GPT-Live 模型。 | [链接](https://github.com/openclaw/openclaw/pull/202133) |
| #202126 | feat: show planned automations and their controls in chat | OPEN, P2, web-ui/gateway | 在聊天中显示计划自动化及其控制项，以单张紧凑卡片或分组形式呈现，替代多条独立通知。 | [链接](https://github.com/openclaw/openclaw/pull/202126) |
| #202122 | fix: reclaim stale scratch clones and Git repack leftovers | OPEN, P2 | 回收托管工作树 scratch 目录中的本地克隆，防止自动清理因嵌套仓库而永久保留检出，并清理废弃的 repack 临时文件。 | [链接](https://github.com/openclaw/openclaw/pull/202122) |
| #202111 | fix: let delegated child agents survive steering and Gateway restarts | OPEN, P2, session-state | 解决子代理消息在子代理忙时挂起约 30 秒，以及网关重启后子代理无法存活的问题。 | [链接](https://github.com/openclaw/openclaw/pull/202111) |
| #202124 | fix(android): nest child sessions under their parent in the sidebar | CLOSED, P2, android | 修复 Android 侧边栏中子会话（子代理运行、Worker、分叉）与顶级对话混排，现按父子关系嵌套显示。 | [链接](https://github.com/openclaw/openclaw/pull/202124) |
| #202031 | fix: prevent workspace Azure resource redirects | CLOSED, P1, security | 禁止不受信任的工作区 `.env` 通过 Azure OpenAI 资源名称更改凭证模型请求的主机，要求资源名为单 DNS 标签，修复凭证重定向安全缺陷。 | [链接](https://github.com/openclaw/openclaw/pull/202031) |
| #201710 | fix(agents): freeze a prompt series' tool set at its first request | OPEN, P1, agents | 在提示系列的首个请求时冻结工具集，通过构建会话完整工具列表再按回合策略网关拒绝工具，拒绝的工具不进入下发列表。 | [链接](https://github.com/openclaw/openclaw/pull/201710) |
| #200592 | improve(ios): rebuild the chat transcript around the web reading model | OPEN, P2, ios | 重建 iOS 聊天转录，修复长会话、工具密集型场景下的滚动分页（`olderCursor` 未解码）和工具调用卡片显示问题，使其与 Web 控制面板对齐。 | [链接](https://github.com/openclaw/openclaw/pull/200592) |

---

## 功能需求趋势

从本日 Issues 与 PR 中可观察到以下社区关注方向：

1. **会话状态与上下文一致性**：多个 Issue 涉及 `/clear` 后残留横幅、续写轮次基于陈旧上下文、子代理跨重启存活等，说明用户对会话状态同步和上下文纯净度要求较高。
2. **多语言与国际化**：德语回调意

:::
