---
title: "AI CLI 工具社区动态日报"
published: 2026-10-07
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-07

> 生成时间: 2026-10-07 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具社区横向对比分析报告（2026-10-07）

> **口径说明**：日报中仅 Gemini CLI、Hermes 给出明确 Issue 总量；其余多为“精选 10 条”或“热点条目”，不等同于全量。下表以“披露/精选”标注，避免误读。

## 1. 生态全景

当前 AI CLI 工具已从“单机编码助手”快速演进为**多 provider、多代理、桌面+CLI+IDE 融合的 Agent 平台**。头部厂商工具仍在高频发版，但社区重心明显从“新增能力”转向**稳定性、权限/沙箱、跨平台与可观测性**。Windows/WSL、上下文压缩、MCP/插件一致性、子代理可信度，成为跨项目共性问题。与此同时，认证、凭据、更新链路、企业级接入正在变成新的工程难点。社区对“静默失败”和“stale 自动关闭”的容忍度显著下降，要求显式错误、可覆盖审批与可调试提示词。

## 2. 各工具活跃度对比

| 工具 | Release 情况 | Issues（披露/精选） | PR（披露/精选） | 今日社区信号 |
|---|---|---|---|---|
| Claude Code | v2.1.292、v2.1.291 | 精选 10 + 批量 stale 关闭 | 2 | 多账号 Connector #27302 达 262 评论/402👍；高危进程误杀 #99768 |
| OpenAI Codex | 2 个 Rust alpha | 精选 10 | ≥13 | Windows 沙箱/审批/桌面问题密集；macOS CLI 66GiB 内存问题 |
| Gemini CLI | v0.63.0、v0.64.0-preview.0、nightly | 49 | 精选 10+，另有 Dependabot 批量 | 子代理 MAX_TURNS 误报成功、Generalist 无限挂起 |
| DeepSeek Reasonix | v2.29.0、studio-v2.29.0 | 精选 10 | 精选 10 | 压缩准确性、多会话渲染、MCP 完整性、WSL 支持 |
| Deepseek Harness | 无 | 0 | 0 | 过去 24 小时无活动 |
| Hermes | 无 | 13 | 50 | macOS Desktop 更新链路多 P1；CI gpu_class 导入崩溃阻塞全仓库 |
| OpenCode | v1.18.35 | 精选 10 | 精选 10+ | 剪贴板 #4283 达 137 评论/130👍；WSL UNC 崩溃已有修复 PR |
| OpenClaw | 无 | 精选 10 | 精选 10 | P0 升级失败群；认证/provider、会话生命周期、安全边界问题 |

**活跃度速判**：Claude Code、Codex、Gemini CLI 属头部官方工具，议题量大、版本节奏快；Hermes、OpenCode、OpenClaw 社区/新兴项目 PR 活跃、迭代激进；DeepSeek Reasonix 保持中高热度和垂直迭代；Deepseek Harness 当前停滞。

## 3. 共同关注的功能方向

1. **跨平台稳定性，尤其 Windows/WSL**
   - Claude Code：git.exe 孤儿进程、worktree junction、屏幕阅读器。
   - Codex：Windows 沙箱、execpolicy、桌面浏览器、路径盘符。
   - Gemini CLI：Wayland、gVisor、Docker/Podman/LXC。
   - OpenCode：WSL UNC 路径导致 HTTP 500；OpenClaw/Hermes 也有 Windows 路径与更新问题。

2. **权限、审批与安全边界**
   - Claude Code：分类器硬拒绝不可回退、请求关闭开关。
   - Codex：execpolicy 误报、子代理拒绝后无可信批准路径。
   - Gemini CLI：破坏性 git 操作防护；OpenClaw：容器隔离拒绝后仍执行。
   - 共同诉求：**精准、可解释、可人工覆盖**，而非黑盒拒绝。

3. **子代理/多代理可靠性与可观测性**
   - Gemini CLI：MAX_TURNS 被上报为 GOAL 成功、Generalist 无限挂起。
   - Claude Code：MCP 工具调用被丢弃、异步子代理流中断却报 completed。
   - Codex/OpenClaw：子代理审批、父级唤醒、重复 final。
   - 趋势：多代理正从实验走向生产，**终止原因、用量检查点、审批路径**必须可信。

4. **上下文压缩与长会话状态一致性**
   - Claude Code：自动压缩失败但手动成功。
   - DeepSeek Reasonix：压缩阈值后上下文错乱、长度估计不准。
   - Hermes：压缩在途守卫缺口导致双重压缩。
   - OpenCode：自动压缩后 agent 放弃顶层工具。
   - 共同方向：压缩触发、摘要截断、会话恢复必须可预测。

5. **MCP/插件/Skill 生态一致性**
   - Claude Code：插件 marketplace、安全审查不暴露密钥。
   - Gemini CLI：Skills/子代理“配了但不用”；工具 >128 触发 400。
   - DeepSeek Reasonix：MCP 提示词入口缺失。
   - Hermes/OpenCode/OpenClaw：插件注册 skill 不可见、MCP 认证状态脱节、SDK 导出不足。
   - 信号：生态从“能接入”进入“可见、可管理、可安全治理”阶段。

6. **IDE/桌面/TUI 体验与无障碍**
   - Claude Code：桌面输入框不可调高、/diff cwd 错误。
   - Codex：VS Code 拖放非图片文件高赞；TUI URL 可点击。
   - OpenCode：TUI 导航、Office 文件预览；OpenClaw：Control UI 模型显示。
   - a11y 从加分项变成功能可用性：屏幕阅读器、听写、粘贴块编辑。

7. **认证、多账号、多 provider 与凭据**
   - Claude Code：同一 Connector 多账号。
   - OpenCode：Bedrock 凭据、外部凭据引用、集成表单。
   - OpenClaw：auth order、OAuth 结算、Codex 冷启动。
   - Gemini CLI：OAuth 循环；Hermes：provider extra_body 泄漏。
   - 认证已从“填 Key”变成小型子系统。

8. **性能、资源治理与更新链路**
   - Codex：Unix fd 限制、macOS 内存 66GiB。
   - DeepSeek Reasonix：多会话渲染冻结、GPU 100%。
   - OpenCode：桌面每次更新膨胀约 175MB。
   - Hermes/OpenClaw：更新 pre-flight、锁冲突、P0 升级失败。
   - 更新可靠性成为发布级阻断问题。

## 4. 差异化定位分析

| 工具 | 定位/目标用户 | 功能侧重 | 技术/生态路线 |
|---|---|---|---|
| Claude Code | Anthropic 官方，专业开发者/团队 | 编码 Agent、插件市场、Agent effort、安全审查、云会话 | CLI+桌面+云，权限分类器、worktree、插件生态 |
| OpenAI Codex | OpenAI 生态开发者，Windows/IDE 用户 | Rust 核心、沙箱审批、Browser/Computer Use、多代理 | 快速 alpha，app-server、MCP、TUI/IDE |
| Gemini CLI | Google/Gemini 开发者，终端+IDE | A2A/ACP、子代理、Skills、AST 上下文、沙箱 | preview/nightly 高频，GS 生态集成 |
| DeepSeek Reasonix | DeepSeek 用户、远程多会话开发者 | Studio+TUI、远程机器、WSL、压缩、MCP | 桌面+终端+serve，插件技能 |
| Deepseek Harness | — | — | 当前无活动 |
| Hermes | NousResearch，桌面自动化/研究型用户 | Computer Use、压缩、provider fallback、onboarding | Gateway/会话状态机，多 provider |
| OpenCode | 开源、多模型开发者 | TUI/桌面、多供应商、凭据集成、Office 预览 | Core/Effect/插件/Protocol/Server/TUI 重构 |
| OpenClaw | 自托管、多代理平台用户 | Gateway、会话存储、认证、浏览器、Skill Workshop | 安全边界、插件生态、更新稳定性 |

**简要判断**：Claude Code/Codex/Gemini CLI 代表“官方大厂全家桶”，强调平台覆盖与企业级能力；OpenCode/OpenClaw/Hermes 代表“社区/自托管平台”，强调多 provider、可扩展和深度可控；DeepSeek Reasonix 更垂直，围绕 DeepSeek 模型做桌面+远程+终端体验；Harness 当前无信号。

## 5. 社区热度与成熟度

- **高热度第一梯队**：Claude Code、Codex、Gemini CLI。  
  证据：Claude Code #27302 达 262 评论/402👍；Gemini CLI 子代理 P1 议题合计 21 评论；Codex Windows 议题密集。
- **高活跃社区/新兴平台**：OpenCode、OpenClaw、Hermes。  
  OpenCode #4283 剪贴板问题 137 评论/130👍，长期未解；Hermes 单日 13 Issue/50 PR，但 CI 和 macOS 更新链路暴露工程成熟度不足；OpenClaw 出现 P0 升级失败群和安全边界议题。
- **中高垂直迭代**：DeepSeek Reasonix。  
  版本、压缩、远程、WSL、MCP 均活跃，但社区规模与头部仍有差距。
- **停滞观察**：Deepseek Harness 过去 24 小时无活动。
- **成熟度悖论**：头部工具功能成熟、发布节奏快，但缺陷密度和权限摩擦也高；新兴工具迭代更快，但更新、CI、基础交互的“最后一公里”仍需补课。

## 6. 值得关注的趋势信号

1. **可靠性优先于功能扩张**  
   静默失败、压缩错乱、会话恢复丢档、子代理假成功，是当前最伤信任的问题。开发者需要显式失败，而非靠外部工具反推。

2. **权限/审批必须“精准+可覆盖”**  
   硬拒绝会直接杀死自动化会话。分类器、沙箱、execpolicy 都需要可解释、可关闭、可人工批准。

3. **Windows/WSL 是最大跨平台战场**  
   几乎所有工具都在此暴露问题。谁先解决 Windows/WSL 的路径、沙箱、进程、更新体验，谁就更容易拿下企业开发者。

4. **多代理进入生产化补课期**  
   子代理终止原因、用量检查点、父级唤醒、审批路径，正在成为编排层的基础设施。

5. **MCP/插件生态从接入转向治理**  
   密钥暴露、Skill 不可见、MCP 认证状态脱节、工具数量超限，说明生态需要统一心智模型和安全边界。

6. **上下文压缩成为长会话核心能力**  
   AST 感知、warm handoff、provider 侧 prompt size 触发折叠，都是围绕 token 效率与状态一致性的系统投入。

7. **桌面/TUI/IDE 融合与 a11y 上升**  
   文件拖放、Office 预览、TUI 导航、屏幕阅读器，说明用户不再满足于“能跑命令”，而是要求完整工作流体验。

8. **认证与凭据企业化**  
   多账号、Bedrock、外部凭据引用、OAuth 结算、auth order，表明 AI CLI 正在进入企业 IT 治理视野。

9. **更新链路是新的发布阻断点**  
   Hermes、OpenClaw、OpenCode 均出现升级/清理/磁盘膨胀问题。发布工程将与模型能力同等重要。

10. **社区治理透明度影响贡献意愿**  
   大量 stale 关闭、approved PR 过时、CI 长期飘红，会直接消耗贡献者信任。维护者需优先处理流程与基础环境问题。

**对开发者的选型参考**：若重企业身份、插件与安全审查，关注 Claude Code；若重 OpenAI 生态、Windows/IDE/Computer Use，关注 Codex；若重 Google/Gemini 与 A2A/ACP，关注 Gemini CLI；若重开源、多模型、TUI 深度定制，关注 OpenCode/OpenClaw/Hermes；若围绕 DeepSeek 做远程多会话与桌面体验，关注 Reasonix。短期决策应把**跨平台稳定性、权限可覆盖性、压缩/会话一致性、MCP 生态成熟度**作为核心评估项。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-10-07）

> 数据说明：PR 评论数字段为 `undefined`，PR 热度主要依据原榜单排序、更新时间、关联 Issue 与主题集中度综合判断；Issue 评论数完整。

## 1. 热门 Skills 排行（PR）

