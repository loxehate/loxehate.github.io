---
title: "OpenClaw 生态日报"
published: 2026-09-23
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-23

> Issues: 224 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-23 00:00 UTC

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

# OpenClaw 项目动态日报 — 2026-09-23

## 1. 今日速览

过去24小时内，OpenClaw 项目保持高度活跃：**224 条 Issues 更新**（209 条新开或活跃，15 条关闭）、**500 条 PR 更新**（371 条待合并，129 条已合并/关闭），**未发布新版本**。项目整体处于密集迭代阶段，无新 Release 发布但 PR 合并/关闭量达 129 条，说明内部开发管线运转高效。今日社区讨论焦点集中在**网关内存泄漏（#91588）、子代理结果静默丢失（#44925）、僵尸进程累积（#97616）**等长期稳定性问题上，同时新报告了 2 个升级相关 P0 问题（#156007、#153377），升级路径稳定性成为当前最突出的用户痛点。大量待合并 PR 聚焦于**会话状态管理、性能优化和 UI/UX 改善**，表明项目正在向提升大规模部署稳定性和终端用户体验两个方向同步推进。

---

## 2. 版本发布

今日无新版本发布。最近一个已知版本为 **2026.9.5**，但社区已报告 2 个涉及该版本的升级问题（见下文 Bug 部分），预计维护者将尽快推出补丁版本。

---

## 3. 项目进展

过去 24 小时内共有 **129 条 PR 被合并或关闭**，同时有 371 条 PR 正在等待合并。结合今日活跃的 PR 和已关闭 Issue 反推，项目在以下方向取得实质进展：

### 3.1 会话系统性能与稳定性深度优化

