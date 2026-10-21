---
title: "AI CLI 工具社区动态日报"
published: 2026-10-21
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-21

> 生成时间: 2026-10-21 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析

**分析日期：2026-10-21**  
> 统计口径基于所提供的 GitHub 过去 24 小时动态；“PR 数”以当日更新或明确列出的 PR 为准，不代表代码改动规模。

## 1. 生态全景

当前主流 AI CLI 已从“模型调用与基础工具执行”阶段，整体转向 **Agent 编排、企业治理、跨平台稳定性和长期运行可靠性** 的竞争。各工具的共同主线高度一致：MCP/OAuth 生命周期、子代理状态准确性、后台任务恢复、会话与压缩数据安全，以及插件/工具扩展的权限治理。与此同时，Windows、macOS、容器、IDE、浏览器和多 Profile 等边界环境暴露出大量一致性问题，说明生态的下一阶段不只是增加能力，而是建立跨入口、跨平台的一致行为契约。部分工具开始进入以稳定性修复、会话级配置和资源治理为主的成熟阶段，而另一些工具则仍处于扩展平台快速扩张期。

---

## 2. 各工具活跃度对比

| 工具 | 今日 Issues | 今日 PR | Release 情况 | 活跃特征 |
|---|---:|---:|---|---|
| **Claude Code** | 10 | 2 | **v2.1.305** | 扩展生态与企业治理议题最突出 |
| **OpenAI Codex** | 10 | 约 14 | **2 个 Rust 预发布版** | MCP 企业认证、权限与跨平台稳定性并进 |
| **Gemini CLI** | 10 | 10 | **v0.66.0-preview.0、v0.65.0、1 个 Nightly** | 子代理可靠性、IDE/容器和工具发现迭代密集 |
| **DeepSeek Reasonix** | 10 | 10 | **v1.39.9、v2.46.0** | 会话恢复、预设、内存与多模型兼容并重 |
| **OpenCode** | 10 | 10 | 无 | v2 稳定性、会话迁移、压缩与 Provider 兼容为主 |
| **DeepSeek Harness** | 0 | 0 | 无 | 当日无活动，暂无法判断持续活跃度 |
| **Hermes** | 5 | 50 | 无 | PR 数量极高，重点在安全、调度和 Windows 兼容 |
| **OpenClaw** | 8 | 50 | 无 | 消息交付、会话恢复、升级迁移和渠道路由集中 |

### 活跃度解读

- **PR 更新量最高的是 Hermes 和 OpenClaw，均为 50 条**，显示两者正处于密集工程治理阶段。
- **Claude Code 的 PR 数仅 2 条**，但其中涉及组织策略覆盖插件，直接触及企业安全核心。
- **Codex 当日发布两个 Rust 预发布版本**，迭代速度高，但缺少详细变更日志，发布透明度仍有提升空间。
- **Gemini CLI、Reasonix、OpenCode 均形成“10 个热点 Issue + 10 个重点 PR”**，是当日信息密度最高的一组工具。
- **DeepSeek Harness 无活动**，可能意味着项目节奏较慢、数据窗口内无更新，也可能是公开仓库活跃度本身有限。

---

## 3. 共同关注的功能方向

### 3.1 MCP 身份认证与凭据生命周期

这是多个工具共同面对、也最具企业落地价值的方向。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | 共享 refresh token 与单次轮换 IdP 冲突；OAuth `redirect_uri` 应使用 `127.0.0.1`；可信设备策略需要 Agent 审批入口 |
| **Codex** | 失效 refresh token 仍被重试；多客户端并发刷新协调；企业凭据与 Codex OAuth grant 的安全复用；Runtime 切换后授权保留 |
| **OpenCode** | OpenAI-compatible Provider 不应被强制注入 `stream_options`、`store` 等非兼容字段 |
| **Hermes** | Godmode dry run 中 `model.default`、Codex OAuth 和 API Key 错误分类混乱 |
| **OpenClaw** | Codex app-server 版本与托管运行时 pin 不一致 |

**共同结论**：MCP 接入的瓶颈已经越过“能否连接”，转向以下核心问题：

1. 凭据是否按用户、连接和运行时隔离；
2. refresh token 失效后能否准确识别并重新认证；
3. OAuth 错误能否区分身份认证、资源授权和 Provider 故障；
4. 配置重载、线程回退和 Provider 切换后授权是否仍然有效。

---

### 3.2 子代理与后台任务的可靠生命周期

多个工具都出现了“执行已经结束，但上层状态不正确”的同类问题。

- **Claude Code**：后台 Bash/Monitor 完成后，进程内子代理未被重新调用；定时或 Routine 会话清理不完整。
- **Codex**：Codex 原生 follow-up 完成后父任务仍被占用；Agent 消息生命周期和 Code Mode cell 生命周期开始被显式跟踪。
- **Gemini CLI**：子代理达到 `MAX_TURNS` 后仍报告 `success/GOAL`；Generalist Agent 可能无限挂起；Wayland Browser Agent 失败后仍显示完成态。
- **OpenCode**：自动压缩可能跳过已持久化的 native subtask；网络切换会静默取消 subagent。
- **Reasonix**：多会话、多子代理存在锁竞争，切换预设还可能因 Skill 快照阻塞 90–165 秒。
- **OpenClaw**：Claude CLI 回合已完成，但最终回复未落盘或投递；transcript 幂等冲突被误判成模型故障并触发全链路 fallback。

**共同结论**：行业正在从“Agent 能调用工具”转向建立统一的 Agent 状态机，至少需要明确区分：

- 任务已执行；
- 结果已持久化；
- 消息已投递；
- 父任务已解除占用；
- 任务因轮次上限、取消或网络变化而终止。

---

### 3.3 插件、Skills 与工具扩展治理

- **Claude Code**：Mods 是最热 Issue；插件 Skill 的 `disable-model-invocation` 语义不清；Cloud Routine 和 Project Thread 不加载仓库级 Skills；组织策略必须覆盖第三方插件。
- **Codex**：插件市场暂存目录持续膨胀；远程精选 Agent Plugin 的 app routing 未生效；云端 Skill 缓存需与认证范围同步。
- **Gemini CLI**：MCP 工具超过约 400 个后触发 HTTP 400；Agent 不主动选择 Skills 和 Subagents；MCP `tools/list` 需要完整分页发现。
- **OpenCode**：插件初始化缓慢会让全部 GitHub Copilot 模型被错误禁用。
- **Hermes**：插件延迟加载与 NumPy/C 扩展在 Windows 上形成 loader-lock 死锁；项目指令文件开始受到写入保护。
- **OpenClaw**：Slack 回退机器人需要严格隔离其他机器人的线程。

**共同结论**：插件生态正在从“可安装”进入“可治理”阶段。核心要求包括：

- 扩展行为必须透明且可预测；
- 组织权限不能被插件绕过；
- 工具数量需要按任务裁剪，而不是全部注入模型；
- 插件初始化失败不能污染其他 Provider；
- 配置、Skill 和 Hook 的加载规则必须在 CLI、Desktop、Cloud 间保持一致。

---

### 3.4 跨平台一致性与资源回收

这是当日最普遍、也最影响企业采用的问题。

- **Codex**：Windows 沙箱进程创建失败、Browser Use 清理崩溃、Git LFS 临时副本泄漏。
- **Gemini CLI**：Wayland Browser Agent 失败；IDE companion 与容器沙箱断连。
- **Reasonix**：Studio 连续打断后内存达到约 6GB；多标签页侧边栏卡顿。
- **OpenCode**：TUI 失焦再聚焦后 `ctrl+x` 失效；客户端重连时历史内容可能折叠。
- **Hermes**：Windows 多 Profile 冷启动固定 60 秒超时；Docker 指南与终端后端配置不一致。
- **OpenClaw**：升级被旧 SQLite 表阻塞；全局 npm 安装更新失败。

**共同结论**：AI CLI 正在成为真正的开发环境入口，因此必须承担传统 IDE、终端、容器和包管理器的工程责任，包括长路径、进程句柄、临时文件、内存、崩溃恢复和安装升级。

---

### 3.5 会话、压缩与历史数据安全

- **Codex**：压缩 rollout 搜索开始并发化，Code Mode 结果缓冲时间可观测。
- **Gemini CLI**：恢复会话时避免重复 tool response turn；持久化任务状态需求持续增长。
- **Reasonix**：修复索引缺失导致全部会话不可读，并增加索引自愈；历史损坏源不再静默显示为“无结果”。
- **OpenCode**：v1→v2 迁移遗漏、压缩冲突错误清除 Undo 状态、客户端重同步丢失折叠历史。
- **OpenClaw**：崩溃后 SQLite session reclamation 失败，整个 Gateway 可能持续 `UNAVAILABLE`。

**共同结论**：会话数据已成为 Agent 的核心资产，不能再由压缩、迁移、重连、升级等操作“顺手处理”。数据操作需要具备原子性、可恢复性、版本兼容性和明确的数据损坏提示。

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线与竞争特点 |
|---|---|---|---|
| **Claude Code** | Mods、Hooks、Plugins、组织策略、MCP OAuth | 大型工程团队、企业开发环境 | 以 Claude Code 为核心扩展平台，强化插件生态与企业治理闭环 |
| **Codex** | MCP 企业认证、沙箱审批、Code Mode、Agent Plugin | 企业自动化、IDE/桌面/云多入口用户 | 依托 OpenAI 账户与运行时体系，建设多入口 Agent 基础设施 |
| **Gemini CLI** | 多 Agent、IDE companion、容器集成、MCP 工具发现 | Google/开源生态用户、复杂代码库开发者 | 强调 Agent 编排、代码库理解和工具动态发现，迭代速度快 |
| **DeepSeek Reasonix** | 会话级 Agent 预设、多模型 Provider、Studio 工作台 | 深度使用多模型、需要可视化工作台的个人或团队 | 兼容多 Provider，以桌面工作台、预设和文件交付形成差异化 |
| **OpenCode** | Provider 开放性、v2 会话系统、TUI/Desktop 体验 | 多 Provider 用户、偏好本地 CLI 的开发者 | 强调模型和认证自由度，核心诉求是避免 Provider“一刀切”限制 |
| **Hermes** | Kanban 调度、委派、审批、Docker、本地模型 | 多任务自动化、复杂网关和本地部署用户 | 偏平台化工程，强调安全边界、任务隔离和可调度性 |
| **OpenClaw** | 跨渠道消息、Gateway、Provider 路由、多 Agent | 需要 Discord/Slack/Telegram 等渠道集成的自动化用户 | 以 Gateway 和消息路由为核心，重点解决可靠交付与渠道隔离 |
| **DeepSeek Harness** | 当日信息不足 | 暂无法判断 | 缺少当日 Release、Issue 和 PR 活动，公开生态信号较弱 |

### 定位差异概括

- **Claude Code** 争夺的是“可治理的企业 Agent 开发平台”。
- **Codex** 争夺的是“跨 CLI、IDE、桌面和云的 OpenAI Agent 运行时”。
- **Gemini CLI** 更强调多 Agent、IDE/容器边界和代码库效率。
- **OpenCode** 强调模型自由度及多 Provider 兼容。
- **Reasonix** 强调多模型桌面工作台和会话级配置。
- **Hermes** 更接近任务调度与自动化平台。
- **OpenClaw** 的差异化核心是消息渠道、Gateway 和 Provider 路由。

---

## 5. 社区热度与成熟度

### 社区热度

#### 第一梯队：高密度、跨议题活跃

1. **Hermes**
   - 当日 50 条 PR 更新、5 个 Issue 更新。
   - PR 覆盖安全、调度、插件、Windows、Docker、隐私路由等多个方向。
   - 属于高强度工程迭代，但 Issues 样本量相对有限。

2. **OpenClaw**
   - 50 条 PR 更新、8 个 Issue 更新。
   - 议题集中且生产导向明显，尤其值得注意 P0 会话恢复问题和静默消息丢失问题。
   - 工程吞吐高，但系统边界复杂，状态机风险也最高。

3. **Gemini CLI / Reasonix / OpenCode**
   - 三者均为 10 个热点 Issue、10 个重点 PR。
   - 信息密度高，问题覆盖从核心 Agent 行为到桌面端细节。
   - 说明均处于功能与稳定性并重的快速迭代阶段。

4. **Codex**
   - 10 个热点 Issue、约 14 个明确 PR，并发布两个预发布版本。
   - 活跃度很高，但大量企业认证和 Runtime 改动意味着兼容验证压力较大。

#### 第二梯队：核心生态驱动型

- **Claude Code**
  - Issue 数量与其他主流工具相当，但 PR 更新量较低。
  - 热度主要集中于 Mods/插件生态，而不是大量独立功能提交。
  - 其社区关注点具有较强“平台治理”特征，Issue 的长期影响可能大于短期 PR 数量。

#### 活跃度不足或待观察

- **DeepSeek Harness** 当日无活动，无法据此判断项目处于维护、停顿或开发节奏调整阶段。

### 成熟度判断

| 成熟度阶段 | 工具 | 判断 |
|---|---|---|
| **成熟度提升期** | Claude Code、Reasonix | 版本节奏稳定；重点转向扩展治理、历史恢复、内存与多会话稳定性 |
| **快速工程迭代期** | Codex、OpenClaw、Hermes | 企业能力和平台边界快速扩张，但认证、状态机和跨平台风险较高 |
| **快速产品迭代期** | Gemini CLI、OpenCode | Agent 体验、IDE/桌面交互和 Provider 兼容快速演进，状态稳定性仍需加强 |
| **信号不足** | DeepSeek Harness | 当日无社区活动，暂不宜判断整体成熟度 |

需要强调：**Issue 多不等于成熟度低，PR 多也不等于产品更成熟**。真正成熟度的标志应是错误可解释、状态一致、升级可恢复，以及跨平台行为稳定。

---

## 6. 值得关注的趋势信号

### 趋势一：Agent 状态机成为公共基础设施

多个项目同时出现“执行成功但结果未提交”“达到上限却报告成功”“任务取消但父任务仍锁定”等问题。

**参考价值**：  
评估 AI CLI 时，应重点检查其状态机，而不仅是模型能力。建议重点验证：

- 工具执行与结果提交是否原子化；
- 失败、超时、取消、轮次上限是否有独立状态；
- 重启后能否恢复未完成任务；
- 多 Agent 父子关系能否正确解除占用。

---

### 趋势二：MCP 从插件协议走向企业身份基础设施

MCP 的核心矛盾已从连接数量转向 OAuth、token 轮换、用户隔离、企业授权和运行时切换。

**参考价值**：  
企业选型不应只问“支持多少 MCP Server”，还应核查：

- 是否支持动态客户端注册；
- 是否支持单次轮换 refresh token；
- 凭据是否按用户和连接隔离；
- Runtime 重载后授权是否保留；
- 身份错误和资源授权错误是否可区分。

---

### 趋势三：插件治理将取代“插件数量”成为竞争指标

Claude Code、Codex、Gemini CLI、Hermes 和 OpenClaw 都在强化插件、Skill、Hook、Agent Plugin 或 Provider 扩展的治理。

**参考价值**：  
插件生态的下一阶段会围绕以下能力展开：

- 组织策略覆盖第三方插件；
- 工具按任务动态裁剪；
- 插件故障隔离；
- 指令文件写入保护；
- Skill、Hook 和配置跨入口一致性。

---

### 趋势四：跨平台一致性成为产品级指标

Windows、macOS、Linux、IDE、Web、Mobile、Container 的行为差异，已经频繁阻断核心任务。

**参考价值**：  
技术团队应建立能力矩阵，而不是只依赖 macOS/Linux CLI 的主路径测试。至少应覆盖：

