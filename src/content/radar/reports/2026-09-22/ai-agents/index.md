---
title: "OpenClaw 生态日报"
published: 2026-09-22
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-22

> Issues: 240 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-22 02:07 UTC

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

# OpenClaw 项目动态日报 — 2026-09-22

## 1. 今日速览

过去24小时项目保持**高度活跃**：共 240 条 Issue 更新（新开/活跃 229，关闭 11）与 500 条 PR 更新（待合并 334，已合并/关闭 166），PR 合并关闭率约 33%。今日发布 `v2026.7.35 extended-stable` LTS 等价版本，稳定分支持续获得安全与可靠性补强。社区讨论热度集中在 **P0 级 crash-loop**（#91009）、**WhatsApp 图片消息阻塞**（#96834）与**子进程泄漏导致僵尸进程累积**（#97616）等稳定性议题。维护者反应积极，steipete 等核心贡献者密集提交 Gateway 性能修复 PR，整体项目健康度**中上，但高优先级 bug 的积压时间值得关注**。

---

## 2. 版本发布

### v2026.7.35（extended-stable，Gateway-only）
- **定位**：当前等价于 LTS 的稳定分支版本，面向需要长期稳定支持的用户。
- **内容**：基于 2026 年 7 月底的 OpenClaw 快照，附加以下增量：
  - 关键安全更新
  - 可靠性修复
  - 性能优化
  - 新模型支持
- **迁移注意**：作为 extended-stable 分支，API 与配置系列与 2026.7 系列保持兼容；当前主线最新版本为 2026.9.5，普通用户建议继续跟随主线。

链接：https://github.com/openclaw/openclaw/releases

---

## 3. 项目进展

今日 166 个 PR 被合并/关闭，多个重点修复处于推进或待合并状态，主线向 **Gateway 去阻塞化** 和 **Codex 集成稳定性** 两个方向显著迈进。

