---
title: AI CLI 工具社区动态日报
published: 2026-08-08
report: ai-cli
tags:
  - radar
  - AI
---
# AI CLI 工具社区动态日报 2026-08-08

> 生成时间: 2026-08-08 01:27 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告
**数据窗口：2026-08-08 · 覆盖工具：Claude Code / OpenAI Codex / Gemini CLI / DeepSeek Reasonix / OpenCode / Qwen Code / Hermes**

---

## 1. 生态全景

今日七个主流 AI CLI 工具合计发布 **15+ 个版本**（含 stable、nightly、alpha、preview），累计 **60+ 个重点 Issue / PR 更新**，赛道仍处高频迭代期。发展主线正从"模型能力竞赛"转向"工程化能力竞赛"：企业治理（自托管运行环境、网关支出限额）、跨工具上下文标准化（AGENTS.md）、后台任务可靠性与安全加固成为各家的竞争焦点。Windows 平台稳定性与第三方模型兼容性是当前最普遍的短板。行业整体正从"演示可用"走向"生产可信"，成本可验证、行为可观测、故障可恢复成为用户的新底线。

---

## 2. 各工具活跃度对比

> 注：Issues/PR 数为各日报重点摘录量，非当日全量；Hermes 明确标注 24h 更新量为 19 Issues / 50 PRs。

| 工具 | 版本发布 | 热点 Issues | 重点 PRs | 24h 动态特征 |
|---|---|---|---|---|
| **Claude Code** | 2（v2.1.224 / v2.1.225） | 10 | 3 | 连续两个企业向版本；PR 少但功能重（自托管 runner、spend-limit） |
| **OpenAI Codex** | 4（v0.147.0 + 3 alpha） | 10 | 10 | 正式版发布 + 大规模协议层 PR（code-mode gRPC） |
| **Gemini CLI** | 4（nightly + preview + 补丁） | 10 | 10 | 发版密集；Caretaker 内部自动化基建大量合入 |
| **DeepSeek Reasonix** | 2（v1.21.1 / v1.21.2） | 10 | 10 | 双 stable 连发；128K 预算 + 缓存感知投影获真实账单验证 |
| **OpenCode** | 1（v1.18.15） | 10 | 10 | 轻量迭代；LSP 通配符问题数小时内即有 PR 跟进 |
| **Qwen Code** | 2（nightly ×2） | 4 | 11 | 聚焦 ACP/IDE 集成与 Git 安全；Issue 少而精 |
| **Hermes** | 0（无 Release） | 19 条更新 | 50 条更新 | 架构重构期（Memory/god-file 分片）；无发版但 PR 吞吐最高 |

**横向观察**：Gemini CLI 与 Hermes 的 PR 吞吐量最高（分别偏向内部自动化与社区协作）；Claude Code 的 PR 数最少，反映其更偏集中式、企业级发布节奏；Qwen Code 的 Issue 数最少，社区尚在早期但 PR 方向非常聚焦。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求与证据 |
|---|---|---|
| **跨工具上下文标准化（AGENTS.md）** | Claude Code、Codex、Amp、Cursor | Claude Code #6235 获 **4526 👍**，为全社区最强诉求；开发者希望一套规范多工具复用，摆脱 CLAUDE.md 的锁定 |
| **Windows 平台稳定性** | Claude Code、Codex、Reasonix、Hermes | Claude Code：API 流 ECONNRESET（#84072）、KVM 100% CPU 死锁（#77208）；Codex：沙箱 `CreateProcessAsUserW failed: 5`（#10090）；Reasonix：进程被 kill（#7836）、Alt 键卡死（#7918） |
| **后台/无人值守可靠性** | Claude Code、Gemini CLI、Codex、Reasonix、Hermes | Claude Code：权限提示无限阻塞（#78487）、后台 bash 静默被杀（#84625）；Gemini CLI：Subagent 达 MAX_TURNS 误报成功（#22323）、generalist 挂起（#21409）；Codex：清理任务误删 rollout（#37515） |
| **MCP/Provider 兼容性** | Codex、OpenCode、Qwen Code、Hermes | Codex：非 OpenAI provider 无法调用 MCP 工具（#26234）；OpenCode：DeepSeek relay 400（#41165）、Kimi K3 缓存失效（#41093）；Qwen Code：MCP 元数据热刷新（#8522）；Hermes：MCP 按 profile 隔离（#80746） |
| **上下文/成本优化** | Reasonix、Hermes、Codex、Gemini CLI | Reasonix：128K 输出预算 + 缓存感知投影，实测成本 **-55~60%**、缓存命中率 99.6%+（#7907）；Hermes：工具 schema 全量注入约 14K tokens，催生混合预选（#13332）；Codex：长会话增量加载（#34663） |
| **安全加固** | Gemini CLI、Qwen Code、Claude Code、Reasonix | Gemini CLI：SSRF 修复，CVSS 8.6（#28725）；Qwen Code：Git 跨工作树/仓库配置命令执行拦截（#8687、#8645）；Claude Code：插件 YAML 注入与符号链接凭据覆盖（#84711） |
| **Agent 可观测性与干预** | Reasonix、Gemini CLI、Qwen Code | Reasonix：e2e 轨迹批处理分析（#7917）、后台子智能体指南注入（#7912）；Gemini CLI：LLM-as-Judge 分诊评估（#28530）；Qwen Code：Goal 证据检查点（#8465） |

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线 | 关键差异点 |
|---|---|---|---|---|
| **Claude Code** | 企业级 Agent 开发平台 | 企业团队、大型组织 | TypeScript | 自托管 runner、网关支出限额、工作区信任体系；社区影响力最大（AGENTS.md 诉求 4526 👍） |
| **OpenAI Codex** | 安全沙箱优先的 Agent | OpenAI API 用户、安全敏感团队 | Rust | 多层沙箱、code-mode gRPC 协议、MCP 事件流；alpha 迭代激进 |
| **Gemini CLI** | 多模型 Agent + 自动化基建 | Google 生态开发者 | TypeScript | Caretaker 内部自动化、76 项行为评估体系、AST 感知代码理解 |
| **DeepSeek Reasonix** | 成本/长上下文优化专家 | 成本敏感团队、中/日文用户 | Go（据实现细节推断） | 缓存感知上下文投影、数据飞轮、证据增益停滞防护、IME 专项适配 |
| **OpenCode** | 开源轻量多模型聚合器 | 开源社区、自托管用户 | TypeScript | models.dev 驱动、TUI Mermaid 渲染、社区 PR 响应极快 |
| **Qwen Code** | IDE 深度集成 Agent | JetBrains/远程开发用户 | TypeScript | 标准 ACP `usage_update`、daemon/Web Shell 架构、tmux 交互式终端 |
| **Hermes** | 全渠道 Agent（聊天/桌面） | 社区群聊、多平台自动化 | Python | Discord/Telegram/桌面多渠道网关、Memory 架构重构、插件生态 |

**关键观察**：
- **Claude Code 与 Codex 正面竞争企业市场**，前者靠治理功能（支出限额、自托管）与既有生态，后者靠沙箱安全与协议开放（gRPC、MCP）。
- **Reasonix 以"成本可验证"建立独特心智**——用户用真实账单数据背书，这在其他工具中未见先例。
- **Qwen Code 与 Hermes 走差异化路径**：前者绑定 IDE 协议标准，后者绑定 IM/社群场景，均避开与头部工具的正面冲突。
- **OpenCode 是最接近"社区公共品"的工具**，问题响应周期以小时计，适合对上游控制力有要求的开发者。

---

## 5. 社区热度与成熟度

### 第一梯队：成熟期（功能完善，社区需求转向标准化与治理）
- **Claude Code**：社区规模最大、诉求最成熟（#6235 持续一年热度不减）；但 PR 吞吐低（3 个/24h），发布节奏稳健，处于"平台期"。

### 第二梯队：快速成长期（发版密集、PR 活跃、问题集中爆发）
- **OpenAI Codex**：正式版 + 3 alpha 并行，10 个 PR 含协议级重构；但数据丢失（#37515）与上下文错乱（#8648，82 评论）正在消耗信任。
- **Gemini CLI**：日均 4 版 + 10 PR，Caretaker 基建（Firestore schema、Judge Runner）显示其"自己造刀"的工程文化；Subagent 可靠性是最大软肋。
- **DeepSeek Reasonix**：双 stable 连发且社区验证数据扎实（#7907 成本分析），用户质量高；Windows/更新器问题拖累体验评分。
- **Qwen Code**：Issue 量小（4 个）但 PR 方向集中（ACP、Git 安全），处于"少而精"的早期扩张阶段，JetBrains 用户群在增长。

### 第三梯队：早期社区驱动（架构仍在大幅变动）
- **OpenCode**：社区协作效率标杆（LSP 通配符 Issue → PR 数小时闭环）；但 Web UI 在复杂部署下缺陷较多，适合技术爱好者而非生产依赖。
- **Hermes**：单日 50 PRs 但无 Release，Memory 架构 Epic（#78647，60 评论）与插件接口扩展（#64182）表明仍处 pre-1.0 重构期，"还不是 daily driver"（用户原话）。

---

## 6. 值得关注的趋势信号

1. **AGENTS.md 正在成为跨工具事实标准。** Claude Code #6235 以 4526 👍 成为全行业最强呼声；Codex、Amp、Cursor 已支持。**对开发者的启示**：新项目可直接采用 AGENTS.md 作为上下文规范，避免被单一工具锁定；工具选型时应优先考察对统一标准的支持度。

2. **"可靠性"取代"能力"成为竞争核心。** 误报成功（Gemini #22323）、后台任务静默被杀（Claude #84625）、清理任务误删数据（Codex #37515）——这些问题的共性不是模型能力，而是**状态管理与护栏机制缺失**。看门狗、超时、终止状态正确传播将是下一轮差异化重点。

3. **Windows 是尚未被征服的第二大平台。** 七个工具中四个出现 Windows 专属严重 bug（沙箱权限、文件锁、ECONNRESET、进程崩溃），且多为 P1/P2。**对开发者**：在 Windows 环境落地 AI CLI 前，应重点验证沙箱/更新器/流式连接三条链路；对供应商而言，Windows 稳定性是明确的竞争机会。

4. **成本可观测性将成为用户粘性来源。** Reasonix 的缓存感知投影获得**账单级验证**（成本 -55~60%，命中率 99.6%+），而 OpenCode 的 Kimi K3 缓存失效（#41093）直接导致用户费用飙升。能"让用户看见钱花在哪"的工具将获得更强信任。

5. **安全左移：从提示词约束走向宿主侧强制校验。** Qwen Code 拦截跨工作树 Git 操作（#8687）、Claude Code 修复 YAML 注入与符号链接凭据覆盖（#84711）、Gemini CLI 修补 SSRF（CVSS 8.6）——agent 权限边界正由宿主进程强制执行，而非依赖模型自觉。**对开发者**：审查 AI CLI 的沙箱逃逸面（git config、环境变量继承、符号链接）应成为安全评估的必检项。