- 沙箱与进程创建；
- 长路径及大仓库；
- OAuth 回调；
- IDE 重连；
- 临时文件与内存回收；
- 升级和数据库迁移。

---

### 趋势五：长会话和长任务将重塑资源治理

内存达到数 GB、临时文件泄漏、预设快照阻塞、子任务锁竞争、压缩遗漏任务，说明长会话已经突破传统 CLI 的使用模式。

**参考价值**：  
未来选型应重点关注：

- 内存上限和回收策略；
- 后台任务并发预算；
- 会话压缩期间的调度正确性；
- 索引及历史数据自愈；
- 长任务恢复与可观测性。

---

### 趋势六：安全策略必须可解释、可审批

多个工具开始修复“合法请求被安全检查误拦截”“界面显示可审批但实际禁止”“组织策略与插件行为冲突”等问题。

**参考价值**：  
安全能力的评价标准应从“是否能拦截”升级为：

1. 是否准确识别授权上下文；
2. 是否提供具体拒绝原因；
3. 是否支持受控审批；
4. 是否允许策略覆盖插件和子代理；
5. 是否具备策略可观测性。

---

### 趋势七：模型透明度与 Provider 能力协商将成标配

OpenCode 对实际 checkpoint 透明度的需求，以及各工具对 OpenAI-compatible 字段差异的处理，表明“显示模型名”已不足以支持复现和故障诊断。

**参考价值**：  
建议在工具评估中要求提供：

- 实际模型版本或 checkpoint；
- 路由及降级记录；
- Provider 能力声明；
- 可选请求字段的协商机制；
- 认证来源及过期状态；
- 工具调用与 token 使用明细。

---

## 决策建议

- **企业团队优先关注**：Claude Code、Codex，重点评估插件治理、组织策略和 MCP 身份体系。
- **重度多 Agent 用户优先关注**：Gemini CLI、Hermes，重点评估任务状态机、后台恢复和并发隔离。
- **多渠道自动化优先关注**：OpenClaw，重点评估消息幂等、落盘、投递和 Gateway 恢复。
- **多模型与 Provider 自由度优先关注**：OpenCode、Reasonix，重点

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据范围：github.com/anthropics/skills  
> 数据截止：2026-10-21  
> 说明：所给热门 PR 的评论数与点赞数均显示为 `undefined/0`，因此 PR 热度主要依据关联 Issue、近期更新时间和问题影响范围综合判断；状态均以列表中标注为准。

## 1. 热门 Skills 排行

### 1. `skill-creator`：Skill 创建、评估与安全加固

**关联 PR：**

