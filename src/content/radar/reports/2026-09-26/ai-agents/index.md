---
title: "OpenClaw 生态日报"
published: 2026-09-26
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-26

> Issues: 9 | PRs: 50 | 覆盖项目: 11 个 | 生成时间: 2026-09-26 00:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

## OpenClaw 项目动态日报 — 2026-09-26

### 1. 今日速览

过去 24 小时项目活跃度中等偏上：共 9 条 Issue 更新（全部为活跃状态，无关闭），50 条 PR 更新（其中 49 条待合并，仅 1 条合并/关闭），合并吞吐量极低，PR 积压压力明显。**P0 级 Issue 与更新失败报告是当前最突出的稳定性问题**——多个用户报告 2026.9.5 版本升级后出现崩溃循环、更新中断，且长期未获解决。与此同时，社区提交了大量性能优化和重构 PR（网关主线程卸载、会话元数据异步化等），项目重心明显偏向架构治理与稳定性修复，但审核资源可能已成为瓶颈。

---

### 2. 版本发布

今日无新版本发布。

---

### 3. 项目进展

今日 PR 合并/关闭仅 1 条（数据未给出具体编号），合并吞吐量极低（1/50），大量已经"ready for maintainer look"的 PR 处于等待审核状态。值得关注的待合并 PR 包括：

- **#158450** `perf(gateway): keep artifact reads off the main thread`（size: XL，P2）：将制品列表、图像读取等从网关主线程移出，避免阻断聊天流，已标注 ⏳ waiting on author。
- **#158313** `refactor: share filesystem admission and cleanup with fs-safe`（size: XL，P2）：统一文件系统遍历/准入/清理逻辑，修复入站传输失败后悬挂写的问题，安全敏感变更。
- **#158464** `perf(gateway): keep Control UI file reads off the event loop`（size: L）：为 Control UI 静态资源增加跨浏览器缓存，减少事件循环阻塞。
- **#158465** `perf(sessions): keep durable chat metadata patches off the Gateway thread`（size: XL）：将会话元数据写入从网关主线程迁移至 agent 数据库 worker。

这些 PR 共同指向一个清晰的方向：**网关主线程负载隔离与性能优化**。若全部落地，预计可显著改善高并发下的会话响应延迟。但以当前合并速度，这些改进的落地时间存在不确定性。

---

### 4. 社区热点

- **#153257 [Bug]: OpenClaw 2026.9.5 Turned a Stable Environment Into an 8-Hour Failure Recovery Session**（P0，崩溃循环，31 条评论）
  https://github.com/openclaw/openclaw/issues/153257

  今日最热 Issue。用户明确表达了对 2026.9.5 版本升级的后悔情绪，称此前环境已稳定，升级后陷入长达 8 小时的恢复流程。带有 `impact:crash-loop`、`impact:ux-release-blocker`、`clawsweeper:manual-only` 等多个高风险标签。31 条评论说明大量用户在跟进或遇到了同类问题。核心诉求是：**新版本升级必须保证向后兼容和回滚路径，不能再将稳定环境拖入长时间故障恢复**。

- **#155457 [Bug]: Agent tool calls to Anthropic intermittently fail with malformed streamed JSON arguments on large edits**（P2，3 条评论）
  https://github.com/openclaw/openclaw/issues/155457

  讨论围绕 Anthropic 流式工具参数跳过服务端 JSON 验证的问题展开。对使用 Claude 模型做大文件编辑的用户是直接阻碍。

---

### 5. Bug 与稳定性

**P0 级（阻断发布/严重崩溃）：**

- **#153257** 2026.9.5 升级后稳定环境进入 8 小时崩溃循环恢复（31 条评论，`impact:crash-loop`、`impact:ux-release-blocker`）。无对应 fix PR。
  https://github.com/openclaw/openclaw/issues/153257
- **#155723** 更新失败：finalize:doctor（2026.9.5），darwin/arm64，已存在多日仍开放。无对应 fix PR。
  https://github.com/openclaw/openclaw/issues/155723
- **#152757** 更新失败：runtime-verification-failed（2026.9.4→9.5），win32/x64。无对应 fix PR。
  https://github.com/openclaw/openclaw/issues/152757

**P1 级（明确功能受损）：**

- **#155451** Native Control UI steer 队列每次 Stop 只推进一条消息，`openai-codex/gpt-5.6-sol` + `thinking=ultra` 下消息无限排队（1 条评论）。PR #143283 修复 steer 模式下的消息纠正问题，可能相关。
  https://github.com/openclaw/openclaw/issues/155451
- **#149400** Workboard: `workboard_complete` 拒绝 `proofId: ""`，导致 GPT worker 永远无法完成卡片（已标注 `linked-pr-open`，有修复 PR 在途）。
  https://github.com/openclaw/openclaw/issues/149400

**P2 级（体验问题/功能缺陷）：**

- **#158442** 打开未读会话会将其"最后更新时间"戳前移，导致侧栏排序跳动（2 条评论，今日新开）。
  https://github.com/openclaw/openclaw/issues/158442
- **#155457** Anthropic 流式工具 JSON 参数偶发畸形（`needs-live-repro`）。
  https://github.com/openclaw/openclaw/issues/155457
- **#155275** ClickClack 重连在服务端游标被修剪后无法恢复，可能导致消息丢失（`needs-maintainer-review`）。
  https://github.com/openclaw/openclaw/issues/155275

**其他：**

- **#158463** 更新失败：global-install-swap（2026.9.5→9.6），linux/x64，今日新开且无评论。连续多个更新失败报告表明 2026.9.5/9.6 的更新流程本身存在系统性缺陷。
  https://github.com/openclaw/openclaw/issues/158463

---

### 6. 功能请求与路线图信号

- **CLI 分页能力**：PR #142070 为 `automations list` 增加 `--offset` / `--limit`，来自 9 月 8 日的功能请求，至今仍在等待作者更新。反映出运维类用户对大规模自动化管理的需求。
  https://github.com/openclaw/openclaw/pull/142070
- **订阅用量可见性**：PR #157753 修复 Claude Code 订阅用量未统计到 Dashboard 的问题，说明多模型/多凭证用量聚合是用户关注重点。
  https://github.com/openclaw/openclaw/pull/157753
- **更新流程可观测性**：多个更新失败报告（#155723、#152757、#158463）反复出现，PR #157972 试图修复"更新停滞 + 保留会话数据恢复"，标注了三个高风险 merge-risk（兼容性/会话状态/可用性），可能进入下一补丁版本。
  https://github.com/openclaw/openclaw/pull/157972

---

### 7. 用户反馈摘要

- **强烈负面反馈集中在升级体验**：#153257 用户称"genuinely regret upgrading"，升级后将原本稳定的环境引入 8 小时故障恢复。这直接影响社区对 2026.9.x 系列版本的信任度。
- **细微交互问题也会引发不满**：#158442 指出"打开未读会话导致侧栏位置跳动"，属于 Control UI 细节体验问题，2 条评论中有用户明确表达困扰。
- **消息可靠性存疑**：#155275 中 ClickClack 扩展在服务端游标被修剪后无法重连，评论中用户提到"担心历史消息丢失"。
- **工具链兼容性问题反复出现**：#149400 中 OpenAI strict schema 强制发送空字符串导致 worker 无法完成任务，用户已在等待修复。

---

### 8. 待处理积压

| 项目 | 类型 | 待处理时长 | 备注 |
|---|---|---|---|
| #149400 Workboard `proofId: ""` | Issue (P1) | 自 9/15，已 11 天 | 已标记 `linked-pr-open`，但一直未合入 |
| #142070 CLI 分页 | PR | 自 9/8，已 18 天 | 功能简单但长期未获合并，状态为 waiting on author |
| #140127 Windows shell 批准持久化 | PR | 自 9/6，已 20 天 | 安全相关修复，已 `ready for maintainer look` 却无进一步动作 |
| #133862 Matrix hang 修复 | PR | 自 8/31，已 26 天 | `needs proof` 状态，长期挂起 |
| #158463 等 3 个更新失败 P0 | Issue | 累积中 | 系统性更新缺陷，无 P0 级修复 PR 合入 |

整体来看，项目当前最大的健康度风险不是代码质量，而是**合并效率与 P0 修复速度**：每天 50 条 PR 新增但合并仅个位数，已有多条安全/兼容性相关 PR 等待超过一周。若该趋势持续，后续版本的稳定性承诺将难以兑现。

---

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告（2026-09-26）

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态呈现**高活跃、强分化、重稳定性**的态势。以 OpenClaw 为核心参照，衍生出多个聚焦不同场景的分支项目（NanoBot、Zeroclaw、NanoClaw、CoPaw 等），社区在性能优化、安全加固、多通道接入和 Provider 扩展上投入密集。然而，**合并吞吐不足**成为普遍瓶颈：多家项目日均 PR 合并数远低于新增数，大量已就绪补丁长期积压。同时，升级/更新流程的可靠性问题在多个项目中引发用户强烈不满（OpenClaw、NanoClaw），成为影响社区信任度的关键风险点。

## 2. 各项目活跃度对比