6. **Agent 可观测性与"中途干预"能力快速升温。** Reasonix 的后台子智能体指南注入（#7912）、Gemini CLI 的 LLM-as-Judge 分诊（#28530）、Qwen Code 的 Goal 证据检查点（#8465）——行业共识是：**不能看、不能管、不能续的 Agent 无法进入生产环境**。这与可观测性工程（OpenTelemetry）在传统运维中的路径高度相似。

7. **ACP（Agent Client Protocol）正成为 IDE 集成的 LSP。** Qwen Code 实现标准 `usage_update` 后，JetBrains AI Assistant 即可正确显示上下文用量（#8513 → #8528），验证了协议级互操作的价值。**对开发者**：关注 ACP 生态的客户端/服务端实现，它可能决定未来 IDE 与 CLI agent 的互联方式。

8. **记忆/上下文管理成为新战场，隐私问题浮出水面。** Gemini CLI 的 Auto Memory 被指出"先发后脱敏"的隐私隐患（#26525）；Hermes 社区要求将 memory 降级为"背景上下文"而非权威指令（#31584）；Reasonix 用缓存感知投影解决长上下文成本。**记忆的隐私、效率、语义化**三个维度都已出现代表性需求，2026 下半年这一方向大概率会诞生新的最佳实践。

---

*报告基于 2026-08-08 各工具 GitHub 社区动态日报整理，数据可追溯至各仓库 Issues/PRs 链接。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-08-08）

> 说明：以下 PR 按社区讨论热度排序，覆盖新增 Skill 与对既有 Skill 的关键修复。截至数据快照，**所有热门 PR 均处于 Open 状态**。

---

## 1. 热门 Skills 排行

### ① fix(skill-creator): run_eval.py 始终报告 0% 召回率（#1298）
- **作者**：@MartinCajiao | 创建于 2026-06-10 | **状态**：Open
- **功能**：修复 `run_eval.py` 在所有评估查询下 `recall=0%` 的缺陷。该 bug 导致 skill-creator 的描述优化循环（`run_loop.py`、`improve_description.py`）持续在无效信号上运行。修复方式包括将评估产物安装为真实 Skill、修复 Windows 流读取、触发器检测与并行 worker。
- **讨论热点**：关联 issue #556（12 评论、7 👍），拥有 10+ 独立复现，是当前 skill-creator 工具链最核心的可靠性故障。
- 链接：https://github.com/anthropics/skills/pull/1298

### ② Add document-typography skill（#514）
- **作者**：@PGTBoos | 创建于 2026-03-04 | **状态**：Open
- **功能**：新增文档排版质量控制技能，聚焦 AI 生成文档的三大高频问题：孤行（1–6 词溢出到下一行）、寡段（标题滞留页底）、编号错位。
- **讨论热点**：这些问题影响几乎所有 Claude 生成的文档，但用户很少主动“要求排版好”——该 PR 代表了将隐性质量规范固化为自动检查项的方向。
- 链接：https://github.com/anthropics/skills/pull/514

### ③ fix(pdf): 修正 SKILL.md 中大小写敏感的文件引用（#538）
- **作者**：@Lubrsy706 | 创建于 2026-03-06 | **状态**：Open
- **功能**：修正 `skills/pdf/SKILL.md` 中 8 处大小写不一致（`REFERENCE.md`→`reference.md`、`FORMS.md`→`forms.md`），解决大小写敏感文件系统上的引用失败。
- **讨论热点**：修复量小但共鸣度高——暴露了官方技能对跨平台（Linux/macOS）兼容性的把关不足。
- 链接：https://github.com/anthropics/skills/pull/538

### ④ Add ODT skill — OpenDocument 文本创建/模板/转换（#486）
- **作者**：@GitHubNewbie0 | 创建于 2026-03-01 | **状态**：Open
- **功能**：新增 OpenDocument 技能（.odt/.ods），涵盖创建、模板填充、读取及 ODT→HTML 转换；触发词覆盖 ODT/ODS/ODF/OpenDocument/LibreOffice。
- **讨论热点**：填补 ODF 生态空白，回应了“非 MS 格式文档在 AI 工作流中也需要一等公民支持”的需求。
- 链接：https://github.com/anthropics/skills/pull/486

### ⑤ Improve frontend-design skill clarity and actionability（#210）
- **作者**：@justinwetch | 创建于 2026-01-05 | **状态**：Open
- **功能**：系统性重构 frontend-design 技能，消除模糊表达，确保每条指令都可以在单次会话内被 Claude 明确执行。
- **讨论热点**：核心讨论是 Skill 应该“像人看的文档”还是“像机器可执行的规范”——这条 PR 是后者主张的代表。
- 链接：https://github.com/anthropics/skills/pull/210

### ⑥ Add skill-quality-analyzer & skill-security-analyzer meta-skills（#83）
- **作者**：@eovidiu | 创建于 2025-11-06 | **状态**：Open
- **功能**：新增两个元技能：`skill-quality-analyzer` 对 Skill 做五个维度质量评估（结构与文档 20%、…）；`skill-security-analyzer` 面向安全审查。
- **讨论热点**：直击社区对 Skill 质量参差与安全隐患的担忧——为“技能治理”提供了自检工具箱。
- 链接：https://github.com/anthropics/skills/pull/83

### ⑦ fix(docx): 防止 tracked change 的 w:id 与既有书签冲突（#541）
- **作者**：@Lubrsy706 | 创建于 2026-03-06 | **状态**：Open
- **功能**：修复 DOCX 技能向带书签文档添加修订时导致文档损坏的问题。根因是 OOXML 中 `w:id` 属性被书签、修订、注释、移动范围共享 ID 空间，而示例使用了硬编码低 ID。
- **讨论热点**：体现社区对文档类 Skill 的工程质量要求已深入 OOXML 底层规范——修复技术密度高。
- 链接：https://github.com/anthropics/skills/pull/541

### ⑧ fix(skill-creator): 警告未加引号的 YAML 特殊字符描述（#539）
- **作者**：@Lubrsy706 | 创建于 2026-03-06 | **状态**：Open
- **功能**：在 `quick_validate.py` 增加预解析校验，提前检测 `description` 字段中未加引号的 `:` 等 YAML 特殊字符，防止描述被静默截断或分裂成多个键。
- **讨论热点**：与 #1298 构成互补——社区正在系统化加固 skill-creator 的输入验证与跨平台可靠性。
- 链接：https://github.com/anthropics/skills/pull/539

---

## 2. 社区需求趋势（Issues 视角）

