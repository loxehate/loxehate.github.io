---
title: "AI CLI 工具社区动态日报"
published: 2026-09-11
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-11

> 生成时间: 2026-09-11 00:00 UTC | 覆盖工具: 7 个

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

**报告日期：2026-09-11**

---

## 1. 生态全景

2026 年 9 月的 AI CLI 工具生态呈现**"多强并立、快速分化"**的格局。Claude Code 和 OpenAI Codex 凭借先发优势占据社区规模头部，但均面临**平台级稳定性危机**（Windows 兼容性、模型容量）；Gemini CLI 和 OpenCode 处于**架构重构期**（V2/沙箱安全），技术债与创新并行；DeepSeek Reasonix 和 Hermes 作为后起之秀，在**桌面端体验和 Agent 编排**上差异化发力，但发布质量管控仍显不足。整体来看，**成本控制可信度、多 Agent 可靠性、跨平台一致性**已成为全行业共同面临的三大核心挑战。

---

## 2. 各工具活跃度对比

| 工具 | 今日 Issues 更新 | 今日 PR 更新 | Release 情况 | 社区规模信号 |
|------|-----------------|-------------|-------------|-------------|
| **Claude Code** | ~50 条（Top 10 中 5 条 24h 内爆发） | 3 条重要 PR | v2.1.268（正式） | 单 Issue 最高 170 评论，👍 最高 82 |
| **OpenAI Codex** | 10+ 条热点 | 20+ 条（自动化密集合入） | Python SDK 0.154.0 / Rust 0.155.0-alpha.2 | 单 Issue 最高 35 评论，👍 最高 50 |
| **Gemini CLI** | 49 条更新 | 10 条重要 PR | v0.61.0-nightly（每日构建） | 单 Issue 最高 42 评论，P1 集中 |
| **DeepSeek Reasonix** | 15 条 | 10 条重要 PR | v1.38.5（存在启动缺陷）→ v1.38.6 紧急准备 | 单 Issue 最高 5 评论，👍 最高 1 |
| **OpenCode** | 13 条 | 50 条 PR 更新 | 无新版本 | 单 Issue 最高 53 👍，13 评论 |
| **DeepSeek Harness** | 0 条 | 0 条 | v0.1.5-rc.1 / rc.2（候选版） | 活跃度极低 |
| **Hermes** | 6 条精选 | 10 条重要 PR | 无新版本 | 单 Issue 最高 5 评论，P1 级 2 条 |

**活跃度梯队**：
- **第一梯队**：Claude Code、OpenAI Codex（Issue 和 PR 双高，社区讨论深度大）
- **第二梯队**：Gemini CLI、OpenCode（PR 活跃度极高，架构演进中）
- **第三梯队**：DeepSeek Reasonix、Hermes（规模较小但维护者响应快）
- **观察区**：DeepSeek Harness（几乎无社区互动）

---

## 3. 共同关注的功能方向

### 3.1 成本控制与用量透明度（全行业痛点）

| 工具 | 具体诉求 |
|------|---------|
| **Claude Code** | `budget.spent()` 报告值比实际低 72 倍（#83048）；自动扣费异常（#68773） |
| **OpenAI Codex** | 配额消耗异常跨报告追踪帖（#41220）；App 端用量显著高于 CLI（#44459） |
| **OpenCode** | TUI 中显示 Token 用量信息（#13003，👍 53，全社区最高赞功能请求） |
| **Hermes** | Kanban 按任务聚合 token 和成本（PR #107765） |

**核心诉求**：开发者需要**可信赖的、per-turn 粒度的成本归因工具**，而非仅总量统计。

### 3.2 多 Agent / 子代理可靠性（架构级挑战）

| 工具 | 具体问题 |
|------|---------|
| **Claude Code** | 子代理递归生成失控（#82565：请求 3 个实际运行 24 个）；`/model` 无法按 agent 隔离配置（#66402） |
| **Gemini CLI** | 子代理 MAX_TURNS 中断误报成功（#22323）；Generalist 代理挂起（#21409）；模型不主动调用 skills（#21968） |
| **OpenAI Codex** | Windows 恢复子代理线程产生重复 MCP 进程（#37453） |
| **Hermes** | Kanban 依赖阻塞任务重复派发（#107784，P1 回归） |

**核心诉求**：子代理需要**可靠的终止语义、资源上限、配置隔离**，而非"尽力而为"的执行模型。

### 3.3 跨平台一致性（Windows 成为重灾区）

| 工具 | 具体问题 |
|------|---------|
| **Claude Code** | Windows 更新 KB5124008 导致 Cowork Plan9 挂载全部失效（#92984）；Desktop 文件锁无法重启（#42776，170 评论） |
| **OpenAI Codex** | Android Remote 无法验证 Windows 项目（#40002）；Windows 沙箱权限问题（#36475） |
| **DeepSeek Reasonix** | v1.38.5 桌面端版本号不一致导致无法启动（Windows 用户集中报告） |

**核心诉求**：Windows 平台需要**与 macOS/Linux 同等级别的测试覆盖和回归防护**。

### 3.4 Prompt Cache 效率（成本优化的隐形战场）

| 工具 | 具体问题 |
|------|---------|
| **Claude Code** | `--resume` 在 Fable 5.1 上从不命中缓存（#93490）；多个 Issue 指向同一缓存失效机制 |
| **OpenCode** | 自动压缩后上下文丢失（#41358）；文件系统快照与模型编排耦合（#44511） |

**核心诉求**：缓存命中率直接影响用户成本，需要**模型版本感知的缓存策略**和**上下文管理机制的可预测性**。

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 | 核心优势 | 核心短板 |
|------|---------|---------|---------|---------|---------|
| **Claude Code** | Cowork 远程协作、企业网关、多 Agent 编排 | 企业团队、远程开发场景 | 深度绑定 Anthropic 模型，Plan9 挂载 + 会话代理 | 企业级功能最丰富，社区反馈深度大 | Windows 兼容性危机，成本工具可信度低 |
| **OpenAI Codex** | 多模型支持（GPT-5/6）、语音会话、MCP 生态 | 全层级开发者，Pro 订阅用户 | 多提供商适配，Python/Rust 双 SDK | 模型选择灵活，PR 自动化程度高 | 模型容量瓶颈，配额消耗不透明 |
| **Gemini CLI** | 沙箱安全、企业认证、Auto Memory | Google 生态企业用户 | 深度绑定 Gemini 模型，多沙箱后端 | 安全加固投入大，nightly 迭代快 | 子代理可靠性差，企业认证故障 |
| **DeepSeek Reasonix** | 桌面端 Electron、证据校验、长时任务 | 中文社区、桌面端用户 | Go 后端 + Electron 前端，DeepSeek 模型 | 桌面端体验投入大，维护者响应快 | 发布质量管控不足，社区规模小 |
| **OpenCode** | TUI 分组树、多提供商兼容、V2 架构 | 终端重度用户、多模型用户 | Bun 原生构建，Effect 函数式架构 | TUI 体验创新，提供商兼容性广 | V2 稳定性问题，上下文管理缺陷 |
| **DeepSeek Harness** | 模型适配器、文件上传、反馈闭环 | DeepSeek 模型用户 | 轻量级 Harness 封装 | 模型适配快速，UI 细节打磨 | 社区几乎无互动，功能范围窄 |
| **Hermes** | Kanban 调度器、Desktop 语音、多 Profile | 自动化工作流用户 | 多进程架构（CLI/TUI/Desktop/Gateway） | Kanban 调度器创新，安全边界意识强 | 配置传递可靠性差，MCP 兼容性不足 |

**关键差异**：
- **Claude Code vs OpenAI Codex**：前者押注**远程协作和企业管控**，后者押注**模型多样性和语音交互**。
- **Gemini CLI vs OpenCode**：前者是**安全优先**的 Google 生态工具，后者是**体验优先**的终端原生工具。
- **DeepSeek Reasonix vs Hermes**：前者聚焦**桌面端一体化体验**，后者聚焦**调度器驱动的自动化工作流**。

---

## 5. 社区热度与成熟度

### 5.1 社区热度矩阵

```
高热度 × 高成熟度：Claude Code、OpenAI Codex
    - 社区规模大，Issue 讨论深度高（170 评论级）
    - 但成熟度受限于平台级稳定性问题

高热度 × 低成熟度：OpenCode、Gemini CLI
    - PR 活跃度极高（50 条/日），架构快速演进
    - 但 V2 稳定性、子代理可靠性等基础问题未解决

低热度 × 中成熟度：DeepSeek Reasonix、Hermes
    - 维护者响应快，功能有特色
    - 但社区规模小，问题发现依赖少数活跃用户

低热度 × 低成熟度：DeepSeek Harness
    - 几乎无社区互动，处于工具化早期
```

### 5.2 成熟度信号

| 信号 | Claude Code | OpenAI Codex | Gemini CLI | OpenCode | Reasonix | Hermes |
|------|-------------|-------------|------------|----------|----------|--------|
| **发布节奏** | 稳定版 + 快速修复 | SDK 正式版 + 自动化 PR | 每日 nightly | 无版本发布，PR 驱动 | 稳定版但存在发布缺陷 | 无版本发布 |
| **Issue 响应** | 中（长期 Bug 未解决） | 中（容量问题持续） | 快（安全 PR 响应积极） | 中（V2 问题积累） | 快（数小时修复启动故障） | 快（P1 修复及时） |
| **架构稳定性** | ⚠️ Windows 兼容性危机 | ⚠️ 模型容量瓶颈 | ⚠️ 子代理可靠性差 | ⚠️ V2 上下文管理缺陷 | ⚠️ 发布质量管控不足 | ⚠️ 多进程配置传递缺陷 |

---

## 6. 值得关注的趋势信号

### 6.1 行业趋势

**趋势一：从"模型竞争"转向"基础设施竞争"**
模型能力不再是唯一差异化因素。Claude Code 的 Cowork 远程协作、OpenAI Codex 的语音会话、Gemini CLI 的沙箱安全、Hermes 的 Kanban 调度器——**工具层的工程能力正在成为核心竞争力**。

