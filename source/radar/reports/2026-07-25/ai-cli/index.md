---
title: "AI CLI 工具社区动态日报"
date: 2026-07-25
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# AI CLI 工具社区动态日报 2026-07-25

> 生成时间: 2026-07-25 00:38 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-07-25）

## 1. 生态全景

当前 AI CLI 工具正从“代码辅助”快速向“全自主 Agent”演进，但社区反馈显示**稳定性和可预测性正在成为比功能密度更关键的竞争因子**。各工具普遍在三个层面承受压力：模型行为控制（用户规则被系统策略覆盖）、安全机制成熟度（误报与静默干预）、以及跨平台/跨服务兼容性（MCP 生态、Windows 体验）。大厂产品（Claude Code、OpenAI Codex）迭代速度领先，但社区信任因“升级后工作流退化”而受损；独立项目（DeepSeek Reasonix、Hermes）则在特定领域（确定性规划、语音/网关）建立差异化。总体来看，行业正处于从“锦上添花”向“生产依赖”转型的阵痛期，可观测性、成本透明度和 Agent 行为可解释性成为共同突破口。

## 2. 各工具活跃度对比

| 工具 | 今日 Release | 热点 Issues* | 重要 PR* | 活跃度评价 |
|---|---|---|---|---|
| **Claude Code** | v2.1.219（Opus 5 默认） | Top10（含 5 个当日新建） | 1（#80883） | 中等；发版频繁但 PR 活动急剧收缩，官方主导修复 |
| **OpenAI Codex** | 4 个 alpha（rust‑v0.146.0‑a.6~9） | Top10（多个涉及额度/压缩） | Top10（合并速度高） | 高；基础设施级 PR 密集，企业支持显著加速 |
| **Gemini CLI** | 无 | Top10（P1 级代理卡死/误报成功） | Top10（含评测框架与安全修复） | 中高；无发版但 PR 质量高，社区反馈活跃 |
| **DeepSeek Reasonix** | v1.17.20（隐私机器接口） | Top10（Defender 误报、规划混乱） | Top10（确定性路由、签名修复） | 高；核心架构 PR（#6918）合并，社区贡献者参与 |
| **OpenCode** | v1.18.5（Claude 思维/OpenAI 中断修复） | Top10（Go 计划模型兼容性） | Top10（MCP OAuth、TUI 修复） | 高；小步快跑，模型兼容性为绝对焦点 |
| **Qwen Code** | v0.21.0（Web Shell 工作区） | Top10（QWEN.md 覆盖、MCP兼容性） | Top10（SWE-bench POC、PR review） | 高；CI 基础设施成熟，功能上新密集 |
| **Hermes** | 无 | Top10（编码修复、文件锁） | Top10（网关重连、TTS 流式） | 中高；大量历史 bug 被一次性关闭，代码清理为主 |

> *「热点 Issues」与「重要 PR」均基于各日报精选的 Top10 列表，非全量计数；实际全量数据可能更高。

## 3. 共同关注的功能方向

### ① Agent 行为可控性与透明度
- **涉及工具**：几乎全部（Claude Code #80988/heron_brook、Gemini CLI #22323 子代理误报成功、DeepSeek Reasonix #6789 Planner-Executor 双重输出、Qwen Code #7679 QWEN.md 被覆盖、OpenCode #38770 背景子代理静默回退、OpenAI Codex #33314 Multi‑Agent 生命周期缺失）
- **核心诉求**：用户规则具备最高优先级；运行时行为可观测、可回放、可干预。

### ② 安全审查误报与静默干预
- **涉及工具**：Claude Code #81026‑28（Fable 5）、OpenAI Codex #34306 等（安全插件占额度后才拦截）、DeepSeek Reasonix #6898（Auto Guard 频繁拦截正常 bash）
- **核心诉求**：提供误报补救/白名单机制；审查在消耗配额**前**给出透明提示。

### ③ 跨平台（尤其 Windows）兼容性
- **涉及工具**：Claude Code #76357（更新锁死）、OpenAI Codex #22085（git.exe 失控）、Gemini CLI #28531（CRLF 差异）、DeepSeek Reasonix #6848（Defender 误报）、Hermes 批量关闭编码 bug
- **核心诉求**：Windows 体验与 macOS 对齐，编码问题不再静默出错。

### ④ MCP/插件生态可靠性
- **涉及工具**：Claude Code #36431（Telegram 4 个月未修）、OpenAI Codex #31310（刷新顺序）、Gemini CLI #28481（OAuth 令牌刷新）、Qwen Code #7697（VS Code MCP 兼容性弱）、OpenCode #33715（OAuth 竞态）
- **核心诉求**：插件注册/发布/鉴权流程标准化，提升长连接稳定性。

### ⑤ 上下文压缩与资源消耗透明化
- **涉及工具**：Claude Code #80883（Auto-Compact 安全网）、OpenAI Codex #35032（压缩残留 80% → 重复压缩）、Gemini CLI #26522（自动记忆无限重试）、Hermes #71097（原地压缩失效）
- **核心诉求**：压缩行为可控制、结果可验证；提供实时 TPS/TTFT、额度重置时间等量化指标。

## 4. 差异化定位分析

| 工具 | 核心差异 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 背靠 Anthropic Opus 模型，强调企业级沙箱与安全策略 | 企业开发者、安全敏感团队 | 模型驱动 + 沙箱网络白名单；但“静默覆盖”策略正在侵蚀信任 |
| **OpenAI Codex** | 多 Agent 框架（Multi‑Agent V2）与 MCP 生态并重 | 从个人到企业的广泛群体 | Rust 重写 + 高度 CI 化；模型路由与上下文压缩算法是当前瓶颈 |
| **Gemini CLI** | 强调**自主代理**（Generalist/Subagent）与评测基础设施 | GCP/Google 生态开发者 | 投入 Caretaker 评测框架与 Firestore 同步，走数据驱动 Agent 质量路线 |
| **DeepSeek Reasonix** | **确定性规划路由**（#6918），细粒度配置与隐私保护 | 追求可预测性与隐私的开发者 | 架构级创新（显式路由），社区贡献活跃，Windows 兼容性修复为主 |
| **OpenCode** | **多模型网关**（OpenCode Go Plan）与 TUI 优先 | 多模型重度使用者、偏好终端的开发者 | 请求清洗与协议适配是最大挑战；TUI 和 cli 体验为核心卖点 |
| **Qwen Code** | **Web Shell + 原生 Code Review 自动化** + 外部渠道（钉钉） | 阿里云用户、需要 AI 原生代码审查的团队 | 功能密度高：Git 工作树、只读 PR 面板、SWE-bench 全量评测 |
| **Hermes** | **网关架构 + 语音交互** + 凭据池管理 | 远程部署、语音集成需求高的团队 | 凭据全链路脱敏、流式 TTS、跨进程文件锁；平台编码治理是近期焦点 |

## 5. 社区热度与成熟度

- **高热度 + 高成熟度**：**Claude Code** 社区规模最大（单 Issue 76 条评论），但 PR 收缩且信任度受版本退化影响；**Qwen Code** 工程体系完整（SWE-bench POC），社区贡献与官方开发均衡，成熟度最高。
- **高热度 + 快速迭代**：**OpenAI Codex** 与 **Gemini CLI** 受益于 OpenAI 和 Google 的研发资源，Release/PR 频率领先，但 Bugs 数量同样突出，用户期望与实际体验差距较大。
- **活跃社区 + 独立驱动**：**DeepSeek Reasonix** 与 **OpenCode** 团队规模虽小，但核心 PR 响应快，社区贡献接纳度高，产品迭代方向明确（确定性路由 / 多模型兼容）。
- **清理转型期**：**Hermes** 今日集中关闭大量历史编码 Issue，说明项目正从“功能堆砌”转向“生产质量打磨”，成熟度在追赶中。

## 6. 值得关注的趋势信号

1. **Agent 可解释性成为刚需**：超过 5 个工具出现子代理“误报成功”、“卡死无报错”、“配置被忽略”等问题。开发者要求 Agent 的决策（尤其是失败/中断）必须附带可分享的上下文轨迹，而非简单的 `GOAL` 状态。这是 Agent 走向生产级的基本前提。

2. **系统策略与用户意愿的博弈**：Claude Code 的 `heron_brook` 和 Qwen Code 的 `QWEN.md` 被覆盖表明，厂商出于安全/体验考量注入的系统级行为若缺乏 opt‑out，会迅速引发信任危机。未来“可降级的系统策略”将成标配。

3. **多模型/多提供商路由的技术挑战**：OpenCode Go 计划、DeepSeek Reasonix 的提供商预设、Hermes 的凭据池轮换，反映出工具正从单一模型走向聚合网关。随之而来的是请求协议兼容性、参数清洗、速率限制协调等新问题——这是架构复杂度上的关键跳跃。

4. **成本可观测性与控制工具的缺失**：OpenAI Codex Pro 额度无预警耗尽、Claude Code 支付失败、Gemini CLI Auto Memory 无限重试，暴露了当前 CLI 在资源计量、预算告警上的严重不足。具备实时用量可视化与配额策略引擎的产品将获得竞争优势。

5. **从“生成”到“验证”的基础设施化**：Gemini Caretaker Evals（#28530）和 Qwen SWE-bench 全量流水线（#7656）标志着行业开始将 Agent 质量评估 CI/CD 化。未来“Agent 测试标准”可能像 CI 一样嵌入开发流程，成为选型考量的一部分。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

好的，作为一名专注 Claude Code 生态的技术分析师，基于你提供的 **`anthropics/skills`** 仓库数据（存档截止 2026-07-25），以下是社区热点与生态分析报告。

---

### 1. 热门 Skills 排行

**核心观察：** 热门 PR 呈现两极分化——**工具链修复** 与 **特定领域专业技能** 并驾齐驱。其中 `run_eval.py` 的故障已成为社区最大公害，围绕它的修复 PR 占据了最高热度。

