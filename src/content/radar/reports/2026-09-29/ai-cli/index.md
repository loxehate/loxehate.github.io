---
title: "AI CLI 工具社区动态日报"
published: 2026-09-29
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-29

> 生成时间: 2026-09-29 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-29）

## 1. 生态全景

当前 AI CLI 工具已从"单点命令工具"全面转向"可编程的 Agent 开发平台"，扩展性（hooks/插件市场）、多模型聚合与桌面端体验成为竞争焦点。各工具普遍进入高频迭代期，但版本回归频发（如 Claude Code 首条消息冻结、Codex 剪贴板失效），稳定性正取代功能数量成为用户信任的核心瓶颈。MCP、沙箱权限、子代理状态管理等基础设施层面的可靠性问题在多个仓库中高度重合，说明行业仍处于工程化的早期收敛阶段。与此同时，非交互/CI 场景与 Windows 平台兼容性被密集讨论，标志着 AI CLI 正从个人交互工具向自动化流水线组件演进。

## 2. 各工具活跃度对比

> 注：各仓库统计口径不一（部分为 24h 更新总数，部分为热点条目数），下表用于相对活跃度参考。

| 工具 | 24h Release | 24h Issues | 24h PRs | 核心版本动态 |
|---|---|---|---|---|
| **Claude Code** | v2.1.284 稳定版 | 45 条更新，Top10 热度极高（最高 223 评论/128👍） | 6 | Sonnet 5.5 设为默认模型；auto 模式新增"这次允许、下次再问"；引入多处回归 |
| **OpenAI Codex** | rust-v0.158.0 稳定 + 5 个 alpha | 10 条热点，桌面挂起问题 23 评论 | 10 | TUI 复制粘贴增强；MCP OAuth 预注册支持 |
| **Gemini CLI** | nightly 20260928 | 50 条更新，Top10 含 p1 级 bug | 36（更新） | 非交互计划执行、认证死循环修复、文件原子写入 |
| **DeepSeek Reasonix** | v1.39.4 / v1.39.3 / Studio v2.21.0 三连发 | 10 条热点，Windows 数据问题占半数 | 10 | 会话崩溃修复；Studio 引入社区扩展市场与云配置备份 |
| **OpenCode** | v1.18.33 稳定版 | 10 条热点，ACP 回归 10 评论 | 10 | Cloudflare AI Gateway 超时、LiteLLM 成本头、调试输出脱敏 |
| **Deepseek Harness** | v0.2.0-rc.1 候选版 | 0 | 0 | 对话动画优化、图片失效自动重传，社区进入 RC 沉淀期 |
| **Hermes** | 无 | 8 条活跃，多为新建 | 50（更新） | WebGL 渲染、Windows fs.watch 风暴、WhatsApp 桥接崩溃修复 |

**活跃度排序**：Gemini CLI / Hermes（PR 吞吐最高）＞ Claude Code（Issue 讨论深度最强）＞ OpenAI Codex / Reasonix / OpenCode（版本节奏快）＞ Deepseek Harness（暂沉寂）。

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **MCP 连接生产级化** | Claude Code、OpenAI Codex、Reasonix | 断线自动重连（stdio 缺失）、OAuth 客户端密钥支持、/mcp 重试卡死、长响应 JSON 解析失败 |
| **权限/沙箱/信任机制** | Claude Code、Codex、Gemini CLI、Hermes | bypassPermissions 回归、沙箱内 SSH/Git 权限错误、headless 信任传播、黑名单规则剥离开端口/userinfo |
| **Windows 平台稳定性** | 几乎全部工具 | 桌面应用挂起/加载卡死（Codex）、git 进程风暴 ~17 次/秒（Claude）、fs.watch 18 万事件/秒（Hermes）、会话迁移数据丢失（Reasonix）、OpenSSH 路径硬编码 |
| **上下文/token 成本优化** | Gemini CLI、Claude Code、OpenCode、Reasonix | AST 感知工具、skill 去重键策略、跨会话 prompt 缓存命中、输出 token 上限、上下文压缩丢失 |
| **子代理/多 Agent 可靠性** | Gemini CLI、Claude Code、OpenCode、Hermes、Reasonix | MAX_TURNS 中断误报成功、子会话事件不完整、peer run 串行饿死、审查子代理轮次上限 |
| **可扩展性与生态** | Claude Code、Reasonix、OpenCode、Gemini CLI | function hooks、"数周内"承诺、Studio 扩展市场、ACP 配置回归、skills/subagent 主动调用不足 |
| **桌面端与 CLI 体验统一** | Claude Code、Codex、Reasonix、Hermes | Skills 跨端同步（157👍）、会话/配置同步、桌面端数据持久化与恢复 |

## 4. 差异化定位分析

- **Claude Code**：**深度定制的专业 Agent 平台**。绑定 Anthropic 闭源模型，权限模型最复杂，社区对 hooks/Mods 扩展性的诉求最强（223 评论），走"重平台、深生态"路线，面向追求极致可控性的专业开发者。
- **OpenAI Codex**：**一体化 AI 编码工具链**。CLI + 桌面应用 + ChatGPT 账户体系深度绑定，重视 OAuth/企业集成与沙箱安全，目标用户是 OpenAI 生态内的日常开发者，桌面体验权重最高。
- **Gemini CLI**：**Agent 可靠性研究与自动化实验场**。最强调 headless/CI 场景、AST 感知工具和 subagent 行为生命周期治理，Google 系技术底色明显，工程化投入大，适合将 agent 嵌入流水线的团队。
- **DeepSeek Reasonix**：**多模型聚合的 AI 开发平台（CLI + Studio IDE）**。同时适配 GPT/Qwen/DeepSeek，新模型响应极快（GPT-6 当日完成适配），且社区反馈闭环最快，走"开放模型、激进迭代"路线。
- **OpenCode**：**轻量级多 Provider 聚合 CLI**。以 ACP 协议对接 Zed 等编辑器生态，适配 LiteLLM/Bedrock/Cloudflare 等中长尾 provider，定位是编辑器生态的"模型网关"。
- **Hermes**：**Agent 网关与消息基础设施**。关注 WhatsApp 桥接、peer run 调度、会话状态持久化，与其说是开发工具，更像 agent 的运维与投递层，面向自建 agent 基础设施的团队。
- **Deepseek Harness**：**对话交互工程精修**。当前聚焦交互动画与容错重传，尚无明显平台化野心，处于能力积累期。

## 5. 社区热度与成熟度

- **第一梯队（高活跃、生态自驱）**：**Claude Code** 讨论深度一骑绝尘（单 issue 223 评论、157👍），官方对 function hooks 给出明确时间承诺，社区已在参与设计；**Gemini CLI** 以 50 Issues + 36 PRs 的吞吐居首，且官方主导 AST 感知系列调研，工程化投入最系统。
- **第二梯队（问题驱动、版本高频）**：**OpenAI Codex** 桌面用户基数大但痛点集中（1/3 热点 issue 为桌面挂起），版本发布频繁；**Reasonix** 三连发且官方亲自提交 issue/快速关闭，商业化节奏和社区响应速度俱佳。
- **第三梯队（精修期/小规模）**：**OpenCode** 迭代快但用户盘尚小；**Hermes** PR 活跃（50 条）但 issue 绝对量低，面向特定部署形态，属于典型的基础设施型小社区。
- **沉寂期**：**Deepseek Harness** 0 Issue/0 PR，RC 候选版发布后社区在观望，活跃度暂处低位。

成熟度方面，Claude Code 功能最深但回归最频繁（三起独立回归），Codex 用户量级最大但稳定性拖累口碑，Gemini 在 agent 治理概念上最前沿，Reasonix 在功能覆盖与响应速度上最激进。

## 6. 值得关注的趋势信号

1. **"平台化"取代"工具化"成为主叙事**：Claude Code 的 function hooks 承诺、Reasonix Studio 扩展市场、OpenCode 的 ACP 集成、Gemini 的 AST 工具规划——AI CLI 的竞争正从"模型能力"转向"生态深度"。开发者在选型时应评估工具的插件机制与开放度，而非仅看基准测试分数。

2. **稳定性危机是行业级问题，升级需建立观察期**：Claude Code 首条消息冻结（RSS 3GB+）、Codex 剪贴板三平台回归、OpenCode ACP 配置回归、Gemini Enter 键挂起——快速迭代与质量控制的矛盾已造成信任损耗。建议生产环境固定版本，升级前先扫当日 issue 区，重大升级延后 1–2 个 patch 版本。

3. **Windows 是当前体验最短的木板**：几乎所有工具的高频 bug 都集中在 Windows（进程风暴、加载挂起、fs.watch 风暴、数据迁移丢失、PowerShell 误判）。Windows 开发者短期内应预期更高的踩坑概率；对工具厂商而言，Windows 兼容性将是下一轮口碑分水岭。

4. **Agent 自治需要"诚实"的状态语义**：Gemini 的 MAX_TURNS 中断误报成功、OpenCode 子会话事件不完整、Hermes peer run 串行饿死——当 agent 被嵌入自动化流水线，错误状态被掩盖比错误本身更危险。开发者应关注工具对"成功/中断/失败"的区分能力与可观测性，这是自动化可靠性的前提。

5. **上下文成本管理进入精细化阶段**：1M 上下文普及后，各社区反而集中讨论如何"少用"（AST 感知读取、共享指令前缀隔离提升缓存命中、skill 去重键、输出 token 上限）。对开发者而言，prompt 设计与工具调用模式对成本的影响权重正在上升。

6. **MCP 正从"能连"走向"生产级"**：OAuth 预注册、自动重连、错误诊断、成本头透传——MCP 作为事实标准已进入可靠性深水区。长时间自动化任务的开发者应关注各工具对 MCP 断线恢复的支持程度。

7. **非交互/CI 场景成为标配能力**：Gemini 的 headless 自主计划执行、Reasonix 的 headless 信任传播、Codex 的自动化沙箱——AI CLI 正被嵌入 CI/CD 流水线，这一场景尚不成熟，但已是明确的产品必选项，值得提前规划评估。

