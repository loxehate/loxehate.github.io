---
title: "AI CLI 工具社区动态日报"
date: 2026-07-16
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# AI CLI 工具社区动态日报 2026-07-16

> 生成时间: 2026-07-16 00:35 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-07-16）

## 1. 生态全景

AI CLI 工具正从“对话辅助”快速向“自主 Agent 工作流”演进，但稳定性与安全成为全局瓶颈。所有主流工具在同一日集中暴露了 Agent 通信死锁、上下文丢失、成本失控等问题，表明社区对“可信自动化”的要求远超产品成熟度。与此同时，企业级治理（多账户、工作空间隔离、MCP 作用域）、跨平台桌面体验和安全加固成为各工具竞相补课的方向。MCP（模型上下文协议）正从“能否接入”阶段进入“如何安全高效治理”阶段，而工具链间的配置互导（Cursor、Claude Code ↔ Codex）则预示着生态正走向互通。

## 2. 各工具活跃度对比

| 工具 | 热点 Issue 数（Top） | 重要 PR 数 | 版本发布数 | 备注 |
|------|-------------------|-----------|-----------|------|
| **Claude Code** | 10 | 4 | 1 | PR 量最低，社区反馈量大（#18435 达 657👍） |
| **OpenAI Codex** | 10 | 10 | 4（alpha） | Rust 版本高频迭代，Windows Bug 集中 |
| **Gemini CLI** | 10 | 10 | 1（nightly） | 安全修复密度最高（3 个 P1 安全 PR） |
| **DeepSeek Reasonix** | 10 | 10 | 0 | 无版本发布但修复 PR 密集 |
| **OpenCode** | 10 | 10 | 1（v1.18.2） | 发布与 PR 并行，桌面集成加速 |
| **Qwen Code** | 10 | 10 | 2（nightly + preview） | 默认模型快速升级，MCP 治理领先 |
| **Hermes** | 10（关联） | 10（精选 10） | 0 | 单日 50 PR 更新，社区贡献极活跃 |

- **Issue 热度**：Claude Code 和 OpenAI Codex 的单个 Issue 评论/点赞数远超其他（如 #18435 131 评论 657👍，#31814 79 评论 154👍），反映出用户基数最大，同时不满也最集中。
- **PR 产出**：Hermes 以 50 条 PR 领先，但版本未发布；OpenAI Codex、Gemini CLI、OpenCode、Qwen Code 均保持 10 条以上重要 PR；Claude Code 当日仅 4 条 PR，开发响应相对缓慢。
- **版本节奏**：OpenAI Codex（4 个 alpha）和 Qwen Code（2 个）发布最频繁，DeepSeek Reasonix 和 Hermes 当日无新版本，更多通过 PR 推进 fix。

## 3. 共同关注的功能方向

### 3.1 Agent 可靠性与稳定性（几乎所有工具）
- **死锁 / 无响应**：Claude Code 嵌套 Agent 永久 stall（#77950）；Gemini CLI 的 `Generalist agent hangs`（#21409，8👍）；DeepSeek Reasonix Agent 上下文丢失（#6538）；Qwen Code Agent 中途停止（#6990）
- **子代理与通信**：Claude Code 扇出启动 Token 47K（#77834）；OpenCode v1.18.2 默认禁止子代理嵌套；Gemini CLI 子代理误报成功（#22323）；OpenAI Codex Subagent 模型配置被忽略（#31814）

### 3.2 安全与信任边界（Claude Code、Gemini CLI、OpenCode、DeepSeek Reasonix、Qwen Code、Hermes）
- **注入防御**：Gemini CLI 阻断 `$VAR` 变量注入（#28403）；OpenCode 添加指令边界标记（#37187）；DeepSeek Reasonix MCP 可信执行与隔离（#6482）
- **密钥保护**：Qwen Code 净化 Shell 子进程 Daemon 密钥（#6606）；Hermes 修复 OAuth 分区清除（#63833）
- **权限 UI**：Claude Code 修复权限预览字符漏洞（v2.1.211）；Qwen Code MCP 权限 UI 卡死（#6992）

### 3.3 MCP 治理深度化（Claude Code、Gemini CLI、OpenCode、Qwen Code、DeepSeek Reasonix）
- **运行时故障**：Claude Code MCP 权限弹窗消失（#60385）；Gemini CLI MCP `tools/list` 超时（#28410）；Qwen Code MCP 链式调用失败（#6992）；OpenCode MCP 附件名校验异常（#37191）
- **作用域与隔离**：Qwen Code 工作空间级别 MCP 管理（#6954）；Hermes 无直接 MCP 但关注 provider 兼容；DeepSeek Reasonix 引入 MCP 签名目录与隔离（#6482）

### 3.4 跨平台与 IDE 集成（Claude Code、OpenAI Codex、Gemini CLI、OpenCode、DeepSeek Reasonix、Qwen Code）
- **Windows 缺陷**：OpenAI Codex ARM64 崩溃（#33381）、UI 卡顿（#33375）、Defender 高 CPU（#30527）；OpenCode WSL 通知崩溃（#37171）；Hermes Windows SYSTEM 网关发现（#63743）；DeepSeek Reasonix 高并发锁测试（#6540）
- **IDE 功能对齐**：Claude Code VS Code 缺少 `/workflows`（#74585）；OpenCode Web 版 Agent 选择器消失（#28769）；Qwen Code Web Shell 路径锁定（v0.19.10）
- **终端/显示兼容**：Gemini CLI Wayland 浏览器失败（#21983）；DeepSeek Reasonix 内置终端请求（#6513）

### 3.5 上下文与记忆管理（Claude Code、OpenCode、Gemini CLI、DeepSeek Reasonix、Hermes、Qwen Code）
- **压缩/紧凑问题**：Claude Code `/compact` 丢弃 Skills（#74990）；OpenCode compaction 预算溢出（#32656）；Gemini CLI 自动记忆低信号重试（#26522）
- **会话恢复与导出**：Hermes 检查点导出/导入（#63820）；DeepSeek Reasonix Memory 跨设备同步（#4340）；OpenCode 会话溢出后无法压缩（#17340）

### 3.6 成本与 Token 控制（Claude Code、OpenCode、Gemini CLI、OpenAI Codex、Hermes）
- **Token 浪费**：Claude Code 扇出启动 47K Token（#77834）；Gemini CLI 递归推理无上限（PR #28164 加 15 轮限制）；OpenAI Codex 新增 prompt cache 写入记录（#33454）
- **计费透明化**：OpenCode 读取 cache write tokens（#36752）；Gemini CLI 令牌紧凑格式异常（PR #63828）

## 4. 差异化定位分析

| 工具 | 核心差异 | 目标用户 | 技术路线特征 |
|------|----------|----------|-------------|
| **Claude Code** | 强调 Agent 编排（子代理、workflows），然稳定性不足 | 追求自动化多步骤任务的团队，Claude 忠实用户 | 深度绑定 Anthropic 模型，自有 Agent 协调层；企业多账户需求突出 |
| **OpenAI Codex** | Rust 重写 + 多源导入（Cursor/Claude Code） | 跨工具迁移者，NVIDIA/ChatGPT 订阅用户 | 矩阵式 agent（MultiAgent V2），但配置霸权引争议；Windows 体验是最大软肋 |
| **Gemini CLI** | 安全响应最快，AST 感知代码分析探索中 | 安全敏感型团队，Gemini 生态用户 | 长期记忆（Auto Memory）与 A2A 协议；递归上限、MCP 超时等保护机制完善较快 |
| **DeepSeek Reasonix** | 聚焦 Agent 模式下的上下文连续性与 UI 交互 | 开源模型 / 私有部署用户，桌面端早期采用者 | 开源优先，支持多供应商；计划双模型模式（Planner + Actor），但软件仍较初期 |
| **OpenCode** | 默认限制子代理嵌套，安全边界意识强 | 企业级用户，注重可控性和合规 | 插件化（Effect 动态工具、系统提示选择）；压缩与安全加固是迭代重点 |
| **Qwen Code** | MCP 治理最系统（工作空间隔离、可信调用上下文） | 企业团队，重多 workspace 和 CI 集成 | 背靠 Qwen 模型，快速升级；CI 增量构建、Todo 自动链是特色；企业微信集成有案例 |
| **Hermes** | 跨平台兼容性最广（WSL、Windows SYSTEM、UTF-8 BOM），社区贡献活跃 | 多 provider 切换用户，Windows/Linux 混合环境 | 插件钩子丰富（状态栏渲染、渠道适配）；检查点导入导出、OAuth 清理等做得好；无官方模型绑定 |

## 5. 社区热度与成熟度

- **高热度 / 用户量大但 Bug 密集**：**Claude Code** 和 **OpenAI Codex** 的 Issue 点赞与评论数远超其他（657👍、154👍），用户基数庞大，但 Agent 稳定性与桌面体验问题同样突出，属于“高期望伴随高风险”阶段。
- **社区活跃、迭代快速**：**Gemini CLI** 安全补丁最快（当日 3 个 P1 安全 PR），**Hermes** 单日 50 PR 显示社区贡献活跃，但前者仍有长期 P1 Bug，后者无版本发布；**OpenCode** 和 **Qwen Code** 以稳定节奏发版 + PR 并行，开发组织力较好。
- **快速追赶期**：**DeepSeek Reasonix** 无版本发布但 10 个 PR 集中修复 Agent 和 UI 问题，项目处于早期“烧 bug”阶段，社区反馈大量重复 Issue（UI 重叠 4 个重复），说明 QA 流程需加强。
- **成熟度相对领先**（结合版本与稳定性）：**OpenCode** 已发布 v1.18.2 并主动关闭不安全默认值，**Gemini CLI** 的安全前置策略使其防御机制更完善，但仍需解决 Agent 挂起问题。**Claude Code** 版本号已到 v2.1.211，功能最丰富，但社区对编排可靠性的信心动摇。

## 6. 值得关注的趋势信号

### 6.1 Agent 可靠性是当前最大瓶颈
同一天内，Claude Code、Gemini CLI、DeepSeek Reasonix、Qwen Code 均报告 Agent 死锁/中断/上下文丢失，OpenCode 直接默认关闭子代理嵌套。这说明 **Agent 编排层尚未达到生产可用**——用户在尝试将实际任务委托给 AI 时频繁遭遇失败，这可能减缓 Agent 工作流普及速度。

