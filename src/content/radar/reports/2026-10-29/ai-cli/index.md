---
title: "AI CLI 工具社区动态日报"
published: 2026-10-29
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-29

> 生成时间: 2026-10-29 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-10-29)

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单一对话助手”向“多模态、多代理、跨平台开发操作系统”演进的关键期。各主流工具均在加速构建会话生命周期管理、沙箱安全策略与远程控制能力，但稳定性与跨平台兼容性仍是普遍瓶颈。模型行为可控性、成本配额透明度及子代理可靠性成为社区共性痛点。整体呈现“高频迭代、高Issue密度、功能与稳定性并重”的发展态势。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 24h Issues 数 | 24h PR 数 | 24h Release 情况 | 主要版本状态 |
|------|------|--------------|----------|----------------|-------------|
| Claude Code | anthropics/claude-code | 50 条更新 | 2 个（均 OPEN） | 无新版本 | 稳定版，无近期发布 |
| OpenAI Codex | openai/codex | 未披露总数（10+ 热点） | 10+ 个合并（自动化 bot 为主） | 3 个 alpha 版本 | Rust 端 alpha 快速迭代 (0.166.0-alpha.4/5/5.1) |
| Gemini CLI | google-gemini/gemini-cli | 未披露总数（10+ 热点） | 10+ 个（部分 CLOSED） | 1 个夜间版本 | v0.67.0-nightly.20261028 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 未披露总数（10+ 热点） | 10+ 个（部分 CLOSED） | 2 个版本 | Studio v2.54.0 / CLI v2.54.0 |
| OpenCode | anomalyco/opencode | 未披露总数（10+ 热点） | 10+ 个（部分 CLOSED） | 2 个版本 | v1.19.5 / process-daemon v0.3.2 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 条新增/更新 | 0 个新增/更新 | 2 个版本 | v0.2.2-alpha.2 / v0.2.1-rc.4 |
| Hermes | NousResearch/hermes-agent | 14 个更新 | 50 个更新 | 无新版本 | 无近期发布，PR 活跃度极高 |
| OpenClaw | openclaw/openclaw | 未披露总数（10+ 热点） | 10+ 个（部分 CLOSED） | 无新版本 | 无近期发布 |

> 注：部分仓库未披露 24h Issue/PR 总数，表格中“10+”表示精选热点条目数，非全量统计。

## 3. 共同关注的功能方向

多个工具社区在以下维度上存在高度重叠的诉求：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|---------|---------|------------|
| **会话与远程控制生命周期管理** | Claude Code、OpenAI Codex、Gemini CLI、Hermes | 会话列表、进程查看、后台启动、空闲会话释放、远程控制会话数上限（如 Claude Code 32 个/文件夹） |
| **模型行为可控性与可审计性** | Claude Code、Gemini CLI、OpenClaw | 模型输出固化用词、越界执行、行为自描述不实、子代理状态造假（如报 success 实则中断） |
| **成本与配额透明度** | Claude Code、OpenAI Codex | Token/费用追踪、周使用量预警、桌面端状态区持久化展示使用限额 |
| **跨平台与 WSL 兼容性** | OpenAI Codex、Claude Code、Gemini CLI、DeepSeek Reasonix | Windows 与 WSL 路径映射、macOS/Windows 定时任务卡死、桌面端与移动端远程控制不一致 |
| **沙箱策略与权限交互** | OpenAI Codex、OpenCode、Claude Code | 细粒度沙箱审批、Auto 模式白名单、权限决策原因展示、MCP 服务器 TLS 信任 |
| **子代理/多代理可靠性** | Gemini CLI、OpenCode、OpenClaw | 子代理取消机制、后台任务停止、轮次上限后状态上报、任务挂起 |

## 4. 差异化定位分析

| 工具 | 核心功能侧重 | 目标用户 | 技术路线特征 |
|------|------------|---------|------------|
| **Claude Code** | 编辑验证插件、项目记忆 (CLAUDE.md)、远程控制会话管理 | 企业级开发团队、重度 Claude 模型用户 | 基于 Anthropic 模型生态，强调模型行为对齐与编辑工具可靠性 |
| **OpenAI Codex** | Computer Use（计算机使用）、Codex Cloud 环境、WSL/跨平台桌面端 | 全栈开发者、需要 GUI 自动化与云端环境的用户 | Rust 端 alpha 迭代，侧重沙箱策略、浏览器代理与多模态计算机操作 |
| **Gemini CLI** | 子代理（Subagent）、AST 感知代码读取、浏览器代理 | AI 原生开发者、大型代码库维护者 | 强调 AST 感知上下文压缩、多代理协作与终端交互可见性 |
| **DeepSeek Reasonix** | Studio+CLI 双端同步、MCP 插件生态、文件预览与引用 | 中文开发者、需要桌面端可视化工作台的用户 | 客户端-服务端架构，侧重 UI/UX 体验与插件生命周期管理 |
| **OpenCode** | v2.0 后台子代理、MCP 资源订阅、图像生成工具、SDK 实验性方法 | 高级开发者、需要可编程 AI 编程助手的团队 | 模块化架构，强调服务重启持久性、后台任务控制与客户端 SDK 稳定性 |
| **Deepseek Harness** | 插件管理页、ACP 模式诊断输出、聊天文本引用 | Agent 开发者、插件生态构建者 | 侧重插件热更新、回滚机制与标准输出流隔离 |
| **Hermes** | 统一网关（Unified Gateway）、桌面端会话/模型切换、MCP 公共服务目录 | 跨平台 Agent 用户、需要多模型路由与网关可观测性的团队 | 网关中心架构，关注 CLI/TUI/Desktop/API 多入口统一与 Windows 启动器稳定性 |
| **OpenClaw** | Skill Workshop 技能学习与复用、Discord/LINE 即时通讯集成、浏览器控制 | 社区驱动的 Agent 插件开发者、即时通讯平台集成者 | 侧重技能生命周期管理、跨平台即时通讯适配与插件目录认证 |

## 5. 社区热度与成熟度

- **最高活跃度**：Hermes（50 个 PR 更新，14 个 Issue 更新，尽管无新版本，但代码层面迭代极快）、OpenAI Codex（3 个 alpha 版本连续发布，10+ 个合并 PR）。
- **快速迭代阶段**：OpenAI Codex（Rust 端 alpha 版本密集发布，功能尚未稳定）、DeepSeek Reasonix（v2.54.0 刚发布，随即出现多个 UI 回归缺陷，处于“功能堆叠—修复缺陷”循环）。
- **稳定维护阶段**：Claude Code（无新版本，但 Issue 讨论集中在稳定性与模型行为，属于成熟产品的长尾优化期）、Deepseek Harness（24h 无 Issue/PR 更新，仅发布两个候选/alpha 版本，社区活动相对低迷）。
- **成熟度梯队**：Claude Code > OpenAI Codex ≈ Gemini CLI > DeepSeek Reasonix ≈ OpenCode > Hermes > OpenClaw > Deepseek Harness（综合版本稳定性、Issue 闭环速度与社区反馈密度）。

## 6. 值得关注的趋势信号

### (1) 从“单模型对话”向“多代理操作系统”转型
Gemini CLI 的子代理稳定性、OpenCode 的后台子代理取消、OpenClaw 的 Skill Workshop 技能复用，均指向 AI CLI 不再仅是聊天界面，而是正在演进为可编排、可持久化、可并发执行的代理运行时。开发者应关注多代理协作标准与状态持久化协议。

### (2) 沙箱与权限系统成为桌面端 AI 的核心护城河
OpenAI Codex 的 `sandboxCwd`、OpenCode 的 MCP TLS 信任、Claude Code 的 Auto 模式白名单，表明桌面端 AI 工具的安全边界管理正从“全信任”转向“细粒度策略+审批流”。企业采购时应优先评估工具的沙箱隔离能力与审计日志完整性。

### (3) 成本配额可见性从“锦上添花”变为“刚需”
Claude Code 的周使用量激增问题、OpenAI Codex 的使用量透明化 Issue 获得最高点赞（19 👍），反映付费用户对 Token 费用预警与预算控制的敏感度正在提升。建议选型时优先支持配额导出、成本分摊与异常预警的工具。

### (4) 跨平台一致性仍是最大体验短板
Windows/WSL 路径映射、macOS 定时任务卡死、移动端远程控制断连等问题在 Codex、Claude Code、Reasonix 中反复出现。跨平台桌面端（Electron/Tauri 等）与原生 CLI 的行为不一致，将直接影响分布式团队的协作效率。

### (5) 社区驱动的插件生态开始分层
OpenCode 的 MCP 资源订阅、Hermes 的公共 MCP 目录、OpenClaw 的插件目录认证申请，显示插件生态正从“功能扩展”向“供应链信任与热更新回滚”方向发展。长期来看，插件兼容性与安全审计将成为 AI CLI 选型的重要考量。

---

**决策建议**：若追求稳定性与企业级模型对齐，Claude Code 当前处于成熟优化期；若需要跨平台桌面端与云端环境集成，OpenAI Codex 正处于快速迭代窗口期，但需容忍 alpha 版本的不稳定；若侧重多代

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-10-29）

