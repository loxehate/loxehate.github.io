---
title: "AI CLI 工具社区动态日报"
date: 2026-08-05
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# AI CLI 工具社区动态日报 2026-08-05

> 生成时间: 2026-08-05 00:35 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-08-05）

## 1. 生态全景

AI CLI 工具已从"编码副驾驶"演进为开发团队的日常基础设施，但社区情绪正从追逐新功能转向"可靠性优先"——数据丢失、进程泄漏、会话不可恢复成为跨工具最强烈的反馈信号。今日 7 个主流工具合计发布 9 个版本、数十个重点 PR，迭代节奏仍处高位，但商业产品与开源工具的分化已显现：Claude Code 与 Codex 在庞大的存量用户反馈中负重前行，OpenCode、Qwen、Hermes 则在审查管线、CI 可观测性、Agent 平台化等垂直方向探索差异化。一个值得注意的共性是：**Windows 体验是全行业共同的短板**，而安全信任边界与 MCP 生态稳定性正被所有工具共同正视。

## 2. 各工具活跃度对比

| 工具 | 重点 Issues | PR 数 | 版本发布 | 最高热度信号 |
|---|---|---|---|---|
| Claude Code | 10 | 3 | v2.1.222（安全隔离修复） | #42776 Windows 文件锁，117 评论 |
| OpenAI Codex | 10 | 10 | 4 个 Rust alpha 版本 | #9203 请求恢复 /undo，372 👍 / 68 评论 |
| Gemini CLI | 10 | 10 | 无 | #22323 子代理误报成功，12 评论 |
| DeepSeek Reasonix | 10 | 10 | v1.19.6（稳定版） | HTTP 400 请求被拒，3 例独立复现 |
| OpenCode | 10 | 10 | v1.18.13 + v1.18.12 | #16017 Go 用量 API，126 👍 |
| Qwen Code | 2 | 50（重点 10） | v0.21.5 | #8532 CI 日志误导排障 |
| Hermes | 10 | 10 | 无 | #64182 插件接口扩展，20 评论 |

**解读**：Codex 以 4 个 alpha/日 的节奏领先迭代速度；Qwen Code 呈现典型的"开发驱动"形态（PR 数量远超 Issue 讨论）；Claude Code 的 Issue 单条评论量级最大，反映其用户基数最高；Gemini 与 Hermes 当日无发布，处于稳定沉淀期。

## 3. 共同关注的功能方向

### ① 数据可靠性与会话完整性（最高优先级焦虑）
- **Claude Code** #74260：文本块静默丢失且不进 JSONL 转录，全平台复现
- **OpenCode** #40527：子代理最终流失败时静默丢弃已完成工作，无错误无重试
- **DeepSeek Reasonix** #7521：升级后 0 字节 jsonl + 会话锁孤儿，被标记 data-loss
- **Hermes**：两个 P0 PR 同时修复 prompt_cache_key 跨会话串用（#78959/#78956）

### ② Windows 平台稳定性（全行业共同短板）
- **Claude Code**：#42776（4 月至今未解的桌面端文件锁）+ #83243（Bash 全量 EOF 回归）
- **Codex**：Windows 专项问题群（#28080、#31625、#31669）
- **DeepSeek Reasonix**：#7512 QQ 机器人 intent 授权失败、#7521 更新后数据丢失
- **OpenCode**：Desktop provider/model/MCP 加载失败（#40516）、ECONNREFUSED 死循环（#40525）

### ③ 安全与信任边界收紧
- **Codex** PR #36960：目录信任改为显式确认，防止 prompt injection 暴露面扩大
- **Hermes**：#78959/#78956 缓存按 session/tenant 隔离，杜绝跨会话数据泄漏
- **Qwen Code** #8396：修复 hooks 的 4 个信任边界漏洞（含重定向绕过 SSRF 检查）
- **Claude Code** #83986：Fable 5 安全护栏误伤正常开发指令，安全机制的"假阳性"开始反噬

### ④ 本地/自托管模型支持
- **Gemini CLI** #28681：支持 SGLang 与本地 OpenAI 兼容端点
- **DeepSeek Reasonix**：#7234 MiMo 协议对齐、#7168 DashScope 兼容性
- **OpenCode** #40485：deepseek-v4-flash 经 opencode-go 返回 403
- **Hermes**：custom provider 配置链路 3 个独立 bug（#44349、#76602、#78978）

### ⑤ 回滚与撤销保护
- **Codex** #9203：/undo 以 372 👍 成为今日全社区最强单一需求，针对 git 未跟踪文件的破坏性操作
- **DeepSeek Reasonix** v1.19.6：引入事务性回滚机制
- **Claude Code** v2.1.222：修复 worktree 隔离会话可执行破坏性 git 命令的漏洞

### ⑥ TUI 基础交互体验
- **Claude Code** #13378（72 👍 超长周期痛点）：两空格缩进 + 80 列换行破坏复制粘贴
- **OpenCode** #36646：Tmux + Kitty 下复制粘贴失效
- **Gemini CLI** #25166：命令执行后卡在 Waiting input；#28641 窄终端幽灵文本死循环
- **Qwen Code** #8439：VP 模式吞掉超链接点击与右键菜单

## 4. 差异化定位分析

| 工具 | 定位 | 技术路线 | 核心优势 | 当前主要矛盾 |
|---|---|---|---|---|
| **Claude Code** | 企业级商业产品，全功能型 | 闭源 + 桌面/TUI/VS Code 多端 | 功能广度与生态成熟度最高，安全修复响应快（v2.1.222） | 存量用户基数大，Windows 陈年 bug 与 TUI 回归积压（#42776 四月未解） |
| **OpenAI Codex** | 多端一体的 AI 编程平台 | Rust 重写，CLI/Desktop/Android | 迭代速度最快（4 alpha/日），MCP 基础设施投入密集 | 破坏性操作缺保护网（/undo 372👍），MCP 进程泄漏（9+ GB RSS） |
| **Gemini CLI** | Google 生态的工程化助手 | TypeScript，重视评估体系 | 工程质量意识强（76 个行为测试、组件级评估 EPIC），本地模型支持前瞻 | 社区规模较小，子代理可靠性（误报成功、无限挂起）影响信任 |
| **DeepSeek Reasonix** | 多供应商兼容的自动化 Agent | Go 重写（main-v2） | 激进创新：/loop 定时任务、多模态路由、架构简化（删 36k 行 Remote Workbench） | Go 重写协议层未稳，HTTP 400 系列问题成最高频缺陷 |
| **OpenCode** | 商业化开源工具 | 开源 + Desktop/TUI | 社区需求响应快（RTL 修复、Azure GPT-5.5+），性能优化激进（渲染内存 -75%） | Desktop 稳定性回归（v1.18.5–v1.18.13），流中断数据丢失 |
| **Qwen Code** | 团队级代码审查基础设施 | 开源，审查管线深耕 | /review 企业化：Maven 多模块、成本账本、截图证据、CI 产物复用 | 外部社区参与度有限，Issue 讨论活跃度低 |
| **Hermes** | Agent 框架/平台化探索 | 开源，插件化架构 | 多租户安全敏感度高（P0 缓存隔离），Bug 报告根因质量高 | 平台适配量大（Telegram/Feishu/Hindsight），cron 模块成 bug 聚集区 |

## 5. 社区热度与成熟度

- **最成熟 / 规模最大**：**Claude Code**。Issue 单条最高 117 评论、全平台复现的 bug、跨季度未解的老 issue 并存，标志其用户量级远超其他工具，但维护节奏已出现压力。适合作为企业基线，但选型时需重点评估其在目标平台（尤其是 Windows）的具体 issue 状态。
- **需求最强烈 / 迭代最激进**：**OpenAI Codex**。/undo 的 372 👍 是今日全社区最强的单一需求信号，4 个 alpha/日 的节奏说明官方在快速试错；但 MCP 泄漏、重复线程等系统性问题也随迭代密度同步暴露，适合愿意跟进 alpha 链的技术团队。
- **快速成长期**：**DeepSeek Reasonix** 与 **OpenCode**。版本发布和 PR 活跃度高，但稳定性回归（HTTP 400、Desktop 加载失败）与增长相伴，处于"增速快于质量"的阶段；两者的开源属性提供了自主修复的可能性。
- **工程驱动型**：**Qwen Code**。50 个 PR vs 2 个活跃 Issue，内部工具链（审查、CI、成本核算）投入显著大于外部社区互动，更接近"项目驱动型"开源，外部贡献者需关注其治理节奏。
- **小规模高精度**：**Gemini CLI** 与 **Hermes**。Issue 讨论偏技术深度、根因清晰（如逗号运算符泄漏、D-Bus 挂起），未出现大规模情绪化反馈；适合对工程严谨性要求高的早期采用者，但生态完善度需自行评估。

## 6. 值得关注的趋势信号

1. **数据完整性是 AI CLI 的生死线**。Claude Code、OpenCode、DeepSeek 在 24 小时内同时出现静默数据丢失类 bug，开发者对"会话内容不可信"的容忍度极低。决策者评估工具时，应将**转录日志完整性、回滚恢复能力、失败显式化**列为与功能同等重要的选型权重。

2. **安全机制正从"事后修复"转向"默认显式信任"**。Codex 的目录信任确认、Hermes 的缓存按会话隔离、Qwen 的 hook 信任边界加固，共同指向 prompt injection 防护已从模型层下沉到 CLI 基础设施层。使用第三方 MCP/插件/自定义 provider 的团队，应优先选择信任模型清晰、边界可配置的工具。

3. **本地与自托管模型成为差异化竞争点**。Gemini 支持 SGLang、DeepSeek 对齐 DashScope/MiMo、OpenCode/Hermes 的自定义 provider 链路，反映企业对数据主权和模型可替换性的诉求正在上升。"是否支持自有模型网关"将成为企业选型的关键分水岭。

4. **AI CLI 正在从个人工具升级为"团队基础设施"**。Qwen 的审查成本账本（单 PR 523 次模型调用/37.8M tokens）、OpenCode 的用量 API 呼声（126 👍）、Gemini 的组件评估框架，都指向同一方向——AI 编码工具需要可度量、可治理、可审计。具备成本核算、CI 集成、策略控制能力的工具将在企业采购中胜出。

5. **TUI 基础体验是留存关键，且 RTL 等国际化需求开始显性化**。复制粘贴、文本选择、窄终端适配等"编辑器基本功"的回归（Claude #13378 72 👍、OpenCode #36646、Gemini #28641）持续消耗社区耐心；Claude Code 的 RTL 支持以 90 👍 成为最高支持度功能需求，希伯来语/阿拉伯语用户群体已形成不可忽视的声音。工具在追求新功能之前，应先把基础交互与国际化做扎实。

---

*本报告基于 2026-08-05 各工具 GitHub 公开数据，覆盖 Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenCode、Qwen Code、Hermes 共 7 个工具。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止**: 2026-08-05 | **数据源**: github.com/anthropics/skills

---

## 一、热门 Skills 排行（按社区关注度）

