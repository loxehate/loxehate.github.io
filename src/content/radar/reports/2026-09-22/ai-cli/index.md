---
title: "AI CLI 工具社区动态日报"
published: 2026-09-22
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-22

> 生成时间: 2026-09-22 02:07 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-22）

> 数据来源：各工具 2026-09-22 社区动态日报；Issue/PR 数为日报筛选出的"热点/重要"条目，非当日全量。

## 1. 生态全景

六大主流 AI CLI 工具当日动态呈现三个共性：**Windows 平台稳定性问题集中爆发**，成为几乎每家工具共同的"最短木板"；**成本透明与配额治理**从零散抱怨上升为系统性诉求，用户心态正从"信任代理"转向"管控代理"；**发布节奏两极分化**——成熟产品趋于平稳，新锐产品高频迭代。积极信号是各工具对社区反馈的响应速度普遍加快（Hermes 多个 Issue 在 24 小时内便获得对应修复 PR），且 MCP/ACP 互操作协议、企业级网络能力（代理/MITM/审计）正成为下一轮差异化竞争焦点。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 重要 PRs | Releases | 迭代信号 |
|---|---|---|---|---|
| Claude Code | 10 | 2 | 0 | 节奏放缓，处于稳定维护期；Windows 问题积压严重 |
| OpenAI Codex | 10（含同族系列问题） | 10 | 8 个预发布（rust v0.155–v0.157） | Rust 重写后高频打磨，迭代速度全场最快 |
| Gemini CLI | 10 | 10 | 1 个 nightly | 节奏平稳，P0–P3 分级 + EPIC 跟踪，工程治理最规范 |
| DeepSeek Reasonix | 10 | 10 | 0 | 桌面端"快发版-快回归"循环，CLI/TUI 微创新活跃 |
| OpenCode | 10 | 10 | v1.18.32 补丁 | 开源社区驱动，功能迭代快，但计费/账户问题拖累口碑 |
| Hermes | 18（活跃） | 50（活跃） | v0.21.4（汇总约 1,800 个 PR） | 开发最活跃，Issue→PR 闭环速度最快 |
| DeepSeek Harness | 0 | 0 | 0 | 过去 24 小时无活动 |

值得注意：Claude Code 当日 0 release、仅 2 个 PR，与其社区讨论的"高话题密度"形成反差，说明产品已过功能扩张期，进入体验与稳定性攻坚阶段；Codex 单日 8 个预发布则处于典型的"重写后填坑期"。

## 3. 共同关注的功能方向

**① Windows 平台稳定性（5 家工具同时中招）**
- Claude Code：UNC 路径不支持（#45297，30👍）、MSIX 静默更新崩溃（#89912）、shell snapshot 截断至 7.2KB（#90421）
- Codex：Windows 桌面版容量报错系列（#45835/#46780/#47146 等）、沙箱 `requires effective :root read access`（#46114）
- Reasonix：1.38.11 升级后 sidebar 空白（#10620）、pwsh 误判导致全部命令失败（#10633）
- OpenCode：ConPTY 管道损坏多字节/长输出（#50458）
- Hermes：`fcntl.F_RDLCK` 缺失导致 Windows 启动崩溃（#118026，P0，已修复）

**② 成本透明与配额治理（4 家）**
- Claude Code：后台子代理无上限消耗 170 万 tokens（#94013）、高成本代理需前置确认（#95313）、statusline 暴露分模型速率限制（#73770）
- Codex：配额异常消耗 Meta 追踪器（#41220，51 评论）、两轮对话耗尽 5 小时配额（#42987）
- OpenCode：Credits 凭空消失且 usage 历史空白（#50452）、周/月/滚动用量口径混乱（#50457）
- Gemini：token 消耗死循环（#28362，P1）

**③ Agent/子代理结果可信度（4 家）**
- Gemini：子代理 MAX_TURNS 中断被误报为 GOAL 成功（#22323，P1）
- Claude Code：模型编造用户输入并执行操作（#95945，单会话 14 次）
- Hermes：`same_tool_failure_halt` 误杀多轮诊断（#118695）
- Reasonix：新增客户端重复循环检测与自动重试（PR #10431）
- 共性结论：**"接口说成功但实际没生效"的静默失败模式，让开发者比面对显式报错更不安。**

**④ 沙箱与工具链健壮性（4 家）**
- Claude Code：沙箱误保护 `.git/config.lock` 阻塞 git 写入（#78818）
- Reasonix：单个路径无法 canonicalize 导致所有命令 exit 126（#10505，无 fallback）
- Gemini：沙箱扩展请求无限递归直至堆内存溢出（PR #29332）
- OpenCode：shell 工具在快速退出命令后永久卡 `running`（#50424，复活老 issue #29294）
- 共性结论：**"一损俱损"的粗粒度沙箱设计正在反噬用户信任，需要可降级、可诊断、按路径细分的控制。**

**⑤ 会话/历史数据治理（5 家）**
- Codex：日志膨胀至 700MB–2GB（#24948）、compaction 重写存储并永久破坏对话记录（#44363）
- Reasonix：会话排序混乱（#10625）、CLI 全局 session 管理诉求（#10632）
- Gemini：`--list-sessions` 未标记当前会话导致可误删（#29133）
- OpenCode：Console 迁移后 Go 工作区丢失（#50201）
- Hermes：curator ledger 每操作写入全量 SHA256，5 周增长 5MB/profile（#118674）

**⑥ 配置作用域与插件生态（4 家）**
- Codex：仓库级插件市场与配置支持（#18115，67👍）
- OpenCode：`chat.model` 动态切换模型 hook（#50448）、本地插件 scoped 包解析修复（#50466）
- Hermes：多 profile 配置串写回归（#118431，v0.21.3 引入）
- Claude Code：statusline 自定义速率指标的扩展诉求（#73770）
- 共性结论：**工具正从"单机个人工具"走向"团队化配置治理"。**

## 4. 差异化定位分析

| 工具 | 定位与目标用户 | 技术路线 | 核心优势 | 当前最大短板 |
|---|---|---|---|---|
| **Claude Code** | 专业开发者的全栈 Agent 工作台（CLI+桌面+Cowork 协作），面向深度使用 agent 的团队 | Node 生态 + 沙箱物化 + MCP 深度集成 | 功能纵深最完整，社区讨论质量最高，需求更"进阶" | 迭代放缓；Windows 体验断档；成本失控案例引发信任危机 |
| **OpenAI Codex** | OpenAI 订阅体系内的主力 CLI，面向 Plus/Pro 用户 | Rust（codex-rs）重写 + TUI + 桌面端 + 企业网络适配 | 单日 8 个预发布的极高迭代频率；代理/MITM CA/审计字段等企业能力快速补齐 | 配额计费争议；compaction 破坏历史数据；Windows 桌面端问题密集 |
| **Gemini CLI** | 工程治理最规范的通用 CLI，面向 Google 生态与有审计需求的开发者 | TypeScript + 子代理基础设施（浏览器 agent）+ Auto Memory + ACP 互操作 | P0–P3 优先级体系与 EPIC 跟踪；隐私安全设计（日志脱敏、策略目录权限校验）；文件写入原子化 | Agent 自主性不足（不主动调用 skills/子代理）；话题声量相对低 |
| **DeepSeek Reasonix** | 成本敏感用户，对接 DeepSeek/GLM 等低成本模型 | 桌面端优先 + CLI 双轨，TUI 交互持续创新 | 模型性价比；CLI 交互微创新活跃（vi 命令模式、数字键直选、per-provider 超时） | 升级回归频发（1.38.8→1.38.11 连续三版出现同类 sidebar/沙箱故障）；沙箱容错性差 |
| **OpenCode** | 开源社区驱动、插件生态开放的聚合型 CLI，面向插件作者与自制工作流开发者 | 聚合模型（Zen）+ 插件 hook + TUI | 开放度最高（`chat.model` 动态路由、本地插件体系）；社区贡献者直接参与发版 | 账户/计费体系不稳定；聚合模型兼容性参差；老 issue 被 stale bot 误关引发不满 |
| **Hermes** | Agent 框架/网关型工具（非纯 CLI），面向需要将 agent 接入消息平台（Discord/Telegram）或复杂 profile/记忆管理的团队 | 多消息适配器 + mnemosyne 记忆系统 + skills 生态 + 多 profile | 开发速度最快（50 条活跃 PR，~1,800 PR 汇总发布）；Issue→修复响应闭环效率显著；记忆与 profile 能力独有 | 跨平台兼容薄弱（fcntl P0）；规模增长下的存储与稳定性债务 |

## 5. 社区热度与成熟度

- **最活跃（功能扩张期）**：Hermes 以 18 个活跃 Issue + 50 条活跃 PR 位居榜首，1,800 个 PR 合并后才打一个补丁标签，说明合并速度远超发布节奏；Codex 单日 8 个预发布，处于 Rust 重写后的高频打磨期。
- **最稳定（成熟期）**：Claude Code 当日仅 2 个 PR、无发版，社区讨论重心已从"能不能用"转向"体验如何更好"（主题定制、速率指标暴露）；Gemini CLI 发布节奏平稳，优先级和标签体系最清晰，工程治理最具参考价值。
- **快速但欠稳（追赶期）**：Reasonix 活跃但被自身回归拖累——用户反馈"退回 1.38.7 虽然每天黑屏 5 次但至少界面清晰完整"；OpenCode 功能迭代快，但计费与账户事故消耗了大量社区信任。
- **流程信号**：Reasonix、OpenCode、Codex 三家的社区均出现对 stale bot 误关仍存活 issue 的不满（如 OpenCode #38835 复活 #13980、#50424 复活 #29294），提示维护者需在自动化关闭流程中加入人工复核。

