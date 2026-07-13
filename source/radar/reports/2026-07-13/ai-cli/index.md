---
title: "AI CLI 工具社区动态日报"
date: 2026-07-13
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# AI CLI 工具社区动态日报 2026-07-13

> 生成时间: 2026-07-13 00:38 UTC | 覆盖工具: 7 个

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

# AI CLI 开发工具横向对比分析报告（2026-07-13）

## 1. 生态全景

当前 AI CLI 工具生态正处于 **“能力扩展期的全面阵痛”** 阶段。一方面，MultiAgent、自主编码、服务化架构等新范式快速落地；另一方面，安全机制粗糙、代理控制失控、基础交互退化等问题频繁爆发，社区信任被显著消耗。各工具均呈现出 **“快速迭代与稳定性债务并存”** 的典型特征，Windows 平台成为所有工具共同的短板。行业正从“能否生成代码”转向“能否可靠地执行复杂工作流”的关键竞争期。

---

## 2. 各工具活跃度对比

| 工具名称 | 核心 Issue 数 | 核心 PR 数 | 版本发布 | 社区情绪基调 |
|---|---|---|---|---|
| **Claude Code** | ~10 条高关注 | 3 条 | 0 | **焦虑/信任危机**：AUP 误报引发广泛不满 |
| **OpenAI Codex** | ~10 条高关注 | 3 条 | 0 | **反抗/质疑**：强制 Agent 架构剥夺用户选择权 |
| **Gemini CLI** | ~10 条高关注 | 10 条 | 0 | **稳健/期待**：基础设施逐步成熟，但存在顽固 Bug |
| **DeepSeek Reasonix** | 30 条新/更新 | 33 条 | 2 次（v1.17.11） | **高涨/急迫**：社区极度活跃，迭代速度最快 |
| **OpenCode** | 50+ 条 | 50+ 条 | 0（仅 CI 产物） | **疲惫/容忍**：技术债务堆积，基础功能反复回归 |
| **Qwen Code** | ~10 条高关注 | 10 条 | 0（Nightly 构建失败） | **焦虑/不安全感**：CI 流水线连续故障冲击信心 |
| **Hermes** | ~10 条高关注 | 10 条 | 0 | **平稳/修复期**：批量清理积压 Bug，平台适配性提升 |

---

## 3. 共同关注的功能方向

| 关注方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **子代理/Agent 架构的可控性** | Codex（强制架构）、Gemini（挂起/循环）、DeepSeek（自触发循环）、OpenCode（工具调用死循环） | 用户要求 **可见、可控、可覆盖** 的代理行为逻辑，反对“黑盒化”静默推进 |
| **上下文与 Token 成本管理** | Claude Code（100K 崩溃）、Codex（wait 工具浪费）、DeepSeek（手动压缩诉求）、Qwen（Prompt Cache 失效） | 社区急需 **透明化的 Token 消耗机制** 和 **用户触发的上下文修剪能力** |
| **安全权限精细化** | Claude Code（AUP 误报）、OpenCode（默认宽松）、Hermes（SSRF 防护/读写白名单）、DeepSeek（会话级权限） | 从“全有或全无”走向 **细粒度、可审计、可申诉** 的安全模型 |
| **Windows 平台体验** | Claude Code（Cowork 崩溃）、Codex（卡死/崩溃）、Hermes（cua-driver 崩溃） | **普遍性短板**，任何一个工具若能稳定支持 Windows 即为重大差异化优势 |
| **插件/技能生态健壮性** | Claude Code（MCP JSON-RPC）、Codex（CDN 哈希失败）、Gemini（MCP 配置 Bug）、OpenCode（插件加载失败） | 外部依赖脆弱，**协议层标准化与单元测试覆盖** 是生态健康的基础 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | **安全对齐 + 深度编码** | 企业级开发者、合规敏感团队 | 强安全护栏（目前过紧）、VSCode 扩展优先、模型驱动 |
| **OpenAI Codex** | **前沿架构 + 多 Agent 协作** | 追求最新的技术早期采纳者 | 强制推进 MultiAgent V2/Sol、CLI+TUI+Desktop 全端覆盖 |
| **Gemini CLI** | **可评估的基础设施** | 追求可复现性与代码质量的工程团队 | 重度投入 Eval 体系、AST 代码理解、开放 MCP 生态 |
| **DeepSeek Reasonix** | **极速迭代的桌面 Agent** | 桌面端重度用户、中文生态开发者 | 社区驱动、Desktop 与 CLI 并行、修复速度行业最快 |
| **OpenCode** | **多模型通用 Hub** | 希望自由切换模型的进阶用户 | 优先兼容各类 Provider、Plugin 系统、V2 架构重构中 |
| **Qwen Code** | **服务化远端架构** | 团队协作、云端开发场景 | Daemon 多工作区、Web Shell 为主战场、Channel Workers |
| **Hermes** | **平台网关集成** | DevOps、需要嵌入现有 IM 的团队 | Telegram/微信/飞书多平台适配、ACP 协议、TUI 轻量体验 |

**核心发现**：目前没有工具同时在 **前沿能力、稳定性、生态开放性** 三个维度上占据绝对优势。市场仍处于“各有所长，各有其痛”的分裂状态。

---

## 5. 社区热度与成熟度评估

- **迭代最激进（快速成长期）**：**DeepSeek Reasonix**（30 Issues / 33 PRs / 2 个 Release）和 **OpenCode**（50+ 双向贡献）。这两个社区处于“狂奔”状态，功能快速上线，但 Bug 积压和回归问题最为突出。
  
- **社区争议最激烈（信任挑战期）**：**Claude Code**（AUP 误报信任危机）和 **OpenAI Codex**（强制架构招致社区反抗）。社区情绪不是“工具不好用”，而是“工具不受我控制”。这是更深层次的问题。

- **基础设施最扎实（稳步成长期）**：**Gemini CLI**（PR 活跃且方向正确——Eval、安全、AST）和 **Hermes**（批量修复积压 Bug、安全增强）。这两个社区虽然热度不如前列，但健康度较高。

- **发育阵痛最显著（基础设施瓶颈期）**：**Qwen Code**（CI 连续失败、Nightly 发布中断）。快速推进服务化架构的代价是基础流水线和测试覆盖出现缺口，这在早期高速迭代中常见，但需要立刻纠正。

---

## 6. 值得关注的趋势信号

### 信号一：**“不可控的 AI” 正在成为用户弃用的第一理由**
Claude Code 的 AUP 误报、Codex 强制架构、DeepSeek 的自触发循环——三家头部工具不约而同地引发了用户对 **“AI 行为不可预测”** 的强烈反弹。这对于开发者来说意味着：**选择工具的评估标准应从“它能做什么”转向“它不做我不让它做的事”**。具备可配置的安全边际、透明的决策链路、以及清晰退出机制的 Agent 工具将获得长期信任。

### 信号二：**Agent 循环崩溃是系统级风险，需要“断路器”模式**
OpenCode 的工具调用死循环、DeepSeek 的自触发循环、Gemini 的通用代理挂起——这些 Bug 在不同架构中反复出现，说明当前 LLM 驱动的 Agent 普遍缺乏 **自主检测与中断能力**。行业亟需标准化的 Loop Detection 机制和可配置的 turn-limit 断路器，否则无人值守场景的可靠性永远存疑。

### 信号三：**Windows 不是二等市场，而是蓝海**
所有工具的 Windows 端反馈都是“频繁崩溃、卡死、兼容性差”。这是一个巨大的信号：**当前无一工具在 Windows 上达到生产级体验**。对于面向企业市场的工具开发者来说，投入 Windows 原生体验优化可能是目前 ROI 最高的差异化投入。

### 信号四：**安全正在从“附加项”变为“一级架构需求”**
Hermes 新增 `HERMES_READ_SAFE_ROOTS`、OpenCode 社区强烈要求更严格默认策略、DeepSeek 讨论会话级权限——用户不再满足于被动安全，而是主动要求 **内建安全边界**。对于开发者：将安全模型设计在第一天，远比事后打补丁更经济。

### 信号五：**服务化（Daemon / Channel Workers）成为下一阶段架构主流**
Qwen Code 的 Daemon 多工作区、OpenCode 的 V2 配置治理、DeepSeek 的 Provider Manager 重构——AI CLI 正在从“单进程单会话”走向 **持久化后台服务 + 多通道前端** 架构。这意味着，持久化状态管理（如 OpenCode 的 SQLite 膨胀问题）将成为决定稳定性的关键成败因素。

---

*报告基于 2026-07-13 各工具 GitHub 仓库公开数据综合整理。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-07-13）

---

## 1. 热门 Skills 排行

根据 GitHub 仓库的评论热度排序，以下 8 个 PR（Pull Request）引发了社区最广泛的关注，涵盖核心工具修复与新技能提案。

