---
title: "AI CLI 工具社区动态日报"
published: 2026-09-18
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-18

> 生成时间: 2026-09-18 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-18）

## 1. 生态全景

当前 AI CLI 工具正处于“功能快速扩张”与“稳定性承压”并行的阶段：头部工具（Claude Code、OpenAI Codex）社区讨论热度极高，但高频痛点集中在会话数据一致性、Token 成本透明度、Windows 平台兼容性等基础体验上；Gemini CLI、Hermes、DeepSeek Reasonix 则通过密集的 PR 修复和版本迭代，试图在 Agent 可靠性与工具链扩展性上建立差异化优势。整体来看，各工具都在向可编程、可观测、可管控的方向演进，但尚未有单一产品在稳定性与生态成熟度上形成绝对领先。

## 2. 各工具活跃度对比

| 工具 | 活跃 Issues（精选） | 活跃 PRs | Release 情况 |
|------|--------------------|----------|---------------|
| Claude Code | 10 | 3 | v2.1.275、v2.1.274 |
| OpenAI Codex | 10 | 10 | rust-v0.155.0（含多个 alpha） |
| Gemini CLI | 10 | 10 | v0.62.0-nightly.20260917 |
| DeepSeek Reasonix | 10 | 10 | studio-v2.18.1、v2.18.0 |
| OpenCode | 10 | 10 | 未提及 |
| DeepSeek Harness | 0 | 0 | dsh-v0.1.6-alpha.2 |
| Hermes | 10 | 10 | 无新版本 |

> 注：上表“活跃 Issues/PRs”为各日报中精选的优质/有动态条目数量，并非仓库全量当日变更数。

## 3. 共同关注的功能方向

### ① 会话生命周期与数据可靠性
- **Claude Code**：会话移交/连续性（#11455）、远程控制会话在本地不可见（#95231）。
- **Gemini CLI**：会话恢复时重复重放工具响应（#29366）、`/compress` 跨会话不持久（#21335）。
- **DeepSeek Reasonix**：新建会话覆盖旧记录（#10454）、幽灵会话无法删除（#10416）、会话错误影响全局（#10337）。
- **Hermes**：桌面 clarify 事件在传输路由中丢失（#98503）、会话事件静默丢失。

**解读**：多个工具都出现“会话丢失/覆盖/无法恢复”类问题，数据完整性已成用户信任的核心门槛。

### ② 上下文与 Token 成本优化
- **Claude Code**：禁用工具仍消耗约 20k token（#83363）、MCP schema 持续消耗 token（#92255）。
- **Gemini CLI**：AST 感知的文件读取/搜索以减少 token 噪声（#22745）。
- **DeepSeek Reasonix**：Agent 选择折叠调查过程的 span folding（#10473）。
- **OpenCode**：会话成本不包含子代理开销（#45417）；3 分钟消耗 38% 配额（#49625）。
- **Hermes**：按会话的累计 token 预算（#91713）；凭证池不恢复导致持续付费 fallback（#114501）。

**解读**：用户已不满足于“能用”，而是要求成本可量化、可控制、可预警。隐性 token 消耗会成为付费用户流向的重要考量。

### ③ MCP / 工具生态的稳定与开放
- **Claude Code**：新增 MCP 启动等待配置；MCP 工具 schema 消耗 token。
- **OpenAI Codex**：MCP 工具在非 OpenAI 服务商下不可用（#26234）。
- **Hermes**：MCP 服务器连接后 60-90 秒断连（#103746）。
- **OpenCode**：插件系统开放会话表单、事件流（#46690）；本地 LAN Provider 自动发现（#27554）。

**解读**：MCP 已成为各工具的标准扩展协议，但实现成熟度和跨提供商兼容性仍远未统一，第三方开发者在接入时需要额外处理边界情况。

### ④ Windows 平台稳定性
- **Claude Code**：Windows 桌面启动失败（HRESULT 0x80070020，5 个月未修复）。
- **OpenAI Codex**：Windows 沙箱 ACL 状态文件损坏（#45302 及系列问题）。
- **DeepSeek Reasonix**：Windows 安装目录 AppContainer 授权导致窗口打不开；更新后整个工具不可用（#10453）。
- **Hermes**：Linux 后端更新导致 Windows GUI 停止工作（#113683）。

**解读**：多个工具在 Windows 上集中暴露崩溃、沙箱、权限模型等系统级问题。Windows 开发者应优先选择有明确修复承诺的工具版本。

### ⑤ 可扩展性与插件机制
- **Claude Code**：函数钩子（function hooks）官方承诺“数周内”落地（#91870）。
- **OpenCode**：插件 API 能力扩展（#46690），新增社区记忆插件（#49632）。
- **DeepSeek Reasonix**：插件管理页支持实时启用/禁用；CLI 增加 vi 命令模式（#10367）。
- **Hermes**：统一包管理器（#102765）整合工具安装与依赖准备。
- **Gemini CLI**：社区呼吁提升 Skills 和子代理的自主调用率（#21968）。

**解读**：各工具都在构建自己的扩展生态，但“可扩展”不只是 API 开放，还包括插件生命周期、配置可发现性和安全边界。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|----------|
| **Claude Code** | 企业级交互、hooks 扩展、网关安全 | 深度集成 GitHub 工作流的专业开发者 | 以稳定 CLI 为核心，通过 hooks/plugins 延展能力，强调官方路线图 |
| **OpenAI Codex** | 快速跟进新模型能力、TUI 交互、桌面端 | OpenAI 生态重度用户 / Pro 订阅者 | 以 OpenAI 云端服务为中心，逐步引入 OAuth 网关、MCP，但第三方服务商支持仍不成熟 |
| **Gemini CLI** | Agent 子代理可靠性、PTY 终端稳定性 | 需要复杂自主任务的开发者 | 强化 Agent 执行的可信度（如修复误报成功），同时补齐 Windows/终端底层细节 |
| **DeepSeek Reasonix** | Studio + CLI 配合的多模态/多模型接入 | DeepSeek 模型用户、偏好本地/自托管 | 版本迭代激进，重视插件管理、TUI 增强，但数据完整性和发版质量是当前短板 |
| **OpenCode** | 开源、多提供商、插件生态 | 注重成本透明和本地模型接入的开发者 | 社区驱动，优先修复 TUI 性能和成本统计，通过插件开放核心会话能力 |
| **DeepSeek Harness** | 文件审阅、插件管理、浏览器模式 | DeepSeek 开发工具链使用者 | 相对平静，专注核心工作流完善，无高风险争议 |
| **Hermes** | 网关化、多后端 fallback、凭证与配额管理 | 需要多渠道消息接入和成本护栏的团队 | 以 gateway 为核心构建可靠事件投递，强化 ACP / cron / 凭证池等后端能力 |

## 5. 社区热度与成熟度

- **Claude Code**：社区讨论最热烈（单 issue 评论达 195，👍 120），但 PR 更新仅 3 个，官方回应偏审慎，属于“高关注、低合并频率”阶段。用户基础大，期望管理压力明显。
- **OpenAI Codex**：Issue 与 PR 双高，且 PR 覆盖领域广（沙箱、OAuth、TUI、压缩容错），迭代速度较快。但容量错误、沙箱故障等高频问题显示其稳定性尚未跟上功能扩张。
- **Gemini CLI**：今日 PR 密集且多直接针对 P1 级痛点（子代理误报、ConPTY 挂起、重复工具响应），修复响应积极，处于快速进化期。社区体量中等，但问题聚焦度高。
- **DeepSeek Reasonix**：版本发布频繁，但多个 issue 指向“更新后出现新问题”，社区满意度可能因数据丢失类 bug 而受损。属于激进迭代、质量治理尚未同步的阶段。
- **OpenCode**：社区活跃且维护者响应迅速（多条修复 PR 已在当日提交），但免费层误报、上游服务稳定性等暴露其云服务链路还不够成熟。
- **DeepSeek Harness**：24 小时无新增 Issue/PR，处于相对平静期，从 Release 看仍在按计划完善功能，但社区声量较小。
- **Hermes**：PR 数量多且偏架构性（unified package manager、gateway 可靠性），呈积极建设态势；但 issue 依然集中在网关、桌面和配置可发现性，尚处于专业用户为主的阶段。

## 6. 值得关注的趋势信号

1. **可扩展性成为官方路线图的必选项**：Claude Code 首次明确函数钩子发布时间窗口，OpenCode 和 Hermes 都在往插件/包管理方向投入。对开发者而言，选择工具时需评估其扩展机制是否有官方长期承诺，而非仅依赖自定义维护。

2. **会话数据完整性是信任基石，也是当前最大雷区**：DeepSeek Reasonix 的会话覆盖、Claude Code 的会话移交缺失、Gemini 的恢复重放等问题说明：一旦 Agent 成为日常工作入口，历史记录的可靠性和可迁移性就是硬性要求。开发者应定期导出或快照关键会话。

3. **成本透明化与护栏将从“可选”变为“必需”**：多个工具出现“隐藏 token 消耗”“子代理成本未计入”“单会话千万 token 事故”等反馈。未来 6-12 个月，具备细粒度用量统计和预算中断能力的工具将更受企业青睐。

4. **Windows 平台体验成为新的竞争分水岭**：Claude Code、Codex、Reasonix、Hermes 均在 Windows 上暴露了不同层级的稳定性问题，说明跨平台支持仍被低估。Windows 专业用户在选择 AI CLI 时应特别关注沙箱、进程管理和文件系统权限方面的已知问题。

5. **第三方模型/MCP 兼容性需求上升，但实现普遍不成熟**：Codex 的 MCP 命名空间问题、OpenCode 的本地 LAN Provider 提议，都指向开发者对“避免供应商锁定”的强烈诉求。工具能否提供干净的第三方接入层，将影响其渗透本地/私有化部署市场。

6. **Agent 自主行为需要更强的可观测性和安全护栏**：Gemini 子代理误报成功、Hermes 出现 bot 循环大量消耗 token、Claude Code 社区讨论批量 PR 风险，说明 Agent 结果的可信度和自动化操作的风险控制，已成为专业用户关注的共性问题。未来可重点观察各工具的审计日志、权限拦截和循环检测升级。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据范围**：anthropics/skills 官方仓库 | **统计截止**：2026-09-18

> 数据说明：PR 按评论数排序，但评论数字段缺失（undefined），以下排行综合了 PR 排序位置、更新活跃度与讨论集中度。所有上榜 PR 当前均为 **OPEN** 状态，仓库整体合入节奏较慢。

---

## 1. 热门 Skills 排行（Top 8）

### 🛠 #1298 skill-creator 触发器评估修复 — 社区最关注的基础设施修复
- **功能**：隔离触发器评估，修复 Windows 平台的 `select()` 管道失败、无关工具中断扫描等问题；避免运行时故障被误判为"非触发"导致负样本评估失真。
- **热点**：skill-creator 是官方 Skill 生成工具，其触发器检测准确性直接影响所有 Skill 的命中率。同主题修复还有 #1769（0% recall 误报）和 #539（YAML 特殊字符校验），三条 PR 形成"修复集群"，说明该工具缺陷已严重阻碍社区创作。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1298