| 项目 | Issues 动态 | PR 动态 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 9 条（均为活跃） | 50 条（49 待合并 / 1 合并） | 无 | 🔴 风险高：P0 更新失败未决、合并率仅 2% |
| **NanoBot** | 4 条（2 开 / 2 关） | 13 条（11 待 / 2 合） | 无 | 🟡 良好：响应快，但积压上升 |
| **Zeroclaw** | 12 条（10 活跃 / 2 关） | 50 条（42 待 / 8 合） | 无 | 🔴 高风险：5 个 S0 安全漏洞，但合并活跃 |
| **PicoClaw** | 2 条（1 开 / 1 关） | 4 条（4 待 / 0 合） | 无 | 🟡 良好：功能蓄力，合并待发 |
| **NanoClaw** | 5 条（全为新开） | 50 条（48 待 / 1 合） | 无 | 🟠 修补期：修复响应快，积压严重 |
| **IronClaw** | 0 条 | 2 条（2 待 / 0 合） | 无 | 🟢 平稳维护 |
| **LobsterAI** | 0 条 | 10 条（9 待 / 1 合） | 无 | 🟡 中等：合并率低，存在 stale PR |
| **CoPaw** | 12 条（均为活跃） | 13 条（13 待 / 0 合） | 无 | 🟠 社区极活跃但零合并，瓶颈明显 |
| **TinyClaw** | 0 | 0 | 无 | ⚪ 无活动 |
| **ZeptoClaw** | 0 | 0 | 无 | ⚪ 无活动 |
| **EasyClaw** | 0 | 0 | v1.9.23 | 🟢 有迭代，社区沉默 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是该生态的**核心参照和基础设施层**，其社区体量（日均 50 PR / 9 Issue）远超其他项目，技术走向直接影响下游分支。当前技术路线聚焦**网关主线程负载隔离**（如 #158450、#158465）和**会话元数据异步化**，旨在提升高并发场景下的响应性能；但更新流程的 P0 缺陷（#153257 等）使其稳定性承诺承压。相比 NanoBot/CoPaw 更偏端侧交互体验，Zeroclaw 侧重安全架构，NanoClaw/LobsterAI 强调与 OpenClaw 的深度集成，OpenClaw 自身则处于“架构治理先行、功能迭代让位于稳定性”的阶段。其社区规模最大，但合并效率（1/50）已成为生态最突出的治理短板。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **升级/更新可靠性** | OpenClaw、NanoClaw | 升级后崩溃循环、更新流程失效、缺少回滚路径，用户对“升级即故障”强烈不满 |
| **性能与可观测性** | OpenClaw、NanoBot、Zeroclaw | 主线程卸载、实时 tokens/sec 显示、observer 事件流，均指向“让系统行为可见、可诊断” |
| **安全与权限边界** | Zeroclaw、CoPaw | 主体所有权绕过、SOP 工具权限缺失、云端规则误用于本地部署，安全重构后需要快速补洞 |
| **多通道消息可靠性** | NanoBot、CoPaw、NanoClaw、PicoClaw | 飞书内部标记泄漏、QQ 重复消息、Discord 审批按钮失效、飞书配置歧义，渠道层稳定性缠身 |
| **Provider 生态扩展** | NanoBot、PicoClaw、LobsterAI | 同一时段新增 Cheaper Inference / Requesty 等聚合网关，低成本多模型接入成为标配诉求 |
| **WebUI 体验打磨** | NanoBot、CoPaw、EasyClaw | 草稿持久化、超宽表格、滚动静音、面板样式，用户对前端细节容忍度低 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构特征 |
|---|---|---|---|
| **OpenClaw** | 核心 agent 运行时、网关性能、会话管理 | 全栈开发者、分支项目基础 | 单体 + 可扩展网关，强调主线程与 IO 分离 |
| **NanoBot** | WebUI 交互、邮件/飞书/Napcat 通道、测试基建 | 个人用户、中小团队 | 轻量级、模块化通道，注重测试覆盖 |
| **Zeroclaw** | 安全架构（主体会话）、多代理资源治理 | 企业/高级运维 | 强调权限模型、SOP 流程，面向安全敏感部署 |
| **PicoClaw** | DeltaChat 等小众通信集成、低成本 Provider | 极客/隐私偏好者 | 精简代码，快速适配新协议 |
| **NanoClaw** | 自我托管流程（update/容器管理）、CLI 运维 | 自托管玩家、DevOps | 强调一键升级、容器生命周期、可配置性 |
| **IronClaw** | 宿主运行时内置能力（如 builtin.time） | 链上 agent 开发者 | 与 NEAR 生态关联，低活跃但稳定 |
| **LobsterAI** | OpenClaw 深度整合、Cowork 协作、定时任务 | 协作型产品用户 | 以 OpenClaw 为内核，叠加协作层 |
| **CoPaw** | 控制台 UI、本地模型部署适配、QQ/微信通道 | 中文用户、自部署社区 | 与 Qwen 生态相关，社区贡献活跃 |
| **EasyClaw** | TikTok 达人联盟数据分析 | 电商运营者 | 垂直工具，迭代独立 |

## 6. 社区热度与成熟度

- **快速迭代/高热度层**：OpenClaw、Zeroclaw、NanoClaw、CoPaw。日均 PR/Issue 达两位数，社区反馈密集，但合并瓶颈均较突出（尤其是 CoPaw 零合并）。Zeroclaw 虽合并较多，但安全漏洞集中爆发，处于“重构验证期”。
- **质量巩固层**：NanoBot、PicoClaw、LobsterAI、IronClaw。活跃度适中，重点在测试整合、代码清理、稳定性修复，社区讨论相对理性。
- **低活跃/停滞层**：EasyClaw（有版本发布但无社区互动）、TinyClaw、ZeptoClaw（24 小时无活动）。项目可能进入维护期或尚未形成社区。

## 7. 值得关注的趋势信号

1. **合并瓶颈已成生态通病**：OpenClaw（1/50）、CoPaw（0/13）、PicoClaw（0/4）等单日合并率极低，大量 ready PR 长期滞留。对开发者而言，贡献前需评估维护者响应速度，也可考虑通过“优先合入安全/高影响补丁”策略提高效率。
2. **升级路径是信任的生命线**：OpenClaw、NanoClaw 的升级失败被用户称为“genuinely regret upgrading”，说明发布质量与回滚机制直接决定社区留存。新项目应把更新流程纳入 CI/CD 严格测试。
3. **安全重构后必然伴随新漏洞**：Zeroclaw 在安全架构合并当日即被爆出 5 个 S0 漏洞，提示大规模权限模型变更需要配套专项安全审查，且社区审查比内部测试更能发现问题。
4. **聚合网关 Provider 加速涌入**：NanoBot、PicoClaw、LobsterAI 不约而同接入低成本 LLM 网关，反映成本敏感型用户群体扩大，多模型切换和用量计量将成为基础能力。
5. **可观测性从“指标”上升到“实时体验”**：NanoBot 的 tokens/sec 显示、OpenClaw 的主线程卸载、Zeroclaw 的 observer firehose，共同说明用户不再满足于事后日志，而是要求运行过程实时可视化、可干预。
6. **多通道集成是差异化利器，也是稳定性黑洞**：QQ、飞书、Discord、DeltaChat 等通道的 bug 反复出现，本质是各平台协议差异大、测试覆盖不足。建议生态内共享渠道层的最佳实践或抽象层，避免重复踩坑。

---

*以上分析基于 2026-09-26 各项目 GitHub 公开数据，供技术决策者与开发者参考。*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-26

## 今日速览

过去 24 小时 NanoBot 保持较高活跃度：共更新 4 条 Issue（2 开 2 关）、13 条 PR（2 条合并/关闭，11 条待合并），无新版本发布。社区侧主要聚焦 WebUI 交互体验的持续打磨（草稿持久化、实时速率显示），同时邮件通道与 MCP 集成有多个功能 PR 等待 review。整体看项目正处于功能迭代与质量加固并行的阶段，但 PR 积压数量（11 条待合并）值得关注，其中包含两条 priority: p1 的长期未合并项。

## 版本发布

今日无新版本发布。

## 项目进展

今日有 2 条 PR 完成合并/关闭，均对代码库产生了实质性推进：

