# AI CLI 工具社区动态日报 2026-07-22

> 生成时间: 2026-07-22 00:35 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-07-22）

> 本报告基于七个主流 AI CLI 工具的 2026-07-22 社区动态摘要，从生态态势、活跃度、共性需求、差异化定位、社区成熟度及趋势信号六个维度展开，为技术决策者与开发者提供全景式参考。

---

## 1. 生态全景

AI CLI 工具正从“单次编码助手”向“全周期开发环境”加速演进，围绕 Agent 可靠性、多工具协作（MCP）与跨平台支撑展开密集迭代。2026-07-22 各工具合计发布至少 4 个新版本（Claude Code v2.1.217、OpenAI Codex v0.145.0、DeepSeek Reasonix v1.17.17、Qwen Code v0.20.1），反映了生产级应用的快速迭代压力。社区层面，**付费墙与模型资格争议**（Claude Code Fable 5）、**Windows 稳定性**（OpenAI Codex、DeepSeek Reasonix、Hermes）、**子 Agent 信任危机**（Gemini CLI 假成功报告）成为跨工具高频议题，用户对透明度、数据安全和可审计性的要求正推动工具向更稳健、更可控的方向重构。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues（个） | 今日重要 PR（个） | 今日新版本 | 社区讨论烈度 |
| --- | --- | --- | --- | --- |
| **Claude Code** | 10（含41评论/36👍 的 GitHub Connector Bug） | 10 | v2.1.217 | 🔥🔥🔥🔥🔥（高赞高评论，付费墙争议引爆） |
| **OpenAI Codex** | 10（含63评论/70👍 的 Windows 卡顿，99👍 审计丢失） | 10 | v0.145.0 | 🔥🔥🔥🔥🔥（赞数最高，问题覆盖面广） |
| **Gemini CLI** | 10（以内部评论为主，外部 👍 数偏低） | 10 | v0.52.0-nightly | 🔥🔥🔥（官方驱动导向，外部声音有限） |
| **DeepSeek Reasonix** | 10（MCP 全面失败、数据丢失等严重回归） | 10 | v1.17.17 | 🔥🔥🔥🔥（版本冲撞密集，社区回复踊跃） |
| **OpenCode** | 10（Memory Megathread 118评论/90👍，布局争议） | 10 | 无新发布 | 🔥🔥🔥🔥🔥（单帖讨论深度最高） |
| **Qwen Code** | 10（多为内部贡献者讨论，社区点赞低） | 10 | v0.20.1 | 🔥🔥（团队主导，外围参与度一般） |
| **Hermes** | 5（系统提示误触等 P0 级逻辑 Bug） | 10 | 无 | 🔥🔥（规模最小但设计新颖，成长中） |

*注：热点 Issues/PR 取自各日报“社区热点”与“重要 PR”栏目，仅代表当日高关注度条目，非全量仓库数据。*

---

## 3. 共同关注的功能方向

### 3.1 跨平台稳定性（尤其是 Windows）
**涉及工具**：Claude Code、OpenAI Codex、DeepSeek Reasonix、Qwen Code、Hermes、OpenCode  
**具体诉求**：
- Windows 安装卡死、沙箱进程残留、编码兼容（UTF-8 vs cp1252）、UI 卡死、TUI 冻结  
- 变通修复频繁（Hermes 三周内三次 Git 探测死锁修复），表明平台缺口仍是老大难。

### 3.2 MCP 协议集成与可靠性
**涉及工具**：Claude Code、Gemini CLI、DeepSeek Reasonix、OpenCode、Qwen Code、Hermes  
**具体诉求**：
- MCP Server 安装失败、路径解析错误、权限配置误伤（Gemini `tools.core` wildcard deny）、Sampling 支持请求、授权机制简化  
- MCP 正从“可选插件”升级为工具间互操作的必选项。

### 3.3 子 Agent 与并行任务生命周期管理
**涉及工具**：OpenAI Codex（磁盘占用）、Gemini CLI（假成功报告、挂起）、DeepSeek Reasonix（优雅取消）、Qwen Code（Headless Fork 选择）  
**具体诉求**：
- 子 Agent 中断后状态误报、无限挂起、粗暴杀死；需要可预测的取消策略和准确的完成报告。

### 3.4 数据持久化、审计与透明性
**涉及工具**：Claude Code、OpenAI Codex、DeepSeek Reasonix、Hermes  
**具体诉求**：
- 会话转录静默清理、审计线索丢失、迁移后数据覆写、长线程顺序错乱（渲染层）  
- 用户对“无通知变更”的容忍降至低点，要求数据保留策略选项与恢复路径。

### 3.5 付费墙与模型资格一致性
**涉及工具**：Claude Code（Fable 5 降级、token scope 缺陷）、OpenCode（付费模型 401 AuthError）  
**具体诉求**：
- 模型上线首日即被降级、认证 scope 不包含 entitlements 导致付费墙误触发  
- 订阅系统与 API 认证体系脱节，直接影响用户信任。

### 3.6 长上下文压缩与预警校准
**涉及工具**：Claude Code（1M 上下文压缩过早触发）、OpenAI Codex（分页上下文加载）、Hermes（压缩死亡螺旋）、Qwen Code（工具输出预算）  
**具体诉求**：
- 压缩阈值仍按旧模型（200K）校准，导致高配用户频繁被干扰；无限重试循环消耗大量 token。

---

## 4. 差异化定位分析

| 维度 | Claude Code | OpenAI Codex | Gemini CLI | DeepSeek Reasonix | OpenCode | Qwen Code | Hermes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **所属生态** | Anthropic 自家模型 | Microsoft/OpenAI 生态 | Google 生态 | DeepSeek 模型（中国） | 独立开源社区 | 阿里通义（QWen） | NousResearch（开源） |
| **核心优势** | 模型能力最强，Hookify 插件系统成熟，GitHub 深度集成 | 沙箱隔离稳健，跨工具导入（Cursor/Claude Code），平台粘性强 | 组件级评估体系严谨，安全加固（GHSA 修复） | 迭代快，远程工作台，功能激进（MCP 授权简化） | 开源社区活跃，MCP+ Copilot 统一接入 | Daemon 模式持久化，Java SDK 企业级集成 | 行为分析（/behavior），跨端统一主题 SDK |
| **主要短板** | 付费墙争议，服务器端静默实验，回归频发 | Windows 稳定性差距，子 Agent 资源失控，审计丢失 | 社区参与度低，外部反馈融入慢 | 质量波动大（数据丢失、MCP 断裂），更新机制不稳定 | UI 布局变革反弹大，Web 端功能滞后 | 外部贡献薄弱，文档/代码同步滞后 | 规模小，长会话可靠性不足，国际化显示缺陷 |
| **目标用户画像** | 深度绑定 Anthropic 模型的开发者，追求最强模型效果 | 倾向微软/OpenAI 生态的团队，重视沙箱与合规 | 内部方法论驱动的团队，对评估体系有高要求 | 尝鲜新功能、不介意版本起伏的早期用户 | 重视开源定制、跨 provider 的开发者 | 企业级 Java 与本地模型用户 | 对 Agent 行为洞察和个性主题有偏好的独立开发者 |

---

## 5. 社区热度与成熟度

- **第一梯队（极高热度 + 高强度反馈）**：**Claude Code** 与 **OpenAI Codex**。两者单日热点 Issues 均获得数十到上百的点赞与评论，付费墙、Windows 卡顿、数据丢失等议题引发广泛共鸣。两个工具均处于“用户预期与现实差距快速放大”的阶段，Bug 回归和静默变更正持续侵蚀信任，但社区参与也倒逼官方加速改进。

- **第二梯队（活跃争议与快速迭代）**：**DeepSeek Reasonix** 与 **OpenCode**。DeepSeek Reasonix 版本密度极高（v1.17.x），但 MCP 全面失败与数据丢失等严重问题暴露了测试覆盖短板；OpenCode 单条 Megathread 118 条评论，布局争议支撑了相当热度，但功能面仍处于“社区倒推路线”阶段，成熟度尚在爬升。

- **第三梯队（官方驱动，外部音量较低）**：**Gemini CLI** 与 **Qwen Code**。两者 Issue 多起自内部/核心贡献者，外部用户反馈广度有限。Gemini CLI 虽然标有 `priority/p1`，但社区点赞量和自发讨论明显低于前几者；Qwen Code 依赖团队推进，外部 PR 参与度弱。

- **潜力组（规模小但设计新）**：**Hermes**。行为分析（5 轴评分）与跨端主题 SDK 思路新颖，但用户基数小，长会话可靠性仍需验证。若解决基础稳定性，有望在细分场景获得早期拥趸。

---

## 6. 值得关注的趋势信号

### 6.1 MCP 正成为事实标准，跨工具兼容性决定选型天花板
七款工具中有六款在今日动态中出现 MCP 相关 Issue 或 PR。MCP 不仅是工具调用协议，更是未来多 Agent 协作与工具链互通的基座。**选型时应优先考察目标工具的 MCP 兼容深度**（Sampling、授权、相对路径、加密审计）。

### 6.2 Windows 支持不再只是选项，而是准入门槛
今日多个工具同时出现 Windows 安装、卡顿、进程残留等议题。Windows 开发者市场庞大，**若工具不能提供与 macOS 一致的体验，将直接丧失大量企业用户**（尤其是政府、金融和教育场景）。

### 6.3 用户对“静默行为”零容忍，透明度成信任基石
Claude Code 静默清理会话、静默自更新、静默移除功能；DeepSeek Reasonix 静默降级；OpenAI Codex 加密导致审计丢失——用户反复表达“无通知、无确认、不可回退”的强烈不满。**工具应把变更通知和 opt‑in 机制作为默认要求**，而非事后补充。

### 6.4 子 Agent 的“诚实失败”比成功更重要
Gemini CLI 的 MAX_TURNS 被报告为 GOAL 成功、Hermes 系统提示误当作新请求导致任务放弃，都表明当前 Agent 框架在状态传递上存在系统性缺陷。**开发者应关注工具是否提供精确的中断原因链和可审计的 Agent 决策日志**，否则自动化工作流将成为“黑箱”。

### 6.5 远程开发（Remote Workbench / Daemon）成为刚需
DeepSeek Reasonix 合并 Remote Workbench、Qwen Code 强化 Daemon 模式与 SSE 恢复、OpenAI Codex 的分页历史和后端子进程解耦——远程、持久、热重载能力正从“锦上添花”变为企业部署的必需。**选型时需评估工具是否支持 SSH/Container/后台守护场景，以及断线恢复的可靠等级**。

