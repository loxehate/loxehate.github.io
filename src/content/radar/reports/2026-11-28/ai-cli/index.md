---
title: "AI CLI 工具社区动态日报"
published: 2026-11-28
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-28

> 生成时间: 2026-11-28 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-28)

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单轮对话”向“多代理编排与跨平台持续工作流”演进的关键期。各主流工具普遍聚焦于桌面端稳定性、子代理可靠性、跨设备会话同步以及沙箱安全隔离四个核心方向，但版本迭代节奏分化明显：部分工具处于高频补丁与回归修复阶段，部分工具则进入架构重构与机器 API 稳定化窗口。整体来看，社区对“可控、可审计、可跨设备迁移”的 AI 原生开发环境需求日益强烈，而跨平台一致性与长会话性能仍是共性瓶颈。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues (24h 更新) | PR (24h 更新) | 新版本发布 | 主要活跃特征 |
|------|------|-------------------|---------------|------------|--------------|
| **Claude Code** | anthropics/claude-code | 50 | 3 (全由机器人提交) | 无 | Issue 讨论活跃，但代码贡献集中在自动化 Issue 陈旧标记与去重 Agent 修复 |
| **OpenAI Codex** | openai/codex | 未披露总数 (精选 10 条热点) | 大量 (精选 10 条，多由 copyberry[bot] 提交) | rust-v0.174.0-alpha.9 (11-27) | 桌面端稳定性与 Linux 沙盒安全为核心，自动化安全/稳定性 PR 密集 |
| **Gemini CLI** | google-gemini/gemini-cli | 50 | 15 (精选 10 条) | 无 | Subagent 稳定性与浏览器 Agent 兼容性讨论集中，核心缺陷修复 PR 较多 |
| **DeepSeek Reasonix** | esengine/DeepSeek-Reasonix | 0 | 0 | 无 | 过去 24 小时无活动 |
| **OpenCode** | anomalyco/opencode | 6 (全部最新) | 50 (精选 10 条) | 无 | TUI 权限回归与机器 API 数据模型重构为核心，PR 更新量大 |
| **Deepseek Harness** | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 过去 24 小时无活动 |
| **Hermes** | NousResearch/hermes-agent | 18 | 50 (精选 10 条) | 无 | Gateway 性能、插件生态迁移、桌面/移动端 UX 修复并行 |
| **OpenClaw** | openclaw/openclaw | 9 | 50 (精选 10 条) | 无 | ACP 会话状态同步、Android 语音体验、多模型支持为核心 |

> 注：无活动工具（DeepSeek Reasonix、Deepseek Harness）在过去 24 小时内未记录任何 Issue、PR 或 Release 更新。

## 3. 共同关注的功能方向

多个工具社区在以下需求上呈现高度共鸣：

| 功能方向 | 涉及工具 | 具体诉求 |
|----------|----------|----------|
| **跨平台/跨设备会话同步** | Claude Code、OpenAI Codex | Claude Code 社区高度关注“跨机会话恢复（CLI-to-CLI 状态同步）”；Codex 社区反复反馈 iOS/Web/桌面端项目列表与对话状态不同步，期望以桌面端或云端为单一事实来源 |
| **桌面端稳定性与回归修复** | Claude Code、OpenAI Codex、OpenCode | Claude Code 出现 Windows 远程控制、macOS 听写转录等回归 Bug；Codex 集中爆发 Windows 桌面端崩溃、内核内存泄漏、React 路由错误；OpenCode 出现 v2.4.x 权限提示静默允许回归 |
| **子代理 / 多 Agent 可靠性** | Claude Code、Gemini CLI、OpenAI Codex | Gemini CLI 的 Subagent 在 MAX_TURNS 后错误汇报成功、通用代理挂起；Codex 的主 Agent 无法可靠管理子 Agent；Claude Code 关注去重 Agent 前台运行可靠性 |
| **沙箱与安全权限管理** | OpenAI Codex、OpenCode、OpenClaw | Codex 修复 Linux bubblewrap 沙盒只读挂载、合成目录封装；OpenCode 关注 TUI 权限回归与 Cookie 状态一致性；OpenClaw 涉及 ACP 绑定会话状态与备份安全临时目录 |
| **Token 预算与成本控制** | Claude Code、OpenCode | Claude Code 用户希望定时任务支持自定义模型与 effort 等级；OpenCode 社区请求 Code Mode 目录 Token 预算可配置，以控制系统提示驱动的高基础消耗 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|----------|----------|--------------|
| **Claude Code** | 桌面端体验对齐、定时任务自动化、技能生态发布 | 桌面端 AI 编程助手用户、企业自动化场景 | 基于 Anthropics 生态，强调 Web/桌面/CLI 功能对等，侧重会话管理与技能商店集成 |
| **OpenAI Codex** | 桌面端稳定性、Linux 沙盒安全、多 Agent 架构 | 付费用户 (Plus/Pro)、需要跨设备协作的开发者 | Rust 端 Alpha 预览 (rust-v0.174.0-alpha.9)，侧重 TUI 权限显示、沙盒隔离与命令审批生命周期 |
| **Gemini CLI** | Subagent 编排、AST 感知代码工具链、浏览器 Agent | 追求代理可靠性与代码结构感知的高级用户 | 侧重 ACP 会话关闭、检查点恢复、Hook 可观测性，探索零依赖 OS 沙箱与 AST 感知文件读取 |
| **OpenCode** | TUI 权限系统、机器/远程执行 API、Token 成本控制 | 命令行原生用户、远程机器代理场景 | TypeScript/Rust 双客户端并行，正在进行机器 API 数据模型重构 (rekram1-node 连续提交)，侧重状态机建模与连接状态管理 |
| **Hermes** | Gateway 性能稳定性、插件/MCP 生态、多租户记忆 | 插件开发者、多租户企业用户、移动端用户 | 侧重 Gateway housekeeping 优化、MCP 中间件元数据、API Server 钩子，插件生态正向独立 Hermes 仓库拆分 |
| **OpenClaw** | ACP 会话状态同步、Android 语音体验、多模型支持 | 跨平台移动端用户、Telegram/仓库集成场景 | 侧重 ACP 绑定会话、Google Gemini/OpenAI 多模型适配、Android 原生语音识别与备份机制 |

## 5. 社区热度与成熟度

- **高活跃、快速迭代**：OpenCode (50 PR)、Hermes (50 PR)、OpenClaw (50 PR) 三个工具在过去 24 小时内 PR 更新量均达到 50 条，表明正处于密集代码迭代与功能补全阶段。Gemini CLI (50 Issues / 15 PR) 和 Claude Code (50 Issues) Issue 讨论热度高，但代码贡献相对集中（Claude Code 3 个 PR 全由机器人提交，显示维护者以自动化运维为主）。
- **稳定性瓶颈期**：OpenAI Codex 虽未披露 Issue 总数，但集中披露了大量 Windows 桌面端回归崩溃与内核内存泄漏，处于“稳定性修复优先于新功能”的成熟度窗口。
- **低活跃/停滞**：DeepSeek Reasonix 与 Deepseek Harness 过去 24 小时无任何活动，社区热度与代码迭代均处于低位，需关注其项目维护状态。

## 6. 值得关注的趋势信号

1. **从单代理向多代理编排转型**：Gemini CLI 的 Subagent 恢复问题、Codex 的子 Agent 管理缺陷、Claude Code 的去重 Agent 可靠性讨论，共同指向行业正在从“单轮对话助手”向“可编排、可恢复、可审计的多代理工作流”迈进。开发者应关注子代理状态持久化与故障恢复机制。

2. **桌面端成为 AI CLI 的新战场**：Claude Code、Codex、OpenCode 均集中爆发桌面端回归 Bug（Windows 远程控制、macOS 听写、Linux 沙盒、TUI 权限），说明桌面端已成为 AI CLI 的主要交互入口，跨平台一致性（Windows/macOS/Linux/WSL）将是产品差异化的关键。