**① 技能评估修复合辑（run_eval 相关）**
- **PR:** [#1298](https://github.com/anthropics/skills/pull/1298) / [#1323](https://github.com/anthropics/skills/pull/1323) / [#1099](https://github.com/anthropics/skills/pull/1099) / [#1050](https://github.com/anthropics/skills/pull/1050)
- **功能：** 修复 `run_eval.py`（及消费其信号的 `run_loop.py`）长期报告 `recall=0%` 的致命缺陷。
- **社区热点：** 涉及 Windows 子进程管道读取崩溃、`PATHEXT` 未设置导致找不到 `claude` 命令、技能名检测失效等多个底层问题。Issue [#556](https://github.com/anthropics/skills/issues/556) 和 [#1169](https://github.com/anthropics/skills/issues/1169) 记录了超过 15 个独立复现，该问题直接导致技能优化循环在噪声上工作，完全失去了评估意义。
- **状态：** Open（多个 PR 并行解决不同根因，目前无单一合并版本）。

**② 文档排版优化 (document-typography)**
- **PR:** [#514](https://github.com/anthropics/skills/pull/514)
- **功能：** 防止 AI 生成文档中的孤儿字（Orphan）、寡妇段（Widow）及编号错位等常见排版问题。
- **社区热点：** 讨论集中在这是 AI 文档输出的“最后一公里”痛点，用户通常不会主动提，但质量影响感知明显，实用性极高。
- **状态：** Open

**③ 前端设计技能优化 (frontend-design)**
- **PR:** [#210](https://github.com/anthropics/skills/pull/210)
- **功能：** 将原来的前端设计指南修订为更清晰、可执行、内聚的指令集。
- **社区热点：** 重点讨论如何确保每一条指令模型都能在单次对话中理解并执行，避免“假大空”的指南性文本，提升 Skill 作为“操作手册”而非“文档”的质量标准。
- **状态：** Open

**④ 全面测试技能 (testing-patterns)**
- **PR:** [#723](https://github.com/anthropics/skills/pull/723)
- **功能：** 覆盖 Trophy 测试模型、AAA 模式的单元测试、React 组件测试（Testing Library）等完整堆栈。
- **社区热点：** 开发者对自动化测试生成高度期待，讨论边界在于 Skill 不应过于僵化（如强制特定 Mock 风格），应预留灵活性。
- **状态：** Open

**⑤ 色彩专家技能 (color-expert)**
- **PR:** [#1302](https://github.com/anthropics/skills/pull/1302)
- **功能：** 内置 ISCC-NBS、Munsell、CSS Named 等色彩体系，以及 OKLCH/OKLAB/CAM16 等色彩空间选用指南。
- **社区热点：** 展示了 Skill 深度专业化趋势，从“写代码”转向“提供决策知识库”，适合设计师角色下的 Claude Code 工作流。
- **状态：** Open

**⑥ 自我审计技能 (self-audit)**
- **PR:** [#1367](https://github.com/anthropics/skills/pull/1367)
- **功能：** 在交付前进行机械版文件验证 + 四维度推理质量审计。
- **社区热点：** 新颖的“元技能”思路，能在模型交付前检查幻觉和遗漏。社区讨论其是否能与 Anthropic 官方内置的审核能力互补。
- **状态：** Open

**⑦ 文档处理修复（PDF / DOCX / ODT）**
- **PR:** [#538](https://github.com/anthropics/skills/pull/538) / [#541](https://github.com/anthropics/skills/pull/541) / [#486](https://github.com/anthropics/skills/pull/486)
- **功能：** 解决 PDF 引用文件大小写兼容性、DOCX 修订 ID 冲突导致文件损坏，以及新增 ODT 格式支持。
- **社区热点：** 文件 I/O 的稳健性是企业级应用的基石，尤其是 DOCX/ODT 这类结构化二进制格式，反复出现的 Bug 表明这部分代码质量仍是社区关注焦点。
- **状态：** Open

---

### 2. 社区需求趋势

**① 信任与治理（Trust & Governance）**
- **Issue:** [#492](https://github.com/anthropics/skills/issues/492)（43 条评论）
- **趋势：** 社区对“社区技能被分配至 `anthropic/` 命名空间”产生严重不信任。用户要求明确的官方/社区界限、签名机制或沙箱执行。这是本次存档中**评论数最高**的 Issue，情绪强烈。关联提案 [#412](https://github.com/anthropics/skills/issues/412)（Agent 策略执行与审计）也反映了安全治理刚需。

**② 企业级分布与去重（Org-Sharing & Deduplication）**
- **Issues:** [#228](https://github.com/anthropics/skills/issues/228) / [#189](https://github.com/anthropics/skills/issues/189)
- **趋势：** 企业用户强烈要求：① 告别 `.skill` 文件手动拖拽分享，需要组织级技能库或链接；② 解决 `document-skills` 与 `example-skills` 安装内容重复导致的上下文污染问题。

**③ 可靠的工具链（Reliable Toolchain）**
- **Issues:** [#556](https://github.com/anthropics/skills/issues/556) / [#1169](https://github.com/anthropics/skills/issues/1169) / [#1061](https://github.com/anthropics/skills/issues/1061)
- **趋势：** `run_eval.py` 在 Windows 及 Unix 上均无法正常工作，是当前阻碍技能生态发展的**最大技术负债**。社区不是缺乏产出功能，而是无法 **评估** 和 **迭代** 自己的技能。这是一个基础架构层面的强需求。

**④ 代理记忆与上下文压缩（Compact Memory & State）**
- **Issue:** [#1329](https://github.com/anthropics/skills/issues/1329)
- **趋势：** 面向长期运行的 Autonoumous Agent，传统自然语言记忆非常消耗上下文，社区开始探索符号化记忆（Symbolic Notation）。这是一个非常前沿且前瞻性强的需求，暗示了 Skills 从“工具”向“Agent 大脑空间”的演进。

---

### 3. 高潜力待合并 Skills

以下 PR 讨论充分、逻辑完整，大概率已进入 Anthropic 审核视线：

1.  **文档质量三步曲（Typography / PDF / DOCX）：**
    - [#514](https://github.com/anthropics/skills/pull/514)（排版）与 [#538](https://github.com/anthropics/skills/pull/538) / [#541](https://github.com/anthropics/skills/pull/541)（文件修复）——属于通用、低风险、高回报的改进，但长期未合并，可能与内部架构或测试覆盖标准有关。

2.  **贡献指南（CONTRIBUTING.md）：**
    - [#509](https://github.com/anthropics/skills/pull/509)（34% 社区健康度量要求）——这是社区健康的基础设施，直接响应 Issue [#452](https://github.com/anthropics/skills/issues/452)，是**合并概率最高**的 PR。

3.  **YAML / UTF-8 门禁修复：**
    - [#361](https://github.com/anthropics/skills/pull/361) / [#362](https://github.com/anthropics/skills/pull/362) / [#539](https://github.com/anthropics/skills/pull/539)——属于 `skill-creator` 的质量门禁，修复简单（检测特殊字符与 UTF-8 字节长度），**风险极低，价值极高**，很可能被压入同一个修复合并批次。

4.  **自我审计技能（Self-Audit / Quality Analyzer）：**
    - [#1367](https://github.com/anthropics/skills/pull/1367) / [#83](https://github.com/anthropics/skills/pull/83)——这种“元技能”具有高度战略价值，虽然仍在草案/讨论期（且有争议），但如果 Anthropic 希望引导社区建设 Skill 质量体系，这类 PR 是理想的参考标杆。

---

### 4. Skills 生态洞察

**一句话总结：**
当前社区的核心诉求已从“创造更多技能”转向“**修复技能评估工具链（`run_eval.py`）**”与“**建立安全信任与组织分享机制**”，这意味着 Claude Code Skills 生态正从野蛮生长的实验阶段，迫使官方进入成熟稳定的平台化治理阶段。

---

# 🗞️ Claude Code 社区动态日报 | 2026-07-25

## 1. 今日速览

Anthropic 于今日发布 v2.1.219，正式将 **Claude Opus 5** 设为默认 Opus 模型，并引入沙箱网络白名单机制。然而该版本引发了显著的社区震荡——Opus 5 默认模型在企业组织中「静默覆盖」用户偏好、全新注入的 `heron_brook` 系统提示段强制覆盖用户代理策略、以及 **Fable 5** 安全审核出现大批量误报（False Positive），使「版本升级后的配置与行为退化」成为今日社区的核心讨论议题。此外，长期悬而未决的支付失败、CLAUDE.md 指令衰减、以及 Agency 行为失控问题继续发酵。

---

## 2. 版本发布

### 📦 Claude Code v2.1.219

**链接：** [v2.1.219 Release Note](https://github.com/anthropics/claude-code/releases/tag/v2.1.219)

- **新模型默认值**：新增 `claude-opus-5`（1M 上下文，$10/$50 每百万 Token），现已取代 Opus 4 设为系统默认 Opus 模型
- **沙箱网络限制**：新增 `sandbox.network.strictAllowlist` 配置，限制沙箱化命令仅能连接白名单中的主机，不再弹出用户确认，提升自动化与无头场景的安全性
- **新增 Hook**：新增 `DirectoryAdded` Hook，可在目录被添加至工作区时执行自定义逻辑

---

## 3. 社区热点 Issues（Top 10）

### 🔥 #1 Plan 升级支付被意外 Void
[#55982](https://github.com/anthropics/claude-code/issues/55982) | 76 评论 · 25 👍

支付系统在扣款确认前将 PaymentIntent 标记为 `void_invoice`，导致 Pro/Max 用户无法完成升级支付。这是仓库内评论数最高的 Bug，直接阻塞核心商业化路径，社区讨论激烈但仍未进入修复通道。

### 🔥 #2 Opus 5 默认模型静默覆盖用户配置
[#81025](https://github.com/anthropics/claude-code/issues/81025) | 2 评论 · 今日创建

当企业组织无法访问 `claude-opus-5-1m` 时，系统**不做任何提示**即可「吞掉」用户已有的模型选择，之后每次新会话都需要手动重选。模型不可用时的优雅降级策略基本为零，属于用户体验底线级别的回归。

### 🔥 #3 `heron_brook` 系统提示强占用户代理决策权
[#80988](https://github.com/anthropics/claude-code/issues/80988) | 2 评论

v2.1.219 注入了一个内部名称为 `heron_brook` 的 System Prompt 段，其指令「除非用户请求，否则不要调用 AgentTool」硬性覆盖了用户的精细委托配置，且**不提供任何 opt-out 入口**。这引发了关于 AI 工具控制权的深层讨论：系统策略是否应该无条件凌驾于用户配置之上？

### 🔥 #4 CLAUDE.md 指令在长会话中「衰减」
[#80873](https://github.com/anthropics/claude-code/issues/80873) | 2 评论 · 1 👍

用户观测到模型在 5–10 轮对话后逐渐无视 CLAUDE.md 规则，尽管规则依然出现在每一轮的 System Reminder 中。这指向了长上下文中模型的注意力机制缺陷，直接侵蚀了开发者对项目级 Agent 的信任。

### 🔥 #5 Fable 5 安全审核大规模误报
[#81026](https://github.com/anthropics/claude-code/issues/81026) · [#81027](https://github.com/anthropics/claude-code/issues/81027) · [#81028](https://github.com/anthropics/claude-code/issues/81028) | 密集涌入

多位用户反馈 Fable 5 的 Broad Safeguards 将正常的代码审计、合规检查、日语对话指令均判定为违反 AUP（可接受使用政策）。高频率的误报（False Positive）严重干扰日常编码流程，社区对新模型的安全策略信任度正在快速下降。

### 🔥 #6 Telegram MCP 插件入站消息无法传递（4 个月未修复）
[#36431](https://github.com/anthropics/claude-code/issues/36431) | 21 评论 · 32 👍

存活长达四个月的老 Issue。Telegram 插件能成功接收消息，但无法将内容注入当前活动会话；出站 `reply` 正常。32 个 👍 表明它是一个被广泛期待的插件场景，也从侧面暴露了 MCP 框架在处理异步入站事件时的架构缺陷。

### 🔥 #7 WebSearch 在 `xhigh` 努力度下全面失效
[#80940](https://github.com/anthropics/claude-code/issues/80940) | 1 评论 · 2 👍

当设置努力度为 `xhigh` 时，WebSearch 工具直接抛出 API 400 错误（`effort 'xhigh' is not supported when thinking is disabled`），而其他工具运行正常。一个特定配置下的阻断性 Bug，说明组合参数的状态空间测试存在覆盖盲区。

### 🔥 #8 Windows 更新锁死——每次更新都需重启
[#76357](https://github.com/anthropics/claude-code/issues/76357) | 7 评论 · 4 👍

MSIX（Microsoft Store）安装的 Windows 版本在每次更新时都会因「文件被占用」而彻底无法启动，必须重启电脑才能恢复。当 `~/.local` 目录位于 OneDrive Files-On-Demand 同步根下时尤为严重（关联 #67692）。Windows 平台生命周期管理的体验远未达标。

### 🔥 #9 插件发布状态卡死——Published 但不进目录
[#80263](https://github.com/anthropics/claude-code/issues/80263) | 7 评论

开发者提交的插件在 Console 中状态变为 **Published**，但就是不向公共插件目录同步。用户已重复提交三次。这是对 MCP 生态建设者的直接阻碍——辛辛苦苦写完插件，却卡在发布阶段的「黑盒」里出不来。

### 🔥 #10 `claude-security scan` 爆出 95 个 Agent，运行 2.5 小时无上限
[#81018](https://github.com/anthropics/claude-code/issues/81018) | 0 评论 · 今日创建

用户对 **208 个文件** 的代码库执行 `claude-security scan`（Medium 努力度），系统一次性新建了 **95 个 Agent**，运行时长超过 2.5 小时，既没有超时保护也没有 Agent 数量上限。任务分解（Task Decomposition）的资源失控风险在此暴露无遗。

---

## 4. 重要 PR 进展

过去 24 小时内 PR 活动极为收缩，仅更新 **1 个 PR**：

### 📌 #80883：添加 Context-Safety-Net 插件，缓解自动压缩（Auto-Compact）导致的上下文丢失

**作者：** @jeshiomurmu
**链接：** [PR #80883](https://github.com/anthropics/claude-code/pull/80883)

社区用户针对长期悬而未决的上下文压缩信息丢失问题（如 #42542、#13112、#28721）主动提交了「安全网」解决方案。该 PR 机制会在 Auto-Compact 发生时主动保存关键「锚定文件」的引用，并在对话压缩后尝试恢复关键上下文。目前仍为社区提交状态，尚未被官方 merge，但它代表了社区对**确定性上下文管理**的强烈需求——如果 Anthropic 接纳此思路，有望成为内置机制或官方推荐的插件参考实现。

---

## 5. 功能需求趋势

从新增及积压的 Feature Request 中提炼出以下几个核心方向：

### ① 会话持久化与防丢失
- [#81021](https://github.com/anthropics/claude-code/issues/81021)：静默 30 天清理后全无恢复手段，用户要求更长的保留期或明确的归档/导出能力
- [#80883](https://github.com/anthropics/claude-code/pull/80883)：Auto-Compact 时的上下文安全网机制
- [#80996](https://github.com/anthropics/claude-code/issues/80996)：`--resume` 后 stdio MCP 服务断连无法自愈

### ② 深度 IDE 与 Git 集成
- [#81024](https://github.com/anthropics/claude-code/issues/81024)：要求 VS Code 扩展支持 `git-worktree` 会话（目前硬编码 `includeWorktrees: false`）

### ③ 细粒度权限与审计
- [#81015](https://github.com/anthropics/claude-code/issues/81015)：`claude setup-token` 新增 `usage:read` 只读 Scope，当前 `user:inference` 无法查询用量
- [#80988](https://github.com/anthropics/claude-code/issues/80988)：要求被覆盖的系统策略（`heron_brook`）提供 opt-out 渠道

### ④ MCP 生态体验优化
- [#81020](https://github.com/anthropics/claude-code/issues/81020)：OAuth Connector 无「重新认证」入口，Token 过期后只能断开重连
- [#80263](https://github.com/anthropics/claude-code/issues/80263)：插件发布到目录的流程需要端到端可见性

### ⑤ 使用反馈与成本透明度
- [#81019](https://github.com/anthropics/claude-code/issues/81019)：请求显示 Rate Limit 精确的重置时间戳，而非仅剩「2 小时」
- [#81025](https://github.com/anthropics/claude-code/issues/81025)：模型不可用时需明确提示，而非静默覆盖用户配置

---

## 6. 开发者关注点

### ⚠️ 版本升级带来的配置与行为退化（Regression）

v2.1.219 的发版已成为今日社区不满的焦点。模型默认值的强硬切换（#81025）、系统提示的无条件注入（#80988）以及新模型安全策略的过度活跃（#81026–28），均透露出一条共同信号：**新特性上线正在以破坏用户已有工作流为代价**。自动化（自动回退、自动策略注入）如果失去对用户意愿的尊重，将迅速转化为信任危机。

### ⚠️ AI Agent 的可控性焦虑

从 CLAUDE.md 指令衰减（#80873）到 `claude-security scan` 一次性爆出 95 个 Agent（#81018），再到 `heron_brook` 强行禁止 AgentTool 调用——社区对 AI Agent 的边界、行为和透明度**存在强烈的不理解和不信任**。开发者并非抵制 Agent 能力，而是追求**可理解、可预测、可控制**的使用体验。系统级缺省策略不能成为绕过用户决策的黑盒通道。

### ⚠️ MCP 插件生态的成长痛

插件发布后不同步（#80263）、OAuth 认证无法续期（#81020）、Telegram 插件入站消息四个月未修复（#36431）——MCP 生态正处在从「概念验证」走向「生产成熟」的阵痛期。社区开发者的热情和投入明显存在，但基础设施的可靠性、标准化流程和反馈闭环仍在追赶。

### ⚠️ 资源消耗与计费的可见性缺口

支付失败（#55982 / #80055）、API 积分购买失败（#80055）、Rate Limit 信息仅显示模糊倒计时（#81019）——用户在处理线性任务时面临的计费与资源消耗问题反馈集中。开发者希望能够**清晰、实时、透明地**掌握自己的使用状态、消费明细和限制信息，而非在异常发生时被动吞咽错误。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-07-25)

---

## 今日速览

过去24小时内，Codex 连续发布了4个 `rust-v0.146.0` alpha 版本，基础设施迭代加速。社区反馈集中在 **Pro 帐户额度异常快速消耗**、**Windows Git 进程失控** 以及 **安全审查误报导致额度浪费** 等关键痛点。此外，多个涉及 MCP 配置刷新、企业计划支持及 macOS 签名修复的 PR 被快速合并，显示项目正在为更广泛的企业部署做准备。

---

## 版本发布

- **[rust‑v0.146.0‑alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.9)** – `0.146.0-alpha.9`
- **[rust‑v0.146.0‑alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.8)** – `0.146.0-alpha.8`
- **[rust‑v0.146.0‑alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.7)** – `0.146.0-alpha.7`
- **[rust‑v0.146.0‑alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.6)** – `0.146.0-alpha.6`

四个版本仅有“Release 0.146.0-alpha.x”的简单说明，未附带明确变更日志。从关联的 PR 趋势可以推测，这一系列 alpha 主要围绕 MCP 刷新机制、线程分叉支持以及底层签名/打包工作流优化。

---

## 社区热点 Issues

### 1. Pro 周额度在 5.5 模型上消耗异常快，上下文压缩不稳定
[#19585](https://github.com/openai/codex/issues/19585) — 33 条评论，29 👍  
用户在使用 Pro $200 套餐配合 5.5 模型时，周额度（weekly usage limit）在非重度场景下也迅速耗尽。反馈指出上下文压缩（context compaction）未能有效释放空间，导致重复压缩进而加速额度消耗。已演变为额度与压缩机制的复合 bug。

### 2. 应用每次启动静默创建空 `~/Documents/Codex` 文件夹
[#20880](https://github.com/openai/codex/issues/20880) — 20 条评论，39 👍  
无论是否新建项目，启动桌面应用均会在用户 Documents 目录下生成空文件夹，且应用关闭后仍残留。用户需手动删除，造成体验干扰。社区呼声高，是长期存在的易用性 bug。

### 3. Xcode 27 Beta 中 ChatGPT Pro 帐户登录失败，Go 帐户正常
[#28078](https://github.com/openai/codex/issues/28078) — 18 条评论，11 👍  
Pro 帐户需要邮箱 OTP 验证时，Codex Xcode 扩展登录失败；而 ChatGPT Go（轻量）帐户在同一环境下可以正常签名。问题疑似与认证流程的 OTP 交互模型有关，影响 Xcode 插件用户。

### 4. VS Code / Cursor 扩展中提交的 Prompt 随机消失
[#25928](https://github.com/openai/codex/issues/25928) — 16 条评论，8 👍  
Windows 平台下，已输入的 prompt 在进入队列前无故消失，需重新输入。用户怀疑与本地队列状态同步或 UI 渲染有关，严重降低编码效率。

### 5. 自动压缩完成后上下文仍剩 80%，导致重复压缩浪费额度
[#35032](https://github.com/openai/codex/issues/35032) — 14 条评论  
长期 tool‑heavy 会话中，自动压缩提示“success”但上下文仪表盘仍显示 80% 满，压缩后仅余 20% 可用空间，很快触发下一次压缩。用户认为每次压缩均需引擎重新处理历史，浪费配额并影响响应速度。

### 6. Windows 上 Codex 持续产生大量 Git for Windows 进程，CPU 高居不下
[#22085](https://github.com/openai/codex/issues/22085) — 14 条评论，24 👍（已关闭）  
虽然 issue 标记为 CLOSED，但更新记录显示问题仍在讨论。Codex 新版在 Windows 下频繁调用 `git.exe`，导致 CPU 满载。用户强调自己手动管理版本控制，不需要 Codex 自动 git 操作。

### 7. Windows 桌面打开项目/聊天时触发多个 git.exe add -A，严重卡顿
[#20933](https://github.com/openai/codex/issues/20933) — 13 条评论，11 👍  
问题类似 #22085，进一步描述了 `git.exe rev-parse` 和 `git add -A` 并发执行，造成磁盘和 CPU 双高。社区期待官方默认关闭不必要的 git 自检。

### 8. 内置浏览器截图导致 GPU 进程崩溃（Windows 代码完整性拦截）
[#34133](https://github.com/openai/codex/issues/34133) — 9 条评论  
Windows 10 上，agent 使用内置浏览器捕获页面截图时，Code Integrity 事件 3033 拒绝加载 `vk_swiftshader.dll`，导致 GPU 进程崩溃，应用卡死或无法重启。是 Windows 安全策略与内置浏览器兼容性问题。

### 9. GPT‑5.6 Luna 对非 Codex 来源返回“模型未找到”
[#31967](https://github.com/openai/codex/issues/31967) — 8 条评论，8 👍  
使用 ChatGPT OAuth 凭证调用 `gpt-5.6-luna` 时，后台解析出错误的内部模型 slug（`gpt-5.6-luna-free-1p-codexswic-ev3`），导致“Model not found”错误。但不影响同一帐户在 ChatGPT 页面上使用。用户怀疑是路由逻辑错误。

### 10. Multi‑Agent V2 缺少可验证的全生命周期管理
[#33314](https://github.com/openai/codex/issues/33314) — 7 条评论，8 👍（enhancement 标签）  
这是对 #32782 的跟进，用户反馈自定义 sub‑agent 在长会话中状态丢失、配置无法固化，且无法验证 agent 是否完整加载。社区希望 Codex 提供确定性 agent 配置持久化和监测能力，是目前最突出的新功能诉求。

---

## 重要 PR 进展

### 1. 强化网络批准取消与并发处理
[#35267](https://github.com/openai/codex/pull/35267)  
将待审批的网络请求限定在单次 turn 内执行，避免跨轮泄漏；失败时自动取消已拒绝的执行并清理等待队列。提高了多 agent 场景下的安全性和并发正确性。

### 2. 允许禁用进程内 code‑mode host 回退
[#35266](https://github.com/openai/codex/pull/35266)  
新增 `disable_in_process_fallback` 配置项。当独立 code‑mode host 启动失败时，不再回退到嵌入的 V8 引擎，而是返回清晰错误。增强了可观测性和故障定位能力。

### 3. 对 macOS 辅助二进制进行签名
[#35264](https://github.com/openai/codex/pull/35264)  
修复了打包流程中 `rg` 和 zsh 等辅助工具在签名阶段后才被拉取，导致未签名的问题。现确保这些二进制也在正确阶段被签名、公证并上传。

### 4. 在技能调用分析中追踪远程插件 ID
[#35262](https://github.com/openai/codex/pull/35262)  
在技能调用事件和 analytics 参数中加入 `remote_plugin_id`，支持区分本地与远程插件调用来源。为插件生态使用分析和调试提供数据基础。

### 5. 将远程插件 ID 传播至技能元数据
[#35261](https://github.com/openai/codex/pull/35261)  
在 `SkillMetadata` 中同时保留插件本地与远程身份，并优先从快照解析远程 ID。解决了插件市场迁移后身份追踪断裂的问题。

### 6. 支持分页线程的临时分叉
[#35251](https://github.com/openai/codex/pull/35251)  
允许对使用分页历史的线程创建临时 fork（`excludeTurns: true`）。无需新建 rollout 即可预览 fork 结果，提升长历史场景下的实验效率。

### 7. 使 MCP 认证发现通过运行时 HTTP 客户端路由
[#35239](https://github.com/openai/codex/pull/35239)  
MCP OAuth 发现与状态检查现在使用与传输层相同的 HTTP 路由，确保通过配置的代理也能正确发现服务器。解决代理环境下的 MCP 认证失败。

### 8. 支持 ent26 企业计划
[#35238](https://github.com/openai/codex/pull/35238)  
在认证、账户协议、后端速率限制及 app‑server 模式中识别 `ent26` 计划。按企业工作空间提供云配置资格和企业风格的使用限制向导。

### 9. 支持可配置的插件 MCP 端点
[#31307](https://github.com/openai/codex/pull/31307)  
添加可选环境变量 `CODEX_PLUGINS_MCP_BASE_URL`，使插件 MCP 服务可使用独立于 ChatGPT API 端点的地址。方便开发集成和私有化部署。

### 10. 协调 MCP 工具刷新顺序
[#31310](https://github.com/openai/codex/pull/31310)  
序列化重叠的 MCP 工具刷新请求，确保每次刷新后更新实时工具快照，并防止旧状态覆盖新结果。提升高并发下的 MCP 工具一致性。

---

## 功能需求趋势

1. **额度管理与上下文压缩优化** — #19585、#35032、#35259、#34468  
   用户反映出压缩算法效率低、压缩后残留多，严重浪费 Pro 套餐周额度。希望引入更激进的压缩策略或显式控制选项。

2. **多 Agent 生命周期可观测与持久化** — #33314、#34468、#35259  
   Multi‑Agent V2 缺乏 agent 配置持久化、启动确认和状态回显。社区期待类似“agent 状态快照”和“加载验证”功能，实现可编排的长期 agent 工作流。

3. **安全审查减少误报** — #34306、#33810、#34257、#35258  
   多个安全插件将正常开发请求（如网络安全、加密操作）判定为违规，且审查在额度消耗后才生效，导致配额白白损失。用户强烈要求透明提示或误报补救机制。

4. **Windows Git 进程治理** — #22085、#20933、#33450  
   大量用户反馈 Codex 在 Windows 下无节制调用 `git.exe` 导致机器卡顿。要求可配置禁用自动 git 操作，或减少 git 查询频率。

5. **MCP/插件生态成熟** — #33314、#35255、#35261、#35262  
   MCP 刷新、插件市场迁移后存在残留和身份断裂。社区需要更可靠的插件注册/注销、workspace 发布以及远程插件追踪机制。

6. **企业级功能入口** — #35238、#28078  
   随着 `ent26` 计划的支持加入，以及 Xcode 登录问题频发，企业 SSO / OTP 兼容性和帐户管理成为新焦点。

---

## 开发者关注点

- **额度消耗失控** — 使用 5.5 及 Ultra 模型时，额度在非密集场景也快速见底；上下文压缩不彻底进一步加剧浪费。成为 Pro 用户的头号痛点。
- **Windows 性能拖累** — 多个 git.exe 并发进程导致 CPU 和磁盘占用飙升；Code Integrity 与内置浏览器冲突引起崩溃；WSL 仓库被错误识别为非 Git。Windows 用户体验明显劣于 macOS。
- **安全审查破坏工作流** — 审查误报率高且拦截发生在额度消耗之后，用户无法获取已付费的响应。对渗透测试、加密开发等正常需求造成严重阻碍。
- **IDE 扩展可靠性不足** — Xcode 登录受 OTP 影响、VS Code/Cursor Prompt 随机丢失、Codex Diff 无法打开（#35250），影响日常集成使用。
- **线程与 Agent 状态模糊** — 线程 fork 限制多、多 agent 配置无法持久化、本地/远程插件 ID 混乱，开发者难以构建可重复的 agent-based 工作流。
- **macOS 资源回收不彻底** — 尽管 quit/reopen 能缓解，但 app‑server、renderer 的内存和日志增长会在会话中持续回归（#35269），影响长期运行的稳定性。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## 今日速览

过去 24 小时内 Gemini CLI 无版本发布，但社区问题与 PR 活跃度保持高位。**Agent 行为异常（误报成功、卡死、忽略子代理配置）仍是用户最大痛点**，多个 P1 级别的 Bug 持续引发讨论。安全与基础架构侧进展显著：OAuth 令牌刷新、文件凭证加密、HTTPS 强制等修复已被合并或进入审查；同时 Caretaker Agent 评估基础设施开始落地，PR 引入了并行的三方评测框架与 Firestore 同步工具。

---

## 版本发布（过去 24 小时）

无

---

## 社区热点 Issues（10 条）

### 1. Subagent 达到最大轮次后错误报告为成功  
**#22323** — `Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption`  
**重要原因**：子代理（`codebase_investigator`）在命中最大轮次限制后，以 `status: "success"` 和 `Termination Reason: "GOAL"` 返回，完全掩盖了实际的中断。这直接误导用户认为任务已完成，是代理透明度的典型缺陷。社区有 12 条评论，2 个 👍，说明该问题的确认度高。  
https://github.com/google-gemini/gemini-cli/issues/22323

### 2. 通用代理完全卡死，无响应  
**#21409** — `Generalist agent hangs`  
**重要原因**：当 CLI 将任务委托给通用代理时，即使在简单的文件夹创建操作上也会无限期挂起，用户等待一小时后只能手动取消。通过指示模型不要使用子代理可临时规避。多达 8 个 👍 表明该问题普遍，是影响日常开发效率的关键 P1 错误。  
https://github.com/google-gemini/gemini-cli/issues/21409

### 3. Shell 命令执行完成后依然显示“等待输入”导致卡死  
**#25166** — `Shell command execution gets stuck with "Waiting input" after command completes`  
**重要原因**：极简单的 CLI 命令（如 `ls`、`mkdir`）完成后，终端仍保持在“Awaiting user input”状态，无限阻塞后续操作。这是核心交互层面的严重 Bug，直接影响用户在终端中的工作流。  
https://github.com/google-gemini/gemini-cli/issues/25166

### 4. 浏览器子代理在 Wayland 下完全失效  
**#21983** — `browser subagent fails in wayland`  
**重要原因**：在 Wayland 显示环境下浏览器子代理无法启动，终止原因为 `GOAL` 但没有实际工作。随着 Linux 用户向 Wayland 迁移，这一兼容性问题导致部分用户完全无法使用浏览器自动化功能。  
https://github.com/google-gemini/gemini-cli/issues/21983

### 5. `get-shit-done` 输出钩子导致 CLI 崩溃  
**#22186** — `get-shit-done output hook causes crash`  
**重要原因**：在生成最终摘要时反复触发崩溃，严重影响该高级功能的使用体验。评论指出崩溃发生在输出几乎完成时，可能与流式渲染或状态管理有关。  
https://github.com/google-gemini/gemini-cli/issues/22186

### 6. 模型经常在随机位置创建临时脚本  
**#23571** — `Model frequently creates tmp scripts in random spots`  
**重要原因**：当限制模型只能通过 Shell 执行时，它倾向于在各类目录中生成多个编辑脚本，导致工作区杂乱，难以清理并提交干净代码。反映出模型对工作目录的规划能力不足。  
https://github.com/google-gemini/gemini-cli/issues/23571

### 7. 超过 128 个工具时出现 400 错误  
**#24246** — `Gemini CLI encounters 400 error with > 128 tools`  
**重要原因**：随着技能和工具数量增加，代理请求超出模型上下文窗口限制，导致 HTTP 400。用户期望代理能自动缩小可用工具范围，而非直接崩溃。这是 Agent 可扩展性设计的重要缺陷。  
https://github.com/google-gemini/gemini-cli/issues/24246

### 8. 自动记忆系统对低信号会话无限重试  
**#26522** — `Stop Auto Memory from retrying low-signal sessions indefinitely`  
**重要原因**：自动记忆功能的后台提取代理只会将已成功读取的内容标记为已处理，那些被认为“低信号”而跳过的会话会反复出现，形成死循环。增加了不必要的 API 调用和成本，且效率低下。  
https://github.com/google-gemini/gemini-cli/issues/26522

### 9. 自动记忆缺乏确定性脱敏且日志过多  
**#26525** — `Add deterministic redaction and reduce Auto Memory logging`  
**重要原因**：自动记忆会将本地会话内容发送给模型进行提取，但脱敏指令仅在内容进入模型上下文之后才会执行（并非事前），且现有技能日志可能泄露路径和文件内容。这是安全审计的重点关注项。  
https://github.com/google-gemini/gemini-cli/issues/26525

### 10. 浏览器代理忽略 settings.json 中的覆盖配置（如 maxTurns）  
**#22267** — `[BUG] Browser Agent ignores settings.json overrides (e.g., maxTurns)`  
**重要原因**：尽管 `AgentRegistry` 在初始化时正确读取了 `settings.json` 中的配置，但浏览器代理在运行时完全忽略这些值。这意味着用户无法通过配置限制浏览器代理行为，降低了灵活性。  
https://github.com/google-gemini/gemini-cli/issues/22267

---

## 重要 PR 进展（10 条）

### 1. 为 Caretaker Agent 添加三方评测框架与并行运行器  
**#28530** — `feat(caretaker-evals): add triage evaluation framework and judge runner`  
**内容**：在 `tools/caretaker-agent/evals/triage/` 下实现了基于大模型作为评判员的评估规则、以及并发的 Git worktree 基准运行器，可自动化评估 Issue 分流质量。  
**意义**：为智能分流 Agent 的持续改进提供了可量化的评测基础设施。  
https://github.com/google-gemini/gemini-cli/pull/28530

### 2. 评估数据集收集与 Firestore 同步工具  
**#28532** — `feat(caretaker-evals): add local golden issue collection and firestore sync tools`  
**内容**：新增 CLI 工具，用于组装黄金 Issue 测试用例并同步至 Cloud Firestore，依赖 #28530。  
**意义**：与评测框架互补，实现数据驱动的评测闭环。  
https://github.com/google-gemini/gemini-cli/pull/28532

### 3. 修复 A2A Server 中 CRLF 导致 Windows 下 Diff 不显示  
**#28531** — `fix(a2a-server): normalize CRLF line endings to LF in getProposedContent`  
**内容**：将 `a2a-server` 包返回的内容统一为 LF 换行符，解决 Windows 上 Gemini Code Assist 的 Diff 视图无法高亮变更的问题。  
**意义**：直接修复 Windows 用户的差分布局体验，跨平台兼容性重要提升。  
https://github.com/google-gemini/gemini-cli/pull/28531

### 4. 过滤历史中的内部思维/推理内容  
**#28509** — `fix(core): filter out thought parts from getHistoryTurns when context management is disabled`  
**内容**：在禁用上下文管理时，确保 `getHistoryTurns` 完全过滤掉标记为 `thought: true` 的内部思考块，防止推理内容的重复泄露导致输出异常。  
**意义**：提升输出稳定性，避免用户看到模型内部推理片段。  
https://github.com/google-gemini/gemini-cli/pull/28509

### 5. 为文件凭证存储显式配置认证标签长度与校验  
**#28523** — `fix(core): enforce explicit tag length and validation in file keychain`  
**内容**：强制使用 128‑bit（16 字节）认证标签，并对损坏或格式错误的凭证进行严格校验，避免在不同 Node.js 运行时下出现加密行为不一致。  
**意义**：加固本地凭据存储的安全性，属于主动安全加固。  
https://github.com/google-gemini/gemini-cli/pull/28523

### 6. 强制 GoogleCredentialsAuthProvider 使用 HTTPS  
**#28517** — `fix(core): enforce HTTPS for GoogleCredentialsAuthProvider to prevent cleartext leakage`  
**内容**：在发送 ADC 令牌前增加协议校验，拒绝明文 HTTP 连接，防止凭证泄漏。  
**意义**：消除因错误配置或代理导致的敏感信息传输风险。  
https://github.com/google-gemini/gemini-cli/pull/28517

### 7. 修复 MCP OAuth 令牌刷新失败导致强制重新认证  
**#28481** — `fix(core): refresh MCP OAuth tokens with the stored client ID`  
**内容**：修复了 OAuth 发现 + 动态客户端注册模式下，令牌刷新时因凭证删除而导致的每次都要重新认证的问题。  
**意义**：提升 MCP 服务对接的稳定性和用户体验，被评为 P1。  
https://github.com/google-gemini/gemini-cli/pull/28481

### 8. 修复 OAuth 令牌交换时“Premature close”错误  
**#28446** — `fix(auth): use native fetch for OAuth token exchange to avoid "Premature close"`  
**内容**：改用 Node.js 原生 fetch 替代可能提前关闭的 HTTP 客户端，解决部分无头 VPS 上登录时 token 交换失败的问题。  
**意义**：消除特定环境下的认证死结，提升 CLI 在 CI/远程环境中的可用性。  
https://github.com/google-gemini/gemini-cli/pull/28446

### 9. 修复 VS Code IDE 扩展的 Disposable 泄漏  
**#28526** — `fix(vscode-ide-companion): stop leaking gemini.diff.accept and onDidChangeWorkspaceFolders disposables`  
**内容**：修正了 `activate()` 中由于括号错误导致多个 `context.subscriptions.push` 被合并为逗号表达式，仅最后一个 Disposable 被正确注册的问题。  
**意义**：防止扩展重复注册导致的内存泄漏与行为异常。  
https://github.com/google-gemini/gemini-cli/pull/28526

### 10. Caretaker Agent GCP Cloud Run 部署脚本  
**#28529** — `feat(caretaker): add GCP deployment script for caretaker agent services`  
**内容**：添加用于将 Ingestion Service、Triage Worker 和 Egress Service 部署到 Cloud Run 的脚本 `deploy.sh`。  
**意义**：配合评估框架，使 Caretaker Agent 能从实验走向生产部署。  
https://github.com/google-gemini/gemini-cli/pull/28529

---

## 功能需求趋势

综合过去 24 小时的 Issues 和 PR，社区与开发团队最关注以下几个方向：

- **Agent 行为透明度与可靠性**：子代理误报成功、通用代理卡死、自动重试低信号会话等 Bug 凸显了代理决策过程的不透明性。社区期望代理能在中断、出错时准确报告原因，并在子代理轨迹中提供可分享的上下文（#22598）。
- **安全与隐私增强**：自动记忆系统的脱敏逻辑、文件凭证存储的加密加固、OAuth 令牌刷新异常、HTTPS 强制成为高频改进领域。安全相关 PR 贡献比例在本日报中接近一半，表明团队正系统性地修复凭据和日志层面的风险。
- **AST 感知的工具链**：Issues #22745、#22746、#22747 系列调研了利用 AST 感知的文件读取、搜索和代码库映射来减少轮次、降低 Token 噪声。这代表了从“纯文本”代理向“代码结构感知”代理演进的明确趋势。
- **超大规模工具的调度优化**：>128 个工具导致 400 错误的 Issue 揭示当前代理在工具规模扩展方面存在架构瓶颈。社区需要更智能的按需工具发现机制。
- **评估与可测性基础设施**：Caretaker Agent 评测框架的建立（#28530、#28532）以及内部项目评估稳定化（#23166、#24353）说明团队正在加大投入，使智能代理的质量改进可以通过量化指标来驱动。
- **跨平台与 IDE 集成体验**：Windows 换行符导致 VS Code Diff 不显示、Wayland 下浏览器代理完全失效、终端调整闪烁等问题的修复，表明保持不同桌面环境和编辑器下的体验一致性仍是持续工作。

---

## 开发者关注点

基于 Issues 中的用户反馈和评论，以下几类痛点反复出现：

1. **代理不遵循配置**：用户明确在 `settings.json` 中禁用子代理或设置 `maxTurns`，但代理仍然不遵守（#22093、#22267），导致用户对配置系统失去信任。
2. **不安全的默认行为**：自动记忆系统在未经过滤的情况下将本地内容送入模型上下文（#26525），且对低价值会话无限重试（#26522），引发对成本和隐私的双重担忧。
3. **非破坏性操作的缺失**：模型倾向于使用 `git reset --force`、`git reset` 等危险命令，或在工作区任意生成临时脚本（#22672、#23571），开发者需要 CLI 能区分实验与生产环境并自动选择更安全的路径。
4. **调试诊断信息不足**：`/bug` 报告不包含子代理内部上下文（#21763），`/chat share` 无法分享子代理轨迹（#22598），导致用户即使发现问题也难以提供有效反馈。
5. **高频率的假死与崩溃**：Shell 命令执行后挂起、浏览器代理在 Wayland 上无声失败、`get-shit-done` 在完成前崩溃——这些直接破坏开发流的问题占 P1 级别 Bug 的近一半，迫切需要通过更健壮的进程管理和错误恢复来缓解。

这些关注点反映出，尽管 Gemini CLI 的智能代理能力持续增强，但在可靠性、可控性和安全性方面仍有长足进步空间，社区对此的期待值也明显提高。

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

好的，这是根据你提供的 GitHub 数据生成的 DeepSeek Reasonix 社区动态日报。

---

# DeepSeek Reasonix 社区动态日报 | 2026-07-25

---

## 1. 今日速览
- **版本发布**：Reasonix v1.17.20 今日正式发布，重点优化了 CLI 自动化的隐私保护接口以及桌面端的核心稳定性修复。
- **焦点事件**：Windows Defender 误报导致桌面端闪退（#6848）成为社区最严重的负面反馈，官方已通过提交全量代码签名（PR #6904）进行紧急应对并已合并。
- **架构革新**：PR #6918 引入的“确定性规划路由”是今日最值得关注的架构级提交，旨在从根本上解决长期困扰社区的 Planner 与 Executor 逻辑混淆问题。

---

## 2. 版本发布：v1.17.20
今日发布了涉及 CLI 与 Desktop 的 v1.17.20 版本，核心更新包括：

- **CLI 自动化**：新增保护隐私的机器接口（Machine Interface），允许 Planner 与子 Agent 通过稳定且缓存友好的代理使用已授权的 MCP 能力，提升脚本调用的安全性与效率。
- **更新机制**：为 Debian 安装包带来经过验证的应用内更新（签名认证），防止更新过程中的篡改风险。
- **桌面端提升**：提升了模型切换、富文本编辑、Plan 恢复和代码预览的可靠性。

[👉 查看完整更新日志](https://reasonix.io/changelog/v1.17.20/)

---

## 3. 社区热点 Issues（Top 10）

### 1. [#6848] Windows Defender 误报 Trojan（严重/安全）
- **热度**: 👍 1 | **评论**: 1
- **摘要**: 多位 Windows 用户报告 Reasonix Desktop 可执行文件在安装或更新时被 Defender 识别为木马并隔离删除，导致程序闪退、无法启动。该问题在 v1.17.19 和 v1.17.20 中集中爆发。
- **影响**: 严重阻塞 Windows 用户使用，急需热修复。
- [🔗 Issue 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6848)

### 2. [#6898 / #6876] Auto Guard 频繁拦截正常操作（高频痛点）
- **摘要**: Auto Guard 机制在文件编辑和命令执行时过于敏感，频繁拦截正常的 bash/zsh 操作，迫使 Agent 绕道使用 pwsh 等非常规方式完成任务。用户反馈“莫名其妙拦截了编辑”，严重影响开发连续性。
- **影响**: 社区共鸣极强，安全机制已变成开发摩擦点。
- [🔗 Issue 链接 1](https://github.com/esengine/DeepSeek-Reasonix/issues/6898) | [🔗 Issue 链接 2](https://github.com/esengine/DeepSeek-Reasonix/issues/6876)

### 3. [#6789] Planner→Executor 双重输出（核心逻辑缺陷）
- **热度**: 👍 0 | **评论**: 1
- **摘要**: 纯问答场景下，Planner 生成完整回答后，Executor 被重复触发，导致用户看到两段高度重复但措辞略异的回答。用户提供了详细的 3 次连续触发会话记录，直指 Agent 路由分发机制混乱。
- **影响**: 低级且影响观感的核心逻辑 Bug。
- [🔗 Issue 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6789)

### 4. [#6915] 打开软件导致资源管理器崩溃（系统稳定性）
- **热度**: 👍 0 | **评论**: 0
- **摘要**: 从 v1.17.14 版本开始，打开桌面应用有小概率导致 Windows 资源管理器（Explorer）崩溃，需要强制结束进程恢复。问题已延续多个版本。
- **影响**: 破坏操作系统级稳定性，对用户信心打击极大。
- [🔗 Issue 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6915)

### 5. [#6903] 双击 ESC 回滚消息显示系统提示（UX 严重混淆）
- **热度**: 👍 0 | **评论**: 0
- **摘要**: 用户通过双击 ESC 回滚历史消息时，发现回滚内容全部被替换成了“必须使用简体中文...”等系统提示词，导致无法定位之前的有效对话，高级功能形同虚设。
- **影响**: 功能不仅失效，还会产生误导性内容。
- [🔗 Issue 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6903)

### 6. [#4732] 配置独立规划模型后强制每轮使用（性能浪费）
- **热度**: 👍 0 | **评论**: 3
- **摘要**: 社区连续提问：配置了 `planner_model` / `subagent_model` 后，系统不做难度判断一律走完整规划流程，导致简单问答响应极慢。用户被迫在“高能力”与“低延迟”间取舍。
- **影响**: “独立规划模型”这一优秀设计被上一刀切的逻辑浪费了。
- [🔗 Issue 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/4732)

### 7. [#6916] Planner 输出错误解析写入待办列表（核心逻辑解析错误）
- **热度**: 👍 0 | **评论**: 0
- **摘要**: 待办列表（Todo）错误地将 Planner 输出中的调查结论、事实约束等非任务内容解析为代办事项，导致 List 中出现大量无法完成的项目，系统陷入反复执行的死循环。
- **影响**: 导致 Agent 任务完全卡死。
- [🔗 Issue 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6916)

### 8. [#6914] “打开文件夹”无法绑定项目工作空间（功能阻塞）
- **热度**: 👍 0 | **评论**: 0
- **摘要**: 位于非系统盘路径下的项目文件夹通过“打开文件夹”功能无法被识别为项目工作空间（总是识别为 global workspace），导致标签页绑定失败，无法正常进行项目级操作。
- **影响**: 高严重性，使得标准的多项目开发工作流受阻。
- [🔗 Issue 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6914)

### 9. [#6906] 代码预览行号对齐与查找显示问题（桌面端 UI）
- **热度**: 👍 0 | **评论**: 4
- **摘要**: 右侧代码预览面板在行号由个位数变为两位数时出现分割线截断对齐问题；同时搜索框的 UI 和交互不够友好。该问题已由社区开发者 @JesonChou 提交修复 PR。#6910。
- **影响**: UI 层面高频可见的瑕疵。
- [🔗 Issue 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6906)

### 10. [#6919] SSH 远程登录失败（集成兼容性）
- **热度**: 👍 0 | **评论**: 0
- **摘要**: 已配置 SSH 免密登录的用户，在 Reasonix 中配置 Remote Host 后无法正常远程连接，原生 PowerShell 中可以正常登录，说明 Reasonix 的 SSH 调用层存在兼容性问题。
- **影响**: 阻塞远程开发场景。
- [🔗 Issue 链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6919)

---

## 4. 重要 PR 进展（Top 10）

### 1. [#6904] 签署全部 Windows 载荷程序（安全/紧急修复）
- **作者**: @SivanCola | **状态**: ✅ 已合并
- **摘要**: 根因分析是发布工作流未签名全部 .exe 文件。本 PR 为所有 Windows 有效载荷添加了数字签名，直接解决 Windows Defender 误报 Trojan 导致的闪退问题（#6848, #6899）。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6904)

### 2. [#6918] 增加确定性规划路由与深度（核心架构改进）
- **作者**: @SivanCola | **状态**: ✅ 已合并
- **摘要**: 核心架构升级。将隐式的布尔路由拆分为显式策略：直接执行、计划-执行、仅计划、仅审批，配合深度标记。旨在解决 #6789 双重回答和 #4732 强制规划等核心逻辑紊乱问题。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6918)

### 3. [#6911] 修复跨平台插件 Hook 执行契约（兼容性修复）
- **作者**: @SivanCola | **状态**: ✅ 已合并
- **摘要**: 统一了插件 Hook 的执行模式，明确区分 `exec`（直接调用）与 `shell`（CMD 脚本执行）的边界。解决了 Windows 环境下 `run-hook.cmd` 无法执行的关键路径问题。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6911)

### 4. [#6924] 修复错误日志敏感信息泄露（安全修复）
- **作者**: @SivanCola | **状态**: 🔄 开放中
- **摘要**: 安全修复。针对 CodeQL 告警，在心跳和 Bot 控制器的错误路径中添加脱敏逻辑，防止 URL 中的认证凭据（如代理密码）写入外部日志。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6924)

### 5. [#6910] 修复代码预览行号对齐并重构搜索栏（社区贡献）
- **作者**: @JesonChou | **状态**: ✅ 已合并
- **摘要**: 来自社区的高质量贡献。通过 `box-sizing` 修复行号截断对齐问题，并将搜索框重构为紧凑的浮动弹窗，提升了桌面端的代码浏览体验。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6910)

### 6. [#6900] 增加桌面原生崩溃诊断（可观测性）
- **作者**: @SivanCola | **状态**: ✅ 已合并
- **摘要**: 可观测性增强。当桌面应用崩溃时，系统会捕获 Go Runtime 致命错误，记录崩溃阶段、运行时长等上下文，并实现 10 个报告的滚动队列，极大提升了闪退问题的可复现与排查能力。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6900)

### 7. [#6921] 原生支持 OpenCode Go 的 Kimi K3（新模型支持）
- **作者**: @SivanCola | **状态**: 🔄 开放中
- **摘要**: 为 OpenCode Go 提供商预设原生添加了月之暗面 Kimi K3 模型支持。该模型拥有 1,048,576 token 的超长上下文窗口和视觉能力。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6921)

### 8. [#6909] 修复新建会话时展示旧工具调用记录（UX 修复）
- **作者**: @xiaoshuai1024 | **状态**: 🔄 开放中
- **摘要**: 修复了复用空白标签页创建新会话时，前端残留旧会话数据（如历史工具调用记录）的 Bug，确保会话创建是干净的。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6909)

### 9. [#6922] 修复 Dependabot 安全告警（依赖安全）
- **作者**: @SivanCola | **状态**: ✅ 已合并
- **摘要**: 大规模依赖维护。将官方网站的 Astro 框架从 6.4.8 升级至 7.1.3，同步升级了 PostCSS、Sharp 等多个关键依赖以修复已知安全漏洞。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6922)

### 10. [#6913] 防止 .mcp.json 插件泄漏到 reasonix.toml（配置精度）
- **作者**: @myipanta | **状态**: 🔄 开放中
- **摘要**: 配置精度修复。在保存项目配置时，过滤掉来自 `.mcp.json` 的插件配置，避免其污染主配置文件 `reasonix.toml`，保持配置的纯净与职责分离。
- [🔗 PR 链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6913)

---

## 5. 功能需求趋势
从近日的 Issue/PR 中可以提炼出社区最关心的几个功能方向：

- **Agent 行为的“确定性”与“智能化”**：社区不再满足于简单的“规划-执行”流水线。核心诉求是 Agent 应具备 **元认知能力**，能够根据任务复杂度（纯问答 vs 代码任务）智能决策路由（#4732, #6789），并确保规划与执行输出的**绝对对齐**（#6916）。PR #6918 正是对此趋势的直接响应。
- **操作系统级的安全与兼容性**：随着 Reasonix 深入系统底层，与安全软件的冲突（#6848 Defener）和系统稳定性（#6915 资源管理器崩溃）成为最大痛点。用户迫切需要一个能 **“优雅融入”** 操作系统生态的 Agent，而非被频频拦截的“外来者”。
- **原生 IDE 体验**：用户对内置代码编辑器的期待正从“可浏览”变为“可开发”。对**字体自定义**（#6907）、**精准行号与搜索**（#6906）以及**代码预览的稳定性**需求极高，社区希望 Reasonix 能替代掉 IDE 中的部分工作流。
- **跨平台与远程互联**：Windows 环境下的 SSH 集成（#6919）、Hook 脚本兼容性（#6643）问题持续暴露。开发者希望 Reasonix 的远程和自动化能力在 Windows（尤其是非标准配置）下能获得与 macOS/Linux 同等的 **“开箱即用”一流体验**。

---

## 6. 开发者关注点（痛点与高需求反馈）
- **Windows 用户的“生存危机”**：Windows Defender 误报（#6848）是过去 24 小时内声量最大、情绪最激烈的反馈。开发者报告“软件被自动删除”、“无法启动”已严重影响日常开发信任。虽然 #6904 已合并，但当前版本的可用性已受损，用户对热修复版本的渴望度极高。
- **Auto Guard 的“好心办坏事”**：开发者普遍认可安全设计，但它对**正常操作的高频拦截**（#6898, #6876）已从守护者变为障碍物。社区强烈呼吁提供**更细粒度的可配置白名单**或**一键信任**的快捷操作，而非在每次开发中斗智斗勇。
- **Agent 的“精神分裂”时刻**：Planner 与 Executor 的衔接 Bug（#6789 双重回答、#6916 待办错乱、#6903 回滚异常）让开发者感到 Agent 行为像个不可预测的“黑盒”。对于开发工具而言，**确定性的结果**远比“炫酷的规划流程”更重要。
- **“高级特性”的尴尬配置**：独立规划模型本是性能增强器，但开启后简单问题响应变慢，关闭又浪费了复杂任务能力（#4732）。这种**非黑即白**的选择让用户深感“选择困难”，强烈期待动态路由的工程落地（希望 #6918 能解决此痛点）。
- **恼人的基础工作流磨损**：Session 冲突锁定（“已在另一窗口打开”）、非标准路径项目绑定失败（#6914）。在复杂的多项目日常开发中，这些看似基础的 session/workspace 管理问题持续分散注意力，降低了对产品成熟度的评价。

---
*数据来源：GitHub - esengine/DeepSeek-Reasonix | 统计时段：2026-07-24 ~ 2026-07-25*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

好的，作为你的 AI 开发工具技术分析师，我已根据 2026-07-25 的 GitHub 数据，为你整理了 OpenCode 社区的动态日报。

---

# OpenCode 社区动态日报 (2026-07-25)

## 1. 今日速览

今日 OpenCode 发布了 **v1.18.5**，主要修复了 Claude 自适应思维处理以及 OpenAI 响应阶段可能引发的对话中断问题。社区方面，围绕 **OpenCode Go 计划的模型兼容性**（特别是 Kimi、Qwen 系列模型）的 “Upstream request failed” 错误持续发酵，成为今日最核心的痛点。此外，**背景子代理（Background Subagent）** 的模型自动回退行为也引发了开发者的关注。

## 2. 版本发布

### v1.18.5
- **链接**: [v1.18.5 Release](https://github.com/anomalyco/opencode/releases/tag/v1.18.5)
- **核心更新**: 专注于核心稳定性的 Bug 修复版本。
- **主要内容**:
  - **改进**: 优化了 Claude 模型在不同响应结构下的自适应思维（Adaptive thinking）处理能力。
  - **修复**: 避免了 OpenAI 响应阶段处理可能导致的对话中断问题。
  - **修复**: 解决了搜索结果中 grep 符号链接路径的保留问题（贡献者：@remixz）。
  - **修复**: 修复了 Mistral 模型跨轮对话中的推理历史记录问题，提升了其稳定性。

## 3. 社区热点 Issues (Top 10)

以下为挑选出的近期最值得关注的 10 个 Issues：

1.  **[BUG] OpenCode Go 计划模型普遍失败 (#38378)**
    - **链接**: [#38378](https://github.com/anomalyco/opencode/issues/38378)
    - **重要性**: 高度关注。问题明确指出，在 Go 网关下，Kimi-k3 模型通过 Anthropic 兼容端点调用时持续失败，而 OpenAI 兼容端点却正常。这指向了 Go 网关内部的路由或协议转换逻辑可能存在缺陷。
    - **社区反应**: 作者 @proluct 提供了详细的对比测试和原始 curl 请求，为问题定位提供了关键证据。

2.  **[BUG] 多款模型在 OpenCode Go 中报错 “Upstream request failed” (#37771)**
    - **链接**: [#37771](https://github.com/anomalyco/opencode/issues/37771)
    - **重要性**: 社区影响面广，获得 5 个 👍。该 Issue 汇总了至少7个新模型（包括 kimi-k2.6, kimi-k2.7-code, qwen3.7-max 等）在 Go 计划下的相同失败问题。作者通过抓包确认，问题根源是请求体中包含了非标准的 `mcp`/`system` 字段，被上游严格校验器拒绝。
    - **社区反应**: 该 Issue 迅速成为 Go 计划模型兼容性问题的“总汇”，反映出当前 Go 代理在请求清洗（Request Sanitization）上存在不足。

3.  **[BUG] 无法在 OpenCode Go 计划中使用 Kimi 或 Qwen 模型 (#38219)**
    - **链接**: [#38219](https://github.com/anomalyco/opencode/issues/38219)
    - **重要性**: 与 #37771 和 #38378 高度相关，是 Go 计划模型兼容性问题的又一例证，表明此问题并非个例。
    - **社区反应**: 用户 @fishhh6529 确认未达到使用限制，问题具有普遍性。

4.  **[BUG] 背景子代理通知静默回退手动选择的模型 (#38770)**
    - **链接**: [#38770](https://github.com/anomalyco/opencode/issues/38770)
    - **重要性**: 揭示了实验性功能 `背景子代理` 的一个严重 UX 缺陷。当用户手动为非默认模型时，后台子代理的注入会导致模型被静默重置为配置文件默认值，严重干扰用户意图。
    - **社区反应**: 开发者对此表达了明确的困扰，认为该行为违反了显式用户选择的预期。

5.  **[FEATURE] 请求增加 `opencode research` 命令 (#35496)**
    - **链接**: [#35496](https://github.com/anomalyco/opencode/issues/35496)
    - **重要性**: 一个具有前瞻性的功能提案，旨在将实验循环自动化，并内建为 OpenCode 的一等公民命令。这体现了社区对 AI 辅助“科学研究”场景的探索。
    - **社区反应**: 评论呈现积极讨论状态，社区对该模式的认可度高。

6.  **[BUG] 会话关闭或删除功能失效/崩溃 (#38771)**
    - **链接**: [#38771](https://github.com/anomalyco/opencode/issues/38771)
    - **重要性**: 一个影响基本操作的严重 Bug。会话管理是日常使用中的高频功能，此问题会严重影响用户体验。
    - **社区反应**: 用户报告称操作无效甚至导致崩溃，反馈直接。

7.  **[BUG] 执行任务约30秒后自动停止，需手动恢复 (#38766)**
    - **链接**: [#38766](https://github.com/anomalyco/opencode/issues/38766)
    - **重要性**: 影响核心任务执行流程的阻塞性问题。任务无故中断且无错误提示，会极大降低自动化效率。
    - **社区反应**: 用户 @youtsuhodev 描述问题复现率高，属于典型的“卡死”类 Bug。

8.  **[BUG] 登录后输入命令无任何响应 (#38775)**
    - **链接**: [#38775](https://github.com/anomalyco/opencode/issues/38775)
    - **重要性**: 极为致命的启动性问题。应用在启动后完全无法使用，意味着产品对部分用户完全不可用。
    - **社区反应**: 用户表示已尝试重启应用和电脑，问题依旧存在，已打上 `needs:compliance` 标签。

9.  **[BUG] TUI模式下输入框在高负载时被黑色矩形遮挡 (#38773)**
    - **链接**: [#38773](https://github.com/anomalyco/opencode/issues/38773)
    - **重要性**: v2 开发分支的特定问题，但严重影响了 TUI 核心交互区域。问题发生在频繁工具调用或长推理时，属于高频场景下的 UI Bug。
    - **社区反应**: 用户 @ReStranger 是 TUI 重度用户，此前也报告过类似问题，表明 v2 分支 TUI 稳定性有待提升。

10. **[BUG] Gemini 3.6 Flash 等模型通过 OpenRouter 发送已弃用的采样参数 (#38767)**
    - **链接**: [#38767](https://github.com/anomalyco/opencode/issues/38767)
    - **重要性**: 暴露出 OpenCode 在通过 OpenRouter 调用部分新模型时，自动附加了模型文档已声明弃用的参数（如 `temperature`, `top_p`），可能导致请求被拒或行为异常。
    - **社区反应**: 用户 @anandpant 指出了参数与上游文档的不一致性，请求更新 OpenCode 的请求构建逻辑。

## 4. 重要 PR 进展 (Top 10)

1.  **`[fix(tui)]`: 修复 Windows 路径分隔符在状态对话框的显示问题 (#38764)**
    - **链接**: [#38764](https://github.com/anomalyco/opencode/pull/38764)
    - **状态**: 已合并 **CLOSED**
    - **摘要**: 修复了在 Windows 系统下，运行 `/status` 命令时文件路径显示不正确的问题。

2.  **`[feat(auth)]`: 支持每个提供者配置多个配置文件 (#36781)**
    - **链接**: [#36781](https://github.com/anomalyco/opencode/pull/36781)
    - **状态**: **OPEN**
    - **摘要**: 实现用户长期以来的需求，允许为同一个 AI 提供商（如 OpenRouter）存储多组 API 密钥，以应对不同场景或成本控制，并可通过命名配置文件进行切换。

3.  **`[feat(tui)]`: 在子代理页脚显示模型变体信息 (#38772)**
    - **链接**: [#38772](https://github.com/anomalyco/opencode/pull/38772)
    - **状态**: **OPEN**
    - **摘要**: 改进了多代理场景下的信息透明度，在子代理的底部状态栏中显示其正在使用的模型、提供者和具体变体，与主代理保持一致。

4.  **`[fix(session)]`: 修复无字段异步提示时的代理和模型重置问题 (#35195)**
    - **链接**: [#35195](https://github.com/anomalyco/opencode/pull/35195)
    - **状态**: **OPEN**
    - **摘要**: 当用户通过 `opencode` 命令直接发送提示（Prompt）而未显式指定代理时，会话会错误地重置。此 PR 旨在修复此问题，保留当前会话的 Agent 和 Model 状态。

5.  **`[fix(mcp)]`: 使 MCP OAuth 回调启动具备原子性 (#33715)**
    - **链接**: [#33715](https://github.com/anomalyco/opencode/pull/33715)
    - **状态**: 已关闭 **CLOSED**
    - **摘要**: 修复了 MCP OAuth 回调服务器启动时的竞态条件，确保障听器绑定成功后才发布服务器状态，提高了安全性。

6.  **`[fix(session)]`: 修复工具输入中止时助理消息的完成状态 (#33684)**
    - **链接**: [#33684](https://github.com/anomalyco/opencode/pull/33684)
    - **状态**: 已关闭 **CLOSED**
    - **摘要**: 修复了一个边缘 Bug：当流式请求在 `tool-input-start` 之后、`tool-call` 完成前被中止时，`halt()` 函数未能正确设置 `assistantMessage.error`，导致会话状态异常。

7.  **`[fix(acp)]`: 从 ToolCallLocation 中移除目录路径 (#33680)**
    - **链接**: [#33680](https://github.com/anomalyco/opencode/pull/33680)
    - **状态**: 已关闭 **CLOSED**
    - **摘要**: 遵循 ACP 规范，修复了 `ToolCallLocation` 中误传入工作目录路径的问题。此问题可能会导致工具调用上下文范围不准确。

8.  **`[fix(session)]`: 在回退到未知错误前正确分类上下文溢出错误 (#33667)**
    - **链接**: [#33667](https://github.com/anomalyco/opencode/pull/33667)
    - **状态**: 已关闭 **CLOSED**
    - **摘要**: 优化了错误处理逻辑。当提供商返回的上下文溢出错误被包裹在通用 `Error` 中时，OpenCode 现在能正确识别并归类，而不是简单地标记为“未知错误”。

9.  **`[fix(context)]`: 使用输入窗口计算上下文使用百分比 (#33665)**
    - **链接**: [#33665](https://github.com/anomalyco/opencode/pull/33665)
    - **状态**: 已关闭 **CLOSED**
    - **摘要**: 修复了上下文使用率的显示计算。对于使用“分窗”模型的用户，此前百分比是基于总上下文（输入+输出）计算，现在改为基于输入窗口大小，使百分比数值更准确地反映资源消耗。

10. **`[fix(ui)]`: 保护会话审查的 Diff 显示 (#33664)**
    - **链接**: [#33664](https://github.com/anomalyco/opencode/pull/33664)
    - **状态**: 已关闭 **CLOSED**
    - **摘要**: 修复了在查看 Session Review 时，因某条 diff 数据格式不符合预期导致整个页面或组件崩溃的问题，增强了鲁棒性。

## 5. 功能需求趋势

从今日的 Issues 和 PR 中，可以提炼出社区最关注的几个功能方向：

1.  **新模型与提供商兼容性**: 这是当前最强烈的呼声。社区正积极尝试接入各类新模型（特别是通过 `Go` 计划），但频繁遭遇通用性错误（`Upstream request failed`）。**请求优化 Go 网关的请求清洗和协议适配逻辑**，以兼容不同模型对请求头、字段和参数格式的特殊要求。

2.  **代理与模型选择的精细控制**: 社区对多代理工作流中模型的**自主选择权**和**状态持久性**要求很高。`背景子代理` 自动回退模型配置的行为引发了强烈不满，表明用户期望在每次交互中都保持对模型选择的绝对控制。

3.  **TUI 稳定性与功能性改进**: 多个关于 TUI 的 Bug（黑色矩形遮挡、面板消失）表明 v2 分支的 TUI 在高负载下的稳定性是首要待解决问题。同时，`路由粘贴文本答案`、`显示子代理模型信息` 等 PR 则反映了社区对 TUI 功能深化的期待。

4.  **实验性与自动化工作流支持**: `opencode research` 命令的提出，代表了社区对 AI 编码工具从“辅助编码”向“自动化科研”方向演进的探索。这表明社区需求正从简单的代码生成，向更复杂的实验循环管理延伸。

## 6. 开发者关注点

结合当日动态，开发者普遍反馈以下痛点或高频需求：

1.  **连接和配置的“不确定性”**: 开发者花费大量时间在调试与不同 AI 模型的连接问题上。`Go` 计划的错误信息（`Upstream request failed`）过于通用，缺乏定位根因的有效信息，这是当前最大的效率杀手。

2.  **“静默”和“不符合预期”的行为**: 模型选择被静默回退（#38770）、任务无故中断（#38766）、输入无响应（#38775）等问题，严重动摇了用户对工具的可预测性信任。开发者需要更清晰、即时的状态反馈和错误报告机制。

3.  **配置管理和状态持久化**: 尽管提供了 `opencode.json`，但当服务商或模型行为发生变化时，配置文件的管理和维护变得复杂。对 **多个 API 配置文件（Profile）** 的原生支持是未被满足的强需求。

4.  **边缘场景和第三方集成兼容性**: 从 Windows 路径分隔符问题到 OpenRouter 的弃用参数，再到 MCP OAuth 的竞态条件，开发者希望核心产品能更好地处理不同操作系统、第三方 API 规范演进等各种边缘情况，减少不必要的“杂活”。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-07-25）

---

## 今日速览
Qwen Code 发布 **v0.21.0 正式版**，重点增强 Web Shell 工作区管理能力。SWE-bench Verified 全量评测流水线（POC）成功跑通，500 题解决率达 **66.4%**（332/500）。社区最为关注两大议题：**QWEN.md 用户规则被系统提示覆盖**，以及 **VSCode 扩展中 MCP 兼容性弱于 Claude Code** 的质量短板。

---

## 版本发布

### v0.21.0（正式版）
无 Breaking Changes。核心变更为 Composer 工具栏新增**工作区选择器**，支持添加/切换工作区，Web Shell 的多项目协同体验得到改善。
[Release 详情](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.0)

### v0.20.1-nightly.20260724
涵盖遥测守护进程初始化稳定性测试及多项性能优化。

### SWE-bench 全量评测流水线里程碑（实验性 POC）
围绕 PR [#7656](https://github.com/QwenLM/qwen-code/pull/7656)，团队提交了多个 **DSW SWE-bench Full POC** 标签（Run 2 / Run 3 / Run 4 及 Async POC），成功跑通异步发布与评测流水线。其中最关键的 **Run 3** 结果如下：
- **数据集**：`swe-bench-verified@2`，500 题全部完成
- **结果**：332 解决（Resolved）、107 未解决、56 执行错误、5 基础设施故障
- **当前状态**：`QUARANTINED`（内部隔离审查，数据待最终校准）

> 说明：这些 POC 标签并非正式发布，但「异步 Release → 评测 → 汇总」的 CI 架构已被验证，为后续常态化 Benchmark 打下了基础。

---

## 社区热点 Issues（Top 10）

1. **#7679 QWEN.md 多 Agent 禁令被系统默认指引覆盖** [P2/Bug]
  用户明确在 QWEN.md 中禁止随意使用多 Agent，但模型在仅要求分析问题的简单任务中依然 spawn 子 Agent。排查发现系统提示词的默认倾向压过了用户自定义规则，触及 Agent 行为控制权的核心信任问题。三条层层递进的分析获得社区广泛认同。
  [查看详情](https://github.com/QwenLM/qwen-code/issues/7679)

2. **#7697 VSCode 扩展无法连接 Unity MCP（Claude Code 可正常使用）** [P3/Bug]
  用户反馈在 VSCode 扩展中无法调用 Unity MCP 工具，而 Claude Code 工作正常。初步排除了 MCP 服务器本身的问题，指向 Qwen Code VS Code 扩展的协议解析兼容性。
  [查看详情](https://github.com/QwenLM/qwen-code/issues/7697)

3. **#5800 CLI 终端渲染：回复过长时最后一行被覆盖** [P2/Bug]
  Static 渲染路径下的老牌 Bug。当回复超过终端高度时，最后一行在更新完成后消失。涉及 Ink 框架的上游缺陷（#973），持续近一个月，欢迎 PR。
  [查看详情](https://github.com/QwenLM/qwen-code/issues/5800)

4. **#7684 macOS Command 模式下输入法候选框定位不准** [P2/Bug]
  当 Statusline 显示多行时，中文输入法候选框远离光标位置，严重干扰中文用户编辑。
  [查看详情](https://github.com/QwenLM/qwen-code/issues/7684)

5. **#7264 冷启动跟踪：进一步延迟加载候选模块** [P2/Enhancement]
  基于 esbuild-metafile 审计的后续工作。ACP 子进程存在 2420 个模块的静态导入闭包（17.24 MiB），本次跟踪列出了最值得懒加载的模块清单。
  [查看详情](https://github.com/QwenLM/qwen-code/issues/7264)

6. **#7671 Plan 模式退出缺陷：模型不感知 + 无帮助报错** [P2/Bug]
  用户在 Plan 模式下手动切换模式时，模型未收到通知且返回无意义的 deny 错误，导致状态不一致。
  [查看详情](https://github.com/QwenLM/qwen-code/issues/7671)

7. **#7685 Subagent 模型等级选择** [P3/Feature]
  希望 `agent` 工具支持 model 参数，允许在 spawn 子 Agent 时指定 small / medium / high / super 等级，实现精细化的成本与质量控制。
  [查看详情](https://github.com/QwenLM/qwen-code/issues/7685)

8. **#4252 生成性能指标（TPS / TTFT）加入 /stats** [持续诉求]
  用户希望获得实时 Token 生成速度与首 Token 延迟，以便量化 Prompt 改动的影响、监控推理性能。社区关注度长期较高。
  [查看详情](https://github.com/QwenLM/qwen-code/issues/4252)

9. **#7687 钉钉渠道支持发送图片** [P3/Feature]
  希望在钉钉集成中，Agent 能够直接发送截图、图表等生成图片，而非仅返回文件路径。
  [查看详情](https://github.com/QwenLM/qwen-code/issues/7687)

10. **#7696 后台自动控制 Agent 引擎（Service Agent Engine）** [P3/Feature]
   提出构建一个运行时层，让用户轻松创建与管理后台常驻的自动化 Agent，实现 "agent-agnostic" 的服务化控制。
   [查看详情](https://github.com/QwenLM/qwen-code/issues/7696)

---

## 重要 PR 进展（Top 10）

1. **#7690 Review 评论状态辅助工具**
  新增 `qwen review comment-status` 确定性遍历子命令，输出 PR 内联评论的状态索引，为 Code Review 的第一步提供数据结构化能力。
  [查看 PR](https://github.com/QwenLM/qwen-code/pull/7690)

2. **#7686 首用依赖懒加载（性能优化）**
  对应 #7264 的具体实现。将首次使用的 npm 依赖包改为运行时动态加载，目标是削减冷启动时 ACP 子进程巨大的静态导入闭包。
  [查看 PR](https://github.com/QwenLM/qwen-code/pull/7686)

3. **#7692 Review 提交前 Head Drift 检测**
  在 Presubmit 阶段检测 PR Head 是否已推进，防止 Review 基于过期代码做出判决，保障并发场景下的 Review 安全性。栈在 #7691 之上。
  [查看 PR](https://github.com/QwenLM/qwen-code/pull/7692)

4. **#7683 Web Shell 只读 GitHub PR 面板**
  在 Web Shell 的 Git 对话框中新增 Pull Requests 标签页，支持浏览标题、分支、Review 标志、CI 聚合图标；新增 `/prs` 命令。
  [查看 PR](https://github.com/QwenLM/qwen-code/pull/7683)

5. **#7586 外部上下文检索集成**
  第一阶段外部上下文协作能力。允许 CLI 进程作为可信端点，向有限协作方提供指定语料库的只读检索，不引入完整的 RAG 复杂度。
  [查看 PR](https://github.com/QwenLM/qwen-code/pull/7586)

6. **#7680 Web Shell Git 分支芯片缓存加速**
  Git 状态从守护进程的每工作区缓存回答，后台异步刷新，Web Shell 新会话 Git 芯片几乎是「瞬间」渲染。
  [查看 PR](https://github.com/QwenLM/qwen-code/pull/7680)

7. **#7695 修复 Web Shell 对 Git Worktree 的兼容性**
  之前 Worktree 会话完全禁用了 Changes 和 History 对话框。此 PR 在整个栈中传递可选的 git 工作目录，实现了完整支持。
  [查看 PR](https://github.com/QwenLM/qwen-code/pull/7695)

8. **#7632 GitHub 通知轮询适配器**
  采用「信号 vs 上下文」分离架构的新渠道适配器。可轮询 GitHub 通知并响应 Issue/PR 的 @提及，改写之前的共享抽象方案。
  [查看 PR](https://github.com/QwenLM/qwen-code/pull/7632)

9. **#7656 隔离的 SWE-bench 发布流水线（关联发布板块）**
  构建了 `GitHub Release → 短 DSW 调度 → PostgreSQL 队列 → 持久化协调器 + 10 Harbor 执行器 → 评分 → OSS → 发布摘要` 的异步全量评测管道。
  [查看 PR](https://github.com/QwenLM/qwen-code/pull/7656)

10. **#7651 系统提示词三层结构优化（性能）**
   将 System Prompt 重构为「稳定层 → 上下文层 → 易变层」，Managed Auto-Memory 被放到最后，防止夹在中间导致模型注意力稀释。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/7651)

---

## 功能需求趋势

1. **Web Shell 体验全面增强**
  工作区切换、只读 PR 面板、Worktree 支持、Git 芯片缓存——Web 化是明确的平台演进方向。

2. **Code Review 原生自动化**
  由 Wenshao 主导的系列 PR（#7690～#7694）正在构建一套端到端、安全的 AI 原生代码审查套件（评论索引、写合约控制、并发偏移检测）。

3. **外部渠道与 Bot 生态**
  从 GitHub 通知到钉钉图片、Channel 管理 API（#7632, #7687, #7637），Qwen Code 正在成为跨平台 Agent 基础设施。

4. **核心性能精细化优化**
  冷启动、懒加载、系统提示词分层——社区对性能敏感度极高，优化进入模块级的精细修剪阶段。

5. **Agent 行为可编程性**
  用户希望不仅能使用 Agent，更能编程控制 Agent（QWEN.md 权威性、Subagent 模型选择、Service Agent 后台引擎）。

---

## 开发者关注点

1. **QWEN.md 规则权威性**
  用户自定义规则被系统级提示词覆盖，是当日最受关注的治理信任问题。

2. **MCP 通用兼容性**
  VS Code 扩展中 MCP 连接弱于 Claude Code，反映出 Qwen Code 在协议适配方面的差距。

3. **CJK / IME 输入法体验（macOS）**
  跨平台桌面应用的本地化细节依然存在痛点，输入法候选框偏移直接影响中文用户的日常使用。

4. **性能可观测性缺失**
  `#4252` 持续 2 个月的高关注度说明社区迫切需要 TPS / TTFT 等量化指标来优化模型调用策略。

5. **终端渲染鲁棒性**
  Static 模式下多行回复被覆盖的 Bug 虽技术门槛高（Ink 框架层），但对日常终端用户影响直观。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，作为一名专注于 AI 开发工具的技术分析师，现根据您提供的 GitHub 数据，为您呈现 2026-07-25 的 Hermes 社区动态日报。

---

# Hermes 社区动态日报 | 2026-07-25

## 1. 今日速览

今日 Hermes 社区迎来了 **Windows 平台编码兼容性问题的密集修复期**，累计 10 余个相关历史 Issue 被集中关闭，标志着项目在跨平台健壮性上取得重大进展。与此同时，PR 侧主线集中在 **安全凭据全链路脱敏** 与 **语音 TTS 管线流式优化** 上。新提出的 **跨进程技能文件锁** 和 **凭据池主动轮换** 特性，预示着社区对生产级并发安全与精细化成本控制的强烈追求。

## 2. 版本发布

（过去 24 小时无新版本发布）

## 3. 社区热点 Issues

以下筛选出 10 个最值得关注的 Issue，涵盖仍待解决的 Bug 以及社区关心的新特性：

1.  **网关可达性误报（Desktop）**
    `#69230`：[Desktop app: Remote gateway reachability check fails](https://github.com/NousResearch/hermes-agent/issues/69230)
    **重要性：** 仍处于 **OPEN** 状态。桌面端远程网关健康检查彻底失败，即使服务端可通过 curl 正常访问。严重阻碍桌面用户接入远程网关，社区正在寻求复现。
    **社区反应：** 3 条讨论，标签为 `needs-repro`，正在等待更多环境信息。

2.  **跨进程技能文件锁（新特性）**
    `#71091`：[feat: per-skill file lock for cross-process write safety](https://github.com/NousResearch/hermes-agent/issues/71091)
    **重要性：** **今日新开**。针对高并发多用户负载下，技能文件写入缺乏同步导致损坏的痛点，提出引入文件级锁。
    **社区反应：** 已收到初步反馈，正在讨论实现路径（`fcntl`/`msvc` 互斥）。

3.  **凭据池主动轮换机制**
    `#71095`：[Credential pools: no supported way to rotate a healthy credential](https://github.com/NousResearch/hermes-agent/issues/71095)
    **重要性：** **今日新开**。当前凭据仅在请求失败后被标记耗尽且轮换。此需求允许在配额窗口关闭前主动轮换健康凭据，对 Codex 等按量计费的池子至关重要。

4.  **卫生代理就地压缩状态未同步**
    `#71097`：[Hygiene Agent In-Place Compression Fails](https://github.com/NousResearch/hermes-agent/issues/71097)
    **重要性：** **今日新开**。P2 级 Bug，`_last_compaction_in_place` 状态变量未正确设置，导致压缩功能失效，即使配置了 `compression.in_place = true` 也无法工作。

5.  **中文 Windows 下 `skills check` 崩溃（已修复）**
    `#68369`：[hermes skills check crashes on Chinese Windows](https://github.com/NousResearch/hermes-agent/issues/68369)
    **重要性：** 今日 **CLOSED**。典型编码 Bug，`HubLockFile.load()` 在读取 `lock.json` 时未显式指定 UTF-8 编码，导致中文区域 GBK 解码失败。本轮编码修复的代表案例。

6.  **UTF-8 BOM 静默吞掉 `.env` 首个变量（已修复）**
    `#65123`：[A UTF-8 BOM in .env silently drops the first key](https://github.com/NousResearch/hermes-agent/issues/65123)
    **重要性：** 今日 **CLOSED**。极具隐蔽性的故障模式，若 `.env` 文件含有 BOM 头，首个 API Key 会被静默丢弃，且无任何日志抛出，导致"无提供商"的假象。

7.  **Memory 编码静默失效（已修复）**
    `#57754`：[Encoding corruption in MEMORY.md/USER.md silently disables memory](https://github.com/NousResearch/hermes-agent/issues/57754)
    **重要性：** 今日 **CLOSED**。严重的静默失败模式：Memory 文件包含非 UTF-8 字节时，整个记忆系统若机，但无任何日志输出，让开发者无法诊断。

8.  **Windows Desktop 下 `skill_view` 报错（已修复）**
    `#51691`：[skill_view returns UTF-8 decode error on Windows Desktop](https://github.com/NousResearch/hermes-agent/issues/51691)
    **重要性：** 今日 **CLOSED**。即使 SKILL.md 为有效 UTF-8，在中文 Windows 环境下依然报解码错误，暴露了内部解析路径对平台编码的隐含依赖。

9.  **Memory 模块核心编码缺陷（已修复）**
    `#10879`：[Non-UTF-8 MEMORY.md raises uncaught UnicodeDecodeError](https://github.com/NousResearch/hermes-agent/issues/10879)
    **重要性：** 今日 **CLOSED**。本轮 Memroy 编码修复的根因 Issue，`MemoryStore._read_file()` 在调用 `read_text` 时缺少 `errors=` 参数保护。

10. **Cron 脚本 stdout 在 cp1252 下乱码（已修复）**
    `#42785`：[cron no_agent script stdout decoded with platform default](https://github.com/NousResearch/hermes-agent/issues/42785)
    **重要性：** 今日 **CLOSED**。`_run_job_script` 捕获标准输出时使用平台默认编码，导致 Windows 下非 ASCII 字符在传递给用户前即被破坏。

## 4. 重要 PR 进展

从过去 24 小时更新的 50 个 PR 中，梳理出以下 10 个最值得关注的合并请求：

1.  **Gateway：强制重建 Signal SSE 卡死流**
    `#71098`：[fix(gateway): force reconnect stale Signal SSE streams](https://github.com/NousResearch/hermes-agent/pull/71098)
    **意义：** 修复消息代理因 SSE 流静默中断（超过 120 秒）导致消息永久丢失的严重 Bug。

2.  **代理：超时自动释放卡住的异步子 Runner**
    `#71096`：[fix(delegation): timeout stuck async child runners](https://github.com/NousResearch/hermes-agent/pull/71096)
    **意义：** 解决 `delegate_task(background=true)` 导致网关会话资源被长期占用的致命死锁问题，P2 级优先。

3.  **安装：解决 Windows 下 Playwright 命令找不到**
    `#71093`：[fix(install): resolve Playwright command on Windows](https://github.com/NousResearch/hermes-agent/pull/71093)
    **意义：** 修复因 npm 工作区隔离导致 Windows 安装 Playwright 失败的开发者体验问题。

4.  **脱敏：覆盖 Gemini AQ.-前缀新密钥格式**
    `#66926`：[fix(redact): also catch bare AQ.-prefix Gemini authorization keys](https://github.com/NousResearch/hermes-agent/pull/66926)
    **意义：** 扩展安全脱敏范围，覆盖 Gemini 新授权密钥格式，防止日志泄露，属于安全边界修复。

5.  **安全：凭据输出全链路脱敏**
    `#67344`：[fix(security): mask credential output across CLI and gateway](https://github.com/NousResearch/hermes-agent/pull/67344)
    **意义：** 统一路由 CLI/Gateway 输出至脱敏过滤器，并修复了 `callable-credential` 的潜在崩溃问题。

6.  **评估：新增确定性评估测试框架**
    `#67343`：[feat(evals): add deterministic evaluation harness](https://github.com/NousResearch/hermes-agent/pull/67343)
    **意义：** 7 个测试套件 / 29 个场景的确定性评估框架，包含特定基准线，是 Agent 回归测试的重要基础设施。

7.  **语音：滚动窗口 VAD 抑制 TTS 误打断**
    `#71083`：[fix(voice): rolling-window VAD to prevent false barge-in during TTS](https://github.com/NousResearch/hermes-agent/pull/71083)
    **意义：** 解决 TTS 播放时因噪音基准冻结导致大声段落误触发 Barge-in 打断语音的体验问题。

8.  **语音：流式 TTS 支持网关与 HTTP/2 池**
    `#71087`：[fix(tts): gateway-aware OpenAIStreamer with pooled HTTP/2 client](https://github.com/NousResearch/hermes-agent/pull/71087)
    **意义：** 修复流式 TTS 检测不到网关而回退至同步路径（导致 3 秒延迟）的问题，并复用了 HTTP/2 连接池降低开销。

9.  **Cron：调度锁防残留**
    `#70664`：[fix(cron): release guard on execution claim failure](https://github.com/NousResearch/hermes-agent/pull/70664)
    **意义：** 修复因文件描述符耗尽导致 `create_execution()` 失败后，内存锁未释放，进而导致后续健康心跳误报"Already running"的问题。

10. **配对：增加 `user_id` 后备批准策略**
    `#70765`：[fix(pairing): add approve-by-user_id fallback](https://github.com/NousResearch/hermes-agent/pull/70765)
    **意义：** 针对 Telegram 等平台因网络延迟丢弃配对码的场景，新增通过 `--by-user-id` 标志的后备批准流程。

## 5. 功能需求趋势

从今日的 Issue 和 PR 中提炼出社区最关注的五个功能方向：

1.  **跨平台编码兼容性彻底治理：** 今日密集关闭的编码 Bug 并非个例，而是一场“兜底式”的重构。社区强烈要求未来所有文件读取、子进程解码、环境变量解析都必须 **显式指定 UTF-8 编码**，消除对平台默认编码（GBK/cp1252）的隐形依赖。
2.  **高并发下的资源一致性：** `#71091`（技能文件锁）和 `#71096`（代理超时释放）表明，多会话、多进程环境下的 **无锁写入** 和 **幽灵资源** 已成为生产级部署的最大障碍。文件级锁定与分布式事务支持是热点方向。
3.  **智能凭据管理：** 从被动脱敏（#66926、#67344）到主动轮换（#71095），社区不再满足于 Key 的静态配置，而是希望系统能够 **动态检测配额、主动轮换失效凭据、并在正式失败前进行优雅切换**。
4.  **语音交互的流式与低延迟化：** 三项 TTS 优化 PR（#71083、#71084、#71087）集中于消除句子间 3-5 秒间隙、防止误打断、复用长连接。语音正从“可用”向“良好实时交互”演进。
5.  **网关与 Session 状态的自愈能力：** Gateway SSE 强制重连（#71098）、Cron 锁防残留（#70664）暴露了当前在长连接保活和状态一致性方面的短板，**心跳探针** 与 **强超时兜底策略** 成为必备特性。

## 6. 开发者关注点

总结今日数据中开发者反馈最为集中的痛点与高频需求：

1.  **Windows 是 Bug 重灾区：** 虽然今日关闭了大量编码问题，但这恰恰印证了 Windows 平台（尤其是中文/非 UTF-8 区域）测试覆盖的不足。开发者期望此类兼容性测试能被纳入 CI，防止新功能再次引发 UnicodeDecodeError。
2.  **“静默吞错误”是最大的敌人：** `.env` BOM 吞 Key、Memory 编码坏掉无日志，这些 Bug 激起了社区最大的负面情绪。开发者明确表态：“**宁可进程崩溃抛异常，也不要静默功能异常**”。详尽的异常日志和预警机制是最高优先级的诉求。
3.  **可调试性与可观测性不足：** 面对 Desktop 远程网关误报（#69230）和 Cron 锁误报，开发者普遍感觉“无能无力”。对 **状态检查 CLI**（如 `hermes status --verbose`）和 **API 转储**（#71101）的需求呼声非常高。
4.  **生产环境资源泄漏恐慌：** 多个 PR 针对“资源看门狗”未正确清除的修复，让开发者对 Agent 长时间运行后的 **GPU 显存 / 文件描述符 / 会话锁泄漏** 感到担忧。完善的资源打点和主动告警机制是运营开发者的硬需求。
5.  **写入安全迫在眉睫：** `#71091` 一提出即受到广泛关注，说明社区已经在将 Hermes 用于高频调用和多 Session 负载场景。**无锁写入导致的数据损坏** 是比功能缺失更大的恐惧，文件级写入排他锁被认为是最低限度的安全保护。

</details>

</div>