- [PR #1298：隔离 trigger evals，处理 Windows 与运行时失败](https://github.com/anthropics/skills/pull/1298)
- [PR #1681：支持直接执行 `package_skill.py`](https://github.com/anthropics/skills/pull/1681)
- [PR #1961：加固 eval viewer，修复脚本注入、DNS rebinding 与跨站 POST 风险](https://github.com/anthropics/skills/pull/1961)
- [PR #1997：正确解析 YAML frontmatter 标量](https://github.com/anthropics/skills/pull/1997)

**功能：**  
用于创建、校验、打包和评估 Claude Code Skill，是整个生态的基础设施型 Skill。

**社区讨论热点：**

- Trigger evaluation 误判、跨 Worker 竞争和 Windows 兼容性问题。
- 评测 Viewer 存在 XSS、DNS rebinding、跨站请求及属性转义问题。
- YAML 解析与真实 Skill 元数据不一致，可能导致评估输入被错误修改。
- 打包脚本不能独立运行，文档中的使用路径也已过时。

**当前状态：**  
相关 PR 均为 **Open**。其中安全加固、YAML 解析和触发评估修复具有较高落地价值。

---

### 2. `mcp-builder`：MCP 服务构建、连接与评估

**关联 PR / Issue：**

- [PR #1742：支持 MCP 2.x 的 `streamable_http_client` 与自定义 Headers](https://github.com/anthropics/skills/pull/1742)
- [Issue #1390：真实 MCP Server 的评估结果始终为 0/N](https://github.com/anthropics/skills/issues/1390)

**功能：**  
帮助开发者创建、连接、测试和评估 MCP Server 及其工具调用。

**社区讨论热点：**

- MCP SDK 升级后客户端 API 名称和配置方式发生变化。
- 自定义 HTTP Headers 缺乏稳定、符合新 SDK 的配置路径。
- 评估器对真实 MCP 返回值处理错误，将 `TextContent` 转换成伪造的工具错误，导致所有工具调用失败。
- 评估失败被静默吞掉，使开发者难以区分真实缺陷与测试框架 Bug。

**当前状态：**  
PR #1742 为 **Open**；关联 Issue #1390 也仍为 **Open**。MCP 2.x 兼容和评估链路可靠性是近期最明确的技术需求。

---

### 3. `docx`：Word 文档生成、编辑与质量验证

**关联 PR / Issue：**

- [PR #1792：LibreOffice 超时时报错，并验证修订标记是否清除](https://github.com/anthropics/skills/pull/1792)
- [Issue #2018：`merge_runs.py` 丢失局部 namespace，生成无效 XML](https://github.com/anthropics/skills/issues/2018)

**功能：**  
创建、修改、转换和验收 DOCX 文档，覆盖修订接受、格式保留及输出验证。

**社区讨论热点：**

- LibreOffice 超时后仍被误报为成功。
- 仅执行转换不代表文档修订已真正处理完成，需要检查 `w:ins`、`w:del` 等 XML 标记。
- 合并文本 Run 时会删除源 Run 的 namespace 声明，可能产生未绑定 XML 前缀。
- 文档生成正在从“能产出文件”转向“必须可验证、可交付”。

**当前状态：**  
PR #1792 为 **Open**；Issue #2018 为 **Open**。正确性修复优先级较高。

---

### 4. `claude-api`：Claude API 开发指南与知识加载

**关联 PR / Issue：**

- [PR #1730：替换 academy-guide 与 tool-use-concepts 中的失效链接](https://github.com/anthropics/skills/pull/1730)
- [Issue #1487：单次工具调用可能注入约 156k tokens，耗尽上下文窗口](https://github.com/anthropics/skills/issues/1487)

**功能：**  
提供 Claude API、工具调用和 Claude Academy 相关开发指导。

**社区讨论热点：**

- 文档 URL 失效，影响开发者按照指南完成工具调用集成。
- Skill 内容加载过于激进，单次调用可能占用极大上下文。
- 用户需要“按需加载”和知识分层，而不是将全部参考资料直接注入上下文。

**当前状态：**  
PR #1730 为 **Open**；Issue #1487 仍为 **Open**。链接修复容易落地，而上下文治理需要 Skill 架构层面的调整。

---

### 5. `webapp-testing`：Web 应用自动化测试与元素发现

**关联 PR：**

- [PR #1976：正确报告 `textarea` 和 `select` 元素](https://github.com/anthropics/skills/pull/1976)

**功能：**  
驱动浏览器测试 Web 应用、发现页面元素并检查交互行为。

**社区讨论热点：**

- 元素发现逻辑曾把 `textarea`、`select` 错误地统一报告为 `text`。
- 自动化测试结果必须准确反映真实 HTML 标签，否则会误导定位和修复。
- 社区期待从“能够点击页面”进一步提升到“可靠识别元素并验证行为”。

**当前状态：**  
PR #1976 为 **Open**，属于范围较小但直接影响测试可信度的修复。

---

### 6. `algorithmic-art`：程序化图形与图像生成

**关联 PR：**

- [PR #1977：`wrapAround()` 正确处理负数和越界输入](https://github.com/anthropics/skills/pull/1977)

**功能：**  
生成算法艺术、渐变和程序化视觉效果。

**社区讨论热点：**

- 负数输入与大于最大值的输入未被正确归一化。
- 修复后结果稳定落在 `[0, max)` 区间。
- 创意类 Skill 同样要求可重复、可验证的数学行为，而非仅生成视觉结果。

**当前状态：**  
PR #1977 为 **Open**，修复目标明确，技术落地成本较低。

---

### 7. `document-typography`：AI 文档排版质量控制

**关联 PR：**

- [PR #514：新增文档排版质量检查 Skill](https://github.com/anthropics/skills/pull/514)

**功能：**  
检测并指导修复孤行、寡行、标题悬挂和编号错位等排版问题。

**社区讨论热点：**

- AI 生成的文档经常存在单词悬挂、标题落单和列表编号偏移。
- 用户通常只要求“生成文档”，不会额外要求排版检查，因此需要内建式质量门禁。
- 文档 Skill 正从内容生成扩展到视觉与出版级质量控制。

**当前状态：**  
PR #514 为 **Open**，创建时间较早但仍在维护，具有明显的通用文档工作流价值。

---

### 8. `notion-spec-to-implementation` / `quantitative-resume-auditor`

**关联 PR：**

- [PR #1245：新增规格到实现及量化简历审计 Skills](https://github.com/anthropics/skills/pull/1245)

**功能：**

- 将产品或技术规格拆解为可执行的 Notion 任务、验收标准和进度跟踪。
- 审计简历中的量化成果与声明质量。

**社区讨论热点：**

- 从自然语言规格到工程任务、验收条件和状态管理的自动转化。
- 将领域专用质量标准封装为独立 Skill。
- PR 同时包含两个 Skill，说明社区更关注“可落地工作流”而非单点工具。

**当前状态：**  
PR #1245 为 **Open**，且截至 2026-10-15 仍有更新，具备继续完善和近期合入的可能。

---

## 2. 社区需求趋势

### 工作流自动化与组织级共享

[Issue #228：支持 Claude.ai 组织级 Skill 共享](https://github.com/anthropics/skills/issues/228) 是社区最明确的产品需求之一。团队目前仍需下载 `.skill` 文件并通过 Slack、Teams 手工传播，官方希望提供共享库或直接分享链接。

**趋势：** Skill 正从个人本地资产转向团队级知识与流程基础设施。

### Agent 质量门禁与交付验证

[Issue #1385：Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385) 提出三阶段流程：

1. 任务前校准；
2. 对抗式审查；
3. 交付前验证。

此外，[Issue #202：`skill-creator` 应采用最佳实践](https://github.com/anthropics/skills/issues/202) 和相关 PR 都强调减少纯说明性文本，增加可直接执行、可验证的指令。

**趋势：** 社区希望 Skill 不只“生成内容”，而是承担检查、纠错和验收责任。

### 安全、信任边界与 Skill 治理

[Issue #492：社区 Skill 冒用 `anthropic/` 命名空间](https://github.com/anthropics/skills/issues/492) 是评论最活跃的 Issue。社区 Skill 若以官方命名空间分发，用户可能误授予更高权限。

相关治理方向还包括：

- [Issue #412：Agent Governance Skill](https://github.com/anthropics/skills/issues/412)
- [Issue #1394：eval-viewer 存在显示路径 XSS](https://github.com/anthropics/skills/issues/1394)
- [PR #1961：eval viewer 安全加固](https://github.com/anthropics/skills/pull/1961)

**趋势：** 来源认证、权限分级、静态安全分析和审计追踪会成为社区 Skill 的基础能力。

### 长期记忆与上下文压缩

[Issue #1329：提出 `compact-memory` Skill](https://github.com/anthropics/skills/issues/1329) 聚焦将长上下文中的代理状态保存为紧凑符号表示，以降低长期运行 Agent 的上下文成本。

结合 [Issue #1487：`claude-api` 一次注入约 156k tokens](https://github.com/anthropics/skills/issues/1487)，可以看出社区对上下文经济性的关注不断上升。

**趋势：** 记忆压缩、按需检索和渐进式上下文加载是明确方向。

### 可靠的测试、评估与调试基础设施

社区关注点已经不只是“有没有测试工具”，而是：

- 触发率是否真实，[Issue #556](https://github.com/anthropics/skills/issues/556) 报告 `run_eval.py` 触发率为 0%；
- 评估器是否能正确处理真实 MCP Server，[Issue #1390](https://github.com/anthropics/skills/issues/1390)；
- Web 元素发现是否准确，[PR #1976](https://github.com/anthropics/skills/pull/1976)；
- 图像算法是否覆盖边界输入，[PR #1977](https://github.com/anthropics/skills/pull/1977)。

**趋势：** 可重复、可诊断、不会静默误报的测试与评估基础设施比新的测试框架更受关注。

### 文档可靠性和格式保真

社区持续报告文档 Skill 的底层问题：

- DOCX XML namespace 丢失：[Issue #2018](https://github.com/anthropics/skills/issues/2018)
- LibreOffice 超时误报成功：[PR #1792](https://github.com/anthropics/skills/pull/1792)
- 排版质量问题：[PR #514](https://github.com/anthropics/skills/pull/514)

**趋势：** 需求从“生成 DOCX”升级为“生成可打开、语义正确、视觉合格且经过自动验收的文档”。

### 插件内容去重与上下文治理

[Issue #189：`document-skills` 与 `example-skills` 包含相同 Skill](https://github.com/anthropics/skills/issues/189) 导致重复加载和上下文浪费。

**趋势：** 插件边界、Skill 命名空间、重复检测和上下文占用将成为生态治理重点。

---

## 3. 高潜力待合并 Skills

> “评论活跃”无法直接从 PR 评论数确认，以下优先列出有明确 Issue 驱动、持续更新或兼具较高通用价值且仍为 Open 的 PR。

### 第一梯队：生态影响较大

1. **[PR #1298：修复 `skill-creator` Trigger Eval](https://github.com/anthropics/skills/pull/1298)**  
   直接影响 Skill 开发、评估正确性和跨平台稳定性，尤其适合优先合入。

2. **[PR #1961：加固 `skill-creator` Eval Viewer](https://github.com/anthropics/skills/pull/1961)**  
   涉及脚本注入、DNS rebinding、跨站 POST 和输出转义，安全价值高。

3. **[PR #1742：修复 `mcp-builder` 的 MCP 2.x 兼容性](https://github.com/anthropics/skills/pull/1742)**  
   MCP SDK 已进入 2.x，客户端函数重命名和 Header 配置变化会造成现实集成阻塞。

4. **[PR #1792：增强 DOCX 输出验收](https://github.com/anthropics/skills/pull/1792)**  
   修复“超时却报告成功”的错误路径，并增加修订标记验证，可靠性提升明确。

5. **[PR #1997：正确解析 Skill YAML frontmatter](https://github.com/anthropics/skills/pull/1997)**  
   影响 Skill 描述、评估和优化命令的输入一致性，属于基础设施型修复。

### 第二梯队：通用性较强、落地成本较低

6. **[PR #1977：修复 `algorithmic-art` 的 `wrapAround()`](https://github.com/anthropics/skills/pull/1977)**  
   边界行为明确，测试和合入成本较低。

7. **[PR #1976：修复 `webapp-testing` 元素类型识别](https://github.com/anthropics/skills/pull/1976)**  
   可直接提高自动化测试和页面定位的可靠性。

8. **[PR #1681：支持直接执行 `package_skill.py`](https://github.com/anthropics/skills/pull/1681)**  
   改善 Skill 打包工具的独立可用性，并同步修正文档路径。

### 潜力较高但仍需完善

9. **[PR #1245：规格到实现与简历审计 Skills](https://github.com/anthropics/skills/pull/1245)**  
   应用场景明确，但一个 PR 同时提交多个 Skill，范围较大，需要拆分和增强验收。

10. **[PR #210：提升 `frontend-design` 的清晰度与可执行性](https://github.com/anthropics/skills/pull/210)**  
    高频使用场景，但需要与现有 Skill 规范和实际模型行为充分对齐。

11. **[PR #538：修复 PDF 文档大小写路径](https://github.com/anthropics/skills/pull/538)**  
    影响 Linux 等大小写敏感环境，修复简单直接。

12. **[PR #1730：替换 Claude API 失效链接](https://github.com/anthropics/skills/pull/1730)**  
    属于低风险维护型更新，验证过目标 URL，可快速合入。

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求，是建立一套“可信、可验证、可协作”的生产级工作流：既要明确官方与社区 Skill 的信任边界，也要让每个 Skill 能可靠触发、正确执行、自动验收，并避免重复加载和上下文浪费。**

---

# Claude Code 社区动态日报｜2026-10-21

## 1. 今日速览

- **v2.1.305 发布**：Linux 沙箱新增嵌套用户命名空间支持，并调整无人值守重试模式的使用限制检查间隔，核心方向是增强容器工具兼容性。
- **社区讨论仍围绕 Mods/插件扩展能力展开**：高热度 Issue 聚焦“让 Claude Code 更可扩展”，但当前插件与组织策略、信任设备、OAuth 等能力之间仍存在明显集成缺口。
- **问题治理与平台适配成为另一条主线**：包括 Issue 自动关闭机制、Windows 路径长度、远程 MCP OAuth、子代理后台任务、Cloud Skills 加载和终端快捷键等问题受到关注。

---

## 2. 版本发布

### v2.1.305

本版本主要更新：

- 新增 `sandbox.allowNestedUserNamespaces`：
  - 允许 Linux 沙箱命令创建嵌套用户命名空间。
  - Chromium、rootless Podman 等依赖用户命名空间的工具因此更易在沙箱内运行。
  - 需要注意的是，这会扩大沙箱命令绕过部分文件保护的能力，部署时应结合容器权限和策略审慎配置。
- 新增 `CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS`：
  - 用于调整无人值守重试模式下用量限制的重新检查间隔。
  - 有助于优化自动重试与限流恢复行为。

[Release v2.1.305](https://github.com/anthropics/claude-code/releases)

---

## 3. 社区热点 Issues

> 以下按照讨论热度、👍 数量、影响范围和生态重要性筛选。

### 1. Mods：让 Claude Code 更具可扩展性

- **热度**：267 条评论、131 个 👍，是本轮最热 Issue。
- **重要性**：Mods 是当前 Claude Code 扩展生态的核心方向，涉及 Hooks、Plugins、自定义能力和组织级策略。生态能否进一步开放，直接影响第三方工具、团队工作流和企业治理能力。
- **社区反应**：用户持续提交反馈，维护者也多次发布社区阶段性更新，说明该功能正在快速迭代，但离“稳定插件平台”仍有距离。

[#91870 — Mods - make Claude 10x more extensible](https://github.com/anthropics/claude-code/issues/91870)

### 2. 超过 6000 个带 `has repro` 标签的 Issue 被自动关闭

- **热度**：19 条评论、105 个 👍。
- **重要性**：这直接关系到开发者反馈是否会被错误地当作过期问题处理，尤其是已经具备稳定复现步骤的 Bug。Issue 自动治理若缺少可靠的状态机，容易让有效问题长期失去维护者关注。
- **社区反应**：社区对批量关闭机制明显不满；105 个 👍 表明用户希望提高自动关闭策略的透明度和准确率。

[#87647 — Over 6k issues labeled with “has repro” have been auto-closed](https://github.com/anthropics/claude-code/issues/87647)

### 3. Remote MCP OAuth 的共享刷新令牌不兼容单次轮换 IdP

- **热度**：6 条评论，具备稳定复现。
- **重要性**：OAuth 是 Remote MCP 接入企业身份系统的关键路径。单次刷新令牌轮换、动态客户端注册和用户级凭据共享之间存在设计冲突，可能导致多个会话或用户之间的认证状态互相影响。
- **社区反应**：问题获得中等关注，核心诉求是改善凭据隔离，并兼容 OIDC 单次刷新令牌模式。

[#91641 — Remote MCP OAuth shared refresh token breaks with rotation](https://github.com/anthropics/claude-code/issues/91641)

### 4. OAuth 重定向地址使用 `localhost`，不符合 RFC 8252 建议

- **热度**：17 条评论、37 个 👍。
- **重要性**：`localhost` 与 `127.0.0.1` 在部分网络、代理和 OAuth 策略环境中的处理不同。该问题可能影响本地 MCP 回调、SSRF 防护和受管浏览器环境。
- **社区反应**：讨论热度较高，属于标准兼容性和安全策略一致性问题，维护价值明确。

[#42765 — OAuth redirect_uri uses localhost instead of 127.0.0.1](https://github.com/anthropics/claude-code/issues/42765)

### 5. Cloud Routine 和 Project Thread 未加载仓库内 `.claude/skills/`

- **热度**：新 Issue，已有 2 条评论。
- **重要性**：这是新出现的生态一致性问题：同一仓库中的 `settings.json` 和 Hooks 可以加载，但 Skills 不生效。对依赖仓库级配置实现“开箱即用”的 CI/CD、自动化 Routine 和团队模板尤其不利。
- **社区反应**：关注时间尚短，但复现描述清晰，值得优先观察官方定位与修复版本。

[#103851 — Cloud routine runs and Project threads do not load repo-committed skills](https://github.com/anthropics/claude-code/issues/103851)

### 6. 插件中设置 `disable-model-invocation: true` 的 Skills 被完全隐藏

- **热度**：3 条评论、2 个 👍。
- **重要性**：该配置本意通常是禁止模型自动调用，但当前实现将相关 Skill 从可调用列表中整体移除，可能连用户显式调用也不可用。这暴露出插件元数据、权限控制和 Skill 注册逻辑之间的语义冲突。
- **社区反应**：用户希望区分“禁止模型自动调用”和“禁止用户手动调用”，而不是完全隐藏。

[#92769 — Plugin skills with `disable-model-invocation: true` are hidden](https://github.com/anthropics/claude-code/issues/92769)

### 7. 后台 Bash/Monitor 完成后，进程内子代理未被重新调用

- **热度**：4 条评论，具备稳定复现。
- **重要性**：这是代理编排生命周期问题。后台任务完成事件没有可靠地恢复父会话，可能导致长时间运行的自动化流程停滞。
- **社区反应**：关注度尚不高，但对 Agent/Monitor 工作流影响较大，适合纳入多代理稳定性跟踪。

[#88423 — In-process subagents are not re-invoked after background tasks complete](https://github.com/anthropics/claude-code/issues/88423)

### 8. “要求受信任设备”会静默阻止 Agent 对 Session 的操作

- **热度**：1 条评论，为近期新增需求。
- **重要性**：Remote Control 开启可信设备限制后，`create_session`、`list_events`、`send_message` 等 Agent 操作被直接拒绝，且缺少设备端批准或清晰提示。这使安全功能与自动化能力形成正面冲突。
- **社区反应**：社区希望增加显式阻断原因、审批入口，以及面向 Agent 的受控授权方式。

[#103864 — “Require trusted devices” silently blocks agent-to-session actions](https://github.com/anthropics/claude-code/issues/103864)

### 9. 每周使用限额重置时间不可配置

- **热度**：8 条评论、34 个 👍。
- **重要性**：固定重置周期不利于按周安排开发任务，也不符合部分团队的工作节奏。用户希望可选择重置日，或使用类似 Codex 的“按需预存重置额度”机制。
- **社区反应**：属于高频成本与配额管理需求，点赞量较高，说明用户对用量可预测性的需求较强。

[#76272 — Give users control over weekly limit reset timing](https://github.com/anthropics/claude-code/issues/76272)

### 10. Windows Desktop/Cowork 会话路径超过 `MAX_PATH`

- **热度**：1 条评论。
- **重要性**：路径可达到 472 字符，已有大量文件超过限制，可能造成文件访问、Hook、插件和桌面协同功能连锁失败。Windows 长路径兼容会影响大型仓库和深层目录。
- **社区反应**：这是 #80753 在 Windows 上的对应问题，根因相似但错误限制和表现不同，值得独立修复。

[#91935 — Windows cowork session paths exceed MAX_PATH](https://github.com/anthropics/claude-code/issues/91935)

---

## 4. 重要 PR 进展

> 过去 24 小时数据中实际仅有 **2 条更新 PR**，以下完整列出，未补造不存在的 PR。

### 1. `/diff` 面板在暂不可绘制时保留，内容就绪后显示

- 改动目标：解决 `/diff` 打开时宿主页面尚未附加、暂时无法绘制面板的问题。
- 新行为：先保留 pane，不直接丢弃；待具备绘制能力后再显示。
- 价值：减少异步 UI 初始化竞态导致 `/diff` 无响应或面板消失的问题。
- 状态：Open；属于堆叠 PR，需关注其依赖 PR 的合并顺序。

[#99141 — diff: a pane nothing can draw yet is kept](https://github.com/anthropics/claude-code/pull/99141)

### 2. `sec-default`：组织级策略上限覆盖用户安装的插件

- 改动目标：让组织策略对插件中的工具同样生效。
- 核心行为：组织可为特定工具设置审批上限或拒绝规则；策略 Mod 对用户安装的插件也保持约束。
- 安全价值：避免用户通过安装第三方插件绕开组织对高风险工具的审批要求。
- 状态：Open；与当前 Mods/Plugins 生态和组织治理热点直接相关。

[#99540 — sec-default: an organization's ceiling on a tool holds over installed plugins](https://github.com/anthropics/claude-code/pull/99540)

---

## 5. 功能需求趋势

### 插件、Mods 与扩展生态

- [#91870](https://github.com/anthropics/claude-code/issues/91870) 是当前最明确的扩展性主轴。
- 社区期待更强的 Hook、Plugin、自定义 Agent 和 Skill 能力。
- 需求重点已经从“能否安装插件”转向插件行为是否透明、是否能被组织策略约束，以及配置是否真正生效。

相关 Issue：

- [#99417 — `prompt.submit` Hook 应可静默消费 Prompt](https://github.com/anthropics/claude-code/issues/99417)
- [#92769 — `disable-model-invocation` 语义与 Skill 可见性](https://github.com/anthropics/claude-code/issues/92769)
- [#103851 — Cloud 环境未加载仓库级 Skills](https://github.com/anthropics/claude-code/issues/103851)

### 企业安全、权限与治理

- 用户要求组织策略能够覆盖个人安装的插件。
- “要求受信任设备”需要与 Agent 自动化、Remote Control 审批机制协同。
- 社区同时关注反馈数据保留、训练用途和无会话上下文反馈。

相关 Issue：

- [#103864 — 可信设备限制缺少 Agent 审批机制](https://github.com/anthropics/claude-code/issues/103864)
- [#103863 — 允许无 Session 上下文发送反馈](https://github.com/anthropics/claude-code/issues/103863)
- [PR #99540 — 组织策略覆盖插件](https://github.com/anthropics/claude-code/pull/99540)

### 配额、成本与资源控制

- 固定周限额重置时间被认为不够灵活。
- 开发者希望明确、自动且可预测地控制使用量。
- 除配额外，后台任务、MCP 子进程和 Routine 会话的生命周期清理也是重要成本治理方向。

相关 Issue：

- [#76272 — 每周限额重置时间可配置](https://github.com/anthropics/claude-code/issues/76272)
- [#89499 — MCP stdio 子进程在后台任务结束后未退出](https://github.com/anthropics/claude-code/issues/89499)
- [#74682 — Routine 完成后自动归档会话](https://github.com/anthropics/claude-code/issues/74682)

### MCP 与 OAuth 企业接入

- 重点不是单纯的“能否连接 MCP”，而是多用户凭据隔离、OAuth 回调标准、令牌轮换和后台进程生命周期。
- 这些能力直接决定 Claude Code 能否进入身份体系复杂的企业开发环境。

相关 Issue：

- [#91641 — 单次轮换刷新令牌兼容问题](https://github.com/anthropics/claude-code/issues/91641)
- [#42765 — OAuth `redirect_uri` 标准兼容](https://github.com/anthropics/claude-code/issues/42765)

### Desktop、Cloud 与跨平台一致性

- Desktop、Cloud Routine、Project Thread 和 CLI 之间存在配置加载差异。
- Windows 长路径、Linux 终端快捷键、macOS/Windows Desktop 行为一致性仍是高频问题。

相关 Issue：

- [#103851](https://github.com/anthropics/claude-code/issues/103851)
- [#91935](https://github.com/anthropics/claude-code/issues/91935)
- [#97355 — Linux 下 Shift-Enter 直接提交命令](https://github.com/anthropics/claude-code/issues/97355)

---

## 6. 开发者关注点

1. **扩展机制必须可预测**  
   开发者不只关心插件能否安装，更关心 Skill 是否加载、Hook 是否执行、`disable-model-invocation` 如何生效，以及拒绝 Prompt 后是否产生干扰性 UI。

2. **企业策略不能被插件绕过**  
   组织级审批和安全上限需要覆盖第三方插件；这是 [#99540](https://github.com/anthropics/claude-code/pull/99540) 的核心价值。

3. **Agent 工作流需要可靠的事件恢复**  
   后台 Bash、Monitor、Subagent 和 Routine 的完成事件必须正确唤醒父会话，避免自动化流程静默停滞。

4. **身份认证需要兼顾安全与多用户隔离**  
   OAuth 回调地址、刷新令牌轮换、用户级凭据和可信设备限制是远程 MCP 落地的现实阻碍。

5. **Windows 和 Linux 兼容问题仍较集中**  
   长路径、Git Bash 快照开销、终端快捷键、Linux 沙箱和用户命名空间均会影响本地开发体验。v2.1.305 对 Chromium/Podman 的改进，是近期较直接的兼容性修复。

6. **云端与仓库级配置需要保持一致**  
   同一仓库中的 Hooks、`settings.json` 和 Skills 应具有一致的加载规则，尤其是 Cloud Routine 和 Project Thread。

7. **Issue 治理机制需要降低误伤**  
   大量带 `has repro` 的 Bug 被自动关闭，正在削弱社区提交高质量复现的意愿。自动关闭应结合最新版本、重复项、有效复现和维护者确认，而非仅依赖标签或时间。

8. **配额与隐私控制需求持续增强**  
   用户既希望更灵活的限额重置，也希望 `/feedback` 和点赞点踩支持不附带完整会话，降低对话数据被长期保存或用于训练的风险。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报

**日期：2026-10-21**  
**数据范围：GitHub `openai/codex` 过去 24 小时更新**

## 1. 今日速览

今日社区焦点集中在 **MCP OAuth/企业认证、Windows 桌面端稳定性、沙箱审批与工具执行**。过去 24 小时发布两个 Rust `0.164.0` 预发布版本，同时多项 MCP 认证、插件清理、权限状态和 Code Mode 可观测性改进已进入 PR 流程。

Issue 侧，macOS 更新检查、Windows 工具调用和文件处理失败、语音访问、应用崩溃、Git LFS 临时文件泄漏等问题获得较高关注，表明跨平台可靠性与权限控制仍是当前主要痛点。

---

## 2. 版本发布

过去 24 小时新增两个 Rust 预发布版本：

- [`rust-v0.164.0-alpha.8`](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.8)  
  `0.164.0-alpha.8`，进一步推进 `0.164` 版本线。
- [`rust-v0.164.0-alpha.7`](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.7)  
  `0.164.0-alpha.7`，紧邻上一版本发布。

> 数据源未提供这两个 Release 的详细变更日志，因此不对具体功能变化作额外推断。结合当日 PR 方向，该版本线可能涉及 MCP OAuth、企业认证、插件缓存、Code Mode 及 TUI 权限处理等基础设施改进。

---

## 3. 社区热点 Issues

### 1. macOS 更新检查因 appcast 返回 HTTP 520 而失败

- **Issue：** [#53891](https://github.com/openai/codex/issues/53891)
- **标签：** `bug`, `app`, `connectivity`
- **社区反应：** 31 条评论，15 个赞，为当日讨论度最高的 Issue。
- **重要性：** 更新服务不可用会直接阻断用户获取修复版本，也可能造成版本状态混乱。问题指向 appcast 服务端响应，而非单一客户端环境。

### 2. 安全检查错误拦截网络安全请求

- **Issue：** [#34306](https://github.com/openai/codex/issues/34306)
- **标签：** `bug`, `CLI`, `safety-check`
- **社区反应：** 23 条评论，18 个赞，点赞率较高。
- **重要性：** 合法或已授权的漏洞研究、防御性安全工作可能遭到误拦截。较高点赞表明安全策略的误报率和可解释性是用户强烈诉求。

### 3. MCP OAuth 刷新令牌被拒绝后仍被视为可用

- **Issue：** [#39054](https://github.com/openai/codex/issues/39054)
- **标签：** `bug`, `auth`, `mcp`, `CLI`, `app-server`
- **社区反应：** 18 条评论，10 个赞。
- **重要性：** 已失效的 refresh token 被持续重试，会让 MCP 服务无法正常恢复，也不会明确提示用户重新认证。报告者在多个正式版和 Alpha 版本中均复现，影响范围较广。

### 4. Windows 工具调用无法创建进程安全环境

- **Issue：** [#52042](https://github.com/openai/codex/issues/52042)
- **标签：** `bug`, `windows-os`, `sandbox`, `tool-calls`, `app`
- **社区反应：** 14 条评论。
- **重要性：** `CreateProcessSecurityEnvironment` 失败导致本地工具无法启动，用户无法完成 Excel 等文件处理任务。问题直接位于 Windows 沙箱与工具执行关键路径。

### 5. Windows 应用在 Browser Use 清理阶段反复崩溃

- **Issue：** [#48449](https://github.com/openai/codex/issues/48449)
- **标签：** `bug`, `windows-os`, `app`, `browser`
- **社区反应：** 16 条评论。
- **重要性：** 崩溃发生在浏览器标签页销毁和画中画资源清理阶段，并伴随重复密码保存提示，暗示 Browser Use 生命周期管理和资源回收可能存在竞态或重复释放问题。

### 6. Windows 桌面端刷新仓库时持续泄漏 Git LFS 临时副本

- **Issue：** [#34953](https://github.com/openai/codex/issues/34953)
- **标签：** `bug`, `windows-os`, `app`, `performance`
- **社区反应：** 15 条评论，5 个赞。
- **重要性：** 仓库状态或 diff 刷新会重复生成全尺寸 LFS 文件，临时副本未及时回收，长期运行可能造成磁盘占用持续增长，属于明确的资源泄漏问题。

### 7. macOS Computer Use helper 因无效索引触发 SIGTRAP

- **Issue：** [#43573](https://github.com/openai/codex/issues/43573)
- **标签：** `bug`, `computer-use`
- **社区反应：** 12 条评论。
- **重要性：** `UIElementTreeTransformation.transform` 在移除辅助功能树节点时向 `Array.remove(at:)` 传入过期索引，直接导致 native helper 崩溃。用户侧仅看到管道关闭，错误可诊断性较弱。

### 8. iPadOS 无法向 Codex Cloud 提交任务

- **Issue：** [#55271](https://github.com/openai/codex/issues/55271)
- **标签：** `bug`, `codex-web`, `session`
- **社区反应：** 8 条评论，4 个赞；Issue 创建于 10 月 19 日，属于最新且反馈迅速的问题。
- **重要性：** Safari 端出现 `DisposableStack` 缺失错误，iOS App 侧同时返回服务端错误，表明移动端 Web 与原生客户端可能存在共同故障点。

### 9. ChatGPT Work/Sites 找不到可用执行环境

- **Issue：** [#55654](https://github.com/openai/codex/issues/55654)
- **标签：** `bug`, `codex-web`, `tool-calls`, `app`
- **社区反应：** 5 条评论，2 个赞；Issue 于今日创建。
- **重要性：** 移动端、桌面端和 Web 端均受影响，核心症状是无法编辑或发布内容。对 Sites 和 Work 自动化而言，执行环境不可用会阻断完整工作流。

### 10. macOS 显示“请求审批”，实际却禁止沙箱审批

- **Issue：** [#55694](https://github.com/openai/codex/issues/55694)
- **标签：** `bug`, `sandbox`, `tool-calls`, `app`
- **社区反应：** 1 条评论；Issue 于今日创建。
- **重要性：** UI 声明与实际策略不一致，使 Sites 发布在凭据上传前即被拒绝，用户无法通过预期的审批流程继续执行。这是权限语义和执行策略一致性问题。

---

## 4. 重要 PR 进展

> 下列 PR 多数在当日已关闭；以下仅陈述变更内容，不将“关闭”直接等同于公开仓库中的合并状态。

### 1. 默认启用 MCP OAuth 刷新协调机制

- **PR：** [#55701](https://github.com/openai/codex/pull/55701)
- 将 `mcp_oauth_refresh_coordination` 标记为稳定并默认启用。
- 直接对应多个 MCP 客户端并行刷新 OAuth 凭据时可能引发的状态竞争，对稳定性和恢复能力有直接影响。

### 2. 企业 MCP 认证复用 Codex 账户授权

- **PR：** [#55698](https://github.com/openai/codex/pull/55698)
- 优先使用已保存的企业凭据；否则使用 issuer 与企业 MCP 配置匹配的 Codex 账户 OAuth grant。
- 同时固定每个连接的凭据来源及 OAuth 客户端状态，降低凭据混用风险。

### 3. 运行时刷新时保留企业 MCP 授权

- **PR：** [#55696](https://github.com/openai/codex/pull/55696)
- 在配置重载时取消陈旧的企业 MCP 启动流程，同时保留仍通过校验的运行中线程权限。
- 解决 `thread/revert` 替换 runtime 后授权能力意外丢失的问题。

### 4. 改进企业 MCP 认证错误与请求权限检查

- **PR：** [#55691](https://github.com/openai/codex/pull/55691)
- 按凭据类型和交换阶段细分 token 错误，并为登录或管理员操作提供明确指引。
- 将资源授权失败与企业身份认证失败分开处理，减少 provider 原始错误泄露和错误归类。

### 5. 清理失败或遗留的插件市场暂存目录

- **PR：** [#55689](https://github.com/openai/codex/pull/55689)
- 为插件市场添加和升级流程引入共享 staging guard。
- 清理失败安装或中断升级留下的临时 checkout，直接缓解 `~/.codex/.tmp` 持续膨胀问题。

### 6. 回收陈旧的旧版插件市场暂存目录

- **PR：** [#55690](https://github.com/openai/codex/pull/55690)
- 对没有 owner lock、无法被常规 staging cleanup 覆盖的旧目录设置年龄阈值。
- 在不误删近期克隆的前提下回收遗留存储，与相关已关闭 Issue [#39332](https://github.com/openai/codex/issues/39332) 呼应。

### 7. 修复 TUI 权限选择和会话状态处理

- **PR：** [#55682](https://github.com/openai/codex/pull/55682)
- 避免排队中的 prompt 在权限菜单打开前提前恢复执行。
- 修复本地 `/permissions` 命令绕过待处理权限变更的问题，并防止切换项目后残留其他项目的模型访问信息。

### 8. 为远程精选 Agent Plugin 启用应用路由

- **PR：** [#55667](https://github.com/openai/codex/pull/55667)
- 修复 Agent Plugin manifest 忽略 app declaration 的问题。
- 使服务生成并远程安装的精选插件也能使用 app routing，并抑制匹配的直连 MCP 连接。

### 9. 增加 Agent 间消息生命周期钩子

- **PR：** [#55657](https://github.com/openai/codex/pull/55657)
- 引入 `MessageLifecycleContributor`，在本地 agent control 发布消息及接收方写入历史时通知扩展。
- 为多 Agent 协作、消息投递状态跟踪和扩展生命周期提供基础能力。

### 10. 跟踪 Code Mode cell 生命周期和结果缓冲时间

- **PR：** [#55653](https://github.com/openai/codex/pull/55653)
- 为 yielded execution、terminal wait 和不可用 cell 增加 `CodeModeCellTiming` 通知。
- 记录执行完成结果在缓冲区中的等待时间，有助于诊断 Code Mode 的延迟和工具结果回收问题。

### 其他值得关注的工程进展

- **云端 skill 缓存集中化：** [#55705](https://github.com/openai/codex/pull/55705) 将缓存内容移入 `SkillCatalogState`，并在同一锁下管理授权范围，减少认证切换后的缓存不一致。
- **Rust 工具链升级：** [#55677](https://github.com/openai/codex/pull/55677) 将 Cargo、Bazel、CI 和 Windows 安装流程统一升级到 Rust `1.99.1`。
- **工具注册指标增强：** [#55692](https://github.com/openai/codex/pull/55692) 为 `codex.tools.registered` 增加有效的 `incremental_tools` 模式标签。
- **压缩 rollout 并发搜索：** [#55652](https://github.com/openai/codex/pull/55652) 将压缩 rollout 搜索拆分为最多四批并发执行，以缩短历史检索耗时。

---

## 5. 功能需求趋势

### 1. MCP 身份认证与授权稳定性

社区最强烈的方向之一是完善 MCP OAuth 生命周期，包括：

- refresh token 失效后的明确重新认证；
- 多客户端并发刷新协调；
- 企业凭据与 Codex 账户授权的安全复用；
- runtime、配置重载和线程回退后的授权保留；
- 更清晰的企业身份认证与资源权限错误。

相关反馈集中于 [#39054](https://github.com/openai/codex/issues/39054)、[#55701](https://github.com/openai/codex/pull/55701)、[#55698](https://github.com/openai/codex/pull/55698)。

### 2. Windows 桌面端可靠性

Windows 是 Issue 反馈最集中的平台，主要包括：

- 沙箱和进程安全环境创建失败；
- 工具调用无法启动；
- Browser Use 清理阶段崩溃；
- 仓库刷新期间 Git LFS 临时文件泄漏；
- 大量聊天和浏览器会话导致 app-server 队列饱和、应用卡死。

这表明 Windows 仍需要加强沙箱兼容性、资源回收和长期运行稳定性。

### 3. IDE 与移动端集成

VS Code 扩展、Windows/macOS Remote、iPadOS Safari 与 ChatGPT iOS 客户端均有独立故障反馈。社区期待 Codex 的核心会话和工具能力在不同终端保持一致，尤其是：

- VS Code 首轮回复后卡住；
- Remote 断开后的 writer 锁释放；
- iPadOS 提交 prompt；
- Android Remote 与 VS Code 线程联动。

### 4. 权限、审批与沙箱策略一致性

多个 Issue 指向同一需求：界面显示的权限模式和实际执行策略必须一致。开发者希望：

- 明确区分“无需审批”“需要审批”和“禁止沙箱”；
- 在授权委托场景中正确传播用户 consent；
- 避免合法任务被直接拒绝而没有可操作提示；
- 为安全拦截提供更精确的原因和申诉路径。

### 5. Browser Use 与 Computer Use 稳定性

Browser Use 标签页回收、画中画清理、Computer Use 辅助功能树构建均出现崩溃。社区需求不只是“避免崩溃”，还包括：

- 更可靠的 native helper 生命周期；
- 无效 UI 元素索引的防御性处理；
- 可复现的符号化崩溃诊断；
- 浏览器认证和云浏览器接管流程的明确错误提示。

### 6. 性能、资源治理和可观测性

Windows LFS 泄漏、插件市场暂存目录膨胀、Code Mode 结果缓冲延迟、压缩 rollout 搜索耗时，反映出社区正从“功能可用”转向关注规模化运行：

- 临时文件和缓存自动回收；
- 长会话 renderer/app-server 队列治理；
- Code Mode cell 生命周期指标；
- 工具调用和执行环境诊断导出。

### 7. 安全策略可解释性

安全检查误拦截问题同时出现在网络安全研究、授权漏洞赏金和 Daybreak 验证用户中。社区期待更细粒度的授权感知、误报处理机制和可解释的安全策略。

---

## 6. 开发者关注点

1. **工具调用“能启动但无法完成”仍是核心风险。**  
   Windows 的 `CreateProcessSecurityEnvironment`、macOS Sites 发布审批、Codex Cloud 执行环境查询失败，都发生在真正执行之前。用户不仅需要明确错误，还需要可诊断的依赖、权限和策略信息。

2. **授权流程需要更可预测。**  
   MCP refresh token、企业授权复用、远程线程 writer 锁、TUI pending permission 等问题，本质上都涉及状态生命周期：授权何时失效、刷新后是否继续使用旧凭据、切换会话或项目后状态是否泄漏。

3. **跨平台行为不一致问题突出。**  
   同一功能在 Windows、macOS、Linux、VS Code、Safari 和移动客户端上表现不同。社区希望 Codex 提供统一的能力矩阵、错误语义和配置行为。

4. **长会话和资源回收需要系统性治理。**  
   Git LFS 临时副本、插件 staging clone、浏览器 renderer、app-server 队列均可能无限累积。开发者需要明确的上限、生命周期策略、后台清理机制及诊断指标。

5. **安全拒绝必须可解释且支持授权上下文。**  
   社区不接受只显示“This content can't be shown”。期望产品区分恶意请求、授权研究、误判和安全策略冲突，并提供重新授权或报告路径。

6. **可观测性需求正在从日志转向结构化指标。**  
   Code Mode timing、工具注册模式、execution loss diagnostic export 等请求，表明开发者希望以可导出的结构化数据定位延迟、失败和资源状态，而非依赖人工复现。

7. **IDE 集成不仅要“能打开”，还要保持会话连续性。**  
   首轮回复后卡顿、Remote 断连后锁未释放、移动端无法提交任务，均直接影响实际开发流程。核心诉求是跨客户端可靠恢复、状态同步和明确错误反馈。

8. **性能优化开始覆盖历史检索与后台任务。**  
   压缩 rollout 并发搜索说明会话历史规模已成为瓶颈；同时，仓库刷新、插件升级和浏览器会话管理也要求更高效的资源调度。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-10-21）

## 1. 今日速览

过去 24 小时，Gemini CLI 重点围绕**子代理稳定性、容器沙箱中的 IDE 集成、取消信号安全处理和 MCP 工具发现**持续推进。社区同时集中反馈了子代理错误报告为成功、代理挂起、浏览器代理异常及工具数量过多等问题，Agent 可靠性与可观测性仍是当前主要矛盾。

---

## 2. 版本发布

### v0.66.0-preview.0
- 更新路线图文档，移除过时的 2025 年路线图引用。
- 发布 v0.65.0-preview.0 变更日志，并完成版本号更新。
- 详情：[Release v0.66.0-preview.0](https://github.com/google-gemini/gemini-cli/releases)

### v0.66.0-nightly.20261020.g76e4d7c04
- **终端 UI**：刷新视口时保留终端 scrollback，改善长会话输出回滚体验。
- **CLI HTTP**：使用 `StringDecoder` 正确解码 Node.js 流式 HTTP activity chunks。
- 详情：[Release v0.66.0-nightly.20261020.g76e4d7c04](https://github.com/google-gemini/gemini-cli/releases)

### v0.65.0
- **工作区安全**：在不受信任目录中强制执行只读工作区设置。
- **会话恢复**：避免恢复会话时产生重复的 tool response turn。
- 详情：[Release v0.65.0](https://github.com/google-gemini/gemini-cli/releases)

---

## 3. 社区热点 Issues

### 1. 子代理达到 `MAX_TURNS` 后却被报告为成功
- **链接**：[Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)
- `codebase_investigator` 在达到最大轮次、尚未完成分析时仍返回 `status: "success"` 和 `Termination Reason: "GOAL"`。
- 这是典型的执行结果误报，可能导致上层代理和用户误判任务已经完成。
- 社区反应较高：13 条评论、2 个赞；目前处于需复测状态。

### 2. Generalist Agent 经常无限挂起
- **链接**：[Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)
- 当 Gemini CLI 将任务委派给 generalist agent 时，简单的目录创建等操作也可能卡住超过一小时。
- 用户显式要求不使用子代理后问题消失，说明问题可能集中在委派或子代理调度链路。
- 8 条评论、8 个赞，反映出较高的实际影响面。

### 3. Browser Agent 忽略 `settings.json` 配置
- **链接**：[Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)
- Browser Agent 忽略全局和项目级 `settings.json` 覆盖项，例如 `maxTurns`。
- 配置虽然被 `AgentRegistry` 读取和合并，但后续执行路径没有完整应用，造成用户预期与实际行为不一致。
- 4 条评论，属于直接影响代理行为可预测性的 P2 问题。

### 4. Browser Agent 在 Wayland 环境下失败
- **链接**：[Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983)
- Browser subagent 在 Wayland 环境中无法正常运行，但最终输出仍带有 `Termination Reason: GOAL` 等完成态信息。
- 该问题同时暴露出浏览器后端兼容性与失败状态报告两个层面的问题。
- 4 条评论、1 个赞，标记为 P1 和需复测。

### 5. Browser Agent 缺少会话接管和锁恢复能力
- **链接**：[Issue #22232](https://github.com/google-gemini/gemini-cli/issues/22232)
- 当前 BrowserManager 遇到持久化浏览器配置被占用时采用 fail-fast 策略。
- 社区希望支持自动接管旧会话、清理孤立进程并恢复浏览器锁，提升长任务和异常退出后的可用性。
- 4 条评论，定位为客户场景下的稳定性增强需求。

### 6. 工具数量过多时触发 HTTP 400
- **链接**：[Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)
- 启用超过约 400 个工具后，Gemini CLI 出现 400 错误。
- 用户期待系统能够按任务动态裁剪工具范围，而不是把全部 MCP/扩展工具一次性发送给模型。
- 3 条评论，与 MCP 工具分页和工具发现机制直接相关。

### 7. Agent 不主动使用 Skills 和 Subagents
- **链接**：[Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)
- 用户配置了 Gradle、Git 等自定义 skills，但 Gemini 在相关任务中很少主动调用 skills 或子代理。
- 当前行为更依赖用户显式提示，削弱了扩展和代理编排机制的实际价值。
- 7 条评论；社区期待根据任务描述自动选择能力，而非仅做机械匹配。

### 8. 子代理因生成临时脚本污染工作区
- **链接**：[Issue #23571](https://github.com/google-gemini/gemini-cli/issues/23571)
- 禁用 Shell 工具后，模型转而在多个目录生成编辑脚本，造成工作区污染并增加清理成本。
- 需求本质是让文件修改过程具备统一、可追踪和可回收的管理机制。
- 3 条评论，与持久化任务追踪、文件工具设计高度相关。

### 9. `get-shit-done` 输出 hook 导致 CLI 崩溃
- **链接**：[Issue #22186](https://github.com/google-gemini/gemini-cli/issues/22186)
- 输出 hook 接近完成、正在打印用户总结时，Gemini CLI 发生崩溃。
- 该问题可能影响自定义 hook、长时间输出和非标准输出流场景。
- 3 条评论，属于 P1，需进一步获取日志和复现信息。

### 10. AST 感知的文件读取、搜索和代码库映射
- **链接**：[Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)
- 社区正在评估 AST 工具是否能够减少低效文件读取和 token 噪声，并提升代码导航精度。
- 衍生讨论涉及 AST grep、代码库映射工具及 `codebase_investigator` 的增强。
- 主 Issue 有 7 条评论，相关拆分 Issue 也持续获得关注。

---

## 4. 重要 PR 进展

### 1. 将 IDE companion 桥接到容器沙箱
- **PR**：[ #29858](https://github.com/google-gemini/gemini-cli/pull/29858)
- 通过 exec stdio 将宿主机 IDE companion 与 Docker、Podman、runsc 等容器沙箱连接。
- 目标是恢复容器环境下的 `/ide status`、`/ide enable`、打开文件上下文和原生 diff。
- P2，属于大型跨边界集成改动。

### 2. 非交互模式正确处理终止信号
- **PR**：[ #29849](https://github.com/google-gemini/gemini-cli/pull/29849)
- 修复 headless/non-interactive 模式收到 `SIGINT` 或 `SIGTERM` 后仍执行延迟工具调用的问题。
- 可避免取消后继续产生 shell 副作用、重复提交工具结果，是重要的安全与资源管理修复。
- P2。

### 3. 优化不可信输入标记和命令确认流程
- **PR**：[ #29833](https://github.com/google-gemini/gemini-cli/pull/29833)
- 将不可信标记检查限定到真正的外部输出，不再将 Agent 自身命令输出中的 flags 和路径视为外部输入。
- 工作区内的路径参数不再触发额外提示，同一 flag 的授权可被复用。
- 目标是降低重复确认，同时保持外部内容安全边界。

### 4. 修复 IDE 服务重启后 `/ide enable` 无法重连
- **PR**：[ #29744](https://github.com/google-gemini/gemini-cli/pull/29744)
- 处理 VS Code Reload Window、扩展更新或禁用后 IDE companion 断开的情况。
- `/ide enable` 可重新发现并连接存活的扩展服务。
- 直接改善 IDE 集成在日常开发中的稳定性。

### 5. 修复 A2A Server JSON 中间件挂载顺序
- **PR**：[ #29850](https://github.com/google-gemini/gemini-cli/pull/29850)
- 将 `express.json()` 移到 A2A SDK 路由注册之前。
- 避免请求体解析中间件因 Express 注册顺序而无法处理 A2A 请求。
- P2，属于明确的服务端兼容性修复。

### 6. 修复用户主目录作为工作区时的重复 Agent 警告
- **PR**：[ #29847](https://github.com/google-gemini/gemini-cli/pull/29847)
- 避免工作区根目录设为 `~` 或用户主目录时出现误报 `Duplicate agent name`。
- 修复目录路径重叠导致的重复扫描和错误告警。
- P2。

### 7. 排除 IDE 设置和 `GEMINI.md` 的打开文件上下文
- **PR**：[ #29848](https://github.com/google-gemini/gemini-cli/pull/29848)
- 防止 `.vscode/settings.json`、`.gemini/settings.json` 以及 `GEMINI.md` 被作为活动编辑器上下文注入 Prompt。
- 降低敏感配置或元数据被重复发送、无意读取的概率。
- P2，兼具上下文精度和安全意义。

### 8. 确保包含函数调用的模型轮次具有 thought signature
- **PR**：[ #29828](https://github.com/google-gemini/gemini-cli/pull/29828)
- 修复多轮 Agent 会话中，历史工具调用后继续用户 Prompt 可能触发 HTTP 400：
  `Function call is missing a thought_signature in functionCall parts`。
- 对 Gemini 工具调用协议兼容性具有直接影响。

### 9. 安全分页获取 MCP 工具
- **PR**：[ #29846](https://github.com/google-gemini/gemini-cli/pull/29846)
- 对支持分页的 `tools/list` 获取全部页面，而不是只暴露第一页。
- 初次发现和动态刷新都将包含完整工具目录，并转发请求超时与中止信号。
- 可改善大型 MCP 工具集场景下的发现完整性。

### 10. 保留 A2A/Core 的扩展 Token 用量元数据
- **PR**：[ #29834](https://github.com/google-gemini/gemini-cli/pull/29834)
- 保留 `thoughtsTokenCount`、`toolUsePromptTokenCount` 和 `cachedContentTokenCount`。
- 统一 A2A Server 与 Core 的逐轮 token 报告方式。
- P1，对成本分析、缓存效果和可观测性非常重要。

---

## 5. 功能需求趋势

### 5.1 Agent 可靠性与状态准确性
- 子代理达到轮次上限后必须明确返回失败或中断，而不是误报 `GOAL/success`。
- 避免 generalist、browser agent 和创建 Vite 应用等简单任务无限挂起。
- 需要统一终止原因、退出码、错误状态及恢复行为。

### 5.2 IDE 集成跨容器可用
- 社区正推动 IDE companion 通过 stdio 跨越宿主机与容器边界。
- 同时需要支持 IDE 服务重启后的自动重连。
- IDE 设置和上下文元数据应与普通打开文件区分，减少不必要的 Prompt 注入。

### 5.3 MCP 工具规模治理
- 工具数量过多会产生 400 错误和上下文膨胀。
- 需求包括完整的分页发现、按任务动态裁剪、工具冲突处理及更合理的 token 预算。
- AST grep、AST-aware read 等专用工具也可能成为降低通用工具暴露量的方案。

### 5.4 更强的代码库理解和上下文效率
- AST 感知的文件读取、搜索和映射受到重点关注。
- 社区希望减少整文件“倾倒”式读取，避免无关注释、方法和无关代码占用上下文。
- “Tactful Extraction” 强调先搜索、再局部读取、最后进行精确提取的层次化流程。

### 5.5 Skills、子代理和后台任务编排
- 需要让 Agent 根据任务描述主动选择合适的 skill 与 subagent。
- 本地子代理应支持后台运行，例如通过 `Ctrl+B` 启动非阻塞探索、构建或 lint。
- 长期方向包括共享内存和并行子代理协作。

### 5.6 安全执行与破坏性操作控制
- 社区关注 `git reset`、`--force`、数据库修改等高风险命令。
- 期望增加安全替代策略、破坏性操作抑制和更明确的确认机制。
- 非交互模式的取消信号必须能立即阻止后续工具执行。

### 5.7 持久化任务追踪
- 多个 Issue 指向现有 `WriteToDo` 的上下文腐化和跨会话丢失问题。
- 社区倾向使用文件型任务 CRUD，让任务状态在工作区中持久化。
- 目标是降低 token 消耗，并让长任务恢复更加可靠。

### 5.8 可观测性与评测体系
- `/bug` 报告缺少子代理内部上下文。
- `/chat share` 难以查看和分享子代理 trajectory。
- 内部项目评测存在不稳定、无法持续追踪质量趋势等问题，评测标准与回归机制仍需加强。

---

## 6. 开发者关注点

1. **子代理不能“静默失败或假成功”**  
   达到 `MAX_TURNS`、浏览器启动失败或被取消时，必须向主代理返回可区分、可恢复的真实状态。

2. **代理挂起是当前最影响日常使用的体验问题**  
   即使是创建目录等简单任务，generalist agent 卡死一小时也会严重破坏工作流连续性。

3. **工具暴露需要从“全部发送”转向“按需选择”**  
   超过数百个工具时，不仅会触发 API 400，还会增加上下文成本、降低模型选择准确率。

4. **Agent 应更主动使用扩展能力**  
   Skills 和 subagents 经常需要用户显式点名，说明自动能力路由和描述匹配仍有明显缺口。

5. **工作区需要更干净、更可控**  
   临时脚本、破坏性 Git 命令、重复任务状态和临时文件都可能污染项目，开发者期待更安全的默认策略。

6. **长任务需要具备后台化、恢复和可追踪能力**  
   子代理后台执行、持久化任务状态、trajectory 分享及更完整的 bug 上下文，是高频组合需求。

7. **容器、IDE 与 MCP 正在成为新的集成边界**  
   IDE companion 跨容器通信、MCP 工具分页、私网 OAuth 端点等需求表明，Gemini CLI 正持续进入更复杂的企业开发环境。

8. **可观测性直接影响成本与信任**  
   完整保留 thought、tool-use 和缓存 token 元数据，并让子代理轨迹可审计，是后续优化模型质量和用户成本的基础。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期：2026-10-21**  
**项目：** [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)  
**数据范围：** 过去 24 小时新增/更新的 Releases、Issues 与 Pull Requests

## 1. 今日速览

今日 Reasonix 同时发布 **CLI/Desktop v1.39.9** 与 **CLI/Studio v2.46.0**：前者集中修复会话恢复、工具调用完成判定、目标模式计时等问题，后者重点引入会话级 Agent 预设，并优化多标签页、内存占用与远程连接稳定性。社区反馈则主要聚焦在 **Studio 内存异常、并发锁、预设切换卡顿、历史数据完整性及多模型兼容**，稳定性与长会话场景仍是当前开发重点。

---

## 2. 版本发布

### Reasonix CLI / Desktop v1.39.9

**发布渠道：** Stable  
**发布标签：** [v1.39.9](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v1.39.9) · [desktop-v1.39.9](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/desktop-v1.39.9)

本版以稳定性修复为主，主要包括：

- 修复仅包含思考内容、尚未生成正式回复时被错误判定为任务完成的问题。
- 修复流式工具调用中途被截断后仍被标记为完成的问题。
- 修复手动压缩上下文后无法继续发送消息。
- 修复附加大文件导致桌面服务退出的问题。
- 修复 Studio 导入 1.x 会话后出现多余会话、恢复会话重复、恢复状态残留。
- 修复目标模式工作时长始终显示为 0。
- 修复 `!` 命令无法找到登录 Shell 中程序的问题。
- 修复远程会话徽标显示异常。
- 修正设置项与模型实际能力不一致的问题。
- 补充内容索引自愈机制：完整性索引丢失时，可根据内容对象重新构建，避免全部会话不可读。

### Reasonix CLI / Studio v2.46.0

**发布渠道：** Stable  
**发布标签：** [v2.46.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.46.0) · [studio-v2.46.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.46.0)

主要更新：

- 新增**会话级 Agent 预设**：
  - 人设、工具和模块可按会话绑定。
  - 在人设页管理，可从输入框上方状态行选择。
  - 默认关闭，选择器默认隐藏。
  - 关联需求：[Issue #13613](https://github.com/esengine/DeepSeek-Reasonix/issues/13613)。
- 新增终端排队消息管理。
- 在设置中提供独立的“会话间消息”选项。
- 支持项目级 `.reasonix/reasonix.toml`。
- 明显降低长会话内存占用。
- 修复公网远程连接误报离线。
- 修复多标签页展开/收起侧边栏时掉帧。
- 修复 macOS 托盘图标问题。
- 改进 1.x 会话导入流程。

---

## 3. 社区热点 Issues

### 1. Studio 连续打断后内存占用升至约 6GB

- **Issue：** [#13899](https://github.com/esengine/DeepSeek-Reasonix/issues/13899)
- **环境：** Studio v2.45.0 / Windows
- **反馈：** 用户连续执行打断操作后，内存一度达到约 6GB，并导致主机卡死，未能及时截图。
- **为何重要：** 直接影响 Studio 稳定性，且可能造成系统级不可用；虽然 v2.46.0 已宣称降低长会话内存占用，但仍需继续关注该问题是否彻底解决。
- **社区反应：** 7 条评论、0 个赞，是本期评论较多的 Issue 之一。

### 2. 多标签页下侧边栏展开/收起必现卡顿

- **Issue：** [#13936](https://github.com/esengine/DeepSeek-Reasonix/issues/13936)
- **环境：** Studio 多标签页
- **反馈：** 两个及以上标签页时，点击展开或收起左侧会话侧边栏可稳定复现掉帧和卡顿；单标签页无此现象。
- **为何重要：** 属于高频操作性能问题，明显影响日常交互。v2.46.0 已将其列为修复项，但多标签页渲染与内存联动仍值得回归测试。
- **社区反应：** 4 条评论、0 个赞。

### 3. 缺少“工具结果 → 模型图像输入”链路

- **Issue：** [#13540](https://github.com/esengine/DeepSeek-Reasonix/issues/13540)
- **反馈：** Reasonix 已有视觉模型、图片附件和像素渲染工具，但工具输出无法作为图像内容传给模型，只能通过 `browser_open` 截图绕行。
- **为何重要：** 绕行方案存在失真、成本高以及只读子代理不可用等限制，阻碍视觉模型、截图分析、图像生成和自动化验证工作流。
- **社区反应：** 2 条评论、0 个赞。

### 4. 多会话、多子代理场景中的锁竞争

- **Issue：** [#14025](https://github.com/esengine/DeepSeek-Reasonix/issues/14025)
- **反馈：** 长会话运行时，其他会话和子代理可能持续等待锁；用户建议引入不同安全与效率等级，或允许用户配置锁策略。
- **为何重要：** 多会话和协作型子代理正成为长任务常见模式，当前锁粒度可能成为并行执行的主要瓶颈。
- **社区反应：** 1 条评论、0 个赞；反馈附带了基于源码的锁机制调研。

### 5. 切换自定义 Agent 预设时阻塞 90–165 秒

- **Issue：** [#14026](https://github.com/esengine/DeepSeek-Reasonix/issues/14026)
- **反馈：** 预设继承 Skill 时，选择自定义 Agent 预设会长时间阻塞，原因是整个 Skill 目录被快照。
- **为何重要：** 这是 v2.46.0 新功能的关键体验问题。相关 PR #14015 已通过按需加载预设资源进行优化，但继承 Skill 的极端场景仍需验证。
- **社区反应：** 0 条评论、0 个赞，但直接关联新发布功能。

### 6. 完整性索引丢失导致全部会话不可读

- **Issue：** [#14018](https://github.com/esengine/DeepSeek-Reasonix/issues/14018)
- **环境：** Desktop v1.39.8 / Windows
- **反馈：** 清理归档会话后，缺少 `indexes\<hash>.json` 会使所有会话报 `baseline_read.transport_rejected`。
- **为何重要：** 属于潜在数据可访问性故障。v1.39.9 已通过重建丢失索引的修复进行响应。
- **社区反应：** 0 条评论、0 个赞；问题具有明确复现路径和较高影响面。

### 7. 隔离 `REASONIX_HOME` 后配置锁仍写入默认目录

- **Issue：** [#13275](https://github.com/esengine/DeepSeek-Reasonix/issues/13275)
- **环境：** Studio 2.41.0 / macOS
- **反馈：** 即使配置了独立的 `REASONIX_HOME`、`REASONIX_STATE_HOME` 和 `REASONIX_CACHE_HOME`，配置编辑锁仍写入 `~/.reasonix/locks/`。
- **为何重要：** 破坏 1.x/2.x 严格迁移和多环境隔离，跨版本并行使用可能产生锁冲突或状态污染。
- **社区反应：** 1 条评论、0 个赞。

### 8. 请求增加对 Intern AI Discovery 模型的适配

- **Issue：** [#11316](https://github.com/esengine/DeepSeek-Reasonix/issues/11316)
- **反馈：** 用户希望适配 `discovery.intern-ai.org.cn` 提供的模型，并指出当前模型命中率较低。
- **为何重要：** 反映社区对更多模型供应商、模型发现和兼容适配的持续需求，也关系到 OpenAI 兼容接口之外的 provider 扩展能力。
- **社区反应：** 2 条评论、0 个赞。

### 9. Ask 模式置灰但仍显示在界面中

- **Issue：** [#14028](https://github.com/esengine/DeepSeek-Reasonix/issues/14028)
- **反馈：** 对话栏中的 Ask 模式为灰色且无法选择，用户不清楚它是否仍有隐藏的启用条件。
- **为何重要：** 属于产品可发现性问题。用户无法判断功能是未开放、配置缺失还是已废弃。
- **社区反应：** 0 条评论、0 个赞，属于新功能发布后出现的界面状态疑问。

### 10. 中间证书吊销事件的安全反馈

- **Issue：** [#14034](https://github.com/esengine/DeepSeek-Reasonix/issues/14034)
- **反馈：** 用户提交了关于 CA 中间证书吊销及潜在私钥泄露的外部安全事件信息。
- **为何重要：** 涉及受信 CA 供应链风险，可能影响相关 TLS 客户端、证书校验和联网模型接口。
- **社区反应：** 0 条评论、0 个赞。
- **提示：** 当前条目仅为社区提交的信息，尚未看到维护者验证或官方结论，不宜仅依据该 Issue 判断事件影响范围。

---

## 4. 重要 PR 进展

### 1. 自定义 Agent 预设资源改为按需加载

- **PR：** [#14015](https://github.com/esengine/DeepSeek-Reasonix/pull/14015)
- **状态：** 已关闭
- **内容：** 新自定义预设仅在启用时加载当前授权资源，不再预先复制全部 Skill 模板、纯工具扩展包或等待可选 MCP 握手。
- **价值：** 直接对应 #14026 的长阻塞问题，降低预设切换耗时和资源占用。

### 2. 新增文件交付卡片与文档预览

- **PR：** [#14031](https://github.com/esengine/DeepSeek-Reasonix/pull/14031)
- **状态：** 已关闭
- **内容：** AI 可通过用户授权的 `present_files` 工具声明交付文件，并在工作台中直接打开；支持 PDF、CSV/TSV、静态 HTML、Markdown 等预览。
- **价值：** 强化 Agent 输出到工作台的文件交付体验，并统一文件树、消息链接和交付卡片的文件身份。

### 3. 修复 OpenCode Go 推理接口及 DeepSeek V4.1 兼容性

- **PR：** [#14029](https://github.com/esengine/DeepSeek-Reasonix/pull/14029)
- **状态：** 已关闭
- **内容：** 补充 OpenCode Go 推理 URL、`deepseek-v4.1-flash`、Go 专用请求头及共享模型能力契约。
- **价值：** 避免 V4.1 Flash 连接遗漏 DeepSeek 思考模式和工具历史重放行为，提升新模型适配完整性。

### 4. 从内容对象重建丢失的完整性索引

- **PR：** [#14019](https://github.com/esengine/DeepSeek-Reasonix/pull/14019)
- **状态：** 已关闭
- **内容：** 不再将索引文件缺失视为不可恢复的硬错误；利用对象中记录的 SHA-256 重建派生索引。
- **价值：** 修复 #14018，避免索引目录异常导致大量会话同时不可读。

### 5. 修正历史索引中的用户文本内容

- **PR：** [#14022](https://github.com/esengine/DeepSeek-Reasonix/pull/14022)
- **状态：** 已关闭
- **内容：** 历史索引改为记录用户原始内容，并排除宿主自动注入的语言、日期、项目指令、Skills 和工作区路径等块。
- **价值：** 提升历史搜索结果与用户可见内容的一致性，避免显示层与索引层数据不一致。

### 6. 扫描历史时先确认源文件确实不存在

- **PR：** [#14024](https://github.com/esengine/DeepSeek-Reasonix/pull/14024)
- **状态：** Open
- **内容：** 调整多进程可写历史投影的扫描逻辑，避免仅凭一次扫描未发现就过早将源标记为缺失。
- **价值：** 降低并发写入期间历史记录被错误清除或显示缺失的风险。

### 7. 区分“历史源损坏”和“无搜索结果”

- **PR：** [#14023](https://github.com/esengine/DeepSeek-Reasonix/pull/14023)
- **状态：** Open
- **内容：** 会话 transcript 无法读取时，不再静默忽略并返回“无匹配结果”，而是将其识别为损坏源并显式报告。
- **价值：** 提升历史搜索的故障可诊断性，避免完整性问题被误报为正常空结果。

### 8. 兼容模型生成的冗余工具参数包装

- **PR：** [#14013](https://github.com/esengine/DeepSeek-Reasonix/pull/14013)
- **状态：** Open
- **内容：** 当目标 Schema 证明外层参数无效时，规范化处理一层多余的 `arguments` JSON 包装。
- **价值：** 减少模型因工具参数结构不匹配而重复发起无效调用的情况，提高工具调用成功率。

### 9. MiniMax 默认模型更新并保留推理契约

- **PR：** [#14017](https://github.com/esengine/DeepSeek-Reasonix/pull/14017)
- **状态：** Open
- **内容：** 将 MiniMax 直接预设优先调整为 `MiniMax-M3.1-Flash`，其次为 M3，并保留推理模型对应的思考控制契约。
- **价值：** 避免新连接继续默认使用 M3 或已退役的 M2.x 系列，降低模型能力与界面控制不匹配的问题。

### 10. 关闭最后一个工作台页面后保留启动器

- **PR：** [#14037](https://github.com/esengine/DeepSeek-Reasonix/pull/14037)
- **状态：** Open
- **内容：** 关闭最后一个页面时不再折叠整个工作台，而是保留启动器及新建页面的三个入口。
- **价值：** 改善多标签页工作流，避免用户关闭最后一页后必须重新打开应用或恢复工作台。

---

## 5. 功能需求趋势

### 1. Agent 预设与会话级能力管理

社区正从全局 Agent 配置转向“按会话绑定人设、工具、模块和权限”的模式。后续重点预计包括：

- 预设切换延迟；
- Skill、扩展和 MCP 资源的按需加载；
- 权限与配置编辑授权边界；
- 跨项目迁移及继承资源行为。

### 2. 多模型与 Provider 兼容

模型适配仍是高频方向，包括：

- OpenCode Go 等新推理端点；
- DeepSeek V4.1、MiniMax M3.1 等新模型；
- Intern AI Discovery 等第三方模型平台；
- 模型发现、命中率和能力配置；
- 思考模式、工具历史重放等推理契约同步。

### 3. 多会话、多代理并发与锁治理

用户开始系统关注多会话、多子代理共同修改文件时的锁竞争问题。需求方向包括：

- 更细粒度的资源锁；
- 可配置的安全/性能等级；
- 长任务等待状态可视化；
- 避免单个一小时级会话阻塞其他会话；
- 防止死锁和锁残留。

### 4. 视觉与工具结果传递

工具已经可以生成或读取像素，但缺少将工具输出直接作为模型图像输入的完整管线。补齐这一环后，浏览器截图、像素分析、视觉子代理和图像生成验证将不再依赖高成本截图绕行。

### 5. 文件交付与文档预览

AI 生成文件不再只作为文本或链接出现，而是需要在工作台内提供统一身份、可信预览和直接打开能力。PDF、CSV/TSV、静态 HTML、Markdown 等格式预计会继续扩展。

### 6. 历史搜索与数据恢复

社区同时关注历史索引准确性、损坏源提示、旧会话恢复和隔离目录迁移。核心诉求是：

- 搜索结果与用户可见内容一致；
- 文件缺失与损坏不能静默处理；
- 索引可自愈；
- 1.x/2.x 存储和锁目录严格隔离。

### 7. 桌面多标签页与界面可发现性

多标签页性能已有专项反馈；同时 Ask 模式置灰、贡献榜无数据、会话状态提示不清等问题说明 UI 需要更好地表达：

- 功能是否可用；
- 启用条件是什么；
- 当前状态来自哪里；
- 是否存在降级或异常。

---

## 6. 开发者关注点

开发者反馈呈现出几个明显痛点：

- **稳定性优先于功能数量。** 内存升至数 GB、主机卡死、全部会话不可读属于高影响问题，用户更关注版本升级后是否可靠。
- **长会话资源管理仍是难点。** 会话快照、Skill 目录加载、历史索引扫描和多进程写入都会放大内存、延迟与锁竞争。
- **并发协作需要更清晰的资源模型。** 多会话与多子代理共享工作区时，锁粒度、等待策略和失败恢复比单纯增加并发数更重要。
- **模型兼容不能只停留在模型名称。** Provider 接入还需同步推理端点、请求头、思考控制、工具调用历史和模型能力声明。
-

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报｜2026-10-21

## 今日速览

过去 24 小时无新版本发布，开发者重点集中在 **v2 稳定性、会话迁移、上下文压缩、Provider 兼容性及桌面端交互体验**。多个高关注度问题已有对应修复 PR，包括环境变量替换、压缩冲突与历史重载；同时，模型版本透明化、自动化认证和子任务可靠性成为新的功能需求。

## 社区热点 Issues

1. **公开 Go Plan 模型的实际版本与 checkpoint**  
   [#41969](https://github.com/anomalyco/opencode/issues/41969)  
   用户希望官方明确每个 Go Plan 模型实际服务的模型版本或 checkpoint，例如 `deepseek-v4-flash` 是否对应 `0731`。该 Issue 获得 **12 个点赞、15 条评论**，是本期社区反应最热烈的问题，反映出模型路由透明度、结果可复现性和版本变更追踪的重要性。

2. **IP 滥用检测导致 OpenCode 模型无法访问**  
   [#57231](https://github.com/anomalyco/opencode/issues/57231)  
   报告者称访问免费模型时触发 IP 滥用检测并被阻止，目前处于关闭、分诊状态。问题虽只有 **3 条评论**，但直接涉及服务可用性、误封申诉及免费模型的公平访问，建议关注官方处理结论。

3. **切换系统焦点后，TUI 的 `ctrl+x` leader 键失效**  
   [#57487](https://github.com/anomalyco/opencode/issues/57487)  
   在终端失去并重新获得焦点后，`ctrl+x` 会间歇性失效，而 `ctrl+p`、输入、鼠标和界面重绘仍然正常。已有 **3 条评论**，属于 TUI 键盘状态同步方面的可复现回归。

4. **OpenAI-compatible Provider 被强制注入不兼容字段**  
   [#57230](https://github.com/anomalyco/opencode/issues/57230)  
   OpenCode 会在所有兼容 Provider 请求中强制加入 `stream_options` 和 `store`，导致仅部分兼容 OpenAI API 的服务返回 HTTP 400。该问题已有 **2 条评论** 并被关闭分诊，核心诉求应是按 Provider 能力或配置决定是否注入可选字段。

5. **自动压缩可能跳过已持久化的原生子任务**  
   [#57496](https://github.com/anomalyco/opencode/issues/57496)  
   在父工具调用触发自动压缩时，`noReply: true` 的 native subtask 可能一直未被执行。该问题已有 **2 条评论**，其影响涉及任务可靠性、Agent 编排以及消息队列的调度顺序。

6. **v1→v2 会话迁移遗漏首次启动 v2 后创建的 v1 会话**  
   [#57226](https://github.com/anomalyco/opencode/issues/57226)  
   用户先启动 v2、回滚至 v1 并创建新会话，再次升级 v2 后，这些 v1 会话不会导入 v2，仍滞留于旧 `session` 表。该问题有 **2 条评论**，对混合版本使用、回滚和会话连续性影响较大。

7. **插件初始化缓慢会导致所有 GitHub Copilot 模型被禁用**  
   [#57495](https://github.com/anomalyco/opencode/issues/57495)  
   当任一插件的 `setup()` 耗时约 500ms 以上时，Copilot 模型会被统一标记为 `enabled: false`，并从 `/models` 和 CLI 模型列表中消失。该问题已有 **2 条评论**且已复现，暴露了 Provider 初始化与插件加载之间的竞态或错误传播问题。

8. **网络接口切换会静默取消子 Agent 任务**  
   [#57538](https://github.com/anomalyco/opencode/issues/57538)  
   从 Wi-Fi 切换至 Ethernet 等网络变化会令后台或前台 subagent 进入 `cancelled` 状态，但没有错误信息，也无法恢复。该问题已有 **2 条评论**，对长时间运行任务、远程模型调用和自动化工作流影响明显。

9. **支持 `auth login` 非交互式 API Key 登录**  
   [#57492](https://github.com/anomalyco/opencode/issues/57492)  
   用户希望能够通过 CLI 直接传入 API Key，而不必进入交互式选择流程。该需求已有 **2 条评论**，适合 CI、容器、脚本化环境和自动化开发流程。

10. **环境变量替换 fallback 可能破坏合法 JSONC**  
    [#57554](https://github.com/anomalyco/opencode/issues/57554)  
    v2 的 fallback 在处理 Windows 路径转义时，可能将原始 JSON 片段变为非法 JSON，或改变已转义字符串的语义，最终导致配置无法加载。该问题已有 **1 条评论**且已复现，并已有对应修复 PR。

## 重要 PR 进展

1. **客户端重同步时重新读取完整历史**  
   [#57547](https://github.com/anomalyco/opencode/pull/57547)  
   桌面端在重连或工具仍在运行时重新读取会话记录，将按已加载页数从服务端获取内容并整体替换，避免此前只保留新增消息而导致历史折叠。

2. **分组展示排队与 Steer 消息**  
   [#57561](https://github.com/anomalyco/opencode/pull/57561)  
   连续等待发送的 Steer 消息将采用与已发送消息一致的分组样式，并以单行 `Pending · agent · model · time` 展示状态，改善消息队列的视觉层次。

3. **修复环境变量 fallback 破坏合法配置**  
   [#57556](https://github.com/anomalyco/opencode/pull/57556)  
   修复 v2 fallback 在 Windows 路径转义过程中干扰原始值和已转义值的问题，关闭 [#57554`](https://github.com/anomalyco/opencode/issues/57554)。

4. **压缩摘要使用与普通轮次一致的输出上限**  
   [#57564](https://github.com/anomalyco/opencode/pull/57564)  
   解决压缩摘要受限于 32K 输出 token、推理 token 耗尽后触发输出上限错误的问题，使 compaction summary 的 token 限制与普通模型输出保持一致。

5. **压缩冲突时保留 Undo 状态**  
   [#57555](https://github.com/anomalyco/opencode/pull/57555)  
   当手动压缩因 `CompactionConflictError` 被拒绝时，不再提前确认 staged undo、截断历史或清空 redo，对应修复 [#57553`](https://github.com/anomalyco/opencode/issues/57553)。

6. **未跟踪目录在 Review 中合并为单行**  
   [#57527](https://github.com/anomalyco/opencode/pull/57527)  
   Review 启动器此前会将未跟踪目录中的每个文件都计为独立变更，可能显示“45210 files changed”；修复后未跟踪文件夹会作为单个 review row 展示。

7. **会话项目改为 Chip 样式展示**  
   [#57568](https://github.com/anomalyco/opencode/pull/57568)  
   移除会话标题与项目名称之间的斜杠，改用低干扰的项目 Chip，降低界面被误读为文件路径的可能性。

8. **优化桌面端侧边栏标签切换**  
   [#57507](https://github.com/anomalyco/opencode/pull/57507)  
   改善空侧栏、新建标签页及标签切换过程中的闪烁和响应速度，减少浏览器式空白页面对用户造成的干扰。

9. **让问题、权限请求和排队消息从 Composer 平滑展开**  
   [#57559](https://github.com/anomalyco/opencode/pull/57559)  
   权限检查、问题和待发送提示不再突然替换 Composer 区域，而是将 Composer 转换为 dock 后再返回，并让排队消息在原位置展开，减少时间线跳动。

10. **启动时加载内置 Agent，并在加载完成前阻止发送**  
    [#57549](https://github.com/anomalyco/opencode/pull/57549)  
    每个 Location 启动时都会先加载内置 Agent；此前 Agent registry 为空会导致发送后长时间停留在“请选择 Agent 和模型”，修复后会在加载期间明确阻止发送。

## 功能需求趋势

### 1. 模型可观测性与版本透明度
[#41969](https://github.com/anomalyco/opencode/issues/41969) 是本期热度最高的需求。社区希望不仅知道“使用哪个模型”，还要知道实际 checkpoint、路由策略和版本变更，以支持复现、评测与故障排查。

### 2. Provider 兼容性与认证自动化
社区同时关注 OpenAI-compatible 请求参数兼容问题（[#57230](https://github.com/anomalyco/opencode/issues/57230)）和非交互式 API Key 登录（[#57492](https://github.com/anomalyco/opencode/issues/57492)）。整体方向是：Provider 能力应按配置协商，认证流程应适合脚本与 CI。

### 3. Agent、子任务与网络异常恢复
子任务被压缩流程跳过（[#57496](https://github.com/anomalyco/opencode/issues/57496)）及网络切换导致静默取消（[#57538](https://github.com/anomalyco/opencode/issues/57538)）表明，开发者希望长时间运行任务具备更明确的执行状态、错误说明与恢复能力。

### 4. 会话迁移、压缩与 Undo 的数据安全
v1/v2 迁移遗漏（[#57226](https://github.com/anomalyco/opencode/issues/57226)）、压缩冲突（[#57553](https://github.com/anomalyco/opencode/issues/57553)）和历史重同步问题，集中在同一诉求：会话数据不能因版本切换、压缩失败或连接重建而丢失。

### 5. 桌面端和 TUI 交互质量
TUI 焦点切换后的快捷键失效（[#57487](https://github.com/anomalyco/opencode/issues/57487)），以及大量 Session UI、Review、Composer 和侧栏 PR，表明社区已进入“核心能力可用后 polishing”的阶段。

## 开发者关注点

- **状态管理必须可靠**：网络变化、插件初始化、焦点切换等事件不应导致模型消失、快捷键失效或子任务静默取消。
- **错误处理应透明**：压缩冲突、任务取消和配置解析失败需要明确错误原因、日志与可恢复路径，避免仅显示 `cancelled` 或含糊异常。
- **历史数据不可意外丢失**：会话迁移、压缩、Undo/Redo 和客户端重连都应采用原子化、可验证的数据处理方式。
- **Provider 应避免“一刀切”行为**：可选参数、认证流程和模型能力应依据 Provider 配置动态处理。
- **自动化场景是高频刚需**：CI、非交互登录、稳定的环境变量替换和可靠的模型选择，直接影响 OpenCode 在脚本及团队工作流中的可用性。
- **长上下文压缩仍需加强**：当前关注点不只是“能否压缩”，还包括推理 token 占用、摘要输出上限，以及压缩与子任务调度之间的协作。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报｜2026-10-21

## 1. 今日速览

过去 24 小时没有新版本发布，仓库共有 **5 条 Issue 更新、50 条 PR 更新**。今日重点集中在 Windows 稳定性和跨平台兼容：Windows Desktop 多配置冷启动、内存插件加载死锁，以及本地模型、Docker、OpenAI Codex OAuth 等安装与配置问题受到关注；PR 侧则集中推进安全边界、审批机制、Kanban 调度和网关可靠性改进。

## 2. 版本发布

过去 24 小时内**没有新的 Release**，暂无版本更新内容可汇总。

## 3. 社区热点 Issues

> 今日数据源仅提供了 5 条更新过的 Issue，因此以下列出全部 5 条，不补造其余条目。整体关注度以评论数衡量，尚无点赞。

1. **Godmode dry run 忽略 `model.default`，Codex OAuth 报模糊 API Key 错误**  
   - **优先级**：P2  
   - **作者**：@dustinzmaves-beep  
   - **社区反应**：5 条评论  
   - **重要性**：官方 Godmode skill 在合法配置下无法通过 dry run 启动；显式指定模型后，OAuth 模式又错误提示“未找到 API Key”，掩盖了真正的传输兼容性原因。这同时影响模型配置、认证和开发者调试体验。  
   - **链接**：[Issue #142286](https://github.com/NousResearch/hermes-agent/issues/142286)

2. **Linux + NVIDIA 本地模型开箱即用体验基本不可用**  
   - **优先级**：P2  
   - **作者**：@randsondev  
   - **社区反应**：3 条评论  
   - **重要性**：默认配置可能解析到不存在的 CUDA 资源，桌面端入口又被 Linux 专属启动参数隐藏；8 GB 显卡还会受到 64K 上下文下限影响。该问题集中暴露了本地模型安装、资源探测、UI 暴露和显存适配之间的断层。  
   - **链接**：[Issue #120872](https://github.com/NousResearch/hermes-agent/issues/120872)

3. **Windows Kanban worker 加载 NumPy 时死锁**  
   - **优先级**：P2  
   - **作者**：@lychee888  
   - **社区反应**：3 条评论  
   - **重要性**：Windows 上由 gateway 调度的 `managed_worker` 在内存提供方插件延迟导入 NumPy/C 扩展时，可稳定复现 loader-lock 死锁。该问题直接影响任务执行可靠性，且涉及插件加载并发模型。  
   - **链接**：[Issue #142271](https://github.com/NousResearch/hermes-agent/issues/142271)

4. **Docker 安装指南与推荐的沙箱终端后端配置不一致**  
   - **优先级**：P3  
   - **作者**：@PassagewayStudio  
   - **社区反应**：2 条评论  
   - **重要性**：API Server 对外暴露时会建议使用 `terminal.backend: docker`，但官方 Docker 指南中的 `docker run` 和 Compose 示例没有挂载 Docker socket，也未完整配置后端所需能力。用户按官方建议操作仍无法获得安全终端。  
   - **链接**：[Issue #142256](https://github.com/NousResearch/hermes-agent/issues/142256)

5. **Windows Desktop 多 Profile 网关冷启动固定 60 秒超时**  
   - **优先级**：P2  
   - **作者**：@xsaszander  
   - **社区反应**：1 条评论  
   - **重要性**：复用同一 gateway、串行连接约 21 个 Profile 时，Desktop 会在固定的 60 秒 `gateway ensure` 截止时间后放弃启动；网关本身随后可能健康，但 READY 状态要等所有次级 Profile 连接后才发布。这是典型的多租户启动扩展性问题。  
   - **链接**：[Issue #142296](https://github.com/NousResearch/hermes-agent/issues/142296)

## 4. 重要 PR 进展

1. **恢复使用 GitHub 托管 Runner 执行安装、更新测试与 Docker 发布**  
   - 涉及 `install-e2e` 的 macOS、Windows 工作流及 `docker.yml`，恢复原有 Runner 与 Actions，使稳定版本能够重新通过发布链路。  
   - **链接**：[PR #142295](https://github.com/NousResearch/hermes-agent/pull/142295)

2. **Kanban 委派子进程写入围栏改为异常时默认拒绝**  
   - 当 `agent.delegation_context` 无法评估时，不再把异常误判为“非委派子进程”，而是安全地关闭写入权限。  
   - **链接**：[PR #109867](https://github.com/NousResearch/hermes-agent/pull/109867)

3. **Tabella 2.0.2 增加 Windows 原生支持**  
   - 更新插件目录条目并重新固定版本，降低 Windows 用户使用 Tabella MCP 插件的门槛。  
   - **链接**：[PR #142297](https://github.com/NousResearch/hermes-agent/pull/142297)

4. **Google Connector 结果请求路由至不用于训练的端点**  
   - 当上下文包含 Google Workspace Connector 数据时，Hermes Portal 仅允许选择不进行训练的端点；若不存在兼容端点则停止请求，不进行不安全回退。  
   - **链接**：[PR #142292](https://github.com/NousResearch/hermes-agent/pull/142292)

5. **为 Kanban 增加单板并发 worker 上限**  
   - 新增 `kanban.max_spawn_by_board`，避免单个深队列看板占满共享的 `kanban.max_in_progress` 预算，导致其他看板无法派生 worker。  
   - **链接**：[PR #137662](https://github.com/NousResearch/hermes-agent/pull/137662)

6. **保护 `.hermes.md` / `HERMES.md` 项目指令文件**  
   - 为高优先级项目上下文文件增加写入保护，并引入 `protected_instruction_allowlist_dirs`，降低上下文指令被工具意外覆盖的安全风险。  
   - **链接**：[PR #137554](https://github.com/NousResearch/hermes-agent/pull/137554)

7. **自动维护孤立消息记录并合并双 FTS5 索引**  
   - 清理 `state.db` 中已删除会话遗留的 message 行，同时合并两套全文检索索引，降低会话存储膨胀和搜索结果不一致。  
   - **链接**：[PR #137517](https://github.com/NousResearch/hermes-agent/pull/137517)

8. **修复 `hermes approvals test` 对模式键永久审批的误判**  
   - 让 dry-run 审批测试与运行时保持一致，正确识别以 pattern key 表达的长期审批，避免错误显示 `ask-approval`。  
   - **链接**：[PR #136952](https://github.com/NousResearch/hermes-agent/pull/136952)

9. **修复 Git 全局参数绕过破坏性命令审批规则**  
   - 原规则只匹配 `git <verb>`，而 `git -C /tmp/repo push` 等全局参数会绕过检测；本 PR 扩展匹配逻辑，封堵同类审批绕过。  
   - **链接**：[PR #136527](https://github.com/NousResearch/hermes-agent/pull/136527)

10. **修复 Desktop 恢复会话时仅按连接匹配 Profile**  
    - `rememberedOwnerForResume` 现在要求缓存 owner 与目标记录所属 Profile 一致，避免同一服务器上跨 Profile 复制 session ID 时恢复到错误会话。  
    - **链接**：[PR #142294](https://github.com/NousResearch/hermes-agent/pull/142294)

## 5. 功能需求趋势

### 1. Windows 与跨平台可靠性
今日 Issue 和 PR 中，Windows 是最突出的平台。关注点包括：

- Desktop 多 Profile 网关冷启动；
- Kanban worker 的插件加载死锁；
- 本地终端进程句柄兼容性；
- WhatsApp 换号后的 LID 绑定；
- 安装、更新和 Docker 发布在 Windows/macOS Runner 上可重复执行。  
  代表条目：[Issue #142271](https://github.com/NousResearch/hermes-agent/issues/142271)、[Issue #142296](https://github.com/NousResearch/hermes-agent/issues/142296)、[PR #142295](https://github.com/NousResearch/hermes-agent/pull/142295)

### 2. 本地模型与异构硬件适配
社区希望本地模型在 Linux/NVIDIA 环境下真正可用，覆盖 CUDA 资源探测、低显存 GPU 上下文策略、Linux 桌面入口、下载中断续传及半成品清理。  
代表条目：[Issue #120872](https://github.com/NousResearch/hermes-agent/issues/120872)、[PR #140109](https://github.com/NousResearch/hermes-agent/pull/140109)

### 3. 模型配置与认证可诊断性
Godmode dry run 对 `model.default`、Codex OAuth 和 API Key 错误的处理不够明确，反映出用户需要更可靠的默认模型解析，以及可操作的认证错误提示。  
代表条目：[Issue #142286](https://github.com/NousResearch/hermes-agent/issues/142286)

### 4. 沙箱终端与部署安全
Docker 后端、终端审批和项目指令文件保护是另一条主线。社区不仅关注“能否运行”，也关注默认配置是否安全、文档是否可复现，以及危险操作能否被可靠拦截。  
代表条目：[Issue #142256](https://github.com/NousResearch/hermes-agent/issues/142256)、[PR #137554](https://github.com/NousResearch/hermes-agent/pull/137554)、[PR #136527](https://github.com/NousResearch/hermes-agent/pull/136527)

### 5. 调度、并发与任务隔离
Kanban 方向持续涌现，包括单板并发限制、委派写入权限、调度熔断、启动 seam 故障分类和 Cron occurrence 标识传递。核心诉求是避免单任务拖垮全局，并提高故障可诊断性。  
代表条目：[PR #137662](https://github.com/NousResearch/hermes-agent/pull/137662)、[PR #109867](https://github.com/NousResearch/hermes-agent/pull/109867)、[PR #136253](https://github.com/NousResearch/hermes-agent/pull/136253)

### 6. 隐私与数据训练路由
Google Workspace Connector 数据在进入 Nous Portal 时，需要明确路由到不用于训练的端点，反映社区对上下文数据用途透明化与可控性的重视。  
代表条目：[PR #142292](https://github.com/NousResearch/hermes-agent/pull/142292)

## 6. 开发者关注点

- **错误信息必须可诊断**：类似“No API key found”这样的笼统提示会直接阻断 dry run；开发者希望错误明确指出是默认模型解析、OAuth 传输支持还是凭据配置问题。  
  [Issue #142286](https://github.com/NousResearch/hermes-agent/issues/142286)

- **文档示例应可直接落地**：Gateway 推荐 Docker 沙箱，但官方部署示例缺少关键配置，说明“建议配置”和“安装指南”之间缺少一致性验证。  
  [Issue #142256](https://github.com/NousResearch/hermes-agent/issues/142256)

- **多 Profile 场景需要弹性超时**：固定 60 秒冷启动窗口无法适应大型配置，需要区分核心 gateway 就绪与次级 Profile 串行连接，并提供进度或动态 deadline。  
  [Issue #142296](https://github.com/NousResearch/hermes-agent/issues/142296)

- **插件和本地扩展的加载必须避免死锁**：内存插件、C 扩展和受管 worker 的组合在 Windows 上存在 loader-lock 竞态，需要更严格的导入边界和并发约束。  
  [Issue #142271](https://github.com/NousResearch/hermes-agent/issues/142271)

- **本地模型需要面向低显存硬件设计**：仅支持高 CUDA 资产或设置过高上下文下限，会让 8 GB 显卡用户无法顺畅使用；下载、安装和恢复流程也应具备可恢复性。  
  [Issue #120872](https://github.com/NousResearch/hermes-agent/issues/120872)、[PR #140109](https://github.com/NousResearch/hermes-agent/pull/140109)

- **安全规则应按实际命令语义匹配**：Git 全局参数能够绕过危险命令检测，审批规则需要解析参数位置、目标分支和命令效果，而不只是依赖简单正则。  
  [PR #136527](https://github.com/NousResearch/hermes-agent/pull/136527)、[PR #136404](https://github.com/NousResearch/hermes-agent/pull/136404)

- **升级过程不能产生混合版本服务**：长期运行的 gateway 需要基于内容或版本一致性检测拒绝加载不同 revision，避免更新后进程状态不一致。  
  [PR #136343](https://github.com/NousResearch/hermes-agent/pull/136343)

- **多任务系统需要公平的资源预算**：单一全局 `max_spawn` 容易造成看板饥饿；社区倾向于同时提供全局预算和单板预算，并让异常默认安全关闭。  
  [PR #137662](https://github.com/NousResearch/hermes-agent/pull/137662)、[PR #109867](https://github.com/NousResearch/hermes-agent/pull/109867)

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报

**日期：2026-10-21**  
**数据范围：github.com/openclaw/openclaw 过去 24 小时**

## 1. 今日速览

过去 24 小时没有新版本发布，但有 **8 个 Issue 更新、50 个 PR 更新**，社区重点集中在**会话状态与消息可靠交付、升级兼容性、跨渠道路由**。其中，崩溃恢复后会话不可用、Claude CLI 回复未落盘，以及 transcript 幂等冲突被误判为模型故障，值得优先关注。

---

## 3. 社区热点 Issues

> 过去 24 小时实际只有 8 个 Issue 更新，以下覆盖全部 8 条；其中部分 Issue 是此前创建、今日继续讨论。

### 1. 崩溃恢复后会话持续不可用

- **问题**：Gateway 异常退出后，后台 Agent 准备阶段因 `SQLite session reclamation commit checkpoint expired` 失败，随后 `chat.history`、`chat.metadata`、`models.list` 等请求持续返回 `UNAVAILABLE`。
- **重要性**：同时影响**会话状态、消息丢失和可用性**，属于 P0，并带有 release blocker 标记；可能造成恢复后的 Agent 长时间无法服务。
- **社区反应**：7 条评论、0 个点赞；问题已有复现线索，但被标记为当前 main 分支暂未复现。
- **链接**：[Issue #166634](https://github.com/openclaw/openclaw/issues/166634)

### 2. transcript 幂等冲突触发错误的跨 Provider 回退

- **问题**：Slack 私信出现 transcript idempotency key 冲突后，系统将其误判为模型失败，并继续遍历整个 fallback chain。
- **重要性**：本应属于消息幂等或状态冲突，却被错误地解释成 Provider 故障，可能造成**重复请求、额外费用、错误切换模型及响应延迟**。
- **社区反应**：2 条评论、0 个点赞；Issue 已获得 source repro、fix-shape-clear 和 queueable-fix 标记，说明维护流程已较成熟。
- **链接**：[Issue #177909](https://github.com/openclaw/openclaw/issues/177909)

### 3. Claude CLI 回合完成，但最终回复未提交或投递

- **问题**：Discord 上的 `claude-cli` 回合已经执行完工具调用并产生正常大小的最终输出，但回复没有写入 session transcript，也没有投递到 Discord，且没有错误日志。
- **重要性**：这是典型的**静默消息丢失**，工具副作用已发生，用户却收不到结果；对自动化 Agent 尤其危险。
- **社区反应**：1 条评论、0 个点赞；目前仍需复现。
- **链接**：[Issue #178873](https://github.com/openclaw/openclaw/issues/178873)

### 4. Codex app-server 版本与托管运行时 pin 不一致

- **问题**：OpenClaw `2026.10.10-beta.2` 将 Codex app-server `0.163.0` 判断为高于托管运行时 pin `0.160.0`，启动时产生警告；配置命令还可能指向已移除的运行时。
- **重要性**：反映**托管组件升级、版本检测和 pin 策略**之间存在不一致，可能影响启动体验及运行时可用性。
- **社区反应**：4 条评论、0 个点赞，讨论热度在当日 Issues 中较高。
- **链接**：[Issue #177742](https://github.com/openclaw/openclaw/issues/177742)

### 5. 升级流程无法处理旧版 `sqlite_stat4` 表

- **问题**：`openclaw update` 或 `openclaw doctor --fix` 在激活前可能因 `ScopedMigrationSnapshotUnsupportedError` 失败，原因是共享数据库仍保留空的旧版 `sqlite_stat4` 表。
- **重要性**：直接阻塞**升级与自动修复**，影响从旧版本迁移的用户。
- **社区反应**：1 条评论、0 个点赞；已有对应修复 PR #178869。
- **链接**：[Issue #177865](https://github.com/openclaw/openclaw/issues/177865)

### 6. 全局安装升级失败

- **问题**：版本 `2026.10.4` 在 Linux/x64、Node.js `26.12.0` 环境下，通过 CLI 执行更新时报告 global-install foreign-destination 更新失败。
- **重要性**：涉及**全局 npm 安装路径、权限和安装目标识别**，属于常见的升级阻断场景。
- **社区反应**：1 条评论、0 个点赞；报告已由 OpenClaw 审核确认。
- **链接**：[Issue #177239](https://github.com/openclaw/openclaw/issues/177239)

### 7. Control UI 的 OpenAI 用量始终显示 0%

- **问题**：聊天上下文的 token/usage 弹窗对两个 OpenAI 使用量窗口均显示 `0%`，但 `openclaw status --usage --json` 返回了非零 `usedPercent`。
- **重要性**：说明**CLI 与 Web UI 的数据源或序列化链路不一致**，可能影响用户判断额度消耗。
- **社区反应**：1 条评论、0 个点赞；目前处于 intake 阶段。
- **链接**：[Issue #178872](https://github.com/openclaw/openclaw/issues/178872)

### 8. Doctor 修复方法在进度回调中丢失 `this` 上下文

- **问题**：Doctor 的结构化修复 runner 在调用健康检查的 `repair` 方法前将其解绑，依赖 `this` 的方法因此失去 receiver；现有类型检查规则未能拦截。
- **重要性**：影响 **Doctor 自动修复、运行时行为和静态检查准确性**。由于无法在 main 上复现，Issue 已关闭。
- **社区反应**：1 条评论、0 个点赞；关闭状态表明当前版本可能已不再复现。
- **链接**：[Issue #178868](https://github.com/openclaw/openclaw/issues/178868)

---

## 4. 重要 PR 进展

### 1. 定时会话统一接入普通会话 admission

- 将既有 `session:<key>` 定时 Agent 回合纳入普通会话的 admission 与 mailbox 机制，避免定时任务绕过现有生命周期管理。
- **影响**：直接关系消息交付和系统可用性，属于 P1，并标记 message-delivery、availability 合并风险。
- **链接**：[PR #178764](https://github.com/openclaw/openclaw/pull/178764)

### 2. 升级流程不再被旧版 SQLite 统计表阻塞

- 修复 `openclaw update` 和 `openclaw doctor --fix` 因遗留 `sqlite_stat4` 表触发 `ScopedMigrationSnapshotUnsupportedError` 的问题，关联 Issue #177865。
- **影响**：降低升级失败率，并提升旧数据库迁移的兼容性。
- **链接**：[PR #178869](https://github.com/openclaw/openclaw/pull/178869)

### 3. 调度器可引导正在运行的 Claude CLI 子任务

- 修复 coordinator 无法通过 `sessions_send` 的 `mode: "steer"` 向自身 Claude CLI 子进程追加指导的问题。
- **影响**：增强多 Agent 协作中的实时干预能力，关联 Issue #178822。
- **链接**：[PR #178865](https://github.com/openclaw/openclaw/pull/178865)

### 4. Daybreak 与即将退役的模型别名解耦

- 重构 Daybreak 工作流，不再依赖计划于 2026-10-28 退役的 Blue/Red 模型别名，改为显式选择 Access program。
- **影响**：降低模型别名退役造成的破坏性影响；PR 涉及 Web UI、Gateway、Agent 和文档，并标记安全敏感变更及兼容性风险。
- **链接**：[PR #177812](https://github.com/openclaw/openclaw/pull/177812)

### 5. Slack 回退机器人不再误答其他机器人的线程

- 修复同一频道安装多个 Slack App 时，回退机器人会处理由另一机器人发起、且未提及自己的线程回复。
- **影响**：减少跨机器人线程串话，改善消息路由隔离。
- **链接**：[PR #178879](https://github.com/openclaw/openclaw/pull/178879)

### 6. Codex 原生 follow-up 完成后解除父任务占用

- 修复原生 follow-up 已执行完成、但结果尚未确认时，父请求仍被 `thread ... is claimed by active work` 拒绝的问题。
- **影响**：避免 Agent 父任务无法冷恢复或继续执行，属于 P1。
- **链接**：[PR #177577](https://github.com/openclaw/openclaw/pull/177577)

### 7. ClawRouter 增加原生图像生成能力

- 为 ClawRouter bundled native plugin 注册图像生成 Provider，使原生图像请求可以进入 JSON Images API。
- **影响**：扩展模型与工具能力，改善图像生成支持不足的问题。
- **链接**：[PR #178876](https://github.com/openclaw/openclaw/pull/178876)

### 8. Gateway 正常关闭时不再输出误导性失败日志

- 调整 provider catalog、cron startup 和 session recovery 的关闭流程，避免把预期取消及拒绝后台准入记录为真实故障。
- **影响**：提升日志可操作性，减少告警噪音。
- **链接**：[PR #178864](https://github.com/openclaw/openclaw/pull/178864)

### 9. QR 审批命令保留所选 Profile

- 修复 `openclaw --profile <name> qr` 输出的审批命令丢失 Profile、可能误操作默认 Profile 的问题。
- **影响**：增强多 Profile 环境下 CLI 操作的安全性和可复制性。
- **链接**：[PR #178878](https://github.com/openclaw/openclaw/pull/178878)

### 10. iOS 资源诊断减少进程轮询

- 优化 iOS resource collector，避免截图 runner 超时后仍反复扫描进程，同时保留主机资源指标和诊断能力。
- **影响**：降低繁忙环境下的诊断开销，无用户可见行为变化。
- **链接**：[PR #178863](https://github.com/openclaw/openclaw/pull/178863)

### 其他值得留意

- **Core 清理私有控制项与测试 seam**：移除无运行时调用方的旧接口，降低内部维护复杂度，但涉及安全敏感代码。[PR #178807](https://github.com/openclaw/openclaw/pull/178807)
- **Memory 减少冗余发布工作**：优化首次使用时的连接策略 SQL、缓存计数及重复的 shadow-preflight 请求。[PR #178871](https://github.com/openclaw/openclaw/pull/178871)
- **Kitchen Sink E2E 兼容 0.4.1 诊断变化**：适配插件发布后 registrar probe 的新诊断输出。[PR #178862](https://github.com/openclaw/openclaw/pull/178862)

---

## 5. 功能需求趋势

### 会话生命周期与消息可靠性

今日最明确的需求是让所有消息路径共享一致的 admission、幂等、提交与投递机制。定时任务、transcript 冲突、Claude CLI 最终回复和崩溃恢复都暴露出状态机边界不一致的问题。

### 升级、迁移与运行时版本治理

社区持续关注：

- 旧 SQLite 数据库能否无阻塞升级；
- 全局安装、Profile、Doctor 修复能否可靠完成；
- Codex app-server 等托管组件如何检测版本、pin 和退役别名；
- 升级失败时是否能给出准确诊断。

### 多 Agent 运行时控制

协调器向运行中子任务注入指导、Codex follow-up 占用释放、定时会话接入 admission，显示社区正在从“能调用 Agent”转向“能可靠编排多个 Agent”。

### 多渠道与机器人隔离

Slack、Discord、Telegram 等渠道的线程归属、fallback bot 行为、原生附件处理和最终消息投递，成为跨渠道可靠性的核心。

### 新模型与多媒体能力

Daybreak 的模型别名迁移以及 ClawRouter 原生图像生成，反映社区对新模型接入、模型退役兼容和多媒体工具链的持续需求。

### UI 可观测性

Control UI 配额显示、模型选择器、上下文用量等需求表明，用户希望 CLI、Gateway 与 Web UI 提供一致且准确的运行状态。

---

## 6. 开发者关注点

1. **静默失败比显式报错更危险**  
   Claude CLI 已完成工具调用但回复未落盘，且没有错误日志。开发者希望系统能明确区分“执行完成”“结果已持久化”和“消息已投递”。

2. **状态冲突与模型故障需要分层处理**  
   transcript idempotency 冲突应留在会话/幂等层处理，避免触发跨 Provider fallback，造成重复调用和额外成本。

3. **升级链路需要兼容真实存量环境**  
   旧 SQLite 表、全局 npm 安装目录、Node.js 版本差异等环境问题，仍是升级阻断的主要来源。

4. **托管组件版本策略需要更透明**  
   Codex app-server 与 pin 不匹配、模型别名退役等事件，需要更明确的兼容窗口、迁移提示和自动适配。

5. **多 Agent 编排需要一致的控制语义**  
   steer、follow-up acknowledgement、session admission 等机制应统一，避免父任务被子任务错误锁定。

6. **渠道路由必须尊重线程和机器人边界**  
   同一频道存在多个机器人时，fallback bot 不应接管其他机器人发起的线程，降低串话和错误响应风险。

7. **测试清理正转向更高价值场景**  
   多个 PR 在移除低价值测试、冗余 fixture 和 SQLite preload，同时加强 E2E、跨渠道和故障恢复测试。社区关注点已从“测试数量”转向“能否覆盖真实故障路径”。

:::
