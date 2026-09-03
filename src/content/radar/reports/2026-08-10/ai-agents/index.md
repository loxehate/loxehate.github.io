---
title: OpenClaw 生态日报
published: 2026-08-10
report: ai-agents
tags:
  - radar
  - AI
---
# OpenClaw 生态日报 2026-08-10

> Issues: 180 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-10 01:43 UTC

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

# OpenClaw 项目动态日报 — 2026-08-10

## 1. 今日速览

过去24小时OpenClaw项目保持极高活跃度：新增/活跃Issue 159条、关闭21条，PR更新500条（其中已合并/关闭173条），无新版本发布。项目整体处于密集开发迭代期，社区反馈量巨大，但合并率（约34.6%）显示维护者审查能力与提交量之间存在一定缺口。今日最突出的技术主题集中在：**重复消息/副本传递问题**（多个P1）、**macOS平台更新后重启循环**（P0/P1回归）、**多智能体会话状态管理**以及**内存与上下文窗口优化**。值得关注的是，大量高优Issue（P1/P0）仍处于`needs-maintainer-review`或`needs-product-decision`状态，表明维护团队在产品决策和修复排期上可能面临瓶颈。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日合并/关闭了173个PR，但展示数据中明确可见的已合并PR较少，以下为可追踪的重点变更：

- **PR #119917 [已关闭]** `fix(cron): preserve trigger.once when replacing trigger script` — 修复了CLI更新定时触发脚本时丢失`trigger.once`配置的问题，打通了CLI到Gateway的持久化路径。该PR吸收了来自草稿PR #120226的producer-side修复，体现了维护者对PR质量的把控。链接：https://github.com/openclaw/openclaw/pull/119917

- **PR #121330 [新增]** `docs: replace retired config keys with canonical schema keys` — 修复了40+文档页面中约50个已废弃配置键示例，这些示例在当前严格zod校验下会导致`Unrecognized key`错误。该PR直接消除了用户因照抄旧文档导致配置失败的问题。链接：https://github.com/openclaw/openclaw/pull/121330

- **PR #117614 [待审查]** `fix(cli): let live health finish bounded Gateway probes` — 让Gateway自主管理`health --verbose`和`status --deep`中的可变时长工作，同时保持滚动升级的可取消性。链接：https://github.com/openclaw/openclaw/pull/117614

- **PR #121063 [新增]** `fix(agent-core): bound runaway loops with turn/error-batch/idle-repeat guards` — 修复worker agent因外部服务HTTP 429（被包装成"成功"工具输出）驱动219轮助手转折/177次工具调用/约1500万token的失控循环问题，为原生runLoop添加了三层防护。链接：https://github.com/openclaw/openclaw/pull/121063

- **PR #121166 [待审查]** `fix(gateway): deliver global session events to their scoped observers` — 修复了全局会话订阅者因agent-scoped注册键与`global`别名广播路径不一致而静默丢失事件的问题。链接：https://github.com/openclaw/openclaw/pull/121166

总体来看，项目今日在**文档正确性、会话事件投递可靠性、失控循环防护、CLI健康检查健壮性**四个方向都有实质推进，且修复多为用户直接报告的高频痛点。


## 4. 社区热点

以下为今日讨论最活跃的Issue，反映了社区的集中诉求：

**#22438 — Tiered bootstrap file loading for progressive context control（19条评论）**
链接：https://github.com/openclaw/openclaw/issues/22438
需求：bootstrap文件每次会话都消耗LLM token，对于大型工作区，将全部文件加载进每个会话（包括子代理和cron任务）浪费了上下文窗口预算。建议引入分层加载机制。
热度分析：这是长期悬而未决的上下文优化需求，评论数高但`👍`为0，说明讨论者以方案辩论为主。项目已有多篇PR涉及bootstrap注入顺序优化（如#65438），预计该需求会被拆解为多个前置优化逐步落地。

**#69208 — Umbrella: duplicate transcript, replay, and context assembly across channels（13条评论）**
链接：https://github.com/openclaw/openclaw/issues/69208
需求：跨MSTeams、webchat、Telegram、followup队列、delivery-mirror等渠道存在一类重复transcript/replay/context assembly bug，目前以独立Issue分散报告，需要统一治理。
热度分析：这是维护者提出的umbrella issue，说明团队已意识到此类问题的系统性。结合今日#96242（Telegram重复消息P1）、#93831（reply fence取消in-flight回复）、#120488（process poll重复heartbeat）等，重复消息/重复投递已成为当前最集中的稳定性问题族。

**#72015 — active-memory blocks replies and QMD boot initialization can overload multi-agent gateways（10条评论）**
链接：https://github.com/openclaw/openclaw/issues/72015
需求：启用官方`active-memory`插件后，多智能体网关的正常回复变慢或不可靠；QMD启动初始化可能使网关过载。
热度分析：社区对官方插件在真实多智能体场景下的性能表现有强烈关注，`👍: 2`。该Issue涉及crash-loop影响，但修复方案需要产品决策，短期可能无法快速解决。

**#96242 — Multiple independent paths cause duplicate Telegram messages（8条评论）**
链接：https://github.com/openclaw/openclaw/issues/96242
需求：Telegram bot通过至少三条独立路径发送重复消息，已确认是P1且影响消息丢失。
热度分析：重复消息是最直接的用户可见故障，`👍: 2`，社区反馈积极。该Issue与#69208 umbrella相关，但与#93831、#120488等构成同一类问题族，维护者可能正在统一修复。


## 5. Bug 与稳定性

今日报告的Bug按严重程度排列如下：

### P0（发布阻塞）
- **#87928 — macOS update can leave manual-update loop and stale node host causing Gateway restart storm**（`maturity:stable`, `impact:ux-release-blocker`）
  链接：https://github.com/openclaw/openclaw/issues/87928
  状态：OPEN，`no-new-fix-pr`，`needs-maintainer-review`
  摘要：macOS升级后Gateway每约75秒重启一次，伴随node版本不匹配和SIGTERM循环。与今日#111372（见下）构成同类问题族。**无修复PR**。

### P1（高优）
- **#111372 — Gateway restarts immediately after "loading configuration" - infinite SIGTERM loop on macOS**（`regression`, `maturity:stable`）
  链接：https://github.com/openclaw/openclaw/issues/111372
  状态：OPEN，`source-repro`，`needs-maintainer-review`
  摘要：从2026.6.11升级到2026.7.1-2后，macOS上Gateway进入无限重启循环。**无修复PR**，但#87928可能共享根因。

- **#96242 — Multiple independent paths cause duplicate Telegram messages**（`bug`, `P1`）
  链接：https://github.com/openclaw/openclaw/issues/96242
  状态：OPEN，`source-repro`
  摘要：Telegram bot通过至少三条独立路径发送重复消息，影响消息丢失。**无直接修复PR，但相关#69208 umbrella在推进中**。

- **#78805 — Severe Event Loop Blocking / Freezing due to Synchronous I/O**（`regression`, `P1`）
  链接：https://github.com/openclaw/openclaw/issues/78805
  状态：OPEN，`needs-info`
  摘要：Node.js主线程被`execSync`/`readFileSync`阻塞长达4秒，导致连接通道（如Slack）冻结。**无修复PR**，需更多信息。

- **#118489 — Failed-tool finalization is still skipped after prior tool presentation or stale lifecycle state**（`bug`, `P1`）
  链接：https://github.com/openclaw/openclaw/issues/118489
  状态：OPEN，`linked-pr-open`
  摘要：#118344的修复覆盖了完全settled的失败terminal tool，但仍有两种状态组合会抑制tools-disabled finalizer。**已有PR在跟进**（#118344相关）。

- **#91941 — Feishu streaming card full-content updates cause severe latency regression**（`regression`, `P1`）
  链接：https://github.com/openclaw/openclaw/issues/91941
  状态：OPEN，`linked-pr-open`
  摘要：Feishu流式卡片从后缀负载改为全量累积文本后，长回复的CardKit更新延迟急剧增长。**有linked PR**。

- **#108865 — Feishu/Channels drop inbound messages when session is archived**（`stale`, `P1`）
  链接：https://github.com/openclaw/openclaw/issues/108865
  状态：OPEN，`needs-maintainer-review`
  摘要：会话归档后入站消息被静默丢弃，无自动恢复机制。**无修复PR**。

### P2（中优）
- **#120488 [已关闭]** process poll不消费notifyOnExit事件导致重复heartbeat — 已关闭，修复可能已合并。
- **#110153 — Tool-error warnings fire on benign non-zero exits** — `fix-shape-clear`, `queueable-fix`，可排队修复。
- **#58139 [已关闭]** memory-lancedb在Windows Docker bind mount下失败 — 已关闭。

**稳定性趋势总结**：macOS更新后重启循环（#87928/#111372）和跨渠道重复消息（#69208/#96242/#93831/#120488）是当前两大稳定性痛点。macOS相关问题大概率与嵌入式Node路径管理有关，危害大且影响stable用户；重复消息问题则牵涉多个独立代码路径，需要系统性重构。


## 6. 功能请求与路线图信号

以下是今日社区提出的功能需求，结合已有PR判断其纳入路线图的可能性：

| 功能请求 | 热度/评论 | 已有PR/关联工作 | 纳入下一版本可能性 |
|---------|----------|----------------|-------------------|
| **#22438 Tiered bootstrap file loading** — 分层加载bootstrap文件以节省LLM token | 19条评论 | 关联#65438（bootstrap注入顺序优化）已有PR | 高：多篇PR铺垫，上下文优化是持续主题，预计拆解落地 |
| **#67413 Per-agent dreaming configuration** — 按agent独立配置dreaming，避免全workspace同时运行导致OOM | 8条评论, 👍5 | 无直接PR | 中高：社区需求明确，涉及内存稳定性，但需产品决策 |
| **#60572 Multi-Slot Memory Architecture** — 将单一memory slot替换为多个目的专属slot | 6条评论, 👍3 | 无直接PR | 中：架构级变更，需要较长时间设计，但方向与社区期望一致 |
| **#63990 Multi-index embedding memory with model-aware failover** — 多索引embedding以支持模型故障切换 | 6条评论, 👍1 | 无直接PR | 中：企业级可靠性需求，可能纳入远期路线图 |
| **#78301 Plugin loader silent failures** — 插件加载器对无效插件契约静默失败，增加调试成本 | 6条评论, 👍2 | 无直接PR | 高：`needs-security-review`已标记，属于开发者体验类高频痛点，修复成本相对可控 |
| **#33975 Fallback approval mode + model attribution** — 模型回退时通知用户并提供审批选项 | 6条评论 | 无直接PR | 中：与#79163、#80502构成同一需求族，但尚无PR表明下周会落地 |
| **#117178 Confirm disruptive lifecycle actions in Control UI** — 对更新/重启/关机等操作增加确认步骤 | 5条评论 | PR #121249（dialog替代browser prompt）相关 | 高：与UI打磨方向一致，PR #121249已接近合并 |
| **#66010 Sub-agent cascade circuit breaker** — 子代理级联失败断路器 | 4条评论 | 无直接PR | 低：讨论量尚低，但#121063的runaway loop防护可能部分覆盖此需求 |
| **#63272 `skills uninstall` CLI command** | 4条评论, 👍4 | 无直接PR | 中：社区呼声高，实现范围明确，适合社区贡献者接手 |

**路线图信号**：短期内（下一版本）最可能纳入的功能包括：**bootstrap加载优化**（背景prompt cache优化）、**插件加载器错误提示改进**、**Control UI操作确认**。中长期（未来1-2个版本）可能看到**per-agent dreaming配置**、**multi-slot memory架构**的早期设计讨论。


## 7. 用户反馈摘要

从今日Issues评论中提炼的真实用户反馈：

**高频痛点：**

1. **macOS更新后系统稳定性严重受损**（#87928/#111372）
   - 用户`@Neomail2`反馈：升级后Gateway每75秒重启一次，日志显示node版本不匹配。**影响：stable渠道用户升级信心受挫。**

2. **升级后配置失效，旧文档误导**（#121330/#77849）
   - PR #121330作者`@steipete`指出：约50个配置示例在40+文档页面中仍教授已废弃的配置键，导致严格校验失败。用户`@sanjarcode`反馈文档缺少backup恢复步骤。**影响：新用户上手成本和老用户升级成本同时增加。**

3. **重复消息造成实质性干扰**（#96242/#93831/#120488）
   - 用户`@rosenlo`确认Telegram重复消息至少来自三条独立代码路径；`@xmoxmo`和`@aaajiao`分别报告了reply fence和process poll中的重复投递问题。**影响：高优P1，直接破坏用户体验。**

4. **插件静默失败严重消耗调试时间**（#78301）
   - 用户`@lawong888`详述了两个插件加载器静默容忍的authoring bug，最终表现为晦涩的运行时错误，**"cost hours of debugging"**。这是开发者体验的典型负面反馈。

