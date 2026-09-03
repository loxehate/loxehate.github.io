---
title: OpenClaw 生态日报
published: 2026-08-06
report: ai-agents
tags:
  - radar
  - AI
---
# OpenClaw 生态日报 2026-08-06

> Issues: 224 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-06 02:29 UTC

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

# OpenClaw 项目动态日报 | 2026-08-06

> 数据来源：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw) | 统计窗口：过去 24 小时

---

## 1. 今日速览

- **整体活跃度：极高。** 过去 24 小时产生 224 条 Issue 更新（新开/活跃 187，关闭 37）和 500 条 PR 更新（待合并 439，合并/关闭 61），日均合并吞吐约 61 个 PR，属于非常活跃的开源项目节奏。
- **无新版本发布**，但维护团队正在集中清理近期回归：今日关闭的 37 个 Issue 中包含多个 P1 级 `already-fixed` 修复（Telegram 论坛黑洞、CLI 慢启动、投递镜像死循环、cron 子代理聚合等），说明上一次发版引入的回归正在被逐步消化。
- **稳定性隐患仍突出。** 展示的 50 条热门 Issue 中约 14 条为 P1 未修复，且大量条目同时挂有 `needs-maintainer-review` / `needs-product-decision` 标签，决策与修复链路存在积压风险。
- **两大社区热点：** Realtime voice 状态无界增长（59 条评论）与 Memory 来源信任标记（27 条评论、悬置 6 个月）分别代表"资源治理"与"安全信任"两类最受关注的需求。
- **健康度警报：** PR 待合并队列高达 439 条；部分长期 P1 回归（如 Telegram 重复回复 #86519，已 2.5 个月）仍无 fix PR，修复速度与问题爆发速度存在差距。

---

## 2. 版本发布

无（过去 24 小时无新 Release）。

---

## 3. 项目进展

过去 24 小时 **61 个 PR 合并/关闭、37 个 Issue 关闭**。数据快照未提供已合并 PR 明细，但根据关闭的 Issue 与处于合并临界状态的 PR，可确认以下实质进展：

**已确认修复并关闭的重点问题：**

