---
title: "OpenClaw 生态日报"
published: 2026-09-12
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-12

> Issues: 101 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-12 07:48 UTC

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

**日期：** 2026-09-12
**数据来源：** github.com/openclaw/openclaw

---

## 1. 今日速览

OpenClaw 项目今日处于**高度活跃但稳定性承压**的状态。过去24小时内 Issues 更新达101条（新开/活跃73条，关闭28条），PR 更新高达500条（待合并253条，已合并/关闭247条），显示出极强的社区参与度和维护者响应速度。然而，**P0 级升级阻断问题密集出现**，围绕 2026.9.3 → 2026.9.4 的更新路径形成了明显的可靠性危机——多个用户报告升级失败、回滚异常和 Doctor 迁移阻塞。维护者已建立专门的追踪 Issue（#145252）协调修复工作，大量修复 PR 正在快速推进中。整体而言，项目处于**版本过渡期的阵痛阶段**，核心功能迭代活跃，但升级管道的鲁棒性已成为当前最紧迫的工程挑战。


## 2. 版本发布

过去24小时内**无新版本发布**。当前社区焦点集中在 2026.9.3 和 2026.9.4 两个版本之间的升级可靠性问题上，多个 P0 级升级阻断 Bug 正在修复中，预计修复完成后将推动新的补丁版本发布。


## 3. 项目进展

过去24小时有 **247 条 PR 被合并或关闭**，项目推进速度极快。以下为重要进展：

