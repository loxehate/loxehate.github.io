---
title: "OpenClaw 生态日报"
published: 2026-09-10
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-10

> Issues: 153 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-10 05:49 UTC

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

# OpenClaw 项目动态日报

**日期：** 2026-09-10
**数据来源：** github.com/openclaw/openclaw

---

## 1. 今日速览

OpenClaw 项目今日处于**高活跃度但伴随显著稳定性压力**的状态。过去 24 小时内 Issues 更新达 153 条（新开/活跃 76 条，关闭 77 条），PR 更新高达 500 条（待合并 258 条，已合并/关闭 242 条），显示出社区贡献与问题反馈均极为密集。值得关注的是，今日无新版本发布，而多个 P0/P1 级严重 Bug 正在活跃讨论中，涉及僵尸进程泄漏、SQLite 锁竞争、Gateway 崩溃循环等核心稳定性问题。整体而言，项目处于快速迭代期，但基础设施层面的技术债正在积累。

---

## 2. 版本发布

今日无新版本发布。最近一次版本为 2026.9.3（`1391f7c`），多个今日活跃的 Issue 均基于该版本报告问题。

---

## 3. 项目进展

过去 24 小时有 **242 条 PR 被合并或关闭**，项目推进节奏极快。以下为代表性进展：

| PR | 标题 | 影响 |
|---|---|---|
| [#143567](https://github.com/openclaw/openclaw/pull/143567) | fix(release): omit unpublished candidate from upgrade baselines | 修复发布流程中未发布候选版本污染升级基线的问题 |
| [#143531](https://github.com/openclaw/openclaw/pull/143531) | fix(sqlite): name the repair path in schema drift failures | 改进 SQLite schema 漂移时的错误提示，为运维人员提供修复路径指引 |
| [#142626](https://github.com/openclaw/openclaw/pull/142626) | fix(imessage): restore feedback after bridge recovery | 修复 iMessage 桥接恢复后打字指示器和已读回执永久丢失的问题 |
| [#143648](https://github.com/openclaw/openclaw/pull/143648) | fix(apple): Gateway connections fail behind hostname-routed HTTPS proxies | 修复 iOS 用户在主机名路由 HTTPS 代理后无法连接 Gateway 的问题 |

**待合并积压较大**：258 条 PR 等待合并，其中包含多个 XL 规模的大型功能 PR（如 [#134931](https://github.com/openclaw/openclaw/pull/134931) cloud-workers 项目快照复用、[#143594](https://github.com/openclaw/openclaw/pull/143594) Codex 原生子活动检查），维护者审阅压力显著。

---

## 4. 社区热点

### 讨论最活跃的 Issues（按评论数排序）

| 排名 | Issue | 评论数 | 核心议题 |
|---|---|---|---|
| 1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) — OpenClaw 泄漏未回收的 hook/tool 子进程 | 15 | 僵尸进程累积导致运行时退化 |
| 2 | [#132762](https://github.com/openclaw/openclaw/issues/132762) — overflow retry 成功但最终消息未送达 | 12 | 消息丢失（已关闭） |
| 3 | [#142585](https://github.com/openclaw/openclaw/issues/142585) — 2026.9.3 Doctor 拒绝合法的旧版工作区迁移 | 11 | 升级阻断（P0） |
| 4 | [#117262](https://github.com/openclaw/openclaw/issues/117262) — SQLite 3 并发写句柄导致 ~33s 事件循环停顿 | 10 | 核心性能瓶颈 |
| 5 | [#101763](https://github.com/openclaw/openclaw/issues/101763) — Hosted Molty 模型选择器不持久 | 10 | 托管服务 Bug（已关闭） |

**热点分析：** 社区讨论集中在**进程生命周期管理**（僵尸进程、崩溃循环）和**数据库并发性能**（SQLite 锁竞争）两大主题。这些问题的共同特征是影响面广、根因深、修复周期长，反映出项目在快速扩展功能的同时，底层资源管理机制需要系统性加固。

---

## 5. Bug 与稳定性

### P0 级（发布阻断）

| Issue | 标题 | 状态 | 已有 Fix PR |
|---|---|---|---|
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | 2026.9.3 Doctor 拒绝合法旧版工作区迁移 | OPEN | ❌ |
| [#140162](https://github.com/openclaw/openclaw/issues/140162) | Windows: Gateway restart 在 181s 超时后杀死正在启动的进程 | OPEN | ❌ |
| [#140948](https://github.com/openclaw/openclaw/issues/140948) | Windows 11: Gateway ready 后因 `PreparedModelRuntimeOwnerNotPublishedError` 终止 | OPEN | ❌ |
| [#141191](https://github.com/openclaw/openclaw/issues/141191) | System-expert 推理探针拒绝文档化的 SecretRef 配置 | OPEN | ❌ |
| [#141701](https://github.com/openclaw/openclaw/issues/141701) | Gateway 在 bind=lan + --tailscale serve 下崩溃循环 | CLOSED | ✅ |

### P1 级（高优先级）

| Issue | 标题 | 状态 | 已有 Fix PR |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 僵尸子进程泄漏 | OPEN | ❌ |
| [#117262](https://github.com/openclaw/openclaw/issues/117262) | SQLite 并发写锁导致 33s 事件循环停顿 | OPEN | ❌ |
| [#136311](https://github.com/openclaw/openclaw/issues/136311) | memory-core: 重索引锁无法释放，19GB 孤儿临时 DB 累积 | OPEN | ❌ |
| [#143640](https://github.com/openclaw/openclaw/issues/143640) | memory-core: 全量索引发布在单个 IMMEDIATE 事务中耗尽 5s busy timeout | OPEN | ❌ |
| [#143580](https://github.com/openclaw/openclaw/issues/143580) | Heartbeat lane: post-tool 续发缺少 transcript 导致混乱回复 | OPEN | ❌ |
| [#121617](https://github.com/openclaw/openclaw/issues/121617) | Post-compaction "Already compacted" 守卫误判为终端失败 | OPEN | ❌ |
| [#139274](https://github.com/openclaw/openclaw/issues/139274) | Native /codex bind 丢弃语音附件并跳过 STT | OPEN | ❌ |

**稳定性评估：** 当前 P0/P1 级未解决 Bug 数量偏多（10+），且多数集中在**进程管理、数据库并发、会话状态一致性**三个核心领域。尤其值得警惕的是 [#97616](https://github.com/openclaw/openclaw/issues/97616)（僵尸进程）和 [#117262](https://github.com/openclaw/openclaw/issues/117262)（SQLite 锁竞争）两个问题已分别开放超过 2 个月和 1 个月，至今无 fix PR，表明根因修复难度较大。

---

## 6. 功能请求与路线图信号

### 活跃功能请求

| Issue/PR | 标题 | 信号强度 | 可能纳入版本 |
|---|---|---|---|
| [#125842](https://github.com/openclaw/openclaw/issues/125842) | Gateway 提供认证的会话/轨迹数据读取 API | 中（已关闭，标记 stale） | 待定 |
| [#114579](https://github.com/openclaw/openclaw/issues/114579) | Feishu 频道增加消息删除（unsend）能力 | 低（P3，stale） | 远期 |
| [#112857](https://github.com/openclaw/openclaw/issues/112857) | 安全模型路由 — 影子模式候选准入与审计追踪 | 低（P3，已关闭） | 远期 |
| [#99611](https://github.com/openclaw/openclaw/issues/99611) | 让个人助手跨私密对话记忆 | 中（已关闭） | 待定 |
| [#143594](https://github.com/openclaw/openclaw/pull/143594) | 在 Background tasks 中检查 Codex 原生子活动 | **高**（XL PR，活跃开发中） | 下一版本候选 |
| [#134931](https://github.com/openclaw/openclaw/pull/134931) | cloud-workers: 复用项目快照并保持 worker 就绪 | **高**（XL PR，拆分中） | 后续版本 |

**路线图判断：** 项目当前优先级明显偏向**稳定性修复**而非新功能。多个大型功能 PR（如 cloud-workers、Codex 子活动检查）正在拆分和审阅中，但短期内发布的可能性受制于 P0/P1 Bug 的解决进度。功能请求类 Issue 多数被标记为 stale 或 P3，表明维护者正在有意控制功能范围以聚焦核心稳定性。

---

## 7. 用户反馈摘要

### 真实痛点提炼

1. **升级恐惧症正在形成**：多个用户报告从旧版本升级到 2026.9.x 时遭遇阻断（[#142585](https://github.com/openclaw/openclaw/issues/142585)），Doctor 拒绝迁移合法配置，导致用户被迫停留在旧版本。这直接损害了用户对升级流程的信任。

2. **资源泄漏影响长期运行**：僵尸进程（[#97616](https://github.com/openclaw/openclaw/issues/97616)）和 19GB 孤儿临时文件（[#136311](https://github.com/openclaw/openclaw/issues/136311)）的累积表明，OpenClaw 在长时间运行场景下的资源治理存在系统性缺陷。用户需要频繁手动清理或重启。

3. **Windows 平台体验显著落后**：多个 P0 级 Bug 集中在 Windows 环境（[#140162](https://github.com/openclaw/openclaw/issues/140162)、[#140948](https://github.com/openclaw/openclaw/issues/140948)），包括 Gateway 重启误杀、进程启动后崩溃等，反映出 Windows 平台的测试覆盖和平台适配不足。

4. **消息丢失问题反复出现**：尽管部分相关 Issue 已关闭（[#132762](https://github.com/openclaw/openclaw/issues/132762)、[#138592](https://github.com/openclaw/openclaw/issues/138592)），但新的消息丢失变体仍在出现（[#143580](https://github.com/openclaw/openclaw/issues/143580)），表明消息传递链路的可靠性尚未根本解决。

5. **Token 开销引发成本敏感用户不满**：[#141747](https://github.com/openclaw/openclaw/issues/141747) 报告运行时脚手架每轮注入约 686 tokens 且无退出选项，对于高频使用场景构成显著成本负担。

---

## 8. 待处理积压

### 长期未解决的高优先级 Issue（>30 天）

| Issue | 标题 | 开放天数 | 优先级 | 阻塞因素 |
|---|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 僵尸子进程泄漏 | ~73 天 | P1 | 无 fix PR，需维护者审查 |
| [#117262](https://github.com/openclaw/openclaw/issues/117262) | SQLite 并发写锁 33s 停顿 | ~40 天 | P1 | 无 fix PR，需产品决策 |
| [#87441](https://github.com/openclaw/openclaw/issues/87441) | diagnostics/memory 阈值参数未接入配置 | ~106 天 | P2 | 无 fix PR |
| [#75040](https://github.com/openclaw/openclaw/issues/75040) | extra_body 覆盖 thinking 字段（全提供商影响） | ~133 天 | P2 | 有 linked PR 但未合并 |
| [#95582](https://github.com/openclaw/openclaw/issues/95582) | backup create 硬杀后遗留多 GB 临时文件 | ~81 天 | P2 | 有 linked PR 但未合并 |

### 长期未合并的 PR（>30 天）

| PR | 标题 | 开放天数 | 阻塞因素 |
|---|---|---|---|
| [#67421](https://github.com/openclaw/openclaw/pull/67421) | feat: per-agent web_fetch SSRF overrides | ~148 天 | 需安全审查 + 兼容性评估 |
| [#116378](https://github.com/openclaw/openclaw/pull/116378) | fix(infra): report actual workspace write failures | ~42 天 | 标记 stale，等待作者响应 |
| [#120491](https://github.com/openclaw/openclaw/pull/120491) | feat(tools): per-turn per-target send budget guard | ~33 天 | 标记 waiting on author |

**积压提醒：** [#97616](https://github.com/openclaw/openclaw/issues/97616) 和 [#117262](https://github.com/openclaw/openclaw/issues/117262) 是两个最需要维护者关注的长周期 P1 问题，它们分别影响进程管理和数据库性能，且均无活跃的修复 PR。建议维护者评估是否需要在下一个版本中优先排期。

---

## 项目健康度评估

| 维度 | 状态 | 趋势 |
|---|---|---|
| 社区活跃度 | 🟢 极高（153 Issues + 500 PRs/24h） | ↑ |
| 代码合并速度 | 🟢 快（242 PRs 关闭/24h） | ↑ |
| 稳定性 | 🔴 承压（10+ P0/P1 未解决） | ↓ |
| 积压管理 | 🟡 中等（258 PRs 待合并，部分长期积压） | → |
| 跨平台质量 | 🔴 Windows 平台 P0 集中爆发 | ↓ |
| 用户信任度 | 🟡 升级阻断问题损害信心 | ↓ |

**综合判断：** OpenClaw 正处于**功能快速扩张后的稳定性偿还期**。社区贡献热情高涨，但核心基础设施（进程管理、数据库并发、跨平台适配）的技术债正在以 P0/P1 Bug 的形式集中爆发。建议维护者在未来 1-2 个版本周期内显著提高稳定性修复的优先级，特别是僵尸进程和 SQLite 锁竞争两个根因问题，以恢复用户对升级流程和长期运行可靠性的信心。

---

*报告生成时间：2026-09-10 | 数据窗口：过去 24 小时*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：** 2026-09-10
**数据窗口：** 过去 24 小时 GitHub 活动


## 1. 生态全景

个人 AI 助手与自主智能体开源生态正处于**高速扩张后的分化整合期**。以 OpenClaw 为代表的头部项目在经历功能快速扩张后，正面临基础设施技术债的集中偿还压力；NanoBot、CoPaw 等中型项目则在用户体验打磨与架构模块化上稳步推进；Zeroclaw 进入深度架构设计期，多个 RFC 反复修订但落地缓慢。整体生态呈现"头部承压、腰部活跃、尾部分化"的格局，社区贡献热情普遍高涨，但稳定性、安全性和跨平台质量成为制约各项目成熟度的共同瓶颈。MCP（Model Context Protocol）生态集成、持久化记忆、多会话一致性成为跨项目共同关注的技术方向。


## 2. 各项目活跃度对比

| 项目 | Issues 更新（24h） | PR 更新（24h） | 新版本发布 | 健康度评估 | 核心特征 |
|---|---|---|---|---|---|
| **OpenClaw** | 153（新开/活跃 76） | 500（合并/关闭 242） | ❌ 无 | 🔴 承压 | 高活跃但 P0/P1 积压严重，稳定性偿还期 |
| **NanoBot** | 5（新开 3） | 22（合并/关闭 13） | ❌ 无 | 🟢 良好 | 合并节奏健康，WebUI 与 Provider 适配并进 |
| **Zeroclaw** | 15 | 50（合并/关闭 1） | ❌ 无 | 🟡 设计密集期 | RFC 深度讨论，合并吞吐偏低 |
| **PicoClaw** | 2（均 stale 关闭） | 5（合并/关闭 1） | ❌ 无 | 🟡 维护中 | 推进缓慢，PR 积压，Issue 依赖 bot 关闭 |
| **NanoClaw** | 1 | 6（合并/关闭 3） | ❌ 无 | 🟢 良好 | 修复类工作主导，核心团队响应快 |
| **IronClaw** | 1 | 4（合并/关闭 0） | ❌ 无 | ⚠️ 放缓 | 合并节奏偏慢，MCP 改进为主线 |
| **LobsterAI** | 20（新开/活跃 16） | 12（合并/关闭 10） | ❌ 无 | 🟡 修复密集但安全积压 | 升级适配集中修复，5 条安全漏洞超 2 月未处理 |
| **CoPaw** | 21（新开/活跃 10） | 34（合并/关闭 11） | ❌ 无 | 🟢 良好 | 会话一致性修复推进，记忆架构并行开发 |
| **Moltis** | 0 | 0 | ❌ 无 | ⚪ 无活动 | 过去 24 小时无任何动态 |

**关键观察：** 所有项目今日均无新版本发布，但 PR 合并活跃度差异显著——OpenClaw 以 242 条合并/关闭遥遥领先，NanoBot（13 条）和 CoPaw（11 条）紧随其后，Zeroclaw 和 IronClaw 则处于合并低谷期。


## 3. OpenClaw 在生态中的定位

### 3.1 社区规模与活跃度

OpenClaw 的社区规模在同类项目中处于**绝对领先地位**。其 24 小时 Issues 更新量（153 条）是第二名 CoPaw（21 条）的 7 倍以上，PR 更新量（500 条）是第二名 Zeroclaw（50 条）的 10 倍。这种量级差异表明 OpenClaw 已成为该生态的**事实性核心参照项目**，其架构决策和稳定性表现对整个生态具有风向标意义。

### 3.2 技术路线差异

| 维度 | OpenClaw | 其他项目特征 |
|---|---|---|
| **架构复杂度** | 高度复杂，涵盖 Gateway、多 Provider、多通道、memory-core、cloud-workers 等完整基础设施 | NanoBot/CoPaw 更聚焦于单机/轻量部署场景 |
| **平台覆盖** | 跨平台但 Windows 适配问题突出 | PicoClaw 明确面向低资源设备（10-20MB 内存） |
| **扩展机制** | 插件/工具生态成熟，但进程生命周期管理存在系统性缺陷 | Zeroclaw 正在设计 WASM 插件运行时，架构更前瞻 |
| **部署模式** | 支持本地、Gateway、cloud-workers 多层部署 | NanoClaw/CoPaw 偏向单机 + 多通道接入 |

### 3.3 核心优势与风险

**优势：** 功能覆盖面最广、社区贡献者基数最大、Provider 和通道生态最丰富、修复吞吐能力极强（242 PR/24h）。

**风险：** 技术债积累速度超过偿还速度。僵尸进程泄漏（#97616，73 天未解决）和 SQLite 锁竞争（#117262，40 天未解决）两个根因问题长期无 fix PR，反映出在快速扩张过程中，底层资源管理机制未能同步加固。Windows 平台 P0 级 Bug 集中爆发进一步暴露了跨平台测试覆盖的不足。


## 4. 共同关注的技术方向

### 4.1 持久化记忆与跨会话上下文（🔥 最高共识）

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | #99611 让个人助手跨私密对话记忆（已关闭但需求持续）；memory-core 重索引锁泄漏（#136311）和全量索引事务超时（#143640） |
| **NanoBot** | #5721 MemCode 创始人主动提出跨部署持久化记忆后端集成 |
| **CoPaw** | #7656 跨会话持久记忆；OpenViking 后端（#7613）、ReMe 命令统一（#7444）、ADBPG/PowerContext 插件化（#7616）三条线并行推进 |
| **LobsterAI** | #2046 系统性 Agent 记忆改进方案（session 元数据持久化、跨 session 记忆检索），已被 stale 关闭但方案质量高 |

**趋势判断：** 持久化记忆已从"可选增强"演变为"核心刚需"。多个项目同时出现外部合作方（MemCode）主动接入信号，表明记忆后端正在形成独立生态位。

### 4.2 MCP 生态集成与可靠性

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | MCP 相关修复持续合并（OAuth 刷新、schema 漂移提示） |
| **NanoBot** | #5573 MCP OAuth 令牌自动刷新（已合并）；#5662 OpenCode session header 适配（P1 已合并） |
| **IronClaw** | #8090 hosted-MCP 目录按调用者隔离；#8084 SEP-414 调用者归因（opt-in） |
| **CoPaw** | #4175 MCP 客户端 TLS 验证和 CA 文件支持（4 个月未响应）；#7650 频道参数透传给 MCP 工具 |
| **PicoClaw** | #3269 MCP 服务器连接失败导致 agent 挂起（已 stale 关闭但底层问题可能未解决） |

**趋势判断：** MCP 已从"连接协议"演变为"多租户服务治理协议"。IronClaw 的 SEP-414 归因和按调用者隔离方向，以及 CoPaw 的 TLS/超时配置需求，共同指向 MCP 在企业级部署中的安全性和可观测性需求。

### 4.3 多会话/多通道一致性

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | #143580 Heartbeat lane post-tool 续发缺少 transcript 导致混乱回复 |
| **CoPaw** | #7231 Console 消息发送到错误会话（已修复）；#7011 停止请求取消活跃飞书会话；#7661 点击历史会话后错误创建新会话 |
| **NanoClaw** | #3738 多线程会话中文件/消息落入错误线程（已修复） |
| **PicoClaw** | #3358 群聊回复未关联原始消息（PR 已 stale） |

**趋势判断：** 随着用户同时通过多个通道（Console、Telegram、Discord、飞书、QQ）与助手交互，会话身份管理和消息路由的准确性成为跨项目共同挑战。

### 4.4 资源治理与长期运行稳定性

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | 僵尸进程泄漏（#97616）、SQLite 锁竞争（#117262）、19GB 孤儿临时文件（#136311） |
| **LobsterAI** | 数据备份 100% 卡死（#2214）、Token 消耗异常（#2230，比 CodeBuddy 多 900 倍） |
| **CoPaw** | 同步调用阻塞事件循环（#7363，Windows 启动 118-135 秒无响应） |
| **NanoBot** | 后台任务异常静默（#5429，23 天无 fix PR） |

**趋势判断：** 长时间运行场景下的资源泄漏和性能退化是各项目从"可用"走向"可靠"必须跨越的门槛。


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手平台，多 Provider/通道/工具生态 | 深度用户、开发者、自托管爱好者 | 重量级单体 + Gateway + cloud-workers，架构最完整但技术债最重 |
| **NanoBot** | 轻量级个人助手，WebUI 体验优先，Provider 快速适配 | 个人用户、桌面/移动端用户 | 轻量架构，WebUI 迭代速度快，Provider 兼容性响应敏捷 |
| **Zeroclaw** | 架构前瞻型，会话所有权、WASM 插件、事件溯源 | 架构师、对安全沙箱有高要求的用户 | RFC 驱动的设计先行模式，WASM 插件运行时是差异化亮点 |
| **PicoClaw** | 低资源设备适配，IRC/QQ/DeltaChat 等传统协议 | 嵌入式/边缘设备用户、RISC-V/ARM 板卡爱好者 | 极轻量，面向 10-20MB 内存设备，协议覆盖偏传统 |
| **NanoClaw** | 任务调度、agent-runner 核心路径 | 自动化工作流用户 | 聚焦任务调度和 agent 执行，范围相对收敛 |
| **IronClaw** | MCP 生态治理、Telegram 集成 | MCP 服务商、多租户部署场景 | MCP 多用户隔离和调用归因是核心差异化 |
| **LobsterAI** | 网易有道生态集成，QQ/桌面 IM 同步 | 中文用户、网易生态用户 | 深度绑定网易模型和 IM 生态，OpenClaw 上游适配 |
| **CoPaw** | 多通道会话管理、记忆系统架构演进 | 多通道并行用户、记忆密集型场景 | 记忆后端插件化（ADBPG/PowerContext/OpenViking）是特色 |

**关键差异总结：**
- **OpenClaw 是"平台型"项目**，追求功能完备性；**NanoBot 是"体验型"项目**，追求快速迭代和用户友好；**Zeroclaw 是"架构型"项目**，追求设计前瞻性；**PicoClaw 是"极简型"项目**，追求资源效率。
- **IronClaw 在 MCP 治理方向上形成了独特定位**，与 OpenClaw 的 MCP 集成形成互补而非直接竞争。
- **LobsterAI 和 CoPaw 分别代表了"生态绑定型"和"记忆驱动型"两条差异化路径**。


## 6. 社区热度与成熟度

### 6.1 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **第一梯队（极高活跃）** | OpenClaw | 153 Issues + 500 PRs/24h，社区规模远超其他项目 |
| **第二梯队（高活跃）** | CoPaw、Zeroclaw、LobsterAI | 15-21 Issues + 12-50 PRs/24h，各有侧重 |
| **第三梯队（中等活跃）** | NanoBot、NanoClaw、IronClaw、PicoClaw | 1-5 Issues + 4-22 PRs/24h，节奏稳定但规模有限 |
| **无活动** | Moltis | 过去 24 小时零活动 |

### 6.2 发展阶段判断

| 阶段 | 项目 | 判断依据 |
|---|---|---|
| **快速迭代期** | OpenClaw、NanoBot、CoPaw | 高 PR 合并量，功能与修复并行推进，但 OpenClaw 已出现技术债偿还需求 |
| **质量巩固期** | NanoClaw、IronClaw | 修复类工作主导，新功能开发放缓，聚焦稳定性 |
| **设计探索期** | Zeroclaw | RFC 多轮修订，架构决策周期长，代码合并吞吐低 |
| **维护放缓期** | PicoClaw | PR 积压，Issue 依赖 stale bot 关闭，维护者响应不足 |
| **安全危机期** | LobsterAI | 5 条安全漏洞超 2 个月无修复，高严重度 Bug 积压 |

### 6.3 社区健康度信号

**积极信号：**
- NanoBot 的 WebUI 贡献者 @chengyongru 连续提交多条高质量 PR，显示出良好的贡献者留存
- CoPaw 用户 @xjbsenkfi 通过解包 PyInstaller 后端验证版本号，报告质量极高
- Zeroclaw 核心贡献者 @NiuBlibing 同时主导多个架构 RFC，显示出深度的社区投入

**警示信号：**
- OpenClaw 的"升级恐惧症"正在形成，多个用户报告升级阻断问题
- PicoClaw 和 LobsterAI 的 Issue 大量依赖 stale bot 关闭，人工响应不足
- Zeroclaw 的 RFC 流程疲劳（#10549 提议简化投票流程）反映出社区对决策效率的不满
- NanoBot 和 CoPaw 均有贡献者 PR 长期未获 review 的情况（2 个月+），存在贡献者流失风险


## 7. 值得关注的趋势信号

### 7.1 对 AI 智能体开发者的参考价值

**信号 1：进程生命周期管理是自主智能体的"隐形杀手"**
OpenClaw 的僵尸进程泄漏（73 天未解决）和 CoPaw 的同步调用阻塞事件循环问题共同揭示了一个核心挑战：AI 智能体在长时间运行中会不断创建和销毁子进程（工具调用、模型推理、通道连接），如果缺乏系统性的进程回收和超时机制，资源泄漏将不可避免。**开发者应在架构设计阶段就将进程治理作为一等公民，而非事后修补。**

**信号 2：SQLite 在并发写入场景下的瓶颈正在成为行业共识**
OpenClaw 的 33 秒事件循环停顿（#117262）和 CoPaw 的 history.db FTS 损坏问题（#7596）表明，SQLite 在单文件并发写入场景下的锁竞争和完整性风险是真实且普遍的。**对于需要高并发写入的智能体应用，开发者应认真评估 WAL 模式、分库策略或迁移到 PostgreSQL 的时机。**

**信号 3：MCP 正在从"连接协议"演变为"服务治理协议"**
IronClaw 的 SEP-414 调用者归因和按调用者隔离、CoPaw 的 TLS 验证需求、NanoBot 的 OAuth 自动刷新，共同指向 MCP 生态的成熟化趋势。**开发者应关注 MCP 在企业级部署中的安全性和可观测性需求，提前规划多租户隔离和调用溯源能力。**

**信号 4：持久化记忆正在形成独立生态位**
MemCode 创始人同时向 NanoBot 和 CoPaw 提出集成方案，OpenClaw 的 memory-core 持续演进，CoPaw 的记忆后端插件化（ADBPG/PowerContext/OpenViking 三线并行），表明记忆系统正在从"内嵌功能"走向"可插拔后端"。**开发者应关注记忆后端的标准化趋势，避免在单一实现上过度耦合。**

**信号 5：跨平台质量是用户信任的"最后一公里"**
OpenClaw 的 Windows P0 级 Bug 集中爆发、Zeroclaw 的 macOS/Windows 日志为空、CoPaw 的 Windows 启动 2 分钟无响应，共同表明跨平台测试覆盖不足是开源项目的普遍短板。**开发者应将 Windows/macOS 纳入 CI 的一等公民测试矩阵，而非仅依赖 Linux 环境。**

**信号 6：Token 成本正在成为用户流失的隐性推手**
OpenClaw 的 686 tokens/轮脚手架开销（#141747）和 LobsterAI 的 900 倍 Token 消耗异常（#2230）表明，用户对 Token 成本的敏感度正在快速上升。**开发者应在架构设计中加入 Token 预算监控和优化机制，将成本可观测性作为产品竞争力的一部分。**

**信号 7：RFC 流程的效率与质量之间存在张力**
Zeroclaw 的 RFC 修订最高达 Revision 10，社区已出现流程疲劳信号（#10549 提议简化投票）。**对于采用 RFC 驱动开发模式的项目，应定期审视流程效率，避免设计讨论成为事实上的开发阻塞点。**


## 总结

个人 AI 助手开源生态正处于**从"功能竞赛"向"可靠性竞赛"转型的关键节点**。OpenClaw 作为生态标杆，其稳定性挑战具有行业警示意义；NanoBot 和 CoPaw 展示了中型项目在用户体验和架构演进上的健康节奏；Zeroclaw 的架构探索和 IronClaw 的 MCP 治理方向为生态提供了差异化创新。对于技术决策者而言，当前选择项目的核心考量应从"功能覆盖度"转向"长期运行可靠性"和"社区响应健康度"——一个功能丰富但 P0 级 Bug 长期悬置的项目，其实际可用性可能低于功能精简但稳定性扎实的替代方案。

---

*报告生成时间：2026-09-10 | 分析师：AI 智能体开源生态技术分析师*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报

**日期：** 2026-09-10
**数据来源：** github.com/HKUDS/nanobot

---

## 1. 今日速览

NanoBot 今日呈现**高活跃度**状态，PR 流水线运转强劲：过去 24 小时内 22 条 PR 更新中 13 条已完成合并/关闭，9 条待合并，显示出维护者与社区贡献者之间良好的协作节奏。Issue 侧相对平稳（5 条更新，3 条新开/活跃），无新版本发布。值得关注的是，今日合并的 PR 集中在 **WebUI 体验优化、Telegram 频道适配、MCP OAuth 自动刷新、exec 工具 UTF-8 流式输出修复** 等多个维度，项目在功能完善与稳定性加固上同步推进。整体健康度评估：**良好，处于活跃迭代期**。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

过去 24 小时内合并/关闭的重要 PR 共 13 条，核心进展如下：

### 🔧 功能增强与体验优化

| PR | 标题 | 贡献者 | 进展 |
|---|---|---|---|
| [#5704](https://github.com/HKUDS/nanobot/pull/5704) | feat(webui): expand and organize settings with autosave | @chengyongru | 设置面板大幅扩展，支持自动保存 |
| [#5710](https://github.com/HKUDS/nanobot/pull/5710) | feat(webui): organize projects and simplify sidebar navigation | @chengyongru | 侧边栏重构，项目与话题分层导航 |
| [#5722](https://github.com/HKUDS/nanobot/pull/5722) | feat(webui): refine sidebar hierarchy and selection feedback | @chengyongru | 侧边栏选中反馈与层级视觉优化 |
| [#5662](https://github.com/HKUDS/nanobot/pull/5662) | feat(providers): send x-opencode-session header for OpenCode session | @GUTYL | **P1 优先级**，适配 OpenCode 2026-09-06 后的强制要求 |
| [#5628](https://github.com/HKUDS/nanobot/pull/5628) | feat(exec): add a macOS Seatbelt sandbox backend | @LuckTerence | exec 工具新增 macOS Seatbelt 沙箱后端 |

### 🐛 关键 Bug 修复

| PR | 标题 | 贡献者 | 进展 |
|---|---|---|---|
| [#5573](https://github.com/HKUDS/nanobot/pull/5573) | fix(mcp): refresh expired OAuth tokens automatically | @chengyongru | MCP OAuth 令牌过期自动刷新，支持网关重启后恢复 |
| [#5708](https://github.com/HKUDS/nanobot/pull/5708) | fix(exec): preserve UTF-8 across streaming output chunks | @gary23w | 修复长输出流中 UTF-8 字符跨块截断问题 |
| [#5715](https://github.com/HKUDS/nanobot/pull/5715) | fix(webui): honor persisted session marker for titles | @ZIFeIYUuuuuuu | 修复 WebUI 重启后会话标题丢失问题（关联 Issue #5647） |
| [#5707](https://github.com/HKUDS/nanobot/pull/5707) | fix(tg): route /compact and /evaluator-prompt to the command router | @Naster17 | Telegram 频道补齐 `/compact` 和 `/evaluator-prompt` 命令路由 |
| [#5711](https://github.com/HKUDS/nanobot/pull/5711) | fix(telegram): adapt command spellings within the channel | @Naster17 | Telegram 命令拼写适配（下划线 vs 连字符） |
| [#5717](https://github.com/HKUDS/nanobot/pull/5717) | fix(webui): preserve project when creating a topic from its menu | @chengyongru | 修复从项目菜单创建话题时项目选择丢失 |

**整体评估：** 今日合并的 PR 覆盖了 WebUI 体验（4 条）、频道适配（2 条）、Provider 兼容性（1 条 P1）、安全沙箱（1 条）、MCP 稳定性（1 条）等多个关键领域，项目在**用户体验打磨**和**底层稳定性**两个方向上均有实质性推进。

---

## 4. 社区热点

今日 Issues/PRs 中评论与互动数据整体偏低（最高仅 2 条评论），但以下条目值得关注：

### 🔥 热点 1：WebUI 会话标题修复闭环
- **Issue [#5647](https://github.com/HKUDS/nanobot/issues/5647)**（已关闭，2 评论）→ **PR [#5715](https://github.com/HKUDS/nanobot/pull/5715)**（已合并）
- **诉求：** 用户 @zpljd258 发现 PR #5528 的修复在 `unifiedSession` 模式下仍存在边界情况——前端 envelope 缺少 `webui` 标志时，会话标题无法正确生成。该问题在 7 天内完成了从报告到修复的完整闭环，体现了社区对 WebUI 会话管理细节的高度关注。

### 🔥 热点 2：OpenCode Provider 兼容性紧急适配
- **Issue [#5661](https://github.com/HKUDS/nanobot/issues/5661)**（已关闭，1 👍）→ **PR [#5662](https://github.com/HKUDS/nanobot/pull/5662)**（已合并，P1）
- **诉求：** OpenCode 官方宣布 2026-09-06 起缺失 `x-opencode-session` header 的请求将失去 prompt 缓存优化甚至报错。@GUTYL 在截止日期前 2 天提交修复，维护者以 P1 优先级合并，反映出 NanoBot 对上游 Provider 变更的**快速响应能力**。

### 🔥 热点 3：持久化记忆需求浮现
- **Issue [#5721](https://github.com/HKUDS/nanobot/issues/5721)**（新开，0 评论）
- **诉求：** MemCode 创始人 Vivek Gupta 主动提出集成方案，希望为 NanoBot 提供跨部署的持久化记忆后端。这是典型的**生态合作信号**，值得维护者关注。

---

## 5. Bug 与稳定性

### 🔴 高优先级（P1）

| Issue/PR | 描述 | 状态 |
|---|---|---|
| [#5536](https://github.com/HKUDS/nanobot/pull/5536) | fix(exec): fail closed when restricted shell lacks a sandbox — 修复受限 shell 无沙箱时的安全漏洞（关联 #4072） | ⏳ 待合并（标记 conflict） |

### 🟡 中优先级（P2）

| Issue/PR | 描述 | 状态 |
|---|---|---|
| [#5429](https://github.com/HKUDS/nanobot/issues/5429) | AgentLoop 不检索后台任务的异常 — `schedule_background()` 的完成回调未调用 `task.result()`，异常被静默吞掉 | ⚠️ 无 fix PR |
| [#5719](https://github.com/HKUDS/nanobot/issues/5719) | Discord 自动压缩通知无视 `sendProgress: false` 设置 | ✅ 已有 fix PR [#5720](https://github.com/HKUDS/nanobot/pull/5720) |
| [#4819](https://github.com/HKUDS/nanobot/pull/4819) | fix(memory): WeakValueDictionary 锁可能被 GC 回收导致并发合并 | ⏳ 待合并（标记 conflict，已挂起 2 个月） |
| [#4820](https://github.com/HKUDS/nanobot/pull/4820) | fix(runtime): 拒绝非字符串 web fetch URL | ⏳ 待合并（已挂起 2 个月） |

### 🟢 已修复

- **UTF-8 流式输出截断**（[#5708](https://github.com/HKUDS/nanobot/pull/5708)）：长输出跨 4096 字节块时多字节字符被替换为无效标记，已合并修复。
- **MCP OAuth 令牌过期**（[#5573](https://github.com/HKUDS/nanobot/pull/5573)）：网关重启后刷新状态丢失导致 401，已合并修复。
- **WebUI 重启后标题丢失**（[#5715](https://github.com/HKUDS/nanobot/pull/5715)）：已合并修复。

---

## 6. 功能请求与路线图信号

### 新功能请求

| Issue/PR | 功能 | 信号强度 | 判断 |
|---|---|---|---|
| [#5721](https://github.com/HKUDS/nanobot/issues/5721) | 跨会话持久化记忆（MemCode 集成） | ⭐⭐⭐ | 有明确合作方，可能进入讨论 |
| [#5718](https://github.com/HKUDS/nanobot/pull/5718) | OpenRouter 原生图像生成 API 支持 | ⭐⭐⭐⭐ | PR 已提交，P2 优先级，大概率纳入 |
| [#5437](https://github.com/HKUDS/nanobot/pull/5437) | Serply（Google Search API）搜索 Provider | ⭐⭐⭐ | PR 已提交 3 周，P2，待维护者 review |
| [#5641](https://github.com/HKUDS/nanobot/pull/5641) | iOS PWA 点击与状态栏修复 | ⭐⭐⭐ | PR 已提交 1 周，P2，WebUI 移动端体验优化 |

### 路线图判断

- **OpenRouter 图像生成**（#5718）与 **Serply 搜索 Provider**（#5437）均遵循既有 Provider 扩展模式，技术路径清晰，预计将在下一版本中合并。
- **iOS PWA 修复**（#5641）与近期 WebUI 体验优化方向一致，合并概率较高。
- **MemCode 持久化记忆**（#5721）涉及架构级决策（是否引入外部依赖），短期内可能仅进入讨论阶段。

---

## 7. 用户反馈摘要

### 正面信号
- **WebUI 体验持续改善**：@chengyongru 连续提交多条 WebUI 优化 PR（#5704、#5710、#5722、#5717），覆盖设置面板、侧边栏导航、项目组织等核心交互，反映出维护者对用户界面体验的持续投入。
- **Provider 兼容性响应迅速**：OpenCode 变更在截止日期前完成适配（#5662），用户 @GUTYL 主动提交修复并获得 P1 优先级处理。

### 痛点与不满
- **后台任务异常静默**（[#5429](https://github.com/HKUDS/nanobot/issues/5429)）：用户 @yu-xin-c 指出 AgentLoop 的后台任务异常被完全吞掉，调试困难。该问题已挂起 23 天，无 fix PR，属于**开发者体验痛点**。
- **Discord 通知行为不一致**（[#5719](https://github.com/HKUDS/nanobot/issues/5719)）：用户 @jhonnyisaacc 反馈自动压缩通知无视 `sendProgress: false` 配置，干扰正常聊天。已有 fix PR 但尚未合并。
- **长期挂起的 PR**：@axelray-dev 的两个修复（#4819、#4820）已等待超过 2 个月，标记 conflict 后未获处理，可能让贡献者感到挫败。

---

## 8. 待处理积压

### ⚠️ 需维护者关注

| 条目 | 类型 | 挂起时长 | 问题 |
|---|---|---|---|
| [#4819](https://github.com/HKUDS/nanobot/pull/4819) | PR | ~2 个月 | 内存合并锁的 GC 竞态问题，标记 conflict 未处理 |
| [#4820](https://github.com/HKUDS/nanobot/pull/4820) | PR | ~2 个月 | 非字符串 URL 类型校验，标记 conflict 未处理 |
| [#5429](https://github.com/HKUDS/nanobot/issues/5429) | Issue | 23 天 | AgentLoop 后台任务异常静默，无 fix PR |
| [#5536](https://github.com/HKUDS/nanobot/pull/5536) | PR | 16 天 | P1 安全修复（exec 沙箱 fail-closed），标记 conflict |
| [#5437](https://github.com/HKUDS/nanobot/pull/5437) | PR | 22 天 | Serply 搜索 Provider，待 review |

### 📊 积压分析

- **Conflict 标记集中**：#4819、#4820、#5536 均标记 conflict，可能与近期 WebUI 和 exec 模块的大规模重构有关。建议维护者在合并窗口期优先解决这些冲突，避免贡献者流失。
- **P1 安全修复积压**：#5536 涉及 exec 工具的安全加固，已挂起 16 天，建议提升处理优先级。

---

*报告生成时间：2026-09-10 | 数据窗口：过去 24 小时*

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报

**日期：** 2026-09-10
**数据来源：** github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

Zeroclaw 项目今日处于**高活跃度但合并吞吐偏低**的状态。过去 24 小时新增/活跃 Issues 15 条、PR 更新 50 条，但仅 1 条 PR 完成合并/关闭，无新版本发布。社区讨论重心集中在**架构级 RFC 的迭代修订**（会话所有权、WASM 插件运行时、事件溯源等），多个 RFC 已进入多轮修订阶段（最高达 Revision 10），显示设计决策周期较长。同时，今日报告了 4 个 S2 级 Bug（Windows 栈溢出、macOS/Windows 日志为空、Telegram 语音跳过、流式回退失效），其中 2 个已有对应 fix PR。整体而言，项目处于**深度设计讨论期**，代码合并节奏相对放缓，但社区贡献活跃度维持在较高水平。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

过去 24 小时仅 1 条 PR 完成合并/关闭，合并吞吐量显著低于活跃 PR 数量（50 条中 49 条待合并）。当前有多个大型 PR（size:XL）处于 `needs-author-action` 或 `needs-maintainer-review` 状态，等待进一步推进。

**值得关注的在途 PR：**

- **[#10735](https://github.com/zeroclaw-labs/zeroclaw/pull/10735)** — `fix(rpc): heap-pin the largest process_line dispatch branches for Windows stack`（size:XS）：针对今日报告的 Windows 栈溢出 Bug（#10734）的直接修复，将最大的 `process_line` 分发分支堆分配以规避受限线程栈。该 PR 与 Issue 同日提交，响应速度良好。

- **[#10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732)** — `fix(service): select the daemon log by content, not existence`（size:M）：修复 macOS/Windows/OpenRC 上 `zeroclaw service logs` 输出为空的问题（#10731），改为按日志内容而非文件存在性选择读取路径。

- **[#10412](https://github.com/zeroclaw-labs/zeroclaw/pull/10412)** — `feat(session): extract the atomic session-ownership claim into a shared SessionBackend contract`（size:XL）：将会话所有权原子声明提取为共享的 `SessionBackend` 契约，是会话架构 RFC（#9487）的落地实现之一。

**整体评估：** 项目今日在代码合并层面推进有限，但多个修复 PR 已就绪，预计未来 24-48 小时内合并吞吐将有所回升。

---

## 4. 社区热点

今日讨论最活跃的 Issues 集中在**架构级 RFC** 领域，评论数排名如下：

| Issue | 标题 | 评论数 | 热度驱动因素 |
|---|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters | 37 | 已迭代至 Revision 5，涉及运行时会话所有权与传输面适配器，是核心架构变更 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified file and attachment architecture for conversation surfaces | 30 | 已迭代至 Revision 10，是所有 RFC 中修订次数最多的，文件/附件统一架构诉求强烈 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy - filesystem restrictions | 29 | 安全策略细化，涉及 Bubblewrap/Landlock/Seatbelt 多后端统一，安全敏感度高 |
| [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) | RFC: Make wire protocol first-class in provider construction and onboarding | 19 | Provider 接入体验改进，降低第三方接入门槛 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | [Tracker]: Maintainer decision queue for RFCs and design issues | 15 | 维护者决策队列追踪器，反映 RFC 积压问题 |

**背后诉求分析：**

1. **架构收敛需求强烈**：多个 RFC 反复修订（#9488 达 Revision 10），说明社区对会话、文件、传输面等核心抽象的统一方案有迫切期待，但设计共识难以快速达成。
2. **安全策略精细化**：#6996 和 #10360（家庭边缘网格）均涉及安全边界，社区在"本地优先"与"分布式能力"之间存在张力。
3. **RFC 流程本身成为瓶颈**：#10549 提议简化 RFC 投票流程（移除强制讨论窗口），#8692 追踪器显示维护者决策队列积压，社区对流程效率已有反思。

---

## 5. Bug 与稳定性

今日报告 4 个 S2 级 Bug（降级行为），无 S1 级（完全不可用）问题：

| 严重度 | Issue | 描述 | Fix PR 状态 |
|---|---|---|---|
| **S2** | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | `process_line` 在受限 Windows 线程栈上栈溢出（`0xc00000fd`），影响 `Advisory Windows nextest` CI 任务 | ✅ [#10735](https://github.com/zeroclaw-labs/zeroclaw/pull/10735) 已提交 |
| **S2** | [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | `zeroclaw service logs` 在 macOS/Windows/OpenRC 上输出为空（仅 systemd 正常） | ✅ [#10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732) 已提交 |
| **S2** | [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) | Telegram 语音回复以 `[` 开头时被静默跳过（ElevenLabs v3 音频标签误判） | ❌ 无 fix PR |
| **S2** | [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | 流式输出失败时，广告的非流式回退未实际执行 | ❌ 无 fix PR |

**安全告警：**

- [#10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728) — `npm audit failed`：`js-yaml` 依赖存在高危漏洞（非直接依赖），由 GitHub Actions 自动报告，需关注依赖升级。

**稳定性评估：** 今日报告的 Bug 均为 S2 级降级行为，无核心功能完全不可用的情况。2/4 已有同日修复 PR，响应速度良好。但 #10689（Telegram 语音）和 #10736（流式回退）尚无修复方案，需持续跟踪。

---

## 6. 功能请求与路线图信号

今日活跃的功能请求/架构提案信号如下：

**高优先级架构 RFC（可能进入下一版本）：**

1. **[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — Runtime-owned conversation sessions**：运行时拥有会话所有权，引入传输面适配器。已有对应 PR [#10412](https://github.com/zeroclaw-labs/zeroclaw/pull/10412) 在途，落地可能性高。

2. **[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) — Append-only session event history**：追加式会话事件历史、确定性状态重放、派生 Agent 流。这是事件溯源方向的重大架构演进，与 #9487 形成协同。

3. **[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) — Composable WASM plugin runtime**：可组合 WASM 插件运行时架构，提供类型化扩展点和可替换 Provider。已明确将 #10526 作为事件词汇的权威来源，显示 RFC 间正在形成依赖关系网。

4. **[#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) — Opt-in household edge mesh**：家庭边缘网格，支持跨设备 Pull Worker 和签名回执。这是从"单机本地"向"家庭分布式"的扩展尝试，但优先级为 p3，短期落地可能性较低。

**流程改进信号：**

- **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — Simplify RFC voting**：提议移除强制讨论窗口、让 REVISE 停止当前快照。该 RFC 本身反映了社区对当前流程效率的不满，若通过将加速后续 RFC 的决策速度。

**判断：** 下一版本（或下几个版本）的核心方向大概率围绕**会话架构重构**（#9487 + #10526）和 **WASM 插件运行时**（#10076）展开。这两个方向已有多个大型 PR 在途，且 RFC 修订已进入后期阶段。

---

## 7. 用户反馈摘要

从 Issues 评论中提炼的真实用户痛点：

**痛点 1：跨平台体验不一致**
- #10731 暴露了 `service logs` 在非 systemd 平台上的功能缺失。用户 @rifuki 指出"Linux with systemd 已经定义了正确行为"，但其他平台"选择两个捕获文件之一"，导致日志为空。这反映了 Zeroclaw 在 Linux 之外的平台体验仍有明显差距。

**痛点 2：Provider 接入的隐性陷阱**
- #10736 显示，当流式请求在输出前失败时，运行时日志声称回退到非流式，但实际并未发送请求。用户 @Audacity88 的反馈表明，**错误处理路径的"承诺"与"实际行为"不一致**，这对依赖 Reliable Provider 的用户是隐蔽的可靠性风险。
- #10689 中 Telegram 语音回复因文本以 `[` 开头被静默跳过，且"无日志行"——用户 @badbat75 强调的"silently skipped"是关键痛点：**静默失败**让用户无法感知问题存在。

**痛点 3：RFC 流程疲劳**
- #9488 已迭代至 Revision 10，#9487 至 Revision 5，多个 RFC 的修订历史显示社区在架构设计上反复拉锯。#10549 的提出者 @Audacity88 直言"固定讨论期往往不会产生更多审查"，反映贡献者对流程效率的失望。

**积极信号：**
- 多个 RFC 由社区成员主动起草并提交（如 @NiuBlibing 同时主导 #9487、#9488、#10076、#10526），显示核心贡献者对架构方向有持续投入。
- Bug 修复响应速度快（#10734 → #10735 同日提交），社区自愈能力良好。

---

## 8. 待处理积压

以下 Issues/PRs 长期未获维护者响应或处于阻塞状态，建议优先关注：

**长期未决的 RFC（超过 2 个月）：**

| Issue | 标题 | 创建日期 | 状态 | 关注点 |
|---|---|---|---|---|
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy - filesystem restrictions | 2026-05-28 | `status:in-progress` + `status:accepted` | 已接受但仍在进行中，涉及安全策略核心，需明确落地时间表 |
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions | 2026-07-28 | `needs-maintainer-review` | Revision 5 已提交，等待维护者开启新一轮投票窗口 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified file and attachment architecture | 2026-07-28 | `needs-maintainer-review` | Revision 10，修订次数最多，需尽快收敛 |

**阻塞状态的 PR：**

| PR | 标题 | 状态 | 阻塞原因 |
|---|---|---|---|
| [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) | feat(runtime): expose token accounting on history-trim events | `status:blocked` + `do-not-merge` | 被标记为 do-not-merge，需明确解除阻塞的条件 |
| [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) | feat(security): canonical sandbox_policy schema | `needs-author-action` | 与 #6996 关联，等待作者响应 |

**需维护者关注的自动报告：**

- [#10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728) — npm audit 高危漏洞（js-yaml），由 bot 自动创建，需确认是否已有升级计划。

---

## 项目健康度总结

| 维度 | 评估 | 趋势 |
|---|---|---|
| **社区活跃度** | 高（15 Issues + 50 PRs/24h） | → 稳定 |
| **合并吞吐** | 低（1 PR/24h） | ↓ 短期放缓 |
| **Bug 响应速度** | 良好（2/4 同日修复） | ↑ 改善 |
| **RFC 决策效率** | 偏低（多轮修订，决策队列积压） | ↓ 需关注 |
| **安全态势** | 1 个高危依赖漏洞待处理 | ⚠️ 需行动 |
| **架构方向清晰度** | 中等（会话/WASM 方向明确，但细节仍在拉锯） | → 收敛中 |

**总体判断：** Zeroclaw 处于**架构设计密集期**，社区贡献活跃但决策周期偏长。短期需关注：npm 依赖漏洞修复、#9487/#9488 的投票推进、以及 #9713 阻塞 PR 的解除。若 RFC 流程简化提案（#10549）获得通过，后续决策效率有望显著提升。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报

**日期：2026-09-10**

---

## 1. 今日速览

PicoClaw 项目今日无新版本发布，但社区维护活动保持稳定。过去 24 小时内关闭了 2 条 Issues（均为 stale 自动关闭）和 1 条 PR，同时有 4 条 PR 处于待合并状态。整体活跃度处于中等水平，主要贡献集中在 IRC 协议增强、频道消息处理优化及 DeltaChat 模块重构等方向。值得注意的是，今日关闭的 Issue #3269 涉及 MCP 服务器连接失败导致 agent 挂起的稳定性问题，虽已关闭但值得关注其修复进展。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 已关闭 PR

**[#1349](https://github.com/sipeed/picoclaw/pull/1349) — feat(qq): support parsing and replying to more attachment types**（已关闭，未合并）

该 PR 由 @aishannon 于 2026-03-11 提交，旨在扩展 QQ 频道的附件处理能力，包括：
- 解析 QQ 频道 emoji 结构
- 处理语音、图片、视频、文件消息的收发
- 优先使用 Markdown 回复，失败时降级

该 PR 历经近 6 个月后于今日关闭但未合并，可能因长期未更新或与当前代码基线冲突。**QQ 频道附件支持功能仍处于缺失状态**，相关用户需继续等待后续实现。

### 待合并 PR（4 条）

| PR | 标题 | 作者 | 状态 |
|---|---|---|---|
| [#3358](https://github.com/sipeed/picoclaw/pull/3358) | fix(agent): thread responses to the originating question message | @hugodeco | OPEN (stale) |
| [#3354](https://github.com/sipeed/picoclaw/pull/3354) | feat(irc): assemble IRCv3 multiline messages | @linhongyu510 | OPEN |
| [#3353](https://github.com/sipeed/picoclaw/pull/3353) | fix(channels): bound tool feedback animations | @linhongyu510 | OPEN |
| [#3222](https://github.com/sipeed/picoclaw/pull/3222) | refactor(deltachat): cleanup implementation, documentation -200LOC | @trufae | OPEN |

**项目整体评估**：今日无实质性代码合并，项目前进动能为零。4 条待合并 PR 中 #3358 已被标记为 stale（9 天未更新），存在被自动关闭的风险。维护者需尽快审查 #3354 和 #3353（同一作者，功能独立且改动范围明确），以及 #3222（-200 LOC 的重构，审查成本相对可控）。

---

## 4. 社区热点

### 最活跃 Issue

**[#3269](https://github.com/sipeed/picoclaw/issues/3269) — [BUG] If the MCP server connection fails, the agent loop will hang, causing the Picoclaw chat interface to stop replying to users.**

- **评论数**：9 条 | **👍**：1 | **状态**：已关闭（stale）
- **作者**：@ruiyigen | **创建**：2026-07-20 | **关闭**：2026-09-09

**诉求分析**：该 Issue 报告了一个高影响稳定性缺陷——当 MCP（Model Context Protocol）服务器连接失败时，agent 循环会挂起，导致整个聊天界面停止响应用户。9 条评论表明社区对此问题有实质讨论，但最终因 stale 被自动关闭，**未看到明确的修复 PR 关联**。这反映出项目在外部依赖故障容错方面存在短板，且 Issue 生命周期管理机制可能导致重要问题被遗漏。

### 次活跃 Issue

**[#3345](https://github.com/sipeed/picoclaw/issues/3345) — Proposal: lightweight PicoClaw worker mode for household edge compute**

- **评论数**：2 条 | **👍**：0 | **状态**：已关闭（stale）
- **作者**：@kvnloo | **创建**：2026-08-25

**诉求分析**：用户提出在低资源设备（RISC-V/ARM/MIPS 板卡、树莓派、旧 Android 手机，可用内存仅 10–20 MB）上运行轻量级 worker 模式的构想，使多台边缘设备可协同工作。这是一个有前瞻性的架构提案，但仅获得 2 条评论即被 stale 关闭，说明社区对该方向的讨论深度不足，或维护者未将其纳入路线图。

---

## 5. Bug 与稳定性

### 高严重度

| Issue | 描述 | 状态 | 关联 Fix PR |
|---|---|---|---|
| [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP 服务器连接失败导致 agent 循环挂起，聊天界面停止响应 | 已关闭（stale） | ❌ 无 |

**分析**：该问题直接影响核心用户体验——一旦 MCP 连接异常，整个 bot 将不可用。虽然 Issue 已被 stale 关闭，但**底层缺陷可能仍然存在**。建议维护者确认当前代码中 MCP 连接失败的处理逻辑是否已具备超时/降级机制。

### 中低严重度

| PR | 描述 | 状态 |
|---|---|---|
| [#3353](https://github.com/sipeed/picoclaw/pull/3353) | 修复工具反馈动画无界编辑问题（5 分钟超时 + 首次错误即停止） | OPEN |

**分析**：该 PR 针对频道消息中工具反馈动画可能无限期编辑消息的问题，设置了 5 分钟生命周期上限（与 Telegram typing 反馈一致），并在首次编辑错误后立即停止。属于防御性修复，建议优先合并。

---

## 6. 功能请求与路线图信号

### 来自 Issue 的功能请求

| 请求 | 来源 | 状态 | 路线图信号 |
|---|---|---|---|
| 轻量级 worker 模式（边缘计算协同） | [#3345](https://github.com/sipeed/picoclaw/issues/3345) | 已关闭（stale） | ⚠️ 弱信号，社区讨论不足 |
| QQ 频道附件类型扩展 | [#1349](https://github.com/sipeed/picoclaw/pull/1349) | 已关闭（未合并） | ❌ 已放弃或需重新提交 |

### 来自 PR 的功能增强

| 功能 | PR | 状态 | 纳入下一版本可能性 |
|---|---|---|---|
| IRCv3 multiline 消息组装 | [#3354](https://github.com/sipeed/picoclaw/pull/3354) | OPEN | 🟡 中等——功能明确、改动范围可控，但需维护者审查 |
| DeltaChat 模块重构（-200 LOC） | [#3222](https://github.com/sipeed/picoclaw/pull/3222) | OPEN | 🟡 中等——已开放 2 个月，涉及破坏性变更（移除密码配置、重命名 API） |
| 群聊回复线程化 | [#3358](https://github.com/sipeed/picoclaw/pull/3358) | OPEN (stale) | 🔴 较低——已被标记 stale，有自动关闭风险 |

**路线图判断**：#3354（IRCv3 multiline）和 #3222（DeltaChat 重构）最有可能进入下一版本。#3222 包含破坏性变更（移除密码邮箱配置、`invite_link` → `join_invite_link`），合并时需在 Release Notes 中明确标注迁移指引。

---

## 7. 用户反馈摘要

### 真实痛点

1. **MCP 连接故障导致整体不可用**（[#3269](https://github.com/sipeed/picoclaw/issues/3269)）：用户 @ruiyigen 在 PicoClaw nightly（git: 2cf030d2）+ Go 1.25.11 + Qwen3 环境下，遇到 MCP 服务器连接失败后 agent 挂起的问题。**核心诉求**：外部服务故障不应导致 bot 完全停止响应，需要超时和降级机制。

2. **群聊中回复缺乏上下文关联**（[#3358](https://github.com/sipeed/picoclaw/pull/3358)）：@hugodeco 指出，当用户在群聊中通过 @mention 触发 bot 而非直接回复时，bot 的回复不携带 `ReplyToMessageID`，导致回答与原始问题脱节。**核心诉求**：在繁忙群聊中，bot 回答应自动关联到触发消息。

3. **低资源设备支持需求**（[#3345](https://github.com/sipeed/picoclaw/issues/3345)）：@kvnloo 描述了在 10–20 MB 可用内存的设备上运行 PicoClaw 的实际场景，希望支持 worker 模式以利用多台边缘设备协同工作。**核心诉求**：降低资源门槛，支持分布式部署。

### 满意度信号

- 社区成员持续提交质量较高的 PR（如 @linhongyu510 同日提交两个独立修复），表明开发者对项目的参与意愿较强。
- 但 Issue 被 stale 自动关闭的频率较高（今日 2 条均为 stale 关闭），可能让报告者感到反馈未被重视。

---

## 8. 待处理积压

### 需维护者紧急关注

| 项目 | 类型 | 开放时长 | 风险 |
|---|---|---|---|
| [#3222](https://github.com/sipeed/picoclaw/pull/3222) — DeltaChat 重构 | PR | 69 天 | 🔴 高——包含破坏性变更，长期未审查可能导致合并冲突加剧 |
| [#3358](https://github.com/sipeed/picoclaw/pull/3358) — 群聊回复线程化 | PR | 9 天（已 stale） | 🟡 中——即将被自动关闭，功能价值明确 |
| [#3354](https://github.com/sipeed/picoclaw/pull/3354) — IRCv3 multiline | PR | 10 天 | 🟡 中——功能完整，等待审查 |
| [#3353](https://github.com/sipeed/picoclaw/pull/3353) — 工具反馈动画边界 | PR | 10 天 | 🟢 低——防御性修复，改动小 |

### 已关闭但需确认的问题

| 项目 | 类型 | 关闭原因 | 建议 |
|---|---|---|---|
| [#3269](https://github.com/sipeed/picoclaw/issues/3269) — MCP 挂起 | Issue | stale | ⚠️ 建议确认底层问题是否已修复，如未修复应重新打开 |
| [#3345](https://github.com/sipeed/picoclaw/issues/3345) — worker 模式提案 | Issue | stale | 可考虑标记为 `enhancement` 并加入讨论区 |

---

## 项目健康度评估

| 维度 | 评分 | 说明 |
|---|---|---|
| 代码合并活跃度 | 🟡 中低 | 今日无合并，4 条 PR 积压 |
| Issue 处理效率 | 🔴 低 | 2 条 Issue 均因 stale 关闭，非人工处理 |
| 社区参与度 | 🟢 良好 | 多个独立贡献者提交 PR，覆盖 IRC、QQ、DeltaChat 等模块 |
| 稳定性风险 | 🟡 中等 | MCP 挂起问题未确认修复，存在潜在用户体验风险 |
| 路线图清晰度 | 🟡 中等 | 有功能提案但缺乏明确的优先级排序和版本规划 |

**总结**：PicoClaw 项目今日处于"维护中但推进缓慢"状态。社区贡献意愿良好，但维护者的审查响应速度不足，导致 PR 积压和 Issue 被 stale 自动关闭。建议维护者优先处理 #3222（避免合并冲突恶化）和 #3353（低风险快速合并），并确认 #3269 的底层问题是否已解决。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报

**日期：** 2026-09-10
**数据来源：** github.com/qwibitai/nanoclaw

---

## 1. 今日速览

NanoClaw 项目今日处于**中等活跃**状态。过去 24 小时内无新版本发布，但 PR 活动较为密集，共产生 6 条 PR 更新（3 条待合并，3 条已关闭/合并），显示维护团队正在积极处理多项修复。Issue 侧相对平静，仅 1 条活跃 Issue（#3705），涉及任务调度 recurrence 更新后 `process_after` 未重新计算的问题。整体来看，项目健康度良好，修复类工作占据主导，核心团队（core-team）成员参与度较高。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

过去 24 小时内共有 **3 条 PR 被合并/关闭**，推进了以下关键修复：

| PR | 标题 | 影响范围 |
|---|---|---|
| [#3756](https://github.com/nanocoai/nanoclaw/pull/3756) | fix(agent-runner): a spent usage allowance is said in a sentence | agent-runner, core |
| [#3753](https://github.com/nanocoai/nanoclaw/pull/3753) | fix: the community portal records the Echo image that actually landed | repository-maintenance, setup-installation |
| [#3738](https://github.com/nanocoai/nanoclaw/pull/3738) | fix(agent-runner): thread replies from the message being answered | agent-runner, core, sessions, tools |

**关键进展：**

- **#3756** 是跨仓库三连修复的最后一环（配合 nanoco-gw#152 和 nanoco#534），解决了用量配额耗尽时用户看到的错误信息表述问题，将 403 响应转化为更友好的提示文案。
- **#3738** 修复了 `send_message`、`send_file` 和 `<message to>` 回复落入主频道而非被回复消息所在线程的问题，这是一个影响多线程会话场景的重要修复。
- **#3753** 修复了社区门户 Echo 镜像记录与实际部署不一致的问题，消除了签名登录与 Echo 选择之间中断导致的状态偏差。

项目整体在 agent-runner 核心路径和 setup-installation 体验上均有实质推进。


## 4. 社区热点

今日社区讨论热度较低。唯一活跃的 Issue 为：

**[#3705](https://github.com/nanocoai/nanoclaw/issues/3705) — `ncl tasks update --recurrence` doesn't recompute the next scheduled fire (process_after)**
- 作者：@DawoudIO | 评论：1 | 👍：0
- 创建于 2026-09-03，最近更新于 2026-09-09

**背后诉求分析：** 用户期望在通过 CLI 修改任务 recurrence（如从 weekly 改为 daily）后，任务的下次触发时间（`process_after`）能够自动重新计算，而非沿用旧调度的时间点。这反映了用户对任务调度系统**即时一致性**的期待——配置变更应立即生效，而非等待旧周期走完。该 Issue 已存在 7 天，仅 1 条评论，尚未引起广泛讨论，但属于调度系统的核心体验问题。


## 5. Bug 与稳定性

### 已确认 Bug（有对应修复 PR）

| 严重程度 | Issue/PR | 描述 | 修复状态 |
|---|---|---|---|
| 🟡 中 | [#3705](https://github.com/nanocoai/nanoclaw/issues/3705) | recurrence 更新后 `process_after` 未重新计算 | ❌ 无 fix PR |
| 🟡 中 | [#3757](https://github.com/nanocoai/nanoclaw/pull/3757) | 环境变量中残留的 credential 值导致 verify 测试在未配置 channel 时失败 | ✅ PR 已提交，待合并 |
| 🟢 低 | [#3755](https://github.com/nanocoai/nanoclaw/pull/3755) | `processing_ack` 表中残留的过期行导致 pending messages 过滤无时间上限 | ✅ PR 已提交，待合并 |

### 今日已修复 Bug

- **#3738**：多线程会话中文件/消息落入错误线程 ✅ 已合并
- **#3753**：Echo 镜像记录与实际部署不一致 ✅ 已合并
- **#3756**：用量配额耗尽时错误提示不友好 ✅ 已合并

**稳定性评估：** 今日修复的 3 个 Bug 均涉及核心路径（agent-runner 线程路由、用量配额错误处理、安装流程状态一致性），说明项目在边界场景和错误处理上仍在持续打磨。待合并的 #3757 和 #3755 属于环境配置和数据库清理类问题，影响面相对可控。


## 6. 功能请求与路线图信号

今日无明确的新功能请求。但以下信号值得关注：

- **#3705** 虽被标记为 Bug，但本质上是一个**调度系统行为改进**需求：用户期望 recurrence 变更后立即触发 `process_after` 重算。如果维护者将其视为功能增强而非缺陷修复，可能被纳入后续版本的调度逻辑重构中。
- **#3754**（待合并）改进了未注册浏览器的门户交接体验，将原本可能误导用户的"替代登录方式"文案简化为单一链接，属于**安装引导流程的 UX 优化**，暗示项目在降低新用户上手门槛方面有持续投入。

**路线图判断：** 当前项目重心仍在**稳定性修复和安装体验优化**上，尚未出现大规模新功能开发的信号。


## 7. 用户反馈摘要

今日用户反馈较少，主要来自 #3705：

- **痛点：** 用户 @DawoudIO 在修改任务 recurrence 后发现任务仍按旧调度执行，需要手动干预才能让新调度生效。这表明 CLI 的 `tasks update` 命令在用户心智模型中应当是一个"完整更新"操作，而非仅更新部分字段。
- **使用场景：** 用户实际在通过 `ncl tasks update --recurrence <new-cron>` 调整任务频率（如 weekly → daily），说明 NanoClaw 的任务调度功能已被用于真实的生产工作流中。
- **满意度信号：** 该 Issue 创建 7 天仅 1 条评论，未出现其他用户附和，可能说明该问题影响面有限，或用户群体对调度功能的深度使用尚不普遍。


## 8. 待处理积压

### 需关注的重要待处理项

| 类型 | 编号 | 标题 | 待处理时长 | 建议 |
|---|---|---|---|---|
| Issue | [#3705](https://github.com/nanocoai/nanoclaw/issues/3705) | recurrence 更新后 `process_after` 未重算 | 7 天 | ⚠️ 建议维护者确认是否为预期行为，若为 Bug 应尽快标记并排期 |
| PR | [#3757](https://github.com/nanocoai/nanoclaw/pull/3757) | fix(verify): 环境变量残留导致测试失败 | 1 天 | 待 review，涉及 setup-installation 测试稳定性 |
| PR | [#3755](https://github.com/nanocoai/nanoclaw/pull/3755) | fix(agent-runner): 清理过期 processing_ack 行 | 1 天 | 待 review，涉及数据库清理逻辑 |
| PR | [#3754](https://github.com/nanocoai/nanoclaw/pull/3754) | fix(setup): 未注册浏览器交接只打印一个链接 | 1 天 | 待 review，UX 改进 |

**积压健康度：** 整体积压较轻。最长的未响应项为 #3705（7 天），其余待处理 PR 均在 1 天内提交，显示维护团队响应速度良好。建议优先关注 #3705 的定性问题（Bug vs 功能增强），避免用户等待过久。


---

*报告生成时间：2026-09-10 | 分析师：AI 智能体开源项目分析师*

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报

**日期：2026-09-10**

---

## 1. 今日速览

IronClaw 项目今日处于**中等活跃度**状态。过去 24 小时内无新版本发布，无 PR 被合并或关闭，项目推进节奏暂时放缓。社区侧有 1 条新 Bug 报告（WebChat v2 的 IME 输入法回车误发送问题），开发侧有 4 条 PR 待合并，其中 3 条来自 @kirikov 围绕 MCP（Model Context Protocol）生态的修复与增强，1 条来自 @thisisjoshford 涉及 Telegram 命令菜单注册。整体来看，项目当前处于**功能迭代蓄力期**，MCP 相关改进是近期开发主线。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

过去 24 小时内**无 PR 被合并或关闭**，项目代码库未发生实质性推进。4 条待合并 PR 代表了当前正在酝酿的改进方向：

| PR | 标题 | 状态 |
|---|---|---|
| [#8090](https://github.com/nearai/ironclaw/pull/8090) | fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension | 待合并 |
| [#8084](https://github.com/nearai/ironclaw/pull/8084) | feat(mcp): opt-in SEP-414 caller attribution on outbound hosted-MCP calls | 待合并 |
| [#8085](https://github.com/nearai/ironclaw/pull/8085) | fix(extensions): treat operator-installed packages like host-bundled ones | 待合并 |
| [#8072](https://github.com/nearai/ironclaw/pull/8072) | feat(telegram): register the Bot API command menu at activation | 待合并 |

这些 PR 一旦合并，将显著改善 MCP 多用户隔离、调用溯源能力、扩展包一致性校验，以及 Telegram 频道的命令可发现性。当前合并节奏偏慢，建议维护者关注审查进度。

---

## 4. 社区热点

今日社区互动整体**较为冷清**。唯一的新 Issue [#8091](https://github.com/nearai/ironclaw/issues/8091) 尚无评论和点赞，4 条 PR 也均无社区讨论或反应。

**值得关注的信号**：Issue #8091 的作者 @supermomonga 明确指出该问题"似乎是之前用户可见行为的复发"（"appears to be a recurrence of the user-visible behavior previous..."），暗示这是一个**回归 Bug**，此前可能已被修复过但再次出现。这类问题若长期悬置，容易引发用户对稳定性的信任下降。

---

## 5. Bug 与稳定性

### 🔴 中等严重度 — 回归 Bug

**[#8091](https://github.com/nearai/ironclaw/issues/8091) — bug(webchat-v2): Enter sends the message while confirming IME composition**

- **报告人**：@supermomonga
- **状态**：OPEN，暂无 fix PR
- **问题描述**：在 WebChat v2 中，用户使用 IME（输入法）进行文字组合时，按下 Enter 确认候选词会**同时触发消息发送**，导致未完成的消息被提前发出。该行为属于输入法组合确认与消息提交的按键事件冲突，是典型的 `keydown` 事件未检查 `isComposing` 状态所致。
- **影响范围**：所有使用 IME 输入法（如中文、日文、韩文用户）的 WebChat v2 用户。
- **严重度评估**：不涉及数据丢失或崩溃，但严重影响非英文用户的日常使用体验，且为回归问题，建议优先处理。

---

## 6. 功能请求与路线图信号

今日无来自用户的新功能请求。但结合待合并 PR，可以识别出以下**路线图信号**：

### MCP 生态强化（近期主线）

- **[#8090](https://github.com/nearai/ironclaw/pull/8090)**：修复 hosted-MCP 工具目录按扩展 ID 共享导致的**多用户互相覆盖**问题，改为按调用者（caller）隔离。这是多租户场景下的关键正确性修复。
- **[#8084](https://github.com/nearai/ironclaw/pull/8084)**：引入 SEP-414 标准的调用者归因（caller attribution），使 hosted MCP 服务器能够识别调用来源会话及重试状态。该功能为**可选启用（opt-in）**，对需要按会话计费或维护会话状态的 MCP 服务商具有重要价值。

### 扩展系统一致性修复

- **[#8085](https://github.com/nearai/ironclaw/pull/8085)**：统一操作员安装包与宿主捆绑包在 manifest 校验中的处理逻辑，解决"能构建但不能使用"的不一致问题。

### Telegram 集成体验提升

- **[#8072](https://github.com/nearai/ironclaw/pull/8072)**：在 Telegram 扩展激活时注册 Bot API 命令菜单（`/model`、`/status`、`/new`、`/stop`、`/interrupt`），提升命令可发现性。该 PR 标注为 `size: L, risk: low, scope: docs, scope: dependencies`，适合有经验的贡献者参与。

**判断**：MCP 相关的两条 PR（#8090、#8084）最有可能被纳入下一版本，因为它们解决的是实际部署中的正确性和可观测性问题，且由同一作者连续提交，显示出系统性的改进意图。

---

## 7. 用户反馈摘要

今日用户反馈仅来自 Issue #8091，核心痛点如下：

- **使用场景**：非英文用户（推测为日文用户，基于作者 ID 和 IME 使用习惯）在 WebChat v2 中通过输入法组合输入文字。
- **痛点**：按 Enter 确认输入法候选词时，消息被意外发送，导致**未完成的消息被发出**，用户被迫在消息未编辑完成时中断输入流程。
- **情绪信号**：作者使用了"recurrence"（复发）一词，暗示此前已报告过类似问题，带有一定的**失望情绪**。建议维护者在修复时附带回归测试，防止再次出现。

---

## 8. 待处理积压

### 需关注的长期未合并 PR

| PR | 创建日期 | 已等待天数 | 风险提示 |
|---|---|---|---|
| [#8072](https://github.com/nearai/ironclaw/pull/8072) | 2026-09-04 | 6 天 | 已标注 `size: L`，涉及 Telegram Bot API 集成，等待时间较长，建议维护者尽快安排审查或明确是否纳入下一里程碑 |

### 需关注的回归 Bug

| Issue | 创建日期 | 状态 | 风险提示 |
|---|---|---|---|
| [#8091](https://github.com/nearai/ironclaw/issues/8091) | 2026-09-09 | OPEN，无 fix PR | 回归问题，影响所有 IME 用户，建议在下一个 patch 版本中修复 |

---

**报告生成时间**：2026-09-10  
**数据来源**：GitHub API — github.com/nearai/ironclaw  
**项目健康度评估**：⚠️ 开发活跃但合并节奏偏慢，存在回归 Bug 待处理，建议维护者提升 PR 审查效率并优先修复 IME 问题。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报

**日期：** 2026-09-10
**数据来源：** [github.com/netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. 今日速览

过去24小时，LobsterAI 项目呈现**高活跃度修复态势**。Issue 侧有 20 条更新（16 条活跃/新开，4 条关闭），PR 侧有 12 条更新，其中 **10 条已合并/关闭**，且集中在 9 月 9 日至 10 日，显示维护者正在进行一轮密集的 OpenClaw v2026.8.1 升级适配修复。值得注意的是，今日关闭的 Issue 均为 `[stale]` 标签的过期问题（由 bot 自动关闭），并非人工解决。项目当前无新版本发布，但大量修复 PR 的合入暗示下一版本正在酝酿中。整体健康度**良好**，但安全类 Issue 积压值得关注。

---

## 2. 版本发布

今日无新版本发布。最近一次版本为 2026.6.1（根据 Issue #2214、#2216 中的用户环境信息推断），当前主线正在密集合并 OpenClaw v2026.8.1 的兼容性修复，预计下一版本将包含这些变更。

---

## 3. 项目进展

今日合并/关闭了 **10 条 PR**，其中 8 条为实质性修复，全部围绕 **OpenClaw v2026.8.1 升级适配**展开，推进力度显著：

| PR | 标题 | 修复内容 |
|---|---|---|
| [#2641](https://github.com/netease-youdao/LobsterAI/pull/2641) | 技能自动审查改为 opt-in | 新增"启用自动技能审查"开关，避免长任务后产生大量额外模型消耗 |
| [#2640](https://github.com/netease-youdao/LobsterAI/pull/2640) | 模型选择保持 session 级作用域 | 修复会话内切换模型意外写回全局默认偏好的问题 |
| [#2639](https://github.com/netease-youdao/LobsterAI/pull/2639) | 默认模型不再写入 system prompt | 修复切换模型导致可复用对话前缀被破坏的问题 |
| [#2638](https://github.com/netease-youdao/LobsterAI/pull/2638) | 网关启动前迁移旧工作区状态 | 修复升级后对话被 `Legacy workspace setup state requires migration` 拦截的问题 |
| [#2637](https://github.com/netease-youdao/LobsterAI/pull/2637) | Discord 插件以可信来源打包 | 修复 `openKeyedStore is only available for trusted plugins` 注册失败 |
| [#2636](https://github.com/netease-youdao/LobsterAI/pull/2636) | 切换语言时刷新 About 更新标签 | 修复中英切换后按钮文字不更新的 i18n 问题 |
| [#2635](https://github.com/netease-youdao/LobsterAI/pull/2635) | 避免过期配置哈希触发网关重启 | 加入有界退避重试，修复切换模型时不必要的 Gateway 重启 |
| [#2634](https://github.com/netease-youdao/LobsterAI/pull/2634) | 恢复 QQ 关闭流程与桌面 IM 同步 | 修复 QQ 插件退出清理不完整及配置变更后消息同步丢失 |

**评估：** 这一轮修复系统性解决了 OpenClaw v2026.8.1 升级引入的多个回归问题，覆盖了模型管理、工作区迁移、插件注册、IM 同步等核心链路，项目稳定性向前迈进了重要一步。

---

## 4. 社区热点

今日无新开的高热度讨论（所有活跃 Issue 均为 `[stale]` 标签的旧问题被 bot 唤醒）。但从历史评论数来看，以下 Issue 曾获得最多关注：

### 🔥 热点 1：[#1903 会员登录频繁失败](https://github.com/netease-youdao/LobsterAI/issues/1903)（4 评论，已关闭）
用户反馈会员登录不稳定，无法使用网易付费模型。该问题已被标记为 stale 并关闭，但**核心诉求（付费用户体验）是否已解决存疑**。

### 🔥 热点 2：[#2046 Agent 记忆体系产品建议](https://github.com/netease-youdao/LobsterAI/issues/2046)（3 评论，已关闭）
用户提出了系统性的 Agent 记忆改进方案，包括 session 元数据持久化到文件系统、跨 session 记忆检索等。该建议质量较高，但已被 stale 关闭，**建议维护者重新评估**。

### 🔥 热点 3：[#2079 执行结果窗口滚动假死](https://github.com/netease-youdao/LobsterAI/issues/2079)（3 评论，仍开放）
用户报告可复现的 UI 假死问题，已存在 3 个多月仍未解决。

---

## 5. Bug 与稳定性

### 🔴 严重（安全漏洞，共 5 条，均无 fix PR）

| Issue | 描述 | 状态 |
|---|---|---|
| [#2176](https://github.com/netease-youdao/LobsterAI/issues/2176) | 自动 artifact 加载允许消息派生的任意本地文件读取 | 开放，无修复 |
| [#2181](https://github.com/netease-youdao/LobsterAI/issues/2181) | 默认恢复私网浏览器访问，削弱 SSRF 防护 | 开放，无修复 |
| [#2286](https://github.com/netease-youdao/LobsterAI/issues/2286) | 本地无认证 token 代理允许任意进程重放受害者 API 能力 | 开放，无修复 |
| [#2287](https://github.com/netease-youdao/LobsterAI/issues/2287) | NIM 出站媒体流允许任意主机本地文件外泄 | 开放，无修复 |
| [#2288](https://github.com/netease-youdao/LobsterAI/issues/2288) | HTML 预览服务器跟随 root 内符号链接泄露任意本地文件 | 开放，无修复 |

> ⚠️ **安全提醒：** 上述 5 条安全漏洞均由同一安全研究员 @YLChen-007 于 6-7 月报告，至今无修复 PR，建议维护者优先处理。

### 🟠 高严重度（功能阻塞/崩溃）

| Issue | 描述 | 状态 |
|---|---|---|
| [#2214](https://github.com/netease-youdao/LobsterAI/issues/2214) | 桌面端"数据备份"功能导致主进程卡死（100% 可复现） | 开放，无修复 |
| [#2215](https://github.com/netease-youdao/LobsterAI/issues/2215) | 安装时反复出现 `Resource extraction failed` 错误 | 开放，无修复 |
| [#2216](https://github.com/netease-youdao/LobsterAI/issues/2216) | Memory Search 无法切换 local embedding provider，索引重建被 DB 锁阻塞 | 开放，无修复 |

### 🟡 中严重度（体验问题）

| Issue | 描述 | 状态 |
|---|---|---|
| [#2079](https://github.com/netease-youdao/LobsterAI/issues/2079) | 执行结果窗口滚动到顶端假死 | 开放，无修复 |
| [#2230](https://github.com/netease-youdao/LobsterAI/issues/2230) | 同一模型在 LobsterAI 比 CodeBuddy 慢 10 倍，Token 消耗多 900 倍 | 开放，无修复 |
| [#2243](https://github.com/netease-youdao/LobsterAI/issues/2243) | skills.load.watch 性能瓶颈 + 持久化 bug + 缺乏 UI 开关 | 开放，无修复 |

---

## 6. 功能请求与路线图信号

### 可能被纳入下一版本的需求

| 需求 | 来源 | 信号 |
|---|---|---|
| **自动技能审查 opt-in 开关** | [PR #2641](https://github.com/netease-youdao/LobsterAI/pull/2641) | ✅ 已合并，下一版本将包含 |
| **模型选择 session 级隔离** | [PR #2640](https://github.com/netease-youdao/LobsterAI/pull/2640) | ✅ 已合并 |
| **QQ/桌面 IM 同步恢复** | [PR #2634](https://github.com/netease-youdao/LobsterAI/pull/2634) | ✅ 已合并 |

### 值得关注但暂无实现信号的需求

| 需求 | 来源 | 优先级建议 |
|---|---|---|
| **Agent 记忆体系**（跨 session 记忆检索、元数据持久化） | [#2046](https://github.com/netease-youdao/LobsterAI/issues/2046) | 高，用户需求明确且方案详细 |
| **任务预输入队列**（运行中可预输入下一任务） | [#2120](https://github.com/netease-youdao/LobsterAI/issues/2120) | 中，提升工作流连续性 |
| **hermes agent 支持** | [#2131](https://github.com/netease-youdao/LobsterAI/issues/2131) | 低，需求描述过于简略 |
| **AI Collaborator 平台化**（自然语言命令栏 + 跨模型编排） | [#2180](https://github.com/netease-youdao/LobsterAI/issues/2180) | 中，有详细提案文档 |
| **编程工具生态联动**（MCP 协议打通 OpenCode/CodeBuddy） | [#2239](https://github.com/netease-youdao/LobsterAI/issues/2239) | 中，战略方向性建议 |

---

## 7. 用户反馈摘要

### 😤 痛点集中领域

1. **性能与 Token 消耗**（[#2230](https://github.com/netease-youdao/LobsterAI/issues/2230)、[#2121](https://github.com/netease-youdao/LobsterAI/issues/2121)、[#2243](https://github.com/netease-youdao/LobsterAI/issues/2243)）
   - 用户 @woxinsj 实测同一任务 LobsterAI 耗时 25 分钟/60M Token，而 CodeBuddy 仅需 2m24s/67K Token，**差距近 900 倍**，这是极其严重的效率问题。
   - 用户 @nbjoe 发现重复输出文字在大量消耗 token，质疑是 claw 的 bug。
   - 用户 @woxinsj 报告 174 个技能库的 watch 机制导致启动扫描和频繁刷新，浪费大量 I/O 和 token。

2. **稳定性问题**（[#2214](https://github.com/netease-youdao/LobsterAI/issues/2214)、[#2079](https://github.com/netease-youdao/LobsterAI/issues/2079)、[#1903](https://github.com/netease-youdao/LobsterAI/issues/1903)）
   - 数据备份 100% 卡死、窗口滚动假死、会员登录频繁失败——这些基础体验问题长期未解决，严重影响用户信任。

3. **安全担忧**（5 条安全 Issue）
   - 安全研究员 @YLChen-007 系统性披露了 5 个安全漏洞，涉及本地文件读取、SSRF、token 重放、文件外泄等，**至今无任何修复响应**，社区安全信心正在下降。

### 😊 积极信号

- 用户 @woxinsj 持续提交高质量的产品建议和 bug 报告（#2180、#2239、#2243、#2214、#2215、#2230），显示出对项目的深度投入和期待。
- 用户 @nbjoe 提出了具体的 UI 改进建议（#2120），关注 2560×1600 高分屏下的展示效果。
- 维护者在 9 月 9-10 日集中合入了 8 条 OpenClaw 升级修复 PR，响应速度较快。

---

## 8. 待处理积压

### 🔴 需紧急关注（安全 + 高严重度，超 2 个月未处理）

| Issue/PR | 年龄 | 类型 | 建议 |
|---|---|---|---|
| [#2176](https://github.com/netease-youdao/LobsterAI/issues/2176) | ~84 天 | 安全漏洞 | 立即评估并修复 |
| [#2181](https://github.com/netease-youdao/LobsterAI/issues/2181) | ~81 天 | 安全漏洞 | 立即评估并修复 |
| [#2286](https://github.com/netease-youdao/LobsterAI/issues/2286) | ~65 天 | 安全漏洞 | 立即评估并修复 |
| [#2287](https://github.com/netease-youdao/LobsterAI/issues/2287) | ~65 天 | 安全漏洞 | 立即评估并修复 |
| [#2288](https://github.com/netease-youdao/LobsterAI/issues/2288) | ~65 天 | 安全漏洞 | 立即评估并修复 |
| [#2214](https://github.com/netease-youdao/LobsterAI/issues/2214) | ~76 天 | 高严重度 Bug | 数据备份卡死需尽快修复 |
| [#2215](https://github.com/netease-youdao/LobsterAI/issues/2215) | ~75 天 | 高严重度 Bug | 安装失败影响新用户获取 |

### 🟡 需关注（有价值的 PR 长期未合并）

| PR | 年龄 | 内容 | 建议 |
|---|---|---|---|
| [#2358](https://github.com/netease-youdao/LobsterAI/pull/2358) | ~54 天 | 会话重命名失败时显示反馈 | 代码量小，建议尽快 review |
| [#2373](https://github.com/netease-youdao/LobsterAI/pull/2373) | ~51 天 | 图片附件与模型视觉能力同步 | 修复了实际 bug，建议 review |

### 🟢 被 stale 关闭但值得重新评估

| Issue | 原内容 | 建议 |
|---|---|---|
| [#2046](https://github.com/netease-youdao/LobsterAI/issues/2046) | Agent 记忆体系产品建议 | 建议重新打开并纳入路线图讨论 |
| [#1903](https://github.com/netease-youdao/LobsterAI/issues/1903) | 会员登录频繁失败 | 确认付费用户体验是否已改善 |

---

## 📊 项目健康度总结

| 维度 | 评分 | 说明 |
|---|---|---|
| **开发活跃度** | ⭐⭐⭐⭐ | 24h 内 10 条 PR 合并，修复节奏快 |
| **Issue 响应** | ⭐⭐ | 大量 Issue 依赖 stale bot 关闭，人工响应不足 |
| **安全响应** | ⭐ | 5 条安全漏洞超 2 个月无修复，风险较高 |
| **社区参与** | ⭐⭐⭐ | 有深度用户持续贡献高质量反馈 |
| **版本节奏** | ⭐⭐⭐ | 无新版本发布，但密集修复暗示版本在筹备中 |

**核心建议：** 优先处理 5 条安全漏洞和 2 条高严重度 Bug（#2214、#2215），同时 review 积压的 2 条社区 PR（#2358、#2373），以恢复社区对项目安全性和响应速度的信心。

---

*报告生成时间：2026-09-10 | 数据窗口：过去 24 小时*

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

过去24小时无活动。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报

**日期：** 2026-09-10
**数据来源：** github.com/agentscope-ai/CoPaw

---

## 1. 今日速览

CoPaw 今日处于**高活跃度状态**，过去 24 小时 Issues 更新 21 条（新开/活跃 10 条，关闭 11 条），PR 更新 34 条（待合并 23 条，已合并/关闭 11 条），关闭量与新开量基本持平，显示维护团队正在积极消化积压。今日无新版本发布，但多个关键修复 PR 已合并，涵盖 Console 会话竞态、ClawHub 技能安装、Telegram 断线重连等稳定性问题。社区讨论聚焦于**会话管理一致性**（多个 Issue 涉及跨会话消息串扰）和**MCP 客户端配置灵活性**（TLS 验证、超时、参数透传），反映出用户对多通道、多会话场景下可靠性的强烈诉求。整体项目健康度良好，但 Console 前端在 Chrome 下的流式渲染问题及同步调用阻塞事件循环问题仍需关注。

---

## 2. 版本发布

今日无新版本发布。最新版本仍为 **2.2.0**（含 2.2.1b2 预发布分支），无破坏性变更或迁移注意事项需要报告。

---

## 3. 项目进展

今日共有 **11 条 PR 被合并/关闭**，以下为关键进展：

| PR | 标题 | 影响 |
|---|---|---|
| [#7237](https://github.com/agentscope-ai/QwenPaw/pull/7237) | fix(console): prevent session races during queued sends and switches | 修复 Console 在快速提交、会话切换、多标签页场景下的消息跨会话串扰问题，直接回应 Issue #7231 |
| [#7640](https://github.com/agentscope-ai/QwenPaw/pull/7640) | fix(skill): update clawhub url | 修复 ClawHub 技能下载 URL，解决 Issue #7634 中重名技能安装失败问题 |
| [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577) | fix(console): enqueue follow-up messages when chat task is running | 当会话已有活跃任务时，后续消息从 HTTP 409 拒绝改为排队等待，改善用户体验 |
| [#6738](https://github.com/agentscope-ai/QwenPaw/pull/6738) | feat(creator): grounding search, timeline workbench, YOLO reviews, i18n, ASR, and reliability hardening | Creator (PawApp) 大批量功能更新，涵盖搜索、时间线工作台、国际化、语音识别等 |
| [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) | refactor(memory): migrate ADBPG and PowerContext to plugins | 将 ADBPG 和 PowerContext 记忆后端从核心代码迁移为独立插件，推进架构模块化 |

**整体评估：** 项目在 Console 会话一致性、技能安装可靠性、记忆后端插件化三个方向取得了实质性推进。会话竞态修复（#7237）和消息排队机制（#7577）的合并，标志着多会话并发场景的稳定性进入新阶段。

---

## 4. 社区热点

今日讨论最活跃的 Issues/PRs：

### 🔥 最热 Issue：#7579 — 模型回复从上下文丢失
- **链接：** [Issue #7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)
- **状态：** 已关闭 | **评论：** 10 条
- **核心诉求：** 用户报告助手回复已持久化但后续请求中缺失，模型"看不到自己刚说的话"，表现为空响应。涉及 QwenPaw Desktop 2.2.0 的 PyInstaller 后端，用户通过解包验证了版本号和代码路径，报告质量极高。该问题直击多轮对话的核心可靠性，是用户最关心的基础体验问题。

### 🔥 最热 PR：#6399 — ReMeLightMemoryCard 添加 Reranker UI 配置面板
- **链接：** [PR #6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)
- **状态：** 待合并（Under Review） | 创建于 2026-07-23，已持续近 7 周
- **核心诉求：** 为记忆卡组件添加可视化 Reranker 配置面板，降低记忆检索调优门槛。该 PR 长期处于 Review 状态，反映出记忆模块 UI 配置化是社区持续关注的方向。

### 其他活跃讨论：
- [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)（8 评论）：用户希望优化网页版部署首页的入口位置和按钮顺序，特别强调移动端操作体验
- [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011)（8 评论）：Console 停止请求可能取消活跃的飞书会话，涉及多 UI 会话间的身份值交叉问题

---

## 5. Bug 与稳定性

按严重程度排列今日报告的 Bug：

### 🔴 高严重度

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | 同步调用阻塞事件循环且 timeout 失效 | OPEN | ❌ 无 |
| [#7231](https://github.com/agentscope-ai/QwenPaw/issues/7231) | Console 消息在会话切换时发送到错误会话 | CLOSED | ✅ [#7237](https://github.com/agentscope-ai/QwenPaw/pull/7237) |
| [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) | 模型回复从上下文丢失 | CLOSED | ✅ 已修复 |
| [#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662) | Telegram 轮询在代理黑洞下静默死亡，看门狗无法触发重连 | CLOSED | ✅ 已修复 |

**#7363 特别关注：** Windows 桌面版启动时 118-135 秒无响应，发送消息时约 126 秒无响应，由同步调用阻塞事件循环导致。该问题尚无对应 fix PR，影响所有 Windows 桌面用户，建议维护者优先处理。

### 🟡 中严重度

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) | Chrome 下 Console 流式渲染在回合完成前无输出（Safari 正常） | OPEN | ❌ 无 |
| [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) | 工具返回的图片/PDF 二进制以裸 base64 发送触发 400 错误 | CLOSED | ✅ 已修复 |
| [#7596](https://github.com/agentscope-ai/QwenPaw/issues/7596) | history.db FTS 损坏未被完整性检查检测，保留清理静默失败 | CLOSED | ✅ [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) |
| [#7661](https://github.com/agentscope-ai/QwenPaw/issues/7661) | 错误地创建新会话（点击历史会话后侧边栏又创建新会话） | OPEN | ❌ 无 |

### 🟢 低严重度

| Issue | 标题 | 状态 |
|---|---|---|
| [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) | WeCom 通道逐字符流式输出缓慢（150ms 节流） | OPEN |
| [#3254](https://github.com/agentscope-ai/QwenPaw/issues/3254) | Console 后端 chat UUID 在 GET /chats 滞后时可能缺失 | CLOSED |

---

## 6. 功能请求与路线图信号

今日用户提出的功能请求及与现有 PR 的关联：

| 功能请求 | Issue | 相关 PR | 纳入下一版本可能性 |
|---|---|---|---|
| MCP 客户端支持 `tls_verify` 和 `ca_file` | [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) | 无直接 PR，但 [#7659](https://github.com/agentscope-ai/QwenPaw/pull/7659) 涉及桌面端信任运营商 CA | ⭐⭐⭐ 中高 |
| 添加 ntfy 通道支持（已有可用实现） | [#7657](https://github.com/agentscope-ai/QwenPaw/issues/7657) | 无 | ⭐⭐⭐⭐ 高（作者已提供实现） |
| 跨会话持久记忆 | [#7656](https://github.com/agentscope-ai/QwenPaw/issues/7656) | [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)（OpenViking 后端）、[#7444](https://github.com/agentscope-ai/QwenPaw/pull/7444)（ReMe 命令统一） | ⭐⭐⭐⭐ 高（多条 PR 并行推进） |
| 频道参数透传给 MCP 工具 | [#7650](https://github.com/agentscope-ai/QwenPaw/issues/7650) | 无 | ⭐⭐ 中低 |
| 优化部署首页移动端体验 | [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) | 无 | ⭐⭐ 中低 |
| 工作目录手动编辑路径 | [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) | 无 | ⭐⭐ 中低（2.1.0 曾支持，2.2.0 回归） |

**路线图信号：** 记忆系统是当前最活跃的开发方向——OpenViking 后端（#7613）、ReMe 命令统一（#7444）、ADBPG/PowerContext 插件化（#7616）三条线并行推进，暗示下一版本可能在记忆架构上有重大更新。ntfy 通道支持因作者已提供完整实现，纳入成本低，可能性较高。

---

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的真实用户痛点：

### 😤 痛点一：多会话/多通道场景下的消息串扰
多个 Issue（#7231、#7011、#7661）共同指向一个核心问题：**用户在多个会话或 UI 之间切换时，消息可能被发送到错误的会话，或意外创建新会话**。一位用户在 #7011 中提供了直接证据，显示 Console UI 的停止请求取消了活跃的飞书会话。这反映出多通道并行使用场景下，会话身份管理仍存在系统性缺陷。

### 😤 痛点二：Windows 桌面版性能问题
Issue #7363 报告启动和发送消息时长达 2 分钟的无响应，用户明确指出"同步调用阻塞事件循环且 timeout 失效"。该问题自 2.1.1b1 版本起存在，至今无修复方案，Windows 用户群体受影响严重。

### 😤 痛点三：移动端操作体验
Issue #7177 的用户反馈非常具体："入口放在下面手机上操作极不方便"、"打开能否放到停止运行前面，手机上每次操作都很紧张，怕误点到了停止"。这反映出网页版在移动端的 UI 设计未充分考虑触屏操作场景。

### 😊 积极信号
- 用户 @Mcpy 在 #7657 中主动提供了 ntfy 通道的完整实现，体现了社区贡献意愿
- 用户 @xjbsenkfi 在 #7579 中通过解包 PyInstaller 后端验证版本号和代码路径，报告质量极高，为维护者定位问题节省了大量时间
- 用户 @memcodeoff（MemCode 创始人）主动提出集成方案，显示外部生态对 CoPaw 的关注

---

## 8. 待处理积压

以下 Issue/PR 长期未获响应或处理，建议维护者关注：

| 编号 | 类型 | 标题 | 创建日期 | 状态 | 关注原因 |
|---|---|---|---|---|---|
| [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) | PR | feat: add reranker UI config panel to ReMeLightMemoryCard | 2026-07-23 | 待合并（7 周） | 记忆配置 UI 化是社区持续诉求，长期 Review 可能打击贡献者积极性 |
| [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) | Issue | Support `tls_verify` and `ca_file` in MCP client configuration | 2026-05-10 | OPEN（4 个月） | 企业自签名证书场景的刚需，长期未响应 |
| [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | Issue | 同步调用阻塞事件循环且 timeout 失效 | 2026-08-27 | OPEN（2 周） | 高严重度性能问题，无 fix PR，影响所有 Windows 桌面用户 |
| [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997) | Issue | MCP 客户端 timeout 默认 30s 无法修改 | 2026-05-02 | CLOSED（4 个月后关闭） | 关闭时间过长，类似配置灵活性需求（#4175）仍在积压 |
| [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) | Issue | WeCom 通道逐字符流式输出缓慢 | 2026-09-02 | OPEN | 用户体验问题，有明确的技术分析（150ms 节流），修复成本低 |

**积压分析：** MCP 客户端配置灵活性（TLS 验证、超时、参数透传）是积压最久的主题，从 #3997（5 月）到 #4175（5 月）再到 #7650（9 月），用户持续提出类似需求但始终未获系统性解决。建议维护者考虑将 MCP 客户端配置增强作为一个整体 Epic 纳入下一版本规划。

---

*日报生成时间：2026-09-10 | 数据覆盖：过去 24 小时 GitHub 活动*

:::