| Issue | 级别 | 内容 |
|---|---|---|
| [#91564](https://github.com/openclaw/openclaw/issues/91564) | P1 | Telegram 特定 forum topic 在 stuck-session 恢复后成为永久入站黑洞 → `already-fixed` |
| [#114615](https://github.com/openclaw/openclaw/issues/114615) | P1 | CLI 每次调用多付 ~6s 插件图初始化（jiti），已修复 |
| [#100360](https://github.com/openclaw/openclaw/issues/100360) | P1 | message-tool 投递镜像侧分支导致 HTTP 400 死循环、会话静默死亡，已修复 |
| [#92369](https://github.com/openclaw/openclaw/issues/92369) | P2 | cron 隔离会话中子代理编排结果无法聚合 → `already-fixed` |
| [#112278](https://github.com/openclaw/openclaw/issues/112278) | P2 | OTel 根 span 未继承 diagnostic trace context（关联 PR 已开） |
| [#119534](https://github.com/openclaw/openclaw/issues/119534) | P3 | 内置技能以相对路径引用自身支持文件导致 `read` 失败 |

**处于合并临界状态（`ready for maintainer look` + `proof: sufficient`）的高价值 PR：**

- [#117528](https://github.com/openclaw/openclaw/pull/117528)：修复 tasks JSON 标志在嵌套命令中被静默丢弃，保护脚本兼容性
- [#113515](https://github.com/openclaw/openclaw/pull/113515)：QMD 内存搜索在 docid 失效后保留 `qmd://` 文件提示（修复 #113041）
- [#115507](https://github.com/openclaw/openclaw/pull/115507)：为重试回调增加 `apiKeyIndex` 与 `attemptNumber`（#102938）
- [#117321](https://github.com/openclaw/openclaw/pull/117321)：拒绝畸形 base64 MCP App 资源 blob，防止损坏 HTML 被渲染
- [#119666](https://github.com/openclaw/openclaw/pull/119666)：防止远端 memory/embedding 错误泄露 Bearer 凭据（安全修复）

**路线图级特性进入合并通道：**

- [#112865](https://github.com/openclaw/openclaw/pull/112865) / [#112896](https://github.com/openclaw/openclaw/pull/112896)：snapshot 恢复点（capture + admit，RFC #46）——若合并将显著增强会话恢复与故障续跑能力
- [#106832](https://github.com/openclaw/openclaw/pull/106832)：向 `sessions.list` 暴露会话分类事实（classification/agentId 等），为上层 UI 提供基础设施

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 诉求分析 |
|---|---|---|---|
| 1 | [#116201](https://github.com/openclaw/openclaw/issues/116201) Realtime voice 会话保留无界 provider/consult 状态（P1） | 59 | 慢/停滞/突发性 provider 行为下资源无硬性所有权边界，社区最关心的资源治理与稳定性问题；热度最高但尚无 fix PR |
| 2 | [#7707](https://github.com/openclaw/openclaw/issues/7707) Memory 按来源做信任标记（P2） | 27 | 防记忆投毒：恶意指令藏在网页/第三方 Skill 中污染后续行为。自 2 月提出，跨 6 个月仍卡在 product/security review |
| 3 | [#86519](https://github.com/openclaw/openclaw/issues/86519) Telegram 重复回复 2-10x 回归（P1） | 13 | 用户实测 5.12→5.20 恶化、5.22 减轻但未修复，对版本质量信心受损 |
| 4 | [#51429](https://github.com/openclaw/openclaw/issues/51429) 工作路径被硬编码 `/Users/wangtao` 并合入发布（P2） | 12 | 中文用户直接质疑代码审查与发布流程，是今日情绪最负面的反馈 |
| 5 | [#6615](https://github.com/openclaw/openclaw/issues/6615) exec-approvals 增加 denylist（P2，👍8） | 11 | "放行一切、仅拦截危险命令"的安全策略灵活性诉求，已关联 PR |

**热点 PR：** [#119516](https://github.com/openclaw/openclaw/pull/119516)（CLI 更新失败后恢复受管 gateway，P1）与 [#119782](https://github.com/openclaw/openclaw/pull/119782)（允许 gateway 运行中创建备份）反映运维侧对"更新/备份操作安全"的关注。

---

## 5. Bug 与稳定性

### 高危（P1，均无 fix PR）

**会话状态与消息丢失类（最大 Bug 集群）：**
- [#116201](https://github.com/openclaw/openclaw/issues/116201)：Realtime voice 状态无界增长
- [#117609](https://github.com/openclaw/openclaw/issues/117609)：embedded-assistant 阶段不做瞬时错误重试，长任务整轮死亡
- [#96827](https://github.com/openclaw/openclaw/issues/96827)：`message_tool_only` 模式投递后不终止，级联自回复
- [#119143](https://github.com/openclaw/openclaw/issues/119143) / [#118018](https://github.com/openclaw/openclaw/issues/118018) / [#118625](https://github.com/openclaw/openclaw/issues/118625)：子代理完成结果在父会话超时/压缩/生命周期替换期间丢失或投递到错误生命周期
- [#117358](https://github.com/openclaw/openclaw/issues/117358)：turn 后压缩忽略压缩/重置边界，延迟已完成回复
- [#119454](https://github.com/openclaw/openclaw/issues/119454)：stuck-session 恢复因泄漏的 idle embedded run 自我抑制（`observe_only` 死循环），通道卡死至重启
- [#119401](https://github.com/openclaw/openclaw/issues/119401)：DM 场景 `NO_REPLY` 无条件抑制，`silentReply` 策略失效

**通道类：**
- [#86519](https://github.com/openclaw/openclaw/issues/86519)：Telegram 重复回复回归（跨 2 个版本）
- [#115914](https://github.com/openclaw/openclaw/issues/115914)：WhatsApp 已接受 turn 静默数十分钟，无有界 liveness 兜底

**性能/健壮性类：**
- [#53540](https://github.com/openclaw/openclaw/issues/53540)：LLM 生成大参数工具调用时触发 "Network connection lost"
- [#90098](https://github.com/openclaw/openclaw/issues/90098)：Control UI/网关大附件导致栈溢出（`RangeError: Maximum call...`）

**安全类：**
- [#116242](https://github.com/openclaw/openclaw/issues/116242)：Codex 监督脱敏仅覆盖 4 类 token 前缀，Google/AWS/JWT/GitHub fine-grained 凭据可泄露给运行时（核心日志脱敏覆盖 ~68 类，形成巨大落差）

### 中危（P2）
- [#44134](https://github.com/openclaw/openclaw/issues/44134)：Google Antigravity 因工具 schema 高频重载被误判滥用并封号
- [#79263](https://github.com/openclaw/openclaw/issues/79263)：v4.29+ CLI local-transport 不再读取 ~/.env，破坏 shell 冒烟测试（安全相关）
- [#116691](https://github.com/openclaw/openclaw/issues/116691)：openai-responses 调用火山引擎长对话报缺 `input.status`（回归）
- [#119557](https://github.com/openclaw/openclaw/issues/119557)：chat delta 150ms 节流无尾部 flush，被扣留 chunk 等待下一事件
- [#91892](https://github.com/openclaw/openclaw/issues/91892)：cron 任务在 `model_call:stream_progress` 上永久卡死

### 今日已修复关闭
[#91564](https://github.com/openclaw/openclaw/issues/91564)、[#114615](https://github.com/openclaw/openclaw/issues/114615)、[#100360](https://github.com/openclaw/openclaw/issues/100360)、[#92369](https://github.com/openclaw/openclaw/issues/92369)、[#112278](https://github.com/openclaw/openclaw/issues/112278)、[#119534](https://github.com/openclaw/openclaw/issues/119534)

---

## 6. 功能请求与路线图信号

**最可能进入下一版本（已有 PR 或进入合并通道）：**

- **Snapshot 恢复点**（[PR #112865](https://github.com/openclaw/openclaw/pull/112865) / [#112896](https://github.com/openclaw/openclaw/pull/112896)）：RFC #46 落地，是当前最明确的路线图特性，直接服务于会话恢复与故障续跑
- **Memory 信任标记**（[#7707](https://github.com/openclaw/openclaw/issues/7707)）：27 评论的高热度安全需求，已挂 security-review，有望在记忆安全专题下被排期
- **Discord 语音会话文本路由**（[#53562](https://github.com/openclaw/openclaw/issues/53562)）：`sessionChannelId` 功能已有 PR 关联
- **Followup 队列跨重启持久化**（[PR #82572](https://github.com/openclaw/openclaw/pull/82572)）：修复重启丢消息隐患，等待作者更新

**社区呼声较高但尚无实现迹象：**

- [#6615](https://github.com/openclaw/openclaw/issues/6615) exec-approvals denylist（👍8）
- [#53654](https://github.com/openclaw/openclaw/issues/53654) Discord 编辑/删除事件支持（👍3）
- [#15022](https://github.com/openclaw/openclaw/issues/15022) 合并交错文本块为单条消息
- [#16555](https://github.com/openclaw/openclaw/issues/16555) 投递队列 TTL/过期
- [#13597](https://github.com/openclaw/openclaw/issues/13597) AWS 部署文档（EC2/ECS/Lambda，👍4）
- [#50205](https://github.com/openclaw/openclaw/issues/50205) Gemini API 请求标签（GCP 成本归因）
- [#60275](https://github.com/openclaw/openclaw/issues/60275) 每会话心跳调度
- [#8892](https://github.com/openclaw/openclaw/issues/8892) TUI `--agent` 选择会话代理（👍3）
- [#54578](https://github.com/openclaw/openclaw/issues/54578) agent 树可视化命令
- [#118666](https://github.com/openclaw/openclaw/issues/118666) 在 `inbound_meta.v2` 暴露 Discord 线程 ID（语音笔记回复路由）

---

## 7. 用户反馈摘要

**最强烈的负面情绪：**

- **发布质量质疑**（[#51429](https://github.com/openclaw/openclaw/issues/51429)）：硬编码工作路径 `/Users/wangtao` 被合并发布，用户讽刺"这位 wangtao 是谁？"——直接暴露审查流程漏洞。
- **回归修复缓慢**（[#86519](https://github.com/openclaw/openclaw/issues/86519)）：用户提供跨版本严重度数据（8-10x → 2-3x），结论是"降级了但没修好"。
- **无辜封号**（[#44134](https://github.com/openclaw/openclaw/issues/44134)）：Google Antigravity 用户因工具 schema 高频重载被误判滥用封号，属第三方 provider 兼容性事故。

**高频痛点："静默失败"比报错更伤人：**

- [#115914](https://github.com/openclaw/openclaw/issues/115914)：WhatsApp 回合静默数十分钟，agent 内部却在活动
- [#116348](https://github.com/openclaw/openclaw/issues/116348)：群聊兜底文案 "No reply was generated" 刷屏且无法关闭/限流
- [#92672](https://github.com/openclaw/openclaw/issues/92672)：rate-limit 时静默挂起 30 分钟，用户只见"卡住"零提示（该 RFC 已关闭，`not-repro-on-main`，但所描述体验与上述两个 Issue 相互印证）

**正向信号：**

- 多个 `already-fixed` 关闭获得社区确认，尤其 [#92369](https://github.com/openclaw/openclaw/issues/92369)（cron 子代理聚合）与 [#100360](https://github.com/openclaw/openclaw/issues/100360)（投递镜像死循环），说明"报障 → 修复 → 关闭"闭环在加速。
- 运维侧对 [#119782](https://github.com/openclaw/openclaw/pull/119782)（运行中备份）、[#13597](https://github.com/openclaw/openclaw/issues/13597)（AWS 部署文档）的诉求表明企业级采用意愿在上升。

---

## 8. 待处理积压

**急需维护者关注的长期条目：**

| 条目 | 悬置时长 | 状态 | 建议 |
|---|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) Memory 信任标记 | 6 个月（2/3 起） | 27 评论，卡在 maintainer/product/security 三方 review | 指定 owner 推进安全评审 |
| [#86519](https://github.com/openclaw/openclaw/issues/86519) Telegram 重复回复 | 2.5 个月（5/25 起） | P1 回归，无 fix PR | 建议提升为发布阻断级 |
| [#116201](https://github.com/openclaw/openclaw/issues/116201) Realtime voice 无界状态 | 7 天（59 评论） | 热度最高却无维护者结论 | 尽快给出 triage 结论 |
| [#6615](https://github.com/openclaw/openclaw/issues/6615) exec-approvals denylist | 6 个月（👍8） | 已关联 PR 但仍挂 product-decision | 低风险高价值，可快速决策 |
| 2 月积压特性批（[#13597](https://github.com/openclaw/openclaw/issues/13597)、[#15022](https://github.com/openclaw/openclaw/issues/15022)、[#16555](https://github.com/openclaw/openclaw/issues/16555)） | ~6 个月 | 均等待产品决策 | 建议批量 triage 或明确暂缓 |

**结构性风险提醒：**

- **PR 队列积压严重：** 439 条待合并对 61 条/日合并吞吐，按当前速度需约 7 天消化，且新 PR 持续涌入。建议关注维护者带宽。
- **子代理生命周期 Bug 集群：** [#119143](https://github.com/openclaw/openclaw/issues/119143)、[#118018](https://github.com/openclaw/openclaw/issues/118018)、[#118625](https://github.com/openclaw/openclaw/issues/118625)、[#117358](https://github.com/openclaw/openclaw/issues/117358) 四者高度关联（父会话超时/压缩/替换期间子代理结果丢失），建议按单一根因专题统一处理，而非逐个救火。
- **`clawsweeper-recovery-stuck` 标签：** 出现在 [#7707](https://github.com/openclaw/openclaw/issues/7707)、[#79263](https://github.com/openclaw/openclaw/issues/79263)、[#96827](https://github.com/openclaw/openclaw/issues/96827)、[#116242](https://github.com/openclaw/openclaw/issues/116242)、[#119454](https://github.com/openclaw/openclaw/issues/119454)、[#8812](https://github.com/openclaw/openclaw/issues/8812) 及 PR [#118430](https://github.com/openclaw/openclaw/pull/118430) 上，暗示 ClawSweeper 自动分诊流程自身可能卡死，建议核查 bot 运行状态。

---

*报告完。本日报仅基于提供的数据快照生成，所有结论以 GitHub 链接标注的原始条目为准。*

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告

**报告日期：** 2026-08-06
**覆盖项目：** OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、CoPaw、Moltis（9 个）

---

## 一、生态全景

个人 AI 助手/自主智能体开源生态已进入"核心成熟、外围分化"的阶段：以 OpenClaw 为内核底座（单日 224 条 Issue、500 条 PR 更新），一批派生项目（Zeroclaw、IronClaw、CoPaw、NanoClaw、PicoClaw 等）正围绕特定渠道、部署形态与安全治理快速建立差异化壁垒。生态整体处于高频迭代期，但普遍面临共性瓶颈：**PR 合并速度跟不上贡献速度**（仅 OpenClaw、CoPaw 两家待合并队列即超 470 条），维护者带宽成为全生态最稀缺的资源。安全与稳定性是当前投入最密集的方向——SSRF 防护、凭据泄露修复、MCP 错误语义、子代理生命周期可靠性在多个仓库同时涌现。与此同时，企业级信号明显增强：配置即代码、账户隔离、渠道正确性（Slack/Telegram/WhatsApp/Signal）正在取代单纯的功能堆叠，成为社区最关心的议题。

---

## 二、各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | 合并/关闭 | 待合并 | Release | 健康度评估 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 224（新开/活跃 187，关闭 37） | 500（合并/关闭 61） | 61 PR / 37 Issue | 439 | 无 | 🔴 极度活跃但 PR 积压严重，P1 回归与 `needs-maintainer-review` 标签堆积，决策链路存在风险 |
| **NanoBot** | 4（全开放） | 14（合并/关闭 6） | 6 PR | 8 | 无 | 🟢 健康，安全修复密度高，1 项 p1 凭据泄露修复待合并，功能合入节奏良好 |
| **Zeroclaw** | 17（全开放） | 50（关闭 1） | 1 PR | 49 | 无 | 🟡 v0.8.5 冻结期，合并近乎停滞；24/49 个 PR 标 `needs-author-action`，稳定化目标（8/30）承压 |
| **PicoClaw** | 0 | 4（关闭 1） | 1 PR | 3 | 无 | 🟡 开发推进但社区互动几乎为零；存在阻断性构建 Bug 待修 |
| **NanoClaw** | 2 | 12（合并/关闭 2） | 2 PR | 10 | 无 | 🟡 贡献者活跃但维护响应慢；两个高影响 Bug 已滞留 80/103 天 |
| **IronClaw** | 6（活跃） | 50（合并/关闭 18） | 18 PR | 32 | **v1.1.0-rc.1** | 🟡 发布前夕密集收尾；2 个 Slack 集成回归 Bug 无 fix PR，需在正式版前处理 |
| **LobsterAI** | 2（新增） | 13（合并/关闭 12） | 12 PR | 1 | **2026.8.5** | 🟢 稳定迭代；但 #1200 修复 PR 滞留 4 个月，提示词控制权诉求上升 |
| **CoPaw** | 15（活跃 13，关闭 2） | 50（合并/关闭 20） | 20 PR | 30 | 无 | 🟡 功能推进快（LLM fallback 落地），但 2 个 P0（MCP 失效、tool 消息 400）未修复 |
| **Moltis** | 0 | 0 | — | — | 无 | ⚫ 无活动 |

**合并吞吐对比：** OpenClaw 单日合并 61 个 PR，是 CoPaw（20）、IronClaw（18）的 3 倍以上，是 NanoBot（6）、NanoClaw（2）、Zeroclaw（1）的 10-60 倍。但 OpenClaw 439 条待合并队列也意味着其吞吐优势已被涌入速度抵消。

---

## 三、OpenClaw 在生态中的定位

**1. 事实上的内核与参照系。** OpenClaw 的社区规模（单日 224 Issue / 500 PR）是第二梯队（Zeroclaw、IronClaw、CoPaw 各约 50 PR）的 10 倍。多个项目从命名（Claw 后缀）到架构（channel→agent→tool 的管道模型、session 生命周期、cron 子代理）均明显沿袭 OpenClaw 的设计范式。其 RFC 机制（如 #46 snapshot 恢复点）是生态中少有的、可追溯的路线图治理方式。

**2. 技术路线差异：广度优先，一体化内核。** OpenClaw 走"全渠道、全模型、全工具"的通用底座路线——Telegram/WhatsApp/Discord/cron/voice 一体的 receiver 框架加上插件式 MCP/技能体系。相较之下，派生产品主动选择了"窄而深"的差异化：IronClaw 聚焦 Slack 企业工作流、LobsterAI 锁定桌面端与 NIM 渠道、CoPaw 深耕 Qwen/DashScope 生态与 DeepSeek 兼容性。

**3. 社区规模与健康度反差。** OpenClaw 拥有生态中最活跃的贡献者网络（日均 61 PR 合并），但也积累最深的治理债：439 条 PR 待合并、14+ 条 P1 未修复、子代理生命周期 Bug 集群（4 个高度关联 Issue）、以及 `clawsweeper-recovery-stuck` 标签暗示自动分诊流程自身异常。**社区规模大但维护者带宽已接近极限**，这为派生项目提供了生存空间——它们可以通过更聚焦的 scope 获得更快的决策与合入节奏。

**4. 对生态的战略价值。** OpenClaw 承担了"探路者"角色：Realtime voice 状态治理、Memory 信任标记、snapshot 恢复点等前沿议题均由它率先定义和讨论，为全生态提供问题清单和方案原型。其 P1 回归（Telegram 重复回复滞留 2.5 个月）也警示生态：核心底座的不稳定会被所有依赖方放大。

---

## 四、共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **模型路由与故障转移** | CoPaw、PicoClaw、Zeroclaw | CoPaw 落地 LLM 模型 fallback（#5597/#5598）并收到"按任务复杂度自动选模型"诉求（#6436）；PicoClaw 推动可配置回退链（#3200）；Zeroclaw 用户对 OpenRouter 流式请求丢失 `provider_extra` 表达成本敏感（#9775）。模型容错正从"重试"升级为"路由策略" |
| **MCP 生态可靠性与安全** | CoPaw、NanoBot、OpenClaw | CoPaw 遭遇 MCP 工具周期性失效（P0，#6732）和超时不可配（#6724）；NanoBot 暴露 MCP 业务错误被当作成功导致 agent 空等（#5237）；OpenClaw 拒绝畸形 base64 MCP blob 防 HTML 注入（#117321）。MCP 是各家的核心扩展机制，但其错误语义、生命周期与安全边界远未成熟 |
| **凭据泄露与 SSRF 防护** | NanoBot、Zeroclaw、OpenClaw | NanoBot 修复带凭据 URL 转发给 Jina reader 的泄露风险（#5258）；Zeroclaw 两个 SSRF 修复滞留 30+ 天（#8713、#8826）；OpenClaw 阻止远端 memory 错误泄露 Bearer 凭据（#119666）并发现 Codex 监督脱敏覆盖仅 4 类 token 前缀（#116242）。安全已成为 agent 工具链的共性短板 |
| **子代理/多 Agent 生命周期** | OpenClaw、NanoClaw、CoPaw | OpenClaw 出现 4 个关联 Bug（父会话超时/压缩期间子代理结果丢失，p1）；NanoClaw 禁用内置 SendMessage 以恢复 agent 间通信（#3187）；CoPaw 子代理 fork 失败仍误报完成（#6722）。多 Agent 编排的可靠性是全生态最大技术债 |
| **渠道集成正确性** | IronClaw、OpenClaw、NanoBot、NanoClaw、Zeroclaw | IronClaw Slack 执行结果投递到 Telegram 造成跨渠道信息泄露（#7249）；OpenClaw Telegram 重复回复跨 2 个版本未根治（#86519）；NanoBot WhatsApp 音频"能收不能发"（#5149）；NanoClaw Signal 附件容器内不可达（#2528）；Zeroclaw Signal 隐私模式静默丢消息（#9774）。渠道适配仍是事故高发区 |
| **配置治理与可审计性** | IronClaw、LobsterAI、Zeroclaw | IronClaw 用户强烈诉求 Configuration-as-Code（#3036，"no schema, no diff, no audit trail"）；LobsterAI 技能开关按目录名写入但运行时按 frontmatter name 匹配导致静默失效（#2441）；Zeroclaw 通过 RFC #6808 推动工作流自动化以缓解维护者负担。配置散乱是阻碍企业级采用的直接原因 |

---

## 五、差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|---|---|---|---|
| **OpenClaw** | 通用 agent 内核：多渠道 receiver、cron、realtime voice、memory、快照恢复 | 开发者/自托管者、追求全功能的技术用户 | 一体化单体 + 插件/MCP 扩展；RFC 驱动路线图；社区最大、问题也最全 |
| **IronClaw** | Slack 企业工作流中枢、扩展中心、任意托管 MCP 服务器、跨渠道持久附件 | 企业团队（Railway/Slack 生产部署） | 宿主侧标准化消息框架（16 个核心操作）、沙箱多平台 profile（Docker/Railway） |
| **CoPaw** | 阿里 Qwen/DashScope 生态深度整合、LLM fallback、DeepSeek 思考模式兼容 | 国内云生态用户、中文开发者 | AgentScope 框架血缘；Console 配置 UI 完善；与 Qwen 系模型强绑定 |
| **LobsterAI** | 桌面端应用（网易有道）、NIM 渠道、每日签到/活动体系、企业级账户隔离 | 桌面端消费者 + 企业自托管 | Windows 桌面壳 + 本地网关；重视 UI/交互打磨而非 agent 能力扩展 |
| **Zeroclaw** | 安全加固（WebAuthn、SSRF、shell 策略）、SOP 子系统、治理流程重构 | 安全敏感的中型团队 | v0.8.5 稳定化冻结期；RFC 治理密度全生态最高；维护者决策队列机制 |
| **NanoBot** | WebUI 体验（临时会话、PTY 终端、metasearch 聚合搜索） | 重视交互与隐私的轻量用户 | 快速迭代型；合入周期短；pre-1.0 阶段功能边界仍在扩展 |
| **NanoClaw** | 轻量 fork：agent-runner 消息通道、渠道附件结构化、LXC/Proxmox 安装 | 容器化/自托管新手 | 与 OpenClaw 血缘最近；修复密度高但维护者瓶颈明显 |
| **PicoClaw** | 认证体验（Anthropic OAuth setup-token）、模型回退链 | CLI 重度用户、企业安全认证场景 | 开发活跃但社区静默；主仓库与 docs 分叉风险 |
| **Moltis** | — | — | 停滞，无参考价值 |

---

## 六、社区热度与成熟度

**第一梯队 · 高热度快速迭代（每日 PR 更新 ≥50）：** OpenClaw、Zeroclaw、IronClaw、CoPaw。其中 OpenClaw 属于"规模驱动"的持续高压迭代，Zeroclaw 处于"冻结期高产出低合入"的失衡状态，IronClaw 与 CoPaw 则处于版本冲刺/功能收口阶段。

**第二梯队 · 中等活跃稳定推进（每日 PR 更新 4-14）：** NanoBot、LobsterAI、NanoClaw。NanoBot 与 LobsterAI 合入节奏健康，属于"小而稳"型；LobsterAI 已有 2026.8.5 正式版本发布，进入稳定迭代轨道。

**第三梯队 · 低活跃/社区静默：** PicoClaw（代码有产出但社区反馈为零，0 Issue）、Moltis（完全停滞）。

**成熟度判断：** OpenClaw 和 LobsterAI 是仅有的两个已形成稳定版本发布节奏的项目（OpenClaw 日均 61 PR 合入、LobsterAI 有正式 Release），前者是"功能先行"的成熟度，后者是"产品化先行"的成熟度。IronClaw 以 RC 版本进入质量巩固阶段，Zeroclaw 明确进入稳定化冻结期。NanoClaw 与 PicoClaw 的瓶颈不在代码而在于维护者带宽——**贡献者活跃、闭环能力不足**是二线项目最典型的特征。

---

## 七、值得关注的趋势信号

**1. "静默失败"成为跨项目第一用户体验杀手。** OpenClaw（WhatsApp 静默数十分钟、rate-limit 静默挂起）、NanoBot（MCP 错误空等超时）、Zeroclaw（SOP 文档承诺的能力静默不加载）、IronClaw（Slack 执行结果静默投递到 Telegram）——四个项目不约而同地在同一问题上栽跟头。对开发者而言，**在 agent 工具链中建立"显式失败"契约（错误码、超时提示、可观测回调）比增加新功能更有价值**。

**2. 安全从"外围加固"进入"核心语义"层。** 上一轮安全重点是 SSRF/凭据泄露（仍在继续），新一轮已经触及 agent 的认知安全：OpenClaw 的 Memory 信任标记（防记忆投毒）悬置 6 个月获 27 条评论，NanoBot 的 MCP 错误语义缺失导致 agent 无法区分"成功"与"业务失败"。**安全正在从网络层上移到数据与语义层**，这是 AI agent 生态独有的安全议题，传统安全工具无法覆盖。

**3. 模型容错能力从重试走向路由。** CoPaw 的 LLM fallback 与 PicoClaw 的回退链是同一需求的两种实现，背后是模型服务不稳定（OpenRouter 丢参数、火山引擎回归、Google 误封号）已成为日常现实。**"模型路由层"（按任务复杂度、成本、可用性自动选择模型）正在成为 agent 基础设施的标准组件**，预计 6-12 个月内会出现独立的开源路由方案。

**4. 企业级采用信号密集出现。** IronClaw 的用户已在 Railway + Slack 生产环境运行并遭遇跨渠道事故；LobsterAI 专门做账户级隔离；Zeroclaw 的配置迁移焦虑与 IronClaw 的 Configuration-as-Code 诉求同源。**"可审计性"（配置有 schema、有 diff、有审计追踪）是个人工具走向组织工具的必经门槛**，率先解决的项目将获得企业市场的先发优势。

**5. 多 Agent 编排是正在爆发的技术债。** OpenClaw 单日出现 4 个相关联的子代理结果丢失 Bug，CoPaw 出现 fork 误报完成，NanoClaw 不得不禁用内置工具以恢复 agent 间通信。**子代理的生命周期管理（超时、压缩、父会话替换时的结果路由）是各家独立演化出的共同难点**，目前尚无任何项目给出系统性的方案——OpenClaw 的 snapshot 恢复点（RFC #46）可能是第一个接近根治的尝试，值得全生态关注其合并进展。

**6. 中文开发者社区成为不可忽视的力量。** LobsterAI（网易有道）与 CoPaw（Qwen 生态）本身即中文团队项目；OpenClaw 上出现硬编码 `/Users/wangtao` 路径合入发布的吐槽（12 评论）；Zeroclaw 的核心维护者工作流同样有中文开发者参与痕迹。**中文开发者既在贡献代码，也在以更直接的方式对发布质量提出要求**，这对国际化项目的 CI/CD 与代码审查流程提出了更高标准。

---

*本报告基于 2026-08-06 各项目 GitHub 数据快照生成，所有结论可在对应 Issue/PR 链接中追溯原始数据。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-06

## 今日速览

过去 24 小时 NanoBot 项目异常活跃：4 条新 Issue 全部处于开放状态，14 条 PR 中 6 条已合并/关闭，8 条待审核。核心动作集中在 WebUI 体验重构（临时会话、视觉一致性、PTY 终端）、WhatsApp 媒体处理修复、以及 agent 循环保护三个方向。安全与正确性修复密度高（含 1 项 p1 安全修复、1 项 p1 功能合入），整体项目健康度良好。值得注意的是新版本为 0，大量功能与修复已合入 main 分支，下一版本发布可能临近。

## 版本发布

无新版本发布。

## 项目进展

今日合并/关闭 6 条 PR，项目在以下方向取得实质推进：

- **metasearch 能力落地** — [PR #5234](https://github.com/HKUDS/nanobot/pull/5234) 合并了 mst-python 元搜索提供者，聚合 DuckDuckGo/Google/Brave/Bing 等多引擎结果并通过 RRF 融合排序，显著提升搜索覆盖质量。p1 优先级，合入影响大。
- **WebUI 交互重构** — [PR #5184](https://github.com/HKUDS/nanobot/pull/5184) 合入 Quick Chat + Temporary Chat（标记 conflict 后合入）；[PR #5254](https://github.com/HKUDS/nanobot/pull/5254) 合入 provider-native 请求开关，用户可在界面上直接切换 OpenAI Codex Fast mode、OpenAI/DeepSeek 联网搜索、xAI Grok X Search 等原生能力。
- **WhatsApp 媒体链路修复** — [PR #5203](https://github.com/HKUDS/nanobot/pull/5203) 合入，改为基于文件内容（libmagic）而非扩展名检测出站媒体类型，并支持 M4A/AAC 内联音频、不支持格式自动降级为文档发送。直接对治今日 Issue #5149 的音频问题。
- **WebUI 视觉打磨** — [PR #5249](https://github.com/HKUDS/nanobot/pull/5249) 统一菜单/弹层/对话框的二级 elevation 体系，扁平化 Skills 与 Channels 布局；[PR #5250](https://github.com/HKUDS/nanobot/pull/5250) 修复 clipper 活动面板的边缘羽化，改善自动跟随滚动时的可读性。

## 社区热点

- **[Issue #5149 — WhatsApp 无法发送音频](https://github.com/HKUDS/nanobot/issues/5149)** — 4 条评论，今日讨论热度最高。用户明确表示"能接收但不能发送任何音频文件"，日志显示 ffmpeg 相关告警。该问题自 07-28 提出至今已一周有余，当前 #5203 合入应当缓解了部分场景，但 Issue 尚未关闭，建议维护者在下一版本中验证后给出结论。
- **[Issue #5237 — MCP 工具错误包被忽略导致 agent 空等](https://github.com/HKUDS/nanobot/issues/5237)** — 2 条评论。当 MCP 服务器以 `isError=false` 返回业务错误包（如 `{"code":404, "msg":"data not exist"}`）时，nanobot 视为调用成功，LLM 无法得知失败，只能等待 `tool_timeout`，且即便超时也无法识别真实原因。这暴露了 MCP 集成中错误语义传递的深层缺陷，值得 p1 级关注。

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| 高（p1） | [Issue #5237](https://github.com/HKUDS/nanobot/issues/5237) | MCP 业务错误被当作成功，agent 空等超时且无法自纠 | 未修复，无关联 PR |
| 高（p1） | [PR #5258](https://github.com/HKUDS/nanobot/pull/5258) | 带凭据的 URL（userinfo/token/sig/X-Amz-*）会被转发给远端 Jina reader，存在凭证泄露风险 | 待合并，安全修复 |
| 中（p2） | [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) | `/goal` 消息在等待用户回应时产生数十条重复回复，直到用户干预或模型自判循环才停止 | 已有修复 [PR #5257](https://github.com/HKUDS/nanobot/pull/5257) 待合并 |
| 中（p2） | [Issue #5149](https://github.com/HKUDS/nanobot/issues/5149) | WhatsApp 音频"能收不能发"，ffmpeg 相关告警 | 修复 [PR #5203](https://github.com/HKUDS/nanobot/pull/5203) 已合入，Issue 待验证关闭 |
| 中（p2） | [PR #5248](https://github.com/HKUDS/nanobot/pull/5248) | Matrix 房间加入时发送空 POST body，Continuwuity 兼容性报 `M_BAD_JSON` | 待合并 |
| 中（p2） | [PR #5260](https://github.com/HKUDS/nanobot/pull/5260) | 运行时产物（如 `.dream_cursor`）混入被跟踪的工作区目录，污染记忆库 | 待合并 |

## 功能请求与路线图信号

- **MCP Apps 主机支持（新请求）** — [Issue #5251](https://github.com/HKUDS/nanobot/issues/5251) 提出将官方 MCP Apps 扩展（`io.modelcontextprotocol/ui`）集成进 WebUI，使 MCP 工具结果不再只是面向模型的文本/图片，而能渲染交互式 UI。目前无关联 PR，属于有潜力的路线图信号。
- **Temporary Chat 全链路落地** — [PR #5252](https://github.com/HKUDS/nanobot/pull/5252) 新增临时聊天模式（连接级、内存态、限定 workspace 访问），[PR #5259](https://github.com/HKUDS/nanobot/pull/5259) 在其上强化"仅内存"契约，确保临时会话不落盘、不写入历史与记忆。前者已合入、后者待合并，预示下一版本将提供完整的隐私聊天体验。
- **共享交互式项目终端** — [PR #5253](https://github.com/HKUDS/nanobot/pull/5253) 为 WebUI 增加持久化 PTY 终端（xterm.js + POSIX/ConPTY），支持人工输入、回放、重启与按项目偏好自动打开。属 p2，但功能想象力大，预计会成为协作场景亮点。
- **API 状态真实性** — [PR #5255](https://github.com/HKUDS/nanobot/pull/5255)（Draft）建议让 WebUI 对外部启动的 `nanobot serve` 实例也如实反映在线状态，并新增 `nanobot api status` 命令。当前草案阶段，方向正确、值得推动。

## 用户反馈摘要

- **WhatsApp 音频是真实痛点**（#5149）：用户安装当前版本后请求 agent 发送音频文件，预期收到文件但实际无输出。日志指向 ffmpeg 处理链路，用户明确表达了功能缺失的困扰。
- **MCP 集成可靠性诉求上升**（#5237）：用户在真实场景中遭遇 MCP 工具返回 404 业务错误，agent 无法感知失败并进入超时空转。说明仅依赖 `isError` 标志不够，需要对 `CallToolResult.content` 的业务语义进行智能识别。
- **/goal 体验严重影响信任**（#5256）：用户描述"数十条近乎相同的回复"刷屏，直到手动干预才停止。对应修复 PR 已提交并约束了持续目标延续的注入次数，社区反馈及时、修复节奏可接受。

## 待处理积压

- **[Issue #5149 — WhatsApp 音频发送问题](https://github.com/HKUDS/nanobot/issues/5149)**：已存活 9 天，相关修复 PR #5203 已合入但 Issue 仍未关闭。建议维护者基于最新 main 分支复测并明确回应。
- **[Issue #5237 — MCP 错误语义缺失](https://github.com/HKUDS/nanobot/issues/5237)**：涉及 MCP 集成核心可靠性，目前无关联 PR，建议提升优先级并规划错误包识别与 agent 提示链路。
- **[PR #5255 — Draft: API 状态真实性](https://github.com/HKUDS/nanobot/pull/5255)**：草案已存在但无实质推进，若符合路线图请维护者给出方向性反馈。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-06

---

## 1. 今日速览

过去 24 小时，Zeroclaw 保持高度活跃：**17 条 Issues 更新**（全部处于开放/活跃状态，无关闭）、**50 条 PR 更新**（仅 1 条关闭、49 条仍在开放），**无新版本发布**。社区讨论热度集中在上周延续的多个 RFC 与治理议题上，其中 **#6808（工作流车道与标签清理）** 和 **#8303（Goal mode v1）** 均积累了 18 条评论，是当前讨论最深入的两个议题。值得警惕的是，PR 合并通道近乎停滞——**49 条待合并 PR 中涌现大量安全与运行时修复**（WebAuthn 校验、SSRF 防护、会话过期保护等），但均因等待维护者审核或作者响应而处于阻塞状态。项目整体处于 **v0.8.5 稳定化冻结期**，代码产出旺盛但合并效率偏低，是当前最主要的健康度风险。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

**今日合并/关闭情况：** 唯一关闭的 PR 为 **#9750 fix(service): bound launcher-owned daemon logs**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9750)）——该 PR 被关闭而非合并，大概率因其后继者 **#9773 fix(service): bound launchd daemon logs**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9773)）已提交替代实现。

**整体推进：** 从 PR 队列来看，项目安全加固与运行时健壮性工作正在密集推进，但受限于审核积压尚未落地：

- **WebAuthn 断言校验（#9781）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9781)）：补齐 37 字节头部长度校验、rpIdHash 绑定、User Present 标志检查，直接强化认证安全性。
- **Signal 渠道 sourceUuid 支持（#9777）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9777)）：修复隐私模式下 Signal 发件人被静默丢弃的问题，对应 Issue **#9774**。
- **DeepSeek 工具调用解析（#9723）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9723)）：新增 DSML 与 `<|tool_call|>` 信封解析，修复 DeepSeek 系模型工具调用无法执行的问题。
- **File download SSRF 门禁（#8713）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)）：为 `file_download` 工具增加 SSRF 防护与 `allowed_private_hosts` 运维白名单，已等待审核超一个月。
- **Git shell 策略参数加固（#9678）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9678)）：统一 shell 词法规范化，修正可执行文件白名单与风险分类的判定一致性。

**里程碑状态：** v0.8.5 稳定化追踪器 **#9459**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)）显示 intake 已于 8 月 4 日冻结，目标是 8 月 30 日前完成每周稳定化切片。当前大量未合并 PR 若不能尽快完成审核，将面临被挤出 v0.8.5 的风险。

---

## 4. 社区热点

| 议题 | 评论数 | 核心主题 |
|---|---|---|
| [#6808 RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 18 | 治理流程简化：减少维护者手工路由负担 |
| [#8303 RFC: Goal mode v1 — bounded foreground Matrix work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 18 | 跨多轮对话的持久目标执行能力 |
| [#8692 Tracker: Maintainer decision queue](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 11 | 维护者决策队列，协调 RFC 与设计议题裁决 |
| [#9246 RFC: Preserve Todo tracker configuration during ZeroCode ownership migration](https://github.com/zeroclaw-labs/zeroclaw/issues/9246) | 9 | ZeroCode 所有权迁移时的配置保护 |
| [#6954 RFC: Provenance, conversation binding, and reply contract](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) | 9 | 内部发起 agent turn 的溯源与会话绑定契约 |
| [#8424 RFC: Workspace-relative forbidden path patterns](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) | 9 | 工作区内敏感文件保护（`.env`、`config.yaml` 等） |
| [#8832 RFC: Plugin-owned Kanban board for agent work](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) | 8 | 插件化 Kanban 板协调 agent 工作 |
| [#6909 RFC: Computer-use support for desktop](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) | 8 | 桌面级屏幕交互与输入控制能力 |

**热点分析：** 社区讨论高度集中在两个方向：**一是治理与工作流效率**（#6808、#8692、#9246），反映维护者正被大量 RFC 与决策任务压垮，迫切需要更自动化的流程；**二是安全边界扩展**（#8424、#6909），用户对 AI agent 的权限控制已经从「工作区外禁止访问」延伸到「工作区内敏感文件保护」和「桌面级交互控制」。这两个方向也是当前 PR 堆积最严重的领域，说明社区需求与实际供给高度一致，瓶颈在于审核速度。

---

## 5. Bug 与稳定性

按严重程度排列：

**🔴 S1 — 工作流阻断**

- **[#9775] OpenRouter 流式请求丢失 `provider_extra`**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9775)，p1，报告于 8 月 5 日）：`stream_chat` 路径绕过了 `merge_extra_body` 辅助函数，导致所有 `provider_extra` 配置在流式请求中被静默丢弃。**暂无对应 fix PR。** 影响面：所有使用 OpenRouter 流式响应的用户。
- **[#9774] Signal 渠道静默丢弃仅含 `sourceUuid` 的发件人**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9774)，p2，报告于 8 月 5 日）：电话号隐私模式下，`source` 和 `sourceNumber` 均为空时入站消息被静默丢弃。**已有对应 fix PR #9777**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9777)），待合并。

**🟠 功能缺陷/配置失效**

- **[#9779] `sops_dir` 文档默认值未生效，SOP 静默不加载**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)，报告于今日）：文档声称 `sops_dir` 可选且有解析默认值，但守护进程在 `sops_dir.is_some()` 为假时直接关闭整个 SOP 子系统，无错误、无警告、无日志。**暂无对应 fix。**
- **[#9780] cron 触发的 SOP 无法执行网络操作**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9780)，报告于今日）：文档宣称 cron SOP 可构建 watch-loop，但能力集中没有 HTTP 成员，`shell.exec` 与 `notify.channel` 是占位符，实际无法完成任何网络请求。**暂无对应 fix。**

**问题趋势：** 今日新报的 4 个 Issue 中，**3 个集中在 SOP 子系统的能力与配置缺陷**（#9779、#9780），说明 SOP 功能正处于用户试用早期、真实短板密集暴露的阶段。S1 级的 OpenRouter 与 Signal 问题分别反映了「成本敏感型用户」和「隐私保护型用户」两类核心群体的诉求。

---

## 6. 功能请求与路线图信号

**新涌现的需求信号：**

- **Goal mode v1（#8303）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)）：跨多 turn 的持久目标执行，被社区强烈关注（18 条评论 + 1 👍）。这是 AI agent 从「单轮对话」迈向「多步任务」的关键能力，与当前 AI 助手领域的主流演进方向一致。
- **OpenRouter 稳定 `session_id`（#9631）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)）：通过会话 ID 复用提示词缓存以降本增效。用户反馈单次对话产生数十次 LLM 请求，成本敏感度很高。
- **工作区相对路径禁止模式 + `.zeroclawignore`（#8424）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)）：已有对应实现 PR **#9776**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9776)，今日新提交），预计很快进入审核。
- **插件化 Kanban 板（#8832）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)）：为 agent 工作提供可视化协调面板，与 #6808 的工作流治理相辅相成。
- **桌面 Computer-use（#6909）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)）：桌面级屏幕感知与输入控制，是 agent 从浏览器走向全桌面操作的重要一步。
- **统一包/能力/配置/运行时状态目录契约（#9346）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)）：产品级统一目录的架构支柱，虽评论少但战略意义重大。

**版本归属预判：** v0.8.5 的 intake 已于 8 月 4 日冻结，上述新议题大多无法进入该版本。其中 **#9776（forbidden_paths 工作区模式）** 和 **#9777（Signal UUID）** 是 Bug 修复型 PR，有较大概率作为 hotfix 合入；其余 RFC 型功能预计进入 v0.8.6 及之后的版本规划。

---

## 7. 用户反馈摘要

从今日活跃 Issues 的摘要与上下文提炼：

| 用户诉求 | 证据 | 真实痛点 |
|---|---|---|
| 团队希望减少维护者的手工路由负担 | #6808 标题即「让工作更容易路由，而不必让维护者再维护一套流程」 | 大量 RFC 与标签管理工作正在耗尽维护者精力，需要板级自动化 |
| 对 OpenRouter 成本敏感 | #9631「一次对话产生数十次 LLM 请求，系统提示词与工具 schema 每轮重放」 | 使用成本超出预期，影响 agent 的日常可负担性 |
| WhatsApp 空列表默认可加入所有群组 | #9397：「空列表目前允许链接账户所在的所有群组」 | 安全默认值缺失，用户可能无意中将 agent 暴露给所有群聊 |
| Signal 隐私模式用户被静默丢弃 | #9774：「电话号隐私导致 source/sourceNumber 均为空时消息被丢弃」 | 隐私保护与可用性未兼得，用户被无提示地「隐身」 |
| SOP 文档与实践脱节 | #9779「靠文档默认值运行时 SOP 引擎从不加载」；#9780「watch-loop 文档是空头支票」 | 文档承诺的能力无法兑现，用户按文档搭建后遭遇静默失败 |
| 配置迁移焦虑 | #9246「ZeroCode 所有权迁移时希望保留 Todo tracker 配置」 | 自动化迁移不应丢失用户已有配置 |

**积极信号：** 用户对 Zeroclaw 的期望已经从「可用」上升到「安全、低成本、可治理」，说明项目已获得一批深度用户。负面反馈主要集中于「文档与实现不一致」和「安全默认值不牢固」，这两类问题修复成本相对可控，建议优先处理。

---

## 8. 待处理积压

**⚠️ 维护者决策队列（#8692，[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）值得重点关注**——它正是为缓解当前积压问题而设立的机制，目前有 11 条评论，但裁决效率尚未显现。

**等待维护者审核的关键 Issues（均为 p1/p2 + needs-maintainer-review）：**

- **#9397 WhatsApp 空列表安全漏洞**（p1，[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)）— 安全问题，6 条评论，已等待 11 天
- **#9464 Anthropic OAuth 别名契约**（p1，[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9464)）— 等待确认实现契约，已等待 10 天
- **#6808 工作流车道治理 RFC**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)）— 自 5 月 20 日开启已近 3 个月，仍在 in-progress
- **#8303 Goal mode v1**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)）、**#9246 配置迁移保护**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9246)）— 同为高关注度 RFC

**积压超时的高风险 PR（均超过 30 天且仍开放）：**

- **#8713 file_download SSRF 门禁**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)）— 7 月 4 日提交，已 33 天，安全修复滞留中
- **#8826 image_gen SSRF 防护**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8826)）— 7 月 8 日提交，已 29 天，同为 SSRF 修复
- **#8443 Matrix 单消息进度草稿**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)）— 6 月 28 日提交，已 39 天，涉及多渠道功能增强
- **#8928 Doctor 诊断显示日志路径**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8928)）— 7 月 10 日提交，已 27 天

**积压风险提示：** 当前 PR 队列中 **24/49 个 PR 标注了 `needs-author-action`**（作者需要响应），另有 20+ 个标注 `needs-maintainer-review` 或 `risk:high`。结合 v0.8.5 的 8 月 30 日截止目标，建议维护者优先处理以下两类 PR：**① 安全修复（SSRF、WebAuthn、Shell 策略）**，防止已知漏洞在稳定版中滞留；**② 已获作者响应的高风险修复**，避免因超时导致分支冲突扩大化。

---

*本日报基于 Zeroclaw GitHub 仓库 2026-08-06 数据自动生成，数据来源：github.com/zeroclaw-labs/zeroclaw。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 项目日报 — 2026-08-06

### 1. 今日速览

过去 24 小时 PicoClaw 项目整体活跃度中等偏上，但社区参与度明显不足。Issue 侧完全静默（0 条新增/关闭/活跃），PR 侧则有 4 条更新，其中 1 条关闭（或已合并）、3 条仍处于开放待审状态。值得关注的是，关闭的 PR #926 带来了 Anthropic OAuth setup-token 登录支持，是本月认证能力上的一大步；同时新提交的 PR #3318 修复了 web 前端 lockfile 的阻断性构建错误。过去一天没有新版本发布，也几乎没有公开的讨论与评论互动，项目正处在功能整合与仓库维护阶段，从代码提交频率来看开发仍在推进，但社区沟通层面偏平静。

### 2. 版本发布

无（过去 24 小时无新 Release，最新 Releases 为空）。

### 3. 项目进展

过去 24 小时合并/关闭的 PR 共 1 条，整体推进了一块重要的功能拼图：

- **Anthropic OAuth 登录支持（#926，已关闭）**  
  PR [feat(auth): add Anthropic OAuth setup-token login](https://github.com/sipeed/picoclaw/pull/926) 已关闭。该 PR 为 Anthropic 用户新增了 OAuth setup-token（`sk-ant-oat01-*`）登录方式，作为传统 API Key 之外的替代方案，具体包括：
  - 新增 `--setup-token` CLI 标志及交互式登录菜单；
  - 集成 Anthropic 用量端点，在 `auth status` 中展示 5 小时与 7 天利用率；
  - 为 OAuth 令牌接入流式响应支持。
  
  这是继 OpenAI 兼容认证之后，PicoClaw 在主流大模型厂商 OAuth 化方向上的重要一步，解决了企业用户使用临时令牌/单点登录场景下的接入痛点。

### 4. 社区热点

过去 24 小时没有新的 Issue 产生，也没有可统计的评论/反应数据，因此整体社区活跃度偏低。相对值得关注的是以下两条活跃的 PR：

- [feat(models): add configurable default fallback chain (#3200)](https://github.com/sipeed/picoclaw/pull/3200) — 自 7 月 1 日开放以来持续受到关注，8 月 5 日有更新。它提出了模型默认回退链的可配置能力，涉及 Web UI 排序/持久化与后端 API，直指用户在实际使用中"主模型不可用、自动切换冗余模型"的场景需求。
- [feat(auth): add Anthropic OAuth setup-token login (#926)](https://github.com/sipeed/picoclaw/pull/926) — 8 月 5 日刚刚关闭，是近期讨论度较高的功能型 PR，虽无评论区活跃数据，但关闭动作本身就意味着评审流程的推进。

需要指出的是，两个 PR 均无公开评论记录，社区声音较弱，维护者对功能方向的把握主要来自自身路线图与少数贡献者驱动。

### 5. Bug 与稳定性

过去 24 小时上报了 1 个构建级 Bug，并按严重程度排在最前：

- **[高] web 前端 pnpm-lock.yaml 损坏（#3318，修复 PR 已提交）**  
  `web/frontend/pnpm-lock.yaml` 中 `semver@7.8.5` 同时在 `packages:` 和 `snapshots:` 段被重复定义。YAML 不允许重复映射键，导致 pnpm 直接报错：`ERR_PNPM_BROKEN_LOCKFILE / duplicated mapping key (3577:3)`。该问题会阻断 web 子项目的一切安装与 CI 流程，属阻断性缺陷。  
  修复 PR [fix(web): repair unparseable pnpm-lock.yaml](https://github.com/sipeed/picoclaw/pull/3318) 已于 8 月 5 日提交，目前处于开放状态，建议维护者优先 review。

此外，未发现崩溃、运行时回归或安全相关 Bug。

### 6. 功能请求与路线图信号

虽无新 Issue 功能请求，但结合在开的 PR，可以清晰地看到下个版本的几个功能方向：

- **模型回退链（#3200）** — 允许用户在 Web UI 中设置默认模型并配置回退顺序，通过后端 API 持久化。这标志着 PicoClaw 正从"单模型单配置"向"多模型路由与自动降级"演进，考虑到模型服务的不稳定性，此功能极有可能被纳入下一版本。
- **Anthropic OAuth 认证（#926，已关闭）** — 虽然 PR 已关闭，但该功能的合入预期较高。一旦正式落地，将支持更现代的企业级认证方式，替代长期 API 密钥。
- **安装脚本迁移（#1951）** — 将安装脚本从 docs 仓库迁入主仓库，提升安装方案的版本一致性与可发现性，属于对新手用户友好的重要基础设施优化，同样具备进入下一发布版本的可能。

综合来看，路线图信号集中在"认证体验升级"与"模型可靠性工程"两个主题上。

### 7. 用户反馈摘要

过去 24 小时 Issue 与 PR 评论区均无新的用户反馈可提炼，因此无法直接引用真实用户的声音。仅能从 PR 本身推断以下间接的用户痛点与使用场景信号：

- **开发环境构建受阻**（来自 #3318）：lockfile 重复键问题说明 web 前端子项目在当前 main 分支上处于不可安装状态，贡献者或使用源码构建的用户在本地会立刻遇到 `ERR_PNPM_BROKEN_LOCKFILE`，影响体验和贡献门槛。
- **认证方式单一**（来自 #926）：PR 提出的 OAuth setup-token 登录方案，反映了部分 Anthropic 用户不愿长期暴露/轮换 API Key，更期望使用短期、可撤销的 OAuth 令牌进行 CLI 工具认证，尤其适用于团队协作与 CI 环境。

这些反馈属于"PR 附带的隐含证据"而非社区直接发言，公开讨论层面未见明显正面或负面情绪。

### 8. 待处理积压

以下 PR 长期停留在开放状态，建议维护者关注并推进：

| PR | 创建时间 | 积压时长 | 说明 |
|---|---|---|---|
| [#1951 chore: move installation scripts from docs repo to here](https://github.com/sipeed/picoclaw/pull/1951) | 2026-03-24 | 超 4 个月 | 涉及安装脚本从 docs 仓库迁入主仓库，并关联 picoclaw_docs#14 的后续工作。长期未合并可能导致主仓库与文档仓库脚本版本分叉。 |
| [#3200 feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200) | 2026-07-01 | 超 1 个月 | 功能已经历较长 review 周期，若迟迟不合并，存在与线路图周期脱节、分支冲突增大的风险。 |
| [#3318 fix(web): repair unparseable pnpm-lock.yaml](https://github.com/sipeed/picoclaw/pull/3318) | 2026-08-05 | 24 小时内（新提交） | 阻断性构建 Bug 修复，建议当日或次日尽快处理，避免影响更多使用源码构建的用户。 |

整体来看，PicoClaw 的技术债务控制尚可，但 #1951 和 #3200 两个 PR 的长时间悬挂需要维护者重新评估优先级，防止"功能完成但迟迟不入主干"的情况继续拖延。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-08-06）

## 1. 今日速览

过去 24 小时 NanoClaw 保持中等偏上的社区活跃度：共 2 条 Issue 更新、12 条 PR 更新、0 个新版本发布。2 条 Issue 均为开放 Bug，没有新关闭 Issue；PR 方面 10 条待合并、2 条已关闭/合并，说明外部贡献意愿较强，但合入速度偏低。值得警惕的是，`#2528` 和 `#2006` 两个高影响 Bug 已分别开放约 80 天和 100 天，至今仍无直接修复合入。整体判断：项目“贡献者活跃、维护响应存在瓶颈”，健康度中等。

## 2. 版本发布

本期无新版本发布。

## 3. 项目进展

过去 24 小时有 2 条 PR 关闭/合并，属于稳定性与 Agent 通信机制的小步改进：

- [PR #3175 fix: route command-gate denials through the delivery adapter, not outbound.db](https://github.com/nanocoai/nanoclaw/pull/3175)  
  修复宿主机直接向会话 `outbound.db` 写入 denial notices，违反该仓库“单写者”数据库规则的问题。合入后可降低数据库损坏风险。

- [PR #3187 fix(agent-runner): disallow built-in SendMessage so agent-to-agent messaging works](https://github.com/nanocoai/nanoclaw/pull/3187)  
  禁用 agent-runner 内置的 `SendMessage`，让 Agent 之间的消息走正常消息通道，避免被内置工具短路。

另外，`#3175` 的同主题新 PR [PR #3192](https://github.com/nanocoai/nanoclaw/pull/3192) 仍处开放状态，维护者需确认是重复提交还是替代版本。整体来看，这两项修复推进了数据层一致性和 Agent 间通信可用性，但尚未形成用户可感知的版本发布。

## 4. 社区热点

从公开数据看，今日没有高讨论量或高 👍 的 Issue/PR，两个活跃 Issue 均只有 1 条评论，社区围观度不高。

- [Issue #2528 Signal channel: image/PDF attachments unreachable from agent container](https://github.com/nanocoai/nanoclaw/issues/2528)  
  用户通过 Signal 发送图片/PDF，宿主机能收到，但容器内 Agent 无法打开文件。背后诉求是：用户希望主流聊天渠道的附件能直接进入 Agent 工作区，而非停留在宿主侧。

- [Issue #2006 Fresh install on Debian 12 LXC: docker socket permission denied — recovery path doesn't fire](https://github.com/nanocoai/nanoclaw/issues/2006)  
  新用户尝试在 Debian 12 LXC 环境安装，Docker 安装成功、用户已加入 `docker` 组，但后续步骤仍出现 socket 权限拒绝，且恢复逻辑没有触发。背后是 LXC/Proxmox 这类特权容器环境的一键安装可靠性问题。

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | 问题 | 链接 | 状态 |
|---|---|---|---|
| 高 | Signal 图片/PDF 附件无法被容器内 Agent 读取，直接影响多模态输入 | [Issue #2528](https://github.com/nanocoai/nanoclaw/issues/2528) | 开放中，无直接 fix PR；相关候选为 PR #3156 |
| 高 | Debian 12 LXC 新装 Docker socket 权限拒绝，recovery path 不触发 | [Issue #2006](https://github.com/nanocoai/nanoclaw/issues/2006) | 开放中，无 fix PR |
| 中 | command-gate denial 对 `outbound.db` 形成第二写者，存在损坏风险 | [PR #3192](https://github.com/nanocoai/nanoclaw/pull/3192) / 已关闭 [PR #3175](https://github.com/nanocoai/nanoclaw/pull/3175) | 修复已提交，待确认最终合入版本 |
| 中 | WhatsApp 登出后 `setup()` 无超时，可能永久挂起宿主机启动 | [PR #3191](https://github.com/nanocoai/nanoclaw/pull/3191) | 修复 PR 待合并 |
| 中 | 由 stdio 拉起的 MCP server 缺少 `HTTPS_PROXY`/CA 证书环境变量 | [PR #3188](https://github.com/nanocoai/nanoclaw/pull/3188) | 修复 PR 待合并 |
| 低 | 未知斜杠命令被误判为 `passthrough`，导致 Agent 响应被静默丢弃 | [PR #2346](https://github.com/nanocoai/nanoclaw/pull/2346) | 修复 PR 待合并 |

## 6. 功能请求与路线图信号

本期没有新的 Feature Request Issue，但多条开放 PR 正在扩展功能边界，可能进入下一版本：

- [PR #3190 feat: add Tavily MCP tool skill](https://github.com/nanocoai/nanoclaw/pull/3190)  
  新增 Tavily 搜索工具技能，补齐 Agent 的实时联网检索能力。

- [PR #3189 feat(skill): add-why — explain what happened to one message](https://github.com/nanocoai/nanoclaw/pull/3189)  
  新增“为什么”技能，用于解释单条消息的处理过程，属于可观测性/调试类能力。

- [PR #3050 feat(setup): add Dial to the channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050)  
  为安装向导增加 Dial 渠道接入，属于新渠道扩展。

- [PR #3186 refactor: add host seams for skill-owned capabilities](https://github.com/nanocoai/nanoclaw/pull/3186)  
  为 skill 持有的能力增加宿主机侧扩展点，属于架构级铺垫，利好后续集成开发。

- [PR #3172 chore(skills): remove stale qodo and Google MCP skills](https://github.com/nanocoai/nanoclaw/pull/3172)  
  清理过期技能，维持技能生态健康。

- [PR #3156 fix(agent-runner): carry channel attachments to providers as structured parts](https://github.com/nanocoai/nanoclaw/pull/3156)  
  虽然标为 fix，实际是链路改造：让渠道附件以结构化 parts 传给模型供应商。若合入，很可能直接改善 Issue #2528 的附件不可达问题，应优先 review。

## 7. 用户反馈摘要

由于 Issues 评论正文未在数据中披露，以下基于 Issue 描述提炼：

- [Issue #2528](https://github.com/nanocoai/nanoclaw/issues/2528)：用户通过手机向 Signal 发送图片（如 `archetype.png`），随后询问 Agent“can you see this image?”，Agent 无法读取。说明真实使用场景是用户期待 Agent 能直接解析聊天中的图片/PDF，当前 Signal 通道的多模态能力缺失。

- [Issue #2006](https://github.com/nanocoai/nanoclaw/issues/2006)：用户在 Proxmox 的 Debian 12 LXC 中执行一键安装，Docker 安装成功且用户已加入 `docker` 组，但后续步骤仍报 socket permission denied，并且 recovery path 未触发。用户痛点集中在“新环境安装失败后没有有效自愈路径”，需要手动介入，体验较差。

## 8. 待处理积压

以下 Issue/PR 长期未闭环，建议维护者优先关注：

- [Issue #2006 Debian 12 LXC docker socket permission denied](https://github.com/nanocoai/nanoclaw/issues/2006)  
  开放约 103 天，仅 1 条评论，无修复 PR。安装流程在 LXC/Proxmox 环境存在明确缺陷。

- [Issue #2528 Signal attachments unreachable](https://github.com/nanocoai/nanoclaw/issues/2528)  
  开放约 80 天，直接影响 Signal 用户的多模态体验。建议与 PR #3156 联动评估。

- [PR #2346 fix(formatter): treat unknown slash commands as normal chat](https://github.com/nanocoai/nanoclaw/pull/2346)  
  创建于 2026-05-08，已开放约 90 天，属于小而明确的修复，长期未合并。

- [PR #3050 feat(setup): add Dial to the channel picker](https://github.com/nanocoai/nanoclaw/pull/3050)  
  创建于 2026-07-14，已开放约 23 天，渠道扩展类功能需要维护者给出明确评估结论。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-06

## 1. 今日速览

IronClaw 在过去 24 小时保持了高活跃度：**6 条 Issues 处于活跃状态，50 条 PR 有更新（其中 18 条已合并/关闭，32 条仍在待合并队列）**。首个 1.1.0 候选版本 **ironclaw-v1.1.0-rc.1** 于 8 月 3 日发布，带来扩展中心、IronHub 深链、持久文件附件与 Slack 斜杠命令等一批新能力。整体来看，项目正处于 v1.1.0 发布前夕的密集收尾阶段——大 PR 批量涌入、依赖维护频繁、同时出现了若干与 Slack/Telegram 集成相关的回归 bug，需在正式发版前重点盯着。⚠️ 一个值得立刻注意的信号：**PR 队列积压较深（32 条待合并），部分 PR 存在串联依赖关系**，合并节奏可能会受影响。

---

## 2. 版本发布

### ironclaw-v1.1.0-rc.1（2026-08-03）
[查看 Release](https://github.com/nearai/ironclaw/releases)

自 1.0.0 以来的首个候选版本，核心功能集中在“扩展触达”层面：

- **注册任意托管的 MCP 服务器**：扩展中心不再局限于内置扩展，用户可接入任意外部 MCP 服务。
- **支持从 IronHub 深链安装**：简化了扩展发现与安装路径。
- **持久化文件附件跨渠道传播**：文件可随对话/任务在不同消息渠道（如 Slack、Telegram）间传递。
- **Slack `/ironclaw` 斜杠命令**：将 IronClaw 能力直接嵌入 Slack 交互入口。
- **可观测性改进**：“广泛提升了失败场景的可读性”（Release Notes 原文截断处）。

**破坏性变更与迁移注意事项**：该 Release Notes 未明确列出 breaking changes；但从当日 Issue 动向（#7249、#7254）推断，**Slack 相关的持久化附件与消息路由逻辑可能是新引入的，实际使用中出现了跨渠道错误投递与附件不可读的反馈**——升级到 RC 版本的团队建议对 Slack/Telegram 集成做一轮回归验证，并留意正式版发布时的迁移指南。

---

## 3. 项目进展

今日合并/关闭的 PR 中，有 3 条值得突出（数据快照展示范围内）：

| PR | 类型 | 说明 |
|---|---|---|
| [#6831 feat(reborn): standardized messaging framework](https://github.com/nearai/ironclaw/pull/6831) | 关闭·XL | **重大里程碑**。构建了宿主侧标准化消息框架：16 个核心操作、13 个保留操作名、规范 JSON Schema、宿主编写的描述核心及 12 码错误分类体系，并新增 v3-only `standard_op` 清单。为后续多平台消息路由的一致性打下基础。 |
| [#7261 fix(ci): resolve release canary temp path](https://github.com/nearai/ironclaw/pull/7261) | 关闭·S | 修复 tag-only release 工作流中由 #7256 引入的 zero-job 失败问题；将 canary 证据目录解析逻辑移入 runner step。 |
| [#7196 chore(deps): bump wasm group](https://github.com/nearai/ironclaw/pull/7196) | 关闭·M | 依赖更新：`wasmtime-wasi` → 47.0.3、`wit-component`/`wit-parser` 随 wasm-tools 更新。 |

**项目整体推进判断**：标准化消息框架的落地意味着 IronClaw 在多渠道消息路由上已经从“功能堆积”走向“契约规范”，这是 v1.1.0 背后最重要的架构级动作之一。此外，大量待合并 PR（32 条）也表明后续版本功能储备充裕——技能体系（#6745、#6938、#7171）、沙箱用户配置（#7214）、WebUI 设计系统（#7039）都在排队中。

---

## 4. 社区热点

> 说明：本次数据快照中 PR 的评论数未显示，以下热点主要基于 Issues 评论量做出判断；PR 侧建议关注队列中标题带 `[size: XL]` 的大改。

### 最热 Issue：#3036 Configuration-as-Code（7 条评论）
[#3036 [EPIC] Configuration-as-Code for IronClaw Reborn](https://github.com/nearai/ironclaw/issues/3036)

这是今日评论区最活跃的 Issue（7 条评论）。作为从 4 月 28 日延续至今的 epic，它反映了一类非常核心的开发者诉求：**IronClaw 的配置方式过于碎片化**——`.env`、`.system/...` 工作区文档、settings JSON、扩展安装、运行时 flag，五套东西混在一起，没有 schema、没有 diff、没有审计。7 条讨论意味着社区内部对“声明式配置”这一主题有持续的讨论意愿，值得维护者认真排期。

### 值得关注的 Bug 类 Issue（各 1 条评论）
- [#7249 Slack DM execution result is delivered to Telegram](https://github.com/nearai/ironclaw/issues/7249) —— 用户对消息被送错渠道表达了明确的困惑，评论中预计会有更详细的复盘。
- [#6578 Admin-Managed Agents as UserId Subjects](https://github.com/nearai/ironclaw/issues/6578) —— 关于管理员托管非人类身份主体（产品 Agent、自动化、入站渠道）的 epic，涉及身份模型演进，潜在影响范围大。

**诉求分析**：当前社区声音集中在两块——**(1) 配置工程化**：期望可审查、可回滚的声明式配置；**(2) 渠道集成的正确性**：Slack/Telegram 是真实生产场景，消息错投会直接影响用户信任。

---

## 5. Bug 与稳定性

按严重程度从高到低排列：

### 🟠 较高——跨渠道错误投递（P2）
**[#7249 Slack DM execution result is delivered to Telegram](https://github.com/nearai/ironclaw/issues/7249)**

- **场景**：Railway 实例中，一次 Slack DM 执行的结果摘要被发送到了 Telegram 聊天室，且 Telegram 消息中包含 Slack 特有的收件人信息、触发事件元数据和 JSON 附件。
- **影响**：不仅是“发错地方”的体验问题，更是**敏感信息跨渠道泄露风险**（Slack 用户身份信息出现在 Telegram 中）。
- **修复状态**：⚠️ **暂无对应的 fix PR**。考虑到本次 RC 版本刚发布，此问题应当在正式版前处理。

### 🟡 中等——Slack 附件无法访问（P2）
**[#7254 IronClaw cannot access files attached to Slack feedback threads](https://github.com/nearai/ironclaw/issues/7254)**

- **场景**：产品反馈 triage 流程中，用户将报告/复现材料作为文件附件放在 Slack 线程里，但 IronClaw 无法下载或读取该附件。
- **影响**：阻碍基于 Slack 的反馈闭环，影响产品团队日常飞轮运转。
- **修复状态**：⚠️ **暂无对应的 fix PR**。

### 🟢 已修复——CI 路径问题（由 #7261 关闭）
[#7261](https://github.com/nearai/ironclaw/pull/7261) 修复了 release canary 的临时路径问题，属内部 CI 稳定性修复。

**稳定性小结**：当前 repo 健康度整体良好（无崩溃级/数据丢失类严重 bug），但 Slack 集成两侧（出向投递 + 入向取件）均有问题被报告，**与 v1.1.0-rc.1 新增的跨渠道持久附件能力疑似存在强关联**，建议优先排查。

---

## 6. 功能请求与路线图信号

### 📌 已在路线图上的 Epic（有对应 PR 推进）

**AI-first Design System（#7038）**
- [Issue #7038 Epic: Storybook + AI-first Design System](https://github.com/nearai/ironclaw/issues/7038)
- 配套 PR：[#7039（Epic Phase 1：整合 Storybook + 设计系统目录）](https://github.com/nearai/ironclaw/pull/7039)、[#7043（Epic Phase 2：DESIGN.md 治理 + Storybook 指南）](https://github.com/nearai/ironclaw/pull/7043)、[#7255（评估 APDD 治理工具包并提案）](https://github.com/nearai/ironclaw/pull/7255)
- 判断：3 条 PR 并行推进，说明 WebUI 侧正在走向“设计系统化”，**极有可能进入 v1.2.0 或随 v1.1.x 陆续合入**。

**技能系统的重构（#6941 epic）**
- 今日相关 PR：[#6938（模型选技能，而非关键词打分）](https://github.com/nearai/ironclaw/pull/6938)、[#7171（DB-backed 技能树）](https://github.com/nearai/ironclaw/pull/7171)、[#6745（基础 PR）](https://github.com/nearai/ironclaw/pull/6745)
- 判断：这一组 PR 正在把技能从“宿主关键字触发”转变为“模型自主激活”，是 AI Agent 行为范式的重要演进；其中 #7171 还带着一个待办 backlog（#7203 虚拟文件系统挂载），部分能力可能顺延。

**沙箱多平台适配（#7214）**
- [PR #7214 feat(sandbox): add explicit Docker and Railway user sandbox profiles](https://github.com/nearai/ironclaw/pull/7214)
- 判断：为 Docker 与 Railway 提供显式沙箱 profile，每个命令在全新非 root Python worker 中执行，并将 workspace/checkpoint 隔离到 tenant+user 维度。**属于安全基线的增强**，预计会进入 1.1.x 后续 patch。

### 🧭 尚处于“想法期”的新增信号

- **[#6578 Admin-Managed Agents as UserId Subjects](https://github.com/nearai/ironclaw/issues/6578)**：为管理员代管的 Agent/自动化/入站渠道创建“非人类主体”身份，无现成 PR。属于身份模型扩展，工程量大，可能在 1.2.0 之后。
- **[#3036 Configuration-as-Code](https://github.com/nearai/ironclaw/issues/3036)**：声明式配置，仍无对应实现 PR，但从 7 条评论的讨论热度看，社区期待值较高。

---

## 7. 用户反馈摘要

> 说明：当前数据快照未包含具体评论正文，以下反馈基于 Issue 标题与摘要信息提炼，后续如需完整引用可拉取评论 API。

### 😟 用户的“没想到”时刻
- **Slack 执行、Telegram 收结果**（[#7249](https://github.com/nearai/ironclaw/issues/7249)）：用户明显对消息被送错渠道感到意外——执行上下文在 Slack，结果却到了 Telegram，且附带 Slack 专有的收件人元数据。这反映出**用户在潜意识里假定“渠道即上下文”**，跨渠道串线的行为打破了这一预期。
- **Slack 线程附件无法读取**（[#7254](https://github.com/nearai/ironclaw/issues/7254)）：用户按照 triage 工作流要求上传了报告文件，但 IronClaw 端读取失败。这类“流程让做了、结果又不支持”的断裂对信任伤害较大。

### 🤔 隐含的使用场景确认
- 这两个反馈都发生在 **Railway + Slack 的真实生产部署**中，说明社区中已有相当比例的用户将 IronClaw 作为 Slack 工作流的中枢来使用，而不仅是聊天机器人。

### 😐 配置工程化的集体共鸣
- [#3036](https://github.com/nearai/ironclaw/issues/3036) 的 7 条评论虽无正文细节，但摘要中“no schema, no diff, no audit trail”的描述精准戳中开发者在多环境、多租户场景下的痛点：**现在的配置方式没办法进行代码审查，也没有审计追责**。这类诉求往往来自组织级用户，而非个人开发者。

---

## 8. 待处理积压

### 🔸 Issue 侧

**[#3036 Configuration-as-Code Epic（自 2026-04-28 起，至今 100+ 天）](https://github.com/nearai/ironclaw/issues/3036)**

- 近 3 个月仍未进入实现阶段。即便它从 4 月活跃至今，今天仍有评论更新，说明需求持续有人关心，但一直停留在设计讨论期。
- 建议：若 v1.1.0 正式版发布后有余力，应至少给出一个“配置 schema + 迁移路线图”的明确时间表，缓解长期观望的社区情绪。

### 🔸 PR 侧

**[#5101 ci: reuse cargo-component installer in live canary（自 2026-06-20 起，6 周未合并）](https://github.com/nearai/ironclaw/pull/5101)**

- 一个 CI 依赖改造 PR，将 live-canary 的 `cargo install cargo-component --locked` 替换为 `taiki-e/install-action` 固定版本。
- 超过 6 周未合并，可能是被更高优先级 PR 抢占排期。但考虑到其涉及 CI 安全（live-secret/self-hosted runner 环境），建议维护者审视一下是否有阻塞，避免长时间搁置。
- 从今天的数据流看，有多个 PR 声明“depends on #7063 / #7028”等依赖关系，PR 之间的级联合并需要规划好顺序，避免积压雪球。

---

**日报结语**：IronClaw 在 1.1.0-rc.1 的发布前后表现出了扎实的功能推进节奏，但当前的两个 Slack 集成 bug 是发版前的必答题；同时，32 条待合并 PR 也提示维护团队要做好合并顺序的调度，避免发布前最后一周的“赶工风险”。整体健康度：**中上，重点盯防 Slack 链路回归与 PR 积压**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目日报 · 2026-08-06

## 今日速览

过去 24 小时项目保持高活跃度：发布 1 个新版本 `2026.8.5`，新增 2 个 Bug Issue，同时合并/关闭 12 个 PR（含 3 个 Dependabot 依赖升级），另有 1 个历史遗留 PR（#1201）处于待合并状态。社区讨论集中在 NIM 群名解析异常（#1200，旧 Issue 今日回温）以及 OpenClaw 技能开关失效与系统提示词重复注入两个新反馈（#2441、#2440）。整体看，项目在稳定性修复和体验打磨上持续推进，但部分长期积压的 Bug 仍需维护者注意。

---

## 版本发布

### LobsterAI 2026.8.5

📦 [Release 2026.8.5](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.8.5)

**更新内容：**
- ✨ **原生每日签到体验**（PR [#2408](https://github.com/netease-youdao/LobsterAI/pull/2408)）：为 activity 模块增加原生每日签到功能，替代此前基于 Web 的实现，提升交互流畅度。
- ✨ **企业级账户隔离**（PR [#2409](https://github.com/netease-youdao/LobsterAI/pull/2409)）：将账户级认证与服务流进行隔离，为多租户或企业部署场景提供更清晰的权限边界。
- 🎨 **样式优化**：包含若干 UI 细节调整（具体内容未在 Release 中详细列出）。

**破坏性变更与迁移注意：**
- 企业级账户隔离可能影响现有自托管/定制化部署中的认证中间件配置，建议升级前检查 `account` 相关环境变量或配置文件是否匹配新逻辑。
- 其余功能为增量更新，未发现破坏性变更。

---

## 项目进展

今日合并/关闭了 12 个 PR（待合并 1 个），主要包括以下方向：

| 方向 | PR | 说明 |
|------|-----|------|
| **窗口/进程稳定性** | [#2437](https://github.com/netease-youdao/LobsterAI/pull/2437) | 为 OpenAI-compat 代理和 HTML 预览服务器关闭流程增加 drain timer + hard deadline，解决 OpenClaw 网关 keep-alive 连接导致的应用退出挂起问题；同时将主窗口激活延后至首帧渲染完成，避免 focus 竞态 |
| **OpenClaw 网关锁修复** | [#2436](https://github.com/netease-youdao/LobsterAI/pull/2436) | 修复两种自重启竞态条件：Windows 强力终止进程时可能留下损坏锁文件；网关自身崩溃重启时锁未正确释放。修复后网关重启失败等待时间从 30s 大幅缩短 |
| **新增对话搜索** | [#2435](https://github.com/netease-youdao/LobsterAI/pull/2435) | 在标题栏增加了会话搜索按钮，复用侧栏搜索工作流，并优化了搜索 UI 的响应式样式和查询感知导航 |
| **活动体验修复** | [#2432](https://github.com/netease-youdao/LobsterAI/pull/2432) | 禁用世界杯决赛奖励弹窗自动弹出，改为手动领取；[#2433](https://github.com/netease-youdao/LobsterAI/pull/2433) 裁剪启动海报白边，优化奖励领取失败提示 |
| **启动海报资产更新** | [#2438](https://github.com/netease-youdao/LobsterAI/pull/2438)、[#2439](https://github.com/netease-youdao/LobsterAI/pull/2439) | 替换启动 credit 海报为最新美术资源，并补上右上角关闭图标，保持原有交互不变 |
| **依赖升级** | [#1279](https://github.com/netease-youdao/LobsterAI/pull/1279) (cross-env 7→10)、[#1280](https://github.com/netease-youdao/LobsterAI/pull/1280) (react-dom 18→19)、[#1281](https://github.com/netease-youdao/LobsterAI/pull/1281) (vite 5→8) | 三个 Dependabot PR 今日关闭，应已完成合并或处理 |

---

## 社区热点

今日最活跃的 Issue 为 **#1200**（NIM 群名解析 Bug），该 Issue 创建于 4 月，今日获得新评论并再次被关注：

- 🐛 [#1200](https://github.com/netease-youdao/LobsterAI/issues/1200)：`teamTypeNum` 硬编码错误导致超大群/普通群 @机器人时群名无法正确获取。评论数 1（今日更新），用户手动 @ 了关联 PR。

此外，今日新开的两个 Issue（#2441、#2440）虽然暂无评论，但均来自同一用户 @fujingzhai，提交质量较高（包含 复现步骤、成因分析、代码位置），预计将引发较大讨论。三个 Issue 的共同诉求是 **用户对系统提示词和技能配置的可控性、透明度不满意**，希望项目提供持久精简系统提示词的入口，并保证配置写入与运行时规则一致。

---

## Bug 与稳定性

今日报告的 Bug 按严重程度排列：

| 严重度 | Issue/PR | 描述 | 是否已有修复 |
|--------|----------|------|--------------|
| 🔴 高 | [#1200](https://github.com/netease-youdao/LobsterAI/issues/1200) | NIM 超大群/普通群消息中 `teamTypeNum` 传参错误，导致 SDK 误判会话类型，群名获取失败。影响超 4 个月的存量 Bug，日常 @机器人场景可见。 | 已有 PR [#1201](https://github.com/netease-youdao/LobsterAI/pull/1201) 处于 OPEN/待合并状态，但该 PR 同样滞留 4 个月未处理 |
| 🟡 中 | [#2441](https://github.com/netease-youdao/LobsterAI/issues/2441) | 技能开关按目录名写入，OpenClaw 按 frontmatter name 匹配，不一致时开关静默失效；且 `openclaw.json` 被整文件覆盖，用户无持久精简入口。涉及配置同步逻辑与运行时约定不匹配。 | 暂无修复 PR |
| 🟡 中 | [#2440](https://github.com/netease-youdao/LobsterAI/issues/2440) | 桌面端每个新会话首条用户消息注入 `[LobsterAI system instructions]` 块，其中 78% 内容与 `AGENTS.md` 托管区重复，导致模型重复读取同一指令。可能轻微影响 token 消耗和回复质量。 | 暂无修复 PR |

**稳定性修复进展：** 今日合并的 [#2437](https://github.com/netease-youdao/LobsterAI/pull/2437) 和 [#2436](https://github.com/netease-youdao/LobsterAI/pull/2436) 分别解决了应用退出挂起和网关锁中毒问题，均属于底层稳定性增强，有助于提升自恢复能力。

---

## 功能请求与路线图信号

- **标题栏会话搜索**（[#2435](https://github.com/netease-youdao/LobsterAI/pull/2435)）已实现并合并，表明项目在完善桌面端对话管理交互，后续可能继续扩展搜索范围（如全文检索）。
- **账户级隔离**（[#2409](https://github.com/netease-youdao/LobsterAI/pull/2409)）预示企业/多租户场景是近期重点方向，可能为后续 SSO、权限管理等功能铺路。
- Issue [#2441](https://github.com/netease-youdao/LobsterAI/issues/2441) 中提到的"**持久精简系统提示词**"需求，是用户强烈希望进入路线图的信号，建议后续版本考虑支持用户自定义系统提示词模板，或将技能开关的匹配逻辑统一为 frontmatter `name`。
- Issue [#2440](https://github.com/netease-youdao/LobsterAI/issues/2440) 揭示的系统提示词重复注入问题，很可能在下一版本中通过去重/合并机制修复，因为该问题直接影响每次会话的 token 成本和上下文质量。

---

## 用户反馈摘要

- **@MaoQianTu**（#1200）：反馈在超大群和普通群中 @机器人时，群名显示为原始 ID 而非中文群名，定位到是 `nimGateway.ts` 中 `teamTypeNum` 硬编码值错误。用户详细比对了 SDK 枚举值，确认是传参 bug，并给出修复建议，体现了较高的技术素养。
- **@fujingzhai**（#2441、#2440）：作为深度用户，非常关注系统提示词的精简和控制权。对技能开关静默失效和提示词重复注入的现象表达了明显的困扰，指出"用户没有办法持久地精简进入每次新对话的系统提示词"，说明用户期望更高的透明度和可配置性。其提交的 Issue 包含实测数据（`finalPromptText` 中 4,425 字符重复），可信度高。

---

## 待处理积压

以下为长期未响应或可能滞后的重要事项，提醒维护者关注：

| 类型 | 编号 | 滞留时长 | 说明 |
|------|------|----------|------|
| Bug Issue | [#1200](https://github.com/netease-youdao/LobsterAI/issues/1200) | ~4 个月 | NIM 群名获取失败，用户已另开 PR 修复，但 PR 同样滞留 4 个月未合并。建议优先处理 |
| PR | [#1201](https://github.com/netease-youdao/LobsterAI/pull/1201) | ~4 个月 | 对应 #1200 的修复，仅一行改动，代码注释已明确映射关系，风险极低，可尽快合并 |
| Dependabot PR | [#1279](https://github.com/netease-youdao/LobsterAI/pull/1279)、[#1280](https://github.com/netease-youdao/LobsterAI/pull/1280)、[#1281](https://github.com/netease-youdao/LobsterAI/pull/1281) | ~4 个月 | 三个依赖升级 PR 今日状态变更为 CLOSED，但暂未确认是否成功合并。若关闭未合并，建议检查 Dependabot 自动关闭原因，避免依赖长期滞后 |

---

**总结：** 项目今日处于稳定迭代周期，每日签到、企业级隔离等新功能落地，同时针对窗口生命周期、网关锁竞态等稳定性问题进行了加固。但 #1200 这类历史 Bug 的修复 PR 滞留过久，以及 #2440/#2441 所反映的系统提示词控制权问题，应成为接下来版本规划的重要输入。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-06

> 数据范围：过去 24 小时（2026-08-05 → 2026-08-06）｜数据源：GitHub issues/PR 活动

## 今日速览

过去 24 小时 CoPaw 仓库活跃度处于高位：15 条 Issue 更新（13 条活跃、2 条关闭），50 条 PR 更新（30 条待合并、20 条已合并/关闭）。今日无新版本发布，但有多个合入时间较长的核心 PR 完成关闭，最值得注意的是 **LLM fallback 前后端实现** 与 **DeepSeek 思考模式兼容性修复**。Issue 侧 Bug 报告密度偏高，其中 **MCP 工具规律性失效** 与 **长会话 tool 消息 400 错误** 是当前最突出的稳定性风险。整体判断：项目正处于功能迭代与稳定性加固并行阶段，外部贡献者活跃（多个 first-time-contributor PR），社区健康度良好。

## 项目进展

今日关闭/合并的 PR 中，以下几条对项目推进意义最大：

- **LLM 模型 fallback 后端 + 配置 UI 完成合入** —— [#5597 feat(backend): per-agent and global LLM model fallback](https://github.com/agentscope-ai/QwenPaw/pull/5597) 与 [#5598 feat(console): add LLM fallback configuration UI](https://github.com/agentscope-ai/QwenPaw/pull/5598) 协同落地。两者自 6 月 29 日创建，经过约五周审阅后关闭。功能上：同一模型内保持重试，重试耗尽后按配置列表自动切换后备模型。这是模型容错与可用性的重要基础设施。
- **DeepSeek 思考模式修复已关闭** —— [#6675 fix: force relay reasoning_content for DeepSeek models](https://github.com/agentscope-ai/QwenPaw/pull/6675) 修复了 #6667、#6541 两个历史问题；同一问题域的另一 PR [#6721 fix: retry reasoning-content errors for AgentScope messages](https://github.com/agentscope-ai/QwenPaw/pull/6721) 仍在开放中。
- **Console 渠道错误恢复修复** —— [#5447 fix(channel): yield failed AgentResponse on console errors to unblock UI](https://github.com/agentscope-ai/QwenPaw/pull/5447) 解决了模型或运行时错误导致 UI 永久等待的问题。
- **模型重试逻辑重构合并** —— [#3874 feat(model): refine retry logic](https://github.com/agentscope-ai/QwenPaw/pull/3874) 自 4 月 27 日发起，最终于 8 月 5 日关闭。
- **全局响应式工具类合入** —— [#5462 feat(console): add global responsive utility classes](https://github.com/agentscope-ai/QwenPaw/pull/5462)，为移动端适配提供共享样式基础。

此外，测试基础设施也在同步改进：[#6727 fix(tests): make directory auto-marking work on Windows, unhiding 66 cases](https://github.com/agentscope-ai/QwenPaw/pull/6727) 修复了 Windows 上目录路径反斜杠导致 66 个集成测试被静默跳过的问题，CI 可信度显著提升。

## 社区热点

- **#6436 自动模型路由**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6436)）—— 今日评论数最高（3 条）。作者提出为每条消息动态选择最适合的模型：简单请求走本地小模型、图像输入走视觉模型、复杂推理走大模型，而非所有 agent 固定单一模型。这是对 CoPaw 模型管理方式的产品级诉求，与开放 PR #6302（provider 发现、模型元数据、路由）形成路线图呼应。
- **#6732 MCP 工具规律性失效**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6732)）—— 新 Issue 但用户痛点鲜明：MCP 工具每隔数小时到一晚即失效，重启 docker 容器才能恢复。MCP 稳定性正在成为高频反馈主题。
- **#6480 nohup/后台命令导致 agent 卡住**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6480)）—— 提供详细复现步骤，讨论已持续数日，但尚无修复 PR。
- **#6413“完整模式”UI 困惑**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6413)）—— 已于今日关闭，但用户原声“其实就是配置！！！！！”，反映了桌面端 UI 信息架构的认知成本问题。

## Bug 与稳定性

按严重程度排列：

| 级别 | Issue | 描述 | 修复状态 |
|---|---|---|---|
| P0 | [#6732 MCP 工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732) | MCP 工具数小时/一晚后不可用，需重启容器恢复 | 未修复 |
| P0 | [#6726 长会话 tool 消息 400 错误](https://github.com/agentscope-ai/QwenPaw/issues/6726) | 20–30+ 对 tool_call/tool_result 后，请求因 “Messages with role 'tool' must be a response to a preceding message with 'tool_calls'” 失败 | 未修复 |
| P1 | [#6731 execute_shell_command 崩溃](https://github.com/agentscope-ai/QwenPaw/issues/6731) | 模型传入 sandbox_config 时触发 `replace() should be called on dataclass instances` | 未修复 |
| P1 | [#6707 thinking 模式 reasoning_content 400](https://github.com/agentscope-ai/QwenPaw/issues/6707) | 会话历史含 thinking blocks + tool calls 时上游拒绝请求 | 已有 PR [#6721](https://github.com/agentscope-ai/QwenPaw/pull/6721)、[#6675](https://github.com/agentscope-ai/QwenPaw/pull/6675) |
| P1 | [#6722 fork 子代理误报完成](https://github.com/agentscope-ai/QwenPaw/issues/6722) | worktree finalization 失败但任务报告 completed | 已有 PR [#6725](https://github.com/agentscope-ai/QwenPaw/pull/6725) |
| P2 | [#6708 SSE 流内 503 不重试](https://github.com/agentscope-ai/QwenPaw/issues/6708) | 上游网关 SSE 内报 503，请求直接失败，未重试 | 未修复 |
| P2 | [#6480 nohup 后台命令卡住](https://github.com/agentscope-ai/QwenPaw/issues/6480) | 含 `nohup`/`&` 的 shell 命令导致 agent 永不返回 idle | 未修复 |

另有测试类问题 [#6716（集成测试 KeyError）](https://github.com/agentscope-ai/QwenPaw/issues/6716) 已关闭（invalid），修复见 PR [#6729 test(integration): verify auto-update targets via pool detail endpoint](https://github.com/agentscope-ai/QwenPaw/pull/6729)。

## 功能请求与路线图信号

- **自动模型路由（#6436）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6436)）—— 现有开放 PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（统一 provider 发现、模型元数据、路由）若合入，将为自动路由奠定架构基础。属于中远期高价值方向。
- **Live artifact canvas（#6730）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6730)）—— 在 Console 侧栏直接渲染 agent 生成的 HTML 产物。与开放 PR [#6719 feat(chat): add persistent workspace artifact cards](https://github.com/agentscope-ai/QwenPaw/pull/6719) 方向一致，后者先行实现数据层，UI 渲染层有望在后续版本跟进。
- **MCP 工具超时可配置（#6724）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6724)）—— 与 #6732 MCP 失效问题直接关联，属于小改动高收益，很可能进入下一个小版本。
- **WeChat 审批动作支持中文（#6728）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6728)）—— 本地化小改进，容易被快速合入。
- **“新建聊天”更名为“新任务”（#6734）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6734)）—— 产品心智校准，改动成本低，被接受概率高。
- **用户上下文透明穿透（PR #6525）**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6525)）—— 将 user_id、channel 等上下文从 Chat API 穿透到 Agent → Tool → MCP → SKILL CLI 子进程。这是平台级能力，影响面大，需安全审查，属于企业级路线图信号。

## 用户反馈摘要

- **MCP 稳定性挫伤信任** —— “每隔一些时间（可能是一个晚上或者几个小时），mcp 工具就无效了……重启 qwenpaw docker 容器后，就能恢复。”（[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)）容器化部署用户对自动恢复能力有明确期待。
- **产品定位认知冲突** —— “qwenpaw 是个帮用户执行任务的工具……叫‘新任务’更合适”。（[#6734](https://github.com/agentscope-ai/QwenPaw/issues/6734)）用户正在将 CoPaw 从“聊天工具”重塑为“任务执行工具”。
- **重度多工具使用场景受挫** —— 长 console 会话中 20–30+ 次工具调用后 400 失败，“tool 消息必须对应 tool_calls”的错误在常规使用中不应出现。（[#6726](https://github.com/agentscope-ai/QwenPaw/issues/6726)）
- **对精细模型控制的渴望** —— “简单回合用小型快速本地模型，出现图片时用视觉模型，困难推理用大模型”。（[#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436)）
- **UI 信息架构被诟病** —— “完整模式（其实就是配置！！！！！）” 的表达在多位用户中出现，建议以配置按钮替代模式切换。（[#6413](https://github.com/agentscope-ai/QwenPaw/issues/6413)）

## 待处理积压

- **Issue [#6480 nohup 命令卡住](https://github.com/agentscope-ai/QwenPaw/issues/6480)** —— 自 7 月 26 日提出，已有 10 天，提供了完整复现步骤但无修复 PR，建议维护者优先确认并安排修复。
- **Issue [#6436 自动模型路由](https://github.com/agentscope-ai/QwenPaw/issues/6436)** —— 自 7 月 24 日提出，讨论充分但无对应 PR 或设计文档，建议纳入路线图并指派负责人。
- **PR [#6302 provider 统一/模型元数据/路由](https://github.com/agentscope-ai/QwenPaw/pull/6302)** —— 已开放 16 天，属于架构级大 PR，涉及面广，合入周期可能较长；建议拆解审阅或增加 reviewer 以避免长期漂移。
- **PR [#6525 用户上下文透明穿透](https://github.com/agentscope-ai/QwenPaw/pull/6525)** —— 已开放 9 天，功能完整但涉及 Chat API → SKILL CLI 全链路数据传递，需安全性与兼容性审阅。

值得关注的是，今日合入的 LLM fallback PR（#5597/#5598）从创建到关闭耗时约 38 天。若当前多个大 PR（#6302、#6525）继续以相同审阅节奏推进，功能落地周期可能进一步拉长，这是在项目健康度评估中需要持续观察的信号。

</details>