| 方向 | 代表 Issue | 热度 | 说明 |
|---|---:|---:|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492) | 43 评论 | 社区技能在 anthropic/ 命名空间下分发，冒充官方技能，诱导用户过度授权——当前最热议题 |
| **组织级共享与协作** | [#228](https://github.com/anthropics/skills/issues/228) | 16 评论 / 8 👍 | 企业用户希望技能在组织内直接共享，而非下载、传文件、手动导入 |
| **工具链可靠性** | [#556](https://github.com/anthropics/skills/issues/556) | 12 评论 / 7 👍 | `run_eval.py` 对任何查询都无法触发技能，skill-creator 优化循环在噪音上运行 |
| **技能去重/目录混乱** | [#189](https://github.com/anthropics/skills/issues/189) | 6 评论 / 9 👍（最高赞） | document-skills 与 example-skills 插件包含相同技能，膨胀上下文窗口 |
| **上下文窗口卫生** | [#1487](https://github.com/anthropics/skills/issues/1487) | 4 评论 | claude-api 技能一次注入约 156k tokens，单次调用即耗尽上下文窗口 |
| **Agent 状态压缩** | [#1329](https://github.com/anthropics/skills/issues/1329) | 9 评论 | 长期 Agent 的散文式笔记/记忆开销过大，社区提出符号化“紧凑记忆”方案 |
| **MCP 生态融合** | [#16](https://github.com/anthropics/skills/issues/16) | 4 评论 | 将 Skills 的能力以 MCP 协议暴露为统一 API，封装可组合的 AI 软件能力 |

**趋势提炼**：社区需求重心已从“要更多技能”转向“要更安全、可靠、可治理的技能生态”；同时，“Agent 状态管理”与“MCP 协议融合”正成为新的增长点。

---

## 3. 高潜力待合并 Skills

以下讨论频繁、功能完整的 PR 最有可能在近期落地：

1. **self-audit（#1367）** — 交付前先做机械文件存在性验证，再按损害严重程度执行四维推理质量审计；与任何项目/模型/技术栈兼容。作者已规划后续 #1385 “三闸门管道”，设计思路连贯。
   https://github.com/anthropics/skills/pull/1367

2. **testing-patterns（#723）** — 完整测试技能栈：Testing Trophy 测试哲学、单元测试（AAA/命名/边界）、React 组件测试（Testing Library）；方法论与具体库版本解耦，落地阻力小。
   https://github.com/anthropics/skills/pull/723

3. **pyxel 复古游戏开发（#525）** — Pyxel 引擎作者 @kitao 亲自提交，附带 pyxel-mcp 的工作流（写→运行→截图→迭代）；是“Skill × MCP 联动”的天然示范案例。
   https://github.com/anthropics/skills/pull/525

4. **plan-file-hygiene（#1479）** — 为规划产物定义生命周期与清理规则，解决长期

---

# Claude Code 社区动态日报 — 2026-08-08

## 今日速览

- 连续发布 v2.1.224 与 v2.1.225：新增**自托管运行环境**（self-hosted runners）与**网关支出限制**支持，企业级能力明显增强。
- 社区对 **AGENTS.md 标准化支持**的呼声达到峰值（#6235，4526 👍 / 347 评论），成为当前最受关注的功能请求。
- 新模型 Fable 5 的兼容性回归与 Windows/Linux 平台稳定性问题占据 bug 报告主流，后台任务可靠性引发多起讨论。

---

## 版本发布

### v2.1.225（最新）
- **网关支出限制**：Claude Code 用量警告新增 spend-limit 支持；达到上限时，消息会显示具体额度、重置时间及操作者留言（需网关同步更新至 2.1.225）。
- **工作区信任提示**：为 `claude agents` 增加对不受信任目录的确认提示，与现有信任机制保持一致。

### v2.1.224
- **自托管环境**：新增 `claude self-hosted-runner` 命令，可将自有机器或容器作为 Claude Code Web、移动端、桌面端会话的运行环境（Team 与 Enterprise 计划）。
- **archive 插件源**：支持通过 HTTPS 从 zip 包直接安装插件，无需依赖 git。

---

## 社区热点 Issues

### 1. [Feature Request] Support AGENTS.md — #6235
**👍 4526 | 💬 347 | 状态: OPEN**
Codex、Amp、Cursor 等工具已开始围绕 AGENTS.md 建立统一标准，而 CLAUDE.md 过于 Claude 专属，不利于多工具协作。该请求已持续近一年，热度不减反增，是当前社区最强烈的标准化诉求。
🔗 https://github.com/anthropics/claude-code/issues/6235

### 2. Fable 5: 文本与工具调用并存时文本不显示 — #81853
**👍 3 | 💬 5 | 状态: OPEN**
使用 `claude-fable-5` 时，同时包含文本和工具调用的响应在终端只渲染工具调用，文本部分被隐藏（实际存在于详细转录中）。影响新模型用户的核心调试体验。
🔗 https://github.com/anthropics/claude-code/issues/81853

### 3. Linux KVM 虚拟机上 100% CPU 死锁 — #77208
**👍 0 | 💬 3 | 状态: OPEN**
Claude Code ≥ 2.1.205 在使用 generic CPU 模型（kvm64）的 KVM 虚拟机上即使执行 `--version` 也会无输出并 100% 占用 CPU，同时静默破坏 Linux 桌面版 Code 标签页。属严重平台回归。
🔗 https://github.com/anthropics/claude-code/issues/77208

### 4. 后台 agent 因未应答权限提示无限阻塞 — #78487
**👍 0 | 💬 1 | 状态: OPEN**
Workflow 工具派生的后台 agent 在权限提示无人应答时无限期阻塞，无自动拒绝、无超时、无看门狗，实测出现 55 分钟静默停滞。对无人值守自动化影响极大。
🔗 https://github.com/anthropics/claude-code/issues/78487

### 5. 限流状态导致 prompt 建议被静默抑制 — #72495
**👍 0 | 💬 4 | 状态: OPEN**
用户通过反编译定位到客户端 rate-limit 状态为 `allowed_warning` 时的严格相等判断缺陷，并用预注册预测验证了根因。当限流状态清除后建议立即恢复，属高度可信的深度 bug 分析。
🔗 https://github.com/anthropics/claude-code/issues/72495

### 6. Bash 工具 grep shim 灾难性回溯导致 OOM — #82179
**👍 0 | 💬 1 | 状态: OPEN**
Bash 工具将 grep 替换为嵌入式 ugrep 模拟，在 `-o` + 有界量词 + 交替组合下发生灾难性回溯，处理 20 KB 文件即耗尽 6.6 GB 内存被 OOM 杀死。属于实现层面的性能隐患。
🔗 https://github.com/anthropics/claude-code/issues/82179

### 7. Windows 平台 API 流 ECONNRESET — #84072
**👍 0 | 💬 3 | 状态: OPEN**
Windows 上流式响应在首个数据块到达后即被重置，VS Code 扩展与终端均可复现，影响 Windows 用户的核心使用。
🔗 https://github.com/anthropics/claude-code/issues/84072

### 8. 后台 Bash 任务被静默杀死 — #84625
**👍 0 | 💬 1 | 状态: OPEN**
`run_in_background: true` 的长任务在无 OOM、无用户操作、无错误提示的情况下静默终止，10 天内复现约 10 次；setsid 分离的进程不受影响，指向 Claude Code 自身的进程管理逻辑问题。
🔗 https://github.com/anthropics/claude-code/issues/84625

### 9. [Feature Request] 支持禁用单个插件技能 — #14920
**👍 83 | 💬 14 | 状态: OPEN**
用户希望按需禁用插件内的单个 skill（如 `commit-commands:clean_gone`），而非只能整体启用/禁用插件。反映插件系统进入精细化治理阶段。
🔗 https://github.com/anthropics/claude-code/issues/14920

### 10. [Feature Request] 支持从剪贴板直接粘贴图片 — #84961
**👍 0 | 💬 0 | 状态: OPEN**
当前分享图片需先保存为文件再提供路径，在调试截图或 UI 反馈场景中摩擦明显。建议在 CLI、VS Code 扩展和 JetBrains 插件中支持 Ctrl+V/Cmd+V 直接粘贴，是高频提效需求。
🔗 https://github.com/anthropics/claude-code/issues/84961

---

## 重要 PR 进展

> 过去 24 小时共 **3 个** PR，以下为全部。

### 1. docs: 修复 hooks 文档过期链接 — #84854
**状态: OPEN**
将 `bash_command_validator_example.py` 中指向旧文档站点的 hooks 链接更新为 `code.claude.com/docs`，与仓库内其余 46 处链接保持一致。
🔗 https://github.com/anthropics/claude-code/pull/84854

### 2. fix(hookify): 修正规则评估作用域与安全文件读取 — #84747
**状态: OPEN**
修复 `load_rules()` 在 `event` 为 `None` 时绕过事件过滤器的问题，确保未显式映射事件的工具（如 `Read`、`Browser`）仅触发 `all` 作用域规则；同时加强文件读取安全性。
🔗 https://github.com/anthropics/claude-code/pull/84747

### 3. fix(security): 修复插件脚本中的 YAML 注入与符号链接凭据覆盖 — #84711
**状态: OPEN**
修复 #76580，增加防御性检查，防止恶意 YAML 注入和通过符号链接覆盖凭据文件。
🔗 https://github.com/anthropics/claude-code/pull/84711

---

## 功能需求趋势

1. **AGENTS.md 跨工具标准化**（#6235）：开发者不再满足于 Claude 专属的 CLAUDE.md，而是希望与 Codex、Cursor 等工具共用一套上下文规范，降低多工具协作成本。
2. **远程控制与自托管环境治理**：#50884、#77372 等 issues 聚焦 Remote Control 环境的清理与稳定性，配合 v2.1.224 的 self-hosted runners，远程/分布式运行正成为企业用户的核心场景。
3. **插件系统精细化控制**：从“整体启用/禁用”走向“按 skill 管理”（#14920），同时社区开始关注插件安装时的依赖自动安装、安全审计（#84939、#84711）。
4. **新模型（Fable 5）适配成熟度**：文本显示缺失、行为不一致（#81853、#79247）等问题显示模型迭代速度快于客户端适配，兼容性验证成为关注点。
5. **无障碍与低视力支持**：#84963 要求响应 `prefers-contrast` 和 `forced-colors`，并指出 APCA 对比度不达标，属于此前较少被提及的新方向。
6. **输入交互效率提升**：剪贴板图片直贴（#84961）、`/goal` 字符上限放宽（#84953）等小需求密集出现，说明用户对日常操作摩擦越来越敏感。

---

## 开发者关注点

- **Windows 平台稳定性短板**：文件锁导致更新/重启失败（#76192、#84962）、API 流 ECONNRESET（#84072）、MSIX 在 Intel 核显上崩溃（#83028），Windows 已成为 bug 高发平台。
- **后台/无人值守任务可靠性不足**：权限提示无超时阻塞（#78487）、后台任务被静默杀死（#84625），直接影响 CI/自动化工作流的信任度。
- **Fable 5 实际表现引发信任危机**：#79247 的帖主直言“三个周末什么都没完成”，模型在长 pipeline 任务中的“假完成”现象值得严肃对待。
- **权限系统灵活性欠缺**：无法禁用单个插件 skill（#14920）、WebSearch 权限规则被忽略（#84956）、工作区隔离守卫误伤非 git 命令（#84720），权限控制的粒度与准确性都需要加强。
- **文档与实现脱节**：ScheduleWakeup 的 TTL 描述与实际不符（#74149）、插件自动安装依赖未文档化（#84939）、hooks 链接过期（#84854），文档维护节奏未跟上功能迭代。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-08-08）

## 今日速览

v0.147.0 正式版发布，引入可移植 Agent 插件与对话分区管理两大特性，alpha 线同步推进至 0.148.0-alpha.4。社区讨论热点集中在 Windows 平台沙箱权限故障（多个 issue 指向 `CreateProcessAsUserW` 失败）与 MCP 工具兼容性上。数据安全与扩展稳定性成为开发者最关切的痛点。

## 版本发布

**rust-v0.147.0（正式版）**
- 可安装便携式 Agent 插件，支持在本地、个人、工作区和远程插件目录中搜索。 (#36544, #36409, #36919, #36796)
- 对话持久化分区，支持手动排序，并可增量浏览长对话记录。 (#35722, #36007, #36380, #36948)

**Alpha 线**：rust-v0.148.0-alpha.1 / alpha.2 / alpha.4 相继发布，为下一迭代铺路。

## 社区热点 Issues

1. **Codex 在长对话中回复旧消息** [#8648](https://github.com/openai/codex/issues/8648)
   多轮对话中模型偶尔响应先前的消息而非最新一条。评论 82 条、👍 58，是目前社区讨论最激烈的话题，严重影响多任务并行时的可用性。

2. **非 OpenAI Responses API 提供商无法调用 MCP 工具** [#26234](https://github.com/openai/codex/issues/26234)
   Ollama、LM Studio、OpenRouter、AWS Bedrock 等环境下，MCP 工具因专有 `{"type":"namespace"}` 序列化格式而无法被模型调用。评论 32、👍 41，反映自定义模型生态用户的强烈诉求。

3. **Windows 沙箱导致所有 agent 命令失败** [#10090](https://github.com/openai/codex/issues/10090)
   `elevated_windows_sandbox` 触发所有命令返回 `(no output)`，日志显示 `CreateProcessAsUserW failed: 5`。评论 24，Business 订阅用户受严重影响。

4. **Windows Computer Use 启动即失败** [#37043](https://github.com/openai/codex/issues/37043)
   `sky.list_apps()` 与 `sky.list_windows()` 报 `EnumWindows failed: 0x80070003`，重启无法恢复。新增 issue 但已获得 17 条评论，Windows 桌面端稳定性问题集中爆发。

5. **允许对任意项目设置 trust_level = "trusted"** [#14599](https://github.com/openai/codex/issues/14599)
   用户希望新增配置项跳过首次打开项目的信任审批弹窗。👍 57 为今日最高，说明开发者对重复确认流程的厌倦度很高。

6. **apply_patch 在 Ubuntu 24.04 上因 Bubblewrap 失败** [#29908](https://github.com/openai/codex/issues/29908)
   loopback/userns 错误导致沙箱命令无法启动，影响 Linux 上的 `apply_patch` 与托管沙箱，评论 14。

7. **v0.147.0 引入 LiteLLM 流式请求回归** [#37425](https://github.com/openai/codex/issues/37425)
   从 0.146.0 升级到 0.147.0 后，自建 LiteLLM 代理的流式请求持续失败。作为刚发布的正式版回归，需尽快确认修复。

8. **紧急数据丢失：清理任务删除了已固定的 rollout 文件** [#37515](https://github.com/openai/codex/issues/37515)
   macOS 上四个长期运行的固定任务因 Codex 清理操作被误删，留下孤立线程。严重性最高，需立即排查清理逻辑。

9. **VS Code 扩展无法加载资源** [#37458](https://github.com/openai/codex/issues/37458)
   Windows 上 VSCode 1.132.0 中 Codex 面板启动失败，提示 "couldn't load its resources"。另有 Remote-SSH 场景下的同类问题 [#37517](https://github.com/openai/codex/issues/37517)，IDE 集成稳定性值得关注。

10. **Resume 渲染完整线程历史而非引导最新轮次** [#34663](https://github.com/openai/codex/issues/34663)
    恢复会话时会话窗口加载全部历史，影响长会话性能。评论与 👍 数虽不高，但属于开发者日常使用的高频痛点。

## 重要 PR 进展

1. **定义 code-mode 主机 gRPC 协议** [#37510](https://github.com/openai/codex/pull/37510)
   新增 `codex.code_mode.v1` protobuf API，涵盖会话管理、执行、等待、工具回调、通知与内容结果，并生成 Rust tonic 绑定与 Bazel 规则，为 Code Mode 的跨语言/跨进程通信奠定基础。

2. **MCP 事件发现与订阅** [#37494](https://github.com/openai/codex/pull/37494)
   通过 `McpResourceClient::list_events` 暴露插件运行时事件定义，支持可取消的 `events/stream` 订阅，改进 MCP 生命周期管理。

3. **禁用 code-mode WebSocket 的 Nagle 算法** [#37504](https://github.com/openai/codex/pull/37504)
   在出站远程会话与入站连接上启用 `TCP_NODELAY`，减少延迟敏感场景下的小包缓冲。

4. **工具命名空间清单进入 turn 元数据** [#37492](https://github.com/openai/codex/pull/37492)
   引入 `tool_namespaces_info` 元数据，描述每个模型可见函数的命名空间、直接/延迟暴露状态及 Code Mode 属性。同时清理了遗留的 `code_mode_tool_names` 库存。

5. **连接失败时保持响应流存活** [#37485](https://github.com/openai/codex/pull/37485)
   区分 HTTP 连接失败与其他网络错误，采样请求按 5-60 秒指数退避自动重连，并显示 "Reconnecting..." 状态，提升弱网环境下体验。

6. **忽略 cyber 模型的可复用命令审批** [#37516](https://github.com/openai/codex/pull/37516)
   对安全专项模型移除已保存的 `allow` 前缀规则，保留 prompt、forbidden、network 等策略，强化执行策略的精细管控。

7. **进程终止时保留子等待器** [#37498](https://github.com/openai/codex/pull/37498)
   修复终止 PTY 会话时子进程未被回收、退出状态丢失的问题，改用分离而非中止等待器。

8. **限制诊断日志中的负载追踪** [#37497](https://github.com/openai/codex/pull/37497)
   将 HTTP、SSE、WebSocket 的传输诊断限制在 DEBUG 级别，避免高吞吐请求压垮 SQLite 日志库与诊断环形缓冲区。

9. **远程进程沙箱委托给执行器** [#37480](https://github.com/openai/codex/pull/37480)
   远程 `exec_command` 不再通过宿主平台解析工作目录与权限配置，而是保留执行器原生配置并传递沙箱意图，提升远程执行一致性。

10. **响应元数据中携带沙箱模式** [#37507](https://github.com/openai/codex/pull/37507)
    在 regular、prewarm、compaction、detached memory 请求的 turn 元数据中加入 `sandbox_mode`，并保留该字段防止客户端覆盖，增强可观测性。

## 功能需求趋势

- **Windows 桌面端稳定性**：沙箱权限失败（`CreateProcessAsUserW`）、Computer Use 不可用、扩展资源加载失败等大量 Windows 专属 bug 集中涌现，已成当前最突出的短板。
- **MCP 生态完善**：非 OpenAI 服务商工具的命名空间兼容、OAuth 资源范围选择 [#35253](https://github.com/openai/codex/issues/35253)、插件 MCP 服务器密钥配置路径 [#24401](https://github.com/openai/codex/issues/24401) 等需求持续走高。
- **自定义模型与网关支持**：LiteLLM、AWS Bedrock、本地模型服务（Ollama/LM Studio）等第三方接入路径的稳定性与序列化兼容性备受关注。
- **会话管理增强**：对话分区、持久化顺序、增量加载长记录、Resume 引导最新轮次、线程 fork 可发现性等，是高频出现的优化方向。
- **信任与安全配置**：`trust_level` 自定义、沙箱模式的显式控制与审计（元数据化）显示用户对安全与便利平衡的更高要求。

## 开发者关注点

- **Windows 沙箱权限失败**是最集中痛点：`elevated_windows_sandbox` 与 `apply_patch` 的 `CreateProcessAsUserW failed: 5` 在多个 issue 中反复出现，且与 WindowsApps ACL 有关联（#13965、#14211、#37415），需优先修复。
- **对话上下文错乱**（回复旧消息）影响核心使用体验，社区讨论热度最高，建议尽快确认回归范围。
- **数据安全焦虑上升**：清理任务误删固定 rollout 文件的 issue 引发对数据保留策略的担忧；配置与日志 debug 信息过载也促使负载追踪降级。
- **IDE 扩展稳定性**：VS Code 侧 "couldn't load its resources" 在 Windows 与 Remote-SSH 场景均有报告，需关注扩展打包与 CSP 配置。
- **Linux 沙箱环境兼容性**：Ubuntu 24.04 上的 Bubblewrap loopback/userns 错误影响 `apply_patch`，开源社区对内核配置的依赖仍是一个隐性门槛。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-08）

## 今日速览

今日发布节奏密集，共发布 4 个版本，包括 nightly、preview 与补丁版本，核心修复聚焦于模型容量耗尽（Capacity Exhaustion）误报与配额映射问题。社区层面，Agent 可靠性仍是最大热点：Subagent 在达到 MAX_TURNS 后被误报为成功、generalist agent 挂起等问题持续获得高关注。此外，Caretaker 内部自动化体系的 PR 大量合并，标志着项目的基础设施建设进入新阶段。

---

## 版本发布

### v0.56.0-nightly.20260808.gcf22ac7e8
- **核心变更**：将 Capacity Exhaustion 重新归类为 Terminal Error（终端错误），避免在瞬时容量过载时错误终止任务。
- **依赖更新**：Caretaker 的 Firestore schema 新增 `error` 与 `pr_number` 字段，用于服务状态追踪。
- 链接：[Release v0.56.0-nightly.20260808](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260808.gcf22ac7e8)

### v0.55.0-preview.2
- **修复**：通过 cherry-pick 将修复合入 preview 分支，针对前序 preview 版本的问题进行补丁。
- 链接：[Release v0.55.0-preview.2](https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-preview.2)

### v0.54.4
- **补丁**：对 v0.54.0 系列进行 cherry-pick 修复，同时推进版本号至 0.54.2。
- 链接：[Release v0.54.4](https://github.com/google-gemini/gemini-cli/releases/tag/v0.54.4)

---

## 社区热点 Issues（Top 10）

### 1. Subagent recovery 误报成功（#22323）
**P1 / Bug / 12 条评论** — `codebase_investigator` 子代理在达到 MAX_TURNS 后被错误地标记为 `status: success` 且 Termination Reason 为 `GOAL`，导致主会话对中断情况毫无感知。该问题暴露了 Subagent 状态传播链路中的关键缺陷，社区关注度高。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22323)

### 2. Generalist agent 无限挂起（#21409）
**P1 / Bug / 8 条评论 / 👍8** — 当 Gemini CLI 委派任务给 generalist agent 时，即使是创建文件夹这类简单操作也可能永久挂起（用户最长等待 1 小时）。通过显式指令禁用 subagent 可规避。已影响多名用户。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21409)

### 3. 组件级评估体系（#24353）
**P1 / Epic / 7 条评论** — 作为行为评估的延伸，该 Epic 追踪 76 个 behavioral eval 测试在 6 个 Gemini 模型上的运行情况，目标是构建更稳健的组件级评估框架。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/24353)

### 4. AST 感知的文件读取与搜索评估（#22745)
**P2 / Epic / 7 条评论** — 探索利用 AST 感知工具提升代码读取精度（如精确读取方法边界）、减少 token 消耗、优化 codebase mapping 的可能性，是长期性能优化方向。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22745)

### 5. 模型不主动使用 skills 和 sub-agents（#21968）
**P2 / Bug / 6 条评论** — 用户反馈即使配置了 `gradle`、`git` 等自定义技能，模型在相关场景下也几乎从不主动调用，只有显式指令才生效。这直接影响了自定义扩展的实际价值。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21968)

### 6. Auto Memory 对低信号 session 无限重试（#26522）
**P2 / Bug / 5 条评论** — 后台提取 agent 对低价值会话反复重试，浪费资源。社区提议将“已处理但无价值”的 session 也标记为 processed。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26522)

### 7. Auto Memory 的确定性脱敏需求（#26525）
**P2 / Security / 4 条评论** — 当前 Auto Memory 将本地 transcript 内容发送至模型后才进行脱敏，存在隐私泄露隐患。社区提议在发送前进行确定性 redaction。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26525)

### 8. Shell 命令执行后卡在 "Waiting input"（#25166）
**P1 / Core / 4 条评论 / 👍3** — 简单 CLI 命令执行完成后，Gemini CLI 仍显示命令为 active 并等待用户输入，导致流程挂起。影响面较大，被标记为 P1。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/25166)

### 9. Browser Agent 的会话接管与锁恢复（#22232）
**P3 / Feature / 4 条评论** — 当前 `browser_agent` 在遇到 persistent 模式的 profile 锁时采用“快速失败”策略，社区建议实现自动会话接管与锁恢复，增强鲁棒性。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22232)

### 10. Browser subagent 在 Wayland 下失败（#21983）
**P1 / Bug / 4 条评论 / 👍1** — Wayland 环境下的 browser subagent 无法正常工作，终止原因错误地显示为 GOAL。对 Linux 用户影响明显。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21983)

---

## 重要 PR 进展（Top 10）

### 1. 修复模型容量耗尽误报与配额映射（#28730）
`fix(core,cli)` — 解决 CLI 中错误的 Capacity Exhaustion 提示，修正 client-side 模型配额查询映射，并确保瞬时容量过载时保留“Keep trying”选项。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28730)

### 2. 修复 IDE 连接中的目录不匹配问题（#28729）
`fix(core)` — 解决在 Cider 或 VS Code fork/远程工作区中，因 FUSE/目录路径差异导致 Gemini CLI 无法连接 IDE 扩展的问题。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28729)

### 3. web-fetch  SSRF 漏洞修复（#28725）
`fix(security)` — 修复 CVSS 8.6 的 SSRF 漏洞：攻击者可通过自定义域名指向内网 IP（如 `169.254.169.254`）绕过 DNS 防护。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28725)

### 4. 新增 Gemini 3.6 Flash 与 3.5 Flash-Lite 模型配置（#28673）
`feat(core)` — 为新一代模型添加基础定义、能力标签（thinking、multimodalToolUse）与别名解析，已适配 Code CLI。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28673)

### 5. 设置加载顺序竞态修复（#28597）
`fix(cli)` — 修复 settings 解析时机问题：原先在加载 `.env` 前就展开了 `process.env` 占位符，现已调整为先加载环境变量再解析设置。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28597)

### 6. 修复 diff hunk 标记被误读为 @file 引用（#28581）
`fix(cli)` — 防止 unified/combined diff 的 hunk 标记（`@@`）被误认为文件引用，消除了大 diff 提示下递归 glob 搜索导致的堆内存增长。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28581)

### 7. 本地评估报告命令（#28369）
`feat(evals)` — 新增 `npm run eval:report`，可从 Vitest `report.json` 聚合各模型的通过率，并关联 inventory policies。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28369)

### 8. 评估源文件静态校验工具（#28344）
`feat(evals)` — 新增 `eval:validate` 命令，对评估源文件执行 9 条静态规则校验，支持 CI 门禁（exit code 1）。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28344)

### 9. Caretaker 分诊评估框架与 Judge Runner（#28530）
`feat(caretaker-evals)` — 新增基于 LLM-as-a-Judge 的 issue 分诊评估框架，支持并行 Git Worktree 基准运行。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28530)

### 10. Caretaker Firestore Schema 更新（#28467）
`feat(caretaker)` — 跨 ingestion-service 和 triage-worker 更新状态账本 schema，新增 `error` 字段并修复自关闭状态逻辑。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28467)

---

## 功能需求趋势

1. **Agent 编排可靠性**：Subagent 的挂起、误报成功、权限失控（如无条件使用 generalist）是当前社区反馈最密集的方向，预计后续版本会强化 agent 的终止状态传播与权限控制。
2. **记忆系统（Auto Memory）的隐私与效率**：多个 Issue 聚焦于敏感信息脱敏时机、低信号 session 处理策略、无效 patch 拦截，表明记忆功能正从“能用”走向“可信”。
3. **AST 感知的代码理解**：围绕 AST-aware file read、search 和 codebase mapping 的 Epic 持续推进，目标是降低 token 消耗并提升跨文件导航精度。
4. **Browser Agent 稳定性**：Wayland 兼容性、浏览器 profile 锁恢复、settings.json 覆盖失效等问题频繁出现，是跨平台用户体验的短板。
5. **安全加固**：除 SSRF 修复外，社区也在推动确定性的 secret redaction，安全相关 PR 的合入优先级明显提升。

---

## 开发者关注点

- **Subagent 行为不可控**：开发者普遍希望模型能更主动地使用自定义 skills 和 subagents，而不是仅在显式指令下执行（#21968）。
- **Shell 执行卡顿**：命令完成后仍显示等待输入的问题被多次报告，严重影响自动化流程（#25166）。
- **工具数量上限**：当可用工具超过 128 个时出现 400 错误，开发者期望 agent 能按需裁剪工具范围（#24246）。
- **破坏性操作风险**：模型偶尔使用 `git reset --force` 等危险命令，社区呼吁引入更安全的替代方案和操作护栏（#22672）。
- **终端兼容性**：终端 resize 闪烁、外部编辑器退出后画面损坏等问题持续存在，影响日常使用体验（#21924、#24935）。
- **输出与调试信息缺失**：`/bug` 报告缺少 subagent 内部上下文，`/chat share` 也无法共享 subagent 轨迹，给问题定位带来困难（#21763、#22598）。

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报（2026-08-08）

## 今日速览

Reasonix 今日连发 v1.21.1 与 v1.21.2 两个稳定版（CLI 与 Desktop），核心亮点是输出预算上限提升至 128K，并引入缓存感知上下文投影。社区实测反馈积极，有用户验证成本下降 55~60%、缓存命中率达 99.6%+。与此同时，Windows/macOS 的崩溃与更新问题仍是主要痛点，v1.21.2 也暴露出少量回归（如桌面 UI 长会话渲染失败、停止后无法重发）。

## 版本发布

### stable · CLI/Desktop v1.21.1
> 修复了 Windows/macOS 上永久性的更新器死锁和 TUI 看门狗误杀问题，并进行内部重构以提高可维护性。

- [English Changelog](https://reasonix.io/changelog/v1.21.1/?lang=en) · [完整更新日志](https://reasonix.io/changelog/v1.21.1/)

### stable · CLI/Desktop v1.21.2
> 将输出预算提升至 128K，引入缓存感知上下文投影以更高效管理历史；通过工作实践策略加固 Agent 行为；修复文件工具、沙箱检测、钩子和更新等多项问题。

- [English Changelog](https://reasonix.io/changelog/v1.21.2/?lang=en) · [完整更新日志](https://reasonix.io/changelog/v1.21.2/)

## 社区热点 Issues

### 1. [Bug] 编码过程中进程被 kill（Windows） — #7836
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7836)
用户反馈在 Windows 上编写代码时进程频繁被终止，严重影响开发连续性。该问题已有 9 条评论，是当前社区反馈最激烈的稳定性质疑，可能与 Windows 平台的内存/进程管理有关。

### 2. [Bug] Desktop UI 长会话渲染回归（v1.21.2 regression, Linux）— #7909
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7909)
升级到 v1.21.2 后（Linux x86_64 apt 包），长会话中最后一条用户消息之后的内容无法渲染，但数据未丢失。5 条评论讨论，属于典型的新版本回归问题。

### 3. [Feature] 128K 预算优化实际效果确认：成本 -55~60%，缓存命中率 99.6%+ — #7907
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7907)
用户 `@clearnature` 提供了可信度极高的验证：本地 stats 与账单几乎完全一致（163 vs 158 请求，99.6% 命中率），并给出 8/8 详细数据分析。这说明 v1.21.2 的缓存感知投影与 C1 重放门控在真实场景中确实有效，也为后续优化提供了数据基准。

### 4. [Bug] One-shot run 无法从 redacted machine session ID 恢复（macOS）— #7429
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7429)
自动化场景下，one-shot 模式只接受 session 文件路径，不接受稳定的 machine-session-id，导致无人值守的恢复流程无法确定性地工作。4 条评论关注。

### 5. [Bug] 更新失败：a pending update already exists（Windows）— #7783
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7783)
Windows 桌面版更新器报“已存在待处理更新”，多次尝试安装失败，重启后依旧无法恢复。3 条评论。该问题已被 v1.21.1 的“更新器死锁修复”覆盖，但用户在旧版本上仍需手动处理。

### 6. [Bug] TUI 会话切换导致终端窗口回到未打开状态（Windows）— #7744
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7744)
在 Windows TUI 下切换活跃会话时，已打开的终端窗口会意外回到“未打开”状态。3 条评论，影响多会话重度用户。

### 7. [Bug] 停止回复后无法原地修改重新发送（v1.21.2）— #7920
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7920)
在 Agent 回复前手动停止后，`context canceled` 状态下“编辑”按钮不可点击，无法对这条消息进行修改重发。新报告，24 小时内出现。

### 8. [Bug] macOS 更新失败：update helper did not become ready: EOF — #7921
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7921)
v1.21.0 用户在设置中点击检查更新后，macOS update helper 返回 EOF，更新流程失败。新报告，已定位到更新器辅助进程启动问题。

### 9. [Bug] 连续按 Alt 导致卡机（Windows 10）— #7918
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7918)
光标聚焦消息框时连续按两次 Alt，整个 Reasonix 进程卡死，只能从任务管理器强制结束。新报告，属键盘快捷键相关崩溃。

### 10. [Feature] Chrome 插件需求：模拟点击与辅助测试 — #7661
[GitHub Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7661)
用户希望提供类似 Codex 的 Chrome 插件，用于模拟点击、辅助 Web 测试。3 条评论但已关闭，说明该需求被 recognized 但短期可能不是项目优先方向。

## 重要 PR 进展

### 1. feat: 输出预算提升至 128K + 缓存感知上下文投影 — #7839（已合并）
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7839)
v1.21.2 的核心 PR：全面提升 provider 默认输出预算，并将历史压缩改为 cache-aware context projection。canonical transcript 永久保留，缓存 TTL 仅影响成本策略，不再触发 cold resume 时的历史改写。这是今日 v1.21.2 最主要的功能来源。

### 2. fix(agent): 动态输出预算 + DeepSeek 共享窗口估算校准 — #7913
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7913)
修复 #7839 升级后遗留的问题：`max_output_tokens` 提升到 128K 但未配套动态计算，且固定估算低估中文会话约 1.8x，导致输入+输出超过 1M 被 DeepSeek API 拒绝（HTTP 400）。本 PR 补上动态输出预算、预算感知重放门控、估算校准三层防御。

### 3. feat(agent): 基于证据增益的自适应停滞防护 — #7915
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7915)
用“证据增益阶梯”替换固定轮数的无进展检测：每一轮的价值取决于它实际新增了哪些 reads/commands/mutations/paths，而非“是否发生”。直接构建在 ledger 已有收据之上，是 Agent 行为质量控制的重要升级。

### 4. feat(e2ebench): 轨迹批处理与恢复分解 — #7917
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7917)
围绕“时间花在哪里，是否买到了正确的解决方案”重构 e2ebench 的延迟与质量读数。引入批处理与恢复分解，所有分析均离线完成，不增加 Agent 端 instrumentation，适合评估长任务的成本结构。