### 升级与更新可靠性修复
- **[#145043] fix(update): prevent stale Codex migrations from blocking upgrades** — 修复了过期的 Codex 迁移阻塞升级的问题，涉及 docs、web-ui、gateway、cli 等多个模块，XL 规模，已标记为"ready for maintainer look"。这是解决当前升级危机的核心 PR 之一。
- **[#144819] fix(update): keep installations reserved until repair exits** — 修复了修复进程可能比更新器更早退出、导致第二个更新获取同一安装的问题，增强了更新事务的原子性。
- **[#144811] fix(update): show actionable health check failures** — 将"候选 lint 失败"的模糊错误替换为可操作的检查失败信息，直接改善用户体验。
- **[#145390] fix(update): name the failing check in update failure reports** — 更新失败报告现在会明确指出具体失败的检查项，大幅提升问题诊断效率。

### 性能优化
- **[#145541] fix: avoid full agent database copies during startup version checks** — 启动时不再全量复制大型 agent 数据库，仅做 header 级别的预检，显著减少启动时间和临时磁盘占用。
- **[#145733] improve(memory): reduce CPU spent constructing chunk overlap** — 优化了记忆索引中文本块重叠构建的 CPU 消耗。
- **[#145716] perf(tasks): reduce repeated SQLite read work** — 减少任务和流程读取中重复的 SQLite 查询构建。

### 功能修复
- **[#145732] fix(memory): large Wiki searches time out and keep reading files** — 修复了大型 Wiki 搜索超时并持续读取文件的问题，P1 优先级。
- **[#145730] fix(cron): migrate persisted job ownership so existing automations stay updatable after 2026.9.4** — 修复了 2026.9.4 之后旧自动化任务无法更新的持久化所有权迁移问题。
- **[#145761] fix(plugins): take a fresh lifecycle lease when a channel starts** — 修复了 Telegram `/login` 保存凭据后因插件生命周期租约丢失而失败的问题。

### 测试与基础设施
- **[#145751] chore: exercise sustained multi-session Gateway load** — 新增了持续多会话 Gateway 负载测试，弥补了此前仅测试单轮会话的不足。
- **[#145770] fix(test): prevent worker shard timeouts on loaded hosts** — 修复了负载主机上 worker 分片超时的问题。


## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 标题 | 评论数 | 核心诉求 |
|-------|------|--------|----------|
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | [Regression] 2026.9.3 Doctor refuses valid legacy workspace setup | 16 | 从 2026.7.1 升级到 2026.9.3 时，Doctor 拒绝迁移有效的旧版工作区设置，P0 升级阻断 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw leaks unreaped hook/tool child processes | 15 | 僵尸进程累积导致运行时性能退化，已存在近3个月仍未解决 |
| [#140620](https://github.com/openclaw/openclaw/issues/140620) | In-place upgrade 2026.7.1 → 2026.9.2: session reconciliation stalls | 12 | 升级后 1500 个会话仅导入 27 个即停滞，升级前会话无法搜索 |
| [#140455](https://github.com/openclaw/openclaw/issues/140455) | google-meet 2026.9.2: agent voice broken on current Meet | 8 | Google Meet 当前 UI 不兼容导致语音会话崩溃，影响实时通话场景 |
| [#145266](https://github.com/openclaw/openclaw/issues/145266) | Git/dev Doctor refreshes Codex from npm and shadows rebuilt plugin | 8 | 开发模式下 Doctor 错误地从 npm 刷新 Codex，覆盖本地重建的插件 |

### 分析

社区讨论高度集中在**升级路径的可靠性**上。用户从不同版本（2026.7.1、2026.9.2、2026.9.3）升级到最新版本时遭遇了各种阻断性错误，包括 Doctor 拒绝迁移、会话导入停滞、插件被错误覆盖等。这反映出 OpenClaw 在快速迭代中，**版本间迁移的兼容性测试和回滚机制存在系统性短板**。此外，僵尸进程泄漏问题（#97616）已持续近3个月，说明部分长期存在的资源管理问题在版本更新的优先级压力下被推迟处理。


## 5. Bug 与稳定性

### P0 级（升级阻断/发布阻断）

| Issue | 标题 | 状态 | Fix PR |
|-------|------|------|--------|
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | Doctor refuses valid legacy workspace setup | OPEN | 无 |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026.9.2 → 2026.9.4 managed update fails at candidate-Doctor | OPEN | 无 |
| [#142770](https://github.com/openclaw/openclaw/issues/142770) | Failed update leaves forward-migrated Workshop state on rollback | OPEN | 无 |
| [#145638](https://github.com/openclaw/openclaw/issues/145638) | npm stable update fails with ENOSPC copying state directory | OPEN | 无 |
| [#145653](https://github.com/openclaw/openclaw/issues/145653) | Update failure: doctor-failed (2026.9.3) | OPEN | 无 |
| [#145655](https://github.com/openclaw/openclaw/issues/145655) | Update failure: plugin-target-unavailable (2026.9.3) | OPEN | 无 |
| [#145339](https://github.com/openclaw/openclaw/issues/145339) | Update 2026.9.3 → 2026.9.4 fails with Discord groupPolicy=open | CLOSED | 已关闭 |
| [#145658](https://github.com/openclaw/openclaw/issues/145658) | Setup fails due to unsupported Node version (22.22.3) | CLOSED | 已关闭 |
| [#144672](https://github.com/openclaw/openclaw/issues/144672) | App shows no actionable error after wrong Control Port | CLOSED | 已关闭 |
| [#145005](https://github.com/openclaw/openclaw/issues/145005) | Update failure: repairing (2026.9.3) | CLOSED | 已关闭 |

### P1 级（高优先级）

| Issue | 标题 | 状态 | Fix PR |
|-------|------|------|--------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Leaks unreaped hook/tool child processes (zombie accumulation) | OPEN | 无 |
| [#140455](https://github.com/openclaw/openclaw/issues/140455) | google-meet agent voice broken | OPEN | 无 |
| [#141633](https://github.com/openclaw/openclaw/issues/141633) | Heartbeat/wake scheduler silently stops after Gateway restart | OPEN | 无 |
| [#145636](https://github.com/openclaw/openclaw/issues/145636) | Paired-node Claude continuation reads expired request context | OPEN | 无 |
| [#145619](https://github.com/openclaw/openclaw/issues/145619) | buzz: message-tool replies omit NIP-10 root tag | OPEN | 无 |
| [#138139](https://github.com/openclaw/openclaw/issues/138139) | providerConfigMatchesRuntimeSnapshot causes event-loop starvation | OPEN | 无 |

### 稳定性评估

当前 OpenClaw 的稳定性风险主要集中在**升级管道**上。2026.9.3 → 2026.9.4 的更新路径出现了至少 6 个独立的 P0 级阻断问题，涉及 Doctor 迁移、状态目录复制、插件目标不可用等多个环节。维护者已建立追踪 Issue（#145252）进行协调，但截至今日，多数 P0 问题仍处于 OPEN 状态且无对应的 fix PR。此外，**僵尸进程泄漏**（#97616）和 **心跳调度器静默停止**（#141633）等长期运行稳定性问题也在持续影响用户体验。


## 6. 功能请求与路线图信号

### 活跃的功能请求

| Issue | 标题 | 优先级 | 相关 PR |
|-------|------|--------|---------|
| [#8724](https://github.com/openclaw/openclaw/issues/8724) | Per-model generation timeout config | P3 | 无 |
| [#8285](https://github.com/openclaw/openclaw/issues/8285) | Auto-send intent/acknowledgment text before agent processing | P3 | 无 |
| [#7476](https://github.com/openclaw/openclaw/issues/7476) | WhatsApp sticker send support | P3 | 无 |
| [#8355](https://github.com/openclaw/openclaw/issues/8355) | Streaming TTS pipeline for voice calls | P2 | 无 |
| [#131457](https://github.com/openclaw/openclaw/issues/131457) | Progress streaming mode for Feishu channel | P3 | 无 |
| [#8913](https://github.com/openclaw/openclaw/issues/8913) | Configurable thinking/reasoning block format per channel | P3 | 无 |
| [#8061](https://github.com/openclaw/openclaw/issues/8061) | Per-agent maxConcurrent in agents.list | P2 | 无 |
| [#125711](https://github.com/openclaw/openclaw/issues/125711) | Skill Workshop: explicit adopt/disown for user-authored skills | P3 | 无 |

### 路线图信号分析

从 PR 活动来看，当前开发优先级明显偏向**稳定性修复和性能优化**，而非新功能开发。大量 XL 规模的 PR 集中在更新管道修复（#145043、#145390、#144836）和性能优化（#145541、#145733、#145716）上。功能请求类 Issue 大多停留在 P2/P3 级别，短期内被纳入版本的可能性较低。值得关注的是 **[#145710] feat: apply supported plugin installs without restarting the Gateway**，该 PR 旨在实现插件安装无需重启 Gateway，如果合并将显著改善用户体验，可能成为下一版本的功能亮点。


## 7. 用户反馈摘要

### 核心痛点

1. **升级恐惧症正在形成**：多位用户报告从旧版本升级到 2026.9.x 时遭遇阻断性错误。用户 @GitHoubi（#142585）从 2026.7.1 升级时 Doctor 拒绝迁移有效配置；用户 @rybing7（#140620）升级后 1500 个会话仅导入 27 个。这种反复出现的升级失败正在侵蚀用户对版本更新的信心。

2. **长期运行稳定性问题被忽视**：用户 @avp717（#97616）报告僵尸进程泄漏问题已持续近3个月，期间经历了多个版本更新但问题仍未解决。用户 @yncubys（#141633）报告心跳调度器在 Gateway 重启后静默停止，导致 31/33 个自动化任务停止执行——这种"静默失败"模式对依赖自动化的用户尤为危险。

3. **错误信息缺乏可操作性**：用户 @bjesuiter（#144672）报告 App 连接错误端口后无任何可操作的错误提示；用户 @BodegaClaw（#145005）的更新失败报告仅显示"repairing"阶段失败，无法定位具体原因。维护者已通过 #144811 和 #145390 两个 PR 着手改善错误信息的可操作性。

4. **配置迁移的隐性成本**：用户 @dbraendle（#145154）报告 Doctor 迁移在两种认证配置同时存在时，静默将流量切换到付费 API 计费——这种"静默计费变更"对用户信任的伤害远大于显式错误。

### 积极信号

- 维护者对升级问题的响应速度很快，已建立专门的追踪 Issue 并快速推进多个修复 PR。
- 性能优化工作（#145541、#145733、#145716）表明团队在关注核心基础设施的效率。
- 测试基础设施的改进（#145751、#145770）有助于预防未来的回归问题。


## 8. 待处理积压

### 长期未解决的重要 Issue

| Issue | 标题 | 创建日期 | 状态 | 关注原因 |
|-------|------|----------|------|----------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Zombie process accumulation from hook/tool execution | 2026-06-29 | OPEN，15条评论 | 已持续近3个月，影响运行时稳定性，无 fix PR |
| [#8724](https://github.com/openclaw/openclaw/issues/8724) | Per-model generation timeout config | 2026-02-04 | OPEN，5条评论 | 已持续7个月，Google 模型无限循环问题未解决 |
| [#8355](https://github.com/openclaw/openclaw/issues/8355) | Streaming TTS pipeline for voice calls | 2026-02-03 | OPEN，4条评论 | 已持续7个月，语音通话体验的核心改进 |
| [#75187](https://github.com/openclaw/openclaw/issues/75187) | AGENTS.md head-truncation strips load-bearing rules | 2026-04-30 | OPEN，4条评论 | 已持续4个月，有安全影响，已有 PR 关联但未合并 |
| [#90499](https://github.com/openclaw/openclaw/issues/90499) | Discord message.read rejects allowlisted DM targets | 2026-06-05 | OPEN，3条评论 | 已持续3个月，安全边界问题，标记为"not-repro-on-main" |

### 长期未合并的重要 PR

| PR | 标题 | 创建日期 | 状态 | 关注原因 |
|----|------|----------|------|----------|
| [#126224](https://github.com/openclaw/openclaw/pull/126224) | fix(models): recover after catalog generation mismatch | 2026-08-19 | OPEN，XL 规模 | 已等待近1个月，涉及模型目录恢复，标记为"needs proof" |
| [#123145](https://github.com/openclaw/openclaw/pull/123145) | improve(qa): show safe Tool Search failure evidence | 2026-08-13 | OPEN | 已等待1个月，QA 工具改进 |
| [#141476](https://github.com/openclaw/openclaw/pull/141476) | feat(ui): team mode shows every agent in sidebar | 2026-09-07 | OPEN，XL 规模 | UI 功能改进，已标记"ready for maintainer look"但尚未合并 |

### 维护者关注建议

1. **#97616 僵尸进程问题**应提升优先级——这是一个影响所有长期运行实例的基础设施问题，且已有大量用户反馈。
2. **#75187 的 AGENTS.md 截断问题**涉及安全规则被意外剥离，虽然已有 PR 关联，但需要推动合并。
3. **#126224 模型目录恢复 PR** 已等待近1个月，建议尽快完成 proof 验证并合并，避免与其他更新管道修复产生冲突。
4. 当前 P0 升级问题的修复应优先于新功能开发，建议在发布下一版本前完成所有 P0 问题的修复和回归测试。

---

*报告生成时间：2026-09-12 | 数据覆盖：过去24小时 GitHub 活动*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：** 2026-09-12
**覆盖项目：** OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw


## 1. 生态全景

个人 AI 助手/自主智能体开源生态在 2026 年 9 月中旬呈现出**"头部承压、腰部活跃、尾部分化"**的格局。以 OpenClaw 为代表的头部项目正经历版本过渡期的升级管道危机，大量 P0 级阻断问题暴露了快速迭代与稳定性保障之间的张力；NanoBot、Zeroclaw、NanoClaw、CoPaw 等腰部项目保持高活跃度，在提供商兼容性、身份认证、语音交互、生产级可靠性等方向各有侧重地推进；而 IronClaw、PicoClaw、Moltis 等尾部项目活跃度偏低，部分面临维护响应不足和社区贡献流失的风险。整体生态的共性挑战集中在**升级可靠性、多模型互操作性、长期运行稳定性**三大主题上。


## 2. 各项目活跃度对比

| 项目 | Issues 更新（新开/活跃） | PR 更新（待合并/已关闭） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 101（73 新开/活跃，28 关闭） | 500（253 待合并，247 已关闭） | 无 | ⚠️ 高度活跃但稳定性承压，P0 升级阻断密集 |
| **NanoBot** | 2（2 新开） | 33（17 待合并，16 已关闭） | 无 | ✅ 良好，活跃迭代期，提供商兼容性修复为主 |
| **Zeroclaw** | 6（6 新开） | 50（49 待合并，1 已关闭） | 无 | ⚠️ 活跃但积压风险，S0 数据丢失 Bug 待处理 |
| **PicoClaw** | 4（2 新开，2 stale 关闭） | 2（1 待合并，1 stale 关闭） | 无 | ❌ 低活跃，有效贡献因 stale 机制流失 |
| **NanoClaw** | 5（5 新开/活跃） | 38（29 待合并，9 已关闭） | 无 | ✅ 高活跃，安装流程修复密集，单人依赖度高 |
| **IronClaw** | 0 | 1（0 待合并，1 已关闭） | 无 | 🔴 低活跃维护期，社区互动极低 |
| **LobsterAI** | 8（8 新开/活跃） | 12（9 待合并，3 已关闭） | 无 | ⚠️ 活跃但积压明显，严重 Bug 修复 PR 挂起 5.5 个月 |
| **Moltis** | 1（1 新开） | 2（1 待合并，1 已关闭） | 无 | 🟡 中等偏低，响应速度快但社区冷清 |
| **CoPaw** | 21（15 新开/活跃） | 20（16 待合并，4 已关闭） | v2.2.1（9/11） | ⚠️ 高活跃但稳定性承压，数据丢失类 Bug 集中 |


## 3. OpenClaw 在生态中的定位

**社区规模与活跃度：** OpenClaw 的 Issue 和 PR 流量远超其他项目——过去 24 小时 101 条 Issue 更新和 500 条 PR 更新，是第二名 CoPaw（21 Issue / 20 PR）的 5 倍和 25 倍。这一量级差异表明 OpenClaw 已进入**平台级项目的运营阶段**，其社区规模和贡献者基数在同类中处于绝对领先地位。

**技术路线差异：** OpenClaw 的架构明显更复杂——从 PR 涉及的模块（docs、web-ui、gateway、cli、memory、cron、plugins）来看，它是一个**全栈式个人 AI 助手平台**，覆盖多频道接入（Telegram、Discord、Google Meet、WhatsApp 等）、记忆索引、定时任务、插件系统等完整能力矩阵。相比之下，NanoBot 更聚焦于**多提供商兼容层**，Zeroclaw 侧重**安全与身份认证**，CoPaw 偏向**多模型协作与移动端体验**。

**核心优势：** OpenClaw 的维护者响应速度极快（247 条 PR 当日合并/关闭），且已建立专门的 P0 追踪 Issue（#145252）协调升级危机。但其**版本间迁移的兼容性测试和回滚机制存在系统性短板**——从 2026.7.1、2026.9.2、2026.9.3 等多个版本升级均遭遇阻断性错误，这是快速迭代带来的技术债集中爆发。

**风险信号：** 僵尸进程泄漏（#97616）已持续近 3 个月未解决，心跳调度器静默停止（#141633）等长期运行稳定性问题在版本更新压力下被推迟处理。OpenClaw 需要在"功能迭代速度"和"基础设施可靠性"之间找到更可持续的平衡点。


## 4. 共同关注的技术方向

### 4.1 多提供商兼容性与模型互操作性

| 项目 | 具体诉求 |
|---|---|
| **NanoBot** | DeepSeek reasoning 序列化修复（#5214）、Gemini 3 工具调用回放兼容（#5230）、FallbackProvider 容灾（#5675） |
| **CoPaw** | subagent_model 配置静默丢弃（#7676）、多模型协作（#4901）、DeepSeek 原生能力元数据（#7717） |
| **PicoClaw** | OpenAI 兼容提供商支持（#3366），用户希望接入自托管路由如 9Router |
| **Moltis** | Requesty 作为 OpenAI 兼容 provider（#1143，挂起 72 天） |
| **OpenClaw** | providerConfigMatchesRuntimeSnapshot 导致事件循环饥饿（#138139） |

**趋势解读：** 多模型互操作已从"能不能接入"演进为"接入后是否稳定可靠"。DeepSeek、Gemini 等非 OpenAI 原生模型在 reasoning 内容、工具调用签名等方面的协议差异成为跨项目共性痛点。同时，用户对**自托管模型网关**（9Router、Requesty）的兴趣上升，反映了对厂商锁定和 API 成本控制的深层需求。

### 4.2 升级与迁移可靠性

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | 6+ 个 P0 级升级阻断问题，涉及 Doctor 迁移、状态目录复制、插件目标不可用 |
| **NanoClaw** | 全新 VM 上 uvx 引导后 pnpm 路径问题（#3769）、macOS 并发 SQLite 迁移失败（#3765） |
| **LobsterAI** | 用户配置文件重启后被重置（#1006）、hooks 配置在 Gateway 重启后丢失（#2654） |
| **CoPaw** | 升级到 2.2.x 后 MCP 无法连接（#7716）、会话丢失伴随模型配置丢失（#7724） |

**趋势解读：** 升级管道的鲁棒性已成为生态级痛点。从 OpenClaw 的 P0 危机到 NanoClaw 的全新环境引导失败，再到 LobsterAI 的配置持久化缺陷，各项目在不同层面遭遇了"版本过渡期阵痛"。这提示 AI 助手类项目在快速迭代中需要将**迁移兼容性测试**和**回滚机制**提升到与功能开发同等重要的优先级。

### 4.3 长期运行稳定性与资源管理

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | 僵尸进程泄漏（#97616，近 3 个月）、心跳调度器静默停止（#141633） |
| **CoPaw** | 容器内存耗尽三重复合路径（#7722）、工作区文件浏览器冻结服务器（#7721） |
| **NanoClaw** | 速率限制错误通知刷屏（#3576）、待处理消息无限轮询（#3291） |
| **Zeroclaw** | Markdown 内存后端并发 store() 静默丢失数据（#10797，S0 级） |

**趋势解读：** 随着 AI 助手从"演示级"走向"生产级"，长期运行场景下的资源泄漏、静默失败、并发一致性等问题正在集中暴露。Zeroclaw 的 S0 级数据丢失 Bug 和 CoPaw 的内存耗尽报告表明，**并发安全**和**资源有界性**是当前生态的普遍短板。

### 4.4 语音交互能力

| 项目 | 具体诉求 |
|---|---|
| **NanoClaw** | `/add-voice` 全双工浏览器语音对话（#3764 + #3772） |
| **OpenClaw** | 流式 TTS 管道（#8355，P2，挂起 7 个月）、google-meet 语音崩溃（#140455） |

**趋势解读：** 语音交互正在从"实验性功能"走向"核心交互方式"。NanoClaw 的语音 PR 采用 OpenAI GPT-Live-1 进行识别与合成，代表了**云端语音管线**的路线；而 OpenClaw 对流式 TTS 的长期需求则反映了**低延迟语音体验**的持续追求。

### 4.5 安全与身份认证

| 项目 | 具体诉求 |
|---|---|
| **Zeroclaw** | OIDC 里程碑（#8289），canonical principals 和 inbound authentication，多个 stage PR 堆叠 |
| **Moltis** | Telegram 共享频道工具策略管控（#1265），将 Slack 的 `untrusted_audience`/`untrusted_tools` 扩展到 Telegram |
| **OpenClaw** | AGENTS.md head-truncation 剥离安全规则（#75187） |

**趋势解读：** 多用户/共享频道场景下的**权限隔离**和**身份认证**正在成为刚需。Zeroclaw 的 OIDC 路线图是当前生态中最系统性的安全推进，而 Moltis 的跨平台工具策略对齐则反映了**安全管控一致性**的需求。


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手平台：多频道接入、记忆索引、定时任务、插件系统、Web UI | 追求功能完整性的个人用户和小型团队 | 模块化单体架构，覆盖 gateway/cli/web-ui/memory/cron/plugins 等多模块 |
| **NanoBot** | 多提供商兼容层：DeepSeek、Gemini、Fallback 容灾、WebUI 频道管理 | 需要灵活切换模型提供商的开发者 | 轻量级架构，聚焦 provider 抽象和频道管理 |
| **Zeroclaw** | 安全与身份认证：OIDC、RPC 认证、网关鉴权、多模态验证 | 企业级部署、多用户场景 | 安全优先架构，OIDC 堆叠 PR 构成完整认证链路 |
| **PicoClaw** | 嵌入式 AI 助手：RKLLM 本地推理、Slack/飞书集成 | ARM 开发板用户、嵌入式场景 | 轻量级，适配资源受限环境 |
| **NanoClaw** | 安装体验与技能系统：远程存储挂载、语音对话、安装器健壮性 | 快速部署需求的技术用户 | 技能（skill）驱动架构，强调开箱即用 |
| **IronClaw** | 多频道状态管理：共享频道断连区分、跨平台一致性 | Slack 等多频道集成用户 | assistant 模块核心逻辑，适配器层抽象 |
| **LobsterAI** | OpenClaw 的桌面封装：构建优化、网关自愈、定时任务 UI | 偏好桌面应用的 OpenClaw 用户 | 基于 OpenClaw 的上层封装，聚焦桌面体验 |
| **Moltis** | 协议规范化与安全对齐：TLS ALPN 约束、跨平台工具策略 | 注重协议严谨性的部署者 | 表驱动 provider 架构，配置层/运行时/存储分层 |
| **CoPaw** | 多模型协作与移动端体验：subagent 模型选择、ReMeLight 记忆、Telegram 富文本 | 移动端重度用户、Token 成本敏感用户 | 会话/模型/插件三层架构，强调 UX 细节 |


## 6. 社区热度与成熟度

### 活跃度分层

**第一梯队（高活跃 + 高吞吐）：**
- **OpenClaw**：社区规模最大，但处于"版本过渡期阵痛"，稳定性风险最高
- **CoPaw**：v2.2.1 发布后快速迭代修复期，首次贡献者占比高，社区参与健康

**第二梯队（高活跃 + 中等吞吐）：**
- **NanoBot**：提供商兼容性修复密集，贡献质量高（Issue+PR 成对提交）
- **NanoClaw**：安装流程修复为主，单人贡献依赖度高（@glifocat 主导）
- **Zeroclaw**：OIDC 路线图推进中，但 PR 积压风险（49 条待合并）

**第三梯队（中等活跃）：**
- **LobsterAI**：活跃度回升，但严重 Bug 修复 PR 挂起 5.5 个月，维护响应不足
- **Moltis**：Bug→Fix 响应速度快，但社区讨论冷清

**第四梯队（低活跃）：**
- **PicoClaw**：stale 机制导致有效贡献流失，维护响应不足
- **IronClaw**：社区静默期，无新 Issue，版本迭代停滞

### 成熟度阶段判断

| 阶段 | 项目 | 特征 |
|---|---|---|
| **快速迭代期** | CoPaw、NanoClaw、NanoBot | 新功能频繁推出，Bug 修复速度快，但稳定性尚未收敛 |
| **质量巩固期** | Zeroclaw、Moltis | 聚焦安全/协议规范化，功能迭代放缓，技术债清理为主 |
| **平台运营期** | OpenClaw | 社区规模大，功能完整，但面临升级管道和长期稳定性的系统性挑战 |
| **维护停滞期** | IronClaw、PicoClaw | 活跃度低，版本迭代停滞，社区贡献可能流失 |


## 7. 值得关注的趋势信号

### 7.1 从"功能竞赛"到"可靠性竞赛"

OpenClaw 的 P0 升级危机、CoPaw 的数据丢失 Bug、Zeroclaw 的 S0 并发缺陷共同指向一个行业转折点：**AI 助手开源项目正在从"谁能提供更多功能"转向"谁能在生产环境中稳定运行"**。对开发者的参考价值在于：选择技术栈时，升级管道的鲁棒性、并发安全性、资源有界性应成为与功能丰富度同等重要的评估维度。

### 7.2 多模型互操作成为基础设施级需求

DeepSeek、Gemini 等非 OpenAI 模型的协议差异在 NanoBot、CoPaw、OpenClaw 等多个项目中引发兼容性问题。同时，用户对自托管模型网关（9Router、Requesty）的兴趣上升。**对 AI 智能体开发者的启示：** 在设计模型调用层时，应将"提供商可替换性"和"协议差异容忍"作为一等公民，而非事后补丁。

### 7.3 语音交互进入主流视野

NanoClaw 的全双工语音 PR 和 OpenClaw 对流式 TTS 的长期需求表明，**语音正在从辅助功能升级为核心交互方式**。开发者应关注语音管线的延迟优化、全双工对话的状态管理、以及语音与工具调用的协同。

### 7.4 安全与身份认证从"可选"变为"必需"

Zeroclaw 的 OIDC 路线图、Moltis 的跨平台工具策略对齐、OpenClaw 的 AGENTS.md 安全规则问题，共同反映了**多用户场景下的权限隔离和身份认证正在成为刚需**。对于面向企业级部署的开发者，OIDC 集成和细粒度工具策略管控应纳入架构规划。

### 7.5 配置持久化与迁移体验成为用户信任基石

LobsterAI 的配置重置问题、CoPaw 的模型配置丢失、OpenClaw 的升级阻断，都在侵蚀用户对"数据安全"的信任。**对开发者的启示：** 配置管理需要明确的持久化策略、迁移兼容性测试和回滚机制，任何"静默覆盖"或"静默失败"都会对用户信任造成不可逆的伤害。

### 7.6 社区贡献者的"高质量贡献"模式正在兴起

NanoBot 的 @xiexiahao（Issue+PR 成对提交）、CoPaw 的 @Nobodyanonymou-s（受控复现报告+最小修复方案）、PicoClaw 的 @octavioturra（根因分析+修复 PR）代表了**新一代贡献者模式**：不仅报告问题，还提供根因定位和修复方案。维护者应优先响应这类贡献，否则可能流失最宝贵的社区资产。

### 7.7 嵌入式与边缘部署是差异化蓝海

PicoClaw 的 RKLLM 本地推理场景虽然当前活跃度低，但代表了**嵌入式 AI 助手**的差异化方向。在 ARM 开发板上运行本地模型推理，避开云端 API 成本和隐私顾虑，是值得关注的细分赛道。


## 总结

2026 年 9 月中旬的个人 AI 助手开源生态正处于**从快速扩张向质量收敛的转型期**。OpenClaw 作为生态标杆，其升级管道危机既是自身技术债的集中爆发，也是整个生态成熟度瓶颈的缩影。腰部项目（NanoBot、Zeroclaw、NanoClaw、CoPaw）在各自差异化方向上保持健康推进，但普遍面临维护带宽不足和积压风险。对于技术决策者而言，当前阶段选择项目的核心考量应从"功能丰富度"转向"升级可靠性 + 长期运行稳定性 + 维护响应速度"的综合评估。对于开发者而言，多模型互操作、并发安全、配置持久化、语音交互是值得投入的共性技术方向。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报

**日期：** 2026-09-12 | **数据来源：** github.com/HKUDS/nanobot

---

## 1. 今日速览

NanoBot 项目今日处于**高活跃度状态**，PR 流水线吞吐量显著（24 小时内 33 条 PR 更新，其中 16 条已合并/关闭），显示出维护团队正在集中处理积压的合并请求。Issues 侧相对平静（仅 2 条新开），但两条均由同一作者提交，且均附带了对应的实现 PR，体现出高质量的贡献模式。今日无新版本发布，项目重心在于代码合并与稳定性修复。整体健康度评估：**良好，处于活跃迭代期**。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共有 **16 条 PR 完成合并/关闭**，以下为关键进展：

| PR | 标题 | 影响 |
|---|---|---|
| [#5675](https://github.com/HKUDS/nanobot/pull/5675) | fix(providers): allow model failover after runner deadlines | **P2 修复**：解决了主模型挂起时 runner 截止时间耗尽导致 FallbackProvider 无法接管的问题，提升了多模型容灾能力 |
| [#5214](https://github.com/HKUDS/nanobot/pull/5214) | fix(providers): keep DeepSeek reasoning items wire-valid | **P1 修复**：修复了 DeepSeek reasoning 内容在 OpenAI Responses API 序列化时被拒绝的问题 |
| [#5230](https://github.com/HKUDS/nanobot/pull/5230) | fix(gemini): preserve imported tool calls with signature fallback | **P1 修复**：修复了 Gemini 3 拒绝无 thought signature 的跨提供商工具调用回放问题 |
| [#5356](https://github.com/HKUDS/nanobot/pull/5356) | feat(webui): improve setup flows across chat channels (NAN-112) | **功能增强**：重新设计了频道目录 UI，分离依赖安装与频道激活，序列化安装操作防止前端竞态 |
| [#5744](https://github.com/HKUDS/nanobot/pull/5744) | chore: remove core agent line count script | 清理未使用的仓库辅助脚本 |
| [#5255](https://github.com/HKUDS/nanobot/pull/5255) | Draft: truthful API service status for externally-managed servers | 关闭（Draft 未推进），涉及 WebUI API 状态显示准确性 |

**整体评估：** 今日合并的 PR 以**提供商兼容性修复**（DeepSeek、Gemini、Fallback）和 **WebUI 体验优化**为主线，项目在稳定性和多模型互操作性方面向前迈进了坚实一步。

---

## 4. 社区热点

今日 Issues/PRs 的评论数均为 0（数据中 `评论: undefined` 或 `0`），社区讨论热度较低。但从**提交密度和标签复杂度**来看，以下条目值得关注：

- **[#5749](https://github.com/HKUDS/nanobot/issues/5749) + [#5750](https://github.com/HKUDS/nanobot/pull/5750)** — 工具调用上下文暴露
  - 作者 @xiexiahao 在同一天提交了 Issue 和对应 PR，诉求是让工具实现能够获取稳定的 `tool_call_id`，以支持幂等副作用操作（如外部 API 调用去重）。这是一个**面向生产级可靠性的架构改进**，反映了社区对工具执行可追溯性的需求。

- **[#5747](https://github.com/HKUDS/nanobot/issues/5747) + [#5748](https://github.com/HKUDS/nanobot/pull/5748)** — 检查点崩溃一致性
  - 同样由 @xiexiahao 提交，针对多工具响应期间的崩溃恢复窗口问题。当前检查点在工具 A 完成、工具 B 执行中崩溃时，可能将所有调用记录为 pending，导致恢复后无法区分已完成和未完成的副作用。这是**面向分布式/长时运行场景的关键可靠性改进**。

- **[#5495](https://github.com/HKUDS/nanobot/pull/5495)** — Linear Agent 频道
  - 已开放 20 天，标签包含 `conflict`，涉及 OAuth PKCE、SQLite 队列、Webhook 去重等复杂功能。虽然今日无新评论，但其长期未合并状态值得关注。

---

## 5. Bug 与稳定性

### 今日新报告（无新 Bug Issue）

今日无新 Bug Issue 报告。

### 近期已修复/正在修复的 Bug（按严重程度排列）

| 严重程度 | PR | 描述 | 状态 |
|---|---|---|---|
| **P1** | [#5214](https://github.com/HKUDS/nanobot/pull/5214) | DeepSeek reasoning 内容导致 Responses API 反序列化失败 | ✅ 已关闭（合并） |
| **P1** | [#5230](https://github.com/HKUDS/nanobot/pull/5230) | Gemini 3 拒绝无签名工具调用回放 | ✅ 已关闭（合并） |
| **P2** | [#5675](https://github.com/HKUDS/nanobot/pull/5675) | 主模型挂起时 fallback 无法触发 | ✅ 已关闭（合并） |
| **P2** | [#5751](https://github.com/HKUDS/nanobot/pull/5751) | 编辑自动化详情时错误重算下次执行时间，导致定时任务被跳过或永久不执行 | 🔄 待合并 |
| **P2** | [#5613](https://github.com/HKUDS/nanobot/pull/5613) | 回放 provider 生成的 item ID 导致 Responses API 失败 | 🔄 待合并（开放 13 天） |
| **P2** | [#5605](https://github.com/HKUDS/nanobot/pull/5605) | 邮件频道在消息实际投递前就标记 `\Seen`，导致被过滤的消息被误标已读 | 🔄 待合并（开放 13 天，含 `conflict` 标签） |
| **P1** | [#5745](https://github.com/HKUDS/nanobot/pull/5745) | WebUI 大历史回放性能问题，需增量化和缓存 | 🔄 待合并 |

**稳定性趋势：** 提供商兼容性问题（DeepSeek、Gemini）是近期 Bug 的主要来源，但修复速度较快。邮件频道和自动化调度的 Bug 已存在约 2 周，建议优先处理。

---

## 6. 功能请求与路线图信号

### 今日新功能请求

| Issue | 功能诉求 | 对应 PR | 纳入下一版本可能性 |
|---|---|---|---|
| [#5749](https://github.com/HKUDS/nanobot/issues/5749) | 暴露稳定的工具调用上下文（tool_call_id）以支持幂等副作用 | [#5750](https://github.com/HKUDS/nanobot/pull/5750) | **高** — PR 已提交，设计清晰，标签含 `test` |
| [#5747](https://github.com/HKUDS/nanobot/issues/5747) | 在执行批次边界持久化已完成工具结果，缩小崩溃一致性窗口 | [#5748](https://github.com/HKUDS/nanobot/pull/5748) | **高** — PR 已提交，与 #5750 同作者，形成系统性改进 |

### 长期开放的功能 PR（可能进入后续版本）

| PR | 功能 | 开放天数 | 信号 |
|---|---|---|---|
| [#5495](https://github.com/HKUDS/nanobot/pull/5495) | Linear Agent 原生频道 | 20 天 | 含 `conflict`，需解决合并冲突 |
| [#4919](https://github.com/HKUDS/nanobot/pull/4919) | Telegram 自定义 Bot API 基地址 | 60 天 | 含 `conflict`，长期积压 |
| [#5609](https://github.com/HKUDS/nanobot/pull/5609) | 邮件频道 Microsoft 委托 OAuth | 13 天 | 含 `conflict`，安全相关 |
| [#5602](https://github.com/HKUDS/nanobot/pull/5602) | WebUI 完成通知声音 | 13 天 | 低复杂度，可能快速合并 |
| [#5388](https://github.com/HKUDS/nanobot/pull/5388) | MCP 工具 schema 字节预算 | 30 天 | 含 `conflict` |
| [#5746](https://github.com/HKUDS/nanobot/pull/5746) | DaoXE 网关提供商 | 1 天 | 新提交，待审查 |

**路线图信号：** 工具调用上下文（#5750）和检查点一致性（#5748）两个 PR 形成了**面向生产级可靠性的系统性改进方向**，且均由同一贡献者推动，预计将优先进入下一版本。邮件频道（OAuth、别名过滤、\Seen 修复）和 Telegram 自定义端点代表了**企业级部署需求**的持续增长。

---

## 7. 用户反馈摘要

今日 Issues 评论数为 0，无法从评论中提炼直接用户反馈。但从 Issue 描述和 PR 内容中可推断以下用户痛点：

1. **工具执行缺乏可追溯性**（[#5749](https://github.com/HKUDS/nanobot/issues/5749)）：用户在多工具并行执行场景中，无法在工具实现内部获取稳定的调用标识，导致外部 API 调用无法实现幂等去重。这反映了**生产环境中对副作用控制的需求**。

2. **崩溃恢复的数据一致性焦虑**（[#5747](https://github.com/HKUDS/nanobot/issues/5747)）：用户明确指出了"进程在工具 A 完成、工具 B 执行中退出"的场景，担心已完成的外部副作用在恢复后被重复执行。这表明用户正在将 NanoBot 用于**需要严格一致性的自动化工作流**。

3. **定时任务编辑的隐性破坏**（[#5751](https://github.com/HKUDS/nanobot/pull/5751)）：编辑自动化名称或指令会意外重算下次执行时间，导致定时任务被推迟或永久跳过。这是**典型的用户体验陷阱**，用户可能在不知情的情况下丢失了定时任务。

---

## 8. 待处理积压

### 长期未合并的重要 PR（>30 天）

| PR | 标题 | 开放天数 | 阻塞原因 | 建议 |
|---|---|---|---|---|
| [#4919](https://github.com/HKUDS/nanobot/pull/4919) | feat(telegram): support custom Bot API base URL | **60 天** | `conflict` 标签 | 企业自托管 Bot API 是常见需求，建议优先解决冲突 |
| [#5388](https://github.com/HKUDS/nanobot/pull/5388) | feat(agent): budget model-visible MCP schemas | **30 天** | `conflict` 标签 | MCP 工具 schema 膨胀是实际痛点，建议关注 |

### 中期积压（13-20 天）

| PR | 标题 | 开放天数 | 阻塞原因 |
|---|---|---|---|
| [#5495](https://github.com/HKUDS/nanobot/pull/5495) | feat(channels): add native Linear agent channel | 20 天 | `conflict`，功能复杂度高 |
| [#5613](https://github.com/HKUDS/nanobot/pull/5613) | fix(provider): clean up replayed items | 13 天 | 待审查 |
| [#5609](https://github.com/HKUDS/nanobot/pull/5609) | feat(email): Microsoft delegated OAuth | 13 天 | `conflict`，安全相关 |
| [#5606](https://github.com/HKUDS/nanobot/pull/5606) | feat(email): filter by recipient alias | 13 天 | `conflict` |
| [#5605](https://github.com/HKUDS/nanobot/pull/5605) | fix(email): only mark \Seen on delivered messages | 13 天 | `conflict` |
| [#5602](https://github.com/HKUDS/nanobot/pull/5602) | feat(webui): completion notification sound | 13 天 | 待审查 |

**积压分析：** 邮件频道相关的 4 个 PR（#5605、#5606、#5609）均带有 `conflict` 标签且来自同一作者 @tilladam，建议维护者与作者协调解决合并冲突。Telegram 自定义端点 PR 已积压 60 天，是当前最老的活跃 PR，需要明确优先级。

---

*报告生成时间：2026-09-12 | 数据窗口：过去 24 小时*

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报

**日期：** 2026-09-12
**数据来源：** github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

项目今日处于**高活跃度状态**，PR 侧流量显著放大（24 小时内 50 条更新，其中 49 条待合并），显示社区贡献动能强劲。Issue 侧新增 6 条，以 Bug 报告为主，其中一条被标记为 **S0 级数据丢失风险**，需立即关注。安全与身份认证（OIDC）路线图持续推进，多个 stage 的 PR 处于堆叠审查中。整体健康度评估：**活跃但存在积压风险**——大量 XL 级 PR 长期处于 Open 状态，审查带宽可能成为瓶颈。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日有 **1 条 PR 关闭**：

- **[#10262](https://github.com/zeroclaw-labs/zeroclaw/pull/10262) — fix(rpc): close RPC connections on daemon reload and unstick zerocode quickstart**（已关闭）
  - 修复了 daemon 重载时 RPC 连接未正确关闭的问题，同时解决了 zerocode quickstart 卡死的问题。该 PR 经过两轮 master 合并后关闭，说明相关修复已通过其他路径落地或已被替代方案覆盖。

其余 49 条 PR 仍处于待合并状态，其中多条为 OIDC 里程碑的堆叠 PR（#10248 → #10255 → #10259 → #10274），构成一条完整的认证授权落地链路，但尚未有合并动作。

---

## 4. 社区热点

今日 Issue 侧评论数整体偏低（最高 3 条），热点主要集中在 **PR 审查队列** 中。以下为值得关注的活跃项：

| 编号 | 标题 | 状态 | 热度信号 |
|------|------|------|----------|
| [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) | [Tracker]: OIDC milestone: canonical principals and inbound authentication | OPEN | 3 评论，跨 3 个月持续更新，是当前安全路线的核心追踪器 |
| [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) | fix(multimodal): add pixel-level image validation | OPEN | 已挂起超 1 个月，涉及多 provider 安全，标签含 `needs-author-action` |
| [#10417](https://github.com/zeroclaw-labs/zeroclaw/pull/10417) | fix(runtime): deliver terminal fallbacks live | OPEN | 涉及 Discord/Matrix 双通道，`needs-maintainer-review`，安全高风险 |

**背后诉求分析：** OIDC 追踪器（#8289）持续活跃表明社区对**统一身份认证与权限隔离**有强烈期待；多模态图片验证（#9819）则反映了生产环境中**provider 请求因损坏图片而失败**的真实痛点。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 标题 | 是否有 fix PR |
|--------|-------|------|---------------|
| **S0** | [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | markdown memory backend silently loses stored entries when `store()` calls overlap | ❌ 暂无 |
| **S2** | [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) | `zeroclaw agent` interactive REPL never enables terminal IUTF8 | ❌ 暂无 |
| **S3** | [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | ZeroCode chat input ignores the Delete key | ❌ 暂无 |
| **S3** | [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794) | Advisory Windows nextest fails publish_contract test | ✅ [#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676) 疑似修复 |
| **S3** | [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) | Three Windows-only test failures on advisory job | ❌ 暂无 |

**关键风险：** #10797 为 **S0 级数据丢失**，Markdown 内存后端在并发 `store()` 调用时会静默覆盖数据，且无写入校验。该问题由 agent 报告，说明已在真实使用场景中触发，建议维护者优先处理。

---

## 6. 功能请求与路线图信号

今日无纯功能请求 Issue，但以下 PR 代表了明确的路线图方向：

- **OIDC 认证授权体系**（[#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)、[#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259)、[#10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274)）：构成 #8289 追踪器的 stage 3 和 stage 5，覆盖 token 验证、RPC 认证、网关路由层鉴权。这是当前最系统性的功能推进，预计下一版本将包含 OIDC 相关能力。
- **ZeroCode 体验优化**（[#10386](https://github.com/zeroclaw-labs/zeroclaw/pull/10386) URL 可点击、[#10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553) 选中文本加入聊天）：表明 ZeroCode TUI 正在从"能用"向"好用"迭代。
- **上下文压缩锚定模型窗口**（[#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)）：引入 `context_compact_ratio` 配置，使压缩预算动态适配所选模型，是运行时资源管理的重要改进。

---

## 7. 用户反馈摘要

今日 Issue 评论较少，但可从报告内容提炼以下信号：

- **Agent 自主报告问题成为新常态：** #10797 和 #10795 均标注 "reported by agent"，说明 Zeroclaw 的 agent 已经在实际运行中主动发现并上报自身缺陷，这是产品成熟度的积极信号。
- **Windows 平台体验持续受挫：** #10793 和 #10794 均为 Windows-only 测试失败，且发生在"与代码无关"的 PR 上，反映 CI 在 Windows 环境的稳定性不足，可能影响 Windows 用户的贡献体验。
- **TUI 基础交互仍有缺口：** #10796（Delete 键无效）和 #10795（IUTF8 未启用导致多字节字符退格异常）表明 ZeroCode 聊天界面在终端兼容性上还有明显短板，尤其影响非 ASCII 用户。

---

## 8. 待处理积压

以下项目长期未关闭，建议维护者关注：

| 编号 | 类型 | 标题 | 已挂起时长 | 阻塞信号 |
|------|------|------|------------|----------|
| [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) | PR | fix(multimodal): pixel-level image validation | ~36 天 | `needs-author-action`，涉及 7+ provider |
| [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) | PR | fix(channels): require sender authorization for Bluesky and Reddit | ~47 天 | `needs-author-action`，安全高风险，覆盖 12+ 渠道 |
| [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) | PR | fix(config): resolve git subcommand past global options | ~42 天 | `needs-author-action`，安全高风险 |
| [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) | PR | feat(runtime): anchor context compaction to model window ratio | ~45 天 | `needs-author-action`，XL 级 |

**积压特征：** 多条安全相关 PR 因 `needs-author-action` 标签长期停滞，说明贡献者在提交后未能及时响应审查反馈。建议维护者考虑设置自动提醒或明确关闭策略，避免安全修复长期悬置。

---

*报告生成时间：2026-09-12 | 分析师：AI 智能体开源项目分析系统*

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报

**日期：2026-09-12**

---

## 1. 今日速览

PicoClaw 项目今日处于**低活跃状态**，无新版本发布。过去 24 小时内 Issues 更新 4 条（2 条新开/活跃，2 条关闭），PR 更新 2 条（1 条待合并，1 条已关闭）。值得注意的是，今日关闭的 Issue 和 PR 均带有 `[stale]` 标签，表明这些条目是因长期无活动而被机器人自动关闭，而非通过人工解决。项目在 Slack 集成、RKLLM 模型兼容性、飞书配置解析等方面存在待解决的稳定性问题，社区对 OpenAI 兼容提供商的支持呼声较高。

---

## 2. 版本发布

*今日无新版本发布。*

---

## 3. 项目进展

### 已关闭 PR

**[#3340 fix(slack): set FileSize on media upload params](https://github.com/sipeed/picoclaw/pull/3340)** — `[stale]` 已关闭

该 PR 由 @octavioturra 提交，旨在修复 Slack 媒体上传时 `FileSize` 字段未设置导致 SDK 拒绝上传的问题。修复方案是在 `SendMedia` 中为 `slack.UploadFileParameters` 正确填充 `FileSize`。然而，该 PR 因 `[stale]` 标签被关闭，**修复代码并未合并入主分支**。这意味着 Slack 媒体上传的 Bug（对应 Issue #3338）在代码层面仍未解决，尽管相关 Issue 也已被标记为 stale 并关闭。

**项目整体进展评估：** 今日无实质性代码合并，项目主线未向前推进。两个 stale 关闭操作属于自动化清理，不反映实际开发进展。

---

## 4. 社区热点

今日无高热度讨论（所有 Issues 评论数均 ≤ 4，👍 均为 0）。相对活跃的条目如下：

**[#3338 [BUG] Slack does not attach image media content](https://github.com/sipeed/picoclaw/issues/3338)** — 4 条评论

这是今日评论最多的 Issue。用户 @octavioturra 报告 Slack 媒体上传始终失败，错误信息为 `file.upload.v2: file size cannot be 0`。该用户不仅提交了详细的 Bug 报告，还主动提交了修复 PR（#3340），展现了较高的社区贡献意愿。然而，Issue 和 PR 均因 stale 被关闭，**修复未能落地**，这对贡献者的积极性可能造成负面影响。

**[#3366 [Feature] Add support for OpenAI compatible providers](https://github.com/sipeed/picoclaw/issues/3366)** — 2 条评论

用户 @ItachiSan 请求添加对 OpenAI 兼容提供商的支持，以便接入自托管路由（如 9Router）。该需求反映了社区对**去中心化、自托管 AI 网关**的日益增长的兴趣，是当前 AI 应用生态中的一个重要趋势。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 是否有 Fix PR |
|---------|-------|------|--------------|
| 🔴 高 | [#3338](https://github.com/sipeed/picoclaw/issues/3338) | Slack 媒体上传完全不可用（`FileSize=0` 被 SDK 拒绝） | 有（#3340），但已被 stale 关闭，**未合并** |
| 🟠 中 | [#3355](https://github.com/sipeed/picoclaw/issues/3355) | 飞书连接报错：`config.json contains unknown field(s): channel_list.feishu.app_id`，配置解析器不识别 `app_id` 字段 | 无 |
| 🟡 中 | [#3346](https://github.com/sipeed/picoclaw/issues/3346) | RKLLM 模型在 ARM 开发板上回复异常（Qwen3.5-0.8B_w4 模型） | 无 |

**关键风险：** Slack 媒体上传 Bug 已有社区贡献的修复方案，但因 stale 机制被关闭，修复代码面临丢失风险。建议维护者手动重新打开 #3340 并评估合并。

---

## 6. 功能请求与路线图信号

**[#3366 添加 OpenAI 兼容提供商支持](https://github.com/sipeed/picoclaw/issues/3366)** — 状态：OPEN

- **诉求：** 用户希望添加一个名为 "OpenAI Compatible" 的自定义提供商类型，以便接入自托管路由（如 9Router）或其他兼容 OpenAI API 的服务。
- **实现难度：** 低。用户指出该提供商可以基于现有 OpenAI 提供商复制修改，仅需将 Base URL 设为可配置。
- **路线图信号：** 该需求与当前 AI 生态中"模型网关/路由"的流行趋势高度契合。如果 PicoClaw 希望保持竞争力，支持自定义 OpenAI 兼容端点是一个低成本、高回报的功能。**建议纳入下一版本。**

---

## 7. 用户反馈摘要

- **@octavioturra（Slack Bug 报告者）：** 展现了高质量的 Bug 报告能力（包含环境信息、根因分析）和主动贡献精神（提交了修复 PR）。但 stale 关闭可能让其感到挫败。
- **@ttghub（飞书配置问题）：** 在 Issue 标题中直接附上了解决方案（`config.json contains unknown field(s): channel_list.feishu.app_id`），说明用户已经自行定位了问题根因——配置 schema 与实际代码不匹配。这类"自带解决方案"的 Bug 报告对维护者非常有价值。
- **@crazysarah（RKLLM 异常）：** 在 ARM 开发板上使用 RKLLM 模型时遇到回复异常，附有截图。该用户的使用场景（嵌入式 ARM 设备 + 本地模型推理）是 PicoClaw 的差异化优势领域，相关问题值得优先关注。
- **@ItachiSan（OpenAI 兼容请求）：** 代表了希望将 PicoClaw 集成到更广泛的 AI 基础设施中的用户群体，这类用户通常具有较高的技术能力和扩展需求。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 状态 | 最后更新 | 关注点 |
|------|------|------|------|---------|--------|
| PR | [#3347](https://github.com/sipeed/picoclaw/pull/3347) | fix laggy interface | OPEN（带 stale 标签） | 2026-09-11 | 修复 Web UI 在大量文本时的卡顿问题，已由作者自行构建测试通过，但已 16 天无维护者响应，**面临被 stale 关闭的风险** |
| Issue | [#3355](https://github.com/sipeed/picoclaw/issues/3355) | 飞书连接报错 | OPEN | 2026-09-11 | 用户已提供解决方案，等待维护者确认并修复配置 schema |
| Issue | [#3366](https://github.com/sipeed/picoclaw/issues/3366) | OpenAI 兼容提供商 | OPEN | 2026-09-11 | 功能请求，实现成本低，建议纳入路线图 |
| Issue | [#3346](https://github.com/sipeed/picoclaw/issues/3346) | RKLLM 回复异常 | CLOSED（stale） | 2026-09-11 | 嵌入式场景 Bug，已被 stale 关闭但**未确认解决**，建议重新打开 |

---

### 项目健康度评估

| 维度 | 评级 | 说明 |
|------|------|------|
| 代码活跃度 | ⚠️ 偏低 | 今日无合并，PR 处理周期过长（>16 天） |
| 社区贡献质量 | ✅ 良好 | 用户提交了带根因分析的 Bug 报告和可用的修复 PR |
| 维护响应速度 | ❌ 不足 | 多个 Issue/PR 因 stale 被关闭而非人工处理，有效贡献面临丢失风险 |
| 路线图清晰度 | ⚠️ 一般 | 社区需求明确（OpenAI 兼容、飞书修复），但缺乏维护者表态 |

**核心建议：** 维护者应优先处理 #3340（Slack 修复 PR）和 #3347（UI 卡顿修复 PR），避免社区贡献因 stale 机制流失。同时，飞书配置 Bug（#3355）已有用户提供的解决方案，修复成本极低，建议尽快处理。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报

**日期：2026-09-12**


## 1. 今日速览

NanoClaw 项目今日处于**高活跃度状态**，PR 更新量达 38 条（其中 29 条待合并），Issue 更新 5 条，显示出社区贡献与维护者响应均较为积极。今日有 9 条 PR 被合并/关闭，涵盖安装修复、文档清理、代码维护等多个方向，项目在稳定性和技术债清理上持续推进。值得注意的是，今日无新版本发布，但多个与安装/引导流程相关的 Bug 修复 PR 密集出现，暗示近期可能有一次以稳定性为重点的补丁版本。核心贡献者 @glifocat 持续主导大部分 PR 与 Issue 工作，项目对单人贡献的依赖度较高。


## 2. 版本发布

今日无新版本发布。最新可用版本仍为 **v2.3.0**（commit `74224f62`，2026-09-11），当前 `main` 分支已累积多项未发布的修复与功能 PR，建议关注后续版本发布动态。


## 3. 项目进展

今日共有 **9 条 PR 被合并/关闭**，主要推进了以下方向：

| PR | 标题 | 影响 |
|---|---|---|
| [#3771](https://github.com/nanocoai/nanoclaw/pull/3771) | fix: recover uvx-installed pnpm after bootstrap | 修复了全新 VM 上 uvx 引导后 pnpm 找不到导致退出 127 的问题，直接回应 Issue [#3769](https://github.com/nanocoai/nanoclaw/issues/3769) |
| [#3649](https://github.com/nanocoai/nanoclaw/pull/3649) | chore(github): repair CODEOWNERS | 修复了 CODEOWNERS 文件的默认所有者与自动化覆盖面，改善代码审查路由 |
| [#3291](https://github.com/nanocoai/nanoclaw/pull/3291) | fix: bound pending message polling | 为待处理消息轮询增加边界，防止无限轮询导致的资源消耗 |
| [#3249](https://github.com/nanocoai/nanoclaw/pull/3249) | fix(setup): handle an existing Node outside the supported range | 安装器现在能正确处理已存在但版本不受支持的 Node 环境 |
| [#1598](https://github.com/nanocoai/nanoclaw/pull/1598) | feat: add-remote-storage skill (WebDAV/S3 via rclone + systemd) | 新增远程存储技能，支持通过 rclone 挂载 WebDAV/S3，并集成 `ncl groups config add-mount/remove-mount` 命令 |
| [#2798](https://github.com/nanocoai/nanoclaw/pull/2798) | chore(release): expand CHANGELOG for v2.1.17 | 补充 v2.1.17 的变更日志 |
| [#2086](https://github.com/nanocoai/nanoclaw/pull/2086) | v2 docs: update capability installer model | 更新 v2 文档中的能力安装器模型说明 |
| [#2082](https://github.com/nanocoai/nanoclaw/pull/2082) | v2 docs: clarify upstream developer references | 澄清文档中的上游开发者引用 |

**整体评估**：今日合并的 PR 以**安装流程稳定性修复**和**文档/维护类清理**为主，其中 `add-remote-storage` 技能是唯一的功能性新增。项目在"开箱即用"体验上的投入明显加大，多个修复针对全新环境下的引导失败场景。


## 4. 社区热点

今日 Issues 与 PR 的评论数整体偏低（多数为 0-1 条评论），但以下条目值得关注：

### 🔥 热点 Issue

**[#3576 — Rate-limited turns flood the channel with duplicate error notices](https://github.com/nanocoai/nanoclaw/issues/3576)**
- **状态**：OPEN | **作者**：@DawoudIO | **创建于**：2026-08-27 | **最后更新**：2026-09-11
- **核心诉求**：当 Agent 因速率限制而失败时，`deliverErrorResult` 会向用户频道**重复推送相同的错误通知**，缺少退避（backoff）、冷却（cooldown）和去重（dedup）机制。在真实部署中，每次重试都会产生一条新的错误消息，造成频道刷屏。
- **分析**：这是一个**生产环境体验问题**，直接影响用户对 Agent 可靠性的感知。虽然优先级未标注为高，但"真实安装中会产生大量重复通知"的描述表明其实际影响面可能被低估。目前尚无对应的修复 PR。

### 🔥 热点 PR

**[#3764 — feat(channels): /add-voice — full-duplex browser conversations](https://github.com/nanocoai/nanoclaw/pull/3764)**
- **状态**：OPEN | **作者**：@glifocat | **创建于**：2026-09-11 | **最后更新**：2026-09-12
- **内容**：新增 `/add-voice` 技能，实现浏览器内的全双工语音对话。使用 OpenAI GPT-Live-1 进行语音识别与合成，Agent 会话负责记忆、工具调用和动作执行。
- **分析**：这是近期**最具野心的功能 PR**，将 NanoClaw 从文本/消息频道扩展到语音交互场景。配套的 [#3772](https://github.com/nanocoai/nanoclaw/pull/3772)（voice adapter payload）也在同步推进，表明这是一个有完整规划的 feature branch 工作流。


## 5. Bug 与稳定性

按严重程度排列今日报告的 Bug：

### 🔴 高严重度

| Issue | 描述 | 是否有 Fix PR |
|---|---|---|
| [#3769](https://github.com/nanocoai/nanoclaw/issues/3769) | 全新 VM 上 uvx 引导后 `~/.local/bin` 不在 PATH 中，导致 pnpm 找不到、安装退出 127 | ✅ 已由 [#3771](https://github.com/nanocoai/nanoclaw/pull/3771) 修复并关闭 |
| [#3765](https://github.com/nanocoai/nanoclaw/issues/3765) | 全新 macOS 安装时，host 和 initializer 并发执行 SQLite 迁移导致初始化失败 | ❌ 暂无对应 PR |

### 🟡 中严重度

| Issue | 描述 | 是否有 Fix PR |
|---|---|---|
| [#3576](https://github.com/nanocoai/nanoclaw/issues/3576) | 速率限制错误通知无退避/去重，频道被重复消息淹没 | ❌ 暂无对应 PR |
| [#3762](https://github.com/nanocoai/nanoclaw/issues/3762) | `add-opencode` 在移除/升级时残留 pre-8772ec97 的 Dockerfile guard 测试文件 | ✅ 已由 [#3763](https://github.com/nanocoai/nanoclaw/pull/3763) 提交修复，待合并 |

### 🟢 已解决

| Issue | 描述 | 修复 PR |
|---|---|---|
| [#3204](https://github.com/nanocoai/nanoclaw/issues/3204) | `add-opencode` 技能仍指示编辑已被 `cli-tools.json` 重构移除的 Dockerfile ARG+RUN 块 | 已关闭（关联 [#3763](https://github.com/nanocoai/nanoclaw/pull/3763)） |

**稳定性趋势**：今日报告的 Bug 集中在**全新安装/引导流程**，特别是 macOS 和 VM 环境下的路径解析与并发初始化问题。这类问题对首次用户体验影响最大，建议维护者优先处理 [#3765](https://github.com/nanocoai/nanoclaw/issues/3765) 的并发迁移问题。


## 6. 功能请求与路线图信号

### 语音对话（Voice Channel）
- **PR [#3764](https://github.com/nanocoai/nanoclaw/pull/3764)**（`/add-voice` 技能）与 **PR [#3772](https://github.com/nanocoai/nanoclaw/pull/3772)**（voice adapter payload）构成完整的语音功能管线。
- **信号强度**：⭐⭐⭐⭐⭐ — 两个 PR 同时推进，且均标记为 `core-team` 和 `delivery/skill`，极有可能进入下一版本。

### 远程存储挂载
- **PR [#1598](https://github.com/nanocoai/nanoclaw/pull/1598)** 已合并，提供 WebDAV/S3 远程存储技能。
- **信号强度**：已落地 — 用户可通过 `/add-remote-storage` 使用该功能。

### 按 Agent Group 配置交付模式
- **PR [#3713](https://github.com/nanocoai/nanoclaw/pull/3713)** 为每个 agent group 记录交付模式（envelope vs. outbound tools），目前仅完成数据层。
- **信号强度**：⭐⭐⭐ — 这是为不支持 envelope 协议的模型提供替代交付路径的基础设施，后续可能有更多相关 PR。

### 安装器健壮性
- **PR [#3776](https://github.com/nanocoai/nanoclaw/pull/3776)**（用绝对路径运行下载的安装器）和 **PR [#3774](https://github.com/nanocoai/nanoclaw/pull/3774)**（持久化 OneCLI gateway 文件）均针对安装/启动流程的边界情况。
- **信号强度**：⭐⭐⭐⭐ — 多条安装相关 PR 同时出现，说明维护者正在系统性加固安装体验。


## 7. 用户反馈摘要

今日 Issues 的评论数较少，但从中可提炼以下用户痛点：

1. **全新环境安装体验脆弱**：@glifocat 在 [#3769](https://github.com/nanocoai/nanoclaw/issues/3769) 中报告了在"全新 VM"上复现的 pnpm 路径问题，说明 NanoClaw 的安装流程对 PATH 环境变量的假设过于严格。用户期望"开箱即用"，而非手动调整环境变量。

2. **升级路径存在残留文件**：@glifocat 在 [#3762](https://github.com/nanocoai/nanoclaw/issues/3762) 中指出，旧版本安装的 `add-opencode` 在升级后残留了过时的测试文件，且 REMOVE.md 的清理列表未包含该路径。这反映了**升级/卸载流程的完整性**有待加强。

3. **错误通知缺乏节制**：@DawoudIO 在 [#3576](https://github.com/nanocoai/nanoclaw/issues/3576) 中描述了速率限制错误在频道中"刷屏"的问题，暗示在真实生产环境中，Agent 的失败处理策略需要更智能的退避和去重机制。

**整体满意度信号**：社区成员（尤其是 @glifocat）持续提交高质量的 Bug 报告和修复 PR，说明对项目的投入度和期望值较高。但单人贡献占比过高也提示项目需要更多元化的维护者参与。


## 8. 待处理积压

以下为长期未关闭或需要维护者关注的重要条目：

| 条目 | 类型 | 创建日期 | 状态 | 关注理由 |
|---|---|---|---|---|
| [#3576](https://github.com/nanocoai/nanoclaw/issues/3576) | Issue | 2026-08-27 | OPEN（16 天） | 速率限制错误刷屏问题，生产环境影响大，暂无修复 PR |
| [#3652](https://github.com/nanocoai/nanoclaw/pull/3652) | PR | 2026-08-29 | OPEN（14 天） | 有界心跳保活机制，涉及 agent-runner 核心逻辑，需 review |
| [#3656](https://github.com/nanocoai/nanoclaw/pull/3656) | PR | 2026-08-29 | OPEN（14 天） | CI stale 策略（dry-run），仓库维护自动化，需确认是否启用 |
| [#3583](https://github.com/nanocoai/nanoclaw/pull/3583) | PR | 2026-08-27 | OPEN（16 天） | 修复 task_log 中 series id 缺失问题，影响 chat-session 日志追踪 |
| [#3156](https://github.com/nanocoai/nanoclaw/pull/3156) | PR | 2026-07-30 | OPEN（44 天） | 频道附件结构化传递，已积压超 6 周，需评估是否仍与当前架构兼容 |
| [#3501](https://github.com/nanocoai/nanoclaw/pull/3501) | PR | 2026-08-24 | OPEN（19 天） | Dial 频道文档补充，纯文档类 PR，应可快速合并 |

**积压分析**：PR 积压中，[#3156](https://github.com/nanocoai/nanoclaw/pull/3156) 已开放 44 天，是最长的待合并 PR，建议维护者明确其是否仍在路线图中。Issue [#3576](https://github.com/nanocoai/nanoclaw/issues/3576) 虽仅开放 16 天，但涉及生产环境用户体验，建议提升优先级。


*日报生成时间：2026-09-12 | 数据来源：GitHub API | 分析工具：NanoClaw 项目分析师*

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报

**日期：** 2026-09-12
**数据来源：** [github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日速览

今日 IronClaw 项目整体活跃度处于**低水平**。过去 24 小时内无新 Issue 产生，无新版本发布，仅有 1 条 PR 被关闭（[#8076](https://github.com/nearai/ironclaw/pull/8076)）。该 PR 自 9 月 6 日创建以来，经过约 6 天的生命周期后于今日关闭，是项目近期唯一可见的代码合流活动。整体来看，项目处于平稳维护期，社区讨论热度较低，无突发性事件或紧急修复需求。

---

## 2. 版本发布

今日无新版本发布。最近一个 Release 周期暂无数据可供分析，建议持续关注项目后续版本动态。

---

## 3. 项目进展

### PR #8076 — 已关闭：区分断连的共享频道

- **链接：** [https://github.com/nearai/ironclaw/pull/8076](https://github.com/nearai/ironclaw/pull/8076)
- **作者：** [@be-student](https://github.com/be-student)
- **创建时间：** 2026-09-06
- **关闭时间：** 2026-09-12
- **状态：** CLOSED（已合并或关闭）

**核心内容：**

该 PR 聚焦于助手（assistant）模块中共享频道（shared channel）的状态区分逻辑，主要改进包括：

1. **区分配对用户的断连共享频道与未配对账户** — 此前两者在系统层面可能被混淆处理，导致错误的状态判断。
2. **为用户消息和机器人命令渲染频道专属引导** — 针对不同频道状态提供差异化提示，提升用户体验。
3. **保持拒绝分类在产品层、适配器层和 OpenAI 兼容接口之间的一致性** — 统一了跨层级的分类逻辑，避免不同入口出现行为不一致。
4. **更新 Slack 能力相关逻辑** — 涉及 Slack 集成层面的适配调整。

**项目影响评估：**

该 PR 的合并/关闭标志着 IronClaw 在多频道管理场景下的**状态识别精度**和**跨平台一致性**方面取得了实质进展。对于使用 Slack 等集成渠道的用户而言，断连频道的错误提示问题有望得到改善。这是近期项目在 assistant 核心逻辑上的一次有意义的收敛。

---

## 4. 社区热点

今日社区无活跃讨论。过去 24 小时内：

- 无新 Issue 产生
- 无 Issue 评论更新
- PR #8076 的评论数为 undefined（可能因关闭后数据未完整同步），👍 反应数为 0

**分析：** 社区当前处于静默期，无显著热点话题。PR #8076 虽然涉及核心逻辑改动，但未引发广泛讨论或争议，说明该改动方向与社区预期一致，或社区关注度本身较低。

---

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。

**近期稳定性观察：**

PR #8076 本身即针对一个**状态识别类缺陷**的修复——断连共享频道与未配对账户的混淆问题。该问题可能导致：
- 用户收到错误的频道状态提示
- 机器人命令在错误场景下被触发或拒绝
- 跨接口（产品层/适配器层/OpenAI 兼容层）行为不一致

该 PR 的关闭表明此问题已进入解决流程，但具体修复效果需待后续版本发布后验证。

---

## 6. 功能请求与路线图信号

今日无新功能请求。

**从 PR #8076 推断的路线图信号：**

该 PR 涉及的核心能力——**多频道状态感知与差异化引导**——暗示 IronClaw 正在强化对复杂部署场景（尤其是 Slack 等多频道环境）的支持。结合 PR 中提到的 "OpenAI-compatible surfaces"，可以推断项目在**多接口兼容性**方面有持续投入的意图。未来版本可能进一步围绕以下方向演进：

- 更精细的频道生命周期管理
- 跨平台行为一致性保障
- 面向终端用户的引导式错误提示优化

---

## 7. 用户反馈摘要

今日无新的用户反馈数据。由于过去 24 小时内无 Issue 更新、无评论产生，无法从社区渠道提取用户痛点或满意度信号。

**间接信号：**

PR #8076 的存在本身反映了一个真实用户场景：**在 Slack 等共享频道环境中，当配对用户断连时，系统无法正确区分该状态与未配对账户**。这一场景的修复需求可能来源于实际部署中的用户反馈，说明部分用户在使用多频道集成时遇到了状态混淆的困扰。

---

## 8. 待处理积压

今日无长期未响应的 Issue 或 PR 数据可供分析。过去 24 小时内项目无新增积压项。

**建议关注：**

- PR #8076 虽已关闭，但其关联的 Slack 能力更新是否完全落地，建议在后续 Release Notes 中确认。
- 项目近期 Issue 活跃度极低，建议维护者关注是否存在**用户反馈渠道不畅**或**社区参与度下降**的潜在问题。

---

## 项目健康度评估

| 维度 | 状态 | 说明 |
|------|------|------|
| 代码活跃度 | 🟡 中等偏低 | 6 天内 1 条 PR 关闭，无新 PR 产生 |
| Issue 活跃度 | 🔴 低 | 过去 24 小时 0 条 Issue 更新 |
| 版本迭代 | 🔴 停滞 | 无新版本发布，Release 周期不明确 |
| 社区参与度 | 🔴 低 | 无讨论、无评论、无反应 |
| 代码质量投入 | 🟢 有信号 | PR #8076 涉及跨层一致性改进，体现质量意识 |

**综合判断：** IronClaw 项目当前处于**低活跃维护期**。核心代码仍有收敛性改进，但社区互动和版本发布节奏明显放缓。建议关注后续是否有版本发布计划以激活社区关注度。

---

*报告生成时间：2026-09-12 | 数据窗口：过去 24 小时*

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报

**日期：** 2026-09-12
**数据来源：** github.com/netease-youdao/LobsterAI

---

## 1. 今日速览

LobsterAI 今日无新版本发布，但社区活跃度显著回升。过去 24 小时内有 8 条 Issue 更新和 12 条 PR 更新，其中 9 条 PR 仍待合并，3 条已关闭。值得注意的是，大量 Issue/PR 带有 `[stale]` 标签，表明这些条目自 3 月底创建后长期未获维护者响应，直到近期才被重新标记。今日新增的 4 条 PR（#2653-#2657）集中在构建优化、网关自愈和插件清理等基础设施层面，显示项目仍在持续迭代，但核心功能类 Issue 的响应周期偏长，项目健康度处于"活跃但积压明显"的状态。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

过去 24 小时内有 3 条 PR 被合并/关闭，均来自 9 月 11 日：

| PR | 标题 | 状态 | 影响 |
|---|---|---|---|
| [#2656](https://github.com/netease-youdao/LobsterAI/pull/2656) | fix: openclaw gateway startup selfheal | ✅ CLOSED | 修复 OpenClaw 网关启动自愈逻辑，提升网关启动稳定性 |
| [#2655](https://github.com/netease-youdao/LobsterAI/pull/2655) | chore: optimize package size | ✅ CLOSED | 优化安装包体积，涉及 Windows/macOS 平台构建配置 |
| [#2653](https://github.com/netease-youdao/LobsterAI/pull/2653) | fix(openclaw): preserve host runtime during plugin cleanup | ✅ CLOSED | 修复 Windows 上插件清理时误删宿主运行时的问题（`fs.rmSync` 递归遍历 junction 导致） |

**整体评估：** 今日关闭的 3 条 PR 均聚焦于基础设施稳定性与构建优化，未涉及面向用户的新功能。项目在底层健壮性上有所推进，但功能层面的进展有限。

---

## 4. 社区热点

今日讨论最活跃的条目（按评论数排序）：

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|---|---|---|---|
| 1 | [#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) 配置文件和工作空间文件在重启后被重置 | 2 | 用户自定义配置（如 `openclaw.json`、`AGENTS.md`）每次重启被模板覆盖，用户被迫使用定时任务 workaround，强烈要求官方提供持久化方案 |
| 2 | [#1048](https://github.com/netease-youdao/LobsterAI/issues/1048) fetchWithAuth 并发 401 双重消费 refreshToken | 1 | 多 IPC 并发调用时 refreshToken 被重复消费，导致用户被强制登出，影响核心认证体验 |
| 3 | [#1051](https://github.com/netease-youdao/LobsterAI/issues/1051) 两处竞态条件导致 AI 会话永久无法启动 | 1 | 并发初始化失败后等待者静默返回，session 永久锁死，用户只能重启应用恢复 |

**分析：** 社区关注点集中在**配置持久化**和**并发竞态**两类问题上。#1006 的诉求最为强烈——用户希望自定义配置不被覆盖，这反映了 LobsterAI 在"保护机制"与"用户自由度"之间的平衡尚未找到最佳解。而 #1048 和 #1051 则暴露了核心路径上的并发缺陷，直接影响用户的使用信心。

---

## 5. Bug 与稳定性

按严重程度排列今日报告的 Bug：

### 🔴 严重（影响核心功能，用户无法正常使用）

| Issue | 描述 | 是否有 Fix PR |
|---|---|---|
| [#1048](https://github.com/netease-youdao/LobsterAI/issues/1048) | 并发 401 时 refreshToken 被双重消费，用户被强制登出 | ✅ [#1049](https://github.com/netease-youdao/LobsterAI/pull/1049) |
| [#1051](https://github.com/netease-youdao/LobsterAI/issues/1051) | 两处竞态条件导致 AI 会话永久无法启动，需重启应用 | ✅ [#1052](https://github.com/netease-youdao/LobsterAI/pull/1052) |
| [#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) | 用户配置文件和工作空间文件重启后被重置 | ❌ 无 Fix PR |

### 🟡 中等（功能异常，有 workaround）

| Issue | 描述 | 是否有 Fix PR |
|---|---|---|
| [#1053](https://github.com/netease-youdao/LobsterAI/issues/1053) | Modal 关闭按钮无反应（弹窗高度触及顶部栏时） | ✅ [#1054](https://github.com/netease-youdao/LobsterAI/pull/1054) |
| [#1062](https://github.com/netease-youdao/LobsterAI/issues/1062) | 定时任务修改时间后标题描述与实际不符 | ❌ 无 Fix PR |
| [#2654](https://github.com/netease-youdao/LobsterAI/issues/2654) | hooks 配置在 Gateway 重启后丢失 | ❌ 无 Fix PR |

### 🟢 轻微（体验问题）

| Issue | 描述 | 是否有 Fix PR |
|---|---|---|
| [#1066](https://github.com/netease-youdao/LobsterAI/issues/1066) | 心跳对话未过滤，系统日志混入用户对话造成困惑 | ❌ 无 Fix PR |
| [#1061](https://github.com/netease-youdao/LobsterAI/issues/1061) | 网关端口修改方式不明确，与 OpenClaw 端口冲突 | ❌ 无 Fix PR |

**关键发现：** 最严重的两个并发 Bug（#1048、#1051）已有对应的 Fix PR（#1049、#1052），但均带有 `[stale]` 标签，说明 PR 已提交约 5 个月仍未合并。这是当前项目最需要关注的稳定性风险。

---

## 6. 功能请求与路线图信号

### 用户明确提出的功能请求

| Issue | 功能请求 | 潜在优先级 |
|---|---|---|
| [#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) | 官方方式持久化用户配置，允许自定义文件重启后保留 | ⭐⭐⭐ 高（用户痛点强烈，已有 workaround 说明需求真实） |
| [#1061](https://github.com/netease-youdao/LobsterAI/issues/1061) | 提供网关端口修改入口或文档说明 | ⭐⭐ 中（配置灵活性需求） |
| [#2654](https://github.com/netease-youdao/LobsterAI/issues/2654) | user_plugins 表增加 hooks 字段并持久化 | ⭐⭐ 中（已有明确的根因分析和修复建议） |

### 已有 PR 暗示的路线图方向

| PR | 功能方向 | 状态 |
|---|---|---|
| [#1065](https://github.com/netease-youdao/LobsterAI/pull/1065) | 定时任务支持绑定已有 cowork session（含可搜索下拉选择器） | 待合并，`[stale]` |
| [#1058](https://github.com/netease-youdao/LobsterAI/pull/1058) | 定时任务运行历史 JSONL 写入失败时防止数据丢失 | 待合并，`[stale]` |
| [#1057](https://github.com/netease-youdao/LobsterAI/pull/1057) | 过滤 LLM 判断响应中的 thinking blocks | 待合并，`[stale]` |

**判断：** #1065 的 session 绑定功能是近期唯一面向用户的功能增强 PR，如果被合并，将显著提升定时任务的灵活性。但该 PR 同样带有 `[stale]` 标签，合并时间不确定。

---

## 7. 用户反馈摘要

从 Issues 评论中提炼的真实用户声音：

- **配置被重置的挫败感（#1006）：** 用户 @1323588848 表示"目前只能通过定时任务 workaround 解决"，说明用户已经在自行寻找绕过方案，对官方修复的期待值很高。这反映出 LobsterAI 的"保护机制"设计过于激进，在防止用户误操作和尊重用户自主权之间失衡。

- **并发 Bug 的隐蔽性（#1048、#1051）：** 用户 @MaoQianTu 提交了非常详细的技术分析（包括具体行号和竞态场景描述），并主动提交了 Fix PR。这类高质量贡献者值得维护者优先响应，否则可能流失。

- **UI 细节问题（#1053、#1062、#1066）：** 用户 @leedalei 和 @blueb0ne 报告的问题都属于"小但烦人"的体验缺陷——Modal 按钮点不了、定时任务标题不一致、心跳对话混入。这些问题单独看不大，但累积起来会显著影响产品的精致感。

- **配置灵活性诉求（#1061）：** 用户 @fuckjavaer 的提问"怎么才能修改网关端口"非常简短，但背后反映的是 LobsterAI 与 OpenClaw 共存场景下的真实冲突，文档缺失导致用户无法自助解决。

---

## 8. 待处理积压

以下条目长期未获维护者响应，建议优先关注：

| 条目 | 类型 | 创建时间 | 距今 | 备注 |
|---|---|---|---|---|
| [#1049](https://github.com/netease-youdao/LobsterAI/pull/1049) | PR | 2026-03-30 | ~5.5 个月 | 修复严重认证 Bug，已有完整技术分析，等待 review |
| [#1052](https://github.com/netease-youdao/LobsterAI/pull/1052) | PR | 2026-03-30 | ~5.5 个月 | 修复 AI 会话永久锁死，等待 review |
| [#1054](https://github.com/netease-youdao/LobsterAI/pull/1054) | PR | 2026-03-30 | ~5.5 个月 | Modal 关闭按钮修复，一行 CSS 改动，等待 review |
| [#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) | Issue | 2026-03-28 | ~5.5 个月 | 配置持久化需求，无 Fix PR，用户已有 workaround |
| [#1065](https://github.com/netease-youdao/LobsterAI/pull/1065) | PR | 2026-03-30 | ~5.5 个月 | 定时任务 session 绑定功能，等待 review |

**积压分析：** 所有 `[stale]` 标签的条目均来自 2026 年 3 月底，距今约 5.5 个月。这些 PR 中包含了两个严重 Bug 的修复（#1049、#1052）和一个极低成本的 UI 修复（#1054），长期未合并的原因不明。建议维护者优先处理这三条 PR，以释放社区贡献者的积极性。

---

*报告生成时间：2026-09-12 | 数据覆盖：过去 24 小时 GitHub 活动*

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报

**日期：** 2026-09-12 | **数据来源：** github.com/moltis-org/moltis

---

## 1. 今日速览

Moltis 今日整体活跃度处于中等偏低水平，过去 24 小时无新版本发布，但社区贡献端出现了一个值得关注的快速响应闭环：用户 @stratus-ss 报告了 Telegram 共享频道中工具失效的 Bug（#1264），贡献者 @penso 在当日即提交了修复 PR（#1265），响应速度出色。此外，一个已挂起 6 天的 TLS ALPN 修复 PR（#1261）于今日关闭，标志着该技术债务项的收敛。整体来看，项目在缺陷修复和协议规范化方面有小幅推进，但功能迭代节奏偏缓。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 已合并/关闭 PR

| PR | 标题 | 状态 | 意义 |
|---|---|---|---|
| [#1261](https://github.com/moltis-org/moltis/pull/1261) | fix(tls): restrict ALPN to HTTP/1.1 | ✅ CLOSED | 将 TLS ALPN 协议协商限制为 HTTP/1.1，直至 RFC 8441 WebSocket 升级得到支持。该 PR 同时固定了现有 TLS 配置测试中的 ALPN 列表，并在贡献者指南中记录了协议约束。关闭了长期存在的 Issue #245，消除了 TLS 层潜在的协议协商歧义，提升了连接行为的可预测性。 |

**进展评估：** 今日关闭的 PR 属于技术债清理性质，不涉及面向用户的功能变化，但对协议栈的严谨性有正向贡献。项目整体向前迈进的幅度较小，主要价值在于消除了一个已知的协议层隐患。

---

## 4. 社区热点

今日社区互动极为有限：所有 Issues 和 PR 的评论数均为 0，反应数（👍）均为 0。唯一的新 Issue #1264 在创建后 24 小时内即获得了修复 PR 的关联，但尚未引发社区讨论。

- **[#1264 [Bug] Tools stop working in shared Telegram channels](https://github.com/moltis-org/moltis/issues/1264)** — 唯一的新 Issue，报告了 Telegram 共享频道中工具调用失效的问题。虽然暂无评论，但其快速获得 PR 响应（#1265）表明该问题触及了 Telegram 集成中一个真实的配置盲区。

**分析：** 社区讨论热度整体偏低，可能反映了项目当前处于稳定维护期而非快速迭代期。Bug 报告到修复 PR 的短链路响应是积极的健康信号。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 是否有 Fix PR |
|---|---|---|---|
| 🟠 中 | [#1264](https://github.com/moltis-org/moltis/issues/1264) | Telegram 共享频道中工具停止工作。根因指向 Telegram 网关继承了 deny-all 工具策略上限，但未暴露 Slack 已支持的 `untrusted_audience` 和 `untrusted_tools` 配置项 | ✅ 有 — [#1265](https://github.com/moltis-org/moltis/pull/1265) 已提交，待合并 |

**稳定性评估：** 今日无崩溃级或高危安全问题报告。唯一 Bug 属于功能配置缺失导致的特定场景失效，影响范围限于 Telegram 共享频道用户，且已有针对性修复 PR 在途。

---

## 6. 功能请求与路线图信号

今日无直接的功能请求 Issue。但以下 PR 信号值得关注：

- **[#1265](https://github.com/moltis-org/moltis/pull/1265) — fix(telegram): expose shared-chat tool policy controls**：该 PR 不仅修复了 #1264，还将 Slack 已有的 `untrusted_audience` / `untrusted_tools` 配置能力扩展到 Telegram 平台，涉及配置层、运行时访问、存储序列化和 API 响应脱敏。这实质上是一个**功能对齐**工作，使 Telegram 集成在工具策略管控方面达到与 Slack 同等的成熟度。若合并，将显著增强多平台部署场景下的安全管控一致性。

- **[#1143](https://github.com/moltis-org/moltis/pull/1143) — Add Requesty as an OpenAI-compatible provider**：该 PR 已挂起 72 天（创建于 2026-07-02），今日无更新。它请求将 Requesty（一个 OpenAI 兼容的 LLM 路由器）添加为表驱动的 provider。该 PR 长期未获合并或明确拒绝，可能反映了维护者对 provider 生态扩展的审慎态度，或存在未公开的架构考量。

**路线图判断：** 短期内最可能进入下一版本的是 #1265（Bug 修复 + 功能对齐，响应链路已激活）。#1143 的长期挂起状态表明 provider 扩展可能不是当前优先事项。

---

## 7. 用户反馈摘要

今日用户反馈数据极为稀疏：

- **@stratus-ss**（[#1264](https://github.com/moltis-org/moltis/issues/1264)）报告了 Telegram 共享频道场景下的工具失效问题，并完成了 Preflight Checklist 中的搜索和版本确认项，但未包含完整的会话上下文（第三项未勾选）。这反映出用户对 Bug 报告流程有一定了解，但在提供完整上下文方面仍有改进空间。

- 无其他用户评论、点赞或情感表达。整体用户反馈信号微弱，无法提炼出更丰富的痛点或满意度数据。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 挂起时长 | 建议 |
|---|---|---|---|---|
| PR | [#1143](https://github.com/moltis-org/moltis/pull/1143) | Add Requesty as an OpenAI-compatible provider | 72 天 | ⚠️ **重点关注**：该 PR 已超过两个月未获实质性推进（无评论、无 review、无合并/关闭动作）。建议维护者明确表态：是否接受新的 provider 扩展？若接受，需安排 review；若不接受，应及时关闭并说明理由，避免贡献者等待。 |
| PR | [#1265](https://github.com/moltis-org/moltis/pull/1265) | fix(telegram): expose shared-chat tool policy controls | <1 天 | 新提交，建议尽快 review 并合并，以关闭 #1264。 |

**积压健康度：** 长期积压项仅 #1143 一项，整体积压压力较小。但该 PR 的长期沉默可能对贡献者积极性产生负面影响，值得维护者关注。

---

## 项目健康度小结

| 维度 | 状态 | 说明 |
|---|---|---|
| 响应速度 | 🟢 良好 | Bug → Fix PR 当日完成 |
| 技术债管理 | 🟢 良好 | TLS ALPN 约束 PR 关闭，Issue #245 收敛 |
| 社区活跃度 | 🟡 偏低 | 零评论、零反应，讨论氛围冷清 |
| 积压管理 | 🟡 一般 | #1143 挂起 72 天无回应 |
| 版本节奏 | 🟡 偏缓 | 无近期 Release 记录 |

**总体评价：** Moltis 今日展现出良好的缺陷响应能力和技术债清理意识，但社区互动活跃度偏低，且存在一个长期未决的 provider 扩展 PR。项目处于"稳定但不够活跃"的状态，建议维护者关注贡献者体验和社区参与度的提升。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报

**日期：** 2026-09-12
**数据来源：** github.com/agentscope-ai/CoPaw（注：实际 Issue/PR 链接指向 QwenPaw 仓库，推测为项目更名或镜像关系）

---

## 1. 今日速览

项目今日处于**高度活跃状态**，过去 24 小时产生 21 条 Issue 更新（15 条新开/活跃）和 20 条 PR 更新（16 条待合并），社区贡献者参与度显著。Bug 报告集中在**会话丢失、模型配置丢失、MCP 连接失败**等核心稳定性问题上，其中内存耗尽问题（#7722）被定位为三条复合路径，值得高度关注。功能请求方面，用户对**记忆写入独立模型**（#7664 → PR #7719）和**多模型协作**（#4901）的呼声持续升温，已有对应 PR 进入待合并队列。整体来看，项目处于 v2.2.1 稳定版发布后的**快速迭代修复期**，社区贡献活跃但稳定性问题仍需收敛。

---

## 2. 版本发布

今日无新版本发布。最近一次稳定版为 **v2.2.1**（2026-09-11 发布），相关安装验证 Issue（#7692）已关闭。当前社区反馈的多个 Bug（#7708、#7716、#7724）均发生在 v2.2.1 上，建议维护者评估是否需要发布 v2.2.2 补丁版本。

---

## 3. 项目进展

今日共有 **4 条 PR 被合并/关闭**，推进了以下修复与改进：

| PR | 标题 | 影响 |
|---|---|---|
| [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) | fix(api): return 422 for non-finite validation inputs | 修复 API 层对非有限数值（NaN/Infinity）输入的处理，返回结构化 422 错误而非崩溃 |
| [#7688](https://github.com/agentscope-ai/QwenPaw/pull/7688) | fix(console): simplify grouped session pagination | 简化分组会话分页逻辑，移除"折叠列表"功能，改用"加载更多"分页，修复会话列表状态丢失问题 |
| [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) | fix(models): preserve provider-resolved context windows | 修复模型上下文窗口被错误重置为默认 32768 的问题，避免过早触发上下文压缩 |
| [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) | fix(telegram): render Markdown tables as `<pre>` instead of raw pipes | 修复 Telegram 频道中 Markdown 表格渲染为原始管道符的问题（被 #7713 的 Rich Messages 方案替代） |

**整体评估：** 项目在 API 健壮性、控制台 UX、模型上下文管理、多频道渲染四个方向上均有实质推进，但核心稳定性问题（会话丢失、内存泄漏）的修复仍在进行中。

---

## 4. 社区热点

今日讨论最活跃的 Issues/PRs：

### 🔥 #7722 — 内存耗尽三重复合路径（2 条评论，新开）
[链接](https://github.com/agentscope-ai/QwenPaw/issues/7722)
用户 @Nobodyanonymou-s 提交了一份**受控复现报告**，指出容器内存以 ~1MB/s 速度耗尽并非单一 Bug，而是三条复合路径：无界流缓冲、keep-alive 实例堆叠、doom-loop 门控逃逸。该 Issue 附带最小修复方案，且作者已提交对应 PR #7723。**诉求：** 社区对生产环境稳定性的焦虑正在从"报告现象"升级为"定位根因+提交修复"，这是项目健康度提升的积极信号。

### 🔥 #7676 — subagent_model 配置无效（3 条评论，已关闭）
[链接](https://github.com/agentscope-ai/QwenPaw/issues/7676)
用户 @NORFMS 在两个 beta 版本上复现了子代理模型覆盖配置被静默丢弃的问题，关联了 #4901（多模型协作）、#6302（引入 subagent_model）等历史 Issue。已有诊断 PR #7680 提交。**诉求：** 多模型协作是用户节省 Token 成本的核心需求，配置静默失效严重打击信任。

### 🔥 #7715 — Daily Paper 插件静默失败（3 条评论，新开）
[链接](https://github.com/agentscope-ai/QwenPaw/issues/7715)
用户 @PTW1981 报告 arxiv.org 不可达时，Daily Paper 定时任务以误导性的 "completed with no returned content" 消息静默失败，真实错误（httpx.ConnectError）被隐藏。**诉求：** 用户需要可配置的代理/端点设置，以及透明的错误报告。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（数据丢失/服务不可用）

| Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|
| [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | 会话丢失：对话完成后无法在控制台找到，伴随大模型配置丢失 | OPEN，1 评论 | ❌ 无 |
| [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | 设置好的大模型随机丢失，需退出重选 | OPEN，3 评论 | ❌ 无 |
| [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | 工作区文件浏览器在大仓库下冻结整个服务器（watchfiles 同步初始化阻塞事件循环） | OPEN，1 评论 | ❌ 无 |
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 容器内存耗尽（~1MB/s），三重复合路径 | OPEN，2 评论 | ✅ #7723（部分修复） |

### 🟡 中等（功能异常/回归）

| Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|
| [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | 停止按钮显示已停止但任务实际仍在执行，导致 409 冲突 | OPEN，6 评论 | ❌ 无 |
| [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 升级到 2.2.x 后 MCP 无法连接和注册（2.1.1b3 正常） | OPEN，2 评论 | ❌ 无 |
| [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) | 会话索引与磁盘文件不同步，出现"幽灵会话" | CLOSED（invalid），3 评论 | ❌ 无 |
| [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | 定时任务经常无输出，结果被折叠在步骤或 thinking 中 | OPEN，1 评论 | ❌ 无 |

### 🟢 轻微（体验问题）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) | Agent 工作目录设置不生效，回退到旧路径 | OPEN，1 评论 |
| [#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720) | Creator 插件隐藏 prompt-sync 阻塞原因，缺少手动图像接受机制 | OPEN，1 评论 |

---

## 6. 功能请求与路线图信号

### 已有 PR 支撑的功能请求（高概率进入下一版本）

| Issue | 功能请求 | 对应 PR | 状态 |
|---|---|---|---|
| [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) | ReMeLight 支持独立记忆写入模型（节省 Token 成本） | [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | OPEN，待审查 |
| [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711) | 添加 Serply 作为 web_search 第三方提供商 | [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) | OPEN，待审查 |
| [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) | 为 Agent 间工具聊天和主动消息添加历史分组 | 无直接 PR | 仅 Issue |
| [#7714](https://github.com/agentscope-ai/QwenPaw/issues/7714) | 支持自定义默认 Loop 模式，内置"默认"模板改名"标准" | 无直接 PR | 仅 Issue |
| [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) | DeepSeek 模型原生能力元数据、prompt 前缀稳定性、KV-cache 可观测性 | 无直接 PR | 仅 Issue |

### 长期路线图信号

- **多模型协作**（#4901，6 月 2 日创建，至今 OPEN）：用户持续呼吁 spawn_subagent 支持按任务选择模型，相关诊断 PR #7680 已提交，但完整功能实现仍需规划。
- **Telegram 富文本渲染**：PR #7713（Rich Messages for Markdown tables）和 #7592（中间消息清理）表明 Telegram 频道体验正在被系统性地提升。

---

## 7. 用户反馈摘要

### 真实痛点

1. **移动端操作焦虑**（#7177，已关闭）：用户 @rerbin 反馈网页版在手机上操作入口位置不合理，"打开"按钮紧邻"停止运行"，每次操作都紧张怕误触。**诉求：** 移动端 UX 需要专门优化，而非简单响应式缩放。

2. **模型配置丢失的挫败感**（#7708、#7724）：用户 @xiaohushi512 多次报告"用着用着就报错说没设置大模型"，且伴随会话丢失。**诉求：** 配置持久化机制存在根本性缺陷，用户对数据安全的信任正在被侵蚀。

3. **定时任务输出不可见**（#7709）：用户 @tina0501853 反馈定时任务"经常无输出"，结果被折叠在步骤或 thinking 中，甚至干脆没有结果。**诉求：** 自动化任务的输出可见性和可靠性是生产使用的底线要求。

4. **安卓输入法换行即提交**（#7707，已关闭）：用户 @rerbin 指出安卓输入法只有换行按钮无回车按钮，当前会话框点击换行就提交，无法输入多行内容。**诉求：** 移动端输入体验需要适配平台特性。

### 用户满意度信号

- **正面：** 用户 @rerbin 在 #7707 中表示"2.2.1 web 移动端使用的体验已经比较好了"，说明移动端整体可用性在提升。
- **负面：** 多个用户（@xiaohushi512、@zhangpone）报告会话丢失问题，且 #7698 被标记为 invalid 关闭，用户可能感到被忽视。

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 标题 | 创建时间 | 状态 | 建议 |
|---|---|---|---|---|
| [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | spawn_subagent 支持按任务选择模型 | 2026-06-02 | OPEN，3 评论 | **高优先级**：已超过 3 个月，用户持续关注，且有诊断 PR #7680 提交，建议纳入下一版本规划 |
| [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) | feat(models): add Atlas Cloud provider | 2026-07-27 | OPEN，无评论 | **中优先级**：PR 已提交近 2 个月无审查反馈，建议维护者尽快 review 或明确拒绝 |
| [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) | fix(browser): self-heal dead Playwright driver connections | 2026-08-07 | OPEN，标记 ready-for-human-review | **高优先级**：修复"死一次永久死"的浏览器后端 Bug，已标记待人工审查，建议优先处理 |

### 需要维护者关注的 PR

| PR | 标题 | 创建时间 | 状态 |
|---|---|---|---|
| [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) | fix(agents): diagnose dropped subagent model overrides | 2026-09-11 | OPEN，关联 #7676 |
| [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) | fix(console): emit an error event when stream_one fails | 2026-09-12 | OPEN，关联 #7722 |
| [#7702](https://github.com/agentscope-ai/QwenPaw/pull/7702) | feat(plugins): add bot-manager — unified multi-channel bot management plugin | 2026-09-11 | OPEN，首次贡献者 |

---

## 项目健康度评估

| 维度 | 评分 | 说明 |
|---|---|---|
| **社区活跃度** | ⭐⭐⭐⭐☆ | 21 条 Issue + 20 条 PR/24h，贡献者多样，首次贡献者占比高 |
| **稳定性** | ⭐⭐☆☆☆ | 会话丢失、模型配置丢失、内存耗尽等严重 Bug 集中爆发，v2.2.1 发布后未收敛 |
| **响应速度** | ⭐⭐⭐☆☆ | 部分 PR 快速合并（#7677、#7688），但 #6499 等 PR 积压近 2 个月 |
| **路线图清晰度** | ⭐⭐⭐☆☆ | 多模型协作、记忆模型独立化等方向明确，但缺乏公开的版本规划 |
| **用户信任** | ⭐⭐☆☆☆ | 数据丢失类 Bug 反复出现，用户开始质疑配置持久化机制的可靠性 |

**总结：** CoPaw 项目处于**高活跃但稳定性承压**的阶段。社区贡献意愿强烈（大量首次贡献者提交修复 PR），但核心数据安全问题（会话丢失、配置丢失）需要维护者优先投入资源解决。建议尽快发布 v2.2.2 补丁版本，集中修复 #7708、#7724、#7721、#7722 四个严重 Bug，以恢复用户信任。

:::