**趋势二：成本控制从"事后统计"转向"事前护栏"**
`budget.spent()` 失真（Claude Code）、配额消耗异常（OpenAI Codex）、Token 用量不可见（OpenCode）——用户不再满足于"用了多少"，而是要求**"还能用多少、什么时候会超、超了怎么办"**。预算护栏和自动恢复机制将成为标配。

**趋势三：多 Agent 编排从"实验特性"转向"生产要求"**
子代理失控生成（Claude Code）、误报成功（Gemini CLI）、重复派发（Hermes）——多 Agent 系统的**可靠性语义**（终止条件、资源上限、状态一致性）成为企业采用的关键门槛。

**趋势四：Windows 平台从"二等公民"转向"一等公民"**
Windows 更新导致 Cowork 挂载失效（Claude Code）、桌面端启动失败（Reasonix）、路径大小写问题（Codex）——随着 AI CLI 工具从开发者个人使用扩展到团队部署，**Windows 兼容性测试必须纳入发布门槛**。

**趋势五：安全边界从"功能附加"转向"架构内置"**
Gemini CLI 的沙箱文件系统隔离（PR #29283）、提示注入防护（PR #29250）、路径遍历修复（PR #29249）；Hermes 的多 Profile 环境隔离（PR #107695）——**安全不再是一个 feature，而是架构设计的基本约束**。

### 6.2 对开发者的参考价值

| 决策场景 | 建议 |
|---------|------|
| **选择主力 CLI 工具** | 优先考虑**成本透明度**和**跨平台稳定性**，而非模型能力差异。当前所有工具在成本可信度上都有缺陷，建议搭配独立的 token 统计工具 |
| **企业团队部署** | Claude Code 的企业网关功能最丰富，但需评估 Windows 兼容性风险；Gemini CLI 的安全加固适合合规要求高的场景 |
| **多模型策略** | OpenAI Codex 和 OpenCode 的多提供商兼容性最强，适合需要灵活切换模型的团队 |
| **桌面端优先** | DeepSeek Reasonix 和 Hermes 在桌面端体验上投入大，但需接受其社区规模小、问题发现慢的风险 |
| **自动化工作流** | Hermes 的 Kanban 调度器是差异化亮点，但需关注其多进程架构的配置传递可靠性 |
| **长期观察** | OpenCode 的 TUI 分组树引擎（#48394-48399）和 Gemini CLI 的 AST 感知工具链（#22745）代表了下一代终端交互和代码理解的方向 |

---

*报告生成时间：2026-09-11 | 数据来源：各工具 GitHub 仓库社区动态*

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止：2026-09-11 | 来源：github.com/anthropics/skills**

---

## 1. 热门 Skills 排行

> 注：原始数据中 PR 评论数未提供具体数值，以下按 Issue 评论热度及 PR 更新活跃度综合排序。

