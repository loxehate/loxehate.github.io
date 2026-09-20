---
title: "AI CLI 工具社区动态日报"
published: 2026-09-20
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-20

> 生成时间: 2026-09-20 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具社区动态横向对比分析报告（2026-09-20）

## 1. 生态全景

AI CLI 工具已从"编码辅助"演变为开发者的关键基础设施，本次覆盖的 7 个工具中 6 个有实质社区活动，整体处于高速迭代期：OpenAI Codex 单日合并 50 个 PR 并连发 4 个 alpha 版本，Claude Code 在企业级功能（服务端分类器）上稳步推进，Gemini CLI 在 Agent 架构（AST 代码导航、持久任务追踪）上探索最深。但共性问题同样尖锐——Windows 平台稳定性、静默数据损坏、会话持久化可靠性成为全行业待解难题，且已直接影响用户信任与付费意愿。跨设备同步、多端一致性、消息投递可靠性正在成为新的差异化竞争维度。

## 2. 各工具活跃度对比

*数据窗口：2026-09-19 至 2026-09-20，包含热点/更新条目数*

| 工具 | Issues（24h 更新） | PR（24h 更新） | Release | 活跃特征 |
|---|---|---|---|---|
| Claude Code | 10 | 3 | 1（v2.1.278） | 稳定迭代期，3 个 PR 全部聚焦 diff 面板行为统一 |
| OpenAI Codex | 10（热点） | 10 个重点，**合计合并 50 个** | 4 个 alpha（v0.156.0-a.5→a.8） | 高频快节奏，TUI/transcript 渲染/子进程管理全面重构 |
| Gemini CLI | 10 | 10 | 1（v0.62.0-nightly） | P1 可靠性问题（子代理误报、挂起）+ 大型功能 PR 并行 |
| DeepSeek Reasonix | **16** | **18** | 0 | 回归修复紧急响应期，v1.38.10 故障集中爆发 |
| OpenCode | 10 | 10 | 0 | 生态集成与计费议题主导，无新 release |
| Hermes | 10 | 10 | 0 | 系统级可靠性工程（投递四层方案）+ 安全加固 |
| Deepseek Harness | 0 | 0 | 0 | 无活动，事实性停更 |

**活跃度排序**：OpenAI Codex > DeepSeek Reasonix ≈ Gemini CLI ≈ Hermes > Claude Code ≈ OpenCode > Deepseek Harness

## 3. 共同关注的功能方向

### 3.1 Windows 平台"一等公民"化（全工具共性）

所有活跃工具均有 Windows 专属问题，这是当前最普遍的痛点：

- **Claude Code**：6+ 个 Windows 专属 bug——Bash 反斜杠折叠（#88561）、Cowork 写入滞后（#93482）、MCP 单条目损坏拖垮冷启动（#86756）、Enter 中断回归（#93239）
- **OpenAI Codex**：WSL 切换后工程创建/删除失效（#41290，81 评论/54👍）、Win10 Computer Use 截图失败（#25178）、侧边栏项目丢失（#42739）
- **Gemini CLI**：v0.62.0-nightly 专门修复 Windows ConPTY 进程退出生命周期问题
- **DeepSeek Reasonix**：黑屏崩溃（#10528）、持久 PowerShell 超时降级（#10534）
- **Hermes**：Windows LSP URI 身份不统一（#81915）

**诉求本质**：用户要求 Windows 与 macOS/Linux 同等稳定，不再接受"能用但残废"的移植体验。

### 3.2 数据一致性与"静默失败"治理

多工具出现"工具报告成功、实际数据偏离预期"的模式，成为社区容忍度最低的问题：

- **Claude Code**：Cowork 文件写入滞后一个版本（#93482）、`\uXXXX` 被静默解码（#72957）、Bash `\\` 折叠（#88561）——三个独立 Issue 共同点是工具声称成功但落盘内容错误
- **OpenCode**：`/compact` 模型仅返回 reasoning 时用空摘要静默替换对话历史且不可恢复（#44080）
- **Gemini CLI**：Subagent 被中断后仍上报 `status: "success"` / `Termination Reason: "GOAL"`（#22323）——假阳性比直接报错更具误导性
- **Hermes**：模型变更静默丢弃上下文上限配置（#116467）

### 3.3 会话生命周期管理与跨设备同步

会话积累后，管理效率与多端一致性问题浮出水面：

- **OpenAI Codex**：跨设备同步 Projects/Chats（#21803，41👍 为社区最高赞需求）
- **Hermes**：Bot 群聊在桌面端关闭后继续运行、可跨设备接管（#97681，28 评论）
- **Claude Code**：快速标记会话"已完成"（#95294）；`/resume` 仅加载最近 50 个会话的痛点
- **Gemini CLI**：`--resume` 按最近活动时间而非开始时间解析会话（PR #29411）

### 3.4 Agent/子代理可靠性与可观测性

多 Agent 协作场景下，任务状态的可信度和透明度成为焦点：

- **Gemini CLI**：子代理假阳性 GOAL 报告（#22323）、generalist agent 无限挂起（#21409）、模型不主动使用自定义 skills（#21968）
- **OpenCode**：免费层模型在子代理中同样被鉴权拦截（#49723）
- **Claude Code**：Remote Control 幽灵会话导致永久 404（#77372，讨论度最高）
- **Hermes**：投递可靠性四层 PR 系列（#115003/#115009/#115010），解决目标忙碌、重复投递、洪水惩罚

### 3.5 计费与认证透明化

付费用户的信任建立在计费可预期和认证可感知之上：

- **OpenCode**：信用卡扣款被拒（#33264）、订阅扣款未生效且无收据（#50054）、Go 配额档位不足（#24879，14👍）
- **OpenAI Codex**：配额充足却反复报容量错误（#43337，55 评论）
- **Claude Code**：状态行无法区分 Pro/Max 订阅与 API Key 认证（#95598，新提交）
- **DeepSeek Reasonix**：对话中 Stop 后 API Key 丢失且无法保存配置（#10531）

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 企业级开发助手 | 企业团队、远程/后台任务管理者 | 服务端分类器（auto mode 默认切换）、Remote Control、Cowork 协作；版本节奏克制、稳定性优先 |
| **OpenAI Codex** | 高性能终端体验 | 重度终端用户、Rust 技术栈爱好者 | Rust 重写、TUI 统一、transcript 持久化渲染；每日多版本快节奏迭代 |
| **Gemini CLI** | Agent 架构探索者 | 复杂代码库开发者、Agent 自动化用户 | 子代理体系 + AST-aware 结构搜索 + 持久化任务追踪（TrackerService）；P1 可靠性优先 |
| **DeepSeek Reasonix** | 多端桌面协同 | Windows 桌面用户、Web UI 使用者 | Desktop/CLI/Web 三端存储语义统一、v5 会话迁移；快速迭代但质量管控待加强 |
| **OpenCode** | 开放生态枢纽 | 第三方前端集成者、成本敏感用户 | 免费层模型 + 可编程 credential 下放 + 生态页面扩展；强调"OpenCode 做后端引擎、任意前端" |
| **Hermes** | 消息/网关中台 | 团队协作、Bot 群聊、Telegram 重度用户 | 投递可靠性分层治理 + 网关安全过滤（EOS token、env denylist）+ 会话状态持久化 |

**暗线对比**：Claude Code 靠"服务端智能"取胜（分类器不额外计费），Gemini CLI 靠"Agent 原生架构"探索，Codex 靠"工程性能"突围，而 OpenCode 和 Hermes 分别押注"生态开放"与"消息可靠性"——技术路线的分化本质是对"AI CLI 核心价值"的不同回答：是模型智能、Agent 能力、终端体验，还是生态连接。

## 5. 社区热度与成熟度

**成熟度梯队评估：**

- **第一梯队（成熟稳定）**：**Claude Code**——版本发布克制，Issue 复现质量高（如 #88561 对四种引号场景逐一验证、#94003 附堆栈样本），社区 PR 呈有序贡献态（3 个 diff PR 全部与官方内置面板行为对齐），呈现典型成熟项目特征。
- **第二梯队（高速扩张）**：**OpenAI Codex**——单日 50 PR 合并、4 连发 alpha，社区情绪活跃但快速迭代也伴随稳定性代价。**Gemini CLI**——P1 bug 集中但功能和架构探索（AST、持久任务）方向清晰，处于"边还债边建楼"阶段。
- **第三梯队（问题驱动）**：**DeepSeek Reasonix**——16 Issues/18 PRs 的高活跃主要由 v1.38.10 回归事故驱动，用户回退潮与"不要合并未经验证的 PR"的抗议声反映出信任受损。**Hermes**——在自身深耕领域（投递可靠性、安全过滤）工程严谨度高，sweeper 标签体系完备，属于细分领域的成熟玩家。
- **第四梯队（生态配角）**：**OpenCode**——议题集中于计费与第三方集成，技术声量中等。**Deepseek Harness**——24h 零活动，事实性停更。

**社区特征差异**：Claude Code 社区偏"专业测试员"，Codex 社区偏"尝鲜用户"，Reasonix 社区偏"受伤的生产用户"，Hermes 社区偏"系统工程思维"。

## 6. 值得关注的趋势信号

**信号 1："静默失败"是 AI CLI 行业的最大信任杀手。**
四个独立工具在 24h 内同时出现"报告成功但数据错误"类 Issue（Claude Code 写入滞后/解码异常、OpenCode 空摘要覆盖、Gemini 假阳性 GOAL、Hermes 静默丢弃配置），这不是巧合——当工具从"辅助"变为"写入代码库的关键执行者"时，静默损坏比直接报错危险得多。**对决策者的启示**：评估工具时优先检索其 silent failure 类 bug 历史；在 CI 流水线中为 AI 工具的写操作增加内容校验。

**信号 2：Windows 支持正在从"兼容项"变成"及格线"。**
所有主流工具的 Windows 问题密度已超过功能需求讨论，说明用户基数已大到不容忽视。**对开发者的启示**：Windows 环境的稳定性可作为评估工具成熟度的试金石；在 WSL/原生环境切换场景下需谨慎验证。

**信号 3：升级策略应趋保守，大版本需"让子弹飞"。**
DeepSeek Reasonix v1.38.10 的迁移回归导致用户被迫回退；Codex 以 4 个 alpha/天节奏发布，意味着每个版本都可能是不稳定的中间态。**对决策者的启示**：在快速迭代期，建议滞后 1-2 周升级 minor 版本；对涉及存储迁移的版本，优先在隔离环境验证。

**信号 4：Agent 结果可信度需要人工护栏。**
Gemini 子代理中断后仍上报"GOAL success"是最危险的模式——自动化和人工都会被误导。**对开发者的启示**：在 Agent 工作流中加入任务验证/确认机制（类似 Hermes 的可证明在线投递），不要盲信 termination reason。