### #1298 – fix(skill-creator): run_eval.py always reports 0% recall
- **功能**：修复 `run_eval.py` 在评估 skill 描述时总报告 `recall=0%` 的问题，涉及 Windows 流读取、触发检测、并行工作等多个缺陷。该 PR 直指 skill 描述优化循环的核心失效，直接关联 10+ 独立复现报告。
- **热点**：社区持续追问评估工具为何输出无效信号，导致优化循环“对噪声优化”。
- **状态**：🟡 Open  
  [https://github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

### #514 – Add document-typography skill
- **功能**：新增排版质量 skill，自动修复 AI 生成文档中的孤词（orphan word）、寡行（widow paragraph）和编号错位等问题。
- **热点**：用户普遍认可该 skill 填补了 Claude 生成文档在排版层面的空白，讨论集中于触发条件的精确性与副作用控制。
- **状态**：🟡 Open  
  [https://github.com/anthropics/skills/pull/514](https://github.com/anthropics/skills/pull/514)

### #486 – Add ODT skill (OpenDocument 创建与填充)
- **功能**：支持创建、填充、读取并转换 OpenDocument 格式（.odt/.ods），包括模板填充和 ODT→HTML 解析，满足开源办公生态需求。
- **热点**：社区关注格式兼容性、LibreOffice 集成路径以及与其他文档技能（如 docx）的协同。
- **状态**：🟡 Open  
  [https://github.com/anthropics/skills/pull/486](https://github.com/anthropics/skills/pull/486)

### #210 – Improve frontend-design skill clarity and actionability
- **功能**：重写前端设计技能，确保每条指令可在单次对话中执行，并细化行为指导（如组件拆分、样式体系、响应式）。
- **热点**：讨论集中于如何定义“可执行”边界、避免过于抽象，以及历史版本对比的反馈。
- **状态**：🟡 Open  
  [https://github.com/anthropics/skills/pull/210](https://github.com/anthropics/skills/pull/210)

### #83 – Add skill-quality-analyzer and skill-security-analyzer
- **功能**：两个元技能——前者从结构、文档、示例质量等维度评估 skill；后者检查安全隐患（如敏感信息泄露、命令注入）。
- **热点**：社区认可“skill 的 skill”具备生态价值，但对评分权重与扫描深度提出了多种改进建议。
- **状态**：🟡 Open  
  [https://github.com/anthropics/skills/pull/83](https://github.com/anthropics/skills/pull/83)

### #1367 – feat(skills): add self-audit (机械验证 + 四维推理质量门)
- **功能**：在输出交付前先进行文件级验证，再按损害严重性顺序执行四维推理审计（逻辑、安全、合规、可用性），通用且可扩展。
- **热点**：讨论集中在该技能是否应成为默认交付流水线、四维排序合理性以及与其他审计工具的冲突。
- **状态**：🟡 Open  
  [https://github.com/anthropics/skills/pull/1367](https://github.com/anthropics/skills/pull/1367)

### #723 – feat: add testing-patterns skill
- **功能**：覆盖测试全栈：测试哲学（Testing Trophy）、单元测试（AAA 模式）、React 组件测试（Testing Library）、命名约定、边界用例等。
- **热点**：社区希望该 skill 能同时支持多种测试框架，并讨论如何避免过度泛化。
- **状态**：🟡 Open  
  [https://github.com/anthropics/skills/pull/723](https://github.com/anthropics/skills/pull/723)

### #1302 – Add color-expert skill
- **功能**：自包含的颜色专业知识技能，涵盖 ISCC-NBS、Munsell、XKCD、RAL、Ridgway 等命名系统，以及色彩空间选用指导（OKLCH、OKLAB、CAM16 等）。
- **热点**：社区对色彩空间的广度和准确度评价积极，同时提出与前端技能联动生成调色板的需求。
- **状态**：🟡 Open  
  [https://github.com/anthropics/skills/pull/1302](https://github.com/anthropics/skills/pull/1302)

> 注：以上 PR 均处于 Open 状态，个别已标记为“合并中”（如 #514 仍有活跃 review），但官方尚未批量合入。

---

## 2. 社区需求趋势

从 50 条 Issue 热点（评论排序）中可识别以下关键方向：

### 📦 组织级 Skill 共享与分发（#228、#492、#189）
- 社区强烈要求内建**组织内部直接分享**功能，而非手动传递 `.skill` 文件。  
- 同时担忧第三方 skill 在 `anthropic/` 命名空间下**冒充官方**，造成信任边界滥用（#492）。  
- 重复安装问题（#189）也亟待解决。

### 🔧 Skill-Creator 工具链稳定性（#556、#1169、#1061、#202）
- `run_eval.py` 的 **0% 触发率** BUG 被反复确认（#556、#1169），直接使优化循环失效。  
- Windows 兼容性仍是重灾区：子进程启动、cp1252 编码、管道 select 等 Unix-first 假设（#1061）。  
- 社区期望 skill-creator 自身能遵循最佳实践（#202），而非一份“教材文献”。

### 🏢 企业级集成需求（#1175、#29）
- **SharePoint Online** 权限控制与安全扫描（#1175）——用户希望直接在 skill 中写入访问逻辑，但担心上下文窗口和安全泄漏。  
- 与 **AWS Bedrock** 的兼容性问题（#29）——企业用户在托管环境无法直接使用官方 skill。

### 🧠 新兴 Skill 方向（#1329、#412、#1385、#1362）
- **紧凑记忆表示**（#1329）：以符号化笔记压缩上下文，适合长期运行代理。  
- **AI 代理治理**（#412）：政策执行、威胁检测、信任评分与审计链条。  
- **推理质量门流水线**（#1385）：预任务校准→对抗审核→交付验证，与 #1367 呼应。  
- **Web 构建缺陷**（#1362）：`web-artifacts-builder` 在 pnpm ≥10.1 上的兼容性。

### 🔌 与 MCP 协议互操作（#16）
- 将 Skills 暴露为 **Model Context Protocol (MCP)** 工具，以统一方式封装任意软件 API。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、实现完整，且多是新增技能，有望近期落地：

| PR | Skill 名称 | 核心价值 | 预计合并优先级 |
|---|---|---|---|
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | 修复 AI 文档排版缺陷，用户需求直接 | ⭐⭐⭐⭐⭐ |
| [#486](https://github.com/anthropics/skills/pull/486) | ODT (OpenDocument) | 补全办公格式支持，面向开源/ISO 标准社区 | ⭐⭐⭐⭐ |
| [#723](https://github.com/anthropics/skills/pull/723) | testing-patterns | 全栈测试方法论覆盖，可复用性高 | ⭐⭐⭐⭐ |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit | 输出前质量门，通用性强，与 #1385 互补 | ⭐⭐⭐⭐ |
| [#1302](https://github.com/anthropics/skills/pull/1302) | color-expert | 色彩专业深度高，可被其他技能引用 | ⭐⭐⭐ |
| [#83](https://github.com/anthropics/skills/pull/83) | skill-quality-analyzer + skill-security-analyzer | 元技能推动生态质量建设 | ⭐⭐⭐ |
| [#210](https://github.com/anthropics/skills/pull/210) | frontend-design（改进版） | 提升已有技能可执行性，影响面广 | ⭐⭐⭐ |
| [#181](https://github.com/anthropics/skills/pull/181) | SAP-RPT-1-OSS predictor | 企业数据预测，垂直领域专用 | ⭐⭐ |

> 注意：当前所有 PR 在数据集中均标记为 Open，但部分已进入最后的 review 阶段。一旦基础工具链（#1298、#1323 等）修复合入，这些新技能将更快落地。

---

## 4. Skills 生态洞察

**当前社区最集中的诉求是：修复 skill-creator 评估与触发检测的根本性缺陷、解决 Windows 平台兼容障碍，并在此基础上建立安全的组织级共享机制——核心工具链的可靠性正在制约整个生态的扩展速度。**  

在此之上，社区正积极贡献文档排版、办公格式、测试模式、颜色专家、质量审计等专业领域 skill，展现出从“能用”到“好用”的跃迁期望。

---

好的，这是 2026-07-13 的 Claude Code 社区动态日报。

---

# Claude Code 社区动态日报 | 2026-07-13

## 今日速览
今日社区高度活跃，核心矛盾集中在三个方面：**一是安全策略（AUP）的严重误报问题**，大量用户报告在正常开发场景（交易算法、远程管理、游戏 Mod、宠物食品分析）下被模型无故中断或降级，引发了对模型行为一致性的信任危机；**二是 VSCode 扩展的权限系统存在严重缺陷**，`bypassPermissions` 模式在扩展中完全失效，企业级安全策略形同虚设；**三是 Windows 平台持续出现回归性 Bug**，Cowork 沙箱崩溃和安装程序迁移问题让 Windows 用户的使用体验大打折扣。

## 版本发布
过去 24 小时内无新版本发布。

---

## 社区热点 Issues

### 1. [#15921] VSCode 扩展：本地权限配置 `bypassPermissions` 完全失效
- **链接**: https://github.com/anthropics/claude-code/issues/15921
- **热度**: 28 评论 / 28 👍
- **核心价值**: **核心功能严重缺陷。** 用户发现 VSCode 扩展在开启 `bypassPermissions` 模式后，`.claude/settings.local.json` 中的权限策略依然被无视。社区普遍认为该 Bug 彻底破坏了 VSCode 扩展的安全模型，是企业级用户在受控环境中使用该扩展的 **“一票否决”级障碍**。

### 2. [#67609] Fable-5 模型的 Advisor 工具在 100K Token 处崩溃
- **链接**: https://github.com/anthropics/claude-code/issues/67609
- **热度**: 20 评论 / 38 👍
- **核心价值**: **旗舰模型“跛脚”。** 当对话略超过约 10 万 Token 时，服务端返回 `unavailable`。这意味着对大型代码库进行长时间的多轮分析和重构变为不可能。用户质疑这一限制是否属于产品化前的技术 debt，要求 Anthropic 大幅提升上下文处理上限。

### 3. [#64654] GitHub MCP 插件因 JSON-RPC 缺少版本标签全面报错
- **链接**: https://github.com/anthropics/claude-code/issues/64654
- **热度**: 16 评论 / 41 👍
- **核心价值**: **MCP 生态基础不牢。** 官方插件返回 HTTP 400，原因是序列化时缺少 JSON-RPC 版本标记。社区担忧这是测试覆盖不足的体现，若连第一方插件都无法稳定运行，第三方 MCP 插件的可靠性将更加堪忧。

### 4. [#43113] [功能请求] 新增标志位以移除 Markdown 文本的硬换行
- **链接**: https://github.com/anthropics/claude-code/issues/43113
- **热度**: 10 评论 / 51 👍 （本期最高赞）
- **核心价值**: **最受期待的体验改进。** 用户强烈要求 Claude Code 不再在单词边界插入硬换行符，让终端模拟器自行软换行。该 Issue 存在数月，高票反映用户对阅读代码和老式分页体验的厌倦。

### 5. [#57132] `~/.claude/` 目录下的允许规则在运行时被静默忽略
- **链接**: https://github.com/anthropics/claude-code/issues/57132
- **热度**: 9 评论
- **核心价值**: **安全规则的“幽灵”状态。** 用户配置的允许规则显示在 `/permissions` 列表中，但在实际编辑 `~/.claude/` 下的文件时完全不起作用。这是一个严重的逻辑漏洞，导致用户对权限系统失去信任。

### 6. [#52477] 模型覆盖用户记忆中的代词，表现出默认性别偏见
- **链接**: https://github.com/anthropics/claude-code/issues/52477
- **热度**: 8 评论
- **核心价值**: **AI 安全的伦理问题。** 用户已通过 Memory 功能明确指定代词，模型仍强行默认使用男性代词。该问题与当日大量的 AUP 误报（如被归类为生物危害）共同构成了 “模型安全行为失控”的广泛担忧。

### 7. [#76094] [回归] Windows 下 Cowork 沙箱 SDK 安装时崩溃（HTTP 连接强制断开）
- **链接**: https://github.com/anthropics/claude-code/issues/76094
- **热度**: 5 评论
- **核心价值**: **最新回归 Bug。** SDK 从 2.1.181 升级到 2.1.202 后引入，Windows 的 Cowork 模式在 `sdk_install` 阶段 Guest 直接崩溃。此问题对正在使用协作模式的团队极具破坏性。

### 8. [#76743] Windows 点击激活窗口时“点击穿透”到权限对话框
- **链接**: https://github.com/anthropics/claude-code/issues/76743
- **热度**: 4 评论
- **核心价值**: **潜在的点击劫持安全风险。** 当权限弹窗待处理且窗口无焦点时，用户的首次点击（旨在获取焦点）会直接穿透到对话框按钮，导致误提交。这是一个经典的 UX 安全缺陷。

### 9. [#77006] 因分析宠物食品成分，模型从 Fable 5 被强行降级到 Opus 4.8
- **链接**: https://github.com/anthropics/claude-code/issues/77006
- **热度**: 1 评论
- **核心价值**: **AUP 误报的“经典样本”。** 用户在分析宠物食品添加剂时触发安全策略，模型被自动降级。该 Issue 虽短，但生动刻画了当前安全分类器极度敏感且缺乏解释机制的现状，完美代表了今日的社区情绪。

### 10. [#58812] Agents 视图中按目录分组功能失效
- **链接**: https://github.com/anthropics/claude-code/issues/58812
- **热度**: 3 评论 / 4 👍
- **核心价值**: **Agent 模式基础导航 Bug。** 用户无法按工作目录区分不同 Session，所有 Agent Session 混乱地堆叠在一起，严重影响了 Agent 模式的核心可用性。

---

## 重要 PR 进展
（过去 24 小时内共 3 个，已全部列出）

### 1. [#76986] 修复自动关闭重复 Issue 时错误覆盖标签
- **链接**: https://github.com/anthropics/claude-code/pull/76986
- **分析**: 仓库维护工具修复。原先的脚本在关闭重复 Issue 时会用 `duplicate` 标签替换原 Issue 的所有标签，导致维护信息丢失。PR 修复了此逻辑，改为仅追加标签，提升了 Issue 管理质量。

### 2. [#76985] 修复 `validate-agent.sh` 脚本无法解析多行描述
- **链接**: https://github.com/anthropics/claude-code/pull/76985
- **分析**: 插件开发工具链修复。原脚本使用 `grep` 截取 Agent Frontmatter 的 `description`，只能读取第一行。该 PR 修正为可正确解析多行描述，对插件/Agent 开发者至关重要。

### 3. [#15165] 更新 README.md 中的文档链接
- **链接**: https://github.com/anthropics/claude-code/pull/15165
- **分析**: 文档清理。修复了README中的死链，确保新用户能准确跳转到官方文档。此项已合并关闭。

---

## 功能需求趋势

### 1. VSCode 扩展功能补全（迫切等级：高）
- 社区不满意 VSCode 扩展作为“二等公民”。权限模型崩溃（#15921）、缺乏模型信息栏（#77003）、以及 RTL 文本渲染问题（#75196），反映出用户期望扩展与桌面端获得同等的产品力投入。

### 2. 内容安全策略的透明度与控制力（迫切等级：极高）
- 大量的 AUP 误报（从宠物食品到 Minecraft 模组）证明当前的安全分类器过于粗糙。用户急需：具体的中断理由、可申诉的机制、以及对特定行业（如金融、IT 管理、游戏开发）的豁免白名单。

### 3. 协作（Cowork）与 Agent 模式的稳定性（迫切等级：高）
- 随着 Cowork 和 Agent 模式成为营销重点，对应的 Bug 诉求显著增加。Windows 崩溃（#76094）、Session 分组失效（#58812）、自动关闭（#58215）等严重影响了高级功能的采用。

### 4. 自托管与插件生态的健壮性（迫切等级：中）
- #64654 揭示了 MCP 协议处理层的脆弱性。社区期待一个更健壮的插件运行沙箱，以及对标准协议更严格的单元测试，以保障生态系统的健康发展。

---

## 开发者关注点

### 1. 模型行为一致性危机（AUP 误报）
这是今日绝对的中心话题。从 #52477 的性别偏见，到 #65873 的交易开发，再到 #77006 的宠物食品，用户 **无法预测** 何时会触发安全警告。这种随机性严重破坏了 AI 开发助手的核心价值——信任。社区情绪倾向于认为近期的安全更新引入了过于宽泛的误报规则。

### 2. Windows 平台支持成熟度不足
Windows 用户在本期日志中占据了大量 Bug 报告。PowerShell 工具的问题（#59833）、Cowork 的致命崩溃（#76094）、安装迁移问题（#76980）、以及点击穿透问题（#76743），让 Windows 平台表现得更像是一个“Beta 版本”，与 macOS/Linux 的稳定性形成鲜明对比。

### 3. VSCode 扩展稳定性优先级存疑
权限 Bug（#15921）作为一个跨了半年的、触及其他安全核心的问题，至今仍为 Open 状态，这向市场放出了一个信号：“桌面端优先”。如果 Anthropic 希望 VSCode 扩展成为主流入口，必须加速解决这些基础功能缺陷。

### 4. 成本与上下文管理的用户困惑
多个 Issue（#67609, #63817, #65818）显示用户对“1M 上下文”强制收费点感到困惑，尤其是在明明配置了 Medium 或标准模型时，却被要求升级。成本提示的逻辑需要更高的透明度和用户控制权。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

好的，这是今日的 OpenAI Codex 社区动态日报。

---

# OpenAI Codex 社区动态日报 | 2026-07-13

## 今日速览

过去 24 小时内，OpenAI Codex 仓库未发布新版本，但社区讨论激烈。**新模型架构（GPT-5.6 Sol / MultiAgent V2）强制覆盖用户配置并剥夺子智能体选择权**成为最核心的争议点，三条相关 Issue 均引发热议。**稳定性方面**，Windows 平台的远程连接、卡顿与崩溃依旧是重灾区，同时 macOS 用户也遇到了合并版 App 检测异常的新问题。此外，`wait` 工具的高额 Token 消耗和技能生态的脆弱性引发了开发者对底层工具链成熟度的担忧。

## 社区热点 Issues

以下根据评论数、点赞数和影响范围，挑选了 10 条最值得关注的 Issue：

**1. GPT-5.6 Sol 强制子智能体模型配置（社区最火）**
- **#31814**：GPT-5.6 Sol 通过模型元数据强制启动 MultiAgent V2，并默认隐藏子智能体配置。用户发现即使手动指定了子模型，Sol 也会强制所有子智能体为自身实例，导致无法灵活控制 Agent 成本与行为。
- **社区反应**：获得了 **121 个赞** 和 **56 条评论**，开发者普遍认为这是 OpenAI 强推新模型但剥夺用户控制权的代表性问题，讨论热度极高。
- **链接**：https://github.com/openai/codex/issues/31814

**2. App 频繁 WebSocket 断线重连循环**
- **#18960**：用户在 macOS 上遭遇流式传输失败导致的无限重连循环（Reconnect Loop），严重影响正常编码工作。
- **社区反应**：51 条评论，属于经典顽固 Bug，虽已持续数月，但版本迭代后仍有大量用户受此影响。
- **链接**：https://github.com/openai/codex/issues/18960

**3. Windows 11 高配机器依旧卡顿/冻结**
- **#20214**：用户报告在 Windows 11 Pro（AMD Ryzen 5 5600，32GB RAM）上，Codex App 依然频繁卡顿和冻结。
- **社区反应**：34 条评论，48 个赞，是 Windows 端最集中的反馈之一，反映其性能优化与原生体验仍有巨大缺口。
- **链接**：https://github.com/openai/codex/issues/20214

**4. CLI 中 MultiAgent V2 强制启用，无视用户禁用**
- **#31097**：在 CLI 中，GPT-5.5 无视用户在配置文件中的 `disable` 指令，强制启用 MultiAgent V2，并且隐藏了自定义 Agent 的控制项。
- **社区反应**：与 #31814 形成联动，用户担心 OpenAI 正系统性地剥夺用户对 Agent 行为的底层控制。
- **链接**：https://github.com/openai/codex/issues/31097

**5. VS Code 插件 Shift+Tab 切换 Plan Mode 快捷键回归**
- **#32147**：最新版 VS Code 扩展更新后，`Shift+Tab` 快捷键失效，无法正常切换 Plan Mode，直接打乱了用户的操作肌肉记忆。
- **社区反应**：6 条评论，6 个赞，IDE 集成插件的热更新引入回归 Bug 让开发者非常敏感。
- **链接**：https://github.com/openai/codex/issues/32147

**6. 内置技能因 CDN 重定向导致校验失败**
- **#31984**：Codex 内置的 `fetch-codex-manual.mjs` 技能脚本因官方文档 CDN 重定向（跳转到 learn.chatgpt.com）而丢失了 `x-content-sha256` 头，导致哈希校验失败，技能无法拉取最新文档。
- **社区反应**：5 条评论，13 个赞。暴露了技能分发系统对外部 CDN 配置变更的高度脆弱性。
- **链接**：https://github.com/openai/codex/issues/31984

**7. `wait` 工具被限制约 50 秒上限，导致 Massive Token 浪费**
- **#32640**：内置的 `wait` 工具有 50 秒硬上限。在启用了 MultiAgent V2 的环境中，Agent 每隔 50 秒就会被唤醒上下文重采样，导致长等待任务产生巨大的 Token 燃烧。
- **社区反应**：最新上报的 Issue，开发者认为这是 MultiAgent 架构下的严重设计缺陷，直接反映在实际账单上。
- **链接**：https://github.com/openai/codex/issues/32640

**8. Windows 远程控制永久卡死无法恢复**
- **#31973**：Windows 版 Codex 桌面端在与 ChatGPT 手机 App 配对建立远程控制后，一旦断网或遇到异常，界面会永久卡在 “Reconnecting...” 状态，没有超时机制和恢复途径。
- **社区反应**：严重阻碍 Windows 用户利用 Remote Control 功能，且无手动恢复手段。
- **链接**：https://github.com/openai/codex/issues/31973

**9. macOS 上 `codex app` 创建重复应用**
- **#31944**：自 7 月 9 日 Codex 桌面版合并入统一的 ChatGPT.app 后，`codex app` 指令未能正确检测已安装的 ChatGPT.app，反而重新下载并创建了一个重复的 `Codex.app`，造成混乱。
- **社区反应**：7 个赞，4 条评论。这是合并后的重要残留问题，直接影响 macOS 用户的开箱体验。
- **链接**：https://github.com/openai/codex/issues/31944

**10. 缺失工具调用结果导致 Windows 桌面应用崩溃**
- **#32653**：最新的 Windows 更新（26.707.6957.0）中，当 MCP 工具调用结果丢失时，整个 Codex 桌面应用直接崩溃，没有降级或异常提示。
- **社区反应**：严重的稳定性问题，在复杂的多工具代理流程中极易触发。
- **链接**：https://github.com/openai/codex/issues/32653

---

## 重要 Pull Request 进展

过去 24 小时共有 3 个 PR 处于活跃状态：

**1. [已合并] 修复 PAT 认证下的 Host Token 注入安全漏洞**
- **#29898**：拒绝在已激活 PAT（Personal Access Token）认证时，通过 `chatgptAuthTokens` 进行 Host Token 注入。增加了端到端回归测试，并记录了认证过渡限制。这是一项关键的安全强化措施。
- **作者**：@cooper-oai
- **链接**：https://github.com/openai/codex/pull/29898

**2. [开放中] TUI 核心交互优化：历史 Prompt 编辑支持会话分支**
- **#30504**：为 TUI（终端界面）引入新机制，编辑之前发送的 Prompt 时不再进行破坏性的 `thread/rollback`，而是通过创建会话分支（Session Fork）来实现。这对于希望修正早期代码方向而不丢失当前上下文的开发者来说是一大福音。
- **作者**：@fcoury-oai
- **链接**：https://github.com/openai/codex/pull/30504

**3. [已合并] 改进 Composer 补全目标解析**
- **#32628**：一个由机器人提交的修复，改进了 Composer 中 `@` 和 `$` 补全目标的解析逻辑。现在它能更准确地识别光标两边的原子文本元素和换行符，并在文件、技能和插件等候选目标中优先选择最近的可用项。
- **作者**：@copyberry[bot]
- **链接**：https://github.com/openai/codex/pull/32628

---

## 功能需求趋势

通过对近期众多 Issues 的提炼，社区对 Codex 的功能诉求正朝着更精细化的方向发展：

1. **代理行为细粒度控制：** 社区强烈要求增加对子智能体（Subagent）的显式模型选择支持，反对当前的“静默继承”或强制覆盖行为。
2. **自动化精细化：** 除了常规的 CRON 调度，社区开始要求更高级的自动化工单管理功能，例如：将自动执行结果定向到指定线程（#29184）、支持手动触发自动执行（#28064）、以及增强的心跳/清理机制。
3. **配置管理深度创新：** 开发者已不满足于简单的全局配置，要求引入本地覆盖层（如 `AGENTS.local.md`，#28739）和 `@` 引用扩展，以实现更灵活的团队协作和开发环境切换。
4. **IDE 集成稳定性优先：** 插件的任何快捷键回归或热更新异常都会立刻引起轩然大波，说明用户对插件稳定性要求极高，功能开发必须在保证零回归的前提下进行。

---

## 开发者关注点

当前开发者社区的反馈中反映出以下几个高频痛点：

1. **模型选择自主权受挑战：** 用户对 OpenAI 通过“元数据”或后端逻辑强推特定 Agent 架构（Sol/MultiAgent V2）且无视用户手动设置的做法表达了强烈不满，担心架构“黑盒化”。
2. **Windows 平台稳定性是最大短板：** 从应用卡顿（#20214）、安装失败（#32492）、Remote Control 卡死（#31973）到应用崩溃（#32653），Windows 用户贡献了最高比例的阻塞性问题，体验远逊于 macOS。
3. **远程协作与 SSH 功能不可靠：** SSH 远程会话同步异常（#27284）、Remote Control 配对失败（#31387）和不稳定（#31973）严重影响了远程办公者的效率。
4. **工具链成熟度不足导致的隐性成本攀升：** `wait` 工具的 50 秒上限引发的 Token 浪费（#32640），以及技能系统因 CDN 小范围调整即告崩溃（#31984），表明底层工具链仍需打磨以降低开发者意外成本。
5. **验证与安全反馈不佳：** 多起认证询问陌生号码（#32657）以及 Norton 360 误报（#32331）的报告，反映出安全验证流程和安装包签名认证仍有让用户困惑或不适的地方。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## 今日速览

过去 24 小时内，Gemini CLI 仓库未发布新版本，但合并了多项关键修复和批量依赖更新。社区方面，一个严重的 **Token 耗尽循环 Bug**（#28362）被紧急报告，同时 **子代理在达到最大轮次后误报成功**（#22323）等问题持续引发讨论。基础设施侧，**组件级评估**（#24353）与 **AST 感知代码库映射**（#22745）两大 EPIC 稳步推进。

---

## 社区热点 Issues（10 条）

### 1. #22323 — 子代理达到 `MAX_TURNS` 后误报为 GOAL 成功
- **标签**：`bug` `priority/p1` `area/agent`
- **重要性**：`codebase_investigator` 子代理在达到最大轮次限制后仍将状态报告为 `success`，终止原因为 `GOAL`，掩盖了任务实际被中断的事实。这会误导用户对任务完成情况的判断，且可能干扰自动化评估。
- **社区反应**：10 条评论，用户指出了日志中的不一致之处。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22323)

### 2. #21409 — 通用代理（Generalist agent）挂起
- **标签**：`bug` `priority/p1` `area/agent`
- **重要性**：用户反馈代理在将任务委托给通用子代理后会“永远挂起”，即使执行简单的文件夹创建也如此，只能通过禁止使用子代理来绕过。这严重影响了日常使用。
- **社区反应**：7 条评论，收获了 8 个 👍，反映该问题影响广泛。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21409)

### 3. #28362 — Token 耗尽循环
- **标签**：`bug` `priority/p1` `status/manual-triage`
- **重要性**：12 日新提交的严重 Bug。代理陷入了 token 消耗循环，且因为缺少 `template.py` 文件反复报错。此问题可能导致 API 费用飙升或 CLI 完全不可用。
- **社区反应**：尚在人工分类阶段，但有 2 条初步评论。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/28362)

### 4. #24353 — 稳健的组件级评估
- **标签**：`customer-issue` `priority/p1` `area/agent`（EPIC）
- **重要性**：该 EPIC 是在 #15300 引入的“行为评估”测试基础之上继续推进。目前已生成 76 个测试并覆盖 6 个 Gemini 模型，目标是构建一套可重复、可对比的组件级自动化评估体系，是保证代理质量的关键基础设施。
- **社区反应**：7 条评论，团队内部在讨论评估框架设计。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/24353)

### 5. #22745 — 评估 AST 感知的文件读取、搜索和映射
- **标签**：`feature` `customer-issue` `priority/p2` `area/agent`（EPIC）
- **重要性**：探索将 AST（抽象语法树）引入文件读取和代码库映射的收益。若能精确读取方法体、减少token消耗并提升导航准确性，将为代码理解子代理带来质的提升。
- **社区反应**：7 条评论，讨论了 tilth、glyph 等候选工具。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22745)

### 6. #21968 — Gemini 不主动使用自定义技能和子代理
- **标签**：`bug` `priority/p2` `area/agent`
- **重要性**：用户注意到即使定义了 Gradle、Git 等技能并给出了明确描述，Gemini 仍几乎不会主动调用它们，除非明确指示。这削弱了技能系统的价值。
- **社区反应**：6 条评论，开发者期望提高模型对可用技能的自主利用率。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21968)

### 7. #25166 — Shell 命令执行完毕后卡在“等待输入”
- **标签**：`bug` `priority/p1` `area/core`
- **重要性**：在极简的命令执行后，CLI 仍然显示命令“激活中”并显示“等待用户输入”，导致交互被锁定。该问题高频出现，破坏开发流。
- **社区反应**：4 条评论，3 个 👍，多名用户证实可复现。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/25166)

### 8. #22267 — 浏览器代理忽略 `settings.json` 中的 `maxTurns` 等配置
- **标签**：`bug` `priority/p2` `area/agent`
- **重要性**：`AgentRegistry` 虽然能正确读取并合并设置，但浏览器代理在初始化时并未应用这些覆盖值，导致用户无法通过全局或项目配置控制代理行为。
- **社区反应**：3 条评论，用户提供了详细的配置复现步骤。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22267)

### 9. #22672 — 代理应阻止或劝阻破坏性行为
- **标签**：`customer-issue` `priority/p2` `area/agent`
- **重要性**：模型在处理复杂 Git 操作或数据库维护时，倾向于使用 `git reset --force` 等危险命令，缺乏安全感知。社区期望代理能理解破坏性操作的后果并主动推荐更安全的替代方案。
- **社区反应**：3 条评论，1 个 👍，属于对代理安全性的核心诉求。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22672)

### 10. #26522 — 自动记忆系统应停止对低信号会话的无限重试
- **标签**：`bug` `priority/p2` `area/agent`
- **重要性**：当背景提取代理认为某个会话“信号低”而决定不读取时，该会话在索引中仍标记为未处理，导致被反复提起，形成死循环。这会造成不必要的 token 消耗和资源浪费。
- **社区反应**：5 条评论，团队正在讨论如何引入重试上限或隔离机制。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26522)

---

## 重要 PR 进展（10 条）

### 1. #28369 — 新增本地评估报告命令与开发者文档
- **功能**：添加 `npm run eval:report` 命令，可从 Vitest 的 `report.json` 汇总通过率并按模型映射回清单策略，同时支持重复测试场景。附带开发者指南，降低行为评估的入门门槛。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28369)

### 2. #28368 — 升级 Vitest 以修复关键 CVE-2026-47429
- **修复**：将 Vitest 从 3.2.4 升级至 4.1.0（同时保留 3.2.6 兼容），解决 Trivy 扫描出的**严重**级别漏洞。测试框架的安全性得到增强。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28368)

### 3. #28367 — 升级 `shell-quote` 以修复关键 CVE-2026-9277
- **修复**：将 `shell-quote` 从 1.8.3 升级至 1.8.4，修复另一个被评定为“可能可利用”的严重漏洞。对依赖 shell 解析的模块至关重要。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28367)

### 4. #28366 — 整理 `gemini-cli` 实现细节
- **修复/整理**：基于 #28340 报告的异常行为做小范围打补丁，清理实现细节，提升代码可维护性。标记为 `priority/p1` `area/core`。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28366)

### 5. #28365 — 限定 `tools.core` 通配符拒绝规则仅作用于内置工具
- **修复**：修复了重大配置 Bug——当用户设置 `tools.core` 为任何值（包括 `[]`）时，会因为通配符 DENY 规则而静默禁用所有 MCP 工具，无论其信任设置如何。新增 `builtinOnly` 字段确保 MCP 工具不受影响，是信任策略的关键修正。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28365)

