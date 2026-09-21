---
title: "OpenClaw 生态日报"
published: 2026-09-21
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-21

> Issues: 108 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-21 00:00 UTC

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

# OpenClaw 项目动态日报 — 2026-09-21

---

## 1. 今日速览

过去 24 小时 OpenClaw 项目保持极高活跃度：**108 条 Issue 更新**（77 条新开/活跃、31 条关闭），**500 条 PR 更新**（283 条待合并、217 条已合并/关闭），无新版本发布。项目正处于 **2026.9.5 版本发布后的密集修复周期**，社区反响强烈——今日涌现大量 P0 级更新失败报告（Doctor 卡死、插件状态迁移死锁等），共涉及至少 9 条独立报告线程；与此同时，内存/磁盘泄漏类长期问题（WAL 无界增长、/tmp 构建目录泄漏、Gateway RSS 膨胀）继续占据讨论热度榜首。整体项目健康度受更新链路稳定性问题拖累，但 PR 合并/关闭量（217 条）显示维护团队正在快速响应。

---

## 2. 版本发布

过去 24 小时**无新版本发布**。

⚠️ 注意：多个 P0 Issue 指向 **2026.9.5 版本更新过程存在系统性故障**（详见第 5 节），建议维护者评估是否需要发布紧急补丁版本。

---

## 3. 项目进展

今日合并/关闭的重要 PR（部分代表性条目，按影响面排序）：

- **`feat: enable structured Tool Search by default`（#154068，CLOSED）** — 结构化工具搜索现已成为内置 Copilot 场景的默认配置，用户无需显式设置 `tools.toolSearch`。这是大规模工具目录场景下的一次重要默认行为变更。  
  👉 https://github.com/openclaw/openclaw/pull/154068

- **`improve(memory): reduce publication worker startup imports`（#154155，CLOSED）** — 精简 memory 发布工作线程启动时导入的依赖图，降低启动开销，不改变索引内容与 SQLite 扩展行为。  
  👉 https://github.com/openclaw/openclaw/pull/154155

- **`fix(tasks): keep chat status reads responsive`（#149738，CLOSED）** — 修复 `/tasks` 与 `/status` 在任务数据库繁忙时阻塞 Gateway 其他工作的问题，提升任务状态查询的响应性。  
  👉 https://github.com/openclaw/openclaw/pull/149738

- **`fix: allow plugin state writes after database inode reuse`（#154176，OPEN）** — 针对文件系统复用已删除状态数据库 inode 导致插件首次状态写入失败的问题，新的数据库操作将保留有效许可，避免误判“数据库准入变更”。与 #153606（sessions.json 恢复失败）直接相关。  
  👉 https://github.com/openclaw/openclaw/pull/154176

- **`refactor(doctor): move sandbox registry imports off thread`（#153652，OPEN）** — 将 Doctor 的沙箱注册表导入操作移出应用线程，消除 SQLite 工作对主线程的阻塞，保持既有行为不变。  
  👉 https://github.com/openclaw/openclaw/pull/153652

- **`refactor(update): simplify update execution and finalization`（#154160，OPEN）** — 简化更新执行路径，移除生产者已不再使用的并行执行分支，避免重复的插件完成与激活准备工作。  
  👉 https://github.com/openclaw/openclaw/pull/154160

- **`fix: refresh stale Gateway shutdown budgets during updates and Doctor`（#153636，OPEN）** — 修复更新/Doctor 期间因过期 systemd 30 秒超时中断 Gateway 关闭、导致服务残留的问题。  
  👉 https://github.com/openclaw/openclaw/pull/153636

**总体评价**：项目正围绕三条主线推进——**① 修复更新链路稳定性**（#153636、#154160、#154176）；**② 消解主线程阻塞**（#153652、#154173、#151815、#149738）；**③ 默认启用结构化工具发现**（#154068）。资源泄漏类 PR（#154131 移除压缩检查点、#154149 相关修复）也已在队列中，表明维护者正视了磁盘/内存占用问题。

---

## 4. 社区热点

今日讨论热度最高的 Issue 反映了用户对**资源泄漏**和**更新失败**的强烈不满：

### 🔥 最热 Issue：Agent SQLite WAL 无界增长 — 35 条评论
**#143524（P0，gold shrimp，ux-release-blocker）**：Windows 主机上 `openclaw-agent.sqlite-wal` 增长至 **2.8 GB**，手动执行 `wal_checkpoint(TRUNCATE)` 清空后两天内重新膨胀，阻塞 Gateway 启动。该问题自 9 月 9 日以来持续发酵，社区围绕 WAL 检查点触发条件、Windows 文件锁行为和 recovery 流程展开了深入排查。  
👉 https://github.com/openclaw/openclaw/issues/143524

### 🌡️ 僵尸进程累积 — 32 条评论
**#97616（P1，silver shellfish）**：hook/tool 执行后子进程（`openclaw-hooks`、`bash`、`codex` 等）未被回收，累积为僵尸进程，导致运行时性能退化。用户直指这是**回归问题**（此前版本正常）。  
👉 https://github.com/openclaw/openclaw/issues/97616

### 🧠 Gateway 内存泄漏 — 29 条评论
**#91588（P1，silver shellfish）**：Gateway RSS 从启动时 350 MB 增长到 **15.5 GB**，2-3 天内被 OOM killer 击杀，触发 `launchd-handoff` 反复重启。6 月 9 日创建至今仍未关闭，是积压最久的 P1 稳定性问题之一。  
👉 https://github.com/openclaw/openclaw/issues/91588

### 📦 更新失败集体上报 — 多线并进
- **#153704（P0，platinum hermit）**：2026.9.5 更新候选 Doctor 在固定 **~299 秒**死于 `[state/agent-db]` 预迁移完整性检查，5 次尝试全部失败，错误却指向 inference 路由。12 条评论。  
  👉 https://github.com/openclaw/openclaw/issues/153704
- **#153882（P0）**：插件状态迁移因更新父进程仍持有自身 install-records 租约而全部 defer，Doctor 升级为 hard stop 并中止整个更新。  
  👉 https://github.com/openclaw/openclaw/issues/153882
- **#151467（P0）**：自升级死锁 + 回滚 cron 失败（v6.33 → v9.4）。  
  👉 https://github.com/openclaw/openclaw/issues/151467

**诉求分析**：社区核心诉求是**可靠的更新与回滚机制**、**可预期的资源占用边界**（WAL、/tmp、RSS）以及**热重载时不丢连接**。多个更新失败集中在同一时间点（~299s），暗示存在系统性定时/超时逻辑缺陷，而非个案。

---

## 5. Bug 与稳定性

### 🔴 P0（发布阻断，需立即关注）