5. **多智能体场景缺乏精细化控制**（#67413/#60572/#22774）
   - `@aaronwong1989`指出所有workspace同步dreaming导致6GB内存超限触发OOM；`@ARplus`抱怨Chat UI中多agent角色无法区分，子agent回复显示为人类头像。**影响：多智能体场景的部署门槛依然较高。**

**正面反馈：**
- PR #121332作者`@scotthuang`针对WebChat follow-up问题提交修复，解决了用户反馈的具体场景。
- 多个PR（#121330、#121263、#121334）由`@steipete`持续贡献，文档规范性和架构一致性在逐步提升。

**总体满意度判断**：用户在功能层面有大量期待，但对稳定性的抱怨集中在macOS平台和跨渠道消息投递。文档问题虽然数量多但属于低垂果实，修复PR响应较快。


## 8. 待处理积压

以下为长期未响应或等待维护者关注的重要Issue/PR：

**紧急/高优积压（按严重度排序）：**

1. **#87928 [P0] macOS update restart storm** — `stale`标记，5月29日创建，至今无fix PR
   链接：https://github.com/openclaw/openclaw/issues/87928
   影响：stable用户升级后Gateway无法使用。虽标记`stale`，但#111372（7月19日新报告）表明问题仍存在且影响新版本。**建议维护者合并处理两个Issue，优先排查嵌入式Node路径管理。**

2. **#111372 [P1] macOS infinite SIGTERM restart loop** — 7月19日创建，`regression`，无fix PR
   链接：https://github.com/openclaw/openclaw/issues/111372
   影响：从6.11升级到7.1-2后触发，与#87928大概率同根因。

3. **#96242 [P1] Duplicate Telegram messages** — 6月24日创建，无直接fix PR
   链接：https://github.com/openclaw/openclaw/issues/96242
   影响：重复消息导致用户接收冗余信息，且已有三条独立路径确认。建议结合#69208 umbrella进行系统性修复。

4. **#78805 [P1] Event loop blocking due to sync I/O** — 5月7日创建，`needs-info`后无进展
   链接：https://github.com/openclaw/openclaw/issues/78805
   影响：同步I/O导致4秒级阻塞，多个渠道受影响。社区反馈积极但缺乏维护者行动。

5. **#108865 [P1] Feishu drops inbound messages when session archived** — 7月16日创建，`stale`标记
   链接：https://github.com/openclaw/openclaw/issues/108865
   影响：会话归档后消息静默丢失，无恢复机制。

**长期未合并/进展缓慢的重要PR：**

6. **#117614 [P1] fix(cli): let live health finish bounded Gateway probes** — 8月1日创建，`ready for maintainer look`
   链接：https://github.com/openclaw/openclaw/pull/117614
   状态：等待维护者审查，已处于`👀 ready for maintainer look`一周。

7. **#114388 [P1] refactor(agents): make multi-agent ownership explicit** — 7月27日创建，`waiting on author`
   链接：https://github.com/openclaw/openclaw/pull/114388
   状态：核心架构变更，涉及多agent `default:true`标记移除，对多agent部署有重大影响。

8. **#101248 [P1] feat(subagents): native announceTarget for subagent completion routing** — 7月7日创建，`needs proof`
   链接：https://github.com/openclaw/openclaw/pull/101248
   状态：等待行为证明，与#96242等消息路由问题相关。

9. **#120190 [P1] fix(compaction): add bounded resumable recovery** — 8月7日创建，`needs proof`
   链接：https://github.com/openclaw/openclaw/pull/120190
   状态：compaction预检失败恢复，需要更多证明。

**维护者行动建议：**
- 优先将#87928和#111372合并为同一问题族，查找macOS嵌入式Node路径管理的回归点
- 针对重复消息问题，考虑由维护者直接驱动#69208 umbrella的修复节奏，而非等待社区逐一提交
- 对P1的`needs-maintainer-review`积压项（#108865、#78301等）进行批量产品决策，明确是否接受建议的修复方案


> 本报告基于公开GitHub数据生成，仅供项目健康度参考。所有链接均可点击跳转至对应Issue/PR页面。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期：2026-08-10**
**分析范围：OpenClaw / Zeroclaw / PicoClaw / NanoClaw / IronClaw / LobsterAI / Moltis / CoPaw**


## 1. 生态全景

个人 AI 助手与自主智能体开源生态正从“功能堆叠”转向“稳定性治理与架构演进”并行的阶段。各项目当日均呈现高提交量、低合并率的共同特征，“高产低合”已成为生态普遍瓶颈。技术竞争焦点集中在上下文窗口管理、消息投递可靠性、供应链安全加固三大方向，同时多智能体协作、跨模型编排正在成为下一代能力的角力点。生态内部已出现明确分化：头部项目（OpenClaw、IronClaw）通过系统性修复构建可信基座，而新锐项目（Zeroclaw、NanoClaw）则选择技术栈重写或安全基线重塑作为差异化切入点。


## 2. 各项目活跃度对比

| 项目 | Issues 动态 | PR 动态 | Release | 健康度评估 |
|------|------------|---------|---------|-----------|
| **OpenClaw** | 159 新增/活跃，21 关闭 | 500 更新，173 合并/关闭 | 无 | ★★★★☆ 极高活跃，合并率 34.6% 显示审查瓶颈；P0/P1 积压较多但修复推进扎实 |
| **Zeroclaw** | 6 更新，0 关闭 | 50 更新，1 关闭 | 无 | ★★★☆☆ 活跃度高但合并节奏慢（49 待合并），大量 `needs-author-action` 阻塞流程 |
| **PicoClaw** | 3 更新，1 stale 关闭 | 6 更新，1 合并/关闭 | 无 | ★★★☆☆ 小规模但响应迅速，SSRF 修复系列质量高，5 条待合并属正常水位 |
| **NanoClaw** | 1 新增 | 16 更新，0 合并/关闭 | 无 | ★★★☆☆ 提交旺盛但合并吞吐为 0，最长 PR 滞留近 3 个月，健康度偏差 |
| **IronClaw** | 22 更新（15 活跃，7 关闭） | 28 更新（8 合并/关闭） | 无 | ★★★★☆ 双轨节奏清晰（bug 修复 + 架构演进），UI 类 bug 当日闭环率高 |
| **LobsterAI** | 3 更新，0 关闭 | 0 | 无 | ★★☆☆☆ 低频讨论期，PR 与 Release 均为 0；关键自定义模型 bug 待响应 |
| **Moltis** | 2 更新，0 关闭 | 1 新增，0 合并 | 无 | ★★★☆☆ 低频但稳定，vault 修复 PR 待 review，属成熟维护期 |
| **CoPaw** | 17 更新（11 活跃，6 关闭） | 42 更新（仅 1 合并） | 无 | ★★★★☆ 社区参与度高（first-time-contributor 密集），但 41 条 PR 积压需警惕 |

> NanoBot 因数据获取失败，未纳入对比。
>
> **总体印象**：所有项目均处于“有活跃提交但合并吞吐不足”的状态。OpenClaw 与 IronClaw 的项目治理相对健康；NanoClaw 的 0 合并和 Zeroclaw 的 15 条 `needs-author-action` 需要重点关注。


## 3. OpenClaw 在生态中的定位

### 3.1 核心优势

- **体量绝对领先**：单日 500 条 PR 更新、159 条 Issue 新增，相当于 Zeroclaw 的 10 倍、CoPaw 的 12 倍。社区规模是生态中无可争议的第一梯队，远超其他项目。
- **维护者审查质量高**：PR #119917 吸收了草稿 PR 的 producer-side 修复再合并，体现对代码质量的严格把控；PR #121330 一次性修复 40+ 文档页面，直接消除用户配置失败根因。
- **问题响应体系化**：针对重复消息问题，主动建立 umbrella issue（#69208）进行系统性治理，而非等待社区逐个报告。这比 Zeroclaw 和 PicoClaw 的“单点修复”策略更具前瞻性。

### 3.2 技术路线差异

| 维度 | OpenClaw | 同类对比 |
|------|----------|---------|
| **架构策略** | 在现有 Node.js/TypeScript 架构上做深度稳定性治理，追求“让已有功能可靠” | Zeroclaw 选择 Rust 重写；NanoClaw 在宿主层做模块化解耦 |
| **上下文优化** | 正在推进 tiered bootstrap 分层加载（#22438），属于渐进式优化，兼顾问答与子代理场景 | LobsterAI 用户直接要求“可配置上下文窗口大小”；IronClaw 通过 tool_search 减少模型推理轮次来间接节省 token |
| **渠道策略** | 全渠道覆盖（MSTeams、Telegram、Feishu…），但重复消息问题跨渠道泛滥，反映“广撒网”的维护成本 | PicoClaw 同样多渠道但规模较小，问题可控 |
| **安全与隐私** | 今日无重大安全 PR，更聚焦功能正确性 | Zeroclaw 和 NanoClaw 的安全加固强度更高，分别有 SSRF 修复和 tar CVE 修复 |

### 3.3 社区规模对比

以单日动态为样本：
- OpenClaw：159 issues / 500 PRs / 173 合并
- CoPaw：17 issues / 42 PRs / 1 合并
- IronClaw：22 issues / 28 PRs / 8 合并
- Zeroclaw：6 issues / 50 PRs / 1 合并
- NanoClaw：1 issue / 16 PRs / 0 合并

OpenClaw 的单日 PR 量是第二名的 10 倍，这既是生态影响力的证明，也是维护者审查压力的来源。34.6% 的合并率低于 IronClaw 的 28.6%（合并/更新）背后的实际效率对比——注意 IronClaw 的统计口径是“合并/关闭”，OpenClaw 为“已合并/关闭”占新增比例，两者不可直接比，但 OpenClaw 的绝对积压量是生态中最大的。


## 4. 共同关注的技术方向

### 4.1 上下文窗口与内存管理（跨 5 项目）

| 项目 | 具体诉求 | 状态 |
|------|---------|------|
| **OpenClaw** | #22438 Tiered bootstrap 分层加载，避免全量加载浪费 token | 评论 19 条，已有铺垫 PR |
| **LobsterAI** | #1187 上下文窗口大小与输出 token 可配置，否则 DeepSeek 等模型持续报 Context overflow | stale 4 个月，仍有新评论 |
| **IronClaw** | #7405 tool_search 返回完整签名，减少模型推理轮次消耗 | Phase 1 PR 已提交 |
| **CoPaw** | #6840 ReMe 内存系统路线图（Auto-Link、三模态搜索） | 用户主动核对代码后催排期 |
| **Zeroclaw** | #7100 per-model context window 配置（当前硬编码 32k 回退） | RFC 讨论中 |

**趋势判断**：随着模型规格多样化（1M token 已出现），开发者不再接受硬编码默认值。可配置、分层级、模型感知的上下文管理是下一轮基础能力竞争的焦点。

### 4.2 消息投递可靠性与去重（跨 4 项目）

- **OpenClaw**：#69208 umbrella（跨渠道重复 transcript/replay）、#96242 Telegram 重复消息确认三条独立路径
- **Zeroclaw**：#9314 Telegram 长轮询 offset 推进过早导致消息永久丢失
- **IronClaw**：#5551 Slack 自动化发送中间进度而非最终结果；#5878 GitHub token 吊销后错误信息误导
- **PicoClaw**：#3203 Matrix 断线后无重连逻辑，系统“假死”

**趋势判断**：多渠道已成为标配，但渠道适配层的幂等性、Exactly-once 语义、断线自动恢复远未成熟。这是直接影响用户体验的高优先级技术债。

### 4.3 安全加固与供应链安全（跨 4 项目）

- **Zeroclaw**：#8826 image_gen SSRF、#9866 JWK 私钥泄露、#9397 WhatsApp 安全默认值语义反转
- **PicoClaw**：#3322-#3324 多渠道 SSRF 系统修复（QQ/Telegram/Discord/LINE/Slack/WeCom/Weixin）
- **NanoClaw**：#3207 critical 级 tar CVE、#3208 Docker Hub 发布 + CVE 门禁
- **CoPaw**：#6259 CIDR in no-auth host allowlist（安全增强，等待评审）

**趋势判断**：安全已从“功能特性”上升为“发布门禁”。NanoClaw 引入 CVE 门禁和 IronClaw 的哈希门控投影身份（#7352）表明，安全基础设施正在嵌入 CI/CD 链路而非事后补救。

### 4.4 多智能体/子任务协作（跨 3 项目）

- **OpenClaw**：#72015 active-memory 多智能体网关过载；#121063 失控循环带来的 1500 万 token 浪费
- **LobsterAI**：#2132 跨模型子任务完成后主任务无感知，缺通知机制
- **IronClaw**：#7407 BatchPolicy::Parallel 要求真正并发执行；#7392 用固定工具合约收敛模型可见工具面