| 排名 | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | [#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures](https://github.com/anthropics/skills/pull/1298) | 修复触发评估误判、Windows 子进程和运行时失败处理；热点是 skill-creator 评估可靠性与跨平台稳定性 | OPEN |
| 2 | [#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2` 的导入名和自定义 headers；关联 #1668，热点是 MCP 工具链兼容性 | OPEN |
| 3 | [#1771 proofcore-contract-auditor for smart contract notarization](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 智能合约静态分析，并把审计证明锚定到 TON 区块链；热点是 Web3 安全审计与链上存证 | OPEN |
| 4 | [#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734) | 检测 docx 中孤立批注；热点是文档处理完整性与办公自动化质量 | OPEN |
| 5 | [#1703 Add md2video-audio skill](https://github.com/anthropics/skills/pull/1703) | Markdown 转 MP4 视频并生成类人语音；热点是零成本多媒体内容生成 | OPEN |
| 6 | [#1245 Notion spec-to-implementation and quantitative-resume-auditor](https://github.com/anthropics/skills/pull/1245) | Notion 规格转实现任务 + 简历量化审计；热点是项目管理工作流与求职自动化 | OPEN |
| 7 | [#1792 fix(docx): report LibreOffice timeout as an error and verify output](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时改为报错并验证输出；热点是官方 docx skill 的可靠性 | OPEN |
| 8 | [#1730 fix(claude-api): replace dead URLs in academy-guide and tool-use-concepts](https://github.com/anthropics/skills/pull/1730) | 修复 claude-api 与 academy-guide 的死链；热点是文档维护与链接质量 | OPEN |

## 2. 社区需求趋势（Issues）

- **安全与信任边界：最高优先级。** [#492](https://github.com/anthropics/skills/issues/492) 有 43 条评论，核心是社区技能以 `anthropic/` 命名空间分发，可能被误认为官方技能并获取高权限。
- **组织级技能共享与分发。** [#228](https://github.com/anthropics/skills/issues/228) 希望 Claude.ai 内直接共享技能库；[#189](https://github.com/anthropics/skills/issues/189) 则反映插件重复安装导致技能重复。
- **评估、触发与基准可靠性。** [#556](https://github.com/anthropics/skills/issues/556) 报告 `run_eval.py` 触发率为 0%；[#1383](https://github.com/anthropics/skills/issues/1383)、[#202](https://github.com/anthropics/skills/issues/202)、[#1394](https://github.com/anthropics/skills/issues/1394) 集中讨论 skill-creator 基准失败、最佳实践和 eval-viewer XSS。
- **上下文窗口与 Token 效率。** [#1487](https://github.com/anthropics/skills/issues/1487) 指出 `claude-api` 单次注入约 156k tokens；[#1329](https://github.com/anthropics/skills/issues/1329) 提出 `compact-memory` 用符号化压缩 agent 状态。
- **文档/办公自动化质量。** 需求覆盖 docx 孤立批注、ODT、排版、PDF 大小写引用、SharePoint 权限等，如 [#1734](https://github.com/anthropics/skills/pull/1734)、[#486](https://github.com/anthropics/skills/pull/486)、[#514](https://github.com/anthropics/skills/pull/514)、[#538](https://github.com/anthropics/skills/pull/538)、[#1175](https://github.com/anthropics/skills/issues/1175)。
- **测试生成、代码审查与安全执行。** 包括 AWT E2E 测试 [#822](https://github.com/anthropics/skills/pull/822)、blast-radius 破坏性操作检查 [#1776](https://github.com/anthropics/skills/pull/1776)、webapp-testing 去除 `shell=True` [#1980](https://github.com/anthropics/skills/pull/1980)、mcp-builder evaluation 0/N 问题 [#1390](https://github.com/anthropics/skills/issues/1390)。
- **新兴垂直方向。** 智能合约审计 [#1771](https://github.com/anthropics/skills/pull/1771)、HPC 集群 [#1615](https://github.com/anthropics/skills/pull/1615)、视频生成 [#1703](https://github.com/anthropics/skills/pull/1703)、agent governance [#412](https://github.com/anthropics/skills/issues/412)、推理质量门 [#1385](https://github.com/anthropics/skills/issues/1385)。

## 3. 高潜力待合并 Skills（PR）

- [#1742 mcp-builder 适配 mcp>=2](https://github.com/anthropics/skills/pull/1742)：直接修复 #1668，影响所有 MCP 构建流程，更新至 2026-09-29。
- [#1298 skill-creator 触发评估隔离](https://github.com/anthropics/skills/pull/1298)：解决多个评估可靠性问题，更新至 2026-09-16。
- [#1681 skill-creator 支持直接执行 package_skill.py](https://github.com/anthropics/skills/pull/1681)：修复 `ModuleNotFoundError` 和过时路径，更新至 2026-09-27。
- [#1792 docx LibreOffice 超时处理](https://github.com/anthropics/skills/pull/1792)：官方 docx skill 稳定性修复，更新至 2026-09-25。
- [#1961 skill-creator eval viewer 安全加固](https://github.com/anthropics/skills/pull/1961)：覆盖脚本逃逸、DNS rebinding、跨站 POST 和转义问题，更新至 2026-10-06。
- [#1980 webapp-testing 避免 shell=True](https://github.com/anthropics/skills/pull/1980)：修复 CWE-78 命令注入风险，更新至 2026-10-06。
- [#1245 Notion spec + quantitative-resume-auditor](https://github.com/anthropics/skills/pull/1245)：组合型新技能，覆盖项目管理和简历审计，更新至 2026-09-30。
- [#1730 claude-api 死链修复](https://github.com/anthropics/skills/pull/1730)：低成本高确定性的文档维护，更新至 2026-10-04。

## 4. Skills 生态洞察

一句话：当前社区最集中的诉求不是“更多 Skill”，而是建立**可信分发、可靠评估、安全执行、跨平台兼容**的 Skills 基础设施；其中**安全/信任边界**与**skill-creator 评估可靠性**优先级最高。

---

# Claude Code 社区动态日报（2026-10-07）

## 一、今日速览

今日发布了 v2.1.292 与 v2.1.291 两个小版本：前者为插件安装引入 `--marketplace` 参数，并给 Agent 工具加上 `effort` 参数；后者集中修复了两个回归（云会话权限提示丢答案、退出丢失最后消息）。社区侧，多账号 Connector 支持（#27302）以 262 条评论、402 个赞稳居热度榜首；同时一条 Linux 后台任务清理误杀全主机进程树的**高危数据丢失级 Bug**（#99768）值得立即关注。

---

## 二、版本发布

### v2.1.292
- **`claude plugin install --marketplace <source>`**：安装插件时可一并添加 marketplace，且与 `claude plugin marketplace add` 走同一套策略校验，简化了插件源引入流程。
- **Agent 工具新增 `effort` 参数**：可以按次指定子 Agent 的推理投入档位，便于在成本与质量之间做细粒度取舍。

### v2.1.291
- 修复 2.1.290 的回归：云会话（cloud sessions）会丢失对权限提示的应答。
- 修复 2.1.288 的回归：退出会话时最后几条消息可能丢失。

> 两个版本均为短周期修复型发布，无破坏性变更，建议所有用户升级至 2.1.291+。

---

## 三、社区热点 Issues（精选 10 条）

### 1. #27302 · 支持同一 Connector 绑定多个账号（262 评论 / 402 👍）
[链接](https://github.com/anthropics/claude-code/issues/27302)
当前 Claude / Claude Code on the web 无法为同一 Connector（如 GitHub、Google Drive）配置多个账号，导致个人号与工作号无法并存。这是本期绝对热度第一的需求，长尾讨论持续 7 个月仍在更新，说明多身份工作流已是刚需。

### 2. #3412 · 提交前可查看/编辑 “pasted text” 折叠块（87 评论 / 288 👍，已关闭）
[链接](https://github.com/anthropics/claude-code/issues/3412)
使用 dictation 软件（MacWhisper 等）输入时，文本被折叠成 `[Pasted text]` 块且无法预览、无法编辑，极易把错误内容直接提交给模型。该 Issue 已被关闭，是本期少见的“长期诉求得到处理”的正面信号。

### 3. #99768 · 后台任务清理使用 `sudo kill -TERM -<pgid>` 误杀整机进程（高危 / 数据丢失）
[链接](https://github.com/anthropics/claude-code/issues/99768)
低内存触发后台 Bash 任务终止后，Claude Code 对大宿主进程组发送了 `sudo kill -TERM`，导致主机上大量无关进程被 SIGTERM——这是本期最严重的安全/数据丢失问题，建议所有在共享或多任务环境运行 CC 的用户优先评估影响。

### 4. #97752 · Windows：超时 `git status` 残留 git.exe 进程直至内存耗尽
[链接](https://github.com/anthropics/claude-code/issues/97752)
只结束了 Git for Windows 的启动器 `cmd\git.exe`，真正的 `mingw64\bin\git.exe` 仍在运行，进程不断堆积。属性能/内存类隐患，Windows 用户长会话场景下影响显著。

### 5. #92279 · Auto 模式下分类器拦截应回退为权限提示，而非硬拒绝（6 👍）
[链接](https://github.com/anthropics/claude-code/issues/92279)
当前分类器只有 allow/block 两种结果，被 block 后模型收到 `automode-blocked` 无法自恢复，只能回一句“请你自己在终端执行”，直接使自动化会话失效。这直指 Auto 模式的核心可用性缺陷。

### 6. #100091 · 请求提供关闭分类器的开关
[链接](https://github.com/anthropics/claude-code/issues/100091)
与上一条同源的诉求，用户对权限分类器的“拦路感”表达出强烈不满（情绪化措辞可见摩擦程度）。两条 issue 叠加，说明权限/分类器体验是当前最高频的抱怨来源。

### 7. #94353 · Windows 桌面端斜杠命令菜单对 NVDA 屏幕阅读器完全静默（a11y）
[链接](https://github.com/anthropics/claude-code/issues/94353)
在 Code 标签页输入 `/` 弹出的命令菜单无任何可访问性公告，屏幕阅读器用户无法感知菜单内容，属于功能性不可用而非体验瑕疵。

### 8. #89395 · `/diff` 面板不传 cwd，读取的是启动目录而非会话 worktree（有复现）
[链接](https://github.com/anthropics/claude-code/issues/89395)
在 worktree 隔离会话中，`/diff` 展示的可能是完全错误的仓库状态，容易误导代码审查判断，且带 `has repro` 标签，修复优先级应较高。

### 9. #96059 · 计划例程（Scheduled routine）邮件通知静默失败
[链接](https://github.com/anthropics/claude-code/issues/96059)
关联的 #84645、#80880 均被以 “not planned” 关闭但问题仍稳定复现，用户不得不重新开单。静默失败 + 无人值守场景组合，风险在于任务看似成功实则从未执行。

### 10. #98507 · 桌面端 Code 标签页输入框固定单行、不可调整高度
[链接](https://github.com/anthropics/claude-code/issues/98507)
长 prompt 场景下造成明显眼部疲劳，是典型的“桌面端 UI 与 CLI 体验不对齐”问题。

> 补充观察：本期有大量 8 月创建的 Issue 被批量标记 `stale` 并关闭（#83636、#83655、#83663、#83670、#83681、#83682、#84114、#84155、#84161、#84162、#84170、#84185 等），涵盖 cwd 漂移、MCP 会话重建丢失工具调用、worktree 清理在 Windows 上毁坏 NTFS junction、Grep 静默遵循 .gitignore 导致 Agent “盲审”等。这些关闭并非修复，值得后续追踪是否会被重新提起。

---

## 四、重要 PR 进展

本期 24 小时内仅有 2 条 PR 更新，全部列出：

### 1. #96434（OPEN）security-guidance：让被拒文件与密钥文件不出现在审查者视野内
[链接](https://github.com/anthropics/claude-code/pull/96434)
由 `claude[bot]` 提交，修复 #96276。安全审查环节不再把被会话 `Read` deny/ask 规则覆盖的文件，以及 `.env`、密钥、凭据存储等已知敏感文件纳入审查上下文；审查子 Agent 会继承相同的 `disallowed_tools` 且无 shell 权限，并可通过 `SG_SKIP_SECRET_FILES=0` 退出该行为。这是对“Agent 工具链不应扩大密钥暴露面”这一原则的重要落实。

### 2. #19084（CLOSED）fix(ralph-wiggum)：为 stop hook 增加 Windows 兼容性
[链接](https://github.com/anthropics/claude-code/pull/19084)
社区插件 ralph-wiggum 的 stop hook 因 `#!/bin/bash` shebang 在 Windows 上触发 WSL 的 `execvpe(/bin/bash) failed` 报错。PR 通过消除对 bash 路径的硬依赖解决该问题，反映出插件生态的跨平台适配仍是社区自发的补位工作。

---

## 五、功能需求趋势

从本期全部 Issues 中可提炼出以下方向：

1. **身份与账号多路复用**：同一 Connector 多账号（#27302）、组织级 Connector 与路径前缀化 MCP 服务发现（#83681），说明企业/多身份场景已超越“单一登录”假设。
2. **权限与自动化可控性**：分类器可关闭（#100091）、分类器拦截应可回退为提示（#92279）、worktree 隔离下过于保守的 Bash 校验（#84182）。社区希望“自动模式可预测、可覆盖”，而非黑盒拒绝。
3. **跨平台稳定性（尤其 Windows）**：git.exe 孤儿进程（#97752）、worktree 清理毁坏 junction（#84162）、stop hook 的 bash 依赖（#19084）、Google Drive 虚拟盘无法写（#99503）。Windows 已成为缺陷密度最高的平台。
4. **无障碍（a11y）**：屏幕阅读器对斜杠菜单静默（#94353）、粘贴块不可编辑影响听写工作流（#3412），无障碍需求正从“加分项”转为“功能可用性”。
5. **上下文与压缩可靠性**：自动压缩失败但手动 `/compact` 成功（#83682）、压缩请求因 `parsed_output` 字段被 400 拒绝（#84114）。
6. **IDE / 桌面端集成体验**：JetBrains 插件快捷键在 Markdown 预览焦点下失效（#83662）、桌面端输入框不可调高（#98507）、统计面板范围选择器失效（#83678）。
7. **Agent 可观测性**：子 Agent 静默被丢弃的 MCP 工具调用（#83655）、异步子 Agent 流中断却上报 “completed”（#84155）、Agent 视图展示父模型而非覆盖模型（#83663）。新增的 `effort` 参数也说明厂商正在往“可配置的 Agent 行为”方向走。

---

## 六、开发者关注点

- **权限系统的摩擦感已成首要负面情绪来源**。分类器的硬拒绝会直接让自动化会话“死掉”，而缺乏关闭开关进一步放大了挫败感（#92279、#100091）。
- **静默失败最难排查**：邮件通知不发出、MCP 工具调用被丢弃、Grep 因 `.gitignore` 返回 “No files found” 却无法区分“不存在”与“看不见”——开发者反复强调“失败必须是显式的”。
- **跨平台（尤其 Windows）是当前质量短板**，且不少问题涉及资源泄漏与文件系统破坏，属需要优先处理的级别。
- **worktree / 沙箱的清理与 cwd 语义**存在系统性缺陷：cwd 静默回退（#83636）、`/diff` 不传 cwd（#89395）、worktree 无法回收且 Windows 上清理不安全（#84162）。这类问题会直接影响用户对隔离机制安全性的信任。
- **stale 自动关闭策略引发不满**：多个仍在复现的缺陷被批量关闭，用户不得不重开单（#96059），社区对“以关闭换清单整洁”的做法明确表达异议。
- **安全边界在收紧**：#96434 表明官方开始约束审查 Agent 对密钥文件的访问，这与社区对 Agent 权限膨胀的担忧方向一致。

---

*数据来源：github.com/anthropics/claude-code，统计窗口为过去 24 小时（截至 2026-10-07）。本期 PR 新增量极少，仅 2 条，其余条目均为 Issue 侧动态。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-10-07）

> 数据来源：github.com/openai/codex；统计窗口：过去 24 小时。

## 1. 今日速览

过去 24 小时，Codex Rust 分支继续高频发布两个 alpha 版本，但官方 release note 未提供详细 changelog。社区讨论几乎被 Windows 桌面/CLI 的沙箱、审批、浏览器、本地命令执行问题占据；PR 侧则集中修复 Windows 沙箱权限与路径、Unix fd 限制、rollout 加载、TUI 超链接和日志脱敏等底层问题。

## 2. 版本发布

- **[rust-v0.162.0-alpha.17](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.17)**：Release 0.162.0-alpha.17，暂无详细变更说明。
- **[rust-v0.161.0-alpha.13.1](https://github.com/openai/codex/releases/tag/rust-v0.161.0-alpha.13.1)**：Release 0.161.0-alpha.13.1，暂无详细变更说明。

两个版本均为 Rust 分支 alpha，延续近期的快速迭代节奏。

## 3. 社区热点 Issues

1. **[#40060](https://github.com/openai/codex/issues/40060) Windows execpolicy 误报：Start-Process 与无关 URL 同脚本触发策略**  
   27 条评论。安全策略误报会阻断正常 PowerShell 自动化，直接影响 Windows CLI 用户对沙箱/审批逻辑的信任。

2. **[#3761](https://github.com/openai/codex/issues/3761) VS Code 扩展支持拖放非图片文件**  
   26 条评论，57 👍。高赞 enhancement，反映 IDE 内文件交互是强需求，尤其非图片附件工作流。

3. **[#50428](https://github.com/openai/codex/issues/50428) Windows 桌面 durable chat turn/start 与 thread/fork 因 AbsolutePathBuf 缺少 base path 失败**  
   20 条评论。影响 Windows 桌面核心持久会话与分叉能力，属于阻断性工作流问题。

4. **[#42514](https://github.com/openai/codex/issues/42514) Intel Mac（x86_64）缺少 Computer Use 服务**  
   16 条评论，6 👍。平台覆盖缺口，Intel Mac 用户无法使用 Computer Use 和 Locked use。

5. **[#48670](https://github.com/openai/codex/issues/48670) Windows 桌面内置浏览器路由消失、浏览器权限无法验证**  
   13 条评论。Browser Use 在 Windows 上不可靠，影响代理读取和操作网页的能力。

6. **[#41608](https://github.com/openai/codex/issues/41608) codex doctor 对合法分页 rollout 报 rollout_db_parity 警告**  
   11 条评论。诊断工具误报会降低用户对本地健康检查的信任，影响问题排查效率。

7. **[#45167](https://github.com/openai/codex/issues/45167) 子代理自动审查拒绝后无法获得可信用户批准**  
   7 条评论。多代理/审批流程出现死锁，影响 subagent 自动化与人工接管。

8. **[#50799](https://github.com/openai/codex/issues/50799) Windows 桌面在 chrome.dll 清理时发生访问冲突崩溃**  
   6 条评论。嵌入浏览器清理导致崩溃，是桌面端稳定性问题。

9. **[#51496](https://github.com/openai/codex/issues/51496) macOS CLI 0.160.0 长会话进程占用达 66 GiB**  
   1 条评论但影响严重。疑似堆保留/内存泄漏，对长会话开发者风险很高。

10. **[#51494](https://github.com/openai/codex/issues/51494) Codex Desktop 将普通 WinForms 崩溃调试误判为网络安全请求**  
    1 条评论。安全审查误报阻断日常调试，属于开发者体验与策略精度问题。

## 4. 重要 PR 进展

1. **[#51512](https://github.com/openai/codex/pull/51512) Align Windows sandbox temp permissions with the child environment**  
   修复 Windows 临时目录权限可能回退到宿主 `TEMP`/`TMP`，避免只读或拒绝路径被绕过。

2. **[#51511](https://github.com/openai/codex/pull/51511) Fix Windows 10 drive-letter opens for no-follow filesystem operations**  
   修复 Windows 10 下盘符别名被误判为 reparse point，影响 no-follow 文件操作。

3. **[#51510](https://github.com/openai/codex/pull/51510) Preserve live TUI settings when configuration reloads fail**  
   配置重载失败时保留实时 TUI 设置，避免新线程用旧配置覆盖用户偏好。

4. **[#51503](https://github.com/openai/codex/pull/51503) Expose selected environments to MCP contributors**  
   向 MCP 贡献者暴露执行器选择，帮助区分主执行器不可用与次执行器就绪。

5. **[#51502](https://github.com/openai/codex/pull/51502) Bound relay connection attempts and handle pongs during blocked writes**  
   限制中继连接尝试，并在写入阻塞时处理 pong，提升连接重试与心跳鲁棒性。

6. **[#51500](https://github.com/openai/codex/pull/51500) Add shared task pinning to the agent command center**  
   在 agent 命令中心增加共享任务 pinning，支持快捷键与配置绑定，并置顶显示。

7. **[#51499](https://github.com/openai/codex/pull/51499) Load rollout history on a single blocking worker**  
   将 rollout 历史读取与解析移到单个阻塞 worker，支持取消并避免阻塞主流程。

8. **[#51492](https://github.com/openai/codex/pull/51492) Remove obsolete fields from persisted turn context**  
   清理持久化 turn context 中的过时字段，精简协议与 schema。

9. **[#51482](https://github.com/openai/codex/pull/51482) Use PathUri for skill identity and path matching**  
   用 `PathUri` 统一技能身份与路径匹配，处理 Windows 大小写、分隔符差异。

10. **[#51470](https://github.com/openai/codex/pull/51470) Raise managed app-server file descriptor limit on Unix**  
    将托管 app-server 的 Unix soft `RLIMIT_NOFILE` 提升至 4096，缓解 fd 耗尽类问题。

> 同批还有 TUI URL 超链接改进：[#51471](https://github.com/openai/codex/pull/51471)、[#51472](https://github.com/openai/codex/pull/51472)、[#51473](https://github.com/openai/codex/pull/51473)。

## 5. 功能需求趋势

1. **Windows 桌面与沙箱稳定性成为第一优先级**  
   大量问题集中在本地命令挂起、沙箱写入拒绝、权限验证、崩溃、附件读取、模型选择回退等。代表：[#50725](https://github.com/openai/codex/issues/50725)、[#51513](https://github.com/openai/codex/issues/51513)、[#51514](https://github.com/openai/codex/issues/51514)。

2. **IDE 集成与 TUI 交互体验**  
   VS Code 拖放非图片文件是高赞需求；TUI 侧则持续改进 URL 可点击、任务 pinning、配置重载保留。代表：[#3761](https://github.com/openai/codex/issues/3761)、[#51500](https://github.com/openai/codex/pull/51500)。

3. **多代理/子代理与审批控制**  
   社区需要更清晰的 subagent 审批、自动审查拒绝后的用户覆盖、多 agent 任务用量检查点。代表：[#45167](https://github.com/openai/codex/issues/45167)、[#51519](https://github.com/openai/codex/issues/51519)、[#49503](https://github.com/openai/codex/issues/49503)。

4. **浏览器、Computer Use 与 Work 模式可靠性**  
   内置浏览器权限、Intel Mac Computer Use 缺失、Dot 本地 Computer Use、Work 截图/附件等问题持续出现。代表：[#48670](https://github.com/openai/codex/issues/48670)、[#42514](https://github.com/openai/codex/issues/42514)、[#51328](https://github.com/openai/codex/issues/51328)。

5. **性能与资源治理**  
   macOS CLI 高内存占用、Too many open files、Unix app-server fd 限制、rollout 历史加载等成为关注点。代表：[#51496](https://github.com/openai/codex/issues/51496)、[#51520](https://github.com/openai/codex/issues/51520)、[#51470](https://github.com/openai/codex/pull/51470)。

6. **安全/内容策略误报**  
   execpolicy、cybersecurity 审查、content filter 对正常开发任务的误拦截引发讨论。代表：[#40060](https://github.com/openai/codex/issues/40060)、[#51494](https://github.com/openai/codex/issues/51494)、[#50732](https://github.com/openai/codex/issues/50732)。

7. **跨平台兼容性**  
   Linux sandbox socket 权限、Intel Mac、Windows exFAT 外置 SSD、Windows 10 盘符处理等仍需补齐。代表：[#51520](https://github.com/openai/codex/issues/51520)、[#42514](https://github.com/openai/codex/issues/42514)、[#51513](https://github.com/openai/codex/issues/51513)。

8. **用量与限额透明**  
   长多 agent 任务缺少累计用量检查点，用户难以及时发现异常消耗。代表：[#51519](https://github.com/openai/codex/issues/51519)。

## 6. 开发者关注点

1. **Windows 体验仍是最大痛点**  
   从 CLI 到桌面 App，沙箱、审批、浏览器、本地命令执行问题密集出现，建议优先修复阻断性场景。代表：[#40060](https://github.com/openai/codex/issues/40060)、[#50428](https://github.com/openai/codex/issues/50428)、[#50799](https://github.com/openai/codex/issues/50799)。

2. **审批与安全策略需要“精准 + 可覆盖”**  
   误报会直接阻断正常脚本、调试和安全研究类任务，社区希望策略更可解释、更易人工批准。代表：[#40060](https://github.com/openai/codex/issues/40060)、[#51494](https://github.com/openai/codex/issues/51494)、[#45167](https://github.com/openai/codex/issues/45167)。

3. **多代理任务需要用量与状态控制**  
   用户需要累计用量检查点、设备可见性控制，以及 subagent 被拒绝后的可信批准路径。代表：[#51519](https://github.com/openai/codex/issues/51519)、[#49503](https://github.com/openai/codex/issues/49503)。

4. **诊断工具可信度与日志脱敏**  
   `codex doctor` 误报、诊断日志既要可关联又不能泄露 payload，是运维与排障中的高频诉求。代表：[#41608](https://github.com/openai/codex/issues/41608)、[#51483](https://github.com/openai/codex/pull/51483)、[#51467](https://github.com/openai/codex/pull/51467)。

5. **跨平台一致性不足**  
   Linux sandbox、Intel Mac、外置盘/exFAT、Windows 路径与盘符处理等仍存在明显缺口。代表：[#51520](https://github.com/openai/codex/issues/51520)、[#42514](https://github.com/openai/codex/issues/42514)、[#51513](https://github.com/openai/codex/issues/51513)。

6. **开发者体验改进持续被期待**  
   VS Code 拖放文件、TUI 可点击 URL、配置重载保留偏好、任务 pinning 等，都是社区愿意点赞和讨论的实用改进。代表：[#3761](https://github.com/openai/codex/issues/3761)、[#51471](https://github.com/openai/codex/pull/51471)、[#51500](https://github.com/openai/codex/pull/51500)。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报
**日期：2026-10-07** ｜ 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 一、今日速览

1. **v0.63.0 正式版发布**，同时 v0.64.0-preview.0 与最新 nightly 出炉，重点在 A2A Server 设置迁移与 ACP 用量通知桥接。
2. 社区讨论仍高度集中在**子代理（Subagent）可靠性**上：#22323（MAX_TURNS 被误报为 GOAL 成功）与 #21409（Generalist agent 无限挂起）两个 P1 议题合计 21 条评论，是当日最热话题。
3. PR 侧出现一批**沙箱 / IDE 集成 / 会话数据安全**的集中修复，包括 gVisor 网络隔离诊断、容器内 IDE 连接、以及"快速退出导致会话历史被删"的数据丢失修复。

---

## 二、版本发布

### 🚀 v0.63.0（稳定版）
- `fix(cli)`：连接恢复期间显示重试进度指示器，改善弱网体验（[#29468](https://github.com/google-gemini/gemini-cli/pull/29468)）
- 自动生成 Changelog（[#29659](https://github.com/google-gemini/gemini-cli/pull/29659)）

### 🧪 v0.64.0-preview.0（预览版）
- `refactor(a2a-server)`：实现 V1 → V2 设置迁移逻辑（[#29450](https://github.com/google-gemini/gemini-cli/pull/29450)）
- `fix(acp)`：桥接 `PromptResponse.usage` 并发出 `usage_update` 通知（[#29389](https://github.com/google-gemini/gemini-cli/pull/29389)）
- Changelog：[#29656](https://github.com/google-gemini/gemini-cli/pull/29656)

### 🌙 v0.64.0-nightly.20261006.gfb972b2f8
- 日常 nightly 构建，为次日版本（0.65.0-nightly）做版本号准备（[#29657](https://github.com/google-gemini/gemini-cli/pull/29657)）

---

## 三、社区热点 Issues（精选 10 条）

### 1. 🔥 Subagent 达到 MAX_TURNS 却被上报为 GOAL 成功
[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) ｜ P1 / kind/bug ｜ 13 评论 ｜ 👍 2
`codebase_investigator` 子代理在尚未完成任何分析、因达到最大轮次而中断的情况下，仍返回 `status: "success"` 与 `Termination Reason: "GOAL"`。**这是当日评论最多的议题**，直接掩盖了中断事实，会让上层 agent 基于错误前提继续推理，属于状态语义层面的严重缺陷。

### 2. 🔥 Generalist Agent 无限挂起
[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) ｜ P1 / kind/bug ｜ 8 评论 ｜ 👍 8
只要 CLI 把任务委托给 generalist agent，就连"创建文件夹"这种简单操作也会永久卡住（用户等待长达一小时）。**👍 数最高**，说明这是影响面广的阻塞性问题；规避方式是显式禁止模型使用子代理，属于典型的架构级缺陷。

### 3. 零依赖 OS 沙箱 + 执行后意图路由
[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) ｜ P2 / kind/enhancement ｜ 9 评论
提出利用 Gemini 3 模型原生偏好 bash / POSIX 工具链的特性，在**不牺牲安全性与 UX**的前提下让模型自由链式调用 `grep`/`sed`/`awk`。这是"能力释放 vs 安全边界"路线的关键设计提案，评论活跃。

### 4. Gemini 不主动使用 Skills 和子代理
[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) ｜ P2 / kind/bug ｜ 7 评论
用户反馈除非显式指令，模型几乎从不主动调用自定义 skill 与子代理，即使任务高度相关（如已配置的 gradle、git skill）。**这直接指向 skill 描述的可发现性/触发机制问题**，是扩展生态的核心体验痛点。

### 5. AST 感知的文件读取、搜索与代码库映射（EPIC）
[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) ｜ P2 / kind/feature ｜ 7 评论
探讨引入 AST 感知能力以精确读取方法边界、减少错位读取轮次与 token 噪声。配套子议题还有 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)（CLI 工具映射代码库）与 [#22747](https://github.com/google-gemini/gemini-cli/issues/22747)（AST-grep 搜索）。代表团队对**"上下文效率"**的系统性投入方向。

### 6. Browser Agent 忽略 settings.json 覆盖配置
[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) ｜ P2 / kind/bug ｜ 4 评论
虽然 `AgentRegistry` 正确合并了配置，Browser Agent 却完全忽略全局/项目级 `settings.json` 中的 `maxTurns` 等覆盖项。**配置生效链路断裂**，对依赖精细调参的用户是硬伤。

### 7. Browser 子代理在 Wayland 下失败
[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) ｜ P1 / kind/bug ｜ 4 评论
Wayland 环境下 browser subagent 报 `Termination Reason: GOAL` 但实际未完成。与 #22323 呼应，进一步说明**终止原因语义不可信**已是跨平台共性问题。

### 8. Agent 应抑制破坏性操作
[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) ｜ P2 ｜ 3 评论 ｜ 👍 1
模型在复杂 git 操作中会使用 `git reset` 或 `--force`，而更安全的替代方案其实存在；维护 DB 等资源时也缺乏风险意识。属于**安全护栏**类高优先级诉求。

### 9. 工具数量超过 128 个时触发 400 错误
[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) ｜ P2 / kind/bug ｜ 3 评论
启用工具过多（报告中提到 >400 时更明显）会导致 API 400。用户期望 agent 能智能收敛工具范围。**直接影响 MCP/扩展重度用户**。

### 10. `get-shit-done` 输出钩子导致 CLI 崩溃
[#22186](https://github.com/google-gemini/gemini-cli/issues/22186) ｜ P1 / kind/bug ｜ 3 评论
输出摘要即将完成时反复崩溃，属可复现的稳定性问题，对 hook 机制推广有负面影响。

> 其他值得留意的长期议题：子代理轨迹共享 [#22598](https://github.com/google-gemini/gemini-cli/issues/22598)、本地代理后台化（Ctrl+B）[#22741](https://github.com/google-gemini/gemini-cli/issues/22741)、`~/.gemini/agents` 软链不识别 [#20079](https://github.com/google-gemini/gemini-cli/issues/20079)。

---

## 四、重要 PR 进展（精选 10 条）

### 1. 阻断 OAuth 无限验证/重试循环
[#29655](https://github.com/google-gemini/gemini-cli/pull/29655) ｜ P2 / area/core
用户完成浏览器认证并在 CLI 回车后，仍可能陷入无休止的浏览器验证与 OAuth 提示循环。该 PR 为验证重试设置上界（`retry.ts`），**直击登录流程卡死**这一高频投诉。

### 2. gVisor 沙箱网络隔离错误显式化
[#29665](https://github.com/google-gemini/gemini-cli/pull/29665) ｜ P2 / area/extensions
在 `runsc` 沙箱中 IDE 连接因回环被阻断时，此前只提示用户执行 `/ide install`（误导）。新逻辑给出明确的沙箱网络隔离诊断，**大幅降低排障成本**。

### 3. 修复沙箱容器内 IDE 连接（认证转发 + Host 头）
[#29653](https://github.com/google-gemini/gemini-cli/pull/29653) ｜ P1 / area/core
当 CLI 运行在 `docker|podman|runsc|lxc` 沙箱中时，`/ide status`、`/ide enable`、原生 diff 均不可用。该 PR 转发 IDE auth token 并接受容器 Host 头，恢复完整 IDE 集成能力。

### 4. 会话历史数据丢失修复（快速退出场景）
[#29584](https://github.com/google-gemini/gemini-cli/pull/29584) ｜ P1 / area/core
恢复会话后若在提交提示前用 `Ctrl+C` / `/exit` 退出，会**永久删除该会话的历史文件**。属关键数据安全修复，已定位两个根因。

### 5. 恢复会话时避免重复的工具响应轮次
[#29618](https://github.com/google-gemini/gemini-cli/pull/29618) ｜ P1 / area/core
`convertSessionToClientHistory` 在重建历史时会重放已记录的 `functionResponse` 轮次，导致请求内容重复。与会话恢复正确性强相关。

### 6. 强制"请求以有效用户轮次收尾"的协议不变量
[#29612](https://github.com/google-gemini/gemini-cli/pull/29612) ｜ area/agent（size/xl）
确保发往 `generateContentStream` 的对话历史始终以含非空内容 part 的用户轮次结束。此前 `/rewind`、流中断等操作会破坏该不变量，**可能引发偶发 API 报错**。

### 7. OAuth 回调 `iss` 参数校验对齐 RFC 9207
[#29616](https://github.com/google-gemini/gemini-cli/pull/29616) ｜ P1 / area/security
按 RFC 9207 与 MCP 授权规范，仅在认证服务器元数据声明支持时才强制要求回调中的 `iss` 参数，修正过严校验导致的兼容问题。

### 8. 修复 Ctrl+O 展开时的终端清屏与滚动重置
[#29640](https://github.com/google-gemini/gemini-cli/pull/29640) ｜ P2 / area/core
展开被截断输出时，Terminator 等 VTE 系终端会闪黑或跳回滚动缓冲顶部。对 `/plan` 模式长输出体验改善明显。

### 9. 重新选择 Google 登录时清除缓存凭证
[#29643](https://github.com/google-gemini/gemini-cli/pull/29643) ｜ area/cli
此前 `AuthDialog` 只在特定条件下清理凭证，导致用户无法切换 Google 账号。修复后可在重新认证时摆脱陈旧 token。

### 10. `fetchJson` 健壮性提升（扩展元数据请求）
[#29658](https://github.com/google-gemini/gemini-cli/pull/29658) ｜ P2 / area/extensions
为 GitHub 扩展元数据请求包裹 JSON 解析错误处理、响应流失败处理，并排空非成功响应体，**避免扩展市场偶发崩溃**。

> 依赖维护方面：Dependabot 一次性提交 74 项 npm 依赖升级（含 `@modelcontextprotocol/sdk` 1.23.0 → 1.31.0）[#29664](https://github.com/google-gemini/gemini-cli/pull/29664)；另有 `qs` 升级 PR [#29168](https://github.com/google-gemini/gemini-cli/pull/29168) 仍在挂起。

---

## 五、功能需求趋势

从本期 49 条 Issue 的标签与内容看，社区关注点集中在以下方向：

| 方向 | 代表议题 | 说明 |
|---|---|---|
| **子代理可观测性与可靠性** | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)、[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)、[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)、[#20195](https://github.com/google-gemini/gemini-cli/issues/20195) | 终止原因语义、bug 报告需含子代理上下文、轨迹可通过 `/chat share` 分享 |
| **沙箱与安全执行** | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)、[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | 零依赖 OS 沙箱、危险命令防护、意图路由 |
| **上下文与 Token 效率** | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)、[#18836](https://github.com/google-gemini/gemini-cli/issues/18836) | AST 感知读写、Tactful Extraction 外科式读取、持久化任务跟踪替代 WriteToDo |
| **Agent 自主调度能力** | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)、[#21432](https://github.com/google-gemini/gemini-cli/issues/21432) | 主动调用 skill/子代理、对自身 CLI 参数与热键的"自我认知" |
| **并行与后台执行** | [#22741](https://github.com/google-gemini/gemini-cli/issues/22741)、[#18287](https://github.com/google-gemini/gemini-cli/issues/18287) | Ctrl+B 后台化本地子代理、共享内存与并行子代理协作（后者被阻塞） |
| **终端 UI 与性能** | [#21924](https://github.com/google-gemini/gemini-cli/issues/21924) | 终端 resize 无闪烁，需迁移至 RenderStatic + 小批量更新 |
| **评估体系稳定性** | [#23313](https://github.com/google-gemini/gemini-cli/issues/23313)、[#23166](https://github.com/google-gemini/gemini-cli/issues/23166) | steering eval 需稳定通过、内部项目评估可信度提升 |
| **策略与权限粒度** | [#18397](https://github.com/google-gemini/gemini-cli/issues/18397) | 按工作区而非全局管理策略 |

---

## 六、开发者关注点

1. **状态可信度是第一优先级。** 子代理把中断谎报为成功（#22323）、Wayland 下同样报 GOAL 却失败（#21983），加上 generalist agent 无提示挂死（#21409），共同说明**执行结果的语义层需要重构**——否则上层编排无法做正确决策。
2. **配置文件一致性存在裂缝。** Browser Agent 完全无视 `settings.json`（#22267），这类"文档说支持、实际不生效"的问题最消耗用户信任。
3. **平台与运行时兼容性成本高。** Wayland、gVisor、Docker/Podman/LXC 沙箱、VTE 系终端各有专属故障，且错误信息普遍不具指向性——本期两个 PR（#29665、#29653）正是对这一痛点的回应。
4. **安全与能力释放需重新平衡。** 一边是模型会对 git 使用 `--force`/`reset`（#22672），另一边是社区希望放开 bash 链式能力（#19873）；如何用沙箱而非限制来同时满足两者，是核心设计命题。
5. **扩展生态的可发现性不足。** Skills 与子代理"配了但不用"（#21968）会直接削弱扩展投入的回报，需要更主动的触发与推荐机制。
6. **会话与凭证的持久化可靠性。** 快速退出删档（#29584）、恢复会话重复轮次（#29618）、OAuth 死循环（#29655）集中出现在同一个 24 小时窗口，值得作为一条完整的可靠性专项来跟踪。

---
*本日报基于 2026-10-06 至 2026-10-07 的 GitHub 公开数据自动整理，Issue 标题与标签均保留原文语义。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期：2026-10-07**  
**数据来源：github.com/esengine/DeepSeek-Reasonix**

---

## 1. 今日速览

DeepSeek Reasonix 发布 v2.29.0 与 Studio v2.29.0，重点优化大量插件技能下的列表与状态读取性能，修复压缩摘要截断和重试超窗口问题，并新增远程机器开关、主题装饰色及终端 `/resume <n>`、`/quit` 命令。社区围绕上下文压缩准确性、多会话并发渲染性能、MCP 协议完整性和 WSL 原生支持展开讨论，多个相关修复 PR 已关闭。

---

## 2. 版本发布

### v2.29.0 / studio-v2.29.0

- **性能提升**：装有大量插件技能时，列表、开窗和状态读取明显变快。
- **问题修复**：修复压缩摘要被掐断、重试超窗口的问题；修复停止后计划卡住、暂停队列里发消息失败重复的问题。
- **新增功能**：
  - 远程机器每行新增两个开关：停止连接该机器、不在侧栏里列出它；被停止连接的机器不会再被拨号。
  - 主题包可单独设置链接、品牌色、悬停光晕和代理名称的颜色，默认外观不变。
  - 终端界面新增 `/resume <n>` 和 `/quit` 命令。

**链接**：https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.29.0

---

## 3. 社区热点 Issues

1. **#12240 MCP 协议支持不完整**  
   用户反馈 MCP 协议中提示词应由 agent 注入并提供 UI 视图，但当前 LLM 看不见入口点，功能不完整。3 条评论，关注度较高。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12240

2. **#12228 远程会话无法在桌面关闭后存活**  
   关闭 Studio 桌面会终止其启动的 `reasonix serve`，导致远程会话中断。2 条评论，已由 PR #12229 修复。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12228

3. **#12054 压缩阈值后上下文错乱**  
   达到压缩阈值后，已处理内容会再次处理，前后顺序错乱。2 条评论，影响 Agent 准确性。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12054

4. **#12119 压缩后会话长度估计不准**  
   压缩后本地估算不准确，影响折叠触发。2 条评论，已由 PR #12222 修复。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12119

5. **#12232 多会话并发渲染冻结**  
   Windows 下多会话流式输出时，渲染进程被高频重渲染占满，界面部分冻结并误报“内核繁忙”。严重性能问题，已由 PR #12237 部分修复。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12232

6. **#12221 Windows 原生支持 WSL 作为 Agent 执行环境**  
   用户希望 Studio 运行在 Windows，而 Agent Shell 在 WSL 中执行。1 条评论，并触发 RFC #12225。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12221

7. **#12218 会话列表完成提示不清晰**  
   多个会话并行时，无法知道哪个会话已完成且有未查看内容。1 条评论，已触发 RFC #12230 和 PR #12233。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12218

8. **#12230 RFC: 持久化“已完成未查看”标记**  
   为侧栏、折叠项目和标签页增加未读状态，内核已持久化 `finished_at`/`viewed_at`。已有 PR 实现。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12230

9. **#12219 打开反馈页面 GPU 占用 100%**  
   反馈对话框的背景模糊滤镜导致 GPU 满载，关闭后恢复正常。已由 PR #12220 修复。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12219

10. **#12238 思考协议与工具调用不兼容**  
    端点要求回传助手思考内容但连接未声明思考协议，导致请求被拒。涉及模型服务端兼容性。  
    https://github.com/esengine/DeepSeek-Reasonix/issues/12238

---

## 4. 重要 PR 进展

1. **#12241 fix(control): attribute a failed MCP prompt fetch and tell the model about it**  
   修复 MCP 提示词获取失败时错误信息不明确的问题，并告知模型。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12241

2. **#12233 feat(studio): mark sessions that finished unseen in the sidebar and tabs**  
   在侧栏和标签页标记已完成但未查看的会话，改善多会话管理。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12233

3. **#12239 fix(attachments): say why an attachment was refused, with a code per class**  
   附件被拒时给出具体原因和错误码，替代模糊提示。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12239

4. **#12237 perf(studio): stop panes behind another from redrawing at stream rate**  
   停止后台窗格按流式速率重绘，解决多会话卡顿。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12237

5. **#12231 feat(session): persist a finished-but-unviewed mark per session**  
   内核持久化每个会话的“完成未查看”标记，为前端提供数据。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12231

6. **#12229 fix(remote): attach to a running serve instead of replacing it**  
   修复远程引导逻辑，附加到已运行的 serve 而非替换，解决 #12228。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12229

7. **#12222 fix(compaction): let the provider's last reported prompt size trigger a fold when the local estimate runs low**  
   使用提供商报告的提示大小触发折叠，解决压缩长度估计不准。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12222

8. **#12220 fix(desktop): drop the feedback veil's backdrop blur so an open dialog does not pin the GPU**  
   移除反馈对话框背景模糊，解决 GPU 100% 占用。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12220

9. **#12217 fix(tui): Ctrl+N and Ctrl+P move through the completion menu and resume picker**  
   为 TUI 补全菜单和恢复选择器恢复 Ctrl+N/Ctrl+P 导航。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12217

10. **#12203 fix(studio): put the rail switch with the row's details, and drop turned-off machines**  
    调整远程机器开关布局，关闭的机器不再出现在侧栏。  
    https://github.com/esengine/DeepSeek-Reasonix/pull/12203

---

## 5. 功能需求趋势

从近期 Issues 与 PR 中可提炼出以下社区重点关注方向：

- **远程与分布式执行**：远程 serve 生命周期管理、远程机器开关、WSL 作为 Agent 执行环境。
- **性能与渲染优化**：多会话并发渲染、GPU 占用、插件技能列表加载速度。
- **上下文压缩与内存管理**：压缩准确性、长度估计、折叠触发机制。
- **MCP 协议完整性**：提示词、资源、工具的完整支持，尤其是 UI 入口。
- **会话状态管理**：完成未查看标记、状态提示、多会话协作追踪。
- **终端体验**：快捷键一致性、命令补全、`/resume`、`/quit` 等。
- **跨平台集成**：Windows + WSL 混合运行。
- **安全与错误处理**：provider 探测错误信息泄露、附件拒绝原因明确。

---

## 6. 开发者关注点

- 压缩后上下文错乱和长度估计不准，影响 Agent 长期运行的可靠性。
- 多会话并发时界面卡顿、冻结和 GPU 高占用，降低工作效率。
- 远程会话无法脱离桌面独立存活，限制远程开发场景。
- MCP 功能不完整，特别是提示词注入和 UI 入口缺失。
- Windows 用户强烈希望原生支持 WSL 作为执行环境。
- 会话完成状态不清晰，多任务并行时难以追踪。
- 附件类型（如 `.ico`）被拒时提示模糊。
- 思考协议与工具调用不兼容导致请求失败，需要更明确的配置指引。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 · 2026-10-07

> 数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览

今天最醒目的信号是**桌面端与 WSL 集成问题开始被正面处理**——PR #53628 直接针对 Issue #52205 的 UNC 路径崩溃给出了修复，配套的磁盘膨胀问题（#53617）也有了清理 PR。与此同时，核心团队集中推进了**凭据与外部集成的体系化重构**（Bedrock、外部凭据引用、集成表单），显示 OpenCode 正在从"编码助手"向"多供应商接入平台"扩张。长期高热的剪贴板 Bug（#4283，137 评论 / 130 👍）依旧未关闭，仍是社区最焦虑的未解问题。

---

## 2. 版本发布

### v1.18.35

**Core · 改进**
- 新增 canonical redirects，并为 agent 可读的统计数据引入 JSON 与 Markdown 数据格式，方便自动化消费统计结果。

**Core · 修复**
- xAI 工具调用结果现在会携带受支持的图片，不受支持的图片格式将被跳过。（@Jaaneek）

**致谢社区贡献者（共 3 位）**
- @dc85：`docs(web)` 文档改进

> 版本号为补丁级迭代，无破坏性变更，重点在统计可编程性与 xAI 多模态兼容性。

---

## 3. 社区热点 Issues

按"社区热度 + 影响范围 + 是否长期未解"综合挑选。

### ① #4283 复制到剪贴板失效（OPEN，137 评论 / 130 👍）
**[链接](https://github.com/anomalyco/opencode/issues/4283)**
社区情绪最强的一条 Issue，自 2025-11 创建至今已近一年未关闭。用户选中回复文本后无法复制，属于**基础交互可用性**问题，130 个 👍 说明这是普遍性痛点而非个例。长期悬而未决正在累积用户不满，建议核心团队优先给出明确排期。

### ② #52205 Windows 桌面端向 Linux 服务端传递 WSL UNC 路径，导致 HTTP 500 与启动崩溃（OPEN）
**[链接](https://github.com/anomalyco/opencode/issues/52205)**
Windows 11 桌面端连接 WSL2 内的 v2 服务端时，原生文件夹选择器返回 `\\wsl.localhost\...` 形式的 UNC 路径，服务端无法解析并持续崩溃。这是**跨平台混合开发场景的阻断级 Bug**，且在今日已有对应修复 PR（#53628），值得关注合并进展。

### ③ #51949 自动压缩后，agent 彻底放弃顶层工具（OPEN）
**[链接](https://github.com/anomalyco/opencode/issues/51949)**
自动上下文压缩后，agent 不再调用任何 top-level 工具，转而全部走 code mode（`execute` → `tools.shell`）并失败，最终向用户声称自己的工具"未注册"。这类问题**直接摧毁长会话的可靠性**，且症状带有误导性（agent 的错误自我诊断），调试成本高。

### ④ #24760 输入时鼠标滚轮只滚动输入历史，而非整个聊天视图（CLOSED，5 评论）
**[链接](https://github.com/anomalyco/opencode/issues/24760)**
已关闭。聚焦输入框时鼠标滚轮作用域错误，是典型的**焦点/事件冒泡层级问题**，影响阅读长对话的流畅度。关闭意味着已有对应处理，可作为 TUI 交互修复节奏的参考样本。

### ⑤ #53632 TUI：Unicode 文本在 Herdr/tmux 重绘时留下残字符（OPEN）
**[链接](https://github.com/anomalyco/opencode/issues/53632)**
从 Unicode 内容切换到 ASCII diff 后，旧字符残留在主视图与右侧边栏中；作者已给出合成复现（tmux 内层干净、Herdr 保留旧文本）。这类**终端渲染状态管理缺陷**在多路复用器环境下极易被放大，是 TUI 项目的经典难题。

### ⑥ #53617 桌面端从不清理旧版 CLI 二进制，每次更新膨胀约 175 MB（OPEN）
**[链接](https://github.com/anomalyco/opencode/issues/53617)**
Desktop 每次 CLI 版本变更都会把完整 CLI 拷贝到 `cli/<version>/`，但清理逻辑被 development-only 开关挡住，在打包构建中永不执行。**磁盘占用无上限增长**，属于典型的"只在生产环境暴露"的工程债，已有 PR #53618 修复。

### ⑦ #53623 "Code Mode" 提示词让 Gemma-4-31B 陷入困惑（OPEN）
**[链接](https://github.com/anomalyco/opencode/issues/53623)**
小参数模型在每个新会话中都误以为"所有工具都必须通过 execute 调用"。作者提出两点诉求：优化提示词表达，以及**提供调试/修改提示词的能力**——后者是社区反复出现的基础设施级需求。

### ⑧ #50884 Vertex Anthropic HTTP 429 不产生任何 provider 事件（OPEN）
**[链接](https://github.com/anomalyco/opencode/issues/50884)**
配置欧盟多区域的 `@ai-sdk/google-vertex/anthropic` provider 后，429 限流既不冒泡为 provider 事件、也无重试反馈，用户侧表现为静默失败。**可观测性缺失**在自定义 provider 场景中尤其危险。

### ⑨ #50880 桌面端聊天中的文件卡片对子目录文件 404（OPEN）
**[链接](https://github.com/anomalyco/opencode/issues/50880)**
客户端只发送文件名（如 `GET /api/fs/read/start.cmd`），服务端以用户主目录为基准解析相对路径，导致所有非主目录直属文件都报 "File not found"。**前后端路径契约不一致**，影响面覆盖所有深层目录文件。

### ⑩ #53616 `opencode mcp auth` 在插件托管认证下报 `client_id may not be blank`（OPEN）
**[链接](https://github.com/anomalyco/opencode/issues/53616)**
浏览器授权完成后命令仍失败，而服务端其实已连接成功（`mcp list` 显示 ✓），提示信息也自相矛盾地宣称"已有有效凭据"。**插件化认证与 CLI 状态同步脱节**，是 MCP 生态扩张期的典型集成裂缝。

> 其他值得留意：#53631（Linux 桌面端 Toggle Sidebar 仍不可用，已关闭）、#53205 系列 WSL 链路、#53331/#53629（转录导航增强）——后者正在 PR 侧推进。

---

## 4. 重要 PR 进展

### ① #53603 `fix(ai): drop empty unfinished reasoning items on replay`（OPEN，@rekram1-node）
**[链接](https://github.com/anomalyco/opencode/pull/53603)**
修复 #48319。Responses 流在 `response.output_item.added` 时就把空的 `reasoning.started`（`text: ""`）持久化，导致重放时出现无内容的推理项。属于**会话状态持久化的正确性修复**。

### ② #53628 `fix(app): only treat the builtin sidecar as local`（OPEN，@Embiggenerd）
**[链接](https://github.com/anomalyco/opencode/pull/53628)**
关闭 #52205。让**只有桌面应用自建的 sidecar 服务**走原生文件选择器，避免把 WSL UNC 路径传给 Linux 服务端。WSL 用户的阻断级修复。

### ③ #53618 `fix(desktop): prune stale CLI stages in packaged builds`（OPEN，@nedu-m）
**[链接](https://github.com/anomalyco/opencode/pull/53618)**
关闭 #53617。把 `cleanStages` 从开发态开关中解放出来，使其在打包构建中真正执行。**直接解决磁盘无限膨胀**。

### ④ #53305 `feat(app): preview Word, Excel and PowerPoint files`（OPEN，@Hona）
**[链接](https://github.com/anomalyco/opencode/pull/53305)**
为 `.docx` / `.xlsx` / `.pptx` 提供只读预览，以内置 GUI 扩展 `microsoft-office` 形式接入（基于 BetterOffice，Rust 引擎编译为 WASM，独立线程运行）。**显著拓宽"文件视图"的能力边界**。

### ⑤ #53626 `feat(core): add Bedrock credential setup`（OPEN，@rekram1-node）
**[链接](https://github.com/anomalyco/opencode/pull/53626)**
支持 Bedrock API Key、显式 AWS Profile（SSO/命名 Profile）以及直连 Access Key/Secret/Session Token 三种方式，并能发现服务端 AWS 配置中的 Profile 名称与来源路径。**企业级云供应商接入的关键一步**。

### ⑥ #53624 `feat(core): add external credential references`（OPEN，@rekram1-node）
**[链接](https://github.com/anomalyco/opencode/pull/53624)**
引入通用 `external` 凭据值（含 method ID 与元数据），不伪造 Key 或 OAuth Token；元数据作为 provider settings 传递而非请求体数据。**为"不落盘密钥"的凭据架构打地基**。

### ⑦ #53625 `feat(integration): improve connection forms and setup`（OPEN，@rekram1-node）
**[链接](https://github.com/anomalyco/opencode/pull/53625)**
新增表单式集成连接方式，校验答案并存储实现返回的 Key 或外部引用，且不需要走 OAuth 或命令尝试；打通 Core / Effect 插件 / Protocol / Server / TUI / web-desktop 全链路。与 #53624 构成一组**集成框架重构**。

### ⑧ #53333 `feat(tui): navigate the transcript by prompt, landmark and block`（OPEN，@Nowaker）
**[链接](https://github.com/anomalyco/opencode/pull/53333)**
关闭 #53331。为转录视图加入三级导航（prompt / landmark / block），并补上 `ctrl+home` / `ctrl+end`。**长会话导航体验的系统性增强**。

### ⑨ #53630 `feat(tui): return to the scrolled-up position on messages_first`（OPEN，@Nowaker）
**[链接](https://github.com/anomalyco/opencode/pull/53630)**
关闭 #53629。基于 #53333 堆叠实现：跳到底部后返回时，回到用户上次停留的滚动位置，而非强制归位。典型的**"小改动、高感知"体验优化**。

### ⑩ #47641 `fix(opencode): stop retrying when the provider asks to wait for hours`（CLOSED，@ApexMene）
**[链接](https://github.com/anomalyco/opencode/pull/47641)**
`SessionRetry.delay()` 原样采用 provider 返回的 `retry-after`，仅以 `RETRY_MAX_DELAY`（约 24.8 天）封顶，导致会话假死。该 PR 为该行为加上合理上界。**修复了极端但真实的"静默挂起"场景**。

> 另有归属 `automated-pr-cleanup` 的批量关闭 PR（#47666 / #47657 / #47648 / #47640 等），以及 @dc85 的 Exo Free 文档系列（#53619–#53622），体现维护者在定期清理积压。

---

## 5. 功能需求趋势

从本批 Issues 与 PR 中可以提炼出六条主线：

| 方向 | 代表条目 | 信号强度 |
|---|---|---|
| **TUI / 终端交互体验**（滚动、导航、重绘、多路复用器兼容） | #24760、#53629、#53331、#53632 | ★★★★★ 用户自建 PR 最多，说明核心用户黏性高、愿意贡献 |
| **桌面端跨平台稳定性**（Windows/WSL、Linux 菜单、路径处理） | #52205、#53631、#50880、#53617 | ★★★★★ 阻断级问题集中，平台差异是主要来源 |
| **凭据与集成框架**（Bedrock、外部凭据引用、MCP Auth） | #53624、#53625、#53626、#53616 | ★★★★☆ 核心团队主导，属于战略性投入 |
| **多模型 / 多供应商支持**（xAI 图像、Vertex、Exo Free、Gemma） | v1.18.35、#50884、#53623 | ★★★★☆ 供应商矩阵持续扩张，但兼容性与可观测性跟不上 |
| **Agent 长期会话可靠性**（上下文压缩、工具可见性、提示词可控） | #51949、#53623 | ★★★★☆ 痛点深、复现难，呼声在上升 |
| **文档与文件预览能力**（Office、PDF、文本抽取） | #53305、#47640 | ★★★☆☆ 从"代码文件"扩展到"办公文档" |

---

## 6. 开发者关注点

**1. 基础交互的"最后一公里"仍未打通**
剪贴板（#4283）这条 137 评论、130 👍 的 Issue 已存在近一年。它不涉及架构，却直接影响每一次使用——开发者对"基础功能长期悬空"的容忍度正在下降。

**2. 平台差异是 Bug 的主要来源**
WSL UNC 路径、Linux 无原生菜单、Windows 路径解析——桌面端问题几乎全部源于平台假设未统一。建议在路径与菜单层引入统一的抽象层，而非逐例修补。

**3. 错误的"沉默"比错误本身更昂贵**
#50884 的 429 无事件、#51949 的 agent 自称"工具未注册"、#53616 的自相矛盾提示，都属于**可观测性失效**。开发者需要的是明确的失败原因，而不是需要靠外部工具反推的黑盒行为。

**4. 提示词需要可调试**
#53623 在指出 Gemma-4-31B 被 Code Mode 提示词误导的同时，明确要求"一种调试和修改提示词的途径"。这已不是单次反馈，而是**平台化诉求**：在不同能力档位的模型上，提示词必须可观测、可覆盖。

**5. 磁盘与资源治理进入视野**
#53617 的 175 MB/次更新是信号：随着桌面端把完整 CLI 打包分发，**安装体积与残留清理**将成为持续性问题，值得纳入发布检查清单。

**6. 认证链路的复杂度正在外溢**
从 MCP 插件托管认证（#53616）到 Bedrock 的多种凭据形态（#53626）与外部凭据引用（#53624），认证已从"填个 Key"变成一个小型子系统。开发者需要一致的心智模型，否则每接一个新供应商都是一次新的踩坑。

---

*日报生成时间：2026-10-07 · 数据窗口：过去 24 小时*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 · 2026-10-07

数据来源：github.com/NousResearch/hermes-agent

---

## 1. 今日速览

今天社区焦点高度集中在** macOS Desktop 更新链路**与**会话/压缩状态机**两条线上：3 个 P1 级 Bug（#133992、#134239，以及跨会话状态相关的 #134008）同时活跃，Desktop 更新在 pre-flight、锁文件、state.db 快照上连续出现多点故障。PR 侧最紧急的是 #134242——它修复了让 `main` 与所有开放 PR 的 CI（`Python tests / e2e-upgrade`）持续飘红的 `gpu_class` 导入崩溃。此外，社区对仓库机器人/评审流水线"静默并遗忘"的抱怨（#134008）获得了今日唯一的点赞，反映出贡献者体验问题正在累积。

---

## 2. 版本发布

过去 24 小时无新 Release，略。

---

## 3. 社区热点 Issues（10 条）

**1. #134239 [P1] 新回合派发绕过压缩在途守卫，导致二次压缩基于未提交快照并提交（5.5 分钟卡死 + 双重压缩）**
https://github.com/NousResearch/hermes-agent/issues/134239
今日新增的 P1 缺陷，描述了压缩守卫的第二个缺口：第一条压缩尚未完成时，新消息派发路径未检查守卫，导致从 pre-commit 快照发起第二次压缩，最终 transcript 被"总结的总结"（352→48→64），会话阻塞约 5.5 分钟无回复。这是典型的会话状态一致性问题，且已有对应修复 PR（#134244）在跑，值得重点跟踪。社区反应：暂无评论（新提交）。

**2. #133992 [P1] macOS Desktop 更新交接拒绝自己的 `hermes update`（custodian + 秒级 delegate）**
https://github.com/NousResearch/hermes-agent/issues/133992
#78119 / #87514 的回归：Desktop 的 Update 按钮触发的更新被自己持有的锁拒绝（"Another Hermes update is already running"），退出码 2。这是 macOS 用户升级路径的直接阻断，属于发布级阻断问题。社区反应：4 条评论，仍无 👍，说明问题真实但受众较窄。

**3. #108215 [P2] macOS daemon 重启后 `computer_use` 永久卡死：MCPError(CONNECTION_CLOSED) 未被识别为会话关闭且不重连**
https://github.com/NousResearch/hermes-agent/issues/108215
持续近一个月的"长寿"Bug，今天的更新带来 8 条评论——是本期讨论最热的 Issue。问题本质是 MCP stdio 桥子进程随 cua-driver daemon 一起死亡后没有重连逻辑，后续每次 `computer_use` 调用即时失败。对依赖桌面自动化的用户来说，这是不可恢复的会话级故障。社区反应：8 条评论，开发者讨论活跃。

**4. #134008 [feature/P3/needs-decision] 仓库机器人处理与评审流水线的严重问题：静默并被遗忘**
https://github.com/NousResearch/hermes-agent/issues/134008
贡献者 @eabase 指出，多个已通过优秀贡献者批准（approved）的 OS/UX 修复卡在 review 反馈循环中，等真正评审通过时 PR 已严重过时。这是**流程/治理类**问题而非代码 Bug，但它直接影响所有其他 Issue/PR 的流转效率。社区反应：6 条评论 + 1 👍（本期唯一点赞），说明共鸣度最高。

**5. #117818 [security/P3] 加固缺口：写审批覆盖了 memory/skills 工具，但不覆盖 `write_file`/`patch`，而豁免注释却声称覆盖**
https://github.com/NousResearch/hermes-agent/issues/117818
`tools/file_tools_write_guards.py` 对 Hermes 自身 home 目录做了豁免，注释声称由 config/memory 审批兜底，但实际 `write_file`/`patch` 并未被覆盖。属于"文档承诺大于代码实现"的安全边界问题（提交者明确说明不是私密漏洞）。社区反应：4 条评论。

**6. #124972 [P2] Desktop 更新 state.db pre-flight 在解析后的 Python 中超时（spawnSync ETIMEDOUT）on macOS**
https://github.com/NousResearch/hermes-agent/issues/124972
更新流程在后端关闭**之前**就失败：`state.db` 预检 Python 探针阻塞到 Electron 的同步 spawn 触发超时。与 #133992、#128605 共同构成"macOS Desktop 更新三连坑"。社区反应：3 条评论。

**7. #128605 [P2] Desktop 更新 pre-flight 的 state.db 应急快照固定 30s 上限，数据库一大就永久锁死更新（CLI 路径跳过 >1GB）**
https://github.com/NousResearch/hermes-agent/issues/128605
`execFileSync` 硬编码 30 秒超时，而 1.49 GB 的 state.db 复制需要约 30 秒，导致 Desktop 更新按钮永久失败，CLI 路径反而有 >1GB 跳过逻辑。属于典型的"同步阻塞 + 魔法数字"隐患，对长期用户影响大。社区反应：1 条评论。

**8. #134128 [P3] Dashboard OAuth 登录失败：token 响应为 gzip 编码时报"incorrect header check"（HTTP 503）**
https://github.com/NousResearch/hermes-agent/issues/134128
Portal 回调后 token 端点有响应，但 Hermes 解压 body 时报 `Error -3 while decompressing data: incorrect header check`，对外返回 503 "Provider unreachable"。表面是登录失败，实际是 HTTP 客户端未正确处理 Content-Encoding，容易误导排障方向。社区反应：2 条评论。

**9. #124289 [P2] 命名自定义 provider 的 `extra_body` 在 `/model --provider <name>` 与裸名 fallback 条目上被丢弃，并泄漏到下一个 fallback**
https://github.com/NousResearch/hermes-agent/issues/124289
`_custom_provider_extra_body_for_agent` / `_apply_switched_provider_request_overrides` / `_rescope_fallback_extra_body` 三个函数构成的覆盖逻辑不完整：不仅丢配置，还会**污染后续 fallback 请求**——这是跨 provider 的隐性行为污染，排查成本高。社区反应：2 条评论。

**10. #134240 [P3] 插件注册的 skill 在 `hermes skills list`、`GET /api/skills`、`GET /api/skills/content` 中缺失**
https://github.com/NousResearch/hermes-agent/issues/134240
通过 `ctx.register_skill()` 注册的 skill 能被 `skill_view("plugin:skill")` 正常加载、也出现在 agent 的 `skills_list` 工具里，但对 CLI 与 Dashboard API 不可见。属于**插件生态的一致性问题**：插件作者能跑通 agent 侧，却无法在管理界面看到自己的 skill。社区反应：0 条评论（新提交）。

> 其他值得留意但未入榜：#134243（`computer_use.no_overlay: false` 在标准权限模式下静默失效，而 wrapper docstring 还推荐该设置）、#119641（`memory.write_approval: false` 的文档与后台复核实际行为不符）、#83371（Windows 下对话内容显示完成后标题栏无法拖动，8 月遗留）。

---

## 4. 重要 PR 进展（10 条）

**1. #134242 [P0] `hermes update` from v2026.9.24 不再因 `local_runtime` 的 `gpu_class` 导入而崩溃**
https://github.com/NousResearch/hermes-agent/pull/134242
修复 `ImportError: cannot import name 'gpu_class'`，直接解决 `main` 以及**每一个开放 PR** 上 `Python tests / e2e-upgrade (core)` 飘红的问题。对全仓库贡献者都是阻塞解除，今日优先级最高。

**2. #134244 修复 gateway：上下文压缩在途时拒绝新回合**
https://github.com/NousResearch/hermes-agent/pull/134244
针对 #134239 的 Gap 1，在 `_handle_message` 的新回合派发路径补上压缩守卫检查，防止回合基于 pre-rotation 历史启动。与 Issue 同期提交，是今日"问题—修复"配对最完整的一组。

**3. #134173 [P0] prune(scratch)：抢救在 prune 运行中被写入的条目**
https://github.com/NousResearch/hermes-agent/pull/134173
24 小时 scratch 清理基于 prune 开始时的快照决定删除范围，导致用户正在写入的新文件被"中途误删"。本 PR 引入候选列表并在删除前重新校验，属于**数据丢失类**修复（关联 #132401）。

**4. #134241 [P2] fix(gemini)：迁移采样与 thinking 生成参数**
https://github.com/NousResearch/hermes-agent/pull/134241
移除 Gemini 调用中显式转发的采样参数（含 vision temperature 0.1、trajectory summary 0.3）以及 `thinkingBudget: 0`，覆盖 main/auxiliary/native 与 sync/async/streaming 各路径。对多 provider 一致性有直接影响。

**5. #134235 [P3] fix(providers)：Solstice 惰性传输 + 将发现失败缓冲到原始 stderr 之外**
https://github.com/NousResearch/hermes-agent/pull/134235
Solstice provider 发现阶段不再导入推理传输模块（部分宿主机缺少推理依赖），插件加载失败也不再直接打到原始 stderr，改善启动期可用性与日志噪声。

**6. #134209 [P3] feat(onboarding)：首次运行设置对话**
https://github.com/NousResearch/hermes-agent/pull/134209
新桌面用户首次启动会进入一个简短的设置对话：Hermes 通过卡片询问姓名、配置应用/插件/布局，然后开启第一个任务；只采集少量机器事实而非全盘扫描。需在 #134156（Simple mode）之后合并，是桌面体验方向的重要一步。

**7. #133625 [P3] feat(compression)：warm handoff——把摘要放进主模型的缓存 prompt（`compression.warm_handoff: off|on|auto`）**
https://github.com/NousResearch/hermes-agent/pull/133625
当前压缩摘要是独立的辅助请求，无法复用对话的 prompt cache；本 PR 提供可选的 warm handoff，让摘要走主模型缓存提示。对压缩成本与时延都是潜在优化，值得关注其 auto 策略的落地效果。

**8. #133676 [P3] feat(agent)：为免费模型加入动态启发式模型 fallback**
https://github.com/NousResearch/hermes-agent/pull/133676
支持 `largest_parameter_count`、`greatest_context`、`smallest`、`latest`、`latest_flash` 等选取准则，以及 `free_only`、`require_tools`、`vendor`、`name_filter`、`min_context` 等过滤器，免去手工维护临时免费模型清单。回应了 OpenRouter/Nous 免费模型频繁更替的痛点。

**9. #130430 [P2] Windows：PM 不再因超过 260 字符的 store 路径失败**
https://github.com/NousResearch/hermes-agent/pull/130430
在未开启长路径支持的默认 Windows 环境（默认关闭）下，PM 现在可以复制、检查、发布和删除深层工具文件，启用 `nvidia-app` 等插件不再因复制内置 Python 失败。关闭 #130232，修复 #130242 的 PM 部分。

**10. #128141 [P2] fix(tools)：平台 allowlist 识别规范 MCP 名称**
https://github.com/NousResearch/hermes-agent/pull/128141
修复 #128017：保存 `platform_toolsets.cli: [hermes-cli, mcp-linear]` 会错误启用全部 MCP server，而裸别名 `linear` 只选中目标 server。根因是 `_merge_mcp_servers` 只识别裸名。对精细控制工具集权限的用户很关键。

> 其他动向：#134165（test，已 CLOSED，修复失败测试遗留 draining gateway 子进程）、#83689（真实 Windows runner 上的 Desktop 安装/更新 E2E）、#92590（桌面 i18n 增加巴西葡萄牙语，97.9% 覆盖率）、#128305（发布资产请求加共享 updater 身份以通过 WAF）、#61151（按平台可配置出站抑制正则）、#107945（`delegate_task` 支持按任务 pin provider/model）、#105624（Telegram 多机器人同频道上下文）。

---

## 5. 功能需求趋势

从本期 13 个 Issue 与 50 个 PR 中可提炼出以下方向：

- **安装/更新可靠性成为第一优先级**：Desktop 更新链路上出现 #133992（锁自冲突）、#124972（pre-flight 超时）、#128605（30s 快照上限）三处独立故障，且都在 macOS。跨平台升级体验（含 Windows 长路径 #130430、Windows CI E2E #83689）是当前最集中的工程投入方向。
- **会话/上下文状态机一致性**：压缩（#133625 warm handoff、#134239 双重压缩）、prune（#134173）、会话搜索与 profile 隔离（#114102）、跨 gateway 设置状态（#106221）——围绕"会话是唯一事实来源"的并发与提交语义正在被系统性加固。
- **多 provider / 多模型路由的精细化**：`extra_body` 覆盖与泄漏（#124289）、Gemini 参数迁移（#134241）、Solstice 惰性加载（#134235）、免费模型启发式 fallback（#133676）、按任务 pin provider（#107945）。社区显然在跑混合 provider 编排。
- **插件生态与工具可见性一致性**：`ctx.register_skill()` 注册的 skill 在 CLI/Dashboard 不可见（#134240），MCP 规范名在 allowlist 中被忽略（#128141）——"能跑"与"能被管理"之间的鸿沟是新的问题簇。
- **Computer Use / 桌面自动化**：#108215（不重连）、#134243（no_overlay 静默失效）表明 `computer_use` 的配置语义与错误分类仍是薄弱环节。
- **首次体验与本地化**：首运行设置对话（#134209）、巴西葡萄牙语（#92590）、免费层条款条（#134083），桌面端产品化在加速。

---

## 6. 开发者关注点

1. **CI 红是公共阻塞**：#134242 之所以是今日最高优先级，是因为它同时卡住 `main` 与所有开放 PR 的 e2e 升级测试。基础环境类的红色项对贡献者的实际伤害大于单个功能 Bug。
2. **更新流程中的"自己锁自己"**：#133992 与 #124972、#128605 指向同一类结构性问题——同步阻塞（`spawnSync` / `execFileSync`）+ 固定超时 + custodian 交接锁，缺少可取消与进度反馈的异步设计。
3. **静默失效的配置项最伤信任**：#134243（`no_overlay: false` 无人渲染光标）、#119641（`write_approval: false` 与后台复核行为不符）、#117818（豁免注释声称的覆盖并不存在）——三者共同点是"文档/注释承诺 ≠ 代码行为"，且失败时无任何提示。
4. **错误分类不足导致不可恢复**：#108215 的核心不是 MCP 桥死了，而是 `MCPError(CONNECTION_CLOSED)` 未被归入"会话已关闭"语义，因而没有重连路径。#134128 的 gzip 解压失败也被包装成"Provider unreachable"，误导排障。
5. **评审流水线的元问题**：#134008 的 6 条评论和唯一的 👍 说明贡献者正被 review 循环消耗——approved 的 PR 因过时而无法合并，这会影响后续所有人的提交意愿，值得维护者优先处理流程而非代码。
6. **状态污染类 Bug 增多**：`extra_body` 泄漏到下一个 fallback（#124289）、压缩基于 pre-commit 快照（#134239）、prune 删除中途写入（#134173）、双 gateway 设置串台（#106221）——都表现为"一次操作的副作用影响后续不相关操作"，这类问题复现难、排查贵，建议在测试层加入快照/提交边界的不变量断言。

---

*报告基于 2026-10-06 至 2026-10-07 的仓库公开数据（13 条 Issue、50 条 PR，本文各取前 20 条中的重点）。*

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报（2026-10-07）

## 1. 今日速览
过去 24 小时无新 Release。社区焦点集中在三类：**P0 级升级/更新失败**、**认证与模型提供商可靠性**、以及**会话生命周期与消息一致性**。PR 侧则以 Gateway 启动修复、OAuth/认证边界、浏览器 Docker 镜像瘦身、Skill Workshop 重构和 UI/配置修复为主。

## 2. 版本发布
过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **#154605 [P0] 升级稳定性：版本不匹配与级联失败**  
   跨小版本升级出现 DB schema v21 vs v19、插件 API 版本级联、`doctor --fix` 无进度、Gateway 重启失败等问题。相关 P0 更新失败还包含 #154618（finalize:doctor）、#154541（global-install-failed）、#154502（runtime-verification-failed）。均带 `ux-release-blocker`，10-07 仍在更新。  
   https://github.com/openclaw/openclaw/issues/154605

2. **#166344 [P1] Browser exec 续跑后重复最终回复**  
   背景命令完成、私有 native child 委托、`sessions_yield` 后，完成结算拒绝首个 final 并重新开始，造成重复回复。影响 `message-loss`，2 条评论，属于 P1。  
   https://github.com/openclaw/openclaw/issues/166344

3. **#166351 [P2 security] `sessions.send` 在容器派发被拒后仍运行未派发会话**  
   节点设置 `isolation=container` 且无容器引擎时，`sessions.dispatch` 被拒，但 `sessions.send` 仍可执行同一未派发会话。涉及安全边界，需要维护者/产品决策。  
   https://github.com/openclaw/openclaw/issues/166351

4. **#156491 [P2 auth-provider] Codex-native GPT-6 冷启动首轮失败**  
   账号目录中已有模型，但冷启动首轮仍拒绝选择 ready 模型；刷新模型列表和重新认证不足。4 条评论，`platinum hermit`，认证/冷启动可靠性问题。  
   https://github.com/openclaw/openclaw/issues/156491

5. **#154529 [P2 auth-provider] OpenRouter 模型能力拉取在 Gateway 内 10s 中止、外部 360ms 成功**  
   缓存从不填充，并每 70–90s 进入警告循环。已标记 `VERIFIED-9.5`，4 条评论。  
   https://github.com/openclaw/openclaw/issues/154529

6. **#154510 [P2 auth-provider] `models auth order clear` 未清理迁移后的共享顺序**  
   CLI 报告配置顺序生效，但新会话仍选择不同 OpenAI profile。3 条评论，`diamond lobster`。  
   https://github.com/openclaw/openclaw/issues/154510

7. **#154528 [P1] claude-cli 恢复已删除 transcript 时静默挂起 180s，并复用死绑定**  
   Claude Code 30 天保留策略删除旧 transcript 后，OpenClaw 尝试恢复会无自愈地复用死绑定。涉及 `session-state` / `auth-provider`。  
   https://github.com/openclaw/openclaw/issues/154528

8. **#154517 [P2 session-state] `sessions delete/archive` 对 `sessions list` 返回的 key 报 not_found**  
   删除/归档旧会话以回收空间的工作流不可用，且删除不缩小 agent SQLite store。2 条评论。  
   https://github.com/openclaw/openclaw/issues/154517

9. **#166349 [P2] Codex native children：定义父级唤醒与重启恢复语义**  
   完成事件不等于父级已消费，普通 final 不一定是继续请求；重复完成响应已经出现。影响 `session-state` / `message-loss`，涉及多代理语义。  
   https://github.com/openclaw/openclaw/issues/166349

10. **#166303 [CLOSED P0 crash-loop] memory-wiki `wiki_search` 丢失 per-call abort signal，无 deadline owner**  
    搜索结果无界运行，观察到 584s。已关闭，但作为 P0 crash-loop，说明工具层中止/截止时间问题受到重视。  
    https://github.com/openclaw/openclaw/issues/166303

## 4. 重要 PR 进展

1. **#166108 [P1] Gateway 启动在临时状态维护时停止**  
   修复 Gateway 启动发现因 schema 所有者争用而立即中止的问题，已 ready for maintainer look。  
   https://github.com/openclaw/openclaw/pull/166108

2. **#166294 [P1] 清理空的无费用恢复残留**  
   修复 `SESSION_WORK_START_CHANGED`：持久化主会话恢复记录健康、未计费且无 recovery runs 时的结算失败。  
   https://github.com/openclaw/openclaw/pull/166294

3. **#166326 [P2 security-sensitive] OAuth 结算 known-null 写入后重试同 claim**  
   仅在同一 OAuth refresh claim 仍有效时重试一次，避免重复 provider refresh 或重放未知 SQLite commit。需安全审查。  
   https://github.com/openclaw/openclaw/pull/166326

4. **#147155 [P2 security-boundary] provider header 准备后保留普通聊天文本**  
   修复普通聊天文本在 provider 认证返回 HTTP 元数据后被遮蔽的问题。  
   https://github.com/openclaw/openclaw/pull/147155

5. **#154587 [P2] `models auth order clear` 同时清理共享 auth order**  
   直接关闭 #154510，涉及兼容性与 auth-provider，当前需要 proof。  
   https://github.com/openclaw/openclaw/pull/154587

6. **#154608 [P2] 精简 Docker browser 镜像并加固 Lightpanda sidecar**  
   让更小的 Docker browser 发行版更明确，同时保留旧 Playwright 兼容；带 compatibility / availability 合并风险。  
   https://github.com/openclaw/openclaw/pull/154608

7. **#161057 [P2 XL] Skill Workshop 改为直接、版本化的自学习循环**  
   解决后台评审失败、scratch 文件膨胀、周评审卡在 Codex runtime 等问题；跨多模块，安全边界敏感，需 proof。  
   https://github.com/openclaw/openclaw/pull/161057

8. **#166338 [P2] 登出 Claude CLI 时仍列出模型并给出登录原因**  
   修复 Control UI 聊天选择器只显示默认禁用模型、头部显示“No models available”的问题。  
   https://github.com/openclaw/openclaw/pull/166338

9. **#166310 [P2] 隔离 completion 中避免无关插件捕获**  
   降低大 memory/context-engine 插件导致 Gateway 暂停的问题，尤其是生成会话标题等 prompt-only 请求。  
   https://github.com/openclaw/openclaw/pull/166310

10. **#149181 [CLOSED P2] exec approvals 脏目标切换前确认**  
    关闭 #127500，避免在 Gateway/节点切换时静默丢弃执行审批策略草稿。  
    https://github.com/openclaw/openclaw/pull/149181

## 5. 功能需求趋势

- **升级/更新稳定性与版本兼容**：P0 更新失败群、schema/plugin API/doctor/Gateway restart、9.4 rollback 文档恢复。  
  https://github.com/openclaw/openclaw/issues/154605 / https://github.com/openclaw/openclaw/pull/154609

- **认证与模型提供商可靠性**：Codex GPT-6 冷启动、OpenRouter 能力缓存/超时、auth order 迁移、OAuth settlement、Claude CLI 登出状态。  
  https://github.com/openclaw/openclaw/issues/156491 / https://github.com/openclaw/openclaw/issues/154529 / https://github.com/openclaw/openclaw/pull/166326

- **会话生命周期与消息一致性**：delete/archive、删除 transcript 后恢复、Browser exec 重复 final、sessions.send 隔离拒绝、Codex child 唤醒语义。  
  https://github.com/openclaw/openclaw/issues/154517 / https://github.com/openclaw/openclaw/issues/166344 / https://github.com/openclaw/openclaw/issues/166349

- **多代理可观测性**：Codex native child 活动在重连后是否持久显示、父级唤醒/重启恢复规则。  
  https://github.com/openclaw/openclaw/issues/166349 / https://github.com/openclaw/openclaw/issues/166350

- **插件/SDK 与配置能力**：browser tool factory 缺少 SDK 导出、config-form typed map 分片、Skill Workshop、隔离 completion 插件初始化。  
  https://github.com/openclaw/openclaw/issues/154512 / https://github.com/openclaw/openclaw/pull/163553 / https://github.com/openclaw/openclaw/pull/161057

- **平台/UX/可访问性**：macOS scratch root 独立卷、屏幕阅读器标题导航、status 等待、分组会话保留、Telegram 群媒体 mention 硬编码。  
  https://github.com/openclaw/openclaw/issues/154530 / https://github.com/openclaw/openclaw/issues/154524 / https://github.com/openclaw/openclaw/issues/126839

- **安全边界**：容器隔离派发拒绝后仍执行、exec approvals 草稿丢失、认证 header 处理与 OAuth 结算安全。  
  https://github.com/openclaw/openclaw/issues/166351 / https://github.com/openclaw/openclaw/issues/127500 / https://github.com/openclaw/openclaw/pull/147155

- **性能/资源**：Docker browser 镜像缩小、OpenRouter 缓存、wiki_search 中止/截止时间、避免无关插件捕获。  
  https://github.com/openclaw/openclaw/pull/154608 / https://github.com/openclaw/openclaw/issues/166303 / https://github.com/openclaw/openclaw/pull/166310

## 6. 开发者关注点

- **升级路径不可靠**：跨小版本升级容易触发 schema、插件 API、Gateway restart 级联失败，`doctor --fix` 缺少进度反馈。  
  https://github.com/openclaw/openclaw/issues/154605

- **认证状态迁移与 provider 边界**：共享 override、OAuth 结算、header 准备、冷启动模型选择等场景仍易出现残留、误清或文本遮蔽。  
  https://github.com/openclaw/openclaw/issues/154510 / https://github.com/openclaw/openclaw/pull/166326

- **会话存储与生命周期 CLI 不一致**：删除/归档报 not_found，删除不回收空间，死绑定无自愈，重启恢复语义不清。  
  https://github.com/openclaw/openclaw/issues/154517 / https://github.com/openclaw/openclaw/issues/154528

- **超时/中止/截止时间设计缺失**：OpenRouter 拉取、wiki_search 等场景出现护栏失效或长时间挂起。  
  https://github.com/openclaw/openclaw/issues/154529 / https://github.com/openclaw/openclaw/issues/166303

- **插件生态与配置 UI 脆弱**：缺少稳定 SDK 导出，typed map 配置分片会破坏草稿，Skill Workshop 在真实 Gateway 上表现不佳。  
  https://github.com/openclaw/openclaw/issues/154512 / https://github.com/openclaw/openclaw/pull/163553

- **安全边界需要更明确**：未派发会话仍可能执行，敏感执行审批草稿可能丢失，容器隔离拒绝后状态不一致。  
  https://github.com/openclaw/openclaw/issues/166351 / https://github.com/openclaw/openclaw/issues/127500

- **平台差异与可访问性需求上升**：Windows/macOS/Linux、Node 版本、屏幕阅读器导航、Telegram 群媒体策略等都成为高频反馈点。  
  https://github.com/openclaw/openclaw/issues/154530 / https://github.com/openclaw/openclaw/issues/154524 / https://github.com/openclaw/openclaw/issues/126839

:::
