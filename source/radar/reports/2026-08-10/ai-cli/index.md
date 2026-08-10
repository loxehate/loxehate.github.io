---
title: "AI CLI 工具社区动态日报"
date: 2026-08-10
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# AI CLI 工具社区动态日报 2026-08-10

> 生成时间: 2026-08-10 01:43 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-08-10）

## 1. 生态全景

当前 AI CLI 工具已从“能对话、能写码”的初期阶段，进入“可信赖、可管控、可嵌入工作流”的深水区竞争。头部商业工具如 Claude Code、OpenAI Codex 围绕安全策略、模型切换、多代理能力快速迭代，但社区反馈集中在安全机制误判、数据持久化缺陷和跨平台稳定性上。开源工具如 Gemini CLI、Qwen Code、Hermes 则通过 nightly/高频发版加速功能扩展，共性痛点集中在上下文管理、子代理可观察性、Windows/Linux/Web 端兼容性。整体呈现出“模型能力驱动、平台战争与基础工程补课并行”的态势。

## 2. 各工具活跃度对比

> 口径说明：各日报披露的“热点/重要/活跃”项数量或 PR 更新总数，并非 GitHub 全量 Issue/PR 数据。

| 工具 | Issues（热点/活跃） | PR（更新/重要） | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 5 | 无 |
| OpenAI Codex | 10 | 7 | 无 |
| Gemini CLI | 10 | 10 | v0.56.0-nightly.20260810 |
| DeepSeek Reasonix | 10 | 10 | v1.21.5 / v1.21.4（08-09 发布） |
| OpenCode | 10 | 10 | 无 |
| Qwen Code | 3 | 50（精选 10） | v0.21.8-nightly.20260810 |
| Hermes | 7 | 50（精选 10） | 无 |

**简单解读**：Qwen Code 和 Hermes 当日 PR 更新量最大，呈快速迭代状态；Claude Code 和 OpenAI Codex 虽无发版，但社区讨论热度集中在安全策略和数据可靠性等关键问题上。

## 3. 共同关注的功能方向

