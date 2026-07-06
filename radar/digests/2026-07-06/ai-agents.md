# OpenClaw 生态日报 2026-07-06

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-07-06 10:18 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

好的，这是根据 OpenClaw 项目 2026-07-06 的 GitHub 数据生成的项目动态日报。

---

# OpenClaw 项目动态日报 – 2026-07-06

## 1. 今日速览

过去 24 小时，OpenClaw 项目活跃度极高，Issue 与 PR 总更新量均达到 500 条。社区贡献热情高涨，大量新功能 PR 密集提交（Session 管理大改、成本追踪、后台任务看板），同时 **130 个 Issue 与 260 个 PR 被关闭/合并**，修复效率不俗。然而，**本日未发布新版本**，且 v2026.6.x 系列暴露出多个 P1 级别回归问题（可重入性缺失、工具参数丢失、Matrix 通道崩溃）。项目正处于 **“功能高速推进”与“发版质量阵痛”并存** 的活跃阶段。

## 2. 版本发布

（无新版本发布，此节省略）

## 3. 项目进展

尽管无新 Release，今日社区贡献在多个高优 Bug 修复和核心功能上取得了扎实进展。

- **关键 Bug 修复（今日关闭）：**
    - **[#99881]** 修复了向非多模态模型上传图片后，所有工具输出显示为`（see attached image）`占位符的问题。
    - **[#98239]** 修复了 `/pair qr` 命令会意外改变 `gateway.bind` 配置，从而破坏 Tailscale Serve Webchat 的问题。
    - **[#38622]** 修复了工作区文件注入器不追踪符号链接导致的 `[MISSING]` 问题。
    - **[#48045]** 修复了浏览器工具在使用 CDP 连接时静默丢弃下载文件的问题。
    - **[#80918]** 修复了 Agent 最终轮次以 `update_plan` 结束时被错误判定为“不完整轮次”而丢弃的问题。
    - **[#25574]** 修复了插件配置警告日志在每次重载时重复打印导致日志暴涨的问题。

- **安全与基础设施加固：**
    - **[#47523]（已合并）** 收紧了工具名称的信任策略，防止非内置工具通过名称碰撞获取本地媒体路径传递权限，是一次重要的安全边界加固。

- **今日重点新 PR（产品演进方向）：**
    - **UI 大统一：** [@steipete] 发起系列重磅 PR。[#100814] 为 Web/iOS/Android 带来了统一的 Session 分组、未读状态和全功能控制，直接回应了社区呼声。[#100789] 则为 Web 控制台引入了后台任务实时看板。
    - **可观测性：** [#100672] 为 Anthropic 和 OpenAI 新增成本历史面板。[#98201] 对 OTEL 日志进行了语义化富化。
    - **内核稳定性：** [#100686] 修复了 Anthropic 兼容流式传输的挂起问题。[#100809] 改进了 preflight 压缩失败时的降级逻辑，防止 Composer 死锁。[#100795] 防止了无负载媒体块擦除工具执行结果。

## 4. 社区热点

- **[#75] Linux/Windows 桌面端支持 (P2, 110 条评论, 81 👍)**
    毫无悬念的社区顶流。虽然今日未有直接进展，但核心贡献者 [@steipete] 在跨平台 UI 上的密集工作（[#100814], [#100786]），暗示了桌面端可能已在规划之中。
- **[#98416] v2026.6.11 发布包缺少可重入保护 (P1, 17 条评论)**
    今日最严重的稳定性事件。用户发现正式发布包与源码不一致，导致回复会话初始化死锁，引发了关于发版流程中 CI 编译与源码校验的讨论。
- **[#9443] 请求预编译 Android APK 发布 (26 条评论)**
    由用户通过其 AI 助手提交，反映非技术用户对开箱即用移动端的强烈渴望。目前 iOS 有 TestFlight，但 Android 用户仍需自行编译。

## 5. Bug 与稳定性

今日报告了多个严重影响使用的回归问题，稳定性是需要高度关注的薄弱环节。

- **严重（P1）：**
    - **[#98416]** v2026.6.11 发布包缺失可重入保护，导致回复会话冲突。 *(尚无 Fix PR)*
    - **[#99241]** 工具输出渲染为图片附件，导致 Agent 自身无法读取执行结果。 *(关联 PR [#100795] 已修复)*
    - **[#99586]** 运行时工具表面（Tool Surface）返回空白，容器重启仅短暂缓解。 *(需更多反馈)*
    - **[#87711]** Telegram 路由的话题频道在首次对话时仅返回空脚注。 *(已 Stale)*
    - **[#90325]** Matrix 通道分发崩溃（TypeError: Cannot read properties of undefined）。 *(已 Stale)*
    - **[#53599]** 旧版 Chrome 扩展联动被移除，未提供跨机器替代方案。 *(自 3 月积压至今)*
    - **[#53408]** 长时间对话后，Write/Exec 工具参数被静默丢弃。 *(自 3 月积压至今)*
- **中等影响（P1/P2）：**
    - **[#89374]** Session 超时压缩报告成功，但实际导致会话不可恢复。
    - **[#86342]** 插件缓存周期内 Agent Harness 注册非原子操作，导致罕见但广泛的 `MissingAgentHarnessError` 错误。
    - **[#94919]** 模型失败触发自动回退时，用户在异步上下文（Cron、子 Agent）中完全不知情。

## 6. 功能请求与路线图信号

- **强力推进中：**
    - **Session 管理升级：** 结合 [#100814] 的提交和社区对 [#13700 Session 快照] 的呼吁，Session 管理的大改已是定局。
    - **企业级运维：** [#100672 成本追踪] 和 [#98201 OTEL 富化] 的直接提交，标志着项目正在认真布局企业部署场景。
- **呼声高但信号弱：**
    - **桌面端与 APK：** [#75] 和 [#9443] 是社区基数最大、最早的需求，但核心团队尚未表态具体时间点，是当前项目出圈的最大瓶颈。
    - **安全架构：** 社区对 **[#7707 内存信任标记]**、**[#10659 秘钥屏蔽]** 的安全设计讨论非常深入，展现了用户对生产级 Agent 安全的高标准，但核心维护者尚未宣布将其纳入近期路线图。
    - **数据备份：** **[#13616 备份恢复工具]** 持续获得点赞，但无人认领。

## 7. 用户反馈摘要

- **满意度：** 重度用户普遍认可 OpenClaw 的核心编排能力、插件生态和 Memory 持久化机制，正将其用于复杂的自动化场景。
- **核心痛点：**
    - **“升级像开盲盒”：** 用户反复反馈 v2026.6.x 版本的 Session 状态管理变得极度脆弱，每次大版本更新都伴随关键回归（[#98416], [#90325]）。
    - **“文档与实现不符”：** 用户明确指出 Webhook 的多轮对话功能实际上完全不可用（[#11665]）。
    - **“接入门槛高”：** 非开发者用户受阻于基础平台体验，如 Android 需自行编译（[#9443]），Telegram 首次对话即失败（[#87711]）。

## 8. 待处理积压

- ⚠️ **维护者需紧急干预（高影响力 + 长期停滞）：**
    - **[#53599] Chrome 扩展联动回归 (P1, 2026-03-24)：** 已积压三月，是跨机器浏览器控制场景的致命缺陷。
    - **[#53408] 工具参数静默丢失 (P1, 2026-03-24)：** 长期影响所有深度使用 Agent 的会话质量。
- **等待维护者审查的优质 PR（标签: `ready for maintainer look`）：**
    - **[#96230]** 停止 Gateway 重启恢复后的死亡循环 (P1)。
    - **[#98201]** OTEL 日志结构富化 (P2)。
    - **[#99504]** 防止投递镜像提示污染 (P2)。
    - **[#98857]** Codex Supervisor JSON 解析容错 (P3)。
- **长期未决但高频呼出的功能：**
    - [#75] 桌面端应用支持。
    - [#60572] 多槽位内存架构。
    - [#10659] 秘钥遮蔽系统。

---

## 横向生态对比

# 2026-07-06 个人 AI 智能体开源生态横向分析报告

---

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态处于**高强度竞合与格局分化**阶段。核心呈现出三大趋势：一是全栈化竞争加剧，项目普遍从单一聊天引擎向跨平台桌面、企业级工作流、成本治理等方向延伸；二是**安全与信任机制**从“可选插件”变为“基础设施级要求”，多个头部项目同日合并了工具权限收紧、SSRF 防护、审批门守卫等核心安全改动；三是用户需求加速成熟，“支持 xAI/OpenRouter”和“不要让我破产”成为触发社区行动的两大最强情绪。整体而言，生态健康度呈现**中心项目 OpenClaw 高歌猛进但阵痛明显、细分赛道项目差异化巩固**的百花齐放局面。

---

## 2. 各项目活跃度对比

| 项目 | Issue 动态量 | PR 合并/关闭量 | 待合并/Pending | 新版本 | 健康度评级 | 关键信号 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 极高（500+总动作，130关闭） | 260 | 高 | 无 | 🟡 高速迭代+质量阵痛 | 社区规模最大，回归风险最高 |
| **NanoBot** | 中（11更新，8关闭） | 4 | **极高（496）** | 无 | 🟢 内核稳健 | 维护者瓶颈已到临界点 |
| **Zeroclaw** | 高（27更新） | ~20（50条PR中） | 中 | 无 | 🟢 快速发展 | SOP可视化编辑器完成核心交付 |
| **PicoClaw** | 低（3更新） | 0 | 5 | 无 | 🟡 修复导向 | 吞吐量低，需加速审查 |
| **NanoClaw** | 低（1新Issue） | 3 | 低 | 无 | 🟢 状态优秀 | 无严重Bug，功能巩固期 |
| **IronClaw** | 中（18更新） | 11 | 20 | 无 | 🟡 高并发+单点风险 | 性能审计亮眼，Nightly E2E 连续失败5周 |
| **LobsterAI** | 无 | 8 | 0 | 无 | 🟢 极佳 | 交付脉冲完美，队列清零 |
| **CoPaw/QwenPaw** | 高（30处理） | 20 | ~20 | 无 | 🟢 v2.0前系统性加固 | 投入300+回归测试用例 |
| **Tiny/Moltis/Zepto/Easy** | 0 | 0 | — | 无 | ⚪ 冻结/休眠 | 社区注意力转移，需警惕 |

*数据口径：各项目日报原始数据，采集时段 2026-07-05 12:00 UTC ~ 2026-07-06 12:00 UTC。*

---

## 3. OpenClaw 在生态中的定位

**核心参照，双刃剑效应明显。**

- **优势**：OpenClaw 是当前生态中**绝对规模领先者**（单日500+动作），功能覆盖面最广（浏览器工具、Session管理、成本面板、多平台UI），且被大量衍生生态直接参照或集成（如 LobsterAI 直接基于 OpenClaw 引擎做成本心跳控制）。
- **劣势**：**“升级像开盲盒”** 是社区核心口碑，v2026.6.x 系列暴露出可重入性缺失、工具参数丢失、Matrix 通道崩溃等多个 P1 回归问题，稳定性被同段位竞品（如 Zeroclaw、LobsterAI 无积压 Bug）拉开差距。
- **差异对比**：
  - vs **Zeroclaw**：OpenClaw 强调**自由态Agent编排**与社区驱动力；Zeroclaw 强调**结构化SOP与审批合规**，工程确定性更强。
  - vs **IronClaw**：OpenClaw 以功能广度快速社区扩散；IronClaw 以架构深度和性能审计确立系统工程的标杆地位。
  - vs **NanoBot**：OpenClaw 是全栈重量级选手；NanoBot 是轻量 IM 网关，专精渠道兼容与模型路由。

---

## 4. 共同关注的技术方向

### 4.1 生产级安全与权限机制
- **涉及项目**：OpenClaw（#47523 工具信任策略）、NanoBot（#4671 SSRF、#4701 MCP崩溃）、Zeroclaw（#8678 审批门绕过）、IronClaw（#5669 Slack最小权限）、NanoClaw（#2726 Guardrails）。
- **诉求共性**：用户已从“能做”转向“安全地做”。工具级信任边界、审批完整性、子进程回收、SSRF防护成为标配要求。

### 4.2 API 成本可观测性与控制
- **涉及项目**：OpenClaw（#100672 成本面板）、LobsterAI（#2280/#2278 心跳成本控制策略）。
- **诉求共性**：重度用户遭遇“API账单冲击”，**失控Agent** 是头号费用恐惧。成本观察面板 + 自动熔断机制正在成为核心竞争力。

### 4.3 桌面端与统一UI
- **涉及项目**：OpenClaw（#100814 统一Session/未读、#75 桌面端呼声）、IronClaw（#5685 i18n、#5554 移动端修复）、QwenPaw（#5814 Node捆绑桌面端）。
- **诉求共性**：Web 控制台是基础，**原生桌面集成**（文件系统、本地浏览器控制、DevTools）是生态分水岭。

### 4.4 模型供应商兼容性
- **涉及项目**：NanoBot（#4017 文本格式Tool Call解析）、LobsterAI（#2276 xAI Grok）、IronClaw（#5665 OpenRouter工具截断）、OpenClaw（#99881 非多模态图片处理）。
- **诉求共性**：社区强烈抵制供应商锁定，要求“一套API，百种模型”。兼容性修复往往是当天最高优先级PR。

### 4.5 结构化工作流与确定性编排
- **涉及项目**：Zeroclaw（#8590 SOP可视化编辑器）、OpenClaw（Session管理大改）、NanoClaw（#2908 模板Agent）。
- **诉求共性**：从“自由态聊天”向“结构化程序”演进，SOP、Guardrails、Template Agent 标志着行业从“提示词工程”走向“程序化Agent编排”。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 全栈实验场、社区最广 | 早期采用者、深度开发者 | 自由态编排、插件生态、功能覆盖面最大 |
| **Zeroclaw** | 确定性SOP、审批合规 | 企业团队、运维人员 | 节点图编辑器、Channel Fan-In、严格保存验证引擎 |
| **IronClaw** | 性能深度、架构稳健 | 基础设施工程师、高可靠场景 | WASM Runtime、Event Store、Slack Manifest驱动 |
| **NanoBot** | 多IM渠道网关、模型路由 | Bot 开发者、社区运营 | 轻量后端、支持QQ/Telegram、混合部署 |
| **LobsterAI** | 生产力管理、成本治理 | 重度个人用户、小型团队 | 邮件多账号、心跳控制、xAI集成 |
| **CoPaw/QwenPaw** | 中国/亚洲生态全覆盖 | 大陆及亚太用户、企业 | Azure Bot、飞书、IM长连接、v2.0平台化 |
| **PicoClaw** | Anthropic深度集成、安全加密 | 安全意识强的极客用户 | Vodozemac替换、Delta Chat重构、最小化依赖 |

---

## 6. 社区热度与成熟度分层

**第一梯队：前沿高活跃（定义边界期）**
- **OpenClaw**：数据量最大、速度最快，但回归率最高。
- **Zeroclaw**：SOP 作者面交付，社区反馈密度高，质量把控优秀。
- **IronClaw**：性能审查风暴 + Slack 重构，工程深度领先。

**第二梯队：稳定增长期（质量巩固）**
- **LobsterAI**：零积压Bug、完美交付脉冲，管理成熟度生态第一。
- **CoPaw/QwenPaw**：v2.0 前大规模回归测试投入，本土生态整合迅速。
- **NanoBot**：内核稳健但 496 个待合并 PR 敲响**维护者瓶颈**警钟。

**第三梯队：专注细分/休眠**
- **PicoClaw / NanoClaw**：各自在 Anthropic 缓存、Guardrails 等领域有明确技术赌注，但社区贡献者规模有限。
- **TinyClaw / Moltis / ZeptoClaw / EasyClaw**：24小时零活动，需观察是否已实质放弃。

---

## 7. 值得关注的趋势信号

1. **“安全左移”成为行业基线**：不再是事后补丁，而是功能设计阶段即嵌入（工具信任策略、审批守卫、SSRF 熔断、Process 生命周期管理）。这是 Agent 从“Demo”走向“生产环境”的关键一步。

2. **API 成本墙触发架构创新**：LobsterAI 的“心跳成本控制”与 OpenClaw 的成本面板，直接回应了“Agent 失控导致 API 账单爆炸”这一开源项目在变现前的最大生存威胁。**建议所有项目标配熔断机制。**

3. **桌面端是下一轮用户争夺的决胜点**：QwenPaw 直接为桌面版捆绑 Node 运行时，OpenClaw 的单日 UI 统一 PR 暗示跨平台规划已启动。Web 端已不足以承载深度 AI 助手体验。

4. **模型供应商去锁定期正式结束**：NanoBot 修复小米 MiMo 文本 Tool Call、LobsterAI 整合 xAI、IronClaw 修复 OpenRouter——生态已用行动宣告“没有任何一个模型供应商能垄断长尾场景”。

5. **PR 积压危机正在消耗贡献者热情**：NanoBot 496 个待合并 PR 是今日最强警示信号。高活跃项目需设立“维护者效率周”或自动化 PR 分类/决策日，否则迟早面临贡献者流失。

6. **从“Agent Chat”到“Agent OS”**：Zeroclaw 的 SOP 可视化编辑器+多渠道认证体系，标志行业正在构建**操作系统级别的抽象层**。确定性工作流、多租户、Schema 版本迁移（V3→V4）等系统工程的投入显著增加。

---

*以上分析基于 2026-07-06 各项目公开数据，横向对比聚焦当日动态所折射的深层生态结构。指标解读需结合项目长期趋势，单日数据不构成项目终局判断。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

好的，以下是根据您提供的 GitHub 实时数据生成的 **NanoBot 项目动态日报**。

---

# NanoBot 项目动态日报 | 2026-07-06

## 1. 今日速览
过去 24 小时，NanoBot 项目在 Bug 修复和渠道兼容性上取得了扎实进展。社区共推动 11 个 Issues 更新（其中 8 个被关闭），并合并/关闭了 4 个 Pull Requests。项目的核心稳定性得到显著增强，尤其是在 **Windows 网关兼容性**和**跨提供商工具调用解析**方面。此外，社区反馈高度积极，针对 QQ 频道重连风暴和 WebUI 交互优化的 PR 已被迅速提交。**但需警惕的是，当前待合并的 PR 积压高达 496 个，维护成本正在累积。**

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展：重要合并与关闭
今日合并/关闭的 PR 均指向核心修复，对项目稳定性的推进意义重大：
- **[重要] 工具调用兼容性大统一 (#4017 -> #4061)**
  Merged by @bingqilinweimaotai. 此 PR 解决了一个长期困扰用户的核心问题：部分 OpenAI 兼容提供商（如小米 MiMo）以纯文本而非结构体返回 `tool_calls` 时，NanoBot 解析失败。该修复**大幅拓宽了 NanoBot 的模型兼容范围**，真正意义上实现了“一套 API，百种模型”的目标。[查看 PR](https://github.com/HKUDS/nanobot/pull/4017) | [关联 Issue](https://github.com/HKUDS/nanobot/issues/4061)

- **[重要] Windows 网关 PID 自愈 (#4547 -> #4511)**
  Merged by @dajiaohuang. 修复了 Windows 平台下，`/restart` 命令后网关状态文件（PID）残留导致的进程管理错乱问题。这标志着 Windows 端的生产环境部署可靠性达到新高度。[查看 PR](https://github.com/HKUDS/nanobot/pull/4547) | [关联 Issue](https://github.com/HKUDS/nanobot/issues/4511)

- **[修复] CLI 交互模式流式失败回退 (#4654)**
  Merged by @goodtiding5. 修复了交互模式下，当流式接口未能正常调用时的零回复问题。确保了无论后端流式策略如何，用户都能获得最终响应。[查看 PR](https://github.com/HKUDS/nanobot/pull/4654)

- **[修复] 网关状态刷新配置路径回归 (#4770)**
  Merged by @Re-bin. 解决了由 `#4547` 引入的配置路径读取回归，维持了网关状态的自愈能力。[查看 PR](https://github.com/HKUDS/nanobot/pull/4770)

## 4. 社区热点：讨论与技术焦点
今日最活跃的话题集中在**渠道稳定性**和**多模型兼容性**上：
- **#4767 / #4768 QQ 频道重连风暴：从发现到修复的极速闭环**
  作者 @gola 敏锐地发现 QQ 频道在网络故障时，使用固定 5 秒间隔重连导致日志严重刷屏。在提交 Bug 报告后，作者迅速自提了修复补丁（#4768），引入了退避算法。这体现了社区在**渠道稳定性和运维友好性**上的极高要求。[查看 Issue](https://github.com/HKUDS/nanobot/issues/4767) | [查看 PR](https://github.com/HKUDS/nanobot/pull/4768)

- **#4061 / #4017 文本格式 Tool Calls 解析（已关闭，余温犹在）**
  尽管今日已关闭，但此 Issue 持续 38 天，反映了开发者对于**摆脱单一模型供应商依赖**的强烈诉求。该修复合并后，必将成为多模型混合部署场景的催化剂。

- **#4637 Telegram 长消息渲染 Bug**
  用户 @MARJORIESHA-pBAD 提供了清晰的截图证据，描述了分片消息中非末位分片无法渲染 Markdown 的问题，是目前主要渠道中**影响终端用户视觉体验最严重的开放 Bug**。[查看 Issue](https://github.com/HKUDS/nanobot/issues/4637)

## 5. Bug 与稳定性
按严重程度排列，重点标注已有修复方案的问题：
- **[P0 - 安全] SSRF 防护 DNS 固定不足 (#4671 - PR)**
  当前实现可能允许 DNS 重绑定绕过，存在 SSRF 攻击风险。作者 @hamb1y 提交了修复方案，通过锁定解析后的 IP 来增强防护。
  *状态*：待合并，建议优先处理。[查看 PR](https://github.com/HKUDS/nanobot/pull/4671)

- **[P1 - 严重] QQ 频道无退避重连日志风暴 (#4767 / #4768)**
  网络不可达时每 5 秒产生一次完整 traceback，严重污染生产日志。
  *状态*：已有 Fix PR (#4768)，待合并。[查看 Issue](https://github.com/HKUDS/nanobot/issues/4767)

- **[P1 - 安全] MCP 工具异常未捕获导致进程崩溃 (#4701 - PR)**
  作者 @axelray-dev 将异常捕获升级至 `BaseException`，防止 MCP SDK 未处理异常传导并击穿 Agent 主循环。
  *状态*：待合并。[查看 PR](https://github.com/HKUDS/nanobot/pull/4701)

- **[P1] WebUI 斜杠命令与流状态冲突 (#4766 - PR)**
  修复了 `/status` 等副通道指令在处理流式响应时错误进入流状态机的问题，影响 WebUI 交互流畅度。
  *状态*：待合并。[查看 PR](https://github.com/HKUDS/nanobot/pull/4766)

- **[P2] Telegram 消息分片渲染 (#4637)**
  消息代理在分片发送长文本时，前序分片渲染出错。
  *状态*：Open，尚无关联 PR。[查看 Issue](https://github.com/HKUDS/nanobot/issues/4637)

- **[P2] 长任务技能文件路径缺失 (#4655)**
  已被关闭。确认根因为内置引用使用了硬编码绝对路径 `skills/long-goal/SKILL.md`，而非动态配置路径。
  *状态*：已关闭。[查看 Issue](https://github.com/HKUDS/nanobot/issues/4655)

## 6. 功能请求与路线图信号
- **[高可能性纳入下一版本] WebUI 文档附件上传 (#4771 - PR)**
  社区明星贡献者 @chengyongru 直接提交了完整代码实现，允许 WebUI 通过拖拽/粘贴上传 PDF 等格式文档。此 PR 覆盖前后端及测试，**补齐了 WebUI 相对于 TUI/CLI 的最后一块内容处理短板**。[查看 PR](https://github.com/HKUDS/nanobot/pull/4771)

- **[高可能性] 提供商 OAuth 状态可视化 (#4689 - PR)**
  作者 @bingqilinweimaotai 响应社区需求，提供了跨 CLI/WebUI 的 OAuth 状态看板与 Token 过期警告，极大提升企业级管理体验。[查看 PR](https://github.com/HKUDS/nanobot/pull/4689)

- **[路线图信号] 外部 Agent 编排 (#3436 - Issue)**
  关于集成 opencode 等外部编排框架的讨论仍在活跃进行，表明用户群体开始从“单体智能体”向“Agent 舰队”思考架构演进方向。[查看 Issue](https://github.com/HKUDS/nanobot/issues/3436)

- **[长期储备] A2A (#216) / Cron (#364) / Supermemory (#967)**
  这些带有 `[conflict]` 标签的长期开放 PR 今日仍有更新。它们是社区对未来核心特性的战略性储备，但需警惕与主干的进一步漂移。

## 7. 用户反馈摘要
- **Windows 用户的不满：跨平台一致性问题**
  来自 @Quincy-Zh (#4511) 和 @chengyongru (#4544) 的反馈清晰指出：“Windows 不应该是二等公民”。特别是 `#4544` 提出的“单行 cmd / 多行 powershell”分裂策略，被批评为“对智能体编写跨平台命令极不友好”，是一种隐蔽但关键的技术债。

- **“兼容但不可用”的挫败感**
  用户 @hamb1y (#4061) 反映了使用非标准 API 时普遍的痛点：“模型能连接，但工具用不了”。这暴露了 API 兼容性测试中典型的“半覆盖”问题，随着 #4017 合并有所缓解。

- **对 WebUI 迭代的高度认可**
  @chengyongru 在短短几天内陆续提交了移动端适配 (#4693)、流冲突修复 (#4766) 和文件上传 (#4771) 三个高质量 PR。这种密集的贡献表明，社区对**全功能 WebUI** 的渴望极其强烈，且项目对这一方向的响应非常积极。

## 8. 待处理积压
- **“黄金”PR 合并积压严重**
  当前共 496 个待合并 PR。虽然多数可能是小型分支，但 `#216` (A2A, 5个月)、`#364` (Cron, 5个月)、`#967` (Supermemory, 5个月) 等对项目架构影响深远的 PR 长期未合并，存在巨大的分支漂移和后期合并冲突风险。**建议核心团队设立一次“决策日”，对长期未合并的 PR 做出合并、请求修改或关闭的最终裁决。**

- **Telegram 渠道体验裂痕 (#4637)**
  作为全球用户量最大的 IM 渠道之一，长消息渲染问题已持续开放 5 天且无开发者认领。考虑到其在社区沟通中的核心地位，此 Bug 应尽快由 Open 状态转为 Assigned。

- **安全热修复需跳过常规队列**
  `#4671` (SSRF) 和 `#4701` (MCP 崩溃) 两个带 `security` 标签的修复应作为 Hotfix 优先于常规功能审查合并，以防潜在漏洞进入下一个 Release。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 2026-07-06

---

## 1. 今日速览

今日 Zeroclaw 项目继续保持极高的开发迭代节奏，**24 小时内处理了 27 条 Issue 与 50 条 PR，社区与技术团队的双向反馈密度处于峰值**。项目在 **SOP（标准作业流程）的可视化编辑面** 与 **多用户认证体系** 两大架构级特性上完成了核心代码落库，多条重量级功能 PR（SOP 作者面、Git Forge Channel、Schema V4 清理）正处于密集评审期，有望近期合入。安全侧同步收紧了审批流程与子进程生命周期管理，数项 P1 级 Bug 已获快速响应。**综合来看，项目健康度表现良好，处于功能推进快、社区参与高、质量把控稳的积极态势。**

---

## 2. 版本发布

无新版本发布（最新 Releases 为空）。

---

## 3. 项目进展

### 核心特性合入与推进

- **SOP 可视化编辑正式落地**：跟踪 Issue #8288（SOP 里程碑）的核心交付件 PR #8590（`feat/sop-authoring`，XL 级别）已通过测试与文档验收，交付了**无损往返创作栈**，包含节点图编辑器、Channel Fan-In、严格保存验证引擎。配套追踪 Issue #8736 已标记全量特性清单。
- **Schema V4 首切**：PR #8754 提交了 Schema V4 的首个切片，移除了 Skills、Inert Tunable 和 Summary Model 的废弃配置表面，并引入了 V3→V4 的迁移脚手架。
- **渠道生态补全**：
  - **WhatsApp / 微信认证链路**：PR #8732 / #8734 / #8735 形成技改序列，实现了 QR 配对渠道的认证状态上报、客户端重连钩子以及 `peer_groups` 身份持久化，解决了配对后渠道静默丢失连接的问题。
  - **Git Forge Channel**：PR #8609（XL）新增基于 GitHub Provider 的 Forge 渠道，支持 SOP 入口事件驱动工作流。
  - **LINE 渠道**：PR #7768（L）交付了加载指示器、昵称/图标切换和绑定回复反馈。
- **已合入的显著修复**：`#8645` (Env 覆盖漂移) / `#8032` & `#8345` (Web MCP 表单 Required 逻辑修复) / `#8744` (独立 Delegate 工具注册通道重构)。

---

## 4. 社区热点

- **[OpenAI Chat Completions 兼容适配器 - #8603]((https://github.com/zeroclaw-labs/zeroclaw/issues/8603)) | 标签: `needs-maintainer-review`，评论持续增加**
  社区呼声极高的生态集成需求。用户明确表示当前的 WebSocket/Webhook 架构无法对接 **Open WebUI、LobeChat** 等主流前端，每次接入都需自建适配层。该 RFC 若获采纳，将是 ZeroClaw 接入全球 Open AI API 生态的关键枢纽，建议维护者优先给出路标指引。

- **[ZeroClaw 核心瘦身长期辩论 - #6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) | 评论: 8**
  关于核心边界的架构分歧仍在持续博弈。社区核心贡献者与维护者正在明确"长尾集成 → MCP/CLI 后端/插件"的具体迁移路径，以保持核心的轻量化与可维护性。该讨论对项目后续模块化拆分影响深远。

- **[Bocha AI 搜索集成 - #8737](https://github.com/zeroclaw-labs/zeroclaw/pull/8737) | 新 PR，地理性需求明确**
  针对**中国大陆用户**无法访问 DuckDuckGo/Brave 等搜索服务的问题，社区贡献者提出集成 Bocha AI 作为替代搜索提供商。该 PR 响应迅速，反映了社区用户分布的地域多样性及功能优先级的现实考量。

---

## 5. Bug 与稳定性

### P1 严重级别（高优先级，影响核心功能或安全）

| Issue | 描述 | 影响面 | 修复状态 |
|---|---|---|---|
| [#8678](https://github.com/zeroclaw-labs/zeroclaw/issues/8678) | `advance_step` 缺乏运行状态守卫，驱动方可绕过 SOP 审批门 | **安全/合规** - 审批门完整性被打破 | 无修复 PR，待紧急处理 |
| [#8718](https://github.com/zeroclaw-labs/zeroclaw/issues/8718) | `zeroclaw config init` 生成被守护进程拒绝的模板，`local_whisper` 转录静默失效 | **新用户激活** - 开箱即坏，且无声告警 | 无修复 PR |
| [#8731](https://github.com/zeroclaw-labs/zeroclaw/issues/8731) | Stdio MCP 子进程未被回收，长期运行下积累大量僵尸进程 | **稳定性** - 服务器性能退化 | 无修复 PR |
| [#8560](https://github.com/zeroclaw-labs/zeroclaw/issues/8560) | `browser_open` 在无显示环境下挂起 Agent Turn，同步锁死 | **工作流阻塞** - 影响 TTS/FFmpeg 等多处子进程调用 | 无修复 PR |
| [#8753](https://github.com/zeroclaw-labs/zeroclaw/issues/8753) | CI `rust_quality_gate.sh` 未开启 `--workspace`，member crate 的编译错误可合入 Master | **工程质量** - 主干分支质量门失效 | 无修复 PR |

### P2 严重级别

- [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)：Bedrock Nova 2 Lite 模型 `cachePoint` 无法通过配置关闭。用户需求明确，建议提供开关。
- [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733)：`models.dev` 目录仅解析模型 ID，vision 等能力字段被丢弃，导致 `supports_vision()` 回退到硬编码家族 bool。
- [#8722](https://github.com/zeroclaw-labs/zeroclaw/issues/8722)：高熵检测器误将合法生成的文件名（如 UUID 命名）替换为 `[REDACTED_HIGH_ENTROPY_TOKEN]`，造成引用断裂。

### 已关闭/已修复

- [#8645](https://github.com/zeroclaw-labs/zeroclaw/issues/8645)（网关 Env 覆盖漂移）—— 修复已合入。
- [#8645](https://github.com/zeroclaw-labs/zeroclaw/issues/8645): Reload banner env-override drift. **FIXED**.

---

## 6. 功能请求与路线图信号

- **SOP 作者面正式上线**：`#8736` + `#8590` 的交付，标志着 ZeroClaw 的确定性工作流从后台引擎走向前台编辑器。`#8719` 提出的 SOP `when` 路由增强（false → 流转到下一布而非终止）已获 accepted 标签，大概率进入下一迭代。
- **OpenAI 兼容 API（#8603）**：承前节社区热点，如果 `needs-maintainer-review` 最终通过，将是 ZeroClaw 接入 Open WebUI / LobeChat / 自定义集成的必由之路，预计将成为项目生态扩展的里程碑。
- **Schema V4 持续清理**：`#8310` 的 V4 目标（移除所有无效/SaaS/CLI 封装表面）收益明确，PR #8754 已落地第一片，后续切片（安全性、渠道等）预计会密集到来。
- **长期路标——zerorelay 中继节点**：`#8358` 追踪的独立中继节点（NAT/CGNAT 穿透）处于架构推进中，标志着 ZeroClaw 从单机守护进程向分布式网状网络演进。

---

## 7. 用户反馈摘要

| 用户痛点 / 使用场景 | 对应 Issue | 诉求分析 |
|---|---|---|
| 新用户配置体验断裂 | `#8718`: `zeroclaw config init` 生成的本地 Whisper 配置无法通过 daemon 验证 | 开箱试用功能静默失效，体验损伤极大，需在 0.8.x 紧急修复 |
| 特定地域网络集成受阻 | `#8737`: 中国大陆无法访问主流搜索 API | 社区贡献者自行解决生态短板，说明境外服务的地理限制已成为功能区隔 |
| 标准 API 适配诉求 | `#8603`: 无法接入 Open WebUI / LobeChat | 用户希望将 ZeroClaw 作为后端推理引擎，而非使用全套 Web UI |
| 审批流程安全性隐忧 | `#8678`: SOP `advance_step` 可被绕过 | 部分用户（或 CISO 角色）对审批门的实现完整性表示不信任 |
| 服务器长期运行稳定性 | `#8731`: MCP 僵尸进程累积 | 部署于生产环境或 24x7 家庭服务器的用户反馈最强烈 |
| 特定模型兼容性 | `#8720`: Bedrock Nova 2 Lite 自动缓存异常 | 模型迭代快，ZeroClaw 的 Provider 层配置粒度仍需精细 |

---

## 8. 待处理积压

| Issue/PR | 标签 | 滞后天数 | 建议操作 |
|---|---|---|---|
| [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) OpenAI 兼容适配器 RFC | `needs-maintainer-review` | 4 天 | 社区呼声极高，维护团队需尽快给出方向性答复 |
| [#6715](https://github.com/zeroclaw-labs/zeroclaw/issues/6715) 删除无用分支 | `status:blocked` | 51 天 | 超过 200 分支待清理，项目基础 Hygiene 建议提上日程 |
| [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) Android Termux 安装 | `needs-author-action` | 18 天 | 用户等待进一步调试指引 |
| [#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822) WASM 插件生命周期钩子 | `status:accepted` | 19 天 | 已接受 RFC 但无对应实现 PR，风险等级高，需评估是否排入版本 |
| [#8030](https://github.com/zeroclaw-labs/zeroclaw/pull/8030) Doctor OpenAI Codex 诊断 | `needs-author-action` | 17 天 | 特性对 VSCode 用户友好但作者失联，可考虑被 Maintainer 接管 |

---

*本报告基于 2026-07-05 12:00 UTC 至 2026-07-06 12:00 UTC 期间 GitHub 数据自动分析生成，所有链接均指向公开 Issue / PR。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 — 2026‑07‑06

---

## 1. 今日速览

- 过去 24 小时项目共产生 **3 条 Issue 更新**（1 个新开提案、1 个关闭、1 个活跃讨论）以及 **5 条待合并 PR**，没有 PR 被合并，也没有新版本发布。
- 核心贡献者 **@AayushGupta16** 贡献了两项关键修复（`anthropic‑messages` SystemParts 支持、ToolCall 历史回放）并提出了会话缓存断点提案，使 **Anthropic 集成质量**获得明显提升。
- 社区最关注的长线需求 [#3088（vodozemac 替换 libolm）] 维持高热度（6 评论，2 👍），反映用户对依赖安全性的强烈要求。
- 总体来看，项目在 **Bug 修复和基础设施改进**上很活跃，但 PR 吞吐量偏低（5 待合并、0 合并），**建议维护者加快 review 节奏**以保持交付动力。

---

## 2. 版本发布

**今日无新版本发布。** 最新版本仍为此前的状态，未出现破坏性变更或迁移提醒。

---

## 3. 项目进展

虽然今天没有 PR 被合并，但以下重要推进值得关注：

### ✅ Issue 关闭：Anthropic 缓存 Bug 已标记修复
- **[#2191] [CLOSED]** —— `anthropic_messages` provider 将 system 消息展平为字符串，导致无法使用 `cache_control`，破坏 Anthropic 的 prompt caching。该 Issue 今日被关闭，对应的修复 PR [#3228] 已进入待合并队列。
  - 链接：https://github.com/sipeed/picoclaw/issues/2191

### 🔄 新提交的关键修复 PR（待合并）
- **[#3228] fix(anthropic-messages): send SystemParts as system blocks with cache_control** —— 让 provider 能够表达每个 block 的缓存标记，配合即将实现的端到端缓存策略。  
- **[#3227] fix(providers): resolve tool_use name/args from Function on reloaded history** —— 修复会话历史 round‑trip 后 `ToolCall.Name/Arguments` 丢失的问题，两个 Anthropic provider 均受影响。  
- **[#3222] refactor(deltachat): cleanup implementation, -320LOC** —— 清理 DeltaChat 集成，去掉遗留特性与硬编码引用，遵循 JSON‑RPC 的设计原则，代码量减少 320 行。

**关于合并的建议：** 上述 PR 尤其是 #3228 和 #3227 直接修正了公认的 Bug，且作者已表达解决 #2191 的意图，建议优先 review 合并，避免社区重复提交。

---

## 4. 社区热点

### 🔥 最活跃 Issue
- **[#3088] [Feature] use vodozemac instead of libolm**  
  标签：`help wanted`, `priority: high`  
  - 6 条评论，2 次 👍，创建近一个月仍持续获得关注。  
  - 背景：libolm 已不维护且存在安全风险；社区希望引入官方替代库 vodozemac，并让 libolm 成为编译时可选项。  
  - 该需求影响面广（涉及底层加密模块），已成为项目路线图中呼声最高的功能之一。  
  - 链接：https://github.com/sipeed/picoclaw/issues/3088

### 📌 值得关注的新提案
- **[#3229] Proposal: rolling conversation cache breakpoints for anthropic-messages**  
  作者：@AayushGupta16（与 #3228 同一人），今日新开，暂无评论。  
  - 动机：#3228 主要解决了 system prompt 的缓存，但在 agent 场景中对话历史占用大部分 token，因此建议引入“滚动断点”机制，避免每次 LLM 调用都重新发送全量历史。  
  - 该提案与 #3228 形成“修复 + 增强”的组合，如果被采纳将极大提升 Anthropic provider 在复杂 agent 工作流中的经济性。  
  - 链接：https://github.com/sipeed/picoclaw/issues/3229

---

## 5. Bug 与稳定性

| 严重程度 | Bug / 问题 | 状态 | 对应修复 PR |
|----------|------------|------|-------------|
| **中** | [#2191] `anthropic_messages` 忽略 SystemParts，导致 prompt caching 失效 | ✅ 已关闭 | [PR #3228]（待合并） |
| **中** | [#3227] `tool_use` 的 `Name/Arguments` 在历史回放后丢失（两个 Anthropic provider） | 🔧 已提交修复 | [PR #3227]（待合并） |
| **低** | [#3191] `.gitignore` 中存在重复的 `build/` 条目 | 🔧 已提交清理 | [PR #3191]（待合并） |
| **低** | [#3192] GoReleaser 基础镜像未更新至 alpine:3.23 | 🔧 已提交依赖升级 | [PR #3192]（待合并） |

**总结：** 今天没有新报告的崩溃或回归 Bug；两个影响功能的 Bug 均已通过 PR 修复待合入，稳定性风险可控。

---

## 6. 功能请求与路线图信号

### 📋 高优先级请求
- **[#3088] 使用 vodozemac 替换 libolm**  
  已被标记 `priority: high`。若实现，将提升项目安全性与维护性。目前尚无对应的实现 PR，可能需要熟悉 Matrix 加密的贡献者介入。  
  链接：https://github.com/sipeed/picoclaw/issues/3088

### 🔭 可能被纳入下一版本的信号
- **Anthropic 缓存增强系列：**  
  - [#3229] 提出的滚动缓存断点仍处于提案阶段，但它建立在 #3228（SystemParts 缓存）之上。若 #3228 能快速合并，作者很有可能进一步提出 #3229 的实现 PR。
- **DeltaChat 重构：**  
  - [PR #3222] 清理了大量遗留代码，虽然改动较大，但社区讨论不多（暂无 comment）。如果合入，将降低 DeltaChat provider 的维护成本，并为后续更新铺路。

### 🧹 杂项清理
- [#3191] 与 [#3192] 均为纯粹的配置整理，不涉及功能变化，预计可快速合并。

---

## 7. 用户反馈摘要

从今日活跃的 Issue 和 PR 摘要中，可以提炼出以下用户/贡献者声音：

- **安全性优先**（#3088 作者 @pbsds）：“libolm 已不维护且不安全，应使用官方替代 vodozemac。” 用户对底层依赖的长期维护表达了明确担忧，希望将 libolm 设置为可选。
- **对 Anthropic 缓存功能的迫切需求**（#2191 报告者 @whtiehack）：“system 被当成纯字符串发送，使得 prompt caching 完全无法工作，浪费大量 token。” 该反馈直接推动了 #3228 的修复。
- **Agent 工作负载的进阶需求**（#3229 提案者 @AayushGupta16）：“在 tool‑use 场景下，对话历史才是 token 大头，仅缓存 system prompt 远不够。” 这反映高级用户正试图用 PicoClaw 编写复杂 AI Agent，并期待更经济的缓存策略。
- **代码库清理受到认可**（#3222 作者 @trufae）：“-320 LOC，移除遗留测试和硬编码引用。” 虽然没有直接评论，但这类“减负”重构通常受到维护者欢迎。

整体来看，用户社区 **积极关注安全性、性能优化以及 Anthropic 高级功能**，且贡献者正在主动将讨论转化为代码。

---

## 8. 待处理积压

以下 Issue / PR 已开放较长时间未取得实质进展，建议维护者予以关注：

| 类型 | 编号 | 标题 | 标签 | 静默时长 | 说明 |
|------|------|------|------|----------|------|
| Issue | [#3088] | use vodozemac instead of libolm | `help wanted`, `priority: high` | 27 天（最后更新昨日，但无实质实现） | 呼声高，缺乏实现者 |
| PR | [#3192] | chore(docker): bump goreleaser base images | chore | 9 天 | 微小改动，应可直接 merge |
| PR | [#3191] | chore: remove duplicate build/ entry in .gitignore | chore | 9 天 | 同上，可快速合并 |
| PR | [#3222] | refactor(deltachat): cleanup implementation | refactor | 3 天（但已有 9 天未合并） | 改动大，需 review |
| Issue | [#3229] | Proposal: rolling conversation cache breakpoints | proposal | 0 天（新开） | 观察是否会有实现跟进 |

**重点关注：** [#3088] 虽仍活跃，但需一位熟悉 vodozemac / Olm 的开发者主导实现；长期搁置可能降低社区对项目安全性的信任。

---

*数据来源：GitHub `sipeed/picoclaw` 仓库，采集于 2026-07-06 日终。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

好的，这是根据您提供的 GitHub 数据生成的 NanoClaw 项目 2026-07-06 动态日报。

---

# NanoClaw 项目动态日报 | 2026-07-06

## 1. 今日速览
今日项目处于持续整合与深化开发阶段，整体活跃度稳健。**3 个 Pull Request 成功合并**，标志着 Guardrails（安全围栏）和 Codex 模板 Agent 等功能已完成核心开发。社区端有**1 个新 Issue** 提出图像生成需求，是项目内首次出现多模态创建的相关诉求。无严重 Bug 报告，项目健康状况良好。

## 2. 版本发布
无。

## 3. 项目进展
过去 24 小时内合入了 **3 个 Pull Request**，主要围绕安全加固与模板 Agent 功能链的打通：

- **🗡️ 新增 /add-guardrails 安全围栏技能** [#2726](https://github.com/nanocoai/nanoclaw/pull/2726)
  - 已合并。支持按 Agent 组配置输入/输出安全规则（关键词拦截、凭据泄露检测等），并会在规则解析失败时安全关闭。
- **🧩 Codex 供应商下的模板 Agent 功能完善** [#2908](https://github.com/nanocoai/nanoclaw/pull/2908)
  - 已合并。实现了 `persona prepend` 与独立于 Git 的技能发现机制，让模板 Agent 在 Codex 供应商下能完整运行。
- **🛠️ 新增 .format-lint-off 通道** [#2766](https://github.com/nanocoai/nanoclaw/pull/2766)
  - 已合并。为开发者提供了更细粒度的格式化与 Lint 控制能力。

此外，下个版本的主要候选功能 `template setup flow`（#2909）也在持续更新中，待依赖项就绪后有望合入。

## 4. 社区热点
今日社区动态集中在**集成扩展**与**新功能信号**两个方向：

- **🔥 新功能需求：图像生成** [#2959](https://github.com/nanocoai/nanoclaw/issues/2959)
  - 来自新用户 @rajpoot713，要求为店铺生成 Logo。这是 Issues 中首次出现图像/多模态生成的能力请求，虽然当前讨论数为 0，但标志着社区使用场景的潜在扩展。
- **🔌 深度集成开发（SSF 化）**：
  - **add-teams** [#2958](https://github.com/nanocoai/nanoclaw/pull/2958)：今日新提交，用 `teams login` 替代原 Azure 门户的繁琐流程，是企业级集成的重大精简。
  - **add-litellm** [#2949](https://github.com/nanocoai/nanoclaw/pull/2949)：注重实用性的模型路由技能，持续更新中，显示社区对灵活连接不同模型后端的强烈需求。

## 5. Bug 与稳定性
今日 **无明显的 Bug、崩溃或回归问题报告**。项目稳定性在观测窗口内表现良好。

值得注意的是，刚刚合入的 `add-guardrails`（#2726）采用故障安全关闭（Fail-closed）设计，这属于主动防御性投入，旨在降低未来生产环境的安全风险。

## 6. 功能请求与路线图信号
- **📌 很可能纳入下版本：**
  - **Agent 设置向导流程** [#2909](https://github.com/nanocoai/nanoclaw/pull/2909)：作为模板 Agent 功能链的最后一环，其前置依赖 #2908 已合入，此 PR 当前为最高优先级的待合并项。
  - **LiteLLM 模型路由** [#2949](https://github.com/nanocoai/nanoclaw/pull/2949)：极大扩展后端灵活性的实用技能。
- **🚩 潜在路线图新方向：**
  - **图像生成能力** [#2959](https://github.com/nanocoai/nanoclaw/issues/2959)：单条 Issue 虽不足以确认路线图变更，但这是社区从“文本 Agent”向“多模态资产创作”进军的早期信号，值得团队用 `feature-request` 标签进行追踪。

## 7. 用户反馈摘要
- **具体场景**：用户 @rajpoot713（#2959）经营一家名为 “Dream Design” 的商店，希望直接在 NanoClaw 内生成有审美设计的 Logo。这表明部分用户正尝试将工具从纯文本/自动化流程，拓展至创意生产（AIGC）领域。
- **核心痛点**：当前社区技能库中缺乏图像生成通道，用户只能通过 Feature Request 来解决。
- **贡献者反馈**：@amit-shafnir 今日有 3 个功能 PR 被合并，显示出核心贡献者正在高效推进 Templates 与 Guardrails 两大 feature 落地。

## 8. 待处理积压
- **🟡 待合并：Agent 设置模板流** [#2909](https://github.com/nanocoai/nanoclaw/pull/2909)
  - 创建时间：2026-07-02，最后更新：2026-07-05。该 PR 当前处于阻塞解除状态（#2908 已合入），是完成 Templates 全功能的关键拼图，建议维护者优先推进审核以避免冲突。
- **🟢 待响应：图像生成功能请求** [#2959](https://github.com/nanocoai/nanoclaw/issues/2959)
  - 虽然是今日新开 Issue，但作为社区需求的新方向，建议团队尽快给予初步标签分类（如 `feature-request` 或 `needs-triage`），确认该需求的优先级。
- **✅ 已清除积压**：Codex 模板依赖 PR [#2908](https://github.com/nanocoai/nanoclaw/pull/2908) 已于今日顺利合入。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 · 2026-07-06

**数据统计快照：**
- **Issues 更新**： 18 条（新开/活跃 14 条，已关闭 4 条）
- **PRs 更新**： 31 条（待合并 20 条，已合并/关闭 11 条）
- **版本发布**： 0 个

---

## 1. 今日速览

今日 IronClaw 项目呈现 **“性能深潜 + UI 收尾 + 架构重构”** 三重高并发态势。核心事件是 @serrrfirat 发起了一场覆盖全链路的系统性性能审计，一口气提交了 **8 个性能瓶颈 Issue**（Event Store、WASM 实例化、Agent Loop 克隆、LLM 工具 Schema 等），这通常意味着项目正在为高频 / 大规模场景做底层准备。UI 层面，Bug Bash 的修复批量进入合并阶段，三项 P2/P3 体验问题已关闭。Slack 集成正在从安全模型到入站路由做彻底重构，而 E2E 测试连续多周失败是当前最大的稳定性隐患。

**项目健康度**：🟡 **中高活跃，核心稳健，测试水位存忧。** 团队在压测、重构和体验修复上投入均衡，但 Nightly E2E 的持续异常（#4108）需要优先关注。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展：关键合并与持续推进

今日 **11 个 PR 被合并或关闭**，主要集中在 UI 体验修复和内核稳定性强化：

#### ✅ 已合并/关闭的亮点 PR

| PR | 描述 | 影响力评估 |
|---|---|---|
| [#5592](https://github.com/nearai/ironclaw/pull/5592) | **【UI修复】** 离开聊天页时清除侧边栏高亮 | 消除导航困惑，P3 Bug 解决 |
| [#5589](https://github.com/nearai/ironclaw/pull/5589) | **【UI修复】** 调整浮动终端按钮，避免遮挡聊天输入区 | 输入体验显著优化，P2 Bug 解决 |
| [#5593](https://github.com/nearai/ironclaw/pull/5593) | **【稳定性】** 自动刷新等待线程附件的运行记录 | 直接解决了“Failed run shows 'No thread attached'”调试阻塞（#5507） |
| [#5170](https://github.com/nearai/ironclaw/pull/5170) | **【内核】** 修复子智能体（Subagent）生成运行失败 | 强化多Agent协作的核心链路 |
| [#5626](https://github.com/nearai/ironclaw/pull/5626) | **【Slack重构】** 用 Manifest 驱动 Slack 入站路由，删除 Rust 硬编码策略文字 | 解耦业务逻辑，奠定后续权限模型重构基础 |
| [#5648](https://github.com/nearai/ironclaw/pull/5648) | **【CI】** 基准 Reborn 编译优化与测试裁剪 | 提升 CI 缓存确定性与编译速度 |
| [#5580](https://github.com/nearai/ironclaw/pull/5580) | **【Dogfooding】** 添加 IronLoop 自动配置（PR自动Review/小修复Agent） | 项目自身开始使用 Agent 管理开发，验证平台能力 |

#### 🔄 持续跟进中的关键 PR

- **「永不崩溃的运行」** [#4841](https://github.com/nearai/ironclaw/pull/4841)：今天状态稳定，配套的故障覆盖率测试 [#5613](https://github.com/nearai/ironclaw/pull/5613) 正为其提供测试保障。这是提升 Agent 生产可靠性的核心架构。
- **国际化（i18n）** [#5685](https://github.com/nearai/ironclaw/pull/5685)：正式提交，覆盖 Shell、Chat、Extensions 三大主要表面，拓展全球用户的前置条件。
- **Slack 重构栈**：栈 5/7 [#5668](https://github.com/nearai/ironclaw/pull/5668)（Bot通道为入口）和栈 6/7 [#5670](https://github.com/nearai/ironclaw/pull/5670)（最小权限Tool作用域）正在推进。
- **LLM 提供者兼容性修复** [#5665](https://github.com/nearai/ironclaw/pull/5665)：修复 OpenRouter 等第三方平台工具调用格式截断问题。

---

## 4. 社区热点

#### 🔥 今日焦点：性能审查风暴

@serrrfirat 在今日集中提交了 **8 个性能 Issue**（[#5671](https://github.com/nearai/ironclaw/issues/5671) ~ [#5680](https://github.com/nearai/ironclaw/issues/5680)），覆盖以下核心链路：

- **Event Store**：读游标后全量反序列化后再过滤（#5679）
- **WASM Runtime**：每次实例化都重建 Linker（#5677）
- **Agent Loop**：每轮循环深拷贝执行状态（#5678）
- **LLM**：每次请求都深克隆并重新正则化 Tool Schema（#5674）
- **Projections**：每次快照都从头回放事件流（#5673）
- **Conversations**：每条入站消息完整克隆并序列化全量状态（#5675）
- **WebUI**：SSE 轮询替代真正订阅（#5672），Live-Progress 增量克隆（#5680）
- **Host Runtime**：LeakDetector 对每个 Key 重建（#5671）

**分析**：这一系列 Issue 反映出项目架构正在经历一次彻底的 **“性能审计”** 。虽然当前评论数为 0（刚刚发布），但其系统性和覆盖度表明团队正准备大幅提升基准性能，这是项目走向成熟化的关键信号。

#### 💬 Slack 权限最小化讨论（#5669）

[Issue #5669](https://github.com/nearai/ironclaw/issues/5669) 提出当前 `slack_personal` OAuth 授予了所有工具的 Scope 联合，即使用户只需要读权限（搜索、列表）也必须授予 `chat:write` 写权限。这是一个典型的企业级安全合规需求——配套的 #5670 和 #5668 正在构建逐 Tool 解耦的 Scope 体系。

---

## 5. Bug 与稳定性

#### 🔴 严重级别

| Issue | 描述 | 状态 | 备注 |
|---|---|---|---|
| [#5553](https://github.com/nearai/ironclaw/issues/5553) | **审批通知不可靠** (P2) | 开放 | 审批通知一闪而过或根本不显示，导致 AI 无法执行需要用户授权的高权限操作（如网络搜索）。**已有 Fix PR [#5681](https://github.com/nearai/ironclaw/pull/5681) 提交** |
| [#4108](https://github.com/nearai/ironclaw/issues/4108) | **Nightly E2E 持续失败** | 开放（自5月27日） | Web-regressions 环节失败。超过 5 周未修复，是当前发布管线最大风险 |

#### 🟡 中等级别

| Issue | 描述 | 状态 | 备注 |
|---|---|---|---|
| [#5554](https://github.com/nearai/ironclaw/issues/5554) | **移动端布局水平溢出** (P3) | 开放 | 长消息产生横向滚动条。**Fix PR [#5682](https://github.com/nearai/ironclaw/pull/5682) 已提交** |
| [#5557](https://github.com/nearai/ironclaw/issues/5557) | **日志深度链接需点击两次加载** (P3) | 开放 | 首次点击只显示“Select conversation”，需第二次点击才生效。暂未修复 |

#### 🟢 已关闭（感谢快速修复）

- [#5507](https://github.com/nearai/ironclaw/issues/5507) Failed run 显示 “No thread attached” (P2) → 被 [#5593](https://github.com/nearai/ironclaw/pull/5593) 修复 ✅
- [#5555](https://github.com/nearai/ironclaw/issues/5555) 终端按钮遮挡聊天区 (P2) → 被 [#5589](https://github.com/nearai/ironclaw/pull/5589) 修复 ✅
- [#5556](https://github.com/nearai/ironclaw/issues/5556) 侧边栏高亮残留 (P3) → 被 [#5592](https://github.com/nearai/ironclaw/pull/5592) 修复 ✅
- [#5676](https://github.com/nearai/ironclaw/issues/5676) Run State N+1 查询 (Perf) → 已关闭（文档体现）

---

## 6. 功能请求与路线图信号

#### 🚩 确定进入路线图或已有实施的特性

- **国际化（i18n）**：PR [#5685](https://github.com/nearai/ironclaw/pull/5685) —— 全 11 种语言的 Shell / Chat / Extensions 翻译就绪。下一版本大概率涵盖。
- **Slack 最小权限模型**：Issue [#5669](https://github.com/nearai/ironclaw/issues/5669) + PR [#5670](https://github.com/nearai/ironclaw/pull/5670) —— 安全改进，遵循零信任原则。
- **Dogfooding 自动化**：PR [#5580](https://github.com/nearai/ironclaw/pull/5580) —— IronLoop 自身 Agent 已可自动处理机 Review 和小修复。
- **LLM 提供商兼容层修复**：PR [#5665](https://github.com/nearai/ironclaw/pull/5665) —— 修复第三方模型 Tool Call 格式错乱。

#### 💡 来自社区的信号

- 企业级用户正在关注 **OAuth Scope 粒度**（#5669）。
- 开发者社区对 **性能优化** 表现出极高关注度，8 个性能 Issue 虽无评论，但其覆盖面之广本身就是强烈的“性能需要升级”的信号。
- **模型生态兼容性**（#5665）是撬动更多非 OpenAI 用户的关键。

---

## 7. 用户反馈摘要

根据今日活跃的 Issues 及评论提炼：

**😣 典型痛点：**

1. **审批面板不可靠**（#5553）：用户希望运行自动化 `web-access.search` 等需要审批的网络能力时，通知要么闪一下就消失，要么根本不出现。“任务无响应”导致初次体验非常沮丧。
2. **移动端基本不可用**（#5554）：用户报告“自动化长提示词或代码块”直接撑破屏幕，出现横向滚动条，且终端按钮错位。这导致部分移动端用户直接放弃使用。
3. **日志诊断链路断裂**（#5557）：深层链接失效，从 Run Detail 跳转日志页无法自动定位，用户需要手动复制 URL 再次打开。“每次都要点两次，很消磨耐心。”

**👍 亮点与认可（间接）：**

- 用户对 **“No thread attached”**（#5507）问题今次得到修复感到欣慰——该问题之前完全阻塞了运行失败的调试路径。
- 虽然性能 Issue 是今日新发，但社区中资深用户（贡献者 @serrrfirat 代表）正在主动深入地扫描代码中的性能陷阱，这种 **“内部驱动的高标准”** 本身就是项目健康的体现。

---

## 8. 待处理积压与关注提醒

以下是当前需要维护者或社区重点关注、但暂未有讨论或动作的项目：

| ID | 标题 | 待处理时间 | 风险/原因 |
|---|---|---|---|
| [#4108](https://github.com/nearai/ironclaw/issues/4108) | Nightly E2E failed | ⏳ **36 天** | Web-regressions 长期失败，恐掩盖其他真实回归。若持续到下一版本发布可能导致灾难 |
| [#4841](https://github.com/nearai/ironclaw/pull/4841) | reborn: no run-borking failures | ⏳ **23 天** | 巨型 PR Stack（4个PR堆叠），长期 Merge 冲突风险极高，需要投入资源加速 Review |
| [#5557](https://github.com/nearai/ironclaw/issues/5557) | Logs深度链接需点击两次 | ⏳ **4 天** | 虽为 P3，但复现路径稳定，影响首次日志诊断体验，目前无人 assign 且无 fix PR |

**建议行动：**
- 本周内安排一次 [#4108](https://github.com/nearai/ironclaw/issues/4108) 的专项排查，修复 E2E 失败。
- 考虑将 [#4841](https://github.com/nearai/ironclaw/pull/4841) 拆分为更小的可合并单元，避免因体型过大而被无限搁置。
- 为性能审查的 8 个 Issue 打上 `perf` / `tech-debt` / `milestone` 标签，归入近期 Sprint 进行工作量估算。

---

**总结：** IronClaw 在 2026-07-06 这个“数据日”里展示了一个在快速迭代中依然坚持以高标准要求自己的项目形象。性能审计、架构重构（Slack + i18n）、Bug Bash 修复三线并进。接下来的几天，**PR #4841 的合并进展** 和 **#4108 E2E 的下文** 将是判断项目近期节奏快慢的关键观察点。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 | 2026-07-06

## 1. 今日速览
- 项目今日进入了密集的功能交付期，**合并/关闭了 8 个 Pull Requests**，覆盖了 Agent 引擎、提供商支持、邮件技能和 UI 体验等多个模块。
- 没有新 Issue 被创建，也没有新的版本发布，表明团队正在集中精力将已完成的功能落地，而非处理突发 Bug。
- 值得关注的是，**心跳（Heartbeat）成本控制策略** 与 **xAI（Grok）OAuth 集成** 是今日的核心亮点，体现了项目在成本控制和模型生态扩展上的深思熟虑。
- 整体活跃度非常高，虽然社区评论互动较少，但代码层的产出极为高效，项目健康度评价为 **"优秀"**。

---

## 2. 版本发布
无

---

## 3. 项目进展

**Agent 引擎心跳与成本控制**
推进了 OpenClaw 引擎的“心跳”机制。新增了可视化开关设置（Settings > Agent Engine）和成本控制策略，并自动修复遗留的 `HEARTBEAT.md` 文件。即使心跳文件缺失，也能防止无限制的模型调用，直接化解了用户对 API 调用成本的焦虑。
- [#2280 [CLOSED] feat(openclaw): add heartbeat cost-control policy and legacy file repair](https://github.com/netease-youdao/LobsterAI/pull/2280)
- [#2278 [CLOSED] feat(openclaw): add heartbeat toggle setting](https://github.com/netease-youdao/LobsterAI/pull/2278)

**xAI (Grok) 提供商集成**
正式支持通过浏览器 PKCE 登录 xAI，并附带设备码回退兜底方案。认证凭据安全写入 OpenClaw 配置存储，并注册了 Grok 模型目录。同时，将内置的 xAI 插件加入隐藏同步列表，避免与用户自行安装的插件冲突。
- [#2276 [CLOSED] feat(providers): add xAI (Grok) OAuth login support](https://github.com/netease-youdao/LobsterAI/pull/2276)
- [#2279 [CLOSED] fix(plugins): hide bundled xai plugin from sync](https://github.com/netease-youdao/LobsterAI/pull/2279)

**MCP 配置稳定性修复**
修复了一个关键 Bug：在编辑或切换 MCP 服务器传输类型时，旧的 Headers、Env 和 Args 配置无法被清空，导致配置残留和连接失败。此修复确保了 MCP 配置编辑的幂等性和正确性。
- [#2277 [CLOSED] fix(mcp): clear stale transport config](https://github.com/netease-youdao/LobsterAI/pull/2277)

**邮件技能多账户支持**
内置的 IMAP-SMTP 邮件技能迎来了重大升级，支持多账号管理。新增了设置面板，支持启用/禁用、默认账户、提供商预设、连接测试和删除确认。完美兼容旧版单账户 `.env` 配置。
- [#2275 [CLOSED] Liuzhq/optimize email](https://github.com/netease-youdao/LobsterAI/pull/2275)

**Cowork 首页与任务 UI 优化**
为 Cowork 主页添加了基于时段的问候语和最近任务快速恢复入口，提升了亲和力。同时，定时任务列表卡片进行了重新设计，引入了状态标签、搜索功能和乐观 UI 反馈，交互体验大幅提升。
- [#2274 [CLOSED] feat(cowork): add time-aware greeting and recent tasks to home view](https://github.com/netease-youdao/LobsterAI/pull/2274)
- [#2273 [CLOSED] feat(scheduledTask): task list card redesign with status chip/toggle/search/optimistic UI feedback](https://github.com/netease-youdao/LobsterAI/pull/2273)

---

## 4. 社区热点
今日公开记录中没有新增 Issue 评论，已合并的 8 个 PR 也未产生公开讨论。

**趋势分析**：尽管缺少直接的对话热度，但今日合并的 PR **本身就是对社区热点需求的强力回应**：
- **xAI (Grok) 的集成**（#2276）无疑是近期用户呼声最高的模型接入申请，标志着从闭源生态到开源集成的关键一步。
- **心跳成本控制**（#2280）针对高频 Agent 调用场景下的费用不可控问题，精准打击了重度用户的核心痛点。
虽然没有评论，但这批合并是最有力、最直接的社区反馈。

---

## 5. Bug 与稳定性

| 严重程度 | Bug 描述 | 修复状态 |
|---|---|---|
| **中** | **MCP 传输配置残留 Bug**：在编辑或切换传输类型（如 SSE 改 Stdio）时，旧的 Headers/Env/Args 无法被清空，直接导致 MCP 连接异常。 | ✅ 已通过 #2277 修复并合并 |
| **低** | **遗留心跳配置文件异常**：旧版 `HEARTBEAT.md` 文件格式可能引发无限制模型轮询，存在隐性费用风险。 | ✅ 已通过 #2280 的自动修复逻辑一并处理 |

- [PR #2277 fix(mcp): clear stale transport config](https://github.com/netease-youdao/LobsterAI/pull/2277)
- [PR #2280 feat(openclaw): add heartbeat cost-control](https://github.com/netease-youdao/LobsterAI/pull/2280)

---

## 6. 功能请求与路线图信号

- **模型生态扩展**：将 xAI (Grok) 纳入提供商矩阵（#2276），印证了路线图向多元化、前沿模型集群靠拢的信号。
- **商业级成本治理**：心跳成本控制策略（#2280）和开关（#2278）的推出，标志着项目在面向企业级或重度个人用户时，已将 **成本可观测性和可控性** 提升为核心考量。
- **原生生产工作流强化**：邮件多账户（#2275）与任务 UI 重设计（#2273）表明，项目正在从简单的 Agent 框架向 **全栈式个人 AI 工作助理** 进化。

---

## 7. 用户反馈摘要
今日无直接 Issue 反馈可提取。

**间接推断**：
- 通过 **邮件多账户**（#2275）的合并，可以推断用户对于跨账户邮件处理的需求非常迫切。
- **心跳成本控制**（#2280）是对封闭生态中 API 费用不可控的普遍担忧的回应。
- **MCP 配置 Bug**（#2277）的快速修复表明团队对用户触达的复杂配置体验高度重视并快速响应。

---

## 8. 待处理积压
当前项目待处理积压为 **零**。
- 过去 24 小时内：**无**待合并的 PR，**无**待解决的新 Issue。
- 这反映出项目维护者拥有极高的响应效率，或正处于一个冲刺结束后、新冲刺开始前的队列清空期。对于维护者而言，这意味着可以立即规划下一阶段的迭代方向。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

好的，作为 AI 智能体与个人 AI 助手领域开源项目分析师，根据您提供的 QwenPaw 项目 GitHub 数据，现将 2026-07-06 的项目动态日报整理如下：

---

# QwenPaw 项目动态日报 | 2026-07-06

## 1. 今日速览

QwenPaw 在过去 24 小时保持了极高的开发与社区活跃度，共处理 **30 条 Issues** 和 **41 条 PR**，其中 **20 条 PR** 已被合并或关闭。虽然今日无新版本发布，但项目在稳定性修复（Cron 时区、OpenRouter OAuth、Mission Mode 接入 Runtime 2.0）和功能扩展（Azure Bot 渠道、桌面端 Node 捆绑、AI Review Bot）上均有显著推进。值得注意的是，团队今日集中提交了覆盖核心模块的数百个回归测试用例，表明项目正为 v2.0 正式版的发布进行最后的系统性质量加固。

## 3. 项目进展

今日项目在核心修复与功能演进上实现双线突破：

**重点合并 PR：**
- **核心架构修复**：将任务模式（Mission Mode）完整融入 Runtime v2 架构 (`#5442`)，并修复了 `spawn_subagent` 在 Runtime 2.0 中的工具注册问题 (`#5524`)。
- **关键Bug修复**：恢复在 Runtime 2.0 重构中被丢弃的 OpenRouter OAuth 路由 (`#5806`)，修复 Cron 定时任务不按配置时区记录时间戳的问题 (`#5783`)，以及控制台前端 `/api/api/` 双前缀导致接口 404 的阻塞问题 (`#5769`)。
- **安全加固**：修复控制台插件市场跳转绕过外部链接守护的问题 (`#5750`)。

**功能板块推进：**
- **渠道生态扩展**：PR `#5762` 成功合入主干，新增对 **Azure Bot Framework** 的支持，覆盖 Teams、Slack、Telegram 等企业级平台。
- **桌面端体验优化**：PR `#5814` 为桌面版捆绑 Node 运行时，方便直接运行 ACP 智体；PR `#5805` 新增 Tauri DevTools 入口，便于排查前端性能问题。
- **CI/CD 自举**：PR `#5736` 引入 AI Review Bot，利用 QwenPaw 自身能力对 GitHub PR 进行结构化审查。

**测试基建里程碑级投入：**
开发人员 `@hanson-hex` 今日集中提交了 7 个回归测试 PR（`#5807`~`#5813`），为 Runtime、Channels、Approvals、Inbox 及多个前端模块新增了超过 300 个测试用例。这标志着项目正在系统性地大幅提升其质量保障水平。

## 4. 社区热点

- **Runtime 2.0 核心异常 (#5717)**：该议题揭露了畸形的工具调用（tool_call.input 截断）导致 Agent 陷入无限循环执行工具的严重问题，直接关系到 v2.0 在复杂 Agent 场景下的可用性。虽已有回归测试 PR 覆盖，但社区仍在等待具体修复方案合并。
- **自动记忆功能失灵 (#5775)**：`auto_memory_interval` 在 v2.0.0b3 中完全失效的问题引发了广泛讨论，这对于依赖长期会话记忆的用户体验影响较大。对应的重构 PR (`#5815`) 已提交，指明了 MemoryMiddleware 状态丢失的根因。
- **IM 长连接上下文粘滞 (#5776)**：社区报告在长连接 QQ/IM 会话中，AI 智体可能误将数天前的历史消息当作当前任务进行响应，揭示了长上下文管理中的潜在挑战。
- **架构深度讨论 (#5767)**：社区用户深入剖析了 Console SDK 因单会话 Pull 模型而阻塞多智体/多工作空间演进的问题，展现了企业级用户对高级功能的迫切需求。

## 5. Bug 与稳定性

按严重程度排列，今日报告的 Bug 如下：

**严重/阻塞：**
- `#5816`：`ImportError: SetSessionModelResponse`，安装后启动即报错，完全阻塞应用。
- `#5717`：Runtime 2.0 畸形工具调用导致死循环，严重功能阻塞。
- `#5775`：自动记忆完全失效，破坏核心记忆功能。
- `#5789`：上下文压缩时模型输出超过 JSON Schema 限制导致 `validate()` 崩溃。
- `#5757`：飞书频道仅首次回复，后续消息无响应。
- `#5748`：工具调用失败导致 Agent 假死，消费者线程永久卡死且 Typing 指示器不停转。

**中等/轻微：**
- `#5784`：跨 Provider 同名模型导致前端压缩阈值显示错误（已有关联修复 PR `#5786`）。
- `#5782`：Google Gemini Embedding 在 OpenAI 兼容模式下静默回退为关键词搜索，用户无法感知。
- `#5790`、`#5787`、`#5771`：分别涉及前端加载动画不消失、移动端页面底部截断及 WARNING 日志刷屏。

## 6. 功能请求与路线图信号

- **多租户/团队协作（强烈路线图信号）**：`#5780` 提出的多用户账号管理功能是当前最受期待的功能请求，暗示项目正在从个人助手向团队协作平台演进。今日 `#5762` Azure Bot 渠道的合并与之形成了良好的路线图呼应。
- **区域化渠道扩展**：`#5168` (Zalo Bot 渠道) 已存在三周，展示了越南市场的强烈需求。
- **用户体验选择权**：社区多项请求强调“让用户自己做决定”：定时任务弹窗开关 (`#5797`)、消息时间戳常驻显示 (`#5793`)、隐藏文件夹选择 (`#5785`)。这表明在产品基础功能趋于完善后，精细化的个性化设置成为社区主要诉求。
- **Web 控制台实时性**：`#5795` 要求 Web 控制台实时推送 IM 渠道新消息，凸显了用户对消息同步实时性的高要求。

## 7. 用户反馈摘要

- **满意与期待**：社区对 v2.0 抱有极高期待（“希望惊艳所有人”），并且已有用户自发开发了 GitHub Issue 反馈助手 Skill (`#5567`)，展现了极高的社区贡献热情。
- **核心痛点**：
  - **系统可靠性**：多项严重 Bug 指向了核心功能的稳定性不足（Agent 假死、IM 频道静默、记忆失效），影响了用户在生产环境中的信任感。
  - **流式与大加载体验**：浏览器流式输出卡顿 (`#5725`) 以及大会话前端渲染崩溃 (`#5401`) 是前端性能的主要短板。
  - **配置与管理困惑**：跨服务商同名模型配置串扰 (`#5784`)、技能列表加载不全 (`#5788`) 等细节问题提升了用户的上手成本。

## 8. 待处理积压

- `#5253` (`custom_channel` 监听在保存后宕掉，开放近三周)：影响自定义渠道用户，目前尚未明显关联修复进展。
- `#5168` (Zalo Bot 渠道请求，开放三周)：重要的区域化功能请求，建议维护者给予明确回复或将其纳入社区贡献指引。
- `#5717` (Runtime 2.0 工具循环死锁)：尽管已有测试 PR 覆盖，但直接修复尚未合并，建议优先推进修复 PR。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>