### ⛓ #1771 proofcore-contract-auditor — Web3 智能合约审计
- **功能**：对 Solidity/Rust 智能合约做静态分析，并将审计密码学证明锚定到 TON 区块链（零存储 Merkle 协议）。
- **热点**：当前仓库少见的新领域——将 Agent Skill 与区块链公证结合，代表社区在"可验证审计"方向的探索。9 月中旬创建后持续更新，热度上升快。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1771

### 🎬 #1703 md2video-audio — Markdown 一键生成配音视频
- **功能**：零成本将 Markdown 经 Marp 转幻灯片，再合成带真人语音的 MP4 视频。
- **热点**：切中内容生产痛点——用 Claude 直接产出"可分发视频"而非文档，对教程、汇报类场景吸引力大。9 月创建后保持更新。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1703

### 🔌 #1742 mcp-builder 修复 — MCP 生态关键兼容补丁
- **功能**：适配 `mcp>=2.0` 的 `streamable_http_client` 重命名，并支持自定义 HTTP 头。
- **热点**：mcp-builder 是连接 Claude 与外部工具链的桥梁，修复直接解除 MCP 2.x 升级阻塞。关联 issue #1668，属于"不改就不能用"的硬修。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1742

### 👾 #525 pyxel — Python 复古游戏开发
- **功能**：引导 Agent 完成 Pyxel 游戏的实现、调试与验证，支持确定性无头运行和逐帧检查。
- **热点**：仓库中存活最久的新 Skill PR 之一（3 月提交，9 月仍在更新），社区对"创意编码 + 可验证执行"的组合持续关注，但半年未合并也暴露了审核瓶颈。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/525

### 📐 #514 document-typography — AI 生成文档的排版质检
- **功能**：修复 AI 文档的孤词换行（1–6 词溢出）、标题悬挂在页尾、编号错位等排版问题。
- **热点**：指出"每个 Claude 生成的文档都有排版缺陷"，是少见的**面向输出质量而非功能**的 Skill，直击用户体验痛点。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/514

### 🧠 #1628 Hivemind — 零成本多智能体编排
- **功能**：让 Claude Code 作为唯一规划/审查者，将机械性工作委派给跑免费模型的无头 opencode 子代理。
- **热点**："贵模型上下文是稀缺资源"——直指成本优化核心矛盾，被社区视为在保留 Claude 决策能力的同时摊薄成本的代表性方案。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1628

### 📱 #1627 buffer-api — 社交排程通用 Agent Skill
- **功能**：封装 Buffer GraphQL API，支持从任何 AI Agent（Claude/Cursor/Codex/n8n 等）调度社交帖子。
- **热点**：主打"跨 Agent 可移植"，意味着 Skill 不再只服务于 Claude，向开放生态标准演进。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1627

---

## 2. 社区需求趋势（来自 Issues）

### 🔒 安全与信任边界 — 最强烈的呼声（43 评论）
- **#492**：社区 Skill 被放入 `anthropic/` 命名空间分发，冒充官方 Skill，形成信任边界漏洞——用户可能将高权限授予"看起来官方"的社区技能。这是当前社区第一关切。
- 🔗 https://github.com/anthropics/skills/issues/492

### 📤 组织级共享与分发
- **#228**：用户希望 Skill 能像其他资产一样在组织内直接共享，而非手动下载文件、经 Slack 传递、再逐个上传。获 👍 8 个，协作诉求明确。
- 🔗 https://github.com/anthropics/skills/issues/228

### 🧪 评估与触发可靠性 — 官方工具的可信度危机
- **#556**：`run_eval.py` 用 `claude -p` 测试时 **0% 触发率**，所有查询都不命中 Skill 描述，评估链路整体失效（12 评论，👍 7）。
- **#1390**：`evaluation.py` 对任何真实 MCP 服务器均静默构造工具错误，评分恒为 0/N，且失败不可见（4 评论）。
- 🔗 https://github.com/anthropics/skills/issues/556 | https://github.com/anthropics/skills/issues/1390

### 🧮 上下文窗口效率
- **#1487**：`claude-api` Skill 单次调用即注入约 156k tokens，直接挤爆上下文窗口（4 评论）。
- **#1329**：compact-memory 提案——用符号化记法压缩长期 Agent 的持久记忆，减少"文档式笔记"占用（9 评论）。
- 🔗 https://github.com/anthropics/skills/issues/1487 | https://github.com/anthropics/skills/issues/1329

### 🧭 Agent 治理
- **#412**：agent-governance 提案——策略执行、威胁检测、信任评分与审计追踪，聚焦 AI Agent 系统的安全模式（6 评论）。
- 🔗 https://github.com/anthropics/skills/issues/412

### ♻️ 插件管理混乱
- **#189**：`document-skills` 与 `example-skills` 两个插件包含完全相同的 Skill，安装后产生重复，浪费上下文。获 👍 9 个（全部 Issues 中最高）。
- 🔗 https://github.com/anthropics/skills/issues/189

### 趋势小结
社区最期待的新方向集中在：**安全治理、组织级共享、评估工具修复、上下文瘦身**——即"让 Skill 体系本身可靠、可信、可协作"，而非单纯新增业务类 Skill。文档类（ODT、DOCX 修复）虽是 PR 主力，但 Issues 热度明显低于上述系统性问题。

---

## 3. 高潜力待合并 Skills

所有观察 PR 均为 OPEN，以下按"落地概率"综合排序：

| Skill | 判断依据 | 链接 |
|---|---|---|
| **mcp-builder v2 兼容修复 #1742** | 硬阻塞型修复，上游 mcp 库升级后不改即坏，合入优先级最高 | [PR #1742](https://github.com/anthropics/skills/pull/1742) |
| **skill-creator 触发器修复 #1298** | 官方工具缺陷引发多条连锁 PR（#1769/#539），修复集群已形成合流压力 | [PR #1298](https://github.com/anthropics/skills/pull/1298) |
| **pyxel #525** | 6 个月持续更新、方向成熟（可验证的游戏开发），生命力最强的新 Skill | [PR #525](https://github.com/anthropics/skills/pull/525) |
| **md2video-audio #1703** | 需求直观、零成本、演示效果强，近期更新活跃 | [PR #1703](https://github.com/anthropics/skills/pull/1703) |
| **Hivemind #1628** | 成本优化叙事契合当下 Agent 规模化痛点，概念新颖 | [PR #1628](https://github.com/anthropics/skills/pull/1628) |
| **proofcore-contract-auditor #1771** | Web3 垂直场景 + 链上公证，差异化明显，新近提交热度上升 | [PR #1771](https://github.com/anthropics/skills/pull/1771) |

> ⚠️ 观察：长期未合并不代表被拒——#525、#514 均已存活超 6 个月且仍被更新，更像审核队列积压或官方对合入标准从严。若想推动落地，社区需在对应 PR 下持续制造讨论声量。

---

## 4. Skills 生态洞察

**一句话总结**：当前社区在 Skills 层面最集中的诉求，不是"更多新技能"，而是**技能体系自身的可靠性、安全性与分发效率**——具体表现为：① skill-creator/mcp-builder/run_eval 等官方工具链的评估与触发缺陷（0% 触发、0/N 评分、156k token 注入）；② 命名空间冒用与信任边界漏洞（#492）；③ 组织级共享与插件去重（#228/#189）。

换言之，社区正处于"从能用走向好用"的基建期：先修好造技能的工具、守住技能分发的信任底线，再谈规模化扩展。

---

# Claude Code 社区动态日报

**日期：2026-09-18** | 数据来源：github.com/anthropics/claude-code

---

## 1. 今日速览

昨日发布 v2.1.275 与 v2.1.274 两个版本，新增网关签名账户确认、发送快捷键、内存告警及 MCP 启动等待配置等能力。社区层面，围绕“函数钩子（hooks）扩展性”的 #91870 以 195 条评论持续高烧，成为当前最受瞩目的功能议题；同时，大量 7 月创建的旧 Issue 被批量关闭（标注 stale），但 Windows 桌面崩溃、会话连续性等核心痛点仍未解决。

---

## 2. 版本发布

### v2.1.275
- **网关签名账户确认**：Claude Apps 网关登录时将展示签名账户名称，用户确认后才保存凭证，`/status` 命令同步展示账户信息。
- **新增“立即发送”快捷键**：`Ctrl+Enter` 或 `Ctrl+X Ctrl+S` 可中断当前回合并立即发送所有排队消息。