- **[#5912 fix(webui): preserve composer drafts across navigation and reloads](https://github.com/HKUDS/nanobot/pull/5912)**（已合并/关闭）
  解决用户切换会话或刷新页面时未发送消息丢失的问题。通过 localStorage 按会话持久化草稿，恢复文本、@提及与引用上下文，普通新话题草稿同样适用。附件仍保留在内存中，可跨页面导航存活。这一改动直接响应用户在 #5910 中提出的痛点。

- **[#5907 test: consolidate redundant coverage across the test suite](https://github.com/HKUDS/nanobot/pull/5907)**（已合并/关闭）
  对 Python 与 WebUI 测试进行整合，涉及 34 个文件，净删除 703 行冗余代码，并参数化 46 个 Python 测试组（保留全部 171 个原始输入与断言）。生产代码零改动，但显著缩减了测试套件执行时间与维护成本，体现项目对测试基建的重视。

## 社区热点

今日最受关注的讨论集中在 WebUI 的实时性能反馈需求上：

- **[#5908 feat(webui): show live tokens/sec while streaming a reply](https://github.com/HKUDS/nanobot/issues/5908)**（OPEN，评论 2）
  这是今日唯一有评论互动的 Issue，由 @coinwh 提出。核心诉求是：当模型流式回复时，用户无法感知生成速度，希望增加实时 tokens/sec 指示器来判断模型是正常运行还是卡住。该 Issue 反映了用户对大模型应用可观测性的迫切需求——尤其在长回复场景下，缺乏实时反馈会显著影响使用信心。目前暂无对应实现 PR，但此类体验优化很可能会被纳入后续 WebUI 迭代。

## Bug 与稳定性

今日报告了 1 个新 Bug，另有 2 个修复 PR 与稳定性相关。按严重程度排列：

| 严重度 | 问题 | 状态/对应修复 |
|---|---|---|
| 中 | **[#5903 [bug] Feishu: hidden session-checkpoint marker delivered to user after idle compaction](https://github.com/HKUDS/nanobot/issues/5903)** — 内部维护的会话检查点标记 "Continue the active task..." 在空闲自动压缩后被当作普通消息发送给飞书用户，且该消息以 `"_hidde...`（隐藏属性）持久化。影响：干扰用户对话体验，可能造成困惑。 | OPEN，暂无关联修复 PR |
| 中 | **[#5914 fix(napcat): keep a message whose image declares a non-numeric file_size](https://github.com/HKUDS/nanobot/pull/5914)** — Napcat 通道在处理非数字 file_size 的图片时会被错误拒收。已有修复 PR 待合并。 | PR OPEN |
| 中 | **[#5913 fix(agent): ignore an unparsable NANOBOT_MAX_CONCURRENT_REQUESTS instead of raising](https://github.com/HKUDS/nanobot/pull/5913)** — 环境变量为空或不可解析时旧代码直接抛出异常，改为回退到文档默认值（不限并发）。已有修复 PR 待合并。 | PR OPEN |

另外，[#5780](https://github.com/HKUDS/nanobot/pull/5780)（阻止自动压缩通知打扰用户）仍处于待合并状态，该 PR 旨在消除后台压缩操作对用户的无意义打扰。

## 功能请求与路线图信号

今日功能请求集中在两个方向，均与 WebUI 体验相关，且已有对应 PR 支撑或被明确实现：

1. **实时生成速度显示** — [#5908](https://github.com/HKUDS/nanobot/issues/5908) 请求流式回复时显示实时 tokens/sec。目前无对应实现 PR，属于新需求，但实现成本较低（数据已在流式接口中），预计可能被采纳。
2. **草稿持久化** — [#5910](https://github.com/HKUDS/nanobot/issues/5910) 请求跨会话切换保留草稿，已由 PR [#5912](https://github.com/HKUDS/nanobot/pull/5912) 完成实现并合入，体现了社区反馈到功能落地的快速闭环。

此外，路线图上有两个值得关注的信号：

- **[#5915 feat(providers): add Cheaper Inference as a named gateway provider](https://github.com/HKUDS/nanobot/pull/5915)** — 新增 OpenAI 兼容的 LLM 网关服务商支持，其模型成本比官方列表价低 15–60%。若合并，将进一步扩展 NanoBot 的 provider 生态。
- 邮件通道三条功能 PR（[#5609 Office365/Outlook 委派 OAuth](https://github.com/HKUDS/nanobot/pull/5609)、[#5606 按收件别名过滤](https://github.com/HKUDS/nanobot/pull/5606)、[#5605 仅对实际投递消息标记 \Seen](https://github.com/HKUDS/nanobot/pull/5605)）均处于 OPEN 状态，若合并将大幅完善邮件通道的安全性与可用性。

## 用户反馈摘要

从今日活跃的 Issue 可提炼出以下真实用户声音：

- **性能可观测性**（[#5908](https://github.com/HKUDS/nanobot/issues/5908)）：用户 @coinwh 明确表示“无法判断模型是正常工作还是卡住”是当前 WebUI 的使用痛点，希望有实时指标降低不确定性。
- **草稿不丢失**（[#5910](https://github.com/HKUDS/nanobot/issues/5910)）：同一用户在切换会话或刷新时丢失草稿，体验中断明显。该问题已通过 #5912 解决，用户诉求得到快速响应。
- **后台操作侵入感**（[#5780](https://github.com/HKUDS/nanobot/pull/5780)）：PR 作者指出自动压缩通知“quite annoying”，反映用户对无关系统消息的容忍度低，希望系统行为更安静。
- **飞书渠道可见性**（[#5903](https://github.com/HKUDS/nanobot/issues/5903)）：内部标记被误当用户可见消息发出，说明渠道层对“内部 vs 用户可见”消息的隔离仍有漏洞。

## 待处理积压

以下 PR/Issue 长期未合并或未响应，建议维护者关注：

| 项目 | 创建时间 | 备注 |
|---|---|---|
| [#5204 refactor(providers): declare Responses capabilities](https://github.com/HKUDS/nanobot/pull/5204) | 2026-08-01 | priority: p1，长期未合并 |
| [#5005 fix(exec): allow scoped tmp cleanup commands](https://github.com/HKUDS/nanobot/pull/5005) | 2026-07-20 | priority: p1，标有 conflict，安全相关 |
| [#5386 feat(mcp): preserve MCP Apps result metadata](https://github.com/HKUDS/nanobot/pull/5386) | 2026-08-13 | 标有 conflict，需解决冲突 |
| [#5609 feat(email): add Microsoft delegated OAuth for Office365/Outlook](https://github.com/HKUDS/nanobot/pull/5609) | 2026-08-30 | 功能完整，待 review |
| [#5606 feat(email): filter by recipient alias](https://github.com/HKUDS/nanobot/pull/5606) | 2026-08-30 | 待 review |
| [#5605 fix(email): only mark \Seen on messages that are actually delivered](https://github.com/HKUDS/nanobot/pull/5605) | 2026-08-30 | 待 review |
| [#5780 fix: stop sending context compaction notifications](https://github.com/HKUDS/nanobot/pull/5780) | 2026-09-15 | 承上启下的体验修复，待决策 |

其中 #5204 与 #5005 均为 p1 优先级，分别涉及 provider 架构重构与命令执行安全，长时间未合并可能拖慢后续相关功能的落地节奏；email 通道的三条 PR 属于同一系列，建议合并评审以减少上下文切换成本。

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

## Zeroclaw 项目动态日报 — 2026-09-26

---

### 1. 今日速览

过去 24 小时项目保持高度活跃：12 条 Issue 更新（10 条新开/活跃、2 条关闭），50 条 PR 更新（8 条合并/关闭），但无新版本 Release。**最值得关注的是安全与稳定性走向两极**：一方面安全架构重构的关键 PR（#10265）与 30 处 panic 消除（#10133）完成合并；另一方面社区在代码审查中集中报告了 5 个 S0 级安全漏洞（SOP 权限绕过、会话所有权绕过），全部指向刚合并的 #10265 引入的会话/权限模型。整体来看，项目处于**大规模安全重构的落地验证期**，开发节奏快，但审查积压（42 个待合并 PR）仍是主要瓶颈。

| 指标 | 数值 | 趋势 |
|---|---|---|
| Issues 更新 | 12（10 活跃 / 2 关闭） | 活跃 |
| PR 更新 | 50（42 待合并 / 8 关闭） | 高度活跃 |
| 新版本 Release | 0 | 静默 |

---

### 2. 版本发布

无。

---

### 3. 项目进展

今日合并/关闭的 PR 覆盖安全架构、运行时稳定性、MCP 工具链和打包修复，项目整体向前推进了**安全架构重构 #8289 的第 4 阶段收尾与运行时健壮性加固**：

- **[#10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265) feat(security): principal-owned sessions with predicated storage deletes**（已关闭，size:XL，Stacked #8289 stage 4）
  安全重构核心里程碑。会话存储改为基于主体（principal）所有权，并引入谓词式删除。该 PR 同时是今日 5 个 S0 级 Bug 报告的审查对象，说明其在架构上同时引入了新的权限边界，需要后续补丁完善。

- **[#10133](https://github.com/zeroclaw-labs/zeroclaw/pull/10133) fix(runtime): keep operational paths panic-free**（已关闭，size:S）
  从运行时操作路径移除 30 处 panic 候选，服务命令、daemon socket 启动等现在返回上下文错误而非崩溃。对长期运行的多代理部署稳定性有实质提升。

- **[#10397](https://github.com/zeroclaw-labs/zeroclaw/pull/10397) fix(mcp): send tool result text blocks, not the whole CallToolResult envelope**（已关闭，size:S）
  修复 MCP 工具结果重复存储问题（对应 Issue [#10394](https://github.com/zeroclaw-labs/zeroclaw/issues/10394)），模型侧 formatter 现在只在无损时发送纯文本，避免 `structuredContent` 与 `content[].text` 重复传输。

- **[#9986](https://github.com/zeroclaw-labs/zeroclaw/pull/9986) feat(agents): export an agent to a portable bundle**（已关闭，size:XL）
  新增 `zeroclaw agents export <alias> --out <dir>` 命令，将代理及其配置闭包、工作区打包为可迁移目录，补齐了多机部署的关键工作流。

- **[#11072](https://github.com/zeroclaw-labs/zeroclaw/pull/11072) fix(nix): set meta.mainProgram on flake packages**（已关闭，size:XS）
  修复 Nix 模块中 `lib.getExe` 回退到过时 pname 猜测并产生弃用警告的问题。

**整体判断**：安全架构主线（#8289 stage 4）已落地，但新引入的安全模型正在经历社区严格审查；运行时稳定性与 MCP 互操作性的修复同步推进。项目处于「重大重构后的验证与修补期」。

---

### 4. 社区热点

**[#10970 — RFC: Host-scoped admission control and per-agent resource bounds](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)**（8 条评论，今日最活跃）
JordanTheJet 提出的 RFC 建议为宿主机增加并发 turns、工具执行数、每代理内存上限，使多代理机器在负载下以「延迟劣化」代替「稳定性崩溃」。该 Issue 标签包含 `domain:security`、`domain:architecture`、`risk:high`、`topic:agent-loop`，社区讨论聚焦于：

- 当前所有并发限制都是单代理作用域，缺少宿主级兜底；
- 多代理部署场景下资源争抢已成为真实痛点；
- 该 RFC 与正在推进的运行时组合边界（#10993）形成呼应，显示社区对 **多代理生产化** 的诉求强烈。

其他讨论热度较低（#11096 与 #10993 各 1 条评论），整体社区讨论集中在架构与安全方向。

---

### 5. Bug 与稳定性

今日 Bug 报告呈「集中爆发」态势，且严重度极高 —— 5 个 S0 级、1 个 S1 级、1 个 S2 级。其中 **6 个 S0/S1 级问题均源于对已合并 PR #10265 的代码审查**，说明该安全重构在权限边界上存在系统性缺陷。

| 严重度 | Issue | 问题描述 | 状态 |
|---|---|---|---|
| S0 | [#11127](https://github.com/zeroclaw-labs/zeroclaw/issues/11127) | Session-data 工具可绕过 RPC 主体所有权检查，非管理员可读他人 `sessions_history` | 未见对应 fix PR |
| S0 | [#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126) | 排队中的会话操作在管理员被降权后仍保留其所有权绕过 | 未见对应 fix PR |
| S0 | [#11125](https://github.com/zeroclaw-labs/zeroclaw/issues/11125) | SOP 执行缺少 `tools:execute` 权限检查，非管理员可借 `sops:execute` + `allowed_tools=["*"]` 绕过 | 未见对应 fix PR |
| S0 | [#11124](https://github.com/zeroclaw-labs/zeroclaw/issues/11124) | SOP 决策门在 mode answer 有效但 start gate 缺失/畸形时，绕过 `gate_on_error="run_strict"` 默认值 | 未见对应 fix PR |
| S0 | [#11123](https://github.com/zeroclaw-labs/zeroclaw/issues/11123) | SOP 执行接受通配符工具选择器但未校验 `tools:execute` | 未见对应 fix PR |
| S1 | [#11130](https://github.com/zeroclaw-labs/zeroclaw/issues/11130) | DeepSeek DSML 工具调用标记未被解析，原始标记泄漏到频道且回合静默结束 | 未见对应 fix PR |
| S2 | [#11129](https://github.com/zeroclaw-labs/zeroclaw/issues/11129) | 内存内容扫描的 `send_to_url` 模式误伤含 URL+敏感词（同行）的普通文本 | 未见对应 fix PR |

**稳定性信号**：这 5 个 S0 级问题集中在 SOP（标准操作流程）的授权校验链路，核心缺陷是「条件授权策略不匹配」——主体已持有 SOP 执行权，但工具级权限（`tools:execute`）未被独立验证。这类问题通常在攻击面扩展（如 #10265 引入主体会话模型）后暴露，建议维护者优先处理 #11125/#11123（同一根因）和 #11127/#11126（同一根因）。

---

### 6. 功能请求与路线图信号

今日无新版本，但多个 RFC/Feature 处于活跃推进状态，清晰指向下一阶段方向：

| 方向 | 条目 | 信号 |
|---|---|---|
| **多代理资源治理** | [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) RFC：宿主级准入控制与代理资源上限 | 新 RFC，8 条评论，风险 high，已获社区关注 |
| **可嵌入运行时** | [#10993](https://github.com/zeroclaw-labs/zeroclaw/issues/10993) [Feature]：完成公共运行时组合边界 | status:accepted，待执行；目标是让运行时可被外部嵌入并显式注入能力 |
| **最小核心工具集** | [#10998](https://github.com/zeroclaw-labs/zeroclaw/issues/10998) [Task]：交付约定的最小核心工具集与二进制体积证据 | status:blocked + accepted；与运行时解耦相关 |
| **可观测性** | [#11131](https://github.com/zeroclaw-labs/zeroclaw/pull/11131) feat(runtime)：daemon 内自建 observer 事件 firehose | 新 PR（待合并），解决 gateway 关闭时 `logs/subscribe` 静默失效 |
| **代理可移植性** | [#9986](https://github.com/zeroclaw-labs/zeroclaw/pull/9986) agents export 命令 | 已合并，多机迁移工作流落地 |

**路线图判断**：`#8289` 安全重构已进入后半程（stage 4 完成，stage 5/6 待合并），下一阶段主线将是 **运行时解耦（#10993/#10998）** 与 **多代理资源治理（#10970）**，两者共同服务于更复杂、更规模化、可嵌入的部署场景。

---

### 7. 用户反馈摘要

- **多代理资源争抢是真实痛点**（[#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)）：发起人 JordanTheJet 明确指出当前并发限制均为单代理作用域，多代理共享宿主机时「在延迟上劣化而非稳定性崩溃」的设计目标是社区明确需求。8 条评论表明讨论深度不足但关注度高，预计后续会有更多使用案例补充。
- **CI 合并结果新鲜度引发质疑**（[#11096](https://github.com/zeroclaw-labs/zeroclaw/issues/11096)）：Audacity88 指出 PR head 通过检查但基于过时 master，共享依赖或工作区测试变更可能导致合并后失败，并以 #10525/#10815/#11066 序列为例。这反映出社区对 **CI 可靠性** 的敏感度提高。
- **运行时嵌入能力是高级用户诉求**（[#10993](https://github.com/zeroclaw-labs/zeroclaw/issues/10993)）：仓库已拆分工作区（#5559）并引入 DaemonRegistry（#7430），但运行时仍依赖具体工具实现。用户期望完整的 `zeroclaw` 运行时组合边界，以便在自有产品中嵌入 agent 能力。

整体反馈集中在**架构级能力**（资源治理、可嵌入性）与**工程可靠性**（CI 新鲜度、panic 消除），直接的功能抱怨较少，反映当前用户多为开发者或高级使用者。

---

### 8. 待处理积压

当前 42 个 PR 待合并，其中存在多个创建超一个月、依赖 author 响应或审查停滞的条目：

| 类型 | 条目 | 创建日期 | 标签/状态 | 积压时间 |
|---|---|---|---|---|
| PR | [#10308](https://github.com/zeroclaw-labs/zeroclaw/pull/10308) feat(config): gate shared/ read access behind per-agent flag | 2026-08-24 | needs-author-action, risk:high, size:L | 33 天 |
| PR | [#10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275) refactor(security): retire Nevis/iam_policy | 2026-08-23 | size:XL, security 主线 stage 6 | 34 天 |
| PR | [#10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274) feat(gateway): route-layer auth | 2026-08-23 | size:XL, security 主线 stage 5 | 34 天 |
| PR | [#10600](https://github.com/zeroclaw-labs/zeroclaw/pull/10600) fix(channels): stop reporting success for outbound sends | 2026-09-03 | needs-author-action, risk:medium, size:L | 23 天 |
| PR | [#10583](https://github.com/zeroclaw-labs/zeroclaw/pull/10583) feat(gateway): accept any file on /api/upload | 2026-09-03 | needs-author-action, risk:high | 23 天 |
| PR | [#10622](https://github.com/zeroclaw-labs/zeroclaw/pull/10622) feat(slack): accept bot and workflow messages | 2026-09-04 | status:parking-lot, size:XL, needs-author-action | 22 天 |
| Issue | [#10998](https://github.com/zeroclaw-labs/zeroclaw/issues/10998) [Task]: Deliver minimal core tool set | 2026-09-20 | status:blocked + accepted | 6 天（阻塞中） |

**维护者关注点**：
1. **安全主线 #10274/#10275** 已积压超一个月且为 size:XL，直接影响 #8289 stage 5/6 的最终落地，需要优先安排审查资源；
2. **#10308** 涉及共享目录读权限的默认拒绝开关，属于安全加固项，等待 author 更新；
3. **#10622** 被标记为 parking-lot，但 Slack bot 消息场景是社区常用功能，若长期搁置可能造成用户流失；
4. **#10998** 被阻塞，阻塞源未在 Issue 中说明，建议维护者明确解锁条件。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目日报 — 2026-09-26

## 1. 今日速览

过去 24 小时项目总体活跃度中等偏上：**1 个新 Issue + 1 个 Issue 关闭**，Issue 处理闭环良好；**4 个 PR 处于待合并状态**，但今日无 PR 被合并或关闭，合并节奏暂缓。功能开发方向上，**OpenAI Responses API 切换、新推理服务商接入**等 PR 持续活跃，体现出项目正在积极扩展底层模型兼容性与服务商生态。社区讨论热度集中在飞书配置报错问题（已解决），整体项目健康状况良好，维护响应及时。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日**无 PR 合并或关闭**，但有多项重要 PR 正在推进中，代表了项目当前的功能演进方向：

- **[#3381] feat: Switch Openai to responses API**（[@XenonR](https://github.com/XenonR)）⚡  
  将 OpenAI Provider 切换到最新的 Responses API，属于非破坏性新特性，直接影响核心推理链路的能力与前瞻性。  
  🔗 [https://github.com/sipeed/picoclaw/pull/3381](https://github.com/sipeed/picoclaw/pull/3381)

- **[#3393] feat(provider): add Cheaper Inference provider**（[@aiapienthusiast](https://github.com/aiapienthusiast)）  
  新增 OpenAI 兼容的 LLM 网关服务商 Cheaper Inference，成本较同类降低 15–60%，丰富多服务商选择。  
  🔗 [https://github.com/sipeed/picoclaw/pull/3393](https://github.com/sipeed/picoclaw/pull/3393)

- **[#3222] refactor(deltachat): cleanup implementation, documentation -200LOC**（[@trufae](https://github.com/trufae)）  
  DeltaChat 实现大幅精简：移除旧特性与兼容代码，精简约 200 行，完善文档，减少技术债。  
  🔗 [https://github.com/sipeed/picoclaw/pull/3222](https://github.com/sipeed/picoclaw/pull/3222)

- **[#3368] docs: add Parallel Search MCP setup example**（[@georgeatparallel](https://github.com/georgeatparallel)）  
  增加 Parallel Search MCP 的即用型配置示例，让用户无需 Parallel 账号/API Key 即可使用网页搜索与页面提取。  
  🔗 [https://github.com/sipeed/picoclaw/pull/3368](https://github.com/sipeed/picoclaw/pull/3368)

以上 PR 若陆续合并，项目将同时获得**更新的 OpenAI API 支持、更低成本的服务商选项、更干净的代码基础与更友好的文档**，整体向前迈进的幅度可观。

---

## 4. 社区热点

今日社区最活跃的讨论集中在 **[#3355] [BUG] 连接飞书报错-附解决方案**：

- 标签：**已关闭**・stale・3 条评论
- 创建于 9 月 1 日，9 月 25 日更新并关闭，说明问题已得到解决或用户已自行提交方案。

**痛点分析**：用户在使用飞书（Feishu/Lark）渠道时遇到配置错误，错误信息为 `config.json contains unknown field(s): channel_list.feishu.app_id`。这说明**配置文件中的字段名与当前版本实际支持的字段不一致**，常见原因是版本升级后字段被改名或废弃，但文档未同步更新。该 Issue 最终以附带解决方案关闭，也反映了用户愿意反哺社区、共享排查经验的良好氛围。

🔗 [https://github.com/sipeed/picoclaw/issues/3355](https://github.com/sipeed/picoclaw/issues/3355)

---

## 5. Bug 与稳定性

今日共报告 **2 个 Bug**，按严重程度排列如下：

### 🔴 中等：飞书配置报错（已解决）
- **Issue #3355**：`config.json` 中 `channel_list.feishu.app_id` 被识别为未知字段，导致飞书连接失败。
- 状态：**已关闭**，且用户附带了解决方案，说明问题本身不涉及核心代码缺陷，更多是配置项命名变更或文档缺失所致。
- **对应 fix**：无需代码修复，但建议维护者核查飞书渠道的配置文档与示例，避免后续用户再次踩坑。
- 🔗 [https://github.com/sipeed/picoclaw/issues/3355](https://github.com/sipeed/picoclaw/issues/3355)

### 🟡 低：CLAassistant 无法检测签名（新报告）
- **Issue #3392**：CLA 签名检测工具失效，导致 PR 贡献流程受阻（关联 PR #3381）。
- 影响范围：**贡献者体验与合规流程**，不直接影响 PicoClaw 运行时稳定性。
- 状态：**待维护者确认**，目前尚无对应 fix PR。
- 🔗 [https://github.com/sipeed/picoclaw/issues/3392](https://github.com/sipeed/picoclaw/issues/3392)

---

## 6. 功能请求与路线图信号

来自今日活跃 PR 的功能信号（可能被纳入下一版本）：

| 信号 | 来源 | 说明 | 可能性 |
|------|------|------|--------|
| OpenAI Responses API 支持 | [#3381](https://github.com/sipeed/picoclaw/pull/3381) | 从 Chat Completions 迁移到 Responses API，适配 OpenAI 最新接口 | ⭐⭐⭐⭐（持续活跃） |
| 更便宜的推理服务商 Cheaper Inference | [#3393](https://github.com/sipeed/picoclaw/pull/3393) | OpenAI 兼容网关，聚合多家模型，成本降低 15–60% | ⭐⭐⭐（新提交） |
| Parallel Search MCP 官方配置示例 | [#3368](https://github.com/sipeed/picoclaw/pull/3368) | 零成本接入网页搜索能力，仅需文档更新 | ⭐⭐⭐⭐（已有代码/文档，待合并） |
| DeltaChat 代码清理与文档完善 | [#3222](https://github.com/sipeed/picoclaw/pull/3222) | 重构性质，说明维护者在优化存量功能 | ⭐⭐⭐（合并周期较长） |

此外，Issue #3392 提到 CLA 检查失效，属于**流程工具问题**，不构成功能请求，但优先级应高于普通功能，因为它直接影响外部贡献者的代码合入体验。

---

## 7. 用户反馈摘要

- **[#3355] 用户@ttghub 的反馈**：  
  在飞书连接配置上遭遇字段不识别问题，但用户**主动定位并附带了解决方案**，说明该用户具备一定技术排查能力，且对 PicoClaw 有耐心和投入度。痛点集中在**配置文档与 version 同步不足**，期望官方更新字段说明。

- **[#3392] 用户@XenonR 的反馈**：  
  提交 PR #3381 后 CLAassistant 未能检测到签名，属于**外部工具失效**，非 PicoClaw 本体问题，但会直接影响 PR 合入效率，用户表达了对流程顺畅性的关注。

- **共性趋势**：近期用户更关注**配置易用性**与**服务商扩展性**，负面反馈多为配置误导或外部工具故障，未见对核心聊天逻辑/性能的抱怨，整体满意度信号偏正面。

---

## 8. 待处理积压

以下为长期未合并或需要维护者重点关注的项目：

| 条项 | 类型 | 创建时间 | 最后活跃 | 关注原因 |
|------|------|----------|----------|----------|
| [#3222] DeltaChat 重构 | PR | 2026-07-03 | 2026-09-25 | 已开放 **85 天**，中间有更新，但始终未合并。若清理后代码稳定，建议尽早合入，避免长期分支冲突。 |
| [#3368] Parallel Search MCP 文档 | PR | 2026-09-05 | 2026-09-25 | 标记为 **stale**，文档型 PR 本身冲突面小，合并成本低，建议维护者本周内处理。 |
| [#3355] 飞书配置报错 | Issue | 2026-09-01 | 2026-09-25 | 虽已关闭，但暴露出的配置文档问题未彻底解决，建议跟进文档更新，防止同类问题复发。 |
| [#3392] CLAassistant 不检测签名 | Issue | 2026-09-25 | 2026-09-25 | 新报告，阻塞 PR #3381 的 CLA 合规流程，需要维护者尽快联系工具侧处理。 |

> 📌 **维护者提示**：#3222 是当前累计时间最长的开放 PR，建议评估合并或明确 roadmap 归属；#3368 这类文档型贡献应加快处理节奏，避免外部贡献者等待过久。

---

**总结**：PicoClaw 今日处于“功能蓄力、合并待发”阶段——PR 数量可观但合入为零，建议维护者明日安排一轮 review 与合并，释放积压节奏。项目整体健康度良好，社区互助氛围积极，新增服务商与 API 适配信号为下一阶段的能力扩展奠定了明确方向。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-26

## 今日速览

过去 24 小时 NanoClaw 项目保持高强度的 bug 修复与迭代节奏：共新增 5 个 Issue，全部与 v2.4.0 的回归或稳定性问题相关，且均已出现对应的 fix PR，说明维护团队响应迅速。PR 侧异常活跃，单日更新 50 条，其中 48 条仍处于待合并状态，积压量值得关注。今日唯一合并/关闭的 PR 为 #3917（修复 Claude 默认输出样式破坏 prompt 缓存的问题）。整体来看，项目处于 v2.4.0 发布后的密集修补期，主要精力集中在 setup/update 流程、网关探测、容器生命周期管理和 agent-runner 稳定性上。CI/流程规范类 PR 的密集出现，也反映出维护者正在收紧贡献质量门槛。

## 版本发布

今日无新版本发布。

---

## 项目进展

今日仅 1 条 PR 被合并/关闭：

- **[#3917] fix: seed Claude's default output style, not Concise, which defeated prompt caching** — 作者 @gavrielc，2026-09-25 合并。自 v2.4.0 起，Claude agent 默认注入 `outputStyle: "Concise"`，而带命名的输出风格会让对话无法从 prompt 缓存读取，导致每轮都要重新计费。此修复移除了该默认值，恢复缓存命中，是对 v2.4.0 性能/成本回归的重要修复。

当前积压的 48 条待合并 PR 中，有相当一部分是修复今日新报告的 Issue 的（如 #3905→#3906、#3910→#3907、#3913→#3906 等），预计接下来几天会有一波集中合并。项目整体正处于一个高频修复 + 流程基建加固的窗口期。

---

## 社区热点

今日 Issues 评论区活跃度整体偏低（#3906 有 1 条评论，其余为 0），PR 侧评论数据未显示，但从 PR 主题与数量分布看，社区注意力集中在以下两类：

1. **v2.4.0 升级后的回归问题**——今日 5 个新 Issue 全部是在 v2.4.0（commit c313d061）上报告的，集中在 update 流程失效（#3906）、网关探测失败（#3907）、组重启目标错误（#3911）以及容器竞态条件（#3909）。三连报的 @glifocat 疑似是核心维护者，但也反映出 v2.4.0 的发布质量有待加强。

2. **较老 PR 仍在积累关注**——如 [#3185](https://github.com/nanocoai/nanoclaw/pull/3185)（2026-08-04 创建）：Discord webhook 中 `custom_id` 的 `\n` 分隔符导致所有审批按钮解析失败（点 Approve 实际变为拒绝），这是影响 Discord 用户日常操作的高影响 bug，但 PR 已搁置近两个月；[#3446](https://github.com/nanocoai/nanoclaw/pull/3446) 修复 bot/webhook 发送者卡在 unknown-sender 审批门的问题，同样是安全与可用性的交界。

社区诉求集中在**升级路径的平稳性**和**多渠道（Discord/Slack/Telegram）消息通道的可靠性**上。

---

## Bug 与稳定性

今日报告的 5 个 Issue 均为 bug，按严重程度排列如下：

**高严重度**

- **[#3911] ncl groups restart --id \<other group\> 重启了调用者而非目标组** — agent 以 `cli_scope: global` 运行时，指定 `--id` 执行重启，返回"restarted: 1"但目标组未动，实际重启了调用者自身。这属于命令语义错误，可能导致误操作，需尽快修复。
  - 状态：无 fix PR
  - 链接：https://github.com/nanocoai/nanoclaw/issues/3911

- **[#3906] update-nanoclaw 控制器归档缺少 setup/ 目录，且 stage-rooted 命令在依赖就绪前执行** — 自 #3816 引入的回归，导致 `/update-nanoclaw` 流程完全不可用。
  - 状态：已有 fix PR [#3913](https://github.com/nanocoai/nanoclaw/pull/3913) "load the update controller without setup/ or node_modules" 和 [#3905](https://github.com/nanocoai/nanoclaw/pull/3905) 与之呼应
  - 链接：https://github.com/nanocoai/nanoclaw/issues/3906

- **[#3909] 宿主为已删除的 agent group 启动 session 容器（竞态条件）** — `spawnContainer` 先读取 agent group 再执行多步异步操作，期间若 group 被删除，容器仍会启动。属竞态条件，可能造成孤儿容器。
  - 状态：无对应 fix PR
  - 链接：https://github.com/nanocoai/nanoclaw/issues/3909

**中严重度**

- **[#3907] 嵌套 pnpm 向 stdout 打印 workspace 警告导致网关探测失败** — `/update-nanoclaw` 因解析整个 stdout 而误判"未检测到已安装网关"，实际安装健康。
  - 状态：已有 fix PR [#3910](https://github.com/nanocoai/nanoclaw/pull/3910) "detect installed gateways without parsing nested pnpm output"
  - 链接：https://github.com/nanocoai/nanoclaw/issues/3907

**低严重度**

- **[#3916] 宿主日志不轮转且无日期** — `nanoclaw.log` 数月不轮转（日志文件达 10 MB/29 MB），按时间段过滤日志会跨月匹配同一时段，误导事故排查。
  - 状态：无对应 fix PR
  - 链接：https://github.com/nanocoai/nanoclaw/issues/3916

---

## 功能请求与路线图信号

今日没有明确的新功能需求 Issue，但从新提交的 PR 中可以读出路线图方向：

- **CI/流程自动化收紧**（#3914、#3886、#3912）——强制 PR 模板合规、强制 release note、修复标签覆盖竞态。说明项目在 2.4.0 大版本后开始规范贡献流程，为后续版本做准备。
- **可配置性增强**：[#3646](https://github.com/nanocoai/nanoclaw/pull/3646) 允许通过 env var 覆盖 sweep 的两个 stuck 容器计时器（`ABSOLUTE_CEILING_MS`、`CLAIM_STUCK_MS`），回应了本地模型后端慢导致容器被误杀的生产痛点；[#3903](https://github.com/nanocoai/nanoclaw/pull/3903) 为 due-session 唤醒引入可插拔 admission 机制，支持并发上限、优先级、quiet hours 等场景。
- **安全加固方向**：[#3920](https://github.com/nanocoai/nanoclaw/pull/3920) 限制 setup 期间 failure-assist agent 对在线安装的权限（禁止直接 bash/edit），是安全与易用性的平衡之举。

**对下一版本（可能 v2.4.1）的预判**：以上帝视角来看，今日积压的 48 条待合并 PR 中有大量 fix 会在近几日合入，预计 v2.4.1（或 v2.5.0）将以稳定性修复为主，附带 CI 流程改进和可配置化增强。

---

## 用户反馈摘要

今日 Issue 的评论数据较少，仅 #3906 有 1 条评论。从 Issue 描述中可以提取以下用户痛点信号：

- **升级过程脆弱**（#3906、#3907）：`/update-nanoclaw` 是文档化的升级路径，但在 v2.4.0 上两个独立故障导致升级流程完全不可用。用户 @glifocat 在 Linux 上复现，并在 #3907 中描述了"gateway 健康但被误判为未安装"的困惑场景。
- **日志诊断困难**（#3916）：@BuckG71 在 macOS 上升级时发现日志 4 个月不轮转，按时间段过滤日志时匹配到 4 个月前的历史记录，9483 条历史日志干扰了故障排查。
- **多 agent 组管理语义混乱**（#3911）：`ncl groups restart --id <other group>` 重启了错误的目标，说明 CLI 参数的语义实现与用户预期不符，对运维场景有实际风险。
- **v2.4.0 的 Claude 回复风格回归**（#3917）：2.4.0 强制默认 `Concise` 风格且破坏 prompt 缓存，用户感知是"回复变短且成本变高"，此 PR 的及时合入体现了对反馈的快速响应。

---

## 待处理积压

以下为长时间未合并/未响应的 PR，提醒维护者关注：

- **[#3185] fix(discord): strip \n delimiter in webhook interaction custom_id**（2026-08-04 创建，已搁置 53 天）——Discord 上所有审批按钮解析错误（点 Approve 实际被拒），影响面大。链接：https://github.com/nanocoai/nanoclaw/pull/3185
- **[#3446] Auto-drop automated senders in the unknown-sender gate**（2026-08-22 创建，已搁置 35 天）——bot/webhook 发送者会被卡在审批门，相关 #3235 应尽快推动。链接：https://github.com/nanocoai/nanoclaw/pull/3446
- **[#3302] fix(onecli): correct default OneCLI gateway bind address**（2026-08-17 创建，已搁置 40 天）——网关默认绑定地址错误导致 agent 容器无法访问，属于部署阻断级别问题。链接：https://github.com/nanocoai/nanoclaw/pull/3302
- **[#3646] global env overrides for ABSOLUTE_CEILING_MS and CLAIM_STUCK_MS**（2026-08-29 创建，已搁置 28 天）——本地模型场景的必备配置能力，多个 issue 可能与之相关。链接：https://github.com/nanocoai/nanoclaw/pull/3646

另外，今日 Issue #3916（日志轮转）和 #3909（spawn 竞态）尚无对应 fix PR，建议维护者尽快确认优先级并分配。

---

*本日报基于 GitHub 公开数据自动生成，时间范围为 2026-09-25 至 2026-09-26，仅供项目健康度参考。*

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报 — 2026-09-26

## 今日速览

过去 24 小时，IronClaw 项目**无新开或关闭的 Issue**，社区反馈量处于低位；**2 个 PR 处于待合并状态**，其中包含 1 个功能增强（host-runtime 时间偏移支持）和 1 个基础设施维护（代码知识图谱刷新），开发侧保持稳定的低频推进；**无新版本发布**。整体来看，项目当前处于"平稳维护期"——核心功能迭代放缓，但仍有持续的基础设施维护和新手贡献进入，健康度正常。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日**无 PR 被合并或关闭**，故无直接的代码变更进入主分支。但当前有 2 个待合并 PR 值得关注，它们代表了项目近期的主要推进方向：

- **[#8108] fix(host-runtime): add builtin.time shift and typed input issues**（待合并）
  - 为 `builtin.time` 新增 `operation: "shift"` 能力，支持基于显式时间戳或当前时间进行有符号的秒、分钟、小时、天、周偏移，并引入宽累加器保证可表示的有符号抵消。
  - 影响范围：docs | 风险：low | 规模：XL
  - 由**社区新贡献者** @Bortlesboat 提交，体现外部贡献者开始触及宿主运行时这类核心模块。
  - 链接: https://github.com/nearai/ironclaw/pull/8108

- **[#7988] chore(agents): refresh codebase knowledge graph**（待合并）
  - 由 CI 机器人自动提交，刷新默认分支的代码库记忆引导快照，属于夜间代码图刷新工作流的产物。
  - 影响范围：CI/Infrastructure | 风险：low | 规模：XS
  - 链接: https://github.com/nearai/ironclaw/pull/7988

> 注：由于今日无合并动作，项目核心代码未向前迈进，但上述 PR 若在后续合并，将带来时间偏移功能扩展和知识图谱数据更新。

---

## 社区热点

今日**没有高讨论量或高互动量的 Issue/PR**——两条 PR 的评论数均为 `undefined`（即无评论），点赞数均为 0，无活跃争论或社区共振。

从仅有的两条 PR 来看，社区关注点分散在两端：

- **功能增强**（#8108）：贡献者主动为 `builtin.time` 增加偏移运算能力，且设计上考虑了符号抵消和宽累加，说明有真实用户在使用时间类型时遇到了表达能力不足的问题。
- **自动化维护**（#7988）：CI 驱动的知识图谱刷新持续运行，但社区参与度极低，属于"后台默默工作"的类型。

分析：当前社区讨论热度偏低，项目舆论场平静，暂无明显的诉求集中爆发点。

---

## Bug 与稳定性

今日**无用户报告的 Bug、崩溃或回归问题**。

间接相关的稳定性信号来自 PR #8108 中提到的 "typed input issues"——即 `builtin.time` 的**类型输入存在缺陷**，该 PR 试图一并修复。但此问题尚未有对应的 Issue 记录，也未进入主分支，因此暂不构成已确认的严重稳定性问题。

---

## 功能请求与路线图信号

虽然今日无新的功能请求 Issue，但 PR #8108 是一个强烈的路线图信号：

- **时间偏移/相对时间运算**（`builtin.time` 的 `shift` 操作）是用户明确需要的功能，支持基于显式时间戳或 `now` 进行有符号的秒/分钟/小时/天/周偏移。
- 该 PR 由**新贡献者**实现，说明项目的外部参与门槛适中，且文档范围（docs）意味着该功能已考虑用户可理解性。
- 由于该 PR 标记为 `risk: low` 且已完成设计，**极有可能被纳入下一版本**。

---

## 用户反馈摘要

由于今日无 Issue 评论、无 PR 讨论评论，**无法从评论中直接提炼用户痛点**。但从 PR #8108 的提交动机可以间接推断：

- 用户在处理时间相关逻辑时，需要一种简洁的方式来表达"相对某个时间点偏移 N 天/小时"的运算，且希望类型系统能正确约束输入（typed input）。
- 这属于**中高端开发者**的使用场景，涉及智能合约或代理中与时间戳打交道的业务逻辑。

总体而言，用户反馈渠道今日静默，没有明显的满意/不满意情绪信号。

---

## 待处理积压

以下 PR 持续处于待合并状态，建议维护者关注：

| PR | 创建时间 | 更新日期 | 等待时长 | 说明 |
|---|---|---|---|---|
| [#7988] chore(agents): refresh codebase knowledge graph | 2026-08-29 | 2026-09-25 | **约 4 周** | CI 自动生成的代码知识图谱刷新，长时间未合并可能导致知识库与实际代码脱节。建议维护者快速审核合并。 |
| [#8108] fix(host-runtime): add builtin.time shift and typed input issues | 2026-09-22 | 2026-09-25 | 约 4 天 | 功能增强，等待时间尚属正常，但涉及新贡献者，建议及时给予 review 反馈以保持贡献热情。 |

**当前无长期未响应的 Issue**，Issue 积压为 0，这是项目健康度的亮点之一。

---

> 报告生成时间：2026-09-26 ｜ 数据来源：github.com/nearai/ironclaw

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目日报 — 2026-09-26

## 今日速览

过去 24 小时项目整体活跃度 **中等偏上**：无新 Issue、无新版本发布，PR 更新 10 条，其中合并/关闭 1 条，待合并 9 条。当前开发焦点明显集中在 **OpenClaw 运行时集成**（#2763、#2764、#2765、#2758 合计占待合并 PR 近半数），同时有 1 个新功能 PR 提交（新增 Requesty 模型提供商）。值得关注的是，9 条待合并 PR 中有 5 条为 4 月创建的 stale 标记 PR，虽在 24 小时内被更新但长期未合并，**合并吞吐量偏低**是当前主要健康度短板。另需注意，仓库中未捕获到 Issue/PR 评论与点赞数据，社区讨论热度无法从现有数据量化。

## 版本发布

无新版本发布。

## 项目进展

**已合并/关闭 1 条：**

- **[#2763 [CLOSED] fix(openclaw): stop whole-turn replay after a model call started](https://github.com/netease-youdao/LobsterAI/pull/2763)** — 修复 OpenClaw 回合重放与已启动模型调用的冲突。此前模型调用失败后会重放整个回合，与已提交的 keyed user message 冲突，导致用户看到模糊的 “LLM request failed.” 而非真实 provider 错误；现在通过 `OverloadRetryState` 中的 `modelCallStarted` 标志对两类外层重放进行拦截。该修复提升了错误可观测性和重试可靠性。

**新提交的待合并 PR（反映项目下一步方向）：**

- **[#2766 feat(providers): add Requesty as a model provider](https://github.com/netease-youdao/LobsterAI/pull/2766)** — 新增 Requesty（LLM 网关聚合服务）作为内置模型提供商，配置方式与 OpenRouter 一致，默认关闭。
- **[#2765 fix(openclaw): preserve accepted work through recovery and compaction](https://github.com/netease-youdao/LobsterAI/pull/2765)** — 在日志压缩与网关重启后保留已接受的工作成果，同时降低固定运行时启动开销。
- **[#2764 fix(openclaw): reload live gateway policies without restarting](https://github.com/netease-youdao/LobsterAI/pull/2764)** — 将 `gateway.tools`、`gateway.trustedProxies`、`gateway.allowRealIpFallback` 三个配置项标记为热重载，修改后无需重启网关即可生效。
- **[#2758 feat(cowork): display and refresh native OpenClaw progress cards](https://github.com/netease-youdao/LobsterAI/pull/2758)** — 在 Cowork 输入框上方展示 OpenClaw 持久化进度卡片，并支持手动刷新。

整体来看，项目正处于 **OpenClaw 运行时深度整合阶段**，优先解决稳定性（错误处理、数据持久化）与运维体验（热重载）问题，同时向更多模型提供商与 UI 精细化方向扩展。

## 社区热点

今日 Issue/PR 均无评论与点赞数据，无法直接量化讨论热度。从 PR 类型和主题来看，关注度可能集中在以下两条功能性 PR：

- **[#2766 feat(providers): add Requesty as a model provider](https://github.com/netease-youdao/LobsterAI/pull/2766)** — 用户对更多模型接入渠道的需求持续存在，Requesty 作为聚合网关可降低多模型接入成本。
- **[#2758 feat(cowork): display and refresh native OpenClaw progress cards](https://github.com/netease-youdao/LobsterAI/pull/2758)** — 任务进度可视化是协作场景的高频诉求，用户希望在 Cowork 界面直接看到 OpenClaw 侧的进度状态，并保留历史计划。

上述 PR 均无评论互动，但从 PR 的及时提交可以看出团队内部（或社区贡献者）对这两个方向有明确推进意图。

## Bug 与稳定性

今日无新 Issue 报告，但通过 PR 可识别出以下现存或刚修复的稳定性问题，按严重程度排列：

| 严重程度 | 问题描述 | 状态 |
|---------|---------|------|
| 🔴 高 | **[#1550](https://github.com/netease-youdao/LobsterAI/pull/1550)** 会话/IM 创建的定时任务在投递模式为 “不通知” 时，触发运行会报网关校验错误 “Channel is required when multiple channels are configured”，而 UI 手动创建的同配置任务正常 | 已有 fix PR，但 **stale 未合并**（4 月创建） |
| 🟠 中 | **[#2763](https://github.com/netease-youdao/LobsterAI/pull/2763)** 模型调用失败后整回合重放与已提交消息冲突，导致真实 provider 错误被 “LLM request failed.” 掩盖，排查困难 | ✅ 已修复（closed） |
| 🟠 中 | **[#2765](https://github.com/netease-youdao/LobsterAI/pull/2765)** 网关重启或日志压缩后，已接受的工作成果可能丢失，存在数据可靠性风险 | 有 fix PR，待合并 |
| 🟡 低 | **[#1547](https://github.com/netease-youdao/LobsterAI/pull/1547)** 定时任务编辑页面中，通知渠道选择后无法改回 “不通知”，再次编辑时下拉框显示旧值 | 已有 fix PR，但 **stale 未合并**（4 月创建） |
| 🟡 低 | **[#2764](https://github.com/netease-youdao/LobsterAI/pull/2764)** 修改 Gateway 策略配置（tools/trustedProxies/allowRealIpFallback）需重启网关，造成短暂服务中断 | 有 fix PR，待合并 |

其中 #1550 和 #1547 为长期悬置的定时任务相关缺陷，建议维护者优先推动合并，避免同类问题持续影响用户。

## 功能请求与路线图信号

今日无新 Issue 形式的功能请求，但待合并 PR 透露出明确的路线图信号，可能进入下一版本：

- **扩展模型提供商生态：[#2766 Requesty 支持](https://github.com/netease-youdao/LobsterAI/pull/2766)** — 继 OpenRouter 之后的又一聚合网关接入，表明项目在建立 “一次接入、多模型可用” 的 provider 体系。
- **OpenClaw 能力深化：[#2758 原生进度卡片](https://github.com/netease-youdao/LobsterAI/pull/2758)** — 将 OpenClaw 持久化进度状态嵌入 Cowork 前端，强化双端协作体验，可视为 OpenClaw 从“运行时”向“一等公民”演进的信号。
- **UI/UX 精细化（4 月提交、stale 状态）：**
  - [#1628 模型选择器 UI 优化与工具栏样式统一](https://github.com/netease-youdao/LobsterAI/pull/1628)
  - [#1634 全局搜索修复与搜索体验升级](https://github.com/netease-youdao/LobsterAI/pull/1634)
  - [#1660 非 main agent 首页欢迎区域个性化](https://github.com/netease-youdao/LobsterAI/pull/1660)

## 用户反馈摘要

虽然今日无直接评论数据，但从 PR 描述中可以提炼出以下真实用户痛点：

- **错误信息不透明**（#2763）：失败时仅显示 “LLM request failed.”，用户无法获知真实 provider 错误原因，排障需人工介入。
- **定时任务配置与运行不一致**（#1547/#1550）：UI 保存的 “不通知” 配置在再次编辑时显示错误，且通过 IM 创建的同类任务在触发时报错——同一功能两种路径行为分裂，严重影响信任感。
- **搜索范围与直觉不符**（#1634）：用户预期全局搜索所有 Agent 的任务，实际只能搜到当前 Agent 的内容，搜索结果“不可预测”。
- **非 main agent 缺乏个性化**（#1660）：切换 Agent 后首页仍是固定文案 “开始协作”，缺少当前 Agent 的名称和描述，体验“千篇一律”。
- **配置变更需要重启**（#2764）：修改网关策略导致服务短暂中断，对线上运行环境不友好。

## 待处理积压

以下为长期未合并的 stale PR，建议维护者关注并推动处理：

| PR | 创建时间 | 核心内容 | 风险提示 |
|----|---------|---------|---------|
| [#1547](https://github.com/netease-youdao/LobsterAI/pull/1547) | 2026-04-07 | 定时任务通知渠道无法改回 “不通知” | 5 个月未合并，问题持续影响用户 |
| [#1550](https://github.com/netease-youdao/LobsterAI/pull/1550) | 2026-04-07 | 会话创建的定时任务 “不通知” 模式触发报错 | 运行时错误，严重度较高 |
| [#1628](https://github.com/netease-youdao/LobsterAI/pull/1628) | 2026-04-10 | 模型选择器 UI 优化与下拉面板定位修复 | 纯 UI 改进，长时间搁置易产生冲突 |
| [#1634](https://github.com/netease-youdao/LobsterAI/pull/1634) | 2026-04-11 | 全局搜索修复与搜索体验升级 | 涉及数据过滤逻辑，可能有行为变更 |
| [#1660](https://github.com/netease-youdao/LobsterAI/pull/1660) | 2026-04-13 | 非 main agent 首页欢迎区域个性化 | UI 小改动，阻塞时间过长 |

此外，今日新提交的 4 条 OpenClaw 相关 PR（#2763 已合、#2764、#2765、#2758）建议尽快完成 Review 与合并，避免与后续改动冲突。

:::

:::details{title="TinyClaw" repo="TinyAGI/tinyclaw"}

过去24小时无活动。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目日报（2026-09-26）

> 数据来源：github.com/agentscope-ai/CoPaw（GitHub 数据镜像为 QwenPaw） | 统计窗口：2026-09-25 至 2026-09-26


## 1. 今日速览

过去 24 小时，CoPaw 项目保持高强度社区活跃：**12 条 Issue 全部处于活跃/新开状态、13 条 PR 等待合并**，但**无新版本发布、无 PR 被合并/关闭**——社区侧产出丰富（含 4 位首次贡献者），维护侧的合并吞吐则形成瓶颈，PR 积压风险值得关注。Issue 侧呈现鲜明“修复驱动”特征，多个报告（#7980、#7984、#7946）直接对应同主题的 fix PR，说明社区已形成“报告—修复”的快速闭环。另有 3 个长期未合并的老 PR（#7357、#7359 已挂起 30 天）需维护者优先处理。总体判断：**社区活跃度极高，项目健康度良好，但合并效率是当前最大短板。**


## 2. 版本发布

过去 24 小时无新版本发布。


## 3. 项目进展

今日 **无 PR 被合并或关闭**，但 13 条待合并 PR 清晰地映射了项目下一波更新方向：

- **浏览器扩展支持（#7987）＋ grep 二进制过滤（#7988）＋ Markdown 表格滚动修复（#7989）**：三项均由首次贡献者 @dawNotPoi 提交，分别对应今天新报的 Issue #7984、#7980、#7924，说明外部贡献者已在精准解决真实用户痛点。
- **QwenPaw 自定义端点上下文窗口修复（#7986）**：@Bruce-Yii 修复了本地 llama.cpp/vLLM 部署被云端模型目录误判的问题，直接解决 Issue #7979。对自部署用户意义重大。
- **QQ 网关重复消息修复（#7983）**：@iluv7 修复 QQ 官方机器人 WebSocket 断线重连后的事件重放问题，对应 Issue #7946，影响所有 QQ 机器人用户。
- **Gemini 原生提供商 thought_signature 中继（#7982）**：首次贡献者 @xuxiaowei1985 修复 Gemini 3.x/2.5 思考模式在第二轮工具调用时的 400 错误，属高价值修复。

**综合判断**：虽然今日无合并，但这 13 条 PR 覆盖了控制台 UI、本地部署、消息通道、多提供商兼容四大方向，一旦合并将显著提升项目稳定性与自部署体验。


## 4. 社区热点

| 排名 | 条目 | 类型 | 评论数 | 热度分析 |
|------|------|------|--------|----------|
| 1 | [#7628 Context compaction 仍可能超出 provider 请求预算](https://github.com/agentscope-ai/QwenPaw/issues/7628) | Issue | 7 | 已持续讨论 17 天仍无修复方案，涉及上下文压缩的核心机制缺陷，是当前最受关注的技术议题。诉求是压缩触发条件和最终预算必须基于“发给 provider 的完整请求”而非仅当前可见会话，对活动中的 turn 影响严重。 |
| 2 | [#7884 压缩后刷新前端历史信息无法全量加载](https://github.com/agentscope-ai/QwenPaw/issues/7884) | Issue | 5 | 用户 @happieme 措辞强烈（“知道这个体验多差么？？？”），反映普通用户对“聊天记录丢失”的认知与项目技术设计（压缩移出 live JSON）之间存在显著理解落差。背后诉求是：**压缩后的历史消息应在刷新/回看时全量可加载**。 |
| 3 | [#7957 预制模型与频道无法手动停用](https://github.com/agentscope-ai/QwenPaw/issues/7957) | Issue | 3 | 中文用户提出“强迫症”视角的 UI 定制需求，评论区有共鸣。诉求是增加可选功能模块的禁用开关，提升控制台整洁度。 |
| 4 | [#7948 Web 控制台设计破坏用户输入](https://github.com/agentscope-ai/QwenPaw/issues/7948) | Issue | 3 | 用户反馈输入体验受损，但描述细节不足。属于 UI/UX 高优问题，建议维护者补充环境信息。 |


## 5. Bug 与稳定性

> 严重程度：🔴 严重 / 🟠 较高 / 🟡 一般；✅ 已有对应 fix PR

| 严重度 | Issue | 问题描述 | 状态 |
|--------|-------|----------|------|
| 🔴 | [#7980 grep_search 匹配内部 history.db-wal 导致会话状态污染](https://github.com/agentscope-ai/QwenPaw/issues/7980) | 工作区全局 grep 会检索到内部 SQLite WAL 文件的二进制内容，进入 agent 工具结果并持久化到会话状态，造成“不可恢复的死循环”。 | ✅ PR #7988 已提交 |
| 🔴 | [#7981 chat_with_agent 前台超时误报“用户中断”且父 turn 无最终答案](https://github.com/agentscope-ai/QwenPaw/issues/7981) | 300 秒默认超时触发后，调用方 agent 收到误导性的“interrupted by the user”提示，且整个父 turn 以无结果结束。错误信息传递会误导上层逻辑。 | ⚠️ 暂无 fix PR |
| 🟠 | [#7946 QQ 网关断线重连后事件重放导致重复消息处理](https://github.com/agentscope-ai/QwenPaw/issues/7946) | 服务端要求重连后，QQ 将此前收到的 INTUOP 事件整体重投，channel 层未做去重，导致重复回复和重复工具调用。 | ✅ PR #7983 已提交 |
| 🟠 | [#7979 云端上下文目录误用于本地 llama.cpp，32k 被当成 1M](https://github.com/agentscope-ai/QwenPaw/issues/7979) | 子代理会话使用本地 llama.cpp 时，上下文窗口按云端模型目录匹配（alias 包含方式），32k 的本地服务器被误判为 1M，导致压缩永不触发。 | ✅ PR #7986 已提交 |
| 🟠 | [#7628 Context compaction 仍可能超出 provider 请求预算](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 当前压缩机制只基于活动会话上下文计算预算，未包含即将发送给 provider 的完整请求（如系统提示词、工具定义等），导致压缩后仍可能超出预算、活动 turn 失败。 | ⚠️ 讨论 7 条，无 fix PR |
| 🟡 | [#7984 Playwright 注入 --disable-extensions 导致 profile 扩展无法加载](https://github.com/agentscope-ai/QwenPaw/issues/7984) | 持久 profile 模式下浏览器启动时带上了 Playwright 默认参数 `--disable-extensions`，QwenPaw 未暴露移除入口，SwitchyOmega 等已装扩展全部失效。 | ✅ PR #7987 已提交 |
| 🟡 | [#7948 Web 控制台设计破坏用户输入](https://github.com/agentscope-ai/QwenPaw/issues/7948) | 用户报告控制台存在输入干扰问题，但描述不完整（未填写版本和复现步骤）。 | ⚠️ 需更多信息 |
| 🟡 | [#7924 Console 中 Markdown 表格超宽且横向滚动条沉底](https://github.com/agentscope-ai/QwenPaw/issues/7924) | Web UI 渲染 Markdown 表格时，表格超宽需横向滚动，且滚动条出现在表格底部；长内容不折行、不自动限宽到对话框。 | ✅ PR #7989 已提交 |


## 6. 功能请求与路线图信号

| 功能请求 | 类型 | 对应 PR / 路线图信号 |
|----------|------|----------------------|
| [#7990 模型目录为 Aliyun Token Plan 声明 thinking_param_style](https://github.com/agentscope-ai/QwenPaw/issues/7990) | 模型目录补全 | 无直接 PR，但同类“思考参数”问题已在 Gemini provider 侧获得修复（#7982），预计模型目录将跟进补声明。 |
| [#7978 侧边栏增加跨 Agent “Recent Sessions”面板](https://github.com/agentscope-ai/QwenPaw/issues/7978) | Console 功能增强 | 无直接 PR，但合并 [#7956（控制台设置工作流优化）](https://github.com/agentscope-ai/QwenPaw/pull/7956) 后，侧边栏交互预计会进一步迭代。 |
| [#7957 支持手动停用/禁用预制模型和频道](https://github.com/agentscope-ai/QwenPaw/issues/7957) | UI 定制能力 | 无直接 PR，属体验优化类需求，低优先级但社区有共鸣。 |
| — 工具调用卡片隐藏（[#7357](https://github.com/agentscope-ai/QwenPaw/pull/7357)） | 已有 PR | 已挂起 30 天，功能为“tool call 可见性开关”，能有效降低长对话噪音，建议维护者评估合并。 |
| — 每媒体内联限制（[#7359](https://github.com/agentscope-ai/QwenPaw/pull/7359)） | 已有 PR | 已挂起 30 天，对应 Issue #7201，增加 provider 级图片/视频/音频内联容量配置，属多模态能力基础建设。 |
| — 滚动回溯消息分页（[#7542](https://github.com/agentscope-ai/QwenPaw/pull/7542)） | 已有 PR | 已挂起 22 天，解决压缩后刷新页面消息“从中间开始”的体验割裂问题，与 Issue #7884 直接相关。 |


## 7. 用户反馈摘要

从今日活跃 Issues 评论中提炼的真实用户声音：

- **对历史记录丢失的强烈不满（#7884）**：用户 @happieme 在压缩后刷新前端发现历史消息无法回看，多次感叹号表达不满。这暴露了一个**沟通问题**：压缩策略的设计意图未在产品层面传达给普通用户，用户将“压缩”感知为“丢记录”。
- **对本地部署被“云端规则”误伤的困惑（#7979）**：自部署用户使用 llama.cpp 时发现上下文窗口被按云端模型目录匹配，32k 的本地服务被误认为 1M，压缩逻辑完全不生效。自部署用户希望本地端点优先读取本地部署的实际能力。
- **QQ 机器人用户的重复消息困扰（#7946）**：用户提供了完整的部署环境（飞牛 fnOS、Python 3.12、QQ 官方机器人 WebSocket 模式），说明 QQ 机器人通道是真实生产环境使用场景，重复回复直接损害用户体验和自动化流程。
- **“强迫症”用户的 UI 定制诉求（#7957）**：部分用户看到大量未使用的预制模型和频道感到不适，希望有停用/禁用开关。这类反馈虽小，但反映了控制台存在信息过载问题。
- **社区对首次贡献者友好度较好**：4 位首次贡献者（@dawNotPoi ×3、@xuxiaowei1985）在同一天内提交高相关性的 fix PR，且 Issue 与 PR 一一对应，说明项目对新贡献者的引导和问题追踪机制运转良好。


## 8. 待处理积压

| 类型 | 条目 | 搁置时长 | 建议 |
|------|------|----------|------|
| 核心 Bug | [#7628 Context compaction 仍可能超出 provider 请求预算](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 创建于 2026-09-08，已 18 天，7 条评论无定论 | 涉及上下文压缩核心机制，建议维护者提升优先级并给出方案时间表 |
| 老 PR | [#7357 feat(chat): add tool call visibility toggle](https://github.com/agentscope-ai/QwenPaw/pull/7357) | 30 天无合并 | 功能完整且符合社区诉求（降低长对话噪音），建议安排 review 或明确关闭理由 |
| 老 PR | [#7359 feat(providers): expose per-media inline caps](https://github.com/agentscope-ai/QwenPaw/pull/7359) | 30 天无合并 | 对应 Issue #7201，属多模态基础能力，建议评估是否纳入下一里程碑 |
| 老 PR | [#7542 feat(chats): add scroll-back message pagination](https://github.com/agentscope-ai/QwenPaw/pull/7542) | 22 天无合并 | 与今日高热度 Issue #7884 直接相关，合并可显著缓解“历史记录缺失”的用户投诉 |
| 中龄 PR | [#7825 fix(crons): expand numeric DOW steps/ranges](https://github.com/agentscope-ai/QwenPaw/pull/7825) | 9 天无合并 | cron 数值星期几映射错误会导致任务在错误日期执行或无法调度，属功能性 bug 修复 |
| 中龄 PR | [#7923 feat(scroll): age out tool_result blocks](https://github.com/agentscope-ai/QwenPaw/pull/7923) | 5 天无合并 | 解决滚动历史无限增长问题（生产环境 tool_result 占约 75% 存储），对长期运行实例有价值 |
| 合并瓶颈 | 今日 13 条 PR 全部处于待合并状态 | 单日无任何合并/关闭动作 | 建议维护者评估是否增加 reviewer 带宽，或建立自动合并/分诊机制 |


**日报总结**：CoPaw 社区正处于“高产期”——Issue 质量高、PR 针对性强、外部贡献者活跃。项目健康度的主要风险不在代码质量，而在维护侧的合并效率：13 条待合并 PR 中包含至少 5 条直接修复严重/较高 Bug 的补丁，另有 3 条已挂起超过 3 周的成熟 PR。建议维护者优先处理 #7986、#7988、#7983 三条高影响修复，其次评估 #7542 对 #7884 用户投诉的缓解作用，并关注 #7628 核心压缩机制缺陷的长期方案。

> 本日报由 AI 自动生成，数据统计区间为 2026-09-25 至 2026-09-26（基于 GitHub API 快照）。

:::

:::details{title="ZeptoClaw" repo="qhkm/zeptoclaw"}

过去24小时无活动。

:::

:::details{title="EasyClaw" repo="gaoyangz77/easyclaw"}

# EasyClaw 项目动态日报 — 2026-09-26

## 今日速览

过去 24 小时内，EasyClaw 的 Issues 与 PR 更新均为 0，社区侧没有新增讨论或代码提交；与此同时，项目发布了 v1.9.23（TK Copilot）版本，带来达人联盟样品明细下钻、达人表现数据列、导出可靠性提升，并修复了滚动面板内边距问题。整体来看，项目维护侧仍在持续迭代，但社区参与度较低，活跃度评估为“维护者单侧活跃”，项目健康度中等，建议关注用户反馈渠道的活跃度。

## 版本发布

- **v1.9.23（TK Copilot）**  
  👉 [查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.23)

  **更新内容：**
  - 新增达人联盟样品明细下钻，分页更清晰，展示达人表现数据列，导出更可靠。
  - 修复可滚动面板的内边距问题，使内容留白保持在滚动区域内。

  **破坏性变更：** 发布说明中未提及破坏性变更。  
  **迁移注意事项：** 无特殊迁移要求，升级风险较低。  
  **分析：** 本次版本重点在于加强联盟数据分析的易用性，特别是样品明细查看、达人表现指标展示和数据导出稳定性。

## 项目进展

- 过去 24 小时无合并或关闭的 PR（👉 [Pull Requests](https://github.com/gaoyangz77/easyclaw/pulls)）。
- 虽然 PR 动作为 0，但 v1.9.23 的发布包含功能新增和 Bug 修复，说明项目仍保持正常迭代节奏。本次版本推进的主要方向是 TikTok 达人联盟数据处理与导出能力。

## 社区热点

- 今日无新增或活跃的 Issues/PRs，因此没有讨论热点。（👉 [Issues](https://github.com/gaoyangz77/easyclaw/issues) / [Pull Requests](https://github.com/gaoyangz77/easyclaw/pulls)）

## Bug 与稳定性

- 今日未收到新的 Bug 报告。
- 根据 v1.9.23 发布说明，有一个已修复的 UI 类问题：
  - **可滚动面板内边距异常**：内容留白超出滚动区域，影响浏览体验。严重程度：低。已在 v1.9.23 中修复，无独立 fix PR，随版本发布解决。

## 功能请求与路线图信号

- 今日无用户提交的新功能请求（👉 [Issues](https://github.com/gaoyangz77/easyclaw/issues)）。
- 从 v1.9.23 新增的“达人联盟样品明细下钻”“达人表现数据列”等功能来看，项目路线图正在深化 TikTok 达人联盟数据分析能力。未来版本可能继续围绕分页、明细展示、数据列自定义以及导出可靠性进行优化。

## 用户反馈摘要

- 今日无新增 Issues 评论，无法提炼真实用户痛点、使用场景或满意/不满意信息。（👉 [Issues 评论](https://github.com/gaoyangz77/easyclaw/issues)）

## 待处理积压

- 当前无长期未响应的重要 Issue 或 PR。（👉 [Issues](https://github.com/gaoyangz77/easyclaw/issues) / [Pull Requests](https://github.com/gaoyangz77/easyclaw/pulls)）

:::
