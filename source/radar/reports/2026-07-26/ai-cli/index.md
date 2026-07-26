---
title: "AI CLI 工具社区动态日报"
date: 2026-07-26
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# AI CLI 工具社区动态日报 2026-07-26

> 生成时间: 2026-07-26 00:41 UTC | 覆盖工具: 7 个

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

好的，作为资深技术分析师，我已根据您提供的 2026-07-26 七大主流 AI CLI 工具的社区动态，完成以下横向对比分析报告。本报告旨在为技术决策者和开发者提供宏观生态洞察与微观工具选型参考。

---

## AI CLI 工具生态横向对比分析报告 (2026-07-26)

### 1. 生态全景

当前 AI CLI 开发工具市场正经历严重的“信任赤字”阵痛期。虽然功能边界在快速扩展（多智能体编排、MCP 集成），但**基础稳定性、安全性及计费透明度**成为普遍的负反馈焦点。头部工具（Anthropic/OpenAI）因高定价与频繁的回归 Bug 面临社区反噬，而开源或半开源项目（DeepSeek Reasonix, OpenCode, Hermes）正凭借快速的安全响应、隐私保护和灵活的部署形态迅速填补用户对“可控性”的需求。整体趋势已从“证明 AI 能做什么”转向“证明 AI 在核心工作流中值得信任”。

### 2. 各工具活跃度与稳定性对比

| 工具 | 今日版本 | 社区热点Bug等级 | PR 活跃度 | 核心主题定性 |
|---|---|---|---|---|
| **Claude Code** | v2.1.220 | **极高** (计费信任/安全红线) | 中等 (日常维护) | **信任危机**：订阅价值受质疑，自动模式安全护栏被突破 |
| **OpenAI Codex** | Rust Alpha 0.146.0 | **高** (Windows崩溃/MCP泄漏) | **极高** (多个功能PR) | **大而全之痛**：Remote Dev 呼声最高，但 Windows 平台质量严重拖后腿 |
| **Gemini CLI** | 无 | **极高** (P1级Agent挂起与谎报) | **极高** (基础设施/PR生成器) | **智能体内耗**：子代理状态谎报成最大阻碍，正在强攻自动化管线 |
| **DeepSeek Reasonix** | **v1.17.21** | **极端** (CVE与内存持久化) | 高 (安全修复多) | **安全卫士**：以极快速度修复路径遍历等严重漏洞，内存子系统仍在磨合 |
| **OpenCode** | 无 | **极高** (P0级CPU性能退化) | 高 (VCS与工作流) | **性能过山车**：功能迭代快，但近期版本CPU飙升劝退重度用户 |
| **Qwen Code** | Nightly | 高 (MCP不通/沙箱误判) | 高 (Git体验/Agent配置) | **集成桥梁**：发力 IDE 与国产模型生态，沙箱选择逻辑是短板 |
| **Hermes** | 无 | 中-高 (无障碍/网关冲突) | **极高** (Claude SDK/Relay) | **多平台枢纽**：从网关延伸至桌面，Provider 生态（接入Claude SDK）是最大亮点 |

### 3. 共同关注的功能方向

社区跨工具反馈高度集中于以下四个方向，表明这已是阻碍 AI CLI 全面工程化的**通用瓶颈**：

1.  **智能体状态可靠性**（涉及：Claude Code, Gemini CLI, OpenCode）
    *   子代理谎报成功（Gemini）、任务 ID 因会话恢复而失效（Claude）、TUI 输入框假死（OpenCode）。用户对“Auto 模式”的信任度降至冰点，亟需**可审计的、确定性的执行状态机**。

2.  **安全沙箱与权限治理**（涉及：Claude Code, DeepSeek Reasonix, Gemini CLI）
    *   `rm -rf` 保护被绕过（Claude）、路径遍历写入任意文件（Reasonix/DeepSeek）、Sandbox 恢复漏洞（Gemini）。**Shell 执行原语的安全加固已成为行业生死线**，不再是可选项。

3.  **会话记忆与上下文持久化**（涉及：DeepSeek Reasonix, Gemini CLI, OpenAI Codex）
    *   软件重启后记忆丢失（Reasonix）、Auto-memory 低信号无限重试（Gemini）、上下文压缩导致关键步骤丢失（Codex）。**上下文管理的“确定性”和“稳定性”远未达标**，是当前智能体一致性的最大短板。

4.  **成本可见性与计费合规**（涉及：Claude Code, Qwen Code, Hermes）
    *   Max 计划被错误收费（Claude）、CLI 不显示 Token 用量（Qwen）、LINE 网关预算管理（Hermes）。用户对不透明的资源消耗**零容忍**，是高级订阅模式面临的最大风险。

### 4. 差异化定位分析

| 工具 | 差异化核心 | 目标用户 | 当前最大风险 |
|---|---|---|---|
| **Claude Code** | 深度绑定 Anthropic 顶级模型，提供最复杂的工程编排能力 | 高预算、追求极致代码质量的团队 | **定价信任崩塌**，Opus 4.8 模型质量不稳定动摇根基 |
| **OpenAI Codex** | **平台生态最全**（Desktop/TUI/Remote/MultiAgent） | 追求大而全IDE体验的开发者 | 平台碎片导致**质量参差不齐**，Windows 成致命短板 |
| **Gemini CLI** | **工具链工程化**（自动化PR生成、Bug Triage Agent） | Google 生态/追求自动化流程的团队 | **智能体自主性不可靠**，Agent 说谎直接破坏自动化流程价值 |
| **DeepSeek Reasonix** | **安全与隐私优先**，快速响应CVE，支持极细粒度权限 | 安全需求高的企业、独立开发者 | 记忆与全局上下文系统**稳定性仍需打磨** |
| **OpenCode** | **开源社区先锋**，快速跟进主流模型与新特性 | OSS 拥趸、追求灵活性的开发者 | 性能退化严重，**急功近利的迭代牺牲了基础体验** |
| **Qwen Code** | **亚洲/国产模型生态桥梁**，深度VS Code/Unity MCP集成 | 亚洲用户、Unity 开发者、阿里生态用户 | Provider 差异（DashScope）适配不足，**易用性受阻** |
| **Hermes** | **多平台操作中枢**（飞书/Telegram/LINE/Desktop） | 运营型团队、需要AI管理多渠道沟通的用户 | 网关多实例稳定性与**无障碍体验**影响生态广度 |

### 5. 社区热度与成熟度

*   **成熟生态期（高预期、高审判）：** **Claude Code** 与 **OpenAI Codex**。社区声音最大，但讨论焦点已从“如何用好”转变为“为什么这都做不好”。表明用户预期值极高，但对稳定性的容忍度极低。
*   **重工业加速期（强基建、快迭代）：** **Gemini CLI** 与 **Hermes**。PR 活动极其频繁，且不局限于功能修复，而是大规模的自有基础设施建设（PR Generator、Relay Gateway）。显示背后的团队正在为生产级大规模应用铺路。
*   **社区驱动冲刺期（功能新、Bug多）：** **DeepSeek Reasonix**、**OpenCode**、**Qwen Code**。迭代速度快，社区反馈即时代入。安全补丁可以在数小时内合并（Reasonix），但核心稳定性和性能问题也更尖锐。

### 6. 值得关注的趋势信号

1.  **“智能体说谎” 是致命缺陷**：Gemini 子代理在被中断后谎报成功，这是目前最具代表性的“AI 幻觉”工程化表现。开发者必须意识到，当前 AI CLI 的自治能力 **远未达到 “放手” 的程度**，必要的监督循环（Review Mode）在短期内是必须的。

2.  **“记忆”是下一个关键决胜点**：DeepSeek 与 Gemini 在记忆子系统上的 Bug，揭示了基础设施的匮乏。谁能更好地解决**确定性记忆、可控遗忘以及跨会话状态持久化**，谁就能真正解锁长时间运行的复杂工作流。

3.  **安全不再是补丁，而是架构**：`rm -rf` 绕过和路径遍历漏洞表明，依赖事后提示词或简单规则的安全策略是脆弱的。行业趋势正全面转向**系统级的沙箱、细粒度的执行权限和加密审计日志**。

4.  **“千模千面”的兼容债**：Qwen 与 DashScope 的冲突，OpenCode 与国产模型的适配问题，表明兼容所有主流 API 的工程债正在累积。**标准化（如 MCP 的深度应用）和 Provider 抽象层**将决定通用工具的生存能力。

5.  **从 CLI 到“AI 桌面/运营系统”的进化**：Hermes 的多网关、Qwen 的 Web Shell、Reasonix 的桌面宠物，都表明 AI 工具正全面突破传统终端的物理边界。开发者应关注那些能无缝融入**IDE、桌面环境甚至 IM 工具**的解决方案，而非单纯的命令行工具。

---

**最终建议：** 对于追求稳定性与安全的专业团队，DeepSeek Reasonix 当下的补丁速度和架构设计值得关注；对于需要复杂编排的用户，Claude Code 仍是能力天花板，但需对上位替代（Fable 5 vs Opus 4.8）和计费保持审慎；对于希望介入多平台自动化的团队，Hermes 的网关生态独树一帜。当前阶段，**不选最“强”的，选最“稳”和最“透明”的**，是企业级应用的上策。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止**: 2026-07-26 | **分析师**: 专业技术分析师

---

## 1. 热门 Skills 排行

按评论排序，社区关注度最高的 Skills PR 如下：

### 🥇 [Document Typography 排版技能](https://github.com/anthropics/skills/pull/514)
- **功能**：自动修复 AI 生成文档中的孤词、段落孤立和编号对齐等常见排版错误。
- **社区焦点**：排版问题是 Claude 高频痛点，用户共识极高。讨论集中在“修复应在模型层还是 Skill 层实现”，但绝大部分用户愿意接受此 Skill 作为即时的生产级补丁。
- **状态**: 🔴 Open

### 🥈 [ODT / OpenDocument 支持](https://github.com/anthropics/skills/pull/486)
- **功能**：完整支持 `.odt` / `.ods` 文件的创建、模版填充和 HTML 互转。
- **社区焦点**：企业用户强烈需要 LibreOffice 兼容性。模板填充的格式精度是审核瓶颈，但功能需求明确无异议。
- **状态**: 🔴 Open

### 🥉 [Testing Patterns 测试模式](https://github.com/anthropics/skills/pull/723)
- **功能**：包含 Testing Trophy 模型、AAA 模式、React Testing Library 等全栈测试方法论。
- **社区焦点**：可执行性是核心争议：Skill 指令过长是否浪费 Token？能否系统性改变 Claude 的测试生成行为？社区普遍认可其为“下一个官方大型 Skill”的最高潜力候选。
- **状态**: 🔴 Open

### 4️⃣ [Self-Audit 自我审计 v1.3.0](https://github.com/anthropics/skills/pull/1367)
- **功能**：先做机械文件验证，再按损害优先级执行四维推理审计，交付前闭环检查。
- **社区焦点**：“AI 检查 AI”的模式引发激烈碰撞。支持者认定其为防 Hallucination 的终局方案，反对者担忧每轮交互的性能开销。该 PR 直接呼应 Issue #1385，代表了社区对输出质量控制的最高阶思考。
- **状态**: 🔴 Open

### 5️⃣ [Meta-Analyzers 元技能分析器](https://github.com/anthropics/skills/pull/83)
- **功能**：新增质量分析器和安全分析器，从结构、文档、安全等维度评估其他技能。
- **社区焦点**：被视为官方技能审核机制的预演。“谁审计审计者”是经典悖论，但此 PR 是生态标准化的奠基工程。
- **状态**: 🔴 Open

