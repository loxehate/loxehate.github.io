---
title: AI CLI 工具社区动态日报
published: 2026-07-11
report: ai-cli
tags:
  - radar
  - AI
---
# AI CLI 工具社区动态日报 2026-07-11

> 生成时间: 2026-07-11 00:35 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-07-11）

**数据来源**：Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenCode、Qwen Code、Hermes 七份社区动态日报  
**分析日期**：2026-07-11

---

## 1. 生态全景

当前 AI CLI 工具赛道正处于密集迭代期，各工具几乎每日都有版本更新或关键修复。社区反馈集中在三大核心矛盾：**模型能力提升与资源消耗失控**（session 快速耗尽、token 浪费）、**Agent 自主性与用户控制权的平衡**（subagent 配置强制、中断粒度粗糙）、**跨平台体验严重分化**（Windows/Linux 问题远多于 macOS）。安全性正从“可选增强”变为“基础门槛”，多个工具同时强化了路径穿越、提示注入与会话篡改防护。整体来看，工具间功能趋同加速，差异化逐渐从“模型能力”转向“生态开放度与可控性”。

---

## 2. 各工具活跃度对比

| 工具 | 精选热点 Issues | 精选重要 PRs | 当日版本发布 |
|------|----------------|-------------|-------------|
| **Claude Code** | 10 条 | 6 条 | v2.1.206 |
| **OpenAI Codex** | 10 条 | 10 条 | rust-v0.145.0-alpha.3/4 |
| **Gemini CLI** | 10 条 | 10 条 | v0.52.0-nightly |
| **DeepSeek Reasonix** | 10 条（共 29 条） | 10 条（共 32 条） | v1.17.10 |
| **OpenCode** | 10 条 | 10 条 | 无 |
| **Qwen Code** | 10 条 | 10 条 | v0.19.9 |
| **Hermes** | 10 条 | 10 条 | 无 |

> 注：Issues/PR 数量为各日报精选的热点条目，DeepSeek Reasonix 额外给出了当日总量（29 Issues / 32 PRs），表明其社区提交密度最高。

---

## 3. 共同关注的功能方向

### 3.1 资源消耗与交互中断控制
- **Claude Code**：Max 计划 session 快速耗尽（#38335，792 评论）、ESC 杀死所有后台（#21167）
- **OpenAI Codex**：要求关闭自动“解析/解决”打断（#28969，👍104）、Rate Limit 重置失败（#31606）
- **Gemini CLI**：阻止 Auto Memory 对低信号会话无限重试（#26522）
- **DeepSeek Reasonix**：中断后上下文丢失（#6297）、取消对话导致历史丢失（#6260）
- **Qwen Code**：API 流长时间无活动超时（#5975）

**共性诉求**：用户需要更精细的中断/恢复机制、透明可预期的资源消耗、以及对 Agent 自主行为的兜底能力。

### 3.2 多 Agent / Subagent 配置与权限自主权
- **Claude Code**：ESC 无差别终止所有子 Agent（#21167）
- **OpenAI Codex**：MultiAgent V2 强制子 Agent 也用 Sol 模型，无法自定义（#31814，👍81）
- **Gemini CLI**：Subagent 到达 MAX_TURNS 被误报为成功（#22323）、未授权自动运行（#22093）
- **DeepSeek Reasonix**：新增 Subagent 配置页（PR #6310）、插件命令映射（PR #6311）
- **Hermes**：多代理浏览器标签页冲突（#62338）、插件引擎需克隆隔离（#42683）

**共性诉求**：用户要求对子 Agent 的模型、能力、生命周期拥有显式控制权，同时需要清晰的并发隔离和状态报告。

### 3.3 跨平台兼容性与稳定性
- **Claude Code**：Windows 控制台闪烁（#14828）、Linux 鼠标误触权限（#71539）
- **OpenAI Codex**：Windows 11 桌面卡顿（#20214）、整个 Shell 冻结（#16374）
- **Gemini CLI**：Windows OAuth 循环（#28348）、Wayland 下 browser 失败（#21983）
- **DeepSeek Reasonix**：IntelliJ 终端输入不同步（#6284）、Windows 编码读取（#6276）
- **OpenCode**：Windows TUI 启动失败（#35828）
- **Qwen Code**：macOS 粘贴图片失效（#6590）
- **Hermes**：NVIDIA 新驱动下桌面崩溃（#40077）

**共性诉求**：Windows 和 Linux 的问题数量远超 macOS，社区通过 PR 主动为缺失平台补位（如 Windows 启动器 #76394），平台体验已成为用户留存的关键短板。

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 特色功能 / 侧重 | 典型用户 |
|------|---------|-------------|---------|
| **Claude Code** | Anthropic 官方 CLI，深度绑定 Fable 系列模型 | TUI 全屏模式、`/doctor` 检查、Advisor 模式、Claude.md 规范 | Claude 付费用户、追求深度 IDE 替代的开发者 |
| **OpenAI Codex** | OpenAI 官方 CLI，专注多 Agent 与 Bedrock 生态 | MultiAgent V2、Interrupt Hooks、模型元数据精细控制 | GPT/Sol 系列用户、AWS Bedrock 企业用户 |
| **Gemini CLI** | Google 官方 CLI，强调安全评估与组件级测试 | AST 感知搜索、AGENTS.md 自动包含、沙箱安全加固 | 对合规和安全要求高的团队、Google Cloud 生态 |
| **DeepSeek Reasonix** | 开源社区驱动，聚焦数据安全与 Agent 插件化 | Subagent 配置页面、Claude 插件命令映射、对抗数据丢失 | 注重可扩展性的中高级开发者、中文社区 |
| **OpenCode** | 轻量级跨平台 CLI，重视移动端与 V2 重写 | `--model free` 降低门槛、强移动端需求、V2 TUI 统一 | 独立开发者、偏好轻量工具的用户 |
| **Qwen Code** | 阿里 Qwen 官方 CLI，侧重团队协作与多工作区 | 多工作区 daemon（RFC #6378）、SDK ask_user_question、WebShell 右侧面板 | 阿里云用户、团队协作与 CI/CD 场景 |
| **Hermes** | 开源 Agent 框架，多代理并发与安全加固 | 浏览器配置文件隔离、OAuth refresh 修复、TheWon 部署门控 | 构建复杂多 Agent 工作流的开发者、安全敏感用户 |

---

## 5. 社区热度与成熟度

**Claude Code** 的社区热度最高——单个 Issue（#38335）评论达 792 条、👍468，但其大量争议也反映出用户对模型行为与成本的不满。**OpenAI Codex** 和 **Gemini CLI** 日均 PR 密度高（各 10 条），社区反馈集中在配置自主性与稳定性。**DeepSeek Reasonix** 当日提交量最多（29 Issues / 32 PRs），正处于功能爆炸式扩张期，但“数据丢失”类 Bug 密集爆发，显示快速迭代与质量之间的张力。**Qwen Code** 和 **Hermes** 各有明确功能主线（多工作区、多代理安全），社区讨论聚焦而非泛化。**OpenCode** 因移动端呼声（#10288，👍89）为特点，V2 版本打磨中，尚未进入稳定期。

在成熟度方面，Claude Code 和 OpenAI Codex 版本号较高（2.1.x、0.145.x），功能覆盖面广，但仍有严重 Regression。Gemini CLI v0.52 仍处快速迭代。DeepSeek Reasonix v1.17 和 Qwen Code v0.19 处于中后期打磨。OpenCode v1.17 稳定但 V2 在途。Hermes 无明确版本号，但从 Issue 密度看仍在核心增强阶段。

**简评**：Claude Code 社区最活跃但口碑两极，OpenAI Codex 与 Gemini CLI 聚焦“可控性”，Qwen Code 和 DeepSeek Reasonix 在团队协作/插件化方面后来居上。

---

## 6. 值得关注的趋势信号

### 6.1 用户对“成本/消耗透明度”的容忍度正在触顶
Max 计划 session 快速耗尽（Claude Code #38335）、Auto Memory 无限重试（Gemini CLI #26522）、Prompt Cache 继承断裂（OpenAI Codex #24704）等说明：无论按量计费还是 token 消耗，用户已不再接受黑箱资源管理。**持续报告即时消耗、提供限额预警、允许手动中断**将成为 CLI 工具的基本要求。

### 6.2 安全正从“功能增强”升级为“准入条件”
同日三个工具（Gemini CLI、Hermes、Claude Code）都包含了路径穿越、提示注入、会话写入防护等修复。**Agent 可以访问用户文件和网络，意味着每一层权限验证、每一条命令拦截都可能成为攻击面。** 行业正在将安全审查纳入 CI 流程，而非事后补丁。

### 6.3 多 Agent 编排正在引发“并发治理”新问题
MultiAgent V2 配置强制（Codex）、子 Agent 状态误报（Gemini）、ESC 误杀全部（Claude）、浏览器标签页冲突（Hermes）反映：**多 Agent 协作已从“能不能用”进入“怎么安全高效地管理”阶段。** 预计未来半年会涌现出标准的 Agent 生命周期管理（状态上报、资源隔离、优雅取消）设计模式。

### 6.4 跨平台体验不均是最大的“隐形流失点”
Windows 控制台闪烁、Shell 冻结、认证循环，Linux 鼠标误触、Wayland 失败……这些问题反复出现且长期未根除。对比之下，macOS 用户的问题数量明显更少。**对于面向全球开发者的工具，Windows/Linux 体验的质量直接决定了市占率天花板。**

### 6.5 新模型发布与工具链滞后的“时间差”正在扩大
Fable 5、GPT-5.6 Luna、qwen3.7-max 等新模型在不同工具中均出现了异常行为（静默调用、标签泄露、参数不兼容）。**用户不再接受“先发模型，再修工具”，而是期望联合灰度测试或后向兼容承诺。** 这表明工具与模型的耦合度需要更紧密的测试协同。

---

*本报告基于各工具在 2026-07-11 公开的社区动态，数据截止至 2026-07-10。所有议题均可从对应 GitHub 仓库查阅原始讨论。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

好的，以下是根据 `github.com/anthropics/skills` 仓库数据（截至 2026-07-11）生成的社区热点报告。

---

### 1. 热门 Skills 排行（按社区关注度排序）

