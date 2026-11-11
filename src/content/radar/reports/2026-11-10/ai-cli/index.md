---
title: "AI CLI 工具社区动态日报"
published: 2026-11-10
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-10

> 生成时间: 2026-11-10 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-10)

## 1. 生态全景

当前 AI CLI 工具正处于从“单一对话助手”向“多代理、多平台、企业级自动化”基础设施演进的关键期。各主流工具均在加强跨平台桌面端稳定性、多账号/多会话管理以及 MCP/插件生态治理，但尚未形成统一的标准与成本透明机制。安全分类器误报、Headless 模式 Token 消耗异常、会话状态丢失等核心缺陷普遍存在，反映出代理自主执行能力与生产环境可靠性之间仍存在显著差距。整体呈现“功能快速堆叠、稳定性补丁追赶”的特征，适合早期采用者，但企业级大规模部署仍需谨慎评估。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Issues | 今日 PR | 今日 Release | 核心版本/动态 |
|------|------|------------|---------|-------------|--------------|
| **Claude Code** | anthropics/claude-code | 精选 10 条（总数未披露） | 1 条（#89404） | ✅ v2.1.321 | 引入 Claude Fable 5.2（1M 上下文），新增 `remote-control --settings` |
| **OpenAI Codex** | openai/codex | 精选 10 条（总数未披露） | 精选 10 条（总数未披露） | ✅ 3 个 Alpha 预发布 | rust-v0.169.0-alpha.7/6，v0.167.0-alpha.4.1；Windows 桌面端多起稳定性问题 |
| **Gemini CLI** | google-gemini/gemini-cli | 49 条 | 44 条 | ❌ 无 | 无新版本；Subagent 稳定性与浏览器代理兼容性为核心 |
| **DeepSeek Reasonix** | esengine/DeepSeek-Reasonix | 精选 10 条（总数未披露） | 精选 10 条（总数未披露） | ✅ v2.58.1 | 修复 UI 回归、Windows 启动闪控制台、CLI 参数误执行；Electron 升至 45.2.3 |
| **OpenCode** | anomalyco/opencode | 精选 10 条（总数未披露） | 精选 10 条（总数未披露） | ❌ 无 | 免费层配额争议（#59387 339 评论）；MCP SDK 升至 2.4.0 |
| **DeepSeek Harness** | deepseek-ai/deepseek-harness | 0 | 0 | ❌ 无 | 过去 24 小时无活动 |
| **Hermes** | NousResearch/hermes-agent | 19 条 | 50 条 | ❌ 无 | 多租户网关稳定性、Telegram 适配器、插件目录扩展为主 |
| **OpenClaw** | openclaw/openclaw | 7 条 | 50 条 | ❌ 无 | Windows 原生安装 P0 阻塞、会话状态卡死与内存 OOM 为核心 |

> 注：部分仓库仅披露“精选”热点，未公开全量 Issues/PR 数，表格中以官方日报披露数据为准。

## 3. 共同关注的功能方向

多个工具社区在以下维度上存在高度重叠的诉求，表明行业正进入“代理可控性与基础设施治理”阶段：

| 共同关注方向 | 涉及工具 | 具体社区诉求 |
|-------------|---------|------------|
| **多账号/多会话管理** | Claude Code、OpenAI Codex | Claude Code #18435（桌面端多账号切换，1,025 👍）、#90188（跨账号会话聚合）；Codex #60364（切换账号后本地侧边栏组织被擦除） |
| **桌面端跨平台稳定性** | OpenAI Codex、Claude Code、OpenClaw | Codex Windows 项目侧边栏丢失（#42739）、云聊天恢复失败（#59855）、输入卡顿（#58337）；Claude Code Windows Remote Control 重启后未恢复（#100114）；OpenClaw Windows 向导健康检查超时（#196251，P0） |
| **配额、计费与 Token 透明度** | Claude Code、OpenAI Codex、OpenCode | Claude Code #97074（Headless Token 消耗 1.8×）、#86879（禁用 agent_summary Spinner 节省 Token）；Codex #41220（配额异常跟踪器，84 评论）；OpenCode #59387（免费层问题汇总，339 评论） |
| **MCP/插件生态稳定性** | Claude Code、Gemini CLI、OpenCode、Hermes | Claude Code #106822/#106708（MCP 命令诊断与 IPC 不可用）；Gemini CLI #22267（浏览器代理忽略 settings.json）；OpenCode #62441（Node 26 兼容性）、#62973（失败服务器不可见）；Hermes 插件目录持续扩展（besthumanizer、skill-hint 等） |
| **安全分类器误报与会话污染** | Claude Code、Gemini CLI | Claude Code #63751（AUP 误报污染整个会话）；Gemini CLI #30206（阻止项目 Git 环境变量注入，安全边界） |
| **后台/守护进程会话可靠性** | Claude Code、OpenClaw | Claude Code #65051（后台会话丢失文本块）；OpenClaw #157255（Turn claim 未释放导致会话永久卡死） |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 长上下文模型（Fable 5.2，1M 窗口）、远程控制、多账号桌面端 | 重度 Claude 生态用户、需要长代码上下文的开发者 | 基于 Anthropic 自有模型，强调 Fable 模型迭代与 `claude remote-control` 远程会话 |
| **OpenAI Codex** | Windows/macOS 桌面端、VS Code 扩展集成、云托管聊天恢复 | OpenAI 订阅用户、跨平台桌面客户端依赖者 | Rust 端预发布迭代快，侧重 WebSocket 实时交互与本地 API 启动 |
| **Gemini CLI** | Subagent 多代理协作、浏览器代理、AST 感知型工具 | Google 生态开发者、多代理任务编排需求者 | 侧重子代理（Subagent）稳定性、工具调用超时控制与跨平台（Wayland/Windows/macOS）兼容 |
| **DeepSeek Reasonix** | Studio 桌面 UI、CPU 资源控制、API 限流（429）降级 | DeepSeek 模型用户、中文社区开发者 | Electron 桌面壳，侧重 UI/UX 回归修复与后台任务生命周期管理 |
| **OpenCode** | 免费层配额、ACP 内部服务器、MCP SDK、TUI 剪贴板 | 成本敏感型开发者、受限网络/沙箱环境部署者 | 强调免费层透明度、ACP 固定端口/无 TCP 端口选项，MCP Skills 扩展（SEP-2640） |
| **Hermes** | 多租户网关、Telegram/Discord 适配器、插件目录 | 多机器人/多平台运营者、社区插件贡献者 | 网关架构为核心，侧重消息隔离、会话状态迁移与跨平台适配器可靠性 |
| **OpenClaw** | Windows 原生安装、浏览器自动化、会话内存索引 | 企业级浏览器代理用户、后台自动化任务运营者 | 侧重端到端浏览器控制、会话转录压缩与内存 OOM 治理，P0 级安装阻塞器突出 |

## 5. 社区热度与成熟度

- **最活跃社区**：OpenCode（#59387 免费层问题 339 评论，社区情绪强烈）、Claude Code（#18435 多账号 1,025 👍，社区功能需求集中）、Gemini CLI（单日 49 Issues / 44 PR，全量活跃度最高）。
- **快速迭代阶段**：OpenAI Codex（连续发布 3 个 Alpha 预发布 + 多个 0.167.0 热修复回 port）、Claude Code（v2.1.321 刚引入新默认模型）、DeepSeek Reasonix（v2.58.1 快速修复 v2.58.0 UI 回归）。
- **稳定/低活跃阶段**：DeepSeek Harness（过去 24 小时无活动）、OpenClaw（PR 多但 Release 缺失，侧重修复而非新版本发布）。
- **成熟度差异**：Claude Code 和 OpenAI Codex 在桌面端与模型集成上相对成熟，但仍存在跨平台会话同步和计费透明度缺陷；Gemini CLI 和 OpenCode 社区贡献活跃，但核心稳定性（Subagent 挂起、Compaction 后工具调用失效）仍需打磨；Hermes 和 OpenClaw 更偏向垂直场景（多租户网关、浏览器代理），通用 AI CLI 定位较弱。

## 6. 值得关注的趋势信号

1. **从“单模型对话”转向“多代理编排与工具治理”**  
   Gemini CLI（Subagent 轨迹可见性、工具超时控制）、OpenCode（MCP Skills 扩展、工具搜索 BM25 排名）、Hermes（插件目录本地优先发现）均在构建代理执行的边界与可见性。开发者应关注如何在自主代理与人工干预之间建立可审计的控制层。

2. **成本透明度成为采用门槛**  
   Claude Code（Headless Token 1.8× 异常）、OpenAI Codex（#41220 配额异常）、OpenCode（#59387 免费层争议）均围绕“钱花得不明确”展开高强度讨论。未来具备清晰 Token 计费、预算告警与免费层

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-10）

## 1. 热门 Skills 排行

以下为社区关注度最高、讨论最活跃的 8 个 Skills PR（按列表展示顺序及更新时间综合判断）：