3. **沙箱安全与权限审计上升为核心需求**：Codex 的 Linux 沙盒封装、OpenCode 的权限回归修复、OpenClaw 的备份安全目录检查，反映企业用户对代码执行隔离、权限溯源与数据不外泄的要求显著提升。

4. **Token 成本与预算可配置化成为刚需**：Claude Code 的定时任务模型/effort 控制、OpenCode 的 Code Mode Token 预算可配置，表明开发者开始将 AI CLI 视为长期运行的基础设施，而非偶发工具，成本可控性直接影响采纳意愿。

5. **跨设备状态同步仍是未解决的核心痛点**：Claude Code 的跨机会话恢复、Codex 的 iOS/Web/桌面端不同步，均未在当前版本中得到根本性解决，这为具备强云端状态同步能力的新进入者留下了市场机会。

**决策建议**：对于技术选型，若优先考虑桌面端稳定性与跨平台一致性，建议密切关注 Codex 与 Claude Code 的后续补丁节奏；若侧重多代理编排与代码结构感知，Gemini CLI 的 AST 感知与 Subagent 方向值得试点；若需要远程机器执行与 TUI 深度定制，OpenCode 的机器 API 重构具有前瞻性。对于已采用 DeepSeek Reasonix/Harness 的团队，建议确认项目维护状态以避免长期无更新带来的风险。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-28）

## 1. 热门 Skills 排行

基于 PR 更新活跃度与社区关注度，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 `fix(mcp-builder)` | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入变更及自定义 HTTP 头配置不兼容问题 | MCP 协议版本迁移导致现有技能失效，社区急需兼容性修复 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 `fix(skill-creator)` | 隔离触发器评估，修复 Windows 下管道选择失效及运行时失败误判问题 | 技能创建工具的触发率准确性与跨平台稳定性是社区核心痛点 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 `Add notion-spec-to-implementation...` | 新增 Notion 规格转实现技能与定量简历审计技能 | 产品规格到代码任务的自动化拆解，以及简历审计等垂直场景需求明显 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1980 `webapp-testing` | 移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用测试技能的安全加固，社区对执行层安全性关注度高 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 `fix(docx)` | LibreOffice 超时改为报错，并验证输出 DOCX 无修订痕迹 | 文档自动化处理的可靠性与错误处理机制 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 `feat(skills): add proofcore-contract-auditor` | 新增智能合约公证技能，对 Solidity/Rust 合约做静态分析并将审计证明锚定到 TON 区块链 | Web3/智能合约审计是社区新兴的垂直技能方向 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 7 | #1703 `Add md2video-audio skill` | 基于 Marp 将 Markdown 转为带真人语音的 MP4 视频 | 内容多模态输出（文档→视频）的零成本自动化需求 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1703) |
| 8 | #525 `Add pyxel skill` | 复古游戏开发技能，支持 Pyxel 游戏实现、头less 运行、帧检测与状态验证 | 游戏开发垂直领域的技能化需求，周期较长但持续受关注 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼出社区最期待的新 Skill 方向：

1. **工作流自动化与文档转换**  
   如 Notion 规格转实现任务（#1245）、Markdown 转视频（#1703）、文档排版质量控制（#514），社区希望 Claude Code 能承担更多“结构化内容 → 可执行交付物”的中间层工作。

2. **代码审查与安全审计**  
   智能合约审计（#1771）、代理治理安全模式（#412）、外部链接风险检测（#2019），表明社区对技能在“审计-验证-公证”闭环上的需求在增长。

3. **技能创建与评估工具链完善**  
   `skill-creator` 相关的触发率误判（#556、#1352）、Windows 兼容性（#1298）、YAML frontmatter 解析（#1997）等问题反复出现，社区期待更稳定、更易用的技能开发与评估框架。

4. **跨平台组织协作**  
   组织内技能共享（#228）、技能命名空间信任边界（#492）、重复技能去重（#189），反映企业级用户对技能分发、权限与治理的关注正在上升。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、问题明确，若维护者跟进，可能在近期落地：