**1. skill-creator 修复系列（#1298 / #1323 / #1261 / #1099 / #1050）**
- **功能**：修复 `run_eval.py` 在评估时始终报 `recall=0%` 的核心 Bug，以及 Windows 子进程兼容性（PATHEXT、cp1252 编码）问题。
- **热点**：关联 Issue #556（12 条评论）和 #1061，被多次独立复现。这是当前社区最大的的技术债务，直接阻塞了技能描述优化流程。
- **状态**：Open
- 链接：[#1298](https://github.com/anthropics/skills/pull/1298) / [#1323](https://github.com/anthropics/skills/pull/1323)

**2. #1367 self-audit（推理质量门控）**
- **功能**：输出交付前的“机械文件校验 + 四维推理审计”（优先级从破坏性到完整性排序）。
- **热点**：社区对 Agent 输出质量控制的自上而下提案，功能设计全面，被视为“交付前的最后安全网”。
- **状态**：Open
- 链接：[#1367](https://github.com/anthropics/skills/pull/1367)

**3. #723 testing-patterns（测试模式技能）**
- **功能**：基于“测试奖杯”模型，覆盖单元测试（AAA 模式）、React 组件测试、E2E 及测试哲学。
- **热点**：社区呼声极高的实用技能，填补了官方集合中关于测试标准化指导的空白。
- **状态**：Open
- 链接：[#723](https://github.com/anthropics/skills/pull/723)

**4. #514 document-typography（文档排版控制）**
- **功能**：解决 AI 生成文档中的孤字成行、段落孤行、编号错位等排版缺陷。
- **热点**：直面 AI 文档输出的显性质量瑕疵，用户感知强烈，被认为是提升文档专业度的“最小代价高回报”技能。
- **状态**：Open
- 链接：[#514](https://github.com/anthropics/skills/pull/514)

**5. #1302 color-expert（色彩专家）**
- **功能**：自包含的色彩专业知识库，覆盖 ISCC-NBS、Munsell、OKLCH、RAL 等色彩体系及转换建议。
- **热点**：由知名色彩作者 @meodai 贡献，知识密度极高，展示了 Skill 在特定垂直领域深度挖掘的潜力。
- **状态**：Open
- 链接：[#1302](https://github.com/anthropics/skills/pull/1302)

**6. #83 skill-quality-analyzer（技能质量分析器）**
- **功能**：元技能，从结构文档、触发精度、安全合规等五个维度评估其他 Skill 的质量。
- **热点**：出现较早但概念超前。随着仓库 Skill 数量增加，社区对“如何评价 Skill 好坏”的自检需求逐步上升。
- **状态**：Open
- 链接：[#83](https://github.com/anthropics/skills/pull/83)

---

### 2. 社区需求趋势（从 Issues 提炼）

- **工具链稳定性与跨平台（最强烈诉求）**
  `skill-creator` 脚本的 `recall=0%`（#556）和 Windows 兼容性崩溃（#1061）是最多开发者抱怨的问题。修复这些基础设施 Bug 是其他一切创新的前提。

- **安全与信任机制**
  Issue #492（34 条评论）揭示了社区对 `anthropic/` 命名空间下的信任边界焦虑，用户呼吁区分官方与社区技能。此外，关于 SharePoint 访问控制（#1175）和 Agent 治理（#412）的讨论也表明企业对安全合规的刚需。

- **组织级分发与协作**
  #228（14 条评论）要求支持 Org 级别的 Skill 管理，当前依赖手动下载上传的方式在大规模团队中无法落地。

- **垂直深度技能替换通用指南**
  社区不再接受泛泛的提示词，而是提交极具体的专业技能，如 ODT 格式处理（#486）、SAP 数据预测（#181）、紧凑记忆符号系统（#1329）。

---

### 3. 高潜力待合并 Skills（有望近期落地）

- **#1367 self-audit**：近期更新频繁（2026-07-02），设计理念与 Anthropic 追求安全可控 Agent 的路线高度吻合，极有可能作为官方推荐合并。
- **#723 testing-patterns**：代码量扎实、覆盖面全，是软件工程领域的基座技能，合并优先级较高。
- **#514 document-typography**：改动风险极低（纯新增排版约束规则），痛点明确，容易被接受。
- **#1302 color-expert**：内容独立且权威，合并后可迅速成为色彩领域的标杆 Skill。
- **#1298 / #1261（run_eval 修复系列）**：虽然是修复类 PR，但因其触及核心流程，官方审核较为谨慎，但仍属于必须合并的“阻塞项”。

---

### 4. Skills 生态洞察

**当前社区最集中的诉求是：全力攻坚 `skill-creator` 工具链的基础稳定性与跨平台兼容性，同时积极涌现面向排版、测试、色彩、审计等特定领域的深度专业化技能。**

一句话总结：**”基础不牢（工具链 Bug 多 / 跨平台差）与上层兴旺（垂直深度技能井喷）并存，修复 Developer Experience 是解锁生态全速发展的唯一钥匙。“**

---

# 2026-07-11 Claude Code 社区动态日报

---

## 今日速览

- **新版本 v2.1.206 发布**，改进了目录切换体验、新增 `/doctor` 命令帮助清理冗余的 `CLAUDE.md`，并让 `/commit-push-pr` 自动放行 `git push`。
- **社区核心争议仍在发酵**：#38335（Max 计划 session 异常快速耗尽）评论已逼近 800 条，#70539（仅滚轮鼠标模式）获赞 68，体现了用户对基础体验优化的强烈期待。
- **Fable 5 系列问题（#66960、#74260、#76189）集中出现**，涉及静默工具调用、文本块丢失、Advisor 不可用，模型可靠性再次成为焦点。

---

## 版本发布

### v2.1.206

**更新内容：**
- **`/cd` 增加目录路径建议**，行为与 `/add-dir` 一致，切换目录更智能。
- **新增 `/doctor` 检查**：可识别并建议裁剪已检入仓库的 `CLAUDE.md` 中 Claude 能从代码库自行推导的内容，帮助保持文档精简。
- **`/commit-push-pr` 自动放行 `git push`**：不再因默认安全策略中断推送流程，需仓库已配置远程。

---

## 社区热点 Issues（10 条）

### 1. [#38335] Claude Max 计划 session 限制异常快速耗尽（CLI 使用）
- **标签**：`[BUG]`  
- **更新**：2026-07-10 | **评论**：792 | **👍**：468  
- **摘要**：自 2026 年 3 月 23 日起，大量 Max 套餐用户在 CLI 中的 session 限额消耗速度远高于预期，严重影响正常开发。社区争议极大，Anthropic 尚未给出根本性修复。
- **链接**：https://github.com/anthropics/claude-code/issues/38335

### 2. [#14828] Windows 下执行工具时控制台窗口闪烁
- **标签**：`[BUG]` `platform:windows` `area:tools`  
- **更新**：2026-07-11 | **评论**：40 | **👍**：33  
- **摘要**：每次调用 Bash、Read 等工具都会导致额外控制台窗口瞬时闪烁，长期未解决，严重影响 Windows 开发者使用体验。
- **链接**：https://github.com/anthropics/claude-code/issues/14828

### 3. [#66960] Fable 5 模型行为：16 分钟静默工具调用后才 AskUserQuestion
- **标签**：`[BUG]` `platform:linux` `area:model`  
- **更新**：2026-07-10 | **评论**：9 | **👍**：5  
- **摘要**：在第三方 AI 破坏工作区的紧急场景下，Claude Code（Fable 5）静默执行了 16 分钟工具调用，没有任何输出，最终才向用户提问。在事故响应中造成严重延误，社区评价极差。
- **链接**：https://github.com/anthropics/claude-code/issues/66960

### 4. [#71539] 鼠标点击重新聚焦终端触发意外权限提示
- **标签**：`[BUG]` `platform:linux` `area:permissions`  
- **更新**：2026-07-10 | **评论**：8 | **👍**：17  
- **摘要**：Linux 用户点击终端窗口以获取焦点时，如果光标位于某个交互元素上方，会意外触发权限确认请求，而非单纯聚焦。此行为严重破坏工作流。
- **链接**：https://github.com/anthropics/claude-code/issues/71539

### 5. [#70539] [Feature Request] 添加仅滚轮鼠标模式，禁用点击保留滚动
- **标签**：`[ENHANCEMENT]` `platform:linux` `area:tui`  
- **更新**：2026-07-10 | **评论**：7 | **👍**：68  
- **摘要**：全屏模式下鼠标点击常误触按钮或展开工具输出，用户强烈希望拥有“仅滚动”模式。68 个 👍 反映了普遍需求。
- **链接**：https://github.com/anthropics/claude-code/issues/70539

### 6. [#21167] ESC 键杀死所有后台任务/子代理——并行工作流体验糟糕
- **标签**：`[BUG]` `area:tui`  
- **更新**：2026-07-11 | **评论**：7 | **👍**：9  
- **摘要**：按 ESC 会终止 **所有** 后台运行的任务和子代理（如 3 个并行 agent），而非仅取消当前操作。误触风险高，用户呼吁引入粒度化取消机制。
- **链接**：https://github.com/anthropics/claude-code/issues/21167

### 7. [#74260] 助手文本块在后续思考块前被静默丢弃（数据丢失）
- **标签**：`[BUG]` `data-loss` `platform:macos` `area:core`  
- **更新**：2026-07-10 | **评论**：5 | **👍**：0  
- **摘要**：在 Fable 5 自适应思考模式下，如果同一轮中出现连续 text + thinking 块，首个 text 块既不在 TUI 中渲染，也不出现在导出的 JSONL 转录中。数据静默丢失，影响审计与调试。
- **链接**：https://github.com/anthropics/claude-code/issues/74260

### 8. [#70438] VS Code 扩展中 AskUserQuestion 组件只渲染标题后挂起
- **标签**：`[BUG]` `platform:vscode` `area:skills`  
- **更新**：2026-07-10 | **评论**：4 | **👍**：3  
- **摘要**：在 VS Code 聊天面板中，由 Skill 调用 AskUserQuestion 时，界面仅显示一个彩点 + 标题，交互卡片和选项完全不渲染，导致会话永久挂起。
- **链接**：https://github.com/anthropics/claude-code/issues/70438

### 9. [#76189] Advisor（Fable 5）只要会话有过工具调用就返回 "unavailable"
- **标签**：`[BUG]` `platform:macos` `area:model`  
- **更新**：2026-07-10 | **评论**：3 | **👍**：1  
- **摘要**：一旦 transcript 中包含任意工具调用（如 `Bash(ls)`），Fable 5 的 Advisor 功能立即返回 `advisor_tool_result_error` 并附带 "unavailable"。Opus advisor 则不受影响。这使 Advisor 在大多数实际场景中不可用。
- **链接**：https://github.com/anthropics/claude-code/issues/76189

### 10. [#49979] Chrome MCP 工具拒绝所有域名且权限弹窗不显示（Windows 11）
- **标签**：`[BUG]` `platform:windows` `area:desktop`  
- **更新**：2026-07-10 | **评论**：9 | **👍**：2  
- **摘要**：从 Claude Desktop 调用 `Claude_in_Chrome__navigate` 和 `read_page` 时，所有域名均被拒，且没有任何批准弹窗。至少关联 4 个重复 issue，核心 MCP 功能受阻。
- **链接**：https://github.com/anthropics/claude-code/issues/49979

---

## 重要 PR 进展（共 6 条）

### 1. [#41447] feat: open source claude code ✨
- **状态**：OPEN | **更新**：2026-07-10  
- **摘要**：社区提交的开源 Claude Code PR，虽不具备实际合并可能性，但反映了用户对开放源码的长期呼声。
- **链接**：https://github.com/anthropics/claude-code/pull/41447

### 2. [#76475] 安全指导：检测 innerHTML/outerHTML `+=` 附加操作
- **状态**：OPEN | **更新**：2026-07-10  
- **摘要**：现有 `innerHTML_xss` 规则仅匹配赋值（`=`），遗漏 `+=` 式追加。该 PR 修复此模式，提升安全审计的覆盖度。
- **链接**：https://github.com/anthropics/claude-code/pull/76475

### 3. [#76394] 添加 Claude Code Launcher —— Windows CLI 应用
- **状态**：OPEN | **更新**：2026-07-10  
- **摘要**：由社区贡献的完整 Windows（PowerShell）启动器，包含 14 个交互式菜单选项，旨在提升 Windows 平台的 Claude Code 使用体验。
- **链接**：https://github.com/anthropics/claude-code/pull/76394

### 4. [#76298] 文档：记录远程控制后台任务面板（#75884）
- **状态**：OPEN | **更新**：2026-07-10  
- **摘要**：为 v2.1.205 新增的 Web/Mobile 后台任务面板补充文档，描述任务状态同步行为。
- **链接**：https://github.com/anthropics/claude-code/pull/76298

### 5. [#76289] 示例/hooks：演示复合命令预检（bash_validator）
- **状态**：OPEN | **更新**：2026-07-10  
- **摘要**：扩展 bash 命令验证示例，展示如何检测命令链（`;`、`&&`、`||`）、管道白名单、命令替换等，帮助用户编写更稳健的安全钩子。
- **链接**：https://github.com/anthropics/claude-code/pull/76289

### 6. [#76274] security-guidance：审查路径锚定到仓库根目录并强化 findings 数组契约
- **状态**：OPEN | **更新**：2026-07-10  
- **摘要**：修复安全指导插件中文件路径解析问题，统一相对路径、仓库根路径和外部绝对路径的格式，避免误报或遗漏。
- **链接**：https://github.com/anthropics/claude-code/pull/76274

---

## 功能需求趋势

1. **鼠标交互精细化控制**  
   - 多起 issue（#70539、#76528、#71539）指向：全屏模式下点击与滚动未分离，导致误触权限弹窗或按钮。社区要求提供“仅滚轮模式”或可配置的点击/选择阈值。

2. **后台任务与并行工作流管理**  
   - `ESC 取消全部`（#21167）和新增的远程控制面板（PR #76298）表明用户越来越依赖多 agent 并行，急需粒度化的任务取消、状态查看和后台隔离能力。

3. **Fable 5 模型行为的可预测性与可靠性**  
   - 本周多起 issue 集中反映 Fable 5 在工具调用链、Advisor、文本渲染方面的问题（#66960、#74260、#76189）。社区对模型“黑盒”行为的不满加剧，要求更强的可观测性和输出完整性保障。

4. **平台特定体验优化（Windows、Linux）**  
   - Windows 控制台闪烁（#14828）、Linux 鼠标权限误触（#71539）持续吸引关注。社区通过 PR #76394 主动为 Windows 打造启动器，显示平台支持缺口。

---

## 开发者关注点

- **模型质量与成本失衡**：尽管 Fable 5 被视为新一代模型，但静默调用、token 浪费（#74012）、会话限制快速耗尽（#38335）让部分开发者产生“付出双倍价格却没提升”的抱怨（#73910、#73975）。Session 限额和账单透明度成为高频词。
- **权限提示过于敏感**：鼠标点击触发权限确认（#71539）、ESC 误杀后台（#21167）、Chrome MCP 弹窗不出现（#49979）等问题使权限判断频繁打断工作流。用户期望更智能的场景感知权限管理。
- **数据丢失与调试困难**：#74260 暴露的文本块静默丢弃让用户担忧对话完整性；#70438 的 VSCode 扩展挂起则降低了 IDE 集成的可靠性。这类直接影响产出的问题优先级最高。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

好的，这是根据您提供的 GitHub 数据生成的 OpenAI Codex 社区动态日报。

---

### OpenAI Codex 社区动态日报 | 2026-07-11

#### 1. 今日速览
今日社区焦点主要集中在 **MultiAgent V2 的配置局限性**（#31814）以及 **Windows 平台的性能顽疾**（#20214）。开发团队积极响应，合并了修复推理摘要兼容性（#32290）、限制 Subagent 环境（#31662）和多项底层性能优化的 PR。此外，广受诟病的 VS Code 历史记录丢失问题（#18993）今日确认修复。

#### 2. 版本发布
- **rust-v0.145.0-alpha.3 / rust-v0.145.0-alpha.4**: 连续推送了两个 Alpha 迭代版本，主要针对 Codex 后端（Rust 层）进行快速修复。暂无详细 Changelog，建议遇到 CLI 或 App Server 相关异常的用户更新至最新 Alpha 版本测试。

#### 3. 社区热点 Issues
1. **[热议中] MultiAgent V2 强制 Subagent 模型配置引发争议**
   - [#31814](https://github.com/openai/codex/issues/31814) - GPT-5.6 Sol 强制子代理也使用 Sol 模型。用户 `@spadaval` 指出，`MultiAgent V2` 通过模型元数据自行启用，并默认隐藏了 `hide_spawn_agent_metadata` 配置，导致用户无法灵活指定子代理模型。社区强烈要求恢复配置自主权。（👍 81, 💬 32）

2. **[高需求] 请求增加关闭自动“解析/解决”的开关**
   - [#28969](https://github.com/openai/codex/issues/28969) - 以 **104** 个 👍 高居今日需求榜首。大量用户反感系统在 60 秒内自动关闭等待状态，认为该机制粗暴地打断了深度思考或复杂任务的工作流。（👍 104, 💬 22）

3. **[已修复] VS Code 扩展无法打开历史会话**
   - [#18993](https://github.com/openai/codex/issues/18993) - 困扰大量用户数月的回归问题终于得到修复。该问题导致 Plus 订阅用户在 Windows 上的 VS Code 扩展无法访问过去的对话历史。（👍 54, 💬 49）

4. **[持续痛点] Windows 11 桌面应用频繁卡顿**
   - [#20214](https://github.com/openai/codex/issues/20214) - 尽管系统资源充足（AMD Ryzen 5, 32GB RAM），Codex App 在 Windows 11 Pro 上仍出现严重界面冻结和卡顿。这是当前 Windows 用户最大的体验瓶颈。（👍 45, 💬 31）

5. **[严重计费Bug] Rate Limit 重置失败，消耗付费权益**
   - [#31606](https://github.com/openai/codex/issues/31606) - Pro 用户使用重置功能后，次数被扣除但额度并未生效，直接触犯用户钱袋子。该问题引发了社区对计费透明度和退款的严厉质询。（👍 25, 💬 23）

6. **[平台稳定性] 桌面应用导致整个 Windows Shell 冻结**
   - [#16374](https://github.com/openai/codex/issues/16374) - 问题严重程度极高。Codex App 会导致整个 Windows 11 界面僵死，而一个奇怪的临时解决方案是打开 Codex 设置页面。（👍 10, 💬 26）

7. **[功能阻塞] macOS 上 Computer Use 启动崩溃**
   - [#32032](https://github.com/openai/codex/issues/32032) - 由于 macOS 15.7.7 系统缺失 Swift 并发性符号（dyld），Computer Use 功能完全无法启动。这对于依赖此功能的 macOS 开发者是致命打击。（👍 9, 💬 14）

8. **[模型兼容性] GPT-5.3 Spark 模型抛出参数错误**
   - [#31846](https://github.com/openai/codex/issues/31846) - 系统向 GPT-5.3 Spark 发送了其不支持的 `reasoning.summary` 参数，导致任务直接失败。此类模型元数据与实际支持能力不匹配的问题频发，引发社区对测试质量的质疑。（👍 13, 💬 6）

9. **[技术深度] Fork 出的 Subagent 丢失 Prompt Cache 继承**
   - [#24704](https://github.com/openai/codex/issues/24704) - 开发者关注的深层技术问题。当从父 Agent Fork 出子 Agent 时，即便继承了上下文，但失去了 Prompt Cache 的血缘关系，导致费用飙升和响应变慢。（👍 9, 💬 4）

10. **[远程开发] Codex 扩展导致 Code-server 侧边栏冻结**
    - [#28726](https://github.com/openai/codex/issues/28726) - 在基于 Chromium 的桌面浏览器中，Codex 集成会导致 code-server 的侧边栏完全冻结。这严重影响了使用 WebIDE 进行远程开发的团队，但在手机上却正常工作。（👍 1, 💬 15）

#### 4. 重要 PR 进展
1. **修复模型推理摘要兼容性** - [#32290](https://github.com/openai/codex/pull/32290): 合入。直接在模型元数据中添加 `supports_reasoning_summary_parameter` 标记，当模型不支持时自动省略相关参数，从根源上杜绝 #31846 等问题。
2. **默认模型更新** - [#32288](https://github.com/openai/codex/pull/32288): 合入。在 Amazon Bedrock 环境中将 GPT-5.6 Sol、Terra、Luna 系列排在最前，确立了 Sol 在 Bedrock 上的默认地位。
3. **限制 Subagent 运行环境** - [#31662](https://github.com/openai/codex/pull/31662): 合入。为 `spawn_agent` API 增加可选参数，允许对 Subagent 的 Capability Root 和 Environment ID 进行限制，直接回应用户对 #31814 的控制权诉求。
4. **加速反向历史搜索** - [#30887](https://github.com/openai/codex/pull/30887): 合入。重写了历史记录搜索逻辑，消除逐条锁定扫描 `history.jsonl` 的瓶颈，大幅提升 TUI 和 CLI 中的翻页检索体验。
5. **减少冗余文件系统调用** - [#31514](https://github.com/openai/codex/pull/31514): 合入。包含多项 I/O 优化（避免重复打开已打开的文件、保留文件搜索时的目录分类结果等），对长会话和文件密集型任务的性能提升显著。
6. **模型容量错误自动重试** - [#31058](https://github.com/openai/codex/pull/31058): 开启审查。引入三级等待重试策略（30s/2m/5m），将模型容量不足视为可恢复的瞬态错误，而非直接终止 Turn，提升了服务在高负载下的鲁棒性。
7. **修复 IDE 提及自动补全目标** - [#30463](https://github.com/openai/codex/pull/30463): 合入。修复了在输入 `$skill` 时，光标在两个提及之间时自动补全目标判定不准确的问题。
8. **增加中断（Interrupt）钩子** - [#26259](https://github.com/openai/codex/pull/26259): 合入。新增 `Advisory Interrupt Hooks`，允许开发者在 Turn 被中断时执行轻量级记录或清理工作，而不阻塞中断流程。
9. **模型指令分离人格设定** - [#32277](https://github.com/openai/codex/pull/32277): 合入。当模型配置中 `personality = "none"` 时，系统将不在 base instructions 中发送 `# Personality` 区块，提供更纯净的零人格交互模式。
10. **修正 Windows 网络代理提权策略** - [#31437](https://github.com/openai/codex/pull/31437): 开启审查。修复了之前只要有代理就强制提权导致意外 UAC 弹窗的问题，改后端选择遵循沙箱等级，避免不必要的权限提升。

#### 5. 功能需求趋势
- **配置自主权是核心矛盾**：社区的核心诉求从“增加功能”转向了“**拿回控制权**”。包括要求显式控制 Subagent 的模型选型、关闭 Auto-resolve 打断、自定义 Reasoning 参数等，用户希望成为决策链的最终控制者。
- **性能优化是平台生命线**：尤其在 **Windows 平台**，UI 渲染卡顿和系统 Shell 挂起问题已成为新用户增长和留存的最大阻碍。代码库（Code-server）的性能衰减也是开发者社区的关注焦点。
- **计费公平性与系统稳定性**：用户对直接触及经济利益的问题（如 Rate Limit 重置失败、Prompt Cache 失效导致额外扣费）容忍度极低，此类 Bug 的优先级必须升至最高。
- **平台体验差距亟待抹平**：Windows 平台的问题数量与严重程度远超 macOS，特别是系统集成层面的问题（内核池泄漏、UAC、安装器失败），Codex 团队急需补齐 Windows 生态的适配短板。

#### 6. 开发者关注点
- **Prompt Cache 的经济生态**：Subagent 继承丢失 Cache Lineage（#24704）是 CLI 重度用户的一个隐形压力来源。开发者在追求复杂的 Agent 协作同时，非常在意由此带来的直接成本增加。
- **CLI 与远端工作流的成熟度**：在自动化运维与 CI/CD 集成中，CLI 的诸多小缺陷（如无线程选择器、自定义 Agent 失效）被放大，阻碍了高级脚本和自动化工作流的实现。
- **新模型的工具链兼容性**：无论是 IDE、CLI 还是 App，对新发布模型（如 Spark, Sol）的同步支持总是慢半拍或出现兼容性 Bug（#31846, #32146）。开发者期望大版本更新前能做好工具链的全面灰度测试。
- **基础功能的可靠性回归**：VS Code 扩展反复出现“历史记录丢失”、“自动补全失效”等基础功能 Regression，社区对“重造轮子”式的激进改动抱有戒心，更渴望当前功能的稳健迭代。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-07-11

## 今日速览
- 发布 v0.52.0-nightly 版本，修复 thought 泄漏和 CI 文件排除问题。
- 社区反馈聚焦于 Agent/Subagent 状态误报、shell 命令卡死以及权限控制缺失。
- 安全加固成为 PR 主旋律，包含路径穿越、TOCTOU、提示注入等多处修复。

---

## 版本发布

**v0.52.0-nightly.20260710.ga4c91ce19**  
- fix(core): 修剪 scrubbed history 中的 thought 字段，解决 thought 泄漏问题（@amelidev）  
- refactor: 将临时 CI 配置文件从工作区上下文中排除（@DavidAPierce）  
链接：[Release v0.52.0-nightly.20260710.ga4c91ce19](https://github.com/google-gemini/gemini-cli/releases/tag/v0.52.0-nightly.20260710.ga4c91ce19)

---

## 社区热点 Issues（10 条）

1. **[#22323] Subagent 到达 MAX_TURNS 后被误报为 GOAL 成功**  
   子智能体因达到最大轮次中断，却被报告 `status: "success"`，隐藏真实终止原因。严重影响调试可靠性。  
   [https://github.com/google-gemini/gemini-cli/issues/22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **[#21409] Generalist agent 永久挂起**  
   大量用户反馈 CLI 委托给通用 agent 时无响应，一度等待数小时。临时方案是禁止使用子智能体。  
   [https://github.com/google-gemini/gemini-cli/issues/21409](https://github.com/google-gemini/gemini-cli/issues/21409)

3. **[#19873] 利用模型原生 bash 能力，实现零依赖 OS 沙箱与意图路由**  
   提议让模型直接使用 POSIX 工具，同时通过沙箱保障安全。社区讨论热烈，被认为是关键改进方向。  
   [https://github.com/google-gemini/gemini-cli/issues/19873](https://github.com/google-gemini/gemini-cli/issues/19873)

4. **[#24353] 建立稳健的组件级评估体系**  
   在行为评估基础上，需细化到组件级别以提升测试覆盖。已生成 76 条评估用例，社区认为这是质量保障的基础。  
   [https://github.com/google-gemini/gemini-cli/issues/24353](https://github.com/google-gemini/gemini-cli/issues/24353)

5. **[#22745] 评估 AST 感知文件读取、搜索与映射**  
   利用 AST 精确读取方法边界、减少令牌噪声、提升代码导航效率。开发者期待该特性降低大模型误读。  
   [https://github.com/google-gemini/gemini-cli/issues/22745](https://github.com/google-gemini/gemini-cli/issues/22745)

6. **[#26522] 阻止 Auto Memory 对低信号会话无限重试**  
   内存系统会反复处理低价值的 session，导致计算浪费。需要引入跳过机制。  
   [https://github.com/google-gemini/gemini-cli/issues/26522](https://github.com/google-gemini/gemini-cli/issues/26522)

7. **[#25166] Shell 命令执行完毕后仍显示“等待输入”并卡死**  
   极简命令完成后 CLI 仍显示活动状态和等待输入，必须强制结束。高赞 bug，影响日常使用。  
   [https://github.com/google-gemini/gemini-cli/issues/25166](https://github.com/google-gemini/gemini-cli/issues/25166)

8. **[#21983] Browser subagent 在 Wayland 下失败**  
   Wayland 环境中浏览器子智能体无法正常运行，收到 “Termination Reason: GOAL”。平台兼容性待修复。  
   [https://github.com/google-gemini/gemini-cli/issues/21983](https://github.com/google-gemini/gemini-cli/issues/21983)

9. **[#22672] Agent 应主动阻止/劝阻破坏性行为**  
   模型在 git reset、force 操作时缺少安全引导，社区呼吁增加防护机制。  
   [https://github.com/google-gemini/gemini-cli/issues/22672](https://github.com/google-gemini/gemini-cli/issues/22672)

10. **[#22093] 子智能体在未授权情况下自动运行**  
    更新到 v0.33.0 后，即使配置为禁用，子智能体仍被调用。权限控制存在漏洞，影响安全预期。  
    [https://github.com/google-gemini/gemini-cli/issues/22093](https://github.com/google-gemini/gemini-cli/issues/22093)

---

## 重要 PR 进展（10 条）

1. **[#28316] fix(a2a-server): 确保任务取消终止执行循环**  
   修复取消 Agent 模式任务后底层流未停止导致的“幽灵执行”问题。  
   [https://github.com/google-gemini/gemini-cli/pull/28316](https://github.com/google-gemini/gemini-cli/pull/28316)

2. **[#28319] refactor(a2a-server): 强制路径信任检查与环境加载隔离**  
   工作区路径信任验证前置到环境变量加载之前，并使用 AsyncLocalStorage 隔离任务环境。  
   [https://github.com/google-gemini/gemini-cli/pull/28319](https://github.com/google-gemini/gemini-cli/pull/28319)

3. **[#28353] fix(a2a-server): 阻止 restore 命令路径穿越**  
   对用户输入的路径进行规范化与包含检查，防止读取 `checkpointDir` 之外的文件。  
   [https://github.com/google-gemini/gemini-cli/pull/28353](https://github.com/google-gemini/gemini-cli/pull/28353)

4. **[#28352] fix(caretaker): 转义并包裹 issue 标题以防提示注入**  
   在 caretaker 摄取服务中，对 issue 标题中的 `</untrusted_context>` 进行转义，关闭安全缺口。  
   [https://github.com/google-gemini/gemini-cli/pull/28352](https://github.com/google-gemini/gemini-cli/pull/28352)

5. **[#28345] feat(caretaker-triage): 实现 LLM 分类编排器与容器构建**  
   使用 Antigravity SDK 实现 LLM 推理编排，并增加 GCS 调试日志与 Cloud Run Job 构建定义。  
   [https://github.com/google-gemini/gemini-cli/pull/28345](https://github.com/google-gemini/gemini-cli/pull/28345)

6. **[#28330] fix(ide-companion): 原子设置 token 文件权限消除 TOCTOU 窗口**  
   将 `writeFile` 与 `chmod` 合并为原子操作，避免授权文件短暂全局可读。  
   [https://github.com/google-gemini/gemini-cli/pull/28330](https://github.com/google-gemini/gemini-cli/pull/28330)

7. **[#28349] fix(cli): 防止自定义深度合并中的循环引用崩溃**  
   `customDeepMerge` 增加循环检测，避免包含自引用的 settings 对象导致栈溢出。  
   [https://github.com/google-gemini/gemini-cli/pull/28349](https://github.com/google-gemini/gemini-cli/pull/28349)

8. **[#28348] fix: 解决 MaxListenersExceededWarning 与无限认证循环**  
   修复 API 重试时监听器过多导致的警告，以及 Windows OAuth 成功后进入无限认证循环的问题。  
   [https://github.com/google-gemini/gemini-cli/pull/28348](https://github.com/google-gemini/gemini-cli/pull/28348)

9. **[#28240] 默认支持 AGENTS.md 上下文文件**  
   现在无需手动配置，`AGENTS.md` 会与 `GEMINI.md` 一起自动包含在 memory 工具上下文中。  
   [https://github.com/google-gemini/gemini-cli/pull/28240](https://github.com/google-gemini/gemini-cli/pull/28240)

10. **[#28143] fix(core): 按服务器解析 MCP 资源，防止跨服务器混淆**  
    当两个 MCP 服务器暴露相同 URI 时，资源读取会返回错误内容。现在资源按服务器标识进行隔离。已在昨日合并。  
    [https://github.com/google-gemini/gemini-cli/pull/28143](https://github.com/google-gemini/gemini-cli/pull/28143)

---

## 功能需求趋势

- **Agent 自主性提升**：社区期望模型更主动地使用自定义 skill 和子智能体，而非等待显式指令。同时要求 subagent 状态报告透明且准确。  
- **安全与权限管理**：多项 issue 要求引入沙箱执行、操作撤销提示、以及更严格的 agent 权限控制，防止未授权乃至破坏性操作。  
- **可观测性与评估**：加强组件级行为评估（EPIC #24353）、subagent 轨迹可分享（#22598）、以及 bugreport 包含子上下文，成为质量基础设施的焦点。  
- **跨平台与终端体验**：Wayland 下的 browser agent、Windows 启动慢/auth 循环、终端 resize 闪烁等问题持续受关注，平台适配仍是重点。  
- **内存系统优化**：Auto Memory 的正确性与效率问题（低信号重试、无效补丁处理、日志过度）正在集中解决，用户希望减少资源浪费。  
- **AST/结构化代码理解**：AST 感知的文件读取和搜索被频繁提及，被认为是降低 token 消耗、提高代码定位精度的关键。

---

## 开发者关注点

- **Agent 状态混淆**：最大的痛点在于 subagent 明明因限制中断却被标记为成功（#22323），让用户难以诊断真实失败原因。  
- **Shell 命令卡死**：简单命令执行后仍卡在“等待输入”状态（#25166），反映 CLI 进程管理存在缺陷，严重影响信任度。  
- **未授权执行**：多个用户报告更新后子智能体无视配置自动运行（#22093），权限模型亟待审查。  
- **技能使用不足**：纵然定义了自定义 skill，模型主动调用的频率仍然极低（#21968），削弱了扩展价值。  
- **工具数量限制**：超过 128 个可用工具时遭遇 400 错误（#24246），大型项目用户受限于工具选择机制。  
- **配置覆盖失效**：Browser agent 忽略 `settings.json` 中的 `maxTurns` 等设置（#22267），自定义配置不生效。  
- **低性能与卡顿**：Windows 启动慢（#28144）、终端刷新闪烁（#21924）等性能问题影响日常体验。  

---

*数据来源：GitHub google-gemini/gemini-cli，更新于 2026-07-10。日报日期：2026-07-11。*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

好的，作为一名专注于 AI 开发工具的技术分析师，以下是基于 GitHub 仓库 `esengine/DeepSeek-Reasonix` 在 **2026-07-11** 更新的社区动态日报。

---

# DeepSeek Reasonix 社区动态日报 | 2026-07-11

**数据来源**: [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

---

## 1. 今日速览

- **版本迭代加速**：项目组发布了 v1.17.10 系列版本，重点修复了桌面端浅色主题与 CLI 恢复会话的稳定性。
- **“数据丢失”危机集中爆发**：过去 24 小时内，社区密集报告了因中断、取消、图片插入及双击归档导致的多种会话数据丢失和崩溃问题，成为本周排查焦点，相关修复 PR 已连夜合并。
- **Agent 生态向前迈进**：`子智能体(Subagent)` 配置页与 `Claude 插件命令映射` 功能的 PR 被提交，标志着 Reasonix 的 Agent 编排能力正从“单智能体”向“多智能体插件化”转型。

---

## 2. 版本发布

### v1.17.10 / desktop-v1.17.10
- **发布内容**：
  - **修复**：桌面端自动浅色主题样式保留（`#6250`）。
  - **优化**：Serve 浏览器界面 UI 打磨（`#6254`）。
  - **修复**：桌面端机器人设置修复。
  - **修复**：CLI 端恢复会话的序列化清理流程（`#6290`）。
- **链接**：Release 页面（见数据源 Commit `698e39a`）

---

## 3. 社区热点 Issues

*本次更新周期内共 29 条 Issues。以下是 10 条最值得关注的问题：*

### 🚨 数据丢失与稳定性（本周焦点）

1.  **#6314 - [Bug] detachedSessions 内存泄漏引发 OOM**
    - **重要性：** 极高。深入定位到了内存泄漏根因，`desktop/app.go:152` 中的 `detachedSessions` map 从不清理，切换 Tab 会导致内存无限增长直至被系统杀死。属于架构级的稳定性隐患。
    - **链接**: [Issue #6314](https://github.com/esengine/DeepSeek-Reasonix/issues/6314)

2.  **#6297 - [Bug] 桌面版中断对话后上下文丢失**
    - **重要性：** 极高。基本交互的重大缺陷。在 v1.17.10 中仍有报告，用户按 `esc` 中断对话后继续输入，AI 完全丢失上下文。涉及对话场景的核心信任感。
    - **链接**: [Issue #6297](https://github.com/esengine/DeepSeek-Reasonix/issues/6297)

3.  **#6294 - [Bug] 插入图片后会话永久崩溃**
    - **重要性：** 极高。Agent 视觉能力的致命 Bug。一旦在对话中插入图片报错，整个会话将永久不可用（重启、删图均无效），属于“一票否决”级别的 BUG。
    - **链接**: [Issue #6294](https://github.com/esengine/DeepSeek-Reasonix/issues/6294)

4.  **#6260 - [Bug] 手动取消对话导致历史记录丢失与 Mode 状态错乱**
    - **重要性：** 极高。用户手动取消交互后，不仅历史记录丢失，甚至退出 `Plan Mode` 后 AI 仍以为处于 `Plan Mode`，暴露了 Agent 状态机管理方面的严重缺陷。
    - **链接**: [Issue #6260](https://github.com/esengine/DeepSeek-Reasonix/issues/6260)

5.  **#6312 - [Bug] 快速双击“归档对话”导致数据损坏**
    - **重要性：** 高。UI 层并发防护缺失。双击归档操作会触发无限循环卡死，导致 `topic not found` 错误并使会话永久无法恢复。
    - **链接**: [Issue #6312](https://github.com/esengine/DeepSeek-Reasonix/issues/6312)

### 🐛 Agent 与工具链的精准性问题

6.  **#6267 - [Bug] System prompt 在每次 handoff 时重复注入**
    - **重要性：** 高。严重影响 Token 经济性与模型行为一致性。`<reasoning-language>` 与 `<capability-route>` 块被反复叠层，会导致模型行为偏差且浪费大量 Token。
    - **链接**: [Issue #6267](https://github.com/esengine/DeepSeek-Reasonix/issues/6267)

7.  **#6259 - [Bug] 持续报错 `deepseeker 工具缺失思考参数`**
    - **重要性：** 高。v1.17.9 引入的回归 bug，频繁弹窗阻断正常工具调用流程，严重影响自动化工作流。
    - **链接**: [Issue #6259](https://github.com/esengine/DeepSeek-Reasonix/issues/6259)

8.  **#6284 - [Bug] IntelliJ IDEA 终端中 CLI 输入显示严重不同步**
    - **重要性：** 中高。直接影响 JetBrains 系 IDE 用户的 TUI 体验。在中间插入字符会覆盖/替换原有字符，但与实际缓冲区内容完全不匹配，仅能靠窗口缩放强制刷新。
    - **链接**: [Issue #6284](https://github.com/esengine/DeepSeek-Reasonix/issues/6284)

### 💡 长期未解的用户痛点

9.  **#6110 - [Bug] 桌面版/CLI 无法强制使用中文思考过程**
    - **重要性：** 中高（中文社区高频）。用户已配置语言、模型思考语言、甚至指令中强调，AI 依然顽固使用英文思考。大量中文用户的持续抗议点。
    - **链接**: [Issue #6110](https://github.com/esengine/DeepSeek-Reasonix/issues/6110)

10. **#5909 - [Bug] 检测到响应卡顿与 UI 无响应**
    - **重要性：** 中。广泛存在的性能长任务（Long Task）问题，影响基础聊天交互的流畅性。尽管非偶发，但由于排查难度大，持续开放中。
    - **链接**: [Issue #5909](https://github.com/esengine/DeepSeek-Reasonix/issues/5909)

---

## 4. 重要 PR 进展

*本次更新周期内共 32 条 PRs。以下是 10 个最重要的变更：*

### 🚀 新功能

1.  **#6311 - feat(plugin): 将 Claude 插件的 Commands 映射为自定斜杠命令**
    - **简介**：@SivanCola 提交。解决了 Claude 插件（如 `planning-with-files`）的 `/plan` 等命令无法在 Reasonix 中工作的问题。现在会自动扫描插件的 `commands/` 目录并映射为本地斜杠命令。**Agent 插件生态的一大步**。
    - **链接**: [PR #6311](https://github.com/esengine/DeepSeek-Reasonix/pull/6311)

2.  **#6310 - Add subagent profile settings page**
    - **简介**：@SivanCola 提交。新增“子智能体”设置页面，支持 `runAs: subagent` 和 `invocation: manual` 配置。用户可以在 UI 中精细化管理与调度多个子 Agent，推进多智能体协作功能落地。
    - **链接**: [PR #6310](https://github.com/esengine/DeepSeek-Reasonix/pull/6310)

### 🔧 关键 Bug 修复

3.  **#6308 - fix(agent): 修复引导消息在轮次边界静默丢失问题**
    - **简介**：@JesonChou 提交。直接指向 #6297 等上下文丢失的元凶，修复了 `steer queue` 在换轮时被 `defer` 无条件清空的严重 Bug。
    - **链接**: [PR #6308](https://github.com/esengine/DeepSeek-Reasonix/pull/6308)

4.  **#6304 / #6227 - fix(mcp): 修复 MCP 工具结果图片无法传给视觉模型**
    - **简介**：@SivanCola / @ttmouse 提交。解决了 `photoshop_get_preview` 等 MCP 工具返回的图片内容被 `parseToolResult` 静默丢弃的问题，修复后视觉模型终于能“看到”截图和预览了。
    - **链接**: [PR #6304](https://github.com/esengine/DeepSeek-Reasonix/pull/6304)

5.  **#6278 - fix(desktop): 保留手动取消轮次的显示历史**
    - **简介**：@GTC2080 提交。在会话重载后，保留手动取消的对话中已产生的思考、流式文本、工具卡片，但不将其放入模型消息记录中污染上下文，平衡了用户体验与数据纯净度。
    - **链接**: [PR #6278](https://github.com/esengine/DeepSeek-Reasonix/pull/6278)

6.  **#6290 - fix(desktop): 保留已继续的恢复会话，防止误清理**
    - **简介**：@SivanCola 提交。修复了恢复会话的溯源标识（recovery provenance）判断逻辑，防止因 `Cleanup Eligibility` 误删有效的恢复副本导致数据丢失。
    - **链接**: [PR #6290](https://github.com/esengine/DeepSeek-Reasonix/pull/6290)

7.  **#6288 - fix(desktop): 修复异步操作跨会话串台**
    - **简介**：@SivanCola 提交。修复了多 Tab 场景下，Composer 草稿、引导队列、计划修订等操作可能错误路由到其他 Tab 的竞态条件问题。**多会话稳定性的关键补丁**。
    - **链接**: [PR #6288](https://github.com/esengine/DeepSeek-Reasonix/pull/6288)

### 💻 平台兼容与安全性

8.  **#6309 - fix(site): 修复认证流程中的协议相对URL开放重定向漏洞**
    - **简介**：@SivanCola 提交。安全修复。`auth.js` 中的 `safeNext` 函数未能防御 `//evil.example` 这种协议相对 URL 跳转。
    - **链接**: [PR #6309](https://github.com/esengine/DeepSeek-Reasonix/pull/6309)

9.  **#6276 - Fix Windows encoded config reads**
    - **简介**：@SivanCola 提交。修复了 Windows 平台下全局钩子、JSON/TOML/Dotenv 等配置文件在 GB18030/GBK 编码下无法读取的问题。**对于中文开发者是极其关键的修复**。
    - **链接**: [PR #6276](https://github.com/esengine/DeepSeek-Reasonix/pull/6276)

### ⚡ 体验优化

10. **#6307 - ToolCard: 当存在 Diff 时默认展开编辑工具卡片**
    - **简介**：@shenshuoyaoyouguang 提交。提升了代码审查体验，当 `write_file` 等工具产生代码差异时，卡片默认展开显示改动，无需用户手动点击。
    - **链接**: [PR #6307](https://github.com/esengine/DeepSeek-Reasonix/pull/6307)

---

## 5. 功能需求趋势

从过去 24 小时的数据来看，社区最关注的功能方向逐渐清晰：

1.  **Agent 生态与可编排性**: 对**子智能体（Subagent）**、**插件命令标准化（Claude Plugin Mapping）** 以及 **自定义工作流（Auto Tasks + 空消息预热）** 的需求显著增长，社区正走向复杂的多 Agent 协作模式。
2.  **高可靠性多会话管理**: 随着 Tab 页功能上线，**数据隔离（Tab Scoping）**和**状态一致性（竞态条件）** 成为刚需。开发者正在将 Reasonix 当作 IDE 使用，不能接受 Tab 切换带来的任何数据污染或泄漏。
3.  **原生 CLI/TUI 深度用法**: 用户不满足于基本的交互，开始要求 `-p/--prompt` 参数注入（`#6291`）、更好的 IDE 终端兼容性（`#6284`）、以及更灵活的内容宽度配置（`#6268`）。
4.  **跨平台原生体验**: Arch Linux 用户要求 `pkg.tar.zst` 打包（`#6299`），macOS 用户希望适配系统风格图标（`#5320`），窗口行为需符合平台规范（`#6251`）。

---

## 6. 开发者关注点

基于大量的 Issue 讨论和类 React 社区的情绪基调，当前开发者最关注的痛点主要集中在以下三点：

- **数据无价，Context 为本**：任何导致**上下文丢失**、**会话损坏**、**状态混乱**的操作都被视为“重大事故”。取消、归档、切换 Tab 这些基本操作必须像手术刀一样精准且可回退。
- **讨厌黑盒，要求“可审计性”**：当工具命令被截断（`#6264`）、System Prompt 被重复注入（`#6267`）、模型思考语言不受控时（`#6110`），开发者会感到强烈的不安与失控。**“展开 / 预览 / 溯源”** 功能是增强 Agent 信任度的关键。
- **中文开发者的特殊负担**: 除了模型语言问题，Windows 上的**编码兼容性（GBK/GB18030）**（已被 #6276 修复）和 Linux 上的**平台分发格式**正在成为 Reasonix 在中文高级开发者中普及的拦路虎。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 2026-07-11

> 数据来源：GitHub [anomalyco/opencode](https://github.com/anomalyco/opencode)（截至 2026-07-11）

---

## 今日速览

今日无新版本发布。社区讨论热度集中在 V2（2.0）版本打磨、模型兼容性与并发稳定性上。**Issue #36140** 关于 GPT‑5.6 Luna 模型认证失败获 45 👍，**#10288** 移动端请求持续以 89 👍 居首。**PR #34794** 新增 `--model free` 随机免费模型选择，**#36333** 对会话输出进行 token 上限约束，为 V2 正式版铺路。

---

## 社区热点 Issues（10 个）

### 1. 移动版请求 [🔥 89 👍 / 14 评论]  
**#10288** – 希望 OpenCode 能提供 Android / iOS / Web UI 版本，方便随时查阅和协作。社区需求强烈，持续稳居最热 Issue。  
[查看详情](https://github.com/anomalyco/opencode/issues/10288)

### 2. GPT‑5.6 Luna 模型认证失败 [🔥 45 👍 / 11 评论]  
**#36140** – 使用 ChatGPT OAuth 调用 `gpt-5.6-luna` 时返回 404 `Model not found`，同一账户使用旧模型则正常。因涉及新模型兼容，引发广泛讨论。  
[查看详情](https://github.com/anomalyco/opencode/issues/36140)

### 3. 交互式引导功能（已关闭） [26 👍 / 3 评论]  
**#19205** – 希望 OpenCode 在任务排队时支持交互式反馈（如 GPT‑5.4 的 Interactive Steering），体现社区对更灵活控制的需求。  
[查看详情](https://github.com/anomalyco/opencode/issues/19205)

### 4. SQLite 数据库并发损坏 [19 👍 / 10 评论]  
**#14970** – 在 NFS 目录下同时运行多个 session 会导致 `database disk image is malformed`，影响团队协作场景下的数据安全。  
[查看详情](https://github.com/anomalyco/opencode/issues/14970)

### 5. 桌面集成浏览器 [3 👍 / 12 评论]  
**#26772** – 期望 OpenCode Desktop 内置浏览器面板，方便直接审查网页内容或交互。功能呼吁积极，社区讨论活跃。  
[查看详情](https://github.com/anomalyco/opencode/issues/26772)

### 6. Xcode ACP 忽略配置文件 [12 评论]  
**#34743** – macOS 27 beta2 中 Xcode 调用 opencode 时忽略 `opencode.json` 配置，强制使用默认模型 `big-pickle`，严重影响开发者工作流。  
[查看详情](https://github.com/anomalyco/opencode/issues/34743)

### 7. Claude 工具调用错误 [3 👍 / 7 评论]  
**#9532** – 频繁出现 `Model tried to call unavailable tool 'ProxyRead'`，导致自动化流程中断，用户对 Claude 的兼容性表示担忧。  
[查看详情](https://github.com/anomalyco/opencode/issues/9532)

### 8. V2 TUI 模态交互统一 [5 评论]  
**#36302** – 对 V2 TUI 的 37 个对话框组件进行视觉与行为审查，计划统一交互模型，是 V2 界面重设计的关键前置工作。  
[查看详情](https://github.com/anomalyco/opencode/issues/36302)

### 9. 服务重启导致重连风暴 [3 评论]  
**#36285** – V2 TUI 在自动更新时替换 `managed-service`，导致所有已连接 TUI 断开并冷启动大量地域图，引发资源尖峰——属于 V2 性能关键 bug。  
[查看详情](https://github.com/anomalyco/opencode/issues/36285)

### 10. Windows TUI 启动失败 [2 👍 / 3 评论]  
**#35828** – 项目已存在 `.opencode` 目录时，Windows 下 opencode v1.17.15 启动报 `Unexpected server error`，暴露跨平台兼容问题。  
[查看详情](https://github.com/anomalyco/opencode/issues/35828)

---

## 重要 PR 进展（10 个）

### 1. `--model free` 随机免费模型 [新功能]  
**#34794** – 为 `opencode run` 和 TUI 新增 `--model free` 参数，自动随机选择一个零成本的 OpenCode Zen 模型，降低使用门槛。  
[查看详情](https://github.com/anomalyco/opencode/pull/34794)

### 2. 改进服务状态报告 [修复]  
**#36275** – 替换模糊的 `stopped` 输出，明确区分注册、可达性、健康状态，并正确报告版本不匹配的后台进程为“running”。  
[查看详情](https://github.com/anomalyco/opencode/pull/36275)

### 3. 限制会话输出 Token [核心修复]  
**#36333** – 为 V2 provider 设置 32,000 token 输出上限，防止模型一次性消耗整个上下文窗口，兼顾性能与安全。  
[查看详情](https://github.com/anomalyco/opencode/pull/36333)

### 4. CodeMode 搜索夹具测试 [测试]  
**#36332** – 注册 200 个临时工具、20 个命名空间，端到端测试 `$codemode.search` 与工具调用，保障 V2 搜索可靠性。  
[查看详情](https://github.com/anomalyco/opencode/pull/36332)

### 5. 审查导航间距修复 [UI 修复]  
**#36330** – 对齐文件树与审查控件的 12px 间距，保持箭头紧凑，避免折叠元数据时产生多余空隙。  
[查看详情](https://github.com/anomalyco/opencode/pull/36330)

### 6. 启用 v2 分支 Nix CI [平台支持]  
**#36329** – 将 v2 分支加入 Nix 哈希 CI 构建列表，方便 Nix 用户测试最新版本。  
[查看详情](https://github.com/anomalyco/opencode/pull/36329)

### 7. 合并 Git 发现查询 [重构]  
**#36321** – 将 Git 仓库发现元数据合并到一个 `git rev-parse` 子进程，减少进程开销，增强无工作树时的回退。  
[查看详情](https://github.com/anomalyco/opencode/pull/36321)

### 8. CodeMode 支持 Promise 链 [新功能]  
**#36304** – 在 CodeMode 沙箱中实现 `.then`/`.catch`/`.finally`，使异步任务编排更自然。  
[查看详情](https://github.com/anomalyco/opencode/pull/36304)

### 9. 文件树数字排序 [修复]  
**#31756** – 文件树从字典序改为数值排序，解决 `file2`、`file10` 顺序错误的问题。  
[查看详情](https://github.com/anomalyco/opencode/pull/31756)

### 10. 全局项目编辑持久化 [修复]  
**#31736** – 修复全局（无服务端 ID）项目通过编辑对话框修改名称、颜色后不保存的问题。  
[查看详情](https://github.com/anomalyco/opencode/pull/31736)

---

## 功能需求趋势

1. **移动端与桌面扩展**  
   - 移动版本（#10288）连续多周高赞；桌面集成浏览器（#26772）获 12 条评论，反映跨设备、沉浸式工作的迫切需求。

2. **模型快速适配与灵活配置**  
   - 新模型（GPT‑5.6 Luna、Claude）的兼容性反复被提及（#36140、#9532），用户希望 OpenCode 能第一时间稳定支持，且不受 IDE 集成的默认覆盖（#34743）。

3. **高性能与多会话稳定性**  
   - SQLite 不可并发的硬伤（#14970、#33320）、服务重启导致全量重连（#36285）表明社区需要更可靠的状态管理与后端架构。

4. **V2 版本交互打磨**  
   - TUI 自动补全、模态框行为、返回手势等细节问题频出（#34040、#36322、#36323），社区正积极参与 V2 的可用性改进。

5. **跨平台一致性**  
   - Windows 启动失败（#35828）、macOS 推理错误（#36241）、Nix 支持（#34671）等案例显示，用户对各平台的使用体验要求越来越高。

---

## 开发者关注点

| 痛点 / 高频需求 | 相关 Issue / PR |
| --------------- | --------------- |
| **模型配置被忽视**：指定模型后仍被 IDE 或服务端强制回退默认模型。 | #34743, #36140 |
| **并发数据损坏**：多实例共享 SQLite 导致 `malformed` 或 `locked`。 | #14970, #33320 |
| **工具调用错误**：Claude 等模型频繁报 “unavailable tool”，导致任务中断。 | #9532 |
| **对话持久化不可靠**：用户被告知“可安全关机”但回来发现历史丢失。 | #36326 |
| **平台特定故障**：Windows TUI 无法启动（#35828）、macOS 推理 rs 字段缺失（#36241）、Xcode 集成忽略配置。 | #35828, #36241, #34743 |
| **TUI 可用性缺失**：子视图无返回按钮、fork 不生效、自动补全不全。 | #36322, #36323, #34040 |

---

> 以上日报仅反映 2026-07-11 前 24 小时 GitHub 上 `anomalyco/opencode` 仓库的公开动态，不代表项目官方立场。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 | 2026-07-11

**数据来源**：[github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

## 今日速览

昨日 Qwen Code 正式发布 **v0.19.9**，主要修复子 Agent 工具调用无限循环和历史链断裂检测 bug。社区围绕**多工作区支持**的 RFC（#6378）讨论热烈，累计 20 条评论；同时多个关键 bug 得到修复，v0.19.9 发布流程中的 Docker 集成测试问题也已解决。在功能需求方面，**SDK 交互能力**（如 `ask_user_question`）和 **WebShell 移动端适配**成为新亮点。

---

## 版本发布

### v0.19.9（正式版）⭐
- **标签**：`v0.19.9`
- **主要变更**：
  - **修复**：子 Agent 工具调用循环（`Stop repeated subagent tool-call loops`，PR #6543）
  - **修复**：会话历史链断裂时主动标记而非静默截断（`fix(session): detect and mark broken history chains`）
- **发布 PR**：[#6693](https://github.com/QwenLM/qwen-code/pull/6693)
- ⚠️ 发布工作流中的 Docker 集成测试曾因包大小超限及 WebShell 构建产物缺失而失败，已通过 #6686 和 #6691 修复。

### v0.19.8-nightly.20260710.205430235
- 包含与 v0.19.9 相同的两项修复，属于持续集成 nightly 版本。

---

## 社区热点 Issues（10 则）

### 1. 🚀 [RFC] 支持单 daemon 多工作区（#6378）
- **概述**：提议在 `qwen serve` 一个进程中托管多个工作区，同时保持对现有客户端单工作区的兼容。
- **为什么重要**：这是多工作区架构的起点，直接影响大型团队协作和 CI/CD 集成。社区讨论积极（20 条评论），后续已有多个相关 PR（#6621、#6635、#6638）。
- **链接**：[#6378](https://github.com/QwenLM/qwen-code/issues/6378)

### 2. 🔴 API 流长时间无活动错误（#5975）
- **概述**：v0.19.3 后频繁出现 `No stream activity for 120000ms` 错误，模型输出卡死。
- **为什么重要**：严重影响日常使用，10 条评论表明大量用户遇到。升级后体验下降，社区呼声高。
- **链接**：[#5975](https://github.com/QwenLM/qwen-code/issues/5975)

### 3. 🔴 Yolo 模式自动切换至 Plan 模式（#5970）
- **概述**：使用 `qwen -y` 启动后，Agent 仍会自动进入 Plan 模式并询问权限，破坏 Yolo 预期。
- **为什么重要**：核心交互模式 bug，影响自动化工作流。已有关联修复 PR #6630。
- **链接**：[#5970](https://github.com/QwenLM/qwen-code/issues/5970)

### 4. 🔴 上下文窗口硬限制为 0 导致请求前失败（#6384）
- **概述**：当环境变量配置的模型预留完整上下文窗口时，计算出的 hard limit 为 0，导致任何请求都无法发送。
- **为什么重要**：配置相关严重 bug，导致完全无法使用特定模型。5 条评论，社区关注度高。
- **链接**：[#6384](https://github.com/QwenLM/qwen-code/issues/6384)

### 5. 🍎 macOS standalone 粘贴图片失效（#6590）
- **概述**：macOS 上 Ctrl+V 粘贴剪贴板图片无反应，因原生模块 `@teddyzhu/clipboard` 未包含在 standalone 包中。
- **为什么重要**：平台特定缺陷，影响 macOS 用户的核心功能。已定位根因（import 失败后 debug log 不暴露）。
- **链接**：[#6590](https://github.com/QwenLM/qwen-code/issues/6590)

### 6. 🔧 Cron 解析器丢弃步长值（#6629）
- **概述**：表达式 `5/15` 被解析为裸值 `5`，仅匹配第 5 分钟而非每 15 分钟。
- **为什么重要**：影响依赖 cron 的自动化任务调度。语法虽接受但语义错误，已标记为 `autofix/in-progress`。
- **链接**：[#6629](https://github.com/QwenLM/qwen-code/issues/6629)

### 7. 📝 `--debug` 打印日志路径但实际未创建文件（#6600）
- **概述**：v0.19.8 中 `--debug` 参数提示日志路径但磁盘上无 `latest` 软链接和 `.txt` 文件。
- **为什么重要**：调试功能形同虚设，阻碍问题排查。4 条评论，说明影响范围不小。
- **链接**：[#6600](https://github.com/QwenLM/qwen-code/issues/6600)

### 8. 🔴 工具调用后缺少 `tool_result` 导致 API 错误（#6654）
- **概述**：消息数组中出现 `tool_use` 但没有紧随的 `tool_result`，引发 API 校验失败。
- **为什么重要**：反映工具调用流程中的同步问题，可能导致 agent 行为中断。需要紧急关注。
- **链接**：[#6654](https://github.com/QwenLM/qwen-code/issues/6654)

### 9. 🌐 审批模式切换 UI 中英文混杂（#6582）
- **概述**：`Shift+Tab` 切换模式时，部分模式显示英文、部分中文，未遵循语言设置。
- **为什么重要**：明显国际化 bug，降低用户体验。已有关联修复 PR #6592。
- **链接**：[#6582](https://github.com/QwenLM/qwen-code/issues/6582)

### 10. 🤖 qwen3.7-max 泄露内部标签（#6595）
- **概述**：在长上下文或复杂工具调用场景下，模型可能输出 `<analysis>` 和 `<summary>` 标签，导致后续动作停止。
- **为什么重要**：直接影响最新模型的可用性和输出可靠性，需模型侧或后处理修复。
- **链接**：[#6595](https://github.com/QwenLM/qwen-code/issues/6595)

---

## 重要 PR 进展（10 则）

### 1. 🏷️ 发布 v0.19.9（#6693）
- **功能**：自动触发 v0.19.9 版本发布，同步版本号和 CHANGELOG。
- **状态**：已合并（CLOSED）。
- **链接**：[#6693](https://github.com/QwenLM/qwen-code/pull/6693)

### 2. 🧩 多工作区 ACP 传输（Phase 4）（#6621）
- **功能**：为 daemon 多工作区添加工作区限定 ACP 传输端点（`/workspaces/:workspace/acp`），第 4 阶段关键 PR。
- **状态**：已合并（CLOSED）。
- **链接**：[#6621](https://github.com/QwenLM/qwen-code/pull/6621)

### 3. 🖼️ WebShell 工件右侧面板（#6591）
- **功能**：在 WebShell 中添加右侧面板展示编辑过的文件，包含行统计、可展开 diff、拖拽面板及文件树导航。
- **状态**：已合并（CLOSED）。
- **链接**：[#6591](https://github.com/QwenLM/qwen-code/pull/6591)

### 4. 🔒 YOLO 模式不被 `enter_plan_mode` 切换（#6630）
- **功能**：当 session 处于 YOLO 模式时，模型调用 `enter_plan_mode` 不再切换至只读 Plan 模式，保持原有模式。
- **状态**：已合并（CLOSED）。关联 issue #5970。
- **链接**：[#6630](https://github.com/QwenLM/qwen-code/pull/6630)

### 5. 🌍 审批模式 UI 标签本地化（#6592）
- **功能**：将审批模式切换 UI（Auto 等）中的英文 fallback 替换为本地化字符串，跟随语言设置。
- **状态**：已合并（CLOSED）。关联 issue #6582。
- **链接**：[#6592](https://github.com/QwenLM/qwen-code/pull/6592)

### 6. 💬 SDK 支持 `ask_user_question` 交互（#6655）
- **功能**：当 SDK 驱动 session 时，用户通过 `can_use_tool` 回调选择的答案能真正返回给模型，实现交互式工具调用。
- **状态**：已合并（CLOSED）。
- **链接**：[#6655](https://github.com/QwenLM/qwen-code/pull/6655)

### 7. 🎯 模型切换保持会话范围（#6579）
- **功能**：普通 `/model` 或 UI 选择只更新当前 session，仅 `/model --default` 才会持久化，避免误覆盖默认配置。
- **状态**：开放中（OPEN）。
- **链接**：[#6579](https://github.com/QwenLM/qwen-code/pull/6579)

### 8. ✅ `/goal` 评估生命周期安全（#6681）
- **功能**：自动 `/goal` 评估会等待后台 agent、shell job 等工作完成后再执行，避免状态不一致；分离有效评判与评估失败。
- **状态**：开放中（OPEN）。
- **链接**：[#6681](https://github.com/QwenLM/qwen-code/pull/6681)

### 9. 📚 `/learn` 命令：用户发起技能创建（#6440）
- **功能**：新增 `/learn` 命令，允许用户从本地目录、URL、对话历史或自由文本中创建可复用技能（Skill），存入 `.qwen/skills/`。
- **状态**：开放中（OPEN）。
- **链接**：[#6440](https://github.com/QwenLM/qwen-code/pull/6440)

### 10. 🔄 通道 daemon 会话重启恢复（#6680）
- **功能**：将通道路由元数据与实时绑定分离，在 daemon 或 channel worker 重启后能恢复当前会话，无需重新连接。
- **状态**：开放中（OPEN）。
- **链接**：[#6680](https://github.com/QwenLM/qwen-code/pull/6680)

---

## 功能需求趋势

从近 24 小时提交的 Issues 和 PR 中，可看出社区最关注的几个方向：

| 方向 | 代表性议题 | 关键程度 |
|------|------------|----------|
| **多工作区 / 多租户架构** | #6378（RFC）、#6621、#6635、#6638、#6646 | ⭐⭐⭐⭐⭐ |
| **模型兼容性与稳定输出** | #6595（标签泄露）、#6670（空内容）、#6384（窗口限制） | ⭐⭐⭐⭐⭐ |
| **SDK 与交互工具增强** | #6647（`ask_user_question`）、#6655（SDK 支持） | ⭐⭐⭐⭐ |
| **跨平台与国际化** | #6590（macOS 粘贴）、#6582（UI 中英文混杂）、#6669（Ctrl+S 暂存） | ⭐⭐⭐⭐ |
| **自动化与调度能力** | #6629（Cron步长）、#6663（`/goal` 长度放宽）、#6632（AutomationsUI） | ⭐⭐⭐ |

此外，**安全审查**（#6597 评论附件防护）、**性能与缓存**（#6642 代理缓存命中率）以及**调试体验**（#6600 debug log）也收到较多关注。

---

## 开发者关注点

综合社区反馈和 bug 报告，当前开发者和用户遇到的主要痛点与高频需求包括：

1. **API 流稳定性**：`No stream activity` 超时错误（#5975）在升级后频繁出现，影响生产使用。用户期望模型输出更快响应或更好的超时重试机制。
2. **macOS 原生体验缺失**：standalone 安装缺少 `@teddyzhu/clipboard` 原生模块，导致图片粘贴失效。平台支持的一致性需要补全。
3. **调试与日志不透明**：`--debug` 打印路径但不写文件，使问题排查困难。社区希望日志系统可靠且易访问。
4. **模式切换语义混淆**：Yolo 模式被自动改变（#5970）、本地化不一致（#6582）等交互问题，降低了高级用户对控制权的信任。
5. **多工作区配置期待**：虽已有 RFC 和系列 PR，但当前仍以单工作区为主。团队协作和 CI 场景迫切期待稳定支持。
6. **工具调用健壮性**：`tool_use` 与 `tool_result` 不匹配（#6654）、子 agent 模板 `${0}` 解析崩溃（#6671）等问题，显示工具链的边界测试需加强。

---

*以上为 2026-07-10 至 2026-07-11 期间 Qwen Code 仓库的核心动态。所有条目均可在 [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) 查阅详情。*

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，作为专注于 AI 开发工具的技术分析师，我已根据提供的 GitHub 数据，为您生成 2026年7月11日的 Hermes 社区动态日报。

---

#  Hermes 社区动态日报 - 2026-07-11

## 📈 今日速览

今日社区核心动态聚焦于 **多代理并发安全** 与 **安全漏洞修复**。多个 PR 旨在解决浏览器代理商并发时的标签页冲突问题，同时新的安全修复严格限制了代理对会话记录和终端环境变量的写入权限。此外，MCP 连接稳定性、Telegram 命令预览截断等多个高影响 Bug 在今天得到了修复。

## 🐛 社区热点 Issues（共 10 条）

1.  **[Dashboard] API 错误重写自定义提供商名称**
    *   **链接**: [Issue #52496](https://github.com/NousResearch/hermes-agent/issues/52496)
    *   **重要性**: **P2 高影响 Bug**。这是一个配置持久化问题。用户在 `config.yaml` 中手动配置的自定义 API 提供商（如 `us-azure`），通过 Web Dashboard 的模型切换器切换后，其提供商名称会被错误地重写为 `openrouter`，导致后续请求失败。社区对此关注度高，有 7 条评论讨论复现路径。
    *   **社区反应**: 用户报告了详细的配置和复现步骤，开发者正在确认根因。

2.  **[Desktop] 桌面端压缩状态显示卡死**
    *   **链接**: [Issue #48098](https://github.com/NousResearch/hermes-agent/issues/48098)
    *   **重要性**: **P2 影响用户体验**。Hermes 桌面端在模型恢复工作后，状态栏仍错误显示 "Summarizing thread"（正在总结线程），持续数分钟，给用户带来困惑。有 7 条评论，讨论了状态更新的时机问题。
    *   **社区反应**: 用户提供了详细的操作步骤和截图，开发者认为这是一个 UI 状态同步的 Bug。

3.  **[Auth] Bedrock 向导接受不完整凭证，运行时失败**
    *   **链接**: [Issue #28156](https://github.com/NousResearch/hermes-agent/issues/28156)
    *   **重要性**: **P1 关键 Bug**。AWS Bedrock 模型配置向导存在两个严重问题：接受不完全的凭证（仅 Bearer Token）导致运行时崩溃，并且在 EU 区域显示了不可路由的配置文件。这直接影响了新用户的“开箱即用”体验。
    *   **社区反应**: 有 5 条评论，用户和开发者正在讨论如何改进向导逻辑，以避免运行时的认证失败。

4.  **[MCP] MCP 服务器进程在重连时泄漏**
    *   **链接**: [Issue #60385](https://github.com/NousResearch/hermes-agent/issues/60385)
    *   **重要性**: **P2 稳定性问题**。当 MCP 传输层重连时，旧的 stdio 进程没有被终止，导致进程数量随时间累积，最终可能耗尽系统资源。这是影响长时间运行服务的顽疾。
    *   **社区反应**: 用户报告了多个 MCP 服务器场景下的进程增长，开发者正在寻找合适的 lifecycle 管理方案。

5.  **[Feature] 添加消息时间戳以增强代理时间感知**
    *   **链接**: [Issue #62369](https://github.com/NousResearch/hermes-agent/issues/62369)
    *   **重要性**: 社区功能请求热点。模型在跨越多天的长对话中，无法区分消息的发生时间，导致时间逻辑混乱。这是一个提升代理智能水平的合理需求。
    *   **社区反应**: 有 1 条评论认同这是一个关键限制，尤其是在长时间运行的任务中。

6.  **[Desktop] NVIDIA 580+ 驱动下桌面端崩溃**
    *   **链接**: [Issue #40077](https://github.com/NousResearch/hermes-agent/issues/40077)
    *   **重要性**: 特定环境下的严重 Bug。在 Ubuntu 24.04 上使用 NVIDIA 580+ 驱动时，Hermes 桌面应用会崩溃。虽然评论数不多（2条），但这影响了部分高端显卡用户。
    *   **社区反应**: 用户提供了详细的系统环境和错误日志，可能与 Electron 的渲染兼容性有关。

7.  **[Browser] 同浏览器配置文件下的多代理标签页冲突**
    *   **链接**: [Issue #62338](https://github.com/NousResearch/hermes-agent/issues/62338)
    *   **重要性**: **P3 前沿功能**。虽然优先级不高，但这是多代理并发的关键一环。当前的配置文件和标签页路由机制还未解决多个代理在同一配置文件下操作不同标签页时的碰撞问题。
    *   **社区反应**: 作者 [#49691](https://github.com/NousResearch/hermes-agent/pull/49691) 的后续跟踪，表明社区正逐步解决复杂的并发场景。

8.  **[Security] OAuth refresh_token 在每次刷新后被擦除**
    *   **链接**: [Issue #62333](https://github.com/NousResearch/hermes-agent/issues/62333)
    *   **重要性**: **P2 严重 Bug**。这导致所有通过 OAuth 认证的 MCP 服务器（如 Zoho）在一小时后都会失效，需要用户频繁重新授权，严重影响可用性。
    *   **社区反应**: 用户明确指出了问题的代码路径，这是一个明显的 token 刷新逻辑缺陷。

9.  **[Desktop] 克隆插件引擎导致代理上下文冲突**
    *   **链接**: [Issue #42683](https://github.com/NousResearch/hermes-agent/pull/42683) (Pull Request，但指出了Bug)
    *   **重要性**: **P3 架构问题**。多个代理实例共享同一个进程级插件上下文引擎，导致状态混乱。这限制了插件在多代理场景下的安全性。
    *   **社区反应**: 对应的 [#62374](https://github.com/NousResearch/hermes-agent/pull/62374) 提了新的修复方案，说明开发团队正在积极重构这部分逻辑。

10. **[UI] 桌面端用户/助手消息气泡难以区分**
    *   **链接**: [Issue #57104](https://github.com/NousResearch/hermes-agent/issues/57104)
    *   **重要性**: **P3 可用性细节**。这是一个常见的 UI/UX 反馈，消息气泡视觉上缺乏区分度，影响阅读体验。评论数有 2 条，反映了社区对细节打磨的关注。
    *   **社区反应**: 用户建议增加视觉差异，如左对齐和不同颜色。

## 📌 重要 PR 进展（共 10 条）

1.  **修复(telegram): 隐藏截断命令的批准按钮**
    *   **链接**: [PR #62376](https://github.com/NousResearch/hermes-agent/pull/62376)
    *   **重要性**: **安全修复**。这是一个关键的安全提升，防止用户因看不到完整命令而盲目授权。当 Telegram 命令预览被截断时，批准按钮会被自动隐藏。

2.  **功能(browser): 命名浏览器配置文件以实现账户隔离**
    *   **链接**: [PR #49691](https://github.com/NousResearch/hermes-agent/pull/49691)
    *   **重要性**: **重要功能**。这个长期运行的 PR 持续获得关注，它为浏览器工具带来了原生多账户隔离支持，允许多个代理操作不同的浏览器配置文件，避免了 Cookie 和身份状态的混乱。

3.  **修复(context-engine): 为每个代理克隆插件引擎**
    *   **链接**: [PR #62374](https://github.com/NousResearch/hermes-agent/pull/62374)
    *   **重要性**: **Bug 修复/架构改进**。这是对 [PR #42683](https://github.com/NousResearch/hermes-agent/pull/42683) 的替代和改进方案。核心逻辑是让每个 AIAgent 都拥有独立的插件引擎实例，避免共享状态导致的数据错乱，是解决多代理安全性的关键一步。

4.  **功能: 强化 TheWon 运行时部署门控**
    *   **链接**: [PR #62345](https://github.com/NousResearch/hermes-agent/pull/62345)
    *   **重要性**: **重要基础设施**。此 PR 为 TheWon 运行时的平滑部署增加了多种预检和生命周期门控，增强了 Gateway、Slack 和 Cron 等组件在升级过程中的稳定性和回滚能力。

5.  **修复: 保护代理无法写入终端会话记录**
    *   **链接**: [PR #62360](https://github.com/NousResearch/hermes-agent/pull/62360)
    *   **重要性**: **安全修复**。借鉴了 Claude Code 的安全策略，Hermes 的文件工具现在被限制不能重写或篡改核心的 `state.db` 会话记录和 JSON 快照，防止攻击者通过操纵历史记录来误导代理。

6.  **修复(gateway): 将启动失败原因输出到 stderr**
    *   **链接**: [PR #62363](https://github.com/NousResearch/hermes-agent/pull/62363)
    *   **重要性**: **用户体验改进**。当 Gateway 因为配置错误（如 WhatsApp 未配对）而启动失败时，错误信息现在会直接打印在终端或 GUI 上，而非隐藏在日志文件中，大大降低了调试难度。

7.  **修复(cli): 在模型解析中优先使用自定义提供商名称**
    *   **链接**: [PR #62367](https://github.com/NousResearch/hermes-agent/pull/62367)
    *   **重要性**: **Bug 修复**。修复了一个路由错误：当用户在 `custom_providers` 中定义的模型名与 Hermes 内置模型重名时，系统会错误地使用内置配置，导致请求被发送到错误的 URL。现在用户的自定义配置优先级更高。

8.  **修复(delegate): 拒绝包含 null 目标的批量任务**
    *   **链接**: [PR #62368](https://github.com/NousResearch/hermes-agent/pull/62368)
    *   **重要性**: **稳定性修复**。当批量委托任务中，某个子任务的 `goal` 字段为 `null` 时，会导致整个任务系统崩溃。此 PR 通过优雅地拒绝这种无效输入，避免了运行时错误。

9.  **修复(auth): 拒绝 `portal_base_url` 的降级攻击**
    *   **链接**: [PR #62373](https://github.com/NousResearch/hermes-agent/pull/62373)
    *   **重要性**: **安全修复**。这是一个安全加固，防止攻击者通过提供 `http://` 的 `portal_base_url` 来降级原本 `https://` 的认证请求，从而拦截凭据。

10. **功能(web): 在服务商故障时自动回退到 DuckDuckGo 搜索**
    *   **链接**: [PR #62366](https://github.com/NousResearch/hermes-agent/pull/62366)
    *   **重要性**: **可靠性提升**。当主搜索提供商（如 Brave, Tavily）因限流或超时故障时，Web 搜索工具现在会自动回退到免费的 DuckDuckGo，保证任务的连续性，避免因 API 故障而中断。

## 🔮 功能需求趋势

从 Issue 数据中，可以提炼出社区最关注的几个方向：

1.  **多代理并发与资源隔离**：这是当前最热的需求，体现在浏览器配置文件隔离（[#49691](https://github.com/NousResearch/hermes-agent/pull/49691)）、标签页路由（[#62338](https://github.com/NousResearch/hermes-agent/issues/62338)）、MCP 进程生命周期管理（[#60385](https://github.com/NousResearch/hermes-agent/issues/60385)）以及插件引擎克隆（[#62374](https://github.com/NousResearch/hermes-agent/pull/62374)）等多个方面。
2.  **安全加固与审计**：社区安全意识显著增强，要求保护会话记录不被篡改（[#62360](https://github.com/NousResearch/hermes-agent/pull/62360)）、防止终端环境变量中的凭据泄漏（[#62336](https://github.com/NousResearch/hermes-agent/issues/62336)）以及增强 OAuth Token 管理的鲁棒性（[#62333](https://github.com/NousResearch/hermes-agent/issues/62333)）。
3.  **MCP 生态的成熟化**：MCP 相关 Issue 和 PR 高频出现，显示出 MCP 作为扩展能力核心的地位。需求从“可用”转向“稳定”，如解决进程泄漏、无限重连（[#62371](https://github.com/NousResearch/hermes-agent/pull/62371)）和 OAuth 刷新问题。
4.  **模型与配置灵活性**：用户对模型选择和控制提出了更高要求，包括支持 `qwen3.7-plus` 等新模型（[#44662](https://github.com/NousResearch/hermes-agent/issues/44662)）、通过 UI 配置第三方 API（[#52807](https://github.com/NousResearch/hermes-agent/issues/52807)）以及在 `delegate_task` 中进行每任务模型选择（[#58731](https://github.com/NousResearch/hermes-agent/issues/58731)）。
5.  **上下文与内存进化**：除了长对话的时间感知（[#62369](https://github.com/NousResearch/hermes-agent/issues/62369)），社区还在探索更智能的技能加载（#36656）和通过 MCP 暴露 Agent 内部记忆（#10835）等方式，让代理的“记忆”更持久、更智能。

## 🔧 开发者关注点

综合来看，开发者在反馈和讨论中普遍关注了以下几个痛点：

1.  **配置错误和模型解析的低韧性**：大量 bug 集中在配置解析不严谨（如自定义提供商名称被覆盖[#52496]）和模型/提供商路由逻辑错误（如内置映射优先级过高[#62367]）上。开发者期待 CLI 和 Dashboard 能对配置错误给出更明确的提示和更智能的回退。
2.  **进程资源泄漏的高频出现**：无论是 MCP 服务器（[#60385](https://github.com/NousResearch/hermes-agent/issues/60385)）还是桌面端终端（[#62324](https://github.com/NousResearch/hermes-agent/issues/62324)），进程泄漏问题反复出现，表明应用的进程生命周期管理仍需加强。
3.  **特定平台和硬件的兼容性**：桌面端在 NVIDIA 新驱动上的崩溃（[#40077](https://github.com/NousResearch/hermes-agent/issues/40077)）和在不同 OS 下的 Electron 问题，是开发者使用 Windows/Linux/macOS 时共同的烦恼，这类问题对用户体验伤害极大。
4.  **并发与安全边界模糊**：随着多代理功能的推出，开发者正在积极探索如何安全地运行多个代理实例。共享的进程级资源（如插件引擎、MCP进程、浏览器标签页）在没有隔离机制的情况下，极易引发状态冲突和安全问题，这成为构建复杂应用的核心挑战。
5.  **文档与发现性不足**：部分功能如 Honcho 外部记忆提供商，虽然在文档中提及，但在 UI 中完全不可见（[#61642](https://github.com/NousResearch/hermes-agent/issues/61642)），导致用户难以发现和配置。这表明 UI 与文档的同步和功能的“自发现”能力有待提升。

</details>