### 6. #28364 — 深度合并用户模型配置与默认配置
- **修复**：`Config` 构造器原来使用浅展开 + `?? DEFAULT` 方式合并 `modelConfigServiceConfig`，导致深层嵌套的 `generateContentConfig` 等字段被覆盖。改为深度合并，确保用户自定义参数正确生效。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28364)

### 7. #28363 — 防止 `AbortSignal` 监听器泄漏（`ShellExecutionService`）
- **修复**：确保进程自然结束后显式移除 `AbortSignal` 的事件监听器，防止长时间 CLI 会话中出现内存泄漏。关联修复 #28280。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28363)

### 8. #28377 — 批量更新 npm 依赖（74 个更新）
- **依赖**：Dependabot 发起的组更新，一次性升级 74 个 npm 包。包含多项间接依赖的安全补丁和特性更新，是常规依赖维护的重要批次。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28377)

### 9. #28379 — 升级 `chrome-devtools-mcp` 从 0.19.0 到 1.5.0
- **依赖**：浏览器调试协议 MCP 集成库从 0.19 跳升到 1.5.0，包含大量功能和协议更新。对浏览器子代理的稳定性和能力有重要影响。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28379)

### 10. #28378 — 升级 `@agentclientprotocol/sdk` 从 0.16.1 到 1.1.0
- **依赖**：Agent Client Protocol 官方 SDK 跨过 1.0 大版本，从 0.16.1 升级到 1.1.0。该 SDK 是 CLI 与 MCP 服务通信的基础，此次更新带来更稳定的 API 和错误处理。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/28378)

