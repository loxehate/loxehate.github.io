---
title: "AI CLI 工具社区动态日报"
published: 2026-09-24
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-24

> 生成时间: 2026-09-24 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告

**报告日期**: 2026-09-24  
**数据窗口**: 过去 24 小时  
**覆盖工具**: Claude Code, OpenAI Codex, Gemini CLI, DeepSeek Reasonix, OpenCode, Deepseek Harness, Hermes


## 1. 生态全景

当前 AI CLI 工具生态正从“单点对话式编程助手”向“可编排、可观察、可治理的多 Agent 执行环境”快速演进。各工具社区的核心议题高度趋同：MCP/工具生态的兼容性、子代理调用的可靠性、Windows 桌面端稳定性、以及配置与安全边界治理成为普遍痛点。与此同时，模型层面的能力迭代（GPT-6 系列、Gemini 3.8 Flash、DeepSeek-V4.1）正在加速，但工具链自身的健壮性尚未跟上模型迭代节奏。整体判断：**模型能力已相对过剩，Agent 工程成熟度与用户体验细节成为当前竞争的主战场。**


## 2. 各工具活跃度对比

| 工具 | 热点 Issues | PR 动态 | Release 情况 | 社区热度特征 |
|------|------------|---------|-------------|-------------|
| **Claude Code** | 10 个（最高 22 评论 / 👍94） | 5 条（含 1 项安全修复） | v2.1.281（正式版） | 讨论深度高，功能诉求集中 |
| **OpenAI Codex** | 10 个（最高 38 评论 / 👍12） | 10 条（Guardian 重构、Windows 沙箱修复） | rust-v0.156.1（正式版）+ 多个 alpha | Windows 桌面端问题集中爆发 |
| **Gemini CLI** | 10 个（2 个 P1 代理可靠性问题） | 10 条（含 3 项已合入） | 4 个版本（v0.62.0-nightly 等） | 优先级体系清晰，修复节奏快 |
| **DeepSeek Reasonix** | 10 个（3 个 data-loss 级别） | 10 条（侧边栏修复系列为主） | v1.38.12（稳定版）+ Studio v2.19.0 | 严重回归引发信任危机 |
| **OpenCode** | 10 个（最高 54 评论 / 👍15） | 10 条（含 1 项安全修复已合并） | 无新版本（v1.18.x，2.0 讨论中） | 免费层问题高热，社区参与活跃 |
| **Deepseek Harness** | 0 条（静默期） | 0 条（静默期） | dsh-v0.1.7-rc.1（候选版） | 处于 RC 验证阶段，社区讨论少 |
| **Hermes** | 2 条关闭（另有 8 个关联问题） | 50 条更新（10 个核心 PR） | 无新版本 | PR 驱动为主，Issue 反馈相对滞后 |


## 3. 共同关注的功能方向

### 3.1 MCP 兼容性与健壮性（5/7 工具涉及）

| 工具 | 具体诉求 |
|------|---------|
| Claude Code | 新 spec 的 `allOf`/`if/then` schema 被静默丢弃（#95504）；单工具 schema 非法导致整个服务器工具被丢弃（#88049） |
| OpenAI Codex | MCP OAuth token 刷新失败后连接器永久禁用，缺少重新认证入口（#38198） |
| Gemini CLI | MCP enablement 配置损坏时“失败开放”，已禁用服务器被重新启用（#29445） |
| OpenCode | MCP OAuth 跨进程并发刷新导致 refresh token 轮换失效（#50994） |
| Deepseek Harness | 候选版本开始支持 MCP 资源发现与 URI 模板（正向能力建设） |

**共性结论**：MCP 已成为事实上的 Agent 工具互操作标准，但“静默失败”“无日志”“配置损坏后 fail-open”等工程质量问题在各工具中普遍存在。开发者的核心诉求是：**失败要可感知、配置要 fail-closed、OAuth 生命周期要可控**。

### 3.2 Windows 桌面端稳定性（4/7 工具涉及）

| 工具 | 具体问题 |
|------|---------|
| OpenAI Codex | 消息发送被禁用（#45626）、app-server 被 0xC000013A 终止（#40231）——38 个活跃 Issue 中超半数与 Windows 相关 |
| Claude Code | Cowork 在 Windows Plan9 mount 失败（#95910） |
| DeepSeek Reasonix | TUI 终端乱屏（#10540）、侧边栏加载失败——三个 data-loss Issue 均为 Windows 平台 |
| Hermes | GBK 编码导致网关崩溃（#83851）、路径含括号被拒绝（#120768） |

**共性结论**：Windows 已成为 AI CLI 工具从“开发者玩具”走向“主流生产力工具”的必争之地。目前各工具在 Windows 上的表现普遍落后于 macOS/Linux，且修复周期长。

### 3.3 子代理/多 Agent 调用的可观测性与可靠性（3/7 工具）

| 工具 | 具体问题 |
|------|---------|
| Gemini CLI | 子代理 MAX_TURNS 后误报 `GOAL success`（#22323）；Generalist 代理无限挂起（#21409） |
| DeepSeek Reasonix | transcript gate 对非法 JSON 工具参数零容错，会话硬中断（#10648/#10693） |
| Claude Code | Cowork 会话忽略用户 hooks 和托管设置，安全策略失效（#40495） |

**共性结论**：子代理是当前各工具的核心架构方向，但其完成状态的真实性、失败恢复能力、以及配置继承机制均不成熟。**错误结果比无结果更有害**是社区最尖锐的共识。

### 3.4 会话历史与数据可靠性（3/7 工具）

| 工具 | 具体问题 |
|------|---------|
| DeepSeek Reasonix | v1.38.11 升级后侧边栏历史会话全部消失（#10665/#10669/#10622），data-loss 级别回归 |
| Hermes | 会话恢复/压缩时系统提示被意外改写（#120521）；压缩摘要携带指令污染上下文（#120439） |
| OpenCode | v1→v2 迁移后会话归入 `project_id='global'`，按项目列表不可见（#50999） |

**共性结论**：会话数据的可靠性和迁移兼容性是用户信任的基石。升级导致数据丢失是最严重的信任破坏事件。

### 3.5 安全与配置治理（3/7 工具）

| 工具 | 具体问题 |
|------|---------|
| OpenCode | `opencode debug config` 明文输出 API 密钥（#50915，已修复）；vcs diff 在 Git 异常时静默误报“no changes”（#50934） |
| Gemini CLI | 不可信工作区可静默清空 `.gemini/settings.json`（#29466） |
| Claude Code | security-guidance reviewer 可通过 `git diff` 绕过权限读取 secrets.yaml（#96434，已修复） |

**共性结论**：Agent 的权限边界和配置文件的完整性保护开始受到系统性关注。**密钥脱敏**与**不可信目录防护**已成为安全修复的高频主题。


## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特征 | 当前重心 |
|------|---------|---------|-------------|---------|
| **Claude Code** | IDE 深度集成 + MCP 生态 | VS Code 用户、MCP 服务开发者 | 以 IDE 扩展为核心入口，MCP 支持全面；Cowork 代表协作式 Agent 方向 | MCP 兼容性修复、Cowork 配置继承、IDE 交互细节 |
| **OpenAI Codex** | 桌面端一体化 + 企业级管控 | Windows 桌面用户、企业团队 | 桌面应用为重心，Guardian 权限治理 + 扩展 API 钩子 + 沙箱机制 | Windows 稳定性、Guardian 架构重构、扩展生态 |
| **Gemini CLI** | 子代理编排 + 代码理解深度 | Linux/macOS 重度 CLI 用户 | 子代理分类明确（codebase_investigator/generalist/browser），AST 感知代码工具探索，Auto Memory 后台记忆 | 子代理可靠性、上下文管理、UI 反馈 |
| **DeepSeek Reasonix** | 桌面端 + 操作系统级自动化 | 桌面端日常用户 | Studio 内置浏览器 + macOS 应用操作，Agent 可操作 GUI；TUI 兼顾终端用户 | 历史会话数据修复、桌面渲染性能、工具参数容错 |
| **OpenCode** | 开源可自托管、多 Provider 接入 | 开源社区、自定义模型用户 | OpenAI 兼容接口，强调自定义 provider 生态；v2 版本讨论活跃 | 免费层策略澄清、2.0 迁移体验、自定义 Provider 接入门槛 |
| **Deepseek Harness** | 轻量 harness 工具 | Web 端开发工作流用户 | Web 侧边栏终端、会话归档管理、MCP 资源访问；RC 阶段功能验证中 | RC 验证、社区反馈收集 |
| **Hermes** | 多通道网关 + 会话管理 | 团队协作场景、中文用户 | WeCom 等群组集成、多 profile 隔离、launchd/Windows 服务治理；50 个 PR 显示开发密度高 | 会话一致性、Windows 兼容性、可观测性 API |

**关键观察**：
- **OpenAI Codex** 和 **DeepSeek Reasonix** 押注桌面端体验（Codex 偏企业管控，Reasonix 偏系统自动化）
- **Claude Code** 和 **OpenCode** 侧重 IDE 与生态集成（Claude 偏 MCP，OpenCode 偏多 Provider）
- **Gemini CLI** 和 **Hermes** 在 Agent 编排深度上走得更远（Gemini 偏子代理/代码理解，Hermes 偏多通道/群组协作）
- **Deepseek Harness** 保持轻量，等待生态位验证


## 5. 社区热度与成熟度

| 工具 | 活跃度 | 成熟度 | 信号 |
|------|--------|--------|------|
| **Claude Code** | ★★★★★ | ★★★★☆ | 评论质量高，讨论深度好；Issue 有明确的 platform/area 标签体系；功能需求（如单个 skill 禁用 👍94）显示用户已进入精细化使用阶段 |
| **OpenAI Codex** | ★★★★★ | ★★★☆☆ | 评论量最大，但集中在 Windows 稳定性抱怨；PR 方向明确（Guardian、扩展 API）但用户侧问题未解决，呈现“官方节奏快、用户痛点久”的错位 |
| **Gemini CLI** | ★★★★☆ | ★★★★☆ | P0/P1/P2 优先级体系最清晰；Issue 和 PR 高度对应（#28340↔#29468）；社区反馈的技术深度较高（能定位到竞态条件） |
| **DeepSeek Reasonix** | ★★★★☆ | ★★☆☆☆ | 社区活跃但信任度下滑——data-loss 回归 + 频繁发版让用户直接呼吁 LTS 版本；属于“快速迭代但质量控制不足”的典型 |
| **OpenCode** | ★★★☆☆ | ★★★☆☆ | 单个 Issue 评论数高（54 条）但整体 Issue 量不大；社区贡献活跃（多个 contributor PR），2.0 讨论预示架构转型期 |
| **Deepseek Harness** | ★☆☆☆☆ | ★★☆☆☆ | 处于 RC 静默期，社区反馈数据尚未积累；贡献者以社区为主（3 位外部开发者） |
| **Hermes** | ★★★☆☆ | ★★★★☆ | PR 量最大（50 条）但 Issue 反馈少，呈“开发驱动”型社区；从 PR 内容看工程体系较成熟，但用户侧声音不够充分 |