**给技术决策者的三条行动建议**：① 短期以稳定性优先，固定版本并订阅目标仓库的 release/issue 通知；② 中期按"生态开放度 + 子代理可观测性 + Windows 兼容性"三个维度做工具选型加权；③ 对多模型聚合与 MCP 基础设施保持架构中立，避免与单一厂商深度锁死。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据范围**: github.com/anthropics/skills · 截止 2026-09-29

---

## 1. 热门 Skills 排行

> 以下 PR 按社区讨论/关注度排序（数据源标注为按评论数排序），当前**全部处于 Open 状态**。

| # | Skill / 内容 | 功能概述 | 社区关注点 | 状态 |
|---|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator 触发评测修复**（@MartinCajiao） | 修复触发评测误报：worker 命令探针竞争、Windows 下 `select()` 失败、无关工具中断扫描，以及运行期失败被误判为非触发 | 直接关系到技能作者的核心工作流——评测可信度；讨论最热烈 | Open |
| [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp-builder 兼容 mcp≥2**（@Kuldeepp18） | 适配 `streamablehttp_client` → `streamable_http_client` 重命名及自定义 header 的新配置方式 | MCP 生态版本升级带来的断裂问题，涉及大量存量技能 | Open |
| [#1771](https://github.com/anthropics/skills/pull/1771) | **proofcore-contract-auditor**（@ProofCore-Protocol） | Web3 智能合约（Solidity/Rust）静态分析，审计证明锚定到 TON 区块链 | 新技能方向：区块链安全 + 可验证审计存证 | Open |
| [#1734](https://github.com/anthropics/skills/pull/1734) | **docx 孤儿评论检测**（@rohitjain25） | 检测 docx 文档中与正文脱离的孤悬评论（orphaned comments） | 文档处理精细度需求上升；9 月下旬仍在活跃更新 | Open |
| [#1703](https://github.com/anthropics/skills/pull/1703) | **md2video-audio**（@70v-Yoyo） | 零成本将 Markdown 经 Marp 转幻灯片，再合成带拟人配音的 MP4 视频 | 多媒体内容生成方向，关注度高 | Open |
| [#1245](https://github.com/anthropics/skills/pull/1245) | **notion-spec-to-implementation**（@mrdesouzaphd-cmyk） | 将产品/技术 Spec 拆解为可落地的 Notion 任务（含验收标准与进度追踪）；同 PR 附带 quantitative-resume-auditor | 工作流自动化 + 招聘场景双技能 | Open |
| [#525](https://github.com/anthropics/skills/pull/525) | **pyxel 复古游戏开发**（@kitao） | 引导 Claude 用 Pyxel 创建/调试/验证 Python 复古游戏，支持 headless 输入驱动与逐帧检查 | 创意编程方向，长期活跃（3 月创建，9 月仍更新） | Open |
| [#514](https://github.com/anthropics/skills/pull/514) | **document-typography**（@PGTBoos） | AI 生成文档的排版质量控制：孤词换行、段落孤儿、编号错位 | 直击 AI 文档生成的普遍痛点 | Open |

**其他值得关注**：[#822 AWT 可视化 E2E 测试](https://github.com/anthropics/skills/pull/822)、[#723 testing-patterns 全栈测试](https://github.com/anthropics/skills/pull/723)、[#83 skill-quality/security-analyzer 元技能](https://github.com/anthropics/skills/pull/83)、[#1776 blast-radius 破坏性操作清单](https://github.com/anthropics/skills/pull/1776)、[#486 ODT 文档处理](https://github.com/anthropics/skills/pull/486)、[#1615 scnet-hpc 集群运维](https://github.com/anthropics/skills/pull/1615)。

---

## 2. 社区需求趋势

| 趋势 | 代表 Issue | 信号 |
|---|---|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492)「社区技能借 anthropic/ 命名空间分发，构成信任边界滥用」（43 条评论，居首） | 社区最大痛点：用户可能把第三方技能误认为官方出品并授予高权限 |
| **组织级共享与协作** | [#228](https://github.com/anthropics/skills/issues/228)「支持 org 内技能直连共享」（16 评论，8👍） | 当前需下载 .skill 文件经 Slack/Teams 传播，流程繁琐 |
| **评测/触发机制可靠性** | [#556](https://github.com/anthropics/skills/issues/556)「run_eval.py 对所有查询触发率为 0」（12 评论，7👍） | 技能评测基础设施不可信，直接阻碍技能开发者的迭代闭环 |
| **技能去重与安装管理** | [#189](https://github.com/anthropics/skills/issues/189)「document-skills 与 example-skills 插件内容重复」（6 评论，9👍，👍 数最高） | 重复技能污染 context window，安装管理体验差 |
| **上下文/Token 效率** | [#1487](https://github.com/anthropics/skills/issues/1487)「claude-api 单次注入约 156k tokens，撑爆上下文」 | 大型参考类技能需改为按需加载 |
| **新技能方向提案** | [#1329](https://github.com/anthropics/skills/issues/1329)「compact-memory：符号化代理记忆」、[#412](https://github.com/anthropics/skills/issues/412)「agent-governance：代理治理/安全模式」（已关闭但体现需求）、[#1385](https://github.com/anthropics/skills/issues/1385)「推理质量门禁流水线」 | 社区自发提出「元能力」类技能：记忆压缩、治理、质量校验 |

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、近期仍有更新（数据截至 9 月底），**存在短期内合并落地的可能**：

| PR | Skill | 近期动态 | 潜力说明 |
|---|---|---|---|
| [#1771](https://github.com/anthropics/skills/pull/1771) | proofcore-contract-auditor | 9-15 创建，9-16 更新 | 唯一 Web3 方向技能，差异化明显；链上存证设计有创新性 |
| [#1734](https://github.com/anthropics/skills/pull/1734) | docx 孤儿评论检测 | 9-06 创建，9-25 更新 | 文档类技能持续热门，补足 docx 生态细节 |
| [#1245](https://github.com/anthropics/skills/pull/1245) | notion-spec-to-implementation | 6-02 创建，9-28 更新（数据截止日仍活跃） | 长周期打磨，覆盖「需求 → 任务」高频场景 |
| [#1703](https://github.com/anthropics/skills/pull/1703) | md2video-audio | 9-01 创建，9-15 更新 | 多媒体生成新赛道，零成本卖点强 |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel | 3-05 创建，9-22 更新 | 半年持续迭代，headless 验证机制成熟 |
| [#822](https://github.com/anthropics/skills/pull/822) | AWT（E2E 测试） | 3-31 创建，9-19 更新 | 零代码测试生成 + 浏览器视觉能力，工具型技能 |
| [#723](https://github.com/anthropics/skills/pull/723) | testing-patterns | 3-22 创建，9-21 更新 | 覆盖完整测试栈方法论，团队协作价值高 |

---

## 4. Skills 生态洞察

> **一句话总结**：当前社区最集中的诉求是「**技能的质量与信任**」——技能评测机制不可靠、命名空间被借用导致的安全隐患、大型技能撑爆上下文等工程与治理问题占据了最高讨论热度，与此同时垂直场景新技能（Web3 审计、文档质检、多媒体生成）持续涌入，生态正从「数量扩张」转向「质量与治理」并重。

**核心信号**：最高热度的 PR（#1298 skill-creator 修复）和最高热度的 Issue（#492 安全信任）都不是新技能，而是**对技能生产工具本身和生态治理的加固**。这意味着社区已不再满足于「能跑」，而是要求「可信、可测、可共享」。

---

# Claude Code 社区动态日报

**日期：2026-09-29** | 数据来源：github.com/anthropics/claude-code

---

## 今日速览

**v2.1.284 发布，正式将 Claude Sonnet 5.5 设为 Anthropic API 默认 Sonnet 模型**（1M 上下文，输入 $2/Mtok、输出 $10/Mtok、缓存读取 $0.20/Mtok），并新增 auto 模式越权读取前"这次允许、下次再问"选项。社区层面，Mods 可扩展性议题（#91870）持续高热（223 评论），但新版本也带来了若干回归 bug——包括 Linux 上按回车即冻结（#98023）和权限绕过模式回归（#91683）。

---

## 版本发布

### v2.1.284

**核心更新：**
- **新增 Claude Sonnet 5.5**（`claude-sonnet-5-5`），现为 Anthropic API 默认 Sonnet 模型——1M 上下文，定价 $2/$10 per Mtok，缓存读取 $0.20/Mtok
- auto 模式在读取工作目录外文件前的提示中，新增 **"Yes, but ask again next time"** 选项（是，但下次再问）

> 注：社区报告该版本引入若干回归问题，见下文 Issue #98023、#98019、#97991。

---

## 社区热点 Issues

过去 24 小时共更新 45 条 Issue，以下为最值得关注的 10 条：

### 1. Mods——让 Claude 扩展性提升 10 倍
[#91870](https://github.com/anthropics/claude-code/issues/91870) | 作者 @poteat | 评论 223 | 👍 128 | 开放中

**社区最热议题**。官方在 issue 中承诺"数周内"交付 function hooks，社区反馈积极，设计讨论高质高量。这直接关系到 Claude Code 的生态深度。

### 2. 在 Claude Desktop 与 CLI 之间同步 Skills
[#20697](https://github.com/anthropics/claude-code/issues/20697) | 作者 @meCodeUp | 评论 48 | 👍 157 | 开放中

个人技能文件（SKILL.md）目前无法跨桌面端和 CLI 同步，用户需重复配置。👍 数高达 157，是社区最渴望的统一体验。

### 3. /voice 模式增加 voiceLanguage 设置
[#31724](https://github.com/anthropics/claude-code/issues/31724) | 作者 @Takesizmail | 评论 15 | 👍 50 | 开放中

语音转写引擎默认仅支持英语，乌克兰语等非英语语言转录不可靠。同源问题 #78682（桌面端麦克风听写忽略语言设置）也于 24h 内被再次提及。

### 4. bypassPermissions 模式回归：Read 拒绝规则下 cd && grep 重复弹窗
[#91683](https://github.com/anthropics/claude-code/issues/91683) | 作者 @TalkingMonkeyOz | 评论 10 | 👍 27 | 开放中

**2.1.259 起回归**：配置了 Read() 拒绝规则后，`cd DIR && grep ...` 在 bypassPermissions 模式下仍触发权限提示。2.1.258 无此行为。涉及权限模型的核心可靠性。

### 5. 2.1.284 在 Linux 上首次回车即冻结，RSS 涨至 3GB+（eCryptfs 主目录）
[#98023](https://github.com/anthropics/claude-code/issues/98023) | 作者 @PrinceGarth | 评论 0 | 新提交

**严重回归**：TUI 正常启动，但发送首条消息即永久冻结（Ctrl-C/SIGTERM 均无效，仅 SIGKILL 可结束）。主线程从 `/` 递归遍历至 `/home/.ecryptfs`（eCryptfs 加密主目录），2.1.280 正常。加密主目录用户建议暂缓升级。

### 6. 桌面应用每分钟持续生成 ~17 个 git 进程，放大内核池泄漏至 ~6GB/天
[#94478](https://github.com/anthropics/claude-code/issues/94478) | 作者 @uphor0s | 评论 3 | 开放中

Windows 上桌面应用持续高频 fork `git.exe`（每进程连带 `conhost.exe`），单日约 200 万短命进程，并放大内核池泄漏。涉及桌面端架构与性能。

### 7. 无 AVX 指令集的 x86-64 CPU 上 SIGILL 崩溃（Linux 裸机）
[#96402](https://github.com/anthropics/claude-code/issues/96402) | 作者 @vejeta | 评论 3 | 开放中

原生安装器 2.1.280 与 npm 包 2.1.197 均崩溃；**2.1.112（最后的 JS bundle）在 Node 22 上可正常工作**。说明打包方式变更导致二进制与旧 CPU 的兼容性断裂，影响面可能大于目前报告量。

### 8. 工作树位于 .claude/worktrees/ 之外时，每次切换都触发一次批准
[#94265](https://github.com/anthropics/claude-code/issues/94265) | 作者 @nborracha | 评论 2 | 👍 1 | 开放中

两种行为叠加导致每次 worktree 切换都弹权限确认。另有新 issue #97991 报告：即便是已信任仓库的全新 worktree，2.1.284 仍重新提示 "Workspace not trusted"。工作树信任机制尚未闭环。

### 9. 云环境项目在用量达 100% 时卡死，尽管 Cloud Credit 仍可用
[#97160](https://github.com/anthropics/claude-code/issues/97160) | 作者 @nguyenhoanglong-tech | 评论 1 | 👍 2 | 开放中

用量达到 100% 后，云环境中的项目协调器 agent 与线程无法继续，但 $250 云会话额度仍在。额度系统与用量上限的联动逻辑存在问题。

### 10. Skill 重复调用去重键基于渲染后内容，参数变更即整段重新注入
[#95340](https://github.com/anthropics/claude-code/issues/95340) | 作者 @anodynos | 评论 4 | 开放中

去重机制按渲染后的 SKILL.md 文本做键，导致仅变更参数也会重新注入整份技能文档——组合多个技能时 token 消耗 = N × 正文。典型的高频低优但影响 token 成本的工程问题。

---

## 重要 PR 进展

过去 24 小时共 6 条 PR，以下为全部：

### 1. mods: 回退两个变更（agents-md 截断读取 + diff 强制颜色）
[#98018](https://github.com/anthropics/claude-code/pull/98018) | 作者 @poteat | 开放中

**需重点关注**：主动回退 #96363 与 #96364。说明这两个此前合并的 mods 修复在实际使用中引入了新问题，社区维护者选择恢复原行为。围绕 mods 的迭代仍在快速试错阶段。

### 2. diff: 首次编辑仅在有待列文件时才打开 pane
[#94847](https://github.com/anthropics/claude-code/pull/94847) | 作者 @bcherny | 开放中

修复 diff pane 在首次 Edit/Write/NotebookEdit 时提前打开、且 fetch 前就展开的问题——当写入发生在仓库外、被 ignore 文件或不同 worktree 时，会出现空 pane（"No tracked changes"）。现改为确认有文件可列时才打开。

### 3. agents-md: 自动分页读取嵌套 AGENTS.md 不再计入"已交付"
[#96364](https://github.com/anthropics/claude-code/pull/96364) | 作者 @poteat | 已合并

原先只要 Read 过某个 AGENTS.md 即视为已交付，但超 token 上限的文件会被工具自动分页——模型只看到第一页，却被当作完整交付。此 PR 修复该判定，后被 #98018 回退，需跟进后续修正方案。

### 4. diff: 传 --no-color 避免强制 git 颜色清空 diff 内容
[#96363](https://github.com/anthropics/claude-code/pull/96363) | 作者 @poteat | 已合并

当 git 配置为 `color.ui=always`/`color.diff=always` 时，`git diff` 返回 ANSI 转义码，导致无行能匹配 hunk header 正则，diff 正文显示为空。此修复后被 #98018 回退，需关注后续方案。

### 5. ci: GitHub Actions 工作流安全加固
[#97952](https://github.com/anthropics/claude-code/pull/97952) | 作者 @qing-ant | 开放中

对调用 Claude 的三个工作流（`claude-issue-triage.yml`、`claude-dedupe-issues.yml`、`claude.yml`）做安全加固：添加 egress-firewall runner，限制网络出口。其余工作流不涉及 Claude Code action 或 Claude API 登录，不在范围内。

### 6. 添加 AI 学习路线图交互式画布应用
[#31204](https://github.com/anthropics/claude-code/pull/31204) | 作者 @AM-Bear | 已关闭

基于 React/Vite 的节点-边图学习路线图应用，带 localStorage 持久化。与本仓库核心功能无关，已关闭。

---

## 功能需求趋势

从全部 Issue 中提炼社区最关注的五大方向：

1. **可扩展性 / Hooks / 插件生态（热度最高）**
   - 代表：#91870 "Mods"（223 评论、128👍），官方承诺数周内交付 function hooks
   - 社区强烈期望 Claude Code 成为可深度定制的开发平台，而非封闭工具

2. **桌面端与 CLI 体验统一**
   - 代表：#20697 Skills 同步（157👍）、#80407 用户级 skills 在桌面端不可用、#78684 Dispatch 会话跨端同步缺失
   - Skills、会话、配置在 Desktop/CLI/移动端之间割裂，是最大一致性痛点

3. **语音与本地化支持**
   - 代表：#31724 voiceLanguage（50👍）、#78682 桌面端麦克风语言设置被忽略
   - 非英语用户群体明确，当前 STT 引擎仅英语可靠，且语言设置未贯通到桌面端

4. **权限系统的精细化与稳定性**
   - 代表：#91683 bypassPermissions 回归、#94265 worktree 切换弹窗、#97991 已信任仓库仍重询
   - 权限规则与 bypass 模式的边界行为不稳定，回归频繁，影响自动化工作流

5. **MCP 连接健壮性**
   - 代表：#82746 stdio MCP 服务器死后无自动重连（HTTP/SSE 有 backoff 重连，stdio 没有）、#97987 Figma MCP SSE 长响应 JSON 解析失败
   - 会话中 MCP 进程死亡后只能整程序重启，缺乏 `claude mcp reconnect` 类恢复手段

---

## 开发者关注点

1. **回归频次过高，升级需谨慎**
   - 2.1.284 出现首条消息即冻结（#98023）；2.1.259 破坏 bypassPermissions（#91683）；2.1.280/2.1.197 在无 AVX 老 CPU 上 SIGILL（#96402）
   - 建议：生产环境固定版本，升级前先查看当日 issue 区；加密主目录（eCryptfs）与旧 CPU 用户暂缓升级

2. **进程与资源滥用问题突出（Windows）**
   - 桌面应用持续高频 fork git 进程（#94478，~17 次/秒），单日 200 万进程并放大内核池泄漏至 6GB/天
   - 属于桌面端架构性隐患，影响长时运行稳定性

3. **工作树信任机制未闭环**
   - 即使仓库已信任，新建 worktree 仍重弹 "Workspace not trusted"（#97991）；worktree 位于默认目录外时每次切换都需批准（#94265）
   - 与官方 2026-08-17 宣称的"信任已 keyed 到主检出"不符

4. **渲染器稳定性与输出丢失**
   - #98019：classic renderer 在视口上方内容高度变化时丢弃/覆盖输出，verbose 模式更频繁
   - #97736：恢复会话后按左键进入 agents 时对话被 fork

5. **高热度功能兑现节奏**
   - #91870 的 function hooks 已给出"数周"承诺，社区关注度极高（223 评论）；#20697 的 Skills 同步有 157 个 👍，但暂无官方排期
   - 建议官方对高赞 feature request 增加 milestone/状态标注，降低社区焦虑

---

*本日报由 AI 工具分析师基于 GitHub 公开数据自动生成，仅供技术交流参考。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-09-29）

## 今日速览

昨天 Codex CLI 发布 0.158.0 稳定版，带来 TUI 复制粘贴增强和 MCP OAuth 支持；社区反馈的高频问题集中在 Windows/Linux 桌面应用挂起、复制粘贴回归以及沙箱权限报错。同时，大量由自动化机器人提交的 PR 被合并，主要涉及 Windows 沙箱修复、SQLite 性能优化和依赖安全更新。

## 版本发布

过去 24 小时共发布 6 个版本，其中稳定版 **rust-v0.158.0** 包含两项主要更新：

- 在 TUI 中可配置「选中即复制」和「右键粘贴」，且复制的记录内容保留 Markdown 格式（#47639, #47896, #48118）。
- 支持连接需要预注册 OAuth 客户端密钥的 MCP 服务器，可通过 `codex mcp add --oauth-clie...` 完成配置。

其余为 alpha 预发布版本：0.160.0-alpha.2、0.159.0-alpha.13、0.159.0-alpha.12、0.158.0-alpha.15.4、0.159.0-alpha.11，无详细变更说明。

👉 [查看全部 Releases](https://github.com/openai/codex/releases)

## 社区热点 Issues

**1. Linux Desktop 回归：升级后每个 prompt 都会挂起**（#48417，已关闭，23 评论，5 👍）  
Linux 用户在 26.924.22138 版本上遇到 Codex 桌面端全部卡死的问题，降级到 26.901.41600 后恢复正常。该问题直接切断核心工作流，社区反响强烈。

https://github.com/openai/codex/issues/48417

**2. TUI/SSH 环境下无法复制文本**（#48125，公开，14 评论，17 👍）  
用户报告在 Ubuntu 的 SSH 终端中使用 Codex CLI 时复制功能失效，标题语气激烈，说明该回归对日常使用影响极大。CLI 版本为 1.157.0。

https://github.com/openai/codex/issues/48125

**3. Windows 桌面版 elevated sandbox 报错 "requires effective :root read access"**（#46114，公开，14 评论，4 👍）  
用户升级后所有会话（新开和续聊）立即失败。该问题已在不同线程中反复出现，且通过管理员重开、修复和重置均无法解决。

https://github.com/openai/codex/issues/46114

**4. Windows 桌面应用卡在无限加载转圈**（#48522，公开，13 评论，0 👍）  
应用启动后永远停在 loading spinner，`app://-/index.html` 路由无法解析。浏览器版 ChatGPT 正常，问题仅限桌面端。

https://github.com/openai/codex/issues/48522

**5. Windows 冷启动卡在 "Loading"，重启 app-server 才能恢复**（#48466，公开，9 评论，3 👍）  
Windows 26.924 版本每次冷启动都会持久卡在加载界面，只有手动重启 app-server 才能恢复 UI。影响多用户且无临时解决方案。

https://github.com/openai/codex/issues/48466

**6. CLI 0.157.0 回归：中键/右键粘贴在 Konsole/Wayland 失效**（#48127，公开，8 评论，4 👍）  
Manjaro/KDE 用户报告 Wayland 下中键粘贴和右键粘贴均失效，与 #48125 同属剪贴板回归，但平台不同。

https://github.com/openai/codex/issues/48127

**7. 沙箱内 SSH 配置权限错误导致 `git push --dry-run` 失败**（#9286，公开，8 评论，5 👍）  
在沙箱中 SSH 配置文件被 nobody 所有，导致 Git 操作失败。该 issue 从 1 月持续至今，仍在影响 Linux 用户，说明沙箱文件权限处理一直没有根治。

https://github.com/openai/codex/issues/9286

**8. CLI 无法在长 plan 的继续提示处滚动到开头**（#48024，公开，6 评论，6 👍）  
Windows Terminal/WSL 下，长计划在等待确认时无法回滚查看顶部内容，影响复杂任务的检查。6 个👍 表明这一交互问题具有普遍性。

https://github.com/openai/codex/issues/48024

**9. MCP 客户端断开后不会自动重连**（#11489，公开，6 评论，8 👍）  
MCP 服务器连接断开后，工具和资源会一直不可用，直到手动 reload 或重启 CLI。模型 SSE 流已有重试机制，但 MCP 连接缺失，社区希望补齐。

https://github.com/openai/codex/issues/11489

**10. 希望能禁用 TUI 的“欢迎消息”**（#48991，公开，3 评论，5 👍）  
用户认为每次启动时的“Speak, friend, and enter a prompt”等句子属于无意义噪音，希望提供配置关闭。该 issue 体现了开发者对 CLI 输出克制性的需求。

https://github.com/openai/codex/issues/48991

## 重要 PR 进展

**1. 保留 SQLite vacuum 模式并暴露连接池初始化错误**（#49102）  
修复将 FULL 改为 INCREMENTAL auto-vacuum 时因 writer lock 阻塞连接池初始化的问题，同时让 SQLx 重试掩盖的原始错误直接暴露。

https://github.com/openai/codex/pull/49102

**2. Windows 沙箱 PowerShell 回退逻辑迁移至 exec server**（#49098）  
让远程控制器能在执行主机上正确解析沙箱兼容的 PowerShell 路径，解决 Elevated/MXC 场景下的命令执行失败。

https://github.com/openai/codex/pull/49098

**3. 升级 h2 依赖 0.4.16 → 0.4.19**（#49096）  
同步更新 Cargo 与 Bazel lockfile，修复底层 HTTP/2 库的安全与稳定性问题。

https://github.com/openai/codex/pull/49096

**4. Windows 沙箱策略事件不再记录敏感配置值**（#49067）  
此前配置解析错误可能包含整行凭据并写入持久化策略事件中，现在替换为自由格式错误文本，降低泄露风险。

https://github.com/openai/codex/pull/49067

**5. 创建子代理时保留待处理环境**（#49075）  
修复在环境尚未就绪时生成子代理会丢失起始环境配置/失败信息的问题，子代理现在能等待准备完成并正确继承环境。

https://github.com/openai/codex/pull/49075

**6. 增量跟踪 app-server 运行中的 turn 数**（#49084）  
优化线程状态变更时扫描所有运行时的计数逻辑，避免持锁重复计算，改进了优雅重启排水机制的并发性能。

https://github.com/openai/codex/pull/49084

**7. 远程插件请求复用 HTTP 连接池**（#49100）  
共享一个懒初始化的路由感知连接池，避免每次调用 `remote_plugin_service_config` 都创建新的 HTTP client，减少握手开销。

https://github.com/openai/codex/pull/49100

**8. 缓存解析后的插件清单**（#49099）  
在 PluginStore 层面共享 manifest 缓存，覆盖 marketplace 列表、插件加载、能力检测等流程，避免重复解析和频繁告警。

https://github.com/openai/codex/pull/49099

**9. Guardian 审批重新验证时跳过远程 Git 发现**（#49082）  
修复离线辅助执行器在 Guardian diff 展示阶段搜索 Git root 导致的卡顿，改用环境工作目录作为 diff 基准。

https://github.com/openai/codex/pull/49082

**10. TUI 中展示实时语音目录加载失败**（#49073）  
以前 `thread/realtime/listVoices` 失败会静默回退到内置目录，用户无法感知；现在错误会在 TUI 中呈现并中断启动流程。

https://github.com/openai/codex/pull/49073

## 功能需求趋势

- **桌面应用稳定性成为第一优先级**：超过 1/3 的热点 issue 与 Windows/Linux 桌面端挂起、无限加载、渲染崩溃有关，用户期待官方尽快修复且提供可诊断日志。
- **TUI 交互可配置化需求上升**：用户要求禁用欢迎消息、折叠 diff 可配置、剪贴板行为可自定义，说明开发者希望 CLI 减少“噪音”并适配不同终端习惯。
- **MCP 连接可靠性**：自动重连、OAuth 客户端密钥支持成为重点，社区需要更健壮的 MCP 基础设施。
- **沙箱权限与策略透明化**：Git/SSH 在沙箱内权限错误、Windows 策略拒绝缺少可操作诊断，用户要求错误信息更准确，不要把配置值泄露进日志。
- **模型行为与配额反馈**：会话路由不一致、agent 循环空转、配额重置失败等问题被反复提及，社区需要更高的行为一致性和结算透明度。

## 开发者关注点

- **Windows 桌面端是最主要的痛点**：启动挂起、无限加载、渲染崩溃、冷启动恢复困难等多个问题集中在 Windows 平台，且缺少有效的错误上报与恢复路径。
- **剪贴板回归影响范围广**：0.157.0 前后复制粘贴功能在多个终端（Konsole/Wayland、SSH、Windows Terminal）出现退化，用户对这类基础交互非常敏感。
- **沙箱导致 Git/SSH 操作失败**：文件权限、策略阻止等错误信息不够 actionable，用户往往需要绕过沙箱或手动修复才能继续工作。
- **MCP 断线后服务不可用**：缺少自动重连机制，迫使开发者频繁重启 CLI，影响长时间自动化任务的稳定性。
- **CLI 输出噪音被诟病**：“欢迎消息”和过多促销/提示内容让部分用户感到烦躁，他们期望更干净的启动输入体验。
- **配额与账户问题影响信任**：周配额重置失败、订阅标签混乱会直接阻断用户升级意愿，社区希望后台核算与前端显示保持一致。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-29

## 今日速览

昨日社区焦点集中在 **subagent 可靠性问题**（如 #22323 中 MAX_TURNS 被误报为成功的严重 bug）与 **非交互模式体验优化**（#29539 与 #29528 分别解决了自主执行和权限信任传递问题）。与此同时，官方维护团队正在推进 **AST 感知工具** 的系列调研（#22745 等），意图从根本上改善上下文效率。

## 版本发布

- **v0.63.0-nightly.20260928.g2fe7c2d3f** — 昨夜发布，无内置变更说明，[完整 changelog 请见 GitHub](https://github.com/google-gemini/gemini-cli/compare/v0.63.0-nightly.20260926.g2fe7c2d3f...v0.63.0-nightly.20260928.g2fe7c2d3f)

## 社区热点 Issues

过去24小时共更新 50 条 Issue，以下是评论数最多、最值得关注的 10 条：

1. **[#22323 Subagent 超过 MAX_TURNS 后被误报为 GOAL 成功](https://github.com/google-gemini/gemini-cli/issues/22323)** — `priority/p1`，13 条评论。`codebase_investigator` 子代理实际因轮次上限中断，却向主代理报告成功。这掩盖了真正的失败原因，可能导致错误决策，是近期 agent 可靠性的核心问题之一。

2. **[#19873 零依赖 OS 沙箱与事后意图路由](https://github.com/google-gemini/gemini-cli/issues/19873)** — 9 条评论。提议利用 Gemini 3 原生 bash 能力，同时通过 OS 级沙箱保证安全，属于中长期架构级 enhancement。

3. **[#21409 通用 agent 挂起问题](https://github.com/google-gemini/gemini-cli/issues/21409)** — 8 条评论，8 👍。当 CLI 将任务委托给 generalist agent 时永久挂起（创建文件夹也可能触发），用户反馈强烈，需等待数小时无响应。

4. **[#22745 评估 AST 感知的文件读取、搜索与代码库映射](https://github.com/google-gemini/gemini-cli/issues/22745)** — 7 条评论。计划通过 AST 感知工具（如精确读取方法边界）减少 token 噪声与轮次，是官方当前重视的效率优化方向。

5. **[#21968 Gemini 不主动使用 skills 和 sub-agents](https://github.com/google-gemini/gemini-cli/issues/21968)** — 6 条评论。模型几乎不会主动调用自定义 skills 和子代理，即使有相关描述。社区期望更强的工具调用主动性。

6. **[#22267 Browser Agent 忽略 settings.json 覆盖](https://github.com/google-gemini/gemini-cli/issues/22267)** — 4 条评论。`AgentRegistry` 虽能读取配置，但 Browser Agent 运行时完全忽略 `maxTurns` 等覆盖，导致配置失效。

7. **[#24246 超过 128 个工具触发 400 错误](https://github.com/google-gemini/gemini-cli/issues/24246)** — 3 条评论。当启用的工具数量超过 API 限制时直接报错，社区期望模型能动态限制工具范围。

8. **[#23571 模型在随机位置创建临时脚本](https://github.com/google-gemini/gemini-cli/issues/23571)** — 3 条评论。被限制 shell 执行后，模型改为在工作区遍地生成编辑脚本，严重干扰团队 Git 提交流程。

9. **[#22672 Agent 应阻止/劝阻破坏性行为](https://github.com/google-gemini/gemini-cli/issues/22672)** — 3 条评论。模型在复杂 Git 操作中偶尔使用 `--force` 或 `git reset`，社区希望内置更安全的替代操作引导。

10. **[#22598 Subagent 轨迹应支持 `/chat share` 共享](https://github.com/google-gemini/gemini-cli/issues/22598)** — 2 条评论。Subagent 的执行轨迹已保存但不可见，社区希望方便地共享审查，提升 eval 能力。

## 重要 PR 进展

过去24小时共 36 个 PR 更新，以下 10 个值得关注：

1. **[#29539 非交互模式启用自主计划执行](https://github.com/google-gemini/gemini-cli/pull/29539)** — `priority/p1`。在 Plan Mode 中用 `options.interactive` 隔离同步用户确认逻辑，使 headless 环境可直接推进计划执行。

2. **[#29448 修复无限认证循环](https://github.com/google-gemini/gemini-cli/pull/29448)** — 已合并。解决 Windows/WSL/headless 环境下的文件争抢、keyring 缺失与 supervisor 状态丢失引发的死循环问题。

3. **[#29499 文件工具操作序列化 + 原子写入](https://github.com/google-gemini/gemini-cli/pull/29499)** — `priority/p1`。修复并行 sub-agent 对同一文件的 read-modify-write 竞态，避免静默丢写与错误 diff。

4. **[#29457 用 glob 替换 `requestedExplicitly` 模糊匹配](https://github.com/google-gemini/gemini-cli/pull/29457)** — 修复 `read-many-files` 将图片、PDF 等二进制误判为显式请求的上下文膨胀 bug（#29045）。

5. **[#29476 修复交互模式 Enter 键挂起](https://github.com/google-gemini/gemini-cli/pull/29476)** — `priority/p1`。将文件编辑审批等输入确认与 IDE companion 事件解耦，解决集成终端下的无响应问题（#23297）。

6. **[#29502 Enter / Spacebar 在终端中可靠确认选项](https://github.com/google-gemini/gemini-cli/pull/29502)** — 统一 `useSelectionList` 等组件的键盘行为，兼容 Windows / 无 Kitty 协议的终端。

7. **[#29542 `maxChars <= 0` 时禁用截断](https://github.com/google-gemini/gemini-cli/pull/29542)** — 补上非正数守卫，避免索引切片边界问题导致的输出异常膨胀。

8. **[#29492 沙箱构建避免 shell 插值注入](https://github.com/google-gemini/gemini-cli/pull/29492)** — 在 `BUILD_SANDBOX=1` 下移除 shell 字符串拼接，防止 checkout 路径中的元字符执行任意命令。

9. **[#29450 a2a-server V1 到 V2 设置迁移](https://github.com/google-gemini/gemini-cli/pull/29450)** — 支持分层 V2 配置 schema，同时保持对扁平 V1 设置的内存兼容。

10. **[#29528 修复 headless 模式文件夹信任状态传播](https://github.com/google-gemini/gemini-cli/pull/29528)** — 在非交互模式下正确传递 `isTrusted === false`，消除 AppContainer 的 split-brain 状态，关联 #29031。

## 功能需求趋势

- **AST 感知工具成为主线** — #22745、#22746、#22747 三个 issue 构成完整追踪，从代码库映射、搜索到文件读取，官方正在系统性验证 AST 工具的收益，这将是解决上下文膨胀的长期方向。
- **Subagent 可靠性与自治** — MAX_TURNS 误报（#22323）、设置忽略（#22267）、主动调用不足（#21968）、轨迹可视化（#22598）等表明：当 agent 从演示走向实际开发，其完整的行为生命周期管理已成为最核心诉求。
- **并行协作与共享内存** — #18287 请求探索并行 sub-agent 的共享内存协作，虽被标记 blocked until parallel logic ready，但 PR #29499 已开始为并行场景的竞态打基础。
- **终端体验精细化** — Enter/Spacebar 确认（#29502）、Terminal resize 闪烁（#21924）、交互式创建 vite 卡死（#22465）说明社区对日常交互细节的容忍度正在降低。
- **自助式工具选择** — 400 错误（#24246）与工具数量膨胀表明：模型需要根据当前任务动态筛选工具，而不是一股脑加载全部。

## 开发者关注点

1. **Subagent“假成功”问题**：MAX_TURNS 中断被报告为 GOAL success（#22323），直接削弱了对 CLI 结果的信任感，开发者强烈要求区分“成功”与“中断”。
2. **配置不生效的挫败感**：`settings.json` 被读取却被运行时无视（#22267），symlink 文件不被识别为 agent（#20079），这类不一致让定制 workflow 异常脆弱。
3. **上下文与 token 成本焦虑**：二进制文件被误读（#29457）、Tactful Extraction 诉求（#19561）、任务跟踪的上下文腐化（#18836），都指向一个核心目标：在有限上下文中做更聪明的事。
4. **非交互/CI 场景成熟度**：headless 模式下的自主计划（#29539）、信任状态传播（#29528）、认证循环（#29448），表明开发者正在将 Gemini CLI 嵌入自动化流水线，而这一场景尚未完全稳定。
5. **安全默认值**：从 shell 注入（#29492）、grep 选项注入（#29536）、到破坏性 Git 命令（#22672），社区对 Agent 权限的边界与最小特权原则愈发关注。

---
*本日报数据来源：[github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)，涵盖 2026-09-28 至 2026-09-29 期间的更新。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-29

## 今日速览

Reasonix 于今日连发 v1.39.4、v1.39.3 稳定版及 Studio v2.21.0，重点修复 CLI/桌面端会话崩溃与远程 SSH 加载问题，并为 Studio 引入社区扩展市场与云端配置备份。社区侧，Windows 平台的会话数据丢失与 CPU 占用问题热度最高，多条相关 Issue 在过去 24 小时内被持续跟进或关闭修复。

## 版本发布

### Reasonix v1.39.4（稳定版）
**发布渠道：CLI + Desktop**
- 修复 `/mcp` 重试时对话卡住的问题
- 审查子代理不再被 8 轮上限打断
- 更换密钥时保留原变量名
- 远程标签页显示上下文内容

链接: https://github.com/esengine/DeepSeek-Reasonix/releases · [详细 Changelog](https://reasonix.io/changelog/v1.39.4/)

### Reasonix v1.39.3（稳定版）
**发布渠道：CLI + Desktop**
- 项目配置、serve 审批、宿主 git 与沙盒的安全加固
- 远程 SSH 会话恢复正常加载与发送

链接: https://github.com/esengine/DeepSeek-Reasonix/releases · [详细 Changelog](https://reasonix.io/changelog/v1.39.3/)

### Reasonix Studio v2.21.0（稳定版）
- 新增社区扩展市场：浏览、安装、发布技能、插件、MCP 服务器与主题
- 登录后可备份配置到云端
- 加强本地服务、宿主 git 和沙盒的安全边界

链接: https://github.com/esengine/DeepSeek-Reasonix/releases

## 社区热点 Issues

### 1. #11184（已关闭）v1.39.4 - "Move to trash" 归档旧版本行会产生重复项
**为什么重要**：Windows 用户在归档遗留数据行时，列表不减少反而新增约 2.15 MB 的重复项，直接造成存储与数据混乱。此问题已在今日被关闭，暗示已在 v1.39.4 中修复。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/11184

### 2. #11181（开启中）v1.38.11 - Desktop 空闲时 CPU 占用 1.4-1.7 核
**为什么重要**：`reasonix-desktop.exe --host-rpc` 进程在冷启动、无任何操作时持续占用高 CPU，严重影响桌面端日常使用体验与电量消耗。5 条评论确认可稳定复现。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/11181

### 3. #10495（开启中）v1.38.10 - 侧边栏标签被迁移为注入的主机块，同一旧会话被导入 5 次
**为什么重要**：Windows 迁移后用户自定的主题名称被系统注入的 host 块覆盖，且重复导入同一会话。该问题被标记为 `help wanted`，已有 9 条评论，属于 Windows 迁移链路的核心缺陷。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10495

### 4. #10508（已关闭）v1.38.10 - 恢复一个会话恢复出两行，删除其中一个会把两个全删掉
**为什么重要**：与 #10495 互为关联的数据丢失级缺陷，用户删除"重复项"时静默删除了整个会话。该问题在 v1.39.4 中被标记为已关闭，说明已修复。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10508

### 5. #11104（开启中）CLI - 上下文丢失
**为什么重要**：报告了 v1.38.10 中两个高危问题：自动压缩时上下文大量丢失、会话无法保存/重载。该问题同时影响 `tui`、`agent`、`windows` 三个维度并标记为 `data-loss`，社区已有 3 条评论。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/11104

### 6. #10633（开启中）v1.38.11 - PWSh 会话每条命令都报 "exit status 1"
**为什么重要**：当会话的 shell 解析为 `pwsh` 时，所有命令均失败，但应用却将 pwsh 标记为未安装。这会导致 Agent 在无效命令上反复重试、整轮浪费。影响 Windows 上使用 PowerShell 的核心工作流。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10633

### 7. #11166（已关闭）模型推理档位更新
**为什么重要**：社区要求更新 GPT-6 等新模型的 6 档推理设置（none/low/medium/high/xhigh/max）以及 Qwen 的新档位。该 Issue 被快速关闭，说明官方已完成了模型推理档位的支持（见 PR #11189）。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/11166

### 8. #10056（开启中）会话切换阻塞 ~800ms
**为什么重要**：大型会话切换时 UI 冻结约 1.2-1.5s，根因定位到 `SetActiveTab` 的性能瓶颈。社区开发者提交了详细根因分析（snapshot no-op 快速路径被待补派生文件否决），是当前关注度最高的性能问题。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10056

### 9. #11179（已关闭）Studio 2.21.0 - 回退菜单的标签在英文界面下显示中文
**为什么重要**：典型的国际化（i18n）缺陷，影响中文以外的所有用户。该问题被快速修复（PR #11180），体现了社区对多语言质量的敏感度。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/11179

### 10. #11174（开启中）Reasonix 在未经询问的情况下在工作区创建 reasonix.toml
**为什么重要**：用户正常使用后目录里多了配置文件，属于"未明确告知即写入用户目录"的隐性行为。该 Issue 由官方账号 @esengine 亲自提交，说明已被内部确认并着手修复。

链接: https://github.com/esengine/DeepSeek-Reasonix/issues/11174

## 重要 PR 进展

### 1. #11197（已合并）relay 上按模型设置推理档位
**功能**：中转站 API 的不同厂家模型可以各自独立声明 `supported_efforts`，连接级列表作为默认值。直接解决 #11192 的诉求，是 #11166 的重要后续。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11197

### 2. #11194（已合并）声明模型可选模式；OpenAI Pro 支持 GPT-5.6/GPT-6
**功能**：新增模型能力声明机制，首个落地的是 OpenAI 在 GPT-5.6/GPT-6 上的 Pro 模式（`reasoning.mode: "pro"`）。大幅扩展了推理能力的自定义维度。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11194

### 3. #11189（已合并）GPT-5.6/GPT-6 与 Qwen3.8 推理档位更新
**功能**：根据 OpenAI 官方文档补齐 GPT-5.6/GPT-6 的完整 effort 阶梯，以及 Qwen 的 4 档设置，并确保 UI 菜单中展示的档位与实际发送的参数一致。关闭 #11166。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11189

### 4. #11187（已合并）归档遗留版本行时应归档其所有版本
**功能**：修复归档遗留版本行时，旧版本"不断回来"的问题。根因是每次 rewind 都会 fork 一个 live head，归档只删了最上方一行。从根上解决了 #11184 描述的"Archive to trash 后列表又加载出新的"问题。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11187

### 5. #11193（已合并）新增四个精选 provider 预设
**功能**：新增 OpenRouter、OpenAI、Gemini、Volcengine Ark 四个一键配置预设。此前官方预设只针对国产编程套餐或中转服务，海外开发者首次获得开箱即用的配置体验。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11193

### 6. #11200（已合并）OpenAI 精选预设改用 Responses API
**功能**：修复 #11199 — 预设中 `kind = "openai"`（Chat Completions）与模型表声明 GPT-6 仅支持 Responses API 的矛盾。预设默认切换为 Responses API，并正确区分 reasoning 参数。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11200

### 7. #11183（开启中）检测循环输出并在提醒后重试一次
**功能**：模型陷入重复输出同一段文本/推理的循环时，现有守卫机制（依赖工具轮或静默）无法识别。该 PR 通过监测流式输出的滚动尾部（rolling tail），能发现循环并在提示模型后重试一次。已开放评审。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11183

### 8. #11196（已合并）更新前询问是否重启，仅在回滚时固定版本
**功能**：修复用户在 2.20.0 固定到 2.21.0 时出现的"pin 不再匹配"、"Clear pin 置灰"等困惑状态。更新前会明确询问，只有回滚时才会建议固定版本。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11196

### 9. #11074（已关闭）CLI 输入框支持 vi 命令模式
**功能**：为 composer 输入框新增可选的 vi 命令模式（`[ui].commandmode = "vi"`），支持 `h l j k 0 $ ^ i a x I A p D` 等常见编辑键。对 vim 用户提升显著。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11074

### 10. #11198（已合并）浏览器面板只在真正有遮挡时才暂停
**功能**：修复了"明明没有被遮挡却提示页面被覆盖"的误判。原因在于旧的 `covered()` 检测方式判断了顶层元素而非真正会接住点击的元素。该问题会导致 Agent 误报页面被 block，影响浏览器代理的可靠性。

链接: https://github.com/esengine/DeepSeek-Reasonix/pull/11198

## 功能需求趋势

从 24 小时内的 Issues/PR 中可以提炼出以下需求方向：

- **新模型推理档位的精细化配置**（#11166、#11189、#11194、#11197）：社区对 GPT-5.6/GPT-6 的 Pro 模式、各模型独立 effort 档位表现出了强烈需求，且要求 API 层与模型层分离配置。
- **Desktop 数据安全与可靠性**（#10495、#10508、#11184、#11104）：会话重复导入、归档反而复制数据、删除误操作导致全删 —— 用户对数据丢失零容忍，数据操作必须做到可预期、可恢复。
- **Windows 平台性能优化**（#11181、#10056、#10190）：空闲 CPU 占用、会话切换阻塞、导航延迟，Windows 用户体验是当前生产力的最大短板。
- **流程中被"隐性写入"**（#11174）：配置文件（reasonix.toml）和权限规则在工作区或用户目录的生成缺少明确提示，用户期望更透明的配置管理。
- **国际化与主题一致性**（#11179、#11168、#11188）：英文界面出现中文字样、Logo 不跟随主题色，虽是"小问题"，但社区敏感度极高。
- **社区生态搭建**（Studio v2.21.0）：技能、插件、MCP、主题的统一市场与云备份正式拉开帷幕，是 Studio 版本的核心重点。

## 开发者关注点

- **Windows 数据丢失/迁移缺陷是最高频痛点**：#10495、#10508、#11184 等均为 Windows 专属问题，且集中在"迁移升级"和"归档删除"两个高风险操作上。明日值得关注这些 Issue 的修复版验证情况。
- **上下文压缩不靠谱**：#11104 报告了自动/手动压缩后上下文被截断的严重问题，直接影响长会话 Agent 的可用性，希望开发团队尽快定位到压缩算法的剪枝策略。
- **远程 SSH 会话的稳定性**：v1.39.3 的发布说明中特别提到"远程 SSH 会话恢复正常加载与发送"，说明此前该功能存在连接级别的问题。
- **多语言质量需重视**：英文界面出现中文标签（#11179）并非孤例，海外用户对 UI 文案的本地化完成度越来越敏感。
- **新模型支持节奏加快**：GPT-6、Qwen3.8、OpenAI Pro mode 在同一天内完成档位适配、模式声明和预设修正，说明 Reasonix 对前沿模型的上线响应速度在明显加快，开发者可以放心跟进新模型。
- **官方对社区反馈的响应在加速**：#11166、#11179、#11184、#11174 等均在 24 小时内完成关闭或由官方直接提交修复 PR，社区参与的价值得到明显体现。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报（2026-09-29）

## 1. 今日速览

昨日发布了 **v1.18.33**，修复了 Cloudflare AI Gateway 超时、MCP 浏览器启动失败上报及调试输出敏感信息泄露等核心问题。社区关注焦点集中在 **ACP 会话目录忽略用户配置**（#50236）这一从 v2.0.4 引入的回归 Bug 上，同时 **TUI 内存耗尽 OOM**（#51761）和 **LiteLLM 代理成本记录为 $0.00**（#51958）两个新提交的 Issue 也引发了较多讨论。PR 侧亮点包括提升跨会话 prompt 缓存命中率的 **共享指令前缀隔离** 修复（#51960），以及为 Cloudflare AI Gateway、Bedrock、LiteLLM 等提供商的连接改进。

## 2. 版本发布

**v1.18.33**（核心 Bugfix 版本）

- **Cloudflare AI Gateway**：模型现在正确遵循 provider 的响应及流超时设置。
- **MCP 浏览器启动**：当启动器立即退出时，会明确报告启动失败，而非静默挂起。
- **调试配置输出**：现在会脱敏凭据和敏感请求头，防止日志泄露。
- **Gemini thinking**：修复了相关处理逻辑（详情见 Release 说明）。

## 3. 社区热点 Issues

1. **[#50236] acp: session/new catalog 忽略 config providers、agents 和默认模型（自 v2.0.4）**
   作者: @cpu150 | 评论: 10 | 👍: 3
   回归 Bug：`opencode acp` 构建 session 目录时不再加载用户配置，导致 Ollama 等自定义 provider、自定义 agent 和默认模型全部丢失，Zed 等 ACP 客户端只能看到内置模型。集成类问题，影响面较大。
   https://github.com/anomalyco/opencode/issues/50236

2. **[#51761] TUI OOM：v2 中间歇性 24-28GB 内存耗尽**
   作者: @aasb13 | 评论: 3
   严重稳定性问题：TUI 以约 500MB/s-1GB/s 的速率线性增长内存并最终被 OOM 杀死，无 GC 回落，且无法稳定复现，排查难度高。
   https://github.com/anomalyco/opencode/issues/51761

3. **[#42225] TUI 在终端缩小时不重新布局，留下陈旧宽度**
   作者: @HermanShi | 评论: 8
   终端从大变小（或初始附加）时 TUI 不重排，导致空白或溢出。浏览器环境（xterm.js）下可复现，影响使用体验。
   https://github.com/anomalyco/opencode/issues/42225

4. **[#39864] Codex OAuth Fast 模型吞吐未达到预期**
   作者: @AidenGeunGeun | 评论: 5
   通过 ChatGPT 登录后，Fast 模型条目发送 `service_tier: "priority"`，但实际速度与官方 Codex CLI 不一致，涉及 HTTP 与 Responses 两条路径的差异。
   https://github.com/anomalyco/opencode/issues/39864

5. **[#51958] LiteLLM 代理响应在缺少成本头时记录 $0.00 费用**
   作者: @BrunoSilva-neuro | 评论: 1
   当 `x-litellm-response-cost` 头等于 `x-litellm-respons` 前缀时被 LiteLLM 省略，导致成本记录错误。可直接关联到 #51957 的修复。
   https://github.com/anomalyco/opencode/issues/51958

6. **[#51961] 桌面端技能查看器请求裸 "SKILL.md"，报 "File not found"**
   作者: @HoangHuy-cgv | 评论: 1
   桌面应用技能查看器以裸文件名 `SKILL.md` 请求资源而非完整路径，服务器正确返回 404。需要合规性检查的桌面端 Bug。
   https://github.com/anomalyco/opencode/issues/51961

7. **[#46685] 子代理权限/错误事件让外部集成无法感知根会话进度**
   作者: @anyingiit | 评论: 4
   子会话事件（`permission.asked`、`session.error`）只带子会话 ID 和父 ID，父会话状态持续显示 `busy`，外部集成会误判为阻塞或等待输入。
   https://github.com/anomalyco/opencode/issues/46685

8. **[#51951] test(core): AppProcess 中断测试存在准备竞态，导致 flaky**
   作者: @saulalfonsos | 评论: 1
   中断测试在负载机器上偶发失败，原因是子进程在安装 SIGTERM handler 之前就宣告 ready。测试稳定性问题，已有对应修复 PR #51952。
   https://github.com/anomalyco/opencode/issues/51951

9. **[#40086] [已关闭] 请求添加持久化 ui.sidebar.enabled 配置以禁用 Context 侧边栏**
   作者: @kamlesh1808 | 评论: 3 | 👍: 2
   用户希望用 `opencode.json` 持久关闭侧边栏，目前每次重启都会重新出现。典型 UI 配置需求。
   https://github.com/anomalyco/opencode/issues/40086

10. **[#51941] [已关闭] 请求支持在配置中自定义模型排序**
    作者: @ianfiness | 评论: 2
    用户希望按 `opencode.jsonc` 中定义的顺序展示模型选择器，而不是固化的排序逻辑。提升模型选择体验的配置诉求。
    https://github.com/anomalyco/opencode/issues/51941

## 4. 重要 PR 进展

1. **[#51960] fix(core): 将会话特定数据移出共享指令前缀**
   作者: @rekram1-node
   将 session ID 从指令基线 `<env>` 块中移除，使子代理间的指令前缀保持一致，从而提升跨会话 prompt 缓存命中率。性能优化类 PR。
   https://github.com/anomalyco/opencode/pull/51960

2. **[#51962] [已关闭] feat(core): 输出 token 请求上限设为 256k**
   作者: @rekram1-node
   部分模型（如 Kimi K2.6）输出上限接近百万，此前会请求全部，现截断到 256k，避免不必要的超长请求。
   https://github.com/anomalyco/opencode/pull/51962

3. **[#51963] fix(core): 从环境变量读取 Cloudflare AI Gateway 账号与网关 ID**
   作者: @rekram1-node
   修复仅设置 `CLOUDFLARE_ACCOUNT_ID` 和 `CLOUDFLARE_GATEWAY_ID` 时请求失败的问题。
   https://github.com/anomalyco/opencode/pull/51963

4. **[#51957] fix(llm): 捕获 LiteLLM 成本头并注入 finish providerMetadata**
   作者: @BrunoSilva-neuro
   修复 LiteLLM 代理响应成本被记录为 $0.00 的问题（对应 Issue #51958）。
   https://github.com/anomalyco/opencode/pull/51957

5. **[#51953] fix(session): 重放出错 assistant 轮次时保留 thinking blocks**
   作者: @ggbdpq
   修复重放失败轮次时剥离推理状态（包括 thinking 块）导致 Anthropic 拒绝请求的问题。
   https://github.com/anomalyco/opencode/pull/51953

6. **[#51956] fix(core): 将 v1 setCacheKey 映射到 compatibility 层**
   作者: @rekram1-node
   修复 v1 配置项 `provider.<id>.options.setCacheKey` 在 v2 中被忽略的问题。
   https://github.com/anomalyco/opencode/pull/51956

7. **[#51959] fix(ai): 默认绑定 Bedrock Claude thinking blocks**
   作者: @rekram1-node
   适配 Claude 5.1+ 的 thinking 签名绑定机制，避免因未绑定而失败。
   https://github.com/anomalyco/opencode/pull/51959

8. **[#51911] feat(opencode): 在 env block 中暴露运行版本、provider 和模型**
   作者: @PascalBourdier
   将 OpenCode 版本、当前 provider 和模型注入上下文，便于 agent 在 AGENTS/CLAUDE 场景中正确回答“你的引擎和版本”。
   https://github.com/anomalyco/opencode/pull/51911

9. **[#51954] fix(cli): 取消表单时不再设置非零退出码**
   作者: @jlongster
   修复 #51948 引入的 Linux/Windows 单元测试失败，同时保持 `exitCode` 语义正确。
   https://github.com/anomalyco/opencode/pull/51954

10. **[#51895] fix(opencode): github.com 使用公共 Copilot host**
    作者: @dajiaohuang
    GitHub.com OAuth 账户若存储 `enterpriseUrl: "github.com"`，现会正确使用公共 Copilot 端点，而非误判为企业版。
    https://github.com/anomalyco/opencode/pull/51895

## 5. 功能需求趋势

- **配置与集成稳定性**：ACP 客户端集成（如 Zed）对自定义 provider/agent 的加载依赖强，`session/new` 回归是社区首要关注点；Cloudflare AI Gateway 与 GitHub Copilot host 的修复也表明多平台集成是持续方向。
- **UI/UX 灵活性**：用户明确要求更多持久化配置项（禁用侧边栏、自定义模型排序），并关注终端布局变化下的响应能力。
- **性能与资源管理**：TUI OOM 问题、跨会话缓存命中率优化、输出 token 上限控制，反映出社区对运行开销和响应速度的重视。
- **模型与提供商适配**：LiteLLM 成本头、Bedrock thinking blocks、Google API 错误分类、Cloudflare 超时等修复，显示社区在多模型/provider 接入上的实际使用障碍集中。

## 6. 开发者关注点

- **回归 Bug 反馈迅速**：v2.0.4 引入的 ACP 配置回归在 8 天内获得 10 条评论，说明集成开发者对破坏性变更敏感。
- **内存与稳定性焦虑**：TUI OOM 问题虽无明确触发条件，但增长速率惊人（500MB/s-1GB/s），是高风险稳定性事件。
- **成本记录准确性**：LiteLLM 代理场景下 $0.00 成本记录影响用户对用量和费用的判断，属于直接可见的功能缺陷。
- **测试与 CI 可靠性**：AppProcess 中断测试的竞态问题已影响 Linux/Windows CI，开发者希望测试自身更健壮。
- **敏感信息与安全性**：调试配置输出脱敏是正面改进，用户对凭据泄露风险有较高警惕。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 — 2026-09-29

## 1. 今日速览

今日发布 `v0.2.0-rc.1` 候选版本，主要聚焦对话交互体验与图片失效重传可靠性优化，为 `0.2.0` 正式版奠定基础；仓库过去 24 小时内无新增 Issue 或 PR，社区讨论暂处沉淀期。

## 2. 版本发布

### dsh-v0.2.0-rc.1  
[GitHub Releases 页面](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.0-rc.1)

作为 `0.2.0` 系列的首个候选版本，汇总了自 `v0.1.7-rc.2` 以来的主要变更，重点包括：

- **体验优化**：优化对话进行中和完成状态的实时动画、用时信息、过程信息间距，提升视觉流畅度与信息可读性（感谢 @yixiangihsiang、@imccyu）。
- **可靠性增强**：改善会话在图片失效后自动重传并继续请求的可靠性，减少交互中断（感谢 @CreatixChu）。
- **桌面端更新**：补充桌面端更新提示的版本信息及后续流程，完善升级体验。

## 3. 社区热点 Issues

过去 24 小时内无新增或更新的 Issue，暂无具体热点条目。

## 4. 重要 PR 进展

过去 24 小时内无新增或更新的 PR，暂无具体进展条目。

## 5. 功能需求趋势

由于今日无新增 Issue，暂无法从新反馈中提炼趋势。结合 `v0.2.0-rc.1` 的发布内容，社区近期关注方向集中在：

- **对话交互体验**：实时动画、状态反馈、时序信息展示的精细打磨。
- **会话容错能力**：图片等资源失效后的自动重传与请求续跑机制。
- **桌面客户端完善**：版本更新提示的完整性与升级流程的顺畅性。

## 6. 开发者关注点

从本次 Release 涉及的贡献者可看出，开发者对以下反馈尤为重视：

- 对话过程中动画与耗时信息的实时性和视觉一致性。
- 长会话中因图片失效导致请求中断的痛点，要求更可靠的自动恢复机制。
- 桌面端更新流程中版本信息不完整、提示不清晰的体验问题。

建议关注后续 `v0.2.0` 正式版的变更日志，上述问题预计将得到更全面的覆盖。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-29

## 1. 今日速览

今日无新版本发布，社区焦点集中在**桌面端与网关的可靠性修复**上：数十个 PR 围绕桌面 WebGL 渲染崩溃、Windows 文件监听风暴、会话状态持久化等方向展开。Issues 侧最受关注的是 #126634（同一环境下“工具依赖检查”在 gateway 进程内返回结果不一致且无法诊断）与 #118208（peer run 在单一会话上串行排队、长轮次导致后续任务被饿死）。会话状态一致性与消息可靠投递仍是当前最核心的痛点。

## 3. 社区热点 Issues

本统计周期内共 8 条活跃 Issue，以下全部列出：

### #126634 — 工具依赖检查在长期 gateway 进程中持续误报 False 且难以诊断
- **作者**: @davebunn1 | 创建: 2026-09-28 | 更新: 2026-09-29 | 评论: 3
- **链接**: https://github.com/NousResearch/hermes-agent/issues/126634
- **为什么重要**: 相同 shell 环境下 `check_computer_use_requirements()` 返回 True，但在长期存活的 gateway 进程里始终返回 False，且错误信息缺少上下文，几乎无法定位。这类“进程内/进程外结果不一致”问题会严重阻碍自动化运维与调试，社区已有 3 条讨论说明复现与排查过程。

### #110316 — messages_read 的 id 是 SQLite rowid 而非稳定标识符，导致重复插入
- **作者**: @snaffuo | 创建: 2026-09-13 | 更新: 2026-09-28 | 评论: 3
- **链接**: https://github.com/NousResearch/hermes-agent/issues/110316
- **为什么重要**: 实测中同一消息在不同读取间 id 从 `297874` 变成 `298338`，产生 3 条字节完全相同的行。该问题直接影响会话数据的一致性与增量同步逻辑，风险标签为 `sweeper:risk-session-state`，是追踪已久的会话状态类缺陷。

### #118208 — peer run 在单一会话上串行排队，长轮次饿死后续任务最多 30 分钟
- **作者**: @henrypmccoy | 创建: 2026-09-21 | 更新: 2026-09-28 | 评论: 1
- **链接**: https://github.com/NousResearch/hermes-agent/issues/118208
- **为什么重要**: 所有 `hermes peer run` 都挤进同一个 Bot Chat 会话并串行占用 turn 租约，一个健康但长时间运行的 turn 会让所有后续请求阻塞到租约超时。对依赖 agent 做并发任务分发的团队来说，这是明显的可用性缺陷。

### #127064 — 源安装的桌面版更新检查永久失败：找不到 PM 管理的 Git 且错误被缓存
- **作者**: @cruzlxyz | 创建: 2026-09-28 | 更新: 2026-09-28 | 评论: 0
- **链接**: https://github.com/NousResearch/hermes-agent/issues/127064
- **为什么重要**: Windows 源安装场景下，“检查更新”永远提示 `head-unavailable`，即使包管理器已装好 Git。失败的检查结果还会被缓存，用户无法通过重试恢复，影响新用户的安装体验。

### #127057 — display_identity 为 NULL 的重复 assistant 行绕过所有显示去重逻辑
- **作者**: @kira-nakagawa | 创建: 2026-09-28 | 更新: 2026-09-28 | 评论: 0
- **链接**: https://github.com/NousResearch/hermes-agent/issues/127057
- **为什么重要**: 线上实例中发现 **1,784 行额外数据，分布在 462 个重复组**，每组最多 6 份完全相同的消息。由于这些行的 `display_identity` 为 NULL，现有的去重谓词全部失效，导致前端渲染与实际存储结构不一致，是典型的数据质量隐患。

### #127044 — pm update git 在 Windows `.windows.1` 版本上拼接出不存在的下载文件名
- **作者**: @lingofuse07-dot | 创建: 2026-09-28 | 更新: 2026-09-28 | 评论: 0
- **链接**: https://github.com/NousResearch/hermes-agent/issues/127044
- **为什么重要**: Git for Windows 发布 `build == 1` 的版本时，`fetch_url` 构造的 `PortableGit-{tag}.{build}-{arch}.7z.exe` 实际不存在，导致 `hermes pm update/install git` 永远无法固定 Git 版本。对 Windows 用户来说是直接的安装阻断问题。

### #127047 — WhatsApp 桥接 SIGTERM 退出码 -15 被当作致命错误，引发崩溃循环
- **作者**: @allissonbrito | 创建: 2026-09-28 | 更新: 2026-09-28 | 评论: 0
- **链接**: https://github.com/NousResearch/hermes-agent/issues/127047
- **为什么重要**: 使用进程管理器（如 s6）重启容器时，WhatsApp 桥接正常收到 SIGTERM（退出码 -15），但 `_check_managed_bridge_exit()` 的竞态条件将其判定为致命适配器错误，导致整个 gateway 反复崩溃重启。属于影响生产稳定性的高频运维问题。

### #127053 — 共享会话的 `[Name]` 前缀保留了显示名自带的方括号
- **作者**: @ilyazub | 创建: 2026-09-28 | 更新: 2026-09-28 | 评论: 0
- **链接**: https://github.com/NousResearch/hermes-agent/issues/127053
- **为什么重要**: 网关在构造 `gateway/run_inbound.py` 的发送者前缀时，未剥离 display name 中已有的 `[]`，导致共享会话中的消息前缀变成 `[[Name]]`。虽然属于 UI 细节，但持续影响多人会话的可读性。

## 4. 重要 PR 进展

从过去 24 小时更新的 50 个 PR 中选出以下 10 个重点：

### #127052 — 修复桌面端 WebGL 字形图集在共享清除/上下文丢失/系统恢复时未重建的问题
- **作者**: @OutThisLife | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/127052
- **要点**: 所有桌面终端 tab 常驻挂载，共享同一 WebGL glyph atlas。`clearTextureAtlas()` 被调用后其他 xterm 实例没有重建图集（上游修复仅在 0.20.0-beta 中），导致终端渲染异常。此 PR 在共享清除、上下文丢失和系统恢复三个场景下强制重建，是桌面体验的关键修复。

### #127065 — WhatsApp 桥接 SIGTERM（-15）按非致命处理，修复崩溃循环
- **作者**: @dskwe | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/127065
- **要点**: 直接修复 #127047。将 `_check_managed_bridge_exit()` 对退出码 -15 的判定改为非致命，无论 shutdown 标志是否设置。首个 WIP 版本已提交，后续将补充回归测试。

### #127038 — 流式回复在“空工具 shell”上保持不丢失
- **作者**: @austinpickett | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/127038
- **要点**: 修复 turn 以 `content=''` 且 `tool_calls` 结尾时，hydrate 过程将流式回复错误折叠为无文本 assistant shell 的问题。避免用户在工具调用后看不到已生成的回复。

### #127033 — 重生成回合内的重定向不再丢弃部分回复与用户修正
- **作者**: @austinpickett | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/127033
- **要点**: 修复在 regenerated turn 流式输出时发送修正消息，导致部分回复和修正内容从界面消失的问题。`appendMidTurnUserMessage` 的 sealed bubble 处理被修正，保留屏幕上的中间内容。

### #127032 — Windows fs.watch 事件风暴回退到轮询模式
- **作者**: @austinpickett | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/127032
- **要点**: 实测 Windows 上 `%LOCALAPPDATA%\hermes\desktop-plugins` 的 `ReadDirectoryChangesW` 可产生 **约 18 万事件/秒** 的 rename 风暴。该 PR 在 win32 下引入轮询 fallback，直接消除桌面端磁盘监听导致的高 CPU/IO 问题。

### #126988 — 重连会话重放时不再派发被截断的尾部消息
- **作者**: @austinpickett | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/126988
- **要点**: `session.events.since` 返回 `truncated: true` 时，`fetchSessionReplay` 此前未检查该标志，把不完整的重放尾部当作完整事件流派发，可能造成会话状态错乱。此 PR 修复了重连场景下的消息完整性问题。

### #127011 — 懒创建会话行时补充 git 元数据；不再 fallback 到错误的 lane 标签
- **作者**: @austinpickett | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/127011
- **要点**: 双缺陷修复：一是会话行懒创建前 `_hydrate_session_cwd` 找不到行、cwd 元数据从未写入；二是 git probe 失败时回退到错误的 lane 名称。修复后新会话首条提交即可获得正确的 git context。

### #126997 — Windows 端不再硬编码 System32 下的 OpenSSH 路径
- **作者**: @austinpickett | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/126997
- **要点**: 桌面端三处硬编码 `%SystemRoot%\System32\OpenSSH\ssh.exe` 改为从 PATH 解析实际 ssh 客户端，与 `SshConnection` 的行为保持一致，解决用户安装非系统自带 OpenSSH 时连接失败的问题。

### #127045 — 网站黑名单规则剥离开端口和 userinfo
- **作者**: @changeroa | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/127045
- **要点**: `security.website_blocklist` 中带端口（`evil.com:8443`）或 userinfo 的规则此前无法命中主机。此 PR 修复 `_normalize_rule`，确保黑名单规则对完整 URL 形态生效。

### #127046 — 停止的回复与失败 turn 错误卡片跨重启持久化
- **作者**: @OutThisLife | 创建: 2026-09-28
- **链接**: https://github.com/NousResearch/hermes-agent/pull/127046
- **要点**: 修复两个持久化缺口：Stop 路径未写入 `display_metadata`，失败 turn 的错误卡片在应用重启后消失。现在这两类状态都能在会话历史中保留，提升可恢复性与可审计性。

## 5. 功能需求趋势

从今日活跃的 Issue 和 PR 中可提炼出社区资金最关注的方向：

- **桌面端稳定性与生命周期管理**：约一半的 PR 集中在 Desktop 应用，覆盖 WebGL 渲染、快捷键路由、SSH 客户端解析、fs.watch 风暴、更新检查失败等细节，说明桌面端已进入“精修”阶段。
- **会话数据一致性与持久化**：多个 Issue/PR 涉及重复行、消息 ID 稳定性、流式回复丢失、停止/失败状态跨重启持久化，数据可靠性是当前最集中的技术债。
- **Windows 平台兼容性**：至少 4 个 issue/PR 直接提到 Windows（PortableGit 404、OpenSSH 硬编码、fs.watch 风暴、源安装更新检查），Windows 是当前 bug 高发平台。
- **网关消息调度与并发模型**：#118208 揭示的画一会话串行化问题，叠加 reconnect replay 截断，说明多租户/并发场景下的消息投递机制需要结构性改进。
- **进程生命周期与故障恢复**：WhatsApp 桥接 SIGTERM 崩溃循环、容器重启下的竞态问题，反映出社区对“被 supervisor 托管”这一部署形态的适配需求在上升。

## 6. 开发者关注点

- **诊断困难是最大的痛点**：`#126634` 明确提到同一环境下进程内外结果不一致且错误信息“无法诊断”，开发者需要更丰富、可低成本的 log 与状态导出能力。
- **重复数据问题反复出现**：rowid 当成稳定 ID、`display_identity = NULL` 绕过去重、断线重放截断，这些都导致 UI 与存储不一致，开发者对“一次写入、稳定读取”的诉求强烈。
- **Windows 用户的安装与体验摩擦**：从源安装更新检查失联到 Git 固定失败，再到 SSH 客户端解析错误，Windows 上的“首次体验”仍有明显短板。
- **长生命周期进程的可靠性**：gateway 长期运行后出现的工具检查假阴性、peer run 饿死、桥接 SIGTERM 误判，都指向同一个方向——需要针对“常驻进程 + 外部托管”场景做系统性鲁棒性加固。
- **社区协作积极**：虽然今天的问题数量不算少，但多个高优 bug 在数小时内就有对应 PR 提出（如 #127047→#127065），`sweeper` 系列风险标签也表明维护团队正在有意识地按会话状态、消息投递、平台兼容性等维度跟踪技术债。

:::
