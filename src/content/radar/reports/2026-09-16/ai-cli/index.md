---
title: "AI CLI 工具社区动态日报"
published: 2026-09-16
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-16

> 生成时间: 2026-09-16 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-16）

## 1. 生态全景

当前 AI CLI 工具正从"能跑通对话"迈入"生产级可靠性"阶段，社区反馈焦点集中在后台任务稳定性、Windows 平台兼容、会话数据安全与用量透明度四大方向。各工具迭代节奏明显分化：OpenAI Codex 以每日 50 条 PR 的密度高速重构用量分析体系，Claude Code 凭借庞大用户基数积累高热度 issue 但修复速度滞后，Gemini CLI 以 P1/P2 分级机制推进子代理稳定性修复，而 DeepSeek Reasonix 与 OpenCode 正被各自的桌面端稳定性回归问题所牵制。整体来看，社区对"真实可信的执行状态反馈"和"不可绕过安全边界"的诉求已超越单纯的功能堆叠，成为下一阶段竞争分水岭。

## 2. 各工具活跃度对比

| 工具 | 今日 Issue 更新 | 今日 PR 更新 | 版本发布 | 热点 Issue 热度峰值 | 活跃度判断 |
|------|----------------|-------------|----------|-------------------|-----------|
| **OpenAI Codex** | 43 条（列 10） | 50 条（列 10，均合入） | 4 个 rust-v0.155.0-alpha 预发布版 | 182 👍 / 46 评论（可自定义状态行） | 🔴 极高：PR 密度全场第一，Analytics 体系重构中 |
| **Claude Code** | 10 条热点，合计 335+ 评论 | 1 条（已 CLOSED） | v2.1.273 / v2.1.272 | 189 评论 / 88 👍（Windows 文件锁） | 🟠 高：用户基数大、讨论深，但 PR 产出单薄 |
| **Gemini CLI** | 10 条热点（含 5 个 P1） | 10 条（2 合入） | v0.60.0 稳定版 + preview/nightly | 13 评论（MAX_TURNS 误报） | 🟠 中高：P1 标签体系清晰，OAuth/UI 修复集中 |
| **Hermes** | 10 条热点（2 个 security） | 10 条（1 合入） | 无 | 11 评论（config set 绕过保护） | 🟡 中：安全议题讨论深，社区规模较小 |
| **DeepSeek Reasonix** | 10 条热点 | 10 条 | Studio v2.16.0 | 11 评论（渲染崩溃） | 🟡 中：桌面端稳定性问题集中，新版本功能面广 |
| **OpenCode** | 10 条热点 | 10 条 | 无 | 15 👍 / 13 评论（1.18.30 回归） | 🟡 中：回归与 Provider 兼容问题消耗注意力 |
| **Deepseek Harness** | 0 条 | 0 条 | dsh-v0.1.6-alpha.1 | — | ⚪ 低：活跃度低，新版本发布为今日焦点 |

## 3. 共同关注的功能方向

### 3.1 后台任务/定时任务可靠性（5 个工具）
- **Claude Code**：定时任务挂起（#94563）、Monitor 持久化被限 30 分钟（#94553）
- **OpenAI Codex**：app-server 排队 follow-up 任务丢失（#45019）
- **Gemini CLI**：shell 命令 "Waiting input" 卡死（#25166，P1）、通用代理挂起（#21409，P1）
- **OpenCode**：会话中断后排队消息处理（#5333，全场最高讨论）
- **Hermes**：Cron 无法上报子任务失败（#112426）、0 字符空桩继续运行（#112419）

核心诉求：**失败必须诚实上报，调度必须可观测**，而非"静默成功"或无限挂起。

### 3.2 Windows/平台稳定性（4 个工具）
- **Claude Code**：文件锁无法重启（#42776，189 评论）、KB5124008 破坏 Plan9（#92984）、控制台闪烁（#70200）
- **OpenAI Codex**：EFS 加密导致插件全灭（#25220）、沙箱 helper 失败（#45153）、WSL2 路径迁移失败（#42984），占今日更新约 1/3
- **DeepSeek Reasonix**：bash 工具回归（#10292）、Wayland/EGL 崩溃（#10369）、Linux 便携包不可用（#10371）
- **OpenCode**：Windows 桌面端大粘贴挂起（#49238）

Windows 已成 AI CLI 工具的"百慕大三角"，但各工具投入修复的意愿和速度差异显著。

### 3.3 会话数据安全与可恢复性（4 个工具）
- **Claude Code**：系统级指令注入每个工具结果且无法关闭（#93683）
- **OpenAI Codex**：多智能体会话膨胀至 110 GiB（#34268）、删除会话残留（#41399）
- **DeepSeek Reasonix**：会话消息消失/分身（#10339）、迁移后不可见（#10357）、新会话退出即清空（#10345）——数据丢失类 issue 最密集
- **Hermes**：桌面端状态点不准确（#86565）
- **OpenCode**：压缩摘要指令注入（#36682，SECURITY）

### 3.4 用量透明与模型信息准确（3 个工具）
- **OpenAI Codex**：10+ 个 Analytics PR 集中合入（账户摘要、Top Chats、计划用量历史），可自定义状态行（#17827，182 👍）
- **Claude Code**：子代理模型标签显示父模型（#93046）、Fable 模型别名需求（#66903，57 👍）
- **OpenAI Codex**：GPT-6 Astra 额度消耗异常（#43201）

### 3.5 安全边界不可绕过（4 个工具）
- **Hermes**：`config set` 绕过审批层（#59293）、heredoc 管道绕过 self_repo_guard（#112441）
- **OpenCode**：压缩摘要注入（#36682）、/security-review 需求（#41913）
- **Gemini CLI**：Auto Memory 脱敏缺陷（#26525）、策略目录权限（#29333）
- **OpenAI Codex**：插件安装权限收口到根线程（#45806）

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|----------|
| **Claude Code** | 企业级治理（LLM 网关请求头、OIDC 服务账号）、模型别名、Agent 生态 | 企业团队、Anthropic 生态重度用户 | Node.js CLI + 桌面端，强调与 Claude 模型深度绑定 |
| **OpenAI Codex** | 用量可视化（/usage、/analytics）、TUI 可配置性、Windows 沙箱加固 | 开发者个人 + 企业，偏技术敏感型用户 | Rust 重写，高频预发布迭代（一天 4 个 alpha），Analytics 面板体系化 |
| **Gemini CLI** | 子代理编排、浏览器自动化、Auto Memory 记忆系统、MCP OAuth 合规 | Google 生态开发者、Linux 用户 | TypeScript + P1/P2 issue 管理体系，安全机制从"提示"走向"强制" |
| **DeepSeek Reasonix** | 桌面端（Electron）深度集成、CLI 交互效率（vi 模式）、国产 OS 适配 | 中国开发者、桌面端重度用户 | Studio 桌面 + CLI 双端，v2.16.0 主打"界面与内核一致性" |
| **OpenCode** | 多 Provider 兼容层（OpenAI 兼容）、插件系统、V2 编辑器 | Provider 多元化用户、自托管爱好者 | TypeScript，薄适配层策略，快速跟进社区反馈 |
| **Hermes** | 安全审批链路、多平台网关（Slack/Telegram/Dashboard）、Cron/Kanban 自动化 | 自动化重度用户、安全敏感团队 | Python，强调"不可旁路的安全机制"与诚实失败传播 |
| **Deepseek Harness** | Headless/CI 自动化、Web 终端、MCP 资源组合 | 脚本化/管道用户 | 轻量级，小而美路线，社区活跃度低但功能实用 |

## 5. 社区热度与成熟度

**第一梯队：OpenAI Codex** — 活跃度断层领先。24 小时 50 条 PR 合入、43 条 Issue 更新，182 👍 的 TUI 状态行需求霸榜。官方正以"每天推进一个子系统"的节奏重构用量分析体系，处于高频迭代期，但高频发布也带来稳定性隐忧。

**第二梯队：Claude Code / Gemini CLI** — Claude Code 用户基数最大（单 issue 189 评论），Windows 问题长期悬而未决导致社区不满情绪积聚；PR 产出仅 1 条，迭代节奏偏慢。Gemini CLI 的 P1/P2 机制让关键问题（子代理误报、shell 卡死）有明确优先级，v0.60.0 稳定版释放，处于稳定性修复的攻坚期。

**第三梯队：DeepSeek Reasonix / Hermes / OpenCode** — Reasonix 社区正被 v1.38.x 的会话丢失问题消耗信任，但 Studio v2.16.0 功能面广，表现出产品野心。Hermes 社区规模小但安全议题讨论有深度，适合关注安全架构的读者。OpenCode 在 Provider 兼容细节上展现出扎实的工程能力（如 prompt_cache_key allowlist），但 1.18.30 全量崩溃回归暴露了测试缺口。

**Deepseek Harness 处于早期**：0 Issue/0 PR，新版本发布依赖少数贡献者，社区尚未形成规模。

## 6. 值得关注的趋势信号

**信号一：后台任务可靠性是行业级短板，而非个别工具问题。** 五个工具同时出现"任务挂起/静默失败/状态不准确"类反馈。对开发者的启示：AI CLI 工具用于生产自动化（Cron、CI、监控）仍需配套超时看护与人工审批兜底，不宜盲目信任"全自动"。

**信号二：用量透明化正成为企业采纳的前置条件。** OpenAI Codex 已将 Analytics 面板列为核心建设方向（单日 10+ PR），Claude Code 社区也在为模型标签不准确而抗议。成本可视化、模型级额度追踪将成为企业级 AI 开发工具的标配能力。

**信号三：安全边界正在从"提示词引导"升级为"机制强制"。** Hermes 的 config 写入保护、Codex 的插件安装权限收口、Gemini 的策略目录校验——社区用安全 issue 证明：仅靠"请模型不要这样做"远远不够，必须从架构层面锁死绕过路径。第三方开发者接入这些工具时，应优先评估其审批链路的完备性。

**信号四：Windows 平台是当前最大的用户流失风险点。** Claude Code（189 评论）、Codex（EFS 问题）、Reasonix（bash 回归）在 Windows 端集中爆发。若官方长期不修复，用户将转向更稳定的替代品或回退到 WSL/远程开发环境。Windows 开发者选择工具时应将"Windows 一等公民支持"作为关键筛选条件。

