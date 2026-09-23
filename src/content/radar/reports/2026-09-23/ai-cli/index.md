---
title: "AI CLI 工具社区动态日报"
published: 2026-09-23
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-23

> 生成时间: 2026-09-23 00:00 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Deepseek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告（2026-09-23）

## 1. 生态全景

当前 AI CLI 工具正处于从「代码辅助」向「Agent 工作台」迁移的关键阶段，模型能力升级（1M 上下文、GPT-6/Opus 5.5 等新系列）与交互模式重构（全屏 TUI、默认语音）是两条核心演进主线。但快速迭代的代价是稳定性问题集中爆发——Windows/VM 环境兼容性、上下文压缩可靠性、子代理状态可信度成为跨工具共性痛点。社区反馈呈现**「功能需求旺盛、回归敏感度高」**的双重特征，各主流工具均在「加速功能扩张」与「修复信任危机」之间寻求平衡。

## 2. 各工具活跃度对比

| 工具 | 版本动态 | 热点 Issue 数¹ | 重要 PR 数² | 社区活跃信号 |
|---|---|---|---|---|
| **Claude Code** | v2.1.280 正式版（默认 Opus 5.5，1M 上下文） | 10 个（最高 253 评 / 387👍） | 1 个 | 企业级功能讨论深度极高，多 Connector 账户需求持续发酵 7 个月 |
| **OpenAI Codex** | rust-v0.156.0 正式版（/tui + 默认语音）+ 6 个 alpha | 10 个（最高 26 评） | 10 个 | 功能扩张最猛（新模型、沙箱、TUI、语音），Windows 问题显著拖累口碑 |
| **Gemini CLI** | v0.62.0-nightly（修复代理解析 / ACP 时序） | 10 个（最高 13 评） | 10 个 | 社区规模中等，**Agent 可靠性**讨论高度集中（误报成功、挂起） |
| **DeepSeek Reasonix** | 无正式发布，10 个修复 PR 等待合入 | 10 个（最高 10 评） | 10 个（6 个已合入） | v1.38.11 回归引发集中声讨，维护者响应速度快，处于「紧急修复期」 |
| **OpenCode** | 无正式发布 | 10 个（最高 5 评） | 10 个（多个已合入） | 社区规模较小但议题聚焦，「静默失败」问题成为核心关注 |
| **Deepseek Harness** | dsh-v0.1.7-alpha.1 / alpha.2 双版本 | 0 个新增 | 0 个 | 低活跃度，处于日常打磨期，无明显社区声量 |
| **Hermes** | 无正式发布 | 10 个（最高 13 评） | 10 个 | 安全议题（凭证泄露/密钥擦除）带动社区讨论深度，桌面端稳定性问题持续积累 |

> ¹ 日报列出 Top 10 热点 Issue；² 日报列出重要 PR 进展数量。

## 3. 共同关注的功能方向

| 功能方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Windows / VM 环境稳定性** | Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、Hermes | 沙箱初始化失败、窗口置顶无法关闭、Junction/SSHFS 路径解析异常、GPU 崩溃、更新流程误杀进程——**跨平台一致性成为全行业短板** |
| **桌面端体验与可靠性** | Claude Code、OpenAI Codex、DeepSeek Reasonix、Hermes | 会话列表加载失败、发送按钮禁用、UI 冻结、重复渲染回复——桌面端与 CLI 核心能力存在「联调覆盖不足」的系统性问题 |
| **Agent 协调与状态可信度** | Gemini CLI、OpenCode、DeepSeek Reasonix、Hermes | 子代理误报成功（MAX_TURNS 包装为 GOAL）、父会话收不到完成通知、计划/目标模式中断——**Agent 执行链的可观测性与结果可信度是共同瓶颈** |
| **上下文压缩可靠性** | OpenAI Codex、Gemini CLI、OpenCode | 压缩破坏原始会话数据、压缩后恢复过期状态、压缩重试无 UI 反馈——压缩策略直接影响用户对会话历史的安全感 |
| **多账户 / 认证体验** | Claude Code、Gemini CLI、OpenCode | Connector 多账户管理、Windows/WSL 认证死循环、OAuth 并发刷新竞态——身份管理是向「企业级」演进的必经门槛 |
| **配置系统可诊断性** | OpenCode、Gemini CLI、Hermes | Provider 因缺字段被静默丢弃、MCP enablement 配置 fail-open、配置迁移失败不再重试——**「要么成功，要么明确失败」是开发者共同期待** |
| **新模型快速适配** | Claude Code、OpenAI Codex、Gemini CLI、Hermes | Opus 5.5、GPT-6 Sol/Luna、Gemini 3.8 Flash 陆续入目录——模型更新速度已成为工具竞争力的直接指标 |
| **安全加固与密钥管理** | Gemini CLI、Hermes、OpenCode | 凭证环境变量落盘、工具结果→模型路径缺少密钥擦除、网络策略强制——安全边界问题从「可选项」变成「硬性要求」 |

## 4. 差异化定位分析

| 工具 | 功能侧重点 | 目标用户画像 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 企业级工作流与 IDE 深度集成 | 大型团队、多项目管理场景 | 以插件系统（AGENTS.md mod）和 Connector 生态为核心，走「标准化 + 可扩展」路线；发版节奏保守但社区期望值高 |
| **OpenAI Codex** | 交互模式创新与模型平台化 | 尝鲜型开发者、模型敏感型用户 | 全屏 TUI 与语音交互作为一等公民，GPT-6 系列快速入目录；**以高频发版（正式版 + 每日 alpha）换取功能领先，但引入稳定性风险** |
| **Gemini CLI** | Agent 自治能力与配置健壮性 | 研究型开发者、复杂任务自动化 | 重视子代理透明度和 MCP 配置安全；夜间版迭代 + 密集 PR 修复，体现「重可靠性」的技术文化 |
| **DeepSeek Reasonix** | 桌面端优先的数据管理 | 桌面重度用户、Windows 开发者 | 桌面端与 CLI 双形态，聚焦历史会话管理、路径兼容性；**当前处于「版本回归→快速修复」的防守阶段** |
| **OpenCode** | 服务端架构与事件驱动 | 后端开发者、自动化服务部署者 | 以后台服务（`opencode serve`）为核心，强调事件可观察性（ACP 重试转发、session.error）；走「服务化 Agent 平台」路线 |
| **Deepseek Harness** | 日常会话体验打磨 | 个人开发者、轻量用户 | 专注过程可视化、消息编辑细节、侧边栏管理；技术路线偏向「精细化打磨」而非「平台扩张」 |
| **Hermes** | 多平台集成与安全合规 | 自托管/多通道（Matrix、邮件）用户 | 以连接器生态（邮件、Matrix、MCP）为差异化，同时面对合规敏感场景；**安全议题讨论热度显著高于其他工具** |

## 5. 社区热度与成熟度

- **第一梯队（成熟期）：Claude Code** — 单 Issue 评论量（253 条）是第二名（Codex 的 26 条）的近 10 倍，讨论高度集中于企业级功能（多 Connector 账户、worktree 配置）；PR 数量少而精，社区贡献门槛高。成熟度最高，但高频回归问题也暴露出规模化的「创新者窘境」。

- **第二梯队（快速扩张期）：OpenAI Codex、Gemini CLI、Hermes** — Codex 以「正式版 + 每日多 alpha」的节奏推动功能前沿，社区活跃度高但被 Windows 问题分散注意力；Gemini CLI 社区体量中等，议题聚焦度最强（全部集中在 Agent 可靠性与配置安全）；Hermes 社区声量与 Gemini 持平，安全议题带动讨论深度。

- **第三梯队（修复追赶期）：DeepSeek Reasonix、OpenCode** — Reasonix 因 v1.38.11 回归进入「舆论高压 + 快速修复」状态，10 个 PR 中 6 个当日合入，维护者响应速度值得肯定；OpenCode 社区规模最小，但议题代表性强（静默失败、事件缺失），反映了「服务化 Agent」路线下的新生代痛点。

- **第四梯队（早期打磨期）：Deepseek Harness** — 无新增议题、无 PR，双 alpha 版本专注细节体验，社区生态尚待建立。

## 6. 值得关注的趋势信号

1. **「1M 上下文 + 多模型路由」成为标配竞赛** — Claude Opus 5.5 的 1M 上下文与 GPT-6 Sol/Luna 目录更新，表明上下文规模与模型可选择性已成为 CLI 工具的基础竞争力。**对开发者的意义**：选择工具时需关注其默认模型与多模型切换的灵活性，而非仅看 CLI 功能。

2. **Windows/VM 兼容性是全行业最大的「信任缺口」** — 5/7 的工具在 Windows/VM 上存在阻塞级问题（沙箱失败、路径解析异常、GPU 崩溃）。**对开发者的意义**：Windows 用户在选择工具时应优先关注其 Windows 适配成熟度（如 Codex 的沙箱链路），或将关键任务保留在 CLI 而非桌面端。

3. **Agent 状态可信度成为新的「可观测性战场」** — Gemini 子代理误报成功（MAX_TURNS→GOAL）、OpenCode 子代理完成通知丢失、Reasonix 计划模式中断——**Agent 不再只是「能不能跑」，而是「跑的过程是否可审计」**。工具方需要提供执行链的透明事件总线，否则自动化上层决策将被系统性误导。

4. **语音与多模态交互从「实验功能」走向「默认开启」** — Codex 默认启用语音，Claude Code 优化 fullscreen 鼠标操作，交互模式正在从 chat/CLI 二维走向语音/桌面/TUI 三维。**对开发者的意义**：远程开发、语音编程等场景将成为下一步工具差异化的核心战场。

5. **安全不再是「可选加固」，而是「默认设计」** — Hermes 的凭证落盘、OpenCode 的 OAuth 竞态、Gemini 的 MCP fail-open 修复都在指向同一个结论：**AI CLI 持有用户代码与凭证，需要比传统工具更严格的安全生命周期管理**。企业选型时应将密钥处理、沙箱隔离、网络策略纳入评估指标。

6. **配置系统「字段级可诊断性」成为高频诉求** — OpenCode 的 Provider 静默丢弃、Gemini 的 MCP enable/disable 失灵、Hermes 的迁移失败不重试，共同指向配置错误的「可发现性」危机。**对开发者的意义**：工具配置出现异常时，优先检查日志的字段级错误提示；若工具缺乏此类提示，可考虑插件或 wrapper 补充校验层。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-09-23）

