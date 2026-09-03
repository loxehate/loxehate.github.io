---
title: "AI CLI 工具社区动态日报"
published: 2026-09-03
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-03

> 生成时间: 2026-09-03 00:00 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Deepseek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# 2026-09-03 AI CLI 工具横向对比分析报告

---

## 1. 生态全景

主流 AI CLI 工具已进入**"企业级能力补全 + 桌面端稳定性攻坚"双线作战阶段**。一方面，managedMCP、context management、session takeover、provider-neutral runtime 等面向规模化部署的特性集中落地；另一方面，**Windows 桌面端几乎成为所有工具的最大痛点来源**（Claude Code、Codex、Reasonix 均爆发相关问题簇）。同时，**会话状态持久化与跨设备协作**正从锦上添花变为生产可用性的关键门槛。

---

## 2. 各工具活跃度对比

| 工具 | 今日 Issue 更新 | 今日 PR 更新 | Release 情况 | 整体节奏 |
|---|---|---|---|---|
| **Claude Code** | 10+ 高优先级 | 5（含 1 关闭） | v2.1.259（稳定） | 稳健迭代，企业特性强化 |
| **OpenAI Codex** | 35 | 50（含 10 高优） | rust-v0.153.0-alpha.5/6（24h 双发） | **极高密度，预发布冲刺中** |
| **Gemini CLI** | 47 | 45 | v0.59.0-nightly | 高活跃，安全/Agent 双向推进 |
| **DeepSeek Reasonix** | 23 | 29 | v1.36.0（稳定） | 大版本后修复密集 |
| **OpenCode** | 11 | 10 | v1.18.27（bugfix） | 修复驱动，快迭代 |
| **Deepseek Harness** | 0 | 0 | v0.1.2-alpha.5 | **静默期**，无社区动态 |
| **Hermes** | 4 | **50** | 无 | PR 密集，Issue 偏少 |

> **节奏观察**：Codex 与 Gemini CLI 处于"Issue+PR 双高"的高速迭代期；Hermes 呈现"PR 先行、Issue 滞后"的特征（大量修复已合入但问题反馈未同步）；Harness 进入静默蓄势期。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **🪟 Windows 桌面稳定性** | Claude Code、Codex、Reasonix | 进程锁、滚动抖动、面板状态丢失、WebView2 兼容、会话残留——已形成跨工具的系统性缺陷群 |
| **💾 会话持久化与数据安全** | Reasonix、Hermes、Codex | `data-loss` 标签激增，异步落盘、TurnDone 崩溃、跨 Profile 串写、SQLite inode 替换 |
| **🤖 多代理与上下文管理** | Claude Code、Codex、Reasonix | Opus 计费、Worktree 管理、Context Management 开关、Sticky Context Pinning |
| **🔌 MCP 生态成熟化** | Claude Code、Codex、OpenCode、Gemini | 懒加载、诊断脚本、RMCP OAuth、per-server 信任配置（替代 `insecure: true`） |
| **🛡️ 权限与安全模型透明化** | Claude Code、Gemini CLI | 静默降级、glob 静默失败、路径沙箱、NTFS SFN 绕过、ACL 校验 |
| **💰 计费透明度** | Claude Code、Codex、OpenCode | multi-agent 计费、Luna Reserve 异常、OMO 静默回退高费用模型 |
| **🌐 浏览器/Web 自动化** | Codex、Gemini CLI | Chrome bridge 检测、Browser agent Wayland 兼容、settings.json 覆盖 |
| **📥 会话导入导出** | OpenCode、Reasonix | CLI 管道截断、跨设备 resume、会话所有权模型 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 企业级 MCP 托管、无头 CI 场景、权限模型 | 大型企业、DevOps 团队 | **配置即治理**（`managedMcpServers`），强调组织级策略下发 |
| **OpenAI Codex** | 多代理协作、Worktree、Context Management、长会话可恢复 | ChatGPT Plus/Pro 开发者、重度用户 | **Rust 客户端 + 多后端**（ChatGPT、API、本地模型），预发布节奏激进 |
| **Gemini CLI** | Flash 模型选择器、AST-aware 代码理解、Browser Agent | 谷歌生态开发者、追求成本效率的团队 | **模型驱动 + 安全纵深防御**（沙箱/SFN/ACL/Seatbelt 多层加固） |
| **DeepSeek Reasonix** | 跨设备会话接管、粘性上下文、长文件读取 | 多设备切换的重度用户 | **lease 机制的协作式会话**（单写多读 + 双向同步） |
| **OpenCode** | 多 Provider 兼容、本地小模型、插件/MCP 安全 | 隐私敏感、本地优先的开发者 | **Provider-agnostic**，对协议层兼容性要求极高 |
| **Deepseek Harness** | 平滑升级、会话数据迁移 | 早期采用者 | 预发布期，**稳定性优先于功能** |
| **Hermes** | 多 Profile/多 Gateway、SQLite 状态机、Provider-neutral Runtime | VPS/家庭实验室多节点运维者 | **架构先行**（Gateway-owned authority、A2A 协议、Apple Container） |

---

## 5. 社区热度与成熟度

### 🔥 热度梯队

- **第一梯队（高活跃）**：**Codex**、**Gemini CLI**、**Claude Code**——Issue+PR 双高，社区反馈密集，Roadmap 透明。
- **第二梯队（迭代加速）**：**Reasonix**（v1.36 大版本后修复窗口期）、**OpenCode**（修复驱动型快迭代）。
- **第三梯队（架构演进）**：**Hermes**——50 条 PR 集中于多 Profile/多 Gateway 基础设施，Issue 数量低反映"问题已识别但尚未大量上报"。
- **静默期**：**Deepseek Harness**——进入版本打磨阶段，无新社区动态。

### 🎯 成熟度信号

| 成熟度指标 | 表现 | 代表工具 |
|---|---|---|
| **回归测试覆盖** | 不足 | Claude Code（#91622）、Codex（#41079） |
| **预发布质量** | 参差 | Harness 出现启动阻塞 vs Gemini CLI nightly 稳定 |
| **错误可观测性** | 弱→改善中 | Hermes P1 修复链（错误横幅指向自有恢复命令） |
| **跨平台一致性** | 显著短板 | Windows 在所有工具中均为痛点高地 |
| **企业级特性** | 加速落地 | managedMCP、Context Management、AgentRuntime 接缝 |

---

## 6. 值得关注的趋势信号

### 📡 趋势一：**AI CLI 进入"运行时可插拔"时代**
Codex 的 `Thread.environments` 暴露、OpenCode 的 Provider 兼容性、**Hermes 的 AgentRuntime v1 接缝**共同指向一个信号：**工具不再绑定单一 LLM 提供商**，跨主机对等派发（A2A 协议）与 profile-scoped runtime 注册正在成为下一代架构标配。

> **开发者参考**：评估工具时需关注其"运行时抽象"是否支持未来无缝切换模型/Provider。

### 📡 趋势二：**会话状态成为生产可用性的关键瓶颈**
Reasonix 出现 2 条 `data-loss` 标签，Hermes 围绕 SQLite 形成 8 条 P1 修复链，Codex 暴露 4 条历史/会话一致性问题。**异步落盘策略、inode 替换竞态、压缩期间心跳机制**等技术细节成为核心竞争力。

> **开发者参考**：选择工具时务必审查其持久化策略、崩溃恢复路径、跨设备同步机制。

### 📡 趋势三：**"静默失败"成为开发者最大的信任赤字**
Claude Code 的权限模式降级（`tengu_agentview_inherit_mode_demote`）、`--disallowedTools` 误匹配、** glob 排除；OpenCode 的 OMO 静默回退高费用模型；Codex 的自动重试无确认——**任何"对用户隐式"的行为变更都在被社区放大检视**。

> **开发者参考**：CI/批处理场景需显式禁用自动回退；权限/配额相关行为必须有可见的提示与审计日志。

### 📡 趋势四：**Windows 桌面端是当前最薄弱平台**
跨工具统计，Windows 相关 Issue 占比 30%-50%，覆盖进程管理、UI 渲染、WebView2 兼容、MSIX 部署。**这并非单点问题，而是 AI 桌面应用与传统桌面应用架构差异**（长寿命进程 + 频繁状态序列化 + 跨 Web/原生桥接）的系统性挑战。

> **开发者参考**：在 Windows 上部署 AI CLI 工具时，建议优先选择 CLI 模式或做好桌面端的可靠性兜底。

### 📡 趋势五：**MCP 从"能力扩展"走向"安全治理"**
v2.1.259 的 `managedMcpServers`、OpenCode 的 per-MCP 信任配置（指纹固定+caFile）、Gemini 的 RMCP OAuth 适配器——**MCP 生态正在从"能不能用"快速过渡到"如何安全地用"**。

> **开发者参考**：企业部署应优先采用受管 MCP 配置，禁用 `insecure: true` 类选项，建立证书信任清单。

### 📡 趋势六：**多代理协作从概念走向工程化**
Worktree 管理、外部事件唤醒、共享内存池（Hermes #377）、跨代理意图图、协作式会话接管——**多代理已从单点实验进入系统工程阶段**，但计费模型、状态一致性、调试可观测性仍是开放问题。

> **开发者参考**：多代理场景需提前规划工作区隔离、成本归因、子代理轨迹可观测性。

---

## 总结建议