### 3.1 模型与安全策略的可配置性、透明性
- **Claude Code**：Fable 5 安全分类器误判正常工程内容，强制降级且 `/model` 无法覆盖，用户要求可配置、可撤销。
- **OpenCode**：原生 Model Fallback/Failover 支持呼声高（👍 107），非流式代理兼容性长期缺失。
- **Gemini CLI**：策略引擎 Bug 影响工具批准，YOLO/AUTO_EDIT 模式出现多余提示。
- **Hermes**：Agent 在 Windows 上对 `C:\` 根目录执行 `rd /s /q`，暴露破坏性命令边界审核缺失。

### 3.2 会话生命周期、跨端同步与数据持久性
- **Claude Code**：跨目录恢复会话（👍 76）为今日最高赞需求；固定会话保护、30 天保留策略误删数据均有报告。
- **OpenAI Codex**：跨 ChatGPT 网站/桌面端/VS Code 同步聊天记录，获 👍 63。
- **DeepSeek Reasonix**：用户要求批量选择/删除会话（#8120）。
- **OpenCode**：提出持久会话 daemon + 零工具调用记忆（#41453）。
- **Hermes**：`repair_message_sequence` 只修内存不落库，持久化交替违规可重触发。

### 3.3 子代理/多代理协作的可观察性与可靠性
- **Gemini CLI**：子代理超过 MAX_TURNS 仍误报 GOAL 成功；正在实现 Agent 调用 Agent。
- **Claude Code**：子代理 effort 级别不可观察（#85416）。
- **OpenCode**：嵌套子代理权限请求静默挂起（#13715）。
- **DeepSeek Reasonix**：将子代理委托改为“契约”并测量成本，发现强制委托导致 2-4× 成本增加。
- **Qwen Code**：RFC #8718 提出 leader-worker 多会话协调机制。

### 3.4 上下文管理与压缩效率
- **DeepSeek Reasonix**：自动压缩“说一句话压缩一次”、前缀缓存击穿导致成本增加 50-120×。
- **OpenCode**：上下文溢出压缩存在无限循环风险（#37584）。
- **Gemini CLI**：探索 AST 感知的文件读取/搜索，减少 token 消耗。
- **Qwen Code**：Web UI 新增环形上下文占用指示器，提升可见性。

### 3.5 跨平台兼容性：Windows、Web Terminal、Wayland
- **OpenAI Codex**：Windows Computer Use 失败、文件行结尾被改写、IDE 扩展 Prompt 丢失。
- **Qwen Code**：Web 终端 TUI 闪烁/撕裂，疑似 Virtualized History 不兼容。
- **Gemini CLI**：浏览器子代理在 Wayland 下失败。
- **Hermes**：Linux/Wayland 下 HUD 无法拖动。
- **Claude Code**：Windows MSIX 崩溃导致本地数据全毁。

### 3.6 插件/技能生态规范化与真实性验证
- **Claude Code**：修复技能名称不符合规范、YAML 块标量解析缺陷。
- **Gemini CLI**：将 `code_explorer` 等技能名改为符合 Agent Skills 规范。
- **Hermes**：社区引用官方文档质疑“curator 从不测试 skill 是否真正有效”，要求自主评估闭环。
- **Qwen Code**：核心层开始支持 Qoder 插件扩展，为第三方能力接入打基础。

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特点 |
|---|---|---|---|
| **Claude Code** | 深度工程代理，强插件/技能生态 | 专业开发者、Anthropic 模型重度用户 | 安全策略强介入，但当前引发信任危机；桌面端与 CLI 并行，生态最完整 |
| **OpenAI Codex** | ChatGPT/VS Code 生态入口，IDE 优先 | OpenAI 生态开发者、企业用户 | 闭源商业路线，强调跨端同步与 MultiAgentV2；Windows 平台问题集中暴露 |
| **Gemini CLI** | Google 多模型支持，Agent 协作与评估体系 | Google Cloud 用户、多模型开发者 | nightly 激进迭代；重视 AST 代码理解、组件级评估、子代理递归 |
| **DeepSeek Reasonix** | 上下文压缩、缓存效率与推理控制 | 成本敏感的长会话用户、中文社区 | 多供应商支持；已形成“压缩遥测 + 幂等投影”的系统化修复思路 |
| **OpenCode** | 开源多 provider TUI，极致可定制 | 开源社区、自托管/企业代理用户 | V2 架构重构中；社区长尾 bug 积压，但方向明确：模型容错、ACP 超时、worktree 工作流 |
| **Qwen Code** | Qwen 模型 + 云/Web 开发场景 | 阿里云/Qwen 用户、WebShell 使用者 | 高频 nightly；推进 daemon、WebShell、多会话协调、Qoder 插件 |
| **Hermes** | 多平台消息自动化与个人助理 | Telegram/微信/QQ 等消息平台用户 | 适配器驱动；终端/沙箱可扩展；但安全边界和状态持久化是明显短板 |

## 5. 社区热度与成熟度

- **用户关注度最高的议题**：Claude Code 跨目录恢复会话 👍 76、OpenCode 剪贴板复制失效 👍 110 / 💬 122（积压近 9 个月）、OpenAI Codex 行结尾问题 👍 74（已修复）。显示出“高赞”集中在数据完整性、基础交互和平台兼容上。
- **商业成熟但信任承压**：Claude Code 生态深、插件多，但安全分类器误判、deny 后工具仍执行等事件，正在侵蚀用户信任；OpenAI Codex 官方修复速度快，但 Windows/IDE 稳定性问题仍是最大短板。
- **快速迭代型**：Gemini CLI、Qwen Code、Hermes 均依赖高频发版，PR 数量大，但伴随 P1 Bug 和安全风险（如 Hermes 的 `rd /s /q` 事件），属于“功能先行、稳定性追赶”。
- **开源但长尾问题明显**：OpenCode 社区讨论积极，但剪贴板等基础 bug 数月未修，V2 重构也带来新的兼容性摩擦；DeepSeek Reasonix 对上下文压榨较深，问题闭环速度快，v1.22.0 可期。
- **总体判断**：Claude Code 与 OpenAI Codex 在“生态成熟度”上领先，但“稳定可靠性”评价受近期事故拖累；Gemini/Qwen/Hermes 处于快速功能扩张期；OpenCode 与 Reasonix 更依赖社区力量，呈现“小而深”的迭代路径。

## 6. 值得关注的趋势信号

1. **“可信执行”成为竞争分水岭**：安全分类器误判、拒绝后工具仍执行、破坏性命令缺少边界审核——这些问题已从个例上升为系统性信任危机。未来工具的差异将体现在“安全机制可配置、可审计、可回滚”上。
2. **多代理协作必须附带可观察性**：多个工具被“子代理挂起、误报成功、状态不可见”困扰。开发者不再满足于“能调用子代理”，而是要求看到 effort 级别、执行轨迹、终止原因和成本消耗。
3. **上下文成本管理是长会话实用性的前提**：DeepSeek 压缩异常导致缓存击穿、OpenCode 压缩死循环、Gemini AST 降 token……谁能提供可预测、可控制的上下文机制，谁就能在长任务和成本敏感场景胜出。
4. **跨平台兼容性从加分项变为必答题**：Windows、Wayland、Web Terminal 的报告密集出现，说明开发者环境已高度多元化。工具若只保证 macOS 体验，将失去大量企业级用户。
5. **插件/技能生态进入“标准化治理”阶段**：命名规范、YAML 解析、技能真实有效性验证成为共同主题，意味着生态竞争从“数量”转向“质量和互操作性”。
6. **数据持久化与跨端同步是用户基础诉求，也是口碑雷区**：会话丢失、同步失败、保留策略误删等问题反复出现，未来数据工程能力将直接决定用户对工具的长期信任。

---

**总结**：2026 年的 AI CLI 竞争已从模型能力单点比拼，转向“安全可控、多代理可靠、跨端一致、生态规范”的系统性工程竞争。商业工具需尽快修复信任裂痕，开源工具则应在快速迭代中补足安全与数据可靠性底线。对技术决策者而言，选型时不仅要看模型效果，更需要评估工具在权限边界、上下文管理、可观测性和跨平台支持上的真实成熟度。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截至 2026-08-10）

## 1. 热门 Skills 排行（评论数 TOP 8）

| # | PR / 技能 | 核心内容 | 社区讨论热点 | 状态 |
|---|-----------|----------|--------------|------|
| 1 | [**skill-creator 评估链路修复** #1298](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 恒定报告 0% recall 的 Bug，将 eval 产物安装为真实 skill，并修复 Windows 流读取、触发检测与并行 worker | 引用 #556 及 10+ 独立复现，是当前仓库最严重的工具链缺陷——描述优化循环"在噪声上优化" | OPEN |
| 2 | [**document-typography** #514](https://github.com/anthropics/skills/pull/514) | 新增排版质量检查技能：孤儿词换行、寡段（标题滞留页底）、编号错位 | 直击 AI 生成文档的普遍排版痛点，讨论聚焦触发范围与检查规则边界 | OPEN |
| 3 | [**PDF 大小写引用修复** #538](https://github.com/anthropics/skills/pull/538) | 修正 `SKILL.md` 中 8 处 `REFERENCE.md`/`FORMS.md` 大小写不匹配 | 导致大小写敏感文件系统（Linux/macOS）上 PDF skill 引用失效 | OPEN |
| 4 | [**ODT 技能** #486](https://github.com/anthropics/skills/pull/486) | 新增 OpenDocument 技能：ODT/ODS 创建、模板填充、ODT→HTML 转换 | 社区关注对 ISO 标准开放文档格式的官方支持缺口 | OPEN |
| 5 | [**frontend-design 重构** #210](https://github.com/anthropics/skills/pull/210) | 重写前端设计技能，提升指令可执行性与内部一致性 | 核心议题：设计指南如何做到"在单次会话内真正可被 Claude 执行" | OPEN |
| 6 | [**skill-quality-analyzer / skill-security-analyzer** #83](https://github.com/anthropics/skills/pull/83) | 新增两个元技能：质量分析（结构/文档/示例/资源五维评估，20% 权重分档）+ 安全分析 | 反映社区对 Skill 本身质量与安全性进行规范化审视的需求 | OPEN |
| 7 | [**DOCX w:id 冲突修复** #541](https://github.com/anthropics/skills/pull/541) | 修复跟踪修订与已有书签共享 `w:id` ID 空间导致的文档损坏 | OOXML 中硬编码低 ID 与用户文档冲突，直接关系生成文档可靠性 | OPEN |
| 8 | [**skill-creator YAML 预校验** #539](https://github.com/anthropics/skills/pull/539) | 对未加引号且含特殊字符的 description 字段提前告警 | 防止 `yaml.safe_load()` 静默截断 description / 拆分为多个键 | OPEN |

## 2. 社区需求趋势（来自 Issues）

- **安全与信任边界（最热议题）**：[#492](https://github.com/anthropics/skills/issues/492)（43 评论）指出社区技能在 `anthropic/` 命名空间下分发，冒充官方技能、构成信任边界滥用；[#1175](https://github.com/anthropics/skills/issues/1175) 关注在 SKILL.md 中编写权限逻辑的安全隐患。
- **企业级共享与分发**：[#228](https://github.com/anthropics/skills/issues/228)（8 👍）要求 org-wide 技能库/分享链接，替代手动下载上传；[#189](https://github.com/anthropics/skills/issues/189)（9 👍）反映 `document-skills` 与 `example-skills` 安装后内容重复、浪费上下文。
- **skill-creator 工具链可靠性**：[#556](https://github.com/anthropics/skills/issues/556)（7 👍）、[#1169](https://github.com/anthropics/skills/issues/1169) 报告 `run_eval.py` 对所有查询 0% 触发率；[#202](https://github.com/anthropics/skills/issues/202) 批评 skill-creator 写得像"人类文档"而非可执行操作指令。
- **上下文窗口与性能**：[#1487](https://github.com/anthropics/skills/issues/1487) 报告 `claude-api` 技能单次注入 ~156k tokens 直接耗尽上下文。
- **新 Skill 方向提案**：[#1329](https://github.com/anthropics/skills/issues/1329) compact-memory（符号化紧凑记忆）、[#412](https://github.com/anthropics/skills/issues/412) agent-governance（代理安全治理）、[#1385](https://github.com/anthropics/skills/issues/1385) 推理质量门禁流水线。
- **平台互操作**：[#29](https://github.com/anthropics/skills/issues/29) 询问 AWS Bedrock 支持；[#16](https://github.com/anthropics/skills/issues/16) 提议将 Skills 以 MCP 协议暴露。
- **文档可靠性**：[#12](https://github.com/anthropics/skills/issues/12) DOCX 技能因多余空白符重排导致 Word 文档损坏。

## 3. 高潜力待合并 Skills

以下 PR 均处于 OPEN 状态但讨论活跃、直击真实痛点，近期落地可能性较高：

- **skill-creator 修复集群**（合并优先级最高）：[#1298](https://github.com/anthropics/skills/pull/1298)、[#1323](https://github.com/anthropics/skills/pull/1323)、[#1261](https://github.com/anthropics/skills/pull/1261)、[#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050) —— 针对 #556/#1169 的 0% recall 与 Windows 子进程崩溃，属同一根因的多种解法，官方应会择优合并。
- [**ODT 技能 #486**](https://github.com/anthropics/skills/pull/486)：补齐官方缺失的 OpenDocument 格式支持，覆盖面广（创建/填充/转换/解析）。
- [**testing-patterns #723**](https://github.com/anthropics/skills/pull/723)：覆盖 Testing Trophy 模型、单测/React 组件测试/命名规范等完整测试栈，方向确定性高、社区共识强。
- [**pyxel 游戏开发技能 #525**](https://github.com/anthropics/skills/pull/525)：面向 Pyxel 复古游戏引擎 + MCP 的工作流（write → run_and_capture → inspect → iterate），场景垂直且完整。
- [**color-expert #1302**](https://github.com/anthropics/skills/pull/1302)：整合 ISCC-NBS、Munsell、OKLCH/CAM16 等色彩体系与色域转换决策表，内容自包含、通用性强。
- [**self-audit #1367**](https://github.com/anthropics/skills/pull/1367) 与 [**plan-file-hygiene #1479**](https://github.com/anthropics/skills/pull/1479)：前者做交付前机械文件校验 + 四维推理审计，后者治理规划产物堆积，均响应了社区对"输出质量门槛"的诉求。

## 4. Skills 生态洞察

**一句话总结**：当前社区最集中的诉求是——先修好 skill-creator 工具链自身的可靠性（评估循环 0% recall、Windows 兼容性），同时围绕文档处理、质量/安全审计与企业级分发，持续扩充高质量新 Skill。

---

# Claude Code 社区动态日报 — 2026-08-10

## 今日速览

今日社区热点高度集中在 **Fable 5 安全分类器误判** 问题上：多个用户报告正常工程内容被误判为“网络安全/生物”并强制将会话降级或切换至 Opus 4.8，且无法通过 `/model` 覆盖，相关 Issue 累计已超过 10 条。另一条长期呼声较高的 **跨目录恢复会话** 需求（#28745）以 76 个 👍 成为今日关注度最高的功能请求，但官方尚未回应。PR 方面无重大功能合并，主要是插件/技能的文档与规范修复。

---

## 社区热点 Issues（10 条）

### 1. Safety-classifier 模型切换误判且无法覆盖 | #67246
[#67246](https://github.com/anthropics/claude-code/issues/67246) · 12 条评论 · 👍 3

**高热度核心问题。** 正常工程讨论被 Fable 5 安全分类器标记为“网络安全或生物”并偷偷将模型切换为 Opus 4.8，且 `/model` 无法覆盖这一行为。社区认为安全机制应该可配置、可撤销，而非静默降级。

### 2. 允许从不同目录恢复会话 | #28745
[#28745](https://github.com/anthropics/claude-code/issues/28745) · 11 条评论 · 👍 76

**今日 👍 数最高。** 会话与启动目录强绑定，目录被重命名/删除后无法恢复，频繁切换 worktree 的开发者受影响明显。76 个赞反映出这是一个广泛存在的痛点，属于呼声很高的增强请求。

### 3. UI 语言本地化支持 | #31413
[#31413](https://github.com/anthropics/claude-code/issues/31413) · 13 条评论 · 👍 8

评论数最多的 Issue 之一。用户希望 Claude Code 界面支持多语言（尤其是非英语母语用户），虽然这不是功能优先级最高的方向，但持续有社区关注。

### 4. Windows MSIX 崩溃导致本地数据全毁 | #81306
[#81306](https://github.com/anthropics/claude-code/issues/81306) · 5 条评论 · 👍 0

Windows 桌面端崩溃将 MSIX 包卡死，恢复必须手动删除包，导致 Code-tab 分组和崩溃转储等本地数据全部丢失。涉及桌面端数据完整性的严重缺陷。

### 5. 防止固定（pinned）会话被归档/删除 | #62104
[#62104](https://github.com/anthropics/claude-code/issues/62104) · 5 条评论 · 👍 1

已关闭但被重新讨论。用户要求在 CCD 会话列表中，固定会话的 Archive（A）和 Delete（D）操作应被禁用或要求先取消固定，避免误操作。涉及桌面端会话管理的基础交互设计。

### 6. 跨平台同步失败导致对话消失 | #81658
[#81658](https://github.com/anthropics/claude-code/issues/81658) · 4 条评论 · 👍 3

Desktop/Web/Android 三端同步故障，Cowork 对话和聊天记录消失，疑似服务器端事故。涉及多云同步的数据可靠性问题，若确认是服务端故障，影响面可能很大。

### 7. 桌面应用 30 天保留策略误删唯一副本 | #81100
[#81100](https://github.com/anthropics/claude-code/issues/81100) · 2 条评论 · 👍 0

桌面端 30 天清理机制会删除唯一的 Desktop 会话记录，留下无法打开的“幽灵条目”。作者明确说明与 CLI 端已知 data-loss 问题（#59248）相关但不同，是桌面端独立缺陷。

### 8. 被拒绝的工具调用仍然执行 | #83760
[#83760](https://github.com/anthropics/claude-code/issues/83760) · 2 条评论 · 👍 0

用户对 PowerShell 工具选择“deny”后，该工具竟然照常执行。这属于权限控制类严重 bug，直接冲击用户对工具审批机制的信任。

### 9. 子代理 effort 级别不可观察 | #85416
[#85416](https://github.com/anthropics/claude-code/issues/85416) · 0 条评论

今日新建的增强请求。用户无法查看后台子代理实际运行的 effort 配置 — 无论是从子代理内部、Agent 工具结果还是 UI 都不可见。这导致 effort 配置可能失效而用户完全不知情。

### 10. 多会话同秒启动时 socket-bind 静默失败 | #85412
[#85412](https://github.com/anthropics/claude-code/issues/85412) · 0 条评论

今日新建的高质量 bug 报告。5 个长会话由 launchd 脚本在同一秒内启动，socket-bind 竞争导致跨会话消息功能静默失效，且无日志提示。对自动化/脚本化使用场景影响明确。

---

## 重要 PR 进展（共 5 条，全部列出）

### 1. security-guidance: 更新默认模型引用至 Opus 5/Sonnet 5 | #85409
[#85409](https://github.com/anthropics/claude-code/pull/85409) · 打开状态

`security-guidance` 插件中硬编码的默认审阅模型由过时的 Opus 4.7 / Sonnet 4.6 更新为 Opus 5 / Sonnet 5。典型的文档同步型修复，虽小但对插件用户有实际影响 — 避免模型不存在或走旧版本。

### 2. fix(plugin-dev): 解析块标量 agent 描述 | #85323
[#85323](https://github.com/anthropics/claude-code/pull/85323) · 打开状态

修复 #83803 中剩余的 YAML 块标量解析缺陷。`validate-agent.sh` 现在能正确处理 `description: |` / `description: >` 多行值，不再把标量标记符当作整个描述。对插件开发者有实际价值。

### 3. fix(skills): 使用符合规范的名字 | #85243
[#85243](https://github.com/anthropics/claude-code/pull/85243) · 打开状态

8 个内置技能声明了含空格且标题大写的 `name`（如 `Writing Hookify Rules`、`Agent Development`），不符合技能规范。该 PR 将其改为规范形式。影响内置技能的搜索、加载和引用。

### 4. docs: enforce task tool and model metadata | #9262
[#9262](https://github.com/anthropics/claude-code/pull/9262) · 已关闭

文档更新：在 commit 命令文档中补充 `claude-3-5-haiku-latest` 模型参数说明，并要求在 commit 工作流中使用 Task 工具以保证上下文隔离。虽然已关闭，但可能已被合入或取代。

### 5. [Plugin] Add agent-session-commit plugin | #17395
[#17395](https://github.com/anthropics/claude-code/pull/17395) · 已关闭

新增 `agent-session-commit` 插件，使 AGENTS.md 成为权威项目指令文件，并通过 `/session-commit` 手动或 Stop hook 自动触发会话总结与文档迭代。已被关闭，但代表了一种值得关注的“会话即文档”工作流思路。

---

## 功能需求趋势

从今日全部 Issues 中提炼，社区高关注的功能方向集中在以下 4 个方面：

1. **模型控制与安全策略的可配置性** — 最集中的热点。用户不仅要求使用最新模型（Fable 5），更要求对安全分类器的判定结果有知情权、覆盖权和降级回退机制。相关 Issue 数量今日最多。

2. **会话生命周期与数据持久性** — 跨目录恢复（#28745，👍 76）、固定会话保护（#62104）、防止保留策略误删数据（#81100）、多会话并发可靠性（#85412）均属此类。会话安全、可靠、可控是社区的核心诉求。

3. **可观察性** — 子代理 effort 级别不可见（#85416）、MessageDisplay hook 返回内容不被渲染（#83957）等，说明开发者希望 Claude Code 在内部机制上提供更多透明度，便于排查和精细化控制。

4. **插件/技能生态规范化** — 虽然没有独立的 feature request，但 PR #85243、#85323 反映了社区正在主动完善插件与技能的解析正确性和命名规范性，说明插件生态已进入“修细节”阶段。

---

## 开发者关注点

**安全分类器误判已严重干扰正常工作流。** 今日至少有 10 条 Issue 指向 Fable 5 的 ClAudit 安全过滤器将正常内容（防御性安全审计、DNS 日志统计、M365/Graph 授权讨论）判为“cyber/biology”，并直接导致两条后果：一是会话被**强制降级**或切换到 Opus 4.8，二是整个 session 被**中止**（session-halted）。开发者尤其不满的是：误判提示本身明说“They may flag safe, normal content as well”，但系统仍然没有提供有效的 override 手段（/model 无效），且降级目标是 Opus 4.8 而非同代更高模型，让用户感到被“惩罚”。

**数据丢失类问题反复出现。** 三端同步消失（#81658）、桌面 30 天保留策略删根（#81100）、MSIX 崩溃手动清理导致数据丢失（#81306）——多个独立数据路径存在可靠性问题，且部分报告称“与已知问题相关但不同”，说明 Claude Code 在数据持久化上需要系统性排查，而不是逐个打补丁。

**权限控制出现了信任裂痕。** “deny 之后工具仍然执行”（#83760）是今日最能引起警觉的 bug。无论根因是 UI 状态未同步还是权限判断竞态，都直接影响用户对 Claude Code 工具审批机制的信任，值得官方优先回应。

---

*数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) · 更新窗口：2026-08-09 至 2026-08-10*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时 Codex 无新版本发布，社区焦点集中在 Windows 平台的稳定性问题上：多个用户报告了 Computer Use 功能在 Windows 上因 `EnumWindows` 错误（0x80070003）而失败，以及 IDE 扩展提示随机消失等高频 bug。PR 方面，修复 Windows 文件行结尾的 #37757 已合入，直接回应用了社区高赞 Issue #4003。

## 2. 版本发布

过去 24 小时内无新版本发布。

## 3. 社区热点 Issues（Top 10）

### 🔥 Windows 行结尾问题获高赞，官方已修复
**#4003 [CLOSED] Patched files have mixed line endings on Windows**  
👤 作者: @chausner | 💬 32 评论 | 👍 74 | 🔗 [查看](https://github.com/openai/codex/issues/4003)  
Windows 上 `apply_patch` 未保留文件的原有行结尾，导致混合换行符。该问题获得 74 个 👍 和 32 条讨论，是近期最受关注的 bug 之一，已在今日 PR #37757 中合入修复。

### 💬 聊天记录跨端同步需求激增（63 👍）
**#5609 [OPEN] Sync my chats, conversation history between ChatGPT website, Codex in VScode**  
👤 作者: @interconnectedMe | 💬 6 评论 | 👍 63 | 🔗 [查看](https://github.com/openai/codex/issues/5609)  
用户希望在 ChatGPT 网站、Codex 桌面端、VS Code 扩展等不同平台间同步聊天历史和会话。虽然讨论数不多，但 63 个 👍 显示这是社区最期待的功能之一。

### 🪟 IDE 扩展提示随机消失，Windows 用户受影响
**#25928 [OPEN] VS Code/Cursor Codex Extension: Submitted Prompts Randomly Disappear Before Entering Queue**  
👤 作者: @Avnsx | 💬 25 评论 | 👍 17 | 🔗 [查看](https://github.com/openai/codex/issues/25928)  
在 Cursor（Windows）中，用户提交的 prompt 会随机消失，无法进入队列。17 个 👍 表明不少用户遇到同类问题，严重影响日常使用。

### 🐢 线程切换卡顿质疑为回归
**#11011 [OPEN] Switching between threads is very slow**  
👤 作者: @ImanYZ | 💬 21 评论 | 👍 19 | 🔗 [查看](https://github.com/openai/codex/issues/11011)  
更新后 Codex 桌面端线程切换变得极慢。19 个 👍 说明并非个例，此前 macOS 也出现过类似回归（#20802），社区普遍关注该性能问题。

### 🤖 Windows Computer Use 核心功能失败（多用户报告）
**#37043 [OPEN] Windows Computer Use fails at EnumWindows with error 0x80070003**  
👤 作者: @Moonst | 💬 18 评论 | 👍 4 | 🔗 [查看](https://github.com/openai/codex/issues/37043)  
Computer Use 在 Windows 上无法通过 `sky.list_apps()` / `list_windows()` 枚举窗口，错误码 0x80070003（系统找不到指定路径），重启无法解决。该问题已出现多个重复报告（#37383、#37595、#37734），影响范围较广。

### 🔌 社区呼吁支持入站 MCP 通知
**#15299 [OPEN] Support inbound MCP notifications routed into an active Codex CLI session**  
👤 作者: @jasny | 💬 15 评论 | 👍 14 | 🔗 [查看](https://github.com/openai/codex/issues/15299)  
希望外部渠道能通过 MCP 通知向运行中的 CLI 会话推送消息，而非仅支持 Codex 主动调用 MCP 工具。14 个 👍 表明开发者对双向 MCP 通信有明确需求。

### 🖥️ Computer Use 窗口发现失败——同源问题再现
**#37383 [OPEN] Computer Use on Windows fails during app/window discovery with 0x80070003**  
👤 作者: @dystopia78 | 💬 11 评论 | 👍 4 | 🔗 [查看](https://github.com/openai/codex/issues/37383)  
与 #37043 相同的 `EnumWindows` 0x80070003 错误，用户使用 Pro x5 订阅，在 Windows 11 25H2 上复现。多个独立报告说明该问题不是个例。

### 📂 技能验证器报缺 PyYAML，Windows 用户受阻
**#24195 [OPEN] Bundled skill validator fails because Codex Python lacks PyYAML**  
👤 作者: @stephanpark | 💬 7 评论 | 👍 3 | 🔗 [查看](https://github.com/openai/codex/issues/24195)  
Codex 内置技能验证器依赖 PyYAML，但捆绑的 Python 环境中缺少该库，导致 Windows 用户无法使用技能验证功能。

### 🛠️ 工作树任务未继承自动批准模式
**#33282 [OPEN] Codex Desktop create_thread does not inherit auto-approval mode for worktree tasks**  
👤 作者: @1150260034 | 💬 7 评论 | 👍 3 | 🔗 [查看](https://github.com/openai/codex/issues/33282)  
桌面端通过 `create_thread` 创建 worktree 子任务时，未继承父任务的自动批准设置，导致子任务在执行中反复要求人工确认，影响自动化流程。

### ⚡ WSL 集成终端静默失败
**#37104 [OPEN] Integrated terminal silently fails before PTY/WSL startup; bottom and side panel cannot open**  
👤 作者: @cxzhong | 💬 6 评论 | 👍 1 | 🔗 [查看](https://github.com/openai/codex/issues/37104)  
Microsoft Store 版 Codex Desktop（26.730.8199.0）在 Windows 上无法打开集成终端，PTY/WSL 启动前即静默失败，面板也无法展开。已被标记为 Papercuts 2026 优先级。

## 4. 重要 PR 进展

### ✅ 行结尾保留模式（修复 #4003）
**#37757 [CLOSED] Add a line-ending preservation mode to `apply_patch`**  
👤 作者: copyberry[bot] | 🔗 [查看](https://github.com/openai/codex/pull/37757)  
为 `apply_patch` 新增可选的 `PreserveLineEndings` 模式，避免打补丁时将整个文件改写为 LF。该 PR 直接解决了 Windows 用户报告的高赞 issue（#4003），今日已合入。

### ✅ 修复 Cursor 项目路径递归扫描
**#37747 [CLOSED] Bound Cursor project path resolution**  
👤 作者: copyberry[bot] | 🔗 [查看](https://github.com/openai/codex/pull/37747)  
限制 Cursor 项目名称中工作目录的解析方式，改用有界候选路径探测，避免递归扫描大目录树导致卡顿。

### 🔄 自动更新模型元数据
**#31817 [OPEN] Update models.json**  
👤 作者: github-actions[bot] | 🔗 [查看](https://github.com/openai/codex/pull/31817)  
自动化流程更新 `models.json` 模型元数据文件，保持对新旧模型的支持。

### ✅ code-mode 主机支持 gRPC over TCP
**#37745 [CLOSED] Add gRPC TCP transport to the code-mode host**  
👤 作者: copyberry[bot] | 🔗 [查看](https://github.com/openai/codex/pull/37745)  
`code-mode` 主机新增 `grpc://IP:PORT` 监听能力，支持通过 TCP 提供 gRPC 服务，并可在绑定端口 0 时输出实际端口，便于外部调用。

