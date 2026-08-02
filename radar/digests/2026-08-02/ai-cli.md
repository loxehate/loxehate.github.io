# AI CLI 工具社区动态日报 2026-08-02

> 生成时间: 2026-08-02 00:39 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告（2026-08-02）

## 1. 生态全景

当前 AI CLI 工具已从"单点对话式辅助"全面转向"多代理编排与长会话工作流"，社区反馈集中在子代理调度可信度、上下文缓存效率、桌面端体验对齐三个方向。头部工具（Claude Code、Codex）用户基数大但进入稳定修复期，问题多发生在深度使用场景（数据损坏、登录态、权限持久化）；追赶者（Gemini CLI、Qwen Code、Reasonix）以高频版本迭代抢位，nightly/稳定版同步发布成为标配节奏。MCP 正从"可接入"走向"工程化治理"，统一市场、故障隔离、规模上限是多方共识方向。值得警惕的是，"静默行为"（模型静默替换、配置静默失效、用量静默消耗）正在成为社区信任的共性杀手。

## 2. 各工具活跃度对比

| 工具 | 24h Issue 活跃度 | 24h PR 活跃度 | 版本发布 | 迭代状态 |
|------|-----------------|-------------|---------|---------|
| Claude Code | 50 条更新，Top10 含 2 个新建 | 3 个更新（自动化脚本维护） | 无 | 稳定修复期 |
| OpenAI Codex | Top10，最强信号 #35058（44 评论 / 111👍） | 10 个更新，MCP 上限、TUI 和弦等 | 无 | 缺陷积压期 |
| Gemini CLI | Top10，P1 级子代理挂起/误报集中 | 10 个更新，含 thoughtSignature 回归修复 | v0.55.0-nightly | 高频迭代期 |
| DeepSeek Reasonix | Top10，桌面 UI 与更新链路问题为主 | 10 个更新，UI/更新/MCP 修复为主 | v1.19.0 稳定版 + preview.2 | 版本密集发布 |
| OpenCode | Top10，隐私争议 #39875（35👍）为当日最高 | 10 个更新，含统一插件市场 PR | v1.18.11 补丁版 | 生态扩张期 |
| Qwen Code | Top10，缓存复用讨论 #8279 → PR #8339 | 10 个更新，review/缓存/并发方向 | v0.21.3 稳定版 + nightly | 双轨快速迭代 |
| Hermes | 8 条 Issue 更新（全量列出） | 10 个 PR 重点（共 50 条更新） | 无 | 功能扩展期 |

## 3. 共同关注的功能方向

**① 上下文与提示词缓存优化（6/7 工具）**
- Qwen Code：#8279 聊天压缩复用主缓存、#8284 要求缓存命中率遥测、#4777 MCP 延迟工具列表导致缓存失效
- OpenCode：#23595 `<system-reminder>` 漂移使 llama.cpp 提示缓存失效
- Codex：#18490 请求"压缩上下文并执行计划"；#31033 将自动压缩定性为破坏会话
- Claude Code：#83225 桌面端缺少压缩入口且忽略 CLI 摘要
- 共性诉求：缓存过程要可观测、压缩语义要可控（压缩≠清空）。

**② 模型路由透明度与自定义 Provider（6/7 工具）**
- Claude Code：#83224 子代理被静默从 Fable 换到 Opus；#82466 settings.json 默认模型不生效
- Hermes：#71693 同 provider 切换模型时自定义端点被静默丢弃
- Codex：#29156 桌面端不支持 CLI 的自定义 model provider
- OpenCode：#40104 ByteDance Seed 非标准 reasoning 字段挂起；#27554 新增 LAN provider 自动发现
- Reasonix：v1.19.0 新增 Anthropic 与 Responses API 支持，走多供应商聚合路线
- 共性诉求：任何模型/端点变更必须显式可见，不得静默降级。

**③ 子代理/多代理编排可靠性（5/7 工具）**
- Gemini CLI：#22323 MAX_TURNS 误报 GOAL 成功（"假成功"）；#21409 generalist agent 无限挂起
- Claude Code：#74113 Windows 后台 agents 不投递最终报告
- Qwen Code：#8344 修复 fork 子代理互相看到同级指令
- Codex：#30977 父级 MCP 生命周期事件污染子代理历史
- Hermes：#43757 Responses API 跨轮次工具结果静默丢失
- 共性诉求：子代理状态报告必须真实可信，失败不能伪装成成功。

**④ MCP 工程化治理（5/7 工具）**
- Reasonix：#7155 单个 MCP server 握手失败阻塞整个应用；#7164 MCP 慢启动不再被反复杀死
- OpenCode：v1.18.11 修复 SSE 重连循环；#40108 统一插件市场
- Codex：#36534 MCP 目录条目上限提升至 2048
- Hermes：#64229 插件生命周期管理（注册、卸载回调、受监管任务）
- 共性诉求：MCP 需要故障隔离、规模上限、生命周期治理与统一分发渠道。

**⑤ 桌面端/IDE 与 CLI 功能对齐（5/7 工具）**
- Claude Code：#80279 桌面端丢失 Last Activity 过滤器；#83225 桌面端缺压缩功能
- Codex：#35058 VS Code Diff 视图崩溃（111👍）
- Gemini CLI：#28526 VS Code 插件 disposables 泄漏
- Hermes：#76476 自绘窗口控制修复 WSLg 问题
- Reasonix：#7131/#7157 桌面端 UI 渲染时序与菜单裁剪问题
- 共性诉求：桌面端不再是"附属品"，会话管理、模型配置、压缩等核心能力必须与 CLI 对齐。

## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线特征 | 典型用户 |
|------|---------|-------------|---------|
| **Claude Code** | 专业开发者主力 agent | 深度会话管理 + 权限体系，功能最全但桌面端追赶 CLI | 企业级、长会话重度用户 |
| **OpenAI Codex** | ChatGPT 生态内的 IDE-first agent | 与 Pro 订阅/桌面应用深度绑定，VS Code 为第一入口 | ChatGPT 付费用户、IDE 工作流 |
| **Gemini CLI** | 可编排的多代理工作流平台 | Subagent/Skills 生态 + Auto Memory，EPIC 驱动（组件级评估、AST 感知） | 关注多代理编排与自主性的开发者 |
| **DeepSeek Reasonix** | 多供应商聚合的桌面优先客户端 | 同时接 DeepSeek/Anthropic/Responses API，桌面端密集修复 | 性价比敏感、多模型切换用户 |
| **OpenCode** | 开源可自托管的生态型 CLI | 社区插件市场 + LAN provider 发现，优化本地推理（llama.cpp 缓存） | 自托管、本地模型用户 |
| **Qwen Code** | 成本敏感型的工程化审查工具 | 提示词缓存复用为第一优先级，/review 自动化做深 | 追求 token 成本与审查质量的团队 |
| **Hermes** | 多渠道 agent 网关与记忆框架 | Slack/Discord/邮件多网关 + 本地语义记忆 provider，插件生产化 | 构建社交渠道/多智能体应用的开发者 |

## 5. 社区热度与成熟度

**社区规模与声量最大：Claude Code 与 OpenAI Codex。** Codex #35058 以 44 评论 + 111👍 成为当日最强问题信号，说明其 VS Code 用户群基数大、期待高；Claude Code 24h 内 50 条 Issue 更新，且问题集中在登录、数据完整性等深度使用场景——这是成熟产品才有的问题类型。

**处于快速迭代期：Gemini CLI、Qwen Code、Reasonix、OpenCode。** Gemini nightly 发布 + P1 bug 快速标记；Qwen Code 同日发布 stable 与 nightly 双版本，#8279 设计讨论当天催生 #8339 实现 PR，社区响应速度极快；Reasonix 稳定版与 preview 双渠道并行；OpenCode 以补丁版和大型架构 PR（统一市场）并进。

**工程活跃但社区声量偏小：Hermes。** 50 条 PR 更新显示工程投入充足，但 Issue 仅 8 条，用户反馈池有限，且 #43757（工具结果丢失）近两个月未修复，需警惕"功能扩张快于稳定性收敛"。

**成熟度梯队排序：** Claude Code（最成熟，问题最深）→ Codex / Gemini CLI（用户量大、P1 积压并存）→ Qwen Code / Reasonix / OpenCode（快速追赶、偶发回归）→ Hermes（生态早期）。

## 6. 值得关注的趋势信号

**① "可验证的完成"取代"声明的完成"。** Gemini #22323 子代理触顶误报 GOAL、OpenCode #32149 静默无响应、Hermes #43757 工具结果静默丢失——多工具出现"假成功/假死"问题，社区要求 agent 对自身局限保持诚实。对开发者：在选择工具时，应优先考察子代理状态报告的可追溯性（如是否暴露中间轨迹、终止原因）。

**② 提示词缓存正在成为新的性能战场。** Qwen Code 将缓存命中率提出为"一等遥测信号"（#8284），OpenCode 要求固定 system-reminder 位置以保缓存（#23595），Codex 用户要求"压缩而非清空"上下文（#18490）。token 成本与延迟已取代功能可用性，成为长会话场景的首要矛盾。

**③ 模型路由的"静默行为"正在反噬信任。** Claude 子代理被静默换模型（#83224）、Hermes 自定义端点被静默覆盖（#71693）、OpenCode 用量一夜飙至 97%（#36528 同源问题在 Codex）——模型层面的任何自动降级/替换，若无显式日志与通知，都将直接损害产品可信度。决策者应将"模型路由可观测性"纳入工具选型评估项。

**④ MCP 从协议标准走向治理时代。** 故障隔离（Reasonix #7155）、规模上限（Codex #36534）、统一市场（OpenCode #40108）、生命周期管理（Hermes #64229）——MCP 生态正在从"能连就行"进入"可运维、可治理、可发现"阶段，这对依赖 MCP 构建工具链的团队是明确的架构信号。

**⑤ 桌面端与 CLI 的双轨体验落差成为普遍短板。** 五个工具同日出现桌面端功能缺失、崩溃或与 CLI 行为不一致的问题（Claude #80279/#83225、Codex #35058、Reasonix #7131、Hermes #76476）。对采用混合工作流的团队，需警惕"CLI 可用但桌面端不可用"带来的流程断裂。

**⑥ 安全防护机制本身正在被审计。** Codex 社区报告 Sol 模型在误判后删除生产目录（#36522）、auto-review 将授权变成无限确认循环（#36501）——随着 agent 自主性提升，安全机制不能只防外部风险，还要防自身误判。开发者应在沙箱/审批链之外，为关键工具建立独立的操作审计与回滚预案。

---

*本报告基于 2026-08-02 各工具 GitHub 公开社区数据（Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenCode、Qwen Code、Hermes）整理生成，所有引用 Issue/PR 编号均可溯源。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截至：2026-08-02 | 数据源：github.com/anthropics/skills**

---

## 一、热门 Skills 排行（Top 8，按讨论活跃度）

本仓库 50 条 PR 全部处于 **OPEN** 状态，以下按关注度排序：

