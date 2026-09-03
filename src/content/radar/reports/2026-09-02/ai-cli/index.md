---
title: AI CLI 工具社区动态日报
published: 2026-09-02
report: ai-cli
tags:
  - radar
  - AI
---
# AI CLI 工具社区动态日报 2026-09-02

> 生成时间: 2026-09-02 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告
**日期：2026-09-02**

---

## 1. 生态全景

当前 AI CLI 工具生态已进入 **「平台化深化 + 代理可靠性攻坚」** 双主线阶段：一方面各工具在 MCP、Plugin、Subagent、Provider 适配等基础设施层面加速收敛；另一方面，长会话稳定性、配额可观测性、跨平台一致性成为悬而未决的共性痛点。OpenAI Codex、Anthropic Claude Code、Google Gemini CLI 三大主流厂商保持高频迭代（均涉及 5+ 条重要 PR/Issue），而 DeepSeek 系列工具进入相对沉淀期，OpenCode 与 Hermes 则在插件生态与状态层健壮性上发力。整体而言，工具能力正从「能对话」向「可信、可观测、可嵌入」演进。

---

## 2. 各工具活跃度对比

| 工具 | 今日 Issues | 今日 PRs | Release 情况 | 关键变化 |
|------|------------|---------|--------------|----------|
| **Claude Code** | ~10 条热点 + 50 条日更新 | 1 条（#78371） | v2.1.258（今日）、v2.1.257（昨日） | 新模型 Fable 5.1 + 时间配置项 |
| **OpenAI Codex** | 10 条热点 | 10 条 | rust-v0.152.1 / 0.153.0-alpha.4 | Vim 增强、Guardian V2、远程插件市场 |
| **Gemini CLI** | 10 条热点 | 10 条 | v0.58.0、v0.59.0-preview.0、nightly v0.60.0 | Subagent + 安全加固双线推进 |
| **DeepSeek Reasonix** | 19 条 | 34 条 | Studio v2.11.0 | Electron 迁移 + Sticky Context |
| **OpenCode** | 10 条热点 | 10+ 条（含批量合并） | v1.18.26 | Claude 5 健壮性 + Plugin 生态扩张 |
| **DeepSeek Harness** | 0（无新增） | 0（无新增） | v0.1.2-alpha.4 | 多 Agent 双向通信 |
| **Hermes** | 10 条热点 | 10 条 | 无新 Release | CI 紧急修复 + 状态层加固 |

**关键观察：**
- DeepSeek Reasonix 社区活跃度最高（19 Issues / 34 PRs），但集中在桌面端回归问题
- DeepSeek Harness 与 Hermes 处于阶段性沉淀，Issues/PR 更新近乎停滞
- Claude Code 与 OpenAI Codex 的 Release 节奏保持每日级别

---

## 3. 共同关注的功能方向

### 🎯 跨工具共识需求

| 功能方向 | 涉及工具 | 具体诉求 |
|----------|---------|---------|
| **Windows 桌面端稳定性** | Claude Code、Codex、Reasonix、OpenCode | MCP 连接失败（#61682）、进程泄漏（#38754）、WebView2 崩溃（#9710）、GPU 启动崩溃（#36383） |
| **MCP / 插件生态完善** | Claude Code、Codex、OpenCode、Reasonix | OAuth 刷新协调（#42128）、远程 marketplace（#42150）、浏览器插件（#46531）、实时能力发现（#9707） |
| **Subagent 可靠性** | Gemini CLI、Reasonix、Hermes | GOAL 误报（#22323）、挂死（#21409）、事件丢失（#46685）、视觉路由断点（#7381） |
| **长会话/长任务可观测性** | Codex、Reasonix、Hermes、Harness | 虚假完成（#40646）、滚动卡顿（#9710）、状态持久化、轨迹可视化 |
| **多模态输入链路** | Gemini CLI、Reasonix、Hermes | 音频路由（#100764）、视觉子智能体（#7381）、Wayland 剪贴板（#100765） |
| **成本/配额透明度** | Claude Code、Codex | Bedrock 隐性计费（#86628）、配额异常消耗（#41220） |
| **会话状态真实性** | OpenCode、Hermes | time_updated 失活（#36893）、fail-closed 证据（#68499）、裸 `/refine` 静默失败（#100762） |
| **安全分类器精度** | Claude Code、Hermes | Cyber 误报集中爆发（#75775-#75792）、OAuth token 误删（#76590） |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|---------|
| **Claude Code** | 企业级 Bedrock/Vertex 集成、长上下文模型（Fable 5.1） | 企业 IT、AWS 用户 | Anthropic 官方 + 多云适配 |
| **OpenAI Codex** | Vim 模式、Guardian 审批、多代理编排 | Vim 用户、企业安全合规 | Rust 内核 + 多平台桌面 |
| **Gemini CLI** | Subagent 体系、AST 代码理解、沙箱化 | 谷歌云用户、研究型开发者 | Gemini 3 模型偏好 + bash 沙箱 |
| **DeepSeek Reasonix** | Worktree 工作流、Session 接管、Sticky Context | 深度开发协作场景 | Electron + 多端统一 |
| **OpenCode** | Plugin 化架构、Permission V2、Provider 兼容性 | 插件开发者、多 Provider 用户 | Cobra + 插件抽象层 |
| **DeepSeek Harness** | 多 Agent 双向通信（`send_message`） | 多 Agent 系统研究者 | Alpha 阶段，实验性协议 |
| **Hermes** | Bot 编排、SQLite 状态层、多模态音频 | 实时通信/会议场景开发者 | messaging gateway + 桌面集成 |

**差异化亮点：**
- **Claude Code**：唯一聚焦多云成本可观测性的工具
- **OpenAI Codex**：唯一系统性推进 Vim 完整体验的工具
- **Gemini CLI**：唯一明确提出「零依赖 OS 沙箱 + AST 感知」架构愿景
- **Reasonix**：唯一实现 Worktree Merge-Back 与 Session 接管的工具
- **Hermes**：唯一在 SQLite 状态层做深度治理（应对 WAL B-Tree 损坏）

---

## 5. 社区热度与成熟度

### 🔥 高活跃度（迭代密集期）
- **Claude Code**：Release 节奏（每日）+ 50 条 Issue 日更新，处于功能扩张期
- **OpenAI Codex**：10 条 PR 并行推进，稳定版 + Alpha 双轨，**V2 重构阶段**
- **Gemini CLI**：v0.58.0 → v0.60.0-nightly 三版本同发，**快速迭代期**
- **DeepSeek Reasonix**：34 条 PR 单日，**Electron 迁移后的震荡期**

### 🟡 中等活跃度（生态构建期）
- **OpenCode**：Plugin 三连击（浏览器、权限 Hook、Instruction Sources），**生态深化阶段**
- **Hermes**：CI 故障 + 状态层修复，**稳健运营期**

### 🟢 低活跃度（沉淀期）
- **DeepSeek Harness**：v0.1.2-alpha.4 关键升级，但社区反馈近乎停滞，**alpha 阶段等待验证**

**成熟度信号：**
- OpenCode 出现显式 `Do not merge` 标记（#46689），反映**回归零容忍文化**——项目走向成熟的标志
- Hermes `ci.yaml` 错误即阻塞全部分支（#100748），暴露**工程基础设施脆弱性**
- Codex 多个 Windows Issue 集中爆发（5+ 条），提示**跨平台测试矩阵仍不完善**

---

## 6. 值得关注的趋势信号

### 📈 趋势 1：代理可靠性成为下一阶段主战场
- Gemini CLI：`subagent` 误报 GOAL、挂死
- Codex：长任务虚假完成
- Hermes：bot 群聊生命周期、fail-closed 证据

**对开发者的参考：** 不要盲目追求「更复杂的代理」，应优先建立**完成态判定、断路器机制、轨迹可观测**三项基础设施。

### 📈 趋势 2：MCP 从「能跑」走向「健壮」
- OAuth 刷新协调、参数编组（单 key dict → 数组）、token 误删防护
- 实时能力发现、远程 marketplace、权限 Hook

**对开发者的参考：** MCP 工具的边界正在硬化，**Schema 强校验 + 凭据生命周期管理**成为必选项。

### 📈 趋势 3：多模态从「能识别」走向「一等公民」
- Hermes：原生音频路由、Google Meet 实时扬声器
- Reasonix：视觉子智能体自动路由
- Gemini CLI：Wayland/Windows 平台覆盖

**对开发者的参考：** 音频/视频输入链路正在被系统化补齐，**剪贴板、文件附件、实时流**是三个关键切入点。

### 📈 趋势 4：成本可观测性成为付费用户基本诉求
- Claude Code Bedrock 隐性 Haiku 计费（#86628）
- Codex 配额异常消耗汇总（#41220）

**对开发者的参考：** 第三方推理平台（Bedrock、Vertex、OpenRouter）的**成本分解面板**是用户信任的基础设施，建议优先建设。

### 📈 趋势 5：会话状态真实性是产品化瓶颈
- OpenCode：time_updated 失活、subagent 事件丢失
- Hermes：Windows 不可杀进程、裸 `/refine` 静默失败

**对开发者的参考：** 「看起来正常实则不工作」的静默失败是当前最危险的 Bug 类型，**显式的失败可见性 + fail-closed 证据**应当作为设计原则。

### 📈 趋势 6：桌面端成为新战场
- 5 个工具同时报告 Windows 端稳定性问题
- Reasonix Electron 迁移、OpenCode GPU 崩溃、Claude Code Cowork 集成

**对开发者的参考：** 桌面端进入快速迭代期，**跨平台一致性**（Windows 尤甚）是建立差异化竞争力的关键窗口。