### Gateway 性能与线程模型修复（今日最密集主题）
- **[#155339](https://github.com/openclaw/openclaw/pull/155339) [OPEN]** `fix: prevent Gateway stalls during secret cleanup` — 将秘密存储清理的 SQLite 等待移出事件循环，避免 Gateway 请求与控制 UI 暂停（steipete）
- **[#153652](https://github.com/openclaw/openclaw/pull/153652) [OPEN]** `refactor(doctor): move sandbox registry imports off thread` — 继续将 SQLite 导入工作移出应用线程（steipete）
- **[#153194](https://github.com/openclaw/openclaw/pull/153194) [OPEN]** `refactor(sessions): move persisted member writes off the Gateway thread` — 会话成员写入脱离 Gateway 线程（steipete）
- **[#155345](https://github.com/openclaw/openclaw/pull/155345) [CLOSED]** `improve: reduce session-list CPU when display options change` — 会话列表展示选项变更时避免全量重复过滤（steipete）

### Codex 集成修复
- **[#155315](https://github.com/openclaw/openclaw/pull/155315) [OPEN]** `fix(codex): missing tasks after Code Mode follow-ups` — 修复 Code Mode 后续轮次未独立追踪任务的问题（steipete）
- **[#155353](https://github.com/openclaw/openclaw/pull/155353) [OPEN]** `fix(codex): keep native children accessible after automatic completion` — 自动完成轮次后保留原生子代理的任务树可达性（stackingrockss）
- **[#155343](https://github.com/openclaw/openclaw/pull/155343) [CLOSED]** `fix(qa): use terminal reply for native MCP proof` — 修复发布验证失败，改用 terminal reply 读取最终助手回复（RomneyDa）

### 会话归属与消息修复
- **[#155349](https://github.com/openclaw/openclaw/pull/155349) [OPEN]** `fix: visible work sessions belong to the requester` — 修正 `sessions_spawn` 创建的可见团队会话归属为已验证请求者（roboclaw-bot）
- **[#155336](https://github.com/openclaw/openclaw/pull/155336) [OPEN]** `fix(ui): avoid duplicated replies after model fallback` — 修复模型 fallback 后 WebChat 出现重复回复（roboclaw-bot）
- **[#155356](https://github.com/openclaw/openclaw/pull/155356) [OPEN]** `fix(bash-tools): skip secret egress when no admitted run instance` — cron/automation 的 `agentTurn` 在无已受理运行实例时静默跳过 secret egress，而非硬抛错阻塞所有调用（holny）
- **[#155354](https://github.com/openclaw/openclaw/pull/155354) [OPEN]** `fix(matrix): use SDK helpers instead of getMatrixRuntime ...` — 修复异步进度回调中 "Matrix runtime not initialized" 异常（holny）

### 其他值得注意
- **[#155350](https://github.com/openclaw/openclaw/pull/155350) [OPEN]** `fix(infra): bound the Git HEAD read` — 避免超大 `.git/HEAD` 文件被整体读入内存（xydt-juyaohui）
- **[#155355](https://github.com/openclaw/openclaw/pull/155355) [OPEN]** `fix(update): verify every managed Gateway restart attempt` — 确保每次托管的 Gateway 重启都通过目标 CLI 验证（steipete）

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|---|---|---|---|
| 1 | [#91009](https://github.com/openclaw/openclaw/issues/91009) [P0, crash-loop] | 26 | Codex hook relay 派生 CPU 密集进程，阻塞 Gateway RPC，问题持续 3 个月+ |
| 2 | [#96834](https://github.com/openclaw/openclaw/issues/96834) [P1, message-loss] | 16 | WhatsApp 图片消息导致主车道阻塞约 3 分钟 |
| 3 | [#97616](https://github.com/openclaw/openclaw/issues/97616) [P1, crash-loop] | 16 | hook/tool 子进程泄漏 → 僵尸进程累积，运行时退化 |
| 4 | [#137332](https://github.com/openclaw/openclaw/issues/137332) [P1] | 15 | 混合 requester-settle 批次在所有权检查后永远重试 |
| 5 | [#98435](https://github.com/openclaw/openclaw/issues/98435) [P2] | 14 | MCP loopback 不自动重连，`recovered=1` 指标误导用户 |

**解读**：社区注意力高度集中在**进程管理**（crash-loop、僵尸进程）与**消息可靠性**（消息丢失、通道阻塞）两大主题。[#91009](https://github.com/openclaw/openclaw/issues/91009) 从 6 月拖到 9 月仍未关闭，且无关联 fix PR，社区对 P0 问题的响应速度存在明显不满信号。另一方面，[#96834](https://github.com/openclaw/openclaw/issues/96834) 和 [#97616](https://github.com/openclaw/openclaw/issues/97616) 均带有 `source-repro`，说明复现路径已被社区明确，修复应优先排期。

---

## 5. Bug 与稳定性

### P0（严重）
- **[#91009](https://github.com/openclaw/openclaw/issues/91009)** [crash-loop] Codex PreToolUse hook 派生 CPU 密集进程，阻塞 Gateway RPC — **无关联 fix PR**，已开放 3.5 个月
- **[#153049](https://github.com/openclaw/openclaw/issues/153049)** 更新失败：`doctor-failed`，从 2026.9.4 升级到 2026.9.5 失败，影响发行版更新路径 — **较新（9/19 创建）**，`maturity:stable` 用户受影响
- **[#91931](https://github.com/openclaw/openclaw/issues/91931)** [data-loss] 预置 SOUL.md/IDENTITY.md/USER.md 会导致 bootstrap 自动完成并**删除用户 BOOTSTRAP.md** — **有 linked PR open**

### P1（高）
- **[#96834](https://github.com/openclaw/openclaw/issues/96834)** WhatsApp 1:1 图片消息导致主车道阻塞 ~3 分钟，multimodal run 卡在 `active_reply_work` — 无 fix PR，影响日常高频通道
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** 回归：hook/tool 子进程未收割，僵尸进程累积 — 无 fix PR，`source-repro` 已具备
- **[#137332](https://github.com/openclaw/openclaw/issues/137332)** 回归：requester-settle 批次在所有权检查后永久重试 — 标记 `clawsweeper:queueable-fix`，**修复 PR 已准备**
- **[#39476](https://github.com/openclaw/openclaw/issues/39476)** A2A `sessions_send` 目标 agent 可回调造成重复消息 — 3 月创建，无新 fix PR
- **[#101929](https://github.com/openclaw/openclaw/issues/101929)** 上下文溢出预检查高估 2.3–2.6×，触发不必要截断 — `fix-shape-clear` + `needs-maintainer-review`
- **[#99947](https://github.com/openclaw/openclaw/issues/99947)** Codex harness 镜像历史读取失败 + 一次性清理误删应用服务器客户端 — 有 `source-repro`
- **[#95866](https://github.com/openclaw/openclaw/issues/95866)** 强制 Gateway 重启时 in-flight 回复被丢弃（drain 超时 0ms）— 无 fix PR
- **[#102534](https://github.com/openclaw/openclaw/issues/102534)** Cron 调度器定时器在重度超时后永久停止触发，重启不恢复 — 无 fix PR

### 积极信号
今日多个 PR（#155339、#153652、#153194）系统性地将 SQLite 工作移出 Gateway 事件循环，有望缓解部分“进程卡死 + RPC 超时”类症状。若与 #91009 的根因相关，将显著改善 Gateway 稳定性。

---

## 6. 功能请求与路线图信号

以下请求多带有 `clawsweeper:needs-product-decision` 标签，已进入产品决策等待队列，部分具备低成本落地的可能：

| Issue | 功能 | 落地可能性 |
|---|---|---|
| [#99583](https://github.com/openclaw/openclaw/issues/99583) | 智能会话自动标题（懒加载 + 便宜模型 + 主题感知重命名） | 高 — 代码库已有 `llm-slug-generator`，可实现低成本 |
| [#102199](https://github.com/openclaw/openclaw/issues/102199) | Telegram 进度模式保留已完成的草稿，并另发独立最终消息 | 中 — 已有 `streaming.mode:"progress"` 基础 |
| [#97638](https://github.com/openclaw/openclaw/issues/97638) | `skipSkillsSync` 选项，跳过 sandbox 技能同步 | 高 — 配置项实现，对自定义 sandbox 用户即时有益 |
| [#96477](https://github.com/openclaw/openclaw/issues/96477) | 放宽单写者会话锁以支持多用户生产部署 | 低 — 涉及并发安全，需谨慎设计 |
| [#92285](https://github.com/openclaw/openclaw/issues/92285) | 子代理任务在 child lost 后保持 stale_running 的修正 | 中 — 影响 orchestrator 场景 |
| [#46058](https://github.com/openclaw/openclaw/issues/46058) | Android 聊天优先移动端界面 | 低 — 社区 fork 探索，官方未承诺 |

**信号解读**：P3 级别的体验类功能（自动标题、Telegram 草稿保留）有被纳入后续 minor 版本的趋势；而 `skipSkillsSync` 这类低风险配置项最可能快速进入主线。

---

## 7. 用户反馈摘要

- **稳定性焦虑（最突出）**：[#91009](https://github.com/openclaw/openclaw/issues/91009) 的 P0 crash-loop 持续 3 个月，用户报告进程“consumed ~100%+ CPU each”，生产环境受严重影响；[#97616](https://github.com/openclaw/openclaw/issues/97616) 的僵尸进程问题被标记为回归，用户担忧长期运行时资源退化。
- **消息可靠性受损**：WhatsApp 图片阻塞 3 分钟（[#96834](https://github.com/openclaw/openclaw/issues/96834)）、Signal 文本在 tool call 前静默丢弃（[#101793](https://github.com/openclaw/openclaw/issues/101793)）、Teams 线程 >50 条时遗漏新回复（[#98870](https://github.com/openclaw/openclaw/issues/98870)）——多通道交付不一致正在消耗用户信任。
- **成本敏感**：[#101929](https://github.com/openclaw/openclaw/issues/101929) 上下文高估导致无谓截断，[#95610](https://github.com/openclaw/openclaw/issues/95610) 与 [#84110](https://github.com/openclaw/openclaw/issues/84110) 提示缓存命中率从 93% 塌方到 47%，直接影响 API 账单。
- **升级顾虑**：[#153049](https://github.com/openclaw/openclaw/issues/153049) 更新失败 + [#91931](https://github.com/openclaw/openclaw/issues/91931) 的 BOOTSTRAP.md 被删风险，可能让部分用户延迟升级。
- **积极评价**：无障碍用户感谢 v2026.6.9 将用量信息移近模型选择器的改进（[#95601](https://github.com/openclaw/openclaw/issues/95601)）；另外多位用户明确认可维护者对性能问题的密集修复节奏。

---

## 8. 待处理积压

### 长期未关闭的重要 Issue（>3 个月）
- **[#39476](https://github.com/openclaw/openclaw/issues/39476) [P1]** A2A `sessions_send` 重复消息 — 2026-03-08 创建，核心多智能体通信正确性问题
- **[#56653](https://github.com/openclaw/openclaw/issues/56653) [P2]** Slack reaction_added/removed 在 Socket Mode 下不投递 — 2026-03-28 创建，5 个 bot 账户复现
- **[#38714](https://github.com/openclaw/openclaw/issues/38714) [P2]** Discord reaction 事件未接入 Hooks 系统 — 2026-03-07 创建
- **[#46058](https://github.com/openclaw/openclaw/issues/46058) [P3]** Android 聊天优先客户端讨论 — 2026-03-14 创建，社区关注但官方未表态

### 等待作者响应的 PR（>3 个月）
- **[#95665](https://github.com/openclaw/openclaw/pull/95665)** 心跳模型 fallback 策略配置 — 2026-06-22 创建，等待作者，影响后台自动化模型选择透明度
- **[#99193](https://github.com/openclaw/openclaw/pull/99193)** docs(acpx) 暴露 Grok Build harness 目标 — 2026-07-02 创建，等待作者
- **[#96291](https://github.com/openclaw/openclaw/pull/96291)** [P2] Codex 内存 flush append 载荷边界 — 2026-06-24 创建，等待作者，标记兼容性风险

### 提示维护者
**[#153049](https://github.com/openclaw/openclaw/issues/153049)**（升级失败，P0）为今日新增高优问题，影响 `maturity:stable` 用户的升级路径，建议优先响应并提供 workaround。

---

**总结**：OpenClaw 在 2026-09-22 展现出旺盛的迭代速度和积极的维护响应，但 P0/P1 级稳定性问题的**平均存活时间**偏长（#91009 达 3.5 个月），是当前项目健康度的主要风险点。建议社区关注「稳定性修复 PR 的合并速率」与「高优 issue 的关闭速率」两个指标，验证后续版本对用户信任的修复效果。

---

## 横向生态对比

# 开源个人 AI 助手/自主智能体生态横向对比分析报告（2026-09-22）

## 1. 生态全景

当前开源个人 AI 助手/自主智能体生态正处于**高速迭代与稳定性阵痛并存**的阶段。以 OpenClaw 为龙头的项目单日 PR 更新量达 500 条，同时 Zeroclaw、CoPaw 等也在密集推进架构设计与安全加固，整体代码活跃度极高。然而，多项目不约而同地暴露出**进程管理、消息可靠性、上下文预算控制**等基础设施短板——OpenClaw 的 P0 crash-loop 存续 3.5 个月、NanoBot 的自动压缩死锁、CoPaw 的上下文超预算均指向同一类问题：**功能扩张速度已超过稳定性打磨速度**。另一方面，社区对**本地化/隐私**（VoxCPM 本地 TTS、OpenAI 兼容 provider）和**多 agent 协作原语**（消息回执、agent 间通信）的诉求显著上升，预示着生态正从“单 agent 工具”向“多 agent 基础设施”演进。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 合并/关闭 PR | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 240（关 11） | 500（待 334） | 166（33%） | v2026.7.35 extended-stable | 中上：迭代极快，但 P0 平均存活期过长（#91009 已 3.5 个月） |
| **Zeroclaw** | 8（关 1） | 50（待 49） | 1 | 无 | 中上：架构设计活跃、安全修复密集，但 `risk:high` PR 积压、P1 依赖告警 43 天未根治 |
| **CoPaw** | 17（关 8） | 33（待 17） | 16（48%） | 无 | 良好：修复与测试并进，覆盖率 73.79%；安全类 issue（prompt injection）无 fix 待关注 |
| **NanoBot** | 3（关 1） | 28（待 24） | 4（14%） | 无 | 良好：Bug 当日即出修复 PR，WebUI 密集扩展；但合并率偏低 |
| **LobsterAI** | 2（关 0） | 17（待 2） | 15（88%） | 无 | 良好：修复执行力强，OpenClaw 网关稳定性大幅改善 |
| **IronClaw** | 1（关 0） | 1（关 1） | 1 | 1.4.1-rc.1 切割 | 稳健：发布前准备阶段，流程规范，无积压 |
| **PicoClaw** | 3（关 1） | 3（待 2） | 1（误提交） | 无 | 中等：无严重 bug，但 Web UI 卡顿 63 天无 fix，PR review 效率低 |
| **Moltis** | 2（关 1） | 2（待 2） | 0 | 无 | 中等：功能开发正常，但 PR 审查慢、重复 Issue 管理欠佳 |
| **NanoClaw** | 1（关 0） | 7（待 6） | 1（14%） | 无 | 中等偏低：PR 积压严重（4 个 PR 等待超 1 个月），活跃度下滑 |

## 3. OpenClaw 在生态中的定位

**OpenClaw 是当前生态的绝对中枢与参照系**，其社区规模（单日 500 PR / 240 Issue）比第二梯队（Zeroclaw 50 PR / CoPaw 33 PR）高一个数量级，已形成围绕 Gateway、Codex 集成、多渠道适配的完整贡献者网络。其技术路线上的核心差异在于**“网关去阻塞化”**——steipete 等核心维护者今日系统性将 SQLite 写操作移出事件循环（#155339、#153194、#153652），这是其它项目尚未触及的并发模型深度优化。同时，OpenClaw 的 extended-stable/LTS 分支策略（v2026.7.35）为生产用户提供稳定支点，表明其正从“快速迭代的先锋项目”向“可承载生产负载的平台”过渡。然而，P0 问题跨季度存续、社区对响应速度的不满，也说明其维护带宽已逼近上限——这为垂直场景项目（LobsterAI 的桌面端封装、NanoBot 的轻量 WebUI）留出了生存空间。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **上下文管理与成本控制** | NanoBot（#5849 压缩死锁）、CoPaw（#7628 超预算）、OpenClaw（#101929 高估 2.3-2.6×、缓存命中率 93%→47%） | 自动压缩/截断需基于完整请求预算计算，避免“越压越死”或误截断；缓存策略直接影响 API 账单 |
| **消息渠道可靠性与一致性** | OpenClaw（WhatsApp 阻塞 3min、Signal 静默丢消息、Teams 漏新回复）、NanoClaw（Signal DM 丢首条）、PicoClaw（QQ 401）、Zeroclaw（#10929 外发回执缺失） | 多通道交付不一致正在消耗用户信任，急需统一的投递确认、阻塞检测与重试原语 |
| **进程/子进程生命周期管理** | OpenClaw（#91009 crash-loop、#97616 僵尸进程）、CoPaw（#7908 子进程 Ctrl 事件终止宿主）、Zeroclaw（#10263 入站执行） | 子进程泄漏、失控与信号传播是跨语言（Rust/Node/Python）共性问题，直接决定长期运行稳定性 |
| **Web UI 性能与体验** | PicoClaw（#3281 输入卡顿 63 天）、NanoBot（#5847-5856 UI 功能群）、CoPaw（#7841 启动空白）、LobsterAI（#998/#999 被 stale 关闭） | 长会话渲染性能、移动端适配、启动加载顺序是高频痛点；功能型 PR 被关反衬维护带宽不足 |
| **本地化与隐私** | Moltis（VoxCPM 本地 TTS #1282）、PicoClaw（OpenAI 兼容 provider #3366）、NanoClaw（多发行版安装 #3273） | 用户明确要求“不依赖特定云服务商”，支持自托管模型/网关/本地部署成为差异化卖点 |
| **多 Agent 协作原语** | Zeroclaw（#11027 agent 间消息、#10930 人机交互持久化）、OpenClaw（#39476 A2A 重复消息、#92285 子代理 stale_running） | 从“单 agent 对话”走向“多 agent 协调”，需要消息寻址、回执、任务归属等基础设施 |
| **安全与依赖治理** | Zeroclaw（#9899 cargo deny 43 天、代理凭据泄露 #11026）、CoPaw（#7859 持久化 prompt injection）、OpenClaw（secret cleanup） | 供应链漏洞（传递依赖）、凭据暴露、注入攻击是三大高频风险，且多与 CI 流程强耦合 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手网关（多渠道、Codex 集成、技能系统） | 个人开发者、生产环境自托管者 | 集中式 Gateway + 插件化工具链，LTS 分支策略 |
| **Zeroclaw** | 多 agent 安全协作平台、ZeroCode 低代码配置 | 对安全审计、资源隔离有要求的企业/高级用户 | Rust 实现，RFC 驱动的架构设计，强调宿主级准入控制 |
| **CoPaw** | 面向 Agent 开发者的模型接入层 + 测试基建 | 构建自有 Agent 的开发者（大厂背书） | 模型 provider 层抽象、高测试覆盖率（73.79%）、CI 并行化 |
| **NanoBot** | 轻量级 WebUI 优先的聊天/助手 | 追求开箱即用体验的个人用户 | Python 实现，内存/上下文管理机制，PWA 移动端支持 |
| **PicoClaw** | 嵌入式/轻量级多渠道接入 | 极客、树莓派/ARM 设备用户 | 依赖简单、资源占用低，但 PR review 滞后 |
| **NanoClaw** | Node.js 生态多渠道适配 | 熟悉 JS 技术栈的自托管用户 | 信号/WhatsApp 渠道修复密集，安装脚本覆盖多发行版 |
| **LobsterAI** | OpenClaw 的桌面发行版与升级体验 | OpenClaw 的桌面端用户 | 封装 OpenClaw 网关，专注 Windows/macOS 迁移与稳定性 |
| **Moltis** | 语音与本地 TTS 集成 | 重视隐私的语音交互用户 | 极早期项目，围绕 voice personas 构建 |
| **IronClaw** | 评测基准与自动化发布流程 | 模型评估/发布工程团队 | 每日失败分类 issue 驱动，发布候选自动化切割 |

## 6. 社区热度与成熟度分层

- **第一梯队（高活跃、生态中心）**：**OpenClaw** 单日 PR 500 条，遥遥领先，但高优 bug 的跨季度存续表明其维护已进入“规模不经济”阶段；**Zeroclaw** 50 PR + 5 个同期 RFC，处于**架构设计密集期**，风险标签积压是主要瓶颈；**CoPaw** 33 PR + 测试冲刺，处于**密集修复与基建巩固期**。
- **第二梯队（中活跃、垂直深耕）**：**NanoBot** 28 PR，WebUI 功能群与 Bug 响应速度俱佳，处于**功能扩展期**；**LobsterAI** 17 PR，合并率高达 88%，展现极强的执行聚焦，处于**稳定性收敛期**。
- **第三梯队（低活跃、维护/观望期）**：**NanoClaw**（7 PR，Signal 渠道单项修复）、**PicoClaw**（3 PR，PR 积压 22-63 天）、**Moltis**（2 PR，功能起步）、**IronClaw**（1 PR，发布前静默期）。这些项目的活跃度更多由外部事件（渠道 bug、版本发布）驱动，而非持续的主线迭代。

## 7. 值得关注的趋势信号

1. **“稳定性即竞争力”成为显性共识**：多个项目的用户反馈中，crash-loop、消息丢失、僵尸进程等基础问题的权重大幅超过新功能。OpenClaw #91009 的 3.5 个月存续与社区不满，警示所有项目：**P0 问题的响应速度将直接决定用户信任曲线**。对于开发者，优先选择有 LTS 分支、且高优 issue 关闭速率稳定的项目作为依赖，是规避生产风险的关键。

2. **上下文管理进入“工程化”阶段**：从 NanoBot 的压缩死锁到 CoPaw 的预算超限，再到 OpenClaw 的 2.3× 高估与缓存命中率塌方，“上下文窗口”正从模型参数变为需要精确控制的系统资源。能够提供**全链路 token 核算、缓存亲和性优化、动态压缩策略**的框架，将成为下一轮开发者选型的关键差异化指标。

3. **多智能体协作原语开始“从口号走向代码”**：Zeroclaw 的 agent 间消息传递（#11027）、送达回执（#10929）、人机交互持久化（#10930）三个 RFC 同期推进，加上 OpenClaw 对 A2A 重复消息的修复，说明**消息寻址、投递确认、任务归属**等分布式系统中的经典问题正在 agent 领域重演。提前在架构层面预留这些抽象的项目，将在多 agent 规模化时占据先机。

4. **本地化/私有化部署需求加速下沉**：Moltis 的本地 TTS、PicoClaw 的 OpenAI 兼容 provider、NanoClaw 的多发行版安装支持，共同指向一个趋势：用户不再满足于“能连云端 API”，而是要求**完整可自托管的替代路径**。这与数据隐私、成本控制、网络隔离的诉求叠加，将推动更多“OpenAI-compatible 网关 + 本地推理后端”的混合模式成为标配。

5. **安全左移与依赖治理成为社区协作的“准入门槛”**：Zeroclaw 的 `cargo deny` CI 失败已阻塞所有 PR，CoPaw 的 prompt injection 引发社区最高关注度，OpenClaw 将 secret cleanup 移出事件循环以避免凭证暴露。**供应链漏洞根治、凭据脱敏、注入防护**正从“最佳实践”变为 CI 强制门槛，开发者评估项目时应重点关注其依赖审计与安全响应机制是否成体系。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-22

## 1. 今日速览

项目今日活跃度较高，过去 24 小时有 3 条 Issue 更新（2 条新增、1 条关闭）和 28 条 PR 更新（24 条待合并、4 条已合并/关闭），提交集中在 WebUI 功能增强与运行时稳定性修复两个方向。值得肯定的是，两条新报 Bug（#5849 上下文压缩死锁、#5843 BUILD 阶段延迟）均在当天获得了对应修复/诊断 PR（#5857、#5846），说明维护响应及时。整体上项目正处于 WebUI 能力密集扩展期，同时 Memory 与可观测性修复齐头并进。今日无新版本发布。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日可确认的关闭/合并进展：

- **#5840（已关闭 PR）** — 改进日志可靠性与请求关联：统一 CLI 日志时间戳、请求/会话关联 ID、结构化生命周期字段与单行消息渲染，并修复了 13 处误用 `exc_info=True` 的 Loguru 调用点，同时为请求添加 ID 与完成遥测。这加强了项目的可观测性基础。
  链接：https://github.com/HKUDS/nanobot/pull/5840
- **#5770（已关闭 Issue）** — 移动端侧边栏打开时错误聚焦搜索按钮的 WebUI Bug 被关闭，与其相关的 iOS PWA 修复 PR #5641 仍在开放中。
  链接：https://github.com/HKUDS/nanobot/issues/5770

此外，多条关键 PR 正等待合并，包括 #5857（memory 自动压缩 token 预算修复）、#5846（BUILD 阶段延迟诊断）、#5847-#5856 的 WebUI 功能群、#5845（新增 Opper provider）等。整体来看，项目正沿着 WebUI 成熟度提升、上下文管理可靠性修复、新 provider 接入三条线同步推进。

## 4. 社区热点

今日展示的 PR 评论数未提供，但从 Issue-PR 的当日配对可以判断活跃焦点：

- **#5849 + #5857** — Auto-compaction 死锁问题被报告（summarize_transcript 无 token 预算守卫，历史超出输入预算后压缩永远无法恢复），当天即有 PR 修复，是今日关注度最高的组合，涉及核心上下文管理机制。
  链接：https://github.com/HKUDS/nanobot/issues/5849 | https://github.com/HKUDS/nanobot/pull/5857
- **#5843 + #5846** — 长会话 BUILD 阶段等待 10 秒至数十秒的问题被报告，同日 PR #5846 为 BUILD 生命周期增加结构化 DEBUG 计时事件（含模型/上下文窗口/消息数等诊断元数据），帮助定位瓶颈。
  链接：https://github.com/HKUDS/nanobot/issues/5843 | https://github.com/HKUDS/nanobot/pull/5846
- **#5770 + #5641** — 移动端侧边栏工具提示 Bug 关闭，关联的 iOS PWA 修复 PR 仍开放，移动端体验是持续关注的领域。
  链接：https://github.com/HKUDS/nanobot/issues/5770 | https://github.com/HKUDS/nanobot/pull/5641

## 5. Bug 与稳定性

按严重程度排序：

1. **[严重] #5849 Auto-compaction 死锁** — 自动压缩路径 `summarize_transcript` 发送完整会话历史，缺少 token 预算守卫；一旦历史超过输入预算，压缩永远无法恢复，会话进入不可用状态。已有修复 PR **#5857**（为自动压缩增加预算控制）在待合并中。
   链接：https://github.com/HKUDS/nanobot/issues/5849
2. **[中等] #5843 BUILD 阶段延迟** — 长会话每次用户轮次在 LLM 调用前等待 10 秒至数十秒，发生在 nanobot 内部、provider 请求之前。PR **#5846** 已提供诊断手段（子阶段计时事件），但直接修复仍需进一步分析。
   链接：https://github.com/HKUDS/nanobot/issues/5843
3. **[轻微] #5770 移动端侧边栏搜索工具提示** — 手机打开侧边栏即显示 “Search ⌘K” 白色药丸，无 hover 状态的触屏设备上呈现为默认弹出的搜索框。Issue 已关闭，但关联的 iOS PWA 修复 PR **#5641** 仍在开放中。
   链接：https://github.com/HKUDS/nanobot/issues/5770

## 6. 功能请求与路线图信号

- **WebUI 功能群（#5847-#5856，作者 @Re-bin）** — 包含会话级文件预览、Mermaid 图安全渲染、文件引用统一操作、链接操作与隔离网站预览、类型化图片产物交付、用量统计（7/30/365 天范围 + 活动日历 + 模型细分）、提示词命令管理（作用域/管理 UI）、Commands 面板（检查/停止会话命令不消费输出）、父子任务输出面板。这些 PR 集中在同日提交，强烈暗示下一版本 WebUI 将有大幅能力扩展。
  链接示例：https://github.com/HKUDS/nanobot/pull/5850 | https://github.com/HKUDS/nanobot/pull/5851 | https://github.com/HKUDS/nanobot/pull/5854
- **新增 Provider** — #5845 将 Opper 添加为内置 Gateway provider（参照 Eden AI/OrcaRouter 模式）；#5825 新增可复用的 OpenRouter JEV 客户端（Decisions 端点），可为未来心跳、shell 策略、provider 选择等功能提供基础。
  链接：https://github.com/HKUDS/nanobot/pull/5845 | https://github.com/HKUDS/nanobot/pull/5825
- **Telegram 渠道改进** — #5803 包含三项 Telegram 相关改进：富消息换行渲染（双空格）、`my` 工具暴露 `topic_id`、输入状态遵循 topic 设置。
  链接：https://github.com/HKUDS/nanobot/pull/5803

综合判断：以上功能按当前 p2 优先级批次，预计大概率进入下一版本发布。

## 7. 用户反馈摘要

今日 3 条 Issue 均无评论，但 Issue 描述本身反映了用户痛点：

- **长会话稳定性焦虑**（#5849）：用户报告自动压缩死锁，说明重度长对话用户对上下文管理机制的可靠性有较高要求，一旦触发即无法恢复，是影响信任度的严重问题。
  链接：https://github.com/HKUDS/nanobot/issues/5849
- **长会话可感知延迟**（#5843）：用户描述 BUILD 阶段“10 秒至数十秒”等待，并明确“不清楚是否符合预期”，反映长会话场景下耗时缺乏可视化和解释手段。
  链接：https://github.com/HKUDS/nanobot/issues/5843
- **移动端体验细节**（#5770）：触屏设备上无 hover 语义导致工具提示异常显示，说明移动端 PWA 使用已进入精细化打磨阶段。
  链接：https://github.com/HKUDS/nanobot/issues/5770

## 8. 待处理积压

以下长期未合并 PR 均带有 conflict 标记，建议维护者优先处理冲突并合入，以避免进一步漂移：

- **#4819**（2026-07-06，conflict）— 将 consolidation locks 从 `WeakValueDictionary` 替换为普通 `dict`，修复因 GC 导致的锁身份不稳定问题。
  链接：https://github.com/HKUDS/nanobot/pull/4819
- **#4820**（2026-07-06，conflict）— 拒绝非字符串 web fetch URL，防止缓存签名污染。
  链接：https://github.com/HKUDS/nanobot/pull/4820
- **#5412**（2026-08-17，conflict）— 将后台 gateway/API 子进程早期输出刷入日志文件，解决 Python 块缓冲导致启动消息丢失的问题。
  链接：https://github.com/HKUDS/nanobot/pull/5412
- **#5641**（2026-09-03）— iOS PWA 点击与状态栏修复（侧边栏单击、status-bar 适配），与今日关闭的 #5770 相关，建议尽快并入。
  链接：https://github.com/HKUDS/nanobot/pull/5641

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报（2026-09-22）

## 1. 今日速览
过去24小时项目保持极高度活跃：8条Issue更新（7条活跃、1条关闭）、50条PR更新（49条待合并），无新版本发布。Issues与PR高度集中在安全与架构主题，5个RFC同期在讨论周期内（#10970/#10930/#10929/#11027/#11017），另有代理凭据脱敏、依赖告警治理、工具别名规范化等多项安全修复PR排队待合并。整体状况可概括为「密集架构设计 + 安全存量清理」并行，社区参与度高；但大量 `risk:high` 标签PR积压也意味着合并决策与评审压力不小。

## 2. 版本发布
今日无新版本发布，无破坏性变更或迁移注意事项。

## 3. 项目进展
- 数据层面今日仅显示1条PR完成合并/关闭流程，具体条目未被列出，故无法作细节披露。
- 值得关注的进展是 Issue #11006（Restack #10259 onto current master）已关闭。该任务旨在将安全入站执行功能 `feat/rpc-inbound-enforcement-8289` 重新基于最新master解决冲突，关闭意味着合并障碍基本扫清，为后续合入铺平道路。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11006)
- 待合并队列中多个功能性修复在今日持续更新：
  - #11026 代理凭据从快照中脱敏（`risk:high`，安全修复）。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/11026)
  - #11025 工具别名跨文本格式统一规范化，消除XML/MiniMax/JSON路径不一致。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/11025)
  - #11032 将 `zeroclaw-channels` 的 tools 依赖改为按channel特性门控，减小非必要依赖面。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/11032)
  - #10964 ZeroCode 配置保存后避免重复请求字段列表。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10964)
- 大型安全PR #10263（主体工具选择器组合进agent会话，size:XL）今日仍保持更新，推进已超过一个月，是当前最值得关注的长线合入项。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10263)

## 4. 社区热点
- **#9899**（6条评论，P1安全追踪器）：对 `bitmaps 3.2.1`（经 matrix-sdk→imbl 引入）的豁免治理追踪。该Issue从8月10日持续至今，背后诉求是彻底移除此类不安全传递依赖、而非长期维护waiver列表；今天的 `cargo deny` 失败几乎影响所有PR。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)
- **#10970 / #10930 / #10929**（各4条评论）：分别提出宿主机级准入控制与资源上限、agent向人类提问的持久化原语、外发消息送达回执。三个RFC的共同指向是：ZeroClaw 正从单agent运行走向多agent与规模化人工协作，社区希望运行时在资源隔离、人机交互持久性与消息可靠性上具备更扎实的抽象。[查看RFC-10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) [查看RFC-10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) [查看RFC-10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929)
- **#11027**（评论2，创建当日即更新）：agent间会话消息传递与接收方自主决定权。需求场景鲜明：多会话agent需交换发现结果与协调信息，但不应合并历史或要求操作员手动复制文本，是多agent协作的真实落地诉求。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11027)

## 5. Bug 与稳定性
按严重程度排列：

- **P1 / 高危 — 依赖安全CI持续失败**（#9899）：`bitmaps 3.2.1` 经 `imbl` 进入依赖解析图，`cargo deny check` 在 `master` 及所有开放PR上失败。Issue创建已超40天，尚无根治方案。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)；缓解型PR #11038 已提交，对姊妹告警 RUSTSEC-2026-0292 做 ignore。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/11038)
- **高危 — 代理凭据泄露风险**（#11026，已有fix PR）：代理URL中的用户名/密码会出现在模型可见的诊断快照中。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/11026)
- **中危 — Anthropic 滚动缓存断点丢失**（#10895，已有fix PR）：最后一条消息以图片结尾时滚动 `cache_control` 断点未正确放置，可能造成缓存命中率下降与成本上升。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10895)
- **中危 — compatible 提供商过滤 reasoning_effort**（#10916，已有fix PR）：非OpenAI推理模型经compatible供应商转发时，配置的 `reasoning_effort` 被静默丢弃。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10916)
- **中危 — 多模态工具结果图像处理一致性**（#10903/#10904/#10953，均有fix PR）：涉及工具结果图像保活、无视觉能力错误门控、签名推理在清洗器中被破坏等问题，属同一多模态链路稳定性主题。[查看PR-10903](https://github.com/zeroclaw-labs/zeroclaw/pull/10903) [查看PR-10904](https://github.com/zeroclaw-labs/zeroclaw/pull/10904) [查看PR-10953](https://github.com/zeroclaw-labs/zeroclaw/pull/10953)
- **低危 — ZeroCode 配置保存后字段列表重复请求**（#10964，已有fix PR）。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10964)

## 6. 功能请求与路线图信号
- **已接受特性**：#10826「ZeroCode 会话根目录显式化并保留恢复根」（`status:accepted`，follow-up）。属于 ZeroCode 终端用户高频场景的确定性改进，预计将纳入后续版本。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10826)
- **设计讨论中的RFC（潜在路线图）**：
  - #10970 宿主机级准入控制与per-agent资源上限：为「单机跑大量agent」提供稳定性保障，规模化的基础设施能力。[查看RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)
  - #10930 将SOP审批门的持久化机制泛化为「agent问人」的统一原语，有望统一多处重复实现。[查看RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/10930)
  - #10929 外发消息送达回执：为消息引入标识与投递确认，补足多渠道运营的消息可靠性。[查看RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/10929)
  - #11027 agent间会话消息传递：多agent协作的关键路径能力。[查看RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/11027)
  - #11017 保留适用review并简化快速合并决策：治理流程优化，回应 #10677 实行后的评审冗余问题。[查看RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/11017)
- **实现层信号**：#10956（跨平台默认shell探测，Windows/macOS/Linux路径统一）[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10956) 与 #10990（llm_request 事件增加系统/工具前缀指纹）[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10990)，分别对应工具链体验与可观测性两个方向的持续投入。

## 7. 用户反馈摘要
以下内容提炼自各Issue/PR摘要中的问题描述与讨论主题，呈现真实用户痛点：

- **安全CI红灯是全流程痛点**：#9899的摘要明确指出 `cargo deny check` 在master和每个开放PR上失败，且已有P1追踪器持续一个多月未根治；这会直接影响所有贡献者的CI体验。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)
- **消息送达不可知**：#10929的问题描述坦诚指出「ZeroClaw中没有任何机制能判断agent发给人类的消息是否真正到达」，外发消息连标识都没有，多渠道运营下形成盲区。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10929)
- **会话恢复的目录保持**：#10826指出#10565虽修复了即时启动目录问题，但恢复ZeroCode会话时保存的根目录仍未被保留，说明「恢复上次工作现场」是高频率场景，细节缺失会被频繁触达。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10826)
- **多agent间希望自主交换信息**：#11027明确提出agent需要对等交换发现与协调消息，「不合并历史、不靠操作员复制粘贴」是明确诉求，现有代码对此缺少支撑。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11027)
- **SOP审批门可复用性**：#10930反馈了一个矛盾：代码库中已有正确的「agent问人并持久等待」实现（SOP审批门），但没有被其它场景使用，说明平台能力在抽象与复用层面存在不足。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10930)

## 8. 待处理积压
以下是需维护者重点关注的长期未决或阻塞项：

- **#9899（P1，已开放43天）**：安全CI根治工作悬置过久。当前 #11038 仅是对姊妹告警做ignore缓解，#9899本身的依赖移除计划应有明确负责人与排期，不应长期停留在waiver治理层面。[查看Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)
- **#10263（开放超一个月，size:XL）**：大型安全功能PR，依赖 #10259 且等待合入，建议明确依赖链的合并计划，避免长分支持续膨胀。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10263)
- **#10861（开放8天，size:XL）**：PR风险分类器CI基础设施，目前处于report-only模式，长期未获得合并，建议确认是否还需补充评审意见。[查看PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10861)
- **多个RFC等待维护者决策**： #10970、#11027、#11017 均带 `needs-maintainer-review` 标签。RFC讨论均有实时更新，建议在讨论热度消退前组织评审并给出结论。[查看RFC-10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) [查看RFC-11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) [查看RFC-11017](https://github.com/zeroclaw-labs/zeroclaw/issues/11017)
- **#10956（跨平台shell探测）与 #11038（RUSTSEC ignore）**：二者均带 `needs-maintainer-review`，均属于已完成的修复/增强但未被合入，建议优先review以免阻塞后续工作。[查看PR-10956](https://github.com/zeroclaw-labs/zeroclaw/pull/10956) [查看PR-11038](https://github.com/zeroclaw-labs/zeroclaw/pull/11038)

---
*本报告由 Zeroclaw 开源项目数据分析生成，数据截至 2026-09-22。*

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报 — 2026-09-22

## 1. 今日速览

过去 24 小时项目活跃度中等偏上：3 个 Issue 有更新（2 个活跃、1 个关闭），3 个 PR 有动态（2 个待合并、1 个关闭），无新版本发布。Web UI 聊天输入卡顿问题（#3281）以 13 条评论成为社区最热话题；QQ 渠道 401 认证故障（#3365）在定位到依赖库根因后被关闭。两个功能性 PR（OAuth scope 修复、IRCv3 多行消息支持）仍在等待维护者审核，本周暂无代码合入主干。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

**无实质 PR 被合并**。今日唯一关闭的 PR 为误提交：

- **[#3384] Misplaced PR, please ignore**（@stpinkie，创建/关闭于 2026-09-21）— 由 AI 代理错误提交到本仓库的无关 PR，已关闭，无代码变更。[链接](https://github.com/sipeed/picoclaw/pull/3384)

**待合并 PR 管线（2 个，均处于 open 状态）**：

- **[#3378] fix(auth): use configured scopes instead of hardcoded default in RefreshAccessToken**（@sarff，2026-09-12 创建）— 修复 OAuth token 刷新时硬编码 scope `"openid profile email"` 覆盖用户自定义配置的问题，对使用自建 OAuth Provider 的场景有实际意义。等待审核。[链接](https://github.com/sipeed/picoclaw/pull/3378)
- **[#3354] feat(irc): assemble IRCv3 multiline messages**（@linhongyu510，2026-08-31 创建）— 为 IRC 通道增加 IRCv3 `draft/multiline` 协议支持，使长消息/多行消息作为一个整体被 PicoClaw 接收。功能已实现，等待合入。[链接](https://github.com/sipeed/picoclaw/pull/3354)

**Issue 关闭**：

- **[#3365] QQ channel 401 认证失败** — 已关闭，根因定位为 `botgo v0.2.1` 与 `resty >= v2.17` 的兼容性问题，非 PicoClaw 自身代码缺陷。详见第 5 节。[链接](https://github.com/sipeed/picoclaw/issues/3365)

**总体判断**：项目本周处于"PR 积压待审"阶段。两个功能/修复 PR 若合并，将分别带来 OAuth 配置灵活性和 IRC 多行消息支持，对自托管用户和 IRC 频道使用场景是明确的能力提升。

---

## 4. 社区热点

- **🔥 [#3281] [BUG] Web UI chat input is very laggy when history has a little bit long** — 13 条评论，2 👍
  [链接](https://github.com/sipeed/picoclaw/issues/3281)
  这是过去 24 小时讨论最活跃的 Issue，也是当前社区最集中的痛点。用户在 Web UI 中会话历史稍长后，输入框出现明显卡顿。该 Issue 自 2026-07-21 提出，至今仍有持续讨论，说明 Web 前端性能问题对日常使用体验影响显著，且社区期待修复方案。

- **💡 [#3366] [Feature] Add support for OpenAI compatible providers** — 4 条评论
  [链接](https://github.com/sipeed/picoclaw/issues/3366)
  用户希望增加"OpenAI Compatible"自定义 Provider，以接入自托管路由（如 9Router）。这反映了自托管用户对 provider 可扩展性的强烈需求，且实现路径明确（复制 OpenAI provider 改造），社区讨论热度稳定上升。

- **🐛 [#3365] [stale] QQ channel 401 认证失败（已关闭）** — 3 条评论，1 👍
  [链接](https://github.com/sipeed/picoclaw/issues/3365)
  虽然 Issue 已关闭，但其根因分析（`botgo v0.2.1` + `resty v2.17+` 不兼容）对使用 QQ 渠道的用户有重要参考价值，关闭前仍获得 1 个 👍，说明影响面不小。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 状态 | 是否有 Fix PR |
|---------|-------|------|--------------|
| 中高（影响 Web UI 核心交互） | **[#3281] Web UI 输入卡顿** — 会话历史较长时，输入框响应延迟明显，复现路径清晰（长会话 + 连续输入）。[链接](https://github.com/sipeed/picoclaw/issues/3281) | OPEN（2026-07-21 提出，63 天未关闭） | ❌ 无 |
| 中（影响 QQ 渠道接入） | **[#3365] QQ 频道 401 Authorization 格式错误** — ARM64 设备（Orange Pi 3B）+ nightly 构建环境下复现。根因已定位：`botgo v0.2.1` 与 `resty >= v2.17` 存在兼容性问题，导致鉴权参数格式错误。属于依赖冲突，非 PicoClaw 代码缺陷。[链接](https://github.com/sipeed/picoclaw/issues/3365) | CLOSED（2026-09-21 关闭） | ✅ 已在 Issue 中给出根因，关闭处理 |
| 低（流程噪音） | **[#3384] 误提交 PR** — AI 代理错误提交到本仓库，已关闭。无影响。[链接](https://github.com/sipeed/picoclaw/pull/3384) | CLOSED | — |

**稳定性评估**：无新增崩溃类或数据丢失类严重 Bug；#3365 的关闭是积极信号，确认问题不在项目自身代码。但 #3281 已持续两个多月无修复 PR，Web UI 性能问题需要维护者关注。

---

## 6. 功能请求与路线图信号

- **OpenAI 兼容 Provider 支持（#3366）** — 用户明确要求增加"OpenAI Compatible"自定义 Provider，用于接入自托管路由。考虑到 PicoClaw 已有 OpenAI 官方 provider，实现成本低（复制改造），且能覆盖大量自托管用户（9Router、one-api、new-api 等），**有较大概率纳入下一个版本**。[链接](https://github.com/sipeed/picoclaw/issues/3366)

- **IRCv3 多行消息支持（#3354）** — 功能代码已完成，等待合入。合入后 PicoClaw 的 IRC 通道将支持 `draft/multiline` 协议，长消息不再被拆分，提升 IRC 渠道的信息完整性。**这是当前最接近进入主线的功能**。[链接](https://github.com/sipeed/picoclaw/pull/3354)

- **OAuth Scope 可配置化（#3378）** — 修复 token 刷新时 scope 被硬编码覆盖的问题。该 PR 是 Bug 修复，但同时也为接入更多 OAuth Provider 扫清障碍，与 #3366 的诉求在方向上一脉相承（都是增强第三方服务接入灵活性）。**建议与 #3366 一并评估**。[链接](https://github.com/sipeed/picoclaw/pull/3378)

**路线图信号**：社区对"接入任意 OpenAI 兼容服务"的诉求明显，叠加 OAuth 配置修复，PicoClaw 正在向"开放生态、自定义接入"方向积累需求。这两个 PR/Issue 若落地，将显著增强项目的可扩展性。

---

## 7. 用户反馈摘要

- **Web UI 性能是最大痛点**（来自 #3281）：
  > 用户 @xpader 反馈：在单会话中积累较多聊天历史后，输入框打字变得 "very laggy"。这是影响日常高频操作的体验问题，13 条评论中社区用户在讨论是否与前端渲染历史消息的方式有关，部分用户建议虚拟滚动或懒加载。[链接](https://github.com/sipeed/picoclaw/issues/3281)

- **自托管用户对 provider 可扩展性的期待**（来自 #3366）：
  > 用户 @ItachiSan 表示希望接入自托管路由器（如 9Router），诉求是 "add a custom provider, named OpenAI Compatible"。这类用户通常不愿被锁定在特定云服务商，PicoClaw 若支持自定义 OpenAI 兼容端点，将覆盖更广泛的自部署场景。[链接](https://github.com/sipeed/picoclaw/issues/3366)

- **依赖版本管理敏感**（来自 #3365）：
  > 用户 @crazysarah 在 ARM64 设备 + nightly 构建下遇到 QQ 渠道 401，最终定位是 `resty` 间接依赖升到 v2.17+ 后与 `botgo` 不兼容。这提示 nighty 构建的用户对依赖锁定敏感，也侧面反映 QQ 渠道的测试覆盖需要加强。[链接](https://github.com/sipeed/picoclaw/issues/3365)

---

## 8. 待处理积压

以下 Issue/PR 长期未获响应或审核，提醒维护者关注：

1. **[#3281] Web UI 输入卡顿** — OPEN 63 天，13 条评论，无 fix PR。社区持续关注，需要维护者给出响应（修复计划或 workaround）。[链接](https://github.com/sipeed/picoclaw/issues/3281)

2. **[#3354] feat(irc): IRCv3 multiline 支持** — PR 创建于 2026-08-31，已等待 22 天，无维护者评论。功能代码完成度较高（已说明协议依赖处理方式），建议尽快 review，避免与主线产生冲突。[链接](https://github.com/sipeed/picoclaw/pull/3354)

3. **[#3378] fix(auth): OAuth scope 配置修复** — PR 创建于 2026-09-12，已等待 10 天。修复逻辑清晰（将硬编码 scope 替换为配置值），风险低，建议优先合入。[链接](https://github.com/sipeed/picoclaw/pull/3378)

4. **[#3366] OpenAI 兼容 Provider 功能请求** — OPEN 18 天，4 条评论。需求明确、实现路径清晰（复制 OpenAI provider 改造），若纳入路线图，建议在下一个版本中给出回应（实现或排期说明）。[链接](https://github.com/sipeed/picoclaw/issues/3366)

---

**项目健康度总结**：项目无严重崩溃类问题，Bug 响应整体可控；社区讨论活跃但存在积压（尤其 #3281 性能问题）。当前最大瓶颈是 PR review 效率——两个高质量 PR（#3354、#3378）等待合入时间较长，建议维护团队在下一个工作周期优先处理，以维持社区贡献者积极性。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-22

## 1. 今日速览

过去 24 小时 NanoClaw 项目整体活跃度中等偏低。Issue 侧仅新增 1 条（#3860），无新开讨论热点；PR 侧共 7 条更新，其中仅 1 条被合并/关闭（#2689），其余 6 条均为存量 PR 的持续更新或待合并状态。无新版本发布。值得关注的是，多条 8 月中旬创建的 PR（#3286、#3273、#3311、#3420）仍在等待合并，PR 积压趋势值得注意；Signal 渠道相关的修复（#3837、#2689）是本日合并与更新的重点方向。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

本日合并/关闭 1 个 PR，是 Signal 适配器的重要修复：

- **[PR #2689] fix(signal): DM platform ID consistency, isMention, and ask_question/approval delivery**（已关闭/合并，作者 @klingel，更新于 2026-09-21）
  https://github.com/nanocoai/nanoclaw/pull/2689

  该 PR 修复了三个 Signal 渠道核心问题：一是 Signal 私聊（DM）未设置 `isMention: true`，导致首条消息被静默丢弃且群组无法被自动注册；二是 DM platform ID 增加 `signal:` 前缀以保证平台 ID 一致性；三是修复了 `ask_question`/审批消息的投递路径。这些修复对 Signal 渠道的可用性至关重要，意味着 Signal 私聊场景从"可能丢消息"走向"可正常路由"。

  此外，[PR #3837]（Signal 渠道附件、DM 路由与出站队列的整合修复）与 [PR #3859]（WhatsApp 群组名称解析）均在今日有更新，虽然没有合并，但说明渠道层的多项修复正在持续推进中。

## 4. 社区热点

今日数据中未出现评论数极高的热门讨论，但以下条目相对值得关注：

- **[Issue #3860] restart.sh: FORCE_COLOR makes the restart timestamp unparseable (Invalid restart time)**（新开，0 评论）
  https://github.com/nanocoai/nanoclaw/issues/3860

  这是今日唯一新开的 Issue，虽然暂无评论，但它直指 `setup/lib/restart.sh` 在 pnpm `FORCE_COLOR=1` 环境下，`Date.now()` 输出被 ANSI 颜色码污染，导致重启时间戳无法被解析。该问题直接影响安装/重启脚本的可用性，预计会吸引使用 pnpm 的开发者关注。

- **[PR #3837] fix(signal): consolidate attachment, DM-routing, and outbound-queue fixes**（更新于 2026-09-21）
  https://github.com/nanocoai/nanoclaw/pull/3837

  该 PR 合并了两条陈旧 PR 的 Signal 适配器修复，覆盖附件类型统一落盘与转发、DM 路由等，是 Signal 渠道近期最集中的修复补丁，社区关注度较高。

## 5. Bug 与稳定性

今日仅报告 1 个新 Bug，无崩溃或严重回归问题。

**中等问题：**

- **[Issue #3860] restart.sh: FORCE_COLOR 导致重启时间戳不可解析（Invalid restart time）**
  作者 @witek | 创建于 2026-09-21 | 0 评论
  https://github.com/nanocoai/nanoclaw/issues/3860

  问题描述：`setup/lib/restart.sh` 使用 `node -e 'console.log(Date.now())'` 生成时间戳，而 pnpm 会向其子进程注入 `FORCE_COLOR=1` 环境变量，Node.js 在打印数字时会被 ANSI 颜色码包裹，导致时间戳无法被 `date` 等工具解析。影响范围是使用 pnpm 执行 `restart.sh` 的用户，脚本会因无效时间戳报错。

  当前状态：**尚无对应的 fix PR**。该问题属于脚本健壮性缺陷，修复难度不高（可通过 `process.env.FORCE_COLOR=0` 或在输出时禁用颜色解决），建议维护者尽快响应。

## 6. 功能请求与路线图信号

今日无新建功能请求。结合待合并 PR 的内容，以下方向可能进入下一版本：

- **多发行版 Linux 安装支持**：[PR #3273] 修复 `install-node.sh` 在 Fedora/RHEL/CentOS/openSUSE/Arch/Alpine 等非 Debian 发行版上的安装失败问题（Closes #2462），有望提升项目在更广泛 Linux 环境中的安装成功率。
  https://github.com/nanocoai/nanoclaw/pull/3273

- **Agent 重启性能优化**：[PR #3286] 在 `ncl groups restart --rebuild` 时，若未配置任何 `packages_apt`/`packages_npm`，跳过无意义的 Docker 镜像重建（Fixes #2701），减少不必要的构建时间。
  https://github.com/nanocoai/nanoclaw/pull/3286

- **定时任务错误路由修复**：[PR #3311] 将定时任务执行失败的错误消息正确路由给操作者（operator），而非直接写入 `chat` 消息（Fixes #3223），属于 Agent 可观测性的重要改进。
  https://github.com/nanocoai/nanoclaw/pull/3311

- **macOS 状态栏适配**：[PR #3420] 修复 macOS 状态栏 Swift 代码与 plist 标签对 `com.nanoclaw-v2-<installSlug>` 新命名规则不兼容的问题，保证安装 slug 化后状态栏功能正常。
  https://github.com/nanocoai/nanoclaw/pull/3420

- **WhatsApp 群组名称展示**：[PR #3859] 为新注册的 WhatsApp 群组提供名称解析（而非默认显示"a whatsapp channel"），提升审批卡片的信息可读性。
  https://github.com/nanocoai/nanoclaw/pull/3859

以上 PR 中，#3286 与 #3273 已等待超过一个月，若维护者确认无问题，有望在后续版本中合并。

## 7. 用户反馈摘要

今日数据中没有包含多条用户评论的 Issue 讨论，仅可从新 Issue #3860 的提交内容提炼用户痛点：

- **环境兼容性痛点**：用户 @witek 在 pnpm 环境下运行 `restart.sh` 时遇到时间戳解析失败，说明安装脚本对不同的包管理器/环境变量配置不够健壮。`FORCE_COLOR` 是 pnpm 的默认行为，项目脚本未考虑到这一环境差异。该问题虽小，但会直接阻断重启流程，影响部署体验。
  https://github.com/nanocoai/nanoclaw/issues/3860

- **渠道适配反馈（来自 PR）**：Signal 与 WhatsApp 相关的 PR 均来自社区贡献者，说明跨平台渠道的适配需求持续存在，用户对多渠道消息路由的一致性和名称可读性有较高期待。

## 8. 待处理积压

以下 PR/Issue 长期未合并或未响应，建议维护者关注：

| 条目 | 类型 | 创建/最后更新 | 等待时长 | 说明 |
|------|------|--------------|---------|------|
| [#3286] Skip image rebuild in restart when no packages configured | PR | 创建 08-17，更新 09-21 | 36 天 | 修复 #2701，提升重启效率，改动应用较小 |
| [#3273] fix(setup): detect package manager in install-node.sh | PR | 创建 08-16，更新 09-21 | 37 天 | 解决非 Debian 发行版安装失败（#2462），影响安装覆盖面 |
| [#3311] fix(agent-runner): route scheduled-task errors to the operator | PR | 创建 08-18，更新 09-21 | 35 天 | 定时任务错误可观测性修复，关联 #3223 |
| [#3420] fix(add-macos-statusbar): make Swift code and plist labels slug-aware | PR | 创建 08-20，更新 09-21 | 33 天 | macOS 状态栏与新版安装命名不兼容的问题 |

https://github.com/nanocoai/nanoclaw/pull/3286
https://github.com/nanocoai/nanoclaw/pull/3273
https://github.com/nanocoai/nanoclaw/pull/3311
https://github.com/nanocoai/nanoclaw/pull/3420

以上 4 个 PR 均已等待超过一个月，且都带有明确的 issue 关联和清晰的修复说明，长期滞留会增加合并成本与社区贡献者的挫败感。建议维护者安排 review 优先级，尽快处理这批积压 PR。

---

*本报告基于 2026-09-22 获取的 GitHub 数据自动生成，仅供项目健康度参考。*

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报 — 2026-09-22

## 1. 今日速览

过去 24 小时 IronClaw 项目整体活跃度较低：新增 1 个 issue（自动化失败分类报告）、合并/关闭 1 个发布相关 PR，无新版本正式发布。虽然事件数量不多，但发布流程正在有序推进（1.4.1-rc.1 切割），且每日失败跟踪机制持续运行，说明项目维护节奏稳定。综合来看，当前项目健康度良好，处于发布前准备阶段，社区讨论热度暂时不高。

## 2. 版本发布

无新版本正式发布。值得注意的是，今日合并的 PR #8105 为 1.4.1-rc.1 发布候选版本切割，但尚未在 GitHub Releases 中出现正式 release。

## 3. 项目进展

今日唯一合并/关闭的 PR 为发布流程相关：

- **PR #8105**（已合并/关闭）— `chore(release): cut 1.4.1-rc.1`
  - 链接：https://github.com/nearai/ironclaw/pull/8105
  - 内容：将 `ironclaw` 包版本升至 `1.4.1-rc.1`，以便后续 `cut_ironclaw_release` 工作流在合并提交上正确打 tag。此举消除了版本清单与实际 tag 不一致导致发布失败的风险。
  - 意义：为 1.4.1 版本正式发布铺平道路，预计该版本将包含若干修复或改进，但具体变更内容需待正式 release notes 披露。

## 4. 社区热点

今日无高互动、高评论量的 issue 或 PR。新开的 issue #8106 和已关闭的 PR #8105 均无评论和点赞，讨论热度为零。这属于正常波动，尤其是在自动化流程主导的日常维护场景下。社区观察重点可放在后续版本发布后的用户反馈上。

## 5. Bug 与稳定性

今日没有直接报告新的代码 bug、崩溃或回归问题。但新 issue #8106 提供了重要的稳定性/质量信号：

- **Issue #8106**（打开）— `Daily ironclaw failure taxonomy — 2026-09-21`
  - 链接：https://github.com/nearai/ironclaw/issues/8106
  - 摘要：分析了 `officeqa` 套件中的 47 个非通过任务，指出绝大多数是模型本身的质量问题，例如 DeepSeek-V4-Flash 在导航任务上的表现不佳（原文截断）。该 issue 属于每日自动化失败分类，用于监控评估基准的稳定性。
  - 严重程度：低至中。这不是代码缺陷，而是模型能力问题，可能影响 benchmark 指标，但不会直接破坏 IronClaw 运行时。

目前未见针对这些失败的 fix PR 或关联修复。

## 6. 功能请求与路线图信号

今日没有收到明确的新功能请求或用户建议。从 PR #8105 发布候选版本的动作来看，1.4.1 是一个补丁级更新，预计以 bug 修复和稳定性提升为主。此外，持续存在的每日失败分类 issue 表明项目团队正在系统性地关注 benchmark 质量，未来可能投入资源优化模型评估流程，但不属于用户功能需求。

## 7. 用户反馈摘要

今日 issue/PR 评论均为 0，没有从用户侧收集到直接反馈。唯一可用的间接反馈来自 #8106 中的自动化分析：它反映了使用 DeepSeek-V4-Flash 模型执行 officeqa 任务时，有 47 个非通过项，其中大部分是模型真实能力不足，而非工具链问题。这可以理解为对“模型选择与任务适配”的潜在警示，但并非用户发起的反馈。

## 8. 待处理积压

当前没有发现长期未响应的重要 issue 或 PR。所有相关条目均已在 24 小时内更新或处理完毕，积压情况良好。

---

**总结**：IronClaw 项目今日处于发布准备阶段，核心动作是完成 1.4.1-rc.1 版本切割，同时持续运行每日失败分类监控。虽无重大功能进展和社区互动，但流程规范、无严重 bug 积压，项目健康度稳健。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报（2026-09-22）

## 1. 今日速览

过去 24 小时项目活跃度较高，共产生 17 条 PR 更新（15 条已合并/关闭、2 条待合并），以及 2 条 Issue 更新（1 条新功能请求、1 条历史 bug 被刷新）。今日工作重心集中在 OpenClaw 网关稳定性与升级恢复上，多个严重启动失败、Windows 网关重启卡死、旧数据迁移阻塞问题均在一日内集中修复并合入。Issue 侧出现一条高价值功能请求（#2738），直指"重启网关耗时超 10 秒"的体验痛点；同时三条长期搁置的功能性 PR（#998、#999、#1067）被 stale 机制正式关闭，积压清理节奏加快。整体来看，项目处于"稳定性打磨 + 积压清理 + 新功能探索"并行的阶段，无新版本发布。

## 2. 版本发布

无。

## 3. 项目进展

今日合并/关闭的 15 条 PR 中，绝大多数属于 **OpenClaw 网关稳定性修复**，这是当前项目修复的主轴。按主题归类如下：

**A. 网关启动失败与旧数据迁移（今日重点）**

- [#2719 fix(openclaw): repair leftovers from older builds at startup instead of failing every launch](https://github.com/netease-youdao/LobsterAI/pull/2719)：修复升级旧版数据（含 Windows 卸载重装后保留 `%APPDATA%` 的场景）导致每次启动均失败的问题，覆盖三处独立根因。
- [#2735 fix(openclaw): avoid startup failure on legacy identity conflicts](https://github.com/netease-youdao/LobsterAI/pull/2735)：解决 SQLite 设备身份与旧版 `identity/device.json` 冲突时的启动失败，迁移逻辑统一遵循"保留 SQLite 身份"的权威规则。
- [#2734 fix(openclaw): migrate legacy weixin allowFrom files blocking gateway startup](https://github.com/netease-youdao/LobsterAI/pull/2734)：自动迁移旧版微信 `allowFrom.json` 白名单到频道配置，消除 OpenClaw 2026.8.1 拒绝就绪的阻塞点。
- [#2729 fix(openclaw): recover Windows gateway exits and repair startup](https://github.com/netease-youdao/LobsterAI/pull/2729)：修复 Windows 下网关进程 SIGKILL 后未确认退出导致重启失败的问题，另修复两个一键修复阻塞项。
- [#2728 fix: openclaw sqlite readonly result file](https://github.com/netease-youdao/LobsterAI/pull/2728)：修复 OpenClaw SQLite 结果文件只读问题（由标题推断，详情待补）。
- [#2731 fix(plugins): complete nsp-clawguard ESM startup context](https://github.com/netease-youdao/LobsterAI/pull/2731)：补齐 `nsp-clawguard` 在原生 ESM 加载时缺失的 `__dirname`/`__filename`，修复网关 ready 后反复重启的崩溃。

**B. IM 与消息链路**

- [#2737 fix(im): restore native scheduled tasks and Feishu delivery](https://github.com/netease-youdao/LobsterAI/pull/2737)：恢复 IM 场景下"两分钟后提醒我喝水"等原生定时任务能力，并保留发起方飞书账号以完成提醒投递。

**C. 桌面端与渲染进程**

- [#2736 feat(browserCredentials): request OS secure storage access explicitly](https://github.com/netease-youdao/LobsterAI/pull/2736)：浏览器凭据存储改为用户显式选择后才访问系统钥匙串，避免每次可用性检查都触发权限验证。
- [#2730 feat(updater): support optional targeted update candidates](https://github.com/netease-youdao/LobsterAI/pull/2730)：为特定登录会话提供可选的定向更新候选版本，不影响常规更新检查。

**D. 开发体验与测试修复**

- [#2704 test: resolve macOS tmpdir symlinks in path assertions](https://github.com/netease-youdao/LobsterAI/pull/2704) 与 [#2733 PR-2704](https://github.com/netease-youdao/LobsterAI/pull/2733)：修复 macOS 本地测试因 `/var` 符号链接导致路径断言失败的问题，统一 Linux CI / macOS 行为。其中 #2733 是 #2704 的等价提交，属重复合入。

整体判断：这批修复显著降低了 OpenClaw 网关在**升级、Windows、macOS、插件上下文**四个高风险场景下的故障率，项目正朝稳定版方向收敛。

## 4. 社区热点

今日社区讨论焦点集中在两条 Issue 上：

- [#2738 [Feature] 支持不重启网关切换工作区，解决网关重启耗时问题](https://github.com/netease-youdao/LobsterAI/issues/2738)：用户明确表达了"网关启动耗时超过 10 秒、频繁切换体验差"的痛点，诉求是实现在不重启网关的前提下切换工作区。这是典型的"高频操作 + 长耗时阻塞"组合，在性能有限的设备上尤其突出，预计会成为后续版本能力的重要参考。评论数：1。

- [#989 [stale] Tavily mcp 不可用](https://github.com/netease-youdao/LobsterAI/issues/989)：该问题已存在近 6 个月，今日被 stale 机制滚动更新。用户报告"报错 401 未授权，api-key 已配置"，说明 Tavily MCP 的鉴权链路或密钥传递存在缺陷，且长期未得到修复。评论数：1。

从反馈结构看，用户一方面在追求"更少重启、更顺畅切换"的交互效率，另一方面希望官方 MCP 集成开箱即用——两者都指向"可靠性优先"的诉求。

## 5. Bug 与稳定性

按严重程度排列今日涉及的 Bug/稳定性问题：

| 严重度 | 问题描述 | 状态 | 对应修复 |
|---|---|---|---|
| 🔴 高 | 升级旧版数据后网关每次启动即失败（含 Windows 重装保留旧配置场景） | 已修复（今日合并） | [#2719](https://github.com/netease-youdao/LobsterAI/pull/2719) |
| 🔴 高 | SQLite 设备身份与旧版 `identity/device.json` 冲突导致网关无法启动 | 已修复（今日合并） | [#2735](https://github.com/netease-youdao/LobsterAI/pull/2735) |
| 🔴 高 | 旧版微信 `allowFrom.json` 残留导致网关拒绝就绪，且重启/Quick Repair 均无法清除 | 已修复（今日合并） | [#2734](https://github.com/netease-youdao/LobsterAI/pull/2734) |
| 🟠 中 | Windows 下网关进程 SIGKILL 后未确认退出，重启与一键修复卡死 | 已修复（今日合并） | [#2729](https://github.com/netease-youdao/LobsterAI/pull/2729) |
| 🟠 中 | nsp-clawguard 2.5.0 在 ESM 模式下因缺失 `__dirname` 导致网关反复重启 | 已修复（今日合并） | [#2731](https://github.com/netease-youdao/LobsterAI/pull/2731) |
| 🟠 中 | OpenClaw SQLite 结果文件只读，可能阻塞结果写入 | 已修复（今日合并） | [#2728](https://github.com/netease-youdao/LobsterAI/pull/2728) |
| 🟠 中 | Tavily MCP 返回 401 Unauthorized（api-key 已配置） | 未修复，Issue 仍开放 | 暂无对应 PR |
| 🟡 低 | macOS 本地测试因 tmpdir 符号链接（`/var` → `/private/var`）导致 4 个测试文件失败 | 已修复（今日合并） | [#2704](https://github.com/netease-youdao/LobsterAI/pull/2704) |

值得肯定的是，今日报告/暴露的多数高优 Bug 均已合入修复，体现了较强的 bug 响应速度。

## 6. 功能请求与路线图信号

- **不重启网关切换工作区（#2738）**：这是今日最明确的新功能需求。与当前大量网关稳定性修复工作形成呼应——如果启动耗时无法进一步压缩，提供"热切换"机制将是更彻底的解决方案。目前暂无关联 PR，建议维护者评估可行性并纳入路线图。

- **无密钥 Parallel Web 搜索（#2739，PR 待合并）**：在捆绑的 web-search skill 中为 Parallel 提供显式引擎支持，用户无需 Parallel 账户/API key/浏览器连接即可运行搜索，匿名访问使用 Fast 模式并受速率限制。该 PR 若合入，将降低搜索功能的使用门槛，对倾向本地/轻量配置的用户有吸引力。

- **定向更新候选版本（#2730，已合并）**：该能力为"向特定会话推送定向更新"铺平了道路，未来可用于灰度发布或定向修复通道，属于基础架构层面的前瞻性设计。

- **被关闭的功能性 PR 信号**：选中文本浮动工具栏（#998）、Cmd+K 命令面板（#999）、停止自动创建 `[OpenClaw]` 会话（#1067）均因 stale 关闭。这三项均为社区开发者贡献的真实功能改造，虽然本次未合入，但其描述反映的用户需求（文本操作效率、键盘流操作、会话清理）仍值得维护者保留记录，后续可能以其他形式回归。

## 7. 用户反馈摘要

来自今日活跃 Issue 的真实用户声音：

- **#2738**："本机性能有限，网关启动耗时超过 10 秒，频繁切换体验较差。"——用户设备性能一般，工作区切换是高频操作，10 秒级阻塞已构成实际工作流障碍。用户期望的是"不重启网关"的切换方式，隐含对网关启动耗时和架构设计两方面的不满。

- **#989**："报错 401 未授权，api-key 已配置。"——用户在**已经正确配置 api-key** 的前提下仍无法使用 Tavily MCP，表明该集成的鉴权链路存在缺陷，且问题持续了约 6 个月。这种"配置正确却不可用"的反馈对产品信任度伤害较大，建议优先定位。

## 8. 待处理积压

- **#1277（dependabot PR：electron 43.5.0 → 44.4.2 升级）**：[链接](https://github.com/netease-youdao/LobsterAI/pull/1277)。创建于 2026-04-02，已开放近 6 个月，今日仍在更新。Electron 跨大版本升级涉及破坏性变更，建议维护者明确给出合入/关闭的决策和预期时间，避免长期悬挂。

- **#989（Tavily MCP 401 问题）**：[链接](https://github.com/netease-youdao/LobsterAI/issues/989)。2026-03-27 创建，今日被 stale 机制滚动。长期无修复 PR 且无官方回复，建议至少给出临时规避方案或明确支持状态。

- **已过 stale 关闭待定性**：[#998](https://github.com/netease-youdao/LobsterAI/pull/998)、[#999](https://github.com/netease-youdao/LobsterAI/pull/999)、[#1067](https://github.com/netease-youdao/LobsterAI/pull/1067) 三条功能 PR 已于今日关闭。如果维护者认可其价值，可主动 reopen 或在新版本中吸收；否则建议记录到 roadmap backlog，避免社区贡献者产生"投入被浪费"的观感。

---

**日报总结**：LobsterAI 今日展现出较强的修复执行力，OpenClaw 网关的大量启动/迁移/平台兼容问题在一日内集中解决，项目健康度整体良好。社区侧的需求信号（热切换工作区、MCP 集成可靠性）与维护侧的重心（网关稳定性）之间存在明显交集，若能顺势将「减少重启、平滑迁移」作为下一阶段的用户侧主线，有望显著提升终端体验。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报 — 2026-09-22

## 1. 今日速览

过去24小时内，Moltis 项目保持活跃迭代状态，提交 `2` 条新 Issue（其中 `1` 条被关闭）与 `2` 个待合并 PR，未产生新版本发布。今日核心焦点集中在 **VoxCPM 作为本地 TTS 提供商的集成**（新开 Issue #1282 及对应 PR #1283），以及 **tools 预设工具行为修复**（PR #1280）两个方向。社区参与者（@Caldalis、@mikemikimike）贡献明确，项目维护者介入情况暂未在数据中体现。综合 issue/PR 活跃度评估，项目当前处于 **正常迭代状态**，但需关注重复提交与测试覆盖问题（详见下文分析）。

## 2. 版本发布

今日无新版本发布。Moltis 项目官方尚未发布 Release，版本演进信号暂缺，建议关注后续合并 PR 后是否触发版本更新（如 v0.x.x）。

## 3. 项目进展

今日 **无 PR 被合并或关闭**，全部 `2` 个 PR 均处于待审查/待合并状态。尽管如此，这两个 PR 均指向明确的功能或修复目标，若被合并将推动项目在以下两个方向前进：

- **[PR #1283]** **添加 VoxCPM 作为本地 TTS 提供商**：通过 vLLM-Omni 的 OpenAI 兼容语音 API 接入 VoxCPM（Apache-2.0, 2B 参数, 支持 30 种语言, 48kHz），有望补齐 `voice personas` 本地实现能力，并完善文档中 Provider Support 表。
- **[PR #1280]** **修复 active_tools 为空数组时预设工具丢失的问题**：对应 Issue #1277 的修复，使显式空 `active_tools` 数组不再作为临时覆盖值，从而保留预设工具控制逻辑，提升 tools 系统的可预期性。

整体来看，若这两项被合并，Moltis 将在 **语音本地化支持** 和 **工具系统稳定性** 两个维度获得增量改进，但当前尚处于 PR 审查阶段，尚未真正落地。

## 4. 社区热点

今日社区最活跃的贡献者集中在 @Caldalis 身上，其连续提交了两个几乎同内容的 Issue（#1281 被关闭，#1282 仍开放）和一个对应 PR（#1283）：

- **Issue #1282（开放）**：[VoxCPM as a local TTS provider](https://github.com/moltis-org/moltis/issues/1282)
- **Issue #1281（已关闭）**：[VoxCPM as a local TTS provider](https://github.com/moltis-org/moltis/issues/1281) （可能因重复提交被关闭）
- **PR #1283**：[feat(voice): add VoxCPM as a local TTS provider](https://github.com/moltis-org/moltis/pull/1283)

**背后的诉求**：Issue 明确指出 `docs/src/voice.md` 中的 Provider Support 表格显示 **Voice personas 目前没有任何本地实现**，而 VoxCPM 作为开源、多语言、高采样率的 TTS 模型（Apache-2.0, 2B, 30 languages, 48 kHz）是一个合适的候选。这反映出社区用户对 **隐私保护、离线能力、本地化语音体验** 的切实需求，已从功能请求推进到具体 PR 实现阶段。建议维护者关注该 PR 的技术方案（vLLM-Omni 依赖、推理资源要求）并评估集成优先级。

## 5. Bug 与稳定性

今日未直接提交新 Bug Issue，但存在一个已在 PR 中被修复的稳定性问题：

- **修复：active_tools 空数组误覆盖预设工具配置**（对应 Issue #1277，PR #1280）
  - **影响范围**：用户显式传入 `active_tools: []` 时，会意外清空预设工具列表，导致动态工具调用行为与预期不符。
  - **严重程度**：中等（不影响系统稳定，但破坏用户配置语义，易造成动态工具调用失败或行为跳变）。
  - **对应 PR**：[fix(tools): preserve preset tools for empty active_tools](https://github.com/moltis-org/moltis/pull/1280) —— 该 PR 将显式空数组视为“无单轮覆盖”，从而保留预设。同时保证非空工具列表仍受预设 allow/deny 策略约束。

## 6. 功能请求与路线图信号

今日明确出现的功能请求：

- **[Feature] VoxCPM 作为本地 TTS 提供商**（Issue #1282）
  - 已有对应 PR（#1283）提出实现方案，这表明该功能已进入实质开发阶段，**有较大概率被纳入下一版本**。若实现，Moltis 的 Voice personas 将获得第一个完整本地 TTS 后端，路线图上“本地语音”可能会从“不支持”改为“支持（VoxCPM）”。

- **潜在信号**：文档 `docs/src/voice.md` 中 “Provider Support table” 并未列出本地 TTS 列，当前实现为空白。后续可能带动更多本地 TTS 方案的接入（如 Coqui TTS、Piper），建议在架构上预留 Provider 抽象。

## 7. 用户反馈摘要

今日数据中未产生评论内容，但可以从 Issue 描述中提炼以下用户侧反馈：

- **真实痛点**：Voice personas 目前无法在本地运行，用户只能依赖云端 TTS 方案（或完全没有方案），存在隐私泄漏风险、网络依赖、单点故障等问题。
- **使用场景**：文档中明确引用了官方 `docs/src/voice.md` 的表格来论证缺口，说明用户是深度阅读官方文档并基于使用说明提出诉求，反馈质量较高。
- **满意度**：暂无明确好评或抱怨，但用户主动完成了从“提出问题”到“提交 PR”的完整贡献路径，侧面反映其对项目改进意愿强，属于社区中的高价值贡献者。

> 注：当日 `issues` 和 `PR` 均无评论，因此无法获取更深层的用户讨论内容。

## 8. 待处理积压

以下 PR 当前处于待审查（Pending Review）状态，需维护者尽快纳入排期：

| 项目 | 类型 | 创建时间 | 状态 | 备注 |
|------|------|----------|------|------|
| [PR #1280](https://github.com/moltis-org/moltis/pull/1280) | 代码修复 | 2026-09-21 | OPEN, 待合并 | 修复已完成的工具控制问题，代码变更范围明确，建议尽快 review |
| [PR #1283](https://github.com/moltis-org/moltis/pull/1283) | 新功能 | 2026-09-21 | OPEN, 待合并 | 涉及新依赖与文档更新，需权衡本地运行成本与收益 |

**额外警示**：Issue #1281 被关闭，但其替代 Issue #1282 仍开放，且两者标题与内容完全重复。建议维护者在关闭重复 Issue 时，**保留清晰指引**（如评论原因并重定向到保留 Issue），以减少贡献者困惑，保持 Issue 追踪整洁。

---

**总结**：Moltis 项目今日处于“功能开发 + 存量修复”的正常迭代节奏。VoxCPM 本地 TTS 集成是一条强有力的潜在功能线，而 PR #1280 是典型的正确性修复。项目健康度整体良好，但 PR 审查速度与重复 Issue 管理是两个值得关注的流程优化点。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报（2026-09-22）

> 数据源仓库显示为 `agentscope-ai/QwenPaw`（CoPaw）。过去 24 小时数据：Issue 更新 17 条，PR 更新 33 条，无新版本发布。

## 1. 今日速览

过去 24 小时项目活跃度较高：17 条 Issue 更新（9 条新开/活跃、8 条关闭），33 条 PR 更新（17 条待合并、16 条已合并/关闭）。虽无新版本发布，但合并了模型提供者层统一、DoomLoop 误终止修复、Responses API 非严格模式等关键 PR，并新增 2720 个测试用例，覆盖率提升至 73.79%。社区反馈集中在安全问题（prompt injection）、兼容性回归（DeepSeek 400）和 UI 启动体验；整体看项目处于密集修复与功能整合阶段，健康度良好，但安全类 Issue 仍需优先关注。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日关闭/合并的 PR 中，以下几个对项目推进较为关键：

- **模型提供者层统一** [#7899](https://github.com/agentscope-ai/QwenPaw/pull/7899)（已关闭）：统一模型发现、定价、选择与思考控制逻辑，减少手动配置，为多模型 Fallback 等能力奠定基础。
- **修复 DoomLoop 误终止** [#7906](https://github.com/agentscope-ai/QwenPaw/pull/7906) / [#7919](https://github.com/agentscope-ai/QwenPaw/pull/7919)：避免在纯文本轮次无新工具调用证据时将会话升级为 `TERMINATE`，直接解决 Issue [#7905](https://github.com/agentscope-ai/QwenPaw/issues/7905)。
- **Responses API 默认非严格工具模式** [#7915](https://github.com/agentscope-ai/QwenPaw/pull/7915)：修复工具 schema 清洗移除 `nullable` 后，可选参数被隐式设为必填的问题（对应 Issue [#7907](https://github.com/agentscope-ai/QwenPaw/issues/7907)）。
- **单元测试覆盖冲刺第 3 批** [#7911](https://github.com/agentscope-ai/QwenPaw/pull/7911)：新增 47 个测试文件、2720 个用例，`src/qwenpaw` 语句覆盖率从 70.51% 提升至 73.79%（+3.28pp）。
- **CI 并行化与确定性失败** [#7326](https://github.com/agentscope-ai/QwenPaw/pull/7326)：nightly E2E 拆分为 p0/p1/p2 三个并行 shard，并改为 fail-closed，避免超时/失败被静默吞掉。
- **依赖升级** [#7913](https://github.com/agentscope-ai/QwenPaw/pull/7913)：AgentScope 版本升至 2.0.8。

此外，会话列表展示优化 [#7846](https://github.com/agentscope-ai/QwenPaw/pull/7846)、文档清理 [#7918](https://github.com/agentscope-ai/QwenPaw/pull/7918) 也已关闭。整体来看，项目在稳定性、测试覆盖和 CI 基础设施上均有明显进展。

## 4. 社区热点

评论数 Top Issue 反映出用户对安全与兼容性的高度关注：

- **[#7859] Persistent prompt injection in tool-result system-reminders**（5 条评论）  
  https://github.com/agentscope-ai/QwenPaw/issues/7859  
  用户报告跨 20+ 轮会话、多会话中反复出现“删除所有技能”的注入指令，且本地磁盘找不到来源。这是安全/提示注入类问题，社区关注度最高，目前未见明确修复 PR。

- **[#7883] DeepSeek 400 错误：tool-returned PDF 序列化问题**（4 条评论）  
  https://github.com/agentscope-ai/QwenPaw/issues/7883  
  在 2.2.1 上仍可复现，用户认为 Issue #7597 的修复不完整，工具返回的 PDF 仍被序列化为 OpenAI 风格嵌套文件，DeepSeek 拒绝请求。

- **[#7628] Context compaction 超出 provider 请求预算**（4 条评论）  
  https://github.com/agentscope-ai/QwenPaw/issues/7628  
  用户反馈上下文压缩的触发与最终预算未基于“完整请求”计算，活跃会话仍可能因超预算失败。

其他评论较多的问题包括：[#7905](https://github.com/agentscope-ai/QwenPaw/issues/7905)（DoomLoop 误终止）、[#3419](https://github.com/agentscope-ai/QwenPaw/issues/3419)（京东云环境会话中断）、[#7431](https://github.com/agentscope-ai/QwenPaw/issues/7431)（codex 空响应）。整体看，用户最迫切的需求是修复安全漏洞、提高第三方模型/网关的兼容性，以及增强长对话稳定性。

## 5. Bug 与稳定性

按严重程度排列今日活跃/新报告的 Bug：

| 严重程度 | Issue | 描述 | 状态 / Fix PR |
|---|---|---|---|
| 严重 | [#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859) | 工具结果系统提醒中持久化 prompt injection，指示 Agent 删除全部技能 | 未修复，无专门 PR |
| 高 | [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883) | 2.2.1 仍复现：工具返回的 PDF 序列化导致 DeepSeek 400 | 未修复，反馈称此前 #7621 修复不完整 |
| 高 | [#7908](https://github.com/agentscope-ai/QwenPaw/issues/7908) | Windows 上 `execute_shell_command` 子进程的 Ctrl 事件可终止 QwenPaw 宿主进程 | 已有 Fix PR：[#7910](https://github.com/agentscope-ai/QwenPaw/pull/7910) |
| 中 | [#7841](https://github.com/agentscope-ai/QwenPaw/issues/7841) | 桌面版 Console UI 在后端就绪前加载，模型列表/插件面板空白 | 相关改进 PR：[#7917](https://github.com/agentscope-ai/QwenPaw/pull/7917)（慢网络 API 加载优化） |
| 中 | [#7921](https://github.com/agentscope-ai/QwenPaw/issues/7921) | `omp-roles` 技能 SKILL.md 缺少 YAML frontmatter，导致技能静默不可用 | 已有 Fix PR：[#7922](https://github.com/agentscope-ai/QwenPaw/pull/7922) |
| 中 | [#7907](https://github.com/agentscope-ai/QwenPaw/issues/7907) | Responses API 工具 schema 清洗移除 nullable，导致可选日期参数无法省略 | 已修复，PR [#7915](https://github.com/agentscope-ai/QwenPaw/pull/7915) |
| 中 | [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 上下文压缩仍可能超出完整请求预算，导致活跃轮次失败 | 未修复，增强类 Bug |
| 低/已关闭 | [#7905](https://github.com/agentscope-ai/QwenPaw/issues/7905) | DoomLoopGate 在纯文本轮次无新工具证据时误升级 TERMINATE | 已关闭，修复 PR [#7906](https://github.com/agentscope-ai/QwenPaw/pull/7906) / [#7919](https://github.com/agentscope-ai/QwenPaw/pull/7919) |
| 低/已关闭 | [#7431](https://github.com/agentscope-ai/QwenPaw/issues/7431) | codex 后端不流式下发时每轮“空响应”，usage 全 0 | 已关闭 |
| 低/已关闭 | [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882) | OpenCode 供应商「免费」模型 API 调用返回 403 FreeTierError，UI 仍标免费 | 已关闭 |
| 低/已关闭 | [#7866](https://github.com/agentscope-ai/QwenPaw/issues/7866) | Agent 重写文件后 file-area 标签页仍显示编辑前内容 | 已关闭 |

## 6. 功能请求与路线图信号

- **已完成路线图项**：模型提供者层优化（[#6167](https://github.com/agentscope-ai/QwenPaw/issues/6167)）随 [#7899](https://github.com/agentscope-ai/QwenPaw/pull/7899) 关闭，动态上下文、模型同步、多模型 Fallback 等方向已开始落地。
- **文档贡献**：[#7912](https://github.com/agentscope-ai/QwenPaw/issues/7912) 请求补充带认证的 MCP web-research 示例，属于社区文档贡献，较易被接纳。
- **功能型 PR 在途**：
  - [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)：per-session 模型覆盖（已 Open 两月，Under Review）
  - [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713)：Telegram 使用 Rich Messages 渲染 Markdown 表格
  - [#7914](https://github.com/agentscope-ai/QwenPaw/pull/7914)：Console 自定义浏览器标签页标题
  - [#7923](https://github.com/agentscope-ai/QwenPaw/pull/7923)：按 `blocks_retention_days` 老化 `tool_result` 块，控制滚动历史存储增长
- **可能进入下一版本**：[#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628)（上下文压缩预算）仍为 open enhancement/bug，社区讨论活跃，有较高优先级。

## 7. 用户反馈摘要

从今日活跃的 Issue 评论和描述中，可以提炼出以下真实用户声音：

- **安全焦虑**：多位用户对“注入指令跨会话持久化”表示担忧，且本地无法定位来源，期望项目提供根因分析和彻底修复。
- **修复质量不满意**：在 [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883) 中，用户明确称“之前此问题被标记为已修复，但在 2.2.1 上仍可复现”，说明回归验证需要加强。
- **启动体验问题**：桌面版 Console 启动后模型列表/插件面板空白，需手动刷新，影响首次使用体验。
- **模型标识误导**：OpenCode 供应商的“免费”模型实际 API 调用必然失败，用户认为 UI 应更准确地反映可用性。
- **技能可用性困惑**：`omp-roles` 技能在列表可见但实际加载被静默跳过，用户感到困惑，已通过补 frontmatter 修复。
- **老问题悬而未决**：京东云 Coding Plan 环境下的会话中断问题（[#3419](https://github.com/agentscope-ai/QwenPaw/issues/3419)）已持续 5 个月，用户需要反复提醒 Agent 才能继续执行。

## 8. 待处理积压

以下 Issue/PR 长期未闭环，建议维护者重点关注：

- **[#3419] 京东云 Coding Plan 环境与会话执行中断**（开放 160+ 天）  
  https://github.com/agentscope-ai/QwenPaw/issues/3419  
  4 月 15 日创建，仅 3 条评论，仍可复现。涉及 Tool Guard 审批后中断，影响特定云环境用户。

- **[#7628] Context compaction 超出 provider 请求预算**（开放 14 天）  
  https://github.com/agentscope-ai/QwenPaw/issues/7628  
  长期会话稳定性关键问题，仍无修复 PR，社区有 +4 评论。

- **[#7859] Persistent prompt injection**（开放 4 天，安全高危）  
  https://github.com/agentscope-ai/QwenPaw/issues/7859  
  涉及 Agent 安全，社区热度最高，目前无 fix PR，建议优先响应。

- **[#5992] Add per-session model overrides**（PR 开放 70+ 天）  
  https://github.com/agentscope-ai/QwenPaw/pull/5992  
  功能型 PR，first-time contributor，Under Review 状态长期未合并，需要维护者推进。

- **[#7713] Telegram Rich Messages for Markdown tables**（PR 开放 11 天）  
  https://github.com/agentscope-ai/QwenPaw/pull/7713  
  提升 Telegram 渠道体验的功能 PR，仍在等待 review。

:::
