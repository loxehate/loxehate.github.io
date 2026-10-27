---
title: "AI CLI 工具社区动态日报"
published: 2026-10-27
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-27

> 生成时间: 2026-10-27 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-10-27)

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单一对话助手”向“可扩展多代理开发平台”演进的关键期。四大主流工具（Claude Code、OpenAI Codex、Gemini CLI、OpenCode）均在插件系统、MCP 工具链兼容性及子代理编排上投入较多，但稳定性与计费透明度成为普遍瓶颈。DeepSeek Reasonix 侧重桌面端 Studio 体验与多会话并发，Hermes 则聚焦 Discord 网关与终端工具链。整体呈现“功能快速堆叠、底层稳定性待补齐”的特征，社区对可扩展性与跨平台一致性的诉求日益集中。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Release | Issues（精选/总计） | PR（精选/总计） | 主要活跃度特征 |
|------|------|-------------|-------------------|----------------|--------------|
| Claude Code | anthropics/claude-code | v2.1.311 | 10 条精选（最高 275 评论） | 10 条精选 | 版本迭代频繁，插件系统（Mods）讨论热度极高 |
| OpenAI Codex | openai/codex | rust-v0.165.0-alpha.3 | 10 条精选（最高 65 评论） | 10 条精选（50 条更新） | 自动化机器人提交 PR 密集，跨平台稳定性问题集中爆发 |
| Gemini CLI | google-gemini/gemini-cli | 无 | 10 条精选（最高 13 评论） | 10 条精选 | 无新版本，子代理与 Agent 稳定性为核心痛点 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | v2.52.0 (Studio + CLI) | 10 条精选（最高 18 评论） | 10 条精选 | 双版本同步发布，UI/UX 与多会话并发讨论活跃 |
| OpenCode | anomalyco/opencode | 无 | 11 条更新（10 条精选，最高 65 评论） | 50 条更新（10 条精选） | 免费额度与插件热重载问题引发高强度讨论 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 无 | 无 | 无 | 过去 24 小时无活动 |
| Hermes | NousResearch/hermes-agent | 无 | 10 条精选 | 10 条精选 | Discord 网关与 MCP 工具链稳定性为核心关注点 |

> 注：Issues/PR 数量均基于日报中“精选”条目统计，非全量仓库数据。

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重合的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **插件系统与可扩展性** | Claude Code、OpenCode、Gemini CLI | Claude Code 围绕 Mods 插件系统展开 275 条评论讨论；OpenCode 推进桌面端 GUI 插件及 TUI 合成消息 API；Gemini CLI 在 ACP 权限请求中加入 MCP 元数据 |
| **MCP 工具链兼容性与资源管理** | Claude Code、OpenAI Codex、Gemini CLI、Hermes | Claude Code 出现 `anyOf: [X, null]` 参数不可用及子代理指令冗余（~12k tokens）；Codex 存在 MCP 进程栈泄漏导致线性内存增长；Hermes 反映 `tools.include` 编辑会卸载活跃连接工具 |
| **跨平台稳定性（Windows/macOS/Linux）** | OpenAI Codex、Claude Code、Gemini CLI | Codex 桌面端渲染器内存泄漏（4–7 GB）及崩溃；Claude Code Linux 上 API TCP 重置；Gemini CLI Wayland 下浏览器子代理失败 |
| **子代理与 Agent 编排可靠性** | Claude Code、Gemini CLI、OpenCode | Claude Code 子代理接收所有 MCP 服务器指令导致 Token 浪费；Gemini CLI 子代理状态误报为成功及通用代理挂起；OpenCode 后台子代理完成后父代理会话更新丢失 |
| **计费/额度透明度与防护** | Claude Code、OpenCode | Claude Code Pro 用户 5 小时额度在 3 小时内被异常耗尽；OpenCode 免费模型速率限制绑定 IP 可被 VPN 绕过，新用户首次即触发超限误判 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 企业级可扩展性、安全审计（security-guidance）、MCP 生态集成 | 专业开发团队、企业级用户 | 基于 Anthropic 模型，强调 Hooks/Mods 插件架构，提供细粒度安全规则与 agentic 评审 |
| **OpenAI Codex** | 跨平台桌面端体验、模型目录整合（GPT-6.1 Terra）、TUI 交互 | 个人开发者、ChatGPT Plus/Pro 用户 | Rust 客户端，深度整合 OpenAI 模型目录与云厂商（Vertex/Bedrock），侧重桌面端稳定性 |
| **Gemini CLI** | Agent 编排稳定性、AST 感知代码理解、移动端（Android/Termux）兼容性 | AI 原生应用开发者、移动端开发者 | 侧重子代理状态机、代码索引效率，推进 AST 感知文件读取与手术式读取以降低 Token 耗 |
| **DeepSeek Reasonix** | 桌面端 Studio 体验、多会话并发、壁纸场景等个性化功能 | 创意开发者、多项目并行开发者 | Studio + CLI 双版本同步迭代，侧重 UI/UX 布局、会话分组与模型路由预算隔离 |
| **OpenCode** | 免费层额度机制、插件生命周期管理、ACP 多代理协议 | 开源爱好者、自托管用户 | 强调客户端完成检查（/goal）、实验性 SDK 命名空间，ACP 协议细节修复频繁 |
| **Hermes** | Discord 网关集成、终端工具链、MCP 动态配置 | Discord 社区运营者、终端重度用户 | 以 Discord 会话准入为核心，关注 SSE 流内存管理与凭证环境隔离 |
| **Deepseek Harness** | — | — | 过去 24 小时无活动，社区关注度低 |

## 5. 社区热度与成熟度

- **最高活跃度**：Claude Code（插件系统 Mods 讨论达 275 条评论，版本 v2.1.311 持续迭代）与 OpenCode（单日 50 条 PR 更新，免费额度问题引发 65 条评论的大型 Issue）。
- **快速迭代阶段**：OpenAI Codex（Rust 客户端 alpha 版本频繁发布，由自动化机器人批量合并 PR，正在快速补齐跨平台稳定性短板）；DeepSeek Reasonix（双版本 v2.52.0 同步发布，功能与 UI 双线推进）。
- **稳定性瓶颈期**：Gemini CLI（无新版本，子代理挂起与状态误报等 P1/P2 Bug 集中）；Hermes（Discord 准入冲突导致无限重试，MCP 连接拆解问题待根因修复）。
- **低活跃度**：Deepseek Harness（过去 24 小时无任何 Issue/PR 更新）。

## 6. 值得关注的趋势信号

1. **插件化成为标配**：Claude Code 的 Mods 系统、OpenCode 的桌面端 GUI 插件、Gemini CLI 的 ACP 元数据扩展，表明 AI CLI 正从“封闭工具”转向“可扩展平台”。开发者应评估工具的插件生态成熟度与沙箱隔离能力。

2. **MCP 从“接入”转向“治理”**：多个工具出现 MCP 工具不可用、进程泄漏、子代理指令冗余等问题，说明 MCP 生态已进入规模化采用阶段，下一阶段竞争点将是资源回收、协议版本契约与 Token 成本控制。

3. **免费层与计费信任危机**：Claude Code 与 OpenCode 均出现计量异常或额度误判问题，免费 AI CLI 工具的防刷机制与配额透明度将成为用户留存的关键因素。

4. **多代理编排可靠性是下一道门槛**：子代理状态误报、会话更新丢失、长任务挂起等问题普遍存在，Agent 编排层的状态一致性与恢复机制尚未成熟，企业级采购需重点考察此类容错能力。

5. **跨平台一致性仍是短板**：Windows 终端鼠标跟踪、macOS 渲染器内存泄漏、Linux 证书库与 Wayland 兼容性问题频发，桌面端 AI CLI 的跨平台 QA 投入明显不足，开发者在选型时应优先验证目标操作系统的稳定性。

**决策建议**：若追求企业级可扩展性与安全审计，Claude Code 生态最为成熟；若侧重跨平台桌面体验与模型多样性，OpenAI Codex 迭代最快但需关注稳定性；若需要移动端或 AST 感知代码理解，Gemini CLI 方向契合；多会话并发与桌面个性化场景可优先考察 DeepSeek Reasonix。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-10-27）

> 数据来源：github.com/anthropics/skills（官方 Skills 集合仓库）。注：PR 列表中评论数字段均显示为 `undefined`，以下排序综合了 PR 更新时效性、技术影响范围及 Issue 端关联度进行判断。

---

## 1. 热门 Skills 排行

