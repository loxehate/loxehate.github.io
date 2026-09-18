---
title: "OpenClaw 生态日报"
published: 2026-09-18
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-18

> Issues: 142 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-18 00:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-09-18

## 1. 今日速览

- 过去 24 小时 Issue 更新 142 条（新开/活跃 103，关闭 39），PR 更新 500 条（待合并 299，已合并/关闭 201），无新版本发布。项目正处于 **2026.9.x 发布后的高强度修复期**，活跃度非常高。
- 修复重点集中在三方面：**渠道发送取消语义**（Teams、Mattermost、Feishu、Matrix、Telegram）、**消息丢失/重复投递**类 P0/P1 回归、**WebUI 性能与焦点稳定性**的批量整治。
- 多个 P0 升级故障（#150452、#150797、#146043）已于今日关闭，说明高危问题修复速度快；但仍有一批 P0/P1 开放，且社区对 2026.9.4 的升级体验抱怨集中。
- 无新版本发布意味着这些修复尚未汇入正式 Release，预计会集中进入 **2026.9.5 补丁版**。
- **总体健康度评估：中风险 / 高修复节奏。** 回归面较广，但维护者响应速度和修复合入速度均可观，项目处于“大量收口”状态。

## 2. 版本发布

今日无新版本发布。当前最新版本仍为 2026.9.4。

## 3. 项目进展