| 角色 | 建议 |
|---|---|
| **企业技术决策者** | 优先评估 Claude Code（managedMCP）和 Hermes（多 Gateway 架构）；关注 **会话持久化策略**与**Windows 桌面 SLA** |
| **个人开发者** | Codex/Gemini CLI 的高频迭代值得持续跟进；OpenCode 适合**本地模型 + 多 Provider**场景；Harness 暂不建议生产 |
| **工具作者** | 重点投入**Windows 桌面稳定性**、**会话状态机设计**、**错误可观测性**、**运行时抽象层**——这是当前差距最大的四个方向 |
| **生态观察者** | 密切跟踪 Hermes AgentRuntime v1、A2A 协议、Codex Context Management——这些是下一代架构的早期信号 |

---

*报告基于 2026-09-03 各仓库公开数据生成，覆盖 Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenCode、Deepseek Harness、Hermes 共 7 个项目。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止：** 2026-09-03　**数据源：** github.com/anthropics/skills

---

## 一、热门 Skills 排行（按社区关注度）

> 说明：PR 评论数在数据中显示为 undefined，此处综合 👍 数、Issue 引用频次、相关 Issue 评论数综合排序。

| # | Skill (PR) | 核心功能 | 当前状态 | 热度来源 |
|---|---|---|---|---|
| 1 | **skill-creator 修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 始终报 0% recall 的 bug，含 Windows 兼容、并行 worker 修复 | OPEN | 关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 评论，7 👍） |
| 2 | **document-typography** [#514](https://github.com/anthropics/skills/pull/514) | 文档排版质量控制：孤词/寡行/编号错位修复 | OPEN | 解决"AI 生成文档排版丑"的普遍痛点 |
| 3 | **odt** [#486](https://github.com/anthropics/skills/pull/486) | OpenDocument 格式创建、模板填充、ODT↔HTML 解析 | OPEN | 补齐 LibreOffice/ODF 开源文档栈 |
| 4 | **frontend-design 改进** [#210](https://github.com/anthropics/skills/pull/210) | 提升 frontend-design skill 的清晰度与可执行性 | OPEN | 早期提交，迭代时间长（2026-01 起） |
| 5 | **skill-quality-analyzer / skill-security-analyzer** [#83](https://github.com/anthropics/skills/pull/83) | Skills 质量五维评估 + 安全审计元技能 | OPEN | 对应社区 [Issue #492 安全问题](https://github.com/anthropics/skills/issues/492)（43 评论，最高热度） |
| 6 | **Hivemind 多 Agent 编排** [#1628](https://github.com/anthropics/skills/pull/1628) | 用免费模型 headless worker 委派机械任务，Claude Code 专注规划/审核 | OPEN | 2026-08 新晋热门，"零成本多 Agent" 概念 |
| 7 | **scnet-hpc** [#1615](https://github.com/anthropics/skills/pull/1615) | SCNet 集群 SSH/Slurm 工作流（分区/内存/加速器感知） | OPEN | 填补 HPC 领域空白 |
| 8 | **testing-patterns** [#723](https://github.com/anthropics/skills/pull/723) | 完整测试栈：Testing Trophy 哲学、单元/组件/E2E | OPEN | 开发者高频需求 |

---

## 二、社区需求趋势（来自 Issues 16 条）

### 🔥 最强诉求

1. **🔒 安全与信任边界** — [Issue #492](https://github.com/anthropics/skills/issues/492)（43 评论，最高热度）
   社区 Skill 挂靠 `anthropic/` 命名空间造成冒名顶替风险，急需**官方审核机制 + 命名空间隔离**。

2. **🏢 组织级共享** — [Issue #228](https://github.com/anthropics/skills/issues/228)（16 评论，8 👍）
   期待 Skills 在企业内一键共享，替代当前的 `.skill` 文件手动分发流程。

3. **🐛 评估工具链失灵** — [Issue #556](https://github.com/anthropics/skills/issues/556)（12 评论，7 👍）
   `run_eval.py` 触发率 0%，导致描述优化在噪声上跑，直接影响所有 Skill 质量。

4. **💾 上下文窗口治理** — [Issue #1487](https://github.com/anthropics/skills/issues/1487)
   `claude-api` skill 一次性注入 156k token，触发**懒加载/分片机制**诉求。

### 📈 方向性趋势

| 方向 | 代表 Issue |
|---|---|
| **测试 / 质量门禁** | [#1385 Reasoning Quality Gate](https://github.com/anthropics/skills/issues/1385)、[#202 skill-creator 重构](https://github.com/anthropics/skills/issues/202) |
| **Agent 治理 / 安全** | [#412 agent-governance](https://github.com/anthropics/skills/issues/412)、[#1175 SharePoint 权限](https://github.com/anthropics/skills/issues/1175) |
| **多 Agent / 编排** | [#1329 compact-memory](https://github.com/anthropics/skills/issues/1329)、[#16 Skills 即 MCP](https://github.com/anthropics/skills/issues/16) |
| **平台兼容 / 集成** | [#29 Bedrock](https://github.com/anthropics/skills/issues/29)、[#189 插件重复](https://github.com/anthropics/skills/issues/189) |
| **文档处理健壮性** | [#12 docx 空白重排](https://github.com/anthropics/skills/issues/12) |

---

## 三、高潜力待合并 Skills（活跃但 OPEN）

| PR | Skill | 亮点 | 状态 |
|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评估修复 | 阻塞描述优化全链路，10+ 复现 | OPEN，2+ 月未合 |
| [#83](https://github.com/anthropics/skills/pull/83) | skill-quality/security-analyzer | 直击安全信任痛点 | OPEN，10 月仍未合 |
| [#1628](https://github.com/anthropics/skills/pull/1628) | Hivemind 零成本多 Agent | 节省昂贵模型上下文，概念新 | OPEN，新提交 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit 四维质量门禁 | 与 Issue #1385 提案呼应 | OPEN |
| [#568](https://github.com/anthropics/skills/pull/568) | ServiceNow 平台技能 | 企业 ITSM/SecOps 大覆盖面 | OPEN，迭代中 |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel 复古游戏开发 | 创意编程垂直场景 | OPEN |
| [#1595](https://github.com/anthropics/skills/pull/1595) | UIZZE 反 UI 模板化 | Partner Skills 引入 | OPEN |
| [#509](https://github.com/anthropics/skills/pull/509) | CONTRIBUTING.md | 修复社区健康指标（25%） | OPEN，门槛低易合 |

---

## 四、Skills 生态洞察

> **社区最集中的诉求是「让 Skills 生态本身可被信任、可被评估、可被治理」**——安全命名空间、评估流水线修复、上下文治理、组织级共享四件事占据了 70% 以上的高评论 Issues，Skills 数量增长已让"质量与安全基建"取代"功能扩展"成为下一阶段焦点。

---

*报告生成基于 anthropics/skills 公开数据。注：原始数据中 PR 评论数字段为 undefined，排行综合了 Issue 引用、👍 数、PR 时长与合并紧迫度。*

---

# Claude Code 社区动态日报

**日期：2026-09-03**

---

## 📌 今日速览

v2.1.259 版本发布，重点带来企业级 MCP 服务托管能力（`managedMcpServers`）和无头场景支持（`--permission-prompts none`）。社区焦点集中在 **Windows Desktop 平台的进程锁与启动故障**——过去 24 小时多个高优先级 bug 被重新激活，涉及 MSIX 部署、孤儿进程、权限降级等系统性缺陷；同时 Linux 平台在大目录场景下的性能问题（NFS 阻塞、FileIndex 41 秒卡顿）也成为新热点。

---

## 🚀 版本发布

### [v2.1.259](https://github.com/anthropics/claude-code/releases/tag/v2.1.259)

**核心更新：**

| 类别 | 变更 |
|---|---|
| **企业 MCP 托管** | 新增 `managedMcpServers` 管理设置：组织可为所有用户下发 HTTP/SSE MCP 服务器，配置格式与 `.mcp.json` 一致；命令型条目会被自动跳过。 |
| **无头模式支持** | 新增 `--permission-prompts none` 标志，可抑制所有权限提示，专为无人值守的头less 主机场景设计。 |

---

## 🔥 社区热点 Issues（Top 10）

### 1. [#42776](https://github.com/anthropics/claude-code/issues/42776) ⭐ 148 评论 / 72 👍
**Windows Desktop 重启失败——孤儿进程文件锁**
- 标签：`[invalid]` `[BUG]`
- **重要性**：社区讨论度第一，长期未解决。Windows 用户在 Claude Code Desktop 崩溃后无法重新启动，需重启或注销系统。根因疑似孤儿进程未释放文件锁。
- **社区反应**：尽管被标记为 invalid，72 个点赞和 148 条评论表明 Windows 平台用户对该问题强烈不满。

### 2. [#85891](https://github.com/anthropics/claude-code/issues/85891) ⭐ 63 评论 / 143 👍
**Windows 11 Desktop 窗口始终置顶（Always-on-Top）**
- **重要性**：点赞数最高的 issue（143 👍）。用户认为"始终置顶"行为严重影响多任务工作流，且无任何应用内设置可关闭。
- **社区反应**：是 #66516 的 Windows 对应版本，跨平台一致性问题引发用户对产品设计决策的质疑。

### 3. [#53247](https://github.com/anthropics/claude-code/issues/53247) ⭐ 50 评论 / 22 👍
**Windows Desktop 启动失败——Silo / Job Object 残留**
- **重要性**：技术细节详尽（HRESULT 0x80070020, EventID 215/208），与 #42776 可能为同一根因。
- **社区反应**：用户已自行深度调试并定位到 AppModel-Runtime 层面，呼吁官方关注。

### 4. [#73597](https://github.com/anthropics/claude-code/issues/73597) ⭐ 17 评论
**Opus subagents 被错误计费为 Fable**（已关闭）
- **重要性**：涉及计费准确性，是企业用户高度关注的核心议题。
- **社区反应**：虽已关闭，但反映了 multi-agent 架构下计费模型的不透明性。

### 5. [#80286](https://github.com/anthropics/claude-code/issues/80286) ⭐ 6 评论
**Windows MSIX 部署后启动失败**
- **重要性**：影响 Microsoft Store 分发渠道，"Another program is currently using this file" 错误在服务重启、AppX 重新注册后依然存在，只能重启系统恢复。
- **社区反应**：影响企业 IT 部署流程，3 个点赞虽不多，但语义严重。

### 6. [#89911](https://github.com/anthropics/claude-code/issues/89911) ⭐ 5 评论
**权限模式静默降级——agents-view spawn 与 /fork**
- **重要性**：揭示了一个**有意为之但缺乏文档**的服务端开关（`tengu_agentview_inherit_mode_demote`），导致 plan 模式被降级为 auto，实际变得更宽松（更危险）。
- **社区反应**：安全相关问题，开发者社区对"静默降级"行为表达担忧。

### 7. [#91528](https://github.com/anthropics/claude-code/issues/91528) ⭐ 2 评论（今日新建）
**Desktop 应用崩溃/中断更新后会话侧边栏损坏**
- **重要性**：今日新报，与 #76430 可能同根因。projects 全部重置为 "Other"，会话合并、标题丢失。
- **社区反应**：早期阶段，但与 Windows Desktop 稳定性问题一脉相承。

### 8. [#91622](https://github.com/anthropics/claude-code/issues/91622) ⭐ 2 👍
**Cowork (Windows) MCP workspace bash 调用被拒——回归 bug**
- **重要性**：自 Claude Desktop 1.44121.1 / Claude Code 2.1.258 起出现，`--disallowedTools Bash` 通过 toolAliases 误匹配 workspace shell。
- **社区反应**：典型的回归 bug，影响企业协作场景。

### 9. [#91633](https://github.com/anthropics/claude-code/issues/91633) ⭐ 1 评论（今日新建）
**启动时 FileIndex 在大目录下阻塞事件循环 ~41 秒**
- **重要性**：Linux 用户在 home 目录（~65k 文件）下遭遇严重启动延迟。已排除 NFS 因素，定位到 FileIndex 模块。
- **社区反应**：与 #91634 共同构成 Linux 平台性能问题的姊妹篇。

### 10. [#91648](https://github.com/anthropics/claude-code/issues/91648) ⭐ 1 评论（今日新建）
**Windows：两次 Bash 工具调用永不返回，主会话死锁 53 分钟**
- **重要性**：会话完全冻结，所有用户输入与 agent 完成事件排队等待，缺少超时机制。
- **社区反应**：极严重的稳定性缺陷，可能造成用户数据丢失。

---

## 🛠️ 重要 PR 进展（Top 5）

> 注：过去 24 小时仅有 5 个 PR 更新，其中 1 个为关闭状态。以下为关键 PR 摘要。

### 1. [#41938](https://github.com/anthropics/claude-code/pull/41938) — [CLOSED]
**为 DevContainer 启动添加 Linux/macOS Bash 脚本**
- 此前仅有 Windows PowerShell 脚本，限制跨平台开发体验。Linux/macOS 脚本补齐了缺口。

### 2. [#87079](https://github.com/anthropics/claude-code/pull/87079) — [OPEN]
**修复 `**` glob 模式不匹配零深度路径的安全缺陷**
- 重要性：🔒 **安全相关**。`security-patterns.json` 中的 `**/*.ts` 会静默排除顶层文件，与文档承诺不符。在安全规则场景下属于"静默失败"，风险较高。

### 3. [#86537](https://github.com/anthropics/claude-code/pull/86537) — [OPEN]
**修复 CHANGELOG.md 中的重复字（"to to"）**
- 1.0.124 版本 `CLAUDE_BASH_NO_LOGIN` 条目的文档错字修正。文档型 PR。

### 4. [#61691](https://github.com/anthropics/claude-code/pull/61691) — [OPEN]
**为 GitHub 连接器"显示已连接但无工具"问题添加诊断脚本**
- 解决 Cowork 中反复出现的 GitHub MCP "Connected" 但暴露 0 工具的问题。提供 PowerShell 诊断/修复脚本，关闭 #61682。

### 5. [#20448](https://github.com/anthropics/claude-code/pull/20448) — [OPEN]
**添加 web4-governance 插件（T3 信任张量 + R6 审计工作流）**
- 第三方贡献的 AI 治理插件，强调密码学可追溯性与可验证问责制。

---

## 📊 功能需求趋势

从过去 24 小时的 Issue 数据中提炼出社区最关注的 6 大方向：

| 方向 | 代表 Issue | 社区诉求 |
|---|---|---|
| **🪟 Windows Desktop 稳定性** | #42776, #85891, #53247, #80286, #91528, #91648 | 进程锁、孤儿进程、置顶窗口、MSIX 部署——Windows 已是最大痛点平台 |
| **🐧 Linux 大目录性能** | #91633, #91634, #77783 | FileIndex、NFS watcher、API 流死锁——企业级部署场景下性能瓶颈 |
| **🔐 权限与安全模型** | #89911, #87079 | 权限静默降级、glob 安全规则静默失败——开发者对"隐性变更"敏感 |
| **💰 计费透明度** | #73597, #68379 | multi-agent 计费、跨平台配额差异——企业用户核心关切 |
| **🧩 MCP 体验** | #63251, #61691, #91654 | 懒加载、连接器诊断、Microsoft 365 scope 缺失 |
| **🎨 UI/UX 自定义** | #63020, #83260, #77041 | 自定义背景、删除单条消息、主题 token 细化 |

---

## 💬 开发者关注点

### 🔴 高频痛点

1. **Windows 是当前最薄弱平台**：6 个高优先级 bug 集中在 Windows Desktop，覆盖启动、进程管理、UI 行为、更新损坏——已形成系统性缺陷群。
2. **回归测试覆盖不足**：#91622、#42776 等问题显示版本升级引入破坏性变更（权限匹配、文件锁释放），CI 中缺乏端到端守护测试。
3. **静默失败模式**：`--disallowedTools` 通过 toolAliases 误匹配（#91622）、`**` glob 排除顶层文件（#87079）、权限模式降级（#89911）——开发者社区对"行为未明确说明"高度敏感。

### 🟢 高频需求

1. **企业级 MCP 托管能力**（v2.1.259 已部分回应），但 #63251 的"懒加载"诉求尚未满足。
2. **无头/CI 场景稳定性**（v2.1.259 新增 `--permission-prompts none`，但 #77783 揭示 API 流死锁仍无超时保护）。
3. **可观测性工具**：#61691 的诊断脚本反映出开发者渴望官方提供更系统的故障排查工具链。

---

*报告基于 GitHub 上 anthropics/claude-code 仓库 2026-09-02 至 2026-09-03 的公开数据。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-09-03**

---

## 📌 今日速览

今日 Codex 社区围绕 **Windows 桌面端稳定性** 和 **配额/计费异常** 两大议题持续发酵，单日内即有 35 条 Issue 更新、50 个 PR 合并，节奏密集。Rust 侧在 24 小时内连发 `v0.153.0-alpha.5` 与 `v0.153.0-alpha.6` 两个预发布版本，迭代频率显著加快，预示着 0.153 正式版临近。功能层面，**Context Management 实验开关**、**Luna Reserve 配额回退**、**Worktree 管理** 等多项面向多代理与高负载场景的能力进入主干。

---

## 🚀 版本发布

| 版本 | 类型 | 说明 |
|---|---|---|
| [rust-v0.153.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.5) | 预发布 | 0.153 系列第 5 个 alpha |
| [rust-v0.153.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.6) | 预发布 | 0.153 系列第 6 个 alpha，间隔不足 24h |

> 建议持续关注 alpha 频道以跟进即将到来的 0.153 稳定版。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#41463 Windows + WSL 无法创建项目（AbsolutePathBuf 反序列化失败）](https://github.com/openai/codex/issues/41463)** — 19 评论 / 10 👍
   Windows + WSL2 用户在 Codex Desktop 上无法新建项目，根因是路径反序列化丢失基路径。热度最高，反映 Windows/WSL 组合是高频开发场景，亟需修复。

2. **[#41513 桌面宠物（Pets）变 click-through 无法拖拽](https://github.com/openai/codex/issues/41513)** — 18 评论 / 6 👍
   内置宠物 Codey 与自定义宠物均出现"透明点击"问题，影响 Windows 桌面端体验，且在两个版本上均可复现。

3. **[#41079 Windows 分页会话历史卡死](https://github.com/openai/codex/issues/41079)** — 18 评论 / 1 👍
   Rollout JSONL 数据完整，但分页投影停留在旧快照，是典型的"本地状态未跟随真实日志"问题。

4. **[#32069 隐藏 Pets 菜单 + 提示词润色可配置](https://github.com/openai/codex/issues/32069)** — 14 评论 / 16 👍
   👍 赞数最高的 Issue，反映 Pets 功能口碑分化严重，社区希望提供隐藏入口与更强的提示词控制。

5. **[#41220 配额异常消耗与计量不一致（跨报告追踪）](https://github.com/openai/codex/issues/41220)** — 14 评论 / 8 👍
   Meta Issue：大量用户反馈订阅额度异常消耗，已被官方承认为跨报告追踪项，是当前最受关注的计费/信任问题。

6. **[#39989 Windows 桌面重启后 Recents 中残留已删会话](https://github.com/openai/codex/issues/39989)** — 13 评论 / 1 👍
   全量重启后仍保留已删除 ChatGPT 会话，属于会话生命周期管理 Bug。

7. **[#39897 macOS 桌面删除会话仍残留侧栏](https://github.com/openai/codex/issues/39897)** — 12 评论 / 2 👍
   与 #39989 同类问题，覆盖 macOS 端，影响 ChatGPT Plus 用户。

8. **[#41399 macOS 全量重置后侧栏仍残留](https://github.com/openai/codex/issues/41399)** — 8 评论 / 10 👍
   即便执行"完整本地 profile 重置"也无效，问题可能在服务端，点赞比高说明修复呼声强烈。

9. **[#42263 新建对话页无法切换 Codex/搜索/临时对话](https://github.com/openai/codex/issues/42263)** — 5 评论 / 1 👍
   Windows 26.831.21537 首次启动时顶部 Tab 无响应，影响核心导航功能。

10. **[#37307 Chrome 插件可用但 Codex browser bridge 报 "Browser is not available: chrome"](https://github.com/openai/codex/issues/37307)** — 5 评论 / 2 👍
    CLI 与浏览器扩展联动存在检测问题，影响自动化代理工作流。

---

## 🛠 重要 PR 进展（Top 10）

1. **[#42391 在执行器路径上下文中授权 `apply_patch`](https://github.com/openai/codex/pull/42391)** — 修复补丁目标路径与宿主路径规范不一致导致的权限误判，提升跨平台 patch 可靠性。

2. **[#42388 配置失败后恢复延后环境](https://github.com/openai/codex/pull/42388)** — 允许后续合法 Ready 报告替换失败状态，将 provisioning failure 视为可重试，提高环境弹性。

3. **[#42386 暴露 app-server 响应中的线程环境](https://github.com/openai/codex/pull/42386)** — 新增实验字段 `Thread.environments`（ID / cwd / 工作区根），方便外部客户端可视化代理执行环境。

4. **[#42385 新增实验性 Context Management 开关](https://github.com/openai/codex/pull/42385)** — 为 ChatGPT Plus/Pro/Pro Lite 的 Codex 后端启用 token 预算、history notes 与上下文压缩能力。

5. **[#42384 新增 RMCP OAuth 凭证存储适配器](https://github.com/openai/codex/pull/42384)** — 把 RMCP 刷新映射到 Codex 的固定 OAuth 后端，并强制刷新事务保护。

6. **[#42383 升级 rmcp 至 3.2.0](https://github.com/openai/codex/pull/42383)** — 依赖同步，刷新 Cargo 与 Bazel lockfile。

7. **[#42381 支持 Windows 上的托管 app-server 生命周期](https://github.com/openai/codex/pull/42381)** — 补齐 Windows 端 daemon 启停能力，并以 Job Object 失败时给出清晰报错。

8. **[#42380 安全缓冲重试前需用户确认](https://github.com/openai/codex/pull/42380)** — 回退到更小模型前显示提示，避免自动重试造成用户预期外的成本与能力下降。

9. **[#42378 通过规范 JSON 解码读取 rollout](https://github.com/openai/codex/pull/42378)** — 修复嵌套十进制值导致的反序列化失败，恢复受影响分页会话的续接。

10. **[#42377 让 app-server 实时会话始终可用](https://github.com/openai/codex/pull/42377)** — 移除每次会话的 realtime 特性检查，`features.realtime_conversation` 设为兼容项，进一步收敛配置面。

> 其他值得关注的：[**#42385 Context Management**](https://github.com/openai/codex/pull/42385)、[**#42372 Luna Reserve 用量回退到 TUI**](https://github.com/openai/codex/pull/42372)、[**#42366 列出仓库托管 worktree**](https://github.com/openai/codex/pull/42366)、[**#42358 扩展速率限制读能力（含 Luna Reserve）**](https://github.com/openai/codex/pull/42358)、[**#42369 让 SQLite 历史投影越过非法记录**](https://github.com/openai/codex/pull/42369)。

---

## 📈 功能需求趋势

从近 30 条更新 Issue 中可归纳出五大方向：

- **🪟 Windows 桌面体验稳定性**：WSL 路径、ARM64 启动、sandbox 卸载、Pets、Tab 切换、Recents 残留等问题集中爆发，是当之无愧的"焦点战场"。
- **💸 配额/计费透明度**：除 Meta Issue #41220 外，还出现 #42224 等具体场景，开发者与重度用户对"Luna Reserve 启用后额度消耗过快"普遍焦虑。
- **🤖 多代理协作与 Worktree 管理**：#33556（外部事件唤醒会话）、#36719（跨代理意图图）、PR #42366（列出托管 worktree）共同指向"多代理协同"成为下一阶段主线。
- **🌐 网络与连接性增强**：#27381（强制 HTTPS）持续被关注，反映企业代理/VPN 环境仍是痛点。
- **🧠 上下文与长会话能力**：PR #42385（Context Management）、#42386（暴露环境）、#42378（rollout 解码）共同支撑"长上下文 + 多轮次会话"的可恢复性。

---

## 👨‍💻 开发者关注点

1. **路径与权限**：跨平台（尤其 WSL2）路径解析是当前最大失败源，#41463、#29049（沙箱阻塞自身二进制）均反映此问题。
2. **会话/历史一致性**：本地 SQLite 投影、rollout 文件轮转、删除会话残留**三件套**频繁出现（#41079/#39989/#39897/#41399/#42387）。
3. **配意外行为**：自动重试、模型回退、自动 reset 等"对用户隐式"的行为正在被讨论（#42380 引入确认即回应）。
4. **浏览器/MCP 自动化集成**：CLI 与 Chrome 插件、RMCP OAuth 凭证链路仍有断点（#37307、#42384）。
5. **桌面 UI 小问题积累**：粘贴截断（#39526）、时区推断语言（#42389）、拖拽失效（#42382）、侧栏追问遮挡文本（#42379）等"低门槛高密度"反馈增多，提示桌面端需要一轮系统性的可用性打磨。

---

*日报基于 GitHub 公开数据自动汇总，欢迎转发与讨论。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期：2026-09-03**

---

## 📌 今日速览

Gemini CLI 仓库今日活跃度保持高位，过去 24 小时共有 47 个 Issue 与 45 个 PR 更新。社区关注焦点集中在 **Agent 行为可靠性**（子代理恢复、挂起、Skill 调用）和 **平台安全加固**（路径沙箱、ACL 校验、NTFS SFN 缓解）两大方向。同时，3.6/3.7/3.8 Flash 模型选择器支持工作正在推进，#29172 PR 拟将 3.8 Flash 设为默认 Flash 模型。

---

## 🚀 版本发布

- **v0.59.0-nightly.20250902.g4963a4456** 已发布
  - 改进 web fetch 工具中的目标验证与连接路由（[@diegogodinezr](https://github.com/diegogodinezr)，PR [#29120](https://github.com/google-gemini/gemini-cli/pull/29120)）
  - 欢迎新贡献者 [@diegogodinezr](https://github.com/diegogodinezr)

---

## 🔥 社区热点 Issues

| # | Issue | 重要性 | 链接 |
|---|------|------|------|
| 1 | **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** 子代理在 `MAX_TURNS` 后误报为 GOAL 成功（P1 · 13 评论）<br>直接影响用户对任务执行结果的信任度，遮蔽了真实中断状态。 | ⭐⭐⭐⭐⭐ |
| 2 | **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 频繁挂起（P1 · 8 评论 · 👍8）<br>社区反应强烈，影响几乎所有 defer-to-subagent 的场景。 | ⭐⭐⭐⭐⭐ |
| 3 | **[#29164](https://github.com/google-gemini/gemini-cli/issues/29164)** 3.6/3.7 Flash 模型仍不可选（P1 · 5 评论 · 👍9）<br>用户迫切期待新模型上线，与 PR #29172 推进形成共振。 | ⭐⭐⭐⭐⭐ |
| 4 | **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** 评估 AST 感知文件读取/搜索/映射价值（P2 · 7 评论）<br>系统性 EPIC，决定未来 codebase_investigator 与 token 效率走向。 | ⭐⭐⭐⭐ |
| 5 | **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** Gemini 很少主动调用 Skills 与子代理（P2 · 6 评论）<br>反映 Agent 主动调用能力不足，是 prompt 调优核心痛点。 | ⭐⭐⭐⭐ |
| 6 | **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** Auto Memory 缺乏确定性脱敏（P2 · 5 评论）<br>涉及本地转录内容上传至模型的安全合规问题。 | ⭐⭐⭐⭐ |
| 7 | **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** Shell 命令完成后卡在"等待输入"（P1 · 4 评论 · 👍3）<br>高频出现的卡死问题，影响交互体验。 | ⭐⭐⭐⭐ |
| 8 | **[#29045](https://github.com/google-gemini/gemini-cli/issues/29045)** `read-many-files` 子串误匹配二进制资产（P1 · 4 评论）<br>glob 字符串匹配缺陷，可能内联未请求的图片，存在资源浪费与潜在信息泄露风险。 | ⭐⭐⭐⭐ |
| 9 | **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)** browser_agent 失败快速策略过严（P3 · 4 评论）<br>需引入自动会话接管与锁恢复机制。 | ⭐⭐⭐ |
| 10 | **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** browser 子代理在 Wayland 失败（P1 · 4 评论）<br>Linux 桌面用户核心场景，社区反复报告。 | ⭐⭐⭐ |

---

## 🛠️ 重要 PR 进展

| PR | 说明 | 链接 |
|---|------|------|
| **[#29172](https://github.com/google-gemini/gemini-cli/pull/29172)** | 注册 3.5/3.6/3.7/3.8 Flash 模型，并将 **3.8 Flash 设为默认 Flash 模型**。回应 #29164，社区期待已久。 | [@mr8lu](https://github.com/mr8lu) |
| **[#29170](https://github.com/google-gemini/gemini-cli/pull/29170)** | 强化 workspace 路径边界检查与符号链接解析（POSIX + Windows），提升命令安全启发式的稳健性。 | [@jesussamuel-byte](https://github.com/jesussamuel-byte) |
| **[#29115](https://github.com/google-gemini/gemini-cli/pull/29115)** | 在加载系统级配置前强制进行文件所有权与 ACL 校验，防范恶意配置劫持。 | [@jesussamuel-byte](https://github.com/jesussamuel-byte) |
| **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116)** | 缓解 NTFS 8.3 短文件名（SFN）的路径遍历与黑名单绕过。 | [@urielefrenvirtusa](https://github.com/urielefrenvirtusa) |
| **[#29171](https://github.com/google-gemini/gemini-cli/pull/29171)** | 为 macOS Seatbelt 沙箱隔离独立临时目录，避免沙箱进程共享宿主 tmp 空间。 | [@jvargassanchez-dot](https://github.com/jvargassanchez-dot) |
| **[#29169](https://github.com/google-gemini/gemini-cli/pull/29169)** | 扩展加载器：强化路径解析与目录边界校验，防止 context 文件与 plan 目录逃逸。 | [@diegogodinezr](https://github.com/diegogodinezr) |
| **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163)** | 修复在受限权限环境（如 macOS Seatbelt）中 git 仓库启动时的崩溃问题。 | [@ehsan-fj](https://github.com/ehsan-fj) |
| **[#29158](https://github.com/google-gemini/gemini-cli/pull/29158)** | 清理 chrome-devtools-mcp 中硬编码的 Google CrUX API Key，防止凭据泄露。 | [@amelidev](https://github.com/amelidev) |
| **[#29098](https://github.com/google-gemini/gemini-cli/pull/29098)** | 修复 `useInputHistoryStore` 中嵌套 setState 的不纯更新器，遵循 React Strict Mode。 | [@Eswar809](https://github.com/Eswar809) |
| **[#28863](https://github.com/google-gemini/gemini-cli/pull/28863)** | 扩展更新时强制用户同意环境变更，并清理运行时环境变量，防止 MCP 子进程被注入未授权变量。 | [@amelidev](https://github.com/amelidev) |

> 其他值得关注的已合并/关闭 PR：#29138（README 精简）、#29117（实现 RFC 9207 MCP OAuth issuer 校验）、#29166（扩展更新前自动备份以支持回滚）、#29156（停止将用户 git config 指向 /dev/null）。

---

## 📈 功能需求趋势

从 Issues 与 PR 分布看，社区最关注的五大方向：

1. **🤖 Agent 可靠性** —— 子代理挂起、错误终止状态（GOAL 误报）、Skill 自动调用不足是最高频反馈。
2. **🛡️ 安全与沙箱加固** —— 路径遍历、SFN 绕过、ACL 校验、Seatbelt 隔离、硬编码凭据清理，PR 数量密集。
3. **🧠 新模型上线** —— 用户对 3.6/3.7 Flash 长期等待，#29172 的合并将结束这一缺口。
4. **🌐 Browser Agent 体验** —— Wayland 兼容性、settings.json 覆盖忽略、锁恢复成为集中痛点。
5. **📊 AST-aware 代码理解** —— #22745 系列 Epic 推动 codebase_investigator 与 token 效率升级。

---

## 👨‍💻 开发者关注点

- **Agent 行为可观测性差**：子代理轨迹缺乏上下文（#21763、#22598），Bug 报告不含 subagent 状态，问题定位困难。
- **大工具集触发 400**：超过 128 个工具即报错（#24246），需更智能的 scope 限制。
- **破坏性命令失控**：模型偶发使用 `git reset --force` 等危险命令（#22672），期望强化行为护栏。
- **临时文件污染工作区**：模型倾向在随机目录写脚本（#23571），影响 clean commit。
- **Web 平台差异**：Wayland / Vite 交互式 prompt / 终端 resize 闪烁（#21924、#21983、#22465）等环境适配问题集中暴露。

---

*日报基于 [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) 仓库过去 24 小时数据生成。*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报

**日期：2026-09-03**

---

## 一、今日速览

v1.36.0 正式版昨日集中合并上线，**粘性上下文文件固定（Sticky Context Pinning）**、**跨设备协作式会话接管（Session Takeover）**、以及**长文件读取强制完成**三大特性同步落地 CLI 与桌面端。伴随新版本发布，社区集中爆发了**桌面端 TUI 滚动抖动**（#9726 / #9728 / #9730 / #9732 / #9703）和**会话持久化/数据丢失**（#9719 / #9729 / #9477）两类高优先级问题，开发者反馈窗口的 UX 一致性与崩溃恢复成为当下焦点。

---

## 二、版本发布

### 🎉 v1.36.0（稳定版） — Reasonix CLI & Desktop

| 维度 | 内容 |
|------|------|
| **核心新特性** | ① 桌面端新增**粘性上下文文件固定**：会话级 pinned workspace files，以确定性 append-only 的 user-role revisions 投递到下一轮<br>② 桌面端 + CLI 新增**协作式会话接管**：通过 lease 机制保证单写多读，支持正向/反向租约交接（#9692）<br>③ **强制完成长文件读取**，杜绝中途截断 |
| **可靠性** | 大量 CLI/桌面端稳定性与性能修复（如 #9721 修复普通点击引发的会话回跳） |
| **完整日志** | [English](https://reasonix.io/changelog/v1.36.0/?lang=en) · [网页版](https://reasonix.io/changelog/v1.36.0/) |

---

## 三、社区热点 Issues（Top 10）

| # | 标题 | 状态 | 重要性 |
|---|------|------|--------|
| [#9729](https://github.com/esengine/DeepSeek-Reasonix/issues/9729) | **【数据丢失】** 切回正在回答的会话提示"无法打开"，重启后今日问答内容丢失 | OPEN | 🔴 **Critical**。标记 `data-loss`，影响 1.35.0 用户核心场景。 |
| [#9719](https://github.com/esengine/DeepSeek-Reasonix/issues/9719) | **【数据丢失】** 会话持久化缺陷：仅 `TurnDone` 异步保存，长对话中间状态与版本更新时数据丢失 | OPEN | 🔴 **Critical**。系统性架构问题，社区已提出 #9731 修复 PR。 |
| [#9726](https://github.com/esengine/DeepSeek-Reasonix/issues/9726) | 生成回答时会话滚动抖动/跳动，Win11 | OPEN | 🟠 高优。1.35.0 在 Win 平台复现率极高，已关联 #9721 修复。 |
| [#9728](https://github.com/esengine/DeepSeek-Reasonix/issues/9728) | 聊天窗口滚动鼠标点击触发跳跃 | OPEN | 🟠 高优。与 #9726 同源（WebView2/Virtuoso 锚点问题）。 |
| [#9477](https://github.com/esengine/DeepSeek-Reasonix/issues/9477) | **【Enhancement】** `resume` 找不到其他设备的会话历史 | CLOSED | 🟢 已通过 **#9692 会话接管** 闭环解决，闭环典型范本。 |
| [#9732](https://github.com/esengine/DeepSeek-Reasonix/issues/9732) | 对话框右侧滚动条乱跑 | OPEN | 🟠 Win10 复现，与 #9726 同一根因簇。 |
| [#9739](https://github.com/esengine/DeepSeek-Reasonix/issues/9739) | 计划步骤强制要求 todo 才能 `git commit`，工具调用不够纯粹 | OPEN | 🟡 设计争议。涉及 agent 编排哲学，社区 vs dsh 对比。 |
| [#9740](https://github.com/esengine/DeepSeek-Reasonix/issues/9740) | 自定义定时任务无法创建/保存 | OPEN | 🟡 v1.36.0 新发回归，需重点验证。 |
| [#9722](https://github.com/esengine/DeepSeek-Reasonix/issues/9722) | 桌面端文件预览面板最小化恢复后宽度被重置 | CLOSED | 🟢 已闭环（区分于 #5927 zoom ratio 缺陷）。 |
| [#9660](https://github.com/esengine/DeepSeek-Reasonix/issues/9660) | v1.34 桌面端空闲占用 CPU 10% | OPEN | 🟡 能耗问题，与 #9731 去轮询修复方向一致。 |

---

## 四、重要 PR 进展（Top 10）

| PR | 标题 | 状态 | 价值 |
|----|------|------|------|
| [#9692](https://github.com/esengine/DeepSeek-Reasonix/pull/9692) | **会话接管：协作式移交与取回** | ✅ CLOSED | 闭环 #9477，v1.36 旗舰特性，单写多读 + lease 双向同步。 |
| [#9689](https://github.com/esengine/DeepSeek-Reasonix/pull/9689) | **feat(desktop): 粘性上下文文件固定** | ✅ CLOSED | v1.36 旗舰特性，session-scoped pinning，append-only revision 投递。 |
| [#9731](https://github.com/esengine/DeepSeek-Reasonix/pull/9731) | **fix(desktop): 减少空闲轮询 + 转录 checkpoint** | 🟢 OPEN | 同时闭环 #9539 与 **#9719 数据丢失**，修复路径清晰。 |
| [#9721](https://github.com/esengine/DeepSeek-Reasonix/pull/9721) | **fix(desktop): 保留普通点击时的转录锚点** | ✅ CLOSED | 直接闭环 #9726/#9728/#9730 滚动抖动簇，含 Chromium/WebKit 真实浏览器覆盖。 |
| [#9733](https://github.com/esengine/DeepSeek-Reasonix/pull/9733) | **稳定提示词前缀：版本化会话上下文快照** | 🟢 OPEN | 把易变的 env/workspace/memory/skill 从 system prompt 抽离为确定性快照，保留 resume/rewind 兼容性。 |
| [#9638](https://github.com/esengine/DeepSeek-Reasonix/pull/9638) | **fix(cli): 控制器派发轮次进入运行态** | ✅ CLOSED | 闭环 #9575 队列抢跑，TUI `TurnStarted` 事件缺失修复。 |
| [#9636](https://github.com/esengine/DeepSeek-Reasonix/pull/9636) | **perf(cli): 缓存斜杠参数补全数据** | ✅ CLOSED | 闭环 #9503 Arch/NixOS 输入卡顿，缓存 `control.ArgData` 跨按键复用。 |
| [#9640](https://github.com/esengine/DeepSeek-Reasonix/pull/9640) | **fix(cli): 应用内选区复制剥离装饰竖线** | ✅ CLOSED | 闭环 #9244 WSL/Ubuntu 复制乱码，仅剥离 gutter 字符而非启发式删除。 |
| [#9735](https://github.com/esengine/DeepSeek-Reasonix/pull/9735) | **稳定 Windows 发布门禁** | ✅ CLOSED | 修复 v1.36 candidate 两次失败 Windows full-suite gate，含 73 corpus 真实提供方基准。 |
| [#9733](https://github.com/esengine/DeepSeek-Reasonix/pull/9733) / [#9491](https://github.com/esengine/DeepSeek-Reasonix/pull/9491) | 版本化上下文快照 / YOLO 模式数字键直选 | 🟢 OPEN | 改善 prompt 稳定性与 CLI 快捷选择 UX。 |

---

## 五、功能需求趋势

基于 23 条活跃 Issue 与 29 条 PR 的聚类分析，社区关注方向呈以下分布：

1. **🪟 Windows 桌面端体验（~40%）** —— 滚动抖动、面板宽度丢失、CPU 空闲占用、WebView2 zoom 漂移，Windows 已成为最密集的反馈来源。
2. **💾 会话持久化与数据安全（~20%）** —— 跨设备 resume、崩溃恢复、TurnDone 异步落盘、定时任务保存。
3. **🤖 Agent 编排（~15%）** —— subagent 图像透传（#9741）、git commit 与 todo 计划耦合（#9739）、会话所有权模型（#9477）。
4. **⌨️ CLI/TUI 键盘与交互（~12%）** —— 数字键直选、半页/单行滚动键、斜杠补全性能、复制粘贴稳定性。
5. **🔌 Provider 元数据消费（~8%）** —— 利用 `GET /models` 的 context length / reasoning efforts + 正则回退（#9738），cachecontext 按项目归属（#9163）。
6. **📚 文档去硬编码（~5%）** —— 不再强引用 `reasonix.toml`，统一为 "project-local config"（#9132）。

---

## 六、开发者关注点

| 痛点 / 需求 | 关键证据 |
|-------------|----------|
| **Windows UX 体验滞后** | 单日内 6 条滚动/面板类 Issue 全部标记 `windows` 标签，1.35→1.36 升级未根治 Virtuoso/WebView2 兼容性。 |
| **数据丢失焦虑** | `data-loss` 标签新增 2 条（#9719 / #9729），开发者强烈呼吁 UI 暴露持久化周期配置 + 检查点策略。 |
| **崩溃恢复缺位** | CLI "program was killed"（#9718）、reasonix studio 黑屏（#9530）、会话打开失败（#9729），共同指向**缺乏进程级状态机持久化**。 |
| **跨设备/远程工作流割裂** | #9477 关闭但社区呼吁在 UI 层显式提示当前会话 owner / 旁观者状态（lease 模型需要可观测化）。 |
| **Agent 工具调用的"纯粹性"** | #9739 直指"必须 todo 才能 commit"破坏了 tool layer 抽象，与 dsh 对比引发设计讨论。 |
| **能耗与轮询噪音** | #9660 桌面端静置 10% CPU 占用，#9731 提出的 1s 轮询收敛方案正回应此诉求。 |
| **Provider 元数据利用不足** | #9738 指出当前 `GET /models` 返回的 context length / reasoning efforts 未被消费，建议加入正则回退以兼容非标准提供方。 |

---

*本日报基于 esengine/DeepSeek-Reasonix 仓库过去 24 小时数据自动汇总，仅供参考。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**2026-09-03**

---

## 📌 今日速览

v1.18.27 今日发布，主要修复了 Provider 请求头与流式分块超时问题，缓解慢启动模型的连接失败。社区焦点集中在 **Anthropic thinking.blockBinding 相关回归**——1.18.26 升级后 Bedrock / Vertex 用户大规模遭遇 "Extra inputs are not permitted" 错误，相关 Issue 引发 5 条以上讨论。桌面端与 CLI 的会话导出、插件热重载、多 MCP 信任机制等多项长期需求也在持续推进。

---

## 🚀 版本发布

### v1.18.27（2026-09-02）

**Core · Bugfixes**

- 将 Provider 默认请求头超时调整为 **5 分钟**，减少慢启动模型失败概率
- 流式分块间隔默认超时同样设为 **5 分钟**（支持 `false` 禁用）
- Anthropic `thinking.blockBinding` 现可通过配置 opt-out，避免触发下游 provider 字段校验失败

> 该版本重点回应了 1.18.26 后多 provider 的稳定性反馈，建议受影响用户尽快升级。([Release 链接](https://github.com/anomalyco/opencode/releases/tag/v1.18.27))

---

## 🔥 社区热点 Issues（Top 10）

| # | 标题 / 链接 | 状态 | 评论 / 👍 | 重要性 |
|---|---|---|---|---|
| 1 | **[BUG] thinking.adaptive.block_binding.prefix_mismatch_behavior: Extra inputs are not permitted** (#46729) | OPEN | 5 / 13 | 1.18.25→1.18.26 升级后 Bedrock 调用 Claude Opus 5 全量失败，是当前最热门 Bug |
| 2 | **google-vertex-anthropic: claude-sonnet-5 fails on every message in v1.18.26** (#46777) | CLOSED | 5 / 3 | Vertex 用户的 Sonnet 5 / Haiku 4.5 全量报错，与 #46729 同源 |
| 3 | **[FEATURE] Export & Import sessions as first-class features in Desktop App** (#32696) | OPEN | 4 / 3 | 桌面端长期缺失会话迁移能力，呼声持续 |
| 4 | **`opencode export <id> \| jq` produces truncated / invalid JSON** (#29330) | OPEN | 4 / 1 | CLI 大会话导出管道截断，影响脚本化工作流 |
| 5 | **Compaction re-triggers after every step when a model does not report limit.output** (#45368) | CLOSED | 2 / 0 | 本地模型场景下 context 算术失真导致每步压缩 |
| 6 | **Directory plugins load in filesystem order, hook errors silently skip the rest** (#45367) | CLOSED | 2 / 0 | 插件加载顺序不确定 + 单点失败掩盖后续插件 |
| 7 | **capabilities.toolcall populated but never honored** (#45327) | CLOSED | 2 / 0 | `tool_call: false` 失效，所有请求仍携带完整工具集 |
| 8 | **[FEATURE] Model capability class for small/local models** (#41372) | CLOSED | 2 / 0 | 为 Qwen 4B/35B 等小模型定制 prompt 与工具策略 |
| 9 | **Billing dispute — unintended fallback consumed ~25% of OpenCode Go limit** (#46894) | CLOSED | 2 / 0 | OMO beta 静默回退到高费用模型，引发计费争议 |
| 10 | **v1 session loop: tools disabled prompt sent with full tool roster** (#45328) | CLOSED | 1 / 0 | 末步 MAX_STEPS 提示与工具下发逻辑不一致 |

**社区反应观察**：`@yanglinfang` 连续提交的多项 v1.18 之后的稳定性回归（#45327/#45328/#45367/#45368）集中暴露了核心运行时的语义偏差，已通过 PR #44898 等陆续修复。

---

## 🛠 重要 PR 进展（Top 10）

| PR | 标题 | 作者 | 说明 |
|---|---|---|---|
| [#46917](https://github.com/anomalyco/opencode/pull/46917) | **fix(core): default provider header and chunk timeouts to five minutes** | @rekram1-node | v1.18.27 的核心修复来源，定义 300s 默认超时 |
| [#46789](https://github.com/anomalyco/opencode/pull/46789) | **fix(app): release workspace catalogs when no tab or route holds them** | @Hona | 修复工作区 catalog 内存泄漏 |
| [#46717](https://github.com/anomalyco/opencode/pull/46717) | **feat(app): add timeline detail presets and placement controls** | @Hona | 5 档详情预设 + 独立 Placement 控制 |
| [#46919](https://github.com/anomalyco/opencode/pull/46919) | **fix(app): restore uniform new session tab width** | opencode-agent[bot] | 回滚 #46737 的内容自适应回归 |
| [#46885](https://github.com/anomalyco/opencode/pull/46885) | **refactor(ai): resolve responses item ids once at the stream boundary** | @rekram1-node | 统一 Responses 解析器中 function_call id 路径 |
| [#46923](https://github.com/anomalyco/opencode/pull/46923) | **fix(session-ui): count timeline tool types** | @Brendonovich | 时间线工具计数粒度细化 + i18n 复数化 |
| [#46920](https://github.com/anomalyco/opencode/pull/46920) | **feat(opencode): Allow per-MCP-server trust configuration** | @karup | 关闭 #40111，支持指纹固定与 caFile，替代不安全的 `insecure: true` |
| [#46922](https://github.com/anomalyco/opencode/pull/46922) | **fix(core): activate the initial plugin generation without the reload debounce** | @kitlangton | 冷启动 sessions.create → prompt admission 减少约 101ms 等待 |
| [#46912](https://github.com/anomalyco/opencode/pull/46912) | **fix(opencode): wait for stdout writes before exit so piped JSON is not truncated** | @andrescera | 关闭 #29330，`export` / `session list --format json` 等管道输出不再截断 |
| [#44898](https://github.com/anomalyco/opencode/pull/44898) | **fix(opencode): honest context arithmetic for small and unreported model limits** | @yanglinfang | 关闭 #45368，修正未上报 `limit.output` 时的 context 算术 |

**类型分布观察**：今日 PR 中 **fix 类型占比近半**，主要集中在 core 与 app 两侧的稳定性与资源回收；新增的 MCP 信任配置 (#46920) 与 gitlab provider 升级 (#46914) 属于能力扩展。

---

## 📈 功能需求趋势

通过 11 条活跃 Issue 与 PR 的语义聚类，社区关注方向可归纳为以下五类：

1. **多 Provider 兼容性 / 协议回归**
   - Anthropic `thinking.blockBinding` 字段冲突（Bedrock、Vertex）
   - 协议层兼容性成为升级最大风险来源

2. **桌面端体验补全**
   - 会话导入/导出、首页会话重命名、Timeline 详情预设
   - Web UI 与 Desktop 的功能对齐是长期投入方向

3. **本地/小型模型支持**
   - context 算术修正、能力分级（capability class）
   - 让 Qwen 4B/35B 等模型具备差异化 prompt 与工具策略

4. **插件与 MCP 安全机制**
   - 插件加载确定性、错误隔离、热重载完整性
   - MCP server 级证书信任（替代 `insecure: true`）

5. **CLI 工程化能力**
   - 大会话管道导出、`--format json` 一致性
   - 面向脚本与 CI 工作流的可靠性

---

## 💬 开发者关注点

- **升级回归焦虑**：跨版本（特别是 1.18.25 → 1.18.26）出现协议字段级破坏，开发者要求更明确的 changelog 与 provider 影响范围标注。
- **静默回退与计费透明度**：OMO / Senpi 默认回退高费用模型引发账单争议，社区呼吁增加 fallback 显式确认与配额预警。
- **本地模型可用性**：未上报 `limit.output` 的 provider / 路由器导致 context 算术崩溃，使小型模型基本不可用；相关 PR #44898 是当前最被期待的修复之一。
- **管道稳定性**：`export | jq` 类工作流在大数据量下被截断，#46912 已修复，但暴露 CLI 在子进程退出与 stdout 刷写顺序上的历史欠债。
- **插件加载确定性**：开发者期望 plugin 加载顺序、错误隔离、热重载范围都拥有明确语义，而非依赖文件系统顺序或静默跳过。

---

*日报基于 GitHub 公开数据整理，覆盖 anomalyco/opencode 仓库 2026-09-02 当日动态。*

</details>

<details>
<summary><strong>Deepseek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# Deepseek Harness 社区动态日报

**日期**：2026-09-03

---

## 📌 今日速览

今日 Deepseek Harness 发布了 `v0.1.2-alpha.5` 预发布版本，聚焦升级兼容性问题修复，解决了从 `0.1.1-rc.2` 或 `0.1.2-alpha.3` 升级时可能出现的应用启动失败与会话列表标题丢失问题。社区 Issue 与 PR 板块在过去 24 小时内暂无新动态，整体进入版本迭代的稳定期。

---

## 🚀 版本发布

### dsh-v0.1.2-alpha.5

- **版本类型**：Alpha 预发布版
- **核心更新**：
  - 🐛 **问题修复**：修复从 `0.1.1-rc.2` 或 `0.1.2-alpha.3` 升级时，应用可能启动失败或者会话列表标题丢失的问题
  - 👤 **贡献者**：@imccyu

> 本次更新属于平滑升级补丁，进一步巩固了 `0.1.2` 系列的稳定性，建议处于上述旧版本的用户尽快升级以规避已知问题。

🔗 [查看 Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.1.2-alpha.5)

---

## 🔥 社区热点 Issues

> **说明**：过去 24 小时内 Issues 板块无新增或更新条目。以下为近期持续受关注的历史 Issue，供开发者参考。

今日暂无新增热点 Issue。建议持续关注 [Issues 列表](https://github.com/deepseek-ai/deepseek-harness/issues) 获取最新动态。

---

## 🔧 重要 PR 进展

> **说明**：过去 24 小时内 PR 板块无新增或更新条目。

今日暂无新增 PR 动态。可前往 [Pull Requests](https://github.com/deepseek-ai/deepseek-harness/pulls) 查看进行中的贡献。

---

## 📈 功能需求趋势

由于今日无新增 Issues，暂时无法提炼新的功能需求方向。从近期 `v0.1.2-alpha.5` 的更新内容观察：

- **升级兼容性与数据迁移**：解决跨版本升级时的会话数据完整性问题，表明社区对**平滑升级路径**和**历史会话保留**有较高期待。
- **基础稳定性**：会话列表、启动流程等"看不见但关键"的基础功能仍是开发者反馈的重点。

---

## 💡 开发者关注点

基于近期版本演进的信号，开发者社区当前的核心关注点包括：

1. **升级体验**：版本升级不应导致应用不可用或数据丢失，是 Harness 走向生产可用的关键门槛。
2. **会话数据完整性**：会话列表标题等内容资产的保留，反映出 AI 工具对**上下文持久化**的强需求。
3. **预发布版本质量**：Alpha/RC 阶段仍出现阻塞性启动问题，提示项目需要更完善的回归测试覆盖。

---

## 📊 数据说明

| 维度 | 数量 |
|------|------|
| 新增/更新 Releases | 1 |
| 新增/更新 Issues | 0 |
| 新增/更新 PRs | 0 |

> 📎 数据来源：[github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报

**日期**：2026-09-03
**项目**：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 📌 今日速览

今日社区动态以**多 Profile 会话状态一致性**为主线：核心痛点集中在 Desktop Bot Chat 在跨 Profile 重建时出现的 state.db 串写、cron 任务压缩后静默、SQLite 恢复流程误用 `sqlite3 .recover` 等高风险数据完整性问题。开发者社区正围绕 P1 级 session-state 修复提交密集的 PR 集群修复方案，#97681「Desktop 关闭后 Bot Group Chat 持续工作」进入生产联调阶段，是当前最值得关注的架构演进方向。

---

## 🚀 版本发布

**无新版本发布。** 过去 24 小时无 Release 活动，所有变更通过 PR 形式在 main 分支流转。

---

## 🔥 社区热点 Issues

| # | Issue | 优先级 | 关注理由 |
|---|-------|--------|----------|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Bot Group Chats should keep working after Desktop closes | P2 | **23 条评论，社区最高热度**。Bot 群聊脱离 Desktop 长时运行是核心架构演进，关乎 VPS/家庭实验室多 Gateway 协作场景能否落地 |
| [#377](https://github.com/NousResearch/hermes-agent/issues/377) | Shared Memory Pools Between Sub-Agents | P3 | 借鉴 CAMEL-AI 思路，**打破 sub-agent 完全隔离的设计**，是 workflow 能力跃迁的关键提案，作者 @teknium1 亲自挂案 |
| [#100561](https://github.com/NousResearch/hermes-agent/issues/100561) | bug: 缺少 `hermes_state_registry` 模块导致 Nix 包启动失败 | P2 | 影响 Nix/Home Manager 密封 Python 环境的可安装性，3 条评论已有明确复现路径 |
| [#101719](https://github.com/NousResearch/hermes-agent/issues/101719) | Bot Chat capability-refresh 跨 Profile 串写 state.db | **P1** | **今日新增高危 bug**：named profile 的 Bot Chat 静默把 turn 写入 launch profile 的 state.db，是典型的会话隔离失效 |

> 注：仓库 Issue 数量较少（24h 内仅 4 条更新），其余 6 个名额留作"持续关注的存量议题"。建议读者关注 [#377](https://github.com/NousResearch/hermes-agent/issues/377) 中关于子代理共享内存池的设计讨论，这是中长期 roadmap 的关键决策点。

---

## 🛠️ 重要 PR 进展

### 🐛 P1 数据安全与状态一致性（高优合并区）

1. **[#101740](https://github.com/NousResearch/hermes-agent/pull/101740)** — `fix(tui_gateway): carry the live session handle through in-place agent rebuilds`
   修复 `_sync_bot_capabilities` 与 `_reset_session_agent` 调用 `_make_agent` 时未传 `session_db` 导致的**跨 Profile 持久化泄露**，与 #101719 配套。

2. **[#101732](https://github.com/NousResearch/hermes-agent/pull/101732)** — `fix(compressor): restate the in-flight cron prompt after the compaction handoff`
   解决 cron 任务压缩后 protected head 中的用户轮次被识别为空、回复 `[SILENT]` 的问题，从 #101170 抢救而来。

3. **[#101733](https://github.com/NousResearch/hermes-agent/pull/101733)** — `fix(compression): client-visible heartbeat during long compactions`
   长压缩期间**按心跳节拍发送 client-visible 状态**，避免 Android relay 的 180s 空闲看门狗误杀健康压缩任务并触发近上下文上限会话的死循环。

4. **[#101734](https://github.com/NousResearch/hermes-agent/pull/101734)** — `fix(backup): hermes import restores SQLite databases without replacing the live inode`
   `hermes import` 改用 `_safe_restore_db` 走 `_safe_restore_db` 页面拷贝路径而非 `os.replace`，让持活 inode 的 gateway/dashboard 能收敛到导入数据。

5. **[#101735](https://github.com/NousResearch/hermes-agent/pull/101735)** — `fix(recovery): corruption guidance points at hermes sessions recover`
   把错误横幅中的 `sqlite3 <live state.db> ".recover"` 改为 `hermes sessions recover`，避免在 Debian/Ubuntu CLI < 3.51.x 环境下拆 `-wal`/`-shm` 把仓库撕成两代。

6. **[#101736](https://github.com/NousResearch/hermes-agent/pull/101736)** — `fix(state): restore journal mode inside the repair guard`
   修复 `repair_state_db_schema` 在 exclusive repair guard 释放后重开 `state.db` 导致旧 `-wal` inode 与新 `state.db-wal` 共存的竞态。

7. **[#101737](https://github.com/NousResearch/hermes-agent/pull/101737)** — `fix(state): housekeeping FTS retry skips a quarantined SessionDB`
   防止已被 `_db_corrupt` 隔离的 `SessionDB` 仍被 housekeeping FTS 重试执行 `DROP TABLE`/`CREATE VIRTUAL TABLE`/批量 `INSERT`。

8. **[#101738](https://github.com/NousResearch/hermes-agent/pull/101738)** — `fix(gateway): slash commands report an unreadable transcript instead of replying nothing`
   读 transcript 失败时显式提示「对话历史不可读（state.db）」，避免 `TranscriptReadError` 冒泡到 dispatch 包装器只记日志不回消息。

### ⚙️ 平台与运行时扩展

9. **[#101696](https://github.com/NousResearch/hermes-agent/pull/101696)** — `fix(update): detect Homebrew formula installs`（P2）
   修复 `$(brew --prefix)/Cellar/hermes-agent` 下的官方 Homebrew formula 未被识别为受管安装导致的升级检测/递送问题，并保持 SQLite 安全策略一致。

10. **[#101052](https://github.com/NousResearch/hermes-agent/pull/101052)** — `feat(runtime): add provider-neutral AgentRuntime plugin API`（P3，需决策）
    新增 provider-neutral AgentRuntime v1 接缝，扩展 Python 插件加载器支持 profile-scoped runtime 注册、内置 Codex/Thither 兼容性校验。

### 📦 其他值得关注

- **[#100714](https://github.com/NousResearch/hermes-agent/pull/100714)** — `chore(deps): bump tornado from 6.5.7 to 6.5.8`（安全补丁）
- **[#101739](https://github.com/NousResearch/hermes-agent/pull/101739)** — `fix(config): expand ${VAR} references in terminal.cwd bridge`（profile 多路复用下的 `TERMINAL_CWD` 字面量未展开问题）
- **[#101731](https://github.com/NousResearch/hermes-agent/pull/101731)** — `feat(a2a): send asserted X-A2A-Identity header on outbound peer requests`（A2A 跨主机派发溯源可读性）
- **[#101710](https://github.com/NousResearch/hermes-agent/pull/101710)** — `fix(gateway): deliver proactive text through proxy mode`（代理模式下 cron/提醒等主动消息回到 thin gateway 的路由补齐）
- **[#78035](https://github.com/NousResearch/hermes-agent/pull/78035)** — `feat(terminal): add native Apple Container backend for macOS`（基于 Apple Container 1.2.0 / macOS 26 arm64 的原生终端后端）
- **[#92192](https://github.com/NousResearch/hermes-agent/pull/92192)** — `i18n(id): add Indonesian root documentation trio`（i18n 文档本地化）
- **[#100220](https://github.com/NousResearch/hermes-agent/pull/100220)** — `fix(agent): checkpoint/rollback for partial file mutations in long-running sessions`（长会话文件变更原子性与中断标记）

---

## 📈 功能需求趋势

从 4 条活跃 Issue + 50 条 PR 的标签分布提炼：

1. **多 Profile / 多 Gateway 架构成熟化** 🏗️
   `area/sessions` `area/profiles` `comp/gateway` 三个标签同时出现在 P1/P2 修复中，说明 Hermes 正在从单实例走向"一个 Dashboard 服务多 named profile"的共享拓扑，跨 Profile 状态隔离是当前最尖锐的工程问题。

2. **SQLite 存储安全闭环** 🗄️
   围绕 `state.db` 形成一整条修复链：备份恢复、压缩、修复防护、隔离、FTS 重试、错误横幅指引。说明 Hermes 把 SQLite 当成核心会话账本，存储层的鲁棒性已被列入 P1 必修。

3. **Provider-neutral 运行时可插拔** 🧩
   #101052 的 AgentRuntime v1 接缝 + #101731 的 A2A 身份头，表明社区希望 Hermes 不绑定任何单一 LLM 提供商，并支持跨主机对等派发与可审计性。

4. **长任务可观测与抗中断** ⏱️
   压缩心跳、cron 静默修复、代理模式主动消息、Android 180s 看门狗——围绕"任务跑得久就要让用户看得到"持续打磨。

5. **容器化与跨平台终端** 💻
   Apple Container 后端（#78035）+ Windows 后台进程改写器下线（#68948），Hermes 正在补齐 macOS/Windows 的现代容器化执行环境。

6. **本地化与文档下沉** 🌍
   印尼语 root 文档三件套（#92192）显示 i18n 是社区驱动的持续投入方向。

---

## 💬 开发者关注点

1. **"为什么我的 session.db 越改越乱"** —— 几乎所有 P1 修复都源于同一个根因：**SQLite 在并发长寿命进程 + 多 Profile 拓扑下，inode 替换、WAL、journal mode、repair guard 之间的竞态**。开发者强烈要求：
   - 禁止对 live db 使用 `os.replace` / `sqlite3 .recover`
   - 错误横幅必须指向 Hermes 自有 `hermes sessions recover` 命令
   - quarantine 状态必须被全链路尊重

2. **"Profile 隔离不能是文字游戏"** —— #101719 / #101740 暴露的 `_make_agent` 默认 `session_db` 行为，让 named profile 的对话写入 launch profile，是信任级别的破坏。开发者呼吁**把"显式传 `session_db`"设为不变量**，并加 lint 守护。

3. **"Bot 群聊不该绑死 Desktop"** —— #97681 的 23 条评论代表一种共识：Bot 是长生命周期实体，Desktop 只是触发面。**gateway-owned authority + same-gateway runner + scoped cross-gateway transport** 三件套上 main 是关键里程碑，但仍需把生产路径接上。

4. **"Sub-agent 应该有共同记忆"** —— #377 提出的 shared memory pool 是开发者最关心的"工作流能力跃迁"诉求，目前 `delegate_task` 完全隔离的状态被广泛认为是瓶颈。

5. **"主动消息在代理模式下消失"** —— #101710 暴露 thin gateway 代理模式下 inbound 走通但 host-initiated 消息无返回路径的问题，是企业部署必须解决的可靠性短板。

6. **"macOS 终端应该用上 Apple Container"** —— #78035 在社区有较高期待值，原 issue #6867 长期未合并，抢救性重开意味着该方向仍在迭代。

---

> 📊 **数据说明**：本日报基于 GitHub Issues/PRs 过去 24 小时更新汇总，共 4 条 Issue、50 条 PR。评论数、👍 数来自 PR/Issue 实时快照。建议结合 [Hermes 项目主页](https://github.com/NousResearch/hermes-agent) 跟踪后续合并动态。

</details>