### ✅ 会话配置加载失败时提供结构化错误分类
**#37723 [CLOSED] Report I/O subtypes for session config import failures**  
👤 作者: copyberry[bot] | 🔗 [查看](https://github.com/openai/codex/pull/37723)  
为 `failed_to_load_session_config` 错误附加稳定的 `std::io::ErrorKind` 子类型（`invalid_data`、`not_found`、`permission_denied`），帮助定位配置加载失败原因。

### ✅ TUI 编辑器空白字符换行修复
**#37709 [CLOSED] Keep wrapped composer whitespace with following text**  
👤 作者: copyberry[bot] | 🔗 [查看](https://github.com/openai/codex/pull/37709)  
修复 TUI composer 中溢出空白可能单独占一行的问题，实现 grapheme-safe 的换行逻辑，保持空白与后续文本关联。

### ✅ 执行服务器环境配置读取能力声明
**#37654 [CLOSED] Advertise environment config read support**  
👤 作者: copyberry[bot] | 🔗 [查看](https://github.com/openai/codex/pull/37654)  
在 exec-server 环境能力列表中新增 `environmentConfigRead`，并为本地执行器开启；兼容旧执行器的反序列化默认值为 `false`。

## 5. 功能需求趋势

从上述 Issues 和 PR 中可提炼出以下社区关注方向：

- **Windows 平台功能完善**：大量 issue 集中在 Windows 上的 Computer Use、终端、沙箱、文件路径处理等问题（#37043、#37104、#26803、#37599 等），Windows 已成本社区最大的痛点平台。
- **IDE/编辑器集成稳定性**：VS Code/Cursor 扩展的 prompt 丢失（#25928）、`close_agent` 缺失（#36211）等问题，说明开发者对 IDE 内体验要求较高。
- **性能与响应速度**：线程切换缓慢（#11011）、WSL 启动卡顿（#22176）、崩溃循环（#30928）等，性能类 issue 持续收到高赞。
- **MCP 双向通信**：社区不仅在等待新工具接入，还希望支持入站通知（#15299），使 Codex CLI 能响应外部事件。
- **多代理（MultiAgentV2）能力增强**：子代理只读限制（#33885）、消息队列占用驻留槽位（#32353）等问题表明多代理仍在快速演进，社区期望更灵活的编排控制。
- **聊天历史跨端同步**：#5609 以 63 👍 成为最高赞功能请求，用户希望统一 ChatGPT 网页端、桌面端和 IDE 的会话数据。

## 6. 开发者关注点

- **Computer Use 在 Windows 上不可用**：多个独立报告指向 `EnumWindows` 0x80070003 错误（#37043、#37383、#37595、#37734），可能是运行时依赖（如中断标记路径）或权限问题，官方需要尽快定位。
- **Windows 文件处理细节粗糙**：行结尾被统一改为 LF（#4003）、非 ASCII 用户名（如韩语）导致路径乱码（#37740）等，反映出 Windows 本地化与文件系统兼容性测试不足。
- **桌面端稳定性堪忧**：应用静默退出崩溃循环（#37752）、后台 exec 删除技能目录（#19265）、僵尸进程泄漏（#37311）等，说明桌面端的后台任务和进程管理需要加强。
- **IDE 扩展体验被打折扣**：prompt 随机消失（#25928）直接影响用户输入安全感和信任度，虽然讨论多但暂无修复 PR，社区期待快速跟进。
- **性能回归屡次出现**：线程切换慢（#11011、#20802）、启动卡顿（#22176）等「更新后变慢」的报告反复出现，开发者希望 Codex 在新增功能的同时重视性能基准测试。

> 本日报数据来源：[github.com/openai/codex](https://github.com/openai/codex)，统计窗口为 2026-08-09 至 2026-08-10。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-10）

## 今日速览
- 发布 nightly 版本 `v0.56.0-nightly.20260810.gcf22ac7e8`，持续迭代核心功能。
- 社区讨论集中在子代理可靠性、Auto Memory 系统问题以及浏览器代理的兼容性，多个 P1 级 Bug 正在被重新测试。
- 多份依赖批量更新 PR（含 74 项 npm 依赖）引起关注，同时 ACP 会话恢复和策略引擎修复等核心补丁已提交。

## 版本发布
- **v0.56.0-nightly.20260810.gcf22ac7e8**  
  发布日期：2026-08-10  
  完整变更日志：[GitHub compare](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260809.gcf22ac7e8...v0.56.0-nightly.20260810.gcf22ac7e8)  
  说明：常规 nightly 版本，具体改动需查阅 changelog。

## 社区热点 Issues
挑选了 10 个当前最受关注、评论最活跃的 Issue，覆盖子代理、内存、终端稳定性等核心方向：

1. **[#22323] 子代理超过 MAX_TURNS 后被误报为 GOAL 成功，隐藏中断**  
   [链接](https://github.com/google-gemini/gemini-cli/issues/22323)  
   `codebase_investigator` 子代理在达到最大轮次限制时仍返回 `success` 和 `Termination Reason: "GOAL"`，导致真正的中断被掩盖。12 条评论，P1 优先级，社区高度关注子代理状态报告的准确性。

2. **[#21409] 通用代理（Generalist agent）挂起**  
   [链接](https://github.com/google-gemini/gemini-cli/issues/21409)  
   当 Gemini CLI 转交任务给通用代理时会无限期挂起，简单的文件夹创建也会卡住，用户等待长达一小时无响应。8 评论、8 👍，P1 级稳定性问题。

3. **[#19873] 利用模型的 bash 亲和性：零依赖 OS 沙箱与执行后意图路由**  
   [链接](https://github.com/google-gemini/gemini-cli/issues/19873)  
   提议让 Gemini 3 模型直接使用原生 POSIX 工具（`grep`、`sed` 等）探索代码库，同时通过沙箱保障安全。8 评论，这是涉及安全与体验的重要增强方向。

4. **[#24353] 健壮的组件级评估系统**  
   [链接](https://github.com/google-gemini/gemini-cli/issues/24353)  
   在已有 76 个行为评估测试基础上，推动建立更细粒度、覆盖 6 个 Gemini 模型的组件级评估体系。7 评论，P1，直接影响发布质量。

5. **[#22745] 评估 AST 感知的文件读取、搜索与映射的影响**  
   [链接](https://github.com/google-gemini/gemini-cli/issues/22745)  
   探索通过 AST 感知工具精确读取方法边界、减少 token 消耗、优化代码库导航。7 评论，P2，显示社区对代码理解深度的追求。

6. **[#21968] Gemini 不够主动使用自定义技能和子代理**  
   [链接](https://github.com/google-gemini/gemini-cli/issues/21968)  
   用户反馈 Gemini CLI 即使配置了 gradle、git 等技能，也不会在相关任务中主动调用，必须显式指示。6 评论，P2，涉及 Agent 自主决策能力。

7. **[#26522] Auto Memory 会无限重试低信号会话**  
   [链接](https://github.com/google-gemini/gemini-cli/issues/26522)  
   后台提取代理若判定会话低信号而跳过，该会话将一直未被处理，反复出现在索引中。5 评论，P2，内存系统效率问题。

8. **[#26525] Auto Memory 增加确定性数据脱敏并减少日志**  
   [链接](https://github.com/google-gemini/gemini-cli/issues/26525)  
   当前 Auto Memory 在将文本送入模型前未脱敏，且日志可能残留敏感信息。4 评论，P2，安全与隐私关切。

9. **[#25166] Shell 命令完成后仍卡在 “Waiting input”**  
   [链接](https://github.com/google-gemini/gemini-cli/issues/25166)  
   简单 CLI 命令执行完成后，终端仍显示活动并等待输入，需要人工干预。4 评论、3 👍，P1，非常影响日常使用。

10. **[#21983] 浏览器子代理在 Wayland 下失败**  
    [链接](https://github.com/google-gemini/gemini-cli/issues/21983)  
    浏览器代理在 Wayland 会话中无法正常工作，Termination Reason 直接为 GOAL。4 评论，P1，兼容性问题。

## 重要 PR 进展
以下 10 个 PR 或修复核心 Bug，或引入关键新功能，或带来大幅依赖升级：

1. **[#28744] [ACP] 修复恢复会话时错误启动新聊天导致 session 文件被污染**  
   [链接](https://github.com/google-gemini/gemini-cli/pull/28744)  
   P1 修复：`loadSession` 在 `resumeChat` 前调用 `initialize` 产生空会话，合并后可避免历史数据丢失。由 @PranavMishra28 提交。

2. **[#28738] 允许 Agent 调用 Agent（子代理递归调用）**  
   [链接](https://github.com/google-gemini/gemini-cli/pull/28738)  
   新功能：通过 `tools` frontmatter 允许子代理委托给其他子代理或递归调用自身，修复 #22092。这是 Agent 协作能力的重要扩展。

3. **[#28743] 保留已解析的 model config 中的 systemInstruction 和 tools**  
   [链接](https://github.com/google-gemini/gemini-cli/pull/28743)  
   修复 `sendMessageStream` 中自定义配置被 chat 级覆盖的问题，确保模型特定指令和工具生效。

4. **[#28742] caretaker-agent 技能名称改为符合规范**  
   [链接](https://github.com/google-gemini/gemini-cli/pull/28742)  
   将 `code_explorer`、`spec_generator` 等带下划线的技能名改为符合 Agent Skills 规范，避免命名兼容问题。

5. **[#26540] 修复策略引擎 Bug（影响工具批准）**  
   [链接](https://github.com/google-gemini/gemini-cli/pull/26540)  
   P1 修复：解决正则 null-byte 问题、批准无法持久化、YOLO/AUTO_EDIT 模式下多余提示等。由 @Abhijit-2592 提供。

6. **[#28746] 批量更新 npm 依赖（74 个包）**  
   [链接](https://github.com/google-gemini/gemini-cli/pull/28746)  
   大型依赖组更新，涵盖 `simple-git`、`@modelcontextprotocol/sdk` 等核心库，可能引入兼容性变化。

7. **[#28749] 升级 @google/genai 至 v2.15.0**  
   [链接](https://github.com/google-gemini/gemini-cli/pull/28749)  
   核心生成 AI SDK 大版本跃迁（1.30→2.15），可能带来新 API 和性能改进。

8. **[#28752] 升级 puppeteer-core 至 v25.4.0**  
   [链接](https://github.com/google-gemini/gemini-cli/pull/28752)  
   浏览器代理底层依赖更新，包含大量修复，对 Wayland 等环境兼容可能有益。

9. **[#28450] GitHub Actions 依赖组更新**  
   [链接](https://github.com/google-gemini/gemini-cli/pull/28450)  
   更新 `lychee-action`、`compressed-size-action`、`run-gemini-cli` 三个 CI 组件，优化自动化流程。

10. **[#28757] js-yaml 升级至 v5.2.3**  
    [链接](https://github.com/google-gemini/gemini-cli/pull/28757)  
    修复已知安全问题，提升配置文件解析稳健性。

## 功能需求趋势
从近期 Issues 中可提炼出社区最关注的几个方向：

- **Agent 协作与自主性**：反复要求 Gemini 更主动地使用技能、允许子代理互相调用、提升状态报告可靠性（如 #22323、#21968、#28738）。
- **Auto Memory 与隐私**：围绕内存系统出现多个问题（#26522、#26525、#26523），关注去重、脱敏、无效补丁隔离以及日志瘦身。
- **AST 感知的代码理解**：探索用 AST 优化文件读取、搜索和代码库映射，减少 token 消耗并提升导航精度（#22745、#22746）。
- **安全与权限控制**：社区希望引入零依赖沙箱、杜绝破坏性命令、确保子代理运行前获得权限（#19873、#22672、#22093）。
- **稳定性与体验**：shell 卡死、终端 resize 闪烁、外部编辑器损坏显示等问题频发，表明核心交互稳定性仍是重点（#25166、#21924、#24935）。
- **评估体系**：从组件级评估到行为测试，社区要求更完善的自动化验证能力（#24353）。

## 开发者关注点
- **子代理状态不可信**：MAX_TURNS 被误报为成功、bugreport 缺少子代理上下文，导致调试困难，用户期望完整的子代理轨迹可见。
- **Auto Memory 后台任务副作用**：无限重试、敏感信息泄漏风险、无效补丁静默跳过，严重影响信任度。
- **命令执行挂起**：shell 命令完成后仍显示 “Waiting input”，属于高频阻断问题，需优先修复。
- **浏览器代理兼容性**：Wayland 下失败、忽略 `settings.json` 中 `maxTurns` 等覆盖，跨环境适配不足。
- **权限与破坏性操作**：Agent 在未授权时运行子代理、或使用 `git reset --force` 等危险命令，社区呼吁更严格的策略引擎。
- **依赖升级风险**：74 个 npm 包批量升级带来不确定性，开发者希望有更多回归测试和迁移指南。

---
*数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)，数据更新时间 2026-08-10。*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报 — 2026-08-10

## 今日速览

昨日连续发布 v1.21.5 与 v1.21.4 两个稳定版，核心聚焦于**上下文压缩机制与缓存效率**的修复；社区反馈集中在压缩触发过于频繁、缓存击穿导致的性能问题，多个相关 Issue 与 PR 已形成闭环修复。值得关注的是，v1.22.0 更新日志已进入准备阶段，预示新一轮功能更新即将到来。

## 版本发布

### Reasonix v1.21.5（稳定版）
发布时间：2026-08-09
- CLI 与桌面端同步更新，聚焦性能与稳定性
- **更快的会话切换**：优化桌面端会话切换性能
- **稳定的 WebView2 动画**：修复动画渲染不稳定的问题
- **完成回执**：新增显示变更内容的完成回执机制

### Reasonix v1.21.4（稳定版）
发布时间：2026-08-09
- **完成契约**：目标声明可对照收据进行核查
- **记忆功能增强**：新增激活、易变性、主题键和 CJK 双字检索
- **桌面端优化**：本地文件链接处理、输入法感知的 ESC 行为
- **智能体改进**：增量折叠摘要携带、压缩边界、推理调控器影子模式

**相关链接：**
- [v1.21.5 完整更新日志](https://reasonix.io/changelog/v1.21.5/)
- [v1.21.4 完整更新日志](https://reasonix.io/changelog/v1.21.4/)

## 社区热点 Issues

### 🔥 上下文压缩与缓存问题（社区最关注）

**1. [#7935] 反复提示 "snipped N stale tool results" 但上下文从未真正压缩**
- 作者：@AFunDog | 创建：2026-08-08 | 更新：2026-08-10 | 评论：5
- 该问题长期存在，日志频繁提示裁剪过期工具结果（约 34K tokens），但上下文并未实际压缩。开发者已在 [#8123](https://github.com/esengine/DeepSeek-Reasonix/pull/8123) 中提交修复 PR。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/7935)

**2. [#8118] 请求前反复 "pruned N stale tool results" 严重破坏 DeepSeek 前缀缓存**
- 作者：@qinyan-hai | 创建：2026-08-10 | 更新：2026-08-10 | 评论：0
- 每次请求前裁剪 77 个过期工具结果（约 34.7K tokens），导致前缀缓存命中率大幅下降（命中 vs miss 差 50-120×）。用户建议增加显式开关控制此行为。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/8118)

**3. [#8116] 自动压缩上下文"疯了"：说一句话压缩一次**
- 作者：@MimoKit | 创建：2026-08-10 | 更新：2026-08-10 | 评论：1
- v1.21.5 中自动压缩触发过于频繁，严重干扰正常对话流程。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/8116)

**4. [#8004] 请求格式错误（HTTP 400）：压缩请求被拒绝**
- 作者：@xiaotumufeng | 创建：2026-08-08 | 更新：2026-08-09 | 评论：2
- 长会话压缩时请求体超过上下文限制被 provider 拒绝，导致压缩永久失败。此问题与 #7972 同根因，已在 [#8006](https://github.com/esengine/DeepSeek-Reasonix/pull/8006) 中修复。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/8004)

**5. [#8111] 上下文投影交互缺陷：切换模型 / prune 重写导致投影失效**
- 作者：@clearnature | 创建：2026-08-09 | 更新：2026-08-09 | 评论：0
- 模型切换和 prune 重写导致上下文投影失效，引发误压缩和重复全价压缩。报告指出该问题已在同日修复（生产遥测中发现）。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/8111)

### 💡 功能需求

**6. [#8100] 思考过程显示三模式：隐藏 / 摘要 / 自动展开**
- 作者：@Endymionus | 创建：2026-08-09 | 更新：2026-08-09 | 评论：2 | 👍：1
- 自 v1.21.3 起思考过程默认全部折叠，用户无选择权。该功能请求希望将 `expandWhileStreaming` 等行为改为用户可配置。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/8100)

**7. [#8120] 支持会话（Session）批量选择与批量删除**
- 作者：@phoenixlucky | 创建：2026-08-10 | 更新：2026-08-10 | 评论：0
- 会话积累到数百上千个时，逐条删除极为繁琐。期望支持类似邮箱/文件管理器的勾选批量删除交互。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/8120)

**8. [#8117] Add Nextcloud Talk bot/channel support**
- 作者：@Miyeon-netizen | 创建：2026-08-10 | 更新：2026-08-10 | 评论：0
- 希望将 Nextcloud Talk 添加为受支持的机器人渠道，便于通过现有 bot gateway 统一管理。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/8117)

### 🔧 故障与兼容性问题

**9. [#8108] QQ Bot 无法连接 —— gateway 握手 op=9 后 EOF**
- 作者：@BeCreatedP | 创建：2026-08-09 | 更新：2026-08-09 | 评论：0
- QQ 适配器反复重连失败，握手收到 op=9 而非预期的 op=10，导致机器人无法上线。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/8108)

**10. [#8107] CLI/TUI footer 与 /status 始终显示 CNY 余额（¥0.00）而非 USD**
- 作者：@hakimonr | 创建：2026-08-09 | 更新：2026-08-09 | 评论：0
- 美元充值的账户在 CLI 中始终显示 ¥0.00，币种和语言设置均不生效。这与 [#7790](https://github.com/esengine/DeepSeek-Reasonix/pull/7790) PR 相关。
- [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/8107)

## 重要 PR 进展

**1. [#8123] fix(agent): snip the projection, not the canonical transcript**
- 作者：@esengine | 更新：2026-08-10 | 状态：已合并
- 修复 #7935：裁剪操作应作用于投影而非规范记录。解决了"反复 snipped 但上下文未压缩"的问题。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/8123)

**2. [#8109] fix(context): make maintenance projection-idempotent / 上下文维护投影幂等化**
- 作者：@SivanCola | 更新：2026-08-10 | 状态：已合并
- 使 `ContextManager.Prepare` 成为请求时自动上下文维护的唯一入口，改进过期工具结果清理逻辑，避免重复构建候选集。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/8109)

**3. [#8006] fix(agent): bounded compaction for shared-window providers**
- 作者：@clearnature | 更新：2026-08-09 | 状态：已合并
- 修复 #8004 和 #7972 根因：压缩请求携带全量输出预算导致 HTTP 400。对所有共享窗口 provider（DeepSeek/MiMo 等）通用修复。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/8006)

**4. [#8119] fix(agent): a failed summary must not strand the turn**
- 作者：@esengine | 更新：2026-08-10 | 状态：打开
- 修复压缩摘要失败导致对话硬阻塞的问题。当压缩失败时不再阻断后续消息，而是降级处理。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/8119)

**5. [#8124] feat(cli): ask for the context window instead of assuming 128K**
- 作者：@esengine | 更新：2026-08-10 | 状态：打开
- 修复自定义供应商向导中硬编码 `ContextWindow: 128000` 的问题，支持 1M 窗口模型的正确配置。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/8124)

**6. [#8114] feat(agent): one delegation contract, and what it costs to use it**
- 作者：@esengine | 更新：2026-08-10 | 状态：打开
- 将子代理委托从实现转变为契约，并测量其成本。实验数据表明强制委托会导致 2-4× 成本增加且结果无差异。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/8114)

**7. [#8122] feat(bot): add Nextcloud Talk webhook adapter foundation**
- 作者：@Miyeon-netizen | 更新：2026-08-10 | 状态：打开
- 响应 #8117 的需求，新增 Nextcloud Talk bot 适配器基础支持，包含 HMAC-SHA256 验证。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/8122)

**8. [#8006 关联] [#8112] feat+docs: 压缩遥测可观测性实现与设计**
- 作者：@clearnature | 更新：2026-08-10 | 状态：打开
- 在压缩架构上增加结构化落盘、状态机、校准因子、剪裁统计与静默退出补发，提供完整的设计文档和真实监控数据。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/8112)

**9. [#7653] perf(provider): accumulate streamed tool arguments linearly**
- 作者：@Nath-Vikky | 更新：2026-08-10 | 状态：打开
- 优化流式工具参数的累积方式，将不可变字符串追加改为线性累积，减少大量复制的性能开销。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/7653)

**10. [#8121] docs(release): 准备 v1.22.0 中英更新日志**
- 作者：@github-actions[bot] | 更新：2026-08-10 | 状态：已合并
- v1.22.0 更新日志首次确认，包含桌面端会话持久性、上下文维护、工作区改进、CLI Web 交接等新功能。
- [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/8121)

## 功能需求趋势

从近期 Issues 与 PR 中，社区最关注的功能方向集中为：

1. **上下文管理可观测性与控制**（#8116、#8118、#8109、#8112）
   用户希望看到压缩决策的依据、成本，并能控制触发时机。压缩遥测、前缀缓存保护、显式开关成为高频诉求。

2. **思考过程（Reasoning）显示可配置化**（#8100）
   从"默认折叠"到"隐藏/摘要/自动展开"三模式选择，社区希望将显示权交还给用户。

3. **会话管理效率**（#8120）
   支持批量操作（选择、筛选、删除），按条件（日期、关键词）批量管理历史会话。

4. **机器人渠道扩展**（#8117、#8122）
   在已支持 QQ、飞书、微信的基础上，新增 Nextcloud Talk 等更多渠道适配。

5. **自定义供应商灵活性**（#8125、#8124）
   相同 API 地址的不同分组模型应可共存，上下文窗口参数应由用户显式配置而非硬编码。

## 开发者关注点

| 痛点/需求 | 相关 Issue/PR 数 | 解决状态 |
|-----------|:---:|---------|
| **自动压缩异常频繁**（说话即压缩） | 3（#7935、#8116、#8118） | #8123、#8109 已合并 |
| **前缀缓存击穿，成本增加 50-120×** | 2（#8118、#8111） | 修复中，#8123 部分解决 |
| **压缩请求被 provider 拒绝（HTTP 400）** | 2（#8004、#7972） | #8006 已合并 |
| **在线更新失败/恢复流程不健壮** | 2（#8115、#7972） | 待处理 |
| **CLI 币种显示错误**（CNY vs USD） | 1（#8107） | #7790 提供修复方案 |
| **限流（HTTP 429）重试策略** | 1（#8113） | 待优化 |
| **批次操作能力缺失** | 1（#8120） | 功能请求阶段 |

**核心结论**：上下文压缩机制的整体可靠性是当前社区最大痛点。虽然 v1.21.4/v1.21.5 已尝试改善，但用户在真实长会话中仍遭遇压缩乱触发、缓存失效和请求被拒等问题。好消息是相关修复（#8109、#8123、#8006）已陆续合并，预计 v1.22.0 将明显缓解此问题。同时，社区对**用户可配置性**的需求日益强烈——无论是思考过程显示模式、上下文窗口参数，还是压缩触发策略，用户都希望拥有更细粒度的控制权。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-08-10

## 今日速览

OpenCode Go 的 deepseek-v4-flash 模型名被注入前导空格的问题，在多天内被多个用户独立验证仍未彻底修复，成为今日最集中的服务端回归事件；TUI 稳定性（启动冻结、文本渲染重复、嵌套权限挂起）与剪贴板复制失效等基础体验问题持续占据社区热度，且大多已存在数月以上。开发侧，v2 主线通过 bot 合并了 dev 分支最新改动，同时多个针对附件路径、嵌套子代理权限、上下文压缩的修复已合入或提交。

---

## 社区热点 Issues（10 个）

### 1. 剪贴板复制失效：长期未修的老大难
**#4283 — Copy To Clipboard is not working** · 已开启 · 👍 110 · 💬 122
https://github.com/anomalyco/opencode/issues/4283

创建于 2025-11-13，至今仍是全仓库评论数最高的 issue。用户在响应中选择文本后无法复制到剪贴板，1.0.62 版本即存在，横跨多个大版本仍未解决，社区反复"+1"加急。属于最影响日常使用的"钝刀子"类 bug。

### 2. 原生 Model Fallback / Failover 支持：高赞功能需求
**#7602 — [FEATURE]: Native Model Fallback / Failover Support** · 已开启 · 👍 107 · 💬 29
https://github.com/anomalyco/opencode/issues/7602

目前 OpenCode 仅支持相同 model ID 下的 provider 级 fallback，无法做到 "A 模型报错/限流 → 自动切换 B 模型"。对于长期运行的 agent 任务，单模型故障意味着整个会话中断，社区呼声很高。

### 3. 代理场景下的 Streaming 禁用需求
**#785 — Is there a way to disable streaming mode?** · 已开启 · 👍 38 · 💬 29
https://github.com/anomalyco/opencode/issues/785

部分企业代理（如 Credal OpenAI Proxy）不支持流式响应，导致 `AI_APICallError`。需求提出已超过一年，至今没有官方开关，反映 OpenCode 在企业代理兼容性上仍存在明显缺口。

### 4. OpenCode Go 模型托管透明性质疑
**#24649 — OpenCode Go: clarify which models are self-hosted vs. proxied** · 已关闭 · 👍 32 · 💬 18
https://github.com/anomalyco/opencode/issues/24649

用户对 OpenCode Go 文档中"自托管 vs 第三方代理"的基础设施声明提出质疑，希望明确哪些模型由官方自研、哪些只是对第三方 API 的转发。这类信任问题直接关系到付费订阅用户对服务稳定性和数据路径的判断。

### 5. 嵌套子代理权限请求静默挂起（已有修复 PR）
**#13715 — Permission asks from nested subagent sessions silently hang** · 已开启 · 👍 24 · 💬 11
https://github.com/anomalyco/opencode/issues/13715

子代理再派生子代理时，bash 等权限请求发出但 TUI 不渲染，会话永久挂起。根因定位在 `children()` memo 只收集直接子节点。PR #36046 已提交修复，值得关注合入进度。

### 6. deepseek-v4-flash 前导空格 bug：修复被验证无效
**#41306 — deepseek-v4-flash still broken on Console Go after #41211** · 已关闭 · 💬 4
https://github.com/anomalyco/opencode/issues/41306

用户用有效 Go key 验证，`/zen/go/v1/chat/completions` 仍返回 HTTP 400，网关把 `"deepseek-v4-flash"` 转发成了 `" deepseek-v4-flash"`（带前导空格）。#41211 声称修复但实测未生效，异常值得警惕。同批还有 #41300、#41314、#41322，均为同一根因，说明该故障在 8 月 8-9 日集中爆发。

### 7. TUI 启动空白屏冻结，需强制杀进程
**#41284 — TUI freezes on blank screen at startup** · 已开启 · 👍 1 · 💬 2
https://github.com/anomalyco/opencode/issues/41284

macOS（Apple Silicon）上 1.18.14 和 1.18.15 均可复现：启动后白屏无任何日志，只能 force-kill。没有报错信息意味着排查成本极高，属于阻断性体验问题。

### 8. 持久会话 daemon + 零工具调用记忆（V2 功能方向）
**#41453 — [FEATURE]: Persistent session daemon + zero-tool-call memory recall** · 已开启
https://github.com/anomalyco/opencode/issues/41453

提出后台常驻会话 daemon，并在不调用工具的情况下直接回调历史记忆，与 #23775（workspace 上下文持久化）重叠。这指向 OpenCode 向"始终在线的代理工作区"演进的方向。

### 9. ACP 会话无超时保护，MCP 注册/调用可无限挂起
**#41459 — acp: session/new and session/prompt hang indefinitely** · 已开启
https://github.com/anomalyco/opencode/issues/41459

`session/new` 会阻塞等待所有 transferred MCP server 完成注册，但 `registerMcpServers` 没有超时；`session/prompt` 等待 MCP 工具调用同样无 deadline。协议层缺少超时机制，会让整个 ACP 会话被单个失控 MCP server 拖死。

### 10. 附件图片路径从模型上下文中丢失（已有修复 PR）
**#41454 — [bug, 2.0] tui: attached image path is omitted from model context** · 已开启
https://github.com/anomalyco/opencode/issues/41454

V2 中 TUI 显示附件文件名，但模型只收到图片占位符/内容，无法得知文件的本地路径，无法作为文件进行引用或操作。PR #41455 已提交修复，属于 V2 早期反馈中的典型上下文不完整问题。

---

## 重要 PR 进展（10 个）

### 1. v2 主线同步 dev 分支
**#41460 — [contributor] chore: merge dev into v2** · 已开启
https://github.com/anomalyco/opencode/pull/41460

由 bot 提交，将 dev 分支适用改动移植到 V2 架构，同时保留 App/Desktop/Core/TUI/SDK/server 的 V2 独立实现，并维持 RTL、本地化、会话顺序等已合入行为。V2 迭代仍在加速。

### 2. 修复附件图片路径丢失（对应 #41454）
**#41455 — fix(tui): include attachment path in model context** · 已开启
https://github.com/anomalyco/opencode/pull/41455

在二进制图片 content 前插入一条文本 part 携带 `source.path`，让模型知道附件在本地的位置。对需要读写图片文件、调用图像类 MCP 工具的场景很重要。

### 3. 集成登录从 prompt 全面迁移到 Form 体系
**#40997 — refactor(core): replace integration prompts with forms** · 已开启
https://github.com/anomalyco/opencode/pull/40997

将 GitHub Copilot、Azure、Cloudflare 等集成的配置流程统一为共享 `Form.Fields` 定义，OAuth/key 校验逻辑收归 Core，key 持久化为 provider 配置。架构上是一次重要的集成层收敛。

### 4. Copilot 响应续接对齐官方 VS Code 客户端
**#41452 — fix(core): align Copilot response continuation** · 已关闭
https://github.com/anomalyco/opencode/pull/41452

无状态 Copilot Responses 续接改为与官方客户端对齐：持久化最终 reasoning item ID 与加密状态，从无状态文本/工具调用重建时省略 response item ID 但保留 `call_id`，并处理 reasoning 相关边界。对使用 Copilot 作为后端的开发者有直接收益。

### 5. 空 AI SDK 错误信息时的回退消息
**#41450 — fix(core): derive fallback message for empty AI SDK provider errors** · 已开启
https://github.com/anomalyco/opencode/pull/41450

`AI_APICallError` 等错误可能 message 为空，但结构化字段（statusCode、data.error.code、响应体、限流 headers）携带关键信息。此前只复制 `error.message`，导致 TUI 只显示"UnknownProviderReason"，几乎不可排查。该 PR 会从结构化字段推导回退文案。

### 6. 实验性渲染性能优化：初始加载 -75%
**#40427 — [beta] some experimental perf improvements** · 已开启
https://github.com/anomalyco/opencode/pull/40427

在不完整数据库快照 + 固定 24h 数据窗口下测得初始 renderer 内存从 7.45 MB 降至 1.82 MB（-75.5%）。针对 V2 渲染管线底层的优化，属于后续性能里程碑的重要前置工作。

### 7. 持久会话归档（V2 新能力）
**#39358 — [contributor] feat(session): add durable session archival** · 已开启
https://github.com/anomalyco/opencode/pull/39358

归档操作记录 `session.archived` fact，并将时间戳投影到 `Session.Info.time.archived`，重复归档幂等，且与删除语义明确区分。为 V2 的会话生命周期管理补上了关键一环。

### 8. 修复上下文溢出压缩的无限循环
**#37584 — fix(session): bound consecutive overflow compaction cycles** · 已开启
https://github.com/anomalyco/opencode/pull/37584

当 provider 因 context overflow 拒绝 turn 时，SessionPrompt 循环会反复触发 compact 重试，可能陷入无界循环。该 PR 为连续 overflow 压缩周期设置上界，防止长会话卡死。

### 9. 嵌套子代理权限提示修复（对应 #13715）
**#36046 — fix(tui): show permission prompts from nested subagent chains** · 已关闭
https://github.com/anomalyco/opencode/pull/36046

修复子代理再派生子代理时权限请求不渲染的 bug，直接关闭 #13715。过期较久的 PR 在 8 月 9 日被自动化清理标记关闭，但修复代码已在合入队列中，最终落地值得确认。

### 10. Worktree 工作区切换 + stash warp
**#36052 — feat(core): worktree-based workspace switching with stash-based warp** · 已关闭
https://github.com/anomalyco/opencode/pull/36052

新增 `opencode worktree create|list|rm` 等子命令，基于 git worktree 实现工作区切换，并用 stash 机制完成"warp"。解决多任务并行时频繁切换分支导致的脏工作区问题。

---

## 功能需求趋势

从近期 issue 与 PR 中可以提炼出以下社区关注方向：

- **模型层容错与兼容性**：最集中的诉求。包括 native model fallback/failover（#7602）、非 streaming 代理支持（#785）、reasoning/thinking 参数正确透传（#27361、#41294）；OpenCode Go 的模型可用性和透明度（#24649）也属于这一范畴。
- **会话与上下文的长效管理**：持久化 daemon（#41453）、会话归档（#39358）、上下文压缩防死循环（#37584），共同指向"长跑型 agent 任务"下的可靠性诉求。
- **协议层健壮性**：ACP 会话需要全局超时（#41459），MCP 注册/调用不能被单个 server 拖垮。
- **TUI 渲染与交互稳定性**：启动冻结（#41284）、文本重复/陈旧渲染（#41458）、附件路径缺失（#41454）、`@` 文件搜索边界问题（#41456、#41457），说明 V2 TUI 在真实工作负载下仍不够皮实。
- **工程化体验改进**：worktree 工作区切换（#36052）、opencode:// deep links 文档化（#41400）、web/serve 支持 `--dir` 指定目录（#35976），属于"让 OpenCode 更好地融入开发者既有工作流"的长尾需求。

---

## 开发者关注点

- **剪贴板复制失效是积压最久的痛点**：#4283 持续开放近 9 个月、122 条评论、110 个赞，至今未修，严重影响日常复制代码/文字的基本操作。
- **模型参数静默丢弃**：多次反馈 `reasoningEffort`/`options` 在 headless 模式和自定义 `@ai-sdk/openai-compatible` provider 下被忽略（#27361、#41294），且修复后仍会回归，开发者对"配置写了但没生效"这类问题容忍度极低。
- **OpenCode Go 服务端回归频发**：deepseek-v4-flash 前导空格问题在 8 月 8-9 日被至少 4 名用户独立上报，且修复后验证仍失败（#41306），提示官方需要更可靠的回归测试与发布验证流程。
- **嵌套 agent 权限流程不可靠**：#13715 说明多级 subagent 的权限请求可能完全不可见，会话静默挂死，对自动化任务编排是致命打击。
- **文件与上下文边界情况多**：家目录下文件搜索全空（#41456）、`@` 首次补全不加载文件（#41457）、附件路径不进模型上下文（#41454），集中在"非典型路径/首次交互"场景，表明 TUI 文件管道的测试覆盖还有明显盲区。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-10

## 今日速览

Qwen Code 发布 `v0.21.8-nightly.20260810`，核心变化是引入 Qoder 插件扩展支持，并优化了 CI issue 自动分派流程。社区层面，多会话原生协调机制（#8718）成为近期最受关注的功能提案，讨论热度持续上升；Web 终端 TUI 闪烁问题（#8659）则集中反映了 Linux/Web 环境下的渲染兼容性痛点。

---

## 版本发布

**v0.21.8-nightly.20260810.55e20db328**（[Release 页面](https://github.com/QwenLM/qwen-code/releases)）

主要更新内容：

- **feat(core): support Qoder plugin extensions** — 核心层开始支持 Qoder 插件扩展机制，为第三方能力接入提供基础能力。
- **feat(ci): auto-assign issues to area owners** — CI 流程支持按领域自动分派 issue 给对应的维护负责人。

---

## 社区热点 Issues（共更新 3 条）

### 1. RFC: Native coordination for independent Qwen sessions
- **编号**: [#8718](https://github.com/QwenLM/qwen-code/issues/8718) | 优先级 P2 | 类型 feature-request | 8 条评论
- **议题**: 提议为多个独立 Qwen Code 会话增加显式的实验性协调路径：一个 leader 会话可以分派多个自包含 worker 会话，同时保持自身交互能力，并统一收集各会话的结构化运行结果与任务状态。
- **重要性**: 指向多智能体协作与后台自动化的核心方向，被标记为 `roadmap/multi-agent` 和 `roadmap/background-automation`，社区关注度高。

### 2. TUI flickering / screen tearing in web-based terminals
- **编号**: [#8659](https://github.com/QwenLM/qwen-code/issues/8659) | 优先级 P3 | 类型 bug | 4 条评论
- **议题**: 在阿里云 Workbench 等 Web 终端中运行时，TUI 持续闪烁/撕裂。疑似默认 `useTerminalBuffer: true`（Virtualized History 模式）的全屏 ANSI 重绘机制不兼容部分 Web 终端实现。
- **重要性**: 影响 Web 远程开发场景，已标记 `welcome-pr`，社区有开发者在评论区复现并讨论缓解方案。

### 3. Fleet Shepherd Dashboard
- **编号**: [#7167](https://github.com/QwenLM/qwen-code/issues/7167) | 状态 need-information | 3 条评论
- **议题**: 由 Fleet Shepherd 工作流自动维护的 CI/CD 状态看板，每 20 分钟左右同步一次 PR 状态。
- **重要性**: 属于项目基础设施的透明化工具，方便社区跟踪批量 PR 的 CI 状态，非功能讨论类 issue。

---

## 重要 PR 进展（共更新 50 条，精选 10 条）

### 1. fix(test): stop background-shell tests sharing a fixed /tmp sidecar path
- **编号**: [#8813](https://github.com/QwenLM/qwen-code/pull/8813) | 作者 @wenshao
- **内容**: 修复 `backgroundShellRegistry.test.ts` 中所有测试共用固定 `/tmp/s1.output` 路径的问题，避免 vitest 多 worker 和 CI 宿主之间的文件写入冲突。

### 2. fix(review): make the posted review body readable
- **编号**: [#8825](https://github.com/QwenLM/qwen-code/pull/8825) | 作者 @wenshao
- **内容**: 重构 `/review` 评论的排版逻辑：将短评语句和 Critical 问题、覆盖率披露按段落组织；同时修复预算缺口解析器中括号占位符绕过的问题。

### 3. feat(cli): adopt Goal v3 in ACP sessions
- **编号**: [#8732](https://github.com/QwenLM/qwen-code/pull/8732) | 作者 @qqqys
- **内容**: ACP/Web Shell 会话的 `/goal` 命令全面切换为标准 Goal v3 运行时，支持 create、status、edit、pause、resume、replace、clear 等完整生命周期操作，并发布规范化事件。

### 4. feat(web-shell): improve subagent activity rows
- **编号**: [#8780](https://github.com/QwenLM/qwen-code/pull/8780) | 作者 @carffuca
- **内容**: 增强 Web Shell 子代理活动行的交互性：常驻右箭头提示可展开详情，hover/键盘焦点高亮整行，同时保持单行紧凑布局。

### 5. feat(web-shell): show context usage as a mini progress pill in the status bar
- **编号**: [#8794](https://github.com/QwenLM/qwen-code/pull/8794) | 作者 @wenshao
- **内容**: Web UI 编辑器工具栏新增环形上下文占用指示器，阈值逻辑与 `/context` 命令保持一致，帮助用户直观感知窗口占用。

### 6. feat(serve): add pollable turn-status endpoints for daemon sessions
- **编号**: [#8682](https://github.com/QwenLM/qwen-code/pull/8682) | 作者 @BenGuanRan
- **内容**: 为 daemon HTTP API 新增两个只读接口：`GET /session/:sessionId/turns/:promptId` 查询指定 turn 的状态，`GET /session/:sessionId/turns/current` 查询当前进行中的 turn 状态。

### 7. fix(acp-bridge): bound live journal replay chunks
- **编号**: [#8801](https://github.com/QwenLM/qwen-code/pull/8801) | 作者 @wenshao
- **内容**: 限制未完成 turn 的 replay 快照大小：每条 replay 最多聚合 256 个源事件，同时保留 tool、attribution、provenance 等语义元数据的边界。

### 8. feat(web-shell): add model-specific reasoning controls
- **编号**: [#8675](https://github.com/QwenLM/qwen-code/pull/8675) | 作者 @callmeYe
- **内容**: 新增内置模型推理控制注册表，端到端接入 Core、ACP、daemon、SDK 与 WebShell。每个注册项可独立声明 Thinking 和 Effort 控件、支持的档位与默认值，首个接入模型为 `qwen3`。

### 9. fix(desktop): restore the macOS window after closing it
- **编号**: [#8802](https://github.com/QwenLM/qwen-code/pull/8802) | 作者 @yiliang114
- **内容**: macOS 桌面端关闭主窗口时改为隐藏而非销毁；从 Dock/Finder 重新打开时恢复并聚焦原窗口，且不抢占 Local Control 的焦点。

### 10. feat(cli): add /advisor command for second-opinion conversation review
- **编号**: [#7567](https://github.com/QwenLM/qwen-code/pull/7567) | 作者 @yiliang114
- **内容**: 新增 `/advisor [focus]` 命令：以只读 fork 方式请求评审模型对当前会话给出独立第二意见，共享主会话上下文（与 `/btw` 相同机制）。

---

## 功能需求趋势

- **多会话/多智能体协调**：RFC #8718 明确提出“leader-worker”会话协作模式，配合已有的子代理和后台任务能力，社区对多智能体编排方向需求显著。
- **WebShell 体验持续强化**：多个 PR（#8780、#8794）聚焦 Web UI 的可用性细节，包括子代理行交互、上下文占用可视化，显示 Web 端正逐步成为与 CLI 并重的使用入口。
- **可观测性与状态查询**：#8682 为 daemon 会话新增轮询式 turn 状态端点，社区对远程调试、自动化集成场景下的状态感知需求上升。
- **模型能力精细化控制**：#8675 引入模型级推理控制注册表，将 Thinking/Effort 调节标准化，为后续多模型差异化配置打基础。
- **CI/测试基础设施韧性**：#8813、#8792、#8810 等 PR 集中修复测试路径冲突、CI 超时预算和工具链依赖，反映项目在规模化协作下对构建稳定性的重视。

---

## 开发者关注点

- **Web 终端兼容性**：xterm 类 Web 终端下的 TUI 闪烁问题（#8659）是当前最具体的 UI 痛点，开发者希望增加对旧式终端回退渲染的支持或提供开关。
- **测试隔离与并行稳定性**：多个测试 PR（#8813、#8795）都在修复共用固定路径导致的 CI 随机失败，说明并行测试文件隔离已成为开发者实际工作中的高频摩擦点。
- **审查流程可靠性**：#8825、#8791、#8778 连续修复 `/review` 的渲染缺陷和预算中止保障，反映自动化 code review 在真实生产使用中已暴露出需要打磨的细节。
- **macOS 桌面交互细节**：#8802 对窗口隐藏/恢复行为的修复，说明桌面端用户对 Dock 交互一致性有明确期待。
- **Background shell 与 daemon 状态一致性**：#8798、#8801 等 PR 正在收紧 Web Shell 与 daemon 之间的消息同步契约，队列去重与状态归属是当前实现中的核心难点。

---

*数据来源：[github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | 统计窗口：2026-08-09 至 2026-08-10*

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报 2026-08-10

> 数据来源：[github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

## 今日速览

今日无新版本发布，但社区围绕安全边界与数据丢失风险展开高强度讨论：#82842 报告 Agent 在 Windows 上对 C:\ 根目录执行 `rd /s /q`，仅因权限不足未酿成系统盘全灭；#82863 揭示了 `repair_message_sequence` 只修内存不落库的持久化缺陷。PR 侧则涌入大量 UTF-8/多字节文本误判与 Wayland/Telegram/Weixin 平台修复，显示非英文内容支持与多平台稳定性仍是当前迭代主线。

## 社区热点 Issues

> 过去 24 小时共有 7 条活跃 Issue，以下全部列出。

### 1. [Critical] Windows 上 Agent 误对 C:\ 根目录执行 `rd /s /q` — [#82842](https://github.com/NousResearch/hermes-agent/issues/82842)
- 作者：@ArtMoreno｜更新：08-10｜评论：2
- 严重性为 **Critical**。用户在批准限定目录删除后，Agent（v0.20.0，`tencent/hy3:free`）却对系统盘根目录执行了 `rd /s /q`，仅因进程无管理员权限才未造成数据全灭。这条 Issue 直接触及工具调用权限边界，是近期罕见的高危缺陷。

### 2. [P2] `repair_message_sequence` 不协调 state.db，持久化交替违规可重触发 — [#82863](https://github.com/NousResearch/hermes-agent/issues/82863)
- 作者：@YUXUANCHENG｜更新：08-10｜评论：0
- 防御性修复只修正内存中的消息列表，未写入 `state.db`，导致会话恢复后交替违规重新出现，并可能漏掉 prompt-cache 前缀。涉及会话状态一致性问题，影响长会话稳定性与缓存命中率。

### 3. [P2] 微信平台 STT 语音消息并发缺陷：后续有效语音被误删 — [#82858](https://github.com/NousResearch/hermes-agent/issues/82858)
- 作者：@Bruce-G-S｜更新：08-10｜评论：0
- 活跃会话中连续收到多条语音时，第二条及后续消息被误判为 `unauthorized user in active session` 并直接丢弃。音频文件已下载但 STT 转写流程不触发，语音交互在多消息场景下基本不可用。

### 4. godmode 拒绝检测漏掉弯引号，auto_jailbreak 误报模型合规 — [#79336](https://github.com/NousResearch/hermes-agent/issues/79336)
- 作者：@gy-0｜更新：08-10｜评论：2
- `godmode` skill 的拒绝检测正则仅匹配 ASCII 撇号（U+0027），而 `deepseek-v4-flash-0731` 等模型会用弯撇号（U+2019）输出拒绝，导致 `auto_jailbreak` 误将违规模型报告为合规。涉及安全评估可靠性，讨论持续中。

### 5. 模型响应出现 persuasion-bomb / sycophancy 倾向 — [#62738](https://github.com/NousResearch/hermes-agent/issues/62738)
- 作者：@CaptainHowlingMadMurdockBot｜更新：08-10｜评论：2
- 跨提供商观察到模型输出存在攻击性拒绝、指控用户操控、或无批判性谄媚等模式。社区希望 Hermes 能检测并缓解这类不良输出风格，而非仅透传模型回复。

### 6. [Feature] 自主评估与自我改进引擎（HAEE）— [#61644](https://github.com/NousResearch/hermes-agent/issues/61644)
- 作者：@RUFFY-369｜更新：08-10｜评论：2
- 用户直接引用官方 curator 文档：“The curator never tests whether a skill actually works, produces correct output, or remains logically valid.” 质疑 Hermes 宣称的 `self-improving` 名不副实，希望引入自主验证循环。

### 7. [P3] Linux/Wayland 下 HUD 无法拖动 — [#82851](https://github.com/NousResearch/hermes-agent/issues/82851)
- 作者：@asimons81｜更新：08-10｜评论：1
- KDE Plasma 6 / KWin 下 `BrowserWindow.setPosition()` 是 no-op，HUD 可渲染、可输入，但无法拖动或 reposition。影响 Linux 桌面端核心交互体验。

## 重要 PR 进展

> 过去 24 小时共 50 条 PR 更新，以下按重要性选取 10 条。

### 1. feat: Desktop-managed Computer Use bridge — [#61507](https://github.com/NousResearch/hermes-agent/pull/61507)
- 新增经认证的 Computer Use 桥接后端与 CLI，支持远程 Hermes 后端将 Computer Use 调用安全路由到本机；Desktop 侧通过 loopback WebSocket 管理 sidecar 进程。是远程控制与桌面安全集成的重要基础设施 PR。

### 2. fix(agent): 标题生成增加 `json_object` 回退，处理 HTTP 400 — [#82868](https://github.com/NousResearch/hermes-agent/pull/82868)
- `generate_title()` 硬编码 `json_schema` 且无回退，部分提供商会返回 400 并被归为不可重试。此 PR 在 400 时自动降级为 `json_object`，避免会话标题一直停留在截断派生值。

### 3. fix(state): trigram tokenizer 缺失时不再每次重建整个 FTS 索引 — [#82867](https://github.com/NousResearch/hermes-agent/pull/82867)
- 修复 `SessionDB._init_schema` 中触发条件用错（三缺一也算全缺），导致每次打开都全量重建 FTS 索引，显著拖慢启动与历史搜索响应。

### 4. fix(file_ops): 停止将 UTF-8 截断伪影误判为二进制 — [#82865](https://github.com/NousResearch/hermes-agent/pull/82865)
- `read_file` 采样时若遇到跨字节边界的多字节字符（CJK、emoji、带音标拉丁字母），会误判为二进制导致文件不可读。此 PR 修正采样逻辑，利好多语言文件处理。

### 5. fix(file): 保留 fallback 采样边界处的 UTF-8 完整性 — [#82239](https://github.com/NousResearch/hermes-agent/pull/82239)
- 与 #82865 同源问题的另一种场景：超过 1000 字节 fallback 边界时，若截断出现在 code point 中间会误判二进制。修复后读取额外字节补齐截断序列，避免破坏替换逻辑。

### 6. fix(desktop): 使用原生 `-webkit-app-region` 拖拽 HUD，兼容 Wayland — [#82861](https://github.com/NousResearch/hermes-agent/pull/82861)
- 在 Wayland 下 `setPosition()` 无效，此 PR 改用原生 drag region 实现 HUD 拖动，解决 KWin 等合成器下的窗口移动问题。

### 7. fix(telegram): 仅将纯 reaction 回复作为原生 reaction 投递 — [#82864](https://github.com/NousResearch/hermes-agent/pull/82864)
- 为 Telegram 增加 reaction 投递原语：当最终回复为精确 emoji 或 `REACTION: <emoji>` 时，以 native reaction 发送，且避免被生命周期完成 reaction 覆盖。

### 8. fix(telegram): 限制 fallback IP 连接池预算，不再随 IP 数倍增 — [#82860](https://github.com/NousResearch/hermes-agent/pull/82860)
- 修复 #82678。`TelegramAdapter` 的连接池数量此前随 fallback IP 数量线性增长，导致资源开销过大；现按 pool count 封顶。

### 9. fix(deps): 强制 multipart 与 Weixin 加密版本下限 — [#82862](https://github.com/NousResearch/hermes-agent/pull/82862)
- 将 `python-multipart` 下限提升至 `>=0.0.32,<1`，移除 Weixin AES 路径中废弃的 `default_backend()` 调用，并补充依赖下限与 AES 兼容性回归测试。

### 10. fix(agent): 无说明图片上传使用事实性占位符 — [#82866](https://github.com/NousResearch/hermes-agent/pull/82866)
- 此前无配图上传会注入虚构指令 “What do you see in this image?”，可能误导 skill 路由与记忆。改为事实性占位符，避免将非用户意图写入历史。

## 功能需求趋势

- **自主评估与自我改进闭环**：#61644 对 “self-improving” 的实质验证提出明确诉求，社区希望 curator 能测试 skill 实际有效性，而非依赖声明。
- **多语言/多字节文本兼容**：弯引号拒绝检测、UTF-8 截断误判二进制、CJK/emoji 文件读取问题集中出现，非英文内容支持成为稳定性短板。
- **消息平台适配深度完善**：微信语音并发、Telegram reaction/连接池、Weixin stale token、QQ 群消息观察、Zalo 新适配器密集更新，多平台生产可用性是重点投入方向。
- **桌面端跨平台体验（Wayland）**：HUD 拖拽问题说明 Linux 桌面用户占比已不容忽视，原生 Wayland 支持需求迫切。
- **终端/沙箱生态可扩展**：`terminal backend extension API`（#78014）与 Blaxel 云沙箱（#78140）显示社区希望终端后端能插件化、接入更多云沙箱服务。
- **会话状态持久化一致性**：内存修复与 `state.db` 不同步、FTS 索引重复重建，提示会话恢复与索引可靠性是治理重点。

## 开发者关注点

- **数据安全与破坏性命令防护**：#82842 的 `rd /s /q` 根目录事件是今日最大痛点，开发者强烈关注工具调用的路径边界审查；#79336 的 auto_jailbreak 误报则暴露了安全评估工具自身的可靠性问题。
- **中文/非 ASCII 处理是高频踩坑区**：从弯引号到 UTF-8 采样边界再到微信语音消息误删，多字节支持问题在不到一周内多次出现，说明中文用户与测试覆盖在社区中占比不低。
- **自治性信任危机**：用户直接引用文档吐槽 “curator never tests whether a skill actually works”，开发者希望 Hermes 的自我改进能力能通过实际验证建立信任，而非停留在口号层面。
- **平台适配器细节决定可用性**：Weixin 的语音并发、Telegram 的连接池、QQ 的群消息观察——这些看似边缘的适配器问题，正是在生产环境中真实影响消息到达率的关键点。

</details>

</div>