[steipete](https://github.com/steipete) 提交了一系列围绕会话系统的性能优化 PR，显示项目正在对 Gateway 核心路径做系统性调优：

- **[#155997 perf(gateway): reuse message text encodings during fanout](https://github.com/openclaw/openclaw/pull/155997)** — 消息扇出时复用已编码的文本，避免为每个授权接收者重复编码大型转录消息；同时修复了事件信封中嵌套 session 标识符未过滤的问题。
- **[#155995 perf(gateway): reduce session list work during progress updates](https://github.com/openclaw/openclaw/pull/155995)** — 会话列表在进度/预览更新时不再重建常驻名单，减少忙碌会话期间的 CPU 和内存分配。
- **[#155886 fix(sessions): keep stored sessions stable across alias changes](https://github.com/openclaw/openclaw/pull/155886)** — 修复受保护转录轮次选择冲突的 raw/qualified 键问题，防止既有会话行因别名变更而失联。
- **[#156014 fix: keep session writes responsive during archive cleanup](https://github.com/openclaw/openclaw/pull/156014)** — 会话编辑、待处理输入和转录写入不再被归档清理的全量扫描阻塞。
- **[#155998 fix(sessions): reduce history stalls during cron cleanup](https://github.com/openclaw/openclaw/pull/155998)** — 前台读操作可在 cron 会话保留验证期间继续执行。
- **[#155957 fix(gateway): avoid rereading session rows after refresh yields](https://github.com/openclaw/openclaw/pull/155957)** — 修复会话列表刷新在 12ms 时间片内只渲染前缀而丢弃后缀，导致下一片重复读取的问题。

### 3.2 关键 Bug 修复已关闭

| Issue | 问题 | 状态 |
|:---|:---|:---|
| [#152961](https://github.com/openclaw/openclaw/issues/152961) | 2026.9.5 WorkerThread 持续占用单核 CPU 并增长原生 RSS | 已关闭 |
| [#153377](https://github.com/openclaw/openclaw/issues/153377) | `update repair` 在 finalize:doctor 阶段自竞争（P0） | 已关闭，已有 linked PR |
| [#97680](https://github.com/openclaw/openclaw/issues/97680) | Beta 标签更新可能将外部官方插件置于 latest 而非指定 beta 标签 | 已关闭，已有 linked PR |
| [#37966](https://github.com/openclaw/openclaw/issues/37966) | LiteLLM 代理的 Anthropic 模型缓存保留（cacheRetention）配置被忽略 | 已关闭 |

### 3.3 其他重要待合并 PR

- **[#153187 fix(plugins): prevent stale credential reads and stuck cleanup on reload](https://github.com/openclaw/openclaw/pull/153187)** — 修复插件重载时陈旧凭据读取和决策提供者在清理时自我等待的问题。
- **[#150621 fix(workers): discard SSH identities after their invocation closes](https://github.com/openclaw/openclaw/pull/150621)** — 工作线程 SSH 身份结果在初始化 bootstrap/工作区/桌面操作停止后立即失效，防止凭据陈旧使用。
- **[#155986 feat(mattermost): send progress and final replies as separate posts](https://github.com/openclaw/openclaw/pull/155986)** — Mattermost 进度模式中，临时状态和最终答案分离为独立帖子，避免信息混淆。
- **[#156018 feat(diagnostics): identify agents across message and model-call traces](https://github.com/openclaw/openclaw/pull/156018)** — 在 OpenTelemetry 追踪中加入 agent 身份标识，提升可观测性。
- **[#153340 feat(core): move decision tool prefilter to core with harness capability gating](https://github.com/openclaw/openclaw/pull/153340)** — 将决策工具预过滤移至核心层，每个嵌入 agent 轮次减少约 1,800 token 的提示开销。
- **[#155256 feat: let users edit personal instructions from Profile or any chat](https://github.com/openclaw/openclaw/pull/155256)** — 允许用户通过 Profile 设置或 project session 自行编辑个人 USER.md，关闭 #155255。
- **[#120598 feat(capability): add private model-run prompt files](https://github.com/openclaw/openclaw/pull/120598)** — 支持 mode-0600 的私有提示文件，避免一次性模型评估提示词暴露在进程参数中。
- **[#148567 feat(openai): add Sign in with ChatGPT through Responses](https://github.com/openclaw/openclaw/pull/148567)** — 为公共 Responses API 增加 ChatGPT 账户登录作为独立的认证选项。
- **[#151176 feat(openai): add explicit Agents API MVP harness](https://github.com/openclaw/openclaw/pull/151176)** — 新增替代 OpenAI harness，拥有托管 agent 会话，同时保留现有 run/transcript 合同。

**项目整体判断**：129 条 PR 合并/关闭意味着项目正在快速消化 backlog，但 371 条待合并 PR 也暗示维护者审查带宽可能成为瓶颈。会话系统性能优化浪潮表明项目正在为更大规模的并发会话部署做准备。

---

## 4. 社区热点

### 🥇 [#91588 — Gateway 内存泄漏（350MB → 15.5GB，OOM 崩溃循环）](https://github.com/openclaw/openclaw/issues/91588)
- **标签**：P0 / impact:crash-loop / maturity:stable / issue-rating: 🦪 silver shellfish
- **评论数**：33（24h 内新增讨论）| **创建**：2026-06-09 | **👍**：1
- **核心诉求**：网关进程在 2-3 天正常使用后 RSS 从 ~350MB 膨胀至 15.5GB，被 OOM killer 杀死后反复进入 `launchd-handoff` 重启循环。**该问题已困扰社区超过 3 个月，且至今无修复 PR**，是目前项目最严重的稳定性欠账之一。

### 🥈 [#44925 — Subagent 完成结果静默丢失（无重试、无通知、无自动重启）](https://github.com/openclaw/openclaw/issues/44925)
- **标签**：P1 / impact:session-state, data-loss, message-loss / issue-rating: 🦞 diamond lobster / clawsweeper-recovery-stuck
- **评论数**：30 | **创建**：2026-03-13 | **👍**：2
- **核心诉求**：子代理任务编排在多种失败模式下（完成播报失败 E31/E42/E45、超时等）会**静默丢失结果**，父代理完全不知情。社区认为这是生产环境中不可接受的行为，要求至少提供重试、通知和自动重启机制。6 个月未解决，`clawsweeper-recovery-stuck` 标签表明自动化恢复流程已卡住。

### 🥉 [#97616 — Hook/Tool 子进程泄漏导致僵尸进程累积和运行时退化](https://github.com/openclaw/openclaw/issues/97616)
- **标签**：P1 / bug / impact:message-loss, crash-loop / issue-rating: 🦪 silver shellfish / clawsweeper-recovery-stuck
- **评论数**：17 | **创建**：2026-06-29 | **👍**：1
- **核心诉求**：`openclaw-hooks`、`bash`、`codex` 等子进程在 hook/tool 执行后未被收割，累积为僵尸进程，导致运行时性能退化。社区希望有系统化的子进程生命周期管理。

### 其他高热度讨论

- **[#79902 — 增加 companion 友好的 SQLite transcript/session 接缝](https://github.com/openclaw/openclaw/issues/79902)**（15 条评论，P3，feature）：高级用户希望基于数据库优先运行时构建规范化的会话/转录访问层，而非抓取不透明 blob。
- **[#74586 — AM 嵌入式运行中止 memory_search 工具调用并误判为超时](https://github.com/openclaw/openclaw/issues/74586)**（14 条评论，P2）：active-memory 插件与嵌入式 agent 运行的兼容性问题。
- **[#136183 — ssh 命令执行器挂起（SIGTERM 等待 server banner）](https://github.com/openclaw/openclaw/issues/136183)**（13 条评论，P1，regression）：2026.8.1 引入的回归，同命令在 shell 中正常执行。

**热点分析**：社区讨论最激烈的议题无一例外是**稳定性和数据可靠性**问题，而非新功能。排名前三的热点中两个属于 P0/P1 级资源泄漏（内存 + 进程），一个属于数据丢失。这些问题的共同特征是**长期存在、影响生产部署、但修复 PR 迟迟未出现**，反映了维护者资源与社区需求之间的张力。

---

## 5. Bug 与稳定性

### 🔴 P0（严重崩溃/升级阻断）

| Issue | 问题 | 状态 |
|:---|:---|:---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 网关内存泄漏：RSS 从 350MB 涨至 15.5GB，2-3 天触发 OOM 重启循环 | ⚠️ 无修复 PR |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) | Windows de-DE 2026.8.2 升级后 Doctor 维护被阻塞，遗留旧工作区状态 | ✅ fix-shape-clear + queueable-fix |
| [#111372](https://github.com/openclaw/openclaw/issues/111372) | macOS 升级后网关无限重启（SIGTERM 循环），每 3-6 秒就绪后立即重新加载配置 | ⚠️ 7 月报告，仍无修复 PR |
| [#156007](https://github.com/openclaw/openclaw/issues/156007) | **新报告**：2026.9.3 → 2026.9.5 升级在激活前失败，尽管 lint/配置验证/插件解析/canary 全部通过 | ⚠️ 刚报告，待诊断 |
| [#153377](https://github.com/openclaw/openclaw/issues/153377) | `update repair` 在 finalize:doctor 阶段自竞争（macOS 2026.9.5） | ✅ 已关闭，linked-pr-open |

### 🟠 P1（高风险功能缺陷/数据丢失）

| Issue | 问题 | 状态 |
|:---|:---|:---|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent 完成结果静默丢失，无重试/通知/自动重启 | ⚠️ 3 月报告，recovery-stuck |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/Tool 子进程泄漏，僵尸进程累积导致退化 | ⚠️ 6 月报告，recovery-stuck |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | 命令执行器 ssh 挂起：SIGTERM 等待 server banner（2026.8.1 回归） | ⚠️ 无修复 PR |
| [#121617](https://github.com/openclaw/openclaw/issues/121617) | 压缩守卫 "Already compacted" 误判：二次压缩同轮内必然失败 | ✅ linked-pr-open |
| [#135704](https://github.com/openclaw/openclaw/issues/135704) | iMessage 回射消息绕过 echo cache，可被当作新入站文本 | ✅ fix-shape-clear + queueable-fix |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | totalTokens 膨胀在 2026.8.1-beta.2 仍可复现，#123065 修复仅覆盖 `api === "cli"` | ✅ linked-pr-open |
| [#134570](https://github.com/openclaw/openclaw/issues/134570) | 2026.8.1 升级后网关崩溃循环 + 静默分发失败（7 个独立阻塞项 + 误导性错误消息） | ⚠️ 无修复 PR |
| [#120162](https://github.com/openclaw/openclaw/issues/120162) | safeguard 模式下 qualityGuard 审计共享同一超时预算，被相同 abort 信号杀死 | ⚠️ 无修复 PR |
| [#142336](https://github.com/openclaw/openclaw/issues/142336) | 核心 /dashboard 命令遮蔽 Telegram Mini App 启动器（2026.9.2+） | ✅ linked-pr-open |

### 🟡 P2（一般缺陷）

- [#136262](https://github.com/openclaw/openclaw/issues/136262) — openai-completions 流偶发重复完整累积文本（n→2n→n 振荡），造成消息内容翻倍（linked-pr-open）
- [#50490](https://github.com/openclaw/openclaw/issues/50490) — 飞书群聊 activation 模式切换无效，/activation mention 后仍响应所有消息
- [#72240](https://github.com/openclaw/openclaw/issues/72240) — macOS 上 exec 命令偶发 SIGKILL，无诊断原因

**稳定性观察**：今日新关闭了 4 个 P1/P2 级问题（#152961、#153377、#97680、#37966），说明修复管线在持续推进；但 P0 级 #91588 和 #111372 分别搁置了 3 个月和 2 个月，**长期无修复 PR 的 P0/P1 问题正在侵蚀用户信任**。

---

## 6. 功能请求与路线图信号

### 高潜力功能请求（社区呼声高/已有相关 PR）

| Issue/PR | 请求 | 信号 |
|:---|:---|:---|
| [#10687](https://github.com/openclaw/openclaw/issues/10687) | 完全动态的模型发现（OpenRouter 优先） | 4 👍，10 条评论，P3 |
| [#155256](https://github.com/openclaw/openclaw/pull/155256) | 用户可自编辑个人指令（USER.md） | ✅ 已有 PR，开启方向 |
| [#120598](https://github.com/openclaw/openclaw/pull/120598) | 私有模型运行提示文件（防止提示词暴露） | ✅ 已有 PR |
| [#148567](https://github.com/openclaw/openclaw/pull/148567) | Sign in with ChatGPT 认证选项 | ✅ 已有 PR |
| [#151176](https://github.com/openclaw/openclaw/pull/151176) | OpenAI Agents API MVP harness | ✅ 已有 PR |
| [#153340](https://github.com/openclaw/openclaw/pull/153340) | 决策工具预过滤移至核心层，降低每轮 token 开销 | ✅ 已有 PR |

### 路线图信号分析

1. **成本与延迟优化**：PR #153340 减少每轮 ~1,800 token 开销，显示项目正在为 embedded agent 场景做成本优化，这与 #10687 动态模型发现的诉求形成呼应——用户希望更灵活地在不同模型间切换以平衡成本和质量。
2. **可观测性提升**：PR #156018 在追踪中加入 agent 身份标识，表明诊断能力正从基础日志向结构化追踪演进。
3. **用户自主性增强**：PR #155256（编辑个人指令）和 #120598（私有提示文件）体现了将更多配置文件交还用户直接管理的产品方向。
4. **AI 后端生态扩展**：PR #148567 和 #151176 持续扩展 OpenAI 生态接入方式，配合已有的 Codex/Claude 后端，OpenClaw 正成为多后端 AI 代理编排平台。

### 低优先级但长期有价值（已存在 3+ 个月）

- [#79902](https://github.com/openclaw/openclaw/issues/79902) — SQLite transcript/session 接缝（P3，15 条评论，2👍）：开发者社区的架构诉求，可能影响插件生态深度。
- [#53763](https://github.com/openclaw/openclaw/issues/53763) — 内置无头浏览器（P3，12 条评论）：解决 JS 渲染页面访问的可靠性问题。
- [#48918](https://github.com/openclaw/openclaw/issues/48918) — 用户级技能偏好/约定支持（P3）：避免复制整个 SKILL.md 来覆盖个人偏好。
- [#43562](https://github.com/openclaw/openclaw/issues/43562) — agent 身份开场白可配置（P3，1👍）：当前硬编码 "You are a personal assistant running inside OpenClaw."，无法定制。
- [#111943](https://github.com/openclaw/openclaw/issues/111943) — 后台学习子系统可配置模型和推理强度（P3）。

---

## 7. 用户反馈摘要

### 满意点

- **深度融入日常生活**：[#73537](https://github.com/openclaw/openclaw/issues/73537) 用户明确表示 OpenClaw "已经成为我们日常工作流的一部分"，运用于 Telegram 集成、自动化、cron 任务和 Home Assistant 控制，并感谢团队的工作。这证明项目在真实家庭/小企业场景中具备生产价值。

### 核心痛点

1. **长期运行稳定性不足**：[#91588](https://github.com/openclaw/openclaw/issues/91588)（内存泄漏 OOM）和 [#97616](https://github.com/openclaw/openclaw/issues/97616)（僵尸进程）均在正常运行数天后面临系统级退化，用户无法获得可预期的长时间运行保障。
2. **消息可靠性是不可接受的红线**：#44925（子代理静默丢失）、#112259（入站消息零载荷静默丢弃）、#135704（iMessage 回射被当新消息）等问题横跨 Telegram、Discord、iMessage、飞书等多个渠道，用户普遍表示"静默失败"比显式报错更令人沮丧。
3. **升级是高风险操作**：#134570 升级后 7 个独立阻塞项、#136203 Windows 升级后 Doctor 被阻塞、#156007 升级在激活前失败——升级路径的脆弱性要求用户每次都做好回滚准备。
4. **配置迁移缺乏透明度**：[#90378](https://github.com/openclaw/openclaw/issues/90378) 中 cron 存储从 JSON 静默迁移到 SQLite，新任务默认 `delivery.mode=announce` 导致渠道报错。用户呼吁迁移应有明确可见性。
5. **中文社区反馈活跃**：#55694（工具调用失败死循环刷屏）、#50490（飞书激活模式无效）等中文 Issue 展示了非英语社区的使用场景，飞书渠道的稳定性需要更多关注。

### 对维护者的期望

- 用户（如 #44925）明确要求**最少提供重试和通知机制**，不能"静默失败"。
- [#73537](https://github.com/openclaw/openclaw/issues/73537) 建议增加**生产就绪稳定性标签**，帮助用户在快速迭代中识别可稳定部署的版本。
- 多个 Issue 评论表达了对 `clawsweeper:needs-product-decision` 标签的困惑，希望产品决策能更快响应。

---

## 8. 待处理积压

以下为**超过 3 个月未获修复 PR** 或 **长期等待维护者决策** 的重要问题，建议维护者优先关注：

### 🔴 严重积压（P0/P1，无修复 PR）

| Issue | 报告时间 | 标签 | 说明 |
|:---|:---|:---|:---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 2026-06-09 | P0, crash-loop, stable | 网关内存泄漏导致 OOM，33 条评论，社区大规模受影响 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 2026-03-13 | P1, data-loss, message-loss | 子代理结果静默丢失，30 条评论，6 个月未解决 |
| [#111372](https://github.com/openclaw/openclaw/issues/111372) | 2026-07-19 | P0, crash-loop, regression | macOS 网关无限重启，2 个月无修复 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | P1, crash-loop | Hook/Tool 僵尸进程累积，17 条评论 |
| [#77467](https://github.com/openclaw/openclaw/issues/77467) | 2026-05-04 | P1, auth-provider | MiniMax Portal OAuth 无法自动刷新，5 条评论，3👍 |
| [#10687](https://github.com/openclaw/openclaw/issues/10687) | 2026-02-06 | P3（但 4👍） | 动态模型发现需求搁置 7 个月 |

### 🟡 等待产品决策（clawsweeper:needs-product-decision）

这些 Issue 均被标记为需要产品决策，但长期未获回应：

- [#79902](https://github.com/openclaw/openclaw/issues/79902) — SQLite transcript/session 接缝（5 月，15 条评论）
- [#96975](https://github.com/openclaw/openclaw/issues/96975) — 子代理完成与父上下文隔离（6 月，12 条评论）
- [#50490](https://github.com/openclaw/openclaw/issues/50490) — 飞书 activation 模式切换无效（3 月，6 条评论）
- [#124731](https://github.com/openclaw/openclaw/issues/124731) — claude-cli 后端静默降级 queue-mode steering（8 月，6 条评论）

### 🟠 大 PR 等待审查（维护者带宽瓶颈）

以下 XL 级 PR 已就绪但等待 maintainer 审查，部分已附充分证明：

- [#155957](https://github.com/openclaw/openclaw/pull/155957) — 会话刷新后避免重读行（XL，ready for maintainer）
- [#155886](https://github.com/openclaw/openclaw/pull/155886) — 会话跨别名变更保持稳定（XL，ready for maintainer）
- [#156014](https://github.com/openclaw/openclaw/pull/156014) — 会话写在归档清理期间保持响应（XL，ready for maintainer）
- [#150621](https://github.com/openclaw/openclaw/pull/150621) — SSH 身份在调用关闭后丢弃（XL，ready for maintainer）
- [#136764](https://github.com/openclaw/openclaw/pull/136764) — 在会话开始前显示 worktree 空间限额（XL，waiting on author）
- [#152118](https://github.com/openclaw/openclaw/pull/152118) — 原生配额耗尽后继续已结算的文件工具工作（XL，waiting on author）
- [#143610](https://github.com/openclaw/openclaw/pull/143610) — iOS 添加选中会话操作（XL，needs proof）

**积压风险评估**：项目当前的瓶颈在于**维护者审查带宽**，而非社区输出不足。371 条待合并 PR 中，包含多项 P0/P1 修复（如 #121617、#125333、#142336 的 linked PR），这些修复的合并速度直接关系到上述 P0/P1 问题能否尽快闭环。建议维护者优先处理带有 `ready for maintainer look` 标签且关联 P0/P1 问题的高优先级 PR，同时为积压超过 3 个月的 P0/P1 无修复 PR 建立应急响应机制。

---

*报告生成时间：2026-09-23 | 数据来源：[OpenClaw GitHub](https://github.com/openclaw/openclaw) | 标签系统说明：`clawsweeper-*` 为项目自动标签，`issue-rating` 为社区参与度评级（🦞 diamond lobster > 🐚 platinum hermit > 🦪 silver shellfish > 🦐 gold shrimp > 🌊 off-meta tidepool）*

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告（2026-09-23）

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态整体处于**高度活跃但稳定性承压**的密集迭代期：头部项目（OpenClaw、CoPaw、Zeroclaw、NanoBot）均保持每天数十条 PR 的合并节奏，但 P0/P1 级内存泄漏、数据静默丢失、升级阻断等问题普遍存在，且长期未获根治。维护者审查带宽已成为共性瓶颈（OpenClaw 积压 371 条 PR、Zeroclaw 31 条、CoPaw 26 条）。与此同时，多渠道 IM 集成（Telegram、WhatsApp、微信、飞书、Slack/Teams）、模型管理灵活性、配置持久化与可观测性正在成为多项目共同投入的方向。整体而言，生态正从“功能堆叠”转向“生产级可靠性打磨”，但距离成熟稳定的大规模部署仍有明显距离。

## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃/关闭） | PR（合并/关闭/待合并） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 224 更新（209 新开/活跃，15 关闭） | 500 更新（129 合并/关闭，371 待合并） | 无 | 🟡 高度活跃，但 P0 稳定性欠账严重，审查瓶颈突出 |
| **NanoBot** | 3（3 新开） | 29（14 合并，15 待合并） | 无 | 🟢 高活跃，P1 快速闭环，社区响应快 |
| **Zeroclaw** | 12（6 新开，6 关闭） | 50（19 合并/关闭，31 待合并） | 无 | 🟠 活跃，但存在 S0 级安全漏洞未修复 |
| **PicoClaw** | 2 关闭 | 3 关闭，1 待合并 | 无 | 🔴 低活跃，stale 清理为主，实质贡献流失 |
| **NanoClaw** | 2（1 新开，1 关闭） | 18（5 合并，13 待合并） | 无 | 🟡 高活跃，但自更新工具链崩溃等 P0 待合入 |
| **IronClaw** | 0 | 3 待合并 | 无 | 🟢 中等偏下，无 Issue 互动，等待合并窗口 |
| **LobsterAI** | 5（5 活跃） | 12（10 合并，2 待合并） | 2026.9.22 | 🟢 高活跃，稳定性修复集中，发布节奏正常 |
| **Moltis** | 0 | 1 待合并 | 无 | 🔴 低活跃，依赖维护为主，社区互动空白 |
| **CoPaw** | 21（5 新开/活跃，16 关闭） | 50（24 合并/关闭，26 待合并） | 无 | 🟡 高活跃，测试覆盖提升明显，但超时恢复与沙箱风险待解 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态中**体量最大、综合性最强**的旗舰项目：单日 500 条 PR 更新、224 条 Issue 动态，远超其他项目 1-2 个数量级。其核心优势在于**完整的网关架构、多后端 AI 适配（OpenAI/Anthropic/Codex/Claude 等）、插件生态与深度可扩展性**，并已具备一定的大规模并发会话部署能力。

技术路线上，OpenClaw 明显向**企业级稳定性与可观测性**倾斜（如 Gateway 性能调优、OTel agent 身份追踪），而同类项目更聚焦于单一场景：NanoBot 轻量聊天机器人、Zeroclaw 通道行为与安全边界、CoPaw 多 agent 协作与模型降级、LobsterAI 中文 IM 集成。社区规模上，OpenClaw 的问题讨论深度（如 #91588 内存泄漏 33 条评论、#44925 子代理丢失 30 条评论）和 PR backlog 均表明其用户基数与贡献者网络远超其他项目，但这也导致维护者审查带宽严重不足，**长期无修复的 P0 问题正在侵蚀其社区信任**。

## 4. 共同关注的技术方向

以下是多个项目在近期动态中共同涌现的技术需求与解决方向：

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **稳定与数据可靠性** | OpenClaw、Zeroclaw、NanoClaw、CoPaw、LobsterAI | 内存泄漏 OOM、子代理结果静默丢失、超时无法自恢复、配置被重置、自更新崩溃等 P0/P1 问题全面告警 |
| **配置持久化与用户自主权** | OpenClaw、LobsterAI、CoPaw、PicoClaw | 用户自定义 USER.md / openclaw.json 不被覆盖，配置修改可视化，避免静默数据丢失 |
| **多渠道 IM 接入** | OpenClaw、NanoBot、Zeroclaw、NanoClaw、LobsterAI | Mattermost、Telegram、WhatsApp、LINE、微信/飞书、Slack/Teams 的深度适配与行为一致性 |
| **模型管理灵活性** | OpenClaw、CoPaw、NanoClaw、LobsterAI | 动态模型发现、自动降级/回退、多 provider 共享凭据、新模型能力上限对齐 |
| **可观测性与诊断** | OpenClaw、NanoBot、CoPaw | OTEL 追踪中加入 agent 身份、tokenizer 预热、结构化追踪替代日志抓取 |
| **安全边界与权限控制** | Zeroclaw、CoPaw、PicoClaw | 沙箱 ACL 卷级风险、高危命令审批绕过、插件对核心路径的侵入性隔离 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构要点 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手平台：多后端、网关、插件、会话管理 | 自托管高级用户、小型团队、追求可扩展性的开发者 | Gateway 集中架构，Go/Python 混合，SQLite 持久化，OpenTelemetry |
| **NanoBot** | 轻量聊天机器人，Telegram 深度优化，自动压缩 | 个人开发者、Telegram 频道运营者 | 模块化单二进制，WebUI，快速迭代 |
| **Zeroclaw** | 通道行为正确性 + 安全策略边界（Rust 实现） | 安全敏感型部署、WhatsApp/LINE 用户 | Rust 实现，channel-map factory，审计驱动的安全修复 |
| **PicoClaw** | 嵌入式/轻量场景，QQ 频道集成 | 中文个人用户、资源受限环境 | 配置安全为短板，当前维护停滞 |
| **NanoClaw** | 开发者工具链：Claude Code/Codex/Cursor 集成，CDSS 自动部署 | 开发者、需要多 agent CLI 能力的团队 | 以技能为单元扩展，提供 /add-* 安装技能，自更新工具链 |
| **IronClaw** | WebUI 体验与 host-runtime 增强 | 浏览器端用户、本地化需求强烈的地区 | 多语言 locale、IME 修复、builtin.time API 扩展 |
| **LobsterAI** | 中文用户 IM 集成（微信/飞书）+ 网易有道生态 | 中文个人用户、企业微信/飞书用户 | 桌面应用 + OpenClaw 网关兼容层，Kimi K3 深度适配 |
| **Moltis** | 方向尚不明确，当前以依赖维护为主 | 未知 | wasmtime 相关，可能涉及 WASI 运行时，活跃度过低 |
| **CoPaw** | 多 agent 协作、模型配置中心、高测试覆盖率 | Qwen 生态用户、多 agent 编排场景 | 源自 QwenPaw，强调 agent 间通信、RoutingChatModel（未接线）、SQLite transcript |

## 6. 社区热度与成熟度

**快速迭代阶段**：OpenClaw、NanoBot、Zeroclaw、CoPaw、LobsterAI。这些项目日 PR 更新量在 12-500 条之间，Bug 修复往往在数小时至 24 小时内出现对应 PR（如 NanoBot #5849 → #5857，Zeroclaw #10922 → #11057）。但 OpenClaw 与 CoPaw 存在“高产出但积压高”的矛盾，Zeroclaw 则受 S0 安全漏洞牵制。

**质量巩固阶段**：IronClaw、NanoClaw。PR 数量中等，但修复方向明确（IME 合成、自更新崩溃、端口适配器），且缺少大规模社区反馈，属于“开发侧推进、用户侧静默”的状态。

**低活跃/维护期**：PicoClaw、Moltis。PicoClaw 今日仅做 stale 清理，无实质代码合并；Moltis 仅有 1 条 dependabot 依赖更新。两者社区互动几乎为零，需警惕贡献者流失与项目停滞风险。

## 7. 值得关注的趋势信号

1. **可靠性已取代新功能成为社区第一诉求**：多个项目的热门 Issue 高度集中于“静默失败”“资源泄漏”“超时无恢复”等生产级问题，用户明确表示“静默失败比显式报错更令人沮丧”。AI 智能体开发者应优先建立完善的错误暴露、重试与自愈机制。

2. **配置持久化与用户控制权正在成为硬性需求**：从 OpenClaw 允许用户编辑 USER.md，到 LobsterAI 配置被模板覆盖的抱怨，再到 CoPaw 模型配置步骤繁琐的吐槽——用户不再接受“黑盒式”配置管理，配置文件应可审计、可回滚、可默认继承、可粒度覆盖。

3. **多渠道 IM 集成从“可用”走向“一致”**：WhatsApp 的 suppress_voice/force_voice、Telegram 的压缩通知噪音、微信的流式回复等待，均指向同一个方向：IM 通道不仅需要“能收发消息”，还要严格遵循配置语义与交互预期，否则会直接损害用户体验。

4. **AI 模型管理向“动态+降级”演进**：CoPaw 的 RoutingChatModel 虽未接线，但社区呼声极高；OpenClaw 也有动态模型发现的长期请求。开发者应预设计费/配额/超时场景下的自动模型回退链路，而非仅支持固定模型绑定。

5. **自更新与升级路径成为新的脆弱点**：NanoClaw 的更新工具崩溃、OpenClaw 的升级激活前失败、LobsterAI 升级后模型策略阻断启动——多个项目同时暴露“自举”缺陷。AI 助手若想进入长期运行的生产环境，必须将升级机制本身纳入自动化测试（如 CI 中实际执行一次自更新）。

6. **安全边界需要独立于功能开发的专项治理**：Zeroclaw 的配置组合逻辑绕过（S0）、CoPaw 的 Windows 沙箱卷级 ACL、插件导致审批全部 500，均说明安全审查应覆盖配置边界、沙箱权限、插件侵入性，而不只是单点漏洞扫描。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-23

## 今日速览

过去24小时 NanoBot 项目异常活跃：共产生 3 条 Issue、29 条 PR 动态，其中 14 个 PR 成功合并/关闭、15 个仍在待合并队列——这一合并速率属于近期较高水平。今日核心攻坚方向集中在三块：**Telegram 频道体验优化**、**自动压缩（auto-compaction）机制修复**、**WebUI 交互与渲染细节打磨**。尤为值得关注的是，昨日报告的自动压缩死锁 Bug（#5849）已在 24 小时内获得修复 PR（#5857），社区响应速度极快。无新版本发布，项目处于稳步迭代的活跃期。

## 项目进展

今日共合并/关闭 14 个 PR，覆盖频道、Provider、WebUI、工具链等多个模块，具体进展如下：

**Telegram 频道能力补强**
- [#5614](https://github.com/HKUDS/nanobot/pull/5614) [已合并] 支持富文本消息流式输出（`sendRichMessageDraft`），私聊场景体验显著提升；群聊保持原 HTML/纯文本流式路径，策略稳健。
- [#5803](https://github.com/HKUDS/nanobot/pull/5803) [待合并] Telegram 三项小改进：富文本换行符规范化、`topic_id` 暴露给 `my` 工具、输入状态在话题模式下正确显示。

**Provider 兼容性修复**
- [#5783](https://github.com/HKUDS/nanobot/pull/5783) [已合并] 修复了含 `tool_calls` 的历史消息中 assistant `content` 被剥离的问题，Mistral 等 Provider 的上下文回放更完整。

**WebUI 交互优化**
- [#5831](https://github.com/HKUDS/nanobot/pull/5831) [已合并] 对话消息按视觉块独立展示，上下文控制按钮仅对悬停/聚焦/选中的块显现，界面更清爽。
- [#5862](https://github.com/HKUDS/nanobot/pull/5862) [已合并] Markdown 表格不再强制撑满宽度，改为自适应换行，长 URL 和标识符不再溢出。

**工具与稳定性**
- [#5867](https://github.com/HKUDS/nanobot/pull/5867) [已合并] `read_file` 正确识别 BOM 标记的 UTF-16/UTF-32 文本，避免乱码内容被当作有效输出。
- [#5868](https://github.com/HKUDS/nanobot/pull/5868) [已合并] 修复 Windows 下带引号的可执行文件路径在无参调用时无法启动的问题。
- [#5859](https://github.com/HKUDS/nanobot/pull/5859) [已合并] 工具参数校验支持 JSON Schema 布尔子模式（`true`/`false`），避免合法 schema 导致崩溃。

**心跳与重试机制回归修复**
- [#4896](https://github.com/HKUDS/nanobot/pull/4896)、[#4915](https://github.com/HKUDS/nanobot/pull/4915)、[#4959](https://github.com/HKUDS/nanobot/pull/4959) [均已合并] 心跳迁移至 cron 后的一批回归问题（任务执行 vs 报告、评估可配置性、重试延迟）完成收尾。

整体来看，项目在频道适配、工具健壮性、WebUI 体验三条线上均有实质推进，且 P1 级问题的修复已全部合入。

## 社区热点

今日讨论热度集中在两个 Issue：

**[#5870](https://github.com/HKUDS/nanobot/issues/5870) Telegram 上下文压缩完成通知重复出现**（3 条评论，0 👍）— 用户报告同一会话中连续出现多条 `Context compacted.` 通知，且网关日志显示这些通知与自动压缩操作相关联。此问题直击 Telegram 高频用户的日常使用痛点（通知噪音），社区已有讨论但尚无对应 fix PR，建议维护者优先排查通知发送链路是否缺乏去重/合并机制。

**[#5849](https://github.com/HKUDS/nanobot/issues/5849) 自动压缩死锁：summarize_transcript 无 token 预算保护**（2 条评论，0 👍）— 该 Issue 精准指出了自动压缩路径与手动路径（`archive_session` 使用 `get_history(max_tokens=budget)`）在预算控制上的不一致：自动路径将完整历史 + 系统提示直接发送给摘要模型，一旦历史超出输入预算，压缩将永远无法成功。社区已在 24 小时内给出修复 PR（[#5857](https://github.com/HKUDS/nanobot/pull/5857)），讨论热度转化为行动力，属于高质量的技术讨论。

## Bug 与稳定性

按严重程度排列：

**严重（P1 级）**
- [自动压缩死锁 #5849](https://github.com/HKUDS/nanobot/issues/5849)：`summarize_transcript` 无 token 预算保护，历史超限后压缩永远失败。✅ 已有修复 PR [#5857](https://github.com/HKUDS/nanobot/pull/5857)（今日提交，待合并），通过估算系统提示/工具 schema 开销并在发送前裁剪历史来修复。

**中等（P2 级）**
- [Telegram 压缩完成通知重复 #5870](https://github.com/HKUDS/nanobot/issues/5870)：同一会话出现多条 `Context compacted.` 通知，造成消息噪音。❌ 暂无对应 fix PR。
- [Windows 带引号可执行文件调用失败](https://github.com/HKUDS/nanobot/pull/5868)：已通过添加 PowerShell 调用运算符修复并合并。✅
- [UTF-16/UTF-32 BOM 文件内容乱码](https://github.com/HKUDS/nanobot/pull/5867)：`read_file` 回退 latin-1 导致读取出 NUL 填充乱码。✅ 已合并。

**已合入的稳定性改进**
- 布尔 JSON subschema 导致的工具参数校验崩溃（[#5859](https://github.com/HKUDS/nanobot/pull/5859)）
- 含 tool_calls 消息的 assistant content 被剥离（[#5783](https://github.com/HKUDS/nanobot/pull/5783)）
- Discord 延迟 reaction 任务在 runtime 重置时未取消（[#5864](https://github.com/HKUDS/nanobot/pull/5864)，今日提交，待合并）

## 功能请求与路线图信号

今日最值得关注的路线图信号是视频支持请求：

**[#5869](https://github.com/HKUDS/nanobot/issues/5869) 视频输入支持（功能请求，P2）** — 当前视频文件仅保存到磁盘并将路径文本传给 LLM，但 qwen3.8、mino-v2.6 等 omni 模型已原生支持视频输入。用户希望直接从频道将视频发送给这类模型。考虑到项目已支持多模态模型接入，此功能具备合理性，但涉及频道侧视频下载、模型能力探测、上下文 token 计算等多环节改造，预计属于中期规划。

**其他路线图信号（从 PR 观察）**
- [#5857](https://github.com/HKUDS/nanobot/pull/5857) 自动压缩的 token 预算保护：预计将合入下一小版本，修复 P1 死锁。
- [#5866](https://github.com/HKUDS/nanobot/pull/5866) CLI Apps 安装来源校验（fail closed on registry drift）：安全强化方向，当前待合并。
- [#5861](https://github.com/HKUDS/nanobot/pull/5861) 后台预加载 fallback tokenizer（daemon 线程 + 懒加载）：优化冷启动延迟，契合网关场景。
- [#5871](https://github.com/HKUDS/nanobot/pull/5871) Linear 原生 Agent UX 增强（OAuth 回调、workspace 健康检查、安全撤销授权等）：第三方集成体验持续完善。

## 用户反馈摘要

从今日 Issues 与评论中提炼的用户声音：

- **Telegram 用户的「通知疲劳」**：自动压缩在活跃会话中频繁触发，每条都推送 `Context compacted.` 通知，打断对话流畅性。用户期待压缩过程更「静默」，或至少合并为一条通知（来源：[#5870](https://github.com/HKUDS/nanobot/issues/5870)）。
- **自动压缩机制的不透明性**：当历史记录超过模型输入预算时，压缩功能彻底失效且无降级路径，用户面临「越聊越卡，压缩永远失败」的死锁。社区对预算控制缺失的原因分析深入，体现了用户对系统内部机制有较高理解度（来源：[#5849](https://github.com/HKUDS/nanobot/issues/5849)）。
- **多模态模型的前沿需求**：用户明确提及 qwen3.8、mino-v2.6 等视频输入模型，说明部分用户已在尝试最新的 omni 模型生态，对项目的模态支持有前瞻性期待（来源：[#5869](https://github.com/HKUDS/nanobot/issues/5869)）。

## 待处理积压

**长期未合入的 PR**
- [#5314](https://github.com/HKUDS/nanobot/pull/5314) [OPEN，8月10日创建] 修复嵌套 JSON 工具参数的 schema 解码问题。已开放 44 天，标注有 `conflict` 标签，可能因冲突或 owner 失联而搁置。属于 Provider 兼容性重要修复，建议维护者优先处理冲突或接手。

**其他值得关注的 P1 级待合并 PR**
- [#5861](https://github.com/HKUDS/nanobot/pull/5861) [OPEN，P1] 后台预热 fallback tokenizer，涉及冷启动延迟，今日新提交，建议尽快安排 review。

**关键 Issue 待跟进**
- [#5849](https://github.com/HKUDS/nanobot/issues/5849)（死锁）虽有 PR 修复，但 PR 尚未合并，需持续跟进至合入发布。
- [#5870](https://github.com/HKUDS/nanobot/issues/5870)（通知重复）暂无修复方案，建议维护者补充标签（如 `bug`、`telegram`）并排期。

---

*本日报基于 NanoBot 开源仓库 2026-09-23 的 GitHub 公开数据生成，数据统计窗口为过去 24 小时。*

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报 — 2026-09-23

## 1. 今日速览

过去 24 小时项目保持高活跃度：共 12 条 Issue 更新（6 条新开 / 活跃，6 条关闭），50 条 PR 更新（31 条待合并，19 条已合并 / 关闭），无新版本发布。社区提交焦点集中于 **WhatsApp Web 通道的语音行为与富文本渲染**、**安全策略边界**（一个 S0 级漏洞）、以及 **运行时通道工厂注册缺陷**。整体来看，贡献者响应速度快，多数新报告 Bug 在数小时内即有对应修复 PR；但 31 条待合并 PR 也显示维护者审查负载较高，尤其是多个 size:XL 的长线 PR 已滞留数周。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日有 19 个 PR 合并 / 关闭，6 个 Issue 被关闭，其中值得注意的完成项：

**PR 合并 / 关闭：**

- **fix(channels): use length-prefixed interruption scope keys to prevent boundary collisions (#10948)** — [#10958](https://github.com/zeroclaw-labs/zeroclaw/pull/10958)（已关闭）  
  废弃原有的下划线转义拼接方案，改为带标签、长度前缀的规范化编码（`{tag}:{ch_len}:{ch}:{target_len}:{target}:{sender_len}:{sender}[:{scope_len}:{scope}]`），从根上消除了中断作用域键跨组件边界的碰撞问题。

- **docs(developing): record the replacement-first integration policy** — [#11042](https://github.com/zeroclaw-labs/zeroclaw/pull/11042)（已关闭）  
  将 RFC #6165 的"replacement-first"集成策略落为正式文档，为后续移除、特性门控与迁移审查提供了可引用的依据。

- **chore(security): ignore RUSTSEC-2026-0292 (imbl-sized-chunks double free)** — [#11038](https://github.com/zeroclaw-labs/zeroclaw/pull/11038)（已关闭）  
  暂时忽略 `imbl-sized-chunks 0.1.3` 的双重释放 / UAF 公告，修复了 master 及所有开放 PR 上 Security job 持续失败的问题。

**Issue 关闭：**

- **LINE 群组消息绕过 allowlist 与配对握手**（[#9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392)，priority:p1, risk:high）已关闭，该高危安全问题耗时近两个月后完成处置。
- **Anthropic provider 在图片块结尾丢失滚动缓存断点**（[#10889](https://github.com/zeroclaw-labs/zeroclaw/issues/10889)）、**消毒器重写签名推理导致 Anthropic 拒绝重放**（[#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952)）、**WhatsApp 图片缺缩略图**（[#10981](https://github.com/zeroclaw-labs/zeroclaw/issues/10981)）等均于今日关闭。

整体来看，项目本周同时在安全修复、通道行为正确性和文档建设三条线上都有收尾，闭环速度良好。

## 4. 社区热点

今日讨论最活跃的议题集中在 WhatsApp Web 通道的行为细节：

- **WhatsApp Web 自动 TTS 时忽略 `suppress_voice`** — [#10922](https://github.com/zeroclaw-labs/zeroclaw/issues/10922)（4 条评论，OPEN）  
  用户 @Audacity88 指出，WhatsApp Web 的自动语音回复路径只检查 voice_chats、TTS 配置和 `voice_reply_skip_reason`，完全不读 `SendMessage.suppress_voice`。已有修复 PR [#11057](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)。

- **WhatsApp Markdown 转换器无法处理分隔线与 setext 标题** — [#11052](https://github.com/zeroclaw-labs/zeroclaw/issues/11052)（3 条评论，OPEN）  
  同一作者发现 PR #10475 引入的 Markdown 转换器将独立的 `***` / `---` / `___` 行原样发送给用户，且无法区分分隔线与 setext 下划线。实现 PR [#11054](https://github.com/zeroclaw-labs/zeroclaw/pull/11054) 已开出。

- **LINE 群消息安全绕过** — [#9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392)（3 条评论，CLOSED）  
  该 Issue 由 @belumume 在安全审计中发现，描述了 LINE 群组消息完全跳过 allowlist 和配对握手的完整调用链，细节详实，属于典型的"审计驱动"高质量反馈，今日已关闭。

这些热点呈现出一个共同诉求：**通道行为与协议文档 / 配置语义的一致性**。用户希望 `suppress_voice`、`force_voice`、Markdown 渲染等声明能力在真实通道中可靠落地，而非只在文档中存在。

## 5. Bug 与稳定性

按严重程度排列：

**S0 — 数据丢失 / 安全风险**

- **`allowed_commands` 显式条目使高危命令绕过 `block_high_risk_commands`，且无需审批、无日志直接执行** — [#11058](https://github.com/zeroclaw-labs/zeroclaw/issues/11058)（OPEN，无 fix PR）  
  配置组合 `block_high_risk_commands = true` + `allowed_commands` 中出现高危命令字面量 + `shell` 在 `auto_approve` 列表中时，高危命令被完全豁免且无人审批。这是配置边界组合导致的逻辑绕过，风险等级最高，**建议维护者优先响应**。

**S2 — 行为降级**

- **WhatsApp Web 忽略 `force_voice`，`send_via` 无法将 turn 路由为语音** — [#11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059)（OPEN，已有 PR [#11060](https://github.com/zeroclaw-labs/zeroclaw/pull/11060)）
- **WhatsApp Web 忽略 `suppress_voice`** — [#10922](https://github.com/zeroclaw-labs/zeroclaw/issues/10922)（OPEN，已有 PR [#11057](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)）
- **守护进程从不注册 channel-map factory，webhook / cron / SOP turn 无通道可用** — [#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055)（OPEN，关联 PR [#10986](https://github.com/zeroclaw-labs/zeroclaw/pull/10986)）

**已修复（今日关闭）：**

- **中断作用域键跨组件冲突** — [#10948](https://github.com/zeroclaw-labs/zeroclaw/issues/10948) → 由 [#10958](https://github.com/zeroclaw-labs/zeroclaw/pull/10958) 修复
- **Anthropic 缓存断点在图片块结尾丢失** — [#10889](https://github.com/zeroclaw-labs/zeroclaw/issues/10889)
- **消毒器重写签名推理导致 Anthropic 拒绝** — [#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952)
- **WhatsApp 图片无缩略图/尺寸信息，手机端显示空白卡片** — [#10981](https://github.com/zeroclaw-labs/zeroclaw/issues/10981)

安全相关 Issue 的关闭节奏令人欣慰，但 #11058 的 S0 风险需尽快跟进。

## 6. 功能请求与路线图信号

**路线图级建议：**

- **RFC: Knowledge graph as a first-class agent memory layer** — [#11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053)（OPEN）  
  用户 @RO-mix 提出知识图谱目前是"工具"而非"记忆"——记忆应自动捕获和浮现，工具则需 agent 主动调用。这是一条方向性建议，尚无对应 PR，但可能引发架构层面的讨论。

**已有实现 PR、大概率纳入下版本的功能：**

- **WhatsApp 渲染分隔线与 setext 标题** — Issue [#11052](https://github.com/zeroclaw-labs/zeroclaw/issues/11052)，PR [#11054](https://github.com/zeroclaw-labs/zeroclaw/pull/11054)
- **WhatsApp 语音笔记往返文档化** — PR [#11056](https://github.com/zeroclaw-labs/zeroclaw/pull/11056)
- **明确会话根目录并保留恢复根目录**（zerocode） — PR [#11044](https://github.com/zeroclaw-labs/zeroclaw/pull/11044)
- **WhatsApp 投票结果回读为 `[choice]` 消息** — PR [#10988](https://github.com/zeroclaw-labs/zeroclaw/pull/10988)
- **WhatsApp 实现 `create_room` / `invite_user`** — PR [#10979](https://github.com/zeroclaw-labs/zeroclaw/pull/10979)

从功能分布来看，WhatsApp Web 通道正处于密集补课期，语音语义、轮询交互、群组管理等能力都在快速补齐。

## 7. 用户反馈摘要

- **WhatsApp 通道细节偏差是当前最大痛点**：@Audacity88 与 @RustLangLatam 连续提交多个"文档声明 vs 实际行为不一致"的 Issue（suppress_voice、force_voice、Markdown 分隔线、图片缩略图等），说明该通道已在真实生产环境中被广泛使用，且用户对行为正确性有较高要求。
- **安全审计反馈质量高**：@qo-roj 对 #11058 的描述清晰给出了触发配置组合和后果，属于可直接复现的 S0 级风险；@belumume 对 #9392 的审计细致到行号与引用，这类反馈大幅降低了维护者定位成本。
- **社区对 agent 自主性的期望在提升**：@RO-mix 的 #11053 将知识图谱从"工具"升格为"记忆"的提议，反映用户希望 agent 自动沉淀和利用长期记忆，而非事事依赖主动调用。

## 8. 待处理积压

以下 PR 创建时间已超一个月、均为 size:XL 且带 `risk:high`，目前仍处于待合并状态，建议维护者优先审查或明确处置：

- **feat(providers): support multiple models per provider profile** — [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)（创建于 2026-08-07，principal contributor，标记 needs-author-action）  
  允许多模型共享同一 provider 凭据和端点，涉及配置结构扩展，改动面大。

- **fix(runtime): count and report retained history in whole turns** — [#9368](https://github.com/zeroclaw-labs/zeroclaw/pull/9368)（创建于 2026-07-25，distinguished contributor，标记 needs-maintainer-review）  
  将 `max_history_messages` 解释为完整轮次限制，修正工具调用与结果各自占用保留槽位的问题。

- **fix(delegate): bounded delegate filesystem tools now respect the target's own workspace (#9872)** — [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)（创建于 2026-08-26，标记 needs-author-action）  
  修复委托工具的文件系统边界，涉及安全策略，已两次进行合并对账但仍在等待作者操作。

- **fix(runtime): reject tool-call envelopes leaked into prose instead of rendering them** — [#10446](https://github.com/zeroclaw-labs/zeroclaw/pull/10446)（创建于 2026-08-29，标记 needs-author-action）  
  解决 gpt-5.6 模型将工具调用封包泄漏到正文导致渲染异常的问题，属生产环境偶发但影响明显。

这四个 PR 均属于跨模块大改动，长期滞留会持续增加合并成本和冲突风险，建议维护者本周内安排专项 review。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报 — 2026-09-23

## 1. 今日速览

过去 24 小时项目无新版本发布、无新 Issue 开启，维护动作主要集中在自动化清理陈旧（stale）工单：2 个 Bug Issue 与 3 个 Pull Request 被关闭，仅剩 1 个 PR 仍处于开放状态。整体活跃度较低，且关闭的 PR 多未获合并，说明维护者当前审查/合并带宽有限，项目开发节奏有所放缓。值得关注的是，两个配置安全/数据完整性相关的 Bug 报告及其修复 PR 均被清理，相关修复可能已被搁置。

## 3. 项目进展

今日无 PR 被合并，项目代码未新增实质提交。关闭的 3 个 PR 均为 stale 状态，其中两个是此前为修复配置模块 Bug 而提交的补丁：

- [#3375 fix(config): guard lazy sensitive-data cache against concurrent init](https://github.com/sipeed/picoclaw/pull/3375) — 尝试修复 `Config.initSensitiveCache` 并发初始化问题，对应 Issue #3374。该 PR 关闭意味着此 Bug 暂无有效修复进入主线。
- [#3372 fix(config): make the reaction tool configurable](https://github.com/sipeed/picoclaw/pull/3372) — 为 `reaction` 工具增加配置开关，属于小的可用性改进，同样被关闭。
- [#1349 feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349) — 一个为期 6 个月的 QQ 频道附件功能增强 PR，最终被 stale 清理，短期内大概率不会合入。

开放中的 PR 仅剩 [#3370 feat(tools): add Keenable web search provider](https://github.com/sipeed/picoclaw/pull/3370)，已等待约 15 天，需维护者关注避免再次被 stale bot 关闭。

整体来看，项目今日向前推进为 0，反而因 stale 清理失去若干潜在贡献。项目健康度受维护响应速度拖累。

## 4. 社区热点

今日评论最活跃的是两个 Bug Issue，各获得 2 条评论，均来自贡献者 @sting8k 提交，且都附带了相关修复 PR：

- [#3374 [BUG] Data race in Config.initSensitiveCache can return a nil replacer and panic FilterSensitiveData](https://github.com/sipeed/picoclaw/issues/3374)
- [#3373 [BUG] SaveConfig silently deletes every api_key after the first and leaves a dangling fallback](https://github.com/sipeed/picoclaw/issues/3373)

两个 Issue 均聚焦配置模块的安全性与数据可靠性，讨论热度虽不高，但指向明确：用户在并发环境及配置轮转场景中遇到了实际故障，并积极尝试以 PR 方式回馈修复。这反映了社区对配置数据正确性的高度关注。

## 5. Bug 与稳定性

按严重程度排列：

1. **严重 — 并发安全导致 panic**：[#3374](https://github.com/sipeed/picoclaw/issues/3374) `Config.sensitiveCache` 的懒加载未加锁，`sync.Once` 被绕过，多 goroutine 并发访问时可能返回 nil replacer 并触发 `FilterSensitiveData` panic。已有修复 PR [#3375](https://github.com/sipeed/picoclaw/pull/3375)，但今日被 stale 关闭，修复目前处于悬空状态。

2. **中等 — 静默配置数据丢失**：[#3373](https://github.com/sipeed/picoclaw/issues/3373) `model_list` 中同一条目包含多个 `api_keys` 时，`LoadConfig` → `SaveConfig` 往返会丢失除第一个外的所有 key，并残留指向不存在模型的 `fallbacks` 引用，造成难以察觉的配置损坏。该 Issue 暂未看到对应的修复 PR。

两个 Issue 今日均被 stale 关闭，但问题本身依旧存在，建议维护者尽快评估重新打开或安排修复。

## 6. 功能请求与路线图信号

- **新搜索提供商接入**：[#3370](https://github.com/sipeed/picoclaw/pull/3370) 由外部贡献者 @ilya-bogin-keenable 提出，为 `web_search` 工具新增 Keenable 提供商，新安装环境下无需 API key 即可使用。该 PR 目前仍开放，若合入将丰富工具的易用性，属于低风险增强。

- **工具可配置化**：[#3372](https://github.com/sipeed/picoclaw/pull/3372) 让 `reaction` 工具支持通过 `ToolsConfig` 关闭。虽然 PR 被关闭，但相关能力缺口依然存在，后续可能以其他形式重新实现。

- **QQ 频道生态支持**：[#1349](https://github.com/sipeed/picoclaw/pull/1349) 涉及 QQ 频道的 emoji、语音、图片、视频、文件等消息的解析和回复。该 PR 因 stale 关闭，但面向中文用户群的 QQ 集成需求并未消失，是否纳入路线图需维护者明确表态。

综合来看，下一版本若想提升项目活跃度，可优先审视上述三个方向：网络搜索扩展、工具配置精细化、IM 平台能力补全。

## 7. 用户反馈摘要

从 Issue 评论与描述中可提炼出以下真实用户痛点：

- **配置数据安全性**：多个 Issue 指向配置读写过程的隐蔽问题，用户尤其强调“**silent data loss**”（静默数据丢失）——没有报错却悄悄破坏配置，在实际运维中极难排查。
- **并发场景稳定性**：存在用户在高并发或频繁加载配置的场景下运行 PicoClaw，暴露了 `sync.Once` 被绕过等典型的并发编程陷阱，说明项目在并发健壮性方面有待加强。
- **贡献者体验**：外部贡献者认真提交了 Bug 复现、修复 PR，但长时间无维护者响应，最终被 stale bot 关闭。这可能削弱社区的贡献意愿，是需要警惕的反馈信号。

## 8. 待处理积压

- **唯一开放 PR**：[#3370 feat(tools): add Keenable web search provider](https://github.com/sipeed/picoclaw/pull/3370) 自 9 月 7 日创建至今已两周，若无维护者操作，将在 stale 策略下被清理。建议尽快 review。

- **无修复的 Bug**：[#3373 SaveConfig 静默删除 api_keys](https://github.com/sipeed/picoclaw/issues/3373) 与 [#3374 数据竞争 panic](https://github.com/sipeed/picoclaw/issues/3374) 均被 stale 关闭，但问题尚未解决。尤其 #3373 影响配置持久化正确性，长期积压将增加用户数据损坏风险。

- **长期未合并的 PR**：[#1349 QQ 频道附件支持](https://github.com/sipeed/picoclaw/pull/1349) 自 3 月提出，历时半年未获处理，最终关闭。如果该功能仍在远期规划中，建议维护者给出明确说明，避免社区重复提交。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-23

---

## 1. 今日速览

过去24小时 NanoClaw 项目保持了较高的开发活跃度：**18 条 PR 更新**（13 条待合并、5 条已合并/关闭）、**2 条 Issue 更新**（1 条新开、1 条已关闭），无新版本发布。核心团队在推进 CDSS 自服务通道能力（Slack/Teams 适配器）的同时，修复了 Setup 流程中的多个回归问题。值得关注的是新提交的 **#3869 暴露了 update-nanoclaw 自身工具链的严重回归**——控制器归档列表缺少传递依赖，导致项目自更新流程直接崩溃，虽然已有 PR #3750 待合并，但该问题已存在两周，需加速排期。整体健康度良好，但工具链自举稳定性需加强关注。

- 活跃度：**高**（18 条 PR 更新，其中核心团队提交占多数）
- 合并/关闭：**5 条 PR**（含 3 条 bug 修复、2 条功能交付）
- 新 Issue：**1 条**（严重级别，待 fix PR 合入）
- 新版本：无

---

## 2. 版本发布

今日无新版本发布，可跳过此部分。

---

## 3. 项目进展

今日关闭/合并的 5 条 PR 标志着两条关键功能线和一条重要 bug 修复的推进：

**✨ CDSS 通道能力初步交付（WP-6a / WP-6b）**
- [#3864 feat(cdss): channel credential provider, instance specs, per-instance webhook paths](https://github.com/nanocoai/nanoclaw/pull/3864) — 已关闭。这是 CDSS（Customer Deployment Self Serve）的核心基础层，为"将已存储的聊天应用凭据转换为活动适配器实例，无需重启、宿主不感知凭据存储位置"提供关键实现，是后续多通道支持的地基。
- [#3865 feat(cdss): Slack and Teams adapters per instance, pins, webhook mode, pending challenge](https://github.com/nanocoai/nanoclaw/pull/3865) — 已关闭。在 #3864 基础上交付了 Slack 和 Teams 通道适配器，支持按实例构建、Webhook 模式、待处理挑战等能力。

**🐛 Setup 流程 bug 修复**
- [#3861 fix(setup): remember the image-source answer across resume so the Echo perk is offered once](https://github.com/nanocoai/nanoclaw/pull/3861) — 已关闭。修复 Setup 向导在恢复运行时重复询问 Echo 镜像来源的问题。
- [#3863 fix(setup): register a freshly installed provider contract before the gateway store uses it](https://github.com/nanocoai/nanoclaw/pull/3863) — 已关闭。修复向导中途安装新 provider 后、gateway 存储在首次 vault 写入前无法读取模型端点的问题。这与今日关闭的 Issue #3862（Iron Proxy 登录问题）直接相关。

**⚙️ 长期待定 PR 收尾**
- [#1491 feat: add Google Workspace CLI integration skill](https://github.com/nanocoai/nanoclaw/pull/1491) — 已关闭。半年前创建的 Google Workspace CLI 集成技能 PR 今日正式关闭，包含 MCP server 封装（gws_discover/gws_help/gws_run）、非确定性确认防误操作护栏和审计日志。

> 📌 项目整体向前迈进的节奏较稳：CDSS 双 PR 在同一天合并，说明通道层架构已经成型。同时 Setup 相关的多个 bug 在 24 小时内被迅速关闭，体现了对安装体验的重视。

---

## 4. 社区热点

今日 Issues/PRs 评论区数据平淡（0 评论），但以下条目因**强关联性**形成了社区讨论热点：

**🔥 #3869 + #3750：update-nanoclaw 自更新流程断裂**
- [#3869 Issue: update-nanoclaw controller archive list is missing transitive imports — prepare crashes with MODULE_NOT_FOUND](https://github.com/nanocoai/nanoclaw/issues/3869)（作者 @bgao，新开）
- [#3750 PR: fix(update): extract the whole scripts/ tree for the update controller](https://github.com/nanocoai/nanoclaw/pull/3750)（作者 @tchopoorian，已存在 15 天）

**分析**：@bgao 报告了 `/update-nanoclaw` 在第一步解压 controller 时，因 `git archive` 文件列表缺失 `scripts/provider-contract-verifier.ts` 等传递依赖文件而导致 `MODULE_NOT_FOUND` 崩溃。讽刺的是 **NanoClaw 的自更新机制自身被依赖遗漏问题破坏**，而 @tchopoorian 在两周前就已经提交了修复 PR（提取整个 `scripts/` 目录）。截至今天问题依旧存在，说明修复 PR 尚未被合入。这暴露了两个信号：
1. 核心团队对工具链稳定性 PR 的审查周期过长（15 天未合并）
2. 项目缺乏自举测试——在 CI 中实际运行一次 update-nanoclaw 就能尽早发现此问题

**🔗 关联阅读**：同属 update/skills 领域，还有两条持续待合的 PR：
- [#3565 fix(update): let forks keep local adapters through the skill refresh](https://github.com/nanocoai/nanoclaw/pull/3565)（8 月 26 日创建，至今未合）
- [#3451 fix(update-skills): attribute a barrel import to the skill that appends it](https://github.com/nanocoai/nanoclaw/pull/3451)（8 月 22 日创建，至今未合）

---

## 5. Bug 与稳定性

今日新报告 1 个 bug，关闭 2 个相关 bug，按严重程度排列：

**🔴 严重（P0）— 阻断自更新流程**
- [#3869 update-nanoclaw 控制器归档列表遗漏传递导入，prepare 崩溃 MODULE_NOT_FOUND](https://github.com/nanocoai/nanoclaw/issues/3869) — **新开、无评论、0 👍**
  - 影响：`/update-nanoclaw` 完全不可用，第一步即崩溃。
  - 根因：`.claude/skills/upda...` 中的固定 `git archive` 文件列表缺失 controller 现在导入的三个模块，属文件清单过期问题。
  - **已有 fix PR**：[#3750](https://github.com/nanocoai/nanoclaw/pull/3750)（待合并）。修复方案为提取整个 `scripts/` 树而不是列出文件黑名单。
  - 建议：⚠️ 该 PR 已滞留 15 天，建议立即优先审查合入。

**🟠 中等（P1）— 已修复，待合入**
- [#3862 Codex 设备配对在 Iron Proxy 下无法 vault 登录（stale provider-contracts barrel）](https://github.com/nanocoai/nanoclaw/issues/3862) — **今日已关闭**
  - 根因：新鲜安装的 wizard 子进程中 provider-contracts barrel 文件过时。
  - 对应修复：[#3863](https://github.com/nanocoai/nanoclaw/pull/3863)（今日已关闭/合并），修复方案是在 gateway store 使用前注册新安装的 provider contract。
  - 附加信息：问题发生在提交 `290aa68358f7813e2505d48bcc132f50720f2cca`（#3825 头部），影响 Iron Proxy 网关的 Codex 登录。

**🟢 低严重度 — 今日已修复**
- [#3861 Setup 向导恢复运行时重复询问 Echo 镜像来源](https://github.com/nanocoai/nanoclaw/pull/3861) — 今日已关闭/合并。非致命但影响首次体验连贯性。

**⚡ 稳定性风险预警（来自 PR 描述）**
- [#3866 fix(codex): wait for MCP servers before the first turn](https://github.com/nanocoai/nanoclaw/pull/3866) — 指出 Codex 0.147.0 起，MCP 服务器只有约 1 秒启动时间，超时后第一轮对话将没有工具可用。PR 让 Codex 等待 MCP 启动完成，且当 NanoClaw 自己的工具服务器无法启动时大声失败。

---

## 6. 功能请求与路线图信号

今日无明显的新功能请求 Issue，但从 PR 动向可以清晰看到**三大路线图方向**：

**🚩 方向一：通道层大规模扩展（已部分落地）**
- 已合并：#3864、#3865 完成了 CDSS 通道凭据提供器和 Slack/Teams 适配器。
- 待合入：[#3837 fix(signal): consolidate attachment, DM-routing, and outbound-queue fixes](https://github.com/nanocoai/nanoclaw/pull/3837) — Signal 适配器大量修复（附件处理、DM 路由、出站队列），信号说明**非核心 IM 适配器也在持续打磨**。
- 配套文档：[#3838 docs(add-signal): document attachment/DM-routing fixes](https://github.com/nanocoai/nanoclaw/pull/3838)

**🚩 方向二：Gateway 抽象与多网关支持**
- [#3818 feat(setup): select the gateway without changing provider login](https://github.com/nanocoai/nanoclaw/pull/3818) — 高级 Setup 支持网关选择，且与 provider 登录解耦。
- [#3817 feat(skills): add the Iron Proxy gateway](https://github.com/nanocoai/nanoclaw/pull/3817) — 可安装的 Iron Proxy 网关技能（配套 #3818）。
- [#3815 refactor(gateway): centralize the credential gateway contract](https://github.com/nanocoai/nanoclaw/pull/3815) — 将凭据网关契约和人类审批生命周期集中化，是网关架构演进的基础重构。
- 上述三条均已停留 7+ 天，若合并，或将构成"网关基础设施 + 网关选择"的新能力集。

**🚩 方向三：Agent 运行时升级与供应商扩展**
- [#3868 chore(container): bump Claude Code to 2.1.280 and Agent SDK to 0.3.280](https://github.com/nanocoai/nanoclaw/pull/3868) — Claude Code 容器升级，修复 2.1.267+ 版本恢复代理工作区时会话系统提示词记录过期的回归。
- [#3867 chore(add-codex): pin @openai/codex 0.155.1](https://github.com/nanocoai/nanoclaw/pull/3867) — Codex CLI 从 0.146.0（落后两个月、18 个版本）升级到 0.155.1，依赖 #3866。
- [#3356 feat(providers): add Cursor Agent SDK payload](https://github.com/nanocoai/nanoclaw/pull/3356) + [#3355 feat(skills): add /add-cursor provider install skill](https://github.com/nanocoai/nanoclaw/pull/3355) — Cursor Agent 作为全新 provider（已滞留 35 天，无实质反馈）。

> 🔮 推测：Codx 升级双 PR（#3866 + #3867）目标明确且存在依赖关系，可能是近期发布的小版本主线。Cursor provider 两条 PR 已滞留 35 天，是否纳入下一版本取决于维护者的路线图优先级。

---

## 7. 用户反馈摘要

今日数据中 Issues 评论为 0，但从 Issue 摘要和 PR 描述中可提炼以下真实用户痛点：

**😤 工具链可靠性痛点**
- @bgao（[#3869](https://github.com/nanocoai/nanoclaw/issues/3869)）：使用官方 `/update-nanoclaw` 时第一步即崩溃，无任何可绕过路径。这直接影响用户的升级意愿。**隐含诉求**：自更新工具应该先经过充分测试再暴露给用户。

**🙋 新网关的安装体验问题**
- @glifocat（[#3862](https://github.com/nanocoai/nanoclaw/issues/3862)）：在 Iron Proxy 网关新安装中，Codex 设备配对无法将登录结果安全存入 vault，导致流程中断。该用户使用 `bash nanoclaw.sh --gateway-provider iron-proxy` 官方命令安装后即遇到，说明**新网关的正式采用仍需打磨**。对应的修复 #3863 已合入，值得验证。

**📦 维护者的痛点（沿自 PR 描述）**
- Codex MCP 服务器启动竞态：1 秒超时导致工具不可用（[#3866](https://github.com/nanocoai/nanoclaw/pull/3866)）、Codex CLI 落后两个月（[#3867](https://github.com/nanocoai/nanoclaw/pull/3867)）、Claude Code 会话恢复语义变化（[#3868](https://github.com/nanocoai/nanoclaw/pull/3868)）——这些是**维护者主动识别并修复的体验问题**，说明核心团队在持续跟进上游依赖变化。

---

## 8. 待处理积压

以下 PR/Issue 长期未获合入或有效讨论，需维护者关注：

**⚠️ 紧急关注组（高影响 + 有修复就绪）**

| 条目 | 创建 | 滞留 | 影响 | 建议 |
|---|---|---|---|---|
| [#3750 fix(update): extract the whole scripts/ tree](https://github.com/nanocoai/nanoclaw/pull/3750) | 09-08 | 15 天 | **阻断 #3869 自更新崩溃**，修复就绪但未合入 | 优先审查，宜与 #3869 同批关闭 |
| [#3867 chore(add-codex): pin @openai/codex 0.155.1](https://github.com/nanocoai/nanoclaw/pull/3867) | 09-22 | 1 天 | Codex 落后 18 个版本，依赖 #3866 | 确认 #3866 合并后立即跟进 |

**🟡 长期未响应组（28+ 天无核心团队实质反馈）**

| 条目 | 创建 | 滞留 | 内容 |
|---|---|---|---|
| [#3356 feat(providers): add Cursor Agent SDK payload](https://github.com/nanocoai/nanoclaw/pull/3356) | 08-19 | 35 天 | 新增 Cursor Provider 完整运行时负载 |
| [#3355 feat(skills): add /add-cursor provider install skill](https://github.com/nanocoai/nanoclaw/pull/3355) | 08-19 | 35 天 | Cursor Provider 安装技能，与 #3356 配套 |
| [#3565 fix(update): let forks keep local adapters through the skill refresh](https://github.com/nanocoai/nanoclaw/pull/3565) | 08-26 | 28 天 | fork 仓库在技能刷新时保留本地适配器 |
| [#3451 fix(update-skills): attribute a barrel import to the skill that appends it](https://github.com/nanocoai/nanoclaw/pull/3451) | 08-22 | 32 天 | 将 barrel 导入归属于实际追加该导入的技能 |

**📋 建议**：将所有 update/skills 相关 PR（#3750、#3565、#3451）**合并为一次专项审查批次**，避免 self-update 工具链问题持续累积；同时就 Cursor Provider 的路线图给出明确反馈。

---

以上为 2026-09-23 NanoClaw 项目动态日报，数据来源为 GitHub 仓库实时数据，统计窗口为过去 24 小时。

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报 — 2026-09-23

## 1. 今日速览

过去24小时内，IronClaw 项目无新 Issue 产生，也无 Issue 关闭；PR 侧有 3 条更新，全部处于待合并状态，无新合并或关闭。整体活跃度中等偏上：开发侧仍有实质性代码提交（尤其是 WebUI 与 host-runtime 的修复），但社区反馈与 Issue 讨论处于静默期，无新版本发布。结合 PR 的更新节奏，项目正处于“功能迭代与修复并行、等待合并窗口”的阶段，健康度良好。

## 2. 版本发布

今日无新版本发布，无更新内容、破坏性变更或迁移注意事项可披露。

## 3. 项目进展

今日无 PR 被合并或关闭，因此没有代码正式进入主干。但以下 3 个 PR 正在等待合并，若被接收将带来以下推进：

- **[#8108] fix(host-runtime): add builtin.time shift and typed input issues** — 为 `builtin.time` 增加 `operation: "shift"` 能力，支持带符号的秒/分/时/天/周累加为 `TimeDelta` 并应用于输入时间（或省略时应用于当前时间）。该 PR 将增强 host-runtime 时间处理的灵活性与类型健壮性。
  https://github.com/nearai/ironclaw/pull/8108

- **[#8092] fix(webui): preserve IME composition in the chat composer** — 修复聊天输入框在中文、日文等输入法（IME）合成期间的按键冲突问题，并解决 Safari 在 `isComposing` 误报时的异常行为。该修复对东亚语言用户至关重要。
  https://github.com/nearai/ironclaw/pull/8092

- **[#8107] feat(webui): add Italian (it) locale** — 新增第 12 个 WebUI 语言（意大利语），完整覆盖英文 key，包括两个懒加载 sidecar 包，确保无字符串静默回退英文。
  https://github.com/nearai/ironclaw/pull/8107

## 4. 社区热点

今日无高互动 Issue 或 PR（评论数与 👍 数均未披露或为 0）。从有限数据看，唯一明确的社区信号是 **[#8107] 意大利语 locale** 对应的用户请求 issue #7855，说明本地化需求依然是被社区持续提及的议题。IME 修复 PR 长期未合并（见下文“待处理积压”），也可能是社区关注但尚未集中表达的潜在热点。

- PR #8107: https://github.com/nearai/ironclaw/pull/8107
- 关联请求 #7855: 见 PR #8107 描述

## 5. Bug 与稳定性

今日无新 Bug Issue 提交，但有 2 个修复类 PR 正在等待合并，按潜在影响排列：

- **[中高] WebUI 聊天输入框 IME 合成问题**（#8092）— 影响使用中文、日文、韩文等输入法的用户，可能导致候选词上屏错误或误触发命令菜单。已有修复 PR，但已等待 12 天，建议尽快合入。
  https://github.com/nearai/ironclaw/pull/8092

- **[中] host-runtime 的 `builtin.time` 类型与 shift 操作问题**（#8108）— 涉及时间输入的类型处理和 shift 操作的缺失，可能导致特定时间计算场景下失败或类型错误。已有修复 PR，创建于昨日，仍待审查。
  https://github.com/nearai/ironclaw/pull/8108

以上两项均已有对应 fix PR，但尚未合并，回归风险较低。

## 6. 功能请求与路线图信号

今日无新功能请求 Issue，但可以从待合并 PR 中识别出两个清晰的路线图信号：

- **本地化扩展**：新增意大利语（#8107）意味着 WebUI 多语言支持仍是活跃方向，且用户主动请求（#7855）是主要驱动。未来可能继续看到其他语种的 PR。
  https://github.com/nearai/ironclaw/pull/8107

- **host-runtime 时间 API 增强**：`builtin.time` 新增 `shift` 操作（#8108）是明确的 API 能力扩展信号，指示 host-runtime 正在向更灵活的时间计算方向演进，可能成为下一版本的功能亮点。
  https://github.com/nearai/ironclaw/pull/8108

## 7. 用户反馈摘要

今日无新 Issue 评论或 PR 评论数据可提取。从 PR 描述与关联 issue 可推断的用户痛点包括：

- IME 用户在聊天输入时遇到键盘事件冲突，导致输入体验受损（见 #8092，推测已由用户报告并推动修复）。
- 意大利语用户希望 WebUI 界面语言不是英文回退，而是完整的本地化体验（见 #8107 对 #7855 的响应）。

待未来评论数据充实后，可进行更深入的情感与诉求分析。

## 8. 待处理积压

- **[#8092] fix(webui): preserve IME composition in the chat composer** — 该 PR 创建于 2026-09-10，至今已 12 天仍未合并，期间有更新（2026-09-22）。作为影响东亚用户日常输入体验的修复，建议维护者优先安排审查与合入。
  https://github.com/nearai/ironclaw/pull/8092

目前无长期未响应的 Issue 积压。

---

*报告生成时间：2026-09-23。数据来源：github.com/nearai/ironclaw。*

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

好的，作为 AI 智能体与个人 AI 助手领域开源项目分析师，我基于 LobsterAI 仓库 2026-09-23 的 GitHub 数据，为您生成以下项目动态日报。

---

# LobsterAI 项目动态日报 — 2026-09-23

## 1. 今日速览

过去 24 小时项目活跃度较高。共更新 5 条 Issue（全部为活跃状态）和 12 条 PR（其中 10 条已合并/关闭，2 条待合并），并有 1 个新版本发布。核心工作集中在 OpenClaw 网关稳定性修复、Windows 平台兼容性恢复以及 Kimi K3 模型能力对齐上。社区反馈方面，配置持久化问题（#1006）讨论最为集中，是当前用户自定义体验的主要痛点。整体上，项目处于高频迭代与稳定性修补并行的阶段。

## 2. 版本发布

### LobsterAI 2026.9.22

**更新内容：**
- **修复 IM 模块**：恢复原生定时任务与飞书消息投递功能（PR #2737）。
- **修复 OpenClaw 网关**：恢复 Windows 网关退出机制，并修复启动流程中的异常（PR #2737）。
- **技能配置同步稳定化**：修复因配置不一致导致的网关反复重启问题，优化超时处理逻辑（PR #2742）。
- **模型策略升级恢复**：修复升级后因非法模型 ID 导致整个网关无法启动的问题（PR #2745）。

**破坏性变更与迁移注意事项：**
本次发布以稳定性修复为主，无明确破坏性变更。但需注意：
- 若你正在使用 `nsp-clawguard` 插件且从 2.4.12 或更早版本升级，新的兼容逻辑（PR #2741）已支持发布包 manifest 版本与实际版本不一致的情况，如遇启动失败建议升级至本版本。
- 升级后建议检查 `modelPolicy` 配置，确保没有遗留旧模型 ID（如 `DeepSeek V4 Pro`），以免触发启动阻断。

## 3. 项目进展

今日共合并/关闭 10 个 PR，项目在功能性、兼容性与稳定性上均有明显推进：

- **提升 Kimi K3 模型能力上限**（[#2748](https://github.com/netease-youdao/LobsterAI/pull/2748)）：将 Kimi K3 最大输出 token 数从 8192 提升至与 1,048,576 token 上下文窗口匹配，并本地化实现了 `kimiK3StreamWrapper`，减少对插件 SDK 的依赖。
- **Cowork 会话体验增强**（[#2749](https://github.com/netease-youdao/LobsterAI/pull/2749)）：新增工具调用生成过程中的实时步骤进度与 diff 统计展示，使会话详情更透明、流畅。
- **OpenClaw 网关稳定性加固**：包括避免不必要的 Clawguard 启动租约等待（[#2746](https://github.com/netease-youdao/LobsterAI/pull/2746)）、修复升级后非法模型策略阻断启动（[#2745](https://github.com/netease-youdao/LobsterAI/pull/2745)）、稳定技能配置同步与超时恢复（[#2742](https://github.com/netease-youdao/LobsterAI/pull/2742)）。
- **Windows 平台兼容性修复**：回溯上游 koffi 补丁，解决安全软件阻断 PowerShell 子进程导致私有 SQLite 目录创建失败的问题（[#2743](https://github.com/netease-youdao/LobsterAI/pull/2743)）。
- **插件兼容**：支持旧版 `nsp-clawguard` 在 2.4.13 升级后的启动（[#2741](https://github.com/netease-youdao/LobsterAI/pull/2741)）。
- **系统提示词优化**：将活跃 exec 会话快照移出系统提示词，避免后台进程导致前缀缓存失效（[#2744](https://github.com/netease-youdao/LobsterAI/pull/2744)）。
- **主题修复**：恢复 CJK 字体正文标准字重 400，修复 macOS 上粗体文本对比度不足的问题（[#2740](https://github.com/netease-youdao/LobsterAI/pull/2740)）。

## 4. 社区热点

- **[Issue #1006] 配置文件和工作空间文件在重启后被重置**（[链接](https://github.com/netease-youdao/LobsterAI/issues/1006)）
  - **热度**：今日评论数最高（3 条），讨论集中。
  - **诉求**：用户自定义的 `openclaw.json` 和 `AGENTS.md` 文件每次重启都被内部模板覆盖，目前只能采用定时任务这种 workaround。用户**强烈希望官方提供配置持久化机制**，或至少允许自定义文件在重启后保留。

- **[Issue #986] 微信回复没有与客户端同步**（[链接](https://github.com/netease-youdao/LobsterAI/issues/986)）
  - **热度**：2 条评论。
  - **诉求**：微信机器人回复模式是“等待客户端全部处理完再一次性分条发送”，导致前面等待长、后面消息轰炸，用户体验很差。用户希望改为实时流式同步。

## 5. Bug 与稳定性

按严重程度排列：

1. **配置文件与工作空间被重置（严重）**（[#1006](https://github.com/netease-youdao/LobsterAI/issues/1006)）
   - **影响**：用户自定义配置丢失，核心功能无法按用户预期工作。
   - **当前状态**：无直接 fix PR。但待合并 PR [#2727](https://github.com/netease-youdao/LobsterAI/pull/2727)（持久化 OpenClaw entry hooks）可能部分缓解此问题，建议维护者评估关联性。

2. **OpenClaw 网关启动失败风险（高）**
   - 今日合并的 [#2745](https://github.com/netease-youdao/LobsterAI/pull/2745) 和 [#2746](https://github.com/netease-youdao/LobsterAI/pull/2746) 修复了升级后模型策略错误和 Clawguard 不必要的等待导致的启动阻断。同时 [#2741](https://github.com/netease-youdao/LobsterAI/pull/2741) 解决了 `nsp-clawguard` 插件升级后无法启动的问题。这些修复已在 2026.9.22 版本中发布。

3. **Web Search 服务启动失败**（[#981](https://github.com/netease-youdao/LobsterAI/issues/981)）
   - **影响**：启动时 `Failed to start Web Search service`，日志显示运行时资源已修复但服务仍启动失败。
   - **当前状态**：无专门 fix PR。可能与 Windows 平台安全软件拦截子进程相关（今日修复的 [#2743](https://github.com/netease-youdao/LobsterAI/pull/2743) 或可间接改善），但具体根因未明。

4. **微信回复不同步（中）**（[#986](https://github.com/netease-youdao/LobsterAI/issues/986)）
   - **当前状态**：无对应 fix PR，属于功能交互层面的待优化项。

## 6. 功能请求与路线图信号

- **配置持久化机制（呼声最高）**：Issue [#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) 要求官方提供持久化用户配置的方式。待合并 PR [#2727](https://github.com/netease-youdao/LobsterAI/pull/2727) 表明开发团队已在着手处理插件 entry hooks 的持久化问题，这可能是配置保护机制整体优化的前奏，有望在后续版本中纳入。
- **微信/IM 消息实时流式回复**（[#986](https://github.com/netease-youdao/LobsterAI/issues/986)）：用户期望消息发送与客户端执行同步。考虑到项目注重“Agent 交互体验”，这一需求在路线图中的优先级可能上升。
- **预设 Agents 国际化适配**（[#982](https://github.com/netease-youdao/LobsterAI/issues/982)）：应用切换语言后，预设 Agents 名称/描述仍为中文。已定位问题，属于 UI 层国际化遗漏，后续修复概率较大。

## 7. 用户反馈摘要

- **配置持久化痛点**：用户表示“保护机制过于激进”，需要借助定时任务写回配置才能确保自定义内容不被重置，增加了使用复杂度（[#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) 评论区）。
- **微信使用体验不满**：用户认为当前“分段突发式”回复方式体验“有点糟糕”，期望更自然的实时交互（[#986](https://github.com/netease-youdao/LobsterAI/issues/986)）。
- **文档与实现不一致**：用户指出官方文档承诺的“按下新的组合键修改快捷键”功能未实现，属于明显的文档与实现脱节问题（[#983](https://github.com/netease-youdao/LobsterAI/issues/983)）。

## 8. 待处理积压

以下 Issue/PR 长期未得到有效跟进，提醒维护者关注：

- **[Issue #986] 微信回复同步问题**（[链接](https://github.com/netease-youdao/LobsterAI/issues/986)）：已 open 近 6 个月且被标记 stale，但用户反馈强烈，建议重新评估优先级。
- **[Issue #981] Web Search 启动失败**（[链接](https://github.com/netease-youdao/LobsterAI/issues/981)）：已 stale，属于影响功能可用的启动错误，建议排查 Windows 环境下的根因。
- **[Issue #982] 预设 Agents 国际化**（[链接](https://github.com/netease-youdao/LobsterAI/issues/982)）：已 stale，问题定位明确，修复成本较低，可考虑快速跟进。
- **[Issue #983] 快捷键修改功能未实现**（[链接](https://github.com/netease-youdao/LobsterAI/issues/983)）：文档承诺未兑现，影响信任度，建议明确是否实现或修改文档。
- **[PR #1277] dependabot 的 Electron 依赖升级**（[链接](https://github.com/netease-youdao/LobsterAI/pull/1277)）：已 open 近 6 个月，涉及 Electron 43→44 跨大版本更新，可能存在兼容性顾虑，建议安排评审或关闭。

---

**总结**：LobsterAI 今日呈现出高强度的迭代节奏，尤其在 OpenClaw 网关稳定性与 Windows 平台修复方面成果显著。社区最关注的自定义配置持久化问题虽有相关 PR 在途，但仍需更系统性的解决方案。建议维护者优先处理 #1006 与 #986 等呼声较高的 Issue，并清理长期 stale 问题，以提升用户信任度。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报 — 2026-09-23

## 1. 今日速览

过去24小时Moltis项目活跃度较低，主要活动集中在依赖维护层面。**Issues方面完全静止**（0条新开/活跃/关闭），**PR方面有1条依赖更新待合并**，无新版本发布。项目当前处于稳定维护期，无重大功能推进或社区讨论热点，整体健康度平稳，但社区互动需要关注。

## 2. 版本发布

**无。** 过去24小时没有新的Release发布。

## 3. 项目进展

**今日无合并或关闭的PR。** 这意味着没有新功能、修复或重构被合入主干，项目代码库状态与昨日一致。

唯一活跃的PR为依赖更新（见下节），尚未合并。项目整体在功能层面没有向前推进，处于等待维护者处理待合并PR的窗口期。

## 4. 社区热点

**今日无热门讨论。** 唯一的PR [#1284](https://github.com/moltis-org/moltis/pull/1284) 由dependabot自动创建，无评论、无用户互动（👍: 0）。Issues方面完全空白，说明社区当前没有通过Issues/PR讨论功能、提问或反馈问题。

社区活跃度处于低谷期，后续可以关注是否与周末或项目维护节奏有关。

## 5. Bug 与稳定性

**今日无新增Bug、崩溃或回归问题报告。** 项目在稳定性方面没有收到新的负面反馈，也没有相关修复PR产生。

## 6. 功能请求与路线图信号

**今日无用户提出的新功能请求。** 唯一的PR [#1284](https://github.com/moltis-org/moltis/pull/1284) 是依赖升级（wasmtime-wasi从36.0.9升到36.0.11），属于安全/维护性质的技术债更新，不包含新功能信号。

结合该项目近期的PR模式（依赖维护为主），可以推测项目当前处于功能开发间歇期，下一版本的功能方向尚不明确。

## 7. 用户反馈摘要

**今日无可提炼的用户反馈。** 由于没有新的Issue和PR评论，无法获得用户对当前版本的真实评价、痛点或使用场景反馈。建议维护者关注社区渠道（如Discussions/Discord等）中可能存在的非GitHub反馈。

## 8. 待处理积压

| 项目 | 类型 | 标题 | 创建时间 | 等待时长 | 状态 |
|------|------|------|----------|----------|------|
| [#1284](https://github.com/moltis-org/moltis/pull/1284) | 依赖更新PR | chore(deps): bump wasmtime-wasi from 36.0.9 to 36.0.11 | 2026-09-22 | 1天 | 待维护者review/合并 |

该PR由dependabot自动创建，涉及`wasmtime-wasi`依赖的补丁版本升级（36.0.9→36.0.11）。此类依赖更新通常包含bug修复和安全性补丁，建议维护者尽快review并合并，避免依赖版本滞后累积技术债。

---

**项目健康度总结：** 今日项目处于低活跃但稳定的状态。无新Bug、无功能变更、无社区互动，仅有一个依赖更新PR待处理。对于开源项目而言，连续多日低活跃可能暗示维护者带宽紧张或社区参与度下降，建议维护者关注并适时推动社区讨论。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-23

数据源：github.com/agentscope-ai/CoPaw | 统计窗口：过去 24 小时


## 1. 今日速览

过去 24 小时项目保持**高活跃度**：共产生 21 条 Issue 更新（新开/活跃 5 条、关闭 16 条）和 50 条 PR 更新（待合并 26 条、合并/关闭 24 条），无新版本发布。多条 2026 年 3 月至 7 月间的积压 Issue 被批量关闭，显示维护团队正在进行积压清理。今日值得关注的风险信号集中在 **Windows 沙箱 ACL 权限问题**（#7942/#7943，含一条严重安全风险）与 **LLM 超时后进程无法自恢复**（#7935）；功能侧则有**条件触发层插件**参考实现提交（#7939）和 47 个新测试文件的大批量测试覆盖提升 PR（#7941），整体健康度良好，开发与社区反馈均处于高位。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日无合并进主干的大功能 PR，但有 24 条 PR 被合并或关闭，其中值得注意的有：

- **#7933 fix(pet): preserve caller identity when resolving approvals** — 修复桌面宠物插件启用后所有工具审批均返回 `TypeError` 的问题，已合并。该问题影响所有 Console 工具审批操作，修复优先级高。链接：https://github.com/agentscope-ai/QwenPaw/pull/7933
- **#7938 test(unit): make the batch-3 lock and portability tests cross-platform** — 修复 #7911 合并后导致 release workflow 在两个 runner 上挂掉的回归，已合并。链接：https://github.com/agentscope-ai/QwenPaw/pull/7938
- **#7898 Fix/qwenpaw pet approval actor** — 修复 `qwenpaw-pet` 插件导致 Console 工具审批全部失败的问题（HTTP 500），标签为 Close-and-review-later，已关闭。链接：https://github.com/agentscope-ai/QwenPaw/pull/7898

此外，多条约 2026 年 3 月至 6 月的 PR（#1512、#3819、#4938、#4955）和 Issue 在今日被批量关闭，疑似与项目迁移/归档或仓库名称变更（QwenPaw → CoPaw）相关，建议维护者确认这些关闭是否均有明确结论。

**测试覆盖冲刺进展**：#7941（OPEN）提交了第三批单元测试，新增 47 个测试文件、2720 个新用例，将语句覆盖率从 70.51% 提升至 73.79%（+3.28pp），是目前提升覆盖率的持续努力。链接：https://github.com/agentscope-ai/QwenPaw/pull/7941


## 4. 社区热点

今日讨论最活跃的 Issue（按评论数）：

- **#6318 支持按 conversation 级别指定模型**（8 条评论，已关闭） — 用户希望 agent 设默认模型、新建对话继承默认值、但允许单对话手动覆盖。关闭状态建议核实是否有对应功能落地或另有安排。链接：https://github.com/agentscope-ai/QwenPaw/issues/6318
- **#4036 Adding a model requires too many steps and clicks**（7 条评论，已关闭） — 用户抱怨添加新模型需要 5 步往返操作，UI 流程过于繁琐，今日关闭。链接：https://github.com/agentscope-ai/QwenPaw/issues/4036
- **#7850 Driver card policy lost update**（3 条评论，OPEN） — 后台 `reload_driver` 以 read-modify-write 方式覆写并发策略更新，属并发一致性缺陷。链接：https://github.com/agentscope-ai/QwenPaw/issues/7850
- **#7935 LLM Request timed out 后永不自动恢复**（3 条评论，OPEN） — 2.2.1 版本一旦出现超时，进程持续失败直至手动重启，属严重稳定性问题。链接：https://github.com/agentscope-ai/QwenPaw/issues/7935
- **#7549 Volcengine Ark Responses API 拒绝以 assistant 文本结尾的请求**（3 条评论，OPEN） — 输入以 assistant 消息结尾时 API 返回 400 "MissingParameter: partial"，影响特定 provider 的兼容性。链接：https://github.com/agentscope-ai/QwenPaw/issues/7549

社区最集中的诉求是 **模型配置体验优化**——多个 Issue（#6318、#4036、#5182、#3251）都指向模型管理的配置复杂、入口分散、无法在 UI 修改 base URL 等问题。其次是**模型自动降级/回退**（#4882、#5351、#5572、#3789），有用户明确提到 `RoutingChatModel` 类存在但从未被实例化，说明该功能仍停留在代码层面未接通，需求呼声持续数月。


## 5. Bug 与稳定性

按严重程度排列：

**🔴 严重（可能导致数据丢失或服务不可用）**

- **#7935 LLM Request timed out 后永不自动恢复，必须重启进程**（2.2.1，OPEN） — 一旦超时，所有后续请求持续超时失败，长任务/批处理场景影响极大。目前**无对应 fix PR**。链接：https://github.com/agentscope-ai/QwenPaw/issues/7935
- **#7942/#7943 Windows 沙箱对 drive-root workspace 写入可继承 ACL，可能锁死整个卷**（OPEN） — 若 workspace 设为 `C:\`，整个卷都会成为 grant root，可能导致系统级权限灾难。两条为同一问题（#7942 标记 CLOSED、#7943 保留 OPEN），无 fix PR。链接：https://github.com/agentscope-ai/QwenPaw/issues/7943

**🟠 高（功能不可用或数据异常）**

- **#7850 Driver card policy lost update**（OPEN） — 并发场景下策略写入被覆写，属于隐式数据丢失。无 fix PR。链接：https://github.com/agentscope-ai/QwenPaw/issues/7850

**🟡 中（兼容性或体验问题）**

- **#7549 Volcengine Ark 拒绝以 assistant 文本结尾的请求**（OPEN） — 400 "MissingParameter: partial"，特定 provider 请求构造兼容性问题。无 fix PR。链接：https://github.com/agentscope-ai/QwenPaw/issues/7549
- **#7771 上下文压缩后历史列表出现无意义空标签**（CLOSED） — 如 "Compact Chat Session Title"，体验问题。链接：https://github.com/agentscope-ai/QwenPaw/issues/7771

**🟢 低（已修复或有修复 PR）**

- **#7933 pet 插件致审批全部 HTTP 500** — 已合并修复。链接：https://github.com/agentscope-ai/QwenPaw/pull/7933
- **#7938 第三批测试导致 release workflow 挂掉** — 已合并修复。

值得警惕的是，今日新开的 Bug 中多数集中在 **Windows 沙箱** 与 **LLM 超时恢复**两个核心稳定性领域，且均无 fix PR 跟进，建议维护者优先分配资源。


## 6. 功能请求与路线图信号

- **条件触发层插件（事件任务）**（#7939，OPEN）— 社区开发者 @Mcpy 以插件形式实现了外部事件触发 agent 推理与通知（与 cron 互补），**参考实现已开源**（https://github.com/Mcpy/qwenpaw-event-trigger），涉及 Core/Console/Skills 三个组件。这是今日最完整的社区贡献，很可能被官方采纳或作为插件生态示范。链接：https://github.com/agentscope-ai/QwenPaw/issues/7939
- **模型自动降级/回退链**（#4882、#5351、#5572、#3789，均 CLOSED）— 多条相关需求今日集中关闭，但 #5351 明确指出 `RoutingChatModel` 从未被实例化，说明核心机制尚未真正启用。建议确认关闭原因：是功能已实现还是不再考虑？
- **conversation 级别模型指定**（#6318，CLOSED）— 比 agent 级绑定更细粒度的模型控制，今日关闭，需确认是否已有替代方案。
- **统一模型配置（类型/输入输出支持）**（#5182，CLOSED）— 希望统一向量、文本、音视频模型配置，属于长期配置架构优化信号。
- **持久化分页对话历史**（#7931，PR OPEN）— 新增 SQLite transcript 存储与分页加载，属于 Console 体验大改进，可能进入 v2.2.2 或后续版本。链接：https://github.com/agentscope-ai/QwenPaw/pull/7931


## 7. 用户反馈摘要

- **模型配置流程是最大痛点**：#4036 详细描述了添加一个模型需要"设置 → Provider 卡片 → 填 API Key → 返回列表 → 点 Models → Add Model → 填 ID 和 Name → 再返回"，用户直言"way too complicated"。该 Issue 已于今日关闭，希望关闭意味着改进已排期或完成。
- **前端 UI 能力受限**：#3251 指出 pip 安装的 1.0.2 版本无法在页面上修改 provider 的 base URL，只能改配置文件，对非技术用户不友好。
- **子代理任务可见性差**：#4923（CLOSED）反馈 `spraw_subagent` 启动的子任务运行时无法查看进展、执行完后内容不完整，影响多 agent 协作的信任感。
- **记忆/人格文件被误覆盖**：#4020（CLOSED）描述了模型偶尔绕过 `edit_file` 约定直接 `write_file` 覆盖 MEMORY.md / AGENTS.md / SOUL.md，导致记忆清空、人格配置损坏，用户明确要求工具层强制只读保护。
- **任务取消能力缺失**：#3424（CLOSED）用户询问如何取消后台 subagent 长任务，`multi_agent_collaboration` 中没有 cancel 命令——这属于 agent 生命周期管理的基础能力缺口。
- **安全敏感点**：#7898/#7933 中社区连续报告 pet 插件导致审批功能崩溃，虽然已快速修复，但也反映出插件生态对核心路径的侵入性需要更严谨的隔离与测试。
- **模型回退诉求反复出现**：至少 4 个独立 Issue（#3789、#4882、#5351、#5572）提及同一需求，且用户描述了明确场景（配额耗尽、超时、限流时自动切换备选模型），是社区呼声最高的功能之一。


## 8. 待处理积压

**长期未合并的 PR**

- **#6808 fix(console): show custom profile markdown files**（2026-08-07 创建，OPEN，first-time-contributor）— 后端已返回自定义人格文件但前端被过滤，修复简单但已搁置近 7 周。链接：https://github.com/agentscope-ai/QwenPaw/pull/6808
- **#7409 fix(agents): drop empty assistant text blocks**（2026-08-30 创建，OPEN）— 去除模型回复中仅含 reasoning、文本为空的冗余 block，避免后续请求反复重放空文本。搁置超 3 周。链接：https://github.com/agentscope-ai/QwenPaw/pull/7409
- **#7835 fix(memory): stop leaking auto-memory-recall payload to channels**（2026-09-17 创建，OPEN）— 自动记忆召回痕迹泄漏至 Feishu 等外部渠道，待 review。链接：https://github.com/agentscope-ai/QwenPaw/pull/7835

**长期未响应的 Issue**

- **#4882 / #5351 / #5572 模型自动降级** — 多条功能请求自 4 月至 6 月提出，核心机制 `RoutingChatModel` 已有代码但未接线，今日虽批量关闭，但**缺乏公开的实现说明或迁移指引**，用户可能仍处于"需求已关闭、功能不可用"的困惑状态。
- **#4020 MEMORY/AGENTS/SOUL 文件强制只读** — 自 2026-05-03 提出，涉及用户数据安全，今日关闭。若未在工具层实现只读保护，建议在关闭评论中明确原因。

---

**维护者关注建议**（按优先级）：
1. 立即跟进 #7943（Windows 沙箱卷级 ACL 风险）与 #7935（超时无法自恢复）
2. 确认 #6318、#4882 等批量关闭的 Issue 是否都有明确结论，避免社区诉求"被静默关闭"
3. 加速 review #7835 与 #7409 两条搁置中的 fix PR

:::