### 5. feat(agent): 后台子智能体指南注入 — #7912
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7912)
实现主对话向运行中的后台子智能体注入指南（mid-run guidance）的能力，子智能体继续工作时主对话不被阻塞。新增 `Job.Steer` + `Manager.SteerJob` 通道，支持 `→` / `注入：` 指令自动转发。

### 6. fix(desktop/composer): ESC 取消 IME 组合输入 — #7919
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7919)
修复中文/日文输入法下按 ESC 关闭候选窗口时误触发 `handleCancel` 的问题。该问题在 macOS 上回复流式输出时极易复现，是亚洲用户高频痛点。

### 7. perf(desktop): 批处理会话遥测检查点 — #7916
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7916)
当前桌面端在每个 `TurnStarted`、`Usage`、`read_file` 成功后都会用 `json.MarshalIndent` 全量重写 `.telemetry.json`。本 PR 改为批处理检查点，降低 I/O 压力，对长时间会话尤为关键。

### 8. feat(flywheel): 数据飞轮 + Agent 工具结果缓存 — #7911
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7911)
实现数据飞轮四环（采集→清洗→复用→验证）：`Sink` 事件流快照 + `MCPRecorder` + BM25 轨迹检索；同时新增 Agent 层工具结果缓存，可以复用已验证的工具输出，提升多轮 Agent 执行效率。