> 数据来源：github.com/anthropics/skills 官方仓库（热门 PR 50 条 + 社区 Issue 13 条）。所有 PR 当前状态均为 **OPEN**，按评论数降序排列。

---

## 一、热门 Skills 排行（Top 8）

### 1. skill-creator 触发评估修复 — 评论数最高
**#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures** · @MartinCajiao
- **功能**：修复 `skill-creator` 触发条件评估的三大误判来源：多 worker 命令探针互相竞争、Windows 下 `select()` 管道失败、无关工具中断扫描；同时防止运行时失败被误判为"非触发"而错误通过负例。
- **热点**：`skill-creator` 是官方元技能，其触发评估准确性直接决定所有 skill 的验证与描述优化质量，属核心基础设施问题，社区关注度断层第一。
- **状态**：OPEN（2026-06-10 创建，09-16 仍在更新）
- 🔗 https://github.com/anthropics/skills/pull/1298

### 2. proofcore-contract-auditor — Web3 智能合约审计
**#1771 feat(skills): add proofcore-contract-auditor for smart contract notarization** · @ProofCore-Protocol
- **功能**：面向 Web3 开发者的合约审计技能，对 Solidity/Rust 合约做自动化静态分析，并借助 ProofCore 零存储 Merkle 协议将审计证明锚定到 TON 区块链。
- **热点**：区块链审计 + AI 技能的组合在官方仓库中较少见，代表 Web3 垂直方向的社区尝试。
- **状态**：OPEN（2026-09-15 创建）
- 🔗 https://github.com/anthropics/skills/pull/1771

### 3. mcp-builder 兼容性修复 — 适配 MCP 2.0
**#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers** · @Kuldeeep18
- **功能**：修复 `mcp>=2.0` 下 `streamablehttp_client` 重命名为 `streamable_http_client`、自定义 header 改由 `create_mcp_http_client` 配置带来的兼容问题（对应 Issue #1668）。
- **热点**：MCP SDK 快速迭代，技能脚本对新版本的适配成为刚需，属典型的"官方技能跟不上生态版本"问题。
- **状态**：OPEN（2026-09-08 创建，09-19 更新）
- 🔗 https://github.com/anthropics/skills/pull/1742

### 4. md2video-audio — Markdown 一键转视频
**#1703 Add md2video-audio skill** · @70v-Yoyo
- **功能**：零成本将 Markdown 文档经 Marp 编译为演示幻灯片，并合成拟人语音旁白，直接产出专业级 MP4 视频。
- **热点**：文档 → 视频的内容生产自动化，契合 AI 生成多媒体的社区热潮。
- **状态**：OPEN（2026-09-01 创建，09-15 更新）
- 🔗 https://github.com/anthropics/skills/pull/1703

### 5. docx 孤立评论检测
**#1734 Detect orphaned docx comments** · @rohitjain25
- **功能**：检测 DOCX 文档中的孤立评论（orphaned comments），完善文档技能链路的细节质量。
- **热点**：文档类技能是官方仓库主力方向之一，社区持续贡献细颗粒度缺陷修复。
- **状态**：OPEN（2026-09-06 创建）
- 🔗 https://github.com/anthropics/skills/pull/1734

### 6. Pyxel — 复古游戏开发技能
**#525 Add pyxel skill for retro game development** · @kitao
- **功能**：基于 Python Pyxel 框架的复古游戏开发技能，支持无头（headless）输入驱动运行、逐帧画面检查与任务态验证，附独立参考文档。
- **热点**：自 2026-03 创建至今持续活跃（09-22 最后一次更新），是"存活时间最久"的 PR 之一，反映社区对创意/游戏类技能的长期兴趣。
- **状态**：OPEN（2026-03-05 创建，09-22 更新）
- 🔗 https://github.com/anthropics/skills/pull/525

### 7. document-typography — AI 文档排版质量管控
**#514 Add document-typography skill: typographic quality control for generated documents** · @PGTBoos
- **功能**：治理 AI 生成文档的三大排版顽疾：孤字行（1-6 个词溢出换行）、孤行标题（段首标题悬挂页底）、编号错位。
- **热点**：直击"每个 Claude 生成文档都会遇到"的共性问题，用户不会主动要求但影响观感，社区共鸣度高。
- **状态**：OPEN（2026-03-04 创建）
- 🔗 https://github.com/anthropics/skills/pull/514

### 8. scnet-hpc — HPC 集群运维技能
**#1615 Add scnet-hpc skill** · @lql341
- **功能**：通过 profile 化 SSH 与 Slurm 工作流操作 SCNet HPC 集群，覆盖集群发现、分区/内存/模块/加速器配置、Slurm 作业生成与计算节点状态查询。
- **热点**：企业/科研级基础设施运维场景，代表技能生态向专业垂直领域延伸。
- **状态**：OPEN（2026-08-20 创建）
- 🔗 https://github.com/anthropics/skills/pull/1615

---

## 二、社区需求趋势（来自 Issues）

### 1. 信任与安全：最强烈诉求（43 条评论）
**#492 Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse** — 社区技能借 `anthropic/` 命名空间分发，冒充官方能力，用户可能向非官方技能授予过高权限。
→ 需求：**明确来源标识 + 安全审计机制**。
🔗 https://github.com/anthropics/skills/issues/492

### 2. 企业级协作：组织内技能共享（16 条评论，8 👍）
**#228 Enable org-wide skill sharing in Claude.ai** — 当前只能下载 .skill 文件后手动上传，社区呼吁组织级技能库或直接共享链接，简化企业内分发。
🔗 https://github.com/anthropics/skills/issues/228

### 3. 评估/触发机制可靠性（12 条评论，7 👍）
**#556 run_eval.py: claude -p never triggers skills (0% trigger rate across all queries)** — 官方评估脚本对所有查询触发率为 0%，说明**技能验证基础设施失灵**，与热门 PR #1298、#1769 形成呼应（修复类 PR 集中在同一病灶）。
🔗 https://github.com/anthropics/skills/issues/556

### 4. 新技能方向提案（社区主动发起）
| 提案 | 评论 | 方向 | 状态 | 链接 |
|---|---|---|---|---|
| **#1329 compact-memory** | 9 | 符号化紧凑记忆，降低长时运行 agent 的上下文占用 | OPEN | https://github.com/anthropics/skills/issues/1329 |
| **#412 agent-governance** | 6 | AI 代理系统治理：策略执行、威胁检测、信任评分、审计追踪 | CLOSED | https://github.com/anthropics/skills/issues/412 |
| **#1385 Reasoning Quality Gate Pipeline** | 4 | 任务前校准 → 对抗性审查 → 交付验证的三门质量流水线 | OPEN | https://github.com/anthropics/skills/issues/1385 |

### 5. 技能运行时质量与资源效率
- **#1487** claude-api 技能单次注入约 156k token，直接耗尽上下文窗口 → 诉求：**技能体积/注入策略需优化**
- **#189** document-skills 与 example-skills 插件内容完全重复导致重复加载（9 👍）→ 诉求：**仓库维护质量**
- **#1390** mcp-builder 评估脚本对真实 MCP 服务器 100% 误报错误、得分 0/N → 诉求：**评估工具链可信**
- **#1362** web-artifacts-builder 脚本在 pnpm ≥10.1 下硬失败 → 诉求：**技能依赖链维护**

→ **趋势总结**：社区不再满足于"技能数量多"，而是集中要求 **安全分发（trust）**、**可靠评估（reliability）**、**企业级共享（collaboration）**，并持续提出 **agent 治理/记忆/质量门控** 等下一代 agent 能力方向。

---

## 三、高潜力待合并 Skills（活跃但未合入）

以下 PR 具备"近期落地"的高潜力信号：修复类、有明确对应 Issue、或创建后持续更新：

| PR | 技能 | 信号 | 链接 |
|---|---|---|---|
| **#1298** | skill-creator 触发评估修复 | 评论数全仓最高 + 09-16 仍更新 | https://github.com/anthropics/skills/pull/1298 |
| **#525** | Pyxel 复古游戏开发 | 06个月长线活跃，09-22 最新更新 | https://github.com/anthropics/skills/pull/525 |
| **#723** | testing-patterns 全栈测试模式（Trophy 模型/React Testing Library） | 09-21 更新，内容体系完整 | https://github.com/anthropics/skills/pull/723 |
| **#822** | AWT AI 驱动的 E2E 测试（视觉+浏览器控制） | 09-19 更新，开源工具背书 | https://github.com/anthropics/skills/pull/822 |
| **#1742** | mcp-builder 适配 MCP 2.0 | 对应已确认 Issue #1668，修复类易合入 | https://github.com/anthropics/skills/pull/1742 |
| **#1771** | proofcore-contract-auditor | 近期创建（09-15），Web3 稀缺方向 | https://github.com/anthropics/skills/pull/1771 |
| **#1776** | blast-radius 批量/破坏性写入前检查清单 | 09-17 创建，直击高风险运维场景 | https://github.com/anthropics/skills/pull/1776 |
| **#1769** | 修复 skill-creator 触发检测 0% recall | 有明确 Issue #1721 对应，与 #1298 同赛道 | https://github.com/anthropics/skills/pull/1769 |

---

## 四、Skills 生态洞察

**一句话总结**：当前社区在 Skills 层面最集中的诉求是——**在技能数量快速膨胀的同时，建立"可信任的分发机制 + 可靠的评估/触发基础设施 + 可规模化的企业协作能力"**，即从"有技能可用"转向"技能可信、可测、可管理"，同时文档、测试、Web3、HPC 等垂直领域的专业技能供给仍在持续加速。

---

# Claude Code 社区动态日报（2026-09-23）

## 1. 今日速览
- **新版本 v2.1.280 发布**：默认模型升级为 Claude Opus 5.5，支持 1M 上下文，并优化了 fullscreen 模式下的鼠标操作。
- **社区热帖焦点**：多 Connector 账户支持需求（#27302）持续发酵，已有 253 条评论、387 个 👍，成为当前社区最关心的功能请求。
- **多个回归 Bug 引发关注**：包括 VS Code 集成终端中语音听写粘贴失效（#93782）、后台会话文本丢失（#65051）等，开发者反馈集中。