**综合判断**：
- **最活跃**：Claude Code、OpenAI Codex
- **迭代最快**：Gemini CLI（版本发布频率最高）、Hermes（PR 密度最高）
- **最需稳定**：DeepSeek Reasonix（社区耐心正在耗尽）
- **最具潜力但验证中**：Deepseek Harness、OpenCode（v2）


## 6. 值得关注的趋势信号

### 信号 1：MCP 从“能用”到“可靠”的关键转折期
MCP 已全面铺开，但各工具对 spec 新特性的支持滞后（Claude Code 丢弃 `allOf`/`if/then` 工具），OAuth 生命周期管理普遍缺失（Codex 永久禁用、OpenCode 并发刷新竞态）。**对开发者的启示**：MCP 服务端开发应遵循保守的 schema 风格（避免高级 JSON Schema 特性），并对客户端兼容性保持悲观预期；同时 MCP 客户端应尽快补齐 warning 日志和 fail-closed 机制。

### 信号 2：Windows 是 CLI 工具的下一站，但“最后一公里”极难
Codex 大量 Windows Issue 多版本未修复、Reasonix 三个 data-loss 均为 Windows、Hermes 编码/路径问题持续——Windows 桌面端已成为 AI CLI 工具走向大众市场的最大瓶颈。**对开发者的启示**：Windows 支持需要从架构层面早期设计（编码、路径、进程生命周期），而非事后打补丁；用户侧如条件允许可优先 macOS/Linux 环境，或等待各工具 Windows 专项成熟。

### 信号 3：子代理结果可信度成为用户信任的分水岭
Gemini 子代理 MAX_TURNS 后误报成功是最尖锐的信号——当 AI 工具自己都无法准确报告“我是否完成了任务”时，用户将失去对整个 Agent 工作流的信任。**对开发者的启示**：构建多 Agent 系统时，完成状态的语义必须严格区分 `success` / `interrupted` / `error`，且中断场景要有明确的恢复路径；可观测性（子代理轨迹分享、进度展示）与可靠性同等重要。

### 信号 4：会话数据可靠性是升级的“信任税”
Reasonix 侧边栏历史消失、Hermes 系统提示被改写、OpenCode v1→v2 迁移不可见——各工具在快速迭代中都出现了会话数据层面的回归。**对开发者的启示**：升级前务必备份会话存储；工具开发团队应建立“升级不丢数据”的自动化回归测试基线——一次 data-loss 事件的影响远超 10 个功能缺陷。

### 信号 5：配置系统走向“可预期性”与“安全边界”
从 OpenCode 的密钥脱敏修复、Gemini 的不可信目录防护到 Hermes 的 profile 隔离——Agent 的权限边界正在成为安全焦点。**对开发者的启示**：AI CLI 工具的配置不仅是功能开关，更是安全边界；在共享环境（录屏、CI、多租户）中使用时，应检查工具的诊断输出是否可能泄露凭据。

### 信号 6：模型迭代速度远超工具链适配速度
GPT-6 Sol/Luna、Gemini 3.8 Flash、DeepSeek-V4.1-Flash 在 24 小时内快速进入各工具，但工具链的工具调用稳定性（Reasonix 非法 JSON 硬中断、OpenCode Emitting 死循环）并未同步提升。**对开发者的启示**：模型的“上限”已不是瓶颈，工具链的“下限”（可靠性、可恢复性）才是决定实际体验的关键；选择工具时，应优先评估其错误处理与恢复机制，而非模型的榜单分数。


## 结论

当前 AI CLI 工具生态正处于**从“模型能力军备竞赛”转向“Agent 工程成熟度竞争”**的关键阶段。各工具的核心差距已不在模型选择，而在 MCP 生态可靠性、子代理结果可信度、Windows 平台质量、以及会话数据安全这四个维度。对于技术决策者，建议：

1. **短期选型**优先考虑 Gemini CLI（工程体系最规范）和 Claude Code（MCP 生态最成熟，社区反馈质量最高）
2. **Windows 用户**可关注 OpenAI Codex 的修复节奏，但需对稳定性有心理预期
3. **深度依赖 Agent 自动化**的团队，应等待子代理可靠性问题（#22323、#21409）解决后再规模化
4. **所有用户**：升级前备份会话数据；涉及敏感凭据时检查工具诊断输出；对子代理返回的 `success` 保持审慎

AI CLI 工具的真正分水岭，不在于谁能调用更强大的模型，而在于谁能让开发者放心地把工作交给它——这需要的是工程韧性，而非模型魔法。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**: github.com/anthropics/skills | **数据截止**: 2026-09-24

---

## 1. 热门 Skills 排行

以下按社区评论数排序，选取关注度最高的 8 个 PR（全部处于 Open 状态）。