### 9. feat(remote): 支持 SSH ProxyCommand — #7908
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7908)
通过 `ssh -G` 解析有效的 OpenSSH ProxyCommand 条目，支持作为受管理的 stdio transport 运行，并带 shell-injection 防护。对通过跳板机/代理访问远程开发环境的用户非常实用。

### 10. feat(composer): 任意时刻插入斜杠命令 / Skill — #7910
[GitHub PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7910)
Composer 增强：去除“仅在空输入时可插入”的限制，非空输入时点击 `+` 会在光标处插入 `/` 并弹出 slash 菜单。管理类命令（如 `/clear`）在非空时保持灰显以保持语义正确；同步更新 en/zh/zh-TW 三语言文案。

## 功能需求趋势

从近 24 小时的 Issues 与 PR 可以提炼出以下关注方向：

- **长上下文与成本管理**：128K 输出预算、缓存感知投影、动态预算校准成为核心话题。社区不仅关注“能用”，更关注“成本是否真的降了”以及“数据是否可信”。
- **跨平台稳定性**：Windows/macOS 上的崩溃（进程 kill、Alt 卡死）、更新器失败（死锁、EOF、pending update）频繁出现，跨平台质量是当前最大痛点。
- **Agent 可观测性与干预性**：E2E 轨迹记录（#7492）、子智能体指南注入（#7912）、数据飞轮（#7911）均指向“可调试、可指导、可复用”的 Agent 开发体验。
- **集成与扩展**：SSH ProxyCommand（#7908）、Chrome 插件（#7661）、MCP 自动暴露（#7791）等需求显示社区希望 Reasonix 更无缝地嵌入既有工作流。
- **UI/UX 细节打磨**：IME 候选框 ESC 误取消、消息编辑重发、斜杠命令插入时机、钱包余额刷新等细节受到大量关注，中文/日文输入法用户的声音尤其明显。