| # | Skill / PR | 功能 | 社区热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 评估工具链修复**（[#1298](https://github.com/anthropics/skills/pull/1298)） | 修复 `run_eval.py` 恒报 recall=0% 的根因：将评估产物安装为真实 skill，并修复 Windows 流读取、触发检测、并行 worker | 直接回应 #556（12 评论、7 👍）。同类修复另有 #1099/#1050/#1323/#1261 四个独立 PR 从不同角度修同一脚本——**评估循环"对着噪声优化"已成 meta 层公害** | OPEN |
| 2 | **document-typography**（[#514](https://github.com/anthropics/skills/pull/514)） | AI 生成文档的排版质量控制：孤词换行、段落孤行、标题滞留页底、编号错位 | 罕见聚焦"文档美观度"的技能，直击 AI 文档"能用但不好看"的普遍痛点 | OPEN |
| 3 | **pdf 大小写引用修复**（[#538](https://github.com/anthropics/skills/pull/538)） | 修复 SKILL.md 中 8 处大小写不一致的文件引用（`REFERENCE.md`→`reference.md`），解决大小写敏感系统上的加载失败 | 社区对"基础 skill 可用性优先于新增功能"的态度鲜明；同类还有 docx 的 w:id 冲突修复（#541） | OPEN |
| 4 | **ODT / OpenDocument**（[#486](https://github.com/anthropics/skills/pull/486)） | 创建、填充、读取 .odt/.ods，支持 ODT 转 HTML | 补全开源/ISO 标准办公文档生态，与现有 docx/pdf 形成文档技能矩阵 | OPEN |
| 5 | **frontend-design 改进**（[#210](https://github.com/anthropics/skills/pull/210)） | 修订前端设计技能，确保每条指令"在单次对话内可执行"，提升可操作性 | 代表**存量 skill 质量打磨**的需求方向，而非一味新增 | OPEN |
| 6 | **skill-quality-analyzer + skill-security-analyzer**（[#83](https://github.com/anthropics/skills/pull/83)） | 元技能双打包：五维技能质量评估（结构/文档/示例等）+ 技能安全分析 | 首次出现"分析技能的技能"，回应社区对质量与安全的双重诉求，方向开创性强 | OPEN |
| 7 | **self-audit**（[#1367](https://github.com/anthropics/skills/pull/1367)） | 交付前审计：先机械验证输出文件，再按损害严重度做四维推理质量审查，通用设计 | 与 #1385（推理质量门禁提案）形成呼应，"交付质量门禁"成为新热点主题 | OPEN |
| 8 | **testing-patterns**（[#723](https://github.com/anthropics/skills/pull/723)） | 全栈测试技能：Testing Trophy 模型、单元测试 AAA 模式、React 组件测试 | 覆盖"该测什么 vs 不该测什么"的决策层，社区对测试生成与策略指导需求明确 | OPEN |

---

## 二、社区需求趋势（来自 Issues）

| 趋势方向 | 代表 Issue | 热度 | 说明 |
|---|---|---|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492)：社区技能借 `anthropic/` 命名空间分发，构成信任边界滥用 | 43 评论（全场最高）、2 👍 | 最受关注议题，要求官方治理命名空间与分发机制 |
| **组织级技能共享** | [#228](https://github.com/anthropics/skills/issues/228)：企业内技能库/直链分享，免去手动下载上传 | 16 评论、8 👍（最高赞） | 企业落地的核心阻塞点，需求强烈 |
| **工具链可靠性** | [#556](https://github.com/anthropics/skills/issues/556)（eval 0% 触发率）、[#1061](https://github.com/anthropics/skills/issues/1061)（Windows 兼容）、[#1169](https://github.com/anthropics/skills/issues/1169)（recall=0%） | 合计 18+ 评论、10 👍 | **skill-creator 在非 macOS 环境近乎不可用**，已衍生 5 个修复 PR |
| **上下文窗口安全** | [#1487](https://github.com/anthropics/skills/issues/1487)：claude-api 技能单次注入 ~156k tokens | 4 评论 | 新出现的"技能体积失控"问题，威胁长会话稳定性 |
| **技能管理稳定性** | [#62](https://github.com/anthropics/skills/issues/62)（技能消失）、[#189](https://github.com/anthropics/skills/issues/189)（插件重复安装） | 16 评论、11 👍 | 用户对本地技能资产的信任感受损 |
| **新技能方向** | [#1329](https://github.com/anthropics/skills/issues/1329) **compact-memory**（符号化压缩代理记忆）、[#412](https://github.com/anthropics/skills/issues/412) **agent-governance**（代理安全治理）、[#1385](https://github.com/anthropics/skills/issues/1385) **推理质量门禁管道** | 合计 19 评论 | 新提案集中在**记忆管理**与**质量/安全治理**两大主题 |
| **平台集成** | [#16](https://github.com/anthropics/skills/issues/16)：Skills 暴露为 MCP；[#29](https://github.com/anthropics/skills/issues/29)：Bedrock 支持 | 8 评论 | 生态互操作需求长期存在 |

**小结**：新技能方向的需求从"文档/办公/创意"逐步转向**记忆管理、代理治理、质量审计**等"AI 自身运维"类主题；同时大量社区精力被工具链可靠性问题消耗。

---

## 三、高潜力待合并 Skills（均为 OPEN）

| 类别 | Skill / PR | 潜力依据 |
|---|---|---|
| 核心修复（最可能快速合并） | [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 0% recall 修复 | 修的是评测工具"对着噪声优化"的根因，收益面覆盖所有 skill 作者 |
| 小步高价值修复 | [#538](https://github.com/anthropics/skills/pull/538) pdf 大小写、[#541](https://github.com/anthropics/skills/pull/541) docx w:id 冲突、[#539](https://github.com/anthropics/skills/pull/539) YAML 未引号警告 | 改动 1–8 行、问题明确、风险低，合并概率高 |
| 功能型新技能 | [#1302](https://github.com/anthropics/skills/pull/1302) **color-expert**、[#525](https://github.com/anthropics/skills/pull/525) **pyxel 复古游戏**（作者即 Pyxel 之父 @kitao）、[#1479](https://github.com/anthropics/skills/pull/1479) **plan-file-hygiene** | 作者持续更新（最近更新 07-15 ~ 07-27），且 #525/#1302 均绑定成熟开源项目，实用性强 |
| 元技能方向 | [#83](https://github.com/anthropics/skills/pull/83) 质量/安全分析器 | 开创"技能治理技能"赛道，与 #492 安全议题互相印证，官方可能优先吸纳 |
| Windows 修复竞品 | [#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050)、[#1261](https://github.com/anthropics/skills/pull/1261) | 三个 PR 修复同一批 Windows/并行问题，官方可能合并其一或整合方案 |

---

## 四、Skills 生态洞察

**一句话总结**：当前社区对 Skills 生态最集中的诉求是"**先治理、再扩展**"——以 #492 命名空间信任滥用和 #1487 上下文窗口注入为代表的安全治理、以 #556/#1061 为代表的全平台工具链可靠性，是压倒性的两大痛点；新技能方向的讨论热度（记忆管理、质量审计、测试）均低于对官方基础设施治理的呼声，社区期待 Anthropic 优先修复 skill-creator 评估链路并建立安全分发机制，而非继续堆叠新技能。

---

# Claude Code 社区动态日报 — 2026-08-02

## 今日速览

过去 24 小时无新版本发布，社区热度集中在三件事：**OAuth 登录循环**（#77966，19 条评论）、**2.1.217 回归导致 "Last Activity" 过滤消失**（#80279，10 条评论），以及**会话重命名导致转录永久损坏**（#73638）的严重数据完整性问题。此外，Fable 模型相关的新争议开始浮现：默认模型设置失效与子代理被静默切换模型。

---

## 社区热点 Issues

过去 24 小时共有 50 条 Issue 更新，以下 10 条最值得关注：

**1. OAuth 登录循环：state 参数在重定向后丢失** [#77966](https://github.com/anthropics/claude-code/issues/77966)
- 作者 @paweber | 评论 19 | 👍 13
- **概述**：Linux/IntelliJ 平台上，Claude 账号登录在 "sign in again to continue" 重定向后丢失 `state` 参数，陷入无限 OAuth 循环。
- **重要性**：登录是高频阻塞入口，跨平台影响面大，19 条评论说明大量用户复现，是目前社区最活跃的 Issue。

**2. 2.1.217 回归：Project 分组下 "Last Activity" 过滤器消失** [#80279](https://github.com/anthropics/claude-code/issues/80279)
- 作者 @Remenua | 评论 10 | 👍 13
- **概述**：桌面应用自动更新 2.1.209 → 2.1.217 后，按项目分组时侧边栏的 "Last Activity" 过滤器消失（按日期分组时仍存在）。
- **重要性**：典型版本回归，功能被静默移除。10 条评论与 13 个赞表明用户对会话管理功能依赖度高。

**3. 会话重命名注入伪用户轮次，永久损坏转录（400 错误）** [#73638](https://github.com/anthropics/claude-code/issues/73638)
- 作者 @mmartinez-infra | 评论 8 | 👍 0
- **概述**：在 `server_tool_use` 调用进行中重命名会话，会在转录中注入一条合成 `system-reminder` 作为用户轮次，插在工具调用块与结果块之间，导致该会话后续所有 prompt 均返回 400。
- **重要性**：虽然 👍 数不高，但这是**永久性数据损坏**问题——一旦触发，整个会话报废，且用户无法自行修复。

**4. Windows 后台 agents 频繁空闲，不投递最终 SendMessage 报告** [#74113](https://github.com/anthropics/claude-code/issues/74113)
- 作者 @lebaige | 评论 6 | 👍 5
- **概述**：后台子代理任务完成后经常进入空闲状态，最终报告不投递，需用户手动 re-ping 才能恢复。
- **重要性**：影响多代理工作流的可靠性，Windows 平台特有的子代理调度问题。

**5. 子代理被静默切换模型：Fable 请求实际运行在 Opus 上** [#83224](https://github.com/anthropics/claude-code/issues/83224)
- 作者 @nmiller0113 | 评论 0 | 今日新建
- **概述**：显式指定 `model: "fable"` 的子代理，第一个请求之后全部被换成 `claude-opus-5`，无任何警告或日志。作者指出这并非容量限制问题。
- **重要性**：模型静默替换涉及成本与行为双重不可控性，且当前 0 评论说明该问题尚未获得官方回应。今日新建，需密切关注。

**6. 桌面应用无法使用部分压缩功能，CLI 创建的摘要被忽略** [#83225](https://github.com/anthropics/claude-code/issues/83225)
- 作者 @zack12212000 | 评论 0 | 今日新建
- **概述**：桌面应用没有任何 "Summarize up to here" 的 UI 入口，CLI 创建的压缩摘要被桌面端忽略，Rewind 对话框仅支持整体恢复。
- **重要性**：桌面端与 CLI 功能不对齐的新案例，影响依赖 1M 上下文的长会话用户。

**7. Windows 桌面崩溃导致 MSIX 包卡死，恢复过程中本地数据丢失** [#81306](https://github.com/anthropics/claude-code/issues/81306)
- 作者 @NavarreDR | 评论 4
- **概述**：桌面应用崩溃后 MSIX 包损坏，手动卸载恢复时丢失了本地应用数据（Code 页签分组、crash dumps）。
- **重要性**：崩溃恢复路径不保留本地数据，属于数据安全类问题，Windows 用户需警惕类似情况。

**8. settings.json 默认模型 "claude-fable-5[1m]" 不生效** [#82466](https://github.com/anthropics/claude-code/issues/82466)
- 作者 @Alex-Kanashiro | 评论 3 | 👍 1
- **概述**：全局 `settings.json` 中已配置默认模型，但新会话仍启动在别的模型上，`/model` 也无法可靠切换。
- **重要性**：新模型上线后的配置兼容性问题，直接影响已订阅 Fable 模型的用户。

**9. macOS 桌面会话：AskUserQuestion 权限请求永不发出** [#81607](https://github.com/anthropics/claude-code/issues/81607)
- 作者 @ufukdikci | 评论 1
- **概述**：桌面主机会话中，`AskUserQuestion` 权限请求从不触发，导致每次调用都孤儿化 `tool_use` 并中止当前轮次。作者复现了 7/7 次。
- **重要性**：权限系统核心交互在 macOS 桌面端的阻断性问题，严重干扰需要用户交互的自动化流程。

**10. Chrome 扩展 "Always allow" 权限被持久化为 "once"** [#74715](https://github.com/anthropics/claude-code/issues/74715)
- 作者 @kir-kopylov | 评论 3
- **概述**：Claude-in-Chrome 的站点权限 "Always allow" 总是被持久化为 `duration: "once"`，导致批准列表始终为空，每个浏览器操作都重复弹窗询问。
- **重要性**：权限偏好持久化失效，影响浏览器扩展的日常使用体验，属于长期未修复的交互缺陷。

---

## 重要 PR 进展

过去 24 小时仅 3 个 PR 更新（均由 @Yigtwxx 提交，与 Issue 自动化脚本维护相关）：

**1. fix: repair issue-automation telemetry and dead days_back input** [#77442](https://github.com/anthropics/claude-code/pull/77442)
- **内容**：修复 issue 自动化工作流的三处问题：dedupe 工作流中 Statsig 事件时间戳错误地被标记为 1970 年；`days_back` 输入参数失效；以及另外一处未详细说明的小修复。

**2. docs(plugins): sync security-guidance listing with v2.0.0 plugin manifest** [#77439](https://github.com/anthropics/claude-code/pull/77439)
- **内容**：安全指南插件已在 #62586/#62592 被重写为 v2.0.0，但 `marketplace.json` 和文档仍描述旧版 v1.0.0。此 PR 同步了版本号与描述，使插件清单与文档保持一致。

**3. fix(ralph-wiggum): make stop hook's jq error handling reachable under set -e** [#77443](https://github.com/anthropics/claude-code/pull/77443)
- **内容**：修复 `ralph-wiggum` 插件 stop-hook 的一个 shell 脚本缺陷：脚本在 `set -euo pipefail` 下运行时，`jq` 解析失败会直接导致脚本退出，错误处理分支永远不可达。修复后解析失败时能正确输出友好提示。

---

## 功能需求趋势

从近期 Issues 中提炼出的社区关注方向：

1. **认证与账号流程稳定性** — OAuth state 参数丢失（#77966）说明认证链路的容错能力不足，多平台（Linux/IntelliJ）下表现不稳定。

2. **桌面应用与 CLI 功能对齐** — Session 过滤（#80279）、部分压缩功能（#83225）在桌面端缺失或被忽略，用户期望桌面端与 CLI 具备同等的会话管理能力。

3. **模型选择的透明性与可控性** — 默认模型不生效（#82466）、子代理模型被静默替换（#83224）指向同一诉求：**模型路由行为应可预测、可观测，任何降级/替换必须显式告知用户**。

4. **子代理任务可靠性** — 后台 agents 空闲、最终报告不投递（#74113）表明多代理编排的调度与消息投递机制需要加固。

5. **权限系统的持久化与可靠性** — "Always allow" 失效（#74715）、AskUserQuestion 不触发（#81607）说明权限链路的两个环节（持久化、UI 触发）均存在缺陷。

6. **数据安全与会话完整性防护** — 会话重命名损坏转录（#73638）、崩溃恢复丢失本地数据（#81306）——用户对会话数据的**永久性损害**零容忍，期望更强的防护性设计与自动备份机制。

7. **可观测性提升** — statusLine 缺少 `seven_day_sonnet` 等字段（#69791 已关闭）、诊断信息误导（#82931）表明开发者希望更丰富的遥测字段和更清晰的错误归因。

---

## 开发者关注点

- **登录阻塞**：OAuth 循环是当前最痛的入口问题，影响所有需要重新认证的用户，社区已有 13 个 👍 表达共鸣。
- **数据不可逆损坏**：会话污染（#73638）与 MSIX 崩溃恢复导致数据丢失（#81306），这两类问题的共同点是——**一旦发生，用户无法自行恢复**，这类 issue 应获得最高修复优先级。
- **模型替换不可见**：#83224 指出子代理被静默从 Fable 换成 Opus，开发者担心这同时影响成本和输出行为，要求任何模型降级必须显式记录并通知。
- **回归事件频发**：#80279 显示 2.1.217 引入的功能回退，开发者希望官方为桌面端 UI 变更提供**变更日志**或**迁移指南**，避免功能无声消失。
- **权限偏好不持久**：“Always allow”被降级为一次性授权，等于每次操作都要重新确认，实际降低了自动化流程的可用性。
- **桌面端与 CLI 的双轨体验落差**：#83225 与 #80279 均属于同一主题——桌面应用在功能完整性上落后于 CLI，期望桌面团队补齐会话管理、压缩等高级功能的 UI 入口。

---
*数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) · 统计截止 2026-08-02*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-02

## 今日速览

过去 24 小时 Codex 仓库无新版本发布，社区讨论焦点集中在 VS Code 扩展 Diff 视图崩溃、Windows 桌面端进程泄漏与资源耗尽、以及速率限制用量异常等稳定性问题上。PR 方面，多个由 copyberry 驱动的内部重构与功能增强被合并或关闭，涵盖 TUI 交互、MCP 目录规模上限、插件包体积上限等方向，整体呈现「修内部架构、扩外部边界」的态势。

## 社区热点 Issues

以下为过去 24 小时内更新最频繁、关注度最高的 10 个 Issue：

### 1. Codex Diff 在 VS Code 中崩溃（#35058）
- **链接**: https://github.com/openai/codex/issues/35058
- **状态**: OPEN | 💬 44 条评论 | 👍 111 | 更新于 08-01
- **要点**: 在 macOS Apple Silicon + VS Code 1.128.0 环境下，Codex 编辑文件后打开 Diff 视图即报 "Oops, an error has occurred"，且在任何仓库（包括全新工作区）中稳定复现。这是目前社区反馈最激烈、影响面最广的扩展缺陷，已获 111 个 👍，用户基本无法审阅代码变更。

### 2. Windows 桌面端疯狂 fork taskkill.exe/conhost.exe（#33776）
- **链接**: https://github.com/openai/codex/issues/33776
- **状态**: OPEN | 💬 28 条评论 | 👍 26 | 更新于 08-01
- **要点**: ChatGPT.exe 在 Windows 上反复拉起数百个 taskkill.exe 与 conhost.exe 进程，诱发 WMI 故障风暴与 DWM 桌面合成器退化。单次受影响会话中累计产生 287 个失控进程，属于典型的桌面端资源泄漏问题。

### 3. Windows 安装程序在 UAC 弹窗之前即失败（#32149）
- **链接**: https://github.com/openai/codex/issues/32149
- **状态**: OPEN | 💬 29 条评论 | 👍 6 | 更新于 08-01
- **要点**: Windows 10/11 上安装程序在 UAC 提示前便崩溃，两种安装选项均不可用。这是一个阻塞性入门问题，直接影响新用户在 Windows 上的首次体验。

### 4. 内置图像生成反复报网络错误（#32297）
- **链接**: https://github.com/openai/codex/issues/32297
- **状态**: OPEN | 💬 21 条评论 | 👍 7 | 更新于 08-01
- **要点**: 7 月 9 日桌面端更新后，内置 imagen 图像生成功能持续报网络错误，对 Pro 订阅用户的生产力影响显著，且已持续近三周未修复。

### 5. MSIX 版缺少 Linux codex 二进制，WSL 模式不可用（#28103）
- **链接**: https://github.com/openai/codex/issues/28103
- **状态**: OPEN | 💬 7 条评论 | 👍 23 | 更新于 08-02
- **要点**: Microsoft Store/MSIX 版桌面应用缺少 app/resources 下的 Linux codex 二进制，导致 "Run agent in WSL" 功能直接报 "Unable to locate the Codex CLI binary"。虽然评论不多，但 👍 数高（23），是 Windows + WSL 开发者最关心的痛点。

### 6. 桌面端自定义模型供应商不可用（#29156）
- **链接**: https://github.com/openai/codex/issues/29156
- **状态**: OPEN | 💬 5 条评论 | 👍 17 | 更新于 08-01
- **要点**: CLI/TUI 可通过 model_providers 配置自定义模型，但桌面端无法以同样方式使用自定义 provider，且模型选择器与历史会话数据在自定义模型场景下存在冲突。高级用户对此呼声高。

### 7. 桌面端扫描全部 ~/.codex/sessions 导致卡顿（#20864）
- **链接**: https://github.com/openai/codex/issues/20864
- **状态**: OPEN | 💬 18 条评论 | 👍 5 | 更新于 08-01
- **要点**: 应用每次启动时全量扫描 sessions rollout 文件而非读取已有的索引/状态，导致 UI 变为幻灯片，会话越久越卡。

### 8. 【功能建议】Plan 模式增加 "Compact context and implement plan"（#18490）
- **链接**: https://github.com/openai/codex/issues/18490
- **状态**: OPEN | 💬 11 条评论 | 👍 4 | 更新于 08-02
- **要点**: 用户认可现有的 "Yes, clear context and implement plan" 选项，但希望新增「压缩上下文并执行计划」的选项，在执行计划的同时保留关键记忆，避免上下文被全部清空后丢失任务背景。

### 9. Pro 订阅一周用量一夜从 0% 飙到 97%（#36528）
- **链接**: https://github.com/openai/codex/issues/36528
- **状态**: OPEN | 💬 2 条评论 | 👍 0 | 更新于 08-02
- **要点**: 用户报告 2026-08-01 当天可见周用量从 0% 直接烧到 97%，且重置窗口不稳定。用量计量问题直接关乎用户成本，虽评论不多但性质严重。

### 10. OneDrive 托管工作区反复断连（#35420）
- **链接**: https://github.com/openai/codex/issues/35420
- **状态**: OPEN | 💬 22 条评论 | 👍 0 | 更新于 08-01
- **要点**: 当 Windows 工作区位于 OneDrive 同步目录且 OneDrive 状态降级时，Codex 流式请求反复报 "stream disconnected before completion"。对使用云同步目录的 Windows 用户影响大。

---

## 重要 PR 进展

以下为过去 24 小时内更新的 10 个值得关注的 PR：

### 1. MCP 目录条目上限提升至 2,048（#36534）
- **链接**: https://github.com/openai/codex/pull/36534
- **状态**: CLOSED | 更新于 08-01
- **内容**: 将分页 MCP 工具、资源和资源模板发现请求的最大收集条目数从 1,024 提升到 2,048。对使用大型 MCP server 的开发者是直接利好。

### 2. 支持双按键 TUI 和弦（#36511）
- **链接**: https://github.com/openai/codex/pull/36511
- **状态**: CLOSED | 更新于 08-01
- **内容**: TUI 键位配置现可接受 `ctrl-x ctrl-s` 这类双按键绑定，支持在活动 TUI 上下文中路由和弦、展示待定与已配置的和弦提示，并可通过 `Esc` 取消。CLI 重度用户操作效率将明显改善。

### 3. 跨 Prompt 保留已尝试工具元数据（#36507）
- **链接**: https://github.com/openai/codex/pull/36507
- **状态**: CLOSED | 更新于 08-01
- **内容**: 当输出被并入后续 prompt 时，重新挂接已记录的 executed_tool_calls 元数据；限制为 32 KiB，优先保留最近调用，并在截断时报告被省略的调用。有助于多轮对话中维持工具调用的可追溯性。

### 4. 远程插件包体积上限翻倍（#36485）
- **链接**: https://github.com/openai/codex/pull/36485
- **状态**: CLOSED | 更新于 08-01
- **内容**: 远程插件包下载上限从 50 MiB 提升至 100 MiB，解压后总大小上限从 250 MiB 提升至 512 MiB。生态插件可以做得更大更完整。

### 5. 将应用缓存逻辑抽取为 ConnectorRuntimeManager（#31471）
- **链接**: https://github.com/openai/codex/pull/31471
- **状态**: OPEN | 更新于 08-01
- **内容**: 将现有 Codex Apps 工具缓存迁移到 ConnectorRuntimeManager / ConnectorRuntimeContext 下，按账号、ChatGPT 用户、工作区账号模式和 Codex home 限定活动运行时上下文，并在上下文切换时丢弃过期缓存。这是一项持续进行的架构重构（faster-connectors 系列之一）。

### 6. 避免每次 TUI 重绘都查询终端尺寸（#36482）
- **链接**: https://github.com/openai/codex/pull/36482
- **状态**: CLOSED | 更新于 08-01
- **内容**: 在 resize 事件上携带尺寸信息，常规绘制复用缓存而非实时查询；在 resize 稳定、进程恢复及外部程序执行后刷新几何信息。属于 TUI 渲染性能优化。

### 7. 从 fork 子代理历史中移除父级 MCP 生命周期事件（#30977）
- **链接**: https://github.com/openai/codex/pull/30977
- **状态**: CLOSED | 更新于 08-01
- **内容**: fork 子代理时排除继承的 McpToolCallBegin/McpToolCallEnd 事件，保证父级 MCP 调用状态不会污染子代理历史，同时保留父 rollout 中的完整 MCP 记录，防止旧历史产生不对称生命周期。

### 8. 在审查会话上存储 guardian 转录边界（#15261）
- **链接**: https://github.com/openai/codex/pull/15261
- **状态**: OPEN | 更新于 08-01
- **内容**: 将父级转录检查点存入缓存 guardian 审查会话，后续审查只包含自上次终态审查以来的转录片段。提升多轮安全审查的准确性与效率。

### 9. 显式化用户输入阻塞行为（#36410）
- **链接**: https://github.com/openai/codex/pull/36410
- **状态**: CLOSED | 更新于 08-01
- **内容**: 新增必填的 isBlocking 字段，明确 request_user_input 请求是必须等待显式响应还是可自动解析；此前 autoResolutionMs 同时承担阻塞判定与超时策略，语义混乱。对客户端开发者是重要的 API 明确化。

### 10. 提取 exec-server 请求分发器（#36440）
- **链接**: https://github.com/openai/codex/pull/36440
- **状态**: CLOSED | 更新于 08-01
- **内容**: 将 JSON-RPC 请求、通知、响应、错误及畸形消息处理统一收敛到 RequestDispatcher，连接循环只负责接收事件与关闭连接。为后续 exec-server 的扩展与测试打基础。

---

## 功能需求趋势

综合当日全部 Issue，社区最关注的功能方向如下：

1. **IDE 集成稳定性（VS Code）** — #35058、#36016、#33859 显示 VS Code 扩展的 Diff 视图崩溃、后台代理面板不刷新等已成为高频痛点，IDE 体验是桌面开发者最敏感的一环。
2. **Windows 平台体验修复** — #32149（安装失败）、#33776（进程风暴）、#31989（0xc0000409 崩溃）、#28103（WSL 缺二进制）等多条 Windows 专属问题并行堆积，Windows 支持质量是当前最大短板。
3. **上下文管理能力增强** — #18490 请求「压缩上下文并继续执行」、#31033 反馈自动压缩破坏会话，社区希望 Codex 提供更精细的上下文控制手段（清晰 vs 压缩 vs 保留记忆）。
4. **自定义模型与供应商支持** — #29156 表明高级用户希望桌面端获得与 CLI 同等的自定义 model provider 能力，不再被绑死在官方模型目录。
5. **用量计量与速率限制透明度** — #35816、#36528 连续两天出现用量异常与重置窗口不稳的报告，用户对配额可见性、计量准确性提出了更高要求。
6. **TUI/CLI 交互打磨** — #36511（双按键和弦）、#13466（占位符任务感知）代表了 CLI 重度用户对操作效率与上下文感知的持续追求。
7. **本地数据规模治理** — #20864、#34268、#29007 均指向 session/线程元数据无界增长导致的桌面端卡顿与崩溃，存储与索引策略需系统性升级。

---

## 开发者关注点

- **Diff 视图崩溃是当前头号公敌**：#35058 评论数（44）与 👍 数（111）双高，且 #36016 报告了同一问题的不同版本。VS Code 用户已无法进行代码审阅，官方应优先定位。
- **Windows 进程泄漏与崩溃反复出现**：taskkill.exe 风暴（#33776）、0xc0000409 原生崩溃（#31989）、安装器崩溃（#32149）组合叠加，Windows 开发者对 Codex 桌面端的信任度正在下降。
- **用量消耗不透明引发恐慌**：一周额度 0% → 97%（#36528）、子代理审查/等待期间消耗 50% 额度（#35816），用户对「为什么消耗、何时重置、如何控制」缺乏掌控。这不仅影响续费意愿，也动摇了 Pro 用户对产品计费体系的信心。
- **上下文压缩/清理缺乏可预期性**：#31033 将自动压缩定性为 「RUINS SESSIONS」；#18490 提出折中方案——压缩而非清空。社区需要「可控、可预期、可追溯」的上下文缩减机制。
- **WSL 与自定义 provider 是高级用户的核心诉求**：#28103 的 WSL 二进制缺失问题已存在近两个月，严重阻碍 Windows 上的 Linux 开发工作流；#29156 则代表了 BYO-Model 用户对桌面端被「降级对待」的不满。
- **安全问题开始引起警觉**：#36522 报告 Sol 模型在误判 "local server not responding" 后删除了生产服务器目录、#36501 报告 auto-review 将明确授权转换成无限确认循环。随着 agent 自主性增强，安全防护机制的可信度成为新的社区焦点。

---

> 报告生成时间：2026-08-02 | 数据来源：github.com/openai/codex | 以上链接均可直接访问对应 Issue/PR 页面。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期：2026-08-02** | 数据来源：[github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 今日速览

- 发布 `v0.55.0-nightly.20260801`，重点修复容量耗尽导致的重试挂起以及空响应错误提示不明确两个核心问题。
- 社区讨论高度集中在 Subagent 可靠性上：MAX_TURNS 被误报为 GOAL 成功、Generalist agent 无限挂起、Skill/Sub-agent 使用意愿不足等高频问题持续发酵。
- PR 方面，修复 `functionCall thoughtSignature` 回归的 #28607 是今日最值得关注的技术修复，另有 VS Code IDE 插件 disposables 泄漏修复和环境变量加载顺序修复。

---

## 版本发布

### v0.55.0-nightly.20260801.gf47d6c6f7
> Release v0.55.0-nightly.20260801.gf47d6c6f7

**更新内容：**

- **fix(core):** 将容量耗尽（capacity exhaustion）归类为终止状态，防止重试无限挂起（[#28599](https://github.com/google-gemini/gemini-cli/pull/28599)，感谢 [@luisfelipe-alt](https://github.com/luisfelipe-alt)）。
- **fix(core,cli):** 将 InvalidStreamError 的详细信息传播到 UI，为空响应场景提供更明确的引导提示（[DavidAPierce](https://github.com/DavidAPierce)）。

---

## 社区热点 Issues

以下挑选了 10 个最值得关注的活跃 Issue，按优先级与讨论热度排序：

### 1. Subagent 到达 MAX_TURNS 却误报为 GOAL 成功
- **Issue:** [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
- **状态:** P1 Bug | 更新于 08-01 | 💬 12 评论 | 👍 2
- **要点:** `codebase_investigator` 子代理在触达最大轮次限制后，状态被上报为 `success`、终止原因为 `GOAL`，但实际未完成任何分析。这种"假成功"会直接误导主代理和用户，是典型的**状态报告可信度**问题。

### 2. Generalist agent 无限挂起
- **Issue:** [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
- **状态:** P1 Bug | 更新于 08-01 | 💬 8 评论 | 👍 8
- **要点:** 只要 Gemini CLI 将任务委派给 generalist agent 就会卡住，即使创建文件夹这类简单操作也要等一小时以上。用户反馈禁用 sub-agent 后问题消失。这是当前社区**抱怨最集中的挂起问题**（8 个 👍 说明影响面广）。

### 3. 组件级评估（Component Level Evaluations）EPIC
- **Issue:** [#24353](https://github.com/google-gemini/gemini-cli/issues/24353)
- **状态:** P1 Epic | 更新于 08-01 | 💬 7 评论
- **要点:** 后续跟踪 EPIC，目标是扩展行为评估体系。目前已积累 76 个 behavioral eval 测试并为 6 个 Gemini 模型运行，是团队内部驱动 **Agent 质量度量**的核心项目。

### 4. AST 感知文件读取/搜索/代码库映射调研
- **Issue:** [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
- **状态:** P2 Epic | 更新于 08-01 | 💬 7 评论 | 👍 1
- **要点:** 调研是否值得引入 AST 感知工具，以更精确地读取方法边界、减少 token 噪声、优化代码库导航。如果落地，将显著改善大代码库下的 Agent 效率。

### 5. Gemini 不使用自定义 Skills 和 Sub-agents
- **Issue:** [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
- **状态:** P2 Bug | 更新于 08-01 | 💬 6 评论
- **要点:** 用户反馈 Gemini CLI 几乎不会主动使用自定义 skills 和 sub-agents，即使已有相关技能（如 gradle、git）且描述明确。只有显式指令才会触发。这直接影响了 **Agent 自主性和技能生态价值**。

### 6. Shell 命令执行完成后卡在 "Waiting input"
- **Issue:** [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
- **状态:** P1 Bug | 更新于 08-01 | 💬 4 评论 | 👍 3
- **要点:** 执行简单 CLI 命令后，命令已结束但界面仍显示"Awaiting user input"并挂起。这属于**终端交互状态同步**问题，出现在极简单的 shell 命令上，频率较高，开发体验影响严重。

### 7. Auto Memory 无限重试低信号会话
- **Issue:** [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
- **状态:** P2 Bug | 更新于 08-01 | 💬 5 评论
- **要点:** Auto Memory 仅在提取 Agent 成功读到 transcript 时才将会话标记为已处理。低信号会话因被跳过而**永久留在待处理队列**，导致后台反复重试，浪费 token 与时间。

### 8. Browser Subagent 在 Wayland 下失败
- **Issue:** [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
- **状态:** P1 Bug | 更新于 08-01 | 💬 4 评论 | 👍 1
- **要点:** Linux Wayland 环境下 browser subagent 直接失败并终止，影响 Linux 用户的核心浏览器 Agent 功能。属于**环境兼容性**问题，牵涉底层显示服务器协议。

### 9. Auto Memory 需要确定性脱敏并降低日志量
- **Issue:** [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
- **状态:** P2 Bug | 更新于 08-01 | 💬 4 评论
- **要点:** Auto Memory 读取本地 transcript 并发送给提取模型，现有的脱敏指令是发送**之后**才生效；服务还可能记录敏感内容。这是**隐私与安全**类问题，社区关注度高。

### 10. `~/.gemini/agents/` 下 symlink 不被识别
- **Issue:** [#20079](https://github.com/google-gemini/gemini-cli/issues/20079)
- **状态:** P2 Bug | 更新于 08-01 | 💬 4 评论
- **要点:** 当 `~/.gemini/agents/filename.md` 是符号链接时，不被识别为合法 agent。对使用 dotfiles 管理工具（如 chezmoi、stow）的用户影响较大，核心是 **Agent 配置加载的弹性不足**。

---

## 重要 PR 进展

以下 10 个 PR 在过去 24 小时内有更新，按技术重要性排序：

### 1. 修复 `functionCall thoughtSignature` 丢失（400 错误回归）
- **PR:** [#28607](https://github.com/google-gemini/gemini-cli/pull/28607)（`area/agent`, size/m）
- **作者:** @sarbojitrana | 更新于 08-01
- **要点:** 修复 v0.53.0 引入的回归：`stripThoughts()` 在剥离思考内容时误删了 `functionCall` 的 `thoughtSignature`，导致 `API Error 400: Function call is missing a thought_signature`。关联修复 [#28604](https://github.com/google-gemini/gemini-cli/issues/28604)，基础根因为 [#28509](https://github.com/google-gemini/gemini-cli/pull/28509)。

### 2. 环境变量先于 settings 占位符解析加载
- **PR:** [#28597](https://github.com/google-gemini/gemini-cli/pull/28597)（size/l）
- **作者:** @WolfGreyDev | 更新于 08-01
- **要点:** 修复设置加载阶段的竞态条件：此前 system/user/workspace 设置文件在解析占位符时，局部 `.env` 尚未加载，导致占位符展开不正确。该 PR 调整加载顺序，确保 env 先就绪。**对使用 `.env` 管理配置的开发者很重要**。

### 3. VS Code IDE Companion 修复 disposables 泄漏
- **PR:** [#28526](https://github.com/google-gemini/gemini-cli/pull/28526)（`area/core`, size/s）
- **作者:** @godqu5qu-code | 更新于 08-01
- **要点:** 修复 `activate()` 中括号误用导致 `gemini.diff.accept` 命令和 `onDidChangeWorkspaceFolders` 的 Disposable 未正确注册。**VS Code 用户升级后注意检查扩展资源释放情况**。Fixes [#27790](https://github.com/google-gemini/gemini-cli/issues/27790)。

### 4. 为 Daemon 模式添加支持
- **PR:** [#21307](https://github.com/google-gemini/gemini-cli/pull/21307)（`area/non-interactive`, size/l, `help wanted`）
- **作者:** @kartikangiras | 更新于 08-01
- **要点:** 新增 daemon 模式 + 轻量客户端，以支持 shell-centric 工作流和保留上下文的快捷集成。该 PR 标记为 `help wanted`，**适合有意愿贡献的社区开发者**参与。

### 5. 用 `debugLogger` 替换 SDK 中的 `console.error`
- **PR:** [#28613](https://github.com/google-gemini/gemini-cli/pull/28613)（size/xs）
- **作者:** @kevinbenabdelhak | 更新于 08-01
- **要点:** 将 `packages/sdk/src/session.ts` 中的直接 `console.error` 替换为项目标准 `debugLogger`，并清理多余的 ESLint 禁用指令。属于**代码规范与可观测性改进**。

### 6. Nightly 版本自动升级
- **PR:** [#28612](https://github.com/google-gemini/gemini-cli/pull/28612)（size/s）
- **作者:** @gemini-cli-robot | 更新于 08-01
- **要点:** 版本号自动升级至 `v0.55.0-nightly.20260801.gf47d6c6f7`，与今日 Release 对应。

### 7. 更新 `.gitignore` 忽略 `.env` 和 `.ai` 文件
- **PR:** [#28619](https://github.com/google-gemini/gemini-cli/pull/28619)（priority/p1, size/m）
- **作者:** @zyntromedia | 更新于 08-01
- **要点:** 将 `.env` 与 `.ai` 文件加入 `.gitignore` 并补充单元测试。属于**仓库安全与规范化**改动。

### 8. 新增 GitHub 仓库连接 GCP 项目的脚本
- **PR:** [#28617](https://github.com/google-gemini/gemini-cli/pull/28617)（priority/p1, size/s）
- **作者:** @zyntromedia | 更新于 08-01
- **要点:** 通过 Google Cloud DevTools API 将 GitHub 仓库连接到 GCP 项目，属基础设施自动化辅助脚本。

### 9. 补充 fork 仓库工作流审批文档
- **PR:** [#28618](https://github.com/google-gemini/gemini-cli/pull/28618)（priority/p1, size/s）
- **作者:** @zyntromedia | 更新于 08-01
- **要点:** 编写文档说明 maintainer 如何审批来自 fork 仓库的 workflow 运行，改善**社区贡献流程体验**。

### 10. Codespace 未提交变更导出
- **PR:** [#28616](https://github.com/google-gemini/gemini-cli/pull/28616)（priority/p1, size/xs）
- **作者:** @zyntromedia | 更新于 08-01
- **要点:** 从 Codespace 导出的待提交变更集。提示：此类 PR 通常是**临时分支，需注意甄别**。

---

## 功能需求趋势

从过去 24 小时活跃的 Issues 中可以提炼出以下五个社区最关注的方向：

### 1. Subagent/Agent 状态报告的可信度与透明性
- 代表 Issue：[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)（MAX_TURNS 误报 GOAL）、[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)（subagent 轨迹应可通过 `/chat share` 查看）
- 趋势分析：社区不满足于"任务完成"这类单一声明，要求有**可验证的中间轨迹、真实的终止原因**。

### 2. Auto Memory 的智能与安全收敛
- 代表 Issue：[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)（低信号会话重试）、[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)（确定性脱敏）、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)（无效补丁隔离）
- 趋势分析：Auto Memory 从"能用"进入"**可控、不浪费资源、不泄密**"的第二阶段。

### 3. Agent 自主使用 Skill/工具的能力
- 代表 Issue：[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
- 趋势分析：自定义 skills 是 Gemini CLI 生态的重要差异化能力，但**模型不会自觉调用**是当前最大瓶颈。

### 4. 终端与 Shell 交互健壮性
- 代表 Issue：[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)（shell 命令卡 Waiting input）、[#21924](https://github.com/google-gemini/gemini-cli/issues/21924)（终端 resize 性能）
- 趋势分析：CLI 工具的本职是终端体验，多个 P1 级 bug 指向 **shell 命令生命周期管理和终端重绘**仍有明显短板。

### 5. Agent 行为的安全边界
- 代表 Issue：[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)（阻止破坏性 git 操作）、[#22093](https://github.com/google-gemini/gemini-cli/issues/22093)（subagent 未授权运行）
- 趋势分析：社区强烈要求 Agent 具备**"知道什么不该做"**的能力，包括 git reset/force 等危险操作需谨慎。

---

## 开发者关注点

### 高频痛点 TOP 5

| 痛点 | 相关 Issue | 影响 |
|------|-----------|------|
| Agent 无限挂起 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | 简单任务等待 1 小时，只能手动取消 |
| 状态"假成功"误导 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | 结果判断失效，下游决策被误导 |
| Shell 命令卡"Waiting input" | [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | 命令已完成但 UI 不释放，频繁出现 |
| 配置被静默忽略 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | settings.json 中的 maxTurns 等覆盖无效 |
| 工具数量超限报 400 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 超过 128/400 个工具时 API 直接拒绝 |

### 趋势总结

1. **"假完成"比"不完成"更危险**——开发者希望 Agent 对自身局限（如 token 上限）保持诚实，而不是伪装成功。
2. **配置与权限的确定性**——settings.json 失效、symlink 不被识别、subagent 无授权运行，都属于"**低层机制不可预期**"引起的信任问题。
3. **环境兼容性仍是硬伤**——Wayland 下的 browser agent 失败，加上 shell 挂起，说明 Linux/终端场景需要更多工程投入。
4. **代码质量 PR 活跃**——从 debugLogger 规范到 disposables 泄漏修复，说明项目正在**加固工程地基**，这对长期生态发展是积极信号。

---

*本日报由 AI 技术分析师基于 GitHub 公开数据自动生成，仅供参考。如需完整数据，请访问 [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)。*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报 — 2026-08-02

## 今日速览

Reasonix v1.19.0 稳定版正式发布，新增 DeepSeek Anthropic 与 Responses API 支持，并修复多项桌面 UI 问题；同时 v1.19.0-preview.2 修复了预览版 Desktop 编排器授权问题。社区方面，桌面端菜单裁剪、更新失败、MCP 故障导致应用无法启动等成为高频反馈点，多个相关修复 PR 已合入或待审核。

## 版本发布

### v1.19.0 稳定版（CLI + Desktop）
- **新增**：DeepSeek Anthropic 与 Responses API 支持
- **改进**：模型轮询性能；会话持久性与权限处理加固
- **修复**：多项桌面 UI 问题
- 发布渠道：稳定版
- [English Changelog](https://reasonix.io/changelog/v1.19.0/?lang=en) · [完整更新日志](https://reasonix.io/changelog/v1.19.0/)

### v1.19.0-preview.2 预览版
- 修复预览版 Desktop 编排器无法批准候选版本的授权问题
- 发布渠道：预览版
- [English Changelog](https://reasonix.io/changelog/v1.19.0-preview.2/?lang=en) · [完整更新日志](https://reasonix.io/changelog/v1.19.0-preview.2/)

---

## 社区热点 Issues（Top 10）

1. **macOS 模型下拉列表内容不显示**（#7131，已关闭）
   > 点击模型切换器后弹层不可见或位置错误，鼠标划过才显示。AnchoredPopover 渲染时序导致，已由 PR #7132 修复。
   - 评论 9 | 作者 @QingLong-C
   - [GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7131)

2. **v1.19.0 斜杠命令菜单被会话输出区域遮盖**（#7157，开启）
   > 输入 `/` 触发的命令列表弹窗被会话输出区域遮挡，影响命令发现与使用，Windows 桌面端复现。
   - 评论 2 | 作者 @JH-D-admin
   - [GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7157)

3. **更新失败：pending update already exists**（#7151，开启）
   > v1.18.0 检测到 v1.19.0 后点击“安装并重启”提示 prepare update 失败，阻塞用户升级路径。
   - 评论 1 | 作者 @JH-D-admin
   - [GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7151)

4. **TLS bad record MAC 导致流中断**（#7143，开启）
   > `api.deepseek.com/chat/completions` 返回 `remote error: tls: bad record MAC`，重试后仍断开，疑似网络代理或中间设备干扰。
   - 评论 2 | 作者 @yujianhui1993
   - [GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7143)

5. **远程 SSH/Workbench 授权失败**（#7107 / #7141，开启）
   > 连接远程 SSH 时报 `authenticated workbench peer identity changed during connection`，影响远程开发场景，多个用户报告。
   - 评论各 1 | 作者 @jsup5361、@hexiaodou
   - [#7107](https://github.com/esengine/DeepSeek-Reasonix/issues/7107) · [#7141](https://github.com/esengine/DeepSeek-Reasonix/issues/7141)

6. **React Error #310 崩溃**（#7162，开启）
   > 在 Provider 设置面板中渲染模型选择器时触发未处理 React 错误，导致应用崩溃。
   - 评论 1 | 作者 @sinomind
   - [GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7162)

7. **单个 MCP server 握手失败导致整个应用无法启动**（#7155，开启）
   > 全局配置中任一 stdio MCP server 初始化失败即阻塞整个 Reasonix 启动，缺少故障隔离机制。
   - 评论 0 | 作者 @Wangrb
   - [GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7155)

8. **需要支持更多思考等级**（#7148，开启）
   > 回归反馈：旧版可在模型设置中自定义 `max`、`xhigh` 等思考等级，v1.18.0 仅提供固定模板，希望恢复自定义。
   - 评论 2 | 作者 @a494032822
   - [GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7148)

9. **CLI 短参数 `-c` 静默失败**（#7156，开启）
   > `reasonix -c` 以退出码 2 无输出失败，而 `--continue` 正常，`run -c`、`code -c` 同样受影响。
   - 评论 0 | 作者 @best0127
   - [GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7156)

10. **希望增加一键 git 操作按钮**（#7121，开启）
    > 桌面版 git 只能查看更改，无法一键提交/拉取；用户建议参考 VS Code 的 IDE 模式，提升代码工作流效率。
    - 评论 2 | 作者 @LEEzeal-1984
    - [GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7121)

---

## 重要 PR 进展（Top 10）

1. **修复 AnchoredPopover 渲染时序，模型下拉菜单恢复可见**（#7132，已关闭）
   > 修复 #7131：布局未就绪时不再将浮层设为不可见，而是保持可见直到计算完成。
   - 作者 @QingLong-C
   - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7132)

2. **footer 溢出收敛到决策态，解除输入框 `/` 菜单裁剪**（#7128，已关闭）
   > 将 footer 的滚动/裁剪行为限定在决策态，同时保留 #7030 的修复，解决菜单只能弹出“一条”的问题。
   - 作者 @clearnature
   - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7128)

3. **修复遗留更新事务阻塞**（#7149，已关闭）
   > 启动前与每次安装前对废弃更新事务进行 reconcile：取消未触发的 prepare、回滚部分发布的单元、保留内容绑定的试用安装；并新增 macOS parent/child 就绪握手。
   - 作者 @SivanCola
   - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7149)

4. **修复 MCP 慢启动反复重启**（#7164，开启）
   > 交互式调用停止等待后，将共享 MCP 冷启动保留在会话生命周期中继续运行；新增 30 秒默认启动安全上限，支持全局与 per-server 覆盖。
   - 作者 @SivanCola
   - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7164)

5. **AutoContextWindow 正则推断 + Qwen/GLM/DeepSeek 模型预设刷新**（#7154，开启）
   > 新增从模型名推断上下文窗口的能力，并刷新模型预设，修复 Qwen 全部回退 128k 的问题（#7033）。
   - 作者 @clearnature
   - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7154)

6. **统一钱包余额与费用币种显示**（#7160，已关闭）
   > 修复状态栏中 USD 会话费用与 CNY 钱包余额同时出现、造成直接比较的误导问题，统一按所选定价币种展示。
   - 作者 @SivanCola
   - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7160)

7. **恢复 macOS 图标安全区**（#7123，已关闭）
   > 在 1024×1024 ICNS 画布内添加 macOS 专用的 824×824 安全区，Windows/Linux 图标资产不受影响；修复 Dock 栏图标偏大问题。
   - 作者 @LouF666
   - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7123)

8. **防止 GB18030 grep 截断导致 goroutine 泄漏**（#7147，已关闭）
   > 原生 GB18030 grep 达到 200 条匹配上限后，阻塞的管道写入者不再泄漏；新增截断路径回归测试。
   - 作者 @ShiroKSH
   - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7147)

9. **心跳任务面板左右分栏布局改造**（#7158，开启）
   > 将自动化任务面板从单栏改为左右分栏：左侧任务列表（scope 分组、折叠、搜索、状态过滤、立即运行），右侧任务详情/编辑器，适配复杂任务管理场景。
   - 作者 @ttmouse
   - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7158)

10. **Docs: 新增 Community plugins 页面**（#7166，开启）
    > 新增 `docs/PLUGINS.md`，提供 `[[plugins]]` 示例与发现列表，并从 README 导航链接；文档类变更，不涉及 Go 代码。
    - 作者 @kashifmahi
    - [GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7166)

---

## 功能需求趋势

- **全新模型 / API 支持**：v1.19.0 引入 Anthropic 与 Responses API，表明项目正在扩大模型后端兼容面，向多提供商聚合方向发展。
- **MCP 插件生态建设**：社区不满足于基础接入，开始要求“社区插件发现页”（#7165 / PR #7166）、慢启动保持（PR #7164）、故障隔离（#7155），MCP 正成为核心扩展路径。
- **更细粒度的模型行为控制**：自定义思考等级回归诉求（#7148）、按需配置上下文窗口（PR #7154），用户希望更精细地控制模型推理过程。
- **IDE / Git 工作流集成**：一键 git 操作（#7121）的诉求表明用户期望 Reasonix 桌面端承担更多日常开发工作，而非仅作为对话工具。
- **更广泛的平台覆盖**：Linux arm64（银河麒麟 / UOS）构建请求（#7145），国产化 OS 适配开始进入社区视野。

---

## 开发者关注点

- **更新链路可靠性**：#7151 的“pending update already exists”与 PR #7149 的修复显示，桌面端自动更新仍是痛感较强的环节，用户对升级失败容忍度低。
- **远程开发场景不可用**：#7107 / #7141 的 SSH/Workbench 授权失败直接阻断远程开发工作流，属于高优先级缺陷。
- **MCP 稳定性与隔离**：单个 MCP server 握手失败导致整个应用无法启动（#7155），被视为严重的健壮性问题；慢启动进程被反复杀死（PR #7164）也影响 MCP 使用体验。
- **网络层不确定性**：TLS bad record MAC（#7143）指向网络代理或中间设备兼容问题，用户希望客户端有更明确的错误提示与重试策略。
- **UI 细节打磨**：模型下拉列表不显示（#7131）、`/` 菜单被裁剪（#7157）、React #310 崩溃（#7162）等，说明桌面端 UI 在 v1.19.0 前后仍处于密集修复期，社区期望在这些点位上快速迭代。

---

*数据来源：GitHub esengine/DeepSeek-Reasonix，统计窗口 2026-08-01 至 2026-08-02。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-02）

## 今日速览

昨日发布补丁版本 v1.18.11，修复了 MCP SSE 重连循环与推理字段解析问题；社区层面，Go 订阅用户对隐私措辞及提供商署名被静默移除的质疑（#39875）以 35 👍 成为今日最高热度 Issue；同时多个 Provider 兼容性故障（opencode-go 挂起、ByteDance Seed 模型流式解析异常）引发开发者集中反馈，新提交的 unified marketplace PR（#40108）则展现了项目在插件生态上的新一轮整合动向。

## 版本发布

**v1.18.11**（[Release 链接](https://github.com/anomalyco/opencode/releases)）

- **Core 修复**
  - 修复 MCP SSE 连接在服务器返回错误后陷入重连循环的问题。
  - 修复使用 `reasoning_text` 或自定义字段名等交错推理字段的 provider 模型配置。
- **Desktop 修复**
  - 外部链接改为在系统浏览器中打开（原文截断，完整说明见 Release 页面）。

## 社区热点 Issues

1. **[#39875] 要求撤销 Go 隐私措辞与供应商署名的静默移除，并将遥测与留存写入隐私政策**（👍 35 · 评论 5）
   Go 订阅用户指出近两周的提交移除了 OpenCode 对 Go 服务的隐私表述与提供方归属，要求恢复并在隐私政策中明确遥测和数据留存策略。该 Issue 引用 #39860、#39857、#24649 等 5 个前置诉求，均未获实质回应，社区情绪可见一斑。
   https://github.com/anomalyco/opencode/issues/39875

2. **[#38281] 将 opencode-quota 加入生态页面插件列表**（👍 13 · 评论 1）
   社区维护的配额管理插件 `opencode-quota` 希望被官方生态页收录，以获得更广泛的曝光与用户信任。
   https://github.com/anomalyco/opencode/issues/38281

3. **[#23595] `<system-reminder>` 位置漂移导致 llama.cpp 提示缓存失效**（👍 11 · 评论 6）
   系统提醒被反复移动导致 prompt history 频繁变化，llama.cpp 无法命中缓存，产生大量不必要的预处理耗时。开发者建议固定 `<system-reminder>` 的位置以提升本地推理效率。
   https://github.com/anomalyco/opencode/issues/23595

4. **[#32149] OpenCode 处理请求后无响应**（👍 4 · 评论 9）
   应用进入 "thinking" 状态片刻后便停滞，不返回任何结果。该问题自 6 月 13 日创建至今仍在复现，已积累 9 条评论，是当前"请求无响应"类问题中讨论最活跃的一个。
   https://github.com/anomalyco/opencode/issues/32149

5. **[#20322] 原生自动记忆：跨会话学习能力**（👍 5 · 评论 8）
   提议为 OpenCode 增加跨会话持久化学习机制，引用 #16077、#8043、#9211 等先例，强调需要具体、聚焦的实现路径而非泛泛的记忆功能。
   https://github.com/anomalyco/opencode/issues/20322

6. **[#40095] opencode-go provider 在 IPv6 异常环境下静默返回空响应/挂起**（评论 1）
   内置 `opencode-go` provider（OpenCode Zen Go）在 IPv6 配置损坏的机器上无任何输出、无报错，`opencode run` 直接 exit 0；同机 `deepseek` provider 正常。开发者怀疑与网络栈故障处理有关（与已关闭的 #40065 同源）。
   https://github.com/anomalyco/opencode/issues/40095

7. **[#40104] ByteDance Seed 系列模型因非标准 reasoning 流式字段而挂起**（新 Issue）
   `bytedance-seed/seed-2.0-lite`、`seed-1.6` 等模型经 OpenRouter 使用时，流式响应中的 `reasoning`/`reasoning_details` 增量块导致 OpenCode 无限期挂起，需要协议适配处理。
   https://github.com/anomalyco/opencode/issues/40104

8. **[#29740] OpenCode + Qwen3.6 无法读取图片**（👍 2 · 评论 4）
   同为 Qwen 3.6 模型，Claude Code 可正常读图，OpenCode 却不行。用户希望官方跟进多模态输入兼容性。
   https://github.com/anomalyco/opencode/issues/29740

9. **[#27837] Web UI 左侧会话列表为空（web server 模式）**（👍 2 · 评论 5）
   `opencode --web` 下左侧会话列表始终为空，尽管 `/api/session` 接口返回正常。该问题被定位到前端 SSE 事件驱动的加载逻辑，在 `server.connected` 后未正确遍历会话数据。
   https://github.com/anomalyco/opencode/issues/27837

10. **[#40106] Desktop：空输入框按 Enter 不应发送/中断任务**（新 Issue）
    Windows 桌面端在输入框为空时按 Enter 会触发消息发送，若此时 Agent 正在执行任务，误触将直接中断。用户希望空输入时禁用发送快捷键。
    https://github.com/anomalyco/opencode/issues/40106

## 重要 PR 进展

1. **[#40108] feat(opencode): 统一插件市场（unified marketplace）**（开放中）
    采用更广泛的包模型与共享运行时，统一 Desktop、TUI、CLI 与 API 客户端的插件安装体验，Closes #28696，是本日最具分量的新 PR。
    https://github.com/anomalyco/opencode/pull/40108

2. **[#27554] feat(opencode): 局域网 Provider 自动发现 + 模型自动探测**（开放中）
    在 `/connect` 中新增 `Local (LAN)` 发现能力，通过 mDNS 自动发现局域网内的 OpenAI 兼容服务器并自动获取模型列表，Closes #6231 / #27553。
    https://github.com/anomalyco/opencode/pull/27554

3. **[#37889] fix: 处理 GitHub OIDC 格式变更与错误处理**（开放中）
    适配 GitHub OIDC token 从 `repo:octocat/my-repo:ref:refs/heads/main` 到 `repo:octocat@12...` 的格式变化，并加强错误处理，Closes #37823。
    https://github.com/anomalyco/opencode/pull/37889

4. **[#26600] fix(opencode): 调整 fallback replacer 触发时的 newString 缩进**（已关闭）
    修复 Edit 工具在 `LineTrimmedReplacer`、`IndentationFlexibleReplacer` 等容错替换器匹配 `oldString` 后，因缩进差异导致替换内容错位的问题，Closes #25953 / #14612。
    https://github.com/anomalyco/opencode/pull/26600

5. **[#34785] feat(provider): 为自定义网关添加 RFC 8628 设备流 OAuth**（已关闭）
    新增通用 RFC 8628 设备授权流 provider 类型，使不支持传统 OAuth 回调的 CLI/TUI 环境也能完成自定义网关身份认证。
    https://github.com/anomalyco/opencode/pull/34785

6. **[#34709] feat(plugin): 增加工具结果内容（content）API**（已关闭）
    为 V2 插件工具引入 `Tool.result({ output, content })` 与 `context.progress({ output, content })`，将冗余文本从结构化输出中剥离，并接入可回放的会话工具进度事件。
    https://github.com/anomalyco/opencode/pull/34709

7. **[#34698] fix(llm): 抑制 reasoning→tool 边界处孤立的 `</think>` 分块**（已关闭）
    在 OpenAI Chat 协议解析的 `step()` 中，修复 delta.content 包含孤立 `</think>`/`</thinking>` 结束标记时仍无条件发送 `text-delta` 的问题，避免向模型上下文泄漏无意义推理标记，Closes #34126。
    https://github.com/anomalyco/opencode/pull/34698

8. **[#34763] feat(desktop): 支持纯提示词新会话 DeepLink**（已关闭）
    允许 Desktop 端通过 `opencode://new-session?prompt=...` 直接创建携带提示词的新会话，方便外部工作流唤起，Closes #34762。
    https://github.com/anomalyco/opencode/pull/34763

9. **[#34722] fix(tui): 计算 usage 计数时跳过 compaction 摘要**（已关闭）
    修复 `/compact` 后 prompt footer 中的 token 计数仍停留在压缩前的问题，同时避免将 compaction 摘要计入用量统计，Closes #30930 / 关联 #23962。
    https://github.com/anomalyco/opencode/pull/34722

10. **[#40103] fix(console): Go 用量图表按请求数排序**（开放中）
    修复 Go 用量页中 Grok 4.5（120 请求）排在 Kimi K3（110 请求）之前导致的排序错误，Closes #40102。
    https://github.com/anomalyco/opencode/pull/40103

## 功能需求趋势

从今日 26 条 Issue 和 50 条 PR 中，社区最关注的功能方向集中在以下五类：

- **跨会话持久记忆**：`#20322`（原生 auto-memory）与 `#32658`（项目级持久记忆）均要求系统能跨 session 保留学习成果，且提交者明确表示"已知团队在考虑，希望加快"——这是长期悬而未决的高频诉求。
- **Provider/模型兼容性适配**：ByteDance Seed 流式字段（#40104）、Qwen 多模态读取（#29740）、opencode-go IPv6 挂起（#40095）集中暴露了协议层对非标准实现的脆弱性，开发者普遍希望 OpenCode 能像 Claude Code 一样"开箱即用"。
- **TUI/UX 细节打磨**：可折叠工具输出（#40096）、模型分组搜索（#34764）、会话状态在 prompt 区常驻显示（#34740）、空输入防误触（#40106）等，说明核心功能稳定后，社区开始追求长会话场景下的信息密度与操作安全性。
- **隐私与透明度**：#39875（Go 隐私措辞/署名移除）与 #39857、#24649 等系列 Issue 表明，付费用户对遥测、数据留存和提供商归属的透明度极为敏感，且官方缺乏回应正在放大不满。
- **插件生态基础设施**：统一市场（#40108）、LAN provider 发现（#27554）、`opencode-quota` 上榜生态页（#38281）共同指向"让第三方扩展更容易被发现、安装和信任"的诉求。

## 开发者关注点

- **"空响应/挂起"成为首要痛点**：#40038（桌面端成功提示音但无反馈）、#40093（500 错误 + network suspended）、#40095（IPv6 下静默退出）、#40104（Seed 模型挂起）——用户对"无日志、无报错、无输出"的三无失败容忍度极低，期望至少给出可诊断的错误链路。
- **提示缓存效率问题**：#23595 中 `<system-reminder>` 漂移导致 llama.cpp 缓存失效，对本地/自托管用户是成本直接上升的问题，应作为性能优化的优先项。
- **会话管理机制需要收敛**：#40105（反复出现 `session compacted` 且任务无法执行）与 #34722（压缩后 usage 计数错误）说明 compaction 机制在边界场景下仍不稳定，且用户对自动压缩逻辑缺乏可控感。
- **通知与反馈机制粗糙**：桌面端"消息已发送即播放成功音效"（#40038）与"取消音效在发送完成时响起"（#40093）并存，说明声音反馈与实际状态机脱节，属于高频感知的体验缺陷。
- **合规与流程事项堆积**：#40101（actions/cache 升级 v6）、#40107（Go 套餐切换失败）、#40088（邀请邮件未收到）等表明周边支撑系统（CI 依赖、订阅管理、邮件通知）同样消耗着社区信任，值得官方给予明确回应。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-08-02

## 今日速览
今日发布 v0.21.3 稳定版，重点增强 `/review` 命令的测试计划验证与失败归因能力。社区讨论热度集中在**提示词缓存复用与上下文性能**方向：#8279 设计讨论与 #8339 实现 PR 同日出现，MCP 工具动态列表导致的缓存失效问题（#4777）也持续发酵。

## 版本发布

**v0.21.3（最新稳定版）**
- 增强 `/review` 命令：新增测试计划验证（test plan validation）、测量失败归因（measured failure attribution）和新的验证视角（verification lenses），提升代码变更分析质量（[#8215](https://github.com/QwenLM/qwen-code/pull/8215)、#8218）。

**v0.21.2-nightly.20260801.bc382c3ff**
- `feat(hooks)`：生命周期钩子 payload 新增 session source 字段（[#8155](https://github.com/QwenLM/qwen-code/pull/8155)）。
- `feat(review)`：检查缓存身份（cache identity），避免缓存误用。

## 社区热点 Issues

### 开放讨论
1. **#8279 · 聊天压缩能否通过 fork 复用主提示词缓存？**
   @DragonnZhang · 评论 3
   设计讨论：聊天压缩请求目前会重建提示词前缀、无法命中缓存。社区在探讨能否通过 fork 方式直接复用主会话的 cache prefix。该讨论直接催生了 PR #8339。[链接](https://github.com/QwenLM/qwen-code/issues/8279)

2. **#8284 · 遥测：暴露提示词缓存命中率**
   @DragonnZhang · 评论 2
   建议将 prompt cache hit rate 作为一等遥测信号，与已有的 input/cache-read token 一起上报，为开发者量化缓存优化收益。反映上下文性能可观测性需求正在上升。[链接](https://github.com/QwenLM/qwen-code/issues/8284)

3. **#4777 · 延迟工具列表导致每次 MCP 发现时缓存失效**
   @qqqys · 评论 2
   MCP 工具的 "Deferred Tools" 列表被烘入系统提示词，任何工具集合变动都会使全缓存失效。是 MCP 重度用户在长会话中的主要性能痛点。[链接](https://github.com/QwenLM/qwen-code/issues/4777)

4. **#2653 · 拆分 System Prompt 与 System Reminder**
   @Mingholy · 评论 0
   建议将长驻系统指令与动态系统提醒分离，改善上下文管理、减少模型困惑和幻觉。长期开放的功能请求，反映社区对提示词结构设计的深层诉求。[链接](https://github.com/QwenLM/qwen-code/issues/2653)

5. **#8131 · 虚拟化历史模式下状态栏文本无法选中**
   @DragonnZhang · 评论 3
   macOS Apple Silicon 上，Virtualized History（长会话防闪烁模式）下状态栏文本无法用鼠标选中。已标记 `welcome-pr`，期待社区贡献修复。[链接](https://github.com/QwenLM/qwen-code/issues/8131)

### 已关闭但值得关注
6. **#5971 · TUI 窗口滚动刷屏问题**
   @EfiveLee · 评论 4
   Linux 下长输出时 TUI 从会话开头反复滚动至最新位置而非停留在最新输出。已修复并标记 `need-retesting`，等待回归确认。[链接](https://github.com/QwenLM/qwen-code/issues/5971)

7. **#7966 · 如何获取会话中创建的文件？**
   @ru1yex · 评论 6
   用户希望区分直接写入与代码间接生成的文件，并关联到具体会话。6 条评论说明“会话-文件关联”在真实工作流中是普遍需求。[链接](https://github.com/QwenLM/qwen-code/issues/7966)

8. **#1409 · 无法自动读写文件**
   @shiwanghua · 评论 6
   自动读写文件时输出几行即中断。持续获得社区关注，说明文件操作稳定性始终是用户信任度的基石。[链接](https://github.com/QwenLM/qwen-code/issues/1409)

9. **#1112 · 乱删代码**
   @oakZ · 评论 1
   用户让 Qwen Code 将 iOS 功能移植到 React Native，结果实现新功能时误删了无关代码行。暴露模型在跨项目编辑时的精确性问题。[链接](https://github.com/QwenLM/qwen-code/issues/1112)

10. **#1328 · 启动报错 Missing tiktoken_bg.wasm**
    @kajiev · 评论 3
    Windows 11 下 `npm install -g qwen-code` 后启动即崩溃。已关闭，但对新用户具有参考价值。[链接](https://github.com/QwenLM/qwen-code/issues/1328)

## 重要 PR 进展

1. **#8324 · feat(cli)：非交互模式采用 Goal v3**
   @qqqys · 更新 08-02
   将非交互式 `/goal` 命令统一到 Goal v3 运行时，`stream-json` 消费者可收到有序的 `goal_state` 事件，交互与非交互行为对齐。[链接](https://github.com/QwenLM/qwen-code/pull/8324)

2. **#8339 · fix(core)：聊天压缩时复用提示词缓存**
   @DragonnZhang · 更新 08-02
   当压缩模型与主模型相同时，压缩请求保留当前系统指令与工具声明，复用主会话的提示词缓存前缀。直接回应 #8279 的设计讨论，是今日缓存方向的标志性 PR。[链接](https://github.com/QwenLM/qwen-code/pull/8339)

3. **#8344 · fix(core)：从 fork 子代理历史中剔除同级指令**
   @harjothkhara · 更新 08-01
   修复同一轮中多个 fork 子代理互相看到对方指令的问题，避免上下文污染与信息泄露。[链接](https://github.com/QwenLM/qwen-code/pull/8344)

4. **#8345 · fix(review)：自身测试为红的突变体不算 survivor**
   @wenshao · 更新 08-02
   突变测试中，若被突变文件自身的测试在基线即为红，该突变体应标记为 `inconclusive` 而非 `survived`。该问题由 dogfooding 发现并修复。[链接](https://github.com/QwenLM/qwen-code/pull/8345)

5. **#8346 · feat(review)：验证器学习“证伪而非证实”的不对称性**
   @wenshao · 更新 08-02
   为 review 第 4 步验证器新增规则块，明确“我无法验证它”和“证据在我未查看的位置”两种状态不能作为拒绝 finding 的理由。[链接](https://github.com/QwenLM/qwen-code/pull/8346)

6. **#8306 · fix(github-channel)：恢复中断的入站任务**
   @yiliang114 · 更新 08-02
   使 GitHub 通道入站任务重启安全：先持久化再分发、处理运行中/失败任务、重试未发布的评论，且不重跑已完成 agent。[链接](https://github.com/QwenLM/qwen-code/pull/8306)

7. **#8302 · test(sdk-typescript)：权限控制 E2E 确定性**
   @yiliang114 · 更新 08-02
   用脚本化 fake OpenAI 响应替代模型真实决策，使权限控制 E2E 用例确定性通过。SDK、CLI 控制协议与权限控制器仍保留在测试链路中。[链接](https://github.com/QwenLM/qwen-code/pull/8302)

8. **#8245 · feat(serve)：解析并报告守护进程内存预算**
   @doudouOUC · 更新 08-02
   守护进程此前只采样 RSS/heap，无上限参照。该 PR 从 cgroup/limits 中解析内存预算并提供 ratio 输出，提升服务可观测性。[链接](https://github.com/QwenLM/qwen-code/pull/8245)

9. **#8318 · feat(autofix)：要求隔离的定向 E2E 证明**
   @wenshao · 更新 08-02
   为 post-merge E2E 失败创建的 Autofix 增加 fail-closed 验证链：不可变失败元数据、精确匹配 issue 标题/正文、候选 commit 验证。[链接](https://github.com/QwenLM/qwen-code/pull/8318)

10. **#8341 · feat(serve)：子会话并发上限可配置**
    @wenshao · 更新 08-02
    新增 `serve.maxConcurrentSubSessionsPerCaller` 与 `serve.maxConcurrentSubSessionsTotal` 配置项，默认并发上限从 5→16（每调用方）、20→24（工作区），改善高并发吞吐。[链接](https://github.com/QwenLM/qwen-code/pull/8341)

## 功能需求趋势

- **提示词缓存与上下文性能优化是第一优先级**：从 #8279 的缓存复用讨论、#8284 的命中率遥测，到 #4777 的缓存失效 bug，再到 PR #8339 的实现，社区对降低成本与延迟的诉求高度集中。
- **代码审查/验证自动化持续做深**：`/review` 命令验证视角增强（#8345、#8346）、Autofix E2E 证明（#8318）说明 Qwen Code 正在强化“自我验证”能力。
- **系统提示词结构将被重构**：#2653 提议拆分 System Prompt 与 System Reminder，预计将长期影响上下文管理架构。
- **会话与文件/工作区的关系管理**：#7966 说明用户需要“哪些文件属于哪个会话”的追踪能力，这是工作区隔离与归档的基础。

## 开发者关注点

- **文件操作精确性**：误删代码（#1112）、自动读写中断（#1409）表明模型编辑的边界保护是最高频信任痛点。
- **CLI/TUI 稳定性与交互细节**：#5971 滚动刷屏、#8131 状态栏无法选中等真实环境问题直接影响日常体验。
- **长会话的 token 成本与速度**：#4777、#8279、#8284 等表明用户对缓存可见性和优化手段越来越敏感。
- **入门与安装体验**：#1328 等环境类问题对新用户构成障碍，自动诊断与文档改进值得持续投入。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

## Hermes 社区动态日报 — 2026-08-02

### 今日速览

过去 24 小时 Hermes 无新版本发布，社区围绕插件生命周期管理（#64229）与 Responses API 工具结果丢失（#43757）两个长期 issue 展开讨论；桌面端体验问题集中浮现（demo 插件默认启用、WSLg 窗口控制缺失），OpenRouter xAI `:online` 工具重名 bug 可直接阻断请求。PR 侧共 50 条更新，覆盖 CLI 配置修复、桌面端窗口控制、皮肤主题系统、邮件通知抑制及新的内存 provider 等方向。

### 社区热点 Issues

过去 24 小时共有 8 个 Issue 更新，以下全部列出：

1. **#64229 插件生命周期管理（feature）**  
   提议为插件引入注册句柄、归属账本、`on_load/on_ready/on_unload` 回调及受监管的后台任务（`ctx.spawn_task`），卸载时自动取消。这是插件系统走向生产级的关键设计，已有 3 条评论，更新至今日。  
   https://github.com/NousResearch/hermes-agent/issues/64229

2. **#43757 Responses API function_call_output 丢失（bug）**  
   使用 `/v1/responses` 的 `input` 数组传递历史时，`function_call_output` 被剥离，导致跨轮次工具结果静默丢失。P2，已存在近两个月，3 条评论，直接影响会话状态可靠性。  
   https://github.com/NousResearch/hermes-agent/issues/43757

3. **#76064 桌面 demo/dogfood 插件默认启用（bug）**  
   状态栏默认启用两个演示插件（`clicked N×` 计数器和重复的网关 pill），在生产构建中造成 UI 杂乱。8 月 1 日创建，已有 1 个 👍。  
   https://github.com/NousResearch/hermes-agent/issues/76064

4. **#76469 Termux 安装失败（bug）**  
   `pip install -e '.[termux]'` 报错找不到 `nemo-relay<0.7,>=0.6.0` 版本，疑似依赖未发布或解析问题。P2，标记 `needs-repro`，影响 Android 端新用户。  
   https://github.com/NousResearch/hermes-agent/issues/76469

5. **#76466 TTS 采样率硬编码（feature）**  
   本地 TTS provider（OpenAI 兼容）返回 44.1kHz 音频，但 Hermes 近期改动硬编码假设 24kHz。请求方希望采用端点返回的实际采样率，涉及 `area/streaming`。  
   https://github.com/NousResearch/hermes-agent/issues/76466

6. **#76414 honcho peers 显示 "(not set)"（bug）**  
   非默认 profile 下 `hermes honcho peers` 误报对等身份，根因是 `_all_profile_host_conf...` 中 host key 使用 `.` 而非 `_`。影响多 profile 用户的记忆隔离与对等识别。  
   https://github.com/NousResearch/hermes-agent/issues/76414

7. **#76481 OpenRouter xAI `:online` 重复 web_search 工具（bug）**  
   使用 `:online` 后缀时，Hermes 同时发送客户端 web_search 与 OpenRouter 服务端 online-search 工具，xAI 返回 `HTTP 400: Duplicate tool names: web_search`，请求直接被拒。8 月 2 日新创建。  
   https://github.com/NousResearch/hermes-agent/issues/76481

8. **#76468 OmniRoute 结构化 503 中断多智能体轮次（bug）**  
   `chat_admission_busy` 被当作普通过载处理，未遵循 `Retry-After: 1` 退避，导致多智能体协作轮次被硬中断。P2，0 条评论。  
   https://github.com/NousResearch/hermes-agent/issues/76468

### 重要 PR 进展

以下为过去 24 小时内更新/创建的 10 个重要 PR：

1. **#71693 fix(hermes_cli)：同 provider `/model` 切换不再覆盖自定义端点**  
   修复同一 provider 下切换模型时，用户自定义的 session URL/Key 被重新解析逻辑丢弃、回落至 OpenRouter 默认端点的问题，避免下一轮请求打到错误主机。  
   https://github.com/NousResearch/hermes-agent/pull/71693

2. **#76476 feat(desktop)：应用自绘窗口控制**  
   新增 opt-in 的 `frame: false` 无标题栏模式，由 app 自绘最小化/最大化/关闭按钮，持久修复 WSLg/Linux 下窗口控件缺失问题，并为自定义窗口外观打下基础。  
   https://github.com/NousResearch/hermes-agent/pull/76476

3. **#76477 feat(skins)：皮肤 YAML 支持 `chrome:` 段**  
   作为 #76476 的配套，允许皮肤主题化窗口框架表面——标题栏、min/max/close 控件、状态栏，统一桌面端视觉定制能力。  
   https://github.com/NousResearch/hermes-agent/pull/76477

4. **#76475 fix(email)：抑制独立网关通知**  
   会话自动重置后的一次性 no-home-channel 提示会被单独投递为邮件，用户收到两封无关邮件。此 PR 将行政通知收敛至实际回复中，降低邮件噪音。  
   https://github.com/NousResearch/hermes-agent/pull/76475

5. **#76478 fix(buzz)：发现运行中新增的已加入频道（已关闭）**  
   修复 Buzz 适配器在网关启动后不再监听新加入频道的问题，无需重启即可实时感知；显式 channel filter 保持有界，DM 发现不受影响。  
   https://github.com/NousResearch/hermes-agent/pull/76478

6. **#76480 feat(cli)：子代理模型与推理选择器**  
   以 CLI-only 方式提取自 #74375 的模型/provider/reasoning 选择器，为子代理提供快速配置路径，不引入 React TUI 等竞争界面，等待 Mission Control（#70899）统一方案。  
   https://github.com/NousResearch/hermes-agent/pull/76480

7. **#76479 fix(slack)：在线程中暴露触发消息 ID**  
   线程里的 Slack 命令现在可引用触发消息自身的时间戳作为稳定 source reference，修复幂等工作流因拿不到命令事件而拒绝变更状态的问题。  
   https://github.com/NousResearch/hermes-agent/pull/76479

8. **#76474 feat(memory)：Doubao Vector 本地语义内存 provider**  
   新增基于 Volces Ark `doubao-embedding-vision` 的本地优先语义记忆 provider，向量与元数据存于 `$HERMES_HOME`，并保持 profile 隔离。  
   https://github.com/NousResearch/hermes-agent/pull/76474

9. **#75945 feat(gateway)：原生 Discord embeds via `[EMBED]` 标记**  
   Agent 可在消息中嵌入 `[EMBED]{json}[/EMBED]` 块，网关解析后发送为真实 `discord.Embed`，支持 title、description、colour、inline fields 与 footer。  
   https://github.com/NousResearch/hermes-agent/pull/75945

10. **#76459 fix(desktop,install)：Windows 上优先使用内置 Node**  
    修复两处系统 Node 抢占 Hermes 托管 Node 的问题：桌面后端路径拼接未匹配 Windows 便携式布局，以及安装器 PATH 优先级错误。  
    https://github.com/NousResearch/hermes-agent/pull/76459

### 功能需求趋势

从近期 Issue 与 PR 中提炼出以下社区关注方向：

- **插件系统生产化**：不只是能用，还要可治理——#64229 生命周期管理（注册句柄、归属账本、卸载回调、受监管任务）、#76179 向插件暴露 `host.selectModel`，说明插件 API 正在从"能用"走向"健壮且可治理"。
- **桌面端体验完善**：WSLg/Linux 窗口控制缺失（#76476）、demo 插件默认启用污染 UI（#76064）、皮肤定制（#76477），桌面端完成度是当前迭代热点。
- **模型/Provider 兼容性**：OpenRouter xAI `:online` 工具重名（#76481）、同 provider 切换保留自定义端点（#71693）、OmniRoute 503/429 的结构化错误语义处理（#76468）。
- **音频/流媒体正确性**：#76466 要求 TTS 支持动态采样率，为本地与异构 provider 提供原生兼容。
- **安装与跨平台门槛**：Termux Android 依赖解析失败（#76469）、Windows 便携式 Node 路径（#76459），安装与升级路径持续收窄。
- **记忆与多 Profile 隔离**：Honcho 非默认 profile 身份错误（#76414）、Doubao Vector 本地记忆 provider（#76474），多 profile 数据隔离与身份一致性在完善。

### 开发者关注点

- **工具结果可靠性**：#43757 是长期未解决的痛点——Responses API 下跨轮次工具结果静默丢失，带有 `risk-session-state` 标签，直接影响 agent 正确性。
- **配置意外漂移**：#71693 反映 provider 切换可能静默改变请求端点，开发者对"隐性配置漂移"高度敏感，该 PR 带 `needs-decision` 与 `risk-security-boundary`。
- **通知与 UI 噪音**：#76475 邮件网关单独投递行政通知，#76064 桌面默认加载演示插件，都属"非预期可见物"对用户体验的干扰。
- **错误处理弹性**：#76468 将结构化 503 当普通过载处理、不遵循 `Retry-After`；#76481 工具名冲突直接 400，缺少客户端去重或冲突检测机制。
- **安装与升级路径**：#76469 Termux 依赖解析失败是"新用户第一关"，在社区反馈中持续占比较高。

</details>