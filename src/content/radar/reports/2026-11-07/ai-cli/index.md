---
title: "AI CLI 工具社区动态日报"
published: 2026-11-07
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-07

> 生成时间: 2026-11-07 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-07)

## 1. 生态全景

AI CLI 工具生态正处于从“单一对话助手”向“多代理编排平台”演进的关键期。各主流工具普遍进入稳定性修复与企业级特性补齐阶段，隐私安全、会话持久化、MCP 生态兼容性成为共性瓶颈。桌面端客户端与终端 TUI 的体验差距正在缩小，但跨平台一致性仍是各工具的共同短板。整体呈现“功能扩张放缓、基础设施加固”的成熟化信号。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues (24h) | PR (24h) | Release (24h) | 最新版本 |
|------|------|-------------|---------|-------------|---------|
| OpenAI Codex | openai/codex | 33 | 50 | ✅ 2 个 | rust-v0.167.0 / v0.169.0-alpha.2 |
| Hermes | NousResearch/hermes-agent | 11 | 50 | ❌ 无 | 无新版本 |
| OpenCode | anomalyco/opencode | 未披露总数 (精选10) | 10+ | ✅ 1 个 | v2.2.6 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 14 | 3 | ❌ 无 | 无新版本 |
| Claude Code | anthropics/claude-code | 未披露总数 (精选10) | 1 | ✅ 1 个 | v2.1.319 |
| Gemini CLI | google-gemini/gemini-cli | 未披露总数 (精选10) | 10+ | ❌ 无 | 无新版本 |
| OpenClaw | openclaw/openclaw | 7 | 10+ | ❌ 无 | 无新版本 (准备 2026.9.37) |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | ❌ 无 | 无活动 |

> 注：部分仓库仅披露了“精选”热点 Issues/PR，未公开 24 小时总增量，表格中“未披露总数”表示仅基于摘要中的精选列表统计。

## 3. 共同关注的功能方向

多个工具社区在近期集中反映以下需求，表明行业正进入基础设施对齐阶段：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|---------|---------|------------|
| **桌面端稳定性与会话持久化** | Claude Code、Codex、Gemini CLI、Reasonix、Hermes | macOS 登录验证失败、Windows 项目侧边栏丢失、重启后历史对话无法打开、会话空闲后不可恢复 |
| **MCP 生态集成与兼容性** | Claude Code、Codex、OpenCode、Hermes、OpenClaw | HTTP MCP 工具列表获取失败、Node 26 依赖解析错误、远程会话创建参数缺失、MCP 服务器启动失败 |
| **TUI 交互体验优化** | Codex、OpenCode、Hermes | 模型选择器显示不全、可折叠工具输出、主题缓存导致深色/浅色模式错误、输入与滚动冻结 |
| **配额透明度与计费机制** | Claude Code、Codex、OpenCode | $10 额度异常快速耗尽、中断会话浪费配额、免费层级消息未重置、订阅共享限制误导 |
| **长上下文与子代理可靠性** | Claude Code、Gemini CLI、Reasonix | 长会话上下文被意外清空、子代理超时中断仍上报成功、AST 感知文件读取以减少 Token 浪费 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | Auto Mode 自动化、隐私安全（User-Agent 泄露）、技能模块化 | 企业级开发团队、Anthropic 生态用户 | 基于 Claude 模型的原生 CLI，强调 Auto Mode 服务器调用控制与细粒度权限策略 |
| **OpenAI Codex** | 跨平台桌面端、Computer Use、Guardian 审计系统、IDE 集成 | OpenAI 生态用户、VS Code 开发者、企业审计场景 | Rust 端稳定迭代，后端切换草稿保留，重视安全审计与多代理模式 |
| **Gemini CLI** | 子代理可靠性、AST 感知代码理解、浏览器子代理、macOS 沙箱 | Google 生态开发者、长上下文代码探索用户 | 侧重 Agent 架构（Subagent）、PTY/Seatbelt 沙箱、多模态输出内存管理 |
| **OpenCode** | 共享 MCP 连接池、GUI 插件主题、Code Mode VM、免费层级配额 | 自定义模型提供商用户、插件扩展爱好者 | 强调 MCP 连接复用、插件系统性能、字节码 VM 可挂起程序 |
| **DeepSeek Reasonix** | 上下文压缩阈值可配、会话索引、定时任务编排、MCP 治理 | 中文开发者、长对话 Agent 用户 | 桌面端 Studio 为主，feature freeze 状态下聚焦缺陷修复与统计可信度 |
| **Hermes** | 桌面自动化（computer-use）、插件 Hackathon、网关多租户、本地模型解耦 | NousResearch 生态用户、插件开发者、本地模型运维 | 网关架构重构、LocalRuntime ABC 接口、插件间 credit 交易市场 |
| **OpenClaw** | Doctor 升级兼容性、Control UI 快捷键、跨平台客户端、付费技能市场 | 跨平台客户端用户、插件市场探索者 | 侧重数据库升级路径、身份访问管理（IAM）、iroh-ffi 隧道绑定 |
| **Deepseek Harness** | 无活动 | — | 过去 24 小时无社区动态，处于停滞或低活跃状态 |

## 5. 社区热度与成熟度

- **最高活跃度**：OpenAI Codex（33 Issues + 50 PR，双版本发布）和 Hermes（11 Issues + 50 PR）在近 24 小时代码提交与社区讨论最为密集，处于快速迭代阶段。
- **次高活跃度**：OpenCode（发布 v2.2.6 并有多个 TUI/MCP 修复 PR）和 Claude Code（发布 v2.1.319 但 PR 极少，社区以 Issue 反馈为主）。
- **稳定维护期**：Gemini CLI、DeepSeek Reasonix、OpenClaw 均无新版本发布，PR 数量较少，集中在缺陷修复与回port 准备，体现成熟产品的稳定化特征。
- **低活跃/停滞**：Deepseek Harness 过去 24 小时无任何活动，需关注其项目维护状态。

## 6. 值得关注的趋势信号

1. **隐私与信任成为产品核心指标**  
   Claude Code 的 User-Agent 邮箱泄露事件（687 赞）表明，AI CLI 工具的数据泄露风险已从技术 Bug 上升为信任危机。开发者在选型时应将“隐私合规性”与“数据最小化”作为评估标准，而非仅关注模型能力。

2. **MCP 正从“概念验证”进入“生产对齐”期**  
   多个工具同时出现 MCP 工具发现失败、远程会话参数缺失、Node 版本兼容性问题，说明 MCP 生态已进入大规模落地阶段，标准化与版本兼容性将成为下半年关键竞争点。

3. **桌面端客户端体验是下一个摩擦点**  
   从 Windows 项目侧边栏丢失到 macOS 登录验证失败，桌面端状态同步与权限模型成为各工具共同的技术债。对于需要长时间运行的自动化任务，桌面端稳定性将直接影响工具可用性。

4. **配额透明度与计费可预测性影响付费转化**  
   多个工具出现“额度异常快速耗尽”“免费消息未重置”等计费争议，说明 AI CLI 的商业化模式尚未成熟。企业采购方应要求供应商提供清晰的 Token/消息计费明细与异常告警机制。

5. **子代理与本地模型模块化是架构演进方向**  
   Gemini CLI 的 Subagent 状态不一致、Hermes 的 LocalRuntime 抽象、OpenCode 的 Code Mode VM，均指向“可编排、可挂起、可审计”的 Agent 架构需求。开发者在构建内部 AI 开发平台时，应优先考虑代理生命周期管理与状态持久化能力。

---

**报告生成时间**: 2026-11-07  
**数据覆盖**: 2026-11-06 至 2026-11-07 GitHub 社区活动  
**适用对象**: 技术决策者、AI 开发平台负责人、CLI 工具选型开发者

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-07）

## 1. 热门 Skills 排行

以下按社区讨论活跃度与更新频率筛选的 8 个代表性 PR，均处于 **OPEN** 状态，尚未合并主分支。