**趋势判断**：多智能体系统的“协调可观测性”成为焦点——子任务状态如何通知、如何防级联失败、如何控制工具可见面。这一领域尚无统一方案，是差异化竞争的空间。


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 | 差异化标签 |
|------|---------|---------|---------|-----------|
| **OpenClaw** | 全渠道个人 AI 助手（聊天/自动化/记忆），当前重点在稳定性治理 | 个人开发者、中小团队，追求功能广度 | Node.js/TypeScript，单体 + 多渠道适配器 | “功能最全的瑞士军刀” |
| **Zeroclaw** | 安全强化 + 内存重构（7 部分 memory stack），企业消息渠道（WhatsApp/Telegram/ICT） | 企业级用户，安全敏感场景 | Rust（77.6 万行），重写路线 | “安全优先的 Rust 原教旨主义者” |
| **PicoClaw** | 轻量多渠道代理，快速响应社区需求 | 轻量部署、个人 DIY | 未知（从 PR 推断为 Go/Python 类轻量栈） | “小而美，当日响应” |
| **NanoClaw** | 供应链安全 + 宿主架构模块化 + Dial 新渠道 | DevOps 友好的高级用户 | 模块化宿主 + 容器化（hardened-image） | “安全基线的模块化先锋” |
| **IronClaw** | 技能/工具目录管理 + 自动化 + WebUI 打磨 | 企业自动化场景（Slack/email-to-sheet） | Rust，技能 DB 存储 + 可插拔 provider | “工具目录与自动化效率” |
| **LobsterAI** | 多模型路由 + 自定义模型兼容 | 使用 OpenRouter/NVIDIA 聚合模型的开发者 | 网关级函数调用 + subagent 机制 | “模型聚合与跨模型编排” |
| **Moltis** | vault 安全 + 容器/沙箱状态管理 | 成熟稳定用户，重视数据安全 | 低频维护，vault 加密 + 沙箱集成 | “隐私与状态感知的守望者” |
| **CoPaw** | 贡献者友好 + 前端体验 + ReMe 内存系统 | 社区驱动型用户，深度参与路线图 | Python/ASGI 为主，主题/皮肤可配置 | “社区共建的高参与度平台” |

**关键差异**：
1. **技术栈路线**：Zeroclaw 押注 Rust 重写，NanoClaw 押注模块化容器，IronClaw 和 OpenClaw 在现有栈上深耕。这是一个“革命 vs 改良”的路线分岔。
2. **安全态度**：Zeroclaw 将安全作为产品核心（私钥保护、SSRF、安全默认值），NanoClaw 将安全作为供应链基线（CVE 门禁、硬化镜像），而 OpenClaw/IronClaw 安全投入相对分散。
3. **社区治理**：CoPaw 的“Help Wanted + first-time-contributor”体系运转最健康；OpenClaw 的 umbrella issue 治理模式值得借鉴；Zeroclaw 的 RFC 流程被社区抱怨“比决策更慢”。


## 6. 社区热度与成熟度

### 第一梯队：快速迭代期（高提交 + 高活跃讨论）

| 项目 | 特征 | 风险 |
|------|------|------|
| **OpenClaw** | 500 PR/日，功能与修复齐头并进，umbrella issue 体系化治理 | 合并率 34.6%，维护者审查带宽显著不足；P0/P1 积压可能影响 stable 用户 |
| **IronClaw** | 双轨节奏（当日 bug 当日修 + 架构升级并行），QA 驱动反馈闭环 | 20 条待合并 PR 含多 XL；zombie thread（#7400）在稳定版 100% 复现，需要紧急响应 |
| **CoPaw** | first-time-contributor 密集，Help Wanted 体系有效，社区参与度高 | 41 条 PR 积压可能打击贡献者积极性；Windows 配置保存 P0 未回应 |

### 第二梯队：功能开发与评审并行期

| 项目 | 特征 | 风险 |
|------|------|------|
| **Zeroclaw** | 安全加固与 memory 重构双主线清晰，RFC 深度讨论 | 49 条待合并 PR 积压 + 15 条 `needs-author-action`，评审流程阻塞严重 |
| **NanoClaw** | 供应链安全响应积极，宿主架构解耦方向明确 | 0 合并/日，最长滞留 PR 近 3 个月，贡献者可能流失 |

### 第三梯队：质量巩固期（低频但稳定）

| 项目 | 特征 | 风险 |
|------|------|------|
| **PicoClaw** | 小步快跑，当日需求→PR 闭环（Telegram 表格功能） | Matrix 断线问题被 stale 关闭，真实稳定性缺陷未解决 |
| **Moltis** | 成熟产品期，本期 2 个真实使用 bug 反馈，无 PR 合并 | vault 修复 PR 待 review，需维护者保持响应 |

### 第四梯队：讨论沉淀期（功能讨论为主）

| 项目 | 特征 | 风险 |
|------|------|------|
| **LobsterAI** | 仅 3 条 Issue 讨论，无 PR 提交无 Release | 自定义模型兼容 P0 bug 未响应，长期 stale 可能挫伤社区积极性 |


## 7. 值得关注的趋势信号

### 7.1 上下文管理从“默认值”走向“精细化配置”

LobsterAI（#1187）、Zeroclaw（#7100）、CoPaw（#6840）、OpenClaw（#22438）四个项目在同一天从不同角度触及上下文管理——这已不是单一项目的需求，而是全生态的共识。1M token 模型（如 DeepSeek V4）的普及使硬编码 32k/128k 默认值成为致命缺陷，**“模型规格感知的上下文管理”将成为 AI 助手基础设施的标准能力**。

### 7.2 消息投递的“Exactly-once”语义成为基础设施挑战

OpenClaw 的重复消息 umbrella、Zeroclaw 的 Telegram offset 推进过早、PicoClaw 的 Matrix 假死、IronClaw 的中间结果误发——四个项目都在解决“消息投递的正确性”问题。这本质上是分布式系统中的经典问题，但 AI 助手生态刚刚开始正视它。**具备幂等消息队列和可恢复投递语义的架构，将在未来 2-3 个版本内成为差异化优势。**

### 7.3 供应链安全从“修复 CVE”升级为“发布门禁”

NanoClaw 的 Docker Hub 发布工作流 + CVE 门禁（#3208）标志着开源 AI 助手开始用软件供应链的最佳实践约束自己。Zeroclaw 的 SSRF 批量修复和 IronClaw 的哈希门控投影身份（#7352）则说明安全已贯穿应用逻辑层。**开发者选择 AI 助手框架时，安全基线（而非功能列表）正成为第一筛选条件。**

### 7.4 多智能体协作的“可观测性”需求浮出水面

LobsterAI 用户主动提交跨模型子任务通知方案、OpenClaw 用户报告 1500 万 token 的失控循环、IronClaw 要求 BatchPolicy 真正并发——社区对多智能体的期待已从“能不能协作”转向“协作过程是否透明、可控、高效”。**子任务状态广播、级联失败熔断、token 预算硬限制，这三个能力将定义下一代多智能体框架的体验标准。**

### 7.5 技术栈选择的“路线之争”加剧

Zeroclaw 的 #9874（“用 Python 重写并退役 Rust”）虽然零评论，但折射出 Rust 重写路线的社区争议；OpenClaw 选择 Node.js 深耕稳定性而非重写；NanoClaw 走模块化容器路线折中。**技术栈选择正在从“开发者偏好”演变为“产品定位声明”——Rust 暗示安全与性能，Node.js 暗示生态与速度，Python/ASGI 暗示 AI 原生集成。** 对技术决策者而言，选择 AI 助手框架时不仅要看功能，还要看技术栈与自身团队能力、运维基础设施的匹配度。

### 7.6 文档正确性成为“隐形竞争力”

OpenClaw PR #121330 修复 40+ 文档页面的废弃配置键，直接消除了用户配置失败的一大来源；CoPaw #6853 暴露 prompts.py 声称的 dream 同步到 MEMORY.md 实际未实现；NanoClaw #3216 主动文档化 install_packages 的限制。**在功能快速迭代期，文档与行为的偏差正在成为用户流失的隐形杀手。** 维护者应建立“文档即代码”的校验机制，而非依赖社区提交修复。

### 7.7 对开发者的行动建议

1. **如果你正在选型**：优先考察项目的合并率/积压趋势（而非 star 数）。OpenClaw 功能最全但审查瓶颈明显；Zeroclaw 安全最强但合入慢；CoPaw 社区最活跃但稳定性待验证。
2. **如果你正在贡献**：NanoClaw 和 PicoClaw 的待合并 PR 积压意味着你的提交可能长期滞留；CoPaw 的 Help Wanted 体系最友好；OpenClaw 的 umbrella issue（#69208）是参与系统性重构的入口。
3. **如果你在维护自己的项目**：从上述生态中提取的三条经验——(a) 尽早建立消息投递的幂等性设计；(b) 将安全门禁嵌入 CI/CD 而非依赖事后修复；(c) 文档与配置 schema 联合校验，防止“旧文档毒化新用户”。

---

*本报告基于各项目 2026-08-10 公开 GitHub 数据生成，跨项目指标统计口径存在细微差异（详见各项目日报），对比结论仅供参考。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时内 Zeroclaw 保持高活跃度，共产生 6 条 Issue 更新和 50 条 PR 更新。所有 6 条 Issue 均为活跃状态，无关闭；49 条 PR 待合并，仅 1 条关闭，暂无新版本发布。社区讨论集中于治理流程（#6808，22 条评论）、模型能力配置（#7100，12 条评论）和 WhatsApp 安全默认值（#9397，11 条评论），安全硬化和 memory 重构栈的 PR 仍在密集评审中。整体看，项目处于功能开发与评审积压并行的阶段，活跃度高，但合并节奏偏慢。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日唯一状态变更的 PR 为 **#9555 [CLOSED] feat(channel): add ICT channel adapter** —— 该企业消息平台适配器（支持 HMAC-SHA256 WebSocket、流式响应、Cron 集成、自动重连与心跳）已关闭，其标签含 `needs-author-action`、`risk:high`、`size:XL`，具体合并/关闭原因需关注后续说明。

合并停滞的同时，评审与修订在持续推进，以下 PR 今日均获得更新：

- **Memory 重构栈（7 部分）**：`#9064`（stack 2/7 共享/系统内存层）、`#9065`（stack 3/7 recall 注入调优）、`#9066`（stack 4/7 合并与去重正确性）、`#9068`（stack 6/7 默认同步保留）、`#9069`（stack 7/7 dashboard 按 agent 展示） —— 该系列自 7 月 14 日开启，全部为 `risk:high` / `size:XL`，今日仍处于评审活跃期。
- **安全加固**：`#9866`（验证意图边界加固，JWK 私钥标量不再序列化/出现在 debug 输出、数量累加防 u32 回绕、拒绝空白货币）、`#9748`（注入 generation counter 防止过期 provider 刷新污染新会话）、`#8826`（`image_gen` 工具下载 URL 防 SSRF）。
- **配置与渠道稳定性**：`#9753`（区分 `allowed_tools` 字段缺失与显式空列表）、`#9767`（ZeroCode 配置编辑器导航修复）、`#9314`（Telegram 长轮询 offset 仅在投递成功后推进，避免更新永久丢失）、`#9197`（CLI Ctrl+C 接入 supervisor 生命周期 token，修复重启循环）。

整体推进速度受限于评审积压：49 条 PR 待合并，其中多条已持续数周未合并（详见第 8 节）。

## 4. 社区热点