## 开发者关注点

- **Windows 平台稳定性是最大短板**：#7836（进程被 kill）、#7918（Alt 卡死）、#7744（TUI 状态错乱）、#7783（更新失败）均集中在 Windows，需要优先投入修复。
- **更新器体验亟待改善**：Windows 的 pending update 死锁和 macOS 的 update helper EOF 表明更新链路本身已成为新的故障源，v1.21.1 已开始处理。
- **新版本引入的回归值得警惕**：v1.21.2 的 Desktop UI 长会话渲染失败（#7909）和停止后无法重发（#7920）说明快速迭代中需要更完善的回归测试矩阵。
- **中文/日文输入法用户活跃且反馈质量高**：多条 Issue/PR 与 IME 行为相关，社区本地化反馈详实，是项目国际化的重要支撑。
- **上下文管理是“真香”但需要精耕**：128K 预算+缓存感知投影获得真实账单级验证（#7907），但也暴露出估算偏差导致 API 400 的问题（#7913），该方向仍有不少打磨空间。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-08

## 今日速览

v1.18.15 发布，重点修复消息时间顺序与截断清理问题。社区围绕 Web UI 项目列表/添加项目体验（#41156、#41155）以及 DeepSeek/Kimi 模型兼容性（#41165、#41093）展开密集讨论。代码贡献方面，Qiiks 提交了一组 provider 配置修复 PR，LinHoMo 修复了 LSP 通配符根目录检测问题。

## 版本发布

### v1.18.15
- **Bugfix 1**: 导入或遗留消息 ID 乱序时，消息时间顺序现在能保持正确。
- **Bugfix 2**: Revert 和 fork 操作改用真实消息时间线，不再依赖消息 ID 排序。
- **Bugfix 3**: 截断清理现在依据文件时间戳更可靠地移除陈旧文件。

---

## 社区热点 Issues（10 个）