| 排名 | Skill / PR | 功能简介 | 社区讨论热点 | 链接 |
|------|-----------|---------|------------|------|
| 1 | **mcp-builder** (#1742) | 修复 MCP Builder 在 `mcp>=2.0.0` 下的 `streamable_http_client` 导入兼容性，并支持自定义 HTTP 头配置 | MCP 协议版本迁移导致技能脚本失效，社区关注官方技能对新版 MCP SDK 的适配进度 | [#1742](https://github.com/anthropics/skills/pull/1742) |
| 2 | **skill-creator** (#1298) | 隔离触发器评估（trigger evals），修复 Windows 下 `select()` 管道失效及运行时误判问题 | 技能创建工具本身的稳定性与跨平台兼容性，直接影响社区自研技能的质量 | [#1298](https://github.com/anthropics/skills/pull/1298) |
| 3 | **notion-spec-to-implementation** (#1245) | 将 Notion 产品/技术规格拆解为 Claude Code 可执行的任务计划、验收标准与进度追踪 | 企业级需求：从产品规格直接落地到代码实现，降低规格文档与开发之间的翻译成本 | [#1245](https://github.com/anthropics/skills/pull/1245) |
| 4 | **webapp-testing** (#1980) | 移除 `with_server.py` 中 `shell=True` 的子进程调用，消除命令注入风险（CWE-78） | 安全加固成为高频议题，社区对技能脚本中的不安全 shell 调用零容忍 | [#1980](https://github.com/anthropics/skills/pull/1980) |
| 5 | **docx** (#1792) | LibreOffice 超时时返回错误而非伪成功，并验证输出 DOCX 无残留修订痕迹 | 文档自动化流程的可靠性，避免批量 DOCX 处理中静默失败 | [#1792](https://github.com/anthropics/skills/pull/1792) |
| 6 | **proofcore-contract-auditor** (#1771) | Solidity/Rust 智能合约静态分析，并将审计证明锚定至 TON 区块链 | Web3 领域对合约安全审计技能的需求，代表社区向垂直行业（区块链）延伸 | [#1771](https://github.com/anthropics/skills/pull/1771) |
| 7 | **md2video-audio** (#1703) | 基于 Marp 将 Markdown 文档转换为带真人感 AI 语音的 MP4 视频 | 内容生成与多模态输出，社区希望 Claude Code 不仅输出代码/文档，也能直接生成多媒体交付物 | [#1703](https://github.com/anthropics/skills/pull/1703) |
| 8 | **pyxel** (#525) | 复古游戏开发技能，支持 Python 游戏实现、无头输入运行、帧检查与状态验证 | 游戏开发垂直领域，且该 PR 从 3 月持续更新至 11 月，显示社区长期关注 | [#525](https://github.com/anthropics/skills/pull/525) |

> 补充：#2019（xlsx 外部链接定义名修复）和 #1681（skill-creator 打包脚本可执行性）也在近期持续获得更新，属于基础设施类高频修复。

---

## 2. 社区需求趋势

从 Issues 中提炼出四个最显著的需求方向：

### ① 安全与信任边界（最高优先级）
- **#492**：社区技能被分发在 `anthropic/` 命名空间下，存在冒充官方技能的信任边界漏洞，用户可能误将社区技能当作官方技能授予高权限。评论数 46，是 Issues 中讨论最热烈的安全议题。
- **#1980**：对技能脚本中 `shell=True` 命令注入风险的修复，反映社区对技能代码安全审计的关注度提升。

### ② 组织内技能共享与分发
- **#228**：希望在 Claude.ai 内实现组织级技能共享，避免目前通过 Slack/Teams 手动传递 `.skill` 文件的低效流程。评论 17，点赞 8，显示企业团队对技能协作的强烈需求。

### ③ 技能触发与评估机制
- **#556**：`run_eval.py` 中 `claude -p` 无法触发技能，触发率为 0%，导致技能评估失效。评论 13，点赞 7，社区急需可靠的技能触发验证流程。
- **#1298**：触发器评估误报/漏报问题，进一步印证社区对技能触发逻辑稳定性的关注。

### ④ 垂直领域与文档自动化技能
- **#1329**：提议 `compact-memory` 技能，用于长期运行 Agent 的符号化紧凑状态记录，减少上下文开销。
- **#1385**：提议推理质量管道（Pre-task Calibration → Adversarial Review → Delivery Verification），关注 AI 输出质量门禁。
- **#412**：提议 `agent-governance` 技能，覆盖 AI Agent 系统的策略执行、威胁检测与审计追踪。
- **#514 / #1792 / #1734**：围绕 DOCX/PDF 文档的排版质量控制、修订痕迹检测与孤立评论识别，文档自动化仍是持续需求。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，且功能完整度较高，可能在近期落地合并：

| PR | 技能名称 | 理由 | 状态 | 链接 |
|----|---------|------|------|------|
| #1245 | notion-spec-to-implementation / quantitative-resume-auditor | 功能完整，企业级落地场景明确，已持续更新至 10 月 | OPEN | [#1245](https://github.com/anthropics/skills/pull/1245) |
| #1771 | proofcore-contract-auditor | Web3 智能合约审计是差异化垂直能力，技术方案具体（TON 锚定） | OPEN | [#1771](https://github.com/anthropics/skills/pull/1771) |
| #1703 | md2video-audio | 多模态输出方向新颖，零成本生成 MP4，符合社区对非文本交付物的期待 | OPEN | [#1703](https://github.com/anthropics/skills/pull/1703) |
| #525 | pyxel | 复古游戏开发垂直技能，已持续维护半年以上，社区兴趣稳定 | OPEN | [#525](https://github.com/anthropics/skills/pull/525) |
| #1742 | mcp-builder (MCP v2 适配) | 基础设施类修复，MCP 协议升级是强制性兼容需求，合并优先级高 | OPEN | [#1742](https://github.com/anthropics/skills/pull/1742) |
| #1980 | webapp-testing (shell=True 移除) | 安全修复，CWE-78 命令注入风险，官方仓库大概率快速合并 | OPEN | [#1980](https://github.com/anthropics/skills/pull/1980) |

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在确保技能安全、可信与可靠触发的前提下，加速从通用文档/代码助手向垂直领域（Web3、游戏、企业文档自动化）及组织级协作的扩展。**

---

# Claude Code 社区动态日报 (2026-11-07)

## 今日速览

Claude Code 昨日发布 v2.1.319，主要调整了 Auto Mode 在 telemetry/feature flags 关闭时的服务器调用行为，并新增 `CLAUDE_CODE_AUTO_MODE_SERVER=0` 环境变量以保留旧行为。社区最高关注点集中在 **User-Agent 头泄露用户邮箱的隐私安全问题**（Issue #107757，687 个赞、98 条评论）以及长期未解决的 **频繁重新登录体验**（Issue #1757）。MCP 集成、长会话上下文丢失、Windows 终端性能回归等问题也引发开发者广泛讨论。

---

## 版本发布

### v2.1.319

**核心变更：**
- 当 Auto Mode 的 telemetry 或 feature flags 处于关闭状态（包括位于 LLM 网关后方、服务器无法检查的场景）时，相关调用将被询问或拒绝，**不再回退到内置分类器**。
- 新增环境变量 `CLAUDE_CODE_AUTO_MODE_SERVER=0`，用于保留旧的 Auto Mode 行为。
- Bedrock、Vertex 和 Foundry 不受此次变更影响。

> 注：该版本未附带详细的完整变更日志，建议生产环境升级前在测试环境验证 Auto Mode 行为。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 关注理由 |
|---|------|------|---------|----------|
| [#107757](https://github.com/anthropics/claude-code/issues/107757) | [BUG] Privacy violation in User-Agent header | OPEN | 98 / 687 | **最高优先级安全隐私问题**。Claude Code 在未经用户许可的情况下，通过 User-Agent 请求头将登录邮箱泄露给第三方 Web 搜索服务，导致用户收到大量垃圾邮件。社区强烈要求直接移除该行为，而非提供 opt-out/opt-in 设置。 |
| [#1757](https://github.com/claude-code/issues/1757) | [BUG] Claude code requires users to constantly login | OPEN | 90 / 78 | 长期未解决的认证体验痛点。用户反馈几乎每天都需要通过 Web 重新认证，即使前一天刚登录过，严重影响 CLI 工作流连续性。 |
| [#10238](https://github.com/claude-code/issues/10238) | [FEATURE] Add support for subdirectories in skills | CLOSED | 55 / 168 | 技能（Skills）模块化管理的热门需求。社区希望支持在子目录中组织 skills，以便大型项目更好地维护和复用。 |
| [#103788](https://github.com/claude-code/issues/103788) | [BUG] Claude Desktop (macOS): sign-in fails with "We couldn't verify your browser" | OPEN | 20 / 8 | macOS 桌面端登录失败，Google 和邮箱路径均返回 400，仅更换退出 IP 可让邮箱路径暂时通过。影响跨网络环境的开发者使用。 |
| [#107979](https://github.com/claude-code/issues/107979) | [BUG] Long session shows many turns as "[cleared]" | OPEN | 3 / 0 | 长会话中模型上下文被意外清空，粘贴内容和截图丢失，直接影响长时编程会话的可用性。 |
| [#107558](https://github.com/claude-code/issues/107558) | Extra usage credits ($10 reload) depleted in ~15 min under light use | OPEN | 2 / 0 | 计费计量异常。轻量使用下 $10 额度在 15 分钟内耗尽，远低于正常半天的使用时长，社区怀疑存在计量 Bug 或意外的 Token 消耗。 |
| [#107111](https://github.com/claude-code/issues/107111) | [BUG] HTTP MCP: valid tools/list result thrown as "Error POSTing to endpoint" | OPEN | 4 / 0 | MCP 集成关键问题。Google Gmail 远程 MCP 服务器连接并认证成功，但 Claude Code 丢弃了有效的 `tools/list` 响应，导致无法加载任何工具。 |
| [#108048](https://github.com/claude-code/issues/108048) | [Bug] Opus 5.5 `reasoning_extraction` refuses a Read of the user's own notes file | OPEN | 1 / 0 | 模型版本兼容性回归。Opus 5.5 拒绝读取用户本地笔记文件，与用户作用域规则文件存在依赖关系，Opus 4.8 未出现此问题。 |
| [#107267](https://github.com/claude-code/issues/107267) | [BUG] Windows Terminal: input and scroll freeze under host CPU load on 2.1.318 | OPEN | 1 / 0 | Windows 平台性能回归。在 CPU 负载下输入和滚动冻结，疑似 #63504 的回归，影响 Windows Terminal 全屏 TUI 用户。 |
| [#88993](https://github.com/claude-code/issues/88993) | [BUG] Workflow subagents interrupted at ~180s while a model request is still in flight | OPEN | 4 / 0 | 工作流子代理在模型请求仍在进行时于 ~180s 被中断，重试后冷启动且永远无法完成，影响长时自动化任务。 |

---

## 重要 PR 进展（精选 10 条）

过去 24 小时内仓库仅更新了 **1 条 Pull Request**，详情如下：

| # | 标题 | 状态 | 作者 | 说明 |
|---|------|------|------|------|
| [#107768](https://github.com/anthropics/claude-code/pull/107768) | mods: add the privacy mod | CLOSED | @poteat | 将 Claude Code 内置的 `privacy` mod 源代码发布至 `mods/privacy`。该 mod 拒绝包含已签名账户邮箱地址并命名 User-Agent 的 shell 调用，**不引入新行为**，仅开源现有隐私防护模块，供社区审计和扩展。 |

> 注：由于近期 PR 活动较少，社区讨论主要集中在 Issue 反馈和 Bug 报告上。建议关注后续关于隐私 mod、Auto Mode 及 MCP 适配的新 PR。

---

## 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

1. **MCP（Model Context Protocol）生态完善**  
   多个 Issue 指向 HTTP MCP 服务器的工具列表获取失败、远程会话创建需要 `effort` 参数等，表明开发者正在积极将 Claude Code 接入外部 MCP 服务（如 Gmail、自定义远程桥接环境）。

2. **技能（Skills）模块化与目录结构支持**  
   #10238 等需求显示，社区希望在大型项目中以子目录方式组织 skills，提升复用性和可维护性。

3. **跨平台桌面端稳定性**  
   macOS 登录验证失败、Windows 终端卡顿、Linux 桌面端启动崩溃等问题反复出现，桌面端客户端的跨平台一致性成为迫切需求。

4. **长会话上下文管理**  
   长时间会话中上下文被清空（"[cleared]"）、子代理超时中断等问题，反映开发者需要更可靠的长时编程会话支持。

5. **细粒度权限与安全策略**  
   站点权限被忽略、特定域名（如 naver.com）被误拦截、`cd + git` 组合命令触发安全提示等，社区希望获得更精细、可配置的安全策略，而非一刀切的限制。

---

## 开发者关注点（痛点总结）

1. **隐私与数据泄露**  
   User-Agent 头泄露邮箱地址是当前最严重的信任危机，社区要求 Anthropic 尽快移除该行为并提供透明说明。

2. **认证体验摩擦**  
   频繁重新登录（CLI 和桌面端）严重打断开发流程，尤其是在受限网络或代理环境下。

3. **计费透明度与计量准确性**  
   额度异常快速耗尽的报告引发对 Token 计费机制的质疑，开发者希望获得更清晰的用量明细和异常告警。

4. **模型版本回归与兼容性**  
   Opus 5.5 对特定文件读取的拒绝、Windows Terminal 性能回归等问题提示，新模型版本发布后需要更充分的回归测试。

5. **MCP 工具链集成障碍**  
   远程 MCP 服务器的工具发现失败、会话创建参数缺失等问题，阻碍了 Claude Code 作为 AI 编程助手在企业级工具链中的落地。

---

**数据来源**: [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)  
**报告日期**: 2026-11-07 | **覆盖周期**: 2026-11-06 至 2026-11-07 的 GitHub 活动

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-07  
**数据来源**: github.com/openai/codex  

---

## 1. 今日速览

Codex 社区近24小时活跃度较高，共更新 33 个 Issue 与 50 个 PR。Windows 桌面端项目丢失与 Computer Use 功能故障成为社区关注焦点；Rust 端发布 v0.167.0 稳定版与 v0.169.0-alpha.2 预览版，引入代理命令中心与后端切换草稿保留功能；PR 侧重于 Guardian 审计系统、TUI 交互优化及 SQLite 性能改进。

---

## 2. 版本发布

### rust-v0.167.0（稳定版）
**新增功能：**
- 通过 `codex agents --no-daemon` 打开代理命令中心；命令中心与会话选择器现标记未读结果（#58238, #58239, #58263, #58264）。
- 可从终端会话选择器切换已连接后端，切换时保留草稿（#58280, #58457）。

### rust-v0.169.0-alpha.2（预览版）
- 发布版本 0.169.0-alpha.2，具体变更未在摘要中详述。

[查看所有 Release](https://github.com/openai/codex/releases)

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 评论/赞 | 关注理由 | 链接 |
|---|------|---------|----------|------|
| #42739 | Windows 桌面更新后本地项目从侧边栏消失 | 79 / 7 | 评论数最高的持续性 Bug，影响 Windows 桌面端核心工作流，项目数据未丢失但 UI 不可见，用户反馈强烈。 | [链接](https://github.com/openai/codex/issues/42739) |
| #51524 | Windows Computer Use 在 get_window_state 处停止，无法获取浏览器当前 URL | 72 / 8 | 影响 Windows 端计算机使用（Computer Use）功能，窗口枚举正常但浏览器状态检索失败，阻断自动化操作。 | [链接](https://github.com/openai/codex/issues/51524) |
| #52503 | Web 端 GitHub 反复弹出“始终允许”后仍要求审批，长时间上传结果丢失 | 23 / 3 | 涉及 Web 端授权状态不同步与卡片不可用，直接阻塞代码提交流程。 | [链接](https://github.com/openai/codex/issues/52503) |
| #59895 | Windows 应用更新后切换回个人账号，本地项目消失 | 8 / 1 | 11-06 新提交，与 #42739 同类问题，表明项目侧边栏丢失在 Windows 端为反复出现的回归问题。 | [链接](https://github.com/openai/codex/issues/59895) |
| #56682 | Codex VS Code 扩展在隔离配置文件下也无法初始化 UI | 13 / 5 | IDE 集成关键问题，影响 VS Code 用户的日常开发体验，已有 5 个赞同。 | [链接](https://github.com/openai/codex/issues/56682) |
| #57190 | macOS 重启后现有会话中浏览器显示为禁用，其他会话正常 | 14 / 3 | macOS 特定的会话状态持久化 Bug，浏览器功能开关未正确恢复。 | [链接](https://github.com/openai/codex/issues/57190) |
| #32880 | Windows 回归：Git 写入在版本更新后停止，workspace-write DENY ACL 阻塞关联工作树 | 12 / 0 | 涉及 Windows 文件系统权限与 Git 自动化，对依赖 Codex 进行仓库操作的开发者影响大。 | [链接](https://github.com/openai/codex/issues/32880) |
| #56475 | 网络安全检查可能误报，阻止授权的本地开发 | 8 / 0 | 安全机制与开发者工作流冲突，属于“误杀”类问题，需明确安全边界。 | [链接](https://github.com/openai/codex/issues/56475) |
| #59386 | macOS 全屏视图隐藏项目侧边栏，主对话无独立标签页 | 7 / 3 | UI/UX 反馈，影响多标签切换效率，属于桌面端布局优化需求。 | [链接](https://github.com/openai/codex/issues/59386) |
| #45383 | 中断的 Codex 会话浪费配额重建上下文而非完成工作 | 6 / 4 | 配额计费与会话恢复机制相关，Pro/Plus 用户关注度高，涉及成本与体验。 | [链接](https://github.com/openai/codex/issues/45383) |

---

## 4. 重要 PR 进展（精选 10 条）

近24小时合并的 PR 多由 `copyberry[bot]` 提交，集中在后端架构、TUI 交互与安全审计系统：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #60011 | 为托管工具调整多代理模式指导 | 启用 `multi_agent_v2.disable_native_tools` 时，使用捆绑模式策略而非模型目录指导，保留显式模式提示。 | [链接](https://github.com/openai/codex/pull/60011) |
| #60010 | 添加共享 Windows Bazel 设置 Action | 准备 MSVC、派生 Bazel Windows 路径、下载固定 Cygwin 快照并运行 Windows 依赖引导，改善 Windows 构建流水线。 | [链接](https://github.com/openai/codex/pull/60010) |
| #60009 | TUI 登录添加自定义网关选择 | 新增默认禁用的 `gateway_setup_wizard` 功能，允许在本地登录引导过程中选择保存的自定义网关，并以该提供商重启嵌入式应用服务器。 | [链接](https://github.com/openai/codex/pull/60009) |
| #60008 | 重构 TUI 剪贴板与作曲家输入处理 | 提取图片粘贴快捷方式、粘贴突触、受限草稿编辑及作曲家活动检测等辅助函数，改善终端交互体验。 | [链接](https://github.com/openai/codex/pull/60008) |
| #60007 | 使用本地 GitHub 项目启动云端线程 | 将本地项目的 GitHub 源传递给云端预热，使新云端线程可预配置仓库检出；切换后端时保留附加的本地项目。 | [链接](https://github.com/openai/codex/pull/60007) |
| #60006 | 减少线程活动与历史的 SQLite 写入开销 | 仅更新时间戳和令牌总量，避免并发历史写入占用 SQLite 单写入连接，提升并发性能。 | [链接](https://github.com/openai/codex/pull/60006) |
| #60004 | 在 `account/read` 响应中暴露 ChatGPT 用户 ID | 向 `GetAccountResponse` 添加可空 `userId` 字段，便于下游工具识别规范 ChatGPT 用户身份。 | [链接](https://github.com/openai/codex/pull/60004) |
| #60003 | 对实时连接应用运行时身份验证 | 修复实时连接绕过运行时身份验证、复用捕获的认证头进行侧带握手的问题，统一凭证源与传输策略。 | [链接](https://github.com/openai/codex/pull/60003) |
| #59999 | 添加模型驱动的 Guardian 通道选择 | 基于审计任务、当前订阅和捕获目录选择证据通道，支持 Guardian 审计系统的通道订阅管理。 | [链接](https://github.com/openai/codex/pull/59999) |
| #59993 | 为本地消息板添加固定读取视图 | 添加 `read_view` 导出 `LocalBoardReadView`，解决并发追加导致分页结果漂移问题，保证读取一致性。 | [链接](https://github.com/openai/codex/pull/59993) |

[查看所有 PR](https://github.com/openai/codex/pulls)

---

## 5. 功能需求趋势

从近期 Issue 与 PR 中可观察到社区关注的四个主要方向：

1. **跨平台桌面端稳定性（Windows/macOS）**  
   Windows 桌面应用的项目侧边栏丢失（#42739、#59895）、Computer Use 浏览器状态失效（#51524）、Git 写入权限回归（#32880）以及 macOS 浏览器功能持久化问题（#57190）集中爆发，说明桌面端状态同步与权限模型是当前最高优先级的修复领域。

2. **IDE 与编辑器集成**  
   VS Code 扩展初始化失败（#56682）以及多个 TUI 相关 PR（#60008、#59988、#59983）显示，开发者希望 Codex 在终端与主流 IDE 中获得更流畅的嵌入体验。

3. **安全审计与授权体系（Guardian）**  
   大量 PR 围绕 Guardian 审计系统展开（#59991–#60001、#59993–#59999），包括证据传输、通道订阅、只读证据检索等，表明企业级审计与人工授权保留（#59997）是产品路线图中的重点。

4. **配额、会话恢复与计费透明度**  
   中断会话浪费配额（#45383）、Pro 升级后配额异常消耗（#59194）、订阅共享限制误导（#59915）等反映用户对令牌/消息配额计算与会话中断恢复机制的敏感度较高。

---

## 6. 开发者关注点

**高频痛点：**
- **Windows 桌面端项目数据可见性**：多个 Issue 反映应用更新后本地项目从侧边栏消失，虽源文件未丢失，但严重影响工作流连续性。
- **Computer Use / Browser Use 功能脆弱性**：Windows 端

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-07)

## 今日速览

今日 Gemini CLI 社区未发布新版本，但 Issue 与 PR 活跃度较高，围绕 **Subagent 稳定性、macOS 沙箱/PTY 修复、ACP 模式可靠性以及 API 超时配置** 展开集中讨论。开发者普遍关注 Agent 挂起、浏览器子代理失效以及长上下文场景下的资源泄露等核心痛点。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 评论 | 核心关注点 | 链接 |
|---|------|------------|------|-----------|------|
| #22323 | Subagent recovery after MAX_TURNS is reported as GOAL success | P1 / bug | 13 | 子代理在达到最大轮次后仍上报成功，掩盖中断，导致任务状态不可信。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent hangs | P1 / bug | 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，需显式禁用子代理才能恢复。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | P2 / enhancement | 9 | 提议利用模型对 Bash 的原生亲和力，通过零依赖 OS 沙箱提升代码探索与编辑能力。 | [查看](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | Assess the impact of AST-aware file reads, search, and mapping | P2 / feature | 7 | 探索 AST 感知的文件读取与搜索，以减少 Token 浪费并提升代码导航精度。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini does not use skills and sub-agents enough | P2 / bug | 7 | 模型主动调用自定义技能与子代理的意愿不足，影响自动化工作流效率。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #22267 | Browser Agent ignores settings.json overrides | P2 / bug | 5 | 浏览器代理完全忽略全局/项目级 settings.json 中的 maxTurns 等配置覆盖。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22267) |
| #21983 | browser subagent fails in wayland | P1 / bug | 4 | 浏览器子代理在 Wayland 环境下失败，影响 Linux 桌面端用户体验。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #24246 | Gemini CLI encounters 400 error with > 128 tools | P2 / bug | 3 | 工具数量超过阈值时触发 400 错误，建议按作用域限制可用工具。 | [查看](https://github.com/google-gemini/gemini-cli/issues/24246) |
| #23571 | Model frequently creates tmp scripts in random spots | P2 / bug | 3 | 模型在受限 Shell 执行下倾向于在多个目录生成临时脚本，增加工作区清理成本。 | [查看](https://github.com/google-gemini/gemini-cli/issues/23571) |
| #20079 | ~/.gemini/agents/filename.md symlink not recognized | P2 / bug | 4 | 代理目录下的软链接文件不被识别为子代理，限制了代理的模块化管理。 | [查看](https://github.com/google-gemini/gemini-cli/issues/20079) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #30185 | fix(cli): prevent recursive interactive gemini sessions in shell mode | OPEN | 防止在 Shell 模式（`!`）和 `[Shell]` 工具中递归启动交互式 Gemini 会话，拒绝不支持的 CLI 配置子命令。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30185) |
| #30189 | fix(core): reject MessageBus.request() immediately when publish fails | OPEN | 消息总线请求在发布失败时立即拒绝，释放定时器与响应监听器，避免等待完整 60s 超时。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30189) |
| #30183 | fix(core,cli): allow overriding 60s API headers timeout | CLOSED | 支持通过 `model.requestTimeoutMs` / `GEMINI_API_HEADERS_TIMEOUT_MS` 跨认证模式覆盖 60s API 头部超时，修复长思考请求被误判为超时并重播的问题。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30183) |
| #30184 | fix(core): close orphan /dev/ptmx master FD leaked on macOS PTY spawn | CLOSED | 修复 macOS 下 `@lydell/node-pty` 1.1.0 的 PTY 主文件描述符泄漏，防止长时间会话耗尽 `kern.tty.ptmx_max`。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30184) |
| #30186 | fix(core,cli): prevent terminal model-turn 400s on resume and main-thread JSONL freezes | CLOSED | 修复恢复会话时出现 `400 INVALID_ARGUMENT` 以及主线程 JSONL 冻结问题，提升会话中断后的恢复稳定性。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30186) |
| #30182 | fix(core,cli): prevent silent multi-minute loading hangs on network failures | CLOSED | 解决网络超时、TLS 拦截或 `ALL_PROXY` 配置下 CLI 长时间显示加载 spinner 且无错误输出的静默挂起问题。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30182) |
| #30180 | fix(core): bound multi-part tool outputs and evict older multimodal inlineData | CLOSED | 限制多部分工具输出并回收旧的多模态 inlineData，修复长时间代理会话中的 V8 堆内存溢出（OOM）崩溃。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30180) |
| #30181 | fix(vscode): eliminate barrel import bundle bloat | CLOSED | 将 VS Code 伴随插件的桶导入替换为窄子路径导入，使扩展包体积从 ~13.8 MB 降至 ~2.7 MB，显著提升启动性能。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30181) |
| #30164 | fix(cli): resolve folder trust before entering macOS Seatbelt sandbox | OPEN | 在进入 macOS Seatbelt 沙箱前解决文件夹信任问题，修复沙箱内无法访问 `~/.gemini/trustedFolders.json` 导致的启动崩溃。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30164) |
| #30165 | fix(acp): handle mid-stream retries to prevent text concatenation | CLOSED | 修复 ACP 模式下中流重试导致部分文本和工具调用被错误拼接执行的问题，增加回合状态清理机制。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30165) |

---

## 功能需求趋势

从近期 Issues 与 PR 中可观察到以下社区关注方向：

1. **子代理（Subagent）可靠性与可见性**：开发者强烈希望子代理能准确报告终止状态（如 MAX_TURNS 中断不应被标记为 GOAL 成功），并希望通过 `/chat share` 查看子代理轨迹，以便评估与调试。
2. **AST 感知的代码理解**：多个 Issue 提出使用 AST 感知的文件读取、搜索与代码库映射工具（如 AST grep、tilth、glyph），以减少 Token 浪费并提升代码导航精度。
3. **浏览器代理稳定性**：Browser Agent 在 Wayland 下失效、忽略 settings.json 配置、缺乏会话接管与锁恢复机制，成为跨平台自动化的关键短板。
4. **长上下文与资源管理**：针对超大工具集（>128 工具）导致的 400 错误、多模态输出引发的 OOM、以及长思考请求的 API 超时，社区正推动更细粒度的资源边界与超时配置。
5. **企业级与沙箱安全**：macOS Seatbelt 沙箱、文件夹信任解析、Telemetry 脱敏（skill_name 白名单）等企业与安全特性正在逐步完善。

---

## 开发者关注点

- **Agent 挂起与状态不一致**：通用代理挂起（#21409）和子代理虚假成功（#22323）是目前影响核心体验的高优先级 Bug，社区期待尽快修复并回归测试。
- **配置覆盖不生效**：Browser Agent 忽略 `settings.json` 覆盖（#22267）及代理文件软链接不被识别（#20079）反映出配置系统在子代理与特殊 Agent 场景下的覆盖不完整。
- **平台特定稳定性**：macOS PTY 文件描述符泄漏（#30184）、Seatbelt 沙箱信任（#30164）以及 Wayland 下的浏览器代理失效（#21983）表明跨平台适配仍是持续投入点。
- **长时间运行的可观测性**：开发者反馈网络失败时 CLI 出现静默加载挂起（#30182），以及 ACP 模式下配额重试不可见（#30187），需要更透明的错误上报与超时通知机制。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报
**日期**: 2026-11-07  
**仓库**: github.com/esengine/DeepSeek-Reasonix  
**数据周期**: 2026-11-06 过去24小时

---

## 1. 今日速览

今日社区活动集中在 Reasonix Studio 2.x 线（studio branch）的稳定性与可用性问题上，共更新 14 个 Issue、3 个 PR，暂无新版本发布。核心关注点包括上下文压缩阈值可配置、Windows 端项目会话索引卡死、GTX1070 显卡兼容性崩溃，以及对话重启后丢失等桌面端 Bug。同时，社区正推进 Issue/PR 大规模分诊清理，仓库处于 feature freeze 状态，仅接受缺陷修复、回归与安全变更。

---

## 2. 版本发布

过去24小时内无新版本 Release。

---

## 3. 社区热点 Issues（精选10条）

| # | 标题 | 状态 | 核心内容 | 为何重要 | 链接 |
|---|------|------|----------|----------|------|
| #14994 | 增加调节自动压缩上下文阈值的选项 | OPEN | 请求在「上下文详情」面板增加可调节的自动压缩阈值，当前显示 `已使用 7.3k / 模型容量 1.0M`，用户希望更灵活控制长上下文行为。 | 涉及 Agent 长对话体验与 Token 成本控制，是 v3 活跃开发线的配置增强需求。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14994) |
| #14987 | 2.57.0 项目线程列表长时间空白：session-catalog 未进入，history 索引卡在 scanning | OPEN | Windows 端 Reasonix Studio 2.57.0，工作区扫描后项目线程列表长期空白/转圈，重启无效。本地 sessions 约 266 MB，存在 33 个孤儿 `.meta.lock` 和 1 个 `.atomic-*.tmp` 残留。 | 桌面端核心功能故障，直接影响用户访问历史会话，需优先排查 session-catalog 索引机制。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14987) |
| #14985 | 关闭软件重启后，之前形成的对话都无法打开 | OPEN | Windows v2.56.1，重启后点击历史对话提示「没有这个对话」。 | 数据持久化或会话索引丢失问题，严重影响用户工作流连续性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14985) |
| #14983 | GTX1070 显卡拖动窗口/最大化导致程序未响应 | OPEN | 使用 GTX1070 时拖动改变窗口大小或最大化导致程序（含任务栏图标）未响应，Intel Iris Xe 则正常。v2.57.0。 | 硬件加速/渲染层兼容性 Bug，涉及旧显卡用户群体的基础可用性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14983) |
| #14986 | “文件改动”显示在非预期的位置 | OPEN | 设置描述为「在输入框上方显示文件改动」，实际出现在输入框内部上方。v2.57.0。 | UI 细节缺陷，影响开发者对代码变更的直观感知。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14986) |
| #14991 | 定时任务单独入口，类 WORKBUDDY，支持会话中自动生成定时任务 | OPEN | 用户建议增加独立定时任务入口，并在会话中通过自然语言自动生成定时任务供确认。 | Agent 自动化编排方向的功能需求，反映社区对任务自动化的期待。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14991) |
| #14990 | 防范智能体本身问题，MCP 加载后自动感知问题 | OPEN | 用户希望系统能识别并防范智能体自身的问题，特别是加载 MCP 后能自动意识到 MCP 配置存在的问题。 | 涉及 Agent 安全性与可观测性，MCP 生态成熟后的治理需求。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14990) |
| #14988 | 内核繁忙，操作可能未收到，重试前请先确认 | OPEN | Windows v2.57.0，出现「内核繁忙」提示，操作可能未被接收。 | 后端处理能力或并发锁机制问题，影响交互响应可靠性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14988) |
| #14993 | 开放 Issue 清理提案 — 628 条分诊结果与分批处置建议 | OPEN | Meta 议题，针对仓库开放 Issue 列表（涉及 v1/v2/v3）提出 628 条分诊与分批处置建议。当前活跃开发线为 2.x Studio。 | 仓库治理与技术债清理，影响未来 Issue 处理优先级与资源分配。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14993) |
| #14995 | 开放 PR 清理提案 — 31 条分诊结果与冻结期处置建议 | CLOSED | Meta 议题，针对 31 条开放 PR（全部 base 为 studio 分支）提出处置建议，仓库当前处于 feature freeze。 | 明确了 feature freeze 期 PR 处理原则，对贡献者指南具有指导意义。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14995) |

---

## 4. 重要 PR 进展（精选3条，过去24小时更新共3条）

| # | 标题 | 状态 | 功能/修复内容 | 链接 |
|---|------|------|--------------|------|
| #14782 | feat(stats): a range counts the calls its money cannot include | OPEN | 统计聚合增强：区分未定价调用、估算/回退卡定价调用、无卡记录行，使总数更诚实地反映遗漏信息。依赖 #14946。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14782) |
| #14550 | fix(status): name the payload and its busy fact | CLOSED | 修复 `GET /status` 载荷可读性：将 `busy` 事实命名，区分「有运行中的 turn」与「turn 已结束」，该接口为 App 最频轮询载荷（34 个 key）。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14550) |
| #14946 | feat(usage): every day says whether it can be trusted | CLOSED | `reasonix doctor usage` 新增范围可信度报告：输出分母及三类未知项（无价格调用、估算/回退卡定价、费率不可用调用）。堆叠于 #14782。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14946) |

> 注：过去24小时内更新的 PR 仅 3 条，其中 2 条已合并/关闭，1 条仍处于 OPEN 状态，均由 @chuiwenwei 提交，聚焦于统计、状态载荷与使用量可信度的工程质量改进。

---

## 5. 功能需求趋势

从本日全部 14 个 Issue 中提炼，社区最关注的功能方向如下：

1. **Agent 上下文与记忆管理**  
   用户希望可调节自动压缩阈值（#14994），反映对长上下文对话成本与性能的精细化控制需求。

2. **桌面端稳定性与会话持久化**  
   Windows 平台多个会话索引、对话丢失、内核繁忙问题（#14987、#14985、#14988），表明 session-catalog 与本地存储层是当前稳定性瓶颈。

3. **Agent 自动化编排与定时任务**  
   类 WORKBUDDY 的定时任务入口（#14991）及基于会话上下文自动生成任务的需求，显示社区希望 Reasonix 从「对话助手」向「自动化 Agent」延伸。

4. **MCP 与智能体治理**  
   用户期望系统能自动感知 MCP 配置问题并防范智能体自身缺陷（#14990），MCP 生态治理成为新兴关注点。

5. **硬件兼容性与渲染优化**  
   GTX1070 等旧显卡的窗口操作崩溃（#14983），提示需要加强对非集成显卡的适配与回退机制。

---

## 6. 开发者关注点

**高频痛点：**
- **会话数据可靠性**：重启后对话无法打开、项目线程列表长期空白，涉及本地 SQLite 索引与 JSONL 会话文件的一致性问题。
- **Windows 桌面端体验**：多个 Bug 集中在 Windows v2.56.1/v2.57.0，包括显卡兼容性、UI 位置偏差、内核繁忙提示。
- **并发与锁机制**：任务因权限询问卡住后，其他任务写入被占用无法解锁（#12337），工作空间粒度锁设计可能存在并发缺陷。

**开发者行动建议：**
- 优先修复 session-catalog 索引卡死与会话持久化 Bug，恢复 Windows 桌面端核心可用性。
- 在 feature freeze 期内，将精力集中在缺陷修复、回归与安全变更上，新功能（如定时任务、MCP 治理）建议列入 v3 后续里程碑。
- 推进 #14993 与 #14995 的分诊清理建议，降低 Issue/PR 积压，提高社区贡献的处理效率。

---

**数据来源**: [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)  
**生成时间**: 2026-11-07

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-07)

## 今日速览

OpenCode 昨日发布 **v2.2.6** 版本，引入共享 MCP 连接池与 GUI 插件主题等新特性。社区围绕免费层级限制、TUI 模型选择器及桌面客户端会话稳定性展开广泛讨论，多个 TUI 与 MCP 相关的 Bug 与功能请求获得修复或跟进。

## 版本发布

### v2.2.6
- **共享 MCP 连接 (Shared MCP Connections)**：为 MCP 服务器开启连接池后，相同配置的项目可共享单一连接，减少进程数量并加快启动速度。([#61185](https://github.com/anomalyco/opencode/pull/61185))
- **GUI 插件主题与新插槽**：GUI 插件支持主题定制及新增插槽位（内容未完全展示）。([#61185](https://github.com/anomalyco/opencode/pull/61185))

[查看完整 Release 详情](https://github.com/anomalyco/opencode/releases/tag/v2.2.6)

## 社区热点 Issues

以下 10 个 Issue 昨日更新活跃或社区关注度高，建议重点跟进：

| # | 标题 | 状态 | 关注理由 | 链接 |
|---|------|------|----------|------|
| #59387 | [zen] Free tier issues: read this first, then post your report here | OPEN | 免费层级问题总贴，315 条评论、23 个赞，社区反映“免费消息额度未重置”“版本过期”等持续痛点，是当前用户反馈最集中的议题。 | [链接](https://github.com/anomalyco/opencode/issues/59387) |
| #62447 | [triaging] tui: model picker shows only subset of declared custom provider models | OPEN | TUI 模型选择器仅显示 7 个自定义 Ollama 模型中的 3 个，重启后仍未修复，影响自定义提供商用户的日常使用。 | [链接](https://github.com/anomalyco/opencode/issues/62447) |
| #40096 | [FEATURE]: Collapsible tool output (code/diff/blocks) in TUI | OPEN | 请求在 TUI 中增加可折叠的工具输出块（Write/Edit/Shell 等），长会话下降噪并便于追踪思考链，已有 5 条评论跟进。 | [链接](https://github.com/anomalyco/opencode/issues/40096) |
| #62452 | limit message | OPEN | 用户反复收到“今日免费消息已用完”提示且无法重置，导致无法继续使用，属于紧急的用户可用性问题。 | [链接](https://github.com/anomalyco/opencode/issues/62452) |
| #62448 | [FEATURE]: Better provider management settings in the desktop client | OPEN | 桌面客户端提供商管理设置亟待改进，社区呼吁更完善的供应商配置界面。 | [链接](https://github.com/anomalyco/opencode/issues/62448) |
| #62442 | desktop: stuck session stays running; interrupt returns false and delete times out | OPEN | 桌面端会话卡死，中断返回 false，删除超时（499 错误），严重影响会话生命周期管理。 | [链接](https://github.com/anomalyco/opencode/issues/62442) |
| #62441 | mcp: notebooklm-mcp@latest fails to start on Node 26 | OPEN | `notebooklm-mcp@latest` 在 Node.js 26 上因依赖解析失败（`ERR_MODULE_NOT_FOUND: hono/ws`）无法启动，暴露 MCP 服务器对新版 Node 的兼容性风险。 | [链接](https://github.com/anomalyco/opencode/issues/62441) |
| #62438 | [reproduced] Local plugins are re-evaluated per Location | OPEN | 本地插件会按 Location 重复评估，导致插件工作量随打开目录数量线性增长，存在性能隐患。 | [链接](https://github.com/anomalyco/opencode/issues/62438) |
| #61511 | [triaging] agent: Crouton Alpha stalls mid-turn | CLOSED | 代理在多步任务中中途停滞，需用户手动推进才能继续，影响自动化体验。 | [链接](https://github.com/anomalyco/opencode/issues/61511) |
| #52457 | [reproduced] TUI stays dark on a light terminal after a dark palette was cached | CLOSED | 浅色终端下 TUI 因缓存的深色调色板而错误启动为深色模式，主题检测逻辑存在缺陷。 | [链接](https://github.com/anomalyco/opencode/issues/52457) |

## 重要 PR 进展

昨日合并或更新的 10 个重要 PR，涵盖 Bug 修复、功能增强与文档更新：

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #62450 | release: v2.2.6 | OPEN | 将 v2.2.6 发布的版本号和变更日志同步回 dev 分支。 | [链接](https://github.com/anomalyco/opencode/pull/62450) |
| #62437 | feat(tui): collapse tool details behind a clickable header | CLOSED | 回应 #40096，为 TUI 工具详情增加可点击标题折叠（`session.tool_details: show/collapse`），减少长会话噪声。 | [链接](https://github.com/anomalyco/opencode/pull/62437) |
| #62248 | fix(tui): use the terminal's light or dark mode over a cached palette | CLOSED | 修复 #52457，TUI 启动时优先采信终端实时报告的主题，而非缓存的调色板。 | [链接](https://github.com/anomalyco/opencode/pull/62248) |
| #62245 | fix(tui): return to MCP list after OAuth sign-in | CLOSED | 修复 #51060，TUI 中 MCP OAuth 登录完成后返回列表，而非直接关闭对话框。 | [链接](https://github.com/anomalyco/opencode/pull/62245) |
| #62244 | fix(tui): allow favoriting models without a connected integration | CLOSED | 修复 #50969，TUI `/models` 对话框中模型收藏功能在未连接集成时也可正常使用。 | [链接](https://github.com/anomalyco/opencode/pull/62244) |
| #62242 | fix(app): only attach comment @mentions that exist | CLOSED | 修复 #50393，Composer 不再将 Slack 风格的 `@here` 等非路径 @ 词误判为缺失文件。 | [链接](https://github.com/anomalyco/opencode/pull/62242) |
| #62250 | fix(core): keep agents whose description starts with a bracketed tag | CLOSED | 修复 #54200，Agent 前置描述以 `[` 开头时不再被 YAML 解析器误判而静默丢弃。 | [链接](https://github.com/anomalyco/opencode/pull/62250) |
| #62201 | fix(app): show re-imported sessions after deletion | OPEN | 修复 #62177，同一窗口中删除后重新导入的会话能正确显示在侧边栏和主页列表中。 | [链接](https://github.com/anomalyco/opencode/pull/62201) |
| #62413 | feat(codemode): expose the VM's suspendable program API | CLOSED | 从 `@opencode/codemode` 暴露字节码 VM 的可挂起程序 API（`program`、`resume`、`Snapshot` 等），为 Code Mode VM 奠定基础。 | [链接](https://github.com/anomalyco/opencode/pull/62413) |
| #62444 | feat(core): enable the Code Mode VM by default in dev builds via the flag registry | CLOSED | 将 `codemode_vm` 纳入功能标志注册表，开发构建中默认启用 Code Mode VM。 | [链接](https://github.com/anomalyco/opencode/pull/62444) |

## 功能需求趋势

从昨日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **TUI 交互体验优化**：可折叠工具输出（#40096、#62437）、模型选择器完整显示（#62447）、模型收藏提示（#50969、#62244）等需求集中，用户希望终端界面更清晰、操作更直观。
2. **桌面客户端稳定性与设置**：会话卡死（#62442）、提供商管理设置缺失（#62448）、Linux 自定义标题栏（#36225）等反映桌面端仍是体验短板。
3. **MCP 生态兼容性**：Node 26 依赖解析失败（#62441）、并行调用丢失会话头（#59640）、ACP 工具就绪通知缺失（#62454）表明 MCP 服务器集成与跨版本兼容性是当前重点。
4. **免费层级与配额透明度**：#59387 与 #62452 显示用户对免费额度重置机制和订阅提示的困惑度很高，亟需更清晰的配额说明与重置逻辑。
5. **插件与代理框架**：本地插件按 Location 重复评估（#62438）、Code Mode VM 默认启用（#62444）等表明社区正在推动插件系统与代理执行框架的性能与可扩展性提升。

## 开发者关注点

- **免费层级配额问题**：#59387 作为高评论总贴，社区对“免费消息未重置”“版本过期”提示的困扰持续发酵，建议官方尽早给出明确的重置机制说明或修复。
- **TUI 主题与模型选择器 Bug**：缓存调色板导致主题错误（#52457）、自定义提供商模型显示不全（#62447）直接影响日常可用性，属于高优先级修复项。
- **桌面端会话生命周期**：中断失效、删除超时（#62442）及重新导入后会话不可见（#62201）表明桌面客户端的会话状态管理仍需加固。
- **MCP 服务器启动与 Node 版本兼容**：#62441 暴露出部分 MCP 服务器

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期**: 2026-11-07  
**仓库**: NousResearch/hermes-agent  

---

## 1. 今日速览

今日 Hermes 社区活跃度较高，共更新 11 个 Issue 与 50 个 PR，围绕 macOS 桌面端浏览器交互、会话生命周期、插件生态及包管理器稳定性展开。值得注意的是，多个与 `pnpm` 包管理器相关的安全修复已合并，同时插件目录迎来 Hackathon 新插件（Valun、Diké、CrashLab），社区正在推动本地模型运行时与网关架构的解耦重构。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 为何值得关注 | 链接 |
|---|------|---------|-------------|------|
| #133006 | macOS Desktop 表单填充失败：浏览器目标失效与代理恢复循环 | macOS 桌面会话无法完成研究生申请账号注册，浏览器目标为空/过期，代理陷入未验证的恢复循环。 | 涉及核心桌面自动化能力（computer-use），直接影响最终用户在 macOS 上的实际任务完成率，P2 优先级。 | https://github.com/NousResearch/hermes-agent/issues/133006 |
| #147920 | computer-use：bring_to_front 在会话空闲后永久失效 | macOS 上 cua-driver 会话空闲后，`focus_app` 与 `bring_to_front=true` 的输入调用全部被拒绝，需重启网关才能恢复。 | 会话空闲后的不可恢复性是桌面代理的严重可用性缺陷，影响长时间运行的自动化任务。 | https://github.com/NousResearch/hermes-agent/issues/147920 |
| #149154 | Kanban：更新排水会杀死运行中的 Worker，并为未获会话的卡片消耗尝试次数 | `hermes update` 触发网关排水（drain），导致五个健康 Kanban 卡片被错误消耗尝试次数，属于主机生命周期缺陷。 | 涉及任务调度与状态一致性，对依赖 Kanban 工作流的团队有直接影响。 | https://github.com/NousResearch/hermes-agent/issues/149154 |
| #147832 | 显式 `-t` 工具集选择未生效，网关路径仍加载所有插件与 MCP 服务器 | `hermes chat -t session_search` 最终获得所有未列入 `known_plugin_toolsets` 的插件工具集及所有启用的 MCP 服务器。 | 安全与配置问题，用户无法通过显式参数限制工具集范围，可能导致意外的工具调用。 | https://github.com/NousResearch/hermes-agent/issues/147832 |
| #150329 | 审批门控：Shell 函数/别名可隐藏危险命令，管道到 Shell 的未标记沉淀点 | `f(){ rm "$@"; }; f -rf /` 等构造可绕过 `detect_hardline_command` 与 `detect_dangerous_command` 规则。 | 涉及代理安全边界与审批机制的绕过风险，属于高优先级安全隐患。 | https://github.com/NousResearch/hermes-agent/issues/150329 |
| #150362 | 与版本戳无关的配置迁移（46, 50）在当前版本戳配置上从不运行 | `STAMP_INDEPENDENT_STEPS` 文档声明应在每次迁移时运行，但实际 CLI/更新路径从未进入该逻辑。 | 可能导致从未发布的网关运行时构建跳过关键配置迁移，引发升级后的配置不一致。 | https://github.com/NousResearch/hermes-agent/issues/150362 |
| #150361 | 从 v0.23.0 预-PM 安装执行 `hermes update` 后丢失所有额外组件（messaging, mcp） | 首次构建 PM 代际时未包含 `[all]` + `[messaging]` 等额外组件，Telegram、Discord、Slack 及 MCP 更新后消失。 | 影响从旧版本升级的用户体验，可能导致通信集成功能意外丢失。 | https://github.com/NousResearch/hermes-agent/issues/150361 |
| #150354 | 内存提供商召回掩盖向量搜索失败：dense_score 始终为 0.0 且无日志 | `memory.provider: mnemosyne` 启用时，向量后端失败会静默降级为仅全文搜索，返回结果无警告。 | 影响记忆检索的可靠性与可观测性，开发者难以发现向量搜索已失效。 | https://github.com/NousResearch/hermes-agent/issues/150354 |
| #150033 | [CLOSED] fix(js)：拒绝使用其他版本的 pnpm（engines.pnpm） | 修复 `pnpm-workspace.yaml` 中 `pmOnFail: ignore` 导致的版本锁写入问题，确保 osv-scanner 能正确读取锁文件。 | 已合并的安全修复，解决依赖漏洞扫描盲区。 | https://github.com/NousResearch/hermes-agent/issues/150033 |
| #150032 | [CLOSED] fix(pm)：~/.npmrc 中的纯 HTTP npm 镜像阻止 PM 安装 pnpm | PM 通过用户配置的 npm 注册表下载 pnpm，但 `Download.run` 拒绝非回环 HTTP URL，导致内网镜像场景下安装失败。 | 已合并，修复企业内网/私有镜像环境下的安装阻塞。 | https://github.com/NousResearch/hermes-agent/issues/150032 |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 功能/修复说明 | 状态 | 链接 |
|---|------|--------------|------|------|
| #150297 | refactor(pm)：将 pnpm 版本锁仅保留在 pm/lock.json | 消除 `package.json` `devEngines.packageManager.version` 与 `pm/lock.json` 的重复存储，移除同步写入逻辑。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150297 |
| #150364 | fix(js)：拒绝在 JS 工作区文件夹运行 npm install，保留 npx 与 npm run | 依赖 #150297 合并后生效，防止在 JS 工作区误执行全量 npm install。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150364 |
| #150363 | feat(plugin-catalog)：添加 Valun 插件（Hermes Agent Plugin Hackathon） | 让 Hermes 代理与其他独立代理进行服务换 credit 交易，支持自主协商、本地密钥签名与交付审查。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150363 |
| #150164 | feat(catalog)：添加 CrashLab 社区插件 | 在受控故障下测试已保存的浏览器旅程，通过独立 SQLite 观察者验证持久状态，并对比对照组。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150164 |
| #150359 | refactor(local-models)：为本地模型运行时添加 ABC 接口 | 引入 `LocalRuntime` 抽象基类，定义核心 Hermes 与本地模型实现之间的契约，为将本地模型提取为独立包做准备（Part 1 of 3）。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150359 |
| #150288 | feat(gateway)：控制套接字响应哪个网关服务于某个配置文件 | 第三方客户端无需每次连接都 spawn Python 命令，即可通过控制套接字查询网关服务归属与拨号方式。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150288 |
| #150126 | feat(tui)：在用户自身消息后添加可选遮挡条 | TUI 记录中为用户提示添加全宽遮挡条，便于在长推理/工具调用后快速定位自身输入，参考 Codex/opencode 设计。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150126 |
| #150289 | fix(gateway)：插件 RPC 成为可检测的契约成员，会话事件在托管环境下正常工作 | 修复 #142005 合并后的三个缺口：插件 JSON-RPC 方法可被检测，会话事件能正确推送给托管环境的查看者。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150289 |
| #150152 | llm.oneshot 恢复 schema 与 redact；插件通过自身 RPC 获得结构化输出 | 回滚错误合并的 #142006，恢复 `llm.oneshot` 至上一金丝雀版本形态，并为插件提供文档化的结构化输出路由。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150152 |
| #150360 | feat(plugin-catalog)：添加 Diké 插件（Hermes Agent Plugin Hackathon） | 原生 Hermes 插件，核对法律简报中每篇智利法条引用，基于本地哈希识别的 25 部法规，无法证明的内容拒绝认证。 | OPEN | https://github.com/NousResearch/hermes-agent/pull/150360 |

---

## 5. 功能需求趋势

从本日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **桌面自动化与会话稳定性**：macOS 桌面端浏览器交互（form-filling、bring_to_front）及会话空闲后的恢复机制是最高优先级的痛点，社区期望更可靠的 computer-use 能力。
2. **插件生态扩展**：Plugin Hackathon 活跃，Valun（代理间交易）、CrashLab（浏览器故障测试）、Diké（法律引用核对）等插件相继加入目录，插件化能力正成为社区创新的重要阵地。
3. **网关与客户端解耦**：通过控制套接字查询网关归属、允许第三方客户端在 session.create 时自命名，表明社区正推动网关向多客户端、多租户架构演进。
4. **本地模型模块化**：引入 `LocalRuntime` ABC 接口，为将本地模型运行时从核心代码

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报
**日期**: 2026-11-07  
**数据来源**: github.com/openclaw/openclaw  

---

## 1. 今日速览

今日社区围绕 **Doctor 升级兼容性**、**Control UI 快捷键冲突** 以及 **跨平台客户端体验** 展开活跃讨论。P1 级别的内存 FTS 表阻断 Doctor 升级问题已配套 PR 修复，而长期存在的浏览器快捷键碰撞与 ChatGPT 内嵌浏览器加载异常仍待产品决策。暂无新版本发布，但 2026.9.37 extended-stable 的回port 准备工作正在推进。

---

## 2. 版本发布

过去 24 小时内 **无新 Release**。  
当前关注版本为 `2026.9.37 extended-stable`（PR #194367 正在准备回port），以及主线 `2026.11.1`（`4ffdd20`）。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 核心内容与重要性 | 链接 |
|---|------|-------------|------------------|------|
| #194358 | Doctor 拒绝包含 OpenClaw 自身内存 FTS 表的 beta.6 代理数据库 | P1, 🦞 diamond lobster, ux-friction | 严重升级阻断：v16 数据库若包含懒加载的内存全文索引，Doctor 会在 `media-persistence` 阶段因未知表停止，影响现有用户升级路径。已有配套 PR #194359。 | [查看](https://github.com/openclaw/openclaw/issues/194358) |
| #163739 | 使 Control UI 的 Ctrl+Shift+A (Archive) 可配置，避免与浏览器快捷键冲突 | P2, 🦞 diamond lobster, ux-friction | 长期 UX 痛点：Archive 快捷键与浏览器原生快捷键冲突且无法禁用/重映射，已有 12 条评论，社区关注度高。 | [查看](https://github.com/openclaw/openclaw/issues/163739) |
| #194366 | MCP relay Control UI 在 ChatGPT 内嵌浏览器停留于连接骨架，Brave 正常 | P2, 🦪 silver shellfish, ux-friction | 新报告：授权成功后，ChatGPT 内嵌浏览器卡在 "Loading…"，而 Brave 正常，排除了 CIMD 元数据失败（#193979），可能与内嵌 WebView 策略相关。 | [查看](https://github.com/openclaw/openclaw/issues/194366) |
| #191008 | ClawHub 技能提供：公司研究任务（付费研究，免费搜索额度耗尽时使用） | P3 | 生态扩展：基于 x402 按次付费 API 的 ClawHub 技能，代理在免费额度用尽后可购买公司研究简报，体现社区对付费技能市场的探索。 | [查看](https://github.com/openclaw/openclaw/issues/191008) |
| #184709 | 支持 ElevenLabs 批量转录的关键词提示 | P3, clawsweeper:bulk-filed | 功能请求：允许通过 `providerOptions.elevenlabs` 向 Scribe v2 传入显式词汇表，改善专有名词转录准确率。 | [查看](https://github.com/openclaw/openclaw/issues/184709) |
| #189354 | 通过 zalouser 通道搜索并发送原生 Zalo 贴纸 | P3, clawsweeper:bulk-filed | 插件生态：针对 Zalo 个人插件的贴纸搜索与发送支持，利用现有 `sticker-search` 和 `sticker` 消息动作。 | [查看](https://github.com/openclaw/openclaw/issues/189354) |
| #183537 | 考虑将 ShieldCortex 和 multi-clawd 加入官方插件目录或验证发布者列表 | P3 | 生态治理：Drakon Systems 维护的两款开源插件（内存/动作安全、多账号 Claude 故障转移）已在自有车队运行，申请官方认可。 | [查看](https://github.com/openclaw/openclaw/issues/183537) |

> 注：过去 24 小时内更新的 Issue 共 7 条，以上列出全部；其余 3 条已包含在上表中。

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 功能/修复说明 | 状态 | 链接 |
|---|------|------|---------------|------|------|
| #194359 | fix: 允许 v16 Doctor 升级期间接收已发布的内存 FTS | 修复 | 修复 #194358，让 Doctor 在 v16 升级时正确识别 OpenClaw 自身的内存 FTS 虚表及 SQLite 影子表，解除升级阻断。 | OPEN | [查看](https://github.com/openclaw/openclaw/pull/194359) |
| #194354 | fix: OpenClaw ID 登出/登录后在已批准浏览器上要求重新批准 | 修复 | 修复网关在同一已批准浏览器上重复登录时，错误要求重新批准角色/作用域的问题（OCF-495）。 | OPEN | [查看](https://github.com/openclaw/openclaw/pull/194354) |
| #194367 | chore(release): 准备 2026.9.37 extended-stable | 发布准备 | 为 extended-stable 网关线准备 2026.9.37，涵盖隐私边界、会话账户连续性、有界解析、通道恢复及更新/状态安全等回port 修复。 | OPEN | [查看](https://github.com/openclaw/openclaw/pull/194367) |
| #186888 | feat: 在 Control UI 中实时查看运行中命令自动化的输出 | 功能 | 解决长时间命令自动化在完成前不显示输出的问题，让操作者可在 Automations 运行历史中实时查看脚本输出。 | OPEN | [查看](https://github.com/openclaw/openclaw/pull/186888) |
| #194368 | fix(codex): 保留一次性客户端关闭宽限期 | 修复 | 修复 Codex 一次性运行在原生回合结束后，客户端清理阶段因 `close()` 触发传输关闭而失败的问题。 | OPEN | [查看](https://github.com/openclaw/openclaw/pull/194368) |
| #192979 | fix(deepinfra): 对 Nemotron 3.5 Super VL 遵守 thinking off | 修复 | 修复 DeepInfra 模型在请求序列化前丢失显式思考关闭设置，导致默认开启推理的问题。 | OPEN | [查看](https://github.com/openclaw/openclaw/pull/192979) |
| #194323 | fix(ios): 侧边栏行在会话到达视口上方时跳动 | 修复 | 修复 iOS 侧边栏在新置顶会话到达滚动视口上方时的布局跳动，保持用户阅读位置不变。 | OPEN | [查看](https://github.com/openclaw/openclaw/pull/194323) |
| #188826 | fix: 任务停止时保持 Windows 托管更新存活 | 修复 (P0) | 修复 Windows 计划任务在停止网关时会杀死自身助手，导致 Control UI 卡在 "Activating" 且任务被禁用的问题。 | OPEN | [查看](https://github.com/openclaw/openclaw/pull/188826) |
| #194142 | fix(control-ui): 首个聊天帧显示缓存详情 | 修复 | 修复 Control UI 首个聊天帧未显示缓存详情的问题（等待作者处理，arm B 资格门禁未通过）。 | OPEN (draft) | [查看](https://github.com/openclaw/openclaw/pull/194142) |
| #194174 | feat(iroh-ffi): 为 OpenClaw ID 隧道添加 uniffi 绑定 | 功能 | 为 macOS/iOS/Android 原生 OpenClaw ID 节点应用提供符合 `openclaw/tunnel/1` 的 iroh 传输绑定，解决关闭原因仅为文本且无数字应用关闭码的问题。 | OPEN (waiting on author) | [查看](https://github.com/openclaw/openclaw/pull/194174) |

---

## 5. 功能需求趋势

从本期 Issues 与 PR 中可提炼出以下社区关注方向：

1. **跨平台客户端体验优化**  
   iOS 侧边栏布局跳动（#194323）、Android 部分模型目录刷新失败说明（#194365）、Windows 托管更新存活（#188826）表明移动端与桌面端稳定性是当前重点。

2. **插件生态与市场化**  
   Zalo 贴纸（#189354）、ElevenLabs 关键词提示（#184709）、ClawHub 付费研究技能（#191008）以及官方插件目录申请（#183537）显示社区正在积极扩展垂直领域插件并探索付费技能模式。

3. **模型提供商适配与推理控制**  
   DeepInfra Nemotron thinking off（#192979）、Talk 咨询不支持的思考偏好（#194184）反映开发者对模型推理参数细粒度控制的需求增加。

4. **数据库升级与元数据兼容性**  
   Doctor 内存 FTS 阻断（#194358/#194359）提示社区对代理数据库版本迁移的兼容性要求极高，尤其是自建索引与系统表的共存问题。

5. **身份与访问管理（IAM）细节打磨**  
   OpenClaw ID 浏览器重复批准（#194354）、iroh-ffi 隧道绑定（#194174）表明身份认证与隧道传输层仍在持续完善。

---

## 6. 开发者关注点

- **升级路径阻断**：P1 级的 Doctor 内存 FTS 问题直接影响现有用户从 beta.6 升级，需尽快合并 #194359 并发布补丁。
- **

:::
