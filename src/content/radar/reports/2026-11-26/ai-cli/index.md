---
title: "AI CLI 工具社区动态日报"
published: 2026-11-26
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-26

> 生成时间: 2026-11-26 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-26）

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单轮对话助手”向“可编程、多代理、企业级协作平台”的深水区转型。各主流工具已进入细分垂直领域的差异化竞争阶段，核心竞争点集中在 MCP/插件生态治理、多代理协作架构、会话状态持久化以及成本透明度四个维度。安全与合规需求（OAuth 令牌绑定、SSRF 防护、破坏性操作拦截）成为社区高频诉求，反映出 AI CLI 正从开发者个人工具向企业生产环境渗透。整体而言，成熟商业产品（Claude Code、Codex）侧重稳定性与商业化功能，开源社区项目（Gemini CLI、OpenCode、Hermes、OpenClaw）则在可编程性和跨平台适配上保持快速迭代。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Issues 数 | 今日 PR 数 | 今日 Release | 主要版本/频道 |
|------|------|---------------|-----------|-------------|--------------|
| Claude Code | anthropics/claude-code | 50 条（精选 10 条） | 0 | ✅ v2.1.332 | 稳定版 |
| OpenAI Codex | openai/codex | 未披露总数（精选 10 条） | 10+ 条（精选） | ✅ rust-v0.174.0-alpha.5 / .6 | Rust 端 Alpha |
| Gemini CLI | google-gemini/gemini-cli | 未披露总数（精选 10 条） | 10 条（精选） | ❌ 无 | — |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 0 | 0 | ❌ 无 | 无活动 |
| OpenCode | anomalyco/opencode | 17 条 | 50 条 | ❌ 无 | — |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | ❌ 无 | 无活动 |
| Hermes | NousResearch/hermes-agent | 未披露总数（精选 10 条） | 10 条（精选） | ✅ canary v0.23.4+ | Canary (macOS Apple Silicon) |
| OpenClaw | openclaw/openclaw | 未披露总数（精选 10 条） | 10 条（精选） | ✅ v2026.11.10 / v2026.11.9 | 主版本 |

**数据备注**：部分仓库仅披露了精选热点 Issues/PR，未公开当日总增量；DeepSeek Reasonix 与 Deepseek Harness 过去 24 小时无任何 GitHub 活动。

## 3. 共同关注的功能方向

多个工具社区在以下方向上呈现高度共鸣：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|---------|---------|------------|
| **MCP/插件生态治理** | Claude Code、Gemini CLI、OpenCode | Claude Code 要求连接器分层作用域（#112359）与插件 JSON 合同修复（#112360）；Gemini CLI 合并 MCP OAuth 令牌绑定、工具审批绑定及 SSRF 防护 PR；OpenCode 提出 ACP 在 `additionalDirectories` 中发现技能（#64034） |
| **会话状态与持久化** | Claude Code、Codex、Gemini CLI、OpenCode、Hermes | Claude Code 多账户会话不可见（#74662）；Codex Windows 项目丢失（#59895）与会话查找错误（#64014）；Hermes state.db 大表写锁导致会话超时（#159886）；OpenCode 子代理会话 ID 约束（#66461） |
| **CLI/TUI 可观测性与降噪** | Codex、OpenCode、Gemini CLI | Codex 子代理活动隐藏（#62999）与状态行自定义（#64007-64010）；OpenCode Code Mode 结构化 JSON Schema 输出（#66278）；Gemini CLI `grep_search` 输出大小限制（#30109） |
| **成本透明度与预算控制** | Claude Code、Gemini CLI | Claude Code `/meter` 用量去向与耗尽预测（#112362）；Gemini CLI AST 感知读取以减少 Token 消耗（#22745） |
| **安全对齐与误报控制** | Claude Code、Gemini CLI、OpenClaw | Claude Code `[cyber]` 安全误报（#98886）；Gemini CLI 破坏性 Git 操作拦截（#22672）；OpenClaw MEMORY.md 静默排除涉及安全与体验（#153426） |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 商业化 CLI 功能完整性、MCP 技能体系、成本计量 | 企业开发者、专业 AI 编程用户 | Anthropics 生态闭环，Opus/Fable 模型深度集成，桌面端 + CLI 双模态 |
| **OpenAI Codex** | TUI/CLI 细节打磨、跨平台桌面端（Win/macOS/Linux/Android Remote）、Statsig 功能门控 | OpenAI 生态用户、跨平台开发者 | Rust 端 Alpha 迭代，TUI 为核心交互，功能门控与渐进式发布 |
| **Gemini CLI** | Agent 稳定性（子代理恢复、挂起修复）、AST 感知代码理解、多模态模型快速适配 | Google 生态开发者、代码库探索场景 | Go/Python 核心，强调上下文预算管理与 Web Fetch 安全，快速跟进新模型（如 gemini-2.5-flash-image） |
| **OpenCode** | Code Mode 可编程自动化、多智能体团队协作（Agent Teams）、跨机器文件/端口转发 | 自动化脚本开发者、DevOps、高级 CLI 用户 | TypeScript/Node 生态，插件系统成熟，强调可保存脚本、持久化执行与结构化输出 |
| **Hermes** | 跨平台消息适配器（Telegram/WhatsApp/Feishu/QQ）、桌面端 GUI 项目管理、插件主动式助手 | 即时通讯集成开发者、多平台机器人运维者 | 网关 + 插件架构，systemd/launchd 系统集成深，Canary 频道面向 macOS Apple Silicon |
| **OpenClaw** | 会话状态注入（MEMORY.md/USER.md）、Workboard 任务调度、多端 UI（Android Talk、Linux 浏览器面板） | 企业级知识工作流、自动化任务编排用户 | 网关 + 客户端双端，v2026.11.10 为大规模主版本，P0 缺陷集中在会话状态与安全 |
| **DeepSeek Reasonix / Harness** | — | — | 过去 24 小时无活动，社区关注度低或处于维护期 |

## 5. 社区热度与成熟度

**高活跃、快速迭代：**
- **OpenCode**：单日 50 个 PR 获得更新，Code Mode 可编程能力持续增强，社区贡献密集，处于功能扩张期。
- **Claude Code**：虽今日 PR 为 0，但 Issues 数达 50 条，且刚发布 v2.1.332，商业产品的稳定性修复节奏明确。
- **OpenAI Codex**：Rust 端连续发布两个 Alpha 版本，TUI/CLI 细节 PR 密集，处于从原型向稳定版过渡的关键期。

**中等活跃、稳步修复：**
- **Gemini CLI**：无新 Release，但 PR 集中在安全补丁（SSRF、OAuth 绑定）与核心修复，显示成熟期的防御性迭代。
- **Hermes**：Canary 版本发布，PR 多为桌面端 UI 与网关迁移修复，处于平台稳定化阶段。
- **OpenClaw**：刚发布 v2026.11.10 大版本，社区正在修复 P0/P2 缺陷，处于版本交付后的修复期。

**低活跃/停滞：**
- **DeepSeek Reasonix** 与 **Deepseek Harness**：过去 24 小时无任何 Issues/PR/Release 更新，社区热度显著不足，需关注项目维护状态。

## 6. 值得关注的趋势信号

### (1) AI CLI 正从“聊天界面”转向“可编程自动化平台”
OpenCode 的 Code Mode 持久化、子代理调用、结构化 JSON Schema 输出；Claude Code 的 MCP 服务器技能；Gemini CLI 的 AST 感知代码理解，均指向同一个方向：开发者不再满足于交互式问答，而是希望将 AI 能力编排为可复用、可版本化、可集成到 CI/CD 的自动化组件。**对开发者的参考价值**：选型时应重点评估工具的脚本化能力、插件扩展性及结构化输出支持，而非仅看对话体验。

### (2) 多代理协作（Agent Teams）从设计讨论进入早期实现
OpenCode 已有“Agent Teams”扁平团队设计方案（#12711）；Claude Code 出现大量子代理资源控制与并发过载问题；Gemini CLI 的子代理恢复与 MAX_TURNS 状态上报缺陷（#22323）反映多代理场景已规模化使用。**对开发者的参考价值**：多代理编排的稳定性（状态同步、资源隔离、超时恢复）将成为下一代 AI CLI 的核心差异化指标，建议提前布局相关技术储备。

