# OpenClaw 生态日报 2026-07-09

> Issues: 500 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-07-09 00:41 UTC

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

好的，这是为您生成的 OpenClaw 项目动态日报。

---

# OpenClaw 项目日报 2026-07-09

## 1. 今日速览

项目今日继续保持极高的活跃度，单日 Issue 和 PR 更新总量均达到 500 条，社区参与度与维护工作量均处于高位。尽管今日没有新版本发布，但项目内部推进显著：多项旨在解决会话死锁、内存与安全问题的修复 PR 进入待审或准备合并状态，显示维护团队正着力解决已知的稳定性顽疾。社区关注的焦点集中在**信息泄漏、会话稳定性**和**子代理可靠性**等关键问题上，多个高优先级 Bug 的修复 PR 正在推进中。

## 2. 版本发布

无

## 3. 项目进展

今日项目在稳定性修复和功能增强上取得重要进展，共有 **98 个 PR 被合并或关闭**。以下几个关键 PR 代表了项目当前的核心工作方向：

- **会话持久化重大重构**：大型 PR **#98236** 正在进行，旨在将会话和转录存储从 JSON 文件切换到 SQLite。这是提升大规模部署下数据一致性和性能的关键一步，但因其影响范围大（涉及所有主流 channel 和 gateway），仍在谨慎评估中。
- **关键会话死锁问题修复**：**#102052** 和 **#101920** 两个 PR 都针对“回复会话初始化冲突”导致会话永久挂起的 bug 提出了自愈修复方案，避免会话“楔死”。这直接回应了社区报告的高优先级问题。
- **稳定性修复合并**：**#99811** 已被关闭（合并），此 PR 为 CLI 增加了对 `extended-stable` 包更新的支持，为运维人员提供了更灵活的版本管理方式。
- **安全性修复准备就绪**：**#101866** 准备就绪，该修复将在回放助理转录内容时，审查并移除未经验证的媒体文件引用，这是对潜在安全风险的重要防范。

总的来说，项目正从“功能开发”转向“稳定性与安全性加固”，大量修复集中在会话管理、数据一致性和隐私安全方面。

## 4. 社区热点

社区讨论热度最高的几个问题，反映了用户在日常使用中最深的痛点：

1.  **文本泄漏与消息污染** (`#25592`, `#44905`, `#39847`)
    - 这是社区最受关注的一类问题。用户报告代理在工具调用之间产生的内部处理文本（如错误处理、执行日志）被错误地路由到用户可见的消息通道（Slack, Discord, Telegram），导致严重的 UX 问题和潜在的信息泄露风险。用户期待严格的内部/外部消息隔离。

2.  **子代理可靠性问题** (`#44925`, `#47975`)
    - 当主代理调起子代理完成任务时，子代理的完成状态（成功、超时、失败）时常被静默丢失，导致任务悬空或主会话变得无响应。用户反馈这严重破坏了复杂工作流的可靠性，要求引入超时通知、自动重试和清晰的状态管理机制。

3.  **会话与内存状态混乱** (`#43747`, `#85333`, `#49603`)
    - 多位用户报告了会话状态管理的不一致性和性能退化。例如 `openclaw doctor --fix` 命令在版本更新后性能下降了 4-5 倍，锁文件清理逻辑有缺陷，以及不同用户间内存管理行为不一致。社区希望项目能提供更健壮、可预测的状态管理机制。