| 编号 | 问题 | 状态 | 关联 PR |
|---|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | Agent SQLite WAL 无界增长至 2.8 GB，阻塞 Gateway 启动 | OPEN，no-new-fix-pr | 无 |
| [#153704](https://github.com/openclaw/openclaw/issues/153704) | 2026.9.5 更新候选 Doctor 在 ~299s 固定时间死亡，pre-migration 完整性检查失败 | CLOSED | 无 |
| [#153882](https://github.com/openclaw/openclaw/issues/153882) | 插件状态迁移在更新父进程自身 install-records 租约上死锁 | CLOSED | 无 |
| [#151467](https://github.com/openclaw/openclaw/issues/151467) | 自升级死锁 & 回滚 cron 失败（v6.33→v9.4） | OPEN，needs-info | 无 |
| [#153619](https://github.com/openclaw/openclaw/issues/153619) | Gateway 被 `retained_plugin_source_conflict` 阻塞，恢复流程 no-op | CLOSED | 无 |
| [#154165](https://github.com/openclaw/openclaw/issues/154165) | 更新失败 `finalize:doctor`（darwin/arm64, 2026.9.5） | OPEN | 无 |
| [#154140](https://github.com/openclaw/openclaw/issues/154140) | 更新失败 `finalize:doctor`（darwin/arm64, Node 26.3.0） | OPEN | 无 |
| [#154141](https://github.com/openclaw/openclaw/issues/154141) | 更新失败 `global-install-failed`（linux/arm64, 2026.9.4） | OPEN，needs-info | 无 |
| [#153720](https://github.com/openclaw/openclaw/issues/153720) | 2026.9.5 插件源码捕获在正常路径上从不回收，逐个泄漏 ~5 GB /tmp | CLOSED | 无 |
| [#154149](https://github.com/openclaw/openclaw/issues/154149) | Codex 插件反复留下 ~300 MB `/tmp/openclaw-plugin-build-*` 直至 ENOSPC | CLOSED | 无 |
| [#153606](https://github.com/openclaw/openclaw/issues/153606) | 2026.9.5 无法恢复已验证的 sessions.json 备份（源 inode 已变更），Gateway 退出码 78 | CLOSED | [#154176](https://github.com/openclaw/openclaw/pull/154176)（OPEN） |
| [#153566](https://github.com/openclaw/openclaw/issues/153566) | qqbot 插件替换后状态迁移永久 stuck pending | OPEN | 无 |

### 🟠 P1（高优先级稳定性/安全）

| 编号 | 问题 | 状态 | 关联 PR |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程泄漏为僵尸进程，运行时退化 | OPEN，no-new-fix-pr | 无 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏 350MB→15.5GB，OOM 崩溃循环 | OPEN，no-new-fix-pr | 无 |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | requester-settle 批次在 ownership check 后永久重试 | OPEN，queueable-fix | 无 |
| [#138042](https://github.com/openclaw/openclaw/issues/138042) | Gateway 控制请求停滞 157–276 秒（三次事件） | OPEN，no-new-fix-pr | 无 |
| [#132303](https://github.com/openclaw/openclaw/issues/132303) | ⚠️ `agents.list[].tools.deny` 对 claude-cli 后端不生效，原生工具始终可用（安全） | OPEN，needs-security-review | 无 |
| [#120315](https://github.com/openclaw/openclaw/issues/120315) | `/stop` 用户中止被误判为 Gateway 重启恢复，留下陈旧恢复状态 | OPEN，no-new-fix-pr | 无 |
| [#152965](https://github.com/openclaw/openclaw/issues/152965) | 热重载非通道插件会 dispose 所有通道插件，切断流并丢消息 | OPEN，no-new-fix-pr | 无 |
| [#153899](https://github.com/openclaw/openclaw/issues/153899) | Gateway drain 等待完整 `TimeoutStopSec`（5m30s），定期任务对已关闭资源反复触发 | OPEN | 无 |
| [#154066](https://github.com/openclaw/openclaw/issues/154066) | `plugins.allow` 每次启动重新生成，静默丢弃 `browser` 等插件，且 CLI enable 不生效 | OPEN，queueable-fix | 无 |
| [#153971](https://github.com/openclaw/openclaw/issues/153971) | Bedrock provider 因重复 `@smithy/core` 模块实例导致缓存失效，STS 轮换需重启才生效 | OPEN，queueable-fix | 无 |
| [#153859](https://github.com/openclaw/openclaw/issues/153859) | 单次 ACP `sessions_spawn` 产生两次 wake 事件与两条相同回复（2026.9.5 回归） | OPEN，source-repro | 无 |

### 🟡 P2（一般稳定性问题，节选）

- [#153246](https://github.com/openclaw/openclaw/issues/153246) — 插件构建临时目录 `openclaw-plugin-build-*` 每天增长 ~7.5 GB（CLOSED，今日关闭）
- [#153290](https://github.com/openclaw/openclaw/issues/153290) — 热重载移除上一代插件构建目录，导致活动 WhatsApp 通道 ENOENT（CLOSED）
- [#123360](https://github.com/openclaw/openclaw/issues/123360) — memory-core dreaming 第一阶段完成清理与后阶段竞争，多阶段夜间叙述被丢弃（CLOSED，diamond lobster）
- [#154016](https://github.com/openclaw/openclaw/issues/154016) — `claude-fable-5-1` 在原生 Anthropic 路径 HTTP 400，但独立 Claude Code CLI 同账号可用（CLOSED）

**小结**：今日关闭 31 条 Issue，但其中相当一部分为维护者标记 CLOSED（可能由于难以复现或已在 PR 中处理），实际修复验证仍待跟进。P0 集群显示更新链路是最薄弱环节；P1 中安全类问题（#132303）和消息丢失类问题（#152965、#153859）值得优先关注。

---

## 6. 功能请求与路线图信号

### 🔮 可能进入下一版本的功能

- **结构化工具搜索默认开启**（[#154068](https://github.com/openclaw/openclaw/pull/154068)，已合并）— 配合社区对 [#103659](https://github.com/openclaw/openclaw/issues/103659) 的反馈（per-agent/per-provider 覆盖），工具发现机制正在成为路线图重点。未来或支持按 agent/provider 细粒度配置。
- **云端原生 CUA 支持**（[#152060](https://github.com/openclaw/openclaw/pull/152060)，OPEN）— 在 macOS/Windows 云桌面中运行原生 Computer Use、Browser 和 Terminal，补足 crabbox 的非交互式桌面限制。
- **@everyone 共享聊天通知**（[#153907](https://github.com/openclaw/openclaw/pull/153907)，OPEN）— 为共享会话增加“通知所有有访问权成员”的能力，强化团队协作场景。
- **子会话显式本地放置**（[#153912](https://github.com/openclaw/openclaw/pull/153912)，OPEN）— `sessions_spawn` 支持 `placement: { kind: "local" }`，为调用方提供更明确的本地/云端路由控制。

### 💡 用户提案中值得关注的方向

- **插件拥有的投递取消**（[#145021](https://github.com/openclaw/openclaw/issues/145021)，P2，5 评论）— 允许插件取消已开始的 host-bound 投递，但保留 OpenClaw 对目标、请求者权限、媒体策略与原生传输的所有权。适合企业审批流场景。
- **Slack ingress 停滞超时暴露**（[#116547](https://github.com/openclaw/openclaw/issues/116547)，P2）— 建议将 `adoptionStallTimeoutMs`（默认 5 分钟）暴露为 Slack 通道配置，避免长时间 turn 后排在队列中的后续消息被静默 dead-letter。
- **Telegram 主题名可读性**（[#7406](https://github.com/openclaw/openclaw/issues/7406)，P2，4 评论）— 会话下拉框显示原始 key 而非人类可读主题名，2 月提出至今仍开放，属于低优先级 UX 改进。
- **每 agent/provider 的 toolSearch 覆盖**（[#103659](https://github.com/openclaw/openclaw/issues/103659)，CLOSED）— 社区希望 toolSearch 开关能按 agent/provider 差异化配置，而非全局单一开关。

---

## 7. 用户反馈摘要

### 😠 痛点：更新体验是最大不满来源

- **“五连败”**：#153704 用户连续 5 次尝试 2026.9.3→2026.9.5 更新，每次都在几乎相同时间点（~299s）死在迁移完整性检查，错误信息却指向 inference 路由，误导排查方向。用户情绪可见一斑。  
  👉 https://github.com/openclaw/openclaw/issues/153704
- **“AI 代为补充报告”**：#152884 用户坦言 ChatGPT 帮忙补充了技术细节，暗示报告门槛对普通用户偏高——但即便如此，更新死锁仍未被避免。  
  👉 https://github.com/openclaw/openclaw/issues/152884
- **自动更新回退后“稳定”**：#151467 用户报告 Oracle Cloud Linux 上自动更新触发死锁，回滚到 v6.33 后稳定，实际上是对新版本失去信心。  
  👉 https://github.com/openclaw/openclaw/issues/151467

### 😠 痛点：泄漏问题令人头疼

- **WAL 2.8GB**：#143524 用户手动执行 `wal_checkpoint(TRUNCATE)` 后两天内重新膨胀，说明检查点机制根本未按配置生效，用户被迫手工干预。  
  👉 https://github.com/openclaw/openclaw/issues/143524
- **/tmp 每天 7.5GB**：#153246 用户统计每个插件构建目录约 557 MB，含 164 个 `node_modules` 树，主要是 `@openai`/`@anthropic-ai` SDK 的重复拷贝。  
  👉 https://github.com/openclaw/openclaw/issues/153246
- **“内存增加毫无道理”**：#99659 用户对 companion app 连接后内存飙升并 OOM 表示不解，直言“I say it is a bug because the memory increase is just...”。  
  👉 https://github.com/openclaw/openclaw/issues/99659

### 🙂 积极：部分问题得到确认并修复

- #153246 今日已 CLOSED（虽然用户最初报告的清理问题与 #150580 修复前提不一致，详见 #153720）。
- #139239（iOS 图片附件挂起）已 CLOSED。
- #141799（嵌套作用域 narrowing 丢失读权限）已 CLOSED。

---

## 8. 待处理积压

### ⏳ 长期未关闭的高优先级 Issue

| 编号 | 创建时间 | 年龄 | 问题 | 当前状态 |
|---|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 2026-06-09 | 104 天 | Gateway 内存泄漏 → 15.5GB OOM | P1，29 评论，no-new-fix-pr |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | 84 天 | 僵尸进程累积 | P1，32 评论，no-new-fix-pr |
| [#94716](https://github.com/openclaw/openclaw/issues/94716) | 2026-06-19 | 94 天 | claude-cli 过期 UA 导致认证失败 | P1，7 评论，linked-pr-open |
| [#113983](https://github.com/openclaw/openclaw/issues/113983) | 2026-07-26 | 57 天 | 网关锁循环 + 信号插件加载失败 | P1，stale，needs-info |
| [#114211](https://github.com/openclaw/openclaw/issues/114211) | 2026-07-27 | 56 天 | Matrix 房间代理循环 & 陈旧会话重放 | P1，stale，needs-live-repro |
| [#120315](https://github.com/openclaw/openclaw/issues/120315) | 2026-08-07 | 45 天 | /stop 被误判为重启恢复 | P1，no-new-fix-pr |
| [#132303](https://github.com/openclaw/openclaw/issues/132303) | 2026-08-29 | 23 天 | tools.deny 对 claude-cli 无效（安全） | P1，needs-security-review |

### ⏳ 长期未合并的 PR

| 编号 | 创建时间 | 内容 | 状态 |
|---|---|---|---|
| [#110429](https://github.com/openclaw/openclaw/pull/110429) | 2026-07-18 | Comfy 工作流文件读取加 `workflowFileMaxBytes` 边界 | 已 ready，等待维护者 review |
| [#147440](https://github.com/openclaw/openclaw/pull/147440) | 2026-09-13 | 配置写入保留引用意图与文件所有权 | 等待 review，兼容性风险 |
| [#147821](https://github.com/openclaw/openclaw/pull/147821) | 2026-09-14 | 验证更新首跳配置保留 | 等待 review |
| [#151815](https://github.com/openclaw/openclaw/pull/151815) | 2026-09-18 | 任务状态通知 ACK 移出 Gateway 主线程 | 等待 review |

### ⚠️ 维护者提醒

- **#91588 和 #97616** 是社区呼声最高、积压最久的 P1 稳定性问题，分别涉及内存泄漏与僵尸进程累积，直接影响长跑部署。今日仍未见对应的 fix PR，建议维护者明确排期。
- **#132303 安全边界失效**（tools.deny 被忽略）已等待 23 天且标记 `needs-security-review`，在 AI agent 场景中属于高风险问题，建议优先处理。
- **更新链路 P0 集群**（#153704、#153882、#151467、#154141 等）虽然部分已关闭，但用户侧多为“撞墙后放弃升级”，真正的根因修复验证需在新版本中确认。

---

> **免责声明**：本日报基于 2026-09-21 抓取的 GitHub 数据自动生成，Issue/PR 状态以 GitHub 实时数据为准。标注 CLOSED 不代表已修复，可能为重复关闭、无法复现或已由某 PR 修复，请点击链接查看详情确认。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期：** 2026-09-21
**分析范围：** OpenClaw、NanoBot、ZeroClaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw 共 9 个项目


## 1. 生态全景

当前个人 AI 助手开源生态正处于**从单体聊天工具向多 Agent 协作平台演进的关键阶段**：以 OpenClaw 为核心枢纽，社区驱动的衍生项目（LobsterAI、CoPaw、NanoClaw 等）正在形成相互借鉴、协同演进的生态格局。各项目共同面临**更新链路稳定性**（多个 P0 问题）、**资源泄漏**（WAL 无界增长、/tmp 膨胀、RSS 飙升）与 **上下文信息保真度**（消息丢失、会话错乱）三大共性问题，同时不约而同地向多租户协作、协议兼容层（OpenAI Chat Completions）与安全审批机制（ApprovalManager、tools.deny）方向加速布局。整个生态呈现出高活跃度与高碎片化并存的特征——OpenClaw 单日 500 条 PR 动态、LobsterAI 24 小时内连发 4 个版本，但各项目间的技术路线差异正在拉大，生态统一接口与最佳实践仍有待形成。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | Issues（关闭） | PR 动态（待合并/已合并） | Release | 活跃度评估 | 健康度 |
|------|-------------------|---------------|------------------------|---------|-----------|--------|
| **OpenClaw** | 77 | 31 | 283 / 217 | 无（2026.9.5 修复周期） | 🔥 极高 | ⚠️ 中低——更新链路 P0 集群 + 资源泄漏积压，但响应速度极快 |
| **LobsterAI** | 2 | 1 | 7 / 5 | **4 个**（9.14–9.20） | 🔥 高 | ✅ 高——高速迭代且功能与清理并行 |
| **CoPaw** | 14 | 6 | 23 / 14 | **1 个**（v2.2.2-beta.3） | 高 | ⚠️ 中——beta 回归密集，但修复响应快 |
| **NanoBot** | 4（新增） | 0 | 19 / 37 | 无 | 高 | ✅ 高——PR 吞吐量大，社区协作积极 |
| **ZeroClaw** | 7 | 20 | 45 / 3 | 无 | 中高 | ⚠️ 中——S0 安全风险暴露，45 个 PR 待合并形成积压 |
| **NanoClaw** | 1（新增） | 0 | 2 / **38** | 无（v2.3.0 稳定期） | 中高 | ✅ 高——一次性清理 6.5 个月积压 PR，维护效率显著 |
| **PicoClaw** | 6 | 0 | 3 / 2 | 无 | 中等 | ⚠️ 中——功能合入停滞，老问题长期未解 |
| **IronClaw** | 0 | 0 | 4 / 2 | 无 | 低 | ✅ 平稳——依赖维护节奏，无异常 |
| **Moltis** | — | — | — | — | ⚪ 无活动 | — |

> **补充说明：** NanoClaw 的 PR 合并吞吐量（38 条）超过绝大多数同体量项目，且大量为历史遗留 PR，表明其在代码质量维护上采取了"集中还债"策略。OpenClaw 的 217 条合并/关闭量级在绝对数值上远超其他项目，但与其 500 条 PR 总量相比，相对吞吐仍显不足。


## 3. OpenClaw 在生态中的定位

**核心枢纽地位无可撼动**，但稳定性口碑正面临考验。

- **生态主导权：** OpenClaw 是当前生态的"内核"——LobsterAI 的持续发版直接围绕 OpenClaw 集成深度加固（hook 持久化 #2727、IM 热加载 #2721），NanoClaw 的迁移脚本对齐 OneCLI 健康检查端（#2287），可见多个项目实质上是在 OpenClaw 之上构建场景化产品。

- **社区规模断层领先：** 单日 108 条 Issue + 500 条 PR 的动态量级是第二梯队（NanoBot/ZeroClaw 约 50–60 条）的 5–10 倍，Issue 评论热度（WAL 问题 35 条评论）也远超其他项目。这既是生态繁荣的证明，也意味着问题发现速度和修复压力的同步放大。

- **技术路线差异：** 与 NanoBot（多 provider 偏好）、ZeroClaw（Rust/架构收敛路线）、IronClaw（Rust/WASM）相比，OpenClaw 更接近 Node.js 生态驱动的**全能型单体智能体运行时**——通过插件机制和结构化工具发现扩展边界，通过 Doctor 和更新机制保障自维护，但在更新链路（#153704 等 P0 集群）和资源边界管理（WAL/内存/RSS）上仍存在显著短板。

- **风险信号：** 2026.9.5 更新链路系统性故障（至少 9 条独立 P0 报告）是当前生态面临的最大不确定性。对于依赖 OpenClaw 上游能力的衍生项目来说，如果该问题不能在下个补丁版本根治，将直接影响其自身发版节奏和用户信任。


## 4. 共同关注的技术方向

以下方向在多个项目中独立涌现，反映出生态级共性需求：

### 4.1 更新链路与回滚机制（涉及：OpenClaw、NanoBot、NanoClaw、LobsterAI）
- **OpenClaw：** 9 条 P0 报告集中指向更新失败——Doctor 在 ~299s 固定时间死亡（#153704）、插件状态迁移死锁（#153882）、自升级死锁 + 回滚失败（#151467）。用户多次尝试后放弃升级，"撞墙后回滚"现象普遍。
- **NanoBot：** 正在引入 `nanobot update` 与 SHA-256 校验的私有 Bun 运行时引导（#5817）。
- **NanoClaw：** 升级流程修复 `ncl` 软链接安装问题（#2356）。
- **LobsterAI：** 每次发版配套 OpenClaw 兼容性修复，与上游更新深度耦合。

### 4.2 资源泄漏与可观测性边界（涉及：OpenClaw、NanoClaw、CoPaw、PicoClaw）
- **OpenClaw：** Agent SQLite WAL 无界增长至 2.8GB（#143524）、Gateway RSS 从 350MB 飙升至 15.5GB（#91588）、/tmp 每日泄漏 7.5GB（#153246）。
- **NanoClaw：** OpenCode 服务器进程组残留（#2152，已修复）；超大 JSONL 会话文件导致容器超时（#700，已修复）。
- **CoPaw：** ToolResultPruner 跳过媒体块导致 base64 无界累积撑爆上下文（#7853）。
- **PicoClaw：** 长会话下 Web UI 输入框卡顿（#3281）。

### 4.3 会话/上下文信息完整性（涉及：NanoClaw、OpenClaw、CoPaw、PicoClaw、NanoBot）
- **NanoClaw：** OpenCode 快照时序竞态导致回复丢失（#3463，~78ms 窗口）。
- **OpenClaw：** 会话恢复失败（#153606）、热重载切断流并丢消息（#152965）、单次 `sessions_spawn` 产生两条相同回复（#153859）。
- **CoPaw：** 会话丢失 + 模型配置丢失（#7724）、压缩后历史无法加载（#7884）。
- **NanoBot：** 临时聊天切换后消息丢失（#5837）、/stop 取消的 follow-up 重启后 Requeue（#5808）。

### 4.4 协议兼容层与生态互操作（涉及：ZeroClaw、NanoBot、PicoClaw、OpenClaw）
- **ZeroClaw：** OpenAI Chat Completions profile 已接受（#8603）——用户要求接入 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等现成工具链。
- **NanoBot：** 新增 Unifically 内置 provider（#5832）、Baizhi MCP 预设（#5830）、OpenRouter JEV client（#5825）。
- **PicoClaw：** 用户请求 "OpenAI Compatible" 自定义 provider 以接入 9Router 等自托管网关（#3366）。
- **OpenClaw：** 结构化工具搜索默认开启（#154068），配合 A2A 出站客户端（ZeroClaw #9106）等方向。

### 4.5 安全审批与边界控制（涉及：ZeroClaw、OpenClaw、CoPaw）
- **ZeroClaw：** **S0 安全风险**——无人值守 agent turns（cron/heartbeat/headless SOP）在无 ApprovalManager 时静默绕过审批（#10968）。这是今日生态中最严重的安全事件。
- **OpenClaw：** `tools.deny` 对 claude-cli 后端不生效，原生工具始终可用（#132303，安全漏洞已积压 23 天）。
- **CoPaw：** kimi-code ACP runner 绕过边界检查与破坏性命令检查（#7881）；qwenpaw-pet 插件破坏工具审批流（#7856）。

### 4.6 认证与凭据管理现代化（涉及：ZeroClaw、NanoBot、PicoClaw、LobsterAI、OpenClaw）
- **ZeroClaw：** OIDC provider 已合并（#10255），可插拔入站认证 RFC 已接受（#7141）。
- **NanoBot：** Microsoft delegated OAuth（#5609）、OAuth 失败体验改进（#5836）。
- **PicoClaw：** 修复 OAuth scopes 硬编码问题（#3378）。
- **LobsterAI：** xAI 认证凭据迁移至 SQLite 标准存储（#2675）。
- **OpenClaw：** Bedrock STS 轮换需重启才生效（#153971）。


## 5. 差异化定位分析

| 项目 | 核心定位 | 目标用户 | 技术架构关键差异 | 社区角色/定位 |
|------|---------|---------|----------------|-------------|
| **OpenClaw** | 全能型个人 AI 智能体运行时（"内核"） | 开发者、技术爱好者、企业 | Node.js 生态；Copilot 场景内置；插件系统 + 结构化工具搜索；Doctor 自维护 | 生态中心，被多个项目集成依赖 |
| **LobsterAI** | OpenClaw 桌面端商业化封装 | 终端消费者、企业客户 | Electron 桌面端；深度集成 OpenClaw hooks/状态迁移；商业化订阅体系（试用/优惠） | OpenClaw 的商业化前端 |
| **CoPaw** | 聊天 + 工具 + 多通道桌面/Web 客户端 | 个人及团队用户 | 桌面端 + Console WebUI；ReMeLight 记忆；DoomLoop 循环检测；多 Tab 终端；正向 Hub 多租户演进 | 高活跃，社区贡献密集 |
| **NanoBot** | 轻量级多 provider 智能体网关 | 开发者、自托管爱好者 | Bun 运行时（私有 Bun 引导）；多 provider 接入（OpenAI、xAI、NIM 等）；WebUI/TUI 双界面 | 简洁轻量，社区协作高效 |
| **ZeroClaw** | 多 Agent 编排与架构标准化 | 团队、企业级场景 | Rust 架构；RFC 驱动设计决策；OIDC 身份；A2A 出站协作；权威记忆存储分层 | 架构收敛导向，设计驱动 |
| **NanoClaw** | 渠道适配 + 技能生态 | 深度 IM 用户（WhatsApp/OpenCode） | WhatsApp 群聊上下文感知；OpenCode 进程管理；技能包（iCloud 等）；CI 自动化完善 | 渠道深度打磨型 |
| **PicoClaw** | 多语言/多平台渠道聚合 | 中国及泛亚用户 | 钉钉、QQ、IRC、Discord 等渠道；v0.11.0 转向 agentic web3 / module trust / ACP mesh | 渠道广度导向 |
| **IronClaw** | Rust/WASM 实验性智能体运行时 | Rust 技术社区 | Rust + WASM 组件模型（wasmtime/wit-parser）；Claude Code CI 集成 | 技术前沿探索，活跃度低 |
| **Moltis** | — | — | — | **24h 无活动**，需关注项目维护状态 |


## 6. 社区热度与成熟度

### 分层评估

| 阶段 | 项目 | 特征 |
|------|------|------|
| **快速迭代期** | OpenClaw、LobsterAI、CoPaw | 高频发版/大量 PR+Issue 流动；功能扩张与 bug 修复并行；用户基数大但稳定性风险高 |
| **质量巩固期** | NanoBot、NanoClaw | 合并吞吐量大，大量清理历史积压；功能方向明确（provider/渠道/SDK 一致性）；版本趋于稳定 |
| **架构收敛期** | ZeroClaw | 集中做 RFC 决策和架构标准化，实施管线充实（45 个 PR）但安全漏洞开始暴露 |
| **稳步维护期** | PicoClaw | 渠道覆盖完成、功能节奏放缓、老问题积压未解；v0.11.0 正在转向新方向 |
| **低活跃/停滞期** | IronClaw、Moltis | 依赖维护为主，功能/社区讨论几乎为零，需关注项目持续性 |

### 成熟度指标

- **社区规模（按讨论热度/评论量）：** OpenClaw（单 Issue 最大 35 条评论）> ZeroClaw（25 条）> CoPaw（31 条）> NanoBot（单 PR 讨论集中在自更新/竞态等）> PicoClaw（13 条）> NanoClaw（5 条以内）
- **维护响应速度：** CoPaw（多条 PR 当日提交/当日合入）、NanoClaw（一次性清理 6.5 个月积压）表现最优；OpenClaw 响应快但修复深度不足（多个 P0 关闭后无验证确认）；LobsterAI 发版节奏最紧凑（1–2 天/版本）。
- **社区贡献者深度：** LobsterAI（社区贡献 PR 直接改 main/openclaw 层代码）、NanoBot（用户发现问题数小时内自行修复 #5833/#5834）、CoPaw（贡献者提交功能等价双 PR #7886/#7887）展现了较深的社区参与度；IronClaw/Moltis 基本无外部贡献。


## 7. 值得关注的趋势信号

### 7.1 更新/回滚机制正在成为智能体运行时的"标配能力"
多个项目同时投入更新链路建设（OpenClaw 紧急修复、NanoBot 自更新流程、LobsterAI 每次发版同步适配），但 OpenClaw 的 P0 集群表明该领域仍有显著技术挑战。**AI 智能体开发者应将"可回滚的更新机制"作为产品基础能力而非事后补救**，并配套自动回滚、更新前完整性检查、失败后的诊断可观测性。

### 7.2 无人值守安全审批是最大的潜在风险敞口
ZeroClaw 的 S0 问题（cron/heartbeat/headless SOP 静默绕过审批）和 OpenClaw 的 `tools.deny` 失效（#132303）共同指向一个被普遍忽视的安全场景：**Agent 的自动触发路径与交互式路径使用了不同的安全模型，且无人值守路径往往更薄弱**。对于将 Agent 用于生产环境（定时任务、自动化 SOP）的团队，这是一个需要立即审视的合规与安全风险。

### 7.3 从单用户工具向多租户/团队协作快速演进
CoPaw Hub 多租户讨论（31 条评论）、OpenClaw 的 @everyone 共享聊天通知（#153907）、ZeroClaw 的多 Agent 生产化部署（#10968/#10970）、LobsterAI 的数字员工/能力市场 PR（#2726），均指向同一趋势：**个人 AI 助手正在突破"单用户单机"边界，向团队协作、多角色权限、资源隔离方向演进**。这是下一阶段生态增长的核心动力。

### 7.4 OpenAI 协议兼容层成为生态接入的事实标准
ZeroClaw 接受 Chat Completions profile、PicoClaw 用户要求 OpenAI-compatible provider、NanoBot 持续扩展 OpenAI 兼容路径的 provider，表明 **OpenAI SDK 已成为开发者工具链的"通用语"**。新项目若想被现有 AI 工具生态（Open WebUI、Aider、LangChain 等）接受，优先实现 OpenAI 兼容端点是最短路径。

### 7.5 资源可观测性需求上升——"数字感知"能力不足
用户在多个项目中提出 token 计数可视化（ZeroClaw #9619）、WAL 大小监控（OpenClaw #143524）、内存泄漏定位（OpenClaw #91588）、上下文预算感知（CoPaw #7884）等诉求。**智能体运行时需要为开发者提供资源占用的细粒度可观测接口（如历史修剪前后 token 数、每个插件的磁盘/内存贡献），否则"泄漏黑盒"将反复损害用户信任。**

### 7.6 渠道适配的"上下文保真度"成为差异化竞争点
NanoClaw 的 WhatsApp 发送者显示名缺失（#3858）、群 @提及检测（#2565）、OpenCode 竞态丢消息（#3463），CoPaw 的音频内容块兼容性（#7876），PicoClaw 的钉钉 SDK PANIC（#3382）——这些问题的本质是**多模态/多渠道信息在传入模型前的保真度损失**。在模型能力趋同的背景下，渠道层的"信息无损传递"能力将成为个人 AI 助手的核心竞争力。


## 附：给技术决策者的行动建议

1. **若你依赖 OpenClaw：** 2026.9.5 版本更新链路存在系统性风险，建议在生产环境**暂缓自动更新**，等待紧急补丁验证后再升级；同时关注 WAL/内存资源边界，提前设置监控告警。
2. **若你选择自托管 Agent 平台：** 将 **ZeroClaw #10968（无人值守审批绕过）、OpenClaw #132303（tools.deny 失效）** 作为安全评估必查项。
3. **若你正在选型生态位：** OpenAI 协议兼容 + 团队/多租户能力 + 资源可观测性是决定未来 6 个月竞争力的三个关键维度。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-21

## 1. 今日速览

过去 24 小时 NanoBot 项目活跃度处于高水平，共发生 56 条 PR 动态（其中 37 条已合并/关闭、19 条待合并）和 4 条 Issue 更新。核心维护者之一 @chengyongru 今日提交/参与超过 6 个 PR，覆盖 WebUI 重构、TUI 修复、exec 安全防护、subagent 执行架构调整等方向，项目推进节奏明显加快。值得关注的是，合并流集中于 WebUI 事件协议迁移收尾（#5823）与新增/优化 provider 生态（Unifically、Baizhi），同时涌现出两个值得警惕的架构级 bug：API 会话路由错乱（#5838）和 SSE reasoning 事件丢失（#5833/#5834）。

## 3. 项目进展

今日共有 37 个 PR 被合并或关闭，展示了以下关键成果：

- **WebUI 事件协议迁移正式收尾**（[#5823](https://github.com/HKUDS/nanobot/pull/5823)）：删除遗留消息投影路径，`/webui-thread` 无条件返回 canonical events，为后续 WebUI 功能开发扫清技术债。
- **新增两个 provider 生态**：
  - Unifically 内置 provider（[#5832](https://github.com/HKUDS/nanobot/pull/5832)），基于 OpenAI 兼容路径接入，同 Novita 的做法。
  - Baizhi Agent Toolkit MCP 预设（[#5830](https://github.com/HKUDS/nanobot/pull/5830)），用户在 WebUI 中可一键配置 MCP 工具。
- **OAuth 重新认证体验改进**（[#5836](https://github.com/HKUDS/nanobot/pull/5836)）：区分授权失败与临时网络错误，授权失败时明确引导用户"Sign in again"。
- **CI 契约修复**（[#5835](https://github.com/HKUDS/nanobot/pull/5835)）：修复 response-source 测试在 context compaction 要求下缺失回调导致的 CI 失败，保证主干构建恢复健康。

整体上，项目在 WebUI 基础架构清理、provider 覆盖面和认证流程三方面均有实际推进。虽无新版本发布，但代码库在多条战线上均有合并动作。

## 4. 社区热点

- **[#5838 fix(api): route each session_id to its own chat](https://github.com/HKUDS/nanobot/pull/5838)**：每一条 OpenAI 兼容 API 请求都一律使用 `chat_id="default"`，导致处理会话与实际路由上下文不一致。该问题波及所有使用兼容 API 的第三方应用，影响面大，是今日最受关注的修复型 PR 之一。
- **[#5833 + #5834 SSE reasoning events 丢失及修复](https://github.com/HKUDS/nanobot/pull/5834)**：Issue 由 @remote-controlled-man 提交，指出 SSE 原始消费者丢弃 `response.reasoning_text.*` 事件，而 SDK 消费者能正常处理。作者本人随后在同一时段提交了对应修复 PR #5834，从问题发现到给出修复仅数小时，展现出高响应度的社区协作。
- **[#5817 feat: add stable and source self-update flows](https://github.com/HKUDS/nanobot/pull/5817)**：引入 `nanobot update`、`--dev`/`--update-dev` 源码更新、SHA-256 校验的私有 Bun 运行时引导等能力，涉及部署体验的大幅提升，讨论空间大，目前标注 conflict 待处理。

## 5. Bug 与稳定性

按严重程度排序：

- **[#5833（高）SSE consumer 丢弃 reasoning_text 事件](https://github.com/HKUDS/nanobot/issues/5833)**：影响 xAI Grok 与 OpenAI Codex 两个 provider 的原始 SSE 消费路径，推理文本无法透传。已有修复 PR [#5834](https://github.com/HKUDS/nanobot/pull/5834) 待合并。
- **[#5838（高）API 会话路由错乱](https://github.com/HKUDS/nanobot/pull/5838)**：所有 session_id 都路由到 `api:default` 上下文，导致子代理、定时任务、消息工具目标等全部错位。修复 PR 已提交，待合并。
- **[#5403（中高）token 估算偏差导致上下文合并不触发](https://github.com/HKUDS/nanobot/pull/5403)**：本地 tiktoken 估算较 API 实际计数低 30-50%，会话超出上下文窗口时 consolidation 可能被跳过。P1 优先级，已提交超过一个月，目前 conflict 状态，需维护者介入。
- **[#5808（中）WebUI follow-ups 在网关重启后被错误恢复](https://github.com/HKUDS/nanobot/issues/5808)**：`/stop` 取消的 follow-up 仍留在恢复日志中，重启后 Requeue。已关闭，但需注意是否有对应修复覆盖。
- **[#5837（中）临时聊天导航中丢失消息](https://github.com/HKUDS/nanobot/pull/5837)**：在回复进行中切换会话后，临时聊天可能回到欢迎屏幕。修复 PR 已提交。
- **[#5807（中）Discord 停止时 reaction 状态未清理](https://github.com/HKUDS/nanobot/pull/5807)**：延迟工作表情任务与 pending-reaction 残留，生命周期边界清理不彻底。修复 PR 已提交。
- **[#5769（中）NIM 超时错误无法触发 fallback](https://github.com/HKUDS/nanobot/pull/5769)**：依赖异常类名匹配超时，NIM 的 `RuntimeError: timed out after 300s` 被漏判。修复 PR 已提交，标记 conflict。
- **[#5829（低）TUI Markdown 链接不可点击](https://github.com/HKUDS/nanobot/pull/5829)**：依赖升级 @opentui/core 修复，含回归测试。
- **[#5605（低）IMAP 过早标记 \Seen](https://github.com/HKUDS/nanobot/pull/5605)**：未实际投递给 agent 的消息即标记为已读，可能造成邮件丢失。修复 PR 已提交。

## 6. 功能请求与路线图信号

- **[#5524 WebUI 完成通知铃声](https://github.com/HKUDS/nanobot/issues/5524)**：带 `good first issue` 标签，适合新贡献者，需求描述完整——默认关闭、设置项开关、短促提示音。纳入下个版本的可能性较高，但依赖 WebUI 基础设置能力。
- **[#5509 基于 FTS5 索引优化会话搜索](https://github.com/HKUDS/nanobot/issues/5509)**：会话量大时 JSONL 全量扫描慢，提案建 SQLite FTS5 镜像索引异步构建。性能优化方向明确，与项目大规模使用场景匹配。
- **[#5831 WebUI 降低已完成 turn 的 UI 噪音](https://github.com/HKUDS/nanobot/pull/5831)**：在等待回复时隐藏持久 footer，改为 hover/focus 触发，保留触屏、键盘、减少动效偏好。若合并将进一步打磨 WebUI 交互质感。
- **[#5811 subagent 执行改为私有会话](https://github.com/HKUDS/nanobot/pull/5811)**：移除独立 subagent runner，统一走 `AgentLoop` 与压缩路径，是 agent 架构层面的一次收敛，尽管有 conflict 但方向值得关注。
- **JEV 客户端与 shell 防护**：[#5825](https://github.com/HKUDS/nanobot/pull/5825) 提供可复用 OpenRouter JEV client；[#5815](https://github.com/HKUDS/nanobot/pull/5815) 在 exec 前通过 Decisions API 做预检，默认关闭。两者配合可能形成未来的"安全执行"能力组合。
- **[#5609 Microsoft delegated OAuth（Office365/Outlook）](https://github.com/HKUDS/nanobot/pull/5609)**：为 email 通道加入 OAuth2 授权码流程，应对微软弃用基础认证的长期趋势，功能完整度高，若合并将显著降低企业邮箱接入门槛。

## 7. 用户反馈摘要

- **等待体验是当前 WebUI 用户的主要痛点**：用户 @yrxeva 提交了两个问题（#5524 完成铃声、#5509 搜索性能），核心诉求是"任务长时间执行时，用户不知道何时结束"。同方向的 [#5831](https://github.com/HKUDS/nanobot/pull/5831) 也在改善完成后的界面反馈，说明这一体验问题在用户侧感知明显。
- **开发者对 SDK 与 SSE consumer 行为一致性有期待**：Issue #5833 由 @remote-controlled-man 发现并自行修复，反映出社区参与者会主动对比不同消费路径的处理差异，这类"协议一致性"问题容易被社区自行消化，但也在提醒项目组需在公共接口层建立统一测试基线。
- **临时会话数据易丢失让用户困扰**：PR #5837 的摘要透露用户反馈"临时聊天切换后丢失消息并显示欢迎屏幕"，尤其发生在回复进行中或 workbench 卸载面板时，这是 WebUI 日常使用中的高复现场景。
- **OAuth 失败时的引导不足**：PR #5836 侧面反映出用户在授权失败时被卡在模型搜索界面，没有明确的重新登录入口，只能看到模型列表消失，交互上令人困惑。
- **provider 接入积极性高，且多为贡献者自己提交**：Unifically（由 @unifically-dev 自己提交）、Baizhi（由 @ct-jaryn 提交）等新 provider 均由团队或相关方主动贡献，社区对扩展 NanoBot 模型生态持开放合作态度。

## 8. 待处理积压

以下 PR/Issue 开放时间较长或状态停滞，建议维护者优先关注：

- **[#5403 fix(memory): use API-reported prompt tokens（P1，8月16日提交）](https://github.com/HKUDS/nanobot/pull/5403)**：修复 token 估算偏差导致 consolidation 不触发的长期 bug，已超一个月未合并，当前冲突状态，需解决冲突后尽快合入。
- **[#5367 feat(webui): localize agent activity（8月13日提交）](https://github.com/HKUDS/nanobot/pull/5367)**：WebUI 活动标签本地化覆盖 10 种语言，已开放超过五周，标注 conflict，需要解决冲突或给出明确反馈。
- **[#5609 feat(email): Microsoft delegated OAuth（8月30日提交）](https://github.com/HKUDS/nanobot/pull/5609)**：功能完整且应对微软弃用基本认证的期限压力，已在多个 PR 中被依赖或参考，建议优先安排 review。
- **[#5605 fix(email): only mark \Seen on messages that are actually delivered（8月30日提交）](https://github.com/HKUDS/nanobot/pull/5605)**：邮件可能被错误标记为已读导致遗漏，与 #5609 同源同一作者，可以联动处理。
- **[#5509 feat: session search performance with FTS5 index（8月24日提交）](https://github.com/HKUDS/nanobot/issues/5509)**：性能优化需求，开放近一个月仅 1 条评论，期待维护者给出技术选型反馈。

---

*本日报数据来源于 GitHub HKUDS/nanobot 仓库 2026-09-20 至 2026-09-21 期间公开活动。*

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# ZeroClaw 项目动态日报 — 2026-09-21

## 1. 今日速览

过去 24 小时项目保持高活跃度：共更新 27 条 Issue（20 条关闭、7 条新开/活跃）与 50 条 PR（45 条待合并、3 条合并/关闭、2 条待定）。今日无新版本发布。值得关注的是，20 条关闭的 Issue 绝大多数为 `status:accepted` 的 RFC 设计提案（涵盖 OpenAI Chat Completions 兼容、Gemini Live 语音通道、A2A 出站客户端等方向），标志着项目在架构决策层面集中收敛。然而，今日新提交的 [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) 被标记为 **S0 安全风险**——无人值守的 agent turns 在无 ApprovalManager 的情况下运行，需社区高度关注。整体来看，项目设计推进迅速、实施管线充实，但安全性问题与 45 个待合并 PR 形成了一定的维护压力。

## 3. 项目进展

今日有 3 个 PR 合并/关闭，另有 20 个 RFC 设计提案关闭（绝大多数已接受），项目在以下几个方向取得实际进展：

**安全与身份**
- [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)（已合并）— OIDC `<alias>` token 验证 provider，为 #8289 OIDC 里程碑 stage 5 的实现，通过 RFC 9068 类型化访问令牌的严格验证，推进了“身份与访问”路线图。
- [#9830](https://github.com/zeroclaw-labs/zeroclaw/pull/9830)（已合并）— 将完整浏览器自动化改为显式 opt-in，不再与 `browser_open` 共用默认开关，修复了 headless 常驻守护进程可能被强制加载完整浏览器工具的安全隐患。
- 另有 [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428)（待合并）要求 Bluesky 与 Reddit 频道启用发送者授权，以及 [#9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977)（待合并）限制文件系统变更到工作区内，均属安全加固方向。

**运行时可观测性**
- [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)（已合并）— 在 history-trim 事件中暴露 token 计数（修剪前后），解决了 [#9619](https://github.com/zeroclaw-labs/zeroclaw/issues/9619) 中用户无法感知上下文预算耗尽程度的问题。

**架构决策（RFC 接受）**
- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — ZeroClaw Chat Completions profile（OpenAI 协议兼容）
- [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) — Gemini Live 实时语音通道
- [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) — 权威记忆存储与可选 enrichment 连接器分离
- [#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) — 会话历史与长期记忆彻底分离
- [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — 可插拔入站认证与规范主体
- [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) — `KeySource` trait 抽象
- [#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) — A2ATool（A2A 出站客户端）
- 以及 [#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050)、[#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)、[#9975](https://github.com/zeroclaw-labs/zeroclaw/issues/9975)、[#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330)、[#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142)、[#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598)、[#9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998)、[#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)、[#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)、[#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621)、[#10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222)、[#9702](https://github.com/zeroclaw-labs/zeroclaw/issues/9702) 等十余项 RFC 正式被接受。这些设计决策的批量落地意味着项目在 Chat Completions 兼容性、记忆体系分层、安全架构（OIDC/密钥管理）、语音通道、A2A 协作等方向已形成明确实施蓝图。

**加速关注点**：45 个 PR 待合并，其中多个 `size:XL` 级 PR（如 [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) 生命周期协调、[#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596) ACP 分页、[#10931](https://github.com/zeroclaw-labs/zeroclaw/pull/10931) Windows 日志修复）已停留超过一周，合并速度可能成为下一个瓶颈。

## 4. 社区热点

**🔥 最热 Issue（按评论数）**

| Issue | 评论数 | 状态 | 核心诉求 |
| --- | --- | --- | --- |
| [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | 25 | 已关闭 | 提供 OpenAI Chat Completions 兼容端点，让 Open WebUI、LobeChat、Continue.dev、Aider、LangChain、OpenAI SDK 等客户端原生接入 ZeroClaw agent |
| [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) | 22 | 已关闭 | 新增实时语音转语音（speech-to-speech）通道，优先支持 Gemini Live，打造实时语音对话体验 |
| [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) | 20 | 已关闭 | 将权威记忆存储与可选的 enrichment 连接器（如 Lucid、Qdrant）解耦，避免存储方案绑定 |
| [#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) | 17 | 已关闭 | 将对话历史与 agent 长期记忆彻底分离，当前实现中二者在重要路径上仍被混用 |
| [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | 17 | 已关闭 | 可插拔入站认证与规范主体（OIDC、多 provider 认证），面向身份与访问里程碑 |

**背后的信号**：社区最强烈的声音集中在 **“生态兼容”**（OpenAI 协议接入）与 **“记忆/存储架构清晰化”** 两大主题。前者说明用户希望将 ZeroClaw 嵌入已有的 AI 工具链，而非另起炉灶；后者则反映了多 agent、长会话场景下记忆语义不明的真实痛点。此外，今日新开的 [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968)（S0 安全）与 [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)、[#10969](https://github.com/zeroclaw-labs/zeroclaw/issues/10969)（主机级资源控制与抖动窗口）均指向 **“多 agent 生产化部署”** 这一方向——用户正在把 ZeroClaw 用于真实的多 agent 生产环境。

## 5. Bug 与稳定性

**🔴 S0 — 数据丢失/安全风险**
- [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968)（新开，`p1`）— 无人值守的 agent turns（cron、heartbeat、headless SOP、spawn_subagent）在无 `ApprovalManager` 的情况下运行，导致 risk-profile 工具审批机制对无人值守路径**静默失效**。这是今日最严重的问题，涉及 `agent::run` 仅对 `interactive=true` 才构建 `ApprovalManager` 的实现缺陷。**尚无对应 fix PR，需优先响应。**

**🟠 S2 — 主要功能受损/行为退化**
- [#10975](https://github.com/zeroclaw-labs/zeroclaw/issues/10975)（新开，`p1`）— WhatsApp Web 频道入站图片未被下载，agent 收到的是字面量文本 `[Image]`，导致视觉能力完全不可用。**尚无 fix PR。**
- [#9619](https://github.com/zeroclaw-labs/zeroclaw/issues/9619)（已关闭，`p2`）— 历史修剪通知缺少修剪前后的 token 计数，用户无法判断是否达到上下文预算上限。**已由 PR [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) 修复并合并。**

**🟡 其他稳定性关注**
- [#10969](https://github.com/zeroclaw-labs/zeroclaw/issues/10969)（新开，`p2`，风险:medium）— cron 与 heartbeat 派发缺少抖动窗口，同表达式调度的多个 agent 会在同一瞬间触发，造成资源尖峰。属于渐进式稳定性问题，尚无 PR。
- [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)（新开，`p2`，风险:high）— 缺少主机级资源上限，多 agent 机器在过载时退化表现为稳定性问题而非延迟增加。

今日 Bug 修复方面有 2 个 PR 关闭（`#9713`、`#9830`）与 1 个 PR 合并（`#10255`）。但从待合并队列看，仍有多个高优安全性修复卡在审查中，如 [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428)（Bluesky/Reddit 发送者授权）、[#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381)（host launcher 路径解析）、[#9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977)（文件系统变更限制）等，建议维护者优先审查合并。

## 6. 功能请求与路线图信号

**新提交的功能性请求（今日新增）**
- [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)（`RFC`, `p2`, `risk:high`）— 主机级准入控制与每 agent 资源上限，面向“单机多 agent”生产场景。与近期 #10968 同源，均属多 agent 规模化落地的必备能力。
- [#10969](https://github.com/zeroclaw-labs/zeroclaw/issues/10969)（`Feature`, `p2`, `risk:medium`）— cron/heartbeat 派发增加可配置抖动窗口，避免批量 agent 在一个瞬间同时触发。属于调度健壮性的务实改进。

**已被接受、极可能进入下一版本的 RFC（今日关闭）**
- **协议兼容层**：[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) OpenAI Chat Completions profile —— 预计将开辟一个 `/api/*` 兼容路由，使现有 OpenAI 生态工具直接对接 ZeroClaw agent，是本周路线图上最重量级的信号。
- **语音交互**：[#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) Gemini Live 实时语音通道 —— 采用 broker contract 设计，作为可选功能 gate，面向实时语音对话场景。
- **记忆体系重构**：[#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) 与 [#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) 共同指向记忆分层：权威存储与 enrichment 连接器解耦、会话历史与长期记忆分离。这将是 v0.9.x 在记忆语义上的重要架构调整。
- **身份认证**：[#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) 可插拔入站认证与规范主体 —— 配合已合并的 [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)（OIDC provider），身份与访问里程碑正在快速推进。
- **A2A 协作**：[#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) A2ATool 出站客户端 —— 让 ZeroClaw agent 能主动调用外部 A2A 协议 agent，有望开启更广泛的 agent 间协作生态。

**判断**：这些 RFC 集中在“架构收敛与外部生态打通”两条主线上。下一版本（预计 v0.9.x）可能同时包含 Chat Completions 兼容端点、Gemini Live 语音通道、A2A 出站工具、记忆分层改造等多项重量级能力。建议关注 [#10330](https://github.com/zeroclaw-labs/zeroclaw/issues/10330)（Accepted RFC implementation-home index）跟踪这些 RFC 的实现落点。

## 7. 用户反馈摘要

- **对 OpenAI 协议兼容的强烈期待**：用户在 [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) 中详细列出了 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等客户端，说明真实用户场景中已有大量基于 OpenAI SDK 的既有工具链，他们希望在 ZeroClaw 与这些工具之间建立“零改造”的接入路径。这是目前社区呼声最高的功能需求。
- **语音交互场景真实存在**：讨论者在 [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) 中期待实时语音对话能力，且关注点落在“实时”和“双向”上——不只是发送语音，而是真正的 speech-to-speech 对话体验。
- **记忆语义混乱影响实际使用**：[#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) 用户指出“文档把 session history 和 long-term memory 描述为不同生命周期概念，但实现仍混在一起”——这反映了文档与实现不一致对用户造成的困扰，尤其是当用户基于文档做二次开发时。
- **安全机制可能被静默绕过**：[#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) 提交者指出 cron/heartbeat/headless SOP 等无人值守路径完全绕过审批机制，且**没有警告日志**——这意味着用户可能以为自己的安全策略生效，但实际上并未执行。这类“静默失效”比显式报错更危险。
- **渠道多而不精的问题**：今日 [#10975](https://github.com/zeroclaw-labs/zeroclaw/issues/10975) 报告了 WhatsApp Web 频道图片消息不被下载的问题——渠道覆盖广是 ZeroClaw 的优势，但渠道功能的完成度（如多模态消息支持）是用户真正在意的体验细节。
- **上下文预算可视化不足**：在 [#9619](https://github.com/zeroclaw-labs/zeroclaw/issues/9619) 中，用户反馈 history-trim 通知只有结构计数（多少轮、多少条），缺少 token 数值，难以判断上下文消耗与模型窗口的关系。该问题已随 `#9713` 修复。

## 8. 待处理积压

**⚠️ 长期未合并的 PR（按停留时长）**

| PR | 标题 | 创建 | 阻塞原因 |
| --- | --- | --- | --- |
| [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) | feat(security): canonical sandbox_policy schema | 2026-06-17 | `needs-author-action`，等待作者响应 |
| [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) | fix(anthropic): support stored OAuth profiles | 2026-07-26 | `needs-author-action`，等待作者响应 |
| [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134) | fix(plugins): admit exact component payload bytes | 2026-07-18 | 待维护者审查 |
| [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841) | fix(sop): drive headless SOP runs | 2026-08-08 | `needs-author-action`，等待作者响应 |

**⚠️ 长期未关闭的 Tracker / RFC**
- [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)（6月24日创建）— OIDC 里程碑 tracker：今日 #10255 合并后 stage 5 已完成，但 tracker 仍 open，建议维护者同步更新阶段状态。
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（7月4日创建）— 维护者决策队列 tracker：持续活跃，但仍有大量 RFC 排队等待决策。
- [#10330](https://github.com/zeroclaw-labs/zeroclaw/issues/10330)（8月25日创建）— Accepted RFC implementation-home index：作为索引 tracker，今日大量 RFC 被接受后，需及时更新映射关系。

**风险提示**：今日 45 个待合并 PR 中，有多个安全相关 PR 已停留 2 周以上（如 [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428)、[#9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977)、[#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381)）。结合今日新增的 S0 安全问题（[#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968)），建议维护者优先审查安全类 PR，避免安全缺陷长时间暴露。

---

*本日报由 AI 助手基于 GitHub 公开数据自动生成，数据截至 2026-09-21。*

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报 — 2026-09-21

## 今日速览

过去 24 小时仓库共产生 **11 项动态**（6 个 Issue、5 个 PR），整体活跃度中等，无新版本发布。最值得关注的是稳定性议题：#3382 确认钉钉网关在 v0.3.1 中仍存在流 SDK 重连时的 PANIC，且与已关闭的 #973 同源。开发侧，v0.11.0 冲刺计划 PR 快速关闭/合入，项目已开始将路线图固化为设计文档，进入下一阶段规划通道。社区讨论热度集中在 Web UI 长对话卡顿（#3281）与 IRC 长消息支持（#3287）两个老问题上，均有待维护者推进。

## 项目进展

过去 24 小时合并/关闭的 PR 以文档和规划类为主，功能性代码合并暂时停滞。

- **#3383**（docs: v0.11.0 sprint plan — agentic web3, module trust, ACP/mesh depth）— @stpinkie 于 09-20 创建同日关闭，大概率已合入。该 PR 为 v0.11.0 冲刺（Tracks 67–75）建立持久设计记录，包含排序 DAG、关键决策、逐轨道文件映射、实现时验证检查清单与风险登记表。这是项目首次以正式文档形式定义下一阶段技术方向，标志着规划层面向可执行里程碑的落地。
  https://github.com/sipeed/picoclaw/pull/3383

- **#3367**（docs: add Pilot MCP setup example）— @TeoSlayer，已关闭。为原生 MCP CLI 快速入门补充了 Pilot Protocol 设置命令及健康检查指令。若确认为合入，将改善用户接入 MCP 生态的文档体验。
  https://github.com/sipeed/picoclaw/pull/3367

当前仍有 3 个功能性 PR（#3378、#3354、#3353）在待合并队列中，团队应关注代码合入节奏，避免功能交付被文档任务挤压。

## 社区热点

- **#3287 [Feature] IRC 长消息支持** — 13 条评论，今日讨论量第一。IRC 默认 512 字节限制使长消息被客户端拆分，用户希望 PicoClaw 将片段组装为完整语义消息。已有对应实现 PR #3354 待审。
  https://github.com/sipeed/picoclaw/issues/3287

- **#3281 [BUG] Web UI 历史稍长时输入卡顿** — 12 条评论、2 个 👍，已开放 2 个月。用户对 Long Conversation 场景下的输入性能意见集中，该问题直接影响日活体验。
  https://github.com/sipeed/picoclaw/issues/3281

- **#3366 [Feature] OpenAI 兼容提供商** — 4 条评论。用户希望加入 "OpenAI Compatible" 自定义 provider 以接入自托管路由网关（如 9Router），反映出自部署用户对开放生态的强烈需求。
  https://github.com/sipeed/picoclaw/issues/3366

- **#3369 [Feature] OpenCode Go 会话头支持** — 2 条评论、2 个 👍，已关闭。曾希望为 OpenCode Go 请求附加 `x-opencode-session` 会话头。关闭原因需从提交记录进一步确认，若已实现则值得在版本发布说明中注明。
  https://github.com/sipeed/picoclaw/issues/3369

## Bug 与稳定性

按严重程度降序排列：

1. **高 — 钉钉网关流 SDK 重连 PANIC 在 v0.3.1 仍可复现（#3382）**  
   用户 @HenryLoveMiller 在最新版 v0.3.1（commit 2cf030d2）复现了 #973 报告的 "send on closed channel" 崩溃（client.go:161），涉及上游 `dingtalk-stream-sdk-go` v0.9.1。该 Issue 已存在但无对应修复 PR，属于稳定性回归隐患，建议优先排查并跟进上游 SDK 重连逻辑。
   https://github.com/sipeed/picoclaw/issues/3382

2. **中 — Web UI 长对话历史下输入框卡顿（#3281）**  
   一个 session 内历史消息增多后，输入框操作出现明显延迟。该问题已存在两个月，影响重度用户日常使用，当前没有 PR 认领。
   https://github.com/sipeed/picoclaw/issues/3281

3. **低（已关闭）— QQ/钉钉通宵连接后 PANIC（#973）**  
   原 Issue 今日关闭，但 #3382 的出现表明底层问题可能并未真正消除，建议维护者复核关闭依据，避免重复 reopen。
   https://github.com/sipeed/picoclaw/issues/973

## 功能请求与路线图信号

- **OpenAI 兼容提供商（#3366）**：用户诉求为在现有 OpenAI provider 基础上允许自定义 endpoint，技术实现成本低，且与 v0.11.0 强化“模块信任/ACP 深度”的方向可能形成互补，大概率会纳入近期规划。
  https://github.com/sipeed/picoclaw/issues/3366

- **IRCv3 多行消息组装（#3287 ↔ PR #3354）**：PR 已提供完整实现，依赖 `batch`、`message-tags`、`draft/multiline` 能力协商，社区等待合入的意愿较强。
  https://github.com/sipeed/picoclaw/issues/3287
  https://github.com/sipeed/picoclaw/pull/3354

- **OAuth scopes 正确传递（PR #3378）**：修复 `RefreshAccessToken` 硬编码 `"openid profile email"` 而覆盖 provider 自定义 scopes 的问题。属于认证正确性修复，影响所有 OAuth 渠道。
  https://github.com/sipeed/picoclaw/pull/3378

- **v0.11.0 路线图关键词**：来自 PR #3383 的设计文档显示，下一阶段将聚焦 **agentic web3、module trust、ACP/mesh depth**，说明项目正从聊天工具向 Agent 互操作与 Web3 场景扩展。
  https://github.com/sipeed/picoclaw/pull/3383

## 用户反馈摘要

- **Web UI 性能是重度用户的真实痛点**：#3281 的反馈指出，只要单个会话历史稍长，输入框就会稳定复现卡顿，而非偶发；该反馈已经积累了 2 个 👍，用户等待修复时间已超过 60 天。
  https://github.com/sipeed/picoclaw/issues/3281

- **IRC 长消息被拆分导致语境丢失**：#3287 的用户明确说明，受 512 字节协议限制，长消息进入 PicoClaw 时被分割为多条，破坏了消息的整体性；这对依赖 IRC 做技术讨论的用户是实际沟通障碍。
  https://github.com/sipeed/picoclaw/issues/3287

- **自托管用户希望更强的 provider 可配置性**：#3366 的提出者认为"直接从 OpenAI provider 复制一份即可实现"，显示出用户对现有 provider 架构的扩展预期，也间接说明接入第三方网关的意愿较强。
  https://github.com/sipeed/picoclaw/issues/3366

- **钉钉用户对"修而未愈"的状态表达了不信任感**：#3382 的用户特意在 v0.3.1 上复现并提交报告，说明其愿意配合反馈，但也反映出此前修复效果未达预期。
  https://github.com/sipeed/picoclaw/issues/3382

## 待处理积压

以下事项长期未闭环，建议维护者优先关注：

- **PR #3354 `feat(irc): assemble IRCv3 multiline messages`** — 自 08-31 待合并，约 3 周；对应高讨论量 Issue #3287，请尽快进入评审。
  https://github.com/sipeed/picoclaw/pull/3354

- **PR #3353 `fix(channels): bound tool feedback animations`** — 自 08-31 待合并，约 3 周；修复动画生命周期导致频道消息被无限编辑的问题，风险较低。
  https://github.com/sipeed/picoclaw/pull/3353

- **PR #3378 `fix(auth): use configured scopes`** — 自 09-12 待合并，已 9 天；认证相关修复，建议至少同下个补丁版本一起发布。
  https://github.com/sipeed/picoclaw/pull/3378

- **Issue #3281 Web UI 输入卡顿** — 自 07-21 开放，已 62 天；社区讨论热度持续，急需官方排期。
  https://github.com/sipeed/picoclaw/issues/3281

- **Issue #3287 IRC 长消息支持** — 自 07-22 开放，已 61 天；随时可以随 PR #3354 的合入而关闭，等待维护者推进。
  https://github.com/sipeed/picoclaw/issues/3287

- **Issue #3366 OpenAI 兼容提供商** — 自 09-04 开放，已 17 天；无维护者回应，建议在 v0.11.0 规划中明确是否接受。
  https://github.com/sipeed/picoclaw/issues/3366

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-21

## 1. 今日速览

过去 24 小时 NanoClaw 项目在 PR 处理上异常活跃，共合并/关闭 38 条 Pull Request，另有 2 条待合并——显示项目维护者对社区贡献的响应速度极快，整体合并吞吐量处于高位。相比之下，Issue 侧仅新增 1 条（类型为 Bug），无关闭记录，Issue 处理速度略有滞后。无新版本发布，当前主版本停留在 v2.3.0。值得关注的是：今日合并的 PR 中大量为历史遗留 PR（最早可追溯至三月），说明项目可能正在进行一轮积压清理；同时有一条新的 WhatsApp 显示名称 Bug 上报（#3858），与近期多条 WhatsApp 相关修复 PR 形成呼应，表明该渠道仍是社区关注重点。

---

## 3. 项目进展

> 注：2026-09-21 无新版本发布，本节聚焦今日合并/关闭的关键 PR。

### 核心通道与集成：WhatsApp/OpenCode 持续加固

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#2565](https://github.com/nanocoai/nanoclaw/pull/2565) | fix(whatsapp): detect group @-mentions via contextInfo.mentionedJid | 已关闭 | 完善 WhatsApp 群组 @提及检测逻辑，从 `contextInfo.mentionedJid` 中识别提及行为，提升群聊场景指令响应准确率 |
| [#746](https://github.com/nanocoai/nanoclaw/pull/746) | fix(whatsapp): prevent service restart hammering on auth failure | 已关闭（曾标记 Blocked） | 修复微信授权失败后服务反复重启的问题，避免"重启风暴"对部署稳定性的冲击 |
| [#2152](https://github.com/nanocoai/nanoclaw/pull/2152) | fix(opencode): kill server process group + configurable IDLE_TIMEOUT_MS | 已关闭 | 解决 OpenCode 服务器进程树残留问题，并允许用户通过 `IDLE_TIMEOUT_MS` 自定义空闲超时，增强可控性 |
| [#2153](https://github.com/nanocoai/nanoclaw/pull/2153) | fix(opencode): use native instructions config to load CLAUDE.md and fragments | 已关闭 | OpenCode 改为通过原生指令配置加载 CLAUDE.md 及片段文件，提升指令注入兼容性 |
| [#3346](https://github.com/nanocoai/nanoclaw/pull/3346) | fix(opencode): recover when a resumed session idles without work | 已关闭 | 修复恢复会话时空闲无任务时的卡死问题，提升长期运行稳定性 |
| [#2265](https://github.com/nanocoai/nanoclaw/pull/2265) | fix(channels): support display cards (send_card) in Chat SDK bridge | 已关闭 | 修复 `send_card` MCP 工具在 Chat SDK 通道上静默失败的问题，补齐交互卡片能力 |

### CLI 与开发者体验

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#2416](https://github.com/nanocoai/nanoclaw/pull/2416) | fix(cli): provision companion rows on `ncl groups create` and `ncl wirings create` | 已关闭 | CLI 创建组/连接时自动补全关联数据行，避免后续操作因数据缺失失败 |
| [#2356](https://github.com/nanocoai/nanoclaw/pull/2356) | fix(update-nanoclaw): install ~/.local/bin/ncl symlink on upgrade | 已关闭 | 升级流程中确保 `ncl` 可执行文件软链接正确安装 |
| [#2402](https://github.com/nanocoai/nanoclaw/pull/2402) | fix(ci): workflows no-op after repo rename — update repository guards | 已关闭 | 修复仓库重命名后 CI 工作流因路径守卫失效而空转的问题 |

### 技能与工具链

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#706](https://github.com/nanocoai/nanoclaw/pull/706) | feat(skills): add icloud-tools skill (CalDAV/CardDAV/IMAP/SMTP) | 已关闭 | 新增 `icloud-tools` 技能包，打通 iCloud 生产力应用（日历/联系人/邮件）访问能力 |
| [#2309](https://github.com/nanocoai/nanoclaw/pull/2309) | fix(skills): replace sqlite3 CLI with in-tree better-sqlite3 wrapper | 已关闭 | 技术债清理：以 better-sqlite3 内嵌封装替换外部 sqlite3 CLI 依赖，降低部署摩擦 |
| [#2322](https://github.com/nanocoai/nanoclaw/pull/2322) | fix(add-karpathy-llm-wiki): v2 compatibility — schedule_task MCP + remove build step | 已关闭 | 技能与 v2 架构对齐，启用 `schedule_task` MCP 工具，移除构建步骤 |

### 其他系统级修复

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#2290](https://github.com/nanocoai/nanoclaw/pull/2290) | fix(manage-channels): include canonical SQL queries in SKILL.md | 已关闭 | 补充技能文档中的规范 SQL 查询，提升可维护性 |
| [#2288](https://github.com/nanocoai/nanoclaw/pull/2288) | fix(host-sweep): parse SQLite timestamps as UTC, not local time | 已关闭 | 修复主机清理任务中 SQLite 时间戳时区解析问题，避免误删数据 |
| [#2287](https://github.com/nanocoai/nanoclaw/pull/2287) | fix(migrate-v2): probe correct OneCLI health endpoint | 已关闭 | 修正 v2 迁移时 OneCLI 健康检查的探测地址 |
| [#701](https://github.com/nanocoai/nanoclaw/pull/701) | fix: inject date/time context into all agent prompts | 已关闭（曾标记 Blocked） | 为所有 Agent 提示词注入当前日期时间上下文，解决模型对时间感知缺失的问题 |
| [#700](https://github.com/nanocoai/nanoclaw/pull/700) | fix(sessions): rotate oversized JSONL sessions to prevent container timeouts | 已关闭（曾标记 Blocked） | 超大 JSONL 会话文件触发容器超时的问题，通过会话轮转机制予以解决 |
| [#2328](https://github.com/nanocoai/nanoclaw/pull/2328) | fix: default reply destination to message origin in multi-destination groups | 已关闭 | 多目标群组场景下，默认回复对象改为消息来源方，避免回复错位 |
| [#2327](https://github.com/nanocoai/nanoclaw/pull/2327) | fix: inject destination reminder after SDK auto-compaction | 已关闭 | SDK 自动压缩后重新注入目的地提醒，防止上下文丢失 |

**整体判断**：今日合入的 PR 覆盖面广——渠道适配（WhatsApp/OpenCode/Chat SDK）、CLI 体验、技能生态、系统健壮性均有涉及，其中大量"已关闭"项此前处于 Blocked/Needs Review 状态，表明维护者完成了一轮显著的积压清理。项目正从早期功能搭建阶段过渡到稳定性加固与生态扩展并行的成熟期。

---

## 4. 社区热点

### 讨论最活跃的 PR

| PR | 标题 | 分析 |
|---|---|---|
| [#3463](https://github.com/nanocoai/nanoclaw/pull/3463) | opencode provider: fall back to message.part.delta text (#2985) | 该 PR 处于待合并状态，修复 OpenCode 事件循环中快照时序竞争（~78ms 窗口）导致回复丢失的严重问题，是当前社区最关注的技术修复之一 |

### 值得关注的 Issue

| Issue | 标题 | 分析 |
|---|---|---|
| [#3858](https://github.com/nanocoai/nanoclaw/issues/3858) | [bug] Agent never sees sender display names from native adapters (WhatsApp shows only the JID) | 今日唯一新增 Issue，直指 WhatsApp 原生适配器不传递发送者显示名称，只显示 JID（如手机号）。在群聊场景中 Agent 无法区分参与者，直接影响多用户对话体验。该问题与今日合入的 [#2565](https://github.com/nanocoai/nanoclaw/pull/2565)（群 @提及检测）共同指向 WhatsApp 群聊上下文感知的不足 |

**热点分析**：社区当前的核心关切集中在**多渠道适配层的上下文完整性**——无论是 OpenCode 的消息文本丢失，还是 WhatsApp 发送者身份缺失，本质上都是"Agent 收到的对话信息不完整"这一共性痛点的不同投影。这表明用户对 NanoClaw 作为个人 AI 助手的信息保真度有较高期待。

---

## 5. Bug 与稳定性

> 按严重程度降序排列

### 中高严重度

| Issue/PR | 描述 | 状态 |
|---|---|---|
| [#3858](https://github.com/nanocoai/nanoclaw/issues/3858) | **WhatsApp 发送者显示名称缺失（仅显示 JID）**。在群聊中 Agent 无法区分参与者身份，影响多用户会话。出现在 v2.3.0，影响 Linux 平台。 | 新开，无评论，**暂无对应 fix PR** |

### 中低严重度（今日已有修复）

| PR | 描述 | 状态 |
|---|---|---|
| [#746](https://github.com/nanocoai/nanoclaw/pull/746) | WhatsApp 认证失败后服务反复重启，造成资源浪费与不稳定 | 已修复/合入 |
| [#2152](https://github.com/nanocoai/nanoclaw/pull/2152) | OpenCode 服务器进程组残留导致资源泄漏；空闲超时不可配置 | 已修复/合入 |
| [#3346](https://github.com/nanocoai/nanoclaw/pull/3346) | OpenCode 恢复会话后空闲无任务时无法自动退出 | 已修复/合入 |
| [#700](https://github.com/nanocoai/nanoclaw/pull/700) | 超大 JSONL 会话文件导致容器超时 | 已修复/合入 |
| [#2288](https://github.com/nanocoai/nanoclaw/pull/2288) | SQLite 时间戳按本地时区解析导致主机清理误判 | 已修复/合入 |
| [#2265](https://github.com/nanocoai/nanoclaw/pull/2265) | 交互卡片 `send_card` 在 Chat SDK 通道上静默无效 | 已修复/合入 |

### 待合并修复

| PR | 描述 | 状态 |
|---|---|---|
| [#3463](https://github.com/nanocoai/nanoclaw/pull/3463) | OpenCode 回复文本可能因快照时序竞争而丢失（约 78ms 窗口期） | 待合并 |

---

## 6. 功能请求与路线图信号

| PR/Issue | 类型 | 信号分析 |
|---|---|---|
| [#706](https://github.com/nanocoai/nanoclaw/pull/706) | 新技能：icloud-tools | 从 iCloud（CalDAV/CardDAV/IMAP/SMTP）方向拓展 Agent 的"个人数据"访问半径，指向个人助手向 PIM（个人信息管理）深度整合的路线图方向 |
| [#3463](https://github.com/nanocoai/nanoclaw/pull/3463) | OpenCode 事件处理增强 | 体现对 OpenCode 作为后端的持续投入，预计会继续修复其余时序/事件边角问题 |
| [#2152](https://github.com/nanocoai/nanoclaw/pull/2152) | IDLE_TIMEOUT_MS 可配置 | 从"不可调"到"可配置"的转变反映了用户对 fine-tuning 运行参数的诉求，未来可能在更多环节引入类似配置项 |
| [#3858](https://github.com/nanocoai/nanoclaw/issues/3858) | 显示名称透传 | 若该 Issue 获得关注，预计会出现对应 fix PR，并带动其他原生适配器（Telegram/Discord 等）发送者元数据的规范化 |

**路线图推断**：项目正处于"渠道适配完善+技能生态丰富"的双轮驱动阶段。短期来看，WhatsApp 群聊体验（提及、显示名、回复目标）是明确的打磨重点；中期来看，OpenCode 后端的稳定性与 iCloud 类个人数据技能的扩展可能成为差异化竞争力。

---

## 7. 用户反馈摘要

> 由于今日更新条目中多数 PR 缺乏详细评论数据（评论数未统计），以下基于 Issue/PR 描述中的用户表述提炼核心痛点：

1. **WhatsApp 群聊中 Agent"脸盲"**（#3858）—— 用户明确描述"在 WhatsApp 群中，Agent 无法通过名称区分参与者，每条入站消息到达模型时发送者都只是 JID，没有显示名称"。这是一个直接影响可用性的体验缺口，尤其在多人群聊场景中。用户提供了复现版本（v2.3.0, main 7902716b），显示对问题定位的认真态度。

2. **OpenCode 时序竞态导致消息丢失**（#3463）—— 用户 @wakqasahmed 详细测量了 ~78ms 的竞态窗口，说明该问题可量化、可复现，且已影响生产使用。这类"差一点就成功"的边界问题往往最能引发社区共鸣。

3. **技能/工具的部署摩擦**（#2309, #2356）—— 通过替换外部依赖（sqlite3 CLI → 内嵌 better-sqlite3）、修复升级时软链接安装等，反映了用户对"安装即用"、低运维成本的期待。这类修复虽不显眼，却是提升用户满意度的关键。

4. **认证失败后的稳定性**（#746）—— "服务重启风暴"直接暴露了生产环境下的可靠性问题，该类修复被标记为 Blocked 后今日终于合并，说明维护者在权衡修复复杂度后完成了落地。

---

## 8. 待处理积压

> 以下为长期未合并/未关闭且状态值得关注的项目：

| PR/Issue | 标题 | 创建时间 | 最近更新 | 当前状态 | 积压时长 | 建议 |
|---|---|---|---|---|---|---|
| [#700](https://github.com/nanocoai/nanoclaw/pull/700) | fix(sessions): rotate oversized JSONL sessions to prevent container timeouts | 2026-03-04 | 2026-09-20 | 已关闭（曾长期 Blocked） | 约 6.5 个月 | 今日已解决 ✓ |
| [#701](https://github.com/nanocoai/nanoclaw/pull/701) | fix: inject date/time context into all agent prompts | 2026-03-04 | 2026-09-20 | 已关闭（曾长期 Blocked + Pending Closure） | 约 6.5 个月 | 今日已解决 ✓ |
| [#746](https://github.com/nanocoai/nanoclaw/pull/746) | fix(whatsapp): prevent service restart hammering on auth failure | 2026-03-05 | 2026-09-20 | 已关闭（曾长期 Blocked） | 约 6.5 个月 | 今日已解决 ✓ |
| [#3463](https://github.com/nanocoai/nanoclaw/pull/3463) | opencode provider: fall back to message.part.delta text | 2026-08-23 | 2026-09-20 | **OPEN（待合并）** | 约 1 个月 | 建议优先 review 并测试合并，该修复针对消息丢失问题，影响面较广 |
| [#3858](https://github.com/nanocoai/nanoclaw/issues/3858) | [bug] Agent never sees sender display names from native adapters | 2026-09-20 | 2026-09-20 | OPEN | 1 天 | 新 Bug 无评论无 fix，建议维护者标注 triage 结论或确认复现，避免沉底 |

**核心风险提示**：今日一口气关闭大量积压数月之久的 PR 是积极信号，但这些 PR 是否经过了充分的回归测试验证（尤其是跨 6 个月代码演进的合并），值得后续观察。此外，#3858 作为唯一新 Issue，如果长期无人响应，可能打击用户上报 Bug 的积极性。

---

*本日报基于 GitHub 公开数据自动生成，数据采集时间：2026-09-21。所有链接均可直接跳转至对应 GitHub 页面。*

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报 — 2026-09-21

## 今日速览

过去 24 小时内，IronClaw 仓库无新 Issue 提交或关闭，Issue 活跃度为零；PR 方面共 6 条更新，其中 4 条待合并、2 条已合并/关闭，全部来自 Dependabot 自动化依赖升级，无人工功能 PR 合入。整体来看，项目当前处于依赖维护的常规节奏，社区讨论热度较低，属于典型的平稳发展期，未出现方向性变化或重大事件。

## 版本发布

今日无新版本发布。

## 项目进展

今日合并/关闭的 2 条 PR 均为自动化依赖更新，属于日常维护范畴：

- [#8099](https://github.com/nearai/ironclaw/pull/8099) **[CLOSED]** `chore(deps): bump the everything-else group across 1 directory with 25 updates` — 批量更新 25 个 Rust 依赖，涵盖 `uuid`（1.24.0 → 1.26.1）、`base64`（0.22.1 → 0.23.1）、`rust_decimal` 等基础库，保持核心依赖链的持续更新。
- [#8079](https://github.com/nearai/ironclaw/pull/8079) **[CLOSED]** `chore(deps): bump the actions group across 1 directory with 6 updates` — 更新 GitHub Actions 工作流依赖，包括 `anthropics/claude-code-action`（1.0.183 → 1.0.221）与 `actions/setup-node`（4.0.2 → 7.0.0），CI 基础设施保持跟进上游。

这两组合并确保项目依赖安全补丁与上游修复能及时流入，整体项目健康度良好，但无新功能或架构层面的推进。

## 社区热点

今日无 Issue 活动，PR 亦无用户评论或表情反应，社区讨论热度极低。从过去数日的 PR 分布来看，唯一具有额外关注度的是 [#7834](https://github.com/nearai/ironclaw/pull/7834)（wasm 依赖大版本升级，PR 标注为 `size: L, risk: medium`），该 PR 创建于 2026-08-23，至今未合并，可能牵涉 WASM 运行时兼容性验证，是当前依赖升级中复杂度最高的一项，值得关注其后续进展。

## Bug 与稳定性

今日无新 Bug、崩溃或回归问题报告，无相关修复 PR。

## 功能请求与路线图信号

今日无新功能请求提交。值得留意的是 [#8103](https://github.com/nearai/ironclaw/pull/8103) 与已合并的 [#8079](https://github.com/nearai/ironclaw/pull/8079) 均在升级 `anthropics/claude-code-action` 至最新版本（目前已推进至 1.0.228），说明项目在持续推进 Claude Code 相关 CI 集成能力的更新，可能服务于 Agent 辅助开发流程的增强。

## 用户反馈摘要

今日无 Issue 评论或 PR 讨论，暂无真实用户反馈数据可供提炼。

## 待处理积压

以下为当前处于开放状态、等待维护者关注的 PR：

- [#7834](https://github.com/nearai/ironclaw/pull/7834) **[OPEN]** `chore(deps): bump the wasm group across 1 directory with 4 updates` — 创建于 2026-08-23，已开放 29 天。涉及 `wasmtime`、`wasmtime-wasi`、`wit-component`、`wit-parser` 四个关键 WASM 基础设施组件。PR 标注 `size: L, risk: medium`，更新跨度较大，建议维护者安排审查，评估 WASM 运行时的兼容性影响。
- [#8104](https://github.com/nearai/ironclaw/pull/8104) **[OPEN]** `chore(deps): bump the everything-else group across 1 directory with 29 updates` — 批量更新 29 个 Rust 依赖，包含 `uuid`、`base64`、`rust_decimal` 等。更新数量较多，建议关注是否存在破坏性变更。
- [#8103](https://github.com/nearai/ironclaw/pull/8103) **[OPEN]** `chore(deps): bump the actions group across 1 directory with 8 updates` — 其中 `actions/setup-node` 从 v4 直接跳升至 v7（跨主版本），需确认 CI 工作流是否兼容。
- [#8078](https://github.com/nearai/ironclaw/pull/8078) **[OPEN]** `chore(deps): bump the tokio-ecosystem group across 1 directory with 2 updates` — 涉及 `tower-http` 与 `tokio-tungstenite` 两个 tokio 生态组件，版本跨度较小（0.7.0 → 0.7.1），风险较低，可快速合入。

---

*数据源：[github.com/nearai/ironclaw](https://github.com/nearai/ironclaw) | 统计窗口：2026-09-20 至 2026-09-21*

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-21

## 今日速览

过去 24 小时项目保持高活跃度：共更新 3 条 Issues（新开/活跃 2 条、关闭 1 条）、12 条 PR（7 条待合并、5 条已合并/关闭），并发布 4 个新版本（9.14–9.20 连续发版，迭代节奏约为每 1–2 天一个版本）。核心进展集中在 OpenClaw 集成深度加固（hook 持久化、IM 配置热加载）、浏览器 WebAuthn 支持、订阅商业化能力，以及大规模功能移除（background jobs 重构）。合并速度与发版节奏匹配良好，项目整体处于高速迭代状态。

- 活跃度评估：**高**。24h 内 5 条 PR 合并、4 个版本发布，且包含多项跨模块功能（renderer/main/openclaw/cowork 等），社区贡献 PR 也持续跟进。
- 健康度信号：新功能与清理型重构并行（如移除非必要的 background jobs），说明项目在扩张同时也在控制复杂度。

---

## 版本发布

过去 24 小时共发布 4 个版本（2026.9.14 / 2026.9.15 / 2026.9.17 / 2026.9.20），其中最新版本为 **2026.9.20**。

### LobsterAI 2026.9.20（最新）
- **新功能**
  - Subagent 会话可见性控制（PR #2703）
  - 应用内 Agent 浏览器支持 passkey/WebAuthn（PR #2723，含 macOS 原生集成与 entitlements）
  - 定时任务相关能力（release notes 截断，具体见 PR #2722 对 Weixin 目标大小写与重发逻辑的修复）
- **迁移注意**
  - 该版本包含 background jobs 功能的移除（PR #2724 已合并），涉及 IPC 通道、OpenClaw tasks.list/tasks.cancel 调用及 renderer 层相关 UI 与 i18n 字符串。若你的工作流依赖后台任务面板，升级后需改用其他机制。详情见 [#2724](https://github.com/netease-youdao/LobsterAI/pull/2724)。

### LobsterAI 2026.9.17
- OpenClaw 共享状态 schema 在启动修复前自动迁移（PR #2689）
- 新增修复快照回滚与 agent 媒体迁移处理（PR #2689 及相关提交）

### LobsterAI 2026.9.15
- OpenClaw 兼容性修复（PR #2683）
- xAI 认证凭据迁移至 SQLite 标准存储（PR #2675）

### LobsterAI 2026.9.14
- 升级 OpenClaw 至 v2026.8.1 并改进 artifact 工作流（PR #2665）
- 支持 Markdown 编辑（PR #2659）
- Markdown 内联编辑体验改进

> 提示：release notes 存在截断，已尽量结合 PR 状态交叉补齐。完整更新内容请查看 [Releases 页面](https://github.com/netease-youdao/LobsterAI/releases)。

---

## 项目进展

今日合并/关闭的 5 条 PR 覆盖三大方向：性能与稳定性、新能力、商业化。

**稳定性/架构**
- [#2724 refactor(cowork): remove background jobs feature](https://github.com/netease-youdao/LobsterAI/pull/2724) — 移除后台任务存储、OpenClaw tasks gateway 调用和对应 IPC/renderer 代码。这是大规模清理，降低维护面。
- [#2722 fix(scheduled-task): preserve Weixin target casing and explain resend rejection](https://github.com/netease-youdao/LobsterAI/pull/2722) — 修复企业微信直连 ID 大小写被破坏的问题，并在重发失败时给出会话过期/主动消息配额提示。

**新能力**
- [#2723 feat(browser): add passkey/WebAuthn support for the in-app agent browser](https://github.com/netease-youdao/LobsterAI/pull/2723) — 新增 `browserPasskeys` 模块（passkey service、页面 observer、preload bridge），含 macOS WebAuthn 集成与 entitlements，并在浏览器面板增加 passkey 提示组件。
- [#2720 feat(subscription): add one-cent trial and low-credit purchase offers](https://github.com/netease-youdao/LobsterAI/pull/2720) — 引入 ¥0.01 试用活动（每周一次/累计关闭三次频控）、低余额购买优惠，覆盖侧边栏、会话额度不足提示和模型选择场景，并补齐埋点与诊断日志。

**发版**
- [#2725 Release/2026.9.18](https://github.com/netease-youdao/LobsterAI/pull/2725) — 内部发布 PR，已关闭。

**整体评估**：项目在 24 小时内完成了从功能开发（WebAuthn、订阅营销）→ 清理重构（移除 background jobs）→ 发版（4 个版本）的完整闭环，推进速度显著。特别值得关注的是商业化功能（试用购买、低余额优惠）已进入客户端主流程，说明产品商业化阶段在加速。

---

## 社区热点

过去 24 小时社区讨论整体偏少，三条 Issue 均为 stale 标记自动触发的旧 Issue（无新增实质讨论），PR 评论数均为 0。相对值得关注的热点如下：

### 1. [#2726 feat: add digital employees, expert teams and capability markets](https://github.com/netease-youdao/LobsterAI/pull/2726)（今日新开，待合并）
- **标签**：`area: renderer / main / openclaw`
- 由社区贡献者 @alison-xx 提交，为上游添加「能力市场」工作流：发现技能、创建数字员工、安装专家团队、浏览专家工具包，并通过 SQLite 持久化。这是一个**大功能 PR**，涉及 renderer/main/openclaw 三大模块。
- **信号**：社区对「技能市场/数字员工」有明确诉求，与项目现有 OpenClaw 集成方向一致，建议维护者优先评审。

### 2. [#2727 fix(user_plugins): persist OpenClaw entry hooks across sync](https://github.com/netease-youdao/LobsterAI/pull/2727)（今日新开，待合并）
- **标签**：`area: main / openclaw`
- 修复 OpenClaw entry hooks 在 gateway 重启后丢失的问题（Issue #2654）。将 `plugins.entries.*.hooks` 持久化到 SQLite，并在 `syncToDisk` 时重写。
- **信号**：用户侧已在实际使用中遇到配置丢失，修复思路明确，合并优先级应较高。

### 3. [#1068 Bug: 删除当前的agent，切换到别的agent之后需要自动刷新任务列表](https://github.com/netease-youdao/LobsterAI/issues/1068)（已关闭）
- 今日关闭，含 2 条评论。该问题创建于 3 月底，stale 标记后今日被关闭。删除 agent 后任务列表未自动刷新是一个典型的 UI 状态同步问题，关闭原因可能是自动清理（stale bot），而非功能修复，建议维护者确认是否已在近期版本中修复，避免误关。

**分析**：社区讨论热度主要集中在功能 PR 而非问题答疑上，说明用户群体正在从「报 bug」向「共建功能」转变。

---

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 问题描述 | 状态 |
|---------|----------|---------|------|
| **高** | [#1007 Agent Engine 无限重启](https://github.com/netease-youdao/LobsterAI/issues/1007) | Agent Engine 经常无限重启，用户询问通过配置文件解决的方法。3 月底创建，久未解决，严重阻碍使用 | 无 fix PR |
| **高** | [#1003 Notion MCP 环境变量未传递](https://github.com/netease-youdao/LobsterAI/issues/1003) | MCP Bridge 启动 `npx @notionhq/notion-mcp-server` 时未正确传入环境变量（Token），导致 Notion 返回 401。用户已尝试多种配置组合，问题疑似在 Bridge 层 `child_process.spawn` 的 env 处理 | 无 fix PR |
| **中** | [#2722 Weixin 目标 ID 大小写被破坏](https://github.com/netease-youdao/LobsterAI/pull/2722) | 定时任务中企业微信直连 peer id 被错误转换为小写，导致发送失败 | ✅ 已合并修复 |
| **中** | [#2727 OpenClaw entry hooks 配置丢失](https://github.com/netease-youdao/LobsterAI/pull/2727) | Gateway 重启后 `plugins.entries.*.hooks` 丢失，需持久化到 SQLite 并同步 | 🔧 修复 PR 待合并 |
| **低** | [#1068 删除 agent 后任务列表不刷新](https://github.com/netease-youdao/LobsterAI/issues/1068) | 删除当前 agent 切换到 main agent 后，任务列表不自动刷新 | ❓ Issue 已关闭（stale），未确认是否修复 |

**小结**：三个不带 fix 的 Bug（#1007、#1003、#1068）均为 3 月底创建、今日被 stale 标记，存在「失修」风险。其中 #1007 和 #1003 直接影响核心功能（Agent 引擎稳定性、MCP 生态集成），建议维护者优先排查并回复。

---

## 功能请求与路线图信号

### 1. 数字员工 / 能力市场（强烈信号）
- **PR [#2726](https://github.com/netease-youdao/LobsterAI/pull/2726)**：新增数字员工、专家团队、能力市场，覆盖技能发现→安装专家团队→配置 MCP 工具暴露的完整闭环。
- **关联 PR [#1008](https://github.com/netease-youdao/LobsterAI/pull/1008)**：社区此前已提交「新增 6 个预设 Agent 模板」（股票、备课、医疗等）。
- **判断**：结合项目对 OpenClaw 的持续深度集成（hooks、状态迁移、IM 热加载）和预设 Agent 的积累，「数字员工/技能市场」很可能成为下一阶段路线图重点，未来 1–2 个版本有望引入。

### 2. 打开 AI 产物的即时预览（中期信号）
- **PR [#1011](https://github.com/netease-youdao/LobsterAI/pull/1011)**：为 Cowork 会话添加可扩展的 artifacts 预览流水线，支持 HTML、React、Mermaid 的「运行后查看」。
- **关联**：2026.9.14 版本已支持 Markdown 编辑，说明编辑器/预览体验正在持续补齐。
- **判断**：与已发布的 Markdown 支持一脉相承，后续版本大概率纳入。

### 3. 技能快捷选择（强信号，但积压过久）
- **PR [#1013](https://github.com/netease-youdao/LobsterAI/pull/1013)**：在 prompt 输入框中添加 `/` 触发的技能选择器，无需跳转技能页面。
- **PR [#1009](https://github.com/netease-youdao/LobsterAI/pull/1009)**：Prompt 模板库（本地优先、变量填充、复制到已有对话）。
- **判断**：两个 PR 均从真实使用痛点出发，若维护者有意提升 Cowork 编辑体验，建议优先合并或给出明确排期。

### 4. IM 配置热更新（已进入评审）
- **PR [#2721](https://github.com/netease-youdao/LobsterAI/pull/2721)**：保存 IM 配置后无需重启 gateway，通过活连接应用变更，避免打断正在运行的任务。技术方案清晰，待合并。

### 5. 商业化功能持续推进（已落地）
- **#2720** 已合并：¥0.01 试用 + 低余额优惠购买，说明订阅商业化在快速推进。

---

## 用户反馈摘要

从今日活跃/更新的 Issue 评论中提炼：

1. **MCP 环境变量传递不可见、不可调**（#1003）
   - 用户 @cv696 反馈：Token 填了、环境变量名改了几次，但 Bridge 层 `child_process.spawn` 的 env 要么没设置、要么 key 名不对、要么传了没读到，导致 Notion 一直 401。用户的挫败感比较明显（"请大神们查阅修正"）。
   - **诉求**：MCP Bridge 的环境变量传递需要可配置、可观测（例如日志输出实际 env），而不是黑盒。

2. **Agent Engine 无限重启且无有效排查路径**（#1007）
   - 用户 @HsiYaTung 反馈：问题长期存在，只能通过改配置尝试解决，但缺少官方指引。
   - **诉求**：需要更鲁棒的看门狗/恢复机制，或至少提供诊断日志来定位重启原因。

3. **UI 状态同步问题虽小但影响体验**（#1068）
   - 用户 @OnePieceJoker 反馈：删除当前 agent 后希望任务列表自动刷新。该问题已关闭，但关闭原因不明。

4. **社区贡献者对架构有深入理解**（#2727、#2721、#2726）
   - 多个 PR 直接改动 main/openclaw 层面代码，且对现有架构理解到位（如 #2727 对齐 store/sync/plugin manager 路径），说明项目在社区中已形成一定规模的深度贡献者群体。

---

## 待处理积压

以下为长期未响应或未合并的重要 PR/Issue，建议维护者关注：

### 🔴 高优先级

| 项目 | 创建时间 | 积压天数 | 说明 |
|------|---------|---------|------|
| [#1007 Agent Engine 无限重启](https://github.com/netease-youdao/LobsterAI/issues/1007) | 2026-03-29 | ~176 天 | 核心稳定性问题，长期无官方回复，今日被 stale 标记 |
| [#1003 Notion MCP 环境变量未传递](https://github.com/netease-youdao/LobsterAI/issues/1003) | 2026-03-28 | ~177 天 | MCP 生态关键路径 Bug，用户已充分排查但仍卡在 Bridge 层，尚无人接手 |

### 🟡 中优先级（社区功能 PR 积压）

| PR | 创建时间 | 积压天数 | 功能 |
|----|---------|---------|------|
| [#1008 新增 6 个预设 Agent 模板](https://github.com/netease-youdao/LobsterAI/pull/1008) | 2026-03-29 | ~176 天 | 股票、备课、医疗、宠物等 6 个场景模板 |
| [#1009 Prompt 模板库](https://github.com/netease-youdao/LobsterAI/pull/1009) | 2026-03-29 | ~176 天 | 本地优先的 Prompt 模板库，支持变量填充和复制 |
| [#1011 Artifacts 预览流水线](https://github.com/netease-youdao/LobsterAI/pull/1011) | 2026-03-29 | ~176 天 | HTML/React/Mermaid 运行后预览 |
| [#1013 Slash 触发技能选择器](https://github.com/netease-youdao/LobsterAI/pull/1013) | 2026-03-29 | ~176 天 | `/` 快速插入技能指令 |

### 🟢 低优先级（已关闭但存疑）

- [#1068 删除 agent 后任务列表自动刷新](https://github.com/netease-youdao/LobsterAI/issues/1068)：stale 自动关闭，但无法确认是否已修复。建议维护者检查该场景，若已修复则关闭合理，若未修复则重新打开。

---

## 总结

LobsterAI 在 2026-09-21 展现出典型的「高速迭代 + 社区共建」状态：官方主推 OpenClaw 深度集成、WebAuthn 和订阅商业化，社区贡献集中在技能市场、模板库和编辑体验。需要关注的风险是 3 月底的一批 Issue/PR 被 stale 标记后仍未得到有效响应，尤其是 Agent Engine 无限重启和 Notion MCP 环境变量两个直接影响用户的核心问题。建议维护者在推进新功能的同时，安排一轮积压清理，优先响应高影响的社区反馈。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

过去24小时无活动。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-21

> CoPaw（github.com/agentscope-ai/CoPaw）· 数据窗口：过去 24 小时


## 1. 今日速览

过去 24 小时 CoPaw 项目保持高活跃度：共产生 20 条 Issue 更新（新开/活跃 14 条、关闭 6 条）和 37 条 PR 更新（待合并 23 条、已合并/关闭 14 条），同时发布了 v2.2.2-beta.3 补丁版本。核心动态集中在三方面：一是针对 2.2.2 beta 阶段暴露的回归问题（工具审批、音频兼容、DoomLoop 误判）展开密集修复；二是社区功能请求持续发酵，多租户 Hub（#7318）与 UI 细节优化（#7648、#7884）讨论活跃；三是基础设施层面有较大 PR 推进，包括模型管理统一（#7899）、社区功能集成（#7903）和多标签终端（#7861）。整体看，项目处于 **beta 迭代高峰 + 大功能开发并行** 的状态，社区参与度高，维护者响应及时。


## 2. 版本发布

### v2.2.2-beta.3（2026-09-20 发布）

**更新内容：**
- `fix(console)`: restore assistant response actions — 修复了助手响应操作按钮丢失/不可用的问题（由 #7851 合入）
- `fix(e2e)`: re-anchor console selectors broken by the #7502 redesign, harden session-list assertions — 修复了 #7502 前端重构导致 E2E 测试选择器失效的问题，并增强了会话列表断言稳定性（由 @yutai78786 提交）

**破坏性变更：** 无（本版本为补丁性质，仅含 bug 修复）

**迁移注意事项：** 针对使用自建 Docker 镜像或桌面端的用户，建议尽快升级以解决会话列表和助手响应操作相关回归。

🔗 https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.3


## 3. 项目进展

今日合并/关闭的 PR 中以下内容对项目推进有实质性意义：

### 核心功能修复（已合并）
- **#7904 fix(pet): forward approval actor to native service (#7856)** — 修复 qwenpaw-pet 0.1.1 插件破坏 2.2.2b2 工具审批的问题（ApprovalService 收到 HTTP 500）。此修复直接影响使用该插件的用户。🔗 https://github.com/agentscope-ai/QwenPaw/pull/7904
- **#7887 / #7886 fix(agents): handle unknown audio part rejections** — 处理 DeepSeek 等模型拒绝 `input_audio` 内容块时音频降级分类器不触发的兼容性问题，修复 `send_file_to_user` 发送 wav 后会话永久不可用的问题（#7876）。两条 PR 分别来自不同贡献者，功能等价，后者已关闭。🔗 https://github.com/agentscope-ai/QwenPaw/pull/7887
- **#7345 Fix/tool card stuck calling after stop** — 修复停止工具执行后工具卡片永久显示"执行中"的 UI 卡死问题，属于长期顽固 bug 的收尾。🔗 https://github.com/agentscope-ai/QwenPaw/pull/7345
- **#5836 feat(desktop): auto-detect local paths in chat output and open file explorer on click** — 桌面端新增聊天输出中的本地路径自动识别与点击打开文件管理器功能，关闭 #4830。🔗 https://github.com/agentscope-ai/QwenPaw/pull/5836

### 工程与质量（已合并）
- **#7894 test(console): raise frontend statement coverage by +1027 statements** — 纯测试 PR，Console 前端语句覆盖率从 64.45% 提升至 67.65%（+3.19 个百分点），对项目长期可维护性有正向贡献。🔗 https://github.com/agentscope-ai/QwenPaw/pull/7894
- **#7901 ci(release): unfreeze merges as soon as the release finishes instead of waiting for cron** — 优化发布流程，避免发布结束后 PR 因 cron 延迟而长时间冻结。🔗 https://github.com/agentscope-ai/QwenPaw/pull/7901
- **#7862 ci(release): gate artifact publishing on the test gate and make the E2E watch set blocking** — 发布流程加固，确保测试门禁通过后才发布产物。🔗 https://github.com/agentscope-ai/QwenPaw/pull/7862

**项目整体进度判断：** 2.2.2 beta 系列的回归修复节奏紧凑（一天内合入多条 fix PR），同时多条大型功能 PR（#7899、#7903、#7861）正在并行开发中，显示项目处于**稳定化与大功能开发双线推进**阶段。


## 4. 社区热点

### #7318 [讨论] QwenPaw Hub 多租户版即将推出：你希望我们接下来做什么？
- 评论 31 条 | 👍 4 | 更新于 09-20
- 该话题自 8 月 26 日创建以来持续活跃，是当前社区关注度最高的功能方向。用户围绕团队协作、多用户权限、管理员管理技能等需求展开讨论，与 #2324（多用户访问和管理员管理的技能）直接关联。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7318

### #7853 [Bug] ToolResultPruner 跳过媒体块导致 base64 无界累积
- 评论 6 条 | 创建于 09-18，更新于 09-20
- 该问题指向一个**架构级隐患**：`ToolResultPruner.prune_output` 只处理文本块，`view_image` 产生的 base64 数据永远不会被裁剪，最终撑爆模型上下文。评论中用户汇报了复现环境和影响，社区关注度高。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7853

### #5567 [已关闭] QwenPaw GitHub Issue 反馈助手 — 一个帮你把吐槽变成标准 Issue 的 Skill
- 评论 2 条 | 👍 2 | 更新于 09-20
- 社区成员 @tecgic 开发了一个挂在魔搭社区上的 Skill，可将用户口语化吐槽自动整理为标准 Issue 格式并做隐私脱敏。反映了社区对"降低反馈门槛"的需求。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/5567

**趋势分析：** 社区活跃集中在**多租户/团队协作**（#7318）、**上下文管理机制缺陷**（#7853）与**U9I 可用性**（#7884、#7648）三大方向，说明用户正在从个人工具走向团队化、规模化使用场景。


## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重 — 可能导致数据丢失或服务不可用

**#7724 [Bug] 会话丢失（含大模型配置丢失）**
- 用户报告桌面端（Win10, 2.2.1）在一次会话后再次发起对话，界面卡住并重新部署插件，随后 9 点多那次会话完全消失，大模型配置也丢失。用户提到此前已反复遇到模型丢失问题（#7708），属于**多次复现的严重稳定性问题**。
- 状态：OPEN，无关联 fix PR
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7724

**#7888 [Bug] Chat page stuck on "Something went wrong" — React commitPlacement NotFoundError**
- 浏览器扩展（Edge）在 React 管理的文本节点外层注入 `<font>` 包装器，导致聊天页面完全崩溃，无法恢复。自建 Docker 镜像（2.2.1）受影响。社区用户在评论中确认了 Edge 浏览器行为。
- 状态：OPEN，无关联 fix PR
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7888

**#7853 [Bug] ToolResultPruner 跳过媒体块，view_image base64 无界累积**
- `ToolResultPruner` 只处理文本块，`type: "data"` 块被跳过，base64 图片数据永久累积，最终超出模型上下文窗口，导致每次请求失败。影响所有 `view_image` 重度用户，在长会话中必然触发。
- 状态：OPEN，无关联 fix PR
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7853

### 🟠 中等 — 功能异常但可绕过

**#7905 [Bug] DoomLoopGate escalates to TERMINATE on text-only round without new tool-call evidence**
- 循环检测门在纯文本轮次误判为死循环并终止会话。已有 **fix PR #7906**（open）。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7905 · 🔧 https://github.com/agentscope-ai/QwenPaw/pull/7906

**#7856 [Bug] qwenpaw-pet 0.1.1 破坏 2.2.2b2 工具审批（actor 参数缺失）**
- 启用插件后所有工具审批点击返回 HTTP 500，挂起的工具调用无法解析。已有 **fix PR #7904**（已合入）和 **#7898**（待 review）。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7856

**#7883 [Bug] tool-returned PDF 被序列化为 OpenAI 风格的嵌套 file part，DeepSeek 400 拒绝**
- #7597 曾修复但仅部分生效，2.2.1 上仍可复现。状态 OPEN。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7883

**#7881 [Bug] kimi-code ACP runner 绕过边界检查与破坏性命令检查（Edit 被拦截但 Write/Bash 完全盲目）**
- 安全检查覆盖不全，部分破坏性命令可绕过。状态 OPEN，评论中提供了补充事实。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7881

**#7895 [Bug] idle cleanup drops messages received while another consumer is stopping**
- 空闲队列清理时若消费者 A 停止缓慢且 B 收到新消息，B 仍会被移除，导致消息丢失。已有 **first-time-contributor fix PR #7896**（open）。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7895 · 🔧 https://github.com/agentscope-ai/QwenPaw/pull/7896

**#7890 [Bug] 零停机 reload 丢失插件注册的 runtime hook（middleware 保留）**
- 修改 agent 配置触发 zero-downtime reload 后 runtime hook 静默失效，middleware 正常，行为不一致，需完整重启才能恢复。状态 OPEN。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7890

**#7882 [Bug] OpenCode 供应商的"免费"模型无法通过 API 调用（403 FreeTierError）**
- UI 标记为免费的模型实际无法使用，API 返回 403。状态 OPEN。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7882

**#7876 [Bug] DeepSeek 拒绝 OpenAI input_audio content part（422），且音频降级分类器不触发**
- 发送 wav 后会话永久不可用。**已修复**（#7887/#7886 已合入），但数据块已写入历史会话的存量数据可能需要额外的数据迁移或清理机制。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7876

**#7900 [Bug] Hub 认证不支持 ?token= 查询参数，导致文件预览失败** — 已关闭。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7900

**#7877 [Bug] 会话级工作目录面板：浏览目录可视区约 3 行、最近项目恒空、选目录后应用仍禁用** — 已关闭。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7877

**#7321 [Bug] 工具调用已结束但输出一直显示"执行中"** — 已关闭（由 #7345 修复）。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7321


## 6. 功能请求与路线图信号

### 高热度/强信号

**#7318 QwenPaw Hub 多租户版（2.2.0）后续建设方向**
- 31 条评论、4 👍，讨论已持续近一个月。用户核心诉求：多用户访问、管理员管理的技能、团队协作能力。结合 #7903（feat(community)）正在开发的社区功能，多租户/团队化是明确路线图方向。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7318

**#5182 [Feature] 优化模型配置功能，统一模型配置**
- 请求统一向量模型、文本模型、音视频模型的配置，按类型和输入/输出支持能力归类。与今日 **#7899 PR（feat(providers): unify model discovery, pricing, selection and thinking controls）** 高度吻合，后者正在重构模型管理，使 provider 配置、模型发现、聊天选择与能力解析统一使用 provider 自有模型信息。**此需求很可能随 #7899 落地。**
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/5182 · 🔧 https://github.com/agentscope-ai/QwenPaw/pull/7899

### 中热度

**#7648 [Feature] 网页标题自定义**
- 用户开多个 QwenPaw 面板（对应不同项目），浏览器标签页标题都是"QwenPaw Console"，难以区分。请求增加自定义网页标题设置。2 条评论，等待响应中。属于低成本高体验的 UI 优化项。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7648

**#7884 [Question] 压缩后刷新前端，历史信息无法全量加载**
- 用户强烈反馈聊天记录历史过短，回顾不到之前讨论过的问题，情绪激烈。虽以 Question 形式提交，但实质是功能缺陷（历史存储/加载策略），可能需要在压缩策略或前端加载逻辑上做调整。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/7884

**#5567 Issue 反馈助手 Skill（社区自建）**
- 社区成员开发了将口语化反馈转为标准 Issue 的 Skill，2 👍，说明"简化反馈流程"是社区自发的需求。官方可考虑将此模式纳入 QwenPaw Hub 的 Skill 体系。
- 🔗 https://github.com/agentscope-ai/QwenPaw/issues/5567

**#7719 [PR] feat(memory): allow a separate model for ReMeLight memory writing**
- 允许为 ReMeLight 记忆写入配置独立模型，避免记忆任务消耗昂贵的聊天主模型。对成本敏感用户有实质价值，已开放 8 天，等待维护者 review。
- 🔗 https://github.com/agentscope-ai/QwenPaw/pull/7719


## 7. 用户反馈摘要

**对多租户功能的期待（#7318）**
> "QwenPaw started as a personal AI assistant, but the community has repeatedly asked for a better way to run it for a team. QwenPaw Hub is our first response to that call."

社区对 Hub 多租户版本的推出持积极态度，多位用户在评论区提出团队使用场景下的具体需求（多用户访问、管理员管理技能等），期待度较高。

**对会话丢失的挫败感（#7724）**
> "对话丢失，在控制-会话中完全找不到。丢失之前，提示我要配置大模型，连大模型也丢失了。"
> "之前我就反复遇到过模型丢失的问题"

用户明确表达"反复遇到"同类问题，说明该问题的复现率较高，对用户信任度损害较大。

**对历史记录过短的不满（#7884）**
> "现在聊天记录的历史这么短么？讨论过的问题，回头往上翻，看不到了？？？咱聊天记录多存点，做不到么？知道这个体验多差么？？？"

情绪激烈的反馈，连续使用反问句式，反映了对当前历史记录保留策略的强烈不满。压缩后刷新前端历史无法全量加载，直接影响用户的长期使用体验。

**对第三方插件兼容性的敏感度（#7856）**
> 启用 qwenpaw-pet 0.1.1 后，Console 中每个工具审批点击 Approve/Deny 都返回 HTTP 500，挂起的工具调用无法解析。

插件生态的兼容性问题会直接影响核心审批流，用户对此类问题的容忍度较低，好在 #7904 已快速合入修复。


## 8. 待处理积压

### Issue 积压

| Issue | 标题 | 创建 | 最后更新 | 天数 | 状态 |
|-------|------|------|----------|------|------|
| [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | 会话丢失（含模型配置丢失，反复复现） | 09-12 | 09-20 | 8 天 | OPEN，无 fix PR |
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | Hub 多租户版后续建设方向讨论 | 08-26 | 09-20 | 25 天 | OPEN，讨论活跃但无明确 roadmap 回复 |
| [#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648) | 网页标题自定义 | 09-09 | 09-20 | 11 天 | OPEN，仅 2 评论，无维护者回复 |
| [#5182](https://github.com/agentscope-ai/QwenPaw/issues/5182) | 统一模型配置 | 06-14 | 09-20 | 98 天 | OPEN（但 #7899 可能覆盖） |

**重点关注：** #7724 会话丢失问题已存在 8 天且用户声称反复遇到，同时涉及数据丢失和配置丢失两个维度，建议维护者优先排查。

### PR 积压

| PR | 标题 | 创建 | 天数 | 状态 |
|----|------|------|------|------|
| [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | feat(memory): allow a separate model for ReMeLight memory writing | 09-12 | 8 天 | 待 review |
| [#7846](https://github.com/agentscope-ai/QwenPaw/pull/7846) | feat: improve session list details and grouping | 09-18 | 2 天 | 待 review |
| [#7861](https://github.com/agentscope-ai/QwenPaw/pull/7861) | feat(console): add authenticated multi-tab chat terminal | 09-18 | 2 天 | 待 review |
| [#7869](https://github.com/agentscope-ai/QwenPaw/pull/7869) | fix(providers): send OpenCode session header | 09-18 | 2 天 | Under Review |

**建议：** #7719 已等待 8 天，功能点独立且对成本敏感用户有明确价值，建议维护者尽快 review；#7899（模型管理统一，今日新提交）是大规模重构 PR，建议分配充分 review 资源以避免与大功能 PR（#7903 社区集成）产生冲突。


> **总结：** CoPaw 目前处于 2.2.2 beta 快速迭代期，bug 修复响应速度快（多条 PR 当日提交/当日合入），社区大功能讨论活跃。需要关注的风险点集中在：会话持久化可靠性（#7724）、上下文累积导致的 Context Window 爆裂（#7853）、以及前端 UI 层与浏览器扩展的兼容性（#7888）。项目整体健康度良好，但数据安全类 bug 需要优先处理。

:::