**信号五：会话数据可恢复性是信任基石。** Reasonix 的会话丢失、Codex 的 110 GiB 存储膨胀、OpenCode 的压缩注入提醒我们：上下文即资产。在工具尚未提供可靠的会话备份/导出方案前，关键任务建议拆分为短会话执行，并保留外部工作日志。

**信号六：大文本输入正在压垮桌面端渲染链路。** OpenCode 约 165 KB JSON 即可击溃 macOS 渲染进程，Windows 同步复现。随着 AI 工具处理的长上下文越来越多，桌面端输入解析的性能优化（分块、异步、虚拟化）将成为刚需，而不仅是体验优化。

**信号七：模型行为可观测性（子代理标签、失败原因、token 去向）是用户的核心焦虑。** Gemini 的"MAX_TURNS 伪装成功"、Claude Code 的"子代理显示父模型"都是同一类问题——用户无法信任一个"黑箱"执行者。开发者在集成 AI CLI 工具时，应优先选择执行轨迹清晰、失败原因可追溯的产品。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：github.com/anthropics/skills | 数据截止：2026-09-16

---

## 1. 热门 Skills 排行（按评论数 TOP 8）

> 注：排行榜内 PR 全部为 **Open** 状态；`评论数` 字段在数据源中未披露具体数值，以下排序以仓库排序为准。

**① skill-creator 触发评估修复 — #1298** ⭐ 热度最高
- 功能：重构 skill-creator 的触发评估逻辑，隔离 per-worker 命令探测竞争、修复 Windows 下 `select()` 管道失败、防止无关工具中断扫描，并避免运行时错误被误判为"非触发"导致负样本错误通过。
- 社区热点：围绕 skill-creator 评估失真的最高热度讨论（同主题见 #1769、#539、Issue #556/#1390）。
- 状态：Open
- https://github.com/anthropics/skills/pull/1298

**② md2video-audio 视频生成技能 — #1703**
- 功能：新增零成本技能，将 Markdown 经 Marp 编译为演示文稿，合成真人感配音并输出专业级 MP4 视频。
- 社区热点：AI 内容生产的"最后一跳"——文档直出视频，兼顾效率与表达力。
- 状态：Open（09-15 仍有更新，活跃）
- https://github.com/anthropics/skills/pull/1703

**③ mcp-builder 兼容性修复 — #1742**
- 功能：适配 `mcp>=2.0` 的 `streamable_http_client` 重命名，并改用 `create_mcp_http_client` 传递自定义 headers，修复 #1668。
- 社区热点：MCP 协议快速迭代下，官方技能如何跟上版本演进。
- 状态：Open
- https://github.com/anthropics/skills/pull/1742

**④ docx 孤立评论检测 — #1734**
- 功能：新增/改进 DOCX 处理，检测文档中 orphaned comments（孤立评论）。
- 状态：Open
- https://github.com/anthropics/skills/pull/1734

**⑤ document-typography 排版质量技能 — #514**
- 功能：新增技能，专门治理 AI 生成文档的典型排版问题——孤行（1~6 词溢出换行）、寡段（标题滞留页底）、编号错位。
- 社区热点："AI 文档最后一公里"的体验优化，直击所有生成式文档的通病。
- 状态：Open
- https://github.com/anthropics/skills/pull/514

**⑥ scnet-hpc 超算集群运维技能 — #1615**
- 功能：新增技能，基于 SSH + Slurm 工作流操作 SCNet HPC 集群，覆盖分区/内存/模块/加速器配置、作业生成与集群发现。
- 状态：Open
- https://github.com/anthropics/skills/pull/1615

**⑦ pdf 大小写引用修复 — #538**
- 功能：修复 `skills/pdf/SKILL.md` 中 8 处文件引用大小写不一致（`REFERENCE.md`→`reference.md` 等），解决 Linux/macOS 等大小写敏感文件系统上的断链。
- 状态：Open（4 月后未更新，关注度已降温）
- https://github.com/anthropics/skills/pull/538

**⑧ Pyxel 复古游戏开发技能 — #525**
- 功能：新增技能，引导代理用 Python 开发复古游戏，支持确定性 headless 运行、逐帧检查和任务级状态验证。
- 社区热点：从"文档办公"到"创意娱乐"的技能版图拓展。
- 状态：Open（09-15 仍有更新，长期活跃）
- https://github.com/anthropics/skills/pull/525

---

## 2. 社区需求趋势（来自 Issues）

**🔐 安全与信任边界 — 最激烈讨论**（#492，43 评论 👍2）
- 社区技能在 `anthropic/` 命名空间下分发，冒充官方技能，形成信任边界漏洞，用户可能向非官方技能授予过高权限。
- 诉求：官方/社区标识分离、命名空间治理。
- https://github.com/anthropics/skills/issues/492

**🏢 组织级技能共享**（#228，16 评论 👍8）
- 当前需手动下载 `.skill` 文件经 Slack/Teams 传输再逐个上传，社区呼吁直接提供共享技能库或分享链接。
- https://github.com/anthropics/skills/issues/228

**🔧 评估与触发工具可靠性**（#556，12 评论 👍7；#1390，4 评论）
- `run_eval.py` 在 `claude -p` 下对所有查询 0% 触发率；`evaluation.py` 因 `TextContent` 序列化缺陷被吞进伪造的工具错误，导致真实 MCP 服务器评分恒为 0/N。
- 诉求：官方评估管线存在系统性缺陷，亟需修复。
- https://github.com/anthropics/skills/issues/556 | https://github.com/anthropics/skills/issues/1390

**🧠 上下文窗口效率**（#1487，4 评论）
- `claude-api` 技能单次工具调用即注入 ~156k tokens，直接耗尽上下文窗口。
- 诉求：技能内容需按需加载/压缩，而非全量注入。
- https://github.com/anthropics/skills/issues/1487

**🚀 新技能方向提案**
| 方向 | Issue | 说明 | 状态 |
|---|---|---|---|
| compact-memory 紧凑记忆 | #1329 | 符号化记号替代散文式代理状态/长期记忆，节省上下文 | Open |
| agent-governance 代理治理 | #412 | 策略执行、威胁检测、信任评分、审计轨迹 | Closed |
| Reasoning Quality Gate | #1385 | 任务前校准→对抗性审查→交付验证的三门流水线 | Open |

另有两个基础性问题：**#189**（👍9）document-skills 与 example-skills 插件内容完全重复导致技能重复注入；**#29** 对 AWS Bedrock 的支持诉求（4 评论）。

---

## 3. 高潜力待合并 Skills（活跃但未合入）

