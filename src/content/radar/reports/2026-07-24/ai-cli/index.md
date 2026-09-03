---
title: AI CLI 工具社区动态日报
published: 2026-07-24
report: ai-cli
tags:
  - radar
  - AI
---
# AI CLI 工具社区动态日报 2026-07-24

> 生成时间: 2026-07-24 00:34 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-07-24）

---

## 1. 生态全景

当前 AI CLI 工具赛道正经历从“功能扩展”向“信任构建”的范式转换。MCP 协议虽已成为行业公认的扩展标准，但所有工具在认证缓存、OAuth 合规和工具分发的“最后一公里”上普遍存在可靠性短板，用户正在为生态统一支付高昂的调试成本。另一方面，**Agent 行为的不可预测性**（虚假成功、无限挂起、成本黑洞）已成为社区声讨的焦点，超过了对新功能缺失的不满。与此同时，工具间的分化加速：部分项目追求激进的体验创新（DeepSeek）、部分聚焦底层工程加固（Gemini CLI、Hermes），而头部玩家则因商业化进程暴露出定价与信任管理的深层挑战（Claude Code）。

---

## 2. 各工具活跃度对比

| 工具 | 热点议题数 | 重要 PR 数 | 版本发布 | 当日社区情绪基调 |
|---|---|---|---|---|
| Claude Code | 10 | 5 | 0 | 🔴 信任危机（Fable 计费门 + 权限绕过） |
| OpenAI Codex | 10 | 10 | 3 Alpha 🏆 | 🟡 高迭代速度，Windows 积怨加深 |
| Gemini CLI | 10 | 13+（含 SSR 管线） | 1 Nightly | 🟢 深度工程化，AI for OSS 亮点 |
| DeepSeek Reasonix | 10 | 10 | 0 | 🟠 极度激进，Auto Guard 争议白热化 |
| OpenCode | 10 | 10 | 0 | 🟢 稳定生态，温和演进 |
| Qwen Code | 8 | 10 | 0 | 🟢 响应迅速，渠道/多模态深耕 |
| Hermes Agent | 9 | 10 | 0 | 🟡 MoA 方向聚焦，SQLite 瓶颈待解 |

*数据说明：议题和 PR 数以当日社区热点列表/更新列表为准。*

---

## 3. 共同关注的功能方向

### 3.1 MCP 工程化与标准化（全工具参与）
几乎所有工具都在 MCP 协议的具体实现上出现了相似的问题：
- **认证缓存污染**（Claude #80635, Gemini #28481）：缓存以 Server 名称为唯一键，缺乏配置源隔离，导致跨配置认证混乱。
- **协议合规短板**（Claude #80731, Gemini #28481）：忽略 OAuth 标准发现机制、Token 刷新路径错误，私有化部署受阻。
- **子代理工具丢失**（Claude #80733, Codex #34658, Hermes #70280）：子 Agent 继承工具集不完整或残留泄漏。

### 3.2 上下文压缩的透明化（Codex, Claude, Hermes, Gemini）
社区不再接受“黑盒压缩”：
- **Codex** 用户要求压缩遥测面板（#22220）、抱怨压缩后配额立刻回弹（#35032）。
- **Hermes** 提出双阶段修剪 + 压缩策略（#513）和空闲预压缩（#29390）。
- **Claude** 出现系统提示被实验载荷污染且无法关闭（#80600）。
- **核心诉求**：压缩了什么、何时发生、剩余窗口多大，这些必须对用户可视化。

### 3.3 权限系统的可预测性（Claude, DeepSeek, Qwen）
- **Claude** 权限系统同时存在“破坏性命令全程静默”（#80730）和“只读命令频繁弹窗”（#62135）的矛盾。
- **DeepSeek** 的 Auto Guard 引发用户反弹（#6844, #6886），社区反应是这类工具最激烈的安全策略争辩。
- **Qwen** 补全了 Git 破坏性命令的黑名单（#7531）。
- **共识**：安全系统必须 **可配置、可解释、可撤销**，目前“该管的不管、不该管的瞎管”是最大体验痛点。

### 3.4 成本与用量的可观测性（Claude, Codex, OpenCode, Hermes）
- **Claude** Fable 计费门（#79337）成为本周最具情绪冲击的议题，API 用量透明化（#80732）呼声极高。
- **OpenCode** 月度限额仪表盘与明细仪表盘数据不一致（#38255）。
- **Hermes** Gateway 重启后费用预估归零（#67762）。
- **趋势**：Agent 自主性越强，“FinOps” 化越不能缺失，用户需要对每一笔 Token 去向有精确记录。

### 3.5 平台一致性与长期可靠性（Codex, Claude, DeepSeek, OpenCode）
- **Windows 支持**：Codex（换行符 #4003、WSL #28074、沙箱 Git #31073）、Claude（渲染 #49985）、DeepSeek（WSL 切换丢历史 #6874）、OpenCode（快捷键 #38585）均有多项未解决的 Windows 问题。
- **会话与状态死锁**：Gemini Agent 假死（#21409）、Hermes WebSocket 冻结（#69930）、DeepSeek 会话被吞（#6873）、Claude 登录状态死锁（#80605）。

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 功能侧重 | 目标用户 | 技术路线特点 |
|---|---|---|---|---|
| **Claude Code** | 企业级 Agent 平台 | 深度 MCP / IDE 集成，多子代理协作 | 企业开发团队 | 高端商业化，社区对计费极为敏感 |
| **OpenAI Codex** | 通用 AI 编程伴侣 | 高发布频率，浏览器控制/Guardian 2.0 安全层 | 全栈开发者 | 快速集成新模型/新能力，平台债积累明显 |
| **Gemini CLI** | 开发者基础架构 | SSR 自动修 Bug 管线，组件级评估体系 | 平台工程师 / OSS 维护者 | 从“AI 辅助开发”转向“AI 维护自身” |
| **DeepSeek Reasonix** | Vibecoding 体验标杆 | Planner MCP 工具编排，Auto Guard 安全实验 | 独立开发者 / 中小企业 | 激进功能迭代，用户体验与安全边界剧烈碰撞 |
| **OpenCode** | 开放插件平台 | SDK 钩子系统，MCP 元数据透传，CodeMode | 定制化工作流构建者 | 低争议、高扩展性，增量改进为主 |
| **Qwen Code** | 多模态全渠道 Agent | 图像/视频输入，微信/Telegram 渠道，Web Shell | 多元生态开发者 | 渠道适配投入大，多模态率先落地 |
| **Hermes** | 模型路由与混合 Agent (MoA) | MoA 编排、Advisor 可视化、多 Provider 统一 | AI 基础设施开发 / 提示词工程师 | 技术深度最高，复杂度与可靠性纠缠 |

---

## 5. 社区热度与成熟度

- **Claude Code**：成熟度最高，但信任基础正遭受 Fable 计费门的侵蚀。社区对 BUG 的容忍度极低，期望值极高。**危机与成熟并存**。
- **OpenAI Codex**：**高速迭代期**。3 个 Alpha 版 + 多项 PR 合并证明了工程速度，但 Windows 和资源泄漏问题长时间未解决，社区耐心在消耗。
- **Gemini CLI**：工程成熟度高，SSR 自动修复管线是本期最大亮点。社区偏技术向，情绪相对稳定，**架构红利期**。
- **DeepSeek Reasonix**：**争议与热度最高**。Auto Guard 引发的讨论是行业级的。用户黏性强但观点极化，处于“快速扩张 + 规则重建”的混乱阶段。
- **OpenCode**：成熟稳定。低戏剧性，生态平滑演进，是可预期性最高的选择之一。
- **Qwen Code**：活跃增长。渠道适配速度快、Bug 响应积极（当天修复 Telegram/后台进程问题），社区满意度高。
- **Hermes**：技术导向深度社区。MoA 方向吸引了高阶用户，但 SQLite 状态层和 Gateway 稳定性是公认的待硬化板块。

---

## 6. 值得关注的趋势信号

### 6.1 “MCP 税”成为新的生态成本
MCP 虽统一了扩展标准，但认证缓存污染、OAuth 刷新失败、子代理工具中断等 Bug 在所有工具中反复出现。**这预示着“MCP 网关 / MCP 防火墙”类基础设施工具的蓝海市场**——用户需要一层中间件来处理跨认证源隔离、路由分发和缓存一致性。

### 6.2 安全策略必须从“黑箱执法”走向“用户可控”
DeepSeek Auto Guard 争议、Claude 权限系统分裂、Qwen Git 模式补全，这些事件共同指向一个结论：**用户拒绝被无法理解的 Vanna 规则打断工作流**。透明、可配置、按会话或按操作级别调整的安全模式，将成为下一代 Agent 产品的标配。

### 6.3 “Agent FinOps” 是制约自主性提升的隐性天花板
Fable 计费门、仪表盘数据冲突、Token 压缩黑盒——当 Agent 越自主，成本失控的恐惧就越抑制使用深度。**集成式成本预测 + 实时用量仪表盘 + 程序化 API** 的“AI 费用管理”工具将迎来爆发需求。

### 6.4 “AI 维护 AI” 从实验走向工程
Gemini CLI 的 SSR 管线（Issue 到 PR 自动生成）是本期最具战略信号意义的事件。**用 AI CLI 自动修复 AI CLI 自身的 Bug**，这是“Dogfooding”的终极形态，将深刻改变 OSS 维护的效率模型。

### 6.5 多 Agent 可靠性是共同的“无人区”
虚假成功上报、子代理工具丢失、进程残留泄漏、上下文状态错乱——这些跨工具反复出现的问题暴露出 **“多 Agent 场景缺乏成熟的测试框架”**。当 Agent 从“单轮问答”走向“多步协作”，竞态条件、状态死锁和资源泄漏将成为 Agent 工程的下一个主战场。

### 6.6 平台一致性 = 市场差异化窗口
Windows 支持、跨渠道消息、终端高刷新率、PWA 移动端——那些快速补齐平台短板的工具（Qwen 在 IM 渠道的投入、Hermes 的 PWA 支持）正在收割被头部工具忽视的用户。**这不是锦上添花，而是雪中送炭**。

---

*总结：2026 年下半年的 AI CLI 赛道，竞争焦点正从“谁更智能”转向“谁更可靠、透明、可控”。MCP 生态统一了方式，但也暴露了标准化落地的阵痛；商业化进程迫使定价和计费系统接受最严苛的信任考验；而多 Agent 协作的工程复杂性，正成为区分“演示级产品”与“生产级工具”的关键分水岭。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

好的，以下是基于 `github.com/anthropics/skills` 数据生成的 Claude Code Skills 社区热点动态分析报告。

---

### Claude Code Skills 社区热点动态报告（截至 2026-07-24）

---

### 1. 热门 Skills 排行（按社区关注度与讨论深度排序）