**#1298 skill-creator 触发器评估修复** `Open`
- **功能**：修复触发器评估的误报与无效评分——隔离 worker 级命令探针竞争、处理 Windows 下 `select()` 子进程管道失败，并将运行时失败正确归类为"非触发器"，避免负样本误通过。
- **讨论热点**：触发器误判会直接误导 skill 描述优化方向，是 skill-creator 生态稳定性的关键补丁，评论数居全仓库首位。
- [GitHub](https://github.com/anthropics/skills/pull/1298)

**#1771 proofcore-contract-auditor 智能合约审计** `Open`
- **功能**：Web3 开发者 Skill，对 Solidity/Rust 智能合约做自动化静态分析，并通过 ProofCore 零存储 Merkle 协议将审计密码学证明锚定到 TON 公链。
- **讨论热点**：仓库首个区块链审计方向 Skill，社区关注 AI + Web3 安全审计的结合。
- [GitHub](https://github.com/anthropics/skills/pull/1771)

**#1742 mcp-builder 兼容 mcp>=2.0** `Open`
- **功能**：修复 `mcp>=2.0.0` 中 `streamablehttp_client` 重命名为 `streamable_http_client`、自定义 headers 改用 `create_mcp_http_client` 导致的连接失败。
- **讨论热点**：MCP 协议快速迭代带来的下游兼容性阵痛，直接回应 issue #1668。
- [GitHub](https://github.com/anthropics/skills/pull/1742)

**#1703 md2video-audio Markdown 一键转视频** `Open`
- **功能**：零成本将 Markdown 文档经 Marp 编译为幻灯片，并合成拟真人声，输出专业级 MP4 教学视频。
- **讨论热点**：课程/文档视频化自动化，内容创作场景需求旺盛。
- [GitHub](https://github.com/anthropics/skills/pull/1703)

**#1734 检测孤立 DOCX 评论** `Open`
- **功能**：识别 DOCX 文档中失去锚点引用的孤儿评论（orphaned comments），完善文档协作审阅链路。
- **讨论热点**：属于 docx Skill 家族的高频修补方向，与 #1790、#1792 等近期 docx 修复形成集群。
- [GitHub](https://github.com/anthropics/skills/pull/1734)

**#525 pyxel 复古游戏开发** `Open`（已活跃 6 个多月）
- **功能**：基于 Pyxel 的 Python 复古游戏创建、调试与验证，支持无头输入驱动运行、逐帧画面检查与状态断言。
- **讨论热点**：长期未合并但持续更新（最近 2026-09-22），评审周期长，社区持续关注其进展。
- [GitHub](https://github.com/anthropics/skills/pull/525)

**#514 document-typography 文档排版质检** `Open`
- **功能**：修复 AI 生成文档的典型排版缺陷：孤行（1-6 词溢出到下一行）、标题悬挂在页底、编号错位。
- **讨论热点**：直击"每个 Claude 用户都会遇到"的通用问题，受众面广。
- [GitHub](https://github.com/anthropics/skills/pull/514)

**#1615 scnet-hpc 超算集群运维** `Open`
- **功能**：通过 profile 化 SSH 与 Slurm 工作流操作 SCNet HPC 集群，涵盖分区/内存/模块/加速器配置与作业生成。
- **讨论热点**：企业级/科研级基础设施运维方向，代表 Skills 从文档处理向专业领域渗透。
- [GitHub](https://github.com/anthropics/skills/pull/1615)

---

## 2. 社区需求趋势（来自 Issues）

### 新 Skill 方向提案

| 方向 | 代表 Issue | 说明 |
|------|-----------|------|
| **Agent 记忆管理** | [#1329 compact-memory](https://github.com/anthropics/skills/issues/1329) | 用符号化记法压缩长时运行 Agent 的上下文笔记，解决长篇散文式记忆的 token 浪费（10 条评论） |
| **Agent 治理与安全** | [#412 agent-governance](https://github.com/anthropics/skills/issues/412) | 策略执行、威胁检测、信任评分与审计追踪等 AI Agent 系统治理模式（6 条评论，已关闭） |
| **推理质量管控** | [#1385 Reasoning Quality Gate](https://github.com/anthropics/skills/issues/1385) | 前置校准 → 对抗性审查 → 交付验证的三闸门质量管道（4 条评论） |
| **测试生成** | （PR 侧佐证） | #822 AWT 零代码 E2E 测试、#723 testing-patterns 全栈测试模式，测试类 Skill 持续涌现 |

### 生态层面痛点（按评论数）

- **安全与信任边界**（#492，43 条评论）：社区 Skill 在 `anthropic/` 命名空间下分发，冒名官方、诱导用户授权，是当前最严重的生态问题。
- **组织级共享缺失**（#228，16 条评论）：用户被迫手动下载 .skill 文件经 Slack/Teams 传递，呼吁组织内 Skill 库或直接分享链接。
- **评估机制失灵**（#556，12 条评论）：`run_eval.py` 用 `claude -p` 跑测试时所有查询 0% 触发率，Skill 评估管道实际不可用。
- **重复安装与上下文浪费**（#189，9 👍；#1487 4 条评论）：插件间 Skill 重复注入；`claude-api` 单次调用即可注入约 156k tokens 撑爆上下文。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、近期仍在更新，且属于新增 Skill（非纯修复），可能近期落地：

| Skill | 核心功能 | 最近更新 | 落地潜力点 |
|-------|---------|---------|-----------|
| [#723 testing-patterns](https://github.com/anthropics/skills/pull/723) | 全栈测试模式：Testing Trophy、AAA 模式、React Testing Library、边界用例 | 2026-09-21 | 与 #822 呼应，测试类需求旺盛，内容体系完整 |
| [#822 AWT](https://github.com/anthropics/skills/pull/822) | AI 视觉 + 浏览器控制的零代码 E2E 测试生成 | 2026-09-19 | 开源工具已成熟，接入成本低 |
| [#525 pyxel](https://github.com/anthropics/skills/pull/525) | Python 复古游戏开发闭环（实现→调试→验证） | 2026-09-22 | 作者持续跟进 6 个月，迭代接近收敛 |
| [#1776 blast-radius](https://github.com/anthropics/skills/pull/1776) | 批量/破坏性写操作前安全清单（归档用户、删除行、批量邮件等） | 2026-09-18 | 安全主题契合社区当前最大关切 |
| [#1703 md2video-audio](https://github.com/anthropics/skills/pull/1703) | Markdown → MP4 教学视频（含语音合成） | 2026-09-15 | 内容创作自动化，零成本定位易传播 |
| [#1771 proofcore](https://github.com/anthropics/skills/pull/1771) | 智能合约审计 + 链上存证 | 2026-09-16 | 全新赛道（Web3），差异化明显 |

> 另注意 **#1298 skill-creator 修复** 与 **#1769 触发器召回率修复** 虽属维护型 PR，但直接解决 #556 等社区高频 Bug，合并优先级可能高于新 Skill。

---

## 4. Skills 生态洞察

**一句话总结**：当前社区最集中的诉求是构建一个**安全可信、评估可靠、可协作共享**的 Skills 生态——既要封堵冒名官方命名空间导致的信任边界漏洞（#492），又要修复触发器/求值器全线失灵的基础设施问题（#556、#1298、#1769），同时通过组织级共享（#228）与上下文高效注入（#1487）让 Skill 规模化落地。

---

# Claude Code 社区动态日报 — 2026-09-24

## 1. 今日速览

昨日发布 v2.1.281，为 Claude apps gateway 增加了新版 Desktop keys 策略支持和 Bedrock IAM 角色假设能力。社区侧 **MCP 相关问题集中爆发**，多个高危 bug 指向工具 schema 校验与 OAuth 兼容性；同时 Cowork 功能在 hooks/settings 继承与 Windows 平台上的缺陷引发持续讨论，#40495 以 22 条评论成为当前最热 issue。

## 2. 版本发布

**v2.1.281**
- Claude apps gateway 新增对更新版 Claude Desktop keys 的 `desktop` policy blocks 支持，包括 `blockReadsOutsideWorkingDirectories` 与 `disableBypassPermissionsMode`
- Claude apps gateway 的 Bedrock upstreams 新增 `assume_role` 配置：网关将作为指定 IAM 角色调用 Bedrock

## 3. 社区热点 Issues

### 1. Cowork 会话忽略用户 hooks 和托管设置（22 评论 👍22）
`[bug] [platform:macos] [area:hooks] [area:cowork]` #40495  
**链接**: https://github.com/anthropics/claude-code/issues/40495  
Cowork 会话在 sandbox 平台不匹配时，用户 hooks 和托管设置完全失效，导致所有设置解析失败。**重要点**: 这是当前评论数最高的 issue，说明 Cowork 的配置继承机制存在系统性缺陷，影响安全策略落地。

### 2. 请求支持单独禁用插件 skills（18 评论 👍94）
`[enhancement] [platform:macos] [area:core]` #14920  
**链接**: https://github.com/anthropics/claude-code/issues/14920  
用户希望可以单独禁用插件的某个 skill（如只保留 `:commit`，禁用 `clean_gone`），而非整个插件。**重要点**: 94 个 👍 表明这是社区最迫切的功能需求之一，插件生态精细化控制呼声很高。

### 3. VS Code 扩展：点击二进制文件链接静默失败（6 评论 👍9）
`[bug] [area:ide]` #81227  
**链接**: https://github.com/anthropics/claude-code/issues/81227  
聊天面板中点击 PNG/JPG/PDF 等二进制文件的 markdown 链接时，`showTextDocument()` 的 rejection 未处理，**点击无任何反馈**。**重要点**: 交互细节缺陷直接影响 IDE 使用体验，且"静默失败"问题排查成本高。

### 4. 桌面应用：发送后输入框回填旧消息（5 评论）
`[bug] [platform:windows] [platform:macos] [area:desktop]` #94732  
**链接**: https://github.com/anthropics/claude-code/issues/94732  
发送消息后输入框不清空，而是重新填入刚发送的内容，用户需手动删除才能继续输入。**重要点**: 最近创建（09-16）且已关闭，是桌面端基础交互的高频痛点。

### 5. Skill frontmatter 的 model 覆盖被忽略（5 评论）
`[bug] [area:skills]` #79664  
**链接**: https://github.com/anthropics/claude-code/issues/79664  
用户在 frontmatter 中指定的 model 在 Skill 工具调用时被忽略，但通过 `/skill-name` 手动调用时生效。**重要点**: 行为不一致导致 skill 的模型路由不可控，影响 skill 开发者的部署预期。

### 6. 1M 上下文会话因 ECONNRESET 不可恢复（4 评论）
`[bug] [platform:macos] [area:networking]` #74544  
**链接**: https://github.com/anthropics/claude-code/issues/74544  
大上下文会话机器的缓存失效后，API 持续 `ECONNRESET`，且 `/compact` 同样失败，因为压缩本身需要发送完整历史。**重要点**: 大上下文用户被锁死，compaction 依赖完整上下文的设计缺陷被放大。

### 7. MCP 工具因 inputSchema 的 allOf/if/then 被静默丢弃（2 评论）
`[bug] [has repro] [platform:macos] [area:mcp]` #95504  
**链接**: https://github.com/anthropics/claude-code/issues/95504  
MCP 2026-07-28 spec 允许 tool inputSchema 使用 root-level `allOf`/`if/then`，但 Claude Code 会静默丢弃这些工具。**重要点**: 新 spec 兼容性问题，且是"静默丢弃"，服务端毫无报错线索。

### 8. MCP 单工具 schema 非法导致整个服务器工具被丢弃（2 评论）
`[bug] [has repro] [platform:windows] [area:mcp]` #88049  
**链接**: https://github.com/anthropics/claude-code/issues/88049  
HTTP MCP 服务器上**一个**工具的 `inputSchema` 顶层不是 object 时，该服务器的**所有**工具都被丢弃，CLI 与服务端均无错误提示。**重要点**: 单点故障放大为全局失效，且零日志的设计让排查极其困难。

### 9. autoMemoryDirectory 应支持本地仓库存储（2 评论）
`[enhancement] [area:core]` #87517  
**链接**: https://github.com/anthropics/claude-code/issues/87517  
当前 `autoMemoryDirectory` 仅支持绝对路径，请求支持基于仓库的相对存储，便于团队共享和版本管理。**重要点**: 反映社区对"项目内记忆"的需求，期望记忆文件随仓库分发。

### 10. Bash tab-completion for claude CLI（1 评论 👍1）
`[enhancement] [area:cli]` #91120  
**链接**: https://github.com/anthropics/claude-code/issues/91120  
CLI 缺少 Bash tab-completion，希望支持子命令/flag 补全。**重要点**: 虽评论少但方向明确，CLI 日常可用性的基础改进。

## 4. 重要 PR 进展

> 本次数据源共 5 条 PR，以下全部收录。

### 1. telemetry: 记录引擎版本与构建时间（#96487）
**链接**: https://github.com/anthropics/claude-code/pull/96487  
修改 telemetry 数据采集逻辑，通过 `$.session.version()` 读取引擎版本、基础版本和构建时间，修复外部构建产物的 telemetry 行缺少版本信息的问题。

### 2. security-guidance: 拒绝文件与密钥文件远离 reviewer 上下文（#96434）
**链接**: https://github.com/anthropics/claude-code/pull/96434  
修复 #96276。此前 security-guidance reviewer 可通过 `git diff`/`git show` 将会话权限规则禁止读取的 `secrets.yaml` 等文件放入模型上下文，绕过防护。**重要点**: 这是一项安全修复，防止权限旁路。

### 3. diff: 强制 git 颜色导致 diff 内容为空（#96363）
**链接**: https://github.com/anthropics/claude-code/pull/96363  
当用户或仓库配置了 `color.ui=always` 或 `color.diff=always`，`git diff` 输出全是 ANSI 转义序列，diff 体为空。本 PR 在调用时追加 `--no-color` 修复。

### 4. agents-md: 嵌套 AGENTS.md 分页读取不再误判为已交付（#96364）
**链接**: https://github.com/anthropics/claude-code/pull/96364  
修复分页读取嵌套 AGENTS.md 时，第一页被误判为"已完整交付"，导致后续 Read 不再附加该文件的问题。

### 5. docs: code-review README 对齐当前校验逻辑（#79150）
**链接**: https://github.com/anthropics/claude-code/pull/79150  
README 长期未更新：描述的 git blame 流程、0-100 置信度评分和 80 分阈值在代码中已不存在。文档与实现对齐，避免误导用户。

## 5. 功能需求趋势

| 方向 | 代表 Issues | 驱动因素 |
|------|-------------|----------|
| **MCP 兼容性与健壮性** | #95504, #88049, #84263 | 新 spec 的 schema 结构带来工具丢弃；OAuth metadata 被 claude.ai bot protection 拦截（403） |
| **Cowork 配置继承** | #40495, #95910, #79681 | hooks/managed settings 不随会话生效；Windows Plan9 mount 失败 |
| **Skills/插件精细控制** | #14920, #79664 | 用户希望禁用单个 skill 而非整个插件；frontmatter model 应可覆盖默认路由 |
| **本地记忆与存储** | #87517 | 团队共享记忆需支持仓库相对路径，随项目版本管理 |
| **CLI 可用性** | #91120 | Bash tab-completion 补齐命令行基础设施 |

## 6. 开发者关注点

- **MCP 静默失败问题最突出**：无论是单个工具 schema 非法导致全服务器工具被丢弃（#88049），还是新 spec 的 `allOf`/`if/then` 被忽略（#95504），反馈都指向"无日志、无错误、无提示"的三无失败。开发者希望至少能记录 warning 日志。
- **Cowork 功能与既有配置割裂**：hooks、managed settings 在 Cowork 会话中不生效（#40495），安全策略形同虚设；Windows 上 Plan9 mount 报 errno=22（#95910），平台支持仍不成熟。
- **大上下文会话不可恢复**：1M 上下文经 ECONNRESET 后 `/compact` 也无法自救（#74544），说明 compaction 设计不应依赖完整上下文传输。
- **桌面端基础交互问题反复**：输入框回填旧消息（#94732）、会话列表布局错乱（#79693）、进度指示器冻结（#79668）等大量 issue 集中在 desktop app 的 UI 细节，说明桌面端的 QA 覆盖不足。
- **IDE 集成深度不够**：VS Code 中二进制文件链接点击无反馈（#81227）、LSP 客户端在 Edit 后不发送 didChange（#79744），插件生态的工程成熟度仍有差距。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 — 2026-09-24

## 今日速览

- **发布 rust-v0.156.1**：正式版新增 GPT-6 Sol / GPT-6 Luna 模型选择，并在限流提示中推荐 GPT-6 Luna。
- **Windows 桌面端稳定性问题集中爆发**：#45626、#44342、#40231 等老 issue 仍在活跃，消息发送被禁用、app-server 崩溃、沙箱失败成为社区最大痛点。
- **PR 侧密集推进**：Guardian 上下文管理大规模重构（移除遗留路径、默认启用 thread-owned 模式），Windows 沙箱凭证修复，以及扩展 API 新增模型请求/响应拦截钩子。

---

## 版本发布

### rust-v0.156.1（正式版）
- **新特性**：模型选择器新增 GPT-6 Sol 与 GPT-6 Luna；限流切换提示现在推荐 GPT-6 Luna。（[#47405](https://github.com/openai/codex/pull/47405)）
- **Changelog**：[rust-v0.156.0...rust-v0.156.1](https://github.com/openai/codex/compare/rust-v0.156.0...rust-v0.156.1)

### 预发布版本（Alpha）
- `rust-v0.158.0-alpha.2` ~ `rust-v0.158.0-alpha.6`
- `rust-v0.157.0-alpha.11`
- `rust-v0.155.0-alpha.16.3` / `rust-v0.155.0-alpha.16.4`

> 均为内部迭代版本，无公开变更说明。

---

## 社区热点 Issues（10 个）

### 1. Windows 桌面端：首轮完成后无法发送后续消息（#45626）
**评论 30 · 👍 5 · 状态 OPEN**  
Windows 桌面版 26.908.70816 在首轮对话完成后持续禁用“发送”按钮，影响新建和已有会话，CLI 不受影响。这是目前 Windows 端反馈最集中的问题之一，已有多人复现。

🔗 https://github.com/openai/codex/issues/45626

### 2. Windows 桌面端：existing-chat 被 loading-local-config 无限阻塞（#44342）
**评论 18 · 👍 6 · 状态 OPEN**  
现有会话发送被“pending codex-home”卡死，主窗口刷新可恢复，但重启后复发。用户 @kwon0516 提供了详细证据，社区认为这是渲染进程与 app-server 的竞态问题。

🔗 https://github.com/openai/codex/issues/44342

### 3. Windows ChatGPT Work：项目上下文同步反复失败（#42215）
**评论 38 · 👍 0 · 状态 OPEN**  
Windows ChatGPT 桌面应用在已有 Project 中无法启动本地 Work 聊天，上下文同步在 filesystem 阶段失败。虽然 👍 数不高，但评论数最多，影响面广。

🔗 https://github.com/openai/codex/issues/42215

### 4. Windows：app-server 被 STATUS_CONTROL_C_EXIT 终止（#40231）
**评论 13 · 👍 0 · 状态 OPEN**  
Windows 10 上，app-server 在 agent 执行 shell 命令几分钟后反复被 0xC000013A 终止，纯聊天/空闲会话不受影响。用户在 26.818.5229 后遇到回归。

🔗 https://github.com/openai/codex/issues/40231

### 5. Codex 无法在 VS Code Server / serve-web 中激活（#47357）
**评论 5 · 👍 9 · 状态 OPEN**  
Codex Audio 扩展仅支持桌面端，导致 Codex 在 VS Code Server / serve-web 远程场景下无法激活。这是远程开发用户的高频诉求。

🔗 https://github.com/openai/codex/issues/47357

### 6. 桌面端缺少 Git commit / push 按钮（#47511）
**评论 3 · 👍 12 · 状态 OPEN**  
26.917.51856 中可见的 Git commit/push 按钮消失，被认为是回归。👍 数今日最高，反映了用户对桌面端内置 Git 工作流的强烈依赖。

🔗 https://github.com/openai/codex/issues/47511

### 7. Windows App 26.915.4065.0 无法加载内置插件（#46744）
**评论 5 · 👍 0 · 状态 OPEN**  
Browser、Computer Use、Image Gen 等 openai-bundled 插件在 Windows 上全部不可用，免费和 Plus 账户均复现。

🔗 https://github.com/openai/codex/issues/46744

### 8. CLI 0.155.1 → 0.156.0 回归：workspace 从 routing discovery 中丢失（#47374）
**评论 4 · 👍 1 · 状态 OPEN**  
升级后，所选 workspace 无法被路由发现，影响本地代码操作。属版本回归，用户期望快速修复。

🔗 https://github.com/openai/codex/issues/47374

### 9. 桌面端设置对 features.thread_tools 发出未知特性警告（#47043）
**评论 6 · 👍 4 · 状态 OPEN**  
Desktop 26.915.31945 内置 CLI 0.155.0-alpha.9.2，配置中合法字段被错误标记为 unrecognized，与 0.156.0 配置结构变更有关。

🔗 https://github.com/openai/codex/issues/47043

### 10. MCP 连接器因 OAuth token 刷新失败被永久禁用（#38198）
**评论 3 · 👍 3 · 状态 OPEN**  
MCP 服务器 OAuth 刷新失败后，连接器被永久禁用且没有重新认证入口。企业用户受影响，属于设计缺陷。

🔗 https://github.com/openai/codex/issues/38198

---

## 重要 PR 进展（10 个）

### 1. 添加 executor capability discovery V2 基础设施（#47683）
定义 `capabilities/discoverV2` 请求与清单类型，并在 executor 元数据中通告 `capabilityDiscoveryV2`；启动时预热已安装插件和全局技能位置。

🔗 https://github.com/openai/codex/pull/47683

### 2. 扩展 API：模型请求/响应流扩展钩子（#47679）
新增 `ModelRequestContributor` 和 `ModelResponseInterceptor`，扩展可向请求添加过滤后的 `client_metadata`，并拦截单个请求的响应流。

🔗 https://github.com/openai/codex/pull/47679

### 3. 修复 Windows 10 无 reparse 目录打开（#47672）
Windows 10 拒绝使用 Object Manager drive-letter 链接打开 `OBJ_DONT_REPARSE` 目录；PR 在调用前先用 `QueryDosDeviceW` 解析盘符别名。

🔗 https://github.com/openai/codex/pull/47672

### 4. 修复 Windows 沙箱注册凭证被拒绝的问题（#47695）
此前仅检查账户标志位，无法发现 Windows 拒绝了存储的密码；现增加对已存凭证的校验，在运行时 logon 之前识别失败。

🔗 https://github.com/openai/codex/pull/47695

### 5. Guardian：thread-owned 上下文默认启用（#47686）
弃用并忽略 `features.guardianv2.thread_context`（含 profile 覆盖），带迁移提示；保留兼容旧 root 指令。

🔗 https://github.com/openai/codex/pull/47686

### 6. Guardian：移除遗留授权证据路径（#47688）
子代理授权审查改用保留的 root context，移除独立的旧历史路径；删除运行时 `request_user_input` 应答缓冲区及响应计数器。

🔗 https://github.com/openai/codex/pull/47688

### 7. 修复 Mermaid 流程图引号标签与 & 符号支持（#47678）
支持双引号节点/边标签（如 `A["Review & confirm"]`），去除引号并允许字面 `&`，避免回退到源码显示。

🔗 https://github.com/openai/codex/pull/47678

### 8. MCP 资源工具支持模型目录覆盖（#47677）
新增 `model_messages.tools.mcp_resources` 配置项，使 `list_mcp_resources`、`list_mcp_resource_templates` 等工具的描述与参数模式可随模型变化。

🔗 https://github.com/openai/codex/pull/47677

### 9. 保留路由感知传输中的托管网络策略（#47663）
默认传输回退在使用 `ReqwestDefault` 代理或在 Codex 沙箱内运行时绕过了托管网络策略；现在启用 `RouteAwareClientPool` 以强制策略。

🔗 https://github.com/openai/codex/pull/47663

### 10. 在早期统一 exec 输出中保留完成事件（#47665）
流式订阅器挂载前产生的输出现在直接记录在 `UnifiedExecProcess` 的有限完成转录中，防止命令完成事件丢失返回给模型的输出。

🔗 https://github.com/openai/codex/pull/47665

---

## 功能需求趋势

### 1. Windows 桌面端稳定性压倒性优先
38 个活跃 Issue 中超过一半与 Windows 相关：消息发送被禁用、app-server 崩溃、sandbox 凭证失败、插件加载失败。社区对 Windows 端的稳定性已表现出明显不满。

### 2. 模型支持快速跟进
GPT-6 Sol/Luna 已在 rust-v0.156.1 中加入，issue 中已出现 `gpt-6-astra`、`gpt-5.3-codex-spark` 等新模型的实际使用反馈，模型生态迭代速度很快。

### 3. 远程/服务器场景支持不足
VS Code Server / serve-web 无法激活 Codex（#47357）获得 9 个 👍，远程开发场景是用户明确想要的能力缺口。

### 4. 配置架构治理
#45627 提出将 `~/.codex/config.toml` 拆分为用户配置与运行时/插件/项目状态；#47676 要求完成时间戳格式可配置。用户希望配置文件更有序、更可控。

### 5. MCP 与扩展生态增强
MCP 连接器永久禁用（#38198）、MCP 工具 schema 保留（#36298）、扩展 API 钩子（#47679/#47662）表明社区对 MCP/扩展生态的深度集成需求在上升。

---

## 开发者关注点

- **Windows 桌面端消息发送被禁用/挂起**（#45626、#46299、#44342）是最集中的痛点，多版本未修复，用户在多个 issue 中表达强烈不满。
- **app-server 被异常终止**（#40231，STATUS_CONTROL_C_EXIT）导致 agent 任务中途失败，且与 shell 命令执行强相关，影响本地开发工作流。
- **沙箱配置问题**（#35380 WSL UNC 路径、#46668 沙箱失败浪费配额）反复消耗用户时间和 Codex 配额，急需稳定修复。
- **插件加载失败**（#46744）在 Windows 上导致 Browser、Computer Use、Image Gen 等核心功能不可用，免费与付费用户均受影响。
- **配置格式混乱**：`config.toml` 同时承载用户配置和运行时状态导致文件膨胀，#47043 又出现未知字段误报，开发者希望配置结构更清晰。
- **会话管理缺陷**：#47056 刷新元数据可恢复已回滚消息、#47124 恢复会话丢失最终答案、#47379 存储错误后预览使用错误消息——会话可靠性有待加强。
- **高频功能期待**：Git 操作按钮回归（#47511，👍 12）是今日最高赞 issue，社区对桌面端内置 Git 工作流有明确依赖。

---

> 日报数据来源：[github.com/openai/codex](https://github.com/openai/codex) · 统计窗口：2026-09-23 至 2026-09-24

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-24

数据范围：过去 24 小时（截至 2026-09-23）· 来源：github.com/google-gemini/gemini-cli

## 今日速览

- **新模型支持落地**：v0.62.0-nightly 合入 Gemini 3.8 Flash 与 3.5 Flash Lite 支持，并已 cherry-pick 到 v0.61.0-preview 分支，发布节奏明显加快。
- **子代理可靠性成为焦点**：`codebase_investigator` 在 MAX_TURNS 中断后仍被误报为 `GOAL success`（#22323），以及 Generalist 代理无限挂起（#21409）两个 P1 问题持续引发社区讨论。
- **多个高优修复 PR 密集推进**：覆盖 IDE 集成 UI 冻结、MCP 配置安全、read-many-files 上下文膨胀、不可信工作区破坏 settings.json 等痛点。

## 版本发布

过去 24 小时共发布/更新 4 个版本：

- **v0.62.0-nightly.20260923.g62364cb20**：新增 **Gemini 3.8 Flash** 与 **Gemini 3.5 Flash Lite** GA 模型支持（[PR #29443](https://github.com/google-gemini/gemini-cli/pull/29443)）。
- **v0.62.0-preview.0**：修复 A2A Server tasks metadata 端点在 unsupported store 时未提前返回的问题（[PR #29334](https://github.com/google-gemini/gemini-cli/pull/29334)）。
- **v0.61.0**：常规发布，内容以 changelog 与版本号 bump 为主。
- **v0.61.0-preview.1**：将 62364cb（Gemini 3.8 Flash / 3.5 Flash Lite 支持）cherry-pick 至 release/v0.61.0-preview 分支，形成补丁版本（[PR #29455](https://github.com/google-gemini/gemini-cli/pull/29455)）。

## 社区热点 Issues

精选 10 个最值得关注的 Issue（按优先级与社区热度排序）：

1. **[P1] 子代理 MAX_TURNS 后误报成功，掩盖真实中断** [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
   `codebase_investigator` 子代理实际因达到最大轮数被截断，却返回 `status: "success"` / `Termination Reason: "GOAL"`，且未做任何分析。这会严重误导用户对任务结果的判断，是代理可信度层面的关键缺陷。13 条评论，已进入 need-retesting。

2. **[P1] Generalist 代理无限挂起** [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
   一旦主代理委托给 generalist 代理就永远无响应——用户实测等待 1 小时无果，简单操作（如创建文件夹）也会触发。社区给出的 workaround 是显式禁止模型使用子代理。8 条评论、8 个 👍，影响面较大。

3. **[P1] errorVerbosity="full" 时不显示重试进度** [#28340](https://github.com/google-gemini/gemini-cli/issues/28340)
   连接失败进入重试序列时，终端 spinner 一直停留在 "Thinking..."，不显示 `Trying to reach [...] (Attempt N/10)`，用户无法感知恢复过程。修复 PR #29468 已提交。

4. **[P1] browser subagent 在 Wayland 下失败** [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
   Linux Wayland 会话中浏览器子代理直接失败（Termination Reason: GOAL），限制了 Linux 桌面用户使用浏览器自动化能力。

5. **[P2] Browser Agent 忽略 settings.json 配置覆盖** [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)
   AgentRegistry 虽能正确读取合并 `settings.json`，但 BrowserManager 在执行时完全无视 `maxTurns` 等覆盖配置，导致用户无法按需调优浏览器代理行为。

6. **[P2] 工具数量超过阈值触发 400 错误** [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)
   启用工具过多时（Issue 标题提到 >128，正文描述 >400 场景）直接触发 400 错误。社区期望模型能按需限制工具范围，而非让用户自行削减扩展。多工具/多 MCP 场景下属于硬限制。

7. **[P2] AST 感知文件读取/搜索/代码映射影响评估（EPIC）** [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
   追踪 AST 感知工具在精确读取方法边界、减少 token 噪声、改进代码库导航方面的研究价值。这一系列调查（含 #22746、#22747）可能影响未来代码理解架构的方向性决策。

8. **[P2] 模型不主动使用自定义 skills 和子代理** [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
   社区反馈 Gemini 几乎从不主动调用自定义技能（如 gradle/git 技能）或子代理，必须显式指示才用，削弱了扩展机制的价值。6 条评论。

9. **[P2] Auto Memory 无限重试低信号会话** [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
   只有当提取代理成功 `read_file` 读取 transcript 后，会话才会被标记为已处理；低信号会话因代理决定不读而永远留在待处理队列，后台服务持续空转。

10. **[P2] Auto Memory 需确定性脱敏并减少日志** [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
    问题在于：脱敏发生在内容已进入模型上下文之后，且服务可能记录现有技能内容。属于数据安全/隐私隐患，社区关注度正在上升。

## 重要 PR 进展

精选 10 个重要 PR（含已合入与审核中）：

1. **[已合入] 支持 Gemini 3.8 Flash / 3.5 Flash Lite** [#29443](https://github.com/google-gemini/gemini-cli/pull/29443)
   将 `gemini-3.8-flash` 与 `gemini-3.5-flash-lite` 提升为最新 GA 模型。已进入 v0.62.0-nightly，并通过 #29455 同步至 v0.61.0-preview.1。

2. **[已关闭] 连接恢复时显示重试进度指示器** [#29468](https://github.com/google-gemini/gemini-cli/pull/29468)
   修复 #28340。在 `errorVerbosity="full"` 下，连接失败 / 429 / 503 重试时 UI 不再卡死显示 "Thinking..."，改为展示 `Attempt (N/10)` 进度。

3. **[审核中] 限制工具输出大小并优化内存生命周期** [#29451](https://github.com/google-gemini/gemini-cli/pull/29451)
   针对构建脚本、测试套件等高频工具调用场景，约束工具执行输出大小，防止多轮 agent 循环中进程内存无界增长。

4. **[审核中] 解耦工具确认与 IDE diff RPC，修复 UI 冻结** [#29452](https://github.com/google-gemini/gemini-cli/pull/29452)
   修复 #23297：IDE 集成终端中按 Enter 批准工具无响应。将用户确认分发从 IDE diff 解析中解耦，避免阻塞性 RPC 导致 UI 冻结。

5. **[审核中] read-many-files 改用 glob 匹配，修复上下文膨胀** [#29457](https://github.com/google-gemini/gemini-cli/pull/29457)
   修复 b/561554390 / #29045：图片、PDF、音频等二进制资源此前因 `includes()` 模糊匹配被误判为“显式请求”，导致上下文被无关内容撑爆。

6. **[审核中] 移除无效的 diff.external 覆盖** [#29467](https://github.com/google-gemini/gemini-cli/pull/29467)
   移除 ShellExecutionService 与 `getSafeGitEnv()` 中的无效 `diff.external` 配置，解决执行 git diff 时 `cannot spawn` / `error: cannot run` 致命错误。

7. **[审核中] 防止不可信工作区清空 settings.json** [#29466](https://github.com/google-gemini/gemini-cli/pull/29466)
   修复安全漏洞：在未受信任目录运行 `gemini mcp add` 会静默破坏该项目的 `.gemini/settings.json`（仅保留刚写入的 key）并报告成功。此 PR 阻止该破坏行为。

8. **[审核中] 修复 ACP 会话加载竞态与文件名冲突** [#29463](https://github.com/google-gemini/gemini-cli/pull/29463)
   修复 `session/load` 与 `session/new` 在同一 UTC 分钟内调用时，先覆盖活动会话检查点导致 `No previous sessions found` 的问题。

9. **[审核中] 区分不可读与缺失的 MCP enablement 配置** [#29445](https://github.com/google-gemini/gemini-cli/pull/29445)
   当前损坏的 `mcp-server-enablement.json` 会“失败开放”——已禁用的 MCP 服务器全部被重新启用并暴露工具给模型；下一次 `disable()` 还会用单条新文件覆盖损坏文件、擦除其他条目。

10. **[审核中] 修复 stdin 中 @ 符号导致 100% CPU 挂起** [#29436](https://github.com/google-gemini/gemini-cli/pull/29436)
    当管道/粘贴内容包含双引号内的 `@`（如 `import { x } from "@scope/pkg"`）时，旧正则反复匹配交替序列，消耗大量 CPU。此 PR 修复 @path 命令解析逻辑。

## 功能需求趋势

从全部 Issue 与 PR 中提炼出社区最关注的方向：

1. **子代理可观测与可控性**：社区不满足于黑盒式子代理调用，明确要求子代理轨迹可通过 `/chat share` 分享（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）、`/bug` 报告包含子代理内部上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）、支持 Ctrl+B 后台化本地子代理（[#22741](https://github.com/google-gemini/gemini-cli/issues/22741)）。

2. **AST 感知代码工具**：[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) 系列 EPIC（含 #22746、#22747）系统评估 AST 感知 CLI 在文件读取、搜索与代码库映射上的收益，目标是降低 token 消耗、提升导航精度。若验证有效，可能成为代码库理解架构的演进方向。

3. **Auto Memory 安全与质量加固**：[#26516](https://github.com/google-gemini/gemini-cli/issues/26516) 追踪系列问题，要求确定性脱敏（#26525）、隔离无效内存补丁（#26523）、停止低信号会话无限重试（#26522），反映后台记忆链路的安全与效率双重诉求。

4. **浏览器代理韧性增强**：[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) 要求实现会话自动接管与锁恢复以替代 fail-fast 策略；叠加 #22267 配置生效与 #21983 Wayland 支持，浏览器代理的可用性仍是 Linux/进阶用户的核心痛点。

5. **安全与数据保护**：阻止模型使用破坏性 git 命令（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）、MCP 配置损坏时 fail-closed（#29445）、不可信工作区文件保护（#29466）——开发者开始关注 agent 操作对本地环境的“副作用边界”。

6. **新模型支持节奏加快**：Gemini 3.8 Flash / 3.5 Flash Lite 在 24 小时内完成 nightly 合入 + preview cherry-pick，说明社区对最新模型能力有强需求，且官方发布流程已高度自动化。

## 开发者关注点

综合 Issue 与 PR 反馈，当前开发者最集中的痛点是：

1. **子代理结果可信度不足**：MAX_TURNS 被误报为 GOAL success（#22323）是最尖锐的信号——用户无法信任子代理的完成状态，需要明确的中断/成功语义区分。
2. **挂起与卡死类问题**：Generalist 代理无限挂起（#21409）、交互式 prompt 卡住（#22465）、stdin 特殊字符导致 CPU 100%（#29436）——这类“无法终止”的问题最消耗开发和调试耐心，优先修复呼声高。
3. **配置覆盖不生效或被破坏**：settings.json 中设置了却不生效（#22267），或配置被不可信工作区/损坏文件/误操作清空（#29466、#29445）——配置系统的“可预期性”成为信任基础。
4. **上下文膨胀与 token 浪费**：工具数量超限触发 400（#24246）、二进制文件被模糊匹配误读注入上下文（#29457）、子代理轨迹不可见导致难以定位问题（#22598）——开发者期望 CLI 在上下文管理上更“聪明”。
5. **UI 反馈缺失**：连接恢复进度不可见（#28340）、终端 resize 闪烁（#21924）——长时间任务中，明确的进度反馈与流畅的 UI 渲染直接影响使用体验。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-24

## 今日速览

昨日发布 v1.38.12 稳定版（CLI + Desktop），重点修复会话创建、导航与生命周期问题，同时 Studio v2.19.0 带来了内置浏览器与 macOS 应用操作能力。然而社区最集中的反馈是 v1.38.11 升级后侧边栏历史会话全部消失的严重回归，已导致多个 data-loss 相关 Issue，开发团队连夜提交侧边栏修复 PR（#10696–#10700），但该问题暂时仍是用户关注的第一痛点。

---

## 版本发布

### v1.38.12（CLI + Desktop 稳定版）

> 此版本重点修复会话创建、导航和生命周期问题，提升性能，并改善整体桌面体验。

- **发布渠道：稳定版 · v1.38.12**
- 更新日志：[English](https://reasonix.io/changelog/v1.38.12/?lang=en) ｜ [网页版完整更新日志](https://reasonix.io/changelog/v1.38.12/)

### Studio v2.19.0 亮点

- **内置浏览器**：Agent 可按站点授权打开、阅读、操作网页，页面渲染在对话旁，用户可实时看到 Agent 所看内容
- **macOS 应用操作**：Agent 可读取并操作其他应用窗口
- Agent 截取的图片会直接显示在对话中，而非仅发给模型
- 写完后 Agent 会预览渲染结果再结束本轮
- 修复用量金额被放大数十倍的问题

---

## 社区热点 Issues（10 条）

### 🔥 最严重回归：侧边栏历史会话消失

**#10665** 【桌面端】升级 v1.38.11 后侧边栏所有历史会话不显示（迁移未完成）
- 作者 @gwanting ｜ 5 条评论 ｜ 数据丢失
- 几百个历史会话升级后仅剩「1条历史需要修复」提示，日志报 `unsupported session storage version` 错误
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10665

**#10669** 侧边栏对话历史全部消失，但实际还在，用别的 agent 也修不回来
- 作者 @yuyanshadan ｜ Windows 11 ｜ 2 条评论
- 用户自述纯小白，无法提供更多技术细节，期待官方修复
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10669

**#10622** Windows v1.38.10→v1.38.11 升级后侧边栏永远加载中，仅列出当前打开会话
- 作者 @Aresitoo ｜ 4 条评论
- 详细附带了 `recovery.log` 与安装目录信息，是三个同问题中信息最完整的一个
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10622

### 性能与稳定性

**#10674** UI 越来越卡，加载历史会话很久，侧边栏反复出现加载动画
- 作者 @1ucky7 ｜ macOS Intel i9 ｜ 3 条评论
- 指向 v2 桌面端渲染性能和会话列表刷新机制的问题
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10674

**#10540** TUI 终端显示文字重复、错乱、不停滚屏
- 作者 @bfmomo ｜ Windows ｜ 2 条评论
- 已附 TUI 日志与 issue 复现文档，是 Windows 终端兼容性问题
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10540

**#10698** 对话跑多了就跳出 React 报错
- 作者 @TrojanFighter ｜ v1.38.10 ｜ 0 条评论
- Minified React error #185，出现在长时间对话后，疑似渲染内存压力
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10698

**#10692** React error #301 崩溃
- 作者 @Kabelake ｜ v1.38.11 ｜ 0 条评论
- 信息较少（未填版本号），但同属桌面端崩溃类
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10692

**#9525** （已关闭）任务执行中断很频繁，模型 deepseek-v4-flash-vision-exp
- 作者 @985211yyg ｜ v1.31.4 ｜ 3 条评论
- Agent 任务频繁中断的老问题，在最近的 Studio 版本中已关闭，可参考其解决方案
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/9525

### Agent 工具参数与稳定性

**#10693** 模型生成括号不匹配的工具参数后，transcript gate 硬中断且会话无法自愈
- 作者 @2992416915 ｜ v1.38.11 ｜ 0 条评论
- 根因是工具调用的 arguments 不是合法 JSON，transcript gate 直接中断整个会话，无自愈机制
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10693

**#10648** transcript gate: tool arguments must be a JSON object at message 989
- 作者 @mikejeo ｜ v1.38.11 ｜ 1 条评论
- 与 #10693 同类问题，在长会话中更容易触发，说明工具参数校验逻辑需要容错
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10648

**#10687** 【Feature】希望开发团队指定一个 issues 把问题少的版本列出来，让大家使用
- 作者 @ganbiedetuzi ｜ 1 条评论
- 代表相当一部分用户“稳定第一”的诉求，社区对频繁升级带来的回归已经疲劳
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10687

**#10686** 【Feature】将 fast-jev-compaction 移植到 Reasonix Desktop，作为压缩槽位替代方案
- 作者 @arshad-run ｜ 0 条评论
- 对当前 `/compact` 基于 LLM 摘要的损失性压缩提出替代方案，追求文件路径/错误字符串的完整保留
- 链接: https://github.com/esengine/DeepSeek-Reasonix/issues/10686

---

## 重要 PR 进展（10 条）

### 侧边栏修复系列（v2 主线）

**#10699** Fix project sidebar and session navigation consistency / 修复项目侧栏与会话切换一致性
- 修复添加已存在文件夹或空白项目时出现瞬态行或重复“新建会话”行、删除项目影响相邻项目的问题
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10699

**#10696** Fix historical session reconciliation / 修复历史会话展示与生命周期恢复
- 修复历史会话数据迁移后无法展示的问题，确保已采用的源会话以当前会话呈现，而非出现第二个不可用行
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10696

**#10697** Simplify new-session creation and recovery / 简化新建会话与失败恢复
- 修复输入框残留、跨会话恢复错误显示（`target_changed`）等问题
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10697

**#10700** Refresh Desktop migration inventory after sidebar fix / 更新侧栏修复后的桌面迁移清单
- 跟进 #10699 的迁移清单更新，修复 push-CI 失败
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10700

### 性能与渲染

**#10691** Avoid transcript render fanout during streaming / 减少流式输出时聊天区重复渲染
- 修复流式输出期间无关行反复重新渲染的问题，对长上下文会话性能有明显改善
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10691

**#10688** fix: preserve background gateways through model settings changes / 修复切换配置后后台网关阻塞发送
- 修复修改模型连接配置时，会话后续消息被拒绝、设置挂起的问题
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10688

**#10694** fix(remote): a remote kernel follows the broker instead of being replaced
- 修复远程 `reasonix serve` 只读一次 broker 地址和 token、后续无法跟随 broker 迁移的问题（多 Studio 窗口/重启场景）
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10694

**#10695** feat: add Yolo-Auto provider
- 社区贡献的新 provider preset，OpenAI 兼容接口，免费获取 API key，模型 slug 为 `yolo` 和 `yolo-small`
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10695

### 发布流程修复（Cloudflare 验证）

**#10712** fix: verify hydrated release site with standard Chrome identity
- Cloudflare 对 GitHub Actions 默认 HeadlessChrome 发起挑战，导致发布验证器无法验证水合后的桌面下载链接
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10712

**#10706** fix(release): fetch manifest with updater client / 使用更新器客户端读取清单
- v1.38.12 候选版本预检时，curl 请求 Stable manifest 被 Cloudflare 403 拦截，改用与桌面更新器一致的 Go `net/http` 请求特征
- 链接: https://github.com/esengine/DeepSeek-Reasonix/pull/10706

---

## 功能需求趋势

| 方向 | 诉求来源 | 热度 |
|------|----------|------|
| **会话历史与数据可靠性** | #10665、#10669、#10622、#10699、#10696 等 | 🔥 极热 |
| **长期运行稳定性与性能** | #10674（UI 变卡）、#10698/#10692（React 崩溃）、#10540（TUI 乱屏） | 🔥 极热 |
| **Agent 工具调用容错性** | #10648、#10693（transcript gate 硬中断）、#9525（任务频繁中断） | 高 |
| **稳定版本推荐机制** | #10687（社区直接呼吁 LTS 版本） | 中高 |
| **远程数据/存储管理** | #10483（远端对话删除，已关闭但被关注） | 中 |
| **压缩（Compaction）改进** | #10686（fast-jev-compaction 移植，避免 LLM 摘要丢失关键信息） | 中 |

更多值得注意的需求：
- **浏览器运行时升级**：CLI/Desktop 两个版本更新日志均提到浏览器运行时升级，内置浏览器会成为下一阶段重要能力
- **Agent 读取 macOS 应用**：Studio v2.19.0 已支持，社区对系统级自动化的需求在持续走高
- **弹窗提醒**（#10485）：用户希望 Agent 执行关键动作时能弹出通知

---

## 开发者关注点

### 高频痛点

1. **v1.38.11 升级导致侧边栏历史会话全部消失**（3 个 Issue，均为 Windows 桌面端，均为 data-loss 级别）—— 用户侧反馈最激烈的问题，也是昨夜 PR 最密集的修复方向
2. **升级回归频率偏高**—— 从「我们修复了迁移」到「升级后历史全部消失」，用户对频繁发版已产生明显不信任感，社区直接呼吁提供「问题少的稳定版本」
3. **流式输出时 UI 卡顿加剧**—— 多个用户在长会话中反馈侧边栏反复加载、UI 无响应、React 崩溃，渲染性能优化需求极为迫切
4. **transcript gate 零容错**—— 模型只要产生一次 JSON 格式非法的工具参数，会话即被硬中断且无法自愈，在长对话中尤其致命
5. **Windows 平台兼容性问题偏多**—— TUI 终端乱屏、侧边栏加载失败、工作区无法列出均集中在 Windows 平台

### 值得注意的社区信号

- 用户开始用第三方 Agent 尝试自动修复（#10669 中提到），但未能成功，说明问题修复门槛较高
- 用户已开始总结复现规律（#10648 精确到 message 989），为开发者提供了非常清晰的排查路径
- 社区对 AI/Agent 能力的期待从「聊天」走向「操作系统级操作 + 可见性」，Studio v2.19.0 的浏览器和 macOS 应用操作正好踩中了这个方向

---

*日报生成时间: 2026-09-24 ｜ 数据源: github.com/esengine/DeepSeek-Reasonix*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-09-24

## 今日速览

今日社区最核心的事件是 **Console 免费层访问限制错误**（#49433）持续发酵，累计 54 条评论，成为本周最高热度 Issue；同时，**安全修复 PR #50956（debug 配置脱敏）已合并关闭**，解决 API 密钥在共享终端中泄露的隐患；此外，**DeepSeek-V4.1-Flash 上游提示缓存频繁丢失**（#50258）导致约 50% 计费浪费，引发对成本优化与缓存策略的讨论。

## 版本发布

过去 24 小时内无新版本发布。最新版本仍为 v1.18.x 系列（最新提及为 1.18.31），OpenCode 2.0 相关讨论持续活跃。

## 社区热点 Issues

### 1. Console 免费层访问限制错误（持续高热）
- **#49433** — Error from provider (Console): OpenCode's free tier can only be used from within OpenCode
- 作者: @GooseOb | 评论: 54 | 👍: 15
- 该错误影响所有模型，即使用最新版 v1.3.17 仍复现，是当前社区最大的使用障碍。
- 链接: https://github.com/anomalyco/opencode/issues/49433

### 2. 同一错误在最新版本中依旧存在
- **#49678** — "Error from provider (Console)" in latest version of Open Code
- 作者: @alanbork | 评论: 9 | 👍: 1
- 用户在更新后问题依旧，且抱怨版本信息展示不规范（无 Help > About 入口）。
- 链接: https://github.com/anomalyco/opencode/issues/49678

### 3. DeepSeek-V4.1-Flash 提示缓存频繁丢失导致计费浪费
- **#50258** — [URGENT] Go: frank/DeepSeek-V4.1-Flash upstream repeatedly drops prompt cache
- 作者: @zhengkaics | 评论: 6 | 👍: 1
- 17 小时内约 50% 计费为不必要的完整上下文重读，直接推高使用成本，带有 URGENT 标签。
- 链接: https://github.com/anomalyco/opencode/issues/50258

### 4. debug config 明文输出 API 密钥（已修复）
- **#50915** — [FEATURE REQUEST]: Redact credential values in opencode debug config
- 作者: @EpiLogos | 评论: 5 | 👍: 0
- 安全审计发现 `opencode debug config` 在共享终端、录屏等场景下会明文暴露 provider API 密钥。已被 PR #50956 修复并关闭。
- 链接: https://github.com/anomalyco/opencode/issues/50915

### 5. Linux PRIMARY 选择（中键粘贴）支持
- **#43176** — [FEATURE]: Add support for Linux PRIMARY selection (middle-click paste)
- 作者: @bornmw | 评论: 5 | 👍: 1
- 当前 TUI 仅支持 CLIPBOARD，Linux 用户希望补齐 PRIMARY 选择，与系统桌面行为对齐。
- 链接: https://github.com/anomalyco/opencode/issues/43176

### 6. v2 serve 的 Basic Auth 凭据始终返回 401
- **#45856** — [2.0] v2 serve: configured Basic Auth credentials always return 401
- 作者: @subhoghoshX | 评论: 4 | 👍: 0
- 通过 `OPENCODE_SERVER_USERNAME/PASSWORD` 配置的固定凭据在浏览器中无限登录弹窗，影响 v2 serve 功能可用性。
- 链接: https://github.com/anomalyco/opencode/issues/45856

### 7. 代理进入 "Emitting" 死循环
- **#50634** — Let me do it. Emitting. Let me test. Emitting. LOOP
- 作者: @3v1n0 | 评论: 4 | 👍: 1
- 代理反复输出 "Emitting" 而不实际发出工具调用，最终靠提示词硬性打破循环，暴露工具调用稳定性问题。
- 链接: https://github.com/anomalyco/opencode/issues/50634

### 8. vcs.diff 在 Git 异常时误报 "no changes"
- **#50934** — vcs diff reports "no changes" when Git cannot read the repository
- 作者: @feiiiiii5 | 评论: 2
- `git.ts` 中 status/stats 忽略退出码，只读 stdout，导致 Git 不可读时静默返回无变更，影响代理决策。
- 链接: https://github.com/anomalyco/opencode/issues/50934

### 9. v1 会话迁移后不可见（project_id 错乱）
- **#50999** — migration: v1 sessions imported under project 'global' are invisible in project session lists
- 作者: @lmt3312 | 评论: 0
- v1→v2 迁移报告成功，但全部会话被归入 `project_id='global'`，导致按项目列表时不可见，v2 迁移完整性问题。
- 链接: https://github.com/anomalyco/opencode/issues/50999

### 10. V2 基础提示词缺少 question 工具引导
- **#50995** — agent: V2 base prompt has no question-tool guidance, so agents ask in prose
- 作者: @4Liberty | 评论: 0
- V1 提示词会指导模型使用 question 工具，而 V2 未提及，导致 Plan/Agent 用散文提问而非交互表单。
- 链接: https://github.com/anomalyco/opencode/issues/50995

## 重要 PR 进展

### 1. 自定义 provider 动态模型发现（大型特性）
- **#42660** — feat(provider): add dynamic model discovery for custom providers
- 作者: @Gr33ndev | 状态: OPEN
- 解决自定义 OpenAI 兼容 provider 需手动配置模型列表的痛点，一次关闭 6 个相关 Issue，是重要的生态扩展特性。
- 链接: https://github.com/anomalyco/opencode/pull/42660

### 2. debug config 凭证脱敏（安全修复，已合并）
- **#50956** — [contributor] fix(opencode): redact credentials in debug config
- 作者: @opencode-agent[bot] | 状态: CLOSED
- 对 `opencode debug config` 输出中的凭据字段、HTTP header 值及含凭据 URL 全部脱敏，保留其余配置，无解除开关。
- 链接: https://github.com/anomalyco/opencode/pull/50956

### 3. 简化插件设置错误（分离用户与诊断信息）
- **#50658** — [needs:issue, contributor] fix(core): simplify plugin setup errors
- 作者: @PanAchy | 状态: OPEN
- 将用户可见的插件设置错误与底层诊断详情分离，提升可排查性。对应 Issue #50653。
- 链接: https://github.com/anomalyco/opencode/pull/50658

### 4. 复合命令权限保存限定作用域
- **#50659** — [needs:issue, contributor] fix(core): scope compound permission saves
- 作者: @PanAchy | 状态: OPEN
- 修复复合命令（多条命令组合）权限保存时资源解析失败仍被持久化的问题，防止权限遗漏。对应 Issue #50649。
- 链接: https://github.com/anomalyco/opencode/pull/50659

### 5. MCP OAuth 跨进程刷新串行化
- **#50994** — fix(core): serialize MCP OAuth refreshes across processes
- 作者: @rekram1-node | 状态: OPEN
- 多个进程（后台服务、`opencode acp`、standalone）同时刷新 token 会导致 refresh token 轮换失效，此 PR 引入跨进程串行化。修复 #34520。
- 链接: https://github.com/anomalyco/opencode/pull/50994

### 6. 加泰罗尼亚语完整本地化（含 Console）
- **#50997** — [needs:issue] fix(i18n): correct and complete the Catalan (ca) locale, add Console ca
- 作者: @Qjammer | 状态: OPEN
- 母语者修复了加泰罗尼亚语的误译/漏译问题，并为 Console 补充 ca 语言支持。对应 Issue #42837。
- 链接: https://github.com/anomalyco/opencode/pull/50997

### 7. VS Code 原生 diff 用于编辑/写入权限审批
- **#44533** — feat: open VS Code native diff for edit/write permission approvals
- 作者: @iamseb4s | 状态: CLOSED（自动化清理）
- 在 VS Code 集成终端中运行时，编辑/写入审批直接唤起 VS Code 原生 diff 编辑器，显著改善审批体验。对应 Issue #9370。
- 链接: https://github.com/anomalyco/opencode/pull/44533

### 8. WSL 中通过 PATH 解析 opencode 可执行文件
- **#44514** — fix(desktop): resolve WSL OpenCode from PATH
- 作者: @zjm54321 | 状态: CLOSED（自动化清理）
- 原 WSL 设置只识别 `$HOME/.opencode/bin/opencode`，导致全局 npm、Nix 或 Home Manager 安装的不可见。修复 #38309。
- 链接: https://github.com/anomalyco/opencode/pull/44514

### 9. disabled_plugins 配置与插件管理命令
- **#44492** — feat(cli): add disabled_plugins config and plugin management commands
- 作者: @Lee-xin-hello | 状态: CLOSED（自动化清理）
- 支持 `disabled_plugins` 配置及插件禁用/启用管理命令，回应长期存在的插件治理需求。对应 Issue #7687。
- 链接: https://github.com/anomalyco/opencode/pull/44492

### 10. 支持 AgentRouter provider
- **#44378** — feat(core): support AgentRouter provider
- 作者: @kadyrkaragishiev | 状态: CLOSED（自动化清理）
- 为 AgentRouter 增加原生支持，替换被其拒绝的默认 AI SDK User-Agent，解决路由兼容问题。关闭 Issue #41873。
- 链接: https://github.com/anomalyco/opencode/pull/44378

## 功能需求趋势

- **安全与隐私**：debug/诊断输出中的密钥脱敏成为刚需（#50915）；代理感知凭据泄露风险（#50934 也涉及安全边界）。
- **自定义 Provider 生态**：动态模型发现（#42660）、自定义端点连接问题（#50990、#50992、#50993）、社区 provider 接入（#50998、#50976）显示用户对第三方模型服务接入有强烈需求。
- **开源模型与成本优化**：DeepSeek-V4.1-Flash 缓存丢失（#50258）暴露了缓存策略与计费透明度的重要性。
- **2.0 迁移体验**：v1 会话迁移不可见（#50999）、v2 基础提示词问题（#50995）、v2 serve 认证缺陷（#45856），说明 v2 的迁移路径与基础体验仍需打磨。
- **Linux 桌面集成**：PRIMARY 选择支持（#43176）持续被请求，Linux 用户期望 TUI 与系统剪贴板行为对齐。
- **插件编排与多 Agent**：后台 subagent、monitor、cron、worktree 隔离（#49842）的 fork 提案引发讨论，预示 Agent 工作流向更复杂编排演进。

## 开发者关注点

- **免费层策略混乱**：多个用户报告 "free tier can only be used from within OpenCode" 错误，影响面覆盖不同版本与模型，官方需要说明限制条件或修复误判。
- **工具调用稳定性**：代理陷入 "Emitting" 循环（#50634）说明工具调用链路的可靠性仍需加强；question 工具在 v2 中缺失引导（#50995）也属于同类问题。
- **成本透明度**：缓存丢失导致的 50% 额外计费（#50258）引发对计费明细和缓存命中率可视化的关注。
- **诊断与可观测性**：debug 输出泄露密钥（#50915）、vcs diff 静默失败（#50934）、版本号展示不规范（#49678），反映出诊断信息的安全性与准确性需系统性改进。
- **跨平台体验差异**：Linux 中键粘贴（#43176）与 WSL 安装路径解析（#44514、#44512）等细节持续被提出，桌面端和 CLI 的跨平台一致性仍需跟上。
- **自定义 Provider 接入门槛**：多位用户尝试连接自定义端点时报错（#50990～#50996），说明错误提示信息不够直观，且缺少必要的校验与指引。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 — 2026-09-24

## 今日速览

今日发布了 0.1.7 系列首个候选版本 `dsh-v0.1.7-rc.1`，主要汇总了 Web 终端、会话归档管理和 MCP 资源发现等多项功能改进。过去 24 小时内仓库没有新增或更新的 Issue 与 PR，社区讨论处于静默期，焦点集中在候选版本的验证与反馈收集。

## 版本发布

### dsh-v0.1.7-rc.1
[GitHub Releases](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.7-rc.1)

作为 0.1.7 系列的首个候选版本，本版本汇总了自 `v0.1.5-rc.3` 以来的主要用户和开发者相关变更，主要亮点如下：

- **Web 侧边栏终端**：新增多标签终端支持，可切换 Shell，且在页面刷新后恢复终端状态。由 @LegGasai 贡献。
- **管理会话归档**：支持置顶、筛选、恢复归档会话，并在归档运行中会话时提供受影响任务确认。由 @tianyicui、@Yifffan、@LegGasai 合作完成。
- **MCP 资源支持**：支持 MCP 资源的发现与读取，支持 URI 模板，为通过标准协议扩展资源访问能力奠定了基础。
- 发布说明中还提到“内置 P...”等功能，因说明文本截断，具体内容待完整 Release Notes 揭晓。

## 社区热点 Issues

**今日无新增或更新的 Issue（0 条），待展示。**  
建议关注仓库整体 [Issues 列表](https://github.com/deepseek-ai/deepseek-harness/issues) 以获取历史讨论。

## 重要 PR 进展

**今日无新增或更新的 PR（0 条），待展示。**  
建议关注仓库 [Pull Requests 列表](https://github.com/deepseek-ai/deepseek-harness/pulls) 以跟踪近期合并或进行中的 PR。

## 功能需求趋势

尽管今日没有新增 Issue，但结合 `v0.1.7-rc.1` 合并的功能，可以观察到社区关注的核心方向：

- **终端工具集成**：在 Web 界面中直接使用多标签终端，表明开发者在日常 workflow 中需要更强的内嵌命令行体验。
- **会话生命周期管理**：归档、置顶、筛选与恢复正成为 harness 类工具的基础能力，用户对长会话的治理与回溯需求明显。
- **MCP 标准化资源访问**：通过 MCP 支持资源发现和 URI 模板，说明社区正向开放协议和可扩展生态方向演进。

## 开发者关注点

- 本次 RC 的贡献者（@LegGasai、@tianyicui、@Yifffan）来自社区，侧面反映出 UI 交互与管理功能是当前外部开发者的重点投入方向。
- 候选版本通常处于功能冻结和缺陷反馈阶段，预计接下来数天会有针对终端、归档及 MCP 的测试反馈或新 Issue 出现。
- 由于今日无新增 Issue/PR，开发者反馈的“痛点”数据尚未更新；建议关注 Release 讨论区以获得更直接的使用反馈。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

## Hermes 社区动态日报（2026-09-24）

### 1. 今日速览
今日共有 50 个 PR 更新、2 个 Issue 关闭，无新版本发布。社区焦点集中在**会话状态一致性**与 **Windows 平台健壮性**：P0 级 PR #120521 修复了会话恢复/压缩时系统提示被意外改写的问题；多条 Windows 专项修复（GBK 编码、路径括号、npm shims）持续落地。功能需求向可观测性（Kanban 会话镜像、队列状态 API）和统一包管理演进。

### 2. 版本发布
过去 24 小时无新版本发布。

### 3. 社区热点 Issues
> 数据源中近 24 小时更新的 Issue 共 2 条，均已关闭；另附今日 PR 中引用/修复的高关注问题。

#### 已关闭 Issue（近 24 小时）
- **[#83851] Desktop `[gateway-crash]` — GBK encoding kills gateway on Chinese Windows** `[type/bug, comp/gateway, platform/wecom, P2]`  
  作者 @leungwoods | 评论 2 | 状态：已关闭  
  **为什么重要：** v0.20.0 升级后，Windows 中文环境（cp936/GBK）下网关进程启动即崩溃，直接影响中文用户桌面端正常使用。  
  **社区反应：** 修复后关闭，但反映 Windows 编码兼容性仍是高危回归点。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/83851

- **[#118742] Desktop-only host — inventory-less fleet_restart_pending marker never discharges; every later hermes update exits 1** `[type/bug, comp/cli, P2]`  
  作者 @jyaoushinganrikka | 评论 1 | 状态：已关闭  
  **为什么重要：** 仅安装桌面端（无网关服务）的主机因残留标记导致后续所有 `hermes update` 退出码 1，阻塞用户升级路径。  
  **社区反应：** 同类症状 #116614 再次出现，说明更新/安装状态清理逻辑覆盖不全。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/118742

#### 关联热点（由今日 PR 引出的高关注问题）
- **#116614** — 同类库存标记问题（#118742 引用），更新流程状态残留的典型代表。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/116614

- **#103941** — 插件需要执行级原始消息上下文，由 PR #105681 实现，体现插件系统对消息追溯能力的需求。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/103941

- **#116940** — 希望网关会话对运营人员可见，由 PR #120769 实现 Kanban 只读镜像。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/116940

- **#120439** — 压缩摘要携带指令污染后续上下文，由 PR #120772 修复，涉及会话安全。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/120439

- **#120629** — macOS launchd 强制安装后监督状态误判，由 PR #120767 修复。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/120629

- **#75262** — `/model --provider` 路由被别名干扰，由 PR #120295 修复，影响多端点配置用户。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/75262

- **#111461** — `hermes config show` 不展示全部 provider 凭据，由 PR #120770 替代实现。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/111461

- **群组房间 provider 错误上报问题** — 群聊中成员 provider 失败时错误回复误导，由 PR #120318 修复。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120318

### 4. 重要 PR 进展

- **[#120521] Resumed sessions and /compress no longer rewrite the system prompt when the repo changes mid-session** `[P0, comp/agent, area/sessions, area/compression]`  
  会话工作区快照（分支、git 状态、提交记录）在每次 prompt 重建时保持会话开始时的副本，修复 `/compress`、恢复会话、崩溃重启时的意外系统提示改写。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120521

- **[#120534] fix(state): a busy write lock no longer loses the message that hit a corrupt search index** `[P1, comp/agent, area/sessions]`（已关闭）  
  当另一进程持有 state.db 写锁且搜索索引损坏时，写入消息不再丢失。通过 fail-open 路径的 detach 逻辑修复。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120534

- **[#120677] fix(agent): block copied compression artifacts from effectful tool calls** `[P1, comp/agent, area/compression]`  
  阻止模型可见的压缩标记被复制进新的、可产生副作用的工具调用，避免压缩残留成为持久状态。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120677

- **[#120295] fix(model): /model --provider no longer loses to an alias on another endpoint** `[P2, comp/cli, area/config]`  
  `/model <id> --provider X` 现在确保落在指定 provider；别名仅在同端点时采用，修复跨端点路由错乱。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120295

- **[#120306] fix(tui-gateway): exiting mid-tool no longer orphans the foreground command's process tree** `[P2, comp/tui, tool/terminal]`  
  TUI/Desktop 在工具执行中退出（EOF/SIGTERM）时，前台命令进程树会随之终止，并以保存结果结束，避免 state.db 悬挂 tool_call。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120306

- **[#120318] fix(desktop): group room reports provider error instead of looping to round cap** `[P2, comp/agent, comp/gateway, comp/tui]`（已关闭）  
  群聊成员 provider 失败（401/拒绝/重试耗尽）时，正确报告具体错误而非用“未处理”占位并循环重试，1:1 聊天也移除类似误导信息。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120318

- **[#120307] Multiplexed profiles no longer inherit another profile's terminal env in cron jobs and turns** `[P2, comp/gateway, tool/terminal]`（已关闭）  
  同一主机托管多个 profile 时，各 profile 的 cron 任务和会话运行在独立终端环境与目录中，不再串用 `TERMINAL_CWD`、`.env` 和 shell 状态。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120307

- **[#120767] fix(gateway): wait for launchd supervision after forced install** `[P2, comp/cli, comp/gateway]`  
  修复 macOS 上 `hermes gateway install --force` 的竞态：等待 launchd 确认注册后再继续，消除 EIO 后的误报与错误卸载。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120767

- **[#120768] fix(windows): allow parentheses in workdirs; exclude Chromium debug dirs from backups** `[P2, comp/cli, tool/terminal, tool/browser]`  
  两项 Windows 健壮性修复：`terminal(workdir=...)` 允许 `C:\Program Files (x86)\...` 等路径；备份排除 Chromium 调试目录。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120768

- **[#120770] fix(cli): show configured provider credentials in config** `[P2, comp/cli, area/config]`  
  替代旧 PR #111461，适配统一 provider 架构：`hermes config show` 展示全部已配置的凭据字段，提升配置可见性。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/120770

### 5. 功能需求趋势

- **会话生命周期与上下文一致性**：工作区快照冻结（#120521）、压缩摘要指令隔离（#120772）、压缩标记防复制（#120677），表明社区对会话上下文可预测性的高度关注。
- **Windows 平台一等公民支持**：GBK 编码（#83851）、路径括号（#120768）、LSP npm shims（#120766）、Git 探测（#83382）、bash-eval 加固（#73782）——Windows 相关 PR 占比高，是当前投入最大的平台方向。
- **可观测性与运维**：Kanban 只读会话镜像（#120769）、队列深度公开 API（#28586）、配置凭据显示（#120770），社区希望获得更强的运行时可见性和调试能力。
- **安全与沙箱强化**：Docker 零能力沙箱（#104328）、敏感路径保护（#109609），在共享/暴露环境下运行 sandbox 的需求增长。
- **插件系统深化**：执行级原始消息上下文（#105681），插件需要更精确的触发源追溯，而非仅靠会话 ID。
- **统一包管理**：bundles & unified package manager（#102765），社区希望在工具安装、依赖准备、自包含打包和更新归属上获得一致体验。

### 6. 开发者关注点

- **Windows 环境兼容性是最集中的痛点**：从 GBK 编码崩溃到 PowerShell 重新引用、`.cmd` shim 执行、Program Files (x86) 路径拒绝，多个长期 PR（#73782、#109609）仍在推进，表明 Windows 适配战线较长。
- **更新/安装流程易残留状态**：`fleet_restart_pending` 标记（#118742、#116614）和 launchd 监督误判（#120767）阻塞后续升级，影响信任度。
- **会话恢复与压缩的“副作用”令人警惕**：系统提示被仓库变更重写（#120521）、压缩摘要带入指令（#120439）、压缩工件被复制为真实工具调用（#120677），这些问题若不修复将污染长期会话。
- **多 profile/多租户隔离不足**：profile 间终端环境串用（#120307）、群聊 provider 错误传播（#120318），说明隔离性和错误边界是当前短板。
- **配置与运行时可见性不足**：`hermes config show` 不展示全部凭据（#111461）、网关队列状态不可观测（#28586），运维和调试场景需要更多透明度。

:::