- **最热 Issue**: [#25592 Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592) (35条评论)
- **最受关注 Feature**: [#42840 Feature Request: Add MathJax/LaTeX Support to Control UI](https://github.com/openclaw/openclaw/issues/42840) (9个 👍)

## 5. Bug 与稳定性

今日报告的 Bug 问题主要集中在**性能回归**、**会话死锁**和**数据泄漏**三大领域，总体严重程度较高。

**P0 / Release-Blocker 级别**:
- **会话无限挂起**: `#43661` 会话在压缩超时后会无限挂起，并导致重复消息发送，严重影响用户体验。
- **文档滞后于发布**: `#48920` 在线文档提到的 `IsolatedSessions` 配置在实际发行版中不存在，导致用户困惑和配置失败。

**P1 / 高优先级**:
- **性能回归**: `#85333` `openclaw doctor --fix` 在某个小版本更新后性能退化 4-5倍，经诊断是会话快照路径遍历导致的瓶颈。
- **核心功能崩溃**: `#38327` 在特定模型 (`google-vertex/gemini-3.1-pro-preview`) 下出现 `Cannot convert undefined or null to object` 的运行时错误。
- **数据与隐私泄漏**:
    - `#25592` 工具调用间文本泄漏到通道。
    - `#44905` Discord 通道泄漏内部工具调用痕迹，如 `NO_REPLY` 和 `to=functions`。
    - `#45740` `gh-issues` 技能将 Issue 正文直接注入子代理提示，构成提示注入攻击面。
- **死锁与无响应**: `#43367` 多代理编排不稳定； `#49603` 孤立的锁文件未能在网关重启时正确清理，可能导致服务不可用。

**已有 Fix PR 的关键 Bug**:
- `#43661` (会话挂起): 修复 PR **#96230** (已提交，等待审查)
- `#101909` (类似会话初始化冲突导致楔死问题): 修复 PR **#101920** (已进入待审查状态)
- `#97747` (嵌入式代理触发溢出恢复压缩时的死锁问题): 修复 PR **#101928** (已提交，等待审查)

> *注：更多 Bug 细节可查看 [P1 级别 Issue 列表](https://github.com/openclaw/openclaw/labels/P1) 。*

## 6. 功能请求与路线图信号

用户提出的功能需求体现了他们对更专业、更可控工具链的诉求：

- **明确的安全边界与访问控制**:
    - `#39604` 请求增加 `tools.web.fetch.allowPrivateNetwork` 配置，允许在显式启用后访问私有网络地址，反映了企业级部署的安全需求。
    - `#42475` 请求在网关层面实现按代理的成本预算强制执行，展现了运营人员对成本控制的需求。
- **增强的配置与自定义能力**:
    - `#45565` 请求将网关生命周期警告路由到专用通道，以隔离系统噪音。
    - `#42840` 请求在 Web UI 中支持 MathJax/LaTeX，面向需要处理数学公式的用户。
    - `#45758` 请求支持 YAML 格式的配置文件，以提高可读性和与生态工具的兼容性。
- **架构演进前瞻**:
    - RFC `#42026` 提出了分布式代理运行时的构想，将控制平面与计算分离，这是一个潜在的架构演进方向，但目前仍处于早期讨论阶段。

结合现有的 PR（如 `#97340` 支持多 Teams 账号），可以看出项目正在积极响应社区对**企业特性、安全性、自定义能力**的呼声，并开始探索架构层面的优化。

## 7. 用户反馈摘要

从 Issue 和 PR 的讨论中，可以提炼出用户的真实体验反馈：

- **高期望与高要求**：用户将 OpenClaw 作为生产力工具，对其稳定性和可靠性有极高的要求。任何形式的状态丢失、消息重复或性能退化都会立刻被报告并引发讨论。
- **配置复杂度是双刃剑**：一方面，用户赞赏提供 `responsePrefix`、`memory flush`、`per-agent budget` 等精细控制能力；另一方面，复杂的配置项（如 `auth.order` 失效 `#46031`）和配置错误（如 `OPENCLAW_HOME` 嵌套目录 `#45765`）也带来了较高的学习成本和出错概率。
- **多 Agent 与多模态场景是痛点**：用户在真实的多 Agent 协作和文件（如图片、媒体）处理场景中遇到了较多问题，例如子代理任务丢失 (`#44925`)、Feishu 图片发送失败 (`#41744`)、Telegram 媒体数据丢失 (`#40440`) 等。这表明这部分功能是当前稳定性的薄弱环节。

## 8. 待处理积压

以下是一些长期未关闭或响应的重要问题，它们可能因为缺乏复现步骤或需要维护者决策而停滞：

- `#38327` **Cannot convert undefined or null to object** (2026-03-06上报): 一个影响了多个模型的回归性 Bug，至今未修复，也未标记有关联的 Fix PR。需要维护者重新评估优先级。 [链接](https://github.com/openclaw/openclaw/issues/38327)
- `#41165` **Telegram DMs can still land in agent:main:main** (2026-03-09上报): 作为先前修复的回归问题，路由逻辑依然存在缺陷，但已经长时间没有实质性进展。 [链接](https://github.com/openclaw/openclaw/issues/41165)
- `#45314` **Early abort response templates are not populated** (2026-03-13上报): 一个影响用户体验的模板渲染 Bug，已被标记为 `stale`。 [链接](https://github.com/openclaw/openclaw/issues/45314)

这些积压问题虽然可能不是当前最紧急的，但若持续忽略，会逐渐侵蚀用户对项目响应速度的信心。建议维护团队进行一次专项梳理，对这些长期问题给予明确的状态更新（如：无法复现、计划在 X 版本修复、或已完成设计待排期）。

---

## 横向生态对比

# 个人 AI 智能体开源生态横向对比报告（2026-07-09）

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于 **密集迭代与分化加速** 的阶段。社区对“可靠运行”的关注已超越“功能堆叠”，会话死锁、信息泄漏、子代理失控成为多个顶级项目的共同瓶颈；与此同时，插件化架构（WASM/OCI）、**非交互式运维**与**多代理协作**成为三大增量主线。头部项目（OpenClaw、Zeroclaw、CoPaw）每日 PR 吞吐量均在 50 条以上，但大量修复仍积压，呈现“高活跃但高负债”的典型冲刺期特征。另一个显著信号是 **渠道体验的一致性** 开始受到严肃对待——飞书、Discord、Telegram 等 IM 平台的稳定性缺陷频繁进入 P0/P1 列表，说明 Agent 正在从 demo 走向生产力工具。

## 2. 各项目活跃度对比

| 项目 | 今日 Issue 更新 | 今日 PR 更新 | 今日 PR 合并/关闭 | 版本发布 | 健康度评估 |
|------|----------------|-------------|------------------|---------|-----------|
| **OpenClaw** | 500+（总量） | 500+（总量） | 98 合并/关闭 | 无 | ⚠️ 中（P0/P1 较多但有修复推进） |
| **Zeroclaw** | 50（40新/10关） | 50（29待/21合） | 21 合并/关闭 | 无 | ✅ 良（插件落地快，S0/S1待解） |
| **CoPaw (QwenPaw)** | 38（14新/24关） | 46（31待/15合） | 15 合并/关闭 | v2.0.0-beta.4 | ⚠️ 中（上下文丢失严重但发布节奏快） |
| **IronClaw** | 21 更新 | 50 更新 | 未明确（大量待合） | 无 | ⚠️ 中（发布 PR 阻塞 14 天，P2 Bug Bash） |
| **NanoClaw** | 2 新 Issue | 28 更新（4 合） | 4 合并/关闭 | 无 | ✅ 良（架构冲刺，核心推进力强） |
| **LobsterAI** | 若干（未列总数） | 10 合并 | 10 合并 | 无 | ✅ 优（当日修复+社区 PR 清理） |
| **NanoBot** | 3 安全 Issue 关闭 | 12 合并/关闭 | 12 合并/关闭 | 无 | ✅ 良（安全响应快，依赖管理有遗漏） |
| **PicoClaw** | 2 新 Issue | 3 合并 | 3 合并 | 无 | ⚠️ 中（NanoKVM 平台兼容漏洞未解） |
| **Moltis** | 0 新开 | 1 PR（待审） | 0 合并 | 无 | 🔴 低（社区沉默，单 PR 阻塞） |

*注：Issue/PR 更新指包含新开、关闭、评论在内的活动总量，PR 合并不包含重复计数。健康度综合 Bug 严重性、响应速度和发布节奏。*

## 3. OpenClaw 在生态中的定位

OpenClaw 是生态中 **社区规模最大、覆盖面最广** 的通用型 Agent 框架，但其优势与风险同样突出：

- **规模优势**：单日 500+ 更新量远超其他项目（接近 IronClaw 或 Zeroclaw 的 10 倍），Issue 讨论密度高（#25592 达 35 条评论），反映用户基础庞大。
- **技术路线差异**：与 Zeroclaw 的 WASM 插件化不同，OpenClaw 当前重心是**稳定性基建**——会话持久化从 JSON 切换到 SQLite（#98236）、死锁自愈（#102052）等，表明其优先保证大规模部署的一致性和可回溯性，而非扩展性。
- **安全投入领先**：回放媒体引用检查（#101866）、工具调用文本泄漏治理（#25592）等安全相关 PR 密集，与 NanoBot 的 WebUI 令牌修复、Zeroclaw 的 .ignore 文件机制形成呼应。
- **短板**：子代理可靠性（#44925）和会话状态混乱（#49603）等 P0/P1 问题积压时间较长，与 LobsterAI 当日报修当日修的速度相比，OpenClaw 的修复周转稍显不足。

**对比定位：OpenClaw 是“重型战舰”，适合需要全渠道覆盖和高可控性的企业部署；Zeroclaw 是“插件航母”，适合希望自定义扩展的开发者团队；CoPaw 则是“区域快艇”，对中文 IM 和 Qwen 模型生态深度优化。**

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 典型诉求 |
|----------|---------|----------|
| **会话稳定性与死锁** | OpenClaw (#102052)、Zeroclaw (#6034)、CoPaw (#5860) | 多轮对话中消息丢失、无限挂起、上下文错乱 |
| **安全边界与隐私保护** | OpenClaw (#25592)、NanoBot (#4825)、Zeroclaw (#8424)、CoPaw (#5866) | 内部文本泄漏到 IM、Token 未授权发放、敏感文件读取 |
| **多 Agent/子代理可靠性** | OpenClaw (#44925)、LobsterAI (#2285)、NanoClaw (#1702) | 子代理状态静默丢失、任务悬空、IPC 消息错乱 |
| **插件化/WASM 扩展** | Zeroclaw (#8852/#8863)、IronClaw (#5499)、CoPaw (#5801 新频道) | 以 WASM 或 OCI 方式动态加载通道、工具、技能 |
| **自动化运维与 Headless** | NanoBot (#4852)、IronClaw (#5855)、NanoClaw (#2980)、LobsterAI (#1347) | 非交互式配置、压测装备、计划任务/定时作业 |
| **IM 渠道体验一致性** | OpenClaw (#44905 Discord)、PicoClaw (#3201 QQ)、CoPaw (#5757 飞书) | 流式输出缺失、附件丢失、路由错误 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Zeroclaw | CoPaw | IronClaw | NanoClaw | LobsterAI | NanoBot | PicoClaw | Moltis |
|------|----------|----------|-------|----------|----------|-----------|---------|----------|--------|
| **功能侧重** | 全渠道稳定性 | 插件架构+安全 | 中文 IM+上下文压缩 | 统一扩展表面+ReBorn | CLI+任务调度 | 多智能体协作 | 轻量安全+自动化 | AIOps+硬件绑定 | 日历集成 |
| **目标用户** | 企业运维、集成商 | 开发者、插件制作者 | 中文用户、Qwen开发者 | 中型组织、SaaS平台 | DevOps、自动化工程师 | 团队协作、多Agent设计者 | 个人开发者、中小企业 | NanoKVM/IoT开发者 | CalDAV 用户 |
| **架构差异化** | 单体+SQLite重构 | WASM运行时+OCI分发 | scroll上下文保护 | Extension模型收敛 | 计划任务列车 | Delegated Subagent | 依赖轻量+Hook机制 | Tauri+Gateway回退 | 专注单模块 |
| **今日最大进展** | 会话死锁修复 | WASM通道插件运行 | v2.0b4发布 | NEA-25重构栈 | CLI参数系统 | 委托子代理协作 | 非交互配置 | 视觉模型修复 | Panic修复PR |
| **薄弱环节** | 子代理可靠性 | S0/S1 Bug阻塞 | 上下文丢失 | 发布阻塞 | 静默失败 | 定时任务校验缺失 | 依赖管理遗漏 | 硬件兼容性 | 社区沉寂 |

## 6. 社区热度与成熟度分层

**第一梯队：极高活跃 + 大社区（每日 50+ 更新）**  
- **OpenClaw**：500+ 更新，98 PR 合并；成熟度高但 Bug 密，处于“功能转稳定”中期。  
- **Zeroclaw**：100 条更新，21 合并；插件方向迅速落地，S0/S1 Bug 阻碍成熟。  
- **CoPaw (QwenPaw)**：84 条更新，15 合并；发布 v2.0b4，上下文问题成关键瓶颈。  
- **IronClaw**：71 条更新；架构重构主力期，发布流程阻塞影响交付节奏。

**第二梯队：中等活跃，聚焦收敛（每日 10-30 更新）**  
- **NanoClaw**：28 PR 更新，4 合并；时刻表列车冲刺，社区互动较低。  
- **LobsterAI**：10 合并；当日修复+社区 PR 清理，健康度最佳。  
- **NanoBot**：12 合并；安全响应快，自动化功能逐步补齐。

**第三梯队：低活跃，稳定迭代（每日 <5 更新）**  
- **PicoClaw**：3 合并；紧急修复后进入沉淀期，平台兼容性存隐患。  
- **Moltis**：几乎无声，单一 PR 阻塞超 24h，需维护者主动激活。

**结论**：生态处于 **“头部高负载迭代，尾部不活跃”** 的分化状态。LobsterAI 和 NanoBot 虽然规模较小，但凭借高响应速度成为质量标杆；而 OpenClaw 和 Zeroclaw 虽体量大，却背负更多稳定性债务。

## 7. 值得关注的趋势信号

### 🔹 1. “静默失败” 触发用户信任危机
多个项目的高赞 Issue 指向 Agent 完成任务却不返回任何反馈（NanoClaw #2985、OpenClaw #43661、CoPaw #5757）。**参考价值**：Agent 框架必须内置“超时/失败-通知”协议，任何非预期结果（包括成功但投递失败）都应产生显式告警，否则用户会将下游问题归因于 Agent 不可靠。

### 🔹 2. 运维自动化需求从“可选项”变为“必选项”
NanoBot 的 `--refresh`、NanoClaw 的 `ncl tasks`、IronClaw 的压测装备（#5855）均指向**无人值守/CI 集成场景**。**参考价值**：新项目在设计 API 时即应考虑“headless 模式+声明式配置”，并提供健康检查和成本预算接口，这是 Agent 进入生产环境的准入门槛。

### 🔹 3. 抽象安全的精细化：从“全局白名单”到“逐文件/逐变量”
Zeroclaw 的 `.ignore` 机制和 per-agent secrets（#8226）、OpenClaw 的 `allowPrivateNetwork`（#39604）表明，**单一的安全策略无法满足企业级需求**。**参考价值**：Agent 应提供多层级的安全控制（工作区级→代理级→工具级），并支持动态掩码变量引用，而不是简单依赖 `DENY ALL` 或 `ALLOW ALL`。

### 🔹 4. Agent 从“对话机”向“任务引擎”演进
计划任务（NanoClaw #2981、LobsterAI #1347）、cron（Zeroclaw #5862）、Routine（IronClaw #5836）共同勾勒出 **“智能定时+持续后台运行”** 的路线。**参考价值**：开发者应预留会话隔离、状态快照和可中断/恢复的执行模型，以支持非持久连接的长期任务。

### 🔹 5. 中文 IM 市场成为独立战场
CoPaw 的飞书修复、PicoClaw 的 QQ 流式请求、LobsterAI 对 IM 会话隔离的修复，反映中文用户对 **微信/飞书/QQ/钉钉** 的集成需求远高于英文社区。**参考价值**：国际化 Agent 框架应考虑 IM 适配的抽象层，并针对长轮询、流式输出、文件上传等差异做统一处理，否则将丢失快速增长的中文市场。

---

**总结**：当前生态正在从“能跑就行”转向“跑得稳、守得住、能扩展”。**OpenClaw 和 Zeroclaw 代表了两种主流路径（一体化 vs 插件化），而 LobsterAI 和 NanoBot 则验证了“小团队快响应”模式的可行性。** 对于技术决策者而言，选择哪条路线取决于对“长期技术债容忍度”的判断——在高速迭代期，任何未根治的会话丢失或安全泄漏都可能在未来数周内反噬为 P0 事件。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

好的，作为AI智能体与个人AI助手领域开源项目分析师，以下是根据您提供的NanoBot GitHub数据生成的2026-07-09项目动态日报。

---

### NanoBot 项目日报 (2026-07-09)

#### 1. 今日速览

- **高活跃度，重点在安全加固与核心稳定性**：今日项目合并/关闭了12个PR，其中3个安全议题（#4825, #4826, #4827）被高度重视并快速关闭，对应的修复PR也已合并，体现了项目对安全问题的快速响应。
- **自动化与开发者体验增强**：社区贡献热度高，不仅修复了Slack依赖缺失等Bug，还合入了非交互式配置刷新功能（#4852），并持续优化了Docker构建、文档入口等开发者体验。
- **新功能积极探索中**：除了修复工作，社区也提交了关于时间工具、MCP稳定性、WebUI Diff视图等多个方向的新功能PR，项目架构演进活跃。
- **总体评估**：项目今日处于“活跃”状态，开发活动密集，社区贡献积极，维护者响应迅速，尤其在安全领域表现出色。

#### 2. 版本发布

- **无新版本发布**

#### 3. 项目进展

今日合并/关闭了12个PR，项目在以下方面取得明确进展：

- **安全漏洞修复 (核心进展)**：
    - `fix(webui): gate bootstrap API token issuance` [#4849](https://github.com/HKUDS/nanobot/pull/4849) **(已合并)**: 修复了WebUI bootstrap接口在未配置密钥时，向本地未授权请求发放API Bearer Token的严重漏洞。这是对今日关闭的三个安全Issue的直接修复。
    - 相关联的 `fix(webui): restore localhost bootstrap API tokens` [#4856](https://github.com/HKUDS/nanobot/pull/4856) **(待合并)**: 在加固安全的同时，恢复了本地开发/使用的便捷性，体现了安全与易用性的平衡。

- **功能增强与自动化**:
    - `Feature: non-interactive config refresh with 'nanobot onboard --refresh'` [#4852](https://github.com/HKUDS/nanobot/pull/4852) **(已合并)**: 社区贡献者`@alekwo`解决了自动化部署场景的痛点，允许非交互式刷新配置文件。

- **代码架构与文档优化**:
    - `refactor(agent): extract turn hook assembly` [#4848](https://github.com/HKUDS/nanobot/pull/4848) **(已合并)**: 对Agent循环逻辑进行重构，将Hook组装逻辑抽离，提升了代码的可维护性和可测试性。
    - `docs: improve search entry pages` [#4850](https://github.com/HKUDS/nanobot/pull/4850) **(已合并)**: 优化了文档搜索入口，有助于降低新用户的上手门槛。

- **依赖与构建修复**:
    - `[Bug]: aiohttp missing in the slack dependencies in pyproject.toml` [#4829](https://github.com/HKUDS/nanobot/issues/4829) **(已关闭)**: Slack插件依赖缺失问题被发现并修复，保证了Slack集成的可用性。

#### 4. 社区热点

今日讨论最活跃的议题并非新产生，而是历史遗留问题被关闭。

- **架构讨论收尾**：`#2463` [Architectural issue: nanobot does not preserve the exact prompt prefix it previously sent](https://github.com/HKUDS/nanobot/issues/2463) 在积累了13条评论后被关闭。该议题讨论了一个深层架构问题：NanoBot持久化的历史记录与发送给模型的提示前缀不一致。这个议题触及了项目核心设计原则，虽然关闭，但其背后对于**数据完整性和模型交互透明度**的诉求值得长期关注，尤其是在依赖精确上下文的任务中。
- **快速响应的安全关注**：`#4825`, `#4826`, `#4827` 三个关于WebUI令牌发放的安全漏洞在同一天被提出并关闭。虽然评论数不多，但这表明社区安全研究员（`@YLChen-007`）正在主动审计项目，且维护者响应迅速。这反映了社区对**生产环境安全性**的高度关注。

#### 5. Bug 与稳定性

- **严重：安全漏洞（已修复）**：
    - **WebUI API令牌未授权发放** [#4825](https://github.com/HKUDS/nanobot/issues/4825) / [#4826](https://github.com/HKUDS/nanobot/issues/4826) / [#4827](https://github.com/HKUDS/nanobot/issues/4827): 允许本地未鉴权进程获取WebUI的API Bearer Token。此漏洞已被修复，修复PR [#4849](https://github.com/HKUDS/nanobot/pull/4849) 已合并。
- **中等：构建与依赖问题（已修复）**：
    - **Slack依赖缺失** [#4829](https://github.com/HKUDS/nanobot/issues/4829): 构建Slack插件时缺少`aiohttp`依赖，导致无法启用。此问题已修复。
- **待观察的PR（风险待验证）**：
    - `fix(mcp): isolate reconnect cancel scopes to prevent gateway crash` [#4764](https://github.com/HKUDS/nanobot/pull/4764): 该PR作者自述修复MCP重连时Gateway崩溃的问题，但承认“不是最优雅的方式”。此PR已存在数日且评论为`undefined`，有一定复杂度，需要维护者仔细Review。

#### 6. 功能请求与路线图信号

- **高潜力纳入特性**:
    - **非交互式配置**: Issue `#4851` ([enhancement] Feature: non-interactive config refresh) 提出的自动化运维需求，已被同一作者在PR `#4852` 中实现并合并。这表明社区和开发者对**自动化、声明式配置管理**有明确需求，很可能成为后续推荐的最佳实践。
    - **Docker构建灵活性**: PR `#4857` (Add Dockerfile arg to override optional Python dependencies) 旨在让用户自定义构建时的依赖项，这符合**容器化部署**的灵活需求，有望被采纳。
- **路线图信号**:
    - 多个PR（如 `#4853` `nano_timer` 核心工具、`#4854` RTK命令重写器、`#4855` 引导配置界面）均为新功能特性，表明项目正在向**更丰富的内置工具集**和**更友好的配置流程**演进。虽然这些PR尚未合并，但它们代表着社区贡献者在该方向上的努力。
    - **长期任务**：PR `#4844` 提出了将“长期目标”功能置于显式运行时模式之下的重构，这对Agent行为的可预测性至关重要，是项目走向成熟的重要标志。

#### 7. 用户反馈摘要

- **痛点：依赖缺失引起的功能不可用**：用户`@alekwo`发现Slack集成因`aiohttp`依赖缺失而无法启动（`#4829`），这暴露了项目在可选的`extras`依赖管理上可能存在测试或文档覆盖不足的问题。
- **需求：静默/自动化运维能力**：用户`@alekwo`提出`nanobot onboard --refresh`的需求（`#4851`），直言当前交互式更新不适合“自动或半自动更新系统”，反映了运维人员对**无头（headless）操作**的迫切需求。
- **对安全性的关注**：安全研究员`@YLChen-007`连续提交三个相关安全漏洞，说明NanoBot在生产环境的**默认安全配置**正在经历社区审计。用户的根本诉求是“配置不当的情况下，系统不至于敞开口子”。
- **对历史功能的关切**：PR `#4847` 指出README中提及的LangSmith功能“在最近的更新后不再工作”，这反映了用户对**文档与事实一致性**的高要求，以及功能回归对用户信任的负面影响。

#### 8. 待处理积压

- **长期未合并的PR**：`fix(discord): preserve forwarded referenced messages` [#2873](https://github.com/HKUDS/nanobot/pull/2873) 创建于2026-04-06，至今已逾3个月。此PR修复了一个明确的Discord消息转发问题，且包含回归测试。鉴于其重要性且长时间未被处理，建议维护者关注或在下次更新中Review。
- **关键Bug修复PR待合并**：
    - `fix(mcp): isolate reconnect cancel scopes to prevent gateway crash` [#4764](https://github.com/HKUDS/nanobot/pull/4764) (优先级P1，已存在2天以上，且作者用了“非优雅方式”)。
    - `fix(mcp): defer stale stack cleanup during reconnect` [#4843](https://github.com/HKUDS/nanobot/pull/4843) (关于MCP重连崩溃的另一修复方案)。
    - **MCP稳定性**相关的两个P1优先级PR已悬而未决数日，鉴于MCP是NanoBot扩展性的重要组成部分，建议尽快评审并推动合并，避免版本累积的技术债务。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 🗓️ Zeroclaw 项目动态日报 — 2026-07-09

## 今日速览

过去24小时项目保持高活跃度：共有 **50 条 Issue 更新**（其中 40 条新开/活跃、10 条关闭）和 **50 条 PR 更新**（29 条待合并、21 条已合并/关闭）。虽然无新版本发布，但社区与核心维护者同时在多个方向发力——严重 Bug 调查（S0/S1）仍在推进，同时围绕插件架构、工作空间安全、兼容性适配的 RFC 讨论与实现进入了密集期。整体健康度良好，正为下一里程碑积蓄变化。

---

## 项目进展

过去24小时共有 **21 个 PR** 被合并或关闭，主要推进了以下方面：

### 🔧 修复与优化（重点）
- **`fix(providers): resolve alias credential for model-catalog`**（[#8861](https://github.com/zeroclaw-labs/zeroclaw/pull/8861)）—— 修复 provider 别名凭证未传递到 model-catalog 的问题，使本地模型下拉菜单（ZeroCode/网关/CLI）能正确工作，解决了 OpenAI 兼容系（xAI/Groq/Groq 等）需手动输入 key 的痛点。
- **`fix(web): add Skills nav entry to left sidebar`**（[#8795](https://github.com/zeroclaw-labs/zeroclaw/pull/8795)）—— 在 Web 仪表盘左侧导航栏添加 Skills 入口（Sparkle 图标），使技能管理页面不再只能通过 URL 访问。
- **`fix(zerocode): use runtime profile max_context_tokens for context meter`**（[#8872](https://github.com/zeroclaw-labs/zeroclaw/pull/8872)）—— 修复 ZeroCode 上下文用量指示器始终显示 32K 默认值的 Bug，现在正确读取运行时 profile 的 `max_context_tokens` 配置。
- **`fix(runtime): classify tool_filter_groups targets by MCP origin`**（[#8819](https://github.com/zeroclaw-labs/zeroclaw/pull/8819)）—— 高风险修复：`tool_filter_groups` 先前对 MCP 工具完全无效果（分类逻辑错误），现在能正确识别 MCP 注册的工具前缀。
- **`fix(daemon): share MCP registry across heartbeat ticks`**（[#8866](https://github.com/zeroclaw-labs/zeroclaw/pull/8866)）—— 修复 daemon 心跳每次重新创建 MCP 连接的问题，对 stdio MCP 服务端可大幅减少进程消耗。
- **`fix(channels): correct bot_token property name in bind-telegram error`**（[#8823](https://github.com/zeroclaw-labs/zeroclaw/pull/8823)）—— 修正 Telegram 绑定错误消息中的属性名（kebab-case → snake_case），降低用户配置困惑。

### ✨ 新功能（已合入）
- **`feat(zerocode): TodoWrite tracker for ZeroCode`**（[#8639](https://github.com/zeroclaw-labs/zeroclaw/pull/8639)）—— 基础特性合并：实现类似 Claude Code / OpenCode 的实时任务追踪面板，包括 `TodoWrite` 工具、RPC 写入及持久化。
- **`feat(plugins): host-mediated outbound WebSocket for channel plugins`**（[#8863](https://github.com/zeroclaw-labs/zeroclaw/pull/8863)）—— 插件系统基础设施：允许 WASM 插件通过宿主中介发起出站 WebSocket 连接，是通道插件离线的关键前提。
- **`feat(channels): run installed WASM channel plugins`**（[#8852](https://github.com/zeroclaw-labs/zeroclaw/pull/8852)）—— 首个调用 WASM 通道插件的实际路径，使安装的插件能够真正启动并运行。

### 🧪 测试与工程改进
- **`test(log): flush async writes in emit() so reinit_* tests see them`**（[#8870](https://github.com/zeroclaw-labs/zeroclaw/pull/8870)）—— 修复 CI 上两个日志测试确定性失败的问题。
- **`fix(memory): wrap SqliteMemory embedder in Arc`**（[#8867](https://github.com/zeroclaw-labs/zeroclaw/pull/8867)）—— 解除近期多 PR 合并后内存组件中的竞态冲突。

---

## 社区热点

过去24小时讨论最活跃的 Issue 集中于 **AI agent 能力边界**与**数据安全**：

| Issue | 评论数 | 核心诉求 |
|-------|--------|---------|
| [#5862](https://github.com/zeroclaw-labs/zeroclaw/issues/5862) | 13 | 用户要求定期任务（cron），但 zeroclaw 回复“没有此类工具”——社区期望 agent 能主动发现并报告自身能力（如 `zeroclaw cron` 命令） |
| [#6034](https://github.com/zeroclaw-labs/zeroclaw/issues/6034) | 7 | 多轮对话中 user message 随机丢失，触发 `All providers/models failed` 错误（S1 工作流阻塞） |
| [#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) | 7 | 官方提出 `.ignore` 文件机制 RFC，保护工作区内敏感文件（`.env`、`config.toml`）不被 agent 访问；安全诉求强烈 |
| [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) | 4（新开） | 将可选通道/工具从编译特征迁移到 WASM 运行时插件——方向性技术决策，获得多维护者认可 |

**分析**：社区已不满足于简单问答，而是要求 agent 具备 **元能力自省**（知道自己能做什么）、**对话可靠性**以及**安全边界控制**。此外 #8850 标志着项目正式向“插件化架构”迈出关键一步，与 #8852/#8863 等多个 PR 形成呼应。

---

## Bug 与稳定性

按数据严重程度（Severity）列出主要 Bug，标注是否已有修复 PR：

| Severity | Issue | 简述 | 状态 |
|----------|-------|------|------|
| S0 - 数据丢失/安全风险 | [#6672](https://github.com/zeroclaw-labs/zeroclaw/issues/6672) | reasoning_content 未在工具调用循环中传递（影响 thinking 模式） | 开放，blocked |
| S0 | [#6558](https://github.com/zeroclaw-labs/zeroclaw/issues/6558) | 自定义 provider 返回 405 Method Not Allowed | 开放，blocked |
| S0 | [#8094](https://github.com/zeroclaw-labs/zeroclaw/issues/8094) | Anthropic provider 添加后无法在聊天窗口使用，直到重置 | 开放，需复现 |
| S1 - 工作流阻塞 | [#6034](https://github.com/zeroclaw-labs/zeroclaw/issues/6034) | 多轮对话丢失 user message，provider 报错 400 | 开放，标记 accepted |
| S1 | [#6002](https://github.com/zeroclaw-labs/zeroclaw/issues/6002) | Telegram 消息未被正确导向 agent（始终只调用 LLM） | 开放，accepted |
| S1 | [#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) | macOS 应用无法正常启动/显示（权限或 Tauri 问题） | 开放，blocked |
| S2 - 退化 | [#6173](https://github.com/zeroclaw-labs/zeroclaw/issues/6173) | `model_switch` 工具不跨轮持久化，且网关/UI 不识别切换状态 | **已关闭修复？** Issue 关闭但未提及 PR；需确认 |
| S2 | [#8334](https://github.com/zeroclaw-labs/zeroclaw/issues/8334) | `skills install/list/remove` 操作错误的目标目录（多 agent 不加载） | **已关闭**，比原先更清晰 |

**稳定性信号**：CI 方面，[#8870](https://github.com/zeroclaw-labs/zeroclaw/pull/8870) 和 [#8867](https://github.com/zeroclaw-labs/zeroclaw/pull/8867) 修复了日志和内存模块的测试竞争问题，使 `master` 回归绿色。但 S0/S1 Bug 仍有多条处于 blocked 状态，需 maintainer 追加输入。

---

## 功能请求与路线图信号

近期涌现的 RFC 和 Enhancement 集中在三个方向：

### 1. 插件架构加速落地
- **#8850**[⬆️](https://github.com/zeroclaw-labs/zeroclaw/issues/8850)：将可选通道/工具从编译时 feature flag 剥离为 WASM 运行时插件，大幅缩减默认二进制体积，同时降低贡献者门槛。
- **#7497**[⬆️](https://github.com/zeroclaw-labs/zeroclaw/issues/7497)：改用 OCI 容器镜像仓库作为 WASM 插件的存储/分发/发现机制（替代 JSON 索引文件）。
- **#8398**[⬆️](https://github.com/zeroclaw-labs/zeroclaw/issues/8398)：插件权限、配置与机密模型开放问题讨论——决定插件粒度控制未来走向。
- 对应 PR：**#8852**（运行 WASM 通道插件）、**#8863**（主机中介 WebSocket）均已合并，表明架构正从 RFC 走向实现。

### 2. 工作空间安全与敏感信息保护
- **#8424**[⬆️](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)：`.ignore` 文件机制——允许用户安全保护工作区内敏感文件，摆脱当前仅能阻断工作区外路径的局限。
- **#8226**[⬆️](https://github.com/zeroclaw-labs/zeroclaw/issues/8226)：支持 per-agent 自定义环境变量（含 `runtime_secrets` 掩码块），解决身份/参数/令牌多租户问题。
- **#7673**[⬆️](https://github.com/zeroclaw-labs/zeroclaw/issues/7673)：RFC：原生上下文压缩装饰器——作为 provider pipeline 的透明压缩层，缓解长对话记忆问题。

### 3. 通道/API 兼容性
- **#8603**[⬆️](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)：OpenAI Chat Completions 兼容适配器，使 Open WebUI、LobeChat 等可直接连接 ZeroClaw。
- **#7831**[⬆️](https://github.com/zeroclaw-labs/zeroclaw/issues/7831)：Discord 通道功能对标计划（嵌入、斜杠命令选项、组件、语音）。
- **#7431**[⬆️](https://github.com/zeroclaw-labs/zeroclaw/issues/7431)：Pre-turn 路由意图抽取——让 agent 在调用 LLM 前就能识别“发送给X”等自然语言路由指令。

这些特性中 **#8424（.ignore）** 和 **#8226（per-agent env）** 已有较完整的 RFC，且与当前安全痛点直接相关，很可能进入下一版本（v0.8.4 / v0.9）路线图。

---

## 用户反馈摘要

从过去24小时更新的 Issue 评论中提炼真实用户痛点：

| 反馈类型 | 具体问题 | 涉及 Issue |
|----------|----------|------------|
| **能力发现缺失** | “问 zeroclaw 能否每晚8点提醒，它回答没有这个能力”——用户期望 agent 能自动识别并使用内置 cron 工具 | [#5862](https://github.com/zeroclaw-labs/zeroclaw/issues/5862) |
| **配置错误指引** | Telegram 绑定错误信息建议使用 `bot-token`（kebab），实际字段是 `bot_token`（snake）——导致用户配置后仍失败 | [#8823](https://github.com/zeroclaw-labs/zeroclaw/pull/8823)（已修正） |
| **对话不可靠** | 多轮对话后 user message 消失，触发 `All providers/models failed`；必须重启 | [#6034](https://github.com/zeroclaw-labs/zeroclaw/issues/6034) |
| **平台兼容性** | macOS 15.7.7 安装后无权限提示、空白页、第二次启动窗口消失；Android Termux 提示 unknown linux aarch64 无法运行 | [#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) / [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) |
| **Provider 体验** | 添加 Anthropic 后不能在聊天窗口使用，必须重置；xAI/Groq 等兼容 provider 需要手动填写 key，即使已设环境变量 | [#8094](https://github.com/zeroclaw-labs/zeroclaw/issues/8094) / [#8861](https://github.com/zeroclaw-labs/zeroclaw/pull/8861) |
| **敏感变量使用** | 环境变量（如 `SLACK_BOT_TOKEN`）无法在 `http_request` 工具中以 secret 形式引用，迫使将 token 明文写配置 | [#8553](https://github.com/zeroclaw-labs/zeroclaw/issues/8553)（已关闭，根本方案待 per-agent secrets） |

总体而言，用户对 **零配置上手的流畅性** 期待较高，Provider 兼容性、对话持久性、平台覆盖是当前最集中的不满意点。

---

## 待处理积压

以下 Issue 或 PR 长期未得到响应，或带有 `stale-candidate`/`blocked` 标记且影响面较大，建议维护者优先关注：

### ⏳ 积压 Issue

| Issue | 标签 | 上次更新 | 备注 |
|-------|------|----------|------|
| [#5862](https://github.com/zeroclaw-labs/zeroclaw/issues/5862) | `stale-candidate`, `blocked` | 2026-07-08 | 13条评论，社区高频提问，需要 decision：是否展示内置工具列表？ |
| [#6672](https://github.com/zeroclaw-labs/zeroclaw/issues/6672) | `stale-candidate`, `risk:high` | 2026-07-08 | S0 数据丢失风险（reasoning_content），blocked，需复现 |
| [#6558](https://github.com/zeroclaw-labs/zeroclaw/issues/6558) | `stale-candidate`, `blocked` | 2026-07-08 | S0 风险，provider 405 错误，等待用户补充信息 |
| [#6517](https://github.com/zeroclaw-labs/zeroclaw/issues/6517) | `stale-candidate`, `blocked` | 2026-07-08 | 上下文溢出导致幻觉/主题漂移，影响广泛但复现步骤不明确 |
| [#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) | `blocked` | 2026-07-08 | macOS app 完全不可用，但无 maintainer 回应 |

### ⏳ 积压 PR

| PR | 标签 | 创建时间 | 备注 |
|----|------|----------|------|
| [#7215](https://github.com/zeroclaw-labs/zeroclaw/pull/7215) | `stale-candidate`, `needs-author-action` | 2026-06-04 | Quickstart webhook 端口配置未被暴露，影响 FTUE 流程；作者已超1月未回应 |
| [#8173](https://github.com/zeroclaw-labs/zeroclaw/pull/8173) | `needs-maintainer-review`, `size:L` | 2026-06-22 | 仪表盘内升级/自重启功能，已近3周无 review |

建议维护者先从 **#5862（cron 能力展示）**和 **#7527（macOS 崩溃）**着手，这两项直接影响用户对“开箱即用”的信任。

---

*数据源：Zeroclaw GitHub 仓库，统计区间 2026-07-08 00:00 UTC 至 2026-07-09 00:00 UTC*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，作为 AI 智能体与个人 AI 助手领域开源项目分析师，根据您提供的 PicoClaw 项目数据，我为您生成了 2026-07-09 的项目动态日报。

---

## 📊 PicoClaw 项目日报 | 2026-07-09

### 1. 今日速览
过去 24 小时（截至 2026-07-09），PicoClaw 项目活跃度处于 **中等水平**。共新增/活跃 2 个 Issue，合并/关闭 3 个 PR，无新版本发布。最大亮点是 **Anthropic 视觉模型图片丢失的严重 Bug 在一天内完成了从报告到修复的闭环**（PR #3234）。同时，Grafana Alertmanager 集成和 Gateway 回退策略两个重量级功能也成功合入主分支，显示出项目在 **AIOps 生态扩张** 与 **基础设施健壮性** 上的持续投入。

### 2. 版本发布
（无新版本发布，本节略。）

### 3. 项目进展
今日合入的 3 个 PR 分别推进了模型兼容性、生态渠道和部署稳定性：

1.  **[🚑 紧急修复] 修复 Anthropic 视觉模型图片丢失 (PR #3234)**
    *   **贡献者**：@darren101004
    *   **详情**：`anthropic_messages` 提供者的 `buildRequestBody` 之前只发送了 `msg.Content` 文本，完全忽略了 `msg.Media` 中的图片字段。这导致所有通过 `load_image` 工具加载的图片（Data URI）在到达模型前被丢弃，视觉模型回复“无法看到图片”。**该修复将图片正确嵌入用户消息，让 Claude Vision 等模型能够正常处理视觉 Agent 工作流。**
    *   链接：https://github.com/sipeed/picoclaw/pull/3234

2.  **[🚀 新功能] 新增 Grafana Alertmanager 输入通道 (PR #2251)**
    *   **贡献者**：@loafoe
    *   **详情**：新增了 `grafana_alertmanager` 输入通道。PicoClaw 现在可以接收 Grafana 的告警 Webhook，解析并格式化告警消息，并支持通过 `skill` 参数触发特定的 Agent 技能。**这标志着 PicoClaw 正式向智能运维（AIOps）场景迈出了坚实的一步。**
    *   链接：https://github.com/sipeed/picoclaw/pull/2251

3.  **[🛡️ 功能增强] Gateway 启动回退策略 (PR #2278)**
    *   **贡献者**：@Sakurapainting
    *   **详情**：当 Gateway 配置的本地回环地址绑定失败时，系统不再直接崩溃退出，而是优雅降级为通配符绑定配合 CIDR 白名单策略。**这一改进极大提升了在不同复杂网络环境下的部署可靠性。**
    *   链接：https://github.com/sipeed/picoclaw/pull/2278

### 4. 社区热点
今日最受关注的 Issue 主要集中在平台兼容性和体验割裂上：

1.  **[#3195] NanoKVM 上 OpenAI 模型无法工作**
    *   **热度**：评论 2 条（最高）。
    *   **分析**：用户 @rtadams89 在最新 NanoKVM 2.4.0 上严格遵循官方文档配置 `gpt-5.4` 但仍完全无法工作。**这直接暴露了官方文档与特定硬件平台之间的适配鸿沟。** 由于 PicoClaw 与 NanoKVM 硬件的紧密关联，此类问题会严重打击目标用户的“开箱即用”信心。
    *   链接：https://github.com/sipeed/picoclaw/issues/3195

2.  **[#3201] QQ 频道流式输出支持**
    *   **热度**：评论 1 条，已标记 `[stale]`。
    *   **分析**：用户 @YsLtr 指出 QQ 渠道相比 Telegram 和 WebSocket 缺少流式输出，必须等待完整响应。**这体现了中文社区用户对实时交互体验的强烈诉求。** 虽然当前热度不高且被标记为陈旧，但这是 QQ 渠道不可回避的体验短板。
    *   链接：https://github.com/sipeed/picoclaw/issues/3201

### 5. Bug 与稳定性

| 严重程度 | 标题 | 状态 | 影响与建议 |
| :--- | :--- | :--- | :--- |
| **严重** | [#3195] NanoKVM 上 OpenAI 模型无法工作 | 🟡 开放中，无修复 | 平台级阻塞 Bug，直接导致用户无法在目标硬件上使用核心功能。**急需维护者介入排查。** |
| **中高 (已修复)** | [#3234] Anthropic 视觉模型图片丢失 | 🟢 已合并修复 | 影响所有依赖视觉 Agent 的用户。已通过当日 PR 得到快速修复，风险解除。 |

### 6. 功能请求与路线图信号

*   **强信号 - 渠道体验升级**：[QQ 频道流式输出 (#3201)](https://github.com/sipeed/picoclaw/issues/3201)
    *   **分析**：结合今日 Grafana 通道的合并，团队在渠道功能上显然有积极规划。QQ 流式输出是实现渠道体验一致性的必选项，预计短期内将进入规划。
*   **已落地信号 - 生态扩展**：[Grafana Alertmanager 集成 (#2251)](https://github.com/sipeed/picoclaw/pull/2251)
    *   **分析**：合入此 PR 表明项目正构建“万物互联”的 Agent 生态。未来很可能看到更多 DevOps 工具（如 Jira, PagerDuty）的深度集成。
*   **已落地信号 - 生产就绪**：[Gateway 回退策略 (#2278)](https://github.com/sipeed/picoclaw/pull/2278)
    *   **分析**：项目正在为大规模、复杂网络的生产环境部署筑牢基础，未来可能引入更完整的健康检查与负载均衡机制。

### 7. 用户反馈摘要

**负面反馈/痛点**
*   **文档与实际脱节**：用户 @rtadams89（#3195）明确表示“严格按照官方文档操作”，但依然失败。文档滞后于代码开发是当前最大的用户信任危机之一。
*   **渠道体验割裂**：用户 @YsLtr（#3201）揭示了 QQ 渠道作为“二等公民”的尴尬局面，非流式输出弱化了 LLM 在即时通讯场景下交互的实时感。

**正面反馈与贡献**
*   **社区贡献链路畅通**：@loafoe、@Sakurapainting、@darren101004 等高级贡献者的 PR 顺利合入，表明项目社区形成了良好的提交-审核-合并机制，且核心团队对合并代码质量把控严格。

### 8. 待处理积压
以下积压问题建议维护团队重点关注：

1.  **[#3195] NanoKVM 兼容性问题** (高危 - 已存活 9 天)
    *   **建议**：无论能否立即修复，建议维护者在 24 小时内给出首次回应。至少提供排查步骤、日志收集指引或临时 Workaround，防止该 Issue 在 NanoKVM 用户群中持续发酵为负面案例。
    *   链接：https://github.com/sipeed/picoclaw/issues/3195

2.  **[#3201] QQ 流式输出** (中危 - 带 `stale` 标签)
    *   **建议**：维护团队需明确表态。若有排期，请移除 `[stale]` 标签并告知预期版本。若技术上有难点或不在路线图中，应关闭 Issue 并解释原因。让社区诉求长期“悬而未决”会消耗贡献者的信任。
    *   链接：https://github.com/sipeed/picoclaw/issues/3201

3.  **文档同步** (低危 - 事务性提醒)
    *   **建议**：鉴于 #2251（Grafana 通道）和 #2278（Gateway回退）已合并，请务必更新官方文档。这可以避免未来出现更多类似 #3195 的文档滞后类 Bug 报告。
    *   对应修复 PR：https://github.com/sipeed/picoclaw/pull/2251 , https://github.com/sipeed/picoclaw/pull/2278

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

好的，这是根据您提供的 GitHub 数据生成的 NanoClaw 项目动态日报。

---

# NanoClaw 项目动态日报 | 2026-07-09
**（数据覆盖时段：2026-07-08 更新活动）**

## 1. 今日速览

项目在过去 24 小时内呈现出“高度活跃”的开发态势，但社区反馈相对平淡。核心团队主导了 **28 条 PR 更新**，其中 **4 条被成功合并/关闭**，展现了强劲的内部推进力。然而，仅有 **2 个新 Issue** 被提出，且均无互动，表明社区层面的讨论热度较低。项目当前正处在典型的“架构冲刺期”，大量 PR 集中在 CLI 基础设施重构（Scheduled Tasks 列车）、工具链白名单治理和自动化运维流程优化上，为下一阶段的企业级功能落地铺路。

## 2. 版本发布

**无**（过去 24 小时无新版本发布）。

## 3. 项目进展

今日共有 **4 个 Pull Request** 完成合并或关闭，标志着项目在三个关键领域的实质性推进：

- **AI 基础设施升级（Scheduled Tasks 列车）:**
    - **[PR #2980] - `ncl CLI` 参数系统重构（已合并）:**
        - **贡献者:** @omri-maya
        - **摘要:** 为 `ncl` 命令引入了严格的动词级别参数校验、深度帮助信息和服务端渲染输出。这是“计划任务”功能列车的第一个基石，为后续复杂的任务控制面板 (#2981) 提供了强壮的 CLI 交互基础。
        - **意义:** 提升了工具的可发现性和鲁棒性，确保了 CI 流程的自动化校验能力。

- **CI 自动化与维护效率:**
    - **[PR #2978] - CI 自动标签策略增强（已合并）:**
        - **贡献者:** @gabi-simons
        - **摘要:** 扩展了原有的 `label-pr.yml` 工作流，现可自动为核心团队成员打开的 PR 打上 `core-team` 标签。
        - **意义:** 简化了核心团队的分类管理工作流，提升了对大规模 PR 涌入时的跟踪效率。

- **历史技术债务清零:**
    - **[PR #1702] - IPC 消息丢失修复（已合并）:**
        - **贡献者:** @jbaruch
        - **摘要:** 一个存在了 **3 个月**（创建于 2026-04-08）的修复 PR 终于被关闭。该 PR 通过正确打断 `for-await` 循环，解决了因消息处理交织导致的 IPC 消息丢失问题。
        - **意义:** 消除了一项长期存在的、难以定位的代理运行器稳定性隐患，这是项目维护者清理历史技术债务的积极信号。

## 4. 社区热点

今日各 PR 与 Issue 的评论数普遍较低，表明公开讨论集中在核心团队的内部开发进展上，而非广泛的社区辩论。最受关注的项目反映了以下趋势：

- **架构级的宏大叙事：Scheduled Tasks 控制面板 (#2981)**
    - @omri-maya 提交的 **PR #2981** 作为“计划任务”功能列车的第二部，引入了隔离会话、脚本门控（Script Gate）、任务生命周期管理等概念。虽然讨论较少，但它标志着 NanoClaw 从“被动问答 Agent”向“主动任务执行平台”演进的决心，吸引了所有关注项目长期路线的开发者。
- **理想主义的 AI DevOps：PR Factory 社区配方 (#2742)**
    - @gavrielc 的 **PR #2742** 从 2026-06-11 开放至今，虽然未合并，但其中“用专用 AI 代理自动审阅、测试和通知所有 PR”的构想持续作为社区乌托邦式的蓝图被引用，代表了社区对完全自动化开发流程的强烈渴望。
- **“小”需求背后的“大”趋势：线程自动重命名 (#2984)**
    - 用户 **@eagansilverpathmarketing** 提出的 **Issue #2984** 揭示了一个广泛的痛点：在繁忙的协作环境中，AI Agent 不应仅是问答机，还应具备主动治理环境（自动整理会话名称）的能力。这种“环境治理”需求正在成为新的用户共识。

## 5. Bug 与稳定性

今 **1 个新 Bug 报告**，且涉及极高的隐蔽性和严重性。另有 **3 个待合并的修复 PR**。

- **[严重] `opencode` 提供器静默无回复 - Issue #2985**
    - **报告者:** @fjnoyp
    - **摘要:** 使用 `opencode` 提供器时，在完成长时间代理任务后，机器人既不发送回复也不抛出错误，导致用户认为指令被忽略。该问题可稳定复现，直接影响消息代理的投递信任度。
    - **状态:** ❌ **无 Fix PR，需优先排查 `opencode` 提供器的消息投递生命周期。**
- **[中高] 工具白名单与内置 CLI 版本脱钩 - PR #2982**
    - **报告者:** @gabi-simons (核心团队)
    - **摘要:** `agent-runner` 的 `TOOL_ALLOWLIST` 命名了 5 个在固定版 `claude-code` CLI 上不存在的工具名，可能导致工具调用失败。
    - **状态:** ✅ **已有 Fix PR (#2982 - Drift Guard)**，待合并。
- **[中] Codex 凭据过期后无法重连 - PR #2878**
    - **报告者:** @glifocat
    - **摘要:** `runCodexAuthStep()` 在检测到 OneCLI 凭据存在但已过期时不会尝试重连，导致 Codex 代理会话中断。
    - **状态:** ✅ **已有 Fix PR (#2878)**，自 2026-06-28 起待合并，已积压超 1 周。
- **[低] `Compose` 编译时错误内联技能 - PR #2921**
    - **报告者:** @michaelzetune
    - **摘要:** `composeGroupClaudeMd` 错误地将所有组技能的内联到每个组的 `CLAUDE.md` 中，导致配置混乱。
    - **状态:** ✅ **已有 Fix PR (#2921)**，待合并。

## 6. 功能请求与路线图信号

- **[路线图核心] 计划任务平台 (Scheduled Tasks)**
    - **PR #2981** 是今日最明确的路线图信号。通过 `ncl tasks` 命令的完整生命周期管理、隔离执行和环境变量注入，该项目正构建一个类似于“智能 Cron”的 AI 任务调度平台。这预示着 NanoClaw 即将具备飞轮化的后台作业能力，是企业级部署的关键一步。

- **[高采纳潜力] Discord 线程智能管理 (#2984)**
    - **用户需求:** 让 AI Agent 根据对话内容自动重命名会话线程。
    - **分析师点评:** 该功能实现成本低（仅需调用 Discord API 的 rename 接口），但用户体验提升显著。考虑到它符合“AI 主动治理环境”的路线，很有可能在下一个 Minor 版本中被采纳。

- **[架构演进] 默认代理提供器与多租户 (#2906)**
    - **PR #2906** 允许运维人员在实例级别设定默认的 Agent 提供器（如 `claude`），并自动应用到新组。这暗示了未来向“多租户统一管控”或“大规模实例部署”演进的方向。

- **[安全精细化] 审批驳回扩大化 (#2941)**
    - **PR #2941** 将开发于 `create_agent` 卡片上的“驳回理由”机制扩展到了 OneCLI 凭据审批卡上。这表明团队正在系统性地构建一个可审计、可解释的 AI 安全审批框架，实现对所有关键操作的“软治理”（Soft Governance）。

## 7. 用户反馈摘要

- **“信任危机” - 静默失败是最大敌人 (#2985)**
    - 用户 **@fjnoyp** 的反馈直指核心：“Agent 完成了任务，但消息未被发送，且系统不报错”。对于 AI Agent 应用而言，“无反馈”比“错误反馈”更具破坏力，因为它破坏了用户对自动化系统最基本的信任闭环。团队需将此视为 P0 级风险。
- **“工具人”到“管家”的期望升级 (#2984)**
    - 用户 **@eagansilverpathmarketing** 的需求非常典型：用户不再满足于 AI 被动回答问题，而是希望 AI 能主动维护对话环境的秩序。将杂乱的时间戳线程重命名为有意义的主题，是“环境治理”需求的雏形。
- **“维护陷阱”版本漂移 (#2982)**
    - 核心团队 **@gabi-simons** 通过代码审查发现了一个典型的维护缺陷：硬编码的工具白名单 `TOOL_ALLOWLIST` 与上游 CLI 的实际版本之间存在“年代断层”。这反映了开发者的管理痛点：手动维护的配置清单很容易成为技术债务的温床，未来可能需要引入自动化兼容性检测机制。

## 8. 待处理积压

- **PR #2742 - PR Factory (社区配方)**
    - **开放时间:** 2026-06-11 (已持续 27 天)
    - **提醒:** 该革命性的自动化代理配方在社区层面具有里程碑意义，但长期未收到项目维护者的明确反馈（接受/搁置/指导重构）。建议核心团队尽快介入讨论，避免挫伤社区贡献热情。
- **PR #2798 - v2.1.17 更新日志**
    - **开放时间:** 2026-06-17 (已持续 21 天)
    - **提醒:** 更新日志 (CHANGELOG) 是社区感知项目进展的核心窗口。该 PR 的长期积压可能导致合并内容无法被外部用户了解，形成信息黑洞。
- **PR #2770 - Codex 文件事件交付**
    - **开放时间:** 2026-06-14 (已持续 24 天)
    - **提醒:** 此 PR 修复了 Codex 图片生成后无法送达聊天窗口的问题。该修复逻辑清晰且是关键功能补丁，长时间搁置将直接阻塞 Codex 用户的媒体文件传输功能，并增加未来合并的冲突风险。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

好的，作为 AI 智能体与个人 AI 助手领域的开源项目分析师，以下是根据 IronClaw 项目 2026-07-09 的实时数据生成的详细项目动态日报。

---

# IronClaw 项目动态日报 | 2026-07-09

## 1. 今日速览

过去 24 小时是 IronClaw 近期最活跃的开发日之一，**50 个 Pull Request** 与 **21 个 Issue 更新** 共同构成了极高的吞吐量。项目核心开发团队正展开两线作战：一方面由 **BenKurrek** 主导推进大规模架构重构（NEA-25 统一扩展模型），另一方由 **joe-rlo** 发起的密集 Bug Bash 验收暴露了 Reborn 平台多个 P2 级集成与稳定性 Bug。值得注意的是，**关键发布 PR #5598 已积压一周**，是目前项目交付的最大瓶颈，大量依赖 API 变更的新功能（如 WASM 工具安装、私有技能）的推出被阻塞。项目整体健康度处于**高强度迭代但面临交付塞车**的状态。

## 2. 版本发布

**无。** （上一次版本发布停留在 0.29.1，相关发布 PR #5598 仍在待合并状态，详见下文“待处理积压”）。

## 3. 项目进展

尽管无版本发布，项目在架构收敛和技术债清理上取得了实质性突破：

- **NEA-25 统一扩展表面系列重构（重大迈进）**：由 @BenKurrek 主导的 7 个 XL 级 PR 栈已全部进入待合并状态。该重构将 `channel`、`tool`、`auth` 整合为统一的 `extension` 模型，移除了遗留的并行 channel 注册表，Slack 集成被改造为单一扩展的验证案例，总计净减近千行代码。这是 Reborn 平台产品模型收敛的里程碑。
    - [PR #5833](https://github.com/nearai/ironclaw/pull/5833) feat(extensions): capability-surface vocabulary and manifest projection
    - [PR #5839](https://github.com/nearai/ironclaw/pull/5839) refactor(extensions)!: complete manifest v2 cutover
    - [PR #5842](https://github.com/nearai/ironclaw/pull/5842) refactor(reborn)!: extension-surface discovery replaces the connectable-channels rail
    - [PR #5845](https://github.com/nearai/ironclaw/pull/5845) feat(reborn)!: one slack extension
    - [PR #5850](https://github.com/nearai/ironclaw/pull/5850) refactor(reborn): NEA-25 audit fixes
- **性能与可观测性**：@serrrfirat 提交了 API 容量压测装备 [PR #5855](https://github.com/nearai/ironclaw/pull/5855) 并实现了助理文本的流式 SSE 传输 [PR #5821](https://github.com/nearai/ironclaw/pull/5821)。@zmanian 修复了 Trace Commons 实例注册的运维链路 [PR #5858](https://github.com/nearai/ironclaw/pull/5858)。
- **清理与技术债**：@italic-jinxin 关闭了多个关于删除 Legacy v1 测试残留的任务（如 [PR #5826](https://github.com/nearai/ironclaw/issues/5826)、[#5827](https://github.com/nearai/ironclaw/issues/5827)、[#5828](https://github.com/nearai/ironclaw/issues/5828)），表明团队在主动减少维护噪音。同时关闭了积压的 UI 问题和 i18n 不完整问题（如 `#5419`、`#5768`、`#5770`）。

## 4. 社区热点

由于 PR 评论数数据未显示，本期热点主要依据 Issue 互动及 PR 体量判断：

- **Bug Bash 质量验收（最高热度）**：@joe-rlo 批量提交了 6 个严重等级为 P2 的 Bug（[#5834](https://github.com/nearai/ironclaw/issues/5834) ~ [#5838](https://github.com/nearai/ironclaw/issues/5838), [#5702](https://github.com/nearai/ironclaw/issues/5702)），覆盖 Slack 断开、定时任务崩溃、GitHub 集成失效、UI 点不了等核心功能。这些 Bug 的讨论热度极高，是构建稳定版本前必须突破的障碍。
- **NEA-25 架构重构（技术热点）**：虽然评论数未呈现，但一个包含 7 个 XL 级 PR 的重构栈本身即代表了社区和核心团队最紧密的协作焦点，其设计决策直接影响所有集成开发者的未来适配方式。

## 5. Bug 与稳定性

今日 Bug Bash 暴露的系统性问题较为突出，按严重程度排列如下：

- **P2 - 系统级功能阻断：**
    - **[#5836](https://github.com/nearai/ironclaw/issues/5836) Routine 定时任务全面失败**：`ironclaw-issues-slack-summary` 例行任务成功率 0%，错误为“No thread attached”，指向会话调度系统的根本性缺陷。
    - **[#5702](https://github.com/nearai/ironclaw/issues/5702) GitHub 集成 HTTP 403**：搜索和创建 Issue 功能完全失效，严重阻塞依赖此集成的用户工作流。
    - **[#5838](https://github.com/nearai/ironclaw/issues/5838) 上下文压缩失败**：多轮对话在执行完工具后崩溃，直接影响长会话体验。
    - **[#5834](https://github.com/nearai/ironclaw/issues/5834) Agent 无法执行 Slack 断开**：用户请求断开时，Agent 错误拒绝。
- **P2 - UI 功能异常：**
    - **[#5837](https://github.com/nearai/ironclaw/issues/5837) Routine 运行按钮不可点击**：“Open run”和“Logs”按钮渲染为不可交互状态，用户无法排查运行失败原因。
- **P3 - UI/UX 小缺陷：**
    - [#5835](https://github.com/nearai/ironclaw/issues/5835) “Jump to latest”按钮位置异常。
    - [#5705](https://github.com/nearai/ironclaw/issues/5705) 终端图标无可隐藏选项。
    - [#5557](https://github.com/nearai/ironclaw/issues/5557) Logs 深度链接需点击两次才生效。

**注意：以上 P2 Bug 目前均无直接关联的 Fix PR，团队需尽快认领。**

## 6. 功能请求与路线图信号

- **私有工具/技能安装（预计进入下一版本）**：@zetyquickly 的 WASM 工具安装（[#5499](https://github.com/nearai/ironclaw/pull/5499)）和私有安装（[#5525](https://github.com/nearai/ironclaw/pull/5525)）系列已进入 Code Review 后期，一旦发布 PR 通畅，将为 SSO 用户提供巨大的可扩展性便利。
- **WebChat 附件上限提升（用户驱动）**：[Issue #5820](https://github.com/nearai/ironclaw/issues/5820) 反映当前 10 个文件的附件限制在实战中被频繁触发，且超限文件被静默忽略。该需求已获社区确认，预计很快进入 UI 优化队列。
- **性能优化成为短期重点**：[PR #5857](https://github.com/nearai/ironclaw/pull/5857) 旨在降低 API 容量的预模型延迟，说明团队已开始关注用户层面的“慢”感知，意图在架构重构完毕后迅速提升响应体验。
- **权限管理改进**：[Issue #5856](https://github.com/nearai/ironclaw/issues/5856) 指出管理面板缺少 Token 重新颁发功能，修复后台管理完备性已成为明确路线图信号。

## 7. 用户反馈摘要

从近期 Issue 中提炼的真实用户痛点：

- **“我无法掌控我的终端”**：([#5705](https://github.com/nearai/ironclaw/issues/5705)) 不使用终端的用户反馈终端图标无法隐藏，造成了 UI 干扰。
- **“文件被吞了，而且没有提示”**：([#5820](https://github.com/nearai/ironclaw/issues/5820)) 当 WebChat 附件超过 10 个时，系统静默丢弃文件而不报错，用户体验极差。
- **“取名字的权利被剥夺了”**：([#5419](https://github.com/nearai/ironclaw/issues/5419) 已关闭) 自动化名称由 AI 生成且过长导致显示不全，用户无法重命名，该问题虽已关闭但反映了 Agents 生成内容的可控性不足。
- **“连不上、点不了、断不开”**：([#5834](https://github.com/nearai/ironclaw/issues/5834), [#5836](https://github.com/nearai/ironclaw/issues/5836), [#5837](https://github.com/nearai/ironclaw/issues/5837)) 用户对 Slack 集成失控、定时任务死锁、UI 按钮失效表达了操作上的无助感，这些是影响留存率的硬伤。

## 8. 待处理积压

- **【最高优先级】发布 PR 阻塞（14 天）**：[PR #5598](https://github.com/nearai/ironclaw/pull/5598)（chore: release）自 7 月 3 日以来持续处于待合并状态，涉及 `ironclaw_common` 等核心库的破坏性 API 变更。该 PR 的搁置直接导致 WASM 工具安装（[#5499](https://github.com/nearai/ironclaw/pull/5499)）、私有技能（[#5525](https://github.com/nearai/ironclaw/pull/5525)）等大功能无法通过版本化发布交付，是当前开发吞吐的最大瓶颈。维护团队需尽快决策是否合入或新建 RC 分支。
- **PR 队列拥堵**：当前有 **39 个 PR 处于待合并状态**。NEA-25 的 7 个 XL 重构栈正在占用 Code Review 的核心带宽，可能导致较小规模的 Bugfix PR 排队周期过长。
- **历史严重 Bug 未结**：[#5702](https://github.com/nearai/ironclaw/issues/5702)（GitHub 403，已存在 3 天，P2）和 [#5836](https://github.com/nearai/ironclaw/issues/5836)（定时任务崩溃，P2）作为系统级阻断，若无专人处理，可能影响下一阶段的内部演示或 E2E 测试结果。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

好的，这是根据 LobsterAI 2026年7月8日（24小时）GitHub 数据生成的项目动态日报。

---

# LobsterAI 项目动态日报 | 2026-07-09

## 1. 今日速览

**活跃度评估：🥇 非常活跃**

过去24小时，项目在 Issue 处理和 PR 合入上均展现了极高的活跃度。核心亮点在于：**针对用户新报告的严重 Bug（多 Agent 配置互相覆盖），实现了“当日报告、当日修复并合并”的快速响应闭环**；同时，团队大规模清理了积压的 Stale PR，合并了多项来自社区的稳定性、安全性和 UI 改进。**委托子代理协作（Delegated Subagent）** 的合入标志着项目在多智能体协同架构上迈出了重要一步。整体项目健康度良好，社区贡献生态活跃。

---

## 2. 项目进展

今日没有发布新版本，但核心代码库通过合并 10 个 PR 实现了显著推进。

- **核心架构推进：多智能体协作功能落地**
  - **PR [#2285]（已合并）**：实现了 **委托子代理协作（Delegated Subagent Collaboration）** 功能。这是产品路线图的关键里程碑，允许用户将一个 Agent 配置为可委托的子 Agent，并在 Cowork 框架下以子会话形式运行，从而支持更复杂的任务编排与持续对话。
- **关键 Bug 修复：立即响应社区痛点**
  - **PR [#2295]（已合并）**：修复了 **Agent 配置数据隔离问题**。此前，所有 Agent 共享并互相覆盖 `USER.md` 文件，导致多 Agent 用户配置错乱。现在读写操作已基于 `agentId` 映射到正确的独立工作空间。这直接对应并修复了当天提出的 Issue #2293。
  - **PR [#2298]（已合并）**：修复了 **IM 会话映射混乱** 的问题。确保了跨 Agent 的不同 IM 会话不会互相干扰，提升了多 Agent 场景下的通信稳定性。
- **遗留社区 PR 清理：大量改进合入主线**
  - 团队集中合入了来自社区的旧有贡献，包括：
    - **安全增强**：PR [#1401] 替换不安全的 `Math.random()`，采用 `crypto.randomUUID()` 保护 SSE 请求 ID。
    - **体验优化**：PR [#1402] 修复多选文件附件丢失问题；PR [#1404] 优化了定时任务的时间选择器 UI；PR [#1403] 修复了国际化翻译缺失问题。
    - **功能完整性**：PR [#1406] 修复了定时任务通知渠道在 IM 配置为空时的兜底逻辑；PR [#2296] 为 Cowork 权限弹窗增加了最小化/恢复功能；PR [#2297] 优化了内存搜索的逻辑降级。

---

## 3. 社区热点

- **【今日最热议题】Issue [#2293]：Agent USER.md 全局覆盖 BUG**
  - **热度分析**：这是昨日由用户 `@yepcn` 报告的严重数据一致性问题，描述清晰且复现步骤详尽。虽然评论数不多（1条），但该问题直击“多 Agent 配置独立性”这一核心诉求，相信在社区中有较高的共鸣。
  - **背后的诉求**：用户需要为不同 Agent（如工作助手、编程助手、生活管家）建立完全独立的身份（系统提示词）和知识（USER.md）。该 BUG 的存在严重制约了多 Agent 场景的实际应用。
  - **项目反应**：🔥 **极其积极**。当日即有维护者在 PR [#2295] 中推送修复并成功合并，体现了维护团队对用户痛点的极高重视。

- **【遗留痛点】Issue [#1400]：4.1版本严重启动Bug（已关闭）**
  - **热度分析**：曾获得 7 条评论。用户 `@danielmonlite` 详细描述了从 3.30 升级到 4.1 后的灾难性崩溃（无限循环重启、LLM 配置冲突），情绪非常焦急。
  - **分析**：尽管该 Issue 因长时间无更新被 Stale Bot 关闭，但它揭示了一个“升级即瘫痪”的极端不稳定场景，且涉及复杂的配置冲突（自动配置 vs 自定义 LLM）。该项目的高活跃度可能是修复了该问题，但 Issue 未得到人工确认，建议维护者主动复盘。

---

## 4. Bug 与稳定性

| 严重程度 | 问题描述 | 状态 | 关联链接 |
| :--- | :--- | :--- | :--- |
| **严重** | **多 Agent 的 USER.md 文件互相覆盖** | ✅ **已修复（已合并）** | Issue [#2293] / PR [#2295] |
| **严重** | **4.1 版本升级后网关反复重启、LLM 调用失败** | ⚠️ **Stale 关闭，需确认** | Issue [#1400] |
| **中等** | **定时任务名称重复没有校验** | 🟡 **待处理（持续3个月）** | Issue [#1348] |
| **已修复** | **SSE 请求 ID 可被预测（安全性）** | ✅ 已合并 | PR [#1401] |
| **已修复** | **跨 Agent IM 会话映射混乱** | ✅ 已合并 | PR [#2298] |
| **已修复** | **定时任务通知列表为空** | ✅ 已合并 | PR [#1406] |

---

## 5. 功能请求与路线图信号

- **已纳入主线（路线图明确信号）：**
  - **委托子代理协作**：PR [#2285] 已合并。这是多智能体交互模式的重大进化，预计将成为下一个版本的核心卖点。
  - **Cowork 体验升级**：PR [#2296] 合入了可最小化的权限请求弹窗，改善了工作流打断体验。

- **可能被逐步吸纳的功能：**
  - **Cron 自定义调度**：PR [#1347] 虽未合并，但今日合并的前置 UI 优化（PR [#1404] 时间控件改进、PR [#1406] 通知渠道修复）表明，维护者正在有节奏地消化定时任务模块的增强。完整的 Cron 支持很可能在下一个或下下个迭代中落地。
  - **本地 FTS 内存搜索**：PR [#2297] 确保用户在禁用 Embedding 搜索时仍能通过本地全文搜索（FTS）使用记忆功能，降低了高级功能的使用门槛。

- **仍在讨论中（缺乏反馈）：**
  - **技能管理系统**：PR [#1346] 已停滞 3 个月，这是一个较大的架构级变更，可能需要核心团队投入更多的设计与评审资源。

---

## 6. 用户反馈摘要

- **极度痛点（已解决）：** 用户 `@yepcn` 因 `USER.md` 配置覆盖问题无法为不同 Agent 建立独立需求，通过对 Issue 的清晰描述和快速报修，获得了当日的即时修复。这证明维护团队对高阶用户的多 Agent 场景需求理解深刻。
- **升级信任危机：** 用户 `@danielmonlite` 在 Issue #1400 中的沮丧感（“彻底瘫痪了”）反映了一个普遍问题：升级路径的平滑性和稳定性是用户留存的关键。尽管 Issue 关闭了，但“自动配置”与“自定义 LLM”之间的冲突风险需要官方文档或代码逻辑给出更明确的指引。
- **社区贡献得到认可：** 今日大量合入的社区 PR（来自 `kayo5994`, `liulingfeng`, `flowell`）表明贡献者的代码质量高、方向贴合产品需求，这对构建健康开源社区是极好的信号。

---

## 7. 待处理积压

以下 Issue 和 PR 长期未得到有效处理或回应，提醒维护者关注：

1. **【高风险】Issue [#1400]**：Stale 关闭的严重升级崩溃问题。建议内部重新复盘，确认是否已在某个提交中被修复，或在文档中增加警告及解决方案。
2. **【功能受阻】PR [#1347]**：**Cron 自定义调度功能**。自 4 月 2 日创建，技术含量高，且与社区诉求高度吻合。今日合并了其周边优化（#1404），建议一鼓作气推动主线合并。
3. **【架构挑战】PR [#1346]**：**技能管理功能**。因涉及较大改造成本，长期缺乏维护者反馈。如果暂无计划接受该架构，建议官方给出明确的反馈，指导贡献者或暂时关闭。
4. **【Bug 追踪】Issue [#1348]**：定时任务名称重复未校验。简单的校验逻辑，但已悬而未决 3 个月，适合作为 Good First Issue。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报：2026-07-09

## 1. 今日速览
今日 Moltis 项目整体活跃度较低，**未产生新的 Issue 或版本发布**，社区互动较少。项目唯一的动态是一条针对 CalDAV 模块的 Bug 修复 Pull Request (#1145)，旨在消除 `normalise_datetime` 函数在处理非 ASCII 日期时间时的 **panic 风险**。尽管开发节奏平稳，但关键稳定性修复正在推进，项目处于 **Low Activity 但仍在迭代**的健康状态。

## 3. 项目进展
今日 **没有 Pull Request 被合并或关闭**，项目功能集无实质性推进。所有开发活动集中于 PR #1145 的提交，该 PR 尚未合入主线，但已进入待审核阶段。无 Issue 被关闭，项目整体处于安静的代码贡献期。

## 4. 社区热点
今日 **无引发大量讨论或互动的 Issue/PR**。唯一的 PR #1145 目前评论数为 0、点赞数为 0，社区关注度不高。建议 maintainer 主动推动该 PR 的 Code Review，带动开发者参与讨论。

## 5. Bug 与稳定性
- **高严重性 Bug**：CalDAV 模块中的 `normalise_datetime` 函数在解析来自远程 CalDAV 服务器的 **非 ASCII 日期时间字符串** 时可能导致进程崩溃（panic）。该 Bug 直接影响日历同步功能的稳定性，尤其是在处理使用非 ASCII 编码或特殊字符的远程响应时。
  - **影响范围**：CalDAV 功能异常退出，影响用户日历数据同步体验。
  - **修复状态**：已存在修复 PR [#1145](https://github.com/moltis-org/moltis/pull/1145)，由 @Osamaali313 提交，目前处于 OPEN 状态，等待代码审查与合并。

## 6. 功能请求与路线图信号
今日 **未收到新的功能请求**，项目路线图无更新信号。所有注意力集中在稳定性修复上。

## 7. 用户反馈摘要
今日 **无用户反馈或 Issue 评论**，无法获取真实用户痛点或满意度的数据。社区沟通渠道较为安静。

## 8. 待处理积压
- **[#1145] fix(caldav): avoid panic on non-ASCII datetime in normalise_datetime**
  作者：@Osamaali313 | 创建：2026-07-08 | 更新：2026-07-08
  链接：https://github.com/moltis-org/moltis/pull/1145
  该 PR 已开放超过 24 小时，但尚未收到任何 Review 或合并。考虑到该修复解决了 **高严重性稳定向问题**，建议维护者优先安排 Code Review 并推进合并，以降低用户在生产环境中遭遇崩溃的风险。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

## 项目动态日报：QwenPaw — 2026-07-09

### 今日速览

过去 24 小时 QwenPaw 项目保持**高活跃度**：共处理 38 条 Issue 更新（14 条新开/活跃，24 条关闭），46 条 PR 更新（15 条已合并/关闭，31 条待合并），并发布了 **v2.0.0-beta.4**。核心团队在 scroll 上下文压缩、安全绕过防御和模型推理循环方面进行了重点修复，社区贡献了 Zalo Bot 频道、大量单元测试及多项体验增强。v2.0 系列仍存在若干严重上下文丢失问题，但开发迭代速度较快，项目整体健康度良好。

---

### 版本发布

**v2.0.0-beta.4**  
[📦 Release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.0-beta.4)

- **版本号升级**：`v2.0.0b4`（#5837）
- **核心修复**：改进 scroll 上下文压缩机制，保护当前活跃轮不被错误驱逐，增加渐进式压力释放，并让召回失败提示更加明确。
- **无破坏性变更**，无需特殊迁移。
- **建议**：使用 scroll 策略的用户升级后应重新验证长对话场景。

---

### 项目进展

今日共关闭/合并 15 个 PR，以下为已合并至主分支的重要变更：

| PR | 类型 | 描述 | 作者 |
|----|------|------|------|
| [#5792](https://github.com/agentscope-ai/QwenPaw/pull/5792) | fix | 修复 `_sanitize_tool_messages` 错误剔除合法的自配对工具消息（影响了 AgentScope 2.0 模式下的工具调用链） | @Osamaali313 |
| [#5864](https://github.com/agentscope-ai/QwenPaw/pull/5864) | fix | 将 Console 中的工具审批级别正确传递到 MCP Driver 策略，修复运行时审批级别与 UI 不一致的问题 | @xiaoming-qxm |
| [#5844](https://github.com/agentscope-ai/QwenPaw/pull/5844) | ci | 新增 “real-behavior-proof” PR 体例门控 + 垃圾 PR 检测，提升外部贡献质量 | @hanson-hex |
| [#5866](https://github.com/agentscope-ai/QwenPaw/pull/5866) | fix | 修复 `${HOME}` 绕过 `rm` 检测的安全漏洞（#5090），通过分离正则检测与参数提取彻底封堵 | @hanson-hex |
| [#5870](https://github.com/agentscope-ai/QwenPaw/pull/5870) ✅ | fix | 将 `preserve_thinking` 默认值改为 `false`，避免模型因重复注入推理思维而造成 “思维循环” | @niceIrene |

> ✅ #5870 虽为 OPEN 状态，但已获 approving review，实质可视为今日推进。

此外，社区贡献者在持续质量建设方面成果突出：

- @hanson-hex 提交 **157 个单元测试**，覆盖 inbox 模块（#5809）、控制台大会话（#5810）和运行时安全（#5813），并修复了 inbox 日志读取崩溃、rm 检测绕过等隐藏缺陷。
- @RerankerGuo 提交的 `fix(chat): prioritize built-in slash commands`（#5751）和 `fix(security): redact secrets in persisted dialog artifacts`（#5745）正在审核中，有望进入下一版。

---

### 社区热点

以下 Issue 与 PR 获得最高社区关注（评论数最多），反映了用户最迫切的需求与痛点：

1. **[Iss #5757](https://github.com/agentscope-ai/QwenPaw/issues/5757) – [Bug]: 飞书信息不回复情况**（12 评论）  
   用户反馈 Docker 与 SaaS 实例均存在 “首次回复正常，后续消息静默丢弃” 现象，严重影响 IM 频道使用。该问题已持续多日，仍处于 OPEN 状态。

2. **[Iss #5846](https://github.com/agentscope-ai/QwenPaw/issues/5846) – [Bug]: 关闭模式下仍弹出审批弹窗**（10 评论）  
   用户选择 “所有工具自动执行” 后仍然被审批弹窗阻断，需手动放行才能继续，令自动化流程完全失效。该问题已在同日关闭，推测已通过 #5864 等修复。

3. **[Iss #5171](https://github.com/agentscope-ai/QwenPaw/issues/5171) – [Bug]: 上下文压缩保留缺失，导致任务中断**（9 评论）  
   当人设文件 token 超限时，上下文被完全清空，Agent 丢失所有记忆。该 Issue 已在今日关闭，疑似通过 scroll 保护机制（#5871, #5848）得到缓解。

4. **[Iss #5379](https://github.com/agentscope-ai/QwenPaw/issues/5379) – [Bug]: 安装后启动 Internal Server Error**（8 评论）  
   通过 pip 安装后访问页面直接 500，根因指向 `get_remote_addr(transport)` 异常。该问题仍 OPEN，影响新用户部署。

**背后诉求**：用户对 IM 频道可靠性和自动化无审批执行需求强烈；上下文压缩的正确性成为 v2.0 能否进入生产环境的关键瓶颈。

---

### Bug 与稳定性

今日新开 Bug 中，按严重程度排列如下：

| 严重等级 | Issue | 描述 | 是否有 Fix PR |
|----------|-------|------|--------------|
| Critical | [#5860](https://github.com/agentscope-ai/QwenPaw/issues/5860) | **v2.0 频繁对话进度丢失与无限循环**。用户连续询问后 Agent 突然跳回旧问题，或重复同一轮工具调用。表现为未触发压缩时上下文错乱。 | 无直接修复，相关改进见 #5871、#5848 |
| High | [#5863](https://github.com/agentscope-ai/QwenPaw/issues/5863) | **编程会话中图片文件显示为二进制乱码**，工作区未能正确渲染图片。 | 无 |
| High | [#5859](https://github.com/agentscope-ai/QwenPaw/issues/5859) | **调用 OpenCode 中 DeepSeek 模型失败**，自动记忆搜索注入的消息缺少 `reasoning_content` 字段，关闭自动搜索即正常。 | 无 |
| Medium | [#5868](https://github.com/agentscope-ai/QwenPaw/issues/5868) | **Matrix 频道 token 登录失败**，升级后报 `M_MISSING_TOKEN`，旧版本正常。 | 无 |
| Low | [#5784](https://github.com/agentscope-ai/QwenPaw/issues/5784) | **前端压缩阈值显示错误**——同名模型跨 provider 时未校验 `provider_id`，导致 UI 显示错误阈值。 | 无 |

**已修复的稳定性问题**（今日关闭）：  
- [#5746](https://github.com/agentscope-ai/QwenPaw/issues/5746) scroll 压缩错误折叠当前任务（修复随 #5871 等）；  
- [#5328](https://github.com/agentscope-ai/QwenPaw/issues/5328) DeepSeek 思考卡死（已关闭）；  
- [#5416](https://github.com/agentscope-ai/QwenPaw/issues/5416) 思考输出与上下文截断（已关闭）；  
- [#5162](https://github.com/agentscope-ai/QwenPaw/issues/5162) 对话思考逻辑死循环（已关闭）。

---

### 功能请求与路线图信号

| Issue/PR | 类型 | 描述 | 可能纳入版本 |
|----------|------|------|-------------|
| [#5852](https://github.com/agentscope-ai/QwenPaw/issues/5852) | Feature | **审批待处理时发出系统提示音**，避免用户错过关键审批请求 | 路线图候选 |
| [#5869](https://github.com/agentscope-ai/QwenPaw/pull/5869) | PR (待合并) | **在 TUI 与 Web 控制台斜杠自动完成中暴露所有系统命令**（/new, /history, /plan 等） | 下一小版本 |
| [#5801](https://github.com/agentscope-ai/QwenPaw/pull/5801) | PR (待审核) | **新增 Zalo Bot 频道**——基于轮询方式对接越南最流行聊天平台，无需公网端点 | 路线图 |
| [#5692](https://github.com/agentscope-ai/QwenPaw/pull/5692) | PR (待审核) | **记忆搜索增加 Reranker**，在 reme0.4 混合检索后排序 | v2.1 候选 |
| [#5187](https://github.com/agentscope-ai/QwenPaw/pull/5187) | PR (开放) | **Windows 桌面 GUI 自动化**（UIA + Tauri 控制模式），允许 Agent 操作 Windows 桌面 | 路线图 |
| [#3302](https://github.com/agentscope-ai/QwenPaw/issues/3302) | Feature | **任务完成提醒（系统通知 + 声音）+ 多指令排队**，原始需求发布于 4 月，今日仍有评论 | 用户呼声较高 |  

**信号判断**：scroll 系列修复后，上下文管理逐渐稳定；社区频道扩展（Zalo、Matrix）和自动化体验优化（声音提醒、斜杠命令补齐）将是近期迭代重点。

---

### 用户反馈摘要

- **飞书频道可靠性差**：“不论是 Docker 还是 AgentScope Platform 实例，都是第一个信息回复，再发信息就无反应。机器人显示收到但没有任何回复。” —— #5757  
- **v2.0 上下文错乱严重**：“我问现在几点，下一个问题询问什么是 GitHub，突然画风一转开始回答几点，完全不知道我询问的是什么是 GitHub，且未显示触发压缩。” —— #5860  
- **审批弹窗不受控**：“选中关闭模式还是会弹出审批弹窗，导致任务无法自动运行。” —— #5846  
- **流式输出卡顿**：“Console 流式输出过程中浏览器明显卡顿，回答越长越明显，回答完毕后立即恢复。DeepSeek 网页版没有此现象。” —— #5725  
- **安装门槛**：“通过 Python 管理安装最新版，启动后访问页面直接 Internal Server Error，日志显示 `get_remote_addr(transport)` 错误。” —— #5379  

---

### 待处理积压

以下重要 Issue 或 PR 长时间未获得响应，建议维护者优先关注：

| 项目 | 创建时间 | 描述 | 链接 |
|------|----------|------|------|
| Issue #5259 | 2026-06-17 | **Windows 上向量索引无法持久化**，关闭 “启动时重建记忆索引” 后 `memory_search` 返回空 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/5259) |
| Issue #5379 | 2026-06-22 | **pip 安装后启动 Internal Server Error**，影响初次上手的用户 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/5379) |
| Issue #5725 | 2026-07-02 | **Console 流式输出引发浏览器卡顿**，部分用户因此放弃使用 Console | [查看](https://github.com/agentscope-ai/QwenPaw/issues/5725) |
| Issue #5784 | 2026-07-05 | **前端压缩阈值显示错误**（跨 provider 同名模型） | [查看](https://github.com/agentscope-ai/QwenPaw/issues/5784) |
| PR #5187 | 2026-06-14 | **[Feature] Windows 桌面 GUI 自动化**，首个版本已提交但长期未合并 | [查看](https://github.com/agentscope-ai/QwenPaw/pull/5187) |

此外，#5860 虽为新开 Issue，但因其严重性（v2.0 上下文完全错乱）也应纳入应急跟踪。

---

*本报告基于 QwenPaw 仓库（[agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)）截至 2026-07-09 00:00 UTC 的公开数据生成，所有时间戳均以 GitHub 记录为准。*

</details>