- **#1298 `fix(skill-creator): isolate trigger evals...`**  
  直接影响技能触发准确率，是 `skill-creator` 工具链的核心修复，社区依赖度高。  
  [查看 PR](https://github.com/anthropics/skills/pull/1298)

- **#1742 `fix(mcp-builder): support mcp>=2...`**  
  MCP 协议 2.0 兼容性修复，涉及大量依赖 MCP 的现有技能，优先级高。  
  [查看 PR](https://github.com/anthropics/skills/pull/1742)

- **#1245 `Add notion-spec-to-implementation...`**  
  功能完整且场景明确，属于新增高价值技能，社区期待合并后丰富官方技能库。  
  [查看 PR](https://github.com/anthropics/skills/pull/1245)

- **#1980 `webapp-testing: avoid shell=True...`**  
  安全加固类修复，改动集中、风险可控，易于审核合并。  
  [查看 PR](https://github.com/anthropics/skills/pull/1980)

- **#1771 `feat(skills): add proofcore-contract-auditor`**  
  垂直领域新技能，若审计通过可快速扩充 Web3 技能生态。  
  [查看 PR](https://github.com/anthropics/skills/pull/1771)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在丰富垂直领域技能（如文档自动化、Web3 审计、多模态内容生成）的同时，优先修复 `skill-creator` 与 MCP 兼容性等基础工具链的稳定性问题，并建立组织级技能共享与信任治理机制。**

---

# Claude Code 社区动态日报 (2026-11-28)

## 今日速览

过去24小时内，Claude Code 仓库未发布新版本，但社区活跃度保持在较高水平。50 条更新的 Issue 中，Windows 桌面端远程控制回归 bug（#92276）与跨机会话恢复功能请求（#31992）成为讨论焦点；3 个 PR 均由机器人账号 @bpasero-ant 提交，主要涉及 Issue 陈旧标记机制的优化与去重 Agent 前台运行修复。

---

## 版本发布

过去24小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 核心指标 | 关注理由 |
|---|------|------|----------|----------|
| [#92276](https://github.com/anthropics/claude-code/issues/92276) | [BUG] Desktop 1.44121.4+ 定时任务会话不再自动启用远程控制（回归） | OPEN | 17 评论 / 13 👍 | Windows 桌面端回归 bug，影响定时任务场景下的远程控制自动化，版本从 1.40609.0 回退至 1.46388.3 均未修复。 |
| [#31992](https://github.com/claude-code/issues/31992) | [FEATURE] 跨机会话恢复 — 支持 CLI 到 CLI 的会话状态同步 | OPEN | 17 评论 / 24 👍 | 社区高度关注多设备工作流，希望在不同机器间无缝迁移会话，是 CLI 区域的核心增强需求。 |
| [#103745](https://github.com/claude-code/issues/103745) | [BUG] 无法将历史记录中的聊天添加到项目 | OPEN | 5 评论 / 0 👍 | Web 端项目管理功能缺陷，直接影响用户对历史对话的组织与复用。 |
| [#101323](https://github.com/claude-code/issues/101323) | [BUG] macOS 桌面端 Code 标签页听写不再实时显示转录文本 | OPEN | 5 评论 / 7 👍 | 回归问题，实时语音转文本体验退化，影响 macOS 桌面端可访问性与输入效率。 |
| [#68071](https://github.com/claude-code/issues/68071) | [FEATURE] Claude Code 会话无法向账号技能商店发布/更新技能 | CLOSED | 5 评论 / 4 👍 | 桌面端缺少与 Chat/Cowork 等同的“保存技能”发布流程，技能生态在桌面端体验不一致。 |
| [#109711](https://github.com/claude-code/issues/109711) | [FEATURE] 定时任务支持自定义模型与 effort 等级（当前卡在 Medium） | OPEN | 4 评论 / 1 👍 | 用户希望对定时任务的模型选择与推理强度进行更细粒度控制，提升自动化任务的成本与质量平衡。 |
| [#111552](https://github.com/claude-code/issues/111552) | [BUG] 长会话中每轮请求上传可达 1 MB，导致响应启动缓慢 | OPEN | 3 评论 / 0 👍 | 性能问题，线程续写也会携带大量历史上下文，长会话场景下网络开销显著增加。 |
| [#110654](https://github.com/claude-code/issues/110654) | [BUG] macOS 全屏点击被阻止：“点击将落在 MenuBarAgent 上” | OPEN | 3 评论 / 0 👍 | 计算机使用（Computer Use）功能在 macOS 27.2.1 全屏模式下受系统进程拦截，影响自动化操作可靠性。 |
| [#88765](https://github.com/claude-code/issues/88765) | [FEATURE] 新增 restart 命令，更新后自动恢复对话 | CLOSED | 3 评论 / 4 👍 | Windows CLI 用户期望更新后能自动重启并恢复会话，减少手动干预。 |
| [#112775](https://github.com/claude-code/issues/112775) | [BUG] 沙箱代理对允许列表中的 LAN IP 返回 502 Bad Gateway | OPEN | 1 评论 / 0 👍 | macOS 沙箱回归问题，本地网络（RFC1918）访问受阻，影响开发环境内网调试场景。 |

---

## 重要 PR 进展（共 3 条）

| # | 标题 | 状态 | 作者 | 功能/修复说明 |
|---|------|------|------|---------------|
| [#106972](https://github.com/anthropics/claude-code/pull/106972) | 在前台运行去重 Agent | CLOSED | @bpasero-ant | 修复去重任务因后台 Agent 被提前终止导致运行异常的问题；通过设置 `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` 并等待每个 Agent 完成来确保任务可靠执行。 |
| [#112684](https://github.com/anthropics/claude-code/pull/112684) | 当 sweep 标记 Issue 陈旧时在 Issue 中评论 | OPEN | @bpasero-ant | 改进 Issue 清理机制：sweep 添加 stale 标签时自动发布通知评论，单次运行最多标记 100 个 Issue，提升社区透明度。 |
| [#112436](https://github.com/anthropics/claude-code/pull/112436) | 不对可复现或高影响 Issue 标记为陈旧 | CLOSED | @bpasero-ant | 优化 stale Issue 策略：带有 `has repro`、`reproduced`、`data-loss`、`high-priority` 标签的 Issue 不再被自动标记或关闭为陈旧，保护高价值反馈不被误清理。 |

---

## 功能需求趋势

从近期 Issue 中可提炼出以下社区关注方向：

1. **跨平台与多设备协作**：跨机会话恢复（CLI-to-CLI 状态同步）成为最高赞功能请求，反映开发者在多终端环境下对无缝工作流的强烈需求。
2. **定时任务与自动化增强**：用户希望为定时任务/例行任务指定模型与 effort 等级，并修复远程控制自动启用的回归问题，表明自动化编排场景正在扩大。
3. **桌面端体验一致性**：桌面端技能发布流程缺失、听写实时转录退化、Code 标签页问题等，显示社区期望桌面端与 Web/Chat 端功能对齐。
4. **性能与网络优化**：长会话大体积上传、沙箱代理 502 错误、WSL 包管理器误判等问题集中在网络与沙箱层，性能优化是当前痛点。
5. **IDE 与编辑器集成**：LSP `documentSymbol` 缺失 `selectionRange`、VS Code 侧边栏会话列表未及时刷新等，说明 IDE 插件生态仍需打磨。

---

## 开发者关注点

**高频痛点：**
- **回归性 Bug**：多个 Issue 明确标注 `regression`（如远程控制、听写转录、沙箱 LAN 访问），版本间行为不一致导致用户信心受损。
- **平台差异化体验**：Windows、macOS、Linux、WSL 各平台存在特定缺陷（如 Windows 远程控制、macOS MenuBarAgent 拦截、WSL 原生安装误判），跨平台一致性待提升。
- **长会话性能**：历史上下文携带过重导致每轮请求体积膨胀，响应启动变慢，影响长时间开发会话的使用体验。

**高频需求：**
- 会话状态跨设备同步与恢复；
- 定时任务/例行任务的模型与 effort 控制；
- 桌面端技能发布/更新能力；
- 更新后自动重启并恢复对话（restart 命令）；
- Issue 陈旧机制更精细（避免误关闭高价值反馈，已在 PR #112436 中部分回应）。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-28  
**数据来源**: github.com/openai/codex  

---

## 1. 今日速览

过去24小时，Codex 社区围绕 **Windows/macOS 桌面端稳定性**、**跨平台会话同步** 以及 **Linux 沙盒权限** 展开密集讨论。Windows 桌面端出现多个回归性崩溃和内存泄漏问题，而 Linux 沙盒与 TUI 权限管理则成为开发团队的重点修复方向，当日合并了大量由自动化机器人提交的安全与稳定性 PR。

---

## 2. 版本发布

| 版本 | 发布时间 | 说明 |
|------|---------|------|
| `rust-v0.174.0-alpha.9` | 2026-11-27 | Rust 端 Alpha 预览版，具体变更未在发布说明中详细列出。 |

> 💡 建议关注后续完整 Release Notes，以了解 Rust 绑定或 CLI 相关的破坏性变更。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数、严重程度）筛选，涵盖桌面端、移动端、跨平台及核心 Agent 能力：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|---------|---------|------|
| #59895 | Windows: 本地项目在应用更新后切换回个人账户时消失 | Windows 桌面端更新后，本地项目列表丢失，涉及用户数据可见性。 | 74 条评论，19 👍，社区高度关注数据丢失风险 | [查看](https://github.com/openai/codex/issues/59895) |
| #62943 | [Windows][ChatGPT Work] 11 月 21 更新回归：新对话丢失权限与执行位置选择器，Max 推理等级消失 | 11 月 21 日更新导致新对话 UI 关键控件缺失，影响付费用户的工作流。 | 41 条评论，20 👍，明确标注为回归性 Bug | [查看](https://github.com/openai/codex/issues/62943) |
| #36454 | iOS 远程项目列表未与 Codex 桌面端同步 | iOS 端项目列表未以桌面端为事实来源，导致跨设备体验不一致。 | 27 条评论，持续更新至 11-27，跨平台同步痛点 | [查看](https://github.com/openai/codex/issues/36454) |
| #62967 | [macOS Desktop] 本地工作区忽略已启用的网络访问设置，强制 `CODEX_SANDBOX_NETWORK_DISABLED=1` | macOS 桌面端沙盒网络权限配置失效，影响需要联网的开发任务。 | 21 条评论，7 👍，macOS Apple Silicon 用户反馈 | [查看](https://github.com/openai/codex/issues/62967) |
| #62669 | [Windows] 某些窗口宽度下文件路径面包屑持续闪烁 | Windows 桌面端 UI 渲染问题，影响代码导航体验。 | 21 条评论，7 👍 | [查看](https://github.com/openai/codex/issues/62669) |
| #61670 | [Windows] ChatGPT Dot 可读取 Codex 项目聊天但无法转发消息 | 跨设备消息中继功能缺失，影响多设备协作场景。 | 20 条评论，3 👍 | [查看](https://github.com/openai/codex/issues/61670) |
| #55812 | 由 Codex Desktop 触发的严重内核非分页池内存泄漏（Tag: NtFc） | 长期运行导致 Windows 内核内存泄漏，属系统级稳定性问题。 | 8 条评论，0 👍，但严重性极高 | [查看](https://github.com/openai/codex/issues/55812) |
| #40299 | Agent 无法可靠管理子 Agent | 主 Agent 在子 Agent 任务耗时较长时会过早终止，影响多步骤复杂任务。 | 10 条评论，0 👍，核心 Agent 架构问题 | [查看](https://github.com/openai/codex/issues/40299) |
| #64038 | [Codex Desktop][Windows] 频繁 AppRoutes React ErrorBoundary 崩溃："Missing scope instance" | Windows 桌面端反复进入“出了点问题”回退界面，重启后状态持续。 | 8 条评论，0 👍，新近报告的崩溃 Bug | [查看](https://github.com/openai/codex/issues/64038) |
| #64362 | Linux 沙盒：`/tmp/codex-daemon-<uid>` 内的拒绝条目导致每个线程启动失败 | Linux bubblewrap 沙盒只读文件系统问题，阻止 CLI 线程启动。 | 2 条评论，0 👍，Linux 开发者受影响 | [查看](https://github.com/openai/codex/issues/64362) |

---

## 4. 重要 PR 进展（精选 10 条）

当日合并的 PR 大多由 `copyberry[bot]` 提交，聚焦于 **TUI 权限显示**、**Linux 沙盒安全**、**命令审批生命周期** 及 **会话稳定性**：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #64398 | 在读取受限 Linux 沙盒中封装合成挂载 | 防止命令修改策略未明确允许的合成目录，提升沙盒隔离性。 | [查看](https://github.com/openai/codex/pull/64398) |
| #64396 | 在 TUI 状态栏显示已确认的线程权限 | 使用服务器确认的权限而非本地配置，避免显示与实际策略不一致。 | [查看](https://github.com/openai/codex/pull/64396) |
| #64393 | 在 TUI 中跟踪服务器确认的线程权限 | 为嵌入式会话捕获服务器报告的沙盒策略快照，用于权限显示。 | [查看](https://github.com/openai/codex/pull/64393) |
| #64388 | 在 shell 快照重放前绑定 Linux 沙盒路径 | 确保 `TMPDIR`/`HOME` 相关的文件系统规则在环境变更后语义一致。 | [查看](https://github.com/openai/codex/pull/64388) |
| #64384 | 通过终端程序状态报告待处理的启动对话 | 在等待目录信任或启动钩子决策时，向终端主机发送 `OSC 7501` 阻塞记录。 | [查看](https://github.com/openai/codex/pull/64384) |
| #64382 | 退出时清理未使用的 TUI 图片粘贴文件 | 防止粘贴图片产生的临时副本在会话结束后残留在磁盘上。 | [查看](https://github.com/openai/codex/pull/64382) |
| #64369 | 远程插件审批时遵守沙盒读取限制 | 使用远程环境的沙盒策略和已存储的权限授予，避免越权属性。 | [查看](https://github.com/openai/codex/pull/64369) |
| #64368 | 审批取消时及时中断运行中的命令 | 避免历史记录写入阻塞导致同级命令继续运行，或延迟已完成命令的结果记录。 | [查看](https://github.com/openai/codex/pull/64368) |
| #64355 | 在首次尝试和重试之间共享工具审批逻辑 | 构建共享 `ApprovalContext`，统一重试请求的审批来源与网络上下文。 | [查看](https://github.com/openai/codex/pull/64355) |
| #64258 | 在 TUI 侧边栏标签页中打开 `/diff` | 允许用户在对话旁边查看工作树更改，替代全屏 diff 分页器。 | [查看](https://github.com/openai/codex/pull/64258) |

---

## 5. 功能需求趋势

从 Issues 与 PR 中提炼出的社区关注方向：

1. **跨平台会话与项目同步**  
   iOS 远程项目列表（#36454）、Web 与桌面端对话删除不同步（#47552）、账户切换后本地线程丢失（#62961）等问题反复出现，用户期望以桌面端或云端为单一事实来源，实现多设备无缝体验。

2. **桌面端稳定性（Windows/macOS）**  
   应用更新后的回归性崩溃（#62943、#63913）、内核内存泄漏（#55812）、React 路由边界错误（#64038）以及启动卡死（#60484）集中在 Windows 桌面端，macOS 也存在网络权限（#62967）和输入设备（#62725）问题，稳定性是当前最高优先级。

3. **沙盒与安全权限管理**  
   Linux 沙盒只读挂载（#64362）、Windows 沙盒内核池泄漏（#64395）、远程插件审批读取限制（#64369）等表明，社区对代码执行隔离与权限审计的要求日益提高。

4. **多 Agent 与子 Agent 可靠性**  
   主 Agent 无法可靠管理子 Agent（#40299）、持久化角色 Agent 请求（#36224）、子代理自定义模型提供商（#47752）等显示开发者希望构建更复杂的多步骤、长周期自动化工作流。

5. **TUI 与 CLI 体验增强**  
   侧边栏 diff（#64258）、权限状态显示（#64396）、图片粘贴清理（#64382）等 PR 反映终端用户界面正在向更专业、更可控的方向演进。

---

## 6. 开发者关注点

**高频痛点：**
- **Windows 桌面端回归 Bug**：近期多个更新导致 UI 控件消失、应用挂起、内核内存泄漏，付费用户（Plus/Pro）受影响明显。
- **跨设备状态不一致**：iOS、Web 与桌面端之间的项目列

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-28)

## 1. 今日速览

过去24小时内，Gemini CLI 仓库未发布新版本，但社区活跃度保持高位，共50个Issue和15个PR获得更新。核心讨论集中在 **Subagent 稳定性（特别是 MAX_TURNS 恢复与挂起问题）**、**浏览器 Agent 兼容性（Wayland、配置覆盖）** 以及 **工具调用与 Hook 机制的增强** 上。开发者正通过多个 PR 修复 CRLF 差异、GCP 项目 ID 回退及检查点恢复等核心缺陷。

## 2. 版本发布

过去24小时内无新版本发布。

## 3. 社区热点 Issues（精选10条）

| # | 标题 | 状态/优先级 | 评论 | 关注理由 |
|---|------|-------------|------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURN is reported as GOAL success | OPEN / P1 / bug | 14 | **最高优先级缺陷**。子代理在达到最大轮次限制前未执行任何分析，却向主代理汇报 `status: "success"`，导致中断被掩盖，严重影响代理可靠性。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | OPEN / P1 / bug | 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，用户需等待长达一小时才能取消。禁用子代理可暂时规避，说明代理调度逻辑存在死锁风险。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | OPEN / P2 / enhancement | 9 | 提出利用 Gemini 3 模型的原生 Bash 能力，通过零依赖 OS 沙箱和后执行意图路由增强代码库探索与编辑，属于架构方向的重大增强提案。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | OPEN / P2 / feature | 7 | 探索 AST 感知的文件读取、搜索和代码库映射，旨在通过更精确的方法边界读取减少 Token 浪费和上下文膨胀，提升代理效率。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | OPEN / P2 / bug | 7 | 用户反馈模型不会主动调用自定义技能和子代理，仅在显式指令下才使用，影响自动化工作流的落地体验。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides | OPEN / P2 / bug | 5 | 浏览器子代理完全忽略全局/项目级 `settings.json` 中的配置（如 `maxTurns`），导致配置无法生效，影响可配置性。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | OPEN / P1 / bug | 4 | 浏览器子代理在 Wayland 显示服务器下失败，涉及 Linux 桌面环境兼容性，对部分开发者构成阻断。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | Gemini CLI encounters 400 error with > 128 tools | OPEN / P2 / bug | 3 | 当可用工具超过 128 个时出现 400 错误，提示工具作用域限制机制需要优化，否则大型工具集将无法使用。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done output hook causes crash | OPEN / P1 / bug | 3 | 在 `get-shit-done` 输出钩子打印用户摘要时导致 CLI 崩溃，属于输出管道稳定性问题。 |
| [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) | ~/.gemini/agents/filename.md symlink not recognized | OPEN / P2 / bug | 4 | 代理目录下的软链接文件不被识别为子代理，限制了用户通过链接方式组织和共享代理配置的灵活性。 |

## 4. 重要 PR 进展（精选10条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#30368](https://github.com/google-gemini/gemini-cli/pull/30368) | fix(acp): support closing sessions | OPEN | 实现 ACP `session/close` 支持，允许客户端在 Gemini CLI 进程退出前释放会话，包含初始化时广告能力、处理 `unstable_closeSession` 请求及资源清理。 |
| [#30493](https://github.com/google-gemini/gemini-cli/pull/30493) | fix(core,cli): consistently support GOOGLE_CLOUD_PROJECT_ID fallback | OPEN | 在 core、CLI 和 a2a-server 中统一支持 `GOOGLE_CLOUD_PROJECT_ID` 作为 `GOOGLE_CLOUD_PROJECT` 的回退，并改进 Vertex AI 缺少位置时的错误提示。 |
| [#30496](https://github.com/google-gemini/gemini-cli/pull/30496) | fix(cli): preserve history and stop replay when checkpoint restore fails | OPEN | 检查点恢复失败时保留当前 UI 和模型历史，停止重放检查点中的工具调用，避免状态不一致。 |
| [#30489](https://github.com/google-gemini/gemini-cli/pull/30489) | fix(core): normalize CRLF line endings when computing write_file diffs | OPEN | 修复 `write-file` 工具在计算 diff 和 diffStat 时未处理 CRLF 换行，与 `edit.ts` 行为保持一致，同时保留原始内容用于行结束符检测。 |
| [#30498](https://github.com/google-gemini/gemini-cli/pull/30498) | fix(core): honor abort signal in background output reads | OPEN | 使 `ReadBackgroundOutputInvocation` 尊重 `AbortSignal`，信号已中止时立即拒绝并抛出 `AbortError`，提升后台输出读取的响应性。 |
| [#30491](https://github.com/google-gemini/gemini-cli/pull/30491) | feat(hooks): include tool_call_id in BeforeTool and AfterTool hook input | OPEN | 在 BeforeTool/AfterTool 钩子输入中加入 `tool_call_id`，使钩子可通过 ID 而非工具名+参数顺序来配对前后事件，增强可观测性。 |
| [#30490](https://github.com/google-gemini/gemini-cli/pull/30490) | fix(cli): pass config to getDisplayString in Footer | OPEN | 修复 Footer 组件中自定义模型 `displayName` 未正确解析的问题，通过传入 `config` 实例解决显示异常。 |
| [#30312](https://github.com/google-gemini/gemini-cli/pull/30312) | fix(core): describe the selected Windows shell accurately | OPEN | 准确描述 Windows 上实际选中的 Shell（如 PowerShell 5.1），并在模型面向的 `run_shell_command` 描述中说明原生参数双引号行为。 |
| [#30305](https://github.com/google-gemini/gemini-cli/pull/30305) | docs(extensions): stop recommending an excludeTools form that never matches | OPEN | 修复扩展文档中关于 `excludeTools` 的错误建议，说明当前实现仅匹配完整工具名，而非命令模式，避免用户配置失效。 |
| [#30375](https://github.com/google-gemini/gemini-cli/pull/30375) | docs: fix broken internal links | OPEN | 修复文档中损坏的内部链接（缺少 `.md` 后缀、绝对路径、重命名的锚点等），改善文档可用性。 |

## 5. 功能需求趋势

从近期 Issues 和 PR 可提炼出以下社区关注方向：

1. **子代理（Subagent）稳定性与编排**  
   多个 P1/P2 Issue 指向子代理在达到轮次限制后的状态汇报错误、通用代理挂起、子代理使用不足等问题。社区亟需更可靠的子代理恢复机制和更智能的主动调度逻辑。

2. **AST 感知的代码工具链**  
   围绕 AST-aware 文件读取、搜索和代码库映射的讨论持续升温，开发者希望通过更精确的代码结构感知降低 Token 消耗并提升代理探索质量。

3. **浏览器与跨平台兼容性**  
   Wayland 下的浏览器子代理失败、持久化会话锁恢复、配置覆盖失效等问题表明，浏览器 Agent 的跨环境稳定性是当前短板。

4. **Hook 与可观测性增强**  
   新增 `tool_call_id` 到 Hook 输入、子代理轨迹通过 `/chat share` 可见等需求，反映开发者对代理执行过程的可追踪性和可调试性有更高要求。

5. **配置与环境适配**  
   GCP 项目 ID 回退、Windows Shell 准确描述、CRLF 换行符处理等 PR 显示社区正在补全跨平台和多云环境下的基础配置支持。

## 6. 开发者关注点

- **代理挂起与崩溃**：Generalist agent 无限挂起、`get-shit-done` 钩子导致崩溃、检查点恢复失败时的状态重放等问题直接影响 CLI 可用性，是开发者反馈的高频痛点。
- **配置不生效**：`settings.json` 覆盖在浏览器 Agent 中被忽略、软链接代理未被识别、工具数量超过阈值触发 400 错误，均指向配置系统与工具作用域管理的不完善。
- **文档与可用性**：扩展文档中的 `excludeTools` 示例失效、内部链接损坏，表明文档维护与实际代码行为存在滞后，需同步更新。
- **子代理主动性**：开发者期望模型能更主动地使用自定义技能和子代理，而非仅在显式指令下才调用，这涉及提示工程与代理

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-28)

## 今日速览

OpenCode 社区在 2026-11-27 日集中爆发了大量与 v2 版本相关的问题反馈和代码提交。核心关注点集中在 **TUI 权限回归缺陷**、**Linux 后台服务内存残留**、**浏览器 Cookie 处理异常** 以及 **机器 API 数据模型重构** 四个方向。当天无新版本发布，但 50 余个 PR 的更新活跃度表明社区正处于密集迭代与修复阶段。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues

以下选取 6 个过去 24 小时内更新的 Issue（即全部最新 Issue），按严重性与影响范围排序：

| # | 标题 | 状态 | 核心内容 | 为何重要 | 链接 |
|---|------|------|----------|----------|------|
| #66861 | TUI: "ask" 权限在 shell + webfetch 中被静默允许（2.4.x 回归） | CLOSED | v2.4.1/2.4.2 中，规则解析为 `ask` 的工具直接执行，未弹出权限提示；v2.3.2 正常 | **高危安全/可用性回归**，直接影响用户对敏感操作（shell、webfetch）的控制，需优先核查回归根因 | [查看](https://github.com/anomalyco/opencode/issues/66861) |
| #66901 | service: 退出 TUI 后持久后台服务仍保留 ~450 MB RSS | OPEN | Linux 下 `opencode serve --service` 及其持久 PTY 子进程退出后仍占用大量内存（服务 ~443 MiB RSS，PTY 守护进程 ~41 MiB RSS） | 涉及 **长期运行场景下的内存泄漏/资源释放问题**，对部署稳定性有潜在影响 | [查看](https://github.com/anomalyco/opencode/issues/66901) |
| #66896 | browser: CookieMirror 忽略 Max-Age=0 / 过期 Expires 的 Cookie 删除 | OPEN | `packages/gui-plugins/src/browser/profile/link.ts` 中 `createCookieMirror` 忽略 `cause === "expired-overwrite"` 事件，导致已删除 Cookie 在下次绑定时复活 | 影响 **桌面端浏览器集成的会话与身份状态一致性**，可能导致登录态或跟踪状态异常 | [查看](https://github.com/anomalyco/opencode/issues/66896) |
| #66894 | [FEATURE]: 使 Code Mode 目录 token 预算可配置 | OPEN | 即使是简单的 `hi` 在新会话中也会消耗约 10,000 输入 token，主要由系统提示驱动 | 反映社区对 **Token 成本控制与模型预算管理** 的需求，属于典型的性能/成本优化方向 | [查看](https://github.com/anomalyco/opencode/issues/66894) |
| #66891 | 新会话无模型选择 | OPEN | 创建新会话时未出现模型选择界面 | 影响 **核心工作流的可用性**，新用户或多模型切换场景下体验受阻 | [查看](https://github.com/anomalyco/opencode/issues/66891) |
| #54173 | tui: Windows 上默认颜色文本不可见（转录体、命令面板、composer），全屏重绘可恢复 | CLOSED | 原生 Windows 下，使用主题默认前景色的文本间歇性渲染不可见，显式着色文本（标题、语法色、徽章）正常 | **跨平台 TUI 渲染缺陷**，Windows 用户体验受影响，虽已关闭但需确认是否彻底修复 | [查看](https://github.com/anomalyco/opencode/issues/54173) |

---

## 重要 PR 进展

从过去 24 小时更新的 50 个 PR 中，选取 10 个具有代表性的条目（按功能领域分类）：

### 功能与集成
1. **#66898** `fix(app): name the sign-in method in the browser step`  
   当集成仅有一种登录方式时，连接对话框直接跳转至浏览器步骤，但未显示登录方式标签（如 "Login with DigitalOcean"）。本 PR 在浏览器登录步骤中显示方法名称，改善 OAuth 集成的透明度。  
   [查看](https://github.com/anomalyco/opencode/pull/66898)

2. **#65261** `[contributor] feat(core): agent widgets`  
   为 Agent 引入交互式 Widgets：基于 PsychoScript 模板 + JSON 数据，由各客户端原生渲染，增强会话中的可视化交互能力。  
   [查看](https://github.com/anomalyco/opencode/pull/65261)

3. **#66899** `feat(app): ship automations and clean up the list`  
   将 App 中的 Automations 从 `settings > experimental` 中移出，侧边栏/标题栏/首页始终显示，并清理列表，标志着自动化功能向稳定可用阶段推进。  
   [查看](https://github.com/anomalyco/opencode/pull/66899)

### 修复与稳定性
4. **#66861 关联修复（权限回归）**  
   虽未直接列出对应修复 PR，但 Issue #66861 的高优先级暗示 v2.4.x 权限提示回归是当前修复重点。

5. **#66888** `fix(app): hide reverted messages by transcript seq, not ID`  
   修复 `/undo` 后，桌面端和 TUI 中隐藏消息的逻辑：改为按转录序列号（seq）而非 ID 隐藏，确保提交的 revert 精确移除对应消息，修复消息状态不同步问题。  
   [查看](https://github.com/anomalyco/opencode/pull/66888)

6. **#66895** `fix(cli-rs): mark /find as not ported in the slash parity test`  
   Rust 客户端尚未实现 `/find`（session.find），本 PR 在斜杠命令对等性测试中将其标记为未移植，避免 CI 失败，为 Rust TUI 与 TypeScript TUI 的功能对齐铺路。  
   [查看](https://github.com/anomalyco/opencode/pull/66895)

7. **#63322** `fix(tui): scroll the always-allow pattern list`  
   修复权限提示中 "Always allow" 列表因 `maxHeight: 15` 限制而无法滚动的问题，改善权限对话框在长模式列表下的可用性。  
   [查看](https://github.com/anomalyco/opencode/pull/63322)

### 机器 API 与核心重构（rekram1-node 连续提交）
8. **#66867** `fix(core): say why a refused machine is offline, as data`  
   机器 API 数据模型重构第一步：为被拒绝的机器提供离线原因数据，解决协议 3 与协议 2 工作者交互时的状态不明问题。  
   [查看](https://github.com/anomalyco/opencode/pull/66867)

9. **#66892** `refactor(core): keep a machine link as one state, changed by a pure step`  
   机器 API 数据模型重构第二步：将机器链接状态统一为单一状态，通过纯函数步骤变更，提升状态管理的可预测性。  
   [查看](https://github.com/anomalyco/opencode/pull/66892)

10. **#66893** `fix(core): list only usable machines as available, and ready only when connected`  
    机器 API 数据模型重构第三步：仅列出可用机器为 available，仅在连接时标记为 ready，修复机器可用性状态判定逻辑。  
    [查看](https://github.com/anomalyco/opencode/pull/66893)

---

## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **Token 预算与成本控制**  
   Issue #66894 明确请求将 Code Mode 目录的 Token 预算设为可配置，反映开发者在大模型会话中对输入 Token 消耗（尤其是系统提示驱动的高基础消耗）日益敏感。

2. **跨平台 TUI 稳定性**  
   Windows 默认颜色文本不可见（#54173）与 Linux 权限提示回归（#66861）表明，TUI 在不同操作系统上的渲染一致性与权限交互可靠性是社区关注的短板。

3. **后台服务与资源管理**  
   Linux 下退出 TUI 后后台服务仍保留 ~450 MB 内存（#66901），显示社区对长期运行服务的资源释放与进程生命周期管理有明确期待。

4. **浏览器与桌面集成的状态一致性**  
   Cookie 删除事件被忽略（#66896）以及登录方式标签缺失（#66898），都指向桌面端与浏览器插件之间身份/会话状态同步的精细化需求。

5. **机器/远程执行能力的成熟度提升**  
   连续三个机器 API 重构 PR（#66867、#66892、#66893）表明，远程机器/代理执行模型正在从实验性走向稳定，状态机建模与连接状态管理是核心改进方向。

---

## 开发者关注点

### 高频痛点
- **权限系统回归**：v2.4.x 中 `ask` 规则的工具静默执行，直接绕过用户确认，属于安全与可用性双重风险，开发者期望快速回滚或补丁修复。
- **新会话体验断裂**：新会话未弹出模型选择（#66891），影响核心工作流入口，需确认是配置缺失还是 UI Bug。
- **内存残留**：Linux 后台服务退出后未释放近 450 MB 内存，可能影响长时间运行的开发环境。

### 高频需求
- **可配置的 Token 预算**：开发者希望能够限制或配置 Code Mode 的输入 Token 上限，以控制成本。
- **更透明的 OAuth 登录流程**：单点登录时应明确显示登录方式名称，避免用户困惑。
- **Rust 客户端功能对等**：`/find` 等命

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-28)

## 今日速览

Hermes Agent 社区今日活跃度较高，共更新 18 个 Issue 与 50 个 PR。核心关注点集中在 **Gateway 性能稳定性**（macOS 冻结、会话降级逻辑、MCP 重载失败）、**插件生态迁移**（多个插件迁移至独立 Hermes 仓库）以及 **桌面端/CLI 端用户体验修复**（Android 输入重复、Kanban 工作流、Docker 启动崩溃）。暂无新版本发布。

---

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 为何值得关注 | 链接 |
|---|------|----------|--------------|------|
| #158684 | Compaction 将角色类型的工具消息发送到不支持的摘要端点 | 压缩变更导致摘要请求携带真实角色，不支持 tool messages 的端点返回 HTTP 400，Hermes 无降级重试机制 | 直接影响长对话压缩功能的可用性，P2 优先级，需尽快提供 flattened input 回退 | [查看](https://github.com/NousResearch/hermes-agent/issues/158684) |
| #150518 | macOS 上 Gateway 因 housekeeping 的全量 gc.collect() 持有 GIL 而冻结数分钟 | macOS 大堆内存下，定期内存修剪导致 GIL 被长时间占用，整个 Gateway 无响应 | 严重影响 macOS 用户的日常使用体验，属于性能与稳定性双重问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/150518) |
| #148857 | 主模型限流期间，Gateway 会话在降级失败后不再尝试已恢复的更早回退 | 会话锁定在最后一个失败的降级模型上，即使主模型已恢复也不会切回 | 影响多模型容灾切换的正确性，P2 优先级 | [查看](https://github.com/NousResearch/hermes-agent/issues/148857) |
| #160718 | `/reload-mcp` 因单个 MCP 服务器不可用而整体失败 | 即使其他服务器正常，单点不可用也会导致整个 MCP 重载中断 | 影响插件/工具链的可用性，P2 优先级 | [查看](https://github.com/NousResearch/hermes-agent/issues/160718) |
| #160945 | Cron Agent 会话永远不会获得外部内存提供商的工具（honcho_*） | 外部内存提供商已注册激活，但 Cron 任务中的 Agent 仍缺少相关工具 | 涉及定时任务与记忆系统的集成缺陷，P2 优先级 | [查看](https://github.com/NousResearch/hermes-agent/issues/160945) |
| #160932 | `convert_base64_images_to_links()` 对未终止模式呈二次方复杂度并持有 GIL | 100 KB 页面中重复的 `![` 块会阻塞整个进程约 25 秒 | Web 工具处理性能瓶颈，P2 优先级 | [查看](https://github.com/NousResearch/hermes-agent/issues/160932) |
| #160935 | Android Gboard 每个提交的单词都会重复两次 | 聊天 composer 中输入会重复，退格编辑也会闪烁/回退 | 移动端输入体验缺陷，P2 优先级 | [查看](https://github.com/NousResearch/hermes-agent/issues/160935) |
| #160941 | Docker 启动协调因单个 profile 的 `gateway_state.json` 形状错误而崩溃 | 合法 JSON 但非对象结构（如 `null`、`[]`）会导致容器启动失败 | 影响 Docker 部署的稳定性，P2 优先级 | [查看](https://github.com/NousResearch/hermes-agent/issues/160941) |
| #160934 | Kanban 审核车道工作者因缺少技能 `sdlc-review` 而硬崩溃 | `hermes update` 不会将新绑定技能种子到已有家目录，导致误导性错误 | 影响技能/插件升级后的兼容性，P2 优先级 | [查看](https://github.com/NousResearch/hermes-agent/issues/160934) |
| #28226 | 提案：多租户内存 OS 接受层，包含诊断、清单和隔离测试 | 针对长期记忆系统退化、跨租户泄露及回归测试困难提出的功能提案 | 社区对记忆系统架构演进的长期关注，P3 优先级 | [查看](https://github.com/NousResearch/hermes-agent/issues/28226) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 功能/修复说明 | 链接 |
|---|------|------|---------------|------|
| #158422 | fix(kanban): 让 Goal 工作者在中间回合后继续 | Bug | Kanban 工作者在 `goal_mode` 下将中间结果交给现有 Goal 评判，而非停止；评判请求更多工作时，工作者在同一尝试中恢复并保留对话历史 | [查看](https://github.com/NousResearch/hermes-agent/pull/158422) |
| #160942 | fix(docker): 畸形 profile `gateway_state.json` 不再中止启动协调 | Bug | 扩展 `_read_desired_state` 对非对象 JSON（`null`、`[]` 等）的容错处理，避免 Docker 容器启动崩溃 | [查看](https://github.com/NousResearch/hermes-agent/pull/160942) |
| #160933 | fix(cli): 当 stdout 管道关闭时静默退出 | Bug | 修复 `hermes ... \| head` 等场景下因管道断开导致的 traceback 崩溃，改为静默退出 | [查看](https://github.com/NousResearch/hermes-agent/pull/160933) |
| #142328 | fix(desktop): 会话切换后重绘 composer 模型 pill | Bug | 修复桌面端实时会话切换模型后，模型标签未及时更新的显示问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/142328) |
| #151523 | Desktop: 打开聊天后 OS 通知即关闭 | Bug | 修复桌面端聊天通知在用户已打开并处理后仍留在通知中心的问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/151523) |
| #142042 | fix(desktop): 将“朗读/TTS 播放”范围限定在发起会话 | Bug | 修复多会话分屏场景下 TTS 播放缺乏会话身份标识，导致跨会话混乱的问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/142042) |
| #156458 | fix(terminal): 避免 Windows Bash 命令截断 | Bug | 修复 Windows 上 Bash 包装器超过 MSYS 参数长度限制导致命令截断的问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/156458) |
| #160159 | feat(plugins): 添加 `ctx.record_data_use(requires)` 用于工具数据使用策略 | Feature | 插件可将工具结果标记为 `no_training` 或 `zero_retention`，Nous 仅将后续回合路由至符合条件的模型端点 | [查看](https://github.com/NousResearch/hermes-agent/pull/160159) |
| #160915 | feat(mcp): `mcp_request` 中间件为 `tools/call` 设置 `_meta` | Feature | 插件可为每个 MCP `tools/call` 请求设置不可伪造的 `_meta` 元数据，用于多调用者上下文传递 | [查看](https://github.com/NousResearch/hermes-agent/pull/160915) |
| #160916 | feat(api_server): `api_server_request` 钩子为回合提供请求上下文 | Feature | 为每个启动 Agent 回合的认证 API 请求添加钩子，接收请求头、方法和路径 | [查看](https://github.com/NousResearch/hermes-agent/pull/160916) |

此外，今日还有多个插件目录迁移 PR（如 #160947 redreplier、#160946 flowsery、#160715 adaptlypost）及新插件目录条目（sourcebook、offline-mail、org-files），显示插件生态正在向独立 Hermes 仓库拆分。

---

## 功能需求趋势

从今日全部 Issues 中提炼，社区最关注的功能方向包括：

1. **记忆系统与多租户隔离**：#28226 提出的多租户内存 OS 接受层，以及 #160945 中 Cron Agent 无法获取外部内存工具的问题，表明社区对长期记忆、跨租户隔离和工具注入的需求日益增长。
2. **插件与 MCP 生态稳定性**：#160718（单点 MCP 故障导致整体重载失败）和 #160938（插件依赖锁定不随环境升级）反映出用户希望插件/MCP 集成更具鲁棒性与可升级性。
3. **桌面端与移动端体验**：#160948（会话日志摘录作为上下文芯片附加到作曲器）、#160935（Android 输入重复）、#151523（通知生命周期）显示桌面端和移动端 UX 是社区反馈的重点。
4. **会话与压缩管道**：#158684、#160944、#148413 均围绕会话压缩、历史记录分页和摘要端点兼容性，说明长上下文管理仍是核心痛点。

---

## 开发者关注点

1. **性能与 GIL 阻塞**：#150518（macOS gc.collect 持有 GIL）和 #160932（正则处理二次方复杂度持有 GIL）均指向 CPU 密集型操作阻塞主线程，开发者亟需异步化或分块处理方案。
2. **容错与降级机制**：#158684（摘要端点不支持 tool messages 无重试）、#148857（降级后不尝试已恢复的主模型）、#160718（单点 MCP 故障导致整体重载失败）共同表明，Hermes

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-28)

## 今日速览

过去 24 小时 OpenClaw 仓库未发布新版本，但社区活跃度较高：9 个 Issue 更新、50 个 PR 提交。核心关注点集中在 **ACP（Agent Communication Protocol）会话状态同步**、**Android 端语音/设置体验**、**备份与临时目录机制** 以及 **多模型支持（尤其是 Google Gemini 和 OpenAI GPT-6.1）** 上。多个 P1/P2 级 Bug 已有对应修复 PR 进入待审核状态。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（共 9 条更新，精选 10 条）

| # | 标题 | 状态/优先级 | 核心内容与重要性 | 社区反应 | 链接 |
|---|------|-------------|------------------|----------|------|
| #206884 | Cron run prompt 的 "record no_change" 提示会静默作业所需回复，且 Code Mode 无输入形状 | OPEN · P1 · 🦞 diamond lobster | 自动化 Cron 任务在无变化时被提示记录 `no_change`，导致需要回复的作业被静默丢弃，且 Code Mode 下缺少输入形状定义，影响自动化可靠性。 | 新建 Issue，2 条评论，尚未获得点赞，属于高优先级消息丢失问题。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/206884) |
| #195844 | Android 原生 Talk 在识别器重启前会覆盖已最终确定的短语 | OPEN · P1 · 🦞 diamond lobster · 稳定版 | `TalkModeManager.kt` 中连续原生语音识别会在每次回调时覆盖 `lastTranscript`，350ms 后重启识别，而静默等待 700ms，导致已最终确定的语句被覆盖，存在数据丢失风险。 | 创建于 11 月 9 日，11 月 27 日更新，1 条评论，稳定版已受影响，需关注。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/195844) |
| #207039 | ACP 绑定对话中 `/compact` 压缩的是 Gateway 镜像记录而非 Harness 记录 | OPEN · P2 · 🦞 diamond lobster | `/compact` 在 ACP 绑定会话（如 Discord 线程绑定）中被 Gateway 作为本地命令处理，未转发至 ACP Harness，导致会话状态不一致。 | 新建 Issue，1 条评论，涉及会话状态核心逻辑。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/207039) |
| #207042 | 备份创建在无安全临时目录时建议重试 | OPEN · P3 · 🦞 diamond lobster | `openclaw backup create --verify` 无法获取安全 temp 根目录时拒绝创建，但诊断信息误导用户“等待当前状态操作完成”，即使无其他操作在运行。 | 新建 Issue，1 条评论，已有对应修复 PR #207048。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/207042) |
| #206647 | Android 设置“听写”就绪行显示的 Gateway 提供商与设备端听写不相关 | CLOSED · P2 · 🦞 diamond lobster | 语音设置中的“听写”就绪状态由 Gateway 转录提供商目录驱动，但聊天作曲器使用设备端语音识别器，导致状态显示错误。 | 已关闭，1 条评论，对应修复 PR #207017 已合并。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/206647) |
| #207012 | 导入独立迁移项时保留现有目标文件 | OPEN · P3 · 🌊 off-meta tidepool | 提出迁移冲突策略：保留现有目标文件，仅导入其余独立项，避免冲突阻断迁移。 | 新建 Issue，1 条评论，属于 UX 摩擦类功能需求。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/207012) |
| #207034 | 允许从 Telegram 主题发起仓库作用域的发布请求 | OPEN · P2 · 🌊 off-meta tidepool · 安全 | 允许授权用户从批准的 Telegram 主题请求受保护合并，无需授予一般操作者写入权限，需绑定仓库、分支、PR 头基并拒绝篡改/过期/重放请求。 | 新建 Issue，1 条评论，涉及安全审查与权限模型。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/207034) |
| #202818 | Android：将共享应用策略与功能所有者分离 | OPEN · P3 · 🌊 off-meta tidepool | 重构 Android 共享数据与策略，整合重复实现，保留应用行为。涉及聊天、Gateway 解析、设置、语音等通用 JSON 访问器。 | 创建于 11 月 21 日，11 月 27 日更新，1 条评论，长期维护性议题。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/202818) |
| #79223 | 功能请求：可配置的 Dream Diary 语言/提示词 | CLOSED · P2 · 🌊 off-meta tidepool | Dream Diary (`DREAMS.md`) 输出始终为英文，因提示词硬编码于 `memory-core` 插件，非英文工作区出现混合语言。 | 创建于 5 月 8 日，13 条评论，2 个点赞，社区关注多语言支持，已关闭但可能重启讨论。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/79223) |
| #207048（关联 Issue） | 备份无安全临时目录时显示权限修复 | — | 关联 Issue #207042，指出当前错误信息不指导用户修复目录权限，仅建议无效重试。 | 1 条评论，已有修复 PR。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/207042) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态/优先级 | 功能或修复内容 | 链接 |
|---|------|-------------|----------------|------|
| #207035 | chore: 复现绑定 ACP 问题后回复卡住 | OPEN · P2 · 等待作者 | 为 ACP 绑定回合提问导致通道回复卡住的问题添加回归测试，不包含分发修复。 | [查看 PR](https://github.com/openclaw/openclaw/pull/207035) |
| #207037 | fix: 当 Gateway 启动创建数据库时允许备份完成 | OPEN · P2 · 等待维护者审查 | 修复 `openclaw backup create --verify --json` 列出输入后，Gateway 启动创建托管 SQLite 数据库导致备份无归档退出的问题。备份现在会自动重试。 | [查看 PR](https://github.com/openclaw/openclaw/pull/207037) |
| #207041 | fix(google): 记录测量的上下文大小，使 Gemini 会话按真实占用率压缩 | OPEN · P2 | 修复 `test/prompt-cache-prefix-stability.google.e2e.test.ts` 在 main 上为红，确保 Gemini 会话按实际上下文占用率进行压缩，而非提前触发。 | [查看 PR](https://github.com/openclaw/openclaw/pull/207041) |
| #207036 | fix: 在 Claude CLI 回合中显示上下文使用量 | OPEN · P3 | 修复 CLI 支持的聊天在首个回合不显示上下文使用量，以及委托调用替换父调用最后测量使用量的问题。 | [查看 PR](https://github.com/openclaw/openclaw/pull/207036) |
| #207017 | fix(android): 显示设备听写可用性 | CLOSED · P2 | 修复 Android 语音设置使用 Gateway 转录提供商报告听写就绪状态的问题，改为反映设备端识别器实际状态，关联 #206647。 | [查看 PR](https://github.com/openclaw/openclaw/pull/207017) |
| #207040 | fix(update): 清理被拒绝的 Git 更新工作树 | OPEN · P2 | 清理构建成功但未通过发布检查的候选版本留下的 stale 工作树注册，仅丢弃未发布候选，保留服务检出和已发布版本。 | [查看 PR](https://github.com/openclaw/openclaw/pull/207040) |
| #207023 | refactor(subagents): 简化 ACP 生成中继所有权 | OPEN · P2 | 清理 ACP 生成与父进度中继维护中的重复资格检查、未使用中继输入和生命周期守卫，属于维护者要求的 R6 清理。 | [查看 PR](https://github.com/openclaw/openclaw/pull/207023) |
| #207048 | fix: 当备份无安全临时目录时显示权限修复 | OPEN · XS | 修复 `openclaw backup create --verify` 无法找到安全临时目录时，错误信息误导用户等待而非指导修复目录权限的问题，关闭 #207042。 | [查看 PR](https://github.com/openclaw/openclaw/pull/207048) |
| #207047 | fix(openai): 在 OpenClaw 运行时启用 GPT-6.1 Terra | OPEN · P2 | 修复选择 GPT-6.1 Terra 时运行时报 `Unknown model: openai/gpt-6.1-terra` 的问题，并将其纳入 GPT-6 请求参数策略。 | [查看 PR](https://github.com/openclaw/openclaw/pull/207047) |
| #206901 | feat: 在 Knowledge 笔记中跨词边界和词形查找 | OPEN · P2 · 知识插件 | 修复 Knowledge 关键词搜索无法匹配不同词形的问题（如葡萄牙语 `combinar` 未匹配 `combinámos`，日语 `東京` 未匹配 `明日東京で会います`）。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206901) |

---

## 功能需求趋势

从近期 Issues 和 PR 中可观察到以下社区关注方向：

1. **多语言与本地化支持**：Issue #79223 反映 Dream Diary 提示词硬编码为英文，导致非英文工作区出现语言

:::