- 今日累计 **201 个 PR 被合并或关闭**，39 个 Issue 被关闭，修复落地速度显著。
- **渠道可靠性批量收口**：多个围绕“发送被取消后不再继续执行”的修复进入待合并状态，代表 PR：
  - [#151193 fix: stop Teams sends after delivery authority closes](https://github.com/openclaw/openclaw/pull/151193)（今日关闭）
  - [#151252 fix: stop Mattermost posts after sender cancellation](https://github.com/openclaw/openclaw/pull/151252)
  - [#151235 fix: stop Feishu mutations after caller cancellation](https://github.com/openclaw/openclaw/pull/151235)
  - [#151257 fix: stop canceled Matrix sends before later requests](https://github.com/openclaw/openclaw/pull/151257)
- 多个高优先级 Issue 于今日关闭，对应问题已解决或修复合入，包括：
  - [P0 #150452 升级需一天手动修复](https://github.com/openclaw/openclaw/issues/150452)
  - [P0 #150797 Docker 升级后 Gateway 无法启动](https://github.com/openclaw/openclaw/issues/150797)
  - [P0 #146043 doctor 停止后续修复](https://github.com/openclaw/openclaw/issues/146043)
  - [P0 #150744 托管 Gateway 固定到旧全局安装](https://github.com/openclaw/openclaw/issues/150744)
  - [P1 #148898 claude-cli 看门狗误计宿主睡眠时间](https://github.com/openclaw/openclaw/issues/148898)
  - [P1 #147387 exec 完成但回复在 WebChat 不可见](https://github.com/openclaw/openclaw/issues/147387)
  - [P1 #136370 Discord 管理动作被错误阻止（安全）](https://github.com/openclaw/openclaw/issues/136370)
- **性能优化方向**也有多个 ready-for-maintainer 的 PR 等待合入：
  - [#151182 perf(gateway): reuse transcript titles across appends](https://github.com/openclaw/openclaw/pull/151182)
  - [#151198 fix(ui): stop redundant catalog reads during chat updates](https://github.com/openclaw/openclaw/pull/151198)
- **新能力方向**：[#151176 feat(openai): add explicit Agents API MVP harness](https://github.com/openclaw/openclaw/pull/151176) 为 OpenClaw 增加独立的 OpenAI Agents API 执行通道，不再依赖 Codex harness。

## 4. 社区热点

- [#97616 [Bug] OpenClaw 泄漏 hook/tool 子进程，僵尸进程积累导致运行时降级 — 30 条评论](https://github.com/openclaw/openclaw/issues/97616)  
  社区最关注的问题，P1 回归。用户报告 `openclaw-hooks`、`bash`、`codex` 子进程长期运行后变成僵尸，拖垮主进程。目前未见直接对应的 fix PR。
- [#149361 Umbrella: WebUI performance and stability — 21 条评论](https://github.com/openclaw/openclaw/issues/149361)  
  维护者 @vyctorbrzezowski 发起的伞形 Issue，汇总桌面与移动端 WebUI 性能稳定性问题，后续多日新增的 WebUI 问题均挂靠该伞。
- [#139847 消息在回复运行中被丢弃，用户只看到占位符 — 15 条评论](https://github.com/openclaw/openclaw/issues/139847)  
  2026.9.2 引入的回归。“Reply operation has no active tool authority snapshot”报错，用户消息在回复运行中到达时被直接丢弃，社区关注度很高。
- [#119411 内存文件 watcher 永不重新索引，且 memory status 误报 Dirty: no — 11 条评论](https://github.com/openclaw/openclaw/issues/119411)  
  内存索引静默冻结，实际磁盘文件数低于索引计数，系统却报告“干净”。用户对状态误报感到困惑。

**诉求分析**：社区最迫切的三件事是“消息不能丢弃”“进程不能泄漏”“升级不能坏”。多个热点 Issue 均由 2026.9.x 升级触发，反映出用户对近期发布质量的敏感度上升。

## 5. Bug 与稳定性

按严重程度排列，已关闭表示问题已解决或修复已合入，开放表示仍需跟进。

**P0（发布阻断级）**

- [#150452 [已关闭] 2026.7.1-2 → 2026.9.4 升级需约一天手工修复](https://github.com/openclaw/openclaw/issues/150452) — 配置迁移无效、Telegram 崩溃循环、iOS 节点需重新授权、Usage 页面空白。
- [#150797 [已关闭] Docker 镜像 2026.9.1 → 2026.9.4 后 Gateway 每次启动即退出](https://github.com/openclaw/openclaw/issues/150797) — 数据库索引漂移，需 `doctor --fix` 才能恢复。
- [#146043 [已关闭] doctor 因 legacy ~/.openclaw/agent 目录停止后续修复](https://github.com/openclaw/openclaw/issues/146043) — quarantine 目录不断积累。
- [#151050 [开放] 更新失败 unexpected-error（2026.9.4, darwin/arm64）](https://github.com/openclaw/openclaw/issues/151050) — 更新工具自身报错，无有效诊断信息。

**P1（高优先级）**

- [#97616 [开放] hook/tool 子进程泄漏，僵尸进程积累](https://github.com/openclaw/openclaw/issues/97616) — 暂无直接 fix PR。
- [#139847 [开放] 回复运行中新消息被丢弃（2026.9.2 回归）](https://github.com/openclaw/openclaw/issues/139847) — 暂无直接 fix PR。
- [#119411 [开放] 内存文件 watcher 不重新索引，Dirty 状态误报](https://github.com/openclaw/openclaw/issues/119411) — 暂无直接 fix PR。
- [#144922 [开放] 82 秒看门狗杀死在途模型调用，导致重复派发和重复投递](https://github.com/openclaw/openclaw/issues/144922) — 需要关注重复副作用。
- [#150810 [开放] 孤立最终化已产生完整回复，但用户仍收到占位符](https://github.com/openclaw/openclaw/issues/150810) — 状态判定与最终事实不一致。
- [#137469 [开放] 结构化图片水合失败直接终止整个 turn，群聊中表现为静默回复](https://github.com/openclaw/openclaw/issues/137469) — 缺少降级到纯文本的策略。

**P2 / 其他开放问题**

- [#143278 心跳内部输出泄漏到 Telegram 用户聊天](https://github.com/openclaw/openclaw/issues/143278)
- [#123354 Matrix E2EE 在 Megolm 会话轮换后停止解密](https://github.com/openclaw/openclaw/issues/123354)
- [#151223 会话观察者选择了不可用的 Codex harness 做 OpenAI 工具补全](https://github.com/openclaw/openclaw/issues/151223)
- [#151059 Workboard 全量加载卡片宇宙，无 SQL 过滤](https://github.com/openclaw/openclaw/issues/151059)
- [#151183 Workboard claim-token 栅栏可被同 agent 的任意 session 绕过](https://github.com/openclaw/openclaw/issues/151183)
- WebUI 一批 P2/P3 问题已由维护者批量跟踪，见 [#149361](https://github.com/openclaw/openclaw/issues/149361) 伞形 Issue。

## 6. 功能请求与路线图信号

**值得关注的功能请求**

- [#7406 人类可读的 Telegram 主题名（2026-02-02 创建，积压 5 个月以上）](https://github.com/openclaw/openclaw/issues/7406) — 会话下拉框显示原始 key 而非可读名称。目前无对应 PR，纳入下一版本概率低。
- [#82015 Edit 工具在文件修改后展示 diff 输出](https://github.com/openclaw/openclaw/issues/82015) — 希望对齐 Claude Code 的交互体验。无对应 PR，需求真实但优先级不高。
- [#45233 FreeBSD 支持](https://github.com/openclaw/openclaw/issues/45233) — 社区有 👍 4，仍处于收集阶段，短期不会实现。
- [#124363 统一 Control UI 六种通知系统的严重性语义](https://github.com/openclaw/openclaw/issues/124363) — 维护者发起，覆盖面大，适合作为后续 UI 重构的路线图项。

**结合已有 PR 的路线图判断**

- 配额耗尽自动重试备份 profile：PR [#151133](https://github.com/openclaw/openclaw/pull/151133) 已 ready-for-maintainer-look，对应 Issue #151111，**大概率进入 2026.9.5 补丁版**。
- OpenAI Agents API 独立 MVP harness：PR [#151176](https://github.com/openclaw/openclaw/pull/151176) 已开放且标注维护者关注，属于新能力方向，**更可能进入 2026.10 里程碑**而非紧急补丁。
- Codex 原生子任务进度透出：PR [#150995](https://github.com/openclaw/openclaw/pull/150995) 为 feature follow-up，是对 #139456/#147571 的增强，**预计在后续功能版本合入**。

## 7. 用户反馈摘要

- **升级体验是当前最大痛点**：用户 @arrobapontocom-ui 报告，将双 agent 生产网关从 2026.7.1-2 升级到 2026.9.4 后，花了一整天手工修复，经历配置迁移失败、Telegram 崩溃循环、iOS 节点重新批准、Usage 页面空白。链接：https://github.com/openclaw/openclaw/issues/150452
- **消息丢失让人失去信任**：多个用户报告消息被吞或重复投递。#139847 中用户消息在回复运行中被丢弃；#144922 中单次 cron 触发出现 4 个 agent 会话并重复投递。这些场景直接打击“个人 AI 助手”的核心价值。
- **进程泄漏影响长时间运行**：#97616 用户反馈僵尸进程积累导致运行时降级，说明 7×24 小时运行场景下的资源管理仍有缺陷。
- **Docker 升级直接启动失败**：#150797 用户反馈同一 state 目录下替换镜像后 Gateway 无法启动，必须执行 `doctor --fix`，对生产部署影响很大。
- **WebUI 细节反馈集中**：用户在意焦点保持、主题不闪烁、日志滚动不被裁剪等细节，例如 #149618（加载历史时焦点丢失）、#147512（主题先闪默认值再恢复）、#149566（窄屏 hovercard 拦截点击）。
- **整体情绪**：因近期回归集中，用户对“升级安全”的信心受到影响，但对修复速度表示认可，多个 P0/P1 在数天到一周内被关闭。

## 8. 待处理积压

**长期未关闭的高优 Issue**

- [#123354 Matrix E2EE 停止解密（P1，2026-08-13 创建，已超 1 个月）](https://github.com/openclaw/openclaw/issues/123354) — 无 fix PR，需要维护者重点关注。
- [#65983 后台 PTY exec 在重启后变成未跟踪的孤儿进程树（P2，2026-04-13 创建）](https://github.com/openclaw/openclaw/issues/65983) — 已有 linked PR 但仍开放，涉及进程安全。
- [#57443 BytePlus Ark/doubao 的 patternProperties 400 错误（P2，2026-03-30 创建）](https://github.com/openclaw/openclaw/issues/57443) — schema 清理应通用化，长期无动作。
- [#7406 Telegram 主题名可读性（P2，2026-02-02 创建，积压超 7 个月）](https://github.com/openclaw/openclaw/issues/7406) — 小改动但长期被搁置。
- [#45233 FreeBSD 支持（P3，2026-03-13 创建，👍 4）](https://github.com/openclaw/openclaw/issues/45233) — 社区有呼声，需要至少给出路线图回应。

**长期未合并的 PR**

- [#117074 fix(sessions): reclaim expired cron history placeholders（2026-07-31 创建，状态 waiting on author 已超 1 个月）](https://github.com/openclaw/openclaw/pull/117074) — 解决 cron 历史占位符回收问题，等待作者补充后即可推进。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告（2026-09-18）

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正进入 **“增长极盛后的精细化整合期”**。各项目不再执着于堆砌新功能，而是将重心转向**消息可靠性、上下文完整性、进程生命周期管理**等底层硬骨头，多项目出现 P0/P1 突发回归，暴露出早期架构在长时运行和并发场景下的缺陷。与此同时，生态内部出现明显的**路线分化**：头部项目向组织级协作与安全治理迈进，腰部项目聚焦轻量化与特定协议适配，而底层评估工具链则趋于自动化与故障归因。社区情绪对**“升级安全”**极为敏感，任何配置迁移失败或非破坏性压缩缺失都会直接引爆信任危机。

---

## 2. 各项目活跃度对比

| 项目 | Issues（更新/新开） | PRs（更新/合并） | 版本发布 | 健康度评估 | 核心状态 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 142 / 103 | 500 / 201 | 无（2026.9.4） | 中风险 / 高修复节奏 | **高强度修复期**：大量 P0/P1 回归收口，升级体验抱怨集中 |
| **NanoBot** | 4 / 2 | 17 / 7 | 无 | 健康 / 响应迅速 | **稳定性打磨期**：精准修复记忆压缩与并发序列化问题，遗留高优串会话 Bug |
| **Zeroclaw** | 5 / 3 | 50 / 6 | 无 | 活跃 / 合入瓶颈 | **安全与治理双线推进**：修复绕过漏洞，优化审批队列，44 个 PR 待合并 |
| **PicoClaw** | 0 / 0 | 14 / 7 | 无 | 活跃 / 审查瓶颈 | **加固与扩展并存**：合入 Anthropic 原生协议，修复回复关联，大量 PR 被标 stale |
| **NanoClaw** | 0 / 0 | 17 / 4 | 无 | 活跃 / 架构调整 | **架构重构期**：网关技能化改造，修复安装脚本权限痛点（大版本升级隐患） |
| **IronClaw** | 1 / 0 | 0 / 0 | 无 | 稳定 / 低活跃 | **质量观测期**：无代码改动，聚焦每日失败任务分类与模型性能归因 |
| **LobsterAI** | 5 / 0 | 17 / 12 | 无（2026.9.16 收尾） | 中等偏上 / 长尾积压 | **版本发布收尾期**：集中合入网关自愈修复，但安全及过期 PR 积压严重 |
| **Moltis** | 2 / 2 | 2 / 0 | 无 | 平稳 / 响应偏慢 | **迭代停滞期**：Nix 构建失败与沙箱增强PR等待评审，默认配置 Bug 致 windows 失效 |
| **CoPaw** | 16 / 16 | 41 / 17 | 无 | 高吞吐 / 质量问题 | **快速迭代+质量补课**：合入 Hub 模型网关，但 subAgent 超时与插件冻结事件引发抗议 |

---

## 3. OpenClaw 在生态中的定位

**OpenClaw 无疑是该生态的绝对“中心参照物”与“基础设施层”**。

- **社区规模断崖式领先**：其单日 Issues (142) 与 PRs (500) 数量级是其他项目的 5~20 倍（如 CoPaw 的 41 个 PR、Zeroclaw 的 50 个 PR），庞大的用户基数使其成为生态故障的“风向标”。OpenClaw 遭遇的升级问题（#150452 一天修复、Docker 启动失败）往往反映的是整个品类在复杂环境下的通病。
- **技术路线差异**：OpenClaw 坚持 **“All-in-One 个人 AI 助手枢纽”** 路线，深度打通多渠道（Teams、Feishu、Matrix、Telegram）与多执行引擎（Codex、Claude CLI、exec），强调广连接而非单一 Agent 内核。这与 CoPaw 的组织级网关、NanoClaw 的插拔式网关形成鲜明对比。
- **优势与软肋**：优势在于**高强度的社区反馈循环**和**P0 级危机公关**（多个高危问题一周内关闭）；软肋在于**版本升级体验的剧烈波动**，即 2026.9.x 系列升级所需的运维成本已成为用户最大抱怨源。作为参照，NanoBot 的轻量快速修复（合并 PR 与 Bug 当日对应）反映了小型项目在敏捷性上的优势，而 OpenClaw 则验证了大体量项目的复杂度管理之痛。

---

## 4. 共同关注的技术方向

生态中多个项目不约而同地聚焦于以下痛点，揭示出当前 AI 助手从“Demo”走向“生产环境”的技术代差：

- **消息可靠性：防丢失、防重复、防串话**
  - **涉及项目**：OpenClaw（#150810 孤立最终化占位符、#144922 重复投递）、NanoBot（#5798 跨会话串话）、CoPaw（#7813 SSE 裸 null 导致 UI 冻结）。
  - **具体诉求**：保证多 Agent/多会话并发下，用户消息精准路由、管道的取消语义正确、以及异常情况下不产生占位符或僵尸回复。
- **上下文管理的正确性与非破坏性**
  - **涉及项目**：NanoBot（#5377 压缩截断上游游标）、CoPaw（#7810 设置 131k 实际提交 271k）、OpenClaw（#139847 回复运行中丢失消息）。
  - **具体诉求**：mem 压缩/淘汰机制不能破坏数据完整性，配置的 UI 显示应与运行时有效值保持一致，并应引入“Agent 参与的上下文决策”预警机制（CoPaw #7733）。
- **进程生命周期与资源隔离**
  - **涉及项目**：OpenClaw（#97616 hook/tool 子进程泄漏）、LobsterAI（#2698 网关锁竞争）、CoPaw（#7840 插件同步 I/O 冻结实例）、Moltis（#1272 沙箱细化）。
  - **具体诉求**：无论是插件、子进程还是外部工具，都必须有严格的超时、隔离、看门狗与资源回收机制，防止单个故障点拖垮全局运行时。
- **渠道能力差异的抽象与降级**
  - **涉及项目**：Zeroclaw（#10946 Mattermost purpose）、PicoClaw（#3349 QQ 401）、NanoBot（#5799 QQ 不支持编辑）、CoPaw（#7685 飞书折叠推理）。
  - **具体诉求**：不能在 Telegram/Discord 上有效的假设搬到 QQ/Matrix 上失效，渠道适配需支持显式的能力探测（如是否支持消息编辑）与按通道降级（静默压缩或通知折叠）。
- **安全边界的强制收紧**
  - **涉及项目**：Zeroclaw（#9882 图像绕过校验、#10678 Webhook 防 DNS rebinding）、LobsterAI（#1031 openExternal 任意协议）、Moltis（#1272 强制沙箱）。
  - **具体诉求**：AI 工具调用的输入输出校验不再只是“附加”，而是核心安全防线，向**默认拒绝（Deny by Default）** 策略演进。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 全渠道个人助理 + 高度可扩展 | 技术 KOL、重度效率用户 | 多执行引擎抽象（Codex/Claude/exec）+ 全渠道适配层，体量最重，交互最全 |
| **CoPaw** | 组织级多 Agent 协作中心 | 企业团队、数据科学团队 | **Hub 模型网关**（密钥阶层管理）+ 丰富的桌面/协作工具，偏模型治理与数据洞察 |
| **Zeroclaw** | **安全合规的策略审批引擎** | 对安全敏感的企业、监管行业 | 严格的审批流（`always_ask` 在 Full autonomy 下生效）、专项漏洞扫描（DAS/直通防护）、基于成本（warn/ceiling）的动态控制 |
| **NanoBot** | 极简高效的轻量智能体 | 独立开发者、中小团队 | 基于任务队列的 Worker 模型（当前修复重点）、高内聚的 API 封装，强调“小而美、不出错” |
| **NanoClaw** | 可编程的 AI 原生基础设施 | 开发者、DevOps | **基于技能的网关（Skills-based Gateway）** 与 Iron Proxy 插拔架构，可读取环境变量、高度可编程的安装脚本 |
| **LobsterAI** | 桌面级 AI 工作台与 IDE 融合 | Mac/Electron 桌面用户、中文区用户 | 与本地应用的深度集成（IPC 桥接），着重于本地进程管理、DNS 故障自愈等**桌面边缘自愈能力** |
| **PicoClaw** | 多协议兼容的轻量 Bot | 嵌入式/特定硬件用户（如 Sipeed） | 在极低资源消耗下勾连 IRC/DeltaChat/WhatsApp 等多个通信协议，侧重**协议兼容面** |
| **Moltis** | 调度与沙箱驱动的 Agent 守护进程 | Linux/Nix 高级用户 | 强调**可复现构建（Nix）** 与 OS 级调度（active_hours、运行身份、强制沙箱），极客倾向明显 |
| **IronClaw** | 模型评估与失败归因框架 | 基础模型开发者、数据师 | 通过**自动化的失败分类（Taxonomy）** 剥离框架代码缺陷与模型能力缺陷（如 DeepSeek V4 Flash），为模型选型提供决策依据 |

---

## 6. 社区热度与成熟度

**第一梯队：快速迭代与架构调整期（稳定性承压）**
- **OpenClaw** 与 **CoPaw**：高吞吐、高关注度。合入节奏极快（CoPaw 单日 17 个 PR 合入），且伴随大量用户反馈的 P1/P2 回归（subAgent 超时、插件冻结、WebUI 卡顿）。这两大社区都在为“活跃度过高”付出稳定性代价，showcasing 典型的**“规模阵痛期”**。
- **NanoClaw**：处于显式的架构重构期（Gateway 技能化为 6 个 PR），社区活跃但存在大量的“历史上被堵住的 PR”，成熟度在重构完成后有待观察。

**第二梯队：质量巩固与稳定输出期（可靠性坚定）**
- **NanoBot**：合入 PR 与 Bug 精确对应（#5379 修复 #5377），对回归问题的响应周期已缩短至 2 天内（#5792），代表其**工程成熟度最高**，项目节奏不追求量，而是追求“合入即正确”。
- **Zeroclaw**：在安全与治理层面双线推进，且维护者主动为外部贡献者刷新分支，展示出**健全的社区贡献机制**，但 44 个大量待合入 PR 是主要瓶颈。

**第三梯队：维护期与长尾化（面临失效或停滞风险）**
- **LobsterAI** 与 **PicoClaw**：均有一定数量的 Issue 因长期无活动而被 **stale 机器人盲目关闭**（如 PicoClaw 的 QQ 401、LobsterAI 的并发污染问题），但在核心需求上仍修修补补。这种“Bug 未修复就关闭”的处理机制对社区信任伤害极大。
- **IronClaw** 与 **Moltis**：活跃度极低，但各自拥有不可替代的生态位。IronClaw 通过**流程化（自动化归因）替代代码堆砌**来创造价值；Moltis 则近乎停滞，若无维护者回应（Nix 构建坏掉），将面临用户流失。

---

## 7. 值得关注的趋势信号

1.  **失败分类与评估工具链将独立成为“基础设施”**
    IronClaw 的每日失败分类（#8101）传递出一个强信号：当 AI 智能体框架复杂度远超代码逻辑本身时，**将评估结果与模型能力、代码缺陷解耦**将成为刚需。未来，类似 “Agent 测试医院” 的工具可能独立于 Agent 框架存在，被生态广泛复用。

2.  **“边缘治理”下沉到本地**
    从 CoPaw 的 Hub 模型密钥管理到 Zeroclaw 的 Webhook DNS 钉扎，以及 OpenClaw 对升级环境的 Doctor 修复，我们可以看到一个明显的趋势：**安全问题正从云侧迁移到用户本地设备/沙箱边界**。多项目强制沙箱（Moltis）、URL 协议白名单（LobsterAI）、图像标记校验（Zeroclaw），意味着开发者必须将安全默认值内置到代码路径的最底层，即 “Embedded Security”，而不是依赖运行时配置。

3.  **由“渠道碎片化”引发的降级抽象需求**
    QQ 通道无法撤回、飞书需要折叠推理、Mattermost 需要注入 purpose... 各项目在适配长尾渠道时都“踩坑”，这会产生一个机会：**基于“渠道能力矩阵（如 is_editable, is_group, supports_thread）”的标准抽象层** 将取代简单的 “发送/接收” 接口，成为下一轮 AI 助手中间件的新竞争高地。

4.  **“非破坏性压缩”是长会话智能体的生命线**
    当上下文窗口理论上限达到百万级时，用户不再焦虑“窗口不够大”，而是焦虑 **“压缩/淘汰后我原本的上下文是否会坏”**。NanoBot 修复游标、CoPaw 重写 scroll、OpenClaw 处理占位符，这些工程细节的价值在 2026 年已全面超越“新增一个功能”的价值。**不破坏用户数据完整性、可视化地展示“哪些内容被压缩了”**，将成为开发者获取用户信任的黄金门票。

5.  **社区维护策略影响项目存亡**
    PicoClaw 和 LobsterAI 暴露的 **“stale 机器人误伤有效 Bug”** 以及 **“外部贡献者 PR 被无理由积压一个月以上”** 的问题，正在让这些项目失去人气。而 NanoBot（极速修复）与 Zeroclaw（维护者亲自接棒）、说明 **“人味”的维护策略**比任何“代码质量”更能决定该项目能否冲过生命周期的某个关键节点。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-18

## 今日速览

过去 24 小时项目活跃度维持高位：共 4 条 Issue 更新（2 新开/活跃、2 关闭）、17 条 PR 更新（10 待合并、7 已合并/关闭），无新版本发布。合并的 PR 集中在稳定性修复上，覆盖记忆压缩数据完整性（#5379）、会话消息序列化/批处理（#5792）、QQ 通道压缩通知噪音（#5799）、API 布尔流参数校验（#5765）及 Cron 调度字段冲突与过期时间拒绝（#5766/#5762）等方向。整体来看，项目处于高频迭代的稳定期，对社区报告的回归与边界条件问题响应迅速，多个历史遗留 issue 在本日闭环。

## 项目进展

今日合入的 7 个 PR 主要围绕稳定性与正确性展开，显著降低了数据丢失、消息错乱和配置歧义的风险：

- **fix(memory): preserve full consolidation input**（#5379，合入） — 修复 #5377：consolidation 截断格式化对话后，调用方仍将 `last_consolidated` 推进至完整批次的问题。该修复保留了 `history.jsonl` 边界内的全部原始回退字符，避免消息/后缀因截断而静默丢失。对应修复了旧数据被截断但游标继续前进的严重一致性 bug。
- **fix(agent): serialize and batch per-session messages**（#5792，合入，P1 回归修复） — 为每个会话 worker 安装唯一 FIFO 收件箱，将渠道输入、自动化轮次和排队 `/compact` 命令统一收敛至同一准入函数和 worker，消除启动期特殊执行路径与总线重复发布，从根因上修复串话/乱序回归。
- **fix(channels): drop compaction notices on channels without an in-place affordance**（#5799，合入，P2） — 修复 #5784：在 QQ 这类不支持编辑/撤回的渠道上不再发送 `Compressing context...` / `Context compacted.` 常驻消息，消除噪音。
- **fix(api): require boolean stream values**（#5765，合入，P2） — OpenAI 兼容端点现在严格要求 `stream` 为布尔值，避免 `"stream": "false"` 这类字符串被 Python 真值判断误判为 SSE 模式。
- **fix(cron): reject conflicting schedule fields**（#5766，合入，P2） — `every_seconds` / `cron_expr` / `at` 互斥字段不再静默选优，而是显式报错，防止调度行为与用户预期不符。
- **fix(cron): reject past one-time schedules in the cron tool**（#5762，合入，P2） — 拒绝过去时间点的 `at` 值，避免任务永远不触发且残留 `next_run_at_ms=None` 的悬挂状态。
- **fix(webui): hide model details until AI setup is complete**（#5802，合入） — 当 `needsSetup` 为真时，WebUI 不再暴露默认模型/提供商信息，保持设置引导一致性。

这些合入使项目在记忆管理、会话一致性、渠道适配、API 兼容性和 Cron 工具五个维度均获得实质加固。

## 社区热点

- **Issue #5377：consolidation 截断输入但游标推进整个批次**（3 条评论，已关闭，[链接](https://github.com/HKUDS/nanobot/issues/5377)）— 该 issue 由用户 @dajiaohuang 在 8 月 13 日提交，经 35 天讨论与修复后于今日关闭。讨论焦点在于：截断后的数据是否应回写 `history.jsonl` 以保证游标与内容一致性，以及安全上限的处理。背后诉求是**数据完整性与可恢复性**——长时间的对话压缩不应以静默丢失中间消息为代价。
- **Issue #5784：自动压缩通知在 QQ 通道成为不可折叠的常驻消息**（2 条评论，已关闭，[链接](https://github.com/HKUDS/nanobot/issues/5784)）— 用户抱怨压缩生命周期通知“像普通聊天消息一样”出现在会话中，且 QQ API 无编辑/撤回端点，无法折叠。这暴露了**通道能力差异未被抽象**的产品缺口：不是所有渠道都具备 Telegram/Discord 的消息编辑能力，统一发送逻辑需要按通道降级。该 issue 的修复 PR #5799 同日合入，响应周期仅 2 天。

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| 高（数据一致性/串话回归） | [#5798](https://github.com/HKUDS/nanobot/issues/5798) | 会话串问题：A 会话运行时，B 会话的交流内容会被回复到 A 会话中。用户确认 0.3.0 无此问题，0.3.5 引入回归。影响多会话并发场景下的隔离性 | 🟡 待处理，昨日新建尚无评论 |
| 高（数据丢失） | [#5377](https://github.com/HKUDS/nanobot/issues/5377) | consolidation 截断输入但游标推进全量，消息/后缀被静默丢弃 | ✅ 已由 #5379 修复并合入 |
| 中（渠道噪音） | [#5784](https://github.com/HKUDS/nanobot/issues/5784) | QQ 通道压缩通知以常驻消息发送，无法折叠 | ✅ 已由 #5799 修复并合入 |
| 中（API 解析） | PR [#5765](https://github.com/HKUDS/nanobot/pull/5765) | `stream:"false"` 字符串被当真值处理，误入 SSE 模式 | ✅ 已合入 |
| 中（调度逻辑） | PR [#5766](https://github.com/HKUDS/nanobot/pull/5766) / [#5762](https://github.com/HKUDS/nanobot/pull/5762) | Cron 调度字段冲突静默选优；过去的 `at` 时间导致任务悬挂 | ✅ 均已合入 |
| 低（WebUI 状态） | PR [#5802](https://github.com/HKUDS/nanobot/pull/5802) | AI 未设置完成时，composer 仍暴露默认模型信息 | ✅ 已合入 |

整体来看，今日合入的修复与 3 个历史 bug 形成精确对应，项目对回归问题的响应速度值得肯定。唯一悬而未决的高严重度项是 #5798（串会话），该问题直接影响多会话并发的核心体验，建议优先调查 #5792 的修复是否完全覆盖其触发路径，或确认是否属于独立的新回归。

## 功能请求与路线图信号

- **#5459：为 Claude 模型添加原生 Google Vertex AI provider**（[链接](https://github.com/HKUDS/nanobot/issues/5459)）— 用户列举了当前已支持的 Anthropic 直连、OpenAI、Azure OpenAI、Bedrock 等，但缺少 Vertex AI 上的 Claude 托管。考虑到企业用户对 Vertex AI 的合规/网络偏好需求强烈，且实现路径可复用现有 Anthropic provider 的协议层，此请求有较大概率被纳入后续里程碑。
- **PR #5800：Discord `replyToMessage` 与 Telegram 对齐**（[链接](https://github.com/HKUDS/nanobot/pull/5800)，P2，待合并）— 为 Discord 渠道增加可选的回复触发消息能力，默认关闭，并保留显式回复目标与抑制提及。社区对跨渠道行为一致性的诉求正在增强。
- **PR #5718：OpenRouter 原生图像生成 API 支持**（[链接](https://github.com/HKUDS/nanobot/pull/5718)，P2，待合并）— OpenRouter 已推出原生 Images API，Nanobot 需适配以继续兼容其图像生成服务。属于外部服务演进驱动的适配型需求。
- **PR #5803：Telegram 小改进集**（[链接](https://github.com/HKUDS/nanobot/pull/5803)，含富文本换行、`topic_id` 暴露、typing 状态按 topic 区分）— 典型的体验打磨型 PR，合入门槛低、用户感知强。
- 其他待合并功能型 PR：`feat(api): stream tool progress events`（#5562，P2）、`Add model provider removal controls`（#5352，P2）、`fix(subagent): mark partial completion results`（#5152）等仍停留于待合并队列，反映维护者在合并节奏上趋于谨慎，可能等待更多测试反馈。

## 用户反馈摘要

- **压缩过程应是“隐形”的**（#5784）：用户明确将压缩通知定义为“noise class”，并主动关联同类问题 #5719。这提示：对于不支持就地更新的通道，更为优雅的方案可能是完全静默压缩，或允许用户配置通知级别。
- **多会话隔离是 3.x 的信任底线**（#5798）：用户对比 0.3.0 与 0.3.5 的行为差异，表达“固定回复固定会话”的强烈预期。这类回归容易动摇用户对并发稳定性的信心，建议在 0.3.x 分支中优先热修复。
- **用户会做根因分析**（#5377）：bug 报告中直接定位到 `Consolidator.archive()` 与 `Session.last_consolidated` 之间的逻辑矛盾，说明社区中存在具备较高代码阅读能力的深度用户，这类用户在维护项目质量中扮演重要角色。
- **对消歧义校验持欢迎态度**（#5766/#5762 相关讨论）：多个 cron 相关 PR 合入后未收到反对意见，用户更希望工具参数“fail loudly”而非“fail silently”。

## 待处理积压

以下为长期未闭环或需要维护者关注的事项：

- **#5798 会话串问题**（[链接](https://github.com/HKUDS/nanobot/issues/5798)）— 昨日新开的高严重度回归，目前 0 评论、无 fix PR。鉴于影响核心会话隔离，建议维护者尽快与 #5792 的修复做交叉验证，或在 issue 中给出排查计划。
- **#5459 Vertex AI provider 请求**（[链接](https://github.com/HKUDS/nanobot/issues/5459)）— 创建于 2026-08-20，近一个月仅 1 条评论且无实现 PR。企业级用户对 Google Cloud 上 Claude 模型的需求明确，建议至少回复 roadmap 意向。
- **PR #5152 fix(subagent): partial completion results**（[链接](https://github.com/HKUDS/nanobot/pull/5152)）— 创建于 2026-07-28，已超过 50 天仍处于打开状态。涉及子代理完成结果的正确性，长期拖延会增加冲突风险。
- **PR #5352 Add model provider removal controls**（[链接](https://github.com/HKUDS/nanobot/pull/5352)）— 创建于 2026-08-12，35 天未合入。功能已完成且含 WebUI 与本地化反馈，可能因涉及删除操作的 UI 设计需要额外评审。
- **PR #5611 feat(agent): bound reasoning replay to the latest assistant turn**（[链接](https://github.com/HKUDS/nanobot/pull/5611)）— 创建于 2026-08-30，标注 conflict 状态，需 rebase。该特性对控制推理 token 成本有直接价值，建议维护者协调解决冲突。

---

**数据来源**：HKUDS/nanobot GitHub 仓库，统计窗口为 2026-09-17 至 2026-09-18。

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目日报 — 2026-09-18

## 1. 今日速览

过去 24 小时项目活跃度处于高位：共 5 条 Issue 更新（3 新开 / 2 关闭）和 50 条 PR 更新（44 待合并 / 6 合并或关闭）。2 个历史遗留问题得到解决，其中包含一个 priority:p1 的安全漏洞（#9882），另有 2 个新 Bug 被报告。维护者 @Audacity88 对多个社区贡献 PR（#9724、#8966、#10266）进行了分支刷新与规范化修复，说明维护者正在集中处理积压贡献。未发布新版本，44 个待合并 PR 构成一定合入压力。

---

## 3. 项目进展

> 无新版本发布，本部分聚焦合并/关闭进度。

**合并/关闭 PR：6 个**（本日报可确认 1 个）：

- [#10618 [已关闭] feat(maintainers): surface approval carry-forward candidates](https://github.com/zeroclaw-labs/zeroclaw/pull/10618)
  改进维护者审批队列：在 `second-core` 队列中识别旧的活跃 Core 审批是否仍适用于当前 head，排除已被替代的审批，帮助维护者判断旧审批的效力，提升多 Core 评审场景的准确度。

**关闭的 Issue 对应的修复进展：**

- [#9882（已关闭）安全漏洞：图像标记绕过 run_model_query 直通 seam 的内容校验](https://github.com/zeroclaw-labs/zeroclaw/issues/9882)
- [#10292（已关闭）Bug：ACP 会话工具无法列出或检查 Code 会话](https://github.com/zeroclaw-labs/zeroclaw/issues/10292)

**关键在途修复（已就绪待合入，体现项目推进方向）：**

- [#10804 fix(runtime): scope cost tracking into delegated sub-loops and enforce per-agent ceilings](https://github.com/zeroclaw-labs/zeroclaw/pull/10804) — 修复委托子循环中成本追踪缺失的问题（此前 `record_tool_loop_cost_usage` 对每次委托 LLM 调用均返回 `None`），并为每个 agent 增设成本上限。
- [#10860 fix(providers): keep non-image data-URI markers in tool results as text](https://github.com/zeroclaw-labs/zeroclaw/pull/10860) — 修复非图像 data-URI 标记被错误当作图像处理的安全/正确性问题。
- [#10621 feat(runtime): coordinate agent lifecycle mutations](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) — 统一 daemon RPC、gateway、channels、ACP admission 与 CLI 的 live-config 权威，协调 agent 准入与会话状态。
- [#10197 fix(acp): persist interrupted turn progress](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) — 为被中断的 Code/ACP turn 增加检查点与原子恢复机制。

---

## 4. 社区热点

- **[#8692 [OPEN] Maintainer decision queue for RFCs and design issues（15 条评论，最活跃 Issue）](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**
  这是一个维护者决策队列 tracker，用于跟踪需要维护者或 code-owner 处理的 RFC、设计问题、发布策略问题及协调类 tracker，覆盖接受/拒绝/推迟/拆分等决策出口。15 条评论的高讨论量表明社区对治理流程透明度的强烈诉求，希望 RFC 和设计决策有明确的排队与结论机制。

- **[#9724 fix(approval): always_ask survives Full autonomy [needs-maintainer-review]](https://github.com/zeroclaw-labs/zeroclaw/pull/9724)**
  由 @kckylechen1 原创、维护者 @Audacity88 刷新并修复规范性问题。该 PR 触及审批策略核心（`always_ask` 在 Full autonomy 下被绕过），风险标记为 high、尺寸 XL，已积压 45 天，是社区关注度较高的合规/安全类修复。

- **维护者社区协作模式**：多个 PR 上（#9724、#8966、#10266）出现维护者刷新分支、修复策略归属、保留原作者署名的注释。这种"保持原始归属 + 维护者接力"的模式降低了社区贡献的合入门槛，也解释了 44 个 PR 的高待合并量——每个 PR 都经过仔细规范化处理。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue / PR | 状态 | 说明 |
|---|---|---|---|
| 🔴 **高** (p1, security, risk:high) | [#9882 图像标记绕过 run_model_query 直通 seam 的内容验证](https://github.com/zeroclaw-labs/zeroclaw/issues/9882) | ✅ 已关闭 | 多模态标准化器已加固，但直通路径仅剥离音频标记、未执行 `prepare_messages_for_provider`，导致图像标记绕过内容校验。已修复。 |
| 🟠 **中** (S2) | [#10950 cost.warn_at_percent 预算告警被运行时忽略](https://github.com/zeroclaw-labs/zeroclaw/issues/10950) | 新开，无 fix PR | 用户配置了成本告警阈值但从未收到告警；源码定位到 `CostTracker` 的具体缺口。成本控制功能存在实装缺陷，建议尽快跟进。 |
| 🟠 **中** (S2) | [#10951 ZeroCode Config 保存后字段列表重复刷新两次](https://github.com/zeroclaw-labs/zeroclaw/issues/10951) | 新开，无 fix PR | 每次保存会触发两次 `config/list` 请求并完整克隆配置，造成 UI 卡顿与冗余开销。 |
| 🟠 **中** (S2) | [#10292 ACP 会话工具无法列出/检查 Code 会话](https://github.com/zeroclaw-labs/zeroclaw/issues/10292) | ✅ 已关闭 | `sessions_list` 遗漏近期 Code 会话，仅返回旧 Chat 会话。已修复。 |

**相关修复 PR（风险缓解信号）：**

- [#10860 非图像 data-URI 标记误判为图像](https://github.com/zeroclaw-labs/zeroclaw/pull/10860) — 同类校验绕过问题，待合入。
- [#10890 图像标记按纯文本计费导致 token 估算严重偏低（~9 token vs 实际 1.5k–2k）](https://github.com/zeroclaw-labs/zeroclaw/pull/10890) — 影响预算控制的正确性，待合入。
- [#10928 识别已退出的 Windows 任务属主](https://github.com/zeroclaw-labs/zeroclaw/pull/10928) — 修复 Windows 进程退出状态误判，待合入。

---

## 6. 功能请求与路线图信号

**较可能进入下一版本的新能力（已有 PR 实现）：**

- [#10946 feat(channels): inject Mattermost channel purpose](https://github.com/zeroclaw-labs/zeroclaw/pull/10946) — 新 PR（@alucryd）：将 Mattermost 房间的 channel purpose 注入系统提示词，提供按别名开启的 `purpose_as_instructions` 选项（默认关闭），增强房间语义理解。
- [#10907 feat(channels): stamp external ingress provenance](https://github.com/zeroclaw-labs/zeroclaw/pull/10907) — 渠道入口来源标记，为运行时准入提供渠道消息的真实身份，替代当前占位的 internal/trusted 信封。
- [#10855 docs(governance): implement RFC vote simplification](https://github.com/zeroclaw-labs/zeroclaw/pull/10855) — RFC 投票流程简化与投票记录澄清，与 #8692 决策队列请求形成呼应。
- [#10834 docs(adr): record runtime security provenance boundaries](https://github.com/zeroclaw-labs/zeroclaw/pull/10834) — 通过 ADR 固化运行时安全来源边界。

**路线图信号：**
- 治理与决策流程是当前社区关注重点（#8692 tracker + #10855 投票简化），治理/文档类 PR 占比明显上升。
- 安全加固主线持续推进（#9882、#10860、#10678 webhook 审计目标钉扎），渠道安全与内容校验成为迭代重心。

---

## 7. 用户反馈摘要

- **成本告警缺失（#10950）**：用户配置 `cost.warn_at_percent` 后始终未收到预算警告，源码审查确认 `CostTracker::check` 存在缺口。该类问题直接削弱用户对成本控制的可信赖度，多位配置了预算上限的用户可能受影响。

- **治理决策等待时间长（#8692）**：社区通过 tracker 方式要求维护者对 RFC/设计问题给出明确的接受、拒绝或推迟结论，反映"决策不透明、排队不可见"是贡献者的主要痛点。

- **社区贡献者体验正向信号**：@kckylechen1、@eugeneb50、@grrowl 的 PR 虽经维护者大量刷新，但原始归属均被明确保留（"original contribution remains credited to"）。这种协作方式鼓励外部贡献，符合"distinguished contributor"标签的设定。

- **配置操作反馈（#10951）**：保存字段触发双重 `config/list` 请求，用户可感知到 UI 卡顿与冗余网络开销，属于体验层面的常见痛点。

---

## 8. 待处理积压

以下为长期未合入且需维护者关注的重要项目（按积压时长排序）：

| 项目 | 时长 | 风险 | 说明 |
|---|---|---|---|
| [#8966 feat(agent): carry live provider identity on usage events](https://github.com/zeroclaw-labs/zeroclaw/pull/8966) | 69 天（2026-07-11 开启） | risk:high, size:XL | 超大型功能 PR（14 个标签维度），已由维护者刷新，需评估合入窗口。 |
| [#9724 fix(approval): always_ask survives Full autonomy](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) | 45 天（2026-08-04 开启） | risk:high, size:XL, needs-maintainer-review | 审批策略安全修复，已刷新至 master，等待最终合入决策。 |
| [#10197 fix(acp): persist interrupted turn progress](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) | 29 天（2026-08-20 开启） | risk:high, risk:manual, size:XL | ACP 中断恢复能力，涉及手动回归测试，需安排维护者验证。 |
| [#10266 fix(channels): implement is_direct_message for WhatsApp Web](https://github.com/zeroclaw-labs/zeroclaw/pull/10266) | 26 天（2026-08-23 开启） | risk:medium, needs-maintainer-review | 社区贡献 + 维护者补充业务模式回显防护，等待合入。 |
| [#10678 fix(hooks): pin webhook audit destinations](https://github.com/zeroclaw-labs/zeroclaw/pull/10678) | 11 天（2026-09-07 开启） | risk:high, domain:security, needs-maintainer-review | Webhook 审计投递的 DNS rebinding 防护（拒绝私网/云元数据地址），安全相关，建议优先合入。 |

---

**项目健康度小结**：Zeroclaw 在 24 小时内保持高吞吐迭代（50 条 PR 更新），安全类修复与治理流程改进双线推进，维护者对社区贡献的承接积极。需关注的风险点：① 44 个 PR 处于待合并状态，合入管道存在瓶颈；② #10950 成本告警失效与 #10951 重复刷新均为新报告的 S2 问题，尚无修复 PR；③ 多个 risk:high、size:XL 的 PR 积压超过一个月，建议维护者在本周内给出明确的合入或关闭决策。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报

**日期：2026-09-18**  
**数据窗口：2026-09-17 00:00 – 2026-09-18 00:00（UTC）**  
**数据来源：github.com/sipeed/picoclaw**

---

## 1. 今日速览

过去 24 小时项目整体处于**稳定迭代期**：无新 Issue 报告、无新版本发布，但有 1 条遗留 Issue 被关闭；PR 更新 14 条，其中 7 条已合并/关闭、7 条仍在待合并状态。合并/关闭的 PR 以 Dependabot 依赖更新为主（5 条），同时包含 1 条功能性修复（agent 回复关联问题）和 1 条长期挂起的功能 PR（Anthropic 原生 API 协议）。值得关注的是，7 条待合并 PR 中 5 条已带有 `[stale]` 标记，且最早挂起时间可追溯至 7 月初，**维护者审查速度是当前项目健康度的主要瓶颈**。整体而言，自动化依赖维护运转良好，社区功能贡献活跃，但版本发布节奏偏慢。

---

## 2. 版本发布

**无新版本发布。** 最近一次 Release 时间待确认，项目已有一段时间未发布新版本。考虑到 7 条待合并 PR 中包含多项功能性增强（IRC、DeltaChat、远程配对等），建议维护者考虑近期规划一次集中发版。

---

## 3. 项目进展

今日合并/关闭的 PR 中，以下 2 条属于实质性变更：

| PR | 类型 | 说明 |
|---|---|---|
| [#1158 [CLOSED] feat: add anthropic-messages protocol for native Anthropic API format, Fixes #269](https://github.com/sipeed/picoclaw/pull/1158) | 功能 | 新增 `anthropic-messages` 协议前缀，支持 Anthropic 原生 Messages API（`/v1/messages` 端点）格式的 LLM 服务。该 PR 从 3 月初创建至今日关闭，历时 6 个半月，解决了仅支持 Anthropic 原生 API 格式的代理服务无法接入的问题（#269）。 |
| [#3358 [CLOSED] fix(agent): thread responses to the originating question message](https://github.com/sipeed/picoclaw/pull/3358) | 修复 | 修复 agent 在非回复场景（如群组内纯 @提及）下，出站响应未带 `ReplyToMessageID`，导致回答与提问消息在聊天中脱节的问题。在繁忙群组中此修复显著提升对话可读性。 |

另有 5 条 Dependabot 依赖更新关闭：  
[#3360 larksuite/oapi-sdk-go v3.9.4→3.11.0](https://github.com/sipeed/picoclaw/pull/3360) · [#3361 protobuf 1.36.11→1.36.12](https://github.com/sipeed/picoclaw/pull/3361) · [#3362 golang.org/x/term 0.44.0→0.45.0](https://github.com/sipeed/picoclaw/pull/3362) · [#3363 ergochat/irc-go 0.6.0→0.7.0](https://github.com/sipeed/picoclaw/pull/3363) · [#3364 aws-sdk-go-v2 1.42.0→1.45.1](https://github.com/sipeed/picoclaw/pull/3364)

> 注：以上依赖 PR 均标记为 `[stale]`，具体为"合并"抑或"机器人自动关闭"需根据仓库实际操作记录确认，日报内不做定论。

**项目向前推进评估：** 并发消息处理能力获得修复，LLM 服务兼容范围扩大（原生 Anthropic 协议），依赖保持更新。虽无重大里程碑事件，但方向是正确且连续的。

---

## 4. 社区热点

今日讨论活跃度相对集中的条目如下：

- **[#3349 [CLOSED] QQ频道无法正常使用](https://github.com/sipeed/picoclaw/issues/3349)** — 5 条评论，是 24h 内唯一被更新的 Issue。用户报告 QQ 频道在 Docker 和 Linux x86 两种部署方式下均复现同样错误：gateway 日志返回 `401`，错误码 `11241`，具体信息为"请求头Authorization参数格式错误"。该 Issue 被标记为 `[stale]` 并关闭，**但值得警惕的是，从摘要看该 Bug 可能并未真正修复，而是因长期未活跃被机器人清理**。这或成为社区信任度的一个负面信号。

- **[#3381 [OPEN] feat: :sparkles: Switch Openai to responses API](https://github.com/sipeed/picoclaw/pull/3381)** — 今日新创建的 PR，属于对 OpenAI 提供商架构的调整，预计将引发对 API 兼容性和配置迁移的讨论。

- **[#3368 [OPEN] docs: add Parallel Search MCP setup example](https://github.com/sipeed/picoclaw/pull/3368)** — 文档类 PR，为 CLI 指南增加 Parallel Search MCP 的复制粘贴式配置，聚焦搜索能力扩展。

**诉求分析：** 社区热点集中在「渠道可用性」（QQ 频道报错）与「AI 能力扩展」（OpenAI API 变更、MCP 搜索集成）两个方向。前者是影响实际使用的痛点，后者体现用户对 PicoClaw 作为 AI 助手在模型接入灵活度上的期待。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue/PR | 状态 | 说明 |
|---|---|---|---|
| 🔴 高 | [#3349 QQ频道401错误](https://github.com/sipeed/picoclaw/issues/3349) | **已关闭（stale）** | QQ 频道频道接入认证失败，用户在 Docker 和 Linux x86 环境均复现。错误指向 `Authorization` 请求头格式错误（code 11241）。**目前无对应 fix PR**，且 Issue 已被 stale 关闭，需要维护者主动确认该 Bug 是否仍在存在。 |
| 🟠 中 | [#3376 deltachat 配置验证错误](https://github.com/sipeed/picoclaw/pull/3376) | Pending、待合并 | 解决启用 deltachat 通道时 `unknown type "deltachat"` 的配置加载失败问题（参考 #3265）。解法为将 deltachat 注册为自定义通道。PR 创建于 9 月 10 日，一周未合并。 |
| 🟡 低 | [#3353 工具反馈动画边界问题](https://github.com/sipeed/picoclaw/pull/3353) | Pending、待合并 | 修复因生命周期清理遗漏导致频道消息被无限编辑的问题：动画在 5 分钟后强制停止，并在首次编辑出错后立即停止。 |
| 🟢 已修复 | [#3358 agent 回复未关联原消息](https://github.com/sipeed/picoclaw/pull/3358) | 已合并 | 已在 3 中详述。 |

**稳定性总结：** 今日无新增回归性 Bug；存量 Bug 主要集中在渠道接入层（QQ 与 DeltaChat），均有明确问题定位和修复方案，但其中一个被关闭、另一个等待合并，需要维护者推动闭环。

---

## 6. 功能请求与路线图信号

近期 PR 中出现的功能方向，可以勾勒出 PicoClaw 未来的可能路线：

| 方向 | PR | 状态 | 潜在影响 |
|---|---|---|---|
| **模型接入扩展** | [#3381 OpenAI 切换到 responses API](https://github.com/sipeed/picoclaw/pull/3381) | 待合并（新） | 若合并，OpenAI 提供商将用最新的 responses API 替代旧版 completions，可能带来更低延迟和更丰富的响应能力。 |
| **模型接入扩展** | [#1158 Anthropic 原生 Messages API 协议](https://github.com/sipeed/picoclaw/pull/1158) | 已合并 | 兼容仅支持 Anthropic 原生格式的服务，扩展了 LLM 服务商选择面。 |
| **通信渠道** | [#3354 IRCv3 多行消息支持](https://github.com/sipeed/picoclaw/pull/3354) | 待合并（stale） | 接收 IRCv3 `draft/multiline` 多行消息，提升 IRC 渠道的消息完整性。 |
| **远程交互** | [#3344 Build Remote Agent 手机配对（gbr/1）](https://github.com/sipeed/picoclaw/pull/3344) | 待合并 | 允许手机通过 `gbr-agent` 配对并观测桌面 Agent，扩展移动端使用场景。 |
| **搜索能力** | [#3368 Parallel Search MCP 配置示例](https://github.com/sipeed/picoclaw/pull/3368) | 待合并 | 为 CLI 用户提供开箱即用的搜索 MCP 集成（免 API key，经 Sogou 搜索）。 |
| **代码质量/架构** | [#3222 DeltaChat 实现清理与重构](https://github.com/sipeed/picoclaw/pull/3222) | 待合并（stale） | 删除遗留特性，瘦身 200 行，引用官方 relay 列表，安全配置迁移至 jsonrpc。 |

**下一版本候选功能预判：** 以上 6 条中，至少 3-4 条（#3381、#3354、#3368、#3222）具备被纳入下一版本的条件，且均有明确的实现完成度。若维护者集中处理，下次发版将涵盖模型协议升级、IRC 增强、文档完善和架构优化。

---

## 7. 用户反馈摘要

基于今日仅有评论数据的 Issue（#3349）及 PR 描述文本提炼：

- **QQ 频道接入是真实痛点：** 用户 @bxwl5 明确测试了 Docker 版和 Linux x86 版两个部署形态，均稳定复现认证失败问题。这反映出用户在多种部署环境下都期望 QQ 频道可用，而配置指引可能不够清晰或 SDK 接入存在兼容问题。
- **部署敏感度高：** 用户会主动尝试多种运行方式（容器、二进制），并对 gateway 日志中的错误码和 trace_id 有较精准的呈现，说明使用者的技术背景较强，反馈质量高。
- **对 Agent 对话体验有期待：** PR #3358 的描述侧面反映出用户对群组内 bot 回复的上下文连续性有明确要求——回答必须挂在问题消息下，否则"在繁忙群组中很难找到对应关系"。
- **对新模型接入积极：** #3381（OpenAI responses API）、#1158（Anthropic 原生协议）的作者均以较低成本提交了完整实现，说明社区对 PicoClaw 在 LLM 服务商兼容性上有持续诉求。

**满意度判断：** 当前用户对项目功能覆盖度认可（渠道多、协议全），但在**渠道级 Bug 的修复时效**和**PR 合并速度**上可能有不满意情绪。

---

## 8. 待处理积压

以下 PR/Issue 长期未获响应或关闭，建议维护者优先关注：

| 条目 | 创建时间 | 挂起时长 | 类型 | 建议 |
|---|---|---|---|---|
| [#3222 DeltaChat 重构与清理](https://github.com/sipeed/picoclaw/pull/3222) | 2026-07-03 | 77 天 | 重构 | 标记 `[stale]`，代码已实现且描述完整，建议 reviewer 明确合并或关闭并给予反馈。 |
| [#3344 Build Remote Agent 手机配对](https://github.com/sipeed/picoclaw/pull/3344) | 2026-08-23 | 26 天 | 功能 | 已补充协议说明（`gbr/1`）与安装步骤，无 stale 标记但等待时间较长。 |
| [#3354 IRCv3 多行消息支持](https://github.com/sipeed/picoclaw/pull/3354) | 2026-08-31 | 18 天 | 功能 | 标记 `[stale]`，功能完整但可能有待补充的 test case。 |
| [#3353 工具反馈动画边界修复](https://github.com/sipeed/picoclaw/pull/3353) | 2026-08-31 | 18 天 | Bug 修复 | 标记 `[stale]`，修复内容具体且低风险，建议尽快合并。 |
| [#3376 DeltaChat 配置验证错误修复](https://github.com/sipeed/picoclaw/pull/3376) | 2026-09-10 | 8 天 | Bug 修复 | 无 stale 标记，仍在合理响应窗口内，但考虑到 #3349 等渠道类问题被关闭，建议加速处理。 |
| [#3349 QQ 频道 401 错误（Issue）](https://github.com/sipeed/picoclaw/issues/3349) | 2026-08-30 | 19 天 → **已关闭** | Bug 报告 | 被 stale 机制关闭；若 Bug 仍存在，建议重新打开或通过新 Issue 跟踪，避免用户问题无处反馈。 |

---

## 附：项目健康度简评

| 维度 | 状态 | 说明 |
|---|---|---|
| 代码活动 | 🟢 活跃 | 24h 内 14 条 PR 更新，包含依赖维护和功能开发 |
| 维护响应 | 🟡 中 | 待合并 PR 积压存在 stale 化风险；Issue 被自动关闭但 Bug 可能未修复 |
| 版本节奏 | 🟠 偏慢 | 无新 Release，多项已完成功能未对外交付 |
| 社区参与 | 🟢 健康 | 外部贡献者活跃（#3381、#3376、#3368、#3354 等来自社区） |

**给维护者的一句话提醒：** 尽快将 #3353、#3354、#3376 三条低风险 PR 纳入合并队列，并处理 #3349 的遗留状态，以避免社区贡献者的积极性持续流失。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-18

## 1. 今日速览

过去 24 小时 NanoClaw 项目活跃度较高，共产生 17 条 PR 动态与 1 条 Issue 关闭。核心团队在网关（Gateway）架构、安装脚本健壮性与技能（Skill）生态三个方向密集提交代码，其中 13 条 PR 仍处于待合并状态，说明当前正处于一轮较大的架构调整期。值得关注的是，所有关闭/合并的 PR 均集中于安装体验修复与技能系统扩展，而长期积压的 open PR（#2681、#3156、#3551 等）仍在等待评审。Issue 侧今日无新报告，社区讨论热度集中在 Podman 支持这一个代表性需求上。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共 4 条 PR 关闭/合并，主要集中在安装体验修复与技能系统扩展：

- **#3844 [已关闭]** `fix(setup): replace broken sudo retry with user-owned npm prefix fallback`
  修复了当 Node.js 通过系统包管理器安装时 `setup.sh` 中 `pnpm` 安装失败的问题。此前在 Fedora/Debian 等发行版上会因 `EACCES` 权限错误永久失败，现改为用户级 `npm prefix` 回退方案。
  https://github.com/nanocoai/nanoclaw/pull/3844

- **#3847 [已关闭]** `fix(setup): enable corepack pnpm in ~/.local/bin when the global bin dir is read-only`
  解决了 Linux 系统全局 Node 安装（`/usr` 目录）且用户非 root 时，`corepack enable` 因无法在 `/usr/bin` 创建符号链接而挂起的问题。这一修复与 #3844 互补，共同覆盖了系统包管理器安装 Node 的场景。
  https://github.com/nanocoai/nanoclaw/pull/3847

- **#3846 [已关闭]** `feat(skills): add /add-typesafe-tool and the maintainer agent template`
  新增 TypeSafe Jev 决策模型作为容器工具，并配套添加 `maintainer` agent 模板，使分类、路由、排序等操作可通过该工具进行统一判断。
  https://github.com/nanocoai/nanoclaw/pull/3846

- **#3148 [已关闭]** `fix: honor WEBHOOK_PORT from .env`
  修复 `WEBHOOK_PORT` 配置优先级问题，现遵循 NanoClaw 正常配置优先级：进程环境变量 > `.env` > 默认端口 3000。关闭了 issue #2901。
  https://github.com/nanocoai/nanoclaw/pull/3148

此外，今日待合并的 13 条 PR 中，有 6 条均围绕 **Gateway 技能化重构** 展开（#3815、#3816、#3817、#3818、#3825），表明项目正从单一 OneCLI 网关向"可插拔、多网关"的架构方向演进，这是本阶段最重要的架构级变化。

## 4. 社区热点

今日讨论最活跃的条目是 issue **#957**（11 条评论、8 个 👍）：

- **[CLOSED] [kind/feature] Suggest supporting Podman as an alternative to Docker**
  https://github.com/nanocoai/nanoclaw/issues/957

该 issue 创建于 2026-03-11，今日关闭。用户 @fuyb 建议在文档中提及 **Podman 作为 Docker 的替代方案**，尤其是面向 macOS 和 Linux 用户。从评论量和点赞数来看，社区对此有明确需求，背后反映了部分用户在 Docker Desktop 授权、资源占用或系统原生容器化（如 Fedora 默认集成 Podman）方面的实际痛点。虽然该 issue 已被关闭，但相关支持是否落地尚未看到对应 PR，值得持续关注。

## 5. Bug 与稳定性

今日无新 Bug Issue 报告，但多条已关闭/待合并 PR 涉及稳定性修复：

**中等严重度**

- **OpenCode 会话历史恢复失败**（PR #3849，待合并）：Gemini 强制要求 `functionCall` 轮次必须跟在 `user` 或 `functionResponse` 之后，当存储的会话历史以 assistant tool call 开头时，从历史恢复对话会导致请求构建失败。该 PR 修复了此问题，影响使用 Gemini + OpenCode 且依赖会话历史恢复的用户。
  https://github.com/nanocoai/nanoclaw/pull/3849

**较低严重度 / 环境特定**

- **setup.sh 在派发版 Linux 上 pnpm 安装失败**（#3844、#3847 已关闭）：影响使用系统包管理器安装 Node.js 的 Fedora/Debian/Ubuntu 用户，两者今日均已修复。
  https://github.com/nanocoai/nanoclaw/pull/3844
  https://github.com/nanocoai/nanoclaw/pull/3847

- **Webhook 端口配置不生效**（#3148 已关闭）：`WEBHOOK_PORT` 此前无法通过 `.env` 配置，已修复。
  https://github.com/nanocoai/nanoclaw/pull/3148

- **Webhook 恢复测试偶发端口冲突**（#3803，待合并）：测试使用随机端口可能被占用导致误报失败，改为由 fixture 持有端口，降低 CI 不稳定因素。
  https://github.com/nanocoai/nanoclaw/pull/3803

## 6. 功能请求与路线图信号

今日无新功能请求 Issue，但积压功能请求和待合并 PR 提供了明确的路线图信号：

- **Podman 支持**（#957，已关闭）：社区对 Docker 替代方案有较高呼声（8 👍），但尚无对应的实施 PR，可能进入后续版本的文档改进或运行时支持范围。
  https://github.com/nanocoai/nanoclaw/issues/957

- **Gateway 多网关架构**（#3815、#3816、#3817、#3818、#3825，均待合并）：系列 PR 正在将 OneCLI 提取为可安装技能，并新增 **Iron Proxy** 网关支持，同时保持安装过程与已有配置的兼容性。这将是下一版本的核心架构变化，值得重点关注。
  https://github.com/nanocoai/nanoclaw/pull/3816
  https://github.com/nanocoai/nanoclaw/pull/3817
  https://github.com/nanocoai/nanoclaw/pull/3825

- **TypeSafe 决策模型集成**（#3846 已合并、#3848 待合并）：将 TypeSafe Jev 判断模型作为容器工具接入 agent 工作流，预示技能系统将向"外部决策模型即工具"的方向扩展。
  https://github.com/nanocoai/nanoclaw/pull/3848

- **本地监控面板**（#3845，待合并）：新增 `startDashboard()`、`DASHBOARD_SECRET`/`DASHBOARD_PORT` 配置，提供本地运行状态可视化能力。
  https://github.com/nanocoai/nanoclaw/pull/3845

## 7. 用户反馈摘要

基于 issue #957 的讨论，可提炼以下用户反馈：

- **真实使用场景**：部分 Linux 发行版（如 Fedora）默认集成 Podman，用户希望 NanoClaw 文档能明确支持这一容器运行时，避免额外安装 Docker。
- **痛点**：Docker Desktop 在 macOS 上的授权成本与资源占用是用户考虑替代方案的主要原因之一。
- **诉求方向**：不一定是代码层面的深度集成，文档层面先行说明"Podman 作为替代方案"即可满足多数用户需求，降低使用门槛。

该 issue 已关闭但获得了 8 个 👍，说明这类"降低环境依赖成本"的需求在社区中有一定代表性，建议维护团队在后续文档/容器运行时支持中予以考虑。

## 8. 待处理积压

以下 PR 长期处于打开状态，建议维护者关注评审优先级：

- **#2681** `fix(service): skip linger on per-home-encrypted systems` — 创建于 2026-06-03，已积压 3.5 个月，修复 per-home 加密系统上的服务 linger 问题（Bug Fix）。
  https://github.com/nanocoai/nanoclaw/pull/2681

- **#3156** `fix(agent-runner): carry channel attachments to providers as structured parts` — 创建于 2026-07-30，修复通道附件向 provider 传递时结构化的问题，影响消息完整性。
  https://github.com/nanocoai/nanoclaw/pull/3156

- **#3551 / #3552** `fix(config): enforce per-group MCP policy and OneCLI gateway routing` 系列 — 创建于 2026-08-26，涉及 per-group MCP 策略强制执行和网关路由，与当前 Gateway 重构方向高度相关，建议与新 PR 系列一并 review。
  https://github.com/nanocoai/nanoclaw/pull/3551
  https://github.com/nanocoai/nanoclaw/pull/3552

- **#3803** `test(webhook): recover on the fixture-owned port` — 创建于 2026-09-14，虽为测试稳定性修复，但已开放 4 天，建议尽快合并以避免 CI 噪音。
  https://github.com/nanocoai/nanoclaw/pull/3803

总体上，项目今日处于"架构重构 + 安装体验修复"并行推进的状态，合入质量良好，但需警惕大量待合并 PR 可能与 6 条 Gateway 重构系列 PR 产生合并冲突。建议维护者优先组织 Gateway 重构系列的集中评审，同时尽快处理 #2681 和 #3156 等积压修复。

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

## IronClaw 项目动态日报 — 2026-09-18

### 1. 今日速览

过去 24 小时项目活跃度偏低：仅产生 1 条 Issue 更新，无 PR 活动，无新版本发布。唯一的 Issue #8101 属于项目例行质量监控（每日失败分类任务），而非用户驱动的新功能或缺陷报告。该任务聚焦 officeqa 测试套件 35 个非通过任务的归因分析，初步结论指向模型本身质量问题（DeepSeek-V4-Flash），而非框架代码缺陷。整体来看，项目处于稳定维护窗口期，代码演进暂缓，但质量追踪体系仍在正常运行。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日没有 PR 被合并或关闭，表明代码库在过去 24 小时没有实际变更。然而，通过 #8101 的失败分类分析，项目维护方正在持续定位质量瓶颈——尽管不涉及代码改动，但这类分析为后续修复模型集成、测试基线或评估流水线提供了数据基础，属于"软推进"。若按功能迭代衡量，今日进展为 0；按质量观测衡量，今日进展为"已完成一次 2026-09-17 的失败归类"。

---

### 4. 社区热点

**#8101 [OPEN]** — [Daily ironclaw failure taxonomy — 2026-09-17](https://github.com/nearai/ironclaw/issues/8101)  
这是今日唯一的活动 Issue，也是唯一可能形成讨论的对象。虽然评论数为 0、点赞为 0，但它以"每日系列"形式存在，说明这是项目团队（或核心贡献者）持续驱动的自动化/半自动化质量审查任务。背后的诉求清晰：**建立可复现的失败归因机制，区分模型能力缺陷与框架代码缺陷**，从而为模型选择、提示词优化、评估策略调整提供依据。该类 Issue 的长期积累将成为项目质量趋势的核心数据源。

---

### 5. Bug 与稳定性

| 严重程度 | 描述 | 状态 |
|---------|------|------|
| 中 | officeqa 套件中 35 个非通过任务，绝大多数被归因为"genuine model-quality errors"（真实的模型质量错误），涉及 DeepSeek-V4-Flash 在任务执行中的导航/操作问题。这并非框架崩溃或回归，而是模型能力不足导致的评估不通过。 | 无 fix PR；属于外部模型问题，需模型侧改进或适配调整 |

未发现框架代码层面的崩溃、回归或安全性 Bug。

---

### 6. 功能请求与路线图信号

今日无用户提交的新功能请求。从 #8101 中可提取一个潜在路线图信号：项目可能正在强化**评估失败分类工具链**，例如将"非通过任务按根因自动打标签（模型质量 vs 框架缺陷 vs 环境问题）"的能力产品化。如果该每日分类脚本逐步成熟，未来可能发展为自动生成质量报告、按模型供应商拆分通过率看板等功能。建议关注后续是否出现与"自动化质量分析管道"相关的 PR 或 Issue。

---

### 7. 用户反馈摘要

今日没有用户评论可供提炼。唯一 Issue 的正文内容（由 @pranavraja99 提交）本身可视为内部/核心用户的反馈：**DeepSeek-V4-Flash 在 officeqa 任务上的表现是当前主要的非通过原因，且不是偶发环境因素，而是稳定的质量短板**。该反馈的实用价值在于：它直接指出模型能力是当前评估收益的瓶颈，为团队决定"是继续优化框架还是引入更强模型"提供了依据。未发现用户对现有功能的抱怨或新场景诉求。

---

### 8. 待处理积压

- **#8101** 虽为 9-17 创建，仍处于 OPEN 状态。作为每日系列的最新一期，它本身不是"被忽视"的问题，但值得注意的是它**没有关联的分析结论落地项**（如后续修复 Issue、模型迁移任务或测试基线调整）。建议维护者在该 Issue 下补充后续行动计划，或将结论引用到相应的模型评估跟踪项中，避免分析结果沉淀为孤立记录。

除此之外，当前数据中没有发现长期未响应的高优先级 Issue 或 PR。项目积压压力较小，健康度良好。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-18

## 1. 今日速览

项目过去 24 小时保持较为活跃的开发节奏：共产生 17 条 PR 更新、5 条 Issue 更新。其中 12 条 PR 已被合并或关闭，5 条待合并；3 条历史 Issue 被自动关闭（stale），2 条仍开放。值得关注的是，今日合并的 PR 集中在 `openclaw` 网关稳定性修复、Cowork 会话体验改进、以及 2026.9.16 版本的收尾发布；与此同时，3 月底以来积压的多条安全/稳定性 PR（#1027、#1028、#1029）和 2 条安全相关 Issue（#1026、#1031）仍然开放，处理周期已近半年，建议维护者优先关注。整体健康度中等偏上，版本发布窗口期有集中合入特征，但长尾积压是当前主要风险。

- **活跃度**：PR 合入密集，多为 release 分支收尾，开发活跃
- **版本状态**：无新发布见报，#2699 为 2026.9.16 版本收尾 PR
- **积压风险**：5 条 3 月底创建的 PR 仍开放，安全相关 Issue 未闭环

---

## 2. 版本发布

今日无新版本发布。
上一版本窗口由 PR #2699（Release/2026.9.16）收尾，该 PR 横跨 renderer、docs、main、openclaw、cowork 五个域，已于今日关闭。若您正在使用或测试 2026.9.16 版本，可留意后续补丁。

---

## 3. 项目进展

今日合并/关闭的 PR 共 12 条，其中 7 条为近期提交、5 条为历史 stale 关闭。近 24 小时合入的关键变更：

### 🧩 OpenClaw 网关稳定性（集中修复）
| PR | 内容 |
|---|---|
| [#2698](https://github.com/netease-youdao/LobsterAI/pull/2698) | 安全恢复陈旧网关锁所有者，修复维护锁阻断一键修复流程 |
| [#2695](https://github.com/netease-youdao/LobsterAI/pull/2695) | 防止浏览器 DNS 失败导致网关意外重启，将导航失败限制在工具调用内 |
| [#2694](https://github.com/netease-youdao/LobsterAI/pull/2694) | 原生 IM 任务未创建 ActiveTurn 时被误判为空闲并重启网关，新增 IM 生命周期证据跟踪与配置恢复诊断 |
| [#2691](https://github.com/netease-youdao/LobsterAI/pull/2691) | 修复飞书插件在原生 Node 加载路径中的 `exports is not defined` 错误，恢复渠道注册 |

这 4 个 PR 均以 9 月 16 日现场反馈为背景，合并后显著增强网关在 DNS 故障、IM 任务并发、锁竞争和插件加载失败等边界条件下的自愈能力。

### 🎨 Cowork 体验改进
| PR | 内容 |
|---|---|
| [#2692](https://github.com/netease-youdao/LobsterAI/pull/2692) | 模型静默期间轮换显示思考阶段短语，并展示已完成步骤数，避免会话看起来卡死 |
| [#2693](https://github.com/netease-youdao/LobsterAI/pull/2693) | 退出应用时立即隐藏窗口、加快技能服务停止速度，优化退出体验 |

### 📦 版本收尾
| PR | 内容 |
|---|---|
| [#2699](https://github.com/netease-youdao/LobsterAI/pull/2699) | Release/2026.9.16 版本合入主分支 |

**项目整体向前迈进的幅度**：本次合入聚焦"故障场景下的自愈与容错"，针对网关锁、DNS 异常、IM 生命周期误判三个稳定性短板给出系统性修复；Cowork 侧则优化了用户可感知的等待体验和退出流畅度，属于体验细节打磨。未发现新功能级（feature-level）的合入。

另外，历史 PR 中被关闭的 #1078、#1079、#1081、#1087 均为 3 月底提出的功能/修复，因长期未合入而被 stale 清理，其中 #1079（Cowork「当前进程」面板）和 #1087（重复错误消息修复）功能价值较高，建议后续重新基于新主干再提交或 cherry-pick。

---

## 4. 社区热点

今日讨论热度整体不高，评论集中在 3 个 stale 标记的 Issue（各 2 条评论），均为历史遗留问题但讨论质量较高：

### 📌 [#1082 package.json → openclaw.version 不支持新版本](https://github.com/netease-youdao/LobsterAI/issues/1082)
作者 `@baleli668` 提出 `openclaw.version = v2026.3.2` 是否过旧的问题，并强调"国家互联网应急中心有要求更新到最新版本"。该 Issue 今天被 stale 关闭，但背后反映的是用户对**版本合规性**的明确诉求——部分用户受监管要求驱动升级，版本滞后可能直接影响其采购或使用决策。

### 📌 [#1088 Prefetch 异步回调不校验 turnToken，可能跨轮次污染](https://github.com/netease-youdao/LobsterAI/issues/1088)
作者 `@xiangliqu` 深入分析了 `prefetchChannelUserMessages` 的"发后即忘"异步操作在恢复执行时可能将上一轮消息写入当前轮次，造成跨轮次污染。这是一个典型的**并发时序缺陷**，涉及核心对话逻辑，值得高度重视。

### 📌 [#1089 CoworkRunner 无重入保护，并发调用导致消息损坏和重复](https://github.com/netease-youdao/LobsterAI/issues/1089)
作者 `@MaoQianTu` 报告 `startSession()` 和 `continueSession()` 缺少 per-session 重入保护，IPC 层 fire-and-forget 调用方式可导致同一 session 并发修改共享状态，出现流式消息损坏和重复。该 Issue 与 #1088 同属并发一致性问题，说明 Cowork 会话引擎在并发边界上的健壮性仍有缺口。

> ⚠️ 上述三个 Issue 今日均被标记为 **stale 并关闭**（#1088、#1089 已关闭，#1082 已关闭）。但问题本身并未解决，仅因长期无活动被自动清理。建议维护者评估是否需要重新打开或转入内部跟踪，尤其是 #1088 与 #1089 涉及消息正确性，潜在影响面较大。

---

## 5. Bug 与稳定性

今日无新增 Bug 类 Issue（新增 0 条），所见均为历史遗留问题，但其中部分问题严重程度较高。按严重程度排列：

| 严重程度 | Issue | 描述 | 修复 PR | 状态 |
|---|---|---|---|---|
| 🔴 高 | [#1031](https://github.com/netease-youdao/LobsterAI/issues/1031) | `shell:openExternal` IPC 接口未校验 URL 协议，可被恶意注入的渲染层代码利用调用 `file://`、任意协议，存在安全风险 | 无 | 开放，stale 标记 |
| 🟠 中高 | [#1089](https://github.com/netease-youdao/LobsterAI/issues/1089) | CoworkRunner 无重入保护，并发调用导致流式消息损坏、消息重复 | 无 | 已关闭（stale） |
| 🟠 中高 | [#1088](https://github.com/netease-youdao/LobsterAI/issues/1088) | Prefetch 异步回调不校验 turnToken，跨轮次污染对话 | 无 | 已关闭（stale） |
| 🟡 中 | [#1026](https://github.com/netease-youdao/LobsterAI/issues/1026) | `sendTeamTextReply()` 中 `v2Client` 为 null 导致 TypeError 崩溃 | [#1028](https://github.com/netease-youdao/LobsterAI/pull/1028) | Issue 开放 / PR 开放（stale） |

**重点关注**：
- **#1031 安全漏洞**已开放近半年仍无对应的 fix PR，且被 stale 标记。若该项目有安全审计/合规要求，这是一个明显的隐患。
- **#1088 与 #1089** 虽然被 stale 自动关闭，但它们属于并发正确性缺陷，若在当前版本仍可复现，建议重新打开并安排排期。
- **#1026** 已有明确的修复 PR #1028，但该 PR 从 3 月底搁置至今未合并，代码可能已过时，建议推进 review 或要求作者 rebase。

---

## 6. 功能请求与路线图信号

今日虽无新 Issue 提出功能请求，但从活跃 PR 中可以提取出清晰的路线图信号：

### 🗺️ Cowork 工作区改造（较强信号）
| PR | 内容 | 状态 |
|---|---|---|
| [#2696](https://github.com/netease-youdao/LobsterAI/pull/2696) | **Turn 工作区回顾（workspace review）、内联问题泊位（question dock）与 Tasks 面板**，源自下游 fork，已在实践中使用 | 开放待合并 |
| [#2692](https://github.com/netease-youdao/LobsterAI/pull/2692) | 思考阶段旋转提示 | 已合并 |

`#2696` 是较完整的功能集合，包含 4 个可独立提交的 commit。若被合入，Cowork 会话页将获得接近 Codex 风格的交互体验升级。该 PR 已标记 `area: renderer/main/cowork/artifacts`，涉及面广，需要较充分的 review。

### 🛡️ 安全增强（需求信号）
Issue #1031 提出的 URL 协议白名单校验，是一个低成本高收益的安全加固方向。若下一版本计划做安全审查，建议优先纳入。

### 📦 依赖升级
PR #2669 将 Vite 从 5.4.21 升级至 8.3.0，为跨大版本升级，若合入需关注构建链兼容性和开发服务器行为变化。

---

## 7. 用户反馈摘要

今日开放的 Issue 未新增评论，反馈主要来自历史 Issue 内容本身，提炼如下：

### 真实用户痛点
- **版本合规压力**：`@baleli668`（#1082）表示受国家互联网应急中心要求，需更新到最新版本。这表明 LobsterAI 的部分用户来自企业/政务场景，对版本滞后敏感，**版本发布节奏和升级路径**直接影响其合规审计。
- **构建卡死**：`@MaoQianTu` 在 #1027（PR）中描述了外部开发者在公网执行 `npm install` 时因内网 registry 不可达卡死 5 分钟的问题，这是开源项目常见的**依赖源可访问性**问题，影响外部贡献者入门体验。

### 使用场景特征
- 多个稳定性 Issue（#1088、#1089、#1026）来自 `MaoQianTu`、`xiangliqu` 等对源码有深入研究的技术用户，说明存在一批**技术深度较高的核心用户**，直接阅读源码并报告并发级缺陷。这些用户是项目质量的宝贵资源。

### 满意/不满意
- **不满意**：部分有价值 PR（#1027、#1028、#1029）长期滞留在待合并状态，外部贡献者提交后数月无推进，可能削弱社区贡献意愿。
- **欣慰**：2026.9.16 版本收尾时合并了多个面向真实现场反馈的修复（#2698、#2694 等），说明项目方重视用户上报的问题闭环。

---

## 8. 待处理积压

以下为长期未响应/未合并且仍有价值的工作项，提醒维护者关注：

### 🔴 安全相关（建议优先处理）
| 项目 | 类型 | 创建时间 | 状态 | 说明 |
|---|---|---|---|---|
| [#1031](https://github.com/netease-youdao/LobsterAI/issues/1031) shell:openExternal 任意协议风险 | Issue | 2026-03-30 | 开放、stale | 安全漏洞，无修复 PR，时间已超 5 个月 |

### 🟠 已过期但仍有效的修复 PR（3 月底创建，至今未合并）
| PR | 内容 | 关联 Issue | 说明 |
|---|---|---|---|
| [#1028](https://github.com/netease-youdao/LobsterAI/pull/1028) | 修复 `v2Client` null 崩溃 | #1026 | 明确的崩溃修复，代码可能已过时，需 rebase |
| [#1027](https://github.com/netease-youdao/LobsterAI/pull/1027) | 跳过不可达 registry 的 optional 插件 | #1025 | 缩短外部开发者构建卡死时间 5 分钟 → 即时跳过，改善贡献者体验 |
| [#1029](https://github.com/netease-youdao/LobsterAI/pull/1029) | 显式定义 `PLATFORM_TO_CHANNEL_MAP` | 无 | 修复多对一映射被 `Object.fromEntries` 覆盖的隐蔽配置错误 |

### 🟡 大型功能 PR（真的讲了很久但还没有决定）
| PR | 内容 | 状态 | 说明 |
|---|---|---|---|
| [#2696](https://github.com/netease-youdao/LobsterAI/pull/2696) | Cowork workspace review / question dock / Tasks panel | 开放 | 功能完整，但涉及面广；建议明确是否纳入下一版本，并给予作者合入/关闭的明确结论 |
| [#2669](https://github.com/netease-youdao/LobsterAI/pull/2669) | Vite 5 → 8 跨大版本升级 | 开放 | 依赖升级，需评估构建兼容性后决策 |

---

**日报总结口径**：LobsterAI 过去 24 小时完成了 2026.9.16 版本收尾与一批网关稳定性修复，项目本身处于正常迭代节奏；但 3 月底以来累积的 1 个安全 Issue、3 个有修复 PR 的遗留项至今未闭环，以及与日俱增的 stale 关闭，反映出维护端对"历史欠账"的处理优先级偏低。建议项目组在版本发布后安排一轮积压清理专项，优先处理 #1031 安全项与 #1028、#1027、#1029 修复 PR，避免有价值的社区贡献被自动清理机制误伤。

> 本日报基于 2026-09-18 抓取的 GitHub 数据自动生成，所有链接指向对应 GitHub 条目。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报 — 2026-09-18

## 今日速览

过去24小时内，Moltis 项目保持温和活跃：新增 2 个 Issue（均为昨日创建），提交 2 个待合并 PR，无新版本发布。活跃度总体平稳，未有 PR 被合并或关闭，也没有新 release 产出，项目推进节奏偏缓。当前值得关注的是两条新开的 Issue——一个功能请求（#1274）和一个构建稳定性缺陷报告（#1273），后者直接影响 Nix 用户的可复现构建，建议优先跟进。两个待合并 PR（#1262、#1272）均处于评审阶段，其中沙箱功能增强 PR 已持续 2 天未获合并，维护者响应速度需关注。

## 版本发布

无新版本发布。

## 项目进展

今日无 PR 被合并或关闭，项目主分支上未发生实质代码变更。以下两个 PR 正处于待合并状态，代表近期提交的主要工作：

- **#1272 feat(sandbox): per-agent mounts, run_as and a forced sandbox**（[链接](https://github.com/moltis-org/moltis/pull/1272)）
  为 agent 预设新增三个细粒度沙箱控制选项：`sandbox.mounts`（额外宿主机绑定挂载）、`sandbox.run_as`（容器运行 UID:GID）、`sandbox.force`（强制沙箱运行）。这一改动将沙箱配置从全局层面下沉到单个 agent 级别，提升了多租户/多 agent 场景下的安全隔离灵活性。

- **#1262 fix(cron): treat active_hours end="24:00" as end-of-day**（[链接](https://github.com/moltis-org/moltis/pull/1262)）
  修复了 `is_within_active_hours` 解析 `24:00` 失败导致配置 fail-open、active_hours 窗口始终生效的问题。这是一个明确的正确性修复，解决的是文档默认配置（`08:00`-`24:00`）实际无法工作的 bug。

两项工作分别对应安全增强与调度正确性，若均能顺利合入，下一版本将同时改善运行时安全和定时任务可靠性。

## 社区热点

今日并无讨论热烈的议题——两条新 Issue 和两条 PR 的评论数均为 0，社区互动集中在 GitHub 之外的渠道（如聊天会话）或尚在早期阶段。

两个值得注意的新信号：

- **#1273** 的 Nix 构建失败问题直指发布流程缺陷，虽暂无评论但属于"踩坑即报"的类型，触及面较广；
- **#1272** 沙箱 PR 已 2 天零评论，对于一处涉及安全模型变更的特性而言，评审反馈的缺乏值得关注。

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| 高 | [#1273](https://github.com/moltis-org/moltis/issues/1273) | `flake.nix` 在 tag `20260913.02` 处无法构建：缺失两个 vendor crate 哈希（`wacore-0.6.0`、`zvec-rust-0.6.0`）以及 web assets 未随 tag 发布 | 待响应，尚无 fix PR |
| 中 | [#1262](https://github.com/moltis-org/moltis/pull/1262)（PR） | `active_hours` 的 `end="24:00"` 解析失败导致 fail-open，默认配置下 24 小时全部视为活跃 | 已有修复 PR，待合并 |

**分析**：#1273 暴露了两个独立缺口——`cargoLock.outputHashes` 未覆盖最新 vendor 依赖名，以及发布 tag 未捆绑 web assets。这会影响所有通过 Nix 安装/构建 Moltis 的用户，建议尽快在发布流程中增加 Nix 构建验证。值得注意的是，该 Issue 报告的是一个已发布 tag（`20260913.02`）的构建失败——这意味着本周发布的版本对 Nix 用户实际不可用。

## 功能请求与路线图信号

- **#1274 Prepaid search hop for Moltis wasm-web-search?**（[链接](https://github.com/moltis-org/moltis/issues/1274)）
  用户请求为 `wasm-web-search` 增加"预付费搜索跳"能力。摘要显示请求者已按要求完成了 preflight checklist（搜索过已有 enhancement 请求、确认未重复提案），但未附上会话上下文。这指向用户对搜索成本控制 / 配额管理的需求，可能涉及搜索 API 的预付费或计费机制。

- **#1272 沙箱 per-agent 配置**（[链接](https://github.com/moltis-org/moltis/pull/1272)）
  该 PR 属于安全模型细化方向。结合 #1274 来看，用户对 agent 级行为控制的需求在增长——包括网络访问成本（搜索 hop）和系统资源隔离（sandbox mounts/run_as），未来版本可能会在"per-agent 配置"上持续扩展。

## 用户反馈摘要

- **Nix 用户构建受阻**：#1273 报告者（@flexiondotorg）明确指出 `nix build .#default` 在已发布 tag 上直接失败，且定位到两个独立根因（vendor crate 哈希缺失 + web assets 未发布）。这反映了发布流程中缺少 Nix 集成测试的现状。

- **配置语义困惑**：#1262 的根因是 `end="24:00"` 在文档中被描述为默认值，但代码解析路径在此之前就会失败。这说明文档默认配置与实际行为不一致的问题对用户造成了实际困扰，且 fail-open 的设计掩盖了配置错误——用户在不知情的情况下运行在"始终活跃"模式下。

- **搜索功能成本意识**：#1274 请求者 @iamalanlui 对 `wasm-web-search` 的关注点在于"预付费"机制，暗示现有搜索使用模式存在成本不可控或不透明的痛点。

## 待处理积压

- **#1262 fix(cron) PR**（[链接](https://github.com/moltis-org/moltis/pull/1262)）：创建于 2026-09-07，已搁置 11 天，最后更新于 9/17 但无评论。这是一个修复文档默认配置实际失效的 bug fix，长时间未合入可能影响所有使用默认 `active_hours` 的用户。
- **#1273 Nix 构建失败**（[链接](https://github.com/moltis-org/moltis/issues/1273)）：昨日新开，暂无响应。由于影响已发布 tag 的可构建性，建议维护者优先确认并安排修复。
- **#1272 沙箱 PR**（[链接](https://github.com/moltis-org/moltis/pull/1272)）：等待评审已 2 天，安全相关特性建议尽早安排 code review，避免长期挂起导致后续冲突。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 2026-09-18

## 1. 今日速览

过去 24 小时 CoPaw 保持高吞吐运转：新增/活跃 Issue 16 条、关闭 1 条，PR 更新 41 条（其中 24 条待合并、17 条已合并/关闭），无新版本发布。社区讨论热度集中在三个主题：**subAgent 执行可靠性**（#7678，10 条评论）、**Console 前端稳定性**（SSE 裸 null/懒加载错误无恢复）、**上下文管理配置不生效**（#7810）。积极信号是 #7810 与 #7812 均已有对应修复 PR 提交，且 Hub 模型网关（#7779）、Docker 运行时对齐（#7751）等大项已合并。整体判断：**吞吐量高，但 2.2.x 的稳定性回归值得关注**，项目处于“快速迭代 + 质量补课”并行阶段。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

过去 24 小时共有 17 条 PR 合并/关闭，以下为关键项：

- **[#7779 feat(hub): add model gateway, member governance and usage dashboard](https://github.com/agentscope-ai/QwenPaw/pull/7779)（已合并）** — Hub 升级为组织级模型网关：管理员统一发布模型、密钥存放在 Hub Vault，成员在既有 provider 页面选择 Hub 模型而无需接触组织凭据，同时新增用量仪表盘。这是组织化部署方向的一个里程碑。
- **[#7751 fix(docker): align app Python runtime with desktop](https://github.com/agentscope-ai/QwenPaw/pull/7751)（已合并）** — Docker 应用虚拟环境改用与桌面版相同的 pinned Python 3.11 standalone 运行时，消除 Debian 系统 Python（OpenSSL 3.0）带来的行为差异，降低“容器里正常、桌面上异常”类问题概率。
- **[#7802 feat(telemetry): report daily Runtime activity on Agent execution](https://github.com/agentscope-ai/QwenPaw/pull/7802)（已合并）** — 内置 Agent 或外部 harness 执行时上报每日一条 Runtime 活动事件（含定时任务）；页面访问和纯命令不计数。采用内存日期去重，避免每日重复上报。
- **[#7808 refactor(loop): pass DoomLoopStageConfig objects from catalog factory](https://github.com/agentscope-ai/QwenPaw/pull/7808)（已关闭）** — 将验证后的 `DoomLoopStageConfig` 对象直接从目录工厂交给 DoomLoopGate，避免 gate 层同时接受 dict 和对象两种形态，收窄类型面。

**整体判断**：今日合并集中在“组织能力（Hub 网关）”“运行时一致性（Docker/Desktop 对齐）”“可观测性（telemetry）”，项目在向多用户部署和运维友好方向推进，但 2.2.x 的稳定性类 PR 大多仍处于待合并状态。

## 4. 社区热点

| 条目 | 评论数 | 主题 | 链接 |
|---|---|---|---|
| #7678 | 10 | subAgent 全部超时失败，timeout 设置无效 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7678) |
| #7815 | 4 | Console 懒加载错误页无法恢复，必须整页刷新 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7815) |
| #7840 | 3 | 插件同步 I/O 冻结整个实例 40 秒，无隔离无监控 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7840) |
| #7810 | 3 | 设置 131k 上限实际提交 271k，压缩不触发（已关闭） | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7810) |
| #7814 | 3 | SSE 流中 `_strip_event_headlines` 可能输出裸 null | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7814) |

**诉求分析**：

- **#7678** 是当前社区情绪最集中的一条：用户报告“spawn subAgent 后没有一个能执行下去，全部 timeout，timeout 设很长也没用”，并且自行调用 AI 调试也无法定位。该 issue 从 9-11 创建至今持续活跃，反映 subAgent 功能在实际负载下存在系统性可用性缺陷，需要官方介入排查。
- **#7840** 暴露出插件机制缺乏隔离：一个插件在事件循环线程做同步 I/O，整个实例（所有 agent、所有 channel）冻结约 40 秒。用户明确指出“没有契约、没有监控、没有隔离”，这是对插件体系架构性短板的有力控诉。
- **#7810**（已关闭）和 **#7815** 是典型的“配置不生效”和“错误不恢复”类问题——前者让用户对上下文管理失去信任，后者让用户对 Console 的可靠性产生疑问。

## 5. Bug 与稳定性

按严重程度排列（附是否已有修复 PR）：

### 严重

- **[#7678 [Bug] spawn subAgent 全部超时失败](https://github.com/agentscope-ai/QwenPaw/issues/7678)** — subAgent 执行链系统性阻塞，timeout 参数无效；评论 10 条，社区影响最大。**暂无 fix PR。**
- **[#7840 [Bug] 插件同步调用卡死整个实例 40 秒](https://github.com/agentscope-ai/QwenPaw/issues/7840)** — 事件循环被插件独占，所有 agent/channel 不可用。无隔离机制，2.2.0/2.2.1 均复现。**暂无 fix PR。**
- **[#7818 [Bug] UI 经常卡死且内存占用特别高](https://github.com/agentscope-ai/QwenPaw/issues/7818)** — 附有 1920×1008 截图，无更多日志。疑似渲染端泄漏或数据量增长导致。**暂无 fix PR。**

### 高

- **[#7815 Console 无法从 failed lazy chunk load 中恢复](https://github.com/agentscope-ai/QwenPaw/issues/7815)** — 代码中虽有 retry 机制但无法成功，错误边界不重置，只能整页刷新。**暂无 fix PR。**
- **[#7813 / #7814 SSE 裸 null payload 导致流冻结](https://github.com/agentscope-ai/QwenPaw/issues/7813)** — 服务端序列化输出裸 `null`，客户端消费生成器抛异常后仅记录日志，无终止事件，UI 永久卡住。两个 issue 同根因，**暂无 fix PR。**
- **[#7812 桌面启动后斜杠命令作用于错误会话](https://github.com/agentscope-ai/QwenPaw/issues/7812)** — 启动后输入 `/compact` 等命令时作用在非当前会话（fallback session），存在数据错发风险。**已有 PR #7834 修复。**
- **[#7821 MCP 驱动丢弃刷新后的 OAuth access_token](https://github.com/agentscope-ai/QwenPaw/issues/7821)** — 每次工具调用都 resolve 凭据并可能刷新 token，但 live client 仍携带 connect-time 的旧 Authorization，导致刷新后请求 401。**暂无 fix PR。**

### 中

- **[#7810 上下文管理：设置 131k 实际提交 271k，压缩不触发](https://github.com/agentscope-ai/QwenPaw/issues/7810)** — 该 issue 已关闭，但暴露了 `max_input_length` 默认 131072 与运行时五级优先级链不一致的问题。**PR #7832 正在修复（使 override 显式化，并显示实际生效值）。**
- **[#7827 DashScope MCP 商店 streamable_http 驱动无法激活](https://github.com/agentscope-ai/QwenPaw/issues/7827)** — `server/discover` 返回裸 HTTP 500（空响应体）未被识别为旧协议证据，导致驱动激活失败，Console 本地报 503。**暂无 fix PR。**
- **[#7836 scroll 淘汰掉工具密集跨度内的用户请求](https://github.com/agentscope-ai/QwenPaw/issues/7836)** — 大段工具输出被整体淘汰，括号内的两个 user turn 一并丢失，live window 失去请求而 history.db 仍保留。**暂无 fix PR。**
- **[#7839 session-sync 跳过 86 个孤儿会话文件，retention purge 仍报 malformed](https://github.com/agentscope-ai/QwenPaw/issues/7839)** — 2.2.x 默认 scroll 下，orphan 文件不导入，purge 持续失败。**暂无 fix PR。**

### 低

- **[#7837 user 行无 headline，淘汰索引需调用模型标注](https://github.com/agentscope-ai/QwenPaw/issues/7837)** — 架构性数据缺口，增加额外模型调用成本。**暂无 fix PR。**
- **[#7838 recall_history_python 在无 Landlock 内核上静默未注册](https://github.com/agentscope-ai/QwenPaw/issues/7838)** — kernel < 5.13 时日志只提示一次，模型拿不到该工具。**暂无 fix PR。**
- **[#7841 Console UI 先于后端就绪导致面板空白](https://github.com/agentscope-ai/QwenPaw/issues/7841)** — 启动时序竞态，需手动刷新恢复。**暂无 fix PR。**

## 6. 功能请求与路线图信号

- **[#7733 Agent 自主上下文管理（eviction 前通知 Agent）](https://github.com/agentscope-ai/QwenPaw/issues/7733)** — 用户提出由纯 token 阈值触发压缩不合理，Agent 应参与决策并获得预警。结合 9-17 集中提交的 4 个 scroll 淘汰相关 Bug（#7836/#7837/#7839），**scroll 上下文管理显然正在重构中，#7733 有一定概率被纳入后续版本。**
- **[#7830 OS 桌面模式开放应用注册接口](https://github.com/agentscope-ai/QwenPaw/issues/7830)** — 用户希望在 `/os` 桌面模式下按标准接口注册自己的应用，将桌面端扩展为应用平台。这是一条强路线图信号，与现有插件体系形成互补。
- **[PR #7785 feat(voice): realtime voice chat（待合并）](https://github.com/agentscope-ai/QwenPaw/pull/7785)** — 已实现完整的实时语音对话：支持语音输入/播放/打断/模型选择，语音识别后进入普通 Chat 执行链路，复用历史、工具、持久化与渲染。若合入将是 2.3 的重要特性。
- **[PR #7637 feat(qwenpaw-data): QwenPaw-Data app 0.3.0（待合并）](https://github.com/agentscope-ai/QwenPaw/pull/7637)** — 将 QPD 0.3 工作流引入 QwenPaw：用户可选择数据源、用自然语言提问、回答澄清问题、跟踪执行、读取生成报告。数据分析方向值得关注。
- **[PR #7685 feat(feishu): 可折叠推理面板（待合并）](https://github.com/agentscope-ai/QwenPaw/pull/7685)** — 飞书渠道中长推理链不再永久展开推走答案，支持 opt-in 自动折叠，改善飞书端阅读体验。
- **[PR #7565 feat(plugins): 干净卸载与回滚安全热重载（待合并）](https://github.com/agentscope-ai/QwenPaw/pull/7565)** — 插件安装/更新/卸载不再重建所有 workspace，失败更新可回滚到上一版本。与 #7840（插件隔离缺失）形成对照——若二者合并，插件生态的运维与安全基线将有明显提升。

## 7. 用户反馈摘要

- **subAgent 可靠性受质疑**（#7678）：用户称“没有一个执行的下去，全都任务失败，全都 timeout”，“把 timeout 设置很长很长也没用”。自行找 AI 调试仍无法定位，说明问题可能不在用户配置而在执行链路本身。这类声音若不及时回应，会削弱用户对 Agent 编排功能的信任。
- **上下文配置信任危机**（#7810）：用户设置了 131k 上限，但“每次都爆表直接输入 271k”“压缩对话也不管用”“网络中断导致没有上下文压缩选项”。上下文管理是长会话体验的基石，大量 2.2.x 用户会受此影响。
- **启动后误操作风险**（#7812）：斜杠命令注意力“不同会话”，用户担心“我以为在跟当前对话说，结果发到了别处”。这种不确定性对日常使用的信心打击较大。
- **插件双刃剑效应**（#7840）：插件带来能力扩展，但“一个同步调用冻结整个实例 40 秒”，且没有监控面板可查。用户期望的是隔离和契约，而不是让普通用户为插件质量买单。
- **桌面端性能**（#7818）：UI 卡死 + 高内存，用户贴图但未提供复现步骤，需维护者主动跟进拉取环境信息。
- **扩展诉求**（#7830）：用户明确希望在 OS 桌面模式下注册自己的应用，这暗示 CoPaw 桌面端已在部分用户心中占据“工作台”生态位，开放平台化是自然演进方向。

## 8. 待处理积压

以下为长期未合并/未响应的 PR 与 Issue，建议维护者优先确认状态：

- **[PR #6399 feat: reranker UI 配置面板（7-23 创建，近 2 个月未合并）](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — 为 ReMeLightMemoryCard 增加 reranker 可视化配置。长时间未处理可能是等配套后端 PR，建议明确状态。
- **[PR #6889 fix(console): preserve textarea target for IME events（8-11 创建，1 个月+）](https://github.com/agentscope-ai/QwenPaw/pull/6889)** — 修复 `RichFileReferenceInput` 下 maxLength 路径在 compositionEnd 时 `event.target.value` 为 undefined 的问题，影响中文/日文输入法用户。该 PR 为 first-time-contributor 提交，长时间无人 review 会打击贡献者积极性。
- **[PR #7565 feat(plugins): 干净卸载与回滚安全热重载（9-04 创建）](https://github.com/agentscope-ai/QwenPaw/pull/7565)** — 改动面较大（引入两层 teardown ledger），需要审慎 review，但价值高。
- **[PR #7639 perf(scroll): 避免重复 history 完整性扫描（9-08 创建）](https://github.com/agentscope-ai/QwenPaw/pull/7639)** — 将 `PRAGMA quick_check` 改为每个进程/每个 history.db 一次，并防止并发重复检查。当前 scroll 相关 Bug 集中，此优化可降低整体 IO 负担。
- **[#7678 spawn subAgent 全部超时（9-11 创建，10 评论）](https://github.com/agentscope-ai/QwenPaw/issues/7678)** — 社区热度最高的问题，已连续活跃一周，**尚无官方回复或修复 PR**，是当前最大的社区信任风险点。
- **[PR #7828 “Dev my fix”（9-17 创建）](https://github.com/agentscope-ai/QwenPaw/pull/7828)** — 描述为模板占位符，未填写任何实质内容，疑似误提交或半成品。建议机器人自动提示作者补充，或在 24 小时内关闭。

---

**数据说明**：以上数据来自 agentscope-ai/QwenPaw 仓库 2026-09-18 快照，覆盖过去 24 小时（截至 2026-09-17 更新）的 Issue/PR/Release 动态。部分 PR 状态可能在日报生成时发生变动，请以 GitHub 实时数据为准。

:::