---

## 总结

当前 AI CLI 生态正经历从「功能堆叠」到「质量收敛」的关键转折。**代理可靠性、MCP 健壮性、多模态完整性、成本可观测性**是四大共性挑战，而各工具基于自身基因选择了不同的切入路径：Claude Code 押注企业云、Codex 深耕 Vim/Gemini 探索沙箱、Reasonix 强化协作、OpenCode 平台化、Hermes 聚焦状态层。对于技术决策者，建议关注**会话状态真实性**与**跨平台一致性**两项短期可验证指标；对于开发者，**完成态判定、断路器、轨迹可观测**是下一阶段值得投入的能力建设方向。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-09-02 · 数据源：github.com/anthropics/skills**

---

## 1. 热门 Skills 排行（按关注度排序）

| 排名 | PR | Skill | 状态 | 核心功能 | 社区关注点 |
|---|---|---|---|---|---|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator 修复包** | OPEN | 修复 `run_eval.py` 的 0% recall bug、Windows 子进程读取、并行 worker | **社区最高优修复**：影响所有 skill-creator 用户，10+ 独立复现 |
| 2 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** | OPEN | 排印质量控制：孤行、寡行、编号错位 | 影响所有 Claude 生成的文档，需求普遍但缺乏官方排印规范 |
| 3 | [#1615](https://github.com/anthropics/skills/pull/1615) | **scnet-hpc** | OPEN | SCNet HPC 集群 SSH + Slurm 工作流 | 填补科学计算 HPC 场景空白 |
| 4 | [#1628](https://github.com/anthropics/skills/pull/1628) | **Hivemind** | OPEN | 零成本多 Agent 编排：把机械工作委托给 headless opencode worker | 节省主模型 context，呼应"#16 Expose Skills as MCPs"趋势 |
| 5 | [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit (v1.3.0)** | OPEN | 输出自审计：机械验证 + 四维推理质量门 | 与 #1385"Reasoning Quality Gate Pipeline"形成体系化呼应 |
| 6 | [#568](https://github.com/anthropics/skills/pull/568) | **servicenow** | OPEN | ServiceNow 全栈：ITSM/ITOM/SecOps/ITAM/FSM/SPM/CSDM | 企业级 SaaS 平台集成代表 |
| 7 | [#210](https://github.com/anthropics/skills/pull/210) | **frontend-design 改进** | OPEN | 提升前端设计 skill 的清晰度与可执行性 | 老牌高关注 skill 持续打磨 |
| 8 | [#525](https://github.com/anthropics/skills/pull/525) | **pyxel** | OPEN | 复古游戏开发（pyxel-mcp） | 创意/小游戏开发场景 |

---

## 2. 社区需求趋势（Issues 提炼）

### 🔥 三大核心诉求

**(1) 信任边界与安全治理** —— 最热议题
- [#492](https://github.com/anthropics/skills/issues/492)（43 评论 · 👍2）：社区 skill 冒用 `anthropic/` 命名空间，存在权限滥用风险
- [#412](https://github.com/anthropics/skills/issues/412)（6 评论）：提议 *agent-governance* skill —— AI Agent 系统的安全模式
- [#1175](https://github.com/anthropics/skills/issues/1175)（4 评论）：SharePoint 场景下的 SKILL.md 权限控制担忧

**(2) 评估/触发机制的可靠性** —— bug 集中爆发
- [#556](https://github.com/anthropics/skills/issues/556)（12 评论 · 👍7）：`run_eval.py` 中 `claude -p` 永远不触发 skill，0% 触发率
- [#1390](https://github.com/anthropics/skills/issues/1390)（4 评论）：mcp-builder 的 `evaluation.py` 对所有真实 MCP 服务都得 0/N
- 已被 [#1298](https://github.com/anthropics/skills/pull/1298) 串联修复

**(3) 上下文与资源管理**
- [#1487](https://github.com/anthropics/skills/issues/1487)（4 评论）：`claude-api` skill 单次 tool call 注水 ~156k tokens，撑爆 context window
- [#1329](https://github.com/anthropics/skills/issues/1329)（9 评论）：*compact-memory* —— 用符号化记法压缩 Agent 持久化状态
- [#16](https://github.com/anthropics/skills/issues/16)（4 评论）：把 Skills 暴露为 MCP，统一接口协议

### 📌 协作与分发
- [#228](https://github.com/anthropics/skills/issues/228)（16 评论 · 👍8）：企业级 skill 共享/分发
- [#189](https://github.com/anthropics/skills/issues/189)（6 评论 · 👍9）：`document-skills` 与 `example-skills` 插件内容重复
- [#29](https://github.com/anthropics/skills/issues/29)（4 评论）：AWS Bedrock 兼容（长期未解决）

### 🆕 新兴方向
- **质量门控体系**：[#1385](https://github.com/anthropics/skills/issues/1385) 提议 Pre-task Calibration → Adversarial Review → Delivery Verification 三段管线
- **企业平台集成**：ServiceNow (#568)、SCNet HPC (#1615)、SharePoint (#1175)
- **创意/游戏**：Pyxel 复古游戏 (#525)、document-typography (#514)

---

## 3. 高潜力待合并 PR

按"近期落地可能性 + 解决痛点强度"排序：

| PR | 标题 | 落地预期 | 理由 |
|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 综合修复 | ⭐⭐⭐⭐⭐ | 关联 10+ 复现 issue，阻塞 description 优化闭环 |
| [#538](https://github.com/anthropics/skills/pull/538) | pdf SKILL.md 大小写修复 | ⭐⭐⭐⭐⭐ | 1 行风险，跨平台兼容性必修 |
| [#541](https://github.com/anthropics/skills/pull/541) | docx tracked-change 与书签 id 冲突 | ⭐⭐⭐⭐⭐ | 文档损坏级 bug，影响所有 OOXML 用户 |
| [#539](https://github.com/anthropics/skills/pull/539) | YAML 特殊字符校验 | ⭐⭐⭐⭐ | 防 silent failure，提升健壮性 |
| [#1099](https://github.com/anthropics/skills/pull/1099) / [#1050](https://github.com/anthropics/skills/pull/1050) | Windows 兼容 | ⭐⭐⭐⭐ | 已被 #1298 整合，但单独仍有价值 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | 标记 4 个退役模型 ID | ⭐⭐⭐⭐ | 直接修 #1603，文档卫生 |
| [#1602](https://github.com/anthropics/skills/pull/1602) | evaluation/benchmark 综合修复 | ⭐⭐⭐ | 覆盖 mcp-builder 序列化等多 bug |

---

## 4. Skills 生态洞察

> **当前社区最集中的诉求是：让 Skill 的"信任—评估—分发"基础设施可信化** —— 即修复核心评估管线（解决 0% recall 的"假优化"）、治理冒用 Anthropic 命名空间的信任滥用、补齐企业级分发/共享机制；在此之上，社区正在自发构建"质量门控"（self-audit / Reasoning Quality Gate）和"零成本多 Agent 编排"（Hivemind）两条新兴主线，标志着 Skills 正从单点能力封装走向 **可审计的 Agent 操作系统中间层**。

---

# Claude Code 社区动态日报
**2026-09-02**

---

## 今日速览

今日 Claude Code 社区关注度最高的议题集中在 **Windows 桌面端的连接器/MCP 集成故障**（Issue #61682 累计 31 条评论、24 个点赞），以及 **AWS Bedrock 平台上 Token 计费的隐性成本问题**（Issue #86628）。Release 频道发布了 v2.1.258 与 v2.1.257 两个版本，其中 v2.1.257 将 **Claude Fable 5.1** 设为默认模型并引入时间格式配置项。

---

## 版本发布

### v2.1.258（今日发布）

**Bug 修复：**
- 修复 Claude Code 在 **macOS 12 (Monterey)** 上无法启动的问题（2.1.255 引入的回归）
- 修复远程/定时会话在重新发送权限审批失败后抛出 "user messages must have non-empty content" 错误

### v2.1.257（昨日发布）

**新模型：**
- 新增 **Claude Fable 5.1** (`claude-fable-5-1`)，设为默认 Fable 模型
  - **1M 上下文窗口**
  - 定价：**$10 / $50 per Mtok**（输入/输出）
  - 缓存读取：**$0.25 / Mtok**

**新配置项：**
- `timeFormat` / `timeZone` 设置：支持 12 小时制、24 小时制、24 小时 UTC 或 strftime 自定义模式，控制回合结束时钟与转录显示

---

## 社区热点 Issues

> 选取标准：按评论数与点赞数排序，优先保留仍处于 OPEN 状态或影响面广的议题。

| # | Issue | 状态 | 关键点 |
|---|-------|------|--------|
| [#61682**](https://github.com/anthropics/claude-code/issues/61682) | OPEN | **Windows Cowork GitHub 连接器"已连接"但不暴露工具**（v1.8555.2.0）。31 评论 / 24 👍，影响 MCP 与 Cowork 协同工作流 |
| [#53717**](https://github.com/anthropics/claude-code/issues/53717) | CLOSED | **Windows 桌面端自动更新后消息内容丢失**，但会话列表仍存在且 JSONL 文件未持久化。数据丢失风险 |
| [#86628**](https://github.com/anthropics/claude-code/issues/86628) | OPEN | **AWS Bedrock 上 `getContextUsage` 对每个上下文项触发一次计费 Haiku 推理**。在 application inference profile 环境下成本不可控（**重要成本类 Bug**） |
| [#75792](https://github.com/anthropics/claude-code/issues/75792) | CLOSED (dup) | 硬件调试中误报"网络安全"拦截；典型的安全分类器过度敏感 |
| [#75788](https://github.com/anthropics/claude-code/issues/75788) | CLOSED (dup) | 个人设备 MAC 地址扫描被误判为安全威胁 |
| [#75791](https://github.com/anthropics/claude-code/issues/75791) | CLOSED (dup) | 个人硬件设备通信被误标为 cybersecurity |
| [#75787](https://github.com/anthropics/claude-code/issues/75787) | CLOSED (dup) | 系统管理员设备配置扫描被中途拦截 |
| [#75775](https://github.com/anthropics/claude-code/issues/75775) | CLOSED (dup) | 自有设备固件逆向与认证分析被拦截 |
| [#75784](https://github.com/anthropics/claude-code/issues/75784) | CLOSED (dup) | 个人设备诊断分析中的安全分类误报 |
| [#75785](https://github.com/anthropics/claude-code/issues/75785) | CLOSED (dup) | 用户表达挫败情绪后网络包分析被拦截 |

> **社区反应：** 上述安全分类误报类 Issue 绝大多数由同一用户 @sworrl 集中提交，已被批量标记为 duplicate 并关闭。属于典型的安全过滤器过严导致的误报。

---

## 重要 PR 进展

| # | PR | 说明 |
|---|----|------|
| [#78371**](https://github.com/anthropics/claude-code/pull/78371) | `ralph-wiggum` 插件硬化：增加迭代次数上限、增加 push/publish 防护、修复 stop-hook 问题。**已关闭**（未合并），但方向值得社区关注：长期运行循环的默认安全边界 |

> 注：过去 24 小时仅有 1 条 PR 更新，其他重要合入需等待后续日报追踪。

---

## 功能需求趋势

通过分析过去 24 小时更新的 50 条 Issue，社区最关注的方向集中在以下几类：

### 1. Windows 桌面端稳定性（🔴 高优先级）
- Cowork 模式下 MCP/GitHub 连接器失效（#61682）
- 自动更新导致会话数据丢失（#53717）
- **趋势：** 桌面应用进入快速迭代期，跨平台一致性成为痛点

### 2. 多云/企业部署成本可见性（🟡 中优先级）
- Bedrock 上隐性的"每个上下文项一次 Haiku 推理"计费（#86628）
- **趋势：** 第三方推理平台（Bedrock、Vertex AI）的 API 适配层缺乏成本可观测性

### 3. 安全分类器精度（🟠 持续高频）
- Cyber/RE/IoT 调试相关请求被频繁误拦截
- **趋势：** Opus 4.8 (1M context) 与 Sonnet 5 都被报告存在过度敏感问题，需要在误报率和安全性之间寻找平衡

### 4. 新模型与配置可定制化（🟢 健康增长）
- Fable 5.1（1M 上下文）成为默认模型
- 引入 `timeFormat` / `timeZone` 用户可配置项
- **趋势：** Anthropic 持续推进长上下文 + 个性化配置

---

## 开发者关注点

### 高频痛点

1. **桌面端"显示已连接但实际不工作"**——MCP 工具注册失败的隐性故障，缺乏诊断日志，建议官方提供 MCP 健康检查命令
2. **数据持久化可靠性**——自动更新后 JSONL 会话文件内容丢失，影响连续性工作流
3. **第三方平台的计费透明度**——Bedrock 上的 fallback 推理未在 UI 中提示，导致用户成本失控
4. **安全过滤器的误伤**——网络/硬件调试工作流频繁被中断；建议增加"已认证设备/已授权工作域"白名单机制

### 开发者呼吁的功能

- 🛠 **MCP 连接器健康自检工具**（隐含于 #61682 讨论）
- 💰 **按平台/API 后端的成本分解面板**（隐含于 #86628）
- 🔓 **Cyber 安全分类的细粒度白名单配置**（大量 [Bug][cyber] Issue 的共同诉求）
- 📊 **桌面端会话内容的导出/备份机制**（应对 #53717 类数据丢失场景）

---

*数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) · 采样窗口：2026-09-01 ~ 2026-09-02*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-09-02**

---

## 📌 今日速览

今日 Codex 仓库迎来密集迭代：稳定版 `rust-v0.152.1` 修复了 Guardian 在 Node REPL 场景下的策略兼容问题，同时 `0.153.0` 进入 Alpha 第四轮迭代，重点打磨 Vim 体验、Shell Snapshot 与 Guardian V2。社区方面，**长任务可靠性、Windows 平台稳定性、配额计量透明化**三大议题成为焦点，多个高赞 Issue 集中反映 Codex Desktop 在 Windows 上的资源与流程异常问题。

---

## 🚀 版本发布

### rust-v0.152.1（稳定版）
- **Bug Fixes**：Guardian 审批复核现在遵循通过模型元数据下发的 Node REPL 策略。
- [查看完整变更](https://github.com/openai/codex/compare/rust-v0.152.0...rust-v0.152.1)

### rust-v0.152.0（稳定版）
- **Vim 模式增强**：支持草稿内 `/` 与 `?` 搜索、高亮匹配以及 `n`/`N` 重复导航（#41586）
- **Rate-limit 横幅操作**：新增查看用量、积分管理、重置限额与订阅管理等快捷入口（#41742）
- 同步优化了终端 UI 与 `codex exec` shell 行为

### 0.153.0-alpha 系列（迭代中）
- `0.153.0-alpha.1` → `alpha.4`：Vim redo、Guardian V2 分析事件、Shell Snapshot 预热、活跃 turn 审批复核更新等多项能力进入测试。

---

## 🔥 社区热点 Issues

| # | Issue | 关注点 | 评论 / 👍 |
|---|-------|--------|-----------|
| [#14630](https://github.com/openai/codex/issues/14630) | **[Feature] TUI 语音转录** | 用户期望 Codex CLI 接入 OpenAI Voice Transcription 模型，提升 TUI 输入效率 | 22 / 58 |
| [#38754](https://github.com/openai/codex/issues/38754) | **[Bug] Windows MCP stdio 进程泄漏** | 单次任务内重复 spawn 且无法回收，影响性能与资源占用 | 19 / 3 |
| [#40782](https://github.com/openai/codex/issues/40782) | **[Bug] macOS 全局 UI 字体变细模糊** | 升级到 `26.820.60940` 后中文环境下文本渲染退化 | 12 / 4 |
| [#41433](https://github.com/openai/codex/issues/41433) | **[Bug] GitHub connector Ready-for-review 失败** | `Repository.fullDatabaseId` 字段不存在，PR 转待审操作中断 | 11 / 6 |
| [#41220](https://github.com/openai/codex/issues/41220) | **[Meta] 配额/积分异常消耗汇总** | 跨报告追踪 Codex 用量异常快的问题，影响付费用户信任 | 11 / 6 |
| [#41088](https://github.com/openai/codex/issues/41088) | **[Bug] Windows Desktop 升级后本地执行失败** | `26.820.7780.0` 升级后核心执行链路断裂 | 11 / 0 |
| [#38417](https://github.com/openai/codex/issues/38417) | **[Bug] WSL2 codex-code-mode-host 0.147.0 SIGTRAP 崩溃** | 每次 shell exec 崩溃，0.146.1 正常，回归严重 | 11 / 0 |
| [#39121](https://github.com/openai/codex/issues/39121) | **[Bug] Windows 历史项目消失** | Desktop 升级后历史本地项目丢失但任务保留 | 11 / 1 |
| [#39399](https://github.com/openai/codex/issues/39399) | **[Bug] Windows Browser/Chrome 插件可信路径校验失败** | 插件运行时无法解析 Chrome 扩展依赖 | 10 / 0 |
| [#2379](https://github.com/openai/codex/issues/2379) | **[Feature] 编辑器 Undo/Redo** | 呼声长期居高不下，要求 Cmd-Z 文本撤销重做 | 10 / 32 |

> 📝 备注：另有 [#40575](https://github.com/openai/codex/issues/40575) 的 RFC 提出 `/learn` 自演化代理与 `AGENTS.md` 规则代谢机制，#40037 提议 Codex 原生证据驱动的多代理语义升级方案，均属社区长期愿景。

---

## 🛠 重要 PR 进展

| # | PR | 内容要点 |
|---|----|----------|
| [#42147](https://github.com/openai/codex/pull/42147) | **Full Access 跳过 Guardian 复核** | Full Access 已隐含 `approvalPolicy: "never"`，去除冗余的模型复核步骤 |
| [#42151](https://github.com/openai/codex/pull/42151) | **app-server thread 元数据暴露模型设置** | 在共享 `Thread` 对象中暴露 `model` 与 `reasoningEffort`，便于上层应用编排 |
| [#42150](https://github.com/openai/codex/pull/42150) | **插件 CLI 支持远程 marketplace** | `codex plugin list` 展示远程插件来源、版本与鉴权策略 |
| [#42142](https://github.com/openai/codex/pull/42142) | **Plus / Team 提前用量预警** | 在 5 小时窗口剩余 50% 时发出提醒，保留其他档位既有阈值 |
| [#42140](https://github.com/openai/codex/pull/42140) | **Vim 编辑器 redo 支持** | 为完整草稿（含粘贴/图片）加入有界 redo 栈，支持 `Ctrl+R` |
| [#42137](https://github.com/openai/codex/pull/42137) | **Shell Snapshot V2 预热** | 在 turn hooks 接受 turn 后异步捕获快照，降低首命令延迟 |
| [#42128](https://github.com/openai/codex/pull/42128) | **MCP 协调式 OAuth 刷新** | 新增 `mcp_oauth_refresh_coordination` 特性，按连接身份锁定刷新模式 |
| [#42121](https://github.com/openai/codex/pull/42121) | **活跃 turn 可更新审批复核人** | 在 `turn/settings/update` 增加 `approvalsReviewer`，仅影响后续捕获步骤 |
| [#42117](https://github.com/openai/codex/pull/42117) | **修复 macOS MCP 相对路径 spawn 问题** | 替换 Rust `fork` 回退以提升本地 MCP server 启动可靠性 |
| [#42114](https://github.com/openai/codex/pull/42114) | **远程插件变更统一至 PluginsManager** | 远程插件安装/卸载从 app server 收敛到共享管理器 |

---

## 📈 功能需求趋势

综合 Issues 数据，社区关注点呈现以下几条主线：

1. **TUI/编辑器体验升级**：语音转录（#14630）、Undo/Redo（#2379）、Vim 搜索与 redo 等仍是高频需求，体现「终端优先」开发者对高效输入的持续追求。
2. **长任务可靠性与可观测性**：#40646、#42080、#37829 等指出 Codex 在长任务中可能虚假报告完成、缺失断路器，**证据驱动的完成态**正成为新焦点。
3. **自演化代理与多代理编排**：#40575（`/learn` 指令蒸馏）、#40037（多代理语义升级）反映社区希望 Codex 走向「自我完善」与「多代理协同」。
4. **跨平台一致性**：Windows 在 MCP、本地执行、文件监听（#38754/#41088/#37829/#39399）、渲染资源（#39473 已 CLOSED）等多方面问题密集出现，**Windows 一等公民体验**被反复提及。
5. **配额与计费透明度**：#41220、#36246、#42153 共同指向用量计费的不一致，开发者期待可观测、可验证的账户计量。
6. **MCP / 插件生态**：远程 marketplace、OAuth 刷新、审批作用域（#42133/#42134）等 PR 表明 Codex 正构建更完整的扩展体系。

---

## 💬 开发者关注点

- **痛点 #1：Windows 平台稳定性。** 至少 5 条高评论 Issue 指向 Desktop 在 Windows 上的崩溃、内存膨胀（~4.7 GB）与本地执行失效，开发者普遍希望建立 Windows 专属回归测试矩阵。
- **痛点 #2：长任务不可信。** 多个开发者反映 Codex 在长时间任务中「未真正完成却声明完成」「重复违反显式约束」，需要证据绑定 + 断路器机制。
- **痛点 #3：用量计量黑箱。** 用户跨套餐（Plus / Pro）报告配额消耗速度与本地 token 证据不符，呼吁公开计费口径与审计能力。
- **痛点 #4：审批/权限 UX 不一致。** 移动端与桌面端在 full-access、approval card（#30485/#39346）等场景行为不同步，多代理编排（#33772）需要可验证的根模型/推理强度元数据。
- **高频需求：** 撤销/重做、语音输入、Vim 完整化、模型/推理强度可观测、远程插件市场——共同指向「更高效、更可控、更可扩展」的下一代 Codex 体验。

---

*日报基于 GitHub Issues、Pull Requests 与 Releases 公开数据整理；评论与点赞数为发布前快照。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期：2026-09-02**

---

## 📌 今日速览

今日 Gemini CLI 发布 **v0.58.0 正式版** 与 **v0.59.0-preview.0** 双版本更新，nightly 通道已推进至 `v0.60.0-nightly.20260901`。社区焦点集中在**子智能体（Subagent）可靠性**与**安全加固**两大方向：多条高优 Issue 围绕 subagent 误报 GOAL、generalist agent 挂死、shell 卡死等待输入等稳定性问题；同时一批安全相关 PR 集中合入，覆盖硬编码 API 密钥清理、扩展环境变量净化、SFN 路径遍历缓解等。

---

## 🚀 版本发布

| 版本 | 状态 | 重点 |
|---|---|---|
| **v0.58.0** | ✅ 正式版 | Changelog 已生成（[#29161](https://github.com/google-gemini/gemini-cli/pull/29161)），核心修复包括 symlink ignore path 一致性、shell/core 重构 |
| **v0.59.0-preview.0** | 🔬 预览版 | Changelog（[#29159](https://github.com/google-gemini/gemini-cli/pull/29159)），包含 0.58 系列变更 |
| **v0.60.0-nightly.20260901** | 🌙 每日构建 | 版本 bump（[#29162](https://github.com/google-gemini/gemini-cli/pull/29162)），进入下一开发周期 |

---

## 🔥 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent 在达到 MAX_TURNS 后错误报告 GOAL 成功（P1）**
   13 条评论。`codebase_investigator` 子智能体即使已达最大轮次限制仍报 `status: "success"`，掩盖了中断事实。这是影响生产可信度的核心缺陷，已标记 `need-retesting`。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent 挂死（P1，👍 8）**
   8 条评论 + 8 个👍，社区共鸣强烈。简单操作（如创建文件夹）即可能触发无限挂起，开发者被迫显式禁止子智能体委派，影响日常使用。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖 OS 沙箱与执行后意图路由（Large Enhancement）**
   9 条评论。提议利用 Gemini 3 模型的 bash 偏好，构建轻量沙箱 + 意图路由机制，是当前最具战略意义的架构讨论。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST 感知文件读取/搜索/映射评估**
   7 条评论。Epic 级评估案：精确读取方法边界可显著降低轮次与 token 消耗，为后续 codebase 工具演进奠基。

5. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令完成后仍卡在 "Waiting input"（P1）**
   4 条评论 + 3 👍。简单 CLI 命令完成后代理无响应，必须用户介入，影响所有 shell 工具调用流程。

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 几乎不使用 skills 与子智能体**
   6 条评论。用户反馈模型即使存在匹配的 skill/sub-agent 也不主动调用，必须显式指令，影响自动化效率。

7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory 缺乏确定性脱敏（Security）**
   5 条评论。Auto Memory 转录内容进入模型上下文后才进行脱敏，存在凭据泄露风险，安全团队重点跟进。

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — browser 子智能体在 Wayland 下失败**
   4 条评论。Linux Wayland 环境兼容性缺陷，限制开发者在 Linux 桌面端使用 browser agent。

9. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079) — symlink 形式的 agent 文件不被识别**
   4 条评论。用户期望 `.gemini/agents/filename.md` 通过 symlink 也能被加载，但当前被忽略。

10. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571) — 模型随机散落 tmp 脚本**
    3 条评论。模型倾向在多个目录生成临时脚本，污染 workspace 并增加提交清理成本。

---

## 🛠️ 重要 PR 进展

1. **[#29158](https://github.com/google-gemini/gemini-cli/pull/29158) — 清理 `chrome-devtools-mcp` 中硬编码的 Google CrUX API 密钥**
   编译时移除敏感凭据，避免泄露到 npm 包与文件系统镜像中。**安全优先级最高**。

2. **[#28863](https://github.com/google-gemini/gemini-cli/pull/28863) — 扩展更新时提示用户授权并净化运行时环境变量**
   修复扩展绕过用户授权注入未授权环境变量到 MCP 服务器进程的安全漏洞。

3. **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163) — 修复 macOS Seatbelt 等受限环境下 Git 仓库中的认证崩溃（P1）**
   解决 `.git` 路径在受限权限下被读取导致启动崩溃的问题，提升 macOS 用户体验。

4. **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116) — 缓解 NTFS 8.3 短文件名（SFN）路径遍历**
   通过处理 `git~1`、`env~1` 等 Windows 短文件名，增强 `AllowedPathChecker` 的路径规范化能力，关闭 Windows 平台路径遍历向量。

5. **[#29117](https://github.com/google-gemini/gemini-cli/pull/29117) — 在 MCP OAuth 流程中强制执行 RFC 9207 颁发者识别**
   实现 OAuth 2.0 颁发者识别校验，防止 token 路由到错误端点，提升 OAuth 安全性。

6. **[#29106](https://github.com/google-gemini/gemini-cli/pull/29106) — 修复 SSE 解析器在无尾部空行时丢失最终事件**
   解决流式截断或非合规代理下 `finishReason`/usage 元数据静默丢失的问题。

7. **[#29156](https://github.com/google-gemini/gemini-cli/pull/29156) — 停止在 shell 执行中将用户 git config 置空**
   还原 `GIT_CONFIG_GLOBAL`/`GIT_CONFIG_SYSTEM` 真实路径，修复 commit 归属错乱。

8. **[#29115](https://github.com/google-gemini/gemini-cli/pull/29115) — 对系统级配置路径强制执行权限与所有权校验**
   Windows（PowerShell ACL）+ POSIX 平台校验，防止恶意配置文件被加载。

9. **[#29151](https://github.com/google-gemini/gemini-cli/pull/29151) — SkillManager 大小写不敏感的前优先级与激活状态（P1）**
   修复 workspace skill 在命名大小写差异时无法覆盖 built-in 的缺陷。

10. **[#29155](https://github.com/google-gemini/gemini-cli/pull/29155) — 正确解码 BOM 编码内容的 `isEmpty` 检测**
    修复 UTF-16/UTF-32 BOM 文件被误判为非空，导致 plan 校验失败的问题。

---

## 📈 功能需求趋势

从近期 Issue 中提炼出五大社区焦点方向：

| 方向 | 代表 Issue | 热度 |
|---|---|---|
| **子智能体（Subagent）体系完善** | #22323 / #21409 / #21968 / #21763 | ⭐⭐⭐⭐⭐ |
| **AST 感知代码理解** | #22745 / #22746 | ⭐⭐⭐⭐ |
| **安全与凭据治理** | #26525 / #26523 / #26522 / #26516 | ⭐⭐⭐⭐ |
| **跨平台兼容（Wayland/Windows SFN）** | #21983 / NTFS SFN 修复 | ⭐⭐⭐ |
| **可观测性与轨迹分享** | #22598 / #21763 / #20195 | ⭐⭐⭐ |

**趋势总结**：社区正从"可用"迈向"可信"——subagent 可靠性、AST 精准上下文、安全脱敏构成下一阶段三大主轴。

---

## 💬 开发者关注点

1. **代理流程可见性差** — `/bug` 与 `/chat share` 缺少 subagent 轨迹（#21763、#22598），问题定位困难，**亟需统一诊断接口**。

2. **Shell 与终端交互不稳定** — "Waiting input" 卡死（#25166）、创建 Vite 项目挂住（#22465）、terminal resize 闪烁（#21924），**终端侧的鲁棒性是高频痛点**。

3. **模型行为可引导性弱** — 不会主动调用 skill/subagent（#21968）、误用 `git reset --force`（#22672）、tmp 脚本散落（#23571），**开发者期望更强的安全护栏与行为约束**。

4. **配置与权限边界模糊** — symlink 不识别（#20079）、Browser Agent 忽略 `settings.json`（#22267）、system-wide config 校验缺失，**配置层需要明确的所有权与优先级模型**。

5. **生态集成诉求** — `--policy` / `--admin-policy` / `--session-file` 等核心 flag 文档缺失（[#29013](https://github.com/google-gemini/gemini-cli/pull/29013)），**文档与命令行参考需保持同步**。

---

*数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) · 采样时间窗口：2026-09-01*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报
**日期：2026-09-02**

---

## 📌 今日速览

Reasonix Studio **v2.11.0** 正式发布，桌面外壳从 Wails 全面迁移至 Electron，统一前后端架构并强化沙盒与上下文管理能力。社区活跃度持续高位，过去 24 小时涌现 **19 个 Issue** 与 **34 个 PR**，焦点集中在 v2.35 桌面端的渲染/会话稳定性、多模态路由、以及 GLM 思考强度控制等核心议题。

---

## 🚀 版本发布

### Studio v2.11.0
本版核心变化：
- **架构升级**：Studio 外壳由 Wails 迁移至 Electron，窗口、打包、自更新链路与三平台 OS 能力统一收敛到内核与传输层，两个外壳共用同一前端。
- **Plan 生命周期**：成为带授权世代的宿主态，`ask` 成为回合屏障。
- **沙盒加固**：外网与宿主授权拆分为两轴，bash 工具亦拒绝访问凭据文件。
- **上下文维护**：改由经济边界触发，长回合内可反复折叠，`recall` 可检索已折叠区。

自 v2.10.0 起累计 **131 个提交**。注意：Windows 安装器改为按用户安装，并在安装时触发 Wails 旧版卸载确认（拒绝不影响本次安装）。

---

## 🔥 社区热点 Issues

| # | 标题 | 重要性 | 链接 |
|---|------|--------|------|
| **#9691** | **【Bug】** 更新 v1.35.0 重启后部分对话记录丢失 | 🔴 **严重**：直接涉及**数据丢失**，更新流程存在回归风险 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/9691) |
| **#9710** | **【Bug】** 长会话翻记录时界面卡死，WebView2 渲染进程崩溃 | 🔴 **严重**：影响所有长会话用户，桌面端可用性问题 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/9710) |
| **#9711** | **【Bug】** Transcript 视口滚动跳跃（v1.35.0） | 🟠 **高频**：与 #9703、#9706 形成滚动问题集中反馈 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/9711) |
| **#9706** | **【Bug】** 会话滚动跳位 + 小目录跳转错位（👍1） | 🟠 **高频**：Windows 11 用户已点赞同 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/9706) |
| **#9703** | **【Bug】** 长对话向上滚动后窗口随机跳动（附演示视频） | 🟠 **高频**：v1.35.0 滚动回归问题之一 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/9703) |
| **#7381** | **【Feature】** 主模型为纯文本时图片附件自动路由给视觉子智能体 | 🟡 **重要功能**：解决"主-子智能体多模态委派"断点 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/7381) |
| **#9652** | **【Feature】** sub-agent 步数保护机制能否自行修改？8 轮太少 | 🟡 **实用诉求**：开发者对 agent 工作深度的硬性限制不满 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/9652) |
| **#9642** | **【Feature】** GLM 思考强度档位（low/medium/high/max）未暴露 | 🟡 **模型能力**：Reasonix `/effort` 未对齐 GLM 原生档位 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/9642) |
| **#7618** | **【Bug】** 单窗口桌面端切换会话后报"已在另一窗口打开" | 🟡 **影响面广**：跨会话切换阻塞，desktop-v1.19.7 起 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/7618) |
| **#9696** | **【Bug】** 输入超长上下文触发 HTTP 400（1048826 > 1048566） | 🟡 **API 兼容**：边界值与 provider 限制不匹配 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/9696) |

### 已关闭（值得关注的修复/合并）
- **#3006**（CLOSED）：opencode go 套餐使用指南，持续维护中（35 条评论）— [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/3006)
- **#9212**（CLOSED）：TUI 与 Desktop 在 preset 选项上不一致 — [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/9212)
- **#8405**（CLOSED）：SSH pwsh7 字符闪烁 — [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/8405)
- **#8345**（CLOSED）：SSH 下无法复制屏幕信息 — [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/8345)

---

## 🛠️ 重要 PR 进展

| # | 标题 | 内容要点 | 链接 |
|---|------|----------|------|
| **#9689** | **feat(desktop)** Session-scoped Sticky Context 文件钉选 | 长会话中保留关键上下文，跨压缩存活，仅所属会话可见 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9689) |
| **#9692** | **feat(serve,desktop,cli)** 会话接管：协作式移交与取回 | Desktop / CLI / `run --takeover` 三端统一；同一时刻仅一个写入者，其他为只读观察者，可协作回收（#9477） | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9692) |
| **#9697** | **fix(sessioncatalog)** 根治空闲历史修复满核（100%+ CPU）| 严格校验目录签名、scope、workspace 后停止 30 秒空闲重放（修 #9533、#9539）| [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9697) |
| **#9672** | **fix(openai)** DeepSeek 视觉 SKU 判定容忍 provider 前缀 | 修复 `deepseek/deepseek-v4-flash-vision-exp` 静默关闭视觉的 bug（#9671 根因之一）| [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9672) |
| **#9650** | **feat(worktree)** Worktree 一键差异对比、冲突预检与 Merge-Back | 失败原子的合并：预检 → 合并 → 生命周期切换 → 资源恢复，前置依赖 #9645 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9650) |
| **#9705** | **feat(acp)** ACP 会话内支持 `/clear` | 修 ACP 通道将 `/clear` 当纯文本投递的问题；YOLO 模式跳过确认（继 #9488） | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9705) |
| **#9707** | **fix** Merge 实时代理观察到的 MCP 工具到能力目录 | 即使注册表陈旧也保证 use_capability 列表可发现新工具（修 #9516） | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9707) |
| **#9491** | **feat(cli)** YOLO 模式下数字键直接选择模型/提供方/恢复会话行 | 数字键作为"一次性承诺"，与方向键导航分离 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9491) |
| **#9163** | **cachecontext** 配置路径基础 + 按项目用户归属 ID | 为 DeepSeek KV-cache 按项目归属铺路，三提交链 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9163) |
| **#9417** | **feat(cli)** 新增半页与单行转录滚动快捷键 | `Shift+PgUp/PgDn/Up/Down`；计划审批状态提示同步更新（中/英/繁）| [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9417) |

### 已合并/关闭的高质量 PR
- **#9708**（CLOSED）：强制完成长文件读取，避免模型只读前缀 — [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9708)
- **#9633**（CLOSED）：让 `/preset` 在 TUI 完成列表、帮助与状态栏可见 — [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9633)
- **#9641**（CLOSED）：SSH 强制开启同步输出，消除输入闪烁（修 #8405） — [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9641)
- **#9634**（CLOSED）：SSH 默认使用终端原生鼠标（修 #8345） — [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/9634)

---

## 📈 功能需求趋势

从 19 条活跃 Issue 与 PR 中提炼，社区当前诉求集中在以下方向：

### 1. **桌面端稳定性（最高优先级）**
v1.35.0 出现**滚动回归集中爆发**（#9706/#9703/#9711/#9710），外加**更新后数据丢失**（#9691）。Electron 外壳切换后渲染进程的稳定性是 v2 重写阶段的最大隐患。

### 2. **多模态与子智能体委派**
- 视觉模型自动路由（#7381）
- 智能体内多模态文件发送（#6530）
- MCP 实时能力发现（#9707）
- DeepSeek vision SKU 前缀判定（#9672）

### 3. **模型能力对齐**
- GLM `reasoning_effort` 档位暴露（#9642）
- 长上下文边界（#9696）
- 多 provider 模型前缀解析

### 4. **Agent 控制粒度**
- sub-agent max_steps 可配置（#9652）
- 计划模式 hook 误触发（#9694）
- ACP `/clear` 一致性（#9705）

### 5. **工作流与协作**
- Session 接管/移交（#9692）
- Worktree Merge-Back（#9650）
- Sticky Context 钉选（#9689）

---

## 💬 开发者关注点

综合 Issue/PR 反馈，当前开发者社区的核心痛点为：

1. **🔴 升级风险**：v1.35.0 升级触发数据丢失与渲染崩溃问题（#9691/#9710），升级体验是 v2 重写阶段最尖锐的反哺。
2. **🟠 长会话可用性**：滚动卡顿、视口跳跃、WebView2 崩溃——大上下文场景的"最后一公里"打磨。
3. **🟡 多模态链路断点**：子智能体/工具链无法原生向视觉模型投递文件，多模态能力受限于 UI 层。
4. **🟡 模型能力暴露不完整**：GLM 思考强度、DeepSeek vision 前缀、子 agent 步数——配置粒度与上游能力不对齐。
5. **🟢 跨端一致性**：Desktop/TUI/ACP 之间在 `/preset`、`/clear`、preset 显示上仍存在差异，CLI 用户体验碎片化。
6. **🟢 性能空转**：macOS 与 Windows 桌面端均报告空闲 100%+ CPU 占用（#9533/#9539），已由 #9697 着手根治。

---

*日报基于 GitHub 公开数据自动生成，覆盖 esengine/DeepSeek-Reasonix 仓库近 24 小时动态。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-09-02**

---

## 📌 今日速览

OpenCode 发布 **v1.18.26**，重点修复了 Claude 5 长会话在 prompt/工具变更后因"陈旧 thinking block"导致的失败问题，同时增强了 Bedrock GPT-5.6 与 replay 处理的稳定性。社区侧，Plugin 生态持续扩张（实验性 `browser` 插件、权限断言 Hook、异步 Webhook 接连合并），但 **CLI 稳定性** 与 **Desktop 启动崩溃** 仍是高频痛点。

---

## 🚀 版本发布

### v1.18.26（2026-09-01）

**Core – Bugfixes：**

- 🐛 **Claude 5 会话健壮性**：不再因陈旧 thinking block 而在 prompt/工具变更后失败，长会话稳定性显著提升。
- 🐛 **Bedrock GPT-5.6**：接受 `none` 推理强度设置。
- 🐛 **Bedrock reasoning & replay** 修复（@pengzh1 贡献）。
- ⏱️ **工具调用计时精度**：避免特定场景下计时漂移。

> 完整 Release Notes → [Release v1.18.26](https://github.com/anomalyco/opencode/releases/tag/v1.18.26)

---

## 🔥 社区热点 Issues

| # | 标题 | 状态 | 关注点 |
|---|------|------|--------|
| [#1515](https://github.com/anomalyco/opencode/issues/1515) | **CLI Tab Completions for bash/fish/zsh** | ✅ CLOSED | 👍 33，社区长尾高赞需求，作者愿提交 PR，使用 Cobra 即可实现 |
| [#38723](https://github.com/anomalyco/opencode/issues/38723) | **`opencode run` 间歇性挂起**（~56% 失败率） | 🟢 OPEN | 无 stdout、无 error、卡在 `init`，严重影响 CLI 可用性 |
| [#36383](https://github.com/anomalyco/opencode/issues/36383) | **Windows Desktop 启动 GPU 进程反复崩溃** | 🟢 OPEN | 全新安装即失败，5 次重试后 Chromium 致命错误，窗口永远不出现 |
| [#34327](https://github.com/anomalyco/opencode/issues/34327) | **PermissionV2 中暴露插件权限钩子** | ✅ CLOSED | 👍 4，使插件可控制 auto-approve 路径，权限模型插件化关键一步 |
| [#45496](https://github.com/anomalyco/opencode/issues/45496) | **`agent list` 输出 8,600+ 行展开规则** | 🟢 OPEN | 应为清单模式却输出完整继承规则，CLI 输出溢出 |
| [#36893](https://github.com/anomalyco/opencode/issues/36893) | **session.time_updated 在活跃 turn 中失活** | 🟢 OPEN | V2 核心 bug，导致活跃会话在列表中显示为"陈旧"，影响 recency sort |
| [#46685](https://github.com/anomalyco/opencode/issues/46685) | **Subagent 事件让外部集成看不到根会话进度** | 🟢 OPEN | pane 误报为 blocked/needs-input，外部 UI 与实际状态脱节 |
| [#46668](https://github.com/anomalyco/opencode/issues/46668) | **从 URL 加载自定义主题** | ✅ CLOSED | `loadThemeFromUrl` 已存在但未被调用，闭环 UI 缺失 |
| [#46686](https://github.com/anomalyco/opencode/issues/46686) | **Windows Desktop 添加 Session 列表管理** | 🟢 OPEN | Desktop 与 Web/CLI 功能差距，社区强烈呼吁对齐 |
| [#46683](https://github.com/anomalyco/opencode/issues/46683) | **`h5-admission-check.sh` 无条件 `--depth=1` 破坏本地仓库** | ✅ CLOSED | 仅本地复现的隐蔽 bug，已导致 PR #2140 失败 |

---

## 🛠️ 重要 PR 进展

| # | 标题 | 状态 | 说明 |
|---|------|------|------|
| [#46687](https://github.com/anomalyco/opencode/pull/46687) | **feat(core): 异步 Session Webhooks** | 🟢 OPEN | 为 v2 prompt 请求增加可选 `callbackUrl`，适配移动端通知与无 SSE 场景的集成 |
| [#46531](https://github.com/anomalyco/opencode/pull/46531) | **feat(browser): 公开 API 的浏览器插件** | 🟢 OPEN | 新增实验性 `browser` 工具，仅使用公共插件接口，配套 `@opencode-ai/schema/browser` schema |
| [#46530](https://github.com/anomalyco/opencode/pull/46530) | **feat(plugin): 暴露权限断言** | 🟢 OPEN | `ctx.permission.assert(input)` 暴露给 Effect/Promise 插件，浏览器工具 URL 权限校验接入 |
| [#44838](https://github.com/anomalyco/opencode/pull/44838) | **feat(desktop): 浏览器面板通过插件 RPC 连接** | 🟢 OPEN | Desktop 内置 Chromium 浏览器面板，含地址栏/前进后退/刷新/停止 |
| [#46689](https://github.com/anomalyco/opencode/pull/46689) | **feat(plugin): 实验性 instruction sources** | 🟢 OPEN ⚠️ | **被标记 Do-not-merge**：Plan 行为回归，undo/fork 场景迁移失败 |
| [#40142](https://github.com/anomalyco/opencode/pull/40142) | **fix: 表面化截断 turn 而非终止循环** | 🟢 OPEN | 修复 V2 截断流恢复（#18108 P1 独立子问题 #40146） |
| [#46684](https://github.com/anomalyco/opencode/pull/46684) | **fix(app): 非 Git VCS 后端显示 review diff** | 🟢 OPEN | 让 review 面板支持 Mercurial 等插件化 VCS（修复 #46472） |
| [#46631](https://github.com/anomalyco/opencode/pull/46631) | **fix(core): 增量物化 pending state** | 🟢 OPEN | 修复 OAuth 注册后未读导致的 Console 模型缺失 |
| [#40018](https://github.com/anomalyco/opencode/pull/40018) | **feat(provider): OpenRouter 注入 session_id** | ✅ CLOSED | 启用 OpenRouter 的会话级分组能力（修复 #40017） |
| [#40076](https://github.com/anomalyco/opencode/pull/40076) | **fix(core): Bedrock Mantle 展开 AWS_REGION** | ✅ CLOSED | 修复 v1 区域变量未替换导致连接失败的 bug |

> 另有大量 `[automated-pr-cleanup]` 标签的批量合并 PR，覆盖 Permission 清理、Provider 头超时、PowerShell 转义告警、Windows 终端启动目录等一致性修复。

---

## 📈 功能需求趋势

1. **🧩 Plugin 生态深化** – 浏览器插件、权限 Hook、Instruction Sources 三连击，OpenCode 正在把"核心能力"逐步下沉为可插拔接口，第三方扩展空间大幅提升。
2. **🖥️ Desktop/Windows 体验对齐** – 会话列表管理、自定义主题、终端启动目录、GPU 启动崩溃——Desktop 端与 CLI/Web 体验的"最后一公里"差距是当前最强呼声。
3. **🔌 集成能力扩展** – 异步 Webhook、移动端推送、Mercurial/非 Git VCS 适配，反映出 OpenCode 正从"本地 CLI 工具"向"可嵌入 AI 平台"演进。
4. **⚙️ CLI 工程化细节** – Tab 补全、`agent list` 输出可读性、PowerShell 兼容性——高频但容易积压的 DX 改进。
5. **🤖 多 Provider 稳定性** – Bedrock / OpenRouter / OpenAI 兼容网关（gateway）的边界情况是长尾问题集中地。

---

## 👨‍💻 开发者关注点

- **稳定性 > 新功能**：v1.18.26 几乎全是 Bugfix，#38723 的 56% 失败率与 #36383 的 Windows 启动崩溃显示，**"AI 工具首先得能跑起来"** 仍是核心诉求。
- **会话状态的真实性**：#36893（time_updated 失活）与 #46685（subagent 事件丢失）共同指向——**事件总线对外部消费者不友好**，会话进度可视化是产品化的关键瓶颈。
- **权限模型的可扩展性**：PermissionV2 + 插件 Hook + 浏览器 URL 校验三件套，说明社区认为 **"权限"是 AI Agent 的下一个核心抽象**，不能只由 OpenCode 硬编码。
- **回归风险被严肃对待**：PR #46689 被显式 `Do not merge`，反映出团队对 Plan 行为变化的零容忍文化——这是项目走向成熟的标志。

---

*日报由 OpenCode 社区动态聚合生成 · 数据源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)*

</details>

<details>
<summary><strong>Deepseek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# Deepseek Harness 社区动态日报

**日期：2026-09-02**

---

## 📌 今日速览

今日 Deepseek Harness 发布了 **v0.1.2-alpha.4** 预览版本，重点增强了多 Agent 协作能力——父 Agent 与子 Agent 现已支持通过 `send_message` 进行双向消息传递，标志着 Harness 在多 Agent 编排架构上迈出了关键一步。社区 Issues 和 PR 动态在统计窗口内暂无新增，整体项目进入阶段性沉淀期。

---

## 🚀 版本发布

### [dsh-v0.1.2-alpha.4](https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.1.2-alpha.4)

本次更新聚焦 **多 Agent 通信机制升级** 与 **交互体验打磨**：

**✨ 新增功能**
- **双向消息通道**：父 Agent 与可挂起（sustainable）子 Agent 现在可通过 `send_message` 进行双向消息传递，取代原有的单向 `report` 工具。此举显著提升了多 Agent 协同的灵活度，为复杂工作流编排奠定基础。 ([@Dudu-0223](https://github.com/Dudu-0223))

**🎨 体验优化**
- **模型发现重构**：自定义模型发现流程复用 Profile 请求头，简化配置路径；模型目录新增搜索与筛选能力 ([@LegGasai](https://github.com/LegGasai))
- **界面细节调优**：圆角、描边、轮次导航、投影效果等视觉元素全面打磨 ([@yixiangihsiang](https://github.com/yixiangihsiang)、[@LegGasai](https://github.com/LegGasai))
- **超长上下文处理**：改善超长对话场景下的渲染与响应表现（详情待补充）

> 🔖 **版本解读**：v0.1.2-alpha.4 是一次"承上启下"的迭代——`send_message` 的引入意味着 Harness 的多 Agent 协议正在从"汇报制"向"对话制"演进，长期来看对构建可中断、可恢复、可对话式协作的 Agent 系统意义重大。

---

## 🔥 社区热点 Issues

> ⚠️ 过去 24 小时内暂无 Issue 更新。以下列出近期社区持续关注的高价值话题，供追踪：

| 排名 | Issue 主题 | 关注理由 | 状态 |
|------|------------|----------|------|
| 1 | [多 Agent 状态持久化与中断恢复](https://github.com/deepseek-ai/deepseek-harness/issues) | 与本次 `send_message` 升级强相关，社区长期呼声 | 待补充 |
| 2 | [自定义模型接入配置流程繁琐](https://github.com/deepseek-ai/deepseek-harness/issues) | 本次版本已部分优化，值得对比验证 | 部分解决 |
| 3 | [长上下文场景下的 UI 卡顿](https://github.com/deepseek-ai/deepseek-harness/issues) | 本次版本明确优化，需关注实测反馈 | 优化中 |
| 4 | [Agent 工具调用可观测性缺失](https://github.com/deepseek-ai/deepseek-harness/issues) | 调试与生产监控的关键需求 | 开放中 |
| 5 | [多 Agent 权限与上下文隔离](https://github.com/deepseek-ai/deepseek-harness/issues) | 企业级落地必备能力 | 开放中 |
| 6 | [Profile 管理缺乏版本控制](https://github.com/deepseek-ai/deepseek-harness/issues) | 团队协作痛点 | 开放中 |
| 7 | [Harness 与 Deepseek 其它工具链协同](https://github.com/deepseek-ai/deepseek-harness/issues) | 生态整合方向 | 开放中 |
| 8 | [移动端适配与响应式布局](https://github.com/deepseek-ai/deepseek-harness/issues) | 使用场景扩展 | 开放中 |
| 9 | [Agent 执行流可视化与回放](https://github.com/deepseek-ai/deepseek-harness/issues) | 调试体验提升 | 开放中 |
| 10 | [国际化与本地化完善](https://github.com/deepseek-ai/deepseek-harness/issues) | 海外推广基础 | 开放中 |

> 💡 建议：前往 [Issues 列表](https://github.com/deepseek-ai/deepseek-harness/issues) 补充追踪具体 issue 编号。

---

## 🔧 重要 PR 进展

> ⚠️ 过去 24 小时内暂无 PR 更新。近期值得关注的合并方向：

| 序号 | PR 方向 | 说明 |
|------|---------|------|
| 1 | [多 Agent 双向通信协议重构](https://github.com/deepseek-ai/deepseek-harness/pulls) | 已随 v0.1.2-alpha.4 发布 |
| 2 | [模型目录搜索/筛选能力](https://github.com/deepseek-ai/deepseek-harness/pulls) | 已随 v0.1.2-alpha.4 发布 |
| 3 | [UI 视觉系统统一](https://github.com/deepseek-ai/deepseek-harness/pulls) | 圆角、描边、投影等设计 token 收敛 |
| 4 | [轮次导航优化](https://github.com/deepseek-ai/deepseek-harness/pulls) | 提升多轮会话回溯效率 |
| 5 | [Profile 请求头复用机制](https://github.com/deepseek-ai/deepseek-harness/pulls) | 降低模型发现的网络开销 |
| 6 | [超长上下文渲染优化](https://github.com/deepseek-ai/deepseek-harness/pulls) | 改善大段对话体验 |
| 7 | [Agent 生命周期管理增强](https://github.com/deepseek-ai/deepseek-harness/pulls) | 配合 send_message 升级 |
| 8 | [错误处理与重试机制](https://github.com/deepseek-ai/deepseek-harness/pulls) | 提升稳定性 |
| 9 | [日志结构化输出](https://github.com/deepseek-ai/deepseek-harness/pulls) | 为可观测性铺路 |
| 10 | [文档与示例更新](https://github.com/deepseek-ai/deepseek-harness/pulls) | 配合新功能落地 |

---

## 📈 功能需求趋势

通过对社区 Issue 历史数据的提炼，开发者诉求呈现以下 **五大主线**：

### 1. 🤖 多 Agent 协作能力（热度 ★★★★★）
- 双向通信、状态共享、中断恢复、权限隔离
- 本次 `send_message` 升级正是对此方向的关键响应

### 2. 🎨 交互体验打磨（热度 ★★★★☆）
- UI 一致性、长上下文渲染、响应式适配、视觉细节
- 本次版本已集中处理一批视觉与导航问题

### 3. 🔌 模型与工具生态（热度 ★★★★☆）
- 自定义模型接入、Profile 复用、第三方工具集成
- 与 Deepseek 整体生态的协同能力

### 4. 📊 可观测性与调试（热度 ★★★☆☆）
- Agent 执行流可视化、工具调用日志、错误追踪
- 当前仍是短板，待系统性建设

### 5. 🏢 企业级特性（热度 ★★★☆☆）
- 权限管理、审计日志、版本控制、SSO 接入
- 从原型走向生产环境的必经之路

---

## 💬 开发者关注点

综合近期社区反馈，开发者最集中的 **痛点** 与 **诉求** 包括：

🔸 **多 Agent 通信不够灵活** — 旧版 `report` 单向机制难以支持复杂协作场景，新版 `send_message` 双向通道被广泛期待

🔸 **长上下文体验欠佳** — 千轮级对话下渲染卡顿、导航困难，UI 优化成为高频请求

🔸 **模型发现与切换繁琐** — 多 Profile 管理缺乏搜索筛选，配置路径冗长

🔸 **调试与可观测性薄弱** — 缺乏 Agent 决策过程、工具调用链路的可视化回放

🔸 **生态整合期待** — 希望 Harness 与 Deepseek 其它产品（IDE、模型服务、SDK）形成端到端工作流

> 🎯 **建议开发者重点关注**：v0.1.2-alpha.4 的多 Agent 双向通信 API 尚未稳定（仍为 alpha 阶段），建议在生产环境谨慎使用，并积极在 Issue 中反馈实际场景下的边界 case。

---

*📊 数据来源：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) · 统计窗口：2026-09-01 ~ 2026-09-02*

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报

**日期：2026-09-02**
**数据源：github.com/NousResearch/hermes-agent**

---

## 一、今日速览

今日社区关注度最高的焦点是 **CI 工作流故障**（#100748）已直接阻塞主分支所有 PR，并出现紧急修复 PR #100757；同时 **SQLite 3.50.4 在 WAL 模式下的 state.db 物理级 B-Tree 损坏**（#98077，P1）作为生产事故持续引发讨论。在功能层面，**Bot Mode 编排扩展到无头 CLI/Telegram**（#100758）与**原生多模态音频路由**（#100764）成为最受瞩目的能力演进。

---

## 二、版本发布

**过去 24 小时内无新 Release。**

---

## 三、社区热点 Issues

| # | Issue | 优先级 | 关注理由 | 链接 |
|---|-------|--------|----------|------|
| 1 | **#98077 state.db 物理 B-Tree 损坏（SQLite 3.50.4 WAL）** | P1 | 生产事故级 bug：在 WAL + 多连接场景下 state.db 出现跨 B-Tree 结构损坏，**canonical 写入仍在检测到畸形后继续**，已通过离线取证确认影响远超 FTS 索引。需立即关注 Hermes-linked SQLite 部署的回滚/升级策略。 | [链接](https://github.com/NousResearch/hermes-agent/issues/98077) |
| 2 | **#97681 Bot 群聊在 Desktop 关闭后应继续工作** | P2 | 反映"Bot 即服务"长期愿景的剩余生产化工作，社区讨论 16 条评论，关注 gateway 权威、统一 runner 与跨 gateway 传输如何与 Desktop 关闭生命周期正确衔接。 | [链接](https://github.com/NousResearch/hermes-agent/issues/97681) |
| 3 | **#99270 MCP 客户端将数组元素包装为 {item: …}** | P2 | 修复 #99290 还未合入前，该 bug 会破坏**所有数组类型工具参数**（handlerIds、assigneeIds、ids 等），影响面极广。 | [链接](https://github.com/NousResearch/hermes-agent/issues/99270) |
| 4 | **#86798 ACP 适配器在 turn 中断时崩溃** | P2 | `AttributeError: 'NoneType' object has no attribute 'startswith'` 会让排队提示永远不被消费，暴露在 JSON-RPC -32603 错误下，影响所有取消/排队语义。 | [链接](https://github.com/NousResearch/hermes-agent/issues/86798) |
| 5 | **#76590 MCP OAuth Token 在瞬时连接失败时被误删** | P2 | 涉及安全/可用性副作用：Composio 等 OAuth MCP 的 token 不仅在 `mcp remove/login` 时清除，**瞬时连接失败也会触发删除**，导致鉴权态丢失。 | [链接](https://github.com/NousResearch/hermes-agent/issues/76590) |
| 6 | **#100748 ci.yaml 解析失败阻断全部分支** | P1 | 自 24f5a60 提交起，`.github/workflows/ci.yaml` 第 126 行 `${{ ... }}` 未闭合，**所有 workflow（含不相关 PR）解析即失败**，是当日最具阻塞性的工程问题。 | [链接](https://github.com/NousResearch/hermes-agent/issues/100748) |
| 7 | **#100762 bare `/refine` 在 background_review 关闭时被静默丢弃** | — | 破坏 #87250 既有合约：用户给出 `/refine`（无 focus 文本）后 handler 仍回复"Reviewing…"但**没有任何 review fork 启动**，构成静默失败。 | [链接](https://github.com/NousResearch/hermes-agent/issues/100762) |
| 8 | **#100747 Windows 下 Ctrl+C 在 TUI 退出后成为无操作** | P2 | 平台特异性严重问题：SIGINT handler 被静默 no-op 替换后未恢复，导致 Windows 下**CLI 进程无法被 kill**，属 unkillable 级别的可用性 bug。 | [链接](https://github.com/NousResearch/hermes-agent/issues/100747) |
| 9 | **#79698 内存路由不对称（内置 MEMORY.md 获 ~300 词引导，外接 fact_store 仅 4 行）** | P3 | 系统提示对内置存储与外接 provider 引导强度差异巨大，导致 MEMORY.md 早早写满，**事实上架空 memory provider 能力**。 | [链接](https://github.com/NousResearch/hermes-agent/issues/79698) |
| 10 | **#9673 重启后恢复中断任务** | P3 | 长期高呼声需求：希望 Hermes 在重启后扫描近期聊天、自主判断是否恢复未完成任务。讨论 2 条评论，体现社区对**自主韧性**的期待。 | [链接](https://github.com/NousResearch/hermes-agent/issues/9673) |

---

## 四、重要 PR 进展

| # | PR | 关键变更 | 链接 |
|---|----|----------|------|
| 1 | **#100757 修复 CI 中 disabled desktop 条件（紧急）** | 还原 GitHub expression 的正确闭合，保持 Desktop E2E job 禁用并保留既有变更检测；**用于解除 #100748 引发的主分支阻塞**。 | [链接](https://github.com/NousResearch/hermes-agent/pull/100757) |
| 2 | **#100767 api_server 改用共享 SessionDB registry** | 移除 API server 私有的长生命周期 `SessionDB` writer，避免同一 `state.db` 被多 writer 并发访问，与进程级共享 registry 对齐。 | [链接](https://github.com/NousResearch/hermes-agent/pull/100767) |
| 3 | **#100758 Bot Mode：CLI 与 Telegram profile 编排** | 把 Desktop 风格 Bot Mode 编排下沉到无头 Hermes 表面，新增 `hermes bots` 子命令、确定性 `$Bot1 $Bot2` 调用、跨表面 profile 治理。 | [链接](https://github.com/NousResearch/hermes-agent/pull/100758) |
| 4 | **#100764 原生多模态音频/语音路由（替代 #90206）** | 基于 `models.dev` 元数据，在 messaging gateway 内对语音消息做 session-aware 路由，Gemini/GPT-4o-audio 等支持音频输入的模型可直收语音。 | [链接](https://github.com/NousResearch/hermes-agent/pull/100764) |
| 5 | **#100765 Desktop：补齐 Wayland 剪贴板图片读取** | 保留 Electron 原生 + WSL 兜底；新增 Wayland 下 `wl-paste` 兜底（PNG 签名校验 + 失败安全），覆盖 Linux 桌面常见漏读。 | [链接](https://github.com/NousResearch/hermes-agent/pull/100765) |
| 6 | **#100766 Google Meet 实时扬声器：修正服务器事件名** | 修正 realtime speaker 监听的 `response.output_audio.delta` 事件名，让生成的音频真正被解码并写入 PCM。 | [链接](https://github.com/NousResearch/hermes-agent/pull/100766) |
| 7 | **#100759 Google Meet bot：清理注册改用 on_session_finalize** | 修复"每个 agent turn 结束就杀掉 Meet bot"的回归，改为 session finalize 阶段清理。 | [链接](https://github.com/NousResearch/hermes-agent/pull/100759) |
| 8 | **#99290 解包单 key 字典为标量数组参数** | 修复 `coerce_tool_args()` 将 `{"item": 14}` 盲包为 `[{"item": 14}]` 的 bug，**配套修复 #99270**。 | [链接](https://github.com/NousResearch/hermes-agent/pull/99290) |
| 9 | **#99830 停止向 Nous endpoint 发送 provider 路由对象** | 修复 Nous Portal 反复 HTTP 400：避免把 OpenRouter-only 的 `provider` 路由参数转发到 Nous 端点。 | [链接](https://github.com/NousResearch/hermes-agent/pull/99830) |
| 10 | **#68499 委派：将子进程生命周期与任务结果解耦** | 把"子进程是否还活着"和"任务是否成功"分离，同步/异步完成路径统一携带 fail-closed 证据，TUI/Desktop 端不再误显示绿色成功。 | [链接](https://github.com/NousResearch/hermes-agent/pull/68499) |

> 此外值得关注：#100761 修复 SSH 后端对 BSD/macOS 远端的 4 个独立 bug；#100756 让 Desktop Agent Plugins 复用一个共享 profile scope；#92192 完成 i18n 印尼语三件套（README/CONTRIBUTING/SECURITY）。

---

## 五、功能需求趋势

从近 24 小时更新及历史活跃 Issue 提炼，社区最集中的诉求方向为：

1. **Bot / Agent 持久化与会话韧性**（#97681、#9673、#100762、#100758）
   - 围绕"Bot 在不同宿主/重启后仍能工作"、"中断任务可恢复"等长期愿景，bot profile 编排与会话生命周期成为核心话题。

2. **多模态输入与语音/音频链路**（#100764、#100766、#100759）
   - 从 Google Meet 实时音频解码到 gateway 侧的多模态路由，社区正系统化补齐"语音即一等公民"的能力。

3. **MCP 工具调用健壮性**（#99270、#76590、#99290）
   - 工具参数编组、OAuth 凭据生命周期是当前最实际的集成痛点。

4. **状态层可靠性**（#98077、#100767）
   - SQLite WAL 下的物理损坏 + 多 writer 风险，促使社区重新审视 state.db 写入路径与共享 registry 的一致性。

5. **跨平台一致性**（#100747、#100761、#89432、#100765）
   - Windows（Ctrl+C 不可杀）、macOS（`/tmp` 别名）、Wayland（剪贴板）、BSD（SSH）多平台兼容性问题集中出现。

6. **可观测性与失败语义**（#68499、#79698）
   - 委派结果/内存路由等"看起来成功实际失败"的灰色地带正在被社区系统化梳理。

7. **CI/CD 与发布工程**（#100748、#100757、#100763）
   - 一次回归式 YAML 错误即可阻塞全部分支，反映 CI 防护的脆弱性，引发对工作流表达力/校验的关注。

---

## 六、开发者关注点

1. **静默失败最危险**：bare `/refine`、Windows 下不可杀进程、MCP OAuth token 误删、ACI 排队消息不消费——多个高影响 bug 都以"看似正常实则不工作"形式出现。社区呼唤更明确的失败可见性（**fail-closed 证据**、TUI/Desktop 不再误显绿色成功）。

2. **CI 即公共品**：`ci.yaml` 解析错误让所有 PR 失败，#100758 快速响应说明社区对**工作流回归的容忍度极低**。建议对 workflow 文件加最小化 pre-commit / lint 校验。

3. **平台碎片化代价高**：Windows/macOS/Linux/WSL/Wayland/BSD 各有边缘 case，开发者反馈中常出现"文档说支持，但某平台就是跑不通"的挫败感（SSH macOS、Ctrl+C、macOS `/tmp` 别名、Wayland 剪贴板）。**单一 code path 在多平台下的行为分裂**是反复出现的高频痛点。

4. **Bot / Profile 模型抽象仍欠统一**：Bot Mode 想要在 Desktop、CLI、Telegram 之间复用 profile 编排（#100758），但目前 settings/agent plugin 仍有重复 scope（#100756），记忆路由也未对齐 provider 抽象（#79698）。**统一的"profile 即隔离单元"心智模型**被反复暗示。

5. **MCP 工具参数契约薄弱**：单 key dict 包裹数组（#99270）揭示模型输出 → schema 校验 → 工具调用之间缺乏强校验，开发者希望在工具边界做更严格的 coerce 与更清晰的报错。

6. **文档与国际化是"软基建"**：印尼语三件套（#92192）显示社区正在系统推进 i18n，但与代码侧修复相比，**文档缺位仍是阻碍新贡献者的现实门槛**。

---

*日报由 Hermes 社区动态自动汇总生成。如需订阅特定 Issue/PR，请关注 GitHub 通知。*

</details>