- **[#6808] RFC: Work Lanes, Board Automation, and Label Cleanup**（22 条评论，已更新于今日）  
  https://github.com/zeroclaw-labs/zeroclaw/issues/6808  
  这是评论数最高的话题，核心诉求是减少维护者手动路由工作的负担：希望通过 work lanes、看板自动化和标签清理，让工作分配更自动化。该 RFC 自 5 月 20 日起已修订 24 版，说明治理流程改动牵涉面广、讨论深入。

- **[#7100] RFC: Per-model capability & context-window config**（12 条评论）  
  https://github.com/zeroclaw-labs/zeroclaw/issues/7100  
  开发者对模型能力配置不满：能力/上下文窗口/预算/显示用量来自不同数据源，provider 家族默认值会误报 vision 支持，未设置 context window 时硬编码回退 32,000 tokens 可能与实际不符。诉求是增加按模型别名（per-alias）的细粒度配置。

- **[#9397] RFC: Treat empty WhatsApp Web `allowed_groups` as permit-none**（11 条评论）  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9397  
  安全语义争议：`allowed_groups` 默认空列表却放行所有群组，与“安全默认值”直觉相悖。该议题为 `risk:high`、`priority:p1` 且有 follow-up 标签，预计会进入 0.9.x 的安全修复序列。

## 5. Bug 与稳定性

按严重程度排列，今日活跃的 Bug 修复 PR（均已有对应修复实现）：

| 严重程度 | PR / Issue | 问题描述 | 状态 |
|---|---|---|---|
| 🔴 High | [#9866](https://github.com/zeroclaw-labs/zeroclaw/pull/9866) | 验证意图边界中 JWK 私钥标量被序列化/泄露至 debug 输出，支付币种约束可被绕过 | fix PR 已提交 |
| 🔴 High | [#8826](https://github.com/zeroclaw-labs/zeroclaw/pull/8826) | `image_gen` 工具未校验 fal.ai 返回的下载 URL，存在 SSRF 风险（`risk:high`, `size:XL`） | fix PR 已提交 |
| 🔴 High | [#9748](https://github.com/zeroclaw-labs/zeroclaw/pull/9748) | 过期的 provider 刷新会错误写入同 ID 的新会话（fixes #9719） | fix PR 已提交 |
| 🔴 High | [#9314](https://github.com/zeroclaw-labs/zeroclaw/pull/9314) | Telegram 长轮询在投递/转写前推进 offset，瞬时故障导致更新永久丢失 | fix PR 已提交 |
| 🔴 High | [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) | `RiskProfileConfig.allowed_tools` 无法区分字段缺失（不限制）与显式空列表（全拒绝），空列表被错误解释为不限制 | fix PR 已提交 |
| 🟡 Medium | [#9758](https://github.com/zeroclaw-labs/zeroclaw/pull/9758) | memory consolidation 会“编造”用户特质，把一次性行为提升为持久描述 | fix PR 已提交 |
| 🟡 Medium | [#9767](https://github.com/zeroclaw-labs/zeroclaw/pull/9767) | ZeroCode 配置编辑器空标量字段时导航快捷键被错误占用 | fix PR 已提交 |

## 6. 功能请求与路线图信号

今日活跃的功能类 PR 与 RFC 呈现三大方向：

**方向一：可观测性与可配置性**
- [#9556](https://github.com/zeroclaw-labs/zeroclaw/pull/9556) 新增 Langfuse observer 后端（OTel traces，支持云与自托管），`risk:high` / `size:L`
- [#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) per-model capability & context-window 配置（`risk:high`，RFC 阶段，很可能是 0.9.x 的配置项重点）

**方向二：密钥管理与安全基础设施**
- [#9194](https://github.com/zeroclaw-labs/zeroclaw/pull/9194) 提取 `KeySource` trait 并提供 `FileKeySource` 后端，为主加密密钥来源做抽象，`risk:high` / `size:XL`

**方向三：集成与工具扩展**
- [#8994](https://github.com/zeroclaw-labs/zeroclaw/pull/8994) 原生 Home Assistant REST 工具（`list_entities` / `get_state` / `call_service`，受安全策略门控）
- [#9557](https://github.com/zeroclaw-labs/zeroclaw/pull/9557) 新增 `ProviderErrorKind` 错误分类（AuthFailed / RateLimited / QuotaExceeded / VisionNotSupported 等），提升多 provider 错误可读性
- [#9757](https://github.com/zeroclaw-labs/zeroclaw/pull/9757) 修复 Anthropic 工具结果图片无法送达模型的问题（重构为嵌套 content blocks），`size:XL`

**路线图信号**： 新 Issue **[#9874](https://github.com/zeroclaw-labs/zeroclaw/issues/9874)** 提出“用 Python 重写 ZeroClaw 并退役 Rust 代码库”，作者直言 Rust 是“为了炫技”（flex for the sake of flex），并指出当前代码库含 1,076 个 Rust 文件、约 77.6 万行（26 个 workspace 成员），部分模块巨大。虽然该 Issue 暂无评论、实践上被采纳可能性极低，但折射出社区对代码库复杂度的不满情绪，值得 maintainer 关注。

## 7. 用户反馈摘要

从今日活跃 Issue 的描述与评论数观察：

- **维护者流程负担（#6808，22 条评论）**：最核心的痛点是手动标签与工作路由成本高。用户期待看板自动化能自动完成标签清理和工作分配，现有流程被认为“让维护者维护另一套系统”。
- **模型配置与实际能力不一致（#7100，12 条评论）**：用户反馈 provider 默认值导致 vision 支持误报、context window 硬编码回退 32k 不符合实际模型规格，导致运行时 budget 计算和 UI 展示存在偏差。
- **安全默认值语义反转（#9397，11 条评论）**：用户认为空 `allowed_groups` 意味着“不允许任何组”，而当前实现是“允许所有组”，违反直觉且构成实际安全风险。
- **风险标签规则冲突（#9530，6 条评论）**：维护者文档 `labels.md` 与其它文档对 `risk:low` / `risk:high` 中 test-only 变更的界定冲突，导致 PR 风险分级无稳定依据。
- **对 RFC 流程沉重的不满（#9496，6 条评论）**：作者坦言“Zeroclaw 的 RFC 流程已变得比其要支撑的决策更慢、更繁琐”，包括 7 天最低讨论期、广泛的 unanimity 要求、手动计票。

## 8. 待处理积压

以下重要工作项长期未合并/未响应，建议维护者优先关注：

- **Memory 重构栈（7 PR，超 3 周未合并）**：`#9064`、`#9065`、`#9066`、`#9068`、`#9069` 均为 7 月 14 日开启的 `risk:high` / `size:XL` 大 PR。长期暴露在 master 之外，与其它功能分支冲突风险持续累积。
- **SSRF 修复 #8826（超 1 个月）**：7 月 8 日提交的 `image_gen` 安全修复带 `risk:high` / `size:XL`，安全类修复长期未合并会扩大暴露窗口。
- **RFC #6808（近 3 个月）**：5 月 20 日开启，虽仍在活跃讨论，但 24 次修订说明核心分歧较大，建议设置决策 deadline。
- **带 `needs-author-action` 的 PR 群**：#9066、#9758、#8826、#9753、#9194、#9068、#9064、#9197、#9065、#8994、#9314、#9069、#9556、#9757、#9557 等 15 条 PR 均等待作者回应。若作者长期无响应，建议维护者明确是否接管或关闭。
- **RFC #9874（Python 重写提案）**：评论为 0，但话题敏感，建议 maintainer 尽快给出原则性回应，避免演变为社区情绪事件。

---

**健康度小结**：项目社区活跃度高，安全与 memory 重构两条主线清晰，但 49 条待合并 PR 形成明显积压，且大量 `needs-author-action` 标签表明协作流程存在阻塞点。建议下一阶段将“去积压”作为主要目标，尤其优先合并安全修复类 PR（#8826、#9866、#9748、#9314），随后推进 memory 栈的评审闭环。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-08-10）

## 1. 今日速览

PicoClaw 过去 24 小时保持活跃的开发节奏：共产生 6 条 PR 更新（1 条已合并/关闭，5 条待合并）与 3 条 Issue 更新（2 条活跃，1 条被 stale 关闭），无新版本发布。最突出的信号是一组跨渠道 SSRF 安全加固 PR 集中出现（#3322、#3323、#3324），说明项目正在系统性地收敛消息渠道的安全风险；同时 Telegram 表格富消息功能（#3325/#3327）在一天内完成“提交需求→实现 PR”的闭环，社区响应迅速。整体健康度良好，但存在 5 条待合并 PR 的积压，需要维护者加快 review 节奏。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日唯一合入的 PR 是 **#3326**（[链接](https://github.com/sipeed/picoclaw/pull/3326)），修复了 `web/frontend/pnpm-lock.yaml` 中重复的 `semver` 条目，消除了 `pnpm install --frozen-lockfile` 的失败问题，属于确定性构建的基础修复。

更值得关注的是今日提交的 4 个高质量 PR，虽尚未合并，但已显著勾勒出项目前进方向：

- **SSRF 安全加固**：在频道层（#3322）、WeCom（#3323）、Weixin（#3324）分别引入 `BlockPrivateTargets`/`CreateSafeHTTPClient`/`ValidateSafeHTTPURL`，统一筑牢入站媒体下载的安全围栏。三者同属一个修复序列，覆盖 QQ、Telegram、Discord、LINE、Slack、WeCom、Weixin 等主流渠道。
- **Telegram 表格富消息**（#3327）：将 GFM/HTML 表格转换为 Bot API 原生表格 UI，取代原有的等宽代码块显示，直接回应 issue #3325，两个条目形成了完整的需求→实现链路。
- **deltachat 重构**（#3222）：作为一项长期开放的重构 PR，目标减少约 200 行代码，删除遗留特性并更新文档，将持续改善模块可维护性。

## 4. 社区热点

今日讨论热度最高的条目是 **#3203**（[链接](https://github.com/sipeed/picoclaw/issues/3203)）“Matrix sync loop has no reconnection logic”。该 issue 积累了 8 条评论和 2 个 👍，但今日并非因“已解决”而关闭，而是被 stale bot 自动清理。其背后反映了两层诉求：

- **用户侧**：Matrix 渠道在真实部署中遇到网络抖动后进入永久静默状态，且 systemd 无法感知并自动拉起，属于“僵尸进程”式的稳定性问题；
- **维护侧**：该 issue 自 7 月 2 日创建后长期无人认领，stale 关闭意味着维护者尚未给出明确修复计划，这可能会挫伤社区对 Matrix 渠道的信心。

## 5. Bug 与稳定性

**高危（安全类）**：

- 多渠道入站媒体下载存在 SSRF 风险。涉及 QQ/Telegram/Discord/LINE/Slack（#3322）、WeCom（#3323）、Weixin（#3324）的媒体拉取路径，恶意构造的 URL 可触达 loopback、link-local 或 RFC1918 私网地址。目前尚无对应 Bug issue，但修复 PR 均已就绪，**建议维护者优先级合并**。

**中危（可用性类）**：

- #3203（[链接](https://github.com/sipeed/picoclaw/issues/3203)）Matrix sync loop 断线后无重连逻辑，导致主进程存活但 bot 完全失效。该 issue 已被 stale 关闭，**尚未有修复 PR 出现**，风险残留。

**低危（构建类）**：

- #3326（[链接](https://github.com/sipeed/picoclaw/pull/3326)）pnpm lock 文件重复映射键导致 CI 安装失败，已合入修复。

## 6. 功能请求与路线图信号

- **Telegram 表格富消息**（#3325，[链接](https://github.com/sipeed/picoclaw/issues/3325)）：用户要求弃用 `sendMessage` 纯文本回退，改由 Bot API 10.1 的原生表格渲染。对应 PR #3327 已在同日提交，**几乎可以确定进入下一版本**。
- **IRC 长消息支持**（#3287，[链接](https://github.com/sipeed/picoclaw/issues/3287)）：要求 PicoClaw 自动将 IRCv3 拆分的超长消息合并为单个逻辑消息。该需求涉及协议层解析，改动范围较大，目前暂无对应 PR，较可能进入后续版本的路线图观察区。

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中可以提炼出以下真实用户声音：

- **可靠性焦虑（#3203）**：@weissfl 描述了在 systemd 部署下 Matrix 渠道因断网/重启后“假死”的完整场景，指出 `Restart=on-failure` 无法触发，bot 长时间失去响应而运维者毫无察觉。这是对业务连续性的直接负面反馈。
- **协议适配需求（#3287）**：@superuser-does 提出 IRC 512 字节限制导致的语义割裂问题，说明有实际用户在重度使用 IRC 渠道，且对多字节消息的功能完整性有明确期待。
- **新需求观望中（#3325）**：Telegram 表格需求提交当日即获得 PR 响应，尚未收到社区更多评论，侧面反映作者对“提了就能快速实现”的项目节奏比较认可。

综合来看，今日未发现明显的“满意”表述，主要集中在稳定性缺陷反馈和功能增强请求；项目的快速 PR 响应为正向信号。

## 8. 待处理积压

- **deltachat 重构 PR #3222**（[链接](https://github.com/sipeed/picoclaw/pull/3222)）：自 7 月 3 日开放至今已超过一个月，是当前最持久的待合并 PR。内含接口改名（`invite_link`→`join_invite_link`/`show_invite_link`）等破坏性变更，越晚合并迁移成本越高，建议维护者尽快 review。
- **IRC 长消息 Feature #3287**（[链接](https://github.com/sipeed/picoclaw/issues/3287)）：已开放逾两周，无维护者标签、无指派、无 PR 关联。应至少标记 `backlog` 或给出暂缓说明。
- **Matrix 同步可靠性 #3203**（[链接](https://github.com/sipeed/picoclaw/issues/3203)）：虽被 stale 关闭，但该问题是真实存在的稳定性缺陷且社区关注度较高。若暂无修复计划，建议重新开启并打上已知问题标签，或转入内部跟踪，避免被社区误读为“不关心”。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 · 2026-08-10

## 今日速览

- 过去 24 小时，NanoClaw 新增 1 个 Issue（[#3217](https://github.com/nanocoai/nanoclaw/issues/3217)），16 个 PR 有更新/新开，全部处于待合并状态，无版本发布、无合并/关闭事件。
- 待合并 PR 覆盖供应链安全（tar CVE 修复、Docker Hub 发布流水线）、Signal/Slack 渠道修复、Dial 新渠道接入，以及一批 host/channels/db 模块化重构，7 位贡献者参与提交。
- 唯一新 Issue `#3217` 指出 `install_packages` 缺少 pip 通道，直接阻塞 Python 依赖型 agent 采用 hardened 预构建镜像；同一作者已提交配套文档 PR（[#3216](https://github.com/nanocoai/nanoclaw/pull/3216)）记录该限制。
- 活跃度评估：提交输入旺盛，但评审/合并吞吐为 0，最老的待合并 PR（[#2529](https://github.com/nanocoai/nanoclaw/pull/2529)）已滞留近三个月。整体呈“高产低合”状态，安全响应积极，但合入瓶颈需要警惕。

## 项目进展

过去 24 小时没有 PR 被合并或关闭，因此今日无直接落地的主线变更。以下按主题梳理当前待合并队列中值得关注的能力，一旦合入将对项目形成明显推进：

- **供应链安全与发布**：core-team 提交的 [#3207](https://github.com/nanocoai/nanoclaw/pull/3207)（bump pnpm/npm 以修复 critical 级 tar CVE）和 [#3208](https://github.com/nanocoai/nanoclaw/pull/3208)（Docker Hub 发布工作流 + CVE 门禁）将显著增强容器镜像的安全基线。
- **Dial 新渠道**：[#3041](https://github.com/nanocoai/nanoclaw/pull/3041)（SMS + AI 语音通话适配器）与 [#3050](https://github.com/nanocoai/nanoclaw/pull/3050)（setup 向导/技能模型接入）构成完整功能闭环，若合并将新增一个可用渠道。
- **Signal 附件可靠性**：[#2529](https://github.com/nanocoai/nanoclaw/pull/2529) 与 [#3142](https://github.com/nanocoai/nanoclaw/pull/3142) 分别修复附件被丢弃和附件路径未挂载的问题，[#3210](https://github.com/nanocoai/nanoclaw/pull/3210) 补充附件落地位置的文档——三者合起来才能彻底解决该渠道附件不可用的长期痛点。
- **宿主架构解耦**：@zvi-fried 的系列重构（[#3212](https://github.com/nanocoai/nanoclaw/pull/3212) 迁移注册表、[#3213](https://github.com/nanocoai/nanoclaw/pull/3213) 渲染器注册、[#3214](https://github.com/nanocoai/nanoclaw/pull/3214) 生命周期钩子、[#3186](https://github.com/nanocoai/nanoclaw/pull/3186) skill 能力扩展点）为宿主层松耦合持续铺路。
- **CLI 与开发者体验**：[#3218](https://github.com/nanocoai/nanoclaw/pull/3218) 为 host/container 客户端新增 `--stdin-json` 有界输入模式，属于非破坏性增强；[#3209](https://github.com/nanocoai/nanoclaw/pull/3209) 修复 Slack 粘贴表格无法传递给 agent 的问题。

总结：虽然今日无合入事件，但待合并变更在安全、渠道、附件可靠性、架构四个方向上的积累已相当可观，项目正在积蓄下一波能力。

## 社区热点

今日各 Issue/PR 均无评论数据，未形成高讨论量帖子。社区热点主要体现在提交主题的集中度上：

- **hardened-image 的 Python 支持缺口**：[#3217](https://github.com/nanocoai/nanoclaw/issues/3217) 是今日唯一新 Issue，直指 `install_packages` 仅覆盖 `packages_apt` 与 `packages_npm`、没有 pip 通道；同日 [#3216](https://github.com/nanocoai/nanoclaw/pull/3216) 以文档形式确认了这一限制。这透露出生产用户对 Python 依赖型 agent 采用安全镜像的强烈需求。
- **Signal 附件问题三连**：[#2529](https://github.com/nanocoai/nanoclaw/pull/2529)、[#3142](https://github.com/nanocoai/nanoclaw/pull/3142)、[#3210](https://github.com/nanocoai/nanoclaw/pull/3210) 从修复、修复、文档三个角度指向同一痛点，说明该问题已影响多位实际用户。
- **Dial 渠道完整提交**：[#3041](https://github.com/nanocoai/nanoclaw/pull/3041) 与 [#3050](https://github.com/nanocoai/nanoclaw/pull/3050) 由同一贡献者分两步实现，反映社区对 SMS 与 AI 语音接入的主动探索。

## Bug 与稳定性

按严重程度排列如下：

| 严重程度 | 问题描述 | 相关 PR/Issue |
|---|---|---|
| 🔴 Critical（安全） | agent 镜像中 npm 10.9.8 与 pnpm 10.33.0 内置 `tar` 低于 7.5.19（GHSA-23hp-3jrh-7fpw），grype 报 critical 且有可用修复 | 修复 PR：[#3207](https://github.com/nanocoai/nanoclaw/pull/3207) |
| 🟠 High（功能阻塞） | `install_packages` 无 pip 通道，Python 依赖安装无法走 hardened 预构建镜像路径 | 暂无修复；文档 PR：[#3216](https://github.com/nanocoai/nanoclaw/pull/3216)；Issue：[#3217](https://github.com/nanocoai/nanoclaw/issues/3217) |
| 🟡 Medium（功能丢失） | Signal 入站附件路径未被挂载到容器，Read 工具无法打开；非图片/非音频附件被直接丢弃 | 修复 PR：[#2529](https://github.com/nanocoai/nanoclaw/pull/2529)、[#3142](https://github.com/nanocoai/nanoclaw/pull/3142) |
| 🟢 Low（体验） | Slack 渠道中粘贴的表格内容无法结构化传递给 agent | 修复 PR：[#3209](https://github.com/nanocoai/nanoclaw/pull/3209) |
| 🟢 Low（隐私） | DM 解析流程日志需要脱敏，避免敏感信息外泄 | 修复 PR：[#3215](https://github.com/nanocoai/nanoclaw/pull/3215) |

## 功能请求与路线图信号

- **pip 通道支持**：[#3217](https://github.com/nanocoai/nanoclaw/issues/3217) 明确提出为 `install_packages` 增加 Python 包渠道。结合同日文档 PR `#3216` 看，项目已承认该限制，该功能很可能是 hardened-image 被更广泛采用的关键前置条件，有较高概率进入下一版本。
- **Dial 渠道接入**：[#3041](https://github.com/nanocoai/nanoclaw/pull/3041)、[#3050](https://github.com/nanocoai/nanoclaw/pull/3050) 已交付完整实现（adapter + wizard + skill 模型），合入后 NanoClaw 将新增 SMS 与 AI 语音通话能力，属于路线图中的渠道扩展方向。
- **CLI stdin JSON**：[#3218](https://github.com/nanocoai/nanoclaw/pull/3218) 为自动化场景提供有界 JSON 输入，且明确不改变现有 request frame、授权与输出行为，属于低风险的开发者体验增强，可能随下一个 minor 版本落地。
- **发布流水线建设**：[#3208](https://github.com/nanocoai/nanoclaw/pull/3208) 引入 Docker Hub 发布 + CVE 门禁，预示项目正在走向更规范的版本发布周期，值得关注后续版本节奏变化。

## 用户反馈摘要

今日无新增 Issue 评论，以下反馈提炼自 Issue/PR 描述：

- **生产环境阻塞（hardened-image）**：用户报告依赖 pip 安装工具的 agent 无法使用 derived-image 路径，因而无法采用硬化预构建镜像——这是安全的直接障碍（[#3217](https://github.com/nanocoai/nanoclaw/issues/3217)）。
- **附件端到端不可达（Signal）**：Signal 适配器将 `/workspace/extra/signal-attachments/<id>` 这类未挂载路径拼进消息，导致 Read 工具永远无法打开；PDF、txt、文档等非图片/音频附件更是从未进入容器（[#3142](https://github.com/nanocoai/nanoclaw/pull/3142)）。
- **渠道内容保真度（Slack）**：用户粘贴的表格在传给 agent 时丢失，说明 Slack 渠道对富文本/表格类输入的支持不足（[#3209](https://github.com/nanocoai/nanoclaw/pull/3209)）。
- **隐私敏感（DM 日志）**：DM 解析流程的日志需要脱敏，反映用户对消息内容隐私的重视（[#3215](https://github.com/nanocoai/nanoclaw/pull/3215)）。

## 待处理积压

以下 PR/Issue 长期未合入或响应，建议维护者优先关注：

- **[#2529](https://github.com/nanocoai/nanoclaw/pull/2529)**：5 月 18 日创建，Signal 附件交付修复，已滞留近 3 个月。同一领域已出现新的修复 PR（[#3142](https://github.com/nanocoai/nanoclaw/pull/3142)），维护者需尽快决策采用哪套方案或如何合并，避免贡献者重复劳动。
- **[#3041](https://github.com/nanocoai/nanoclaw/pull/3041) / [#3050](https://github.com/nanocoai/nanoclaw/pull/3050)**：7 月 14 日创建，Dial 渠道完整实现已在队列中近一个月，若无设计争议建议安排评审，防止渠道功能因等待而过时。
- **[#3142](https://github.com/nanocoai/nanoclaw/pull/3142)**：7 月 27 日创建，Signal 附件路径修复，与 `#2529` 功能重叠，需厘清关系后合并或关闭其一。
- **[#3186](https://github.com/nanocoai/nanoclaw/pull/3186)**：8 月 4 日创建，skill-owned capabilities 的宿主扩展，属于跨切面重构，建议与 [#3211](https://github.com/nanocoai/nanoclaw/pull/3211)–[#3215](https://github.com/nanocoai/nanoclaw/pull/3215) 系列 PR 统一评审，避免重构分支长期分叉。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-10

## 1. 今日速览

过去24小时项目保持高活跃度：**22 条 Issues 更新**（新开/活跃 15 条，关闭 7 条）与 **28 条 PR 更新**（待合并 20 条，合并/关闭 8 条），无新版本发布。值得关注的是，今日 Issue 与 PR 呈现出清晰的双轨节奏——QA 团队集中上报的 WebUI 显示类问题（emoji 未渲染、活动时序错乱、自动化计数不一致）均已在当日获得对应 fix PR（#7404、#7403、#7402），且 `tool_search` 延迟工具发现体系的架构升级（#7405）正在以组合 PR（#7409/#7410/#7411）密集推进，表明项目在修复稳定性问题的同时，仍坚持进行深层架构演进。但 20 条待合并 PR 的积压体量（含大量 XL 级变更）需提醒维护者关注合入节奏。

## 2. 版本发布

无新版本发布（最新仍为 1.1.0 稳定版，1.1.0-rc.1 在 #7400 中被报告存在问题）。

## 3. 项目进展

> 统计口径：过去 24 小时内状态变更为 `closed`/`merged` 的 PR 及关联 Fix。

### 3.1 重要合并/关闭 PR

| PR | 标题 | 关联 Issue | 意义 |
|---|---|---|---|
| [#7171](https://github.com/nearai/ironclaw/pull/7171) | fix(skills): one DB-backed tree for every skill mount, and make a skill's own commands runnable | closes #7168, part of #6941 | **XL 级，本次合并中最具实质进展的一项**。修复了"技能安装成功但立即消失、无法激活/运行"的完整链路缺陷，技能现在有了 DB 存储树，且技能自身命令可被执行。这是 v1.2.0 技能体系（#6941）的关键拼图 |
| [#7387](https://github.com/nearai/ironclaw/pull/7387) | chore(deps): bump the everything-else group with 12 updates | — | 12 项 Rust 依赖常规升级（base64、toml、rstest 等），保持供应链健康 |
| [#7022](https://github.com/nearai/ironclaw/pull/7022) | chore(deps): bump the actions group with 2 updates | — | GitHub Actions 依赖升级（setup-node 4.x→7.x、docker/login-action），CI 基础设施维护 |

### 3.2 关闭的 Bug Issue 映射

今日关闭的 7 条 Issue 中，除上述与 PR 直接关联的外，以下两条 QA 反馈的老 bug 也已完成闭环：

- [#5522](https://github.com/nearai/ironclaw/issues/5522)（Reborn routine 读取 Slack DM 失败 + capability_info 重试循环）— 已关闭，说明 Slack 读取能力缺失问题已有解决方案落地
- [#7292](https://github.com/nearai/ironclaw/issues/7292)（已安装工具不可用 + runner 心跳错误）与 [#5552](https://github.com/nearai/ironclaw/issues/5552)（多工具故障后泛化 "invalid result" 错误）— 均为 P1/P2 级 QA 阻断类问题，相关修复已通过近期发布或 PR 验证后关闭

### 3.3 关键架构信号

- **tool_search 可插拔化**（#7411）：`deferred-tool 检索` 将变为 swappable provider，与之前 memory 的 port/binding 模式（#6345）保持一致，模块边界持续收敛
- **Web Push 通道**（#7398 待合并）：浏览器推送 + PWA 正在开发中，IronClaw 的通知渠道将首次覆盖 Web 端，与 Slack/Telegram 通道对齐

## 4. 社区热点

### 4.1 最活跃的讨论：tool_search 完善方向（#7405 / #7407 / #7410 / #7411）

由核心贡献者 @serrrfirat 主导，围绕"延迟工具发现"体验展开系统性升级，形成今日最密集的讨论与 PR 组：

- [#7405](https://github.com/nearai/ironclaw/issues/7405)（enhancement）：要求 `tool_search` 返回"边界内完整签名 + 带命名空间感知的 catalog 预览"，以减少模型不必要的推理轮次
- [#7410](https://github.com/nearai/ironclaw/pull/7410)：实现 Phase 1 — 在预算内返回完整 `parameters` 与 `schema_complete: true`
- [#7409](https://github.com/nearai/ironclaw/pull/7409)：新增 100/500/1,000 规模的 catalog 检索质量基线测试
- [#7411](https://github.com/nearai/ironclaw/pull/7411)：将 deferred-tool 检索实现抽为可替换 provider
- [#7407](https://github.com/nearai/ironclaw/issues/7407)：要求 `invoke_capability_batch` 真正并发执行 `BatchPolicy::Parallel` 批次

**诉求分析**：社区已不满足于"能搜到工具"，而是追求**降低延迟、减少 token 消耗、提高大规模工具目录下的检索质量稳定性**。这直接指向企业级用户（拥有数百到上千工具）的刚需，预计 v1.2.0 将重点吸收这批改动。

### 4.2 高严重度 Bug 关注：zombie thread 问题（#7400）

[#7400](https://github.com/nearai/ironclaw/issues/7400)（`stream: true` + caller `tools[]` 导致 mid-stream 失败并残留永久不可删除线程）在 1.1.0-rc.1 和 1.1.0 **稳定版上均 100% 复现**，用户 @cuongdcdev 明确指出影响 Responses API 核心路径，严重性高。该 Issue 创建于 8 月 9 日，目前尚无 fix PR 关联，评论区有 2 条讨论，是当下最需要维护者响应的线上故障。

## 5. Bug 与稳定性

> 按严重程度降序；✅ = 已有对应 fix PR（待合并或已合并）

| 严重度 | Issue | 标题 | 影响面 | 修复状态 |
|---|---|---|---|---|
| 🔴 高 | [#7400](https://github.com/nearai/ironclaw/issues/7400) | `stream:true` + `tools[]` 导致 mid-stream 失败 + 永久 zombie thread | Responses API 用户，1.1.0-rc.1 与 1.1.0 稳定版均受影响，**100% 复现**，线程无法删除 | ⚠️ 未见 fix PR |
| 🟠 中 | [#7345](https://github.com/nearai/ironclaw/issues/7345) | Agent 报告 61 个 automations，UI 仅显示 50 | 自动化数量统计不一致，可能涉及 agent 幻觉或前端分页 bug | ✅ [#7402](https://github.com/nearai/ironclaw/pull/7402)（新增 caller-scoped 聚合查询，已修复列表页截断导致的误读） |
| 🟠 中 | [#7346](https://github.com/nearai/ironclaw/issues/7346) | Emoji 短代码（`:wave:` 等）以纯文本显示 | WebUI 聊天渲染，影响用户体验 | ✅ [#7404](https://github.com/nearai/ironclaw/pull/7404)（gemoji 渲染，含流式与代码块保护） |
| 🟠 中 | [#7348](https://github.com/nearai/ironclaw/issues/7348) | Activity 工具调用与进度消息时序错乱 | 长时间任务的执行时间线混乱，影响可读性 | ✅ [#7403](https://github.com/nearai/ironclaw/pull/7403)（分组逻辑调整，流式进度保持在前，最终回复收尾置后） |
| 🟠 中 | [#5882](https://github.com/nearai/ironclaw/issues/5882) | 反复 Slack 重连后认证流程进入死锁（"Waiting for Slack..." 无限等待） | 第三方渠道可靠性，恢复需卸载重装 | ⚠️ 已开 1 个月+，无关联 PR（7/9 创建，8/9 仍活跃） |
| 🟡 低 | [#7349](https://github.com/nearai/ironclaw/issues/7349) | 刷新聊天页面后部分执行历史与 Activity 时间线消失 | 长任务完成后刷新丢历史，一致性受损 | ⚠️ 未见 fix PR |
| 🟡 低 | [#6479](https://github.com/nearai/ironclaw/issues/6479) | Routine 可创建/修改其他 routine，存在自我复制风险 | 无限调度循环隐患，缺少护栏 | ⚠️ 已开 3 周+，无修复迹象 |
| 🟡 低 | [#6046](https://github.com/nearai/ironclaw/issues/6046) | 简单 email-to-sheet 任务产生 124 次工具调用 | 效率问题：代理过度解码无关内容（base64、FOIA 上下文、定价邮件等） | ⚠️ 已开 4 周+，无关联 PR |
| 🟡 低 | [#5878](https://github.com/nearai/ironclaw/issues/5878) | GitHub token 吊销后显示误导性错误而非重新认证 | 认证可恢复性差，影响第三方连接体验 | ⚠️ 已开 1 个月+，与 #5882 同批，均无 PR |
| 🟡 低 | [#5551](https://github.com/nearai/ironclaw/issues/5551) | Slack 触发的自动化向频道发送中间进度消息而非最终结果 | 输出语义错误，用户看到的是过程而非结论 | ⚠️ 已开 1 个月+，无 PR（#7131 可部分缓解：run_delivery 失败通知已覆盖，但中间消息问题未闭环） |

**总结**：今日无新增🔴级 Bug，但有 1 条高严重度线上问题（#7400）待处理；中低严重度的历史 bug 仍堆积，尤其 7 月初报告的 Slack/认证类问题（#5551/#5878/#5882）至今无修复 PR，建议维护者排期处理。

## 6. 功能请求与路线图信号

### 6.1 可能进入下一版本（已有 PR 支撑）

- **tool_search 体验升级**（[#7405](https://github.com/nearai/ironclaw/issues/7405)）：完整签名 + 命名空间感知预览，配合 [#7410](https://github.com/nearai/ironclaw/pull/7410)（完整签名返回）、[#7409](https://github.com/nearai/ironclaw/pull/7409)（100-1,000 工具规模基线测试）与 [#7411](https://github.com/nearai/ironclaw/pull/7411)（swappable provider），三者叠加将显著改善大规模工具目录下的检索质量与 token 效率
- **批量工具调用真正并发化**（[#7407](https://github.com/nearai/ironclaw/issues/7407)）：`BatchPolicy::Parallel` 目前被顺序执行，实现并发后可缩短多工具调用场景的端到端延迟，属于纯性能优化，侵入面可控
- **Web Push + PWA 通知**（[#7398](https://github.com/nearai/ironclaw/pull/7398)）：浏览器成为第一方通知渠道，与 Slack/Telegram 对齐，扩大自动化触达场景
- **Slack/Telegram 渐进式预览**（[#7396](https://github.com/nearai/ironclaw/pull/7396)）：在最终消息前提供可编辑预览草稿，改善渠道输出质量
- **run_delivery 失败通知**（[#7131](https://github.com/nearai/ironclaw/pull/7131)）：触发型运行失败/取消/超时后，向创建者发送通知，而不仅仅是静默记录

### 6.2 路线图信号（epic / 新方向）

- **[#7392](https://github.com/nearai/ironclaw/issues/7392)（epic）**：尝试用 `can1357/oh-my-pi` 的固定工具合约替换 IronClaw 第一方编码工具 — 若落地，将大幅收敛模型可见工具面，减少幻觉与误用
- **[#7166](https://github.com/nearai/ironclaw/issues/7166)（v1.2.0 epic）**：Tool disclosure 后续工作仍在推进中，8/9 更新表明"progressive disclosure 已安全、可靠、高效"，后续可能聚焦于排除元数据可见性、降低小工具面的发现开销
- **[#7360](https://github.com/nearai/ironclaw/issues/7360)**：扩展 nightly 压力测试内置工具与持久化写入路径，提高回归捕获能力。属于基础设施完善，对长期健康度有价值

## 7. 用户反馈摘要

> 从今日活跃/更新的 Issue 评论中提炼真实用户声音

- **对 Slack DM 能力的强烈需求**（#5522）：用户测试 Reborn routine 读取 Slack DM 任务时失败，且系统陷入 `capability_info` 重试循环。**核心诉求是"缺能力可以，但别死循环"**，至少应给出明确的能力缺失提示而非无效重试
- **对"不可删除线程"的挫败感**（#7400）：用户在 1.1.0 正式版中遇到 zombie thread，表述 "permanently undeletable"，且连续复现，直接影响对 API 可靠性的信任
- **对工具调用效率的不满**（#6046）：用户 @joe-rlo 描述"检查邮件并添加 near.ai 地址到 Sheet"这种简单任务竟触发 124 次工具调用，且代理"花费大量精力解码 base64、分析无关内容"。**反馈指向 agent 行为校准问题** — 需要更强的任务聚焦能力
- **对输出语义的困惑**（#5551）：Slack 自动化在频道里发中间进度消息（"Now let me also check..."）而不发最终结果，用户明确表示"希望看到汇总结果，而不是内部执行步骤"
- **对错误信息可操作性的抱怨**（#5878）：GitHub token 被吊销后，系统报"tool input could not be encoded""AI model provider was temporarily unavailable"等误导性错误，用户无从得知需要重新认证。**反馈核心是错误信息必须可诊断、可恢复**
- **对自动化安全性的担忧**（#6479）：用户指出 routine 可自我复制，评论中表达了"没有护栏"的担忧，社区对无限调度循环风险有认知

整体来看，用户对功能覆盖（Slack、自动化、工具）的数量是满意的，但**对错误处理的可诊断性、工具调用的效率、通知输出的语义准确性**提出了更高要求。

## 8. 待处理积压

> 提醒维护者关注长期未解决或待合并的重要项

### 8.1 长期未修复的 Bug（按年龄排序）

| Issue | 标题 | 创建时间 | 持续天数（至 8/10） | 备注 |
|---|---|---|---|---|
| [#5551](https://github.com/nearai/ironclaw/issues/5551) | Slack 自动化发送中间进度消息而非最终结果 | 2026-07-02 | 39 天 | P2，影响自动化输出语义 |
| [#5878](https://github.com/nearai/ironclaw/issues/5878) | 吊销 GitHub token 后错误信息误导 | 2026-07-09 | 32 天 | P2，影响第三方连接可恢复性 |
| [#5882](https://github.com/nearai/ironclaw/issues/5882) | Slack 重复重连后认证死锁 | 2026-07-09 | 32 天 | P2，唯一恢复路径是卸载重装 |
| [#6046](https://github.com/nearai/ironclaw/issues/6046) | 简单 email-to-sheet 触发 124 次工具调用 | 2026-07-13 | 28 天 | P2，效率问题 |
| [#6479](https://github.com/nearai/ironclaw/issues/6479) | Routine 自我复制风险 | 2026-07-22 | 19 天 | P2，安全护栏缺失 |

### 8.2 待合并的重要 PR（超期或大变更）

| PR | 标题 | 等待天数 | 风险/大小 | 建议 |
|---|---|---|---|---|
| [#7131](https://github.com/nearai/ironclaw/pull/7131) | deliver triggered run failures to the creator | 6 天 | XL / low | 与 #5551 的用户反馈直接相关，建议尽快 review |
| [#7076](https://github.com/nearai/ironclaw/pull/7076) | Install the packages the catalog already publishes | 7 天 | XL / low | 「新贡献者」提交，rebase 后 CI 已通过，建议安排 reviewer |
| [#7020](https://github.com/nearai/ironclaw/pull/7020) | bump tokio-tungstenite 0.29.0 → 0.30.0 | 8 天 | M / low | 依赖升级，长时间搁置可能引入安全与兼容性分叉 |
| [#7262](https://github.com/nearai/ironclaw/pull/7262) | bump wasm 组件（wit-component/wit-parser） | 5 天 | M / low | wasm 工具链升级，建议与 #7020 一并处理 |
| [#7352](https://github.com/nearai/ironclaw/pull/7352) | 哈希门控投影身份，fail closed | 3 天 | L / low | 修复审批/认证门碰撞，直接影响运行安全 |
| [#7395](https://github.com/nearai/ironclaw/pull/7395) | 修复 send-claim TOCTOU 竞态 + 失败行重开 | 2 天 | **XL / low** | 高价值稳定性修复（Fix A 为并发漏洞 Fix），值得优先 review |

### 8.3 新空间/新方向（等待决策）

- [#7392](https://github.com/nearai/ironclaw/issues/7392)（epic，编码工具替换实验）尚无评论，可能需要维护者确认可行性后再投入资源
- [#7400](https://github.com/nearai/ironclaw/issues/7400)（zombie thread）虽是今日新开，但因属稳定版高频 bug，建议立即响应而非进入常规积压

---

**项目健康度评估**：核心开发团队对 UI 层 bug 的响应速度值得肯定（今日 bug→fix PR 当日闭环率约 3/4）；但长期积压的 P2 级 bug（尤其 Slack/认证路径）与 XL 级 PR 的 review 瓶颈是两个主要风险点。整体处于"快速迭代 + 架构重构"并行的高活跃健康状态，若能加快积压清理，健康度将进一步提升。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-10

> 数据来源：github.com/netease-youdao/LobsterAI | 统计周期：2026-08-09 至 2026-08-10

---

## 1. 今日速览

过去 24 小时内，LobsterAI 社区讨论活跃度中等：共 3 条 Issue 更新（无新关闭），PR 与 Release 数量均为 0，项目近期处于功能讨论与问题收集阶段，而非集中提交期。值得关注的是，今日讨论集中于**自定义模型兼容性**与**跨模型子任务协作机制**两大方向，且分别对应一个长期积压（stale）的 Issue 和一个新出现的功能性 Bug，提示维护者需在模型接入层与任务调度层投入更多关注。整体项目健康度良好，但存在少量需及时响应的积压问题。

---

## 2. 版本发布

无。

---

## 3. 项目进展

今日无 PR 合并或关闭，项目主干代码无可见推进。值得注意的进展信号来自 Issue 讨论侧：

- **模型切换逻辑引发误判问题**（[#2453](https://github.com/netease-youdao/LobsterAI/issues/2453)）：用户报告了自定义模型定义（`custom_1/openai/gpt-oss-20b:free`）被系统按 `provider/model` 硬解析导致的错误拒绝问题。该问题牵涉模型身份解析与自定义模型白名单逻辑，是影响 OpenRouter、NVIDIA 等外部模型源接入体验的关键路径。
- **跨模型子任务协作机制讨论**（[#2132](https://github.com/netease-youdao/LobsterAI/issues/2132)）：用户提交了自查结果，确认了网关级函数调用不在 sessions_list 或 subagents 中的根因，并提出同模型子任务的即时通知机制值得借鉴到跨模型场景。虽然该 Issue 已 stale，但讨论内容对项目多 Agent 架构设计有参考价值。

虽然没有代码层面的“前进”，但上述议题的明确化可视为项目在**模型兼容性与多 Agent 协作**方向上的需求沉淀。

---

## 4. 社区热点

今日共有 3 条 Issue 产生互动，按热度排序：

| Issue | 互动指标 | 议题 |
|-------|---------|------|
| [#2453 切换自定义模型，被系统定义为不许可？](https://github.com/netease-youdao/LobsterAI/issues/2453) | 1 条评论（新开仅 1 天） | 自定义模型切换被系统误判为不认可 |
| [#1187 建议增加上下文窗口大小和输出 token 设置](https://github.com/netease-youdao/LobsterAI/issues/1187) | 2 条评论，1 👍，stale | 上下文窗口溢出（Context overflow）错误 |
| [#2132 跨模型子任务调用的问题](https://github.com/netease-youdao/LobsterAI/issues/2132) | 1 条评论，stale | 跨模型子任务通知机制缺失 |

**热点分析**：

- **#2453** 是今日最“新鲜”的活跃 Issue，用户在 8 月 9 日创建后立即引发讨论。核心诉求是希望系统尊重用户自定义模型的全限定名称（`provider/model`），而不是将形如 `custom_1/openai/...` 的路径误拆分为 `OpenAI` 厂商。这暴露了当前模型描述符解析逻辑对自定义前缀（`custom_1/`）不敏感的问题。该问题对使用 OpenRouter、NVIDIA 聚合平台免费模型的用户影响面较大。
- **#1187** 虽被标记为 stale（创建于 4 月），但仍有新评论，说明 DeepSeek 等大上下文模型用户的溢出痛点长期未得到有效解决，社区对该功能有持续期待。

---

## 5. Bug 与稳定性

今日报告的问题共 3 个，按严重程度排序：

| 严重程度 | Issue | 描述 | Fix PR 状态 |
|---------|-------|------|-------------|
| **高** | [#2453](https://github.com/netease-youdao/LobsterAI/issues/2453) | 切换自定义模型（`custom_1/...`）时被系统判定为“不许可”，导致用户无法在会话中自由切换模型。影响所有使用带前缀模型 ID 的用户 | ❌ 无 |
| **中** | [#1187](https://github.com/netease-youdao/LobsterAI/issues/1187) | DeepSeek 模型运行中报 `Context overflow: prompt too large`，本质是上下文窗口设置不兼容，用户无法在 API 选项中手动调整窗口大小或输出 token 上限 | ❌ 无 |
| **中** | [#2132](https://github.com/netease-youdao/LobsterAI/issues/2132) | 跨模型子任务（主任务用 M3，子任务用 DeepSeek）调用时，主任务无法获知子任务完成/失败状态，因为网关级函数调用未注册到 sessions/subagents 列表 | ❌ 无（有用户提出的方案） |

三个问题均未关联任何修复 PR，其中 #2453 是新增问题，需要尽快分配处理；#1187 已存在 4 个月且被 stale，建议重新评估优先级；#2132 属于架构层面的协作机制问题，短期内修复成本较高。

---

## 6. 功能请求与路线图信号

今日用户提出的功能需求集中在以下方向：

- **API 配置能力增强**（[#1187](https://github.com/netease-youdao/LobsterAI/issues/1187)）：在模型 API 设置中增加**上下文窗口大小**与**输出 token 数**的显式配置项。这不仅是 Bug 修复，更是一个明确的功能缺口——目前用户无法为不同模型自定义上下文限制，这限制了大上下文模型的正确使用。考虑到 DeepSeek、Claude 等模型上下文规格差异大，此功能大概率会被纳入后续版本。

- **自定义模型解析逻辑优化**（[#2453](https://github.com/netease-youdao/LobsterAI/issues/2453)）：用户希望模型 ID 解析更智能，至少支持 `custom_1/<provider>/<model>` 形式的完整路径识别，或者提供“自定义模型名+实际 provider”的映射配置。这是一个 UX 层面的正确性修复，也可能涉及模型市场（marketplace）的设计变更。

- **跨模型子任务通知机制**（[#2132](https://github.com/netease-youdao/LobsterAI/issues/2132)）：用户建议将同模型子任务的即时通知机制扩展到跨模型场景，并给出了具体实现路径（子任务完成/卡点主动对接主任务）。如果未来版本要加强“多模型混合编排”能力，这是一个高价值的设计输入。

**路线图信号**：以上三项合并来看，社区正在推动 LobsterAI 从“单模型对话工具”向“多模型灵活编排平台”演进，其中模型配置的灵活性和跨模型协作的可观测性是两大核心诉求。

---

## 7. 用户反馈摘要

从今日更新的 Issue 评论中，可提炼以下真实用户反馈：

- **痛点一：上下文窗口不可配置导致高成本模型不可用**
  > “在 deepseek 模型运行过程中出现 Context overflow: prompt too large for the model... 存在上下文窗口设置不兼容的问题。”
  > 用户场景：使用 DeepSeek 进行长上下文对话时，模型工具强制按照后端默认窗口处理，无法适配模型实际规格，导致会话中断。该用户对错误提示本身（建议 `/reset`）不满，期望能从源头配置解决。（[#1187](https://github.com/netease-youdao/LobsterAI/issues/1187)）

- **痛点二：模型切换被误判打断工作流**
  > “在切换自定义模型的时候，只要模型的定义是类似 `custom_1/openai/gpt-oss-20b:free`，就会被系统判定为不认可... 在一个线程里面切换模型尤其打扰。”
  > 用户场景：在同一个会话中按需切换不同免费模型，但系统误将 `custom_1/openai/...` 的路径解释为 `provider=openai`，导致校验失败。用户在 OpenRouter 和 NVIDIA 上都遇到了此报错，说明影响范围较广。（[#2453](https://github.com/netease-youdao/LobsterAI/issues/2453)）

- **建设性反馈：跨模型协作机制设计建议**
  > “如果是同模型子任务，那么如果子任务完成后，主任务会第一时间知晓... 如果子任务完成或遇到卡点，可以主动对接主任务，给主任务发通知。这点可以制作成明确的跨模型子任务调用要求并实践。”
  > 用户自查了网关调用不在 subagents 列表中的根因，并非简单报障，而是提出了“同模型即时通知机制”可借鉴到跨模型场景的具体方案，体现了较高参与度。（[#2132](https://github.com/netease-youdao/LobsterAI/issues/2132)）

---

## 8. 待处理积压

以下长期未闭或带有 stale 标记的 Issue 需要维护者特别关注：

| Issue | 创建时间 | 最后更新 | 积压时长 | 说明 |
|-------|---------|---------|---------|------|
| [#1187 增加上下文窗口大小和输出 token 设置](https://github.com/netease-youdao/LobsterAI/issues/1187) | 2026-04-01 | 2026-08-09 | 约 4 个月 | 已 stale，但仍有新评论。属于高频需求，👍 数 1，评论 2。建议从 stale 列表中移除并排期处理 |
| [#2132 跨模型子任务调用的问题](https://github.com/netease-youdao/LobsterAI/issues/2132) | 2026-06-09 | 2026-08-09 | 约 2 个月 | 已 stale。用户给出了细致的根因分析，但维护者未回应。涉及多 Agent 架构方向，建议回应并评估是否纳入设计讨论 |
| [#2453 切换自定义模型被系统判定为不许可](https://github.com/netease-youdao/LobsterAI/issues/2453) | 2026-08-09 | 2026-08-09 | 1 天 | 新问题，暂无 stale 风险，但属于影响使用的功能缺陷，建议优先分配 |

**维护建议**：
- 对 #1187 和 #2132 两个 stale Issue 进行“re-triage”，确认是否继续有效，若有效则重新激活并标注优先级；
- #2453 作为新 Bug，建议在下一个 Patch 版本中修复模型描述符解析逻辑，至少增加对 `custom_/` 前缀的兼容处理。

---

*本日报由 AI 分析师自动生成，数据截至 2026-08-10 24:00（UTC+8）。*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 — 2026-08-10

## 1. 今日速览
过去 24 小时 Moltis 项目保持低频但稳定的维护节奏：新增/活跃 Issue 2 条（均为 Bug，无关闭），新增 PR 1 条（待合并，无合并/关闭），无新版本发布。所有 Issue/PR 目前均无评论与表情回应，社区讨论热度较低，但反馈集中指向 UI 配置持久化与容器状态检测两个真实使用场景，说明项目已进入被实际使用的成熟阶段。整体健康度良好，存在 1 个待维护者评审的 vault 修复 PR，建议尽快跟进。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日没有 PR 被合并或关闭，项目主分支无功能合并推进。值得关注的是新增的待合并修复 PR：

- [#1186 fix(vault): normalize recovery phrase before hashing](https://github.com/moltis-org/moltis/pull/1186) — @pxmpsdev 提交。该 PR 修复 `derive_recovery_kek` 在派生 KEK 前对助记词做归一化处理（去除短横线、转大写），但存储的哈希却基于原始短语计算，导致两者不一致。PR 涉及 vault 解锁与恢复场景，合并后将提升恢复流程的输入容错性和可靠性。

## 4. 社区热点
今日所有 Issue/PR 评论数均为 0，未形成集中讨论热点。相对最受关注的是今日仍处于活跃状态的 2 条 Bug：

- [#1187 [Bug]: Heartbeat settings UI silently resets fields not represented by the form](https://github.com/moltis-org/moltis/issues/1187)
- [#1185 [Bug]: Apple Container 1.x sandbox starts but Moltis treats it as not running](https://github.com/moltis-org/moltis/issues/1185)

两者均属于"实际状态与系统感知不一致"类问题，反映出用户对配置不被静默丢失、运行状态准确可感知的高期望。

## 5. Bug 与稳定性
今日报告 2 条 Bug，均无关联 fix PR：

| 严重程度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 中 | [#1187](https://github.com/moltis-org/moltis/issues/1187) | Heartbeat 设置 UI 会静默重置表单未展示的字段，可能导致用户配置意外丢失 | OPEN，无 fix PR |
| 中 | [#1185](https://github.com/moltis-org/moltis/issues/1185) | Apple Container 1.x 沙箱实际已启动，但 Moltis 判定为未运行，造成状态误报 | OPEN，无 fix PR |

修复方向提示：#1185 涉及外部沙箱/容器的真实状态探测，可能需要更可靠的健康检查机制而非单一进程检测。

## 6. 功能请求与路线图信号
今日无新功能请求提交。PR #1186 虽属 Bug 修复，但"助记词大小写不敏感、容忍短横线分隔"的归一化方向，表明项目正在改善恢复/解锁流程的易用性。结合 #1187（表单字段完整可视化）、#1185（状态检测准确性）来看，下一版本可能重点加强配置可见性与运行状态感知能力。

## 7. 用户反馈摘要
今日无 Issue/PR 评论可供引用，从问题描述中可提炼以下真实用户痛点：

- **配置完整性担忧**：用户配置 Heartbeat 时发现 UI 只展示部分字段，其余字段被静默重置（#1187），说明当前表单对完整配置项的呈现和提交保护不足，用户对配置丢失存在明显焦虑。
- **状态误判导致的操作困惑**：Apple Container 1.x 沙箱已启动却被判定为未运行（#1185），会让用户对产品可靠性产生质疑，尤其是自动化依赖容器状态判断的场景。

## 8. 待处理积压
- [#1185 Apple Container 1.x 沙箱误判](https://github.com/moltis-org/moltis/issues/1185) — 已存在约 2 天，无标签、无评论，需维护者确认可复现性并分配优先级。
- [#1186 vault 助记词哈希归一化修复 PR](https://github.com/moltis-org/moltis/pull/1186) — 待维护者 review，建议及时处理，避免 vault 恢复流程既有缺陷持续影响用户。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-10

> 数据来源：[CoPaw GitHub](https://github.com/agentscope-ai/CoPaw)（仓库已更名 QwenPaw，链接保留为 QwenPaw）

---

## 1. 今日速览

过去 24 小时项目活跃度处于**高位**：累计 17 条 Issue 更新（新开/活跃 11 条，关闭 6 条）、42 条 PR 更新（其中 41 条仍在合并流程中）。虽然今日无新版本发布，但**社区贡献密度显著提升**——24 小时内新增了至少 9 个 first-time-contributor 标签的 PR，覆盖审批流程、SSE 流式传输、Gemini 兼容性等多个方向。项目整体呈「高输入、高输出」状态，但需注意合并吞吐未跟上提交速度（待合并 PR 已积压至 41 条）。另外，用户 `@lcq225` 对同一前端渲染问题连续提交 5 次 Issue（#6848-#6852），反映出部分已知 bug 的修复优先级可能不足。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日唯一的合并/关闭 PR 是 **#6846，为 DeepSeek V4 系列模型补充上下文窗口目录**：

- [PR #6846 [CLOSED] feat(providers): catalog DeepSeek V4 context windows (1M)](https://github.com/agentscope-ai/QwenPaw/pull/6846)
  - 为 `deepseek-v4-flash` 和 `deepseek-v4-pro` 配置了 1,000,000 token 的上下文窗口，此前这些模型会被错误地按默认 131,072 token 处理，导致 Console 显示错误上下文容量并提前触发压缩。本次合并将模型能力映射修正到真实规格。

除合并外，今日新提交了 **多条针对性修复 PR**，有望快速解决近期社区报告的重点问题：

| PR | 对应 Issue | 解决内容 |
|---|---|---|
| [#6845 fix(chats): preserve assistant completion time](https://github.com/agentscope-ai/QwenPaw/pull/6845) | #6826 | 聊天历史恢复时保留真实完成时间，而非用创建时间覆盖 |
| [#6844 fix(providers): strip unsupported Gemini schema metadata](https://github.com/agentscope-ai/QwenPaw/pull/6844) | #6812 | 去除 Gemini 工具 schema 中的 `$schema` 字段，规避 Google API 校验失败 |
| [#6854 feat: add localized approval purpose descriptions](https://github.com/agentscope-ai/QwenPaw/pull/6854) | #6832 | 审批卡片附带一句话用途说明，降低用户审批判断成本 |

整体来看，项目在 **模型兼容性、前端交互体验、安全审批人效** 三个方向完成了实质性推进。

---

## 4. 社区热点

1. **[Issue #2291 🐾 Help Wanted: Open Tasks — Come Contribute!](https://github.com/agentscope-ai/QwenPaw/issues/2291)**（66 条评论）
   虽然创建于 3 月且已关闭，但仍在昨日更新，是项目社区协作的核心入口。许多新 PR（如 #6312 主题/皮肤模块）均源自该任务列表，说明帮助任务体系正在有效运转，贡献者持续认领任务。

2. **[Issue #6826 对话中助手消息结束时间显示异常](https://github.com/agentscope-ai/QwenPaw/issues/6826)**（4 条评论）
   用户反馈实际思考 2 分钟、页面却显示仅几秒，直接影响用户对模型性能的判断。这是「显示真实性」类问题，评论区讨论集中在历史消息 `finished_at`/`completed_at` 字段缺失。已被 #6845 PR 覆盖。

3. **[Issue #6839 MCP 工具调用时数字字符串传参异常](https://github.com/agentscope-ai/QwenPaw/issues/6839)**（3 条评论）
   MCP 工具参数中类似 `"1"` 的字符串被自动转为数字格式，导致 API 调用失败。如果传参类型强校验不修复，所有依赖 MCP 的证券/金融类查询工具都会受影响，社区关注度高。

4. **[Issue #6281 Web 控制台适配移动端](https://github.com/agentscope-ai/QwenPaw/issues/6281)**（5 条评论）
   已存在近三周、持续获得点赞与讨论，属于高频长尾需求。

5. **重复提交现象**：用户 @lcq225 连续提交了 [#6848](https://github.com/agentscope-ai/QwenPaw/issues/6848)、[#6849](https://github.com/agentscope-ai/QwenPaw/issues/6849)、[#6850](https://github.com/agentscope-ai/QwenPaw/issues/6850)、[#6851](https://github.com/agentscope-ai/QwenPaw/issues/6851)（均已关闭）及 [#6852](https://github.com/agentscope-ai/QwenPaw/issues/6852)（仍开放），报告同一问题：「前端渲染器将长多行工具输出折叠成不可读块」。5 次重复提交本身说明该 bug 对用户工作流的干扰严重，且用户对处理效率不满意，建议维护者优先给出明确回应或修复时间表。

---

## 5. Bug 与稳定性

按严重程度排序（P0 为阻断级，P2 为体验级）：

**P0 — 阻断用户核心流程**

- [Issue #6806 qwenpaw-creator: [Windows] 无法保存任何模型配置 — 每次均报 Internal Server Error](https://github.com/agentscope-ai/QwenPaw/issues/6806)
  Windows 用户完全无法保存模型配置，属于环境阻断 bug。创建于 8/7，目前仅有 AI 辅助分析给出的根因线索，尚无官方工作进展，需优先跟进。

- [Issue #6839 MCP 工具调用时，总是将像数字的字符串以数字格式传参，导致调用失败](https://github.com/agentscope-ai/QwenPaw/issues/6839)
  影响所有依赖 MCP 工具的自动化流程，因 JSON Schema 描述与真实类型的错配导致请求失败，建议检查 MCP 工具参数解析层的类型转换逻辑。

**P1 — 核心路径报错/功能异常**

- [Issue #6812 Model 'unknown' execution failed. In Google API](https://github.com/agentscope-ai/QwenPaw/issues/6812)
  Gemini 工具调用因 schema 附带 `$schema` 字段被 Google SDK 拒绝。已有修复 PR [#6844](https://github.com/agentscope-ai/QwenPaw/pull/6844)，待合并。

- [Issue #6852/#6851 前端渲染器将长多行工具输出折叠成不可读 blob](https://github.com/agentscope-ai/QwenPaw/issues/6852)
  工具输出较多时控制台可读性严重受损。用户重复提交 5 次，至今仅关闭了 4 个重复条目，核心问题仍在，预计需前端渲染层的换行与展开机制修复。

- [Issue #6847 Qwenpaw 会被杀软强制关停，WorkBuddy 不会](https://github.com/agentscope-ai/QwenPaw/issues/6847)
  杀毒软件对 QwenPaw 进程频繁拦截，截图显示约 4000×1800 像素的大幅告警面板。难以归因于单点代码问题，但可检查任务执行时是否有高敏感系统调用模式，也可引导用户添加白名单。

**P2 — 显示问题/文档失实**

- [Issue #6826 对话中助手消息结束时间显示异常](https://github.com/agentscope-ai/QwenPaw/issues/6826) → 已有 [#6845](https://github.com/agentscope-ai/QwenPaw/pull/6845) 修复
- [Issue #6853 prompts.py lies to agents: Dream writes to digest/ not MEMORY.md](https://github.com/agentscope-ai/QwenPaw/issues/6853) → prompts 声称的「dream 自动同步到 MEMORY.md」特性并未实现，存在文档与行为不一致的问题
- [Issue #6841 Auto-Dream 单 unit 集成失败即整体标记 error](https://github.com/agentscope-ai/QwenPaw/issues/6841) → 建议改为单 unit 重试 + 容错，避免「整体成功但被记为失败」

---

## 6. 功能请求与路线图信号

**已被 PR 响应的诉求（大概率进入下一版本）**

- **审批项目描述**：[Issue #6832](https://github.com/agentscope-ai/QwenPaw/issues/6832) → [PR #6854](https://github.com/agentscope-ai/QwenPaw/pull/6854) 已提交，属于体验增强，预计快速合入
- **隐藏 Agent 能力**：[PR #6842 feat(agents): add hidden flag to hide agents from UI selectors](https://github.com/agentscope-ai/QwenPaw/pull/6842)，服务插件场景，允许 Agent 在 UI 隐藏但仍可通过 `submit_to_agent` 调用
- **SSE 实时流式渲染**：[PR #6843 fix(console): stream SSE in real-time via pure ASGI middleware](https://github.com/agentscope-ai/QwenPaw/pull/6843)，解决控制台「全有或全无」的输出延迟问题，提升 LLM 流式展示体验

**路线图相关讨论**

- [Issue #6840 ReMe Light in 2.1.0b2: ReMe4 完整路线图时间线（Auto-Link、三模态搜索、4 类摘要权重）](https://github.com/agentscope-ai/QwenPaw/issues/6840)
  用户 `@MCQSJ` 对照 ReMe4 设计核对代码后，询问 Auto-Link、tri-modal search 等能力的排期。这说明 ReMe 内存系统已成为深度用户的关注焦点，维护者可借机发布更明确的路线图。

- [PR #6398 feat: add reranker support for ReMe memory search (backend)](https://github.com/agentscope-ai/QwenPaw/pull/6398) 正在推进 reranker 支持，与 ReMe4 的检索增强方向一致，值得持续关注。

**长尾功能需求**

- [Issue #6281 Web 控制台适配移动端](https://github.com/agentscope-ai/QwenPaw/issues/6281)：移动端操作需求持续存在，若短期无法完整适配，可考虑先做响应式布局优化。

---

## 7. 用户反馈摘要

- **“杀软误杀”损害信任**：[#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) 用户明确对比「同样任务，QwenPaw 被杀软打死，WorkBuddy 不会」，说明不仅是技术问题，更是用户对产品安全信誉的观感问题。
- **重复提交的疲惫信号**：`@lcq225` 在 [Issue #6848-#6852](https://github.com/agentscope-ai/QwenPaw/issues/6852) 中 5 次提交同一 bug，最终选择把问题细节（版本 2.1.0b2、Windows 11 Pro、sensenova-6.7-flash-lite）完整展开——这是用户「希望被看见」的典型表现。
- **深度用户主动参与路线图讨论**：`@MCQSJ` 分别提交了 [#6840](https://github.com/agentscope-ai/QwenPaw/issues/6840)（ReMe4 排期）和 [#6841](https://github.com/agentscope-ai/QwenPaw/issues/6841)（Auto-Dream 容错），均伴随代码阅读和方案建议，体现社区中已形成高价值的技术贡献者群体。
- **良好协作氛围延续**：[#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) 显示新贡献者持续认领开放任务，并在 PR 中标注 `first-time-contributor` 与 `ready-for-human-review` 标签，社区带教机制运行顺畅。

---

## 8. 待处理积压

**需维护者重点关注的长期未合并 PR**

| PR | 起止日期 | 状态 |
|---|---|---|
| [#6259 feat(security): support CIDR in no-auth host allowlist](https://github.com/agentscope-ai/QwenPaw/pull/6259) | 7/19 → 8/09 | 安全增强，功能完整，等待评审 |
| [#6312 feat(console): configurable theme/skin module（Task 1 draft）](https://github.com/agentscope-ai/QwenPaw/pull/6312) | 7/21 → 8/09 | 来自 #2291 任务体系的草稿 PR，需确认方向 |
| [#6325 feat(tools): show built-in tool docs and parameters in Console](https://github.com/agentscope-ai/QwenPaw/pull/6325) | 7/22 → 8/10 | 高频需求，工具可用性提升 |
| [#6360 fix: change context injection role from system to user](https://github.com/agentscope-ai/QwenPaw/pull/6360) | 7/22 → 8/10 | 修复上下文注入导致的消息校验失败，影响面较大 |
| [#6398 feat: add reranker support for ReMe memory search (backend)](https://github.com/agentscope-ai/QwenPaw/pull/6398) | 7/23 → 8/09 | 已标记 Under Review，与 ReMe4 路线相关 |
| [#6581 fix(console): avoid redundant multimodal upload warning](https://github.com/agentscope-ai/QwenPaw/pull/6581) | 7/30 → 8/09 | 体验优化，改动小，适合快速合入 |

**需响应的长期开放 Issue**

- [Issue #6281 Web 控制台适配移动端](https://github.com/agentscope-ai/QwenPaw/issues/6281)：已开放 21 天，无官方回应，点赞与评论持续增加。
- [Issue #6806 Windows 下无法保存模型配置](https://github.com/agentscope-ai/QwenPaw/issues/6806)：P0 级阻断 bug，目前仅依赖 AI 辅助分析，亟需官方确认与修复计划。

> **日报总结**：CoPaw 项目当前处于**高活跃、高参与**的健康社区状态，贡献者数量增长明显、PR 数量可观。下一阶段的健康度关键在于「合并吞吐」：41 条待合并 PR 若持续积压，可能导致贡献者积极性下降；同时建议对 P0/P1 类 bug（Windows 配置保存、MCP 传参、渲染折叠）给出明确优先级与时间承诺。

</details>