## 1. 热门 Skills 排行

基于 PR 活跃度、更新频率及社区关注度，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills | 将产品/技术规格拆解为可执行的 Notion 任务，并提供简历定量审计能力 | 企业级文档转实现工作流；跨 Skill 组合提交引发关注 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 2 | #1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers | 修复 MCP Builder 在 `mcp>=2.0.0` 下的客户端导入与自定义 HTTP 头配置问题 | MCP 协议版本兼容性；技术栈升级带来的破坏性变更修复 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 3 | #1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures | 修复 Skill 触发评估的误报/漏报，解决 Windows 管道选择失效及运行时失败误判 | Skill 触发机制可靠性；跨平台（Windows）兼容性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 4 | #525 Add pyxel skill for retro game development | 提供 Python 复古游戏开发、调试、无头运行及帧检查的完整技能 | 游戏开发垂直领域；长期未合并但持续获得更新（10 月仍有活动） | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| 5 | #1771 feat(skills): add proofcore-contract-auditor | Web3 智能合约静态审计，并将加密审计证明锚定至 TON 区块链 | 区块链/智能合约安全；官方仓库引入第三方协议锚定机制的先例 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 6 | #1703 Add md2video-audio skill | 将 Markdown 通过 Marp 转为演示文稿，再合成带真人语音的 MP4 视频 | 零成本文档转视频；内容创作与多媒体输出需求 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1703) |
| 7 | #1980 webapp-testing: avoid shell=True in with_server.py | 移除 Web App 测试脚本中的 `shell=True`，消除命令注入风险（CWE-78） | 技能脚本安全加固；供应链与执行安全 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| 8 | #1681 fix(skill-creator): support direct execution of package_skill.py | 修复 `package_skill.py` 独立运行时的模块导入失败，并更新过时的引用路径 | Skill 打包与分发工具链可用性；开发者体验 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1681) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。社区近期活动集中在 9–10 月，显示出对 MCP 兼容性、Skill 创建工具链及企业文档工作流的高度关注。

---

## 2. 社区需求趋势

从 Issues 中提炼出社区最期待的新 Skill 方向：

1. **工作流自动化与企业协作**
   - 组织内技能共享（Issue #228）：用户希望在 Claude.ai 内直接实现组织级 Skill 共享，而非手动通过 Slack/Teams 传递 `.skill` 文件。
   - Notion 规格转实现（PR #1245）：产品需求文档到可执行任务的自动化拆解是企业场景的高频需求。

2. **代码审查与安全治理**
   - 智能合约审计（PR #1771）：Web3 领域对静态分析与链上证明的需求明显。
   - Agent 治理模式（Issue #412）：策略 enforcement、威胁检测、审计轨迹等 AI Agent 安全框架尚属空白。
   - 技能命名空间信任边界（Issue #492）：社区技能冒用 `anthropic/` 命名空间引发信任危机，亟需官方命名空间治理与验证机制。

3. **测试生成与质量保障**
   - Skill 触发评估失效（Issue #556）：`run_eval.py` 中 `claude -p` 无法触发 Skill，触发率为 0%，亟需修复评估工具链。
   - 技能创建器最佳实践（Issue #202）：现有 `skill-creator` 偏向文档说明而非可执行技能，社区期待其重构为操作导向。

4. **文档处理与多模态输出**
   - DOCX/ODT/PPTX 文档操作（Issue #2018、#1868、PR #1792）：办公文档格式的兼容性、XML 命名空间、超时错误处理等问题频发。
   - Markdown 转视频/音频（PR #1703）：非文本内容生成成为内容创作者关注点。

---

## 3. 高潜力待合并 Skills

以下 PR 评论/更新活跃，且解决了社区痛点，可能近期落地：

- **#1980 webapp-testing: avoid shell=True** — 涉及命令注入安全漏洞（CWE-78），修复优先级高，且更新时间最近（10-25）。
- **#1742 fix(mcp-builder): mcp>=2 兼容性** — MCP 协议已升级至 2.x，相关技能若不修复将无法正常工作，兼容性修复具有紧迫性。
- **#1298 fix(skill-creator): trigger evals & Windows 支持** — 直接影响 Skill 触发可靠性和跨平台使用，是技能创建工具链的核心修复。
- **#1681 fix(skill-creator): package_skill.py 直接执行** — 技能打包分发的基础设施问题，修复后将降低社区贡献门槛。
- **#525 Add pyxel skill** — 虽然创建时间较早（3 月），但 10 月仍有更新，显示出持续的社区维护意愿，适合游戏开发垂直场景。
- **#1245 notion-spec-to-implementation** — 企业级文档转实现工作流，契合当前 AI 驱动软件交付的热点，合并价值高。

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可信、可互操作的企业级技能基础设施——即解决命名空间信任边界、技能触发与评估可靠性、以及跨平台/跨版本（如 MCP 2.x）的兼容性问题，同时扩展文档自动化、代码审计和多模态输出等垂直能力。**

---

# Claude Code 社区动态日报 (2026-10-29)

## 今日速览

过去 24 小时内，Claude Code 仓库未发布新版本，但社区活跃度保持高位。50 条更新的 Issue 中，模型行为异常、成本使用量激增、macOS 定时任务卡死以及远程控制会话管理成为核心讨论焦点；两个开源 PR 分别聚焦于编辑验证插件与文档 URL 修复。

## 版本发布

