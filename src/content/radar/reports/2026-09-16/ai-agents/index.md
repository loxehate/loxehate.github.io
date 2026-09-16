---
title: "OpenClaw 生态日报"
published: 2026-09-16
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-16

> Issues: 98 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-16 00:00 UTC

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

# OpenClaw 项目动态日报 — 2026-09-16

## 1. 今日速览

过去 24 小时项目活跃度极高：共产生 98 条 Issue 更新（其中 70 条新开/活跃）和 500 条 PR 更新（355 条待合并），Issue 关闭率约 29%（28/98），PR 合并/关闭率约 29%（145/500），整体呈"高流入、高处理"的密集开发态势。新开 Issue 中 P0/P1 级问题集中在消息丢失（message-loss）、会话状态（session-state）与崩溃循环（crash-loop）三类，反映 2026.9.x 系列在并发会话管理、Gateway 生命周期和异步任务处理上存在系统性回归压力。无新版本发布，项目正处 2026.9.4 与下一个版本之间的修复密集期。

---

## 2. 版本发布

今日无新版本发布。当前主线版本为 2026.9.4（`3a9d69d`），多个 Issue 与 PR 围绕该版本与 2026.9.1–2026.9.3 之间的行为差异展开，表明社区正处于对 9 月系列版本的集中验证与缺陷反馈周期。

---

## 3. 项目进展

今日合并/关闭的 PR 中，以下方向有实质推进：