| # | Skill / PR | 功能简述 | 社区讨论热点 | 当前状态 | 链接 |
|---|-----------|---------|------------|---------|------|
| #1245 | **notion-spec-to-implementation** & **quantitative-resume-auditor** | 前者将产品/技术规格拆解为可执行的 Notion 任务与验收标准；后者对简历进行定量审计与评分。 | 新 Skill 类型的扩展方向（企业协作、职业发展），社区关注其对非代码场景的适用性。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| #1742 | **mcp-builder** 兼容性修复 | 适配 `mcp>=2.0.0` 中 `streamable_http_client` 的重命名及自定义 HTTP 头配置方式。 | MCP 协议版本迭代导致现有 Skill 失效，社区高度关注向后兼容性与连接稳定性。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| #1298 | **skill-creator** 触发评估修复 | 隔离触发评估（trigger evals），修复 Windows 下 `select()` 管道失效及运行时失败误判问题。 | Skill 开发者工具链的可靠性问题，特别是跨平台支持与误报/漏报控制。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| #1980 | **webapp-testing** 安全加固 | 移除 `with_server.py` 中 `shell=True` 的子进程调用，消除命令注入风险（CWE-78）。 | 生成式 AI 工具中的供应链安全与沙箱执行，社区对不安全 shell 调用敏感度高。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| #1792 | **docx** 超时处理与输出验证 | LibreOffice 超时时返回错误而非成功，并校验输出 DOCX 是否仍含修订痕迹。 | 文档自动化流程的鲁棒性，社区关注“静默失败”导致的数据质量问题。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| #1771 | **proofcore-contract-auditor** | Web3 智能合约静态分析（Solidity/Rust），并将审计证明锚定至 TON 区块链。 | 社区对区块链/智能合约安全 Skill 的需求，以及加密证明在审计流程中的应用。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| #1703 | **md2video-audio** | 基于 Marp 将 Markdown 转为带真人感语音的专业 MP4 视频。 | 多模态内容生成（文档→视频）的零成本方案，社区关注内容分发自动化。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1703) |
| #525 | **pyxel** 复古游戏开发 | 指导使用 Pyxel 库创建、调试和验证 Python 复古游戏，包含无头运行与帧检查。 | 游戏开发垂直领域 Skill，社区关注娱乐/教育类自动化工具的丰富度。 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区目前最期待的新 Skill 方向与改进方向如下：

1. **组织级技能共享与协作**  
   社区强烈希望在 Claude.ai / Claude Code 内实现 org-wide 技能共享，避免当前“下载 .skill 文件 → 手动上传”的低效流程（Issue #228，17 条评论，8 👍）。

2. **技能信任边界与命名空间安全**  
   社区技能若分发在 `anthropic/` 命名空间下，可能冒充官方技能，导致用户误授予过高权限。社区呼吁建立信任边界与来源验证机制（Issue #492，46 条评论，3 👍，讨论最热）。

3. **技能触发机制与评估可靠性**  
   `run_eval.py` 触发率为 0、并行 worker 下 UUID 交叉匹配导致误报，以及 `claude -p` 不触发技能等问题，反映社区对技能触发逻辑准确性的高度关注（Issue #556、#1352）。

4. **文档与内容类技能增强**  
   文档排版质量控制（Issue #514 关联 PR）、PDF/DOCX/XLSX 文件处理稳定性、死链修复等，显示社区希望 Claude Code 在结构化文档自动化上更可靠。

5. **Agent 治理与推理质量管控**  
   提出“Reasoning Quality Gate Pipeline”（预校准 → 对抗评审 → 交付验证）及“agent-governance”安全模式，体现社区对 AI Agent 输出质量与合规性的更高要求（Issue #1385、#412）。

6. **长上下文与记忆压缩**  
   `compact-memory` 提案旨在用符号化记法减少长期 Agent 状态占用的上下文，反映社区对长运行 Agent 内存管理的关注（Issue #1329）。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，且解决了社区痛点，可能近期落地：