### 6.6 模型资格与付费系统的脱节将引发更广泛的信用危机
Claude Code 的 Fable 5 事件是典型：模型已在 Max 计划中，但 token scope 设计与 entitlements 查询分离，导致用户付费却享受不到承诺服务。随着各厂商推出分级订阅，**认证系统的弹性和审计能力的完善度，将成为用户长期留存的关键变量**。

---

*数据截至 2026-07-22 各项目社区公开信息；部分定性结论基于跨仓库对比与行业经验，供决策参考。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

好的，这是基于 `anthropics/skills` 仓库数据分析的社区热点报告。

---

## Claude Code Skills 社区热点报告（数据截止 2026-07-22）

### 1. 热门 Skills 排行（Top 7）

基于关联 Issue 讨论热度、交叉引用数及主题普遍性，以下是最受关注的 PR 动态：

1.  **`run_eval.py` 召回率修复与 Windows 兼容性（PR #1298 / #1323 / #1099 / #1050）**
    - **功能**：修复核心评估脚本 `run_eval.py` 始终报告 `recall=0%` 的严重 Bug，并系统性解决 Windows 平台子进程调用（PATHEXT）、编码（cp1252）等兼容性问题。
    - **社区热点**：**当前社区开发者的最大痛点**。Issue #556（12 条讨论，10+ 次独立复现）指出评估管线失效直接导致描述优化循环变为噪声。多个贡献者从不同角度提交修复，体现了社区对工具链稳定性的迫切需求。
    - **状态**：Open
    - **链接**：[PR #1298](https://github.com/anthropics/skills/pull/1298)

2.  **`self-audit` 推理质量门禁（PR #1367）**
    - **功能**：交付前执行机械文件验证与四维度推理审计，按损伤严重性优先级排序，通用干所有项目。
    - **社区热点**：代表社区对 **Agent 输出质量控制** 的前沿探索。作者在 Issue #1385 进一步提出完整的三阶段管线（前置校准→对抗审查→交付验证），引发了关于通用质量门禁设计标准的讨论。
    - **状态**：Open
    - **链接**：[PR #1367](https://github.com/anthropics/skills/pull/1367)

3.  **`testing-patterns` 测试模式（PR #723）**
    - **功能**：系统化标准化 Testing Trophy 模型，覆盖 AAA 单元测试、React Testing Library、E2E 测试及测试哲学。
    - **社区热点**：**开发者社区最刚需的纵深技能之一**。该 PR 旨在将 Claude Code 的测试生成行为从“随机发挥”转为“遵循既定模式”，提升 AI 辅助开发的可靠性。
    - **状态**：Open
    - **链接**：[PR #723](https://github.com/anthropics/skills/pull/723)

4.  **`document-typography` 文档排版（PR #514）**
    - **功能**：修复 AI 生成文档中的孤字/孤行（1-6 词语残留下行）、标题滞留页底、编号错位等排版通病。
    - **社区热点**：**输出“最后一公里”质量优化的典型案例**。用户普遍认为排版瑕疵是阻碍交付的直接原因，该 Skill 直击痛点，社区讨论高度集中在其对提升文档专业度的直接效果。
    - **状态**：Open
    - **链接**：[PR #514](https://github.com/anthropics/skills/pull/514)

5.  **`color-expert` 色彩专家（PR #1302）**
    - **功能**：深度集成 ISCC-NBS、Munsell、OKLCH/OKLAB 等专业色彩系统及 “何时用何色彩空间” 的决策指南。
    - **社区热点**：展示了**注入硬核学术领域知识**的高阶玩法。社区对深度垂直、具备明确规则边界（如 RAL、CSS Named、XKCD 色彩表）的专家级 Skill 反响强烈。
    - **状态**：Open
    - **链接**：[PR #1302](https://github.com/anthropics/skills/pull/1302)

6.  **`pyxel` 复古游戏开发（PR #525）**
    - **功能**：集成 Pyxel MCP 服务器，构建设计→编写→运行截图→反馈迭代的闭环开发工作流。
    - **社区热点**：**MCP 生态与 Skill 深度绑定的样板级技能**。展示了 Skill 如何作为桥梁，将外部专业工具链无缝接入 Claude Code 执行流。
    - **状态**：Open
    - **链接**：[PR #525](https://github.com/anthropics/skills/pull/525)

7.  **`odt` 开放文档格式支持（PR #486）**
    - **功能**：支持创建、填充、读取和转换 ODT/ODS（OpenDocument 标准）文件。
    - **社区热点**：**办公生态补全需求**。填补了生态系统对 ISO 标准、开源办公套件（如 LibreOffice）格式支持的空白，办公场景及政府/企业用户高度关注。
    - **状态**：Open
    - **链接**：[PR #486](https://github.com/anthropics/skills/pull/486)

---

### 2. 社区需求趋势（Issues 分析）

1.  **安全信任治理（#492, #1175）**：**社区最集火的议题**（Issue #492，43 条评论）。用户要求建立清晰的社区 Skill 信任边界，避免滥用 `anthropic/` 命名空间伪装官方技能。企业级用户担心在 SKILL.md 中暴露权限逻辑带来的安全风险。
2.  **企业级功能缺口（#228）**：**14 条讨论**。强烈要求官方提供组织级 Skill 共享库和直接分享链接，替代当下 “Slack 传文件→手动上传” 的低效流程。
3.  **工具链稳定性（#556, #202, #1061）**：**评估管线失效是开发者最大的效能杀手**。社区迫切需要稳定、可量化、跨平台（特别是 Windows 原生支持）的 Skill 评估与优化流水线。
4.  **新 Skill 方向提案**：
    - **智能体治理（#412）**：策略执行、威胁检测、信任评分等安全模式。
    - **压缩记忆（#1329）**：为长上下文 Agent 提供符号化标注语言，压缩自身状态记忆以提高 Token 利用效率。
    - **推理质量门禁（#1385）**：三阶段管线（前置校准→对抗性审查→交付验证）以保障输出逻辑严谨性。

---

### 3. 高潜力待合并 Skills

以下 PR 功能完整、痛点明确，若通过 Review 极有可能近期落地：

| 技能名称 | PR 链接 | 合并预期 | 关键理由 |
|---|---|---|---|
| **测试模式** | [PR #723](https://github.com/anthropics/skills/pull/723) | 高 | 完成度极高，填补开发测试自动化空白 |
| **文档排版** | [PR #514](https://github.com/anthropics/skills/pull/514) | 高 | 轻代码量，感知度极强，逻辑清晰 |
| **色彩专家** | [PR #1302](https://github.com/anthropics/skills/pull/1302) | 中高 | 知识深度极高，差异化明显，需确认评审方的领域关注度 |
| **自我审计** | [PR #1367](https://github.com/anthropics/skills/pull/1367) | 中高 | 概念新颖，符合当前治理趋势，需看 CI 及冲突情况 |
| **ODT 支持** | [PR #486](https://github.com/anthropics/skills/pull/486) | 中高 | 格式标准化，办公生态刚需 |
| **run_eval 修复系列** | #1298, #1323 等 | **极高** | 直接影响核心工作流，只要通过 Code Review 会立即合并 |

---

### 4. Skills 生态洞察

**社区已从“能写 Skill”全面过渡到“写好 Skill”与“管好 Skill”阶段，当前最集中的诉求是：构建稳定可靠的评估工具链以优化 Skill 质量，并建立清晰的安全治理机制（命名空间、审计、权限）以保护用户信任与系统安全。** 换言之，工具链成熟度与治理安全是决定 Claude Code Skills 生态下一阶段爆发的两大核心瓶颈。

---

# Claude Code 社区动态日报 | 2026-07-22

---

## 今日速览

v2.1.217 发布，新增 Emoji 快捷输入与会话保存失败警告。**Fable 5 在 Max 计划上的付费墙问题**成为社区最激烈争议——多名 Max 用户在模型标准上线的第一天即被降级至 Opus 4.8，且权限 token 无法正确读取 entitlements。此外，**GitHub Connector 内容访问的回归性 Bug**持续影响大量用户（41 条评论，36 👍），仍无官方修复。

---

## 版本发布

### v2.1.217
- **Emoji 短代码自动补全**：在 Prompt 输入框输入 `:heart:` 自动转换为 ❤️，输入 `:hea` 可查看建议列表。可通过 `emojiCompletionEnabled` 设置禁用。
- **会话保存警告**：当转录写入失败（如磁盘已满）时，或会话保存因继承问题被关闭时，Claude Code 现在会显示显式警告。
- [查看发布详情](https://github.com/anthropics/claude-code/releases/tag/v2.1.217)

---

## 社区热点 Issues

### 🔥 1. GitHub Connector 无法访问任何仓库内容（Regression）
**#71542** · 41 评论 · 36 👍  
连接成功但无论公开/私有仓库，Claude 均无法读取内容。用户 @Antares9879 确认为近期回归问题，影响波及整个账号。社区要求紧急修复，目前 Anthropic 尚未标记 `acknowledged`。  
[→ Issue](https://github.com/anthropics/claude-code/issues/71542)

### 🔥 2. Fable 5 在 Max 计划中被误判需要 Usage Credits
**#79360** · 5 评论 · 30 👍  
使用 `claude setup-token` 生成的长期 token 认证时，因 scope 只包含推理权限，无法读取 entitlements，导致 Fable 5 被收费墙阻挡。用户 @PawlDani 提交后迅速获得大量支持，暴露出认证 scope 设计缺陷。  
[→ Issue](https://github.com/anthropics/claude-code/issues/79360)

### 🔥 3. Fable 5 上线首日即被静默降级至 Opus 4.8
**#79337** · 26 评论 · 9 👍  
Fable 5 成为 Max 标配当天，会话自动降级到 Opus 4.8，并提示“切换模型以节省用量”。用户 @otnixX 质疑此行为完全不尊重 Max 用户的订阅预期。  
[→ Issue](https://github.com/anthropics/claude-code/issues/79337)

### 🔥 4. 会话转录被静默清理，无警告无恢复路径
**#59248** · 23 评论 · 13 👍  
Claude Code 在日常使用中自动删除所有历史转录，用户无法恢复会话，跨天工作流中断。社区普遍认为此举缺乏用户知情与确认，构成数据丢失风险。  
[→ Issue](https://github.com/anthropics/claude-code/issues/59248)

### 🔥 5. VSCode 终端中无法正常复制文本
**#61021** · 14 评论 · 8 👍  
在 VSCode Terminal 中运行 Claude Code 后，用鼠标选择文本后 Ctrl+C 不再复制，需用 Shift 或其他变通方式。严重影响日常操作效率。  
[→ Issue](https://github.com/anthropics/claude-code/issues/61021)

### 🔥 6. 服务器端实验静默移除功能 + 自更新绕过配置
**#75607** · 7 评论 · 8 👍  
Anthropic 通过服务器端实验 (`x-cc-atis`) 移除了 Opus 4.8 的 Thinking Summaries，且即使设置了 `autoUpdates: false`，CLI 仍自动更新。用户 @phase3dev 批评该行为缺乏透明度和 opt-in 机制。  
[→ Issue](https://github.com/anthropics/claude-code/issues/75607)

### 🔥 7. Bash 权限配置（settings.json）不被强制执行
**#18846** · 11 评论 · 21 👍（已关闭）  
尽管 `permissions.allow` / `deny` 已配置，系统仍不强制校验。用户不得不自行编写 PreToolUse Hook 来模拟权限控制。该 Issue 虽已关闭但核心问题仍未解决，社区反应强烈。  
[→ Issue](https://github.com/anthropics/claude-code/issues/18846)

### 🔥 8. 功能请求：复制 Chat 回复为 Markdown 源码
**#54670** · 9 评论 · 17 👍  
VSCode 扩展中缺少一键复制 Markdown 源格式的能力，用户希望像 ChatGPT 那样可同时复制渲染文本与源格式，便于跨工具粘贴。  
[→ Issue](https://github.com/anthropics/claude-code/issues/54670)

### 🔥 9. MarketPlace 更新按钮无法点击
**#45810** · 15 评论 · 6 👍  
插件市场的 Update 按钮永久灰色不可交互，即使用户明确知道有新版本。此 Bug 长期存在，影响插件生态的使用体验。  
[→ Issue](https://github.com/anthropics/claude-code/issues/45810)

### 🔥 10. 1M 上下文窗口下自动压缩预警过早触发
**#79665** · 1 评论 · 0 👍  
在 `[1m]` 变体会话中，“上下文即将用尽，请询问用户是否压缩”的系统提示在大约 177K tokens（约 18%）时已触发。模型显然仍按 200K 默认窗口校准，导致 1M 用户频繁被干扰。  
[→ Issue](https://github.com/anthropics/claude-code/issues/79665)

---

## 重要 PR 进展

### 1. 新增 AWS 上的 Claude Apps Gateway 部署示例
**#79898** @roy-ant  
提供基于 Amazon Bedrock 的参考部署资产，与现有的 GCP 示例对标。适用于在生产环境中搭建 Claude 网关。  
[→ PR](https://github.com/anthropics/claude-code/pull/79898)

### 2. Hookify：使 Hook Entrypoints 可在未设置 `CLAUDE_PLUGIN_ROOT` 时运行
**#79889** @adelaidasofia  
解决插件入口脚本在缺少环境变量时静默跳过路径配置的问题，提升开发者异地调试体验。  
[→ PR](https://github.com/anthropics/claude-code/pull/79889)

### 3. Hookify：修复 Prompt 提交规则永不触发的 Bug
**#79873** @adelaidasofia  
`event: prompt` 规则因 payload 键名不匹配始终无法触发。修复后用户自定义提示规则可以按预期工作。  
[→ PR](https://github.com/anthropics/claude-code/pull/79873)

### 4. Hookify：强制以 UTF-8 读取规则和转录文件
**#79645** @rahulrshetty45  
Windows 平台默认编码（cp1252）无法解码包含中文、箭头等字符的 UTF-8 规则文件。此修复解决了跨平台兼容性问题。  
[→ PR](https://github.com/anthropics/claude-code/pull/79645)

### 5. 修复 macOS 上 `${CLAUDE_PLUGIN_ROOT}` 路径含空格导致的 Hook 失败
**#79644** @rahulrshetty45  
macOS 的 `~/Library/Application Support/` 目录含空格，未加引号的变量导致 Shell 拆分路径。  
[→ PR](https://github.com/anthropics/claude-code/pull/79644)

### 6. Hookify：消除对插件目录名的导入依赖
**#79647** @rahulrshetty45  
Hook 入口脚本通过包名导入，若插件目录未命名为 `hookify` 则导入失败。修复后可随意命名目录。  
[→ PR](https://github.com/anthropics/claude-code/pull/79647)

### 7. 新增 TTS 朗读 Hook（可访问性特性）
**#79620** @srikarphanikumar  
生产级的文字转语音 Hook，支持 Linux（Piper）、macOS（say）、Windows（PowerShell），并自动跳过代码块。  
[→ PR](https://github.com/anthropics/claude-code/pull/79620)

### 8. Hookify：示例规则文件添加 `hookify.` 前缀
**#79636** @rahulrshetty45  
规则加载器要求文件名必须为 `hookify.*.local.md`，但内置示例全部缺少该前缀，导致规则不被加载。  
[→ PR](https://github.com/anthropics/claude-code/pull/79636)

### 9. GCP 网关示例：修复 PG16+ Cloud SQL 创建失败 + 支持内部 ALB
**#78532** @gabrielparanthoen-cmd  
新版 PG16 实例默认使用 ENTERPRISE_PLUS 版本，拒绝共享核心 tier，导致 Terraform 部署失败；另增加可选内部 ALB 架构。  
[→ PR](https://github.com/anthropics/claude-code/pull/78532)

### 10. 修正 `/commit-push-pr` 命令行为说明
**#79643** @rahulrshetty45  
原文档声称使用分支日志生成 PR 描述，实际只注入了 `git status`、`git diff HEAD` 等信息。改正描述以匹配实现。  
[→ PR](https://github.com/anthropics/claude-code/pull/79643)

---

## 功能需求趋势

从近期 Issues 和讨论来看，社区最关注的功能方向集中在以下领域：

- **新模型与成本管控**：Fable 5 的资格判定、Max 计划的 entitlements 读取、模型降级透明性——用户期望清晰且一致的付费体验。
- **会话持久化与数据安全**：30 天自动删除、静默清理、无恢复路径——社区强烈要求提供数据保留策略选项和回收机制。
- **IDE 集成增强**：VSCode 中的文本选择/复制、Markdown 源格式复制、终端交互一致性仍然是顽固痛点。
- **插件生态完善**：Marketplace 更新不可用、文档与实际不符、路径兼容性问题——Hookify 是当前迭代重点。
- **MCP 工具可靠性**：桌面端工具调用中断、权限审批循环、stdio 连接失败等问题在最近 24 小时集中爆发。
- **上下文窗口优化**：1M 上下文下的 Auto-compact 阈值仍按旧模型校准，需要适配算法以降低干扰频率。
- **安全与合规**：bash 权限不被强制执行、安全分类器误报增多、服务器端实验静默推送，用户对控制权的诉求持续提升。

---

## 开发者关注点

综合分析，开发者的主要痛点和高频需求可归纳为：

1. **Fable 5 资格混乱**：多位 Max 用户在模型上线首日即遭遇付费提示或降级，加之 token scope 限制，暴露了认证系统与订阅系统之间的脱节。
2. **静默行为成最大信任危机**：从静默清理数据到静默自更新，再到静默移除功能——社区对“无通知、无确认、不可回退”的变更已普遍不满，尤其是 `autoUpdates: false` 被忽略。
3. **回归问题频发**：GitHub Connector、文本复制、权限配置等多个曾被修复的功能再次出现问题，表明测试覆盖可能需要加强。
4. **跨平台路径兼容性**：macOS 包路径含空格、Windows UTF-8 编码、Linux 终端类型判定——跨平台稳定性仍是插件和自动化功能落地的瓶颈。
5. **文档与实际不一致**：PR 中大量修正属于文档与实现不匹配（插件名、命令行为、示例前缀），开发者对此耐心有限，希望文档保持同步。

---

*数据截至 2026-07-22 08:00 UTC，信息来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

好的，这是为您生成的 **2026-07-22 OpenAI Codex 社区动态日报**。

---

## OpenAI Codex 社区动态日报 | 2026-07-22

### 1. 今日速览

今日 Codex CLI Rust 版 0.145.0 主线持续迭代，带来了实验性分页线程历史和跨工具配置迁移能力。然而，社区声音主要集中在 Windows 平台的稳定性与性能问题上，多项相关 Issue 引发了激烈讨论。安全方面，GitHub 机器人密集提交了一批针对沙箱（Sandbox）和进程管理的加固 PR，表明团队正全力提升底层基础设施的可靠性，以应对日益复杂的企业级需求。

---

### 2. 版本发布

**rust-v0.145.0** 主版本
- **新特性**：
  - **实验性分页线程历史**：支持高效恢复、搜索、持久化会话名称、Sub-agent 支持及记忆功能。
  - **跨工具导入**：`/import` 命令现已支持从 **Cursor** 和 **Claude Code** 迁移设置、MCP 服务器、插件、会话、命令及项目配置。
- **Alpha 迭代**：同步发布了 `v0.145.0-alpha.27`、`.28`、`.29` 三个版本，为正式版落地做准备。

---

### 3. 社区热点 Issues

**#20214** [🔥 严重 | Windows 卡顿]
Codex App 在 Windows 11 Pro 上频繁冻结卡顿。即便 CPU/内存充足（R5 5600/32GB），问题依旧严重。评论达 63 条，👍 70 个，是目前社区最关注的稳定性 bug。
[查看详情](https://github.com/openai/codex/issues/20214)

**#28058** [🔥 严重 | 审计丢失]
多 Agent V2 加密导致消息审计追踪丢失。此问题在引入加密后的版本中出现，获得了 99 个 👍，表明用户对透明度和可审计性的强烈需求。
[查看详情](https://github.com/openai/codex/issues/28058)

**#32149** [Windows | 安装阻塞]
Windows 设置进程在 UAC 提示前失败，安装程序无法正常工作，对 Windows 新用户构成严重入门障碍。
[查看详情](https://github.com/openai/codex/issues/32149)

**#25921** [macOS | 日志爆炸]
Mac 版 Desktop 的 Crashpad 文件夹在后台无形增长，可达每日 +5GB，极易导致磁盘溢出。
[查看详情](https://github.com/openai/codex/issues/25921)

**#26951** [Remote | 扩展卡死]
Codex VS Code 扩展在通过 Remote-SSH 连接 Linux 机时卡死，但 CLI 却可以正常工作，远程开发体验割裂。
[查看详情](https://github.com/openai/codex/issues/26951)

**#34061** [Subagent | 磁盘占用高]
用户报告 Codex CLI Sub-agent 功能产生了“疯狂”的磁盘用量，严重影响系统健康。
[查看详情](https://github.com/openai/codex/issues/34061)

**#26478** [Windows | 拼写无用]
Windows 版 Desktop 拼写检查只能检测错误，却无法提供任何修改建议，功能形同虚设。
[查看详情](https://github.com/openai/codex/issues/26478)

**#3968** [🗳️ 高票 | 后台终端]
经典功能请求，要求支持后台运行终端会话（类似 Claude Code），允许用户离开后重连，当前 33 👍。
[查看详情](https://github.com/openai/codex/issues/3968)

**#34635** [macOS | Artifacts 崩溃]
macOS 版在重新打开包含数据分析 Artifacts 的任务时，触发 React 错误 #185，任务完全无法访问。
[查看详情](https://github.com/openai/codex/issues/34635)

**#33579** [数据同步 | 任务丢失]
已固定和最近的任务从默认列表中消失，但通过 ID 搜索可找到。数据同步逻辑存在缺陷。
[查看详情](https://github.com/openai/codex/issues/33579)

---

### 4. 重要 PR 进展

**#34641** [沙箱代理加固]
通过硬化代理设置，修复 Bubblewrap 沙箱内的代理桥接和路由问题，提升受限运行时的网络连接可靠性。
[查看详情](https://github.com/openai/codex/pull/34641)

**#34624** [Windows 进程树终结]
引入 Job Object 来彻底终止 Windows 下的子进程树，解决沙箱/会话退出后进程残留的问题。
[查看详情](https://github.com/openai/codex/pull/34624)

**#34629** [Windows 沙箱启动加固]
检查并自动修复 Windows 沙箱的“可写根目录”权限，确保提升权限的沙箱能稳定启动。
[查看详情](https://github.com/openai/codex/pull/34629)

**#34625** [Windows TUI 导航修复]
修复 Windows 下因终端输入模式切换导致导航热键失效（被当作字面字符）的问题。
[查看详情](https://github.com/openai/codex/pull/34625)

**#34612** [后台进程解耦]
将非交互式子进程（如 `codex doctor`、Git 操作）的 stdin 重定向到 null，防止后台进程意外挂起。
[查看详情](https://github.com/openai/codex/pull/34612)

**#34605** [允许会话命名]
允许在 `/new` 和 `/clear` 命令后指定会话名称，提升多任务切换的辨识度，是一项呼声很高的 UX 改进。
[查看详情](https://github.com/openai/codex/pull/34605)

**#34636** [TUI 错误容错]
当开启新 Turn 失败时，不再直接退出 TUI，而是显示错误并等待用户恢复输入，极大增强了 CLI 的健壮性。
[查看详情](https://github.com/openai/codex/pull/34636)

**#34621** [分页模型上下文加载]
为分页线程历史加载功能打基础，支持按发行版谱系加载模型上下文。
[查看详情](https://github.com/openai/codex/pull/34621)

**#34626** [技能元数据预算缩放]
技能元数据预算不再固定，而是随模型的上下文窗口大小动态调整（上限 4000 tokens），优化长上下文场景下的技能使用。
[查看详情](https://github.com/openai/codex/pull/34626)

**#34620** [Exec-server 网络策略]
定义了 exec-server 的网络策略请求 RPC，为进程级网络访问控制提供了标准接口。
[查看详情](https://github.com/openai/codex/pull/34620)

---

### 5. 功能需求趋势

- **Remote 开发体验成刚需**：社区强烈希望改善 VS Code Remote-SSH / Container 环境下的兼容性和稳定性。在混合办公模式下，远程开发不再是可选项，而是必须项。
- **Windows 平台亟需“一等公民”待遇**：从安装、UI 到沙箱，Windows 上的 Bug 密度和讨论热度最高。用户期待团队加大投入，将 Windows 版本的体验拉到与 macOS 同等水准。
- **“类 IDE”的会话管理模型**：分页历史、会话命名、后台终端的呼声持续走高。用户已不满足于简单的终端工具，而是将其视为可以长时间运行、随时恢复的全功能开发环境。
- **可观测性与 Debug 能力**：审计线索丢失、Artifacts 崩溃、任务不同步，用户急需更强的故障排查手段和状态透明性，以保持对 AI 工作流的信任。

---

### 6. 开发者关注点

- **Windows 稳定性成最大痛点**：几乎所有讨论最激烈、赞数最高的 Bug 都与 Windows 有关。特别是卡顿（#20214）和安装失败（#32149），直接影响了新增用户的转化率。
- **Sub-agent 资源管控是刚需**：随着 Sub-agent 的普及，其磁盘占用（#34061）和性能影响成为新痛点。用户需要一个明确的资源限制机制，避免出现“Workflow 脚本吃掉所有硬盘”的情况。
- **“黑盒”担忧正在蔓延**：加密虽好，但不能以牺牲可审计性为代价（#28058，99 👍）。社区要求在不影响安全的前提下保留详细的推理日志，以追踪 Agent 决策过程。
- **滚动视图和输入体验待优化**：TUI 模式下无法滚动查看历史输出（#19645）和输入框不固定（#26311）是开发者日常高频吐槽点，直接影响了工具的使用效率。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

好的，作为专注于 AI 开发工具的技术分析师，这是为您生成的 2026-07-22 Gemini CLI 社区动态日报。

---

# Gemini CLI 社区动态日报 | 2026-07-22

## 今日速览
今天社区主要关注 Agent 子系统的稳定性与行为一致性，尤其是“假成功”状态报告和任务挂起问题，这是近期影响用户体验的核心痛点。同时，官方正在加速 PR 自动化基础设施的建设，多个与 CI/CD 和安全加固相关的 PR 进入活跃开发状态。

## 版本发布
- **v0.52.0-nightly.20260721**
  无实质性功能更新说明，为常规 nightly 版本发布。详情请查看完整 Changelog。

## 社区热点 Issues
1. **[#22323 Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**
   - **重要性**: ⭐⭐⭐⭐⭐
   - **摘要**: 子代理在达到最大迭代次数（MAX_TURNS）而中断后，向主代理报告状态为 “success” 和终止原因为 “GOAL”，导致主代理误以为任务成功完成。
   - **社区反应**: 有 12 条内部评论。这是一个关键的逻辑 Bug，直接影响了基于 Agent 的工作流可靠性和用户对任务成功率的判断。标签为 `priority/p1`，表明官方高度重视。

2. **[#21409 Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**
   - **重要性**: ⭐⭐⭐⭐⭐
   - **摘要**: 当 Gemini CLI 将任务委派给 Generalist agent 时，该代理会无限期挂起，即使是创建文件夹等简单操作也无法完成。
   - **社区反应**: 拥有 8 个 👍，社区对此问题反馈强烈。用户发现通过在提示中指示模型不要使用子代理可以临时规避。这是一个严重阻碍正常使用的 Bug。标签为 `priority/p1`。

3. **[#24353 Robust component level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353)**
   - **重要性**: ⭐⭐⭐⭐
   - **摘要**: 这是一个跟踪 EPIC，旨在建立健全的组件级评估体系，作为现有 76 个行为评估测试的补充。
   - **社区反应**: 7 条内部评论。该项目对于保证 Agent 各子系统的质量至关重要，是当前开发工作的核心之一。标签为 `priority/p1` 和 `kind/customer-issue`。

4. **[#26522 Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)**
   - **重要性**: ⭐⭐⭐⭐
   - **摘要**: 自动记忆（Auto Memory）功能在处理低价值的会话记录时会陷入无限重试，导致资源浪费和潜在的成本增加。
   - **社区反应**: 5 条内部评论。这个问题直接影响 Auto Memory 的特效和成本控制，是内存系统中的一个关键缺陷。

5. **[#25166 Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)**
   - **重要性**: ⭐⭐⭐⭐
   - **摘要**: 命令执行完毕后，Shell 工具仍显示“等待用户输入”，导致整个 CLI 界面挂起。
   - **社区反应**: 3 个 👍，是用户体验的另一个痛点。这个问题破坏了 Shell 交互的基本流程，属于 `priority/p1` 的 Bug。

6. **[#21983 browser subagent fails in wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**
   - **重要性**: ⭐⭐⭐
   - **摘要**: 在 Wayland 显示服务器协议下，Browser subagent 无法正常工作。
   - **社区反应**: 4 条内部评论，1 个 👍。随着 Linux 发行版对 Wayland 的普及，这个兼容性问题变得越来越重要。标签为 `priority/p1`，影响面广。

7. **[#22267 [BUG] Browser Agent ignores settings.json overrides](https://github.com/google-gemini/gemini-cli/issues/22267)**
   - **重要性**: ⭐⭐⭐
   - **摘要**: Browser Agent 完全忽略用户通过 `settings.json` 文件设置的配置（例如 `maxTurns`）。
   - **社区反应**: 3 条内部评论。用户配置被无视，这违反了基本的软件预期，影响了工具的可定制性。

8. **[#21763 Bugreport doesn't provide context of the subagent](https://github.com/google-gemini/gemini-cli/issues/21763)**
   - **重要性**: ⭐⭐⭐
   - **摘要**: 通过 `/bug` 命令生成的 Bug 报告中，只包含主会话的信息，缺失关键的子代理执行上下文，使得错误排查变得困难。
   - **社区反应**: 2 条内部评论。这是一个直接影响反馈质量和开发效率的工具链问题。标签为 `priority/p1`。

9. **[#22672 Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)**
   - **重要性**: ⭐⭐⭐
   - **摘要**: Agent 在执行复杂 Git 操作或数据库维护时，倾向于使用 `--force` 或 `git reset` 等破坏性命令，而不会优先选择更安全的替代方案。
   - **社区反应**: 1 个 👍。这反映了用户对 Agent 安全性和风险控制的关键需求，需要更智能的行为约束。

10. **[#20079 ~/.gemini/agents/filename.md is not recognized as an agent if filename.md is a symlink](https://github.com/google-gemini/gemini-cli/issues/20079)**
    - **重要性**: ⭐⭐⭐
    - **摘要**: 用户无法通过符号链接的方式管理自定义 Agent 定义文件，限制了工作流的灵活性。
    - **社区反应**: 4 条内部评论。这个功能对于希望使用 Git 管理 Agent 配置的高级用户来说非常必要。

## 重要 PR 进展
1. **[#28469 fix(core): rotate session ID on model fallback to prevent stateful API errors](https://github.com/google-gemini/gemini-cli/pull/28469)**
   - **功能/修复**: 核心修复。当模型回退（如从 Pro 回退到 Flash）时，轮换会话 ID，防止因状态不一致导致 API 报错。
   - **影响**: 这是解决生产环境中一个阻塞性错误的关键修复。

2. **[#28474 feat(core): add skill name dimension to tool call telemetry (#18189)](https://github.com/google-gemini/gemini-cli/pull/28474)**
   - **功能/修复**: 功能增强。在工具调用的遥测数据中增加 `skill_name` 维度。
   - **影响**: 这将显著改善对技能（Skill）使用情况的可观测性，有助于官方监控和优化技能系统的性能。

3. **[#28389 fix(core): add real-world time budget to prevent infinite-loop event-driven agent state transitions](https://github.com/google-gemini/gemini-cli/pull/28389)**
   - **功能/修复**: 核心修复。为 Agent 的事件驱动状态转换引入实际的“时间预算”，从根本上防止无限循环。
   - **影响**: 直接针对导致程序挂起的底层原因之一，是提高 Agent 稳定性的重要尝试。

4. **[#28397 fix(core): remove synchronous I/O from shell tool critical path](https://github.com/google-gemini/gemini-cli/pull/28397)**
   - **功能/修复**: 性能优化。将 Shell 工具关键路径上的同步文件系统操作替换为异步操作。
   - **影响**: 旨在解决因 UI 阻塞导致的终端渲染卡顿和闪烁问题，提升用户体验。

5. **[#28388 fix(core): scope tools.core wildcard deny to built-in tools](https://github.com/google-gemini/gemini-cli/pull/28388)**
   - **功能/修复**: 安全性修复。修复了 `tools.core` 权限配置的一个 Bug，该 Bug 导致 MCP（Model Context Protocol）工具被错误禁用。
   - **影响**: 确保了 MCP 工具的安全策略能够正确生效，对依赖 MCP 生态的用户至关重要。

6. **[#28386 fix(vscode): track activation disposables](https://github.com/google-gemini/gemini-cli/pull/28386)**
   - **功能/修复**: VS Code 插件修复。修复了一个资源追踪 Bug，该 Bug 导致部分 VS Code 扩展的注册未能正确绑定生命周期。
   - **影响**: 修复了 VS Code 集成中的稳定性问题，解决了 Issue #27790。

7. **[#28387 fix(cli): guard customDeepMerge against circular references](https://github.com/google-gemini/gemini-cli/pull/28387)**
   - **功能/修复**: 稳定性修复。防止 `customDeepMerge` 函数在处理存在循环引用的配置对象时崩溃。
   - **影响**: 提高了配置系统的健壮性，防止因用户配置文件问题导致 CLI 整个崩溃。

8. **[#28394 fix(core): remove temp files on background process exit](https://github.com/google-gemini/gemini-cli/pull/28394)**
   - **功能/修复**: 资源管理修复。确保后台 Shell 命令执行后，其创建的临时目录被正确清理。
   - **影响**: 解决了长期以来存在的临时目录泄漏问题，帮助用户节省磁盘空间。

9. **[#28305 feat(evals): add tool call formatter and integrate failure summaries](https://github.com/google-gemini/gemini-cli/pull/28305)**
   - **功能/修复**: 评估系统增强。在行为评估测试失败时，自动输出格式化的 Agent 工具调用时间线。
   - **影响**: 极大提升了评估失败时的调试效率，开发者可以清晰地看到 Agent 在执行过程中的每一步决策和工具使用情况。

10. **[#28403 fix(core): block $VAR and ${VAR} variable expansion bypass (GHSA-wpqr-6v78-jr5g)](https://github.com/google-gemini/gemini-cli/pull/28403)**
    - **功能/修复**: 安全加固。修复了一个安全公告中的漏洞，该漏洞允许攻击者通过特定模式绕过安全检查实现变量扩展。
    - **影响**: 这是一个重要的安全修复，防止了潜在的远程代码执行风险。

## 功能需求趋势
- **Agent 系统可靠性**: 社区对 Agent，特别是子代理（Sub-agent）的行为稳定性和状态报告的真实性提出了严格要求。理想的 Agent 不仅能工作，还必须能“诚实”地报告失败。
- **深度评估与可观测性**: 从“鲁棒的组件级评估” Epic 和多个评估相关 PR 可以看出，官方正在投入大量精力建设评估基础设施，以量化 Agent 行为。社区需求也集中在如何更好地观测和记录 Agent 执行轨迹。
- **安全与权限控制**: 社区对 Agent 的破坏性行为、MCP 工具的权限问题，以及系统环境变量泄露等安全议题保持高度关注。自主可控的安全策略成为刚需。
- **自动记忆（Auto Memory）与上下文管理**: 内存系统的 Bug 修复（如低信号重试）和功能增强（如确定性脱敏）表明，社区期待一个更智能、更高效且更安全的自动记忆系统。
- **基础功能的健壮性**: Shell 执行挂起、配置覆盖被忽略、临时文件泄漏等问题虽然不够“前沿”，但却是影响日常使用的最直接障碍，社区反馈的优先级很高。

## 开发者关注点
- **“假成功”问题最受诟病**: `MAX_TURNS` 报告成 `GOAL` 的 Bug 揭示了当前 Agent 系统中严重的状态管理问题。开发者期望工具行为具有可预测性和透明性。
- **Shell 交互体验不佳**: “命令执行后假死” (`#25166`) 和 UI 卡顿 (`#28397`) 是两个高频痛点，直接破坏了用户对工具的信任感。
- **配置反馈缺失**: 用户期望对自定义配置（如 `settings.json` 覆盖）有更清晰的反馈，包括配置被“吃掉”（`#22267`）或未生效（`#20079`）的情况。
- **错误报告信息不足**: 当前的 Bug 报告机制无法提供完整的子代理上下文，导致开发者难以快速定位根因。这被认为是工具链的一个短板。
- **资源清理意识增强**: 开发者开始关注临时文件泄漏、无限重试等资源管理问题，这表明社区用户更加成熟和专业，对工具的资源使用效率提出了更高要求。

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报 | 2026-07-22

---

## 今日速览

DeepSeek Reasonix 昨日发布 **v1.17.17**，带来 ACP 回合内引导、改动面板工作区差异两项新功能，并正式退役自动计划模式。与此同时，社区集中反馈了**数据丢失、MCP 安装全面失效、并行子 Agent 被意外取消**等严重问题，开发团队已在 24 小时内合并多项修复 PR（如 #6761 防止归档活跃会话、#6775 为并行任务增加优雅取消）。重大功能 **Remote Workbench（使用本地模型的远程工作台）** 亦于当日合并入主分支，补齐远程开发体验核心短板。

---

## 版本发布

**v1.17.17（CLI + Desktop）**

- 新增 ACP 回合中引导（in-turn guidance）
- 新增改动面板工作区差异对比（workspace diff）
- 移除自动计划模式（Auto Plan），以更轻量的模式取代
- 多项界面一致性修复与生命周期稳定性改进

> [更新日志](https://reasonix.io/changelog/v1.17.17/) · [CLI 版本](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v1.17.17) · [Desktop 版本](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.17.17)

---

## 社区热点 Issues（10 个）

**#5909 — 检测到响应卡顿（macOS）**  
用户反馈桌面端响应严重滞后，截至昨日已有 **22 条评论**，是近期讨论热度最高的问题。社区怀疑与 GC 或渲染线程阻塞有关，影响日常流畅使用。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/5909)

**#6769 — MCP 插件安装全面失败（Windows）**  
从 v1.17.15 起所有 MCP Server 安装均报错，根本原因是 Reasonix 在 `initialize` 响应前无法处理服务器发来的通知消息。**MCP 通道断裂**，直接影响扩展能力。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/6769)

**#6770 — 旧版会话迁移后数据丢失**  
用户从旧版迁移的 JSONL 会话文件，在聊天后切换再返回时内容全部丢失，文件被覆写回迁移前大小。属于**严重数据损失**，社区立即要求在下一个 Patch 修复。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/6770)

**#6748 — 桌面端启动后数分钟变未响应（Windows）**  
v1.17.15 / 1.17.16 在 Windows 10 上触发 UI 卡死，只能强制关闭。v1.17.16 更为严重，启动即卡死。**是当前影响面最广的稳定性回归**。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/6748)

**#6778 — MCP 相对路径配置被解析到错误的工作目录**  
为项目配置局部 MCP Server（`.mcp.json` / `reasonix.toml`）时，相对路径被桌面端进程管理器错误解析，导致局部配置失效。影响**企业级项目隔离**场景。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/6778)

**#6772 — `parallel_tasks` 子 Agent 被 `context.Canceled` 中断**  
父 turn 取消时，快完成只读调研的子 Agent 也被直接杀死，结果丢失。用户提供了完整复现步骤，社区讨论热烈，**直接催生了 #6775 修复 PR**。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/6772)

**#6546 — 微信机器人配对成功但消息无回复（Windows）**  
桌面端显示“已连接”，手机发消息却完全无回复。7 月 15 日正常，16 日失效，重新配对无效。**通道集成稳定性**受到质疑。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/6546)

**#6782 — 建议更换 macOS 图标**  
用户自制了支持亮色/黑暗模式的图标文件并提交附件，获得 **2 个 👍**，反映社区对**原生设计语言**的看重。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/6782)

**#6771 — 界面存在未翻译文本（Missing translations）**  
“New Conversation”仍显示中文“新的会话”，会话成本用 ¥ 显示但余额用 $，多语言用户抱怨**本地化不完整**。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/6771)

**#6747 — 远程 SSH 按钮大小不一且远程目录无法打开**  
远程工作台细节问题：按钮排版不对齐、点击目录无反应。说明**远程功能虽已合并但细节仍需打磨**。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/issues/6747)

---

## 重要 PR 进展（10 个）

**#6728 — Remote Workbench with Local Provider Broker**  
将远程工作台集成到主窗口：Host 端掌控 Agent/工具/工作区，Desktop 端仅做 UI。**大幅改善 SSH 远程开发体验**（Close #6714）。已合并。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6728)

**#6732 — Auto Guard 模式：以更低中断边界强化自动模式**  
保留可逆操作（编辑、局部依赖变更）在快速路径，仅对确定性副作用要求确认。**替代废弃的自动计划模式**，提供更平滑的自动体验。已合并。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6732)

**#6767 — 简化已安装 MCP 的授权机制**  
移除指纹、签名、撤销等复杂设施，用户安装即授权。**降低 MCP Server 接入门槛**，同时保留对仓库声明 Server 的单次身份确认。已合并。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6767)

**#6761 — 禁止归档活跃会话**  
当会话正在思考、流式输出、等待确认或运行后台任务时，禁用归档操作；后端也增加守卫。**直接修复 #6753 数据风险**。已合并。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6761)

**#6775 — 为 `parallel_tasks` 增加优雅取消宽限期**  
父 turn 取消时，子 Agent 可完成已近尾声的工作，而非立刻杀死。**缓解 #6772 结果丢失问题**，对并发场景稳定性至关重要。已合并。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6775)

**#6584 — 为 `reasoning_language` 添加 `off` 选项**  
允许完全禁用思考语言块注入，解决回溯历史被指令占满、编辑消息需先删除注入的痛点。**社区呼声很高的增强**。已合并。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6584)

**#6784 — 持久化许可时保留完整权限策略**  
修复新规则保存时可能丢失现有权限配置、并发写入破坏 TOML 文件的问题。**提升配置安全性**。Open 状态。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6784)

**#6783 — 完善主题面板透明度与悬浮交互一致性**  
继 #6645 后继续覆盖左边栏、终端等未应用透明度的区域，保证主题包效果统一。**视觉打磨持续进行**。Open 状态。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6783)

**#6574 — 为文件预览添加行号边栏与搜索功能**  
支持行号显示与 Ctrl+F 搜索，解决大文件导航困难。**社区功能请求 #6557 的实现**，已合并。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6574)

**#6774 — 修复 Todo 面板状态：规范会话中 todo 状态并自动完成非目标回合后剩余项**  
解决会话重载丢失合成事件导致的 todo 显示不准确，**让任务进度面板更可信**。Open 状态。  
[GitHub →](https://github.com/esengine/DeepSeek-Reasonix/pull/6774)

---

## 功能需求趋势

综合近期 Issue 和 PR，社区最关注的功能方向集中在以下几方面：

- **远程开发深度优化**：不再满足于基础 SSH 连接，要求**类似 VS Code Remote 的体验**（本地界面管理远程工作区、Agent、Git 等），#6714 #6747 及 #6728 PR 均指向此。
- **MCP 生态成熟化**：安装流程、相对路径解析、授权简化是当前痛点，#6769 #6778 #6767 显示社区对 MCP 稳定性和易用性的高期待。
- **本地化与国际化**：多语言用户要求完整的翻译覆盖与货币显示一致性，#6771 只是开始。
- **UI/UX 细节打磨**：macOS 图标（#6782）、文件拖放行为（#6779）、行号与搜索（#6557）、主题透明度（#6783）、禁用 usage 行（#6785）——**“用完为止”的 polish 需求密集**。
- **并行任务控制**：`parallel_tasks` 的子 Agent 生命周期管理、优雅取消、结果收集，成为 Agent 框架的注意力焦点。

---

## 开发者关注点

从过去 24 小时的反馈中可看出以下高频痛点：

1. **更新机制不稳定**：多个版本（1.15 ~ 1.17）均出现更新失败、版本不同步、点击更新无效等问题（#5149 #5987 #6596 #6713 #5897），已成为社区抱怨最多的系统性问题。
2. **MCP 兼容性反复**：v1.17.15-1.17.17 连续三版几乎让 MCP 全面失效，协议层对通知消息的处理过于脆弱，**急迫需要回归测试覆盖**。
3. **数据安全警报**：会话迁移丢失数据、运行中会话可被归档，触及用户对工具信任的根本。
4. **桌面端性能退行**：v1.17.15 起 Windows 端未响应、macOS 端卡顿，建议开发组引入自动化性能基准测试。
5. **功能预期不符**：补充指示被模型忽略、微信 Bot 无声失败、并行子 Agent 被粗暴取消——功能虽多但边界情况处理仍需夯实。

---

*数据来源：GitHub [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) 社区公开信息，统计区间 2026-07-21 00:00 – 2026-07-22 00:00 (UTC+8)。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-07-22

## 今日速览

- 新旧 UI 布局引发的争议持续升温，Web 端用户因无法回退且缺失 Workspace 支持而集中反馈，要求保留旧版布局；
- 上游认证错误（401）导致 Go 订阅用户无法使用付费模型，多个 issue 要求紧急修复；
- Copilot API 端点发现、DeepSeek 模型兼容性等关键修复已完成合并，会话稳定性与安全防护也有多起改进。

## 社区热点 Issues（10 条）

1. **Memory Megathread（#20695）**  
   🔥 118 条评论，90 👍  
   社区统一报告内存问题的汇总帖。当前目标是收集堆快照以定位泄漏，不接受 LLM 生成的猜测性方案。  
   [链接](https://github.com/anomalyco/opencode/issues/20695)

2. **【Feature】保留旧版布局选项（#37012）**  
   26 条评论，27 👍  
   用户认为旧版布局所有功能集中在主窗口，且支持 workspace，新版导航步骤过多，效率反降。  
   [链接](https://github.com/anomalyco/opencode/issues/37012)

3. **Web 端无法回退新布局，且缺失 Workspace（#37546）**  
   4 条评论，5 👍  
   升级至 v1.17.19 后自动切换到“标签栏在上”的新布局，但 Web UI 无开关可回退，同时 git worktree/workspaces 在新布局中未被实现。  
   [链接](https://github.com/anomalyco/opencode/issues/37546)

4. **Web 端现有配置不享有布局过渡开关（#38124）**  
   3 条评论，1 👍  
   桌面端可通过 `layoutTransitionEligible` 在过渡期内切换布局，但 Web 现有配置无法获得该标记，被强制锁定在新布局。  
   [链接](https://github.com/anomalyco/opencode/issues/38124)

5. **上游 Provider 拦截请求（#38190）**  
   7 条评论，3 👍  
   用户发送消息时遇到 `Request blocked by upstream provider`，无法继续对话。  
   [链接](https://github.com/anomalyco/opencode/issues/38190)

6. **付费模型返回 401 AuthError（#38195）**  
   1 条评论，3 👍  
   Go 订阅用户的所有付费模型均返回 401，免费模型正常，桌面端和 Hermes 环境均复现。  
   [链接](https://github.com/anomalyco/opencode/issues/38195)

7. **Web 终端持续 100% CPU（#13899）**  
   6 条评论，1 👍  
   在 Linux 高刷显示器上，只要浏览器中终端标签页打开，Chrome 即满载 CPU，即使终端空闲也无效耗电。  
   [链接](https://github.com/anomalyco/opencode/issues/13899)

8. **Anthropic provider 返回嵌套数组字符串导致 SchemaError（#34652）**  
   5 条评论  
   `@ai-sdk/anthropic` 接入时，`todowrite` 等工具调用因模型将数组参数编码为 JSON 字符串而失败，OpenAI 等 provider 无此问题。  
   [链接](https://github.com/anomalyco/opencode/issues/34652)

9. **【Feature】添加 MCP Sampling 支持（#11948）**  
   3 条评论，10 👍  
   请求支持 MCP 协议中的 `createMessage`（Sampling），使 MCP 服务器能发起 LLM 调用。已关闭但呼声较高。  
   [链接](https://github.com/anomalyco/opencode/issues/11948)

10. **TUI 输入冻结：项目含大二进制文件时拒绝执行（#38201）**  
    1 条评论  
    项目目录包含 MP3、WAV、ROM 等大文件时，TUI 输入框只能输入但回车无响应，界面死锁。  
    [链接](https://github.com/anomalyco/opencode/issues/38201)

## 重要 PR 进展（10 条）

1. **修复 Copilot API 端点发现（#38184）**  
   V2 设备 OAuth 完成后自动发现并持久化账号专属的 Copilot API 端点，减少额外启动请求。  
   [链接](https://github.com/anomalyco/opencode/pull/38184)

2. **NVIDIA NIM DeepSeek 请求兼容（#37833）**  
   DeepSeek V4 系列在 NVIDIA NIM 上部署时请求挂死，此 PR 修复兼容性，使其正常响应。  
   [链接](https://github.com/anomalyco/opencode/pull/37833)

3. **Solidity 语法高亮支持（#38200）**  
   为 `.sol` 文件添加语法高亮，方便智能合约开发者。  
   [链接](https://github.com/anomalyco/opencode/pull/38200)

4. **传输超时错误归类为可重试（#30638）**  
   `MessageV2.fromError` 现纳入各类 timeout 及传输层错误均为可重试，提升会话稳定性。  
   [链接](https://github.com/anomalyco/opencode/pull/30638)

5. **TUI 新增 auto_scroll 配置（#33248）**  
   `tui.json` 增加 `auto_scroll` 开关（默认 `true`），关闭后会话视图不再自动跟随输出。  
   [链接](https://github.com/anomalyco/opencode/pull/33248)

6. **退出时恢复终端模式（#33207）**  
   修复退出后 DECCKM、鼠标、Kitty 等终端模式残留的问题。  
   [链接](https://github.com/anomalyco/opencode/pull/33207)

7. **防止大规模文件任务中泄露密钥（#33225）**  
   LLM 发起“复制/镜像全部”等宽泛文件操作时，自动阻止私钥、`.env` 等敏感文件被上传。  
   [链接](https://github.com/anomalyco/opencode/pull/33225)

8. **TimelineDiffView 添加大 diff 保护（#33198）**  
   限制最大 diff 行数，防止超大幅渲染导致 UI 冻结。  
   [链接](https://github.com/anomalyco/opencode/pull/33198)

9. **持久化 Web 侧边栏项目状态（#33203）**  
   Web 端项目侧边栏的展开/折叠状态保存至服务器，同一用户跨浏览器登录保持一致。  
   [链接](https://github.com/anomalyco/opencode/pull/33203)

10. **修复 agent 解析 `model: inherit` 时的崩溃（#33202）**  
    自定义子 agent 使用 `model: inherit`（默认）时不再抛出异常，同时处理前后空格，兼容旧配置文件。  
    [链接](https://github.com/anomalyco/opencode/pull/33202)

## 功能需求趋势

- **布局灵活性与 UI 一致性**：旧版布局保留 / 新版布局可回退是当前最集中的诉求，尤其 Web 端功能差距明显。
- **MCP 协议深度整合**：MCP Sampling（#11948）与全局 OAuth 配置（#38202）表明社区期待 OpenCode 成为完整的 MCP Host。
- **上游 Provider 可靠性与安全**：401/403 认证错误频发，推动自动凭据恢复机制；同时要求更强的密钥泄漏防护。
- **Web 与 Desktop 功能对等**：Web 端尚缺 Workspace、布局过渡开关等桌面已有能力，跨端体验落差亟待弥合。

## 开发者关注点

- **升级后布局被锁死**：Web 端升至 v1.17.19+ 后无法切换回旧布局，且 Workspace/Worktree 不可用，影响既有工作流。
- **付费模型不可用**：Go 订阅用户遭遇 `401 AuthError`，免费模型正常，疑似 OAuth/API 端点配置问题。
- **TUI 稳定性**：大二进制文件导致输入冻结（#38201）；极端缩窗触发 Bun segfault（#38199）；Web 终端 100% CPU（#13899）。
- **编辑工具绕过客户端**：`opencode acp` 直接写盘而非经 `fs.writeTextFile`，使 ACP 原生审查 UI 无法拦截变更。
- **配置与对话体验**：桌面“添加服务器”对话框非必填字段不可编辑（#38193）；`opencode.json` 未知字段曾阻止会话加载（#33197 已修复）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

好的，这是为您生成的 2026-07-22 Qwen Code 社区动态日报。

---

# Qwen Code 社区动态日报 2026-07-22

> 今日关键词：v0.20.1 发布、Daemon 恢复机制修复、后台智能体管理与热重载。

## 今日速览

今日社区的核心动态是正式发布了 **v0.20.1** 版本，主要引入了针对 Autofix 流程的标签驱动接管与发布机制。社区讨论的热点集中在 Daemon 模式下的可靠性问题上，尤其是关于 SSE 恢复游标和后台智能体管理的多个缺陷报告和修复 PR 正在进行中。此外，性能优化（如启动速度）和 Web Shell 的交互体验改进也是本次更新的亮点。

## 版本发布

- **[v0.20.1]** 正式发布。这是一个基于 `main` 分支的 Release 版，主要更新是引入了 `feat(autofix): label-driven takeover and release` 特性，即通过标签驱动自动化流程来实现 Autofix 的接管与发布，并修复了强制推送（forced-dispatch）造成空操作（no-op）的问题。
  - 发布链接: [v0.20.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.20.1)
- **[cua-driver-rs v0.7.3]** 发布了 CUA 驱动（用于相对坐标控制）的预编译二进制包，支持 macOS、Linux 和 Windows 平台。
  - 发布链接: [cua-driver-rs-v0.7.3](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.7.3)

## 社区热点 Issues (Top 10)

1.  **[#7306] 强化工具输出预算、可观测性与工件生命周期**
    - **重要性**: 属于基础架构增强，第一阶段已经合并，但剩下的阶段涉及数据面可观测性和预算演进，对未来系统的稳定性和可调试性至关重要。
    - **社区反应**: 作者 `@doudouOUC` 持续跟进，评论数 4，讨论较为深入。
    - 链接: [#7306](https://github.com/QwenLM/qwen-code/issues/7306)

2.  **[#7441] Release v0.20.1 工作流失败**
    - **重要性**: 阻塞了新版本的顺利发布，涉及 CI/CD 流程的健壮性。该 Issue 已被关闭，但反映了集成测试流程中的问题。
    - **社区反应**: 由机器人自动创建，团队已修复并关闭。
    - 链接: [#7441](https://github.com/QwenLM/qwen-code/issues/7441)

3.  **[#7452] cronParser: `*/N` 在日月字段中的语义与文档不符**
    - **重要性**: 这是一个精确性 Bug。`cronParser` 模块文档声称遵循 Vixie cron 语义，但实际实现中有偏差，可能导致定时任务执行异常。
    - **社区反应**: 开发者 `@chinesepowered` 提交了详细的 Bug 分析和测试用例；已标记 `welcome-pr`，欢迎社区贡献。
    - 链接: [#7452](https://github.com/QwenLM/qwen-code/issues/7452)

4.  **[#7457] Daemon: SSE 恢复游标在守护进程 epoch 过期后静默错误恢复**
    - **重要性**: 涉及 Daemon 模式下的核心可靠性问题。在断线重连场景下，旧的 SSE 游标可能导致数据恢复错乱，这是一个严重的事件回放缺陷。
    - **社区反应**: 由核心贡献者 `@doudouOUC` 基于审计发现，并给出了详细的复现路径，社区关注度高。
    - 链接: [#7457](https://github.com/QwenLM/qwen-code/issues/7457)

5.  **[#7451] Daemon: 后台提示词（Prompt）终端“恰好一次”保障的后续问题**
    - **重要性**: 针对已合并 PR 的自查，发现了残留的 Bug，包括“运行中提示词被移除后终端丢失”、“故障队列状态污染”等问题，直接影响 Daemon 状态管理。
    - **社区反应**: 同样由 `@doudouOUC` 跟进，说明了 PR 合并后评审的重要性。
    - 链接: [#7451](https://github.com/QwenLM/qwen-code/issues/7451)

6.  **[#7433] 使用本地模型后，SDK 报告当前模型为 “qwen-oauth”**
    - **重要性**: 直接影响开发者使用本地模型体验的 Bug。这表明模型切换逻辑或模型列表维护存在缺陷。
    - **社区反应**: 用户 `@fantasyz` 报告了具体的复现步骤和网络请求示例，开发团队需要确认是前端显示问题还是后端接口问题。
    - 链接: [#7433](https://github.com/QwenLM/qwen-code/issues/7433)

7.  **[#7118] Windows 独立安装器在 `Get-FileHash` 不可用时失败**
    - **重要性**: 影响 Windows 用户的首次安装体验。依赖 Power Shell 特定命令，在某些精简或受限环境可能失败。
    - **社区反应**: 该 Issue 已有一个赞，表明有一定数量的用户受影响。已标记 `welcome-pr`。
    - 链接: [#7118](https://github.com/QwenLM/qwen-code/issues/7118)

8.  **[#7462] 讨论: mobile-mcp 是否需要跟随 core 一起发版？**
    - **重要性**: 这是一个团队协作流程问题。当前 `mobile-mcp` 模块跟随 core 发版，导致每次发版都需要特定审批者，**影响发版效率**。社区正在讨论是否将其独立管理版本。
    - **社区反应**: 讨论积极，关系到核心维护者的日常工作流优化。
    - 链接: [#7462](https://github.com/QwenLM/qwen-code/issues/7462)

9.  **[#7449] 提议: 定义企业级外部内存集成规范**
    - **重要性**: 面向企业级部署的功能提议。定义标准化的外部 Memory Gateway 集成方式，有助于架构解耦和企业采用。
    - **社区反应**: 由 `@doudouOUC` 提出，仍处于讨论阶段，但标志着社区开始关注企业级特性。
    - 链接: [#7449](https://github.com/QwenLM/qwen-code/issues/7449)

10. **[#7421] Headless 模式缺乏可靠的方式选择 Fork 子代理（Subagent）**
    - **重要性**: 核心功能缺陷。在 Headless（无头）模式下，用户期望能明确指定使用哪个 Fork/Subagent，但当前没有机制，限制了自动化场景。
    - **社区反应**: 用户 `@DragonnZhang` 提交了 Issue，并关联了 #7378 的修复，问题指向明确。
    - 链接: [#7421](https://github.com/QwenLM/qwen-code/issues/7421)

## 重要 PR 进展 (Top 10)

1.  **[#7461] chore(release): v0.20.1**
    - **内容**: v0.20.1 的自动发布 PR，同步了版本号和 CHANGELOG。
    - 链接: [#7461](https://github.com/QwenLM/qwen-code/pull/7461)

2.  **[#7459] feat(core): 恢复后台智能体（Agent）列表**
    - **内容**: 修复了父会话重新打开时，后台智能体列表丢失的问题。中断的 agent 会恢复为“暂停”状态，已完成的 agent 也会恢复。
    - 链接: [#7459](https://github.com/QwenLM/qwen-code/pull/7459)

3.  **[#7455] perf(startup): 惰性加载 `undici` 以优化启动速度**
    - **内容**: 将 `undici` HTTP 客户端移出启动阶段，改为懒加载。这是启动性能优化的一个关键 PR，有望显著降低 ACP 子进程的冷启动时间。
    - 链接: [#7455](https://github.com/QwenLM/qwen-code/pull/7455)

4.  **[#6723] fix(prompt-cache): 稳定延迟工具（Deferred Tool）调用**
    - **内容**: 修复了在提示词缓存场景下，延迟工具发现导致的主会话工具声明不稳定的问题，确保模型看到的工具列表一致。
    - 链接: [#6723](https://github.com/QwenLM/qwen-code/pull/6723)

5.  **[#7268] feat(serve): 热重载工作区信任设置**
    - **内容**: 允许在 daemon 运行时，无需重启进程即可应用工作区信任策略的更改。通过引入快照和监控机制实现，提升了运维灵活性。
    - 链接: [#7268](https://github.com/QwenLM/qwen-code/pull/7268)

6.  **[#7393] feat(core): 添加内存召回投递遥测**
    - **内容**: 新增内存召回功能的终端投递遥测数据。之前只知道哪些记忆被选中，现在可以追踪这些记忆是否**实际送达**给主模型，增强了可观测性。
    - 链接: [#7393](https://github.com/QwenLM/qwen-code/pull/7393)

7.  **[#7380] feat(web-shell): 在详情面板中显示子代理（Subagent）会话**
    - **内容**: 将 subagent 的详细对话移出主对话框，改为独立的详情面板，改善了界面清晰度，避免主对话流被干扰。
    - 链接: [#7380](https://github.com/QwenLM/qwen-code/pull/7380)

8.  **[#7408] perf(web-shell): 优化长会话渲染性能**
    - **内容**: 提升了 Web Shell 在处理长会话或恢复会话时的响应速度和内存稳定性。通过限制 UI 块数量、延迟非活动对话加载等方式实现。
    - 链接: [#7408](https://github.com/QwenLM/qwen-code/pull/7408)

9.  **[#7463] feat(sdk-java): 添加 Daemon 传输协议**
    - **内容**: 为 Java SDK 增加了 Daemon 模式的支持，使得 Java 应用可以以 thread-scoped 方式与 Qwen Code 进程通信，为 Java 生态集成铺路。
    - 链接: [#7463](https://github.com/QwenLM/qwen-code/pull/7463)

10. **[#7444] ci(autofix): 继续环境特定修复**
    - **内容**: 允许 Autofix 流程在无法本地复现 CI 失败时，仍能有依据地进行修复，避免了因环境不一致导致的修复停滞。
    - 链接: [#7444](https://github.com/QwenLM/qwen-code/pull/7444)

## 功能需求趋势

- **Daemon 模式增强是当前焦点**: 大量 Issue 和 PR 集中在 Daemon 模式的稳定性和功能完善上，包括更可靠的 SSE 恢复、后台 Agent 管理、热重载以及专门的 Java SDK 支持。
- **性能优化持续深入**: 从“懒加载 undici”到“优化 Web Shell 长会话渲染”，社区对启动速度、内存占用和 UI 响应性的优化需求非常强烈。
- **自动化 Bug 修复（Autofix）流程演进**: 社区在持续迭代 Autofix 功能本身，例如通过标签驱动接管、处理 CI 环境特定失败等，旨在提高自动化修复的覆盖率和准确性。
- **Web Shell 交互体验升级**: 围绕 Web Shell 的改进包括如何展示 Subagent、优化长会话渲染、以及改进快捷键等，目标是让用户界面更清晰、响应更快。
- **企业级特性初露头角**: 出现了关于“企业级外部内存集成规范”的提议，表明社区开始关注更复杂的集成和企业部署场景。

## 开发者关注点

- **Daemon 恢复可靠性是最大痛点**: `#7457`、`#7451` 等 Issue 表明，开发者在实际使用 Daemon 模式时，对断线重连、后台任务状态保持等可靠性问题非常敏感，这些 Bug 会影响日常开发工作流。
- **配置热重载是高频需求**: `#7268` “热重载工作区信任设置” 的 PR 反映了开发者对“修改配置后无需重启进程”的强烈诉求，对提升运维效率至关重要。
- **SDK 模型信息报告不准确**: Issue `#7433` 报告 SDK 在用户切换模型后仍显示错误模型名，这是一个影响基本信任的集成问题，开发者希望模型切换逻辑能更透明和准确。
- **文档与代码同步**: Issue `#7446` 指出 JSDoc 注释已与函数签名不同步，这提醒维护者，代码文档的实时更新同样是开发者体验的重要组成部分，尤其是在帮助新贡献者上手时。
- **跨平台体验差异**: `#7118` 关于 Windows 安装器失败的问题表明，开发者在使用非主流或受限环境（如特定的 Windows 系统）时，会遇到平台兼容性问题，需要项目提供更稳健的安装方案。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

#  Hermes 社区动态日报 | 2026-07-22

---

## 1. 今日速览

今日无版本发布，但社区围绕多个影响稳定性的 Bug 展开了密集讨论。桌面端长线程压缩后消息顺序错乱、系统提示被误认为用户输入导致任务放弃、Telegram 适配器无限挂起以及 Windows 下 Git 探测死锁等问题成为关注焦点。功能方面，行为分析评分系统与跨平台主题 SDK 两项 PR 进展显著，社区对会话可靠性及跨平台体验的诉求依然强烈。

---

## 2. 版本发布

无。

---

## 3. 社区热点 Issues

共 5 条活跃 Issue，按重要性排列如下。

### #68979 — Desktop: 长线程压缩后用户消息被重新堆叠到底部
- **标签**: `type/bug`, `P2`, `comp/desktop`, `area/sessions`
- **摘要**: 桌面端长线程在上下文压缩或重连后，用户最新消息被连续渲染到助手回复下方，用户需上滑才能看到助手回复（渲染层错误，数据库内容正确）。
- **为何重要**: 直接影响桌面重度用户的长对话体验，属渲染层严重错误。
- **社区反应**: 2 条评论，尚未获 👍；作者已提供详细录制线索，开发组正在排查。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/68979

### #69000 — 系统提示被当作新用户输入导致任务放弃
- **标签**: `Bug`
- **摘要**: 多步任务中，续写 / 截断等系统提示被 agent 当成新用户请求，导致当前任务被放弃并回复无关内容。
- **为何重要**: 严重破坏多步工具调用流程，使长时间运行任务易被意外中断。
- **社区反应**: 刚提交，暂无评论，但属 P0 级别逻辑错误，预计会快速跟进。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/69000

### #68998 — [设计] 持久化、可授权的 Agent 唤醒机制用于无会话 Kanban 任务
- **标签**: 设计讨论
- **摘要**: 目前通知订阅不足以作为唤醒 Agent 的授权凭证，重启或路由变更后可能唤醒错误会话。提出网关签发持久令牌，绑定任务和租户，重启后可重建唤醒。
- **为何重要**: 为后台自治任务提供安全基础，涉及网关授权边界重构。
- **社区反应**: 无评论，属于早期设计提案，但方向被核心开发者关注。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/68998

### #68989 — Telegram 适配器在完整网关进程中无限挂起（"Connecting to Telegram (attempt 1/8)"）
- **标签**: `type/bug`, `comp/plugins`, `platform/telegram`, `P3`，需要复现
- **摘要**: Telegram 适配器连接步骤在完整网关进程内卡死，但独立测试时正常。怀疑是状态依赖或初始化顺序问题。
- **为何重要**: 阻塞所有 Telegram 用户使用，影响面较大。
- **社区反应**: 暂无评论，标记为 `needs-repro`，开发者在积极寻找稳定复现环境。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/68989

### #68990 — TUI 流式渲染中泰文组合字符丢失或重复（存储内容正确）
- **标签**: `type/bug`, `comp/tui`, `P2`, `area/streaming`
- **摘要**: Terminal 显示泰文声调符号及上下元音符号异常，部分基础辅音重复，但数据库存储正常。
- **为何重要**: 影响泰语用户界面体验，是流式渲染管线中的字符处理缺陷。
- **社区反应**: 暂无评论，已明确为渲染端问题，开发者正定位 terminal 转义序列。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/68990

---

## 4. 重要 PR 进展

从今日 50 条活跃 PR 中精选 10 项最具价值变更。

### #68999 — fix(ui-tui): widget-grid 布局引擎加固（#20379 快速跟进）
- **要点**: 修复 MCP 修订确认未加载即 ACK 的问题；重做 revision‑aware 握手；解决 session 推理作用域回退。
- **重要性**: 合并后首个修复回合，提升 TUI 布局稳定性。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/68999

### #60417 — feat(behavior): 行为分析系统（5 轴评分 + 洞察卡片）
- **要点**: 新增 `/behavior` 命令，从 `state.db` 分析会话历史，输出定性行为画像；与仅定量的 `/insights` 互补。
- **重要性**: 为用户提供“如何使用 Agent”的元认知反馈，标志 Hermes 从工具向协作伙伴演进。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/60417

### #68766 — fix(agent): 在临时 provider 中断后恢复会话（#33693）
- **要点**: 对 500/502/超时类错误延长重试退避（基本延迟 5s，最大 120s），覆盖 2‑3 分钟中断窗口；修复缓存与重试计数器竞争。
- **重要性**: 解决自托管用户最高频投诉之一——provider 闪断导致会话永久丢失。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/68766

### #69003 — test(mcp): 修复断路器冷却测试的时钟不稳定问题
- **要点**: 将墙上时钟备件改为单调时钟，消除 CI 环境 vs 开发机的差异；确保半开探测时序正确。
- **重要性**: 消除 CI 假阳性，提升测试可信度。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/69003

### #69002 — fix(tui-gateway): 对不存在的会话推理作用域封闭失败
- **要点**: 当 `config set key=reasoning scope=session` 请求的会话已不存在时，应拒绝而不是应用默认值；同时声明严格的作用域契约。
- **重要性**: 避免静默更改配置，提升配置系统的可预测性。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/69002

### #68997 — fix(windows): 统一并收缩 Windows 下 Git 探测的进程树终止
- **要点**: 替代 #68622 / #66038，使用 bounded `communicate` + 进程树终止；避免 `subprocess.run` 超时后无限挂起。
- **重要性**: 彻底修复 Windows 平台 Git 探测死锁问题，影响所有 Windows 用户。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/68997

### #68899 — fix(compression): 防止预算过期导致的重试循环（压缩死亡螺旋）
- **要点**: 修复辅助可行性降低阈值后，尾部预算未同步更新导致的持续重试；状态/循环三处不匹配一并解决。
- **重要性**: 避免长时间运行会话因压缩逻辑错误进入无限重试，消耗大量 token。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/68899

### #68857 — feat(themes): 跨表面主题 SDK（一套皮肤驱动 CLI、TUI、桌面）
- **要点**: Python 皮肤引擎作为唯一事实源，一份 YAML 主题同时作用于 CLI、TUI、桌面 GUI；支持从对话提示生成主题。
- **重要性**: 统一多端视觉体验，降低主题定制门槛，社区期待度高。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/68857

### #69001 — fix(hindsight): 会话切换时清除关闭锁，确保长生命周期 retain 继续执行
- **要点**: `shutdown()` 设置的 `_shutting_down` 在会话切换后未被清除，导致后续 `sync_turn`/`queue_prefetch` 提前返回。现改为在切换锁时重置。
- **重要性**: 修复长时间运行进程中 retain 机制静默失效问题，影响后台记忆持久化。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/69001

### #68996 — fix(approval): 检测操作数后置的递归 rm 标志（移植 openai/codex#33464）
- **要点**: `rm build/ -rf` 现在也会触发审批；GNU rm 允许参数后置标志，原检测模式只覆盖标志前置写法。
- **重要性**: 堵住安全审批绕过漏洞，属于安全边界加固。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/68996

---

## 5. 功能需求趋势

从本期 Issues & PR 中可以提炼出以下社区关注的功能方向：

- **行为与协作质量反馈**：`/behavior` 行为和 5 轴评分代表社区希望了解自己的“使用模式”，而不仅仅是 token 消耗统计。定性反馈成为新趋势。
- **跨端统一主题系统**：一套主题同时控制 CLI、TUI、桌面 GUI，降低定制成本，为 Hermes 多端一致性打下基础。
- **持久化、安全的自治任务**：Kanban 唤醒设计讨论表明社区需要更可靠的自主 Agent 调度，包括重启耐受和授权边界。
- **交互式提醒与反馈**：Cron 提醒加入结构化按钮反馈（Telegram 优先），推动 Agent 从“单向通知”向“闭环交互”演进。
- **供应商与平台适配加固**：Copilot ACP 加固、GPT-5 推理阶梯对齐、Cursor fallback 等，表明用户对非 OpenAI 供应和 fallback 的高依存度。
- **原生 Windows 体验**：多项 PR（#68997, #68991, #68992）专门针对 Windows，社区对一等公民支持的呼声明显。

---

## 6. 开发者关注点

综合今日更新的 Bug 和修复，开发者普遍反映以下痛点：

- **系统提示误触**（#69000）被多位开发者称为“最令人崩溃的 bug”，在长任务中突然丢失上下文，严重影响工作流。
- **Telegram 适配器挂起**（#68989）使通道不可用，且难以隔离复现，增加排查难度。
- **长对话渲染错乱**（#68979）暴露了客户端状态同步的脆弱性，用户不得不手动滚动寻找助手回复。
- **压缩死亡螺旋**（#68899）导致无限 token 消耗，自托管用户反馈成本飙升。
- **Windows 死锁问题**（#68997）已持续三周（#68622 → #66038 → #68997），社区对 Windows 稳定性的耐心正在消耗。
- **Session 恢复脆弱**（#68766、#69001）仍是高频需求，尤其是持续运行的服务器或后台任务场景。
- **Unicode 与国际化显示**（#68990）提示非拉丁语系用户（泰语）在 TUI 中体验不佳，流式字符处理需要更鲁棒的终端检测。

开发者社区普遍期望：**提升长会话可靠性**、**加固 Windows 平台**、**完善安全审批边界**，同时提供更丰富的 **行为洞察** 和 **多端一致体验**。

---

</details>