### (3) 安全与合规成为企业级采购的门槛
Gemini CLI 密集合并 OAuth 令牌绑定、SSRF 防护、受信任工作区遥测隔离等安全 PR；Claude Code 出现 `[cyber]` 安全误报与破坏性操作拦截需求；OpenClaw 的 MEMORY.md 静默排除被标记为 `impact:security`。**对开发者的参考价值**：在企业环境中部署 AI CLI 时，必须优先评估 OAuth 令牌管理、SSRF 防护、审计日志及破坏性命令拦截等安全能力，而非仅关注模型智能程度。

### (4) 成本透明度从“锦上添花”变为“刚性需求”
Claude Code 社区强烈要求 `/meter` 展示每轮/每代理用去向、预测耗尽时间并导

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-26）

## 1. 热门 Skills 排行

基于 PR 更新频度、社区讨论维度及技术影响力，筛选出以下 8 个最受关注的 Skills 动态：

| 排名 | PR | 功能简述 | 社区讨论热点 | 当前状态 |
|------|-----|---------|-------------|---------|
| 1 | [#1681 fix(skill-creator): support direct execution of package_skill.py](https://github.com/anthropics/skills/pull/1681) | 修复 `skill-creator` 中 `package_skill.py` 无法作为独立脚本直接运行的问题，并更新过时的引用路径与 CLI 帮助信息。 | 社区反映技能打包流程存在模块导入失败（`ModuleNotFoundError`），影响自定义 Skill 的分发与落地；近期（11-19）仍有更新，维护活跃。 | OPEN |
| 2 | [#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills](https://github.com/anthropics/skills/pull/1245) | 新增两个 Skill：`notion-spec-to-implementation` 将产品/技术规格拆解为可执行的 Notion 任务；`quantitative-resume-auditor` 进行定量简历审计。 | 兼顾企业知识管理与职场自动化两个高频场景，更新持续至 10-15，社区对跨平台（Notion）集成需求明显。 | OPEN |
| 3 | [#525 Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525) | 为 Python 复古游戏框架 Pyxel 提供创建、调试、头less 运行及帧级验证的 Skill。 | 游戏开发垂直领域 Skill 的代表性提案，跨度半年仍持续获得更新（11-01），显示社区对娱乐/创意类自动化技能的持续兴趣。 | OPEN |
| 4 | [#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0.0` 的重命名变更（`streamablehttp_client` → `streamable_http_client`），并支持通过 `create_mcp_http_client` 配置自定义 HTTP 头。 | MCP 协议版本迭代导致现有连接脚本失效，是社区在“技能与外部服务集成”层面的核心兼容性痛点。 | OPEN |
| 5 | [#1980 webapp-testing: avoid shell=True in with_server.py](https://github.com/anthropics/skills/pull/1980) | 移除 `webapp-testing` 脚本中 `subprocess.Popen(..., shell=True)` 的用法，消除命令注入风险（CWE-78）。 | 安全合规成为社区关注焦点；Web 应用自动化测试技能的底层执行安全性直接影响企业采用意愿。 | OPEN |
| 6 | [#1792 fix(docx): report LibreOffice timeout as an error and verify the output](https://github.com/anthropics/skills/pull/1792) | 当 LibreOffice 转换超时时返回错误而非误报成功，并通过检查 DOCX XML 修订标记验证输出结果。 | 文档处理技能的可靠性问题（超时静默失败）是企业文档自动化场景中的常见反馈。 | OPEN |
| 7 | [#1771 feat(skills): add proofcore-contract-auditor for smart contract notarization](https://github.com/anthropics/skills/pull/1771) | 新增 `proofcore-contract-auditor`，对 Solidity/Rust 智能合约进行静态分析，并将审计证明锚定至 TON 区块链。 | Web3/区块链方向的安全审计技能，体现社区对去中心化信任与合规 notarization 的探索。 | OPEN |
| 8 | [#2019 fix(xlsx): resolve worksheet-scoped defined names and aliases in external_links_at_risk](https://github.com/anthropics/skills/pull/2019) | 修复 `xlsx` 技能中外部链接风险检测仅检查工作簿级定义名称的问题，增加工作表级作用域支持，减少误报。 | 电子表格自动化与数据链接审计是财务/运营场景的高频需求，修复细节深入，体现社区对数据准确性的要求。 | OPEN |

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向呈现以下四大趋势：

1. **工作流自动化与跨平台集成**  
   如 `notion-spec-to-implementation`（规格到 Notion 任务）、`scnet-hpc`（HPC 集群 SSH/Slurm 操作）、`compact-memory`（符号化紧凑状态记忆），用户希望 Claude Code 能直接串联外部系统，减少人工搬运。

2. **代码审查与安全治理**  
   `proofcore-contract-auditor`（智能合约审计）、`agent-governance`（AI Agent 安全模式）、`document-typography`（生成文档排版质量管控），反映社区对“AI 输出可信度”与“合规审计”的强烈需求。

3. **测试生成与质量验证**  
   `webapp-testing`（Web 应用测试）、`run_eval.py` 触发率问题（Issue #556、#1352）显示社区正在致力于让 Skill 自身具备可测试性、可验证性，避免“技能失效不可见”。

4. **文档处理与内容生产**  
   `docx` 超时处理、孤立注释检测、Markdown 转视频（`md2video-audio`）、PPTX 缩略图生成，表明文档全生命周期自动化（生成→校验→转换→发布）是社区持续投入的领域。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、技术切入点明确，尚未合并，可能近期落地：

- **[#1681 fix(skill-creator): support direct execution of package_skill.py](https://github.com/anthropics/skills/pull/1681)**  
  直接影响所有自定义 Skill 的打包与分发能力，修复后将降低社区贡献新 Skill 的门槛，合并优先级高。

- **[#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills](https://github.com/anthropics/skills/pull/1245)**  
  覆盖企业知识管理与职场自动化两个实用场景，更新持续至 10 月，社区关注度稳定，具备较强落地潜力。

- **[#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers](https://github.com/anthropics/skills/pull/1742)**  
  解决 MCP 2.0 协议兼容性断裂，涉及大量依赖 MCP 连接的 Skill，合并后可避免社区出现广泛的运行时失败。

- **[#1980 webapp-testing: avoid shell=True in with_server.py](https://github.com/anthropics/skills/pull/1980)**  
  安全修复（CWE-78 命令注入），符合企业级安全基线，大概率会在近期合并。

- **[#1792 fix(docx): report LibreOffice timeout as an error and verify the output](https://github.com/anthropics/skills/pull/1792)**  
  提升文档处理技能的可靠性，解决“静默成功”导致的数据完整性问题，社区反馈明确。

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可安全集成外部系统、具备可验证质量门禁的企业级自动化技能，并通过修复打包、MCP 兼容及命令注入等基础设施问题，降低社区贡献与落地的门槛。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-26  
**数据来源**: github.com/anthropics/claude-code

---

## 1. 今日速览

Claude Code 发布了 v2.1.332 版本，引入了 MCP 服务器技能（beta）及新的 `PreSkillShellCommand` 钩子事件，增强了技能加载时的安全控制。社区活跃度较高，今日更新的 50 条 Issue 中，多账户支持、Cowork 云会话异常、开发通道确认对话框跳过等问题引发较多讨论；同时，大量针对 Opus 5.5 和 Fable 5.2 模型行为的 Bug 报告集中涌现，反映开发者对模型稳定性与成本控制的关注度提升。

---

## 2. 版本发布

### v2.1.332

**主要更新内容：**
- **MCP 服务器技能（beta）**：新增从 MCP 服务器加载的技能，在 `/` 菜单中显示为 `server:skill`，其他技能保持原有名称。
- **PreSkillShellCommand 钩子事件**：新增钩子事件，可在技能或命令加载时拦截并拒绝其内联 shell 命令；在 2.1.331 及更早版本中，命名为此钩子的设置文件可能存在兼容性问题。

**相关 Issue**：#112360 报告该版本中 `claude plugin list --json` 返回 `@builtin` 插件，违背了文档化的 JSON 合同，属于回归问题。

---

## 3. 社区热点 Issues

以下挑选 10 个最值得关注的 Issue（按评论数和社区影响力排序）：

| # | 标题 | 评论/👍 | 核心内容 | 为什么重要 |
|---|------|---------|---------|-----------|
| [#74662](https://github.com/anthropics/claude-code/issues/74662) | Claude Desktop: 允许打开/恢复账户侧边栏中不存在的本地会话（多账户支持） | 19 / 13 | 用户在同一台 Claude Desktop 上运行个人 + 工作两个账户，切换账户后另一账户下的本地会话不可见，无法恢复。 | 涉及多账户工作流的核心体验，评论数最多，社区需求强烈。 |
| [#107077](https://github.com/claude-code/issues/107077) | Cowork 云会话持续以“弃用模式”启动（仅工具服务器）：插件钩子和斜杠命令不运行 | 15 / 0 | 云会话分两种模式，同一插件在一种模式下 100% 可用，另一种模式下 0% 可用，且出现额外“允许一次”提示。 | 直接影响 Cowork 协作场景下的插件生态可用性，属于严重功能回归。 |
| [#42486](https://github.com/claude-code/issues/42486) | `--dangerously-load-development-channels` 应支持跳过确认对话框 | 13 / 15 | 每次启动开发通道都需手动点击确认，无法通过标志位持久化或跳过，阻碍自动化工作流。 | 开发者效率问题，👍数较高，适合作为 CLI 易用性改进优先级。 |
| [#94463](https://github.com/claude-code/issues/94463) | CLAUDE.md 在 nested_traversal 路径下加载两次 | 4 / 0 | 当两个不同路径拼写指向同一文件且其中一个位于工作目录下时，嵌套遍历加载器按字符串比较路径，导致重复加载。 | 核心加载逻辑 Bug，可能导致配置重复执行，需修复。 |
| [#104926](https://github.com/claude-code/issues/104926) | Agent 视图在会话结束状态相同时重复发送“需要您的输入”/“已完成”通知 | 2 / 0 | 后台会话状态未变化时，Agent 视图仍重复推送通知，造成干扰。 | 影响通知系统可靠性，用户体验问题。 |
| [#112359](https://github.com/claude-code/issues/112359) | [FEATURE] 连接器和设置的分层作用域模型 | 1 / 0 | 提出命名连接器实例、每项目绑定、继承等分层作用域，以解决跨项目配置管理混乱。 | 代表社区对 MCP/连接器配置治理的长期需求。 |
| [#112360](https://github.com/claude-code/issues/112360) | [BUG] 2.1.332: `claude plugin list --json` 返回 @builtin 插件，超出文档化 JSON 合同 | 0 / 0 | 从空配置目录启动，2.1.332 返回四个内置插件，早期版本返回 `[]`。 | 新版本回归问题，可能破坏依赖该命令的自动化脚本。 |
| [#112353](https://github.com/claude-code/issues/112353) | Opus 5.5 将重复任务提示视为状态检查并停止，尽管提示要求“不要停止” | 1 / 0 | 循环任务中，模型将持续性提示误判为状态轮询，任务完成后停止而非继续。 | 模型指令遵循问题，直接影响自动化任务可靠性。 |
| [#98886](https://github.com/claude-code/issues/98886) | [Bug] 授权本地安全实验室上下文后，对不相关请求重复出现误报 `[cyber]` 安全拦截 | 1 / 0 | 网络安全相关误报，影响合法的本地安全测试工作流。 | 涉及安全模型误报，对安全研究人员和企业用户影响大。 |
| [#112362](https://github.com/claude-code/issues/112362) | [FEATURE] /meter：显示每轮和每个代理的用量去向，预测耗尽时间，并导出用量收据 | 0 / 0 | 请求增加用量透明度，支持按轮次/代理拆分成本、预测预算耗尽、导出收据用于 Bug 报告。 | 成本控制是企业级用户关注的重点方向。 |

---

## 4. 重要 PR 进展

**过去 24 小时内无新 Pull Request 更新。**

---

## 5. 功能需求趋势

从今日 Issues 中提炼出的社区关注方向：

1. **多账户与会话管理**  
   用户希望在同一客户端实例中无缝切换多个 claude.ai 账户，并恢复跨账户的本地会话（#74662），反映团队协作和个人/工作账户分离场景的刚性需求。

2. **MCP 与插件生态治理**  
   围绕 MCP 服务器技能、连接器分层作用域（#112359）、插件 JSON 合同（#112360）的讨论增多，社区期待更规范的插件/连接器配置、作用域继承和版本兼容性保障。

3. **成本透明度与预算控制**  
   多个 Issue 要求 `/meter` 命令展示每轮/每代理用去向、预测耗尽时间并导出收据（#112362），以及避免模型在未检查免费本地选项前启动付费云任务（#112329），成本管控成为高频需求。

4. **桌面端集成与自定义**  
   用户希望在会话“打开方式”菜单中自定义目标（URL 模板，支持会话 ID 和 cwd），以便第三方终端和编排工具接入（#112361）；同时希望跳过开发通道确认对话框（#42486），提升 CLI 自动化体验。

5. **模型行为稳定性（Opus 5.5 / Fable 5.2）**  
   大量 Bug 指向模型指令遵循、后台进程清理、成本记录准确性、并发子代理资源控制等问题，社区对新模型版本的可靠性敏感度高。

---

## 6. 开发者关注点

**痛点与高频需求总结：**

- **多账户会话隔离不足**：桌面端侧边栏仅显示当前登录账户的服务端会话，切换账户后历史本地会话“不可见”，亟需本地会话持久化与跨账户可见性。
- **Cowork 云会话模式不一致**：插件钩子和斜杠命令在不同启动模式下表现截然不同，缺乏稳定的能力检测机制，影响插件开发者和企业协作场景。
- **CLI 交互阻塞自动化**：`--dangerously-load-development-channels` 的手动确认对话框无法跳过，阻碍 CI/CD 和本地开发流水线的无人值守运行。
- **模型指令偏差与资源泄漏**：Opus 5.5 频繁出现“将持续性提示误判为状态检查”“后台 watcher 任务结束后未关闭”“并发子代理过载机器”等问题，开发者需要更强的模型约束能力和资源清理保障。
- **成本与安全误报**：付费任务在未验证免费替代方案前即被启动；`[cyber]` 安全拦截对授权的本地安全实验产生误报，影响合法测试流程。

---

**报告生成时间**: 2026-11-26  
**数据覆盖范围**: 2026-11-25 至 2026-11-26 的 GitHub 仓库更新

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-26  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

Codex 社区今日活跃度持续高位，Rust 端连续发布两个 Alpha 版本（0.174.0-alpha.5 / alpha.6），TUI/CLI 领域集中涌现大量细节打磨 PR。Windows 与 macOS 桌面端的会话丢失、功能回归等核心 Bug 仍是社区关注焦点，同时 Android Remote 与 MCP 应用相关的新问题开始浮现。

---

## 2. 版本发布

过去 24 小时内发布了两个 Rust 端 Alpha 版本：

- **rust-v0.174.0-alpha.6**  
  链接：https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.6
- **rust-v0.174.0-alpha.5**  
  链接：https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.5

两版本均为预发布版本，未在 Release Notes 中披露具体变更内容，建议追踪 Rust/CLI 分支的开发者留意后续稳定版迁移情况。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 关键指标 | 为何值得关注 | 链接 |
|---|------|------|----------|--------------|------|
| #59895 | Windows: 本地项目在应用更新后切换回个人账号时消失 | OPEN | 73 评论 / 19 👍 | 涉及用户项目数据丢失，影响面广，社区讨论持续发酵，是当前最高优先级的桌面端 Bug 之一。 | https://github.com/openai/codex/issues/59895 |
| #62700 | macOS 桌面端 26.1117.31558 回归：启用的本地技能从斜杠菜单消失 | CLOSED | 18 评论 / 15 👍 | 明确的版本回归（26.1111.71025 正常），ChatGPT Pro 用户受影响，反映桌面端发布流程存在回归测试缺口。 | https://github.com/openai/codex/issues/62700 |
| #60537 | Linux 桌面端：听写音频消失时播放增益被永久降低 | OPEN | 20 评论 / 5 👍 | 音频/听写功能的生命周期缺陷，Linux 平台特有，影响无障碍及语音交互体验。 | https://github.com/openai/codex/issues/60537 |
| #62999 | 允许在 Codex CLI 转录中隐藏子代理活动 | OPEN | 新建 / 2 👍 | 社区开始关注子代理（subagent）输出的噪音控制，与 `collapse_turn_details` 配置相关，属于 CLI 可观测性优化方向。 | https://github.com/openai/codex/issues/62999 |
| #63991 | `codex queue --resume` 无法在空闲 TUI 占用线程时启动新轮次 | OPEN | 新建 | CLI 队列与交互式 TUI 的线程锁定冲突，影响自动化流程与会话恢复场景。 | https://github.com/openai/codex/issues/63991 |
| #48563 | Windows 桌面端：未回答的问题卡片在助手发送后续文本后消失 | OPEN | 6 评论 / 4 👍 | 交互式问答流程中断，导致可选答案不可用，反复打断工作流。 | https://github.com/openai/codex/issues/48563 |
| #47535 | CLI/TUI：异步问题保持折叠，合并回答后仅第一个问题被清除 | OPEN | 6 评论 / 1 👍 | 批量回答交互时的状态不一致，CLI 交互体验痛点。 | https://github.com/openai/codex/issues/47535 |
| #63978 | Android Remote 显示 WSL 项目但任务在 Windows 上创建 | OPEN | 新建 | 跨平台远程开发的项目路径映射错误，涉及 WSL 与 Windows 任务创建逻辑分离。 | https://github.com/openai/codex/issues/63978 |
| #64019 | 桌面端：线程“在…中打开”菜单支持自定义目标并接收会话 ID | OPEN | 新建功能需求 | 社区希望将会话上下文（而非仅项目文件夹）传递给第三方终端或编排工具，增强“在其他地方继续”能力。 | https://github.com/openai/codex/issues/64019 |
| #63967 | Windows：启用高级账户安全后，Codex 桌面端在 FIDO2 登录后仍要求邮箱验证码 | OPEN | 新建 | 认证流程与 FIDO2 硬件密钥不兼容，影响企业级安全合规场景下的登录体验。 | https://github.com/openai/codex/issues/63967 |

---

## 4. 重要 PR 进展（精选 10 条）

今日合并的 PR 绝大多数由 `copyberry[bot]` 提交，集中在 TUI 界面细节、CLI 稳定性、MCP 会话恢复及 Statsig 功能门控初始化等方面：

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|---------------|------|
| #64018 | 在 TUI 流式传输期间保持中断指南可见 | CLOSED | 流式输出时不再隐藏工作状态行及中断快捷键，修复消息阶段结束前状态行消失的问题。 | https://github.com/openai/codex/pull/64018 |
| #64016 | 发布构建中绑定 Statsig 客户端密钥 | CLOSED | 在 Cargo 和 Bazel 构建中从 GitHub Actions 变量设置 `CODEX_BUNDLED_STATSIG_CLIENT_KEY`，确保功能门控在编译时可用。 | https://github.com/openai/codex/pull/64016 |
| #64015 | 在 TUI 中显示后台命令启动和延迟结果 | CLOSED | 后台命令可超出发起轮次的生命周期，结果不再被丢失或错误显示为独立转录条目。 | https://github.com/openai/codex/pull/64015 |
| #64014 | 在 TUI 中显示会话查找错误 | CLOSED | 会话 ID 查找失败不再一概视为“会话不存在”，启动恢复和分支会报告元数据不可读等真实错误。 | https://github.com/openai/codex/pull/64014 |
| #64013 | 保留 Windows PowerShell 钩子中的原生退出码 | CLOSED | 修复 PowerShell `-Command` 将原生退出码 `2` 错误报告为 `1` 的问题，确保 `PreToolUse` 钩子能正确阻止工具调用。 | https://github.com/openai/codex/pull/64013 |
| #64011 | HTTP 恢复期间清理废弃的 MCP 会话 | CLOSED | Streamable HTTP 服务器在初始化握手完成前分配替换会话 ID 时，恢复失败或超时不会占用服务器容量。 | https://github.com/openai/codex/pull/64011 |
| #64010 | 向自定义状态行添加内联徽章 | CLOSED | 新增 `badge` 元素，支持 `secondary`/`info`/`success`/`warning`/`danger` 颜色，增强状态行自定义能力。 | https://github.com/openai/codex/pull/64010 |
| #64009 | 向自定义状态行布局添加灵活间距 | CLOSED | 新增 `spacer` 元素，允许状态行字段靠边对齐，提升自定义布局灵活性。 | https://github.com/openai/codex/pull/64009 |
| #64008 | 为自定义状态行添加方向性 `box` 元素 | CLOSED | 支持 `row` / `column` 方向，仅行布局接受 `wrap` 和 `justify`，完善状态行 UI 树。 | https://github.com/openai/codex/pull/64008 |
| #64007 | 向状态行文本块添加 `maxLines` | CLOSED | 长文本超出行数上限后以省略号截断，防止状态行撑开挤占其他字段。 | https://github.com/openai/codex/pull/64007 |

---

## 5. 功能需求趋势

从近 24 小时的 Issues 和 PR 中可提炼出以下社区关注方向：

1. **CLI/TUI 可观测性与降噪**  
   社区希望更精细地控制子代理活动显示（#62999）、状态行自定义（#64007–64010）、流式传输中的中断提示（#64018），表明开发者正在将 Codex CLI 用于更复杂的自动化场景，对输出噪音敏感。

2. **跨平台远程开发与 WSL 支持**  
   Android Remote 与 WSL 项目的路径映射错误（#63978）、Windows 下从 WSL 打开编辑器的问题（#13661）反映出多端协作和远程开发是当前痛点。

3. **会话持久化与恢复**  
   本地项目丢失（#59895）、会话查找错误（#64014）、`queue --resume` 线程冲突（#63991）均指向会话状态管理的脆弱性，是桌面端和 CLI 端的共同短板。

4. **MCP 应用与隐私边界**  
   社区提出让 MCP 应用渲染内容不进入 Codex 浏览器工具（#64017），体现对数据最小化和第三方应用集成的隐私诉求。

5. **认证与企业安全**  
   FIDO2 与高级账户安全的邮箱验证码冲突（#63967）显示企业级身份验证流程尚未完全适配桌面端。

---

## 6. 开发者关注点

**高频痛点：**
- **桌面端数据丢失与回归**：Windows 项目丢失（#59895）和 macOS 技能菜单消失（#62700）是社区最愤怒的两个问题，涉及已发布稳定版的回归，建议团队加强发布前的跨平台回归测试。
- **交互式问答流程中断**：Windows 问题卡片消失（#48563）和 CLI 异步问题折叠（#47535）反复打断开发者工作流，属于核心交互体验缺陷。
- **Linux 音频/听写生命周期缺陷**：播放增益被永久降低（#60537）影响无

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-26)

## 今日速览

Gemini CLI 社区今日无新版本发布，但围绕 **Agent 稳定性、MCP 安全性及上下文管理** 展开了密集的 Issue 讨论与 PR 修复。开发者普遍关注子代理（Subagent）在超时、挂起及配置继承方面的异常行为，同时多个与 MCP OAuth、Web Fetch SSRF 相关的安全补丁被合并或提交，体现了社区对工具链安全与可靠性的高度重视。

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 为何值得关注 | 链接 |
|---|------|---------|-------------|------|
| #22323 | Subagent recovery after MAX_TURNS is reported as GOAL success | 子代理在达到最大轮次限制后仍上报 `status: "success"`，掩盖了实际中断 | P1 级 Bug，直接影响子代理任务结果的可信度，可能导致开发者误判任务已完成 | [查看](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent hangs | 通用代理在处理简单操作（如创建文件夹）时无限挂起，需手动取消 | P1 级 Bug，评论数与点赞数较高（8/8），严重影响交互体验 | [查看](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | 提出利用模型原生 Bash 能力，通过零依赖 OS 沙箱增强代码库探索与编辑 | P2 增强需求，涉及模型能力与安全边界的平衡，方向具有前瞻性 | [查看](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | Assess the impact of AST-aware file reads, search, and mapping | 探索 AST 感知的文件读取、搜索与代码库映射是否能减少 Token 消耗并提升精度 | P2 功能 Epic，关乎上下文压缩与代码理解质量，长期影响 Agent 效率 | [查看](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini does not use skills and sub-agents enough | 模型在未明确指令时极少主动调用自定义技能与子代理 | P2 Bug，反映 Agent 自主规划能力仍有提升空间，开发者反馈集中 | [查看](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #22267 | Browser Agent ignores settings.json overrides | 浏览器代理完全忽略全局/项目级 `settings.json` 中的 `maxTurns` 等配置 | P2 Bug，配置不生效会导致行为不可预期，影响多环境部署一致性 | [查看](https://github.com/google-gemini/gemini-cli/issues/22267) |
| #21983 | browser subagent fails in wayland | 浏览器子代理在 Wayland 显示服务器下失败 | P1 Bug，涉及 Linux 桌面环境兼容性，影响部分开发者的日常使用 | [查看](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #20079 | ~/.gemini/agents/filename.md is not recognized as an agent if filename.md is a symlink | 代理目录下的软链接文件不被识别为 Agent | P2 Bug，影响用户通过软链接组织共享代理的工作流 | [查看](https://github.com/google-gemini/gemini-cli/issues/20079) |
| #22672 | Agent should stop/discourage destructive behavior | 模型可能执行 `git reset --force` 等破坏性命令，缺乏足够的安全提示 | P2 客户问题，涉及 Agent 安全对齐与用户资产保护 | [查看](https://github.com/google-gemini/gemini-cli/issues/22672) |
| #22186 | get-shit-done output hook causes crash | 输出钩子在打印用户摘要时导致 CLI 崩溃 | P1 Bug，直接导致 CLI 退出，影响工作流完整性 | [查看](https://github.com/google-gemini/gemini-cli/issues/22186) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #30479 | Resolvendo issue #30474 | P1 / size/xl | 解决 Issue #30474，具体细节待补充，优先级最高 | [查看](https://github.com/google-gemini/gemini-cli/pull/30479) |
| #30477 | fix(web-fetch): prevent SSRF via DNS hostnames and redirects | 安全 / size/l | 修复 Web Fetch 代理重定向 SSRF 漏洞（R5），防止 URL 绕过私有 IP 检查后重定向至回环/私有地址 | [查看](https://github.com/google-gemini/gemini-cli/pull/30477) |
| #30478 | Fix: bind MCP tool approvals to the tool definition they approved | 安全 / size/l | 将 MCP 工具审批绑定到具体工具定义，避免 `tools/list_changed` 后旧审批 silently 覆盖新工具 | [查看](https://github.com/google-gemini/gemini-cli/pull/30478) |
| #30475 | Fixes #30391: bind stored MCP OAuth tokens to the server URL they were issued for | 安全 / size/l | 存储的 MCP OAuth 令牌绑定到签发服务器 URL，服务器地址变更时要求重新认证，防止令牌被错误重放 | [查看](https://github.com/google-gemini/gemini-cli/pull/30475) |
| #30476 | fix(cli): stop trusted-workspace settings from redirecting telemetry export | P2 / 安全 | 防止受信任工作区的 `settings.json` 覆盖用户级遥测导出端点，避免克隆仓库一键信任后导致遥测数据被重定向 | [查看](https://github.com/google-gemini/gemini-cli/pull/30476) |
| #30473 | fix(core): exclude evicted binary payloads from exempt retrieval byte budget | 核心修复 / size/m | 修复 `collapseOlderFunctionResponses` 字节预算计算，排除已驱逐的二进制负载，防止单条图片读取导致预算异常 | [查看](https://github.com/google-gemini/gemini-cli/pull/30473) |
| #30454 | fix(core): enforce origin consistency and display endpoint origin in MCP OAuth flow | P1 / size/xl | 强制 MCP OAuth 元数据发现与认证中的 issuer 匹配和端点源一致性，并在界面显示授权/令牌源 | [查看](https://github.com/google-gemini/gemini-cli/pull/30454) |
| #30441 | fix(cli): cover all extension content in install and update consent | 安全 / size/xl | 扩展安装/更新同意现在涵盖所有新增内容（钩子、上下文文件等），更新时如内容变化会再次请求确认 | [查看](https://github.com/google-gemini/gemini-cli/pull/30441) |
| #30109 | fix(core): cap grep_search output size and tell the model to narrow broad searches | P2 / 区域 Agent / size/l | 限制 `grep_search` 输出大小，并提示模型缩小过宽搜索范围，解决长日志/压缩文件导致上下文膨胀问题 | [查看](https://github.com/google-gemini/gemini-cli/pull/30109) |
| #30470 | feat(core): add gemini-2.5-flash-image model config | 功能 / size/s | 新增 `gemini-2.5-flash-image`（Nano Banana）模型配置，支持 `TEXT` + `IMAGE` 响应模态，可通过 `--model` / `/model` 选择 | [查看](https://github.com/google-gemini/gemini-cli/pull/30470) |

---

## 功能需求趋势

从近 24 小时的 Issues 与 PR 中可观察到以下社区关注方向：

1. **Agent 稳定性与可恢复性**：子代理在超时（MAX_TURNS）、挂起（Generalist agent hangs）、Wayland 环境失败等场景下的异常处理与恢复机制是最高优先级需求。
2. **AST 感知的代码理解**：多个 Issue 探索 AST-aware 的文件读取、搜索与代码库映射，旨在减少 Token 消耗并提升代码定位精度。
3. **MCP 与扩展安全**：OAuth 令牌绑定、工具审批绑定、SSRF 防护、受信任工作区配置隔离等安全加固需求集中爆发，说明社区对供应链与数据外泄风险日益敏感。
4. **上下文与 Token 管理**：`grep_search` 输出大小限制、二进制负载驱逐、Tactful Extraction 等与上下文预算相关的优化持续受到关注。
5. **新模型多模态支持**：已有 PR 加入 `gemini-2.5-flash-image` 图像生成模型配置，表明社区期望 CLI 快速跟进新发布的多模态模型。

---

## 开发者关注点（痛点与高频需求）

- **子代理行为不可预测**：子代理在达到轮次上限后仍报告成功、不主动使用技能/子代理、Browser Agent 忽略 `settings.json` 覆盖等问题，导致开发者难以信任 Agent 的自主执行结果。
- **交互卡死与崩溃**：通用代理无限挂起、`get-shit-done` 输出钩子导致 CLI 崩溃、Web Search 无超时导致长时间阻塞，严重影响可用性。
- **配置与环境兼容性**：软链接代理未被识别、Wayland 下浏览器子代理失败、交互式提示（如 Vite 创建）导致卡死，反映出跨平台与配置继承边缘情况处理不足。
- **安全对齐**：模型可能执行破坏性 Git 操作（`git reset --force`），社区呼吁增加更强的安全拦截与用户确认机制。
- **任务追踪持久化**：当前 `WriteToDo` 仅依赖上下文内追踪，会话间丢失，开发者期望基于文件的 CRUD 任务追踪方案。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-26)

## 今日速览

OpenCode 社区今日活跃度较高，共 17 个 Issue 和 50 个 PR 获得更新，围绕 **Code Mode 可编程能力增强**、**桌面端稳定性修复** 以及 **多智能体协作设计** 展开讨论。当前暂无新版本发布，但多个核心功能（如 Code Mode 脚本持久化、桌面主题适配、ACP 技能发现）正处于活跃开发与社区反馈阶段。

---

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 关注点 | 链接 |
|---|------|------|--------|------|
| #12711 | [DESIGN]: Agent Teams — 扁平团队、命名消息、多模型支持与 TUI 集成 | CLOSED | 多智能体并行协作的顶层设计方案，讨论了子代理间通信与共享任务协调机制，社区参与度高（17 条评论、24 👍），是 OpenCode 未来多代理架构的重要参考。 | [查看](https://github.com/anomalyco/opencode/issues/12711) |
| #66299 | plugins: session prompt hook 在插件重启后静默停止触发 | CLOSED | 长期运行的 serve 进程中，插件重启后 `ctx.session.hook("prompt", ...)` 不再被调用且无错误日志，影响密钥脱敏等提示词转换插件。 | [查看](https://github.com/anomalyco/opencode/issues/66299) |
| #61899 | desktop: 集成终端中 Ctrl+C 无法中断运行中的进程 | OPEN | Windows 桌面端集成终端按 Ctrl+C 不会中断子进程（如 Python dev server），需强制结束，影响开发体验。 | [查看](https://github.com/anomalyco/opencode/issues/61899) |
| #61221 | Desktop/web: 聊天 Markdown 忽略主题 `--markdown-*` 颜色令牌 | OPEN | 桌面/Web 主题管线生成了完整的 Markdown CSS 变量，但渲染时未应用，导致输出单色，与 TUI 着色不一致。 | [查看](https://github.com/anomalyco/opencode/issues/61221) |
| #64792 | Anthropic Messages 协议未规范重叠片段边界（"reasoning start before end"） | OPEN | Gemini 3.x 模型在 Vercel AI Gateway 上因推理片段边界错误导致工具调用回合失败，会话停止且无法恢复。 | [查看](https://github.com/anomalyco/opencode/issues/64792) |
| #64034 | [FEATURE]: acp: 在 additionalDirectories 根目录中发现技能 | OPEN | ACP 协议扩展，建议将每个 `additionalDirectories` 根目录作为外部技能源，增强技能发现能力。 | [查看](https://github.com/anomalyco/opencode/issues/64034) |
| #66468 | [FEATURE]: 按日期组、项目或全局批量删除会话 | OPEN | 桌面端新增会话批量删除需求，提升长期使用后的会话管理效率。 | [查看](https://github.com/anomalyco/opencode/issues/66468) |
| #66455 | desktop: 移动会话后消息体渲染空白/裁剪（macOS） | OPEN | macOS 桌面端移动会话目录后，助手回复仅显示第一行，图片附件渲染为空白，会话内容不可读。 | [查看](https://github.com/anomalyco/opencode/issues/66455) |
| #44167 | [Nice To Have] 添加打开特定桌面会话的深度链接 | OPEN | 支持通过深度链接直接打开 OpenCode Desktop 中的特定会话，便于外部集成与快速访问。 | [查看](https://github.com/anomalyco/opencode/issues/44167) |
| #66421 | 重启 OpenCode 后使用限制似乎重置（继续同一会话） | CLOSED | 用户反馈达到使用限制后重启软件，限制计数被重置，涉及会话持久化与计费逻辑的一致性问题。 | [查看](https://github.com/anomalyco/opencode/issues/66421) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #66278 | feat(core): Code Mode 中引入 `agent()`、`llm()` 及结构化 JSON Schema 输出 | OPEN | 为 Code Mode 脚本增加子代理启动与等待能力，并通过 JSON Schema 校验模型返回结构化数据，避免脆弱的 JSON 解析（`codemode_agents` 后台开关）。 | [查看](https://github.com/anomalyco/opencode/pull/66278) |
| #66479 | feat(codemode): 可保存并带类型参数的可复用 Code Mode 脚本 | OPEN | 将一次性脚本改为可保存、可重复运行的 Code Mode 程序，支持类型化参数，适用于 GitHub/Slack/浏览器等自动化场景。 | [查看](https://github.com/anomalyco/opencode/pull/66479) |
| #66478 | feat(codemode): 耐久 Code Mode 执行（关机挂起、启动恢复） | OPEN | 利用 `program.suspend()`、`runtime.resume(state)` 等已有能力，实现脚本在关机时挂起、重启后恢复执行。 | [查看](https://github.com/anomalyco/opencode/pull/66478) |
| #66459 | feat(ui): 让主题为聊天 Markdown 上色 | OPEN | 修复 #61221，使桌面端聊天标题、粗体、斜体、行内代码、列表等遵循主题颜色令牌，不再单色渲染。 | [查看](https://github.com/anomalyco/opencode/pull/66459) |
| #66456 | feat(ui): Dracula 桌面主题遵循官方配色 | CLOSED | 将内置 Dracula 主题语法色与官方配色对齐，减少 UI 回退到通用颜色的情况。 | [查看](https://github.com/anomalyco/opencode/pull/66456) |
| #66469 | feat(server): 在 `/api/experimental/flag` 暴露已解析的功能标志 | OPEN | 新增按位置作用域的功能标志查询端点，便于前端与客户端动态感知实验性功能状态。 | [查看](https://github.com/anomalyco/opencode/pull/66469) |
| #66473 | refactor(core): 将 Drizzle SQLite 事务委托给 Effect SqlClient | CLOSED | 修复三个事务 Bug，删除约 90 行手写事务代码，事务默认行为改用客户端默认（`BEGIN IMMEDIATE`），无公开 API 变更。 | [查看](https://github.com/anomalyco/opencode/pull/66473) |
| #66471 | fix(core): 插件目录监听忽略 `node_modules` 和 `.git` | OPEN | 配置的本地插件目录递归监听时自动排除 `node_modules` 和 `.git`，避免不必要的文件变更触发重载。 | [查看](https://github.com/anomalyco/opencode/pull/66471) |
| #66461 | fix(core): 限制子代理继续会话 ID | OPEN | 将子代理继续会话 ID 模式从 `^ses` 约束为完整生成 ID，修复会话 ID 匹配问题，不改变共享 schema。 | [查看](https://github.com/anomalyco/opencode/pull/66461) |
| #66457 | feat(core): 在机器间直接复制、移动文件与转发端口 | CLOSED | 新增 `machine.copy`、`machine.move`、`machine.forward`/`unforward`，支持跨机器单文件传输与回环端口转发。 | [查看](https://github.com/anomalyco/opencode/pull/66457) |

---

## 功能需求趋势

从本日更新的全部 Issues 与 PR 中，可提炼出社区当前最关注的四个功能方向：

1. **Code Mode 可编程与持久化增强**  
   社区持续推动 Code Mode 从“一次性脚本”向“可复用、可持久、可编排”的自动化平台演进，核心诉求包括可保存脚本、带类型参数、子代理调用、结构化输出校验以及关机挂起/启动恢复。

2. **桌面端与 Web 端稳定性与主题一致性**  
   集成终端信号处理（Ctrl+C）、会话移动后渲染空白、外部链接横幅重复询问、Markdown 主题色令牌未生效等问题集中反映，桌面端用户体验是当前修复重点。

3. **多智能体协作（Agent Teams）架构设计**  
   虽为已关闭的设计 Issue，但社区对扁平团队、命名消息、多模型支持及 TUI 集成的讨论仍在延续，表明多代理并行协作是 OpenCode 中长期的产品方向。

4. **会话管理与 ACP 生态扩展**  
   批量删除会话、特定会话深度链接、ACP 在 `additionalDirectories` 中发现技能等需求，显示用户希望在大规模会话管理和外部技能集成上获得更强支持。

---

## 开发者关注点

- **插件系统可靠性**：长期运行进程中插件重启后 Hook 静默失效（#66299），开发者希望插件生命周期事件更可预测，并伴有适当错误日志。
- **跨平台终端行为**：Windows 桌面端集成终端中断机制不一致（#61899），以及无静默 Shell 模式（#66466），影响命令行工具集成体验。
- **提供商协议兼容性**：Anthropic Messages 推理片段边界错误导致会话中断（#64792），提示对第三方模型网关的协议适配仍需加强。
- **会话数据持久化一致性**：使用限制重启后重置（#66421）、子代理会话 ID 约束（#66461）等问题，涉及会话状态与计费逻辑的边界处理。
- **代码质量与重构**：近期多个 PR 集中在事务委托（#66473）、插件目录监听忽略（#66471）、

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期**: 2026-11-26  
**仓库**: NousResearch/hermes-agent  
**数据范围**: 过去 24 小时 GitHub 活动

---

## 1. 今日速览

Hermes Agent 发布了 canary 版本 **v0.23.4+canary.20261125T064800Z**，主要面向 macOS Apple Silicon 桌面端用户。社区当前高度集中在 **gateway 后端迁移（gateway migrate --backends）** 的后续修复上，多个 P2 级 Bug 涉及 systemd 服务迁移、Webapp 监听地址及认证 Cookie 失效；同时桌面端性能问题（state.db 大表写锁导致会话控制超时）成为亟待解决的核心痛点。

---

## 2. 版本发布

| 版本 | 发布时间 | 渠道 | 主要说明 |
|------|----------|------|----------|
| canary.20261125T064800Z-v0.23.4 | 2026-11-25 | Canary | Hermes Agent Canary 版本，提供 macOS Apple Silicon (M-series) DMG 安装包 |

**下载链接**: [Hermes Desktop DMG (macOS Apple Silicon)](https://hermes-assets.nousre...)  
**备注**: 该版本为 canary 频道，建议桌面端用户在测试环境中验证后再推广至生产。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 严重度/标签 | 核心内容 | 为何值得关注 | 链接 |
|---|------|-------------|----------|--------------|------|
| #159886 | whole-index routing save rewrites ~35k rows on every persist | P2, perf, gateway, sessions | 2.9 GB state.db 每次持久化重写约 3.5 万行，写锁持续 8.5 秒，导致 Desktop `session.control.read` 30 秒超时 | **性能瓶颈**，直接影响大规模会话下的桌面端可用性，需优化索引持久化策略 | [查看](https://github.com/NousResearch/hermes-agent/issues/159886) |
| #159419 | Gateway Move deletes legacy unit and reports success when systemd rejects stop/disable | P2, CLI, gateway, install-update | 系统集成层失败路径：systemd 拒绝 stop/disable 后，迁移仍报告成功并删除旧单元文件 | 可能导致服务状态不一致，属于**数据安全/部署可靠性**问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/159419) |
| #160209 | Tracking: backend migration follow-ups | P2, CLI, gateway, dashboard, webapp | `gateway migrate --backends` 及 "Move to a single Hermes" 卡片的后续 Bug 跟踪（EP-18，已在 v0.23.4 交付） | 当前迁移功能的**总括性追踪**，多个子问题集中在此 | [查看](https://github.com/NousResearch/hermes-agent/issues/160209) |
| #159606 | webapp.host on late-assigned address leaves Webapp down | P2, gateway, webapp | 网关启动时若 tailnet/DHCP 地址尚未分配，Webapp 永久下线直至手动重启 | 影响**动态网络环境**（Tailscale/Headscale/WireGuard）下的可用性 | [查看](https://github.com/NousResearch/hermes-agent/issues/159606) |
| #159500 | Webapp /login succeeds but session cookie authorizes nothing | P3, gateway, auth, sessions, webapp | 回环接口登录返回 200 并设置 Cookie，但后续 REST 请求均返回 401 | **认证链路断裂**，Webapp 受保护接口无法正常使用 | [查看](https://github.com/NousResearch/hermes-agent/issues/159500) |
| #160235 | Shutdown/restart notice tells user to send a message, but next start resumes automatically | Bug | 网关重启通知提示用户发送消息以恢复，实际下一次启动会自动续接中断的对话 | **用户体验不一致**，可能引发用户重复操作或困惑 | [查看](https://github.com/NousResearch/hermes-agent/issues/160235) |
| #129973 | 0.21.5 POSIX launcher: python3 -I -c shim breaks Herdr-style terminal agent detection | P2, CLI, install-update, macOS | `python3 -I -c` 移除了脚本路径 argv，导致 Herdr 等终端工作区管理器无法识别 Python 代理 | 影响**终端代理检测**，属于 0.21.5 的回归问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/129973) |
| #158686 | gateway migrate --backends: relaunched dashboard's bind address read as 127.0.0.1 | P2, CLI, gateway, macOS | 迁移时读取到错误的绑定地址，导致无法规划 dashboard 后端迁移 | macOS launchd 场景下的**迁移失败** | [查看](https://github.com/NousResearch/hermes-agent/issues/158686) |
| #147482 | Vertex Gemini thought summaries leak into the reply | P2, agent, provider/gemini, streaming | Gemini 思考摘要泄露到可见回复，Telegram 用户可见 `**Summarizing Trip Details**` 等内容 | **模型输出安全/合规**问题，思考过程不应直接暴露给终端用户 | [查看](https://github.com/NousResearch/hermes-agent/issues/147482) |
| #159853 | Desktop: add a GUI way to create Projects | P3, feature, desktop | 桌面端缺乏直接创建 Project 的 GUI 按钮，目前仅通过 Git 仓库自动发现或 CLI 创建 | **功能缺口**，桌面端工作流体验有待完善 | [查看](https://github.com/NousResearch/hermes-agent/issues/159853) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心变更 | 关联 Issue | 链接 |
|---|------|------|----------|------------|------|
| #160232 | fix(gateway): wait for a late-assigned webapp.host address at boot | OPEN | 启动时等待绑定地址可用（默认 20s 窗口，可通过 `HERMES_WEBAPP_ADDRESS_WAIT` 覆盖） | #159606 | [查看](https://github.com/NousResearch/hermes-agent/pull/160232) |
| #160226 | fix(webapp): honor verified login cookies on loopback Webapp listeners | OPEN | 回环接口上的 Webapp 认证 Cookie 端到端生效，修复 `/api/profiles`、`/api/auth/me` 等 401 问题 | #159500 | [查看](https://github.com/NousResearch/hermes-agent/pull/160226) |
| #160180 | fix(gateway): start/restart/stop platform adapter live on every surface | OPEN | 网关运行期即可动态启动/重启/停止单个平台适配器（Telegram、Webhook 等），无需重启整个网关 | — | [查看](https://github.com/NousResearch/hermes-agent/pull/160180) |
| #160231 | fix(tui_gateway): spare queued prompts from the reapers | OPEN | 修复 TUI 网关中孤儿回收器误杀排队提示的竞态，新增 600s 保留窗口 | — | [查看](https://github.com/NousResearch/hermes-agent/pull/160231) |
| #160230 | fix(desktop): keep the touch model picker usable with keyboard up | OPEN | 触摸设备下软键盘弹出时，模型选择器保持可用；跳过粗指针设备的搜索输入自动聚焦 | — | [查看](https://github.com/NousResearch/hermes-agent/pull/160230) |
| #160229 | fix(desktop): keep the composer usable on a short viewport | OPEN | 短视口（≤520px）下取消固定用户提示，避免占用垂直阅读空间 | — | [查看](https://github.com/NousResearch/hermes-agent/pull/160229) |
| #160228 | fix(desktop): normalize stored native images on transcript refresh | OPEN | 转录刷新时对原生图片消息进行归一化，避免重复或对比错误 | — | [查看](https://github.com/NousResearch/hermes-agent/pull/160228) |
| #160227 | fix(desktop): reconcile cached chat tails before acknowledging history | OPEN | 防止时间线刷新时重复最近一轮对话，修复本地缓存尾部与存储页面的对象识别冲突 | — | [查看](https://github.com/NousResearch/hermes-agent/pull/160227) |
| #160177 | fix(plugins): one unattended platform plugin install per home | OPEN | 平台插件自动安装时加锁串行化，避免两个安装器竞争导致误报失败并停止重试 | — | [查看](https://github.com/NousResearch/hermes-agent/pull/160177) |
| #160233 | plugin-catalog: add proactive-hermes | OPEN | 向插件目录添加 `proactive-hermes`，支持定时任务和用户订阅读取邮件、日历、Slack、Linear 等，仅将需要用户关注的内容推送至 Bot 聊天 | — | [查看](https://github.com/NousResearch/hermes-agent/pull/160233) |

---

## 5. 功能需求趋势

从近 24 小时的 Issues 和 PR 中，社区关注点呈现以下趋势：

1. **桌面端工作流增强**  
   用户强烈希望在 GUI 中直接创建 Project（#159853），并改进触摸/短视口下的模型选择器（#160230）和输入框体验（#160229），表明桌面端正从“技术预览”向“日常办公工具”转型。

2. **跨平台消息适配器的运行期动态管理**  
   #160180 实现了无需重启网关即可启停平台适配器，反映社区对 **Telegram、WhatsApp、Feishu、QQ 等即时通讯集成** 的稳定性和运维便捷性有更高要求。

3. **插件生态扩展**  
   `proactive-hermes`（#160233）和 `hermes-sentinel` 系列 PR 显示社区正在构建主动式助手能力（定时任务、邮件/日历监听）和运行期安全熔断机制。

4. **认证与会话持久性**  
   Webapp 回环接口 Cookie 失效（#159500）、会话状态数据库膨胀（#

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-26)

## 今日速览

OpenClaw 社区今日围绕 **v2026.11.10** 版本展开高强度修复与讨论，核心集中在会话状态注入缺陷、Workboard 调度逻辑漏洞及多端 UI 稳定性问题上。P0 级别的 `MEMORY.md` 静默排除问题持续发酵，成为当前最高优先级的安全与体验阻塞项；同时，智能口述（Dictation）相关功能提案密集涌现，显示社区对语音交互增强的关注度正在上升。

## 版本发布

### OpenClaw v2026.11.10
- **规模**：8,309 次提交 · 7,671 个 PR · 349 名贡献者
- **发布说明**：[Release notes](https://docs.openclaw.ai/releases/2026.11.10)
- 本版本为主版本更新，包含大量网关、客户端及代理相关的功能与修复。社区目前正在修复该版本中暴露出的多个 P0/P2 级缺陷。

### OpenClaw v2026.11.9（补充）
- 13 次提交 · 15 个 PR · 14 名贡献者
- 为 v2026.11.10 的前置小版本，主要包含稳定性补丁。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 关注理由 | 链接 |
|---|------|-------------|----------|------|
| #153426 | Curated memory roots (`MEMORY.md` / `USER.md`) 静默且永久排除于 bootstrap 注入 | P0, impact:session-state, impact:security, diamond lobster, ux-release-blocker |  provenance ratchet 机制导致 curated 文件被永久丢弃，无诊断、无 CLI、无恢复路径，直接影响代理记忆与用户配置，属安全与体验双重阻塞。 | https://github.com/openclaw/openclaw/issues/153426 |
| #158912 | MEMORY.md 2026.9.6 起不再在 bootstrap 注入，文档仍声明“会话开始时加载” | P0, impact:session-state, impact:security, ux-release-blocker | 文档与实际行为不一致，导致开发者误依赖已失效的注入机制，需同步修复代码与文档。 | https://github.com/openclaw/openclaw/issues/158912 |
| #204775 | Design: prepared-release updates（状态、所有权与计划） | P2, clawsweeper:needs-product-decision | 收集新更新路径的设计共识，避免多团队在同一文件上设计冲突，属架构层面协调议题。 | https://github.com/openclaw/openclaw/issues/204775 |
| #205625 | 失败运行的 claim 阻塞就绪卡片；调度静默跳过（无 startFailures） | P2, diamond lobster, impact:session-state | Workboard dispatch 在卡片 claim TTL 过期前静默跳过就绪卡片，导致任务无法启动且无错误记录。 | https://github.com/openclaw/openclaw/issues/205625 |
| #205626 | 缺失 card workspace 导致每次运行失败 'root dir not found'，原因未记录 | P2, diamond lobster, impact:ux-friction | 卡片创建时未校验工作空间路径，运行时直接失败且不记录原因，增加排查成本。 | https://github.com/openclaw/openclaw/issues/205626 |
| #205624 | Workboard 永不提升无父级 todo 卡片至 ready，dispatch 永不启动 | P2, diamond lobster, impact:ux-friction | 仅有父级的卡片才能正常调度，无父级 todo 卡片被永久阻塞，属逻辑缺陷。 | https://github.com/openclaw/openclaw/issues/205624 |
| #205627 | 命令超时仅在清理缓慢时报告为清理失败 | P2, diamond lobster, impact:ux-friction | 超时命令的真实失败原因被掩盖，误导用户排查方向。 | https://github.com/openclaw/openclaw/issues/205627 |
| #205642 | Provider prompt-image handoff 丢弃图像大小限制 | P3, impact:other | `imageMaxDimensionPx: 2400` 仍被按 1200 缩放，且返回的 JPEG 大于源文件，影响多模态输入质量。 | https://github.com/openclaw/openclaw/issues/205642 |
| #205632 | Settings agent selector 在代理列表加载时发生布局跳动 | P3, diamond lobster, impact:ux-friction | 触发区域从 26px 变为 54px 并左移 28px，导致导航布局偏移检查不稳定。 | https://github.com/openclaw/openclaw/issues/205632 |
| #205638 | 为活跃应用选择有界口述写入配置 | P3, off-meta tidepool | 社区提出的口述功能增强提案，允许按应用选择写入配置，反映语音交互定制化需求。 | https://github.com/openclaw/openclaw/issues/205638 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型/优先级 | 主要内容 | 链接 |
|---|------|-------------|----------|------|
| #205643 | fix: keep the Linux browser panel aligned at larger text sizes | 修复, P2 | 修复 Linux 下系统文本缩放导致嵌入式浏览器面板缩小并溢出聊天区的问题。 | https://github.com/openclaw/openclaw/pull/205643 |
| #205500 | fix(gateway): exclude browser UI pairings from silent-prune clustering | 修复, P2, 安全敏感 | 修复第二个 Control UI 浏览器配对静默删除首个配置文件设备配对的问题。 | https://github.com/openclaw/openclaw/pull/205500 |
| #205613 | fix: keep WebChat approvals from interrupting waiting turns | 修复, P1 | 修复 WebChat `/approve` 命令导致等待中回合失败（SQLite transcript changed）的问题。 | https://github.com/openclaw/openclaw/pull/205613 |
| #205605 | fix: keep Browser panel previews and addresses current | 修复, P2 | 修复 Lightpanda 会话预览报错、地址未更新及低分辨率帧被放大的问题。 | https://github.com/openclaw/openclaw/pull/205605 |
| #187252 | [2026.9.36] fix(ai): backport stateless reasoning replay guard to extended-stable | 回港, P1 | 将无状态推理回放守卫回港至 extended-stable 分支，保留原五行生产守卫。 | https://github.com/openclaw/openclaw/pull/187252 |
| #205629 | fix: explain why deep research stops before searching | 修复, P2 | 让深度研究在因规划问题过长而停止时，明确告知用户超出了哪个长度限制。 | https://github.com/openclaw/openclaw/pull/205629 |
| #205641 | fix: tell the agent which sub-agents a Stop cancelled | 修复, P2 | 修复点击 Stop 时，会话级 `sessions.abort` 未告知代理哪些子代理被取消。 | https://github.com/openclaw/openclaw/pull/205641 |
| #205640 | fix: dismiss an expanded table when its chat message is removed | 修复, P2 | 修复重置聊天时展开的 Markdown 表格残留并保持键盘焦点的问题。 | https://github.com/openclaw/openclaw/pull/205640 |
| #205623 | feat(android): add Talk status chimes | 功能, P2 | 为 Android Talk 手free 模式添加麦克风就绪与挂断状态提示音。 | https://github.com/openclaw/openclaw/pull/205623 |
| #205614 | fix: let Knowledge scribes read Slack on a schedule when set up from a remote Control UI | 修复, P1 | 修复从远程 Control UI 设置的 Slack 知识抄写员无法按计划读取 Slack 的问题。 | https://github.com/openclaw/openclaw/pull/205614 |

---

## 功能需求趋势

从近 24 小时的 Issues 中，社区功能需求呈现以下明显聚集方向：

1. **智能口述（Dictation）增强**：连续出现多条由 `@CompleteDotTech` 提交的功能提案，涵盖“有界写入配置选择”、“段落与列表的目标感知格式化”、“语音不流畅保守移除”、“授权工作空间词典”、“显式片段名称展开”、“区域感知标点与大写”。说明社区正在推动语音交互从基础转录向语义级编辑与企业级术语管理演进。

2. **可观测性与遥测**：#205637 提议为工具参数修复暴露无负载的 Prometheus 计数器，体现网关运维方对代理行为透明度的需求。

3. **会话状态与发布流程治理**：#204775 等议题表明社区希望在 prepared-release 更新路径上建立清晰的状态、所有权与计划机制，以降低多团队协作的设计冲突。

---

## 开发者关注点

1. **会话状态注入缺陷（P0）**：`MEMORY.md` / `USER.md` 被 provenance ratchet 静默永久排除，且文档未同步更新，开发者反映代理记忆丢失且无恢复手段，是当前最高优先级的修复项。

2. **Workboard 调度逻辑漏洞**：多条 P2 缺陷（#205625、#205626、#205624）指向 Workboard 卡片状态机与调度器的不一致，包括 claim 阻塞、工作空间缺失未记录、无父级卡片永不进入 ready 等，直接影响自动化任务的可靠执行。

3. **多端 UI 稳定性**：Linux 浏览器面板缩放对齐（#205643）、Settings agent selector 布局跳动（#205632）、WebChat 审批中断等待回合（#205613）等问题集中在前端交互层，开发者关注跨平台 UI 一致性。

4. **多模态输入质量**：图像大小限制被静默忽略（#205642）导致视觉模型输入异常，开发者要求 Provider 层严格遵守声明的图像

:::