**信号 5：可观测性正在成为功能需求而非工程细节。**
Claude Code 用户要求状态行暴露认证方式、Codex 用户期望跨设备同步、Gemini 新增 `gemini models list` JSON 输出——用户希望 AI CLI 像普通基础设施一样可观测、可脚本化。**对开发者的启示**：将状态行、session 元数据、模型选择器等暴露为可解析的接口，是未来标配。

**信号 6：计费透明与配额弹性决定付费留存。**
OpenCode 扣款不生效、Codex 配额误判、Claude Code 认证状态不可见——计费链路的问题直击付费用户信任，其优先级应等同于功能性 bug。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
数据来源：github.com/anthropics/skills（截止 2026-09-20）

---

## 1. 热门 Skills 排行

以下按社区讨论热度整理，包含新 Skill 提交与核心技能修复 PR，当前状态均为 OPEN。

### #1298 fix(skill-creator)：触发评估可靠性修复
- **功能**：修复 skill-creator 在触发评估中的误报与无效评分，处理 Windows 环境 subprocess 兼容性和运行时失败误判。
- **热点**：skill-creator 是社区高频使用的基础工具，触发准确率直接影响所有技能的质量验证，讨论集中在如何避免“假阴性/假阳性”优化误导。
- **状态**：OPEN，更新活跃。
- 链接：https://github.com/anthropics/skills/pull/1298

### #1771 proofcore-contract-auditor：智能合约审计
- **功能**：面向 Web3 开发者的 Solidity/Rust 合约静态分析技能，并将审计证明锚定到 TON 区块链。
- **热点**：社区对“可验证审计结果 + 零存储 Merkle 证明”的玩法兴趣浓厚，也引发了对 Web3 技能安全边界的讨论。
- **状态**：OPEN，新近提交。
- 链接：https://github.com/anthropics/skills/pull/1771

### #1703 md2video-audio：Markdown 一键转视频
- **功能**：将 Markdown 文档经由 Marp 编译为幻灯片，并自动生成拟人语音 MP4，零成本完成文档到教学视频的转化。
- **热点**：社区关注该技能对技术文档/课程内容分发的效率提升，以及音画同步与生成资源消耗的平衡。
- **状态**：OPEN，持续更新。
- 链接：https://github.com/anthropics/skills/pull/1703

### #525 pyxel：复古游戏开发
- **功能**：引导 Claude 使用 Pyxel 创建、调试和验证 Python 复古游戏，支持 headless 运行及逐帧检查。
- **热点**：属于创意编码方向的高质量提案，讨论聚焦于确定性测试和状态验证对 AI 生成游戏的约束力。
- **状态**：OPEN，长期活跃。
- 链接：https://github.com/anthropics/skills/pull/525

### #514 document-typography：文档排版质量控制
- **功能**：识别 AI 生成文档中的孤行、寡段、编号错位等排版问题，提升专业文档质感。
- **热点**：该技能直击 LLM 生成长文档的常见痛点，社区认为它适合与现有 docx/pdf 技能串联使用。
- **状态**：OPEN。
- 链接：https://github.com/anthropics/skills/pull/514

### #822 AWT：AI E2E 测试自动化
- **功能**：为 Claude 提供浏览器视觉与操作控制，实现零代码生成端到端测试，自动执行并反馈失败原因。
- **热点**：社区对“视觉驱动 E2E”的兴趣高，讨论了与 playwright 等传统方案的互补性，以及稳定性和录制成本。
- **状态**：OPEN，长期更新至 9 月。
- 链接：https://github.com/anthropics/skills/pull/822

### #486 ODT：OpenDocument 全套处理
- **功能**：支持创建、填充、读取及转换 ODT/ODS 等开放文档格式，兼容 LibreOffice 生态。
- **热点**：对政务/企业场景有明确价值，讨论集中在与 docx 技能的差异化和模板填充可靠性。
- **状态**：OPEN。
- 链接：https://github.com/anthropics/skills/pull/486

### #1776 blast-radius：批量破坏性操作前安全检查
- **功能**：在批量删除、权限撤销、归档等操作前提供检查清单，帮助 Claude 区分“行级正确”和“世界级正确”。
- **热点**：属于 Agent 安全操作的高价值模式，社区认可其填补了 bulk write 的风险盲区。
- **状态**：OPEN，新近提交。
- 链接：https://github.com/anthropics/skills/pull/1776

---

## 2. 社区需求趋势

从 Issues 中提炼的社区核心诉求：

| 方向 | 代表 Issue | 说明 |
|---|---|---|
| 安全与信任边界 | #492 | 社区技能伪装成 Anthropic 官方，导致权限信任滥用，强烈要求隔离命名空间。 |
| 组织级技能共享 | #228 | 企业用户希望 Skills 可直接在组织内分发，而非手动下载上传。 |
| Skill 触发/评估可靠性 | #556、#1390 | 多个评估脚本出现 0% 触发率、0/N 评分，社区渴望可验证的评估工具。 |
| 上下文窗口与记忆管理 | #1487、#1329 | 部分技能注入过多 token，社区提出 compact-memory 等符号化记忆方案。 |
| Agent 治理与安全模式 | #412 | 缺乏针对 AI Agent 的策略执行、信任评分、审计追踪等治理型技能。 |
| 插件重复/冲突 | #189 | 不同插件包含相同技能导致上下文窗口浪费，需统一去重机制。 |

**社区最期待的新方向**：安全治理、记忆压缩、组织级共享、评估可靠性工具。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、功能完整，且近期有更新，可能较快落地进入官方集合：

- **#1771 proofcore-contract-auditor** — Web3 合约审计 + 区块链验证，场景新颖且实现完整。  
  https://github.com/anthropics/skills/pull/1771

- **#1703 md2video-audio** — Markdown 转视频，内容创作需求明确，零成本方案易吸引用户。  
  https://github.com/anthropics/skills/pull/1703

- **#822 AWT** — AI E2E 测试，工具链成熟且社区关注度高，更新频繁。  
  https://github.com/anthropics/skills/pull/822

- **#525 pyxel** — 复古游戏开发，代码质量与测试机制完整，适合创意类技能扩展。  
  https://github.com/anthropics/skills/pull/525

- **#1776 blast-radius** — 破坏性操作安全清单，补齐 Agent 安全技能空白，概念轻量易落地。  
  https://github.com/anthropics/skills/pull/1776

---

## 4. Skills 生态洞察

当前社区最集中的诉求是 **构建可靠、安全、低资源消耗的 Skill 基础设施**——从触发评估失效、上下文窗口爆炸到命名空间信任滥用，社区需要的是可验证、可治理、轻量化的技能运行机制，而非单纯的技能数量增长。

---

# Claude Code 社区动态日报（2026-09-20）

## 今日速览

- **版本发布**：v2.1.278 发布，Claude API 和企业用户的自动模式（auto mode）默认切换至服务端分类器（server-side classifier），且不额外计费。
- **社区焦点**：Remote Control 幽灵会话（#77372）和 Cowork 文件写入滞后（#93482）持续发酵，成为目前评论最活跃的两大 bug；Bash 工具反斜杠折叠问题（#88561）也引发广泛讨论。
- **PR 动态**：过去 24 小时共有 3 个 PR 更新，全部围绕 diff 面板的打开时机与行为一致性进行修复。

## 版本发布

### v2.1.278

- **变更内容**：Claude API 和企业用户，以及 Bedrock、Vertex、Foundry 及各网关上运行的自动模式（auto mode），现在默认使用服务端分类器（server-side classifier），该模式不会对分类器额外收费。
- **退出方式**：在 Bedrock、Vertex、Foundry 和网关上可通过 `CLAUDE_CODE_AUTO_MODE_SERVER=0` 选择退出此默认行为。
- **注意**：变更仅影响自动模式的默认选择，不改变自动模式本身的功能逻辑。