| Skill | PR | 潜力点评 |
|---|---|---|
| **md2video-audio** | [#1703](https://github.com/anthropics/skills/pull/1703) | 09-15 仍在更新，零成本文档→视频，落地概率高 |
| **Pyxel 复古游戏** | [#525](https://github.com/anthropics/skills/pull/525) | 创建半年仍活跃，含完整验证框架，质量扎实 |
| **ODT 文档处理** | [#486](https://github.com/anthropics/skills/pull/486) | OpenDocument 三件套（创建/填充/转 HTML），补足办公格式覆盖 |
| **Hivemind 多代理编排** | [#1628](https://github.com/anthropics/skills/pull/1628) | 用免费模型承接机械工作、Claude 专职规划/审查的零成本编排，契合成本敏感社区 |
| **buffer-api 排程** | [#1627](https://github.com/anthropics/skills/pull/1627) | Buffer GraphQL 跨代理可移植，覆盖社交媒体运营场景 |
| **document-typography** | [#514](https://github.com/anthropics/skills/pull/514) | 通用性强，所有生成文档皆受用，3 月后停滞 |
| **skill-quality/security-analyzer** | [#83](https://github.com/anthropics/skills/pull/83) | 元技能双件套，与 #492 安全诉求直接呼应 |
| **scnet-hpc** | [#1615](https://github.com/anthropics/skills/pull/1615) | 垂直领域深度技能，适合科研机构 |

---

## 4. Skills 生态洞察

**一句话总结**：社区最集中的诉求是 **Skills 工程化**——从触发评估失灵（#1298/#1769/#556/#1390）、上下文窗口被撑爆（#1487）、到官方命名空间被滥用（#492），本质上都在要求技能生态从"能跑"走向"可测、可信、可控"。

---

# Claude Code 社区动态日报 — 2026-09-16

## 今日速览

- 发布 v2.1.273，为 LLM 网关新增 5 个可选的请求头传递能力（需 `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` 开启）。
- Windows 平台问题集中爆发：#92984（KB5124008 导致 Plan9 共享挂载失败）和 #42776（桌面版进程文件锁无法重启）继续发酵，合计评论超 300 条。
- 后台任务与监控可靠性成为新的关注焦点：定时任务挂起（#94563）、Monitor 持久化被限时 30 分钟（#94553）等回归问题在 2.1.27x 版本中集中出现。

## 版本发布

### v2.1.273
- 新增 `x-claude-code-request-class`、`x-claude-code-agent-type`、`x-claude-code-prev-tool-durations`、`x-claude-code-compaction`、`x-claude-code-context-compacted` 请求头，供 LLM 网关使用；需设置环境变量 `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` 启用。
- 新增一条通知提示（原文截断，具体内容未完整披露）。

### v2.1.272
- Bug 修复与可靠性改进。

## 社区热点 Issues（10 个）

### 1. Windows 桌面版因进程文件锁无法重启
- **#42776** | [链接](https://github.com/anthropics/claude-code/issues/42776)
- 状态：OPEN | 评论：189 | 👍：88
- 创建于 4 月的长期未解决问题，Windows 桌面版因孤立进程持有文件锁导致 Relaunch 失败，至今仍无官方修复，社区关注度极高。

### 2. Windows 更新 KB5124008 导致所有 Plan9 共享挂载失败
- **#92984** | [链接](https://github.com/anthropics/claude-code/issues/92984)
- 状态：OPEN | 评论：117 | 👍：58
- 9 月 9 日提交，更新 KB5124008（26200.9445）后 Cowork (Windows) 所有 Plan9 共享报 `Plan9 mount failed: invalid argument`。卸载该 KB 可恢复，影响面大，评论数三天内破百。

### 3. 系统级指令注入每个工具结果，覆盖用户指令且无法关闭
- **#93683** | [链接](https://github.com/anthropics/claude-code/issues/93683)
- 状态：OPEN | 评论：5 | 👍：0
- 每个工具结果都被追加一条指令（"First privately list what you need next..."），不在任何用户配置中，无关闭选项。涉及信任边界与用户控制权，值得高度关注。

### 4. 请求创建 `fableplan` 模型别名
- **#66903** | [链接](https://github.com/anthropics/claude-code/issues/66903)
- 状态：OPEN | 评论：5 | 👍：57
- 社区对 `opusplan` 别名认可度高，希望为 Fable 模型提供同样的规划别名。57 个 👍 表明新模型适配需求强烈。

### 5. Cowork (macOS) 静默破坏多文件夹项目工作流
- **#92710** | [链接](https://github.com/anthropics/claude-code/issues/92710)
- 状态：OPEN | 评论：4 | 👍：5
- 9 月 6 日起新项目只能绑定单个文件夹，Context 仅接受文档，静默破坏了依赖多文件夹的重度用户工作流，且官方文档未同步更新。

### 6. Windows 下 cmd.exe/bash.exe 子进程导致控制台窗口闪烁
- **#70200** | [链接](https://github.com/anthropics/claude-code/issues/70200)
- 状态：OPEN | 评论：6 | 👍：1
- CLI 生成的子进程未使用 `CREATE_NO_WINDOW` 标志导致控制台闪烁，2.1.186 仍存在，影响 Windows 日常使用体验。

### 7. 用量限制警告显示父模型而非实际子代理模型
- **#93046** | [链接](https://github.com/anthropics/claude-code/issues/93046)
- 状态：OPEN | 评论：4 | 👍：0
- Opus 会话中启动 Fable 子代理，Fable 额度达 75% 时警告却提示 Opus 限额。模型信息展示不准确，易误导用户。

### 8. VS Code 远程开发（Remote-WSL/SSH/Dev Containers）拖拽文件失效
- **#92403** | [链接](https://github.com/anthropics/claude-code/issues/92403)
- 状态：OPEN | 评论：3 | 👍：3
- Drop 处理器只接受 `file://` URI，远程窗口内从 Explorer 拖拽文件到 Claude Code 面板静默无效，影响远程开发核心流程。

### 9. Monitor 工具的 `persistent: true` 被限制为 30 分钟
- **#94553** | [链接](https://github.com/anthropics/claude-code/issues/94553)
- 状态：OPEN | 评论：1 | 👍：0
- 2.1.268 起持久化 Monitor 被硬编码 30 分钟上限，到期仅通知一次。回归问题，影响需要长时间文件监控的自动化场景。

### 10. Windows 定时任务会话无限挂起
- **#94563** | [链接](https://github.com/anthropics/claude-code/issues/94563)
- 状态：OPEN | 评论：1 | 👍：0
- 定时任务每次运行几轮工具调用后永久卡住：`isRunning: true`、`lastActivityAt` 冻结、无错误输出。调度类功能可靠性存疑。

## 重要 PR 进展

> 过去 24 小时内仅 1 条 PR 更新，未达 10 条，如实呈现。

### #94594: 优化 diff mod 的 git 执行时机
- **作者**: @poteat | [链接](https://github.com/anthropics/claude-code/pull/94594)
- 状态：CLOSED
- 该 PR 针对 `mods/diff` 的 `session.start` 钩子：原先会阻塞地执行全量 `git status --porcelain`，由于引擎会等待 `session.start` 完成才发送首条 prompt，在超大仓库中明显拖慢启动。修复后改为仅在内置面板需要时运行 git，避免会话启动期不必要的全仓扫描。

## 功能需求趋势

### 1. 新模型支持与模型信息透明化
- 社区希望为新模型提供与 `opusplan` 对等的快捷别名（#66903，57 👍）
- 多个 issue 反映子代理模型标签显示错误（#93046、#94575），要求 UI 准确呈现实际运行模型

### 2. 定时任务与后台自动化可靠性
- 定时任务挂起（#94563）、会话不注册远程控制（#92306）、Monitor 持久化上限回归（#94553）表明后台任务稳定性是当前社区最敏感的痛点之一

### 3. 多文件夹/工作区支持
- Cowork 从多文件夹退化为单文件夹（#92710）、Worktree 会话在 VS Code 历史中消失（#91780）——多项目工作流管理是重度用户的核心诉求

### 4. LLM 网关与企业级治理
- v2.1.273 新增网关请求头传递，配合此前 OIDC 服务账号需求（#84532），显示 Anthropic 正加速企业部署场景的布局

### 5. 无障碍（A11y）与键盘操作
- Windows 桌面版屏幕阅读器兼容问题集中反馈：斜杠命令菜单静默（#94353）、设置对话框无焦点转移（#94246）、agent view 空格键冲突（#94407）。无障碍虽非高频功能，但反馈集中在 Windows 桌面端

## 开发者关注点

### 1. Windows 平台积重难返
- 文件锁无法重启（#42776）、KB 更新破坏 Plan9（#92984）、控制台闪烁（#70200）、设备桥接损坏（#94266）、MCP 组件渲染过亮（#93369）——Windows 已成为 bug 重灾区，多个 issue 长期未关闭，社区不满情绪显著。

### 2. 模型标签与额度提示误导
- 子代理模型显示父模型（#93046）、后台视图模型标签错误（#94575），影响用户对额度和成本的理解，需要尽快修正。

### 3. 用户指令被系统指令覆盖
- #93683 中系统级指令在每个工具结果中追加且无 opt-out，开发者对"模型行为不受控"的担忧值得 Anthropic 官方明确回应。

### 4. 远程开发体验断裂
- VS Code 远程环境拖拽失效（#92403）、计划任务不注册远程控制（#92306）、Worktree 历史丢失（#91780）——远程开发场景下的集成深度不足。

### 5. 回归质量堪忧
- Monitor 30 分钟上限（#94553）、Cowork 多文件夹静默回退（#92710）均为 2.1.26x/9 月初更新引入的回归。社区对"新版本引入破坏性变更"的容忍度正在下降。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-09-16）

## 今日速览

今日 Codex 仓库节奏密集：24 小时内连续推送 4 个 `rust-v0.155.0-alpha` 预发布版本（alpha.5 → alpha.8），并合入了一批 Analytics 数据面板相关 PR。社区讨论热度集中在 Windows 平台稳定性问题与 TUI 可配置性需求上，其中「可自定义状态行」（#17827）以 182 👍 持续霸榜。此外，官方正在系统性地强化用量可视化能力（10+ 个 Analytics PR 集中合入）。

## 版本发布

过去 24 小时连续发布 4 个 Rust 预发布版本，均未附带详细变更说明，建议关注后续正式 Release Notes。

| 版本 | 链接 |
|------|------|
| rust-v0.155.0-alpha.8 | [查看](https://github.com/openai/codex/releases) |
| rust-v0.155.0-alpha.7 | [查看](https://github.com/openai/codex/releases) |
| rust-v0.155.0-alpha.6 | [查看](https://github.com/openai/codex/releases) |
| rust-v0.155.0-alpha.5 | [查看](https://github.com/openai/codex/releases) |

## 社区热点 Issues

过去 24 小时共 43 条 Issue 更新，以下为最值得关注的 10 条：

### 1. #17827 可自定义状态行（TUI）
- **热度**：182 👍 / 46 评论（当前最高赞 Issue）
- **内容**：对标 Claude Code 的 status line，希望在 TUI 底部自定义显示 token 用量、模型名、速率限制、上下文窗口、git 分支等实时信息
- **链接**：https://github.com/openai/codex/issues/17827

### 2. #25220 Windows 捆绑插件全部不可用（EFS 加密文件）
- **热度**：38 评论
- **内容**：Microsoft Store 安装的 Codex 因 WindowsApps 目录 EFS 加密导致 `copyfile` 失败，Computer Use、Browser、Chrome、LaTeX 等捆绑插件全部无法加载
- **链接**：https://github.com/openai/codex/issues/25220

### 3. #34268 Multi-agent 会话存储膨胀至 110 GiB
- **热度**：16 评论 / 7 👍（已关闭）
- **内容**：Multi-agent V2 全量历史 fork 重复复制压缩快照和内联图片，导致会话数据超过 100 GiB，且增长呈「乘法」效应
- **链接**：https://github.com/openai/codex/issues/34268

### 4. #26338 父工作区支持多个 Git 仓库
- **热度**：36 👍 / 14 评论
- **内容**：请求 Codex App 支持包含多个独立 Git 仓库的父级目录，关联 #15168、#14218
- **链接**：https://github.com/openai/codex/issues/26338

### 5. #34349 允许完全禁用 Pets 功能
- **热度**：57 👍 / 14 评论
- **内容**：用户希望彻底关闭 Pets 并移除侧边栏菜单项，该功能遭到部分用户反感
- **链接**：https://github.com/openai/codex/issues/34349

### 6. #45019 app-server 排队 follow-up 任务丢失
- **热度**：39 👍 / 9 评论
- **内容**：排队中的后续请求在 app-server 侧凭空消失，用户无法追溯或重试
- **链接**：https://github.com/openai/codex/issues/45019

### 7. #43201 GPT-6 Astra 使用额度消耗异常
- **热度**：16 👍 / 8 评论
- **内容**：Plus 用户反馈 GPT-6 Astra 的 usage limit 消耗过快，会话时长显著缩短
- **链接**：https://github.com/openai/codex/issues/43201

### 8. #6049 MCP-only 执行模式：禁用内置工具
- **热度**：46 👍 / 4 评论（2025 年提出，长期未解决）
- **内容**：请求在 `codex exec` 无人值守场景下限制 agent 仅使用 MCP 工具，增强安全管控
- **链接**：https://github.com/openai/codex/issues/6049

### 9. #41522 TUI 内联 diff 预览行数可配置
- **热度**：32 👍 / 5 评论（已关闭）
- **内容**：请求新增 `diff_preview_max_rows` 配置项，支持 0 表示不限制
- **链接**：https://github.com/openai/codex/issues/41522

### 10. #39260 信用使用账本自 8 月 8 日起冻结
- **热度**：6 评论
- **内容**：Codex 设置中的 Credit Usage Log 停止记录，85.4% 额度已消耗但 0 条新纪录
- **链接**：https://github.com/openai/codex/issues/39260

## 重要 PR 进展

过去 24 小时共 50 条 PR 更新，以下 10 条均由自动化机器人 copyberry[bot] 提交并已完成合入：

### 1. #45809 退休「人格」特性标志
- 接受并忽略 `features.personality` 配置，移除 `personality = "none"` 的特性门控及 `# Personality` 段落剥离逻辑
- **链接**：https://github.com/openai/codex/pull/45809

### 2. #45806 插件安装请求限制到根线程
- 非根代理调用 `request_plugin_install` 时直接返回错误，阻止子代理在解析参数前发起安装，收窄安全边界
- **链接**：https://github.com/openai/codex/pull/45806

### 3. #45805 保留 MCP App UI 元数据
- 在 tool-call 事件和历史中新增 `mcpAppUi` 字段，客户端无需等待完整 MCP 目录即可渲染 widget，并支持历史回放
- **链接**：https://github.com/openai/codex/pull/45805

### 4. #45799 完成 Windows 沙箱卸载清理
- 补齐包卸载后的沙箱用户配置和用户数据清理，同时区分更新/重装场景避免误删
- **链接**：https://github.com/openai/codex/pull/45799

### 5. #45794 支持按 fileId 引用图像
- 图像输入与工具输出新增 `fileId` 形式，转发至 Responses API 为 `file_id`，并更新生成的 schema 与客户端类型
- **链接**：https://github.com/openai/codex/pull/45794

### 6. #45789 检查点迁移时保留 Guardian 证据
- 旧模型产生的检查点可能与 Guardian 审核器不兼容，PR 确保在压缩/重启期间保留用户限制条件和已验证答案
- **链接**：https://github.com/openai/codex/pull/45789

### 7. #45780 守护进程更新可恢复固定包
- `codex app-server daemon update` 现在支持将 pinned/local 安装包恢复到最新稳定版（此前需 latest 频道）
- **链接**：https://github.com/openai/codex/pull/45780

### 8. #45779 使用原生进程身份管理 PID 守护进程
- 改用 native process identity 替代 `ps` 文本识别，避免 locale/时区/系统时钟变化导致守护进程 PID 被误判为 stale
- **链接**：https://github.com/openai/codex/pull/45779

### 9. #45769 Analytics 新增账户 Summary 标签页
- 作为默认初始标签页，展示身份信息、token 总量、连续使用天数、活动洞察、常用插件和技能；日/周/累计图表统一迁移
- **链接**：https://github.com/openai/codex/pull/45769

### 10. #45768 新增 Top Chats 使用分析
- 展示过去 30 天内最多 100 个会话的额度使用和余额扣减，支持按模型/推理力度/速度展开，排除归档会话与子代理
- **链接**：https://github.com/openai/codex/pull/45768

> 补充：同批合入的 #45763-#45772 还包含堆叠图表原语、`/usage` 仪表板入口、计划用量历史（`analytics_plan_history`，默认关闭）等，官方正在系统性地重构用量可视化体系。

## 功能需求趋势

综合全部 Issues/PR，社区关注方向如下：

1. **TUI 可配置性持续升温**：状态行自定义（#17827）、diff 预览限制（#41522）都表明用户对终端 UI 定制诉求越来越强
2. **用量分析与仪表板是官方当前建设重点**：10+ 个 Analytics PR 覆盖账户摘要、Top Chats、计划用量历史、堆叠图，`/usage` 与 `/analytics` 正在成为核心管控入口
3. **Windows/WSL 稳定性成为最大痛点**：沙箱 helper 失败（#45153）、EFS copyfile 错误（#25220、#32589）、WSL2 路径迁移失败（#42984）、写操作挂起（#45603）——Windows 相关 Issue 占今日新增/更新量的近三分之一
4. **会话存储管理需求迫切**：110 GiB 膨胀（#34268）与存储仪表盘请求（#38838）并存，用户需要官方提供统一的备份、清理和可视化机制
5. **MCP 生态从「能用」走向「好用」**：MCP-only 执行模式（#6049）、认证刷新（#13852）、UI 元数据保留（#45805）说明 MCP 集成正在深入核心工作流

## 开发者关注点

- **Windows 问题集中爆发**：EFS 加密文件导致捆绑插件不可用、沙箱 lock 失败、升级后历史项目消失（#39121）、第二条消息无法发送（#45797）——社区已出现多组同类 Issue，建议官方优先排查 Windows 安装/沙箱链路
- **审批流程存在死循环**：`Approve for me` 模式下用户的直接同意被反复判为不可信（#45604），与 #42951、#37930 互相关联，阻塞自动化工作流
- **模型行为质量反馈**：GPT-5.6 Sol 被指前端/设计任务质量明显退化（#45801）；GPT-6 Astra 额度消耗过快（#43201），用户对模型表现和计费机制均有疑虑
- **会话数据可靠性堪忧**：多智能体存储膨胀（#34268）、删除会话残留（#41399）、项目状态丢失/文件混用（#45795）等问题表明本地会话管理机制仍不够稳健
- **后台基础设施正在加固**：守护进程 PID 识别改用原生身份（#45779）、恢复快照记录中断回合（#45807）、插件安装权限收口（#45806），官方在系统性地提升自动化可靠性

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-16

## 今日速览

今日发布 v0.60.0 稳定版，主要修复了 Web 抓取工具的目标校验与 MCP OAuth 流程的安全认证问题。社区讨论热度集中在子代理稳定性上：MAX_TURNS 被误报为成功、通用代理挂起等问题引发大量开发者共鸣。此外，多项 P1 级 PR 正在推进 OAuth 凭据保留、UI 崩溃防护等核心修复。

## 版本发布

- **v0.60.0（稳定版）**
  - 修复 Web 抓取工具的目标校验与连接路由（@diegogodinezr, [#29120](https://github.com/google-gemini/gemini-cli/pull/29120)）
  - 在 MCP OAuth 流程中强制执行 RFC 9207 签发者识别（@jvargassanchez-dot）
  - 链接: https://github.com/google-gemini/gemini-cli/releases
- **v0.61.0-preview.0（预览版）**
  - 包含 v0.60.0-preview.0 更新日志及版本号提升
  - 链接: https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-preview.0
- **v0.61.0-nightly.20260915.g9c1b0a610（夜间版）**
  - 常规夜间构建，与前一夜间版无显著变更
  - 链接: https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260915.g9c1b0a610

## 社区热点 Issues

1. **子代理 MAX_TURNS 被误报为 GOAL 成功**（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)，P1/Bug，13 评论）
   `codebase_investigator` 子代理已触发最大轮次限制，却仍报告 `status: "success"` 和 `Termination Reason: "GOAL"`，真实的中断原因被掩盖。这是今日评论数最高的 Issue，直接影响代理执行结果的可信度。

2. **通用代理无限期挂起**（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)，P1/Bug，8👍，8 评论）
   委托通用代理执行简单操作（如创建文件夹）时无限挂起，有用户等待 1 小时仍无响应。热度高、影响面大，是当前最严重的稳定性问题之一。

3. **Shell 命令执行后卡在 "Waiting input"**（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)，P1/Bug，3👍，4 评论）
   简单 CLI 命令已完成，界面却仍显示命令活动并等待输入，必须手动打断。高频出现，严重干扰自动化流程。

4. **零依赖 OS 沙箱以发挥模型 bash 亲和力**（[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)，P2/增强，9 评论）
   提出利用 Gemini 3 模型对 POSIX 工具的原生熟练度，通过零依赖 OS 沙箱隔离 + 执行后意图路由，在安全前提下最大化代码探索与编辑效率，社区讨论活跃。

5. **AST 感知的文件读取与代码库映射评估**（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)，P2/Epic，7 评论）
   大型 EPIC，跟踪 AST 感知工具的系列调研：更精确地读取方法边界、减少 token 噪声、优化代码库导航，方向获得较多关注。

6. **浏览器子代理在 Wayland 下失败**（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)，P1/Bug，4 评论）
   `browser_agent` 在 Wayland 环境运行后以 "GOAL" 终止但实际失败，影响 Linux 桌面用户的浏览器自动化体验。

7. **Browser Agent 忽略 settings.json 覆盖配置**（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)，P2/Bug，3 评论）
   Browser Agent 完全忽略全局/项目级 `settings.json` 中的 `maxTurns` 等配置覆盖，注册表已正确读取但实际执行未生效，属典型"配置失效"类问题。

8. **Auto Memory 需要确定性脱敏并减少日志**（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)，P2/安全，5 评论）
   后台提取模型的提示词仅"事后"要求脱敏，转录内容在进入上下文前未做确定性过滤；服务日志还可能记录已有技能内容，存在敏感信息泄露风险。

9. **工具数量超限触发 400 错误**（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)，P2/Bug，3 评论）
   可用工具超过 400 个（标题提及 128，正文为 400）时报 400 错误，开发者期待代理能按需智能裁剪工具作用域，而非全量传递。

10. **代理应阻止破坏性行为**（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)，P2/Bug，3 评论）
    处理复杂 git 操作、分支管理、数据库维护时，模型偶尔使用 `git reset` 或 `--force`，社区呼吁在存在更安全替代方案时主动阻止并给出警告。

## 重要 PR 进展

1. **保留 OAuth refresh token 并幂等化凭据删除**（[#29339](https://github.com/google-gemini/gemini-cli/pull/29339)，P1/core）
   修复 Google OAuth 凭据在令牌刷新时丢失 `refresh_token`、导致用户陷入"重新认证死循环"的问题（对应 GH-21691）。

2. **MCP 工具调用标题格式化为结构化签名**（[#29341](https://github.com/google-gemini/gemini-cli/pull/29341)，P1/non-interactive，已合并）
   统一 ACP 载荷与核心工具接口中 MCP/已发现工具的调用表示，将原始命令提取为结构化签名并区分说明文本，改善非交互式场景的可读性。

3. **确保 AgentLoopContext 属性在对象展开中保留**（[#29335](https://github.com/google-gemini/gemini-cli/pull/29335)，P1/core，已合并）
   Config 类此前用原型 getter 实现接口属性，展开时会丢失；改为实例属性后，`config`、`toolRegistry`、`sandboxManager` 等上下文完整保留。

4. **边框渲染防护负布局尺寸**（[#29347](https://github.com/google-gemini/gemini-cli/pull/29347)，P1/UI）
   为 `renderBorder` 等字符串重复逻辑增加负数钳制，修复 `RangeError: Invalid count value: -1` 崩溃，覆盖 ToolConfirmationMessage、DiffRenderer 等多个 UI 组件。

5. **抑制请求取消时的未捕获 AbortError**（[#29343](https://github.com/google-gemini/gemini-cli/pull/29343)）
   修复 Node 23+ 下用户取消/中止活动流时，`node-fetch` 事件监听器中同步抛出的 `AbortError` 冒泡导致硬崩溃的问题。

6. **改进 PTY 文件描述符清理与执行生命周期**（[#29340](https://github.com/google-gemini/gemini-cli/pull/29340)）
   完善 POSIX 平台下 `ShellExecutionService` 与 `ExecutionLifecycleService` 的 fd/流生命周期管理，确保 PTY 会话与后台 shell 结束时资源完全释放，直指 "Waiting input" 类卡死问题。

7. **避免嵌套输入历史状态更新**（[#29342](https://github.com/google-gemini/gemini-cli/pull/29342)，P2/core）
   重构 `useInputHistoryStore`，消除添加历史时的嵌套 React 状态更新，规避 StrictMode 双重调用问题，同时保留原有排序与去重行为（Closes #29313）。

8. **审查策略目录的权限可信度**（[#29333](https://github.com/google-gemini/gemini-cli/pull/29333)，P2/enterprise）
   `filterSecurePolicyDirectories` 只校验系统策略目录，用户/工作区目录因"约定"被读取却未做权限检查，该 PR 补齐了信任边界验证。

9. **修复 401 子串误判为认证错误**（[#29242](https://github.com/google-gemini/gemini-cli/pull/29242)，P2/core）
   `isAuthenticationError` 回退至 `message.includes('401')`，把端口号（如 4012）、ID 等含 "401" 的错误误报为认证失败，可能触发虚假的重登/登出流程。

10. **截断时避免切分 UTF-16 代理对**（[#29304](https://github.com/google-gemini/gemini-cli/pull/29304)，core）
    修复 `sanitizeForDisplay` 在截断边界落入 emoji 等代理对时产生未配对代理项、导致字符静默丢失的渲染问题。

## 功能需求趋势

- **Agent 稳定性与可观测性**：子代理失败误报（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)）、挂起（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）、shell 卡死（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)）——社区强烈呼吁真实的错误上报与执行状态可视化，而非"伪装成功"。
- **安全从"提示"走向"机制"**：零依赖 OS 沙箱（[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)）、策略目录权限审查（[#29333](https://github.com/google-gemini/gemini-cli/pull/29333)）、阻止破坏性命令（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）、Auto Memory 确定性脱敏（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)），安全诉求从提示词引导升级为强制机制。
- **浏览器代理走向生产可用**：Wayland 兼容（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)）、settings.json 覆盖生效（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）、会话接管与锁恢复（[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)），浏览器代理正经历从实验性到稳定性的过渡。
- **上下文与 token 效率**：AST 感知读取（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)）、工具超限 400 错误（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)）、持久化任务追踪替代 WriteToDo（[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)）——长会话场景下"精准读取、少耗 token"成为核心诉求。
- **Auto Memory 质量打磨**：低信号会话无限重试（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)）、无效补丁静默跳过（[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）与整体质量改进（[#26516](https://github.com/google-gemini/gemini-cli/issues/26516)），记忆系统进入密集的可靠性修复期。

## 开发者关注点

- **子代理行为不透明**：轨迹难以查看（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）、bug 报告不含子代理内部上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）、失败原因被错误归类——"不知道代理内部发生了什么"是最高频的抱怨。
- **执行卡死与资源泄漏**：shell 命令 "Waiting input" 卡死（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)）与 PTY fd 清理（[#29340](https://github.com/google-gemini/gemini-cli/pull/29340)）相互印证，自动化脚本与长时任务对 shell 生命周期管理要求极高。
- **认证链路小 bug 引发大中断**：OAuth refresh token 丢失导致重复登录循环（[#29339](https://github.com/google-gemini/gemini-cli/pull/29339)）、401 子串误判触发虚假登出（[#29242](https://github.com/google-gemini/gemini-cli/pull/29242)），认证路径的细微信号问题会直接打断工作流。
- **自定义扩展未被有效利用**：模型几乎不会自发使用自定义 skills 和子代理（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)）；symlink 代理文件不被识别（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)）进一步降低扩展可用性。
- **Auto Memory 的隐私与打扰**：转录内容先入模型上下文再脱敏（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)）、低价值会话反复重试（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)），开发者希望记忆功能"更安静、更安全、更可控"。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-16

数据来源：[github.com/esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

## 1. 今日速览

今日 Studio v2.16.0 正式发布，主打**界面状态与内核事实的一致性**，并补齐工作台多项实用能力；但社区焦点集中在桌面端 v1.38.x 的稳定性——会话丢失、"commit authority" 错误与渲染崩溃呈集中爆发态势。Linux 桌面端（尤其 aarch64/国产 OS）的构建兼容与启动问题成为另一显著议题。

## 2. 版本发布

### [Reasonix Studio v2.16.0](https://github.com/esengine/DeepSeek-Reasonix/releases)

本版核心目标是**让屏幕上写的与内核实际发生的完全一致**：
- 任务面板直接读取内核发布的清单，不再从转录中猜测回推
- 被拒的工具调用附带主机身份信息，而非一句话；卡片名精确对应内核真实运行的能力，能力清单在调用发生前就声明所需参数
- 工作台新增四项能力：会话内查找、代码块高亮、消息改写重发、能力名直达卡片
- 回合流程新增一个出口：可将待办清单交回用户决策，而非被主机强制推进
- 界面侧完成一轮以实际效果为准的整理：阅读尺寸、栏宽、等宽面、汉字小型大写、灰度层级、卡片高度成本等；同时移除了三个早已失效的入口
- 自 2.15.0 起累计 43 个提交

**升级路径**：无需人工干预，三平台照常自更新（Linux / Windows / macOS）。

## 3. 社区热点 Issues

挑选 10 个最值得关注的 Issue：

1. **[#10186 [Bug]: v1.38.7 渲染层崩溃（Maximum update depth exceeded）](https://github.com/esengine/DeepSeek-Reasonix/issues/10186)** — React 无限 setState 循环导致渲染崩溃，长会话下流式输出停摆。评论 11 条，是目前讨论最热烈的 issue，影响桌面端核心体验。

2. **[#10339 [Bug]: 会话消息消失、列表分身与“打地鼠”式跳转](https://github.com/esengine/DeepSeek-Reasonix/issues/10339)** — 会话找不到、列表出现多个相同副本、点击后互相跳转。评论 8 条，用户反馈情绪激烈，属于典型的 UI 状态异常类问题。

3. **[#10376 [Bug]: 更新 v1.38.9 后加载历史会话失败，应用完全崩溃](https://github.com/esengine/DeepSeek-Reasonix/issues/10376)** — Windows 11 用户升级到最新版后直接无法使用，评论 4 条。用户对新版本的升级体验非常不满。

4. **[#10292 [Bug]: Windows 下 bash 工具完全不可用，sandbox 配置失效](https://github.com/esengine/DeepSeek-Reasonix/issues/10292)** — 1.38.8 中 `[sandbox] bash = "off"` 配置不生效，退出码 0xc0000142 导致工具调用全部失败。属于 1.38.7 正常、1.38.8 回归的严重问题，评论 4 条。

5. **[#10357 [Bug]: 重启后 sessions-v4 原生会话不可见，数据仍保留但 UI 无法访问](https://github.com/esengine/DeepSeek-Reasonix/issues/10357)** — 迁移至新存储格式的会话在重启后从 UI 消失，795 条事件日志仍在磁盘却无入口打开。涉及数据可用性，用户信任损失极大。

6. **[#10345 [Bug]: 新建对话无法存档，退出即清空](https://github.com/esengine/DeepSeek-Reasonix/issues/10345)** — Windows 11 用户新建的会话无法被识别为对话记录，切换会话后内容立刻丢失。属数据丢失类严重问题。

7. **[#10322 [Bug]: 旧会话迁移后 writer 所有权异常，报 “session activity no longer owns commit authority”](https://github.com/esengine/DeepSeek-Reasonix/issues/10322)** — macOS 用户提交问题后卡死或报错，无法继续对话。该错误在 v1.38.8 中大面积出现，另有 #10347、#10350 等多条类似反馈。

8. **[#10371 [Bug]: Linux 便携版 tarball 解压后无法启动，误判为旧版安装](https://github.com/esengine/DeepSeek-Reasonix/issues/10371)** — 官方 Linux arm64 包解压后 launcher 直接退出，提示缺少 `reasonix-cli`，安装包本身即不可用。

9. **[#10369 [Bug]: Wayland 会话下 Electron EGL 初始化失败，应用无法启动](https://github.com/esengine/DeepSeek-Reasonix/issues/10369)** — 麒麟 V10 SP1 / aarch64 环境下 GPU 初始化失败后不降级到 X11，直接退出。国产 Linux 桌面用户受影响明显。

10. **[#7145 [Feature]: Linux arm64 桌面版构建（银河麒麟 / UOS）](https://github.com/esengine/DeepSeek-Reasonix/issues/7145)** — 长期开放的需求，CLI 已支持但桌面版迟迟未跟进。近期 Linux 相关 bug 集中出现后，此需求再次被社区提及。

## 4. 重要 PR 进展

挑选 10 个重要 PR：

1. **[#10385 统一会话恢复与完成机制（Follow v2）](https://github.com/esengine/DeepSeek-Reasonix/pull/10385)** — 修复已完成/取消/重连会话丢失可见文本、运行状态过期、历史/运行时/事件账本数据不一致等问题，直击当前会话丢失痛点。

2. **[#10378 修复会话、聊天界面与终端执行](https://github.com/esengine/DeepSeek-Reasonix/pull/10378)** — 会话存储迁移后历史无法安全重开，会话导航可能保留错误工作区、中断活动任务或残留旧转录；本 PR 修复了侧边栏丢失等系列回归。

3. **[#10380 恢复 ProjectTree 并整合会话恢复修复](https://github.com/esengine/DeepSeek-Reasonix/pull/10380)** — 恢复项目树侧边栏，移除创建布局，并整合 #10378 中会话、历史、聊天显示与终端的修复。

4. **[#10383 暂停与恢复改为追加式终结](https://github.com/esengine/DeepSeek-Reasonix/pull/10383)** — 修复停止 turn 后打开历史/新会话导致持久化历史不可读的问题，改用追加式事件，避免 SQLite 主键冲突。

5. **[#10382 修复后台对话 Ask 与审批通知](https://github.com/esengine/DeepSeek-Reasonix/pull/10382)** — 在编辑会话 B 时，会话 A 提问会播放提示音并显示后台通知，不强制切换标签，也不重复打扰。

6. **[#10297 尊重 `[sandbox].bash="off"` 配置，关闭时跳过 bwrap 探测](https://github.com/esengine/DeepSeek-Reasonix/pull/10297)** — 直接对应 #10292 issue，修复配置无效导致 bash 工具不可用的问题。

7. **[#10084 修复 DeepSeek thinking 模式重复 400 错误](https://github.com/esengine/DeepSeek-Reasonix/pull/10084)** — 在普通文本轮次中同样回传 `reasoning_content`，修复 “The reasoning_content in the thinking mode must be passed back” 的反复报错。

8. **[#10367 CLI 新增 vi 命令模式](https://github.com/esengine/DeepSeek-Reasonix/pull/10367)** — 通过 `ui.commandmode = "vi"` 开启，Esc 进入命令模式而非中断运行中的 turn，`Ctrl+C` 保留已输入内容至历史。

9. **[#10344 每供应商独立配置 `stream_idle_timeout_seconds`](https://github.com/esengine/DeepSeek-Reasonix/pull/10344)** — 允许按 provider 设置流式超时上限，未设置时保留默认 300s，为不同服务商提供差异化稳定性配置。

10. **[#10368 强制 git 子进程使用 `rebase.abbreviateCommands=false`](https://github.com/esengine/DeepSeek-Reasonix/pull/10368)** — 避免用户 `~/.gitconfig` 中开启缩写命令后，agent 改写 interactive-rebase todo 时匹配失败。

## 5. 功能需求趋势

- **Linux 桌面端完整支持**：社区对 aarch64 / 麒麟 / UOS 的构建需求持续存在（#7145），且近期出现 CGO_ENABLED=0 构建建议（#10372）、Wayland/EGL 崩溃（#10369）和便携版安装包不可用（#10371）等连串问题，说明 Linux 桌面端已从“能不能跑”进入“要能启动、要能装”的阶段。
- **会话数据安全与可恢复性**：多个 issue 指向 sessions-v4 迁移后数据不可见、新会话不自动命名、退出即清空等数据丢失场景。社区对“对话记录不能丢”的需求极为刚性。
- **配置精细化与用户自主权**：`[sandbox].bash="off"` 不生效、git 行为被全局配置干扰、stream 超时不可按 provider 定制等，反映出用户希望工具尊重本地配置、每个环节都可控。
- **CLI 交互效率**：YOLO 模式数字键直选（#9491）、vi 命令模式（#10367）、半页/单行滚动（#9417）、diff 围栏彩色渲染（#10251）等 PR 集中出现，TUI 用户对“少敲一次回车、少移一次光标”的诉求强烈。
- **DeepSeek 提供商兼容性**：thinking 模式 `reasoning_content` 回传问题是 DeepSeek 用户的高频痛点（#10084），社区期待对官方 API 语义的完整适配。

## 6. 开发者关注点

- **会话丢失/不可恢复是最高频痛点**：#10345、#10357、#10362、#10331 等多条 issue 描述不同场景下会话无法存档、重启后消失或被覆盖，已严重影响用户对工具的基本信任。
- **"session activity no longer owns commit authority" 错误阻塞对话**：在 #10322、#10347、#10350 中反复出现，涉及旧会话迁移后 writer 所有权异常，Agent 调用 `ask` 工具后用户选择无法被采纳。
- **v1.38.8 是重灾区**：bash/sandbox 回归（#10292）、空白输出需多次重启（#10294）、新建会话无法识别（#10345）、数据迁移后不可见（#10357）等均指向该版本，且 v1.38.9 仍未完全修复（#10376）。
- **Linux 桌面端安装即崩溃**：官方 tarball 无法启动（#10371）、Wayland 下 EGL 初始化失败（#10369）、GPU 初始化失败直接段错误且无降级（#10370），让 Linux 用户“连窗口都看不到”。

*本日报由 AI 根据 GitHub 公开数据自动整理，仅供参考，请以实际仓库状态为准。*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报（2026-09-16）

## 今日速览

过去 24 小时无新版本 Release，但社区讨论与 PR 合入十分活跃。**最受关注的是 1.18.30 的严重回归（所有 prompt 崩溃）和 Z.AI 的 PDF 附件兼容问题**，二者分别反映了基础稳定性与 Provider 适配的痛点；同时 macOS/Windows 桌面端均出现大文本粘贴导致的渲染进程崩溃/挂起，安全相关（压缩摘要指令注入）讨论也在升温。PR 侧有多项针对性修复（OAuth resource、prompt cache key、配额分类）已提交或合入。

## 社区热点 Issues（10 条）

### 1. Regression in 1.18.30: every prompt crashes with TypeError in SystemPrompt.environment — 1.18.18 works fine
- **作者**: @Syntaxri | 👍 15 | 评论 9 | 状态: OPEN
- **重要性**: 影响面最大的回归问题。升级 1.18.30 后，全新会话第一条消息即报 `TypeError in SystemPrompt.environment ("a.name")`，用户必须回退到 1.18.18。15 个 👍 表明大量用户受困。
- **链接**: https://github.com/anomalyco/opencode/issues/48645

### 2. [SECURITY] Compaction summary injects actionable instructions — model executes without user consent
- **作者**: @rustysixslinger | 👍 1 | 评论 5 | 状态: OPEN
- **重要性**: 安全相关。长会话自动压缩时，摘要中的 "Next Move" 行动方案被模型当作系统指令执行，构成指令注入向量。需要将压缩摘要明确标记为“不可执行上下文”。
- **链接**: https://github.com/anomalyco/opencode/issues/36682

### 3. [FEATURE] Graceful handling of queued messages after session interrupt
- **作者**: @thoughtlesslabs | 👍 3 | 评论 13（全场最高）| 状态: CLOSED
- **重要性**: 讨论热度最高。当会话中断后，用户此前排队发送的消息应如何优雅处理（丢弃/重发/标记失败）。13 条评论说明社区对会话恢复体验有较高期待。
- **链接**: https://github.com/anomalyco/opencode/issues/5333

### 4. zai: PDF attachments always fail with 400 [1210] — opencode sends `file_data`, Z.AI accepts PDF only via `file_url`/`file_id`
- **作者**: @jlinazasoro | 评论 2 | 状态: OPEN
- **重要性**: 精准定位了 Z.AI PDF 失败根因：OpenCode 将 PDF 映射为 OpenAI 兼容的 `file.file_data`（base64 data-URI），而 Z.AI `/paas/v4/chat/completions` 只接受 `file_url`/`file_id`。这是 OpenAI 兼容层适配差异的典型案例。
- **链接**: https://github.com/anomalyco/opencode/issues/49237

### 5. pdf not readable by Z.AI/GLM 5.3 Flash through OpenCode
- **作者**: @JeffPsymot | 评论 3 | 状态: OPEN
- **重要性**: 与 #49237 同源问题。同一 PDF 在 GLM 5.3 Flash Web 端可用，但通过 OpenCode 1.18.30 报 "Failed to parse the file"，PNG 图片则正常。说明 PDF 传输层适配在多 Provider 间存在系统性缺陷。
- **链接**: https://github.com/anomalyco/opencode/issues/49028

### 6. Desktop (macOS): renderer V8 OOM crash loop when pasting large JSON into composer
- **作者**: @praxstack | 评论 2 | 状态: OPEN
- **重要性**: 粘贴约 165 KB 的 session-export JSON 即触发 Electron renderer V8 堆 OOM 崩溃。Desktop 端大文本输入稳定性问题首次被明确归类为渲染进程崩溃，且与 V2 的 `parsePromptInputV2Editor` 直接相关。
- **链接**: https://github.com/anomalyco/opencode/issues/43935

### 7. Windows Desktop renderer hangs on large paste in PromptInputV2
- **作者**: @Pilotx1992 | 评论 1 | 状态: OPEN
- **重要性**: 与 #43935 跨平台呼应。Windows 下粘贴大型技术 prompt/审计报告同样导致 UI 完全无响应——后端 Agent 存活但渲染进程挂死。V2 编辑器的大输入处理是共性瓶颈。
- **链接**: https://github.com/anomalyco/opencode/issues/49238

### 8. providers: nvidia rejects unsupported `prompt_cache_key` sent by V2 (OpenAI-compatible runtime)
- **作者**: @anmarui74 | 评论 1 | 状态: OPEN
- **重要性**: OpenCode 2.0.3 默认向所有 OpenAI 兼容 Provider 发送 `prompt_cache_key`，但 NVIDIA NIM API 不支持并拒绝请求，导致 NVIDIA 模型在 V2 下不可用。直接催生了 PR #49071（allowlist 修复）。
- **链接**: https://github.com/anomalyco/opencode/issues/49240

### 9. [FEATURE] /security-review — scan diff for secret leaks and hardcoded credentials
- **作者**: @afonsoft | 评论 2 | 状态: OPEN
- **重要性**: 社区明确需要类似 Claude Code 的 `/security-review` 命令，扫描工作区 diff 的密钥/凭据泄漏。与已关闭的 #3056（pii/secrets censor）需求同源，安全能力持续被关注。
- **链接**: https://github.com/anomalyco/opencode/issues/41913

### 10. Add a simple Pause / Resume button for running Agent tasks
- **作者**: @Pilotx1992 | 评论 1 | 状态: OPEN
- **重要性**: Agent 任务运行中缺少暂停/恢复控制，用户希望对长耗时任务有更细粒度的操作权。属于 Agent 运行控制方向的基础功能诉求。
- **链接**: https://github.com/anomalyco/opencode/issues/49239

## 重要 PR 进展（10 条）

### 1. fix(ai): use allowlist for openai prompt cache key
- **作者**: @marwanvx | 状态: OPEN（需关联 issue）
- **内容**: 将 `prompt_cache_key` 的透传从“无条件下发”改为 allowlist 机制，直接修复 #49240（NVIDIA 拒绝请求）与 #45113。对 OpenAI 兼容生态的适配是重要的兼容性收敛。
- **链接**: https://github.com/anomalyco/opencode/pull/49071

### 2. fix(core): keep the configured MCP URL as the OAuth resource
- **作者**: @rekram1-node | 状态: OPEN | Closes #46316
- **内容**: 交互式登录与连接时刷新发送了不同的 RFC 8707 `resource` 值，导致严格授权服务器以 `invalid_target` 拒绝静默刷新。此修复统一使用配置的 MCP URL 作为 resource，对 MCP 服务器的 OAuth 流程是必要修正。
- **链接**: https://github.com/anomalyco/opencode/pull/49241

### 3. fix(ai): classify gateway account limits as quota and keep 4xx non-retryable
- **作者**: @rekram1-node | 状态: OPEN
- **内容**: 将 HTTP 402 归类为 `QuotaExceeded`，识别 OpenCode Zen 的 `GoUsageLimitError`、`FreeUsageLimitError`、`CreditLimitExceeded` 三元组，并扩展配额提示文案；同时确保 4xx 错误不会无限重试。改善配额用尽时的反馈准确性与资源消耗。
- **链接**: https://github.com/anomalyco/opencode/pull/49195

### 4. feat(core): expose fetch to code mode scripts
- **作者**: @rekram1-node | 状态: OPEN
- **内容**: `execute` 工具运行的脚本现在可调用 `fetch`（基于 #49196 extensions-as-host-functions 实现），无需新增运行时类型即可发起 HTTP 请求。扩展了 code mode 脚本的能力边界。
- **链接**: https://github.com/anomalyco/opencode/pull/49235

### 5. fix(core): fail fast when DB schema is ahead of current runtime
- **作者**: @MdTanwer | 状态: OPEN | Closes #49177, #38471, #35403
- **内容**: Desktop、CLI、插件共享同一个 SQLite 文件，任意一方先启动都可能推进 schema 导致其他运行时崩溃。此 PR 在检测到 DB schema 高于当前运行时版本时快速报错，避免数据损坏与难排查的启动失败。
- **链接**: https://github.com/anomalyco/opencode/pull/49225

### 6. fix(session): retry title generation and fall back to the session model
- **作者**: @thom801 | 状态: OPEN | Closes #42287, #30662
- **内容**: 会话标题生成只运行一次且失败后静默，导致会话永远显示 "New session - ..."。此 PR 增加重试机制，并在小模型失败时回退到当前会话模型，改善会话管理体验。
- **链接**: https://github.com/anomalyco/opencode/pull/49223

### 7. fix(session-ui): insert dropped file mentions after the first one
- **作者**: @deepakajay0477 | 状态: OPEN | Closes #39705
- **内容**: V2 输入框中，文件树拖拽文件插入 `@path` 引用时，首次拖拽成功但后续全部被静默忽略。根因是已有 mention 时插入位置计算错误。
- **链接**: https://github.com/anomalyco/opencode/pull/49185

### 8. fix(tui): deduplicate plugin targets
- **作者**: @kitlangton | 状态: OPEN
- **内容**: 合并插件可通过本地目录发现和服务器插件清单两条路径到达 TUI，加载失败时同一目标被显示为两行失败。去重后失败状态展示更清晰。
- **链接**: https://github.com/anomalyco/opencode/pull/49112

### 9. feat(core): v2 – restore OPENCODE_DISABLE_CLAUDE_CODE
- **作者**: @malarahfelipe | 状态: OPEN | Part of #36990
- **内容**: 在 v2 分支恢复 `OPENCODE_DISABLE_CLAUDE_CODE` 环境变量支持，避免读取 `~/.claude` 的 prompt 和 skills。对 v1→v2 迁移的兼容性很重要。
- **链接**: https://github.com/anomalyco/opencode/pull/44725

### 10. test(desktop): focus coverage on funnels and performance
- **作者**: @Hona | 状态: OPEN
- **内容**: 删除 Desktop 包中 395 个测试文件中的 335 个（85%），保留全部基准测试、时间线稳定性检查、性能分析工具及相关 fixtures。测试策略大幅转向核心漏斗与性能防线，属于工程效率调整。
- **链接**: https://github.com/anomalyco/opencode/pull/49236

## 功能需求趋势

从全部 15 条 Issues 中可提炼出四个社区最关注的功能方向：

1. **Agent 运行控制与会话恢复**（#5333、#49239）
   - 会话中断后的队列消息优雅处理、运行中 Agent 任务的暂停/恢复按钮。
   - 社区希望 OpenCode 提供更贴近 IDE 调试体验的控制能力。

2. **安全与合规审查**（#36682、#41913、#3056）
   - 压缩摘要指令注入防护、`/security-review` 密钥扫描命令、PII/敏感值正则脱敏。
   - 安全能力正从“被动修复”走向“主动扫描 + 防注入”，说明用户开始将 OpenCode 用于生产级代码库。

3. **多 Provider 兼容性适配**（#49028、#49237、#49240、#49247、#49230）
   - Z.AI 的 PDF 传输差异、NVIDIA 拒绝 `prompt_cache_key`、Console 的 `encrypted_content` 授权错误、免费模型调整（Big Pickle 可用、DeepSeek 被移除引发不满）。
   - OpenAI 兼容层的“统一适配”正在被真实世界的 Provider 差异挑战，allowlist/配置化参数将成为刚需。

4. **桌面端大文本输入稳定性**（#43935、#49238）
   - macOS V8 OOM 崩溃、Windows UI 完全挂起，均在 V2 的 `parsePromptInputV2Editor`/`onPaste` 路径上触发。
   - 需要大输入的分块解析、异步处理或大小限制提示，而非依赖渲染进程硬扛。

## 开发者关注点

1. **回归测试不足**：1.18.30 在 `SystemPrompt.environment` 上出现 TypeError，导致所有 prompt 立即崩溃（#48645），且 1.18.18 正常。此类问题需通过发布前冒烟测试覆盖“全新会话首条消息”这一基础路径。

2. **Provider 差异缺乏降级方案**：Z.AI 只接受 `file_url`/`file_id` 而 OpenCode 固定发送 `file_data`（#49237），NVIDIA 不识别 `prompt_cache_key`（#49240）。开发者期望 Provider 配置支持按厂商开关参数，而不是默认全量下发。

3. **桌面端大粘贴是共同瓶颈**：约 165 KB JSON 即可压垮 macOS 渲染进程，Windows 同样复现。V2 Composer 的 `parsePromptInputV2Editor` 路径需要针对大内容做防崩溃处理。

4. **免费模型调整引发用户反弹**：#49230 指出目前免费模型仅剩 Big Pickle，且移除了 DeepSeek。社区对模型可选择性有强烈诉求，Provider 策略调整应提前与用户沟通。

5. **安全问题的实际影响开始显现**：压缩摘要被当作指令执行（#36682）意味着长期会话的上下文管理需要更严格的“数据 vs 指令”隔离，否则在多轮复杂任务中容易产生非预期操作。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 — 2026-09-16

## 1. 今日速览

今日发布了 **dsh-v0.1.6-alpha.1** 版本，带来四项显著更新：Web 侧边栏新增多标签终端、设置中可恢复已归档会话、MCP 增强资源发现与读取能力、Headless 模式支持从标准输入接收任务。过去 24 小时未出现新的 Issue 或 PR，版本发布是今日社区关注焦点。

## 2. 版本发布

### dsh-v0.1.6-alpha.1
**发布时间**：2026-09-16  
**发布链接**：[GitHub Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.6-alpha.1)

**本次更新内容**：

- **Web 侧边栏新增终端**：支持多标签、Shell 选择以及刷新后终端状态恢复，由 @LegGasai 贡献。
- **已归档会话列表**：设置中新增归档会话列表，用户可查看并恢复历史会话，由 @tianyicui 贡献。
- **MCP 增强**：支持发现和读取资源、使用 URI 模板；内置 Profile 配置 MCP 服务器后，可进一步使用共享资源工具，由 @tianyicui 贡献。
- **Headless 模式增强**：支持从标准输入（stdin）接收任务，可通过 `--session-id` 继续已有会话，为脚本化与管道使用场景提供了便利。

## 3. 社区热点 Issues

过去 24 小时内，仓库内没有新增或更新的 Issue（共 0 条）。  
结合本次 Release 内容，社区当前讨论的热点可能集中在以下方向：

- **Web 终端体验**：多标签、Shell 选择与会话恢复功能是否满足日常调试需求。
- **归档会话管理**：恢复机制与不同工作流的兼容性。
- **MCP 资源访问**：资源发现/URI 模板的实际使用方式及与共享资源工具的衔接。
- **Headless 自动化输入**：stdin 支持对 CI/CD 和脚本化调用的影响。

相关讨论入口：[Issues 列表](https://github.com/deepseek-ai/deepseek-harness/issues)

## 4. 重要 PR 进展

过去 24 小时内，没有新增或更新的 Pull Request（共 0 条）。  
本次 Release 中合并了以下两位贡献者的工作，值得关注：

- **@LegGasai**：实现 Web 侧边栏多标签终端功能。
- **@tianyicui**：实现归档会话列表、MCP 资源支持等多项功能。

相关链接：[Pull Requests 列表](https://github.com/deepseek-ai/deepseek-harness/pulls)

## 5. 功能需求趋势

结合今日 Release 内容，社区功能需求呈现以下趋势：

- **MCP 协议应用深化**：从基础的资源发现到 URI 模板与共享资源工具，MCP 正在从“可接入”走向“可复用、可组合”，反映出开发者对模型上下文生态互联的强烈需求。
- **Web 端交互体验升级**：终端、多标签、刷新恢复等改进表明，开发者希望 Web 界面承担更重的日常开发任务，而不只是查看结果。
- **Headless 自动化能力增强**：stdin 输入支持意味着 `deepseek-harness` 正在向更标准的 Unix 工具看齐，方便接入 pipeline 与 CI 环境。
- **会话生命周期管理**：归档列表与恢复功能说明长会话管理与断点续跑是高频需求。

## 6. 开发者关注点

从本次更新反推，开发者可能存在的核心痛点与高频诉求包括：

- **终端操作的便捷性**：开发者在 Web 界面中频繁切换 Shell，且希望刷新页面后保持工作现场。
- **历史会话找回困难**：已归档会话的“查看/恢复”能力补上了工作流中的关键断点。
- **MCP 资源访问受限**：此前仅限于工具调用，本次支持资源读取/URI 模板后，进一步打开了共享数据与上下文的途径。
- **Headless 任务输入单一**：原来仅依赖参数传入，现在支持 stdin 和 `--session-id` 续跑，显著提升了自动化集成的灵活性。

---
*本日报由 AI 生成，数据来源为 GitHub 仓库 [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)。*

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-16

## 今日速览

今日 Hermes 社区最受关注的是两处安全问题：`hermes config set` 可绕过系统配置写入保护（[#59293](https://github.com/NousResearch/hermes-agent/issues/59293)），以及 `self_repo_guard` 未能识别通过 heredoc 管道注入 shell 的代码（[#112441](https://github.com/NousResearch/hermes-agent/issues/112441)）。与此同时，一个未捕获的 `PermissionError` 引发了终端、TUI、Dashboard 与网关的全线崩溃（[#112430](https://github.com/NousResearch/hermes-agent/issues/112430)），社区已提交多个修复型 PR 进行响应。

## 社区热点 Issues

### 1. hermes config set 绕过系统配置写入保护 — [#59293](https://github.com/NousResearch/hermes-agent/issues/59293)
- **类型**: `security` / `auth` / `config` | P2 | 11 条评论
- **现象**: v0.18.0 的审批层为 `config.yaml` 增加了路径保护，直接 shell 写入会被标记为危险操作。但 `hermes config set` CLI 走了“前门”，执行同样的修改却**不会**被标记——agent 只要有终端权限就能无门槛地禁用审批层。
- **社区反应**: 评论数最高（11 条），处于 `needs-decision` 状态，说明维护者与社区仍在讨论正确的修复边界——是拦截 CLI 写入还是将其纳入审批流程。

### 2. 桌面端会话指示点状态不准确 — [#86565](https://github.com/NousResearch/hermes-agent/issues/86565)
- **类型**: `bug` / `desktop` / `sessions` | P2 | 6 条评论
- **现象**: 后台会话阻塞在审批时，侧边栏状态点一直显示蓝色“运行中”，只有手动打开会话后才变成琥珀色“需要输入”。用户无法从列表层面感知哪些会话需要关注。
- **社区反应**: 持续一个月未修复，涉及 TUI 与桌面端的会话状态同步机制。

### 3. 主模型选择器在凭据池耗尽时隐藏提供商 — [#103829](https://github.com/NousResearch/hermes-agent/issues/103829)
- **类型**: `bug` / `cli` / `auth` | P2
- **现象**: 当某提供商的凭据全部因 HTTP 429 进入 `exhausted` 状态后，该提供商从主模型选择器中**完全消失**——被当作“未认证”而非“暂时不可用”。辅助选择器已在 #66624 修复，主选择器仍存在该问题。

### 4. 灾难性故障：PermissionError 导致全线服务崩溃 — [#112430](https://github.com/NousResearch/hermes-agent/issues/112430)
- **类型**: `bug` / `critical`
- **现象**: `agent/prompt_builder.py` 的 `_find_hermes_md()` 未捕获 `PermissionError`，导致终端、TUI、Dashboard、Telegram 网关同时不可用。`hermes doctor --fix` 也无法检测和修复，只能手动恢复。
- **影响**: 单一未防护异常即可击穿全部交互面，是典型的“单点故障”问题。

### 5. hermes update 触发 atexit 回调 ImportError — [#112437](https://github.com/NousResearch/hermes-agent/issues/112437)
- **类型**: `bug` / `install-update`
- **现象**: macOS git 安装下运行 `hermes update`，退出时打印两条 `Exception ignored in atexit callback`，根因是浏览器模块的 atexit 钩子对半更新状态下的代码树执行 fresh import，导致 `ImportError: cannot import name 'file_signature'`。
- **关联修复**: PR #112439 已提交。

### 6. self_repo_guard 漏检 heredoc 管道注入 — [#112441](https://github.com/NousResearch/hermes-agent/issues/112441)
- **类型**: `security` / `self-repo`
- **现象**: `detect_self_repo_git_mutation` 将 heredoc 体分类为数据，只扫描裸 shell 会执行的部分。`cat <<EOF | bash` 的 body 被当作数据跳过，但实际会被 bash 执行——绕过仓库保护。
- **关联修复**: PR #112442 已提交。

### 7. 流式响应 0 字符恢复后继续运行 — [#112419](https://github.com/NousResearch/hermes-agent/issues/112419)
- **类型**: `bug` / `streaming`
- **现象**: 流式响应中途死亡且恢复 0 字符时，Hermes 返回空 partial-stream stub 并继续执行，既不通知用户也不通知模型。下一次请求看起来与导致死亡那次完全相同，模型会重复已丢失的操作。
- **风险**: 在弱网环境下可能造成重复执行副作用操作。

### 8. 上下文压缩停滞导致每轮重复触发 — [#112420](https://github.com/NousResearch/hermes-agent/issues/112420)
- **类型**: `bug` / `context`
- **现象**: 压缩停滞时日志显示 `Context compression made no progress… continuing without compression`，但上下文仍超预算，导致每次模型调用都重新触发压缩，单次耗时 120 秒以上，甚至反复重建漂移的系统提示词。

### 9. Cron 任务无法上报代理子任务失败 — [#112426](https://github.com/NousResearch/hermes-agent/issues/112426)
- **类型**: `bug` / `cron`
- **现象**: Cron 任务的 agent 委派子代理或脚本后，即使子任务失败且 agent 在回复中明确说明，调度器仍将运行记录为 `ok`。只有运行时异常（异常、超时）才会计为失败，导致失败连续计数永远不会推进。

### 10. search_files 空路径返回错误而非默认值 — [#112424](https://github.com/NousResearch/hermes-agent/issues/112424)
- **类型**: `bug` / `tools`
- **现象**: 模式定义 `path` 默认值为 `.`，但该默认仅在键完全缺失时生效。模型传入空字符串或纯空格时，工具直接返回 `Path not found:`。模型频繁产生空白 `path`，影响工具可用性。

## 重要 PR 进展

### 1. 修复 heredoc 管道注入的 self-repo 守卫 — [#112442](https://github.com/NousResearch/hermes-agent/pull/112442)
- 修复 #112441：`_heredoc_specs` 此前只检查 `<<` 之前的命令来决定 heredoc body 是否作为 shell 代码执行，管道下游的 `bash` 被漏掉。现在正确追踪管道下游的 shell 执行路径。

### 2. 修复 atexit 钩子在半更新状态下的 ImportError — [#112439](https://github.com/NousResearch/hermes-agent/pull/112439)
- 修复 #112437：当 `origin_module()` 的 fresh import 因树不完整失败时，浏览器 atexit 回调（`_emergency_cleanup_all_sessions`、`_stop_browser_cleanup`）保持静默，不再打印异常。

### 3. 拒绝不完整下载并修复损坏的本地运行时缓存 — [#112443](https://github.com/NousResearch/hermes-agent/pull/112443)
- 修复本地运行时安装被损坏归档卡住的问题：响应在声明 `Content-Length` 前关闭可能导致分块下载循环无异常到达 EOF，安装器会将部分文件提升到缓存中。PR 增加了完整性校验与缓存自修复。

### 4. 修复管理型本地模型的路由问题 — [#112440](https://github.com/NousResearch/hermes-agent/pull/112440)
- 对应 #111323 遗留的次要问题：当托管 llama.cpp 路由器不可达或不在会话 provider 上时，切换到本地模型会出现两个可见错误。PR 确保管理型本地模型正确路由到本地 provider。

### 5. 支持 zsh SSH 探测 shell — [#112438](https://github.com/NousResearch/hermes-agent/pull/112438)（已合并）
- 远程账户登录 shell 为 zsh 时，跳过非交互式 job-control 切换，保留 direct-child watchdog kill 路径，并添加了非交互 zsh 下的回归测试。

### 6. Kanban worker 失败时原地重试 — [#112318](https://github.com/NousResearch/hermes-agent/pull/112318)
- Kanban worker 会话遇到可重试的 API 失败（流中断、上游 idle-kill、传输重置）时，不再静默结束运行，而是在原位置重试。恢复耗尽时诚实退出，而非返回 rc=0 造成协议违规。

### 7. 桌面端后端进程意外退出后的恢复机制 — [#112356](https://github.com/NousResearch/hermes-agent/pull/112356)
- 针对 #112344 的独立实现：扩展现有合并式 supervisor，使本地主后端意外死亡时由 Electron 主进程恢复，而非依赖渲染进程 IPC。

### 8. Slack 线程回复在频道中显示实时状态 — [#112436](https://github.com/NousResearch/hermes-agent/pull/112436)
- Slack 处理生命周期（👀 → ✅/❌）此前作用于 `event.message_id`，对线程回复而言是该回复本身——只有打开线程的人能看到。PR 改为在**线程父消息**上反应，频道中即可看到实时状态。

### 9. 审批消费绑定到已审查的负载 — [#112415](https://github.com/NousResearch/hermes-agent/pull/112415)
- 防止审批/拒绝命令套用之前读取的记录后无条件下发 on-disk ID，并避免成功应用后静默删除替换中的待处理记录——消除并发审批下的竞态条件。

### 10. 修复 npm 安全漏洞依赖 — [#107376](https://github.com/NousResearch/hermes-agent/pull/107376)
- 在不使用 `npm audit fix --force` 的前提下修复 #107356 报告的可疑 npm 依赖图（12 个漏洞，含 6 个高危）。已确认检查入仓库的 lockfile 解析正确。

## 功能需求趋势

- **审批链路的完整性与安全性**: 从 #59293（CLI 绕过审批）到 #112415（审批与负载绑定），社区关注的核心是审批机制不能被旁路或产生竞态，安全边界必须覆盖所有入口。
- **会话状态的准确表达**: #86565（桌面端状态点不更新）、#112436（Slack 线程状态不可见）反映出用户对“后台到底在等我还是在跑”有强烈的可视化诉求。
- **失败可见性与恢复能力**: #112426（Cron 无法上报失败）、#112419（0 字符空桩继续运行）、#112318（Kanban worker 静默失败）共同指向一个问题——Hermes 需要更诚实的失败传播和自动恢复机制。
- **工具参数默认值的鲁棒性**: #112424（空白 path 不回落默认值）显示模型生成的“空白但存在”参数正在成为实际痛点，工具层需要更强的输入容错。

## 开发者关注点

- **安全机制可绕过性**: `hermes config set` 无门槛禁用审批层是社区目前最大的安全隐忧，`self_repo_guard` 对 heredoc 管道的漏检进一步削弱了防护可信度。
- **单点故障的连锁反应**: #112430 证明一个未捕获的 `PermissionError` 就能瘫痪全部交互面，且 `hermes doctor --fix` 无法自愈。开发者对“诊断工具能修复自身故障”有明确期待。
- **更新流程的脆弱性**: #112437 暴露了 `hermes update` 在树半更新状态下的 atexit 崩溃，更新工具自身必须有更好的容错与原子性保证。
- **后台任务的运行状态透明度**: 无论是桌面端状态点、Slack 线程反应还是 Cron 失败上报，开发者需要一个统一的、实时的、跨界面一致的任务状态视图。

:::
