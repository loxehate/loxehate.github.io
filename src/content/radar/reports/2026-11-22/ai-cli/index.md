---
title: "AI CLI 工具社区动态日报"
published: 2026-11-22
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-22

> 生成时间: 2026-11-22 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-22）

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单一对话助手”向“多代理协作开发平台”演进的关键期。各主流工具均在加强跨平台稳定性（Windows/macOS/Linux）、会话生命周期管理及模型提供商适配，但普遍面临内存泄漏、配置热重载及跨平台回归等成长性痛点。开源化与可扩展性（MCP、插件系统、自托管）成为社区共识的下一阶段方向，而企业级资源管控与审计需求开始显著凸显。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues (24h) | PR (24h) | Release (24h) | 主要版本状态 |
|------|------|-------------|---------|-------------|------------|
| **OpenCode** | anomalyco/opencode | 27 | 50 | 无 | 稳定版，高频 PR 迭代 |
| **OpenAI Codex** | openai/codex | 46 | 31 | 1 个 | `rust-v0.173.0-alpha.4` (Alpha) |
| **Claude Code** | anthropics/claude-code | 50 | 3 | 无 | 商业闭源，PR 极少 |
| **Gemini CLI** | google-gemini/gemini-cli | 未披露总数 | 10 | 1 个 | `v0.71.0-nightly` (Nightly) |
| **Hermes** | NousResearch/hermes-agent | 16 | 50 | 无 | 插件网关架构，高频 PR |
| **OpenClaw** | openclaw/openclaw | 10 | 50 | 0 | 自动化网关，P1 故障集中 |
| **DeepSeek Reasonix** | esengine/DeepSeek-Reasonix | 0 | 0 | 0 | 无活动 |
| **DeepSeek Harness** | deepseek-ai/deepseek-harness | 0 | 0 | 0 | 无活动 |

> 注：Gemini CLI 未在日报中披露 Issues 总数，仅列出精选热点；DeepSeek 两个项目过去 24 小时无社区活动。

## 3. 共同关注的功能方向

多个工具社区在以下需求上呈现高度一致：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **跨平台与会话稳定性** | Claude Code、Codex、Gemini CLI、Hermes | Windows/macOS 启动崩溃、休眠后会话中断、远程控制自动断开 |
| **多代理/子代理资源管控** | Claude Code、Gemini CLI | 多子代理 OOM（6.5 GB RSS）、内存预算、共享 MCP 服务器 |
| **MCP/插件生态稳定性** | Claude Code、OpenCode、Hermes | MCP 服务器重复启动、插件版本锁冲突（uv lock）、能力声明与实际不符 |
| **跨设备/远程会话管理** | Claude Code、Hermes | 移动端主动发起桌面会话、客户端标识与通知策略 |
| **模型提供商适配与能力声明** | OpenCode、Claude Code、OpenClaw | Copilot 路由模型错误宣传 PDF 支持、Opus 5.5 护栏误触发、未配置模型时静默调用 OpenAI |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | GitHub 连接器、多子代理协作、桌面远程控制 | 企业级开发团队、Anthropic 生态用户 | 商业闭源，强调模型护栏与企业安全，社区高度关注开源化 PR（#41447） |
| **OpenAI Codex** | TUI 终端体验、Cloud 流恢复、Computer Use 沙盒 | 终端重度用户、OpenAI API 开发者 | Rust 端 Alpha 预览，TUI 交互深度优化，剪贴板与 OSC 52 等底层终端特性 |
| **Gemini CLI** | Subagent 可靠性、AST 感知代码理解、浏览器代理 | Google 生态开发者、复杂代码库维护者 | Node/Undici 技术栈，强调零依赖沙箱与 AST 感知，Nightly 发布节奏快 |
| **OpenCode** | V1→V2 迁移、多提供商模型适配（Mistral、Bedrock、Copilot）、桌面端资源 | 多模型混合使用场景、成本敏感型团队 | 强调提供商中立与能力协商，PR 密度极高（50 条/天），迭代快但迁移缺陷突出 |
| **Hermes** | 网关架构、插件生命周期、跨客户端通知策略 | Discord/多平台机器人开发者、插件生态构建者 | Python/uv 插件体系，网关-客户端解耦，关注“谁在座”与通知去干扰 |
| **OpenClaw** | 自动化任务、备份恢复、Gateway 配置热重载 | 企业自动化运维、PostgreSQL 存储用户 | P1 故障集中于备份崩溃循环，侧重审计可追溯与令牌预算精确控制 |
| **DeepSeek 两项目** | — | — | 过去 24 小时无社区活动，生态活跃度待观察 |

## 5. 社区热度与成熟度

- **最高活跃度**：OpenCode（50 PR/天）与 Hermes（50 PR/天）PR 更新密集，处于快速功能扩张阶段；Claude Code Issues 数最多（50 条），但 PR 极少（3 条），说明用户反馈强烈而官方代码合并相对保守。
- **快速迭代**：Gemini CLI 与 OpenAI Codex 均在 24 小时内发布新版本（Nightly/Alpha），属于预发布通道，适合尝鲜但生产环境需谨慎。
- **成熟度分层**：Claude Code、OpenAI Codex 社区用户基数大，问题集中在核心工作流回归（GitHub 连接器、启动崩溃）；OpenClaw、Hermes 问题更偏向垂直领域（自动化备份、网关进程残留），社区讨论相对集中但深度高。
- **停滞信号**：DeepSeek Reasonix 与 DeepSeek Harness 过去 24 小时无任何 Issue/PR/Release 更新，社区活跃度极低，需关注项目维护状态。

## 6. 值得关注的趋势信号

1. **从 CLI 向“AI 操作系统”延伸**  
   多个工具开始关注桌面端会话管理、移动端远程发起、浏览器标签页集成等超出传统命令行的场景，AI CLI 正向集成式开发环境演进。

2. **资源治理成为刚需**  
   多子代理 OOM、令牌预算低估、并发会话内存预算等问题频繁出现，表明“无限上下文”带来的资源失控已成为企业采购和部署的关键考量。

3. **开源化与自托管呼声高涨**  
   Claude Code 的开源 PR 持续受关注，OpenCode 强调提供商中立，Hermes 插件体系开放，社区对供应商锁定的敏感度显著提升。

4. **跨平台回归是普遍痛点**  
   Windows 盘符大小写、macOS 壁纸触发崩溃、Wayland 下浏览器代理失败等平台特定 Bug 高频出现，跨平台 QA 能力将成为工具选型的分水岭。

5. **审计与可追溯性进入主流视野**  
   OpenClaw 的命令审批关联执行结果、Workboard 评决绑定工件修订版等需求，预示 AI CLI 在企业合规场景下的审计链路正从“可选”变为“必选”。

**对开发者的参考建议**：若构建基于 AI CLI 的内部开发平台，建议优先评估工具的跨平台稳定性、多代理内存治理能力及 MCP/插件生态成熟度；若涉及合规审计，应重点关注 OpenClaw 等在审计链路上已有实践的工具；对 DeepSeek 相关项目的采纳建议保持观望，直至社区活动恢复。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-22）

## 1. 热门 Skills 排行

以下按社区活跃度与更新频率筛选的 8 个代表性 PR，均处于 **OPEN** 状态，尚未合并主分支。

