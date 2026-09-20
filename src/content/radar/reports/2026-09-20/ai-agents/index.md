---
title: "OpenClaw 生态日报"
published: 2026-09-20
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-20

> Issues: 126 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-20 00:00 UTC

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

# OpenClaw 项目动态日报 — 2026-09-20

## 1. 今日速览

过去24小时内，OpenClaw 处于高活跃度状态：共产生 126 条 Issue 更新与 500 条 PR 更新，新版本 v2026.9.5 正式发布（64 个直接提交、4,179 个 PR、503 位贡献者）。然而，v2026.9.5 发布后立即暴露出一批升级路径阻断问题（update 失败、Codex 认证回归、Gateway 启动挂起等），目前至少 10 个 P0 级 Issue 处于开放状态，其中多个已有对应修复 PR 在队列中待合并。总体来看，项目迭代速度与社区活跃度维持高位，但当前稳定性的核心矛盾集中在 **v2026.9.5 的升级体验与 Codex 集成回归** 上。

## 2. 版本发布

### OpenClaw v2026.9.5（最新）

- **发布规模**：64 个直接提交、4,179 个 PR、503 位贡献者，是近期一次较大版本更新。
- **发布产物**：提供 `OpenClaw-2026.9.5-amd64.AppImage` 与 Debian 包（Linux），npm 包同步发布到 stable 通道。
- **已知问题（根据 Issue 反推，截至今日）**：
  - **升级失败率高**：多个用户报告从 2026.9.4 升级到 2026.9.5 失败，失败原因集中在 `doctor-failed`、`runtime-verification-failed`、`managed-service-preflight`、`finalize:targetConfigConvergence`、`global-install-failed` 等阶段（[#152759](https://github.com/openclaw/openclaw/issues/152759)、[#153230](https://github.com/openclaw/openclaw/issues/153230)、[#153177](https://github.com/openclaw/openclaw/issues/153177)、[#153270](https://github.com/openclaw/openclaw/issues/153270) 等）。
  - **Codex 认证回归**：升级后 Codex app-server 无法找到已存在的 `"openai:default"` OAuth 配置文件，导致所有 lane 以 HTTP 401 失败（[#152968](https://github.com/openclaw/openclaw/issues/152968)）。
  - **Codex 目录重试循环**：Codex resident catalog 后台更新失败后进入无限重试，每次失败在临时目录写入 342MB 的插件捕获文件，可能耗尽磁盘（[#152689](https://github.com/openclaw/openclaw/issues/152689)）。
  - **会话状态迁移异常**：Codex retained-state 迁移无法收敛，会话目录永久处于冷状态（[#152744](https://github.com/openclaw/openclaw/issues/152744)，已关闭）。
- **迁移注意事项**：建议用户在升级前检查 Node.js 版本、确保 auth 配置文件可读，并预留足够的临时磁盘空间；若使用 Codex 插件，关注 [#153038](https://github.com/openclaw/openclaw/pull/153038) 修复的合入状态。

## 3. 项目进展

今日共关闭/合并 210 个 PR（约占总 PR 数 42%），项目在以下方向有明显推进：

- **WebUI 体验优化**：合并了多项 UI 性能改进 PR，包括进度卡片刷新合并与缓存（[#153213](https://github.com/openclaw/openclaw/pull/153213)、[#153212](https://github.com/openclaw/openclaw/pull/153212)）、流式 Markdown 增量渲染优化（[#153215](https://github.com/openclaw/openclaw/pull/153215)）等，这些 PR 对应 WebUI 性能问题的集中治理（Umbrella: #149361）。
- **Codex 稳定性修复**：#153038「fix(codex): bound catalog retries and plugin capture retention」已进入待维护者审查状态，直接修复 #152689（磁盘占用）与 #152886 两个 P0 问题。
- **Gateway 任务恢复**：#153243「fix: resume unfinished tasks after Gateway restarts」已就绪，修复 Gateway 重启后父任务因 subagent 结果中断而无法恢复的问题。
- **文档完善**：关闭了文档类 Issue [#152987](https://github.com/openclaw/openclaw/issues/152987)（为 2026.9.1 版本补充插图）。
- **安全加固**：PR #152161 引入了插件可强制执行的 secret 投影机制（`exec` 工具场景），处于待验证状态，属于安全边界增强；#82950 修复命令授权的灾难性回溯问题（防止挂起）。
- **性能优化**：#152728（跳过无围栏文本的 Markdown 解析）、#152682（日志脱敏捕获优化）均处于就绪状态，属于运行时与日志路径的性能改进。

整体来看，项目的修复管线运转正常，但大量关键 PR（尤其 P0 修复）仍停留在"待维护者审查"或"待验证"状态，合入速度可能成为当前稳定性的瓶颈。

## 4. 社区热点

今日讨论最活跃的 Issue/PR 集中在几个长期未解的稳定性问题与 2026.9.5 的新回归：

- **[#149361 WebUI 性能与稳定性 Umbrella](https://github.com/openclaw/openclaw/issues/149361)** — 50 条评论。作为 WebUI 性能问题的聚合 Issue，覆盖桌面与移动端的性能、稳定性问题，是社区对 UI 体验不满的核心汇聚点。相关修复 PR 正在分批合入，但用户端的感知可能仍滞后。
- **[#97616 钩子/工具子进程泄漏为僵尸进程](https://github.com/openclaw/openclaw/issues/97616)** — 30 条评论，6 月 29 日创建至今未关闭。社区持续关注运行时长期运行后的资源退化问题，该 issue 已被标记为 P1 且被 bots 多次抓取，但尚未有对应修复 PR。
- **[#91588 Gateway 内存泄漏（350MB→15.5GB）](https://github.com/openclaw/openclaw/issues/91588)** — 27 条评论，6 月 9 日创建。RSS 涨至 15.5GB 后被 OOM killer 杀掉，触发 launchd-handoff 重启循环。这是社区呼声极高的问题，影响重度用户的持续运行体验。

**诉求分析**：社区热度最高的三个 Issue 均指向"长期运行稳定性"——WebUI 卡顿、进程资源泄漏、内存无限增长。用户对 OpenClaw 的功能广度认可度较高，但对作为"个人 AI 助手"核心体验的持久运行可靠性提出了更高要求。

## 5. Bug 与稳定性

按严重程度排列（P0 > P1 > P2）：

### 🔴 P0 级（发布阻断，共 10+ 个开放）

| Issue | 问题描述 | 状态 |
|-------|---------|------|
| [#152759](https://github.com/openclaw/openclaw/issues/152759) | `openclaw update` 2026.9.4→2026.9.5 失败，`doctor-failed`，回滚成功但无提示 | 开放，待调查 |
| [#152689](https://github.com/openclaw/openclaw/issues/152689) | Codex resident catalog 重试循环，反复写入 342MB 插件捕获到临时目录 | **已有修复 PR #153038** |
| [#152968](https://github.com/openclaw/openclaw/issues/152968) | 升级后 Codex 找不到 `openai:default` OAuth 配置，401 失败 | 开放，已关闭重复项 |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | Gateway 启动挂起 ~17 分钟，sidecars.model-runtime 超时 | 开放 |
| [#153155](https://github.com/openclaw/openclaw/issues/153155) | macOS 上 `doctor --fix` 停止健康 Gateway 后无法恢复 | 开放，manual-only |
| [#153177](https://github.com/openclaw/openclaw/issues/153177) | Update 失败：`finalize:targetConfigConvergence` | 开放 |
| [#153230](https://github.com/openclaw/openclaw/issues/153230) / [#153179](https://github.com/openclaw/openclaw/issues/153179) | Update 失败：`runtime-verification-failed` | 开放 |
| [#153049](https://github.com/openclaw/openclaw/issues/153049) | Update 失败：`doctor-failed`（darwin/arm64） | 开放 |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 2026.9.5 将稳定环境变成 8 小时故障恢复会话 | 开放 |
| [#152839](https://github.com/openclaw/openclaw/issues/152839) | openat2 ENOSYS 导致 Gateway 状态锁获取失败（Docker/群晖） | 开放，功能请求 |

### 🟠 P1 级（主要缺陷）

- **运行时/资源类**：
  - [#97616](https://github.com/openclaw/openclaw/issues/97616) — hook/tool 子进程泄漏为僵尸进程，导致运行时退化（6 月创建，未修复）。
  - [#91588](https://github.com/openclaw/openclaw/issues/91588) — Gateway 内存泄漏至 15.5GB 触发 OOM（6 月创建，未修复）。
  - [#153067](https://github.com/openclaw/openclaw/issues/153067) — Gateway 稳态下每 5 秒复制整个状态库，日写入约 5.9TB staging 数据（新增）。
  - [#153246](https://github.com/openclaw/openclaw/issues/153246) — 插件构建临时目录未清理，每日增长约 7.5GB（新增）。

- **会话/消息丢失类**： [#104719](https://github.com/openclaw/openclaw/issues/104719)（memory-wiki 补充忽略工具截止时间）、[#150530](https://github.com/openclaw/openclaw/issues/150530)（Talk 会话中除颤失败）、[#150498](https://github.com/openclaw/openclaw/issues/150498)（子代理报告丢失，安全相关）、[#152942](https://github.com/openclaw/openclaw/issues/152942)（sessions_spawn 错误继承 fastMode）、[#148292](https://github.com/openclaw/openclaw/issues/148292)（自动压缩会话单次尝试无超时，导致 23 分钟挂起）。

- **平台特定**： [#153044](https://github.com/openclaw/openclaw/issues/153044)（macOS Talk 模式每次启动仅一轮）、[#144447](https://github.com/openclaw/openclaw/issues/144447)（Git/dev 更新卡在 managed-service-preflight）。

### 🟡 P2 级（体验问题）

WebUI 系列 P2 问题大量由 @vyctorbrzezowski 提交并标记 `maintainer`，包括 [#153151](https://github.com/openclaw/openclaw/issues/153151)（重连丢失未保存的显示名）、[#153116](https://github.com/openclaw/openclaw/issues/153116)（Rewind 确认框在视口改变后偏离屏幕）、[#153103](https://github.com/openclaw/openclaw/issues/153103)（视口缩放导致评论编辑内容丢失）、[#151970](https://github.com/openclaw/openclaw/issues/151970)（搜索无结果时丢失阅读位置）等。这些修复优先级标记为 P2，预计在后续 WebUI 批次中修复。

## 6. 功能请求与路线图信号

今日出现的功能请求与路线图信号：

| 功能/方向 | 来源 | 状态与信号 |
|----------|------|-----------|
| **WebUI 性能与稳定性治理** | Umbrella [#149361](https://github.com/openclaw/openclaw/issues/149361) | 已有多个性能优化 PR 合入或待合入（#153213、#153212、#153215），表明该方向是当前维护重点 |
| **插件构建临时目录自动清理** | [#153246](https://github.com/openclaw/openclaw/issues/153246) | 新提交，P1；如确认将进入插件构建生命周期管理 |
| **openat2 兼容性降级/提示** | [#152839](https://github.com/openclaw/openclaw/issues/152839) | 新提交，P0；建议在 Docker/群晖环境下提供兼容路径，有产品决策需求 |
| **Control UI 支持 LaTeX 渲染** | PR [#144324](https://github.com/openclaw/openclaw/pull/144324) | 已存在较长时间，今日有更新；当前处于 needs proof 状态 |
| **Chrome 扩展跨端统一设置** | PR [#152057](https://github.com/openclaw/openclaw/pull/152057) | 已就绪，维护者标记待审查；属于桌面与终端体验统一方向 |
| **Slack 渠道接入超时配置暴露** | [#116547](https://github.com/openclaw/openclaw/issues/116547) | 已有内部实现，社区要求将 `adoptionStallTimeoutMs` 暴露为配置项 |
| **Telegram 话题名人性化显示** | [#7406](https://github.com/openclaw/openclaw/issues/7406) | 长期开放功能请求，4 月创建，社区仍有 +1 |
| **系统资源用量图形化** | PR [#153268](https://github.com/openclaw/openclaw/pull/153268) | 已合入就绪状态，将在 Systems 页面展示趋势图 |
| **Android 全屏聊天模式** | [#118490](https://github.com/openclaw/openclaw/issues/118490) | 新功能请求，P3 优先级 |
| **macOS 权限请求优化** | PR [#153263](https://github.com/openclaw/openclaw/pull/153263) | 已就绪，修复录屏权限缺失问题 |

**判断**：WebUI 的批量优化（渲染性能、图片展示、图表化）表明项目正在系统性地打磨 web 端体验。Chrome 统一设置、LaTeX 渲染、全屏聊天等 PR 若合入，将进一步完善桌面与 Web 的跨端一致性。

## 7. 用户反馈摘要

- **对 v2026.9.5 的强烈不满**：#153257 用户直接表达"regret upgrading to OpenClaw 2026.9.5"，称该版本将一个稳定环境变成 8 小时故障恢复会话——这类情绪反映了发布质量控制方面的隐忧。多个 Update 失败报告（#152759、#153230、#153270 等）显示失败后信息不透明、用户无法自行排查。
- **长期稳定性痛点持续存在**：#97616（僵尸进程）、#91588（内存泄漏）、#153067（状态库反复复制）的用户描述都指向同一类问题——长时间运行后资源耗散。有用户估算 5.9TB/天的 staging 写入量，说明问题在生产环境中已达到严重程度。
- **正面反馈**：WebUI 性能优化 PR 的密集产出得到关注（Umbrella #149361 下大量评论讨论修复进展）；#153268（资源用量趋势图）获得维护者积极开发，社区对可视化改进较为期待。
- **配置可发现性不足**：#152839（openat2 在群晖 NAS 上崩溃）、#152968（Codex 认证配置找不到）等环境相关问题的用户反馈，说明在不同操作系统/容器环境下，错误提示与文档指引仍需加强。

## 8. 待处理积压

**长期未响应或未修复的关键 Issue（按创建时间排序）**：

| Issue | 创建时间 | 问题 | 备注 |
|-------|---------|------|------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 2026-06-09 | Gateway 内存泄漏至 15.5GB，OOM 崩溃循环 | **P1**，3个月未关闭；社区持续 +1 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | hook/tool 子进程僵尸化 | **P1**，3个月未关闭；无 fix PR |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | 2026-07-27 | SQLite 无界增长（memory 表无保留策略） | **P2**，已标记需要产品决策 |
| [#121232](https://github.com/openclaw/openclaw/issues/121232) | 2026-08-09 | memory-core dreaming 推选与实施不一致 | **P1**，已有 linked PR 但未合入 |
| [#144447](https://github.com/openclaw/openclaw/issues/144447) | 2026-09-10 | Git/dev update 卡在 managed-service-preflight | **P2**，待维护者审查 |

**待维护者关注的 PR**：
- [#153038](https://github.com/openclaw/openclaw/pull/153038)（P0 Codex 修复）已标记 👀 ready for maintainer look，属于当前最高优先级待合入 PR。
- [#153243](https://github.com/openclaw/openclaw/pull/153243)（Gateway 重启后任务恢复）同样就绪，涉及核心可靠性。

**风险提示**：P0 级升级失败与 Codex 回归类的 Issue 数量在 24 小时内超过 10 个，且高度集中在 v2026.9.5 版本上。建议维护者优先合并 #153038 与 #153078（Gateway 重启修复），并在下个补丁版本中重点验证升级路径（update 命令的 doctor/verification 阶段）与 Codex 认证配置的兼容性。

---

*本日报基于 OpenClaw GitHub 仓库公开数据生成，统计时间窗口：2026-09-19 至 2026-09-20。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期**: 2026-09-20  
**数据窗口**: 2026-09-19 ~ 2026-09-20（过去 24 小时）

---

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现"一超多强"格局：OpenClaw 以 503 位贡献者、4,179 个 PR 的规模断层领先，并已衍生出 Zeroclaw、PicoClaw、NanoClaw、IronClaw、CoPaw 等定位各异的"Claw 家族"分支；独立项目中 NanoBot（HKUDS）、LobsterAI（网易有道）、Moltis 等也在各自细分方向形成差异化竞争力。生态整体处于快速迭代期，但共同的突出矛盾是**长期运行稳定性**——内存泄漏（OpenClaw 15.5GB）、僵尸进程、会话永久卡死等资源耗散类问题横跨多个项目，且 P0 修复 PR 普遍受制于维护者审查带宽而积压。与此同时，开放生态正沿三条主线推进：OpenAI 兼容 provider 的规模化接入、Agent 工具调用权限治理（安全策略钩子、沙箱加固）、以及 WebUI/控制台的体验打磨。版本发布节奏分化严重（仅 OpenClaw 今日发版且伴随回归），反映出高速迭代与质量控制的平衡仍是全生态的共同课题。

---

## 2. 各项目活跃度对比

| 项目 | Issues 动态 | PR 动态 | 合并/关闭 | 今日 Release | 健康度评估 |
|------|------------|---------|-----------|-------------|-----------|
| **OpenClaw** | 126 条更新 | 500 条更新 | 210 个合并/关闭 | **v2026.9.5** | 高活跃，但 10+ 个 P0 升级回归开放，稳定性承压 |
| **NanoBot** | 1 条活跃（安全） | 28 条（7 合并/21 待合） | 7 个合并，含 2 个 P1 安全修复 | 无 | 良好：安全加固落地快，但 #4072 沙箱逃逸搁置 114 天 |
| **Zeroclaw** | 6 条（5 新/1 关） | 50 条（0 合并） | 0 | 无 | 社区活跃但审查停滞：S1 问题悬置 79 天，50 PR 积压 |
| **PicoClaw** | 1 条（CRITICAL） | 0 | 0 | 无 | **差**：官网 TLS 证书过期 9 天未处理，项目停滞 |
| **NanoClaw** | 3 条（全开放） | 4 条（全待合） | 0 | 无 | 良好：无严重 Bug，但 2 条关键 PR 积压超 21 天 |
| **IronClaw** | 0 | 1 条（待合 40 天） | 0 | 无 | 中低：0 Issue、无合并，评审瓶颈明显 |
| **LobsterAI** | 2 条（1 关） | 6 条 | **6 个全部合并** | 无 | **优秀**：4 个严重缺陷当日修复闭环，零积压 |
| **Moltis** | 4 条（3 新/1 关） | 1 条（待合） | 0 | 无 | 中等：heartbeat 配置失效 bug 超 35 天未修复 |
| **CoPaw** | 10 条 | 7 条（全待合） | 0 | 无 | 高活跃但风险集中：3 个 P0/P1 修复 PR 已就绪未合入 |

**关键数据对比**：OpenClaw 单日处理量（126 Issues + 500 PRs）是其余 8 个项目总和的 10 倍以上；LobsterAI 是唯一实现"当日报告、当日合并、零积压"的项目；PicoClaw 与 IronClaw 处于事实上的维护停滞状态。

---

## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的中心参照物与架构输出者**，其地位体现在三个维度：

- **规模代差**：503 位贡献者、累计 4,179 个 PR、单日 210 个合并——相比之下第二梯队的 NanoBot 单日 PR 总量为 28，社区规模差约一个数量级。OpenClaw 的 Issue 讨论密度（如 #149361 有 50 条评论）也是其他项目难以企及的。

- **架构辐射**：OpenClaw 的 Gateway 架构、Codex 集成、WebUI 控制台、插件系统、多渠道接入，构成了"Claw 家族"的公共技术底座。Zeroclaw（消息渠道深挖）、PicoClaw（嵌入式/Sipeed 硬件）、NanoClaw（CLI/本地模型）、IronClaw（身份认证）、CoPaw（多智能体治理）分别从 OpenClaw 的分支上生长出差异化定位，形成一个**围绕同一架构的物种分化生态**。

- **技术路线特点**：OpenClaw 走的是"重而全"的路线——OAuth 认证（Codex openai:default）、托管服务（managed-service）、插件捕获机制、跨平台产物（AppImage/Debian/npm）。这带来功能广度的同时，也导致升级路径复杂（v2026.9.5 出现 6 种 upgrade 失败阶段：doctor-failed、runtime-verification-failed、managed-service-preflight 等）和资源治理难题（5.9TB/天 staging 写入、342MB 插件捕获循环）。**其核心优势是生态纵深与功能完整度，核心风险是发布质量与长跑可靠性。**

---

## 4. 共同关注的技术方向

多项目同日涌现的共性需求，按涉及面排序：

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **Provider 生态扩张** | NanoBot、Moltis、NanoClaw、CoPaw | 接入 OpenAI 兼容网关（aimlapi、Groq、pi agent）、区域模型（商汤 SenseNova、DeepSeek）、以及"免费模型"标签与实际收费策略的一致性（CoPaw #7882） |
| **长期运行资源治理** | OpenClaw、Zeroclaw、Moltis、CoPaw | 内存泄漏至 OOM（OpenClaw #91588）、子进程僵尸化（#97616）、heartbeat 空跑（Moltis #1205）、会话永久卡死（CoPaw #7876）、WhatsApp 设备链接阻断（Zeroclaw #8627） |
| **Agent 工具调用安全策略** | NanoBot、OpenClaw、CoPaw、NanoClaw | 出站消息授权钩子（NanoBot #4668）、pre-tool-call 策略钩子供插件治理（CoPaw #7878）、secret 投影机制（OpenClaw #152161）、容器挂载校验绕过（NanoClaw #3680）、symlink 沙箱逃逸（NanoBot #4072） |
| **WebUI/控制台体验治理** | OpenClaw、NanoBot、CoPaw、Zeroclaw | 流式渲染性能（OpenClaw）、ProviderPicker 可搜索（NanoBot #5776）、懒加载崩溃不可恢复（CoPaw #7815）、WhatsApp 媒体预览补全（Zeroclaw #10981/#10812） |
| **升级/自更新可靠性** | OpenClaw、NanoBot、PicoClaw | OpenClaw 10+ P0 升级失败；NanoBot 新增 `nanobot update` 自更新流程（#5817）；PicoClaw 证书过期暴露基础设施维护缺位 |
| **会话级精细化配置** | LobsterAI、NanoClaw、Moltis | per-session MCP 开关（LobsterAI #1070）、CLI 模型名校验（NanoClaw #3855）、heartbeat 自定义 tool_controls（Moltis #1279） |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构关键差异 |
|------|---------|---------|-------------|
| **OpenClaw** | 全能型个人 AI 助手：Gateway + Codex + WebUI + 插件生态 | 开发者、重度个人用户 | 重型分布式架构，托管服务与插件捕获机制，跨平台分发 |
| **Zeroclaw** | 消息渠道深度体验（WhatsApp 优先：原生投票、媒体元数据、群组管理） | 消息驱动型用户 | 通道抽象层打磨，渠道能力补全快，但核心架构依赖 OpenClaw 上游 |
| **NanoClaw** | CLI 优先 + 本地模型推理（idle timeout、health check） | 命令行开发者、本地模型用户 | 轻量级 CLI 工具链，强调零依赖运维可观测性（`ncl health` 主进程宕机也可读） |
| **IronClaw** | 代理身份认证与授权边界（host-mediated passport、无进程运行） | 企业内网、安全敏感场景 | 身份注入层（IdentyClaw Passport）与宿主解耦，支持无 shell/无扩展环境 |
| **CoPaw** | 多智能体编排 + 插件治理（PawApp 控制面、pre-tool-call 策略钩子） | 企业级 Agent 平台使用者 | 治理流水线（governance pipeline）设计，插件可见的决策钩子，QwenPaw 兼容层 |
| **NanoBot** | 多 provider 安全网关（出站策略、Dream 写保护、workspace 隔离） | 自托管用户、隐私敏感用户 | 安全策略引擎（allow_from/group_allow_from），沙箱逃逸防护，HKUDS 学术背景 |
| **LobsterAI** | 会话管理 + 存储可靠性（SQLite 原子写、per-session MCP） | 网易系生态开发者和重度会话用户 | 存储层防御性加固（PRAGMA foreign_keys、原子写入、超时恢复），UI 组件化重构 |
| **Moltis** | 自动化工作流（heartbeat、cron）+ provider 规范化（强制零参数工具 schema） | 自动化/定时任务用户 | 工具接口标准化取向，Groq 一等公民支持，心跳调度引擎 |
| **PicoClaw** | 轻量嵌入式变体（Sipeed 硬件） | 边缘/嵌入式开发者 | 目前因基础设施故障（证书过期）无法评估架构进展 |

---

## 6. 社区热度与成熟度

**第一梯队｜快速迭代期（Issue 涌入速度 > 合并速度）**
- **OpenClaw**：单日 126 Issues / 500 PRs / 210 合并，吞吐量惊人但 P0 积压同样惊人（10+ 个开放）。处于"高速扩张伴随阵痛"阶段。
- **CoPaw**：10 Issues / 7 PRs 全部待合，P0 会话损坏修复 PR 已备好但无人合入——社区热度高，维护者带宽成为瓶颈。
- **Zeroclaw**：6 Issues / 50 PRs 积压，0 合并。社区贡献热情未被有效消化，S1 问题长期悬置，存在贡献者流失风险。

**第二梯队｜质量巩固期（合并效率高、安全加固落地）**
- **LobsterAI**：6/6 PR 当日合并，4 个严重缺陷当日闭环，是本日唯一"零积压"项目，体现成熟项目的纪律性。
- **NanoBot**：7 个 PR 合并（含 2 个 P1 安全修复），安全方向实质推进；但 6 条冲突 PR 与 1 条 114 天安全漏洞（#4072）未响应，需警惕。

**第三梯队｜低速/停滞期（基础设施或评审能力威胁社区信任）**
- **IronClaw**：0 Issues / 1 PR 待合 40 天，无版本节奏，处于"开发探索期 + 评审瓶颈期"并存状态。
- **PicoClaw**：仅 1 条 CRITICAL Issue（证书过期 9 天），无 PR 活动。官网宕机直接阻断新用户获取，已从"低活跃"滑向"信任危机"。

---

## 7. 值得关注的趋势信号

**① PR 审查吞吐量成为全生态的规模瓶颈**  
CoPaw 的 P0 修复（#7885/#7886/#7887/#7889）、OpenClaw 的 Codex 修复（#153038）、Zeroclaw 的 50 条积压、NanoClaw 的 2 条 21+ 天长跑 PR——修复已就绪但合入停滞。对维护者的启示：需要引入更多 reviewer 或自动化合并门禁；对贡献者的启示：优先选择合并效率高的项目（如 LobsterAI、NanoBot）投入。

**② "Agent 权限治理"正成为一个独立的技术赛道**  
IronClaw 的 host-mediated 身份认证、CoPaw 的 pre-tool-call 策略钩子、NanoBot 的出站策略与技能写保护、OpenClaw 的 secret 投影——四个独立项目同日出现方向重叠的安全能力建设，说明行业正从"功能堆叠"转向"治理基础设施"。这是下一阶段企业级采用的关键门槛。

**③ OpenAI 兼容协议成为生态默认集成标准**  
NanoBot 接入 aimlapi（1000+ 模型聚合）与商汤 SenseNova、Moltis 将 Groq 提升为一等公民、CoPaw 处理 OpenAI 风格 file payload 兼容性——区域模型与聚合网关通过这一协议快速涌入，Agent 的模型选择正从"绑定单一供应商"走向"开放可插拔"。

**④ 长期运行资源耗散是尚未解决的行业通病**  
OpenClaw 的 15.5GB 内存泄漏、5.9TB/天 staging 写入、342MB 日志循环与 Moltis 的 heartbeat 空跑、NanoClaw 的 30 分钟超时误杀本质上是同一类问题：**Agent 长驻运行模式的资源生命周期管理缺少标准方案**。谁能先系统性地解决"无限运行下的有限资源"问题，谁就在个人 AI 助手产品化中占据先机。

**⑤ 升级路径质量决定版本信任，用户容忍度正在降低**  
OpenClaw 用户"regret upgrading to 2026.9.5"的反馈、PicoClaw 证书过期 9 天无响应的现实，共同指向一个结论：在 Agent 已成为用户日常依赖的场景下，一次失败的升级或基础设施故障的代价远高于功能缺失。**发布门禁（升级演练、回滚预案）与基础设施自动化（证书续期、健康自检）将是从"可用"到"可信"的分水岭。**

**⑥ Agent 安全研究者的主动攻击面分析正在升温**  
NanoBot 的 symlink 沙箱逃逸（提交 4 个月无响应）、CoPaw 对 kimi-code 边界覆盖不均的审计（Write 和 Bash 完全绕过检查）、NanoClaw 的容器挂载绕过修复——安全社区开始系统性解剖 Agent 执行沙箱。**未来 3-6 个月可能出现一波 Agent 沙箱漏洞披露潮**，各项目应提前建立安全响应通道，避免重蹈 NanoBot #4072 的覆辙。

---

*本报告基于 9 个开源项目的 GitHub 公开数据日报交叉分析生成，统计窗口为 2026-09-19 至 2026-09-20。数据来源于各项目官方仓库的 Issue/PR 动态，仅供参考。*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报（2026-09-20）

> 数据统计区间：过去 24 小时（截至 2026-09-19）｜来源：GitHub [HKUDS/nanobot](https://github.com/HKUDS/nanobot)

## 1. 今日速览

过去 24 小时项目活跃度较高，共 **28 条 PR 更新**，其中 21 条处于待合并状态，7 条已合并/关闭；**1 条安全问题 Issue 保持活跃**，尚无对应修复 PR。今日无新版本发布。值得关注的是：两项 **p1 级安全修复 PR**（#4668、#4667）在今日关闭，安全加固方向有实质推进；同时新提交的 PR 集中在 **provider 生态扩展**（aimlapi.com、SenseNova）、**WebUI 体验优化**和**自更新能力**。项目整体健康度良好，社区贡献活跃，但存在约 6 条 PR 因冲突或长期未处理而积压，需要维护者关注。

## 2. 版本发布

今日无新版本发布（最新 Releases 为空）。

## 3. 项目进展

今日关闭/合并的 PR 中，有 3 条在展示列表中可见，其中 2 条为安全修复，1 条为 WebUI 增强；另有 4 条合并/关闭记录未在本次展示数据中详细列出。

- **[#4668] [已关闭] fix: enforce message outbound policy**（@hamb1y，2026-07-02 创建，2026-09-19 关闭）  
  p1 安全修复：为 `message` 工具出站调度增加授权钩子，强制执行频道 `allow_from` / `group_allow_from` 跨目标发送策略；同时在禁用 workspace 限制时，也将本地媒体附件限制在 `workspace/media` 目录内。该 PR 修复了越权消息发送问题（#4076）。  
  https://github.com/HKUDS/nanobot/pull/4668

- **[#4667] [已关闭] fix: protect user skills from dream writes**（@hamb1y，2026-07-02 创建，2026-09-19 关闭）  
  p1 安全修复：为 Dream 写入用户技能增加保护——需 `dream_managed: true` frontmatter 标记的技能才能被 Dream 修改；Dream 新建技能也仅限初始 `SKILL.md` 带该标记的文件。该 PR 修复了技能被篡改问题（#4075）。  
  https://github.com/HKUDS/nanobot/pull/4667

- **[#5816] [已关闭] feat(webui): polish provider setup and unify settings controls**（@Re-bin，2026-09-19 创建，当日关闭）  
  WebUI 配置体验收尾：统一 settings、model picker、Overview 与 composer 中的 provider 品牌展示，修复品牌资源错误与缺失别名，统一 32px 圆角缩略图规范。创建当天即关闭，可见维护者对 WebUI 迭代响应迅速。  
  https://github.com/HKUDS/nanobot/pull/5816

项目整体进展：安全护栏（消息外发策略、技能写保护）已落地；WebUI 配置层正在系统性打磨；provider 集成与部署体验是当前活跃赛道。

## 4. 社区热点

本次数据未提供 Issue/PR 的评论数与点赞计数，以下基于 PR 生命周期、标签优先级、跨领域影响面及社区常见诉求综合判断：

- **[#5403] [OPEN] fix(memory): use API-reported prompt tokens to trigger consolidation**（@rickererer，2026-08-16 创建，p1）  
  这是长对话用户的核心痛点：本地 tiktoken 估算比 API 实际计数低 30-50%，导致上下文压缩（consolidation）永远不触发。修复已提交但已积压 35 天，社区关注度预计较高。  
  https://github.com/HKUDS/nanobot/pull/5403

- **[#5666] [OPEN] feat(providers): add aimlapi.com as an OpenAI-compatible gateway provider**（@hugoaimlapi，2026-09-04 创建，conflict）  
  外部 AI 聚合平台主动提交集成，并带有商业合作性质。这类 PR 通常意味着项目生态对第三方厂商已有吸引力，但也需要维护者平衡技术审查与利益冲突。  
  https://github.com/HKUDS/nanobot/pull/5666

- **[#5453] [OPEN] feat(providers): add SenseNova (商汤日日新) provider**（@morandot，2026-08-20 创建，conflict）  
  国内模型厂商接入，支持 `sensenova-6.8-flash-lite`、`deepseek-v4-flash`、`glm-5.2` 三个模型。反映社区对区域化/本土模型提供商的明确需求。  
  https://github.com/HKUDS/nanobot/pull/5453

- **[#4072] [OPEN] Security: ExecTool restricted workspace can be bypassed through relative symlinks**（@hamb1y，2026-05-29 创建）  
  一个存在近 4 个月、至今 0 评论 0 修复的安全漏洞。安全类 Issue 常被社区“暗中关注”，尤其是涉及 sandbox 逃逸的方向。  
  https://github.com/HKUDS/nanobot/issues/4072

**背后诉求归纳**：① 希望接入更多 OpenAI-compatible 的聚合服务与区域模型；② 长对话场景下模型上下文管理依赖的是 API 真实 token 而非本地估算；③ 对执行沙箱的隔离强度要求越来越高。

## 5. Bug 与稳定性

按严重程度从高到低排列：

| 严重程度 | 问题 | 状态 | 描述 |
|---|---|---|---|
| 🔴 高 | **[#4072]** ExecTool workspace 限制可被相对 symlink 绕过 | 无 fix PR | `restrict_to_workspace=True` 时，可通过 workspace 内的相对 symlink 读取外部文件。shell guard 只检查命令文本和绝对路径，未解析相对 symlink。属于 sandbox 逃逸类漏洞。 |
| 🔴 高 | **[#5402]** 本地 tiktoken 估算低于 API 实际计数 30-50%，上下文压缩永不触发 | fix PR #5403 待合并（p1） | 用户长对话超过上下文窗口时无法触发 consolidation，可能导致对话失败。 |
| 🟠 中 | **[#5747]** 进程在工具执行中途退出，已完成结果与未完成结果无法区分 | fix PR #5748 待合并 | 检查点只在执行前和全部完成后持久化，进程崩溃会丢失已完成工具的结果和外部副作用证据。 |
| 🟠 中 | **[#4819]** consolidation 锁存于 `WeakValueDictionary`，可能被 GC 回收 | fix PR #4819 待合并（conflict） | 锁身份不稳定会导致会话级合并锁失效。 |
| 🟡 低 | **[#4820]** web_fetch URL 为 truthy 非字符串值（如 `123`）被强制转 str，污染缓存签名 | fix PR #4820 待合并 | 可能干扰后续合法 URL 的缓存查找。 |
| 🟡 低 | **[#5257]** sustained goal 无终态条件时被记录为 active，且空闲时可能无限继续 | fix PR #5257 待合并 | 同时涉及准入校验与空闲续跑两个边界问题。 |
| 🟡 低 | **[#5260]** 运行时文件混入 tracked workspace 目录，污染记忆 | fix PR #5260 待合并 | 已有 backfill 方案，未跟踪的运行时文件会被忽略。 |
| 🟡 低 | **[#5641]** iOS PWA 首击被吞、状态栏高度异常 | fix PR #5641 待合并 | iOS Safari 首次点击触发 `:hover` 导致侧边栏行点击失效。 |
| 🟡 低 | **[#5292]** Matrix 房间级回复未使用 reply 功能，客户端无法关联原消息 | fix PR #5292 待合并 | 非线程场景下 bot 回复是裸顶层事件。 |

链接：[#4072](https://github.com/HKUDS/nanobot/issues/4072) · [#5402](https://github.com/HKUDS/nanobot/issues/5402) · [#5403](https://github.com/HKUDS/nanobot/pull/5403) · [#5747](https://github.com/HKUDS/nanobot/issues/5747) · [#5748](https://github.com/HKUDS/nanobot/pull/5748) · [#4819](https://github.com/HKUDS/nanobot/pull/4819) · [#4820](https://github.com/HKUDS/nanobot/pull/4820) · [#5257](https://github.com/HKUDS/nanobot/pull/5257) · [#5260](https://github.com/HKUDS/nanobot/pull/5260) · [#5641](https://github.com/HKUDS/nanobot/pull/5641) · [#5292](https://github.com/HKUDS/nanobot/pull/5292)

## 6. 功能请求与路线图信号

- **新 provider 集成成为主线**：[#5666](https://github.com/HKUDS/nanobot/pull/5666)（aimlapi.com，1000+ 模型聚合平台）与 [#5453](https://github.com/HKUDS/nanobot/pull/5453)（商汤 SenseNova）表明项目正从“少数 provider”转向“开放接入 OpenAI-compatible 生态”。若合并，用户可用的模型入口将显著扩大。

- **自更新与部署体验**：[#5817](https://github.com/HKUDS/nanobot/pull/5817) feat: add stable and source self-update flows（@chengyongru，2026-09-19 创建）新增 `nanobot update`、`--dev/--update-dev` 源码更新流程、pin SHA-256 的 Bun 运行时。这是一个重要的运维能力信号，预计会提升自托管用户的升级意愿。

- **WebUI 配置管理进入精细化阶段**：[#5776](https://github.com/HKUDS/nanobot/pull/5776) 将 ProviderPicker 升级为可搜索的 Popover + Combobox 列表，惠及 Models、Web search、Transcription、Image Generation 四处设置；[#5352](https://github.com/HKUDS/nanobot/pull/5352) 增加 provider 删除控件并阻止删除仍被引用的 provider。配合今日关闭的 #5816，WebUI 设置中心正在经历一次系统性重构。

- **Telegram 企业/自托管需求明确**：[#4919](https://github.com/HKUDS/nanobot/pull/4919)（@nolanchic）支持自定义 Bot API base URL 和额外 headers，可对接自建 Bot API server 或企业网关，实现 #4702 的功能请求。

- **多地址邮箱场景**：[#5606](https://github.com/HKUDS/nanobot/pull/5606) 允许按收件人别名过滤邮件消息，解决多别名共用同一收件箱时的消息归属问题。

- **国际化与本地化**：[#5367](https://github.com/HKUDS/nanobot/pull/5367) 将 Agent 活动标签本地化到全部 10 种支持语言，并在 WebUI 切换语言时即时更新。

综上，下一版本的候选范围可能是：多个新 provider 接入、Telegram 自定义 API、WebUI ProviderPicker 搜索、provider 删除管理、自更新命令。

## 7. 用户反馈摘要

> 说明：当前唯一的活跃 Issue #4072 评论数为 0，因此本节主要从各 PR 所解决的问题中提炼真实用户痛点。

- **长对话场景的上下文管理不可靠**（来自 #5403）：本地 tiktoken 估算系统性偏低 30-50%，导致“对话已经超过模型窗口但系统认为没超”。这是高影响、低感知的隐患，用户可能反复遇到莫名的上下文截断或错误，却不知道根因。

- **进程安全退出与恢复是信任基石**（来自 #5748）：用户希望在批量工具执行中途退出后，已完成操作（包括外部副作用）能被正确识别，而不是丢失或被重复执行。

- **移动端体验细节影响实际使用**（来自 #5641）：“第一次点击被吞”是 iOS PWA 常见的适配问题，说明已有真实用户在 iOS 上以 PWA 方式使用 NanoBot，且期望原生级交互体验。

- **多地址共用邮箱的混淆**（来自 #5606）：用户将 `assistant@example.com` 与 `team@example.com` 指向同一收件箱时，bot 无法区分消息发给谁，造成回复/行为策略无法按地址区分。

- **provider 数量增多后缺乏管理手段**（来自 #5352）：接入的 provider 越多，用户越需要能安全地移除不再使用的配置，且不想误删仍被图片生成等模块引用的条目。

- **安全研究者主动提交漏洞报告**（来自 #4072）：外部安全人员愿意深入分析执行沙箱的绕过路径，说明项目在安全社区有一定关注度；但提交近 4 个月无维护者响应，可能影响后续安全贡献者积极性。

## 8. 待处理积压

以下为长期未合并/未响应的重要条目，建议维护者优先处理：

| 条目 | 创建时间 | 搁置天数 | 风险 |
|---|---|---|---|
| [#4072](https://github.com/HKUDS/nanobot/issues/4072) Security: ExecTool symlink 绕过 | 2026-05-29 | ~114 天 | 安全漏洞，无 fix、无评论、无维护者回复 |
| [#4819](https://github.com/HKUDS/nanobot/pull/4819) WeakValueDictionary 锁被 GC | 2026-07-06 | ~76 天 | conflict，需 rebase |
| [#4820](https://github.com/HKUDS/nanobot/pull/4820) 拒绝非字符串 web fetch URL | 2026-07-06 | ~76 天 | 低危，但长期未合入 |
| [#5257](https://github.com/HKUDS/nanobot/pull/5257) sustained goal 边界问题 | 2026-08-05 | ~46 天 | 行为边界 bug |
| [#5260](https://github.com/HKUDS/nanobot/pull/5260) 运行时文件混入 workspace | 2026-08-05 | ~46 天 | 数据污染 |
| [#5292](https://github.com/HKUDS/nanobot/pull/5292) Matrix 回复链接缺失 | 2026-08-08 | ~43 天 | 体验 bug |
| [#5352](https://github.com/HKUDS/nanobot/pull/5352) provider 删除控件 | 2026-08-12 | ~39 天 | conflict，功能需求明确 |
| [#5403](https://github.com/HKUDS/nanobot/pull/5403) 用 API token 触发 consolidation | 2026-08-16 | ~35 天 | **p1 优先级**，长对话核心稳定性 |
| [#5453](https://github.com/HKUDS/nanobot/pull/5453) SenseNova provider | 2026-08-20 | ~31 天 | conflict，新 provider |
| [#5666](https://github.com/HKUDS/nanobot/pull/5666) aimlapi.com provider | 2026-09-04 | ~16 天 | conflict，商业合作背景 |

**维护者提示**：积压条目中有 6 条被标记为 `conflict`，说明这些 PR 在长时间等待中已与主分支脱节，建议尽快安排 review 或要求作者 rebase，避免进一步腐烂。#4072 安全漏洞的长期无响应是当前项目健康度中最需要关注的风险点。

---

*本日报基于 GitHub 公开数据自动生成，部分 PR 的评论数/点赞数在原始数据中缺失，热点与反馈分析结合了 PR 描述、标签与生命周期推断，仅供参考。*

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报 — 2026-09-20

## 1. 今日速览

过去 24 小时项目活跃度较高：共更新 6 条 Issue（新增 5、关闭 1）、50 条 PR 全部处于待合并状态，无新版本发布。今日活跃集中在 WhatsApp Web 通道体验补全（图片/PDF 预览、群组能力、原生投票）与设备链接故障（S1）的持续追踪上。**值得警惕的是，50 条 PR 中合并/关闭数为 0，长期积压的待审查队列（含多个人工智能安全与通道增强的大型 PR）未得到有效消化，可能成为项目迭代速度的瓶颈。** 此外，#8627（S1 设备链接阻断）已悬置 2 个半月，维护者需优先介入。

## 2. 版本发布

无。

## 3. 项目进展

今日 **0 个 PR 被合并或关闭**，代码合入处于停滞状态。不过审查队列有若干积极信号：

- **#9724** 获得维护者（@Audacity88）主动刷新：重新基于 master 变基，修复了 canonical 策略所有权、委托代理准入、Rust API 兼容性等问题，等待最终审查。[查看 PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9724)
- **#10962** 已关闭：该 Issue 请求在 gateway `/ws/chat` 流中传递工具结果 payload，关闭说明相关处理可能已有归属路径或已在其他 PR 中覆盖。[查看 Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10962)

整体而言，项目今日“推进感”较弱，但维护者已开始对大型积压 PR 进行分支刷新与规范化，这对后续合并是正向铺垫。

## 4. 社区热点

今日讨论热度主要在 WhatsApp 通道相关议题（每个 Issue 均获 1-2 条评论），且高度呼应：

- **#10977 WhatsApp Web 群组创建** — 请求实现 `create_room` 与 `invite_user`，以复用现有 `channel_room` 工具创建群组。[查看 Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10977)
- **#10981 WhatsApp 图片外发显示空卡片** — 用户反映手机端收到图片后仅见空白卡片，需点击才能查看。[查看 Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10981)
- **#8627 WhatsApp 设备链接被 passkey/SHORTCAKE 阻断（S1）** — 最受关注且严重度最高，作者为 @JordanTheJet，多条评论围绕复现与影响范围。[查看 Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/8627)

PR 侧，大型安全/架构 PR（如 **#10321** 浏览器 PKCE、**#10592** relay claim 自助注册）虽评论数未显著增加，但长时间停留在“待维护者审查”状态，社区对审查进度存在潜在焦虑。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| S1 - 工作流阻断 | [#8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) | WhatsApp Web 设备链接被官方 passkey/SHORTCAKE 门禁阻断，用户扫码后无法完成配对 | 已开放 2.5 个月，无明显修复 PR |
| S2 - 行为降级 | [#10981](https://github.com/zeroclaw-labs/zeroclaw/issues/10981) | 外发 WhatsApp 图片缺少 `jpegThumbnail` 与尺寸字段，手机端显示空白卡片 | **已有修复 PR：[#10982](https://github.com/zeroclaw-labs/zeroclaw/pull/10982)** |
| 增强型 Bug | [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) | PDF 通过 WhatsApp 发送时不带缩略图，手机端无法预览 | 已补充 `jpegThumbnail`/`pageCount` 需求，暂无直接 fix PR |
| 已关闭 | [#10962](https://github.com/zeroclaw-labs/zeroclaw/issues/10962) | gateway `/ws/chat` 流工具结果不含 payload | 已关闭，未见对应修复说明 |

其中 #10982 为当天提交的定向修复，直接解决 #10981，属于快速响应，维持了项目在 WhatsApp 通道上的迭代节奏。

## 6. 功能请求与路线图信号

今日新增/活跃的功能请求集中指向 **WhatsApp Web 通道能力补全**：

- **群组管理** — [#10977](https://github.com/zeroclaw-labs/zeroclaw/issues/10977) 请求 `create_room`/`invite_user` 支持，预计将被纳入 channel 工具链的下一步。
- **原生投票** — [#10983](https://github.com/zeroclaw-labs/zeroclaw/issues/10983) 为 `poll` 工具增加 Channel 钩子，在 WhatsApp 上以原生投票呈现（而非编号文本），此设计与当前通道抽象方向一致。
- **媒体预览增强** — [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) 要求填充 PDF 的 `jpegThumbnail` 与 `pageCount`，与 #10981 同属手机端体验优化。

结合在途 PR 观察路线图信号：WhatsApp 通道（reaction 支持 #9894、图片预览 #10982）、Telegram 多消息模式（#8561）、Gemini 语音对话通道（#10430）以及安全体系（#10321 浏览器 PKCE、#10592/#10525 ZeroRelay 注册）均有较大概率进入下一版本。

## 7. 用户反馈摘要

- **WhatsApp 通道“桌面端正常、手机端残废”**（来自 #10981、#10812）：多位用户提到 Web/桌面发送图片与 PDF 均能显示，但在手机 WhatsApp 客户端上呈现为空白卡片或普通文件。这表明通道在媒体元数据（缩略图、尺寸、页数）层面存在系统性缺失，而非单一问题。
- **设备链接故障持续影响工作流**（来自 #8627）：S1 严重度暗示用户无法完成配对，意味着 WhatsApp 通道在当前版本中近乎不可用，用户等待修复时间已超过 2 个月，耐心正在消耗。
- **开发者对 gateway 数据完整性的关注**（来自 #10962）：客户端开发者需要工具结果 payload 以完成 UI 渲染与调试，关闭该 Issue 时未见明确替代方案说明，相关需求可能仍会在其他渠道提出。

## 8. 待处理积压

以下项长期未获有效响应或推进，建议维护者优先关注：

| 类型 | 项目 | 创建时间 | 状态与风险 |
|------|------|----------|------------|
| Issue | [#8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) S1 设备链接故障 | 2026-07-02 | 距今 79 天，无修复 PR，WhatsApp 通道核心功能受阻 |
| PR | [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) 强制 Bluesky/Reddit 发送方授权 | 2026-07-27 | 463 行+ 大规模安全修复，`needs-maintainer-review` 已近 2 个月 |
| PR | [#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) Telegram 多消息流模式 | 2026-06-30 | 标记 `needs-author-action`，可能因等待作者响应而停滞 |
| PR | [#9894](https://github.com/zeroclaw-labs/zeroclaw/pull/9894) WhatsApp reaction 支持 | 2026-08-10 | 已标记 `stale-candidate`，如不尽快处理可能被自动关闭 |
| PR | [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) Gemini 语音对话 broker | 2026-08-28 | 大型功能 PR，`needs-author-action` 状态，功能价值高但推进乏力 |

> 整体健康度评估：项目社区活跃度高，Issue 响应及时（当天新增 5 条），修复类 PR 跟进迅速（#10982 当日提交）；但 **PR 审查吞吐量不足**（50 条积压、今日 0 合并），叠加 2 条大型安全 PR 长期滞留，需要维护者投入更多审查资源以避免社区贡献者流失。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报

**日期**: 2026-09-20  
**数据窗口**: 2026-09-19 ~ 2026-09-20

---

## 1. 今日速览

- 过去24小时项目活跃度极低：仅1条Issue更新，无PR活动，无新版本发布。
- 唯一的Issue更新是**CRITICAL级别**的TLS证书过期问题（#3377），该问题已持续8天未解决，项目官网（picoclaw.io）仍处宕机状态。
- 无合并/关闭的PR，开发主线暂无明显推进。
- 开源社区关注点集中于基础设施稳定性，而非新功能或新特性。
- **健康度评估**：项目当前处于低活跃状态，且存在关键基础设施故障长时间未修复，建议维护团队优先处理证书问题以恢复社区信任。

---

## 2. 版本发布

**无新版本发布**（最新 Releases 为空）。

---

## 3. 项目进展

**今日无合并或关闭的PR**，无代码变更进入主干，项目开发进度未见推进。

> 📌 说明：连续低PR活动可能表明当前处于迭代间隙或维护期，但结合未解决的CRITICAL问题，更需要警惕维护响应速度的下滑。

---

## 4. 社区热点

### 🔥 #3377 [CRITICAL] [stale] TLS certificate for picoclaw.io expired — site is down for every browser  
**链接**: https://github.com/sipeed/picoclaw/issues/3377  
**作者**: @dimonb | **创建**: 2026-09-12 | **更新**: 2026-09-19 | **评论**: 1 | 👍: 1

- **热度**：虽然点赞和评论数不多，但该Issue是目前社区唯一焦点，且影响面极大。
- **核心诉求**：项目官网无法访问，所有浏览器拒绝连接，直接阻碍新用户了解项目、获取文档和下载资源。用户期望维护者**立即更新TLS证书**恢复站点访问。
- **已标注[stale]**：仓库可能启用了自动化stale标记，但这进一步凸显了问题被长时间忽视。
- **传播影响**：该问题间接影响GitHub仓库的可信度——潜在用户可能因官网打不开而对项目维护状态产生质疑。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 CRITICAL：picoclaw.io 官网 TLS 证书过期（#3377）
- **链接**: https://github.com/sipeed/picoclaw/issues/3377
- **影响范围**: 全站不可访问，所有浏览器/客户端拒绝连接，访客完全无法打开项目首页。
- **引入时间**: 证书于 2026-09-10 23:59:59 UTC 过期，至今已超9天。
- **状态**: OPEN 未关闭，**尚未发现关联的 fix PR**。
- **风险分析**: 这是公开仓库的核心基础设施问题，持续越久，对项目品牌、新用户获取以及搜索引擎收录的损害越大。
- **建议**: 立即配置自动续期（如 Let's Encrypt），并在后续设置证书过期前自动提醒。

---

## 6. 功能请求与路线图信号

**今日无新的功能请求提交**。

- 当前唯一Issue为基础设施故障，非新功能建议。
- 无新增PR暗示下一版本的功能方向。结合历史上下文，暂无法判断后续版本的功能优先级。
- 建议维护者在修复证书后，发布一个公开的 roadmap 或活跃度声明，以缓解社区对项目维护状态的疑虑。

---

## 7. 用户反馈摘要

- 来自 @dimonb 的反馈（翻译自 #3377 摘要）：
  > “项目主页的TLS证书已于2026-09-10过期，所有浏览器和TLS客户端均拒绝连接，网站对所有人完全不可访问。这个问题具有时间敏感性，越久影响越大。”

- 用户情绪：**急切且担忧**。反馈明确提出了时间敏感性，反映了对项目维护团队响应速度的不满。
- 潜在痛点：访问官网是获取项目信息的第一入口，证书过期导致用户无法了解PicoClaw的功能、文档和下载方式，直接降低了开源项目的可发现性和可用性。

---

## 8. 待处理积压

### ⚠️ 长期未响应的关键 Issue

| 编号 | 标题 | 创建时间 | 持续时间 | 状态 | 严重度 |
|------|------|----------|----------|------|--------|
| [#3377](https://github.com/sipeed/picoclaw/issues/3377) | TLS certificate for picoclaw.io expired on 2026-09-10 — site is down for every browser | 2026-09-12 | 8天 | OPEN + [stale] | 🔴 CRITICAL |

- **提醒维护者**：该问题已从“新建”转为“stale”状态，意味着如果再过一段时间无人处理，可能会被自动化关闭。但问题本身并未解决——**网站仍然宕机**。强烈建议：
  1. 立即恢复 picoclaw.io 的 HTTPS 访问；
  2. 在Issue中公开说明原因和修复时间表；
  3. 为仓库配置证书到期自动化告警（如 GitHub Actions + cron）；
  4. 检查是否还有其他基础设施依赖（如 CDN、DNS 等）存在类似风险。

---

*本日报由 AI 自动生成，基于指定数据源，仅供项目健康度参考。*
*生成时间: 2026-09-20*

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-20

## 1. 今日速览

过去 24 小时 NanoClaw 项目整体活跃度中等偏高：共新增/更新 3 条 Issues（全部为打开状态），提交 4 条 PR（全部待合并），无新版本发布。值得关注的是，PR 池中既有存活超过三周的大型安全修复（#3680）和工作流修复（#3646），也有两个昨日新提交的功能性 PR（#3856、#3857），表明社区贡献仍在持续导入。Issues 侧 3 条问题均集中于 CLI 行为与文档一致性，尚无严重崩溃或数据丢失类报告，项目整体健康度良好，但需留意 PR 长期积压的合并效率问题。

## 2. 版本发布

过去 24 小时内无新版本发布或预发布。

---

## 3. 项目进展

今日无 PR 被合并或关闭，但 4 条待合并 PR 各有明确推进方向：

- **#3680** fix(mount-security): close allowlisted-extra mount bypass in validateSpec — 自 8 月 30 日起已存在 21 天，修复容器挂载校验绕过漏洞（安全类）
  链接: https://github.com/nanocoai/nanoclaw/pull/3680

- **#3646** fix(sweep): make the idle timeout configurable and apply it to both kill paths — 自 8 月 29 日起已存在 22 天，修复本地模型因 30 分钟硬编码超时被误杀的问题
  链接: https://github.com/nanocoai/nanoclaw/pull/3646

- **#3856** feat(cli): add `ncl health` — local, read-only operational health check — 新增零依赖健康检查命令，即使主进程宕机也可直接读取本地状态，对应 issue #2504
  链接: https://github.com/nanocoai/nanoclaw/pull/3856

- **#3857** feat(providers): add pi agent provider (/add-pi skill) — 新增 Pi Coding Agent 作为可安装 provider，以进程内 SDK 方式运行
  链接: https://github.com/nanocoai/nanoclaw/pull/3857

若上述 4 条 PR 在未来数日合并，项目将在**容器安全性**、**本地推理稳定性**、**运维可观测性**和**provider 生态扩展**四个维度同时获得提升。

---

## 4. 社区热点

今日没有评论数大于 0 的 Issue 或 PR，社区讨论热度整体偏低。但以下 PR 因跨领域标签多、等待周期长，值得重点关注：

- **#3680**（挂载安全修复） 与 **#3646**（空闲超时可配置化） 均已在等待队列中超过三周，属于社区高关注度的"长跑 PR"，PR 本身带有 security/core/containers 等多重标签，通常意味着较大的审查工作量。
  链接: https://github.com/nanocoai/nanoclaw/pull/3680 / https://github.com/nanocoai/nanoclaw/pull/3646

- **#3856**（ncl health） 直接响应 issue #2504 的明确诉求，属于用户呼声较高的操作性改进。
  链接: https://github.com/nanocoai/nanoclaw/pull/3856

社区需求背后的共性诉求是：**希望 NanoClaw 在真实生产环境中更可运维、可调试、可安全部署**，而非仅停留在功能堆叠层面。

---

## 5. Bug 与稳定性

今日报告 3 条 Bug/文档类 Issues，均无评论、无 assignee，尚未有对应的 fix PR。按严重程度排列：

**中等（CLI 数据完整性与用户误导）**
- **#3855** [kind/bug] `groups config update --model` 接受任意字符串且无校验，用户无法获知合法值。该问题会导致配置错误后用户无法通过 CLI 发现正确用法，增加排障成本。
  链接: https://github.com/nanocoai/nanoclaw/issues/3855

**中等（数据静默丢失）**
- **#3854** [kind/bug] 编辑 `groups/<folder>/CLAUDE.md` 生成文件后，其在 spawn 时被静默丢弃且无任何警告。虽然该文件首行已声明"do not edit"，但用户操作后无反馈属体验缺陷，建议在检测到用户修改时给出显式警告或提示迁移路径。
  链接: https://github.com/nanocoai/nanoclaw/issues/3854

**低（文档完整性）**
- **#3853** [kind/documentation] `CLAUDE.md` 中的 `ncl` 命令表缺失三个命令：policies、messaging-groups send、sessions history，落后于实际 `ncl help` 输出。
  链接: https://github.com/nanocoai/nanoclaw/issues/3853

整体而言，今日无崩溃、无回归、无安全漏洞类的紧急 Bug，但两个 CLI 相关问题（#3855、#3854）可能影响日常 Agent 配置体验，建议维护者优先给出响应。

---

## 6. 功能请求与路线图信号

从今日 PR 与 Issue 信号来看，未来版本可能的增强方向包括：

- **health 自检能力增强** — PR #3856 将添加独立的本地只读健康检查命令，预期纳入近期版本，以提升运维体验。
  链接: https://github.com/nanocoai/nanoclaw/pull/3856

- **provider 生态扩展** — PR #3857 添加 pi agent provider，继 opencode 之后进一步扩充外部 provider 接入种类，呼应 issue #80 与 #1163 的长期扩展诉求。
  链接: https://github.com/nanocoai/nanoclaw/pull/3857

- **CLI 输入校验与自描述能力** — Issue #3855 暴露了模型名无校验的问题。该 Issue 可能推动后续在 CLI 层增加枚举/自动补全/校验机制。
  链接: https://github.com/nanocoai/nanoclaw/issues/3855

- **生成文件防误改机制** — Issue #3854 可能带来生成文件保护策略的改进（如使用只读属性、.gitignore 提示、或提供用户自定义记忆的替代通道）。
  链接: https://github.com/nanocoai/nanoclaw/issues/3854

---

## 7. 用户反馈摘要

- **CLI 校验缺失（#3855）**：用户 @bmultini 在 Linux 上运行 `groups config update --id <group-id> --model modelo-que-nao-existe` 时，命令静默接受非法值且退出码为 0，表明用户期望 CLI 能对模型名等关键配置项进行即时校验并及时报错。
  链接: https://github.com/nanocoai/nanoclaw/issues/3855

- **生成文件被静默覆盖（#3854）**：用户 @bmultini 在同一版本上发现，修改 `groups/<folder>/CLAUDE.md` 后该文件被静默丢弃且 `groups restart` 未给出任何提示。用户痛点在于**生成文件与用户自定义内容边界不清晰**，需要系统提供更明确的反馈或迁移路径。
  链接: https://github.com/nanocoai/nanoclaw/issues/3854

- **文档滞后（#3853）**：用户 @javexed 指出 `CLAUDE.md` 的管理命令表缺少三个实际可用的命令，说明文档维护频率低于 CLI 演进速度，可能会对开发者和 Agent 自身的文档依赖造成误导。
  链接: https://github.com/nanocoai/nanoclaw/issues/3853

---

## 8. 待处理积压

以下 PR 已在队列中积压超过三周，未获合并也未关闭，建议维护者优先关注：

- **#3680** fix(mount-security): close allowlisted-extra mount bypass in validateSpec — 已开放 21 天，安全相关，涉及容器挂载绕过，建议安排安全审查排期
  链接: https://github.com/nanocoai/nanoclaw/pull/3680

- **#3646** fix(sweep): make the idle timeout configurable and apply it to both kill paths — 已开放 22 天，直接影响本地模型用户的稳定使用体验，核心修复价值高，且与 #3855 同属"本地使用体验"优化主题
  链接: https://github.com/nanocoai/nanoclaw/pull/3646

两条 PR 均标注 `follows-guidelines`，来自核心贡献者，长时间滞留可能影响贡献者积极性，也间接导致今日新提交的 #3857 与 #3856 进入更长的等待队列。建议在下一个维护窗口优先处理这两条长周期 PR 的 review 与合并。

---

*本日报由 AI 助手基于 GitHub 公开数据自动生成，仅供项目健康度参考。*

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报 · 2026-09-20

> 数据来源：GitHub 仓库 [nearai/ironclaw](https://github.com/nearai/ironclaw) | 统计窗口：2026-09-19 至 2026-09-20（过去 24 小时）

## 1. 今日速览

- 今日 **无 Issue 活动**（新开/活跃 0 条，关闭 0 条），**无新版本 Release**，社区公开讨论层面处于低活跃状态。
- 唯一可追踪的动态是 **PR #7499** 今日有活跃更新，但仍处于 **Open / 待合并** 状态，未进入主干。
- 该 PR 由 **外部新贡献者** @discernible-io 提交，关注 **host-mediated 身份认证能力**，技术方向具有前瞻性，但落地程度尚浅。
- 整体判断：项目今日处于 **"开发推进 + 等待评审" 的窄通道状态**——技术信号存在，但社区交互和版本交付节奏偏慢。
- 健康度评估：**中等偏低**，但无 Bug 或回归飙升信号，风险可控。

## 2. 版本发布

今日无新版本 Release，亦无版本候选或预发布公告。最近一次版本发布记录依然为空，说明项目可能处于 **功能开发与集成阶段**，尚未形成稳定的发布节律。

## 3. 项目进展

今日 **没有 PR 被合并或关闭**，主干代码未产生实际变更，项目没有朝向主干的功能交付。

唯一值得关注的进展是 **PR #7499** 从 2026-08-11 创建以来，于今日（2026-09-19 更新）仍保持活跃并等待评审。该 PR 关注以下能力：

- 新增 **主机寄生层（host seam）**——内置 `builtin.idcp` 与策略授权/AskAlways 豁免机制，使 **无进程（processless）IronClaw agents** 可直接调用 IdentyClaw Passport，无需 shell 或可安装扩展。
- 附带 **practitioner 主机工具包**，位于 `deploy/identyclaw/` 下，包含 Node CLI 与可选的 loopback helper（`:3921`）。

如果该 PR 获准合并，IronClaw 将具备 **在受限运行环境下进行身份认证与授权注入** 的能力，对安全敏感场景（如企业内网、无 shell 容器）具有明显价值。但目前该 PR 仍处于待评审状态，只能视为项目进展的 **前瞻信号**，而非已落地的功能增量。

👉 [PR #7499 详情](https://github.com/nearai/ironclaw/pull/7499)

## 4. 社区热点

今日 **没有 Issue 被创建或评论**，PR 的评论数与点赞数也均为 0，因此不存在传统意义上的高热度讨论话题。

唯一可视为技术讨论焦点的是 **PR #7499**——它指向一类"身份感知的代理"问题：AI 代理在无 shell、无扩展环境下如何安全地完成身份认证。这虽然不是高互动话题，但在技术上触及了 **代理身份边界** 这一核心痛点，值得跟踪。

👉 [PR #7499](https://github.com/nearai/ironclaw/pull/7499)

## 5. Bug 与稳定性

- **新增 Bug 报告：无。** 今日未出现新 Issue、崩溃报告或回归问题。
- **稳定性提示：** PR #7499 的风险标签为 **low**，且改动范围集中在 docs 与 dependencies，对主运行时代码影响有限，合并意愿较高。
- 需要注意：该 PR 已开放约 40 天，长期未合并存在与主干 **产生冲突或过期** 的常规性风险，建议维护者评估是否安排进入合并队列。

## 6. 功能请求与路线图信号

今日没有用户提交新的 Feature Request，但 PR #7499 作为外部贡献者主动提出的集成方案，本身释放了清晰的路线图信号：

- **身份服务集成**：IdentyClaw Passport 通过 host-mediated 方式接入，说明项目方或外部生态已开始关注"代理设备的身份认证与授权策略"这一方向。
- **无进程模式增强**：为无 shell、无扩展场景提供可用路径，意味着未来 IronClaw 可能进一步支持 **轻量化、嵌入式部署**。
- **部署工具链丰富**：`deploy/identyclaw/` 目录结构 + Node CLI + loopback helper 的组合，暗示该项目有意建立一个 **针对特定 practitioner 场景的工具包**，具备纳入下一版本正式文档与发布产物的可能性。

上述方向能否进入下一版本，取决于 PR #7499 的 review 进度及其设计是否被维护团队接受。

## 7. 用户反馈摘要

由于今日无 Issue 评论，缺乏直接的用户反馈数据。但从 PR #7499 的摘要与描述中，可提炼出以下 **间接使用场景诉求**：

- 有用户（或外部团队）需要在 **无 shell、无安装扩展权限的环境** 下运行 IronClaw 代理，并完成身份认证——这是目前框架可能未覆盖的场景。
- 该 PR 的命名与结构（"Passport for practitioners"）表明，目标用户可能是 **行业从业者/顾问型用户**，他们希望以更低门槛的方式部署代理身份系统，而不是依赖完整的本地安装链。
- 没有明显的负面反馈或吐槽内容，但这可能只是因为 **issue 反馈管道目前较空**，而非用户完全满意。

## 8. 待处理积压

### 🔴 PR #7499 —— 长期开放，外部新贡献者

- 创建于 **2026-08-11**，已开放约 **40 天**，至今未合并、未明确关闭。
- 状态：Open，待合并（TODO）
- 规模：XL | 风险：low | 涉及：docs + dependencies
- 作者身份：**外部新贡献者**，这类贡献长期得不到回应，容易导致外部参与意愿下降。
- 建议：维护者应优先安排 reviewer 进行反馈，明确是推进、请求调整还是关闭，避免"僵尸 PR" 沉淀。

👉 [PR #7499](https://github.com/nearai/ironclaw/pull/7499)

### 全局堆积观察

当前仓库 **长期无未关闭 Issue**，表面看是清空，但也可能意味着：

- 用户问题未能有效进入 GitHub 渠道（可能在 Discord、论坛或其他平台）；
- 新需求与 Bug 修复路径依赖 PR 而非 Issue，反馈链路不够透明。

建议维护者关注 Issue 入口的引导，保持社区反馈通道畅通。

---

**日报总结信号：**

| 维度 | 状态 |
|---|---|
| Issue 活跃度 | ⬇️ 极低（0 条） |
| PR 合并进度 | ⬇️ 无合并 |
| 技术探索方向 | ⬆️ 身份认证 host-mediated |
| 版本交付 | ⬇️ 无 |
| 外部贡献参与 | 🟡 有新贡献者，但等待评审中 |

总体来看，IronClaw 目前处于 **"开发探索期"与"评审瓶颈期"并存** 的阶段——有价值的技术方向正在流动，但交付节奏和社区互动都需要更多关注。下一步的关键指标是：**PR #7499 的 review 结果** 以及 **Issues 通道的重新活跃**。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-20

> 数据来源：github.com/netease-youdao/LobsterAI | 统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时内 LobsterAI 项目共更新 2 条 Issue（1 条已关闭、1 条维持开放）和 6 条 PR（全部已合并/关闭），无新版本发布。6 条 PR 全部完成合并，覆盖 SQLite 存储层缺陷修复、Windows 构建兼容、定时任务迁移可靠性等核心问题，修复密度较高，项目维护节奏健康。值得关注的是：#1071 所报告的三个 SQLite 存储层严重缺陷已由 PR #1072 完整修复并关闭，标志着数据持久化可靠性取得实质性改进。当前无待合并 PR，说明主分支保持收敛状态。

---

## 3. 项目进展

今日合并/关闭的 6 个 PR 均已完成，从代码质量、功能扩展、跨平台兼容性和数据安全四个维度推进了项目：

| PR | 类型 | 关键变化 |
|---|---|---|
| [#1069](https://github.com/netease-youdao/LobsterAI/pull/1069) | 重构 | 将 2100+ 行的 `CoworkSessionDetail.tsx` 按类型、工具函数、Hook、子组件拆分，提升可维护性并减少流式输出时的多余重渲染 |
| [#1070](https://github.com/netease-youdao/LobsterAI/pull/1070) | 功能 | 新增 per-session MCP 开关控制：会话级独立启用/禁用 MCP server，状态持久化到 DB，并在 McpBridgeServer 层实现请求拦截 |
| [#1072](https://github.com/netease-youdao/LobsterAI/pull/1072) | 修复 | 修复 SQLite 存储层三项缺陷：启用 `PRAGMA foreign_keys`、防御性显式删除子行、save() 改为原子写入、storeInitPromise 超时恢复机制 |
| [#1075](https://github.com/netease-youdao/LobsterAI/pull/1075) | 修复 | Windows 下安装 WSL 时构建失败问题：强制使用 Git Bash (MSYS2) 而非 WSL bash |
| [#1076](https://github.com/netease-youdao/LobsterAI/pull/1076) | 修复 | 定时任务迁移失败仍标记完成导致数据永久丢失的问题（加入写入错误计数，失败时不再置完成标记） |
| [#1077](https://github.com/netease-youdao/LobsterAI/pull/1077) | 修复 | 删除当前 agent 后左侧任务列表不刷新、仍显示已删除 agent 任务的问题 |

整体来看，今日合入的 PR 有效消除了三条数据可靠性隐患（SQLite 级联失效、迁移误标完成、存储层非原子写），并补齐了会话级 MCP 控制这一实用功能，项目在稳定性与可配置性上均有明显进步。

---

## 4. 社区热点

今日评论最多的条目是 **[Issue #1071](https://github.com/netease-youdao/LobsterAI/issues/1071)**（2 条评论），由 @MaoQianTu 提交，详细审计了 SQLite 存储层三个相互关联的数据完整性缺陷：

1. `ON DELETE CASCADE` 完全失效，导致孤儿消息无限累积；
2. `save()` 非原子写入，崩溃时可能损坏数据库；
3. `storeInitPromise` 超时后永久故障，无自动恢复。

该 Issue 获得开发者的快速响应，同日 [#1072](https://github.com/netease-youdao/LobsterAI/pull/1072) 即提交并完成修复，形成完整的「问题报告 → 修复 → 验证关闭」闭环。这类深度技术审计类 Issue 反映了社区中有用户在对生产环境稳定性进行系统性的代码审查，诉求集中在数据安全与故障自愈能力上。

---

## 5. Bug 与稳定性

按严重程度排列今日涉及的 Bug 及修复状态：

| 严重度 | 问题 | 状态 | 修复 PR |
|---|---|---|---|
| 🔴 严重 | SQLite 存储层三个缺陷：外键约束失效 → 孤儿消息累积；save() 非原子写 → 崩溃损坏；storeInitPromise 超时后永久故障 | 已修复/已关闭 | [#1072](https://github.com/netease-youdao/LobsterAI/pull/1072) |
| 🔴 严重 | 定时任务 Run History 迁移时 JSONL 写入失败（磁盘满/无权限）仍标记完成，导致数据永久丢失 | 已修复/已合并 | [#1076](https://github.com/netease-youdao/LobsterAI/pull/1076) |
| 🟡 中等 | Windows 安装 WSL 后构建失败：脚本被 WSL bash 执行，路径解析错误 | 已修复/已合并 | [#1075](https://github.com/netease-youdao/LobsterAI/pull/1075) |
| 🟢 轻微 | 删除当前 agent 后，任务列表仍显示已删除 agent 的数据，需手动刷新 | 已修复/已合并 | [#1077](https://github.com/netease-youdao/LobsterAI/pull/1077) |

所有已知 Bug 均在今日内完成修复，无遗留未处理问题；其中两项为数据丢失级的严重缺陷，已通过 PR 彻底解决。

---

## 6. 功能请求与路线图信号

**[Issue #1014](https://github.com/netease-youdao/LobsterAI/issues/1014) — Add a description to improve Dispatch discoverability**（3 月 29 日创建，仍开放）：来自 @VisionAIrySE，建议为 LobsterAI 的 Claude Code skill（`technology-search`）添加描述，以提升在 Dispatch 平台上的可发现性。该请求属于轻量的元数据/生态整合需求，实现成本低，可考虑在下个版本周期内快速合入。

**[PR #1070](https://github.com/netease-youdao/LobsterAI/pull/1070) — per-session MCP 开关控制**（今日合并）：该功能将 MCP server 配置从全局级细化为会话级，每个会话可独立启用/禁用特定 MCP server。这属于 Agent 配置灵活性的关键增强，可能吸引更多需要多场景隔离的用户，有望随下一版本发布。

路线图信号：Issue #1071 的深入审计表明社区对数据持久化可靠性有较高要求；PR #1070 则指向多会话/多 Agent 场景下精细化配置的方向。两者结合，未来版本可能持续在「存储可靠性」与「会话级可配置性」两个维度深化。

---

## 7. 用户反馈摘要

今日评论数据有限（#1071 有 2 条、#1014 有 1 条），结合 Issue 内容提炼用户反馈：

- **生产环境稳定性关注度高**（来自 #1071）：用户 @MaoQianTu 以「生产环境下可造成数据丢失或功能永久故障」来描述 SQLite 存储层缺陷，说明存在真实的生产使用场景，且对数据可靠性敏感。问题报告中逐文件、逐行给出了定位，显示出用户具备深度技术能力，愿意为项目贡献高质量审计。
- **跨平台开发需求明确**（来自 #1075）：Windows + WSL 并存的环境是部分开发者日常配置，构建失败直接阻断开发流程，该修复解决了真实痛点。
- **生态集成意愿**（来自 #1014）：用户 @VisionAIrySE 主动帮助项目在第三方平台（Dispatch）提升曝光度，表明外部开发者正在自发地帮助项目拓展生态影响力，是项目健康度的积极信号。

---

## 8. 待处理积压

**[Issue #1014](https://github.com/netease-youdao/LobsterAI/issues/1014) — Add a description to improve Dispatch discoverability**（创建于 2026-03-29，已开放近 6 个月）
- 当前有 1 条评论，无明确响应/标记
- 这是一个低成本高收益的改进：只需为 `technology-search` skill 补充描述，即可在 Dispatch 平台上获得更好的曝光
- 建议维护者尽快处理，以免打击外部贡献者的生态建设热情

除上述 Issue 外，#1071 已随 PR #1072 关闭，当前无其他长期未处理的 Issue/PR 积压。全部 6 条 PR 均在当日完成合并，项目整体积压状况良好。

---

**项目健康度评级**：🟢 优秀 — 今日 Bug 修复率高（4/4 严重问题全部解决）、PR 合入节奏稳定、社区贡献者活跃（5 位不同作者提交 PR）、无新增积压。需关注点：Issue #1014 长期搁置，建议安排在下个迭代周期内处理。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

## Moltis 项目日报 — 2026-09-20

### 1. 今日速览

过去24小时项目活跃度处于**中等偏上**水平：共 4 条 Issue 更新（新开 3 条，关闭 1 条），1 个功能型 PR 提交待合并，无新版本发布。社区讨论最集中的主题是 **heartbeat 的 active_hours 配置被文档化但从未被代码执行**——出现了用户报告、源码级确认和重复 Issue 的完整链路，且今日关闭的 #1278 大概率被识别为 #1205 的重复项。PR #1276 是内容充实的功能增强（Groq provider + 工具 schema 约束 + mutation 结果解析），体现了贡献者的深度参与。

---

### 2. 版本发布

今日无新版本发布。

---

### 3. 项目进展

今日**无 PR 被合并**，唯一的实质推进是 #1276 进入待合并状态，这也是当前最值得关注的代码成果：

- **#1276 [OPEN] Groq as a first-class provider, strict zero-parameter tool schemas, and mutation results that parse**  
  https://github.com/moltis-org/moltis/pull/1276  
  该 PR 一次性带来三项改进：
  1. **Groq 成为一等公民的 OpenAI 兼容 provider**——此前 Groq 会落到 genai 回退路径（单模型、无工具、openai/* 路由到 OpenAI），改动后所有已配置的 Groq 模型支持工具调用和模型发现；
  2. **Groq Compound 明确标记为不支持工具**；
  3. **强制零参数工具 schema** 与 **可解析的 mutation 结果**，有望改善工具间兼容性和调用结果的可编程性。

  若该 PR 通过 review，将显著扩展 Moltis 的 provider 生态，同时收紧工具接口约束。

此外，#1278 被关闭，虽然不代表新代码合并，但说明维护者已确认 `active_hours` 相关问题，并倾向于将其收敛到已有的 #1205 中进行统一追踪。

---

### 4. 社区热点

今日热度集中在 **heartbeat active_hours 配置失效** 这一跨 Issue 话题上：

- **#1278 [CLOSED] heartbeat.active_hours is documented as enforced but never evaluated**  
  https://github.com/moltis-org/moltis/issues/1278  
  创建当天即关闭，但贡献者 @jbutler1980 用 `grep` 实证了 `is_within_active_hours` 除测试模块外无任何调用者。该 Issue 的价值在于**源码级坐实了 bug 存在**，并引出了后续的 #1279。

- **#1205 [OPEN] [Bug]: Heartbeat ignores configured active hours and runs continuously**  
  https://github.com/moltis-org/moltis/issues/1205  
  8 月中旬的既有 bug 报告，9/19 仍有新动态。两个 Issue 互相佐证，说明**文档与实现不一致**对用户造成了实际困扰，是长时间未解决的痛点。

- **#1276 [OPEN] PR**（见上文）也是社区关注点，其覆盖范围较大，隐含了贡献者对 provider 扩展和工具 schema 规范化的诉求。

---

### 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 有无 Fix PR |
|--------|-------|------|-------------|
| 🔴 高 | #1277 | `spawn_agent` 将 `active_tools: []` 当作空白名单，子 agent 获得 **0 个工具**，属于功能性错误 | 无 |
| 🔴 高 | #1205 | heartbeat 忽略 `active_hours` 配置持续运行，造成不必要的资源消耗，已持续超一个月 | 无（#1278 被关闭，未合并为修复） |
| 🟡 中 | #1278 | 文档声明 `active_hours` 会约束 heartbeat 运行窗口，但代码从未评估该值（已关闭，可能作为 #1205 的重复项合并追踪） | 无 |
| 🟢 低 | #1279 | heartbeat 注册时硬编码 `Default::default()`，用户无法通过配置设置 `tool_controls`（功能缺失，非崩溃类） | 无（PR #1276 部分相关，但非专门修复） |

- #1277: https://github.com/moltis-org/moltis/issues/1277
- #1205: https://github.com/moltis-org/moltis/issues/1205
- #1278: https://github.com/moltis-org/moltis/issues/1278
- #1279: https://github.com/moltis-org/moltis/issues/1279

目前**没有**针对上述 bug 的 Fix PR 处于待合并状态，项目稳定性仍有改进空间。

---

### 6. 功能请求与路线图信号

- **Groq 成为一等公民 provider** —— 已在 PR #1276 中完整实现，等待合并。这是明确的下一版本候选功能，将帮助 Groq 用户获得工具调用能力。  
  https://github.com/moltis-org/moltis/pull/1276

- **heartbeat 支持自定义 tool_controls** —— #1279 指出 cron 执行路径已支持 `tool_controls`，但注册逻辑硬编码了默认值，导致该能力无法使用。这是一个低成本、高收益的配置增强点，预计在修复 heartbeat 系列问题时一并纳入。  
  https://github.com/moltis-org/moltis/issues/1279

- **零参数工具 schema 规范化** —— PR #1276 强制要求工具 schema 零参数，这暗示项目可能在向更严格的工具接口标准演进，未来新接入的 provider 都需要遵守该约束。

---

### 7. 用户反馈摘要

- **#1278 作者 @jbutler1980**：用户没有停留在现象描述，而是通过 `grep` 直接定位到 `is_within_active_hours` 没有调用者，并在 `main` 分支和 `20260414.02` tag 双重验证。说明该用户是**深度开发者**，具备源码级调试能力，且对 heartbeat 文档与实现的一致性有较高要求。
- **#1205 作者 @IlyaBizaev**：在 Preflight Checklist 中确认已使用最新版 Moltis，表明 **heartbeat 问题在最新版本中依然存在**，用户对项目迭代速度可能有不满。
- **PR #1276 作者 @Kaboka22**：主动实现了一个跨 provider、工具 schema、结果解析的大型 PR，说明社区有**愿意贡献完整功能实现的开发者**，同时其“强制零参数 schema”的设计取向也暗示了对工具调用规范化的期待。

---

### 8. 待处理积压

- **#1205（8月16日创建，已超 35 天）** —— heartbeat 忽略 `active_hours` 持续运行的 bug 仍未修复，且已有重复报告 #1278。这是当前**最需要优先处理的历史遗留问题**。  
  https://github.com/moltis-org/moltis/issues/1205

- **#1277、#1279（9月19日新开）** —— 两个新 Issue 均无评论、无维护者回复，处于等待 triage 的状态，需要尽快确认优先级。  
  https://github.com/moltis-org/moltis/issues/1277  
  https://github.com/moltis-org/moltis/issues/1279

- **PR #1276（9月19日提交）** —— 功能完整、范围明确的 PR 正在等待 review。若长时间无人响应，可能挫伤贡献者的积极性。  
  https://github.com/moltis-org/moltis/pull/1276

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-20

> 数据来源：GitHub（agentscope-ai/CoPaw 仓库，实际 Issue/PR 记录于 QwenPaw 路径下） | 统计窗口：2026-09-19 至 2026-09-20（过去 24 小时）

---

## 1. 今日速览

过去 24 小时项目活跃度处于**高位**：新增/更新 Issue 10 条、新增 PR 7 条，且全部处于开放待处理状态，说明社区反馈与开发者响应均很密集。今日无新版本发布，也**没有 PR 被合并或关闭**，7 个待合并 PR 的 review 与合入将成为维护者的关键瓶颈。Bug 修复方向上呈现清晰的聚类——**音频内容部分（input_audio）被模型拒绝**（#7876、#7886、#7887）与 **OpenAI 风格文件 payload 兼容性**（#7883、#7885）是当前最高优先级的稳定性短板；前端方面，Console 错误恢复机制（#7888、#7889）与懒加载 chunk 崩溃（#7815）同样需要重视。功能侧则有两项重量级 PR：PawApp 控制面重构（#7874）与插件策略钩子（#7880），后者恰好回应了今日用户的新功能请求（#7878），社区需求与项目方向高度吻合。

---

## 2. 版本发布

过去 24 小时无新版本 Release。

---

## 3. 项目进展

今日**没有 PR 被合并或关闭**，所有 7 个 PR 均停留在待 review 阶段。尽管如此，这批 PR 反映了项目正在推进的三个明确方向：

- **Agent 模态兼容性修复**（针对今日多个 Bug 的对应修复）：
  - [fix(agents): retry after unsupported file payload errors (#7885)](https://github.com/agentscope-ai/QwenPaw/pull/7885) — 针对 DeepSeek 拒绝 OpenAI 风格文件 part 的问题（关联 #7883），将“显式媒体拒绝”识别为请求级回退信号，避免将模型错误地缓存为全局 text-only。
  - [fix(agents): handle unknown input_audio rejections (#7886)](https://github.com/agentscope-ai/QwenPaw/pull/7886) 与 [fix(agents): handle unknown audio part rejections (#7887)](https://github.com/agentscope-ai/QwenPaw/pull/7887) — 两个 PR 解决同一类问题（#7876：DeepSeek 拒绝 `input_audio` 后会话永久卡死），但实现路径不同，需要维护者协调避免重复合入。
- **Console 前端稳定性**：
  - [fix(console): recover from transient DOM-mutation render errors (#7889)](https://github.com/agentscope-ai/QwenPaw/pull/7889) — 修复 #7888 中 Chat 页面卡在 “Something went wrong” 的问题，核心是让 `ChunkErrorBoundary` 在 `resetKey` 不变时也能重置错误状态。
- **PawApp 架构升级**：
  - [feat(pawapp): redesign the SDK and app control plane (#7874)](https://github.com/agentscope-ai/QwenPaw/pull/7874) — 为 PawApp 引入完整的 Host 控制面：公共/私有 action 边界、持久化任务所有权、幂等分发与恢复、配置读取等，属于功能性的基础架构迈进。
  - [docs(pawapp): specify Creator create-video control plane (#7875)](https://github.com/agentscope-ai/QwenPaw/pull/7875) — 为 `create-video` 行为补充控制面规范文档。

整体来看，项目在** Agent 媒体消息链路**与**前端错误恢复**上的修复已形成批量 PR，待合并后项目稳定性将有明显提升。

---

## 4. 社区热点

**#7815 — Console 懒加载 chunk 失败后无法恢复**（评论 5 条，持续多日未关闭）
[#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)
> “Console does not recover from a failed lazy page chunk load; every navigation stays on the error screen until a full reload”

这是今日讨论最激烈、影响面最大的问题：一次懒加载失败会导致整个 Console 所有页面导航被困在错误页，直到手动刷新。该 Issue 创建于 9 月 16 日，至今日已持续 4 天仍有新评论，且**暂无对应 fix PR**，用户耐心可能正在消耗。评论主要围绕错误边界（error boundary）的重置机制缺陷展开，与今日 #7888 的根因有共通之处——都指向 `ChunkErrorBoundary` 在 `resetKey` 不变时永远无法恢复。

**#7878 — 插件可见的 pre-tool-call 策略钩子**（评论 3 条，功能请求）
[#7878](https://github.com/agentscope-ai/QwenPaw/issues/7878)
> “Expose a plugin-visible pre-tool-call policy hook (decision oracle in the governance pipeline)”

该请求希望在外层静态治理评估之后，向插件暴露一个 pre-tool-call 策略钩子，使外部分类器和组织级安全检查无需 monkey-patch 宿主即可参与决策。**社区提出的同一天就有社区开发者提交了对应实现 PR #7880**，且标注为 first-time-contributor，体现了外部贡献者的积极性，也说明该需求的实现路径相对清晰。

此外，#7884（中文用户对聊天记录历史过短的强烈不满）虽然评论只有 1 条，但语气激烈，是今日情绪浓度最高的用户反馈，值得产品团队关注（详见第 7 节）。

---

## 5. Bug 与稳定性

今日报告的 Bug 中有多个**“一次操作永久性破坏会话”级别的严重问题**，按严重程度排列如下：

### P0 — 会话/页面级不可恢复

| Issue | 问题 | 严重性 | 关联修复 PR |
|---|---|---|---|
| [#7876](https://github.com/agentscope-ai/QwenPaw/issues/7876) | DeepSeek 拒绝 `input_audio` 内容部分（422 unknown variant），audio-fallback 分类器从未触发，一次 `send_file_to_user` wav 后会话**永久不可用** | 会话级损坏 | #7886 / #7887（待合并） |
| [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888) | Chat 页面卡在 “Something went wrong”，React commitPlacement 阶段 `insertBefore` NotFoundError，浏览器 UI 层注入 `<font>` 包装 React 文本节点 | 页面级不可用 | #7889（待合并） |
| [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) | 懒加载 chunk 失败后 Console 无法从错误页恢复，所有导航持续停留在错误屏 | 全局 UI 不可用 | **暂无 fix PR** |

### P1 — 功能异常/数据错误

| Issue | 问题 | 关联修复 PR |
|---|---|---|
| [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883) | 2.2.1 上仍复现：tool 返回的 PDF 被序列化为 OpenAI 风格嵌套 file part，DeepSeek 拒绝（400 “file must have a file_id or file_data”）。此前 #7597 声称在 #7621 修复但实际未生效，属**回归/修复不完整** | #7885（待合并） |
| [#7881](https://github.com/agentscope-ai/QwenPaw/issues/7881) | kimi-code ACP runner 的边界与破坏性命令检查**覆盖不均**：Edit 被拦截，但 Write（新文件）和 Bash 完全绕过 | 暂无 |
| [#7877](https://github.com/agentscope-ai/QwenPaw/issues/7877) | 会话级工作目录面板 UI 缺陷：目录可视区仅约 3 行、“最近项目”恒为空且无写入入口、选目录后“应用”按钮仍禁用 | 暂无 |

### P2 — 配置/供应商兼容性

| Issue | 问题 |
|---|---|
| [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882) | OpenCode 供应商“免费”模型实际 API 调用返回 403 FreeTierError（仅限 OpenCode 客户端），UI 仍标记为免费，**存在误导** |
| [#7879](https://github.com/agentscope-ai/QwenPaw/issues/7879) | MCP 配置中“授权”触发 OAuth 握手失败（缺 `client_id`/`resource`），导致静态 Bearer Key 类型 MCP server（如企查查 QCC）无法接入 |

---

## 6. 功能请求与路线图信号

- **Pre-tool-call 策略钩子（#7878）** —— 用户明确请求在治理流水线中提供插件可参与的安全决策点。**已有社区 PR #7880 实现**（[feat(plugins): add escalation-only tool policy hooks](https://github.com/agentscope-ai/QwenPaw/pull/7880)），若合入将增强 QwenPaw 作为企业级 Agent 平台的可扩展治理能力，进入下一版本的概率很高。
- **PawApp 控制面重构（#7874 + #7875）** —— SDK 控制面重新设计 + Creator create-video 规范文档，两者配套提交，表明项目正在系统性地强化应用层抽象。虽然未直接回应某个具体 Issue，但这是明确的路线图信号：**PawApp 将拥有完整的 Host 控制平面**，为复杂的域工作流提供基础设施。
- **聊天记录持久性（#7884）** —— 用户对会话历史长度极度不满，追问“咱聊天记录多存点，做不到么？”。这是一个高频体验诉求，目前没有对应 PR，但可以作为产品需求池中的高优先级候选。

---

## 7. 用户反馈摘要

- **中文用户对聊天记录长度的一致不满（#7884）**：原话 “现在聊天记录的历史这么短么？讨论过的问题，回头往上翻，看不到了？？？ 咱聊天记录多存点，做不到么？知道这个体验多差么？？？” —— 语气强烈，反映出当前短历史记录严重影响了实际使用中的上下文回溯。这条反馈值得在中文用户群中进一步调研普遍性。
- **“免费”标签与实际 403 冲突造成的信任问题（#7882）**：用户指出 OpenCode 供应商的免费模型在 UI 中标记免费，但选中后 API 请求必定失败（403 FreeTierError），提示文案也仅有“仅限 OpenCode 客户端”。这属于**信息准确性**问题，会直接影响用户对模型列表可信度的判断。
- **MCP 配置对“静态 Bearer Key”类型不够友好（#7879）**：企查查 QCC 官方 MCP 采用静态 Bearer API Key，但 QwenPaw 的授权流程强制走 OAuth 握手且缺少 `client_id`/`resource`，导致用户无法完成接入。该用户已提供 11 项服务与完整复现步骤，说明其有明确且实际的生产对接需求。
- **UI 细节打磨空间（#7877）**：工作目录面板“最近项目”恒为空且无写入入口、选取目录后“应用”按钮仍禁用等细节，虽不致命但直接影响日常操作效率，用户描述中带有耐心但明确的改进预期。

---

## 8. 待处理积压

| 项目 | 状态 | 关注原因 |
|---|---|---|
| [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) — Console 懒加载 chunk 失败无法恢复 | OPEN，已持续 4 天，评论 5 条，**无对应 fix PR** | 当前讨论度最高的 Bug，全局 UI 不可恢复且无修复方案，维护者应尽快确认根因并分配修复。该问题与今日 #7888 的根因部分重叠（`ChunkErrorBoundary` 重置机制），可考虑一并修复或合并设计。 |
| 全部 7 个 PR 待合并（#7874 / #7875 / #7880 / #7885 / #7886 / #7887 / #7889） | OPEN，昨日 0 合并、0 关闭 | 其中 #7885、#7886、#7887 对应 3 个 P0/P1 级会话损坏 Bug，修复已就绪但尚未合入，**每延迟一天，用户就多承担一天会话永久卡死或文件发送失败的风险**。#7886 与 #7887 疑似重复实现同一修复，需要尽快决定去留。 |

---

> **一句话总结**：CoPaw 社区活跃度与外部贡献者参与度俱佳，但 P0 级会话损坏 Bug 的修复 PR 已备好却无人合入，维护者的 review 与合并效率是当前项目健康度的关键瓶颈；明天值得期待的是 #7885/#7886/#7887/#7889 四个修复 PR 能否顺利进入主干。

:::