过去 24 小时内无新版本发布。

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 关注理由 |
|---|------|------|---------|----------|
| [#53454](https://github.com/anthropics/claude-code/issues/53454) | Claude Code 无法停止使用单词 "load-bearing" | OPEN | 21 / 120 | 模型行为异常的长尾问题，社区关注度最高（120 个赞），反映模型输出可控性仍有改进空间。 |
| [#105240](https://github.com/anthropics/claude-code/issues/105240) | Max 5x 周使用量在 48 小时内达到 94%，自 10 月 17 日起激增 | OPEN | 5 / 1 | 成本与配额问题，近期创建且讨论活跃，可能影响大量付费用户的预算规划。 |
| [#89639](https://github.com/claude-code/issues/89639) | macOS 定时任务会话在工具调用中卡死（~30s），占用全局并发槽直至调度饿死 | OPEN | 5 / 1 | 严重稳定性 Bug，涉及 WebSearch/WebFetch 工具调用，会话可持续运行数天，阻塞后续任务。 |
| [#104467](https://github.com/claude-code/issues/104467) | 桌面端：本地界面列出 Code 会话、查看进程和远程控制状态，并支持后台启动 | OPEN | 5 / 0 | 功能需求，反映用户对多会话生命周期管理的迫切需求，尤其在 Windows 桌面端。 |
| [#80202](https://github.com/claude-code/issues/80202) | 项目根目录下的 CLAUDE.md 静默不加载（Windows subst 盘符 / C:\ 根目录） | OPEN | 5 / 2 | 项目记忆（Project Memory）失效的边界情况，影响 Windows 开发者的工作流一致性。 |
| [#103836](https://github.com/claude-code/issues/103836) | 助手越界、违反书面规则并误报自身行为 | OPEN | 3 / 0 | 模型对齐与可审计性问题，会话记录显示模型对自身行为描述不实，涉及信任与安全。 |
| [#105797](https://github.com/claude-code/issues/105797) | Auto 模式拒绝白名单内的部署脚本，无文档化预批准方式 | OPEN | 2 / 0 | 钩子与权限系统交互问题，影响 CI/CD 风格的自动化工作流。 |
| [#99859](https://github.com/claude-code/issues/99859) | Bedrock "400 Input too long" 未被识别为 request_too_large，导致会话永久卡死 | OPEN | 2 / 0 | API 错误处理缺陷，大图像载荷场景下会话无法自动恢复，需手动干预。 |
| [#105343](https://github.com/claude-code/issues/105343) | PreToolUse "ask" 权限决策原因未在权限提示中显示 | OPEN | 1 / 4 | 权限交互透明度问题，用户无法得知为何被拒绝工具调用，影响调试体验。 |
| [#105800](https://github.com/claude-code/issues/105800) | 远程控制：每个文件夹最多 32 个会话，空闲会话从不释放 | OPEN | 1 / 0 | 远程控制资源管理缺陷，强制用户归档历史会话才能启动新会话，影响长期使用。 |

## 重要 PR 进展（共 2 条）

仓库过去 24 小时内仅有 2 个更新的 Pull Request，均由 @mvanhorn 提交，仍处于 OPEN 状态：

1. **[#32755](https://github.com/anthropics/claude-code/pull/32755) feat(plugins): add edit-verifier plugin for post-edit verification**  
   针对 Edit 工具“静默失败”的问题（目标文本未找到、空格不匹配等），新增 PostToolUse 钩子插件，在编辑后进行验证，防止 Claude 基于错误假设继续操作。关联议题 #32658。

2. **[#32753](https://github.com/anthropics/claude-code/pull/32753) docs: fix stale documentation URLs across repository**  
   将 12 个文件中的 `docs.anthropic.com` 和 `docs.claude.com` 替换为当前 `code.claude.com` 域名（26 行改动），`CHANGELOG.md` 因包含历史引用未做更改。关联议题 #30628。

## 功能需求趋势

从近 24 小时的 Issue 讨论中，可提炼出以下社区关注方向：

1. **会话与远程控制管理**：用户希望获得更细粒度的会话生命周期控制（列出、查看进程、后台启动、释放空闲会话），尤其是桌面端和远程控制场景（#104467、#105800）。
2. **模型行为可控性**：模型用词固化（#53454）、越界执行（#103836）、拒绝行为不一致（#105825）等问题反复出现，社区对模型输出约束和审计能力需求强烈。
3. **成本与配额透明度**：周使用量异常激增（#105240）引发关注，用户期望更清晰的 Token/费用追踪和预警机制。
4. **跨平台稳定性**：Windows 根目录/子盘符（#80202）、macOS TCP 缓冲区（#87062）、VS Code 版本兼容（#90244）等平台特定 Bug 仍在持续报告。
5. **权限与钩子系统**：Auto 模式下的白名单生效（#105797）、权限决策原因展示（#105343）表明开发者希望在自动化流程中获得更可预测的授权体验。

## 开发者关注点

- **模型对齐与可审计性**：模型不仅可能输出重复或不当用词，还可能对自身行为提供误导性描述，这对依赖 Claude Code 进行关键代码变更的团队构成信任风险。
- **长时间运行会话的稳定性**：macOS 定时任务卡死、Bedrock 超长载荷导致会话永久卡住等问题，表明在长上下文和异步调度场景下，容错与自动恢复机制仍有缺口。
- **桌面端与远程控制体验**：会话数量上限（32 个/文件夹）、空闲会话不释放、iOS 上“Pondering…”指示器持续等问题，影响多设备协作流程。
- **UI 设计反馈**：有用户明确表达对新 UI 的不满（#105591），提示产品团队在界面迭代时需兼顾现有用户的使用习惯。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-10-29  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

OpenAI Codex 社区今日活跃度持续高位，Rust 端连续发布三个 alpha 版本（0.166.0-alpha.4/5/5.1），重点推进代码模式运行时、沙盒策略与插件并发加载等底层能力。社区反馈集中在 **Windows 桌面端稳定性**、**WSL 工作区路径映射**、**Codex Cloud 环境发布卡死** 以及 **Computer Use（计算机使用）跨平台兼容性** 四个核心方向，其中多个高评论 Issue 指向桌面应用与远程控制的核心体验问题。

---

## 2. 版本发布

过去 24 小时内，Codex Rust 端连续发布三个 alpha 版本：

| 版本 | 标签 | 说明 |
|------|------|------|
| rust-v0.166.0-alpha.4 | `0.166.0-alpha.4` | Rust 端 alpha 迭代 |
| rust-v0.166.0-alpha.5 | `0.166.0-alpha.5` | Rust 端 alpha 迭代 |
| rust-v0.166.0-alpha.5.1 | `0.166.0-alpha.5.1` | Rust 端 alpha 补丁迭代 |

> 注：发布说明未提供详细变更日志，建议开发者通过 [Releases 页面](https://github.com/openai/codex/releases) 查看完整提交记录。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数及影响范围）筛选：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|---------|---------|------|
| #50428 | Windows 桌面端：durable chat 启动与 thread/fork 因 `AbsolutePathBuf` 缺少 base path 反序列化失败 | Windows 端读取现有云端聊天可正常，但直接提交及同目录 fork 在执行前即失败，影响多个桌面版本 | 36 条评论，3 👍，持续更新至 10-28，Windows 用户反馈强烈 | [查看](https://github.com/openai/codex/issues/50428) |
| #29639 | Windows 桌面端 WSL 工作区下 Browser Use / Node REPL 因 `sandboxCwd` 未映射而失败 | 桌面端自动生成的 Windows `node_repl.exe` 无法处理 WSL 路径，导致工具调用中断 | 28 条评论，9 👍，跨平台路径映射的典型痛点 | [查看](https://github.com/openai/codex/issues/29639) |
| #39974 | Codex Remote Control 在 Android/iOS 上持续不稳定/断连，Windows 桌面端正常 | 三款不同手机及两个移动端系统均复现，指向移动端连接层或同步机制问题 | 27 条评论，6 👍，远程控制体验是社区关注重点 | [查看](https://github.com/openai/codex/issues/39974) |
| #50362 | Windows 10 Computer Use 窗口捕获超时，辅助功能读取正常 | 可枚举窗口并读取 UI Automation 树，但截图捕获失败，导致坐标几何不可用，点击操作阻塞 | 18 条评论，2 👍，直接影响 Computer Use 可用性 | [查看](https://github.com/openai/codex/issues/50362) |
| #32195 | 在 Codex App 状态区显示 5 小时与每周使用限额 | 功能需求：类似 CLI 的持久化用量展示，帮助用户实时掌握配额 | 13 条评论，**19 👍**（点赞最高），社区对透明度需求强烈 | [查看](https://github.com/openai/codex/issues/32195) |
| #25301 | Windows 桌面端 app-server 运行在 WSL 时，Computer Use 不可用（`reason=wsl-disabled`） | Remote Control 可用，但 Computer Use / Browser Use 被明确禁用，日志显示 WSL 限制 | 6 条评论，14 👍，WSL 与桌面端混合部署的兼容性瓶颈 | [查看](https://github.com/openai/codex/issues/25301) |
| #57745 | Codex Cloud 无法保存草稿或发布环境 | 初始发布卡在 "Publishing..." 超过 77 分钟，环境始终显示 "Not published" | 5 条评论，0 👍，新近报告，云端环境流程稳定性受质疑 | [查看](https://github.com/openai/codex/issues/57745) |
| #56874 | 桌面端 `write_stdin` 被细粒度沙盒审批策略拒绝，阻塞 Sites 发布 | 执行 Sites 官方源码同步时 `write_stdin` 步骤被拒，且未弹出审批窗口，导致无法发布私有站点 | 5 条评论，0 👍，沙盒策略与用户交互流程存在脱节 | [查看](https://github.com/openai/codex/issues/56874) |
| #56941 | Windows Computer Use 后全局 UI 卡顿，仅杀死 `codex-computer-use.exe` 即可恢复 | 版本 26.1021.3705.0，窗口切换与移动严重迟滞，指向 Computer Use 进程资源释放问题 | 5 条评论，0 👍，性能与系统稳定性问题 | [查看](https://github.com/openai/codex/issues/56941) |
| #49697 | macOS Computer Use 助手干扰 Chrome 物理键盘输入，导致重复输入 | 版本 26.928.20755，Computer Use helper 与原生输入冲突 | 4 条评论，4 👍，跨平台输入兼容性问题 | [查看](https://github.com/openai/codex/issues/49697) |

---

## 4. 重要 PR 进展（精选 10 条）

今日合并的 PR 多为 `copyberry[bot]` 自动化提交，侧重运行时稳定性、沙盒策略、代码模式输出与插件加载优化：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|-------------|------|
| #57862 | Keep resume picker pagination moving across backends | 避免慢会话后端阻塞响应式后端的分页，新到会话按正确排序出现且不移动当前选择 | [查看](https://github.com/openai/codex/pull/57862) |
| #57861 | Skip resource template discovery for hosted Apps | 托管 App 无资源模板，直接返回空列表并跳过聚合模板发现，减少无效请求 | [查看](https://github.com/openai/codex/pull/57861) |
| #57859 | Extend the provider OAuth sign-in timeout to ten minutes | OAuth 回调超时从 3 分钟延长至 10 分钟，给用户更多时间完成浏览器登录与 MFA | [查看](https://github.com/openai/codex/pull/57859) |
| #57857 | Add Google Cloud Vertex AI setup to TUI onboarding | 新增 GCP 设置向导（`features.gcp_setup_wizard`，默认关闭），收集项目 ID、位置与凭证文件 | [查看](https://github.com/openai/codex/pull/57857) |
| #57855 | Load TUI plugin mentions from installed plugins | 插件提及加载改用 `plugin/installed` 而非 `plugin/list`，避免获取可浏览插件目录 | [查看](https://github.com/openai/codex/pull/57855) |
| #57850 | Wire bounded output collection into the code mode runtime | 将有界输出收集接入代码模式运行时，限制 V8 与 cell actor 之间的原始事件积压 | [查看](https://github.com/openai/codex/pull/57850) |
| #57848 | Add bounded Code Mode output collection and rendering | 在 `code-mode-runtime` 新增输出收集与渲染组件，保留文本前缀与滚动尾部（1 MiB 文本额度，8 MiB 独立额度） | [查看](https://github.com/openai/codex/pull/57848) |
| #57841 | Add optional process metrics sampling for code-mode hosts | 新增 `GetProcessMetrics` 与 provider 采样 API，获取 PID、启动时间、累计 CPU 时间与常驻内存 | [查看](https://github.com/openai/codex/pull/57841) |
| #57839 | Preserve reasoning token accounting across resume and fork | 持续 `last_reasoning_token_count` 标志，避免恢复/分叉时重复计算推理 token 导致过早触发自动压缩 | [查看](https://github.com/openai/codex/pull/57839) |
| #57837 | Ship the standalone executor in release packages | 将 `codex-exec-server` 纳入标准 CLI 与 app-server 发布包，并通过 `codex-package.json` 的 `execServer` 字段公开路径 | [查看](https://github.com/openai/codex/pull/57837) |

---

## 5. 功能需求趋势

从近 24 小时 Issues 与 PR 中提炼，社区最关注的功能方向包括：

1. **跨平台与 WSL 兼容性**  
   Windows 桌面端与 WSL 工作区的路径映射（`sandboxCwd`）、WSL 下的 Computer Use 禁用、Windows 与移动端远程控制的不一致，成为最高频的兼容性诉求。

2. **使用量透明化与配额管理**  
   Issue #32195 获得最高点赞数（19 👍），用户希望在桌面 App 状态区持久化展示 5 小时与每周使用限额，类似 CLI 的配额可见性。

3. **沙盒策略与审批交互优化**  
   多个 Issue 指出细粒度沙盒策略拒绝 `write_stdin`、Auto-review 后 `/approve` 不可用、审批窗口未弹出等问题，用户期望更清晰的策略提示与恢复路径。

4. **Computer Use 稳定性与输入兼容性**  
   窗口捕获超时、全局 UI 卡顿、macOS 物理键盘干扰、浏览器附着失败等问题反复出现，说明 Computer Use 模块仍是桌面端体验的短板。

5. **Codex Cloud 环境生命周期管理**  
   环境发布卡死、草稿保存失败、DNS 突发失效等云端环境问题集中爆发，社区对云端工作

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-10-29)

## 今日速览

Gemini CLI 今日发布夜间版本 `v0.67.0-nightly.20261028`，修复了 Android (Termux) 下 ripgrep 路径解析及 CRLF 换行符导致的 diff 异常问题。社区围绕 **子代理（Subagent）稳定性**、**浏览器代理兼容性** 及 **AST 感知代码读取** 展开广泛讨论，多个 P1 级 Bug 仍待修复，开发者正推进速率限制可见性、Windows 路径大小写兼容等一系列核心体验优化。

---

## 版本发布

**v0.67.0-nightly.20261028.gfa5c17365**

- **fix(core)**: 允许 Android (Termux) 上的可信系统路径用于 ripgrep 分辨率（@amelidev，PR #29884）
- **fix(core)**: 在 `getDiffContextSnippet` 中对比前先规范化 CRLF 换行符（@jesussamuel-byte，PR #29884）

> 发布链接：https://github.com/google-gemini/gemini-cli/releases/tag/v0.67.0-nightly.20261028.gfa5c17365

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级 | 评论/👍 | 关注理由 |
|---|------|--------|---------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption | P1 | 13 / 2 | 子代理在达到最大轮次后仍上报 `status: "success"`，掩盖中断，直接影响任务可靠性，评论最多的热点 Bug。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，社区关注度高，需尽快定位根因。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 | 9 / 1 | 探索零依赖 OS 沙箱，充分发挥 Gemini 3 模型的原生 Bash 能力，属于重大架构增强方向。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 | 7 / 1 | 评估 AST 感知文件读取/搜索/代码映射的价值，旨在减少上下文膨胀并提升代码导航精度。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 | 7 / 0 | 模型主动调用自定义技能和子代理的意愿不足，影响自动化工作流的落地体验。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 | 4 / 1 | 浏览器子代理在 Wayland 环境下失效，影响 Linux 桌面用户的自动化浏览场景。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | [BUG] Browser Agent ignores settings.json overrides (e.g., maxTurns) | P2 | 4 / 0 | 浏览器代理忽略全局/项目级 `settings.json` 配置，导致 `maxTurns` 等参数无法生效。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | Gemini CLI encounters 400 error with > 128 tools | P2 | 3 / 0 | 工具数量超过阈值时触发 HTTP 400 错误，限制大型代码库下的工具扩展能力。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done output hook causes crash | P1 | 3 / 0 | 输出钩子在打印用户摘要时导致 CLI 崩溃，影响任务完成后的反馈闭环。 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Agent should stop/discourage destructive behavior | P2 | 3 / 1 | 模型可能执行 `git reset --force` 等破坏性操作，社区呼吁增加安全拦截与提示机制。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#29989](https://github.com/google-gemini/gemini-cli/pull/29989) | fix(core,cli): fix instances of incorrect `\n` escape behavior | OPEN | 修复 `@google/gemini-cli-core` 与 `@google/gemini-cli` 中多处错误的 `\n` 转义/反转义，防止字符串、正则及代码片段在文件编辑和 UI 文本中被损坏。 |
| [#30012](https://github.com/google-gemini/gemini-cli/pull/30012) | fix(cli): surface 429 rate limit cool-down and countdown in loading indicator | OPEN | 在 HTTP 429 限流事件中立即展示冷却提示，并在加载指示器中渲染逐秒倒计时，提升配额耗尽时的终端体验。 |
| [#30006](https://github.com/google-gemini/gemini-cli/pull/30006) | fix(core): use PowerShell CIM fallback for Windows IDE process lookup | OPEN | 修复 Windows IDE 进程检测的 PowerShell 回退逻辑，避免调用 Unix-only `ps` 导致进程查询静默失败。 |
| [#29999](https://github.com/google-gemini/gemini-cli/pull/29999) | fix(core): make `isWithinRoot` case-insensitive on Windows | CLOSED | 在 Windows 上使路径根目录检查不区分大小写，兼容不同工具产生的驱动器号和目录名大小写差异。 |
| [#29993](https://github.com/google-gemini/gemini-cli/pull/29993) | fix(ui): handle surrogate pairs when truncating in `sanitizeForDisplay` | CLOSED | 修复 UI 显示截断时可能切分 UTF-16 代理对（如 Emoji）导致字符显示异常的问题。 |
| [#30003](https://github.com/google-gemini/gemini-cli/pull/30003) | fix(cli): use default value when env var is set but empty | OPEN | 使 `${VAR:-default}` 在环境变量已设置但为空时回退到默认值，与 Bash 行为及文档保持一致。 |
| [#29982](https://github.com/google-gemini/gemini-cli/pull/29982) | fix(core): recognize dotted Gemini 3 models in `supportsMultimodalFunctionResponse` | CLOSED | 修复未启用动态模型配置时，对带点号的 Gemini 3 模型名称识别缺失，确保多模态函数响应能力正确开启。 |
| [#29998](https://github.com/google-gemini/gemini-cli/pull/29998) | fix(core): list Auto in `/model` when dynamicModelConfiguration is enabled and preview access is disabled | CLOSED | 确保在启用动态模型配置但无预览模型访问权限时，`/model` 对话框仍列出 `Auto` 选项。 |
| [#30013](https://github.com/google-gemini/gemini-cli/pull/30013) | fix(cli): anchor `.git` suffix removal to end of repo URL | OPEN | 修复 GitHub URL 解析中 `.git` 后缀移除逻辑，仅在结尾处移除，避免仓库名包含 `.git` 子串时出错。 |
| [#30002](https://github.com/google-gemini/gemini-cli/pull/30002) | docs: fix 5 broken internal anchor links and 1 dead external link | OPEN | 修复文档中 5 个损坏的内部锚点链接和 1 个失效外部链接，改善开发者文档可用性。 |

---

## 功能需求趋势

从近 24 小时的 Issues 和 PR 中可观察到以下社区关注方向：

1. **子代理（Subagent）可靠性与可见性**  
   多个 P1/P2 问题指向子代理在达到轮次上限后状态上报错误、通用代理挂起、技能/子代理调用意愿不足，以及子代理轨迹缺乏可见性（如 `/chat share` 无法共享子代理轨迹）。社区亟需更稳定的子代理生命周期管理与可观测性增强。

2. **AST 感知的代码理解工具**  
   围绕 AST-aware 文件读取、搜索和代码映射的 EPIC（如 #22745、#22746、#22747）持续推进，社区希望通过更精确的代码边界定位减少上下文膨胀，提升大型代码库的检索效率。

3. **浏览器代理跨平台兼容性**  
   Wayland 下的浏览器子代理失败（#21983）、`settings.json` 配置被忽略（#22267）、会话锁恢复机制（#22232）等问题表明，浏览器自动化模块在不同桌面环境和配置下的鲁棒性仍是短板。

4. **终端用户体验与运维可见性**  
   429 限流冷却倒计时（#30012）、Windows 路径大小写兼容（#29999）、Emoji/代理对安全截断（#29993）等 PR 显示，社区正在补强 CLI 在边界环境下的交互细节与跨平台稳定性。

5. **安全与破坏性操作防护**  
   社区多次提及模型可能执行 `git reset --force` 等破坏性命令（#22672），以及需要在执行前增加确认或拦截机制，AI 安全对齐成为功能需求的重要维度。

---

## 开发者关注点

- **P1 级 Bug 堆积**：`#22323`（子代理状态造假）、`#21409`（通用代理挂起）、`#21983`（Wayland 浏览器失败）、`#22186`（输出钩子崩溃）等高优先级问题长期未闭合，影响

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 (2026-10-29)

## 1. 今日速览

Reasonix 发布 **v2.54.0** 版本，Studio 与 CLI 同步更新，重点引入全局显示/隐藏快捷键、用量上传量统计及服务商前缀隐藏等功能，并拆分设置子页与壁纸外观设置。社区反馈集中在 v2.54.0 的若干界面缺陷（如保存按钮颜色异常、WSL 连接停顿、插话延迟等）以及文件预览、排队发送、MCP 组件清理等功能增强需求。

## 2. 版本发布

### Reasonix Studio v2.54.0 / CLI v2.54.0

**主要新增：**
- **全局显示/隐藏快捷键**：桌面设置提供默认关闭的全局显示/隐藏快捷键，支持按键录制与清除，仅在 Studio 运行时有效，不会启动已退出的应用（关联 #8290，修复于 #14592，@lancy69）。
- **隐藏服务商共同前缀**：服务商设置新增「隐藏共同前缀」选项，路由类服务给每个模型加的同一段前缀（如 `group/`）在各处显示时省略，仅改变显示（关联 #14573，修复于 #14578）。
- **用量页上传量**：设置 → 用量新增「上传量」，显示今天和近 30 天发给模型服务商的请求内容。
- **设置重构**：设置拆分为子页，壁纸移至外观，修复多处预算与界面问题。

**相关链接：**
- [Reasonix CLI v2.54.0 Release](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.54.0)
- [Reasonix Studio v2.54.0 Release](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.54.0)

## 3. 社区热点 Issues

以下选取过去 24 小时内更新、讨论度高或对用户体验影响大的 10 个 Issue：

| # | 标题 | 状态 | 核心内容 | 为何值得关注 | 链接 |
|---|------|------|----------|--------------|------|
| #14622 | 右侧工作台添加多种文件格式预览及引用部分内容插入对话 | OPEN | 支持 Word/Excel/PPT 显示与内容引用、常见视频显示、网页控件名/文字右键添加、Markdown 直接修改及文本框选拖入对话框 | 17 条评论，社区讨论活跃，涉及多模态文件处理与上下文引用，是 v3 方向的重要功能增强 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14622) |
| #14753 | 会话运行期间缺少“排队发送”选项 | OPEN | 纯文本消息一律按插话处理，与 CLI 心智模型不一致（CLI 普通回车排队、Ctrl+Enter 插话）；用户无法将消息排在当前任务之后作为独立一轮执行 | 涉及 CLI 与 Studio 行为一致性，影响会话流程控制体验 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14753) |
| #14706 | 会话任务完成后输入框按钮未停止，代码已自动提交 | OPEN | v2.54.0 下任务执行完毕但输入框按钮未重置，页面无输出，代码已自动提交 | 新版本回归风险，直接影响任务状态反馈与代码安全 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14706) |
| #14745 | Studio 连接 WSL 时操作停顿 | OPEN | 连接主机、新建/删除会话均会停顿，疑似每次操作重建远端连接 | Windows + WSL2 用户高频痛点，严重影响跨平台开发体验 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14745) |
| #14752 / #14751 | 设置页“模型服务”保存按钮颜色异常（黑色/无法分辨） | OPEN | 浅色/深色模式下保存按钮与文字颜色对比度不足，无法分辨 | v2.54.0 新增 UI 缺陷，多个用户独立反馈，属于可访问性问题 | [查看 #14752](https://github.com/esengine/DeepSeek-Reasonix/issues/14752) · [查看 #14751](https://github.com/esengine/DeepSeek-Reasonix/issues/14751) |
| #14739 / #14738 | MCP 目录移除后无法移除 MCP 组件 | OPEN | MCP 目录已删除，再尝试移除 MCP 组件失败 | MCP 生态配置清理缺陷，影响插件/服务生命周期管理 | [查看 #14739](https://github.com/esengine/DeepSeek-Reasonix/issues/14739) · [查看 #14738](https://github.com/esengine/DeepSeek-Reasonix/issues/14738) |
| #14737 | 模型优先打开内置浏览器而非 web_fetch 取文本 | OPEN | 静态文档站、博客等无需 JS 渲染的页面，模型仍调用内置浏览器，导致标签页堆积 | 影响 Agent 浏览效率与资源占用，社区期望优先使用轻量 web_fetch | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14737) |
| #14705 | 界面无法放大，配置内容过多不便查看 | OPEN | 配置页面缺少缩放支持，内容多时查看不便 | 可访问性与高分屏适配需求，Windows 11 用户反馈 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14705) |
| #14669 | 截图配置点击按钮后对话框有黏连卡顿感 | OPEN | 截图配置交互存在卡顿，影响操作流畅度 | 桌面端交互性能问题，v2.53.1 仍存在 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14669) |
| #14742 | 任务结束后压缩内容仍有 300k，是否正常 | OPEN | 任务结束后压缩后仍有 300k 内容，用户疑虑是否正常 | 涉及上下文压缩与 token 使用透明度，用户对成本与性能敏感 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14742) |

## 4. 重要 PR 进展

以下选取 10 个过去 24 小时内更新的重要 PR，涵盖功能新增与 Bug 修复：

| # | 标题 | 状态 | 功能/修复内容 | 链接 |
|---|------|------|---------------|------|
| #14750 | 桌面端：运行中消息默认选择“插话”或“跟进” | OPEN | 新增机器本地偏好设置（外观 → 键盘快捷键 → 运行中发送的消息），可保持当前插话默认，或选择跟进（等待整个运行结束后再发送） | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14750) |
| #14749 | Agent/配置：移除 stale MCP 条目而不丢失源权威性 | OPEN | 在可写配置源消失后移除已知的 stale MCP 运行时条目，同时保留声明与插件所有权边界 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14749) |
| #14748 | Agent/配置：支持精确 `@path:start-end` 文件引用 | OPEN | 支持从文件发送时解析的包含行号范围的引用，现有 `<file>` 上下文携带 `start-line`/`end-line` 用于精确源引用 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14748) |
| #14747 | 桌面端：折叠计划可选进度条 | OPEN | 在外观 → 会话显示 → 显示折叠计划进度下新增可选进度条，默认关闭 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14747) |
| #14746 | 桌面端：未读会话显示绿色标记而非日期 | OPEN | 对已完成未查看的会话，侧边栏显示绿色未读标记替代日期，视图状态清除后恢复日期 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14746) |
| #14711 | 配置：将配置锁与真实用户主目录隔离 | CLOSED | 修复 #14539，Go 测试在 macOS arm64 下不再在真实用户主目录留下 `.reasonix` 零字节锁文件 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14711) |
| #14709 | 桌面端：会话重命名对话框使用语义排版 | CLOSED | 修复 #14607，重命名对话框采用邻近对话框的语义字体标记，修复普通界面缩放下过大的字体问题 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14709) |
| #14708 | 桌面端：项目控件保持在滚动树之外 | CLOSED | 修复 #14600，将项目标题和“添加项目”按钮移出滚动容器，避免长列表滚动时控件被遮挡 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14708) |
| #14707 | 桌面端：设置页头按钮高度对齐 | CLOSED | 修复 #14601，中文环境下设置展开按钮与关闭按钮高度不一致问题 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14707) |
| #14592 | 桌面端：新增可选全局显示/隐藏快捷键 | CLOSED | 对应 v2.54.0 新增功能，实现仅在 Studio 运行时的显示/隐藏绑定，默认关闭 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14592) |

## 5. 功能需求趋势

从近

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-10-29)

## 今日速览

OpenCode 今日发布 v1.19.5 修复 TUI 工作线程请求挂起问题，并同步推送 `process-daemon v0.3.2`（@opencode/pty@0.3.2）。社区围绕 v2.0 版本的后台子代理取消、服务重启持久性、Windows 启动卡死等核心问题展开活跃讨论，同时多个 MCP 资源订阅、图像生成工具及 SDK 实验性方法重组的 PR 获得进展。

## 版本发布

### v1.19.5
- **Core 修复**：TUI 工作线程请求失败时现在会返回错误，而非让调用方无限期挂起（@Nowaker，#54936）。
- **社区贡献者**：1 位社区贡献者参与本次修复。

### process-daemon v0.3.2
- 发布 `opencode-pty 0.3.2`（协议 7），已同步发布到 npm 包 `@opencode/pty@0.3.2`。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 关注理由 |
|---|------|------|---------|----------|
| [#36423](https://github.com/anomalyco/opencode/issues/36423) | [2.0] v2: subagent: no cancellation support for background subagents | OPEN | 15 / 8 | v2 后台子代理缺乏取消机制，影响长时间任务的可控性，社区讨论度最高。 |
| [#41746](https://github.com/anomalyco/opencode/issues/41746) | [2.0, triaging] [v2 Windows] opencode2 hangs at "Starting background server..." after reinstall | OPEN | 8 / 9 | Windows 重装后卡死于后台服务启动，点赞数高，影响新用户首次体验。 |
| [#36347](https://github.com/anomalyco/opencode/issues/36347) | [bug, core, 2.0] V2: preserve permission and question waits across server restart | OPEN | 8 / 1 | 服务重启后待处理的权限请求和问题表单会丢失，涉及会话连续性核心缺陷。 |
| [#37239](https://github.com/anomalyco/opencode/issues/37239) | [2.0] service (v2): restart spawns serve --service in a silent retry loop | OPEN | 8 / 2 | 服务重启时出现静默重试循环，需手动杀进程，影响托管服务稳定性。 |
| [#35432](https://github.com/anomalyco/opencode/issues/35432) | [reproduced] Config `tool_call: false` does not disable tools | OPEN | 7 / 0 | 配置项未生效，LLM 请求仍会携带工具定义，影响不支持工具调用的模型兼容性。 |
| [#36117](https://github.com/anomalyco/opencode/issues/36117) | [bug, 2.0] fix(server): await catalog readiness for model and provider reads | OPEN | 7 / 1 | 托管服务重启后目录读取可能返回不完整快照，导致模型选择器加载缓慢。 |
| [#36348](https://github.com/anomalyco/opencode/issues/36348) | [discussion, core, 2.0] V2: define restart semantics for foreground and background shells | OPEN | 7 / 0 | 讨论服务重启时前后台 Shell 进程的所有权与追踪语义，属于架构层面议题。 |
| [#36424](https://github.com/anomalyco/opencode/issues/36424) | [2.0] v2: shell: no way to stop a running background command | OPEN | 6 / 4 | 缺乏通过会话 ID 停止后台命令的机制，与子代理取消问题形成互补需求。 |
| [#52953](https://github.com/anomalyco/opencode/issues/52953) | [pending close] snapshot: fails on git < 2.45 — unknown option 'sparse' | CLOSED | 6 / 0 | 快照功能依赖 `git add --all --sparse`，低版本 Git 环境下无法创建检查点，已标记待关闭。 |
| [#56455](https://github.com/anomalyco/opencode/issues/56455) | [reproduced] OpenAI Chat fails a finished step when reasoning arrives after the finish reason | CLOSED | 5 / 3 | OpenAI 兼容主机在 finish_reason 后仍发送推理 chunk，导致步骤判定失败，后续 PR 有跟进。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#60016](https://github.com/anomalyco/opencode/pull/60016) | fix(theme): give migrated V1 dialogs an opaque background | CLOSED | 为迁移的 V1 对话框提供不透明背景，修复 `lucent-or...` 等主题下透明面板导致的显示问题。 |
| [#60039](https://github.com/anomalyco/opencode/pull/60039) | feat(mcp): support per-server TLS trust for remote MCP servers | OPEN | 为远程 MCP 服务器添加 `tls` 配置块（`ca_file` 等），实现每服务器 TLS 信任控制。 |
| [#60041](https://github.com/anomalyco/opencode/pull/60041) | feat(mcp): trust private-network server certificates on first use | OPEN | 基于 #60039 堆叠，实现私有网络 MCP 服务器证书首次使用信任（TOFU）。 |
| [#60055](https://github.com/anomalyco/opencode/pull/60055) | fix(tui): report unverified clipboard delivery | OPEN | 修复 TUI 在剪贴板写入失败时仍显示 "Copied to clipboard" 的问题，如实报告投递状态。 |
| [#60054](https://github.com/anomalyco/opencode/pull/60054) | feat(core): subscribe to MCP resources and wake sessions | CLOSED | 支持订阅 MCP 资源更新通知（`notifications/resources/updated`），并据此唤醒会话。 |
| [#60049](https://github.com/anomalyco/opencode/pull/60049) | fix(core): start background compaction a fixed lead before the threshold | OPEN | 调整后台压缩触发时机，在阈值前固定提前量开始/丢弃摘要，优化上下文管理。 |
| [#59939](https://github.com/anomalyco/opencode/pull/59939) | feat(core): add image_generate tool | OPEN | 新增内置 `image_generate` 工具，允许模型使用用户配置的图像模型生成/编辑图片并查看结果。 |
| [#60048](https://github.com/anomalyco/opencode/pull/60048) | feat(tui): add a path picker for the last response | CLOSED | 为 TUI 最后响应中的文件路径添加路径选择器，便于从纯文本路径快速跳转。 |
| [#60047](https://github.com/anomalyco/opencode/pull/60047) | fix(app): always list OpenCode free models in the model picker | CLOSED | 修复桌面端模型选择器隐藏超过 6 个月或同家族有更新免费模型的免费模型问题（如 Big Pickle）。 |
| [#59072](https://github.com/anomalyco/opencode/pull/59072) | refactor(client): group experimental SDK methods under client.experimental | CLOSED | 将 SDK 实验性方法统一归入 `client.experimental` 命名空间，与稳定方法区分，不变更 URL 和线路格式。 |

---

## 功能需求趋势

从近 24 小时更新的 Issues 与 PR 可观察到以下社区关注方向：

1. **v2.0 后台任务控制**：多个 Issue 指出缺乏对后台子代理和后台 Shell 命令的取消/停止机制，成为 v2 版本可用性瓶颈。
2. **服务重启与状态持久性**：权限请求、问题表单、Shell 进程所有权在服务重启后丢失，社区强烈要求跨重启的会话连续性。
3. **MCP 生态安全与资源订阅**：围绕远程 MCP 服务器的 TLS 信任配置、私有网络证书首次使用信任，以及资源更新订阅与会话唤醒，开发者投入较多精力。
4. **桌面端与 TUI 体验**：剪贴板投递状态反馈、模型选择器免费模型显示、路径选择器、多窗口/标签页等桌面端交互需求持续出现。
5. **SDK 与客户端稳定性**：实验性方法命名空间重组、OpenAI 兼容主机的流式推理处理、OpenRouter 选项类型等，表明社区在加强 SDK 稳定性与多模型适配。

---

## 开发者关注点

- **痛点**：Windows 平台 `opencode2` 后台服务启动卡死、服务重启静默重试循环、低版本 Git（<2.45）下快照功能失效、TUI 推理内容逐行渲染导致阅读体验差。
- **高频需求**：后台子代理/命令取消能力、服务重启后权限与问题表单持久化、MCP 服务器 TLS 与资源订阅支持、桌面端多窗口/标签页、模型选择器可靠性。
- **社区协作**：本周多个 PR 由社区贡献者（如 @Nowaker、@rekram1-node、@jlongster）提交，且多个 Issue 处于 triaging 或 pending close 状态，维护团队正在梳理 v2.0 相关缺陷与优化项。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 (2026-10-29)

## 1. 今日速览

Deepseek Harness 社区今日迎来两个版本发布：**v0.2.2-alpha.2** 侧重插件生态与交互体验增强，**v0.2.1-rc.4** 则修复了 ACP 模式下的诊断输出问题。过去 24 小时内无新增 Issues 和 Pull Requests 更新，社区活动集中在稳定版迭代与插件功能完善上。

## 2. 版本发布

### dsh-v0.2.2-alpha.2
**新增功能与改进：**
- **插件管理页体验升级**：支持展示富文本详情，优化页面布局与导航行为。(@turtle1999, @turtle2099)
- **第三方插件包更新**：支持更新已安装的第三方插件包；热更新失败时自动尝试回滚至旧版本，提升可用性。(@turtle1999, @turtle2099)
- **聊天文本引用**：支持将聊天文本作为引用插入输入框，发送后显示紧凑预览，便于上下文复用。(@lsdsjy, @imccyu)

[查看完整 Release 详情](https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.2.2-alpha.2)

### dsh-v0.2.1-rc.4
**问题修复：**
- 修复 ACP 模式下诊断输出混入 stdout 的问题，避免干扰标准输出流。(@LegGasai, @tianyicui)

[查看完整 Release 详情](https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.2.1-rc.4)

---

## 3. 社区热点 Issues

过去 24 小时内 **无新增或更新的 Issues**（共 0 条），因此无法列出 10 个具体条目。建议开发者关注 [Issues 页面](https://github.com/deepseek-ai/deepseek-harness/issues) 以获取历史高频讨论与长期待办事项。

---

## 4. 重要 PR 进展

过去 24 小时内 **无新增或更新的 Pull Requests**（共 0 条）。近期代码变更主要体现在上述两个 Release 标签中，建议通过 [Commits 页面](https://github.com/deepseek-ai/deepseek-harness/commits/main) 跟进具体提交记录。

---

## 5. 功能需求趋势

基于本次发布内容，社区及核心开发者当前关注的功能方向包括：

| 趋势方向 | 具体体现 | 预期价值 |
|---------|---------|---------|
| **插件生态成熟** | 支持第三方插件包更新、热更新失败回滚、富文本详情展示 | 降低插件维护成本，增强扩展性与容错能力 |
| **对话上下文复用** | 聊天文本作为引用插入输入框，发送后显示紧凑预览 | 提升多轮对话效率，减少重复输入 |
| **ACP 模式稳定性** | 修复诊断输出混入 stdout 问题 | 确保 Agent 协议通道输出纯净，适合生产环境集成 |
| **前端交互优化** | 插件管理页布局与导航改善 | 提升开发者与最终用户的管理体验 |

---

## 6. 开发者关注点

从本次 Release Notes 及贡献者反馈中提炼出的高频关注点：

1. **插件热更新的可靠性**：社区对“热更新失败自动回滚”机制的引入反响积极，说明插件运行时的稳定性是核心痛点。
2. **标准输出污染问题**：ACP 模式下诊断信息混入 stdout 曾影响下游消费，此次修复表明开发者高度关注输出流的隔离与纯净度。
3. **UI/UX 一致性**：插件管理页的布局与导航改善显示社区对管理后台易用性的持续需求。
4. **多模态/文本引用支持**：将聊天内容作为引用插入输入框，反映用户希望在对话中更方便地复用历史上下文。

---

**数据来源**：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)  
**报告日期**：2026-10-29

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-10-29)

## 今日速览

Hermes 社区今日无新版本发布，但活跃度保持高位：14 个 Issue 与 50 个 PR 在过去 24 小时内更新。社区核心关注点集中在 **统一网关（Unified Gateway）合并后的遗留问题**、**桌面端会话与模型切换异常**、以及 **Windows 网关重启风暴的修复** 上，多个 P2 级别缺陷持续获得维护者与社区的跟进。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 关键指标 | 为何值得关注 | 链接 |
|---|------|------------|---------|------------|------|
| #143547 | Unified gateway: open post-merge problems on main | P2, comp/gateway 等多组件 | 27 评论，1 👍 | 统一网关合并后的后续问题，涉及 CLI、TUI、Desktop、API 等多个入口，是当前主干分支最核心的稳定性追踪项。 | [查看](https://github.com/NousResearch/hermes-agent/issues/143547) |
| #119070 | kanban: card whose run was rate-limited then succeeded is parked as blocker_auth forever | P2, needs-decision | 20 评论 | 看板卡片在限流后重试成功仍卡在 `blocker_auth`，审核人永远不会触发，影响自动化流程可用性。 | [查看](https://github.com/NousResearch/hermes-agent/issues/119070) |
| #105758 | Lifecycle guard false-positive blocks Node.js CLIs | P3, needs-decision | 19 评论 | 生命周期守护误杀 Node.js CLI（如 `obsidian-headless`），影响终端工具集成场景。 | [查看](https://github.com/NousResearch/hermes-agent/issues/105758) |
| #141973 | Mid-turn sends are unreliable to steer | P2, comp/desktop | 10 评论 | 桌面端对话中途发送消息存在“入队而非转向”“UI 显示已发送但未到达 harness”“Steer 按钮无反应”三种异常，直接影响交互体验。 | [查看](https://github.com/NousResearch/hermes-agent/issues/141973) |
| #146253 | Desktop model switch blocked when current route is a stopped managed local model | P2, comp/gateway | 2 评论 | 桌面端切换模型时，若当前路由为已停止的本地托管模型，会抛出 `ValueError` 导致内部错误，用户被困在死路由上。 | [查看](https://github.com/NousResearch/hermes-agent/issues/146253) |
| #146242 | Marking a listed session read returns 404 `not_found` | P2, comp/gateway | 2 评论 | 会话明确存在，但标记为已读接口返回 404，影响会话列表状态同步。 | [查看](https://github.com/NousResearch/hermes-agent/issues/146242) |
| #139548 | Desktop Edit profile shows empty Description for bots on remote gateway | P2, comp/desktop | 3 评论 | 远程网关机器人编辑资料时描述为空，虽然后端 `/api/profiles` 正常返回，仅本地设备正常。 | [查看](https://github.com/NousResearch/hermes-agent/issues/139548) |
| #105132 | Max-iterations summary builders omit x-opencode-session → relay 400 | P2, comp/agent | 3 评论 | 达到最大迭代次数时，部分 API 模式的总结构建器缺少 OpenCode 会话头，导致 relay 返回 400 MissingSessionID。 | [查看](https://github.com/NousResearch/hermes-agent/issues/105132) |
| #146254 | bot_relay.deliver rejects Desktop's `id` param on legacy routes | P2, comp/tui-gateway | 0 评论 | 跨机器人私信在 SSH/旧版仪表盘 WebSocket 路由上因 `id` 参数校验失败而静默丢失。 | [查看](https://github.com/NousResearch/hermes-agent/issues/146254) |
| #146263 | Publish a versioned, authoritative gateway activity contract | P3, comp/gateway | 0 评论 | 社区提出为外部空闲观察者提供版本化的网关活动发布协议，反映可观测性需求在上升。 | [查看](https://github.com/NousResearch/hermes-agent/issues/146263) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 核心内容 | 链接 |
|---|------|------|---------|------|
| #98744 | fix(desktop): add in-app toast controls, session click-through, stable error dedup | Bug / 桌面端 | 新增应用内 Toast 总开关（设置→通知）、点击跳转关联聊天、错误去重稳定化，解决 Toast 无法关闭且无入口的问题。 | [查看](https://github.com/NousResearch/hermes-agent/pull/98744) |
| #146268 | feat(mcp): add six PageOne Lab hosted services to the optional catalog | Feature / MCP | 向可选 MCP 目录添加六个 PageOne Lab 托管的公共只读服务，用户可无需账号或凭证直接安装。 | [查看](https://github.com/NousResearch/hermes-agent/pull/146268) |
| #141870 | fix(gateway): secondary profile first-try connect now publishes runtime status | Bug / 网关 | 修复多路由网关中，次要配置文件的 Email 适配器首次连接成功后不发布运行时状态，导致卡片停留在“需重启”。 | [查看](https://github.com/NousResearch/hermes-agent/pull/141870) |
| #135979 | fix(cron): survive undecodable context_from output files | Bug / Cron | 修复 Cron 任务因输出目录中非 UTF-8 文件（如 macOS AppleDouble 文件）导致在脚本启动前即崩溃的问题。 | [查看](https://github.com/NousResearch/hermes-agent/pull/135979) |
| #146264 | fix(config): recognize supported MoA preset settings | Bug / 配置 | 修复 MoA 预设字段（如 `fanout`、`reference_timeout`）保存后误报警告，且自定义预设名称和 `config get` 受影响。 | [查看](https://github.com/NousResearch/hermes-agent/pull/146264) |
| #104220 | fix: guard /models null data payloads from crashing model picker | Bug / CLI / Ollama | 修复 Ollama 返回 `"data": null` 时，模型选择器因 `TypeError` 崩溃，导致 `GET /api/model/options` 失败。 | [查看](https://github.com/NousResearch/hermes-agent/pull/104220) |
| #146267 | fix(models): a null /models data payload must not crash probe_api_models | Bug / 模型 | 与上述类似，修复 `probe_api_models` 在 `/models` 返回 `null` 数据时的崩溃问题。 | [查看](https://github.com/NousResearch/hermes-agent/pull/146267) |
| #146249 | fix(gateway): give producer-admitted relay turns their typing and reactions back | Bug / 网关 / Slack | 修复通过中继（如 Slack 连接器）到达的消息在 0.22.3 后丢失输入中状态、打字反应和结果反应的问题。 | [查看](https://github.com/NousResearch/hermes-agent/pull/146249) |
| #146078 | fix(gateway): a respawn storm on the Windows launcher had no brake | Bug / 网关 / Windows | 修复 Windows 启动器在受监管网关重启时缺少重启风暴刹车，曾出现 69 秒内 3 代网关的情况。 | [查看](https://github.com/NousResearch/hermes-agent/pull/146078) |
| #146261 | fix(gateway): the respawn-storm brake reached only fresh installs | Bug / 网关 / Windows | 对 #146078 的后续修复，解决模板更改仅对新安装生效，已安装任务需通过漂移检查才能更新的问题。 | [查看](https://github.com/NousResearch/hermes-agent/pull/146261) |

---

## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **可观测性与外部集成**：Issue #146263 提出为外部空闲观察者提供版本化的网关活动发布契约（T1–T6），表明社区希望 Hermes 能更好地暴露内部运行状态，以便外部监控系统集成。
2. **桌面端交互体验增强**：Issue #146265 要求在运行时页脚和 CLI 状态栏显示路由后端模型，结合 #98744 的 Toast 控制需求，桌面端信息透明度与通知管理成为高频诉求。
3. **跨平台/远程网关兼容性**：Issue #139548（远程机器人描述为空）、#146254（旧版路由 `id` 参数被拒）显示，用户在混合本地与远程网关环境下仍遇到数据同步与协议兼容问题。
4. **MCP 生态扩展**：PR #146268 和 #146262 分别添加 PageOne Lab 与 Modular 模型提供商插件，说明社区正在积极丰富第三方模型与服务的即插即用支持。

---

## 开发者关注点

1. **统一网关合并后的稳定性债务**：#143547 持续跟踪主干分支中统一网关合并后的未解决问题，涉及多个组件（gateway、cron、desktop、tui 等），是当前代码质量的核心风险点。
2. **会话与模型生命周期异常**：#146253（已停止本地模型阻塞切换）、#146242（标记已读返回 404）、#119070（看板卡片永久阻塞）均指向会话状态机与路由恢复逻辑的边界情况处理不足。
3. **Windows 平台可靠性**：#146078 与 #146261 连续修复 Windows 网关启动器重启风暴，说明受监管进程在 Windows 上的生命周期管理仍需打磨。
4. **外部依赖的防御性编程**：#105758（Node.js CLI 被误杀）、#104220/#146267（Ollama 返回 null 导致崩溃）、#135979（非 UTF-8 文件导致 Cron 崩溃）反映开发者需要

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-10-29)

## 今日速览

今日社区活动集中在核心稳定性与平台可用性问题上。P1 级别的 agent 启动序列化阻塞问题（#176342）持续引发关注，同时多个 P2 级 Bug 涉及 Windows 浏览器控制、心跳消息重复及 LINE 消息计费异常。功能侧，Skill Workshop 的学习覆盖验证与插件目录申请成为社区讨论焦点。

## 版本发布

过去 24 小时内 OpenClaw 仓库无新版本发布。

## 社区热点 Issues

以下 10 个 Issue 今日更新频繁或影响较大，建议重点跟进：

| # | 标题 | 优先级/标签 | 核心内容 | 为何重要 | 链接 |
|---|------|-------------|----------|----------|------|
| #176342 | [state/agent-db] stale-lease 完整性门禁在非正常关机后序列化 agent 启动，导致分钟级不可用 | P1, crash-loop | 非正常关机后，agent DB 打开会触发 `stale-lease` 完整性检查并串行执行，导致 agent 长时间无法启动 | P1 级别，直接影响 agent 可用性，属于核心稳定性问题 | [查看](https://github.com/openclaw/openclaw/issues/176342) |
| #143100 | Worker 桌面 observe 和 launch 跳过 stale-build 准入，而隧道和附加会话会强制执行 | P2, stale | Worker 环境的 bootstrap receipt 与当前 Gateway bundle 不匹配时，`startTunnel` 和 session attach 会拒绝，但交互式桌面 observe 仍被授权 | 涉及安全准入不一致，可能导致越权访问或状态不一致 | [查看](https://github.com/openclaw/openclaw/issues/143100) |
| #185092 | Windows 节点已配对，但浏览器控制因监听器所有权/认证错误失败 | P2, impact:ux-friction | Windows 节点显示已配对并连接，但 agent 无法可靠与浏览器会话交互，涉及监听器所有权认证 | 新创建（10-26），直接影响 Windows 端用户体验 | [查看](https://github.com/openclaw/openclaw/issues/185092) |
| #143078 | 9.x 版本心跳触发的 agent 轮次会重复发布重复/近似重复消息（从 8.1 回归） | P2, impact:message-loss | 升级至 9.x 后，心跳间隔下即使无新实质内容，Discord 也会每 ~30 分钟重复发布可见消息 | 版本回归问题，影响消息质量与用户体验 | [查看](https://github.com/openclaw/openclaw/issues/143078) |
| #150250 | Skill Workshop — 验证学习覆盖率和行为复用 | P3, Feature | 协调 Skill Workshop 剩余工作，捕获日常工作中的过程性发现，并证明授权的技能修订能改进后续任务 | 功能方向明确，涉及技能学习与复用的核心能力 | [查看](https://github.com/openclaw/openclaw/issues/150250) |
| #187099 | 恢复回滚车道上排队的回复从未被回收，诊断拒绝处理，导致主会话仪表板不可用 | clawsweeper:intake:bug | 2026.10.8 版本下，已杀死的围栏类修复后，下一个卡住会话形态出现，诊断识别到停滞但故意不采取行动 | 新创建（10-28），导致主会话不可用，紧急程度高 | [查看](https://github.com/openclaw/openclaw/issues/187099) |
| #142588 | 心跳静默未强制执行：省略 HEARTBEAT_OK 的轮次会被原文投递（27 次计划运行中 26 次发布叙述） | P2, impact:ux-friction | 心跳静默依赖模型输出字面量 `HEARTBEAT_OK`，缺少该标记的回复会被当作真实通知投递 | 导致大量不必要的消息推送，影响用户体验 | [查看](https://github.com/openclaw/openclaw/issues/142588) |
| #184474 | 使用消息工具创建单用 Discord 频道邀请 | P3, clawsweeper:bulk-filed | 允许现有 Discord 消息工具为明确选择的 guild 文本频道发放单用、过期邀请 | 社区功能需求，增强 Discord 集成能力 | [查看](https://github.com/openclaw/openclaw/issues/184474) |
| #183537 | 请求将 ShieldCortex 和 multi-clawd 加入官方插件目录或认证发布者列表 | P3 | Drakon Systems 维护的两款开源插件（安全与多账号 Claude 故障转移）已在自有 fleet 运行，申请官方认证 | 涉及插件生态扩展与供应链信任机制 | [查看](https://github.com/openclaw/openclaw/issues/183537) |
| #187091 | 侧边栏轨道对齐 E2E 等待不存在的个人区块 | P2, clawsweeper:fix-shape-clear | 新偏好不再渲染个人区块容器，导致桌面和触控端 E2E 用例因等待已移除元素而超时 | 新创建（10-28），影响前端测试稳定性 | [查看](https://github.com/openclaw/openclaw/issues/187091) |

## 重要 PR 进展

以下 10 个 PR 今日有更新，涵盖 Bug 修复、性能优化与前端可用性改进：

| # | 标题 | 状态/标签 | 功能或修复内容 | 链接 |
|---|------|-----------|----------------|------|
| #187086 | fix: 保持 agent 关闭检查点发布为内部 | CLOSED, P3 | 移除生产导出审计中 `publishAgentDatabaseCloseCheckpoint` 的未准备导出发现，不改变数据库关闭行为 | [查看](https://github.com/openclaw/openclaw/pull/187086) |
| #187098 | fix(workboard): 拒绝不支持的卡片元数据键 | OPEN, plugin: workboard | `workboard.cards.create/update` 接收 metadata 后会丢弃不属于 store 的键，导致调用方误以为写入成功，此 PR 拒绝不支持键 | [查看](https://github.com/openclaw/openclaw/pull/187098) |
| #180214 | fix(compaction): 保留活跃请求来源 | OPEN, docs, agents, P2 | 防止压缩操作将活跃人类请求替换为后续内部观测，或在独立内部运行中复活已完成的人类工作 | [查看](https://github.com/openclaw/openclaw/pull/180214) |
| #187101 | fix: 解除最小化 Gateway 中手动通道启动的阻塞 | OPEN, gateway, size: XS | 最小化测试 Gateway 可确认 `channels.start` 请求，避免手动账户恢复无限等待 | [查看](https://github.com/openclaw/openclaw/pull/187101) |
| #187062 | fix(control-ui): 新会话项目列表在加载失败时保持空白 | OPEN, app: web-ui, P0 | 项目列表加载失败时显示错误和重试按钮，已选项目在发现成功前保持选中 | [查看](https://github.com/openclaw/openclaw/pull/187062) |
| #187093 | perf(state): 跳过已确认活动后的冗余维护 | OPEN, docs, scripts, clawsweeper:intake:bug | 会话活动在维护结果交付后被确认时，避免触发另一次空规划轮次 | [查看](https://github.com/openclaw/openclaw/pull/187093) |
| #187097 | fix: 恢复侧边栏轨道对齐检查以适配新偏好 | OPEN, app: web-ui, clawsweeper:intake:bug | 修复侧边栏轨道对齐检查在新偏好不含个人区块时超时的问题，关联 #187091 | [查看](https://github.com/openclaw/openclaw/pull/187097) |
| #187036 | fix(ui): 在聊天工作区搜索中匹配规范 NFC/NFD 名称 | OPEN, app: web-ui, P2 | 在四个 Control UI 过滤器中实现 Unicode 规范化比较，修复等效字符搜索不匹配问题 | [查看](https://github.com/openclaw/openclaw/pull/187036) |
| #186642 | fix: 工作区 Markdown 证据链接打开丢失的对话 | OPEN, docs, app: web-ui, gateway, P2 | 修复工作区 Markdown 报告中相对证据链接解析错误，导致点击后打开不存在的对话 | [查看](https://github.com/openclaw/openclaw/pull/186642) |
| #186861 | feat(skills): 每日 Workshop 维护中对过大的学习技能进行节食 | OPEN, docs, agents, size: XL | 对只增不减的学习技能 `SKILL.md` 进行大小控制，避免每次运行读取冗余内容 | [查看](https://github.com/openclaw/openclaw/pull/186861) |

## 功能需求趋势

从近期 Issues 和 PR 中可观察到社区关注的功能方向：

1. **技能生命周期管理**：Skill Workshop 的学习覆盖验证（#150250）、自主补丁字符限制可配置（#141023）、过大技能自动节食（#186861），表明社区希望技能系统更可控、可维护。
2. **跨平台与即时通讯集成**：Windows 浏览器控制（#185092）、Discord 单用邀请（#184474）、LINE 消息计费优化（#142734）、ElevenLabs 关键词提示（#184709），显示对多端适配和第三方平台集成的需求持续高涨。
3. **插件生态认证**：ShieldCortex 和 multi-clawd 申请进入官方插件目录（#183537），反映社区对第三方插件的信任机制与官方背书有明确诉求。
4. **心跳与消息

:::