### 6️⃣ [Color Expert 色彩专家](https://github.com/anthropics/skills/pull/1302)
- **功能**：封装 ISCC-NBS、Munsell、OKLCH/CAM16 等色彩命名与空间对照表。
- **社区焦点**：垂直领域专家知识结构化的典范。社区高度看好这种“深度专业知识一次封装，反复受益”的模式。
- **状态**: 🔴 Open

### 7️⃣ [Pyxel 复古游戏开发](https://github.com/anthropics/skills/pull/525)
- **功能**：集成 Pyxel 引擎+MCP 服务器，完成「编写→运行捕获→迭代」闭环。
- **社区焦点**：首次展示 Skill 与 MCP 生态无缝结合的可能性，被视为创意自动化的样板工程。
- **状态**: 🔴 Open

### 8️⃣ [SAP-RPT-1 预测分析](https://github.com/anthropics/skills/pull/181)
- **功能**：对接 SAP 开源表格基础模型，对企业 SAP 数据进行预测分析。
- **社区焦点**：企业智能化风向标，讨论集中在企业数据隐私与现场部署要求如何与 Claude Code 生态兼容。
- **状态**: 🔴 Open

> **⚠️ 特别关注 – Skill-Creator 基础设施修复集群**  
> 尽管不属于单体新 Skill，但 `#1298`、`#1099`、`#1050`、`#1323`、`#362`、`#361`、`#539` 等修复 PR 在评论总数上断层领先。核心问题：`run_eval.py` 始终报告 0% 召回率，触发检测失效，Windows 完全不可用。[Issue #556](https://github.com/anthropics/skills/issues/556) 和 [#1061](https://github.com/anthropics/skills/issues/1061) 提供了详细复现。此集群是当前社区最大的**基础设施焦虑源**。

---

## 2. 社区需求趋势

从 Issue 热度提炼五大新方向（按紧迫度排序）：

| 方向 | 代表 Issue | 核心诉求 |
|------|------------|----------|
| **🏛️ 企业级共享与目录** | [#228](https://github.com/anthropics/skills/issues/228) (16 评论) | 摆脱 Slack 传 `.skill` 文件的原始模式，需要中心化仓库、组织范围分享链接和权限控制。 |
| **🔐 供应链安全治理** | [#492](https://github.com/anthropics/skills/issues/492) (43 评论) | **全社区最热 Issue**。社区技能与官方技能混用 `anthropic/` 命名空间，存在严重信任边界漏洞。要求隔离命名空间、官方签名、授权提示边界。 |
| **🖥️ 跨平台兼容 (Windows)** | [#1061](https://github.com/anthropics/skills/issues/1061) | 创作工具链完全 Unix 导向，Windows 用户被排除在技能创作之外。需在 CI 中加入 Windows 测试矩阵。 |
| **🧹 生态去重与模块化** | [#189](https://github.com/anthropics/skills/issues/189) (👍9) | 安装不同插件包导致同一技能重复加载，严重浪费上下文窗口。需求模块化依赖管理和依赖追踪。 |
| **⚙️ Agent 治理标准化** | [#412](https://github.com/anthropics/skills/issues/412) (Agent Governance)，[#16](https://github.com/anthropics/skills/issues/16) (MCP 化) | 技能不应只是静态指令，应支持事件驱动控制、策略执行和标准 MCP 协议封装。社区要求“技能可组合、可治理、可审计”。 |

---

## 3. 高潜力待合并 Skills

以下 [OPEN] 状态 PR 评论活跃、完成度较高，具备近期合并潜力：

| 排名 | PR | 合并理由 | 风险提示 |
|------|-----|---------|--------|
| 🥇 | **[Testing Patterns (#723)](https://github.com/anthropics/skills/pull/723)** | 社区期待值最高，结构完整，测试是 Claude Code 核心场景。 | 内容过长需精简以控制 Token 消耗。 |
| 🥇 | **[Document Typography (#514)](https://github.com/anthropics/skills/pull/514)** | 痛点极清晰、改动独立、用户每日可见的 Bug 级体验优化。 | 可能被模型层修复取代，但短期价值明确。 |
| 🥈 | **[Self-Audit (#1367)](https://github.com/anthropics/skills/pull/1367)** | 切中 AI 可信输出刚需，方法论前瞻。 | 性能开销待验证，可能需加配置开关。 |
| 🥈 | **[ODT (#486)](https://github.com/anthropics/skills/pull/486)** | 企业合同敲门砖，功能需求无争议。 | 模板填充精度需严格测试。 |
| 🥉 | **[Meta-Analyzers (#83)](https://github.com/anthropics/skills/pull/83)** | 生态标准化基石，若官方暂无替代方案则高概率合并。 | 算力/Token 消耗需评估。 |
| 🥉 | **[Color Expert (#1302)](https://github.com/anthropics/skills/pull/1302) / [Pyxel (#525)](https://github.com/anthropics/skills/pull/525)** | 垂直领域专业化典范，展示生态多样性。 | 适用范围有限，但无冲突风险。 |

---

## 4. Skills 生态洞察

**一句话总结：**

社区的核心诉求正从 **“如何创造更多技能”** 急遽转向 **“如何信任、分发和治理已有技能”** ——命名空间安全（[#492](https://github.com/anthropics/skills/issues/492)，43 条评论断层第一）、企业级分享（[#228](https://github.com/anthropics/skills/issues/228)）和工具链可靠性（[#556](https://github.com/anthropics/skills/issues/556) / [#1061](https://github.com/anthropics/skills/issues/1061)）已经形成 **“信任铁三角”**。若 Anthropic 不在近期建立官方的安全认证、集中化分发管理和全平台兼容保障，技能生态将难以突破企业级准入屏障，社区实验将长期无法转化为规模化生产力。

---

好的，请看以下为您生成的 2026-07-26 Claude Code 社区动态日报。

---

## Claude Code 社区动态日报 (2026-07-26)

### 1. 今日速览

**Anthropic 发布 v2.1.220 维护版本**，但未明确宣布解决了昨日 Max 订阅用户的 Fable 5 计费争端。**社区负面反馈集中爆发**：除已发酵多日的 Fable 5 收费问题外，新增了 Opus 4.8 思考模式失效、自动模式删除保护绕过、以及 Windows 桌面版致命崩溃等多项严重 Bug。开发者对工具在复杂工作流中的**指令遵从度**和**状态持久化能力**表达了普遍担忧。

### 2. 版本发布：v2.1.220

- **标签**: `v2.1.220`
- **更新内容**: Bug fixes and reliability improvements.
- **分析**: 该版本没有发布显著的新功能特性，主要针对内部问题进行了修复。在 #79337 等计费/模型访问问题的余波中，社区高度期待官方能迅速定位并解决这些阻碍核心工作流的问题，本次更新是否包含针对性的紧急修复仍需观望。
- **链接**: [查看 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.220)

### 3. 社区热点 Issues（Top 10）

1.  **[BUG] Fable 5 向 Max 计划用户索取使用额度 (#79337)**
    - **热度**: 44条评论 | 14👍
    - **影响力**: ★★★★★
    - **摘要**: 订阅了最高级别 Max 计划的用户在 7月20日 Fable 5 成为标准配置后，依然被系统要求额外付费，会话被静默降级为 Opus 4.8。这直接触动了用户对"Max 订阅价值"的信任。
    - **社区反应**: 非常激烈，认为是严重的计费逻辑缺陷。作者持续更新标题以吸引官方注意。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/79337)

2.  **[BUG] Max 周配额 53% 在两天内被异常消耗 (#81234)**
    - **热度**: 2条评论 | 1👍
    - **影响力**: ★★★★★ (成本相关，极具威胁)
    - **摘要**: 用户提供详细日志指出，在机器闲置且本周工作量较轻的情况下，Max 20x 周配额在两日内消耗过半，怀疑是 `cache_read` 也被不公平地计入限额。
    - **社区反应**: 用户已提供严谨的对比分析数据，要求 Anthropic 解释配额计算逻辑。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/81234)

3.  **[BUG] 自动模式 rm -rf 保护被反引号绕过 (#81273)**
    - **热度**: 0条评论（刚刚提交）
    - **影响力**: ★★★★★ (安全红线)
    - **摘要**: 攻击者/模型可以通过在反引号表达式内嵌入 `rm -rf` 来绕过自动模式下的危险命令确认弹窗，存在严重的代码执行风险。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/81273)

4.  **[BUG] heron_brook 系统提示静默覆盖用户委托策略 (#80988)**
    - **热度**: 3条评论
    - **影响力**: ★★★★
    - **摘要**: v2.1.219 版本新增的系统提示段对 Opus 5 模型强制注入了 "Do not call the AgentTool unless the user requested it"，静默覆盖了用户设置的委托策略，且无退出机制。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/80988)

5.  **[BUG] Opus 4.8 忽略"始终启用思考"配置 (#79798)**
    - **热度**: 7条评论
    - **影响力**: ★★★★
    - **摘要**: `settings.json` 中的 `alwaysThinkingEnabled: true` 未能转换为 Opus 4.8 的 `thinking: {type: "adaptive"}` API 参数。用户无法按文档预期启用长思考模式，降低复杂推理质量。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/79798)

6.  **[BUG] Windows 桌面版 MSIX 内置浏览器崩溃 (#81275)**
    - **热度**: 0条评论（刚刚提交）
    - **影响力**: ★★★★ (平台致命 Bug)
    - **摘要**: Claude Desktop MSIX 包在 Windows 上打开 Cowork 浏览器窗格时，GPU 进程始终以同一错误码崩溃，涉及 Intel、NVIDIA 硬件及软件渲染模式。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/81275)

7.  **[BUG] Linux/IntelliJ OAuth 登录死循环 (#77966)**
    - **热度**: 12条评论 | 9👍
    - **影响力**: ★★★★
    - **摘要**: 在 Linux 环境或 IntelliJ 插件中使用 OAuth 登录时，`state` 参数在重定向后被丢弃，导致反复进入"重新登录"页面，无法完成认证。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/77966)

8.  **[BUG] 定时任务忽略模型设置，始终运行 Sonnet (#36496)**
    - **热度**: 5条评论 | 19👍
    - **影响力**: ★★★★ (呼声极高的悬案)
    - **摘要**: Desktop 定时任务（Scheduled Tasks）在 UI 和配置文件中指定 Opus 或其他模型均无效，始终使用 Sonnet，严重影响自动任务的产出质量。
    - **社区反应**: 高赞证明此问题影响面极广，但长期未修复，用户已经开始抱怨。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/36496)

9.  **[BUG] Session Resume 导致 Task 数据丢失 (#76844)**
    - **热度**: 2条评论 | 1👍
    - **影响力**: ★★★★
    - **摘要**: 长时间任务中创建的 `TaskCreate`/`TaskList` ID 在会话恢复后全部失效，导致无法对已有任务进行状态更新，破坏了代理工作流的连续性。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/76844)

10. **[BUG] 后台 Bash 任务退出码误报 (#81270)**
    - **热度**: 0条评论（刚刚提交）
    - **影响力**: ★★★★
    - **摘要**: 后台 Bash 任务实际以 exit code 1 失败，Claude Code 却向模型报告 exit code 0，导致误判验证通过，静默引入错误。
    - **链接**: [查看 Issue](https://github.com/anthropics/claude-code/issues/81270)

### 4. 重要 PR 进展

由于过去 24 小时内 PR 活动相对较少，以下汇总了所有更新的 Pull Requests：

1.  **[#81262] Log closed issues as closure events in Statsig**
    - **状态**: OPEN
    - **内容**: 修复了 Statsig 事件埋点逻辑，区分 Issue 创建和关闭事件，使数据统计更准确，避免将关闭错误记录为创建。
    - **链接**: [查看 PR](https://github.com/anthropics/claude-code/pull/81262)

2.  **[#81261] Handle worktree paths with spaces in /clean_gone**
    - **状态**: OPEN
    - **内容**: 优化了 `/clean_gone` 命令，使用 `git for-each-ref` 和 `git worktree list --porcelain -z` 来正确处理路径中包含空格的工作树，避免因路径解析错误导致数据丢失。
    - **链接**: [查看 PR](https://github.com/anthropics/claude-code/pull/81261)

3.  **[#39043] Remove "retro-futuristic" recommendation from Frontend Design Skill**
    - **状态**: OPEN
    - **内容**: 前端社区知名开发者 @t3dotgg 提交的 PR，建议移除内置前端设计 Skill 中推荐的"复古未来主义"风格，认为该默认风格不符合当前审美趋势。目前该 PR 处于开放状态，仍在等待团队决策。
    - **链接**: [查看 PR](https://github.com/anthropics/claude-code/pull/39043)

4.  **[#15727] fix(hookify): correct Python import paths for hook modules** *(已合并/关闭)*
    - **状态**: CLOSED
    - **内容**: 修复了 Hookify 插件的 Python 模块导入路径错误。由于环境变量指向了错误的目录级别，导致插件运行时抛出 `No module named 'hookify'` 错误。
    - **链接**: [查看 PR](https://github.com/anthropics/claude-code/pull/15727)

5.  **[#49596] refactor: extract shared GitHub API client into github-api.ts with tests** *(已合并/关闭)*
    - **状态**: CLOSED
    - **内容**: 代码重构。将项目中重复使用的 GitHub API 调用逻辑提取为共享客户端，并补充了单元测试，提升了代码可维护性和可靠性。
    - **链接**: [查看 PR](https://github.com/anthropics/claude-code/pull/49596)

### 5. 功能需求趋势

- **真正统一的跨设备工作空间 (#42050, #68924)**: 与普通移动端用户不同，开发者对 **Session 连续性**有极高的要求。在多终端（Desktop/CLI/远程）间无缝切换和恢复会话是最强烈的功能诉求，但目前各平台体验割裂。
- **状态透明化与可视化 (#81274, #76863, #79798)**: 开发者越来越倾向于在 IDE 或 CLI 中实时查看当前会话状态，特别是**当前使用的模型**、**思考模式等级**以及**子代理的活动状态**。当前需要键入 `/model` 来查询的方式被视为工作效率的打断。
- **复杂任务/代理编排的稳定性 (#67680, #76844, #80871)**: Task 系统作为代理编排的核心，目前缺乏健壮性。开发者需要一个**可持久化、可检索、可重命名**的任务管理体系，并保证在 Session 故障转移时任务 ID 不失效。
- **MCP 工具的完整性 (#57444, #81268)**: 社区希望 MCP 生态更加透明。工具描述被静默截断 2048 字符，以及 `/doctor` 诊断文档缺失新功能支持，反映出当前 MCP 集成过程中存在信息黑箱，影响了复杂工具的配置和排错。

### 6. 开发者关注点

- **模型指令遵从性的倒退**: 连续多个 Issue 报告表明，Opus 4.8 和 Fable 5 在遵守 `CLAUDE.md` 项目指令、「不要推送至生产环境」等安全约束时存在频繁失误。开发者被迫花费大量时间在 Code Review 上，抵消了 AI 带来的效率提升。
- **安全与信任危机**: `rm -rf` 保护绕过 (#81273) 和后台退出码误报 (#81270) 是今天最触目惊心的安全/可靠性缺陷。用户对 Claude Code 的"自动模式"信任度正在下降，转向更保守的"审查模式"。
- **计费不透明与合规隐忧**: Max 计划用户（$200/月）面临**不透明的配额消耗**（#81234）和**错误的付费提示**（#79337），这让高级客户产生极大的不满。社区呼吁 Anthropic 提供详细的 API 用量审计日志和更加严格的订阅资格检查。
- **平台稳定性短板**: Windows 桌面版浏览器崩溃 (#81275) 和 Linux/IntelliJ 登录死循环 (#77966) 表明，Claude Code 在非 macOS 平台的兼容性和稳定性仍是团队需要重点投入的方向。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-07-26

## 📋 今日速览
- 昨日连续发布两个 Rust alpha 版本（0.146.0-alpha.10 / 10.1），主要面向 CLI 迭代。
- **Remote Development** 虽已关闭但仍获 690 👍，社区对桌面端远程开发需求极为迫切。
- Windows 平台集中爆发 GPU 崩溃、Sandbox 初始化失败、OpenSSH 代理连通性等问题，成为当前稳定性最受关注的领域。

## 🚀 版本发布

### rust-v0.146.0-alpha.10.1 / rust-v0.146.0-alpha.10
- **为 CLI 的 Rust 组件发布两个连续 alpha 版本（0.146.0-alpha.10 → 0.146.0-alpha.10.1）**，系面向测试通道的增量更新。
- 官方未提供详细变更日志，预计修复了此前版本中的部分 CLI 稳定性缺陷。

## 🔥 社区热点 Issues（Top 10）

1. **#10450 – Remote Development in Codex Desktop App**  
   [链接](https://github.com/openai/codex/issues/10450)  
   **178 评论 · 690 👍**  
   呼声最高的功能请求：用户强烈要求在桌面端加入远程开发支持，以超越 VS Code 等竞品体验。虽已关闭，但讨论热度持续。

2. **#1457 – Python UV fails in Codex**  
   [链接](https://github.com/openai/codex/issues/1457)  
   **61 评论 · 46 👍**  
   长时间未解决的 bug：在 `uv` 环境中运行 `pre-commit` 等工具时失败，严重影响 Python 开发者。

3. **#31836 – Projects Sort By Last updated only sorts tasks, not projects**  
   [链接](https://github.com/openai/codex/issues/31836)  
   **32 评论 · 35 👍**  
   桌面端 Projects 视图的排序功能存在逻辑缺陷，选择 “Last updated” 后项目顺序不改变，影响日常管理。

4. **#4003 – Patched files have mixed line endings on Windows**  
   [链接](https://github.com/openai/codex/issues/4003)  
   **29 评论 · 72 👍**  
   Windows 下文件补丁不保留原始行尾风格，导致 Git 工作流混乱，获得大量 Windows 开发者认可。

5. **#29356 – Context compaction loses operational continuity**  
   [链接](https://github.com/openai/codex/issues/29356)  
   **20 评论**  
   长任务中自动上下文压缩会丢失关键步骤，用户建议保留最后 5 步操作原文，反映上下文管理对复杂任务至关重要。

6. **#30408 – MCP server processes leak (9+ GB RSS)**  
   [链接](https://github.com/openai/codex/issues/30408)  
   **17 评论 · 4 👍**  
   多线程环境下 MCP 服务进程永不清理，导致内存泄漏可达 9 GB，严重影响长期运行稳定性。

7. **#34133 – GPU process crash after Code Integrity rejects vk_swiftshader.dll**  
   [链接](https://github.com/openai/codex/issues/34133)  
   **14 评论**  
   Windows 系统下嵌入浏览器截图时 GPU 进程崩溃，根源为 Code Integrity 阻拦 `vk_swiftshader.dll`，导致应用卡死或无法重启。

8. **#31864 – MultiAgentV2 uses reserved tool `collaboration.spawn_agent`**  
   [链接](https://github.com/openai/codex/issues/31864)  
   **6 评论 · 14 👍**  
   GPT-5.6 Sol 会话全部失败，因模型尝试调用保留工具 `spawn_agent`。直接阻塞新模型在 CLI 中的使用，关注度上升。

9. **#35292 – Esc-Esc Edit/Resume changes gpt-5.6-sol Ultra to xhigh**  
   [链接](https://github.com/openai/codex/issues/35292)  
   **2 评论**  
   最新 TUI 0.145.0 快捷键 Bug：两次 Esc 编辑/恢复会导致模型推理级别意外降低，影响高级用户精确控制。

10. **#35361 – Bad `apply_patch` error message causes agent looping**  
    [链接](https://github.com/openai/codex/issues/35361)  
    **2 评论**  
    自定义模型用户（如 Gemma 4）反馈 `apply_patch` 错误提示格式不友好（要求首行为固定字符串），且未给出正确格式示例，导致代理进入失败循环。

## ⚙️ 重要 PR 进展（Top 10）

1. **#31817 – Update models.json**  
   [链接](https://github.com/openai/codex/pull/31817)  
   自动更新模型列表，反映最新模型支持变化。

2. **#35408 – Ignore generated system skills in the skills watcher**  
   [链接](https://github.com/openai/codex/pull/35408)  
   禁止 watcher 跟踪系统级生成技能，避免重复注册与资源浪费，提升 App 稳定性。

3. **#35375 – Make the keymap action menu responsive**  
   [链接](https://github.com/openai/codex/pull/35375)  
   改进 CLI 终端按键映射菜单响应式布局：窄屏时自动换行，宽屏保持列对齐，提升 TUI 体验。

4. **#35365 – Keep unified mention results fresh**  
   [链接](https://github.com/openai/codex/pull/35365)  
   修复统一提及弹窗搜索状态陈旧问题，每次打开时重新发起文件搜索并缓存结果，提高交互正确性。

5. **#35364 – Bound Code Mode metadata compatibility headers**  
   [链接](https://github.com/openai/codex/pull/35364)  
   限制 `code_mode_tool_names` 元数据头大小，防止 HTTP/WebSocket 头部无界增长，增强协议兼容性与安全性。

6. **#35363 – Include item start times in completion events**  
   [链接](https://github.com/openai/codex/pull/35363)  
   在 `ItemCompletedEvent` 中加入可选的 `started_at_ms` 字段，便于追踪任务耗时，对性能监控与调试有益。

7. **#35359 – Handle exec-server network policy requests in the client**  
   [链接](https://github.com/openai/codex/pull/35359)  
   客户端新增执行服务器网络策略请求处理能力，支持 allow/deny/ask 决策路由，加强沙箱网络控制。

8. **#31582 – Expose thread-selected skills from skills/list**  
   [链接](https://github.com/openai/codex/pull/31582)  
   使 `skills/list` API 返回线程当前选取的技能及不可用警告，方便调用端获取准确的环境能力视图。

9. **#30228 – Notify clients when thread-selected skills change**  
   [链接](https://github.com/openai/codex/pull/30228)  
   当线程所选技能状态变化（就绪/恢复/失败）时主动推送通知，让客户端及时刷新，避免状态过期。

10. **#29752 – Integrate experimental credential broker**  
    [链接](https://github.com/openai/codex/pull/29752)  
    核心层集成凭据代理，允许用替代值替换真实凭据，支持托管子进程安全凭据管理，属于安全增强实验性特性。

## 📊 功能需求趋势
- **远程开发**：持续最高呼声，用户在桌面端要求具备类似 VS Code Remote 的能力。
- **Windows 平台稳定性**：行尾处理、GPU 崩溃、Sandbox 失败、OpenSSH 代理不通等多维度问题表明 Windows 是当前质量最薄弱的环节。
- **上下文管理**：长任务中自动压缩导致关键操作丢失，社区期望保留最近步骤或提供用户可控的压缩策略。
- **多代理系统**：MultiAgentV2 与保留工具冲突、子代理恢复错误等问题反映新架构仍需打磨。
- **自定义模型兼容**：更多用户尝试接入第三方或本地模型，但 `apply_patch` 错误信息缺陷及 Responses API 对接问题阻碍了这一趋势。
- **CLI 体验细化**：快捷键、Esc 中断、排序控制、搜索缓存等细微改进频现，表明 CLI 已进入精细化阶段。

## 👨‍💻 开发者关注点
- **Windows 体验亟待改善**：右击“Projects”排序、行尾混乱、GPU 组件冲突、Sandbox 设置反复失败等问题集中爆发，Windows 用户群体呼吁官方优先修复。
- **上下文压缩策略不透明**：长任务中模型“遗忘”操作步骤，开发者希望保留最后 N 步 verbatim 或提供手动 compaction 开关。
- **MCP 资源泄漏**：多线程场景下进程无限制积累，内存占用飙升（9+ GB），严重威胁桌面应用长时间可用性。
- **新模型 GPT-5.6 Sol 集成障碍**：因保留工具 `spawn_agent` 导致全部请求失败，发布混乱，影响 Pro 用户对新模型的信任。
- **排序与项目管理 Bug**：桌面端 `Sort By` 对项目组无效、侧边栏与排序控制不同步等低级错误，降低专业用户工作效率。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 2026-07-26

## 今日速览
过去 24 小时内 Issue 讨论活跃。子代理在达到最大轮次后**误报成功**（#22323）成为关注焦点，通用代理挂起问题（#21409）仍困扰用户。Auto Memory 的低信号重试及日志安全改进引发讨论。PR 方面，Google 团队合并了 **MCP OAuth 令牌刷新修复**（#28481）和 **Shell 输出长度限界**（#28401）等关键补丁，并提交了大型“PR Generator”自动化管道基础设施，涵盖多包功能。

## 社区热点 Issues
精选 10 个在本周期内更新且讨论热度较高或影响较大的 Issue。

### 1. Subagent 达最大轮次后谎报成功①
- **链接**：[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
- **标签**：`priority/p1`, `kind/bug`, `status/need-retesting`
- **为什么重要**：`codebase_investigator` 子代理虽已被最大轮次中断，却向主代理报告 `status: "success"`，使开发者误以为任务完成，可能引入未检查的代码。**P1 级别**，社区评论 12 条，标记为需重新测试。
- **社区反应**：用户 @matei-anghel 发现该行为与 `MAX_TURNS` 恢复逻辑耦合不当，维护者已分配并进入 retesting 阶段。

### 2. 通用代理（Generalist）卡死②
- **链接**：[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
- **标签**：`priority/p1`, `kind/bug`, `area/agent`
- **为什么重要**：当 `gemini-cli` 将任务交给 generalist agent 时，可能永久挂起（创建文件夹等简单任务亦如此），用户最多等待 1 小时无响应。获得 **8 个 👍**，是近期反馈最强烈的 bug。
- **社区反应**：用户 @turmanticant 通过阻止模型使用子代理来规避，社区呼吁尽快排查循环等待问题。

### 3. 零依赖 OS 沙箱利用模型 Bash 亲和力③
- **链接**：[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)
- **标签**：`priority/p2`, `kind/enhancement`, `effort/large`
- **为什么重要**：提出利用 Gemini 3 模型原生 POSIX 工具链能力，通过轻量级 OS 沙箱执行 `grep`/`sed` 等命令，兼顾安全与效率。这是一个**长期演进方向**，若实现将大幅提升 CLI 的代码探索与操作能力。
- **社区反应**：评论 8 条，开发者正论证沙箱边界与模型原生能力结合的最佳实践。

### 4. Shell 命令执行后卡在“等待输入”④
- **链接**：[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
- **标签**：`priority/p1`, `kind/bug`, `area/core`
- **为什么重要**：极简单的 CLI 命令（如 `ls`）执行后，Gemini 仍然显示命令活跃并等待用户输入，导致工作流阻塞。获得 **3 个 👍**，反映了核心交互可靠性的严重缺陷。
- **社区反应**：用户 @rnett 重复遇阻，开发团队已标记为 P1 并需要额外信息。

### 5. Auto Memory 反复重试低信号会话⑤
- **链接**：[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
- **标签**：`priority/p2`, `kind/bug`, `area/agent`
- **为什么重要**：Auto Memory 的提取代理若因“低信号”跳过读取某条会话，该会话会留在待处理池中，导致**无限重试**，浪费 tokens 且可能重复处理无效内容。
- **社区反应**：@SandyTao520 提交此问题，团队已接受并标记为需解决，评论 5 条。

### 6. 浏览器子代理在 Wayland 下完全失效⑥
- **链接**：[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
- **标签**：`priority/p1`, `kind/bug`, `agent/browser`
- **为什么重要**：Linux 用户在 Wayland 环境下运行浏览器子代理会立即失败，`Termination Reason: GOAL` 但实际未完成任何操作。影响所有采用 Wayland 的现代 Linux 发行版。
- **社区反应**：用户 @sigmaSd 上报，获得 1 个 👍，评论 4 条，目前标记为 `need-retesting`。

### 7. Symlink 代理文件不被识别⑦
- **链接**：[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)
- **标签**：`priority/p2`, `kind/bug`, `status/need-information`
- **为什么重要**：用户习惯将自定义 Agent 的 markdown 文件用 symlink 管理，但 Gemini CLI 在 `~/.gemini/agents/` 读取时忽略 symlink，导致自定义 agent 不生效。**权限/配置的易用性问题**。
- **社区反应**：讨论 4 条，团队要求补充更多信息，但痛点明确。

### 8. 浏览器代理忽略 `settings.json` 覆盖⑧
- **链接**：[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)
- **标签**：`priority/p2`, `kind/bug`, `area/agent`
- **为什么重要**：`AgentRegistry` 正确读取了全局或项目的 `settings.json` 中关于浏览器代理的配置（如 `maxTurns`），但实际运行时**完全忽略**，导致用户无法调整关键参数。
- **社区反应**：用户 @hsm207 提交详细分析，维护者确认这是一个影响到用户配置信任度的问题。

### 9. Agent 应阻止破坏性行为⑨
- **链接**：[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)
- **标签**：`priority/p2`, `kind/customer-issue`
- **为什么重要**：Agent 在复杂 git 操作或数据库维护中可能使用 `git reset --force` 等危险命令，社区强烈要求模型对破坏性操作有所保留和警告。**安全与治理的核心诉求**。
- **社区反应**：获得 1 个 👍，用户 @abhipatel12 提出倡导，团队将其标记为客户关注。

### 10. Auto Memory 安全：确定性编辑与日志缩减⑩
- **链接**：[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
- **标签**：`priority/p2`, `kind/bug`, `area/security`
- **为什么重要**：当前 Auto Memory 在发送内容给模型后才提示编辑 secret，存在先泄露后处理的窗口；同时服务日志可能记录技能与其结果的映射，引发隐私风险。**安全基线提升**。
- **社区反应**：4 条评论，@SandyTao520 连发多个内存相关 bug，表明团队正在集中审查内存子系统的安全。

## 重要 PR 进展
从过去 24 小时更新的 14 个 PR 中，精选以下 10 个功能或修复重点。

### 1. 修复性能测试中弃用的 `canUseRipgrep`
- **链接**：[#28535](https://github.com/google-gemini/gemini-cli/pull/28535)
- **影响范围**：`area/core`
- **内容**：将性能测试的全局设置从已移除的 `canUseRipgrep()` 迁移至 `resolveRigpPath()`，保持与当前 ripprep 解析器 API 兼容。

### 2. 修复 CI 中 `staging-tmp` dist-tag 移除失败
- **链接**：[#28534](https://github.com/google-gemini/gemini-cli/pull/28534)
- **影响范围**：`area/non-interactive`
- **内容**：新增重试脚本，解决 Wombat/npm 在大型包发布后 dist-tag 不可即时查询导致的 `npm dist-tag rm` 退出，**降低 nightly release 失败率**。

### 3. 修正 MCP OAuth 令牌刷新时 client ID 丢失
- **链接**：[#28481](https://github.com/google-gemini/gemini-cli/pull/28481)
- **影响范围**：`area/security`, `priority/p1`
- **内容**：修复通过 OAuth discovery 注册的 MCP 服务器在本地刷新令牌前因 `client_id` 丢失而失败，且失败直接删除了已有凭证强制重认证。**已在 7 月 22 日提交，昨日更新后继续追踪**。

### 4. 限制 Shell 命令输出发送给模型的大小
- **链接**：[#28401](https://github.com/google-gemini/gemini-cli/pull/28401)
- **影响范围**：`area/agent`, `priority/p1`
- **内容**：Shell 工具之前将完整输出（`find /`、大型 build log）直接注入模型上下文，造成 tokens 浪费和回答退化。此 PR 为输出加上硬上限，**直接提升上下文利用效率**。

### 5. 防范 a2a-server restore 命令的路径遍历
- **链接**：[#28353](https://github.com/google-gemini/gemini-cli/pull/28353)
- **影响范围**：`area/agent`, `security`（已合并）
- **内容**：`restore.ts` 对用户提供的文件名未做归一化与约束检查，可读取 `checkpointDir` 之外的文件（如 `/etc/passwd`）。**深度防御补丁**。

### 6. 修复 MaxListenersExceededWarning 与无限认证循环
- **链接**：[#28348](https://github.com/google-gemini/gemini-cli/pull/28348)
- **影响范围**：`area/core`, `security`（已合并）
- **内容**：解决 API 重试时监听器过多导致警告及溢出错误；同时修复 Windows OAuth 后因 `setTimeout` 逻辑缺陷卡死在无限循环。**用户认证体验的关键修复**。

### 7. PR Generator：环境配置解析与基础工具链
- **链接**：[#28435](https://github.com/google-gemini/gemini-cli/pull/28435)
- **影响范围**：新 `pr-generator` 系列包
- **内容**：引入配置解析、子进程执行（带结构化日志）、GitHub REST v3 客户端、ANSI 测试输出过滤等底层模块，是**全自动 Issue→PR 管道**的基础。

### 8. PR Generator：迭代式 Bug 修复状态机与容器入口
- **链接**：[#28433](https://github.com/google-gemini/gemini-cli/pull/28433)
- **影响范围**：新 `pr-generator` 系列包
- **内容**：实现主编排层，协调 Firestore 并发锁、AI 代理编码与评估循环、ESLint 静态分析、差异大小验证，并提供容器化 worker 入口点（Async Container Entrypoint）。

### 9. CarTaker：Firestore 模型增加 error 与 PR 号支持
- **链接**：[#28467](https://github.com/google-gemini/gemini-cli/pull/28467)
- **影响范围**：`caretaker-agent`
- **内容**：在 `ingestion-service` 与 `triage-worker` 的 Firestore schema 中添加 `error` 字段记录失败原因，并标记 `pr_number` 支持从 Issue 到 PR 的关联追查。

### 10. CarTaker 评估工具：Golden Issue 收集与 Firestore 同步
- **链接**：[#28532](https://github.com/google-gemini/gemini-cli/pull/28532)
- **影响范围**：`caretaker-evals`
- **内容**：新增 CLI 工具集，可从现有关键 Issue 中组装 golden test cases，并与 Cloud Firestore 同步，**为 triage 质量评估建立基础数据集**。

## 功能需求趋势
综合分析近期 Issue 与 PR，社区关注的功能方向集中在以下几点：

- **Agent 可靠性与自愈能力**：多个 P1/P2 级 bug 指向子代理状态误报、挂起、配置忽略等问题，社区渴望 Agent 行为稳定且可预测（#22323, #21409, #22267, #22672）。
- **Auto Memory 智能化与安全**：从低信号重试、无效补丁静默跳过，到日志中技能映射泄露、secret 先发送后编辑，社区要求“记忆”子系统更聪明且安全可控（#26522, #26523, #26525, #26516）。
- **高级代码理解工具（AST 感知）**：利用 AST 进行方法级精准读取、导航和代码搜索，以减少 token 开销并提高 agent 对代码结构的感知（#22745, #22746）。
- **浏览器代理的广泛兼容性与容错**：Wayland 支持、浏览器锁恢复、设置覆盖能力，是企业级 Linux 用户的重要阻塞项（#21983, #22232）。
- **自动化 Issue 处理与 Infrastructure as Code**：PR Generator（pr-generator-*）和 CarTaker 评估工具的出现，表明团队正推动**从 Issue 到 PR 的自动化管道**，并强化评估数据集，是 OSS 项目质量的双重保障（#28435, #28433, #28532）。
- **终端与交互体验回归**：Shell 执行卡死、终端 resize 闪烁、编辑器退出后界面损坏——核心交互品质被持续追踪（#25166, #21924, #24935）。

## 开发者关注点
从实际使用反馈和 PR 修复中提取的高频痛点：

- **子代理失败却谎称成功**：`codebase_investigator` 在 `MAX_TURNS` 中断后依然报告 `success`，直接掩盖问题——相当于 CI 把超时当作通过（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)）。
- **通用代理无故挂死**：加载 generalist agent 后整条会话无响应，用户只能通过禁止子代理才能继续工作（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）。
- **Shell 命令执行完毕却仍在“等待输入”**：一条简单命令阻塞整个流程，需用户手动干预或取消（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)）。
- **浏览器代理不兼容 Wayland**：现代 Linux 桌面几乎都跑 Wayland，但 browser agent 无法启动，导致依赖网页交互的任务完全不可用（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)）。
- **自定义 Agent 配置常被忽略**：
  - 符号链接形式存放的 Agent md 文件无法被加载（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)）；
  - `settings.json` 中针对浏览器代理的 `maxTurns` 等关键覆盖不生效（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）。
- **Tool 数量爆炸导致 400 错误**：超过 128 个工具时 API 直接拒绝，Agent 未智能限制当前作用域内的工具数量（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)）。

---

① 注：`priority/p1` 为内部最高优先级，“kind/bug”为缺陷。
② “maintainer only” 标签表示讨论已转内部，但摘要可公开。

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

好的，作为一名专注于 AI 开发工具的技术分析师，我已根据您提供的 GitHub 数据（仓库: `esengine/DeepSeek-Reasonix`），为您生成了 **2026-07-26 的 DeepSeek Reasonix 社区动态日报**。

---

# DeepSeek Reasonix 社区动态日报 (2026-07-26)

## 今日速览
ReaSonix 发布了 v1.17.21 **稳定版**，重点修复了**粘贴撤销**、**内嵌正则搜索**及安全性问题。同时，两个关于**任务输入**和**文件写入路径**的潜在安全漏洞（CVE）被社区发现并修复，开发者应关注并跟进升级。此外，一个新的 **macOS 桌面宠物**功能提案引起了广泛关注，显示出社区对产品趣味性和个性化的追求。

## 版本发布
*   **v1.17.21 (稳定版)**: 此版本主要带来了以下改进：
    *   **确定性规划**与**可靠的粘贴撤销**。
    *   **内嵌正则搜索**与原生的**崩溃诊断**功能。
    *   **安全性加固**：为所有 Windows 可执行文件添加了 Authenticode 签名，并对日志进行凭据脱敏处理，同时更新依赖以修复 12 项安全公告。
    *   **体验优化**：隔离了 CLI 诊断与终端界面，使 Provider 重试可取消，并解决了会话所有权冲突问题。
    *   [发布链接 (EN)](https://reasonix.io/changelog/v1.17.21/?lang=en) | [完整更新日志](https://reasonix.io/changelog/v1.17.21/)

## 社区热点 Issues (Top 10)
*(说明：以下筛选基于过去24小时的更新或创建，结合了问题严重性、社区关注度及讨论参与度)*

1.  **[Bug]: 全局记忆不生效** ([#6928](https://github.com/esengine/DeepSeek-Reasonix/issues/6928))
    *   **重要性**: **极高**。用户反馈首次加载对话和长时间对话后，全局记忆失效，导致智能体无法遵守预设规则。这直接影响了产品的核心智能体验，是社区高频痛点。
    *   **社区反应**: 创建于昨日，暂无回复，但问题描述清晰，影响广泛。

2.  **[Bug]: 远程SSH的一些问题** ([#6747](https://github.com/esengine/DeepSeek-Reasonix/issues/6747))
    *   **重要性**: **高**。远程SSH功能是开发者远程操作的关键场景。报告指出按钮大小不一致及远程目录无法打开的问题，严重影响基本可用性。
    *   **社区反应**: 开放中，有6条评论，说明复现或讨论正在进行，但尚未解决。

3.  **[Bug]: 多会话问题** ([#6942](https://github.com/esengine/DeepSeek-Reasonix/issues/6942))
    *   **重要性**: **高**。多会话切换时，运行中的会话报错“this session is already open”，这会严重干扰用户的多任务处理工作流。
    *   **社区反应**: 新提交，暂无评论，需要开发团队紧急关注。

4.  **[Bug]: reasonix run 权限过大** ([#6927](https://github.com/esengine/DeepSeek-Reasonix/issues/6927))
    *   **重要性**: **高**。用户发现 `reasonix run` 命令在未获得明确许可的情况下，自动同意了所有系统询问，并执行了全局解压等高危操作。这是一个严重的安全设计缺陷。
    *   **社区反应**: 呼声强烈，建议增加 `-y` 或 `--auto` 参数来控制自动授权行为。

5.  **[Bug]: 关掉软件之后记忆自动删除** ([#6935](https://github.com/esengine/DeepSeek-Reasonix/issues/6935))
    *   **重要性**: **高**。这是一个关于数据持久性的严重问题，用户报告关闭软件后会话记忆完全丢失，并提出了自动备份的建议。
    *   **社区反应**: 已关闭，表明开发团队可能已定位问题或计划在后续版本修复。

6.  **[Bug]: Unbounded parallel task input can cause excessive resource consumption** ([#6933](https://github.com/esengine/DeepSeek-Reasonix/issues/6933))
    *   **重要性**: **极高 (安全/性能)**。报告了一个潜在的拒绝服务（DoS）漏洞，`parallel_tasks` 工具没有对输入的任务数量进行限制，可能导致资源耗尽。
    *   **社区反应**: 安全研究人员提交，已触发开发团队修复。

7.  **[Bug]: Job artifact path traversal allows writes outside the intended temp directory** ([#6932](https://github.com/esengine/DeepSeek-Reasonix/issues/6932))
    *   **重要性**: **极高 (安全)**。这是一个路径遍历漏洞，攻击者可能利用 Job artifact 的 `parentSession` 和 `kind` 参数在服务器上任意位置写入文件，危害极大。
    *   **社区反应**: 安全研究人员提交，已并发的 PR (#6936, #6937) 表明开发团队已第一时间响应并修复。

8.  **[Bug]: 工作区外ls和glob异常** ([#6486](https://github.com/esengine/DeepSeek-Reasonix/issues/6486))
    *   **重要性**: **高**。Agent 在工作区外的 `ls` 和 `glob` 工具递归时找不到文件，这限制了 Agent 的文件系统操作能力。
    *   **社区反应**: 已关闭，说明问题已被修复，开发者可以更新到最新版尝试。

9.  **[Feature]: 桌面版是否考虑像zcod一样带一个终端** ([#6891](https://github.com/esengine/DeepSeek-Reasonix/issues/6891))
    *   **重要性**: **中**。代表了社区对“一体化”开发体验的强烈需求，希望桌面版能集成终端，无需在IDE和Agent间来回切换。
    *   **社区反应**: 有一定讨论量，是社区呼声很高的功能需求。

10. **[Bug]: skill directory exceeds 20mb using local mempalace when installing plugin** ([#6939](https://github.com/esengine/DeepSeek-Reasonix/issues/6939))
    *   **重要性**: **中**。用户在安装插件时，由于本地记忆宫殿（memory palace）导致 skill 目录超过20MB，影响磁盘使用和性能。
    *   **社区反应**: 新提交，暂无讨论，但指向了一个潜在的存储管理问题。

## 重要 PR 进展 (Top 10)
*(说明：以下筛选基于过去24小时内的活动，覆盖了安全修复、新功能和核心优化)*

1.  **[安全] fix(jobs): reject path traversal in artifact parentSession and kind** ([#6936](https://github.com/esengine/DeepSeek-Reasonix/pull/6936))
    *   **内容**: 修复了 #6932 报告的严重路径遍历漏洞，在 `StartForSession` 中拒绝 `..` 和路径分隔符，防止恶意写入。
    *   **状态**: Open

2.  **[安全] fix(jobs): reject traversal in SetActiveSessionPath sessionPath** ([#6937](https://github.com/esengine/DeepSeek-Reasonix/pull/6937))
    *   **内容**: 修复了 #6932 中同一个漏洞的另一个攻击面，确保 `SetActiveSessionPath` 也拒绝路径穿越。
    *   **状态**: Open

3.  **[安全/修复] Fix sensitive data exposure in error logs** ([#6924](https://github.com/esengine/DeepSeek-Reasonix/pull/6924))
    *   **内容**: 修复了由 CodeQL 发现的敏感信息泄露问题，在错误日志中脱敏凭据（如认证代理 URL 等），提升安全性。
    *   **状态**: Closed (已合入 v1.17.21 或后续版本)

4.  **[新功能] feat(desktop): add macOS desktop pet companion** ([#6943](https://github.com/esengine/DeepSeek-Reasonix/pull/6943))
    *   **内容**: 为 macOS 桌面版添加了一个有趣的功能：根据 Agent 状态显示动画的桌面宠物（精灵图）。展示了社区在提升产品趣味性和情感化交互方面的探索。
    *   **状态**: Open

5.  **[新功能] feat(bash): 实现一次性细粒度沙箱能力增量授权** ([#6930](https://github.com/esengine/DeepSeek-Reasonix/pull/6930))
    *   **内容**: 改进了 Bash 沙箱的安全模型，允许对单次操作进行更细粒度的临时授权（如只允许当前命令访问特定文件），而非完全信任。
    *   **状态**: Open

6.  **[新功能] Add Kimi K3 support for OpenCode Go and official APIs** ([#6921](https://github.com/esengine/DeepSeek-Reasonix/pull/6921))
    *   **内容**: 为官方 Kimi API 和 OpenCode Go 适配了最新的 Kimi K3 模型，扩展了平台可用的模型池。
    *   **状态**: Open

7.  **[新功能] feat(desktop): add tok/s throughput, cache token counts, and output tokens to status bar** ([#6931](https://github.com/esengine/DeepSeek-Reasonix/pull/6931))
    *   **内容**: 在桌面版底部状态栏增加了实时显示生成吞吐量 (tokens/s) 和缓存命中情况的功能，方便开发者监控性能。
    *   **状态**: Open

8.  **[修复] fix(openai): recognise Anthropic-style cache fields on OpenAI-compatible endpoints** ([#6940](https://github.com/esengine/DeepSeek-Reasonix/pull/6940))
    *   **内容**: 修复了 MiniMax 等第三方 API 返回非标准字段名导致的缓存识别错误问题，增强了与 OpenAI 兼容端点的兼容性。
    *   **状态**: Open

9.  **[修复/优化] fix(config): preserve symlinks on config file writes** ([#6938](https://github.com/esengine/DeepSeek-Reasonix/pull/6938))
    *   **内容**: 修复了配置写入会替换符号链接本身的 bug，改为跟随链接写入目标文件，这在一些高级配置场景中非常重要。
    *   **状态**: Open

10. **[新功能] feat(agent): add off option to reasoning_language to disable injection** ([#6584](https://github.com/esengine/DeepSeek-Reasonix/pull/6584))
    *   **内容**: 为 `reasoning_language` 配置项增加了 `off` 选项，允许用户完全禁用 `<reasoning-language>` 块注入，这是针对部分用户不希望思维链被特定语言指令影响的精细化控制。
    *   **状态**: Open (仍在活跃讨论)

## 功能需求趋势
从过去24小时的社区动态中，我们可以提炼出以下几个关键的功能需求趋势：
1.  **安全与权限精细化管理**: 用户对 Agent 的安全行为高度关注。如 #6927 提出的权限控制、#6930 的细粒度沙箱授权，都指向了**更完善的安全模型**和**用户可控的授权机制**。
2.  **AI 功能集成与智能化**: 用户期望 Agent 具有更强的自主性和记忆力。如 #6928 的全局记忆问题、#6935 的自动备份功能，以及对“终端”功能 (#6891) 的期待，都说明了社区对 **Agent 记忆持久化**和**无缝嵌入式工具**的需求。
3.  **开发体验 (DX) 优化**: 对状态栏信息的增强 (#6931)、对代码字体自定义的支持修复 (#6907)，表明社区在追求更专业、更可控的**开发环境细节**。
4.  **多模态与新模型支持**: 关于 Kimi K3 (#6921) 和 OpenAI 兼容端点的修复 (#6940)，显示了社区对**拥抱新模型、拓宽生态**的强烈愿望。

## 开发者关注点
开发者在反馈和讨论中，集中反映了以下痛点和高频需求：
*   **记忆与上下文管理**: 最核心的痛点。全局记忆不稳定 (#6928)、会话记忆丢失 (#6935)，严重影响了 Agent 的一致性和连续性。
*   **权限与安全边界**: 对 `reasonix run` 等内置命令的权限泛化感到担忧 (#6927)，并期望更清晰、更安全的沙箱机制。
*   **文件系统操作健壮性**: 从工作区外文件访问异常 (#6486) 到路径遍历漏洞 (#6932)，说明 Agent 在执行文件操作时，其边界和安全性是开发者的重点关注对象。
*   **配置与自定义的灵活性**: 开发者希望配置项能提供更细粒度的控制，如完全关闭 reasoning_language 注入 (#6584)、修复符号链接写入问题 (#6938) 以适配更复杂的文件管理环境。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 | 2026-07-26

---

## 今日速览

OpenCode 社区今日无新版本发布，但 **v2 分支暴露出多项严重 Bug**（TUI 黑块遮挡、配置验证过严）引起关注。最受瞩目的议题是 **近期版本中 CPU 占用率飙升的问题（#30086）**，获得 19 个赞和 36 条评论，用户普遍反映软件性能严重退化。与此同时，昨日合并了大量由 `automated-pr-cleanup` 发起的修复 PR，涵盖 VCS、LSP、Provider 兼容性等多方面，表明项目正处于密集的稳定性攻坚阶段。

---

## 版本发布

（暂无）

---

## 社区热点 Issues（10 条）

**1. #30086 [High CPU usage] — 性能严重退化**
🔗 https://github.com/anomalyco/opencode/issues/30086
- **评论/点赞**: 💬36 | 👍19
- **说明**: 社区最关注的议题。自约 7 天前更新后，CPU 占用率急剧飙升，之前可同时运行 10+ 会话，现在 3 个会话已导致鼠标卡顿。性能回归属 P0 级问题，严重影响了日常可用性。

**2. #38773 [2.0] TUI input area covered by black rectangle — v2 分支渲染 Bug**
🔗 https://github.com/anomalyco/opencode/issues/38773
- **说明**: v2 分支在大量工具调用或深度推理时，输入框区域被黑块覆盖，唯一解决方法是重新进入 TUI。严重影响 v2 版本的用户体验和稳定性测试。

**3. #31217 [BUG] TUI prompt input fail on Enter — 核心输入功能故障**
🔗 https://github.com/anomalyco/opencode/issues/31217
- **说明**: 在 TUI 主输入框输入后按回车，文本消失但不提交。中英文均受影响，斜杠命令正常。这种基础交互 Bug 具有极强的“劝退”属性。

**4. #38801 message="exiting loop" — 启动/退出循环崩溃**
🔗 https://github.com/anomalyco/opencode/issues/38801
- **说明**: 用户反复遭遇 "exiting loop" 错误导致 TUI 完全无法使用。此类问题严重阻碍新用户尝试，是必须优先解决的阻塞性故障。

**5. #32613 OpenCode Go: Xiaomi MiMo rejects list-type tool message — API 兼容性**
🔗 https://github.com/anomalyco/opencode/issues/32613
- **说明**: 使用小米 MiMo 模型时，包含图片内容的工具结果请求返回 400 错误。反映了 OpenCode Go 在对接国产模型时的适配缺口。

**6. #15760 Mouse selection is very unreliable — 终端选择文本困难**
🔗 https://github.com/anomalyco/opencode/issues/15760
- **说明**: 一个长期存在的鼠标拖拽选择失灵问题（虽已关闭，但仍具参考价值）。反映了 TUI 在终端文本交互上的“最后一公里”打磨。

**7. #38844 the close button does not work — 桌面版界面冻结**
🔗 https://github.com/anomalyco/opencode/issues/38844
- **说明**: 点击关闭项目按钮后，界面完全假死。桌面版 V1.18.5 的严重 GUI 缺陷，直接影响项目管理和退出流程。

**8. #38904 File tree not updating — 文件树不刷新**
🔗 https://github.com/anomalyco/opencode/issues/38904
- **说明**: 文件系统变更不能及时反映在 UI 文件树面板上，伴有合规标签（需翻译/多语言支持），关注度正在上升。

**9. #38902 Tool execute() receives operation=undefined for enum arg — 边界 Bug**
🔗 https://github.com/anomalyco/opencode/issues/38902
- **说明**: 工具调用中，当 enum 类型参数伴随大数值时，`execute()` 收到 `undefined`。问题隐蔽但影响工具链可靠性。

**10. #38796 V2 config rejects named agent color tokens — v2 配置磨合**
🔗 https://github.com/anomalyco/opencode/issues/38796
- **说明**: v2 配置验证过于严格，拒绝文档明确支持的 `primary`、`secondary` 等颜色 Token。属于 v2 分支配置系统的早期阵痛。

---

## 重要 PR 进展（10 条）

**1. #38903 [feat: ChatGPT OAuth 路由可配置]** (OPEN)
🔗 https://github.com/anomalyco/opencode/pull/38903
- **说明**: 允许插件将 ChatGPT Plus/Pro OAuth 推理请求路由到自定义 `codexApiEndpoint`，提升了集成的灵活性和可定制性。

**2. #36550 [fix: TUI Question Mode 键盘死锁]** (OPEN)
🔗 https://github.com/anomalyco/opencode/pull/36550
- **说明**: 修复 `QuestionPrompt` 组件因 `useBindings` 竞争条件导致的键盘死锁，解决 #36382 和 #30517。

**3. #29789 [feat: 动态工作流功能]** (OPEN)
🔗 https://github.com/anomalyco/opencode/pull/29789
- **说明**: 对标 Claude Code 的重磅新功能！引入本地动态工作流，支持 `/workflow <name> arg=value` 命令，将极大提升自动化能力。

**4. #38901 [fix: 延迟会话自动压缩]** (CLOSED)
🔗 https://github.com/anomalyco/opencode/pull/38901
- **说明**: 将超出上下文阈值的自动压缩操作推迟到下次模型输入时执行，避免中断模型的推理过程，优化长会话管理策略。

**5. #38200 [feat: 新增 Solidity 语法支持]** (OPEN)
🔗 https://github.com/anomalyco/opencode/pull/38200
- **说明**: 为 Solidity 语言提供语法高亮，拓展了 OpenCode 在 Web3/智能合约开发领域的适用性。

**6. #33900 [feat: VCS 后端提交原语]** (CLOSED)
🔗 https://github.com/anomalyco/opencode/pull/33900
- **说明**: Git 源码控制面板的基础设施——实现了无状态的 `/vcs/commit` 后端提交原语，是构建 Git UI 面板的“第一块砖”。

**7. #33927 [fix: 修复数千未跟踪文件导致的崩溃]** (CLOSED)
🔗 https://github.com/anomalyco/opencode/pull/33927
- **说明**: 当仓库包含 1200+ 个未跟踪文件时，VCS 层触发崩溃。此修复显著提升了大型仓库下的稳定性。

**8. #33943 [fix: 恢复时间线滚动位置]** (CLOSED)
🔗 https://github.com/anomalyco/opencode/pull/33943
- **说明**: 持久化每个会话的时间线滚动位置，修复切换 Tab 或刷新后滚动位置丢失的问题，极大改善长会话用户体验。

**9. #33899 [fix: 修复 OpenAI 兼容 API 空内容问题]** (CLOSED)
🔗 https://github.com/anomalyco/opencode/pull/33899
- **说明**: 解决助手消息仅含工具调用时内容为空（`content: ""`）被 OpenAI 兼容代理（如 GLM）拒绝的问题，弥合了兼容性鸿沟。

**10. #33897 [fix: LSP Pyright 虚拟环境初始化正确传递]** (CLOSED)
🔗 https://github.com/anomalyco/opencode/pull/33897
- **说明**: 修复 Pyright LSP 集成，正确发送解释器路径和 `venvPath`/`venv` 参数，确保 Python 虚拟环境分析生效。

---

## 功能需求趋势

从今日的 Issues 与 PRs 中可以提炼出社区五大关注方向：

| 趋势 | 关键词 | 典型 Issue/PR |
|---|---|---|
| **🔄 性能与稳定性** | 高CPU、崩溃、黑块 | #30086, #38801, #38773, #38901 |
| **🧪 v2 版本迭代** | TUI缺陷、配置严苛 | #38773, #38796 |
| **🔗 模型/API 兼容性** | ChatGPT OAuth、国产模型、OpenAI 代理 | #32613, #38903, #33899 |
| **🖥️ TUI 交互体验** | 输入框、鼠标选择、滚动、数字格式化 | #31217, #15760, #33943, #33948 |
| **🛠️ 开发者工具链** | VCS、Solium/LSP、动态工作流 | #33900, #38200, #33897, #29789 |

---

## 开发者关注点

**核心痛点（高频负面反馈）：**
- **性能退化恐惧**：用户对更新后的性能损失极度敏感，CPU 飙升直接影响多任务工作流。
- **基础可靠性不足**：TUI 输入框不可信（回车失效、黑块遮挡）是最大的“劝退因素”。
- **“最后一公里”细节**：滚动丢失、文件树不刷新、鼠标拖拽失效等小 Bug 持续累积疲劳感。
- **非标准 API 壁垒**：与国产模型或中转 API 对接时频繁报错，挫伤用户信心。

**技术与功能期望（高关注度方向）：**
- **Git 可视化面板**：#33900 首发提交原语，社区对 Git UI 面板落地期待很高。
- **动态工作流（Dynamic Workflows）**：#29789 被视为 OpenCode 与 Claude Code 正面竞争的核心差异点，是“AI 自主编程”的关键基础设施。
- **OpenCode Go 生态**：#32613 的反馈表明轻量化 Go 版正在被真实用户测试，跨平台战略值得跟踪。
- **大批量自动化修复**：昨日合并的 `automated-pr-cleanup` 批量化 PR 表明项目维护正在系统化、工程化地推进代码质量。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# 2026-07-26 Qwen Code 社区动态日报

---

## 1️⃣ 今日速览

过去 24 小时内，社区围绕 **IDE 集成** 和 **运行时兼容性** 展开了多轮讨论。最值得关注的是：**VS Code 扩展无法连接 Unity MCP**（#7697）和 **API 错误 520/522 阻塞开发**（#7665）成为用户反馈重点；与此同时，一个修复 DashScope Thinking 模式下工具调用限制的 PR（#7661）被合并，直接解决了影响多款模型的阻塞问题。新功能方面，**Web Shell Git 分支选择器**（#7731）和**子代理模型等级配置**（#7702）提供了更精细的 UX 控制。

---

## 2️⃣ 版本发布

### 💾 v0.21.0-nightly.20260725.1183a4c82
**发布说明**: [查看详情](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.0-nightly.20260725.1183a4c82)

本次 Nightly 包含以下变更：
- **fix(cli)**: 在所有地方以本地时间计算 insight 天数与小时（#7670）
- **refactor(autofix)**: 自动修复模块重构（外延部分）

---

## 3️⃣ 社区热点 Issues

以下为过去 24 小时更新中关注度最高的 10 个 Issue（按紧迫程度排序）。

---

### 🔥 #7665 – error code 520/522 导致无法继续编码
- **链接**: [Issue #7665](https://github.com/QwenLM/qwen-code/issues/7665)
- **标签**: `type/bug`, `category/integration`, `priority/P3`, `status/need-information`
- **状态**: OPEN · 5 条评论 · 0 👍
- **摘要**: 用户安装 Qwen Code 桌面版后立即遇到 HTTP 520/522 错误，表现为连接失败，无法继续开发。急需官方定位原因或给出临时解决方案。

### 🔥 #7697 – Qwen Code VSCode 扩展无法连接 Unity MCP，但 Claude Code 可以
- **链接**: [Issue #7697](https://github.com/QwenLM/qwen-code/issues/7697)
- **标签**: `type/bug`, `category/integration`, `scope/mcp`, `scope/vscode`, `welcome-pr`
- **状态**: OPEN · 4 条评论 · 0 👍
- **摘要**: 用户报告在 VS Code 中使用 Qwen Code 扩展无法执行 Unity MCP 工具，而同样配置下 Claude Code 却可以正常调用。社区认为这可能与 MCP 适配器或权限模型有关。

### 🔥 #7719 – CLI 不显示 token 用量及百分比
- **链接**: [Issue #7719](https://github.com/QwenLM/qwen-code/issues/7719)
- **标签**: `priority/P3`, `type/feature-request`, `category/ui`, `scope/token-management`
- **状态**: OPEN · 3 条评论 · 0 👍
- **摘要**: 用户指出 CLI 界面缺少 Token 消耗统计，无法监控当前会话用量与配额比例。期望在终端会话中看到实时的 token 计数和进度条。

### 🔥 #7732 – Sandbox 运行时仅凭 PATH 存在就选择 Docker，导致可用的 Podman 被隐藏
- **链接**: [Issue #7732](https://github.com/QwenLM/qwen-code/issues/7732)
- **标签**: `priority/P2`, `type/bug`, `category/cli`, `scope/sandbox`
- **状态**: OPEN · 2 条评论 · 0 👍
- **摘要**: 沙箱运行时选择逻辑只检查命令是否在 PATH 中，而不验证其是否真正可用。例如 Docker Desktop 已停止或用户不在 docker 组时，依然优先选择 Docker，使得实际可用的 Podman 被完全忽略。

### 🔥 #7717 – 连续提及多个 skill 时自动补全失效
- **链接**: [Issue #7717](https://github.com/QwenLM/qwen-code/issues/7717)
- **标签**: `priority/P2`, `type/bug`, `scope/commands`, `scope/interactive`, `welcome-pr`
- **状态**: OPEN · 2 条评论 · 0 👍
- **摘要**: 当用户在同一行或连续行输入 `/skill1 /skill2` 时，只有第一个 skill 会触发自动补全，后续的 skill 不会弹出建议列表。该问题回归自某个更新。

### 🔥 #7659 – `tool_choice: "required"` 在 DashScope Thinking 模式下被拒绝（已修复）
- **链接**: [Issue #7659](https://github.com/QwenLM/qwen-code/issues/7659)
- **标签**: `priority/P2`, `type/bug`, `category/core`
- **状态**: CLOSED · 3 条评论 · 0 👍
- **摘要**: 开启 `enable_thinking: true` 后，DashScope 会拒绝 `tool_choice: "required"`（HTTP 400）。Qwen Code 的 memory recall 查询因此失败。对应 PR #7661 已于本次日报周期内合并。

### 🔥 #7712 – 主分支 CI FAIL: E2E Tests（自动报告）
- **链接**: [Issue #7712](https://github.com/QwenLM/qwen-code/issues/7712)
- **标签**: `type/bug`, `status/ready-for-agent`, `autofix/skip`
- **状态**: OPEN · 2 条评论 · 0 👍
- **摘要**: 自动化 CI 监控检测到 `main` 分支的 E2E 测试在 commit `2049d5082343` 上失败，触发 Issue 创建用于追踪和指派自动修复。

### 🔥 #7721 – Bridge 重启导致 qqbot 会话恢复失效（已关闭）
- **链接**: [Issue #7721](https://github.com/QwenLM/qwen-code/issues/7721)
- **标签**: `priority/P1`, `type/bug`, `scope/session-management`
- **状态**: CLOSED · 2 条评论 · 0 👍
- **摘要**: `AcpBridge.loadSession()` 返回 `undefined`，因 `LoadSessionResponse` 缺少 `sessionId` 字段，导致桥接重启后无法恢复会话。已被标记为 P1 紧急 bug，但已于昨日关闭，推测已合并修复。

### 🔥 #7242 – `updateSubagent` 可以修改扩展提供的 agents（架构 bug）
- **链接**: [Issue #7242](https://github.com/QwenLM/qwen-code/issues/7242)
- **标签**: `priority/P2`, `type/bug`, `category/core`, `scope/core`
- **状态**: CLOSED · 3 条评论 · 0 👍
- **摘要**: 扩展提供的 subagent 本应是只读的，但 `SubagentManager.updateSubagent()` 路径会绕过保护，允许修改。这在多扩展并存的场景下可能造成 agent 覆写或冲突。

### 🔥 #7167 – Fleet Shepherd Dashboard（自动化仪表板）
- **链接**: [Issue #7167](https://github.com/QwenLM/qwen-code/issues/7167)
- **标签**: `status/need-information`, `scope/ci-cd`
- **状态**: OPEN · 4 条评论 · 0 👍
- **摘要**: 由 Fleet Shepherd 工作流自动维护的仪表板 Issue，持续面向 PR 扫描与同步状态。本期 tick 显示扫描信号延时 20 分钟，无调度异常，但为项目 CI 灰度与回滚提供了关键参考。

---

## 4️⃣ 重要 PR 进展

从过去 24 小时更新的 50+ PR 中精选 10 项关键变更（按功能重要性排序）。

---

### 📌 #7702 – feat(core): 支持子代理的模型等级选择
- **链接**: [PR #7702](https://github.com/QwenLM/qwen-code/pull/7702)
- **状态**: OPEN · 作者: @yiliang114
- **摘要**: 为 Agent Tool 新增 `model` 参数，允许 AI 在 spawn 子代理时选择用户定义的模型等级（如 "small"、"high"）。等级与具体模型映射通过设置 `agents.modelGrades` 和 `agents.allowedGrades` 配置，不绑定特定提供商，极大增强了子代理调用的灵活性。

### 📌 #7731 – feat(web-shell): Git 分支选择器、提交对话框与 PR 流程
- **链接**: [PR #7731](https://github.com/QwenLM/qwen-code/pull/7731)
- **状态**: OPEN · 作者: @wenshao
- **摘要**: 在 Web Shell 中实现了 IntelliJ 风格的分支选择弹窗，支持搜索过滤、本地/远程分组、checkout、新分支创建、提交对话框以及发起 PR 的全套流程。是 Web 端 Git UX 的一次大升级。

### 📌 #7661 – fix(core): DashScope thinking 模式下禁止强制发 required 工具
- **链接**: [PR #7661](https://github.com/QwenLM/qwen-code/pull/7661)
- **状态**: CLOSED (MERGED) · 作者: @hogeheer499-commits
- **摘要**: 直接解决 Issue #7659。当 DashScope 开启 thinking 时，不再发送 `tool_choice: "required"`，强制工具选择将只在 thinking 关闭或非 DashScope 提供商时生效。避免 memory recall 等侧查询因为 400 错误而失败。

### 📌 #7203 – fix(core): 当捆绑的 ripgrep 不能运行时回退到系统 rg
- **链接**: [PR #7203](https://github.com/QwenLM/qwen-code/pull/7203)
- **状态**: CLOSED · 作者: @harjothkhara
- **摘要**: 解决 64K 页面大小 ARM64 等环境问题（#2676）。现在 ripgrep 选择会验证二进制是否真正可执行，若捆绑版失败则自动回退到系统安装的 `rg`，并持续保持回退状态。

### 📌 #7724 – fix(web-shell): 允许在新任务中直接执行 shell 命令
- **链接**: [PR #7724](https://github.com/QwenLM/qwen-code/pull/7724)
- **状态**: OPEN · 作者: @wenshao
- **摘要**: 改进 `!` 命令体验：新任务中直接键入 `!command` 会自动延后创建 session（使用与普通消息相同的路径），不再显示 “No active session” 错误；同时智能地在合并窗口中复用现有 session，避免冗余确认。

### 📌 #7714 – feat(memory): 保护 pinned 文件不被 forked Dream 修改
- **链接**: [PR #7714](https://github.com/QwenLM/qwen-code/pull/7714)
- **状态**: OPEN · 作者: @destire-mio
- **摘要**: 为 memory 层增加 opt-in 权限门，禁止 forked Dream Worker 对 `pinned/` 下的文件进行 `write_file` 或 `edit`；consolidation 阶段也会跳过 pinned 文件。保护关键配置免受子线程误写。

### 📌 #7725 – fix(ci): 去摸 E2E 测试中的 tool-control 用例 + 自动识别 flake
- **链接**: [PR #7725](https://github.com/QwenLM/qwen-code/pull/7725)
- **状态**: OPEN · 作者: @yiliang114
- **摘要**: 将 5 个频繁波动的 `tool-control.test.ts` 用例从真实模型迁移到 `fake-openai-server`，使结果确定可预测；同时在 autofix 工作流中添加 flake 检测前置检查，避免 “自恢复” CI 失败被错误关闭。

### 📌 #7531 – fix(core): 完善 AUTO destructive-git 守卫，填补 force 与 checkout 缺口
- **链接**: [PR #7531](https://github.com/QwenLM/qwen-code/pull/7531)
- **状态**: OPEN · 作者: @chinesepowered
- **摘要**: 扩大 `DESTRUCTIVE_GIT_PATTERNS` 的正则覆盖，确保本意阻止的 `git clean` 和 `git checkout` 的各种拼写（如 `git checkout --force`）均不能被绕过。不新增禁止命令，仅收紧已有规则的匹配。

### 📌 #7197 – fix(core): `exit_plan_mode` 后从历史记录中移除 plan 参数
- **链接**: [PR #7197](https://github.com/QwenLM/qwen-code/pull/7197)
- **状态**: OPEN · 作者: @zjunothing
- **摘要**: 用户或 leader 批准 `exit_plan_mode` 后，tool scheduler 会将模型 turn 的 `functionCall` 历史中的 `plan` 参数替换为一个指向 plan 文件的短指针，避免大量明文计划文本留在历史记录里，保护隐私与上下文窗口。

### 📌 #7620 – fix(web-shell): 正确解析 256 色和 truecolor 转义序列
- **链接**: [PR #7620](https://github.com/QwenLM/qwen-code/pull/7620)
- **状态**: OPEN · 作者: @chinesepowered
- **摘要**: Web Shell 的 `parseAnsi` 此前将所有 SGR 参数按 `;` 分割并当独立代码处理，导致 `38;2;R;G;B` 等扩展前景色被错误解析。此 PR 正确消费这些连续参数，让终端输出颜色更准确。

---

## 5️⃣ 功能需求趋势

从过去一周的 Issue 与 PR 中可以提炼出以下社区最关注的功能方向：

| 方向 | 具体体现 | 热度 |
|------|----------|------|
| **IDE 集成与 MCP 支持** | Unity MCP 连接失败、VS Code 扩展权限问题 → 反映用户希望 Qwen Code 能与更多游戏引擎/编辑器工具链深度打通 | ⭐⭐⭐⭐⭐ |
| **Token/配额透明化** | #7719 CLI 显示 token 用量，用户强烈要求实时资源监控 | ⭐⭐⭐⭐ |
| **技能系统灵活配置** | #7347 提供 overridable defaultDisabled、#7717 多 skill 自动补全，指向技能系统的可配置性与稳定性需求 | ⭐⭐⭐⭐ |
| **沙箱/容器降级策略** | #7732 沙箱选择过于粗暴，社区期待更智能的容器运行时 fallback | ⭐⭐⭐⭐ |
| **新模型/API 兼容** | #7659 DashScope thinking 模式限制暴露了 provider 差异，用户希望兼容更多模型特性 | ⭐⭐⭐ |
| **子代理资源控制** | #7702 引入模型等级选择，用户希望在性能与成本之间灵活权衡 | ⭐⭐⭐ |

---

## 6️⃣ 开发者关注点

根据过去 24 小时的反馈，开发者在日常使用中遇到的主要痛点包括：

- **阻塞级错误频发**：HTTP 520/522（#7665）与 MCP 不通（#7697）直接导致开发停滞，官方需要给出明确的排查指南或热修复。
- **自动补全面板不可靠**：多 skill（#7717）自动补全失效，严重影响编配多任务的效率（welcome-pr 标签表示社区期待贡献者参与）。
- **资源消耗不可见**：Token 用量完全透明（#7719），无法做成本控制，尤其对于按 token 计费的用户。
- **容器环境误判**：沙箱运行时选择（#7732）不验证 daemon 存活性，导致有 Docker 但不可用时无法自动切换 Podman，拉低了 Linux/容器用户的友好度。
- **配置锁定问题**：技能 denylist 的硬锁定（#7347）让用户无法在项目层覆盖用户层的禁用，虽然已转为用例讨论，但仍在等待合入方案。

> 本次日报数据区间：2026-07-25 00:00 UTC – 2026-07-26 00:00 UTC  
> 数据来源：github.com/QwenLM/qwen-code  
> 生成时间：2026-07-26

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报 — 2026-07-26

## 1. 今日速览
过去 24 小时社区持续高活跃，共更新 28 个 Issue 和 50 个 Pull Request。**Desktop 应用的无障碍缺陷**（屏幕阅读器被计时器刷屏、缺乏语音快捷键）和 **网关多实例稳定性**（飞书冲突、LINE 预算管理）成为社区讨论焦点。此外，一项重大 PR 将 **Claude Agent SDK** 引入为首要 Provider，标志着模型接入层的显著扩展。

## 2. 版本发布
过去 24 小时内无新版本发布。

## 3. 社区热点 Issues（10 个）

### 1. Dashboard 跨标签页会话泄露与 `/new` 卡死 📌
**#62726** `[P2, type/bug]`
多 Tab 场景下出现会话数据相互泄露，执行 `/new` 后 TUI 完全卡死，需重启容器。严重影响多任务效率，社区正积极提供复现步骤。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/62726)

### 2. 屏幕阅读器被会话计时器持续轰炸 🎯
**#71657** `[P3, comp/desktop]`
新 Bug：Desktop 在 `aria-live` 区域渲染了每秒刷新的计时器，导致 NVDA 等无障碍工具持续播报时间，用户无法正常阅读或输入。这是严重的无障碍回归。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/71657)

### 3. 请求为语音输入添加键盘快捷键 🎤
**#71658** `[P3, type/feature]`
新 Feature：用户希望为 Desktop 的 Dictation 功能绑定快捷键（类似 ChatGPT）。目前只能依靠指针操作，打断了核心输入流。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/71658)

### 4. UTF-8 BOM 头导致 `.env` 文件首个 Key 静默丢失 ⚠️
**#65123** `[P2, CLOSED]`
如果 `.env` 以 BOM 开头，运行时会静默忽略首个配置项。若该 Key 是 API Key，系统会表现为完全无 Provider 配置，且没有任何报错。已修复。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/65123)

### 5. Desktop 测试套件因宿主 Locale 不同而确定性失败 🌐
**#71659** `[P3, comp/desktop]`
在 `en-DE` 语言环境下，四条 UI 测试题会确定性失败。生产代码使用了宿主语言环境进行格式化，而测试代码未做相应处理，暴露出 i18n 测试覆盖不足。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/71659)

### 6. CLI `/reload-mcp` 命令导致终端完全冻结 ☠️
**#39418** `[P2, comp/cli]`
手动触发 `/reload-mcp` 后交互式 CLI 终端完全无响应，只能强制关闭窗口。严重阻碍调试 MCP 工具链的开发流程。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/39418)

### 7. Langfuse 观测性集成在更新后静默停止 🔇
**#59026** `[P3, comp/plugins]`
官方文档推荐的 Langfuse 追踪方案在 Hermes 升级或 venv 刷新后，若 `langfuse` SDK 被移除，追踪功能会静默中断，且无任何告警。暴露了 observability 栈的依赖生命周期管理缺陷。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/59026)

### 8. 飞书（Feishu）网关多实例冲突 💬
**#71645** `[P2, comp/gateway]`
macOS 用户反馈：launchd 管理的多网关实例配置下，飞书平台出现 `Another local Hermes gateway is already using this Feishu app_id` 错误。社区正在讨论 `--replace` 机制的修复方案。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/71645)

### 9. 请求完善本地 STT 文档以强化隐私 📄
**#56989** `[P3, type/docs]`
社区呼吁为“完全本地语音转录（MLX + CUDA）”提供一流的配置示例和文档。用户希望在 Telegram/Discord 等平台上将音频保留在本地处理，这是对隐私计算的核心诉求。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/56989)

### 10. 插件工具集验证顺序错误导致误报 🔧
**#71650** `[P3, comp/cli]`
新 Bug：`validate_platform_toolsets()` 在插件加载之前执行。所有由插件注册的工具集都会触发 `Warning: Unknown toolsets:` 误报，影响用户体验。
[查看详情](https://github.com/NousResearch/hermes-agent/issues/71650)

## 4. 重要 PR 进展（10 个）

### 1. 修复 Windows 授权存储竞态条件 🛡️
**#71655** `fix(auth)`
重新设计了 `atomic_replace()` 的重试逻辑，并防止 `_load_auth_store()` 将瞬态 I/O 错误误判为 JSON 损坏，显著提升 Windows 平台认证存储的健壮性。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/71655)

### 2. LINE 平台新增预算感知慢速投递 💲
**#71656** `feat(line)`
新增 `slow_response_mode: auto_push` 模式，能够检查 LINE 月度配额余量并在接近上限时自动切换为保底投递。面向商业化运营场景的务实优化。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/71656)

### 3. 修复 `session_search` 工具资源句柄泄漏 ♻️
**#71660** `fix(tools)`
修复 `session_search()` 内部打开 `SessionDB` 后未及时关闭的缺陷，防止长期运行 Agent 中的资源泄漏。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/71660)

### 4. 重磅：集成官方 Claude Agent SDK 🚀
**#65982** `feat(providers)`
将 Claude Agent SDK 实现为 Hermes 一级 Provider（`provider: claude-agent-sdk`）。支持通过订阅 OAuth 计费，底层调用 Claude Code CLI，Hermes 仍保留自己的 Agent 循环和编排能力。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/65982)

### 5. Desktop 启动时优雅处理后端 401 错误 💻
**#71205** `fix(desktop)`
新版 Desktop 的健康检查路径被认证网关拒绝后未正确回退，导致陷入“连接中”死循环。此 PR 增加了回退逻辑以兼容旧版本路由。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/71205)

### 6. 网关次级配置文件致命错误重连屏蔽 🧅
**#71646** `fix(gateway)`
修复次级配置文件网关适配器在卸载时因回调被取消而导致重连失败的问题。主适配器已有此保护，现补齐次级配置的漏洞。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/71646)

### 7. 新增 `curator adopt` 接管未托管技能 🛠️
**#71648** `feat(curator)`
`hermes curator status` 现在会显示其无法管理的技能，并允许通过 `hermes curator adopt` 将其纳入 Curator 的统一管理框架中，解决上百个技能库的管理盲区。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/71648)

### 8. Relay 网关第 4 阶段：线程生命周期 🔗
**#71624** `feat(relay)`
实现了 Relay 适配器网关侧的线程交接、语义重命名、回复上下文传递及 Hello 命令清单功能。Relay 功能向生产可用迈出关键一步。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/71624)

### 9. `hermes doctor` 命令识别外部密钥源 🩺
**#71647** `fix(doctor)`
改进诊断工具，使其能够正确识别通过 Bitwarden、1Password 等外部密钥服务解析到环境变量中的凭证，消除了“无 API Key”的误报。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/71647)

### 10. 插件注册失败日志等级提升至 WARNING 🐛
**#71651** `fix(context-engine)`
插件上下文引擎 `register()` 构造器抛出异常时，日志等级从 DEBUG 提升至 WARNING 并附带完整 Traceback。有助于开发者快速定位插件加载失败的问题。
[查看详情](https://github.com/NousResearch/hermes-agent/pull/71651)

## 5. 功能需求趋势

从社区 24 小时内的讨论中，可以归纳出三大核心功能方向：

1. **无障碍建设（Accessibility）**：Desktop 应用正迎来一波无障碍治理。从屏幕阅读器被计时器刷屏 (`#71657`)，到语音输入缺乏快捷键 (`#71658`)，再到要求隐藏状态栏计时器 (`#62981`)，社区对“工具公平性”的关注度明显上升。
2. **Provider 生态深度扩展**：用户不再满足于标准 API 接入。`claude-agent-sdk` 的重磅 PR (`#65982`) 和 `delegate_task` 的按调用模型覆盖提案 (`#71245`) 共同指向了一个趋势：用户希望以 Hermes 为编排层，灵活调度不同模型和 Provider。
3. **平台网关精细化运营**：从简单连通走向精细运营。LINE 的预算感知投递、飞书的多实例冲突修复、Matrix 的 `@room` 检测优化，都表明社区对网关的生产级稳定性要求越来越高。

## 6. 开发者关注点

综合当天 Issue/PR 反馈，开发者在实际使用中的核心痛点如下：

*   **静默失败是第一大敌人**：无论是 `.env` 的 BOM 头被默默忽略 (`#65123`)、Langfuse 追踪静默停止 (`#59026`)，还是插件验证误报 (`#71650`)，系统在异常时缺乏明确的用户反馈，导致问题排查极难。
*   **Plugin 系统时序与依赖脆弱性**：插件加载时序问题（`#71650`）和依赖生命周期管理缺陷（`#59026`）反复出现。开发者需要一个更可靠的 Plugin 隔离环境和更清晰的初始化契约。
*   **Session 状态管理的强一致性需求**：桌面端跨标签页会话泄露（`#62726`）和 CLI 侧 `/reload-mcp` 的致命死锁（`#39418`）表明，Session 的隔离性与操作容错性是当前风险的集中爆发点。
*   **跨平台打磨任重道远**：Windows 非 ASCII 路径问题（`#60447`）、macOS 空格路径问题（`#38163`）以及 Locale 敏感的测试失败（`#71659`）反复出现，跨平台测试覆盖仍需系统性加强。

</details>

</div>