🔗 [查看 Release v2.1.278](https://github.com/anthropics/claude-code/releases)

---

## 社区热点 Issues（10 个）

### 1. Remote Control：陈旧环境无法删除，幽灵会话导致永久 404
**#77372** | 评论 7 | 👍 2 | 状态：OPEN

> 作者 @makeitnotable 更新了关键细节：该问题并非孤立的陈旧会话——在注册全新环境后，下次启动时使用**不同的 session ID** 仍会返回 404。会话似乎被创建后，在 worker-attach 阶段即丢失。

这是当前社区讨论度最高的 Issue，涉及 [Remote Control](https://code.claude.com/docs/en/remote-control) 核心稳定性和后台任务管理，影响面较大。

🔗 https://github.com/anthropics/claude-code/issues/77372

---

### 2. Cowork：device_commit_files 上报成功但磁盘内容落后一次提交
**#93482** | 评论 7 | 状态：OPEN

> Windows 平台下，Cowork 的 `device_commit_files` 工具在覆盖写入时报告成功，但磁盘上的实际内容总是**滞后一个提交版本**（静默陈旧写入，但 mtime 是新的）。这会造成用户以为文件已更新、实际读到旧代码的危险情况。

涉及数据一致性与静默失败问题，属于高严重度 bug。

🔗 https://github.com/anthropics/claude-code/issues/93482

---

### 3. Bash 工具静默将 `\\` 折叠为 `\`
**#88561** | 评论 6 | 👍 2 | 状态：OPEN

> Bash 工具在**任何引号语境下**（单引号、双引号、heredoc）都会将 `\\` 折叠为 `\`，破坏正则表达式和 Windows 路径。由于发生在 shell 解析之前，用户无法通过引号规避。POSIX 单引号保真保证被违反，属于工具行为正确性问题。

🔗 https://github.com/anthropics/claude-code/issues/88561

---

### 4. Claude Code Desktop：WindowServer CPU 占用 47%
**#94003** | 评论 3 | 状态：OPEN

> 桌面应用流式生成回复时，macOS `WindowServer` 约占单核 CPU 的 47%，而空闲时仅 3-6%。堆栈采样显示时间消耗在深度 CoreAnimation 层树以 120 Hz 频率被反复重走，疑似渲染树未做增量更新。性能回归类问题，影响长时间使用体验。

🔗 https://github.com/anthropics/claude-code/issues/94003

---

### 5. Write/Edit 工具静默解码 `\uXXXX` 序列
**#72957** | 评论 3 | 状态：OPEN

> `Write` 和 `Edit` 工具在写入文件时会将 `\uXXXX` 当作 JSON Unicode 转义序列解码，导致无法通过工具在文件中存储字面意义上的 `\uXXXX` 文本。例如写入 `\uE010`，最终落盘的是实际 Unicode 字符。此问题已在 Linux 平台复现，破坏文档、代码生成等场景。

🔗 https://github.com/anthropics/claude-code/issues/72957

---

### 6. Windows：一个损坏的 MCP 服务器条目静默杀死所有冷启动
**#86756** | 评论 2 | 状态：OPEN

> `claude_desktop_config.json` 中只要有一个 MCP 服务器配置损坏（如 `ollama` 条目），用户的每次冷启动都会失败——无响应、worker 直接退出。该问题应优雅降级（跳过坏条目并警告），但当前实现使整个应用不可用。破坏面广，影响所有配置了 MCP 的桌面用户。

🔗 https://github.com/anthropics/claude-code/issues/86756

---

### 7. 状态行应暴露当前认证方式（订阅 vs API Key）
**#95598** | 评论 1 | 状态：OPEN（创建于 2026-09-19）

> 当前状态行 JSON payload（`session_id`、`model`、`cost` 等）中没有字段表明当前会话是通过 Pro/Max 订阅登录还是 `ANTHROPIC_API_KEY` 认证。对于构建自定义状态行集成和自动化脚本的用户，这是一个信息盲区。昨日新提交的需求。

🔗 https://github.com/anthropics/claude-code/issues/95598

---

### 8. 回归：Enter 键从排队变为中断
**#93239** | 评论 1 | 状态：OPEN

> Windows 平台回归：Claude 正在工作时按 Enter 现在会**立即中断**，而之前的行为是排队等待。对于习惯在模型生成时编辑下一句提示的用户，这是一次明显的交互回归，影响核心工作流。

🔗 https://github.com/anthropics/claude-code/issues/93239

---

### 9. Windows：Skill 目录描述间歇性从系统提示中消失
**#95582** | 评论 1 | 状态：OPEN（创建于 2026-09-19）

> Windows 上 Skill 目录（catalog）的描述文本会**间歇性缺失**，但磁盘上的 frontmatter 是正确的。这会导致模型在会话中无法正确理解可用技能，影响技能调用准确率。昨日新提交的 bug。

🔗 https://github.com/anthropics/claude-code/issues/95582

---

### 10. 功能请求：快速标记 Chat 会话为已完成
**#95294** | 评论 1 | 状态：OPEN

> 用户希望能在会话列表中快速将聊天标记为"完成"（complete），以便更清晰地管理进行中与已结束的会话。当前缺少轻量级的状态管理入口，需通过会话管理流程额外操作。

🔗 https://github.com/anthropics/claude-code/issues/95294

---

## 重要 PR 进展（3 个）

> 过去 24 小时内更新的 PR 共 3 个，全部围绕 **diff 面板的打开时机与行为一致性**，分别由 @poteat 和 @bcherny 贡献（社区开发者）。

### 1. diff：恢复的会话存在编辑时打开面板，`/clear` 后保持打开，会话行跟随引擎启动
**#95587** | 状态：OPEN | 作者：@poteat

> 统一 diff 模块与内置面板在三种场景下的行为：恢复/继续会话时，若 transcript 中已存在编辑，则在宽度确定后立即打开面板；`/clear` 后面板保持打开；会话行状态与引擎启动逻辑对齐。

🔗 https://github.com/anthropics/claude-code/pull/95587

---

### 2. diff：首次编辑仅当存在可列出文件时才打开面板
**#94847** | 状态：OPEN | 作者：@bcherny

> 修复问题：diff 面板在会话首次成功 Edit/Write/NotebookEdit 时自动打开，即使编辑发生在仓库外、被忽略的文件或不同 worktree 中，导致用户看到空的"无跟踪更改"面板。现在面板仅在确实有文件可列出时才自动打开，避免无意义的弹出。

🔗 https://github.com/anthropics/claude-code/pull/94847

---

### 3. diff：停靠式面板在打开前预读仓库，避免"Loading diff"空状态
**#95488** | 状态：CLOSED | 作者：@poteat

> 停靠（docked）的 diff 面板现在会在打开前读取仓库数据，与内置面板的预取行为一致。首次编辑和 `/diff` 两种入口都会直接展示最终状态（文件列表、"无更改"或"Diff 不可用"），不再闪现"Loading diff…"中间态。

🔗 https://github.com/anthropics/claude-code/pull/95488

---

## 功能需求趋势

从本次更新及近期 Issue 中，可以提炼出社区关注的几个核心方向：

### 1. 可观测性与状态暴露增强
- **#95598** 要求在状态行中暴露认证方式（订阅 vs API Key）
- **#75884**（已关闭）Remote Control 文档缺失后台任务面板状态同步说明
- 趋势：用户不再满足于基础会话信息，希望状态行、Agent 视图等提供更细粒度的运行时数据。

### 2. 会话管理效率与 UX 精细化
- **#95294** 快速标记会话为"已完成"
- **#87392**（已关闭）`/resume` 选择器仅加载最近 50 个会话，更多会话无法通过 UI 触达
- 趋势：随着会话数量积累，用户对会话的生命周期管理、检索和批量操作的需求上升。

### 3. 模型选择的灵活性
- **#75912**（已关闭）VS Code 扩展缺少 session-only（仅本次会话）的模型选择器
- **#76379**（已关闭）Fable 创建子代理时可指定模型
- 趋势：用户希望在不同层级（全局/项目/会话/子代理）分别控制模型，粒度越细越好。

### 4. 跨平台一致性
- 多个 Windows 专属 bug（#93482、#88561、#86756、#93239、#95582）与 macOS 性能问题（#94003）并存
- 趋势：社区对"同一体验、跨平台均为一等公民"的期待在上升，尤其是 Windows 平台的稳定性与工具行为一致性。

### 5. 数据一致性与防静默失败
- **#93482**（Cowork 写入滞后）、**#72957**（`\uXXXX` 解码）、**#88561**（`\\` 折叠）—— 三个独立 Issue 的共同点：**工具报告成功，但实际数据已偏离预期**
- 趋势：开发者对静默数据损坏类 bug 容忍度极低，预期是"未完全执行就明确报错"，而非部分成功或延迟生效。

---

## 开发者关注点

### 高频痛点

1. **静默数据损坏 / 静默失败**：开发者在 #93482、#72957、#88561 三个 Issue 中反复遇到"工具声称成功、实际数据是错的"的情况。这类问题比直接报错更棘手，因为它不会中断工作流，而是把错误悄悄带进代码库。

2. **Remote Control（远程控制）可靠性**：#77372 暴露的幽灵会话和永久 404 问题，意味着远程会话一旦失效，**没有清理路径**。对于依赖 Remote Control 进行移动端或后台任务管理的用户，这是工作流程的硬阻断。

3. **Windows 平台的工具行为差异**：本次 49 个活跃 Issue 中有 6+ 个是 Windows 专属（Bash 反斜杠、Cowork 写入、MCP 冷启动、Enter 回归、Skill 描述缺失、文件夹撤销）。Windows 用户有明显被"二等公民"对待的感受。

4. **MCP 配置缺乏容错**：#86756 指出单个坏 MCP 条目会拖垮所有冷启动。开发者认为这应该像浏览器插件一样：单个扩展崩溃不影响浏览器主体运行。

5. **桌面端性能**：#94003 的 WindowServer 47% CPU 问题表明渲染层存在低效的整树重走。桌面端性能优化的优先级应该在 UI 功能迭代之上。

### 值得注意的社区特征

- **复现质量高**：多数 Issue 都附带了完整的 preflight checklist、环境信息和 stack sample，例如 #88561 对四种引号场景的逐一验证、#94003 附 WindowServer 堆栈样本。这使得 bug 易于被官方定位与验证。
- **文档更新诉求集中**：coygeek 在 7 月集中提交了一批关于 v2.1.205 修复未同步到文档的 Issue（#75875~#75891），现已批量关闭，说明官方已清理了一轮文档欠账，但文档与版本修复的同步机制是否真正解决，仍需观察。
- **diff 面板是社区活跃贡献点**：3 个 PR 全部来自社区开发者，修复方向和官方内置面板的行为对齐。这侧面说明 diff 面板的交互细节仍有打磨空间，社区愿意主动补齐。

---

*数据窗口：2026-09-19 更新（含 2026-09-20 新提交的 Issue） | 数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 — 2026-09-20

## 今日速览

过去 24 小时，OpenAI Codex 密集发布 4 个 Rust alpha 版本（v0.156.0-alpha.5 → alpha.8），并合并 50 个 PR，核心方向是 TUI 界面统一、transcript 持久化渲染优化与子进程管理重构。社区侧，Windows/WSL 工程管理故障（[#41290](https://github.com/openai/codex/issues/41290)）以 81 条评论维持最高热度，跨设备同步（[#21803](https://github.com/openai/codex/issues/21803)）则以 41👍 成为最受期待的新功能。

## 版本发布

过去 24 小时连续发布 4 个 alpha 版本，均为快速迭代，官方未附带详细变更日志。结合同期合并的 PR 观察，这些版本主要包含 TUI 样式统一、transcript 持久化渲染优化及内部基础设施重构。

- [rust-v0.156.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.8)
- [rust-v0.156.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.7)
- [rust-v0.156.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.6)
- [rust-v0.156.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.5)

## 社区热点 Issues

### 1. #41290 [Windows][WSL] 切换 Agent Environment 后工程创建与删除失败
- 作者: @W4yneChen | 评论: 81 | 👍 54
- 重要性：Windows 用户在 WSL/原生环境间切换后，项目创建与移除功能完全失效，是最多用户遇到的高频阻断性问题。
- 链接: https://github.com/openai/codex/issues/41290

### 2. #18960 Codex App 频繁重连：`response.completed` 前 WebSocket 被服务端断开
- 作者: @GGBondBlueWhale | 评论: 59 | 👍 54
- 重要性：macOS 用户流式响应反复中断，直接损害多轮对话体验，与 #41290 并列获得最高 👍 数。
- 链接: https://github.com/openai/codex/issues/18960

### 3. #25178 Windows Computer Use 截图在 Win10 22H2 上失败
- 作者: @Define1165250535 | 评论: 71 | 👍 28
- 重要性：`get_window_state` 在 `SetIsBorderRequired` 阶段报 `0x80004002` 错误，Computer Use 核心视觉能力不可用，Windows 10 兼容性缺口明显。
- 链接: https://github.com/openai/codex/issues/25178

### 4. #21803 功能请求：Codex Projects 与 Chats 跨设备同步
- 作者: @HezLUO | 评论: 11 | 👍 41
- 重要性：社区最受认可的功能需求，用户期望同一账号在多台设备间无缝继续 Projects/Chats。
- 链接: https://github.com/openai/codex/issues/21803

### 5. #43337 周配额充足却反复报账户级容量错误
- 作者: @jinl96 | 评论: 55
- 重要性：Pro 20x 用户在 `gpt-6-astra`、`gpt-5.6-luna` 上即使使用 low reasoning 也间歇性报容量不足，疑似配额路由缺陷。
- 链接: https://github.com/openai/codex/issues/43337

### 6. #46641 macOS Codex 渲染进程白屏，CPU 飙至 ~120%
- 作者: @Bibbo24 | 评论: 18
- 重要性：新版本（26.915.31945）引入的渲染白屏问题，一天内即获 18 条评论，上升势头快；强杀 Renderer 进程可临时恢复。
- 链接: https://github.com/openai/codex/issues/46641

### 7. #42739 Windows 桌面版更新后本地项目从侧边栏消失
- 作者: @rizal281065 | 评论: 17
- 重要性：更新后 Projects 区显示 "No projects"，磁盘文件仍在、Recents 可见，疑似索引迁移逻辑缺陷。
- 链接: https://github.com/openai/codex/issues/42739

### 8. #17354 App 内近期线程历史被清空，但 CLI 中数据完好
- 作者: @charles-waite | 评论: 16 | 👍 7
- 重要性：App 端丢失 2–3 个月历史，而 CLI 端完好，指向 App 本地存储/加载 bug，引发用户对数据安全的担忧。
- 链接: https://github.com/openai/codex/issues/17354

### 9. #45307 Windows Codex Desktop 首轮对话后发送按钮失效
- 作者: @kunlunliu2007 | 评论: 13 | 👍 2
- 重要性：新建会话仅第一轮可发送，随后输入框/Send 禁用，必须重建会话，严重打断 Windows 用户工作流。
- 链接: https://github.com/openai/codex/issues/45307

### 10. #40565 macOS workspace-write 沙箱拒绝目录重命名与删除
- 作者: @rklos | 评论: 6 | 👍 5
- 重要性：已在可写工作区中，`rename`/`rmdir` 仍被沙箱误拦截，反映沙箱策略偏保守，影响正常文件操作。
- 链接: https://github.com/openai/codex/issues/40565

## 重要 PR 进展

### 1. #46722 取消 pending transcript Home 跳转
- 修复：按 `Home` 加载历史时，后续导航应覆盖未完成的跳转，避免旧内容覆盖用户当前阅读位置。
- 链接: https://github.com/openai/codex/pull/46722

### 2. #46721 锚定 transcript 滚动并约束视口渲染
- 优化：分页/流式/窗口缩放导致行偏移变化时，改用锚点定位替代百分比重算，提升长会话滚动稳定性。
- 链接: https://github.com/openai/codex/pull/46721

### 3. #46712 在 recorder 容量压力下恢复已执行工具调用元数据
- 修复：孤儿输出映射与未完成任务耗尽 recorder 容量时，回收资源以确保新工具调用元数据完整附加。
- 链接: https://github.com/openai/codex/pull/46712

### 4. #46711 持久化 TUI activity 分组与 reasoning 对齐实时输出
- 修复：加载的 transcript 中工具调用被逐条展示、reasoning 展示方式与实时不一致；本次统一分组展示并保留摘要。
- 链接: https://github.com/openai/codex/pull/46711

### 5. #46710 恢复持久化 TUI transcript 中的丰富工具详情
- 修复：加载的 transcript 将命令、MCP 调用、patch 等压缩为状态摘要，本次恢复为与实时一致的历史单元格内容。
- 链接: https://github.com/openai/codex/pull/46710

### 6. #46709 添加紧凑 activity 渲染并保留 transcript 源文本
- 功能：为命令、MCP 调用、计算机操作等增加紧凑渲染器，同时保留逻辑源文本、样式与超链接元数据。
- 链接: https://github.com/openai/codex/pull/46709

### 7. #46673 服务端版本通知扩展到预发布与本地客户端
- 修复：此前仅稳定版之间会提示版本差异，现在预发布/本地客户端也能收到后台服务版本不匹配的提醒。
- 链接: https://github.com/openai/codex/pull/46673

### 8. #46661 macOS 文件系统 helper 启动避免 fork
- 优化：移除 `pre_exec` 关闭继承描述符时强制 fork 的实现，原生 spawn 配合 fd 传输 socket 保持隔离性。
- 链接: https://github.com/openai/codex/pull/46661

### 9. #46660 显式化本地子进程启动配置
- 重构：以 `codex_utils_pty` 的受限 launch API 统一替代 `spawn_child`，使两个后端的受支持配置显式一致。
- 链接: https://github.com/openai/codex/pull/46660

### 10. #46697 统一 TUI picker 样式并改进紧凑会话布局
- UI：移除旧式列表外观，统一全宽选中态、填充标签、独立滚动行；resume/fork 选择器分离工具栏与搜索行。
- 链接: https://github.com/openai/codex/pull/46697

## 功能需求趋势

从近期 Issues 可提炼出三个核心方向：

1. **多端同步与远程一致性**（[#21803](https://github.com/openai/codex/issues/21803) 跨设备同步、[#36454](https://github.com/openai/codex/issues/36454) iOS Remote 项目列表不同步、[#42315](https://github.com/openai/codex/issues/42315) iOS 远程自定义分区丢失项目、[#46730](https://github.com/openai/codex/issues/46730) Android Remote 活动线程不显示）——用户对桌面、CLI、iOS/Android 间的会话与项目一致性诉求强烈。

2. **Windows 平台稳定性与功能补齐**——热门 Issues 中超过 1/3 与 Windows 相关（WSL 切换、Computer Use 截图、侧边栏丢失、发送按钮/Composer 禁用、宠物浮层卡顿），Windows 已成问题重灾区。

3. **存储与数据可移植性**（[#37216](https://github.com/openai/codex/issues/37216) 外部/冷归档存储、[#17354](https://github.com/openai/codex/issues/17354) App 历史丢失）——用户担忧本地 rollout 历史占用磁盘且无法迁移，要求官方提供受支持的归档方案。

其他值得关注的需求：本地 `/open` 斜杠命令（[#30027](https://github.com/openai/codex/issues/30027)）、桌面 Work 本地文件访问模式澄清（[#43931](https://github.com/openai/codex/issues/43931)）、Meta Ads MCP OAuth 端点校验修复（[#44437](https://github.com/openai/codex/issues/44437)）。

## 开发者关注点

- **高频阻断 bug 集中在 Windows/WSL 环境**：工程创建/删除失败（[#41290](https://github.com/openai/codex/issues/41290)）、发送按钮/Composer 首轮后禁用（[#45307](https://github.com/openai/codex/issues/45307)、[#40872](https://github.com/openai/codex/issues/40872)）、升级后项目侧边栏清空（[#42739](https://github.com/openai/codex/issues/42739)），Windows 用户体验受损最重。
- **连接与配额问题直击付费用户**：WebSocket 重连循环（[#18960](https://github.com/openai/codex/issues/18960)）与容量误判（[#43337](https://github.com/openai/codex/issues/43337)）均获 50+ 评论和 54👍，是付费用户流失风险最高的两个点。
- **数据安全焦虑蔓延**：Thread 历史在 App 中消失（[#17354](https://github.com/openai/codex/issues/17354)）、项目记录在 UI 中丢失但磁盘数据仍在（[#42739](https://github.com/openai/codex/issues/42739)），用户对本地数据持久性与迁移能力信心不足。
- **AI 辅助功能在 Windows 上兼容性欠佳**：Computer Use 截图接口错误（[#25178](https://github.com/openai/codex/issues/25178)）与宠物浮层 UI 卡顿（[#33565](https://github.com/openai/codex/issues/33565)），说明新功能在 Win10/11 上的适配仍需加强。
- **沙箱策略偏保守**：macOS workspace-write 拒绝目录重命名/删除（[#40565](https://github.com/openai/codex/issues/40565)）、Windows 高权限沙箱每次会话重启触发 UAC 且凭据不持久化（[#42213](https://github.com/openai/codex/issues/42213)），开发者希望沙箱在安全与权限粒度间取得更好平衡。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-20

## 1. 今日速览

昨日发布 v0.62.0-nightly 版本，核心修复集中在 Windows ConPTY 进程退出生命周期同步与 PTY 输出终结稳定性。Issue 侧，Subagent 在 MAX_TURNS 中断后被误报为 GOAL 成功（#22323）与通用 agent 无限挂起（#21409）继续占据社区关注焦点，两者均为 P1 级可靠性问题。PR 侧，AST-aware 结构搜索工具（#29396）与持久化文件任务追踪（#29393）两个大型功能 PR 已进入 review 阶段，值得关注。

## 2. 版本发布

**v0.62.0-nightly.20260919.gcfbcaa8df**
- chore/release: bump version to 0.62.0-nightly.20260918.g9450ade79 by @gemini-cli-robot
- fix(core): synchronize ConPTY process exit lifecycle and harden PTY output finalization by @jvargassanchez-dot

该 nightly 版本主要针对 Windows 终端子系统的稳定性进行了加固，修复了 ConPTY（伪终端）进程退出时的生命周期同步问题，并强化了 PTY 输出的终结流程。使用 Windows 环境的开发者建议更新体验。

## 3. 社区热点 Issues

以下为过去 24 小时内更新最频繁或最受关注的 10 个 Issue：

**#22323** [P1/Bug] Subagent 在 MAX_TURNS 后用 `status: "success"` 和 `Termination Reason: "GOAL"` 掩盖实际中断
- 作者: @matei-anghel | 评论: 13 | 👍: 2 | 更新: 2026-09-19
- 为什么重要：这是 Subagent 可靠性领域的核心问题。`codebase_investigator` 在尚未开始任何分析时就因达到最大轮数被中断，却向上层报告"成功达成目标"，导致用户被假阳性结果误导。
- 社区反应：评论数居首，开发者对该误报逻辑表示强烈关注。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22323

**#21409** [P1/Bug] 通用 agent（Generalist agent）无限挂起
- 作者: @turmanticant | 评论: 8 | 👍: 8 | 更新: 2026-09-19
- 为什么重要：用户报告当 Gemini CLI 委托给 generalist agent 时，简单操作（如创建文件夹）也会无限挂起，等待长达一小时后只能手动取消。该问题是 agent 自动化和日常使用的主要阻塞项。
- 社区反应：👍 数最高（8），说明大量用户受此困扰。用户发现通过指示模型不要使用 subagent 可规避此问题，这指向 agent 调度逻辑存在缺陷。
- 链接：https://github.com/google-gemini/gemini-cli/issues/21409

**#19873** [P2/Enhancement] 利用模型的原生 bash 亲和力：零依赖 OS 沙箱 + 执行后意图路由
- 作者: @abhipatel12 | 评论: 9 | 👍: 1 | 更新: 2026-09-19
- 为什么重要：Gemini 3 模型天然擅长以 bash 用户的方式链式使用 POSIX 工具。该 issue 探讨如何在保证安全的前提下充分发挥这一能力，涉及沙箱设计和命令执行后的意图识别，是 agent 架构演进的重要方向。
- 链接：https://github.com/google-gemini/gemini-cli/issues/19873

**#22745** [P2/Feature] EPIC：评估 AST-aware 文件读取、搜索和代码库映射的影响
- 作者: @gundermanc | 评论: 7 | 👍: 1 | 更新: 2026-09-19
- 为什么重要：该 EPIC 关注利用 AST（抽象语法树）来精确读取方法边界、减少 token 消耗和噪声。对应的 PR #29396 已于昨日提交，是当前最值得跟踪的功能线之一。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22745

**#21968** [P2/Bug] Gemini 不会主动使用自定义 skills 和 sub-agents
- 作者: @rnett | 评论: 6 | 👍: 0 | 更新: 2026-09-19
- 为什么重要：用户配置了 gradle、git 等 skills，但 Gemini 只在被明确指示时才使用它们，不会在相关场景中主动调用。这直接影响了自定义 agent 生态的实际价值。
- 链接：https://github.com/google-gemini/gemini-cli/issues/21968

**#26525** [P2/Security] Auto Memory 应添加确定性脱敏并减少日志记录
- 作者: @SandyTao520 | 评论: 5 | 👍: 0 | 更新: 2026-09-19
- 为什么重要：Auto Memory 在将本地 transcript 发送给后台提取模型前未进行脱敏，提取 prompt 虽指示模型脱敏，但敏感内容已进入模型上下文。服务还会记录已有 skill 相关信息，存在泄露风险。
- 链接：https://github.com/google-gemini/gemini-cli/issues/26525

**#21983** [P1/Bug] Browser subagent 在 Wayland 下运行失败
- 作者: @sigmaSd | 评论: 4 | 👍: 1 | 更新: 2026-09-19
- 为什么重要：Linux Wayland 环境下，browser subagent 以 Termination Reason: GOAL 提前退出。该问题导致 Wayland 用户完全无法使用浏览器自动化能力。
- 链接：https://github.com/google-gemini/gemini-cli/issues/21983

**#22232** [P3/Feature] 增强 browser_agent 韧性：自动会话接管与锁恢复
- 作者: @hsm207 | 评论: 4 | 👍: 0 | 更新: 2026-09-19
- 为什么重要：BrowserManager.ts 当前在遇到锁定的浏览器 profile（如持久化会话模式下的残留进程）时采用"快速失败"策略。该 issue 建议实现自动会话接管和锁恢复，是浏览器 agent 生产环境可用性的关键改进。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22232

**#21335** [P2/Bug] `/compress` 命令在会话恢复后不持久生效
- 作者: @Abhijit-2592 | 评论: 2 | 👍: 2 | 更新: 2026-09-19
- 为什么重要：`/compress` 仅在内存中生效，未写回磁盘的 session 文件。用户恢复会话后 token 节省效果消失，影响长时间会话的上下文管理。
- 链接：https://github.com/google-gemini/gemini-cli/issues/21335

**#26522** [P2/Bug] Auto Memory 不应无限重试低信号会话
- 作者: @SandyTao520 | 评论: 4 | 👍: 0 | 更新: 2026-09-19
- 为什么重要：当提取 agent 判定某会话为低信号而未读取时，该会话会一直处于未处理状态，反复出现在后续提取任务中，浪费 token 和计算资源。
- 链接：https://github.com/google-gemini/gemini-cli/issues/26522

## 4. 重要 PR 进展

以下 10 个 PR 为过去 24 小时内最值得关注的变更：

**#29411** [P2/area-core] fix(cli): resolve resume latest to most recently active session
- 作者: @soroush5 | 更新: 2026-09-19
- 内容：修复裸 `--resume` 选择会话的逻辑——原本按会话开始时间选择，导致长生命周期主会话被较新的 spike 会话抢占。现改为按最近活动时间解析。修复 #29410。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29411

**#29396** [P2/area-agent, size/xl] feat(agent): add AST-aware structural search tool for precise symbol navigation
- 作者: @dylanyunlon | 更新: 2026-09-19
- 内容：实现 #22745 中规划的 AST-aware 工具。引入轻量级基于正则的 AST 分析服务和新 `ast_search` 工具，使 agent 能够进行精确的符号级导航，不再依赖猜测行范围或读取整个文件。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29396

**#29402** [P1/area-core] fix(cli): make persistent state writes failure-safe
- 作者: @Oscar-Williams | 更新: 2026-09-19
- 内容：使 `PersistentState` 写入具备失败安全性。通过写入唯一临时文件、`fsync`、原子重命名发布，避免中断的保存操作将 `state.json` 替换为截断的 JSON 而静默清空状态。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29402

**#29407** [P2/area-enterprise] fix(core): preserve shared references in JSON serialization
- 作者: @Oscar-Williams | 更新: 2026-09-19
- 内容：修复 #29406。将进程级 `WeakSet` 替换为活动祖先路径跟踪，只将递归路径上的对象判定为循环引用，避免 OpenTelemetry 数组中重复出现的对象被误标为 `[Circular]`。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29407

**#29393** [P3/area-agent, size/xl] feat(tracker): replace WriteToDo with persistent file-based task tracking (CRUD)
- 作者: @dylanyunlon | 更新: 2026-09-19
- 内容：将基于上下文的 WriteToDo 工具替换为基于文件的持久化任务追踪系统（TrackerService），解决长期存在的"上下文腐烂"、高 token 成本和会话间记忆丢失问题。对应 issue #18836。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29393

**#29368** [P1/area-non-interactive] fix(acp): resolve session/load by ID even without resumable content
- 作者: @abhinav-phi | 更新: 2026-09-19
- 内容：修复 #29288。诊断发现报告包含两个独立现象，其中一个是 agent 侧 bug——session 文件实际存在于磁盘且 `sessionId` 匹配（`kind: main`），但加载路径未正确解析。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29368

**#29404** [P3/area-non-interactive] feat(cli): add 'gemini models list' with JSON output
- 作者: @Kaushik2210 | 更新: 2026-09-19
- 内容：新增 `gemini models list` 子命令，支持 JSON 输出，使外部工具能发现可用的模型 ID，避免硬编码过时模型名。交互式 `/model` 对话框无法被外部工具解析。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29404

**#29293** [P1] 1578（PR 标题待完善）
- 作者: @bhalsodnikunjhiteshbhai | 更新: 2026-09-19
- 内容：该 PR 标题和描述仍为占位符，但标记为 P1 优先级，属于待补全的草稿 PR。建议关注其后续更新。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29293

**#29004** [CLOSED/P1/area-core] fix(core): guard formatTruncatedToolOutput against non-positive maxChars
- 作者: @Eswar809 | 更新: 2026-09-19
- 内容：防止 `formatTruncatedToolOutput` 接收到 0 或负数 `maxChars` 时因负 slice 偏移而将截断输出意外膨胀到约原大小的两倍。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29004

**#29208** [CLOSED/P2/area-agent] fix(core): fall back to empty on malformed agents.json shape
- 作者: @soroush5 | 更新: 2026-09-19
- 内容：损坏的 `agents.json`（合法 JSON 但结构错误）会导致 `isAcknowledged`/`acknowledge` 抛出原始 `TypeError` 或静默丢弃确认。`load` 现进行校验并回退为空对象。修复 #29207。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29208

## 5. 功能需求趋势

从全部 Issue 和 PR 中可提炼出以下社区最关注的功能方向：

1. **Subagent/Agent 可靠性治理**（#22323、#21409、#21968、#22232）
   - 社区对 subagent 的误报、挂起、不主动使用自定义技能等问题反馈集中，P1 级 bug 占比高。Agent 调度和错误传播机制的成熟度是当前最大痛点。

2. **AST-aware 代码导航**（#22745、#22746、PR #29396）
   - 通过 AST 实现精确的符号级文件读取、搜索和代码库映射，以降低 token 消耗和上下文噪声。该方向已从 EPIC 讨论进入具体实现阶段。

3. **持久化任务追踪**（#18836、PR #29393）
   - 社区强烈呼吁将 in-context 的 WriteToDo 替换为文件持久化的 CRUD 任务系统。这能同时解决上下文腐烂、token 成本和跨会话记忆问题。

4. **Auto Memory 系统的健壮性与安全**（#26516、#26522、#26523、#26525）
   - 多个 issue 指向 Auto Memory 在会话处理重试、无效 patch 隔离、敏感信息脱敏、日志噪音等方面的问题。该功能线正在密集迭代中。

5. **浏览器 agent 的环境兼容与韧性**（#21983、#22232、#22267）
   - Wayland 支持缺失、锁恢复机制缺乏、配置覆盖被忽略等问题导致浏览器 agent 在部分环境中不可用。

6. **终端交互体验**（#21924、#22465、#22466）
   - 终端 resize 闪烁与性能、`\n` 转义处理错误、交互式 prompt 卡死等问题持续被报告，但优先级相对靠后。

7. **安全与策略执行一致性**（#22672、#29200、#29203、#29201）
   - 涉及破坏性 git/DB 操作的风险控制、MCP 策略运行时一致性、shell wrapper 剥离和命令确认循环等问题，安全相关的 PR 数量明显增多。

## 6. 开发者关注点

综合 Issue 讨论与 PR 修复内容，开发者最集中的反馈如下：

- **Subagent 假阳性成功报告**：多个 issue 反映 subagent 在中断/失败时仍向上层报告"GOAL success"，开发者认为这比直接报错更具误导性，会污染用户对任务真实状态的判断。
- **Agent 挂起无超时机制**：generalist agent 的无限挂起问题在多个 issue 中出现，开发者期望有可配置的超时和自动降级机制。
- **模型不主动使用已配置的 skills/sub-agents**：用户投入自定义 agent 配置的成本，但模型在相关场景下不会主动调用，削弱了自定义扩展的实际价值。
- **会话持久化语义不一致**：`/compress` 不持久、`--resume` 选错会话、`agents.json` 损坏导致崩溃等，反映出会话生命周期管理需要系统性加固。
- **敏感信息处理不够透明**：Auto Memory 在未脱敏的情况下将本地内容送入模型上下文，开发者对数据隐私和合规表示担忧。
- **配置覆盖不生效**：Browser Agent 忽略 `settings.json` 覆盖（如 `maxTurns`）以及模型选择被静默改写等问题，让开发者对配置系统缺乏信任感。
- **AST-aware 工具的高期待**：开发者普遍认同 AST 方法对 token 节省和精准操作的价值，对该功能的落地持积极态度，但也关注其是否会引入新的复杂性。

---

*本日报由 AI 技术分析师自动生成，数据来源为 GitHub 公开仓库 google-gemini/gemini-cli，覆盖过去 24 小时内的动态。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报（2026-09-20）

> 数据来源：`github.com/esengine/DeepSeek-Reasonix`  
> 本期覆盖：过去 24 小时更新的 16 条 Issues、18 条 PRs

## 今日速览

过去 24 小时无新版本发布，社区讨论几乎被 **v1.38.10 的回归问题**占据：会话历史错乱/丢失、桌面服务启动失败、配置与 API Key 丢失等问题集中爆发。开发者侧响应密集，合并/关闭了多个针对 Windows 会话身份隔离、快照记录身份和会话加载取消的修复 PR，并开始分阶段推进图片输入支持。

## 社区热点 Issues

1. **[#10513] 升级 1.38.10 后无法使用 reasonix，无法新建/查看历史会话**  
   https://github.com/esengine/DeepSeek-Reasonix/issues/10513  
   现象：升级后客户端直接不可用，无法新建会话，也无法查看历史会话，疑似历史会话丢失。这是当前**评论数最高（15 条）**的 data-loss 报告，影响面较大。

2. **[#10531] 对话中强行停止后 API Key 信息丢失，重启无法配置模型**  
   https://github.com/esengine/DeepSeek-Reasonix/issues/10531  
   现象：对话中点击 Stop 后客户端无法发送消息，强制退出再启动提示“无法读取凭据存储”，API Key 丢失且无法保存配置。用户称 24 小时内复现两次，12 条评论。

3. **[#10527] v1.38.3 升到 v1.38.10 后所有会话历史全乱**  
   https://github.com/esengine/DeepSeek-Reasonix/issues/10527  
   现象：多项目、多会话的命名、时间、排序全部错乱，仅内容保留；新会话也无法正常创建。用户强烈抗议“不要合并未经认真验证的 PR”，8 条评论、3 👍，是社区情绪最激烈的 issue 之一。

4. **[#10538] v5 session-migration nil-pointer panic，桌面服务无法启动**  
   https://github.com/esengine/DeepSeek-Reasonix/issues/10538  
   现象：启动时进入恢复页并提示 “The desktop service could not be started”，日志显示 `transcript.(*Projection).RestoreRuntime` 发生 nil-pointer panic，service exit code 2。即使隔离 oversized legacy session 也无法恢复。

5. **[#10509] v5 迁移：同一 revision 重复导入，工作区永久只读**  
   https://github.com/esengine/DeepSeek-Reasonix/issues/10509  
   现象：升级 v1.38.10 后 v5 会话存储迁移中断，同一 revision 被重复导入，超限日志无限重试，导致工作区永久只读，且连带 shell 工具不可用。用户确认数据未损坏，但无法正常恢复。

6. **[#10528] 升级 v1.38.10 后直接黑屏，桌面服务退出 code 2**  
   https://github.com/esengine/DeepSeek-Reasonix/issues/10528  
   现象：Windows 11 下打开客户端即崩溃，提示 `desktop service exited (code 2)`，自动重启次数耗尽。

7. **[#10532] v1.38.10 更新后 AI 思考过程陷入无限死循环**  
   https://github.com/esengine/DeepSeek-Reasonix/issues/10532  
   现象：AI 持续尝试输出，但思考过程不断重复特定词汇，无法正常结束。属于 agent 执行可靠性问题。

8. **[#10533] Web UI 会话名显示为 32 位十六进制 sessionId**  
   https://github.com/esengine/DeepSeek-Reasonix/issues/10533  
   现象：`reasonix serve` 的左侧会话列表不显示标题，而是显示 sessionId。v1.38.9 和 v1.38.10 均可复现，定位为 `GET /sessions` 对 sessions-v4 会话未返回 title。

9. **[#10543] Windows 下 CLI serve 点击历史会话失败：POST /resume 返回 400**  
   https://github.com/esengine/DeepSeek-Reasonix/issues/10543  
   现象：Web UI 能列出历史会话，但点击后 `POST /resume` 请求体为 `{"path":""}`，返回 400，导致每次启动只能新建会话。回退 v1.38.7 后恢复正常。

10. **[#10534] 持久 PowerShell 超过 30s 冷启动预算，降级为隔离模式**  
    https://github.com/esengine/DeepSeek-Reasonix/issues/10534  
    现象：Windows 真机上持久 PowerShell 无法在 `powerShellStartupTimeout` 内就绪，所有会话静默降级为 isolated-process 执行，每次工具调用都提示 Persistent PowerShell 不可用。

## 重要 PR 进展

1. **[#10549] 隔离 session-id 路由与旧版文件路径**  
   https://github.com/esengine/DeepSeek-Reasonix/pull/10549  
   增加类型化 Desktop session locator，让规范 `session-id:<id>` 路由与 legacy transcript 路径严格分离，避免 canonical tab 或畸形 id 污染旧版 metadata、lock、title 等逻辑。这是针对 v1.38.10 会话错乱的根因修复之一。

2. **[#10550] 修复快照记录身份缺失**  
   https://github.com/esengine/DeepSeek-Reasonix/pull/10550  
   为所有 transcript 显示记录分配稳定身份，包括 active turn 外发布的零序列帧；在 snapshot 进入缓存前校验缺失/重复身份，并修复旧 checkpoint。可降低 v5 迁移后的崩溃风险。

3. **[#10554] 修复 Windows 工作区归属与会话加载取消**  
   https://github.com/esengine/DeepSeek-Reasonix/pull/10554  
   保留物理工作区的持久 owner，避免因 Windows 路径拼写不同派生第二个 ID；同时让会话导航可取消。解决侧边栏项目重复、展开/折叠状态同步错误。

4. **[#10552] 修复授权确认后卡死**  
   https://github.com/esengine/DeepSeek-Reasonix/pull/10552  
   接受 session generation `0` 作为合法初始 Desktop binding，并正确传递 cancelled/rejected approval 结果，恢复 Stop 按钮可用性。直接回应用户遇到的“授权后无响应”问题。

5. **[#10553] 对齐 Windows 工作区 Shell 执行**  
   https://github.com/esengine/DeepSeek-Reasonix/pull/10553  
   Windows 侧统一为稳定 `pwsh` contract，POSIX 保持 bash；前台命令通过 restricted-token runner 执行，后台服务迁移到 `job_output`/`job_kill`。提升 Windows agent 工具执行稳定性。

6. **[#10518] 统一文件系统身份与跨版本锁**  
   https://github.com/esengine/DeepSeek-Reasonix/pull/10518  
   引入版本化 filesystem identity resolver，统一 workspace/session/catalog/repair/Desktop 实例所有权；同时保留 v1.38.10 锁名，确保新旧进程仍互斥。解决文件锁和身份判定错乱问题。

7. **[#10469] 持久化本地草稿并清理历史空会话**  
   https://github.com/esengine/DeepSeek-Reasonix/pull/10469  
   每个 Workspace 只保留一个持久本地草稿，首次执行前不创建 Session/Topic/Controller/lease/MCP runtime；同时清理 legacy 空会话。改善新会话草稿的恢复体验。

8. **[#10539] `serve` 在 store 层维护会话标题，而不是 Serve 本地缓存**  
   https://github.com/esengine/DeepSeek-Reasonix/pull/10539  
   针对 #10533 的 Open PR。将标题解析逻辑下沉到 store 层，修复 sessions-v4 在 Web UI 侧边栏显示为 sessionId 的问题；过程中还发现并覆盖了同一链路上的第二个更大缺陷。

9. **[#10515] CLI 仅从 v4 store 恢复，并在启动时迁移旧会话**  
   https://github.com/esengine/DeepSeek-Reasonix/pull/10515  
   CLI 写入已切到 sessions-v4 后，`--continue`、`--resume`、pickers、`/resume` 仍只枚举 legacy JSONL 目录，导致新格式会话无法恢复。该 PR 让恢复入口只读 canonical v4 store，并启动时迁移旧会话。

10. **[#10545] 图片输入支持 1/4：在会话边界接纳图片**  
    https://github.com/esengine/DeepSeek-Reasonix/pull/10545  
    将图片接入点前移到 session boundary，Composer/CLI 图片字节在用户 turn 开始前即被接受或拒绝。这是完整图片支持系列的第一部分，后续 #10546/#10547/#10548 分别处理持久化、历史渲染与导出闭包。

## 功能需求趋势

- **会话数据安全与迁移可恢复**：大量 issue 指向 v1.38.10 的 v5 迁移不可靠，社区希望有更严格的数据校验、回滚路径和升级前验证。
- **Windows 桌面端稳定性**：桌面服务启动崩溃、黑屏、会话加载失败、PowerShell 超时等 Windows 专属问题成为最高频痛点。
- **凭据与配置自助修复**：API Key 丢失、配置文件不可读写时，用户需要能通过界面恢复，而不是被迫手动删配置或回退版本。
- **Agent 执行可控性**：思考死循环、持久 PowerShell 降级、临时目录反复审批，说明 agent 运行策略需要更多超时、白名单和降级提示机制。
- **多端会话管理一致性**：`serve` 标题缺失、CLI resume 旧目录、TUI 显示错乱和异常磁盘写入，显示 Desktop/CLI/Web UI 三端仍需统一存储语义。
- **第三方 API 兼容性**：有用户提出 newapi/中转站场景需要支持“思考强度”参数透传。
- **图片输入能力**：PR 侧显示图片输入正在从“接纳字节”到“历史渲染/导出”全链路落地，是当前明确的新功能方向。

## 开发者关注点

- **v1.38.10 成为矛盾集中点**：会话历史错乱、服务崩溃、配置丢失等问题密集出现，多位用户表示只能回退到 v1.38.7/v1.38.9。
- **对 PR 合并质量信任下降**：#10527 用户明确抗议“不要合并未经认真验证的 PR”，要求覆盖多项目、多会话、重命名会话等真实场景后再发版。
- **存储层故障恢复手段不足**：永久只读、quarantine 无效、nil-pointer panic 等问题普通用户完全无法自行修复，急需一键诊断/恢复工具。
- **Windows 生态差异仍是主要摩擦点**：路径 identity 不一致、PowerShell 冷启动超时、写入审批弹窗、文件锁等问题集中暴露。
- **配置/凭据持久化不可靠**：强制退出后 API Key 丢失、配置无法保存/删除，是阻断性故障，直接影响用户能否继续使用。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-09-20

## 今日速览

OpenCode 社区近日围绕 **免费层模型（Muse Spark 1.3 Free）在第三方前端/子代理中被拒绝** 的问题讨论激烈（#49580 已积累 44 条评论），同时 **计费与订阅**（Go 配额、扣款失败）仍是高频痛点。PR 侧，TUI 与核心修复同步推进，一个修复 `/move` 路径问题的 PR 一口气关闭 4 个历史 Issue（#49560）；核心 AI 层也迎来了 credential 下放的重构（#43515）。

---

## 社区热点 Issues

挑选了 10 个讨论度/影响面最大的 Issue：

### 1. 免费层模型在 MonoCode 前端 + OpenCode 后端组合下被拒
**#49580** | 评论 44 | 👍 2 | 更新 2026-09-19
使用 MonoCode 桌面端作为前端、OpenCode 作为后端时，免费层模型 `Muse Spark 1.3 Free` 在约 55 秒后报错 `can only be used from within OpenCode`。社区讨论激烈，涉及第三方前端如何正确继承 OpenCode 身份的问题。
🔗 https://github.com/anomalyco/opencode/issues/49580

### 2. 信用卡扣款被拒
**#33264** | 评论 21 | 👍 7 | 已关闭 | 更新 2026-09-19
用户反馈付费被拒，该问题已关闭，但仍有 21 条讨论，说明有不少用户遇到过类似支付卡点。
🔗 https://github.com/anomalyco/opencode/issues/33264

### 3. 请求增加 Go Pro 档位（$20）与首月折扣的 Share 修饰符
**#24879** | 评论 13 | 👍 14 | 开放 | 更新 2026-09-20
用户经常触达 Go 月度上限，只能回退到难以预算的 Zen 按量付费，希望增加固定档位与折扣方案。点赞数高，是社区呼声较强的计费改进需求。
🔗 https://github.com/anomalyco/opencode/issues/24879

### 4. TypeError: undefined is not an object (evaluating 'a.name')
**#49158** | 评论 9 | 👍 35 | 开放 | 更新 2026-09-19
报错出现在 SystemPrompt.environment 的堆栈中，影响版本 v1.18.30。虽然缺少复现步骤，但 35 个 👍 说明受影响面不小。
🔗 https://github.com/anomalyco/opencode/issues/49158

### 5. tmux 会话内 OpenCode 服务意外退出
**#19651** | 评论 7 | 👍 5 | 已关闭 | 更新 2026-09-19
在 tmux 中运行 Open Code（Gemini 3 Pro Preview）时服务崩溃，显示 `[server exited unexpectedly]`。该问题已关闭，但作为终端用户常见场景仍有参考价值。
🔗 https://github.com/anomalyco/opencode/issues/19651

### 6. explore 子代理也被免费层限制阻断
**#49723** | 评论 5 | 👍 0 | 开放 | 更新 2026-09-19
即使主代理正常工作，内置 `explore` 子代理调用免费模型时同样报 `can only be used from within OpenCode`。与 #49580 同源，属于免费层鉴权逻辑对子代理的覆盖遗漏。
🔗 https://github.com/anomalyco/opencode/issues/49723

### 7. OpenCode Go 中 deepseek-v4.1-flash 返回 402 配额不足
**#49936** | 评论 4 | 👍 3 | 开放 | 更新 2026-09-19
Go 账户配额健康，但 `deepseek-v4.1-flash` 经 OrcaRouter 上游返回 `insufficient_user_quota`。作者指出与 9 月报到的 #37231 是同一批问题。
🔗 https://github.com/anomalyco/opencode/issues/49936

### 8. auth.json 不会在新会话中自动加载，导致 Authorization 头缺失
**#36181** | 评论 4 | 👍 0 | 开放 | 更新 2026-09-19
通过 `/connect` 配置的 provider 密钥写在 `~/.local/share/opencode/auth.json`，但新开的终端新会话请求时不带 `Authorization` 头。对 NVIDIA 等 provider 有实际影响。
🔗 https://github.com/anomalyco/opencode/issues/36181

### 9. 订阅已扣款但未生效，且未收到收据
**#50054** | 评论 2 | 👍 0 | 开放 | 更新 2026-09-19
用户通过 Stripe 支付 OpenCode Go 订阅，UPI 扣款成功但没有收到订阅开通确认或收据，涉及资金问题需要官方介入。
🔗 https://github.com/anomalyco/opencode/issues/50054

### 10. /compact 可能静默落地仅含 reasoning 的空摘要，导致上下文不可恢复丢失
**#44080** | 评论 2 | 👍 0 | 开放 | 更新 2026-09-19
当 `/compact` 所用模型只返回 reasoning 而没有文本内容时，OpenCode 会将该空消息作为会话摘要并报告成功，随后替换掉原始对话历史，造成不可逆的上下文丢失。
🔗 https://github.com/anomalyco/opencode/issues/44080

---

## 重要 PR 进展

### 1. core(codemode): keys()/values()/entries() 返回实时迭代器
**#50061** | 已关闭 | 更新 2026-09-19
为 Array、Map、Set、URLSearchParams、Headers、Uint8Array 补齐 JS 语义的 live iterator，String 原型也增加了 `[Symbol.iterator]`，更贴近原生 JS 行为。
🔗 https://github.com/anomalyco/opencode/pull/50061

### 2. fix(tui): /move 允许自定义目标路径，一口气关闭 4 个历史 Issue
**#49560** | 开放 | 更新 2026-09-19
修复 `/move` 只显示当前 project 的 worktree、且拒绝项目外目标路径的问题，顺带关闭 #49212 / #40200 / #43938 / #35306 四个相关 Issue。
🔗 https://github.com/anomalyco/opencode/pull/49560

### 3. feat(tui): v2 支持 `opencode -s` 打开会话选择器
**#50052** | 开放 | 更新 2026-09-19
`opencode -s` 未带 session ID 时直接打开 TUI 会话列表，关闭 #48718 与 #36134。
🔗 https://github.com/anomalyco/opencode/pull/50052

### 4. refactor(app): 时间线行 reconcile 避免深比较
**#48435** | 开放 | 更新 2026-09-19
`reuseTimelineRows` 原来用 `Equal.equals` 逐行深比较，导致 Effect hash 与遍历开销大。改为更轻量的比对方式，提升渲染性能。
🔗 https://github.com/anomalyco/opencode/pull/48435

### 5. refactor(ai): 把 credential 下放交给 provider 包处理
**#43515** | 已关闭 | 更新 2026-09-19
将原生 provider 的 `model(modelID, settings)` 边界改为 `model({ id, settings, credential, defaults })`，core 只负责选择/刷新集成凭据，具体鉴权由 provider 包自行处理。
🔗 https://github.com/anomalyco/opencode/pull/43515

### 6. fix: 追加消息不再打断 prompt cache 断点
**#43510** | 已关闭 | 更新 2026-09-19
追加到请求末尾的消息之前会导致 prompt cache 静默失效，此 PR 修复了缓存断点被打断的问题，对长会话成本优化有帮助。
🔗 https://github.com/anomalyco/opencode/pull/43510

### 7. feat(build): 构建时打包全部 tree-sitter grammars
**#43496** | 已关闭 | 更新 2026-09-19
将 tree-sitter 语法在构建期全部内置，改善离线/air-gap 场景下的可用性（关联 #18492）。
🔗 https://github.com/anomalyco/opencode/pull/43496

### 8. feat(session): 崩溃后自动恢复会话
**#43489** | 已关闭 | 更新 2026-09-19
新增 opt-in 配置 `session.auto_resume`，将活跃会话 ID 持久化到 manifest，下次启动自动恢复崩溃前的会话。
🔗 https://github.com/anomalyco/opencode/pull/43489

### 9. fix(core): 保留命令选择的模型变体
**#43475** | 已关闭 | 更新 2026-09-19
当 command 选择了另一个同变体模型时，之前 reasoning variant 选择会丢。该 PR 修复变体在命令模型切换时被重置的问题。
🔗 https://github.com/anomalyco/opencode/pull/43475

### 10. feat(core): 自动发现并校验 Azure 资源
**#50053** | 开放 | 更新 2026-09-19
后台发现 Azure 资源/部署，提供稳定的 model ID、分页库存与连接级快照；保存新 API key/Azure CLI 连接前先校验访问权限，失败时保留已有凭据。
🔗 https://github.com/anomalyco/opencode/pull/50053

---

## 功能需求趋势

从近期 Issue 中可以看到社区最关注的几个方向：

- **第三方前端/生态集成**：免费层模型只能从 OpenCode 官方客户端调用，用户在 MonoCode 等第三方前端（或子代理场景）下被拒，说明社区对"OpenCode 作为后端引擎 + 任意前端"的架构有明确需求（#49580、#49723）。
- **计费与订阅弹性**：Go 固定档位不够用、Zen 按量难预算、支付/订阅扣款问题频发。社区希望有更多中间档位、首月优惠、更透明的账单（#24879、#50054、#33264）。
- **TUI 体验精细化**：`/move` 选择器无法进入嵌套目录、目录指示器不刷新、session 列表/tab 开关不可配置、缺少快捷键等，说明 TUI 正在被高频深度使用，用户开始打磨交互细节（#49212、#43938、#49652、#50056）。
- **会话生命周期管理**：自动摘要、技能自我进化（hermes 式循环）、崩溃自动恢复、compact 安全性成为关注点（#50063、#50064、#44080）。
- **性能与成本优化**：50 轮对话后 bootstrap/compaction 变慢、prompt cache 易失效、非交互模式 `opencode run` 对瞬时错误的退出码不友好，牵涉自动化场景的稳定性（#50062、#50055、#50063）。
- **生态页面扩充**：连续出现请求将新插件/远程 MCP 纳入 Ecosystem 页面的 PR/Issue（#50057、#50058、#50060），社区生态正在快速扩展。

---

## 开发者关注点

- **免费层鉴权过于严格**：免费模型在非官方前端/子代理中直接被拒，且无明确申诉路径（#49580、#49723、#49057）。
- **支付/订阅信任问题**：扣款成功但不生效、无收据、信用卡被拒，直接影响用户对服务的信任（#50054、#33264）。
- **上下文丢失风险**：`/compact` 以空 body 静默替换历史、prompt cache 被意外打断、切换 agent 后缓存归零（重发 42k tokens），这是当前最让重度用户头疼的问题（#44080、#50055、#43510）。
- **TUI 目录与路径交互**：Move picker 无法进入嵌套目录、目录指示器不更新，影响多项目/多 worktree 工作流（#49212、#43938）。
- **配置加载不可靠**：auth.json 在新会话中不自动读取，需要手动干预，增加使用摩擦（#36181）。
- **后台请求与未授权模型**：Desktop 应用会周期性向自定义 provider 发送未配置模型（grok-4.3）的空请求，引发隐私与成本疑虑（#50059）。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 2026-09-20

## 今日速览

Hermes 社区今日围绕**消息投递可靠性**与**安全加固**密集推进：投递可靠性四层系列 PR 已推进至第 3 层（#115003 / #115009 / #115010），同时修复了 EOS 控制 token 泄露（#116487）和环境变量 denylist 关键遗漏（#116491）两项安全问题。桌面端会话体验问题集中爆发，clarify 表单无法渲染（#116483）与上下文上限被静默丢弃（#116467）成为用户关注焦点。今日无新版本发布。


## 社区热点 Issues

### 1. Bot 群聊应在桌面端关闭后继续运行（#97681）
[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)
- **标签**：P2、comp/gateway、comp/desktop、sweeper:risk-session-state、sweeper:risk-message-delivery
- **重要性**：用户希望 Bot 群聊不依赖桌面端保持在线即可跨网关协作，并可从其他设备接管会话。该问题涉及会话状态持久化和消息投递，是当前讨论最热烈的话题。
- **社区反应**：28 条评论、2 个 👍，讨论持续至 9 月 19 日。

### 2. Projects 范式破坏文件夹 → 会话 → 侧边栏工作流（#53004）
[#53004](https://github.com/NousResearch/hermes-agent/issues/53004)
- **标签**：P2、type/bug、comp/desktop、area/sessions
- **重要性**：回归缺陷——PR #49037 引入的“first-class projects”范式导致原有文件夹选择、会话启动、侧边栏映射的完整工作流断裂，属于桌面端高频使用路径。
- **社区反应**：16 条评论，已有一定讨论量并持续更新。

### 3. `hermes update` 崩溃导致 fleet_restart_pending 标记无法清除（#115638）
[#115638](https://github.com/NousResearch/hermes-agent/issues/115638)
- **标签**：P2、comp/cli、comp/gateway、sweeper:risk-compatibility
- **重要性**：更新流程中途崩溃会留下无法清除的 `fleet_restart_pending` 标记，使系统卡在待重启状态，影响升级运维的可靠性。
- **社区反应**：新提交，4 条评论，9 月 19 日当天活跃。

### 4. 桌面端 clarify 工具问题表单永不渲染（#116483）
[#116483](https://github.com/NousResearch/hermes-agent/issues/116483)
- **标签**：comp/desktop
- **重要性**：Agent 调用 clarify 工具时，用户只看到 spinner 而不知道有待回答问题，调用阻塞数分钟后最终返回空答案。直接影响交互式任务流程。
- **社区反应**：新提交，9 月 19 日创建，已有 1 条确认评论。

### 5. Telegram 流式编辑节奏失控，83% 洪水惩罚源于此（#116312）
[#116312](https://github.com/NousResearch/hermes-agent/issues/116312)
- **标签**：P3、comp/plugins、platform/telegram、sweeper:risk-message-delivery
- **重要性**：该 Issue 是 #114396 的生产环境后续反馈，用数据说明了 Telegram 流式编辑导致的洪水惩罚问题。合并修复后仍存在 fallback 续写截断问题，表明该场景尚未收敛。
- **社区反应**：新提交，附有生产环境实测数据，参考价值较高。

### 6. 模型变更可静默丢弃有效上下文上限（#116467）
[#116467](https://github.com/NousResearch/hermes-agent/issues/116467)
- **标签**：comp/cli、comp/desktop
- **重要性**：通过 `hermes model` 或桌面端更换模型后，配置的上下文上限可能被静默丢弃，且不是简单的服务商上限问题，用户难以感知配置已失效。
- **社区反应**：新提交，9 月 19 日当天报告。

### 7. 网关将泄露的终端 `<|eos|>` 控制 token 当作聊天消息发送（#116486）
[#116486](https://github.com/NousResearch/hermes-agent/issues/116486)
- **标签**：comp/gateway、comp/agent
- **重要性**：OpenAI 兼容提供商返回的控制 token 被原样发送到消息网关，用户可见 `<|eos|>` 字样，破坏消息体完整性，属于协议层过滤缺失。
- **社区反应**：新提交，已有对应 PR #116487 提出修复方案。

### 8. 环境变量写入器 denylist 遗漏大部分子进程执行类变量（#116490）
[#116490](https://github.com/NousResearch/hermes-agent/issues/116490)
- **标签**：comp/cli、area/config
- **重要性**：`GIT_CONFIG_*`、`BASH_ENV`、`ASKPASS`、解释器注入等变量名未被 denylist 覆盖，`.env` 写入面存在可影响子进程执行的安全风险。
- **社区反应**：新提交，无评论，但当天已有对应修复 PR #116491。

### 9. 功能需求：/model 选择器支持用户自定义补充模型列表（#50715）
[#50715](https://github.com/NousResearch/hermes-agent/issues/50715)
- **标签**：P3、type/feature、comp/agent
- **重要性**：用户模型选择仅依赖官方 curated manifest，尚未收录的模型（如 OpenRouter 上的新模型）无法出现在选择器中，制约模型探索效率。
- **社区反应**：1 条评论，长期开放中，属于稳定的社区功能呼声。

### 10. 功能需求：桌面皮肤与 Dashboard 主题双向同步（#50190）
[#50190](https://github.com/NousResearch/hermes-agent/issues/50190)
- **标签**：P3、type/feature、comp/cli、comp/tui
- **重要性**：Desktop 与 Dashboard 各自维护主题，配置互不相通，多个入口之间的视觉配置割裂。
- **社区反应**：长期开放，暂无新评论，但需求在持续收集阶段。


## 重要 PR 进展

### 1. fix(tui_gateway): 使服务端请求结算原子化（#112559）
[#112559](https://github.com/NousResearch/hermes-agent/pull/112559)
- **状态**：CLOSED ｜ **标签**：P2、sweeper:risk-session-state
- **内容**：修复服务端响应被并发超时或中断取消覆盖的竞态条件。服务端请求现在持有共享结算锁，确保第一个终态获胜。
- **价值**：消除 TUI 网关中响应状态不确定的窗口，属于会话状态稳定性的基础修复。

### 2. fix(bot-live-delivery): 投递目标必须可证明在线上（#115003）
[#115003](https://github.com/NousResearch/hermes-agent/pull/115003)
- **状态**：OPEN ｜ **标签**：P2、sweeper:risk-message-delivery ｜ **系列**：投递可靠性第 1/4 层
- **内容**：落地 Bot Chat 所有者邮箱投递存储，修复了“仅进程存在即视为存活”、单条不可读记录阻塞后续扫描、固定记录阻塞投递队列等三个问题。
- **价值**：为整个投递可靠性体系提供正确的存储层基础。

### 3. feat(peer-send): 忙碌目标回执、持久投递队列、内容键去重（#115010）
[#115010](https://github.com/NousResearch/hermes-agent/pull/115010)
- **状态**：OPEN ｜ **标签**：P2、sweeper:risk-session-state、sweeper:risk-message-delivery ｜ **系列**：投递可靠性第 3/4 层
- **内容**：忙碌目标不再视为投递失败，而是返回 `status="queued"` 回执；同时引入持久化投递队列和内容键去重，避免重试产生重复消息。
- **价值**：解决多网关场景下 Bot Chat 消息投递的两个核心痛点：目标忙碌和重复消息。

### 4. fix(gateway): 抑制泄露的终端 EOS 控制 token（#116487）
[#116487](https://github.com/NousResearch/hermes-agent/pull/116487)
- **状态**：OPEN ｜ **修复**：#116486
- **内容**：阻止提供商返回的精确终端 `<|eos|>` 控制 token 变成用户可见的聊天消息。已在 `xai-oauth / grok-4.6` 上观察到两种泄露形态。
- **价值**：收紧网关输出过滤规则，保持消息内容的协议纯净性。

### 5. config: 扩展环境变量写入器 denylist 覆盖完整子进程执行类（#116491）
[#116491](https://github.com/NousResearch/hermes-agent/pull/116491)
- **状态**：OPEN ｜ **修复**：#116490
- **内容**：在原有 denylist 基础上补充缺失成员，并为无界家族新增前缀规则，覆盖 `GIT_CONFIG_*`、`BASH_ENV`、`ASKPASS` 及各类解释器注入变量。
- **价值**：堵住 `.env` 写入口经 `os.environ` 影响后续子进程执行的安全面。

### 6. fix(hindsight): 日志保留到磁盘，崩溃不丢失对话轮次（#116492）
[#116492](https://github.com/NousResearch/hermes-agent/pull/116492)
- **状态**：OPEN ｜ **标签**：comp/agent
- **内容**：当前 retained turn 仅存在于内存队列，从 `sync_turn` 返回到服务端确认之间进程崩溃将静默丢失对话轮次。该 PR 将其持久化到磁盘。
- **价值**：缩小“已保留但未持久化”的窗口，避免崩溃导致对话数据丢失。

### 7. fix(gemini): aq 密钥默认使用 Google AI Studio，Vertex 需显式指定（#116068）
[#116068](https://github.com/NousResearch/hermes-agent/pull/116068)
- **状态**：OPEN ｜ **标签**：P2、provider/gemini、area/auth ｜ **修复**：#116053
- **内容**：Google AI Studio 已将旧 `aiza` 密钥格式迁移至 `aq` 格式。此前 Hermes 会自动将 `aq` 前缀密钥重写为 Vertex AI Express，导致 AI Studio 密钥 403。该 PR 修复该行为。
- **价值**：避免 Gemini 密钥因格式迁移而被错误路由至失效端点。

### 8. fix(lsp): 保留推送诊断和 Windows URI 身份（#81915）
[#81915](https://github.com/NousResearch/hermes-agent/pull/81915)
- **状态**：OPEN ｜ **标签**：P2、comp/lsp、platform/windows
- **内容**：修复 `typescript-language-server` 等推送式 LSP 服务器的诊断新鲜度问题，并统一 Windows 文档 URI 身份，使 LSP 客户端状态机保持一致。
- **价值**：LSP 是 IDE 类工作流的基础能力，该修复对 Windows 用户尤其重要。

### 9. feat(auth): 轮次之间刷新凭据池策略（#116479）
[#116479](https://github.com/NousResearch/hermes-agent/pull/116479)
- **状态**：OPEN ｜ **标签**：comp/agent
- **内容**：长会话现在会在下一轮次采纳新的凭据池优先级配置，无需重启网关或重建会话 prompt；飞行中的请求保持原策略。
- **价值**：提升 auth 配置变更的即时性，减少多用户/多工作区环境下的运维摩擦。

### 10. fix(recovery): 隔离格式错误的会话模型配置（#101679）
[#101679](https://github.com/NousResearch/hermes-agent/pull/101679)
- **状态**：OPEN ｜ **标签**：P2、sweeper:risk-session-state、area/sessions
- **内容**：修复离线会话恢复流程——字段恢复可能产生一个通过 `PRAGMA integrity_check` 和外键检查的会话数据库，但 `sessions.model_config` 格式非法，导致恢复后会话列表不可用。该 PR 在声明恢复库可用前强制执行 JSON 不变式。
- **价值**：保障恢复数据的可用性，避免“看起来完整但实际损坏”的恢复结果。


## 功能需求趋势

- **跨设备会话连续性**：社区持续关注会话状态不依赖单一设备/桌面端的问题（#97681、#50190）。Bot 群聊跨网关协作、多设备接管会话是核心场景。
- **配置与主题统一管理**：桌面端皮肤与 Dashboard 主题双向同步（#50190）、/model 选择器支持自定义模型列表（#50715）等诉求表明，用户希望配置在不同入口间保持一致。
- **模型支持与兼容性增强**：Gemini 密钥格式迁移（#116068）、Qwen Token Plan 支持（#110993）等说明模型提供方的快速演进正不断影响 Hermes 的兼容层。
- **投递可靠性系统性提升**：四层投递可靠性系列（#115003、#115009、#115010）和 Telegram 流式编辑问题（#116312）显示社区正在系统性地解决消息重复、丢失、洪水惩罚等问题。
- **安全加固**：EOS 控制 token 泄露（#116486）和 env-writer denylist 遗漏（#116490）反映出社区对网关输出过滤和进程执行环境安全的关注度提升。


## 开发者关注点

- **会话状态与恢复是最集中的痛点**：多个高讨论度 Issue 和 PR 均带有 `sweeper:risk-session-state` 标签（#97681、#53004、#115638、#101679、#112559），覆盖桌面端关闭、更新崩溃、字段恢复损坏等场景，说明会话持久化可靠性仍是头部问题。
- **消息投递可靠性问题频发**：目标忙碌、重复投递、洪水惩罚、EOS token 混入消息等问题在多个入口（Telegram、Bot Chat、网关）反复出现，开发者正通过分层方案根治。
- **配置失效难以感知**：开发者反馈中多次提到“静默”行为——上下文上限被丢弃（#116467）、配置 key 从未注册（#116488）、denylist 覆盖不全（#116490）。这类问题因无显式报错而排查成本极高。
- **平台兼容性零散但影响明确**：Windows WSL2 更新后重连失败（#91021）、Windows LSP URI 身份（#81915）、Windows 网关身份暂态（#112641）等表明多平台一致性需要持续打磨。

:::