### 6.2 安全从“可选”变为“前置条件”
Gemini CLI 同时阻断 `$VAR` 注入、修复 MCP 超时、限制递归推理；OpenCode 添加 prompt 边界标记；Qwen Code 和 Hermes 进行密钥环境净化。环境变量泄漏、MCP 权限绕过、递归资源耗尽已作为**全局风险**被正视。对企业采购者而言，安全加固速度将成为选型关键指标。

### 6.3 MCP 进入“治理”阶段
不再仅是“能否调用”，而是**如何限制作用域**（Qwen Code 工作空间级 MCP）、**如何保障运行时**（超时、链式调用失败）、**如何审计**（可信调用上下文传播）。这预示着未来 MCP 会成为类似 API 网关的基础设施组件。

### 6.4 跨平台体验成“分水岭”
Windows 和 Linux 桌面端的问题在 OpenAI Codex、OpenCode、Hermes、DeepSeek Reasonix 中集中爆发。随着更多开发者将 AI CLI 作为日常工具（而非仅在终端使用），**桌面集成度（通知、启动器、会话管理）** 将成为留存用户的核心竞争力。

### 6.5 工作空间与企业级隔离成刚需
从 Claude Code 的多账号切换（#18435 社区第一），到 Qwen Code 的工作空间 MCP 与设置隔离，再到 Hermes 的 per-host 配置覆盖修复，社区明确要求 **AI 工具能适应多项目、多团队、多身份**的复杂环境。单全局配置的时代正在结束。

### 6.6 工具链走向互通
OpenAI Codex 主动支持从 Cursor、Claude Code 导入配置（#33426、#33444）；Hermes 推出会话检查点导出/导入（#63820）；用户希望**不被单一工具锁定**。跨工具迁移与数据便携性将成为差异化竞争点，也可能催生第三方迁移工具。

---

*报告基于 2026-07-16 各工具官方 GitHub 社区动态生成，数据截至当日。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-07-16）

## 1. 热门 Skills 排行（Top 8）

### 🔧 #1298 fix(skill-creator): run_eval.py 0% recall 修复
**功能：** 修复 skill-creator 工具链中 `run_eval.py` 始终报告 0% recall 的核心 bug，该 bug 直接导致描述优化循环（`run_loop.py`）无法正常工作。
**热度焦点：** 直接关联 #556（12 条评论）、#1169（3 条评论）等大量 Issues，是当前工具链最严重的阻塞点，社区对 Windows 平台的兼容性修复呼声极高。
**状态：** Open
https://github.com/anthropics/skills/pull/1298

### 🎨 #514 Add document-typography skill
**功能：** 新增排版质量检查 Skill，自动修正 AI 生成文档中的孤字成行、段落孤行、编号错位三类常见排版问题。
**热度焦点：** 社区普遍认为排版是 AI 文档的"最后一公里"痛点，属高频刚需，且与 #486（ODT）、#538（PDF 修复）等文档类贡献形成集群效应。
**状态：** Open
https://github.com/anthropics/skills/pull/514

### 🧪 #723 feat: add testing-patterns skill
**功能：** 覆盖完整测试栈的 Skill，包含测试金字塔、AAA 模式、React Testing Library、命名规范等工程实践。
**热度焦点：** 社区对"测试生成"的需求已升级为对"测试架构与策略指导"的完整诉求，该 Skill 填补了工程实践领域的系统级能力空白。
**状态：** Open
https://github.com/anthropics/skills/pull/723

### 🔍 #1367 feat(skills): add self-audit（推理质量门禁）
**功能：** 交付前审计 Skill，先进行机械文件验证，再按损害严重性顺序执行四维推理质量审计。
**热度焦点：** 代表社区对 AI 输出可靠性保障的高度关注，后续已衍生出 #1385（三阶段质量管线提案）的跟进讨论，理念超前。
**状态：** Open
https://github.com/anthropics/skills/pull/1367

### 📄 #486 Add ODT skill
**功能：** 支持 OpenDocument 格式（ODT/ODS）的创建、填充、读取及 HTML 转换。
**热度焦点：** 企业用户对 LibreOffice 等开源办公格式的兼容性有刚需，直接回应了用户对非专有格式的支持请求，体现社区对开放标准的偏好。
**状态：** Open
https://github.com/anthropics/skills/pull/486

### 🎮 #525 Add pyxel skill for retro game development
**功能：** 为 Pyxel 复古游戏引擎新增 Skill，集成 MCP 服务器，覆盖"写→运行→检查→迭代"全工作流。
**热度焦点：** 典型的"MCP + Skill"深度整合实践，代表了社区对创造性工具与 Skill 生态融合方向的积极探索，由库作者提交保证了专业度。
**状态：** Open
https://github.com/anthropics/skills/pull/525

### 🔬 #83 Add skill-quality-analyzer & skill-security-analyzer
**功能：** 两个元技能，分别在结构/文档/功能/完整性/安全性维度评估 Skill，或进行专门的安全审计。
**热度焦点：** 直接呼应 #492 等社区技能安全争议，社区希望通过工具化手段建立贡献规范与质量底线，代表了社区自治力量的崛起。
**状态：** Open
https://github.com/anthropics/skills/pull/83

### 🌈 #1302 Add color-expert skill
**功能：** 极致的色彩专家 Skill，覆盖 ISCC-NBS、Munsell、XKCD、RAL 等色彩系统及色彩空间选择指南。
**热度焦点：** 代表社区对"深度领域专家"技能套件的期待。该 PR 结构完整、示例清晰，可作为社区贡献的"教科书式"范本。
**状态：** Open
https://github.com/anthropics/skills/pull/1302

---

## 2. 社区需求趋势（From Issues）

| 核心方向 | 关联 Issues | 社区诉求 |
|---|---|---|
| **安全审计与信任治理** | #492（34条评论） | Anthropic 命名空间下的社区 Skill 存在信任边界滥用风险，强烈要求引入官方审核与命名规范 |
| **企业级协作与分发** | #228（14条评论） | 企业用户急需组织级 Skill 库、分享链接和权限管理，脱离原始的 `.skill` 文件人肉传递 |
| **工具链稳定性与跨平台支持** | #556（12条）、#1061（3条）、#1169（3条） | skill-creator 在 Windows 上完全不可用，0% recall 是社区头号公敌 |
| **Agent 状态与记忆管理** | #1329（9条评论） | 长期运行 Agent 的上下文膨胀问题亟需符号化、紧凑化的记忆表达方案 |
| **生态标准化与平台桥接** | #16（Skills as MCP）、#29（Bedrock 集成） | Skills 不应是孤岛，社区期待其与 MCP 协议、AWS Bedrock 等平台无缝互通 |

---

## 3. 高潜力待合并 Skills

以下 PR 虽尚未合并，但已具备较高完成度并引发活跃社区讨论，预计近期或有落地方向：

- **#1367 self-audit**：概念完整的推理质量门禁，代表了 AI 输出保障的未来方向，有望成为官方标配。
- **#723 testing-patterns**：通用性强，直接回应对测试架构指导的系统性需求，工程角色期待度高。
- **#514 document-typography**：低门槛、高回报的日常高频场景 Skill，体验改善立竿见影。
- **#1302 color-expert**：社区贡献中鲜有的"深度领域专精"作品，可作为 Skill 最佳实践模板被合入。
- **#1298 群组（含 #1323、#1099、#1050）**：虽然定位是"修 Bug"，但其合并优先级实际最高——不修复 0% recall，其他所有 Skills 的迭代优化流程都无法正常跑通。

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：修复核心工具链的致命 Bug 以保障基础可用性，同时建立安全审计、企业级分发与跨平台兼容等基础设施，推动社区从“功能堆砌”阶段迈向“工程化与治理”的成熟生态。**

---

# Claude Code 社区动态日报 | 2026-07-16

## 📰 今日速览

Claude Code 发布 v2.1.211 版本，重点增加了子代理文本在 `stream-json` 输出中的可透传性，并修复了权限预览中的字符安全漏洞。社区层面，**Agent 生态的稳定性与成本问题**成为最集中的议题——嵌套代理通信死锁、Token 扇出浪费等阻断性 Bug 被密集反馈。同时，VS Code 扩展与 CLI 之间的**功能对齐**（尤其是 `/workflows` 命令缺失）以及**企业级多账户管理**需求持续高热。

---

## 🚀 版本发布

### v2.1.211
- **新增** `--forward-subagent-text` 标志 / `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT` 环境变量：允许在 `stream-json` 输出中包含子代理的文本和思考过程，显著提升了自动化工作流中对复杂 Agent 任务进展的可见性。
- **修复** 中继到聊天渠道的权限预览未正确中和双向覆盖（bidirectional-override）、零宽（zero-width）及伪装字符（look-alike）的安全问题。