#### 🔥 #1 `skill-creator` 修复集 (PR #1298 / #1099 / #1323 / #1050)
- **功能**：系统性修复 `run_eval.py` 始终报告 **0% recall** 的致命缺陷，同步修正 Windows 子进程、触发检测与 YAML 解析的多平台兼容性问题。
- **热点**：关联 Issue #556 获得 12 条回复、10 次独立复现，被形容为“当前优化循环在对抗噪声”。社区超过 6 个 PR 同时从不同角度解决同一问题，是仓库史上最大规模的补丁追逐战。
- **状态**：Open
- **链接**：[https://github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

#### 🗣️ #2 文档排版质量（PR #514）
- **功能**：解决 AI 生成文档中的孤词行（Orphan）、段首孤行（Widow）与编号错位问题，通过 `SKILL.md` 提供可执行的排版规则。
- **热点**：社区普遍认为“用户很少要求排版，但严重影响专业感”，这是一个高 ROI 的隐性需求。讨论集中在如何定义排版阈值与是否支持更深的版式引擎。
- **状态**：Open
- **链接**：[https://github.com/anthropics/skills/pull/514](https://github.com/anthropics/skills/pull/514)

#### 🤖 #3 自审计推理质量门禁（PR #1367）
- **功能**：开创性的“元技能”，在输出交付前执行：①机械文件核验 → ②四维推理审计（按危害优先级排序）。
- **热点**：号称“通用、无堆栈依赖”，社区围绕该技能是否应成为默认系统内置展开激烈争论。作者近期持续迭代（v1.3.0），互动密度极高。
- **状态**：Open
- **链接**：[https://github.com/anthropics/skills/pull/1367](https://github.com/anthropics/skills/pull/1367)

#### 🧪 #4 测试模式（PR #723）
- **功能**：覆盖 AAA 单元测试、React Testing Library、集成测试，并明确“不要测试什么”的反模式清单。
- **热点**：填补了社区对工程化测试行为的空白需求，用户反馈其架构清晰、可直接用于生产项目。被视为官方测试 Skill 的最佳候选人。
- **状态**：Open
- **链接**：[https://github.com/anthropics/skills/pull/723](https://github.com/anthropics/skills/pull/723)

#### 🎨 #5 颜色专家（PR #1302）
- **功能**：整合 ISCC-NBS、Munsell、XKCD、CSS 命名与 CAM16 色貌模型，提供“什么场景用什么色彩空间”决策表。
- **热点**：展示了领域专家型 Skill 的设计范式，社区频繁引用其作为“深度垂直 Skills”的范本。
- **状态**：Open
- **链接**：[https://github.com/anthropics/skills/pull/1302](https://github.com/anthropics/skills/pull/1302)

#### 📄 #6 ODT 文档技能（PR #486）
- **功能**：支持创建、填充、读取、转换 OpenDocument 格式（.odt / .ods），以及 ODT 转 HTML。
- **热点**：直接回应对 LibreOffice/ISO 标准格式的支持渴求，讨论集中在与 `docx` 技能的边界定义和模板填充策略上。
- **状态**：Open
- **链接**：[https://github.com/anthropics/skills/pull/486](https://github.com/anthropics/skills/pull/486)

---

### 2. 社区需求趋势（从 Issues 提炼）

1. **安全与信任危机（最高优先级）**
   - Issue #492 指出社区 Skill 在 `anthropic/` 命名空间下分发带来的 **信任边界滥用风险**，获得 **43 条评论**（全库最高），已从技术问题演变为社区治理基线问题。

2. **组织级协作与分发**
   - Issue #228（👍 7）呼吁支持 **组织内 Skill 直链共享**，而非手工发送 .skill 文件。表明 Skills 已从个人玩具进入团队生产环境。

3. **基础工具链稳定性**
   - Issue #556（👍 7）和 #1061 反映 `skill-creator` 在 Windows 与 Linux 下均存在严重评估 bug，大量开发者被卡在“写技能但无法验证”的循环中，用户体验降到冰点。

4. **智能体治理与元控制**
   - Issue #412（Agent Governance）与 #1329（Compact Memory）代表了社区开始关注 **多轮智能体的自我约束与状态压缩策略**，这是高级用户突破上下文窗口瓶颈的关键方向。

5. **文档格式无缝覆盖**
   - Issue #189（重复 Skills）与 #1175（SharePoint 权限）表明社区对文档类 Skills 的阵容和质量要求越来越高，且开始关注生态兼容性（如 SPO）和安装去重。

---

### 3. 高潜力待合并 Skills（评论活跃、尚未合并、近期可能落地）

| PR  | 技能名称 | 近期落地潜力 | 要点 |
|------|----------|----------|------|
| **#1298** | `skill-creator` 0% recall 修复集 | ⭐⭐⭐⭐⭐ | **最高优先级**，阻塞了整个生态的迭代循环。多个修复 PR 正在整合，预计近期会有一个超级合并 Commit。 |
| **#1367** | `self-audit` 推理质量门禁 | ⭐⭐⭐⭐ | 概念验证完成度极高，作者更新频繁。若 Anthropic 官方将其降维并入内置工具链或直接合并，将对高级用户产生巨大价值。 |
| **#723** | `testing-patterns` | ⭐⭐⭐⭐ | 工程化完成度高、无争议。一旦 `skill-creator` 修复合入，该 PR 很可能作为首个优质内容被快速合并。 |
| **#1302** | `color-expert` | ⭐⭐⭐ | 领域知识体系成熟，无技术风险。适合作为“Hackathon 范式”被合并以鼓励更多垂直领域技能投稿。 |
| **#514** | `document-typography` | ⭐⭐⭐ | 极具实用价值，但需要和现有文档技能包确定边界。若 Anthropic 认可“排版即质量”的策略，该 PR 会立刻转正。 |

---

### 4. Skills 生态洞察（一句话总结）

> **当前社区最集中的诉求是：“必须优先解决 skill-creator 工具链崩溃（0% recall）与 Windows 不可用这两大基础设施危机，并在修复地基后，立即建立安全的社区命名空间治理机制，从而解锁对企业级文档质量、自动化测试与组织级共享的旺盛需求。”**

社区的动态清晰地显示：**生态正在从“野蛮生长”的 prototyping 阶段，转向对“可靠性、安全性、工程化”要求极高的 production 阶段。** `skill-creator` 的 Bug 修复集（#1298）与命名空间信任讨论（#492）将成为决定这一转折速度的关键路口。

---

# Claude Code 社区动态日报 (2026-07-24)

## 1. 今日速览

Fable 5 模型在 Max 计划中的上线演变为一场严重的信任危机——用户被错误提示需额外付费并强制降级至 Opus 4.8，相关 Issue 讨论热度为近期最高（#79337, #80382）。权限系统同样陷入争议，既出现破坏性命令绕过拦截的严重安全漏洞（#80730），也有缓存污染、协议标准不符等底层实现问题暴露（#80635, #80731）。在功能需求侧，社区对订阅用量透明化（API 接入）和 MCP 协议标准化的呼声显著升高。

## 2. 版本发布

过去 24 小时内无新版本发布。

## 3. 社区热点 Issues

### 1. #79337 [BUG] Fable 5 错误提示 Max 用户"需要用量积分"
🔗 https://github.com/anthropics/claude-code/issues/79337  
评论 39 | 👍 12 | **开启中**  
**重要性：** 过去一周热度最高的事件。Fable 5 在 7 月 20 日被正式纳入 Max 计划标准权益，但系统却在用户使用时弹窗提示需要积攒"Usage Credits"，并静默降级至 Opus 4.8。此 BUG 直接触及产品核心价值主张，社区要求官方明确计费逻辑和修复时间表，大量用户质疑 Max 计划的定价可信度。

### 2. #49985 [BUG] Windows 终端会话内容多次重复渲染
🔗 https://github.com/anthropics/claude-code/issues/49985  
评论 8 | 👍 22 | **开启中**  
**重要性：** 长期未解决的 TUI 问题，社区投票数最高。终端界面内容被重复渲染堆叠，严重影响代码阅读和操作，波及大量 Windows 平台的日常用户。

### 3. #37628 [BUG] VSCode 重命名会话后终端标签不同步
🔗 https://github.com/anthropics/claude-code/issues/37628  
评论 11 | 👍 14 | **开启中**  
**重要性：** IDE 集成体验的典型割裂问题。用户在侧边栏手动重命名会话后，终端 Tab 标题并未同步更新；下一轮对话发生后自定义名称直接被系统覆盖，使重命名功能形同虚设。

### 4. #80016 [BUG] Windows 文件系统扩展握手成功后工具无法分发
🔗 https://github.com/anthropics/claude-code/issues/80016  
评论 9 | 👍 0 | **开启中**  
**重要性：** MCP 协议缺陷典型案例。Filesystem 扩展的初始化握手正常通过，但 `tools/call` 请求从未被真正分发至目标工具，重装无法解决，严重阻碍自定义 MCP 扩展的正常使用。

### 5. #80382 [BUG] Fable 5 对 Max 用户显示矛盾的可用性提示
🔗 https://github.com/anthropics/claude-code/issues/80382  
评论 3 | 👍 0 | **开启中**  
**重要性：** 与 #79337 同源。前端提示"请升级至 Max 计划以使用 Fable 5"，但用户已在使用 Max。暴露了后端计划权益状态同步的严重混乱。

### 6. #80600 [BUG] 缓存实验载荷无限注入系统提示指令
🔗 https://github.com/anthropics/claude-code/issues/80600  
评论 1 | 👍 0 | **开启中**  
**重要性：** 系统架构级 BUG。实验性载荷被本地缓存后，即使在环境中设置了禁用非必要流量（`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`），缓存仍持续将过期 System Prompt 注入新会话，行为不可追溯且无法彻底关闭。

### 7. #80733 [BUG] 后台子代理静默丢失 LSP 工具
🔗 https://github.com/anthropics/claude-code/issues/80733  
评论 0 | 👍 0 | **开启中**  
**重要性：** 多代理架构的核心 BUG。自 v2.1.198 起，后台子代理仅继承 MCP 工具，但 LSP（语言服务协议）工具被从内置工具白名单中排除，且无任何提示。这意味着后台代理在需要深度 IDE 代码分析的场景下将直接失能。

### 8. #80730 / #80729 [BUG] 权限系统未能拦截破坏性 Bash 命令
🔗 https://github.com/anthropics/claude-code/issues/80730  
🔗 https://github.com/anthropics/claude-code/issues/80729  
评论 0 | 👍 0 | **开启中**  
**重要性：** 严重安全隐患。用户报告 Claude Code 在未弹出任何审批弹窗的情况下，直接执行了覆盖整个目录的毁灭性操作。这直接动摇了用户对 Agent 安全系统的核心信任。

### 9. #80635 [BUG] MCP 认证缓存被 `claude mcp list` 毒化
🔗 https://github.com/anthropics/claude-code/issues/80635  
评论 0 | 👍 0 | **开启中**  
**重要性：** MCP 状态管理缺陷。`claude mcp list` 的探测结果以服务器名称为唯一键写入全局缓存（`mcp-needs-auth-cache.json`），导致后续使用正确的静态认证配置的同名服务器被阻塞，跨配置源的隔离性为零。

### 10. #80731 [BUG] MCP OAuth 忽略 RFC 9728 资源元数据发现
🔗 https://github.com/anthropics/claude-code/issues/80731  
评论 0 | 👍 0 | **开启中**  
**重要性：** 协议标准合规问题。`claude mcp login` 在 OAuth 流程中强制将资源源地址推导为授权端点，忽略服务端通过 `.well-known` 或 `resource-metadata` 声明的端点信息，对私有化部署和自定义认证服务器的兼容性较差。

## 4. 重要 PR 进展

过去 24 小时内共有 5 个 PR 获得更新，以下逐一分析：

### 1. #80508 [开启] 修复自动关闭重复 Issue 脚本的分页问题
🔗 https://github.com/anthropics/claude-code/pull/80508  
**说明：** 社区协作基础设施的修复。GitHub API 默认每页 30 条，但脚本在读取评论和 Reactions 时未遵循分页逻辑，导致重复 Issue 的捎带通知和活动判断不完整，影响社区 Issue 管理效率。

### 2. #80495 [开启] 阻止 `/ralph-loop` 将提示词解析为 Shell 代码
🔗 https://github.com/anthropics/claude-code/pull/80495  
**说明：** 安全修复。`/ralph-loop` 命令的 Shell 执行流程中，`$ARGUMENTS` 变量被直接代入自动执行行，导致用户的自然语言提示被解析为 Shell 命令，存在注入风险。此 PR 修复了该问题。

### 3. #41611 [开启] 为 Claude Code 添加缺失的来源信息
🔗 https://github.com/anthropics/claude-code/pull/41611  
**说明：** 数据完整性补充。为 Claude Code 的某些输出/上下文元数据补全了缺失的 Source 字段，可能涉及代码溯源或上下文聚合的准确性。

### 4. #42604 [关闭] 从前端设计技能中移除"复古未来主义"推荐
🔗 https://github.com/anthropics/claude-code/pull/42604  
**说明：** 内容质量优化。移除了不符合现代审美的过时设计推荐，提升前端生成内容的质量和用户满意度。

### 5. #18217 [关闭] feat(plugins): 新增 `/planwith` 内联命令
🔗 https://github.com/anthropics/claude-code/pull/18217  
**说明：** 工作流体验优化。允许用户在 `/plan` 后直接输入提示，无需先进入规划模式、再等待激活、再输入指令的两步流程，简化了规划到执行的链路。

## 5. 功能需求趋势

**1. 订阅用量与成本可观测性**
开发者不再满足于手动输入 `/usage` 查看订阅消耗。社区明确要求 Anthropic 提供**程序化 API**（#80732）来获取计划使用率，同时在 JSONL 日志（#72110）和 Hook 回调（#80446）中补充时间戳、Token 消耗等细粒度元数据，以支持成本审计和自动化预警。

**2. MCP 协议标准化与健壮化**
MCP 在成为核心扩展接口后，底层实现的质量成为焦点。OAuth 流程的 **RFC 9728 标准合规**（#80731）、全局缓存的**配置源隔离**（#80635），以及子代理环境中的**工具完整性**（#80733），都是 MCP 从"能用"走向"可靠"必须解决的问题。

**3. 编辑器与终端基础体验闭合**
从 VSCode 会话不同步（#37628）到 TUI 渲染异常（#49985），再到**最基本的文本选择功能缺失**（#80734），用户对基础交互体验的断裂容忍度正在下降。社区期待产品在功能扩展的同时，优先补齐交互基础设施的短板。

**4. 权限系统的可预测性重塑**
社区希望权限系统具备高度的可预测性：既要对只读命令（`curl`, `gh api`）实现**自动安静放行**（#62135），又要对不可逆操作做到**绝对拦截确认**（#80730）。当前的混合状态（"既不充分信任，也不可靠防护"）是最大的体验痛点。

## 6. 开发者关注点

**1. "Fable 5 计费门"：承诺与交付的脱节**
Fable 5 纳入 Max 计划本是价值升级，但上线即出现"提示收费 + 强制降级"的乌龙。开发者愤怒的焦点不在于 BUG 本身，而在于 **"我为 Max 付费，为什么还要被要求积分？"** ——定价体系、后端权限状态和前端展示全面脱节，是一次典型的产品信誉冲击。

**2. 权限系统的"薛定谔"困境**
权限系统目前处于极度分裂的状态：它既能将 `curl`、`gh api` 误报为高风险操作，频繁弹窗打扰（#62135, #78251），又能在 `rm -rf` 级别的毁灭性操作面前**全程沉默**（#80730）。这种"该管的不管、不该管的瞎管"让开发者对安全护栏失去信心。

**3. 子代理的黑盒化风险**
子代理是 Claude Code 并行化策略的核心，但 **LSP 工具静默消失**（#80733）和 **输出大量无意义填充词**（#80724）让用户对后台代理的可靠性产生质疑。如果后台代理不可信赖，多代理协作的价值将大打折扣。

**4. 不可恢复的本地状态死锁**
`login expired` 问题（#80605）在完全清除凭据、Keychain、重装后仍无法发起 OAuth 流程，暴露了本地持久化状态管理的健壮性缺陷。这种"无法自愈的死锁"是用户留存的无底洞。

**5. 运行环境的失控感**
#80600 揭示的实验系统提示缓存问题表明，用户可能被持久于本地的后端实验配置影响，使用者无法确定当前 Agent 的 System Prompt 精确版本。对专业开发者而言，这种不可见的"背景噪声"是不可接受的。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 | 2026-07-24

---

## 今日速览

Codex CLI 在 24 小时内密集发布 3 个 Rust alpha 版本（v0.146.0‑alpha.3.1 / alpha.4 / alpha.5），重点修补执行服务代理路由、Windows 沙箱代理、插件脚本归属等关键环节。社区议题围绕 **上下文压缩效率低下** 和 **Windows 平台集成缺陷** 持续升温，多条高赞功能请求（自定义状态行、压缩遥测）仍在等待官方回应。合并的 PR 则覆盖了代理感知、线程并发控制、浏览器自动化开关等基础设施改进。

---

## 版本发布

- **[rust-v0.146.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.5)**  
  Release 0.146.0-alpha.5  
- **[rust-v0.146.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.4)**  
  Release 0.146.0-alpha.4  
- **[rust-v0.146.0-alpha.3.1](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.3.1)**  
  Release 0.146.0-alpha.3.1  
> 以上三版为连续迭代，主要吸收了 7 月 23 日合并的多项 PR，包括执行服务器 WebSocket 代理路由、Windows 沙箱代理保留、插件脚本归属追踪以及 `update_plan` 工具禁用等配置扩展。

---

## 社区热点 Issues（10 条）

### 1. **自定义状态行** — [#17827](https://github.com/openai/codex/issues/17827)  
💬 33 评论 | 👍 122  
请求为 TUI 增加可定制的底部状态栏，显示 token 用量、模型名、限速、Git 分支等实时信息。社区呼声极高，已持续 3 个月。

### 2. **Windows 上行尾混乱** — [#4003](https://github.com/openai/codex/issues/4003)  
💬 27 评论 | 👍 71  
Codex 修改文件时不会保持原有换行符（CRLF/LF），导致 Windows 上混合换行。影响所有 Windows 用户，已存在近 10 个月。

### 3. **会话日志膨胀至 GB 级** — [#24948](https://github.com/openai/codex/issues/24948)  
💬 20 评论 | 👍 1  
重复的压缩历史和原始工具输出导致日志文件达到 700MB–2GB，严重影响磁盘和性能。Pro 用户报告，补偿对象是长会话场景。

### 4. **上下文压缩遥测 / 健康度可视化** — [#22220](https://github.com/openai/codex/issues/22220)  
💬 19 评论 | 👍 12  
用户完全无法感知压缩何时发生、丢弃了什么、保留了什么。建议引入 Context Health 面板，增加压缩事件日志和上下文仪表盘。

### 5. **自动压缩后仍然 80% 满载** — [#35032](https://github.com/openai/codex/issues/35032)  
💬 12 评论 | 👍 0  
在长时间、工具密集的会话中，自动压缩虽报告成功却立刻使上下文条恢复至 80%，导致反复压缩与配额浪费。刚提交即获较多关注。

### 6. **WSL 集成彻底损坏** — [#28074](https://github.com/openai/codex/issues/28074)  
💬 11 评论 | 👍 8  
即使全新安装，Codex App 也无法在 WSL 环境中正常工作。Windows 开发者的重要通路受阻。

### 7. **Windows 远程控制永久卡在“Reconnecting…”** — [#31973](https://github.com/openai/codex/issues/31973)  
💬 10 评论 | 👍 1  
手机端通过 QR 配对远程控制 Windows 桌面时，一旦连接中断便无法恢复，且没有手动重置入口。严重降低远程使用体验。

### 8. **“For coding”视图隐藏了文件变更细节** — [#19891](https://github.com/openai/codex/issues/19891)  
💬 8 评论 | 👍 8  
最新 App 改版后，“For coding”模式不再显示具体编辑了哪些文件或执行了什么命令，仅用聚合摘要代替。Business 用户认为这是功能倒车。

### 9. **Windows 原生沙箱内 Git HTTPS 操作必失败** — [#31073](https://github.com/openai/codex/issues/31073)  
💬 8 评论 | 👍 0  
Git 远程操作（pull/push）在 Codex Windows 沙箱内完全不可用，本地命令正常。怀疑是凭证管理或代理配置未传递。

### 10. **已完成子代理残留 245 个 Node.js 进程** — [#34658](https://github.com/openai/codex/issues/34658)  
💬 3 评论 | 👍 1  
Windows 下使用 MCP 的子代理退出后，stdio 连接的 Node.js 进程未被清理，累积至 245 个进程 / 18GB 内存。严重的资源泄漏。

> 更多热门议题还包括：[#31553](https://github.com/openai/codex/issues/31553) VS Code 扩展自动上下文丢失、[#25179](https://github.com/openai/codex/issues/25179) 子代理缓存无法关闭、[#34095](https://github.com/openai/codex/issues/34095) 重复压缩导致执行前沿退化。

---

## 重要 PR 进展（10 条）

### 1. **执行服务器 WebSocket 通过配置代理转发** — [#35056](https://github.com/openai/codex/pull/35056) ✅ 已合并  
远程环境连接现在会遵守 Codex 的出站代理策略，`HttpClientFactory` 被传入传输层。企业用户可借此实现统一代理管控。

### 2. **允许禁用 `update_plan` 工具** — [#35054](https://github.com/openai/codex/pull/35054) ✅ 已合并  
新增 `tools.update_plan.enabled` 配置项（默认开启），关闭后可从可见工具集中移除 `update_plan`。减少无用步骤，降低 token 消耗。

### 3. **注册 Guardian V2 功能标志** — [#35049](https://github.com/openai/codex/pull/35049) ✅ 已合并  
在特性注册表中加入 `GuardianV2`，暴露为 `features.guardianv2` 配置，默认关闭。预示新一轮自动审批能力将升级。

### 4. **Windows 沙箱代理设置在 Guardian 会话中保留** — [#35036](https://github.com/openai/codex/pull/35036) ✅ 已合并  
Guardian 审查命令运行时会丢弃父会话的代理端口，导致沙箱网络中断。该 PR 将代理配置透传到审查子进程。

### 5. **暴露浏览器使用（Browser Use）需求** — [#35033](https://github.com/openai/codex/pull/35033) ✅ 已合并  
通过 `browser_use.disable_auto_review` 配置控制浏览器自动化是否跳过自动审批。为后续浏览器操控能力铺路。

### 6. **线程归档/删除强制校验写入者所有权** — [#35031](https://github.com/openai/codex/pull/35031) ✅ 已合并  
分页线程模型只允许一个 App 服务写入。归档/删除操作现在必须获取写入锁，防止多进程并发修改导致状态损坏。

### 7. **跨命令审批保留插件归属信息** — [#35029](https://github.com/openai/codex/pull/35029) ✅ 已合并  
执行审批与 Guardian 审查事件中新增 `plugin_id` / `script_path` 字段。让审计日志可追溯到插件来源，提升安全可见性。

### 8. **MCP 运行时更新后不丢失应用工具列表** — [#35028](https://github.com/openai/codex/pull/35028) ✅ 已合并  
远程插件安装会触发工具集硬刷新，此前 MCP 运行时发布会恢复旧快照，该 PR 修复了此不一致。

### 9. **允许自定义提供商选择独立网络搜索** — [#35024](https://github.com/openai/codex/pull/35024) 🔄 开放中  
新增 `supports_standalone_web_search` 模型提供商设置，自定义 Responses 提供商可以选择启用独立的 `web.run` 工具。扩展生态。

### 10. **支持线程项的增量重放** — [#35013](https://github.com/openai/codex/pull/35013) ✅ 已合并  
追踪投影序号，允许调用方只读取更新过的线程项，而非全部重放。对长会话恢复的性能优化至关重要。

> 其他值得关注的 PR：[#35021](https://github.com/openai/codex/pull/35021) 键盘事件适配终端类型（iTerm2/tmux）、[#35012](https://github.com/openai/codex/pull/35012) 公开远程技能图标 URL。

---

## 功能需求趋势

综合过去 24 小时更新的所有 Issue，社区最集中的功能诉求集中在以下方向：

- **🔍 上下文透明化** — 用户强烈要求看到压缩时丢弃了什么、剩余可用窗口、以及压缩频率。`#22220`、`#35032`、`#34095` 均指向相同的盲区。
- **🪟 Windows 深化支持** — 行尾处理、WSL 集成、安装路径可选、沙箱 Git 痛点反复被提及，说明 Windows 用户群体正在快速扩大。
- **🧑‍💻 非专业开发者模式** — `#26556` 提出为领域专家（非程序员）提供简化界面，避免暴露 diff、日志等底层细节。
- **📊 配额与用量管理** — `#35044`‑`#35047` 系列要求产品内直接展示配额重置时间、生效事件和停机公告，而非依赖社交媒体。
- **📂 ChatGPT 对话导入** — `#30636` 希望 Codex 能直接导入 ChatGPT 对话作为上下文，已有社区插件但官方通路尚未开放。

---

## 开发者关注点

从反馈中最常出现的痛点和高频需求中，可以识别出以下关键待改进项：

- **上下文压缩机制不可靠** — 压缩后仍然满负载、重复压缩、丧失“执行前沿”（`#34095`、`#35032`、`#34971`），导致长任务无法收敛且浪费配额。
- **Windows 生态断裂** — 多个基础功能在 Windows 上异常：换行符（`#4003`）、WSL 不可用（`#28074`）、沙箱内 Git HTTPS 失败（`#31073`）、子代理进程残留（`#34658`）。每一条都直接影响 Windows 用户的工作流。
- **资源泄漏与膨胀** — 日志文件 GB 级增长、子代理进程不释放、MCP 连接残留，显著拖慢 IDE 体验。
- **模型行为不可预测** — GPT‑5.6 不并行工具调用（`#32503`）、过早声称功能完成（`#35043`）、陷入自强化治理循环（`#34898`），开发者对模型的信任度受损。
- **UI 回退** — “For coding” 视图隐藏变更细节（`#19891`）、子代理卡片无法关闭（`#25179`），让用户感觉控制权下降。
- **通知 / 遥测缺失** — 发生 OpenAI 服务故障时产品内无提示（`#35037`）、压缩无日志、配额变化无历史，开发者只能靠外部渠道自行判断。

---

*本日报基于 github.com/openai/codex 公开数据自动生成，数据更新至 2026-07-24 UTC。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 | 2026-07-24

---

## 今日速览

昨夜发布的 `v0.52.0-nightly` 引入了评估覆盖率报告，并修复了凭证缓存验证顺序。社区的核心焦虑点集中在 **Agent 虚假成功状态上报 (#22323) 和通用 Agent 的长时间挂起 (#21409)**。与此同时，内部 PR 生成管线的多项核心代码（#28433-#28435）正在密集合入，标志着团队在自动化代码修复方向上的重大战略投入。

---

## 版本发布

- **v0.52.0-nightly.20260723.g9681621c6**
  - **功能**：新增 `eval coverage report` 评估覆盖率报告命令（@ved015）。
  - **修复**：核心认证流程中，修复了缓存凭据的验证顺序，并恢复了 `GOOGLE_APPLICATION_CREDENTIALS` 降级回退策略（@luisfelipe-alt）。
  - 链接：[Release v0.52.0-nightly](https://github.com/google-gemini/gemini-cli/releases/tag/v0.52.0-nightly.20260723.g9681621c6)

---

## 社区热点 Issues

### **#22323 [P1] 子代理超限误报为 Goal Success**
`codebase_investigator` 子代理在触发 `MAX_TURNS` 限制后，依然将 `Termination Reason` 上报为 `GOAL`，严重误导用户认为任务正常完成。社区认为这是 Agent 状态机与报告机制之间的深层 Bug，12 条评论高度关注修复进展。
- 链接：[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)

### **#21409 [P1] 通用代理假死**
获 8 个 👍 的用户最痛点之一。部分用户在简单文件创建任务中就遭遇代理一小时的挂起，只能通过手动禁止子代理来规避。严重影响基础可靠性信任。
- 链接：[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)

### **#25166 [P1] Shell 执行完毕后卡死（“Waiting input”）**
命令执行完成后，终端状态仍显示为“等待输入”，导致后续交互中断。该情况高频复现，直接影响日常 CLI 使用体验（3 👍）。
- 链接：[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)

### **#21983 [P1] 浏览器子 Agent 在 Wayland 下崩溃**
`browser subagent` 在 Wayland 环境下执行失败，但依然上报 `Termination Reason: GOAL`。与 #22323 类似，再次暴露 Agent 错误处理与状态上报体系的缺陷。
- 链接：[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)

### **#24353 [P1] 组件级评估体系建设**
官方发起的 EPIC，目标是建立更细粒度的自动化评估体系（自 #15300 以来已有 76 个行为评估测试），用量化手段守住 Agent 质量底线。这是一个大型工程动作。
- 链接：[#24353](https://github.com/google-gemini/gemini-cli/issues/24353)

### **#22745 [P2] 探索 AST 感知的文件读写与搜索**
社区和团队一致认为，引入 AST 感知工具（如 AST grep）可以更精确地定位方法边界、减少 Token 浪费与对齐偏差，是提升 Agent 代码理解效率的重要方向。
- 链接：[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)

### **#26522 [P2] 自动内存（Auto Memory）低信号重试死循环**
提取 Agent 判断会话为“低信号”时不会标记为“已处理”，导致无效会话反复进入待提取队列。社区呼吁引入会话 TTL 或信号阈值来终结这一循环。
- 链接：[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)

### **#22232 [P3] 浏览器 Agent 会话接管与锁恢复机制**
当前 `BrowserManager.ts` 采用“快速失败”策略处理被锁定的浏览器配置文件，用户在 `sessionMode: 'persistent'` 下体验不佳。社区请求增加自动会话接管和孤儿进程锁清理能力。
- 链接：[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)

### **#24246 [P2] 工具数量超过 128 时报 400 错误**
当环境注册的工具过多时，Gemini CLI 直接抛出 `INVALID_ARGUMENT` 错误。社区认为 Agent 应主动裁剪和筛选可用工具，而非被动接受全部工具导致请求超限。
- 链接：[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)

### **#26525 [P2] 自动内存日志确定性脱敏**
当前提取 Prompt 虽指导模型删除 secrets，但内容在上行至模型上下文中才进行脱敏。社区要求增加前置脱敏逻辑，并降低自动内存操作的日志输出级别，以防敏感信息在日志中泄露。
- 链接：[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)

---

## 重要 PR 进展

### **#28519 [P1/核心] 修复无限认证循环**
`@EngKMM` 贡献，通过确保 `oauth_creds.json` 的异步写入操作被正确 `await`，解决了 #28430 中描述的认证回环 Bug。对无头环境下的登录稳定性至关重要。
- 链接：[#28519](https://github.com/google-gemini/gemini-cli/pull/28519)

### **#28523 [核心/安全] 文件钥匙串标签长度强制校验**
对文件型凭据存储实施了严格的 128 位认证标签长度验证，并增加了对损坏和零长度载荷的处理，提升密钥存储的跨运行时兼容性与健壮性。
- 链接：[#28523](https://github.com/google-gemini/gemini-cli/pull/28523)

### **#28524 [看护者-分流] Prompt 爬山算法优化 PR 组**
集成了三周的 Prompt 爬山和评估调优，为分流工作者引入了 `code_explorer` 技能，自动 Issue 分类的准确率显著提升。这是自动运维方向上的持续投入。
- 链接：[#28524](https://github.com/google-gemini/gemini-cli/pull/28524)

### **#28433 / #28432 / #28431 / #28434 / #28435 [P0] SSR PR 生成管线核心代码合入**
这批大型 PR（Size L/XL）是“Issue 到 PR 自动生成管线”（gcli-intern-project-2026）的主体：
  - **#28432**: Firestore 双锁并发控制 + 测试工具。
  - **#28433**: 无头 AI Agent 迭代编码状态机 + 容器化入口点。
  - **#28431**: Cloud Run Job 定义、Eventarc 触发器与 Workflows 编排。
  - **#28434**: 系统提示词模板与 Antigravity Agent Runner。
  - **#28435**: 环境解析器、GitHub API 客户端与子进程执行单元。
  **标志着 Gemini CLI 迈向“用 AI 自动修复自身 Bug”的关键工程节点。**
  - 链接：[#28433](https://github.com/google-gemini/gemini-cli/pull/28433) | [#28432](https://github.com/google-gemini/gemini-cli/pull/28432) | [#28431](https://github.com/google-gemini/gemini-cli/pull/28431) | [#28434](https://github.com/google-gemini/gemini-cli/pull/28434) | [#28435](https://github.com/google-gemini/gemini-cli/pull/28435)

### **#28509 [核心] 过滤历史中的“思考”片段**
当上下文管理关闭时，内部思维链（`thought: true`）会被泄露到返回给前端的 `getHistoryTurns` 中，造成重复推理块。此 PR 确保 2.x 以上模型在非上下文管理模式下滤除这些片段。
- 链接：[#28509](https://github.com/google-gemini/gemini-cli/pull/28509)

### **#28481 [P1/安全] 修复 MCP OAuth 令牌刷新**
修复了通过 OAuth 发现协议动态注册的 MCP Server 的 Token 刷新逻辑。原逻辑在刷新失败前就因读取错误的 ClientID 而本地报错，并清空已有凭据，强制用户完全重新认证。
- 链接：[#28481](https://github.com/google-gemini/gemini-cli/pull/28481)

### **#28446 [P1/安全] 用原生 fetch 替换 OAuth Token 请求**
解决了部分无头 VPS 上 Token 交换时偶发 `Premature close` 异常。提升无图形界面及受限网络环境下的认证成功率。
- 链接：[#28446](https://github.com/google-gemini/gemini-cli/pull/28446)

### **#28485 [P2/核心] 模型选择器支持 3.5 Flash**
修复 `v0.51.0` 用户无法在模型选择器中看到 `gemini-3.5-flash` 及 `gemini-3.6-flash` 的问题，确保新模型能正确暴露给所有用户。
- 链接：[#28485](https://github.com/google-gemini/gemini-cli/pull/28485)

### **#28183 [VSCode集成] 关闭 Diff 标签后保持终端焦点**
当用户批准文件编辑并关闭预览 Diff Tab 后，键盘焦点会从 VS Code 集成终端丢失，需要手动点击重新聚焦。此 PR 在关闭 Diff 后强制恢复终端焦点，显著提升 Edit-Accept 循环效率。
- 链接：[#28183](https://github.com/google-gemini/gemini-cli/pull/28183)

---

## 功能需求趋势

1. **Agent 行为确定性与透明性**：大量 Bug 围绕 Agent“假死”、“假成功”、“不受控制生成垃圾文件”。社区强烈要求 Agent 在状态上报时严格区分 **正常结束** 与 **被动中断**，并允许用户查看完整的子代理轨迹（#22598）。

2. **认证体系健壮化**：MCP OAuth 刷新、Google Cloud 默认凭证获取是当前脆弱的两个点。开发者无法接受 CI/CD 环境下登录阶段的不确定性。**安全与易用性的平衡**是本周期呼声最高的主题。

3. **内部自动化（AI for OSS）**：团队正在大力投资 AI 驱动的自动运维——自动 Issue 分类（Caretaker Triage）和自动 PR 修复（SSR Pipeline）。这种“自己写代码修自己 Bug”的模式，是此项目近期最值得关注的战略动向。

4. **平台兼容性与终端体验**：Wayland 浏览器子代理支持、终端高刷新率渲染、全屏 Resize 无闪烁——Gemini CLI 开始深度打磨交互体验，从“能用”到“好用”过渡。

5. **工具生态与上下文管理**：社区强烈呼吁智能体具备“审视自身工具集”的能力，而非因工具过多（#24246 128 工具上限）而崩溃。AST 感知的代码阅读和搜索（#22745）被提上议程，以减少 Token 浪费和提高搜索精度。

---

## 开发者关注点

### 高频痛点
- **虚假上报与不可预测性**：“假成功”（#22323）和“无限挂起”（#21409）打击开发者对 Agent 执行结果的信任。
- **环境兼容与网络痛点**：OAuth 刷新失败导致二次认证（#28481）、特定网络下的 `Premature close`（#28446）。
- **安全与隐私顾虑**：自动内存可能泄露敏感信息（#26525）、Agent 残留临时脚本（#23571）、以及在不警告的情况下执行危险命令（#22672）的担忧持续上升。

### 高频呼声
- **安全第一**：自动内存的确定性脱敏、Prompt 注入防御、以及对危险 Shell 命令的拦截警告。
- **配置可控与用户遵从**：`settings.json` 中的配置必须被 UI 和 Agent 完全遵从，不应出现忽略 `maxTurns` 或其他配置的“越权”行为。
- **行为可观测与可分享**：用户想知道子代理到底执行了什么任务（#21763），并希望 `/chat share` 能够包含子代理的完整轨迹（#22598）。
- **MCP 扩展生态的伸缩性**：128 工具上限必须解决，Agent 应具备动态工具裁剪能力，让更多的 MCP 工具真正可用，而不是成为负担。

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

好的，这是为您生成的 **2026-07-24 DeepSeek Reasonix 社区动态日报**。

---

# DeepSeek Reasonix 社区动态日报 | 2026-07-24

## 1. 今日速览
- **安全性与易用性博弈白热化**：v1.17.18 引入的 `Auto Guard` 机制因过度拦截引发大量用户抗议（#6844），开发组今日通过 PR #6864/#6871 紧急推出“执行轮次（Episode）”级恢复策略，试图在不牺牲安全的前提下挽回用户体验。
- **Planner 能力迎来里程碑式增强**：社区呼声极高的“Planner 配置 MCP 工具”功能（#6854）已通过 PR #6865 实现并合并，自此规划器可自主调用数据库等 MCP 工具进行自动验证。
- **数据可靠性警报拉响**：多起报告指出高并发下会话丢失（#6873）和环境切换导致清空历史（#6874）的严重数据问题，同时输入框焦点异常（#6868）虽已紧急修复，但仍暴露出项目在数据鲁棒性与交互细节上正处于快速打磨期。

## 2. 版本发布
本日无新版本发布。

## 3. 社区热点 Issues（Top 10）

1. **[已关闭] #6854: 无法为 Planner 配置 MCP 工具**
   - **重要性**: 🔥🔥🔥🔥🔥 今日最重磅的功能需求。解决了长久以来 Planner 无法通过 MCP 工具进行数据库查询等操作，导致规划脱离实际无法验证的问题。该议题在 PR #6865 中获圆满解决，社区由怨转喜。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6854)

2. **[开放中] #6844: Auto Guard 不能加个开关吗？**
   - **重要性**: 🔥🔥🔥🔥🔥 社区情绪爆发点。大量开发者（尤其是编程小白）认为该功能正在“以牺牲用户体验为代价弄安全性”，严重破坏了“Vibecoding”的自由度，甚至有用户表示考虑回退版本。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6844)

3. **[开放中] #6886: 优化 Auto Guard 的一些拙见**
   - **重要性**: 🔥🔥🔥🔥 相比单一的抱怨，此 Issue 给出了极高质量的理性分析（黑箱模型不可见、无撤销手段、安全定义不透明），是开发组后续改进 Auto Guard 的最佳参考蓝本。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6886)

4. **[开放中] #6873: 吞聊天记录**
   - **重要性**: 🔥🔥🔥🔥 “数据丢失”是最致命的 Bug。在高负载并行多个对话时，聊天记录被吞掉且重启软件无法恢复，严重动摇了用户对工具的信任基础。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6873)

5. **[已关闭] #6874: 切换智能体环境导致项目对话消失**
   - **重要性**: 🔥🔥🔥🔥 另一个严重的数据丢失场景。在 Windows 上从 PowerShell 切换到 WSL 后，项目下的对话历史立即消失，与 #6873 构成了今日的“数据黑洞”主题。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6874)

6. **[已关闭] #6868: 使用技能或插件时输入框焦点跳至最后**
   - **重要性**: 🔥🔥🔥 高频交互痛点，严重打断创作流。该 Bug 已在 PR #6872 中得到精准修复。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6868)

7. **[开放中] #6838: 切换、归档会话卡顿严重**
   - **重要性**: 🔥🔥🔥 影响日常使用流畅度的性能问题。连续归档操作时界面卡顿甚至渲染出错误的会话内容，非常影响工作效率。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6838)

8. **[开放中] #6878: Session Already Open 报错**
   - **重要性**: 🔥🔥🔥 窗口会话管理竞态 Bug。偶发提示“该会话已在另一个窗口打开”，导致用户无法正常进入自己的会话，属于严重阻塞型故障。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6878)

9. **[开放中] #6870: edit_file 工具反复失败并自动停止**
   - **重要性**: 🔥🔥🔥 核心 Agent 工具的稳定性问题。对约 340 行的 Markdown 文件进行大块内容替换时，工具反复返回失败，严重限制了 Agent 的实际工程能力。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6870)

10. **[开放中] #6246: 加入 Telegram Bot 支持**
    - **重要性**: 🔥🔥🔥 长期高票功能需求。社区已有用户通过自建 MCP Server 曲线救国，迫切希望官方原生支持。今日已有 PR #6879 提出解决方案，值得关注。
    - [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6246)

## 4. 重要 PR 进展（Top 10）

1. **[已合并] #6865: Planner 与子 Agent 安装即信任 MCP**
   - **评价**: **今日最重磅 PR**。直接关闭 #6854，通过 `use_capability` 代理机制让 Planner、Executor 无需动态代理和重复审批即可使用已安装的 MCP，彻底激活了规划器的工具使用能力。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6865)

2. **[已合并] #6864 / #6871: 按 Episode 限制 Auto 恢复并支持退出计划**
   - **评价**: **针对社区争议的紧急救火补丁**。不再进行无限恢复，而是将自动恢复锁定在“当前执行轮次（Episode）”，下一轮用户对话自动开启全新局面。这是开发组在安全性与体验感之间划出的一条清晰界线。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6864)

3. **[已合并] #6872: 修复富文本输入框光标跳尾**
   - **评价**: **直击痛点的高效修复**。完美解决了 #6868 描述的 Windows WebView2 环境下，输入较长文本时在中间增删改导致焦点跳到末尾的问题，修复了核心输入流。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6872)

4. **[开放中] #6879: 新增 Telegram Channel 支持**
   - **评价**: **重磅新渠道拓展**。回应了 #6246 的长期呼声，为 Bot 家族新增了 Telegram 原生适配器，支持长轮询收发消息、回话、持久会话及桌面配置。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6879)

5. **[开放中] #6884: 修复 ACP 回放时显示系统注入 Block**
   - **评价**: **提升 ACP 会话沉浸感**。修复了关闭会话再打开后，`<response-language>` 等系统 XML Block 暴露给用户的问题，让 ACP 回放功能更干净自然。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6884)

6. **[开放中] #6885: 修复配置加载时 USD 价格被覆盖为 CNY**
   - **评价**: **全球化用户体验修复**。修复了桌面客户端静默将用户设置的美元价格覆盖为人民币的问题，对国际用户和第三方 API 成本管理至关重要。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6885)

7. **[已合并] #6866: 支持 Debian 安装包应用内授权更新**
   - **评价**: **Linux 平台体验优化**。解决了 Ubuntu 等使用系统级 `.deb` 安装的用户无法使用应用内更新的痛点，现在能正确识别安装模式并提供签名更新。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6866)

8. **[已合并] #6861: 拓展更多种语言的语法高亮支持**
   - **评价**: **实用的微体验打磨**。将右侧文件预览区域的语法高亮从 12 种语言扩展到 52 种（如 C#），极大提升了代码阅读体验。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6861)

9. **[开放中] #6833: 添加全局 --home 隔离配置文件**
   - **评价**: **高级用户与测试利器**。允许通过 `--home PATH` 启动完全隔离的环境，配置、凭据、会话、记忆均可独立存储，且支持多实例并行运行。
   - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6833)

10. **[已合并] #6880: 修复 Provider 模型状态同步**
    - **评价**: **提升界面反馈准确性**。修复了热切换模型时钱包余额闪烁和余额状态错乱的问题，防止界面统计数据异常。
    - [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/6880)

## 5. 功能需求趋势
- **安全性治理的“黑盒”困境**：社区对 Auto Guard 的批判揭示了用户对安全机制“可解释性”（提示词公开？）、可控性（开关/白名单/撤销）和智能化（按上下文而非全局拦截）的刚性需求。
- **Agent 架构向 MCP 生态全面开放**：从允许 Agent 使用 MCP，到今日专门为 Planner 配置 MCP（#6854），乃至即将到来的 Fleet Agent MCP 互通，DeepSeek Reasonix 正加速从“对话窗口”进化为“智能 MCP 编排平台”。
- **Bot 生态的国际化与多元化**：Telegram Bot 的呼声（#6246）与 IM Bot（微信/飞书）持久会话的需求（#6855），表明社区正在寻找更广泛、更稳定的通信基座来运行 Agent。
- **数据持久化成为信任基石**：无论是吞记录还是切换环境清空历史，数据可靠性问题已超越性能，成为用户留存的第一道防线。社区期待透明、可恢复的会话管理，甚至版本化历史。
- **“Vibecoding”精细化体验成护城河**：输入框焦点管理（#6868）、文本 Ctrl+Z 撤回（#6571）、语法高亮（#6861）等细节，构成了“Vibecoding”流畅感的基础，社区对这类“小而美”的体验优化期待极高。

## 6. 开发者关注点
- **#1 公敌：Auto Guard 的暴力执法**。它公然破坏了“信任即生产力”的底层逻辑。开发者抱怨其无差别拦截写入桌面文件、不断切换会话导致沟通成本极高，核心诉求是“请给我一个开关，让我自己承担后果”。
- **#2 恐慌：数据丟了就真的没了**。高负载下的吞记录、配置切换的丢历史，让开发者不敢将项目完全托管于 Reasonix。数据丢失是摧毁用户信任的最快方式。
- **#3 焦躁：核心工具时常拖后腿**。Planner 不能用 MCP 导致规划荒谬、`edit_file` 对大文件束手无策导致 Agent 反复失败、焦点乱跳打断输入流——底层工具的稳定性严重制约了上层智能的发挥。
- **#4 不解：软件质量的起伏**。从版本更新引发的新 Bug（连接失败、窗口异常），到安装包体积激增导致更新缓慢（#6875），开发者对项目的“工程成熟度”提出质疑，认为在追求快节奏功能迭代的同时，必须补足测试和优化。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报  
**日期：2026-07-24**  
数据来源：github.com/anomalyco/opencode  

---

## 今日速览

今日未发布新版本，但社区围绕 **旧布局保留**（#37012）展开热烈讨论（30 👍 / 29 评论），成为最受关注的话题。稳定性方面，多个 Bug 修复 PR 被提交：工作区移动后恢复路径（#38584）、Grep 符号链接路径保留（#38581）以及补丁错误改进（#38369）均直接解决用户痛点。功能侧，MCP 元数据转发（#38579）和 LLM 观察性钩子（#33523）进一步完善了插件生态的能力。

---

## 版本发布

无

---

## 社区热点 Issues（10 个）

### 1. 保留旧版布局选项（#37012）  
**作者：** @darkine24th | **评论：** 29 | **👍：** 30 | **状态：** 开放  
用户强烈要求在新版中保留旧布局，认为旧版可直接在主窗口访问几乎所有功能，无需在应用内反复导航。社区反响积极，讨论了多个具体对比点。  
🔗 [github.com/anomalyco/opencode/issues/37012](https://github.com/anomalyco/opencode/issues/37012)

### 2. 使用 opencode Go 时出现服务器内部错误（#37716）  
**作者：** @juadariasmar | **评论：** 26 | **👍：** 5 | **状态：** 已关闭  
不同模型调用 opencode Go 后端时返回 500 错误。虽已关闭，但 26 条评论说明影响面较广，可能与 API 网关或模型适配有关。  
🔗 [github.com/anomalyco/opencode/issues/37716](https://github.com/anomalyco/opencode/issues/37716)

### 3. 添加会话手动重命名功能（#25848）  
**作者：** @GameCat7428 | **评论：** 11 | **👍：** 0 | **状态：** 开放  
建议在侧栏或命令行中添加 `/rename` 命令来重命名会话，便于组织管理。持续讨论中，社区有明确需求。  
🔗 [github.com/anomalyco/opencode/issues/25848](https://github.com/anomalyco/opencode/issues/25848)

### 4. 支持从右至左（RTL）语言（#6284）  
**作者：** @tsah | **评论：** 6 | **👍：** 8 | **状态：** 已关闭  
讨论在输入框和 AI 回复中支持阿拉伯语等 RTL 语言的渲染。虽已关闭，但 8 个 👍 表明多语言用户对此仍有期待。  
🔗 [github.com/anomalyco/opencode/issues/6284](https://github.com/anomalyco/opencode/issues/6284)

### 5. 使用量仪表盘数据不一致（#38255）  
**作者：** @PiouPiou82 | **评论：** 5 | **👍：** 0 | **状态：** 开放  
用户发现月度限额仪表盘显示 100% 用量，但明细仪表盘仅显示 $10 消费，计费与限流数据对不上。直接影响用户对模型的信任与选择。  
🔗 [github.com/anomalyco/opencode/issues/38255](https://github.com/anomalyco/opencode/issues/38255)

### 6. 桌面版 1.18.4 渲染器崩溃（#38577）  
**作者：** @megamen32 | **评论：** 2 | **👍：** 0 | **状态：** 已关闭  
Electron 桌面版启动时因 `data.lsp` 类型错误崩溃，已在最新版本中修复但仍属重要回归 Bug。  
🔗 [github.com/anomalyco/opencode/issues/38577](https://github.com/anomalyco/opencode/issues/38577)

### 7. TUI 崩溃：`undefined is not an object`（#38574）  
**作者：** @ManushGupta | **评论：** 2 | **👍：** 0 | **状态：** 已关闭  
TUI 会话路由中因访问 `f.part.state.content[0]` 而崩溃，已修复。再次提醒终端 UI 的状态处理需加强。  
🔗 [github.com/anomalyco/opencode/issues/38574](https://github.com/anomalyco/opencode/issues/38574)

### 8. Windows 全选快捷键失效（#38585）  
**作者：** @istaawoo | **评论：** 1 | **👍：** 0 | **状态：** 开放  
默认用 `super+a`（Win+A）全选，但该组合被系统占用；同时缺少 `ctrl+shift+箭头` 的词选择功能。Windows 用户输入体验受阻。  
🔗 [github.com/anomalyco/opencode/issues/38585](https://github.com/anomalyco/opencode/issues/38585)

### 9. 桌面版恢复已移动/删除的工作区（#38578）  
**作者：** @1hirak | **评论：** 1 | **👍：** 0 | **状态：** 开放  
桌面版持久化工作区绝对路径，若项目目录被移动或重命名，启动时仍尝试加载导致 `FileSystem.realPath ENOENT`。会话永久不可用。同一天有对应的修复 PR（#38584）。  
🔗 [github.com/anomalyco/opencode/issues/38578](https://github.com/anomalyco/opencode/issues/38578)

### 10. 会话中修改时区打断消息流（#38575）  
**作者：** @arabcoders | **评论：** 1 | **👍：** 0 | **状态：** 开放  
CTF 或测试中若 LLM 修改系统时区，消息顺序因依赖 `created_at` 而错乱。建议不依赖创建时间排序或提供滑动窗口。  
🔗 [github.com/anomalyco/opencode/issues/38575](https://github.com/anomalyco/opencode/issues/38575)

---

## 重要 PR 进展（10 个）

### 1. 修复移动项目后的路径恢复（#38584）  
**作者：** @1hirak | **状态：** 开放  
当 Git 仓库被移动后，`Project.fromDirectory` 仍指向原路径导致加载失败。该 PR 通过识别稳定的项目 ID 并自动纠正路径来关闭 #38578。  
🔗 [github.com/anomalyco/opencode/pull/38584](https://github.com/anomalyco/opencode/pull/38584)

### 2. 修复 Grep 符号链接路径解析（#38581）  
**作者：** @remixz | **状态：** 开放  
Grep 搜索符号链接目录时输出真实路径，导致后续工具调用因权限不匹配失败。PR 修复为保留原始请求路径，关闭 #38582。  
🔗 [github.com/anomalyco/opencode/pull/38581](https://github.com/anomalyco/opencode/pull/38581)

### 3. 基于结构化快照渲染 CodeMode 目录增量（#38183）  
**作者：** @rekram1-node | **状态：** 开放  
将 CodeMode 的目录提示从全字符串替换升级为语义化增量（类似技能系统），核心拥有所有面向模型的指令文本。是 CodeMode 目录工作的重要组成部分（关联 #36196）。  
🔗 [github.com/anomalyco/opencode/pull/38183](https://github.com/anomalyco/opencode/pull/38183)

### 4. 改进补丁错误信息（#38369）  
**作者：** @rekram1-node | **状态：** 已关闭  
识别畸形的添加/删除/移动块，报告匹配失败时去除冗余前缀并保留稳定文件系统原因。让开发者更易定位错误根因。  
🔗 [github.com/anomalyco/opencode/pull/38369](https://github.com/anomalyco/opencode/pull/38369)

### 5. MCP 转发插件请求元数据（#38579）  
**作者：** @dialupdisaster | **状态：** 开放  
允许插件在 MCP 工具调用中设置可选的 `_meta` 字段，实现会话 ID 等上下文传递。关闭 #17084，并对先前实现（#21539, #21624）进行了更新。  
🔗 [github.com/anomalyco/opencode/pull/38579](https://github.com/anomalyco/opencode/pull/38579)

### 6. 保留 AI 原始结束原因（#38423）  
**作者：** @rekram1-node | **状态：** 已关闭  
将所有模型（OpenAI、Anthropic、Gemini、Bedrock）的 finish reason 以 `{ normalized, raw }` 对形式暴露，保留原始值不丢失，提升 AI 层透明度和调试能力。  
🔗 [github.com/anomalyco/opencode/pull/38423](https://github.com/anomalyco/opencode/pull/38423)

### 7. ACP 原生审查阶段避免重复写入文件（#38198）  
**作者：** @anthony-furman | **状态：** 开放  
修复 ACP 实现中文件编辑在原生审查时写入两次的 Bug，关闭 #38196，并解决了此前 #29929 重构遗留的间隙。  
🔗 [github.com/anomalyco/opencode/pull/38198](https://github.com/anomalyco/opencode/pull/38198)

### 8. TUI 文件写入内容预览（#38539）  
**作者：** @opencode-agent[bot] | **状态：** 开放  
将写入操作从单行工具行改为块级卡片，展示真实前/后差异（绿/红渲染），区分新建文件与覆盖文件，大幅提升 TUI 的可读性。  
🔗 [github.com/anomalyco/opencode/pull/38539](https://github.com/anomalyco/opencode/pull/38539)

### 9. 保留 LLM 响应消息阶段信息（#38452）  
**作者：** @rekram1-node | **状态：** 开放  
解码 OpenAI Responses 流中的 `phase` 值，并在回放和历史组装中保持完整，确保下游插件或 UI 可以感知当前对话阶段。  
🔗 [github.com/anomalyco/opencode/pull/38452](https://github.com/anomalyco/opencode/pull/38452)

### 10. 添加 LLM 和会话可观察性钩子（#33523）  
**作者：** @billxbf | **状态：** 已关闭  
为插件 SDK 新增 4 个观察钩子，使插件能够实时获取 LLM 流、工具执行和 agent 运行阶段等事件，扩展了生态集成能力。  
🔗 [github.com/anomalyco/opencode/pull/33523](https://github.com/anomalyco/opencode/pull/33523)

---

## 功能需求趋势

从近期新增与活跃的 Issues 中，社区最关注的功能方向可概括为：

- **布局与 UI 定制**（#37012）：用户不希望被强制迁移至新布局，要求保留旧版布局作为可选方案。
- **会话与工作区管理**（#25848、#38578）：人工重命名会话、工作区移动后自动恢复成为效率刚需。
- **国际化与可访问性**（#6284、#38585）：RTL 语言支持、平台快捷键适配是全球化及 Windows 用户的核心诉求。
- **使用量与计费透明化**（#38255）：不同仪表盘数据不一致削弱了用户对模型配额系统的信任，亟需统一口径。
- **稳定性与环境兼容性**（#38575、#38577）：时区变更导致会话错乱、桌面版渲染崩溃等细粒度场景也被不断提及。

---

## 开发者关注点

综合 Issues 和 PR 中的反馈，当前开发者的痛点集中在以下方面：

- **布局变更阻力大**：旧版一键触达的设计在新版中需要多步导航，期望提供延续性选项。
- **桌面版稳定性隐患**：工作区移动后无法使用、启动时崩溃、会话丢失等问题严重影响日常使用。
- **用量数据不一致**：月度限额与明细数据冲突，开发者无法准确掌控 API 消费。
- **跨平台体验差异**：Windows 专属快捷键问题、终端（TUI）偶发崩溃，说明跨环境打磨尚有空间。
- **路径与权限边界**：符号链接、目录移动等场景下的路径处理逻辑生硬，易导致工具链断裂。这些 PR 的快速修复也反映出团队对此类问题的重视。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 | 2026-07-24

## 今日速览

昨日社区活跃度维持高位，共有 9 个 Issues 和 50 个 PRs 获得更新。核心关注点集中在**稳定性修复**上，特别是针对守护进程 (Daemon) 的 EventBus 资源泄漏 (#7621) 和后台 Shell 因输出缓冲被误杀的问题 (#7626) ，均有针对性 PR 解决。功能方面，**图像生成模型**的可配置化 (#7607) 和**CLI 历史会话引用** (#7302) 是两大亮点，社区对多模态和上下文共享的需求愈发强劲。

---

## 版本发布

无新版本发布。

---

## 社区热点 Issues

1. **[Bug] 后台 Shell 因输出缓冲被误判为空闲而重启**
   - **摘要**: 长时间运行的后台命令（如 Python 训练脚本）因输出被缓冲，进程实际运行但输出文件为空，导致模型误判并重新启动 Shell，引发循环。
   - **社区反应**: 典型的高频开发痛点，社区迅速提交了修复 PR #7627。开发者对后台任务状态的可靠感知需求迫切。
   - **链接**: https://github.com/QwenLM/qwen-code/issues/7626

2. **[Bug] 微信频道无法使用**
   - **摘要**: 配置并开启微信频道后，发送消息即导致终端报错 `session/cancel` 内部错误，渠道无法正常通讯。
   - **重要性**: 核心渠道阻塞性 Bug，严重影响国内用户的基础使用体验。
   - **链接**: https://github.com/QwenLM/qwen-code/issues/7590

3. **[Bug] Daemon EventBus 资源硬编码 (DAEMON-009/010/011)**
   - **摘要**: 守护进程可靠性审计覆盖三项 P2 资源边界缺口，包括实时日志的无限制增长、抛弃监听器泄漏和字节预算绕过。
   - **社区反应**: 分析日志专业详尽，上游开发者积极响应并提交了修复 PR #7622。
   - **链接**: https://github.com/QwenLM/qwen-code/issues/7621

4. **[Feature] 提议添加外部上下文提供器 (External Context Provider Profile)**
   - **摘要**: 建议允许 Qwen Code CLI 从管理员绑定的外部知识服务中检索仓库共享上下文，而无需修改核心。
   - **社区反应**: 处于讨论阶段，反映了社区对团队协作和 IDE/知识库集成的高度期待。
   - **链接**: https://github.com/QwenLM/qwen-code/issues/7585

5. **[Feature] Fork Profiles：命名工具限制预设**
   - **摘要**: 引入命名预设系统，为 Fork 子进程预定义可执行工具集合和系统提示，基于项目存储。指向精细化 SubAgent 权限管理。
   - **重要性**: 随着多子代理协作越来越普遍，细粒度的 Fork 权限管控成为刚需。
   - **链接**: https://github.com/QwenLM/qwen-code/issues/7625

6. **[Bug] Telegram 回复始终发到 #general 而非话题线程 (已修复)**
   - **摘要**: 在开启 Topic 的超级群组中，Bot 的回复全部跑到主话题下，不跟随用户发送的话题路由。
   - **社区反应**: 外部开发者已贡献修复并合入主线，体现了活跃的社区贡献氛围。
   - **链接**: https://github.com/QwenLM/qwen-code/issues/7609

7. **[Feature] 为 Daemon 添加渠道消息主动投递 (已合并)**
   - **摘要**: 增加 Daemon 级别的消息投递契约，允许已认证的调用者向指定 IM 目标直接发送内容，无需调用模型消息工具。是构建自动化任务和定时通知的关键基础。
   - **重要性**: 打通了后台服务与用户主动交互的最后一公里。
   - **链接**: https://github.com/QwenLM/qwen-code/issues/7387

8. **[Enhancement] MCP Cua Driver 上游依赖如何更好地协同**
   - **摘要**: Cua Driver 创始人 (Francesco) 主动在 Issue 中沟通如何将当前嵌入式依赖转为直接上游依赖，以降低同步成本。
   - **社区反应**: 展示了 Qwen Code 生态系统与第三方核心库的深度耦合及治理思考。
   - **链接**: https://github.com/QwenLM/qwen-code/issues/7618

---

## 重要 PR 进展

1. **[Feature] 可配置的图像生成模型**
   - **内容**: 新增可配置的图像生成模型，支持 `/model --image` 切换，并内置审批流程。将 AI 编程助理从文本扩展到图像创作。
   - **链接**: https://github.com/QwenLM/qwen-code/pull/7607

2. **[Feature] CLI 历史会话引用 (@session:)**
   - **内容**: 在交互界面使用 `@` 直接引用历史会话，自动注入只读摘要，大幅提升跨会话的上下文利用效率。
   - **链接**: https://github.com/QwenLM/qwen-code/pull/7302

3. **[Fix] 后台任务存活检测**
   - **内容**: 针对 #7626，为后台 Shell 添加轻量级存活 Sidecar，每 5 秒刷新状态，输出为空时不再误杀进程。
   - **链接**: https://github.com/QwenLM/qwen-code/pull/7627

4. **[Fix] Session 事件管道资源硬编码**
   - **内容**: 解决 #7621，加固 EventBus 边界：拒绝不可序列化事件、限制实时日志上限、修复中止监听器泄漏。
   - **链接**: https://github.com/QwenLM/qwen-code/pull/7622

5. **[Feature] `/learn` 命令支持原生视频输入**
   - **内容**: `/learn` 指令现在支持本地视频文件和 HTTP(S) 视频 URL，自动检测模型视频模态并提取内容，构建学习知识点。
   - **链接**: https://github.com/QwenLM/qwen-code/pull/7497

6. **[Feature] 普通会话计划执行可视化**
   - **内容**: 为普通会话添加工作流依赖图，将 Todo 计划、Agent 执行和历史记录映射在一块，提升会话计划的可视追踪能力。
   - **链接**: https://github.com/QwenLM/qwen-code/pull/7580

7. **[Fix] Web Shell 解析 256 色/真彩色 SGR 序列**
   - **内容**: 修复 `parseAnsi` 方法，正确处理扩展前景色/背景色参数 (38/48/58)，大幅提升 Web 终端中对命令行工具输出的渲染兼容性。
   - **链接**: https://github.com/QwenLM/qwen-code/pull/7620

8. **[Feature] Web Shell Git 模式选择器**
   - **内容**: 新建会话时支持三种 Git 工作流选择（当前分支、新建分支、Fork），集成在 Composer 的 Git 芯片弹窗中，简化 Web 端分支管理体验。
   - **链接**: https://github.com/QwenLM/qwen-code/pull/7471

9. **[Fix] 补全破坏性 Git 命令防护模式**
   - **内容**: 将 `git clean` 和 `git checkout` 的更隐蔽拼写加入 `DESTRUCTIVE_GIT_PATTERNS` 黑名单，堵住安全绕过漏洞。
   - **链接**: https://github.com/QwenLM/qwen-code/pull/7531

10. **[Fix] 忽略空闲时 ACP 取消错误**
    - **内容**: 渠道发送 `session/cancel` 时，若模型处于空闲状态，将 `Not currently generating` 响应视为正常，不再传播内部错误。
    - **链接**: https://github.com/QwenLM/qwen-code/pull/7598

---

## 功能需求趋势

从昨日活跃的 Issue 和 PR 中，社区的核心功能关注方向包括：

1. **多模态与内容创作**：图像生成模型的可配置化 (#7607) 与 `/learn` 视频输入支持 (#7497)，表明社区期望 Qwen Code 成为一个真正的多模态创作工作台，而不仅是文本编码工具。
2. **协作与上下文共享**：外部上下文提供器 (#7585)、CLI 历史会话引用 (#7302)、Fork 工具限制预设 (#7625) 等需求，集中指向大型项目中的团队协作和上下文精细控制。
3. **自动化与后台任务可靠性**：Daemon 渠道消息主动投递 (#7387) 和后台进程存活检测 (#7627) 说明构建可靠的异步自动化工作流是当前核心攻克点。
4. **渠道与生态集成**：微信/Telegram 渠道的持续修复，以及 MCP Cua Driver 的治理讨论，反映出生态系统的深度集成诉求。

---

## 开发者关注点

- **渠道体验不稳定**：微信频道直接崩溃 (#7590) 和 Telegram 话题路由错误 (#7609) 是当前开发者在使用即时通讯渠道时的最大障碍。渠道稳定性排在痛点首位。
- **后台进程管理粗糙**：由于 BUFFER 问题导致后台任务被错误重启 (#7626) 极为影响长时间训练或构建任务，是对“后台”语义的严重误判。Liveness 检测 PR (#7627) 的迅速提出印证了问题的严重性。
- **守护进程“老龄化”问题**：随着 Daemon 运行时间增加，EventBus 日志无上限增长、监听器泄漏等问题逐渐暴露 (DAEMON 系列 #7621)，长期会话的可靠性是进阶用户的核心关切。
- **安全与效率的摩擦**：开发者既要求 Git Guard 绝对牢靠 (#7531)，又渴望工作区信任改动能够热生效 (#7268) 以摆脱频繁重启的打断。安全策略的零摩擦化是持续改进的方向。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，以下是根据你提供的 GitHub 数据生成的 2026-07-24 Hermes 社区动态日报。

---

## Hermes Agent 社区动态日报 | 2026-07-24

### 1. 今日速览

今日社区工作重心向 **“可靠性修复”** 与 **“MoA 体验精细化”** 倾斜。一方面，Gateway 重启导致的状态丢失、SQLite 连接泄漏及 WebSocket 风暴等严重影响稳定性的问题正在被密集修复；另一方面，核心贡献者 `teknium1` 连开多个 PR，为 MoA（混合代理）架构带来了 Advisor 可见性、隐私过滤及流式处理的关键升级。此外，OpenRouter 缓存功能引发的安全问题已被迅速热修复。

### 2. 版本发布

*   无

### 3. 社区热点 Issues

*(共计 9 条最新活跃 Issue，以下全部列出)*

1.  **#67762 [Critical Bug] Gateway 重启后会话费用预估重置为 $0**
    *   **作者:** @DavidMetcalfe | **[链接](https://github.com/NousResearch/hermes-agent/issues/67762)**
    *   **摘要:** `agent.session_estimated_cost_usd` 在 Gateway 重启后无法从 SQLite 正确反序列化（rehydrate）。社区将其标记为 Blocker 级 Bug，因为它直接导致所有依赖会话内运行成本的功能瘫痪，严重影响计费展示和用户体验。

2.  **#69930 [Bug] 桌面端 GUI WebSocket 持续断连重连，UI 严重冻结**
    *   **作者:** @nkeating-cmd | **[链接](https://github.com/NousResearch/hermes-agent/issues/69930)**
    *   **摘要:** 桌面端 WebSocket 在单日内发生了高达 572 次断开和 574 次重连。Electron 渲染器在重连期间被挂起，导致 UI 出现严重冻结，仅能通过用户输入暂时恢复。这暴露了桌面端会话维持机制的严重缺陷。

3.  **#70387 [Security Bug] OpenRouter Beta 响应缓存默认开启，可回放过期工具调用**
    *   **作者:** @JoaoMarcos44 | **[链接](https://github.com/NousResearch/hermes-agent/issues/70387)**
    *   **摘要:** `response_cache` 的默认开启被视为一个安全/兼容性风险。当启用时，OpenRouter 可能对相似请求直接返回之前缓存的完整响应（包含旧的工具调用），而非发起新推理。该问题已通过 PR #70388 紧急修复。

4.  **#513 [Feature Request] 双阶段上下文管理（Prune 修剪 + 压缩）**
    *   **作者:** @teknium1 | **[链接](https://github.com/NousResearch/hermes-agent/issues/513)**
    *   **摘要:** 受 Kilocode 启发，建议从单阶段“直接摘要”改为双阶段：先反向修剪（Prune）工具输出，再进行 LLM 压缩。社区讨论热烈，认为这能显著降低成本并提高压缩质量。

5.  **#59496 [Bug] 上下文压缩引擎在窗口为零时仍被错误调用**
    *   **作者:** @j2h4u | **[链接](https://github.com/NousResearch/hermes-agent/issues/59496)**
    *   **摘要:** 压缩边界逻辑调整后，仍存在边界情况导致压缩窗口为零，但系统仍向引擎发送空的 `turns_to_summarize` 参数，导致内部异常。

6.  **#29390 [Feature Request] 空闲会话预压缩机制**
    *   **作者:** @tymrtn | **[链接](https://github.com/NousResearch/hermes-agent/issues/29390)**
    *   **摘要:** 针对长时间空闲且即将触发压缩阈值的会话，建议在用户回来前自动进行预压缩，避免用户刚恢复对话时因压缩而打断交互流程。

7.  **#65092 [Bug] Gemini 在 MoA 聚合模式下因缺少 `thought_signature` 全部拒绝**
    *   **作者:** @kenmjlee | **[链接](https://github.com/NousResearch/hermes-agent/issues/65092)**
    *   **摘要:** Gemini API 在作为 MoA 的聚合器（Aggregator）时，要求函数调用必须携带 `thought_signature` 字段。当前缺失该字段导致所有请求返回 400 错误，使得 Gemini 完全无法在 MoA 模式下工作。

8.  **#69027 [Bug] 桌面端多任务执行弹窗与聊天历史重叠**
    *   **作者:** @ac1349516890-crypto | **[链接](https://github.com/NousResearch/hermes-agent/issues/69027)**
    *   **摘要:** 当代理执行多任务时，弹出的任务列表在聊天区域滚动时与上方的历史消息发生视觉重叠和混乱，影响桌面端用户界面体验。

9.  **#70389 [Feature Request] 改进 WhatsApp 平台搭建指南**
    *   **作者:** @amodhakal | **[链接](https://github.com/NousResearch/hermes-agent/issues/70389)**
    *   **摘要:** 现有的 WhatsApp 配置指引直接导向底层 Go 库（whatsmeow），缺乏针对 Hermes 的具体配置步骤。用户呼吁补充 Hermes 层级的配置文档，降低上手门槛。

### 4. 重要 PR 进展

*(挑选过去 24 小时内更新或创建的 10 个关键 PR)*

1.  **#70283 [MoA] 重构桌面/TUI Advisor 可见性、进度指示及开关控制**
    *   **作者:** @teknium1 | **[链接](https://github.com/NousResearch/hermes-agent/pull/70283)**
    *   **摘要:** 为 MoA 的 Advisor 管道带来全面可视化与可控制性：推理块累加显示、实时 Fanout 进度指示、新增预设开关和单 Advisor 开关，大幅改善了用户对 MoA 流程的感知与调试能力。

2.  **#70280 [MoA] 修复推理签名完整性、流中断处理及 Facade 恢复**
    *   **作者:** @teknium1 | **[链接](https://github.com/NousResearch/hermes-agent/pull/70280)**
    *   **摘要:** 一次性修复 MoA 虚拟 Provider 的四个核心身份断裂问题：确保 Gemini 的 `thought_signature` 在聚合路径正确传递、流式中断正确处理、故障后 Facade 恢复、以及 Copilot Advisor 调用归属的正确 attribution。

3.  **#70284 [MoA] 新增 Fanout 节奏控制与隐私脱敏过滤**
    *   **作者:** @teknium1 | **[链接](https://github.com/NousResearch/hermes-agent/pull/70284)**
    *   **摘要:** 新增两个可选控制开关：`every_n` 机制控制 Advisor 执行 cadence，可复用缓存；隐私脱敏过滤器，可控制显示或完整屏蔽敏感内容。

4.  **#68912 [State] 统一 SQLite 配置并修复 macOS/NFS 等 WAL 损坏问题**
    *   **作者:** @smfworks | **[链接](https://github.com/NousResearch/hermes-agent/pull/68912)**
    *   **摘要:** 针对 WAL 模式在 virtiofs/NFS/SMB 文件系统上的崩溃问题，引入了可配置的 `journal_mode`，并统一了 Hermes 中所有 SQLite 打开器的连接逻辑，防止数据损坏。

5.  **#68891 [Perf] 缩小 FTS 触发器范围，提升大规模数据库写入性能**
    *   **作者:** @smfworks | **[链接](https://github.com/NousResearch/hermes-agent/pull/68891)**
    *   **摘要:** 在大型 `state.db` 上执行压缩时，对 `active`/`compacted` 等状态字段的更新触发了不必要的 FTS 索引重建。该 PR 限制仅内容变更时才触发 FTS 删除/重建，大幅降低了 IO 消耗。

6.  **#69681 [Fix] 关闭 Gateway/Tools/Agent 中泄漏的 SQLite 连接**
    *   **作者:** @dhruvraajeev | **[链接](https://github.com/NousResearch/hermes-agent/pull/69681)**
    *   **摘要:** 修复了三个持久化 SQLite 账本中的文件描述符泄漏问题。之前的 `with _connect()` 写法只提交/回滚事务，并未实际关闭连接，导致资源耗尽。

7.  **#70388 [Fix] 默认关闭 OpenRouter 响应缓存**
    *   **作者:** @JoaoMarcos44 | **[链接](https://github.com/NousResearch/hermes-agent/pull/70388)**
    *   **摘要:** 针对 Issue #70387 的紧急修复。将 OpenRouter 的 `response_cache` 默认值设为 `False`，规避了因 Beta 缓存特性导致工具调用被错误回放的安全风险。

8.  **#70345 [Fix] 加固 Gateway 适配器连接超时处理，防止重连死锁**
    *   **作者:** @VaitaR | **[链接](https://github.com/NousResearch/hermes-agent/pull/70345)**
    *   **摘要:** 修复了 `connect()` 函数吞掉 `CancelledError` 异常，导致 Gateway 重连逻辑被永久阻塞的问题。通过分离（detach）超时任务来确保超时后依然能正确触发重连。

9.  **#43644 [Feature] API Server 支持 Responses API 推理项输出**
    *   **作者:** @connorblack | **[链接](https://github.com/NousResearch/hermes-agent/pull/43644)**
    *   **摘要:** `/v1/responses` 端点现在可以透出模型的推理过程（reasoning items），并可被 Open WebUI 等标准客户端渲染。该特性默认关闭，确保了向后兼容性。

10. **#70397 [Feature] Android PWA 支持与全面移动端 Dashboard 优化**
    *   **作者:** @Gunner2nd88 | **[链接](https://github.com/NousResearch/hermes-agent/pull/70397)**
    *   **摘要:** 新增 Android 渐进式 Web 应用（PWA）支持，包含 Manifest、Service Worker 以及针对移动端的响应式布局优化，显著提升了手机端访问 Dashboard 的体验。

### 5. 功能需求趋势

*   **Agent 协作深度可视化与控制（MoA）：** 用户不再满足于黑盒的 MoA，强烈要求对每个 Advisor 的执行过程（推理、进度）有细粒度的可视性（#70283），并对隐私（#70284）和调度节奏（#70284）拥有控制权。
*   **智能上下文管理：** 从单一的“接近阈值就压缩”，向更精细的“双阶段修剪压缩”（#513）、“空闲预压缩”（#29390）演进，追求更低成本和更优的用户体验。
*   **状态基础设施强化：** 大量 PR 聚焦于 SQLite 的 WAL 模式修复（#68912）、FTS 性能优化（#68891）和连接泄漏（#69681），社区对 Gateway 后端的持久化和稳定性要求达到了新高度。
*   **跨平台客户端统一：** 桌面端 WebSocket 稳定性（#69930）、Web 端 PWA 支持（#70397）表明，社区用户群体正在从纯 CLI 向桌面 GUI 和移动端 Web 多元化发展。
*   **安全与合规基线提升：** OpenRouter 缓存事件（#70387）和隐私脱敏过滤（#70284）的提出，标志着社区开始主动关注 Agent 工作流中的安全边界和数据隐私问题。

### 6. 开发者关注点（痛点与高频需求）

*   **Gateway / SQLite 持久化层是当前最大的稳定性瓶颈：** GATEWAY 重启导致状态丢失、SQLite 连接泄漏、WAL 损坏。这些问题成为影响所有用户的通用痛点，是当前社区投入修复资源最多的领域。
*   **MoA 架构的工程成熟度仍需打磨：** 尽管 MoA 是核心卖点，但 `thought_signature` 丢失、Facade 无法恢复、UI 在重连时冻结等问题频发，说明该架构的代码路径复杂，边缘情况较多，调试和测试成本很高。
*   **第三方 Provider 的适配负担重：** OpenRouter 的 Beta 特性（缓存）和 Gemini 的特殊要求（签名）都需要逐个适配和紧急修复，导致维护成本增加，开发者倾向于默认关闭或启用更保守的配置。
*   **缺少平台级入门文档：** WhatsApp 搭建指南的抱怨是一个典型例子。用户期待的是“Hermes 如何配置 WhatsApp”的端到端教程，而非甩给底层 Go 库的链接。文档缺口是阻碍新平台用户转化的重要因素之一。

</details>
