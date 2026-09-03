---
title: AI CLI 工具社区动态日报
published: 2026-07-10
report: ai-cli
tags:
  - radar
  - AI
---
# AI CLI 工具社区动态日报 2026-07-10

> 生成时间: 2026-07-10 00:42 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

好的，作为资深技术分析师，现基于您提供的 2026-07-10 各工具社区动态摘要，为您呈现 **AI CLI 工具生态横向对比分析报告**。

---

# AI CLI 工具生态横向对比分析报告 | 2026-07-10

## 1. 生态全景：从“能用”到“好用”的信任阵痛期

2026 年 7 月的 AI CLI 工具生态正处于典型的 **“成长阵痛期”**。经历了功能的狂飙突进后，行业集体进入了 **“信任重塑”** 阶段。核心矛盾从“能否写代码”转向“能否在不烧光预算、不挂起终端、不泄漏凭证的前提下稳定工作”。**OpenAI Codex 的 v0.144.0 发布即翻车**与 **Claude Code 的成本信任危机** 是当下的最响警钟，而 **Gemini CLI 在安全与可靠性工程上的深度投入** 则代表了破局方向。市场正在从“功能先行”无情地滑向“可靠性与可预测性先行”。

## 2. 各工具活跃度对比

| 工具 | 社区 Issue 密度 | PR 活跃度 | 发布动态 | 核心情绪 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | **极高** (成本焦虑/Cowork阵痛) | 低 (文档修复) | 无 | **焦虑** (隐性涨价/功能落差) |
| **OpenAI Codex** | **极高** (费率暴涨/v0.144.0崩溃) | **极高** (架构/可观测性/沙箱) | v0.144.0 (翻车) → v0.144.1 (热修复) | **愤怒+失望** (发布质量崩塌) |
| **Gemini CLI** | 高 (Agent挂起/误报) | **极高** (安全加固/评估系统) | 无 | **稳定但有痛点** (工程感最佳) |
| **DeepSeek Reasonix** | 高 (数据丢失/新版本回归) | **极高** (直接Bug修复/飞书集成) | v1.17.9 | **边升级边踩坑** (迭代快但脆) |
| **OpenCode** | 中等 (剪贴板/CPU/V2适配) | 中等 (V2稳定性/模型适配) | **高频发布** v1.17.16→18 | **性能焦虑** (CPU退化/基础体验) |
| **Qwen Code** | 中等 (多工作区/插件/安全) | 高 (Web Shell/定时任务/审查) | cua-driver-rs-v0.7.1 | **期待中带刺** (功能强但生态脆) |
| **Hermes** | 中等 (Provider路由/Cron) | 高 (Cron弹性/MCP/安全) | 无 | **运维疲惫** (密钥管理/无头模式) |

> **数据来源：** 各工具 GitHub 社区提供的日报摘要。密度评估基于 Issue 评论量、点赞数与严重性标签的综合加权。

## 3. 共同关注的功能方向

社区共识正在形成，以下五个方向是“跨工具”的普遍期待：

1.  **精细化成本控制 (Cost Control)**
    *   **涉及工具：** Claude Code, Codex, DeepSeek Reasonix, Qwen Code
    *   **核心诉求：** 用户对Token消耗的敏感度已逼近对内存泄漏的敏感度。要求禁用自动上下文采集、按任务选择模型、实时额度展示。**“隐形扣费”是当前最大的信任黑洞。**

2.  **子代理与工作流可观测性 (Sub-Agent Observability & Stability)**
    *   **涉及工具：** Claude Code, Codex, Gemini, OpenCode, Qwen Code
    *   **核心诉求：** Agent执行不再是黑盒。用户要求看到子代理的完整执行树、被取消后不丢失已生成内容、以及手动干预/纠错的能力。**“挂起不报错”和“静默误报”是开发效率的头号杀手。**

3.  **跨平台体验一致性 (Cross-Platform Parity)**
    *   **涉及工具：** Claude Code, Codex, OpenCode, DeepSeek Reasonix
    *   **核心诉求：** Windows 和 Linux 用户长期处于“二等公民”地位。Cowork挂载失效、沙箱延迟、守护进程崩溃是高频投诉。**谁能先解决“非Mac”体验的隐形天花板，谁就能收割巨大的沉默市场。**

4.  **安全左移与凭证治理 (Security Shift-Left)**
    *   **涉及工具：** Gemini, Hermes, Qwen Code
    *   **核心诉求：** 从RCE、CI供应链投毒到凭证泄漏，安全问题不再是企业后置需求，而是开发者日常痛点。社区开始主动要求构建时的安全门禁和运行时的故障隔离。

5.  **插件/MCP生态的运行时治理 (Plugin Runtime Governance)**
    *   **涉及工具：** Claude Code, Codex, Qwen Code
    *   **核心诉求：** “随便装”的时代过去，用户需要插件的沙箱隔离、权限声明和版本管理。**生态繁荣的前提是“安全可控”，而非“越多越好”。**

## 4. 差异化定位分析

| 工具 | 核心差异化标签 | 目标用户画像 | 技术路线特点 |
| :--- | :--- | :--- | :--- |
| **Claude Code** | **生态集成平台** | 深度依赖Anthropic模型的全栈团队 | 强Cowork协作、插件Marketplace、重功能整合 |
| **OpenAI Codex** | **PaaS级Agent运行时** | 以OpenAI为核心的重度付费/企业用户 | 强架构投入（Sandbox/Observability），正从CLI转向平台 |
| **Gemini CLI** | **安全与质量的标杆** | 金融/安全合规敏感型开发者 | 技术债务清除优先、评估体系（Eval/CI）最完善、“防呆”设计 |
| **DeepSeek Reasonix** | **桌面与东亚生态的枢纽** | 亚太区重度桌面用户、IM协作深度用户 | 桌面端体验最强、飞书Bot集成革命性、修复速度极快 |
| **OpenCode** | **模型中立的极速先锋** | 追求前沿模型（GPT-5.6/Grok）的尝鲜者 | 版本迭代最快、多模型支持最广，但基础体验打磨稍逊 |
| **Qwen Code** | **服务端自动化的指挥塔** | 运维/后台开发、浏览器端IDE用户 | Web Shell产品领先、条件触发的定时任务（Scheduled Tasks）最佳 |
| **Hermes** | **Provider路由的调度中心** | API聚合商、多Provider战略储备者 | 密钥池/网关模式独特、Cron后台作业场景专精 |

## 5. 社区热度与成熟度评估

*   **最高信任危机 / 最焦虑：OpenAI Codex**
    *   原因：GPT-5.5的费率暴增（#28879, 354 👍）和v0.144.0的完全不可用（#31831）在24小时内同时爆发，严重动摇了用户基础。**他们正在为快速迭代付出代价。**

*   **最具韧性 / 迭代最快：DeepSeek Reasonix**
    *   原因：1.17.9发布后立刻涌现多个严重数据丢失和逻辑Bug（#6260, #6257），但核心团队在24小时内提交了精准修复PR（#6278, #6275），展现了极高的修复响应速度。**社区虽有抱怨但仍在跟进。**

*   **最稳健 / 工程投入最大：Gemini CLI**
    *   原因：虽无新版本发布，但整个PR列表几乎全是安全加固、评估基础设施和核心稳定性修复（Cron弹性、幽灵执行）。**这批输出展现的“防守型开发”成熟度远高于其他工具。**

*   **最具垂直深度 / 社区最专业：Hermes & Qwen Code**
    *   原因：两个社区的讨论议题非常聚焦。Hermes聚焦Provider联合与无头运行，Qwen聚焦服务端自动化和Web交互。用户群体画像清晰，反馈含金量高。

## 6. 值得关注的趋势信号（对开发者与决策者的洞察）

1.  **“Token焦虑”将主导下一代产品设计：** 谁能提供 **“成本预算模式”** （如：这个Refactor任务预估算力成本）、**“上下文审计器”** （显示当前对话已消耗哪些上下文），谁就能重建信任。用户正在要求LLM推理像云服务一样可计量。

2.  **代理可观测性是解锁深度信任的钥匙：** 全链路追踪（OTLP）、执行轨迹回放、子代理决策树可视化正在从“酷炫功能”变为“必备品”。**CLI工具正在从“终端”演化成“AI Debugger”。**

3.  **“发布质量红线”正在成为核心竞争力：** Codex v0.144.0 和 Claude Code 的 EADDRINUSE 回归是灾难性的。在一个更新即拆盲盒的环境里，**能提供稳定甚至“LTS”发布通道的工具将获得显著竞争优势。**

4.  **跨平台不再只是“兼容”，而是“平台化”机遇：** Windows 和 Linux 的顽固问题（特别是 Windows 沙箱延迟、Linux 守护进程崩溃）让大量 CI/容器场景用户望而却步。**先解决这些问题的工具将赢得云原生和 DevOps 市场。**

5.  **MCP/Plugin 生态进入“监管时代”：** 开发者不再追求“插件数量”，而是追求“运行时安全”和“权限可控”。**谁能提供沙箱化的插件运行环境（类似iOS的App Sandbox），谁就能吸引最高质量的开发者构建生态。**

6.  **模型路由与故障隔离成为新刚需：** Hermes 的密钥池问题、Qwen 的 YOLO/Plan 模式冲突、Claude 的复合命令权限——都在指向一个事实：**工具不能假定LLM是完美的。** 工具层需要成为LLM的“保险丝”和“断路器”。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

好的，作为 Claude Code 生态技术分析师，以下是基于 `github.com/anthropics/skills` 仓库数据（截止 2026-07-10）的社区热点报告：

---

### 1. 热门 Skills 排行

根据 PR 的关注度与评论热度，当前社区最聚焦的 6 个 Skill 或修复如下：