- **#1245 notion-spec-to-implementation & quantitative-resume-auditor**  
  更新至 2026-10-15，活跃度高，涉及企业知识管理与简历审计两个实用场景，合并后将丰富非代码类技能库。  
  [查看 PR](https://github.com/anthropics/skills/pull/1245)

- **#1742 mcp-builder MCP 2.0 兼容性修复**  
  更新至 2026-10-08，直接修复 MCP 协议大版本带来的破坏性变更，对依赖 MCP 连接的技能至关重要，合并优先级高。  
  [查看 PR](https://github.com/anthropics/skills/pull/1742)

- **#1980 webapp-testing shell 注入修复**  
  更新至 2026-11-01，涉及 CWE-78 安全漏洞，属于高优先级安全补丁，极大概率近期合并。  
  [查看 PR](https://github.com/anthropics/skills/pull/1980)

- **#1792 docx LibreOffice 超时与输出验证**  
  更新至 2026-11-01，解决文档自动化中的“静默失败”问题，提升 docx 技能可用性。  
  [查看 PR](https://github.com/anthropics/skills/pull/1792)

- **#1298 skill-creator 触发评估与 Windows 兼容性**  
  更新至 2026-09-16，修复跨平台评估失效，直接影响社区自建技能的质量，合并后将降低技能创建门槛。  
  [查看 PR](https://github.com/anthropics/skills/pull/1298)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在扩展垂直领域能力（如 Web3 审计、文档自动化、多模态生成）的同时，亟需解决技能触发可靠性、跨平台兼容性、命名空间信任边界及组织级共享等基础设施问题，以构建安全、可信、可规模化的 Claude Code 技能生态。**

---

# Claude Code 社区动态日报 (2026-11-10)

## 今日速览

Claude Code 发布 v2.1.321，正式引入 **Claude Fable 5.2** 作为默认 Fable 模型（1M 上下文窗口），并为 `claude remote-control` 新增 `--settings <file>` 参数以支持会话级配置。社区围绕 **多账号管理**、**Headless 模式 Token 消耗异常** 及 **Fable 5 中途文本块丢失** 等问题展开激烈讨论，多账号切换需求（#18435）成为今日最高热度议题。

---

## 版本发布

### v2.1.321

- **新增 Claude Fable 5.2 (`claude-fable-5-2`)**，现为默认 Fable 模型，提供 1M 上下文窗口，定价为输入 $8/百万 Token、输出 $40/百万 Token，缓存读取 $0.20/百万 Token。
- **`claude remote-control` 新增 `--settings <file>` 参数**：将指定设置文件应用于其启动的每个会话；若文件发生变更，将不启动新会话（具体行为以完整发布说明为准）。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 核心指标 | 为什么重要 | 链接 |
|---|------|---------|-----------|------|
| #18435 | [FEATURE] Claude Desktop 支持多账号管理与轻松切换 | 237 评论 / 1,025 👍 | 社区最高热度议题，用户希望在桌面端统一管理多个 Claude 账号并一键切换，涉及认证、IDE 和桌面端多个维度。 | https://github.com/anthropics/claude-code/issues/18435 |
| #97074 | [BUG] Headless `claude -p` Token 消耗约为交互式 CLI 的 1.8× | 73 评论 / 159 👍 | 直接影响成本与自动化场景可用性，Linux 平台下入口点为 `sdk-cli`，社区怀疑存在计费或上下文处理差异。 | https://github.com/claude-code/issues/97074 |
| #74558 | [BUG] Fable 5 中途助手文本块间歇性被投递为总结式思考块 | 27 评论 / 20 👍 | 导致对话出现“静默”回合，在 Linux (WSL2) 及 API 订阅场景下复现，影响 Fable 模型的可用性与转录完整性。 | https://github.com/claude-code/issues/74558 |
| #89673 | [FEATURE] 桌面端聚合输入框：Enter 换行，Ctrl+Enter 提交 | 23 评论 / 95 👍 | 长期存在的键盘交互痛点，目前仅支持 Shift+Enter 换行，用户希望与常见编辑器/聊天客户端保持一致。 | https://github.com/claude-code/issues/89673 |
| #87971 | [BUG] Auto Mode 下 Claude 滥用 Bash 工具进行读写编辑 | 19 评论 / 99 👍 | Windows + VS Code 场景下，模型在自动模式中过度依赖 Bash 执行文件操作，可能触发自动分类器拦截并降低效率。 | https://github.com/claude-code/issues/87971 |
| #65051 | [BUG] 后台守护进程会话在混合文本+工具调用响应时丢失助手文本块 | 18 评论 / 13 👍 | 2.1.160 → 2.1.161 引入的回归问题，Ubuntu 24.04 上可复现，影响后台任务的可审计性与断点续传。 | https://github.com/claude-code/issues/65051 |
| #63751 | [BUG] AUP/网络安全防护误报导致整个会话被“污染” | 18 评论 / 11 👍 | 合法的软件加固请求被误判为安全违规，一次误报即污染整个会话，macOS 平台下影响开发者正常编码。 | https://github.com/claude-code/issues/63751 |
| #86879 | [FEATURE] 提供支持的方式禁用 `agent_summary` Spinner（已关闭） | 15 评论 / 121 👍 | 子代理密集型会话中 Spinner 占用约 22.7% 请求和 18% 加权 Token，社区强烈希望通过环境变量或 settings 关闭。 | https://github.com/claude-code/issues/86879 |
| #100114 | [BUG] Windows 桌面端 Remote Control 在应用重启后未恢复 | 9 评论 / 5 👍 | 会话在移动端显示为“已归档”，反映跨平台会话状态同步存在缺陷，影响远程开发工作流。 | https://github.com/claude-code/issues/100114 |
| #90188 | [FEATURE] 在单台机器上查看我拥有的所有 Claude 账号的会话 | 5 评论 / 2 👍 | 与 #18435 相关，用户在一台机器上运行多个账号，希望桌面端统一聚合会话列表。 | https://github.com/claude-code/issues/90188 |

---

## 重要 PR 进展

过去 24 小时内仅有 **1 条** 更新的 Pull Request：

### #89404 — validate-agent.sh：不在首个警告时中止，停止误报有效代理
- **作者**: @bcherny
- **状态**: Open（创建于 2026-08-25，更新于 2026-11-09）
- **内容**: 修复 `plugin-dev` 技能的 `validate-agent.sh` 在校验自身代理文件时误报的问题。根因均与 `set -euo pipefail` 交互有关：1) `((warning_count++))` / `((error_count++))` 在表达式结果为 0 时导致提前中止；2) 存在误报有效代理的情况。
- **关联**: 修复公开 Issue #83803。
- 链接: https://github.com/anthropics/claude-code/pull/89404

> *注：社区今日 PR 活动较少，绝大多数讨论集中在 Issue 层面的缺陷跟踪与功能需求上。*

---

## 功能需求趋势

从近 24 小时更新的 Issues 中，可提炼出以下社区关注方向：

1. **多账号与多会话管理**  
   #18435（多账号切换）与 #90188（跨账号会话聚合）反映出开发者在单机多账号、多项目并行场景下对统一入口的强烈需求。

2. **桌面端交互体验优化**  
   #89673（Enter/Ctrl+Enter 绑定）、#107819（侧边栏显示会话活跃状态）、#106717（用量环显示上下文窗口占比）均指向桌面 App 代码标签页（Code Tab）的可用性提升。

3. **MCP 与插件生态稳定性**  
   #106822（动态/插件服务器缺失命令诊断错误）、#106708（桌面端 Code Tab 中 MCP App 工具调用 IPC 不可用）、#107433（并发会话的共享 MCP 服务器与内存预算）显示 MCP 基础设施正成为性能与可靠性瓶颈。

4. **模型行为与安全分类器**  
   #74558（Fable 5 文本块丢失）、#63751（安全防护误报污染会话）、#107724（安全分类器中断 benign 回复）、#108651（误报 reasoning_extraction 错误）表明模型输出管道与安全层仍需打磨。

5. **成本与 Token 可见性**  
   #97074（Headless 模式 Token 消耗异常）、#86879（禁用 agent_summary Spinner 以节省 Token）体现用户对 Token 计费透明度与控制力的关注。

---

## 开发者关注点（痛点与高频需求）

- **多账号/多会话切换缺失**：开发者在一台机器上维护多个 Claude 账号时，缺乏原生的账号切换与会话聚合能力，不得不依赖手动登出/登录或第三方方案。
- **Headless/自动化模式成本不可控**：`claude -p` 在非交互模式下的 Token 消耗显著高于交互式 CLI，影响 CI/CD 和脚本化工作流的经济性。
- **Fable 系列模型稳定性**：中途文本块被错误投递为思考块、嵌套 `AGENTS.md` 未按预期加载等问题，影响长上下文和复杂工程场景的可用性。
- **安全分类器误报与会话污染**：一次误报即导致整个会话受影响，开发者希望有更细粒度的安全策略控制或误报申诉机制。
- **后台/守护进程会话可靠性**：后台会话在混合文本与工具调用时丢失内容，且远程控制在应用重启后状态不同步，影响长时间运行的自动化任务。
- **桌面端键盘与 UI 细节**：缺乏 Enter 换行/提交自定义、侧边栏缺少会话实时状态、Bash 工具输出未渲染等基础交互问题仍未解决。

---

*数据来源：github.com/anthropics/claude-code（Releases、Issues、Pull Requests，截至 2026-11-10）*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-10  
**数据来源**: github.com/openai/codex  

---

## 1. 今日速览

Codex 社区今日围绕 **Windows 桌面端稳定性**、**配额与计费记账** 以及 **CLI 0.167.0 系列热修复** 展开密集讨论。Windows 平台出现多起本地项目丢失、云聊天恢复失败及 API 启动被策略拦截的问题；与此同时，#41220 配额异常跟踪器持续成为评论量最大的社区议题。Rust 端发布了 0.169.0-alpha.7/6 及 0.167.0-alpha.4.1 三个预发布版本，并伴随多个针对 0.167.0 的热修复 PR。

---

## 2. 版本发布

过去 24 小时内发布以下 Rust 预发布版本（具体变更细节未在发布说明中详述）：

| 版本 | 标签 | 链接 |
|------|------|------|
| rust-v0.169.0-alpha.7 | 0.169.0-alpha.7 | [Release 链接](https://github.com/openai/codex/releases/tag/rust-v0.169.0-alpha.7) |
| rust-v0.169.0-alpha.6 | 0.169.0-alpha.6 | [Release 链接](https://github.com/openai/codex/releases/tag/rust-v0.169.0-alpha.6) |
| rust-v0.167.0-alpha.4.1 | 0.167.0-alpha.4.1 | [Release 链接](https://github.com/openai/codex/releases/tag/rust-v0.167.0-alpha.4.1) |

> 注：以上均为 Alpha 预发布版本，建议生产环境谨慎升级。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #41220 | [Meta] Abnormal Codex usage/quota depletion and usage-accounting inconsistencies | 用户反馈订阅配额或购买积分消耗速度异常，与本地/Token 证据不符，出现突发性扣费。 | 评论 84 / 👍 21，社区关注度最高的计费类跟踪器 | [查看](https://github.com/openai/codex/issues/41220) |
| #42739 | Bug report: Local projects disappear from sidebar after Windows desktop update | Windows 桌面端更新后，Projects 区域显示“No projects”，源文件仍在磁盘上，仅 Recents 可见。 | 评论 84 / 👍 9，Windows 桌面用户高度关注 | [查看](https://github.com/openai/codex/issues/42739) |
| #59855 | Windows Codex Desktop can fail to resume cloud-managed chats with AbsolutePathBuf error | Windows 桌面端从侧边栏打开云托管聊天时报错 `AbsolutePathBuf deserialized without a base path`，导致无法恢复会话。 | 评论 19，11-10 更新，较新的桌面端阻塞问题 | [查看](https://github.com/openai/codex/issues/59855) |
| #41779 | Codex Windows: local API launch rejected with "blocked by policy" | Windows 桌面端通过 `exec_command` 启动本地开发 API 时被策略拦截，进程未启动且无日志。 | 评论 19，涉及 Windows 安全策略与本地工具链集成 | [查看](https://github.com/openai/codex/issues/41779) |
| #56682 | [BUG] Codex VS Code Extension Fails to Initialize UI Even in an Isolated Profile | VS Code 扩展（26.1021.22027）在隔离配置文件下仍无法初始化 UI。 | 评论 14 / 👍 5，IDE 集成稳定性问题 | [查看](https://github.com/openai/codex/issues/56682) |
| #58337 | Windows desktop: severe typing stutter in long dot conversation | Windows 桌面端在长对话（dot conversation）中出现严重输入卡顿，Web 端和新对话正常。 | 评论 12，性能回归疑似与会话历史长度相关 | [查看](https://github.com/openai/codex/issues/58337) |
| #50072 | macOS 0.157+: headless/non-login users fail on CFPreferencesAppSynchronize | macOS 非登录/headless 用户在 Codex CLI 0.157+ 上因 `CFPreferencesAppSynchronize` 失败导致异常。 | 评论 12，macOS 终端/SSH 场景受影响 | [查看](https://github.com/openai/codex/issues/50072) |
| #58060 | Existing session retains dead codex_tui loopback endpoint while fresh sessions work (0.165.0) | Linux 上 0.165.0 长时间运行的会话会重复调用已失效的 `codex_tui` 回环端点，新会话正常。 | 评论 8，11-10 更新，MCP/CLI 会话生命周期缺陷 | [查看](https://github.com/openai/codex/issues/58060) |
| #38638 | Responses WebSocket stalls 300s per retry; opt-out flag removed | `wss://chatgpt.com/backend-api/codex/responses` 中途静默，HTTPS 回退需经历 5 次失败重试，每次 300s。 | 评论 8 / 👍 2，影响实时交互体验 | [查看](https://github.com/openai/codex/issues/38638) |
| #60364 | Desktop app: switching ChatGPT accounts wipes local sidebar organization | 切换 ChatGPT 账号后，本地侧边栏组织（自定义分区、项目、线程分配）被擦除，无迁移路径。 | 评论 2，11-09 新增，账号切换数据丢失风险 | [查看](https://github.com/openai/codex/issues/60364) |

---

## 4. 重要 PR 进展（精选 10 条）

今日合并/更新的 PR 多为自动化机器人（`copyberry[bot]`）提交的稳定性与安全性修复，以及针对 0.167.0 的热修复回 port：

| # | 标题 | 功能/修复说明 | 状态 | 链接 |
|---|------|--------------|------|------|
| #60457 | [Hotfix] Backport legacy incremental tools to 0.167.0-alpha.4 | 将 #59832 和 #60040 回 port 至 0.167.0-alpha.4，用于 Desktop 热修复；新增默认关闭的 `incremental_tools_legacy` 特性，支持 Amazon Bedrock 原生提供商的常规 Responses 工具更新、压缩和恢复。 | OPEN | [查看](https://github.com/openai/codex/pull/60457) |
| #60456 | [Hotfix] Backport legacy incremental tools to 0.167.0-alpha.3.2 | 将增量工具特性回 port 至 0.167.0-alpha.3.2，使 Desktop 可为原生 Mantle 和 Bedrock Runtime 会话启用增量工具声明。 | OPEN | [查看](https://github.com/openai/codex/pull/60456) |
| #60466 | Keep thread storage available when diagnostic logs failed | 诊断日志数据库打开失败不应禁用线程存储或仅数据库的历史记录列表；线程删除在诊断日志清理失败时仍保留对话。 | CLOSED | [查看](https://github.com/openai/codex/pull/60466) |
| #60462 | Route TUI question answers through Cloud message admission | TUI 问题回答通过 Cloud 的 start-or-steer 入场路径提交（若回合正在运行），否则使用 start-if-idle；按会话模式解析提交意图。 | CLOSED | [查看](https://github.com/openai/codex/pull/60462) |
| #60461 | Honor permission grant scopes in executor capability discovery | 已批准的文件系统访问应使执行器技能在授权生命周期内可发现和可读；回合范围访问不得授权持久插件服务器或钩子，也不得绕过禁用插件策略。 | CLOSED | [查看](https://github.com/openai/codex/pull/60461) |
| #60455 | Prefer native clipboard images on macOS and honor image orientation | macOS 剪贴板读取优先使用原生 PNG/JPEG 而非 TIFF，避免产生大体积 TIFF；粘贴的图像文件在插入前应用方向元数据。 | CLOSED | [查看](https://github.com/openai/codex/pull/60455) |
| #60454 | Update OpenSSL Rust dependencies | 将 `openssl` 从 0.10.75 升级至 0.10.82，`openssl-sys` 从 0.9.111 升级至 0.9.118。 | CLOSED | [查看](https://github.com/openai/codex/pull/60454) |
| #60443 | Support cancellation and deadlines for realtime attachments | 为实时附件添加取消和截止时间，避免挂起的握手阻塞后续附件请求。 | CLOSED | [查看](https://github.com/openai/codex/pull/60443) |
| #60436 | Revalidate request auth ownership after budget checks | 在预算检查后重新验证请求身份所有权；若账号在异步设置期间变更，重启 HTTP 请求设置并验证 WebSocket 凭据。 | CLOSED | [查看](https://github.com/openai/codex/pull/60436) |
| #60432 | Upgrade bundled SQLite to 3.54 for WAL fixes | 将 `libsqlite3-sys` 升级至 0.39.1，要求 SQLite 3.54+，修复 WAL 打开时的 `RUSTSEC-2026-0459` 漏洞。 | CLOSED | [查看](https://github.com/openai/codex/pull/60432) |

---

## 5. 功能需求趋势

从近期 Issues 中可观察到社区关注的功能方向呈现以下趋势：

1. **跨平台桌面端稳定性（Windows/macOS）**  
   大量 Issue 集中在 Windows 桌面端（项目侧边栏丢失、云聊天恢复失败、输入卡顿、本地 API 被策略拦截）以及 macOS headless 场景，说明桌面客户端的跨平台一致性是当前最大的产品缺口。

2. **配额、计费与资源治理**  
   #41220 的高评论量反映用户对 API/订阅配额透明度和记账准确性的强烈需求；#55990 提出的“原生资

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-10)

## 今日速览

今日 Gemini CLI 社区活跃度保持高位，共 49 个 Issue 和 44 个 PR 在过去 24 小时内更新。核心关注点集中在 **Subagent 稳定性**（如 MAX_TURNS 恢复、通用代理卡死）、**浏览器代理兼容性**（Wayland、配置覆盖失效）以及 **工具调用安全与性能**（超时控制、输出截断、子进程清理）。暂无新版本发布。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 评论/👍 | 优先级 | 关注理由 |
|---|------|---------|--------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURN is reported as GOAL success | 13 / 2 | P1 / Bug | 子代理在达到最大轮次后仍错误上报 `status: "success"`，掩盖中断，直接影响任务可靠性，亟需修复。 |
| [#21409](https://github.com/github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | 8 / 8 | P1 / Bug | 通用代理在处理简单操作（如创建文件夹）时无限挂起，社区关注度高（8👍），需排查代理切换逻辑。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | 9 / 1 | P2 / Enhancement | 探索利用模型原生 Bash 能力进行代码库探索，属于架构方向增强，讨论较为深入。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | 7 / 1 | P2 / Feature | 评估 AST 感知型文件读取/搜索对减少 Token 耗和提升精度的价值，涉及核心工具链优化。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | 7 / 0 | P2 / Bug | 用户反馈模型主动调用自定义技能和子代理的意愿不足，影响可扩展性体验。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides | 5 / 0 | P2 / Bug | 浏览器代理未遵循全局/项目级 `settings.json` 中的 `maxTurns` 等配置，导致配置失效。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | 4 / 1 | P1 / Bug | 浏览器子代理在 Wayland 环境下失效，影响 Linux 桌面用户的可用性。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done output hook causes crash | 3 / 0 | P1 / Bug | 输出钩子在打印用户摘要时导致 CLI 崩溃，属于稳定性回归问题。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | Gemini CLI encounters 400 error with > 128 tools | 3 / 0 | P2 / Bug | 工具数量超过阈值时触发 400 错误，需优化工具作用域限制，避免上下文溢出。 |
| [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) | Feat: Subagent trajectory should be visible via `/chat share` | 2 / 1 | P3 / Feature | 社区希望通过 `/chat share` 查看和共享子代理轨迹，便于评估和调试多代理行为。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#30214](https://github.com/google-gemini/gemini-cli/pull/30214) | fix(core): recognize TortoiseGitPlink as PuTTY-family SSH client | OPEN | 在 `getSafeGitEnv()` 中识别 `TortoiseGitPlink.exe` 为 PuTTY 家族可执行文件，插入 `-batch` 而非 OpenSSH 的 `-o BatchMode=yes`，修复 Windows Git 交互问题。 |
| [#30211](https://github.com/google-gemini/gemini-cli/pull/30211) | fix(core): ensure read-many-files only inlines explicitly requested binary assets | CLOSED | 修复 `read-many-files` 因广泛目录 glob 匹配而错误将二进制资源（图片/PDF/音频）内联为 Base64 载荷的问题。 |
| [#30189](https://github.com/google-gemini/gemini-cli/pull/30189) | fix(core): reject MessageBus.request() immediately when publish fails | CLOSED | 发布失败时立即拒绝请求，释放定时器和响应监听器，避免等待完整 60 秒超时后才返回泛型超时错误。 |
| [#30185](https://github.com/google-gemini/gemini-cli/pull/30185) | fix(cli): prevent recursive interactive gemini sessions in shell mode | CLOSED | 防止在 Shell Mode（`!`）和 `[Shell]` 工具中递归启动交互式 `gemini` 会话，拒绝不支持的 CLI 配置子命令。 |
| [#30212](https://github.com/google-gemini/gemini-cli/pull/30212) | feat(core): add configurable per-tool-call timeout (tools.callTimeout) | OPEN | 新增 `tools.callTimeout` 配置（秒，默认 0 禁用），单次工具调用超时后触发 `AbortSignal`，返回可恢复的 `TOOL_CALL_TIMEOUT` 错误。 |
| [#30104](https://github.com/google-gemini/gemini-cli/pull/30104) | fix(cli): refresh slash commands after /skills link | OPEN | 修复 `/skills link <path>` 后斜杠命令未刷新的问题，确保新链接的技能能立即出现在命令列表中。 |
| [#30109](https://github.com/google-gemini/gemini-cli/pull/30109) | fix(core): cap grep_search output size and tell the model to narrow broad searches | OPEN | 限制 `grep_search` 输出大小，避免广泛搜索返回过长日志/压缩行导致上下文膨胀，并提示模型缩小搜索范围。 |
| [#30204](https://github.com/google-gemini/gemini-cli/pull/30204) | fix(cli,core): kill child processes, record cancelled tools, and preserve signal exit code on headless abort | CLOSED | 无交互模式（`-p`）接收信号时，终止子进程组和 PTY，记录已取消的工具，并保留信号退出码。 |
| [#30164](https://github.com/google-gemini/gemini-cli/pull/30164) | fix(cli): resolve folder trust before entering the macOS Seatbelt sandbox | CLOSED | 修复 macOS Seatbelt 沙盒下文件夹信任失败问题，确保信任对话在沙盒启动前正确解析。 |
| [#30206](https://github.com/google-gemini/gemini-cli/pull/30206) | fix: block project Git environment injection | OPEN | 阻止工作区提供的 Git 环境变量通过 `.env` 加载影响内部 Git 和 Shell 操作，修复潜在安全注入风险。 |

---

## 功能需求趋势

从近期 Issue 和 PR 中可提炼出以下社区关注方向：

1. **多代理（Subagent）稳定性与可观测性**  
   子代理恢复机制、任务挂起、技能/子代理主动调用不足、轨迹可见性（`/chat share`）成为高频话题，社区希望多代理协作更可靠、可调试。

2. **工具调用安全与资源控制**  
   出现多个关于工具超时（`tools.callTimeout`）、输出大小限制（`grep_search`）、子进程清理、破坏性命令阻止（`git reset --force`）的需求，反映开发者对代理自主执行边界的管控诉求增强。

3. **跨平台与环境兼容性**  
   Wayland 浏览器代理失效、Windows TortoiseGitPlink 支持、macOS Seatbelt 沙盒信任等问题显示，社区期望 CLI 在不同操作系统和桌面环境下表现一致。

4. **配置与可扩展性**  
   `settings.json` 覆盖失效、技能链接后命令刷新、自定义主题、工作区级策略等需求表明，用户希望更细粒度地配置 CLI 行为并扩展自身工作流。

---

## 开发者关注点

- **稳定性痛点**：通用代理挂起（#21409）、输出钩子崩溃（#22186）、子代理状态上报错误（#22323）是当前最高优先级的 P1 Bug，建议优先排查。
- **配置一致性**：浏览器代理忽略 `settings.json`（#22267）、软链接代理未被识别（#20079）等问题反映配置加载与生效链路存在漏洞。
- **安全边界**：项目级 Git 环境变量注入（#30206）、破坏性 Git 操作阻止（#22672）提示开发者对代理在工作区内执行高风险操作的担忧。
- **上下文管理**：AST 感知型读取/搜索（#22745）、`grep_search` 输出截断（#30109）、工具数量过多导致 400 错误（#24246）均指向上下文膨胀和 Token 效率优化的需求。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报
**日期**: 2026-11-10  
**来源**: github.com/esengine/DeepSeek-Reasonix

---

## 1. 今日速览

Reasonix 昨日发布 **v2.58.1 修复版本**，集中解决了 Studio 2.58.0 引入的多项 UI 回归问题（设置页错位、模型菜单折行、思考展开限高等）及 Windows 启动闪控制台、CLI `mcp --help` 误执行等 Bug。桌面壳 Electron 同步升至 45.2.3（Chromium 156）。社区方面，围绕新版界面交互、任务 CPU 异常占用及 429 限流后的模型切换失效展开了广泛讨论。

---

## 2. 版本发布

### Reasonix Studio v2.58.1 / CLI v2.58.1
本版本为修复发布，主要变更如下：

- **UI 修复**：修复设置页版面错位、会话行置顶按钮常驻、模型菜单标签折行、思考「展开」被限高等问题。
- **平台修复**：修复 Windows 启动时闪现控制台窗口；修复命令行 `mcp --help` 被误当作位置参数执行导致配置重写与明文凭据写入；修复 Linux 终端选择逻辑，现尊重用户默认终端（如 Kitty），而非固定优先 Konsole。
- **底层升级**：桌面壳 Electron 升至 45.2.3（Chromium 156），包含上游安全与稳定性修复。关联 [#15027](https://github.com/esengine/DeepSeek-Reasonix/issues/15027)。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论 | 关注理由 |
|---|------|------|------|----------|
| [#15024](https://github.com/esengine/DeepSeek-Reasonix/issues/15024) | 最新版本界面改动不友好，操作步骤增加 | OPEN | 11 | 社区对 v2.58.0 新 UI 的普遍不满，反映导航与操作便捷性下降，是当前最高热度反馈。 |
| [#14125](https://github.com/esengine/DeepSeek-Reasonix/issues/14125) | 卸载重装后历史反馈记录丢失 | OPEN | 9 | 涉及用户反馈数据持久化与本地存储策略，影响长期用户的问题追踪体验。 |
| [#15020](https://github.com/esengine/DeepSeek-Reasonix/issues/15020) | 等待回包时间显著变长 | OPEN | 4 | 性能回归疑似，用户对比前两个版本，指向推理或网络层延迟增加。 |
| [#15052](https://github.com/esengine/DeepSeek-Reasonix/issues/15052) | 会话界面右侧出现随滚动条移动的方形阴影块 | OPEN | 4 | 明显的前端渲染 Bug，影响视觉体验，需确认是否为新版 CSS 回归。 |
| [#15058](https://github.com/esengine/DeepSeek-Reasonix/issues/15058) | 运行任务时 CPU 疯狂占用，不如 2.57.0 稳定 | OPEN | 1 | 性能严重问题，用户明确对比旧版本，疑似后台轮询或事件监听未释放。 |
| [#15060](https://github.com/esengine/DeepSeek-Reasonix/issues/15060) | 任务已停止，CPU 仍居高不下 | OPEN | 1 | 与 #15058 同类，表明任务停止后清理逻辑存在缺陷，可能导致设备发热。 |
| [#15069](https://github.com/esengine/DeepSeek-Reasonix/issues/15069) | 触发 429 后模型切换变灰不可用，重启无效 | OPEN | 0 | API 限流后的降级体验差，用户无法手动切换模型，需优化错误恢复机制。 |
| [#15068](https://github.com/esengine/DeepSeek-Reasonix/issues/15068) | 429 后无法停止重试，必须等待 10 次重试完成 | OPEN | 0 | 限流场景下缺乏中断控制，阻塞用户操作，属高优先级交互缺陷。 |
| [#15067](https://github.com/esengine/DeepSeek-Reasonix/issues/15067) | Windows 下 `pnpm install` 因依赖包含冒号文件名失败 | OPEN | 1 | 开发者体验问题，影响从源码构建 desktop/frontend-next，需兼容 Windows 文件系统限制。 |
| [#15071](https://github.com/esengine/DeepSeek-Reasonix/issues/15071) | Homebrew Cask 在 Homebrew 7.0.13 上不可读 | OPEN | 0 | macOS 安装渠道受阻，`staged_path` 未定义导致 `brew install` 失败，需更新 Cask 脚本。 |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#15066](https://github.com/esengine/DeepSeek-Reasonix/pull/15066) | fix: enable cross-project dispatch and retain runtime bindings | CLOSED | 默认启用会话消息与跨项目分发，保留用户显式退出选择；修复会话切换模型或重载扩展时的分发、项目打开与配对回复问题。 |
| [#15063](https://github.com/esengine/DeepSeek-Reasonix/pull/15063) | fix(studio): replace character icons with semantic Lucide icons | CLOSED | 统一 Studio 图标实现，替换字体字符、提供商首字母及手绘 SVG，改用 Lucide 语义化图标，修复几何与含义不一致问题。 |
| [#15057](https://github.com/esengine/DeepSeek-Reasonix/pull/15057) | fix(studio): settle thinking clocks at response boundaries | CLOSED | 修复助手回复被工具事件或通知拆分为多个卡片时，思考时钟未正确结算的问题；解决部分工具分发导致思考状态持续运行的 Bug。 |
| [#15054](https://github.com/esengine/DeepSeek-Reasonix/pull/15054] | fix(studio): size provider fields to their available space | CLOSED | 提供商设置字段自适应可用空间，完整显示百万级 Token 数值与继承提示；货币、价格输入与计费选择对齐尺寸，订阅选择使用紧凑标签。 |
| [#15050](https://github.com/esengine/DeepSeek-Reasonix/pull/15050] | fix(studio): expand settings and clarify navigation controls | CLOSED | 设置页填满应用窗口：固定 240px 导航栏、24px 内容间距、全宽卡片单列；分类编辑器保持展开，药丸导航滚动不重新挂载；侧边栏底部新增标注的 Settings 与 Feedback 入口。 |
| [#15040](https://github.com/esengine/DeepSeek-Reasonix/pull/15040] | fix(studio): improve model layout and merge duplicate file entry | CLOSED | 模型名称独立成行，避免协议、图片徽章与连接状态争抢单行空间；工作台启动器合并重复的文件资源管理器入口。 |
| [#14930](https://github.com/esengine/DeepSeek-Reasonix/pull/14930] | documentation: Update acknowledgments contributors | OPEN | 从 GitHub Contributors API 刷新 README 致谢贡献者表，排除机器人、工具身份及无 GitHub 登录的条目。 |

---

## 5. 功能需求趋势

从近 24 小时 Issues 中提炼，社区最关注的功能方向如下：

1. **UI/UX 回归与简化**  
   用户普遍反映 v2.58 版本界面操作步骤增加（#15024、#15053、#15037），希望恢复更直观的分类设置、一键收起/展开及更紧凑的导航，减少重复点击。

2. **性能与资源控制**  
   任务运行及停止后 CPU 异常占用（#15058、#15060）成为高频痛点；回包延迟增加（#15020）也引发性能回归担忧。社区期望更稳定的资源调度与更快的响应。

3. **API 限流（429）降级体验**  
   多条反馈指向 429 后模型切换失效、无法中断重试（#15068、#15069），用户需要更友好的限流提示、手动切换模型及停止重试的能力。

4. **跨平台构建与安装体验**  
   Windows 源码构建受冒号文件名限制（#15067），macOS Homebrew Cask 失效（#15071），开发者与最终用户都希望安装/构建流程更顺畅。

5. **即时通讯集成（长尾需求）**  
   有用户提出希望与 QQ/微信打通，实现离机时 AI 继续工作（#15056），反映对异步协作与通知机制的潜在需求。

---

## 6. 开发者关注点

- **UI 回归测试不足**：v2.58.0 引入的多个界面错位、按钮常驻、标签折行等问题在 v2.58.1 中集中修复，说明新版本前端变更缺乏足够的回归覆盖。
- **CLI 安全隐患**：`mcp --help` 被误执行导致配置重写与明文凭据写入（#15022），提示 CLI 参数解析层需要更严格的命令与标志区分。
- **后台任务生命周期管理**：任务停止后 CPU 未释放（#15060），以及思考时钟未随响应边界结算（#15057），均指向异步任务与定时器清理逻辑的薄弱环节。
- **跨平台一致性**：Linux 终端选择、Windows 控制台闪现、macOS Homebrew 安装等平台特定问题频发，需加强多平台 CI 验证。
- **反馈数据持久化**：卸载重装后历史反馈丢失（#14125），提示本地反馈存储应与用户账户或云端关联，而非仅依赖本地安装状态。

---

*本日报基于

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-10)

## 今日速览

OpenCode 社区今日围绕免费层（Free Tier）使用限制与 MCP 服务器稳定性展开广泛讨论，免费配额问题已成为社区最高优先级的反馈集中点。与此同时，开发者持续提交桌面端 UI 修复、MCP SDK 升级及核心传输协议优化等 PR，整体活跃度保持在较高水平。

## 版本发布

过去 24 小时内无新版本发布。

## 社区热点 Issues

以下 10 个 Issue 今日更新最为频繁或社区关注度最高：

| # | 标题 | 状态 | 关注理由 | 链接 |
|---|------|------|----------|------|
| #59387 | [zen] Free tier issues: read this first, then post your report here | OPEN | 免费层问题的主汇总贴，已有 **339 条评论** 和 27 个赞，涉及“免费用量已超标”“重置不生效”“桌面版不再可用”等多种报错，是当前社区最活跃的反馈入口。 | https://github.com/anomalyco/opencode/issues/59387 |
| #50814 | compaction: model emits tool calls as literal text after compaction | OPEN | 自动压缩（compaction）后模型将工具调用输出为普通文本而非结构化调用，导致工具不再被分发、会话无输出，属于严重的核心功能回归 Bug。 | https://github.com/anomalyco/opencode/issues/50814 |
| #62783 | [pending close, triaging] time free plan | CLOSED | 用户询问免费模型配额的重置时间（是否为 5 小时），反映社区对免费计划规则缺乏透明度的困惑。 | https://github.com/anomalyco/opencode/issues/62783 |
| #62441 | mcp: notebooklm-mcp@latest fails to start on Node 26 | CLOSED | MCP 服务器在 Node.js 26 上因依赖解析失败（`ERR_MODULE_NOT_FOUND: hono/ws`）无法启动，暴露了新版 Node 运行时的兼容性风险。 | https://github.com/anomalyco/opencode/issues/62441 |
| #62987 | Integrar OpenUI para mejorar la experiencia con las respuestas de IA | OPEN | 西班牙语社区提出集成 OpenUI（openui.dev）作为 AI 响应渲染层，以提升前端交互体验，体现社区对 UI 可扩展性的需求。 | https://github.com/anomalyco/opencode/issues/62987 |
| #62986 | [FEATURE]: acp: let the internal server use a fixed port, or no TCP port at all | OPEN | 在 OS 沙箱环境下运行 `opencode acp` 时，用户希望内部服务器能使用固定端口或完全禁用 TCP 端口，涉及受限环境下的部署需求。 | https://github.com/anomalyco/opencode/issues/62986 |
| #62981 | [reproduced] desktop: size the variant flyout from the label, not a fixed 160px | OPEN | 桌面端模型选择器的变体飞出层宽度固定为 160px，导致长标签显示异常，已有明确复现路径和代码定位。 | https://github.com/anomalyco/opencode/issues/62981 |
| #44760 | [FEATURE]: `opencode join` — hub-managed node fleet with centralized session discovery | CLOSED | 用户提出构建跨平台（Windows + WSL、macOS、Linux、VPS）的节点集群与集中式会话发现机制，反映企业级多机部署需求。 | https://github.com/anomalyco/opencode/issues/44760 |
| #62973 | mcp: failed servers are indistinguishable from unconfigured ones for the agent | OPEN | 配置失败的 MCP 服务器会从 Agent 工具表中完全消失，缺少错误标记或占位符，导致 Agent 无法感知服务器故障状态。 | https://github.com/anomalyco/opencode/issues/62973 |
| #60055 | fix(tui): report unverified clipboard delivery | OPEN | TUI 在鼠标选中复制后即使剪贴板写入失败也会显示“已复制”，误导用户，需要更可靠的剪贴板投递确认机制。 | https://github.com/anomalyco/opencode/pull/60055 |

## 重要 PR 进展

今日合并或更新的 10 个重要 PR 涵盖核心修复、性能优化与协议升级：

| # | 标题 | 状态 | 主要内容 | 链接 |
|---|------|------|----------|------|
| #62904 | fix(cli): keep managed service ports out of the ephemeral range | OPEN | 修复 `ServiceConfig.defaultPort()` 在 Linux 上未将托管服务端口移出临时端口范围（此前仅在 Windows 生效），解决端口冲突问题。 | https://github.com/anomalyco/opencode/pull/62904 |
| #62963 | feat(desktop): keep browser tools across screen lock | OPEN | 桌面端浏览器工具在屏幕锁定后不再丢失附加，解锁后同会话自动重新注册，提升长时间会话的稳定性。 | https://github.com/anomalyco/opencode/pull/62963 |
| #62985 | chore(perf): bench with strobe 0.27.0 | CLOSED | 将 `@hona/strobe` 基准工具从 0.26.0 升级至 0.27.0，新增 `strobe init` 起始模板，不改变现有测量指标。 | https://github.com/anomalyco/opencode/pull/62985 |
| #62979 | fix(core): send EVREN thinking controls as booleans | OPEN | 修复 EVREN OpenAI 兼容网关的思考控制参数，将其作为顶层布尔值发送，修正参数类型不匹配问题。 | https://github.com/anomalyco/opencode/pull/62979 |
| #62984 | [contributor] feat(codemode): rank tool search with name-weighted BM25 | OPEN | 优化 Code Mode 工具搜索排序，引入名称加权 BM25 算法，降低 `list`、`get` 等常见词的权重，提升检索精准度。 | https://github.com/anomalyco/opencode/pull/62984 |
| #62972 | [contributor] refactor(core): give each warmed session one owned loop | CLOSED | 重构会话预热状态管理，消除 `sessions`/`requesting`/`outlived` 多状态分散导致的循环泄漏问题，每个预热会话拥有一个独立事件循环。 | https://github.com/anomalyco/opencode/pull/62972 |
| #62983 | fix(claude-agent): deliver keyed instruction updates to Claude | OPEN | 修复 Claude Agent 提供商中系统消息未传递给 Claude 的问题，确保带键的指令更新（keyed instruction updates）能正确送达。 | https://github.com/anomalyco/opencode/pull/62983 |
| #62982 | [contributor] chore(core): update MCP SDK to 2.4.0 | OPEN | 将 `@modelcontextprotocol/{client,core,server}` 从 2.3.1 升级至 2.4.0，引入 Skills 扩展（SEP-2640）的客户端与服务端支持。 | https://github.com/anomalyco/opencode/pull/62982 |
| #62974 | fix(core): keep last-good config when a reload reads a partial write | OPEN | 当全局 `opencode.jsonc` 在并发非原子写入（如编辑器自动保存）期间被读取时，保留上一次有效配置，避免配置损坏导致服务异常。 | https://github.com/anomalyco/opencode/pull/62974 |
| #62976 | [contributor] feat(core): speak opencode-pty protocol v8 | OPEN | 三部分堆叠 PR 的第一部分，升级 opencode-pty 协议至 v8，后续将拆分为“Esc 保留 shell 输出”与“进程守护进程中的 shell 命令”两个 PR。 | https://github.com/anomalyco/opencode/pull/62976 |

## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **免费层与配额透明度**：#59387 的高评论量表明用户对免费配额重置规则、订阅提示及桌面版可用性有强烈诉求，社区期望官方给出更清晰的文档与重置机制说明。
2. **MCP 生态稳定性**：#62441（Node 26 兼容性）与 #62973（失败服务器不可见）反映开发者希望 MCP 服务器在异常运行时能保留可见状态，并获得更好的跨运行时兼容性保障。
3. **桌面端 UI 细节打磨**：#62981（模型选择器飞出层宽度）与 #62963（屏幕锁定后浏览器工具保留）显示社区对桌面客户端交互体验的优化需求持续存在。
4. **受限环境部署**：#62986（ACP 固定端口或无 TCP 端口）体现企业/沙箱用户对网络配置灵活性的需求。
5. **工具检索与 Agent 指令精准度**：#62984（BM25 工具搜索）与 #62983（Claude 指令更新）表明社区希望提升工具发现率与系统指令的可靠传递。

## 开发者关注点

- **痛点**：免费层配额重置不透明（#59387、#62783）；Compaction 后工具调用失效导致会话中断（#50814）；MCP 服务器失败时对 Agent 不可见（#62973）；TUI 剪贴板操作缺乏失败反馈（#60055）。
- **高频需求**：更清晰的免费计划文档与配额重置说明；MCP 服务器状态的可观测性增强；桌面端跨会话/跨锁定状态的工具持久化；受限网络环境下的 ACP 部署选项；工具搜索排序与系统指令传递的可靠性提升。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-10)

## 今日速览

Hermes 社区今日活跃度较高，共 19 条 Issue 和 50 条 PR 在过去 24 小时内更新。核心关注点集中在 **多租户网关（Multiplexed Gateway）的稳定性**、**Telegram 适配器可靠性** 以及 **插件目录（Plugin Catalog）的社区扩展**。今日无新版本发布，但多个 P2 级别的网关与会话 Bug 已提交修复 PR，社区正推动 v0.23.0 后续版本的质量提升。

---

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 核心摘要 | 为何重要 | 链接 |
|---|------|------|----------|----------|------|
| #143364 | Multiplexed secondary profile's mid-turn progress + background-review notices deliver via the primary bot | CLOSED | 多机器人复用网关时，子 profile 的中途进度与后台审查通知错误发送至主 profile 的 Telegram 机器人 | 涉及多租户消息隔离，已修复，社区讨论 14 条评论 | [查看](https://github.com/NousResearch/hermes-agent/issues/143364) |
| #140222 | cron: agent jobs with a monitor create an empty session on every unchanged tick | OPEN | 带 monitor 的 cron 代理任务每次 tick 都会在 state.db 中创建空会话，导致数据膨胀 | 影响长期运行实例的数据库健康，P2 级会话层缺陷 | [查看](https://github.com/NousResearch/hermes-agent/issues/140222) |
| #145961 | Gateway event loop blocked on Linux by hosted-room watcher file reads | OPEN | Linux 单宿主网关事件循环被文件读取与线程启动阻塞，导致 Discord 心跳停滞，适配器每小时强制重连约 12 次 | 直接影响跨平台网关稳定性，P2 性能缺陷 | [查看](https://github.com/NousResearch/hermes-agent/issues/145961) |
| #148168 | Legacy sessions.json mirror costs a multi-minute boot | OPEN | 36 个 profile 的长期运行主机因 stale session 行导致启动耗时数分钟，`hermes update` 被迫 SIGKILL 网关 | 生产环境可用性问题，涉及会话状态迁移与启动性能 | [查看](https://github.com/NousResearch/hermes-agent/issues/148168) |
| #150397 | Multiplexed gateway: local terminal backend overwrites routed profile's terminal.cwd | OPEN | 多租户网关中，本地终端后端会将路由 profile 的 `terminal.cwd` 覆盖为进程 cwd | 影响多 profile 终端隔离，P2 级网关 Bug | [查看](https://github.com/NousResearch/hermes-agent/issues/150397) |
| #152217 | memory.write_approval inline approval prompt never fires in v0.23.0 | OPEN | 网关守护进程模式下，内存写入审批的 inline 提示永远不会触发，所有受控写入静默暂存 | 影响安全审计与交互式工作流，v0.23.0 回归问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/152217) |
| #152288 | OpenRouter spend under-reported up to ~3x | OPEN | OpenRouter 消费按模型级价格表计算，而非实际服务端点，导致支出低报最高达 3 倍 | 影响计费准确性与用户成本感知 | [查看](https://github.com/NousResearch/hermes-agent/issues/152288) |
| #152300 | openai-codex image generation reports 'no credentials' | OPEN | 图像生成提供商池选择未限定为图像模型，导致有效 Codex 凭据被误判为无凭据 | 涉及多模态能力与凭据作用域隔离 | [查看](https://github.com/NousResearch/hermes-agent/issues/152300) |
| #152295 | Hermes Agent offers "max" reasoning effort for models that only support "xhigh" | OPEN | 与 llama.cpp 模型交互时，Hermes 提供不支持的 "max" 推理等级，导致服务端返回 400 | 模型能力元数据查询缺失，影响模型兼容性 | [查看](https://github.com/NousResearch/hermes-agent/issues/152295) |
| #92739 | hooks: expose one immutable authenticated origin envelope to pre_llm_call and pre_tool_call | OPEN | 提议为 pre_llm_call / pre_tool_call 钩子暴露不可变的经过身份验证的来源信封 | 社区关注钩子安全性与溯源，P3 需求决策中 | [查看](https://github.com/NousResearch/hermes-agent/issues/92739) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复内容 | 链接 |
|---|------|------|--------------|------|
| #151930 | fix(gateway): a streamed reply that times out after landing is no longer sent twice | OPEN | 修复 Telegram 流式回复在连接断开后重复发送的问题；超时后若请求已发出，仅发送未展示的文本 | [查看](https://github.com/NousResearch/hermes-agent/pull/151930) |
| #152231 | fix(gateway): never start an elevated gateway from an elevated Windows client | OPEN | Windows 下拒绝从提权客户端启动提权网关，避免普通窗口被锁定 | [查看](https://github.com/NousResearch/hermes-agent/pull/152231) |
| #152298 | Desktop: an archived chat can be brought back from the Archived toast's Undo button | OPEN | 桌面端归档 toast 新增 Undo 按钮，一键将聊天恢复至侧边栏 | [查看](https://github.com/NousResearch/hermes-agent/pull/152298) |
| #151833 | fix(telegram): fallback walk fails over inside the send deadline | OPEN | Telegram 网络路径回退走完在发送截止时间内完成，避免静默投递丢失（关联 #136412） | [查看](https://github.com/NousResearch/hermes-agent/pull/151833) |
| #152292 | [ci-reviewed] fix(gateway): a handoff of a session bound to another Telegram topic is refused | OPEN | 会话已绑定其他 Telegram 主题时，拒绝 handoff 而非误报完成 | [查看](https://github.com/NousResearch/hermes-agent/pull/152292) |
| #152301 | fix(image_gen): scope openai-codex pool selection to the image model | OPEN | 将 openai-codex 图像提供商的凭据池选择限定为实际请求的模型（gpt-image-2） | [查看](https://github.com/NousResearch/hermes-agent/pull/152301) |
| #152263 | catalog: add besthumanizer (community, MCP) | OPEN | 插件目录新增 besthumanizer（MCP），提供文本人类概率评分等三个工具 | [查看](https://github.com/NousResearch/hermes-agent/pull/152263) |
| #152297 | plugin-catalog: add skill-hint (local-first BM25 skill discovery) | OPEN | 插件目录新增 skill-hint，基于 BM25 的本地优先技能发现，无需模型调用 | [查看](https://github.com/NousResearch/hermes-agent/pull/152297) |
| #152299 | feat(plugin-catalog): add hermes-jobs | OPEN | 插件目录新增 hermes-jobs，通过 Google Calendar 作为作业看板，与 Hermes cron 共存 | [查看](https://github.com/NousResearch/hermes-agent/pull/152299) |
| #152267 | feat(memory): a memory storage port | OPEN | 新增内存存储端口，以今日 MEMORY.md/USER.md 作为本地后端（堆叠于 #151555 之上） | [查看](https://github.com/NousResearch/hermes-agent/pull/152267) |

---

## 功能需求趋势

从今日 Issues 与 PR 中提炼，社区最关注的功能方向包括：

1. **多租户网关稳定性与隔离**：多个 Issue 指向 multiplexed gateway 下 profile 间的状态泄漏（terminal.cwd 覆盖、消息投递错配、会话绑定冲突），说明多机器人/多平台复用场景是当前核心痛点。
2. **计费与资源准确性**：OpenRouter 支出低报、模型推理等级不匹配（max vs xhigh），反映用户对成本可控与模型能力元数据的需求增强。
3. **插件生态扩展**：Plugin Catalog 持续接纳社区贡献（besthumanizer、skill-hint、hermes-jobs、polign-recall 等），MCP 与本地优先工具成为热门集成方向。
4. **内存与审计工作流**：memory.write_approval 在网关模式下失效，以及 hindsight recall  per-call budget 需求，显示社区希望在代理记忆与安全审计上获得更细粒度控制。
5. **桌面端与 WebUI 体验**：归档撤销、GitHub issue 链接可点击、配置值类型错误（text vs number）等，表明客户端交互细节正被社区逐步修补。

---

## 开发者关注点

**高频痛点：**
- **会话状态膨胀与启动性能**：legacy sessions.json 镜像与 stale session 行导致长期运行主机启动缓慢，甚至阻止网关重启（#148168、#140222）。
- **跨平台网关阻塞**：Linux 上文件监听与线程启动阻塞 asyncio 事件循环，导致 Discord 心跳超时与强制重连（#145961）。
- **Telegram 投递可靠性**：回退路径超时分类错误、退役适配器复用、SEED_FALLBACK_IPS 丢失等导致消息静默丢失（#136412、#147346、#98228）。
- **构建与发布管线**：aarch64-darwin 下 pnpm-deps-hash 不匹配，阻碍 macOS Apple Silicon 用户从源码构建（#152284）。

**开发者行动建议：**
- 优先审查与合并 #151930、#151833 等与 Telegram 投递可靠性相关的 ci-reviewed PR。
- 对 #148168、#140222 这类影响生产可用性的会话状态缺陷制定修复里程碑。
- 继续鼓励 Plugin Catalog 的社区贡献，并建立 MCP 插件的安全审查模板。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-10)

## 今日速览

今日 OpenClaw 社区围绕 **Windows 原生安装、会话状态卡死与内存 OOM** 等核心稳定性问题展开密集讨论，共 7 个 Issue 更新，其中 P0/P1 级别问题集中在网关健康检查超时、会话索引阻塞及后台执行权限失效。PR 侧则以 Web UI 性能优化、CLI 交互体验修复及跨平台适配为主，共 50 个 PR 活跃更新。

> 📭 **版本发布**：过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 核心摘要 | 为何值得关注 | 链接 |
|---|------|-------------|----------|--------------|------|
| #196251 | Windows Native Setup 因 10s 网关健康检查超时导致“完成设置”失败 | P0, ux-release-blocker | 冷启动隔离会话需 14s，而健康检查默认仅 10s，导致 Windows 向导卡死。 | **P0 级用户体验阻塞器**，直接影响新用户在 Windows 上的首次安装体验，亟需调整超时策略。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/196251) |
| #157255 | 车道超时后 Turn claim 仍未释放，会话永久卡死 90+ 分钟 | P1, impact:session-state | 2026.9.5 版本中，车道任务超时后会话 Turn claim 未释放，触发路径与 #137043 不同。 | 会话永久 wedge 是严重的可用性缺陷，已有 11 条评论跟进，需关注根因定位。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/157255) |
| #195279 | 后台 exec 完成唤醒失败，提示“operator execution authority is no longer active” | P1, impact:security | 由 `sessions_send` 发起的 turn 已结束时，后台 exec 结果丢失，Agent 无法继续。 | 涉及安全审计与消息丢失，可能导致后台自动化任务静默失败。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/195279) |
| #191784 | 超过 256 MB 的会话转录阻塞 Agent 内存索引，compact OOM，无法轮转 | P1, impact:session-state | 单会话达 73k 事件/357 MB，压缩工具也无法处理，导致内存索引永久阻塞。 | 长期运行会话的内存管理痛点，直接影响大规模对话场景的稳定性。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/191784) |
| #185092 | Windows 节点已配对但浏览器控制失败，监听器所有权/认证错误 | P2, impact:ux-friction | Windows 节点显示已连接，但 Agent 无法可靠与浏览器会话交互。 | 跨平台（Windows）浏览器自动化的关键瓶颈，影响端到端代理能力。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/185092) |
| #196321 | `openclaw update` 在 NVM + systemd 环境下 rootRedirect 异常，CLI 停留旧版本 | P2, clawsweeper:fix-shape-clear | systemd Drop-in 指向旧 NVM 全局安装根目录，导致插件发现失效，doctor 无有效指引。 | 涉及升级路径与依赖管理，对生产环境自动化运维有直接影响。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/196321) |
| #196328 | `automations` 工具结果在 cron 故障修复 turn 中被 outputSchema 拒绝 | Bug | 2026.11.1 版本中，cron 故障修复期间 `get`/`list` 均被工具结果校验器拒绝，普通 turn 无法复现。 | 定时任务与自动化修复链路的稳定性问题，排查难度较高。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/196328) |

> 其余已更新 Issue（共 7 条）均已在上表中覆盖，无额外高优先级条目。

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心变更 | 用户/开发者影响 | 链接 |
|---|------|------|----------|----------------|------|
| #196317 | fix(ui): 打开 Markdown 页面时避免加载 Chat | CLOSED | 避免在 Markdown/会议页面加载 Chat 静态依赖链。 | Markdown 页面加载更轻量，Windows 路径渲染保持不变。 | [查看 PR](https://github.com/openclaw/openclaw/pull/196317) |
| #196327 | fix(android): RTL 布局下聊天引导条位置错误 | OPEN | 修复语音转录引用条和工具活动指南在 RTL 布局下错误靠左显示。 | 改善阿拉伯语/希伯来语等 RTL 语言用户的聊天体验。 | [查看 PR](https://github.com/openclaw/openclaw/pull/196327) |
| #196179 | improve(ui): 减少流式回复期间的聊天布局工作 | OPEN | 消除自动末尾跟随期间重复移除行容纳，减少样式/布局计算。 | 流式回复时 Control UI 渲染开销降低，保持转录定位与滚动稳定。 | [查看 PR](https://github.com/openclaw/openclaw/pull/196179) |
| #196326 | perf(chat): 拆分大历史记录的冷启动准备 | OPEN | 将 2000 条消息的构建、索引、行初始化拆分到多个任务。 | 大对话首屏响应更流畅，避免主线程长时间阻塞。 | [查看 PR](https://github.com/openclaw/openclaw/pull/196326) |
| #196309 | perf(chat): 更早显示首条流式答案 | OPEN | 首条答案不再等待用于合并继续文本的动画帧批次。 | 首个答案出现延迟降低，后续增量保持原有帧节奏。 | [查看 PR](https://github.com/openclaw/openclaw/pull/196309) |
| #196320 | improve: 减少 Control UI 预加载与冗余样式 | OPEN | 移除已验证的死代码/冗余样式，延迟加载“连接机器”详情。 | 降低 Control UI CSS 预算与首字节后资源占用。 | [查看 PR](https://github.com/openclaw/openclaw/pull/196320) |
| #196081 | fix(cli): 在 status 中显示无效 --agent 选项错误 | OPEN | 将 `--agent` 仅在 `--usage` 下有效的真实错误暴露给人类可读输出。 | 改善 CLI 错误可发现性，减少用户盲目运行 `doctor`。 | [查看 PR](https://github.com/openclaw/openclaw/pull/196081) |
| #196073 | fix(cli): 在 status --deep 中显示网关健康原因 | OPEN | 当网关不可达时，显示实际探测错误而非泛化失败提示。 | 运维排查网关连通性时更直接定位根因。 | [查看 PR](https://github.com/openclaw/openclaw/pull/196073) |
| #191513 | feat(pairing): 使用主机批准的短代码配对浏览器 | OPEN | 无凭证浏览器可通过短代码请求配对，无需手动粘贴 Token。 | 头部网关/SSH 场景下浏览器配对更安全便捷，减少秘密手动传输。 | [查看 PR](https://github.com/openclaw/openclaw/pull/191513) |
| #196322 | feat: 在单个 CLAW.md 清单中配置 Templates | OPEN | 将原本分散在 CLAW.md 与独立配置文件中的模板设置与依赖统一。 | 模板作者体验提升，Control UI 可直接展示声明的技能/插件引用。 | [查看 PR](https://github.com/openclaw/openclaw/pull/196322) |

---

## 功能需求趋势

从本日 Issues 与 PR 标签、标题可归纳出社区当前关注的四大功能方向：

1. **Windows 原生体验与安装稳定性**  
   多个 Issue 指向 Windows 节点配对、浏览器监听器认证、向导健康检查超时等问题，说明 Windows 端是当前用户增长与日常使用的重点痛点区域。

2. **会话状态与内存管理**  
   会话卡死（Turn claim 未释放）、超大转录导致内存索引 OOM、缺乏转录轮转机制，反映社区对长会话、大上下文场景下资源管控能力的强烈需求。

3. **后台执行与权限生命周期**  
   后台 exec 完成唤醒失败、执行权限失效、自动回复中工具策略丢失等问题，表明用户期望后台代理任务与前端会话之间具有更可靠的状态传递与权限继承机制。

4. **模板与配置统一（CLAW.md）**  
   PR #196322 等体现社区希望将模板设置、技能/插件依赖统一在单一清单中管理，降低模板作者与运维人员的配置成本。

---

## 开发者关注点

- **P0/P1 级阻塞问题亟待修复**：Windows 安装向导超时、会话永久卡死、内存 OOM 等高优先级 Issue 尚无关联修复 PR，建议社区尽快指派维护者跟进。
- **CLI 错误信息不透明**：多个 PR（如 #196081、#196073）旨在将底层错误原因暴露给用户，反映当前 `doctor`/`status` 输出过于泛化，排查效率低。
- **跨平台一致性**：Windows 浏览器控制、Android RTL 布局、Telegram 投递日志等平台相关问题频出，提示跨端适配仍是持续性投入领域。
- **性能优化集中在 Web UI 聊天链路

:::