### 1.1 skill-creator 评估修复系列（#1298 / #1099 / #1050）
- **功能**：修复 `run_eval.py` 在 Windows 上的崩溃、编码问题及 0% recall 误报，使 skill 描述优化循环真正可用
- **讨论热点**：Windows 兼容性长期被忽视，多个独立 PR 从不同角度修复同一问题（subprocess 管道读取、`claude.cmd` 解析、编码），社区呼吁合并统一方案
- **状态**：OPEN（#1298 更新至 2026-06-23，关联 Issue #556 有 12 条评论、7 👍）
- **链接**：[#1298](https://github.com/anthropics/skills/pull/1298) | [#1099](https://github.com/anthropics/skills/pull/1099) | [#1050](https://github.com/anthropics/skills/pull/1050)

### 1.2 document-typography（#514）
- **功能**：AI 生成文档的排版质量控制——检测孤行（1-6 词溢出到下一行）、寡段（标题孤立在页底）、编号错位
- **讨论热点**：用户很少主动要求排版优化，但这是"每个 Claude 生成文档都存在的问题"，属于隐性质量提升
- **状态**：OPEN（2026-03-04 创建，3 月活跃）
- **链接**：[#514](https://github.com/anthropics/skills/pull/514)

### 1.3 Hivemind 多智能体编排（#1628）
- **功能**：让 Claude Code 将机械性工作委派给运行免费模型的 headless opencode workers，Claude 保持唯一规划者/审查者/合并者角色
- **讨论热点**："昂贵模型的上下文是稀缺资源，不是智能"——零成本多智能体协作范式引发关注
- **状态**：OPEN（2026-08-21 创建，8 月活跃）
- **链接**：[#1628](https://github.com/anthropics/skills/pull/1628)

### 1.4 self-audit 推理质量门（#1367）
- **功能**：交付前审计——先做机械性文件验证，再按损害严重程度优先级进行四维推理审计
- **讨论热点**：与 Issue #1385（三阶段质量门提案）呼应，社区对"AI 输出交付前验证"需求强烈
- **状态**：OPEN（2026-06-28 创建，7 月活跃）
- **链接**：[#1367](https://github.com/anthropics/skills/pull/1367)

### 1.5 Buffer GraphQL API Skill（#1627）
- **功能**：通过 Buffer GraphQL API 实现社媒帖子调度、管理和分析，可从任何 AI agent（Claude、Cursor、Codex 等）调用
- **讨论热点**：跨 agent 可移植性设计，展示了 Skill 作为"通用 AI 工具接口"的潜力
- **状态**：OPEN（2026-08-21 创建，9 月仍活跃）
- **链接**：[#1627](https://github.com/anthropics/skills/pull/1627)

### 1.6 ODT 文档技能（#486）
- **功能**：OpenDocument 格式（.odt/.ods）的创建、模板填充、读取及 ODT→HTML 转换
- **讨论热点**：开源文档格式支持，与 docx/pdf 技能形成互补
- **状态**：OPEN（2026-03-01 创建，4 月活跃）
- **链接**：[#486](https://github.com/anthropics/skills/pull/486)

---

## 2. 社区需求趋势

从 Issues 提炼出的核心需求方向：

| 需求方向 | 代表 Issue | 热度 |
|---------|-----------|------|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492) — 社区技能冒充官方 `anthropic/` 命名空间，43 条评论 | 🔥 最高 |
| **组织级技能共享** | [#228](https://github.com/anthropics/skills/issues/228) — Claude.ai 组织内技能共享，16 条评论、8 👍 | 🔥 高 |
| **技能评估工具修复** | [#556](https://github.com/anthropics/skills/issues/556) — run_eval.py 0% 触发率，12 条评论、7 👍 | 🔥 高 |
| **上下文窗口优化** | [#1487](https://github.com/anthropics/skills/issues/1487) — claude-api 技能注入 156k tokens 耗尽上下文 | 中 |
| **紧凑记忆/状态管理** | [#1329](https://github.com/anthropics/skills/issues/1329) — 符号化紧凑 agent 状态表示 | 中 |
| **质量门/审计流水线** | [#1385](https://github.com/anthropics/skills/issues/1385) — 推理质量三阶段门控 | 中 |
| **MCP 互操作** | [#16](https://github.com/anthropics/skills/issues/16) — 将 Skills 暴露为 MCP 协议 | 低但持续 |

**趋势总结**：社区需求已从"更多技能"转向**技能基础设施的可靠性、安全性和可治理性**。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，近期合并概率较高：

| PR | 技能 | 合并潜力信号 |
|----|------|-------------|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评估修复 | 关联 Issue #556 有 10+ 独立复现，修复面最全 |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder 兼容 mcp≥2.0 | 直接修复 Issue #1668，API 重命名是硬性兼容问题 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | claude-api 模型 ID 更新 | 修复 Issue #1603，模型退役是时效性问题，维护者通常快速合并 |
| [#541](https://github.com/anthropics/skills/pull/541) | docx 跟踪修订 ID 冲突修复 | 防止文档损坏，属于正确性修复 |
| [#538](https://github.com/anthropics/skills/pull/538) | pdf 大小写敏感引用修复 | 简单明确的 bug fix，8 处引用错误 |

---

## 4. Skills 生态洞察

> **当前社区最集中的诉求是：让 Skills 从"能用"走向"可信"——既要修复评估工具和跨平台兼容性等基础设施问题，也要建立命名空间信任边界和组织级分发机制，使 Skills 成为企业可治理、个人可依赖的 AI 能力扩展层。**

---

# Claude Code 社区动态日报

**日期：2026-09-11**

---

## 1. 今日速览

今日社区焦点集中在 **Windows 平台 Cowork 功能的 Plan9 挂载故障**——9 月 8-9 日的 Windows 更新（KB5124008）导致大量用户无法使用远程会话，相关 Issue 在 24 小时内激增至 80+ 条评论。同时，**v2.1.268 发布**，为 Claude 应用网关带来了定价同步能力。此外，一个关于 **Claude Code Desktop 在 Windows 上因文件锁无法重启**的长期 Bug（#42776）评论数已达 170 条，持续引发用户不满。

---

## 2. 版本发布

### v2.1.268
- **Claude 应用网关定价同步**：在 `gateway.yaml` 中设置 `pricing:` 后，已登录的 Claude Code 客户端将通过托管设置获得相同费率，使 `/cost` 和遥测数据与消费计量器保持一致。
- **网关启动警告**：当 `access_control.allow_cidrs` 为空时，启动时新增警告提示。

🔗 [Release v2.1.268](https://github.com/anthropics/claude-code/releases/tag/v2.1.268)

---

## 3. 社区热点 Issues（Top 10）

### 🔥 #92984 — Windows 更新 KB5124008 导致 Cowork Plan9 挂载全部失效
**评论：81 | 👍：40**
9 月 9 日创建，24 小时内爆发。Windows 更新后所有 Plan9 共享挂载失败，卸载 KB 即可恢复。这是当前影响面最广的 Cowork 故障，多个关联 Issue（#93118、#93071、#93221）均指向同一根因。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/92984)

### 🔥 #42776 — Desktop 在 Windows 上因孤儿进程文件锁无法重启
**评论：170 | 👍：82**
自 4 月创建以来持续活跃，是社区最长寿的高热度 Bug。用户更新后无法重新启动应用，需手动清理进程。170 条评论表明该问题长期未获根本解决。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/42776)

### 🔥 #30112 — Cowork 网络出口白名单不生效，自定义域名被 403 拦截
**评论：57 | 👍：54**
3 月创建，至今未关闭。用户配置的 allowlist 在会话代理 JWT 中未正确反映，导致合法域名被阻止。与 #34690 属于同一类网络策略问题。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/30112)

### 🔥 #76248 — Cowork 云会话 git 代理阻止所有 push 操作
**评论：34 | 👍：14**
7 月 10 日起，远程会话无法向未授权仓库推送，即使用户提供 PAT 也不再生效。疑似 `CCR_TEST_GITPROXY` 灰度发布导致，对依赖 Cowork 做远程开发的团队影响严重。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/76248)

### 🔥 #83510 — Claude Generation 5 模型质量可测量回归
**评论：13 | 👍：21**
用户提供了可复现的测量数据，指出 Fable 5 / Opus 5 / Sonnet 5 在废话检测、输出冗长度（~2x）和未披露的模型降级（Fable 5 → Opus 4.8）方面存在明显退化。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/83510)

### 🔥 #66402 — `/model` 和 `/effort` 修改全局配置，破坏 agents/fleet 视图
**评论：14 | 👍：14**
6 月创建，持续未解决。用户无法为不同 agent 配置独立的模型和 effort 参数，对多 agent 并行工作流构成阻碍。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/66402)

### 🔥 #92183 — Desktop 应用禁止 SendMessage，子代理无法被消息或恢复
**评论：6 | 👍：18**
9 月 4 日创建，点赞数增长迅速。Desktop 的 Code 标签页中无法向运行中或已完成的子代理发送消息，限制了 agent 协作能力。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/92183)

### 🔥 #83048 — `budget.spent()` 报告值比实际消耗低 72 倍
**评论：4 | 👍：0**
标记为 SEV-1。用户在 4 小时内耗尽周预算，但 API 报告仅消耗了 3-4%。成本控制失效可能导致用户产生意外账单。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/83048)

### 🔥 #93490 — `--resume` 在 Fable 5.1 上从不命中提示缓存（Opus 正常）
**评论：2 | 👍：0**
9 月 10 日新创建，已有复现。会话启动上下文消息被以纯字符串而非原始内容块重放，导致缓存失效。与 #91971、#83913 属于同一缓存机制问题族。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/93490)

### 🔥 #82565 — 通用子代理递归生成：请求 3 个实际运行 24 个
**评论：1 | 👍：0**
用户请求 3 个研究子代理，最终 24 个 agent 运行，80% token 被浪费，20 分钟内耗尽月度限额。子代理失控生成是成本管理的重要隐患。
🔗 [查看 Issue](https://github.com/anthropics/claude-code/issues/82565)

---

## 4. 重要 PR 进展

### #93452 — mods/diff: 对齐内置 /diff 面板
**作者：@poteat | 状态：OPEN**
将 `/diff` mod 的面板与内置 diff 面板对齐：通过引擎代码元素绘制 hunk、内置关闭按钮 ✕、行间距和空状态位置、窄终端调整行，以及同时仅一个仓库探测请求。
🔗 [查看 PR](https://github.com/anthropics/claude-code/pull/93452)

### #93244 — mods: API 重命名、遥测修复和 diff 后端接缝
**作者：@poteat | 状态：CLOSED（已合并）**
跟随插件 API 命名调整（`isFocused`、`tool`），收紧遥测逻辑（行按顺序发送、每个分析开关按行读取、第三方提供者不发送任何数据），并为 diff mod 提供后端接缝，以 git 作为内置后端。
🔗 [查看 PR](https://github.com/anthropics/claude-code/pull/93244)

### #89404 — validate-agent.sh: 修复首个警告即中止及误报问题
**作者：@bcherny | 状态：OPEN**
修复 `set -euo pipefail` 与算术表达式交互导致的三个根因：首个警告即中止、有效 agent 被误报。关联 Issue #83803。
🔗 [查看 PR](https://github.com/anthropics/claude-code/pull/89404)

---

## 5. 功能需求趋势

基于过去 24 小时更新的 50 条 Issue 分析，社区关注方向如下：

| 方向 | 代表 Issue | 热度信号 |
|------|-----------|---------|
| **Cowork/远程会话稳定性** | #92984, #76248, #93118, #93071, #93221 | 5+ 个新 Issue 集中在 48 小时内爆发，Windows 平台受影响最重 |
| **成本控制与计费准确性** | #83048, #68773, #80750, #86033 | 多个 SEV-1 级别报告，涉及预算 API 失真和自动扣费异常 |
| **Prompt Cache 效率** | #93490, #91971, #83913 | 3 个独立 Issue 指向同一缓存失效机制，影响 token 成本 |
| **多 Agent 管理** | #66402, #92183, #82565 | 子代理配置隔离、消息传递、递归生成控制是核心诉求 |
| **模型质量回归** | #83510 | 用户开始提供量化对比数据，关注模型降级透明度 |
| **Windows 平台兼容性** | #42776, #92984, #88692 | Windows 更新与 Claude Code 的兼容性成为高频故障源 |

---

## 6. 开发者关注点

### 🔴 痛点一：Windows 更新与 Claude Code 的兼容性危机
9 月 8-9 日的 Windows 更新（KB5124008）直接破坏了 Cowork 的 Plan9 挂载机制，且影响面覆盖 Windows 10 22H2 和 Windows 11 多个版本。开发者普遍反映**缺乏事前兼容性测试和快速回滚指引**。此外，#42776 的 170 条评论表明 Desktop 应用在 Windows 上的进程管理长期存在问题。

### 🔴 痛点二：成本控制工具的可信度
`budget.spent()` 报告值比实际消耗低 72 倍（#83048），自动充值循环扣费 29 次（#68773），5 小时配额消耗突增 15-20 倍（#86033）——这些报告共同指向一个核心问题：**开发者无法信任内置的成本监控工具**。在生产环境中使用 Claude Code 的团队需要可靠的预算护栏。

### 🔴 痛点三：Prompt Cache 命中率不可预测
多个 Issue（#93490、#91971、#83913）从不同角度报告了缓存失效问题，且与特定模型版本（Fable 5.1）相关。对于依赖 `--resume` 进行长会话开发的用户，缓存未命中意味着**成本成倍增加**。

### 🟡 痛点四：多 Agent 工作流的配置隔离缺失
`/model` 和 `/effort` 的全局写入行为（#66402）使得开发者无法为不同 agent 配置差异化参数。子代理递归生成失控（#82565）进一步暴露了 agent 编排层面缺乏资源限制机制的问题。

---

*报告生成时间：2026-09-11 | 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报

**日期：2026-09-11**

---

## 1. 今日速览

今日社区焦点集中在**模型容量与配额消耗异常**两大问题上——多个 GPT-5/GPT-6 模型频繁返回 "Selected model is at capacity" 错误，同时大量用户报告 Codex 配额消耗速度远超预期。版本方面，Python SDK 发布 0.154.0 正式版，新增 `max` 和 `ultra` 推理强度档位；Rust 侧则推进至 0.155.0-alpha.2。PR 侧由自动化系统密集合入 20+ 项修复，覆盖语音会话保活、Windows 沙箱、OAuth 恢复、TUI 无障碍等方向。

---

## 2. 版本发布

### 🐍 Python SDK v0.154.0（正式版）
- 安装：`pip install --upgrade openai-codex==0.154.0`（需 Python 3.10+）
- 配套运行时：`openai-codex-cli-bin==0.154.0`
- 核心更新：
  - 新增 `max` 和 `ultra` 两档 reasoning-effort 值（[#39662](https://github.com/openai/codex/pull/39662)）
  - 同步 API 新增 `ExternalMessage` 支持

### 🦀 Rust v0.155.0-alpha.1 / alpha.2
- 预发布版本，处于快速迭代阶段，具体变更未在 Release Notes 中展开

### 🔧 其他
- `voice-cygwin-*`：Windows 原生语音功能的 CI 构建工具链归档（含 103 个 Cygwin 二进制包及对应源码），**不包含在用户包中**

---

## 3. 社区热点 Issues（Top 10）

### 🔥 #41220 — Codex 配额消耗异常跨报告追踪帖
- **标签**：`bug, rate-limits` | **评论**：35 | 👍 13
- **为什么重要**：这是一个 Meta 追踪 Issue，汇总了大量用户报告的配额/额度消耗异常问题。用户普遍反映订阅配额或购买额度消耗速度远超历史基线和本地 token 统计，且在使用模式未变的情况下出现突变。
- **社区反应**：高关注度，已成为配额类问题的集中讨论地。
- [链接](https://github.com/openai/codex/issues/41220)

### 🔥 #43375 — 多个 GPT-5/GPT-6 模型返回 "Selected model is at capacity"
- **标签**：`bug, rate-limits` | **评论**：20 | 👍 11
- **为什么重要**：容量错误不再局限于单一模型，用户在多个 GPT-5/GPT-6 模型间切换均遇到此问题，暗示可能是平台级容量瓶颈。
- **社区反应**：多个相似 Issue 被创建，形成集群效应。
- [链接](https://github.com/openai/codex/issues/43375)

### 🔥 #21073 — 功能请求：用量限制重置后自动恢复 CLI 会话
- **标签**：`enhancement, rate-limits, enterprise` | **评论**：15 | 👍 50
- **为什么重要**：👍 数在所有活跃 Issue 中最高。用户希望当配额在夜间重置时，CLI 能自动恢复被中断的任务，而非浪费重置时间信息。
- **社区反应**：企业用户呼声强烈，是配额管理体验的核心痛点。
- [链接](https://github.com/openai/codex/issues/21073)

### 🔥 #42683 — Alt+P 快捷键导致应用崩溃退出（已关闭）
- **标签**：`bug, windows-os, app, Linux` | **评论**：15 | 👍 5
- **为什么重要**：Windows 平台上的高频崩溃问题，影响基础使用体验。已关闭，推测已有修复方案。
- [链接](https://github.com/openai/codex/issues/42683)

### 🔥 #40002 — Android Remote 无法验证 Windows 项目（大小写敏感路径问题）
- **标签**：`bug, windows-os, app, config, remote` | **评论**：15 | 👍 9
- **为什么重要**：跨平台 Remote 功能的核心兼容性问题，影响移动端与 Windows 主机的协作场景。
- [链接](https://github.com/openai/codex/issues/40002)

### 🔥 #18396 — 功能请求：TUI 中隐藏工具调用/输出
- **标签**：`enhancement, TUI` | **评论**：13 | 👍 34
- **为什么重要**：高 👍 数表明大量 CLI 用户对终端被工具调用日志淹没感到困扰，希望有更简洁的显示模式。
- [链接](https://github.com/openai/codex/issues/18396)

### 🔥 #44382 — 持续的 "Selected model is at capacity" 使 Codex 不可用
- **标签**：`bug, rate-limits, CLI` | **评论**：11 | 👍 5
- **为什么重要**：Pro 20x 订阅用户在使用 `gpt-6-astra ultra fast` 时遭遇持续容量错误，说明即使最高档订阅也无法规避容量问题。
- [链接](https://github.com/openai/codex/issues/44382)

### 🔥 #37453 — Windows Desktop 恢复历史子代理线程时产生重复 MCP 进程
- **标签**：`bug, windows-os, mcp, app, subagent, performance` | **评论**：10 | 👍 0
- **为什么重要**：涉及 MCP 生命周期管理和子代理的深层架构问题，可能导致资源泄漏和性能下降。
- [链接](https://github.com/openai/codex/issues/37453)

### 🔥 #21803 — 功能请求：Codex Projects 和 Chats 跨设备同步
- **标签**：`enhancement, app, session` | **评论**：7 | 👍 37
- **为什么重要**：高 👍 数反映了多设备用户对会话连续性的强烈需求，是产品体验的重要缺口。
- [链接](https://github.com/openai/codex/issues/21803)

### 🔥 #44561 — 默认关闭 Astra 星星特效（whimsy effect）
- **标签**：`enhancement, TUI, CLI, config` | **评论**：5 | 👍 1
- **为什么重要**：虽然 👍 不多，但反映了 TUI 视觉设计对用户体验的直接影响——部分用户将特效误认为屏幕故障。
- [链接](https://github.com/openai/codex/issues/44561)

---

## 4. 重要 PR 进展（Top 10）

### ✅ #44675 — 在模型请求边界刷新全局指令
- **修复内容**：运行中的根线程现在会在每次模型请求时重新加载全局 `AGENTS.md` 文件，使编辑在活动会话中即时生效。
- [链接](https://github.com/openai/codex/pull/44675)

### ✅ #44671 — 语音会话在静音和音频积压时保持存活
- **修复内容**：丢弃过期/过量的音频帧，静音会话也发送保活音频，防止语音会话因队列饱和而终止。
- [链接](https://github.com/openai/codex/pull/44671)

### ✅ #44670 — 限制登录重定向至已知平台源
- **安全修复**：登录成功页的 `platform_url` 参数现在必须精确匹配已知平台源，防止 ID token 被发送到任意目标。
- [链接](https://github.com/openai/codex/pull/44670)

### ✅ #44666 — TUI 遵循系统"减少动态效果"偏好
- **无障碍改进**：在 macOS、Windows、Linux 上读取系统级 reduced-motion 设置，即使 `tui.animations` 开启也优先尊重系统偏好。
- [链接](https://github.com/openai/codex/pull/44666)

### ✅ #44658 — Windows 沙箱私有桌面跨辅助进程存活
- **修复内容**：私有桌面现在由调用进程缓存和管理，不再因短命沙箱包装器退出而消失，支持跨文件系统辅助请求复用。
- [链接](https://github.com/openai/codex/pull/44658)

### ✅ #44656 — 轮次指标归因到实际使用的模型
- **修复内容**：修复模型切换后遥测数据错误标注的问题，轮次完成指标现在按实际使用的模型分别归因。
- [链接](https://github.com/openai/codex/pull/44656)

### ✅ #44655 — 线程级插件排除覆盖所有运行时能力
- **修复内容**：`disabled_plugin_ids` 现在统一应用于插件技能、推荐、hooks 和 MCP 服务器，且不修改共享插件状态。
- [链接](https://github.com/openai/codex/pull/44655)

### ✅ #44639 — Windows 离线沙箱阻止非回环入站流量
- **安全加固**：为离线沙箱用户添加入站防火墙规则，与已有的出站阻止形成完整隔离。
- [链接](https://github.com/openai/codex/pull/44639)

### ✅ #44636 — 通过 OIDC 从 503 响应恢复 OAuth 元数据发现
- **修复内容**：当 OAuth 元数据端点返回 503 时，自动尝试同一发行方的 OIDC 发现端点，防止 MCP 启动时 token 刷新失败。
- [链接](https://github.com/openai/codex/pull/44636)

### ✅ #44629 — MCP OAuth 登录支持手动回调输入
- **功能新增**：新增 `codex mcp login <name> --no-browser`，允许用户手动粘贴重定向 URL 完成认证。
- [链接](https://github.com/openai/codex/pull/44629)

---

## 5. 功能需求趋势

从近期 Issues 中提炼出以下社区最关注的功能方向：

| 方向 | 代表 Issue | 热度信号 |
|------|-----------|---------|
| **配额管理与自动化恢复** | #21073 (👍50), #15788 | 用户希望配额用尽后能自动排队/恢复，而非手动重试 |
| **TUI 显示定制** | #18396 (👍34), #44561, #37227 | 隐藏工具调用输出、关闭视觉特效、Calm 模式等需求集中出现 |
| **跨设备同步** | #21803 (👍37) | 多设备用户对 Projects/Chats 同步有强烈需求 |
| **模型容量与可用性** | #43375, #44382, #43368 | 容量问题已从偶发变为系统性痛点，涉及多个模型和订阅层级 |
| **MCP 生态增强** | #7953, #37417, #37453 | 工具筛选/分组、动态工具列表更新、MCP 生命周期管理 |
| **配额消耗透明度** | #41220, #44673, #44459 | 用户要求更清晰的用量归因和消耗解释 |

---

## 6. 开发者关注点

### ⚠️ 高频痛点

1. **模型容量不可用**：多个 GPT-5/GPT-6 模型频繁返回 "at capacity"，即使是 Pro 20x 订阅用户也无法规避。开发者需要更透明的容量状态和自动降级/重试机制。

2. **配额消耗不透明**：App 端用量显著高于 CLI（#44459），用户无法理解消耗来源。开发者呼吁提供 per-turn 的 token 归因和更细粒度的用量仪表盘。

3. **TUI 信息过载**：工具调用日志占据终端大量空间（#18396），Astra 星星特效被误认为故障（#44561），说明 TUI 需要在信息密度和可读性之间找到更好的平衡。

4. **跨平台一致性**：Windows 沙箱权限问题（#36475）、Android Remote 路径大小写问题（#40002）、macOS CLI 启动挂起（#44471）等，反映跨平台体验仍有较大改进空间。

5. **MCP 生命周期管理**：工具列表动态更新不生效（#37417）、重复进程栈（#37453）等问题表明 MCP 集成在长时间会话中的稳定性仍需加强。

---

*报告生成时间：2026-09-11 | 数据来源：[github.com/openai/codex](https://github.com/openai/codex)*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报

**日期：2026-09-11**

---

## 1. 今日速览

今日社区焦点集中在**企业级认证故障**（#29101，42 条评论）和**沙箱安全加固**方向。多个 PR 针对文件系统隔离、OAuth 凭据持久化、环境变量碰撞等问题提交了修复。夜间版本 v0.61.0-nightly.20260910 已发布，延续高频迭代节奏。

---

## 2. 版本发布

**v0.61.0-nightly.20260910.ged2ac40df**
- 类型：夜间构建版本
- 变更内容：常规 nightly 迭代，无重大功能公告
- 链接：[Release v0.61.0-nightly.20260910.ged2ac40df](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260910.ged2ac40df)

---

## 3. 社区热点 Issues（Top 10）

### 🔴 #29101 — 企业工作区认证失败（42 评论，P1）
Google Workspace 账户 + GCP Project ID 配置此前正常工作，近期出现认证阻断。这是当前社区**最高热度**问题，直接影响企业用户使用，已标记 `area/enterprise` 和 `kind/bug`。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/29101)

### 🔴 #22323 — 子代理 MAX_TURNS 中断被误报为成功（13 评论，P1）
`codebase_investigator` 子代理在达到最大轮次限制后仍报告 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了实际中断。影响代理执行的可信度。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/22323)

### 🟠 #21409 — Generalist 代理挂起（8 评论，P1，8 👍）
当 CLI 委派给 generalist 代理时无限挂起，简单操作（如创建文件夹）也会卡住。用户反馈明确指示不使用子代理可规避，说明子代理调度存在严重缺陷。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/21409)

### 🟠 #19873 — 零依赖 OS 沙箱与执行后意图路由（9 评论，P2）
提议利用 Gemini 3 模型的原生 bash 亲和力，通过零依赖沙箱实现安全执行。这是**架构级增强提案**，涉及安全与模型能力平衡。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/19873)

### 🟠 #22745 — AST 感知文件读取/搜索/映射评估（7 评论，P2）
EPIC 级议题，探索 AST 感知工具能否减少 token 噪声、提升代码导航精度。对 `codebase_investigator` 的改进有直接指导意义。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/22745)

### 🟡 #21968 — Gemini 未充分使用 skills 和子代理（6 评论，P2）
用户反馈模型几乎不会自主调用自定义 skills 和子代理，除非显式指示。这削弱了自定义工作流的价值，是**代理自主性**的核心痛点。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/21968)

### 🟡 #26525 — 确定性脱敏与 Auto Memory 日志缩减（5 评论，P2，安全）
Auto Memory 在内容进入模型上下文后才进行脱敏，存在安全风险。涉及敏感信息处理流程的**时序缺陷**。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/26525)

### 🟡 #25166 — Shell 命令执行后卡在 "Waiting input"（4 评论，P1，3 👍）
简单 CLI 命令执行完毕后，界面仍显示等待用户输入。影响基础交互体验，多个用户报告。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/25166)

### 🟡 #24246 — 超过 128 个工具时出现 400 错误（3 评论，P2）
工具数量超过阈值时 API 调用失败，需要更智能的工具范围限制机制。对大型项目集成场景有影响。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/24246)

### 🟡 #22672 — 代理应阻止/劝阻破坏性行为（3 评论，P2）
模型在复杂 git 操作中可能使用 `git reset` 或 `--force` 等危险命令。涉及**安全护栏**设计。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/issues/22672)

---

## 4. 重要 PR 进展（Top 10）

### 🔵 #29283 — 沙箱文件系统隔离改进（OPEN，size/L）
改进 `--sandbox` 模式下的文件系统挂载边界，隔离运行时状态。覆盖 Docker、Podman、runsc、LXC 和 macOS Seatbelt 多种沙箱后端。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29283)

### 🔵 #29282 — OAuth 凭据登录后持久化（OPEN，P2，安全）
修复浏览器/用户码登录成功后 OAuth 凭据未立即持久化的问题，避免重复登录提示。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29282)

### 🔵 #29250 — 防止构建文件修改导致的间接提示注入（OPEN，size/XL）
在受限工作区模式下，对 `shell`、`edit`、`write_file` 等执行路径进行重构，增强工作区边界验证。**安全关键 PR**。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29250)

### 🔵 #29249 — 修复 `get_internal_docs` 路径守卫的兄弟前缀绕过（OPEN，P1）
路径遍历守卫使用字符串前缀比较，存在路径组件边界缺失问题。攻击者可读取兄弟目录文件。**安全漏洞修复**。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29249)

### 🔵 #29278 — 选择无碰撞的环境变量展开键（OPEN，P2）
修复 `expandEnvVars()` 使用临时键时可能与环境变量碰撞的问题，防止环境覆盖输入字符串。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29278)

### 🔵 #29200 — MCP 策略运行时一致性执行（OPEN，P2，企业）
统一 MCP 运行时策略检查与 CLI 的匹配逻辑，空 `mcp.allowed` 列表改为 fail-closed 模式。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29200)

### 🔵 #29134 — 保护当前会话免于删除（OPEN，P2）
传递活跃会话 ID 到 `--list-sessions` 和 `--delete-session` 路径，避免误删当前会话。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29134)

### 🔵 #29098 — 保持 `useInputHistoryStore` 状态更新器纯净（CLOSED，P1/P2）
修复 React 状态更新器内的副作用调用，防止 Strict Mode 下双重调用导致的状态异常。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29098)

### 🔵 #29097 — 仅剥离尾部 `.git` 后缀解析 GitHub 仓库名（CLOSED）
修复 `tryParseGithubUrl` 使用 `replace('.git', '')` 导致 `blog.github.io` 被错误解析为 `hub.io` 的问题。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29097)

### 🔵 #29094 — 升级 simple-git 至 3.32.3 修复 CVE-2026-28292（CLOSED）
修复 CRITICAL 级别漏洞，依赖升级 PR，安全合规必需。
🔗 [查看详情](https://github.com/google-gemini/gemini-cli/pull/29094)

---

## 5. 功能需求趋势

从过去 24 小时更新的 49 条 Issue 中，可提炼出以下社区关注方向：

| 方向 | 代表 Issue | 热度信号 |
|------|-----------|---------|
| **企业级认证与合规** | #29101（42 评论）、#29200 | 企业用户活跃度高，P1 优先级集中 |
| **沙箱与安全隔离** | #19873、#26525、#29250、#29249 | 多个安全相关 PR 同时推进 |
| **子代理可靠性** | #22323、#21409、#21968、#22267 | 挂起、误报、配置忽略等问题频发 |
| **Auto Memory 质量** | #26525、#26522、#26523、#26516 | 同一作者连续提交 4 个相关 Issue，系统性问题 |
| **AST 感知工具链** | #22745、#22746 | EPIC 级规划，涉及代码理解能力提升 |
| **终端体验优化** | #25166、#21924、#22465 | 交互卡顿、resize 闪烁、交互式提示卡住 |

---

## 6. 开发者关注点

### 高频痛点

1. **认证稳定性**：企业 Workspace 账户认证失败是当前最大痛点，42 条评论表明影响面广，且此前正常工作的配置突然失效，用户信任度受损。

2. **子代理执行可靠性**：多个 Issue 反映子代理存在挂起（#21409）、误报成功（#22323）、忽略配置（#22267）、自主调用不足（#21968）等问题，子代理系统整体成熟度不足。

3. **安全边界**：从 PR 活跃度看，路径遍历（#29249）、提示注入（#29250）、沙箱隔离（#29283、#29214）是当前开发重点，社区对安全漏洞响应积极。

4. **Auto Memory 系统缺陷**：脱敏时序（#26525）、低信号会话无限重试（#26522）、无效补丁静默跳过（#26523）等问题表明记忆系统需要系统性质量改进。

5. **终端交互体验**：命令执行后卡在等待状态（#25166）、交互式提示卡住（#22465）、终端 resize 闪烁（#21924）等基础体验问题持续存在，影响日常使用流畅度。

---

*报告生成时间：2026-09-11 | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期：2026-09-11**

---

## 1. 今日速览

v1.38.5 桌面端发布后遭遇严重启动故障——Electron 前端与 Go 后端的版本号字符串不一致（`1.38.5` vs `v1.38.5`）导致官方安装包无法启动，多个 Windows 用户集中报告此问题。维护者已迅速响应，提交了修复 PR #10089 并紧急准备 v1.38.6 补丁版本。与此同时，社区对 v2 重写版的基础稳定性、长时任务无人值守能力以及多模态图片输入支持表达了强烈关注。

---

## 2. 版本发布

### v1.38.5（稳定版）— 已发布，但存在严重启动缺陷

**发布渠道：** 稳定版 · CLI + Desktop

**主要更新内容：**
- 🖥️ **桌面端迁移至 Electron**：全新桌面架构上线
- 🖼️ **DeepSeek V4.1 Flash 图片输入**：新增多模态图片支持
- 🔌 **OpenCode Go 提供商预设**：新增提供商配置
- 🔧 **持久工具恢复**：工具状态可跨会话恢复
- 📑 **独立 dock 标签**：桌面端 UI 布局优化
- 🛡️ **macOS 签名与公证修复**、**Windows 扩展关闭稳定性修复**

> ⚠️ **已知问题：** v1.38.5 桌面安装包存在版本号字符串不一致 bug（shell 报告 `1.38.5`，service 报告 `v1.38.5`），导致应用无法启动。修复已在 v1.38.6 中准备。

**相关链接：**
- [CLI v1.38.5 Release](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v1.38.5)
- [Desktop v1.38.5 Release](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.38.5)
- [完整更新日志](https://reasonix.io/changelog/v1.38.5/)

---

## 3. 社区热点 Issues（精选 10 条）

### 🔴 严重 Bug：v1.38.5 桌面端无法启动

| 编号 | 标题 | 热度 |
|------|------|------|
| [#10086](https://github.com/esengine/DeepSeek-Reasonix/issues/10086) | 版本号字符串不一致导致应用无法使用 | 4 评论 |
| [#10088](https://github.com/esengine/DeepSeek-Reasonix/issues/10088) | Cannot use the new 1.38.5 Desktop | 1 评论 |
| [#10087](https://github.com/esengine/DeepSeek-Reasonix/issues/10087) | 无法启动应用，提示 shell build 1.38.5 does not match service build v1.38.5 | 0 评论 |

**为什么重要：** 这是 v1.38.5 正式版的发布阻断级缺陷。Electron 前端（shell）与 Go 后端（service）的版本字符串比对失败，导致所有官方桌面安装包用户无法启动应用。三个独立 Issue 在发布后数小时内集中爆发，社区反应迅速，维护者已确认根因并提交修复。

---

### 🟠 核心体验：v2 基础稳定性问题

**[#9941](https://github.com/esengine/DeepSeek-Reasonix/issues/9941) — [Feature] 建议优化基础的稳定性** | 5 评论

**为什么重要：** 用户反馈自 v2 重写版 1.20 之后，频繁出现弹窗消失、信息流抖动、会话稳定性差、加载时间长、Responses 协议稳定性差等问题。这是对 v2 架构整体质量的集中反馈，代表了长期用户的真实体验痛点。5 条评论表明社区对此有共鸣。

---

### 🟠 Agent 效率：重复工作检测过于激进

**[#10042](https://github.com/esengine/DeepSeek-Reasonix/issues/10042) — [CLOSED] 过多的"助手在没有新证据的情况下反复做重复工作"** | 2 评论

**为什么重要：** 用户报告 `complete_step` 签收证据校验和 bash 的 read-evidence 拦截机制严重降低效率，尤其在 `mvn` 等"opaque"命令场景下宿主不认可退出码，只能以 manual 记录。该 Issue 已被关闭，但暴露了证据校验机制与实际工作流之间的摩擦。

---

### 🟡 长时任务：无人值守需求

**[#10051](https://github.com/esengine/DeepSeek-Reasonix/issues/10051) — [Feature] 增加适合 24h 长时间无人值守任务的 AUTOPILOT 模式** | 1 评论 · 👍 1

**为什么重要：** 用户明确提出需要 AUTOPILOT 模式，解决长时任务中 turn 结束后需手动发送"继续"、模型轮次限制等中断问题。这反映了 Reasonix 从交互式工具向自主 Agent 平台演进的核心需求方向。

---

### 🟡 多模态：图片输入未真正生效

**[#10075](https://github.com/esengine/DeepSeek-Reasonix/issues/10075) — deepseek-v4.1-flash 多模态模型不支持图片输入** | 0 评论

**[#10065](https://github.com/esengine/DeepSeek-Reasonix/issues/10065) — 图片附件文案谎报「已附加」，模型看不到图** | 0 评论

**为什么重要：** v1.38.5 宣称新增 DeepSeek V4.1 Flash 图片输入，但用户实测发现图片数据并未真正到达模型侧。#10065 进一步定位到 `internal/control/refs.go` 中仅检查模型是否支持视觉、未验证引用是否解析成功的逻辑缺陷。这是新功能发布后"名不副实"的典型案例。

---

### 🟡 文件编辑工作流：读写证据状态不一致

**[#10067](https://github.com/esengine/DeepSeek-Reasonix/issues/10067) — edit_file 之后所有"可能写文件"的 bash 调用被永久锁住** | 0 评论

**[#10085](https://github.com/esengine/DeepSeek-Reasonix/issues/10085) — Same-batch reads do not satisfy write preconditions** | 0 评论

**为什么重要：** 两个 Issue 共同指向 #9966 read-evidence 重构后引入的回归：编辑文件后读写证据状态不一致，导致高频编辑工作流退化。这直接影响 Agent 的核心文件操作能力，是 v2 架构中工具状态管理的关键缺陷。

---

### 🟢 性能：大会话切换阻塞

**[#10056](https://github.com/esengine/DeepSeek-Reasonix/issues/10056) — Session switch blocks ~800ms on large sessions** | 0 评论

**为什么重要：** 用户通过精确的性能分析定位到 `94ded6205`（#9826）引入的 `projectionPending` 条件导致快照 no-op 快速路径失效，大会话切换时 UI 冻结 1.2-1.5s。这类带有根因分析的 Issue 对维护者非常有价值。

---

### 🟢 功能提案：长任务只读预算扩展

**[#10054](https://github.com/esengine/DeepSeek-Reasonix/issues/10054) — let long turns extend their read-only budget** | 0 评论

**为什么重要：** 提案设计了一个 `extend_research_budget` 工具，允许模型在只读调研撞到 10 轮软预算时申请翻倍扩展（10→20→40→80）。这是社区成员主动参与架构设计的积极信号，方案设计完整且考虑了 fail-closed 安全机制。

---

## 4. 重要 PR 进展（精选 10 条）

### 🔧 紧急修复

**[#10089](https://github.com/esengine/DeepSeek-Reasonix/pull/10089) — fix(desktop): restore packaged startup identity** | CLOSED

修复 v1.38.5 桌面安装包的版本号不匹配问题。根因是打包器在 sanitization 后覆盖了 package.json 中的 appVersion，导致 Electron 发送 `1.38.5` 而 Go 服务报告 `v1.38.5`。这是 v1.38.6 的核心修复。

**[#10090](https://github.com/esengine/DeepSeek-Reasonix/pull/10090) — docs(release): 准备 v1.38.6 中英更新日志** | CLOSED

v1.38.6 发布文档准备，确认修复了桌面安装包无法启动的构建不匹配问题。

---

### 🧠 DeepSeek 推理协议修复

**[#10084](https://github.com/esengine/DeepSeek-Reasonix/pull/10084) — fix(provider): replay reasoning_content on plain DeepSeek turns** | OPEN

修复 DeepSeek 思考模式下重复 400 错误。根因是 `reasoning_content` 键未在纯文本 assistant 历史轮次中序列化，导致 API 拒绝请求。该修复对使用 DeepSeek 推理模型的用户至关重要。

---

### 🖥️ 桌面端功能增强

**[#10080](https://github.com/esengine/DeepSeek-Reasonix/pull/10080) — feat(desktop): add built-in browser control settings** | OPEN

桌面端新增「浏览器控制」设置页，从 ZCode 设置页移植，涵盖 Agent 能力开关、Chrome 登录状态导入、HTTPS 验证策略等。

**[#10077](https://github.com/esengine/DeepSeek-Reasonix/pull/10077) — feat(desktop): add the trajectory dock panel** | OPEN

桌面端右侧 dock 新增「轨迹面板」，以时间轴表格形式展示 Agent 运行的活动记录，提供只读的运行过程可视化。

---

### 🧪 CI / 测试稳定性

**[#10083](https://github.com/esengine/DeepSeek-Reasonix/pull/10083) — fix(ci): isolate Windows test resource ownership** | CLOSED

修复 Windows 发布资格测试中 agent、boot、control 测试的资源争用和夹具泄漏问题，提升 CI 稳定性。

**[#10082](https://github.com/esengine/DeepSeek-Reasonix/pull/10082) — fix(sidecar): release Windows handles once** | CLOSED

修复 Windows 扩展关闭时进程跟踪 Job Object 句柄被重复释放的问题，消除潜在的句柄重用导致的崩溃风险。

**[#10081](https://github.com/esengine/DeepSeek-Reasonix/pull/10081) — test(release): confirm interrupted writes before continuation** | CLOSED

修正发布实测中的写入恢复流程，对齐 #10039 引入的持久工具恢复合约（需检查并显式确认后方可继续）。

---

### 📚 长期演进 PR（持续开发中）

**[#9163](https://github.com/esengine/DeepSeek-Reasonix/pull/9163) — cachecontext: config-path foundation + per-project user attribution id** | OPEN

为 DeepSeek KV-cache 归属提供配置路径基础和按项目的用户归属 ID，包含 5 个 commit 的链式单元，是缓存上下文功能的基础设施。

**[#9770](https://github.com/esengine/DeepSeek-Reasonix/pull/9770) — feat(tools): always gate managed config writes behind fresh approval** | OPEN

受管配置文件（config.toml 等）的写入操作现在始终需要人工确认（`config_write`），不再因目标位置在写入根目录内而跳过审批。这是安全策略的收紧。

---

## 5. 功能需求趋势

基于过去 24 小时内的 15 条 Issues 分析，社区关注的功能方向如下：

### 📊 趋势分布

| 方向 | 相关 Issues | 热度 |
|------|-------------|------|
| **基础稳定性与性能** | #9941, #10056, #10064 | 🔥🔥🔥 |
| **Agent 工作流可靠性** | #10042, #10067, #10085, #10060 | 🔥🔥🔥 |
| **长时任务 / 无人值守** | #10051, #10054 | 🔥🔥 |
| **多模态图片输入** | #10075, #10065 | 🔥🔥 |
| **桌面端启动与更新** | #10086, #10087, #10088 | 🔥🔥 |
| **UI / UX 细节** | #10068, #10064 | 🔥 |

### 核心洞察

1. **v2 架构稳定性是最大痛点**：从 1.20 版本以来的累积问题（弹窗消失、信息流抖动、会话加载慢）在社区中形成共识，用户呼吁"保证基础的 loop 使用感是舒适的"。

2. **Agent 自主性需求强烈**：AUTOPILOT 模式提案和长任务只读预算扩展提案都指向同一个方向——用户希望 Reasonix 能真正独立完成数小时甚至 24 小时的任务，而非需要持续人工干预。

3. **多模态支持"发布即缺陷"**：v1.38.5 宣称的图片输入功能在实际使用中未生效，暴露了功能发布前验证不足的问题。

4. **证据校验机制需要调优**：read-evidence 重构（#9966）引入的回归问题在多个场景下被报告，说明工具状态管理是 v2 架构中需要重点打磨的模块。

---

## 6. 开发者关注点

### 🔴 高频痛点

| 痛点 | 相关 Issue/PR | 影响范围 |
|------|---------------|----------|
| **桌面端版本号不一致导致无法启动** | #10086, #10087, #10088 → PR #10089 | 所有 v1.38.5 桌面用户 |
| **read-evidence 状态不一致** | #10067, #10085 | 文件编辑工作流 |
| **图片输入未真正到达模型** | #10075, #10065 | 多模态用户 |
| **大会话性能退化** | #10056 | 大型项目用户 |

### 🟡 值得关注的设计讨论

- **证据校验的粒度问题**：`complete_step` 签收校验和 bash read-evidence 拦截在"opaque"命令（如 `mvn`）场景下过于严格，用户被迫使用 manual 记录绕过。这需要在安全性和实用性之间找到更好的平衡。

- **长任务的轮次预算机制**：#10054 提案的 `extend_research_budget` 工具设计展示了社区对 Agent 自主决策边界的思考——模型应该在什么条件下、以什么方式申请更多资源？

- **UI 信息密度与可访问性**：#10064 和 #10068 反映了用户对实时信息展示（token 输出、生成速度）的需求，桌面端迁移到 Electron 后 UI 布局的调整需要兼顾信息可见性。

### 🟢 积极信号

- 维护者对 v1.38.5 启动故障的响应速度很快（数小时内提交修复 PR），表明发布监控流程有效。
- 社区成员（如 @Linearl）提供了高质量的根因分析 Issue，包含精确的 commit 定位和性能数据，对项目改进有实质贡献。
- 多个长期 PR（#9163, #9770, #9417 等）持续活跃，说明 v2 的功能版图仍在稳步扩展。

---

*报告生成时间：2026-09-11 · 数据来源：[github.com/esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报

**日期：2026-09-11**

---

## 今日速览

过去 24 小时内无新版本发布，但社区活跃度较高：13 条 Issue 更新、50 条 PR 更新。核心焦点集中在 **V2 架构的稳定性问题**（编译提示词崩溃、自动压缩后上下文丢失）以及 **TUI 分组树引擎** 的持续演进。此外，FSB 中继连接问题引发了一组关联 Issue，暴露了会话诊断逻辑的改进空间。

---

## 版本发布

无新版本发布。

---

## 社区热点 Issues

### 🔥 高热度

**1. [FEATURE]: 在 TUI 中显示 Token 用量信息**
- 链接：[#13003](https://github.com/anomalyco/opencode/issues/13003)
- 状态：OPEN | 👍 53 | 💬 13
- 为什么重要：这是社区呼声最高的功能请求之一。当前 Token 用量（输入/输出/剩余预算）仅在内部追踪，用户无法在 TUI 中直观查看。53 个 👍 表明大量用户对成本控制和用量监控有迫切需求。

**2. [BUG] 自动压缩后 Agent 继续执行且丢失原始任务目标**
- 链接：[#41358](https://github.com/anomalyco/opencode/issues/41358)
- 状态：OPEN | 💬 8
- 为什么重要：在 Windows Desktop 长会话中，上下文自动压缩后 Agent 不等待确认便继续输出，且丢失原始任务目标。这直接影响长任务的可靠性，是 V2 架构中上下文管理的关键缺陷。

**3. [BUG] 编译提示词在原生 Bun 构建中因文件系统/搜索循环而失败**
- 链接：[#48398](https://github.com/anomalyco/opencode/issues/48398)
- 状态：CLOSED | 💬 2
- 为什么重要：原生 minified/split 构建在健康检查通过后，首个提示词即崩溃（`TypeError: undefined is not an object`）。该问题与 `SystemPrompt.environment` 中的循环依赖有关，已有对应修复 PR（#48397）。

### ⚡ 值得关注

**4. [BUG] DeepSeek V4 Flash 模型发送提示词时报服务器错误**
- 链接：[#36826](https://github.com/anomalyco/opencode/issues/36826)
- 状态：OPEN | 💬 8
- 为什么重要：使用 DeepSeek V4 Flash 时出现 "Unexpected server error"，影响 VS Code 集成场景。该问题已存在近两个月，社区持续反馈但尚未解决。

**5. [V2] 重新设计文件系统快照：围绕变更纪元（mutation epochs）**
- 链接：[#44511](https://github.com/anomalyco/opencode/issues/44511)
- 状态：OPEN | 💬 2
- 为什么重要：V2 当前将文件系统历史与模型编排耦合，导致纯文本调用、只读工具等场景产生不必要的快照开销。该提案建议以文件系统变更为核心重新设计快照机制，是 V2 架构优化的重要方向。

**6. [BUG] 中断的工具无法保留部分结果**
- 链接：[#39565](https://github.com/anomalyco/opencode/issues/39565)
- 状态：OPEN | 💬 1
- 为什么重要：V2 工具执行使用 Effect interruption，导致中断工具丢失取消前产生的部分输出（如 Shell 输出）。这对调试体验有直接影响。

**7. [FEATURE] 支持基于来源的技能权限控制**
- 链接：[#48400](https://github.com/anomalyco/opencode/issues/48400)
- 状态：OPEN | 💬 0
- 为什么重要：当前技能权限仅按 skill ID 评估，未考虑技能发现来源。同一 ID 的技能可能来自不同来源（内置、插件、用户自定义），权限模型需要区分。

**8. [BUG] FSB 中继报告 hubConnected: false 但监听器存在**
- 链接：[#48383](https://github.com/anomalyco/opencode/issues/48383)
- 状态：CLOSED | 💬 4
- 为什么重要：FSB（File System Bridge）中继连接问题导致 dev agent 无法接收 MCP 命令。虽然已关闭，但暴露了 FSB 诊断工具的可靠性问题。

**9. [BUG] 会话错误地将 FSB 连接问题关联到无关流程**
- 链接：[#48385](https://github.com/anomalyco/opencode/issues/48385)
- 状态：CLOSED | 💬 2
- 为什么重要：AI 助手在诊断 FSB 问题时错误地关联了 jumpstart、zv-prep 等无关流程。这反映了 AI 诊断逻辑在复杂故障场景下的局限性。

**10. [BUG] `opencode run` 和 TUI 均因 SystemPrompt.environment 崩溃**
- 链接：[#48372](https://github.com/anomalyco/opencode/issues/48372)
- 状态：OPEN | 💬 1
- 为什么重要：与 #48398 相关联，影响所有提示词尝试。该问题在 `opencode run` 和 TUI 中均出现，影响面广。

---

## 重要 PR 进展

### 核心修复

**1. fix(core): 打破编译提示词中的文件系统循环**
- 链接：[#48397](https://github.com/anomalyco/opencode/pull/48397)
- 状态：OPEN
- 内容：修复编译提示词准备阶段的文件系统循环依赖，与 #44946 和 #48398 相关。该修复对 Bun 升级后的原生构建稳定性至关重要。

**2. fix(ai): 规范化扁平 Responses 流错误**
- 链接：[#48376](https://github.com/anomalyco/opencode/pull/48376)
- 状态：CLOSED
- 内容：将扁平 Responses 错误字段（`code`、`message`、`param`）规范化为共享嵌套 `error` 结构，同时覆盖 SSE 和 WebSocket 事件解码。对 Meta、xAI、OpenAI 模型通过网关服务时的错误处理有重要改进。

**3. fix(provider): 解析 OpenRouter 路由修饰符后缀**
- 链接：[#48117](https://github.com/anomalyco/opencode/pull/48117)
- 状态：OPEN
- 内容：修复 OpenRouter 模型 ID 中 `:floor`、`:nitro`、`:exacto`、`:online` 等路由修饰符的解析问题。对使用 OpenRouter 的用户有直接影响。

### 功能演进

**4. feat(tui): 添加递归分组树引擎**
- 链接：[#48394](https://github.com/anomalyco/opencode/pull/48394)
- 状态：OPEN
- 内容：添加纯分组引擎，支持可配置嵌套路径（`activity -> exploration/reasoning/insight`），为 TUI 会话分组功能奠定基础。

**5. feat(tui): 添加递归会话分组树**
- 链接：[#48395](https://github.com/anomalyco/opencode/pull/48395)
- 状态：OPEN
- 内容：在 #48394 基础上添加通用递归分组树，支持有序关联合并和深度优先拆分，缓存叶子计数以优化性能。

**6. refactor(tui): 通过树引擎投射生产子组**
- 链接：[#48399](https://github.com/anomalyco/opencode/pull/48399)
- 状态：OPEN
- 内容：将现有推理/探索分组路由到通用树引擎，用于历史水合和实时追加。这是 TUI 分组功能从实验到生产的关键一步。

### 策略与合规

**7. feat(core): 强制执行托管提供商策略**
- 链接：[#48403](https://github.com/anomalyco/opencode/pull/48403)
- 状态：OPEN
- 内容：在目录读取时应用 Console 组织规则，与 opencode-console PR #2191 配对。这是企业级策略管理的重要功能。

### 其他修复

**8. fix(codemode): 使用 Bun 的措辞处理缺失的 atob/btoa 参数**
- 链接：[#48381](https://github.com/anomalyco/opencode/pull/48381)
- 状态：OPEN
- 内容：统一不同运行时（浏览器 vs Bun）中 `atob()`/`btoa()` 错误消息的措辞差异。

**9. fix(app): 显示服务器项目直到第一个书签**
- 链接：[#41154](https://github.com/anomalyco/opencode/pull/41154)
- 状态：CLOSED
- 内容：修复 `opencode web` 新会话中项目列表为空的问题，现在会合并服务器 `/project` 列表。

**10. docs: 添加波斯语 README 翻译**
- 链接：[#47783](https://github.com/anomalyco/opencode/pull/47783)
- 状态：OPEN
- 内容：添加 `README.fa.md` 波斯语翻译，扩展社区文档覆盖面。

---

## 功能需求趋势

从过去 24 小时的 Issue 和 PR 中，可以提炼出以下社区关注方向：

### 1. **TUI 体验增强**（持续升温）
- Token 用量可视化（#13003，👍 53）是呼声最高的需求
- 递归分组树引擎的系列 PR（#48394、#48395、#48399）表明 TUI 会话组织方式正在经历重大重构

### 2. **V2 架构稳定性**（紧迫性最高）
- 编译提示词崩溃（#48398、#48372）影响所有用户
- 自动压缩后的上下文丢失（#41358）影响长任务可靠性
- 文件系统快照重新设计（#44511）指向更深层的架构优化

### 3. **多提供商兼容性**
- OpenRouter 路由修饰符修复（#48117）
- DeepSeek V4 Flash 错误（#36826）
- 扁平 Responses 流错误规范化（#48376）

### 4. **企业级功能**
- 托管提供商策略强制执行（#48403）
- 基于来源的技能权限（#48400）

### 5. **可观测性与调试**
- V2 GenAI 追踪（#35935，已关闭但方向明确）
- 中断工具的部分结果保留（#39565）

---

## 开发者关注点

### 高频痛点

1. **上下文管理可靠性**：自动压缩后 Agent 行为异常（#41358）和文件系统快照与模型编排的耦合（#44511）表明，V2 的上下文管理机制仍需打磨。

2. **原生构建稳定性**：编译提示词在 Bun 原生构建中的崩溃（#48398、#48372）影响面广，且与文件系统循环依赖相关，修复复杂度较高。

3. **错误信息一致性**：不同运行时（浏览器 vs Bun）的错误措辞差异（#48381）、扁平 vs 嵌套错误结构（#48376）等问题，反映了跨平台错误处理标准化的需求。

4. **AI 诊断能力局限**：FSB 连接问题被错误关联到无关流程（#48385），说明 AI 助手在复杂故障场景下的诊断逻辑需要改进。

5. **成本透明度**：Token 用量信息在 TUI 中不可见（#13003），53 个 👍 表明用户对成本监控的需求强烈，尤其是在使用付费模型时。

---

*日报生成时间：2026-09-11 | 数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# DeepSeek Harness 社区动态日报

**日期：2026-09-11**

---

## 1. 今日速览

过去 24 小时内，DeepSeek Harness 发布了两个候选版本 `v0.1.5-rc.1` 和 `v0.1.5-rc.2`，标志着 `0.1.5` 系列进入发布候选阶段。其中 rc.1 引入了新模型 `DeepSeek-V41-Flash` 支持及通用文件上传能力，rc.2 则聚焦于反馈提交体验和 UI 细节优化。Issues 和 Pull Requests 板块今日无更新。

---

## 2. 版本发布

### dsh-v0.1.5-rc.2
[查看 Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.5-rc.2)

**体验优化：**
- 优化反馈提交体验：点赞和点踩均通过弹窗确认后提交，提交失败时保留已填写内容并给出提示（@yixiangihsiang）
- 优化交付文件卡片的排版和对话间距，更新代码文件图标，使文件更易辨认、界面更紧凑（@yixiangihsiang）

### dsh-v0.1.5-rc.1
[查看 Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.5-rc.1)

作为 `0.1.5` 系列的首个候选版本，汇总了自 `v0.1.2-rc.1` 以来的主要变更：

**新增功能：**
- DeepSeek 模型适配器新增 `DeepSeek-V41-Flash`（`deepseek-flash`）支持，涵盖文本、图片及会话历史中的系统提示词更新。新会话默认使用该模型，配置文件显式指定模型时以配置值为准（@LegGasai）
- Web 支持上传任意类型的通用文件：文件与图片可统一处理

---

## 3. 社区热点 Issues

过去 24 小时内无新增或更新的 Issues，暂无可报告的热点内容。

---

## 4. 重要 PR 进展

过去 24 小时内无新增或更新的 Pull Requests，暂无可报告的重要进展。

---

## 5. 功能需求趋势

基于近期版本发布内容，社区当前关注的功能方向包括：

| 方向 | 说明 |
|------|------|
| **新模型支持** | `DeepSeek-V41-Flash` 的加入表明社区持续关注更轻量、更快速的模型适配 |
| **多模态能力** | 文本、图片及通用文件上传的统一支持是近期迭代重点 |
| **交互体验优化** | 反馈提交流程、文件卡片排版等 UI/UX 细节持续打磨 |
| **配置灵活性** | 模型默认值与配置文件显式指定的优先级逻辑受到重视 |

---

## 6. 开发者关注点

从近期版本变更中可提炼出以下开发者高频关注点：

- **反馈闭环完整性**：rc.2 专门优化了反馈提交失败时的内容保留与提示，说明开发者对用户反馈数据完整性的重视
- **默认模型切换的平滑性**：新会话默认使用 `deepseek-flash`，同时保留配置文件覆盖能力，反映出对向后兼容和开发者控制权的关注
- **文件处理统一化**：将图片与通用文件上传能力合并，减少开发者对不同类型附件的差异化处理成本
- **界面信息密度**：文件卡片排版和对话间距的紧凑化调整，体现了对开发者工作效率的持续优化

---

*报告生成时间：2026-09-11 | 数据来源：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)*

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报

**日期：2026-09-11**

---

## 1. 今日速览

今日社区无新版本发布，但 Issue 和 PR 活跃度较高。最值得关注的是 **Desktop 端语音对话仍存在 OpenAI TTS 全文件播放延迟问题**（P1 级），以及 **TUI 启动时 `--reasoning` 参数被静默丢弃** 的配置传递缺陷——后者已有对应修复 PR（#107783）提交。此外，Kanban 调度器出现依赖阻塞任务被无新输入重复派发的回归问题（#107784），值得核心维护者关注。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

### 🔴 P1 高优先级

**#79859 — Desktop Talk to Hermes 仍使用延迟 MP3 全文件播放（OpenAI TTS）**
> 语音对话模式在配置 OpenAI TTS 时仍表现为"语音便签"式工作流：等待数秒生成完整 MP3 后才播放，而非低延迟流式对话。打断（barge-in）机制也因此失效。该 Issue 已存在一个多月，社区持续关注。
🔗 https://github.com/NousResearch/hermes-agent/issues/79859

**#107784 — Kanban 依赖类阻塞块在无新输入时重复派发 Worker（#28712 循环的变体路径）**
> 声明 `kanban_block(kind="dependency")` 的任务在下一 tick 被调度器重新拉起，任务从未进入 `blocked` 状态，导致 #28712 的 sticky-block 防护失效。这是一个调度器回归，可能引发无限循环。
🔗 https://github.com/NousResearch/hermes-agent/issues/107784

### 🟠 P2 重要缺陷

**#107774 — Desktop/macOS 侧边栏折叠时标签页覆盖标题栏按钮（不可点击）**
> 多标签打开时，面板标签条绘制覆盖了固定标题栏控件簇，展开侧边栏按钮被遮挡且无法点击。影响 macOS 桌面端核心导航体验。
🔗 https://github.com/NousResearch/hermes-agent/issues/107774

**#107780 — 顶层 `--reasoning` 覆盖参数在启动 TUI 时被丢弃**
> CLI 接受并解析了 `--reasoning` 参数，但 TUI 子进程无法接收该覆盖值，导致用户显式选择的推理强度被配置默认值替代。已有对应修复 PR #107783。
🔗 https://github.com/NousResearch/hermes-agent/issues/107780

**#103633 — MCP OAuth code→token 交换对带路径的服务器（traveler.md）永不完成；自动重试因端口占用崩溃**
> 针对 `https://mcp.traveler.md/mcp` 这类带路径的 MCP 服务器，OAuth 令牌交换流程卡死；重试时又因回调端口已被占用而崩溃。v0.21.0 回归（v0.18 正常）。
🔗 https://github.com/NousResearch/hermes-agent/issues/103633

### 🟡 P3 功能需求与体验改进

**#65834 — 为长对话添加一键"回到最后提示词"快捷方式**
> 用户希望在长对话中快速定位到最新用户提示词，同时保持助手回答开头可见。这是一个桌面端体验优化需求，已存在近两个月。
🔗 https://github.com/NousResearch/hermes-agent/issues/65834

---

## 4. 重要 PR 进展（精选 10 条）

### 🔧 缺陷修复

**#107783 — fix(tui): 将 `--reasoning` 覆盖参数传递给 TUI 子进程**
> 直接修复 #107780。通过为 TUI 子进程构建 `HermesCLI` 实例时注入 reasoning 覆盖值，解决参数丢失问题。
🔗 https://github.com/NousResearch/hermes-agent/pull/107783

**#107786 — fix(gateway): 终止超时的 exec 快速命令而非使其成为孤儿进程**
> 网关 `type: exec` 快速命令超时后仅报告超时但从未 kill 进程，导致 shell 及子进程持续泄漏。此 PR 确保超时后彻底终止进程树。
🔗 https://github.com/NousResearch/hermes-agent/pull/107786

**#107695 — fix(cron): Desktop ticker 不再将次级 profile 的 .env 复制到共享进程环境**
> P1 安全边界修复。Desktop 后端从单一进程 tick 所有本地 profile 的 cron store，但未调用 `set_multiplex_active`，导致次级 profile 的 .env 被写入共享进程环境，存在凭据泄漏风险。
🔗 https://github.com/NousResearch/hermes-agent/pull/107695

**#107781 — fix(tools): bash 快照捕获所有 shell 函数（含私有函数）**
> 修复 macOS 上 cron/交互会话中 `_safe_eval: command not found` 的间歇性失败。根因是 scm_breeze 等工具定义的私有函数未被快照捕获。
🔗 https://github.com/NousResearch/hermes-agent/pull/107781

**#107782 — fix(cli): 从 `/model` 参数中剥离不可见零宽字符**
> 移动端自动更正、IME 输入或富文本粘贴可能注入零宽字符，导致 `/model` 命令误报"模型名不能包含空格"。此 PR 在解析前清理这些字符。
🔗 https://github.com/NousResearch/hermes-agent/pull/107782

**#105869 — fix(cli): 在 CLI 启动时从会话模型解析 Bedrock wire**
> 修复非 Claude Bedrock 模型在默认配置为 Claude 时错误使用 AnthropicBedrock wire 的问题，避免工具 schema 被 Bedrock 拒绝。
🔗 https://github.com/NousResearch/hermes-agent/pull/105869

**#106736 — fix(skills): tap 刷新/移除时刷新过期的索引缓存**
> 自定义 skill tap 的索引缓存在 TTL 内不会更新，导致新发布的 skill 不可见。此 PR 在 `tap refresh/remove` 时主动刷新缓存。
🔗 https://github.com/NousResearch/hermes-agent/pull/106736

### ✨ 功能增强

**#107779 — feat(kanban): 将 worker 后续事项传递到终端通知**
> Kanban worker 最易丢失的输出是"未完成的工作"——留给人类的决策、仍需手动执行的步骤。此 PR 将这些 follow-up 内容传递到终端通知，确保不遗漏。
🔗 https://github.com/NousResearch/hermes-agent/pull/107779

**#107765 — feat(kanban): 按任务聚合 token 和成本使用量**
> 为每个已关闭的 Kanban 运行持久化 token、成本、模型、provider 等使用数据，支持跨重试聚合和按 profile 分段，并通过 CLI、worker 工具和 dashboard API 暴露。
🔗 https://github.com/NousResearch/hermes-agent/pull/107765

**#107787 — fix: 在模型表中识别 DeepSeek V4.1-Flash（deepseek-flash）**
> DeepSeek 于 2026-09-10 发布 V4.1-Flash 并重命名了 live model id。此 PR 更新模型表以支持新的 `deepseek-flash` 标识符。
🔗 https://github.com/NousResearch/hermes-agent/pull/107787

---

## 5. 功能需求趋势

从近期 Issues 和 PR 的标签分布来看，社区关注集中在以下几个方向：

| 趋势方向 | 代表 Issue/PR | 热度信号 |
|---------|--------------|---------|
| **桌面端体验优化** | #79859（TTS 流式播放）、#107774（侧边栏遮挡）、#65834（快捷导航） | 3 条活跃 Issue，P1-P3 均有分布 |
| **Kanban 调度器稳定性** | #107784（重复派发循环）、#107779（follow-up 通知）、#107765（成本聚合） | 1 条 P1 回归 + 2 条功能 PR |
| **CLI/TUI 配置传递一致性** | #107780（reasoning 丢失）、#107783（修复 PR）、#107782（零宽字符） | 配置覆盖参数在多层进程间传递的可靠性成为痛点 |
| **MCP 生态兼容性** | #103633（OAuth 路径问题） | MCP 服务器接入的健壮性仍需加强 |
| **新模型快速适配** | #107787（DeepSeek V4.1-Flash） | 模型发布后社区响应速度较快 |
| **安全边界与多 Profile 隔离** | #107695（.env 泄漏） | P1 安全修复，多 profile 场景下的环境隔离受关注 |

---

## 6. 开发者关注点

综合近期 Issue 和 PR 反馈，开发者群体的核心痛点集中在：

1. **多进程/多层架构下的配置传递可靠性**：`--reasoning` 参数在 CLI → TUI 子进程间丢失（#107780），以及 Desktop 多 profile 场景下环境变量泄漏（#107695），反映出 Hermes 的进程架构在配置隔离和传递方面存在系统性缺陷。

2. **调度器（Kanban）的边界条件处理**：依赖阻塞任务被无新输入重复派发（#107784），说明调度器在 `blocked` 状态管理和 sticky-block 防护上仍有漏洞，可能引发资源浪费或死循环。

3. **桌面端 UI 的细节打磨**：侧边栏折叠遮挡（#107774）、语音对话延迟（#79859）、长对话导航（#65834）等问题表明 Desktop 端在交互细节上仍需大量打磨，尤其是 macOS 平台。

4. **MCP 服务器兼容性**：带路径的 MCP 服务器 OAuth 流程失败（#103633）说明 MCP 客户端实现对非标准 URL 结构的容错不足，随着 MCP 生态扩大，这类兼容性问题可能增多。

5. **进程资源管理**：exec 快速命令超时后进程泄漏（#107786）暴露了网关层对子进程生命周期管理的不足，长期运行场景下可能累积大量僵尸进程。

---

*报告生成时间：2026-09-11 | 数据来源：github.com/NousResearch/hermes-agent*

:::