## 2. 版本发布
### v2.1.280
- **新增 Claude Opus 5.5**（`claude-opus-5-5`），现为默认 Opus 模型：1M 上下文，定价 $4/$20 每 Mtok，缓存读取 $0.20/Mtok。
- **全屏模式鼠标支持增强**：`/skills` 列表可滚轮滚动，`/plugin` 中的技能状态选项可直接点击。

## 3. 社区热点 Issues（Top 10）
1. **[#27302] 支持多个 Connector 账户（同一 Connector 不同账号）**  
   评论 253 | 👍 387 | 创建于 2026-02-21，持续活跃  
   大量用户需要在一个界面下管理多个 Connector 账户，当前只能单独切换，严重影响多团队/多客户协作效率。  
   https://github.com/anthropics/claude-code/issues/27302

2. **[#89467] Windows 桌面应用窗口总是置顶且无法禁用**  
   评论 37 | 👍 75 | 创建于 2026-08-25  
   Windows 用户反馈 Claude Code 桌面窗口无法取消置顶，没有设置或快捷键可调，影响多窗口工作流。  
   https://github.com/anthropics/claude-code/issues/89467

3. **[#76694] Cowork：新项目丢失「选择文件夹」入口，Chat/Cowork 合并后回归**  
   评论 32 | 👍 27 | 创建于 2026-07-11  
   合并后新项目的上下文菜单被替换为聊天式上传菜单，导致无法选择本地文件夹，破坏核心工作流。  
   https://github.com/anthropics/claude-code/issues/76694

4. **[#93782] 回归：2.1.269 起语音听写内容无法粘贴到 VS Code 集成终端（WSL2）**  
   评论 14 | 👍 9 | 创建于 2026-09-12  
   2.1.268 正常，2.1.269 起 Wispr Flow 等听写工具的剪贴板 + 模拟 Ctrl+V 被阻断，影响远程开发效率。  
   https://github.com/anthropics/claude-code/issues/93782

5. **[#27282] 可配置 worktree 目录位置，支持兄弟目录**  
   评论 13 | 👍 68 | 创建于 2026-02-21  
   社区希望自定义 worktree 存放位置，目前只能放在仓库内部，不符合部分团队的目录规范。  
   https://github.com/anthropics/claude-code/issues/27282

6. **[#65051] 回归：后台（daemon）会话混合文本与工具调用时丢失文本块**  
   评论 13 | 👍 9 | 创建于 2026-06-03  
   2.1.160 → 2.1.161 引入，后台会话的 assistant 文本块消失，影响自动化任务的可追溯性。  
   https://github.com/anthropics/claude-code/issues/65051

7. **[#73386] Windows VM 共享文件夹中 Edit/Write 失败（ENOENT: fchmod）**  
   评论 9 | 👍 1 | 创建于 2026-07-02  
   针对已存在文件，在 VM 共享驱动器上执行编辑/写入会报 fchmod 错误，阻碍虚拟化环境开发。  
   https://github.com/anthropics/claude-code/issues/73386

8. **[#80261] 桌面应用主屏幕显示用量限制/持久用量指示器**  
   评论 6 | 👍 22 | 创建于 2026-07-22  
   用户希望实时看到剩余额度，避免运行中突然中断，属于高频需求。  
   https://github.com/anthropics/claude-code/issues/80261

9. **[#91498] Bash 工具实际调用用户登录 shell（如 zsh），名字误导 LLM**  
   评论 5 | 👍 1 | 创建于 2026-09-02  
   macOS 下 `SHELL=/bin/zsh` 时 Bash 工具执行的是 zsh，但描述仍称 bash，导致模型使用 bash-only 语法出错。  
   https://github.com/anthropics/claude-code/issues/91498

10. **[#94553] Monitor 的 persistent: true 被限制为 30 分钟**  
    评论 5 | 👍 5 | 创建于 2026-09-15  
    2.1.268 起持久监控自动过期，需手动重新武装，破坏了原本的无限期监视能力。  
    https://github.com/anthropics/claude-code/issues/94553

## 4. 重要 PR 进展
过去 24 小时内仅更新 1 个 PR：

- **[#95409] mods/agents-md：AGENTS.md 项目指令 mod**（已关闭）  
   作者 @poteat | 更新于 2026-09-22  
   内容：以与 `CLAUDE.md` 相同的方式读取 `AGENTS.md`，采用与 `sec-default`、`diff`、`telemetry` 相同的模块布局，包含 manifest、`hooks/` 模块、`claude plugin test` 测试及 README。该 PR 为插件系统提供了对 `AGENTS.md` 的标准支持。  
   https://github.com/anthropics/claude-code/pull/95409

## 5. 功能需求趋势
从近 24 小时更新的 Issue 中，社区最关注的方向可归纳为：

- **多账户与认证体验**：支持多个 Connector 账户、跨账户额度池化/赠送等（#27302、#90152），说明企业或个人用户对多身份管理需求旺盛。
- **桌面应用窗口与 UX 控制**：置顶开关、用量显示、侧边栏分组稳定性（#89467、#80261、#92179），桌面端体验细节仍是高频吐槽点。
- **自定义与配置能力**：可配置 worktree 位置、全局 `AGENTS.md`、自动启用 PR auto-fix 等（#27282、#95795、#90665），开发者希望工具适应自身工作流而非反向妥协。
- **插件系统扩展**：插件自定义自动补全（#96185）、`AGENTS.md` 插件化支持（#95409），社区对插件生态的期待在上升。
- **跨平台一致性与回归控制**：WSL/VM/Chrome 等环境的兼容问题增多，同时对最近版本引入的回归非常敏感（#93782、#65051、#94553）。

## 6. 开发者关注点
- **Windows/VM 环境问题突出**：窗口置顶、共享文件夹 fchmod、find.exe 挂起、会话退出后 worktree 锁未释放等问题，表明 Windows 平台的基础体验仍需打磨。
- **回归问题高频出现**：多个旧版正常的场景在新版本中劣化（听写粘贴、后台会话文本、Monitor 持久性），社区对发版质量提出质疑。
- **安全限制过于僵化**：密码输入的硬性拦截（#78160）影响本地测试与自动化，开发者希望提供可配置的权限门控。
- **对「默认 opus 5.5」的适应**：新模型刚上线，定价与缓存收益受关注，但社区暂未大量报告新模型问题，静待反馈。
- **高频需求未落地**：多 Connector 账户（#27302）和工作树配置（#27282）都是提出已久的请求，活跃周期超过 6 个月，社区期待官方明确排期。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-09-23）

## 今日速览

今日 Codex 发布 rust-v0.156.0 正式版，带来全新全屏 TUI（/tui）和默认启用的语音对话功能，标志着交互模式的重大升级；同时社区反馈集中在 Windows 桌面版的沙箱设置失败、上下文压缩破坏会话记录等高频问题；PR 侧则密集合入网络策略强制、新模型支持（GPT-6 Sol/Luna）与沙箱安全加固。

## 版本发布

### rust-v0.156.0 正式版
- **新增 /tui 全屏界面**：支持转录搜索、鼠标选择、右键复制（#46732, #46734, #46883, #46895）
- **语音对话默认启用**：提供 F8 切换快捷键、/voice settings 选择器，并集成音频组件

### 预发布版本
今日另有 6 个 0.157.0-alpha 版本（alpha.3 至 alpha.10）发布，主要面向内部迭代，未附带公开变更说明。

## 社区热点 Issues

### 1. Windows 桌面版更新后本地项目消失
**#42739** | 评论 26 | 👍 0
更新后侧边栏 Projects 显示"No projects"，但聊天记录和磁盘文件夹均完好。Windows 桌面版高频回归问题，社区影响面较大。
🔗 https://github.com/openai/codex/issues/42739

### 2. Windows 沙箱设置卡死 "Finish Windows setup"
**#32492** | 评论 16 | 👍 5
沙箱设置从不触发真实的 UAC 提示，Retry 立即失败，导致应用无法进入主界面。创建一个多月仍在影响用户。
🔗 https://github.com/openai/codex/issues/32492

### 3. Astra 动画阻止 kitty 终端鼠标选择
**#44398** | 评论 14 | 👍 16（已关闭）
GPT-6-Astra 的 sparkle 动画导致无法在 kitty 终端中拖选文本。TUI 装饰动画与终端交互的冲突，社区关注度高。
🔗 https://github.com/openai/codex/issues/44398

### 4. Windows 沙箱 helper_failed 安装失败
**#40550** | 评论 14 | 👍 0
辅助程序 codex-windows-sandbox-setup.exe 反复出现 Access Denied，UI 显示"Windows setup didn't finish"。WhatsApp 影响沙箱功能的完整启用。
🔗 https://github.com/openai/codex/issues/40550

### 5. Windows 沙箱 helper_unknown_error 致所有命令失败
**#44696** | 评论 12 | 👍 2
0.153.0-alpha.5 上每个 exec_command 和文件读取都在沙箱初始化层失败，影响所有依赖沙箱的 CLI 操作。
🔗 https://github.com/openai/codex/issues/44696

### 6. 桌面版不再显示正在运行的命令
**#37213** | 评论 8 | 👍 22
Codex 桌面版更新后不再展示 Agent 当前执行的精确命令，开发者反馈"Not good!"。可见性回归是用户高度关注的功能方向。
🔗 https://github.com/openai/codex/issues/37213

### 7. 上下文压缩彻底破坏会话记录
**#44363** | 评论 9 | 👍 0
Context compaction 原地重写存储的 rollout，永久摧毁对话转录内容。数据安全类严重问题，需紧急修复。
🔗 https://github.com/openai/codex/issues/44363

### 8. Windows 反复自动压缩上下文并重执行工具调用
**#46423** | 评论 8 | 👍 0
桌面版 26.915.31029 上 Codex 循环触发自动压缩、断线重连、超时，并重复执行琐碎工具调用，严重影响使用体验。
🔗 https://github.com/openai/codex/issues/46423

### 9. 现有会话中发送按钮保持禁用
**#46986** | 评论 5 | 👍 1
Windows 桌面版 26.915.4065.0 上旧会话的发送按钮始终禁用，需切换设置页再返回才能临时恢复。与 #45885 等同类 bug 关联。
🔗 https://github.com/openai/codex/issues/46986

### 10. Windows 桌面版因 Chromium GPU/沙箱崩溃
**#46021** | 评论 3 | 👍 0
启动时因 Chromium GPU/沙箱失败而崩溃，须用 --disable-gpu --disable-gpu-sandbox 规避。影响 Windows 桌面版的稳定启动。
🔗 https://github.com/openai/codex/issues/46021

## 重要 PR 进展

### 1. 添加 GPT-6 Sol 和 Luna 到模型目录
**#47385** | 新增 gpt-6-sol/gpt-6-luna 目录条目，支持从 gpt-5.5/5.6 系列迁移，废弃 gpt-5.4 系列。
🔗 https://github.com/openai/codex/pull/47385

### 2. 强制执行网络策略（HTTP + WebSocket）
**#47389** | 确保重定向、响应体读取和已建立 WebSocket 流量中目标限制与策略吊销始终生效，且错误处理中不会重试策略拒绝的请求。
🔗 https://github.com/openai/codex/pull/47389

### 3. 重试临时的 OpenAI 文件 blob 上传失败
**#47393** | 对 503 响应及超时/连接错误进行最多 5 次重试，提升文件上传的鲁棒性。
🔗 https://github.com/openai/codex/pull/47393

### 4. 跨 TUI 线程导航保持语音会话
**#47381** | 切换线程时不再停止语音对话，用户可边查看其他任务边继续通话。
🔗 https://github.com/openai/codex/pull/47381

### 5. TUI 语音控制改为通过 App 路由
**#47380** | 语音切换和静音快捷键统一走 App 层，/voice 命令通过线程作用域事件处理，并支持功能键绑定。
🔗 https://github.com/openai/codex/pull/47380

### 6. 从最新压缩边界恢复模型上下文
**#47365** | 恢复压缩线程时，以最新压缩记录为界停止扫描旧上下文，避免恢复到压缩前的过期状态。
🔗 https://github.com/openai/codex/pull/47365

### 7. 限制 Windows 沙箱默认对象访问至登录会话
**#47361** | 阻止共享文件系统能力延伸到其他登录会话的进程/线程/IPC 对象，修复共享账户的 DACL 覆写风险。
🔗 https://github.com/openai/codex/pull/47361

### 8. 跨客户端传输限制 exec-server 请求规模
**#47362** | 对 stdio/WebSocket/relay/Noise relay 统一实施 8 KiB 编码消息上限，防恶意或畸形请求。
🔗 https://github.com/openai/codex/pull/47362

### 9. 添加本地 MXC 沙箱的可选偏好
**#47375** | 新增默认关闭的 features.prefer_mxc 标志，在 Windows 本地支持且网络设置允许时，选择 MXC 沙箱执行。
🔗 https://github.com/openai/codex/pull/47375

### 10. 子代理生成持久化与取消清理优化
**#47348** | 将子代理历史持久化与派生边写入并行执行，并在取消期间清理未完成的临时子代理。
🔗 https://github.com/openai/codex/pull/47348

## 功能需求趋势

1. **Windows 桌面版稳定性与沙箱问题成为最大痛点**：本期 30 条热门 Issue 中约半数与 Windows 相关，集中表现为沙箱初始化失败、更新后项目消失、GPU 崩溃等
2. **模型目录持续演进**：GPT-6 Sol/Luna 即将入目录，gpt-5.x 系列逐步迁移/淘汰，社区对模型路由和自定义代理支持有明确需求
3. **语音交互全面铺开**：默认启用语音、语音 badge、跨线程保持通话等 PR 密集合入，语音成为 Codex 桌面端与 TUI 的正式交互层
4. **TUI 交互体验快速迭代**：鼠标选择、URL 链接、滚动行为、快捷键绑定等细节持续打磨，TUI 正被打造为与桌面同等重要的前端
5. **上下文压缩可靠性**：多个 Issue 与 PR 聚焦压缩边界、压缩后恢复和压缩数据破坏问题，压缩策略成为关注焦点

## 开发者关注点

- **高频痛点**：Windows 沙箱 setup 反复失败（helper_failed/unknown_error）、启用沙箱后所有命令无法执行，是 Windows 用户面临的最严重阻塞问题
- **数据安全担忧**：上下文压缩覆盖原始会话记录，可能导致不可逆的对话历史丢失，用户呼吁提供显式保存/导出机制
- **可见性需求**：Agent 运行时不再展示正在执行的命令，开发者反馈强烈（👍 22），要求恢复运行状态透明度
- **工作流中断**：Windows 更新后项目/线程分组丢失、发送按钮禁用、崩溃重启等问题频繁打断正常使用
- **多端同步冲突**：同一会话在桌面、CLI 和移动端间存在 writer-lock 冲突，跨端使用闭环待完善

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-23

## 1. 今日速览

昨日发布 `v0.62.0-nightly.20260922` 夜间版，修复了环境代理解析与 ACP 模式下工具调用时序两个问题。社区讨论焦点集中在子代理可靠性上：`MAX_TURNS` 被误报为成功、通用代理无故挂起等 Issue 保持高热度。PR 侧则有密集的 MCP 配置安全性修复（防 fail-open）、认证死循环修复和内存优化提交，整体呈现「稳定性和安全加固」的态势。

## 2. 版本发布

**v0.62.0-nightly.20260922.gd5b3e3acc**（2026-09-22 发布）

- `fix(core)`: 标准化 proxy-agent 的 esbuild interop，修复环境代理解析问题（[#29401](https://github.com/google-gemini/gemini-cli/pull/29401)）
- `fix(cli)`: ACP 模式下，在 `request_permission` 之前先发送 `tool_call` 更新（[来自同一版次](https://github.com/google-gemini/gemini-cli/pull/29401)）

## 3. 社区热点 Issues（Top 10）

### Agent 可靠性成焦点

**[#22323] Subagent 在 MAX_TURNS 后误报 GOAL 成功，掩盖中断** — P1，13 条评论
`codebase_investigator` 子代理已经触发了最大轮次限制、未做任何分析，却在结果中返回 `status: "success"` / `Termination Reason: "GOAL"`。属于误导性反馈，直接影响上层决策。
https://github.com/google-gemini/gemini-cli/issues/22323

**[#21409] 通用代理（Generalist agent）挂起** — P1，8 条评论，8 👍
转交通用代理后永远卡死，连创建文件夹这类简单操作也要等一小时，只有显式禁用子代理才能绕过。这是社区反映最强烈的问题之一。
https://github.com/google-gemini/gemini-cli/issues/21409

**[#21983] 浏览器 subagent 在 Wayland 下失败** — P1，4 条评论
浏览器子代理在 Wayland 会话中直接失败退出，`Termination Reason: GOAL`。Linux 桌面环境下使用受限。
https://github.com/google-gemini/gemini-cli/issues/21983

**[#21968] Gemini 不会主动使用 skills 和 sub-agents** — P2，6 条评论
即使用户配置了 `gradle`、`git` 等描述清晰的 skill，模型仍然"懒得用"，必须显式指示才会调用。Agent 的自主工具调度能力与预期有差距。
https://github.com/google-gemini/gemini-cli/issues/21968

### 内存与自动记忆（Auto Memory）问题

**[#26525] 自动记忆缺乏确定性脱敏，日志过多** — P2，5 条评论
提取 prompt 虽然要求模型脱敏，但敏感内容在送入模型上下文之后才执行脱敏，且服务会记录已存在的 skill 内容。存在隐私设计缺陷。
https://github.com/google-gemini/gemini-cli/issues/26525

**[#26522] 自动记忆对低信号会话无限重试** — P2，4 条评论
会话因"低信号"被提取代理跳过，但该会话永远不会被标记为已处理，导致后续不断被召回重试，浪费 token。
https://github.com/google-gemini/gemini-cli/issues/26522

### 代码理解与文件读取

**[#22745] 评估 AST 感知的文件读取、搜索和映射** — P2，7 条评论
EPIC 跟踪：AST 感知工具可精确读取方法边界、减少对齐错误、降低 token 噪声。是提升代码库导航效率的长期方向。
https://github.com/google-gemini/gemini-cli/issues/22745

**[#19873] 零依赖 OS 沙箱 + 执行后意图路由** — P2，9 条评论
利用 Gemini 3 模型的 bash 原生能力，以沙箱方式安全执行 POSIX 工具链，执行后按意图路由结果。同时兼顾安全性与模型偏好。
https://github.com/google-gemini/gemini-cli/issues/19873

### 配置与自定义

**[#22267] 浏览器 Agent 忽略 settings.json 覆盖（如 maxTurns）** — P2，4 条评论
`AgentRegistry` 正确读取并合并了配置，但 `BrowserManager` 实际执行时完全无视，导致用户配置的 `maxTurns` 等参数生效不了。
https://github.com/google-gemini/gemini-cli/issues/22267

**[#20079] symlink 的 agent 文件不被识别** — P2，4 条评论
`~/.gemini/agents/filename.md` 如果是符号链接，则不会被识别为 subagent。对使用 dotfiles 管理配置的用户不友好。
https://github.com/google-gemini/gemini-cli/issues/20079

## 4. 重要 PR 进展（Top 10）

### 核心稳定性修复

**[#29451] 限制工具输出大小，优化长跑 Agent 循环中的内存生命周期** — P1 / size/l
针对高频率工具调用（构建脚本、测试套件）导致进程内存无限增长的场景，为工具输出增加上限并改进内存释放策略，属于长会话稳定性的关键补丁。
https://github.com/google-gemini/gemini-cli/pull/29451

**[#29452] 将工具确认与 IDE diff RPC 解耦，修复 UI 冻结（#23297）** — P1 / size/m
在 IDE 集成终端里按 `Enter` 确认工具审批毫无响应的问题。本次将确认分发与 diff 解析解耦，避免 RPC 阻塞卡死。
https://github.com/google-gemini/gemini-cli/pull/29452

**[#29448] 修复无限认证循环：文件争用、headless keyring 与 supervisor 状态丢失（#28341）** — P1 / size/m~l
解决 Windows / WSL / headless 环境下的认证死循环：与 VSCode 扩展的文件争用、keyring 不可用时回退到加密文件存储、防止 supervisor 状态丢失。
https://github.com/google-gemini/gemini-cli/pull/29448

**[#29402] PersistentState 写入改为故障安全** — P1 / size/m~l
写入 `state.json` 时先写临时文件并 `fsync`，再原子重命名。防止写入中断导致配置文件截断、CLI 持久状态被静默清空。
https://github.com/google-gemini/gemini-cli/pull/29402

### MCP 配置安全修复（3 连发）

**[#29445] 区分"配置不可读"与"配置缺失"，避免 fail-open** — P1 / size/l
损坏的 `mcp-server-enablement.json` 会让所有用户手动禁用的 MCP 服务器全部回到启用状态并暴露工具给模型，下一次 `disable()` 还会用一条覆盖掉整个文件。本次修复让 corrupt 配置安全失败。
https://github.com/google-gemini/gemini-cli/pull/29445

**[#29446] 区分缺失 MCP enablement 配置与畸形 JSON** — P1 / size/m
与 #29445 同源修复：捕获 `ENOENT` 与 JSON parse error 为不同场景，防止禁用状态被错误重置。
https://github.com/google-gemini/gemini-cli/pull/29446

**[#29444] 修复 `gemini mcp enable/disable` 永远匹配不到任意服务器** — size/m
`getMcpServersFromConfig()` 的返回结构与实际匹配逻辑不一致，导致所有 enable/disable 都打印 `Server not found`，CLI 的 MCP 管理命令实际上是失灵的。
https://github.com/google-gemini/gemini-cli/pull/29444

### 新功能与增强

**[#29443] 支持 Gemini 3.8 Flash 与 3.5 Flash Lite** — CLOSED / size/xl
将 `gemini-3.8-flash` 和 `gemini-3.5-flash-lite` 提升为 Flash / Flash Lite 档位的最新 GA 模型。虽已关闭，但表明新一轮模型适配已经完成。
https://github.com/google-gemini/gemini-cli/pull/29443

**[#29304] 截断时不再拆分 UTF-16 代理对** — area/core / size/s
修复 `sanitizeForDisplay` 在截断边界落在 emoji 中间时产生孤立代理对、导致字符消失或显示损坏的问题。用户可见的细节修复。
https://github.com/google-gemini/gemini-cli/pull/29304

**[#29449] 新增 PkgDiet 依赖守卫 skill** — size/s
新增内置 skill，自动拦截 `npm install` / `yarn` / `pnpm`，在安装前通过 PkgDiet MCP 服务检查包的运行健康度、bundle 体积和弃用状态。供应链安全方向的前置拦截能力。
https://github.com/google-gemini/gemini-cli/pull/29449

## 5. 功能需求趋势

### Agent 可靠性与自治能力
- **子代理结果可信度**：MAX_TURNS 被包装成 GOAL 成功（#22323）、没有子代理上下文的 bug report（#21763）——社区希望子代理执行过程和终止原因完全透明、可审计。
- **主动使用自定义 skill / sub-agent**：#21968 显示模型对用户自定义工具利用率极低，是 Agent "偷懒"类问题的高频代表。
- **浏览器 Agent 体验一致性**：Wayland 崩溃（#21983）、settings.json 覆盖失效（#22267）、持久会话锁恢复（#22232）——桌面/CI 环境下浏览器 Agent 的稳定性缺口明显。

### 安全与沙箱
- **零依赖 OS 沙箱**（#19873）受到持续关注，社区期望在不牺牲模型 bash 原生能力的前提下获得隔离保护。
- **阻止破坏性行为**（#22672）：`git reset --force`、危险 DB 操作等场景需要更强的风险提示。
- **供应链依赖检查**：#29449 的 PkgDiet skill 代表了「安装前拦截」的思路，社区对 npm 依赖健康度的关注在上升。

### 上下文管理与性能
- **AST 感知的代码读取与搜索**（#22745、#22746）成为探索方向，目标是减少 token 消耗、提高大文件读取精度。
- **Tactful Extraction（精细化提取）**（#19561）：通过 grep 优先、按需读取的层级来降低 36.6k tokens/回合的基线上下文占用。
- **工具数量上限**：#24246 在 400+ 工具时报 400 错误，需要更智能的工具范围裁剪。

### 配置系统健壮性
- MCP enablement 配置的 fail-open 问题（#29445/#29446/#29444 三连修）暴露了 CLI 配置管理在异常路径上的薄弱环节。
- 认证循环（#29448）、`/compress` 不持久（#21335）、symlink 不识别（#20079）——配置与状态的读写可靠性成为开发者最常碰到的"小毛病大麻烦"。

## 6. 开发者关注点

- **子代理误导性成功反馈**：MAX_TURNS 触发的子代理被上层判定为 GOAL 成功，会污染整个任务链的决策质量（#22323）。
- **通用代理挂起的"死等"体验**：一旦转交 Generalist agent 就永久等待，用户只能手动取消，这是对自动化工作流最致命的打断（#21409）。
- **模型对 skill / sub-agent 的"懒用"**：即使描述清晰也不主动调用，用户必须显式指示——这削弱了自定义 skill 体系的投资回报（#21968）。
- **配置覆盖失效反复出现**：浏览器 Agent 无视 settings.json（#22267）；MCP CLI 命令形同虚设（#29444）；期待「配置就该生效」的基本可靠性。
- **状态与记忆的持久性焦虑**：`/compress` 在会话恢复后丢失（#21335）、Auto Memory 无限重试低信号会话（#26522）、persistent state 可能被截断清空（#29402）——开发者对记忆数据的安全感和控制力不足。
- **认证流程在特殊环境下的死循环**：Windows/WSL/headless 下的认证问题（#29448）属于阻塞级痛点，特别是 headless 场景下没有任何可视化提示。

---

> 数据截至 2026-09-22 23:59 UTC。Issues 与 PR 按评论数 / 优先级筛选，完整列表见 [github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-23

## 今日速览

v1.38.11 升级引发集中爆发式反馈：大量 Windows 桌面端用户报告升级后左侧会话列表为空、历史会话不加载、CPU 占用异常飙高，是当前社区最急迫的问题。与此同时，SivanCola 等维护者密集合入多条修复 PR（延迟加载、Junction 路径、图形故障恢复等），版本稳定性正在快速修复中，但新版本尚未发布。社区功能需求主要聚焦：会话批量管理、新模型支持（如 DeepSeek 4.1）、Agent 模式可靠性。

---

## 社区热点 Issues（Top 10）

**1. 升级 1.38.11 后左侧项目会话列表为空**
- 作者: @aa1126123 | 评论: 10 | 👍: 0
- 摘要：升级到 1.38.11 后，左侧项目会话列表一个都没加载出来，只剩中间一个升级前的会话记录，回退版本恢复正常。
- 重要性：这是 v1.38.11 升级引发的最高热度回归问题，十人参与讨论，影响桌面端核心使用流程。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10620

**2. v1.38.11 sidebar 无限加载，仅显示当前会话**
- 作者: @Aresitoo | 评论: 3 | 👍: 0
- 摘要：从 1.38.10 升级到 1.38.11 后，侧边栏永远加载不完，只列出当前打开的会话，`current.json` 显示 activeVersion 为 v1.38.11。
- 重要性：与 #10620 同源，确认非个例，是影响面较大的升级回归。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10622

**3. v1.38.11 历史会话页全部显示"已导入"，重启后消失**
- 作者: @willipapa | 评论: 0 | 👍: 0
- 摘要：历史会话页全部显示"已导入"，手工导入后部分会话临时出现，重启后消失；各项目（ProjectTree）下会话为空。doctor 检查全绿。
- 重要性：疑似会话数据目录读取存在持久性问题，带有 data-loss 标签，升级后用户数据不可见，风险极高。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10661

**4. CPU 占用异常，会话栏加载状态不结束**
- 作者: @Se7en-exe | 评论: 1 | 👍: 1
- 摘要：CLI v1.38.11，会话已经加载完但会话栏仍显示"加载中"，无操作时 CPU 不定时飙到 30%+。
- 重要性：TUI 端也有类似"加载不结束"的问题，并获得 1 个 👍，说明有用户共鸣，性能异常影响日常使用。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10645

**5. CPU 占用很高（附截图诊断）**
- 作者: @sunianyu | 评论: 0 | 👍: 0
- 摘要：v1.38.11 桌面端 CPU 占用很高，附有任务管理器截图和诊断数据。
- 重要性：与 #10645 互相印证，v1.38.11 存在普遍的 CPU 异常问题，需要优先排查。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10652

**6. 远程连接项目后无法查看本地会话**
- 作者: @XuMiaoWuMang | 评论: 0 | 👍: 0
- 摘要：添加远程项目后，每次进入 Reasonix 默认连接远程服务器，本地会话记录无法查看；删除 SSH 配置才能恢复。
- 重要性：远程连接功能的会话隔离问题，涉及本地数据不可达（数据丢失风险），属于工作流阻断级 Bug。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10653

**7. v1.38.11 通过 REASONIX_HOME 迁移数据目录后会话不加载**
- 作者: @Aresitoo | 评论: 0 | 👍: 0
- 摘要：设置 REASONIX_HOME 指向新数据目录后，桌面端现有会话全部不加载（54 个注册会话、300 个旧 transcript），而 CLI 使用同一变量正常。
- 重要性：环境变量路径配置在桌面端被忽略或冲突，影响高级用户数据迁移与备份场景。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10659

**8. macOS SSHFS 作为项目根目录在 1.38.11 无法打开**
- 作者: @zhuangyy | 评论: 0 | 👍: 0
- 摘要：macOS 挂载 sshfs（如 ~/sshfs-myproj）作为项目根目录，1.38.10 之前正常，1.38.11 报错：`initialize workspace write lease: resolve workspace root: resolve path identity…`。
- 重要性：文件路径解析逻辑在 1.38.11 被收紧，影响使用网络挂载目录的 macOS 用户。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10654

**9. 计划模式和目标模式不可用**
- 作者: @codemart-sys | 评论: 0 | 👍: 0
- 摘要：v1.38.11 计划模式会导致会话中断；目标模式不会持续推进，自动停止。
- 重要性：Agent 两个核心执行模式均不可用，严重影响依赖 Agent 自动化的用户。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10647

**10. 工作区会话不分区刷新 + 切换会话延迟 3-5s + CPA 所有格式 404**
- 作者: @whiteS18 | 评论: 0 | 👍: 0
- 摘要：归档会话到回收站时工作区所有会话列表刷新；切换会话延迟 3-5s；自定义模型服务商使用 CPA（OpenAI 兼容代理？）所有格式提示 404。
- 重要性：三个问题叠加（UI 性能 + 会话切换延迟 + 自定义模型兼容性），反映桌面端在多会话操作和第三方 API 兼容方面的体验短板。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10643

---

## 重要 PR 进展（Top 10）

**1. Defer historical session loading and add bounded native paging / 延迟历史会话加载并加入有界原生分页**
- 作者: @SivanCola | 状态: OPEN
- 摘要：将历史会话迁移、全量目录枚举和非活动会话恢复移出启动关键路径；当前会话和首个目录页立即可用，后台增量发现会话；建立历史维护的所有权边界。
- 重要性：直击本次升级回归的根源——启动时全量加载历史记录。此 PR 合并后有望从根上解决侧边栏加载慢/空白问题。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10664

**2. Restore eager session creation with upgrade-safe input recovery / 回滚新建会话流程并保留升级数据**
- 作者: @SivanCola | 状态: CLOSED（已合入）
- 摘要：恢复 #10469 之前的"点击即建会话"行为，同时保留存储/生命周期/历史/恢复修复。每次点击立即创建独立正式会话，第一条消息即用该会话。
- 重要性：新建会话流程回滚与升级数据安全的兼容方案，是缓解"新会话不可用"问题的关键修复。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10650

**3. Fix Windows junction path identity and upgrade recovery / 修复 Windows Junction 路径身份与升级恢复**
- 作者: @SivanCola | 状态: CLOSED（已合入）
- 摘要：Windows 上通过 Junction 访问的数据目录，Go `EvalSymlinks` 会因 Junction 条目未解析而阻止会话启动。现在解析 Windows 物理路径后再做锁定判断。
- 重要性：修复影响 Windows 用户使用软链接/重定向数据目录时的启动阻塞问题，与 #10659 场景可能直接相关。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10656

**4. Fix canonical inbox identity and settled tool state / 修复会话队列身份与工具完成状态**
- 作者: @SivanCola | 状态: CLOSED（已合入）
- 摘要：修复正式会话在回合运行中拒绝排队消息的问题（inbox fence 比较了临时路径与逻辑 locator）；后台启动回执不再空转；恢复的 `job_output` 行不再继承采样状态。
- 重要性：解决多消息排队/并发场景下的消息丢失和工具状态误判，是 Agent 可靠性的关键修复。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10646

**5. Add native graphics fault recovery / 增加原生图形故障恢复**
- 作者: @SivanCola | 状态: CLOSED（已合入）
- 摘要：桌面端图形故障可导致白屏/冻结且无法进入设置页面。新增原生恢复机制，区分显式 GPU 故障与渲染器终止；限制重载次数并给出原生恢复选项，硬件加速默认保持开启。
- 重要性：提供崩溃场景下的逃生通道，用户不需要手动改配置文件或重装。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10644

**6. fix(provider/openai): 解析固定到 base_url 的端点覆盖，修复本地端点 404 错误**
- 作者: @THERentropy | 状态: OPEN
- 摘要：将 base_url 镜像到每个端点字段时，request_url 和 chat_url 仍指向 API 根路径，导致 OpenAI 兼容请求被 POST 到根路径而非聊天补全路由（404）。该 PR 将仅重复 base_url 的覆盖值视为不存在，并解析规范聊天端点。
- 重要性：解决本地/自托管 OpenAI 兼容网关（如 CPA、vLLM 等）的 404 问题，是社区呼声较高的兼容性修复。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10658

**7. Fix: 会话窗口执行时莫名合并窗口版本后崩溃**
- 作者: @goransh-walia | 状态: OPEN
- 摘要：针对 issue #9927，修复会话窗口执行时自动合并窗口导致的崩溃。AI 辅助生成，已在提交前做语法与变更范围验证，欢迎反馈。
- 重要性：社区成员尝试修复一个被长期搁置的窗口崩溃问题，值得关注其代码质量与合入可能性。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10657

**8. Clarify MiMo API and Token Plan access and upgrade models / 明确 MiMo 接入方式并升级模型**
- 作者: @SivanCola | 状态: CLOSED（已合入）
- 摘要：MiMo 区域优先的 Provider 选择器未区分按量付费 API 与 Token Plan。改为先选接入类型，再选 Token Plan 服务集群和 API 格式；分离凭证并提供简明提示；升级模型列表。
- 重要性：改善多个云服务提供商的接入体验，降低配置出错概率。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10655

**9. fix(boot): skill watcher 恢复 host 级生命周期**
- 作者: @jf200s | 状态: OPEN
- 摘要：`boot.build` 无条件创建 skill-watch 服务，且构造函数里直接 fork 辅助进程。每次 controller build 都会派生一个 56MB 的 `reasonix-desktop.exe` watcher，rebuild 导致多个 watcher 残留。该 PR 改为 host 级生命周期。
- 重要性：显著降低开发模式下资源占用与进程残留，对插件/skill 开发友好性有帮助。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10636

**10. fix(transcript): keep the user row ahead of its live output / 修复用户消息被本轮输出插到前面**
- 作者: @SivanCola | 状态: CLOSED（已合入）
- 摘要：流式输出时，推理/回答/工具内容可能出现在发起该轮的用户消息之前。现在在复制 transcript 业务记录前发布 `turnId`，使直播桌面端与重载/导出看到相同身份。用户消息始终位于其输出之前。
- 重要性：修复对话流顺序错乱的观感问题，提升流式输出的可读性和一致性。
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10639

---

## 功能需求趋势

从近期 Issues 与 PR 中，社区最集中的功能诉求体现在以下五个方向：

1.  **会话批量管理（新）**：多选会话、批量删除历史会话（#10651）。当前只能逐条删除，导致会话过多后加载缓慢；这是社区提出的明确功能缺口。
2.  **新模型支持（持续）**：请求支持 DeepSeek 4.1（#10210），以及多模态模型（deepseek-v4.1-flash）的图片输入能力（#9946 曾要求取消强制类型限制）。社区对多模态和更新模型版本的跟进期望很高。
3.  **Agent 模式可靠性（回归）**：计划模式中断、目标模式不推进（#10647）直接影响核心功能可用性，是本次日报中发现的高优先级 Agent 问题。另外引导消息截断（#10640）反映了交互细节的完整性待加强。
4.  **历史会话加载与性能（回归）**：1.38.11 升级后大量会话不显示、加载慢的问题被集中报告，驱动了 #10664（延迟加载 + 原生分页）的设计。同时，切换会话 3-5s 延迟（#10643）、多窗口并发崩溃（#9927）也映射出整体会话管理性能和稳定性的优化空间。
5.  **自定义 Provider 兼容性**：CPA 所有 API 格式都 404（#10643）以及 OpenAI 兼容端点的 base_url 覆盖解析问题（#10658），表明用户对本地/自托管模型服务商的接入体验有较高期待，需要一个更稳定的自定义端点解析逻辑。

---

## 开发者关注点

-   **v1.38.11 升级回归问题爆炸**：升级后左侧会话列表为空（#10620、#10622）、历史会话导入后重启消失（#10661）、启动加载不完成，已成为社区第一痛点。多个 issue 互相印证，开发者普遍在等待一个修复版本，而不是手动 workaround。就当前 PR 进度看，修复方向是"启动不加载全量历史 + 按需分页"，有望在下个版本内解决。
-   **资源占用异常**：多个 issue 报告 CPU 飙升（#10645、#10652），被部分用户形容为"升级后性能倒退"。加上 #10645 的"加载已结束但状态不停"问题，社区认为这不是单纯的 UI 状态 Bug，而可能关联到后台 watcher 或事件循环的持续空转。
-   **数据目录与路径解析的敏感性**：Windows Junction 路径、REASONIX_HOME 迁移、SSHFS 挂载目录都在 1.38.11 中出现了不同形式的"路径解析"问题（#10654、#10656、#10659）。这提示开发者在新版本中应谨慎处理文件系统路径与数据目录的兼容逻辑，尤其是在 Windows 和网络文件系统场景。
-   **桌面端与 CLI 行为一致性**：REASONIX_HOME 在 CLI 下正常工作、桌面端失效，说明两者对数据目录的解析策略存在分裂。开发者希望桌面端继承 CLI 端已经验证过的路径解析逻辑，而不是各自维护一套。
-   **对维护者响应的正面反馈**：尽管 1.38.11 问题频发，但 SivanCola 在一天内连续合入 6+ 个修复 PR（#10639、#10641、#10642、#10644、#10646、#10650 等），体现出较快的响应速度。社区在 issue 评论中对项目组的回应速度保持了认可，期待的只是尽快发布 1.38.12 或 1.39 来统一消化这些修复。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-09-23

## 今日速览

配置与插件系统的「静默失败」问题成为社区反馈焦点：插件重载崩溃、Provider 因字段缺失被静默丢弃、后台任务状态丢失等多个 Issue 形成集中讨论。同时，ACP 重试状态转发系列 PR 获密集推进（#50752/#50755/#50757），Git 插件子目录安装、OAuth 刷新竞争等修复也相继落地。服务器稳定性（进程泄漏、OOM、会话冻结）仍是开发者最紧迫的关切。

## 社区热点 Issues

**1. server: failed plugin reload on config change silently drops custom agents and commands until restart**
[#49982](https://github.com/anomalyco/opencode/issues/49982)
v2.0.9 后台服务模式（`opencode serve --service`）下配置文件变更触发插件重载失败（`pe is not a function`），随后**所有文件发现的自定义 agents 和命令静默丢失**，只能重启恢复。5 条评论，社区关注度高，属于典型的「静默降级」问题——服务看似正常运行，实则功能已残缺。

**2. OOM and ~30 GB database: huge workspace-file diffs embedded in message summaries are re-serialized in full on every `message.updated` event**
[#43551](https://github.com/anomalyco/opencode/issues/43551)
工作区内持续增长的大文件（如 MCP 日志追加至 292MB/407MB）被嵌入消息摘要后，每次 `message.updated` 事件都会完整重新序列化，导致 OOM 和数据库膨胀至 30GB。性能与资源管理的严重缺陷，已有 3 条评论讨论缓解方案。

**3. config: normalization diagnostic 'skipped malformed recognized value' doesn't name the offending field — bad package id silently drops whole provider**
[#50756](https://github.com/anomalyco/opencode/issues/50756)
配置规范化诊断只报 provider 根路径，不指明具体出错字段。一个错误的 `package` id 会静默丢弃整个 Provider 及其全部模型，日志却没有任何线索。3 条评论，开发者普遍认为「错误信息应该精确到字段级别」。

**4. config: model capabilities requires tools — missing field silently skips whole provider (undocumented)**
[#50340](https://github.com/anomalyco/opencode/issues/50340)
V2 原生配置中，模型 `capabilities` 若缺省 `tools` 字段，整个 Provider 条目被**静默跳过**，且该行为未见文档。3 条评论，直指配置校验的健壮性和透明度问题。

**5. providers: custom provider silently skipped when model capabilities omit tools**
[#49912](https://github.com/anomalyco/opencode/issues/49912)
按官方 V1→V2 迁移指南操作的自定义 Provider，因 V1 模型没有 `tool_call` 能力，迁移后 `capabilities` 缺少 `tools`，导致整个 Provider 被静默丢弃。与 #50340 相互印证，反映迁移路径上的系统性缺陷。

**6. [Desktop] New sessions created from sidebar never respond — prompt_async fails: FileSystem.realPath ENOENT on missing worktree dir**
[#49561](https://github.com/anomalyco/opencode/issues/49561)
Windows 11 桌面端点击「+ New session」创建的新会话发送消息后无任何回复，错误隐藏在 `FileSystem.realPath ENOENT`（worktree 目录不存在），CLI 却完全正常。1 个 👍，桌面端用户受影响较大。

**7. Session permanently frozen: drain() failures are logged but never surfaced to the client (no session.error event)**
[#49740](https://github.com/anomalyco/opencode/issues/49740)
`SessionRunner.drain()` 失败仅在服务端记录日志，从不通过 `session.error` 事件或持久化 `Step.Failed` 告知客户端，导致会话永久「冻结」且无任何可感知的错误信号。2 条评论，属可观测性核心缺口。

**8. server: stdio MCP child processes not terminated on service restart / config reload**
[#50758](https://github.com/anomalyco/opencode/issues/50758)
后台服务重启或 MCP 配置变更触发 reload 时，stdio MCP 子进程不会终止，旧进程成为孤儿持续泄漏内存/进程；CPU 争用下会进一步级联影响 CLI 响应。基础设施稳定性的典型问题。

**9. V2 provider OAuth refresh races across locations and processes**
[#50759](https://github.com/anomalyco/opencode/issues/50759)
Provider OAuth 凭据是全局的，但 `Integration` 实例按 location 隔离。过期并发刷新时，多个进程读取同一 refresh token 独立换取新 token 互相覆盖，遇到「轮换型 refresh token」的 Provider 会导致凭据失效。并发竞态设计缺陷，值得关注。

**10. subagent: background subagent's resumed turn completes but the parent session never receives the completion notification**
[#50751](https://github.com/anomalyco/opencode/issues/50751)
后台子代理恢复执行后已完成回合（最终报告已持久化并在 UI 可见），但父会话始终收不到完成通知，编排代理无限期等待，除非人工介入。与 #49740 同属「事件传递丢失」类问题。

## 重要 PR 进展

**1. fix(acp): forward provider retry status to clients**
[#50752](https://github.com/anomalyco/opencode/pull/50752)
修复 #50743。Provider 请求失败进入重试时，ACP 客户端此前全程无感知，界面看起来像挂起。该 PR 将重试状态和 Provider 错误信息发送给客户端。已合并。

**2. fix(core): install git plugins from branch subdirectories**
[#50754](https://github.com/anomalyco/opencode/pull/50754)
关闭 #47517、#48133。修复从 monorepo 分支子目录（如 `github:org/repo#main::path:packages/ultra`）安装插件失败的问题——pacote 在转换分支引用时丢失 `::path:`。同时上游提交了 [npm/pacote#513](https://github.com/npm/pacote/pull/513)。已合并。

**3. fix(core): coordinate OAuth credential refreshes**
[#50760](https://github.com/anomalyco/opencode/pull/50760)
对应 #50759。跨 location 和进程协调 OAuth 凭据刷新，避免并发刷新互相覆盖导致凭据失效，并关联 #34520（MCP OAuth 路径）。

**4. fix(ai): classify openai spend limits as quota exceeded**
[#50755](https://github.com/anomalyco/opencode/pull/50755)
OpenAI 将硬性消费限额返回为 429，此前被当作限流导致每一步永久错误重试 10 次，现在改为立即失败并透出 Provider 原始信息。是 #50743/#50752 系列的后续。

**5. fix(core): show retry status during compaction**
[#50757](https://github.com/anomalyco/opencode/pull/50757)
压缩（compaction）请求遇到可重试错误时静默重试，导致 TUI/Web/ACP 端出现冻结的「Compaction」行（有时残留半截摘要）。该 PR 发布重试事件并在界面上显示进度。

**6. fix(tui): show latest step in turn token summary**
[#50765](https://github.com/anomalyco/opencode/pull/50765)
将折叠的回合摘要改为展示最近一步的 new/cached/total tokens，而非将各步骤重复上下文相加，并标注 `latest` 标签。来自 opencode-agent 的贡献。

**7. fix(opencode): prioritize default export in plugin loader and ignore non-plugin exports**
[#50022](https://github.com/anomalyco/opencode/pull/50022)
关闭 #50021。加载旧版插件时优先使用 `default` 导出，并忽略非插件的命名导出，避免 `Object.entries()` 遍历时把无关导出误当作插件处理。

**8. fix(opencode): handle stale and inaccessible project worktrees and sandboxes gracefully**
[#50020](https://github.com/anomalyco/opencode/pull/50020)
关闭 #50019、#50023。`Project.fromDirectory` 与 `Project.sandboxes` 处理 SQLite 项目数据时，新增对失效 sandbox 目录和不可访问 worktree 的校验与优雅处理，避免引发级联异常。

**9. feat(session): allow metadata updates**
[#50025](https://github.com/anomalyco/opencode/pull/50025)
恢复 `PATCH /api/session/{sessionID}` 对 `metadata` 的支持，通过持久的 `session.metadata.updated` 事件保存替换，并更新了两个生成的客户端。已合并。

**10. fix: preserve revert consistency**
[#46974](https://github.com/anomalyco/opencode/pull/46974)
关闭 #37751、#44357，替代 #37752、#42461。按会话序列化 revert 变更并暂存 prompt 准入，执行期间保持暂停态，解决冲突时执行不一致的问题。当前标注 `needs:issue`，等待补单。

另值得关注：**chore: upgrade Effect to rc.115**（[#50231](https://github.com/anomalyco/opencode/pull/50231)，从 rc.112 升级，涉及 socket 生命周期、schema 解析、CLI 构造器等 breaking changes）。

## 功能需求趋势

**显式新功能诉求：**
- **[#50753](https://github.com/anomalyco/opencode/issues/50753) 提出四合一需求**：语音模式（Voice Mode）、一等公民浏览器自动化（First-Class Browser Automation）、目标驱动任务循环（Goal-Driven Task Loop）、应用内插件发现（In-App Plugin Discovery）。对比标杆为 Hermes Agent（Nous Research）和 ZCode（Z.ai/GLM）。这是近期少见的成体系功能需求，值得产品团队关注。

**隐式稳定性需求（占比更高）：**
- **配置系统的可诊断性**：多个 Issues（#50756/#50340/#49912/#49982）指向同一痛点——配置错误导致 Provider/Agent 静默丢失，且日志不提供字段级信息。社区明确期待「错误必须点名具体字段」。
- **会话级可观测性**：#49740/#50751/#50764 共同反映事件传递链路的缺口——drain 失败、后台任务完成、前台任务误报「completed」都没能产生客户端可感知的事件。
- **资源生命周期管理**：#50758（MCP 子进程泄漏）、#43551（大文件序列化膨胀）说明服务端长驻场景下的资源回收已成为刚需。

## 开发者关注点

- **「静默失败」模式被集中声讨**：插件重载失败后 agents 消失、Provider 因缺字段被跳过、OAuth 刷新竞态、后台任务状态丢失……近半数 Issues 指向「系统不报错但功能悄悄坏了」。开发者普遍反馈这类问题比显式报错更难排查，要求「要么成功，要么明确失败」。
- **V1→V2 迁移兼容性阵痛仍在**：#49412（V1 会话迁移后列表缺失）、#49912（V1 自定义 Provider 迁移后被静默跳过）表明迁移路径的验证仍需加强。
- **事件通知覆盖不足**：#49740 的 `session.error` 缺失、#50751 的父会话通知丢失、#50743 的 ACP 重试状态缺失，共同指向「客户端必须能感知服务端每一步状态变化」这一高优先级诉求。
- **Windows 桌面端体验落后于 CLI**：#49561 的会话无响应问题在 CLI 上无法复现，侧面反映桌面端与核心的联调测试覆盖不足。
- **上游 Provider 行为差异处理**：#50755（OpenAI 429 语义）、#50761（opencode-go 路由依赖上下文限制导致间歇性 400）提醒维护者：不同 Provider 的错误语义和限流策略需要更细致的分类和适配。

---
*数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)，统计时间为 2026-09-23。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 — 2026-09-23

## 今日速览

过去 24 小时内，Deepseek Harness 发布了 `dsh-v0.1.7-alpha.2` 和 `dsh-v0.1.7-alpha.1` 两个迭代版本，主要围绕会话体验、消息编辑、Agent Team 协作、会话归档及过程展示进行优化。社区暂无新增 Issue 或 PR，整体处于版本打磨阶段。

## 版本发布

### [dsh-v0.1.7-alpha.2](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.7-alpha.2)

- 稳定会话与工作过程组的滚动跟随；改善历史分页与轮次跳转，减少发送消息时的跳动或重复显示（@imccyu）。
- 统一会话区域代码块样式，支持复制/换行，改善差异内容和行号展示（@yixiangihsiang）。
- 重新编辑排队消息时保留换行，避免多行内容发送给模型时合并成一行（@turtle2099）。
- Agent Team 成员的初始任务增加查找队友和联系 Lead 的指引（后续内容截断）。

### [dsh-v0.1.7-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.7-alpha.1)

- 侧边栏会话支持置顶、归档管理、筛选、撤销归档及从搜索结果恢复（@Yifffan）。
- 对运行中会话归档时，会列出受影响的回合、子代理、任务和提醒，并新增「停止并归档」确认（@LegGasai）。
- 新增「工作过程展示」「性能与用量」「开发者工具」设置；连续思考与工具调用合并为可折叠过程组，支持简洁、详细及运行中完全展开。开发者工具默认开启，关闭时仍显示第三方会话标签页（@lsdsjy, @s 截断）。

## 社区热点 Issues

过去 24 小时内无新增或更新的 Issue。

## 重要 PR 进展

过去 24 小时内无新增或更新的 PR。

## 功能需求趋势

由于今日无新增 Issue，暂无直接数据。从版本发布内容来看，社区关注点集中在：

- **会话管理效率**：归档、筛选、恢复、置顶等操作。
- **交互体验细节**：消息跳转、换行保留、代码块复制。
- **过程可视化**：思考与工具调用的折叠展示、运行中展开。
- **团队协作支持**：Agent Team 内成员间的联系引导。

## 开发者关注点

从版本更新中可推测近期开发者反馈的高频痛点：

- 发送消息时界面跳动、重复显示。
- 多行消息编辑后发送被合并为一行。
- 归档运行中会话时缺少影响确认，容易误操作。
- 会话过程展示不够清晰，希望自主控制展开/折叠粒度。

这些改进项说明社区对日常使用中的稳定性和可控性有较高要求，后续版本大概率会继续围绕这些方向迭代。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-23

## 今日速览
今日社区焦点集中在**安全与稳定性修复**上：终端环境变量凭证泄露、密钥擦除缺失等安全问题引发讨论；桌面端重复回复、UI 冻结问题也获得较多反馈。配置迁移、Qwen 模型目录、Anthropic 新模型等多项 PR 正在推进中。

## 社区热点 Issues（10 个）

1. **[Security] 终端环境快照将含凭证的环境变量写入磁盘** — `#62336`
   P2 安全问题：`tools/environments/base.py` 通过 `export -p` 捕获全部环境变量（含 BWS 注入的密钥）并持久化到缓存目录。已有 6 条评论，社区关注度高，正等待决策。

   https://github.com/NousResearch/hermes-agent/issues/62336

2. **[Bug] 桌面端间歇性重复渲染助手回复** — `#70108`
   一个提示词触发两条相同的气泡回复，但 `state.db` 仅存一条。P2 级别，13 条评论，是桌面端当前最受关注的稳定性问题。

   https://github.com/NousResearch/hermes-agent/issues/70108

3. **[Feature] 邮件网关支持 HTML 邮件（multipart/alternative + Markdown 渲染）** — `#11941`
   需求较强（👍 4，评论 14），希望定时报告的邮件内容能渲染富文本格式。目前排在 P3，但讨论热度很高。

   https://github.com/NousResearch/hermes-agent/issues/11941

4. **[Security] 工具结果→模型提供商路径缺少精确值密钥擦除** — `#77162`
   `make_tool_result_message` 组装的内容直接发往模型 API，未经密钥红action。安全边界相关，社区已提出修复方向但尚未合入。

   https://github.com/NousResearch/hermes-agent/issues/77162

5. **[Bug] Windows 更新失败：`_find_stale_dashboard_pids()` 收到意外 keyword** — `#118154`
   P2 bug：代码已成功更新但更新流程仍报 TypeError，影响 Windows git 安装用户。3 条评论。

   https://github.com/NousResearch/hermes-agent/issues/118154

6. **[Bug] kanban 卡片速率限制后永久停在 blocker_auth** — `#119070`
   一次速率限制后重试成功，但 `check_respawn_guard` 永远返回 `blocker_auth`，审查者永远不启动。影响自动化流程可靠性。

   https://github.com/NousResearch/hermes-agent/issues/119070

7. **[Bug] macOS launchd 更新时误杀新启动的 gateway 子进程** — `#105938`
   `hermes update` 的过期进程清理将 `--external-supervisor` 子进程当作“手动 gateway”强制杀掉，导致重启两次、cron 任务中断。P2 兼容性问题。

   https://github.com/NousResearch/hermes-agent/issues/105938

8. **[Bug] 桌面聊天在繁忙主机上冻结数分钟，消息可能丢失** — `#119643`
   后端工作期间 UI 无响应超 4 分钟，一条 1630 字符的回复生成后从未到达 UI。新 issue，社区刚开始关注。

   https://github.com/NousResearch/hermes-agent/issues/119643

9. **[Feature] 桌面 App 支持韩语（한국어）UI** — `#33512`
   P3 功能请求：目前 UI 支持英文、西语、印尼语、日文、葡语、简中，韩语缺失。评论 5 条，有 👍 1。

   https://github.com/NousResearch/hermes-agent/issues/33512

10. **[Feature] 需要“注意力提示音”：响铃并重复直到人工输入响应** — `#115182`
    P3 功能请求：用户希望 Hermes 思考时无需盯屏，有提示音提醒。评论 2 条。

    https://github.com/NousResearch/hermes-agent/issues/115182

## 重要 PR 进展（10 个）

1. **fix(config): retry skipped config migrations** — `#119662`
   修复 `migrate_config` 在某个迁移步骤失败后仍将 `_config_version` 写入最新版本，导致失败的迁移永远不会重试的问题。直接对应 issue `#119658`。

   https://github.com/NousResearch/hermes-agent/pull/119662

2. **fix(sessions): keep session renames from freezing Desktop chat** — `#119650`
   将重命名会话时的数据库操作移入工作线程，避免阻塞 Desktop 和 dashboard 的 WebSocket 流量。已合并关闭。

   https://github.com/NousResearch/hermes-agent/pull/119650

3. **matrix: fix Beeper reaction-key mismatch and nested-reply orphan threads** — `#119653`
   针对 Beeper 客户端兼容性的两个外科手术式修复：reaction key 不匹配与嵌套回复孤立线程。基于当前 main 的最小改动。

   https://github.com/NousResearch/hermes-agent/pull/119653

4. **feat(models): add Claude Opus 5.5** — `#119444`
   在原生 Anthropic 目录中添加 `claude-opus-5-5`，注册 100 万 token 上下文和 128K 输出限制，同时更新 Bedrock 回退目录和 Claude Code OAuth 身份下限。

   https://github.com/NousResearch/hermes-agent/pull/119444

5. **test(models): pin native Anthropic curated parity with the aggregator catalogs** — `#119656`
   为 `#119444` 添加回归测试，固定原生 Anthropic 目录与聚合器目录之间的关系，确保模型列表不会漂移。

   https://github.com/NousResearch/hermes-agent/pull/119656

6. **feat(serve): support multiple --host arguments for dual-stack binding** — `#73849`
   允许 `--host` 多次传入（如同时绑定 IPv4/IPv6），每个地址独立预绑定 TCP socket，IPv6 设置 `IPV6_V6ONLY=1` 避免冲突。P3 功能。

   https://github.com/NousResearch/hermes-agent/pull/73849

7. **fix(providers): stop Token Plan catalog probes from 404ing on the Anthropic base** — `#119659`
   修复 Token Plan 选择器目录探测 404 导致模型列表不完整的问题。与 `#110993` 互补。

   https://github.com/NousResearch/hermes-agent/pull/119659

8. **feat(provider-routing): pass unknown OpenRouter provider_routing keys through** — `#102341`
   将 `provider_routing` 配置中的未知键原样透传给 OpenRouter 的 `provider` 对象，支持未来新增字段（如 `zdr`、`quantization`）。P3 功能。

   https://github.com/NousResearch/hermes-agent/pull/102341

9. **fix(voice): convert non-WAV to WAV for sounddevice playback on Linux** — `#119655`
   修复 Linux 上 TTS MP3 播放问题：`ffplay` 可能在 headless/Docker 上挂起，现在先将非 WAV 转换为 WAV 再交给 sounddevice 播放。

   https://github.com/NousResearch/hermes-agent/pull/119655

10. **feat(catalog): add hermes-session-warmer v0.1.0** — `#119657`
    将 `mojomast/hermes-session-warmer` 以公共 MIT 许可证收录进插件目录，为社区提供会话预热工具。

    https://github.com/NousResearch/hermes-agent/pull/119657

## 功能需求趋势

- **邮件网关富文本化**：HTML 邮件支持（multipart/alternative）呼声最高，用户期望 Markdown 内容能渲染为富文本邮件。
- **桌面 UI 国际化扩展**：韩语支持请求表明 i18n 覆盖仍是社区关注方向。
- **新模型支持持续跟进**：Claude Opus 5.5 的目录更新和 Token Plan 模型列表修复，说明用户对新模型/新商家的适配有较高期待。
- **安全与密钥管理加固**：环境变量凭证落盘、精确值密钥擦除缺失等安全问题出现频率上升，是社区最近几周的热门议题。
- **MCP 连接器可靠性**：Todoist OAuth 失败暴露了公共客户端的 PKCE 兼容问题，MCP 集成稳定性开始被关注。

## 开发者关注点

- **桌面端稳定性**：UI 冻结、重复回复、消息丢失等问题反复出现，已有多条 issue 积累，是影响日常体验的首要痛点。
- **更新流程可靠性**：Windows 与 macOS 平台均出现更新后二次启动/失败的问题，更新流程的跨平台兼容性仍需打磨。
- **配置迁移健壮性**：迁移失败被跳过且不会重试的问题，反映出配置升级路径需要更强的错误处理与可见性。
- **自动化流程卡死**：kanban 卡片在速率限制后永远停在 blocker_auth，说明自动化任务需要更好的状态恢复机制。
- **安全边界**：凭证泄露与密钥擦除问题获得多线程讨论，开发者正督促将安全修复优先级提升。

:::