| 排名 | PR | 功能简介 | 社区讨论热点 | 链接 |
|------|------|----------|--------------|------|
| 1 | **#1681 fix(skill-creator): support direct execution of package_skill.py** | 修复 `skill-creator` 工具链中 `package_skill.py` 无法作为独立脚本直接运行的模块导入问题，并更新过时的 CLI 路径与帮助信息。 | 技能打包与分发流程的可用性；社区对自建 Skill 工具链稳定性的关注度高。 | https://github.com/anthropics/skills/pull/1681 |
| 2 | **#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills** | 新增两个技能：Notion 产品/技术规格转 Claude Code 可执行任务计划；定量简历审计与评分。 | 企业知识库（Notion）与 AI 开发流程的结合；简历/人力资源自动化场景。 | https://github.com/anthropics/skills/pull/1245 |
| 3 | **#525 Add pyxel skill for retro game development** | 新增 Pyxel 复古游戏开发技能，涵盖实现指导、无头输入驱动运行、帧级检查与状态验证。 | 游戏开发领域对 Claude Code 的延伸；社区对娱乐/创意类技能的持续需求（跨度半年仍有更新）。 | https://github.com/anthropics/skills/pull/525 |
| 4 | **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers** | 适配 MCP Python SDK ≥2.0.0 的重命名（`streamable_http_client`）及自定义 HTTP 头配置方式。 | MCP 生态版本迭代带来的兼容性压力；构建 MCP 连接器的开发者最关注的技术痛点。 | https://github.com/anthropics/skills/pull/1742 |
| 5 | **#1980 webapp-testing: avoid shell=True in with_server.py** | 移除 Web 应用测试技能中 `subprocess.Popen(..., shell=True)` 的命令注入风险（CWE-78）。 | 技能代码安全审计；社区对执行 shell 命令类技能的安全基线要求提高。 | https://github.com/anthropics/skills/pull/1980 |
| 6 | **#1792 fix(docx): report LibreOffice timeout as an error and verify the output** | 修复 docx 技能中 LibreOffice 超时被误报为成功的问题，新增输出文档修订痕迹校验。 | 文档自动化处理的可靠性；企业级文档工作流对错误处理的严格要求。 | https://github.com/anthropics/skills/pull/1792 |
| 7 | **#1771 feat(skills): add proofcore-contract-auditor** | 新增 Web3 智能合约公证技能，对 Solidity/Rust 合约进行静态分析，并将审计证明锚定至 TON 区块链。 | 区块链/智能合约安全审计；社区对垂直领域专用技能的探索。 | https://github.com/anthropics/skills/pull/1771 |
| 8 | **#1703 Add md2video-audio skill** | 新增零成本 Markdown 转 MP4 视频技能，基于 Marp 生成幻灯片并配逼真人声旁白。 | 内容创作自动化；文档到多媒体的格式转换需求。 | https://github.com/anthropics/skills/pull/1703 |

> **状态说明**：上述 PR 均显示为 `OPEN`，未见合并（merged）或草稿（draft）标记，代表社区贡献仍在等待官方审核与合入。

---

## 2. 社区需求趋势

从 Issues 中提炼出四个最显著的需求方向：

### ① 技能信任与命名空间治理（安全合规类）
**代表 Issue**：#492 Community skills distributed under anthropic/ namespace enable trust boundary abuse（46 评论，3 👍）  
社区强烈关注社区技能冒用 `anthropic/` 官方命名空间带来的信任边界漏洞，用户可能误将社区技能当作官方技能授予高权限。这是当前讨论最热、评论最多的 Issue，反映出技能分发与身份验证机制亟待完善。

### ② 组织内技能共享与分发（企业协作类）
**代表 Issue**：#228 Enable org-wide skill sharing in Claude.ai（17 评论，8 👍）  
用户期望在 Claude.ai 组织内直接共享技能，而非依赖手动下载 `.skill` 文件并通过 Slack/Teams 转发。组织级技能库、共享链接成为企业采购和团队协作场景的核心诉求。

### ③ 技能触发与评估可靠性（工具链类）
**代表 Issue**：#556 run_eval.py: claude -p never triggers skills/commands（13 评论，7 👍）；#1352 skill-creator: run_eval.py parallel workers cross-match skill UUIDs（6 评论，3 👍）  
社区反映技能触发率为 0%、并行评估时 UUID 交叉匹配导致假阴性，表明 `skill-creator` 及 `run_eval.py` 的触发检测与评估流程存在系统性缺陷，亟需修复。

### ④ 垂直领域专用技能（功能扩展类）
**代表 Issue**：#1329 compact-memory（10 评论）；#1385 Reasoning Quality Gate Pipeline（7 评论）；#412 agent-governance（6 评论）  
社区提出的新技能方向集中在：长代理会话的紧凑记忆表示、AI 推理质量三级闸门管线、AI Agent 治理模式（策略执行、威胁检测、审计追踪）。这些方向指向复杂 Agent 工作流的可控性与可观测性。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新时间较近，且功能切中社区痛点，大概率在近期落地：

1. **#1681 fix(skill-creator): support direct execution of package_skill.py**  
   更新至 2026-11-19，是列表中活跃度最高的工具链修复。合入后将显著降低社区自建 Skill 的打包门槛。  
   https://github.com/anthropics/skills/pull/1681

2. **#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills**  
   更新至 2026-10-15，跨 Notion 企业知识库与 HR 自动化两个高频业务场景，官方合入价值高。  
   https://github.com/anthropics/skills/pull/1245

3. **#1980 webapp-testing: avoid shell=True in with_server.py**  
   涉及 CWE-78 命令注入修复，安全补丁类 PR 通常获得审核优先级，预计近期合并。  
   https://github.com/anthropics/skills/pull/1980

4. **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers**  
   适配 MCP SDK 2.0 破坏性变更，对构建 MCP 连接器的开发者具有刚需，兼容性修复优先级高。  
   https://github.com/anthropics/skills/pull/1742