---

## 功能需求趋势

分析近期活跃的 Issues，社区最关注的功能方向集中在以下五个领域：

1. **子代理（Subagent）自主性与可控性**  
   用户希望子代理能更主动地使用自定义技能，同时能严格遵守 `settings.json` 的配置（如 `maxTurns`、禁用列表）。对于子代理的轨迹可见性（如 `/chat share`）也有强烈呼声。

2. **代码理解与映射的深度改进**  
   AST 感知工具成为热门探索方向，社区期望通过精确的方法体读取和导航减少 Token 消耗，提升 `codebase_investigator` 等代理的效率。这是 CLI 从“执行命令”向“理解代码”进化的关键能力。

3. **自动化评估与质量保证（Eval）**  
   从单一问题发展为完整的组件级评估体系（E2E、BE、Eval infra），社区需要一套标准化的可复现评估流程来度量不同模型和提示词变更的影响。`npm run eval:report` PR 正是对此需求的直接响应。

4. **自动记忆（Auto Memory）系统安全与防浪费**  
   记忆系统目前存在低信号会话无限重试、敏感信息在二次确认前已被提交到模型上下文、无效 patch 静默跳过等问题。社区期望引入确定性摘要、重试上限和更严格的日志/隔离策略。

5. **核心交互稳定性与安全性**  
   Shell 命令卡死、Token 耗尽循环、终端 Resize 闪烁、`\n` 转义错误等问题频繁干扰日常使用。同时，社区对代理可能执行破坏性命令（如 `git reset --force`）越来越警惕，要求内置安全护栏。

