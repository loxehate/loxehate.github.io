# AI CLI 工具社区动态日报 2026-08-29

> 生成时间: 2026-08-29 03:04 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告 (2026-08-29)

---

## 1. 生态全景

当前 AI CLI 生态正处于 **“Agentic Platform 化”** 的关键跃迁期：核心竞争力已从“模型对话质量”转移至 **“工具调用编排能力、上下文工程体系、跨平台交付稳定性”** 三大基建层面。各厂商同步进入高频迭代周期（日更/周更），**Windows 平台适配危机** 成为全行业共同面临的“拦路虎”，倒逼底层进程管理、容器签名、自动更新机制的重构。安全边界下沉至 CLI 层（OAuth、NTFS、配置注入、凭据脱敏）已成共识，标志着工具从“开发者玩具”向“企业级生产力基础设施”演进。多智能体协作（Subagent/Hooks/MCP）标准化进程加速，`PreModelSwitch`、`tools/list_changed` 等生命周期钩子正形成事实标准。

---

## 2. 各工具活跃度对比

| 工具 | Issues 更新量 (24h) | PRs 更新量 (24h) | 版本发布 | 核心迭代节奏 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | **50** (高热度讨论) | 1 | **v2.1.251** (稳定版) | 稳定版周迭代，功能落地导向 |
| **OpenAI Codex** | 高 (Win 类占半数+) | **19** (合并) | **v0.151.0-alpha.12** (含 5 个过渡版) | **极高频 Alpha 冲刺**，重构导向 |
| **Gemini CLI** | 多 (安全类集中) | **10** (全安全/核心修复) | **v0.59.0-nightly** | 夜ly 构建，安全合规驱动 |
| **DeepSeek Reasonix** | **48** | **44** | **v1.33.0 套装** (CLI/Desktop/Studio) | **全平台同步稳定版发布**，工程化程度最高 |
| **OpenCode** | 高 (含 119 评论巨型 Issue) | 10 (性能/架构重构为主) | **v1.18.25 / v1.18.24** | 双版本维护，性能与插件生态并重 |
| **Qwen Code** | 中 (CI 故障主导) | 10 (Autofix/WebShell) | **v0.22.3 Nightly + Stable** | 狗粮式自研，CI/CD 自愈为核心 |
| **Hermes** | 7 | **20** (架构重构为主) | 无 | **重构期**，Desktop/多模态/网关并行 |

> **数据说明**：Issues/PRs 统计口径为各日报“今日速览”或列表汇总数。Reasonix、Codex、Gemini 代码变更量最大；Claude Code、OpenCode 社区讨论热度最高。

---

## 3. 共同关注的功能方向