> 链接：[Release Page](https://github.com/anthropics/claude-code/releases/tag/v2.1.211) (示例)

---

## 🔥 社区热点 Issues（Top 10）

| 排名 | Issue | 类型 | 热度 | 一句话值得关注的理由 |
|------|-------|------|------|----------------------|
| 1 | [#18435 多账号切换](https://github.com/anthropics/claude-code/issues/18435) | Enhancement | 131 评论 · 657 👍 | **社区票选第一的需求**，企业级多用户/多 Workspace 场景刚需，1Password 式的 Profile 切换是核心诉求。 |
| 2 | [#18467 个人 GitHub 仓库不可见](https://github.com/anthropics/claude-code/issues/18467) | Bug | 25 评论 · 65 👍 | 基础集成重大缺陷——个人开发者登录 Claude Web 后无法查看自己的仓库，严重阻塞普通用户入门。 |
| 3 | [#60385 MCP 权限提示不渲染](https://github.com/anthropics/claude-code/issues/60385) | Bug | 20 评论 | `--remote-control` 模式下，非只读 MCP 工具的审批弹窗在 Web UI 中完全消失，**远程会话直接卡死**，是 MCP Web 化的关键拦路虎。 |
| 4 | [#40043 无法从 Cowork 移除本地目录](https://github.com/anthropics/claude-code/issues/40043) | Enhancement | 17 评论 · 55 👍 | Cowork 协作模式的核心 UX 缺失——一旦添加本地目录就无法删除，用户要求上下文管理的灵活度。 |
| 5 | [#77834 Agent 扇出启动 Token 高达 47K](https://github.com/anthropics/claude-code/issues/77834) | Bug/Fan-out | 新 Issue | 每个小任务消耗约 47K 未经缓存的启动 Token，**导致多 Agent 并联时百万级无效消耗**，成本敏感团队的痛点。 |
| 6 | [#77950 嵌套 Agent 通信永久 Stall](https://github.com/anthropics/claude-code/issues/77950) | Bug | 新 Issue | **孙级后台 Agent 完成后无法回传消息给直接父级**，父级永久挂起。针对 Agent 编排树的致命 Bug，结合 #74317 类似的信号，表明 Agent 协调层极不稳定。 |
| 7 | [#74585 / #75146 VS Code 缺少 `/workflows` 支持](https://github.com/anthropics/claude-code/issues/74585) | Enhancement | 5 👍 / 3 👍 (多帖) | 用户反复提报，Workflows 作为核心差异化功能在 VSCode 扩展中完全不可用，**IDE 重度用户严重不满**。 |
| 8 | [#74990 Compact 直接丢弃 Skills 系统提示](https://github.com/anthropics/claude-code/issues/74990) | Bug | 2 评论 | `/compact` 会从上下文中**直接删除全部 `Available skills` 提示**，导致模型对已安装的 Skill 失忆，`/reload-skills` 也无法恢复。 |
| 9 | [#77463 Session 实例对用户完全不可见](https://github.com/anthropics/claude-code/issues/77463) | Bug | 2 评论 | 多个终端/IDE 表面产生“分身”效应，用户无法识别 Session 实例，导致 **冲突的写操作与大量 Token 浪费**（Kids in a Trenchcoat 问题）。 |
| 10 | [#58693 拼写检查无法关闭](https://github.com/anthropics/claude-code/issues/58693) | Bug/UX | 7 评论 | 强制开启的拼写检查严重干扰代码/混合文本输入，看似小问题，但反映出对用户偏好控制的缺失，评论数增长快。 |

---

## 🔧 重要 PR 进展（过去 24h 全部 PR）

由于过去 24 小时内仅产生 **4 条 PR**，以下全部列出并分析其社区意义：

### 新增 / 功能
- **[#77916 code-quality-pipeline 插件](https://github.com/anthropics/claude-code/pull/77916)** （作者：@RonMizrahi）
  - **内容**：定义了两个代码质量关卡（Per-file 4 步流水线 + e2e Merge Gate），将 Claude Code 嵌入标准 CI/CD 流程。
  - **分析**：标志着社区开始深度探索 **Claude Code 在规范化 SDLC 中的应用**，将 AI Agent 绑定到可审计的质量门禁上。

- **[#77613 claude-compare](https://github.com/anthropics/claude-code/pull/77613)** （作者：@1napz）
  - **内容**：摘要为空，但从命名来看可能涉及会话对比、A/B 测试或上下文效果对比。
  - **分析**：值得持续关注，若实现完善，会成为评估 Prompt 和 Agent 行为差异的实用工具。

### 文档 / 配置
- **[#77709 官方 Marketplace 限制示例配置](https://github.com/anthropics/claude-code/pull/77709)** （作者：@hangnality）
  - **内容**：提供了 `settings.json` 示例，利用 `strictKnownMarketplaces` 仅允许从 Anthropic 官方市场安装插件。
  - **分析**：**企业安全刚需**——管理员需要锁定插件来源以防止供应链攻击，此配置示范填补了治理空白。

### 修复
- **[#77705 validate-settings.sh 前端检查逻辑修复](https://github.com/anthropics/claude-code/pull/77705)** （作者：@andyleeboo）
  - **内容**：修复了 `plugin-dev` 脚本中一个边缘 Bug——无 YAML 前端标记的文件会错误地通过验证。
  - **分析**：提升了插件开发的**工具链健壮性**，避免无效插件配置被误放行。

---

## 📊 功能需求趋势

综合过去 24 小时内活跃的 50 条 Issue，社区最关注的三大方向：

| 趋势 | 核心诉求 | 代表 Issue |
|------|----------|------------|
| **跨平台功能对齐** | 消除 VS Code 扩展与 CLI 之间的功能鸿沟，尤其是 `/workflows`、MCP 远程控制、流式子代理输出。 | #74585, #60385, #62149 |
| **企业级账户与治理** | 多账号 Profile 切换、个人/组织仓库可见性、Marketplace 来源锁定。 | #18435, #18467, PR #77709 |
| **Agent 编排稳定性与成本** | 修复嵌套通信死锁、Control Fan-out 的 Token 爆炸、提升 Compact 对 Skills 的保真度。 | #77950, #77834, #74990 |

---

## 🩺 开发者关注点（痛点和高频需求）

1. **Agent 可靠性严重不足**
   - 子代理虚构后台 Agent 导致死锁（#74317）。
   - 孙级 Agent 无法回传结果给父级（#77950）。
   - 高频问题集中爆发，社区对 Agent 编排的信心在动摇。

2. **Token/成本失控**
   - 小并行任务动辄消耗数百万 Token（#77834, #65920）。
   - 用户要求可配置的自动压缩阈值（#70681）。

3. **Web 与 IDE 生态成熟度不足**
   - Web 端无法处理 MCP 权限审批（#60385）。
   - VSCode 扩展缺少 `/workflows`、`remoteControlAtStartup` 配置不生效（#62149）。

4. **会话与数据管理**
   - 多 Session 实例无标识导致数据冲突（#77463）。
   - `/compact` 静默删除关键 Skills（#74990）。
   - 删除 Session 无二次确认，易误操作（#65703）。

5. **用户体验细节打磨**
   - Vim 模式下 Esc 清空输入（#69181）。
   - 拼写检查无法关闭（#58693）。
   - 退出时屏幕内容被清空（#62681）。

---

> **总评**：v2.1.211 对子代理的可见性改进是一次正确的信号，但社区目前正被 **Agent 稳定性/成本** 和 **Web/IDE 功能对齐** 双重压力所驱动。如果 Anthropic 不能在未来几个迭代中显著改善 Agent 编排的可靠性与 Token 经济性，开发者向 Agent 工作流的迁移可能会减速。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 | 2026-07-16

## 今日速览
Windows 桌面应用成为本周矛盾的焦点——ARM64 版本出现启动崩溃、UI 严重延迟以及 Defender 高 CPU 等问题集中爆发，社区反馈激烈。MultiAgent V2 的配置覆盖行为引发 subagent 模型限制争议（#31814，79 条评论）。PR 方面，团队持续推进外部 agent 迁移、Cursor 配置导入以及 Windows 沙箱安全加固，并开始追踪 prompt cache 用量。

## 版本发布
过去 24 小时内发布了 4 个 Rust 版本的 alpha 小版本，均为基于 0.145.0 的后续迭代，官方未提供详细的变更说明：
- [rust-v0.145.0-alpha.15](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.15)
- [rust-v0.145.0-alpha.14](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.14)
- [rust-v0.145.0-alpha.13](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.13)
- [rust-v0.145.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.12)

## 社区热点 Issues（10 条）

1. **[#31814] Subagent 模型配置被 MultiAgent V2 忽略**  
   GPT‑5.6 Sol 强制所有 subagent 也使用 Sol，无视用户设置，79 条评论、154 👍 热度最高。  
   https://github.com/openai/codex/issues/31814

2. **[#33381] Windows ARM64 桌面应用启动崩溃**  
   `serialport` 原生模块加载失败（0xC06D007F），Crashpad 持续写 dump，35 条评论。  
   https://github.com/openai/codex/issues/33381

3. **[#33375] Windows 版频繁 UI 卡顿**  
   重复的 `serialport.node` 延迟加载失败导致界面严重滞后，21 条评论。  
   https://github.com/openai/codex/issues/33375

4. **[#23198] Windows 桌面整体运行极慢**  
   长期问题，即使机器负载正常 Codex 依然卡顿，44 👍，16 条评论。  
   https://github.com/openai/codex/issues/23198

5. **[#30527] 更新后 Windows Defender 行为监控 CPU 飙升**  
   触发实时扫描导致高 CPU，影响 i5‑6300U 等低配设备，11 👍。  
   https://github.com/openai/codex/issues/30527

6. **[#31826] 反复提示“需更新版本”实为最新**  
   CLI 版本检测异常，10 条评论，影响 NVIDIA 订阅用户。  
   https://github.com/openai/codex/issues/31826

7. **[#27284] SSH Remote 项目显示“No chats”**  
   Remote 会话真实存在但 UI 无法加载，10 条评论，macOS + Linux 混合环境。  
   https://github.com/openai/codex/issues/27284

8. **[#13036] 应用不支持多聊天同时显示**  
   最受关注的增强请求，多 agent/多任务场景受限，10 条评论，6 👍。  
   https://github.com/openai/codex/issues/13036

9. **[#26478] Windows 拼写检测始终“No Guesses Found”**  
   原生拼写可用但 Codex 菜单不显示建议，20 👍，10 条评论。  
   https://github.com/openai/codex/issues/26478

10. **[#32653] MCP 工具调用缺失结果导致桌面崩溃**  
    更新后 tool call result 为空时整应用崩溃，7 条评论，Windows 11。  
    https://github.com/openai/codex/issues/32653

## 重要 PR 进展（10 条）

1. **[#33456] 外部 agent 迁移逻辑抽成独立 crate**  
   重构 `codex-app-server`，为后续多源导入（Cursor、Claude Code）提供模块化基础。  
   https://github.com/openai/codex/pull/33456

2. **[#33455] 扩展危险命令检测（backport）**  
   强化 `rm` 等命令的解析，启用“危险全访问”模式下的拦截，提升安全性。  
   https://github.com/openai/codex/pull/33455

3. **[#33454] 记录 Prompt Cache 写入 token**  
   新增 `cache_write_input_tokens` 字段，用于用量统计和计费透明化。  
   https://github.com/openai/codex/pull/33454

4. **[#33444] 添加外部 agent 记忆迁移**  
   支持将 Claude Code 等外部工具的项目记忆（Markdown）导入 Codex Memory 扩展。  
   https://github.com/openai/codex/pull/33444

5. **[#33432] 子代理（subagent）保留分页历史**  
   派生或 fork 子 agent 时继承父级的分页模式，避免长上下文丢失。  
   https://github.com/openai/codex/pull/33432

6. **[#33430] Windows 沙箱避免创建元数据目录**  
   防止 elevated sandbox 建立只读保护目录导致权限冲突，修复 workspace write 问题。  
   https://github.com/openai/codex/pull/33430

7. **[#33426] 新增 Cursor 配置导入**  
   `/import` 流程可读取 Cursor 的设置、MCP 服务器、项目指令、hooks、agent 定义等。  
   https://github.com/openai/codex/pull/33426

8. **[#33425] 通过 world state 刷新 host skill 目录**  
   运行中动态更新技能列表而无需重启线程，减少冗余注入。  
   https://github.com/openai/codex/pull/33425

9. **[#33423] 并发加载 executor 插件声明**  
   MCP 与 app connector 声明文件并行读取，降低远程环境的启动延迟。  
   https://github.com/openai/codex/pull/33423

10. **[#31781] 限制 executor 可控的 HTTP 响应缓冲**  
    防止恶意 executor 通过超大帧压垮 app-server，增强数据面安全性（code‑reviewed）。  
    https://github.com/openai/codex/pull/31781

## 功能需求趋势
- **Windows 平台稳定性**：超过半数的高热度 bug 均来自 Windows 桌面，包括 ARM64 崩溃、Defender 冲突、UI 延迟、拼写失效，社区呼吁优先修复。
- **多源 agent/工具导入**：PR 中频繁出现 Cursor、Claude Code 配置导入，说明跨平台/跨工具迁移成为刚需。
- **上下文窗口灵活配置**：用户希望 GPT‑5.6 Sol 的全量 1.05M 上下文可手动启用，并自定义压缩策略（#33306）。
- **多聊天同时显示**：单线程工作流无法满足多 agent 协作，要求应用原生支持多标签/分栏。
- **MCP 稳定性与兼容性**：从工具调用崩溃到命名空间封装冲突，MCP 生态的可靠性需求持续上升。

## 开发者关注点
- **Windows 桌面体验是最大痛点**：反复出现的 crash‑loop、UI 卡顿、Defender 误杀，严重影响日常开发。
- **配置被静默覆盖**：MultiAgent V2 擅自修改 subagent 模型、忽略 `agents.max_threads`，开发者对“配置霸权”表达不满。
- **远程 SSH 的“No chats”幽灵问题**：用户数据并未丢失但界面不可见，复现路径多样（symlink、reboot），沟通成本高。
- **CLI 版本校验误报**：部分用户被强制提示升级但已是最新，影响 CI/CD 流程。
- **MCP 工具包装不兼容**：Custom/local provider 下 tools 被包裹为 `namespace` 导致第三方后端无法解析（#23186），限制自定义模型场景。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-07-16

## 今日速览

过去 24 小时内，Gemini CLI 社区重点推进了安全加固与稳定性修复：**修复了 MCP tools/list 发现超时导致 CLI 启动冻结的问题**（PR #28410），**阻断了一个严重的 shell 变量注入漏洞（$VAR/${VAR}）**（PR #28403），**为核心代理添加了递归推理轮次上限以防止无限循环**（PR #28164），并**修复了取消工具调用后导致会话 400 错误的严重 bug**（PR #28407）。此外，nightly 版本 v0.52.0-nightly.20260715 已自动发布。

## 版本发布

### v0.52.0-nightly.20260715.gfa975395b
- 自动发布的夜间构建版本，包含近期的提交和修复。
- **Full Changelog**：[v0.52.0-nightly.20260714...v0.52.0-nightly.20260715](https://github.com/google-gemini/gemini-cli/compare/v0.52.0-nightly.20260714.gfa975395b...v0.52.0-nightly.20260715.gfa975395b)

## 社区热点 Issues

### 1. [#22323 Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323) [P1/Bug]
- **重要性**：子代理（codebase_investigator）达到最大轮次限制后却向主代理报告“成功”、原因为“GOAL”，实际未完成任何分析，掩盖了中断。社区 10 条评论，反馈该行为具有欺骗性，会使用户误认为任务已正常完成。
- **社区反应**：2 个赞，开发者认为这种错误报告会严重干扰调试与对 Agent 的信任。

### 2. [#21409 Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409) [P1/Bug]
- **重要性**：通用（Generalist）子代理在执行简单操作（如创建文件夹）时永久挂起，用户等待长达一小时后取消。7 条评论，**获得 8 个赞**，是社区反馈最强烈的问题之一。临时解法是指示模型不要委托给子代理。
- **社区反应**：用户普遍认为这是日常使用的主要障碍。

### 3. [#25166 Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166) [P1/Bug]
- **重要性**：Shell 命令执行完毕后，CLI 依然显示命令活动并提示“Awaiting user input”，导致流程卡死。影响几乎所有涉及 shell 执行的场景。获得 3 个赞，4 条评论。
- **社区反应**：用户报告该问题高频复现，即使是简单命令（如 `ls`）也会触发。

### 4. [#21983 browser subagent fails in wayland](https://github.com/google-gemini/gemini-cli/issues/21983) [P1/Bug]
- **重要性**：浏览器子代理在 Wayland 显示服务器下运行失败，直接抛出错误。4 条评论，P1 优先级，影响 Linux 桌面用户。
- **社区反应**：报告者提供了详细的错误日志，期待对 Wayland 的原生支持。

### 5. [#22745 Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745) [P2/Feature]
- **重要性**：探索利用抽象语法树（AST）感知的文件读取、搜索和代码库映射，可精确读取方法边界、减少轮次与 token 噪声。7 条评论，代表了 Agent 理解代码效率的重要改进方向。
- **社区反应**：开发者积极讨论 glyph 和 tilth 等 AST 工具的实现路径。

### 6. [#21968 Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968) [P2/Bug]
- **重要性**：用户反映 Gemini CLI 不会主动使用自定义技能和子代理，即使提示词高度匹配，Agent 仍倾向于自行生成命令而不是复用已有技能。6 条评论。
- **社区反应**：被认为是 Agent 自主性的核心短板，用户期望更智能的工具选择。

### 7. [#22672 Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672) [P2/Feature]
- **重要性**：Agent 在 git 撤销、数据库维护等场景中可能使用 `git reset --force` 等危险命令，社区呼吁加入安全护栏，优先提示更安全的方案。3 条评论，获得 1 个赞。
- **社区反应**：用户担忧 Agent 在当前阶段对破坏性操作风险认识不足。

### 8. [#26522 Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522) [P2/Bug]
- **重要性**：自动记忆（Auto Memory）系统在处理低信号会话时，提取代理若选择不处理，则该会话会不断被重新索引，导致无效重试。5 条评论。
- **社区反应**：该问题导致 CPU 和配额持续消耗，社区希望加入跳过机制或退避策略。

### 9. [#22267 Browser Agent ignores settings.json overrides (e.g., maxTurns)](https://github.com/google-gemini/gemini-cli/issues/22267) [P2/Bug]
- **重要性**：浏览器子代理完全忽略全局/项目 settings.json 中的配置覆盖（如 `maxTurns`）。虽然 `AgentRegistry` 正确读取了配置，但子代理初始化时并未使用。3 条评论。
- **社区反应**：用户自定义的能力被架空，是配置管理上的关键断点。

### 10. [#26525 Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525) [P2/Security]
- **重要性**：Auto Memory 读取本地日志并将内容发送至模型，但机密脱敏在内容已进入模型上下文后才执行。建议加入确定性脱敏并减少日志记录，防止 secret 泄露。3 条评论。
- **社区反应**：安全与隐私敏感用户对此高度关注，希望采取更主动的数据保护措施。

## 重要 PR 进展

### 1. [#28410 fix(core): shorten MCP tools/list discovery timeout so it fails fast](https://github.com/google-gemini/gemini-cli/pull/28410) [P1]
- 修复 MCP 服务器未响应 `tools/list` 时 CLI 启动可能冻结**长达 10 分钟**的问题。添加默认短超时以实现快速失败，大幅提升 MCP 的可靠性。

### 2. [#28407 fix(core,a2a): group cancelled tool responses and coalesce consecutive roles to prevent 400 Bad Request](https://github.com/google-gemini/gemini-cli/pull/28407) [已合并]
- 修复了用户在取消/拒绝工具调用后发送后续消息导致**严重 400 Bad Request** 的 bug，该问题强制用户不得不开启新会话。通过分组取消响应和合并连续角色解决，恢复了聊天连续性。

### 3. [#28403 fix(core): block \$VAR and \${VAR} variable expansion bypass (GHSA-wpqr-6v78-jr5g)](https://github.com/google-gemini/gemini-cli/pull/28403)
- **安全修复**：先前只阻止 `$()` 和反引号，`$VAR`/`${VAR}` 可绕过检测导致攻击者利用提示窃取环境变量（如 `GITHUB_TOKEN`）。该补丁覆盖了所有 Bash 变量扩展形式，彻底根除此类注入。

### 4. [#28164 fix(core): limit recursive reasoning turns per single user request](https://github.com/google-gemini/gemini-cli/pull/28164)
- 为核心推理引擎添加了**严格的递归轮次上限（默认 15 轮）**，防止 Agent 在单次用户请求中陷入无限推理循环，保护本地 CPU 资源与 API 配额。上限可通过 `maxSessionTurns` 自定义。

### 5. [#28406 fix(availability): apply modelIdResolutions to tool sub-agent model configs](https://github.com/google-gemini/gemini-cli/pull/28406) [P1]
- 修复 web-search 等工具子代理因硬编码 `gemini-3-flash-preview`，导致没有预览权限的 API 用户遇到 `INVALID_MODEL` 错误。现在模型 ID 解析机制会应用到所有工具子代理的配置。

### 6. [#28405 fix: prevent scroll position jump when user scrolls up during content updates](https://github.com/google-gemini/gemini-cli/pull/28405) [P1]
- 修复了用户在向上滚动查看历史内容时，新内容到来导致滚动位置自动跳转到底部或顶部的恼人问题。改进了 `VirtualizedList` 的自动黏底判断逻辑。

### 7. [#28319 refactor(a2a-server): enforce path trust check prior to environment loading and isolate task environment](https://github.com/google-gemini/gemini-cli/pull/28319)
- 重构了 A2A 服务端初始化顺序：**在加载工作区环境变量之前先执行路径信任检查**，防止不可信路径下加载恶意环境变量。同时使用 `AsyncLocalStorage` 隔离任务上下文，提升安全性。

### 8. [#28305 feat(evals): add tool call formatter and integrate failure summaries](https://github.com/google-gemini/gemini-cli/pull/28305)
- 行为评估失败时，测试运行器现在会自动打印**工具调用时间线**（含编号、参数、状态、错误详情）。大幅提升了评估失败的可诊断性，方便开发者快速定位 Agent 行为异常点。

### 9. [#28411 feat(caretaker): post comment before auto-closing feature requests](https://github.com/google-gemini/gemini-cli/pull/28411)
- Caretaker 机器人在自动关闭功能请求（feature request）之前，会先发布一条解释性评论，告知用户当前工程聚焦于核心稳定性。改善了对社区反馈的沟通与预期管理。

### 10. [#28219 fix(cli): parse commented settings.json in memory bootstrap](https://github.com/google-gemini/gemini-cli/pull/28219) [已合并]
- 修复了内存引导阶段（轻量 CLI 父进程）无法读取**包含注释的 settings.json** 导致静默回退到默认配置的问题。用户的自定义设置（包括注释）现在能正确加载，提升了部署灵活性。

## 功能需求趋势

根据过去 24 小时更新的 Issues 与 PR，社区最关注的功能方向包括：

- **AST 感知的代码分析**（如 #22745、#22746）：利用抽象语法树精确读取方法边界、提升 Agent 代码理解能力，减少冗余轮次与 token 消耗。
- **安全护栏与隐私保护**（#22672、#26525、#28403）：要求 Agent 在执行破坏性操作时给出警告；在记忆系统中实现确定性脱敏和减少日志，防泄漏。
- **Agent 自主性与工具使用**（#21968、#21000）：期望 Agent 能主动且合理地调用自定义技能、系统原生工具，而非自行编写脚本。
- **配置灵活性与兼容性**（#22267、#28219、#21983）：支持 settings.json 注释、子代理读取配置覆盖，以及 Wayland 等终端环境适配。
- **评估与质量保障**（#24353、#28305、#23166）：建立稳健的组件级评估、可视化工具调用时间线、稳定内部测试套件。
- **子代理行为透明性**（#22598、#21763）：要求子代理轨迹能被 `/chat share` 分享，bug 报告包含子代理上下文，增强可观测性。

## 开发者关注点

综合社区反馈，开发者当前的主要痛点与高频需求包括：

- **Agent 挂起与无响应**：尤其在通用子代理与 shell 命令执行后卡死，严重影响日常使用信任度。
- **安全漏洞敏感性**：环境变量注入漏洞被快速发现并提出，开发者对密钥泄露、恶意提示注入高度警惕。
- **配置难以生效**：settings.json 被静默忽略、子代理配置覆盖失效，增加了上手与定制成本。
- **资源控制不足**：递归推理循环、自动记忆低信号重试、MCP 超时机制缺失，都导致 CPU 与 API 配额的浪费。
- **工具使用不充分**：Agent 倾向于生成临时脚本而非复用已有技能/skills，效率与质量均不理想。
- **平台兼容问题**：Wayland 上浏览器子代理失败、终端 resize 闪烁、emoji 截断等显示问题，影响 Linux 及特殊终端用户的使用体验。

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

好的，这是为你准备的 `DeepSeek-Reasonix` 社区动态日报（2026-07-16）。

---

## DeepSeek Reasonix 社区动态日报（2026-07-16）

### 今日速览
社区昨日（7月15日）迎来一次 Issue 与 PR 提交高峰。**Agent** 模式下上下文丢失、UI 模型列表重叠、以及 Mermaid 渲染崩溃是社区反馈最强烈的痛点。开发团队反应迅速，针对 UI 重叠和 MCP 安全隔离的关键 PR（#6539、#6482）已经提交或合并，显示出项目正加速向生产环境打磨。同时，内置终端、跨设备记忆同步等开发者呼声极高的功能处于热议中。

### 版本发布
过去24小时内暂无新版本发布。

### 社区热点 Issues（Top 10）

1.  **[#4340] Memory 路径迁移与跨设备同步**
    - **摘要**：用户希望 Memory 文件默认保存在用户目录或项目下，以便于更换电脑时迁移对话记忆。
    - **为何重要**：获得 **4 个 👍**，这是涉及用户核心数据持久化与工作流连续性的基础需求，直接关系到用户粘性。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/4340)

2.  **[#6480 / #5563 / #5585 / #5785] 模型列表 UI 重叠（批量反馈）**
    - **摘要**：多个用户在不同版本（1.13.1 - 1.17.12）及不同模型供应商（硅基流动、火山引擎）下均反馈，当模型数量较多时，配置页面的选择框会重叠。
    - **为何重要**：**四个重复 Issue** 表明该问题是当前桌面版最严重的 UI 回归，严重影响了模型配置体验。
    - [查看详情 1](https://github.com/esengine/DeepSeek-Reasonix/issues/6480) | [2](https://github.com/esengine/DeepSeek-Reasonix/issues/5563)

3.  **[#6538] Agent 上下文丢失（“说完就忘”）**
    - **摘要**：用户反馈 Agent 模式似乎变成了单轮对话工具，模型在同一会话中无法记住上下文，甚至忘记自己刚刚修改过的文件。
    - **为何重要**：这是当前 **Agent 模式最致命的 Bug**，直接破坏自动化任务的执行逻辑。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6538)

4.  **[#6526] Mermaid 渲染导致 Reasonix 崩溃**
    - **摘要**：在会话中生成 Mermaid 图表 HTML 时，Reasonix 突然崩溃且无法正常打开。
    - **为何重要**：**Crash 级别 Bug**，严重破坏开发连续性。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6526)

5.  **[#6531] 粘贴文字无法撤销（Undo）**
    - **摘要**：`Ctrl+Z` 对粘贴的文字无效，仅对键盘输入生效。
    - **为何重要**：文本编辑的基础操作，违背用户预期，属于高优先级的 UX Bug。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6531)

6.  **[#6541] 思维链模式（Thinking Mode）请求格式错误**
    - **摘要**：开启 Thinking 模式后，因 JSON格式错误导致 API 请求被拒绝（HTTP 400）。
    - **为何重要**：直接影响核心“推理”功能的使用，是协议层的严重 Bug。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6541)

7.  **[#6510 / #6509] 分叉（Fork）会话显示内容错误**
    - **摘要**：用户 Fork 某个消息后，新创建的会话窗口默认显示的是上一个会话的内容，而非预期的当前会话内容。
    - **为何重要**：**核心功能异常**，分叉是 Agent 工作流中分支探索的关键路径。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6510)

8.  **[#6491] 允许删除上下文中的历史信息**
    - **摘要**：用户上传无用或损坏的图片后，无法手动将其从上下文移除，导致后续请求因上下文过大或格式问题失败。
    - **为何重要**：这是一个高频出现的“脏数据”治理需求，社区点赞极高。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6491)

9.  **[#6513] 内置终端**
    - **摘要**：用户强烈希望在 Reasonix 内部集成终端，以便于调试，减少对 VSCode 的依赖。
    - **为何重要**：代表用户期望 Reasonix **从对话工具演变为全栈开发环境**。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6513)

10. **[#6520] 计划模式焦点自动移动**
    - **摘要**：在 Agent 计划模式下，焦点会自动跳转到修改框，打断用户复制对话信息的操作。
    - **为何重要**：虽然不崩溃，但这种“控制权抢夺”非常干扰人机协作流程。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6520)

### 重要 PR 进展（Top 10）

1.  **[#6542] 修复交付恢复与并发写入隔离**
    - **内容**：通过显式的持续路径保证失败消息只保留一次，并实现跨会话/进程的写入序列化。
    - **为何重要**：Agent 交付环节的关键可靠性改进，解决“任务中断后无法正确恢复”的痛点。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6542)

2.  **[#6539] 修复供应商模型较多时模型列表选项重叠**
    - **摘要**：通过 CSS 修复模型候选卡的 `min-height`，解决大规模模型列表的 UI 重叠问题。
    - **为何重要**：**一揽子解决了社区近期最头大的 UI Bug**，直接关联 #5563, #5585, #5785, #6480。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6539)

3.  **[#6498] 统一严格只读子代理边界**
    - **摘要**：统一了只读子代理的边界，防止在 Plan 模式下对文件系统进行意外写入。
    - **为何重要**：增强 Agent 模式下的**安全性**与**权限隔离**（已合并至主分支）。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6498)

4.  **[#6482] MCP 可信执行、签名目录与隔离**
    - **摘要**：为 MCP 工具引入可信执行环境、签名目录和进程隔离，取代了之前不安全的 `readOnlyHint`。
    - **为何重要**：**重大架构更新**，显著增强了 MCP 扩展的安全性（已合并）。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6482)

5.  **[#6536] 加固发版关键 Provider 与凭据路径**
    - **摘要**：保护 Provider 凭据不被模型控制的子进程访问，并保留从 Anthropic 兼容流中累积的使用计数。
    - **为何重要**：**安全加固**，防止敏感信息泄露（已合并）。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6536)

6.  **[#6514] 增加可选图片理解旁路**
    - **摘要**：允许 Agent 调用工具将文件系统中的图片发送给多模态模型进行分析。
    - **为何重要**：直接满足社区对“Agent 具备视觉能力”的强烈呼声（关联 #6530）。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6514)

7.  **[#6525] 修复分叉（Fork）会话时包含当前轮次**
    - **摘要**：修复 Fork 操作会截断选中轮次消息的问题，使得 Fork 后的会话能完美继承所选消息及其回复。
    - **为何重要**：直接瞄准 #6510 等 Fork Bug，保障分支工作流的准确性。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6525)

8.  **[#6506] 避免 Planner 文本污染可见对话**
    - **摘要**：在双模型模式下，Planner 的中间推理文本不再直接流入用户可见的对话窗口，提升对话整洁度。
    - **为何重要**：改善双模型 Agent 模式的用户交互体验。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6506)

9.  **[#6505] 避免坏配置被默认配置覆盖**
    - **摘要**：在保存配置文件前进行严格校验，如果现有 TOML 文件无法解析，则提前报错，不再回退生成默认值覆盖。
    - **为何重要**：防止用户配置因意外错误而**被静默销毁**。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6505)

10. **[#6529] 修复会话恢复静默失败**
    - **摘要**：修复 Agent 会话恢复时可能无声无息失败的问题。
    - **为何重要**：提升 Agent 自动恢复流程的健壮性与可观测性。
    - [查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6529)

### 功能需求趋势

1.  **Agent 核心能力深化**：社区不再满足于简单的对话补全，而是期望 Reasonix 成为**可靠的自动化代理**。上下文长期记忆（#4340）、环境变量/文件监听变化（#6502）、多模态文件分析（#6530）和内置终端（#6513）是当前最热的方向。
2.  **会话管理增强**：面对长会话的场景，**会话内搜索**（#6519）和 **手动删除/整理上下文**（#6491）的需求非常迫切，直接体现了用户从“尝鲜”到“重度使用”的转变。
3.  **联网与基础设施稳定**：**重连机制**（#6515）和 **远程服务器管理**（#6517）被频繁提及，表明用户正在将 Reasonix 部署在服务器上作为常驻服务使用。

### 开发者关注点

1.  **配置安全与可移植性**：开发者非常关心配置文件是否会被意外覆盖（#6505），以及配置、记忆文件如何跨机器迁移（#4340， #6507）。
2.  **UI/UX 健壮性**：大量的 UI 重叠（#6480）、焦点管理问题（#6520）、标题不同步（#6508）等 Bug 让开发者对桌面版的细节打磨提出更高要求。任何细微的交互障碍都会干扰生产力。
3.  **Agent 可观测性**：开发者对“工作流黑盒”感到焦虑。会话恢复静默失败（#6529）、上下文丢失且无提示（#6538）、执行器重复输出（#6533）等问题亟待解决，开发者需要清晰的日志和状态提示来信任 Agent。
4.  **平台兼容性**：Windows 上的高并发锁测试（#6540）和沙箱后端退役（#6516）说明项目正在积极适配各平台，同时开发者也在关注 Linux 和 Windows 上的特定行为差异。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 (2026-07-16)

## 1. 今日速览
- **v1.18.2 正式发布**，默认禁止子代理嵌套（可配置 `subagent_depth`），并新增桌面快捷键 `Mod+N` 开新标签页。
- **安全修复集中落地**：PR 合并了 Prompt 注入边界标记（#37187）、WebFetch “始终允许” 域范围限制（#37183），社区对信任边界的关注明显上升。
- **桌面稳定性成新焦点**：WSL 通知服务器崩溃（#37171）和 Nix 包缺少启动图标（#37196）均在当日得到 PR 响应，Linux 桌面体验问题加速修复。

## 2. 版本发布
### v1.18.2
**Core**  
- **子代理嵌套默认关闭**：子代理不再自动启动嵌套，增加了 `subagent_depth` 配置项供有需求的用户按需启用。  
- **Meta 模型推理深度**：改进了 Meta 模型的默认推理深度，提升生成质量。  

**Desktop**  
- **快捷键增强**：新增 `Mod+N` 作为打开新标签页的快捷方式。

> 详细 Release: [v1.18.2](https://github.com/anomalyco/opencode/releases/tag/v1.18.2)

## 3. 社区热点 Issues（10 则）
1. **[#32656] compaction 输出预算上限 20K 引发溢出风险**  
   `limit.input` 模型在 `usable()` 中只保留 20K 输出预算，容易导致上下文溢出。评论 3，持续争论解决方案。  
   [https://github.com/anomalyco/opencode/issues/32656](https://github.com/anomalyco/opencode/issues/32656)

2. **[#17340] Session 压缩失败：“context exceeds model limit”**  
   会话超出模型限制后无法压缩，即使用户无新消息也无法恢复。获 👍 2，是长会话用户的常见痛点。  
   [https://github.com/anomalyco/opencode/issues/17340](https://github.com/anomalyco/opencode/issues/17340)

3. **[#26970] [Feature] 文件编辑器需求**  
   希望 OpenCode 内置文件编辑能力，像普通代码编辑器一样直接修改文件。评论 3，反映社区对“全能编辑器”的期待。  
   [https://github.com/anomalyco/opencode/issues/26970](https://github.com/anomalyco/opencode/issues/26970)

4. **[#37171] 桌面重启崩溃：“Notification server not found: wsl:Ubuntu”**  
   WSL 环境下重启 OpenCode 会因找不到通知服务崩溃，当日创建且已有 PR #37190 修复。  
   [https://github.com/anomalyco/opencode/issues/37171](https://github.com/anomalyco/opencode/issues/37171)

5. **[#28769] Web UI Agent 选择器消失**  
   v1.15.6 起 Web 版 prompt 工具栏缺少 agent 切换下拉框，只能靠命令切换。获 👍 6，社区高度关注。  
   [https://github.com/anomalyco/opencode/issues/28769](https://github.com/anomalyco/opencode/issues/28769)

6. **[#37196] Nix 桌面包缺少 launcher 资源**  
   Electron 迁移后 Nix 包不再安装 desktop entry 和图标，OpenCode 无法出现在 Linux 启动器。获评论 0，但 PR #37197 已跟进。  
   [https://github.com/anomalyco/opencode/issues/37196](https://github.com/anomalyco/opencode/issues/37196)

7. **[#37191] MCP 工具附件触发 Bedrock 文档名校验异常**  
   MCP 返回二进制附件时，文件名未清理导致 Bedrock Converse API 报错，是 #36113 的变种。  
   [https://github.com/anomalyco/opencode/issues/37191](https://github.com/anomalyco/opencode/issues/37191)

8. **[#14562] 图片导致 413 Request Entity Too Large**  
   包含图片的会话触发请求体超限，连 `/compact` 都失效。已关闭（解决），但代表图片处理的重要改进。  
   [https://github.com/anomalyco/opencode/issues/14562](https://github.com/anomalyco/opencode/issues/14562)

9. **[#37187] 添加指令边界标记防止 Prompt 注入**  
   用户提供的 `AGENTS.md`、`config.instructions` 等直接拼接进 prompt，缺少语义隔离。已关闭，PR 已合并。  
   [https://github.com/anomalyco/opencode/issues/37187](https://github.com/anomalyco/opencode/issues/37187)

10. **[#37183] WebFetch “始终允许” 应限定域名**  
    之前点击“always allow”保存 `*` 通配符，允许所有 URL。已关闭，PR #37182 将其改为只允许当前域名。  
    [https://github.com/anomalyco/opencode/issues/37183](https://github.com/anomalyco/opencode/issues/37183)

## 4. 重要 PR 进展（10 则）
1. **[#37197] fix(nix): restore desktop integration**  
   为 Nix 包安装 desktop entry 和 hicolor 图标，修复启动器找不到 OpenCode 的问题。  
   [https://github.com/anomalyco/opencode/pull/37197](https://github.com/anomalyco/opencode/pull/37197)

2. **[#37194] fix(session): resolve session overflow detection timing gaps**  
   修复 `isOverflow()` 只检查上一步 token、`usable()` 输出预算硬编码 20K 以及大工具输出后无检查的问题。  
   [https://github.com/anomalyco/opencode/pull/37194](https://github.com/anomalyco/opencode/pull/37194)

3. **[#37141] feat(core): normalize tool and attachment images at settlement**  
   将图片尺寸归一化从 `read` 工具扩展到所有工具及用户附件，防止大量内联 base64 撑爆上下文。  
   [https://github.com/anomalyco/opencode/pull/37141](https://github.com/anomalyco/opencode/pull/37141)

4. **[#37192] feat(plugin): support dynamic Effect tools**  
   允许外部 V2 Effect 插件注册动态工具，无需引入 host 内部 `Tool.make`，推进插件生态。  
   [https://github.com/anomalyco/opencode/pull/37192](https://github.com/anomalyco/opencode/pull/37192)

5. **[#37185] fix(tui): publish session event when custom tool import fails**  
   自定义工具加载失败时原仅在日志警告，现在发布 `Session.Event.Error`，TUI 能直接展示错误。  
   [https://github.com/anomalyco/opencode/pull/37185](https://github.com/anomalyco/opencode/pull/37185)

6. **[#37190] fix(notification): handle unavailable server during initialization**  
   为 WSL 等环境加入通知服务不可用时的 fallback，避免桌面启动时崩溃。  
   [https://github.com/anomalyco/opencode/pull/37190](https://github.com/anomalyco/opencode/pull/37190)

7. **[#37182] fix(webfetch): scope always-allow to domain instead of all URLs**  
   “始终允许” 从 `*` 改为只匹配当前域名，增加 `originPattern()` 辅助函数并配套 6 个单元测试。  
   [https://github.com/anomalyco/opencode/pull/37182](https://github.com/anomalyco/opencode/pull/37182)

8. **[#36850] fix(opencode): normalize cloudflare-workers-ai mixed message content types**  
   修复 Cloudflare Workers AI 因消息 `content` 类型不一致（string vs array）被拒绝的问题。  
   [https://github.com/anomalyco/opencode/pull/36850](https://github.com/anomalyco/opencode/pull/36850)

9. **[#36752] fix(opencode): read cache write tokens from raw usage**  
   通过 OpenAI 兼容网关使用 Anthropic 模型时，`cache.write` 持续为 0，导致缓存写入未被正确计费，现已修复。  
   [https://github.com/anomalyco/opencode/pull/36752](https://github.com/anomalyco/opencode/pull/36752)

10. **[#37181] refactor(core): select system prompts through plugins**  
    将系统提示选择机制插件化，根据模型自动加载 OpenAI、Anthropic、Meta 等对应的提示，移除硬编码。  
    [https://github.com/anomalyco/opencode/pull/37181](https://github.com/anomalyco/opencode/pull/37181)

## 5. 功能需求趋势
- **上下文管理与压缩优化**：多达 4 个 issue（#32656/#17340/#10634/#14562）聚焦 compaction 溢出、预算硬编码、大工具输出检测等问题，压缩机制是近期最核心的优化方向。
- **安全与信任边界**：#37187（Prompt 注入防御）、#37183（WebFetch 域名限定）表明社区开始系统性地加固 LLM 输入输出边界，减少恶意指令影响。
- **桌面端 Linux 体验**：Nix 启动器缺失、WSL 通知崩溃等表明 Linux 桌面集成正成为重要短板，相关 PR 已在当日快速响应。
- **Web UI 功能对齐**：#28769（Agent 选择器丢失）显示 Web 版与桌面版的特性差距逐渐被社区注意，预期未来会加大 Web 端投入。
- **MCP 生态深化**：动态工具（Effect）、附件文档名校验、资源变更通知、工具进度展示等 PR 显示 MCP 协议的支持正在从“能用”走向“好用”。

## 6. 开发者关注点
- **Compaction 高频异常**：多用户在长时间会话中反复遇到溢出或压缩失败，希望官方提供更可靠的预算估算和自动降级策略。
- **Linux 桌面集成不完善**：Nix 安装后无启动器、WSL 下重启崩溃，说明 Electron 迁移后的桌面资产分发尚未完全覆盖所有平台。
- **Web 端核心功能减退**：Agent 选择器消失后用户只能通过命令切换，操作效率下降，反映 Web 界面维护滞后。
- **自定义工具反馈不足**：工具加载失败被静默跳过（现已修复），开发者希望所有插件/技能错误都能在 UI 层体现。
- **多供应商兼容性问题**：Bedrock 文档名校验、Cloudflare Workers AI 消息格式、Anthropic cache 计费等频繁出现，社区对 provider 适配的稳定性要求增高。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

好的，以下是根据您提供的 GitHub 数据生成的 Qwen Code 社区动态日报。

---

## Qwen Code 社区动态日报 | 2026-07-16

### 1. 今日速览

今日 Qwen Code 正式将默认模型升级为 `qwen3.7-max`（#6978），使用户能够即刻享用最新的最强模型能力。社区焦点密集在 **MCP 治理** 上，一方面“链式调用失败 + 权限 UI 卡死”的严重 Bug（#6992）被曝光，另一方面工作空间级 MCP 管理（#6954）与可信调用上下文（#6895）正在快步推进。此外，**Agent 自动化链**（Todo 停止守卫 #6945）与 **CI 性能优化**（增量构建 #6955）也是今日的亮点。

### 2. 版本发布

*   **`v0.19.10-nightly.20260715` & `v0.19.9-preview.0`**:
    *   主要更新：优化了文档代码审查的约束规则（`docs(review): cap PR scope`），并在 Web Shell 中新增了工作空间路径锁定功能（`feat(web-shell): add workspace path lock`）。
*   **`cua-driver-rs-v0.7.2`**:
    *   预编译二进制版本发布，采用相对坐标分支。支持 macOS（已公证）、Linux（x86_64/arm64，glibc 2.31+）和 Windows（x86_64/arm64），这是桌面自动化场景的重要基础更新。

### 3. 社区热点 Issues

1.  **#6992 [BUG] MCP 链式调用失败与权限 UI 卡死 (P2)**
    [链接](https://github.com/QwenLM/qwen-code/issues/6992)
    **重要性**: 严重影响用户实际工作流。当 LLM 需要串行调用两个 MCP 工具时，第二个工具静默失败，且权限 UI 直接卡死。Windows 用户反馈最为强烈，是当前体验上最严重的阻塞点之一。

2.  **#6990 [BUG] Agent 中途停止响应**
    [链接](https://github.com/QwenLM/qwen-code/issues/6990)
    **重要性**: 社区用户 `@Agitated-Macaw` 反馈，Agent 在回答 10 秒至 1 分钟后突然中断，仅返回未完成的 XML 片段。这对 Agent 流式交互的可靠性提出了严峻质疑。

3.  **#6988 [Feature] 全轮次多模态视觉接力 (Vision Bridge)**
    [链接](https://github.com/QwenLM/qwen-code/issues/6988)
    **重要性**: 提议在纯文本模型对话轮次中持久化图片上下文，并能在后续轮次无缝切换至视觉模型。这是扩展 Qwen Code 多模态处理边界，实现图文混合对话的最核心需求。

4.  **#6983 [Feature] 支持子代理按模型并发控制**
    [链接](https://github.com/QwenLM/qwen-code/issues/6983)
    **重要性**: 用户希望精确控制不同模型的后台子代理并发数，防止弱模型抢占并发资源拖慢强模型。这是多 Agent 编排走向精细化资源管理的重要标志。

5.  **#6974 [Feature] Web Shell 设置/记忆体/MCP 按 Workspace 隔离**
    [链接](https://github.com/QwenLM/qwen-code/issues/6974)
    **重要性**: 社区要求配置面板也应像 Composer 一样理解 Workspace 上下文，而非全局生效。这是“工作空间原生”治理深化的必然需求。

6.  **#6939 [BUG] 企业微信群消息被 `requireMention` 门禁过滤**
    [链接](https://github.com/QwenLM/qwen-code/issues/6939)
    **重要性**: 企业微信智能机器人协议不提供标准的 `提及` 标志位，导致群消息被误判过滤。这对使用企微集成的大型企业用户是直接影响协作效率的 Bug。

7.  **#6982 [BUG] 定时任务 E2E 测试超时波动**
    [链接](https://github.com/QwenLM/qwen-code/issues/6982)
    **重要性**: 揭示了测试基础设施在慢速 CI Runner 上的不稳定。时间敏感的测试用例持续波动，社区希望引入 Mock 时间或动态超时机制而非继续堆叠等待时间。

8.  **#6989 [OPEN] 主线 CI E2E 测试失败 (P1)**
    [链接](https://github.com/QwenLM/qwen-code/issues/6989)
    **重要性**: 虽然已标记 `autofix/approved`，但主分支 CI 持续高频失败（#6966, #6979）已成为当前开发流程的最大不稳定因素，需彻底排查根因。

9.  **#6977 [CLOSED] 默认模型更新至 `qwen3.7-max`**
    [链接](https://github.com/QwenLM/qwen-code/issues/6977)
    **重要性**: 开发团队快速响应社区需求，当天即完成了默认模型的配置更新，确保了用户能够第一时间体验到最新的模型能力。

10. **#6966/#6979 [CLOSED] 主线 CI 连锁失败**
    [链接](https://github.com/QwenLM/qwen-code/issues/6966) | [链接](https://github.com/QwenLM/qwen-code/issues/6979)
    **重要性**: 多条不同的提交触发了相同的 CI 失败模式，暗示问题可能不在于单一代码变更，而是 CI 配置或测试环境本身存在系统性问题，需要团队进行彻底的排查和修复。

### 4. 重要 PR 进展

1.  **#6978 [CLOSED] 配置更新：默认模型升级 `qwen3.7-max`**
    [链接](https://github.com/QwenLM/qwen-code/pull/6978)
    快速响应 #6977，将默认模型由此前的 `qwen3.5-plus` 更新为最新的 `qwen3.7-max`。

2.  **#6984 [OPEN] 支持子代理按模型并发限制**
    [链接](https://github.com/QwenLM/qwen-code/pull/6984)
    引入 `agents.maxParallelAgentsByModel` 配置项，精准实现社区提出的按模型 ID 对后台子代理进行并发控制的需求。

3.  **#6955 [OPEN] 性能优化：代码审查增量构建/测试**
    [链接](https://github.com/QwenLM/qwen-code/pull/6955)
    将 `qwen review` 中的 Agent 7 从全量构建/测试改造为仅构建和测试 DIFF 影响的工作空间及其依赖，大幅节省 CI 时间和资源。

4.  **#6945 [OPEN] Daemon Todo 停止守卫**
    [链接](https://github.com/QwenLM/qwen-code/pull/6945)
    提升半自动模式的流畅性。当 `todo_write` 完成后仍有未完成项时，Agent 会自动启动新一轮执行链，而不是自然停止等待用户再次输入。

5.  **#6991 [OPEN] 渠道会话来源标记**
    [链接](https://github.com/QwenLM/qwen-code/pull/6991)
    为所有 Daemon 渠道会话添加不可变的 `sourceType: "channel"` 元数据，增强了多渠道接入场景下的溯源与管理能力。

6.  **#6967 [OPEN] 退出 Plan 模式需显式批准**
    [链接](https://github.com/QwenLM/qwen-code/pull/6967)
    增强用户对开发流程的控制感。防止 Agent 不合时宜地自动结束计划阶段，确保 Plan -> Act -> Review 流程的严谨性。

7.  **#6954 [OPEN] 工作空间 MCP 管理**
    [链接](https://github.com/QwenLM/qwen-code/pull/6954)
    将 MCP 管理从全局级别下沉到工作空间级别。用户可以为不同项目配置不同的 MCP 服务器，这是 MCP 治理走向成熟的标志性功能。

8.  **#6895 [OPEN] 可信调用上下文传播**
    [链接](https://github.com/QwenLM/qwen-code/pull/6895)
    引入 `InvocationContextV1`，为 CLI、Daemon、Channel、Scheduler 等不同调用入口建立统一的可信标识，是保障审计和多租户安全的架构级改动。

9.  **#6981 [OPEN] 修复流式 Tool Call 参数丢失 Bug**
    [链接](https://github.com/QwenLM/qwen-code/pull/6981)
    修复 `StreamingToolCallParser` 中一个隐蔽的 Bug。当提供商（如 OpenAI）在流式响应中复用相同的 `index` 时，第二个工具调用的参数会丢失。

10. **#6606 [OPEN] 净化 Shell 子进程的 Daemon 密钥**
    [链接](https://github.com/QwenLM/qwen-code/pull/6606)
    这是一项重要的安全改进，旨在防止 Daemon 的内部密钥通过环境变量泄露到 Shell 子进程中，防范密钥泄漏风险。

### 5. 功能需求趋势

*   **工作空间原生 (Workspace-native)**：从简单的仓库隔离，走向设置、记忆体、MCP 甚至 UI 的深度工作空间绑定（#6974, #6954, #6971）。Qwen Code 正进化为一个真正意义上的“多工作空间操作系统”。
*   **MCP 全栈治理**：社区焦点已从“如何接入 MCP”转向“如何安全、高效地治理 MCP”。包括运行时 Bug 修复（#6992）、作用域隔离（#6954）以及安全审计上下文传播（#6895）。
*   **Agent 自动化链的正向循环**：Todo 停止守卫（#6945）和资源并发控制（#6983）标志着社区不再满足于单次交互，而是希望 Agent 能自动驱动长周期、多步骤的复杂开发任务。
*   **CI 智能化与效能提升**：增量构建（#6955）、前后端 A/B 响应 Diff（#6975）、可视化 Diff 测试（#6963）。CI 正被重新定义为一种智能加速器，而非单纯的检查岗。
*   **模型能力聚合与下沉**：Vision Bridge（#6988）提议将文本和视觉模型能力无缝聚合到同一对话流中。默认模型升级（#6978）则保证用户能第一时间用上最强模型。

### 6. 开发者关注点

*   **稳定性承压**：主线 CI 因 E2E 测试失败连续多日告警（#6989, #6966, #6979），开发时间线和交付信心受到严重影响。社区强烈期望对测试基础设施进行彻底的审查和重构。
*   **安全无小事**：MCP 权限 UI 卡死（#6992）、企微集成消息被误过滤（#6939）、Shell 环境密钥泄漏风险（#6606）等 Issue 表明，任何在协议兼容性或安全方面的“小”疏忽都会对实际开发协作造成毁灭性的大麻烦。
*   **精细化控制成为刚需**：无论是按模型限制 Agent 并发（#6983）、MCP 按 Workspace 隔离（#6974），还是退出 Plan 模式的显式批准（#6967），都反映出用户在应对复杂业务时，期望工具提供更灵活、更可控的配置能力，而非统一的全局策略。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报 | 2026-07-16

---

## 今日速览
今日社区活跃度极高，**50 条 Pull Request** 获得更新，焦点集中在跨平台兼容性修复和 CLI 功能增强上。最重要的改动包括：**修复 SKILL.md UTF‑8 BOM 导致技能解析失败**（#65277）、**增强 Windows 下 SYSTEM 会话网关发现**（#63838），以及 **OpenRouter 对 Anthropic 模型版本号的柔性匹配**（#65281）。此外，CLI 新增**会话检查点导出/导入**功能（#63820）和**状态栏渲染钩子**扩展（#63824），进一步提升了开发调试体验。

---

## 社区热点 Issues

今日没有新创建的 Issue，但以下通过活跃 PR 修复或讨论的 Issues 反映了社区当前最关注的问题。

1. **#65265 – Blackbox CLI 开源链接失效**  
   技能文档中指向 `github.com/blackboxaicode/cli` 的链接返回 404，影响用户查找资料。  
   👉 https://github.com/NousResearch/hermes-agent/issues/65265

2. **#65152 – OpenRouter 中 Anthropic 模型版本号格式不匹配**  
   用户输入的 `claude-opus-4-8` 因连字符与点号差异无法正确路由到 `anthropic/claude-opus-4.8`。  
   👉 https://github.com/NousResearch/hermes-agent/issues/65152

3. **#65202 – Telegram 自动线程下 /topic 产生 System 主题**  
   当 Telegram 自动启用线程时，创建主题命令错误地生成了 System 类型的主题。  
   👉 https://github.com/NousResearch/hermes-agent/issues/65202

4. **#65236 – 共享令牌聊天路由适配器回退失败**  
   在特定链路下，共享令牌的聊天路由未能正确回退到备用适配器。  
   👉 https://github.com/NousResearch/hermes-agent/issues/65236

5. **#65113 – 自主工作后提示上下文缺失**  
   代理在自主工作模式后执行 `clarify` 时，未携带之前的上下文，导致对话断裂。  
   👉 https://github.com/NousResearch/hermes-agent/issues/65113

6. **#59050 – 模型重新选择时 context_length 被意外丢弃**  
   即使模型与提供者未变，`_apply_main_model_assignment()` 每次调用都会清除用户手动设置的 `context_length`。  
   👉 https://github.com/NousResearch/hermes-agent/issues/59050

7. **#63748 – 会话检查点导出/导入功能请求**  
   用户希望在 CLI 中能将会话上下文导出为 JSON，并在新会话中复用，以便调试和迁移。  
   👉 https://github.com/NousResearch/hermes-agent/issues/63748

8. **#44002 – SKILL.md UTF-8 BOM 导致 frontmatter 解析失败**  
   用 Windows 记事本或 PowerShell 保存的技能文件因 BOM 头部导致 `startswith("---")` 检测失效，技能名称、平台门控等元数据被静默丢弃。  
   👉 https://github.com/NousResearch/hermes-agent/issues/44002

9. **#63743 – Windows 下 SYSTEM 会话网关未被发现**  
   通过计划任务以 SYSTEM 身份运行的网关在 `hermes update` 前无法被扫描到，导致环境被篡改。  
   👉 https://github.com/NousResearch/hermes-agent/issues/63743

10. **Token 紧凑格式在边界值显示异常**（无独立 Issue）  
    仪表盘将 999,950 token 渲染为 `1000.0K` 而非 `1.0M`，影响数据可读性。社区通过 PR #63828 实修。  
    👉 https://github.com/NousResearch/hermes-agent/pull/63828

---

## 重要 PR 进展

挑选过去 24 小时内评论最多、影响最广的 10 个 PR：

1. **#65277 – 修复 SKILL.md UTF-8 BOM 解析**  
   在所有解析站点兼容带 BOM 的技能文件，保留名称、描述、`platforms:` 等 frontmatter 元数据。  
   👉 https://github.com/NousResearch/hermes-agent/pull/65277

2. **#63838 – Windows 网关发现改用 psutil 补充扫描**  
   在 `wmic`/Get-CimInstance 之外增加 psutil 遍历，确保 SYSTEM 用户下的计划任务网关被正确识别，同时保持 CIM 部分命中结果。  
   👉 https://github.com/NousResearch/hermes-agent/pull/63838

3. **#63836 – 支持 Twilio Messaging Service 发送者**  
   新增 `TWILIO_MESSAGING_SERVICE_SID` 变量，设置后使用 `MessagingServiceSid` 替代 `From`，提升短信发送灵活性。  
   👉 https://github.com/NousResearch/hermes-agent/pull/63836

4. **#63831 – 修复 WSL UNC 路径匹配**  
   在会话创建/切换时正确识别 `\\wsl.localhost\...` 和 `\\wsl$\...` 路径，解决 WSL 环境下 `list_sessions` 过滤失效。  
   👉 https://github.com/NousResearch/hermes-agent/pull/63831

5. **#65278 – 移除 Blackbox CLI 失效的 GitHub 链接**  
   所有已知组织均无法找到原仓库，采用删除链接的方式修复文档，避免用户点击 404。  
   👉 https://github.com/NousResearch/hermes-agent/pull/65278

6. **#65281 – 修复 OpenRouter Anthropic slug 版本号格式**  
   增加第三次匹配逻辑，将连字符规范化为点号，使 `claude-opus-4-8` 能对应到 `anthropic/claude-opus-4.8`。  
   👉 https://github.com/NousResearch/hermes-agent/pull/65281

7. **#63820 – CLI 会话检查点导出/导入**  
   实现 MVP 版本的两个命令，支持将会话上下文序列化为 JSON 并在新会话中加载，方便跨会话上下文桥接。  
   👉 https://github.com/NousResearch/hermes-agent/pull/63820

8. **#63828 – 修复 Token 紧凑格式边界舍入**  
   优化仪表盘 `compactTokens` 逻辑，在 `>= 999_950` 时正确切换到 “M” 单位，移除异常 `1000.0K` 显示。  
   👉 https://github.com/NousResearch/hermes-agent/pull/63828

9. **#63833 – 桌面端 OAuth 分区清除**  
   在设置 → Gateway 登录前清除 OAuth 分区，消除失效 Remote 会话导致静默跳过登录的问题。  
   👉 https://github.com/NousResearch/hermes-agent/pull/63833

10. **#63824 – 扩展状态栏渲染钩子至所有宽度等级**  
    将 `on_status_bar_render` 插件钩子从仅全宽路径扩展到窄、中、宽共 6 条渲染路径（字符串 & 样式元组），增强插件灵活性。  
    👉 https://github.com/NousResearch/hermes-agent/pull/63824

---

## 功能需求趋势

综合今日所有 PR 内容，社区最关注的方向包括：

- **跨平台兼容性**：Windows（psutil 扫描、OAuth 清除）、WSL（UNC 路径）、Linux/macOS 的隐藏问题。
- **模型提供者适配**：更宽容的模型名称匹配（OpenRouter slug 归一化）、新提供者（Twilio Messaging Service）与配额错误处理（Copilot）。
- **CLI 开发体验**：状态栏插件扩展、会话上下文导出/导入、国际化翻译（中文）。
- **桌面端能力**：OAuth 流程修复、持久化画布（已有 PR #65279 探索）。
- **安全加固**：自动转发 Bearer 凭证到重定向 URL 的风险已通过 PR #63826 解决。
- **UI/数据显示**：Token 紧凑格式精度修复，以及仪表盘配置的持久化。

---

## 开发者关注点

从当日的 Bug 修复中可以提炼出以下开发者高频痛点：

- **Windows 平台差异**：WMIC 受限、计划任务网关扫描不全、WSL 路径转义、OAuth 分区不一致——Windows 用户需更多适配。
- **编码与文本处理**：UTF‑8 BOM 导致 YAML frontmatter 静默失败，仍是 Windows 工具链的常见隐患。
- **配置覆盖**：模型切换时 `context_length` 清空、per‑host 配置被全局覆盖（#63776），配置系统健壮性有待加强。
- **异步/同步混合**：Gateway 中 `AsyncSessionDB` 被同步调用导致 SQLite 读取丢失（#63799），类似的异步边界问题需警惕。
- **外部依赖失效**：第三方链接 404、API 版本号格式演变等要求项目及时维护兼容层。

---
*数据来源：GitHub NousResearch/hermes-agent，统计截至 2026-07-16。*

</details>

</div>