---

## 开发者关注点

- **挂起与死循环**：通用代理挂起（#21409）、Shell 执行后假死（#25166）以及新报告的 Token 循环（#28362）是高优先级痛点，直接影响开发者对 CLI 的信任。
- **配置不生效**：浏览器代理忽略 `settings.json`（#22267）和子代理在 `disabled` 状态下仍被调用（#22093）说明配置系统的优先级与传递机制需要梳理。
- **资源浪费与噪音**：自动记忆对低信号内容反复重试（#26522）、模型在随机位置生成临时脚本（#23571）导致 workspace 混乱，增加清理成本。
- **安全与意外操作**：代理主动使用危险命令（#22672）、技能不被自动利用（#21968）反映了模型在工具选择和风险评估上的局限性。
- **透明度和调试难**：子代理的轨迹和 Bug Report 无法包含子会话详情（#22598、#21763），增加了评估和复现异常的难度，社区呼吁更完善的日志导出和共享功能。

---

*数据采集截止 2026-07-13 12:00 UTC，来源：GitHub `google-gemini/gemini-cli`。*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报 | 2026-07-13

## 📌 今日速览
- **版本更新**：DeepSeek Reasonix 正式发布 v1.17.11（CLI + Desktop），重点修复了桌面端 MCP 图片内容丢失、登录重置定向漏洞等关键问题。
- **社区热度攀升**：过去 24 小时内新增 / 更新了 30 条 Issue 和 33 个 PR，其中 AutoResearch 自触发循环（#6122）、Agent 计划模式无法推出（#5419）等严重 bug 仍在持续发酵。
- **功能需求爆发**：社区集中提出权限会话级控制、后台任务通知、SSH 远程支持以及自定义工具链等增强需求，反映出用户对 Agent 自主化与精细化管控的强烈期望。

---

## 🚀 版本发布
### Reasonix CLI v1.17.11
- **Changelog 亮点**：
  - 修复桌面端 readiness 暂停提示不清晰的问题（#6373 合并）
  - 修复“创作”主题下右侧面板打开时可能遮挡新建对话入口的缺陷
- **GitHub**: https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v1.17.11

### Reasonix Desktop v1.17.11
- **主要修复**：
  - 将 MCP 图片内容正确纳入工具结果（PR #6227，感谢 @ttmouse）
  - 安全增强：按解析后 origin 校验登录跳转，修复开放重定向漏洞（PR #6373，作者 @SivanCola）
- **GitHub**: https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.17.11

---

## 🔥 社区热点 Issues（10 条）
1. **#6122 AutoResearch 自触发循环（Self‑triggering Loop）**  
   - **重要性**：核心 Agent 流程在任务完成后反复重新投递 `<active‑goal>`，导致无限循环，严重影响自动任务稳定性。  
   - **社区反应**：3 条评论，1 个 👍，仍为 Open 状态。用户已提供详细触发链路推测。  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/6122

2. **#5419 桌面版无法退出计划模式 Agent 进入请求循环**  
   - **重要性**：手动关闭计划模式后 Agent 仍无限重复请求关闭指令，等同于拒绝用户指示，根本性破坏 Agent 控制能力。  
   - **社区反应**：1 条评论，仍 Open。受害者附有截图确认问题。  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/5419

3. **#6354 不能做到真正无人值守（超时后不会自动重连）**  
   - **重要性**：当网络超时后 AI 直接挂起，不会自动重试，无法满足 7×24 自动运行场景。  
   - **社区反应**：1 条评论，0 👍，但直击大量自动化用户的痛点。  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/6354

4. **#6381 手动压缩上下文**  
   - **重要性**：Agent 在长对话中积累大量无关上下文，用户希望手动触发压缩以减少 Token 浪费并提升响应质量。  
   - **社区反应**：1 条评论，推荐提升。提案简单但实用，社区关注度高。  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/6381

5. **#6359 新建会话时 TurnActions 按钮大量重复渲染**  
   - **重要性**：界面完全不可用，属于高优先级 UI Bug，直接影响新建会话流程。  
   - **社区反应**：0 条评论（刚创建），但问题截图明显，预计会快速解决。  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/6359

6. **#4664 bwrap 沙箱未映射 GPU 设备（/dev/dri、/dev/kfd）**  
   - **重要性**：沙箱隔离安全但阻碍了 GPU 训练 / Benchmark 场景，暴露了安全与可用性之间的平衡缺口。  
   - **社区反应**：1 条评论，仍 Open。提者明确给出场景覆盖建议。  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/4664

7. **#6369 波浪号 `~` 字符渲染异常（文字被横线划过）**  
   - **重要性**：基础渲染 bug 导致数字区间显示错误，严重影响信息可读性。  
   - **社区反应**：1 条评论，0 👍。复现步骤清晰，属于样式层级问题。  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/6369

8. **#6238 引导队列中的说明在任务结束后消失**  
   - **重要性**：引导队列作为任务中插入指令的重要机制，任务完成后未正确传递到下一轮，导致工作流断裂。  
   - **社区反应**：0 条评论（刚关闭，但修复已合入 PR #6308）。社区已推动解决。  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/6238

9. **#6376 新会话标题始终显示中文“新的会话”**  
   - **重要性**：国际化缺陷，破坏非中文用户的体验，表明 i18n 覆盖不完整。  
   - **社区反应**：0 条评论，但作为多语言场景的基本问题值得关注。  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/6376

10. **#6330 “大模型能不能做下情绪管理”**  
    - **重要性**：虽是半开玩笑，但反映出用户希望 AI 在交互中保持稳定的情感语调，避免表达不满或情绪化语言。  
    - **社区反应**：3 条评论（最多之一），引发了对 AI 行为模式的讨论。  
    - **链接**: https://github.com/esengine/DeepSeek-Reasonix/issues/6330

---

## 🛠️ 重要 PR 进展（10 条）
1. **#6384 Make reasonix setup a provider manager**  
   - **内容**：将 `reasonix setup` 转化为分阶段提供商管理中枢，支持已有配置保留、增加、编辑、密钥更新、连接测试等操作。  
   - **状态**：Open，作者 @SivanCola  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6384

2. **#6382 Harden delivery‑mode review protocol, gating, and streaming liveness**  
   - **内容**：基于 16 分钟全工作流屏幕录制日志加固交付模式 review 协议，修复了协议失败循环 bug。  
   - **状态**：Closed（已合并），作者 @SivanCola  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6382

3. **#6373 Improve review recovery, stable notice localization, and readiness UX**  
   - **内容**：优化审查恢复过程，增加 `git status --short` 引导，本地化桌面通知，使 Readiness 提示持久可见且不引起警觉。  
   - **状态**：Closed（已合并），作者 @SivanCola  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6373

4. **#6308 fix(agent): preserve late‑arriving steer items across turn boundaries**  
   - **内容**：修复引导队列在回合边界静默丢弃未消费项的问题，并防止过期引导泄漏到下一轮。直接解决 Issue #6238。  
   - **状态**：Closed（已合并），作者 @JesonChou  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6308

5. **#6361 Fix duplicate rich composer input**  
   - **内容**：修复富文本输入框内容重复显示问题，通过保留浏览器原生 contentEditable 并对外部变更做精确重建，兼容中文 IME。  
   - **状态**：Closed（已合并），作者 @SivanCola  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6361

6. **#6374 Attribute performance reports via JS self‑profiling and denoise long‑task prompts**  
   - **内容**：为性能压力报告（longtask/lag/heap）添加栈归因，降低诊断噪音，减轻“崩溃报告洪峰”问题。  
   - **状态**：Closed（已合并），作者 @SivanCola  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6374

7. **#6348 fix(desktop): make inline reasoning blocks individually collapsible**  
   - **内容**：内联推理块支持独立折叠，使用 GSAP 高度动画，改善长篇推理内容的浏览体验。  
   - **状态**：Closed（已合并），作者 @JesonChou（修复 #6340）  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6348

8. **#6375 fix(desktop): add right‑click copy menu for selected transcript text**  
   - **内容**：在 Wails 壳中恢复选中文本的右键复制菜单（之前被全局默认菜单抑制）。  
   - **状态**：Closed（已合并），作者 @SivanCola  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6375