## 6. 值得关注的趋势信号

1. **Windows 是 AI CLI 规模化落地的最大缺口**：5 家工具同日出现 Windows 专属故障，且尚无明显领先者。Windows 开发团队选型时应对候选工具的桌面端、shell 集成、路径处理做专项压测，而非默认跟随社区热度。

2. **成本管控正在成为选型硬指标**：预算上限、昂贵操作前置确认、用量口径统一、分模型速率暴露——这些此前少有人提的功能在今日成为多工具 Top issue。团队引入 agent 时应同步建立 token 成本基线与审批流，而非事后查账。

3. **Agent 可信度比能力更重要**：误报成功（Gemini MAX_TURNS）、编造用户输入（Claude Code）、假成功返回（Hermes mnemosyne_invalidate）集中出现，暴露了"自主性"与"可验证性"之间的矛盾。要求工具提供完整操作审计轨迹、真实终止原因和可观测的子代理轨迹，应成为选型底线。

4. **沙箱机制进入精细化竞争阶段**：粗粒度"整目录只读/一损俱损"的设计正在被淘汰，按路径粒度控制、可降级 fallback、进程生命周期感知是下一个竞争点。对重度使用 git、跨盘符、WSL 等复杂环境的团队，沙箱边界精度直接决定日常生产力。

5. **桌面端与协作功能是第二曲线**：多工具桌面端问题同日集中爆发（Cowork 不可用、sidebar 空白、沙箱失败、恢复死锁），侧面印证各家都在押注 GUI 场景。CLI 仍是核心阵地，但桌面端体验将决定 mid-tier 用户的去留，值得持续跟踪。

6. **企业网络合规能力正在成为标配**：MITM CA 证书支持（Codex #47132）、系统代理遵循（Codex #47142/Gemini #29401）、启动参数凭据脱敏（Gemini #29328）、线程创建者审计持久化（Codex #47113/#47114）、策略目录写权限校验（Gemini #29336）——面向企业客户的"安全基线"正在快速成型，具备这些能力的工具将在采购评估中占据先机。

7. **数据生命周期管理是隐性技术债务**：日志膨胀 GB 级、curator ledger 无限增长、compaction 破坏历史、迁移丢工作区——多工具在"会话数据"上均缺乏成熟的压缩、GC 与可恢复机制。对长期运行的团队，工具的存储设计（是否有去重、有界化、可导出）应纳入技术评估，避免一年后为数据治理买单。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-09-22 ｜ 数据源：github.com/anthropics/skills**

---

## 1. 热门 Skills 排行（按评论量 Top 8）

**① #1298 skill-creator 触发评测修复** — [PR #1298](https://github.com/anthropics/skills/pull/1298) · **open**
当前讨论度最高的 PR。修复 skill-creator 触发评测的三大缺陷：worker 命令探针互相竞争、Windows 下 `select()` 管道失败、运行时失败被误判为非触发。由于这些问题直接导致「假阴性/假阳性」评测结果，6 月创建至今仍持续更新（9/16），是官方评测工具链的核心阻塞点。

**② #1771 proofcore-contract-auditor（智能合约审计）** — [PR #1771](https://github.com/anthropics/skills/pull/1771) · **open**
面向 Web3 开发者的 Solidity/Rust 合约静态分析 Skill，并将审计证明锚定至 TON 区块链（零存储 Merkle 协议）。代表社区向垂直行业安全领域扩展的新方向，9 月中旬创建，活跃度较高。

**③ #1742 mcp-builder 兼容 mcp≥2** — [PR #1742](https://github.com/anthropics/skills/pull/1742) · **open**
`streamablehttp_client` 在 mcp>=2.0.0 中更名，且自定义 Header 改为 `create_mcp_http_client` 配置。该 PR 修复此硬兼容问题（对应 Issue #1668），技术方案明确，属基础能力修补。

**④ #1703 md2video-audio（Markdown 转视频）** — [PR #1703](https://github.com/anthropics/skills/pull/1703) · **open**
零成本将 Markdown 经 Marp 转为幻灯片，并生成带拟人化配音的 MP4 视频。切中「文档生成 + 多媒体」复合场景，社区关注度高。

**⑤ #1734 docx 孤儿批注检测** — [PR #1734](https://github.com/anthropics/skills/pull/1734) · **open**
检测 docx 中无归属的孤儿 comment。PR 描述为空，仍处完善阶段，代表 Office 文档技能族持续补细节的社区流量。

**⑥ #525 pyxel（复古游戏开发）** — [PR #525](https://github.com/anthropics/skills/pull/525) · **open**
3 月创建、9/16 仍在更新，生命周期长。覆盖 Pyxel 游戏实现、确定性无头运行、逐帧检查与任务态验证，工程化设计完整，但迟迟未合入，社区在持续关注其落地。

**⑦ #514 document-typography（排版质检）** — [PR #514](https://github.com/anthropics/skills/pull/514) · **open**
解决 AI 生成文档的孤行换行、寡段标题滞留页底、编号错位等排版问题。关注度高但 3 月以来未更新，热度回落。

**⑧ #1615 scnet-hpc（HPC 集群运维）** — [PR #1615](https://github.com/anthropics/skills/pull/1615) · **open**
基于 SSH + Slurm 的 SCNet HPC 集群运维 Skill，含作业生成、集群发现、分区/模块指导，代表社区向科研计算/运维场景延伸。

> 其他值得关注：#822 AWT（零代码 E2E 测试）、#723 testing-patterns（测试全栈模式）、#486 ODT（OpenDocument 处理）、#83 skill-quality/security-analyzer（元评测 Skill）。

---

## 2. 社区需求趋势（来自 Issues）

