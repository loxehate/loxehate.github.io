---
title: "AI CLI 工具社区动态日报"
published: 2026-10-22
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-22

> 生成时间: 2026-10-22 00:00 UTC | 覆盖工具: 8 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Deepseek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [OpenClaw](https://github.com/openclaw/openclaw)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态横向对比分析报告

**观察日期：2026-10-22**  
**数据口径：** 基于所提供日报中列出的重点 Issues、PRs 和 Releases；Issue/PR 数量代表本期摘要收录量，不等同于仓库全量活动。

---

## 1. 生态全景

当前 AI CLI 竞争正从“模型与工具调用能力”转向**可靠性、安全治理和长期运行稳定性**：会话数据完整性、跨平台一致性、权限可解释性、凭据隔离和任务可恢复性成为共同主题。与此同时，多代理编排、远程执行、MCP/OAuth 生态和 IDE/桌面端集成仍在快速扩张，但各工具的配置发现、状态管理和生命周期控制尚未完全统一。

安全边界明显前移，社区开始要求工具审批遵循 **fail closed**、项目环境变量不得覆盖全局密钥源、破坏性 Git/文件操作应被主动抑制。与此同时，OpenTelemetry、关键路径计时、Token/费用统计等可观测性能力快速进入主干。整体来看，主流工具已进入“工程化和可信化”阶段，而部分新兴项目仍处于高速功能扩张与稳定性补课并行的阶段。

---

## 2. 各工具活跃度对比

| 工具 | 今日重点 Issues | 今日重点 PRs | Release 情况 | 活跃度判断 |
|---|---:|---:|---|---|
| **Claude Code** | 10 | 1 | 2 个版本：`v2.1.306`、`v2.1.307` | Issue 热度高，PR 收录较少；重点转向安全遥测、Headless、会话数据完整性 |
| **OpenAI Codex** | 10 | 10 | 2 个 Rust Alpha：`rust-v0.164.0-alpha.9`、`rust-v0.163.0-alpha.11.1` | 工程活跃度高，集中于桌面端、Windows、企业 OAuth、代理和可观测性 |
| **Gemini CLI** | 10 | 10 | 1 个 Nightly：`v0.67.0-nightly.20261021.gd00859d6b` | 高频快速迭代，PR 覆盖取消语义、沙箱、ACP、IDE 和工具治理 |
| **DeepSeek Reasonix** | 10 | 10 | 3 个版本：Studio `v2.47.1/v2.47.0`、稳定版 `v1.39.10` | 功能扩展与稳定性修复并进，Windows、并发、远程端问题较集中 |
| **OpenCode** | 10 | 10 | 无新版本 | PR 围绕模型可用性、迁移安全、MCP 管理和桌面端体验，V2 处于整合期 |
| **DeepSeek Harness** | 0 | 0 | 无 | 本期无明显社区活动 |
| **Hermes Agent** | 10 | 10 | 2 个版本：`v0.22.3`、`v0.22.4` | 社区规模与议题密度高，Gateway、多 Profile、审批安全和插件生态快速演进 |
| **OpenClaw** | 10 | 10，仓库当日约 50 个 PR 更新 | 1 个 Beta：`v2026.10.10-beta.3` | 活跃度最高之一，更新、会话恢复、安全配置和大型架构重构并行 |
| **合计** | **70** | **72** | **13 个版本/预发布版本** | 整体处于高强度工程迭代期 |

> 注：Hermes `v0.22.3` 汇总了约 620 个历史 PR，不计入上表的当日重点 PR 数。

---

## 3. 共同关注的功能方向

### 3.1 会话完整性与可恢复性

多个工具都暴露了会话数据或恢复链路问题：

- **Claude Code**：文本块被静默丢弃，Transcript JSONL 不完整；Desktop 更新后 Session 不恢复。
- **OpenCode**：V1→V2 迁移会丢弃旧消息，64 个会话可能变成空历史。
- **Reasonix**：历史索引损坏、跨进程索引误判删除，多会话并行出现卡死。
- **OpenClaw**：崩溃恢复后接口持续返回 `UNAVAILABLE`，中断会话后新消息被静默拒绝。
- **Hermes**：Gateway Profile 所有权锁未验证，可能进入 stale epoch 状态。

**共同诉求：** 迁移和异常恢复必须具备事务性、备份、校验、告警及可重试能力，不能以空会话、错误成功状态或静默丢消息作为失败结果。

### 3.2 权限、安全审批与配置隔离

- **Claude Code** 新增 `claude_code.safety_event`，用于追踪权限规则、安全检查、Hook 和沙箱造成的工具调用拦截。
- **Gemini CLI** 修复只读文件、硬链接、Shell 信任范围，并抑制 `git reset`、强制覆盖等破坏性行为。
- **Hermes** 的智能审批自动放行 `osascript`，导致未保存 PPT 被关闭并丢失；社区要求异常审批结果必须 fail closed。
- **OpenClaw** 暴露项目 `.env` 覆盖 Vault、1Password 配置，以及凭据被写入错误渠道的问题。
- **Codex** 的站点授权、聊天级拒绝和审批模式存在状态冲突。

**共同诉求：** 权限来源必须可解释、优先级必须确定、敏感配置必须建立明确信任边界；高风险或不可逆操作不应由模糊启发式规则自动放行。

### 3.3 跨平台与桌面端可靠性

- **Claude Code**：Linux CRLF、沙箱虚假文件、Windows/macOS 更新中断任务、Remote Control 无法重连。
- **Codex**：Windows OAuth、代理、Git Bash 沙箱、并发会话路由，以及 macOS 新会话无法发送消息。
- **Gemini CLI**：Wayland 浏览器代理失败，Rootless Podman/Android Termux 兼容问题。
- **Reasonix**：Windows Studio 打开会话后闪退。
- **OpenClaw**：Windows、Linux、macOS 全局更新及 clean-check 连续失败。

**共同诉求：** “Windows 可用”已从加分项变成生产门槛；更新不能破坏活跃任务，IDE、浏览器和远程控制组件需要具备一致的跨平台生命周期。

### 3.4 多代理编排与状态可观测性

- **Gemini CLI**：子代理达到 `MAX_TURNS` 后仍报告成功，Generalist Agent 无限挂起。
- **Reasonix**：多会话写入冲突、乐观模式锁不清晰、任务完成语义错误。
- **OpenCode**：TUI 不再显示子代理名称和模型，多代理执行链路不透明。
- **Hermes**：Gateway 多 Profile 路由、Steer 投递失败、A2A 长任务只能同步等待。
- **Claude Code**：云端入口无法统一加载仓库级 Skills。

**共同诉求：** 多代理系统必须明确区分完成、失败、暂停、等待确认、轮次耗尽和取消，并展示实际 Agent、模型、工具、权限及上下文来源。

### 3.5 上下文、Token 与工具数量治理

- **Claude Code**：大量 MCP 工具时错误被误报为 `prompt is too long`；Headless 配额消耗约为交互模式的 1.8 倍。
- **Codex**：保留推理内容被重复计入 Token，可能触发不必要的提前压缩。
- **Gemini CLI**：工具超过约 400 个时触发 HTTP 400，大型工具输出可突破模型上下文上限。
- **Hermes**：新增 Token、缓存、推理量和估算费用指标。
- **OpenClaw**：搜索结果数和超时配置未在多个 Provider 中生效。

**共同诉求：** 工具需要按任务动态裁剪，输出需要分层截断；Token、缓存和费用统计必须与真实模型消耗一致。

### 3.6 企业认证、MCP 与远程执行

- **Codex** 集中增强机密 OAuth 客户端、Windows NTLM/Negotiate 代理、远程执行凭据刷新。
- **OpenClaw** 持续处理 OAuth 刷新、配置脱敏和托管 Runtime 版本兼容。
- **OpenCode** 改进 MCP 失败服务的禁用、恢复和持久化。
- **Hermes** 推进统一 Gateway、多 Profile 路由以及 A2A 异步任务协议。
- **Reasonix** 修复 HTTP 远端会话、Runtime 路由和移动端状态同步。

**共同诉求：** 企业环境需要可轮换凭据、可撤销授权、代理兼容、远程设备授权和异步任务 ID，而不是依赖长连接同步等待。

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 主要技术路线 |
|---|---|---|---|
| **Claude Code** | 终端优先的编码代理、Claude API 深度集成、安全与 Hook 生态 | 开发者、平台团队、企业自动化用户 | CLI + MCP + Hook + OpenTelemetry；强调权限规则、API 版本和会话审计 |
| **OpenAI Codex** | 桌面端、CLI、Web、IDE 多入口统一编码工作流 | 广泛开发者、OpenAI 生态及企业开发团队 | Rust 核心、app-server、多客户端协议、企业 OAuth/代理和关键路径观测 |
| **Gemini CLI** | Google 生态集成、子代理、ACP、IDE/容器沙箱 | 尝鲜型开发者、Agent 编排用户、Google Cloud 用户 | Node/TypeScript 工具链、子代理、ACP、容器 IDE Companion、动态配置体系 |
| **DeepSeek Reasonix** | Studio 工作台、远程控制、文件预览、定时运行、多模型 Provider | 重视桌面工作台、远程使用和成本统计的个人或团队 | Go 客户端/服务端、HTTP 远程会话、Gateway/Provider 抽象、工作台交付 |
| **OpenCode** | 轻量、Provider 开放、CLI/TUI/桌面多端体验 | 多模型用户、Copilot 用户、偏好高度可配置工作流的开发者 | Provider 适配层、V2 会话模型、模型目录与路由、可插拔 MCP |
| **DeepSeek Harness** | 当前信息不足，偏向 Harness/模型执行层 | 开发者与研究者 | 本期无足够动态支持进一步判断 |
| **Hermes Agent** | Gateway 统一运行时、多 Profile、插件、消息渠道和跨机器协作 | 高级自动化用户、远程部署者、多渠道 Agent 运营者 | Gateway/Profile 架构、插件钩子、A2A、适配器与多前端 |
| **OpenClaw** | 自托管个人 Agent、渠道接入、自动化、Web UI 和运行时生态 | 自托管用户、插件与渠道开发者、服务器部署者 | Gateway/Session Controller、Automations、Web UI、扩展适配器和配置系统 |

### 定位差异总结

- **Claude Code** 的差异化在于 Claude API 原生能力、精细权限和可审计性。
- **Codex** 更像多端 AI 开发操作系统，优势在桌面、Web、CLI、IDE 的统一执行和企业基础设施。
- **Gemini CLI** 更强调多代理、ACP 和 IDE/容器集成，但当前成熟度仍低于其功能扩张速度。
- **Reasonix** 的特色是 Studio 工作台、远程移动端、文件交付和 Provider 兼容性。
- **OpenCode** 以开放模型、配置自由度和轻量交互见长，但 V2 迁移与模型目录刷新暴露了整合债务。
- **Hermes** 的 Gateway、多 Profile、插件和跨渠道能力丰富，安全隔离及生命周期管理是主要挑战。
- **OpenClaw** 社区规模和工程吞吐很高，功能覆盖广，但大型重构、配置信任边界和升级可靠性需要重点治理。

---

## 5. 社区热度与成熟度

### 社区热度较高

1. **Hermes Agent**
   - Issue 编号已超过 14 万，核心统一 Gateway Issue 获得 **212 条评论**。
   - 单日发布两个版本，PR 聚焦安全、协议兼容和观测能力。
   - 属于大型、高频、多入口社区。

2. **OpenClaw**
   - Issue 编号超过 18 万，过去 24 小时约 **50 个 PR 更新**。
   - 更新链路、会话恢复、安全配置和自动化架构同时推进。
   - 社区活跃度和工程吞吐量领先，但大型重构带来的兼容性风险较高。

3. **Claude Code**
   - 文本块静默丢弃 Issue 获 **34 条评论、28 个赞**；Linux CRLF Issue 获 **53 条评论、39 个赞**。
   - 用户基础大，生产场景覆盖广；当前主要矛盾是跨平台和会话可靠性。
   - 版本发布与社区反馈已形成较成熟闭环。

4. **OpenAI Codex**
   - macOS 首条消息故障获 **61 条评论、130 个赞**，为所有项目中最突出的单日热度之一。
   - PR 数量高，覆盖面广，工程成熟度较高；但 Windows 和桌面端回归问题集中。

### 快速迭代阶段

- **Gemini CLI**：10 个重点 PR 同时覆盖取消、权限、沙箱、ACP、IDE、Podman 和模型注册，功能推进快，但子代理状态、配置继承和工具膨胀仍是早期问题。
- **DeepSeek Reasonix**：三个版本同时发布，功能覆盖定时任务、文件预览、远程控制和安全沙箱；Windows 稳定性、历史索引和并发写入说明生产成熟度仍在提升。
- **OpenCode**：PR 活跃且围绕 V2 完善，但模型发现、V1→V2 迁移和子代理可观测性仍有明显整合债务。

### 相对沉寂

- **DeepSeek Harness**：过去 24 小时无发布、Issue 或 PR 活动，当前无法与上述主流工具形成同等的社区势能。

### 成熟度判断

- **相对成熟**：Claude Code、OpenAI Codex、Hermes、OpenClaw。
- **成熟但快速演进**：OpenCode、Gemini CLI、DeepSeek Reasonix。
- **信息不足**：DeepSeek Harness。

这里的“成熟”仅指社区规模和工程反馈机制，并不能等同于所有功能已经稳定。

---

## 6. 值得关注的趋势信号

### 6.1 “Agent 自主性”正在让位于“受控自主性”

社区不再单纯追求更高工具权限，而是要求：

- 危险操作分级和默认抑制；
- 审批异常时 fail closed；
- 取消后不得继续产生副作用；
- 权限来源、拒绝记录和审批模式必须一致。

**参考价值：** 构建 Coding Agent 时，应将权限系统、审批状态机和执行状态机作为一个整体设计，而不是独立实现若干弹窗或规则。

### 6.2 数据完整性将成为企业采购的硬指标

会话消息静默丢失、迁移生成空历史、Transcript 不完整、工具输出截断等问题，直接影响审计、恢复和责任追踪。

**参考价值：** 应优先建设消息不可变日志、迁移校验、版本化格式、备份恢复和端到端一致性测试。静默降级比明确失败更危险。

### 6.3 上下文管理正从“提示词技巧”转向系统级能力

动态工具裁剪、AST 检索、推理 Token 去重、输出截断、记忆压缩和任务级 Token 预算正在成为基础设施。

**参考价值：** 开发者应将工具数量、输出长度、检索精度和缓存命中纳入架构设计，避免单纯扩大上下文窗口。

### 6.4 Windows 和跨平台一致性成为竞争分水岭

Claude Code、Codex、Reasonix、OpenClaw 的高优先级问题均大量集中于 Windows；同时，Linux、Wayland、Podman、ARM64 和代理环境也存在兼容问题。

**参考价值：** 产品团队应建立系统化兼容矩阵，至少覆盖升级、Shell、沙箱、OAuth、代理、IDE 重连、浏览器和后台进程回收。

### 6.5 可观测性从日志走向 Agent 执行链

Claude Code 的安全事件、Codex 的直接工具调用关键路径、Hermes 的 Token/费用指标、OpenClaw 的配置脱敏，均表明行业正在补齐传统应用监控无法覆盖的动态 Agent 行为。

**参考价值：** 建议统一采集工具调用、审批结果、取消事件、重试、上下文压缩、Token、缓存及会话状态转换，而不只是记录最终响应。

### 6.6 Gateway 与远程 Agent 将成为下一阶段竞争焦点

Hermes 的统一 Gateway、OpenClaw 的 Session Controller、Codex 的远程执行凭据刷新和 Reasonix 的 HTTP 远程会话都指向同一趋势。

**参考价值：** 远程执行的核心难点已不是“能否连接”，而是设备授权、凭据轮换、Profile 隔离、任务 ID、故障恢复和移动端状态同步。

### 6.7 大型功能扩展必须配套回归评测

OpenCode 已开始共享真实工具调用失败数据集；其他工具的版本回归也显示，单靠手工测试已不足以覆盖桌面端、多平台和多入口场景。

**参考价值：** 应建立公开或内部故障数据集，并将数据丢失、取消竞态、权限冲突、更新中断和工具输出截断纳入持续回归测试。

---

## 结论

当前 AI CLI 生态已进入从“能力竞赛”向“可信工程”迁移的阶段。Claude Code 和 Codex 的优势体现在成熟客户端、企业基础设施与可观测性；Gemini CLI 聚焦多代理和 IDE/容器生态；Reasonix 强调工作台与远程体验；OpenCode 突出开放 Provider 和可配置性；Hermes 与 OpenClaw 则在 Gateway、插件和多渠道自动化方面规模突出。

对技术决策者而言，当前选型不应只看模型效果和工具数量，还应重点评估：**会话数据是否可靠、权限边界是否明确、取消与恢复是否可信、跨平台是否稳定，以及工具链能否提供完整的执行审计。**

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据截止：2026-10-22。热门 PR 列表未提供有效评论数，以下依据 PR 排序、近期活跃度、影响范围及 Issue 关联度综合判断。当前展示的热门 PR 均为 **Open** 状态。

## 1. 热门 Skills 排行

### 1. `skill-creator`：Skill 创建、评测与质量控制
- **功能**：辅助创建、验证、优化 Skills，并提供触发评测、结果审阅和打包能力。
- **社区热点**：
  - 触发评测可能误报，导致优化结果失真。
  - Windows 兼容性、运行时异常和子进程竞争问题。
  - Eval Viewer 存在脚本注入、DNS rebinding、跨站 POST 和 HTML 转义等安全问题。
  - YAML frontmatter 解析不准确。
  - 社区同时在推动 `skill-creator` 从“开发者文档”转向更可执行、低 token 的操作型 Skill。
- **当前状态**：Open；相关修复 PR [#1298](https://github.com/anthropics/skills/pull/1298)、[#1961](https://github.com/anthropics/skills/pull/1961)、[#1997](https://github.com/anthropics/skills/pull/1997)、[#1681](https://github.com/anthropics/skills/pull/1681)。
- **相关需求**：[run_eval.py 无法触发 Skill](https://github.com/anthropics/skills/issues/556)、[eval-viewer 展示路径 XSS](https://github.com/anthropics/skills/issues/1394)。

### 2. `mcp-builder`：构建与调试 MCP 服务
- **功能**：帮助 Claude Code 创建、连接和排查 MCP Server。
- **社区热点**：
  - MCP 2.x API 升级兼容性，包括 `streamable_http_client` 重命名。
  - 自定义 HTTP Header 的配置方式发生变化。
  - 反映 MCP 生态快速迭代时，官方 Skill 的 SDK 兼容维护压力较大。
- **当前状态**：Open，PR [#1742](https://github.com/anthropics/skills/pull/1742) 修复 MCP 2.x 导入及自定义 Header 支持。

### 3. `webapp-testing`：Web 应用自动化测试
- **功能**：启动本地 Web 服务、发现页面元素并执行端到端测试。
- **社区热点**：
  - `shell=True` 导致命令注入风险。
  - `textarea` 和 `select` 元素识别错误。
  - 重点从“测试能力”转向“测试工具自身的安全性、可靠性和可验证性”。
- **当前状态**：Open；安全修复 [#1980](https://github.com/anthropics/skills/pull/1980)，元素发现修复 [#1976](https://github.com/anthropics/skills/pull/1976)。

### 4. `docx`：Word 文档生成、编辑与验收
- **功能**：创建和修改 DOCX，处理修订、合并文本运行及 LibreOffice 转换。
- **社区热点**：
  - LibreOffice 超时却被误报为成功。
  - 输出文件仍包含修订标记。
  - XML namespace 丢失可能导致无效 DOCX，且工具仍报告成功。
  - 社区期待“结果验收”而非仅执行命令后宣称完成。
- **当前状态**：Open；超时与修订检查修复 [#1792](https://github.com/anthropics/skills/pull/1792)，相关缺陷 Issue [#2018](https://github.com/anthropics/skills/issues/2018)。

### 5. `claude-api`：Claude API 开发与教学
- **功能**：提供 Claude API、工具调用、Academy 指南及相关开发知识。
- **社区热点**：
  - Skill 被加载时可能一次性注入约 156K tokens，挤占上下文窗口。
  - 文档链接失效，影响学习和开发流程。
  - 核心诉求是按需加载参考资料，避免“知识注入过大”。
- **当前状态**：Open；失效链接修复 PR [#1730](https://github.com/anthropics/skills/pull/1730)，上下文膨胀 Issue [#1487](https://github.com/anthropics/skills/issues/1487)。

### 6. `algorithmic-art`：程序化艺术与图像生成
- **功能**：生成算法化图像、渐变背景及可复用视觉模式。
- **社区热点**：
  - `wrapAround()` 边界处理错误，无法正确覆盖负数和越界值。
  - `create_gradient_background()` 不会产生预期的 `bottom_color`。
  - 社区在关注视觉算法细节是否与文档承诺一致。
- **当前状态**：Open；环绕修复 [#1977](https://github.com/anthropics/skills/pull/1977)，渐变缺陷 Issue [#1868](https://github.com/anthropics/skills/issues/1868)。

### 7. `document-typography`：文档排版质量控制
- **功能**：检查 AI 生成文档中的孤行、寡行、标题悬挂和编号错位等排版问题。
- **社区热点**：
  - 文档“能生成”之后，排版精细化成为新的质量需求。
  - 与 `docx`、PDF 等文档 Skill 形成互补：前者负责编辑，后者负责视觉和排版验收。
- **当前状态**：Open，PR [#514](https://github.com/anthropics/skills/pull/514)。

### 8. `notion-spec-to-implementation` / `quantitative-resume-auditor`
- **功能**：
  - 将 Notion 中的产品或技术规格拆解为可执行任务、验收标准和进度计划。
  - 对简历进行结构化、量化审查。
- **社区热点**：
  - 从通用内容生成转向端到端工作流。
  - 强调“规格 → 任务 → 实现 → 验收”的可追踪链路。
  - 简历审查体现垂直领域 Skill 正在从演示型工具走向专业规则引擎。
- **当前状态**：Open，PR [#1245](https://github.com/anthropics/skills/pull/1245)。

---

## 2. 社区需求趋势

### 工作流自动化
- 用户希望 Skill 不只是回答问题，而是串联多个阶段：
  - 读取规格文档；
  - 生成实施计划和任务；
  - 分配或跟踪进度；
  - 验证交付结果。
- 代表需求：[Notion 规格到实现](https://github.com/anthropics/skills/pull/1245)、[Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385)。

### 组织级共享与协作
- 当前依赖下载 `.skill` 文件并通过 Slack、Teams 手工传播。
- 社区期待统一组织 Skill 库、直接分享链接、集中更新和权限治理。
- 代表需求：[Enable org-wide skill sharing](https://github.com/anthropics/skills/issues/228)。

### Skill 评测、触发可靠性与质量门禁
- 社区需要可靠的触发评测、跨平台稳定性、运行时异常识别和交付前验证。
- 具体诉求包括：
  - 解决 `run_eval.py` 0% 触发率：[Issue #556](https://github.com/anthropics/skills/issues/556)。
  - 预任务校准、对抗式审查、交付验证：[Issue #1385](https://github.com/anthropics/skills/issues/1385)。
  - 改进 `skill-creator` 的可执行性和 token 效率：[Issue #202](https://github.com/anthropics/skills/issues/202)。

### 安全、信任与来源治理
- 社区 Skills 若使用 `anthropic/` 命名空间，可能被误认为官方能力，形成信任边界滥用。
- 需求重点包括官方来源标识、安装前风险提示、权限审查、脚本注入防护和审计记录。
- 代表需求：[社区 Skill 冒用官方命名空间](https://github.com/anthropics/skills/issues/492)、[Agent Governance](https://github.com/anthropics/skills/issues/412)。

### 上下文与长期记忆管理
- 用户关注长期 Agent 的上下文膨胀、符号化状态表示和持久记忆。
- 社区希望将冗长散文式笔记转为紧凑、可检索、可更新的状态结构。
- 代表需求：[compact-memory](https://github.com/anthropics/skills/issues/1329)、[`claude-api` 上下文膨胀](https://github.com/anthropics/skills/issues/1487)。

### 垂直领域与专业审查
- 社区开始关注智能合约审计、简历量化审查、HPC 集群运维、复古游戏开发等垂直场景。
- 这些 Skill 的共同特点是依赖领域规则、工具链和可验证产物，而不只是通用提示词。
- 代表 PR：[proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771)、[scnet-hpc](https://github.com/anthropics/skills/pull/1615)、[pyxel](https://github.com/anthropics/skills/pull/525)。

---

## 3. 高潜力待合并 Skills

以下 PR 尚未合并，但与活跃 Issue 关联紧密，具备较高的近期落地潜力：

1. **MCP 2.x 兼容修复**  
   直接解决 SDK 升级导致的导入失败和 Header 配置错误，影响 MCP Builder 的基本可用性。  
   [#1742](https://github.com/anthropics/skills/pull/1742)

2. **Skill 触发评测稳定性修复**  
   隔离评测任务、修复 Windows 子进程选择和运行时失败分类，关联高频 Issue #556。  
   [#1298](https://github.com/anthropics/skills/pull/1298) · [Issue #556](https://github.com/anthropics/skills/issues/556)

3. **Eval Viewer 安全加固**  
   覆盖脚本逃逸、DNS rebinding、跨站 POST 和输出转义，直接回应社区对不可信模型输出和本地反馈服务器安全性的担忧。  
   [#1961](https://github.com/anthropics/skills/pull/1961) · [Issue #1394](https://github.com/anthropics/skills/issues/1394)

4. **DOCX 验收逻辑修复**  
   将“命令成功”与“产物正确”区分开，验证 LibreOffice 输出及修订标记，能显著降低静默失败。  
   [#1792](https://github.com/anthropics/skills/pull/1792) · [Issue #2018](https://github.com/anthropics/skills/issues/2018)

5. **Web 测试命令注入修复**  
   移除不安全的 `shell=True`，是 Web 测试 Skill 获得更广泛信任的必要条件。  
   [#1980](https://github.com/anthropics/skills/pull/1980)

6. **Notion 规格到实施工作流**  
   将文档型规格转成带验收标准的可执行任务，契合社区从“单点 Skill”向“端到端工作流”演进的趋势。  
   [#1245](https://github.com/anthropics/skills/pull/1245)

7. **文档排版质量控制 Skill**  
   补齐 AI 文档在孤行、寡行和编号对齐方面的质量控制，可与现有 DOCX/PDF Skills 组合使用。  
   [#514](https://github.com/anthropics/skills/pull/514)

---

## 4. Skills 生态洞察

**社区当前最集中的诉求，是让 Skills 从“能生成内容”升级为“安全、可触发、可验证、可协作的端到端工作流”，同时建立清晰的官方来源、权限和信任边界。**

---

# Claude Code 社区动态日报｜2026-10-22

## 1. 今日速览

过去 24 小时发布 Claude Code **v2.1.306** 与 **v2.1.307**：重点更新包括 Claude API 版本切换、工具调用安全事件遥测，以及无头模式登录、上下文压缩误判等修复。  
社区讨论主要集中在 **会话数据丢失、Linux 沙箱行为异常、Desktop/Remote Control 稳定性、Headless 配额消耗**等问题；其中一项文本块被静默丢弃的 Issue 获得 34 条评论和 28 个赞，值得优先关注。

## 2. 版本发布

### v2.1.307

- 新增 `/claude-api api-version`，可将 Claude API 调用迁移至 API 版本 `2026-10-21`。
- 新增 OpenTelemetry 事件 `claude_code.safety_event`：
  - 当工具调用被权限规则、自动模式、安全检查、Hook 或沙箱阻止、拦截或退回时触发。
  - 可用于审计工具调用被拦截的原因及执行链路。
- 官方更新说明中另有请求相关修复，但提供的数据未完整展示其具体内容。

### v2.1.306

- 修复在 Cloud Session 内启动 `claude -p` 时，若未继承 Session 环境变量，会错误提示 **“Not logged in”**。
- 修复加载大量 MCP 工具时，真实 API 错误可能被误报为 **“prompt is too long”**、并触发不必要的上下文压缩的问题。

## 3. 社区热点 Issues

> 以下 Issue 均是在过去 24 小时内获得更新，并非全部于今日创建；社区反应以评论数和点赞数衡量。

1. **Assistant 文本块在后续 thinking 块出现时被静默丢弃**  
   在自适应思考模式下，一轮响应中的 `text` 块后紧跟 thinking 块时，文本可能既不显示，也不会写入 Transcript JSONL，涉及 TUI 和桥接子会话。该问题直接影响输出完整性、审计和历史记录可信度，且被标记为 `data-loss`，是本期最高优先级讨论项。  
   社区反应：34 条评论、28 个赞  
   [GitHub #74260](https://github.com/anthropics/claude-code/issues/74260)

2. **Linux 上持续生成 CRLF 换行文件**  
   即使在 Ubuntu/Linux 环境中，并通过 `CLAUDE.md` 明确要求使用 Unix 换行，Claude Code 仍可能为 Shell 脚本和文本文件写入 CRLF，导致脚本出现 `No such file or directory`。该问题影响跨平台仓库规范、CI 执行和自动生成文件的可用性。  
   社区反应：53 条评论、39 个赞，为本期评论最多的 Issue  
   [GitHub #2805](https://github.com/anthropics/claude-code/issues/2805)

3. **归档后的 Claude Cowork 会话无法找到**  
   用户归档 Claude Cowork 聊天后，会话似乎从可用列表中消失。该问题涉及会话生命周期、归档检索及数据可发现性，对长期使用 Cowork 管理任务的用户影响明显。  
   社区反应：43 条评论、38 个赞  
   [GitHub #22931](https://github.com/anthropics/claude-code/issues/22931)

4. **Headless `claude -p` 的五小时窗口消耗约为交互模式的 1.8 倍**  
   在相同工作负载下，`sdk-cli` 入口的 Headless 模式每 Token 消耗的五小时窗口额度明显高于交互式 `cli`。这可能造成自动化任务更快触发限额，对 CI/CD、批量代理和 SDK 集成尤其重要。  
   社区反应：10 条评论、5 个赞  
   [GitHub #97074](https://github.com/anthropics/claude-code/issues/97074)

5. **Linux 沙箱为受保护路径显示虚假文件**  
   沙箱通过 `/dev/null` 挂载受保护配置路径；即便路径原本不存在，Agent 仍可能在沙箱内看到“文件”，进而导致 `git add .` 收集不存在或错误条目。这类“虚拟文件系统与真实状态不一致”可能误导 Agent 执行修改和提交操作。  
   社区反应：3 条评论；问题有明确复现  
   [GitHub #103823](https://github.com/anthropics/claude-code/issues/103823)

6. **Cloud Routine 和 Project Thread 未加载仓库中的 `.claude/skills/`**  
   私有 GitHub 仓库中，Cloud Routine 与 Project Thread 可以加载仓库提交的 `.claude/settings.json` 和 Hooks，却无法加载同一仓库的 `.claude/skills/`。这表明不同云端执行入口的仓库级配置发现机制可能不一致。  
   社区反应：4 条评论；问题有明确复现  
   [GitHub #103851](https://github.com/anthropics/claude-code/issues/103851)

7. **后台守护进程未回收失效 Worker，长期累积进程和内存**  
   macOS 后台 Daemon 不会清理失效 Worker 或未占用的备用 Worker，重启后还会再次接管这些进程；用户报告运行六周后积累 64 个进程、占用约 7.1 GB。该问题反映 Agent 生命周期管理和资源回收机制存在长期运行风险。  
   社区反应：4 条评论、6 个赞  
   [GitHub #87891](https://github.com/anthropics/claude-code/issues/87891)

8. **Windows Desktop 自动更新会强制终止活跃的 Code Session**  
   MSIX 自动更新可能直接关闭 Claude Desktop，导致正在运行的 Code Tab 和 Remote Control 被终止；重新启动后也未必恢复原会话。问题约每两天出现一次，频繁影响 Windows 桌面端开发任务。  
   社区反应：2 条评论、1 个赞  
   [GitHub #100576](https://github.com/anthropics/claude-code/issues/100576)

9. **macOS Remote Control 在自动更新重启后未重新连接现有 Code Session**  
   桌面端静默更新并重启后，Remote Control 不会重新附着到原有 Code Session，用户需要重新建立远程连接。该问题与 Windows 更新终止问题共同指向桌面端升级期间的会话连续性不足。  
   社区反应：2 条评论、1 个赞  
   [GitHub #100694](https://github.com/anthropics/claude-code/issues/100694)

10. **Windows Desktop 在 Agent 工作期间占满一个 CPU 核心**  
    Electron 主进程在 Agent 执行期间持续占用完整 CPU 核心，导致整个桌面应用明显卡顿；用户称在两个不同版本中均可复现。性能问题直接影响交互体验，也可能提高本地资源消耗。  
    社区反应：目前评论和点赞较少，但问题有明确复现  
    [GitHub #93121](https://github.com/anthropics/claude-code/issues/93121)

## 4. 重要 PR 进展

过去 24 小时仅检索到 **1 条更新的 PR**，因此不虚构其余 9 条。

### Hookify：新增 Glob 匹配与大小写敏感控制

- 为 Hookify 规则增加 `glob_match` 支持，可直接使用类似 `*.py` 的 Glob 模式。
- 新增 `case_sensitive` 选项，允许按需启用大小写敏感匹配。
- 目标是在简单文件路径匹配场景中降低正则表达式的复杂度，提升规则的可读性与可维护性。
- 该能力可为“按文件类型触发 Hook”“按路径范围执行规则”等自动化场景提供更轻量的配置方式。
- 当前 PR 仍处于开放状态，尚未看到明确评论反馈。

[GitHub PR #21459](https://github.com/anthropics/claude-code/pull/21459)

## 5. 功能需求趋势

### 5.1 桌面端与远程控制体验

- SSH 远程 Session 中使用应用内 Browser。
- Remote Control 在更新、重启和会话空闲后自动恢复连接。
- 更稳定的会话归档、查找及跨设备访问能力。
- 桌面端 Agent 任务期间降低 CPU 占用。
- 读屏功能支持“只朗读最终答案”，减少中间工具调用说明的干扰。

相关链接：

- [Desktop SSH 内置浏览器 #97729](https://github.com/anthropics/claude-code/issues/97729)
- [macOS 更新后恢复 Remote Control #100694](https://github.com/anthropics/claude-code/issues/100694)
- [macOS/iOS 会话空闲后 Remote Control 丢失 #103872](https://github.com/anthropics/claude-code/issues/103872)
- [Windows 桌面端 CPU 占用 #93121](https://github.com/anthropics/claude-code/issues/93121)
- [桌面端仅朗读最终答案 #98977](https://github.com/anthropics/claude-code/issues/98977)

### 5.2 云端 Agent 与仓库级扩展

社区希望 Cloud Routine、Project Thread、Web/Cowork 等入口完整支持仓库提交的能力配置，尤其包括：

- `.claude/skills/`
- `.claude/settings.json`
- Hooks
- Skills 与项目级 Agent 定义

[GitHub #103851](https://github.com/anthropics/claude-code/issues/103851)

### 5.3 Hook 与规则配置的易用性

- Hookify 倾向使用更易读的 Glob 规则，而非复杂正则。
- 规则需要支持大小写敏感控制。
- Subagent 与命名 Agent 的 `tools:` 限制应保持一致，不能在不同调度路径上静默失效。

相关链接：

- [Hookify Glob 匹配 PR #21459](https://github.com/anthropics/claude-code/pull/21459)
- [命名 Agent 忽略 tools 限制 #81852](https://github.com/anthropics/claude-code/issues/81852)

### 5.4 Headless、SDK 与自动化工作流

- 降低 `claude -p` 和 SDK 入口的配额消耗。
- 改善云 Session 中 Headless 模式的认证继承。
- 提升 MCP 工具较多时的错误诊断准确性。
- 探索更稳定的 Cloud Routine、Project Thread 与仓库级自动化能力。

相关链接：

- [Headless 配额消耗 #97074](https://github.com/anthropics/claude-code/issues/97074)
- [Cloud Session 中 `claude -p` 登录错误 #103851](https://github.com/anthropics/claude-code/issues/103851)

### 5.5 会话管理、恢复与可观测性

- 历史会话应能可靠发现、归档、恢复和分组。
- 工具调用被安全机制阻止时，需要通过 OpenTelemetry 提供结构化事件。
- Transcript JSONL 必须完整记录助手输出，避免静默数据丢失。

相关链接：

- [Cowork 归档会话不可见 #22931](https://github.com/anthropics/claude-code/issues/22931)
- [文本块静默丢失 #74260](https://github.com/anthropics/claude-code/issues/74260)
- [按目录路径分组会话 #89623](https://github.com/anthropics/claude-code/issues/89623)

## 6. 开发者关注点

1. **输出与会话数据完整性是首要问题**  
   文本块被静默删除会同时影响终端显示、JSONL Transcript 和后续恢复。其严重性高于一般 UI 缺陷，因为它可能造成内容不可见且无法追溯。

2. **跨平台一致性仍待加强**  
   Linux 下的 CRLF、沙箱虚假文件，以及 Windows/macOS Desktop 更新后的 Session 丢失，都说明不同运行入口之间存在明显行为差异。

3. **自动化场景的配额效率直接影响可用性**  
   Headless 模式每 Token 消耗约 1.8 倍窗口额度，会显著缩短 CI/CD、批量处理和长期后台任务的可运行时间。

4. **云端配置加载规则不统一**  
   Hooks 和 `settings.json` 能加载而 Skills 不能加载，暗示项目级配置的解析、发现和注入链路可能按组件或运行模式进行了拆分。

5. **长期运行进程需要可靠的资源回收**  
   后台 Worker 泄漏说明 Claude Code 在异常退出、升级和重启场景下，仍需更严格的进程身份管理、超时回收与孤儿进程清理。

6. **桌面端升级和远程控制的会话连续性不足**  
   用户希望更新不应终止任务，Remote Control 应在应用重启或 Session 空闲后自动恢复；这比单纯修复崩溃更强调“可恢复工作流”。

7. **安全机制需要可观测性**  
   v2.1.307 新增 `claude_code.safety_event` 是积极进展。开发者可通过 OpenTelemetry 区分权限、Hook、安全检查和沙箱导致的工具调用终止，从而建立更可靠的 Agent 审计体系。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报

**日期：2026-10-22**  
**数据范围：GitHub openai/codex 过去 24 小时动态**

## 1. 今日速览

过去 24 小时社区最集中地反馈了 Codex 桌面端稳定性问题，尤其是 macOS 新会话无法发送首条消息、Windows 端性能与认证异常，以及内置浏览器权限状态不同步。  
代码侧则围绕企业级 MCP OAuth、Windows 代理认证、远程执行、追踪与可观测性持续完善，说明近期开发重点仍集中在**身份授权、工具调用可靠性、Windows 兼容性和生产可观测性**。

## 2. 版本发布

过去 24 小时发布两个 Rust Alpha 版本，但提供的数据未包含具体变更日志：

- [`rust-v0.164.0-alpha.9`](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.9)：`0.164.0-alpha.9`
- [`rust-v0.163.0-alpha.11.1`](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.11.1)：`0.163.0-alpha.11.1`

> 两个版本均属于预发布迭代；从当天 PR 方向看，重点涉及 MCP OAuth、Windows 代理、远程执行、追踪、消息板和数据库迁移等，但无法仅凭 Release 标签确认具体落地范围。

## 3. 社区热点 Issues

### 1. macOS 新会话首条消息无法发送

- [#55744：macOS app 26.1016.51333 新聊天首次发送报 Cannot serialize value](https://github.com/openai/codex/issues/55744)
- **问题影响**：直接阻断新会话创建，是当日社区讨论度最高的问题。
- **社区反应**：61 条评论、130 个 👍，明显高于其他 Issue。
- **关注点**：错误发生在客户端序列化阶段，可能与特定数据结构、配置或版本回归有关。

### 2. Windows 内置浏览器授权后仍被拒绝

- [#49453：已允许网站后，Browser access 仍受聊天级拒绝记录影响](https://github.com/openai/codex/issues/49453)
- **问题影响**：用户显式授权后仍无法访问站点，暴露出授权状态持久化或优先级设计问题。
- **社区反应**：32 条评论、3 个 👍。
- **关注点**：聊天级拒绝配置是否应被新授权覆盖，是权限系统一致性的核心问题。

### 3. 权限与审批模式无法稳定持久化

- [#29915：新旧线程的 Permission / approval mode 均无法可靠保存](https://github.com/openai/codex/issues/29915)
- **问题影响**：涉及安全审批和自动化执行体验；设置丢失可能导致用户误以为某权限已生效。
- **社区反应**：28 条评论、4 个 👍。
- **关注点**：问题不只限于 `thread/resume`，还覆盖新建线程和桌面端可见行为。

### 4. macOS 内置浏览器可见但运行时报告不可用

- [#53425：Browser is not available: iab](https://github.com/openai/codex/issues/53425)
- **问题影响**：浏览器已打开且用户可操作，但代理无法通过 Browser API 发现或控制它。
- **社区反应**：13 条评论；问题直接影响 Agent 浏览器自动化能力。
- **关注点**：需要统一 UI 生命周期、浏览器运行时注册和工具发现之间的状态同步。

### 5. Windows 安装 OpenAI Developers 时 OAuth state 丢失

- [#54924：OpenAI Developers installation fails — “OAuth state not found”](https://github.com/openai/codex/issues/54924)
- **问题影响**：阻断技能或插件安装流程，错误可能涉及认证状态生命周期、浏览器回调或多窗口通信。
- **社区反应**：11 条评论、8 个 👍。
- **关注点**：与同日报表中代理 OAuth、token exchange 修复方向相呼应。

### 6. Windows 更新后 Dots 入口消失

- [#55795：升级至 26.1016.51333 后 Dots entry 消失](https://github.com/openai/codex/issues/55795)
- **问题影响**：重装及 `Ctrl+.` 均无法恢复，反映新版本可能存在入口注册、缓存或状态迁移异常。
- **社区反应**：10 条评论、3 个 👍。
- **关注点**：问题发生于刚更新的版本，具有明显的版本回归排查价值。

### 7. Windows 远程压缩卡在已退役模型

- [#54226：切换模型后 Remote compaction 仍使用 retired GPT-5.5](https://github.com/openai/codex/issues/54226)
- **问题影响**：长会话无法完成远程压缩，可能导致上下文管理中断。
- **社区反应**：7 条评论、1 个 👍。
- **关注点**：模型切换后的后台任务可能没有及时刷新模型和会话元数据。

### 8. Windows Git Bash 在沙箱中创建信号管道失败

- [#15016：Git Bash 报 “couldn't create signal pipe, Win32 error 5”](https://github.com/openai/codex/issues/15016)
- **问题影响**：影响 `exec_command` 使用 Bash 和 Windows sandbox 的组合，限制脚本化执行及测试工作流。
- **社区反应**：7 条评论、7 个 👍；用户明确指出问题从 `0.115.0` 开始出现。
- **关注点**：具有较明确的版本回归特征，涉及沙箱权限、管道和子进程生命周期。

### 9. Windows Desktop 并发会话出现路由超时

- [#50923：并发 turn 卡顿，伴随 MCP discovery 和队列停滞](https://github.com/openai/codex/issues/50923)
- **问题影响**：普通多会话工作流即可触发，影响吞吐量和任务可靠性。
- **社区反应**：7 条评论；报告包含较长时间的连续观测数据。
- **关注点**：可能涉及 app-server 调度、MCP 发现锁、队列或工作区路由竞争。

### 10. Codex Web 在 Safari 27 无法提交消息

- [#55361：Safari 27 报 DisposableStack 未定义](https://github.com/openai/codex/issues/55361)
- **问题影响**：在部分浏览器和系统中完全阻断消息发送。
- **社区反应**：3 条评论、2 个 👍；普通及隐私模式下均可复现。
- **关注点**：错误指向前端运行时兼容或构建目标配置，需要补充其他 Safari/WebKit 环境验证。

## 4. 重要 PR 进展

以下 PR 均为过去 24 小时更新且当前状态为 **Closed**；具体是否已进入目标分支仍需结合合并记录确认。

### 1. MCP OAuth 持久化测试避免嵌套启动 CLI

- [#56018：Avoid nested CLI startup in the MCP OAuth persistence test](https://github.com/openai/codex/pull/56018)
- 使用 `ConfigEditsBuilder` 直接模拟并发 MCP 服务配置编辑，保留 OAuth discovery、issuer-bound callback 与配置落盘覆盖。
- 价值：减少测试中的嵌套 CLI 启动和 HTTP 超时，提高认证持久化测试稳定性。

### 2. 终端会话身份不再依赖可复用 PID

- [#56011：Keep rollout trace terminal sessions distinct when process IDs are reused](https://github.com/openai/codex/pull/56011)
- 解决进程句柄和 PID 被系统回收后，不同终端会话可能被错误合并的问题。
- 价值：提升 rollout trace、`write_stdin` 与工具执行关联的准确性。

### 3. 新增直接工具调用关键路径计时

- [#56008：Add a critical-path timing recorder for direct tool calls](https://github.com/openai/codex/pull/56008)
- 新增 `codex-direct-tool-timing` crate，记录工具执行、自动审查、人工等待和依赖路径。
- 价值：为延迟分析和 Agent 工具链性能瓶颈定位提供结构化数据。

### 4. MCP 凭据替换限定于可信来源

- [#56003：Scope MITM credential substitution to trusted origins and placeholders](https://github.com/openai/codex/pull/56003)
- 在暴露主机凭据前，同时验证目标来源和原始请求，并阻止项目配置重定向可信凭据策略。
- 价值：降低 MCP 调试或中间人流程中的凭据泄漏风险。

### 5. 支持企业托管 MCP 的机密 OAuth 客户端

- [#56001：Support confidential OAuth clients for enterprise-managed MCP auth](https://github.com/openai/codex/pull/56001)
- 解除企业 OAuth 注册必须使用 public client 的限制。
- 价值：支持 client secret、机密客户端及更严格的企业身份治理方案。

### 6. Windows 代理 CONNECT 认证重试

- [#56000：Retry proxy CONNECT challenges with Windows authentication](https://github.com/openai/codex/pull/56000)
- 当 HTTPS 或 WebSocket 请求收到 `407 Proxy Authentication Required` 时，通过 Windows 身份认证辅助逻辑重试。
- 价值：改善企业代理、NTLM/Negotiate 环境下的网络连通性。

### 7. app-server 的 OpenTelemetry 启动改为尽力而为

- [#30601：Make app-server OTEL startup best effort](https://github.com/openai/codex/pull/30601)
- 无效 OTLP exporter 配置不再直接阻止 app-server 启动和 `initialize` 响应。
- 价值：避免可观测性配置错误导致整个客户端不可用。

### 8. 新增 Windows 代理认证隧道辅助模块

- [#55994：Add a Windows proxy authentication tunnel helper](https://github.com/openai/codex/pull/55994)
- 使用当前 Windows 用户的 Negotiate 或 NTLM 凭据完成代理 CONNECT，并保留隧道中的缓冲数据。
- **价值**：为 Windows 企业网络访问提供统一的底层代理支持。

### 9. 避免保留推理内容被重复计入 Token

- [#55991：Avoid double-counting retained reasoning in token usage](https://github.com/openai/codex/pull/55991)
- 修正 Responses Lite 已报告 retained reasoning 时，系统又追加独立推理估算的问题。
- 价值：避免 Token 用量被高估并触发不必要的提前上下文压缩。

### 10. 远程执行服务器凭据自动刷新

- [#55987：Refresh remote exec-server credentials after unauthorized responses](https://github.com/openai/codex/pull/55987)
- 在远端注册请求遇到未授权或凭据轮换时刷新凭据，并合并并发刷新请求。
- 价值：减少长时间运行的 `exec-server` 因 token 过期或轮换而中断。

## 5. 功能需求趋势

### 企业认证与权限治理

- 企业 MCP 需要支持带 client secret 的机密 OAuth 客户端。
- 用户希望明确控制 Dot 可访问的设备、服务器及远程任务环境。
- 站点授权、会话级拒绝、审批模式之间需要更一致的状态模型。

相关需求：

- [#49491：让 Dot 直接连接无头 Linux 服务器作为任务环境](https://github.com/openai/codex/issues/49491)
- [#50660：允许 Dot 使用更多自有计算机，包括无头 Linux Codex Remotes](https://github.com/openai/codex/issues/50660)
- [#2680：MCP 配置支持环境变量展开](https://github.com/openai/codex/issues/2680)

### 远程执行与跨设备任务

社区希望 Dot、CLI 和桌面端能够共享同一套远程工作环境，减少本地设备与常驻服务器之间的能力割裂。需求重点包括设备授权、凭据撤销、任务环境发现以及无图形界面的登录方式。

### 浏览器自动化与权限管理

浏览器相关问题同时涉及授权、运行时发现、站点兼容性和状态同步。社区期待的不只是“能够打开浏览器”，而是完整、稳定且可预测的 **Browser Use 生命周期和权限体系**。

### Windows 桌面端可靠性

Windows 已成为反馈最密集的平台，问题覆盖：

- OAuth 与 token exchange
- 代理与企业网络
- 沙箱和 Git Bash
- 并发任务及工作区路由
- 窗口恢复、滚动位置和界面卡顿
- MXC 沙箱资源清理

### 模型切换与上下文管理

远程压缩卡在退役模型、保留推理内容重复计费、额度消耗异常等问题表明，模型生命周期和 Token 统计需要更强的状态一致性。

### IDE 与多客户端体验

VS Code 扩展、Codex Web、桌面端和 CLI 之间仍存在行为差异。例如任务中断后编辑重发失败、Safari 无法提交消息，以及不同客户端对会话和权限的处理不一致。

## 6. 开发者关注点

1. **新会话和会话恢复必须可靠**  
   序列化失败、压缩卡住、编辑后重发失败都会直接中断工作流，且很难仅靠用户侧操作规避。

2. **权限状态应可预测、可解释**  
   审批模式、站点授权和聊天级拒绝之间存在状态冲突。开发者需要明确知道某项权限实际来自哪里，以及新授权是否覆盖旧记录。

3. **Windows 是当前兼容性重点**  
   沙箱、代理、OAuth、并发路由、视图恢复和性能问题均高度集中。相关 PR 已开始补充 Windows 代理认证和测试基础设施，但端到端可靠性仍需提升。

4. **企业环境需要秘密管理与凭据轮换能力**  
   机密 OAuth 客户端、远程执行凭据刷新和可信来源限定，都是为了支持更严格的企业安全模型。

5. **可观测性正在从日志走向关键路径分析**  
   新增直接工具调用计时，以及将 app-server OTEL 启动降级为非致命，说明团队正加强延迟诊断，同时避免监控配置反过来影响主流程。

6. **Token 与额度统计需要避免误判**  
   保留推理内容重复计数可能提前触发 compaction；Windows 端出现额度充足但返回 429 的报告，也需要进一步核查客户端配额判断和重试策略。

7. **资源生命周期和后台任务需要及时收尾**  
   WebSocket 响应丢弃、远程凭据过期、MXC 沙箱目录和防火墙规则残留，都指向后台任务、凭据及系统资源清理机制仍需加强。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报

**日期：2026-10-22**  
**项目：google-gemini/gemini-cli**

## 1. 今日速览

- 过去 24 小时发布 Nightly 版本 `v0.67.0-nightly.20261021.gd00859d6b`，重点涉及云存储命令迁移及用户级 Git 配置保留。
- 社区讨论高度集中在 **Agent 稳定性与可控性**：子代理错误终止、无限挂起、配置失效、浏览器会话恢复、危险命令抑制及工具数量膨胀等问题备受关注。
- PR 侧则集中修复取消信号、权限与文件安全、ACP 输出截断、IDE 重连和沙箱兼容性问题，工程重心正从功能扩展转向可靠性与安全治理。

## 2. 版本发布

### v0.67.0-nightly.20261021.gd00859d6b

- **存储工具链迁移**：将 `gsutil` 用法迁移至 `gcloud storage`，减少对旧版 Google Cloud CLI 工具的依赖。  
  [PR #29839](https://github.com/google-gemini/gemini-cli/pull/29839)
- **保留用户级 Git 配置**：在 Shell 和 Git 环境中修复 `~/.gitconfig` 丢失问题，避免 CLI 行为受到用户全局 Git 设置的破坏性影响。  
  [PR #29832](https://github.com/google-gemini/gemini-cli/pull/29832)
- **版本发布 PR**：  
  [PR #29860](https://github.com/google-gemini/gemini-cli/pull/29860)

## 3. 社区热点 Issues

1. **子代理达到 `MAX_TURNS` 后仍被报告为成功**  
   `codebase_investigator` 实际未完成分析，却返回 `status: success` 和 `Termination Reason: GOAL`，容易让上层任务误判成功。评论数最多，暴露了子代理终止状态与真实结果不一致的问题。  
   [Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **Generalist Agent 无限挂起**  
   Generalist Agent 在创建文件夹等简单操作中可能长时间无响应；禁用子代理委派后可绕过。该问题获得 **8 个赞**，对自动化任务影响较大。  
   [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)

3. **Browser Agent 忽略 `settings.json` 覆盖项**  
   Browser Agent 不正确应用 `maxTurns` 等全局或项目级配置，表明代理配置注册与实际运行链路存在脱节。  
   [Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)

4. **Browser Agent 在 Wayland 环境下失败**  
   浏览器子代理在 Wayland 会话中无法正常完成，终止原因显示为 `GOAL`，但实际执行已失败，反映浏览器兼容性与错误传播仍不成熟。  
   [Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983)

5. **工具数量过多触发 HTTP 400**  
   当可用工具超过约 400 个时，Gemini CLI 会遇到 400 错误。社区希望系统能够按任务动态裁剪工具范围，而不是将所有已启用工具全部发送给模型。  
   [Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)

6. **Agent 频繁在随机位置创建临时脚本**  
   当 Shell 执行受到限制时，模型会通过编辑脚本完成任务，并在多个目录留下临时文件，增加工作区清理和提交噪声。  
   [Issue #23571](https://github.com/google-gemini/gemini-cli/issues/23571)

7. **Agent 可能执行破坏性 Git 或资源操作**  
   社区指出模型偶尔会使用 `git reset`、`--force` 等高风险命令，而不一定优先选择更安全的方案；需要显式的破坏性行为抑制和风险分级。  
   [Issue #22672](https://github.com/google-gemini/gemini-cli/issues/22672)

8. **子代理软链接无法被识别**  
   `~/.gemini/agents/filename.md` 为符号链接时不会被注册为子代理，影响使用集中管理或版本化 Agent 定义的开发方式。  
   [Issue #20079](https://github.com/google-gemini/gemini-cli/issues/20079)

9. **创建 Vite 应用时卡在交互式提示**  
   Agent 在执行创建 Vite 应用的常规流程时陷入交互提示，表明部分 CLI 工具尚未形成可靠的自动执行策略，也缺少相应行为评测。  
   [Issue #22465](https://github.com/google-gemini/gemini-cli/issues/22465)

10. **AST 感知的文件读取、搜索与代码库映射评估**  
    社区正在评估 AST 工具能否更精确地定位函数边界、减少无效文件读取和上下文噪声，并提升代码库映射效率。该方向可能成为降低 Token 消耗的重要基础。  
    [Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745) · [代码库映射子任务](https://github.com/google-gemini/gemini-cli/issues/22746) · [搜索与读取子任务](https://github.com/google-gemini/gemini-cli/issues/22747)

## 4. 重要 PR 进展

1. **取消请求后停止续传与自动提示**  
   交互模式按 `Escape` 取消当前请求后，CLI 仍可能继续处理 continuation stream 并自动 nudge 模型。该 PR 将终止后续流处理，避免取消后仍产生工具调用。  
   [PR #29868](https://github.com/google-gemini/gemini-cli/pull/29868)

2. **非交互模式正确处理终止信号**  
   收到 `SIGINT` 或 `SIGTERM` 后，非交互 CLI 可能继续执行延迟到达的 Shell 工具调用并回传结果。修复后将阻止取消后的本地副作用。  
   [PR #29849](https://github.com/google-gemini/gemini-cli/pull/29849)

3. **设置迁移时保留环境变量占位符**  
   修复废弃设置迁移过程中 `${VAR}`、`${VAR:-default}` 被运行期展开值覆盖的问题，保护自动化环境中的动态配置。  
   [PR #29867](https://github.com/google-gemini/gemini-cli/pull/29867)

4. **原子写入尊重只读文件和硬链接**  
   新的原子写入流程此前可绕过目标文件权限，覆盖只读文件并破坏硬链接关系。修复后写入行为更符合文件系统权限预期。  
   [PR #29749](https://github.com/google-gemini/gemini-cli/pull/29749)

5. **Shell 命令信任范围与授权记忆优化**  
   将不受信任内容检查限定在外部输出，降低重复确认；工作区路径不再持续触发告警，并允许一次授权覆盖同类参数。  
   [PR #29833](https://github.com/google-gemini/gemini-cli/pull/29833)

6. **ACP 工具输出截断**  
   ACP 模式此前会将工具输出完整发送给模型，单次大型 Shell 输出即可超出输入限制。对应 PR 按调度器阈值限制输出，避免请求超过模型 Token 上限。  
   [PR #29778](https://github.com/google-gemini/gemini-cli/pull/29778) · [已关闭的调度器统一方案](https://github.com/google-gemini/gemini-cli/pull/29862)

7. **IDE 重启后允许 `/ide` 重新连接**  
   VS Code Reload Window 或扩展重启后，存活终端中的 CLI 无法重新连接 IDE companion。该修复恢复了 `/ide enable` 的重连能力。  
   [PR #29744](https://github.com/google-gemini/gemini-cli/pull/29744)

8. **容器沙箱桥接 IDE Companion**  
   通过 exec stdio 将宿主 IDE 与容器内 Gemini CLI 连接，使 `/ide status`、打开文件上下文和原生 diff 等能力可用于 Docker、Podman、runsc 环境。  
   [PR #29858](https://github.com/google-gemini/gemini-cli/pull/29858)

9. **Rootless Podman 修复 UID 映射**  
   对 Podman 沙箱增加 `--userns=keep-id`，解决非 root 用户在容器内因 UID 映射无效而出现 `EACCES` 的问题。  
   [PR #29718](https://github.com/google-gemini/gemini-cli/pull/29718)

10. **新增 Gemini 4 Argon 模型支持**  
    注册 `gemini-4-argon`，允许用户像使用其他 Gemini 模型一样直接选择，而不再需要自定义模型覆盖。  
    [PR #29737](https://github.com/google-gemini/gemini-cli/pull/29737)

> 补充关注：另有 PR 修复 Android/Termux 下 `grep_search` 的 `ENOENT` 错误，并允许信任系统 `rg` 路径：[PR #29823](https://github.com/google-gemini/gemini-cli/pull/29823)。

## 5. 功能需求趋势

### 1. Agent 编排与可靠性成为核心议题
- 子代理终止状态必须准确反映任务是否完成。
- Generalist Agent 和浏览器代理需要消除挂起、配置失效和会话锁死。
- 社区期待更完善的会话接管、锁恢复及异常恢复机制。  
  代表议题：[Browser 会话恢复](https://github.com/google-gemini/gemini-cli/issues/22232)、[子代理调试上下文](https://github.com/google-gemini/gemini-cli/issues/21763)

### 2. Agent 自主调度能力仍不足
- 模型对自定义 Skills 和子代理的主动使用不足。
- 社区希望 Agent 能更准确地理解自身 CLI 参数、快捷键和能力边界。
- 共享记忆、并行子代理协作和子代理发现也是高频方向。  
  代表议题：[Skills/Sub-agent 使用率](https://github.com/google-gemini/gemini-cli/issues/21968)、[自我认知](https://github.com/google-gemini/gemini-cli/issues/21432)、[并行协作](https://github.com/google-gemini/gemini-cli/issues/18287)

### 3. IDE 集成向容器和可靠重连延伸
需求不再局限于“能否连接 IDE”，而是希望 IDE 上下文、原生 diff 和 companion 状态在容器沙箱、窗口重载及扩展重启后仍然可靠。  
  代表议题：[Browser/IDE 上下文管理](https://github.com/google-gemini/gemini-cli/pull/29744)、[容器 IDE 桥接](https://github.com/google-gemini/gemini-cli/pull/29858)

### 4. 上下文与 Token 效率优化
- AST 感知的读取、搜索和代码库映射受到重点关注。
- 社区希望减少大文件“倾倒式”读取和上下文腐化。
- ACP、工具数量上限与任务追踪均需要更主动的上下文控制。  
  代表议题：[AST 评估](https://github.com/google-gemini/gemini-cli/issues/22745)、[Tactful Extraction](https://github.com/google-gemini/gemini-cli/issues/19561)、[持久化任务追踪](https://github.com/google-gemini/gemini-cli/issues/18836)

### 5. 安全与破坏性操作治理
社区希望 Agent 主动识别并避免 `git reset`、强制覆盖、数据库修改等高风险行为，同时减少频繁授权弹窗，在安全性和操作效率之间取得平衡。  
  代表议题：[破坏性行为抑制](https://github.com/google-gemini/gemini-cli/issues/22672)、[Shell 授权策略](https://github.com/google-gemini/gemini-cli/pull/29833)

### 6. 新模型与跨平台支持
- Gemini 4 Argon 的正式注册反映模型支持节奏正在加快。
- Android/Termux、Wayland、Rootless Podman 等环境仍是兼容治理重点。  
  代表议题：[Gemini 4 Argon](https://github.com/google-gemini/gemini-cli/pull/29737)、[Termux 修复](https://github.com/google-gemini/gemini-cli/pull/29823)

## 6. 开发者关注点

- **执行结果必须可信**：子代理不能以“成功”掩盖达到轮次上限、中断或未完成任务，错误状态与终止原因需要统一。
- **取消必须真正停止副作用**：交互式取消和 `SIGINT`/`SIGTERM` 都应立即阻断后续工具调用，不能只显示提示。
- **工具数量与输出规模需要硬限制**：大量工具会触发 API 400，大型工具输出也可能直接突破模型上下文上限。
- **配置需要真正贯穿运行链路**：全局、项目级和 `settings.json` 覆盖项必须在所有 Agent 中一致生效。
- **自动化不能卡在交互提示**：创建项目等常规流程应默认采用非交互方式，并为模型建立行为评测约束。
- **权限系统既要安全也不能过度打扰**：只读文件、硬链接、Shell 参数及外部输出需要更精细的信任边界。
- **工作区需要保持整洁**：减少随机临时脚本、残留目录和意外配置扩张。
- **可调试性仍不足**：`/bug` 和 `/chat share` 应纳入子代理轨迹、内部上下文和异常终止信息。  
  相关议题：[子代理 Bug 信息](https://github.com/google-gemini/gemini-cli/issues/21763)、[共享子代理轨迹](https://github.com/google-gemini/gemini-cli/issues/22598)

**总体判断：** 当前社区的主要诉求不是单纯增加 Agent 数量，而是建立一套**可预测、可停止、可审计、不会污染工作区**的多代理执行体系。短期最值得关注的落地方向是取消语义、子代理状态机、工具动态裁剪、AST 上下文读取以及 IDE/容器集成。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期：2026-10-22**  
**数据范围：GitHub 过去 24 小时发布与更新记录**

## 1. 今日速览

Reasonix 今天集中发布 **Studio v2.47.1、v2.47.0** 及稳定版 **v1.39.10**，重点修复证书验证、历史会话索引和 Windows 稳定性问题，并引入定时任务、Windows 命令沙箱及文件预览等能力。

社区反馈主要集中在 **Windows 崩溃、多会话并行、移动端体验、历史搜索和设置同步**；与此同时，PR 正持续处理大型会话内存占用、HTTP/2 兼容、远程执行和统计准确性等底层问题。

---

## 2. 版本发布

### Studio v2.47.1

- 使用 **Go 1.26.10** 重新构建，修复标准库 `crypto/x509` 对失效中间证书的处理问题（GO-2026-6809）。
- 修复历史会话暂时无法读取时错误显示“没有匹配”的问题；现在会先提示索引不完整，并将相关会话标记为损坏后自动重试。
- 修复多个进程共享历史索引时，新索引会话被误判为已删除、从历史搜索中消失的问题。
- Release：[studio-v2.47.1](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.47.1)

### Studio v2.47.0

- 新增 **定时运行**：支持创建、预览确认、暂停、续期、删除定时任务，并查看每次执行结果。
- 新增 **Windows 命令沙箱**，默认关闭；可限制在授权目录外创建或改写文件，但删除、读取、联网及部分系统管道不受限。
- 工作台新增 PDF、CSV、静态 HTML 预览；AI 文件交付卡片需用户在设置中主动开启。
- 修复长会话窗口内存上涨、1.x 会话导入和历史搜索、自定义预设切换过慢等问题。
- Release：[studio-v2.47.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.47.0)

### CLI / Desktop v1.39.10

- 使用 Go 1.26.10 重新构建，修复证书验证问题。
- OpenCode Go 连接改用官方文档提供的接口地址。
- 新增对 **DeepSeek V4.1 Flash** 的支持。
- Release：[v1.39.10](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v1.39.10)
- 完整日志：[Reasonix v1.39.10 Changelog](https://reasonix.io/changelog/v1.39.10/)

---

## 3. 社区热点 Issues

### 1. Studio 在 Windows 上打开会话后闪退

[#14116](https://github.com/esengine/DeepSeek-Reasonix/issues/14116) · **OPEN** · 3 条评论

用户反馈 Reasonix Studio 在处理任务期间进程消失，重新启动并打开原会话后仍可能复现。该问题直接涉及核心可用性和会话连续性，且报告环境为活跃开发中的 2.x Studio，是今日优先级最高的稳定性问题。

### 2. 工具调用结束后，Agent 的短句回复被错误呈现为任务完成

[#14115](https://github.com/esengine/DeepSeek-Reasonix/issues/14115) · **OPEN** · 1 条评论

在 v2.47.1 中，经过多轮只读工具调用且没有产生变更后，Agent 以短句停止，界面却表现为“正常完成”。这可能让用户误以为计划已全部落地，属于 Agent 完成状态和可观察性方面的语义缺陷。

### 3. HTTP 远端会话中无法发送 Shell 命令

[#13810](https://github.com/esengine/DeepSeek-Reasonix/issues/13810) · **OPEN** · 2 条评论

用户通过 HTTP 访问远端会话时，输入 Shell 命令并回车后消息无法发送。该问题影响 Reasonix 的远程开发和 Agent 执行能力，也可能与近期远程服务路由、跨主机面板修复方向相关。

### 4. 手机端网页无法同步桌面端设置

[#13977](https://github.com/esengine/DeepSeek-Reasonix/issues/13977) · **OPEN** · 2 条评论

手机网页端不能同步桌面端设置，反映出 Web 远控、桌面宿主和本地配置之间尚未形成一致的状态模型。随着手机扫码远控和移动 Web 使用频率上升，设置、设备与账户同步将成为重要体验指标。

### 5. 多会话并行时出现内核无响应

[#13491](https://github.com/esengine/DeepSeek-Reasonix/issues/13491) · **CLOSED** · 1 条评论

用户同时打开 5 个标签页后，应用出现卡死：正在工作的会话无法停止，已停止的会话也无法重新输入并启动。虽然 Issue 已关闭，但它与近期历史索引、多进程共享以及写入锁相关反馈共同反映了并发工作流仍是高敏感区域。

### 6. Chrome Mobile 首轮对话后输入框消失

[#14113](https://github.com/esengine/DeepSeek-Reasonix/issues/14113) · **CLOSED** · 3 条评论

移动端 Chrome 在完成至少一轮对话、历史内容变为可滚动后，底部输入框会完全离开视口。该问题直接影响远程使用和连续对话能力，也与移动端布局适配需求形成呼应。

### 7. 安装技能插件后，功能列表加载缓慢

[#13197](https://github.com/esengine/DeepSeek-Reasonix/issues/13197) · **CLOSED** · 8 条评论

安装 `mattpocock-skills` 后，输入“输出/”触发明显加载状态，功能列表约需 3 秒，重启后仍较慢。它是今日评论数最多的 Issue，说明技能扩展的发现、加载和 UI 响应速度是社区高频关注点。

### 8. 乐观模式已开启，但不同会话之间仍发生写入冲突

[#13965](https://github.com/esengine/DeepSeek-Reasonix/issues/13965) · **CLOSED** · 4 条评论

用户同时开启两个乐观模式会话，分别运行子代理和其他任务，却仍被写入锁阻塞。相关反馈希望扩大写入范围，或提供更清晰的并行写入策略，反映出用户对“多代理、多会话、同项目协作”的需求持续上升。

### 9. 货币单位设置在运行任务后被重置为美元

[#13513](https://github.com/esengine/DeepSeek-Reasonix/issues/13513) · **CLOSED** · 3 条评论

用户将币种设置为人民币后，界面重启时能够显示 `￥`，但任务运行后又会恢复为 `$`。问题看似细小，却说明部分用户偏好没有完整贯穿配置、任务和统计展示链路。

### 10. Agent 缺少读取视频的能力

[#13399](https://github.com/esengine/DeepSeek-Reasonix/issues/13399) · **CLOSED** · 4 条评论

用户指出部分模型本身支持视频理解，但 Reasonix Agent 缺少相应工具。该需求体现了社区对**多模态输入能力**的关注：不仅需要模型支持，还需要工具调用、媒体预处理、上下文预算与结果回传形成完整链路。

---

## 4. 重要 PR 进展

### 1. 关闭的工具卡片不再持续挂载完整输出

[#14117](https://github.com/esengine/DeepSeek-Reasonix/pull/14117) · **CLOSED**

修复已结束且关闭的工具卡片仍挂载输出、差异、图片和备注的问题。报告数据曾达到约 **260 万 DOM 节点、658 张卡片、2.3 GB JS 堆**，该 PR 是解决长会话内存上涨的重要优化。

### 2. 内置 Provider 自动兼容 HTTP/1.1

[#14094](https://github.com/esengine/DeepSeek-Reasonix/pull/14094) · **CLOSED**

为 Chat Completions、Responses 和 Anthropic 客户端加入 HTTP/2 协议错误后的兼容机制：当前请求保持失败，但后续新请求可切换到 HTTP/1.1，避免自动降级重放原请求造成副作用。

### 3. 远程面板请求携带未加前缀的 Runtime 标识

[#14045](https://github.com/esengine/DeepSeek-Reasonix/pull/14045) · **OPEN**

修复浏览器首次通过端口打开时，请求被错误路由到没有服务端能力的跨机器 Runtime。改动将完善远程服务路由，与移动远控、HTTP 远端会话和跨主机 Agent 场景直接相关。

### 4. 修复 TCP DNS 响应读取方式

[#14044](https://github.com/esengine/DeepSeek-Reasonix/pull/14044) · **OPEN**

TCP DNS 响应开头包含两字节长度前缀，旧逻辑却直接从响应体读取事务 ID，导致比较对象错误。该修复有助于提升远程 DNS 解析和复杂网络环境下的可靠性。

### 5. Guardian 安全审查调用纳入费用统计

[#14110](https://github.com/esengine/DeepSeek-Reasonix/pull/14110) · **OPEN**

此前总 Token 和请求数包含 Guardian 安全审查，但费用统计遗漏了这些调用。PR 将安全审查按普通 Provider 调用计入金额，使请求量、Token 和成本保持一致。

### 6. 将无成本依据的调用标记为统计不完整

[#14112](https://github.com/esengine/DeepSeek-Reasonix/pull/14112) · **OPEN**

修复部分调用虽然被计数，但没有对应价格或报价数据的问题。标题生成等独立 Recorder 路径此前可能产生“有 Token、无成本”的记录，新逻辑将其标记为成本信息不完整，而非静默忽略。

### 7. 预设模块支持分组多选

[#14064](https://github.com/esengine/DeepSeek-Reasonix/pull/14064) · **CLOSED**

将预设能力分类编辑器升级为可搜索的多选下拉框，提供内置/自定义分组、全选、分组选择、清空和已选数量。用户无需每次选择后重新打开菜单，提升复杂工作流的配置效率。

### 8. 新增可选的 AI 文件交付卡片

[#14063](https://github.com/esengine/DeepSeek-Reasonix/pull/14063) · **OPEN**

在“设置 → 工具与权限”中加入文件交付卡片开关，默认关闭；用户开启后，重新进入会话即可应用。该功能与 v2.47.0 的 PDF、CSV、静态 HTML 预览能力配套推进。

### 9. 目标停止时撤销目标契约

[#14104](https://github.com/esengine/DeepSeek-Reasonix/pull/14104) · **OPEN**

`<active-goal contract="full">` 要求 Agent 自主持续推进目标；目标停止后，原逻辑没有明确撤销该契约，可能让后续请求继续携带过期目标。新 PR 将停止状态显式传递，避免 Agent 误判任务仍处于自动执行阶段。

### 10. 修复未定义 CSS 变量导致声明失效

[#14047](https://github.com/esengine/DeepSeek-Reasonix/pull/14047) · **CLOSED**

三处样式声明引用了未定义的 `--bg`，导致整条 CSS 声明失效并静默不生效。该修复属于低成本但高价值的界面稳定性清理，也反映出前端变量体系仍需持续校验。

---

## 5. 功能需求趋势

### 1. 多会话与多 Agent 并行

社区希望多个会话能够在同一项目中同时工作，并通过乐观模式、写入门控或更明确的冲突提示减少阻塞。相关需求集中在 [#13965](https://github.com/esengine/DeepSeek-Reasonix/issues/13965) 和 [#13491](https://github.com/esengine/DeepSeek-Reasonix/issues/13491)。

### 2. 远程与移动端体验

手机远控、移动 Web 输入框、远端设置同步、HTTP Shell 发送及跨主机 Runtime 路由正在形成一条持续反馈链。远程使用已不只是“能够访问”，而是要求配置、交互、工具执行和状态反馈保持一致。

### 3. 自动化与定时任务

v2.47.0 引入定时运行，标志着 Reasonix 正从交互式 Agent 向持续执行型工作流发展。后续重点预计包括运行结果审查、失败重试、权限边界和任务生命周期管理。

### 4. 多模态内容理解

用户开始从图片扩展到视频等媒体输入。对应功能需要解决视频抽帧、音频转写、模型能力探测、文件大小控制和上下文预算，而不仅是增加一个上传按钮。

### 5. 跨对话搜索与引用

历史搜索不仅要按会话名称检索，还应覆盖对话内容、直接引用历史会话，并准确反映索引损坏、缺失和并发更新状态。v2.47.1 的索引修复正是这一方向的基础设施更新。

### 6. 可配置的安全与自动化边界

Windows 命令沙箱、默认关闭的文件交付卡片、外部文字确认和工具审批，反映出社区希望在自动化能力与可控性之间取得平衡。沙箱更细粒度的目录、网络及系统管道策略值得继续关注。

### 7. 工作台文档与数据预览

PDF、CSV 和静态 HTML 预览补齐了 AI 生成结果在 Studio 中的直接审阅链路。后续可能延伸至更完整的预览器、导出和批注能力。

---

## 6. 开发者关注点

- **Windows 稳定性是首要风险**：闪退、无提示退出、文件路径异常和“停止中”卡死等问题直接影响生产使用。相关反馈包括 [#14116](https://github.com/esengine/DeepSeek-Reasonix/issues/14116)、[#13299](https://github.com/esengine/DeepSeek-Reasonix/issues/13299) 和 [#13833](https://github.com/esengine/DeepSeek-Reasonix/issues/13833)。
- **长会话资源占用突出**：关闭的工具卡片仍保留完整输出，曾造成数百万 DOM 节点和 2.3 GB JS 堆；后续需持续关注虚拟列表、懒加载及历史输出卸载策略。
- **历史索引需要更强的数据完整性**：索引损坏、跨进程更新和误报删除，说明会话存储需要更明确的损坏状态、恢复机制与并发一致性保证。
- **并发写入策略仍不够直观**：多会话、乐观模式和子代理并行时，用户难以判断锁来自何处、何时解除，以及哪些操作可安全并行。
- **统计口径必须与真实消耗一致**：安全审查、标题生成等隐性调用是否计入成本，会直接影响用户对价格和缓存效率的判断。
- **Provider 兼容性仍需增强**：HTTP/2 降级和 TCP DNS 修复表明，Reasonix 在直连服务、代理、企业网络及跨区域部署中的协议兼容性是实际工程难点。
- **远程 Agent 的状态语义需要加强**：工具执行后短句停止、目标契约残留等问题说明，系统不仅需要展示“任务结束”，还应明确区分完成、暂停、失败、等待确认和目标已撤销。
- **扩展生态的性能成本不容忽视**：技能插件安装后功能列表加载变慢，提示插件发现、索引和加载机制需要避免阻塞主界面。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报｜2026-10-22

## 今日速览

过去 24 小时没有新版本发布，OpenCode 的开发重点集中在 **GitHub Copilot Free/Student 账户支持、V1→V2 会话迁移可靠性，以及桌面端与 TUI 的体验优化**。社区同时暴露了模型目录不刷新、迁移后历史消息丢失、上游模型端点不可用等关键问题，其中 Copilot 自动模型已有两个相关修复 PR 正在推进。

## 社区热点 Issues

### 1. GitHub Copilot Free/Student 账户无法显示任何模型
- **Issue：** [#34644](https://github.com/anomalyco/opencode/issues/34644)
- Copilot OAuth 登录虽然成功，但 Free/Student 账户在模型选择器中看不到 `github-copilot`，直接查询也无法识别。
- 这是较早提出且持续获得关注的问题，已有 **24 个点赞、12 条评论**，相关修复 PR #55960 和 #57956 也均与该问题直接相关。
- **影响：** 使用 Copilot 免费或学生订阅的用户可能完全无法使用该提供商。

### 2. V1→V2 迁移可能静默丢失旧会话消息
- **Issue：** [#53971](https://github.com/anomalyco/opencode/issues/53971)
- 迁移逻辑会丢弃缺少 `agent`、`model` 或 `parentID` 等必填字段的旧消息；报告中的 64 个 V1 会话最终变成空历史。
- 问题已被标记为 **reproduced、severity: high**，目前有 5 条评论。
- **影响：** 属于数据完整性风险，可能导致用户历史会话和上下文不可恢复。

### 3. 配置中新添加的模型需要重启服务才会生效
- **Issue：** [#56902](https://github.com/anomalyco/opencode/issues/56902)
- 后台服务运行期间修改 provider 的 `models` 配置后，`opencode models` 仍返回启动时构建的模型目录。
- 该问题目前已关闭，但反映出模型目录缺少配置变更后的自动刷新机制。
- **影响：** 开发者容易误以为模型配置未生效，或被迫频繁重启服务。

### 4. Copilot 自动选择账户注册了零个模型
- **Issue：** [#57955](https://github.com/anomalyco/opencode/issues/57955)
- GitHub 返回的所有模型均为 `model_picker_enabled: false`，OpenCode 因而过滤掉全部模型，最终出现 `Model unavailable`。
- 报告已定位到具体过滤逻辑，并促成了修复 PR [#57956](https://github.com/anomalyco/opencode/pull/57956)。
- **影响：** Free/Student 账户无法获得 Copilot 的自动路由能力。

### 5. TUI 子代理任务行不再显示代理名称和模型
- **Issue：** [#57970](https://github.com/anomalyco/opencode/issues/57970)
- 任务进度界面只显示简短描述，不再展示当前子代理及其使用的模型。
- 当不同子代理绑定不同本地或云端模型时，用户难以判断实际执行上下文。
- **影响：** 降低多代理工作流的透明度和可调试性。

### 6. OpenCode Go 的 Gemini 模型端点不可用
- **Issue：** [#57967](https://github.com/anomalyco/opencode/issues/57967)
- `opencode-go/gemini-4-argon-contributor` 的所有请求均返回 `Endpoint is unavailable`，但同一会话中的其他 OpenCode Go 模型正常。
- 问题表现更像是单一上游端点故障，而非账号或整体服务不可用。
- **影响：** 依赖该模型的自动化任务无法执行。

### 7. 公开工具调用失败数据集可作为回归测试资源
- **Issue：** [#57964](https://github.com/anomalyco/opencode/issues/57964)
- 社区贡献者整理了一套真实 coding-agent 工具调用失败案例，其中 25 个案例有 6 个来自 OpenCode 的公开 Issue。
- 数据集已作为公开资源发布，可用于回归测试和 agent 能力评估。
- **社区意义：** 有助于把真实故障转化为可重复测试，推动工具调用稳定性提升。

### 8. `/docs` 仍记录了七个已不存在的 V1 命令
- **Issue：** [#57957](https://github.com/anomalyco/opencode/issues/57957)
- 文档中的部分命令仍属于 V1，在 V2 中会直接报错；该 Issue 是文档同步检查清单，而非单个修复请求。
- **影响：** 新用户按文档操作时容易遇到命令不存在的问题，也会增加迁移支持成本。

### 9. 高频重试导致任务无法完成且持续造成干扰
- **Issue：** [#57968](https://github.com/anomalyco/opencode/issues/57968)
- 用户反馈任务在获得权限后仍不断重复相同尝试，每分钟触发一次，无法完成第一步。
- 该 Issue 信息较简略，当前处于 triage 阶段。
- **关注点：** 失败退避、权限处理和任务状态机可能存在恢复逻辑问题。

### 10. 多路视频监控与媒体流提取需求
- **Issue：** [#57941](https://github.com/anomalyco/opencode/issues/57941)
- 用户希望构建可执行程序，从网页地址提取 M3U8/MP4，并将多个视频源的画面与音频组合成实时多画面监控。
- 当前需求仍较初步，主要处于社区讨论和分诊阶段。
- **关注点：** 反映社区对浏览器媒体处理、流解析和实时多路视图编排的潜在需求。

## 重要 PR 进展

### 1. 为 GitHub Copilot 增加自动模型
- **PR：** [#55960](https://github.com/anomalyco/opencode/pull/55960)
- 新增 `github-copilot/auto`，适配 Copilot Free/Student 仅允许自动选模的账户。
- 同时涉及模型目录构建和请求路由，目标是与 VS Code 的 Auto 行为保持一致。
- 对应 [#34644](https://github.com/anomalyco/opencode/issues/34644) 和 [#57955](https://github.com/anomalyco/opencode/issues/57955)。

### 2. 不再因缺少模型选择器而隐藏 Copilot 模型
- **PR：** [#57956](https://github.com/anomalyco/opencode/pull/57956)
- 调整 `github-copilot/models.ts` 对 `model_picker_enabled` 的处理，使没有模型选择器的账户仍能选择可用模型。
- 与自动模型 PR 形成互补：前者解决“无模型可选”，该 PR 解决“模型被错误过滤”。

### 3. Console 账户没有 Go 订阅时给出明确提示
- **PR：** [#57913](https://github.com/anomalyco/opencode/pull/57913)
- 用户登录 OpenCode Console 但没有 Go 订阅时，桌面端不再只展示一个空模型列表。
- 应用会明确说明账户不包含 Go 订阅，减少模型缺失造成的困惑。

### 4. 允许禁用失败的 MCP 服务并持久化设置
- **PR：** [#56452](https://github.com/anomalyco/opencode/pull/56452)
- `/mcps` 页面现在可以禁用处于失败、等待连接或已连接状态的 MCP 服务。
- 禁用状态会被持久化，同时允许用户重新启用服务。
- **价值：** 提升不可用 MCP 服务的管理能力，并减少反复连接失败造成的干扰。

### 5. 为桌面端会话时间线加入类似 iOS 的动画
- **PR：** [#57224](https://github.com/anomalyco/opencode/pull/57224)
- 会话运行时，流式文本、工具调用和新增内容将以更平滑的方式更新，减少界面跳动。
- 改动规模较大，包含组件代码及相应测试，主要提升长时间 Agent 运行的视觉稳定性。

### 6. 为 CLI 增加 Prompt 历史范围配置
- **PR：** [#55261](https://github.com/anomalyco/opencode/pull/55261)
- 新增可选的 `prompt.history_scope` 配置。
- `global` 保持现有行为，可跨会话检索历史提示；`session` 则只检索当前会话内容。
- **价值：** 为多项目、多会话并行工作提供更清晰的提示词隔离。

### 7. 隔离持续失败的 E2E 测试并缩短 CI 重试时间
- **PR：** [#57951](https://github.com/anomalyco/opencode/pull/57951)
- 针对 Beta 流水线中长期失败的 E2E 测试进行 quarantine，并避免对固定失败用例进行无意义重试。
- 目标是恢复 CI 的信号价值，并降低每个 PR 的等待时间。

### 8. 用组件 Story Server 替代 Storybook
- **PR：** [#57966](https://github.com/anomalyco/opencode/pull/57966)
- 桌面应用使用新的组件 Story Server 取代 Storybook，同时继续承担组件测试职责。
- 该 PR 与应用内 Components Lab 配套，属于前端开发和测试基础设施重构。
- 当前仍处于 draft/叠加开发阶段。

### 9. 增加 Beta 更新日志的快捷入口
- **PR：** [#57940](https://github.com/anomalyco/opencode/pull/57940)
- 可通过命令面板或设置进入 “What’s new in beta”，并提供独立页面。
- 解决更新弹窗关闭后缺少回看入口的问题，方便用户追踪 Beta 版本变化。

### 10. Beta 更新日志展示变更作者和具体内容
- **PR：** [#57886](https://github.com/anomalyco/opencode/pull/57886)
- 更新日志不再只罗列 commit subject，而是展示每项变更的贡献者及内容概要。
- 配合轻量动画效果，可提升版本变更的可读性和社区贡献可见度。

## 功能需求趋势

1. **新模型与提供商可用性**
   - 社区高度关注 GitHub Copilot Free/Student 账户支持。
   - 自动模型路由、模型目录实时刷新和 OpenCode Go 上游模型稳定性成为集中议题。

2. **会话迁移与数据安全**
   - V1→V2 迁移中的历史消息完整性问题受到重视。
   - 开发者期望迁移失败可检测、可恢复，而不是静默生成空会话。

3. **多代理可观测性**
   - TUI 需要重新展示子代理名称、模型和执行状态。
   - 自定义子代理绑定不同模型后，用户需要准确识别实际执行链路。

4. **桌面端交互与视觉稳定性**
   - 当前 PR 集中于时间线动画、侧栏 tooltip、滚动条、Composer dock、快捷键和组件测试基础设施。
   - 整体方向是降低界面跳动、简化信息层级并提升 Beta 的可发现性。

5. **MCP 生命周期管理**
   - 除连接配置外，社区开始要求失败服务的禁用、恢复与持久化能力。
   - MCP 服务越多，可靠的启停和状态管理越重要。

6. **工作流隔离与历史控制**
   - CLI Prompt 历史范围表明开发者希望按会话、项目或全局灵活组织提示词。
   - 这与多任务、多 Agent 并行使用场景密切相关。

7. **Agent 评测与回归测试**
   - 社区开始共享真实工具调用失败样本，并将其整理为公开评测集。
   - 需求重点从“功能可用”扩展到“失败可复现、行为可衡量”。

## 开发者关注点

- **模型配置不能只“写进文件”，还必须立即可见并可用。** 开发者对配置热刷新、自动模型路由和明确错误提示的需求持续增加。
- **迁移过程需要数据安全兜底。** 静默丢弃消息比直接报错更危险；备份、校验、告警和恢复机制应优先于无提示迁移。
- **多 Agent 环境必须可观测。** 仅显示任务描述不够，用户需要知道正在运行的 Agent、模型、工具和权限状态。
- **CI 的“全红”比“全绿但无意义”更值得关注。** 长期隔离失败测试、重试无效用例，说明开发者更看重 CI 是否能提供可靠反馈。
- **V2 迁移仍存在文档与实现脱节。** 除代码兼容外，命令文档、帮助文本和错误提示也需要同步清理。
- **稳定性要求正在从主流程扩展到细节交互。** 时间线抖动、滚动条样式、快捷键作用域和 tooltip 动画等问题表明，桌面端已进入系统化打磨阶段。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报｜2026-10-22

## 1. 今日速览

Hermes Agent 过去 24 小时发布 **v0.22.3 与 v0.22.4**，其中 v0.22.4 集中修复 Desktop 建议卡片、插件与 Dashboard 问题，并整合此前约 620 个 PR。社区焦点主要转向 **Gateway 多配置架构、工具审批安全、消息可靠投递和新模型适配**，其中 macOS 下智能审批误操作导致 PowerPoint 数据丢失的问题引发较高关注。

---

## 2. 版本发布

### [Hermes Agent v0.22.4](https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.4)

- 发布日期：2026-10-21
- 修复 Desktop 输入框上方异常显示 suggestion pills 的问题。
- 包含插件、Dashboard 以及 CLI/安装器侧的若干小型修复。
- 覆盖 CLI、Microsoft Store 应用、Docker 与 Hermes Cloud。

### [Hermes Agent v0.22.3](https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.3)

- 发布日期：2026-10-21
- 将 v0.22.2 以来合并的约 **620 个 PR** 汇总为稳定版本。
- 完整、经过整理的版本说明计划在 v0.23.0 中发布。
- 同样覆盖 CLI、Microsoft Store 应用、Docker 与 Hermes Cloud。

---

## 3. 社区热点 Issues

1. **[#141346：智能审批自动批准 osascript，关闭未保存 PPT 并删除导出文件](https://github.com/NousResearch/hermes-agent/issues/141346)**  
   macOS 本地后端在缺少 LibreOffice 时尝试通过 PowerPoint 渲染 PPT，智能审批却自动放行高破坏性命令，造成不可恢复的数据丢失。该问题获得 **25 条评论**，是本期最值得优先处理的安全风险之一。

2. **[#134889：统一 Gateway 接管所有本地会话后的合并后修复](https://github.com/NousResearch/hermes-agent/issues/134889)**  
   跟踪 `unified-gateway-runtime` 上线后的 Desktop、CLI、Gateway、TUI 和会话配置问题。Issue 已有 **212 条评论**，虽然目前已关闭，但反馈量最高，表明统一 Gateway 架构仍处于密集协调阶段。

3. **[#141919：ACP 在流式消息下重复输出完整最终回复](https://github.com/NousResearch/hermes-agent/issues/141919)**  
   注册 `transform_llm_output` 插件钩子后，ACP 客户端会先显示流式气泡，再以相同消息 ID 重复输出完整转换文本，造成界面重复。已有 **5 条评论**，影响插件输出与流式协议的兼容性。

4. **[#141973：运行中发送消息无法可靠地 Steer 当前轮次](https://github.com/NousResearch/hermes-agent/issues/141973)**  
   消息可能仅被排队而未进入 Harness，UI 显示“已发送”但实际未送达，Steer 按钮也可能无反馈失效。该问题直接削弱 Desktop 交互式纠偏能力，已有 **4 条评论**。

5. **[#142330：begin_runtime_epoch 未校验 Profile 所有权锁](https://github.com/NousResearch/hermes-agent/issues/142330)**  
   RuntimeStore 在提升 epoch 时未确认调用方持有 Profile 所有权锁，可能让活跃 Gateway 的写入进入 stale epoch 状态，直至重启才恢复。已有 **3 条评论**，涉及多 Profile 隔离和会话状态一致性。

6. **[#142798：多路复用 Gateway 的终端命令继承宿主环境](https://github.com/NousResearch/hermes-agent/issues/142798)**  
   被托管 Profile 的本地终端可能继承首个启动 Gateway 进程的环境变量，带来凭据、路径和配置泄漏风险。已有 **2 条评论**，虽然标记为 P3，但安全影响值得重点评估。

7. **[#142741：macOS launchd 重试无法启动已注册但未运行的 Gateway](https://github.com/NousResearch/hermes-agent/issues/142741)**  
   `launchctl bootstrap` 成功仅代表任务已注册，不代表进程实际运行；当前重试逻辑可能在服务停止时错误结束。已有 **5 条评论**，影响 macOS Gateway 的自动恢复能力。

8. **[#91687：A2A 长任务应返回 task ID](https://github.com/NousResearch/hermes-agent/issues/91687)**  
   `SendMessage` 最长等待 300 秒，`a2a_call` 还会受到 120 秒 Socket 超时限制，长任务无法异步追踪。该问题已有 **8 条评论**，反映跨机器 Agent 协作需要更完善的异步任务协议。

9. **[#139825：卫星 Profile 同时启用 Desktop 本地适配器后，Cron 路由投递失败](https://github.com/NousResearch/hermes-agent/issues/139825)**  
   `gateway.profile_routes` 原计划允许无自有机器人的 Profile 借用默认机器人，但当卫星 Profile 同时配置 `local` 适配器时，Discord 消息会被判定为未启用。已有 **3 条评论**，属于多 Profile 路由边界问题。

10. **[#134850：格式错误的插件审批决定必须 fail closed](https://github.com/NousResearch/hermes-agent/issues/134850)**  
    当审批回调返回非字符串、未知选项、异常或不可用结果时，Hermes 需要明确拒绝执行，而不能继续放行未经验证的工具调用。已有 **2 条评论**，与智能审批数据丢失问题共同构成本期重要的工具安全议题。

---

## 4. 重要 PR 进展

1. **[#142769：将 tree-mem 加入插件目录](https://github.com/NousResearch/hermes-agent/pull/142769)**（开放）  
   引入以聊天日志为记忆源的树状记忆插件：后台将日志压缩为二进制摘要树，并按相关度生成每轮记忆视图。方向契合 Hermes 的长期上下文与压缩需求。

2. **[#142800：修复 WeCom 视频与语音消息被丢弃](https://github.com/NousResearch/hermes-agent/pull/142800)**（开放）  
   解析 WeCom 回调中的独立及嵌套 `video`、`voice` 容器，避免媒体内容到达时变成空消息。

3. **[#142801：修复 WeCom 流式最终回复被长度上限截断](https://github.com/NousResearch/hermes-agent/pull/142801)**（开放）  
   超过 20,480 字节的流式最终文本不再静默丢失尾部内容，改进长回复完整性。

4. **[#142799：webpack-dev-middleware 升级至 7.4.6](https://github.com/NousResearch/hermes-agent/pull/142799)**（开放）  
   修复 `publicPath` 配置导致的路径穿越问题，对应 **GHSA-g84c-rxfj-3j2c / CVE-2026-76844**。

5. **[#142783：simple-git 升级至 4.0.2](https://github.com/NousResearch/hermes-agent/pull/142783)**（已关闭）  
   处理多个命令执行相关安全公告，包括 trailer 配置未阻断、配置包含命令执行及缩写长选项绕过问题。版本升级同时要求更新 `@simple-git/argv-parser`。

6. **[#142781：KaTeX 升级至 0.18.4](https://github.com/NousResearch/hermes-agent/pull/142781)**（已关闭）  
   修复既有原型污染绕过 `trust` 限制的问题。受项目 Node.js 版本约束，暂未采用要求更高 Commander/Node 版本的更新版本。

7. **[#140658：Gateway footer 增加用量与计费指标](https://github.com/NousResearch/hermes-agent/pull/140658)**（开放）  
   在运行页脚展示总 Token、输入输出 Token、缓存读取、推理 Token 和估算费用，方便开发者观测不同会话及模型的资源消耗。

8. **[#142791：补充 MiniMax-M3.1-Flash 定价](https://github.com/NousResearch/hermes-agent/pull/142791)**（开放）  
   将 2026-10-19 发布的 MiniMax-M3.1-Flash 纳入内置价格快照，避免新模型在计费统计中继续沿用旧模型价格。

9. **[#142667：识别工具调用间重复返回的同一结果](https://github.com/NousResearch/hermes-agent/pull/142667)**（开放）  
   为 Tool Call Guardrail 增加窗口式重复检测：当同一结果在中间穿插其他调用时仍持续出现，将触发现有停滞提示或硬停止机制。

10. **[#135722：上下文压缩后保持 Todo revision 单调递增](https://github.com/NousResearch/hermes-agent/pull/135722)**（开放）  
    修复压缩上下文后旧任务列表被恢复、新 `todo_list` 写入被忽略的问题，避免会话状态在压缩边界发生回退。

---

## 5. 功能需求趋势

- **异步长任务与 Agent 协作**：A2A 任务需要立即返回可轮询的 task ID，避免 120/300 秒同步等待成为跨机器调用的硬限制（[#91687](https://github.com/NousResearch/hermes-agent/issues/91687)）。
- **可靠的会话交接与持续执行**：社区希望增加 `/seal`、`/unseal` 等标准化交接命令，并支持 Agent 持续工作直到用户明确停止（[#142790](https://github.com/NousResearch/hermes-agent/pull/142790)、[#75285](https://github.com/NousResearch/hermes-agent/issues/75285)）。
- **Gateway 多 Profile 与群聊迁移**：统一 Gateway 架构正在推进，但已有 Desktop 群聊需要带完整日志和线程安全迁移到 Gateway 托管房间（[#139961](https://github.com/NousResearch/hermes-agent/issues/139961)）。
- **新模型与 Provider 快速适配**：MiniMax 新模型目录和价格更新、Anthropic 2026-10-21 API 版本兼容，显示模型生态变化速度已快于 Hermes 静态目录（[#142648](https://github.com/NousResearch/hermes-agent/issues/142648)、[#142796](https://github.com/NousResearch/hermes-agent/issues/142796)）。
- **插件与扩展生态**：tree-mem、Cursor Provider 和 WeCom 媒体能力持续扩充，表明插件目录正从单点工具向记忆、模型适配和多平台接入发展（[#142769](https://github.com/NousResearch/hermes-agent/pull/142769)、[#142797](https://github.com/NousResearch/hermes-agent/pull/142797)）。
- **可观测性与使用分析**：用量、计费和 Gateway footer 指标需求增强，目标是在统一运行界面直接观察 Token、缓存和成本（[#140658](https://github.com/NousResearch/hermes-agent/pull/140658)）。
- **记忆与上下文管理**：Todo 压缩一致性、树状记忆和会话封存共同指向“长时间运行不丢状态”的需求（[#135722](https://github.com/NousResearch/hermes-agent/pull/135722)、[#142790](https://github.com/NousResearch/hermes-agent/pull/142790)）。
- **Dashboard 可用性**：Skills 页面恢复“Most Used”排序的请求，反映开发者希望更快识别高频使用和高价值技能（[#142795](https://github.com/NousResearch/hermes-agent/issues/142795)）。

---

## 6. 开发者关注点

- **工具审批必须遵循 fail closed 原则**：无论是异常值、未知决策还是参数被后续钩子修改，都不能默认放行；智能审批还需识别“会关闭应用、删除文件”等不可逆操作（[#141346](https://github.com/NousResearch/hermes-agent/issues/141346)、[#134850](https://github.com/NousResearch/hermes-agent/issues/134850)、[#134849](https://github.com/NousResearch/hermes-agent/issues/134849)）。
- **消息“已发送”不等于已送达**：Desktop Steer、Discord Cron 路由和 WeCom 流式尾部均暴露出投递状态与实际执行状态脱节的问题（[#141973](https://github.com/NousResearch/hermes-agent/issues/141973)、[#139825](https://github.com/NousResearch/hermes-agent/issues/139825)、[#142801](https://github.com/NousResearch/hermes-agent/pull/142801)）。
- **多 Profile 隔离仍需加强**：会话所有权锁、环境变量继承和路由选择都可能造成跨 Profile 状态污染或凭据泄漏（[#142330](https://github.com/NousResearch/hermes-agent/issues/142330)、[#142798](https://github.com/NousResearch/hermes-agent/issues/142798)）。
- **Gateway 生命周期和故障恢复要可预测**：macOS launchd、损坏 Git checkout 后的更新恢复，以及 Cron 在模型不可达时的自动重跑，都是部署后常见但容易静默失效的环节（[#142741](https://github.com/NousResearch/hermes-agent/issues/142741)、[#142609](https://github.com/NousResearch/hermes-agent/pull/142609)、[#119741](https://github.com/NousResearch/hermes-agent/issues/119741)）。
- **Provider 接入需要动态化**：静态模型目录、OAuth 授权、价格表和 API 版本均可能迅速过期，应加强在线发现、兼容测试与版本适配机制（[#142648](https://github.com/NousResearch/hermes-agent/issues/142648)、[#137289](https://github.com/NousResearch/hermes-agent/issues/137289)、[#142796](https://github.com/NousResearch/hermes-agent/issues/142796)）。
- **依赖安全需要持续治理**：本期多项 PR 聚焦路径穿越、命令执行和原型污染，说明 Desktop/Web 工具链的供应链安全已成为更新阻塞项（[#142799](https://github.com/NousResearch/hermes-agent/pull/142799)、[#142783](https://github.com/NousResearch/hermes-agent/pull/142783)、[#142781](https://github.com/NousResearch/hermes-agent/pull/142781)）。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报｜2026-10-22

## 1. 今日速览

- 今日发布 **v2026.10.10-beta.3**，重点改善 Windows 状态初始化、Gateway 启动、应用更新过程中的辅助窗口及强制重装稳定性。
- 社区议题集中在 **更新链路可靠性、会话崩溃恢复与消息丢失、配置安全边界**；同时，搜索参数、模型配置、渠道绑定等易用性问题正在快速修复。
- 过去 24 小时共有 **50 个 PR 更新**，开发重点覆盖 Web UI 性能、Automations 架构迁移、OAuth 安全、配置脱敏及多项 CLI 一致性修复。

---

## 2. 版本发布

### [v2026.10.10-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.10.10-beta.3)

本版本主要面向 Windows 稳定性：

- 恢复新环境下的状态初始化能力。
- 改进 Gateway 启动流程。
- 应用更新期间隐藏 SQLite 辅助进程窗口。
- 强制重装 Gateway 时，可容忍启动器时间戳尚未稳定的情况。
- 涉及多个 Windows 生命周期和更新相关问题，是近期 Windows 更新失败问题集中的重要修复版本。

---

## 3. 社区热点 Issues

### 1. [Windows 更新在非法问号路径创建候选快照时失败](https://github.com/openclaw/openclaw/issues/152992)
- **重要性**：P0、影响发布体验。`openclaw update` 因 Windows 长路径前缀处理异常而触发 `mkdir ENOENT`，可能直接阻断用户升级。
- **社区反应**：9 条评论、0 点赞；已标记 stale、需维护者评审，且在主分支难以复现。
- **关注点**：需要明确路径规范化方案，并在不同 Windows、Node.js 和安装方式下补充回归测试。

### 2. [崩溃恢复后延迟回收提交失败，导致 Agent 永久不可用](https://github.com/openclaw/openclaw/issues/166634)
- **重要性**：P0，涉及会话状态和消息丢失。Gateway 非正常退出后，Agent 可能持续对 `chat.history`、`chat.metadata`、`models.list` 等接口返回 `UNAVAILABLE`。
- **社区反应**：8 条评论、0 点赞；需要可复现材料和进一步维护者调查。
- **关注点**：崩溃恢复应具备事务性，回收检查点过期时不能永久封锁 Agent。

### 3. [Linux 全局安装更新失败](https://github.com/openclaw/openclaw/issues/152995)
- **重要性**：P0、发布阻断级问题。用户从 2026.9.4 更新到目标版本失败，影响 Linux/x64 自动升级流程。
- **社区反应**：4 条评论、0 点赞；报告已被系统确认，但当前缺少进一步定位信息。
- **关注点**：应明确失败发生在下载、安装、切换版本还是状态迁移阶段，并提升失败报告的可诊断性。

### 4. [macOS ARM64 全局安装更新失败](https://github.com/openclaw/openclaw/issues/153026)
- **重要性**：与上一条共同说明全局安装更新链路仍存在跨平台不稳定性。
- **社区反应**：4 条评论、0 点赞；已确认问题，但处于 stale、等待补充信息状态。
- **关注点**：需要覆盖 npm 全局安装、Node 26、Apple Silicon 和版本精确锁定等组合场景。

### 5. [中断会话后 Gateway 静默拒绝所有新顶层消息](https://github.com/openclaw/openclaw/issues/152999)
- **重要性**：P1、涉及消息丢失。根因被指向 `rootWork` 状态与 `AsyncLocalStorage` 泄漏，影响 WeCom、Webhook 和直连等多种渠道。
- **社区反应**：4 条评论、0 点赞；暂无新修复 PR，需维护者评审。
- **关注点**：这是跨渠道的路由级故障，用户侧可能只看到消息“发送成功但没有响应”。

### 6. [Codex app-server 0.163.0 与托管运行时版本不匹配](https://github.com/openclaw/openclaw/issues/177742)
- **重要性**：新版 Codex app-server 会触发运行时版本警告，而被移除的托管运行时路径仍可能被配置引用。
- **社区反应**：4 条评论、0 点赞；被评为 P3 和体验摩擦问题。
- **关注点**：需要同步更新运行时 pin、检测逻辑及旧配置迁移策略，避免警告掩盖真实启动失败。

### 7. [`channels add` 将凭据写入错误渠道](https://github.com/openclaw/openclaw/issues/180060)
- **重要性**：新发现且可直接造成配置错误。位置参数与 `--channel` 冲突时，CLI 静默选择后者，token 等凭据可能被写入非预期渠道。
- **社区反应**：1 条评论、0 点赞；当前没有明确标签，但具有安全与数据完整性风险。
- **关注点**：CLI 应在参数冲突时直接报错，禁止静默覆盖并写入敏感凭据。

### 8. [项目 `.env` 可覆盖全局 Vault 和 1Password 配置](https://github.com/openclaw/openclaw/issues/180054)
- **重要性**：P1、安全敏感。项目级 `.env` 优先于受信任的全局配置，可覆盖 `VAULT_ADDR`、`VAULT_NAMESPACE`、`VAULT_TOKEN`、`CLAW_1PASSWORD_OP` 等密钥源。
- **社区反应**：1 条评论、0 点赞；已标记需要安全评审，属于配置隔离边界问题。
- **关注点**：项目环境变量不应覆盖安全存储路由，相关键名应进入禁止覆盖或来源优先级保护名单。

### 9. [更新过程触发 clean-check 失败](https://github.com/openclaw/openclaw/issues/177865)
- **重要性**：P2、影响更新体验。2026.9.9 在 Linux/x64、Node.js 26.3.0 环境下无法完成更新。
- **社区反应**：1 条评论、0 点赞；问题已确认，但缺乏足够环境细节。
- **关注点**：需要明确 clean-check 的具体阶段、触发条件及是否可安全重试。

### 10. [Tavily、Firecrawl、DuckDuckGo 忽略搜索结果数和超时配置](https://github.com/openclaw/openclaw/issues/180062)
- **重要性**：影响 Agent 搜索成本、响应时延和结果完整性。`tools.web.search.maxResults` 与 `timeoutSeconds` 在三个 Provider 中均未生效。
- **社区反应**：暂无评论和点赞；对应修复 PR 已在当日推进，并已关闭。
- **关注点**：这是配置契约与 Provider 实现不一致的问题，未来需要增加跨 Provider 配置测试。

---

## 4. 重要 PR 进展

### 1. [恢复 Control UI 启动性能余量](https://github.com/openclaw/openclaw/pull/179919)
- 减少 Control UI 首次加载的 gzip 体积和 JavaScript 请求数。
- 初始 shell 下载量减少约 8,476 gzip 字节，并减少两个 JS 请求。
- 目标是在不提高性能基线或资源上限的情况下恢复启动余量。

### 2. [Gateway 包发布后通知 Windows 监控组件](https://github.com/openclaw/openclaw/pull/173567)
- 在 Gateway 新包发布后触发 Windows 侧功能差距监控。
- 可更快发现新增 Gateway 能力尚未被 Windows 节点采用的问题。
- 涉及跨仓库发布事件和安全边界，完成度标记为“需要证明”。

### 3. [模型回退链与别名添加时警告未知模型](https://github.com/openclaw/openclaw/pull/180065)
- 扩展现有模型配置保护：`models fallbacks add`、`image-fallbacks add` 和 `aliases add` 也会检查模型 ID。
- 对已知 Provider 下的拼写错误或不存在的模型给出警告。
- 目标是减少模型回退链静默失效。

### 4. [退役旧 Heartbeat 执行器并完成 Automations 迁移](https://github.com/openclaw/openclaw/pull/179526)
- 将定时任务的调度、唤醒和响应职责统一到 Automations 与 Session Controller。
- 旧 heartbeat executor、wake scheduler 和 response tool 将被移除。
- 属于大型兼容性重构，涵盖 Gateway、CLI、Web UI、Memory、Codex、xAI、Docker 和多个渠道扩展。

### 5. [修复 Agent 绑定/解绑与路由规则大小写不一致](https://github.com/openclaw/openclaw/pull/180063)
- `agents bind` 与 `agents unbind` 现在按实际路由规则识别渠道。
- 手工配置中的 `"Telegram"` 等大小写形式可与路由层的 `telegram` 正确匹配。
- 避免绑定已经存在却无法被命令解除的问题。

### 6. [OAuth 刷新失败时保留有效登录状态](https://github.com/openclaw/openclaw/pull/178646)
- 针对临时 OAuth refresh 失败引入由 Provider 侧证据驱动的恢复策略。
- 避免仅根据状态码盲目重试并错误使会话失效。
- 属于认证 Provider 和安全边界变更，需要安全评审。

### 7. [会话列表读取时直接过滤归档记录](https://github.com/openclaw/openclaw/pull/179939)
- 在列表遍历阶段直接过滤归档会话，避免先创建中间数组再重复遍历。
- 保持归档语义、分页、过滤条件和查看器披露行为不变。
- PR 已关闭，表明该性能优化已完成或以其他方式落地。

### 8. [在配置读取时脱敏内联 `env.vars`](https://github.com/openclaw/openclaw/pull/180061)
- `openclaw config get env` 及 Gateway 配置读取不再直接暴露内联环境变量值。
- 尤其覆盖 `AZURE_OPENAI_KEY`、含密码的 `DATABASE_URL` 等不一定会被传统 secret 命名规则识别的值。
- 可降低日志、终端输出和诊断信息中的凭据泄露风险。

### 9. [支持无 Content-Type 响应中的 HTML 正文提取](https://github.com/openclaw/openclaw/pull/180064)
- 对缺少 `Content-Type` 但实际返回 HTML 的服务器响应进行正文识别。
- 使 `web_fetch` 能继续执行 Readability、HTML fallback 和隐藏内容清理。
- 避免模型直接接收原始 `<script>`、HTML 标签和页面噪声。

### 10. [为 `agents_wait` 返回明确的参数错误](https://github.com/openclaw/openclaw/pull/180050)
- 当 `ids` 缺失或错误传入单个字符串时，不再因 TypeError 导致 HTTP 500。
- 改为返回可供模型或调用方理解的工具输入错误。
- 提升工具调用失败的可诊断性和错误恢复能力。

---

## 5. 功能需求趋势

### 更新、安装与平台稳定性
- Windows、Linux、macOS 的自动更新仍是社区最高优先级之一。
- 用户期待更新失败具备明确错误阶段、可复现信息和安全重试能力。
- Windows 生命周期、运行时 pin 与包发布监控需要形成更完整的闭环。

### 会话可靠性与消息完整性
- 崩溃恢复后 Agent 不应永久不可用。
- 中断会话不能导致后续顶层消息被静默丢弃。
- 延迟回收、SQLite 检查点和 AsyncLocalStorage 状态泄漏是共同关注点。

### 安全配置与凭据保护
- 项目 `.env` 与全局安全配置的优先级需要重新划分。
- CLI 写入凭据时必须校验目标渠道，避免静默写错位置。
- 配置读取、诊断输出和 Web UI 展示都要求默认脱敏。

### Web 搜索与信息获取质量
- 社区希望 Provider 统一遵守结果数、超时和隐藏内容过滤等全局配置。
- `web_fetch` 需要更可靠地识别 HTML，而不是依赖服务端正确设置 MIME 类型。
- 搜索成本、响应延迟和正文可读性将成为 Agent 工具建设的共同指标。

### CLI 与模型配置体验
- 模型 ID 拼写错误应尽早警告，尤其是回退链和别名场景。
- 渠道、Agent 绑定等命令需要与实际路由规则保持一致。
- 错误参数应返回结构化提示，而非 TypeError 或静默忽略。

### Web UI 性能与交互
- Control UI 首屏体积、JavaScript 请求数和启动余量持续受到关注。
- 状态展示需要更及时，包括聊天完成后的用量刷新、侧边栏状态图标对齐。
- 自动化任务、Solid 响应式状态和 Mermaid 查看器是近期 UI 改进热点。

### 架构现代化
- Heartbeat 向统一 Automations 的迁移仍是主线工作。
- Session Controller 持续强化为任务准入、结算和生命周期的单一所有者。
- Codex、xAI、OAuth 等扩展的认证与运行时兼容性受到更多关注。

---

## 6. 开发者关注点

1. **升级流程必须可预测**：用户最需要的是“能升级、能定位失败、失败后不破坏现有状态”，而不是仅有更新成功或失败的二值结果。
2. **崩溃后必须恢复可用**：会话回收、消息路由和顶层消息接收不能因一次异常中断而永久失效。
3. **敏感配置需要明确信任边界**：项目 `.env` 不应覆盖全局 Vault、1Password 等安全设置；CLI 也不能把凭据静默写入错误目标。
4. **工具参数必须真正生效**：搜索结果数、超时、模型 ID 等配置需要在所有 Provider 和命令路径中保持一致。
5. **错误信息应面向调用方可操作**：相比 HTTP 500、TypeError 或静默成功，明确指出缺失参数、冲突参数或配置不匹配更有价值。
6. **Web UI 性能不能以牺牲功能为代价**：首屏体积优化与异步状态刷新、侧边栏交互、可视化查看器等体验改进并行推进。
7. **大型重构需要强调兼容性**：Heartbeat 退役、OAuth 恢复和 Agent 路由调整均跨越多个扩展与配置边界，需要充分证明旧配置、渠道和认证流程不受破坏。

:::