9. **#6371 Open workspace panel on launch**  
   - **内容**：桌面启动时默认展开右侧工作区面板，提升上下文、文件、改动等信息的一键可达性。  
   - **状态**：Closed（已合并），作者 @SivanCola  
   - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6371

10. **#6367 Fix diagnostics null‑array crash**  
    - **内容**：阻止诊断设置页因 Wails 将空切片序列化为 `null` 而崩溃，标准化嵌套数组边界处理。  
    - **状态**：Closed（已合并），作者 @SivanCola  
    - **链接**: https://github.com/esengine/DeepSeek-Reasonix/pull/6367

---

## 📊 功能需求趋势
过去 24 小时的 30 条 Issue 中，`enhancement` 标签占比超过 50%，社区关注方向集中：

- **Agent 自主化与容错**：无人值守自动重连、后台任务主动通知、手动上下文压缩、引导队列持久化。期望 Agent 在长时间运行中具备自愈和事件驱动能力。
- **权限精细化管理**：会话级别的路径读写执行权限、禁用特定工具功能、全局敏感路径声明。用户不再满足于“全有或全无”的授权模式。
- **自定义工具链**：允许用户注册轻量脚本（如查看压缩包、生成随机数）而不是仅依赖命令行调用，降低安全风险与操作门槛。
- **SSH 远程支持**：嵌入式开发者希望直接在 Reasonix Agent 中操作远程设备，避免切换 IDE。
- **界面个性化与 i18n**：macOS 图标尺寸比例、左侧栏可关闭、自定义换行快捷键、新会话标题国际化——Desktop 端交互细节仍在快速完善中。

---

## 🧑‍💻 开发者关注点
- **稳定性痛点**：Agent 无限循环（#6122、#5419）与无响应卡死（#6346）成为最影响信任的问题，部分用户反馈需强制结束进程。
- **性能惊吓**：多起 CPU 占用异常飙升报告（#6353、#6355），以及 TUI 模式下的 snapshot conflict 警告和页面混乱（#6370），内存/渲染效率仍存在隐患。
- **渲染遗留问题**：波浪号划线（#6369）、中英混排渲染异常（#6368）在新版本中未完全解决，TUI 输入区仍有复现。
- **权限与路径体验**：路径显示缺乏相对/绝对智能切换、没有“打开文件夹”按钮（#6378）让用户感到不便；而“一不小心让 AI 读到机密文件”的担忧触发了细粒度权限的强烈呼声。
- **中断恢复能力弱**：网络超时后不自动重试（#6354）、Provider 端 Malformed request 无有效降级（#6360），使得无人值守场景落地困难。