| 排名 | PR | 功能简述 | 社区讨论热点 | 当前状态 | 链接 |
|------|-----|---------|-------------|---------|------|
| 1 | #1245 | 新增 `notion-spec-to-implementation`（产品/技术规范拆解为 Notion 可执行任务）和 `quantitative-resume-auditor`（简历定量审计）两个 Skill | 企业级知识工作流自动化需求强烈；Notion 生态集成是社区高频诉求 | OPEN（创建于 2026-06-02，最近更新 2026-10-15，活跃度高） | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 2 | #1742 | `mcp-builder` 适配 `mcp>=2.0.0`：`streamable_http_client` 重命名及自定义 HTTP 头配置 | MCP 协议版本迭代导致现有连接脚本失效，是当前技术债务修复的焦点 | OPEN（创建于 2026-09-08，最近更新 2026-10-08） | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 3 | #1298 | `skill-creator`：隔离触发评估（trigger evals），修复 Windows 子进程管道及运行时失败误报 | 触发机制可靠性直接影响 Skill 实用性；跨平台（Windows）兼容性是社区痛点 | OPEN（创建于 2026-06-10，最近更新 2026-09-16） | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 4 | #1681 | `skill-creator`：支持直接执行 `package_skill.py`，更新引用路径与 CLI 帮助 | 技能打包工具链可用性问题，影响社区自行贡献和分发 Skill 的门槛 | OPEN（创建于 2026-08-27，最近更新 2026-10-24） | [查看 PR](https://github.com/anthropics/skills/pull/1681) |
| 5 | #1997 | `skill-creator`：修复 YAML frontmatter 标量解析（引号丢失、续行拼接错误） | 元数据解析不准会导致技能描述与评估命令失效，属于基础设施级修复 | OPEN（创建于 2026-10-10，最近更新 2026-10-19，极新） | [查看 PR](https://github.com/anthropics/skills/pull/1997) |
| 6 | #1980 | `webapp-testing`：移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用自动化测试的安全性问题，社区开始关注 Skill 脚本的安全边界 | OPEN（创建于 2026-10-06，最近更新 2026-10-25） | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| 7 | #1771 | 新增 `proofcore-contract-auditor`：Solidity/Rust 智能合约静态分析，并将审计证明锚定至 TON 区块链 | Web3/智能合约安全审计是细分但高价值的新方向，体现社区向区块链领域延伸 | OPEN（创建于 2026-09-15，最近更新 2026-09-16） | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 8 | #525 | 新增 `pyxel` 技能：Python 复古游戏开发、调试、头less 运行与帧检查 | 游戏开发垂直领域 Skill，更新持续到 2026-10-23，显示社区对创意编程工具的持续关注 | OPEN（创建于 2026-03-05，最近更新 2026-10-23） | [查看 PR](https://github.com/anthropics/skills/pull/525) |

---

## 2. 社区需求趋势

从 Issues 端（共 12 条，按评论数排序）可提炼出以下四大需求方向：

### ① 技能信任与分发安全（最高优先级）
- **#492**（46 评论，3 👍）：社区技能被分发在 `anthropic/` 命名空间下，存在冒充官方技能的信任边界漏洞。用户担心授予本应仅限官方技能的高权限。
- **#228**（17 评论，8 👍）：期待在 Claude.ai 内实现组织级技能共享，避免手动下载/上传 `.skill` 文件的低效协作流程。

###② 技能触发与评估机制可靠性
- **#556**（13 评论，7 👍）：`run_eval.py` 中 `claude -p` 无法触发技能/命令，触发率为 0%，导致技能质量无法自动化验证。
- **#202**（8 评论，1 👍）：`skill-creator` 本身更像开发者文档而非可执行技能，亟需按最佳实践重写，提升 Token 效率与可操作性。

###③ 垂直领域新 Skill 提案
- **#1329**（10 评论）：`compact-memory`——面向长周期 Agent 的符号化紧凑状态记忆，解决上下文被冗长笔记占用的问题。
- **#1385**（6 评论）：推理质量门禁流程（Pre-task Calibration → Adversarial Review → Delivery Verification），关注 AI 输出全生命周期质量把控。
- **#412**（6 评论）：`agent-governance`——AI Agent 系统的安全模式，包括策略执行、威胁检测、信任评分与审计追踪。

###④ 现有 Skill 稳定性与文档修复
- **#189**（6 评论，9 👍）：`document-skills` 与 `example-skills` 插件安装内容重复，导致 Claude Code 上下文窗口出现重复技能。
- **#2064**、**#2018**、**#1868**：分别针对 `theme-factory` 描述不明确、`docx` 合并运行产生非法 XML、`slack-gif-creator` 渐变色计算偏移等具体 Bug。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、技术路径清晰，若维护者审核通过，可能在近期落地：