🔗 [查看 Release](https://github.com/anthropics/claude-code/releases)

### v2.1.274
- **内存临界告警**：当内存使用达到临界值时显示可见警告，并提供释放内存或安全重启的操作指引。
- **新增 `CLAUDE_CODE_MCP_STARTUP_WAIT_MS`**：限制首个非交互回合等待 MCP 服务器连接的时间上限（设为 `0` 表示不等待）。
- **为 `claude` 命令新增 `effort` 属性**（内容截断，完整说明见 Release 页面）。

🔗 [查看 Release](https://github.com/anthropics/claude-code/releases)

---

## 3. 社区热点 Issues（10 个精选）

### 🔥 最热议题

#### 1. [#91870 Mods - make Claude 10x more extensible](https://github.com/anthropics/claude-code/issues/91870)
- **类型**：功能增强（hooks/plugins） | **状态**：OPEN
- **评论 195** | 👍 120 | 更新于 2026-09-17
- **为什么重要**：社区呼声最高的扩展性提案。官方已在评论中确认“函数钩子（function hooks）”将在数周内（而非数月）落地，并感谢社区的高信号反馈。这是近期最明确的官方路线图信号。

#### 2. [#53247 Claude Desktop Windows 启动失败（HRESULT 0x80070020）](https://github.com/anthropics/claude-code/issues/53247)
- **类型**：Bug（Windows/Desktop） | **状态**：OPEN
- **评论 93** | 👍 33 | 更新于 2026-09-17
- **为什么重要**：影响严重的平台性 Bug。应用崩溃后遗留孤儿 Silo/Job Object，只有注销或重启才能恢复。持续近 5 个月未修复，Windows 用户受影响面大。

#### 3. [#11455 Feature Request: Session Handoff / Continuity Support](https://github.com/anthropics/claude-code/issues/11455)
- **类型**：功能增强（core） | **状态**：OPEN
- **评论 36** | 👍 25 | 更新于 2026-09-17
- **为什么重要**：会话移交/连续性支持的诉求。CLI 会话无法在不同机器或时间点之间无缝衔接，是专业开发者的高频需求。

#### 4. [#25128 VS Code 扩展聊天面板拖放失效](https://github.com/anthropics/claude-code/issues/25128)
- **类型**：Bug（macOS/IDE） | **状态**：OPEN
- **评论 33** | 👍 48 | 更新于 2026-09-17
- **为什么重要**：终端 CLI 中拖放正常，但 VS Code 扩展面板完全失效，自 v2.1.6 起回归且长期未修复。👍 数达 48，IDE 集成体验问题关注度极高。

#### 5. [#81081 会话启动技能列表静默截断](https://github.com/anthropics/claude-code/issues/81081)
- **类型**：Bug（documentation/reproduced） | **状态**：OPEN
- **评论 11** | 👍 0 | 更新于 2026-09-17
- **为什么重要**：技能描述在大小预算下被静默截断，导致用户无法看到完整能力说明。直接影响可发现性和上手体验。

### 值得关注

#### 6. [#93156 浏览器面板无法授予持久站点权限](https://github.com/anthropics/claude-code/issues/93156)
- **类型**：功能增强（Windows/权限） | **状态**：OPEN
- **评论 6** | 更新于 2026-09-17
- **为什么重要**：浏览器面板每次操作都弹出“仅允许一次”，即使配置了 `launchPreviewAllowedOrigins` 和 `bypassPermissions` 也无济于事。权限模型的精细化是桌面端核心痛点。

#### 7. [#94225 ECONNRESET：ISP 路径上 TLS 1.3 握手被重置](https://github.com/anthropics/claude-code/issues/94225)
- **类型**：Bug（macOS/网络） | **状态**：OPEN
- **评论 2** | 更新于 2026-09-17
- **为什么重要**：特定 ISP 路径下，携带 X25519MLKEM768 密钥交换的 TLS 1.3 握手被 Anthropic 入口重置，经典密钥交换或 VPN 则完全正常。涉及后量子加密兼容性问题，网络环境复杂的企业用户可能中招。

#### 8. [#95231 远程控制会话在本地 /resume 选择器中不可见](https://github.com/anthropics/claude-code/issues/95231)
- **类型**：Bug | **状态**：OPEN（新提交）
- **评论 1** | 👍 1 | 创建于 2026-09-17
- **为什么重要**：通过 `claude remote-control` 启动的会话被 `entrypoint=sdk-cli` 过滤，导致用户在本地无法恢复这些会话。新提交即获得关注，说明远程协作工作流正在普及。

#### 9. [#93680 Bash 工具通过 /proc/self/fd 创建会话目录失败](https://github.com/anthropics/claude-code/issues/93680)
- **类型**：Bug（Linux/Bash） | **状态**：OPEN
- **评论 1** | 更新于 2026-09-17
- **为什么重要**：v2.1.263 回归：Bash 工具使用 `/proc/self/fd/N/` 而非 `mkdirat()` 创建会话目录，在 procfs 缺失或不完整的环境（容器、沙箱）中直接失败。

#### 10. [#92255 禁用所有连接器后 MCP 工具 schema 仍消耗上下文 token](https://github.com/anthropics/claude-code/issues/92255)
- **类型**：Bug（macOS/MCP） | **状态**：OPEN
- **评论 1** | 更新于 2026-09-17
- **为什么重要**：同类问题 #83363（禁用工具浪费约 20k token/会话）也处于开放状态。Token 浪费直接影响成本和上下文质量，是重度用户反复提及的优化点。

---

## 4. 重要 PR 进展

> 注：过去 24 小时仅 3 个 PR 有更新，以下全部列出。

#### 1. [#95198 mods/diff: 将 openPane 返回值类型放宽为 unknown](https://github.com/anthropics/claude-code/pull/95198)
- **作者**：@poteat | **状态**：OPEN
- **内容**：`$.ui.open` 即将返回一个结果对象，将 `openPane` 的声明类型由 `Promise<void>` 调整为 `Promise<unknown>`，兼容当前与下版引擎类型。无调用方读取该值，行为不变。
- **意义**：为 UI 系统升级做准备，属于前瞻性类型修正。

#### 2. [#94847 diff: 首次编辑仅在存在可列文件时打开面板](https://github.com/anthropics/claude-code/pull/94847)
- **作者**：@bcherny | **状态**：OPEN
- **内容**：修复 diff 面板在首次编辑后总是自动打开的问题——当写入发生在仓库外、忽略文件或不同 worktree 时，原逻辑会显示空面板（“No tracked changes”）。现在仅在确有文件可列时打开。
- **意义**：消除无意义的面板弹出，改善 TUI 使用体验。

#### 3. [#87077 fix(pr-review-toolkit): 修复所有 agent 的 YAML frontmatter 格式错误](https://github.com/anthropics/claude-code/pull/87077)
- **作者**：@anishsamant | **状态**：OPEN（已更新）
- **内容**：所有 agent 的 description 使用未加引号的标量内嵌 `Daisy: "..."` 这类对话，被 YAML 解析为嵌套映射导致 frontmatter 失效。修复后 agent 可正确加载 name/description/model。
- **意义**：典型的“差一个引号导致静默失败”问题，修复具有普适价值。

---

## 5. 功能需求趋势

从近期 Issues 中提炼出社区最关注的五大方向：

### ① 扩展性：Hooks / 插件系统（热度最高）
- #91870 以 195 条评论成为焦点，官方承诺“数周内”交付函数钩子。
- 大量基于 `Stop`/`PreToolUse` 等钩子的自定义实践涌现（如 #79542 TTS 朗读），说明社区对钩子机制有旺盛需求。

### ② 会话生命周期管理
- #11455 会话移交/连续性：跨设备、跨时间恢复会话。
- #95231 远程控制会话在本地不可见：`/resume` 的过滤逻辑引发讨论。
- 社区期望更灵活的会话导出（#79391 `/export` 为 HTML）、临时指令（#79381 `/nudge`）等能力。

### ③ 上下文与 Token 效率
- #83363 禁用工具仍浪费约 20k token、#92255 MCP schema 持续消耗 token、#85169 上下文保留/Tool-Result 驱逐——Token 管理成为高频吐槽点。
- 与模型成本（#79478 Fable 计费问题）交织，用户对“看不见的消耗”尤其敏感。

### ④ IDE / 桌面集成深化
- VS Code 扩展的拖放（#25128）、内联图片渲染（#79436）、MCP 推送通知（#79311）——桌面端与 CLI 的功能对齐是持续诉求。
- 浏览器面板的权限模型（#93156）需要“始终允许”等持久化选项。

### ⑤ 平台支持与稳定性
- Windows Desktop 启动崩溃（#53247）连续 5 个月未修复，是平台稳定性最大痛点。
- Linux 下的 procfs 依赖问题（#93680）、Arch Linux 官方支持（#79296）显示非主流平台的适配需求仍在积累。

---

## 6. 开发者关注点

### 高频痛点

| 痛点 | 相关 Issue | 影响 |
|------|-----------|------|
| **Windows 桌面端稳定性** | #53247 | 崩溃后需重启系统才能恢复，严重影响工作流 |
| **上下文 Token 隐性浪费** | #83363, #92255 | 每会话损失约 20k token，增加成本并缩短有效上下文 |
| **VS Code 扩展功能滞后** | #25128, #79436 | CLI 已支持的功能在 IDE 中缺失或回归 |
| **权限系统过于细碎** | #93156 | 每次操作都需确认，无法持久化授权 |

### 观察与洞察

1. **“闭门清理”引发关注**：7 月 20 日创建的近 30 个 Issue 在昨日被批量标记 `stale` 并关闭（如 #79296、#79304、#79381 等），其中部分（如 #79381 `/nudge` 获 👍 6）仍具价值。社区可能对“旧 Issue 被无差别清理”产生反弹，值得持续观察。

2. **安全护栏讨论升温**：#79399（agent 批量创建 91 个 PR 导致仓库锁定）虽已关闭，但 agent 自动化操作的防护机制仍是企业用户的隐忧。

3. **新模型 / 模型切换的“隐藏成本”**：#79478 显示用户对模型切换的计费范围理解存在歧义，官方需在 UI/文档层面明确“会话级 vs 任务级”的语义。

4. **网络与加密兼容性**：#94225 指向后量子密钥交换（X25519MLKEM768）在特定 ISP 路径上的互操作问题，随着 PQ 加密推广，此类问题可能增多。

---

*本日报由 AI 自动生成，基于 GitHub 公开数据整理，仅供参考。*
*数据窗口：2026-09-17 至 2026-09-18（UTC）*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-09-18）

## 1. 今日速览

Codex CLI 发布 rust-v0.155.0，引入实验性 `/voice` 语音对话能力，并在 TUI 中新增实时推理摘要与完成时间戳显示。社区层面，模型容量错误（#28507）与 MCP 工具在非 OpenAI 服务商下不可用（#26234）仍是讨论热度最高的两大问题；Windows 桌面版沙箱 ACL 故障也在密集涌现（#45302、#42958、#46114 等），成为当日最集中的崩溃类反馈。

## 2. 版本发布

### rust-v0.155.0（最新正式版）
- **实验性 `/voice` 语音对话**：支持实时转写与麦克风控制，需通过 `/experimental` 开关启用（#43581, #43651, #44331）。
- **TUI 增强**：状态栏新增实时推理摘要；成功回合后显示完成时间戳。
- 同系列另有多个 alpha 版本（0.155.0-alpha.15 ~ alpha.18），未包含独立功能说明。

## 3. 社区热点 Issues（10 条）

1. **[#28507] 所选模型容量已满，请尝试其他模型**
   - 作者：@zhangwenzheng0451 | 评论 56 | 👍 52
   - 这是目前评论量最高的问题，大量 Pro 用户周期性遭遇模型容量拒绝，严重干扰正常工作流。该问题自 6 月创建以来持续活跃，反映出容量调度在高峰期对用户体验的影响仍未解决。
   - https://github.com/openai/codex/issues/28507

2. **[#26234] 非 OpenAI Responses API 服务商下 MCP 命名空间工具被扁平化**
   - 作者：@LucaCappelletti94 | 评论 35 | 👍 48
   - 使用 Ollama、LM Studio、OpenRouter 或 AWS Bedrock 时，MCP 服务器工具被封装进专有的 `namespace` 结构，模型无法实际调用。偏好本地/替代服务商的开发者对此高度关注，票数长期居高不下。
   - https://github.com/openai/codex/issues/26234

3. **[#24287] Codex Desktop 接受提示后 UI 卡在 Thinking 状态，Stop 失效**
   - 作者：@winnal | 评论 31 | 👍 14
   - macOS 桌面端会话卡死问题，重启后回合还可能不可见。涉及会话状态持久化与中断处理，影响深度使用桌面应用的 Pro 用户。
   - https://github.com/openai/codex/issues/24287

4. **[#31878] ChatGPT/Codex 合并后 Projects 在桌面侧边栏消失**
   - 作者：@corcuman | 评论 17 | 👍 18
   - 桌面端 26.707.30751 更新后，chatgpt.com 上可见的 Projects 不在侧边栏展示，影响跨端项目管理的一致性。
   - https://github.com/openai/codex/issues/31878

5. **[#40905] 5 小时用量窗口反复中断长时 GPT-5.6 Sol 任务**
   - 作者：@FlapPearLabs | 评论 15 | 👍 4
   - 长期运行的自主任务因滚动用量窗口被强行打断，社区开始讨论用量限制与新一代模型长时执行能力之间的适配问题。
   - https://github.com/openai/codex/issues/40905

6. **[#42739] Windows 桌面更新后本地项目从侧边栏消失**
   - 作者：@rizal281065 | 评论 14 | 👍 0
   - 更新后 Projects 区显示 No projects，但 Recents 与磁盘目录仍存在，疑似桌面端索引/迁移回归问题。
   - https://github.com/openai/codex/issues/42739

7. **[#15684] Codex 卡在暗色主题无法切换**
   - 作者：@ashimdahal | 评论 13 | 👍 10
   - VS Code 扩展（Linux）主题持久化失效，虽已关闭，但 13 条评论表明该问题影响面较广，回归风险仍值得关注。
   - https://github.com/openai/codex/issues/15684

8. **[#32188] 后台 exec 会话完成时的事件驱动唤醒**
   - 作者：@praveenperera | 评论 10 | 👍 13
   - CLI 用户希望后台长命令完成后主动通知模型，而不是依赖 `write_stdin` 轮询或子代理。这是一个能显著降低 token 消耗的设计诉求。
   - https://github.com/openai/codex/issues/32188

9. **[#33171] 远程压缩容量错误导致长期 /goal 任务终结**
   - 作者：@adpena | 评论 9 | 👍 1
   - 长时间运行任务在远程压缩阶段遇到容量错误被终止，而其他任务健康。指向远程压缩功能的容错与隔离缺陷。
   - https://github.com/openai/codex/issues/33171

10. **[#45302] Windows 沙箱 elevated 被阻断：deny_read_acl_state.json 无效**
    - 作者：@ramosousasp-ship-it | 评论 8 | 👍 0
    - 沙箱初始化时读取到 22 字节 NUL 的 ACL 状态文件，导致 elevated 模式无法启动。这是当日 Windows 沙箱问题群的代表，同类型问题还包括 #42958、#44034、#46114。
    - https://github.com/openai/codex/issues/45302

## 4. 重要 PR 进展（10 条）

1. **[#46324] Broaden compaction fallback to the current model**
   - 模型切换后，压缩操作可回退到当前模型，避免流式重试耗尽后失败，提升会话压缩的鲁棒性。
   - https://github.com/openai/codex/pull/46324

2. **[#46322] Set the Windows sandbox type in the pending environment test**
   - 修复 pending 环境测试中 Windows 沙箱类型未正确设置的问题，可能缓解部分 Windows 沙箱初始化故障。
   - https://github.com/openai/codex/pull/46322

3. **[#46319] Preserve web search actions and results in exec JSON output**
   - 修复 `codex exec --json` 中 web_search 事件被折叠为 `other`、丢失 URL 与结果的 bug，对应 issue #45773。
   - https://github.com/openai/codex/pull/46319

4. **[#46318] Add OAuth credential management for model provider gateways**
   - 为模型提供商网关引入 OAuth 凭据管理，支持 PKCE 浏览器登录、loopback 回调、缓存 token 与自动刷新，并将凭证存入专用加密存储。
   - https://github.com/openai/codex/pull/46318

5. **[#46310] Defer environment selection changes until the next turn**
   - 环境选择变更延迟到下一回合生效，避免运行中的 turn 被重定向工具或 pending 环境设置被打断。
   - https://github.com/openai/codex/pull/46310

6. **[#46309] Preserve plugin caches across display metadata refreshes**
   - 显示元数据刷新（如镜像 URL 更新）不再无效化已加载的插件与 MCP/skill 缓存，提升桌面端启动与切换速度。
   - https://github.com/openai/codex/pull/46309

7. **[#46306] Preserve bio policy errors as a distinct non-retryable error**
   - 将 `bio_policy` 流式失败从通用无效请求中分离，作为不可重试的策略类错误，完善错误分类与诊断。
   - https://github.com/openai/codex/pull/46306

8. **[#46300] Centralize OAuth login and refresh handling with safer diagnostics**
   - 统一登录与刷新流程，避免 token 端点在错误日志中回显凭据、JSON 解码错误暴露 token 值，提升安全性。
   - https://github.com/openai/codex/pull/46300

9. **[#46288] Add opt-in overhead timing to code-mode responses**
   - 新增 `experimental_show_cell_overhead` 开关（默认关闭），在 code-mode 中显示 handler 耗时与 app-server 等待时间，帮助定位延迟瓶颈。
   - https://github.com/openai/codex/pull/46288

10. **[#26476] feat(tui): show live activity details in iTerm2 tabs**
    - 在 iTerm2 标签页中展示实时活动详情（三个阶段中的第三部分），通过结构化状态输出最小化终端写入频率。
    - https://github.com/openai/codex/pull/26476

## 5. 功能需求趋势

1. **MCP 与第三方模型服务商兼容性**（#26234、#28858）
   MCP 工具在非 OpenAI 端点下不可用、分页协议不被遵守等问题，说明社区对本地模型、OpenRouter、Bedrock 等替代路径的需求真实且活跃。

2. **非侵入式后台任务与事件驱动机制**（#32188、#40905）
   开发者希望 Codex 具备事件驱动唤醒能力，减少轮询；同时要求用量窗口支持长时间自主任务，而不是中断运行中的工作。

3. **桌面应用的项目与会话一致性**（#31878、#42739、#24287）
   多端合并（ChatGPT + Codex）后，项目同步、会话恢复、侧边栏展示的回归问题集中出现，桌面端可靠性成为关注焦点。

4. **沙箱稳定与权限透明**（#45302、#42958、#46114、#44034）
   Windows 沙箱的 ACL 状态文件损坏、根目录读权限错误、Computer Use 阻断等，暴露跨平台沙箱实现的成熟度缺口。

5. **更强的配置控制与插件管理**（#38185、#45999、#46210）
   推荐插件注入缺少 opt-out、SessionStart 钩子在 `codex exec` 下静默跳过等，说明开发者需要更细粒度的可控性和可诊断性。

## 6. 开发者关注点

- **容量错误高发**：多个模型容量（#28507、#46321）问题反复出现，付费用户尤其敏感，期望更明确的调度预期与备选模型提示。
- **Windows 沙箱故障集中**：ACL 状态文件被写坏、elevated 模式无效等问题在同一时间点多例出现，可能指向近期更新引入的回归。
- **MCP 工具调用链断裂**：自定义远程 MCP 首次调用提示 tool disabled，随后 namespace 消失（#42907）；MCP 分页不完整（#28858），影响真实工程使用。
- **模式切换后的功能残差**：禁用 reasoning override 后，恢复线程仍发送已保存的 configuration_update（#46291）；模型不支持提示不清晰（#46304）。
- **钩子与配置的静默失败**：SessionStart 钩子因信任机制在无诊断下被跳过（#46210），自动化集成方难以区分配置错误与安全限制。
- **本地网络与权限问题**：macOS 27 下桌面应用无法访问 LAN 且不触发本地网络权限弹窗（#35346），严重阻碍调试远程环境的用户。

---
*本日报由自动化工具整理生成，数据截至 2026-09-18，来源：github.com/openai/codex。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报

**日期：2026-09-18** | 数据来源：github.com/google-gemini/gemini-cli


## 今日速览

今日社区动态聚焦于 **子代理（Subagent）可靠性** 与 **终端/PTY（伪终端）执行稳定性** 两大主题：一个 P1 级 PR（#29367）修复了子代理在 MAX_TURNS 中断后被误报为"GOAL 成功"的误导性问题，多个 PR 致力于解决 Windows ConPTY 环境下命令执行挂起、资源泄漏等顽疾。此外，Auto Memory 相关的一组安全与质量问题（共 5 个 Issue）也在持续发酵，引发社区对数据红action与重试机制的关注。


## 版本发布

- **v0.62.0-nightly.20260917.g6a466a7e2** — 仅更新 changelog，无显著新功能说明。[查看详情](https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260916.g6a466a7e2...v0.62.0-nightly.20260917.g6a466a7e2)


## 社区热点 Issues（10 个）

### 1. 子代理 MAX_TURNS 中断被误报为成功
- **#22323** | P1/Bug | 评论 13 👎 2 | 更新 09-17
- **摘要**：`codebase_investigator` 子代理在达到最大轮次限制、实际未执行任何分析时，仍报告 `status: "success"` 且 `Termination Reason: "GOAL"`，掩盖了中断事实。
- **关注点**：这直接误导开发者对任务真实完成度的判断，是 Agent 可信度的关键缺陷。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22323)

### 2. 通用代理（Generalist Agent）无限挂起
- **#21409** | P1/Bug | 评论 8 | 👍 8 | 更新 09-17
- **摘要**：当 Gemini CLI 委派任务给通用代理时（例如简单创建文件夹），会永久挂起，最长等待一小时仍未完成。用户指示模型不要使用子代理可规避此问题。
- **关注点**：高 👍 数表明影响面较大，核心 Agent 路径可用性受损。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21409)

### 3. Shell 命令执行后卡在 "Waiting input"
- **#25166** | P1/Bug | 评论 4 | 👍 3 | 更新 09-17
- **摘要**：极简单的 CLI 命令执行完成后，Gemini 仍挂起并显示命令活动、等待用户输入。复现频繁，严重影响自动化流程。
- **关注点**：典型的终端状态机生命周期缺陷，直接破坏交互体验。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/25166)

### 4. 零依赖 OS 沙箱与意图路由
- **#19873** | P2/Enhancement | 评论 9 | 更新 09-17
- **摘要**：提议利用 Gemini 3 模型原生擅长 bash 工具链的特性，通过零依赖沙箱隔离（而非禁用 shell）来兼顾安全与能力，并在执行后路由意图。
- **关注点**：代表"安全与能力兼得"的先进思路，社区讨论活跃。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/19873)

### 5. Gemini 不主动使用 Skills 和子代理
- **#21968** | P2/Bug | 评论 6 | 更新 09-17
- **摘要**：用户反馈 Gemini 几乎不会主动调用自定义 Skills 和子代理，即使场景高度相关。仅在用户显式指令时才使用。例：已配置 gradle/git skill，仍不使用。
- **关注点**：关乎 Agent 的自主性和扩展生态价值，若属实，自定义扩展的投入产出比存疑。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21968)

### 6. Auto Memory 重试低信号会话
- **#26522** | P2/Bug | 评论 4 | 更新 09-17
- **摘要**：Auto Memory 仅在提取代理成功读取转录后才将会话标记为已处理。若代理因低信号跳过读取，该会话会反复出现在待处理队列中，造成无限重试与资源浪费。
- **关注点**：内存系统的自动化流程存在状态管理缺陷，长期使用会累积无效计算。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26522)

### 7. 确定性数据脱敏与减少日志记录
- **#26525** | P2/Security | 评论 5 | 更新 09-17
- **摘要**：Auto Memory 在将本地转录发送至模型前已完成上下文注入，脱敏提示词在内容进入模型后才执行，形同虚设。服务还会记录现有技能等敏感内容。
- **关注点**：安全边界设计问题，影响企业级用户对数据隐私的信任。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26525)

### 8. Browser Agent 在 Wayland 下失败
- **#21983** | P1/Bug | 评论 4 | 👍 1 | 更新 09-17
- **摘要**：Wayland 环境下浏览器子代理运行失败，Termination Reason 显示 GOAL 但实际未完成任务。
- **关注点**：Linux 桌面用户（尤其 Wayland 会话）的浏览器自动化能力被阻断。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21983)

### 9. Browser Agent 忽略 settings.json 覆盖项
- **#22267** | P2/Bug | 评论 3 | 更新 09-17
- **摘要**：AgentRegistry 虽正确读取并合并了全局/项目级 settings.json 中的配置（如 maxTurns），但 Browser Agent 在运行时完全忽略这些覆盖项。
- **关注点**：配置系统与代理执行逻辑脱节，用户无法有效调优浏览器代理行为。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22267)

### 10. 评估 AST 感知的文件读取/搜索/映射
- **#22745** | P2/Feature | 评论 7 | 更新 09-17
- **摘要**：EPIC 跟踪一系列调研：是否值得引入 AST 感知工具来精确读取方法边界、减少对齐读取（misaligned reads）、降低 token 噪声，以及改进代码库映射。
- **关注点**：这是提升上下文利用效率、减少 token 消耗的前瞻方向，社区高度期待。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22745)


## 重要 PR 进展（10 个）

### 1. 修复子代理恢复后误报 GOAL 成功
- **#29367** | fix(agents) | P1 | 09-17 更新
- **摘要**：修复 #22323——LocalAgentExecutor 的恢复路径无条件覆盖了 `terminateReason`，导致 MAX_TURNS 中断被标记为 GOAL 成功。现在保留原始终止原因。
- **意义**：修正了 Agent 结果可信度的关键缺陷。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29367)

### 2. 同步 ConPTY 进程退出生命周期
- **#29379** | fix(core) | P1 | 09-17 更新
- **摘要**：改进 ShellExecutionService 在 Windows ConPTY 环境（node-pty）下进程生命周期确定性与输出流完成一致性，解决命令退出后挂起问题。
- **意义**：直击 #25166 等 Windows 终端稳定性痛点。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29379)

### 3. 抑制取消请求时的 AbortError 崩溃
- **#29343** | fix(cli) | 09-17 更新
- **摘要**：防止 Node 23+ 下用户取消/中止查询时，`AbortError` 在事件监听器内同步抛出导致硬崩溃。
- **意义**：提升取消操作的健壮性，避免暴力退出。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29343)

### 4. 改进 PTY 文件描述符清理
- **#29340** | fix(core) | 09-17 更新（已关闭）
- **摘要**：增强 ShellExecutionService 与 ExecutionLifecycleService 在 POSIX 平台上的文件描述符/流生命周期管理，确保 PTY 会话和后台 shell 结束时资源完全释放。
- **意义**：修复资源泄漏，提升长时间运行的稳定性。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29340)

### 5. 会话恢复时重复重放工具响应
- **#29366** | fix(core) | P1 | 09-17 更新
- **摘要**：修复 `-r` 恢复会话（或通过会话浏览器/ACP）时将每个工具结果发送两次的问题，该问题导致恢复后首个请求因 functionCall/functionResponse 配对错误而失败，且每次恢复都在录音中冗余存储。
- **意义**：直接影响会话恢复功能的可靠性与录音质量。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29366)

### 6. VS Code 关闭 diff 页签时保留终端焦点
- **#29378** | fix(vscode-ide-companion) | P1 | 09-17 更新
- **摘要**：关闭 diff 预览编辑器时传递 `preserveFocus=true`，避免焦点从集成终端跳到编辑器组，减少键盘焦点丢失烦恼。另有同题 PR #29349（已关闭）。
- **意义**：改善编辑器集成场景下的连续操作体验。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29378)

### 7. 改进终端缓冲区内存管理
- **#29380** | fix(core,cli) | 09-17 更新
- **摘要**：优化 PTY shell 执行与无头终端缓冲区序列化的内存使用；改进 `/bug` 与 `/bug-memory` 诊断信息中 Windows 路径的 Markdown 格式。
- **意义**：降低内存占用，同时提升诊断报告可读性。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29380)

### 8. 为负布局尺寸增加边界防护
- **#29347** | fix(ui) | P1 | 09-17 更新（已关闭）
- **摘要**：为 `renderBorder` 及字符串重复逻辑增加负尺寸守卫，防止 `RangeError: Invalid count value: -1` 崩溃；在多个 UI 组件中加入防御性钳位。
- **意义**：消除终端渲染在极端尺寸下的崩溃风险。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29347)

### 9. ACP 按 ID 解析会话加载
- **#29368** | fix(acp) | P1 | 09-17 更新
- **摘要**：修复 #29288——即使会话无可恢复内容（resumable content），也能按会话 ID 正确加载会话文件，同时区分了写入路径非缺陷的误判。
- **意义**：修复 ACP（Agent Client Protocol）模式下会话加载失败问题，保证跨工具互操作。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29368)

### 10. 停止 Windows IDE 检测回退到 Unix ps
- **#29376** | fix(core) | 09-17 更新
- **摘要**：`getIdeProcessInfoForWindows()` 当前通过 `Get-CimInstance` 抓取全量进程表，当当前 PID 未找到时回退执行 Unix `ps` 命令——在 Windows 上无效。此 PR 移除该不合理的回退逻辑。
- **意义**：避免 Windows 下无谓的跨平台命令调用，提升检测清净性与正确性。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29376)


## 功能需求趋势

从全部 49 条活跃 Issues 中提炼出以下社区最关注的功能方向：

| 方向 | 关键议题 | 代表 Issue |
|------|---------|-----------|
| **Agent 行为自主性与可靠性** | 子代理不主动使用 Skills/Agents；通用代理挂起；子代理误报成功；对破坏性命令的遏制 | #21968, #21409, #22323, #22672 |
| **终端/PTY 稳定性** | 命令执行后挂起；ConPTY 生命周期；文件描述符泄漏；终止渲染闪屏 | #25166, #21924 |
| **安全与数据隐私** | Auto Memory 先送内容后脱敏；确定性红action；日志过敏信息 | #26525, #26523 |
| **上下文与 Token 效率** | AST 感知读取/搜索/映射；Tactful Extraction' 外科手术式读取 | #22745, #19561, #22746 |
| **会话生命周期** | `/compress` 跨会话不持久；恢复后重复工具响应；共享子代理轨迹 | #21335, #22598 |
| **浏览器代理增强** | Wayland 兼容；settings.json 覆盖生效；自动会话接管/锁恢复 | #21983, #22267, #22232 |
| **配置与工具链体验** | 符号链接 Agent 不识别；无效 \n 转义 | #20079, #22466 |


## 开发者关注点

1. **终端卡死/挂起问题反馈集中**：无论是普通 shell 命令（#25166）还是通用代理（#21409），"永久等待"类问题对日常开发干扰极大，是开发者最迫切的痛点。今日 PR 已密集针对此方向修复，预计下个版本有显著改善。

2. **子代理行为"黑盒"感强烈**：开发者反映子代理执行细节不透明——不知道它为何不调用已配置的 Skills（#21968）、不知道它是否真的完成了任务（#22323）、bug 报告也不包含子代理上下文（#21763）。这削弱了用户对 Agent 执行结果的信任感。

3. **会话恢复与上下文管理待加强**：`/compress` 不持久（#21335）、恢复后工具响应重放（#29366）、工具数量超过 128 个时报 400 错误（#24246）等问题显示会话生命周期管理仍有不少 edge case 待解决。

4. **安全边界意识提升**：Auto Memory 的数据处理方式（先入上下文再脱敏）和无效补丁静默跳过（#26523）引发社区对安全性和可观测性的讨论，企业用户尤为关注。

5. **Windows 平台体验成为修复热点**：今日多个 PR 针对 Windows 下的 ConPTY 生命周期、IDE 检测回退、路径格式化等问题，说明 Windows 用户基数增长的同时，平台差异性问题也密集暴露。

---
*本日报由 AI 自动生成，数据基于 GitHub 公开信息，仅供参考。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-18

## 今日速览

- Studio 发布 v2.18.1，修复远端主机使用本机模型报 unknown model 的关键问题，并正式移除 IM 机器人网关。
- 社区集中报告多起会话数据相关严重问题：新建会话覆盖旧记录、幽灵会话无法打开/删除、"Cannot open session"持续存在，数据完整性风险突出。
- 发版流程 PR #10472 已合并，根治打包验证晚发现与发版重复验证问题；v1.38.10 更新日志正在准备中。

## 版本发布

### studio-v2.18.1
- **修复**：远端主机使用本机模型时不再回落到远端自有配置导致 unknown model（#10448）；本机缺失模型时报错会明确提示，并指导改用远端模型（8b2a05c51）。
- **移除**：`reasonix bot` 与 QQ、飞书、微信机器人网关；配置文件 `[bot]` 段原样保留，不影响 1.x（f352dfbec）。
- **升级须知**：模型来源为本机的远端主机，若内核低于 2.18.1 下次连接会自动调整。

### studio-v2.18.0
- **修复**：Windows 安装目录 AppContainer 授权导致窗口打不开（启动时自动移除，#10435）；读图模型不再误报"看不到图"（44150b0aa）；Goal 续跑提示不再误导；切换模型/重载扩展/切换工作区后问题框和审批框不再消失（921a04bda）。
- **变更**：内置文档除 README、使用指南、CLI 参考外只保留英文版，中文提问会检索到英文文档（68b031ae5）。

## 社区热点 Issues

按风险等级排序。会话数据损坏/丢失类问题今日集中出现，建议优先关注：

- [#10456 [Bug] v1.38.7 "Cannot open session" persists across restarts](https://github.com/esengine/DeepSeek-Reasonix/issues/10456) — 会话历史加载报错，transcript 投影失败，累计 31 条 local_only 哨兵记录，重启无法恢复。社区反馈者 @Aresitoo 在 #10412 中同样活跃，可能有关联。
- [#10454 [Bug] 从 38.3 开始新建会话会覆盖原先的会话记录](https://github.com/esengine/DeepSeek-Reasonix/issues/10454) — 新会话覆盖旧记录，部分会话不显示历史甚至消失。studio-v2.18.1 有好转但问题依旧严重，属于高危数据丢失问题。
- [#10453 [Bug] 更新到 1.38.9 整个工具无法使用](https://github.com/esengine/DeepSeek-Reasonix/issues/10453) — 最新版启动即不可用，结合 #10449（更新不到最新版），社区对更新通道的可靠性已有疑虑。
- [#10337 [Bug] 一个会话影响整个工具](https://github.com/esengine/DeepSeek-Reasonix/issues/10337) — 会话失败后，新建会话无法成功且原会话也受影响。会话级错误未做隔离。
- [#10186 [Bug] v1.38.7 渲染层崩溃（React error #185）](https://github.com/esengine/DeepSeek-Reasonix/issues/10186) — 长会话流式输出触发 React "Maximum update depth exceeded"，21 条评论仍开放，为今日讨论最热 issue。
- [#10412 [Bug] Plan/To-dos panel 永不自动关闭](https://github.com/esengine/DeepSeek-Reasonix/issues/10412) — Agent 完成任务后 phase item 停在 in_progress，面板卡在 4/5，Agent 自身无法清除。v1.38.7/1.38.8 均复现。
- [#10416 [Bug] Ghost topic persists after deletion](https://github.com/esengine/DeepSeek-Reasonix/issues/10416) — 已删除主题残留在项目树中，点击报 "cannot open session"，无法打开也无法删除。macOS 上 1.38.6/1.38.7 均复现。
- [#10075 [Bug] 接入 deepseek-v4.1-flash 多模态模型后不支持图片输入](https://github.com/esengine/DeepSeek-Reasonix/issues/10075) — 图片附件已渲染进对话但模型侧收到不到图像数据，社区期望的 v4.1-flash 多模态支持未落地。
- [#10449 [Bug] 更新不到最新版本](https://github.com/esengine/DeepSeek-Reasonix/issues/10449) — 有用户停留在 1.38.7，无法更新到 1.38.8，未说明具体原因。
- [#10473 [RFC] Agent-chosen span folding（begin_span / fold_span）](https://github.com/esengine/DeepSeek-Reasonix/issues/10473) — 提议 Agent 可以将一段调查过程折叠为结论，保留产物但减少上下文占用。关注 Agent 长会话上下文管理的方向性提案。

## 重要 PR 进展

- [#10472 [已合并] 根治发版重复验证与打包晚发现](https://github.com/esengine/DeepSeek-Reasonix/pull/10472) — Notes-only 推送保留 code-ancestor CI、取消过期 worker、在打包 PR 上运行 Windows 安装/升级验收、合并前强制 packaging 验证。这是近期发布质量的根源性改进。
- [#10480 [开放] 补齐 Windows 升级验收脚本](https://github.com/esengine/DeepSeek-Reasonix/pull/10480) — 修复签名发布预检因 sparse checkout 漏掉 `windows-upgrade-ui-evidence.ps1` 导致失败的问题，只动 control-plane，保持 v1.38.10 tag 不可变。
- [#10469 [开放] 持久化本地草稿并整理历史空会话](https://github.com/esengine/DeepSeek-Reasonix/pull/10469) — 每个 Workspace 保留一个持久本地草稿，不创建 Session/Topic/lease/MCP 运行时直到首次执行；恢复草稿只在确认目标后接管导航。方向与 #10454（会话覆盖）直接相关。
- [#10471 [开放] 完善固定快照会话导出](https://github.com/esengine/DeepSeek-Reasonix/pull/10471) — 长会话导出不再只序列化渲染器驻留窗口，修复 Markdown 工具标题为空的问题，确保导出完整 tool 参数。
- [#10431 [开放] 检测 perseveration 循环并在提示后重试一次](https://github.com/esengine/DeepSeek-Reasonix/pull/10431) — 新增客户端侧保护：模型卡在同一条短文本/推理反复输出且不调用工具时，现有工具轮数和静默检测无法识别，该保护可避免烧完整个输出预算。
- [#10419 [开放] 技能改由 use_capability 路由](https://github.com/esengine/DeepSeek-Reasonix/pull/10419) — 修复仍让模型调用已退役的 `connect_tool_source` 的问题，使 SkillEntries 正确进入路由目录。
- [#10344 [开放] 新增按 provider 配置 stream_idle_timeout_seconds](https://github.com/esengine/DeepSeek-Reasonix/pull/10344) — 允许按供应商设置流空闲超时，超过后视为掉线重放；未设置时保持 300s 默认值。对不稳定供应商模型很实用。
- [#10297 [开放] 尊重 `[sandbox].bash="off"` 并跳过 bwrap 探测](https://github.com/esengine/DeepSeek-Reasonix/pull/10297) — 当前配置关闭 bash 沙箱后仍强制 enforce 模式且运行 bwrap 探测；修复后按配置跳过。
- [#10367 [开放] CLI composer 添加 vi 命令模式](https://github.com/esengine/DeepSeek-Reasonix/pull/10367) — `ui.commandmode = "vi"` 时 Esc 进入命令模式，只有 Ctrl+C 打断运行；Ctrl+C 会保留已输入文本到 cmdline history。TUI 用户呼声较高的功能。
- [#9417 [开放] 新增半页与单行转录滚动快捷键](https://github.com/esengine/DeepSeek-Reasonix/pull/9417) — 为聊天 TUI 增加 Shift+PgUp/PgDn（半页）和 Shift+Up/Down（单行）滚动，并更新三种语言文档。

## 功能需求趋势

- **会话稳定性与数据恢复**：今日最集中的诉求，涉及历史记录被覆盖（#10454）、无法打开/删除会话（#10416/#10456）、会话影响全局（#10337）。社区期望会话级故障隔离和更可靠的历史存储。
- **多模态模型支持**：deepseek-v4.1-flash 图片输入不可用（#10075），社区已期待多模态能力实际落地。
- **Agent 上下文管理**：Plan/Todos 面板卡死（#10412）、span folding 提案（#10473）、perseveration 检测（#10431）表明 Agent 长时间运行时的状态与上下文管理成为关注焦点。
- **TUI/CLI 交互增强**：vi 命令模式（#10367）、滚动快捷键（#9417）、YOLO 数字键直选（#9491）等 PR 持续活跃，显示 CLI 用户对高效操作方式有强需求。

## 开发者关注点

- **更新回归风险高**：多个 issue 指向升级到新版本后产生新问题（#10453 更新至 1.38.9 即不可用、#10449 更新失败），社区对发版质量有强烈不满，PR #10472/#10480 即针对此问题。
- **会话数据完整性是首要担忧**：新建会话覆盖旧记录（#10454）和幽灵会话（#10416）直接影响用户信任，在 #10456 中用户明确表示"重启无法恢复"。
- **Windows 平台问题占比高**：今日活跃 issue 中约一半涉及 Windows（#10449/#10453/#10412/#10456/#10075），且 patch 版本间行为不一致（1.38.7 vs 1.38.8）让用户困惑。
- **TUI 输入体验缺陷**：运行中输入框大概率失焦（#10455），说明交互细节在持续使用中长期积累痛点。
- **配置/文档存在知识断层**：VSCode CLI 模型名读取错误（#10458）与文档改为英文后中文提问检索不到文档（v2.18.0 变更）都可能推高使用门槛。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-09-18

## 今日速览

本周 OpenCode 社区围绕**免费层访问误报**和 **TUI 性能/稳定性** 两大主题展开激烈讨论：多个 Issue（#49433、#49590 等）反映"免费模型只能在 OpenCode 内部使用"的错误在 Desktop 客户端和第三方工具中扩散。此外，TUI 输入卡顿、undo 失败等 bug 均有对应 PR 提交修复（#49634、#49636），显示维护者正在积极回应社区反馈。PR 侧则密集合并了多组 UI 动画优化与插件能力增强（#46690、#48822）。

---

## 社区热点 Issues（10 选）

### 1. 免费层访问误报：模型被错误拒绝
**#49433** [OPEN] Error from provider (Console): OpenCode's free tier can only be used from within OpenCode  
🔗 https://github.com/anomalyco/opencode/issues/49433  
**重要性**：高。这是目前最热的话题，27 条评论，且 #49590、#49627、#49633 等多个 Issue 描述相同现象——用户从 Desktop 客户端、VSCode 插件等入口使用免费模型时被系统误判为外部调用。**社区反应**：大量用户报告相同复现路径，等待官方修复。

**#49590** [OPEN] Official OpenCode Desktop incorrectly rejects free-tier models  
🔗 https://github.com/anomalyco/opencode/issues/49590  
**重要性**：高。针对官方 Desktop 客户端同样触发该限制，属于 #49433 的变种，进一步证明不是"非官方客户端才会误报"。

### 2. Console Go 上游请求持续失败
**#37231** [CLOSED] Error from provider (Console Go): Upstream request failed  
🔗 https://github.com/anomalyco/opencode/issues/37231  
**重要性**：中高。多个 Go 模型在所有客户端（CLI、桌面、VSCode 扩展）下均返回"Upstream request failed"，持续两个月，22 条评论。虽然已关闭，但用户在 #49247 中报告出现了新的 `encrypted_content` 错误变体。

### 3. TUI undo 在中断后失败
**#39736** [OPEN] [bug] tui: undo fails for admitted message after interrupt  
🔗 https://github.com/anomalyco/opencode/issues/39736  
**重要性**：中高。用户中断 AI 回复后尝试 undo 会报 `Message not found`，因为消息尚未进入物化历史。5 条评论，已有对应修复 PR #49636。**社区反应**：认可问题复现描述，期待修复落地。

### 4. 会话成本不包含子代理开销
**#45417** [OPEN] Session cost excludes subagent cost  
🔗 https://github.com/anomalyco/opencode/issues/45417  
**重要性**：高。获得 11 个 👍，是本期 Issue 中获赞最多的一条。以多子代理 fan-out 工作流为例，显示的会话成本大幅低于实际计费。直接影响开发者的成本追踪准确性。

### 5. 用量异常消耗：3 分钟用完 38% 配额
**#49625** [CLOSED] 38% of my available usage on 3 minutes  
🔗 https://github.com/anomalyco/opencode/issues/49625  
**重要性**：中高。用户在 Kimi K3 上运行软件测试任务，3 分钟消耗 38% 配额。虽然已关闭且无官方回复，但引发了关于模型用量计量透明度的讨论。

### 6. TUI 大文本输入严重卡顿
**#49635** [OPEN] TUI: typing large amounts of text causes severe lag  
🔗 https://github.com/anomalyco/opencode/issues/49635  
**重要性**：中高。TUI 聊天输入框在输入或听写大段文本时，界面随 buffer 增大而严重阻塞。已有 PR #49634 定位到 `mentionTrigger` 的 O(n) 每键扫描。**社区反应**：开发者在 Issue 中补充了性能分析细节。

### 7. 已订阅 Go 仍提示"免费额度超限"
**#49638** [OPEN] Free usage exceeded, subscribe to Go. I *am* subscribed!  
🔗 https://github.com/anomalyco/opencode/issues/49638  
**重要性**：中高。用户已订阅 Go 套餐仍被拒绝，疑似 API key 配置或组织级权限识别问题。反映出免费层限制的错误路径不透明，用户难以自行排查。

### 8. TUI 后台任务提示误导
**#36940** [OPEN] [bug, tui, 2.0] background hint appears when child work is already backgrounded  
🔗 https://github.com/anomalyco/opencode/issues/36940  
**重要性**：中。所有子任务都已后台化时，TUI 仍提示"按 ctrl+b 移至后台"，对用户产生误导。已有 PR #49637 修复。

### 9. reasoning `encrypted_content` 权限错误
**#49247** [OPEN] Error from provider (Console): Upstream request failed: `encrypted_content` was not issued to this caller  
🔗 https://github.com/anomalyco/opencode/issues/49247  
**重要性**：中。新出现的错误类型，指向 Console 服务端对 reasoning 内容加密字段的权限校验问题，影响 1.18.31 版本，且无明确规避方法。

### 10. 免费额度耗尽后的冷却体验
**#49639** [OPEN] Free Usage Limit Reach: Upgrade to Opencode Go  
🔗 https://github.com/anomalyco/opencode/issues/49639  
**重要性**：中。长时间使用后触发组织级 API 暂停（`permission_error`），且冷却计时器很长。用户关注免费额度的耗尽提示和恢复策略是否合理。

---

## 重要 PR 进展（10 选）

### 1. TUI 输入卡顿根因修复
**#49634** [OPEN] fix(tui): eliminate O(n) mention-trigger scan on every keystroke  
🔗 https://github.com/anomalyco/opencode/pull/49634  
**内容**：修复 #49635。`mentionTrigger` 每次键击进行 O(n) 扫描导致输入卡顿，改为更高效的数据结构。属于 TUI 交互体验的关键性能修复。

### 2. 中断后 undo 修复
**#49636** [OPEN] fix(core): undo admitted messages after interrupt  
🔗 https://github.com/anomalyco/opencode/pull/49636  
**内容**：修复 #39736。确保中断时已可见的 admitted 消息也能被正确回滚，解决 `Message not found` 错误。

### 3. 后台提示条件修正
**#49637** [OPEN] fix(tui): hide background hint when children already backgrounded  
🔗 https://github.com/anomalyco/opencode/pull/49637  
**内容**：修复 #36940。仅当存在可见的前台子任务时才显示 ctrl+b 提示，避免误导。

### 4. 流式渲染性能修复
**#48432** [OPEN] fix(session-ui): grow markdown live tail in place  
🔗 https://github.com/anomalyco/opencode/pull/48432  
**内容**：修复 #36043 的流式路径 O(n²) 问题，与 tui-delta-coalesce PR 联合彻底消除客户端流渲染冻结。维护者仍寻求审查中。

### 5. 本地 LAN Provider 自动发现
**#27554** [OPEN] feat(opencode): local LAN provider discovery + auto-discover models  
🔗 https://github.com/anomalyco/opencode/pull/27554  
**内容**：为 `/connect` 添加本地 OpenAI 兼容服务器的 LAN 自动发现（mDNS 等），并自动拉取模型列表。关闭 #6231、#27553。属于社区期待已久的本地模型接入增强。

### 6. 会话用量结构化导出
**#48822** [OPEN] feat(opencode): export structured session usage  
🔗 https://github.com/anomalyco/opencode/pull/48822  
**内容**：为 `opencode export` 新增 `usage-json` 和 `usage-csv` 格式，按模型/会话聚合 `step-finish` 用量。直接回应用户对成本透明度的诉求（见 #45417）。

### 7. 插件 API 能力扩展
**#46690** [OPEN] feat(plugin): expose session forms, session list, and global event stream  
🔗 https://github.com/anomalyco/opencode/pull/46690  
**内容**：向插件系统暴露更多核心能力——会话表单、会话列表和全局事件流，为 Telegram 等外部 bot 插件铺路。社区插件生态的重要基础建设。

### 8. 社区插件：opencode-agent-memory
**#49632** [OPEN] [needs:compliance] docs(ecosystem): add opencode-agent-memory  
🔗 https://github.com/anomalyco/opencode/pull/49632  
**内容**：将维护良好的 `opencode-agent-memory` 插件加入社区插件列表，提供持久化的自编辑记忆块和 append-only 日志，附带本地语义搜索。

### 9. 新会话 wordmark 入场动画
**#48842** [CLOSED] feat(new-session): animate wordmark entrance when opening a new session  
🔗 https://github.com/anomalyco/opencode/pull/48842  
**内容**：新会话打开时 wordmark 上升淡入动画，属于 @yanhenrique-dev 的多项 UI 润色之一（另见 #48832、#48709 等）。该系列 PR 虽小但集中提升了桌面端的视觉质感。

### 10. 波斯语 README 翻译
**#47783** [OPEN] docs: add Persian (fa) README translation  
🔗 https://github.com/anomalyco/opencode/pull/47783  
**内容**：新增 `README.fa.md`，并在语言导航中加入 فارسی。社区国际化贡献活跃的信号。

---

## 功能需求趋势

1. **免费层访问与身份验证逻辑重构**（#49433、#49590、#49627、#49633、#49638）——大量用户从不同入口（CLI、Desktop、VSCode 扩展）触发"只能在 OpenCode 内部使用"的误报，暴露出免费层身份检查过于严格或误判客户端来源，成为当前最紧急的可用性问题。
2. **用量与成本透明化**（#45417、#49625、#49639）——开发者要求会话成本统计覆盖子代理，用量消耗速率需可视化，免费额度耗尽后的权限暂停与恢复策略需更明确。
3. **TUI 性能与交互稳定性**（#49635、#48432、#39736）——大文本输入卡顿、流式渲染冻结、undo 可靠性是 TUI 用户反复提及的痛点，多条 PR 已针对性地进行性能修复。
4. **本地与自定义模型接入**（#27554）——通过 mDNS 自动发现局域网内的 OpenAI 兼容服务器并自动拉取模型，是社区呼声较高的新特性，预计将显著改善私有化部署体验。
5. **插件生态能力开放**（#46690、#49632）——插件系统正在向更完整的自动化场景（如消息机器人、持久化记忆）拓展，社区希望进一步开放会话数据和事件流能力。

---

## 开发者关注点

- **免费层身份验证混乱**：错误信息没有区分"客户端类型限制"和"组织额度已用尽"，用户难以判断是订阅、API key 还是客户端入口问题。部分已订阅用户（#49638）也被拒之门外。
- **Console Go 上游稳定性**：持续数周的上游请求失败（#37231）和新出现的 `encrypted_content` 权限错误（#49247）让依赖 Go 模型的用户缺乏信心。
- **成本核算不可信**：会话显示价格与实际账单不符是高频吐槽点，尤其涉及子代理 fan-out 场景时偏差巨大，影响企业对工具的信任度。
- **TUI 输入/渲染性能边界**：当用户输入或粘贴大量文本、或流式渲染长回复时，TUI 易进入卡顿甚至假死状态。开发者满意于社区提交的根因分析和修复 PR，但希望合并节奏更快。
- **后台任务与 undo 等基础操作缺少兜底**：消息在不稳定状态下（中断、后台上运行）的 undo/提示行为不可靠，侧面说明 TUI 的会话状态机仍需打磨。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

## DeepSeek Harness 社区动态日报（2026-09-18）

### 1. 今日速览

今日 DeepSeek Harness 发布新版本 v0.1.6-alpha.2，重点增强插件管理与文件审阅能力，新增 Office 文件预览和浏览器模式侧边栏访问功能。过去 24 小时内无新增 Issue 或 PR 更新，社区讨论相对平静。

---

### 2. 版本发布

**dsh-v0.1.6-alpha.2**  
🔗 [查看 Release](https://github.com/deepseek-ai/deepseek-harness/releases)

本次更新包含 4 项新功能：

- **插件管理页**：支持插件的安装、配置修改以及实时启用/禁用，提升扩展管理的灵活性与可操作性。  
- **回合结束文件改动卡片**：会话中新增文件改动卡片，并支持在侧边栏逐文件对比审阅，便于跟踪工具产生的代码变更。  
- **Office 文件侧边栏预览**：支持在侧边栏直接预览 Word、Excel、PowerPoint 文件，减少外部工具切换成本。  
- **浏览器模式侧边栏访问**：允许用户通过侧边栏以浏览器模式访问指定 URL，简化网页内容查看与交互流程。

---

### 3. 社区热点 Issues

过去 24 小时内无新增或更新的 Issue。  
🔗 [查看全部 Issues](https://github.com/deepseek-ai/deepseek-harness/issues)

---

### 4. 重要 PR 进展

过去 24 小时内无新增或更新的 Pull Request。  
🔗 [查看全部 Pull Requests](https://github.com/deepseek-ai/deepseek-harness/pulls)

---

### 5. 功能需求趋势

结合本次 Release 内容，可看出社区/开发团队当前关注的方向：

- **插件生态**：通过插件管理页的引入，支持更灵活的扩展机制，预示后续将鼓励第三方插件开发。
- **文件审阅与对比**：回合结束文件卡片与逐文件对比功能，体现了对代码/文件变更可追溯性的重视。
- **文档预览集成**：Office 文件与 URL 的侧边栏预览，反映用户对“在 AI 工具内完成更多工作流”的偏好。
- **多格式支持**：Word、Excel、PowerPoint 的覆盖，说明工具正逐步向更广泛的办公与开发场景延伸。

---

### 6. 开发者关注点

当前版本更新中值得留意的开发者反馈方向：

- **插件生命周期管理**：实时启用/禁用插件的功能，可能涉及状态持久化、依赖冲突等问题，开发者需关注插件配置的稳定性。
- **文件对比体验**：逐文件审阅虽强大，但文件量大时是否支持批量操作或过滤仍需观察。
- **安全边界**：浏览器模式访问任意 URL 可能带来内容安全与隐私风险，需明确沙箱策略或权限控制。

---

*本日报由 AI 自动生成，数据来源：[github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)*

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报（2026-09-18）

## 1. 今日速览

今日无新版本发布。社区重点集中在**网关与桌面端可靠性**方向：桌面 clarify 事件丢失（#98503）和 MCP 断连（#103746）两个 Issue 均已关闭；新 PR #114505 改善了 fallback 链错误信息的可读性。同时，4 个网关相关 PR（#114504、#114416、#114442、#114502）密集提交，覆盖 bot-loop 防护、cron 持久化准入、ACP 终态与错误分类等关键问题。

## 2. 社区热点 Issues

### #98503 [已关闭] Desktop clarify 卡片不渲染 — clarify.request 事件在传输路由中丢失
- **优先级/标签**：P1 / comp/tui, comp/desktop, sweeper:risk-session-state
- **重要性**：后端执行成功但前端永远收不到 `clarify.request` WebSocket 事件，直接影响桌面端交互式澄清功能，说明传输层对会话事件的投递存在盲区。
- **社区反应**：8 条评论，P1 级高关注。关闭意味着该问题已有解决方案（或由相关 PR 修复）。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/98503)

### #103746 [已关闭] MCP 服务器连接 60-90 秒后断开（“revival” 逻辑缺陷）
- **优先级/标签**：P2 / tool/mcp, needs-repro, sweeper:cannot-reproduce
- **重要性**：任何 stdio 型 MCP 服务器在连接成功后 60-90 秒即断连，影响 MCP 工具链稳定性。标记 `needs-repro` 说明根因尚未完全定位，关闭可能为暂时降级或侧路修复。
- **社区反应**：6 条评论，含环境复现信息（Hermes v0.21.0 / macOS / Python 3.11.15，84 个工具）。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/103746)

### #113683 [开放] 每天更新 Linux 后端会导致 Windows GUI 停止工作
- **优先级/标签**：P2 / platform/windows, comp/desktop, comp/cli, comp/tui
- **重要性**：跨平台更新破坏桌面 GUI 的高频问题。用户反馈每次尝试不同的临时手段才能恢复，说明根因不明确且缺乏回归测试覆盖。
- **社区反应**：6 条评论，用户对“每次失败原因都不同”表示困惑，Windows 用户受影响较大。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/113683)

### #91713 [开放] 按会话的累计 token 预算（超限时中止或告警）
- **优先级/标签**：P2 / comp/agent, needs-decision, area/usage-cost
- **重要性**：引用了一次严重事故——单个会话 5 小时内消耗 **1870 万 tokens**（106 次 API 调用，被卡在工具重试循环）。累计预算属于成本护栏类需求，社区明显希望有机制兜底。
- **社区反应**：5 条评论，处于 `needs-decision` 状态，说明设计方案尚在权衡中。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/91713)

### #44843 [开放] `read_file` 在 `execute_code()` 沙箱中返回结构不一致
- **优先级/标签**：P2 / tool/file, tool/code-exec
- **重要性**：返回值结构随 `limit` 参数和文件是否被读过而变化，导致沙箱内自动流程解析失败。工具 API 的一致性对 Agent 自动化至关重要。
- **社区反应**：4 条评论，属于长期存在的历史 Issue（创建于 2026-06）。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/44843)

### #113887 [开放] [Wave] PR 分诊重构：superseded/stale（265 行，全标题范围扫描）
- **优先级/标签**：P3 / comp/cron, needs-decision
- **重要性**：这是一张维护者用的分诊表而非直接关闭列表，用于快速识别应关闭的过期 PR。265 个候选行，需要维护者确认。属于社区清理/健康度治理动作。
- **社区反应**：4 条评论，维护者需逐行确认，流程设计（shields.io 徽章实时状态）有一定关注。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/113887)

### #114495 [开放] `hermes -p <profile> gateway <action>` 未在 `--help` 中记录
- **优先级/标签**：P3 / comp/cli, area/profiles
- **重要性**：CLI 帮助信息不完整，用户无法通过 `--help` 获知 profile 作用域下的 gateway 生命周期命令。直接对应 PR #114497。
- **社区反应**：2 条评论，用户要求 Issue Bot 对所有 Hermes CLI 命令做帮助可见性检查。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/114495)

### #114503 [开放] Email 网关：mojibake 头导致 `msg.get()` 返回 Header 对象
- **优先级/标签**：P3 / 无明确组件
- **重要性**：邮件头包含原始非 ASCII 字节时退回 `Header` 对象而非 `str`，后续解析 `From/Subject/Message-ID` 可能出错。对邮件网关的健壮性构成隐患。
- **社区反应**：1 条评论，目前关注度不高但实际问题明确。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/114503)

### #92629 [开放] Desktop 设置中 Providers → Accounts 和 API keys 渲染相同页面
- **优先级/标签**：P3 / comp/desktop, area/auth
- **重要性**：两个不同侧边栏子项渲染为同一页面（API-key 目录），用户无法区分账户管理视图。典型 UI 路由渲染 bug。
- **社区反应**：1 条评论，影响桌面端设置体验。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/92629)

### #114501 [开放] 凭证池轮换后不恢复：活动会话在配额窗口重开后仍按付费 fallback 计费
- **优先级/标签**：P3 / 无明确组件
- **重要性**：当凭证池条目因 429 被 bench 并轮换到低优先级条目后，**活动会话永远不会切回首选凭证**；新会话正常但老会话持续产生 fallback 计费。直接影响成本。
- **社区反应**：0 条评论（最新 Issue），创建于 2026-09-17。
- [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/114501)

## 3. 重要 PR 进展

### #114505 [开放] fix(fallback)：在终端错误中命名整个回退链，而非仅最后一跳
- **内容**：`turn_recovery.py` 中的两个终端结果构造器只总结了当前后端触发的 `api_error`，导致回退链的失败看起来像终端节点自身问题。此 PR 将整个 walk 的完整路径注入错误信息，提升可观测性。
- **点评**：创建于 2026-09-18，是本次最“新鲜”的 PR，对定位多后端 fallback 问题很有价值。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/114505)

### #106450 [已关闭] fix(tui_gateway)：将中断的 clarify 展示为超时而非空取消
- **内容**：当 `clarify` 被阻塞且用户中断回合（Stop/Échap），或客户端断连后孤儿收割器触发时，`_clear_pending` 会以**空答案**释放提示，被 `clarify_tool` 视为 falsy 并产生歧义行为。本 PR 改为明确的**超时**语义。
- **点评**：解决 TUI/Desktop 交互中的悬空与误取消问题，已关闭（合并）。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/106450)

### #98514 [已关闭] fix(gateway)：通过 live viewers 救援死传输的会话事件
- **内容**：`write_json` 仅将事件路由到 `_sessions[sid]["transport"]`，但当传输是断连后 sentinel 或已 `_closed` 的 socket 时，`t.write()` 返回 `False` 且帧被静默丢弃。PR 改为通过 live viewers 重投事件，避免会话事件丢失。
- **点评**：与 #98503 桌面 clarify 事件丢失问题高度相关，修复传输路由盲区。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/98514)

### #114504 [开放] fix(gateway,agent)：人类语言重置 bot-loop 守卫；标记重复主导的工具参数
- **内容**：两个独立修复：1) 当 bot-to-bot 循环守卫触发后，新的人类消息应该立即重新武装守卫，而不是等待 `cooldown_seconds`；2) 对 GC 生成的重读工具参数（如重复相同的文件名）做标记。含回归测试（44/44 通过）。
- **点评**：兼顾交互恢复与工具调用质量控制，当前开放等待评审。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/114504)

### #114416 [开放] fix(gateway)：要求 durable cron 准入后才响应 webhook 202
- **内容**：拒绝在无法持久认领目标 job 快照时直接返回 202；对 paused、busy、disabled、completed、unknown、ambiguous 或存储失败状态改为返回可重试的 503，且不消耗 delivery ID。执行时使用已认领的快照，避免重复认领。
- **点评**：强化 webhook 触发 cron 任务的 at-least-once 语义，防止事件丢失或重复执行。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/114416)

### #114442 [开放] fix(acp)：在回合结束前为每个工具调用赋予终态
- **内容**：修复 ACP 客户端展示工具调用永久处于 `in_progress` 的问题（#114395）。基于 #50741（@liuhao1024）补充了除了 `tool.completed` 之外的其他终态路径，确保回合结束时所有调用都有明确状态。
- **点评**：对 ACP 协议消费者（IDE 客户端等）的进度展示和状态同步很重要。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/114442)

### #114502 [开放] fix(gateway)：区分 provider 400 与 context overflow
- **内容**：此前任何 HTTP 400/500 在长会话中都会被误判为上下文溢出，导致返回误导性的 `/compact` 建议。该 PR 准确区分 provider/model 层面的拒绝与真正的 context overflow。
- **点评**：可减少错误操作引导，提升长会话运维体验。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/114502)

### #114497 [开放] fix(cli)：在 `--help` 中记录 `-p <profile>` 与 gateway 服务动词
- **内容**：`-p/--profile` 在 argparse 运行前就被 `main._apply_profile_override` 消费，因此从未出现在帮助信息中；epilogue 中 gateway 行也只写了 `hermes gateway`。该 PR 将 profile 作用域下的 gateway 生命周期动词（如 `gateway start/stop`）补全到 `--help`。
- **点评**：直接修复 Issue #114495，解决 CLI 可发现性缺失。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/114497)

### #114398 [开放] fix(desktop)：将会话行记录当前登录用户
- **内容**：通过 Desktop 创建的会话在 `state.db` 中 `user_id` 始终为空，尽管后端在 `logs/dashboard-auth.log` 中已写入正确身份。该 PR 让会话创建时正确记录登录用户 ID。
- **点评**：修复多用户审计与配额统计中的身份缺失问题。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/114398)

### #102765 [开放] bundles & unified package manager（统一包管理器）
- **内容**：大型架构性 PR——统一 Hermes 的工具安装、依赖准备、自包含包构建与更新器所有权。核心是新增 `pm/` 目录，由 `pm/lock.json` 固定产物版本，并记录已安装事实。
- **点评**：影响面积广（comp/agent、cli、gateway、tools、docker、desktop、windows），是当前开放中最大的 feature 级 PR；处于 P3 / needs-decision 状态，社区讨论价值高。
- [查看 PR](https://github.com/NousResearch/hermes-agent/pull/102765)

## 4. 功能需求趋势

### 4.1 网关与消息投递可靠性（最高热度）
大量 PR 和 Issue 指向 gateway 层的数据面可靠性：事件丢失（#98514）、错误分类（#114502）、cron 准入（#114416）、bot-loop 防护（#114504）、语音消息排队归属（#114380）、更新重启后存活（#107445）。这说明社区对网关的**投递保障**和**状态一致性**有强需求。

### 4.2 桌面端体验与跨平台稳定性
桌面相关条目频繁出现：clarify 事件渲染（#98503）、Windows GUI 因 Linux 后端更新而失效（#113683）、设置页路由错误（#92629）、模型发现显示（#114375）、登录用户记录（#114398）。Windows + Desktop 的组合稳定性成为重点关注对象。

### 4.3 成本控制与配额管理
#91713 的按会话 token 预算、#114501 的凭证池不恢复导致持续 fallback 计费，说明用户对**运行成本失控**非常敏感。事故驱动的成本护栏需求开始进入决策流程。

### 4.4 MCP 与工具生态一致性
MCP 服务器连接稳定性（#103746）与工具返回结构不一致（#44843）是工具生态的核心痛点。同时，kanban_create 增加 `reasoning_effort` 参数（#114432）表明工具能力在持续补强。

### 4.5 插件生态与 CLI 可发现性
plugin-catalog 在多个 PR 中活跃（#114500、#113581、#114261、#113580），新增了 Hermes Outpost、Mnemosyne 内存层等集成。CLI 侧则集中解决 `--help` 文档不完整问题（#114495/#114497），强调**可发现性也是功能**。

## 5. 开发者关注点

| 痛点/需求 | 相关条目 |
|---|---|
| 事件在传输路由中静默丢失，前端收不到会话事件 | #98503, #98514 |
| 更新后端组件破坏其他平台功能（Linux → Windows GUI） | #113683 |
| token 成本失控风险（单次事故 1870 万 token） | #91713 |
| fallback 凭证轮换后不恢复，持续按付费档计费 | #114501 |
| 工具 API 行为不一致（取决于参数和历史状态） | #44843 |
| MCP 服务器连接成功后周期性断连 | #103746 |
| 错误信息存在误导性（fallback 命名不完整、400 误判为 context overflow） | #114505, #114502 |
| 桌面端登录用户身份未写入会话记录 | #114398 |
| CLI 帮助信息与行为不符，profile 作用域命令不可发现 | #114495, #114497 |

---

*数据来源：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 生成时间：2026-09-18*

:::