### 1. #29748 [OPEN] 意外服务器错误，重启无效
作者在添加 OpenRouter API 后切换项目时出现该错误，持续数月仍未解决，社区有 7 条讨论。考虑到作者已正常使用近两个月，可能是配置切换触发了持久性的服务器状态异常。
[查看 Issue](https://github.com/anomalyco/opencode/issues/29748)

### 2. #40809 [CLOSED] Web UI 无法列出会话，但 TUI/移动端正常
Docker + Coolify + Cloudflare + Traefik 反向代理环境下，Web UI 加载正常、认证正常，但无法列出会话且无法启动 agent。暴露了 Web UI 在复杂部署环境下的兼容性问题。
[查看 Issue](https://github.com/anomalyco/opencode/issues/40809)

### 3. #41156 [CLOSED] 新会话首页显示 "Nothing here yet"
`opencode web` 新会话中，首页项目列表只读取客户端书签（客户端从不播种），导致服务器端已有项目被隐藏。这是 Web UI 项目持久化的设计缺陷。
[查看 Issue](https://github.com/anomalyco/opencode/issues/41156)

### 4. #41155 [CLOSED] "Add project" 对话框显示 "No folders found"
空查询会调用 `/find/file` 且总是返回空结果，导致目录选择器无法列出基础目录。对 Web UI 的首次使用体验影响较大。
[查看 Issue](https://github.com/anomalyco/opencode/issues/41155)

### 5. #41165 [OPEN] DeepSeek relay 发送缺少 content key 的 assistant 消息
`opencode/deepseek-v4-flash-free` 在长会话中返回 HTTP 400 `Invalid assistant message: content or tool_calls must be set`，更新到 `next-16998` 后出现。属于 relay/serializer 层的协议兼容性 bug。
[查看 Issue](https://github.com/anomalyco/opencode/issues/41165)

### 6. #41164 [OPEN] 请求为 websearch 工具添加 Synthetic 后端
内置 `websearch` 目前仅支持 `exa` 和 `parallel` 两个后端，开发者希望接入 Synthetic 的零数据留存搜索 API。零数据留存对隐私敏感用户有吸引力。
[查看 Issue](https://github.com/anomalyco/opencode/issues/41164)

### 7. #41163 [OPEN] 无图片能力的模型收到 tool-result 图片时整个请求 400
`supportsMediaInToolResult` 对 `@ai-sdk/anthropic` 和 `@ai-sdk/openai` 无条件返回 `true`，导致 GLM-5.2 等不支持视觉的模型在收到图片/PDF 附件时请求失败。
[查看 Issue](https://github.com/anomalyco/opencode/issues/41163)

### 8. #41162 [OPEN] 配置级 npm 覆盖对继承模型失效
`provider.synthetic.npm = "@ai-sdk/anthropic"` 这类配置会被静默丢弃，因为 config-merge 的 `parsed` 对象不携带 `npm` 字段。影响所有希望定制 provider SDK 的用户。
[查看 Issue](https://github.com/anomalyco/opencode/issues/41162)

### 9. #41093 [OPEN] Kimi K3 发送图片后提示缓存失效
OpenCode Zen 上 Kimi K3 在读取第一张图片后，整个会话的 prompt 缓存全部 miss，导致成本与限额使用量飙升。Kimi K2.7 无此问题。
[查看 Issue](https://github.com/anomalyco/opencode/issues/41093)

### 10. #41168 [OPEN] LSP 根目录检测对通配符标记静默回退到工作区根目录
Haskell（`*.cabal`）、Terraform（`*.tf`）、Julia（`*.jl`）、Swift（`*.xcodeproj`）等语言服务器使用 glob 模式声明项目根，当前 `Filesystem.up()` 无法匹配，导致 LSP 功能不完整。
[查看 Issue](https://github.com/anomalyco/opencode/issues/41168)

---

## 重要 PR 进展（10 个）

### 1. #41169 fix(lsp): 匹配通配符根标记如 *.cabal
直接关闭 #41168。修改 `Filesystem.up()` 以支持 glob 模式的文件名匹配，解决 Haskell/Terraform/Julia/Swift 等 LSP 的根目录识别问题。
[查看 PR](https://github.com/anomalyco/opencode/pull/41169)

### 2. #41158 fix(app): 从首页填充项目选择器
保留支持空搜索索引结果的服务器版本结果，并在空搜索时回退到列出当前主目录。纯前端兼容性修复，针对 #41156 系列 Web UI 项目列表问题。
[查看 PR](https://github.com/anomalyco/opencode/pull/41158)

### 3. #41113 [CLOSED] feat(tui): 渲染 Mermaid 图表
在 TUI 会话记录中直接渲染 Mermaid 流程图、时序图和状态图。渲染器封装为私有包 `@opencode-ai/merman` 并以 TUI 插件形式激活，显著增强 TUI 的可视化能力。
[查看 PR](https://github.com/anomalyco/opencode/pull/41113)

### 4. #41170 [CLOSED] feat(console): 添加 workspace unblock 端点
新增 Support API 端点，使用现有 `SUPPORT_API_KEY` 认证，验证工作区 ID 并清除封禁状态，重复 unblock 保持幂等。
[查看 PR](https://github.com/anomalyco/opencode/pull/41170)

### 5. #41147 [CLOSED] fix(tui): 显示外部 worktree 会话标签
恢复主项目目录之外（如 Git worktree）会话的目录标签，之前的清理逻辑误删了这些标签。
[查看 PR](https://github.com/anomalyco/opencode/pull/41147)

### 6. #41160 feat(tool): 添加 Synthetic web search 后端
在 `exa` 和 `parallel` 之外新增 `synthetic` 搜索后端，对接 Synthetic 的零数据留存 API。面向隐私敏感场景。
[查看 PR](https://github.com/anomalyco/opencode/pull/41160)

### 7. #41161 fix(session): 为不支持 attachment 的模型提取 tool-result media
当模型 `attachment: false` 时，从 tool-result 中剥离图片/PDF 等媒体内容，避免 Anthropic/OpenAI SDK 无条件支持媒体导致请求 400。
[查看 PR](https://github.com/anomalyco/opencode/pull/41161)

### 8. #41159 fix(provider): 传播配置级 npm override 到继承模型
修复 `provider.synthetic.npm = "@ai-sdk/anthropic"` 这类配置被静默丢弃的问题，确保继承自 models.dev 的模型也能应用自定义 npm 包。
[查看 PR](https://github.com/anomalyco/opencode/pull/41159)

### 9. #41167 feat(opencode): 为 web 用户增加 --no-open 选项
新增 `opencode web --no-open`，允许启动 Web UI 而不自动打开浏览器标签页。适合远程服务器或自动化脚本场景。
[查看 PR](https://github.com/anomalyco/opencode/pull/41167)

### 10. #40923 [OPEN] feat: 原生后台子代理 + 自动重试临时提供商错误
为 `Task` 增加 `background` 模式，配合 `next_agent`/`agents_status` 实现原生后台子代理编排，并可对瞬时提供商错误自动续跑，提升长时间任务的稳定性。
[查看 PR](https://github.com/anomalyco/opencode/pull/40923)

---

## 功能需求趋势

- **Web UI 体验完善**：连续多个 issue（#41156、#41155、#40809）指向 Web UI 在项目列表、目录选择、远程部署环境下的体验缺陷，社区关注度很高，且已有对应 PR。
- **模型/提供商兼容性**：DeepSeek relay 协议错误（#41165）、Kimi K3 缓存失效（#41093）、GLM 视觉能力误判（#41163）表明多模型适配是当前核心痛点。
- **自定义搜索后端**：用户希望 websearch 支持更多后端（#41164），Synthetic 的零数据留存特性是主要卖点。
- **TUI 可视化增强**：Mermaid 渲染 PR（#41113）受到关注，终端内图表展示成为 TUI 发展方向。
- **配置灵活性与一致性**：provider 级 npm 覆盖被丢弃（#41162）暴露了配置合并的深层问题，开发者对自定义 provider SDK 有明确需求。

## 开发者关注点

- **错误恢复与可观测性**：#29748 长期未解的服务器错误提示「check server logs」，但用户无法定位根因，日志可诊断性有待加强。
- **客户端-服务器状态一致**：Web UI 只读客户端书签（#41156）、空查询返回空结果（#41155），本质上都是客户端/服务器状态不同步问题，社区期待更统一的状态管理。
- **成本控制**：Kimi K3 缓存失效导致费用飙升（#41093）是成本敏感用户的直接痛点，提示缓存策略需要更严格的回归测试。
- **LSP 多语言支持**：通配符根目录检测（#41168）影响 Haskell/Terraform/Julia/Swift 用户，该问题在贡献者响应后数小时内即有 PR 跟进，社区协作效率较高。

---

*日报生成时间：2026-08-08 · 数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-08

## 今日速览

昨日发布两个 nightly 版本（v0.21.7-nightly.20260808、v0.21.7-nightly.20260807），核心修复为 CI autofix 接管阻塞问题。社区活跃度集中在 ACP/IDE 集成体验（JetBrains 上下文用量展示）、Git 安全加固（跨工作树/仓库配置执行命令）以及 Web Shell 交互能力（tmux 终端、全屏面板）三条主线。

---

## 版本发布

### v0.21.7-nightly.20260808.4ec0371e6
- **fix(ci):** 暴露被阻塞的 autofix takeover 准入问题（[#8410](https://github.com/QwenLM/qwen-code/pull/8410)）
- **docs:** 补充 `serve` 子会话并发行为说明

### v0.21.7-nightly.20260807.fca8f3c1f
- 包含上述 CI 修复的早期版本

🔗 [完整变更日志](https://github.com/QwenLM/qwen-code/releases)

---

## 社区热点 Issues（全部 4 条）

### 1. [#8513 [已关闭] [ACP] 让 ACP 客户端显示上下文用量](https://github.com/QwenLM/qwen-code/issues/8513) · P2 / feature-request / IDE 集成
> 作者 @kenconnet666 | 评论 3 | 更新 08-08

**要点：** Qwen Code 作为 ACP agent 嵌入 JetBrains AI Assistant（IDEA 2026.2 原生 ACP 支持）时，上下文用量指示器不显示，而 Codex 等 agent 正常。根本原因是缺失标准 `usage_update` 会话更新事件。
**意义：** 该问题已被 [#8528](https://github.com/QwenLM/qwen-code/pull/8528) 修复并关闭，是“社区反馈 → 快速修复”的典型闭环，表明 JetBrains 用户群在快速壮大。

### 2. [#7167 [开放] Fleet Shepherd 仪表板](https://github.com/QwenLM/qwen-code/issues/7167) · scope/ci-cd
> 机器人维护 | 评论 3 | 更新 08-08

**要点：** 自动化工作流仪表板，跟踪 PR 同步状态（如 #8665 落后 26 个提交）。非人工 issue，但对观察 CI/CD 健康度有参考价值。

### 3. [#8495 [已关闭] stream-json 中断导致会话不可用](https://github.com/QwenLM/qwen-code/issues/8495) · P2 / bug / CLI 非交互模式
> 作者 @ryan-mt | 评论 3 | 更新 08-08

**要点：** 非交互 stream-json 模式下，中断当前 turn 会同时杀掉会话生命周期控制组件（control dispatcher 与 model turn 共用同一信号），导致会话后续不可用。
**意义：** 直击 CLI 会话管理核心缺陷，后续已有 [#8711](https://github.com/QwenLM/qwen-code/pull/8711) 文档澄清中断语义，说明团队已认可该行为边界。

### 4. [#8296 [已关闭] qqbot openid 提示处理遗留问题](https://github.com/QwenLM/qwen-code/issues/8296) · scope/qqbot
> 作者 @Eric-GoodBoy-Tech | 评论 1 | 更新 08-08

**要点：** 记录 PR #8233 审查中推迟的 4 项问题：用户名缺失回退、位置规则漏洞、测试 mock 代理、去重键上限。
**意义：** 非阻断问题的跟踪示例，体现了社区对 QQ 渠道消息处理的精细化要求。

---

## 重要 PR 进展

> 以下 10 个 PR 按主题重要性排序。

### ACP / IDE 集成

#### [已关闭] #8528 [fix(acp): 发出标准 context usage 更新](https://github.com/QwenLM/qwen-code/pull/8528)
> @zjunothing | 更新 08-08

修复 #8513：每次主会话模型交互后发送标准 ACP `usage_update` 通知，`used` 取提示上下文占用（缺省时回退到 provider 总 token 数），`size` 取当前模型上下文窗口。JetBrains AI Assistant 现可正确显示用量指示器。

#### [开放] #8526 [feat(cli): 通过 ACP 暴露 reasoning effort](https://github.com/QwenLM/qwen-code/pull/8526)
> @zjunothing | 更新 08-08

新增标准 ACP session selector：`thought_level` 提供 Default/Low/Medium/High/Extra high/Max 六档，支持 `session/set_config_option` 应用与清除。复用 Qwen 的推理配置，使客户端可感知并控制模型思考强度。

#### [已关闭] #8670 [feat(telemetry): 区分 daemon/desktop 来源会话](https://github.com/QwenLM/qwen-code/pull/8670)
> @yiliang114 | 更新 08-08

不增加 payload 字段的前提下，让 `qwen serve` 派生的会话可归因到 daemon 或 desktop 渠道，便于官方统计各入口使用分布。

### Git 安全加固

#### [开放] #8687 [feat(daemon): 防护跨工作树 Git 变更](https://github.com/QwenLM/qwen-code/pull/8687)
> @wenshao | 更新 08-08

对模型发起的 `run_shell_command` 增加宿主侧防护：识别 `-C`、`--work-tree`、`--git-dir` 参数，若解析后目标逸出当前会话工作区，则拦截变更类/未分类命令。防止模型借 Git 命令操作仓库外文件。

#### [开放] #8645 [fix(core): 仓库配置执行程序时需确认只读 Git 命令](https://github.com/QwenLM/qwen-code/pull/8645)
> @yiliang114 | 更新 08-08

`git status/diff/log/show/blame` 等只读命令默认自动审批，但 Git 可在仓库本地配置（如 `pager`、`diff.external`）中执行任意程序。本 PR 在注入 `--no-optional-locks` 等隔离参数的同时，对这类命令补充确认流程，封堵文本匹配绕过。

### 环境与子进程隔离

#### [开放] #8663 [fix(cli): 清理 daemon 子进程继承的 loader 环境变量](https://github.com/QwenLM/qwen-code/pull/8663)
> @wenshao | 更新 08-08

`qwen serve` 派生的会话会继承启动 shell 中的 `NODE_OPTIONS`（含 dev-harness `--import` 钩子）、`NODE_PATH`、`LD_*`/`DYLD_*`、`BASH_ENV`/`ENV` 等影响加载器的变量，导致会话环境不纯净。本 PR 在子进程启动时清除这些变量。

### 核心功能

#### [开放] #8465 [feat(core): 为长时运行 Goal 持久化证据检查点](https://github.com/QwenLM/qwen-code/pull/8465)
> @qqqys | 更新 08-08

当 Goal 证据目录触及硬上限前，暂停自动续跑，并由独立 verifier 将累积证据压缩为有界摘要后落盘。此后可基于该检查点恢复推理，突破上下文/存储限制。

#### [开放] #8522 [fix(core): 免重连刷新 MCP 会话元数据](https://github.com/QwenLM/qwen-code/pull/8522)
> @zjunothing | 更新 08-08

当 `trust`、`alwaysLoadTools`、`includeTools`、`excludeTools` 变化时，无需重建底层连接即可刷新该会话的 tool/prompt/resource 注册。将 handle 生命周期身份与传输身份解耦，项目级信任配置同步到已激活会话。

### Web Shell 交互

#### [开放] #8613 [feat(web-shell): tmux 交互式终端子代理](https://github.com/QwenLM/qwen-code/pull/8613)
> @wenshao | 更新 08-08

允许 agent 在 daemon 主机上的 tmux 会话中运行交互式 CLI（REPL、其他 agent CLI、TUI 应用），作为后台任务驱动，并在 Web Shell 中实时展示可交互终端视图。新增 `t...` 命令族。

#### [开放] #8614 [feat(web-shell): 右侧工件面板全屏视图](https://github.com/QwenLM/qwen-code/pull/8614)
> @wenshao | 更新 08-08

在 Web Shell 右侧面板（artifacts、subagents、review changes、monitors、scheduled tasks）标题栏新增展开/收起按钮，支持全屏沉浸式查看。

### 性能优化

#### [开放] #8708 [perf(review): 内置软工具调用预算](https://github.com/QwenLM/qwen-code/pull/8708)
> @wenshao | 更新 08-08

为 review 计划新增 `agentToolBudget`，并固化到每个 finder、chunk、invariant、persona、reverse-audit prompt 中作为软上限：`clamp(30 + effective/20, 30, 60)`，防止单个 agent 过度消耗工具调用。

---

## 功能需求趋势

从全部 Issues 与 PR 中提炼的社区关注方向：

1. **ACP/IDE 生态深度对接（高频）**
   - JetBrains AI Assistant 的上下文用量展示（#8513 → #8528）
   - reasoning effort 选择器（#8526）
   - 说明 ACP 已成为 Qwen Code 面向 IDE 用户的核心协议，社区对协议完整性要求提高。

2. **Git 操作安全边界（强需求）**
   - 同时出现跨工作树约束（#8687）与仓库配置执行程序确认（#8645），说明模型驱动 Git 命令时的权限收敛是当前重点。

3. **守护进程（daemon）环境治理**
   - 环境变量泄漏（#8663）、会话归因（#8670），聚焦 `qwen serve` 运行时的隔离性与可观测性。

4. **Web Shell 从“查看器”走向“操作台”**
   - 支持 tmux 交互式终端（#8613）、全屏面板（#8614），用户希望在浏览器内获得完整的终端操作体验。

5. **会话生命周期语义明确化**
   - stream-json 中断问题（#8495 已修复，随后 #8711 补充文档），开发者对“中断/取消/关闭”的边界定义敏感。

6. **长任务持久化**
   - Goal 证据检查点（#8465）表明社区在推动 Agent 跨会话/跨重启的续跑能力。

---

## 开发者关注点

从 issue 详情与 PR 描述中可见的高频痛点：

- **中断机制的副作用**：`interrupt()` 会殃及会话控制组件，导致会话不可复用——这属于 API 语义设计的用户学习成本，文档澄清（#8711）是缓解手段，后续或需更细粒度的信号隔离。
- **环境变量“脏继承”**：daemon 模式从启动 shell 继承 `NODE_OPTIONS`、`LD_PRELOAD` 等变量，可能引入非预期的模块加载或行为污染，影响调试与复现。
- **Git 命令白名单可被绕过的隐患**：利用仓库本地配置执行程序，只需一条“只读”命令字符串即可触发任意代码执行，是当前安全审计的重点场景。
- **WebSearch 配置门槛**：开启 `tools.webSearch.enabled` 但未配置搜索模型时提示信息过简，用户无法快速定位修复方法（#8665 增加了可复制配置示例）。
- **MCP 配置变更落地难**：修改 `includeTools`/`excludeTools` 后必须重连才能生效（#8522 已针对优化），社区期望配置热更新常态化。

---

> 日报数据来源：[github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) · 数据采集时间窗口：2026-08-07 ~ 2026-08-08

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报 — 2026-08-08

数据来源：github.com/NousResearch/hermes-agent  
过去 24 小时：19 条 Issue 更新，50 条 PR 更新，无新 Release。

## 1. 今日速览

今日社区讨论最密集的方向是 **Memory 架构重构、插件接口扩展和桌面端稳定性**。`#78647` 的 god-file 分片 Epic 已积累 60 条评论，`#17565` 要求开放 temperature 配置获得 13 👍；同时新出现多起 P2 级桌面端与记忆提供方 bug，说明「日常可用性」仍是用户最关心的短板。

## 3. 社区热点 Issues

### 1. Epic: Shard all 20 god files — 仓库级 god-file 分解
`#78647`｜作者 @andrexibiza｜60 条评论  
仓库级重构 Epic，确立「god files 只拆不建」政策，是当前架构演进的核心争议点，直接影响后续模块化方向。  
🔗 https://github.com/NousResearch/hermes-agent/issues/78647

### 2. Tracking: Plugin Interface Expansion — 社区插件接口扩展计划
`#64182`｜作者 @teknium1｜30 条评论  
来自 Discord 社区讨论的插件接口扩展参考计划，目标是让长期排队 PR 能基于稳定 API 发布，是插件生态建设的关键路线图。  
🔗 https://github.com/NousResearch/hermes-agent/issues/64182

### 3. Feature: Configurable Temperature Parameter for Model Inference
`#17565`｜作者 @cedricwyh｜13 👍，11 条评论  
当前温度参数被硬编码，用户无法控制，被认为是幻觉问题的重要来源之一。这是本期获得 👍 最多的功能需求。  
🔗 https://github.com/NousResearch/hermes-agent/issues/17565

### 4. Feature: Configurable Memory Backends — disable memory.md, use honcho/fact_store only
`#47349`｜作者 @TechFlipsi｜1 👍，15 条评论  
建议将 `memory.md` 改为 `rules.md`，并支持可配置内存后端。当前固定注入 `MEMORY.md` / `USER.md` 的方式被认为过于僵化。  
🔗 https://github.com/NousResearch/hermes-agent/issues/47349

### 5. Treat memory-context as background context, not authoritative user-message content
`#31584`｜作者 @telnetdoogie｜P2，11 条评论  
Memory 内容被模型误当成用户指令，既容易混淆行为，也可能成为恶意投毒面。社区希望明确 memory 的「背景上下文」定位。  
🔗 https://github.com/NousResearch/hermes-agent/issues/31584

### 6. PreToolUse enforcement hook — LLM doesn't follow system-prompt/memory rules under recency bias
`#40662`｜作者 @wzgrx｜10 条评论  
调试场景下，模型因 recency bias 持续忽略调试规范。社区呼吁在工具调用前增加强制的 PreToolUse 校验钩子。  
🔗 https://github.com/NousResearch/hermes-agent/issues/40662

### 7. Feature: Hybrid Tool Pre-Selection (Semantic + Keyword)
`#13332`｜作者 @jack2684｜4 👍，9 条评论  
每次 API 调用注入全部工具 schema（约 14K tokens），成本高且浪费。RAG 式混合预选方案可显著降低 token 开销且不增加额外 LLM round trip。  
🔗 https://github.com/NousResearch/hermes-agent/issues/13332

### 8. Feature: Cognitive Memory Operations — LLM-Driven Encoding, Consolidation, Adaptive Recall
`#509`｜作者 @teknium1｜4 👍，7 条评论  
借鉴 CrewAI，希望将记忆从纯文本读写升级为编码、整合、自适应召回，支持矛盾检测与置信度感知。  
🔗 https://github.com/NousResearch/hermes-agent/issues/509

### 9. Bug: `hermes memory status` reports "Memory tool: disabled" despite memory injection enabled
`#81430`｜作者 @ZenGraphix｜P2，新提交  
Telegram 会话中内存工具调用返回完整成功结构，但实际什么都没写入；`memory status` 与 `hermes doctor` 结果互相矛盾。  
🔗 https://github.com/NousResearch/hermes-agent/issues/81430

### 10. Bug: Desktop — assistant final answer rendered twice after tool-heavy turn
`#81422`｜作者 @networthexplained｜P2，新提交  
macOS Desktop 在 Grok 4.5 / xAI OAuth 多轮工具调用后，最终回答重复渲染两次，而后端仅有一条记录。桌面端稳定性问题再次被点名。  
🔗 https://github.com/NousResearch/hermes-agent/issues/81422

## 4. 重要 PR 进展

### 1. fix(mcp): isolate runtime ownership by profile
`#80746`  
MCP runtime 和 tool registry 原为进程级全局共享，多 profile 配置同名 server 时会互相覆盖状态/句柄。此 PR 改为按 profile 隔离。  
🔗 https://github.com/NousResearch/hermes-agent/pull/80746

### 2. fix(gateway): preserve saved voice mode on /voice join
`#81053`  
修复 Discord `/voice join` 无条件写入 `"all"`、覆盖用户已保存的 `voice_only` / `off` 模式的问题。  
🔗 https://github.com/NousResearch/hermes-agent/pull/81053

### 3. fix(cron): name the real cause when no model resolves
`#81426`  
`config.yaml` 加载失败时，原错误信息被静态模板误报为 `model.default missing`。此 PR 让 cron 任务暴露真实失败原因。  
🔗 https://github.com/NousResearch/hermes-agent/pull/81426

### 4. fix(goals): don't treat 'blocked on user input' as goal DONE; auto-resume WAIT
`#81432`  
无人值守 `/goal` 循环中，「需要用户输入」不应被判定为 DONE；PR 同时支持 WAIT 状态自动恢复。  
🔗 https://github.com/NousResearch/hermes-agent/pull/81432

### 5. fix(browser): scroll target into view before click
`#81431`  
`browser_click` 对视口外元素会误报成功，但底层实际没有触发 DOM 事件。修复后先滚动到目标再点击。  
🔗 https://github.com/NousResearch/hermes-agent/pull/81431

### 6. fix(email): handle IMAP fetch framing bytes
`#81429`  
修正 IMAP FETCH 响应中 RFC822 元组定位，避免协议 framing 字节导致的解析失败；畸形响应会重试而非直接标记已读。  
🔗 https://github.com/NousResearch/hermes-agent/pull/81429

### 7. fix(kanban): keep block-loop triage out of the auto-decomposer
`#81353`  
关闭 `#79738`。Kanban 中 `block_loop_detected` 的重路由不再被 auto-decomposer 静默撤销，避免 `review-required` 任务被错误拆解。  
🔗 https://github.com/NousResearch/hermes-agent/pull/81353

### 8. fix(codex): let Kanban worktree workers finish headlessly
`#63375`  
为 Codex 后台 worker 显式声明 workspace 所有权，解析 linked-worktree Git 元数据，并隔离 `TMPDIR` / `TMP` / `TEMP`，提升安全边界。  
🔗 https://github.com/NousResearch/hermes-agent/pull/63375

### 9. feat(providers): discover pip-installed model providers via entry points
`#81419`  
模型 provider 插件可通过 pip entry points 安装并被自动发现，弥补当前仅扫描文件系统导致的文档/行为不一致。  
🔗 https://github.com/NousResearch/hermes-agent/pull/81419

### 10. feat: add background review config gate
`#81424`  
新增 `agent.background_review.enabled` 默认开启的总开关，统一控制标准 finalizer 与 Codex runtime 的自动 memory/skill review fork。  
🔗 https://github.com/NousResearch/hermes-agent/pull/81424

## 5. 功能需求趋势

- **Memory 系统可配置化与语义化**：社区强烈希望摆脱固定 `MEMORY.md` / `USER.md` 架构，转向可切换后端、认知记忆编码、背景上下文隔离。代表 Issue：`#47349`、`#509`、`#31584`。
- **Agent 行为控制的硬约束**：temperature 配置、PreToolUse 强制 hook、质量门禁、目标循环自动恢复等需求，都指向「让模型更可预测、更可干预」。代表 Issue：`#17565`、`#40662`、`#28056`。
- **Token 成本优化**：工具 schema 全量注入导致的高 token 消耗，正在催生混合预选、RAG 式 schema 注入等方案。代表 Issue：`#13332`。
- **桌面端进入「稳定优先」阶段**：Windows 本地路径打不开、macOS 回答重复渲染、Projects 概念混乱等反馈密集出现，社区不再满足于功能数量，而是要求 basic chat 稳定性。代表 Issue：`#80946`、`#81422`、`#81423`。
- **插件生态与协议标准化**：插件接口扩展、pip entry points 发现、MCP 按 profile 隔离、Buzz presence 等 PR 显示平台适配层正在快速补全。代表 PR：`#64182`、`#81419`、`#80746`。

## 6. 开发者关注点

- **Memory 状态一致性差**：`memory status` 报 disabled 但实际注入正常；工具返回 success 却没有任何写入；Desktop 会话中 provider tools 未注入。这类「假成功、真失败」问题最打击信任。
- **错误信息误导排查**：cron 任务因 `config.yaml` 不可读被误报为 `model.default missing`，开发者希望错误信息直接指向 root cause。
- **系统规则在调试场景失效**：多轮工具调用后 recency bias 会让模型无视 SOUL.md / memory 中的调试规范，需要强制 hook 而非提示词优化。
- **更新流程存在回退风险**：Intel macOS 上 `hermes update` 可能把可用的 slim/local-ONNX 运行时回退到 ancient 全量包，影响依赖修复逻辑的兼容性。
- **桌面端日常聊天稳定性不足**：macOS 用户明确反馈「还不是 daily driver」，问题集中在重复渲染、隐藏面板穿透、项目概念混淆，以及本地文件路径无法打开。

</details>