1. **#1245 `notion-spec-to-implementation` + `quantitative-resume-auditor`**  
   已开放超过 4 个月且持续更新（最近 10 月中旬），涉及企业级文档转任务与简历审计两个高频场景，合并后将直接丰富官方技能库的办公自动化能力。  
   [查看 PR](https://github.com/anthropics/skills/pull/1245)

2. **#1742 `mcp-builder` MCP 2.0 适配**  
   修复 `mcp>=2.0.0` 的破坏性变更，涉及官方技能构建工具链的核心兼容性，优先级高，合并可避免大量现有 MCP 技能失效。  
   [查看 PR](https://github.com/anthropics/skills/pull/1742)

3. **#1980 `webapp-testing` 安全加固**  
   消除 `shell=True` 命令注入风险，符合当前对 AI 运行脚本安全的高度关注，合并难度低、收益明确。  
   [查看 PR](https://github.com/anthropics/skills/pull/1980)

4. **#1681 `skill-creator` 打包脚本可执行性修复**  
   降低社区贡献新技能的门槛，有助于扩大官方技能库的外部贡献规模。  
   [查看 PR](https://github.com/anthropics/skills/pull/1681)

5. **#1771 `proofcore-contract-auditor`**  
   虽然时间较短，但引入了区块链锚定审计证明的创新机制，若合并将是官方技能库在 Web3 安全领域的首个里程碑。  
   [查看 PR](https://github.com/anthropics/skills/pull/1771)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可信、可安全分发、可跨组织共享的技能基础设施，同时修复触发评估与打包工具链的基础可靠性问题，以支撑更多垂直领域（如企业办公、Web3 安全、游戏开发）的新 Skill 落地。**

---

# Claude Code 社区动态日报 (2026-10-27)

## 今日速览

Claude Code 发布 v2.1.311 版本，主要针对自托管运行器（self-hosted-runner）新增空闲会话保持能力，并修复了启动及恢复后的长时间卡顿问题。社区围绕 **Mods 插件系统扩展性**（Issue #91870，275 条评论）展开热烈讨论，同时 MCP 工具链兼容性、API 连接稳定性以及计费计量异常成为开发者今日关注的核心痛点。

---

## 版本发布

### v2.1.311

- **self-hosted-runner 新增参数**：`--hold-idle-file` 和 `--max-hold-min`，用于在主机报告仍有运行进程时保持空闲会话，遻免会话被意外终止。
- **Explanatory 输出风格提示**：在用户请求 Claude 进行解释时，会显示相应使用提示。
- **修复启动卡顿**：解决了启动及恢复会话后出现的长时间冻结问题（具体修复细节在原文中被截断）。

[查看完整 Release 详情](https://github.com/anthropics/claude-code/releases/tag/v2.1.311)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 核心标签 | 关注理由 |
|---|------|------|---------|----------|----------|
| [#91870](https://github.com/anthropics/claude-code/issues/91870) | Mods - make Claude 10x more extensible | OPEN | 275 / 131 | `enhancement`, `area:hooks`, `area:plugins` | 社区最高热度议题。Anthropic 团队已在 10 月 1 日发布社区微更新，正在快速响应插件系统反馈，标志着 Claude Code 可扩展性进入关键交付期。 |
| [#105112](https://github.com/claude-code/issues/105112) | Opus 5.5 since Oct 19: does the research, then answers against it | OPEN | 2 / 0 | `area:model` | 模型质量回退。Opus 5.5 自 10 月 19 日起修正率从 5.2% 飙升至 25.4%，即“先做研究再与之对答”，直接影响代码生成可信度。 |
| [#105015](https://github.com/claude-code/issues/105015) | 5-hour limit drained 0% → 100% in ~3h with zero requests | OPEN | 2 / 0 | `area:cost`, `platform:linux` | 计费计量异常。Pro 用户在无任何请求的情况下，5 小时额度在 3 小时内被耗尽，引发对计费准确性的担忧。 |
| [#73514](https://github.com/claude-code/issues/73514) | WebFetch: prompt-based extraction ignored — full raw page dumped into context | OPEN | 6 / 0 | `area:tools`, `platform:macos` | WebFetch 忽略 `prompt` 参数，直接将整页原始内容注入上下文，3-4 次抓取即耗尽 1M-token 窗口，严重影响长上下文会话。 |
| [#103488](https://github.com/claude-code/issues/103488) | "Connection lost mid-response" caused by TCP resets from 160.79.104.10 | OPEN | 5 / 0 | `area:networking`, `api:anthropic`, `platform:linux` | API 连接稳定性。用户通过抓包确认 TCP RST 源自 Anthropic 服务器（160.79.104.10），非本地网络问题，多个 Issue 指向同一现象。 |
| [#104236](https://github.com/claude-code/issues/104236) | Mods: cc-plugin-sec-default passes over user-tier classic hooks silently | OPEN | 4 / 1 | `area:hooks`, `area:plugins` | Team 组织下内置安全插件会静默覆盖用户层级的 `classic.Stop/StopFailure/SessionStart` 钩子，导致自定义模组失效。 |
| [#87723](https://github.com/claude-code/issues/87723) | Claude Cowork: Project chats sort by creation date, not last activity | OPEN | 4 / 6 | `area:cowork`, `enhancement` | 体验优化。Cowork 项目聊天按创建时间排序导致活跃会话被埋没，社区呼吁改为按最后活动时间排序。 |
| [#105223](https://github.com/claude-code/issues/105223) | MCP tools with required `anyOf: [X, null]` params are unusable | OPEN | 1 / 0 | `area:mcp`, `bug` | MCP 协议回归。严格模式下的 `anyOf: [X, null]` 参数无法发送 JSON `null`，导致 Metabase 等服务工具不可用，为 #81911 的回归问题。 |
| [#104791](https://github.com/claude-code/issues/104791) | Subagents receive all MCP servers' instructions (~12k tokens) | OPEN | 1 / 0 | `area:mcp`, `area:cost`, `area:agents` | Token 浪费。子代理即使 `tools:` 列表排除某些 MCP 服务器，仍会接收所有服务器指令（约 12k tokens），连接 20 个服务器时开销显著。 |
| [#105212](https://github.com/claude-code/issues/105212) | following AGENTS.md significant issue | OPEN | 6 / 0 | `area:model`, `area:hooks`, `platform:macos` | AGENTS.md 遵循问题。新建 Issue 反映模型在遵循项目 AGENTS.md 指令方面存在显著缺陷，影响代码规范落地。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#105303](https://github.com/anthropics/claude-code/pull/105303) | Install marketplace plugins from claude-plugins-official | OPEN | 从 `claude-plugins-official` 市场安装插件，需在 `claude-plugins-official#6905` 和 `#6906` 合并后再合并，避免用户获得旧版 `code-review` 插件。 |
| [#96434](https://github.com/anthropics/claude-code/pull/96434) | security-guidance: keep denied and secret files out of the reviewer's reach | CLOSED | 修复 #96276，安全指导审查不再包含被 Read 规则拒绝的文件及 `.env`、密钥等敏感文件；新增 `SG_SKIP_SECRET_FILES=0` 退出环境变量。 |
| [#87079](https://github.com/anthropics/claude-code/pull/87079) | fix(security-guidance): make ** glob patterns match zero-depth paths | CLOSED | 修复 `**/*.ts` 因 `fnmatch` 行为导致顶层文件被静默排除的安全规则失效问题，确保 glob 模式按文档预期匹配任意深度。 |
| [#85409](https://github.com/anthropics/claude-code/pull/85409) | security-guidance: update default model refs from Opus 4.7/Sonnet 4.6 to Opus 5/Sonnet 5 | CLOSED | 将 security-guidance 插件中的默认模型引用从 Opus 4.7/Sonnet 4.6 更新为当前的 Opus 5/Sonnet 5。 |
| [#81426](https://github.com/anthropics/claude-code/pull/81426) | fix(security-guidance): support Windows venv layout | CLOSED | 修复 Windows 下 agentic 评审因 `claude_agent_sdk` 未系统安装而不可用的问题，支持 win32 虚拟环境布局。 |
| [#79237](https://github.com/anthropics/claude-code/pull/79237) | Fix: add _is_isolated_worktree guard | CLOSED | 增加隔离工作树检查，防止 `spawn_task/chip` 变更父仓库检出，避免在共享主分支上误执行 `git checkout -b`。 |
| [#76640](https://github.com/anthropics/claude-code/pull/76640) | fix: load macOS system certificates and handle NO_PROXY blackhole for Bun runtime | CLOSED | 修复 macOS 上 Bun 运行时因未加载系统证书库导致的“自签名证书”错误，并处理 `NO_PROXY` 黑洞场景。 |
| [#76475](https://github.com/anthropics/claude-code/pull/76475) | Flag innerHTML/outerHTML += append sink in security-guidance | CLOSED | 修复 `innerHTML_xss`/`outerHTML_xss` 规则仅匹配直接赋值，遗漏 `el.innerHTML += userInput` 等追加式 XSS 注入点。 |
| [#74021](https://github.com/anthropics/claude-code/pull/74021) | fix(security-guidance): allow null findings in StructuredOutput schema | CLOSED | 允许 agentic 评审输出 `null` 而非强制 `[]`，避免模型未发现漏洞时因架构拒绝导致额外重试（观测到 31 次会话中出现此问题）。 |
| [#65875](https://github.com/anthropics/claude-code/pull/65875) | fix: Forward ANTHROPIC_BASE_URL to agentic_review child process | CLOSED | 将 `ANTHROPIC_BASE_URL` 转发至 agentic_review 子进程，修复使用 LiteLLM、Bifrost 等代理网关时 OAuth 认证失败的问题。 |

---

## 功能需求趋势

从近 24 小时的 Issue 和 PR 中可提炼出以下社区关注方向：

1. **插件系统与可扩展性（Mods/Hooks）**：Issue #91870 持续高热度，社区期望 Claude Code 成为“10 倍更可扩展”的平台；多个 PR 围绕 `security-guidance` 插件的规则精细化、跨平台兼容性和架构契约进行迭代。
2. **MCP 工具链兼容性与成本**：MCP 相关问题集中在协议版本契约（#105234）、严格模式参数传输（#105223）、子代理指令冗余（#104791）以及 OAuth 令牌轮换（#99471），反映开发者正在大规模接入 MCP 服务器并遇到边界情况。
3. **模型行为与 AGENTS.md 遵循**：Opus 5.5 的回答质量波动（#105112）和 AGENTS.md 指令遵循缺陷（#105212）表明社区对模型在代码生成中的可控

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-10-27  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

过去24小时，OpenAI Codex 仓库发布了 Rust 客户端的 `0.165.0-alpha.3` 预览版，并合并了大量由自动化机器人 `copyberry[bot]` 提交的核心修复 PR。社区高度集中在 **速率限制（HTTP 429）**、**跨平台稳定性（Windows/macOS 崩溃与内存泄漏）** 以及 **MCP/插件进程管理** 等问题上，GPT-6.1 Terra 模型的目录支持也已正式加入。

---

## 2. 版本发布

| 版本 | 发布时间 | 说明 |
|------|---------|------|
| `rust-v0.165.0-alpha.3` | 2026-10-26 | Codex Rust 客户端新增 alpha 预览版，具体变更详见 Release 页面。 |

> 注：该版本为预览版，建议在生产环境谨慎升级。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数）及问题影响范围筛选：

1. **[#57084] Linux / VS Code: 共享重试截止时间导致反复 HTTP 429，尽管 Pro 额度仍剩 84–99%**  
   65 条评论 / 8 👍 | 刚于 2026-10-26 创建，已成为今日最活跃的事件追踪 Issue。  
   影响：ChatGPT Pro 用户在 Linux/VS Code 环境下反复遇到“Selected model is at capacity”与“exceeded retry limit”，严重中断日常工作。  
   🔗 https://github.com/openai/codex/issues/57084

2. **[#43803] request_user_input_async 问题卡片在最终消息渲染时自动关闭，导致无法回答**  
   17 条评论 / 12 👍 | 社区点赞数最高的 Issue 之一。  
   影响：macOS 桌面端（GPT-6-Astra）交互式提问卡片自动消失，用户无法回复澄清问题，直接阻塞工作流。  
   🔗 https://github.com/openai/codex/issues/43803

3. **[#25015] Codex app-server 为子代理泄漏 MCP 进程栈，导致 Linux 上线性内存增长**  
   17 条评论 / 5 👍 | 涉及 MCP 与子代理（subagent）架构的底层资源泄漏。  
   影响：长时间运行后进程数与内存持续攀升，可能导致 Linux 宿主机资源耗尽。  
   🔗 https://github.com/openai/codex/issues/25015

4. **[#49453] Windows 浏览器访问因已保存的聊天级拒绝而持续被阻止**  
   37 条评论 / 3 👍 | 问题持续近一个月仍未解决。  
   影响：Windows 11 用户即使显式允许站点，Codex 仍无法打开 `127.0.0.1:18960` 等本地地址。  
   🔗 https://github.com/openai/codex/issues/49453

5. **[#46690] Windows 桌面端渲染器内存泄漏增长至 4–7 GB 并反复崩溃**  
   8 条评论 | 版本 26.915.4065.0 回滚至 26.903.9818.0 后恢复稳定。  
   影响：即使是轻量级单线程工作负载也会触发，回滚成为临时缓解方案。  
   🔗 https://github.com/openai/codex/issues/46690

6. **[#38637] macOS 新版 Codex 极不稳定，CPU 占用高且频繁崩溃**  
   9 条评论 / 6 👍 | 用户呼吁回滚版本。  
   影响：macOS arm64 上长时间会话几乎无法打开，影响开发体验。  
   🔗 https://github.com/openai/codex/issues/38637

7. **[#40153] macOS SkyComputerUseService 产生无限进程风暴，导致 Mac 冻结与崩溃**  
   9 条评论 / 2 👍 | 与 Computer Use 功能相关的系统级资源失控问题。  
   🔗 https://github.com/openai/codex/issues/40153

8. **[#42611] CLI 自动压缩会将已回答的用户消息重新回放为新一轮对话**  
   9 条评论 / 4 👍 | CLI 会话上下文管理缺陷。  
   影响：压缩后对话历史出现重复，干扰上下文准确性。  
   🔗 https://github.com/openai/codex/issues/42611

9. **[#53815] macOS 已完成的回复消失，被“approval request is no longer active”替换**  
   6 条评论 | ChatGPT Plus 用户在 macOS 27 上遇到。  
   影响：生成内容丢失，审批状态不同步。  
   🔗 https://github.com/openai/codex/issues/53815

10. **[#45237] 桌面端权限提示被应用自动“拒绝”并保存为用户选择**  
    6 条评论 / 1 👍 | 涉及内置浏览器站点阻止与完整权限模式下的消息审批。  
    影响：用户意图被覆盖，安全与易用性冲突。  
    🔗 https://github.com/openai/codex/issues/45237

---

## 4. 重要 PR 进展（精选 10 条）

以下 PR 均于 2026-10-26 合并（CLOSED），主要由 `copyberry[bot]` 提交，涵盖模型目录、TUI、插件架构、网络代理及追踪能力等核心领域：

1. **[#57293] 向模型目录添加 GPT-6.1 Terra**  
   将 `gpt-6.1-terra` 加入捆绑目录、GCP Vertex 模型选择器及 Amazon Bedrock 目录（含全球和跨区运行时变体），并设为 GCP 首选内存整合模型。  
   🔗 https://github.com/openai/codex/pull/57293

2. **[#57292] TUI 中以 Markdown 渲染异步问题与回复**  
   修复异步问题回复此前以纯文本显示、Markdown 格式失效且问题重复的问题，标题增加 `?` 前缀。  
   🔗 https://github.com/openai/codex/pull/57292

3. **[#57290] 新增带有受限 IPC 和生命周期管理的插件进程主机**  
   引入 `codex-plugin-host`，通过清理后的环境启动辅助进程，验证就绪握手，并提供 256 KiB 帧限制与写入背压的 framed stdin/stdout 管道。  
   🔗 https://github.com/openai/codex/pull/57290

4. **[#57286] 托管需求中支持 `network_proxy`**  
   在 `requirements.toml` 中接受 `[network_proxy]`，保留 `[experimental_network]` 作为兼容别名，并规范跨层合并前的名称标准化。  
   🔗 https://github.com/openai/codex/pull/57286

5. **[#57281] 为远程 App Server 会话启用代理导航**  
   将“空提示 Left 快捷键”与“← 代理”提示扩展至远程会话，此前仅限本地守护进程会话。  
   🔗 https://github.com/openai/codex/pull/57281

6. **[#57280] 在回滚追踪中保留完整 MCP 结果**  
   确保 MCP 完成事件在追踪中保留原始响应（含内容与元数据），以及被拒绝调用的结果。  
   🔗 https://github.com/openai/codex/pull/57280

7. **[#57311] 在回滚追踪中保留工具输出版本与历史顺序**  
   修复追踪 reducer 因内容冲突而拒绝工具多版本输出的问题，支持压缩后保留相同调用与条目 ID。  
   🔗 https://github.com/openai/codex/pull/57311

8. **[#57304] 工作区路由期间暴露刷新令牌拒绝错误**  
   当工作区发现收到 401 且令牌刷新被永久拒绝时，将具体错误传递给用户，而非通用发现错误，提示重新登录。  
   🔗 https://github.com/openai/codex/pull/57304

9. **[#57294] 提取插件管理器错误并封装实时交接路由**  
   将插件安装/卸载错误与遥测分类辅助移至 `manager_errors.rs`，并对实时交接路由进行装箱处理。  
   🔗 https://github.com/openai/codex/pull/57294

10. **[#57285] 允许终端处理展开问题中的链接**  
    在问题展开且 TUI 独占屏幕时禁用鼠标捕获，以便终端可处理链接打开手势。  
    🔗 https://github.com/openai/codex/pull/57285

---

## 5. 功能需求趋势

从近 24 小时的 Issues 与 PR 中可观察到以下社区关注方向：

| 趋势方向 | 证据 | 说明 |
|---------|------|------|
| **跨平台稳定性** | #38637, #40153, #46690, #49453 | Windows/macOS 桌面端崩溃、内存泄漏、渲染器失效成为最高频问题。 |
| **速率限制与配额透明度** | #57084 | Pro 用户在剩余额度充足时仍遇到 HTTP 429，社区对重试策略与配额同步机制要求更高。 |
| **MCP 与子代理资源管理** | #25015, #56335 | MCP 进程栈泄漏、线程加载后未停止的 stdio 服务器，反映对多代理架构资源回收的关注。 |
| **交互式输入与 TUI 体验** | #43803, #48563, #57292 | 问题卡片自动关闭、Markdown 渲

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-10-27)

## 1. 今日速览

今日 Gemini CLI 社区围绕 **Agent 稳定性与子代理机制** 展开密集讨论，多个 P1/P2 级 Bug 指向子代理挂起、状态误报及配置失效等核心问题；与此同时，开发者持续推进 Android/Termux 兼容性、AST 感知代码读取、以及 CLI 终端渲染性能等方面的修复。当前暂无新版本发布。

## 2. 版本发布

过去 24 小时内无新版本 Release。

## 3. 社区热点 Issues

以下选取评论活跃度高、优先级紧急或对核心体验影响大的 10 个 Issue：

| # | 标题 | 优先级/类型 | 核心内容与社区关注点 | 链接 |
|---|------|-------------|----------------------|------|
| #22323 | Subagent recovery after MAX_TURNS is reported as GOAL success | P1 / Bug | 子代理在达到最大轮次限制后仍上报 `status: "success"`，掩盖中断情况，导致上层任务误判为成功。评论数最多（13 条），社区高度关注子代理状态机的可靠性。 | https://github.com/google-gemini/gemini-cli/issues/22323 |
| #21409 | Generalist agent hangs | P1 / Bug | 通用代理在处理简单操作（如创建文件夹）时会无限挂起，用户报告等待长达一小时。8 个 👍，反映该问题对日常使用影响严重。 | https://github.com/google-gemini/gemini-cli/issues/21409 |
| #19873 | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | P2 / Enhancement | 提出利用 Gemini 模型对 Bash 的原生亲和性，通过零依赖 OS 沙箱和执行后意图路由来增强代码库探索能力，属于大型架构改进提案。 | https://github.com/google-gemini/gemini-cli/issues/19873 |
| #22745 | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 探索 AST 感知的文件读取、搜索和代码映射是否能减少 Token 耗并提升代码导航精度，社区关注代码理解效率的提升方向。 | https://github.com/google-gemini/gemini-cli/issues/22745 |
| #21968 | Gemini does not use skills and sub-agents enough | P2 / Bug | 用户反馈模型不会主动调用自定义技能和子代理，除非显式指令，影响自动化工作流的落地体验。 | https://github.com/google-gemini/gemini-cli/issues/21968 |
| #22267 | [BUG] Browser Agent ignores settings.json overrides | P2 / Bug | 浏览器代理完全忽略全局/项目级 `settings.json` 中的配置覆盖（如 `maxTurns`），导致配置无法生效。 | https://github.com/google-gemini/gemini-cli/issues/22267 |
| #21983 | browser subagent fails in wayland | P1 / Bug | 浏览器子代理在 Wayland 显示服务器下失败，涉及 Linux 桌面环境兼容性，属于平台适配痛点。 | https://github.com/google-gemini/gemini-cli/issues/21983 |
| #20079 | ~/.gemini/agents/filename.md is not recognized as an agent if filename.md is a symlink | P2 / Bug | 代理目录下的符号链接文件不被识别为子代理，限制了用户通过链接方式管理代理配置的灵活性。 | https://github.com/google-gemini/gemini-cli/issues/20079 |
| #22232 | Enhance browser_agent resilience: Automatic session takeover and lock recovery | P3 / Feature | 浏览器代理在遇到锁定的浏览器配置文件时采用“快速失败”策略，社区期望增加自动会话接管和锁恢复机制。 | https://github.com/google-gemini/gemini-cli/issues/22232 |
| #24246 | Gemini CLI encounters 400 error with > 128 tools | P2 / Bug | 当可用工具超过 128 个时，CLI 会遇到 400 错误，涉及工具作用域限制和上下文管理，对大型工具集用户影响明显。 | https://github.com/google-gemini/gemini-cli/issues/24246 |

## 4. 重要 PR 进展

以下选取 10 个具有代表性的合并请求，涵盖 Bug 修复、平台兼容性和性能优化：

| # | 标题 | 状态/优先级 | 功能或修复说明 | 链接 |
|---|------|-------------|----------------|------|
| #29884 | fix(core): allow trusted system paths on Android (Termux) for ripgrep resolution | OPEN / P2 | 允许 Android/Termux 环境下的可信系统路径前缀，使原生 ripgrep 二进制能被 `grep_search` 解析并执行，改善移动端兼容性。 | https://github.com/google-gemini/gemini-cli/pull/29884 |
| #29967 | fix(cli): prevent parent command name insertion on /chat list autocomplete | CLOSED | 修复 `/chat list` 或 `/resume list` Tab 补全时意外插入父命令名（如生成 `/chat chat`）的问题。 | https://github.com/google-gemini/gemini-cli/pull/29967 |
| #29968 | fix(cli): validate finite numbers in numeric settings editor | CLOSED / P2 | 将 `Number.isNaN` 替换为 `Number.isFinite`，防止 `Infinity`/`-Infinity` 等非有限值传递给序列化器，增强设置编辑器健壮性。 | https://github.com/google-gemini/gemini-cli/pull/29968 |
| #29910 | fix(acp): include MCP server and tool metadata in permission requests | CLOSED | 在 ACP 权限请求负载中加入结构化的 MCP 服务器和工具元数据，并在权限选项标签中显示具体服务器和工具名称。 | https://github.com/google-gemini/gemini-cli/pull/29910 |
| #29951 | fix(vscode-ide-companion): retry transient VS Code download failures | OPEN / P0 | 为 VS Code 集成测试中的 VS Code 下载添加瞬时网络失败重试机制，修复夜间发布因连接超时导致的测试失败。 | https://github.com/google-gemini/gemini-cli/pull/29951 |
| #29947 | fix(tools): preserve oversized background log tails | OPEN / P2 | 当后台日志单行超过 64 KB 尾部窗口时，保留部分尾片段而非静默丢弃全部输出，避免日志信息缺失。 | https://github.com/google-gemini/gemini-cli/pull/29947 |
| #29948 | fix(tools): respect cancellation during background output reads | OPEN / P2 | 取消后台输出读取时立即响应，而非等待延迟完成后再读取日志，确保中止操作生效。 | https://github.com/google-gemini/gemini-cli/pull/29948 |
| #29961 | fix(core): classify project spending cap errors as terminal quota errors | CLOSED / P2 | 将 AI Studio 项目支出上限返回的 429/400 错误分类为终端配额错误，改善配额耗尽时的错误处理体验。 | https://github.com/google-gemini/gemini-cli/pull/29961 |
| #29905 | fix(cli): handle terminals that render ambiguous-width characters as wide | OPEN / P2 | 修复 macOS Terminal.app、iTerm2、GNOME Terminal 等在渲染东亚模糊宽度字符时按双单元格计算导致的显示错位问题。 | https://github.com/google-gemini/gemini-cli/pull/29905 |
| #29959 | feat(core): support configurable numeric routing rules | OPEN / P2 | 增加可配置的基于数值分数的模型路由规则，允许自定义分数区间与模型的映射，同时保留默认路由行为。 | https://github.com/google-gemini/gemini-cli/pull/29959 |

## 5. 功能需求趋势

从近期 Issue 和 PR 中可提炼出以下社区关注方向：

1. **子代理与 Agent 编排可靠性**：子代理状态误报（#22323）、通用代理挂起（#21409）、技能/子代理调用不足（#21968）等问题集中暴露，社区亟需更稳定的 Agent 编排与恢复机制。
2. **代码理解与上下文效率**：AST 感知的文件读取/搜索/映射（#22745、#22746、#22747）、Token 节约的手术式读取（#19561）等提案表明，开发者希望通过更精准的代码索引降低上下文膨胀。
3. **跨平台与环境兼容性**：Android/Termux 支持（#29884）、Wayland 下浏览器子代理失败（#21983）、终端宽度与字符渲染适配（#29905、#21924）反映出社区对多终端、多操作系统环境的适配需求上升。
4. **MCP 与工具生态集成**：权限请求中加入 MCP 元数据（#29910）、工具数量上限导致的 400 错误（#24246）显示，模型上下文协议（MCP）和大规模工具集成是当前重点。
5. **配置与个性化**：`settings.json` 覆盖被忽略（#22267）、符号链接代理未识别（#20079）、可配置数值路由规则（#29959）等，体现用户对配置灵活性和自定义行为的强烈需求。

## 6. 开发者关注点

**高频痛点：**
- **Agent 挂起与状态不一致**：通用代理无限挂起、子代理状态误报为成功，直接影响任务可执行性和结果可信度。
- **配置生效问题**：浏览器代理忽略 `settings.json` 覆盖、符号链接代理未被识别，导致自定义配置难以落地。
- **大规模工具与上下文管理**：工具数量超过阈值触发 400 错误、模型频繁在随机位置生成临时脚本（#23571），上下文和工具作用域控制亟待优化。
- **终端与 UI 稳定性**：终端尺寸变更时的重绘闪烁（#21924）、CRLF 换行符导致的 diff 异常（#29966）、Unicode 截断问题（#29965）等

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报
**日期**: 2026-10-27  
**数据来源**: [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

---

## 1. 今日速览

Reasonix 今日发布 **v2.52.0** 双版本更新（Studio + CLI），重点引入 Wallpaper Engine 壁纸场景支持、代码语法单独配色标记，并修复压缩卡死、无文件夹无法开会话等核心问题。社区围绕 **多会话并发锁机制**、**跨项目工作区调度**、**UI 布局细节** 以及 **Agent 自动化会话续接** 展开活跃讨论，PR 侧则集中于预算隔离、Git 存储环境修复及 Studio 界面微调。

---

## 2. 版本发布

### Reasonix Studio v2.52.0 & CLI v2.52.0

**新增功能**
- **Wallpaper Engine 壁纸场景**：支持导入 Wallpaper Engine 场景文件夹，提取主图并循环播放全部音轨；支持 DXT1/DXT3/DXT5 压缩主图，提供音量、静音和鼠标视差控制。([#14407](https://github.com/esengine/DeepSeek-Reasonix/issues/14407), [#14478](https://github.com/esengine/DeepSeek-Reasonix/issues/14478))
- **主题包五项代码配色标记**：可单独为注释、类型、运算符、标点、变量设置配色，生效于文件编辑器和对话代码块；未配置的主题外观保持不变。([#14358](https://github.com/esengine/DeepSeek-Reasonix/issues/14358))
- **历史竖带展开**：优化历史轨迹查看体验。

**移除与修复**
- 移除正文拖动把手与顶栏沙盒按钮。
- 修复压缩卡死、没有文件夹无法开会话等多处问题。

**下载链接**: [studio-v2.52.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.52.0) | [v2.52.0 CLI](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.52.0)

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论 | 关注理由 |
|---|------|------|------|----------|
| [#13341](https://github.com/esengine/DeepSeek-Reasonix/issues/13341) | 跨项目工作区发配会话和交流 | OPEN | 18 | 社区讨论最热的 Issue，提出在主工作区下统一调度并打开多个子项目工作区，并为每个项目派发独立会话，涉及跨项目工作流编排。 |
| [#14025](https://github.com/esengine/DeepSeek-Reasonix/issues/14025) | 多会话、多子代理问题 | OPEN | 3 | 反馈长任务下频繁出现锁死问题，一个长会话占用锁导致其他会话等待，社区呼吁提供锁等级开关以平衡效率与安全。 |
| [#14579](https://github.com/esengine/DeepSeek-Reasonix/issues/14579) | 添加子窗口功能（对话分支并排查看） | OPEN | 4 | 双屏用户高频需求，希望主对话与分支对话可在子窗口中同时打开，避免频繁切换 Tab。 |
| [#14543](https://github.com/esengine/DeepSeek-Reasonix/issues/14543) | Studio 2.52 composer 行重叠（Stop 按钮下方 model/effort 组） | CLOSED | 5 | 新版本回归 UI 缺陷，运行中的 turn 导致底部行重叠，直接影响交互体验。 |
| [#14573](https://github.com/esengine/DeepSeek-Reasonix/issues/14573) | mapie 路由大模型时无法隐藏 group 信息 | OPEN | 5 | 路由模型统一显示 `group/XXX`，用户希望可隐藏分组信息以简化界面。 |
| [#14418](https://github.com/esengine/DeepSeek-Reasonix/issues/14418) | 设置页内容卡片宽度固定，宽屏下右侧大面积空白 | OPEN | 4 | UI/UX 布局反馈，最大化后内容未居中，搜索框右缘超出卡片范围，视觉重心偏左。 |
| [#14564](https://github.com/esengine/DeepSeek-Reasonix/issues/14564) | 新增评论指派 bot，支持 `/assign` 评论即认领与分派 | CLOSED | 4 | 社区治理功能需求，期望在 Issue 评论上下文中直接完成认领/指派，降低响应门槛。 |
| [#13157](https://github.com/esengine/DeepSeek-Reasonix/issues/13157) | Linux 下 Agent 无法访问 GPU | CLOSED | 4 | 技术性痛点，阻碍 GPU 内核开发的全自动化迭代，涉及 Agent 容器/沙箱资源隔离。 |
| [#14532](https://github.com/esengine/DeepSeek-Reasonix/issues/14532) | 上下文压缩满后，AI 自动开新会话继续工作 | OPEN | 2 | 自动化需求，期望带上未完成总结自动新开话题并查阅旧会话，适合长时夜间开发场景。 |
| [#14572](https://github.com/esengine/DeepSeek-Reasonix/issues/14572) | 设置中默认模型人设不可更改 | OPEN | 2 | 个性化配置需求，用户希望在设置层面固定默认人设，而非每次对话手动选择。 |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 作者 | 核心内容 |
|---|------|------|------|----------|
| [#14595](https://github.com/esengine/DeepSeek-Reasonix/pull/14595) | fix(control): include semantic routing in root budgets | OPEN | @SivanCola | 根 Token 预算现在包含语义能力路由，2000-token 预算下 1100-token 路由后仅允许一次真实执行器文件读取，优化预算分配。 |
| [#14593](https://github.com/esengine/DeepSeek-Reasonix/pull/14593] | fix(coordinator): share root task budgets | CLOSED | @SivanCola | 规划与执行共享根任务 Token/墙时软预算，避免各 Agent 独立绑定预算导致工具轮次浪费。 |
| [#14594](https://github.com/esengine/DeepSeek-Reasonix/pull/14594] | fix(gitcmd): isolate host storage environment | CLOSED | @SivanCola | 隔离宿主 Git 存储环境，防止继承的 `GIT_INDEX_FILE` 导致创建工作树时重写无关索引。 |
| [#14583](https://github.com/esengine/DeepSeek-Reasonix/pull/14583] | fix(anthropic): retain interrupted usage | CLOSED | @SivanCola | Anthropic 流中断前保留已报告用量计数，恢复时不重建计数，保持部分会计完整性。 |
| [#14587](https://github.com/esengine/DeepSeek-Reasonix/pull/14587] | fix(studio): show account and model aliases in composer tooltip | CLOSED | @lancy69 | Composer 悬停提示改为显示供应商/模型别名，而非原始引用，提升可读性。 |
| [#14591](https://github.com/esengine/DeepSeek-Reasonix/pull/14591] | fix(studio): integrate pending queue into composer layout | OPEN | @lancy69 | 仅做样式/布局层面的待处理队列集成，不涉及拖拽排序或状态机。 |
| [#14590](https://github.com/esengine/DeepSeek-Reasonix/pull/14590] | fix(studio): give Soft contrast a lower AA palette | OPEN | @lancy69 | 保留 Soft 作为真正的低对比度 AA 调色板，用于 body/muted 文本，Faint/ghost 保持现有安全下限。 |
| [#14588](https://github.com/esengine/DeepSeek-Reasonix/pull/14588] | feat(studio): expose wallpaper settings and selected preview | OPEN | @lancy69 | 壁纸设置从“更多个性化”提升为 Appearance 直接模块，配合 v2.52 壁纸新特性。 |
| [#14450](https://github.com/esengine/DeepSeek-Reasonix/pull/14450] | fix(studio): drop the top bar's second route to Tools and permissions | CLOSED | @esengine | 移除顶栏右侧冗余沙盒按钮，统一导航入口，修复 #14439。 |
| [#14576](https://github.com/esengine/DeepSeek-Reasonix/pull/14576] | fix: 同一张图不再以缩略图与裸路径重复表达 | CLOSED | @1012905 | 用户消息卡片不再重复显示附件路径，仅用缩略图代表；同时清理 `output/` 原型目录并归档设计文档。 |

---

## 5. 功能需求趋势

从近 24 小时 Issues 与 PR 可提炼出以下社区关注方向：

1. **多会话与并发协作**  
   用户普遍反映长会话、多子代理场景下的锁竞争问题（#14025），并希望实现跨项目工作区统一调度与会话分发（#13341）。这表明 Reasonix 正从单对话工具向多项目、多 Agent 并行开发平台演进。

2. **UI/UX 与布局微调**  
   设置页宽屏布局（#14418）、Composer 行重叠（#14543）、子窗口/分支对话并排查看（#14579）、默认模型人设持久化（#14572）等需求集中，社区对细粒度界面定制和多屏工作流的期待较高。

3. **Agent 自动化与资源访问**  
   上下文压缩后自动续会（#14532）、Linux 下 Agent GPU 访问（#13157）反映开发者希望 Reasonix Agent 具备更强的自主执行能力和底层硬件资源调度权限。

4. **模型路由与提供商体验**  
   mapie 路由分组信息隐藏（#14573）、模型/供应商别名显示（#14587、#14545）显示用户在多模型、多提供商环境下对信息简化和别

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-10-27)

## 今日速览

OpenCode 社区今日围绕**免费额度机制**与**插件系统稳定性**展开密集讨论。免费模型滥用漏洞（#34344）及首次使用即触发额度超限（#58550）引发用户关注；同时，热插件重载导致共享注册表崩溃（#59443）等核心稳定性问题被反复提及。开发者侧则集中于 TUI 体验优化、ACP 协议细节修复及 SDK 实验性方法重组。

> 注：过去 24 小时无新版本发布。

---

## 社区热点 Issues（共 11 条更新，精选 10 条）

| # | 标题 | 状态 | 核心内容与社区反应 | 链接 |
|---|------|------|-------------------|------|
| #34344 | Unlimited usage Exploit on opencode models | CLOSED | 免费模型速率限制绑定 IP，通过 VPN 切换即可重置并无限使用。65 条评论，社区高度关注免费额度防护机制。 | [查看](https://github.com/anomalyco/opencode/issues/34344) |
| #58550 | Free usage exceeded, tho my first time Using opencode | CLOSED | 新用户安装后首次发送消息即提示“免费使用已超限，订阅 Go”，14 条评论，反映免费额度识别或计费逻辑存在误判。 | [查看](https://github.com/anomalyco/opencode/issues/58550) |
| #6912 | Ctrl+C does not disable mouse tracking (Windows) | CLOSED | Windows 下 Ctrl+C 退出后未禁用鼠标跟踪，导致终端被 SGR 转义序列淹没，21 👍，14 条评论，跨平台终端兼容性痛点。 | [查看](https://github.com/anomalyco/opencode/issues/6912) |
| #59387 | [zen] Free tier issues: read this first | OPEN | 免费层问题官方汇总贴，涵盖“额度超限”“重置失效”“桌面版失效”等场景，6 条评论，2 👍，社区集中反馈入口。 | [查看](https://github.com/anomalyco/opencode/issues/59387) |
| #55760 | ACP: parent's auto-resumed turn after background subagent completion emits zero session/update | OPEN | 后台子代理在父代理回合结束后完成时，合成的 `subagent completed` 消息虽进入父代理 inbox，但未触发 session/update，导致状态丢失。4 条评论，1 👍。 | [查看](https://github.com/anomalyco/opencode/issues/55760) |
| #58354 | server: shell tool output containing NUL bytes bricks the session | OPEN | Shell 工具输出含 NUL 字节导致会话卡死并返回 `Invalid request parameters`，3 条评论，涉及上游提供商（如 Venice AI）严格校验。 | [查看](https://github.com/anomalyco/opencode/issues/58354) |
| #59404 | Responses image parts omit detail, 400 on strict upstreams | OPEN | Open Responses 适配器原样转发图片 `detail` 字段，缺少元数据时未序列化 `detail`，导致严格实现 OpenAI Schema 的上游返回 400。2 条评论。 | [查看](https://github.com/anomalyco/opencode/issues/59404) |
| #58839 | Custom providers cannot request tool approval | OPEN | 自定义 LanguageModelV3 提供商发出 `tool-approval-request` 后，TUI 和 headless 模式均不弹出权限提示，也不会返回 `tool-approval-response`。2 条评论。 | [查看](https://github.com/anomalyco/opencode/issues/58839) |
| #59443 | Hot plugin reload destroys the shared agent/skill registry | OPEN | 2.1.4 版本下，插件热重载抛出 `TypeError: o is not a function`，并销毁所有已启动位置的共享代理/技能/工具注册表，导致正在进行的对话中断。1 条评论。 | [查看](https://github.com/anomalyco/opencode/issues/59443) |
| #59432 | [FEATURE]: TUI plugin API: render synthetic messages | OPEN | 提议 TUI 插件 API 支持通过 `session.synthetic()` 渲染合成消息，目前 V2 TUI 已展示插件合成消息，亟需正式 API 支持。1 条评论。 | [查看](https://github.com/anomalyco/opencode/issues/59432) |

---

## 重要 PR 进展（共 50 条更新，精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #59444 | Revert "fix(server): honor OPENCODE_SERVER_USERNAME for serve and --server" | OPEN | 回滚 PR #59379，撤销对服务器用户名环境变量处理的修改。 | [查看](https://github.com/anomalyco/opencode/pull/59444) |
| #55246 | feat(plugin): add OpenCode Desktop GUI plugins | OPEN | 桌面端 GUI 插件支持：插件包可额外导出 `./gui-experimental`，与 server 和 tui 入口并列，设置 > 插件页面统一列出。 | [查看](https://github.com/anomalyco/opencode/pull/55246) |
| #59435 | [contributor] feat(app): fold long user messages | OPEN | 长用户消息在时间线中折叠至前 8 行，提供“阅读更多”按钮，避免长日志/口述提示占据屏幕，参考 iOS App 规则。 | [查看](https://github.com/anomalyco/opencode/pull/59435) |
| #59442 | [contributor] fix(ai): stop LLM.loop when a step reports a provider error | OPEN | 修复 `LLM.loop` 在步骤报告提供商错误但同时包含工具调用时仍继续循环的问题，现改为停止并转发错误事件。 | [查看](https://github.com/anomalyco/opencode/pull/59442) |
| #59072 | [contributor] refactor(client): group experimental SDK methods under client.experimental | OPEN | SDK 实验性方法统一迁移至 `client.experimental` 命名空间，与稳定方法区分，URL 和线路格式不变，保持向后兼容。 | [查看](https://github.com/anomalyco/opencode/pull/59072) |
| #59403 | [contributor] refactor(nix): fetch dependencies from bun.lock | OPEN | 从 `bun.lock` 读取存档 URL 和完整性信息，使用 bun2nix 构建离线缓存，修复 #49063。 | [查看](https://github.com/anomalyco/opencode/pull/59403) |
| #59439 | [contributor] Revert "fix(tui): identify config-defined providers (#57007)" | CLOSED | 回滚 #57007，移除公共集成架构中的 `configured` 字段，避免将配置来源信息暴露到集成 Schema、OpenAPI 和客户端类型中。 | [查看](https://github.com/anomalyco/opencode/pull/59439) |
| #59441 | [contributor] fix(core): size compaction requests from the provider's last count | OPEN | 压缩请求大小计算改为使用提供商上次回复的实际 token 数，而非按字符/4 估算整个请求，提升压缩准确性。 | [查看](https://github.com/anomalyco/opencode/pull/59441) |
| #59437 | feat(core): add /goal with a client-side done check | OPEN | 新增 `/goal` 命令，基于客户端已同步数据判断“完成”，不新增服务器事件，也不引入 `native` 标志，作为 #58508 的替代方案。 | [查看](https://github.com/anomalyco/opencode/pull/59437) |
| #59440 | [contributor] fix(core): don't enable catalog providers from setting-only config overrides | OPEN | 修复配置插件将所有提供商条目标记为 `activation = "enabled"` 的问题，避免仅调整参数的目录提供商被错误视为可用。 | [查看](https://github.com/anomalyco/opencode/pull/59440) |

---

## 功能需求趋势

从本日 Issues 与 PR 中提炼，社区关注度最高的功能方向如下：

1. **免费层与计费机制优化**  
   免费额度误判（#58550）、滥用漏洞（#34344）及额度重置失效（#59387）集中爆发，表明用户对免费配额的透明度、防刷机制及重置逻辑有强烈诉求。

2. **插件系统与扩展性**  
   桌面 GUI 插件（#55246）、TUI 合成消息渲染 API（#59432）、热重载稳定性（#59443）显示插件生态正从后端能力向前端 UI 扩展，但插件生命周期管理仍是短板。

3. **多模态与协议兼容性**  
   图片 `detail` 字段缺失导致上游 400（#59404）、NUL 字节导致会话卡死（#58354），反映社区对 OpenAI Responses 协议严格兼容性及多模态内容传输的健壮性要求提升。

4. **自定义提供商与工具审批**  
   自定义提供商无法发起工具审批请求（#58839），说明第三方模型接入时，人机交互审批链路尚未完全打通。

5. **ACP 子代理与会话状态同步**  
   后台子代理完成后父代理会话更新丢失（#55760），凸显 ACP 协议在复杂多代理场景下的状态一致性需求。

---

## 开发者关注点

**高频痛点：**
- **免费额度与订阅状态同步**：新用户即触发超限、VPN 可绕过限制、重置不生效，计费逻辑与前端展示不一致。
- **Windows 终端兼容性**：Ctrl+C 未正确还原终端状态（鼠标跟踪），影响本地开发体验。
- **插件热重载破坏性**：共享注册表被意外销毁，导致所有位置的代理/技能不可用，需加强插件沙箱与回滚机制。
- **Provider 错误传播**：`LLM.loop` 在提供商报错时未及时终止，可能导致无效工具调用和会话

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期**: 2026-10-27  
**仓库**: NousResearch/hermes-agent  
**版本**: 当前稳定版 v0.22.5

---

## 1. 今日速览

今日社区活动高度集中在 **Discord 网关与会话准入机制** 以及 **MCP/终端工具链稳定性** 两个方向。多个 P2 级别 Bug 指向 `admission_conflict` 导致自动化唤醒与会话恢复陷入无限重试，同时 TUI 输入恢复、Anthropic 参数越界及内存配置热更新缺失等问题也引发开发者广泛关注。暂无新版本发布。

---

## 2. 版本发布

过去 24 小时内无新 Release 发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 严重度 | 核心内容 | 关注理由 | 链接 |
|---|------|--------|----------|----------|------|
| #145261 | Watch-pattern completion injections always refused with admission_conflict | P2 | 0.22.5 多路复用配置下，Discord 群组会话的 watch 模式注入被拒绝，单日拒绝量达 2,641 次 | 直接导致自动化工作流中断，拒绝频次极高，影响生产环境稳定性 | [查看](https://github.com/NousResearch/hermes-agent/issues/145261) |
| #143720 | Discord thread process-completion wake refused admission_conflict every 60s forever | P2 | 进程完成监控每 60 秒拒绝一次，持续 6 小时产生 494 条日志，尝试上限未触发 | 无限重试会造成日志风暴与资源浪费，且 `notify-mode=off` 失效 | [查看](https://github.com/NousResearch/hermes-agent/issues/143720) |
| #142461 | Automation wakes into auto-created Discord threads are refused admission_conflict forever | P3 | 自动创建的 Discord 线程中，自动化唤醒被永久拒绝，父会话在子任务完成后不恢复 | 影响 Discord 平台下的自动化任务链完整性，已有 10 条评论跟进 | [查看](https://github.com/NousResearch/hermes-agent/issues/142461) |
| #145281 | max_tokens sent as context window exceeds native output limit | P2 | 将上下文窗口（131072）作为 `max_tokens` 发送，超过 Anthropic/OpenAI 原生输出限制（128000） | 导致 `claude-sonnet-5` / `gpt-5.4` 直接返回 `invalid_params`，模型调用失败 | [查看](https://github.com/NousResearch/hermes-agent/issues/145281) |
| #145285 | Ink TUI stdin recovery misses stopped TTY reads | P2 | TUI 在特定条件下永久停止接受键盘输入，进程存活但 UI 无响应 | 影响桌面/TUI 交互体验，是 #31486 / #54046 的后续问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/145285) |
| #145265 | mcp: tools.include edit detaches live connection's tools | P2 | 修改 `tools.include` 会导致活跃 MCP 连接的工具被卸载，已移除工具仍响应直到重启 | 涉及 MCP 工具链动态配置的核心稳定性问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/145265) |
| #145284 | Editing memory limits in config.yaml does not reach live session | P2 | 运行中修改 `memory.memory_char_limit` 等配置不生效，缓存 Agent 保留旧上限 | 配置热更新缺失，运维人员需重启会话才能应用内存限制变更 | [查看](https://github.com/NousResearch/hermes-agent/issues/145284) |
| #145275 | key_cmd key for anthropic_messages provider sent as Bearer | P2 | Anthropic 密钥始终以 `Authorization: Bearer` 发送，而非 `x-api-key` | 导致 `key_cmd` 无法向 `api.anthropic.com` 提供 Console 密钥，影响身份认证 | [查看](https://github.com/NousResearch/hermes-agent/issues/145275) |
| #145122 | API server SSE streams buffer per-request deltas in unbounded asyncio.Queue | P2 | 慢客户端可导致无界事件积压，内存无限增长 | API 服务器存在潜在 DoS 风险，需关注流式传输的内存管理 | [查看](https://github.com/NousResearch/hermes-agent/issues/145122) |
| #122750 | gateway adapter secrets and OAuth-profile keys not stripped from terminal envs | P3 (security) | 终端/后台/cron 子进程环境中未剥离网关适配器密钥与 OAuth 配置键 | 涉及凭证泄露边界，属于安全合规类高频隐患 | [查看](https://github.com/NousResearch/hermes-agent/issues/122750) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 修复/功能摘要 | 链接 |
|---|------|------|--------------|------|
| #145295 | fix(discord): a finished typing loop must not deregister a newer turn's loop | Bug | 修复 Discord 适配器输入循环竞态，导致“正在输入”气泡卡死且无法清除 | [查看](https://github.com/NousResearch/hermes-agent/pull/145295) |
| #145288 | fix(tui): re-arm native stdin after input dispatch errors | Bug | 修复 TUI 输入分发错误后未重新武装原生 stdin，解决零高水位 TTY 流停止轮询问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/145288) |
| #145290 | fix(terminal): skip the sudo password prompt when backend has no sudo | Bug | 后端无 `sudo` 时跳过密码提示，避免容器等环境下无效交互 | [查看](https://github.com/NousResearch/hermes-agent/pull/145290) |
| #145291 | fix(security): scope sudo privilege-flag detection to sudo's own options | Security | 将 sudo 特权标志检测范围限定为 sudo 自身选项，减少误报 | [查看](https://github.com/NousResearch/hermes-agent/pull/145291) |
| #145264 | fix(kanban): a board-driven close carries the card's own evidence | Bug | 看板驱动的关闭操作现携带卡片自身证据，解决拖拽至 Done 静默失败问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/145264) |
| #145271 | fix(terminal): expose ssh_sync_files so loopback SSH backends can skip file sync | Bug | SSH 终端后端暴露 `sync_files` 参数，允许环回 SSH 跳过文件同步 | [查看](https://github.com/NousResearch/hermes-agent/pull/145271) |
| #145283 | fix(pm): avoid accumulating managed PATH entries | Bug | 修复 Windows 环境下重复环境合成导致 PATH 无限增长，影响 `node` 解析 | [查看](https://github.com/NousResearch/hermes-agent/pull/145283) |
| #145287 | feat(agent): replay signed Anthropic thinking through a declared relay | Feature | 支持通过自定义中继重放 Anthropic 思考块及其签名，兼容 CLIProxyAPI 等代理 | [查看](https://github.com/NousResearch/hermes-agent/pull/145287) |
| #144917 | Bundled skills: review stays read-only, google-workspace flags work | Docs/Skill | 修复内置技能说明：代码评审默认只读，google-workspace `--services/--format` 标签生效 | [查看](https://github.com/NousResearch/hermes-agent/pull/144917) |
| #133625 | feat(compression): warm handoff, summary on main model's cached prompt | Feature | 新增压缩“温交接”选项（off/on/auto），复用主模型提示缓存，减少辅助请求 | [查看](https://github.com/NousResearch/hermes-agent/pull/133625) |

---

## 5. 功能需求趋势

从本日全部 Issues 与 PR 中提炼，社区当前最关注的功能方向如下：

1. **Discord 网关与会话准入稳定性**  
   多个 P2/P3 Issue 指向 `admission_conflict` 导致自动化唤醒、线程恢复与 Watch 注入被拒绝，社区急需对 Discord 平台的会话生命周期与准入逻辑进行根因修复。

2. **MCP 工具链动态管理**  
   `tools.include` 变更导致活跃连接工具被卸载、传输拆解卡死等问题反映出 MCP 适配器在运行时重配置方面的鲁棒性不足。

3. **模型参数与提供商适配精细化**  
   `max_tokens` 越界、Anthropic `key_cmd` 认证头错误、思考块重放等问题表明，用户对多模型提供商（Anthropic/OpenAI/Nous）的参数兼容性与认证细节要求更高。

4. **配置热更新与运维可观测性**  
   内存限制、检查点配置等修改后不生效，以及 SSE 无界缓冲导致的内存风险，显示社区对配置热重载与服务端资源管控的需求在增加。

5. **桌面/TUI 交互可靠性**  
   GNOME 托盘图标丢失、Ink TUI stdin 停止等问题集中在桌面端与终端交互层，是提升本地开发体验的关键短板。

---

## 6. 开发者关注点

**高频痛点：**
- **准入冲突与无限重试**：`admission_conflict` 在 Discord 场景下频繁出现，且尝试上限未生效，导致日志风暴与会话卡死。
- **配置不生效**：`config.yaml` 中的内存、检查点等限制对已运行会话不生效，缺乏热更新机制。
- **模型调用参数越界**：上下文窗口被直接当作 `max_tokens` 发送，导致 Anthropic/OpenAI 原生接口拒绝请求。
- **凭证与环境隔离**：终端子进程环境中未剥离敏感密钥与 OAuth 配置，存在安全边界风险。

**开发者建议关注：**
- 优先处理 P2 级别的 Discord 准入冲突与 MCP 连接拆解问题，以避免生产环境自动化中断。
- 跟进 TUI 输入恢复与桌面托盘

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报
**日期**: 2026-10-27  
**数据来源**: github.com/openclaw/openclaw

---

## 1. 今日速览

今日社区活动集中在 Bug 修复与性能优化两个方向，共新增/更新 5 个 Issue 和 50 个 Pull Request。核心关注点包括 Native Codex 长时间运行时的 Watchdog 误杀、GPT-6.1 Terra 模型回退验证失败、共享 Agent 工作区文件权限问题，以及多个测试精简与性能优化 PR。暂无新版本发布。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues

以下选取 5 个过去 24 小时内更新的 Issue（当前为全部最新 Issue），按影响程度排序：

| # | 标题 | 核心内容 | 为何重要 | 链接 |
|---|------|---------|---------|------|
| #185121 | Native Codex 超 6 分钟运行被 Watchdog 停止 | 原生 Codex 执行超过语义停滞窗口（6 分钟）后，下一 tick 被回复 Watchdog 拦截，报错 `session placement turn settlement is closed`，导致任务失败。标记为 P1 及 `diamond lobster` 等级，涉及会话状态与消息丢失。 | 直接影响长时间运行的 AI 代理任务稳定性，属严重行为 Bug，需优先处理。 | https://github.com/openclaw/openclaw/issues/185121 |
| #185190 | GPT-6.1 Terra 作为 Agent 回退模型验证失败 | 在 OpenClaw 2026.10.6 稳定版中，配置模型引用验证拒绝 `openai/gpt-6.1-terra` 作为 per-agent 回退，尽管关联 OAuth 提供商已支持。涉及身份验证提供商影响。 | 影响多模型回退能力与 OAuth 集成，对依赖新模型的用户构成阻塞。 | https://github.com/openclaw/openclaw/issues/185190 |
| #185191 | 共享 Agent 工作区新文件默认 0600 权限 | `memory-core` 创建的工作区文件默认权限为 0600，导致共享工作区中其他用户无法读取新文件。社区请求增加可选设置，允许退出 0600 默认权限。标记为安全影响及 `diamond lobster` 等级。 | 涉及多用户协作场景下的文件可见性与安全权限设计，属功能需求与安全交叉问题。 | https://github.com/openclaw/openclaw/issues/185191 |
| #185208 | published-driver 升级通道在 Supervisor 拆卸后退出 1 | 发布驱动升级通道完成更新及所有断言后，在 fixture Supervisor 拆卸阶段退出 1，报错 `Survivor supervisor has not settled; retaining process custody`。 | 暴露 e2e 测试环境中 Supervisor 生命周期管理问题，可能影响发布流程可靠性。 | https://github.com/openclaw/openclaw/issues/185208 |
| #185207 | skills.read() 访客绑定返回字符索引对象导致上下文膨胀 | `skills.read(name)` Code Mode 访客绑定将 SKILL.md 内容作为字符索引对象返回（如 `{"0":"-","1":"-",...}`），而非文档规定的 `{ path, description, content, bytes }` 结构，导致 `result.content` 无法正常使用。 | 影响技能读取接口的正确性与开发者体验，可能导致上下文数据异常膨胀。 | https://github.com/openclaw/openclaw/issues/185207 |

> **社区反应说明**：上述 Issue 均为近 24 小时内新建或更新，评论数均在 0–1 条，处于早期讨论或维护者审核阶段，尚未形成大规模社区讨论。

---

## 4. 重要 PR 进展

从 50 个更新的 PR 中选取 10 个代表性条目，涵盖功能新增、Bug 修复、性能优化与测试精简：

| # | 标题 | 作者 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #181680 | feat: add personal session groups | @roboclaw-bot | 允许访客和成员在侧边栏创建个人会话分组，不影响共享分组或他人布局；分组父对话需保留子对话及其实时更新。当前等待作者补充信息。 | https://github.com/openclaw/openclaw/pull/181680 |
| #185192 | fix(ui): keep subagent failures out of the parent composer | @roboclaw-bot | 修复失败或阻塞的子代理在父对话作曲家上方留下持续堆叠横幅的问题，子状态与诊断仍可独立访问。 | https://github.com/openclaw/openclaw/pull/185192 |
| #185028 | fix(browser): preserve native CORS preflights | @eleqtrizit | 将浏览器导航守卫从 Playwright 页面路由迁移至仅文档 CDP 拦截，保留原生 CORS 预检行为，避免跨域请求被目标拒绝。 | https://github.com/openclaw/openclaw/pull/185028 |
| #185195 | fix(models): stop catalog refresh storms after tier downgrades | @steipete | 修复提供商在服务层级间切换时导致模型目录重复刷新的问题，消除冷加载场景下的目录无效化风暴。 | https://github.com/openclaw/openclaw/pull/185195 |
| #185185 | perf(agents): avoid repeated transcript source validation | @steipete | 避免准备好的转录写入重复验证同一已准入操作源，降低流式代理轮次中的插件策略与调用范围开销。 | https://github.com/openclaw/openclaw/pull/185185 |
| #185213 | perf(agents): skip unused worktree provisioning size scans | @steipete | 托管工作树创建时跳过未使用的忽略文件大小估算扫描，减少大量忽略文件仓库的预检出栈时间。 | https://github.com/openclaw/openclaw/pull/185213 |
| #185211 | fix: restore sandbox contract test coverage | @shakkernerd | 修复沙盒重建与 apply-patch 权限测试套件，使其适配生产环境的复合容器检查响应与模型可见工作区恢复指导。 | https://github.com/openclaw/openclaw/pull/185211 |
| #185193 | fix(release): credit original PR authors instead of backporters | @RomneyDa | 修复发行说明中错误将原始 PR 作者归为回移操作者的问题，确保贡献记录与 macOS 更新归属正确。 | https://github.com/openclaw/openclaw/pull/185193 |
| #185210 | fix: sidebar browser tabs stay open after their page closes | @roboclaw-bot | 修复关闭最后一个侧边栏浏览器页面后，因原生关闭确认提前于标签页状态更新而残留空白浏览器标签的问题。 | https://github.com/openclaw/openclaw/pull/185210 |
| #185154 | fix: pasted chat images keep the wrong aspect ratio until remount | @roboclaw-bot | 修复粘贴的聊天图片在实际尺寸可用前仍保持 3:2 填充帧，直至对话重新挂载；现改为立即使用实际宽高比。 | https://github.com/openclaw/openclaw/pull/185154 |

> 其余 PR 多为测试精简（如 batch d641/d642/d643）、依赖刷新（#185194）及控制台 UI 实验性调整（#185138、#185215），对生产行为影响较小。

---

## 5. 功能需求趋势

从本期 Issues 与 PR 标签、标题可归纳出以下社区关注方向：

1. **长时间运行任务稳定性**：Native Codex 超时被 Watchdog 终止（#185121）反映社区对长周期 AI 代理任务的容错与会话保活需求较高。
2. **多模型与 OAuth 集成**：GPT-6.1 Terra 回退验证失败（#185190）显示用户期望更广泛的新模型支持，以及与 OAuth 身份提供商的无缝兼容。
3. **多用户协作与权限管理**：共享工作区文件默认 0600 权限问题（#185191）表明社区关注跨用户文件可见性与细粒度权限控制。
4. **个人化工作区体验**：个人会话分组（#181680）及侧边栏标签页修复（#185210）体现用户对 UI 个性化与会话组织能力的持续需求。
5. **性能与资源优化**：多个 PR 针对转录写入、工作树预检、模型目录刷新等场景进行性能优化，说明社区正在关注资源占用与响应延迟。

---

## 6. 开发者关注点

综合本期 Issue 与 PR 反馈，开发者主要关注以下痛点：

- **Watchdog 与会话生命周期**：长时间运行的代理轮次易被 Watchdog 误杀，导致会话状态异常关闭与消息丢失，需要更合理的超时策略或可配置的停滞窗口。
- **模型验证与回退机制**：新模型（如 GPT-6.1 Terra）在 OAuth 场景下的验证逻辑存在缺陷，开发者期望更透明的模型引用校验与回退兜底方案。
- **文件权限与共享协作**：默认 0600 权限限制共享工作区的协作效率，社区希望新增可选的文件模式设置，平衡安全性与可读性。
- **e2e 测试环境稳定性**：published-driver 升级通道在 Supervisor 拆卸阶段异常退出，提示测试夹具与进程生命周期管理仍需加固。
- **接口数据结构一致性**：`skills.read()` 返回格式与文档不符，导致上下文膨胀，开发者希望 API 响应结构严格遵循文档规范。

---

**报告生成时间**: 2026-10-27  
**数据覆盖范围**: 2026-10-26 至 2026-10-27 的 GitHub 仓库活动

:::