### 1. skill-creator 核心修复（run_eval.py recall=0%）
- **PR**: [#1298](https://github.com/anthropics/skills/pull/1298) @MartinCajiao | 状态: **Open**
- **功能**: 修复 `run_eval.py` 对所有技能恒定报告 recall=0% 的严重缺陷（关联 issue #556，10+ 独立复现），使 `run_loop.py` / `improve_description.py` 的优化闭环不再"对着噪声优化"；同时修复 Windows 流读取、触发检测与并行 worker 问题。
- **热点**: 评论数居全仓库首位，直接牵动 skill-creator 工具链可靠性这一最大痛点，与 #1099、#1050、#1323、#1261 等形成修复 PR 集群。

### 2. document-typography（文档排版质量控制）
- **PR**: [#514](https://github.com/anthropics/skills/pull/514) @PGTBoos | 状态: **Open**
- **功能**: 专治 AI 生成文档的三大高频排版问题——孤行（1-6 词溢出到下一行）、寡段（章节标题滞留页底）、编号错位。
- **热点**: 直击"每个 Claude 生成的文档都会遇到"的体验痛点，社区反响积极。

### 3. ODT / OpenDocument 技能
- **PR**: [#486](https://github.com/anthropics/skills/pull/486) @GitHubNewbie0 | 状态: **Open**
- **功能**: 创建、填充、读取 .odt/.ods 文件，并支持 ODT→HTML 转换，触发词覆盖 ODT/ODS/ODF/LibreOffice/ISO 标准等。
- **热点**: 补齐官方文档技能矩阵中开放标准格式的空缺，讨论集中在对 LibreOffice 生态的覆盖范围。

### 4. skill-quality-analyzer + skill-security-analyzer（元技能）
- **PR**: [#83](https://github.com/anthropics/skills/pull/83) @eovidiu | 状态: **Open**
- **功能**: 新增两个元技能——质量分析器从结构/文档/示例等五维评估 SKILL.md；安全分析器对技能做安全审计。
- **热点**: 与 #492（安全信任边界）形成呼应，社区对技能自身的质量与安全性治理需求上升。

### 5. self-audit（交付前质量门禁）
- **PR**: [#1367](https://github.com/anthropics/skills/pull/1367) @YuhaoLin2005 | 状态: **Open**
- **功能**: 先做机械性输出文件校验，再按损害严重度优先级做四维推理审计，宣称通用任意项目/技术栈。
- **热点**: 与提案 #1385（Reasoning Quality Gate Pipeline）同源，代表社区对 agent 输出可靠性的系统性探索。

### 6. testing-patterns（测试方法论技能）
- **PR**: [#723](https://github.com/anthropics/skills/pull/723) @4444J99 | 状态: **Open**
- **功能**: 覆盖完整测试栈：Testing Trophy 模型、"测什么 vs 不测什么"、单元测试 AAA 模式、React Testing Library 实践、边界用例与命名规范。
- **热点**: 测试生成是 agent 编码最高频场景之一，社区期待将系统化测试方法论沉淀为可复用技能。

### 7. color-expert（色彩专家技能）
- **PR**: [#1302](https://github.com/anthropics/skills/pull/1302) @meodai | 状态: **Open**（2026-07-21 仍在更新）
- **功能**: 自包含的色彩专业知识包——ISCC-NBS、Munsell、XKCD、RAL 等命名体系，OKLCH/OKLAB/CAM16 等色彩空间选型对照表。
- **热点**: 垂直领域"专家型技能"的代表作，体现社区将高密度专业知识注入 SKILL.md 的趋势。

### 8. pyxel（复古游戏开发技能）
- **PR**: [#525](https://github.com/anthropics/skills/pull/525) @kitao | 状态: **Open**（2026-07-15 更新）
- **功能**: 面向 Pyxel 复古游戏引擎的 MCP 服务器技能，覆盖"编写 → 运行截图 → 检查 → 迭代"完整工作流。
- **热点**: 由引擎作者亲自提交，属于创意/游戏领域的标杆案例，社区关注其技能+ MCP 的组合模式。

---

## 二、社区需求趋势（来自 Issues）

### 🔴 最热：安全与信任边界
- **[#492](https://github.com/anthropics/skills/issues/492)（43 评论）**: 社区技能在 `anthropic/` 命名空间下分发，冒充官方技能，构成信任边界滥用——用户可能将高权限授予"看起来官方"的社区技能。
- **趋势**: 技能市场的**来源可信度与权限边界**已成为社区第一关切，预计将推动官方引入签名/认证机制。

### 🟠 组织级技能共享
- **[#228](https://github.com/anthropics/skills/issues/228)（16 评论，8 👍）**: 要求 Claude.ai 原生支持组织级技能库与分享链接，替代当前"下载 .skill → 发 Slack → 手动上传"的原始流程。
- **趋势**: 团队协作场景下，技能分发效率成为瓶颈。

### 🟠 skill-creator 工具链可靠性（多 issue 共振）
- **[#556](https://github.com/anthropics/skills/issues/556)（12 评论，7 👍）**、**[#1169](https://github.com/anthropics/skills/issues/1169)**、**[#1061](https://github.com/anthropics/skills/issues/1061)**: `run_eval.py` 触发率恒为 0%、描述优化循环失效、Windows 下 subprocess/PATHEXT/编码三连坑。
- **趋势**: 技能生产工具链（评估/优化闭环）的稳定性是当前最大的技术债，且 Windows 用户受影响尤为严重。

### 🟡 上下文窗口经济性
- **[#1487](https://github.com/anthropics/skills/issues/1487)**: `claude-api` 技能单次注入 ~156k tokens，直接撑爆上下文窗口。
- **[#1329](https://github.com/anthropics/skills/issues/1329)**: 提议 `compact-memory` 技能，用符号化记法压缩 agent 长期状态。
- **趋势**: 技能体积与上下文成本必须纳入设计约束，大型技能面临"瘦身"压力。

### 🟡 治理与质量门禁
- **[#412](https://github.com/anthropics/skills/issues/412)（已关闭）**: agent-governance 技能提案（策略执行、威胁检测、审计）。
- **[#1385](https://github.com/anthropics/skills/issues/1385)**: 三阶段质量门禁管线（任务前校准 → 对抗评审 → 交付验证）。
- **趋势**: 社区正自发构建 agent 输出的**质量保障与治理体系**。

### 🟡 持续存在的基础诉求
- **[#16](https://github.com/anthropics/skills/issues/16)**: 将 Skills 暴露为 MCP 协议服务。
- **[#29](https://github.com/anthropics/skills/issues/29)**: AWS Bedrock 平台支持。
- **[#62](https://github.com/anthropics/skills/issues/62)**: 本地技能文件丢失/报错（10 评论）。
- **[#189](https://github.com/anthropics/skills/issues/189)（9 👍）**: `document-skills` 与 `example-skills` 插件内容重复导致技能重复加载。

---

## 三、高潜力待合并 Skills

以下 PR 讨论活跃、内容完整，且近期有持续更新，落地概率较高：

| PR | 技能 | 亮点 | 最近更新 | 链接 |
|----|------|------|----------|------|
| #514 | document-typography | AI 文档排版顽疾的精准解法 | 2026-03-13 | [链接](https://github.com/anthropics/skills/pull/514) |
| #486 | ODT/OpenDocument | 补齐开放文档格式空白 | 2026-04-14 | [链接](https://github.com/anthropics/skills/pull/486) |
| #83 | quality/security analyzer | 元技能方向，回应安全关切 | 2026-01-07 | [链接](https://github.com/anthropics/skills/pull/83) |
| #723 | testing-patterns | 测试方法论系统化沉淀 | 2026-04-21 | [链接](https://github.com/anthropics/skills/pull/723) |
| #525 | pyxel | 作者自带生态，工作流完整 | 2026-07-15 | [链接](https://github.com/anthropics/skills/pull/525) |
| #1302 | color-expert | 垂直领域知识密度高 | 2026-07-21 | [链接](https://github.com/anthropics/skills/pull/1302) |
| #1367 | self-audit | 与 #1385 提案呼应，概念完整 | 2026-07-02 | [链接](https://github.com/anthropics/skills/pull/1367) |
| #1479 | plan-file-hygiene | 规划产物生命周期管理 | 2026-07-27 | [链接](https://github.com/anthropics/skills/pull/1479) |
| #1298 | skill-creator 修复 | 治愈 recall=0% 核心故障 | 2026-06-23 | [链接](https://github.com/anthropics/skills/pull/1298) |

> **注意**: 当前观测到的高热度 PR 全部处于 **Open** 状态，尚无合并记录——尤其 [#1298](https://github.com/anthropics/skills/pull/1298)、[#1323](https://github.com/anthropics/skills/pull/1323)、[#1261](https://github.com/anthropics/skills/pull/1261) 等 skill-creator 修复 PR 若能尽早合并，将直接缓解社区最集中的抱怨。

---

## 四、Skills 生态洞察

**一句话总结**: 当前社区最集中的诉求是"先让技能生产工具链可靠起来"——围绕 `run_eval.py` 触发率恒为 0% 的故障闭环及其 Windows 兼容性问题占据了最多讨论，其次是对技能安全信任边界（#492）与质量/治理机制的强烈关注；而新技能需求则呈"实用主义"走向：集中在文档格式处理、测试方法论、专业垂直知识（色彩/排版/复古游戏）与上下文经济性优化，尚未出现"杀手级"应用方向。

---

# Claude Code 社区动态日报（2026-08-05）

## 今日速览

Claude Code v2.1.222 发布，重点修复了 worktree 隔离会话可执行破坏性 git 命令的漏洞，以及 PreToolUse auto-allow hook 绕过工具限制的问题。社区层面，Windows 桌面端"孤儿进程文件锁导致无法重启"的 Issue 已累积 117 条评论成为最热话题；同时多起"上下文/文本数据静默丢失"类 bug 引发开发者对数据可靠性的集中担忧。

## 版本发布

**v2.1.222** 🔒 安全与隔离修复

- 修复 worktree 隔离会话及其子代理可对主检出目录执行破坏性 git 命令的问题——现在隔离机制在**所有会话类型**中对文件编辑和 Bash 均生效。
- 修复后台代理任务中 PreToolUse auto-allow hooks 可绕过工具限制的问题。

👉 https://github.com/anthropics/claude-code/releases

## 社区热点 Issues

### 🔥 最热争议

**1. Windows 桌面端因孤儿进程文件锁无法重启**（#42776）
117 条评论 / 51 👍，4 月提出至今未解。Windows 用户重启 Claude Code Desktop 时被残留进程的文件锁卡死，属于高频阻断性问题，社区呼声极高。
👉 https://github.com/anthropics/claude-code/issues/42776

**2. RTL（从右到左）语言支持缺失**（#38005）
90 👍 / 41 条评论，被标记为 `enhancement` + `area:a11y`。希伯来语、阿拉伯语用户无法正常使用桌面端与 Cowork 功能，是当前**需求类 Issue 中支持度最高**的一个。
👉 https://github.com/anthropics/claude-code/issues/38005

### ⚠️ 数据可靠性与核心功能

**3. 助手文本块被静默丢弃**（#74260）
2.1.201 + 自适应思考下，`text` 块后紧跟 thinking 时文本块既不渲染、也不写入 transcript JSONL——**数据丢失类 bug**，跨 Win/macOS/Linux 全平台复现，24 条评论。
👉 https://github.com/anthropics/claude-code/issues/74260

**4. PDF 读取依赖 poppler-utils 但完全未文档化**（#23704）
Read 工具宣称支持 PDF，实际依赖 `pdftoppm`，容器等常见环境默认不装且装后无检测提示。15 条评论，暴露工具链文档缺口。
👉 https://github.com/anthropics/claude-code/issues/23704

**5. 命令行会话无法通过 `--continue` 恢复**（#82536）
`-p`（print 模式）创建的 session 无法用 `--continue` 交互式恢复，CLI 工作流断裂，6 条评论，属于近期新上报（7/30）。
👉 https://github.com/anthropics/claude-code/issues/82536

**6. Windows 上 Bash 工具连简单命令都报 `unexpected EOF`**（#83243）
v2.1.220 回归，PowerShell 环境下任何 Bash 调用均失败，哪怕无引号、无多行内容。影响面极大，需紧急修复。
👉 https://github.com/anthropics/claude-code/issues/83243

### 🎨 TUI / 交互体验

**7. 两空格缩进 + 80 列换行破坏复制粘贴**（#13378）
72 👍，自 2025 年 12 月持续至今。输出被强加缩进和硬换行，导致复制代码/日志格式错乱，用户呼吁提供关闭配置。属超长周期未解决的痛点。
👉 https://github.com/anthropics/claude-code/issues/13378

**8. VSCode 终端中无法选中文本复制**（#61021）
终端原生选择复制行为被 Claude Code 劫持，点击拖选后 Ctrl+C 失效。15 条评论，TUI 交互回归，波及大量 VSCode 用户。
👉 https://github.com/anthropics/claude-code/issues/61021

### 🛠 工具链与集成

**9. Workflow 工具把 JSON args 当字符串传递**（#72248）
文档承诺"verbatim"传递对象/数组，实际脚本收到的 `args` 是 JSON 编码字符串，与契约不符，影响 Workflow 自动化脚本开发。
👉 https://github.com/anthropics/claude-code/issues/72248

**10. VS Code 扩展中 notification hooks 不触发**（#55875）
`permission_prompt` 事件在 VS Code 环境下不触发通知 hooks，14 条评论，已被关闭（修复或转为其他跟踪）。
👉 https://github.com/anthropics/claude-code/issues/55875

**📌 值得关注的新上报**（今日，0 评论但信号明确）：
- **#83986** Fable 5 安全护栏误伤正常开发指令（CRM 开发中向子代理传实现计划被拦截并自动切换 Opus 5）
- **#83985** 正常 API 请求被限流/拦截，用户强烈不满
- **#83984** WebFetch 抓取 LinkedIn 返回 HTTP 999，工具无任何指引
👉 https://github.com/anthropics/claude-code/issues/83986

## 重要 PR 进展

过去 24 小时共 3 个 PR（均处于 Open 状态）：

**1. #83738 — 修复 symlink 路径展开 bug**（作者：@KrypticKode007）
解决 `claude install` 在部分 Linux 发行版上把 `~/.local/bin/claude` 创建为指向字面量 `%h/...` 的损坏符号链接，改为先展开 home 目录再创建目标。
👉 https://github.com/anthropics/claude-code/pull/83738

**2. #83374 — 文档：补充 MessageDisplay hook 语义**（作者：@iCodeCraft）
内置 Hook 开发技能文档遗漏了 `MessageDisplay` 事件——补全其触发器描述、事件指南和速查表，方便插件开发者正确使用流式消息展示事件。
👉 https://github.com/anthropics/claude-code/pull/83374

**3. #83890 — 新增 pylint CI 配置**（作者：@KrypticKode007）
为仓库引入 pylint GitHub Actions 工作流，加强 Python 代码静态检查。
👉 https://github.com/anthropics/claude-code/pull/83890

## 功能需求趋势

从全部 Issues 中提炼的社区关注方向：

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **Windows 平台稳定性** | #42776 无法重启、#83243 Bash EOF、#72123 语音劣化、#53134 MCP 双启动 | 🔴 极高（4 起活跃 bug） |
| **TUI 可交互性/可访问性** | #13378 复制粘贴、#61021 文本选择、#38005 RTL | 🔴 高（需求+回归并存） |
| **上下文与数据完整性** | #74260 文本丢弃、#82131 autocompact 抖动、#82144 压缩后技能重注入 | 🟠 高（数据丢失类最敏感） |
| **远程/SSH 桌面会话** | #83643 插件 hooks 不同步、#83815 SSH 密码死循环、#83983 Connector 不可用 | 🟠 中（桌面远程方向新痛点集中） |
| **模型行为可预期性** | #80614 /model 不持久化、#79293 模型伪造 turn、#83986 Fable 5 误报 | 🟡 中（新模型引入新问题） |
| **文档补齐** | #23704 poppler-utils、#83981 skills frontmatter、#83984 WebFetch 999 | 🟡 中（多处"文档与行为不符"） |

## 开发者关注点

1. **数据丢失是最高优先级焦虑**：`#74260` 文本块静默消失且不进 JSONL 转录、`#83971` 后台化任务只携带最后一条 prompt 丢失全部上下文、`#82144` 压缩后技能重注入消耗 4 倍上下文——开发者对"会话内容不可信"的抱怨正在集中爆发。

2. **Windows 是重灾区**：从桌面端启动（#42776）到 Bash 执行（#83243）再到语音播放（#72123），Windows 用户几乎每条主链路都有未关闭 bug，且有 4 月至今未解的陈年 Issue。

3. **基础交互退化比新功能更伤体验**：复制粘贴、文本选择这类"编辑器基本功"的回归（#13378、#61021）获得了 70+ 👍，说明社区对 TUI 体验的耐心正在消耗。

4. **安全机制开始误伤正常开发**：Fable 5 护栏拦截合法指令并强制切模型（#83986）、Bash 结果中被注入"system-style"指令（#74651）——安全功能若产生"假阳性"会直接打断开发流，社区对此容忍度很低。

5. **文档/契约不一致频发**：PDF 工具隐性依赖（#23704）、Workflow args 类型与文档不符（#72248）、skills frontmatter 两套 schema（#83981），开发者希望"工具声明什么就该是什么"。

---
*本日报由 GitHub 公开数据自动生成，数据截至 2026-08-05。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-08-05）

## 今日速览

今日 Codex 发布了 4 个 Rust 版本（0.147.0-alpha.7 及三个补丁级 alpha 迭���），修复节奏活跃。社区最关注的事件是 Issue #9203（请求恢复 `/undo` 功能）获得 372 个 👍 和 68 条评论，成为本周最热门的需求；新增 Issue #36997 和 #36996 则暴露了 Android Remote 语音模式在多线程创建和错误处理上的缺陷。PR 方面，昨日批量合入了一批围绕 MCP 安全、模型目录缓存与外部会话导入的改进。

## 版本发布

过去 24 小时共发布 4 个 Rust 版本，均为 0.147.0-alpha.x 系列的迭代更新：

- **[rust-v0.147.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.147.0-alpha.7)** — 最新 alpha 版本
- **[rust-v0.147.0-alpha.6.4](https://github.com/openai/codex/releases/tag/rust-v0.147.0-alpha.6.4)** — alpha.6 的第四次补丁
- **[rust-v0.147.0-alpha.6.3](https://github.com/openai/codex/releases/tag/rust-v0.147.0-alpha.6.3)** — alpha.6 的第三次补丁
- **[rust-v0.147.0-alpha.6.1](https://github.com/openai/codex/releases/tag/rust-v0.147.0-alpha.6.1)** — alpha.6 的第一次补丁

Release 说明仅有简单的版本号标注，未附带详细的变更日志说明，推测为 CI 自动化发布的内部迭代版本。

## 社区热点 Issues

### 1. 请求恢复 "/undo" 功能（#9203）
**链接**: https://github.com/openai/codex/issues/9203

社区呼声最高的议题（👍 372 / 💬 68）。用户 @SunRunAway 指出在文件未被 git 跟踪时，Codex 误删文件或误改动未提交内容会造成无法挽回的损失，强烈请求恢复 `/undo` 功能。该 Issue 从 1 月创建至今仍开放，反映了用户对安全回滚机制的刚性需求。

### 2. 桌面 App"思考"时高 GPU 占用（#16857）
**链接**: https://github.com/openai/codex/issues/16857

用户报告 Codex App 在显示"思考中"的小动画时出现持续高 GPU 占用，影响笔记本续航和散热。评论数 38 条，不少用户跟帖反馈同样遭遇，属于桌面端的性能优化重点。

### 3. 自定义 stdio MCP server 工具无法暴露给 Desktop 线程（#19425）
**链接**: https://github.com/openai/codex/issues/19425

App Server 0.124.0-alpha.2 的回归 bug：`/mcp` 能发现自定义 stdio MCP server 且 `tools/list` 可返回工具列表，但 Desktop 线程和 `tool_search` 均不可见。对依赖私有 MCP server 的重度用户影响较大。

### 4. MCP server 进程泄漏：每个线程的进程从未清理（#30408）
**链接**: https://github.com/openai/codex/issues/30408

App-server 为每个新线程启动一套完整的 MCP 进程，但线程归档/关闭时从不销毁。报告显示泄漏进程累积可达 9+ GB RSS，属于严重的稳定性问题，评论中有用户建议添加进程回收机制。

### 5. Codex CLI 会话无法在 Desktop 历史中恢复（#21079）
**链接**: https://github.com/openai/codex/issues/21079

用户希望本地 CLI 会话能作为一等线程出现在 Desktop 历史中，或提供显式的"导入 CLI 历史"操作。当前 Desktop 已支持导入 Claude Code 历史，但对自家 CLI 会话缺乏同等支持，逻辑上不一致。

### 6. Desktop 线程工具间歇性丢失事件处理器（#28080）
**链接**: https://github.com/openai/codex/issues/28080

Windows 平台上，活动会话内的工具偶尔报 `No handler registered` 错误，影响任务执行稳定性。Codex CLI 0.128.0 + Windows 11 环境下可复现，已挂出 16 条评论。

### 7. Desktop 子代理忽略模型和推理设置（#28719）
**链接**: https://github.com/openai/codex/issues/28719

用户 @Nickonomic 在标题中直接使用"CAN YOU FIX THIS AT LAST?"表达强烈不满。子代理不遵循请求的模型和 reasoning 设置，而是继承父线程配置，导致用户无法为子任务指定轻量模型。

### 8. CLI 将 20x 订阅误判为 Lite 套餐（#32344）
**链接**: https://github.com/openai/codex/issues/32344

影响 Pro 20x 用户的限流策略问题：Codex CLI 0.144.1 将用户的 Pro 20x 订阅误识别为"Lite"套餐，用户表示从未在任何营销渠道见过 "Pro Lite" 的存在。该 Issue 已关闭，但引发的订阅识别逻辑讨论值得关注。

### 9. Windows 上切换自定义 OpenAI 兼容服务商后本地历史丢失（#31625）
**链接**: https://github.com/openai/codex/issues/31625

Windows 桌面版在切换自定义 OpenAI-compatible provider 后，本地历史记录从界面中消失。涉及 custom-model 与 app-server 的联动问题，对使用第三方模型网关的用户影响较大。

### 10. Android Remote 语音模式下一次 create_thread 调用创建 7-8 个重复线程（#36997）
**链接**: https://github.com/openai/codex/issues/36997

今日新增 Issue（由 GPT 5.6 Sol xhigh 协助撰写）。用户在 Android 端通过 GPT Live 语音让 Codex 创建一个 thread，系统竟创建了 7-8 个重复线程。属于 App-server 遥控层的严重资源管理 bug。

## 重要 PR 进展

### 1. 支持分页线程的 includeTurns 读取（#36993）
**链接**: https://github.com/openai/codex/pull/36993

为 `thread/read` 增加 `includeTurns: true` 时的完整历史视图重构能力，确保分页存储的线程仍能通过旧版 API 获取全量会话记录。

### 2. 允许注入模型目录缓存（#36992）
**链接**: https://github.com/openai/codex/pull/36992

新增公共异步 `ModelsCache` 契约，让模型 provider 和 `OpenAiModelsManager` 可接受调用方自定义的缓存实现，同时保留默认的文件缓存行为。对提升冷启动速度和测试灵活性有意义。

### 3. 移除旧版协作模式变体（#36990）
**链接**: https://github.com/openai/codex/pull/36990

清理隐藏的 `PairProgramming` 和 `Execute` 两种 `ModeKind` 变体及关联 prompt 模板，将模式处理简化为仅剩 `Default` 和 `Plan`。属于代码库瘦身与维护性改进。

### 4. 保护共享的内置技能缓存（#36989）
**链接**: https://github.com/openai/codex/pull/36989

修复多服务共享同一 `CODEX_HOME` 时，禁用内置技能的服务错误删除其他服务仍在使用缓存文件的问题。

### 5. 为 exec-server 增加并发请求调度（#36987）
**链接**: https://github.com/openai/codex/pull/36987

新增 `--concurrent-requests <COUNT>` 参数，解决长耗时请求阻塞同一连接上健康检查和清理任务的问题。

### 6. 为 ChatGPT 请求增加进程级 PSP 路由（#36986）
**链接**: https://github.com/openai/codex/pull/36986

新增隐藏全局 `--psp` 运行时标志，贯穿 TUI、exec、app-server、remote-control 及进程内启动路径；启用时向第一方 ChatGPT 请求附加 `oai-chat-psp=true` cookie。

### 7. 在 HTTP 客户端中支持配置的 ChatGPT cookies（#36984）
**链接**: https://github.com/openai/codex/pull/36984

让 `HttpClientFactory` 能携带额外 ChatGPT cookie 并在克隆工厂间共享存储，路由感知的客户端或显式 opt-in 客户端会附加这些 cookie。

### 8. 为可信任的 staging MCP server 保留 ChatGPT 认证（#36983）
**链接**: https://github.com/openai/codex/pull/36983

当 MCP server 的来源匹配 `chatgpt-staging.com` 或其子域名时，将其视为可信并保留 ChatGPT 身份认证信息，同时保持与生产环境的兼容回退。

### 9. 为 Amazon Bedrock 启用远程压缩（#36981）
**链接**: https://github.com/openai/codex/pull/36981

为 Bedrock 增加 v1-only 的远程压缩能力，手动与自动压缩均走 `/v1/responses/compact` 端点，即使 v2 功能已启用也保持 v1 行为。对 Bedrock 用户降低 token 占用有帮助。

### 10. 在信任本地项目目录前增加提示（#36960）
**链接**: https://github.com/openai/codex/pull/36960

信任目录会启用项目本地配置、hooks 和执行策略，可能增加 prompt injection 的暴露面。该 PR 要求用户显式做出信任决策，不再自动信任未设置信任级别的项目。这是一项重要的安全加固变更。

## 功能需求趋势

从今日活跃的 Issues 中可以提炼出以下社区关注方向：

1. **安全回滚与撤销机制**（#9203，👍 372）：`/undo` 是社区最迫切希望恢复的功能，尤其在 git 未跟踪文件场景下，Codex 的破坏性操作缺少保护网。

2. **MCP 生态稳定性**（#19425、#30408）：MCP server 进程泄漏、工具暴露不一致成为高频问题，说明 MCP 集成是用户依赖度最高也最脆弱的环节之一。

3. **跨端会话一致性**（#21079、#31625）：CLI、Desktop、Android 之间的会话同步与历史迁移需求持续升温，用户期望在任何端上都能无缝接续工作。

4. **Windows/WSL 体验完善**（#28080、#31669、#25741 等）：大量 Windows 相关 bug 被报告，尤其是 WSL 模式下的配置隔离、路径解析、快捷键可靠性等问题，暗示 Windows 用户群体在快速增长，但体验打磨尚未跟上。

5. **性能与资源占用**（#16857、#30408）：GPU 占用、内存泄漏成为高频关键词，用户在意的不仅是功能，还有执行效率。

6. **模型选择灵活性**（#28719）：子代理无法继承自定义模型/推理设置，社区对更细粒度的模型控制有明确期待。

## 开发者关注点

1. **破坏性操作的后悔药**：开发者最痛的场景是 Codex 误删/误改未跟踪文件后无法恢复。建议在文件系统操作前默认启用确认机制或快照备份，降低使用风险。

2. **进程生命周期管理缺失**：MCP 进程泄漏（#30408）和重复线程创建（#36997）都指向同一类问题——资源生命周期管理与清理机制不完善，属于系统性的稳定性隐患。

3. **Windows 生态位需补齐**：@kendonB 等用户高频提交 Windows/WSL 相关问题，涉及 AGENTS.md 解析、config.toml 隔离、沙箱 UAC 弹窗等多个角落。建议官方建立 Windows 专项回归测试流程，而不是依赖社区反复报告同一类问题。

4. **订阅与限流判断不可靠**（#32344、#29362、#31207）：多位 Plus/Pro 用户遭遇订阅识别错误、用量统计混乱的问题，影响开发者对服务公平性的信任。

5. **安全与信任机制在收紧**：PR #36960 要求显式确认目录信任、#36983 对 staging MCP 的认证边界有明确划分，表明官方正在系统性加固 prompt injection 防线，这对使用第三方插件/MCP 的开发者是重要的信号——信任边界将越来越显式化。

---

**总结**：今日 Codex 处于高频迭代节奏中（4 个 alpha 版本 + 一批基础设施 PR），但社区的核心诉求仍然集中在"安全回滚"、"MCP 稳定性"和"跨端一致性"三大方向。`/undo` 的回归呼声持续攀升，官方或应在后续版本中优先回应这一需求。同时，Windows/WSL 与 MCP 进程管理已成为社区反馈最密集的领域，值得投入更多工程资源。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-05

## 1. 今日速览

昨日无新版本发布，但社区讨论活跃，核心焦点集中在 **Subagent 恢复机制误报成功**（#22323，12 条评论）与 **VS Code 扩展资源泄漏修复**（#27790，11 条评论）两大 bug 上。PR 侧则以 **SGLang/本地 OpenAI 兼容端点支持**（#28681）和 **MCP 服务器配置安全强化**（#28664）最受关注，反映出社区对本地部署与安全透明的双重诉求。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

以下为过去 24 小时更新最频繁、社区讨论最热烈的 10 个 Issue：

- **[#22323] Subagent 恢复后误报 GOAL 成功，掩盖真实中断**（P1, 12 评论）  
  核心痛点：`codebase_investigator` 子代理实际已达 max turn 上限，但报告却显示 `status: "success"` 且终止原因为 `GOAL`。这种"假阳性"严重误导用户对任务完成状态的判断，是 agent 可靠性领域的高关注问题。  
  👉 https://github.com/google-gemini/gemini-cli/issues/22323

- **[#27790] VS Code 扩展 activate() 中的逗号运算符泄漏两个 Disposable**（P2, 11 评论）  
  一个典型的 JavaScript 陷阱：`push(a, b)` 被错误包裹在逗号运算符中，导致 `gemini.diff.accept` 和 `onDidChangeWorkspaceFolders` 两个 Disposable 未被正确注册到 `context.subscriptions`，可能造成资源泄漏。被标记为 `good first issue`，适合新贡献者。  
  👉 https://github.com/google-gemini/gemini-cli/issues/27790

- **[#21409] Generalist agent 无限挂起**（P1, 8 评论, 8 👍）  
  多位用户反馈凡是交给 generalist agent 的简单任务（如创建文件夹）都会无限期等待，最长一小时无响应。社区暂时通过提示词禁止模型使用子代理来规避。这是影响日常使用的高频 P1 问题。  
  👉 https://github.com/google-gemini/gemini-cli/issues/21409

- **[#25166] Shell 命令执行完成后卡在 "Waiting input"**（P1, 4 评论, 3 👍）  
  极其简单的 CLI 命令执行结束后，UI 仍显示命令为活动状态并继续等待输入。用户 `rnett` 多次复现，涉及核心终端交互稳定性。  
  👉 https://github.com/google-gemini/gemini-cli/issues/25166

- **[#24353] 组件级评估框架建设（EPIC）**（P1, 7 评论）  
  在已有 76 个行为评估测试基础上，规划对 6 个 Gemini 支持模型开展更细粒度的组件级评估，旨在提升 agent 各模块的可测试性与质量门槛。  
  👉 https://github.com/google-gemini/gemini-cli/issues/24353

- **[#22745] AST 感知的文件读取、搜索与代码库映射评估（EPIC）**（P2, 7 评论）  
  讨论引入 AST 感知工具后，能否通过单次调用精确读取方法边界、减少 token 噪声，并在代码库导航中提升 agent 效率。  
  👉 https://github.com/google-gemini/gemini-cli/issues/22745

- **[#21968] Gemini 不会主动使用自定义 skills 和 sub-agents**（P2, 6 评论）  
  用户反馈即使配置了带详细描述的自定义 skill（如 gradle/git），模型也不会主动调用，只有显式指示才会使用。这一问题直接影响 agent 的自动化能力和扩展性。  
  👉 https://github.com/google-gemini/gemini-cli/issues/21968

- **[#26522] Auto Memory 对低信号会话无休止重试**（P2, 5 评论）  
  提取 agent 若判断某会话为低信号而跳过，该会话会反复出现在待处理索引中，导致后台任务空转。社区建议对低信号会话进行标记或隔离。  
  👉 https://github.com/google-gemini/gemini-cli/issues/26522

- **[#11802] 为遥测添加 OTLP 自定义请求头支持**（P2, 4 评论, 7 👍）  
  目前发往 OTEL Collector 的遥测数据无法携带认证头，用户无法在需要鉴权的生产环境中使用观测性能力。该问题已开放近一年，社区持续关注。  
  👉 https://github.com/google-gemini/gemini-cli/issues/11802

- **[#26525] Auto Memory 的确定性脱敏与日志精简**（P2, 4 评论）  
  当前 Auto Memory 将本地 transcript 发送到模型上下文后才执行脱敏指令，存在敏感信息泄漏风险。社区期望在发送前进行确定性脱敏，并减少相关日志输出。  
  👉 https://github.com/google-gemini/gemini-cli/issues/26525

## 4. 重要 PR 进展

以下为过去 24 小时更新的重要 PR，覆盖 bug 修复、新功能与架构改进：

- **[#28689] 修复 gaxios 嵌套流式错误解析**（新提交）  
  在流式请求中，为嵌套在 `error.cause.message` 中的 Google API 结构化错误（如限流或容量耗尽）增加健壮的解析回退机制，提升错误信息可读性。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28689

- **[#28681] 支持 SGLang 与本地 OpenAI 兼容端点**（P1, 大型 PR）  
  为 CLI 增加 SGLang 推理后端及本地 OpenAI 兼容 API 的配置支持，是社区对本地部署和模型多样性诉求的直接回应。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28681

- **[#28664] MCP 服务器扩展授权显示完整配置并加固 stdio 环境**（大型 PR）  
  修复扩展更新时仅显示部分 MCP 配置的问题，如今 `env`、`cwd`、`headers` 也会纳入用户授权确认；同时加固 stdio 方式的环境变量传递安全性。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28664

- **[#28639] 修复 formatTruncatedToolOutput 负数 maxChars 导致输出膨胀**（P1, 小型 PR）  
  当 `maxChars <= 0` 时，原先的 slice 负索引行为会导致工具输出被异常放大 2 倍；新增回归测试覆盖 0 和负数场景。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28639

- **[#28641] 修复窄终端下幽灵文本换行死循环**（P2, 小型 PR）  
  CJK 或 emoji 等宽字符在输入框可容纳宽度小于单个字符时，`getGhostTextLines` 会陷入无限循环；通过强制推进 splitIndex 终止循环。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28641

- **[#28688] 动态解析 Cloud Workstations 的 OAuth 重定向 URI**（P3, 安全相关）  
  解决在 Cloud Workstations VM 中 OAuth 流程固定回调 localhost 导致认证失败的问题，可根据环境动态解析代理地址。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28688

- **[#28672] 修复 /compress 会话重载损坏与配额回退工具响应丢失**（P2, 大型 PR）  
  两处独立修复：一是 `/compress` 或自动压缩后恢复会话失败的问题；二是遇到配额限制导致工具响应丢失，进而引发上下文损坏与模型错误续写的问题。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28672

- **[#28680] 在验证阶段拒绝 A2A OpenID Connect 认证**（安全相关）  
  此前 CLI 会接受 OpenID Connect 配置但运行时才失败；此 PR 将检查提前至验证阶段，避免用户配置后遇到静默故障。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28680

- **[#28678] 修复 OAuth 回调超时泄漏并释放资源**（安全相关）  
  集中管理 OAuth 回调服务器的结算与资源清理，防止过期超时回调和内存泄漏。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28678

- **[#28677] 为 IdeClient 进程遍历增加 3 秒超时**（P1, 小型 PR）  
  解决裸终端在 "Initializing..." 界面永久卡死的问题：进程树遍历挂起时 3 秒后回退为 no-IDE 模式，保证 TUI 可用性。  
  👉 https://github.com/google-gemini/gemini-cli/pull/28677

## 5. 功能需求趋势

从近期 Issues 与 PR 中提炼的社区核心诉求：

- **本地与自托管模型支持**：SGLang、OpenAI 兼容端点 (#28681) 等 PR 表明，社区对脱离云端 API 的本地推理需求迫切。
- **AST 感知的代码理解**：#22745、#22746 等系列 EPIC 探索通过 AST 工具提升文件读取、符号导航与代码库映射精度，旨在降低 token 消耗和提高 agent 对大型代码库的理解效率。
- **更安全的自动记忆（Auto Memory）**：多个 Issue (#26522, #26523, #26525) 关注记忆提取的可靠性、无效补丁隔离与发送前脱敏，隐私与数据安全成为核心关切。
- **Agent 自我认知与工具使用能力**：#21432（agent 应准确了解自身 CLI 参数与快捷键）、#21968（主动使用 skills）显示用户期望 agent 更智能地利用已有工具。
- **浏览器 Agent 的环境适配与配置一致性**：#21983（Wayland 支持）、#22267（settings.json 覆盖）反映了浏览器子代理在多样环境中的稳定性需求。

## 6. 开发者关注点

- **子代理状态报告不可信**（#22323、#21409）是 P1 级痛点，错误状态与无限挂起让用户对多代理协作的可靠性产生疑虑。
- **终端交互细节问题突出**：Shell 命令卡死 (#25166)、终端 resize 闪烁 (#21924)、窄宽度幽灵文本死循环 (#28641)，说明 CLI 的 TUI 稳定性和流畅度仍需打磨。
- **工具调用需更可预测**：模型创建临时脚本到随机目录 (#23571)、不经意使用破坏性命令 (#22672)，用户希望模型行为更"克制"、更安全。
- **权限模型被触发**：#22093 报告 v0.33.0 起子代理在配置禁用状态下仍被调用，权限边界问题影响到用户的信任与预期管理。
- **可观测性与诊断不足**：`/bug` 报告缺少子代理内部上下文 (#21763)、遥测缺少自定义头 (#11802)，用户希望在问题排查时拥有更多可见性。

---
*本日报由 AI 自动生成，数据来源：[github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

## DeepSeek Reasonix 社区日报 — 2026-08-05

---

### 一、今日速览

**v1.19.6 稳定版发布**，带来内置版本匹配文档、事务性回滚、更安全的子代理清理等核心改进。社区侧围绕 **Windows 更新失败、HTTP 400 请求被拒、QQ 机器人连接、以及 D-Bus 挂起**等高频问题展开密集反馈，共 29 条 Issue 更新。PR 方面，**移除 Remote Workbench 重构**和 **DashScope/MiMo 协议修复**成为当前最受关注的两大技术方向。

---

### 二、版本发布

**v1.19.6（稳定版）** — CLI 与桌面版同步发布

- **内置版本匹配文档**：无需访问远程即可查阅与当前版本对应的完整文档
- **事务性回滚**：更新失败时可安全回滚到先前版本，减少 Guard 安装目录冲突
- **更安全的子代理清理**：并行子代理结束后资源释放更彻底，降低残留进程风险
- **大量桌面与 CLI 修复**：覆盖进程折叠、会话显示、设置面板等细节

📎 [CLI v1.19.6 更新日志](https://reasonix.io/changelog/v1.19.6/) · [桌面版 v1.19.6 更新日志](https://reasonix.io/changelog/v1.19.6/)

---

### 三、社区热点 Issues（10 条）

#### 1. 🐛 [Bug] QQ 机器人频道无法连接 — `op=9 Invalid Session` 未授权 `GUILD_MESSAGES` intent
**#7512** | 状态：OPEN | 评论：10 | Windows

Windows 用户报告 `reasonix bot start --chan` 后 QQ 机器人始终无法连接，识别请求被拒绝（op=9），涉及 `GUILD_MESSAGES` 意图未授权。该题已附带完整英文排障报告，反映出 Bot 接入在 Windows 环境的授权流程存在兼容缺口。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7512

#### 2. 🐛 [Bug] deepseek-flash 返回工具调用但不含可重放思考内容（降级推理）
**#7256** | 状态：CLOSED | 评论：9 | macOS

macOS Silicon 版 1.19.3 用户多次遇到 `tool calls without replayable thinking content; continuing with degraded reasoning` 提示，意味着多轮工具调用中模型思考链无法完整保留，影响推理质量和调试可追溯性。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7256

#### 3. 🐛 [Bug] PreToolUse Bash Hook 对包含系统路径字面量的命令误报
**#7511** | 状态：OPEN | 评论：7

Hook 机制在扫描原始 Bash 命令时，会对仅包含 `/usr/bin` 等系统路径字符串的合法命令触发误报拦截。用户明确指出这不是安全 bug，而是可用性问题，建议改进命令解析以区分真实命令注入与路径字面量。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7511

#### 4. 🐛 [Bug] 更新失败 — pending update target 超出 Guard 安装目录
**#7391** | 状态：CLOSED | 评论：6 | 👍 1 | Windows

v1.19.4 用户在 Windows 上更新失败：`could not safely finish the previous update: reconcile pending update`。该问题与事务性回滚机制直接相关，开发者已在 v1.19.6 中重点修复，但社区仍需观察 Windows 侧的残留症状。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7391

#### 5. 🐛 [Bug] HTTP 400：请求体被拒绝（opencode 供应商 deepseek-v4-flash-free）
**#7520** | 状态：OPEN | 评论：6 | Windows

Windows 用户配置自定义供应商（opencode）的 `deepseek-v4-flash-free` 后，对话中模型调用工具成功一次后即报 `Malformed request (HTTP 400): the request body was rejected`。该问题在 1.19.6 上仍存在，涉及工具调用序列中请求体序列化异常。⚠️ 相似问题在 #7523、#7396 中被不同用户再次报告（#7396 为发送图片后触发），系近 48 小时最高频的 Issue 类型。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7520

#### 6. 💡 [Feature] 主模型为纯文本模型时，图片附件应自动路由给视觉子智能体
**#7381** | 状态：OPEN | 评论：5

用户场景：主模型用 deepseek（不支持视觉），已配置视觉子代理 `Image-reader`，但当前子代理委派不携带图片数据，导致无法自动读取图片。这是一个典型的多模态路由需求，社区呼声较高，预计将影响后续子代理数据管线设计。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7381

#### 7. 🐛 [Bug] v1.19.6 更新后会话锁孤儿 + 主 jsonl 0 字节致空对话
**#7521** | 状态：OPEN | 评论：4 | Windows · data-loss

用户从 v1.18.0 升级到 v1.19.6 后出现两个严重问题：任务结束后发送新命令报 `this session is locked`，且主会话 jsonl 文件为 0 字节导致历史对话全部丢失。该 Issue 由 AI 辅助整理，含本地数据目录证据，已被标记为 **data-loss**，属于高优级缺陷。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7521

#### 8. 💡 [Feature] web/game 开发工具链：内建 web 测试、截图反馈、环境探测
**#7524** | 状态：OPEN | 评论：2

社区提出代理在构建 HTML 小游戏或 Web UI 时反复遇到三个障碍：无内置 Web 测试能力、无法获取页面截图反馈、缺少环境探测工具。该建议涉及新增系统工具集，若落地将显著提升 Agent 在前端场景的自主验证能力。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7524

#### 9. 🐛 [Bug] CLI 在 D-Bus 不健康时无限挂起
**#7507** | 状态：OPEN | 评论：3 | Linux

`reasonix run --auto`、`-p` 以及交互式 TUI 在 D-Bus 异常时全部零输出无限挂起（v1.19.6 与 v1.19.4 均可复现）。根因指向启动时 bus 调用缺少超时机制。Linux 用户在日常自动化中被挂起阻塞，急需加入超时保护。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7507

#### 10. 🐛 [Bug] 创意风格下思考强度无法调整，且每次切换会话重置为 auto
**#7526** | 状态：OPEN | 评论：1 | Windows

v1.19.6 用户反馈在 "Creative" 风格下无法调节思考强度，且对话切换后思考强度设置自动回退为 `auto`，导致偏好设置无法持久。属于用户配置体验的连续性缺陷。

🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/7526

---

### 四、重要 PR 进展（10 条）

#### 1. 🔥 移除 Remote Workbench 并简化 SSH 远程访问
**#7528** | 状态：OPEN

删除了 Remote Workbench 协议、投影、Broker 及 `rpcwire` 栈（约 36k 行），改为复用 CLI/Serve 远程模型：桌面端通过 SSH 启动 `reasonix serve`，转发至 loopback 后操作。这是当前最大的架构简化 PR，将大幅降低远程功能的维护成本。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7528

#### 2. 🔥 修复 MiMo Responses API 协议对齐
**#7234** | 状态：OPEN

修复 MiMo（api.xiaomimimo.com）Responses Provider 的 summary 隔离、推理轮次往返、JSON 输出格式，使多轮工具循环与思考模式重放在该供应商下稳定工作。经过官方文档与实网 API 双重验证。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7234

#### 3. 🔥 DashScope 协议兼容性 + 补全语义修复
**#7168** | 状态：OPEN

在 `main-v2` 上，Responses Provider 完全无法与 DashScope 通信——任何使用思考模型（如 qwen3.7-plus）的对话在**第二轮**必定触发服务端 400 错误。该 PR 修复 `summary` 列表格式等协议差异，不合并则 main-v2 的 DashScope 用户无法进行多轮对话。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7168

#### 4. 本地知识缓存 + 服务端 web_search 检索系统
**#7488** | 状态：OPEN

实现 #7410 的完整检索系统：新增 `retrieve_info` 工具、本地知识缓存、护栏、编排能力及服务端 web_search 蒸馏。基于 #7466 构建，让 `systemFetch` 使用完整直连管线，解决网页搜索与知识检索的联动问题。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7488

#### 5. 会话级定时任务 — `/loop` 命令、cron 工具与 NEXT JOB 状态指示
**#7522** | 状态：OPEN

恢复 v1 Go 版本中的 `/loop` 功能并将其移植到 Go 重写版：支持固定间隔（`/loop 5m <prompt>`）、标准 5 段 cron（`/loop "0 9 * * 1-5" <prompt>`）、agent 控制延迟（`schedule_wakeup`）以及 `--forever` 无限循环模式，并在 TUI 中增加 `NEXT JOB` 状态指示器。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7522

#### 6. 保留并行子 Agent 完整结果
**#7375** | 状态：CLOSED

将每个持久化的 `parallel_tasks`/`fleet` 子 Agent 答案保存在独立 transcript 中，避免将所有完整报告拼接进单个工具结果导致截断。同时提供公平的有界预览、稳定的 `Subagent reference`，并新增只读 `read_subagent_result` 分页工具。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7375

#### 7. DeepSeek 服务端网页搜索控制
**#7466** | 状态：CLOSED

为 DeepSeek Responses API 增加 provider 执行 `web_search` 的支持：包含流式生命周期事件、无状态后续轮次的 `web_search_call` 有界重放，并在官方 DeepSeek 上默认启用服务端搜索。极大简化了网页搜索接入流程。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7466

#### 8. OpenAI 兼容流半开停滞恢复 + 容忍空 data 行
**#7374** | 状态：CLOSED

修复 OpenAI 兼容 Provider 的两个流健壮性问题：① 空闲 watchdog 将半开 TCP 丢包转化为流恢复，但存在绕过恢复路径的缺口；② 流中空 `data:` 行导致解析中断。该修复作用于 DeepSeek、MiMo、MiniMax-M3 等所有 OpenAI 兼容网关。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7374

#### 9. `reasonix serve` 切换模型后保持 ask 工具交互
**#7450** | 状态：CLOSED

解决 #6545：当 `reasonix serve` 切换模型或 effort 后，控制器重建导致交互式批准与 asker 接线失效。新增端到端回归测试，验证切换后运行 `ask` 工具 → 观察 `ask_request` → 应答 → 恢复转轮的全链路。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7450

#### 10. 在读取边界净化存储的显示标题
**#7501** | 状态：CLOSED（官方维护者合入）

修复 #5666 的剩余部分（历史/会话名称渲染为原始内部字符串），在读取边界统一净化，取代 #5718 的逐显示点修补方案。由官方维护者与社区贡献者联合完成。

🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/7501

---

### 五、功能需求趋势

结合全部 Issue 与 PR 数据，社区关注的功能方向呈现以下趋势：

| 方向 | 代表 Issue/PR | 热度 |
|------|--------------|------|
| **Provider 协议兼容性** | #7520、#7523、#7396（HTTP 400）；#7234（MiMo）；#7168（DashScope） | 🔥🔥🔥 最高 |
| **多模态路由与图片支持** | #7381（图片自动路由至视觉子代理）；#7396（发图后崩溃） | 🔥🔥🔥 |
| **自动执行与定时任务** | #7522（/loop、cron）；#7524（Web/游戏工具链） | 🔥🔥 |
| **Web 测试与前端反馈** | #7524（截图反馈、环境探测）；#7488（服务端 web_search） | 🔥🔥 |
| **MCP 协议扩展** | #7525（Content-Length 帧支持）；#7488（检索系统） | 🔥🔥 |
| **远程访问简化** | #7528（移除 Remote Workbench）；#7516（SSH 远程异常） | 🔥 |
| **语言与本地化** | #7491（俄语 UI）；#4207（zsh 补全） | 🔥 |
| **UI/UX 细节** | #7510（设置筛选）；#7509（会话置顶）；#7517（面板缩放）；#7518（进程折叠） | 🔥 |

**核心信号**：社区已不再满足于"能用"，而是向**协议深度兼容 + 多模态智能路由 + 自动化工具链**三个方向集中诉求；同时新一轮 Go 重写（main-v2）的协议层问题正密集暴露，供应商兼容性成为当前最集中的技术债务。

---

### 六、开发者关注点（高频痛点）

1. **HTTP 400 请求体被拒（最高频）** — 多个用户在不同供应商（opencode 的 deepseek-v4-flash-free、DeepSeek v4 flash）上复现，触发点均为工具调用成功一次后或发送图片后。请求体序列化在后续轮次出现异常，直接影响核心工作流，需要优先定位。

2. **更新链路脆弱** — #7391（v1.19.4 更新失败）、#7302（v1.18.0→v1.19.3 更新失败）、#7521（v1.19.6 更新后数据丢失）显示 Windows 下更新机制仍不够健壮，特别是事务性回滚与 Guard 安装目录之间的交互需要加强验证。

3. **流式连接不稳定** — TLS bad record MAC（#7143）、流停滞（#5255）、半开 TCP 丢包（#7374）在多个 provider 上出现，开发者对长时运行时的流恢复能力有更高要求。

4. **思考链可重放性缺失** — #7256 与 #7252 均报告工具调用不含可重放思考内容，导致推理降级。这在复杂多轮任务中对调试和结果可解释性影响很大，是 Go 重写版仍需补齐的场景。

5. **会话数据完整性与锁定** — #7521 的 0 字节 jsonl 与 orphan 锁是数据丢失级别的严重问题，社区强烈关注；#6545/#7450 的 ask 工具失效也暴露了控制器重建时的状态残留问题。

6. **Windows 与 Linux 平台特有的环境兼容性** — Windows 上 QQ 机器人 intent 授权（#7512）、Linux 上 D-Bus 挂起（#7507）与 4K 分辨率适配（#7288），表明跨平台打磨仍在进行中。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-05

## 今日速览

昨日发布 v1.18.13 与 v1.18.12 两个补丁版本，重点修复 TUI 中 GitHub PR 评审上下文缺失、Desktop 端 RTL 布局问题，以及 Azure GPT-5.5+ 启用 reasoning 时的请求失败。社区侧，Go 套餐用量 API 的提案（#16017）以 126 👍 持续发酵，成为近期最受关注的功能请求；同时多起 Desktop 启动故障（ECONNREFUSED、provider 加载失败）与子代理流中断丢数据的 Bug 报告，凸显稳定性和数据可靠性是当前用户的核心痛点。

## 版本发布

### v1.18.13
- **TUI**：修复 GitHub pull request 评审在上下文中缺少 PR 编号和 URL 的问题。
- **Desktop**：修复多个 RTL（从右到左）布局问题，覆盖标签页、抽屉、调整大小和标题栏交互；修复方向性图标等共享 RTL UI 行为。

### v1.18.12
- **Core**：修复 Azure GPT-5.5+ 在启用 reasoning 时完成请求失败的问题（感谢 @frederiknsgo）。
- **Desktop**：减少草稿包含大型粘贴图片或附件时的编辑器卡顿；项目搜索可匹配任意最近项目，而非仅前五个。

## 社区热点 Issues

1. **[FEATURE] 新增 Go 套餐用量/余额 API 端点（滚动/周/月窗口）**
   - **热度**：126 👍 / 29 评论，开创以来最高赞功能请求。
   - **要点**：用户希望将 Dashboard 中已有的用量信息通过公开 API 暴露，以便自动化监控与集成。
   - **链接**：https://github.com/anomalyco/opencode/issues/16017

2. **[BUG] deepseek-v4-flash 通过 opencode-go 返回 403 / 挂起，同 key 下 v4-pro 和 minimax-m3 正常**
   - **热度**：6 👍 / 6 评论。
   - **要点**：Windows 11 + OpenCode Desktop/TUI 最新版，全局配置干净仅含 $schema，API key 有效。指向 opencode-go 对新模型的路由或配额处理可能存在问题。
   - **链接**：https://github.com/anomalyco/opencode/issues/40485

3. **[BUG] Desktop app: provider/model/MCP 启动时加载失败**
   - **热度**：2 评论。
   - **要点**：组织内多名用户约 80% 启动时无法加载 provider/model/MCP 信息；确认是 v1.18.5 至 v1.18.13 的回归，v1.18.4 正常。
   - **链接**：https://github.com/anomalyco/opencode/issues/40516

4. **[BUG] Sub-agent Task 最终响应流失败时静默返回空结果（如 503）**
   - **热度**：1 评论。
   - **要点**：子代理完成工具工作后若最终响应流中断（如 "request queue is full"），父任务收到空结果且无错误、无重试，已完成的工作被静默丢弃——属于数据丢失级别的严重缺陷。
   - **链接**：https://github.com/anomalyco/opencode/issues/40527

5. **[BUG] Desktop 应用卡在 ECONNREFUSED 127.9.9.9:443 循环**
   - **热度**：2 评论。
   - **要点**：干净安装后桌面应用无法连接本地 API，持续报错。用户表示已尝试多种自动化配置仍无法解决。
   - **链接**：https://github.com/anomalyco/opencode/issues/40525

6. **[FEATURE] 可配置 macOS 上 Ctrl+D 退出确认**
   - **热度**：2 评论。
   - **要点**：用户在 Ghostty 终端中多次误触 Ctrl+D 导致意外退出，希望增加确认机制。
   - **链接**：https://github.com/anomalyco/opencode/issues/40510

7. **[BUG] Copypaste 在 Tmux + Kitty 下工作不正常**
   - **热度**：4 评论，关联 #9942。
   - **要点**：全屏 TUI 自定义复制粘贴例程与终端集成冲突，选择即复制（Copy-on-Select）失效。
   - **链接**：https://github.com/anomalyco/opencode/issues/36646

8. **[FEATURE] V2: 用 /models 端点协调 provider 目录**
   - **热度**：0 评论，由 opencode-agent 提出。
   - **要点**：V2 应动态 reconcile 各 provider 的模型目录与 /models 端点，避免静态/过期目录导致模型缺失或不可用。
   - **链接**：https://github.com/anomalyco/opencode/issues/40524

9. **[FEATURE] 点击 TUI 侧边栏 MCP 条目以切换启停**
   - **热度**：0 评论。
   - **要点**：大量 MCP 常驻占用资源，希望能在侧边栏点击快速启停，避免全部同时加载。
   - **链接**：https://github.com/anomalyco/opencode/issues/40521

10. **[FEATURE] 允许自定义 TUI 状态栏片段（模型、成本、代码改动等）**
    - **热度**：1 评论（已关闭）。
    - **要点**：目前状态栏固定不可配置，用户希望暴露配置项以按需展示信息。
    - **链接**：https://github.com/anomalyco/opencode/issues/40534

## 重要 PR 进展

1. **fix: retry empty incomplete streams**（#40535）
   - 将无终端输出的流标记为 `incomplete-stream`，仅在 Core 输出守卫确认模型尚未产生输出时重试，同时保留部分终端输出。
   - 链接：https://github.com/anomalyco/opencode/pull/40535

2. **fix(opencode): retry empty unknown responses**（#40531）
   - 检测以 unknown reason 结束且无文本/推理/工具调用的 provider 响应，改为走现有重试策略，而非静默完成空回合。
   - 链接：https://github.com/anomalyco/opencode/pull/40531

3. **[beta] some experimental perf improvements**（#40427）
   - 渲染器性能实验：初始渲染入口内存占用从 7.45 MB 降至 1.82 MB（-75.5%），最大初始模块评估序列时间大幅缩短。
   - 链接：https://github.com/anomalyco/opencode/pull/40427

4. **fix(core): use xAI device authentication**（#40538）
   - 用 RFC 8628 设备认证替换 xAI loopback OAuth，移除 PKCE/CORS/回调代码，保留 `referrer=opencode` 归因；配套更新集成测试。
   - 链接：https://github.com/anomalyco/opencode/pull/40538

5. **fix(opencode): use xAI device authentication**（#40537，与 #40538 基本同源）
   - 同样替换为设备流认证，统一 SuperGrok 订阅在本地/远程的登录方式，更新测试与文档。
   - 链接：https://github.com/anomalyco/opencode/pull/40537

6. **fix(app): finish tool call ID rename**（#40539）
   - 更新 V2 会话 reducer 以消费工具生命周期事件 `id` 字段，适配重命名的权限工具源，保持 legacy app 对外形状不变。
   - 链接：https://github.com/anomalyco/opencode/pull/40539

7. **fix(app): collapse deletion-only edit parts**（#40536）
   - 当编辑工具调用仅含删除时，即使默认展开编辑片段也保持折叠；覆盖零新增 diff 与仅含删除文件的 apply-patch。
   - 链接：https://github.com/anomalyco/opencode/pull/40536

8. **fix(core): gate durable event persistence**（#40509）
   - 新增 `persistDurableEvents` 选项；V1 app 与 HTTP runtime 默认关闭持久化，V2 独立运行时保留默认，原子 projector 与序列水位不受影响。
   - 链接：https://github.com/anomalyco/opencode/pull/40509

9. **feat(session): auto-compact stale sessions resumed after idle**（#40403）
   - 恢复空闲过久的会话时自动压缩，避免每轮重发完整前缀，解决长会话恢复的高成本问题。
   - 链接：https://github.com/anomalyco/opencode/pull/40403

10. **fix(tui): support copying over ssh with `set-clipboard on` tmux config**（#30472）
    - 修复通过 SSH + tmux 会话时复制粘贴失效的问题，关联关闭 #25253、#25252、#19982、#15907 等多个遗留 issue。
    - 链接：https://github.com/anomalyco/opencode/pull/30472

## 功能需求趋势

- **API 与可观测性**：Go 套餐用量/余额 API（#16017）获 126 👍，社区对用量可视化与自动化监控有强烈诉求。
- **TUI 定制化**：状态栏自定义（#40534）、MCP 点击启停（#40521）表明用户希望更细粒度地控制界面与资源占用。
- **模型与 Provider 兼容性**：deepseek-v4-flash 403（#40485）、Azure GPT-5.5+ reasoning 修复（v1.18.12），新模型适配速度备受关注。
- **会话管理**：auto-compact 闲置会话（#40403）直击长会话成本痛点，方向获认可。
- **认证现代化**：xAI 切换到 RFC 8628 设备流（#40537/#40538），消除 loopback OAuth 的远程使用限制。
- **性能优化**：渲染性能 -75%（#40427）的实验结果引发关注，桌面端大型粘贴卡顿修复也印证性能是持续重点。

## 开发者关注点

- **Desktop 稳定性回归**：v1.18.5–v1.18.13 的 provider/model/MCP 启动加载失败（#40516）与 ECONNREFUSED 127.9.9.9 死循环（#40525）是当前最严重的用户反馈，需要尽快定位修复。
- **流中断数据安全**：子代理流失败静默丢弃工作成果（#40527）引发对数据可靠性担忧，相关重试 PR（#40531/#40535）已在积极修复中。
- **剪贴板与复制粘贴**：Tmux/Kitty/SSH 场景的复制粘贴问题持续被报告（#36646），OSC 52 与 tmux `set-clipboard` 的兼容性修复（#30472）是社区期待已久的方案。
- **RTL 与国际化**：v1.18.13 专门修复 RTL 布局问题，反映出非 LTR 语言用户群体的活跃反馈。
- **新模型接入节奏**：deepseek-v4-flash 与 Azure GPT-5.5+ 的兼容性问题表明，用户对最新模型的支持响应速度有较高期望。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期：2026-08-05** | 数据源：github.com/QwenLM/qwen-code

---

## 今日速览

今日发布 **v0.21.5**，核心变化是为 macOS 用户提供从 Electron 桌面版迁移到 Tauri 新版壳的**可选项一次性更新桥**，并引入工具调用级的结果追踪。社区侧，PR 集中在**代码审查管线增强**（Maven 支持、成本核算、证据图像）、**安全加固**（钩子信任边界修复）以及 **CI 可观测性改进**；一个关于“CI 日志中 mock 磁盘满错误误导定位”的 Issue 已有关联修复 PR。

---

## 版本发布

### v0.21.5（最新正式版）
- **新增**：面向 macOS 用户的可选一次性更新桥，支持从 Electron 桌面应用迁移到新的 Tauri shell（[#8392](https://github.com/QwenLM/qwen-code/pull/8392)）。
- **新增**：工具调用的**执行级结果追踪**，可在细粒度上记录每次工具调用的执行结果。
- **修复**：Web Shell 表格对话框相关问题（同时收录于 nightly）。

### v0.21.4-nightly.20260804.d6f55a1c9
- 包含桌面端 Electron→Tauri 迁移桥及 Web Shell 表格对话框修复。

---

## 社区热点 Issues

> 本期 GitHub 上更新活跃的 Issue 仅有 2 条，均已列出并关联到对应 PR 进展。

### 1. [#8532](https://github.com/QwenLM/qwen-code/issues/8532)【OPEN】CI 日志让 mock 磁盘满测试错误看起来像 runner ENOSPC
- **作者/时间**：@yiliang114 / 创建 2026-08-04，更新同日
- **数据**：评论 4 · 👍 0 · 类型：bug / testing / ci-cd
- **摘要**：多个 CI job 在 runner 磁盘充足时，仍输出生产环境风格的 “disk full” 错误。原因是有单元测试刻意 `throw new Error('disk full')`，生产代码捕获并写入 stderr，导致共享日志中误判为 runner 磁盘耗尽。
- **为什么重要**：这类噪声会严重干扰 CI 排障，让维护者把时间浪费在检查 runner 磁盘而非真正的测试失败上。
- **社区反应**：已有 4 条评论讨论了处理方案；关联 PR [#8549](https://github.com/QwenLM/qwen-code/pull/8549) 正在修复，通过在测试内捕获并断言预期错误输出，避免污染共享日志。

### 2. [#7167](https://github.com/QwenLM/qwen-code/issues/7167)【OPEN】Fleet Shepherd Dashboard 状态页
- **作者/时间**：@qwen-code-dev-bot / 创建 2026-07-18，更新 2026-08-05
- **数据**：评论 3 · 👍 0 · 类型：自动化维护 / CI/CD
- **摘要**：由 Fleet Shepherd 工作流自动维护的 PR 同步状态仪表盘，记录各 PR 在此 tick 中的调度、同步与分发动作，最后心跳：`2026-08-05T00:07:48Z`。
- **为什么重要**：反映了项目内部的自动化 CI 治理机制，让 PR 派发、同步和存活状态透明可追踪。

---

## 重要 PR 进展

> 过去 24 小时共更新 50 个 PR。以下按“功能 / 安全 / 性能 / 体验”挑选 10 个进行说明。

### 🔧 功能增强

#### 1. [#8392](https://github.com/QwenLM/qwen-code/pull/8392) feat(desktop): Electron 用户迁移到 Tauri 的更新桥
- **作者**：@yiliang114 | 状态：OPEN
- **要点**：为 macOS 用户提供一次性、显式 opt-in 的更新桥，将既有 Electron 桌面应用平滑迁移到新的 Tauri shell。这是 v0.21.5 的核心特性。

#### 2. [#8416](https://github.com/QwenLM/qwen-code/pull/8416) feat(review): 构建/测试范围支持 Maven 多模块，并加载 CLAUDE.md 规则
- **作者**：@wenshao | 状态：OPEN
- **要点**：让 `/review` 能力支持 Maven 多模块仓库：按变更文件映射到对应 Maven 模块执行构建测试，同时读取 `CLAUDE.md` 作为仓库级规则，补齐了 npm workspace 之外的生态。

#### 3. [#8388](https://github.com/QwenLM/qwen-code/pull/8388) feat(review): capture-tui——用像素验证渲染 claim（Phase 2）
- **作者**：@wenshao | 状态：OPEN
- **要点**：实现 `qwen review capture-tui`，在私有 tmux server 中驱动被审查代码并捕获终端画面，让“面板在 80 列处被裁剪”这类渲染问题从“文字描述”变为“图像证据”，提升 review 的客观性。

#### 4. [#8274](https://github.com/QwenLM/qwen-code/pull/8274) feat: 支持从任意会话消息分叉（fork）
- **作者**：@water-in-stone | 状态：OPEN
- **要点**：将分叉点从“当前活动会话状态”改为“任意一条 Assistant 消息”，解决工具调用、取消、元数据记录等因素导致的分叉不可靠问题。

### 🛡️ 安全修复

#### 5. [#8396](https://github.com/QwenLM/qwen-code/pull/8396) fix(hooks): 关闭钩子执行的 4 个信任边界漏洞
- **作者**：@wenshao | 状态：OPEN
- **要点**：修复仓库配置与代码执行/网络出口交界处的安全洞：
  - HTTP hooks 不再跟随重定向（此前 URL 白名单和 DNS SSRF 检查可被绕过）；
  - 另包含 3 项未公开细节的信任边界加固。

### ⚡ 性能与 CI 优化

#### 6. [#8548](https://github.com/QwenLM/qwen-code/pull/8548) perf(autofix): review 阶段 CLI bundle 只构建一次，分发给各并行任务
- **作者**：@wenshao | 状态：OPEN
- **要点**：此前每个 PR 的 review-address 分支都会重复执行 `npm ci + build + bundle`，现改为上游 `build-cli` job 只做一次可信构建，并行分支直接复用产物，显著降低大规模审查时的 CI 资源占用。

#### 7. [#8471](https://github.com/QwenLM/qwen-code/pull/8471) feat(review): 基于磁盘记录生成成本账本
- **作者**：@wenshao | 状态：OPEN
- **要点**：从已有记录生成 review 的成本账本（如某 PR 高 effort 审查消耗 523 次模型调用 / 37.8M input tokens），解决“0.21.3 正常、0.21.4 变慢”这类回归调查需要数小时手工聚合数据的问题。

#### 8. [#8474](https://github.com/QwenLM/qwen-code/pull/8474) fix(ci): 取消后清理 review worktrees
- **作者**：@yiliang114 | 状态：OPEN
- **要点**：在 PR review job 中增加 always-run 清理步骤，同时扩展 CI 预检出清理，移除复用 runner 上的陈旧 worktree 注册和 qwen-review 分支，避免被取消/超时的任务污染后续构建。

### 💻 终端与 Web 体验

#### 9. [#8439](https://github.com/QwenLM/qwen-code/pull/8439) feat(cli): VP 模式下恢复 Ctrl+click 超链接与右键菜单
- **作者**：@chiga0 | 状态：OPEN
- **要点**：VP 模式启用 SGR 鼠标追踪后，终端超链接点击和右键菜单失效。此 PR 在保持鼠标事件透传的同时，恢复这两项原生终端能力。

#### 10. [#8445](https://github.com/QwenLM/qwen-code/pull/8445) fix(web-shell): 允许会话刷新走 daemon 认证
- **作者**：@BZ-D | 状态：OPEN
- **要点**：允许精确的 Web Shell 会话文档导航在 bearer 认证前加载公共 HTML 壳，同时保持非文档请求和 API 子路径的既有认证门槛不受影响，并补充了 GET/HEAD 文档导航的回归测试。

---

## 功能需求趋势

从最近 24 小时的 Issue/PR 来看，社区最热的三个方向是：

1. **代码审查链路的企业化与规模化**
   - Maven 多模块支持（[#8416](https://github.com/QwenLM/qwen-code/pull/8416)）、仓库上下文清单（[#8401](https://github.com/QwenLM/qwen-code/pull/8401)）、成本核算（[#8471](https://github.com/QwenLM/qwen-code/pull/8471)）、证据图像（[#8388](https://github.com/QwenLM/qwen-code/pull/8388)）等 PR 说明：community 正在把 `/review` 从“个人助手”往“团队级审查基础设施”推进。

2. **桌面端现代化路径**
   - Electron→Tauri 迁移桥（[#8392](https://github.com/QwenLM/qwen-code/pull/8392)）与 Web Shell 的认证/会话体验（[#8445](https://github.com/QwenLM/qwen-code/pull/8445)、[#8457](https://github.com/QwenLM/qwen-code/pull/8457)）同步进行，显示客户端 UI 体系正经历一次整体换代。

3. **CI 可观测性与可靠性**
   - mock 磁盘错误污染日志（[#8532](https://github.com/QwenLM/qwen-code/issues/8532)）、worktree 清理（[#8474](https://github.com/QwenLM/qwen-code/pull/8474)）、bundle 构建复用（[#8548](https://github.com/QwenLM/qwen-code/pull/8548)）等，都指向同一个诉求：**让 CI 的每一分钟都花在真正值得排查的问题上**。

---

## 开发者关注点

以下高频痛点在今日数据中被多次提及：

- **CI 日志噪声误导排障**：mock 的磁盘满错误被误认为 runner 真实故障（[#8532](https://github.com/QwenLM/qwen-code/issues/8532)），开发者希望在测试中捕获并断言这类预期日志，而不是让它们流进共享 CI 输出。
- **大型 PR 审查成本不可见**：一次高 effort 审查可能消耗 523 次模型调用，若无成本账本，性能回归很难定位（[#8471](https://github.com/QwenLM/qwen-code/pull/8471)），社区需要“先计价、再审查”的透明机制。
- **可复用 runner 的状态残留**：被取消的 review 任务会在复用 runner 上留下陈旧分支和 worktree，影响后续构建（[#8474](https://github.com/QwenLM/qwen-code/pull/8474)）。
- **终端交互细节的回归**：VP 模式吞掉超链接点击和右键菜单（[#8439](https://github.com/QwenLM/qwen-code/pull/8439)）、ESC 无法及时取消响应（[#8353](https://github.com/QwenLM/qwen-code/pull/8353)）、退出后 resume 提示不可见（[#8455](https://github.com/QwenLM/qwen-code/pull/8455)）——说明用户对 CLI 的“原生终端手感”仍有很高要求。

---

*以上为 2026-08-05 的 Qwen Code 社区动态摘要，数据截至当日 Pull Requests/Issues 更新窗口。*

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报 — 2026-08-05

## 今日速览
过去 24 小时无新版本发布，开发重心集中在 bug 修复与社区基建：两个 **P0 级缓存作用域修复 PR** 浮出水面，旨在终止跨会话提示词缓存串用；**cron 生命周期守卫（lifecycle_guard）** 成为高频问题区，新增 3 个相关 bug 报告；同时，插件接口扩展的长期规划 (#64182) 保持高热讨论，Hindsight/Telegram/Feishu 等平台适配问题也持续涌入。

---

## 社区热点 Issues（10 个）

**1. 插件接口扩展 — 社区创意跟踪**
[#64182](https://github.com/NousResearch/hermes-agent/issues/64182) · P3 · 20 评论
7 月 Discord 社区讨论沉淀的插件接口扩展参考计划，目标是让长期排队 PR 拥有稳定的发布路径。作为社区级 roadmap，值得关注后续拆分出的具体接口提案。

**2. 可配置的有界 auto-continue**
[#16004](https://github.com/NousResearch/hermes-agent/issues/16004) · P2 · 9 评论
当工具调用迭代预算耗尽时，Hermes 会停止执行并请求模型生成摘要。在 ACP/VS Code 和长连接网关会话中，这种机制会阻塞正常自治工作。社区希望引入"有界自动继续"配置，避免人工介入。

**3. Telegram 功能对齐战役（Bot API 10.2）**
[#78791](https://github.com/NousResearch/hermes-agent/issues/78791) · P3 · 4 评论
Meta-issue，计划将 Hermes 的 Telegram 适配层与官方 Bot API 10.2 全面对齐。所有 Telegram 相关 issue、子任务和 PR 均被串入此跟踪，适合作为外部贡献入口。

**4. 自定义 vision provider 解析崩溃**
[#44349](https://github.com/NousResearch/hermes-agent/issues/44349) · P2 · 3 评论
配置 `auxiliary.vision.provider="custom:xxx"` 且名称撞上内置 provider 时，解析会折叠为裸内置名称，导致自定义 `custom_providers` 配置被忽略，引发 401。涉及配置优先级判断。

**5. OpenCode Go gpt-5.6-luna 流式中断误判**
[#75801](https://github.com/NousResearch/hermes-agent/issues/75801) · P2 · 2 评论
两个叠加 bug：Luna 模型正常结束 SSE 但不带 `finish_reason`，被误判为"网络中断"进而产生 4 次虚假续接；桌面端随后又剥离了流式答案。直接影响使用该模型的桌面用户。

**6. 自定义 vision provider + base_url 丢失 api_key**
[#76602](https://github.com/NousResearch/hermes-agent/issues/76602) · P2 · 2 评论
在 `providers:` 中定义自定义 provider 并显式设置 `base_url` 后，辅助视觉任务发送的请求将 api_key 降级为 `'no-key-required'`，导致 401。与 #44349 同属自定义 provider 配置链路问题。

**7. Quickstart 文档将 Portal 描述为"免费"**
[#78254](https://github.com/NousResearch/hermes-agent/issues/78254) · P3 · 3 评论
快速开始页面称 Nous Portal 为免费路径，但 Portal 页面显示需要订阅。文档与实现不一致，已有一对一修复 PR 提交（见 PR 部分）。

**8. Cron 任务在推理模型非流式调用中超时**
[#78862](https://github.com/NousResearch/hermes-agent/issues/78862) · P2 · 1 评论
使用 `deepseek-v4-flash` 等推理模型的 cron 任务，在非流式调用挂起 600 秒时被调度器 `TimeoutError` 杀死。问题在于 600 秒推理下限与 600 秒 cron 不活动限制竞态，且兜底 provider 永远不会触发。

**9. Cron lifecycle guard 对 `~/...` 路径误报**
[#78980](https://github.com/NousResearch/hermes-agent/issues/78980) · P2 · 0 评论
`cron/lifecycle_guard.py` 在解析包含 `~/...` 字面量的 Python 脚本时会产生误报，阻止合法的 `--no-agent` 脚本 cron 任务创建。今日新增，影响面较大。

**10. lifecycle_guard 在 HOME 不可解析时崩溃**
[#78974](https://github.com/NousResearch/hermes-agent/issues/78974) · P2 · 0 评论
`lifecycle_guard` 预命令扫描在 `$HOME` 无法解析时抛出 `RuntimeError`，直接拖垮整个 `terminal` 工具。问题位于 #77780 的 try/except 保护之外，属于防御性修复盲区。

---

## 重要 PR 进展（10 个）

**1. [P0] fix(cache): 按会话作用域限定 prompt_cache_key**
[#78959](https://github.com/NousResearch/hermes-agent/pull/78959)
修复 #78941：`prompt_cache_key` 原先仅由系统指令+工具 schema 的静态前缀生成，不同用户/项目只要系统提示相同就会共享缓存桶。本次将 session/tenant 维度加入 key 计算，杜绝跨会话缓存串用。

**2. [P0] fix(agent): 为 prompt_cache_key 增加逻辑会话隔离**
[#78956](https://github.com/NousResearch/hermes-agent/pull/78956)
与 #78959 同主题的并行修复，采用 `hash(logical_scope + "\0" + static_prefix)` 形式。PR 作者注明这是 route 级加固与碰撞防护，并非已验证的缓存命中优化，两个 P0 并存值得社区注意。

**3. [P1] fix(cron): 每次 cron 会话前清除 HERMES_KANBAN_* 环境变量**
[#78961](https://github.com/NousResearch/hermes-agent/pull/78961)
Cron 触发的 agent 会话与 kanban 调度 worker 同驻一个网关进程，调度器设置的环境变量会泄漏进 cron 会话，导致 cron agent 被误判为 kanban worker（强制加入 kanban 工具集）。该修复阻断这一跨组件污染。

**4. fix(plugins): 为无 scheme 的 Hindsight api_url 自动补全**
[#78979](https://github.com/NousResearch/hermes-agent/pull/78979)
修复 #78967：`api_url` 缺少 `http://` 前缀时，所有 `hindsight_*` 工具以晦涩的 URL 错误失败，而 `hermes memory status` 仍显示正常。修复在 HTTP 层前自动添加 scheme，提升错误可诊断性。

**5. fix(gateway): 每个 profile 仅允许一次 /update**
[#78977](https://github.com/NousResearch/hermes-agent/pull/78977)
重做 #15539 的修复，针对当前 main 分支代码，解决了"同一 profile 可被并发多次 /update 导致覆盖"的竞态问题，并补上此前评审中指出的三个缺陷。

**6. fix(tui): 关闭 profile 持有的 SessionDB 句柄**
[#78970](https://github.com/NousResearch/hermes-agent/pull/78970)
修复 dashboard/TUI 网关的文件描述符泄漏：每个非启动 profile 的会话都会创建独立 `SessionDB`，但 `AIAgent.close()` 故意不关闭它。长期运行将导致 FD 耗尽。

**7. fix(dashboard): 恢复聊天黑屏视口**
[#78973](https://github.com/NousResearch/hermes-agent/pull/78973)
修复三处 dashboard 渲染问题：路由返回聊天页后 xterm 视口不刷新、后台标签页恢复时指标与视口不更新、WebGL 上下文丢失后 fallback 渲染器保持黑屏。

**8. fix(aux): 不向自定义端点发送主模型**
[#78978](https://github.com/NousResearch/hermes-agent/pull/78978)
修复 #78948：`resolve_provider_client()` 将主 provider 的模型 slug 与调用方提供的自定义端点配对。当 `fallback_providers` 指向本地 OpenAI 兼容服务时，辅助任务（如标题生成）会向错误端点发送错误模型。

**9. fix(terminal): 远程脚本读取回退中防护 NUL 字节**
[#78971](https://github.com/NousResearch/hermes-agent/pull/78971)
`_read_script_in_env` 的远程 `cat` 回退在遇到 ELF/Mach-O 二进制时会返回 NUL 填充的原始内容，导致递归守卫将机器码 token 化并送入 `os.open` 触发 `ValueError`。该修复是 #76762 的补充。

**10. test: 让 Windows 测试套件可运行**
[#74300](https://github.com/NousResearch/hermes-agent/pull/74300)
Windows 环境中有 50+ 测试因依赖 Linux/macOS 原语（`SIGKILL`、`pwd`、`fcntl`、`pty` 等）而失败。该 PR 通过跳过 POSIX-only 测试并新增平台辅助函数，打通 Windows 下的 CI/开发测试链路。

---

## 功能需求趋势

- **插件接口扩展成主线规划**：#64182 将 Discord 社区创意固化为参考计划，目标是让长期积压的 PR 可以稳定合并。Telegram 对齐战役 (#78791) 是首个被纳入的大型平台适配工程。
- **自定义 provider 配置的健壮性**：连续出现 `custom:` 前缀解析崩溃 (#44349)、自定义 provider 丢 api_key (#76602)、Hindsight api_url 无 scheme (#78967) 等问题，说明社区自建模型网关/中转的需求激增，配置链路急需硬化。
- **Cron / 批处理可靠性**：生命周期守卫误报 (#78980)、HOME 解析崩溃 (#78974)、推理模型超时竞态 (#78862)、Feishu 投递参数错误 (#78975) 密集出现，cron 功能已成为当前最活跃的 bug 聚集地。
- **桌面端体验修复**：流式中断误判 (#75801)、文件夹附件覆盖 (#78847)、黑屏视口 (#78973) 表明 Electron/TUI 客户端正进入精细化打磨阶段。
- **文档一致性**：#78254 文档矛盾在 24 小时内被提出并立即得到 PR 修复 (#78969)，社区对文档质量的反馈速度明显加快。

---

## 开发者关注点

1. **配置被环境变量"静默覆盖"**：邮件平台在 `EMAIL_*` 环境变量存在时，会无视 `platforms.email.enabled: false` 强制启用（PR #78857）。类似地，kanban 环境变量泄漏进 cron 会话 (#78961)。开发者对"隐藏的配置优先级"感到沮丧，希望增加警告与显式开关。
2. **路径与 scheme 解析的"猪队友"错误**：`~/` 字面量误报、`$HOME` 不可解析导致整个 terminal 工具崩溃 (#78974)、Hindsight `host:port` 无 scheme 却报出不可读错误——这类低级解析问题消耗了大量排查时间，开发者呼吁加入防御性校验与友好报错。
3. **辅助任务（aux）的模型/鉴权混乱**：主模型被错误发送到自定义端点 (#78978)、Anthropic 缓存 token 在记账中丢失 (#78963)、vision 自定义 provider 的 api_key 降级——aux 请求链路需要一次系统性的配置上下文梳理。
4. **缓存与计费的正确性**：两个 P0 PR (#78959 / #78956) 同时修复 prompt_cache_key 的跨会话污染，说明开发者对"缓存串会话"可能引发的隐私/数据泄漏高度敏感。
5. **测试基础设施可持续性**：Windows 测试套件修复 PR (#74300) 虽为非紧急改动，但 50+ 测试无法运行意味着大量 PR 在 Windows 平台处于"盲飞"状态，社区对跨平台 CI 覆盖的呼声渐高。

</details>

</div>