> 所有报告与讨论均可在 [esengine/DeepSeek-Reasonix Issues](https://github.com/esengine/DeepSeek-Reasonix/issues) 和 [Pull Requests](https://github.com/esengine/DeepSeek-Reasonix/pulls) 中追踪。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 | 2026-07-13

## 今日速览

过去 24 小时内社区围绕 **GPT-5.6 系列适配修复** 与 **V2 内核稳定性加固** 展开了密集贡献。虽然无正式版本发布，但多个高优先级修复性 PR 已提交，核心动态集中在：Copilot OAuth 鉴权 403 修复、本地 SQLite 事件表无限膨胀问题的初步治理、以及跨 Git 场景下的配置加载 Bug。同时，基础 UI 功能（复制、焦点管理、模式切换）的回溯性 Bug 仍持续引发用户不满。（共更新 50+ Issues / 50+ PR）

---

## 版本发布

昨日无面向终端用户的版本发布，仅产生了以下自动化 CI 验证构建产物：

- [pr-36567-evidence](https://github.com/anomalyco/opencode/releases/tag/pr-36567-evidence) – PR #36567 TUI 操作回归验证
- [pr-36516-evidence](https://github.com/anomalyco/opencode/releases/tag/pr-36516-evidence) – PR #36516 视觉证据资产

---

## 社区热点 Issues（精选 10 条）

**1. [#4283 复制到剪贴板失效](https://github.com/anomalyco/opencode/issues/4283)**
- 状态：OPEN | 评论 113 | 👍 105
- 摘要：选中对话文本后无法复制到剪贴板，系统环境为 OpenCode 1.0.62。此为近几个月评论量最高的 Issue，基础 UX 崩溃引发广泛共鸣。

**2. [#36140 GPT-5.6 Luna 通过 ChatGPT OAuth 返回 404](https://github.com/anomalyco/opencode/issues/36140)**
- 状态：OPEN | 评论 24 | 👍 84
- 摘要：内置 OpenAI Provider 下 `gpt-5.6-luna` 报 "Model not found"，而 `gpt-5.6` 正常。新模型兼容性出街即 Bug。

**3. [#5076 默认安全策略应更严格](https://github.com/anomalyco/opencode/issues/5076)**
- 状态：CLOSED | 评论 13 | 👍 61
- 摘要：社区长期高票提案，指出自定义安装下默认允许读写所有文件，构成严重安全隐患（类似高权限 RAT）。虽已关闭，但代表了社区对安全基线的持续关注。

**4. [#3743 特定模型陷入工具调用死循环](https://github.com/anomalyco/opencode/issues/3743)**
- 状态：OPEN | 评论 26 | 👍 12
- 摘要：Kimi K2、MiniMax 2、GLM 4.6 等特定模型会反复尝试同一工具调用，需 `/compact` 或强制停止。影响生产效率的核心顽疾。

**5. [#22132 本地 Ollama 模型挂起问题](https://github.com/anomalyco/opencode/issues/22132)**
- 状态：OPEN | 评论 15 | 👍 5
- 摘要：配置 `@ai-sdk/openai-compatible` 连接本地 Ollama 后，简单 Prompt 即可导致客户端挂起，但直接调用 HTTP API 正常。大量本地模型用户受影响。

**6. [#14273 Zen 免费模型提示超出用量（即便有余额）](https://github.com/anomalyco/opencode/issues/14273)**
- 状态：CLOSED | 评论 35
- 摘要：使用 Kimi K2.5 / MiniMax 2.5 免费模型报 "Free usage exceeded"，但 Zen 账户充有 $3 余额。Billing 判断逻辑令用户困惑。

**7. [#31972 新 UI 布局下 Plan/Build 切换失效](https://github.com/anomalyco/opencode/issues/31972)**
- 状态：OPEN | 评论 7 | 👍 6
- 摘要：启用 "New Layout and Designs" 后，核心的 Plan/Build 模式切换按钮及快捷键 `Ctrl+.` 均无响应，新功能带来功能倒退。

**8. [#32002 macOS 内核恐慌（内存泄露）](https://github.com/anomalyco/opencode/issues/32002)**
- 状态：OPEN | 评论 5
- 摘要：通过 EndpointSecurity kext 触发的 `data.kalloc.1024` 区域泄露出造成系统级内核崩溃，macOS 26.3 环境。严重的底层稳定性问题。

**9. [#33356 SQLite 事件表无限膨胀至 13GB+](https://github.com/anomalyco/opencode/issues/33356)**
- 状态：OPEN | 评论 4
- 摘要：Event-sourcing 的 `event` 表（尤其是 `message.updated.1`）无任何修剪策略，长期运行实例 DB 膨胀至 13GB，填满磁盘。核心架构隐患，已关联多个 Issue。

**10. [#36141 GPT-5.6 缺少 `max` 推理强度选项](https://github.com/anomalyco/opencode/issues/36141)**
- 状态：CLOSED | 评论 5 | 👍 8
- 摘要：对应 Codex UI 的 "Ultra" 模式未在 OpenCode 的 `reasoningEfforts` 中开放，`transform.ts` 仅到 `xhigh`。社区期待 Full Spectrum 支持。

---

## 重要 PR 进展（精选 10 条）

**1. [#36579 修复自定义 Provider 请求头被丢弃](https://github.com/anomalyco/opencode/pull/36579)**
- 作者：@jeffyuan | 状态：OPEN
- 核心修复：`prepareOptions` 构建 SDK 参数时未合并用户自定义 `model.request.headers`，导致 AgentRouter 等依赖透传 Header 的 Provider 认证失败。

**2. [#36577 修复 V2 跨 Git 边界配置加载](https://github.com/anomalyco/opencode/pull/36577)**
- 作者：@opencode-agent[bot] | 状态：CLOSED
- 核心修复：回滚错误的 #36568 V1 实现，使 V2 config 发现算法回溯到跨项目/Git 边界的祖先目录。修复 #36539。

**3. [#36574 修复 GitHub Copilot 新模型 403 错误](https://github.com/anomalyco/opencode/pull/36574)**
- 作者：@zhy-1976 | 状态：OPEN
- 核心修复：为 Copilot 补全请求添加 `Copilot-Integration-Id: vscode-chat` 头，解决 `gpt-5.6-luna/sol/terra` 在 Copilot 后端鉴权拒绝的问题。

**4. [#36576 防止终端挂载时抢占输入焦点](https://github.com/anomalyco/opencode/pull/36576)**
- 作者：@Hona | 状态：OPEN
- 核心修复：多面板环境下终端组件挂载自动抢焦点，导致用户正在输入的内容丢失焦点。仅限用户主动 Ctrl+\` 或点击 Tab 时聚焦。

**5. [#36570 保留 SQLite 原始错误详情](https://github.com/anomalyco/opencode/pull/36570)**
- 作者：@bvolpato | 状态：OPEN
- 核心修复：将统一的 "Failed to execute statement" 改为透传 SQLite 原始错误（如磁盘满、坏块）。针对 #33356 数据库膨胀系列的治理第一步。

**6. [#36560 / #36561 插件工具接口重构：CodeMode 与扁平化 Draft](https://github.com/anomalyco/opencode/pull/36561)**
- 作者：@rekram1-node | 状态：OPEN
- 架构更新：将 `deferred` 标记重命名为 `codemode`，引入 `flat tool draft` 和 `namespace`。标志着 V2 插件 API 正在快速定型。

**7. [#36571 Agent 选择器增加预览面板](https://github.com/anomalyco/opencode/pull/36571)**
- 作者：@opencode-agent[bot] | 状态：OPEN
- UX 增强：拆分 Agent Picker 为独立列表与预览面板，支持查看 Agent 描述和模型而不截断。

**8. [#36542 容错并发目录创建冲突](https://github.com/anomalyco/opencode/pull/36542)**
- 作者：@BB-84C | 状态：OPEN
- 修复：`ensureDir` 在 `Config.locate` 并发加载时因 `AlreadyExists` 抛错。修复 #35828。

**9. [#36524 避免工具事件中重复的图像数据](https://github.com/anomalyco/opencode/pull/36524)**
- 作者：@dexhunter | 状态：OPEN
- 修复：修复了图像 Tool Output 在同一事件中双写（`structured.content` 与 `content[]`）的问题，显著减少多模态场景的 Token 重复消耗。

**10. [#32064 / #32104 桌面端遗留体验补全（已合并）](https://github.com/anomalyco/opencode/pull/32064)**
- 作者：@quadcpu / @GP-commits | 状态：CLOSED（昨日批量关闭）
- 功能：Windows 右键粘贴修复 + `.docx/.xlsx` 文件拖拽上传支持。虽 PR 创建较早，但昨日正式合并，对桌面用户是极大利好。

---

## 功能需求趋势

1. **数据库持久化治理**
   多起 Issue（#33356, #36523, #36570）指向 **Event Table 自动 Compaction、Pruning、Capping**。用户不再能接受无限增长的 SQLite。

2. **GPT-5.6 全能力映射**
   不仅仅是基础生成，社区期望在 OpenCode 内实现 **OAuth 兼容、Max 推理强度、Codex Ultra 限额** 等全套对等能力。

3. **V2 配置统一与多仓库支持**
   全局 vs 局部、环境变量 vs 进程内、根仓库 vs 子仓库的 **配置合并优先级和发现逻辑** 是当前 V2 开发的核心矛盾点。

4. **引导与教学模式（Guide / Teach Mode）**
   从 #12675 到 #36521，社区持续呼吁内置 **Prompt 引导** 和 **交互式教学**，帮助新用户进入“AI 辅助编码”状态。

5. **安全默认值**
   尽管 #5076 已关闭，但关于 **默认只读权限 + 按需提权** 的讨论将随 Agent 泛化重复出现。

---

## 开发者关注点 / 痛点

1. **V2 配置加载玄学**
   最直接的痛点。V2 在非 `$HOME` 目录（#36485）、子仓库（#36539）下完全忽略全局/共享配置，导致 MCP 设置丢失、指令缺失。

2. **新模型首日体验不佳**
   每次 GPT 新系列发布，OpenCode 总出现适配真空期。404 错误（#36140）、权限不足（#36574）、功能缺失（#36141）反复消耗用户信任。

3. **Billing 逻辑不透明**
   "Free usage exceeded"（#14273 / #33318）在 Zen 付费账户上频繁弹出，社区普遍反映 **免费额度、付费余额、每日限额的判定逻辑高度混乱**。

4. **基础交互反复回归**
   复制粘贴（#4283）、模式切换（#31972）、快捷键响应、焦点管理等功能作为“日常使用高频路径”，退化严重影响了长期使用的信心。

5. **资源无限膨胀风险**
   DB 文件增长到 13GB（#33356）、macOS 内核恐慌（#32002）—— 这些是“静态积累、动态爆发”的致命问题。用户急需官方工具进行 **DB 健康检查、压缩、迁移**。

6. **插件系统胶水化**
   外部 TUI 插件（#36525）无法加载、MCP 切换失效（#36482）等生态基础问题表明插件系统仍在快速迭代中，尚未达到稳定可用的状态。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

好的，这是根据提供的 GitHub 数据为您生成的 2026-07-13 Qwen Code 社区动态日报。

---

# Qwen Code 社区动态日报 (2026-07-13)

## 📌 今日速览

今日 Qwen Code 社区处于 **架构升级与稳定性阵痛并存** 的状态。在特性方面，`daemon` 多工作区架构、Web Shell 的 Shadcn UI 重构和子代理时间线等重大改进持续推进；然而，**主分支 E2E 测试连续告警** 以及 **Nightly 版本发布失败** 为社区敲响了稳定性的警钟。此外，围绕思考模型（Think Tag）流式解析的反复修复与回退反映出该功能正处于密集迭代期。

---

## 🔍 社区热点 Issues (Top 10)

1. **CI 与发布流水线连续故障（P1/P2 多起）**
   E2E 测试在 `main` 分支多次失败，Nightly 版本构建（v0.19.9）中断，这是社区当前最直接的痛点。社区对此高度敏感，自动创建了多个追踪 Issue。
   [#6781](https://github.com/QwenLM/qwen-code/issues/6781) | [#6778](https://github.com/QwenLM/qwen-code/issues/6778) | [#6749](https://github.com/QwenLM/qwen-code/issues/6749)

2. **RFC: 支持单 Daemon 多工作区（P2，20 条评论）**
   关于 `qwen serve` 支持多工作区的架构讨论是今天的焦点话题，已有丰富的技术细节讨论，显示了社区向更强云端服务化演进的需求倾向。
   [#6378](https://github.com/QwenLM/qwen-code/issues/6378)

3. **延迟工具发现导致 Prompt Cache 失效（P2）**
   一个关键的 **性能 Bug**。当模型调用延迟发现工具（deferred tools）时，会强制重新加载函数声明，破坏 Prompt Cache 前缀匹配。用户提供了详细的根因分析。
   [#6721](https://github.com/QwenLM/qwen-code/issues/6721)

4. **Qwen 3.7 Max 模型输出 Think 标签异常（P2）**
   模型将 `<think>` 标签放入了 `content` 字段而非 `reasoning_content`，直接影响下游解析，并引发了后续多轮修复与回退的连锁反应。
   [#6666](https://github.com/QwenLM/qwen-code/issues/6666)

5. **飞书 Channel 凭据无效仍错误报告就绪（P1）**
   Daemon 管理的飞书通道在凭据无效时会发送 `ready` 信号，导致后续请求全部失败，这是一个比较严重的集成通道 Bug。
   [#6779](https://github.com/QwenLM/qwen-code/issues/6779)

6. **多次 Ctrl-C 退出导致终端状态混乱（P2）**
   CLI 进程退出时未正确恢复终端属性，导致 `Ctrl+C` 按键失效甚至误码，严重影响终端使用体验。
   [#6776](https://github.com/QwenLM/qwen-code/issues/6776)

7. **Skill 上下文生命周期管理（P2）**
   用户长期抱怨 `SKILL.md` 的 body 永久留在上下文中无法卸载，要求增加压缩、卸载或标记完成机制。这是上下文窗口优化的核心诉求。
   [#6762](https://github.com/QwenLM/qwen-code/issues/6762)

8. **Chat 记录写入队列化导致数据丢失风险（P2）**
   Chat 记录在写入 JSONL 文件前就被标记为成功，若后台写入失败会导致聊天链断裂，存在数据可靠性问题。
   [#6742](https://github.com/QwenLM/qwen-code/issues/6742)

9. **Devlog + Living Spec 后台持久化代理（P3）**
   一个极具创意的 Feature，通过两个后台代理为长期项目构建跨会话的自动记忆层（Devlog）和项目状态快照（Living Spec），社区讨论积极。
   [#6755](https://github.com/QwenLM/qwen-code/issues/6755)

10. **恢复实时全屏思维链流式展示（P3，+1）**
     用户强烈渴望恢复 `v0.18.2` 中的实时思维链滚动功能，认为目前的 `Ctrl+O` 查看方式无法满足需求。
     [#5472](https://github.com/QwenLM/qwen-code/issues/5472)

---

## 🚀 重要 PR 进展 (Top 10)

1. **feat(serve): 扩展管理 V2（Daemon 架构）**
   引入了新的扩展管理能力，安装的扩展在用户级别共享，激活策略支持全局默认和按工作区精确匹配，是服务化的关键一环。
   [#6638](https://github.com/QwenLM/qwen-code/pull/6638)

2. **feat(web-shell): 引入 Shadcn UI 基础组件**
   Web Shell 前端迎来重大技术栈升级，基于 Shadcn/Tailwind 的主题系统、图标库和构建配置为后续 UI 一致性打下坚实基础。
   [#6760](https://github.com/QwenLM/qwen-code/pull/6760)

3. **feat(web-shell): 子代理按时间线展示**
   重构了子代理（Sub-agent）显示方式，从分散的选项卡改为清晰的时间线视图：结论优先，逐步展开推导过程，可读性大幅提升。
   [#6772](https://github.com/QwenLM/qwen-code/pull/6772)

4. **feat(cli): Daemon 通道运行时控制**
   为 Daemon 添加了运行时通道管理能力。即使启动时未指定 `--channel`，亦可动态启用、替换、重载和停止通道。
   [#6741](https://github.com/QwenLM/qwen-code/pull/6741)

5. **fix(core): 追踪跨流式 Delta 的思维链标签**
   对前期修复的跟进。解决了模型在流式输出时，`<think>` 标签跨多个数据包（delta）分割导致的解析错误问题。
   [#6777](https://github.com/QwenLM/qwen-code/pull/6777)

6. **fix(prompt-cache): 稳定延迟工具调用**
   解决了 Prompt Cache 失效问题。将延迟工具的发现结果放入模型可见内容，而非修改 Provider 函数声明，从而保持了 Cache 的稳定性。
   [#6723](https://github.com/QwenLM/qwen-code/pull/6723)

7. **fix(feishu): WebSocket 启动前验证凭据**
   针对 P1 Bug 的快速修复：在启动飞书 SDK 客户端前进行凭据预验证，无效凭据直接拒绝启动并报错。
   [#6780](https://github.com/QwenLM/qwen-code/pull/6780)

8. **perf(core): 减少 Git 快照进程开销**
   将主 Session 中的分支和状态读取合并为单次 `git status`，降低了每次 Session 创建时的 Git 进程开销。
   [#6784](https://github.com/QwenLM/qwen-code/pull/6784)

9. **fix(core): 检测无后缀点文件**
   修复了 `getLanguageFromFilePath` 函数忽略 `.gitignore` 等点文件的问题，并新增了首个单元测试。
   [#6785](https://github.com/QwenLM/qwen-code/pull/6785)

10. **feat(ci): 引入历史失败自动巡逻机制**
     新增每 10 分钟运行一次的 CI 故障巡逻，自动处理 PR 和主分支的 CI 失败，试图用自动化手段解决稳定性问题。
     [#6766](https://github.com/QwenLM/qwen-code/pull/6766)

---

## 📊 功能需求趋势

- **底座服务化与集群化：** 从多工作区 RFC 到 Channel Workers 再到扩展管理 V2，社区正将 `qwen serve` 打造为真正的多租户、高可用服务端，摆脱单进程单项目模式。
- **Web Shell 成为主战场：** Shadcn 重构、子代理时间线、设置面板、只读视图等表明，Web Shell 正在从简单聊天界面进化为专业的 AI 开发工作台。
- **精细化上下文管理：** 社区对上下文窗口利用率的追求已到极致。如何让 Prompt Cache 更稳定、如何卸掉无效的 Skill 上下文成为高频讨论议题。
- **模型生态兼容性：** 从内联模型切换到 Grok 模型支持请求来看，用户不希望被绑定在单一模型上，期望更灵活的模型路由能力。

---

## 💡 开发者关注点

- **稳定性隐忧：** 多起 CI 失败和版本发布失败打击了开发者的信心。流式输出解析（Think Tag）的反复回退被视为风险点，社区期待更稳健的测试覆盖。
- **数据可靠性：** #6742 暴露了读写不一致问题，开发者对 Session 数据持久化的信任度受到挑战。
- **终端体验打磨：** 终端残留问题虽然复现路径特殊，但遇到后极其影响信任感，说明 CLI 在异常退出处理上仍需完善。
- **背景自动化 Agent 的期待：** #6755 的 Devlog/Living Spec 展示了社区对“不打扰但时刻在为你思考”的 Agent 形态的憧憬，这可能是未来差异化竞争的关键。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，这是为您生成的 2026-07-13 Hermes 社区动态日报。

---

# 2026-07-13 Hermes 社区动态日报

## 1. 今日速览

今日虽无新版本发布，但社区活跃度不减。`sweeper` 机器人持续发力，批量关闭并合入了多个长期积压的严重 Bug 修复，如 Cron 调度失灵和 Telegram 命令无响应问题。在桌面端，Windows 平台的 `cua-driver` 崩溃（Alt+Tab）和跨标签页消息串扰成为开发者反馈的核心痛点；而在后端，编排器状态管理的稳定性问题也开始引发广泛讨论。

## 2. 版本发布

无

## 3. 社区热点 Issues

本期挑选了 10 条最值得关注的 Issue，涵盖近期修复的积压 Bug 和正在发酵的严重问题。

**1. [BUG] [OPEN] cua-driver UIAccess 进程在窗口切换后崩溃**
- **重要性：** 当前最高优先级 Bug，严重阻塞 Windows 桌面端 `computer_use` 功能的正常使用。用户只要执行 Alt+Tab 等焦点切换操作即可 100% 触发，导致后续所有桌面操控失效。
- **链接：** #52951 (https://github.com/NousResearch/hermes-agent/issues/52951)

**2. [BUG] [OPEN] 桌面端多标签页消息串扰**
- **重要性：** 核心用户体验 Bug。当用户在桌面端打开多个对话标签页时，消息会在不同会话之间“串门”，导致上下文严重污染。目前已标记为 `needs-repro`，但由于影响面极广，开发者高度关注。
- **链接：** #59305 (https://github.com/NousResearch/hermes-agent/issues/59305)

**3. [BUG] [OPEN] 编排器信任过期内存导致策略紊乱**
- **重要性：** 涉及深层的状态管理逻辑。长期运行的编排器在多 Profile 和 Kanban 工作流中，无法区分当前期望状态与过时历史状态，导致模型路由和策略执行出现非预期行为。
- **链接：** #63469 (https://github.com/NousResearch/hermes-agent/issues/63469)

**4. [BUG] [OPEN] Dashboard 会话标题显示工作区元数据**
- **重要性：** 今日新建的回归性 Bug。API/Dashboard 创建的会话标题被机器注入的 `workspace_context` 元数据文本占据，用户无法在会话列表中看到自己的第一条提问。
- **链接：** #63478 (https://github.com/NousResearch/hermes-agent/issues/63478)

**5. [BUG] [CLOSED] Cron 调度工具不工作**
- **重要性：** 社区反馈最多的 Bug 之一。`cronjob` 工具的 `last_run_at` 参数始终为空，导致定时任务无法触发，计划任务流完全断裂。已于今日由 `sweeper` 合入 `main` 分支。
- **链接：** #21867 (https://github.com/NousResearch/hermes-agent/issues/21867)

**6. [BUG] [CLOSED] systemd 下无限重启循环**
- **重要性：** 典型的运维灾难。旧进程未完全终止时，新进程检测到 PID 文件仍存在后直接退出，导致 systemd 陷入无限重启循环。已修复合入主干。
- **链接：** #21915 (https://github.com/NousResearch/hermes-agent/issues/21915)

**7. [FEATURE] [CLOSED] 主题感知子代理路由**
- **重要性：** 热门需求。社区希望 Agent 能根据任务类型（如编程、金融分析）动态路由到不同模型，实现成本优化和专业化。虽未排入近期计划，但代表了社区强烈的功能诉求。
- **链接：** #21827 (https://github.com/NousResearch/hermes-agent/issues/21827)

**8. [BUG] [CLOSED] 本地模型超时硬编码**
- **重要性：** 影响大量使用 Ollama/vLLM 等本地模型的用户。平台适配器中的超时被硬编码，无法通过环境变量调整，导致本地推理频繁超时中断。已修复合入主干。
- **链接：** #21525 (https://github.com/NousResearch/hermes-agent/issues/21525)

**9. [BUG] [CLOSED] Telegram `/sessions` 命令无响应**
- **重要性：** 网关平台适配器的严重 Bug。`/sessions` 命令虽已注册，但对应的处理器函数缺失，导致用户在 Telegram 上无法查看会话列表。已修复。
- **链接：** #21734 (https://github.com/NousResearch/hermes-agent/issues/21734)

**10. [BUG] [CLOSED] 多平台 WebSocket 共享事件循环导致级联断连**
- **重要性：** 架构级 Bug。当同时运行 WeCom、Feishu 等多个平台时，共享的 Asyncio 事件循环在处理阻塞任务时（如 LLM 调用），会导致所有平台连接同时超时断连。已修复。
- **链接：** #21026 (https://github.com/NousResearch/hermes-agent/issues/21026)

## 4. 重要 PR 进展

本期 PR 社区贡献活跃，主要集中在安全性增强、平台兼容性修复和终端用户（TUI/CLI）体验三个方向。

**1. `fix(vision): enforce URL safety`**
- **修复内容：** 对视觉模型的媒体下载链接进行严格的 SSRF 防护，防止内网 URL 被恶意利用，强化安全边界。
- **链接：** #21959 (https://github.com/NousResearch/hermes-agent/pull/21959)

**2. `fix(api-server): typed Responses input items`**
- **修复内容：** 修复 `/v1/responses` 接口输入项解析错误，解决了 Open WebUI 等第三方应用集成时对话历史被清空的“双倍历史” Bug。
- **链接：** #21963 (https://github.com/NousResearch/hermes-agent/pull/21963)

**3. `fix(gateway/weixin): bound TCPConnector`**
- **修复内容：** 修复微信平台适配器因大量长连接导致的文件描述符（FD）泄漏问题，解决了 macOS 上因 `256` 软限制导致崩溃的情况。
- **链接：** #21952 (https://github.com/NousResearch/hermes-agent/pull/21952)

**4. `fix(tui): restore native chat text selection`**
- **修复内容：** 修复 v0.13.0 升级后的回归缺陷，Dashboard Chat 的 TUI 界面现在可以正常使用鼠标选择和复制文本。
- **链接：** #21955 (https://github.com/NousResearch/hermes-agent/pull/21955)

**5. `fix(tui): persist in-flight streaming turns for dashboard resume`**
- **修复内容：** 增强会话连续性。当 TUI 的 Dashboard Chat 正在流式输出时意外断连，系统现在会尽力保留当前的对话片段，避免输出内容完全丢失。
- **链接：** #21887 (https://github.com/NousResearch/hermes-agent/pull/21887)

**6. `feat(tui): improve /resume picker discoverability`**
- **功能新增：** 为 TUI 的 `/resume` 会话选择器增加 `?` 快捷键，用于快速进入搜索/过滤模式，大幅提升了大量会话场景下的查找效率。
- **链接：** #21976 (https://github.com/NousResearch/hermes-agent/pull/21976)

**7. `fix(tui): support middle-click primary paste in Linux`**
- **功能新增：** 原生 Linux 体验提升。为 TUI 的模拟终端增加 X11 PRIMARY 选区中键粘贴支持，覆盖 Wayland 和 X11。
- **链接：** #21918 (https://github.com/NousResearch/hermes-agent/pull/21918)

**8. `feat(cli): refine custom provider model picker lists`**
- **功能新增：** 提升 CLI 易用性。现在允许为 `/model` 命令中的自定义 Provider 模型配置友好显示标签名，告别晦涩的原始模型 ID。
- **链接：** #21900 (https://github.com/NousResearch/hermes-agent/pull/21900)

**9. `feat(security): HERMES_READ_SAFE_ROOTS env-var read allowlist`**
- **功能新增：** 安全增强。新增 `HERMES_READ_SAFE_ROOTS` 环境变量，对标已有的写白名单，为文件读取工具提供基于环境变量的多根目录白名单配置。
- **链接：** #21927 (https://github.com/NousResearch/hermes-agent/pull/21927)

**10. `Fix ACP resume for missing sessions`**
- **修复内容：** 增强 ACP（Agent Communication Protocol）协议的鲁棒性。当尝试恢复的会话在服务端不存在时，优雅降级处理而非直接返回拒绝，确保后续 Prompt 请求能够正常进行。
- **链接：** #21934 (https://github.com/NousResearch/hermes-agent/pull/21934)

## 5. 功能需求趋势

从近期的 Issues 和 PR 中，提炼出社区最关注的三个功能趋势：

1. **智能成本路由与模型选择：** 用户不再满足“一个模型打天下”。社区强烈呼吁根据任务主题（Topic-Aware）或任务类型（Subagent Routing）动态切换推理模型，以在成本和效果之间取得最佳平衡。
2. **平台网关的深度定制与灵活性：** 随着接入平台增多（Telegram、Discord、Feishu），社区希望获得更精细的控制权。例如：按频道配置单独的系统提示词/模型、按群组设置严格的 @提及 模式、以及支持更丰富的交互方式（如 Discord 的表情符号反应选择）。
3. **安全性内建与可观测性：** 开发者开始主动要求构建内建的安全边界（如文件读写白名单、SSRF 防护）。同时，对运行时状态（会话列表、内存状态、模型路由）的可视化和可检索性需求正在上升。

## 6. 开发者关注点

1. **Windows 平台使用体验受阻：** `cua-driver` 的窗口切换崩溃是当前 Windows 开发者反馈最强烈的痛点，严重阻碍了 Agent 桌面操控核心特性的落地。
2. **持久化状态稳定性存疑：** 从桌面端标签页串扰，到编排器信任过期内存，再到 Session 标题错乱，多个问题均指向了底层状态存储和恢复机制的脆弱性，影响了用户对会话完整性的信任。
3. **多平台适配器可靠性仍是运维难点：** 无论是 Telegram 的硬编码超时，还是多平台共享事件循环导致的级联断连，平台适配器的稳健性依然是开发者在生产环境中面临的高频挑战。
4. **关键配置灵活性不足：** 文件路径白名单、超时时间、PID 文件行为等关键参数仍存在硬编码或不灵活的情况，开发者期望获得更强大的环境变量/配置文件治理能力。

</details>

</div>