**🔒 安全与信任边界（声量最大）**
- [#492](https://github.com/anthropics/skills/issues/492)（43 条评论）：社区 Skill 在 `anthropic/` 命名空间下分发，伪装官方 Skill，构成信任边界滥用——用户可能误给社区 Skill 授予高权限。
- [#1175](https://github.com/anthropics/skills/issues/1175)：在 SKILL.md 内编写 SharePoint 访问控制逻辑时的安全性与上下文窗口顾虑。

**📦 Skill 分发与管理**
- [#228](https://github.com/anthropics/skills/issues/228)（8 👍）：企业组织级 Skill 直接共享，替代「下载 .skill → 聊天工具传输 → 手动上传」的繁琐路径，是最受期待的功能。
- [#189](https://github.com/anthropics/skills/issues/189)（9 👍）：`document-skills` 与 `example-skills` 插件内容雷同，安装后重复注入，浪费上下文。
- [#62](https://github.com/anthropics/skills/issues/62)：用户 Skill 文件意外消失并报错，稳定性信任受损。

**🧪 评测与触发可靠性（基础设施痛点）**
- [#556](https://github.com/anthropics/skills/issues/556)（7 👍）：`run_eval.py` 对所有查询均 0% 触发，评测结果完全失真。
- [#202](https://github.com/anthropics/skills/issues/202)：skill-creator 自身违反最佳实践，偏「开发者文档」而非可执行的 Skill。

**⚡ 上下文窗口效率**
- [#1487](https://github.com/anthropics/skills/issues/1487)：`claude-api` Skill 单次注入约 156k tokens，直接耗尽上下文窗口，暴露 Skill 越权注入问题。

**🧩 社区提案的新方向**
- [#1329](https://github.com/anthropics/skills/issues/1329)：compact-memory——用符号化符号压缩长时运行 Agent 的持久记忆。
- [#412](https://github.com/anthropics/skills/issues/412)：agent-governance——AI Agent 安全治理模式（策略执行、威胁检测、审计追踪）。
- [#1385](https://github.com/anthropics/skills/issues/1385)：推理质量门流水线（预校准 → 对抗审查 → 交付验证）。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、修复目标明确或作者持续投入，近期落地概率较大：

- **[#1298](https://github.com/anthropics/skills/pull/1298) ＋ [#1769](https://github.com/anthropics/skills/pull/1769)**：两条 PR 均在修复 skill-creator 触发评测「0% recall/100% precision」的公认缺陷（关联 #1721 / #556），属于官方评测链路的关键阻塞，竞争合入的可能性高。
- **[#1742](https://github.com/anthropics/skills/pull/1742)**：修复 mcp>=2 的硬兼容问题（#1668），若不合并 mcp-builder 在新环境下将持续不可用。
- **[#1765](https://github.com/anthropics/skills/pull/1765)**：修复 DOCX/PPTX/XLSX redlining 在非 UTF-8 环境的乱码（#1707），小而稳的确定性修复。
- **[#1790](https://github.com/anthropics/skills/pull/1790)**：docx 缺少 `document.xml.rels` 时导致注释损坏，缺陷定位清晰、改动范围小。
- **[#822](https://github.com/anthropics/skills/pull/822) AWT** 与 **[#723](https://github.com/anthropics/skills/pull/723) testing-patterns**：测试类 Skill 双雄，均于 9 月 19–21 日持续更新，社区对自动化测试生成需求旺盛。
- **[#1771](https://github.com/anthropics/skills/pull/1771)（合约审计）、[#1703](https://github.com/anthropics/skills/pull/1703)（md2video）**：新功能型 PR，作者活跃，若能通过安全审查，有望成为下一批官方 Skill 成员。

---

## 4. Skills 生态洞察

> **一句话总结：社区最集中的诉求不是「更多新 Skill」，而是 Skill 机制本身的可靠性（触发评测、上下文窗口控制、分发去重）与安全性（命名空间信任边界）——基础设施稳定后，Web3 合约审计、HPC 运维、记忆压缩等垂直场景的 Skill 才能健康生长。**

---

# Claude Code 社区动态日报 — 2026-09-22

## 今日速览

Windows 平台问题集中爆发成为今日焦点：UNC 路径不支持、MSIX 静默更新失败、shell snapshot 截断等问题持续发酵，其中 Cowork 在 Windows 上完全不可用已持续两周。与此同时，成本控制成为社区最热议题——后台子代理无上限消耗 170 万 tokens 的案例引发广泛讨论。此外，多个旧 issue 今日关闭，但新暴露的模型行为问题（编造用户输入）值得警惕。

## 版本发布

过去 24 小时无新版本发布。

---

## 社区热点 Issues

### 1. Cowork 在 Windows 下不支持 UNC 路径
**#45297** | 评论 29 | 👍 30 | 更新 2026-09-22

Windows 用户使用 UNC 网络路径作为工作目录时，Cowork 功能完全无法工作。该 issue 自 4 月创建至今持续获得关注，是当前社区中讨论热度最高的 Windows 相关问题，已累积 30 个 👍，说明受影响用户群体广泛。

🔗 https://github.com/anthropics/claude-code/issues/45297

---

### 2. 后台子代理无上限消耗 170 万 tokens
**#94013** | 评论 3 | 更新 2026-09-21

主模型在 Desktop 会话中启动了 3 个后台研究子代理（Fable 5.1），共消耗 170 万 tokens，全程无需审批、无成本提示。Agent 工具也未提供预算控制选项。该 issue 直接戳中用户对成本失控的恐惧，与 #95313 形成呼应。

🔗 https://github.com/anthropics/claude-code/issues/94013

---

### 3. 请求：生成昂贵代理前需用户确认
**#95313** | 评论 6 | 更新 2026-09-21

社区针对成本失控提出的解决方案——在启动高成本子代理前强制用户确认。该 issue 创建仅 4 天便有 6 条评论，说明成本问题正在成为社区共识性痛点。

🔗 https://github.com/anthropics/claude-code/issues/95313

---

### 4. 桌面应用自定义主题/强调色（与 CLI 对齐）
**#79305** | 评论 9 | 👍 19 | 更新 2026-09-21

用户要求桌面应用支持自定义主题和强调色，目前仅提供浅色/深色/高对比度三种模式。请求者指出，在多显示器场景下，颜色是用户快速识别窗口的关键。获得 19 个 👍，是最受关注的功能需求之一。

🔗 https://github.com/anthropics/claude-code/issues/79305

---

### 5. statusline 暴露分模型周速率限制
**#73770** | 评论 6 | 👍 18 | 更新 2026-09-21

开发者希望 statusline 命令的 JSON 输入中包含 Opus/Sonnet/Fable 各自的周速率限制数据，以便自定义状态栏显示与 `/status` 一致的速率指标。目前仅有两个条目的 `rate_limits` 字段远不够用，获得 18 个 👍。

🔗 https://github.com/anthropics/claude-code/issues/73770

---

### 6. Cowork Windows 10 上 sandbox-helper 崩溃
**#93071** | 评论 7 | 更新 2026-09-22

Windows 10 22H2 x64 上，Cowork 报 `sandbox-helper: no Plan9 drive shares mounted`，device_bash 自 9 月 8 日起完全不可用，且重启应用、更新应用均无法恢复。严重程度高，影响面大。

🔗 https://github.com/anthropics/claude-code/issues/93071

---

### 7. MSIX 静默更新重启失败，应用无法启动
**#89912** | 评论 5 | 更新 2026-09-22

桌面应用空闲触发的静默更新在重启时失败（错误码 0x80070020），导致应用彻底无法启动，shell 报 "Claude is already in use"。Windows 用户受影响严重，且 #94432 确认了同样的问题源头。

🔗 https://github.com/anthropics/claude-code/issues/89912

---

### 8. Windows 上 shell snapshot 被截断至 ~7.2KB
**#90421** | 评论 1 | 更新 2026-09-22

Bash 工具的 shell snapshot 在 Windows Desktop 上被静默截断至约 7.2KB，截断位置恰在 `export PATH='...'` 中间，未闭合的引号导致后续所有 Bash 调用失败（`unexpected EOF`）。

🔗 https://github.com/anthropics/claude-code/issues/90421

---

### 9. MCP elicitation 在 VSCode 交互会话中被自动拒绝
**#79174** | 评论 7 | 更新 2026-09-22

VSCode 扩展会话声明了 MCP `elicitation` 能力，但每次 `elicitation/create` 请求都被自动拒绝且无 UI 提示。权限弹窗和 AskUserQuestion 都能正常渲染，唯独 elicitation 静默失败，MCP 生态集成深度不足。

🔗 https://github.com/anthropics/claude-code/issues/79174

---

### 10. 沙箱物化 `.git/config.lock` 阻塞 git 写入
**#78818** | 评论 6 | 更新 2026-09-21

WSL 中链接 worktree 场景下，沙箱将 transient 的 `.git/config.lock` 也纳入只读保护，导致后续 git config 写入被阻塞。属于典型的沙箱边界精细度问题，影响 git 重度用户的日常操作。

🔗 https://github.com/anthropics/claude-code/issues/78818

---

## 重要 PR 进展

过去 24 小时 PR 活动较少，仅 2 条，全部列出如下：

### 1. diff 工具在只读 shell 命令后跳过不必要的 refetch
**#95423** | OPEN | 更新 2026-09-21

修复 diff 面板的一个性能问题：此前每次 Bash/PowerShell 调用后都会重新拉取 diff，即使该命令是工具标记为只读的（如 `ls`、`git status`、`cat`、grep）。现在读取 shell 的 `isReadOnly` 状态，只读命令后跳过 refetch。

🔗 https://github.com/anthropics/claude-code/pull/95423

---

### 2. 为 claude.ai 的 GitHub 连接问题添加 issue 模板
**#95932** | CLOSED | 更新 2026-09-21

新增 issue 表单，用于收集 claude.ai 上 GitHub 连接问题的诊断信息（截图、操作步骤、期望行为），并自动套用 `github-integration` 标签。属于社区反馈流程的规范化改进。

🔗 https://github.com/anthropics/claude-code/pull/95932

---

## 功能需求趋势

从近期 issue 中可提炼出五个最受关注的功能方向：

**1. 成本透明与控制**
- 后台子代理无 token/轮次/时间上限（#94013）
- 生成昂贵代理前需用户确认（#95313）
- statusline 暴露分模型周速率限制（#73770）

**2. Windows 平台稳定性修复**
- UNC 路径支持（#45297）
- MSIX 更新机制修复（#89912）
- shell snapshot 截断问题（#90421）
- Cowork sandbox-helper 修复（#93071）

**3. 桌面应用体验完善**
- 自定义主题/强调色（#79305）
- Code 标签页应用 Dyslexic 字体（#83867）

**4. 非交互/CI 场景支持**
- DesignSync 无非交互授权路径（#91063）
- 讨论模式：只读会话与可导出产物（#85848）

**5. 沙箱机制精细化**
- worktree 场景下 config.lock 误保护（#78818）
- macOS 沙箱 ARG_MAX 溢出（#73468）

---

## 开发者关注点

**Windows 平台稳定性成最大痛点**。今日热点 issues 中过半与 Windows 相关，从 UNC 路径、MSIX 更新崩溃到 shell snapshot 截断，多个问题严重阻塞日常工作流，且部分问题（如 #93071）持续两周未解决，引发用户不满。

**成本失控焦虑加剧**。170 万 tokens 被后台子代理消耗且无任何提示的案例，让用户对 AI 代理的自主性产生警惕。社区不仅要求预算上限，更要求在启动高成本任务前进行人工确认——这反映了从"信任代理"到"管控代理"的心态转变。

**沙箱边界问题影响生产工作流**。macOS 的 ARG_MAX 溢出、WSL 的 config.lock 误保护、Windows 的 sandbox-helper 崩溃，说明沙箱机制在真实复杂环境下仍有大量边界情况需要打磨。

**模型行为可靠性引发关注**。多个 issue 报告模型编造数据字段意义（#94650）、编造用户输入并执行操作（#95945，单会话 14 次）、TUI 渲染改变内容语义（#87790）。这些问题触及 AI 辅助开发工具的信任根基。

**MCP 生态集成深度不足**。elicitation 能力声明了却不工作（#79174）、Filesystem 扩展因 outputSchema draft-07 被拒绝（#94351），说明 MCP 工具链在协议实现完整性和兼容性上仍有明显短板。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 — 2026-09-22

## 今日速览

今日 Codex 仓库活跃度极高：共发布 8 个 Rust 预发布版本（v0.155 至 v0.157 系列），核心围绕稳定性和平台适配。社区层面，**配额/速率限制异常消耗**仍是最大痛点（多个相关 Issue 持续获得大量评论），同时 **Windows 桌面端问题集中爆发**（模型容量报错、沙箱失败、UI 异常等）。PR 方面以内部重构和代理/网络配置修复为主，另有若干 TUI 交互体验改进。

---

## 版本发布

过去 24 小时内发布了 8 个预发布版本，均为 Rust 实现（codex-rs）的 Alpha 迭代：

- **rust-v0.157.0-alpha.1 / alpha.2 / alpha.3**（3 个版本）
- **rust-v0.156.0-alpha.13 / alpha.14 / alpha.16 / alpha.17**（4 个版本）
- **rust-v0.155.0-alpha.16.1**（补丁版本）

发布说明仅为版本标记，未提供详细的变更日志。但从今日合并的 PR 来看，这些版本可能包含了代理设置支持、TUI 交互修复、Windows 文件系统助手变量保留等改动。

---

## 社区热点 Issues（10 个）

### 1. #41220 — Codex 用量/配额异常消耗跨问题追踪器
- **作者**: @FromAriel | **评论**: 51 | 👍 17
- **链接**: https://github.com/openai/codex/issues/41220
- **重要性**: 社区反馈最集中的元问题，汇总了多起订阅配额或付费额度消耗速度远超预期的报告。已被标记为 `[Meta]` 追踪器，说明 OpenAI 官方已知悉该问题族。涉及面广（CLI、App、不同模型），是当前社区最关心的计费/配额问题。

### 2. #44561 — 默认关闭 whimsy 效果（Astra 星空动画）
- **作者**: @EdenGottlieb | **评论**: 26 | 👍 69（今日最高赞）
- **链接**: https://github.com/openai/codex/issues/44561
- **重要性**: 69 个 👍 表明社区对 Astra 模型的星空视觉特效强烈不满。用户认为该效果默认开启且无法通过简单方式关闭，甚至被误认为屏幕故障。属于 UI/UX 层面的高优先级反馈。

### 3. #42987 — GPT-6 Astra Medium 两轮对话耗尽 Plus 5 小时配额
- **作者**: @GustavoMartins123 | **评论**: 26 | 👍 15
- **链接**: https://github.com/openai/codex/issues/42987
- **重要性**: 与 #41220 同族，但特别指出 GPT-6 Astra 模型在 Windows 平台下配额消耗异常夸张。15 个 👍 说明大量用户有类似经历，需官方核查 Astra 模型的 token 计数或配额计算逻辑。

### 4. #24948 — Codex 会话日志膨胀至 700MB-2GB
- **作者**: @sriinnu | **评论**: 32 | 👍 4
- **链接**: https://github.com/openai/codex/issues/24948
- **重要性**: 长期未解决的性能问题（5 月提出），日志膨胀源于重复的 compaction 历史和原始工具输出。32 条评论说明不少用户受影响，且 issue 仍在活跃讨论中。

### 5. #45626 — Windows 桌面版：首轮完成后无法发送后续消息
- **作者**: @7umen | **评论**: 20 | 👍 3
- **链接**: https://github.com/openai/codex/issues/45626
- **重要性**: 桌面端严重功能性 Bug，Send 按钮变灰，新建/已有会话均受影响。Windows 专属问题，影响面大，20 条评论表明有多位用户复现。

### 6. #45835 / #46780 / #47146 / #47144 / #46172 — “Selected model is at capacity” 系列
- **作者**: 多位用户 | **评论**: 各 2-20 条
- **链接**: https://github.com/openai/codex/issues/45835 | https://github.com/openai/codex/issues/46780 | https://github.com/openai/codex/issues/47146 | https://github.com/openai/codex/issues/47144 | https://github.com/openai/codex/issues/46172
- **重要性**: 多个独立 Issue 报告同一问题：模型容量报错导致无法使用。涉及 Windows 桌面端和 CLI，多个订阅档位（Plus/Pro Lite/Pro）。可能指向服务端容量调度或客户端错误处理缺陷。今日新增 #47146 和 #47144 两个新 Issue，问题仍在持续。

### 7. #18115 — 仓库级插件市场与配置支持
- **作者**: @yshrsmz | **评论**: 16 | 👍 67
- **链接**: https://github.com/openai/codex/issues/18115
- **重要性**: 67 个 👍 显示社区强烈期望在 `.codex/config.toml` 中支持仓库级插件配置，目前插件市场仅限用户级作用域。这是 Codex 在企业/团队协作场景中落地的重要功能需求。

### 8. #24191 — 远程 compact 产生巨大记录导致会话不可恢复
- **作者**: @huzp611 | **评论**: 7（已关闭）
- **链接**: https://github.com/openai/codex/issues/24191
- **重要性**: 虽然显示 CLOSED，但该问题与 #28866、#30932 同为“compaction 导致会话膨胀/OOM”问题族。远程 compact 存储超大记录，使后续恢复超过上下文窗口。已关闭说明可能有官方修复，但同系列 issue 仍在追踪。

### 9. #44363 — 上下文压缩重写存储数据并永久破坏对话记录
- **作者**: @noclascio | **评论**: 7
- **链接**: https://github.com/openai/codex/issues/44363
- **重要性**: 与 #24191 相关但更严重：compaction 不仅膨胀，还会原地重写存储的 rollouts，导致原始对话记录永久丢失。对依赖 Codex 审计轨迹的企业用户是重大问题。

### 10. #46114 — Windows 桌面版沙箱失败：`requires effective :root read access` 无法修复
- **作者**: @Chappy-des | **评论**: 10 | 👍 3
- **链接**: https://github.com/openai/codex/issues/46114
- **重要性**: 桌面版更新后所有会话（新/旧）立即失败，沙箱初始化报错。用户尝试非提权、管理员重启、应用修复/重置均无效。Windows 平台功能性阻断问题。

---

## 重要 PR 进展（10 个）

### 1. #47142 — 独立 Web 搜索遵循系统代理设置
- **链接**: https://github.com/openai/codex/pull/47142
- **内容**: 修复独立 Web 搜索绕过系统代理的问题，改为使用已配置的 `HttpClientFactory`。对需要代理上网的企业/受限网络用户是重要修复。

### 2. #47132 — 支持调用方提供的 MITM CA 证书
- **链接**: https://github.com/openai/codex/pull/47132
- **内容**: 新增 `network.mitm_ca` 配置（含 `certificate_file` 和 `private_key_file`），用于可信代理配置。适合企业环境中的 TLS 拦截场景。

### 3. #47137 — 防止横向选择触发自动滚动
- **链接**: https://github.com/openai/codex/pull/47137
- **内容**: TUI 交互修复：横向拖动选择文本时不再误触发自动滚动。改进了终端下的文本选择体验。

### 4. #47130 — 从 gpt-5.6-sol 移除 `ultrafast` 服务层级
- **链接**: https://github.com/openai/codex/pull/47130
- **内容**: 调整模型服务层级，gpt-5.6-sol 仅保留 `priority`（Fast）。可能影响依赖该层级的 API 调用方。

### 5. #47129 — 保留扩展工具环境中的外部工作目录
- **链接**: https://github.com/openai/codex/pull/47129
- **内容**: 修复扩展调用中因工作目录无法转换为主机路径而被丢弃的环境。提升跨平台扩展兼容性。

### 6. #47108 — 保留 Windows 文件系统助手所需运行时变量
- **链接**: https://github.com/openai/codex/pull/47108
- **内容**: 修复 Windows 下 `SystemDrive` 和 `LOCALAPPDATA` 变量在 helper 进程中被过滤的问题。直接影响 Windows 沙箱功能正常运行。

### 7. #47101 — Realtime WebSocket 连接遵循代理配置
- **链接**: https://github.com/openai/codex/pull/47101
- **内容**: 修复 Voice/WebRTC 侧带连接绕过代理策略的问题，改为通过共享的 `WebSocketClient` 连接。与 #47142 互为补充。

### 8. #47100 — 保留有界 TUI 任务响应中的助手回答
- **链接**: https://github.com/openai/codex/pull/47100
- **内容**: 提高响应预算，避免截断助手回答。同时修复线程列表因缩短而丢失条目的问题。TUI 体验优化。

### 9. #47114 / #47113 — 线程生命周期时间戳与创建者身份持久化
- **链接**: https://github.com/openai/codex/pull/47114 | https://github.com/openai/codex/pull/47113
- **内容**: 两项后端增强：持久化线程条目的开始/完成时间戳，以及在 rollouts/SQLite 中记录线程创建者身份（`creator_user_id`/`creator_account_id`）。对审计和企业管理场景有用。

### 10. #47096 — 保持 TUI 提示信息紧贴输入框
- **链接**: https://github.com/openai/codex/pull/47096
- **内容**: TUI 布局优化，确保活动指示器和输入预览不会将使用提示与编辑区分离。小但影响日常体验的改进。

---

## 功能需求趋势

从今日 Issues 和 PRs 中可提炼出以下社区关注方向：

1. **配额透明化与速率限制修复**（Issue #41220, #42987, #40880 等）：用户对配额消耗速度、用量计费一致性有强烈诉求，要求官方核查后端计数逻辑。

2. **Windows 平台稳定性**（Issue #45626, #46114, #46767, #47138 等）：桌面端连续出现更新后功能失效、沙箱崩溃、UI 异常等，Windows 用户占比高，问题反馈集中。

3. **可配置的 UI/UX 控制**（Issue #44561, PR #47096, #47100）：社区希望更多 UI 行为可通过配置关闭（如 whimsy 特效），TUI 交互细节持续优化。

4. **仓库级/项目级配置能力**（Issue #18115）：插件、市场、配置的作用域从用户级扩展到仓库级，是团队协作场景的刚需。

5. **代理与网络策略支持**（PR #47142, #47101, #47132）：系统代理、MITM 证书等企业网络场景的支持正在完善，显示 OpenAI 在服务企业客户。

6. **会话/上下文管理**（Issue #44363, #24191, #28866）：compaction 策略的可靠性和资源消耗问题持续受到关注。

---

## 开发者关注点

- **配额消耗异常**：多份报告显示 Plus/Pro 订阅在 Astra 等模型上配额消耗速度远超预期，部分用户两轮对话即耗尽 5 小时用量。开发者期望官方明确 token 计数口径，排查后端计费逻辑（#41220, #42987）。

- **Windows Desktop 质量**：桌面端成为问题高发区——容量报错、沙箱失败、按钮失灵、崩溃等问题频发，且部分问题“无法通过重装/修复解决”。Windows 用户体验亟需改善（#45626, #46114, #45835）。

- **会话膨胀与 OOM**：日志/rollout 文件膨胀至 GB 级，`codex resume` 可能 OOM 或 SIGKILL。已有多个 Issue 追踪但长期未彻底解决（#24948, #28866, #30932）。

- **容量错误提示泛滥**：多用户在 Windows 平台遇到 “Selected model is at capacity”，且客户端无法自动切换到可用模型。社区希望有更优雅的降级或重试策略（#46172, #46780, #47146）。

- **上下文压缩可靠性质疑**：compaction 过程不仅可能造成会话不可恢复，甚至可能重写并破坏原始对话记录。对依赖完整审计记录的用户影响重大（#24191, #44363）。

---

*本日报数据来自 github.com/openai/codex，覆盖 2026-09-21 至 2026-09-22 的活动。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-22

## 今日速览
昨夜发布 v0.62.0-nightly，重点修复了环境代理解析和 ACP 模式下工具调用通知顺序问题。社区层面，围绕 Agent 可靠性（子代理误报成功、资源泄漏）与安全审计（Auto Memory 日志脱敏、策略目录权限）的讨论热度最高；多项 P1/P2 级 PR 正在推进中，其中后台 Shell 临时目录清理与文件写入原子化是今日焦点。

## 版本发布
**v0.62.0-nightly.20260922.gd5b3e3acc** 于 2026-09-22 发布，包含两项关键修复：
- 修复 `proxy-agent` 在 esbuild 打包中的 CJS/ESM 互操作问题，确保环境代理解析在各类导入方式下表现一致。
- 修复 ACP 模式下工具调用更新事件未在权限请求前发出的问题。

链接: https://github.com/google-gemini/gemini-cli/releases

## 社区热点 Issues（10 个）

**1. 子代理 MAX_TURNS 中断被误报为 GOAL 成功**（#22323，P1，13 评论）
`codebase_investigator` 子代理在达到最大回合数后仍报告 `success` 和 `GOAL` 终止原因，掩盖了实际的中断。该 issue 已开放数月，社区持续关注，直接影响对 Agent 行为的信任度。
https://github.com/google-gemini/gemini-cli/issues/22323

**2. --list-sessions 不标记当前会话导致误删风险**（#29133，P2，10 评论）
CLI 路径下 `--list-sessions` 未标识当前活动会话，导致 `--delete-session` 可删除正在使用的会话。交互式浏览器路径已修复，但 CLI 路径仍存在隐患，社区呼吁尽快对齐行为。
https://github.com/google-gemini/gemini-cli/issues/29133

**3. AST 感知文件读写的价值评估**（#22745，P2，7 评论）
该 EPIC 跟踪调查 AST 感知工具在文件读取、搜索和代码库映射中的潜在收益，目标是减少 token 消耗并提高单次工具调用的信息密度。作为主 issue，其下还衍生出 #22746 和 #22747 两个子任务。
https://github.com/google-gemini/gemini-cli/issues/22745

**4. 扩展更新回滚时复制空目录**（#29033，P2，6 评论）
当扩展更新失败时，rollback 机制从空临时目录复制文件，导致回滚失效。该 bug 直接破坏扩展机制的可靠性，可能使扩展陷入不可用状态。
https://github.com/google-gemini/gemini-cli/issues/29033

**5. Gemini 不主动使用 skills 和子代理**（#21968，P2，6 评论）
用户反馈即使配置了自定义 skills，模型在相关任务中也很少自主调用，除非显式指示。这是关于 Agent 自主性和工具使用效率的核心抱怨之一。
https://github.com/google-gemini/gemini-cli/issues/21968

**6. Token 消耗死循环**（#28362，P1，5 评论）
会话陷入 token 消耗循环，用户期望系统能检测循环并中止，但问题持续存在。标注为 Stale 但仍开放，属于高优先级可靠性问题。
https://github.com/google-gemini/gemini-cli/issues/28362

**7. Auto Memory 日志缺少确定性脱敏**（#26525，P2，5 评论）
Auto Memory 在将本地会话内容发送给提取模型之前未进行确定性脱敏，存在密钥泄漏风险；同时已有 skills 也可能被记录。社区对隐私安全的关注度持续上升。
https://github.com/google-gemini/gemini-cli/issues/26525

**8. 后台 Shell 执行临时目录泄漏**（#28392，P1，4 评论）
后台执行 shell 命令时，创建的临时目录（`gemini-shell-*`）未被清理，长期运行会累积磁盘占用。该 issue 已对应 PR #29437。
https://github.com/google-gemini/gemini-cli/issues/28392

**9. 浏览器子代理会话接管与锁恢复**（#22232，P3，4 评论）
Persistent 模式下浏览器子代理遇到已有实例锁时采用“快速失败”策略，用户建议实现自动会话接管和锁恢复机制来提升韧性。
https://github.com/google-gemini/gemini-cli/issues/22232

**10. 浏览器子代理在 Wayland 环境下失败**（#21983，P1，4 评论）
浏览器子代理在 Wayland 会话中无法正常工作，被标记为 P1 且需要重新测试，属于典型的平台兼容性问题。
https://github.com/google-gemini/gemini-cli/issues/21983

## 重要 PR 进展（10 个）

**1. 修复后台 Shell 临时目录清理**（#29437，P1）
确保 `gemini-shell-*` 临时目录在后台进程结束后被删除，修复 #28392 的资源泄漏问题。属于核心可靠性的直接改进。
https://github.com/google-gemini/gemini-cli/pull/29437

**2. 修复 proxy-agent esbuild 互操作**（#29401，P1，已合并）
统一 `https-proxy-agent` 和 `http-proxy-agent` 在 esbuild 打包中的 CJS/ESM 导出结构，已包含在最新 nightly 中。
https://github.com/google-gemini/gemini-cli/pull/29401

**3. 修复 ACP 模式工具调用更新顺序**（#29439，P1，已合并）
确保工具需要用户确认时，先发送 `tool_call` 的 `pending` 状态更新，再请求权限，符合 Agent-Client 协议规范。
https://github.com/google-gemini/gemini-cli/pull/29439

**4. 修复 SDK 忽略 AgentShellOptions 参数**（#29327，P2）
`SdkAgentShell.exec` 之前完全忽略 `env` 和 `timeoutSeconds`，导致超时设置失效。该 PR 修复了 API 行为与预期不符的问题。
https://github.com/google-gemini/gemini-cli/pull/29327

**5. a2a-server 日志脱敏与 LOG_LEVEL 支持**（#29328，P1）
修复 LOG_LEVEL 硬编码为 `info` 的问题，并确保启动参数中的凭据不会出现在日志中。安全性和可观测性的双重改进。
https://github.com/google-gemini/gemini-cli/pull/29328

**6. 工具文件写入原子化与序列化**（#29244，P1）
将文件操作改为原子写入，并序列化同路径写入，避免并行工具调用导致编辑丢失（两个调用都报告成功但一个被覆盖）。
https://github.com/google-gemini/gemini-cli/pull/29244

**7. 策略目录写权限安全加固**（#29336，P2）
将 `isDirectorySecure` 校验扩展到所有非系统策略目录（用户级、工作区级），并支持 POSIX/Windows 下的当前用户所有权检查。
https://github.com/google-gemini/gemini-cli/pull/29336

**8. 修复 CLI 输入在 logger 响应前丢失**（#29330，P2）
解决 `setPastSessionMessages` 被嵌入 `setCurrentSessionMessages` updater 的纯度违规问题，并修复 stdin 读取行为，避免输入在日志输出时丢失。
https://github.com/google-gemini/gemini-cli/pull/29330

**9. 限制单次调用沙箱扩展次数**（#29332，P2）
修复工具反复请求 `sandbox_expansion_required` 导致无限递归直至堆内存溢出的问题，添加轮次上限。
https://github.com/google-gemini/gemini-cli/pull/29332

**10. 修复嵌套 .gitignore 尾斜杠模式匹配**（#29323 / #29324，P2）
两个 PR 分别处理了嵌套 `.gitignore` 中仅含尾斜杠的模式（如 `build/`）被错误锚定到当前目录的问题，使匹配行为符合 Git 规范。
https://github.com/google-gemini/gemini-cli/pull/29323
https://github.com/google-gemini/gemini-cli/pull/29324

## 功能需求趋势
- **Agent 自主性与效率**：社区持续关注模型是否充分使用 skills 和子代理（#21968），以及是否需要 AST 感知工具来提升文件读取和搜索的效率（#22745 系列）。
- **资源管理与可靠性**：Token 消耗循环（#28362）和临时目录泄漏（#28392）反映了对资源占用和长期运行稳定性的担忧。
- **安全与隐私**：Auto Memory 的日志脱敏（#26525）和无效补丁隔离（#26523）表明用户对自动记忆功能的隐私安全性有明确要求。
- **子代理基础设施**：浏览器子代理的会话接管（#22232）、Wayland 兼容性（#21983）以及子代理轨迹的可见性（#22598）是高频诉求。
- **后台化与并行**：允许本地子代理发送到后台执行（#22741）的请求获得较高认可，社区希望探索型任务能并行运行。

## 开发者关注点
- **子代理结果可信度**：MAX_TURNS 被误报为 GOAL 成功（#22323）以及 `/bug` 报告缺少子代理上下文（#21763），反映出开发者对子代理行为透明度和结果准确性的高要求。
- **数据安全与误操作风险**：会话管理缺陷可能导致误删（#29133），破坏性 git 命令的误用（#22672）也让部分开发者感到不安，希望 Agent 能默认选择更安全的操作。
- **扩展生态稳定性**：扩展更新回滚失败（#29033）直接影响基于扩展的工作流，开发者对扩展机制的可靠性维护有明确预期。
- **核心交互细节**：终端 resize 时的性能与闪烁（#21924）、`\n` 转义行为异常（#22466）、工具数量超过 128 时的 400 错误（#24246），这些问题虽小但直接影响日常使用体验。
- **错误检测精确性**：PR #29242 发现认证错误检测误将端口号（如 `4012`）当作 `401` 处理，这类细节修复受到社区欢迎，期望官方持续打磨错误处理逻辑。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 · 2026-09-22

## 今日速览

v1.38.11 的桌面端回归问题持续发酵：左侧会话列表空白、沙箱工具失效、历史会话加载卡死等报告集中涌现，且多个问题在 v1.38.10 即已出现，至今未完全修复。CLI/TUI 体验优化 PR 仍保持高活跃度但均未合并。过去 24 小时无新版本发布。

---

## 社区热点 Issues

### 1. 升级 1.38.11 后左侧项目会话列表空白
**#10620** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10620)
升级 1.38.11 后左侧项目会话列表完全无法加载，仅中间区域残留一个升级前会话；回退版本后恢复正常。该问题在 1.38.8（#10365，已关闭）和 1.38.10（#10509）均有同类报告，属于高频复发回归，社区已累积 10 条评论。

### 2. v1.38.10 v5 迁移导致工作区永久只读
**#10509** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10509)
同一 revision 重复导入 + 超限日志无限重试，导致工作区永久只读、shell 工具永久失效。用户明确指出“数据未损坏”，但迁移中断后无法自愈，需要手动处理。8 条评论，严重性高。

### 3. 单个 sandbox 写入路径无法解析导致所有工具调用失败
**#10505** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10505)
v1.38.10 中一个无法 canonicalize 的写根路径会让全部命令以 exit 126 失败，且无 fallback。该路径在用户自己的 PowerShell 中可正常解析。此类“一损俱损”的设计缺陷引起开发者对沙箱容错性的质疑。

### 4. 1.38.10 → 1.38.11 更新后 sidebar 永远加载不完
**#10622** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10622)
Windows 10 IoT Enterprise 环境下，通过应用内更新到 v1.38.11 后 sidebar 一直处于加载中，只显示当前打开的会话。与 #10620 现象类似但触发条件不同（更新链路 vs 全新启动）。

### 5. pwsh 会话所有命令失败且应用报告 pwsh 未安装
**#10633** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10633)
会话 shell 解析为 `pwsh` 时，每条命令都报 “exit status 1 / Result unavailable” 并不停重试，浪费整轮输出。矛盾点在于应用自身认为 pwsh 未安装，但会话仍被绑定到该 shell。

### 6. 打开程序加载历史对话直接卡死
**#10630** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10630)
v1.38.11 打开程序后加载历史对话失败，程序卡死且无法关闭，必须强杀进程。win11 LTSC 环境，暂无日志输出。虽然评论为 0，但“无法关闭”属于严重崩溃级别。

### 7. todo 与任务进度经常对不上
**#10629** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10629)
Debian 12 下从旧版本用到 1.38.10，todo 长期不更新，影响 Agent 任务跟踪。该问题获得 1 个 👍，说明有同类用户共鸣。

### 8. 1.38.11 会话排序混乱，逻辑不可理解
**#10625** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10625)
用户反馈 v5 会话存储的排序逻辑混乱，“全是三天前”，难以找到目标会话。作者改动会话逻辑可以理解，但希望增加“按名称排序”等选项，而不是只有创建/更新时间且结果不合理。

### 9. 希望增加模型排序管理功能
**#10637** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10637)
用户连接多家 provider 的 API key 后，模型列表按添加顺序排列，早期不再常用的 provider 仍占据顶部位置；删除重加又需要重新获取 API key。希望支持自定义模型排序。

### 10. CLI 需要一个全局管理 session 的命令/工具
**#10632** | [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10632)
用户在多个盘符、目录创建了大量对话，希望有一个全局视图来查看/清理这些会话，例如 `reasonix sessions` 输出名称、所在目录、简介等，便于统一维护。

---

## 重要 PR 进展

### 1. 修复技能（skills）路由走已退役的 connect_tool_source
**#10419** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10419)
技能工具在 provider-visible 路由表中无法注册，导致技能始终不可用。改为通过 `use_capability` 正确路由，修复 Agent 技能加载失效问题。

### 2. 修复 DeepSeek thinking mode 重复 400 错误
**#10084** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10084)
修复 DeepSeek API 报 `reasoning_content must be passed back` 的问题——现在在 thinking 模式下，每个 assistant 轮次都会序列化 `reasoning_content`，纯文本轮也不例外。

### 3. 检测 Agent“无意义重复”循环并自动重试一次
**#10431** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10431)
新增客户端侧 perseveration 防护：当模型重复输出同一段短文本或推理、且未调用工具时，触发提示并重试一次，避免烧完整个输出预算。

### 4. 新增按 provider 配置的 stream_idle_timeout_seconds
**#10344** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10344)
允许为每个 provider 单独设置流式响应无数据的超时时间（默认 300s），超时后视为断连并重放。解决某些 provider 响应慢导致误判的问题。

### 5. 受管配置文件写入始终需要人工确认
**#9770** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/9770)
`config.toml`、兼容 TOML、旧版 `config.json` 等受管配置文件的写入，在任何位置都必须经过 `config_write` 审批，不再只限制在写根目录之外。

### 6. cachecontext：配置路径基础 + 按项目的用户归属 ID
**#9163** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/9163)
为 DeepSeek KV-cache 按项目自动设置用户归属 ID 打基础：引入共享的项目配置路径解析逻辑，并新增 cachecontext 配置字段。

### 7. CLI 输入框新增 vi 命令模式
**#10367** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10367)
通过 `ui.commandmode = "vi"` 开启：`Esc` 进入命令模式而非停止正在运行的 turn，`Ctrl+C` 才中断；带文本按 `Ctrl+C` 会将草稿保存到历史记录并清空提示符。

### 8. YOLO 模式下数字键直接选择模型/提供方/恢复会话行
**#9491** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/9491)
之前 `/model`、`/provider`、`/resume` 选择器中按数字键只会过滤列表，无法直接选中。现在按行号即可选择，与方向键+Enter 操作互补，减少一步操作。

### 9. 修复用户消息被本轮输出插到前面的转录问题
**#10639** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10639)
在转录业务记录上先发布 turn 标识再复制 follower 变更，确保 Desktop 直播、导出/重载看到相同的 `turnId`；用户消息锚定在发送时间点，输出不会反超。

### 10. 修复 skill watcher 每次构建都会生成多余 helper 进程
**#10636** | [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10636)
`boot.build` 无条件创建 skill-watch 服务，导致每次 controller 构建都会 spawn 一个 56MB 的 `reasonix-desktop.exe` watcher 进程，并随重建累积残留。恢复为 host 级生命周期管理。

---

## 功能需求趋势

- **CLI/TUI 交互效率提升**：数字键直选、vi 命令模式、半页/单行滚动、YOLO 自动提交、`--continue` 找不到会话时开新会话等 PR 高频出现（#9491、#10367、#9417、#9769、#10516），CLI 用户群体对“少按键、快操作”有强烈诉求。
- **全局会话管理**：#10632 希望 CLI 提供 `reasonix sessions` 全局查看/清理会话的能力，与 #10625 的会话排序混乱问题互相印证——会话一多就难以维护。
- **模型列表可排序**：#10637 要求支持对模型列表按使用频率、自定义顺序排列，而不是固化的添加顺序。
- **配置的精细化和安全确认**：per-provider 超时（#10344）、受管配置写入审批（#9770）、git 行为强制标准（#10368）等 PR 显示社区在推动配置更细粒度、更可控。

---

## 开发者关注点

- **升级回归问题反复出现**：从 1.38.8 到 1.38.11，每次升级都有人报告会话列表空白、sidebar 不加载、历史会话打不开（#10620、#10622、#10630、#10365、#10509）。用户已开始“不敢升级”，有评论表示退回 1.38.7 虽然每天黑屏 5 次但“至少界面清晰完整”。
- **沙箱与 shell 工具的脆弱性**：#10505（一个路径问题导致全部工具死掉）、#10633（pwsh 判定不一致导致命令全部失败）、#10509（迁移失败导致 shell 永久失效）——工具链“一损俱损”的设计让开发者对稳定性信心不足。
- **数据安全与可恢复性**：多个 issue 强调“数据未损坏但无法使用”，说明社区对会话数据的完整性仍有信任，但对迁移逻辑和自愈能力不满意，希望有手动恢复或修复工具。
- **跨平台一致性**：Windows 上的 shell 解析、PTY 中文输出（#10446，已关闭）、macOS dock 图标不统一（#10627）、portable 版本路径问题（#10638）——不同平台体验差异明显，开发者希望官方能统一处理。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 2026-09-22

## 1. 今日速览

OpenCode 发布 v1.18.32 补丁，修复 Bedrock 图片附件误用与 Together AI 用量上报问题，并将 DeepSeek V4.1 Flash、Grok 4.7 纳入 Zen 模型列表。与此同时，账户/计费类故障集中爆发（余额清零、订阅状态丢失、迁移后数据不可见），成为社区最强烈的反馈焦点。多个长期悬而未决的稳定性问题（shell 工具挂起、服务启动失败、Windows 路径解析）也在今天迎来 PR 修复。

## 2. 版本发布

**v1.18.32** 核心更新：
- 修复 Bedrock 图片附件仅限 Claude、Nova、Llama 4 模型使用
- 修复 Together AI 流式用量上报
- 社区贡献者 @dc85 为 Zen 添加 DeepSeek V4.1 Flash 文档、新增 Grok 4.7 支持

🔗 https://github.com/anomalyco/opencode/releases

## 3. 社区热点 Issues

1. **[#48973] `encrypted_content` 未被调用者授权错误** — 使用 Muse Spark 1.3 搭配 OpenCode Zen 时稳定复现，推理内容加密字段校验失败。12 条评论、8 个 👍，是当前最高热度的功能性故障。
   🔗 https://github.com/anomalyco/opencode/issues/48973

2. **[#42264] TUI 流式输出时文本消失 / 主线程卡死** — TreeSitter 的 `captures()` 在 WASM 中栈溢出导致高亮 worker 崩溃，文本缓冲区冻结。5 条评论、4 个 👍，长输出场景下影响明显。
   🔗 https://github.com/anomalyco/opencode/issues/42264

3. **[#50452] Credits 凭空消失，无日志无活动** — 用户充值 $20 后仅轻度使用，余额清零且 usage 历史完全空白，发票仍在。5 条评论，直接打击付费用户信任。
   🔗 https://github.com/anomalyco/opencode/issues/50452

4. **[#50467] DeepSeek V4.1 Flash 返回 Bad Request** — 使用 `deepseek-v4.1-flash` 时所有 Zen 后端请求被拒（`Bad Request: {"model":"deepseek-v4.1-flash"}`）。刚随 v1.18.32 加入支持即出现兼容性问题，社区关注度高。
   🔗 https://github.com/anomalyco/opencode/issues/50467

5. **[#50201] Console 迁移后 Go 工作区丢失** — 付费 OpenCode Go 工作区在仪表盘迁移后不可用，订阅、usage、发票全部消失，被引导创建了空组织。2 个 👍，与 #50465、#50398 同属迁移数据丢失族。
   🔗 https://github.com/anomalyco/opencode/issues/50201

6. **[#50458] Bash 工具 stdout/stderr 管道损坏多字节/长输出** — Windows 11 + PowerShell 5.1 + ConPTY 环境下，长输出或多字节字符在管道传输中被截断/污染，属于数据完整性违规。
   🔗 https://github.com/anomalyco/opencode/issues/50458

7. **[#50457] Go 周用量提前触顶，共享用量计算不透明** — 仪表盘同时显示周用量 100%、月用量 51%、滚动用量 89%，用户无法理解周/月/滚动三者关系及重置逻辑。
   🔗 https://github.com/anomalyco/opencode/issues/50457

8. **[#38835] `compaction.reserved` 对无 `input` 限制的模型被静默忽略** — 老问题 #13980 被 stale bot 关闭但从未修复。GLM-5.2 等模型不受控地忽略保留 token，导致压缩失效。
   🔗 https://github.com/anomalyco/opencode/issues/38835

9. **[#50213] OpenAI Responses WebSocket 5 分钟无数据即超时** — 长推理（thinking）超过 5 分钟后连接被断，UI 卡死，官方 `provider.transport` 报错 "Timed out waiting for WebSocket data"。
   🔗 https://github.com/anomalyco/opencode/issues/50213

10. **[#50424] Shell 工具在快速退出命令后永久卡 `running`** — 命令已退出且无存活子进程，但 shell tool 永不返回。这是 #29294（pipe FD 泄漏）的复活版本，同样被 stale bot 关闭后重新上报。
    🔗 https://github.com/anomalyco/opencode/issues/50424

## 4. 重要 PR 进展

1. **[#50471] 修复 shell 工具在快速进程退出时挂起** — 用 `Latch` 协调输出 drain fiber，`abort`/`timeout` 获胜时开锁停止收集，`exit` 获胜时等锁收完输出再返回。直接解决了 #50424 的根因。
   🔗 https://github.com/anomalyco/opencode/pull/50471

2. **[#50462] 保留服务启动失败信息** — 当多个候选进程竞争端口时，不再丢弃首个失败者的错误，而是展示捕获的原始异常。关闭 #50461。
   🔗 https://github.com/anomalyco/opencode/pull/50462

3. **[#50276] 支持后台长时运行 shell 命令** — 修复 Uvicorn 等前台 server 启动后 agent 无限等待的问题，后台命令不再阻塞会话。
   🔗 https://github.com/anomalyco/opencode/pull/50276

4. **[#50473] 移除首个自然月 Go 定价折扣** — Go 订阅统一为 $10/月，取消自动应用的 50% 优惠券，清理所有落地页与本地化文案，避免后续计费争议。
   🔗 https://github.com/anomalyco/opencode/pull/50473

5. **[#50448] 新增 `chat.model` hook** — 插件可在每次 provider turn 前动态选择模型，替代「整个任务固定一个模型」的现状，为按步骤切模型等路由策略打开空间。
   🔗 https://github.com/anomalyco/opencode/pull/50448

6. **[#50456] TUI 自动标签页模式** — `tabs.mode` 支持 `auto` / `on` / `off`，默认 `auto` 在 `HERDR_ENV=1` 下自动禁用会话标签页，旧 `tabs.enabled` 配置向后兼容。
   🔗 https://github.com/anomalyco/opencode/pull/50456

7. **[#50267] 通过浏览器直接登录 OpenCode Go / Console** — 桌面端 onboarding 改为跳转浏览器完成授权，API Key 手工粘贴降级为次要入口。
   🔗 https://github.com/anomalyco/opencode/pull/50267

8. **[#50466] 修复本地插件 scoped 包解析** — 本地插件（如 `~/.opencode/plugins/probe.js`）导入 `@opencode/plugin` 时解析路径错误，现改为从项目目录解析 scoped 包。
   🔗 https://github.com/anomalyco/opencode/pull/50466

9. **[#50453] 修复非交互式 `run` 输出为空** — `opencode run --format json` 间歇性退出码为 0 但 stdout 为空。该 PR 在 run 进入 idle 态时 flush 错过的输出片段。
   🔗 https://github.com/anomalyco/opencode/pull/50453

10. **[#50455] 未知工具错误提示最相近的工具名** — 对不存在工具的调用报错时，直接给出候选，如 `Unknown tool 'github.get-me'. Did you mean tools.github.get_me?`，显著改善 DX。
    🔗 https://github.com/anomalyco/opencode/pull/50455

## 5. 功能需求趋势

- **新模型/提供商兼容**：社区积极跟踪 DeepSeek V4.1 Flash、GLM-5.2、Muse Spark 1.3、Grok 4.7 等新模型的接入质量，OpenRouter / Together AI / Bedrock 等聚合商的 error handling 是高频关注点。
- **账户体系稳定性**：Console 迁移、Go 订阅、Credits 计量三块是当前最强需求——用户需要透明的用量计算、可审计的扣费记录、以及迁移不丢数据。
- **流式输出可靠性**：SSE / WebSocket 超时、多字节输出损坏、高亮 worker 崩溃等「输出链路」问题集中出现，说明流式管线的健壮性已成为使用瓶颈。
- **Shell/后台进程生命周期**：前台 server、快速退出命令、子进程资源清理——开发者希望 shell tool 能覆盖真实开发场景（跑 dev server、批量任务）而不挂起。
- **插件能力扩展**：`chat.model` hook、本地插件 scoped 包解析、社区插件文档（opencode-mesh）等进展表明插件生态正从「能跑」走向「可深度定制」。
- **Windows 平台边界处理**：目录 junction、ConPTY、路径大小写/分隔符漂移、CI 稳定性——Windows 用户占比不小，但平台适配欠账最多。

## 6. 开发者关注点

- **计费状态不一致集中爆发**：至少 4 条 issue 都指向「付费后被判定无订阅 / 余额清零 / 发票在但 usage 为空」，涉及 #50452、#50420、#50201、#50465。#50473 移除首月折扣也需要在计费侧给出更清晰的变更说明。
- **stale bot 误伤存活问题**：#38835（复活 #13980）、#50424（复活 #29294）都是老 issue 被 stale bot 关闭但从未修复。社区明显不满「关掉 ≠ 修好」的流程，需要维护者人工核对后再关闭。
- **长推理与超时等待**：OpenAI WebSocket 5 分钟硬超时（#50213）与大文件/坏 PDF 读取挂起（#22252）属于同一种痛点——**宁可快速失败，也不要无限等待**。
- **UI 迁移学习成本高**：#50387（中文用户抱怨新界面找不到 opencode 切换/server 信息/ACP/MCP/Plugins）、#50459（移动端窄屏无法添加项目）、#50478（新 Console 不提供完整 API key）——新版 Console/WebUI 的迁移完成度明显不足。
- **DeepSeek 系列兼容性焦虑**：#50467 + #36354 表明 DeepSeek V4 Flash/Pro 在 Zen 与 Go 后端均出现工具调用和请求格式问题，而官方刚把 V4.1 Flash 加入 Zen，用户担心「新模型 = 新坑」。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-22

## 今日速览

Hermes Agent v0.21.4 补丁版发布，一次性汇总约 1,800 个 PR；多 profile 配置隔离问题集中爆发（#118431、#118432、#118310），成为社区关注焦点；记忆系统（mnemosyne）与桌面端恢复机制迎来密集修复，多个 Issue 在 24 小时内即获得对应 PR。

## 版本发布

**Hermes Agent v0.21.4（v2026.9.21）** 补丁版于昨日发布，将 v0.21.3 以来合并的约 1,800 个 PR 汇总为稳定标签，面向 Docker 镜像、Hermes Cloud 及托管部署等下游消费者。官方暂未提供完整 curated 变更说明，完整更新日志将后续发布。

## 社区热点 Issues

本期共收录 18 条活跃 Issue，以下 10 条最值得关注：

1. **[Bug] Discord liveness watchdog 假死**（#118487，P1）
   Discord 适配器 WebSocket 探针在第一次 `socket_closed` 后彻底沉默，不重连、不报致命错误，机器人成为"僵尸进程"。P1 级别说明影响面较大，4 条评论正在讨论根因。
   https://github.com/NousResearch/hermes-agent/issues/118487

2. **[Bug] Windows 启动失败：fcntl.F_RDLCK 缺失**（#118026，P0，已关闭）
   Windows 11 上 `hermes_state_lockguard.py` 直接引用 `fcntl`  Unix 专属模块，导致后端在宣告端口前崩溃退出。P0 + 已关闭，说明修复已合入，但跨平台兼容性仍需警惕。
   https://github.com/NousResearch/hermes-agent/issues/118026

3. **[Bug] v0.21.3 回归：桌面端模型设置应用到所有 profile**（#118431，已关闭）
   升级到 v0.21.3 后，在 Desktop Settings → Models 修改默认模型会写到**每一个** profile 的配置，而非当前选中项。该 Issue 获得 1 个 👍，用户对回归类 bug 关注度高。
   https://github.com/NousResearch/hermes-agent/issues/118431

4. **[Bug] macOS 后端 SIGTERM 后恢复永久死锁**（#118680）
   桌面端 `serve` 后端在 ready 之前被 SIGTERM，"Reconnect now" 按钮静默失效，只能完全重启应用恢复（已出现 2 次）。桌面端可靠性问题，0 评论但已有对应 PR 跟进。
   https://github.com/NousResearch/hermes-agent/issues/118680

5. **[Perf] Curator ledger 无限增长**（#118674，P2）
   `.curator_ledger.jsonl` 每操作写入完整文件 SHA256 快照，实测 5 周增长 5MB/profile，且永不复写。存储效率问题，特别影响长期运行的生产 profile。
   https://github.com/NousResearch/hermes-agent/issues/118674

6. **[Bug] skills hub 损坏状态文件导致所有 skills 命令崩溃**（#118686，P2）
   当 `lock.json` / `taps.json` 出现错误结构（`null`、`[]`、缺字段）时，`hermes skills list/install/uninstall` 全部 TypeError/KeyError 崩溃，技能管理完全不可用。
   https://github.com/NousResearch/hermes-agent/issues/118686

7. **[Bug] Telegram 论坛话题绕过 require_mention**（#118678，P3）
   bot 自己创建的 forum topic，其 creation service message 导致所有普通用户消息被识别为"reply to bot"，从而绕过 `require_mention` 门控。涉及消息投递安全边界，容易被恶意利用。
   https://github.com/NousResearch/hermes-agent/issues/118678

8. **[Bug] same_tool_failure_halt 误杀多轮诊断**（#118695）
   Arthur profile 在使用 `ab4_act` 自定义 MCP 工具时，连续 8 次失败后 guardrail 直接终止诊断——即使工具失败可能携带有效诊断信息。守卫逻辑对未知工具过于激进，影响 agent 自主排查能力。
   https://github.com/NousResearch/hermes-agent/issues/118695

9. **[Bug] mnemosyne_invalidate 跨会话静默失效**（#118672，P3）
   对来自其他 session 的记忆执行 invalidate 时，接口返回 `{"status": "invalidated"}` 但数据库零写入。双层原因（beam.py session guard + 工具层忽略返回值），属于典型的静默失败模式。
   https://github.com/NousResearch/hermes-agent/issues/118672

10. **[Bug] zai GLM-5.x 思维链泄漏到记忆内容**（#118673，P3）
    bigmodel.cn 直连 GLM-5.x 时，未闭合的 `thinking` 标签泄漏进 mnemosyne 记忆内容，与 #96735（Ollama 侧）同型，说明该问题跨 provider 存在，具有系统性。
    https://github.com/NousResearch/hermes-agent/issues/118673

## 重要 PR 进展

本期收录 50 条活跃 PR，以下 10 条最值得关注：

1. **fix(agent): 保护自定义工具诊断**（#118698）
   修复 #118695：`same_tool_failure_halt` 现在只作用于已知内置工具，对自定义 MCP 工具不再误杀多轮诊断序列。
   https://github.com/NousResearch/hermes-agent/pull/118698

2. **fix: skills_hub 损坏状态文件优雅降级**（#118687）
   修复 #118686：`_JsonStateFile._read` 现在对任何错误形状（`null`、`[]`、缺字段、非 UTF-8）都降级为 `EMPTY`，写路径拒绝覆写，避免传播损坏。
   https://github.com/NousResearch/hermes-agent/pull/118687

3. **fix(desktop): pre-ready 后端退出恢复**（#118694 + #118683）
   两个 PR 协同修复 #118680：#118683 允许 supervisor 在 `backendReady` 之前评估空槽位，#118694 进一步在恢复 respawn 本身失败后重新武装恢复闩锁，终结"一次性恢复"死锁。
   https://github.com/NousResearch/hermes-agent/pull/118694
   https://github.com/NousResearch/hermes-agent/pull/118683

4. **fix(telegram): 论坛话题保留 mention 门控**（#118679）
   修复 #118678：识别 bot 创建 topic 产生的 service message reply 引用，正常情况下仍要求显式提及/@，不再误判为对 bot 的回复。
   https://github.com/NousResearch/hermes-agent/pull/118679

5. **fix(gateway): 允许 ntfy 通过 config.yaml 配置 topic**（#118685）
   修复 #118684：`check_requirements` 只检查 `httpx` 依赖是否可用，topic 是否配置交给 `validate_config` / `is_connected` 判断，消除配置来源的耦合 bug。
   https://github.com/NousResearch/hermes-agent/pull/118685

6. **fix(curator): 账本大小有界化**（#118696）
   修复 #118674：复用已有的 `compact_ledger()`（未变更文件去重重写）与 `gc_blobs()` 原语，将条目标注为只追加模式，并在每次 curator 操作后自动触发大小修剪。
   https://github.com/NousResearch/hermes-agent/pull/118696

7. **fix(skills): 批量回滚残留移至 skills root 之外**（#118692）
   修复 #118691：`_restore_snapshot` 将损坏的半应用 skill 暂存到 `.rollback-broken-*` 目录后立即清理，不再让 loader 将其当作可加载 skill 暴露。
   https://github.com/NousResearch/hermes-agent/pull/118692

8. **fix: profiles.list 兑现 wire contract**（#118688）
   使 `profiles.list` 真正输出 `previous_names`（重命名历史），此前 handler 已发出该字段但类型定义未更新，导致每次 gateway/Desktop 启动都触发校验警告。
   https://github.com/NousResearch/hermes-agent/pull/118688

9. **fix(desktop): 主机 spawn 门闩原子化**（#118025）
   修复 #118024：`writeFileSync` 由默认截断模式改为原子写入（临时文件 + rename），防止并发启动时两个 launcher 同时获得 spawn 许可，破坏"每主机单后端"不变量。
   https://github.com/NousResearch/hermes-agent/pull/118025

10. **feat(delegate): 子代理友好显示名**（#118104）
    修复 #118081：每个子代理获得稳定的友好名（Hypatia、Turing、Noether…），`sa-{task}-{hex}` 仍作为路由键，显示名仅用于人类可读的 UI 展示。
    https://github.com/NousResearch/hermes-agent/pull/118104

## 功能需求趋势

从近 24 小时 Issue 与 PR 中可提炼出以下社区关注方向：

- **多 profile 配置隔离**（#118310、#118431、#118432、#118388）：配置文件串写、读到错误 profile、token 跨 profile 复用冲突——配置隔离是当前最高频的问题域，且 v0.21.3 回归加深了社区焦虑。
- **记忆系统（mnemosyne）正确性与效率**（#118672、#118673、#118675、#118676、#118340）：四个方面同时被质疑——跨会话静默失败、模型 thinking 泄漏污染记忆、混合检索退化为单向量、embedding 存储膨胀 10 倍。社区既在修 bug 也在探索新存储后端（如 #118340 社区插件 memory-zvec）。
- **桌面端恢复机制**（#118680、#118693、#118025、#118683、#118694）：后端崩溃后"假死"、恢复按钮无效、后台 review 阻塞渲染——桌面端的失败恢复体验成为用户痛点，多个 PR 集中攻坚。
- **消息投递门控一致性**（#118487、#118678）：Discord watchdog 失效与 Telegram forum 绕过 mention 门控，暴露了消息适配器在边界场景下的可靠性短板，P1 + 安全绕过的组合推高了优先级。
- **skills 工具链健壮性**（#118686、#118691、#118674）：状态文件损坏导致全命令崩溃、批量操作无原子性、账本无限膨胀——技能生态正在从"功能可用"走向"工程可靠"阶段。

## 开发者关注点

- **静默失败模式频发**：Discord 探针沉默、`mnemosyne_invalidate` 假成功返回、ntfy 适配器无日志消失（#118487、#118672、#118684）——开发者对"接口说成功但实际没生效"的容忍度极低，期望增加可观测性。
- **配置隔离回归风险**：v0.21.3 的 host-backend 重构直接导致两个 profile 配置串写 bug（#118431、#118432），第二次出现均被标记为 duplicate——社区希望此类重构必须配套 profile 级集成测试。
- **存储无限增长是长期债务**：ledger 5MB/5周（#118674）与 embedding 118MB/2.7k 行（#118676）叠加记忆假删除（#118672），意味着用户 profile 目录会持续膨胀而"清理"不可靠。
- **跨平台兼容仍需补课**：Windows 的 `fcntl` 缺失（#118026，P0）与 macOS 的后端恢复死锁（#118680）都是平台特有路径，开发者在 Windows/macOS 上的反馈速度明显加快。
- **Issue-PR 响应速度获认可**：多个 Issue（#118680、#118686、#118691、#118674、#118678）在 24 小时内即出现对应修复 PR，且 50 条活跃 PR 中有大量针对性修复，说明 Hermes 团队的 bug 响应闭环效率很高。

:::