5. **#525 Add pyxel skill for retro game development**  
   虽然创建较早（2026-03），但持续更新至 2026-11-01，表明社区持续关注，创意类技能合入可能性大。  
   https://github.com/anthropics/skills/pull/525

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在确保技能分发信任边界与触发评估可靠性的前提下，加速企业级工作流（文档、MCP、Web 测试）与垂直领域（Web3、游戏、HR）技能的官方收录与组织内共享。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-22  
**数据来源**: [anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 1. 今日速览

过去 24 小时内，Claude Code 仓库未发布新版本，但社区活跃度依然较高，共 50 条 Issue 和 3 条 PR 更新。核心关注点集中在 **GitHub 连接器内容访问回归问题**、**Windows/macOS 平台稳定性**、**多子代理内存泄漏/OOM** 以及 **MCP 服务器重复启动** 等领域。移动端远程控制与桌面端会话管理的功能请求也持续获得社区关注。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

以下 Issue 按社区关注度（评论数、点赞数）及影响范围筛选，均为过去 24 小时内有更新的活跃议题：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #71542 | GitHub connector links repositories successfully but Claude cannot access content for ANY repository | 账号级回归问题，公开和私有仓库均无法通过 GitHub 连接器读取内容，严重影响核心工作流。 | 评论 73 / 👍 71，社区反应最强烈的 Issue，多用户确认受影响。 | [查看详情](https://github.com/anthropics/claude-code/issues/71542) |
| #19666 | Claude Code crashes with Bun panic in Visual Studio Code on Windows 11 | Windows 11 上 VS Code 集成中出现 Bun panic 导致崩溃，涉及打包、IDE 和内存性能。 | 评论 18 / 👍 19，Windows 开发者高度关注。 | [查看详情](https://github.com/anthropics/claude-code/issues/19666) |
| #91618 | Windows: isolation-worktree safety check rejects valid worktree due to case-sensitive drive-letter comparison | Windows 11 下工作区树安全检查因盘符大小写敏感比较误拒绝合法 worktree。 | 评论 11 / 👍 2，影响 Windows 本地开发环境。 | [查看详情](https://github.com/anthropics/claude-code/issues/91618) |
| #96118 | Anthropic API Error: Opus 5.5 safeguards flagged message with reasoning_extraction | Opus 5.5（1M 上下文）的安全护栏误触发，阻止推理内容提取，影响模型调用体验。 | 评论 8 / 👍 4，涉及模型安全策略与用户预期的冲突。 | [查看详情](https://github.com/anthropics/claude-code/issues/96118) |
| #91815 | Desktop app: allow remote session starts on a machine, with a device picker in the mobile app | 功能请求：从移动端发起桌面端新会话，而非仅查看已有会话。 | 评论 8 / 👍 15，跨设备工作流需求明显。 | [查看详情](https://github.com/anthropics/claude-code/issues/91815) |
| #74001 | OOM crash under multi-subagent load: subagent CLI processes grow to ~6.5 GB RSS each | 多子代理负载下单进程内存飙升至 6.5 GB，导致 Linux 桌面端 OOM 杀死进程，已关闭但讨论持续。 | 评论 8 / 👍 1，多代理场景下的内存治理是长期痛点。 | [查看详情](https://github.com/anthropics/claude-code/issues/74001) |
| #107433 | [FEATURE] Memory controls for many concurrent sessions: shared MCP servers and an agent memory budget | 游戏工作室场景下，24 个会话占用 9.3 GB 内存，请求共享 MCP 服务器与代理内存预算控制。 | 评论 7 / 👍 0，企业级并发场景对资源管控的迫切需求。 | [查看详情](https://github.com/anthropics/claude-code/issues/107433) |
| #85895 | CC spawns project .mcp.json stdio server twice per launch | 每次启动重复生成两次项目级 MCP stdio 服务器，导致单连接后端丢失工具客户端。 | 评论 5 / 👍 0，MCP 生态稳定性问题。 | [查看详情](https://github.com/anthropics/claude-code/issues/85895) |
| #111057 | Desktop (macOS): Remote Control keeps turning itself off on local sessions | macOS 桌面端远程控制在本地会话中自动关闭，导致手机端工作流中断。 | 评论 4 / 👍 0，远程控制稳定性影响移动办公体验。 | [查看详情](https://github.com/anthropics/claude-code/issues/111057) |
| #111596 | Claude Desktop (macOS): Cmd+Q hangs forever in Node environment teardown | macOS 下 Cmd+Q 退出时在 Node 环境拆卸阶段卡死，需强制退出才能重新启动。 | 评论 3 / 👍 0，新报告（2026-11-21），需关注退出流程缺陷。 | [查看详情](https://github.com/anthropics/claude-code/issues/111596) |

---

## 4. 重要 PR 进展（共 3 条）

过去 24 小时内仅有 3 条 PR 更新，详情如下：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|---------------|------|
| #41447 | feat: open source claude code ✨ | OPEN | 旨在开源 Claude Code，关联多个历史 Issue（#59、#456、#2846 等），若合并将对社区生态产生重大影响。 | [查看详情](https://github.com/anthropics/claude-code/pull/41447) |
| #111198 | Don't run @claude mentions on pull requests from forks | CLOSED | 防止 Fork 仓库的 PR 上 `@claude` 提及被执行，增强安全性，避免未授权代理调用。 | [查看详情](https://github.com/anthropics/claude-code/pull/111198) |
| #1 | Create SECURITY.md | CLOSED | 创建安全策略文档，规范安全漏洞披露流程。 | [查看详情](https://github.com/anthropics/claude-code/pull/1) |

---

## 5. 功能需求趋势

从近期 Issue 中可提炼出以下社区关注的功能方向：

1. **跨设备与远程会话管理**  
   用户希望从移动端（iOS/Android）直接发起桌面端新会话（#91815），并改进远程控制的连接稳定性（#111057、#98500）。移动端推送通知除远程控制外均未送达，也是待改进点。

2. **内存与资源管控**  
   多子代理负载下的 OOM 崩溃（#74001）、并发会话内存预算（#107433）以及 MCP 服务器重复启动导致的资源浪费（#85895），表明社区对资源隔离与限额功能的需求迫切。

3. **IDE 与平台集成稳定性**  
   Windows 上的 Bun panic 崩溃（#19666）、盘符大小写比较缺陷（#91618）、VS Code 集成浏览器 MCP 工具挂起（#94475），显示跨平台（尤其是 Windows）集成仍需打磨。

4. **模型与 API 护栏体验**  
   Opus 5.5 的安全护栏误触发（#96118）、自定义模型上下文窗口识别问题（#94487），用户期望更透明的模型限制说明与更合理的护栏策略。

5. **开源与生态开放**  
   #41447 开源 Claude Code 的 PR 持续受关注，社区期待更开放的插件、适配器及自托管能力。

---

## 6. 开发者关注点

### 高频痛点
- **GitHub 连接器内容访问失效**（#71542）：账号级回归，公开/私有仓库均不可用，直接阻断基于 GitHub 上下文的代码协作流程，是当前最高优先级的缺陷。
- **多代理内存失控**：子代理 CLI 进程 RSS 飙升至 6.5 GB，缺乏有效的驱逐与预算机制，在共享工作站上易导致 OOM。
- **MCP 生态不稳定**：项目级 MCP 服务器重复启动、集成浏览器工具结果不返回、单连接后端丢失客户端，影响扩展性。

### 高频需求
- **移动端主动发起桌面会话**：现有远程控制仅支持查看/连接，缺乏从手机端“启动”新会话的入口。
- **会话生命周期头less 控制**：希望像子代理一样通过 CLI 启动、读取、停止云端会话（#97450）。
- **桌面端退出与通知修复**：macOS Cmd+Q 挂起（#111596）、iOS 推送不送达（#98500）影响日常可用性。

---

**注**：本日报基于 GitHub 仓库 `anthropics/claude-code` 过去 24 小时内更新的 Issues 与 PR 数据生成，未包含未公开的内部版本信息。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-22  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

过去 24 小时内，Codex 社区围绕 **Windows 和 macOS 桌面端的启动崩溃、权限选择器丢失及 Computer Use 功能异常** 展开了密集讨论，多个回归性 Bug 导致用户工作流中断。与此同时，TUI 端持续收到剪贴板、快捷键和会话管理相关的修复 PR，社区对跨平台本地聊天迁移与归档聊天可见性的需求依然强烈。

---

## 2. 版本发布

| 版本 | 发布时间 | 说明 |
|------|---------|------|
| `rust-v0.173.0-alpha.4` | 2026-11-21 | Codex Rust 端 Alpha 预览版，具体变更未在发布说明中详细列出。 |

> 💡 该版本为预发布渠道，建议生产环境谨慎升级。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 关注理由 |
|---|------|------|---------|----------|
| [#57101](https://github.com/openai/codex/issues/57101) | Windows Computer Use：截图生成后捕获访问权限和金色/黄色显示边框仍保持打开 | OPEN | 82 / 13 | Windows 端 Computer Use 模块的资源泄露类 Bug，评论数远超其他 Issue，表明大量用户受影响，且问题持续未解决。 |
| [#62650](https://github.com/openai/codex/issues/62650) | macOS Codex App 26.1117.31558 在壁纸色调回退时启动崩溃 | OPEN | 56 / 18 | 启动阻塞型回归（launch-blocking regression），用户甚至需要更换壁纸才能绕过，影响面广。 |
| [#62943](https://github.com/openai/codex/issues/62943) | Windows Nov 21 更新回归：新对话丢失权限和执行位置选择器，Max 推理努力消失 | OPEN | 9 / 4 | 刚于 11-21 创建，直接影响核心交互（权限与模型设置），属于典型的版本回归。 |
| [#61936](https://github.com/openai/codex/issues/61936) | macOS 高影响回归：Git fetch/merge/commit 因 .git 权限错误中止 | OPEN | 3 / 1 | 今日（11-22）更新，阻断常规 Git 工作流，开发者反馈“Approve for me”模式下仍受影响。 |
| [#52039](https://github.com/openai/codex/issues/52039) | Pro 200：62,500 促销积分在每周额度尚剩时被扣除，分析数据回填使用量 | OPEN | 13 / 0 | 涉及计费与积分逻辑，付费用户高度关注，可能影响信任度。 |
| [#62234](https://github.com/openai/codex/issues/62234) | macOS：更新后底部面板设置消失，终端位置被强制移至右侧 | CLOSED | 11 / 14 | UI 回归问题，已关闭但社区关注度高，反映桌面端布局稳定性仍有隐患。 |
| [#27207](https://github.com/openai/codex/issues/27207) | 🩹 从主 Codex UI 恢复归档聊天访问 | OPEN | 10 / 18 | 功能需求类 Issue，用户希望归档聊天从主界面直接可见，而非隐藏在设置中。 |
| [#63025](https://github.com/openai/codex/issues/63025) | Windows / ChatGPT Work：完全访问权限消失，审批请求不再允许继续 | OPEN | 3 / 1 | 沙盒权限模型异常，直接阻断 Work 模式下的本地工具调用。 |
| [#63052](https://github.com/openai/codex/issues/63052) | Windows Native Computer Use 初始化超时，早期窗口状态继续错误 | OPEN | 3 / 0 | Computer Use 功能在 Windows 端的稳定性问题，与 #57101 形成同一领域的持续反馈。 |
| [#62899](https://github.com/openai/codex/issues/62899) | iOS ChatGPT 打开 Codex 标签页崩溃：SwiftUI metadata EXC_BAD_ACCESS | OPEN | 2 / 1 | 移动端崩溃，且桌面端正常，提示 iOS 客户端存在平台特定适配问题。 |

---

## 4. 重要 PR 进展（精选 10 条）

以下 PR 均于 2026-11-21 创建并关闭，主要集中在 TUI 体验优化、Cloud 流恢复、剪贴板与权限上下文等方面：

| # | 标题 | 核心变更 |
|---|------|---------|
| [#63058](https://github.com/openai/codex/pull/63058) | Keep Cloud reply stream recovery retryable after transient failures | 修复 Cloud 回复流在瞬时失败后恢复重试次数耗尽的问题，提升云端对话稳定性。 |
| [#63056](https://github.com/openai/codex/pull/63056) | Keep the TUI transcript selection cursor visible | 修复 TUI 成绩单选择模式中光标移出视口后定位异常的问题。 |
| [#63054](https://github.com/openai/codex/pull/63054) | Suppress TUI completion popups in shell mode | 在 `!` Shell 模式下禁用补全弹窗，避免 PowerShell 变量语法误触发代码补全。 |
| [#63047](https://github.com/openai/codex/pull/63047) | Select and copy Markdown blocks in the transcript | 新增 TUI 成绩单中 Markdown 块的选中与复制能力（`m` 标记，`h/l/j/k` 导航）。 |
| [#63046](https://github.com/openai/codex/pull/63046) | Refresh the Code Mode exec catalog when helper signatures change | 当全局 helper 签名变更时刷新 Code Mode 执行目录，避免模型使用过时的 `functions.exec` 声明。 |
| [#63036](https://github.com/openai/codex/pull/63036) | Complete named settings for TUI slash commands | 为 `/model`、`/permissions`、`/title`、`/statusline`、`/mcp login` 等斜杠命令增加具名参数补全。 |
| [#63022](https://github.com/openai/codex/pull/63022) | Fix clipboard text fallback and guard pending pastes in the TUI | 修复 X11 剪贴板图像读取失败回退为文本的问题，并防止提交时携带未完成的粘贴内容。 |
| [#63013](https://github.com/openai/codex/pull/63013) | Support the Orca integrated terminal | 在 `codex doctor` 中识别 Orca 终端，优化 Markdown 链接渲染及 Kitty 图形适配。 |
| [#62931](https://github.com/openai/codex/pull/62931) | Forward TUI clipboard copies to Rex clients | 通过 OSC 52 将 TUI 剪贴板内容转发至附加的 Rex 客户端，解决多客户端剪贴板不同步问题。 |
| [#62905](https://github.com/openai/codex/pull/62905) | Add a reasoning summary picker to `/config` | 在 `/config` 增加推理摘要选择器（Auto / Concise / Detailed / None），并保存至会话配置。 |

---

## 5. 功能需求趋势

从 Issues 中提炼出社区当前最关注的四个功能方向：

1. **跨平台本地会话迁移**  
   如 #47087 所示，用户希望在 Windows、macOS 之间迁移本地 Codex 聊天历史，且希望有官方 CLI 支持，当前缺乏一站式方案。

2. **归档聊天的主界面可见性**  
   #27207 反映用户不满归档聊天被隐藏在 `Settings → Archived chats` 中，要求恢复至主 UI 直接可访问。

3. **Computer Use / 沙盒权限模型稳定性**  
   Windows 端 Computer Use 的资源残留（#57101、#63052）和 Work 模式权限丢失（#63025）表明，用户对“可控、可审计”的本地代理执行环境有更高期待。

4. **TUI 编辑体验与剪贴板一致性**  
   多个 TUI Issue（#17793、#17103、#14213、#63022）集中在粘贴、退格、快捷键和剪贴板回退上，说明终端用户希望 TUI 表现与原生终端更对齐。

---

## 6. 开发者关注点（痛点与高频需求）

### 🔴 严重痛点
- **桌面端启动与运行回归**：macOS 壁纸触发的启动崩溃（#62650）和 Windows 启动挂起（#62731）直接阻断用户使用。
- **核心工作流中断**：macOS Git 权限错误（#61936）和 Windows 权限选择器消失（#62943）影响日常开发和代理任务执行。
- **计费透明度**：促销积分与周度额度扣除逻辑不清（#52039），付费用户反馈强烈。

### 🟡 高频需求
- **UI/UX 稳定性**：底部面板设置丢失（#62234）、终端位置强制调整、iOS 标签页崩溃（#62899）等平台特定回归问题需尽快修复。
- **TUI 交互完善**：剪贴板文本/图像回退、Markdown 块复制、斜杠命令具名参数补全等细节体验持续被社区提及。
- **云端与本地同步**：Cloud 线程就绪重试（#57674）、Rex 客户端剪贴板转发（#62931）等跨客户端状态同步问题仍待完善。

---

**数据统计**：过去 24 小时 Issues 46 条（更新），Pull Requests 31 条（更新），新 Release 1 个。  
**报告生成时间**：2026-11-22

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-22)

## 今日速览

Gemini CLI 昨日发布 nightly 版本 v0.71.0-nightly.20261121，主要修复了 Windows 路径解析与会话恢复逻辑。社区围绕 **Subagent（子代理）稳定性** 与 **浏览器代理兼容性** 展开密集讨论，多个 P1/P2 级别 Bug 指向代理挂起、配置覆盖失效及 Wayland 环境下崩溃等核心问题。PR 侧则集中于核心模块的安全加固、退出码统一及 Node 26 兼容性适配。

---

## 版本发布

**v0.71.0-nightly.20261121.geecccfcd5**  
发布时间：2026-11-21

主要变更：
- `fix(cli)`：在 Windows 上使用波浪号和反斜杠展开主目录相对路径（@urielefrenvirtusa，PR #30376），修复 `policyPaths`、`adminPolicyPaths` 等配置在 Windows 下的解析问题。
- `fix(cli)`：恢复最近活跃的会话，而非最近启动的会话（@urielefrenvirtusa），改善 `gemini --resume` 的体验。

[查看完整 Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0-nightly.20261121.geecccfcd5)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 评论 | 关注理由 |
|---|------|-------------|------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURN is reported as GOAL success, hiding interruption | P1 / Bug | 14 | 子代理在达到最大轮次后仍上报 `status: "success"`，掩盖了实际中断，直接影响任务可靠性，亟需修复。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 / Bug | 8（👍8） | 通用代理在处理简单操作（如创建文件夹）时无限挂起，用户需手动取消，严重影响可用性。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | P2 / Enhancement | 9 | 提议利用模型对 Bash 的原生亲和力，通过零依赖 OS 沙箱提升代码探索与编辑能力，方向具有前瞻性。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 7 | 探索 AST 感知的文件读取与搜索，有望大幅减少上下文膨胀并提升代码定位精度。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 / Bug | 7 | 模型在相关场景下不主动调用自定义技能与子代理，需显式指令才触发，影响自动化体验。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides | P2 / Bug | 5 | 浏览器代理完全忽略全局/项目级 `settings.json` 中的 `maxTurns` 等覆盖配置，配置系统失效。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 / Bug | 4（👍1） | 浏览器子代理在 Wayland 显示服务器下失败，Linux 桌面用户受影响明显。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | Gemini CLI encounters 400 error with > 128 tools | P2 / Bug | 3 | 工具数量超过阈值时触发 400 错误，限制大型代码库或复杂工作流下的工具扩展。 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Agent should stop/discourage destructive behavior | P2 / Customer Issue | 3（👍1） | 模型可能执行 `git reset --force` 等破坏性命令，社区呼吁增加安全拦截与替代方案提示。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done output hook causes crash | P1 / Bug | 3 | 输出钩子在打印用户摘要时导致 CLI 崩溃，影响长任务完成后的结果查看。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#30376](https://github.com/google-gemini/gemini-cli/pull/30376) | fix(cli): expand Windows home-relative paths using tilde and backslash | Merged (在 Release 中) | 修复 Windows 下 `~\...` 路径解析，使 `policyPaths` 等配置正确映射到用户主目录。 |
| [#30277](https://github.com/google-gemini/gemini-cli/pull/30277) | fix(sandbox): improve permission denial detection and unsupported environment handling | Open | 增强 `@google/gemini-cli-core` 在容器化和受限环境下的权限拒绝检测与处理。 |
| [#30273](https://github.com/google-gemini/gemini-cli/pull/30273) | fix(core): unify exit codes mapping and fatal error hierarchy | Open | 统一 CLI 进程退出码，将硬编码的致命错误代码纳入 `ExitCodes` 统一管理。 |
| [#30281](https://github.com/google-gemini/gemini-cli/pull/30281) | fix(core): honor configured fetch timeouts on Node 26 | Open | 升级 Undici 至 7.30.2，修复 Node 26 下全局调度器符号问题，确保配置的 fetch 超时生效。 |
| [#30174](https://github.com/google-gemini/gemini-cli/pull/30174) | fix(core): stop body timeouts from killing and replaying long model turns | Closed | 修复流式长回合因 Undici body 超时被中止并重试多次的问题，减少不必要的 Token 浪费。 |
| [#30171](https://github.com/google-gemini/gemini-cli/pull/30171) | fix(core): flag recursive and forced rm regardless of flag position | Closed | 修复 `isDangerousCommand` 对 `rm -r -f`、`rm --recursive --force` 等变体的危险命令识别漏洞。 |
| [#30169](https://github.com/google-gemini/gemini-cli/pull/30169) | fix(cli): keep pasted @ text and fuzzy @ matches from attaching secrets | Closed | 默认转义粘贴文本中的 `@` 符号，防止 SSH 私钥等敏感信息被意外附加到模型请求。 |
| [#30175](https://github.com/google-gemini/gemini-cli/pull/30175) | fix(core): apply local subagents' generateContentConfig for every model | Closed | 让本地子代理对所有模型值（`auto`、`flash`、`pro` 及具体模型名）都应用声明的生成配置。 |
| [#30172](https://github.com/google-gemini/gemini-cli/pull/30172) | fix(core): keep one result per tool call ID in session records | Closed | 修复会话记录与实时历史中同一工具调用 ID 产生重复结果的问题，保证数据一致性。 |
| [#30279](https://github.com/google-gemini/gemini-cli/pull/30279) | fix(core): preserve trimmed function-call name in history | Open | 修复函数调用名称包含前后空格时导致 `400 INVALID_ARGUMENT` 的问题，保持历史记录一致性。 |

---

## 功能需求趋势

从近期 Issues 与 PR 可观察到以下社区关注方向：

1. **子代理（Subagent）可靠性与自动化**  
   社区高度关注子代理在超时、挂起、配置忽略等场景下的表现（#22323、#21409、#21968），期望提升其自主调用意愿与任务恢复能力。

2. **AST 感知的代码理解工具**  
   多个 Issue 提出基于 AST 的文件读取、搜索与代码库映射（#22745、#22746、#22747），旨在减少上下文膨胀并提升代码定位精度。

3. **浏览器代理跨平台兼容性**  
   Wayland 下的失败（#21983）与会话锁恢复（#22232）表明浏览器子代理在 Linux 桌面环境下的稳定性是短期痛点。

4. **安全与破坏性操作防护**  
   危险命令识别（#30171）、粘贴内容敏感信息拦截（#30169）、破坏性行为阻止（#22672）体现社区对代理安全边界的重视。

5. **跨平台与运行时兼容性**  
   Windows 路径解析（#30376）、Node 26 fetch 超时（#30281）及沙箱权限处理（#30277）显示社区在推动 CLI 在更多操作系统与 Node 版本上的稳定运行。

---

## 开发者关注点

- **P1 级 Bug 堆积**：通用代理挂起（#21409）、子代理超时伪成功（#22323）、输出钩子崩溃（#22186）等高优先级问题尚未全部闭环，建议团队优先排查。
- **配置系统一致性**：浏览器代理忽略 `settings.json` 覆盖（#22267）、软链接代理未被识别（#20079）反映配置加载与代理注册逻辑存在边缘情况。
- **长上下文与大工具集支持**：超过 128 个工具触发 400 错误（#24246）、长回合流式超时导致重试（#30174），提示在大规模代码库场景下仍需优化 Token 管理与请求稳定性。
- **文档与可发现性**：多个 PR 仅为修复文档损坏链接（#30375、#30395、

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-22)

## 今日速览

OpenCode 社区今日活跃度持续高位，共 27 条 Issue 与 50 条 PR 更新。社区核心关注点集中在 **V1→V2 迁移稳定性**、**桌面端资源占用（RAM/SQLite）** 以及 **多提供商模型适配**（Mistral GLM 系列、GitHub Copilot PDF 输入）。与此同时，大量桌面端与工作区管理相关的功能需求被提交，显示社区正在向更完整的 AI 开发工作流延伸。

> 📭 **版本发布**：过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 互动 | 关注理由 |
|---|------|------|------|----------|
| [#59387](https://github.com/anomalyco/opencode/issues/59387) | [zen] Free tier issues: read this first, then post your report here | OPEN | 405 评论 / 30 👍 | 社区最大热点。汇总免费层配额耗尽、重置失效、Desktop 版本过期等问题，405 条评论显示用户对免费额度与计费体验高度敏感。 |
| [#65497](https://github.com/anomalyco/opencode/issues/65497) | V1→V2 migration trusts the completed marker and never repairs sessions whose messages were never projected | OPEN | 0 评论 | 关键迁移缺陷：KV 标记迁移已完成，但 `session_message` 为空，导致会话列表可见却打开后无消息。对生产环境长期运行的 `opencode serve` 用户影响直接。 |
| [#65496](https://github.com/anomalyco/opencode/issues/65496) | [BUG]: RAM Usage Through the Roof | OPEN | 1 评论 / 1 👍 | 用户反馈 CLI 内存占用异常，质疑其作为“薄 API 包装器”的资源消耗不合理，涉及多实例运行场景。 |
| [#59189](https://github.com/anomalyco/opencode/issues/59189) | desktop: service stuck at 500 after SQLite "disk I/O error" on resume from sleep | OPEN | 2 评论 | Windows 休眠恢复后 SQLite 磁盘 I/O 错误导致服务端口被占用，Desktop 无法启动，影响桌面端可用性。 |
| [#63743](https://github.com/anomalyco/opencode/issues/63743) | cli: opencode upgrade via npm uses --force, downloading all platform optionalDependencies (~2GB) | OPEN | 8 评论 | npm 升级路径使用 `--force` 强制下载全部平台可选依赖，约 2GB 流量开销，对受限网络环境用户不友好。 |
| [#43199](https://github.com/anomalyco/opencode/issues/43199) | Tool calls throw errors for Mistral's GLM-5.2 | CLOSED | 13 评论 / 11 👍 | Mistral 第三方模型 GLM-5.2 工具调用崩溃问题，反映社区对新模型适配的快速响应能力。 |
| [#60653](https://github.com/anomalyco/opencode/issues/60653) | tui: show the cost estimate in the mini/run footer | OPEN | 2 评论 | 成本估算实验目前仅覆盖主侧边栏，mini/run 模式下提供商报告 `$0` 时不显示花费，用户希望统一成本可见性。 |
| [#65490](https://github.com/anomalyco/opencode/issues/65490) | GitHub Copilot: OpenCode advertises PDF support for models routed to `/chat/completions` | OPEN | 1 评论 | Copilot 路由至 `/chat/completions` 的模型（如 Gemini）不支持 PDF `file` 类型，附件读取返回 HTTP 400，需修正能力声明。 |
| [#28889](https://github.com/anomalyco/opencode/issues/28889) | [FEATURE]: Add Antigravity CLI connector & Google OAuth provider | CLOSED | 4 评论 / 10 👍 | 关于 Google Antigravity CLI 连接器与 OAuth 提供商的功能请求，已有对应 PR 实施，体现社区对多账号认证需求。 |
| [#63981](https://github.com/anomalyco/opencode/issues/63981) | [FEATURE]: Configurable editing tool selection and patch result style | CLOSED | 3 评论 | 当前 `patch` 与 `edit/write` 工具选择基于硬编码模型 ID 启发式，用户希望可配置编辑工具选择与补丁结果样式。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#65492](https://github.com/anomalyco/opencode/pull/65492) | fix(core): disable Copilot PDF input on /chat/completions | OPEN | 修复 #65490，禁用 GitHub Copilot 路由模型的 PDF 输入，避免 HTTP 400 错误。 |
| [#65493](https://github.com/anomalyco/opencode/pull/65493) | fix(codemode): show pinned tools' full descriptions in the catalog | CLOSED | Code Mode 目录仅显示工具描述首行（限 500 字符），现修复为显示完整描述。 |
| [#65494](https://github.com/anomalyco/opencode/pull/65494) | fix(core): run calls renamed into Code Mode and follow a renamed execute | OPEN | 将 `bash` 别名保留在输入修复插件，修复重命名执行调用时的两个 Bug。 |
| [#65467](https://github.com/anomalyco/opencode/pull/65467) | fix(core): never save a bare escalation wildcard from Always allow | OPEN | 修复“始终允许”点击时保存通配符 escalation 的问题，避免误批所有通过该包装器运行的命令。 |
| [#65489](https://github.com/anomalyco/opencode/pull/65489) | feat(core): add the Google Antigravity provider | OPEN | 实现 Google Antigravity 提供商（ACP 路由），对应功能请求 #28889，拆分自之前合并两个变更的 PR。 |
| [#65472](https://github.com/anomalyco/opencode/pull/65472) | fix(core): spell Claude variants for Bedrock application inference profile ARNs | OPEN | 修复 Bedrock `bedrockConverse` 仅通过 `id.includes("anthropic")` 判断 Claude 与 Nova 的问题，支持 AWS 应用推理配置文件 ARN。 |
| [#65460](https://github.com/anomalyco/opencode/pull/65460) | fix(session-ui): show the folder a search or listing ran in, not its parent | CLOSED | 修复会话 UI 中 Glob/Grep 等工具组显示的文件夹路径，应显示实际运行目录而非父目录。 |
| [#63982](https://github.com/anomalyco/opencode/pull/63982) | feat(core): add configurable editing tool selection | CLOSED | 实现可配置的编辑工具选择，关闭 #63981，允许用户自定义 `patch` 与 `edit/write` 的选择逻辑。 |
| [#65261](https://github.com/anomalyco/opencode/pull/65261) | [contributor] feat(core): agent widgets | OPEN | 引入 Agent 交互式 Widget（PsychoScript 模板 + JSON 数据），由各客户端原生渲染，增强会话交互能力。 |
| [#65271](https://github.com/anomalyco/opencode/pull/65271) | feat(mcp): follow the MCP Events beta for push delivery | OPEN | 将实验性 MCP Events 客户端（推送交付）跟进至 SEP-3415 Beta 版本，增强 MCP 协议支持。 |

---

## 功能需求趋势

从今日 27 条 Issue 中可观察到以下社区关注方向：

1. **桌面端与工作区管理增强**：大量用户提交桌面端功能需求，包括跨项目持久化实用工作区、原生 Android/iOS 模拟器工作区、远程浏览器标签页查看、浏览器配置文件命名、空闲标签页丢弃等，显示社区希望 OpenCode 从 CLI 工具演进为更完整的桌面开发环境。
2. **会话与工作流持久化**：用户希望将审查后的变更携带至提交与 PR 检查、预览工作树清理策略、搜索外部编码代理转录源、Codex CLI 工作者稳定启动/恢复身份等，反映对长周期开发任务管理的需求。
3. **多提供商与模型适配**：Mistral GLM 系列、GitHub Copilot 路由模型、Bedrock 推理配置文件等问题频繁出现，社区对新模型、新提供商的兼容性与能力声明修正持续关注。
4. **成本可见性与资源控制**：TUI 成本估算扩展、RAM 占用过高、npm 升级流量过大等问题，表明用户对资源消耗与费用透明度的要求在提升。

---

## 开发者关注点（痛点与高频需求）

- **V1→V2 迁移稳定性**：迁移标记已完成但会话消息缺失，导致生产环境下长期运行的服务实例出现“空会话”问题，需尽快提供修复或修复工具。
- **桌面端资源与可用性**：Windows 休眠恢复后 SQLite 磁盘 I/O 错误导致服务卡死；CLI 内存占用异常；npm 升级强制下载 ~2GB 可选依赖，均影响日常使用体验。
- **免费层与计费体验**：#59387 近 405 条评论表明免费额度重置失效、订阅提示异常等问题尚未完全解决，社区对计费透明度与客户支持路径有强烈诉求。
- **模型能力声明与工具调用**：Copilot 路由模型错误宣传 PDF 支持、Mistral 第三方模型工具调用崩溃，提示提供商适配层需要更严格的能力协商与异常处理。
- **工具选择与工作流配置**：编辑工具选择（patch vs edit/write）目前依赖硬编码模型 ID 启发式，用户普遍希望获得更多配置选项以适配不同模型与偏好。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-22)

## 今日速览

Hermes 社区今日无新版本发布，但活跃度保持高位：16 个 Issue 与 50 个 PR 在过去 24 小时内更新。核心关注点集中在 **跨平台会话稳定性（macOS 休眠、Windows 网关进程残留）**、**插件/依赖管理（uv 工作区冲突、Docker 环境缺失 pnpm）** 以及 **网关架构演进（独立网关移除、客户端标识、会话缓存失效导致流式中断）**。

---

## 版本发布

过去 24 小时内无新 Release 发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态/优先级 | 关注理由 | 链接 |
|---|------|-------------|----------|------|
| #155595 | Tracking: profile creation and lifecycle | OPEN | 17 条评论，社区讨论最活跃的追踪 Issue，涵盖 Profile 创建/生命周期、凭据共享、模型继承、Honcho 清理等核心工作，是近期重大特性的总汇。 | [查看](https://github.com/NousResearch/hermes-agent/issues/155595) |
| #144503 | Session turn lease expires across host sleep | OPEN · P2 | macOS 下笔记本休眠超 298s 后，会话 Turn 租约过期导致硬中断，直接影响移动端用户的会话连续性。 | [查看](https://github.com/NousResearch/hermes-agent/issues/144503) |
| #152435 | Windows gateway never joins kill-on-close job | OPEN · P2 | Windows 特有缺陷：`hermes gateway stop` 无法结束网关启动的子进程，导致进程残留，影响多版本（v0.21.6–main）。 | [查看](https://github.com/NousResearch/hermes-agent/issues/152435) |
| #152519 | Docker v0.23.1: pnpm not installed or outdated | OPEN · P2 | 官方 Docker 镜像回归问题，`hermes pm install --extra` 因缺少 pnpm 失败，阻断插件安装流程。 | [查看](https://github.com/NousResearch/hermes-agent/issues/152519) |
| #101185 | Discord voice channel: auto-TTS never plays in VC | OPEN · P2 | Discord 语音频道下机器人转录正常但不播放语音回复，涉及 TTS 适配器与语音通道集成的长期缺陷。 | [查看](https://github.com/NousResearch/hermes-agent/issues/101185) |
| #142712 | pm: duplicate buildable plugin source breaks uv lock | OPEN · P2 | 同一插件同时存在于共享 Home 和 Profile Home 时，`uv lock` 因重复成员名失败，影响插件包管理稳定性。 | [查看](https://github.com/NousResearch/hermes-agent/issues/142712) |
| #158640 | Hermes Desktop on Windows fails to activate primary Cloud gateway | OPEN · P2 | 桌面端重启后未自动激活配置的主云网关，会话回落到 Local，影响云端优先的用户体验。 | [查看](https://github.com/NousResearch/hermes-agent/issues/158640) |
| #150864 | Webapp terminal cannot start: Host terminal WebSocket failed | OPEN | Web 终端 WebSocket 连接失败，导致多网关测试场景下终端不可用，影响远程操作能力。 | [查看](https://github.com/NousResearch/hermes-agent/issues/150864) |
| #158726 | gateway session-cache invalidation releases mid-turn agent | OPEN · P2 | 会话缓存失效时会提前释放正在流式输出的 Agent，导致中断（WinError 10058），直接影响实时交互体验。 | [查看](https://github.com/NousResearch/hermes-agent/issues/158726) |
| #158723 | Old worker outlives `hermes update` lazily imports new-tree module | OPEN · P2 | 更新后旧进程持续运行并延迟导入新模块，导致缺失属性错误，涉及版本升级时的运行时兼容性。 | [查看](https://github.com/NousResearch/hermes-agent/issues/158723) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #158166 | fix(kanban): refuse a card with no resolvable model | OPEN | 看板卡片在未解析到模型时拒绝下发，避免 worker 因 `model=""` 获得严格 400 错误，提升任务调度鲁棒性。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158166) |
| #157140 | fix(vault): fill framework-controlled fields | CLOSED | 修复浏览器保险库在 React/Vue/MUI 等框架控制的表单上填充失败的问题，增加可信输入验证。 | [查看](https://github.com/NousResearch/hermes-agent/pull/157140) |
| #158407 | feat(gateway): know which client sent each turn | OPEN | 网关记录每条 Turn 的发送客户端及最近使用的客户端，使插件可根据用户是否在桌面端决定是否发送手机通知。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158407) |
| #157596 | plugin-catalog: evalroute 0.7.0 | CLOSED | 将 evalroute 插件目录条目从 0.6.6 重新 pin 到 0.7.0，同步依赖版本与披露说明。 | [查看](https://github.com/NousResearch/hermes-agent/pull/157596) |
| #108786 | fix(desktop): Test on saved custom endpoint uses key on file | OPEN | 修复桌面端自定义端点保存 API Key 后字段清空、测试时报错的问题，改善凭据管理体验。 | [查看](https://github.com/NousResearch/hermes-agent/pull/108786) |
| #158078 | fix(skills): report installed skills that no longer receive bundled updates | OPEN | `hermes update` 报告中新增保留技能副本不再接收捆绑更新的提示，避免用户误以为技能已最新。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158078) |
| #158139 | Prompt-cache follow-ups | CLOSED | 修复零价格模型的提示缓存标记缺失、噪声对话污染路由学习结果、沙盒目录名尾随空格等多个缓存/计费边缘问题。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158139) |
| #158424 | feat(desktop): tell the backend when the user is active | OPEN | 桌面端通过系统空闲时钟向后端报告用户在线状态，使通知插件可在用户在座时保持静默。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158424) |
| #158727 | fix(cron): unlink .fire-*.lock files after flock release | OPEN | 清理定时任务锁文件，防止 `.fire-*.lock` 文件随时间累积，改善长期运行的文件系统卫生。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158727) |
| #158724 | feat(compression): add opt-in lossless terminal pruning | OPEN | 新增可选的无损终端结果压缩，在压缩边界保留唯一输出行、顺序、行尾、退出状态等信息，优化长上下文存储。 | [查看](https://github.com/NousResearch/hermes-agent/pull/158724) |

---

## 功能需求趋势

从近期 Issues 与 PR 可观察到社区在以下方向上的关注集中：

1. **跨平台会话与进程生命周期**  
   macOS 休眠导致 Turn 租约过期、Windows 网关子进程残留、桌面端云网关未自动激活等问题反映出用户对“跨设备/跨平台会话连续性”的强烈需求。

2. **插件生态与依赖管理稳定性**  
   `uv lock` 重复成员冲突、Docker 镜像缺少 pnpm、插件目录 pin 失效等问题表明社区希望插件安装、版本锁定与环境隔离更加可靠。

3. **智能通知与客户端感知**  
   多个 PR（#158407、#158424）致力于让 Hermes 意识到“哪个客户端发起了对话”及“用户是否在座”，以实现更精细的多端通知策略，减少干扰。

4. **桌面端与 Web 终端体验**  
   Web 终端 WebSocket 连接失败、桌面端错误界面主题缺失、STT 禁用时隐藏 Dictate 按钮等 UI/UX 问题持续被提及，桌面端打磨仍是社区关注点。

5. **网关架构演进与缓存一致性**  
   `gateway.standalone` 移除讨论、会话缓存失效导致流式中断、Unix Socket 传输等议题显示社区正在推动网关从临时兼容模式向生产级多租户架构迁移。

---

## 开发者关注点

- **高频痛点**：会话/缓存失效导致流式中断（#158726）、跨平台进程清理不彻底（#152435）、更新后旧进程与新代码树不兼容（#158723）。
- **安装与部署**：Docker 环境缺少基础工具链（pnpm）、安装根目录计算逻辑分散在约百处代码（#150515），亟需统一与容器化镜像修复。
- **代码质量与重构**：RE2 正则引擎迁移分阶段进行（#158717、#158719、#158720、#158721），开发者需关注导入时正则匹配的移除及启动时引擎可用性检查。
- **插件与技能管理**：重复插件源导致 `uv lock` 失败（#142712）、已捆绑技能不再接收更新却未提示（#158078），插件生命周期管理仍需完善。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-22)

## 今日速览

今日 OpenClaw 社区活跃度较高，共更新 10 个 Issue 与 50 个 PR。核心关注点集中在 **PostgreSQL 存储下的备份崩溃循环（P1）**、**自动化会话窗口无限增长**、**Gateway 配置热重载机制** 以及 **Web UI 首次设置体验** 等方面。暂无新版本发布。

---

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（共 10 条）

| # | 标题 | 优先级/标签 | 关键原因 | 链接 |
|---|------|-------------|----------|------|
| #203359 | backup create 失败于 PostgreSQL 存储锚点，并导致 Gateway 状态租约被持续占用 | P1, crash-loop, platinum hermit | **最高优先级生产事故**。备份失败后会阻塞后续所有 `backup create`、`doctor --fix` 及 Gateway 启动，直接影响服务可用性。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/203359) |
| #203361 | 隔离自动化累积无界会话窗口，且大型自动化历史无法删除 | P2, session-state, diamond lobster | 影响长期运行的定时自动化任务，可能导致数据库膨胀且无法通过支持路径清理。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/203361) |
| #192040 | Gateway 拥有的增量内存重建索引，无需停止服务 | P2, needs-maintainer-review, diamond lobster | 核心功能请求：解决 2026.10.10 后 CLI 索引命令因 Gateway 独占 SQLite 存储而无法运行的问题，提升可运维性。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/192040) |
| #192088 | 通过 `config.patch` 编辑 `env.vars.*` 会重启 Gateway，且未告知调用者 | P2, ux-friction | 配置热重载规则缺失，导致环境变量修改触发不必要的 Gateway 重启，影响自动化稳定性。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/192088) |
| #203350 | Goal 令牌预算在上下文大小保持不变时低估使用量 | P2, session-state, diamond lobster | 可能导致预算失效，模型在已消耗 90% 预算后仍继续接受续写，存在成本与资源控制风险。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/203350) |
| #203352 | 将命令审批历史链接到确切执行结果 | P2, off-meta tidepool, ux-friction | 审计与可追溯性需求，审批者需知道命令是否实际执行、成功或失败。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/203352) |
| #203354 | 预算目标在花费最后令牌前完成部分交接 | P2, off-meta tidepool, ux-friction | 针对令牌预算耗尽场景的优雅降级方案，提升长任务的可用性。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/203354) |
| #203353 | 重试单个失败的原生子任务，无需重建父运行 | P2, off-meta tidepool, ux-friction | 任务拆分场景下的细粒度错误处理，避免因单个子任务失败而重启整个父流程。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/203353) |
| #203351 | 将 Workboard 验证评决绑定到检查的工件修订版 | P3, diamond lobster, ux-friction | 工件版本一致性问题，防止历史评决被误读为当前版本的验证结果。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/203351) |
| #200749 | `models auth login` 渲染多步登录时出现字面 `\n`，设备码框不可读 | CLOSED, P2, ux-friction | 已关闭的可用性问题，相关修复 PR #202790 亦已合并，可作为近期 UX 改进的参考。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/200749) |

**社区反应**：所有列出的 Issue 均为近期新增或更新，评论数较少（1-4 条），多处于 `needs-maintainer-review` 或 `needs-product-decision` 状态，尚未形成广泛社区讨论，但 P1 级备份故障已引发高度关注。

---

## 重要 PR 进展（共 10 条）

| # | 标题 | 状态/优先级 | 主要内容 | 链接 |
|---|------|-------------|----------|------|
| #202813 | fix(discord): 网关重启后保持 `/codex` 脱绑与重新绑定 | P1, waiting on maintainer | 修复 Discord 频道中 `/codex detach` 与 `/codex bind` 在网关重启后不生效的问题，确保工作区绑定持久化。 | [查看 PR](https://github.com/openclaw/openclaw/pull/202813) |
| #202689 | fix: 将已驳回的自动化失败排除在 Inbox 之外 | P2, security-sensitive-changed | 解决自动化失败在驳回后因浏览器存储满、多标签页竞争或暂停重启而重新出现的问题。 | [查看 PR](https://github.com/openclaw/openclaw/pull/202689) |
| #203356 | fix: 使单个模型的冷却截止时间不影响其他模型 | P2, security-sensitive-changed | 修复 ClawRouter 缓存目录中，一个模型的 API 密钥限制错误地传播至整个提供商，导致健康路由被误判不可用。 | [查看 PR](https://github.com/openclaw/openclaw/pull/203356) |
| #203358 | feat: 在 Settings 中为主模型和备用模型选择 harness | clawsweeper:intake:feature | 允许用户在设置页面为主/备用模型选择 OpenClaw 或 Codex 后端，此前仅在聊天中可选。 | [查看 PR](https://github.com/openclaw/openclaw/pull/203358) |
| #203346 | improve: 更快显示完整 30 天用量报告 | P2, waiting on author | 优化用量报告加载逻辑，避免在摘要缺失时长时间显示部分总计，并消除日期预设切换时的 400ms 不必要等待。 | [查看 PR](https://github.com/openclaw/openclaw/pull/203346) |
| #202141 | fix: 使 Web 首次设置与 Mac 欢迎流程一致 | P2, waiting on author, auth-provider | 统一 Web 仪表盘与 macOS 桌面端的首次 AI 连接设置体验，允许用户手动选择首次尝试的连接，避免暴露完整网关错误。 | [查看 PR](https://github.com/openclaw/openclaw/pull/202141) |
| #202831 | fix(plugins): 当清单阻止启用的独立插件文件启动时发出警告 | P2, ready for maintainer look | 插件系统健壮性改进：当 `plugins.load.paths` 中的文件因缺少 `activation` 声明而静默停止启动时，给出明确警告。 | [查看 PR](https://github.com/openclaw/openclaw/pull/202831) |
| #202817 | fix: 允许插件计数器在首个事件前显示值为 0 的标签集 | P2, compatibility, ready for maintainer look | 修复 `api.metrics` 中 `counter(name).inc(labels, 0)` 被丢弃的问题，确保 Prometheus 指标在首次事件前即可展示已知标签。 | [查看 PR](https://github.com/openclaw/openclaw/pull/202817) |
| #202306 | feat: 将无项目的对话移入现有项目 | P2, security-sensitive-changed, waiting on maintainer | 支持在默认工作区中通过自然语言（如“让我们来处理 OpenClaw”）将对话移入已注册项目，避免手动转移本地编辑。 | [查看 PR](https://github.com/openclaw/openclaw/pull/202306) |
| #203271 | fix: 当未配置模型时停止向 OpenAI 发送聊天 | P1, compatibility, security-sensitive-changed | 修复新安装未选模型时，OpenClaw 静默假设配置了 `openai/gpt-6-astra` 并向 OpenAI 发送聊天的安全/合规问题。 | [查看 PR](https://github.com/openclaw/openclaw/pull/203271) |

---

## 功能需求趋势

从本期 Issues 与 PR 可提炼出以下社区关注方向：

1. **自动化与会话状态管理**  
   多个 Issue 指向隔离自动化的会话窗口无限增长、目标令牌预算低估、子任务失败重试等，表明社区对长周期自动化任务的可靠性与资源控制需求日益迫切。

2. **配置热重载与运维体验**  
   `env.vars.*` 修改触发 Gateway 重启、内存索引需独占存储等问题，反映用户希望在不中断服务的情况下完成配置变更与维护操作。

3. **多模型与 Harness 选择**  
   Settings 中新增主/备用模型 Harness 选择、Discord 支持 GPT-Live-1.1 等，显示社区对模型提供商切换与多后端兼容性的关注度提升。

4. **审计与可追溯性**  
   命令审批关联执行结果、Workboard 评决绑定工件修订版，体现企业用户对 AI 操作审计链路完整性的需求。

5. **跨平台一致性与可用性**  
   Web 首次设置与 Mac 欢迎流程对齐、Discord 绑定持久化、登录说明多行渲染等，集中在提升不同客户端（Web、Desktop、Discord）之间的体验一致性。

---

## 开发者关注点

1. **PostgreSQL 存储下的备份故障（P1）**  
   `openclaw backup create` 在 PostgreSQL 引擎下因本地 SQLite 锚点失败并持有 Gateway 状态

:::
