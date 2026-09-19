---
title: "OpenClaw 生态日报"
published: 2026-09-19
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-19

> Issues: 94 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-19 00:00 UTC

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

好的，这是 2026 年 9 月 19 日的 OpenClaw 项目动态日报。

---

# OpenClaw 项目动态日报 — 2026-09-19

## 1. 今日速览

过去 24 小时项目活跃度极高，**PR 更新达 500 条（其中 241 条已合并/关闭），Issue 更新 94 条**，核心维护者（如 @steipete）批量提交了多项重构与性能优化 PR。然而，项目稳定性压力依然突出：**至少 6 个 P0 级问题仍在处理中**，集中在大型多代理（Fleet）场景的启动崩溃、消息丢失和安全边界问题上。WebUI 性能与用户体验是另一大热点，多个相关 PR 被标记为 “ready for maintainer look”。整体来看，项目处于 **高强度的功能迭代与稳定性修复并行阶段**。

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日合并/关闭了 241 条 PR，在功能推进、稳定性修复与技术债务清理方面均有显著进展。以下为部分重要合并项：

- **修复 Hook 超时竞态**：`fix(hooks): reject native relay responses after deadline` (#150712) 已合并。该 PR 修复了原生 Hook 在响应超时后仍可能被接收的问题，消除了潜在的竞态条件。
- **提升 CLI 日志体验**：`fix(cli): retry log follow after a Gateway handshake timeout` (#152152) 已合并。修复 `openclaw logs --follow` 在 Gateway 握手超时后直接退出的问题，现会自动重连。
- **修复 Matrix 消息读取**：`fix(matrix): message read returns room history instead of the requested --message-id` (#150554) 已合并。该修复确保指定 `--message-id` 时能准确读取对应消息，而非返回整个房间历史。

**待合并 PR 中值得关注的重点方向：**
- **大规模维护者重构**：@steipete 提交了多条重构 PR，旨在简化运行时适配器、移除过时代码 (#152277)，以及简化 worker 与模型回退逻辑 (#152268)，为后续维护奠定基础。
- **性能优化**：多路径性能优化正在进行，包括减少会话选择内存占用 (#152260)、绑定单代理名册查询 (#152270) 和简化配置重载比较 (#152279)。
- **关键稳定性修复**：`fix: repair stale Gateway service definitions during updates` (#152120) 已进入待合并状态，该 PR 针对升级后遗留的过期服务定义（如缺失的 systemd `KillMode=mixed`），修复“更新难”问题。

---

## 4. 社区热点

今日讨论热度最高的 Issue 反映了社区对**大型部署稳定性**和**日常使用体验**的深切关注：

- **[Bug]: OpenClaw leaks unreaped hook/tool child processes...** (#97616) — 30 条评论。该问题报告了进程泄漏导致僵尸进程堆积和运行时性能下降，尽管评级为 P1，但获得了很高的社区共鸣，说明许多用户在长期运行后都感受到了性能退化。
- **Umbrella: WebUI performance and stability** (#149361) — 22 条评论。作为 WebUI 性能与稳定性的汇总问题，吸引了大量桌面端与移动端用户的反馈，是观察 WebUI 体验痛点的最佳入口。
- **main (1611ca6d): Gateway reaches ready but never serves...** (#149538) — 19 条评论。该问题影响巨大，报告在 632-agent 的 Fleet 上，Gateway 事件循环被饿死，健康检查全部超时，直接触达了大规模用户的稳定运营底线。

**背后的诉求**：这些热点问题表明，社区用户（尤其是中大型部署者）对资源泄漏、大规模下的性能瓶颈和 WebUI 交互细节的容忍度正在降低，**稳健性和可维护性已成为社区呼声最高的需求**。

---

## 5. Bug 与稳定性

今日报告的 Bug 和稳定性问题依然高发，以下按严重程度排列：

**P0 级（严重，影响核心功能或数据安全）**

- **[Bug]: Agent SQLite WAL grows to 1.4–2.8 GB in days...** (#143524) — `crash-loop`, `ux-release-blocker`。Windows 平台 SQLite WAL 无界增长，最终阻塞 Gateway 启动。**尚无修复 PR**。
- **[Bug]: Lost subagent completion delivery parks requester in settle-yield...** (#143334) — `message-loss`, `ux-release-blocker`。子代理完成消息丢失导致主代理卡死，影响消息传递完整性。**尚无修复 PR**。
- **macOS app never resolves a node-role token...** (#149804) — `auth-provider`, `ux-release-blocker`。macOS 应用在 token 迁移后永远无法通过身份验证，导致功能不可用。**尚无修复 PR**。
- **[Bug]: redaction sentinel `__OPENCLAW_REDACTED__` can be written into the secret store...** (#151189) — `data-loss`, `security`, `ux-release-blocker`。严重的安全漏洞，脱敏标记可能被写入密钥库导致所有设备被锁定。**该问题今日已被关闭**，推测已有对应修复或处理方案。
- **update 2026.9.3→2026.9.4: rehearsal budget caps block 38-agent install...** (#151546) — `ux-release-blocker`，多代理安装场景下更新失败。

**P1 级（高优先级，影响核心体验）**

- **[Bug]: OpenClaw leaks unreaped hook/tool child processes...** (#97616) — 进程泄漏导致运行时降级。**尚无修复 PR**。
- **[Bug]: Memory indexer subprocess cannot resolve SecretRef credentials...** (#148650) — 401 认证失败导致记忆搜索不可用。**尚无修复 PR**。
- **Webchat: failed send persists as immortal client-side retry...** (#151986) — 失败消息在客户端永久滞留，影响用户体验。**尚无修复 PR**，但标记了 `queueable-fix`。

---

## 6. 功能请求与路线图信号

今日出现了多个高质量的功能需求，且部分与即将合并的 PR 高度相关，暗示了未来路线图的方向。

**可能被纳入下一版本的功能（已有 PR 对应）**

- **Workspace 技能宿主发现**：`feat(skills): discover skills on the workspace host` (#152259) 和 `feat(skills): run workspace installs on the configured host` (#152282) 双双提交。这可能意味着 Skill 系统的架构将向“远程宿主执行”方向演进。
- **Telegram 原生骰子**：`feat(telegram): roll Telegram's native dice from the message tool` (#138202) 仍在等待证明，这是一个社区呼声较高的功能点。

**值得关注的新增功能请求**

- **远程管理权限过强**：`[Bug]: Remote administrator management removes ordinary automation creation` (#151265) 虽标记为 Bug，但本质上是对权限模型细粒度的需求，已被关闭。
- **成本/Token 计量修正**：`openclaw_cost_usd_total... omit non-delivering (NO_REPLY) turns` (#152185) 指出成本遥测漏记了不产出消息的轮次（如定时心跳），导致成本核算低估，这是一个非常实际的运维需求。

---

## 7. 用户反馈摘要

从今日的 Issue 讨论中可以提炼出以下真实的用户痛点与使用场景：

- **长期运行稳定性是核心痛点**：无论是 #97616 (僵尸进程) 还是 #143524 (SQLite WAL 无限增长)，都表明用户在长时间运行场景下遭遇了严重的性能衰退和崩溃问题，这直接影响了用户对项目“长期运行可靠性”的信心。
- **大规模 Fleet 部署挑战重重**：来自 @609NFT 等多个大型部署用户反馈 (#149538, #148529)，在数百代理规模下，Gateway 的启动时间、事件循环健康度都出现了严重的回归，这表明项目在大规模场景下的性能优化亟待加强。
- **WebUI 细节体验不佳**：多个关于 WebUI 的 Issue 集中于界面状态保持（如滚动位置、会话顺序）和布局自适应（窄屏显示），虽然单个问题不大，但累积起来严重影响了 Web 端用户的日常操作效率。
- **对“静默失败”容忍度降低**：用户报告了多起“表面成功但实际异常”的案例，如 `gog` 工具无法执行 (#151852)、Telegram 回复成功但出现错误横幅 (#152121)、以及 Matrix 消息读取返回错误内容 (#150554)。这类问题极大地消耗了用户的信任。

---

## 8. 待处理积压

以下 Issue 长期处于讨论中但缺少明确的修复 PR，提醒维护者关注：

- **Models: fully dynamic model discovery (OpenRouter + beyond)** (#10687)：自 2026-02-06 开启，已积压超 7 个月，评论 9 条。用户对模型目录的“静态性”感到不满，这关系到核心的模型接入体验。
- **Feature: Add maxTurns/maxToolCalls config option to limit agent iterations** (#9912)：同样是 2 月初的需求，用户需要对智能体迭代次数进行硬性限制，以避免模型失控和成本超支。
- **Feature: Trigger model fallback on context length exceeded** (#9986)：目前 fallback 机制不覆盖上下文超限场景，这是生产环境中的一个重要缺口。
- **[Feature]: Human-readable Telegram topic names in session dropdown** (#7406)：自 2026-02-02 的请求，已积压超 7 个月。这虽是一个 UX 改进，但对于依赖 Telegram 论坛主题进行多会话管理的重度用户而言，是一个“每日可见”的痛点。

---

**报告总结**：OpenClaw 项目在 2026-09-19 展现出极高的迭代速度，但 P0 级稳定性问题和较长的功能请求积压期，显示项目在快速前进的同时，也需要在核心稳定性和社区需求响应速度上投入更多关注。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告（2026-09-19）

## 1. 生态全景

当前生态整体处于“高迭代速度与生产级稳定性短板并存”的阶段。OpenClaw 作为核心参照项目，单日 PR 动态达 500 条，带动了 NanoBot、CoPaw、LobsterAI、Zeroclaw 等多个同源/同类项目同步活跃。社区最集中的诉求已从“功能扩展”转向“长期运行可靠性、多代理一致性和安全边界”。跨项目看，资源泄漏、配置丢失、升级失败、上下文成本失控等问题出现频率最高，正在成为影响技术选型的关键因素。同时，渠道能力对齐、AI 辅助安全治理、细粒度成本控制也开始成为下一阶段路线图的共同方向。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | 合并/关闭 PR | Release | 健康度评估 |
|---|---|---|---|---|---|
| OpenClaw | 94 | 500 | 241 | 无 | 极高迭代，但 P0 积压明显 |
| NanoBot | 5 | 14 | 5 | 无 | 健康，Bug 响应快、积压少 |
| Zeroclaw | 4 | 50 | 9 | 无 | 提交活跃，合并瓶颈突出，高风险 PR 堆积 |
| PicoClaw | 1 | 4 | 1 | 无 | 平稳维护，社区反馈密度低 |
| NanoClaw | 4 | 5 | 0 | 无 | 贡献活跃但合并慢，高危问题未闭环 |
| IronClaw | 1 | 2 | 0 | 无 | 积蓄期，大型 PR 评审滞留 |
| LobsterAI | 6 | 23 | 9 | 无（有 release 分支） | 高活跃，集中交付，Windows 修复密集 |
| Moltis | 0 | 1 | 0 | 无 | 低活跃，自动化依赖维护为主 |
| CoPaw | 15 | 50 | 19 | v2.2.2-beta.1 | 高吞吐，安全响应快，但待合并 PR 积压 |

## 3. OpenClaw 在生态中的定位

- **社区规模与迭代强度断层领先**：单日 500 条 PR 动态、94 条 Issue 更新，几乎是第二梯队项目的 10 倍以上；241 条 PR 合并/关闭表明其维护者容量和贡献者网络依然是生态核心。
- **技术路线侧重多代理编排**：以 Gateway、Fleet、Hooks、WebUI 为核心，目标是支撑大规模、长连接、多智能体协作场景；同类项目更多聚焦单机轻量部署或特定渠道体验。
- **优势是生态领导力与功能覆盖面**：Telegram、Matrix、CLI、WebUI、技能系统、Fleet 均有持续投入，是其他项目的“上游参照”和功能风向标。
- **短板是稳定性债务**：6 个 P0 级问题仍待处理，包括子代理消息丢失、SQLite WAL 无界增长、Gateway 事件循环饿死、密钥库脱敏标记污染等。相比之下，NanoBot 当日修复跨会话串线，CoPaw 对提示注入当天给出修复 PR，OpenClaw 的“先行者代价”更明显。

## 4. 共同关注的技术方向

- **长期运行稳定性与资源收敛**
  - OpenClaw：僵尸子进程泄漏、SQLite WAL 无限增长
  - NanoClaw：归档目录导致 OOM 崩溃循环、磁盘无限增长
  - CoPaw：ToolResultPruner 跳过媒体块，base64 无界累积
  - Zeroclaw：Windows 任务日志无界追加

- **多代理/并发会话一致性**
  - OpenClaw：632-agent Fleet 下 Gateway 事件循环饿死、子代理完成消息丢失
  - NanoBot：跨会话响应串线，回复被投递到错误会话
  - CoPaw：Driver 后台 reload 覆盖并发写入
  - LobsterAI：网关重启延迟导致新会话被拒绝

- **安全边界与提示注入防护**
  - OpenClaw：脱敏标记可写入密钥库；远程管理权限过强
  - CoPaw：提示注入试图删除技能目录；字面量截断标记绕过防护
  - Zeroclaw：delegate 文件系统越权；插件 egress 授权缺失
  - NanoBot：Jev shell 引入 AI 预检安全层

- **配置持久化与升级可靠性**
  - LobsterAI：hooks 配置重启丢失；旧版本升级后启动失败
  - OpenClaw：升级后残留 stale Gateway 服务定义
  - NanoClaw：文档化环境变量未转发进会话容器
  - IronClaw：存储布局与 profile 绑定，隔离语义存在风险
  - PicoClaw：飞书配置字段校验不兼容

- **上下文与成本治理**
  - OpenClaw：NO_REPLY 轮次成本遥测漏记
  - Zeroclaw：图片标记在 token 估算中按纯文本计价
  - NanoClaw：定时任务每次全量重读历史，成本每周增长 15%
  - CoPaw：滚动上下文误丢工具密集段中的用户请求
  - IronClaw：缺少按请求级别的 thinking/effort 控制

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构关键差异 |
|---|---|---|---|
| OpenClaw | 通用多代理编排、Fleet、技能生态 | 开发者/中大团队/复杂部署 | Gateway + Worker + Hooks，事件驱动，WebUI 与 CLI 并重 |
| NanoBot | 轻量 WebUI、多线程会话、跨渠道回复 | 个人开发者、小团队 | AgentLoop + RecoveryCoordinator，重视会话隔离与快速修复 |
| Zeroclaw | Provider 适配、执行安全、插件权限 | 企业/生产环境 | 强安全模型：egress grant、delegate 边界、执行树预算 |
| PicoClaw | 多 IM 渠道接入，QQ/DeltaChat 等 | 轻量社区用户 | 渠道解析增强，配置校验友好性待改善 |
| NanoClaw | 长期运行、定时任务、Slack/Codex | Agent 运维者 | 看门狗、归档生命周期、token 轮换、传输协议可配置 |
| IronClaw | 与 NEAR AI 平台深度集成 | NEAR AI/平台开发者 | Reborn 存储隔离、OAuth 扩展、LLM 推理细粒度控制 |
| LobsterAI | 中国企业 IM + Electron 桌面端 | 网易生态、微信/QQ/飞书用户 | 多 IM 路由、Windows 兼容、升级数据修复 |
| CoPaw | Qwen 生态客户端、记忆与技能管理 | Qwen 模型用户 | Scroll 上下文、ReMe 命令、ToolResultPruner、插件安全看门狗 |
| Moltis | 依赖维护与文档站点 | 文档使用者/维护者 | 当前无功能迭代，处于静默维护期 |

## 6. 社区热度与成熟度

- **第一梯队：高速迭代期**
  - OpenClaw：绝对热度最高，但稳定性问题堆积，处于“功能扩张 vs 质量债”并行阶段。
  - CoPaw：发布 v2.2.2-beta.1，单日 19 个 PR 合并，严重 Bug 基本当天出修复 PR，属于“快速响应型高活跃”。
  - LobsterAI：集中交付 9 个 PR，大量 Windows/网关防御性修复，有明确 release 分支推进。
  - Zeroclaw：PR 提交量大，但合并率仅 18%，高风险 PR 等待过长，属于“提交旺盛、审阅滞后”。

- **第二梯队：质量巩固期**
  - NanoBot：PR 数量不大，但 Bug 响应速度快、生命周期完整，适合作为“稳定优先”参考。
  - NanoClaw：贡献者持续提交修复，但维护者合并慢，高危问题（OOM、看门狗误杀）未闭环，存在流失风险。
  - IronClaw：讨论集中、方向明确，但大型 PR 评审周期超过 5 周，处于积蓄期。

- **第三梯队：维护静默期**
  - PicoClaw：少量 PR/Issue 更新，外部反馈稀疏，维持性开发。
  - Moltis：零 Issue、仅 1 条 Dependabot PR，社区互动趋近于零。

## 7. 值得关注的趋势信号

- **“能长期稳定跑”已取代“功能多”成为核心选型标准**：多个项目出现进程泄漏、OOM、崩溃循环、归档无限增长问题，说明用户正把智能体当作生产级服务运行，资源边界和自恢复能力是刚需。
- **安全防护从网络层走向智能体行为层**：提示注入删除技能、脱敏标记污染密钥库、delegate 越权、插件出口权限等，标志着一轮围绕“工具调用权”和“数据完整性”的安全左移。
- **多代理/Fleet 不再是少数场景**：600+ agent 的 Gateway 饿死、子代理消息丢失、跨会话串线等反馈，说明大规模并发下的投递语义和会话隔离成为必须解决的问题。
- **成本可观测与控制成为显性需求**：NO_REPLY 成本漏记、定时任务历史膨胀、图片 token 低估、上下文滚动丢请求，正在推动“按请求级预算”和“无状态任务”等设计进入路线图。
- **渠道能力对齐是体验基线**：Telegram 原生回复、Discord 对等能力、QQ 多附件、飞书/微信配置可靠性等，说明多 IM 一致性不是加分项，而是基本盘。
- **AI 开始被用于治理 AI**：NanoBot 的 JevGuard 用模型预检 shell 命令，Zeroclaw 的 egress grant 和执行树预算，代表“用 AI 做安全决策”的早期探索。

对开发者而言，当前生态仍以 OpenClaw 为最大技术坐标系，但选型时更应关注项目的稳定性投入、安全修复速度和维护者审阅吞吐，而非单纯看 PR 数量或功能列表。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-19

## 1. 今日速览

项目过去24小时保持高活跃度，共产生 5 条 Issue 更新和 14 条 PR 更新，其中 5 个 PR 已被合并或关闭。修复类 PR 占比最高（约 74%），集中在 WebUI、Agent 循环和消息渠道三个核心模块，反映了项目在稳定性打磨上的明确投入。值得关注的是，来自社区的两条 bug 报告（#5798 跨会话串线、#5771 移动端点击失效）均在当日或次日获得了对应的 fix PR，响应速度快，项目健康度良好。今日无新版本发布，但已合并的 PR 中包含了功能增强（如 Discord 原生回复能力）和架构重构（如子代理私有会话执行），下一版本积累的变更量可观。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日有 5 个 PR 被合并或关闭，按重要性排列如下：

- **修复跨会话响应串线（#5794, merged）** — 核心 bug 修复，解决了当用户快速切换会话时，前一会话的响应被投递到后一会话的问题。根因在于 agent 循环的 `_dispatch` 方法在响应投递时未正确绑定会话上下文。此 PR 直接对应社区报告的热门 Issue #5798，意义重大。
  https://github.com/HKUDS/nanobot/pull/5794

- **新增 Discord 回复消息对等能力（#5800, merged）** — 为 Discord 渠道增加了与 Telegram 对齐的 `channels.discord.replyToMessage` 配置选项，默认关闭；支持在普通、附件和流式响应中回复触发消息，并保留显式回复目标和抑制回复提及。功能已在 Issue #1663 中追踪并从 3 月起就存在社区请求。
  https://github.com/HKUDS/nanobot/pull/5800

- **合并原生 Linear Agent 渠道（#5495, merged）** — 一个规模化功能集成：新增了完整的 Linear Agent 渠道，包含 OAuth 授权码 + PKCE、每个工作区轮换令牌、将签名事件 webhook 通过 SQLite 队列持久化并去重，以及一个包内的 WebUI 管理面板。从 8 月 23 日开启，经历约一个月打磨后正式合入。
  https://github.com/HKUDS/nanobot/pull/5495

- **恢复持续恢复流程（#5812, merged）** — 修复了恢复机制中的逻辑错误：区分持续目标延续与内部延续消息，使显式 WebUI 恢复延续能够正确到达 agent 会话处理器，并为恢复动作到 AgentLoop 的分发路径增加了回归测试。
  https://github.com/HKUDS/nanobot/pull/5812

- **仅 WebUI 启用时展示全渠道（#5810, merged）** — WebUI 修复：当仅启用 WebUI 时，原本由于默认筛选为"已启用"导致其他可配置渠道被隐藏。现在会排除 `always_enabled` 渠道，始终展示完整渠道目录。
  https://github.com/HKUDS/nanobot/pull/5810

整体来看，今日合并内容完成了多线程对话可靠性、Discord 渠道能力补全、恢复机制正确性这三条关键链路的推进，项目正在向更高稳定性和渠道覆盖度迈进。

## 4. 社区热点

今日讨论热度集中在两个 bug 报告上，各收获 1 条评论：

- **#5798 [bug] 回复串会话问题**（评论 1 | 👍 0）— 用户报告在不同会话中的问题会串到不相干的会话中回复，尤其当一个会话正在运行时，其他会话的消息会被错误投递到运行中的会话。用户明确指出了 0.3.0 没有此问题，说明这是一个回归 bug。背后诉求是**对会话隔离和响应路由正确性的高度期待**，该问题已由 PR #5794 修复。
  https://github.com/HKUDS/nanobot/issues/5798

- **#5771 [WebUI] 移动端会话列表点击两次才能打开会话**（评论 1 | 👍 0）— 用户在移动端上首次点击会话行无任何可见效果，需要再次点击才能打开，列表被感知为"无响应"。这直接影响了移动场景下的核心操作效率。对应修复 PR #5805 已于今日提交。
  https://github.com/HKUDS/nanobot/issues/5771

两个热点均指向"用户操作未得到预期反馈"的体验问题，说明社区对交互细节的敏感度很高，也反映出 WebUI 和消息路由是当前用户量最集中的场景。

## 5. Bug 与稳定性

今日报告了 4 个活跃 Bug（另有 1 个 Issue 被关闭），均已有对应的修复 PR。按严重程度排列：

| 严重程度 | Issue | 问题描述 | 对应 fix PR |
|---------|-------|---------|------------|
| 高 | [#5798](https://github.com/HKUDS/nanobot/issues/5798) | 跨会话响应串线——用户在会话 A 的消息被投递到会话 B，会话隔离失效 | ✅ [#5794](https://github.com/HKUDS/nanobot/pull/5794)（今日合并） |
| 中 | [#5808](https://github.com/HKUDS/nanobot/issues/5808) | WebUI 中停止某轮对话后，其后续 follow-up 被丢弃但仍在持久化恢复日志中，网关重启后会被 `RecoveryCoordinator` 重新排队执行——**停止操作未生效** | ✅ [#5809](https://github.com/HKUDS/nanobot/pull/5809)（待合并） |
| 中 | [#5771](https://github.com/HKUDS/nanobot/issues/5771) | 移动端 WebUI 会话列表首次点击无响应，需点击两次 | ✅ [#5805](https://github.com/HKUDS/nanobot/pull/5805)（待合并） |
| 中 | [#5806](https://github.com/HKUDS/nanobot/issues/5806) | Discord 渠道停止运行时，延迟表情响应任务未取消、待处理反应列表未清理，造成资源泄漏 | ✅ [#5807](https://github.com/HKUDS/nanobot/pull/5807)（待合并） |

关闭的 Issue：

- **#1663 [CLOSED] Discord: add replyToMessage parity with Telegram** — 3 月 7 日提出，今日随 PR #5800 合并而关闭，等待时间约 6 个月。
  https://github.com/HKUDS/nanobot/issues/1663

整体来看，所有活跃 Bug 都已被及时响应（均在 1-2 天内获得 fix PR），其中最高严重度的跨会话串线问题已在当日合入，稳定性控制环节表现良好。

## 6. 功能请求与路线图信号

今日社区提出的功能请求相对较少，更多是修复与增强并存。值得关注的路线图信号包括：

- **Discord 原生回复能力落地（#1663 → #5800, merged）** — 关闭的 Issue 确认了该项功能从需求到交付的完整闭环。Telegram 已有的原生回复支持现在向 Discord 对齐，这暗示项目正在**逐步统一各渠道的交互能力**，未来可能在更多渠道上看到一致性补齐。

- **Jev shell 安全防护（#5815, 新 PR）** — 新增可选的 `tools.exec.jevGuard` 预检机制，基于 OpenRouter 的 Decisions API，默认禁用，复用现有凭据与代理设置；在模型响应执行前批量进行 exec 调用决策。这一"opt-in 安全前缀"的设计表明项目在**工具调用的安全治理**上开始引入 AI 辅助决策层。
  https://github.com/HKUDS/nanobot/pull/5815

- **子代理通过私有会话执行（#5811, 新 PR）** — 重构子代理执行逻辑，将委托工作作为私有内存子会话，通过共享 AgentLoop 上下文和压缩路径进行；保留 `SubagentManager` 作为监督者，维持 `spawn`/SDK 契约。这是一个**架构层面的简化重构**，统一了主代理与子代理的执行路径，为后续统一维护提供了基础。
  https://github.com/HKUDS/nanobot/pull/5811

- **后台压缩通知可配置化（#5780, 待合并）** — 使自动上下文压缩的通知对用户不可见，但保留 `/compact` 手动压缩时的通知；作者明确请求如需保留自动通知行为则增加配置开关。这反映了**对非交互式打扰的克制**，也可能预示着压缩策略的进一步可调性。
  https://github.com/HKUDS/nanobot/pull/5780

结合 PR 节奏，上述 #5815 和 #5811 可能进入下一版本（约 0.4.0）的特性集，具体取决于评审进度。目前没有明确的路线图文档变动信号。

## 7. 用户反馈摘要

从今日的 Issues 和 PR 描述中可以提炼出以下用户声音：

- **对回归 bug 的敏感度**：用户 @wowowowowowowonojieba 在 #5798 中明确提到"0.3.0 没有这个问题"，对比版本的表述体现出用户对回归问题的关注度和对版本稳定性的期待。此类信息对维护者定位引入时间点很有价值。
  https://github.com/HKUDS/nanobot/issues/5798

- **移动体验的"无响应感"**：@morandot 在 #5771 中描述移动端会话列表"reads as unresponsive"，一个看似微小的"两次点击"问题在用户感知中会被放大为"不可用"。这也印证了移动端 WebUI 是活跃使用场景，值得更多投入。
  https://github.com/HKUDS/nanobot/issues/5771

- **对通知打扰的负面反馈**：PR #5780 的作者 @wzrayyy 明确表达了对自动压缩通知的困惑与困扰："I'm not sure that sending notifications about background context compaction was the desired outcome"，并建议如果设计有意如此则至少提供配置开关。这种"功能存在但用户不认可默认行为"的情况是产品化的典型信号。
  https://github.com/HKUDS/nanobot/pull/5780

- **对 Discord 回复对等的长期等待**：Issue #1663 从 3 月一直开放到 9 月才落地，虽然最终交付，但 6 个月的等待周期可能让部分 Discord 用户感到漫长。后续值得关注是否有更高效的渠道功能对齐流程。
  https://github.com/HKUDS/nanobot/issues/1663

## 8. 待处理积压

以下 Issue 和 PR 长期未获得关注或处于停滞状态，建议维护者留意：

- **[Issue #1663] Discord: add replyToMessage parity with Telegram（已关闭）** — 已随 #5800 合并而关闭，但因其从提出到闭环耗时约 6 个月（3 月 7 日 → 9 月 18 日），值得复盘渠道功能对齐流程。
  https://github.com/HKUDS/nanobot/issues/1663

- **[PR #5495] Add native Linear agent channel（已合并）** — 8 月 23 日创建的规模化 PR，今日合入。从创建到合并约 4 周，期间经历了多次更新。对于包含大量新代码的功能 PR，建议评估是否需要更早拆分以降低评审成本。
  https://github.com/HKUDS/nanobot/pull/5495

- **[PR #5780] fix: stop sending context compaction notifications（待合并，9/15 创建）** — 已等待 3 天未合并，作者对功能行为提出了明确质疑，涉及产品决策（是否该有通知），建议尽快明确设计意图并给予回应。
  https://github.com/HKUDS/nanobot/pull/5780

从当前数据看，项目整体积压情况健康：待合并 PR 多为 1-2 天内新提交，长期未响应的重大 Issue 已基本清零（#1663 已关闭），社区反馈的 bug 均得到快速响应。当前积压的风险主要在 #5803（Telegram 三合一改进）、#5811（子代理重构）等中等规模 PR 的评审周期上，若能在 3-5 天内完成审阅，可避免积压加深。

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报 — 2026-09-19

> 数据来源：github.com/zeroclaw-labs/zeroclaw 公开仓库活动快照（UTC 2026-09-18 至 2026-09-19）


## 1. 今日速览

过去 24 小时项目保持较高开发活跃度：共 50 条 PR 动态，但其中仅 9 条完成合并/关闭，41 条仍在待合并队列，合并吞吐偏低。Issues 侧更新 4 条，其中 3 条关闭、1 条长期 tracker 保持开放。无新版本发布。整体来看，社区提交意愿强、维护者审阅节奏略显滞后，大型 PR（size:XL 居多）积压明显，存在合并瓶颈风险。

- **PR 合并率**：9/50 ≈ 18%，大量 PR 等待审阅或作者响应
- **高风险 PR 堆积**：约 14 条标注 `risk:high` 的 PR 仍在开放状态
- **Issues 关闭情况**：3 条关闭（含 1 条 S2 级 bug），1 条开放（版本路线图 tracker）


## 3. 项目进展

今日无新版本发布，但完成了 2 条 PR 合并/关闭和 3 条 Issue 关闭，标志着部分技术债清理和功能修复完成。

**已合并/关闭的 PR**

- [#10882 [CLOSED] fix(zerocode): preserve provider aliases in model discovery](https://github.com/zeroclaw-labs/zeroclaw/pull/10882) — 修复模型发现过程中 provider 别名被错误折叠（`custom.first` → `custom`）的问题，同时修正 picker 缓存键，防止同一 provider 家族内的别名相互复用缓存。由 @Audacity88 提交。
- [#10493 [CLOSED] refactor(channels): gate email and IRC TLS dependencies](https://github.com/zeroclaw-labs/zeroclaw/pull/10493) — 将 `rustls`、`tokio-rustls`、`webpki-roots` 等 TLS 依赖改为 `zeroclaw-channels` 的可选依赖，email 和 IRC 通道按需启用，缩小默认编译体积。由 @Audacity88 提交。

**已关闭的 Issues**

- [#10736 [CLOSED] [Bug]: Pre-output stream failure skips advertised non-streaming fallback](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) — S2 级降级行为：Reliable provider 在输出任何内容前发生流式错误时，运行时虽记录日志声称回退到非流式，但并未真正发送请求。已关闭，评论 3 条。
- [#10772 [CLOSED] [Task]: Make zeroclaw-eval archive tests independent of workspace fixtures](https://github.com/zeroclaw-labs/zeroclaw/issues/10772) — 明确 `zeroclaw-eval` crate 归档的测试边界，要求发布包中的集成测试自包含，同时保留仓库内的回放门禁。
- [#10709 [CLOSED] [Docs]: Document Astra setup for API-key and Codex subscription providers](https://github.com/zeroclaw-labs/zeroclaw/issues/10709) — 补充 Astra 配置文档，覆盖 API-key 与 Codex subscription 两种 provider 的设置说明。

**进展小结**：模型发现别名正确性、TLS 依赖轻量化、Astra 文档缺口、流式回退 bug 已完成闭环。但大量功能 PR 与修复仍未合并（详见第 8 节），项目整体进度受限于审阅队列。


## 4. 社区热点

本次数据快照未提供 PR 评论数，以下以 Issue 评论数、更新频率和 PR 体量/风险等级作为热度参考。

**Issue 讨论焦点**

- [#10736 [Bug] Pre-output stream failure skips advertised non-streaming fallback](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) — 评论 3 条，为今日最高。虽然已关闭，但反映了用户对 **Reliable provider 流式回退机制可靠性** 的高度关注：日志声称回退却未实际执行，属于"误导性行为"，容易让 operator 误判系统状态。
- [#7432 [Tracker] Runtime and gateway delivery - v0.8.6 and v0.9.0](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — 评论 2 条，开放 102 天。作为 Phase 2/3 路线图 tracker，持续积累社区对 **运行时稳定性** 与 **网关拆分** 的预期。

**高关注度 PR（按体量/风险/存续时间）**

- [#9584 feat(cli): add the egress grant ceremony to plugin install and list](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — 已开放 50 天，`risk:high`、`size:XL`，插件安全模型的核心能力，由 @JordanTheJet 提交。
- [#10430 feat(channels): Gemini speech-to-speech broker channel (PR1)](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) — 已开放 22 天，`status:parking-lot`，语音通道大型功能，社区对多模态交互有明确需求。
- [#10911 feat(config): publish atomic live revisions](https://github.com/zeroclaw-labs/zeroclaw/pull/10911) — 43 文件、+3,390/−1,475 行，依赖 #10621，属于配置热加载体系的关键一环，@Audacity88 提交。

**诉求分析**：社区热点集中在三个方向——**provider 行为可预期性**（回退机制、会话头处理、图片请求容错）；**安全与权限细粒度控制**（egress grant、delegate 文件系统边界、外部入口来源标识）；**通道能力扩展**（Gemini 语音、Mattermost purpose 注入）。这些诉求共同指向：用户希望 Zeroclaw 在复杂生产环境中表现得更"稳"、更"安全"、更"多模态"。


## 5. Bug 与稳定性

今日新增/活跃的 Bug 类 issue 数量不多，但有大量 Bug 修复 PR 等待合并，稳定性风险主要堆积在审阅环节。

**已关闭 Bug**

- **[S2] #10736 Pre-output stream failure skips advertised non-streaming fallback** — [已关闭](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)。流式请求在产出内容前失败时，回退到非流式仅记录日志、未实际发送请求。严重度 S2（降级行为），修复已合入/关闭。

**开放中的 Bug 修复 PR（按风险从高到低）**

- [#10391 fix(delegate): bounded delegate filesystem tools now respect the target's own workspace](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) — `risk:high`，已开放 24 天，`needs-author-action`。委派文件系统工具越权访问目标 workspace 之外的文件，涉及安全问题。
- [#10480 fix(runtime): recover from rejected image requests](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) — `risk:high`，已开放 20 天。图片请求被 provider 以 HTTP 400 拒绝后，可自动剔除图片重试一次。
- [#10813 fix(sop): keep headless step turns from driving their own run](https://github.com/zeroclaw-labs/zeroclaw/pull/10813) — `risk:high`，headless SOP 步骤回合错误地加载了完整工具注册表，可能自驱动执行。
- [#10860 fix(providers): keep non-image data-URI markers in tool results as text](https://github.com/zeroclaw-labs/zeroclaw/pull/10860) — `risk:high`，非图片 data-URI 被误判为图片标记的校验缺陷。
- [#10864 fix(providers): close OpenCode session header follow-ups](https://github.com/zeroclaw-labs/zeroclaw/pull/10864) — `risk:high`，非法 header 值被静默丢弃导致 session 亲和性失效。
- [#10197 fix(acp): persist interrupted turn progress](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) — `risk:high`，已开放 30 天，`needs-maintainer-review`。中断回合的进度持久化。
- [#10931 fix(service): bound Windows task stdout and stderr logs](https://github.com/zeroclaw-labs/zeroclaw/pull/10931) — `risk:high`，Windows 计划任务日志无界追加的修复。
- [#10890 fix(runtime): charge image markers a fixed per-image cost in the history token estimate](https://github.com/zeroclaw-labs/zeroclaw/pull/10890) — 历史 token 估算中图片标记按纯文本计价（约 9 tokens），与实际 1.5k–2k 严重偏差，导致上下文预算失真。
- [#9635 fix(config): resolve git subcommand past global options in risk classifier](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) — `risk:high`，已开放 49 天，`needs-author-action`。git 命令风险分类器对全局选项后的子命令解析错误。

**稳定性评估**：今日无新增崩溃级（S1）Bug 上报，但 9 个高风险修复 PR 滞留待合并，部分已等待 20–49 天。若这些修复迟迟无法落地，用户在生产环境遇到的 **流式回退失效、图片请求失败、SOP 自驱动、token 预算失真** 等问题将持续存在。


## 6. 功能请求与路线图信号

今日开放中的功能型 PR 展示了清晰的路线图信号，主要体现在以下几个方向：

**路线图 tracker**

- [#7432 Runtime and gateway delivery - v0.8.6 and v0.9.0](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — 开放 102 天，是 v0.8.6（Phase 2 runtime）和 v0.9.0（Phase 3 gateway 分离）的唯一事实来源，包含交付地图、剩余缺口和实施顺序。这是当前项目最重要的中期路线图参考。

**可能进入下一版本的功能 PR（按体量/阶段）**

- [#10425 feat(runtime): internal-principal envelope and separated cron run outcomes (RFC #6954, 1/3)](https://github.com/zeroclaw-labs/zeroclaw/pull/10425) — RFC #6954 的第一阶段切片：为内部调用引入 `InternalPrincipal`（Cron/PeerAgent）身份信封，并拆分 cron 运行结果。已开放 22 天，`needs-author-action`。
- [#10911 feat(config): publish atomic live revisions](https://github.com/zeroclaw-labs/zeroclaw/pull/10911) — 配置原子热更新发布，依赖 #10621，涉及 43 个文件，属于配置体系现代化的关键节点。
- [#9584 feat(cli): add the egress grant ceremony to plugin install and list](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — 插件安装/列表的出口授权仪式，安全模型的重要拼图，已开放 50 天。
- [#10430 feat(channels): Gemini speech-to-speech broker channel (PR1: daemon-side core)](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) — 语音到语音的 broker 通道（PR1：daemon 端核心），当前处于 `parking-lot` 状态。
- [#10946 feat(channels): inject Mattermost channel purpose](https://github.com/zeroclaw-labs/zeroclaw/pull/10946) — 将 Mattermost 房间用途注入系统提示词，按别名 opt-in。
- [#10907 feat(channels): stamp external ingress provenance](https://github.com/zeroclaw-labs/zeroclaw/pull/10907) — 为外部渠道入口打上来源身份戳，改进准入机制的审计能力。
- [#10351 feat(runtime): enforce execution-tree iteration budgets](https://github.com/zeroclaw-labs/zeroclaw/pull/10351) — 为执行树添加迭代预算上限，防止单次前台 Agent 执行无界循环。
- [#10954 feat(shell): initialize PowerShell output as UTF-8](https://github.com/zeroclaw-labs/zeroclaw/pull/10954) — 跨平台 PowerShell 输出编码统一为 UTF-8。

**信号解读**：当前开发重心可归纳为 "**安全加固** + **可观测性/审计** + **执行控制** + **多模态通道**" 四条主线。`egress grant`、`internal-principal`、`external ingress provenance` 三项均属于安全与可信边界建设；`execution-tree iteration budgets` 和 `atomic live revisions` 属于运行时稳定性与运维体验；`Gemini speech-to-speech` 和 `Mattermost purpose` 则是通道能力的横向扩展。这些特性大概率会分布在 v0.8.6 与 v0.9.0 两个版本中落地。


## 7. 用户反馈摘要

> 注：本次数据快照未包含 Issue 评论的正文内容，以下基于标题、标签和上下文做审慎推断。

**用户痛点**

- **Provider 回退机制不可信**（#10736）：用户发现流式失败时系统日志"声称"回退到非流式，实际请求却未发出。这类静默失败严重打击用户对运行时自愈能力的信心，属于"宁可明确报错、也不要假成功"的典型诉求。反馈热度最高，评论 3 条。
- **文档缺失影响上手**（#10709）：用户 @IftekharUddin 报告 Astra 的 API-key 与 Codex subscription 两种 provider 配置指南不完整，说明多 provider 场景下用户对"按身份类型分别配置"的文档需求强烈。此 issue 已关闭，推测文档已补齐。
- **流式/非流式的一致性预期**（#10736 关联）：评论 3 条表明，用户对 provider 的 advertised 能力（如非流式回退）与实际行为的一致性有较高要求，任何"言行不一"都会被当作 bug 上报。

**使用场景信号**

- 用户同时使用 **Astra（API-key 模式）与 Codex subscription**（#10709），说明混合云/多 provider 部署已进入真实使用阶段。
- **zeroclaw-eval 的测试边界**（#10772）被单独列为 issue，表明有用户在消费已发布的 crate 归档时遇到了"仓库 fixtures 泄漏到外部包"的问题，社区对发布物件的自包含性有要求。

**整体满意度**：从关闭的 issue 数量（3/4）来看，问题响应与修复效率尚可；但 PR 合并速度偏慢（41/50 仍未合并），用户提交的修复可能要等待数周才能进入正式版本，这可能是潜在的满意度风险点。


## 8. 待处理积压

以下为长期未关闭/合并的重要 Issue 与 PR，建议维护者优先关注。

**长期开放的路线图 Issue**

- [#7432 [Tracker] Runtime and gateway delivery - v0.8.6 and v0.9.0](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — 开放 102 天，v0.8.6/v0.9.0 的交付 tracker。长期未关闭说明 Phase 2/3 工作仍在推进中，但需关注是否存在进度滞后风险。

**等待作者响应的 PR（`needs-author-action`）**

- [#9635 fix(config): resolve git subcommand past global options in risk classifier](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) — 开放 49 天，`risk:high`
- [#9584 feat(cli): add the egress grant ceremony to plugin install and list](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — 开放 50 天，`risk:high`（junior/experienced contributor）
- [#10425 feat(runtime): internal-principal envelope and separated cron run outcomes](https://github.com/zeroclaw-labs/zeroclaw/pull/10425) — 开放 22 天，`risk:high`
- [#10430 feat(channels): Gemini speech-to-speech broker channel (PR1)](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) — 开放 22 天，`status:parking-lot`
- [#10954 feat(shell): initialize PowerShell output as UTF-8](https://github.com/zeroclaw-labs/zeroclaw/pull/10954) — 开放 1 天，新 PR

**等待维护者审阅的 PR（`needs-maintainer-review`）**

- [#10480 fix(runtime): recover from rejected image requests](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) — 开放 20 天，`risk:high`、`size:XL`
- [#10351 feat(runtime): enforce execution-tree iteration budgets](https://github.com/zeroclaw-labs/zeroclaw/pull/10351) — 开放 25 天，`risk:medium`、`size:XL`
- [#10197 fix(acp): persist interrupted turn progress](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) — 开放 30 天，`risk:high`、`size:XL`

**长时间未合并且风险较高**

- [#10391 fix(delegate): bounded delegate filesystem tools now respect the target's own workspace](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) — 开放 24 天，安全相关修复，`risk:high`，且 `needs-author-action`
- [#10864 fix(providers): close OpenCode session header follow-ups](https://github.com/zeroclaw-labs/zeroclaw/pull/10864) — 开放 5 天，`risk:high`
- [#10860 fix(providers): keep non-image data-URI markers in tool results as text](https://github.com/zeroclaw-labs/zeroclaw/pull/10860) — 开放 5 天，`risk:high`

**积压提醒**：约 14 条 `risk:high` PR 处于开放状态，其中多条等待超过 20 天。建议维护者优先处理安全类修复（#10391、#9635、#10864、#10860），其次推进 `size:XL` 的阶段性 PR（#10425、#10430、#10197）以避免大 PR 合并冲突进一步恶化。对于标记 `needs-author-action` 的 PR，建议设置明确的作者响应期限，超时则考虑代为跟进或关闭。


*报告完*

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目日报（2026-09-19）

## 今日速览
过去 24 小时，PicoClaw 项目保持活跃但节奏平缓：共出现 1 条 Issue 更新、4 条 PR 更新，无新版本发布。1 条创建于三月的 PR（#1349）已被关闭，意味着其包含的 QQ 频道附件增强功能阶段性落地；其余 3 条 PR 处于待合并状态，且均于 9 月 18 日产生过动态，显示贡献者仍在持续推进。当前唯一活跃的 Issue（#3355）为飞书配置报错，用户已附上解决方案，但该 Issue 被标记为 stale，社区讨论热度有限。整体来看，项目处于健康的持续维护状态，功能迭代与问题响应均在推进，但外部反馈密度有所下降。

## 项目进展

### 已合并/关闭 PR
- **[#1349] feat(qq): support parsing and replying to more attachment types**（已关闭/合并，创建于 2026-03-11，更新于 2026-09-18）
  - 作者：@aishannon
  - [GitHub 链接](https://github.com/sipeed/picoclaw/pull/1349)
  - 内容：扩展 QQ 频道消息处理能力，支持解析 emoji 结构、接收语音/图片/视频/文件消息，并支持回复本地附件；优先使用 Markdown 消息回复，失败时降级处理。
  - 意义：该 PR 历经六个月终获关闭，落地后将显著增强 QQ 频道的多模态交互能力，是近期 Channel 集成方向的重要进展。关闭状态可能代表合并或放弃，建议关注后续变更日志确认。

### 待合并 PR（今日更新）
以下 PR 均处于打开状态，昨日产生更新，但尚未被维护者合并。详细信息见「待处理积压」部分。

## 社区热点

本周社区讨论热度集中在唯一有评论的 Issue 上：

- **[#3355] [BUG] 连接飞书报错-附解决方案（config.json contains unknown field(s): channel_list.feishu.app_id）**
  - 作者：@ttghub | 评论：2 | 标签：stale
  - [GitHub 链接](https://github.com/sipeed/picoclaw/issues/3355)
  - 分析：该 Issue 报告 PicoClaw nightly 版本连接飞书时配置校验失败，`channel_list.feishu.app_id` 被识别为未知字段。用户已在 Issue 中提供解决方案，但未转化为代码提交。从标签看该 Issue 已进入 stale 状态，说明讨论热度消退，但配置校验的兼容性问题依然存在。背后诉求是用户希望配置文件格式具备更清晰的文档指引或动态字段校验提示，避免因版本差异导致连接失败。

## Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 修复状态 |
|---------|----------|------|----------|
| 中 | [#3355](https://github.com/sipeed/picoclaw/issues/3355) | 飞书渠道配置报错：`config.json contains unknown field(s): channel_list.feishu.app_id`，导致连接无法建立 | 无关联修复 PR，用户已在 Issue 中附解决方案 |
| 低（性能） | [#3347](https://github.com/sipeed/picoclaw/pull/3347) | Web UI 在聊天区域文本量大时出现卡顿，影响桌面端和移动端浏览器体验 | 已有修复 PR 待合并（PR #3347 作者已自测通过） |

当前无崩溃、数据丢失等严重稳定性问题。

## 功能请求与路线图信号

- **新增 Provider 支持**：[PR #3371](https://github.com/sipeed/picoclaw/pull/3371)（@EMTumariscal）提出增加 `opencode-go` provider（`https://opencode.ai/zen/go/v1`），并按模型 ID 自动路由到正确的 endpoint 家族，同时通过 `x-opencode-session` header 传递会话信息，确保 PicoClaw 与 OpenCode Go 的持续兼容。这表明社区对多模型供应商的接入需求仍在增长。

- **渠道代码清理与文档重构**：[PR #3222](https://github.com/sipeed/picoclaw/pull/3222)（@trufae）对 DeltaChat 渠道进行大幅重构，移除约 200 行冗余代码、废弃 legacy 功能和过时测试，改为引用官方 relay list 网页，并重命名 `invite_link` 为 `join_invite_link`、新增 `show_invite_link`。该 PR 若合并，将降低 DeltaChat 渠道的维护成本并改善配置安全性。

- **QQ 频道多附件支持**：已关闭的 [PR #1349](https://github.com/sipeed/picoclaw/pull/1349) 若已合并，则下一版本将默认支持 QQ 频道的 emoji、语音、图片、视频和文件收发能力。

## 用户反馈摘要

- **配置格式困惑**：用户 @ttghub 在 [#3355](https://github.com/sipeed/picoclaw/issues/3355) 中遇到飞书配置字段无法识别的问题，并主动附上了解决方案，说明用户愿意为项目贡献排查经验，但配置校验提示信息不够友好、旧版配置升级路径不明确是真实痛点。
- **Web 端体验改善**：PR #3347 的作者 @iMilnb 反馈其修复了 Web UI 在大量文本下的卡顿问题，并在桌面端（Brave）和移动端浏览器上完成自测。作者自称并非专业 TS/Node 开发者，说明项目吸引非专业前端背景的贡献者参与，工具链和文档对新手较为友好。

## 待处理积压

以下事项长期未获维护者响应或合并，建议关注：

| 项目 | 类型 | 创建时间 | 说明 |
|------|------|----------|------|
| [#3222](https://github.com/sipeed/picoclaw/pull/3222) | PR | 2026-07-03 | DeltaChat 渠道重构 + 文档改进，减约 200 行代码。已开放两个半月，无评论数据，可能被遗忘。 |
| [#3347](https://github.com/sipeed/picoclaw/pull/3347) | PR | 2026-08-27 | Web UI 性能修复，作者已实测验证。已开放三周，无维护者反馈。 |
| [#3371](https://github.com/sipeed/picoclaw/pull/3371) | PR | 2026-09-08 | 新增 opencode-go provider，涉及模型路由与会话 header。已开放 11 天，无评论。 |
| [#3355](https://github.com/sipeed/picoclaw/issues/3355) | Issue | 2026-09-01 | 飞书配置报错（已附解决方案），已标记 stale，若维护者不介入可能被自动关闭，但问题本身尚未修复。 |

以上积压事项集中在「功能增强」「渠道重构」「性能修复」三类，建议维护者在近期统一评审处理，以保持社区贡献者的积极性。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-19

## 1. 今日速览

过去24小时项目保持中等偏上活跃度：4条Issue更新（全部仍开放）、5条PR待合并（其中3条为昨日新提交），无新版本发布。当前社区焦点高度集中在会话归档目录无界增长问题上——[#3716](https://github.com/nanocoai/nanoclaw/issues/3716) 被指认为生产环境OOM崩溃循环的直接原因，[#3735](https://github.com/nanocoai/nanoclaw/issues/3735) 则从长期磁盘占用角度描述同一类问题。新提交的PR集中在Slack令牌轮换（[#3852](https://github.com/nanocoai/nanoclaw/pull/3852)）与Codex传输协议可配置化（[#3851](https://github.com/nanocoai/nanoclaw/pull/3851)、[#3850](https://github.com/nanocoai/nanoclaw/pull/3850)），表明项目正从功能迭代转向稳定性与运维细节治理。但Issue关闭数为0、PR合并数为0，维护端吞吐偏弱，需留意积压风险。

## 2. 项目进展

今日无合并或关闭的PR。待合并队列共5条，其中3条为昨日新提交，说明贡献者侧活跃，但维护者合并节奏偏慢，目前仍处于"修复已就绪、等待合并"的状态。

值得关注的队列动态：

- **[#3852](https://github.com/nanocoai/nanoclaw/pull/3852)（昨日新提交）**：修复Slack manager token过期问题。Slack应用配置token在生成12小时后必然过期，而NanoClaw当前没有任何轮换机制，导致direct-mode配置在12小时后必然失败。
- **[#3851](https://github.com/nanocoai/nanoclaw/pull/3851) 与 [#3850](https://github.com/nanocoai/nanoclaw/pull/3850)（昨日新提交，同一作者）**：均针对Codex Responses传输在代理环境下的可靠性问题，使传输方式可从Websockets切换为HTTP SSE，涉及agent-runner与providers模块。
- **[#3741](https://github.com/nanocoai/nanoclaw/pull/3741)（开放第12天）**：为定时任务增加 `--fresh-session` 选项，允许任务以无状态方式运行，避免长期会话导致的成本递增。
- **[#3420](https://github.com/nanocoai/nanoclaw/pull/3420)（开放第30天）**：修复macOS状态栏组件硬编码的plist标签与当前slug-aware安装不兼容的问题。

若上述PR全部合并，项目将在运维层面获得实质性增强：Slack集成可用性修复、Codex网络兼容性提升、定时任务成本治理、macOS体验修复。

## 3. 社区热点

**归档生命周期管理是当前最集中的用户诉求。**

- **[#3735](https://github.com/nanocoai/nanoclaw/issues/3735)（评论3条）** 与 **[#3716](https://github.com/nanocoai/nanoclaw/issues/3716)（评论3条）** 是今日讨论最活跃的Issue。两者指向同一根因：`conversations/` 目录下的归档文件只写不删，且每次写入都是完整会话历史的再序列化。其中#3716将这一问题定性为生产环境OOM崩溃循环的直接原因。
- **[#3455](https://github.com/nanocoai/nanoclaw/issues/3455)** 虽评论只有1条，但创建于08-23且被标记为high severity，持续未解决。用户诉求是看门狗机制应在claim与首个SDK事件之间也维持心跳更新，避免误杀合法繁忙的会话后永久阻塞。

底层诉求是：在长时间运行的agent工作负载中，用户需要可预期的资源使用上限和可靠的故障自恢复能力——这已不是功能缺失，而是生产环境的基本要求。

## 4. Bug 与稳定性

按严重程度排序：

| 严重度 | 编号 | 描述 | 状态 |
|--------|------|------|------|
| 高 | [#3716](https://github.com/nanocoai/nanoclaw/issues/3716) | PreCompact每次触发都全量重写会话历史到新文件，无上限/轮换/清理，引发生产OOM崩溃循环 | 开放中，无对应fix PR |
| 高 | [#3455](https://github.com/nanocoai/nanoclaw/issues/3455) | claim-stuck看门狗在claim与首个SDK事件之间无心跳更新，误杀繁忙会话且无自恢复 | 开放中（自08-23），无fix PR |
| 中高 | [#3735](https://github.com/nanocoai/nanoclaw/issues/3735) | `archiveTranscriptFile()`每次压缩都写入归档且无保留策略，目录持续增长 | 开放中，无对应fix PR |
| 中 | [#3714](https://github.com/nanocoai/nanoclaw/issues/3714) | 三个文档化的operator环境变量未从宿主机转发到会话容器，配置无法生效 | 开放中，无fix PR |
| 功能Bug | [#3852](https://github.com/nanocoai/nanoclaw/pull/3852)（修复PR） | Slack app配置token 12小时过期后direct-mode必失败 | 修复PR待合并 |
| 功能Bug | [#3851](https://github.com/nanocoai/nanoclaw/pull/3851) / [#3850](https://github.com/nanocoai/nanoclaw/pull/3850)（修复PR） | Codex Websockets传输在代理后不可靠 | 修复PR待合并 |

值得注意：#3716与#3735高度相关，社区可能期待一个统一的"会话归档生命周期"修复（例如容量上限、轮换机制或总大小配额），但目前还没有对应的fix PR出现。

## 5. 功能请求与路线图信号

- **定时任务无状态运行（[#3741](https://github.com/nanocoai/nanoclaw/pull/3741)）**：作者提供了量化数据——相同任务每晚重读全部历史，成本每周增长15%。该需求有明确ROI且PR实现完整（新增 `--fresh-session` 配置项），有较大概率被纳入下一版本。
- **Codex Responses传输可配置（[#3851](https://github.com/nanocoai/nanoclaw/pull/3851)、[#3850](https://github.com/nanocoai/nanoclaw/pull/3850)）**：这是对已有PR #2672方向的扩展，核心价值是让NanoClaw能在代理受限的企业网络环境中运行，可能被纳入后续路线图。
- **Slack令牌自动轮换（[#3852](https://github.com/nanocoai/nanoclaw/pull/3852)）**：严格说属于修复，但也暴露了一个平台能力缺口——NanoClaw的token管理工具（`tooling.tokens.rotate`）未在Slack技能中被调用。未来可能需要一个通用的token轮换框架，而非仅修补Slack一处。

## 6. 用户反馈摘要

- **@DawoudIO（[#3716](https://github.com/nanocoai/nanoclaw/issues/3716)）**："每个PreCompact钩子触发都会写入一个全新文件，包含整个会话历史的完整再序列化……没有任何旋转、上限或清理。"——明确指向OOM根因，说明大型agent会话在压缩时会话历史规模已达到危险级别。
- **@TO-maschenborn（[#3735](https://github.com/nanocoai/nanoclaw/issues/3735)）**："目录在agent组的整个生命周期内不断增长。在我们的机器群上，这已经达到……"（原文截断）——反映多实例/集群部署场景下磁盘增长是实际痛点。
- **@nilsborg（[#3714](https://github.com/nanocoai/nanoclaw/issues/3714)）**："三个env var在源码中被文档化为operator覆盖项，但没有任何代码将它们从宿主机转发进会话容器，所以只能通过打补丁来设置。"——配置文档与实现不一致让用户感到困惑。
- **@slambert（[#3741](https://github.com/nanocoai/nanoclaw/pull/3741)）**："每晚agent都会重新读取它之前所有晚上说过的话……我的一个任务在一周内增长了15%。"——成本递增问题对定时任务用户非常具体，且随运行时间持续恶化。
- **@DawoudIO（[#3455](https://github.com/nanocoai/nanoclaw/issues/3455)）**："重试会一遍又一遍重复完全相同的失败，且没有自恢复机制。"——对无法自行恢复的故障表达强烈不满。

整体反馈模式：用户正在将NanoClaw用于长时间运行的生产负载，而当前在归档管理、心跳机制、配置透传等方面尚未达到生产级成熟度。

## 7. 待处理积压

- **[#3455](https://github.com/nanocoai/nanoclaw/issues/3455)（高严重度，开放27天）**：claim-stuck看门狗误杀合法会话且无法自恢复。创建至今无维护者回复迹象，无fix PR。这是当前优先级最高的遗留问题。
- **[#3420](https://github.com/nanocoai/nanoclaw/pull/3420)（PR开放30天）**：macOS状态栏slug-aware修复，属于core-team提交且技术方案清晰，但长期未获review或合并。
- **[#3735](https://github.com/nanocoai/nanoclaw/issues/3735)、[#3716](https://github.com/nanocoai/nanoclaw/issues/3716)、[#3714](https://github.com/nanocoai/nanoclaw/issues/3714)**：均为9月初创建、昨日（09-18）有更新但无对应修复PR。社区热度高但维护响应不足，存在用户流失风险。

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报（2026-09-19）

## 1. 今日速览

过去 24 小时，IronClaw 延续了中等活跃度的开发节奏：1 个 Issue 获更新（#7537），2 个 PR 保持开放并更新（#8102、#7456），无 PR 合并，无版本发布。所有动态集中在两条方向线上：**LLM 推理/思考控制**与**部署稳定性/隔离安全**。没有新代码落地，且 #7456 已开放超过 5 周，说明大型变更的评审与合入存在一定滞留；整体处于“积蓄期”，而非快速迭代期。

## 2. 版本发布

无。

## 3. 项目进展

今日无任何 PR 被合并或关闭，项目的主干代码没有新增提交。不过，以下两个开放 PR 正在关键领域推进修复：

- [#8102 fix(extensions): resolve provider-instance readiness live](https://github.com/nearai/ironclaw/pull/8102)：修复通过 Web UI 管理员配置 Google OAuth 客户端时，Gmail/Google Calendar 无法激活的问题。OAuth 完整握手已完成（consent → code → token exchange），但激活步骤会报错。
- [#7456 fix(reborn): make durable storage profile-agnostic](https://github.com/nearai/ironclaw/pull/7456)：将 Reborn 各类持久化数据根目录统一到 `IRONCLAW_REBORN_HOME`，并通过类型化安全信封防止“仅重启 + 切换 profile”的操作削弱租户/工作区隔离。该 PR 被标记为 `size: XL, risk: medium`，由核心贡献者推进，影响范围覆盖沙箱、CI、文档与依赖，是当前最重要的待合入 PR 之一。

若两 PR 合入，将分别提升多租户安全边界强度和扩展服务管理稳定性；但即使今日没有合入，仍属于对项目“稳定性与合规”方向的明确投资。

## 4. 社区热点

- [#7537 [feat(llm)] generic per-request thinking/effort control](https://github.com/nearai/ironclaw/issues/7537)

这是本期唯一产生评论的议题（2 条评论区讨论），也是自 8 月 12 日以来的持续热点。触发场景为 DeepSeek V4 Flash（0731 checkpoint）经 NEAR AI 输出变得冗长，用户无法按请求控制模型的“思考/努力程度”。提案明确要求控制逻辑按“通用请求参数 → 各 Provider 适配器 → 原生参数（含 DeepSeek `chat_template_kwargs`）”解耦。评论数不多，但从更新时间线看该设计讨论仍在被维护者与贡献者推进，而非石沉大海。

## 5. Bug 与稳定性

按严重性排列：

1. **[Reborn 存储 profile 相关隔离弱化风险（高危） — 修复 PR #7456](https://github.com/nearai/ironclaw/pull/7456)**
   PR 描述指出现有存储布局与 profile 强绑定，理论上可能通过“重启 + 切换 profile”影响租户/工作区隔离语义。修复通过根目录重构与类型化安全信封收紧边界。该 PR 已开放 5 周，虽然风险标为 `medium`，但涉及安全语义，建议评审资源倾斜。

2. **[Google OAuth 激活失败（中危） — 修复 PR #8102](https://github.com/nearai/ironclaw/pull/8102)**
   当运营商在 Web UI 中配置 Google OAuth 客户端（而非环境变量）时，Gmail/Google Calendar 激活步骤失败。该问题直接影响通过 UI 完成部署的用户，修复方案为在激活时实时检测 provider 实例就绪状态，并优先采用管理员配置。

两项 Bug 均有对应修复 PR，且均未合入；短期项目风险点主要集中在 #7456 的评审延迟上。

## 6. 功能请求与路线图信号

- **通用 thinking/effort 控制（#7537）**：用户提出了一个通用语义层，要求把“思考级别/努力程度”作为请求级参数下传，并由各 Provider 映射到原生能力。这顺应了行业对“推理成本与输出节奏细粒度控制”的需求，也能缓解模型版本迭代导致的行为漂移问题。该议题已进入设计讨论阶段，**具有纳入下阶段版本路线图的商业与技术双重必要性**；若兼容 OpenAI 风格 `reasoning_effort` 等既有接口，落地阻力会更小。

## 7. 用户反馈摘要

基于 Issue #7537 的可见描述与讨论信号，提炼如下：

- **真实痛点**：DeepSeek V4 Flash（0731 checkpoint）输出明显“变长/变啰嗦”，用户在原部署中没有便捷手段限制其推理深度。
- **使用场景**：开发者通过 NEAR AI 平台调用第三方模型（DeepSeek），模型自身升级或 checkpoint 切换会造成下游输出行为不可控，缺少 lossless 的控制字段。
- **期望形态**：用户希望 API 支持“每请求/每模型默认”的 thinking 级别，而不是全局开关或硬编码；同时对未来新模型能够以“adapter 配置”而非“硬编码分支”方式接入。
- **社区交互**：议题发布超过 1 个月仍获得更新讨论，说明提交者与关注者对该功能的诉求有持续性，值得维护者给出正式设计反馈。

## 8. 待处理积压

- [#7456（PR）使 Reborn 持久化存储 profile-agnostic](https://github.com/nearai/ironclaw/pull/7456)：自 2026-08-10 开放，已超过 5 周，`size: XL` 但由核心贡献者持续跟进。直接从隔离安全角度看，不建议再继续拖延。提醒维护者尽快完成 review、测试计划与 merge 决策。
- [#7537（Issue）通用 thinking/effort 控制](https://github.com/nearai/ironclaw/issues/7537)：自 2026-08-12 开放，约 5 周，已于 9 月 18 日再次更新。虽然当前无 👍 投票，但这是真实用户驱动的需求。建议维护者给出明确定位：是放入短期路线图，还是调整 scope/设计，避免贡献者在沟通真空中失去动力。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-19

## 1. 今日速览

项目整体处于 **高活跃迭代状态**：过去 24 小时共产生 6 条 Issue 更新（其中 1 条为新增，5 条为长期 stale 回温）和 23 条 PR 更新（14 条待合并、9 条已合并/关闭）。新版本发布为 0，但已存在指向 `release/2026.9.18` 的发布分支合并 PR（#2715），说明新一轮版本发布流程正在推进。今日 PR 集中在 openclaw 网关稳定性、Windows 平台兼容性、Cowork 会话增强等方向，多为主动发起的防御性修复，项目健康度良好。需注意的是，5 条 3 月创建的 stale Issue 今日被批量 touch，可能存在维护者对历史问题集中巡检的行为。

---

## 2. 版本发布

**无新版本发布。** 但存在一条已关闭的发布分支 PR：

- [#2715 [CLOSED] Release/2026.9.18](https://github.com/netease-youdao/LobsterAI/pull/2715) — 目标分支为 `release/2026.9.18`，已关闭，可能为发布前分支同步或 release 流程中的 merge 操作。建议关注后续正式 tag 发布。

---

## 3. 项目进展

今日合并/关闭 9 条 PR，主要集中在 **功能增强** 与 **稳定性修复** 双线推进：

**已合并/关闭的功能性 PR：**

- [#2696 feat(cowork): workspace review、inline question dock、Tasks 面板](https://github.com/netease-youdao/LobsterAI/pull/2696) — 合入了 Codex 风格的 Cowork 会话工作区改进，包含四个独立 commit，已在 fork 中验证后 rebase 回主干。
- [#2703 feat: subagent 会话可见性](https://github.com/netease-youdao/LobsterAI/pull/2703) — 增强子代理（subagent）会话的展示与控制能力。
- [#2717 feat: 定时任务微信投递回执](https://github.com/netease-youdao/LobsterAI/pull/2717) — 为 scheduled task 增加微信渠道的投递回执支持。
- [#2718 fix: 微信/QQ 扫码登录渠道路由](https://github.com/netease-youdao/LobsterAI/pull/2718) — 修复多 IM 渠道扫码登录时路由选择错误。

**已合并/关闭的稳定性修复：**

- [#2701 fix(openclaw): 加固启动恢复与飞书密钥路由](https://github.com/netease-youdao/LobsterAI/pull/2701) — 修复 9.18 排查中可复现的启动阻塞与飞书凭据错位问题，含 Windows 网关生命周期改进。
- [#2702 fix: openclaw workspace 配置恢复](https://github.com/netease-youdao/LobsterAI/pull/2702) — 恢复 openclaw workspace 配置的容错能力。

**整体前进幅度：** 从 PR 密度看，项目正在经历一波集中交付，涉及 IM 多通道、Cowork 工作区、openclaw 网关配置与恢复、技能管理等多个模块。虽然今日无版本发布，但大量修复指向 Windows 平台兼容性（#2701、#2706、#2709 等），推测近期存在 Windows 平台用户反馈集中涌入的趋势。

---

## 4. 社区热点

今日最受关注的 Issue 是新增的 **#2654 hooks 配置丢失问题**：

- [#2654 [OPEN] fix(user_plugins): persist hooks field in syncToDisk](https://github.com/netease-youdao/LobsterAI/issues/2654) — 获得 2 条评论。用户报告 Gateway 重启后 hooks 配置丢失，已定位根因：`openclawConfigSync.ts` 的 `getUserPlugins` 未返回 hooks 字段，导致 `syncToDisk` 时被丢弃。作者 @maxbxkj 同时给出了完整的修复方案（三步骤），说明该用户具备一定的代码检索和排查能力，并期望直接推动问题解决。

**PR 侧热点：**

- [#2719 fix(openclaw): 启动时自动修复旧版本数据残留](https://github.com/netease-youdao/LobsterAI/pull/2719) 值得重点关注——这是 OPEN 状态中为数不多由老版本升级导致的启动失败修复，且涵盖 Windows 卸载重装保留 `%APPDATA%` 的场景。升级类修复通常涉及用户基数大、影响面广，社区关注度会比较高。

**热点背后的诉求：** 以上现象共同表明，社区用户对 **升级后数据持久化与配置可靠性** 的需求十分突出。无论是 hooks 丢失还是启动失败，都是升级路径上的摩擦点，建议维护者考虑将升级兼容性验证纳入 CI 常规流程。

---

## 5. Bug 与稳定性

今日 Bug 按严重程度排列如下：

### 🔴 严重（影响核心使用）

| Issue/PR | 描述 | 状态 |
|---|---|---|
| [#2654](https://github.com/netease-youdao/LobsterAI/issues/2654) | Gateway 重启后 user_plugins 的 **hooks 配置丢失**，导致插件行为不一致 | ❌ 无 fix PR，已有明确修复建议 |
| [#1016](https://github.com/netease-youdao/LobsterAI/issues/1016) | 网易员工登录成功后 **登录态未下发**，客户端仍处于未登录状态 | ❌ 无 fix PR（stale） |
| [#2719](https://github.com/netease-youdao/LobsterAI/pull/2719) | 从旧版本升级后 **每次启动均失败**（三处根因） | ✅ 已有 fix PR，OPEN 待合并 |

### 🟡 中等（影响特定环境/平台）

| Issue/PR | 描述 | 状态 |
|---|---|---|
| [#1015](https://github.com/netease-youdao/LobsterAI/issues/1015) | 内网 npm registry 不可访问时 **打包失败** | ❌ 无 fix PR（stale） |
| [#1025](https://github.com/netease-youdao/LobsterAI/issues/1025) | 外部开发者执行 `npm install`/`build` 时因内网 registry 不可达 **卡死 5 分钟** | ❌ 无 fix PR（stale） |
| [#2709](https://github.com/netease-youdao/LobsterAI/pull/2709) | Windows 上安全软件拦截 PowerShell 时 OpenClaw SQLite 私有 staging 目录创建失败 | ✅ 已有 fix PR，OPEN 待合并 |
| [#2706](https://github.com/netease-youdao/LobsterAI/pull/2706) | Windows PowerShell 5.1 下旧版 Skills 备份脚本报错，导致安装器进入失败路径 | ✅ 已有 fix PR，OPEN 待合并 |
| [#2705](https://github.com/netease-youdao/LobsterAI/pull/2705) | 数据迁移备份恢复时因 `persist:` 分区被占用导致 `EBUSY` 回滚 | ✅ 已有 fix PR，OPEN 待合并 |

### 🟢 低（边界场景/代码质量）

| Issue/PR | 描述 | 状态 |
|---|---|---|
| [#1023](https://github.com/netease-youdao/LobsterAI/issues/1023) | 讯飞 API 报 input token limit 97280，疑似引擎 token 上限设置过高（>90000），**建议增加引擎参数自定义设置** | ❌ 无 fix PR（stale） |
| [#2708](https://github.com/netease-youdao/LobsterAI/pull/2708) | 网关重启被延迟时，即使网关已空闲，新建会话仍被拒绝 | ✅ 已有 fix PR，OPEN 待合并 |
| [#2707](https://github.com/netease-youdao/LobsterAI/pull/2707) | 网关在健康后短时间崩溃会触发无限重启（重启预算被过早重置） | ✅ 已有 fix PR，OPEN 待合并 |
| [#2704](https://github.com/netease-youdao/LobsterAI/pull/2704) | macOS 本地运行测试时 `/var` 符号链接导致路径断言失败（仅影响测试） | ✅ 已有 fix PR，OPEN 待合并 |

**稳定性总体判断：** 今日新增的 openclaw 稳定性 PR 数量显著，且都是主动防御型修复（无限重启、并发重启请求、Windows 权限问题），说明维护者正在针对 Windows 平台和网关生命周期做系统性加固。建议将 #2707、#2708、#2709 三个 PR 排期优先合并，以降低网关相关故障的线上暴露面。

---

## 6. 功能请求与路线图信号

今日出现的功能相关信号分两类：**已来自社区新提出**与 **已在 PR 中落地**。

### 社区新提出

- [#1024 [stale] src/main/main.ts 拆分建议](https://github.com/netease-youdao/LobsterAI/issues/1024) — 社区用户 @zwj-cheer 建议将 main.ts 拆分为标准 Electron 分层结构（core/lifecycle、core/security 等），并提供了示例结构。该 Issue 已存在近 6 个月未获响应，说明**当前 main.ts 的维护复杂度已对社区开发者构成实际门槛**。

### 已在 PR 中实现（可视为路线图信号）

| PR | 功能 | 状态 |
|---|---|---|
| [#2716](https://github.com/netease-youdao/LobsterAI/pull/2716) | Cowork 会话新增 **Auto / Max 模型模式**，自动选择模型或强制使用最强模型 | OPEN 待合并 |
| [#2710](https://github.com/netease-youdao/LobsterAI/pull/2710) | 向 OpenClaw 传递 **per-server MCP toolFilter** 与并行工具调用开关 | OPEN 待合并 |
| [#2713](https://github.com/netease-youdao/LobsterAI/pull/2713) | Skills Marketplace 标签 `pill` 上显示 **结果数量** | OPEN 待合并 |
| [#2712](https://github.com/netease-youdao/LobsterAI/pull/2712) | 重复导入已安装 skill 时 **新增二次确认提示** | OPEN 待合并 |
| [#2711](https://github.com/netease-youdao/LobsterAI/pull/2711) | SKILL.md 前端 YAML 非法时 **保留原有 skill 版本号** | OPEN 待合并 |

**路线图判断：** 以上 PR 均来自核心维护者（@alison-xx、@fisherdaddy），且创建于 09-18，是新一轮集中开发的内容。其中 #2716（Auto/Max 模型模式）与 #2710（MCP 工具选择）是 AI 应用用户体验的关键改进，预计大概率进入 **2026.9 月下旬** 版本。#1024 的 main.ts 拆分属于技术债优化，目前没有对应 PR，维护者未表态，但社区诉求明确。

---

## 7. 用户反馈摘要

从今日 Issues 及评论中提炼的用户声音：

- **配置持久化可靠性**（#2654）：用户指出 hooks 配置在重启后丢失，并主动定位到 `getUserPlugins` 未返回 hooks 字段，体现了用户对配置可靠性有较高要求，也侧面说明文档或设计上未明确 hooks 的持久化机制。
- **登录流程断裂**（#1016）：浏览器端显示 Portal 登录成功但客户端未收到 auth token，用户强调“无法正常使用”，该问题存在半年未修复，可能已影响网易内部员工日常使用。
- **构建体验被内网依赖阻塞**（#1025、#1015）：外部贡献者明确指出内网 npm registry 导致构建卡死 5 分钟且无提示，这对开源项目的贡献者体验有负面影响，用户语气中透露出对开源可构建性的期待。
- **维护门槛高**（#1024）：用户坦言“您那边更新太快了我有点跟不上节奏”，core 文件负责过多职责，维护困难。
- **大模型限制暴露**（#1023）：讯飞 API token 上限触发报错，用户建议开放更多引擎参数，说明用户对 fine-tune 模型的灵活性有需求。

总体来说，今日用户反馈以 **稳定性和可维护性** 为核心，未出现新的功能需求亮点，也未见明显的不满情绪爆发。

---

## 8. 待处理积压

### 长期未响应的 Issue（今日被 touch 的 stale 条目）

以下 5 条 Issue 均创建于 2026-03-30，至今已近 6 个月，今日被更新但均未关闭，**无维护者 responded**：

| Issue | 概要 | 影响 |
|---|---|---|
| [#1015](https://github.com/netease-youdao/LobsterAI/issues/1015) | 内网 registry 不可达导致打包失败 | 外部开发者无法构建 |
| [#1016](https://github.com/netease-youdao/LobsterAI/issues/1016) | 网易员工登录态未下发 | 内部用户登录受阻 |
| [#1023](https://github.com/netease-youdao/LobsterAI/issues/1023) | 讯飞 token limit 需自定义 | 受限于模型默认参数 |
| [#1024](https://github.com/netease-youdao/LobsterAI/issues/1024) | main.ts 拆分维护建议 | 社区维护门槛 |
| [#1025](https://github.com/netease-youdao/LobsterAI/issues/1025) | 内网 registry 构建卡死 5 分钟 | 开源贡献者体验受损 |

**特别提醒：** #1015 与 #1025 本质是同一问题（内网 npm registry 依赖），且 #1025 已给出可行缓解方案（脚本增加可达性检查），希望维护者优先处理 #1025 或 #1015，这是当前 **开源社区准入体验** 的最大障碍。

**高风险 PR 积压：** 14 条 OPEN PR 中，@alison-xx 一人提交了 10+ 条，且多为 fix 类，建议维护者尽快 review 合并，避免分支积累过多冲突。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报 — 2026-09-19

## 今日速览

项目过去24小时整体活跃度较低：无新增或关闭的Issue，PR方面仅有1条由Dependabot自动提交的依赖更新（#1275）等待维护者审核，无新版本发布。该依赖更新虽未合并，但表明自动化依赖维护机制运行正常，项目处于一种“稳定但低干预”的日常状态。从项目健康度来看，无Bug反馈、无用户投诉，属于平稳维持期；建议维护者尽快处理积压的PR #1275，以保持依赖库的安全性和新鲜度。

---

## 版本发布

过去24小时内无新版本发布。

---

## 项目进展

过去24小时内无PR被合并或关闭，因此没有直接的功能推进或修复落地。

值得关注的是1条待合并PR：

- **#1275** `[dependencies, javascript] chore(deps): bump smol-toml from 1.7.0 to 1.8.0 in /docs` — 由 Dependabot 自动发起，将文档站点的 `smol-toml` 依赖从 1.7.0 升级到 1.8.0。属于npm_and_yarn组的批量依赖更新之一，涉及文档工具的构建依赖，无破坏性变更预期。  
  🔗 https://github.com/moltis-org/moltis/pull/1275

该PR虽为日常维护性更新，但维护者仍应及时审核，避免依赖版本滞后带来的潜在兼容性与安全问题。

---

## 社区热点

今日唯一活跃项为PR #1275，无评论、无点赞，讨论热度为零。作为Dependabot自动提交的依赖更新，其核心诉求是保持项目依赖的持续更新与安全性，背后反映出项目自动化运维链条的常态化运作，而非社区驱动的功能讨论。

🔗 https://github.com/moltis-org/moltis/pull/1275

---

## Bug 与稳定性

过去24小时内未报告新的Bug、崩溃或回归问题。项目稳定性未受到明显挑战。PR #1275 的 `smol-toml` 版本升级不涉及运行时代码路径（仅影响/docs目录下的构建工具），因此不会引入运行时稳定性风险。

---

## 功能请求与路线图信号

今日无新功能请求。从现有PR看，项目当前的主要动作集中在依赖维护层面，没有指向下一版本新功能的明确信号。建议关注未来几日是否有社区提交的feature request，以捕捉路线图方向的早期信号。

---

## 用户反馈摘要

由于过去24小时内没有新的Issue或PR评论，无法提炼真实的用户反馈。当前处于“零反馈”窗口期，这既可能是用户对现状满意度较高、也可能是社区活跃度较低的表现，建议结合更长周期的数据进一步判断。

---

## 待处理积压

- **PR #1275**（待合并）：`smol-toml` 1.7.0 → 1.8.0 依赖升级，创建于2026-09-18，截至今日仍未合并。该PR由自动化流程提交，维护成本低，建议尽快review并合并，以保持依赖更新节奏。  
  🔗 https://github.com/moltis-org/moltis/pull/1275

---

**总结**：Moltis 项目今日处于低活跃度的稳定期，无功能推进、无Bug报告、无社区讨论。唯一行动项是依赖更新PR #1275，建议维护者及时处理，保持依赖生态的健康度。整体项目健康度评估为“平稳”，无需紧急干预。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-19

## 1. 今日速览

过去24小时项目活跃度极高，共产生 15 条 Issue 更新、50 条 PR 更新，并发布了 v2.2.2-beta.1 新版本。核心方向集中在滚动上下文（Scroll）的边界场景修复（#7836 相关 PR #7872）及多轮安全防护增强（#7859 提示注入、#7850 驱动卡并发丢失）。值得关注的是，社区对 QwenPaw Hub 多租户版的诉求讨论已达 30 条评论，同时有多个 Bug 已附带修复 PR 进入审查阶段。总体看，项目处于高吞吐的迭代周期，但仍有若干长期开放的 PR（如 #6381、#7211）等待维护者推进。

---

## 2. 版本发布

### v2.2.2-beta.1
- **发布时间**：2026-09-19（依据 release 数据）
- **主要更新**：
  - `feat(console)`: 改进分组聊天历史展示（PR #7665）
  - `feat(memory)`: 统一 ReMe 斜杠命令（PR #7444）
  - `chore`: 版本号升级至 2.2.2b1
- **破坏性变更**：无明确说明。
- **迁移注意事项**：涉及记忆相关斜杠命令的统一，若用户自建了基于旧命令的自动化流程，建议查看 [ReMe 命令文档](https://github.com/agentscope-ai/QwenPaw/pull/7444) 进行适配。

**链接**：[Release v2.2.2-beta.1](https://github.com/agentscope-ai/QwenPaw/releases)

---

## 3. 项目进展

今日共关闭/合并 19 条 PR，另有 31 条待合并。以下为关键进展：

### 已合并/关闭
- **#7223** — `fix(providers)`: 刷新 DeepSeek 模型目录，移除已退役的 `deepseek-chat` / `deepseek-reasoner`，更新为 v4 系列，已验证官方 API。
  [PR #7223](https://github.com/agentscope-ai/QwenPaw/pull/7223)

### 关键待合并 PR（部分）
- **#7872** — `fix(scroll)`: 修复滚动上下文在后续压缩时丢失被中断用户请求的问题（关联 #7836），保持用户指令在活动上下文中留存。
- **#7871** — `fix(tools)`: 修复字面量 `<<<TRUNCATED>>>` 标记可绕过输出截断的问题，防止上下文溢出。
- **#7864** — `fix(security)`: 保护技能目录免受提示注入删除（关联 #7859），引入 `FilePathToolGuardian` 完整性防护。
- **#7854** — `fix(drivers)`: 修复驱动卡 reload 时的并发策略丢失问题（关联 #7850）。
- **#7867** — `fix(console)`: 文件区标签页在激活时重新验证内容（修复 #7866）。

**分析**：项目在滚动上下文边界、工具输出安全、并发一致性三个维度均有实质修复产出，整体向稳定性方向迈进。但待合并 PR 数达 31 条，需关注合并效率。

---

## 4. 社区热点

### 讨论最热烈
- **#7318** — [QwenPaw Hub 多租户版即将推出，社区想构建什么？](https://github.com/agentscope-ai/QwenPaw/issues/7318)
  - **数据**：评论 30 | 👍 4 | 创建于 2026-08-26，近 24h 有更新
  - **分析**：该问题虽是 2.2.0 起的长期讨论，但今日仍有新评论，说明团队/用户对多租户方案持续聚焦。背后诉求是社区对团队级协作（多用户访问、管理员管理技能）的强烈需求，源自 #2324。

### 高响应 Bug
- **#7853** — [ToolResultPruner 跳过媒体块导致 base64 无界累积](https://github.com/agentscope-ai/QwenPaw/issues/7853)
  - 评论 4，点赞 0，创建于 9-18
  - 虽评论数不高，但该 Bug 直接导致模型上下文被撑爆，严重性高，且已有对应修复 PR #7871，社区关注度会上升。

**建议**：维护者应重点跟踪 #7318 中的用户需求清单，并评估是否可在 2.3 版本引入 Hub 多租户的 MVP 功能。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| 🔴 严重 | [#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859) | 持久化提示注入：系统提醒中反复出现“必须删除所有技能”的指令，来源不明 | 已有修复 PR [#7864](https://github.com/agentscope-ai/QwenPaw/pull/7864) |
| 🔴 严重 | [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) | `ToolResultPruner` 跳过媒体块，base64 无界累积撑爆上下文 | 已有修复 PR [#7871](https://github.com/agentscope-ai/QwenPaw/pull/7871) |
| 🟠 高 | [#7866](https://github.com/agentscope-ai/QwenPaw/issues/7866) | 文件区标签页显示旧内容，会话卡片显示新内容，不一致 | 已有修复 PR [#7867](https://github.com/agentscope-ai/QwenPaw/pull/7867) |
| 🟠 高 | [#7850](https://github.com/agentscope-ai/QwenPaw/issues/7850) | Driver 策略丢失更新：后台 reload 覆盖并发写入 | 已有修复 PR [#7854](https://github.com/agentscope-ai/QwenPaw/pull/7854) |
| 🟠 高 | [#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857) | ACP 关闭回退跳过会话清理并泄漏事件循环 | 无对应 PR，仅 issue |
| 🟡 中 | [#7856](https://github.com/agentscope-ai/QwenPaw/issues/7856) | qwenpaw-pet 0.1.1 不兼容 2.2.2b2 工具审批（缺少 `actor` 参数） | 无 PR，可联系插件作者 |
| 🟡 中 | [#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836) | 滚动淘汰丢失工具密集段中的用户请求 | 已有修复 PR [#7872](https://github.com/agentscope-ai/QwenPaw/pull/7872) |
| 🟡 中 | [#7599](https://github.com/agentscope-ai/QwenPaw/issues/7599) | OpenCode Go 模型连接报 `MissingSessionID`（400） | 已有修复 PR [#7869](https://github.com/agentscope-ai/QwenPaw/pull/7869) |
| ⚪ 已关闭 | [#7838](https://github.com/agentscope-ai/QwenPaw/issues/7838) | 无 sandbox 时 `recall_history_python` 静默未注册 | 已关闭，修复 PR [#7873](https://github.com/agentscope-ai/QwenPaw/pull/7873) 正在解释该限制 |
| ⚪ 已关闭 | [#7837](https://github.com/agentscope-ai/QwenPaw/issues/7837) | 用户行无标题导致滚动索引需调用模型标注 | 已关闭（可能由 #7873 说明或相关 PR 解决） |
| ⚪ 已关闭 | [#7812](https://github.com/agentscope-ai/QwenPaw/issues/7812) | 桌面启动后斜杠命令作用于错误的会话 | 已关闭（可能已修复） |
| ⚪ 已关闭 | [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) | 飞书流式卡片思考过程自动折叠 | 已关闭，用户已验证本地修改方案 |

---

## 6. 功能请求与路线图信号

### 社区明确提出的新需求
- **#7318** — QwenPaw Hub 多租户版：用户期待多用户访问、管理员管理技能、团队协作能力。目前该 issue 有 30 条评论，是最大的路线图信号。
- **#7733** — Agent 自主上下文管理：允许 agent 在上下文淘汰前收到警告并参与决策，避免无感压缩导致工作丢失。该需求与滚动上下文策略相关，可能在后续版本中作为增强项。

### 可能被纳入下一版本的 PR（基于讨论度与问题相关性）
- **#7873** — 解释高级 recall sandbox 限制，属于用户教育型修复，适合随小版本发布。
- **#7842** — 插件同步钩子隔离与事件循环延迟看门狗，提升插件稳定性，可能是 2.2.2 stable 的一部分。

---

## 7. 用户反馈摘要

- **上下文管理痛点**：在 #7853 中，用户反映 `view_image` 的 base64 载荷无界累积，即使配置了裁剪也无法拦截，导致后续请求必然超窗。该抱怨直接暴露了 `ToolResultPruner` 的设计盲区，并引发了对媒体块处理的讨论。
- **安全信任危机**：#7859 的提问注入（提示删除所有技能）引发用户对技能目录安全的担忧。用户称“来源不在本地磁盘”，暗示可能来自工具结果或外部数据，社区对注入攻击的防护需求迫切。
- **多租户期待**：#7318 中，用户不仅要求多用户访问，还希望有管理员可管理的技能库，并有评论提到团队部署时的配置隔离需求。
- **Windows 稳定性**：#7870 和 #7863 提到 Windows 单元测试失败，涉及哈希验证的资源文件与 Uvicorn 重载导入，这反映 Windows 用户基数不小，相关修复将提升桌面端体验。

---

## 8. 待处理积压

### 长期未合并 PR（按时间排序）
- **#6381** — `perf(drivers)`: 避免阻塞过期的 capabilities，提升请求延迟（创建于 2026-07-23，待合并 2 个月）
  [PR #6381](https://github.com/agentscope-ai/QwenPaw/pull/6381)
- **#6668** — `feat(providers)`: 支持 responses prompt caching（创建于 2026-08-04）
  [PR #6668](https://github.com/agentscope-ai/QwenPaw/pull/6668)
- **#7211** — `fix(runtime)`: 防止注入上下文持久化为可见聊天历史（创建于 2026-08-21，带 `Under Review` 标签）
  [PR #7211](https://github.com/agentscope-ai/QwenPaw/pull/7211)
- **#7409** — `fix(agents)`: 丢弃空的 assistant 文本块（创建于 2026-08-30）
  [PR #7409](https://github.com/agentscope-ai/QwenPaw/pull/7409)

### 长期未关闭 Issue
- **#7599** — OpenCode Go `MissingSessionID` 问题（创建于 2026-09-07，已 12 天，用户持续反馈中，虽已有 PR #7869 但尚未合并）
  [Issue #7599](https://github.com/agentscope-ai/QwenPaw/issues/7599)

**提醒**：#7211 属于安全修复（防止注入上下文持久化），建议优先审查合并；#6381 是性能优化，对高频请求场景收益明显，建议排期。

---

> **健康度总评**：项目活跃度极高，Bug 响应速度快（多个严重 Bug 当天即出修复 PR），社区参与度高。当前主要风险是 31 条待合并 PR 的积压，以及若干安全/稳定性修复等待落地。建议维护者优先处理 #7211 和 #7864 等安全相关 PR，并关注 #7318 的社区诉求以避免大版本方向偏离。

:::