- **#1298 / #1323 — `skill-creator` 触发检测修复**（OPEN）
  - **功能**：修复 `run_eval.py` 始终报 0% 召回率的 Bug，加入并行触发检测与 Windows 兼容。
  - **热点**：**目前生态最严重的阻塞性问题。** 直接导致技能描述优化循环（`run_loop.py`）无法正常工作，社区 10+ 独立复现与跟进。
  - [查看 PR #1298](https://github.com/anthropics/skills/pull/1298) | [查看 PR #1323](https://github.com/anthropics/skills/pull/1323)

- **#1367 — `self-audit` 自我审计技能 v1.3.0**（OPEN）
  - **功能**：AI 输出前的机械文件验证 + 四维推理质量门禁。
  - **热点**：Agent 治理领域的标志性提案。社区围绕“交付前质量关卡”展开激烈讨论，被视为提升 AI 结果可靠性的关键探索。
  - [查看 PR #1367](https://github.com/anthropics/skills/pull/1367)

- **#514 — `document-typography` 文档排版技能**（OPEN）
  - **功能**：自动检测并修复孤儿词、孤行段落、编号错位。
  - **热点**：极其实用且精准的需求。社区普遍认为这是“用户没好意思提但确实在意”的高频痛点，提升文档专业度。
  - [查看 PR #514](https://github.com/anthropics/skills/pull/514)

- **#723 — `testing-patterns` 全栈测试模式技能**（OPEN）
  - **功能**：覆盖 Trophy 测试模型、AAA 模式、React Testing Library、E2E 测试。
  - **热点**：开发者对代码质量保证与测试自动化的刚需体现。社区期待其成为开发类 Skill 的标准范式。
  - [查看 PR #723](https://github.com/anthropics/skills/pull/723)

- **#486 — `ODT` 开放文档格式技能**（OPEN）
  - **功能**：支持创建、填充和转换 .odt / .ods 文件。
  - **热点**：企业级用户对 LibreOffice 和 ISO 标准格式互操作性的强烈需求，填补办公生态关键缺口。
  - [查看 PR #486](https://github.com/anthropics/skills/pull/486)

- **#83 — `skill-quality-analyzer` 元技能**（OPEN）
  - **功能**：对 Skill 本身进行结构、安全、性能等多维度质量扫描。
  - **热点**：社区生态治理意识的觉醒。随着 Skill 数量爆发，如何建立标准化质量检测机制成为焦点。
  - [查看 PR #83](https://github.com/anthropics/skills/pull/83)

---

### 2. 社区需求趋势

从 Issues 中可以提炼出三大明确趋势：

1. **安全与信任危机**（#492）：社区强烈质疑第三方技能冒用 `anthropic/` 命名空间的问题，要求建立信任边界与官方签名机制。
2. **企业级基础设施**（#228, #1175, #1061）：不再满足于单机使用，组织级技能共享库、SharePoint Online 安全处理、Windows 原生兼容性成为高频词。
3. **Agent 治理与高级编程模式**（#412, #1329, #1367）：社区需求从“让 Claude 做什么”升级为“如何安全、可审计地让 Claude 做复杂任务”，例如 Agent 策略管理、紧凑记忆表示等。

---

### 3. 高潜力待合并 Skills

以下 PR 讨论活跃、价值明确，有较大概率近期落地：

- **#1298 / #1323**：`skill-creator` 核心召回机制是当前生态最紧急的阻塞点，合并后能立刻恢复技能优化流水线。
- **#1367**：`self-audit` 概念前沿且实用，若通过审核将成为 Agent 技能质量保证的里程碑。
- **#1261**：隔离触发评估命令文件写入，解决并行会话文件污染问题，是 CI/CD 环境下 Skill 测试的必要前置修复。
- **#362 / #361**：UTF-8 多字节与 YAML 特殊字符检测，改动虽小但对开发者体验改善极大（尤其国际化社区）。
- **#723**：测试模式 Skill 受众广、逻辑扎实，很有潜力成为开发类技能的默认标配。

---

### 4. Skills 生态洞察

**一句话总结：**
> 社区核心诉求已从“技能数量扩展”全面转向 **“生态生产级治理”** ——集中火力修复核心工具链的致命缺陷（0% Recall 等），并构建安全信任、企业互操作与输出质量门禁体系，标志着 Claude Code 生态正从实验探索进入企业级平台蜕变的深水区。

---

好的，作为专注于 AI 开发工具的技术分析师，根据您提供的 GitHub 数据，我为您整理生成 **2026 年 7 月 10 日**的 Claude Code 社区动态日报。

---

## Claude Code 社区动态日报 | 2026-07-10

### 1. 今日速览
- **成本焦虑弥漫**：多起 Token 消耗异常报告（包含 Fable 5 及 Opus 4.8）让开发者对使用成本非常敏感，社区对精细化控制成本的需求空前强烈。
- **协作功能遭遇阵痛**：Cowork 协作模式在私有化 Marketplace 接入及 Windows 平台回归问题（文件夹无法挂载）上出现明显短板，成为社区讨论的焦点。
- **核心稳定性回归受质疑**：Linux 守护进程异常重启及 2.1.195 版本引入的 `EADDRINUSE` 致命错误，让用户对近期更新节奏产生担忧。
- **插件生态净化**：开源贡献者集中提交多项文档修复 PR，规范插件开发市场名称和配置格式。

### 2. 版本发布
- **过去 24 小时内无新版本发布。**

### 3. 社区热点 Issues
（精选 10 条最值得关注的 Issue）

| 排名 | Issue | 标签 | 标题 | 社区热度分析 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | [#16561](https://github.com/anthropics/claude-code/issues/16561) | `enhancement`, `security`, `tools` | **Feature: Parse compound Bash commands and match each component against permissions** | **👍 173 (全库最高赞)**。现存最古老且最受关注的议题之一。用户强烈要求权限系统能理解 `&&`、`|` 等复合命令，而非作为整体一刀切匹配。直接关系到复杂工作流的安全与效率。 |
| 2 | [#20944](https://github.com/anthropics/claude-code/issues/20944) | `enhancement`, `cost` | **[FEATURE] - Add Setting to Disable Automatic IDE Selection Context** | **👍 67**。用户对 AI 自动抓取 IDE 上下文作为输入并计入 Token 消耗感到不满。这是一个典型的“隐形涨价”痛点，社区希望拥有完全的上下文掌控权。 |
| 3 | [#28125](https://github.com/anthropics/claude-code/issues/28125) | `bug`, `cowork`, `macos` | **[BUG] Cowork Can't add private GitHub marketplace** | **33 条评论**。Cowork 协作功能的重大障碍。无法添加私有 GitHub Marketplace 让企业级团队无法正常使用协作模式。 |
| 4 | [#67506](https://github.com/anthropics/claude-code/issues/67506) | `bug`, `cost`, `model` | **[BUG] Token consumption with Fable 5 is not matching with its description** | **22 条评论**。Fable 5 模型 Token 消耗与官方宣称不符，导致用户在无感知情况下快速耗尽限额。这是新模型推广的信任危机。 |
| 5 | [#64961](https://github.com/anthropics/claude-code/issues/64961) | `bug`, `cost`, `model` | **[BUG] Opus 4.7/4.8 token usage regressed 2-3x after update; Opus 4.8 also disconnects frequently** | **回归+成本双暴击**。Opus 模型更新后 Token 消耗暴涨 2-3 倍且伴随频繁断连。依赖 Opus 进行深度编码的开发者面临成本失控风险。 |
| 6 | [#68146](https://github.com/anthropics/claude-code/issues/68146) | `bug`, `linux`, `agent-view` | **[BUG] [Linux] Transient daemon respawns/displaces itself every ~52s while `claude agents` is open** | **Linux 核心稳定性暴露**。后台守护进程高频重生，导致 MCP 连接和 Claude.ai 桥接不断崩溃，Linux 环境下的体验成为重大短板。 |
| 7 | [#72334](https://github.com/anthropics/claude-code/issues/72334) | `bug`, `linux`, `regression` | **[BUG] Daemon supervisor hard-exits on EADDRINUSE** | **警告意味浓厚**。由 Claude Code 自身（Opus 4.8）检测并撰写的根因分析报告。2.1.195 版本引入的控制套接字绑定竞争导致守护进程硬退出。 |
| 8 | [#76187](https://github.com/anthropics/claude-code/issues/76187) | `bug`, `windows`, `cowork`, `regression` | **[BUG] Cowork (Windows): project context folders never mount in new sessions** | **最新回归**。Windows 端 Cowork 完全无法使用，新增上下文文件夹对话框确认失效。已在多台设备复现，影响范围广。 |
| 9 | [#76217](https://github.com/anthropics/claude-code/issues/76217) | `bug`, `cost` | **[Bug] Session limit enforcement out of sync with actual usage after daily reset** | **计费系统 Bug**。日常重置后仍被限制使用，/status 显示与实际脱节。直接导致付费用户在额度内无法工作，损害信任。 |
| 10 | [#72871](https://github.com/anthropics/claude-code/issues/72871) | `enhancement`, `routines` | **Scheduled tasks (routines): show and allow choosing the model per routine** | **自动化控制需求**。社区希望为自动化例行任务（Routines）配置指定模型。既想复杂任务用 Opus，也想简单任务用 Sonnet 省成本。 |

### 4. 重要 PR 进展
（过去 24 小时共 4 条 PR，均为开源社区贡献）

| PR | 标题 | 内容摘要 | 意义 |
| :--- | :--- | :--- | :--- |
| [#76029](https://github.com/anthropics/claude-code/pull/76029) | **docs(plugin-dev): use flat format in .mcp.json example** | 修正插件开发文档中 `.mcp.json` 的示例结构，移除错误的 `mcpServers` 外层对象。 | 降低插件开发入门门槛，减少开发者因文档错误导致的配置失败。 |
| [#76028](https://github.com/anthropics/claude-code/pull/76028) | **docs(plugin-dev): fix stale marketplace name in README install instructions** | 修正插件 README 中过时的 `@claude-code-marketplace` 引用，与其他文档对齐。 | 修复了用户直接复制命令安装失败的常见问题，完善插件生态基础设施。 |
| [#76023](https://github.com/anthropics/claude-code/pull/76023) | **fix: detect GitHub Actions CI using directory test in load-context example** | 将 CI 检测示例中的 `-f`（文件检测）改为 `-d`（目录检测）。 | 修正 GitHub Actions 的上下文加载逻辑，确保 CI 检测能正确触发。 |
| [#75938](https://github.com/anthropics/claude-code/pull/75938) | **fix(sweep): unstarve markStale via search API; snapshot listings before mutating** | 修复 `markStale` 自动打标签脚本的逻辑 Bug，使其能正确遍历并标记过期 Issue。 | 自动化仓库管理工具的修复，有助于维护仓库长期健康。 |

### 5. 功能需求趋势
- **精细化成本控制 (Fine-grained Cost Control)**：这是本周绝对的核心主线。社区不再满足于“能用”，而是追求“用得值”。需求包括：**禁用自动上下文注入**（#20944）、**按任务选择模型**（#72871）、**严格控制 Loop 执行频率**（#75989），以及**模型 Token 消耗透明化**（#67506）。
- **企业级协作成熟度 (Enterprise Collaboration Maturity)**：Cowork 功能正在从“可用”向“好用”过渡。社区对 **私有化部署支持**（#28125）和**跨平台一致性**（#76187）有着强烈的刚性需求。
- **权限系统智能化 (Intelligent Permissions)**：现存的字符串匹配权限模式无法满足复杂工作流需求。社区期望系统能理解**命令的语义结构**（如复合命令解析 #16561）。
- **透明与安全审计 (Transparency & Audit)**：用户要求工具在**认证优先级**（#70124）、**会话限制计算**（#76217）等方面表现得更透明、可预期。

### 6. 开发者关注点
- **“烧钱”焦虑与信任危机**：Token 消耗不透明（Fable 5 不符 / Opus 4.8 暴增）和对自动上下文的担忧，使部分用户对深度的 AI 辅助变更加谨慎。**“花钱买了麻烦”** 是负面评价的高频标签。
- **大版本心态（Cowork 的期待落差）**：用户对 Cowork 寄予厚望，但在私有化场景和 Windows 平台体验不佳，导致开发者对 Anthropic 的 **“先发布，后修复”** 策略感到疲劳。
- **Linux 生态的“二等公民”感**：针对 Linux 的重现 Bug（#68146 的守护进程风暴）迟迟得不到根治，让在容器/服务器环境下工作的 AI 开发者感到沮丧。
- **“更新恐惧症”**：`EADDRINUSE` 回归（#72334）和 Windows Cowork 回归（#76187）说明，用户对于**引入新功能时破坏已有稳定功能**的容忍度已经很低。社区渴望看到更强大的回归测试体系或提供 “LTS” 稳定版本通道。
- **对“自愈工具”的新期待**：有意思的是，由 Claude Code 自己撰写了 Bug 分析报告（#72334），社区对此既赞赏也调侃，这衍生出新的需求：**工具能否在出现故障时提供更自动化的修复引导？**

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## OpenAI Codex 社区动态日报 | 2026-07-10

### 1. 今日速览
- **v0.144.0 发布即翻车**：核心组件 `codex-code-mode-host` 缺失导致 CLI 大面积瘫痪（#31831, #31906），团队被迫紧急发布 v0.144.1 修复版，创下了最短命的 Feature Release 记录。
- **GPT-5.5 信任危机持续**：Token 费率暴涨 10-20 倍（#28879，204 条评论）和推理 Token 强制截断聚类（#30364，176 条评论）成为社区最大的两项付费与性能焦虑源。
- **内部架构加速迭代**：团队在 Sandbox 安全隔离、TUI 稳定性及 App-Server 全链路追踪方面提交了超过 15 个核心 PR，底层重构节奏显著加快。

---

### 2. 版本发布

| 版本 | 类型 | 主要内容 |
|------|------|---------|
| **rust-v0.144.1** | Hotfix | 紧急修复 GitHub 元数据解析失败导致的安装问题；确保 macOS 安装包正确暴露 `codex` 主机二进制；新增主机二进制不可用时的回退逻辑 |
| **rust-v0.144.0** | Feature | 新增额度重置积分类型展示与选择交互；引入 `writes` 应用审批模式（读操作免确认、写操作弹窗提醒）；MCP 工具支持交互式认证请求 |
| **rust-v0.145.0-alpha.1/2** | Pre-release | 下一个里程碑的早期测试快照 |

---

### 3. 社区热点 Issues（Top 10）

**🔥 #28879** **GPT-5.5 (Plus) 费率暴涨 10-20 倍，5h 预算 2-3 个 Prompt 即耗尽**
- 评论：204 条 | 👍 354 | 持续更新至 07-09
- **重要性**：自 6月16日起，用户反馈 `token_count` / `rate_limits` 日志显示每 Token 消耗的额度百分比异常增大，且无任何官方告警。这是当前社区最严重的“付费黑洞”危机，直接冲击产品信任基础。
- [查看 Issue](https://github.com/openai/codex/issues/28879)

**🔥 #30364** **GPT-5.5 推理 Token 锁定在 516/1034/1552，复杂任务效果断崖式下降**
- 评论：176 条 | 👍 279 | 持续更新至 07-09
- **重要性**：用户通过 `reasoning_output_tokens` 发现模型输出被强制对齐到固定边界。这意味着 Codex 在截断模型深度推理能力换取成本控制，对代码分析类重度用户影响巨大。
- [查看 Issue](https://github.com/openai/codex/issues/30364)

**#31831** **v0.144.0 CLI 完全不可用：codex-code-mode-host 找不到**
- 评论：31 条 | 👍 79
- **重要性**：Release 级阻断 Bug，Pro/Enterprise 用户无一幸免。社区对该版本的 QA 流程提出强烈质疑。
- [查看 Issue](https://github.com/openai/codex/issues/31831)

**#31906** **v0.144.0 Homebrew Cask 同样缺失 codex-code-mode-host**
- 评论：7 条 | 👍 24
- **重要性**：印证了 #31831 非个案，官方包管理渠道分发同样存在问题，影响范围被彻底坐实。
- [查看 Issue](https://github.com/openai/codex/issues/31906)

**#31958** **Windows 提权 Sandbox 导致每个 shell_command 延迟约 88 秒才能开始执行**
- 评论：1 条（NEW - 07-10）
- **重要性**：Windows 用户的“地狱级”体验——提权后进程创建前有接近一分半的静默等待期，普通用户几乎无法正常使用 Codex CLI。
- [查看 Issue](https://github.com/openai/codex/issues/31958)

**#31946** **macOS MCP 生命周期故障：1360 个 Node 进程吃满 41GB 内存导致全机卡死**
- 评论：2 条（NEW - 07-09）
- **重要性**：MCP 进程泄露引发 WindowServer 挂起，16GB 内存机型的噩梦场景。关联已有 Issue #30408，但复现后果更为严重。
- [查看 Issue](https://github.com/openai/codex/issues/31946)

**#20214** **Windows 11 桌面应用频繁卡顿/冻结，即便系统资源充足**
- 评论：29 条 | 👍 44 | 持续更新至 07-09
- **重要性**：从 4月 开始至今未解决的老大难问题。AMD Ryzen + 32GB 依然无法幸免，Windows 用户的普遍痛点。
- [查看 Issue](https://github.com/openai/codex/issues/20214)

**#19871** **MCP 工具调用在 v0.117.0+ 中对自定义/本地 Provider 出现回归**
- 评论：12 条 | 更新至 07-10
- **重要性**：跨了 8 个小版本仍未完全修复，严重挫伤了开发者构建自有 Agent 生态的积极性。
- [查看 Issue](https://github.com/openai/codex/issues/19871)

**#26951** **IDE 扩展在 VS Code Remote-SSH 场景下无限卡加载**
- 评论：12 条 | 更新至 07-10
- **重要性**：远程开发是团队标配工作流，此 Bug 直接封死了 Codex 进入企业级专业开发者日常的工具路径。
- [查看 Issue](https://github.com/openai/codex/issues/26951)

**#31664** **推理摘要中渲染出字面 HTML 注释 `<!-- -->`**
- 评论：3 条 | 👍 14
- **重要性**：虽评论数不高，但点赞数说明开发者对 UI 渲染质量和模型输出“洁净度”的高度敏感，暴露了 TUI 层的数据过滤缺位。
- [查看 Issue](https://github.com/openai/codex/issues/31664)

---

### 4. 重要 PR 进展（Top 10）

**Sandbox 隔离加固**
- **#31937**：修复 Linux Bubblewrap 沙盒找不到 `exec-server` 二进制的问题，确保受限文件系统配置下进程创建正常。
  - [查看 PR](https://github.com/openai/codex/pull/31937)
- **#31960**：新增 URI 权限转换器，确保远程和执行端权限调用保留 URI 语义，避免过早转换为本地 OS 路径。
  - [查看 PR](https://github.com/openai/codex/pull/31960)

**TUI 稳定性修复**
- **#31933**：修复 Ctrl+C 过早打断 Prompt 时对话记录丢失的问题，强制中断也视为持久化事件。
  - [查看 PR](https://github.com/openai/codex/pull/31933)
- **#31921**：重构安全缓冲重试逻辑，重试慢请求时改用 Session Fork 替代破坏性的 `thread/rollback`，保留对话完整性。
  - [查看 PR](https://github.com/openai/codex/pull/31921)

**架构演进**
- **#31885**：为异步 Hooks 引入会话级运行时（替代关闭的 #27771），使后台任务不再与发起操作紧密耦合。
  - [查看 PR](https://github.com/openai/codex/pull/31885)
- **#30131**：建立分页线程历史库 Schema（`thread_turns`, `thread_items`），为长对话的存储与检索做铺垫。
  - [查看 PR](https://github.com/openai/codex/pull/30131)
- **#31824**：允许会话级的模型供应商、模型目录及客户端在下一轮对话时无缝刷新，无需打断当前请求。
  - [查看 PR](https://github.com/openai/codex/pull/31824)

**Agent 生态**
- **#31945**：多外部 Agent 导入源支持（代码审查中），完善配置检测、市场插件、Hooks 及会话迁移的适配器框架。
  - [查看 PR](https://github.com/openai/codex/pull/31945)

**可观测性大升级（开发者体验底层建设）**
- **#31721 / #31724 / #31726 / #31725**：团队集中补齐 App-Server 的 RPC 追踪能力：
  - 记录 RPC 完成结果（成功/失败/替换/断连）；
  - 为文件监听、模糊搜索、进程执行等长生命后台工作创建独立根 Span；
  - 将活跃请求 Span 传播至 Tokio 子任务中；
  - 为服务端发起的反向 RPC 请求建立客户端级别追踪。
  - 这是近几个月投入最大的一次基础设施优化，将显著提升日后线上问题的定位效率。
  - [31721](https://github.com/openai/codex/pull/31721) | [31724](https://github.com/openai/codex/pull/31724) | [31726](https://github.com/openai/codex/pull/31726) | [31725](https://github.com/openai/codex/pull/31725)

---

### 5. 功能需求趋势

- **费用透明化与额度自治**：用户对“被悄悄扣费”的恐惧到达顶点（#28879）。v0.144.0 新增的额度重置积分类型展示只是一个开始，社区需要的是实时的 Token 消耗预警与细粒度的额度分配策略。
- **Agent 生态走向“多模型、多源”**：从 MCP 自定义 Provider 修复需求（#19871），到多外部 Agent 导入源（#31945），再到异步 Hooks 运行时（#31885），Codex 正从单一的对话工具向 PaaS 级的 Agent 运行时平台演进。
- **Windows 体验追赶**：Windows 依然是“二等公民”。沙盒 88 秒延迟（#31958）、桌面卡顿（#20214）、输入延迟（#28855）——三个不同维度的 Bug 共同指向对 Windows 工程投入的不足。
- **远程开发成为必须项**：VS Code Remote-SSH（#26951）和远程键盘交互认证（#23037）持续报损。企业用户是付费主力，而远程是他们不可妥协的开发范式。

---

### 6. 开发者关注点

- **发布质量救火队模式不可持续**：v0.144.0 断层级 Bug 的暴露表明，集成测试和灰度策略存在巨大盲区。开发者宁可要慢一点的稳定版本，也不愿每次更新都拆盲盒。
- **模型治理的控制权焦虑**：GPT-5.5 的费率与推理长度突然被“后台调整”，用户感到完全失控。社区反复呼吁提供 `max_reasoning_tokens` 的手动上限和明确的计费算式，而不是事后在日志里推测。
- **MCP 生态的信任修复迫在眉睫**：一个跨 8 个小版本的 MCP 定制 provider 回归 Bug，让生态建设变得极其尴尬。新推出的交互式认证（v0.144.0）是正向信号，但前提是基础链路先稳住。
- **问题复现度极低，调试体验差**：用户遇到的项目消失（#31845）、数据库锁（#31184）、插件静默失败（#15477）等“幽灵 Bug”很难提供有效日志。这反过来要求 OpenAI 将 Obserability 建设（如今天 PR 系列所展示）加速落地到用户可感知的层。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

好的，作为 AI 开发工具技术分析师，以下是基于提供的数据生成的 2026-07-10 日报。

---

# Gemini CLI 社区动态日报 | 2026-07-10

## 📌 今日速览
- 过去 24h 无新版本发布，但安全与可靠性相关的核心修复密集推进，社区活跃度极高。
- **a2a-server 严重 RCE 漏洞**修复（#28319）和**CI 供应链攻击面加固**（#28232）进入深度审查，安全左移趋势极为明显。
- **Agent 循环稳定性**成为另一焦点，两项停滞检测断路器 PR（#28331, #28333）同日提交，旨在根治 Agent 在执行过程中的“假死”与提前退出问题。

## 🚀 版本发布
（无）

## 🔥 社区热点 Issues
1.  **[Bug] 子代理 MAX_TURNS 中断后误报成功 🐛**
    问题 #22323：`codebase_investigator` 子代理在达到最大轮次限制后被强制停止，但仍然向用户报告 `status: "success"`，完全掩盖了任务实际被打断的事实。评论数最高（10条），社区认为该错误会严重误导用户对任务结果的判断。
    [GitHub Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2.  **[Bug] 通用 Agent 永久挂起 🐛**
    问题 #21409：当 Gemin iCLI 委派任务给通用 Agent（Generalist Agent）时，进程会永久挂起，甚至连简单的文件夹创建都无法完成。该问题获得 8 个 👍，是当前“最令人沮丧”的交互 Bug 之一。
    [GitHub Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)

3.  **[Bug] Shell 命令执行完成后卡死 🐛**
    问题 #25166：无论多简单的 CLI 命令，执行完毕后 Gemini 经常卡在 “Awaiting user input” 状态，而底层命令早已完成。这是核心终端交互层的稳定性隐患。
    [GitHub Issue #25166](https://github.com/google-gemini/gemini-cli/issues/25166)

4.  **[Bug] Agent 缺乏调用被动技能/子代理的主动性 🤖**
    问题 #21968：用户反馈，即使配置了完善的 Gradle、Git 等自定义 Skill，Gemini 依然倾向于“自由操作”而不是主动调用这些封装好的能力。导致用户投入配置高级功能的成本被闲置。
    [GitHub Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)

5.  **[Enhancement] 释放模型原生 Bash 操作能力 💡**
    问题 #19873：一项极具前瞻性的架构提案，建议通过零依赖 OS 沙箱和后执行意图路由，让模型发挥其原生训练的 POSIX 工具链（grep、sed、awk等）能力，而非被目前的操作封装限制。
    [GitHub Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873)

6.  **[Epic] AST 感知的代码读取与操作 📐**
    问题 #22745：跟踪 AST 感知工具的调研，希望未来 Agent 能通过理解代码的抽象语法树，实现更精准的方法定位、搜索和代码库映射，以减少 Token 消耗和错误交互。
    [GitHub Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)

7.  **[Epic] 组件级评估体系建设 💪**
    问题 #24353：质量基础设施的重点 Epic。继引入行为评估测试后，社区开始关注建立更全面的组件级评估框架，确保核心能力的回归稳定性。
    [GitHub Issue #24353](https://github.com/google-gemini/gemini-cli/issues/24353)

8.  **[Bug] 浏览器子代理 Wayland 兼容性 🐛**
    问题 #21983：该子代理在 Linux 的 Wayland 显示协议下完全无法工作，直接报错退出，影响了 Linux 用户的核心体验。
    [GitHub Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983)

9.  **[Bug] Auto Memory 低信号会话无限重试 🔄**
    问题 #26522：“自动记忆”功能存在逻辑缺陷，对于被认为“低价值”的对话，提取代理若不读取就会导致索引残留并无限重试曝光，造成资源浪费。
    [GitHub Issue #26522](https://github.com/google-gemini/gemini-cli/issues/26522)

10. **[Feature] 阻止 Agent 的破坏性操作 🛑**
    问题 #22672：社区强烈要求 Agent 在面对 `git reset --force` 或危险数据库操作时，能主动刹车并提供更安全的替代方案，而不是被动等待权限允许。
    [GitHub Issue #22672](https://github.com/google-gemini/gemini-cli/issues/22672)

## 🔧 重要 PR 进展
1.  **修复 a2a-server 零点击 RCE 漏洞 🔥**
    PR #28319：重构了 a2a-server 的环境加载和启动序列，彻底消除了在不信任工作区中通过环境投毒实现远程代码执行的攻击面。这是本周期的最大安全补丁之一（size/xl）。
    [GitHub PR #28319](https://github.com/google-gemini/gemini-cli/pull/28319)

2.  **引入 LLM 驱动的 Issue 分诊机器人 🤖**
    PR #28345：实现了基于 Antigravity SDK 的 LLM 推理编排器和 GCS 调试日志系统，旨在自动对社区 Issue 进行分类、路由和优先级判断，提升项目维护效率。
    [GitHub PR #28345](https://github.com/google-gemini/gemini-cli/pull/28345)

3.  **修复信任对话框中的 Hook 信息泄露 🔒**
    PR #28346：优化了文件夹信任探测逻辑，现在只会报告实际可执行的 Hook 定义，避免将无效条目暴露给用户造成安全误解，并增加了对危险配置的警告。
    [GitHub PR #28346](https://github.com/google-gemini/gemini-cli/pull/28346)

4.  **Agent 循环停滞检测与引导恢复 ⚙️**
    PR #28331：引入“停滞检测断路器”，专门解决了 Agent 在 `/rewind` 操作后因模型只回文本而无工具调用就提前退出/挂起的关键问题，确保行为连续性。
    [GitHub PR #28331](https://github.com/google-gemini/gemini-cli/pull/28331)

5.  **Eval 静态分析工具与 CI 门禁 📄**
    PR #28344：新增 `eval:validate` 命令，可对 Eval 源文件执行 9 条静态分析规则，违规则以状态码 1 退出，从根本上提升了评估体系在 CI 流程中的权威性。
    [GitHub PR #28344](https://github.com/google-gemini/gemini-cli/pull/28344)

6.  **修复任务取消后的“幽灵执行” 👻**
    PR #28316：修复了取消 Agent Task 后底层执行流未终止的 Bug，并修补了代码审查中发现的多处竞态条件和内存泄漏，提升了核心 Agent 的稳定性。
    [GitHub PR #28316](https://github.com/google-gemini/gemini-cli/pull/28316)

7.  **修复非认证场景下的 401 误报 🐛**
    PR #28328：`isAuthenticationError` 函数会匹配任意包含 `401` 子串的路径（如 `localhost:4012`），导致触发不必要的 OAuth 回退。该 PR 净化了错误分类逻辑。
    [GitHub PR #28328](https://github.com/google-gemini/gemini-cli/pull/28328)

8.  **CI 管道供应链攻击面修复 🛡️**
    PR #28232：将 Eval 工作流拆分为 `pull_request` + `workflow_run`，防止恶意 Fork 通过 `pull_request_target` 窃取 GitHub Token 和 API Key，加固了 CI 安全基座。
    [GitHub PR #28232](https://github.com/google-gemini/gemini-cli/pull/28232)

9.  **IDE 认证 Token 文件 TOCTOU 修复 🪟**
    PR #28330：将 Token 端口文件的写入与权限设置 (`0o600`) 改为原子操作，消除了 `writeFile` 与 `async chmod` 之间的时间差窗口，防止其他进程读到全局可读的 Token。
    [GitHub PR #28330](https://github.com/google-gemini/gemini-cli/pull/28330)

10. **精准修复 JSON/IPYNB 文件写损坏 🩹**
    PR #28223：高针对性地修复了 `write_file` 和 `replace` 工具在修改 `.ipynb` 和 `.json` 文件时的格式化破坏问题，避免了这类高频场景下的数据灾难。
    [GitHub PR #28223](https://github.com/google-gemini/gemini-cli/pull/28223)

## 📈 功能需求趋势
1.  **深度安全左移**：从近日密集的 PR 可以看出，社区和团队正在系统性地排查和消除各类攻击面（RCE、TOCTOU、供应链投毒）。安全已从“外部依赖”升级为“核心架构基座”。
2.  **Agent 稳定性仍是最大工程挑战**：无论是 Issue 中的高频挂起反馈，还是 PR 中反复出现的停滞检测、幽灵执行修复，都表明确保 Agent 运行“不卡壳、不暴毙”是用户体验提升的关键瓶颈。
3.  **精细化的评估体系 (Eval)**：社区不再满足于简单的端到端测试，组件级评估、AST 辅助静态分析、工具调用可视化变得愈发重要，这代表了 AI 工具的成熟度正在向传统开发工具看齐。
4.  **释放模型原生潜力**：不再一味约束模型行为，而是通过更好的沙箱（#19873）和智能路由来适配模型原生的 Shell 操作偏好，这可能是未来能力跃升的一个突破口。

## 🗣️ 开发者关注点
- **可靠性是痛点，更是共识**：开发者对 Agent 的“可靠”提出了极高要求。Shell 假死、子代理误报、通用 Agent 无响应等问题反复被提及，并获得了大量共识性点赞。这是目前最核心的信任危机。
- **工具调用策略待优化**：不少开发者投入精力配置了 Skill 和 Sub-agent，却因模型调用意愿低而感到“白费功夫”。这不仅是一个 Bug，更关系到 CLI 扩展生态的价值兑现。
- **安全合规需求升级**：用户正在要求 Agent 具备“道德判断力”，在可能造成破坏时主动干预或劝阻。这标志着开发者对 AI 工具的信任正在从“能用”向“放心用”过渡。
- **关注项目本身的工程质量**：社区不仅关注 CLI 的输出结果，也开始关心背后的质量保障流程。对 Eval 工具链和 Issue 分诊机器人讨论的增多，反映了用户对项目“自我进化”能力的期待。

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

好的，这是根据您提供的 GitHub 数据生成的 2026-07-10 社区动态日报。

---

# DeepSeek Reasonix 社区动态日报 (2026-07-10)

## 今日速览
1. **v1.17.9 正式发布**，新增 Agent 自主修复配置能力，核心团队密集合并多笔修复与特性 PR，重心直指近期频繁爆出的**会话数据丢失**与**Planner 审批逻辑缺陷**。
2. **新版本反馈喜忧参半**：虽然 #6276 等编码修复已合入，但用户立刻反馈了`Deepseeker 工具参数缺失`(#6259)及`手动取消导致历史丢失`(#6260)等严重回归，社区呈现“边升级边踩坑”的紧张状态。
3. **飞书（Feishu/Lark）Bot 集成迎来自`cc-connect`以来最大规模重构**，桌面上帝视角、媒体回传与流式编辑等功能密集上版，战略级向企业协作场景进发。

## 版本发布
- **Reasonix CLI v1.17.9 & Desktop v1.17.9**
  - **新特性**: Agent 现在被允许修复 Reasonix 自身的配置问题，提升了 Agents 的自愈能力。
  - **UI 优化**: 统一了创建面板与 Windows 控制框背景色；优化了上下文窗口环（ContextWindowRing）的弹窗数据展示。
  - **结构**: 合并了多笔文档和依赖更新。

## 社区热点 Issues (Top 10)
1. **[#6260] [Bug] 手动取消的对话再次对话会丢失部分历史记录 (v1.17.9, data-loss)**
   - **重要性**: ⭐⭐⭐⭐⭐ 本次日报中最严重的**数据丢失 Bug**。手动终止后重新对话，思考过程、执行步骤均消失，甚至导致模式状态紊乱（退出 Plan Mode 后 AI 仍认为处于该模式），极度影响生产力。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/6260](https://github.com/esengine/DeepSeek-Reasonix/issues/6260)

2. **[#6132] [Bug] Bash卡住 (v1.17.5, crash, 9条评论)**
   - **重要性**: ⭐⭐⭐⭐⭐ 高频崩溃问题。使用 Bash 工具时进程无限等待，无报错提示，导致 Agent 流程完全停摆，社区讨论热度持续。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/6132](https://github.com/esengine/DeepSeek-Reasonix/issues/6132)

3. **[#6259] [Bug] 一直显示 deepseeker 工具缺失思考参数 (v1.17.9, 回归)**
   - **重要性**: ⭐⭐⭐⭐ 刚升级最新版立刻爆发的新回归 Bug，核心推理工具链断裂，直接影响所有依赖 DeepSeek 模型的用户。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/6259](https://github.com/esengine/DeepSeek-Reasonix/issues/6259)

4. **[#5831] [Bug] 编辑工具反复失败，模型无法写入文件 (v1.15.0, 8条评论)**
   - **重要性**: ⭐⭐⭐⭐ 持续数个版本的经典痛点，模型在编辑文件时频繁失败，被迫降级使用 PowerShell 替代，严重影响 Agent 基本开发能力。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/5831](https://github.com/esengine/DeepSeek-Reasonix/issues/5831)

5. **[#6117] [Bug] 目标模式下长时间运行时频繁出现 session conflict (v1.17.5, 7条评论)**
   - **重要性**: ⭐⭐⭐⭐ YOLO 模式下任务一长就飞弹冲突副本，生成大量 Recovery Branch，不仅造成数据混乱，还让开发者对长期任务产生恐惧。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/6117](https://github.com/esengine/DeepSeek-Reasonix/issues/6117)

6. **[#6239] [Bug] 残留的 bash 进程卡在 sandbox 锁上，堵死所有命令 (v1.17.8, crash)**
   - **重要性**: ⭐⭐⭐⭐ 沙箱机制的死锁 Bug。一次失败的 Bash 执行会导致所有后续命令排队阻塞，直接宣告 Agent 自动化流程的死刑。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/6239](https://github.com/esengine/DeepSeek-Reasonix/issues/6239)

7. **[#6251] [Bug] 经典模式界面无法通过拖拽顶栏拖拽窗口 (v1.17.9)**
   - **重要性**: ⭐⭐⭐ 新版 UI 回归 Bug。Windows 经典模式下标题栏拖拽功能失效，违反了用户对桌面应用的基本操作预期，社区反馈敏感（2 👍）。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/6251](https://github.com/esengine/DeepSeek-Reasonix/issues/6251)

8. **[#6152] [Bug] 多显示器分辨率不一致导致画面变糊 (v1.17.6)**
   - **重要性**: ⭐⭐⭐ 多屏开发者的高频痛点。主屏 1366/副屏 1920 切换全屏时，画面渲染异常为低分辨率，且属于近几个版本引入的回归问题。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/6152](https://github.com/esengine/DeepSeek-Reasonix/issues/6152)

9. **[#6257] [Bug] Planner 的“等待批准”误解为“可以执行” (v1.17.9, 工作流缺陷)**
   - **重要性**: ⭐⭐⭐⭐ 严重的**工作流逻辑 Bug**。Planner 生成方案后询问用户“是否批准”，程序跳过宿主审批机制直接自动交给 Executor 执行，剥夺了用户决策权。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/6257](https://github.com/esengine/DeepSeek-Reasonix/issues/6257)

10. **[#6267] [Bug] System prompt 重复注入 (v1.17.9, 架构缺陷)**
    - **重要性**: ⭐⭐⭐ 每次 Executor Handoff 都会向系统提示词中重复注入 `reasoning-language` 等块，已观察叠加 2-4 层，长期运行将严重消耗 Token 并可能导致模型行为异常。
    - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/issues/6267](https://github.com/esengine/DeepSeek-Reasonix/issues/6267)

## 重要 PR 进展 (Top 10)
1. **[#6275] Bind planner handoffs to host approval gates (SivanCola)**
   - **影响**: ⭐⭐⭐⭐⭐ 直接修复 #6257 的架构缺陷。现在 Planner 必须将审批请求路由至宿主机制，只有当用户通过宿主明确批准后，Executor 才能执行，堵上了自动化绕开的漏洞。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/6275](https://github.com/esengine/DeepSeek-Reasonix/pull/6275)

2. **[#6278] fix(desktop): preserve cancelled turn display history (GTC2080)**
   - **影响**: ⭐⭐⭐⭐⭐ 直击 #6260 数据丢失痛点。通过引入 `display-only sidecar`，在被手动取消的回合中，即使不写入模型 Transcript，也能在重载时保留推理、流式文本与工具卡片，极大提升无痛体验。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/6278](https://github.com/esengine/DeepSeek-Reasonix/pull/6278)

3. **[#6270] feat(windows-desktop): 中断后保留流式回复的部分内容 (SauronSkywalker)**
   - **影响**: ⭐⭐⭐⭐ 姊妹修复。用户中断模型回复后，已流出的文本不再完全消失，刷新或切换会话后至少保留部分内容，减少因误碰取消导致的信息损失。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/6270](https://github.com/esengine/DeepSeek-Reasonix/pull/6270)

4. **[#6276] Fix Windows encoded config reads (SivanCola)**
   - **状态**: ✅ **已合并**
   - **影响**: ⭐⭐⭐⭐⭐ 修复了 Windows 平台 Global Hooks 和 Config 文件在 GB18030/GBK 编码下读取失败的问题，直接解决了 #5831 等历史遗留的编码错误。中文 Windows 用户的重大胜利。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/6276](https://github.com/esengine/DeepSeek-Reasonix/pull/6276)

5. **[#6277] Refine reasoning work process display (SivanCola)**
   - **影响**: ⭐⭐⭐⭐ 桌面端 UI 大重构。将助手工作流拆分为外层（Working/Worked + 耗时）与内层（推理阶段），最终回答独立展示。兼容标准与紧凑模式，提升了长任务的可观测性。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/6277](https://github.com/esengine/DeepSeek-Reasonix/pull/6277)

6. **[#6274] Desktop god view via Feishu bot (SivanCola)**
   - **影响**: ⭐⭐⭐⭐⭐ 飞书 Bot 革命性功能。管理员可在 IM 中实时**观察、远程审批、显式接管**桌面会话，打破了本地 Agent 与远程协作的次元壁，是向企业级协作迈进的关键一步。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/6274](https://github.com/esengine/DeepSeek-Reasonix/pull/6274)

7. **[#6272] Port cc-connect Feishu media, streaming edits and mention handling (SivanCola)**
   - **影响**: ⭐⭐⭐⭐ 飞书适配器功能全面看齐 `cc-connect`。覆盖入站媒体（图片、文件）、流式编辑回复及 @ 提及处理，使得 Reasonix 自带的飞书 Bot 具备完整商用能力。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/6272](https://github.com/esengine/DeepSeek-Reasonix/pull/6272)

8. **[#6271 / #6233] fix(desktop): remove --wails-draggable: drag from .sidebar on Windows (SauronSkywalker)**
   - **影响**: ⭐⭐⭐ 修复 #6251 及同类问题。Windows 侧边栏由于 `--wails-draggable` 设置不当，导致光标变为 `ns-resize` 并误触窗口拖拽，现已修复。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/6271](https://github.com/esengine/DeepSeek-Reasonix/pull/6271)

9. **[#6247] Unknown slash commands now send as regular messages (ttmouse)**
   - **影响**: ⭐⭐⭐ 细节体验优化。修复 #5756。如果用户输入以 `/` 开头的非命令文本（如自然语言），控制器不再丢弃，而是作为普通消息发送给模型。已获社区好评。
   - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/6247](https://github.com/esengine/DeepSeek-Reasonix/pull/6247)

10. **[#5943] feat(config): support per-model context_window in model_overrides (HaoyueQin)**
    - **影响**: ⭐⭐⭐⭐ 长期等待的功能。允许在配置中为同一提供商下的不同模型单独设置上下文窗口大小（如 V4 Pro 用 128K，Flash 用 32K），解锁了更精准的资源管理，桌面端 UI 也支持了此配置。
    - **链接**: [https://github.com/esengine/DeepSeek-Reasonix/pull/5943](https://github.com/esengine/DeepSeek-Reasonix/pull/5943)

## 功能需求趋势
- **Bot 渠道扩张**: 社区不再满足于 QQ/微信，`[bot.telegram]` 的呼声渐起 (#6246)。结合 Feishu Bot 的密集迭代，Reasonix 正在从终端产品向 Agent 平台转型。
- **桌面交互深度定制**: 大屏用户要求内容区域宽度可配置 (#6268)；高强度用户希望审批命令预览可展开 (#6264)；窗口拖拽区域对标浏览器标签栏 (#6218)。这表明重度用户正提出 IDE 级别的桌面交互体验要求。
- **Provider 透明化**: 订阅制用户强烈要求显示剩余额度（小时/周/月）及百分比 (#6242)，开发者希望更精确地管理推理成本和用量。

## 开发者关注点
- **数据一致性压倒一切**: 手动取消、多屏切换、冲突副本等多个场景下的数据丢失是当前社区**最核心的恐惧**。开发者对“确认/取消”等交互的信赖度正在被侵蚀。
- **Agent 执行层鲁棒性不足**: Bash 死锁、沙箱锁竞争、编辑写入失败、进程残留是拖累 Agent 可用性的头号杀手。底层工具执行的异常处理与生命周期管理是当前的架构短板。
- **Windows 兼容性压力持续**: msys64 冲突、多屏 DPI 缩放、编码问题、标题栏拖拽，反映出 Windows 桌面端在复杂开发环境中的兼容性测试需要加强。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

好的，这是 2026-07-10 的 OpenCode 社区动态日报。

---

# OpenCode 社区动态日报 | 2026-07-10

## 1. 今日速览
今日发布了 **v1.17.18**，紧急修复了 Copilot 定价数据异常问题，并对 Meta Muse Spark 模型进行了优化。社区核心关注点集中在 **Agent 工作流稳定性**（子代理挂起、模型继承失效）以及 **CPU 性能退化**上。V2 版本的 Bug 修复力度明显加大，多篇 PR 针对 TUI 状态同步和会话恢复进行了集中修复。

## 2. 版本发布
过去24小时内发布三个 Patch 版本，重点围绕模型兼容性和桌面端体验：
- **v1.17.18**：修复 Copilot 零计费批量大小导致的崩溃；为 Meta Muse Spark 添加模型专属系统提示词。
- **v1.17.17**：修复 Meta 模型推理变体和请求处理；桌面端修复标签裁剪问题，加入可关闭的 Tabs 介绍弹窗。
- **v1.17.16**：支持 Grok 推理变体；优化 xAI 提示缓存路由与 PDF 支持；桌面端新增“打开包含文件夹”和 Composer 菜单。

## 3. 社区热点 Issues
以下为过去24小时内讨论最激烈、关注度最高的 10 个问题：

1.  **#4283 复制到剪贴板失效** (109评论 👍102)
    - 状态：OPEN。
    - 这是一个困扰用户很久的顽固BUG，选中文本后提示“Copied”但实际并未写入剪贴板，需要手动kill进程恢复。
    - [链接](https://github.com/anomalyco/opencode/issues/4283)

2.  **#20995 Gemma 4 (e4b) 工具调用失败** (33评论 👍47)
    - 模型通过 Ollama 返回流式 `tool_calls` 时，OpenCode 无法正确识别，导致无法使用函数调用。
    - [链接](https://github.com/anomalyco/opencode/issues/20995)

3.  **#30086 新版本 CPU 占用极高** (19评论 👍12)
    - 用户反馈近期更新后 CPU 飙升，从能同时运行10个会话降到了3个，严重影响多任务操作。
    - [链接](https://github.com/anomalyco/opencode/issues/30086)

4.  **#24713 Linux 终端复制提示成功但无效** (11评论 👍7)
    - Linux 特有 Bug，`copied` 弹窗出现但剪贴板内容无变化，与 #4283 高度相关，反映了底层剪贴板机制的通用性问题。
    - [链接](https://github.com/anomalyco/opencode/issues/24713)

5.  **#33028 BUG：子代理快速执行 Bash 后无限挂起** (5评论)
    - 核心流程严重阻塞。子代理调用 Bash 完成后，下一次调用 LLM 的 Streaming 请求永不返回，只能强制退出。
    - [链接](https://github.com/anomalyco/opencode/issues/33028)

6.  **#36133 GPT 5.6 模型认证报错** (5评论)
    - 用户升级模型版本后请求失败，回退到 GPT 5.5 即可恢复，体现了新模型适配的及时性压力。
    - [链接](https://github.com/anomalyco/opencode/issues/36133)

7.  **#36119 应用补丁时权限视图只显示首个文件** (5评论)
    - 多文件编辑的安全/可见性BUG，用户申请修改多个文件时，Diff预览只能看到第一个文件，无法审查后续改动。
    - [链接](https://github.com/anomalyco/opencode/issues/36119)

8.  **#35365 自签名 TLS 证书在 1.17.12+ 失效** (3评论)
    - 私有/本地 HTTPS LLM 服务器用户的重大回归问题，新版本导致静默连接失败。
    - [链接](https://github.com/anomalyco/opencode/issues/35365)

9.  **#36141 GPT 5.6 变体缺失 `max` 推理力度** (2评论)
    - 功能覆盖不全，仅暴露到 `xhigh`，未跟上官方最新 `reasoning_effort` 的“max”选项。
    - [链接](https://github.com/anomalyco/opencode/issues/36141)

10. **#35126 / #36132 BUG：子代理忽略模型配置** (多篇反馈)
    - 通过 `task` 工具分发的子代理强制继承父进程模型，无视 Markdown Frontmatter 中的 `model:` 配置，导致成本失控。
    - [链接 #35126](https://github.com/anomalyco/opencode/issues/35126) / [链接 #36132](https://github.com/anomalyco/opencode/issues/36132)

## 4. 重要 PR 进展
以下为过去24小时内值得关注的 10 个 Pull Request：

1.  **#36159 修复核心代理权限优先级**
    - 重构了全局规则、内置Agent策略和用户配置的权限应用顺序，防止 `bash` 规则错误启用 `shell`。
    - [链接](https://github.com/anomalyco/opencode/pull/36159)

2.  **#36163 恢复核心弹性压缩 (Resilient Compaction)**
    - 核心稳定性修复。确保有会话历史时总尝试手动压缩和溢出恢复，并保留流式错误，避免静默失败。
    - [链接](https://github.com/anomalyco/opencode/pull/36163)

3.  **#36158 TUI 恢复待定会话工作**
    - V2 重要修复。拉取并合并挂起的 `Session` 状态（如用户输入、压缩屏障），解决机器重启后工作进度丢失的问题。
    - [链接](https://github.com/anomalyco/opencode/pull/36158)

4.  **#35935 特性：添加 V2 GenAI 可观测性追踪**
    - 里程碑式特性。通过 OTLP 实现对 Agent 完整流程（HTTP/WebSocket、工具调用、重试、子代理）的端到端追踪，极大提升 Debug 和运维能力。
    - [链接](https://github.com/anomalyco/opencode/pull/35935)

5.  **#36172 预加载更多时间线消息**
    - 将初始消息加载量从 2 提升至 20，缓解会话启动时的“空白”体验。
    - [链接](https://github.com/anomalyco/opencode/pull/36172)

6.  **#36096 修复 TUI 模型变体循环 (社区贡献)**
    - 修复了当模型有一个名为 `default` 的真实变体时，`ctrl+t` 循环会跳过 `high` 和 `max` 的 UI Bug。
    - [链接](https://github.com/anomalyco/opencode/pull/36096)

7.  **#26861 修复长会话中旧消息消失 (社区贡献)**
    - 解决了长期存在的 #7380 Bug。引入懒加载滚动，当用户滚到顶部时自动加载更早的历史消息。
    - [链接](https://github.com/anomalyco/opencode/pull/26861)

8.  **#30472 支持通过 SSH/tmux 复制 (社区贡献)**
    - 远程开发场景的关键修复。适配了 `set-clipboard on` 的 tmux 配置，解决 SSH 连接下的剪贴板问题。
    - [链接](https://github.com/anomalyco/opencode/pull/30472)

9.  **#36160 修复时间线底部锚定**
    - 升级虚拟列表依赖，修复了浏览器限制 DOM 写入导致新消息滚动位置错乱的问题。
    - [链接](https://github.com/anomalyco/opencode/pull/36160)

10. **#36168 文档：添加外部监管模式 (External Supervisor)**
    - 面向企业级安全需求，新增文档介绍了进程外安全监管器架构，用于命令白名单和敏感文件拦截。
    - [链接](https://github.com/anomalyco/opencode/pull/36168)

## 5. 功能需求趋势
从过去24小时的社区反馈中，提炼出四大核心功能需求方向：
- **Agent 工作流稳定性**：用户强烈要求子代理模型不再被强制继承、任务执行不再无限挂起。复杂多代理编排功能（如并行任务、子代理权限独立）是未来的高地。
- **模型兼容性与适配速度**：社区对追踪前沿模型（GPT-5.6, Gemma 4, Grok）呼声很高，要求快速支持且功能不缺失（如完整的 Reasoning Effort）。
- **本地/自建模型普适性**：从自签名 TLS、LM Studio 导购文档请求，到 Ollama 流式识别问题，大量用户重度依赖本地模型，要求“零摩擦”接入。
- **远程/容器化开发体验**：对 Docker 容器内 LSP、SSH 远程环境下的剪贴板和终端复制的支持是硬性需求。

## 6. 开发者关注点
当前用户群体最核心的痛点和高频需求集中在：
- **性能回退问题**：版本迭代快，但 v1.17.16 以来出现的 CPU 飙升问题让用户感到不安，社区的耐心主要消耗在“能用”上。
- **复制粘贴的跨平台噩梦**：无论是桌面端还是 Linux/SSH 终端，复制（Clipboard）的 Bug 长期存在且复现率高，是该社区目前“得票最高”的未解决障碍。
- **V2 版本的“阵痛期”**：大量 Issues 直接指向 V2 的各种边缘情况（重启后显示异常、文件树交互、自动补齐），表明 V2 距离稳定版仍有一段“平坑”路要走。
- **模型配置的细粒度控制**：用户不满足于单一的模型选择，渴望为不同的 Agent 角色（主 Agent 与子 Agent）分配不同的模型、不同的变体，以优化成本和性能。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 | 2026-07-10

## 📌 今日速览

过去 24 小时内，Qwen Code 社区围绕**核心稳定性**、**IDE 集成**和**多工作区/后台服务**三大方向展开了密集的讨论与开发。`cua-driver-rs-v0.7.1` 发布，正式支持相对坐标与 macOS 公证。Issues 方面，图片/文件拖拽上传功能的回归呼声最高（#6560），同时多工作区 RFC（#6378）的讨论热度不减。PR 侧由 @wenshao 和 @qqqys 领衔，在 Web Shell、Scheduled Tasks 和 Channels 模块带来了大量功能更新。安全方面，社区贡献者发现的凭证泄漏风险（#6601）引起了高度重视。


## 🚀 版本发布

### cua-driver-rs-v0.7.1
发布了 CUA（Computer Use Agent）驱动预构建二进制包，本次更新的核心亮点是支持 **相对坐标模式**，并进一步完善了各平台的分发体验：

- **macOS**：提供代码签名（codesigned）与公证（notarized）的通用二进制文件，附带 `QwenCuaDriver.app` 安装包。
- **Linux**：提供 x86\_64 + arm64 架构构建（glibc 2.31 及以上）。
- **Windows**：提供 x86\_64 + arm64 架构构建。

> 链接：[Releases 页面](https://github.com/QwenLM/qwen-code/releases)


## 🔥 社区热点 Issues（Top 10）

### 1. #6378 [RFC] 单守护进程支持多工作区
- **重要性**：触及 Qwen Code 的 daemon 基础架构，是扩展用户复杂工作流的关键设计。社区反馈积极，积累了 19 条深入讨论。
- **链接**：[#6378](https://github.com/QwenLM/qwen-code/issues/6378)

### 2. #6560 希望恢复对话中直接上传、拖拽上传图片和文档的功能
- **重要性**：18 条评论，属于高频操作回归问题。用户明确表达了粘贴截图调试的刚需，CLI 交互体验的严重降级引发了广泛共鸣。
- **链接**：[#6560](https://github.com/QwenLM/qwen-code/issues/6560)

### 3. #6581 JetBrains ACP Agent 无法接收用户 Prompt
- **重要性**：IDE 插件是用户触达的关键路径。当前 BUG 导致 JetBrains 用户无法正常使用 Qwen Code Agent，社区正在积极提供环境信息协助排查。
- **链接**：[#6581](https://github.com/QwenLM/qwen-code/issues/6581)

### 4. #6565 "连接到 Qwen Coder 时出现问题。Internal Error"
- **重要性**：新人拦路虎，直接导致用户无法使用。多语言报错暗示了可能的全局认证或网络模块问题，需快速定位根因。
- **链接**：[#6565](https://github.com/QwenLM/qwen-code/issues/6565)

### 5. #3696 [P1] 全面的技能/扩展/MCP/配置热重载系统
- **重要性**：P1 优先级且为持续跟踪 Issue。热重载能力是提升开发迭代效率的核心，社区对此期待值很高。
- **链接**：[#3696](https://github.com/QwenLM/qwen-code/issues/3696)

### 6. #6614 [P1] Glob 工具在大路径下导致 OOM
- **重要性**：P1 严重级别 BUG。子 Agent 递归搜索仓库时直接撑爆 Node.js 堆内存，属于严重的健壮性问题。
- **链接**：[#6614](https://github.com/QwenLM/qwen-code/issues/6614)

### 7. #6601 [P1] Shell 子进程继承敏感环境变量导致凭据泄漏
- **重要性**：严重安全漏洞。Agent 执行 shell 命令时可能暴露 `QWEN_SERVER_TOKEN` 等环境变量，社区对此表示担忧并提出修复建议。
- **链接**：[#6601](https://github.com/QwenLM/qwen-code/issues/6601)

### 8. #6600 [BUG] `--debug` 日志文件从未被创建
- **重要性**：开发者体验痛点。调试模式看似开启但无日志落地，给 BUG 排查带来极大困扰，被多次提及。
- **链接**：[#6600](https://github.com/QwenLM/qwen-code/issues/6600)

### 9. #6586 密集型 PDF 导致不可恢复的 FILE\_TOO\_LARGE 循环
- **重要性**：工具使用的逻辑缺陷。Agent 陷入提取-超限-报错的死循环，且无图片回退机制，该场景下完全无法工作。
- **链接**：[#6586](https://github.com/QwenLM/qwen-code/issues/6586)

### 10. #6569 提升子 Agent 的可观测性：实时执行可见性与手动干预
- **重要性**：用户面对子 Agent 的黑盒执行感到不安。提出实时追踪和执行轨迹审查是提升复杂 Agent 信任度的关键方向。
- **链接**：[#6569](https://github.com/QwenLM/qwen-code/issues/6569)


## 📌 重要 PR 进展（Top 10）

### 1. #6561 Web Shell 工作区目标页面 & `/goal` 持久化修复
- **内容**：为 Web Shell 新增可视化目标管理页面，并修复了 Daemon 模式下 `/goal` 丢失的严重 Bug。
- **作者**：@wenshao
- **链接**：[#6561](https://github.com/QwenLM/qwen-code/pull/6561)

### 2. #6591 Web Shell 新增 Artifact 右侧面板
- **内容**：为 Web Shell 提供了全新的 Artifact 工作区，支持编辑文件展示、行级统计、可拖拽审查面板和文件树导航，大幅增强交互体验。
- **作者**：@ytahdn
- **链接**：[#6591](https://github.com/QwenLM/qwen-code/pull/6591)

### 3. #6556 修复核心 `max_tokens` 控制逻辑
- **内容**：放弃旧的"输出保留"策略，改为基于上下文窗口动态钳制 `max_tokens`，防止自动压缩决策失误，是重要的性能与稳定性修复。
- **作者**：@tanzhenxin
- **链接**：[#6556](https://github.com/QwenLM/qwen-code/pull/6556)

### 4. #6619 定时任务支持前置条件门控
- **内容**：允许为 `scheduled-tasks` 设置前置条件，只有条件满足时才执行实际 Prompt，实现了更智能的自动化巡检。
- **作者**：@wenshao
- **链接**：[#6619](https://github.com/QwenLM/qwen-code/pull/6619)

### 5. #6612 `/review` 大型 Diff 逐行责任分配
- **内容**：重构了 `/review` 机制，将大 Diff 按行拆解给不同审查 Agent，确保每一行代码都被覆盖，而不是截断。
- **作者**：@wenshao
- **链接**：[#6612](https://github.com/QwenLM/qwen-code/pull/6612)

### 6. #6489 新增 `MessageDisplay` Hook 实现中轮流式输出
- **内容**：添加了 Hook 系统，允许在 Assistant 回复流式输出时重复触发事件，解决了 Terminal UI 和 ACP/IDE session 无法增量观察回复的问题。
- **作者**：@yanchenko
- **链接**：[#6489](https://github.com/QwenLM/qwen-code/pull/6489)

### 7. #6495 支持 Webhook 触发的 Channel 任务
- **内容**：为后台 Channel Worker 添加 Webhook 触发能力，允许外部系统通过 POST 与 Qwen Code 交互，扩展了自动化边界。
- **作者**：@qqqys
- **链接**：[#6495](https://github.com/QwenLM/qwen-code/pull/6495)

### 8. #6599 CI 层面增加可疑评论附件审查门禁
- **内容**：新增 GitHub Actions 工作流，自动删除非可信用户评论中链接的高危文件（如安装包、脚本），这是保障社区安全的重要举措。
- **作者**：@yiliang114
- **链接**：[#6599](https://github.com/QwenLM/qwen-code/pull/6599)

### 9. #6615 修复 Channel ACP 多轮工具调用文本拼接问题
- **内容**：修复 `AcpBridge.prompt()` 中将中间轮次思考文本拼接到最终结果的问题，确保 Channel 适配器收到干净响应。
- **作者**：@qqqys
- **链接**：[#6615](https://github.com/QwenLM/qwen-code/pull/6615)

### 10. #6630 修复 YOLO 模式下调用 `enter_plan_mode` 导致的模式异常切换
- **内容**：当模型自身调用 `enter_plan_mode` 时，保持 YOLO 模式不被切换回只读的 Plan 模式，保持用户预期的一致性。
- **作者**：@Nas01010101
- **链接**：[#6630](https://github.com/QwenLM/qwen-code/pull/6630)


## 📈 功能需求趋势

- **多工作区与常驻 Daemon 化**：以 #6378 和 #5976 为代表，社区强烈期望 Qwen Server 能够从单一工作区解放出来，成为真正意义上的后台服务管理者，支持多租户、多项目、后台自动化运行。
- **IDE 与生态无缝集成**：JetBrains 插件故障（#6581）和 QQ Bot 适配器（#6457）的推进，表明用户希望 Qwen Code 深度融入现有编码环境和沟通工具。
- **更智能的自动化与热更新**：热重载（#3696）和条件触发的定时任务（#6619）显示出用户对"高可用、免重启、带判断"的自动化系统有很大需求。
- **安全左移**：凭据泄漏（#6601）和社区评论安全门禁（#6597）说明社区正在从"能用"向"安全地使用"过渡。
- **可观测性提升**：用户渴望了解 Agent 的内部世界（#6569），并且需要有效的调试日志（#6600）来排查问题。


## 🧑‍💻 开发者关注点

- **平台不一致性**：macOS 上的原生模块缺失（`@teddyzhu/clipboard`），Windows 上的非 UTF-8 控制台乱码与粘贴失效，是跨平台开发者当前最大的痛点。
- **调试困难**：`--debug` 日志不落盘（#6600）和 CI Action 静默吞错误（#6553）让开发者难以复现和定位问题，严重降低了 BUG 修复效率。
- **生态工具健壮性**：PDF 读取循环死锁（#6586）和 Glob 工具 OOM（#6614）直接破坏了 Agent 的自动化工作流，是用户业务连续性的"Stop Ship"问题。
- **核心模型交互 BUG**：`qwen3.7-max` 模型标签泄漏（#6595）说明了 Agent 与底层模型之间的解析逻辑需要进行更坚固的隔离。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，这是根据你提供的 GitHub 数据生成的 2026-07-10 Hermes 社区动态日报。

---

# Hermes 社区动态日报 | 2026-07-10

**今日速览**

过去 24 小时内，Hermes Agent 无新版本发布，但社区开发与反馈异常活跃。**Cron 调度器稳定性**成为绝对焦点，多项针对异常数据容错的 P1 级热修复密集合并；与此同时，**Z.AI 提供商的集成问题**（密钥池与 API 路由）仍是开发者反馈的重灾区。此外，多项来自 OpenCode 的修复被成功移植，体现了团队高效的跨项目代码复用。

---

## 🚀 版本发布

过去 24 小时 **无** 新版本发布。

---

## 💬 社区热点 Issues

以下 10 个议题最受开发者关注，反映了当前系统内的核心痛点：

1.  **[Z.AI 密钥池级联耗尽]** #61487
    - **重要性：高**。当多 Key 池中的单一密钥触发官方限额时，整个池被级联标记为“耗尽”，导致业务中断，而实际其他 Key 通过 `curl` 测试仍为 200 OK。这是影响 Z.AI Coding Plan 支付用户的核心 Bug。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/61487)

2.  **[模型切换残留旧 Provider URL]** #47828
    - **重要性：高**。通过 `/mode` 切换模型后，代理端依然将请求发往旧 Provider 的 `base_url`。这是多模型工作流中的严重 P1 级 Bug，直接导致切换后所有请求 400 错误。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/47828)

3.  **[Z.AI API 端点路由错误]** #61563
    - **重要性：高**。手动添加的 Z.AI 密钥被强制路由到了通用 `/api/paas/v4` 端点，而非 Coding Plan 专属的 `/api/coding/paas/v4`，导致用户尽管有余额仍无法调用。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/61563)

4.  **[Anthropic 单模型限额影响全局凭据]** #61451
    - **重要性：中高**。当 Fable/Mythos 模型在 Anthropic 凭据上触发 429 后，该凭据下所有其他模型（即使在免费额度内）均被标记为“耗尽”。暴露了在多模型共用的订阅账号下，配额隔离机制的缺失。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/61451)

5.  **[Cron 后台线程静默死亡]** #37179
    - **重要性：中高**。Cron 工作线程在遭遇 `asyncio.CancelledError` 后会被 `except Exception` 捕获导致线程挂死，此后所有定时任务均无法执行。对于 Headless 运行的 Gateway 是致命隐患。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/37179)

6.  **[Z.AI GLM 上下文长度检测异常]** #47970
    - **重要性：中高**。Hermes 将 GLM-5.2 的 1M Token 上下文误报为 200K，导致模型在被充分填充前就过早地被压缩，影响对话质量。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/47970)

7.  **[Gemini 模型被错误路由到 Codex 后端]** #39047
    - **重要性：中**。当主 Provider 为 Codex 时，设置了 `provider: auto` 的 Gemini 辅助模型被误发至 Codex 后端并遭 400 拒绝。体现了路由判断逻辑的缺陷。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/39047)

8.  **[Computer Use 工具过于脆弱]** #32766
    - **重要性：中**。`computer_use` 工具对底层驱动的返回结果假设过强，一旦 `list_windows` 返回空，不仅该工具崩溃，还会连带损坏 auxiliary vision 的路由。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/32766)

9.  **[Desktop GUI 模型选择器写错 Provider]** #50944
    - **重要性：中**。在 Desktop 上选择模型后，持久化配置会将 Provider 写错（例如 litellm-proxy 被存成 openrouter），导致下次启动后无法正常加载。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/50944)

10. **[Gateway Token 过期无远程恢复]** #58572
    - **重要性：中**。当 Nous Portal Token 过期后，Gateway 只返回静默错误并停止响应。对于远程服务器上的无头用户，只能物理接触后通过 `hermes auth login` 恢复，极其影响可用性。
    - → [Issues 详情](https://github.com/NousResearch/hermes-agent/issues/58572)

---

## 🛠 重要 PR 进展

本周集中了大量重要修复，尤其是 Cron 相关的 P1 级别防御性编程和 Provider 切换问题的修复。

1.  **[P1] Cron 调度器大修** #61723 / #61581 / #61382
    - **内容**：针对 `jobs.json` 中可能出现的损坏记录（缺失 ID、非 dict 的 Schedule、格式错误的 `next_run_at`），进行了多重防御性处理，防止单条记录损坏导致整个调度器冻结。这在 24/7 运行的网关中至关重要。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/61723)

2.  **[P2] 修复 Z.AI GLM 上下文溢出分类** #61728
    - **内容**：Port 自 OpenCode 的修复，将 Z.AI 返回的 Token 限制错误正确归类为 `context_overflow`。此前被归类为 `unknown`，导致 Agent 不断重试相同的大请求，而不是执行压缩。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/61728)

3.  **[P2] MCP 分页支持** #61727
    - **内容**：Port 自 OpenCode 的修复，现在 Hermes 可以正确遍历 MCP 服务器返回的分页数据（`nextCursor`），此前仅能加载第一页的 Tools/Resources，导致大量工具对 Agent 不可见。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/61727)

4.  **[P1] 修复 Gateway 压缩误删日志** #61716
    - **内容**：修复了 Gateway 的就地压缩（In-place Compaction）功能，在归档旧日志后，会破坏性地重写已归档的 Transcript 内容。现在跳过冗余的破坏性写入。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/61716)

5.  **[P2] 修复模型切换后 Provider 头部丢失** #61732
    - **内容**：`switch_model()` 函数重建客户端参数时，没有调用 `_apply_client_headers_for_base_url()`，导致切换后自定义的 Provider 头部（如 API 版本头）丢失，引发 400 错误。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/61732)

6.  **[P3] 记忆模块 SQLite 连接共享** #61726
    - **内容**：Holographic Memory 存储现在每个数据库文件共享一个 SQLite 连接 + RLock，解决了 24/7 网关环境下由于并发打开多个连接导致的 `database is locked` 报错和重试开销。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/61726)

7.  **[P1] 修复 HTML 导出 XSS 漏洞** #61345
    - **内容**：在 `session_export_html.py` 中，对 Tool Call 的 Name 字段进行了转义处理，修复了一个导致存储型 XSS 的安全漏洞。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/61345)

8.  **[P2] WhatsApp LID 出站修复** #55612
    - **内容**：修复当通过 WhatsApp 发送私信时，目标地址被识别为 `@lid` 而非用户名。现在 Bridge 会正确查询反向 LID 映射后再发送，确保消息送达。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/55612)

9.  **[P3] 新增 LM Studio 本地模型管理** #61606
    - **内容**：新功能 PR。通过集成 LM Studio 的原生 REST 模型目录，Hermes 现在可以识别本地已下载但未加载的模型，并且在切换 LM Studio 模型时会安全地卸载旧模型，避免显存冲突。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/61606)

10. **[P1] 测试框架可靠性提升** #61734
    - **内容**：修复 CI 中 `test_accepted_at_every_position` 测试不稳定问题。原测试并发启动 11 个进程导致冷启动超时，现在通过精简驱动进程数来提升 CI 稳定性。
    - → [PR 详情](https://github.com/NousResearch/hermes-agent/pull/61734)

---

## 📈 功能需求趋势

从近期 Issues 中可提炼出社区对 Hermes 的三大核心期待：

1.  **Provider 生态的“智能适配”**：社区已经不满足于简单的 API 对接（增加 Provider），而是要求 Hermes 能**自适应服务商特性**。例如：自动识别 Z.AI 的 Coding Plan 端点、动态检测模型的实际上下文窗口（而非硬编码）、智能处理分页和配额隔离。
2.  **后台任务的“企业级可靠性”**：Cron 工作流的相关讨论急剧升温。需求从简单的“执行定时任务”升级到了“面对异常数据时的强健壮性”、“线程守护与自动恢复”以及“更细粒度的 Reasoning Effort 控制”。这表明 Hermes 正被大量用于无人值守的生产环境。
3.  **客户端架构的“前后端分离”**：“Thin Client Desktop” 的需求（#61329）获得了较高关注。用户希望在远端服务器运行核心引擎，在本地仅安装一个轻量级的桌面 GUI 进行连接。这与当前强耦合的 Desktop 安装包模式形成鲜明对比，预示着架构演进方向。

---

## 🧑‍💻 开发者关注点

汇总近期开发者在反馈中集中表达的痛点：

- **Provider 密钥管理是“噩梦”**。多 Key 池的级联耗尽（#61487）、单模型 429 污染全局凭证（#61451）、以及 API 路由端点混乱（#61563）让许多付费用户感到困惑和沮丧。密钥池的“故障隔离”能力是当前最迫切的需求。
- **模型切换的“不安全感”**。模型切换后遗留旧 Provider 配置（#47828、#61296）的问题反复出现，这导致多模型工作流在频繁切换中极易出现“人格分裂”式的 400 错误，开发者不得不一遍遍手动重启 Agent。
- **无头（Headless）模式的“自愈能力”薄弱**。Cron 线程静默死亡（#37179）、Portal Token 过期导致服务彻底锁死（#58572）等问题，让基于 Hermes Gateway 搭建的家庭服务器或私有代理充满了运维恐惧。
- **Windows 安装体验“劝退”**。多个关于安装器找不到 Git、构建失败的报告（#38963、#61657）仍然是新用户入门的一大拦路虎。

</details>