| 方向 | 关注工具 (代表性 Issue/PR) | 具体诉求与进展 |
| :--- | :--- | :--- |
| **Windows 原生稳定性** | **Claude** (#85891 置顶窗口 90👍, #89680 孤儿进程)、**Codex** (#40752 启动崩溃 85评, #33776 进程风暴)、**Gemini** (#29116 NTFS 8.3 短名绕过)、**Reasonix** (#9363 任务栏图标) | 进程残留、AppX/MSIX 容器锁死、GPU 加速崩溃、长路径/短文件名兼容。Claude/Codex 处于“灾难级”反馈期，Gemini/Reasonix 在底层修补。 |
| **Agentic 生命周期钩子标准化** | **Claude** (v2.1.251 新增 `Pre/PostModelSwitch`)、**Codex** (#10105 `tools/list_changed`, #41421 per-tool limit)、**Gemini** (#29123 Hook 键名大小写对齐 Claude)、**Hermes** (#97466 MCP 凭据脱敏) | 从“插件”转向“标准化事件总线”：模型切换拦截、工具动态发现、输出限流、敏感数据清洗。 |
| **上下文工程与成本控制** | **Claude** (`SessionStart` 传递 staleness)、**Codex** (#35050 GPT-5.6 序列化调用增本 27-45%、#31868 1M 上下文)、**Gemini** (#26522 Auto Memory 无限重试、#22745 AST 感知读取)、**Reasonix** (#8176 压缩失败、#7978 128k 硬限制)、**OpenCode** (#34402 单次 $21 无输出) | 显式管理：缓存命中率、压缩触发阈值、Token 预算分配、推理成本可观测。 |
| **多智能体/子代理编排** | **Claude** (前景子代理实时流)、**Codex** (#36586 子代理任务对自定义模型不可见、#41424 嵌套 Fork 保留基线)、**Gemini** (#22323 子代理误报成功、#21409 通用代理死锁)、**Reasonix** (#9107 `write_paths` 文件粒度降冲突) | 并发冲突解决、上下文隔离与继承、技能路由、执行轨迹可观测。 |
| **安全与供应链加固** | **Gemini** (5 个安全 PR：OAuth IdP 混淆、系统配置加载、NTFS SFN、Git 配置一致性、diff.external 禁用)、**Hermes** (#97466 Bearer 脱敏、#97609 归档绕过)、**Codex** (#41403 云凭据域名校验)、**Reasonix** (Shell 凭据管理、Authenticode 签名) | CLI 层成为安全闸道：配置注入防御、凭据零泄露、文件系统边界、签名分发。 |

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线特征 | 目标用户画像 | 独特护城河 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | **企业级标准化交付** | TypeScript/Node.js 生态，重 “Hooks 协议” 与 “Remote Control UI”，强调人机协作审批流。 | 追求合规、可审计、IDE 深度集成的专业团队/企业。 | Anthropic 模型独占优势 + 成熟的生命周期钩子标准 + VSCode/Remote Control 双客户端。 |
| **OpenAI Codex** | **云原生/远程开发后端** | Rust 核心 + 高频 Alpha，主推 **SSH Executor** 与 **Cloud Tasks**，本地仅作控制面。 | 需要在远程 GPU/沙箱跑重任务、依赖 OpenAI 模型生态的开发者。 | OpenAI 模型首发适配 + 远程执行架构原生支持 + 守护进程模式。 |
| **Gemini CLI** | **安全合规与代码理解** | Go/TypeScript 混合，极度强调 **安全默认值** (Restricted Mode)、**AST 感知工具链**、OAuth 企业级身份。 | 受监管行业、大型单体仓库、重静态分析的 Google Cloud 用户。 | Google 安全基因 + 1M 上下文原生优势 + AST/语义级工具抽象。 |
| **DeepSeek Reasonix** | **本地优先/隐私优先的全平台套件** | Go 重写，三端合一，自研 **Hindsight 记忆系统**、MCP 2026 早期实现、Authenticode 签名分发。 | 追求数据不出本地、多设备同步、深度定制工作流的高级个人/小团队。 | DeepSeek 模型深度调优 + 多端统一架构 + 本地记忆图谱 + 极快稳定版发布节奏。 |
| **OpenCode** | **可扩展性极客工具 / TUI 党** | Lua/TypeScript 插件系统，**Skill/Plugin** 机制成熟，TUI 渲染优化激进，SQLite 会话存储。 | 爱折腾、重键盘流、需深度定制工具链、关注 Token 成本的个人开发者。 | 插件生态成熟度最高 + TUI 体验极致 + 成本透明化 (显式 $21 报警)。 |
| **Qwen Code** | **云原生 IDE 伴侣 / 自研犬粮** | TypeScript，核心卖点 **WebShell (浏览器端)**、**Channel/Session Rotation**、**Autofix 闭环 (CI 自愈)**。 | 阿里云/通义生态用户、需要浏览器端无缝衔接、重 CI/CD 自动化的团队。 | WebShell 无客户端体验 + Channel 多任务并发模型 + Autofix 吃自家狗粮验证。 |
| **Hermes** | **多模型网关 / 多模态前沿** | Rust/TypeScript，核心是 **Gateway 路由**、**Hindsight 多库路由**、**Bot Mode**、语音/视频多模态原生支持。 | 需要聚合多模型、探索语音编程、构建自定义 Agent 编排层的研究者/先锋团队。 | 模型中立网关架构 + 多模态交互闭环 (STT/TTS) + 记忆系统可插拔路由。 |

---

## 5. 社区热度与成熟度评估

| 梯队 | 工具 | 判定依据 | 典型信号 |
| :--- | :--- | :--- | :--- |
| **第一梯队：生产就绪 & 高热度** | **Claude Code**, **DeepSeek Reasonix** | 稳定版高频发布，Issue 量大但结构清晰（Bug/Feature 分明），核心功能（Hooks、Memory、Multi-client）已落地并有企业级案例。 | Claude: 单 Issue 90👍 反映企业级关注度；Reasonix: 48 Issues/44 PRs/天 + 三端同步发布，工程效能标杆。 |
| **第二梯队：快速重构期 & 高潜力** | **OpenAI Codex**, **Gemini CLI** | 代码变更量极大 (Codex 19 PRs, Gemini 10 安全 PRs)，但处于 Alpha/Nightly 阶段，破坏性变更频繁，Windows 体验尚不可用。 | Codex: 5 个 Alpha 版/天，架构大调整；Gemini: 安全修复占比 100%，基建夯实期。 |
| **第三梯队：垂直深耕 & 社区粘性高** | **OpenCode**, **Qwen Code** | 核心用户群高粘性 (OpenCode 119 评论性能贴)，但规模较小。OpenCode 擅长插件生态，Qwen Code 擅长 WebShell/自研闭环。 | OpenCode: TUI 内存泄漏引发核心用户共愤；Qwen: CI 失败阻塞主干，自研压力大。 |
| **第四梯队：探索期/架构重构期** | **Hermes** | 无 Release，20 PRs 全为架构重构 (Gateway, Hindsight, Desktop Hydration)，功能对外不可见，文档滞后。 | 核心维护者推进多模态/网关统一，适合早期共建者，非生产可用。 |

---

## 6. 值得关注的趋势信号 (对决策者的参考价值)

### 6.1 **Windows 成为“必须攻克的高地”，而非“兼容项”**
*   **信号**：Claude、Codex 两大头部工具因 Windows 更新机制、进程模型、GPU 加速导致**生产环境不可用**级 Bug 爆发；Gemini、Reasonix 投入专项 PR 修补 NTFS、短文件名、任务栏等底层细节。
*   **启示**：**选型时必须实测 Windows 稳定性**；自建工具链需预留 30%+ 精力适配 Win32/ConPTY/AppX/MSIX；关注 `ConPTY`、`AppX` 容器生命周期、`Authenticode` 签名分发等原生技术栈。

### 6.2 **“Hooks/事件总线”正在取代“插件系统”成为扩展标准**
*   **信号**：Claude 发布 `PreModelSwitch`，Codex 推 `tools/list_changed`，Gemini 对齐键名，Hermes 做 MCP 凭据脱敏 Hook。核心逻辑从“注入代码”转为“订阅事件”。
*   **启示**：**二次开发/集成策略应转向“事件驱动”**；构建内部平台时，优先实现标准化 Hook Point (SessionStart, ToolCall, ModelSwitch, ContextCompress)，而非维护 Fork 版本。

### 6.3 **上下文工程显性化：从“隐式压缩”走向“显式预算与审计”**
*   **信号**：Claude Hook 透出 `staleness`，Codex 曝光序列化调用增本 45%，Gemini 推 AST 读取省 Token，Reasonix 爆压缩失败/硬限制，OpenCode 单次 $21 事故。
*   **启示**：**Token 成本已成显性运维指标**。需在平台层接入：上下文窗口使用率看板、压缩触发审计日志、模型调用成本实时告警、子代理 Token 配额隔离。

### 6.4 **“本地 CLI + 远程执行/云 IDE” 混合架构成主流交付形态**
*   **信号**：Codex 主推 SSH Executor，Reasonix 发布 Remote SSH Workspace，Qwen Code 核心卖点 WebShell，Claude 增强 Remote Control。
*   **启示**：**纯本地 CLI 正在边缘化**。企业级部署应规划“控制面本地化 + 数据面远程化”架构，关注 SSH/WSL/DevContainer/浏览器 Shell 的统一接入层。

### 6.5 **安全左移至 CLI 运行时：配置注入、凭据泄露、文件系统边界成三大战场**
*   **信号**：Gemini 单日 5 个安全 PR (OAuth, Config, NTFS, Git, Diff)；Hermes 修 Bearer 泄露、归档绕过；Reasonix 签名分发、Shell 凭据隔离。
*   **启示**：**CLI 已成供应链攻击面**。采购/自建工具需通过：配置加载链路审计、密钥管理是否走系统 Keyring/密管平台、沙箱逃逸测试 (NTFS/Symlink/Diff)、自动更新签名验证流程。

### 6.6 **多智能体编排能力成“高阶用户”分水岭**
*   **信号**：Claude/Codex/Gemini/Reasonix 同步修子代理并发冲突、上下文继承、技能路由。OpenCode Skill 机制成熟，Hermes 做 Gateway 路由。
*   **启示**：**单线程对话模式已不足以支撑复杂重构**。团队技能培训应包含：子代理分解策略、上下文隔离最佳实践、并发写冲突规避 (`write_paths` 文件粒度)、执行轨迹复盘能力。

---

## 结语建议

*   **企业选型**：优先 **Claude Code** (合规/生态成熟) 或 **Gemini CLI** (安全/大仓库)；若强依赖 OpenAI 模型或远程 GPU，**Codex** (待 Beta 稳定)；追求数据主权/本地化，**Reasonix** 当前工程质量最佳。
*   **平台自建**：参考 **Reasonix** 的三端架构与 **OpenCode** 的插件机制，核心投入 **Hook 标准化、Windows 进程托管、上下文预算系统、安全配置加载链** 四大基建。
*   **个人开发者**：**OpenCode** (TUI/插件/极客) 或 **Reasonix** (多端同步/隐私) 体验最佳；关注 **Qwen Code WebShell** 实现零安装协作。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-08-29）

---

## 1. 热门 Skills 排行（按社区讨论热度）

| 排名 | Skill | 功能简介 | 讨论热点 | 状态 |
|------|-------|----------|----------|------|
| 1 | **skill-creator** | 技能创建与评估自动化流水线 | `run_eval.py` 持续报告 0% recall，Windows 子进程兼容性差，触发检测失效；关联 Issue #556（12评论）、#1099、#1050 | 🟡 Open |
| 2 | **security (信任边界)** | 社区技能冒充官方 Anthropic 技能的安全漏洞 | Issue #492 指出 namespace 滥用导致权限越界，43 条评论为全仓库最高 | 🔴 Open |
| 3 | **claude-api** | Claude API 模型管理与调用 | 四个模型 ID 退役更新（PR #1607）；Issue #1487 报告注入 ~156k tokens 耗尽上下文窗口 | 🟡 Open |
| 4 | **Hivemind** | 零成本多代理编排，Claude Code 仅作规划/审查/合并 | 新增 PR #1628（8/21 创建），利用免费 headless opencode worker 分发机械工作 | 🟡 Open (Draft) |
| 5 | **self-audit** | 机械文件验证 + 四维推理质量门禁 | PR #1367 提出 v1.3.0，关联 Issue #1385 推理质量管道提案 | 🟡 Open |
| 6 | **docx / pdf** | Office 文档与 PDF 处理 | PR #541 修复 w:id 冲突导致文档损坏；PR #538 修复 SKILL.md 大小写引用错误 | 🟡 Open |
| 7 | **mcp-builder** | MCP 服务器构建与评估 | Issue #1390 报告 evaluation.py 对真实 MCP 服务器评分 0/N；PR #1602 修复序列化与编码问题 | 🟡 Open |
| 8 | **document-skills** (ODT/docx/typography) | OpenDocument 与排版质量控制 | PR #514 新增 document-typography；PR #486 新增 ODT；Issue #189 报告与 example-skills 重复 | 🟡 Open |

---

## 2. 社区需求趋势（来自 Issues）

| 需求方向 | 代表性 Issues | 热度信号 |
|----------|---------------|----------|
| **安全与信任治理** | #492（namespace 冒充）、#412（agent-governance 提案）、#1175（SPO 文档权限） | ⭐⭐⭐⭐⭐ 最高优先级 |
| **组织级技能共享** | #228（org-wide sharing，16评论/8👍） | ⭐⭐⭐⭐⭐ 企业用户强需求 |
| **评估与质量保障** | #556、#1390、#1385、#202 | ⭐⭐⭐⭐ 工具链成熟度诉求 |
| **多代理 / 编排** | #1628（Hivemind）、#1329（compact-memory） | ⭐⭐⭐⭐ 架构演进方向 |
| **上下文效率** | #1487（156k token 注入）、#202（skill-creator 冗余） | ⭐⭐⭐ 性能优化 |
| **平台覆盖扩展** | #568（ServiceNow）、#525（Pyxel）、#723（testing-patterns） | ⭐⭐⭐ 垂直领域深耕 |
| **MCP 生态** | #16（Expose Skills as MCPs）、#29（Bedrock） | ⭐⭐⭐ 基础设施集成 |

---

## 3. 高潜力待合并 Skills

| PR | Skill | 亮点 | 近期落地可能性 |
|----|-------|------|----------------|
| [#1628](https://github.com/anthropics/skills/pull/1628) | **Hivemind** | 零成本多代理编排，契合 Agent 架构热点；作者 @Hanishchow 持续更新至 8/24 | ⭐⭐⭐⭐⭐ 极高 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit** | 机械验证 + 推理质量门禁，通用性强；作者 @YuhaoLin2005 已有 Issue #1385 呼应 | ⭐⭐⭐⭐ 高 |
| [#1602](https://github.com/anthropics/skills/pull/1602) | **评估工具链修复** | 批量修复 mcp-builder 序列化、benchmark 指标、编码问题 | ⭐⭐⭐⭐ 高（基础修复） |
| [#1595](https://github.com/anthropics/skills/pull/1595) | **UIZZE partner skill** | 800k+ 真实屏幕反 UI 冗余，合作伙伴技能引入 | ⭐⭐⭐ 中高 |
| [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** | 覆盖单元测试、React Testing Library、Trophy 模型 | ⭐⭐⭐ 中高 |
| [#568](https://github.com/anthropics/skills/pull/568) | **servicenow** | 覆盖 ITSM/ITOM/ITAM/FSM/SPM 全模块，平台型技能 | ⭐⭐⭐ 中 |
| [#1329](https://github.com/anthropics/skills/issues/1329) | **compact-memory**（Issue） | 符号化紧凑代理状态，长期运行 agent 的上下文优化 | ⭐⭐⭐ 中（提案阶段） |

---

## 4. Skills 生态洞察

> **当前社区最集中的诉求是"可信且可评估的技能基础设施"**——一方面要求官方建立严格的 namespace 与信任边界（#492），另一方面要求 skill-creator 的评估流水线真正可用（#556/#1099/#1390），同时企业用户迫切需要组织级技能共享机制（#228），三者共同指向 Skills 从"能用"到"可信、可度量、可协作"的代际升级。

---

# Claude Code 社区动态日报

**日期：** 2026-08-29

---

## 1. 今日速览

本日 Claude Code 社区共更新 **50 个 Issue** 和 **1 个 Pull Request**。版本 **v2.1.251** 正式引入 `PreModelSwitch`/`PostModelSwitch` 生命周期钩子，允许开发者在模型切换时执行拦截、确认或标注操作。社区热度方面，**Windows 平台的始终置顶窗口问题**持续发酵，单条 Issue 已累计 41 条评论、90 个点赞；Windows 更新机制导致的进程残留问题也出现多个相关报告。

---

## 2. 版本发布

### v2.1.251

| 项目 | 内容 |
|------|------|
| **发布时间** | 2026-08-28 ~ 2026-08-29 |
| **变更类型** | 新功能 + 交互增强 |

**核心更新：**

- **新增生命周期钩子**：`PreModelSwitch` 和 `PostModelSwitch` 事件现已可用，支持在模型切换前/后执行自定义逻辑（阻塞、确认或标注）
- **Session 恢复增强**：`SessionStart` resume 钩子现在接收会话陈旧度（staleness）和预估的重新缓存开销
- **子代理实时流**：前景子代理（foreground subagent）的工具调用和结果现已支持实时流式输出到 Remote Control 界面

> 📎 [Release 页面](https://github.com/anthropics/claude-code/releases/tag/v2.1.251)

---

## 3. 社区热点 Issues

> 按社区活跃度（评论数 + 点赞数综合）筛选，以下 10 个 Issue 最值得关注：

| # | 标题 | 类型 | 评论 | 👍 | 关键点 |
|---|------|------|------|-----|--------|
| #85891 | Windows 11 Claude Desktop 主窗口始终置顶 | 🐛 Bug | 41 | 90 | **最高热度**。Windows 11 上 Claude Desktop 窗口强制置顶于所有应用之上，无关闭选项。已有对应 Issue #66516（macOS） |
| #13340 | settings.json 权限配置未被 Claude Code 遵守 | 🐛 Bug | 26 | 51 | 全局/局部 `settings.json` 中的 `allow` 权限规则对 Claude Code 无效，用户期望的沙箱隔离失效 |
| #34835 | 支持队列式消息追问机制 | ✨ Feature | 20 | 27 | **已关闭**。用户希望在输入后排队多条消息，等待 Claude 逐条响应而非一次性发送 |
| #61682 | GitHub Connector 显示已连接但 Cowork 中无工具 | 🐛 Bug | 27 | 24 | Windows 11 + app v1.8555.2.0 环境下 GitHub MCP 连接状态异常 |
| #80261 | 桌面应用主界面显示用量限制 | ✨ Feature | 2 | 13 | Pro/Max 用户希望在主屏幕看到持续可见的用量指示器，而非仅通过 `/usage` 查询 |
| #88093 | Claude Desktop (Windows) 窗口始终置顶 | 🐛 Bug | 8 | 19 | 与 #85891 相关但独立报告，可能涉及不同触发路径 |
| #74349 | VSCode 扩展无法查看当前激活的模型 | ✨ Feature | 5 | 4 | CLI 有 `/status` 显示当前模型，VSCode 扩展缺少等效的状态栏/侧边栏指示器 |
| #89680 | Windows 静默更新遗留孤儿进程，AppX 容器锁死 | 🐛 Bug | 5 | 0 | 自动更新后遗留旧版子进程，新版启动时 `0x80070020` 错误，必须重启系统 |
| #89687 | MSIX 更新器退出时强制注册到运行中的 AppX 容器 | 🐛 Bug | 5 | 0 | 与 #89680 相关，MSIX 包特有：退出时注册导致新版无法启动，需注销会话 |
| #71942 | macOS 自动更新在会话运行期间删除运行中的 App 包 | 🐛 Bug | 3 | 0 | **高危**。自动更新会删除当前运行的 `.app` Bundle，导致 Full Disk Access 权限被撤销直至重启 |

**特别关注：**

- **#85891 / #88093（置顶窗口问题）**：社区反响最强烈（90 👍），Windows 用户普遍受影响。建议关注官方是否会在近期版本中提供置顶开关设置。
- **#13340（权限配置失效）**：涉及安全模型，51 👍 说明用户对沙箱隔离有强需求，官方尚未公开表态修复计划。

---

## 4. 重要 PR 进展

| # | 标题 | 作者 | 状态 | 变更概述 |
|---|------|------|------|----------|
| #87079 | fix(security-guidance): 修复 `**` glob 模式零深度路径匹配 | @anishsamant | Open | 安全规则中 `**/*.ts` 模式静默排除顶层文件，与文档承诺的"** 匹配任意深度"不符，已修复 glob 匹配逻辑 |

> ⚠️ 过去 24 小时内仅此 1 条 PR 更新。社区整体活跃度集中在 Issue 讨论阶段，尚未进入代码审查高峰期。

---

## 5. 功能需求趋势

通过对全部 50 个活跃 Issue 的标签和内容分析，当前社区最关注的功能方向如下：

| 方向 | 代表 Issue | 热度 | 说明 |
|------|-----------|------|------|
| **跨平台稳定性（Windows）** | #85891, #88093, #89680, #89687, #88094 | ⭐⭐⭐⭐⭐ | Windows 相关 Issue 占 Top 10 的 50%，涉及窗口管理、自动更新、进程残留等 |
| **UI/状态可见性** | #74349, #75047, #80261, #34835 | ⭐⭐⭐⭐ | 用户强烈要求在 UI 中持久显示当前模型、用量进度 |
| **VSCode 集成增强** | #74349, #75064 | ⭐⭐⭐ | VSCode 扩展功能相比 CLI 仍有差距，特别是状态栏和上下文压缩交互 |
| **MCP 生态** | #61682, #90494 | ⭐⭐⭐ | MCP 服务器连接可靠性问题，包括启动时序、网络代理、连接缓存等 |
| **macOS 系统集成** | #71942, #90117, #89666 | ⭐⭐ | 自动更新破坏运行中应用、麦克风按钮行为等 macOS 专有问题 |
| **安全规则增强** | #87079 (PR), #13340 | ⭐⭐⭐ | 权限配置和 glob 模式的安全边界需要更严格和透明 |
| **后台会话 / Agent View** | #79920, #80123, #68465 | ⭐⭐ | 后台会话的文件描述符风暴、终端宽度重绘、代理视图交互等 |

**趋势洞察：** 本周期 Windows 平台问题呈爆发态势（可能与 v2.1.251 发布后用户升级有关），而功能增强需求集中在"**状态可见性**"——用户希望减少信息黑盒，更直观地感知 Claude Code 的运行状态。

---

## 6. 开发者关注点

### 高频痛点

| 痛点 | 典型 Issue | 开发者情绪 |
|------|-----------|------------|
| **Windows 自动更新破坏性极强** | #89680, #89687, #71942 | 😤 强烈不满，影响生产环境可用性 |
| **权限配置形同虚设** | #13340 | 😟 安全顾虑，担心沙箱失效 |
| **模型切换缺乏控制** | #85891 附带的模型切换讨论 | 🤔 希望有更精细的切换前确认机制（已通过 v2.1.251 部分解决） |
| **MCP 连接不稳定** | #61682, #90494 | 😓 企业用户受影响，缺乏调试手段 |

### 高频需求

1. **置顶窗口开关** — Windows 用户明确要求提供"非置顶"选项
2. **用量指示器** — 避免在长时任务中意外耗尽订阅额度
3. **VSCode 状态栏模型显示** — 与 CLI 功能对齐
4. **消息队列机制** — 支持批量排队、批量确认后再发送
5. **后台会话可靠性** — 特别是 macOS 的 Agent View 和 Windows 的 ConPTY 渲染

---

**📌 明日关注：** v2.1.251 的 `PreModelSwitch` 钩子实际使用体验反馈、Windows 置顶问题的官方响应、以及 #13340 权限问题的安全评估进展。

---

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-08-29**

---

### 1. 今日速览
今日 Codex 发布了 `0.151.0-alpha.12` 版本。社区反馈集中在 Windows 桌面端的启动崩溃与进程风暴问题，同时 GPT-5.6 的 Code Mode 序列化调用与子代理任务丢失问题引发大量讨论。开发侧今日合并了 19 条 PR，重点推进了子代理上下文基线保留、MCP 协议增强及代码模式可观测性。

### 2. 版本发布
- **rust-v0.151.0-alpha.12**
  - 链接：https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.12
  - *注：过去24小时内还发布了 alpha.7.1 至 alpha.11 等多个过渡版本，显示当前处于高频迭代期。*

### 3. 社区热点 Issues
1. **#40752** [Windows] 桌面应用更新后无法启动（"Unable to locate Codex CLI"）
   - **重要性**：85条评论，51👍，是当前最严重的阻塞性问题，直接影响 Windows 用户更新体验。
   - 链接：https://github.com/openai/codex/issues/40752
2. **#33776** [Windows] ChatGPT.exe 产生数百个 taskkill.exe/conhost.exe 进程导致 WMI 风暴
   - **重要性**：37条评论，27👍，引发系统级性能降级与 DWM 渲染问题。
   - 链接：https://github.com/openai/codex/issues/33776
3. **#35050** GPT-5.6 经常序列化独立的 Code Mode 调用，显式批处理降低 27-45% 用量
   - **重要性**：40👍，涉及核心模型调用逻辑与计费成本，引发 Pro/Business 用户广泛关注。
   - 链接：https://github.com/openai/codex/issues/35050
4. **#31868** [CLOSED] 为 GPT-5.6 支持可选的 1M 上下文
   - **重要性**：22👍，社区对长上下文支持呼声极高，该问题已闭环。
   - 链接：https://github.com/openai/codex/issues/31868
5. **#10105** [OPEN] 支持 `notifications/tools/list_changed`
   - **重要性**：28👍，MCP 生态核心协议需求，开发者希望实现动态工具启用/禁用通知。
   - 链接：https://github.com/openai/codex/issues/10105
6. **#9923** [OPEN] Codex SSH 执行器
   - **重要性**：13👍，社区强烈期望通过 SSH 在远程主机执行工具调用，实现本地调用远程沙箱。
   - 链接：https://github.com/openai/codex/issues/9923
7. **#25271** [Windows] Computer Use 无法确定 Chrome URL
   - **重要性**：26条评论，8👍，影响 Windows 下浏览器自动化与 Computer Use 核心功能。
   - 链接：https://github.com/openai/codex/issues/25271
8. **#36586** [Windows/CLI] 子代理任务负载对自定义非 OpenAI 提供商（如 DeepSeek）不可见
   - **重要性**：9条评论，5👍，多代理架构下自定义模型的任务分发存在严重缺陷。
   - 链接：https://github.com/openai/codex/issues/36586
9. **#33266** [CLI] MCP `tools/list_changed` 通知未使延迟工具缓存失效
   - **重要性**：6条评论，5👍，MCP 工具动态更新时的缓存一致性痛点。
   - 链接：https://github.com/openai/codex/issues/33266
10. **#41326** [Computer Use] 辅助进程在 get_app_state 成功后每次点击均触发 SIGTRAP
    - **重要性**：8条评论，0👍，属于高严重性崩溃，导致 Computer Use 点击即宕机。
    - 链接：https://github.com/openai/codex/issues/41326

### 4. 重要 PR 进展
1. **#41454** [OPEN] 在重复执行主机失败后阻止目标
   - 连续三次执行失败后标记目标为阻塞，防止无限重试消耗资源。
   - 链接：https://github.com/openai/codex/pull/41454
2. **#41452** [CLOSED] 报告代码模式主机请求持续时间
   - 精确测量 Code Mode 主机操作耗时，剥离客户端延迟，提升可观测性。
   - 链接：https://github.com/openai/codex/pull/41452
3. **#41447** [CLOSED] 支持 `openai/elicitation` 表单请求
   - 增强表单能力支持，兼容新的 `openai/elicitation` 协议。
   - 链接：https://github.com/openai/codex/pull/41447
4. **#41436** [CLOSED] 响应 TTY 子进程的终端查询
   - 拦截并响应 PTY 中的设备状态、窗口大小等查询，解决子进程阻塞问题。
   - 链接：https://github.com/openai/codex/pull/41436
5. **#41424** [CLOSED] 在嵌套代理分支中保留上下文基线
   - 在 Fork 移除用户消息时保留世界状态快作基线，确保上下文连贯性。
   - 链接：https://github.com/openai/codex/pull/41424
6. **#41421** [CLOSED] 支持每个工具的 MCP 输出限制
   - 为 MCP 工具增加 `output_token_limit` 配置，精细化控制输出成本。
   - 链接：https://github.com/openai/codex/pull/41421
7. **#41416** [CLOSED] 添加应用服务器通知媒体过滤
   - 新增 `omit_app_server_notification_media` 特性，过滤通知中的图片/音频以节省带宽。
   - 链接：https://github.com/openai/codex/pull/41416
8. **#41403** [CLOSED] 将云任务凭据限制为可信来源
   - 校验 `CODEX_CLOUD_TASKS_BASE_URL`，防止云任务凭据被发送至非可信域。
   - 链接：https://github.com/openai/codex/pull/41403
9. **#41396** [CLOSED] 为远程插件状态更改刷新运行时
   - 解决插件启用/禁用/重装后，MCP 服务与钩子未及时生效的问题。
   - 链接：https://github.com/openai/codex/pull/41396
10. **#41392** [CLOSED] 添加共享的 Guardian 上下文原语
    - 新增 `codex-guardian-context` 组件，为同步审查与异步评分提供共享结构化上下文。
    - 链接：https://github.com/openai/codex/pull/41392

### 5. 功能需求趋势
- **IDE 与远程开发集成**：以 SSH 执行器（#9923）为代表，社区强烈希望 Codex 能作为本地 IDE 的后端，将工具执行下沉至远程沙箱。
- **MCP 生态与协议完善**：`notifications/tools/list_changed`（#10105, #33266）及 per-tool 输出限制（#41421）成为高频需求，开发者需要更精细的 MCP 工具生命周期与流控管理。
- **多代理与上下文管理**：子代理任务分发（#36586）与嵌套代理 Fork 时的上下文基线保留（#41424）反映出社区对复杂多代理架构稳定性的关注。
- **模型能力扩展**：1M 上下文支持（#31868）与 GPT-5.6 调用行为优化（#35050）是当前模型层最大的诉求。

### 6. 开发者关注点
- **Windows 桌面端稳定性堪忧**：过去24小时更新的 Issues 中，超过半数集中在 Windows 平台，涵盖启动崩溃（#40752）、进程风暴（#33776）、发送按钮卡死（#40968）、浏览器插件失效（#40048, #40228）及宠物叠加层异常（#34227）等，Windows 端适配质量是当前最大痛点。
- **浏览器/Computer Use 可靠性**：无论是 Windows 还是 macOS，Chrome URL 检测失败（#25271, #40474）、策略验证失败（#39280）及辅助进程崩溃（#41326）严重阻碍了 Computer Use 功能的落地。
- **自定义模型兼容性**：DeepSeek 等非 OpenAI 提供商在子代理场景下的任务丢失（#36586），以及 Azure 模型刷新日志异常（#22205），表明自定义模型接入仍存在较多隐性坑点。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-08-29**

---

### 1. 今日速览
今日 Gemini CLI 发布了新的夜间版本 `v0.59.0-nightly.20260829`，核心变更是强化了受限模式下的工作区信任机制。同时，社区提交了多项关键安全修复 PR，涉及 OAuth IdP 混淆防御与系统级配置加载漏洞。在 Issue 侧，子代理（Subagent）行为异常与 Auto Memory 内存系统的稳定性问题持续受到社区高度关注。

### 2. 版本发布
**v0.59.0-nightly.20260829.g0bd1d4397**
*   **核心修复**：在受限模式下强制执行“失败关闭”（fail-closed）的工作区信任策略，并过滤 `mcpServers` 配置，防止在未受信任环境中启动服务器时发生意外的进程执行。
*   *链接：https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260829.g0bd1d4397*

### 3. 社区热点 Issues
1.  **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** - 子代理在达到最大回合数后误报为 GOAL 成功。*(13评论, 2👍)* **P1 Bug**：`codebase_investigator` 在未完成分析且触发最大回合限制时，仍上报成功状态，掩盖了中断事实，严重影响任务可靠性。
2.  **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** - Generalist agent 陷入死锁。*(8评论, 8👍)* **P1 Bug**：委派给通用代理后无响应甚至挂起一小时，简单文件夹创建操作也会卡死，属于高频核心痛点。
3.  **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** - 利用零依赖 OS 沙箱与执行后意图路由发挥模型 Bash 亲和性。*(8评论, 1👍)* **P2 Epic**：探索让 Gemini 3 模型像原生 Bash 用户一样链式调用 POSIX 工具，兼顾能力与安全。
4.  **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** - 评估 AST 感知文件读取、搜索与映射的影响。*(7评论, 1👍)* **P2 Epic**：跟踪 AST 感知工具的调研，旨在精准读取方法边界，减少误读和 Token 浪费。
5.  **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** - Shell 命令执行完成后卡在“等待输入”。*(4评论, 3👍)* **P1 Bug**：简单 CLI 命令执行完毕后，Shell 仍显示活动状态并等待输入，导致流程挂起。
6.  **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** - Browser subagent 在 Wayland 下失败。*(4评论, 1👍)* **P1 Bug**：浏览器子代理在 Wayland 显示服务器环境下无法正常运行。
7.  **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)** - 阻止 Auto Memory 无限重试低信号会话。*(5评论)* **P2 Bug**：提取代理因低信号跳过读取后，会话仍处于未处理状态，导致系统不断重试。
8.  **[#29123](https://github.com/google-gemini/gemini-cli/issues/29123)** - Hooks 事件映射键名大小写不一致。*(1评论)* **P2 Bug** *(今日新建)*：`EVENT_MAPPING` 中子代理停止事件键名为 `SubAgentStop`（大写A），与 Claude Code 的 `SubagentStop` 不一致，可能导致 Hook 迁移失败。
9.  **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** - 代理应停止/劝阻破坏性行为。*(3评论, 1👍)* **P2 Bug**：模型在复杂 Git 操作中偶尔会使用 `git reset --force` 等危险命令。
10. **[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)** - 子代理轨迹应可通过 `/chat share` 查看。*(2评论, 1👍)* **P3 Feature**：子代理轨迹目前难以获取，需支持共享以便于行为审查和评估。

### 4. 重要 PR 进展
1.  **[#29115](https://github.com/google-gemini/gemini-cli/pull/29115)** - 防止不安全的系统级配置加载。*(今日更新, P1, L)*：修复 Windows 和 POSIX 系统上的本地权限提升和跨用户任意命令执行漏洞，引入 ACL 验证。
2.  **[#29117](https://github.com/google-gemini/gemini-cli/pull/29117)** - 防止 MCP 认证中的 OAuth IdP 混淆。*(今日更新, L)*：在 OAuth 回调处理器中实现 RFC 9207 授权服务器颁发者标识验证，防御 IdP 混淆攻击。
3.  **[#28955](https://github.com/google-gemini/gemini-cli/pull/28955)** - 更新依赖、添加 MCP 配置并集成 ECC 捆绑包。*(今日更新, P1, XL)*：大型依赖与配置更新 PR。
4.  **[#29120](https://github.com/google-gemini/gemini-cli/pull/29120)** - 改进 Web Fetch 工具中的目标验证和连接路由。*(今日更新, L)*：通过异步 DNS 查找验证目标地址，并通过 Undici 传输连接器直接绑定解析地址，保留 TLS。
5.  **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116)** - 缓解 NTFS 8.3 短名称（SFN）路径问题。*(今日更新, S/M)*：处理 Windows 短名称（如 `git~1`），防止路径遍历和黑名单绕过。
6.  **[#29106](https://github.com/google-gemini/gemini-cli/pull/29106)** - 在 EOF 处刷新没有尾随空行的最终 SSE 事件。*(今日更新, M)*：修复流式传输结束时因缺少尾随空行而丢失 `finishReason`/usage 元数据的问题。
7.  **[#29114](https://github.com/google-gemini/gemini-cli/pull/29114)** - 防止生成失败时重复执行 handleExit。*(今日更新, S)*：在 `shellExecutionService` 中添加可重入守卫标志，避免 Node.js 子进程错误和关闭事件双重触发。
8.  **[#28938](https://github.com/google-gemini/gemini-cli/pull/28938)** - 保持 GIT_CONFIG_* 环境三元组内部一致性。*(今日更新, P1, L)*：防止敏感 Git 配置值在脱敏后被还原为不可解析的不完整键值对。
9.  **[#28939](https://github.com/google-gemini/gemini-cli/pull/28939)** - 避免持久化中断的响应占位符。*(今日更新, P1, L)*：修复中断的工具响应占位符被模型重复引用导致会话污染的问题。
10. **[#28930](https://github.com/google-gemini/gemini-cli/pull/28930)** - 移除不安全的 `diff.external` 覆盖。*(今日更新, P1, M)*：禁用 Shell 沙箱内的外部 diff 工具，防止 Git 解析空值带来的安全隐患。

### 5. 功能需求趋势
从近期社区 Issue 来看，功能演进主要集中在以下几个方向：
*   **子代理架构优化与可观测性**：社区强烈要求提升子代理的稳定性（如 #22323、#21409），并希望增强其可观测性（如 #22598 轨迹共享、#21763 Bug报告包含子代理上下文）。
*   **内存系统质量与安全**：Auto Memory 成为近期 Bug 重灾区，社区要求停止低效重试（#26522）、增加确定性脱敏（#26525）以及隔离无效补丁（#26523）。
*   **深度代码理解（AST 感知）**：社区正在积极探索利用 AST 感知工具（#22745、#22746）替代传统文本读取，以提升代码导航和映射的精准度。
*   **沙箱与模型原生能力结合**：探索如何利用 Gemini 3 模型原生的 Bash 亲和性，结合零依赖 OS 沙箱（#19873），在安全前提下最大化执行效率。
*   **跨平台与兼容性**：浏览器代理在 Wayland 下的适配（#21983）以及 Windows 长路径和短名称处理（#29116、#28926）成为近期重点。

### 6. 开发者关注点
开发者反馈的痛点和高频需求主要集中在以下方面：
*   **子代理行为失控**：子代理不按预期使用技能和子代理（#21968）、达到最大回合数却误报成功（#22323）、以及通用代理死锁（#21409），导致开发者对多智能体协作的可靠性存疑。
*   **交互式命令与 Shell 挂起**：Shell 命令执行后卡死在“等待输入”状态（#25166），以及创建 Vite 等交互式项目时卡在提示符（#22465），严重影响开发流畅度。
*   **浏览器代理兼容性**：在 Wayland 环境失败（#21983），且无视 settings.json 中的配置覆盖（如 maxTurns）（#22267），导致开发者无法有效管控浏览器代理行为。
*   **内存系统不可靠**：Auto Memory 存在无限重试低信号会话、日志泄露敏感信息、静默跳过无效补丁等问题（#26522, #26525, #26523），开发者对其数据质量缺乏信任。
*   **安全与配置稳定性**：开发者高度关注 Git 环境变量的一致性（#28938）、OAuth 认证安全（#29117）以及系统级配置加载漏洞（#29115），反映出对底层运行环境安全性的强烈诉求。

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报

**日期**：2026-08-29  
**版本线**：v2 — Go rewrite (1.x)

---

## 1. 今日速览

Reasonix 社区在 2026-08-28 集中发布了 **v1.33.0** 系列版本（含 CLI、Desktop、Studio），重点改进了 Shell 配置安全性、远程凭据管理与界面稳定性，并新增通知音量控制功能。同时，社区在 24 小时内关闭了大量长期存在的 Bug（尤其是上下文压缩和 Windows 平台相关问题），MCP 2026 交互支持的新 PR 也进入 Open 状态，标志着 Reasonix 在多智能体协作能力上迈出重要一步。

---

## 2. 版本发布

### 🎉 Reasonix v1.33.0（CLI / Desktop / Studio）

| 组件 | 版本号 | 发布时间 | 渠道 |
|------|--------|----------|------|
| Reasonix CLI | v1.33.0 | 2026-08-28 | 稳定版 |
| Reasonix Desktop | desktop-v1.33.0 | 2026-08-28 | 稳定版 |
| Reasonix Studio | studio-v2.10.0 | 2026-08-28 | 稳定版 |

**核心更新**：

- **Shell 配置与凭据安全**：改进远程 SSH 工作区的凭据管理，增强跨平台 Shell 发现的确定性（Windows Git Bash、macOS zsh/Linux Bash）
- **界面稳定性**：修复会话滚动反弹、运行任务时界面抽动等问题（涉及 #9553、#9540、#9551 等 PR）
- **通知音量控制**：新增通知音量调节功能
- **Studio v2.10.0 专属**：
  - 交付证据出处改由宿主掌握（关闭 5 处「被审计方可以回答审计门」的路径）
  - 远程连接诊断与远端目录直接选择
  - Windows 产物开始走 Authenticode 签名
  - 修复并行数据竞争与窄屏会话侧栏折叠缺陷（#9507）

### 🔧 v1.32.1（CLI / Desktop）

- 改进代理对话流程，普通回合自然结束，无需调用合成的 `finish` 工具
- 减少不必要的工具调用，提升对话流畅度

### 🔧 v1.32.0（CLI / Desktop）

- 新增 **远程 SSH 工作区**支持
- 实现 **持久有序的回合**，支持更流畅的对话导航
- 提升 Windows 兼容性与状态恢复可靠性

**更新日志**：[v1.33.0 完整日志](https://reasonix.io/changelog/v1.33.0/) · [English](https://reasonix.io/changelog/v1.33.0/?lang=en)

---

## 3. 社区热点 Issues（Top 10）

### 🔴 #8176 —— 压缩上下文失败，上下文窗口提示不准确
**评论：7 | 状态：CLOSED**

- **重要性**：直接关系到长对话的可用性，用户反映「压缩提示压缩失败，右侧上下文窗口提示不准确」
- **平台**：Windows + v2 版本（v1.22.0）
- **社区反应**：7 条评论说明此问题已引起较多关注，团队已修复

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/8176](https://github.com/esengine/DeepSeek-Reasonix/issues/8176)

---

### 🔴 #7978 —— OpenCode DeepSeek V4 被强制限制 128k 上下文
**评论：5 | 状态：CLOSED**

- **重要性**：用户付费购买了 1M 长上下文能力，但 Reasonix 强制上限 128k，导致能力浪费
- **对比**：同一 API 密钥在 Claude Code 中可正常使用 1M 上下文
- **根因**：Reasonix 内置 OpenCode 渠道时对上下文做了人为限制
- **平台**：Windows + v2（v1.21.3）

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/7978](https://github.com/esengine/DeepSeek-Reasonix/issues/7978)

---

### 🟡 #9107 —— write_paths 应优先文件粒度而非目录，降低并发写冲突
**评论：5 | 状态：OPEN**

- **重要性**：大项目多会话/子代理并发时频繁因 write_path 冲突而阻塞等待
- **根因**：当前提示词只要求「互不重叠」，未引导模型「能明确到文件名时优先用文件」
- **建议**：修改 Prompt 使 write_paths 尽可能具体到文件，减少并行冲突

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/9107](https://github.com/esengine/DeepSeek-Reasonix/issues/9107)

---

### 🟢 #8194 —— 会话列表管理：手动拖拽排序 + 可折叠会话分组
**评论：4 | 状态：CLOSED**

- **功能点**：
  1. 支持拖拽排序会话
  2. 全局工作区支持可折叠的会话子分组
- **平台**：Desktop + v2

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/8194](https://github.com/esengine/DeepSeek-Reasonix/issues/8194)

---

### 🟡 #9118 —— 展开前 N 轮对话点击无效
**评论：3 | 状态：CLOSED**

- **复现**：长对话中点击「展开前 2 轮对话」后无反应
- **平台**：Windows TUI + v2（v1.29.0）

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/9118](https://github.com/esengine/DeepSeek-Reasonix/issues/9118)

---

### 🟡 #8755 —— 待办列表完成后每次升级都重新弹出
**评论：3 | 状态：CLOSED**

- **问题**：待办列表执行完成后，Agent 已自行修复，但下次升级时问题复现
- **平台**：Windows + v2（v1.24.1、v1.24.2）

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/8755](https://github.com/esengine/DeepSeek-Reasonix/issues/8755)

---

### 🟡 #8379 —— 无法删除待引导项
**评论：3 | 状态：CLOSED**

- **场景**：当前任务进行中，在等待列表中的引导项无法移除
- **错误提示**：inbox item 相关错误
- **平台**：macOS + v2（v1.23.0）

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/8379](https://github.com/esengine/DeepSeek-Reasonix/issues/8379)

---

### 🟡 #6740 —— 任务中补充指示被模型忽略
**评论：3 | 状态：CLOSED**

- **场景**：Linux Desktop 任务中通过补充指示输入文字后，模型无响应，内容被忽略
- **规律**：重复尝试有时成功有时失败，无明显规律
- **平台**：Linux Mint 22.3 + v2（v1.17.16）

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/6740](https://github.com/esengine/DeepSeek-Reasonix/issues/6740)

---

### 🟡 #9094 —— todo_write 因 complete_step 不可用产生死锁
**评论：2 | 状态：CLOSED**

- **现象**：待办列表 UI 显示 0/5，无法更新状态，但 Git 已提交 4 次
- **根因**：`todo_write` 在 `complete_step` 不可用时陷入死锁
- **平台**：v1.28 goal 阶段

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/9094](https://github.com/esengine/DeepSeek-Reasonix/issues/9094)

---

### 🟡 #9338 —— 无法删除添加的 OpenCode
**评论：2 | 状态：CLOSED**

- **错误**：`remove provider access: custom provider "opencode-go" cannot be removed as part of a group`
- **场景**：桌面端「设置 → 提供商」删除 opencode-go 时报错
- **平台**：macOS Desktop + v2（v1.31.3）

🔗 [https://github.com/esengine/DeepSeek-Reasonix/issues/9338](https://github.com/esengine/DeepSeek-Reasonix/issues/9338)

---

## 4. 重要 PR 进展（Top 10）

| PR # | 标题 | 状态 | 重要性 | 链接 |
|------|------|------|--------|------|
| **#9547** | feat(mcp): 支持 MCP 2026 交互与 Apps | **OPEN** | ⭐⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/9547) |
| **#9513** | 稳定对话阅读滚动事务 | **OPEN** | ⭐⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/9513) |
| **#9519** | 增加安全的跨平台 Shell 支持 | CLOSED | ⭐⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/9519) |
| **#9542** | 安全刷新并撤销远程凭据代理路由 | CLOSED | ⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/9542) |
| **#9540** | 修复运行任务时界面抽动 | CLOSED | ⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/9540) |
| **#9553** | 修正绘制前空白高度回弹 | CLOSED | ⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/9553) |
| **#9557** | 隔离内存索引并排空根队列 | CLOSED | ⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/9557) |
| **#7875** | 将会话中链接改为可点击 | CLOSED | ⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/7875) |
| **#7770** | 修复子代理清理持锁竞态 | CLOSED | ⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/7770) |
| **#7561** | 使代码块内本地路径可点击 | CLOSED | ⭐⭐ | [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/7561) |

### 重点 PR 解析

**#9547 —— MCP 2026 交互与 Apps 支持（OPEN）**
- 新增三种不可变的 MCP 主机配置文件：headless core、interactive form/URL elicitation、Desktop Apps
- 引入 profile 隔离的目录和四层能力视图
- 支持 MCP 2026-07-28 多轮次 elicitation，通过持久化 tab/terminal 进行路由
- **意义**：这是推动 Reasonix 从单一 AI 工具向多智能体协作平台演进的关键 PR

**#9519 —— 跨平台 Shell 支持（v1.33.0 已合并）**
- 实现进程级缓存的 Shell 清单
- Windows：确定性发现 Git Bash（从配置、PATH、注册表、标准安装位置）
- macOS：解析 Bash → 原生 zsh → POSIX sh
- Linux：保持 Bash-only

**#7875 / #7561 —— 会话链接可点击**
- TUI：支持 Markdown 链接、裸 URL、代码块内 URL（OSC 8 超链接）
- Desktop：支持反引号包裹的本地路径（如 `` `D:\x\y.md` ``）点击跳转

---

## 5. 功能需求趋势

基于过去 24 小时的 Issues 数据（48 条），提炼社区最关注的功能方向：

### 📊 需求分布

| 功能方向 | Issue 数量 | 占比 | 典型 Issue |
|----------|------------|------|------------|
| **上下文管理** | 8 | 16.7% | #8176、#7978、#8847、#8846 |
| **终端/复制粘贴** | 4 | 8.3% | #8475、#8474、#7845 |
| **远程 SSH 工作区** | 3 | 6.3% | #9310 |
| **MCP 集成** | 3 | 6.3% | #9496、#9401 |
| **会话管理** | 3 | 6.3% | #8194、#9030 |
| **跨平台兼容性** | 4 | 8.3% | #9363、#9152、#8992 |

### 🔍 深度分析

1. **上下文管理是最大痛点**（16.7%）
   - 用户强烈反馈压缩逻辑不合理（65% 下限过死）
   - 长上下文能力被人工限制（128k vs 1M）
   - 建议：放宽 `compact_ratio` 下限或提供更便捷的窗口上限设置

2. **终端交互急需改进**（8.3%）
   - 无法复制粘贴（高频需求）
   - 全量添加浪费 tokens
   - 布局不合理（挤占输入框空间）
   - 建议：支持部分内容选择、独立窗口或侧边栏布局

3. **远程工作区热度上升**（6.3%）
   - 用户期望统一的项目接入体验
   - 需要连接向导、远程项目树、全功能远程会话
   - 远程凭据管理是安全重点

4. **MCP 生态扩展**（6.3%）
   - MCP 工具调用成功率问题
   - 关闭的 MCP 仍被加载
   - #9547 PR 正推动 MCP 2026 支持

---

## 6. 开发者关注点

### 🎯 高频痛点

| 痛点 | 出现频次 | 影响范围 |
|------|----------|----------|
| **上下文窗口超出导致会话崩溃** | 高 | Windows 用户为主 |
| **待办列表状态不同步** | 中 | 多平台 |
| **终端复制粘贴缺失** | 中 | Desktop 用户 |
| **远程凭据刷新不生效** | 低 | SSH 用户 |

### 💡 开发者建议（来自 Issues）

1. **Prompt 优化**
   - `write_paths` 应引导到文件粒度，减少并发冲突（#9107）
   - `compact_ratio` 下限从 0.65 放宽到 0.4（#9060）

2. **UX 改进**
   - 终端支持部分内容选择添加（#8475）
   - 会话分组标题字号一致化（#9030）
   - 折叠项目显示活跃会话指示（#8209）

3. **平台适配**
   - macOS exFAT 磁盘自动更新问题（#9152）
   - Windows 任务栏图标异常（#9363）
   - Linux Wayland 纯文本粘贴被误判为图片（#8992）

### 📈 社区活跃度

- **Issues**：48 条/24h，其中 2 条 OPEN（#9107、#9077、#8474）
- **PRs**：44 条/24h，其中 4 条 OPEN
- **平均修复周期**：约 2-3 天（大部分 Bug 已关闭）

---

**日报生成时间**：2026-08-29  
**数据来源**：[esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**OpenCode 社区动态日报 (2026-08-29)**

---

### 1. 今日速览
OpenCode 社区今日主要关注点集中在性能优化与 bug 修复。v1.18.25 修复了 Azure 认证流程，v1.18.24 解决了 Bedrock 推理缓存问题。社区热议的性能问题（如 GPT 模型响应延迟、Zen 模式全局变慢）和内存泄漏（TUI 每启动泄露 21MB .so 文件）引发了大量讨论。同时，数据迁移相关 bug（更新后会话丢失）和 UI 渲染崩溃（Signal 循环、卡死）也成为开发者关注焦点。

---

### 2. 版本发布

| 版本 | 更新内容 |
|------|------------|
| **v1.18.25** | • Azure 认证优化——无需 Bun 即可通过 Azure CLI 登录。<br>• 修复了 Bedrock 推理缓存导致的空消息问题。 |
| **v1.18.24** | • Azure 提供商现支持通过 Microsoft Entra ID + Azure CLI 登录，摆脱 API 密钥限制。<br>• v1 端支持读取 v2 配置字段，增强配置兼容性。 |

*链接:* https://github.com/anomalyco/opencode/releases/tag/v1.18.25 / v1.18.24

---

### 3. 社区热点 Issues (Top 10)

| # | 标题 | 状态 | 评论数 | 为什么重要 | 社区反应 |
|---|-------|--------|---------|----------------|-------------------|
| 29079 | GPT 模型响应过慢 | **已关闭** | **119** | 影响日常使用，用户报告简单提示有时需要数分钟。 | 高讨论度，52 赞同，反映了性能瓶颈。 |
| 42700 | [2.0] TUI 每启动泄露 ~21MB .so 文件 | **开放** | **7** | 临时目录迅速填满，导致 TUI 启动失败。 | 核心开发者关注，需尽快修复。 |
| 22792 | 本地 vLLM+Qwen3-Coder 导致摘要无限循环 | **已关闭** | **6** | 特定配置下出现病态行为，影响开发体验。 | 技术讨论较多，3 赞同。 |
| 29397 | Opencode Zen 模式全局变慢，Esc 键中断不稳定 | **已关闭** | **6** | 所有模型响应延迟，用户无法中断请求。 | 6 评论，7 赞同，反映了用户困扰。 |
| 34223 | Web UI 文件树开关被 `desktop()` 隐藏 | **已关闭** | **5** | 浏览器端无法启用文件树，影响文件浏览。 | UI 回归问题，需修复。 |
| 15680 | 向插件暴露工作树生命周期事件 | **已关闭** | **4** | 插件无法感知工作树创建/删除/重置，限制了扩展性。 | 功能请求，3 赞同。 |
| 34532 | 工具加载失败后出现持久红点状态 | **已关闭** | **3** | macOS 端状态指示器异常，需重装才能清除。 | UI  bug，影响用户体验。 |
| 34471 | 重置配置文件后 Desktop/Web 丢失历史会话 | **已关闭** | **3** | 数据迁移 bug，SQLite 数据库保留会话但 UI 显示为空。 | 数据丢失严重，引发关注。 |
| 34402 | 单次请求花费 21 美元却无输出 | **已关闭** | **3** | 成本暴涨问题，用户使用 GPT-5.5 Pro 时损失严重。 | 安全与计费问题，引发警惕。 |
| 46059 | 模型陷入文本推理循环，工具 never 执行 | **已关闭** | **2** | AI 输出“让我 grep”等文本，工具 never 调用，导致流程卡死。 | 模型行为 bug，影响生产力。 |

*链接:* https://github.com/anomalyco/opencode/issues/29079 等

---

### 4. 重要 PR 进展 (Top 10)

| # | 标题 | 状态 | 提交者 | 核心改进 |
|---|-------|--------|---------|---------------|
| 46051 | 停止每次 `PartUpdated` 时克隆 Part 对象 | **开放** | Nittarab | 减少内存分配，缓解大规模会话下的性能瓶颈。 |
| 46044 | 降低会话切换延迟 | **开放** | Hona | 修复打开未访问会话时约 0.5 秒的空白 transcript。 |
| 46062 | 验证 AI 工具结果的规范性 | **开放** | kitlangton | 防止动态工具返回非法内容，强化运行时校验。 |
| 46058 | 释放已退出 shell 的执行状态 | **开放** | Hona | 清理保留的 shell 记录，优化资源管理。 |
| 46019 | 隔离 Session 准入与控制逻辑 | **开放** | kitlangton | 提高代码可测试性，分离 admission 规则与插件查找。 |
| 46031 | 添加分支 review 作用域到 TUI | **已合并** | kitlangton | 修复已提交变更从 diff 中消失的问题，支持多分支。 |
| 45658 | 保留 Responses 工具的逻辑标识 | **已合并** | kitlangton | 防止 provider 名称覆盖逻辑名称（如 `documents`），提升可读性。 |
| 45885 | 解析失败时提示 Agent 前置 YAML 错误 | **已合并** | zhouksh | 增强配置错误提示，避免 silent 失败。 |
| 45544 | CLI 支持配置 CORS 域名白名单 | **已合并** | Brendonovich | 为服务端提供安全跨域控制，增强 Web 客户端安全性。 |
| 46048 | 短时流式输出强制刷新定时器 | **已合并** | kitlangton | 防止短 burst 后客户端长时间无数据显示，提升 TUI 流畅度。 |

*链接:* https://github.com/anomalyco/opencode/pull/46051 等

---

### 5. 功能需求趋势

| 趋势方向 | 体现问题 | 示例 Issues |
|------------|-------------------|-------------------|
| **性能与稳定性** | 模型响应延迟、内存泄漏、渲染卡死 | #29079、#42700、#34421、#34437 |
| **UI/UX 修复** | 设置页隐藏、文件树开关、Esc 键中断、红点状态 | #34223、#29397、#34532、#34507 |
| **数据迁移与会话管理** | 更新后会话丢失、profile 重置后历史消失 | #34471、#34445 |
| **模型与提供商支持** | NVIDIA 显卡模型不工作、温度参数未发送、Bedrock 缓存问题 | #46046、#25755、#34426 |
| **插件与技能管理** | 工作树事件未暴露、技能文件 never 热重载 | #15680、#34443、#34408 |
| **CLI 与终端集成** | 并行会话冲突、shell 命令中断思考设置、计划模式崩溃 | #28249、#34399、#34427 |
| **成本控制与安全** | 单次请求花费暴增、工具执行 loop、CORS 配置缺失 | #34402、#46059、#45544 |
| **调试与监控** | 日志信号循环、渲染进程卡死、Part 更新克隆过多 | #34421、#34382、#46051 |

---

### 6. 开发者关注点

- **性能瓶颈**: GPT 模型响应延迟、Zen 模式全局变慢、TUI 启动卡顿（21MB 泄漏）。
- **数据安全**: 更新后会话丢失、profile 重置后历史消失、SQLite 迁移 bug。
- **UI 回归**: 设置页隐藏、文件树开关不可用、Esc 键中断不稳定、红点状态持久。
- **技能与插件**: 技能文件修改 never 热重载、工作树事件未暴露、工具加载失败后状态异常。
- **模型支持**: NVIDIA 显卡模型无法推理、温度参数 never 发送、Bedrock 推理缓存问题。
- **渲染稳定性**: Signal 无限循环、渲染进程卡死、大文件 diff 解析阻塞。
- **成本控制**: 单次请求花费暴涨、模型陷入文本推理 loop，导致资源浪费。

这些问题反映了社区对稳定、易用、扩展和经济性的持续追求。未来版本将重点关注性能优化、数据迁移修复、UI/UX 回归修复以及增强插件/技能热重载机制。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Qwen Code 社区动态日报 (2026-08-29)**

---

### 今日速览
- 发布 v0.22.3-nightly.20260829.e5cb60ad48 和稳定版 v0.22.3，新增渠道拥有者作用域会话、守护进程扩展绝对路径支持、WebShell Git 状态提示等功能。
- 主分支 CI 连续失败，触发 #10450 和 #10453 两个新问题，Fleet Shephard 监控仪表板 issue #7167 也获得更新。
- 多项 PR 聚焦 autofix 改进、WebShell 功能增强、TUI 性能优化和会话管理，体现了社区对 CI 稳定性和开发者体验的高度关注。

---

### 版本发布

| 版本 | 更新亮点 |
|------|------------|
| **v0.22.3-nightly.20260829.e5cb60ad48** | • WebShell 侧边栏显示 Git 状态提示（PR #10397）  <br>• 审查流程新增 emit 事件  <br>• 渠道新增拥有者作用域命名会话，支持最多 8 个持久任务（PR #10198）  <br>• 守护进程扩展安装支持绝对本地路径，拒绝相对路径 |
| **v0.22.3** | 稳定版发布，合并上述 nightly 特性，并修复 WebShell 会话差异恢复、渠道多语言富文本保留等问题（PR #10093、#10198） |

---

### 社区热点 Issues (10 个最值得关注)

| # | 标题 & 标签 | 重要性 & 社区反应 |
|---|------------|------------------|
| **#10450** | `[bug][ready-for-agent][autofix/skip] Main CI failed: E2E Tests on 045ae1fc2b69` | 主分支 CI 在无测试结果报告的情况下崩溃，影响合并流程。社区高度关注，已有 1 条评论和 0 个点赞。**[链接](https://github.com/QwenLM/qwen-code/issues/10450)** |
| **#10453** | `[bug][ready-for-agent][autofix/in-progress] Main CI failed: E2E Tests on 48ec00834542` | 与 #10450 类似，另一条 CI 失败链，表明 CI 稳定性问题持续存在。**[链接](https://github.com/QwenLM/qwen-code/issues/10453)** |
| **#7167** | `[status/need-information][scope/ci-cd] Fleet Shepherd Dashboard` | 自动维护的监控仪表板，追踪 CI/CD 流程健康状态。当前扫描信号 age 8 分钟，社区关注 CI 整体运行状态。**[链接](https://github.com/QwenLM/qwen-code/issues/7167)** |
| **#10106** | *(由 PR #10117 引用)* – autofix 线程解析 guard 拒绝信息未在报告中显现 | Autofill 流程可能完全静默，导致无法了解哪些检查拒绝了解决方案。社区希望提高透明度，避免“黑箱”修复。**[链接](https://github.com/QwenLM/qwen-code/issues/10106)** |
| **#10428** | *(由 PR #10429 引用)* – `/resolve` 路径请求丢失（moved heads、fork pushes、503、drafts） | `@qwen-code /resolve` 命令在 agent 执行后丢失请求，导致修复无法应用。社区急需稳定 resolve 流程。**[链接](https://github.com/QwenLM/qwen-code/issues/10428)** |
| **#10447** | *(由 PR #10452 引用)* – 心跳 fake-shim 调用记录原子性问题 | 心跳辅助测试记录调用，但发布时记录可能不完整，影响测试覆盖率。社区关注测试数据的准确性。**[链接](https://github.com/QwenLM/qwen-code/issues/10447)** |
| **#9655** | *(由 PR #10221 引用)* –  prose-execution 审计与 counter-frame 审计 | 源于 #9655 事故分析，新增两项评审镜片以提高代码质量。社区重视代码审查的全面性。**[链接](https://github.com/QwenLM/qwen-code/issues/9655)** |
| **#9707** | *(由 PR #10221 引用)* – 与 #9655 事故相关的第二项评审镜片 | 同样来自 #9655 事故分析，补充 prose-execution 审计。**[链接](https://github.com/QwenLM/qwen-code/issues/9707)** |
| **#9717** | *(由 PR #10221 引用)* – 与 #9655 事故相关的第三项评审镜片 | 替换原 #9717，整合 74 条评审线程。社区希望统一评审标准。**[链接](https://github.com/QwenLM/qwen-code/issues/9717)** |
| **#9300** | *(由 PR #9305 引用)* – VP 模式下短内容底部对齐问题 | 虚拟视口模式下，内容顶部对齐导致空白区域，影响用户体验。社区反馈 UI 微细节问题。**[链接](https://github.com/QwenLM/qwen-code/issues/9300)** |

---

### 重要 PR 进展 (10 个核心 PR)

| # | 标题 & 标签 | 功能/修复简介 |
|---|------------|--------------|
| **#10410** | `[feat(core)] preserve prompt cache for deferred tools` | 引入稳定的双步桥接机制：`tool_search` 让模型查看 deferred 工具 schema，`tool_call` 验证并执行，解决缓存丢失问题。**[链接](https://github.com/QwenLM/qwen-code/pull/10410)** |
| **#10011** | `[feat(web-shell)] persist reasoning effort` | WebShell 推理选择立即更新活动会话，并持久化为全局 `model.reasoningEffort` 默认值，支持 `none` 禁用。**[链接](https://github.com/QwenLM/qwen-code/pull/10011)** |
| **#10226** | `[autofix/takeover][review/self-reported] feat: shell support optional worktree` | 为 shell 命令增加可选工作树功能，提升开发工作流灵活性。**[链接](https://github.com/QwenLM/qwen-code/pull/10226)** |
| **#9970** | `[autofix/takeover] perf(cli): reduce TUI render overhead` | 启用虚拟视口模式下的增量终端输出，并通过 memoized state slice 隔离历史渲染，提升交互流畅度。**[链接](https://github.com/QwenLM/qwen-code/pull/9970)** |
| **#10398** | `[review/self-reported] feat(web-shell): expose assistant turn settlement` | 新增 WebShell 回调，用于语义化助理回合结算，报告完成/取消/失败状态。**[链接](https://github.com/QwenLM/qwen-code/pull/10398)** |
| **#10452** | `[review/self-reported] fix(ci): publish heartbeat fake-shim call records atomically (#10447)` | 修复心跳辅助测试记录的原子性问题，确保每个调用记录完整写入。**[链接](https://github.com/QwenLM/qwen-code/pull/10452)** |
| **#10295** | `fix(cli): show Goal objectives in session picker` | Goal-only 会话使用持久化目标作为备用标签，方便用户识别和搜索。**[链接](https://github.com/QwenLM/qwen-code/pull/10295)** |
| **#10036** | `[autofix/takeover] fix(ci): route release pipeline Linux jobs to the ECS runner pool` | 将发布流水线中 4 个 Linux 非发布任务路由到 ECS 运行池，提高资源利用率。**[链接](https://github.com/QwenLM/qwen-code/pull/10036)** |
| **#10221** | `[autofix/takeover][review/self-reported] feat(review): add the prose-execution audit and the counter-frame audit` | 补充 #9655 事故分析中的两项评审镜片，整合 74 条评审线程，提升代码质量。**[链接](https://github.com/QwenLM/qwen-code/pull/10221)** |
| **#8927** | `[review/self-reported][autofix/needs-human] feat(channels): bound session lifetime with sessionRotation` | 为每个渠道添加 `sessionRotation` 选项，支持 `maxTurns` 和 `maxIdle` 两种生命周期限制。**[链接](https://github.com/QwenLM/qwen-code/pull/8927)** |

---

### 功能需求趋势

1. **CI/CD 稳定性与自动化** – 连续 CI 失败和 Fleet Shepherd 监控仪表板问题凸显了构建流程的可靠性需求。
2. **Autofill/Autofix 透明度与准确性** – 社区希望 autofix 流程能够清晰报告 guard 拒绝、回归检测和解决进度。
3. **WebShell 功能丰富与用户体验** – 推理努力持久化、助理回合结算、Local Control QR 码等功能不断完善。
4. **会话与渠道管理** – 拥有者作用域命名会话、sessionRotation、Goal 目标显示等提升了会话管理颗粒度和用户识别。
5. **性能优化** – TUI 渲染开销减少、缓存保留等提升了客户端响应速度。
6. **扩展性与守护进程增强** – 绝对路径支持、作用域工作区内存任务等扩展了平台可扩展性。

---

### 开发者关注点

- **CI 失败导致合并阻塞** – 主分支 CI 频繁崩溃，影响开发流程，需快速定位根因。
- **Autofill 流程“失踪”问题** – guard 拒绝信息仅以警告形式出现，缺乏 PR 级反馈，导致团队无法评估修复效果。
- **UI 对齐微细节** – VP 模式下内容顶部对齐引发空白区域，影响视觉舒适度。
- **会话状态持久化** – 开发者希望会话设置（如推理努力）跨重启保持一致性。
- **扩展安装路径管理** – 相对路径问题导致守护进程安装失败，需更友好的路径验证。
- **测试数据原子性** – 心跳辅助测试记录不完整影响测试覆盖，需保证数据一致性。

---

*以上内容根据 2026-08-29 00:00~23:59 GitHub 公开数据整理，部分 Issue/PR 链接基于 PR 描述中的引用生成。*

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报
**日期：2026-08-29**

---

### 1. 今日速览
今日 Hermes 社区无新版本发布，但开发与迭代活跃度极高，共更新 20 个 PR 和 7 个 Issues。核心动态集中在 Desktop 端稳定性修复（AMD GPU 崩溃、Bot Mode 渐进式加载）、模型上下文支持补全（glm-5.3、Tencent Hy4）以及安全与配置边界加固（MCP 凭据脱敏、配置静默覆盖）。

---

### 2. 版本发布
*无新版本发布。*

---

### 3. 社区热点 Issues
过去 24 小时内共更新 7 个 Issues，以下为全部热点问题：

1. **#36624 [CLOSED] Auto compression can exhaust context in tool-heavy sessions** ([链接](https://github.com/NousResearch/hermes-agent/issues/36624))
   * **重要性**：P1 级严重 Bug。在工具密集型会话中，自动压缩机制失效，导致上下文被耗尽直至 Provider 报错，严重影响长任务稳定性。
2. **#97595 [OPEN] _STATIC_CONTEXT_LENGTHS missing glm-5.3** ([链接](https://github.com/NousResearch/hermes-agent/issues/97595))
   * **重要性**：P2 级 Bug。glm-5.3 缺少独立的上下文长度配置，降级为通用 202K  fallback，导致 1M 上下文模型被过早压缩。
3. **#97596 [OPEN] BWS secret injection uses hardcoded whitelist** ([链接](https://github.com/NousResearch/hermes-agent/issues/97596))
   * **重要性**：P2 级安全/配置 Bug。硬编码的 `_EXTRA_ENV_KEYS` 导致自定义 Provider 的 API 密钥无法从 Bitwarden 注入，限制了企业级配置灵活性。
4. **#97616 [OPEN] Desktop: GPU process crash on AMD/Mesa** ([链接](https://github.com/NousResearch/hermes-agent/issues/97616))
   * **重要性**：Desktop 端严重可用性 Bug。Linux AMD 显卡（Mesa）下 GPU 进程崩溃，`disableHardwareAcceleration()` 修复无效，阻止了部分用户启动应用。
5. **#97579 [OPEN] `hermes config set` silently persists model selection** ([链接](https://github.com/NousResearch/hermes-agent/issues/97579))
   * **重要性**：P2 级配置安全 Bug。`hermes config set` 在任意配置写入时会静默覆盖 `model:` 块的选择，可能导致配置文件损坏或模型路由异常。
6. **#71998 [OPEN] pre_llm_call plugin context is dropped for multimodal image turns** ([链接](https://github.com/NousResearch/hermes-agent/issues/71998))
   * **重要性**：P3 级插件兼容性 Bug。多模态（图片）轮次中 `pre_llm_call` 插件返回的 context 被静默丢弃，影响插件开发者生态。
7. **#97611 [OPEN] Prefer non-visual information sources before launching browser** ([链接](https://github.com/NousResearch/hermes-agent/issues/97611))
   * **重要性**：P3 级功能需求。呼吁在启动浏览器前优先使用本地或非视觉信息源，以降低工具调用的资源消耗和延迟。

---

### 4. 重要 PR 进展
过去 24 小时内共更新 20 个 PR，以下为 10 个核心进展：

1. **#97620 [OPEN] feat(memory): per-project and multi-bank Hindsight routing** ([链接](https://github.com/NousResearch/hermes-agent/pull/97620))
   * **内容**：重构 Hindsight 内存路由，支持按项目和多记忆库动态解析，修复了 `{workspace}` 模板硬编码为字面量 "hermes" 的历史遗留问题。
2. **#97466 [OPEN] fix(mcp): fully redact Bearer values in mcp test output** ([链接](https://github.com/NousResearch/hermes-agent/pull/97466))
   * **内容**：安全修复。`hermes mcp test` 输出中完全脱敏 Bearer 令牌，防止凭据片段以 `first4***last4` 格式泄露至 CLI 错误日志或 API 端点。
3. **#97618 [OPEN] fix(caching): prevent whitespace-only text blocks in prompt cache** ([链接](https://github.com/NousResearch/hermes-agent/pull/97618))
   * **内容**：修复提示缓存前缀拆分中的空白文本块问题，解决了 Anthropic Messages API 返回 HTTP 400 Bad Request 的底层原因。
4. **#97617 [OPEN] fix(gateway): label busy-path steer/redirect follow-ups** ([链接](https://github.com/NousResearch/hermes-agent/pull/97617))
   * **内容**：网关修复。忙碌状态下的 steer/redirect 后续消息现在会附带共享会话发送者标签，修复了多用户共享会话中消息归属混乱的问题。
5. **#97609 [OPEN] fix(curator): prevent terminal archive bypass** ([链接](https://github.com/NousResearch/hermes-agent/pull/97609))
   * **内容**：安全修复。阻止策展人合并分支利用 `terminal` 工具集直接向 `.archive/` 移动文件，绕过了受保护的 `skill_manage(delete)` 迁移路径。
6. **#97615 [OPEN] feat(gateway): opt-in reaction-based busy acks** ([链接](https://github.com/NousResearch/hermes-agent/pull/97615))
   * **内容**：新增网关可选配置 `busy_ack_reaction`，启用后忙碌确认将从文本气泡变为模式感知的 emoji 反应，提升多平台交互体验。
7. **#97612 [CLOSED] Add `tencent/hy4-preview` to model pickers** ([链接](https://github.com/NousResearch/hermes-agent/pull/97612))
   * **内容**：在 OpenRouter 和 Nous Portal 模型选择器中添加腾讯 Hy4-preview 模型，并为其配置 1M 上下文窗口和推理支持。
8. **#96728 [OPEN] perf(desktop): progressively hydrate Bot Mode roster** ([链接](https://github.com/NousResearch/hermes-agent/pull/96728))
   * **内容**：Desktop 性能优化。Bot Mode 名单不再等待所有配置数据库扫描完成，而是先渲染有界快照实现即时可用，再轻量级拉取完整列表。
9. **#96721 [OPEN] perf(desktop): keep cached transcript visible while session resumes** ([链接](https://github.com/NousResearch/hermes-agent/pull/96721))
   * **内容**：Desktop 会话恢复期间，保持缓存的转录快照可见，避免在后台 hydration 和 `session.resume` 绑定时出现白屏或空编辑器。
10. **#97359 [OPEN] fix(desktop): route project session branches by owner** ([链接](https://github.com/NousResearch/hermes-agent/pull/97359))
    * **内容**：Desktop 项目分支路由修复。当父会话来自非默认配置文件的 Project 树时，Branch 能正确解析并读取该所有者配置下的会话。

---

### 5. 功能需求趋势
从近期 Issues 与 PRs 中提炼出社区最关注的三个功能方向：

*   **模型与上下文支持扩展**：社区对新模型（如 glm-5.3、Tencent Hy4）的上下文长度映射和适配需求迫切。同时，如何优化工具密集型场景下的自动压缩策略、防止上下文耗尽，是底层架构的核心痛点。
*   **Desktop 端体验与稳定性攻坚**：当前 Desktop 端是 Bug 和 PR 的高发区。社区重点关注渐进式加载（Bot Mode）、侧边栏快捷键交互（⌘⇧E）、附件预览增强，以及跨平台（特别是 Linux AMD 显卡）的 GPU 兼容性修复。
*   **语音与多模态交互闭环**：WebUI 端的移动端语音对话（Chrome Android Web Speech）和 Android STT 桥接正在快速推进，同时多模态场景下的插件上下文传递（图片轮次 context 保留）也暴露出亟待完善的需求。

---

### 6. 开发者关注点
开发者反馈中的核心痛点与高频需求主要集中在以下方面：

*   **配置安全与可靠性**：`hermes config set` 静默覆盖模型选择（#97579）和硬编码密钥白名单导致自定义 Provider 无法注入凭据（#97596），引发了开发者对配置写入原子性和企业级密钥管理灵活性的强烈担忧。
*   **上下文生命周期管理**：自动压缩机制在工具密集型会话中失效（#36624），以及多模态轮次插件上下文丢失（#71998），表明当前会话状态和上下文压缩的边界条件仍不够健壮，开发者期望更透明的上下文生命周期控制。
*   **安全边界与凭据脱敏**：MCP 测试输出泄露 Bearer 令牌片段（#97466）和策展人归档绕过风险（#97609），反映出开发者在工具调用和插件沙箱的安全边界设计上要求更严格的隔离与脱敏机制。

</details>