**会话与消息可靠性**
- [#149529](https://github.com/openclaw/openclaw/pull/149529) 修复会话历史隐私保留与当前会话召回问题，涵盖跨代理使用计数、私有历史删除后访问、消息突发时的重复历史加载等问题。
- [#149518](https://github.com/openclaw/openclaw/pull/149518) 修复 #149239——当新会话写入者抢占或 command-lane 重置终止活跃 turn 时，模型回退被错误继续的问题。
- [#149513](https://github.com/openclaw/openclaw/pull/149513) 修复活动页与仪表盘画廊中 `unknown`/`global` 原始键被错误转换为路由段，导致打开错误会话的问题。

**Gateway 与进程生命周期**
- [#149516](https://github.com/openclaw/openclaw/pull/149516) 关闭 #149480，为 Gateway SQLite 只读检查错误补充具体失败操作名称（如数据库路径），提升可诊断性。
- [#149158](https://github.com/openclaw/openclaw/pull/149158) 修复托管 worker 在崩溃与关机场景下丢失嵌套命令清理所有权的问题，保证 worker 槽位在子进程完成前不被释放。
- [#149370](https://github.com/openclaw/openclaw/pull/149370) 修复被拒绝的排队 handoff 消息在恢复流程中被重新发送的问题。

**性能优化（社区高频关注方向）**
- [#149404](https://github.com/openclaw/openclaw/pull/149404) 加速冷会话存储的搜索：角色过滤搜索复用数据库设置与权限检查。
- [#149528](https://github.com/openclaw/openclaw/pull/149528) 模型目录请求通过 provider 别名解析减少插件清单重复扫描。
- [#149478](https://github.com/openclaw/openclaw/pull/149478) SQLite upsert 复用已插入值，减少会话写入的数据传输量。
- [#149511](https://github.com/openclaw/openclaw/pull/149511) 降低共享状态数据库复用时的 schema 写入与防御性模式切换开销。
- [#149526](https://github.com/openclaw/openclaw/pull/149526) 大型会话存储的任务维护不再深拷贝全部元数据行。

**工具与插件生态**
- [#146503](https://github.com/openclaw/openclaw/pull/146503) 修复 Codex 心跳运行在显式启用工具但缺少运行时触发器时无法调用 `heartbeat_respond` 的问题。
- [#149477](https://github.com/openclaw/openclaw/pull/149477) 恢复 PR 别名包装器委托的 9 个 CI 测试覆盖。

整体上，项目正在持续修复 2026.9.x 系列引入的会话并发与消息丢失类回归，同时并行推进冷存储与模型目录的性能优化，处于"稳定修复 + 性能加固"双线并行的状态。

---

## 4. 社区热点

以下 Issue 讨论热度最高，反映了当前社区最关切的问题：

**#97616 — OpenClaw 泄漏 unreaped hook/tool 子进程，僵尸进程累积导致运行时性能下降**（30 评论，👍 1）
https://github.com/openclaw/openclaw/issues/97616

自 6 月 29 日提出至今仍为 OPEN 状态，是当前社区讨论最集中的问题。用户报告 `openclaw-hooks`、`bash`、`codex` 等子进程在 hook/tool 执行后未被回收，长期运行后累积大量僵尸进程。该 Issue 同时被标记为 P1 与 message-loss/crash-loop 双重影响，说明这是长期运行部署的严重稳定性隐患。

**#119720 — 同步代理持久化与转录维护阻塞 Gateway 事件循环**（20 评论）
https://github.com/openclaw/openclaw/issues/119720

报告 Gateway 在规模部署下被同步持久化操作阻塞，导致整个事件循环停滞。Issue 中维护者与用户持续互动，更新了 #140231、#138984 等部分修复的进展，是一个典型的"已知问题 + 部分修复 + 持续讨论"的活跃线程。

**#139847 — 回复运行期间发送的消息被丢弃："Reply operation has no active tool authority snapshot"**（14 评论）
https://github.com/openclaw/openclaw/issues/139847

2026.9.2 的回归问题，同一会话 key 的回复运行进行中，新到达的聊天消息会直接失败，用户看到通用错误提示。该 Issue 同时关联 #149018 与 #149430，后者报告了 Telegram 上 4-6 倍重复回复的现象，说明此问题在当前版本造成了广泛的消息丢失与重复交付。

社区的集体诉求集中在 **消息可靠性**：消息不能丢、不能重复、不能因并发操作被吞。三个热点 Issue 均指向同一主题。

---

## 5. Bug 与稳定性

### P0 级（严重崩溃/安全/阻断发布）

| Issue | 问题 | 有无 fix PR |
|---|---|---|
| [#148866](https://github.com/openclaw/openclaw/issues/148866) | Gateway 在 `gateway.bind=lan` 配置下永久重启循环（2026.9.1 + 2026.9.4，Ubuntu/systemd） | 已关闭，未显示关联 PR |
| [#149106](https://github.com/openclaw/openclaw/issues/149106) | Windows 11 / 2026.9.1 上 Gateway 进程冻结约 31 分钟后自行恢复 | 无 |
| [#149382](https://github.com/openclaw/openclaw/issues/149382) | 2026.9.3→2026.9.4 更新失败：global-install-failed | 无 |
| [#146501](https://github.com/openclaw/openclaw/issues/146501) | 每个代理的 `deny: ["group:web"]` 未覆盖 Claude Code 原生 WebSearch/WebFetch，调用落入人工批准而非拒绝（安全边界绕过） | 无 |
| [#139813](https://github.com/openclaw/openclaw/issues/139813) | macOS LaunchDaemon 权限扫描被第三方端点安全软件阻断，导致所有 Gateway 服务激活失败 | 无 |
| [#149019](https://github.com/openclaw/openclaw/issues/149019) | Windows 重启 handoff 日志记录成功但从未执行 `schtasks /Run` | 已关闭，未显示关联 PR |

### P1 级（重要缺陷/回归）

| Issue | 问题 | 有无 fix PR |
|---|---|---|
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步代理持久化阻塞 Gateway 事件循环；已有部分修复 | 无（部分修复已合并） |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 回复运行期间消息被丢弃（2026.9.2 回归） | 无直接 PR，#149018 已关闭 |
| [#149430](https://github.com/openclaw/openclaw/issues/149430) | 模型回退导致同一消息重复发送，Telegram 收到 4-6 次重复回复 | 无 |
| [#149198](https://github.com/openclaw/openclaw/issues/149198) | `stale_lane_task` 过早释放导致长时 cursor-cli cron 失败 | 无 |
| [#148837](https://github.com/openclaw/openclaw/issues/148837) | Codex 配置刷新无法恢复已定格的 systemError 线程 | 无 |
| [#149270](https://github.com/openclaw/openclaw/issues/149270) | code-mode turn 被未决的 tool dispatch 永久卡住，会话准入活锁 | 无 |
| [#148942](https://github.com/openclaw/openclaw/issues/148942) | 出口代理 CA 证书 24 小时有效期在长运行 Gateway 上过期，导致所有代理出口中断 | 无 |
| [#137366](https://github.com/openclaw/openclaw/issues/137366) | `memory_search` 在脏索引时触发全量源对账，CPU 饥饿与超时 | 无 |
| [#148793](https://github.com/openclaw/openclaw/issues/148793) | 频道入口监控器 `start()` 在 `stop()` 后静默 no-op，传输层存活但入口永久死亡 | 无 |
| [#149325](https://github.com/openclaw/openclaw/issues/149325) | 会话重启将丰富的 Telegram 待发送回复替换为通用通知，内容丢失 | 无 |

### P2 级（值得关注）

- [#149312](https://github.com/openclaw/openclaw/issues/149312) SQLite 重排 KNN join 导致内存语义搜索超过 15 秒 deadline（有 repro）
- [#148998](https://github.com/openclaw/openclaw/issues/148998) owned stdio 清理确认可能在进程所有者完成前过期
- [#149394](https://github.com/openclaw/openclaw/issues/149394) `openclaw status` 硬编码 2500ms git 超时，慢硬件上失败
- [#149302](https://github.com/openclaw/openclaw/issues/149302) 运行时从保留槽位选择已禁用的 context-engine 插件
- [#149346](https://github.com/openclaw/openclaw/issues/149346) 异步工具确认导致重复延迟 yield 与虚假 blocker 报告
- [#149383](https://github.com/openclaw/openclaw/issues/149383) Android 节点事件导致高频 `main` 心跳与 Telegram 输入指示器干扰
- [#113622](https://github.com/openclaw/openclaw/issues/113622) 持续 "database is locked" SQLite 错误（7 月提出仍未关闭）

### 已修复（今日关闭）

- [#138584](https://github.com/openclaw/openclaw/issues/138584) Web UI chat 被 verified-inference owner gate 100% 阻塞（Windows）
- [#148896](https://github.com/openclaw/openclaw/issues/148896) `triage --run` 仅因 Doctor lint 通过就报告已修复 global-install-failed
- [#149101](https://github.com/openclaw/openclaw/issues/149101) `skills info` 将不可用的替代二进制/OS 标记为已满足
- [#149232](https://github.com/openclaw/openclaw/issues/149232) `doctor --fix` 退出 0 但遗留 145 个数据库在旧 schema，Gateway 13 分钟后启动失败
- [#149255](https://github.com/openclaw/openclaw/issues/149255) 后台图像生成将已完成的 Codex 子项标记为 paused 并丢弃父结果
- [#143381](https://github.com/openclaw/openclaw/issues/143381) 心跳运行永不回收临时 MCP 运行时（孤儿进程累积）

---

## 6. 功能请求与路线图信号

以下功能请求今日获得更新或有较强讨论热度，值得关注：

- **[#7406](https://github.com/openclaw/openclaw/issues/7406) Telegram 话题的人类可读名称**（P2，4 评论，👍 1）：会话下拉列表显示 `agent:main:telegram:group:-123456789:topic:42` 而不是 `Telegram : GroupName : TopicName`。从 2 月提出至今仍为 open，属于 UX 层面的持续诉求。暂无对应 PR，但属于低成本高感知度的改进方向。

- **[#143003](https://github.com/openclaw/openclaw/issues/143003) 允许受信任的 WhatsApp 非所有者用户执行 `/new` 和 `/reset`**（P2，需安全审查）：用户希望在不授予 owner/admin 权限的前提下管理自己的隔离 DM 会话。这反映了多用户部署场景的明确需求，但安全边界讨论仍在进行中。

- **[#149454](https://github.com/openclaw/openclaw/issues/149454) 让 `before_tool_call` 的 `onResolution` 在批准后仍可拒绝调用**（P2，需安全审查）：当前 `requireApproval.onResolution` 返回 `Promise<void> | void`，一旦操作者选择 `allow-once`，插件无法阻止工具执行。这是一个安全增强型功能请求，对应 #46441 的后续。

- **[#45233](https://github.com/openclaw/openclaw/issues/45233) FreeBSD 支持**（P3，👍 4）：3 月提出，社区有持续关注但无实质性推进。从项目当前节奏看短期内不会纳入，但属于潜在扩展方向的信号。

- **[#149480](https://github.com/openclaw/openclaw/issues/149480) SQLite 检查错误应标识失败操作**：已由 [#149516](https://github.com/openclaw/openclaw/pull/149516) 关闭，这是一个从用户反馈到修复的快速闭环案例。

---

## 7. 用户反馈摘要

从今日活跃的 Issue 中可提炼出以下真实痛点与使用场景：

- **消息丢失与重复是最伤信任的问题**（[#139847](https://github.com/openclaw/openclaw/issues/139847)、[#149018](https://github.com/openclaw/openclaw/issues/149018)、[#149430](https://github.com/openclaw/openclaw/issues/149430)）："回复进行中发消息直接失败"，"Telegram 收到 4-6 次相同回复"，"WhatsApp 上有时会收到重复的通用错误"——这些问题发生在生产环境的核心通道上，对用户信心打击极大。

- **长期运行部署被僵尸进程拖垮**（[#97616](https://github.com/openclaw/openclaw/issues/97616)）：用户报告 hook/tool 子进程泄漏导致"runtime degradation"，配合 [#143381](https://github.com/openclaw/openclaw/issues/143381)（心跳 MCP 子进程永不回收）和 [#119720](https://github.com/openclaw/openclaw/issues/119720)（事件循环阻塞），说明长时间运行的 Gateway 在资源管理上仍有显著短板。

- **Windows/macOS 平台体验不稳定**：Windows 用户报告进程冻结 31 分钟（[#149106](https://github.com/openclaw/openclaw/issues/149106)）、重启 handoff 假成功（[#149019](https://github.com/openclaw/openclaw/issues/149019)）；macOS 用户报告 LaunchDaemon 扫描被端点安全拦截（[#139813](https://github.com/openclaw/openclaw/issues/139813)）和 Egress 代理 CA 过期导致出口全断（[#148942](https://github.com/openclaw/openclaw/issues/148942)）。桌面平台的生产级稳定性仍有改进空间。

- **配置生效的确定性不足**：[#149302](https://github.com/openclaw/openclaw/issues/149302) 运行时仍选择已禁用的插件；[#148837](https://github.com/openclaw/openclaw/issues/148837) Codex 配置刷新无法恢复错误线程；[#144877](https://github.com/openclaw/openclaw/issues/144877) 自定义分组不覆盖 CLI 目录位置。用户期望"改了配置就能立即且正确地生效"。

---

## 8. 待处理积压

以下 Issue 长期未获解决或缺少维护者明确回应，建议重点关注：

| Issue | 提出时间 | 状态 | 备注 |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) 子进程泄漏/僵尸累积 | 2026-06-29 | OPEN | 30 评论，当前社区讨论度最高，P1 且无 fix PR |
| [#102961](https://github.com/openclaw/openclaw/issues/102961) `after_tool_call` hook 收到扁平字符串而非结构化 ToolResult | 2026-07-09 | OPEN | P2，插件开发者无法检测 exec/bash 失败，4 评论，👍 1 |
| [#113622](https://github.com/openclaw/openclaw/issues/113622) 持续 `database is locked` 错误 | 2026-07-25 | OPEN | P2，每个会话/cron 启动都出现，2 评论（无维护者回应） |
| [#7406](https://github.com/openclaw/openclaw/issues/7406) Telegram 话题可读名称 | 2026-02-02 | OPEN | P2，👍 1，4 评论，功能请求长期未排期 |
| [#45233](https://github.com/openclaw/openclaw/issues/45233) FreeBSD 支持 | 2026-03-13 | OPEN | P3，👍 4，社区关注但无进展 |
| [#149383](https://github.com/openclaw/openclaw/issues/149383) Android 节点导致高频心跳 | 2026-09-15 | OPEN | 需 live-repro，维护者尚未回应 |
| [#149305](https://github.com/openclaw/openclaw/issues/149305) 终端结果分类依赖观察顺序 | 2026-09-15 | OPEN | P2，需 live-repro，语义正确性问题 |

长期悬而未决的 [#7406](https://github.com/openclaw/openclaw/issues/7406)（Telegram 话题名）和 [#45233](https://github.com/openclaw/openclaw/issues/45233)（FreeBSD）分别代表了 **产品可用性细节** 与 **平台覆盖范围** 两方面的用户期待。而 [#97616](https://github.com/openclaw/openclaw/issues/97616) 与 [#113622](https://github.com/openclaw/openclaw/issues/113622) 则指向 Gateway 长期运行的基础设施健壮性问题，建议维护团队优先分配资源。

---

*本日报基于 openclaw/openclaw GitHub 仓库 2026-09-16 数据生成，数据范围覆盖过去 24 小时的全部 Issue 与 PR 更新。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-09-16**
**分析范围：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw 共 9 个项目**


## 1. 生态全景

当前个人 AI 助手开源生态正处于 **“从功能竞争转向可靠性竞争”** 的关键阶段。各项目普遍面临消息丢失/重复、并发会话状态管理、长时运行资源泄漏（僵尸进程、事件循环阻塞）等生产环境核心挑战，社区对“消息不能丢、不能重复、不能卡死”的诉求已超过对新增功能的渴望。与此同时，**跨智能体互操作（A2A）、多端会话连续性、流式响应默认化、配置系统现代化**成为下一阶段的技术竞争焦点。生态格局上，OpenClaw 以压倒性的社区规模（日 PR 500 条）稳居龙头，Zeroclaw（Rust）、CoPaw、NanoClaw 各自在细分方向建立差异化优势，整体呈现“一超多强、分层竞争”的态势。


## 2. 各项目活跃度对比

| 项目 | Issues 更新（新开/活跃） | PR 更新（待合并/已合并） | 版本发布 | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 98（70） | 500（355/145） | 无（2026.9.4 主线） | ⚠️ 高活跃但 P0/P1 积压多，密集修复期 |
| **NanoBot** | 6（6） | 21（9/12） | ✅ **v0.3.5** | 🟢 健康，发布硬化+功能迭代并行 |
| **Zeroclaw** | 16（16） | 50（41/9） | 无 | 🟡 中等偏高，合并吞吐受限，blocked 项待解阻 |
| **PicoClaw** | 2（2） | 5（3/2） | 无 | 🟡 温和偏低，核心迭代通畅但 bug 积压 |
| **NanoClaw** | 5（2） | 40（19/21） | 无 | 🟢 健康，合并速度快于新 PR 涌入 |
| **IronClaw** | — | — | — | ⚪ 无活动 |
| **LobsterAI** | 3（1） | 20（约 17 合并） | 发布 PR 已合（待正式版） | 🟢 兼容性修复收尾，工程推进良好 |
| **Moltis** | 1（1） | 2（2/0） | 无 | 🟢 平稳迭代，无重大风险 |
| **CoPaw** | 13（5） | 50（25/25） | 无 | 🟢 健康，但 Windows subAgent 严重 bug 未解 |


## 3. OpenClaw 在生态中的定位

**社区规模断层领先**：OpenClaw 单日 500 条 PR 更新、98 条 Issue 更新，是 Zeroclaw/CoPaw 的 10 倍、NanoBot 的 24 倍，构成绝对的生态中心。其 Issue 讨论深度和 PR 覆盖密度（从 Gateway 生命周期到 SQLite 性能优化）显示这是一个拥有完整贡献者梯队的成熟项目。

**技术路线差异**：与 Zeroclaw（Rust 重安全/性能）、PicoClaw（Go 重嵌入式/边缘）、NanoClaw（TypeScript 重 Agent 编排）不同，OpenClaw 采用 TypeScript/Node 技术栈，在**渠道适配广度（Telegram/WhatsApp/微信等）与插件生态丰富度**上领先。其核心优势在于“全渠道统一会话层”的架构设计——一套会话管理逻辑对接所有 IM 渠道，这是多数竞品尚未完全达到的。

**当前短板**：2026.9.x 系列引入的会话并发回归（消息丢失、重复回复、崩溃循环）削弱了用户信任，且 #97616 子进程泄漏问题悬置近 3 个月未修复，反映出**规模增长与稳定性保障之间的失衡**。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息可靠性与防丢失** | OpenClaw、NanoBot、CoPaw | 回复期间新消息被丢弃、重复发送 4-6 次、历史消息回放不完整 |
| **进程生命周期管理** | OpenClaw、Zeroclaw、PicoClaw | 子进程/僵尸进程泄漏、`sync.Once` 失效、worker 槽位释放竞态 |
| **流式输出与实时性** | Zeroclaw、NanoClaw、NanoBot | 默认 `stream_mode: off` 导致体验延迟、WebSocket 空闲重试不可见、流式文本处理优化 |
| **配置系统健壮性** | PicoClaw、LobsterAI、Zeroclaw | 配置静默丢失凭据、同步覆盖 `modelPolicy`、规范化配置代际管理 |
| **移动端/PWA 体验** | NanoBot、CoPaw | PWA 白屏、移动端点击无响应、文件结果在工具折叠区难以发现 |
| **安装/更新流程可靠性** | NanoClaw、LobsterAI、OpenClaw | 无头环境 systemd 误判、更新 cutover 卡死、`doctor --fix` 假成功 |
| **跨智能体互操作（A2A）** | Zeroclaw、OpenClaw、CoPaw | A2A 出站客户端、Hub 多租户模型网关、MCP 工具生态扩展 |
| **安全与认证加固** | NanoBot、Zeroclaw、NanoClaw | SSRF 防护、OAuth 契约、Mattermost 回调认证、CA 证书过期 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 |
|---|---|---|---|
| **OpenClaw** | 全渠道统一会话 + 插件生态 | 个人/团队生产部署 | TypeScript/Node，Gateway 进程模型 |
| **NanoBot** | “一个 Agent 多处工作”多端会话延续 | 个人开发者/轻量部署 | Python，TUI+WebUI+聊天渠道 |
| **Zeroclaw** | 企业级安全 + A2A 互操作 | 企业/安全敏感场景 | Rust，强类型+安全优先 |
| **PicoClaw** | 嵌入式/边缘 + P2P 网格 | 物联网/边缘计算场景 | Go，轻量网格网络 |
| **NanoClaw** | Agent 间可靠编排 + 更新体验 | 开发者/进阶用户 | TypeScript，容器化 + Slack bridge |
| **LobsterAI** | 桌面客户端（OpenClaw 封装） | 终端用户/网易生态 | Electron/TypeScript |
| **Moltis** | 多模型前端 + 自定义端点 | 开发者工具用户 | 未明确（构建优化为主） |
| **CoPaw** | 团队 Hub 多租户 + 模型网关 | 团队/企业 | TypeScript/React，Hub 架构 |
| **IronClaw** | — | — | 无活动 |


## 6. 社区热度与成熟度

**第一梯队（快速迭代期）**：**OpenClaw**——规模最大、迭代最快，但处于“修复密集期”，稳定性是当前主题。**NanoClaw**——高输出高合并，Agent 编排方向创新活跃（durable handoff、tone contract）。**CoPaw**——Hub 多租户方向明确，社区讨论热烈（#7318 达 27 评论），首次贡献者活跃。

**第二梯队（质量巩固期）**：**NanoBot**——v0.3.5 发布标志从功能迭代转向发布硬化，渠道安全与移动端体验并行推进。**Zeroclaw**——A2A 落地是里程碑，但 41 个待合并 PR 积压说明审查瓶颈；RUSTSEC 安全公告长期 blocked 是声誉风险。**LobsterAI**——OpenClaw 升级兼容性修复近收尾，但广告关闭 PR 等待近 2 个月，社区诉求响应偏慢。

**第三梯队（平稳维护期）**：**PicoClaw**——核心功能迭代正常但社区反馈响应滞后（两条高危 bug 一周无人问津）。**Moltis**——工程改进持续，功能迭代放缓，长期 feature request 无排期。

**观察**：处于快速迭代期的项目均面临“**社区增长快于维护容量**”的共性挑战（OpenClaw 的 P0 积压、Zeroclaw 的 PR 审查瓶颈、CoPaw 的 Windows 严重 bug 未响应）；而处于巩固期的项目则在“**社区需求响应速度**”上暴露短板。


## 7. 值得关注的趋势信号

**① 消息可靠性成为生命线**：多个项目（OpenClaw、NanoBot、CoPaw）的社区热点均指向消息丢失/重复问题。对开发者而言，**将“消息至少一次 + 幂等去重 + 状态可恢复”作为架构设计的第一原则**，而非事后修补，是当前最重要的经验教训。

**② 跨智能体互操作从概念走向落地**：Zeroclaw A2A 出站客户端落地、CoPaw Hub 模型网关、NanoClaw durable handoff——三个不同架构的项目在同一天推进“智能体间可靠通信”，标志 A2A 协议的工程化尝试已全面展开。开发者应关注 A2A v1.0 线模型的演进。

**③ 多端会话连续性成为标配**：NanoBot v0.3.5 明确将“浏览器/终端/聊天 App 间会话延续”作为版本核心；OpenClaw 的多渠道统一会话层早已是默认能力。**用户不再接受“换一个入口就丢失上下文”**，跨端状态同步（含 session storage、历史召回、记忆共享）是基础能力而非加分项。

**④ 配置系统“现代化”需求集体爆发**：PicoClaw 配置静默丢凭据、LobsterAI 配置同步覆盖策略、Zeroclaw 配置代际管理、OpenClaw 的 doctor 假成功——四个项目的配置相关 bug 指向同一结论：**YAML/TOML 文件的读写一致性、schema 演进、live-apply 可观测性**是规模化部署的隐性瓶颈。

**⑤ 安装/更新流程的“假成功”比报错更危险**：NanoClaw 的事务报告成功但回滚指向 symlink、LobsterAI 的 doctor 退出 0 但遗留 145 个数据库旧 schema、OpenClaw 的 triage 仅凭 lint 通过就宣称修复——**“成功但没有真正生效”的问题正在侵蚀用户对升级机制的信任**。具备验证闭环（升级后健康检查 + 可回滚快照）的更新系统是差异化竞争点。

**⑥ 平台分发与“零门槛”竞争加剧**：NanoBot 将 TUI 打入平台 wheel（无需 GitHub 下载/Bun）、CoPaw 推进自定义邮件服务器 UI、PicoClaw 引入无需 API key 的搜索 provider——**“安装即用、配置即所见”**正在成为新用户转化的关键。

**⑦ 渠道安全与供应链安全并重**：NanoBot QQ SSRF 防护、NanoClaw Mattermost 回调认证、Zeroclaw rumqttc RUSTSEC ×4——渠道接入的不可信输入处理与依赖供应链审计均成为社区明确关注点，安全不再是企业版专属话题。

**⑧ 移动端/PWA 不再是“次等公民”**：NanoBot 用户将 PWA 当原生 App 用，iOS 顶部 washed-out、点击两次才有响应等细节被细颗粒度报告；CoPaw 用户要求文件结果直接出现在回复区而非折叠区。**移动端体验的打磨程度正在成为用户选择助手的重要考量**。

---

*本报告基于 2026-09-16 各项目 GitHub 仓库公开数据生成，数据窗口为过去 24 小时。*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目日报 2026-09-16

数据来源：GitHub HKUDS/nanobot，统计窗口：过去 24 小时。

---

## 1. 今日速览

过去 24 小时项目活跃度很高：**6 条 Issue 全部为新开/活跃，0 条关闭**；**21 条 PR 中 9 条待合并、12 条已合并/关闭**；同时发布了 **v0.3.5**。v0.3.5 的核心方向是“一个 Agent，多处工作”：把 workbench 带到原生终端，并让对话可在浏览器、终端和聊天 App 之间延续。合入内容集中在 TUI 平台化打包、WebUI 交互优化、Feishu/QQ/Email 渠道安全修复以及流式文本性能优化。Issue 侧则以移动端 WebUI/PWA 体验和 Dream 后台任务失控为主，多数已有对应修复 PR 或正在修复中。整体项目健康度良好，但需关注部分 feature PR 长时间未合并以及冲突积压问题。

---

## 2. 版本发布

### v0.3.5

> “One agent, more places to work. Run `nanobot` for the native terminal client or `nanobot webui` for the browser. Both use the sa…（原说明截断）”

核心变更：

- **终端工作台**：原生终端客户端与浏览器 WebUI 共用同一 Agent，会话可跨浏览器、终端和聊天 App 延续。
- **平台化分发**：PR [#5787](https://github.com/HKUDS/nanobot/pull/5787) 将原生 TUI 打进平台 wheel，受支持的 PyPI 安装无需首次运行从 GitHub 下载，也无需单独安装 Bun。
- **发布准备**：PR [#5785](https://github.com/HKUDS/nanobot/pull/5785) 完成 v0.3.5 版本号设置、source-only fallback 和端到端发布 checklist。

破坏性变更 / 迁移注意：

- 官方发布说明中未列出明确破坏性变更。
- 需留意已合并的 PR [#5783](https://github.com/HKUDS/nanobot/pull/5783)：历史消息中同时包含 `assistant content` 和 `tool_calls` 时，不再剥离 `content`，并移除了旧兼容开关。PR 作者表示当前 provider schema 允许两者同时回放（含 Mistral）。升级后需观察各 provider 对历史消息的兼容性。

---

## 3. 项目进展

过去 24 小时共有 **12 条 PR 已合并/关闭**（展示的 20 条中为 11 条，另有 1 条未在展示列表中）。按主题分类如下：

### 发布与分发
- [#5787](https://github.com/HKUDS/nanobot/pull/5787)：原生 TUI 打入平台 wheel，减少首次运行依赖。
- [#5785](https://github.com/HKUDS/nanobot/pull/5785)：准备 v0.3.5 发布流程。

### WebUI 与交互
- [#5786](https://github.com/HKUDS/nanobot/pull/5786)：分段控件改为滑动指示器动画，支持 reduced-motion。
- [#5757](https://github.com/HKUDS/nanobot/pull/5757)：修复 `search_sessions` 和 `read_session` 搜索长对话时静默丢失旧消息的问题。

### Provider / 渠道兼容
- [#5783](https://github.com/HKUDS/nanobot/pull/5783)：保留同时含 `tool_calls` 的 assistant `content`，修复历史消息回放不完整。
- [#5768](https://github.com/HKUDS/nanobot/pull/5768)：飞书 QR 登录改为 `/page/cli` 验证 URL，解决“Link expired”问题。
- [#5697](https://github.com/HKUDS/nanobot/pull/5697)：QQ 附件下载增加 SSRF 防护，校验 URL、禁止重定向、仅接受 HTTP 200。

### 安全加固
- [#5778](https://github.com/HKUDS/nanobot/pull/5778)：Email 发送者验证要求显式配置接收服务，并结构化解析认证结果。
- [#5697](https://github.com/HKUDS/nanobot/pull/5697)：QQ 渠道不受信任附件 URL 的安全加固。

### 工具与内存恢复
- [#5774](https://github.com/HKUDS/nanobot/pull/5774)：Memory archive 请求意外触发 tool call 时，返回非执行结果并重试一次，提升恢复能力。
- [#5775](https://github.com/HKUDS/nanobot/pull/5775)：`read_file` 去重逻辑限定在当前模型上下文中，避免 context compaction 后返回过期 stub。

### 性能
- [#5728](https://github.com/HKUDS/nanobot/pull/5728)：减少流式文本处理中的重复标签扫描，并降低经典 CLI 对完整 Markdown 的重复解析/重绘开销。

整体来看，项目正在从“功能迭代”转向“发布硬化”：TUI 进入官方分发渠道、渠道安全补强、WebUI 移动端体验修复同步推进。

---

## 4. 社区热点

> 注：PR 列表未提供评论数，因此热点主要依据 Issue 评论数、提交密度和关联 PR 判断。

- **[#5781 Dream 任务循环 1–2 小时](https://github.com/HKUDS/nanobot/issues/5781)**：评论数最多（2 条）。用户报告 Scheduled Dream consolidation 变成 25–111 分钟的 agent loop，最多约 200 次工具调用，反复读取同样的两个文件；`dream.maxIterations` 被标记 deprecated/ignored，全局 200 次上限接管。背后诉求是：**Dream 任务应有独立且生效的迭代上限**，避免后台资源被空转任务耗尽。

- **[#5784 QQ 渠道自动压缩通知无法折叠](https://github.com/HKUDS/nanobot/issues/5784)**：1 条评论。用户自托管 QQ 频道，自动 compaction 的 “Compressing context… / Context compacted.” 以普通聊天消息形式发送，造成噪音，且无法折叠。用户明确将其归类为“与 #5719 同类噪音”。对应 PR [#5780](https://github.com/HKUDS/nanobot/pull/5780) 已提出：**让自动 compaction 通知不可见，但 `/compact` 手动命令保留通知**。

- **WebUI 移动端/PWA 反馈集中爆发**：用户 @morandot 连续提交 4 个 Issue（[#5770](https://github.com/HKUDS/nanobot/issues/5770)、[#5771](https://github.com/HKUDS/nanobot/issues/5771)、[#5772](https://github.com/HKUDS/nanobot/issues/5772)、[#5773](https://github.com/HKUDS/nanobot/issues/5773)），覆盖 PWA 白屏、iOS 顶部 washed-out、移动端会话列表需点两次、侧边栏自动聚焦搜索按钮。这说明移动端/主屏幕入口已经成为真实使用场景，用户对 PWA 首屏体验和触摸交互有较高要求。

---

## 5. Bug 与稳定性

按严重程度排列：

### 高
- **[#5781 Dream 长时间循环空转](https://github.com/HKUDS/nanobot/issues/5781)**：Scheduled Dream consolidation 每次运行 25–111 分钟，最多约 200 次工具调用，反复读同一文件；配置的 `dream.maxIterations` 不生效。已有修复 PR：[#5782](https://github.com/HKUDS/nanobot/pull/5782)，恢复独立的 `agents.defaults.dream.maxIterations`，默认 15 次。

### 中
- **[#5773 PWA 冷启动白屏](https://github.com/HKUDS/nanobot/issues/5773)**：首次打开或应用被驱逐后重启，首帧前长时间白屏；从桌面图标启动比 Safari 打开更慢。暂无直接 fix PR。
- **[#5771 移动端会话列表需点两次才能打开](https://github.com/HKUDS/nanobot/issues/5771)**：首次点击无效果，列表“看起来未响应”。暂无直接 fix PR。
- **[#5770 移动端侧边栏自动聚焦搜索按钮](https://github.com/HKUDS/nanobot/issues/5770)**：打开侧边栏即出现 `Search ⌘K` 白色药丸，触摸设备上不应出现 hover 态。已有 fix PR：[#5777](https://github.com/HKUDS/nanobot/pull/5777)。
- **[#5784 自动压缩通知作为普通消息发送](https://github.com/HKUDS/nanobot/issues/5784)**：QQ 渠道产生消息噪音。已有 fix PR：[#5780](https://github.com/HKUDS/nanobot/pull/5780)。
- **[#5772 iOS PWA 顶部 washed out](https://github.com/HKUDS/nanobot/issues/5772)**：侧边栏 toggle 和右侧控件区域半透明/模糊。暂无直接 fix PR。

### 已合并/关闭的稳定性修复
- [#5775](https://github.com/HKUDS/nanobot/pull/5775)：修复 `read_file` 在 context compaction 后返回过期 stub。
- [#5774](https://github.com/HKUDS/nanobot/pull/5774)：修复 memory archive 请求意外触发 tool call 时无法恢复。
- [#5757](https://github.com/HKUDS/nanobot/pull/5757)：修复长 WebUI 会话历史搜索遗漏旧页消息。
- [#5768](https://github.com/HKUDS/nanobot/pull/5768)：修复飞书 QR 登录“Link expired”。
- [#5697](https://github.com/HKUDS/nanobot/pull/5697)：修复 QQ 附件下载 SSRF 风险。
- [#5778](https://github.com/HKUDS/nanobot/pull/5778)：加固 Email 发送者认证。

### 待合并的稳定性修复
- [#5748](https://github.com/HKUDS/nanobot/pull/5748)：在 batch 边界持久化 partial tool progress，避免进程退出后无法区分已完成结果与未执行结果。
- [#5750](https://github.com/HKUDS/nanobot/pull/5750)：暴露 `ToolInvocationContext`，为工具实现提供稳定的 `tool_call_id`。
- [#5779](https://github.com/HKUDS/nanobot/pull/5779)：序列化并发 session 文件写入，避免交错写入和静默丢失，当前标记 `conflict`。

---

## 6. 功能请求与路线图信号

当前 Issue 以 bug 报告为主，新功能需求更多来自 PR：

- **Provider 生态扩展**：[#5666](https://github.com/HKUDS/nanobot/pull/5666) 由 aimlapi.com 贡献者提交，希望将 aimlapi 作为内置 OpenAI-compatible gateway provider，接入 1000+ 模型。该 PR 已开放 12 天，仍待维护者 review。
- **文件系统工具补全**：[#5626](https://github.com/HKUDS/nanobot/pull/5626) 建议增加 `copy_file` 和 `move_file`，避免模型用 `read_file → write_file` 链式模拟复制/移动。PR 当前标记 `conflict`，需要 rebase。
- **工具开发者 API**：[#5750](https://github.com/HKUDS/nanobot/pull/5750) 提供 per-invocation tool context，使工具实现可拿到 provider `tool_call_id`。属于平台层能力，可能进入下一版本。
- **WebUI 设置体验**：[#5776](https://github.com/HKUDS/nanobot/pull/5776) 为 Settings 中 provider picker 增加搜索/过滤，并把 “Custom provider” 固定在顶部。
- **通知行为调整**：[#5780](https://github.com/HKUDS/nanobot/pull/5780) 提议关闭自动 compaction 通知，保留手动 `/compact` 通知。

路线图信号：v0.3.5 “one agent, more places to work” 明确指向“多端会话连续性”；平台 wheel 分发意味着项目正在降低安装门槛；aimlapi 类外部 provider 合入则说明生态合作也是下一阶段重点之一。

---

## 7. 用户反馈摘要

- **Dream 配置失效引发资源浪费**（[#5781](https://github.com/HKUDS/nanobot/issues/5781)）：用户指出计划任务每次运行 25–111 分钟，最高消耗约 200 次工具调用，且反复读取相同文件；`dream.maxIterations` 被标记 deprecated 后没有任何替代生效入口。这是明显的“配置不 work”类痛点。

- **后台通知噪音影响聊天渠道体验**（[#5784](https://github.com/HKUDS/nanobot/issues/5784)）：用户 self-host 并使用 QQ 渠道，自动压缩的生命周期通知以普通聊天消息形式出现，无法折叠。用户直言“quite annoying”，要求至少提供关闭选项。

- **移动端/PWA 仍缺少细节打磨**（[#5770](https://github.com/HKUDS/nanobot/issues/5770)、[#5771](https://github.com/HKUDS/nanobot/issues/5771)、[#5772](https://github.com/HKUDS/nanobot/issues/5772)、[#5773](https://github.com/HKUDS/nanobot/issues/5773)）：用户使用 iPhone Air / iOS 27，报告主屏入口冷启动白屏、首帧渲染慢于 Safari、会话列表首击无响应、侧边栏自动聚焦搜索按钮、顶部内容半透明。整体反馈指向“用户已把 PWA 当 App 用”，对启动性能和触摸反馈敏感。

---

## 8. 待处理积压

长期开放且需要维护者关注的重要 PR：

- **[#5626 feat(tools): add copy_file and move_file filesystem tools](https://github.com/HKUDS/nanobot/pull/5626)**：开放 15 天，标记 `conflict`。核心文件系统能力补全，建议优先处理冲突并合入。
- **[#5666 feat(providers): add aimlapi.com as an OpenAI-compatible gateway provider](https://github.com/HKUDS/nanobot/pull/5666)**：开放 12 天。外部贡献者提供完整实现，属于生态扩展，建议尽快 review。
- **[#5748 fix(recovery): persist partial tool progress at batch boundaries](https://github.com/HKUDS/nanobot/pull/5748)**：开放 4 天，解决 checkpoint 边界下工具结果丢失问题，可靠性价值较高。
- **[#5750 feat(tools): expose stable per-invocation tool context](https://github.com/HKUDS/nanobot/pull/5750)**：与 #5748 同作者、同期提交，属于工具开发基础设施，建议一起评估。
- **[#5779 fix(tools): serialize concurrent session file writes](https://github.com/HKUDS/nanobot/pull/5779)**：刚提交但已标记 `conflict`，修复 #4798 并发写文件问题，需尽早解决冲突。

Issue 侧暂无超过 24 小时的未响应 bug；但 [#5781](https://github.com/HKUDS/nanobot/issues/5781) 这类高影响后台空转问题应随 [#5782](https://github.com/HKUDS/nanobot/pull/5782) 优先合入。

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报 — 2026-09-16

## 今日速览

过去 24 小时，Zeroclaw 仓库共有 **16 条 Issue 更新**（全部处于活跃状态，无关闭）和 **50 条 PR 更新**（41 条待合并，9 条已合并/关闭），无新版本发布。项目整体活跃度**中等偏高**——PR 提交与更新频繁，但大量 PR 停留在 `needs-author-action` / `needs-maintainer-review` 状态，合并吞吐受限。今日新提交了 5 个 Issue（#10889–#10893），集中指向运行时的**流式响应、转向控制、渠道溯源**等方向，与已接受的 RFC #6971、#7897 形成呼应，路线图信号清晰。安全与依赖项方面，仍有多个 P1 级问题处于 blocked 状态，值得关注。

- 活跃度：⭐⭐⭐⭐（Issue 16 条、PR 50 条更新）
- 合并效率：⭐⭐⭐（9 条关闭/合并，但待合并积压 41 条）
- 健康度：⭐⭐⭐⭐（无新版本、无回归报告；长期 blocked 项尚未解阻）

---

## 版本发布

**无新版本发布。** 当前开发集中在 `master` 分支的 PR 审查与合并阶段，下一个版本可能包含 A2A 出站客户端、Telegram 模型选择器、文档站点 llms.txt 生成等已合并功能。

---

## 项目进展

今日共有 **9 个 PR 关闭/合并**，其中最值得关注的有：

| PR | 内容 | 意义 |
|---|---|---|
| [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) | **feat(a2a): outbound client config, shared wire-model, tools (#9106)** | A2A 出站客户端第一阶段落地：4 个 `a2a_*` 工具 + 共享的 A2A v1.0 Serde 线模型 + 默认关闭的 `[a2a.client]` 配置块。对应 RFC #9106，标志着 ZeroClaw 从"只能被调用"迈向"主动调用外部 A2A 智能体"，是**跨智能体协作的关键一步**。 |
| [#10840](https://github.com/zeroclaw-labs/zeroclaw/pull/10840) | **feat(docs): generate llms.txt and llms-full.txt in the mdBook build** | 为文档站点新增 `llms.txt` / `llms-full.txt` 生成器，利于 LLM 检索文档，属于生态建设的基础设施改进。 |
| [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) | **feat(channels/telegram): add secure model picker** | Telegram 渠道新增**安全模型选择器**：仅从已配置的 provider 别名和合格运行时路由构建，通过现有 `/model <ref>` 命令路由，兼顾安全与可用性。 |
| [#10125](https://github.com/zeroclaw-labs/zeroclaw/pull/10125) | **test(config): isolate process-environment fixtures** | 移除测试中剩余 25 处不安全的进程环境变量修改，替换为依赖注入/子命令覆盖，提升测试隔离性与稳定性。 |
| [#2754](https://github.com/zeroclaw-labs/zeroclaw/pull/2754) | **fix(docker): resolve heredoc chown placement and use quoted EOF** | 修复 Dockerfile 中 `chown` 被误写入 config.toml 的问题（heredoc 位置错误 + EOF 未加引号导致变量展开）。 |

**综合判断**：项目在 **A2A 互操作、渠道功能增强、文档基建、测试工程质量** 四个维度均有实质推进。尤其是 A2A 出站客户端，预计将显著提升 ZeroClaw 在多智能体生态中的互联能力。

---

## 社区热点

### 1. [#9106 RFC: A2A outbound client (A2ATool)](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) — 评论 11 条
- **状态**：accepted，no-stale，risk:high，p2
- **讨论焦点**：A2A 双端支持拆分——服务端已随 v0.8.2 发布，客户端今日通过 #9324 落地。社区关注的是 outbound 工具集与配置的安全性（默认关闭）、共享线模型的版本对齐。
- **诉求**：让 ZeroClaw 智能体能够主动调用外部 A2A 智能体，实现真正的双向协作。

### 2. [#9346 RFC: Define the unified package/capability/config/runtime-state catalog contract](https://github.com/zeroclaw-labs/zeroclaw/issues/9346) — 评论 9 条
- **状态**：accepted，no-stale，risk:high，p2
- **讨论焦点**：产品级统一目录（integrations、built-ins、plugins）的契约定义，涉及 #8908/#8909 的现有实现与后续扩展。
- **诉求**：确保包管理、能力发现、配置查询、运行时状态在架构上收敛为**一个目录入口**，避免重复建设。

### 3. [#5869 security: rumqttc v0.25.1 pins rustls-webpki 0.102.x — RUSTSEC advisory cluster](https://github.com/zeroclaw-labs/zeroclaw/issues/5869) — 评论 5 条
- **状态**：blocked，accepted，p1
- **讨论焦点**：`cargo deny check` 报出 4 个 RUSTSEC 漏洞，全部追溯到 `rumqttc v0.25.1` 这一个传递依赖。TLS 栈其余部分已升级，唯独 MQTT 客户端卡住旧版。
- **诉求**：升级 rumqttc 或替换 MQTT 客户端，解除安全告警。

### 4. [#9464 Anthropic stored-profile OAuth alias contract](https://github.com/zeroclaw-labs/zeroclaw/issues/9464) — 评论 4 条
- **状态**：in-progress，no-stale，p1
- **讨论焦点**：PR #9420 引入的 `auth_mode = "oauth"` 路径的显式契约记录，明确其边界（不引入新协议、新安全层）。
- **诉求**：为 Anthropic OAuth 凭据路由提供确定性行为，便于其他 provider 参考实现。

### 5. [#7497 RFC: OCI-compliant registries for plugin storage and discovery](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) — 评论 4 条
- **状态**：blocked，p3，risk:high
- **讨论焦点**：用 OCI 容器注册表替代 JSON 索引文件，作为 WASM 插件的存储/分发/发现机制，配套 `wasm-pkg-client` + cosign 供应链验证 + 多架构镜像。
- **诉求**：为插件生态提供行业标准的基础设施。

---

## Bug 与稳定性

### P1 级

| Issue | 描述 | 状态 |
|---|---|---|
| [#5869](https://github.com/zeroclaw-labs/zeroclaw/issues/5869) | **rumqttc 传递依赖引发 4 个 RUSTSEC 安全公告**（rustls-webpki/pemfile），阻塞 `cargo deny check` | ⛔ **blocked**，无修复 PR |
| [#8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) | **WhatsApp Web 设备链接被 passkey/SHORTCAKE 门控阻断**，S1 工作流完全阻塞 | ⛔ **blocked**，无修复 PR |
| [#9882](https://github.com/zeroclaw-labs/zeroclaw/issues/9882) | **Image markers 绕过 `run_model_query` 直连缝的内容验证**，仅剥离 audio markers，未走 `prepare_messages_for_provider` 规范化 | 🔄 **in-progress**，相关 PR #10480 可恢复被拒图像，但验证绕过主体仍需修复 |
| [#9802](https://github.com/zeroclaw-labs/zeroclaw/issues/9802) | **紧急停止契约不完整**：需中断 in-flight 工具执行、在网络出口强制 `network-kill` 与 `domain-block` | ⛔ **blocked**，PR #9440 仅落地了第一片 |

### P2 级

| Issue | 描述 | 状态 |
|---|---|---|
| [#10889](https://github.com/zeroclaw-labs/zeroclaw/issues/10889) | **Anthropic provider 在最后一条消息以图像块结尾时丢失滚动缓存断点**——`apply_cache_to_last_message` 仅处理 `Text`/`ToolResult`，`Image`/`ToolUse`/`Thinking` 块被跳过 | ✅ **已有修复 PR**：[#10895](https://github.com/zeroclaw-labs/zeroclaw/pull/10895) 今日提交 |
| [#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166) | **默认 `stream_mode = off` 导致渠道回复整体延迟**，降低交互体验 | ✅ **已接受**，等待实现 |

---

## 功能请求与路线图信号

今日新提交的功能请求与正在推进的特性显示，项目正围绕以下方向演进：

### 1. 运行时转向（steering）管线
- [#10893](https://github.com/zeroclaw-labs/zeroclaw/issues/10893)（今日新开）：**消息在生成中途到达时转向当前 turn**——运行时已有经过测试的 steering 管线但无生产者，渠道路径传 `steering: None`。与已接受的 #6971 契约相关。
- [#10891](https://github.com/zeroclaw-labs/zeroclaw/issues/10891)（今日新开）：**渠道溯源（provenance）穿透运行时准入与转向**——每个模型绑定消息和转向注入需携带自身 provenance，是 #6971 的**第一实现切片**。

### 2. 配置体系现代化
- [#10892](https://github.com/zeroclaw-labs/zeroclaw/issues/10892)（今日新开）：**发布规范化配置代际并跟踪每个目标的 apply 结果**——基于 #7897 建立配置分发账本，为 live-apply 消费者打基础。

### 3. 流式回复默认化
- [#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166)：将默认 `stream_mode` 从 `off` 改为 `partial`，已被 accepted，若进入下个版本将显著改善所有渠道的回复体感。

### 4. WASM 插件能力扩展
- [#8187](https://github.com/zeroclaw-labs/zeroclaw/issues/8187)：**WASI 硬件主机函数（GPIO/SPI/I2C/USB/serial）**，能力门控设计已就绪，p2，no-stale。

**判断**：转向管线 + 渠道溯源 + 配置代际管理这三条线已被接受且今日有新 issue 跟进，**大概率进入下一版本**；流式默认化优先级 p2，实现成本不高，也有望随下个版本落地。

---

## 用户反馈摘要

从今日活跃的 Issue/PR 评论中提炼出以下真实用户声音：

| 来源 | 反馈要点 |
|---|---|
| [#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166) | 用户 @JordanTheJet 指出：**默认 `stream_mode: off` 使得每个渠道都要等完整回合结束后才收到回复**，体验上是"一条延迟消息"而非渐进式输出。这是开箱即用的体验问题，影响所有渠道。 |
| [#8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) | 用户 @JordanTheJet 报告 WhatsApp Web 渠道 **S1 级工作流阻断**：二维码能显示但设备链接永远不完成，原因是 WhatsApp 新引入的 passkey/SHORTCAKE 门控。 |
| [#10893](https://github.com/zeroclaw-labs/zeroclaw/issues/10893) | 用户 @egorchenkov 建议：生成中到达的消息应**流入当前生成而非取消或排队**，这反映真实使用中"边说边改"的交互需求。 |
| [#10889](https://github.com/zeroclaw-labs/zeroclaw/issues/10889) | 用户 @Audacity88 报告 Anthropic 图像消息场景的缓存效率问题：**图像块结尾导致 cache_control 断点丢失**，直接增加 token 成本。 |
| [#10475](https://github.com/zeroclaw-labs/zeroclaw/pull/10475) | 用户 @vikng-dev 反馈 WhatsApp Web 渠道**缺少 Markdown 方言转换**——Telegram/WeChat/email 都转换，唯独 WhatsApp 把 `*星号*` 和链接中括号直接暴露给用户。 |

整体上看，用户对 **交互实时性（流式、转向）** 和 **渠道成熟度（WhatsApp 链接、Markdown 渲染）** 的诉求最为集中，这两块也是当前 PR 的重点覆盖方向。

---

## 待处理积压

### ⛔ 长期 blocked 的 Issue（需要维护者决策或外部依赖推进）

| Issue | 阻塞时间 | 内容 | 建议 |
|---|---|---|---|
| [#5869](https://github.com/zeroclaw-labs/zeroclaw/issues/5869) | 2026-04-18 创建（151 天） | rumqttc 安全漏洞（RUSTSEC ×4），p1 | 尽快决策：升级 rumqttc（需验证 API 兼容性）或切换到替代 MQTT 客户端 |
| [#7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) | 2026-06-11 创建（97 天） | OCI 注册表作为 WASM 插件分发机制，p3 | 低优先级，但若插件生态是重点方向需排期 |
| [#9318](https://github.com/zeroclaw-labs/zeroclaw/issues/9318) | 2026-07-23 创建（55 天） | PostgreSQL session 后端 CI 缺少真实服务容器测试 | 在 #9251 合并后应尽快补充，否则后端质量无保障 |
| [#9802](https://github.com/zeroclaw-labs/zeroclaw/issues/9802) | 2026-08-07 创建（40 天） | 紧急停止契约不完整，p1，risk:high | 安全相关，建议优先排期 |

### 👀 等待维护者审查的 PR（needs-maintainer-review）

| PR | 内容 | 等待时间 |
|---|---|---|
| [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) | fix(runtime): recover from rejected image requests（XL，risk:high） | 2026-08-30 提交，已 17 天 |
| [#9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) | fix(approval): always_ask survives Full autonomy（XL，risk:high） | 2026-08-04 提交，已 43 天，已有 maintainer 刷新 |
| [#10679](https://github.com/zeroclaw-labs/zeroclaw/pull/10679) | feat(tools): add Keenable web search provider（XL，risk:high） | 2026-09-07 提交，已 9 天 |

### ✋ 等待作者响应的 PR（needs-author-action）

| PR | 内容 | 备注 |
|---|---|---|
| [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) | feat(sessions): add persistent session prompt attachments（XL） | 功能型大 PR，涉及 SQLite 存储 + 3 个新工具 |
| [#10504](https://github.com/zeroclaw-labs/zeroclaw/pull/10504) | refactor(turn): typed stop taxonomy for turn-path aborts | 架构重构，risk:high |
| [#10233](https://github.com/zeroclaw-labs/zeroclaw/pull/10233) | feat(sop): add collision-checked atomic SOP rename flow | SOP 作者能力的最后一块拼图 |
| [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) | feat(runtime): expose token accounting on history-trim events | 大型 PR（XL），涉及多模块 |
| [#10475](https://github.com/zeroclaw-labs/zeroclaw/pull/10475) | feat(whatsapp): render outbound Markdown in WhatsApp's dialect | 用户呼声高，L 大小 |

**积压风险提示**：41 个待合并 PR 中，相当比例处于 `needs-author-action`（等待贡献者回应）或 `needs-maintainer-review`（等待维护者审查）状态。其中多个 XL 级 PR（#10407、#10504、#9713、#10480、#9724）涉及运行时与安全关键路径，建议维护者安排专项审查时间，避免技术债持续累积。

---

*报告生成时间：2026-09-16 | 数据窗口：过去 24 小时 | 数据源：github.com/zeroclaw-labs/zeroclaw*

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目日报 — 2026-09-16

## 今日速览

过去 24 小时 PicoClaw 的活跃度处于**温和偏低**水平：共有 2 条 Issue 更新（全部为待响应的 stale 旧 Issue）和 5 条 PR 更新（3 条 open 均 stale，2 条 closed 分别合并/关闭）。**无新版本发布**。值得关注的是：两条陈旧 Bug 报告（敏感数据缓存并发竞态、多 API 密钥静默丢失）已持续一周未获维护者响应；但网格（mesh）可观测性 PR #3380 在创建当天即被合并，显示**核心功能迭代通道保持通畅**。整体来看，项目在合并效率和功能推进上表现正常，但社区反馈的积压问题正在累积，需要维护者优先介入。

- 新版本发布：0 个
- Issues 更新：2（新开/活跃 2，关闭 0）
- PR 更新：5（待合并 3，已合并/关闭 2）

---

## 项目进展

> 今日合并/关闭的 PR 有 2 个，分别强化了通道稳定性配置与网格可观测性，属于**稳定性增强和可观测性建设**方向。

**已合并/关闭 PR（2 个）：**

- [**#3380** — `feat(mesh): observability — peer conns/score/bandwidth, activity feed, SSE events (Track 63)`](https://github.com/sipeed/picoclaw/pull/3380)
  由 @stpinkie 提交，创建于 09-15，**当天即关闭**。
  **关键内容**：`PeerStatus` 新增 `conns[]`（远程 multiaddr、方向、传输类型、流数、连接时间）和 `latency_ms`、`score`、`last_seen` 字段；引入 `libp2p.BandwidthReporter` 接入带宽统计；增加了活动流（activity feed）和 SSE 事件推送。这是对 P2P 网络层可观测性的重要补全，让运维方和上层应用能实时掌握节点间连接质量与带宽状况。
  **意义**：为 mesh 网络的健康监测、故障定位和带宽治理提供了数据基础，属于**基础设施级改进**。

- [**#1780** — `[type: enhancement, domain: channel, domain: config, go] Qq connection stability`](https://github.com/sipeed/picoclaw/pull/1780)
  由 @xiang33 提交，创建于 03-19，历经近半年后于今日关闭。
  **关键内容**：将 QQ 通道的稳定性参数（重连间隔、重试次数、速率限制）全部暴露为可配置项，支持通过配置文件或环境变量定制，且保持完全向后兼容。
  **意义**：解决了 QQ 通道在弱网或高频消息场景下因固定参数导致的连接漂移/断连问题，是**通道稳定性层面的重要增强**。

---

## 社区热点

> 今日讨论量整体较低（仅有的两个 Issue 各有 1 条评论），但讨论焦点集中在**配置安全与数据完整性**上，诉求非常具体且与用户直接相关。

- [**#3373** `[BUG] SaveConfig silently deletes every api_key after the first and leaves a dangling fallback`](https://github.com/sipeed/picoclaw/issues/3373) — 评论 1，👍 0
  该 Issue 揭示了 **LoadConfig → SaveConfig 往返会静默丢弃 model_list 中单个条目的第二个及以后的 api_key**，同时残留一个指向不存在模型的 `fallbacks` 引用。评论区关注的本质是 `config` 序列化/反序列化的幂等性，以及**用户凭据的静默丢失**——这直接影响生产环境中配置管理工具链的可靠性。

- [**#3374** `[BUG] Data race in Config.initSensitiveCache can return a nil replacer and panic FilterSensitiveData`](https://github.com/sipeed/picoclaw/issues/3374) — 评论 1，👍 0
  该 Issue 报告了 `Config.sensitiveCache` 的懒加载存在**数据竞争**，多 goroutine 并发初始化时可能各自创建独立的缓存实例，导致敏感数据过滤器返回 nil `*strings.Replacer` 并触发 panic。并发场景下，这会让任何调用 `FilterSensitiveData` 的请求路径面临崩溃风险。

**热点简评**：两个 Issue 均指向 **“配置子系统在并发/持久化语义上的缺陷”**，且都由 @sting8k 一人提交并附带了对应的修复 PR。这说明社区用户正在深度使用配置 API，并期望配置读写具备**原子性、并发安全和持久化一致性**。

---

## Bug 与稳定性

> 今日无新增 Bug 报告（两个 Issue 均已存在一周），但现存两个未修复的高危缺陷，按严重程度排序如下：

| 严重程度 | Issue | 问题描述 | 状态 |
|:---:|:---|:---|:---|
| **高（引发崩溃）** | [#3374](https://github.com/sipeed/picoclaw/issues/3374) | `Config.initSensitiveCache` 存在数据竞争，并发初始化可导致敏感数据过滤器返回 **nil replacer 并 panic**；`sync.Once` 因外层无锁判断而失效。 | ⚠️ 有对应修复 PR：[#3375](https://github.com/sipeed/picoclaw/pull/3375)（待合并，stale） |
| **高（静默数据丢失）** | [#3373](https://github.com/sipeed/picoclaw/issues/3373) | `SaveConfig` 在保存多 key 的 `model_list` 条目时，**会丢弃第一个之后的全部 api_key**，并残留指向不存在模型的 `fallbacks`。用户配置文件在无感知情况下被破坏。 | ❌ 暂无修复 PR |

**分析**：两个 Bug 均位于 `pkg/config` 这一核心路径，且分别关系到「运行期并发安全」和「持久化数据完整性」。其中 #3374 的修复 PR #3375 已存在但尚未被合并，且同样进入 stale 状态，建议维护者优先审查并合入。

---

## 功能请求与路线图信号

> 今日没有新开 Issue 提出功能请求，但结合存量 PR 的状态，可以观察到以下**路线图信号**：

| 信号 | 来源 | 说明 | 被纳入下一版本的可能性 |
|:---|:---|:-----|:---:|
| **网格可观测性已落地** | [PR #3380](https://github.com/sipeed/picoclaw/pull/3380)（已合并） | 连接数、分数、带宽、SSE 事件等观测能力已合入主干，预计随下一版本发布。 | ✅ 已确定 |
| **QQ 通道参数化已完成** | [PR #1780](https://github.com/sipeed/picoclaw/pull/1780)（已关闭） | 重连间隔、重试次数、限流全部可配置，向后兼容。 | ✅ 已确定 |
| **反应（reaction）工具可配置化** | [PR #3372](https://github.com/sipeed/picoclaw/pull/3372)（open，stale） | 修复 `reaction` 工具在 `ToolsConfig` 中无专属配置分支，导致无法真正启停的问题。这属于**既有功能的配置完备性补全**，可能随配置子系统修复一并合并。 | 🔶 中等 |
| **新增 Keenable 网页搜索 Provider** | [PR #3370](https://github.com/sipeed/picoclaw/pull/3370)（open，stale） | 以无需 API key 的方式接入 `web_search`，仅需设置 `tools.web.keenable.enabled: true` 即可使用。若合入，将直接**降低新用户体验搜索功能的门槛**。 | 🔶 中等 |

**趋势判断**：近期 PR 的分布集中在「工具链可配置性」「搜索 Provider 扩展」「Mesh 可观测性」三个方向，未出现激进的重构性 PR，项目处于**稳定迭代期**。

---

## 用户反馈摘要

> 基于现有 Issue/PR 摘要及评论，可提炼出以下用户真实反馈：

- **配置数据安全是首要关注点**（来自 [#3373](https://github.com/sipeed/picoclaw/issues/3373)）：用户明确表达了对配置文件在“读取→修改→保存”往返过程中**静默破坏凭据**的强烈不满。摘要中 “This is silent data loss of user credentials” 直接点出了痛点——此类问题会破坏用户对配置管理工具链的基本信任。

- **并发运行环境下稳定性需求明确**（来自 [#3374](https://github.com/sipeed/picoclaw/issues/3374)）：报告者对 data race 的定位非常细致（指出 `sync.Once` 被外层无锁判断所“打败”），表明用户正在多 goroutine 环境中规模化使用 PicoClaw，并对**并发安全**有真实的生产级需求。

- **对通道稳定性参数有定制化诉求**（来自 PR [#1780](https://github.com/sipeed/picoclaw/pull/1780)）：该 PR 由用户在 3 月发起并持续维护近半年，说明 QQ 通道在特定网络环境下的重连策略是社区中的真实痛点，用户希望**自行调节重连频率和限流参数**。

- **搜索功能希望“开箱即用”**（来自 PR [#3370](https://github.com/sipeed/picoclaw/pull/3370)）：外部贡献者（keenable 团队）主动提供无 API key 的搜索接入方案，反映出用户在**降低搜索工具使用门槛**方面存在隐性的持续需求。

---

## 待处理积压

> 目前有 **2 个 Issue 和 3 个 PR** 已进入 stale 状态（超过 7 天无更新），且均未收到维护者回复。全部集中在配置子系统与工具链，建议维护者优先处理。

**优先级 1 — Bug 类（直接影响用户数据/稳定性）**

- [Issue #3373](https://github.com/sipeed/picoclaw/issues/3373)：`SaveConfig` 静默删除多余 api_key | 创建 09-08，stale 7 天，**无 fix PR**
- [Issue #3374](https://github.com/sipeed/picoclaw/issues/3374)：`initSensitiveCache` 数据竞争导致 panic | 创建 09-08，stale 7 天，有 [fix PR #3375](https://github.com/sipeed/picoclaw/pull/3375) 待审查

**优先级 2 — 修复/增强 PR（代码已就绪，待维护者审阅）**

- [PR #3375](https://github.com/sipeed/picoclaw/pull/3375)：为敏感缓存加并发保护（直接修复 #3374），stale 7 天
- [PR #3372](https://github.com/sipeed/picoclaw/pull/3372)：使 reaction 工具可配置化，stale 7 天
- [PR #3370](https://github.com/sipeed/picoclaw/pull/3370)：新增 Keenable 搜索 Provider，stale 8 天

**维护建议**：@sting8k 提交的 2 个 Issue 和 2 个 PR（#3372、#3375）已持续一周零响应。考虑到其中包含“配置数据丢失”和“并发 panic”两个高严重度缺陷，且修复代码均已就绪，**建议维护者在下个迭代周期优先审查并释放这批积压**，以避免社区贡献者流失。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-16

## 今日速览

过去 24 小时 NanoClaw 开发节奏非常活跃：共 5 条 Issue 更新（2 条新开/活跃，3 条已关闭），40 条 PR 更新（19 条待合并，21 条已合并/关闭）。核心维护者（@glifocat、@gavrielc、@zvi-fried）和社区贡献者均有产出。当日合并的 PR 覆盖了 provider 配置体系、跨会话性能优化、Codex 重构和测试稳定性等多个方向，同时新浮现的 updater 卡死问题（#3828）值得重点关注。整体项目健康度良好，合并速度略快于新 PR 涌入速度，积压可控。无新版本发布。

## 项目进展

今日合并/关闭了 21 条 PR，以下为影响较大的关键合并：

- **PR #3813 — Add durable handoff safety and mission control**（[链接](https://github.com/nanocoai/nanoclaw/pull/3813)，@briankobekim）：已关闭。这是近期最大的跨域合入，新增主机持有的持久化 handoff 台账、带指纹的 source/reviewer 合约、append-only 事件和 handoff CLI 资源；在 Slack bridge 层强制结构化 agent 间投递，包括确切的参与者接线、持久化回执、有界 bot 跳数和防环路机制。该 PR 将 agent 间交接从"尽力而为"提升为"可审计、可恢复"的可靠性保障，是渠道/核心层的一次重要加固。
- **PR #3826 — feat(providers): declare default tone settings**（[链接](https://github.com/nanocoai/nanoclaw/pull/3826)，@zvi-fried）：已合并。引入可选的 `configuration.tone: { default, toSettings }` 运行时合约，让 provider 声明默认语气及原生设置映射。Claude 和 Codex 后续均可复用该机制，为多 provider 统一交互风格奠定基础。
- **PR #3827 — refactor(codex): use the provider tone contract**（[链接](https://github.com/nanocoai/nanoclaw/pull/3827)，@zvi-fried）：已合并。Codex 的 `friendly` 默认值和 `personality` 设置映射改用上述 tone 合约，是对 #3826 的直接承接和落地。
- **PR #3829 — perf(cross-session-context): bound echo fan to the hot set, off the wake path**（[链接](https://github.com/nanocoai/nanoclaw/pull/3829)，@gavrielc）：已合并。将跨会话 echo fan 从消息关键路径上移出并限定在 hot set 内，唤醒延迟不再随兄弟会话数量线性增长。对大量并行会话部署有明显收益。
- **PR #3830 — test(webhook): allocate free ports from the kernel instead of picking them at random**（[链接](https://github.com/nanocoai/nanoclaw/pull/3830)，@gavrielc）：已合并。修复 webhook 端口测试因随机端口冲突导致的 `EADDRINUSE` flake，改用内核分配空闲端口。测试基础设施变得更可靠。
- **PR #3822 — Ignore .worktrees/**（[链接](https://github.com/nanocoai/nanoclaw/pull/3822)，@amit-shafnir）：已合并。将 `.worktrees/` 加入 `.gitignore`，避免工作树目录污染 `git status`。修复虽小，但对使用 git worktree 的贡献者体验有明显改善。

总体来看，项目向"更可靠的 agent 编排 + 更规范的 provider 抽象 + 更低延迟的会话调度"迈进了一大步。

## 社区热点

今日讨论热度最高的 Issue 集中在用户可感知的体验问题上：

- **#3338 Codex WebSocket idle retry is hidden until NanoClaw's 10-minute turn timeout**（[链接](https://github.com/nanocoai/nanoclaw/issues/3338)，@ionescu77，3 条评论）：这是当前社区最关注的 Issue。Codex Responses WebSocket 空闲 5 分钟后会在内部重试，但 `codex app-server` 不把这个失败信号透传给 NanoClaw，导致用户侧看到一条 Telegram 请求最长静默 10 分钟无响应。用户诉求很明确：尽快把 Codex 的重试/失败状态通过事件机制暴露给 NanoClaw，避免长时间无反馈。该问题自 8 月 18 日创建以来持续活跃，社区期待有 fix PR 跟进。
- **#1981 systemd misdetected as absent on headless Linux**（[链接](https://github.com/nanocoai/nanoclaw/issues/1981)，@bromleymindfulness，2 条评论）：已在今日关闭。Hetzner 无头环境通过 SSH 运行 setup 时 `systemd` 被误判为不存在，导致 v2 安装流程失败。该问题从 4 月持续至今才关闭，说明安装器对非交互式登录环境的兼容性修复已跟上。
- **#3684 update-nanoclaw 快照捕获 symlink 而非内容**（[链接](https://github.com/nanocoai/nanoclaw/issues/3684)，@dweekly，1 条评论）：已关闭。当 `data/` 或 `groups/` 被符号链接到 checkout 外部时，`/update-nanoclaw` 的 mutable-state 快照静默记录的是 symlink 本身而非内容，事务报告成功，但 rollback 只是"恢复一个指向已迁移数据的链接"，存在静默数据损坏风险。

细分来看，社区最在意的是**更新/安装流程在真实环境（无头、非交互、symlink）下的可靠性**，以及**长时间静默无反馈的问题**。这二者都是"生产可用性"层面的硬伤。

## Bug 与稳定性

按严重程度排列今日活跃的 Bug 类问题：

| 严重程度 | 问题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| **高** | **#3828 — update cutover drain 无法成功**（[链接](https://github.com/nanocoai/nanoclaw/issues/3828)，@laydros）：`/update-nanoclaw` 先停止主机服务，再等待 agent 容器退出。但只有 host 才会停止空闲容器，而 host 的关闭路径恰恰刻意让容器继续运行，导致 drain 轮询永远不会成功。更新流程可能因此永久卡住。 | OPEN（今日新开） | 无 |
| **中高** | **#3338 — Codex WebSocket idle retry 对 NanoClaw 不可见**（[链接](https://github.com/nanocoai/nanoclaw/issues/3338)，@ionescu77）：用户请求最长静默 10 分钟，Codx CLI 内部重试但失败不对外暴露。影响 Telegram 等渠道的实时性体验。 | OPEN（8/18 创建） | 无 |
| **中** | **#3354 — setup 遗留 0 字节 channel 文件 + PATH fix 前执行 onecli check**（[链接](https://github.com/nanocoai/nanoclaw/issues/3354)，@glifocat）：非登录 SSH 会话安装时，`git show <ref>:<path> > <file>` 失败会留下 0 字节文件；且 `onecli check` 在自己的 PATH 修复之前运行。已在今日关闭，说明修复已合入。 | CLOSED | ✅ 已修复 |
| **中** | **#3684 — update-nanoclaw mutable-state 快照捕获 symlink 而非内容**（[链接](https://github.com/nanocoai/nanoclaw/issues/3684)，@dweekly）：回滚可能"成功"地把用户带回损坏状态，数据安全风险高。已关闭，但需确认测试覆盖。 | CLOSED | 需确认 |
| **低** | **#1981 — systemd 无头环境误判**（[链接](https://github.com/nanocoai/nanoclaw/issues/1981)）：安装器在非交互 shell 中检测 systemd 失败。已关闭。 | CLOSED | ✅ 已修复 |

另外值得关注的是 **PR #3823 — Mattermost callbacks 认证与 action secrets 隔离**（[链接](https://github.com/nanocoai/nanoclaw/pull/3823)，@glifocat）：为 Mattermost action 回调强制要求 nonblank secret、默认拒绝未认证 action、使用 `timingSafeEqual` 校验、并隔离外部按钮集成对共享 secret 的访问。这是一个安全修复类 PR，还在待合并状态，建议尽快合入。

## 功能请求与路线图信号

以下开放 PR 反映了社区对 NanoClaw 能力边界的明确期待，部分可能被纳入下一版本：

- **多通道语音与邮件接入是明显方向**：
  - **#3764 — `/add-voice` 全双工浏览器语音对话**（[链接](https://github.com/nanocoai/nanoclaw/pull/3764)，@glifocat）：基于 GPT-Live-1 的实时语音通话能力，直接拓宽交互形态。9/11 创建，仍开放。
  - **#3726 — 原生 Proton Mail 适配器**（[链接](https://github.com/nanocoai/nanoclaw/pull/3726)，@drsmk238）：通过 Proton Mail Bridge 收发邮件。9/6 创建，仍开放。
  - **#3743 — AgentMail 邮件渠道适配器**（[链接](https://github.com/nanocoai/nanoclaw/pull/3743)，@billyshipp）：托管式 agent 邮箱 API，规避 MX 记录与既有邮箱冲突问题。9/8 创建，仍开放。
- **观测性与可追踪性**：
  - **#3796 — `/add-telemetry` OpenTelemetry 追踪**（[链接](https://github.com/nanocoai/nanoclaw/pull/3796)，@jhisse）：导出 agent 容器的 OTLP 追踪，覆盖 turn、模型调用、工具、子代理、compaction、后台任务和投递。9/13 创建，仍开放。
- **外部工具生态集成**：
  - **#3697 — Keenable MCP 工具 skill**（[链接](https://github.com/nanocoai/nanoclaw/pull/3697)，@ilya-bogin-keenable）：通过远程 MCP 注册 web 搜索与页面抓取。9/1 创建，等待 review。
- **认证体系延伸**：
  - **#3825 — OpenCode 通过 Iron Proxy 认证**（[链接](https://github.com/nanocoai/nanoclaw/pull/3825)，@glifocat）：复用 #3824 的 credential-connection 接口，支持 API key 和 ChatGPT 原生登录 + OAuth refresh。两个 PR 都是今日新开，尚在早期阶段。

此外 **#3824 — gateway provider credential connections 重构**（[链接](https://github.com/nanocoai/nanoclaw/pull/3824)）本身是基础设施级的抽象改进，若合入会对后续所有 provider 的认证集成方式产生影响，属于值得关注的架构信号。

## 用户反馈摘要

从近期 Issue 和评论中可以提炼出以下真实用户痛点：

- **长静默无反馈是当前最大的体验问题**（#3338，@ionescu77）："一个简单的 Telegram 请求可以在 Codex WebSocket 停滞时静默十分钟"——用户无法区分"请求卡死"和"正常处理中"，严重削弱信任感。用户希望至少能看到一个"正在重试"的状态提示。
- **update 流程"假成功"让用户后怕**（#3684，@dweekly）："事务报告成功，rollback 恢复的是指向 live 数据的链接"——这意味着用户以为回滚到了旧状态，实际可能已经指向迁移后的数据。这种"成功了但实际没有"的行为比直接报错更危险。
- **非交互环境安装仍存在摩擦**（#3354，@glifocat；#1981，@bromleymindfulness）："~/.local/bin 不在 PATH 里、无交互 shell、systemd 误判"——安装器假设了交互式登录 shell，但真实的无头服务器/CI/容器环境是常见场景。社区希望安装脚本对非交互环境有更强的兼容性。
- **邮箱渠道是明确缺口**（#3726、#3743）：用户提出了两种不同的邮件接入方案（Proton Bridge 和 AgentMail），说明邮件场景有真实需求，但 NanoClaw 目前缺少不依赖自有 MX 的轻量邮件入口。

## 待处理积压

以下 Issue/PR 已有一定时间但仍未获得解决或合入，建议维护者优先关注：

- **Issue #3338（8/18 创建，OPEN）** — Codex WebSocket 静默超时问题，已有 3 条评论，社区持续关注，但目前没有对应 fix PR。建议确认修复排期。
- **PR #3697（9/1 创建，OPEN）** — Keenable MCP 工具 skill。社区外部贡献，等待超过两周。若因设计原因不便合入，建议明确反馈给作者。
- **PR #3724（9/5 创建，OPEN）** — 更新已退役的 `claude-sonnet-4-20250514` 模型 ID。这是一个很小的文档修正，但长期未合入，可能影响新用户使用 add-opencode skill。
- **PR #3726（9/6 创建，OPEN）** — Proton Mail 适配器。社区贡献的完整渠道实现，等待 review 时间已超过一周。
- **PR #3743（9/8 创建，OPEN）** — AgentMail 邮件渠道。与 #3726 同为邮件方向，维护者可能需要横向评估两个方案的取舍。
- **PR #3764（9/11 创建，OPEN）** — `/add-voice` 全双工语音对话。功能创新度高、覆盖面大（channel + skill + native adapter），但因设计范围较大，可能需要更长的 review 周期。

综合来看，项目今日处于高输出、高合并的状态，核心系统（provider 抽象、会话性能、测试稳定性）在稳步加强。最大的风险点是 #3828 的 updater 卡死问题——它直接影响用户升级路径，建议尽快修复。同时 #3823（Mattermost 安全修复）和 #3338（WebSocket 静默）也值得在新版本发布前优先解决。

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

过去24小时无活动。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-16

## 今日速览

过去 24 小时项目活跃度**中等偏高**，核心工作集中在 OpenClaw 集成层的兼容性修复：共有 17 个针对 OpenClaw v2026.8.1 升级后的修复 PR 被合并，覆盖记忆恢复、输出预算、配置同步等稳定性问题。Issue 侧交易清淡，仅 3 条更新，其中 2 条为 stale 自动关闭、1 条广告关闭诉求仍开放。值得关注的是，PR #2374（永久隐藏侧边栏广告）仍在待合并列表，与开放 Issue #2342 形成对应关系，是社区呼声较高的功能诉求。整体来看，项目处于一次大规模兼容性修复的收尾阶段，工程推进速度良好。

## 版本发布

无新版本发布。今日合并了发布 PR [#2687](https://github.com/netease-youdao/LobsterAI/pull/2687)（`Release/2026.9.15`），预计新版本将包含今日合并的大量 OpenClaw 兼容性修复。

---

## 项目进展

今日有 20 条 PR 被合并/关闭，核心进展是 **OpenClaw v2026.8.1 升级后的系统性兼容修复**。这一系列修复呈批量合并态势，覆盖了从网关启动、记忆恢复到模型策略配置等多个层面，标志着项目正在快速消化升级带来的技术债：

**稳定性修复（OpenClaw 集成层）：**

- **[#2686](https://github.com/netease-youdao/LobsterAI/pull/2686) fix(openclaw): pack and stage local workspace deps in runtime build** — 修复 `pnpm pack` 将 `workspace:*` 依赖改写为 registry 版本导致本地补丁丢失的问题，改为从源码打包生产依赖。
- **[#2685](https://github.com/netease-youdao/LobsterAI/pull/2685) fix(openclaw): preserve patched workspace runtime dependencies** — 同为依赖补丁丢失问题的修复（与 #2686 属于同一问题的不同实现）。
- **[#2684](https://github.com/netease-youdao/LobsterAI/pull/2684) fix(openclaw): prevent heuristic output budget starvation** — 修复长会话请求的输出 tokens 被错误地从 8192 降为 1、导致推理模型无正文返回的严重问题。
- **[#2682](https://github.com/netease-youdao/LobsterAI/pull/2682) fix(openclaw): validate historical transcript replay** — 历史内容块字段缺失/类型错误时导致任务无法继续，增加回放入口校验。
- **[#2681](https://github.com/netease-youdao/LobsterAI/pull/2681) fix(openclaw): recover invalid legacy dreaming state at startup** — 旧版记忆 JSON 解析失败阻断网关启动的问题。
- **[#2679](https://github.com/netease-youdao/LobsterAI/pull/2679) feat(openclaw): add compatibility repair for post-upgrade gateway state** — 升级后网关状态的完整修复：备份引擎数据、运行官方 doctor 修复、恢复损坏的记忆索引与内置插件。
- **[#2678](https://github.com/netease-youdao/LobsterAI/pull/2678) fix(openclaw): preserve compaction summary format and audit facts** — 长会话压缩时模型被要求遵循两个不兼容的摘要模板的问题。
- **[#2677](https://github.com/netease-youdao/LobsterAI/pull/2677) fix(cowork): restore technical error details** — 修复升级后错误卡片仅显示 provider/model、丢失详细异常摘要的问题。
- **[#2664](https://github.com/netease-youdao/LobsterAI/pull/2664) fix(openclaw): avoid POPO SDK loading races** — 修复 `ERR_REQUIRE_ESM_RACE_CONDITION` 竞态导致的 POPO 账户监听器失效。

**配置同步相关：**

- **[#2680](https://github.com/netease-youdao/LobsterAI/pull/2680) fix(openclaw): preserve model policy during config sync** — 防止配置同步误删 OpenClaw 迁移产生的 `modelPolicy` 字段，避免配置被反复写入下发。

**遗留 PR 清理：**

- 多个 3-4 月的功能 PR（[#1142](https://github.com/netease-youdao/LobsterAI/pull/1142)、[#1143](https://github.com/netease-youdao/LobsterAI/pull/1143)、[#1144](https://github.com/netease-youdao/LobsterAI/pull/1144)、[#1145](https://github.com/netease-youdao/LobsterAI/pull/1145)、[#1146](https://github.com/netease-youdao/LobsterAI/pull/1146)）今日被标记为 stale 并关闭，其中包含技能创建入口、Agent 默认图标修复、定时任务运行时间展示等功能。这些功能是否合入后续版本需关注。

---

## 社区热点

**Issue [#2342](https://github.com/netease-youdao/LobsterAI/issues/2342)：左下角广告可以彻底关闭吗**（2 条评论）

- 创建于 2026-07-15，今日仍在活跃讨论中。用户反馈从 v2026.7.15 版本开始出现左下角广告，虽然可以手动点叉关闭，但会反复弹出，设置中也找不到对应开关。这是今日社区讨论最集中的 Issue。
- 对应的修复 PR [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374)（feat: add permanent setting to hide sidebar ad banner）已存在，处于待合并状态，说明这一需求已被开发侧认可并进入实现阶段。

---

## Bug 与稳定性

今日合入了多个严重程度不等的 bug 修复，集中在 OpenClaw 升级后的集成层，严重程度从高到低排列：

| 严重程度 | 问题描述 | 修复 PR |
|---------|---------|---------|
| **严重** | 长会话请求输出 tokens 被错误降低至 1，导致推理模型协议成功但无正文返回，且重复续答无法恢复 | [#2684](https://github.com/netease-youdao/LobsterAI/pull/2684) ✅ |
| **严重** | 升级后网关启动被损坏的旧记忆 JSON 阻断，普通重试和配置重建无法消除 | [#2681](https://github.com/netease-youdao/LobsterAI/pull/2681) ✅ |
| **严重** | 历史内容块缺少 ID/字段类型错误导致任务在请求准备阶段反复抛错无法继续 | [#2682](https://github.com/netease-youdao/LobsterAI/pull/2682) ✅ |
| **中等** | 打包时本地 workspace 依赖补丁丢失，导致 `electron:dev:openclaw` 运行报 `prepareReplayMessages` 缺失 | [#2686](https://github.com/netease-youdao/LobsterAI/pull/2686) ✅、[#2685](https://github.com/netease-youdao/LobsterAI/pull/2685) ✅ |
| **中等** | 升级后请求错误的“技术详情”丢失底层异常摘要，仅显示 provider/model/modelSource | [#2677](https://github.com/netease-youdao/LobsterAI/pull/2677) ✅ |
| **轻微** | POPO SDK 模块加载时出现 `ERR_REQUIRE_ESM_RACE_CONDITION`，重启后网关缺少账户监听器 | [#2664](https://github.com/netease-youdao/LobsterAI/pull/2664) ✅ |
| **轻微** | 长会话压缩时使用两个不兼容的摘要模板，可能导致摘要丢失标题和标识符 | [#2678](https://github.com/netease-youdao/LobsterAI/pull/2678) ✅ |

所有上述 bug 均已有对应修复 PR 并在今日合并，整体稳定性快速回升。

---

## 功能请求与路线图信号

**高确定性（已有实现 PR）：**

- **[#2342](https://github.com/netease-youdao/LobsterAI/issues/2342)：永久关闭左下角广告的开关** — PR [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374) 已在待合并状态，实现为在 Settings → General 中新增一个用户可见的切换项。此前用户只能逐个关闭横幅广告，无法永久禁用。

**可能进入后续迭代的信号：**

- 今日关闭的多个 stale PR（[#1142](https://github.com/netease-youdao/LobsterAI/pull/1142)、[#1143](https://github.com/netease-youdao/LobsterAI/pull/1143)、[#1144](https://github.com/netease-youdao/LobsterAI/pull/1144)、[#1145](https://github.com/netease-youdao/LobsterAI/pull/1145)、[#1146](https://github.com/netease-youdao/LobsterAI/pull/1146)）虽然被标记为 stale 关闭，但其功能内容（技能快捷创建、Agent 默认图标修复、定时任务 UI 改进、团队配置模板导入导出）仍可能被维护者以不同形式重新实现或后续合入。

---

## 用户反馈摘要

**来自 Issue #2342（广告关闭）：**

- 用户对 v2026.7.15 之后出现的左侧广告表达了明确不满，称“更新到这个版本之前还没有遇到过这种广告”，并明确要求“彻底不弹出”。说明投放逻辑的变更对免费用户的体验造成了可见的负面影响。
- 用户已主动浏览设置项但未找到关闭开关，说明该功能的入口不够显眼或尚未实现。

**来自 PR 修复描述中引用的用户日志反馈：**

- 多个 OpenClaw 兼容性修复（[#2682](https://github.com/netease-youdao/LobsterAI/pull/2682)、[#2677](https://github.com/netease-youdao/LobsterAI/pull/2677)、[#2681](https://github.com/netease-youdao/LobsterAI/pull/2681)）均来自用户日志排查，涉及：任务反复无法继续、错误卡片信息不完整、网关启动失败等。这些问题的共同特征是**用户侧无法自行恢复**，需要通过升级版本解决。

---

## 待处理积压

| 项目 | 创建时间 | 状态 | 备注 |
|------|---------|------|------|
| [PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374)：为侧边栏广告横幅添加永久隐藏设置 | 2026-07-21 | 待合并 | 直接回应用户 Issue #2342，今日仍未合入，已等待近 2 个月。广告关闭诉求持续升温，建议优先处理 |
| [Issue #2342](https://github.com/netease-youdao/LobsterAI/issues/2342)：左下角广告可以彻底关闭吗 | 2026-07-15 | 开放中 | 用户持续关注中，若无意外应在 #2374 合入后关闭 |
| [PR #1181](https://github.com/netease-youdao/LobsterAI/pull/1181)：从会话列表中隐藏 OpenClaw 主 agent 会话 | 2026-04-01 | 待合并 | 解决用户困惑的内部会话展示问题，等待超 5 个月 |
| [PR #1277](https://github.com/netease-youdao/LobsterAI/pull/1277)：electron 依赖更新（43.5.0 → 44.3.0） | 2026-04-02 | 待合并 | dependabot 自动更新，electron-builder 同步升级；长期未合入可能积累安全与兼容性风险 |

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报 — 2026-09-16

## 今日速览
过去 24 小时 Moltis 项目更新量处于中低水平：1 条 Issue 更新（#205 获得新评论）、2 个新 PR 提交、无新版本发布。虽然无合并/关闭动作，但新 PR 分别指向构建缓存优化与 OAuth 测试稳定性修复，说明项目在开发体验与工程质量上仍在持续推进。值得关注的是，2 月提出的功能请求 #205 在本日获得新的社区讨论，显示用户对自定义模型端点的灵活配置需求依然迫切。整体来看，项目当前处于平稳迭代期，活跃度适中，无重大风险信号。

## 项目进展
今日无 PR 被合并或关闭，项目主干未发生代码变更。不过 2 个待合并 PR 展示了近期开发方向：

- [#1270 feat(build): cache cargo across image builds, and script building the image](https://github.com/moltis-org/moltis/pull/1270) — 通过 BuildKit 缓存挂载避免每次构建镜像时重新编译全部依赖树，冷启动编译耗时预计可显著降低。这是一个纯构建效率优化，不涉及运行时逻辑。
- [#1269 test(oauth): remove success-popup timing race](https://github.com/moltis-org/moltis/pull/1269) — 修复 PKCE 成功与断开测试中因弹窗立即关闭导致的时序竞争问题，改为等待主页面持久化认证状态，增强测试可靠性。

这两个 PR 若合入，将分别改善开发者的镜像构建体验和 CI 测试稳定性，属于工程基础能力提升。

## 社区热点
今日讨论集中在唯一的 Issue #205：

- [[Feature] Allow setting body parameters for custom OpenAI endpoints (and per-model)](https://github.com/moltis-org/moltis/issues/205) — 该 Issue 创建于 2026-02-22，今日（更新于 2026-09-15）新增了 2 条评论，是当前社区讨论的焦点。

**诉求分析**：用户希望为自定义 OpenAI 兼容端点（以及按模型）设置请求 body 参数，这通常出现在需要通过代理网关、私有化部署或第三方兼容服务接入的场景中。这类需求的核心是让 Moltis 具备更灵活的企业级接入能力，用户可能需要在请求体中加入 API Key、组织 ID、自定义参数或供应商特有的认证字段。该需求已存在近 7 个月，讨论活跃度不高但持续有关注，推测是小众但真实的使用痛点。

## Bug 与稳定性
今日无新报告的崩溃或功能性 Bug。与稳定性相关的仅有 PR #1269：

- 待合并的测试修复：[#1269 test(oauth): remove success-popup timing race](https://github.com/moltis-org/moltis/pull/1269)

该 PR 修复的是 moltis-064r 测试用例中的时序竞争问题，属于测试稳定性范畴，严重程度较低，不影响生产环境。建议维护者在合并前验证其兼容性，并关注是否还有其他类似依赖弹窗事件的测试。

## 功能请求与路线图信号
本期仅有一个活跃功能请求：

- [#205 Allow setting body parameters for custom OpenAI endpoints (and per-model)](https://github.com/moltis-org/moltis/issues/205)

该请求的核心是自定义端点 body 参数支持。结合当前待合并的 PR（构建优化、测试修复），可以看出项目当前精力主要放在工程基础层面，功能特性开发相对放缓。但 #205 代表了“多模型/多供应商接入灵活性”的方向，与 AI 助手类项目的核心竞争力高度相关。考虑到其历史较长且无反对意见，建议维护团队评估将其纳入下一版本的路线图规划。

## 用户反馈摘要
基于 Issue #205 的摘要及现有评论（评论数 2，未获取具体内容），可提炼出以下用户声音：

- **真实痛点**：用户在使用自定义 OpenAI 端点时，需要向请求体注入额外的参数，当前版本不支持该操作，导致部分兼容服务（如带特定鉴权或路由参数的代理）无法接入。
- **使用场景**：涉及企业代理网关、第三方 OpenAI 兼容 API、或需要对不同模型分别配置请求头/体的高级用户。
- **期望行为**：支持全局和按模型两种粒度的 body 参数设置，说明用户对配置灵活性有较高要求。

目前没有发现用户对现有功能表示不满的反馈，整体社区情绪偏向功能建议型。

## 待处理积压
- **长期未关闭的功能请求**：[#205 [Feature] Allow setting body parameters for custom OpenAI endpoints (and per-model)](https://github.com/moltis-org/moltis/issues/205) — 创建于 2026-02-22，已开放近 7 个月，期间仅 2 条评论，虽有更新但无明确排期信号。该请求涉及自定义端点配置的核心能力，建议维护者给出回应或标注计划版本，避免用户长期等待。

两个新 PR（#1270、#1269）目前仅创建 1 天，尚未被维护者 review 或合并，建议尽快安排评审，避免积压。

---

**报告日期**：2026-09-16 | **数据来源**：[moltis-org/moltis](https://github.com/moltis-org/moltis) | **项目健康度**：平稳，工程改进持续，功能迭代需加强社区需求响应。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-16

## 1. 今日速览

过去 24 小时项目保持健康活跃度：13 条 Issue 更新（5 条活跃/新开，8 条关闭），50 条 PR 更新（25 条待合并，25 条关闭）。无新版本发布。社区讨论最集中的是 QwenPaw Hub 2.2.0 多租户版的路线图征集（#7318，27 条评论）；稳定性方面，Windows 上 spawn subAgent 全部超时失败（#7678）是目前最严重的未解决问题。多位首次贡献者提交的 PR 被关闭后重新提交（#7736→#7794、#7737→#7795、#7680→#7796），显示外部贡献活跃但流程尚未完全理顺。值得注意的是 MCP 连接类 bug 修复已落地（#7716/#7764 均已关闭），整体修复效率良好。

## 3. 项目进展

今日无 PR 合并显示，但 25 条 PR 关闭，从摘要判断多为合并或替代提交，关键进展如下：

- **MCP 错误处理修复完成**（#7735，修复 #7716）：在重构解码后的 HTTP 错误响应时过滤陈旧的内容长度/编码头，防止 HTTPX 二次解压导致原始错误信息丢失。Dagu MCP 客户端 inactive 问题（#7764）随之关闭。https://github.com/agentscope-ai/QwenPaw/pull/7735
- **控制台 UI 修复合入三连**：
  - 恢复链接键盘焦点指示器（#7759），修复设计重置后全局 `:focus-visible` 样式缺失问题。https://github.com/agentscope-ai/QwenPaw/pull/7759
  - embedding 健康检查超时校验与后端对齐（#7758），支持 0-300 秒小数输入并显式报错。https://github.com/agentscope-ai/QwenPaw/pull/7758
  - 区分 ReMe 内存任务空错误通知与空结果（#7756）。https://github.com/agentscope-ai/QwenPaw/pull/7756
- **PDF 文档块处理仍在推进**：#7636 继续修复 OpenAI 兼容 chat-completions 端点在 `supports_multimodal=True` 时仍发送 `{"type":"file"}` 并导致 400 的问题，覆盖 #7621 未解决的路径，等待合并。https://github.com/agentscope-ai/QwenPaw/pull/7636

此外，首次贡献者 @lorenzozanee 的三项 PR（#7680/#7736/#7737）被关闭后，本人于 9/15 重新提交了对应新 PR（#7796/#7794/#7795），内容一致但基于最新的分支基线，说明流程上存在 rebase/重提要求，外部贡献者配合度良好。

## 4. 社区热点

- **#7318 QwenPaw Hub 2.2.0 多租户版路线图讨论**（27 评论，本次统计中最活跃）：官方发起征集“多租户版 Hub 接下来该做什么”，引用社区此前多次请求（#2324 多用户访问与管理员托管 skills）。用户对团队化部署的诉求非常强烈，此 Issue 是当前项目社区走向的风向标。https://github.com/agentscope-ai/QwenPaw/issues/7318
- **#7678 spawn subAgent 全部超时失败**（7 评论）：Windows 2.2.0 用户报告任务一旦生成 subAgent 就 100% 超时，即使将 timeout 拉到很长也无济于事。用户给出了详细的调试记录片段，但尚未定位到根因。https://github.com/agentscope-ai/QwenPaw/issues/7678
- **#5872 Docker 容器 browser_use dbus 错误**（6 评论，已关闭）：Chromium 在容器内因 dbus 连接失败退出，该问题已关闭，但今日仍有更新，可能是补充了解决办法。https://github.com/agentscope-ai/QwenPaw/issues/5872

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue/PR | 状态 | 说明 |
|---|---|---|---|
| 🔴 严重 | [#7678 spawn subAgent 全部 timeout](https://github.com/agentscope-ai/QwenPaw/issues/7678) | 未解决 | Windows 2.2.0 下 100% 触发，长时间 timeout 无效，影响核心 Agent 功能，尚无对应 fix PR |
| 🟠 高 | [#7792 WeChat 附件变 file:// URL 致 400](https://github.com/agentscope-ai/QwenPaw/issues/7792) | 新报告（9/15） | 微信/企微视频和音频附件在 tool_result 中变成 `file://` URL，发送至 OpenAI 兼容 API 报 "URL does not appear to be valid"，暂无 fix PR |
| 🟡 中 | [#7689 PDF block 在 multimodal 端点仍被发送](https://github.com/agentscope-ai/QwenPaw/issues/7689) | 有 fix PR | #7621 只修复了 text-only 模型，OpenAI 兼容 `/chat/completions` 多模态端点仍抛 400，[#7636](https://github.com/agentscope-ai/QwenPaw/pull/7636) 待合并 |
| 🟢 已修复 | [#7716 MCP 升级 2.2.x 后无法连接注册](https://github.com/agentscope-ai/QwenPaw/issues/7716) / [#7764 Dagu MCP client inactive](https://github.com/agentscope-ai/QwenPaw/issues/7764) | 已关闭 | 归因于 HTTP 错误响应解压异常，[#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) 已修复 |
| 🟢 已修复 | [#5872 Docker 内 browser_use dbus 失败](https://github.com/agentscope-ai/QwenPaw/issues/5872) | 已关闭 | 历史 issue 今日有更新，可能是解决方案确认 |
| 🟢 已修复 | [#3871 Agent 无限 Thinking（SSE 未正确关闭）](https://github.com/agentscope-ai/QwenPaw/issues/3871) | 已关闭 | 今日有关闭记录，长期 issue 终获解决 |

## 6. 功能请求与路线图信号

多个功能请求与今日活跃 PR 存在直接对应关系，部分已进入实现阶段：

- **QwenPaw Hub 多租户/模型网关**（#7318 讨论中）：[#7779](https://github.com/agentscope-ai/QwenPaw/pull/7779) 已提交，为 Hub 增加模型网关、成员治理与用量看板，管理员发布模型并托管供应商密钥，成员可选用 Hub 模型而无需接触凭据。这是 2.2.0 的核心功能。
- **自定义邮件服务器支持**：[#7791](https://github.com/agentscope-ai/QwenPaw/pull/7791)（首次贡献）为邮件管理界面增加 "custom" provider，支持任意 IMAP/SMTP 自建服务器，补上 qwenpawmail-mcp 已支持的环境变量对应的 UI 缺口。
- **多文件夹默认工作区**：[#7789](https://github.com/agentscope-ai/QwenPaw/pull/7789) 支持将当前工作区配置存为默认，并允许在运行时编辑多文件夹工作区——回应了 Agent 工作区配置能力不足的问题。
- **统一聊天工作台外壳**：[#7790](https://github.com/agentscope-ai/QwenPaw/pull/7790) 引入会话级右侧 Workbench 外壳（Files/Changes/Terminal/Tools），不动后端契约地将 Files 工作区和 Git 面板迁入，并解决布局缩放的遗留问题。
- **Advisor Mode（顾问模式）**：[#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569) 待合并，在单任务中配对“顾问模型 + 工作模型”，由强模型制定开场计划、弱模型执行，兼顾质量与成本。
- **DeepSeek V4 Flash 能力收录**：[#7794](https://github.com/agentscope-ai/QwenPaw/pull/7794) 为 provider 目录补充该模型的图像输入、100 万 token 上下文与 reasoning effort 支持。
- **技能按 channel 限定使用**（#7746，已关闭），**文件发送后直接展示在回复区而非折叠区**（#7744，已关闭）——这两个需求都有明确的使用场景，但未看到对应 PR，可能作为后续版本 backlog。

## 7. 用户反馈摘要

从今日 Issue 评论中提炼真实用户声音：

- **“技术我不懂，结果你们看看”**——#7678 用户面对 subAgent 全量超时的挫折感明显，给出了详细的 AI 辅助调试过程（从 session_id 查询到旧记录、换关键词检索），说明用户愿意配合排查，但当前问题让核心 Agent 功能几乎不可用，属于高优先级痛点。https://github.com/agentscope-ai/QwenPaw/issues/7678
- **“我希望有些 skill 只能在指定 channel 才能使用”**——#7746 用户提出自定义 channel 下技能按渠道隔离的需求，反映真实企业在多渠道接入时的权限管理诉求。https://github.com/agentscope-ai/QwenPaw/issues/7746
- **“文件结果只显示在思考/工具步骤中……用户需要手动展开才能找到文件”**——#7744 用户指出 `send_file_to_user` 发送的文件被折叠在工具调用详情里，不易被发现，希望直接在回复正文区提供文件卡片。这是对 Agent 输出体验的典型可用性反馈。https://github.com/agentscope-ai/QwenPaw/issues/7744
- **“QQ 号、电话号码、工号……可以透传给 mcp 吧？”**——#7650 用户询问频道请求顶层 JSON 参数（如 QQ 号、电话、工号）如何透传给 MCP 工具，该 issue 被标注 wontfix 但用户期望明确。https://github.com/agentscope-ai/QwenPaw/issues/7650
- **社区对多用户/团队版期待已久**——#7318 中官方明确指出“社区反复要求更好的团队运行方式”，Hub 多租户正是对这一长期诉求的首次正式回应。https://github.com/agentscope-ai/QwenPaw/issues/7318

## 8. 待处理积压

以下问题长期未得到响应或处理，建议维护者关注：

- **PR #6399 reranker UI 配置面板**：创建于 7/23，已近两个月仍在 Under Review，无更新动态。https://github.com/agentscope-ai/QwenPaw/pull/6399
- **PR #6776 浏览器 Playwright 驱动死连接自愈**：创建于 8/7，标记为 ready-for-human-review，但尚未进入合并流程。该 PR 修复“驱动死一次就永久不可用”的确定性 bug，是受影响用户等待已久的稳定性修复。https://github.com/agentscope-ai/QwenPaw/pull/6776
- **Issue #7689 + PR #7636**：PDF block 在 multimodal 端点的 400 问题自 9/8 提交修复以来已有 7 天未合并，同期 #7621（只修了一半）已合入，建议尽快推进 #7636 完成覆盖。https://github.com/agentscope-ai/QwenPaw/pull/7636
- **Issue #7792 WeChat 附件 file:// URL**：9/15 新报告的 bug，尚无任何响应，考虑到这是微信/企微场景的高频路径，建议尽快确认。https://github.com/agentscope-ai/QwenPaw/issues/7792

---

*报告生成时间：2026-09-16｜数据来源：agentscope-ai/CoPaw GitHub 仓库*

:::
