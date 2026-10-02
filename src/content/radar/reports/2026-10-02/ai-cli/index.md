---
title: "AI CLI 工具社区动态日报"
published: 2026-10-02
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-02

> 生成时间: 2026-10-02 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具横向对比分析报告（2026-10-02）

> 数据说明：以下 Issue/PR 数按各日报“过去 24 小时更新”或“列示条目”统计；未披露总数者标注为“列示/可见”，不代表全量。

---

## 1. 生态全景

当前 AI CLI 工具正从“单点编码助手”进入“**Agent 编排 + 扩展生态 + 多端协作**”的竞争阶段：Claude Code 的 Mods、Gemini 的子代理、Codex 的 app-server/gRPC、Hermes/OpenClaw 的 gateway/hooks 都在争夺下一代扩展标准。但与此同时，社区反馈高度集中在**可靠性、安全性和平台质量**：子代理静默失败、模型行为漂移、密钥明文落盘、Windows/Wayland 兼容性、会话恢复丢状态等问题密集出现。整体看，头部工具迭代很快，但“能跑通”与“可信任、可运维、可回滚”之间仍有明显缺口。DeepSeek Harness 过去 24 小时无活动，生态分化正在加速。

---

## 2. 各工具活跃度对比

| 工具 | Issues 更新/可见 | PR 更新/可见 | Release 情况 | 今日核心焦点 |
|---|---:|---:|---|---|
| **Claude Code** | Top10 + 至少 6 条待留意（未披露总数） | 5 | **v2.1.287** | Mods 扩展落地；Opus 5.5 行为漂移；Auto 安全分类器阻塞 Bash |
| **OpenAI Codex** | **47** | 10（列示，未披露总数） | **rust-v0.160.0**；多个 alpha | Windows/dot Computer Use 失效；分支选择回归；剪贴板修复收尾 |
| **Gemini CLI** | Top10（列示） | 10（列示） | **v0.64.0-nightly** | 子代理挂起/MAX_TURNS 误报成功；状态原子持久化；安全边界 |
| **DeepSeek Reasonix** | 10（列示） | 10（列示） | **v1.39.6 / studio-v2.24.0** | 工作区写锁、移动端、SSH PATH、遥测归零 |
| **OpenCode** | **14**（本轮） | **20**（本轮） | 无 | Go 订阅故障刷屏；密钥明文；Windows 控制台闪烁；V2 formatter |
| **Deepseek Harness** | 0 | 0 | 无 | 过去 24 小时无活动 |
| **Hermes** | 4（全部） | **50** | 无 | gateway 重启被 cron 阻塞；API key 明文；resume 副作用重复 |
| **OpenClaw** | 5（全部） | 10（列示） | 无 | 子进程泄漏；脱敏过度；Codex 硬编码；企业仓库支持 |

**活跃度简述**：Codex 的 Issue 更新量最高（47）；Hermes 的 PR 更新量最高（50）；Claude Code 单 Issue 互动最强（#91870：227 评论 / 130 👍）；OpenCode 则因付费/订阅故障形成集中投诉潮。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求/信号 |
|---|---|---|
| **Agent/子代理可靠性** | Gemini、OpenCode、Hermes、Claude Code、Codex、OpenClaw | Gemini 子代理 MAX_TURNS 却报成功；OpenCode 子代理 `finish:"error"` 被上报成功；Hermes resume 可能重复副作用；Claude Auto 模式阻塞 Bash；Codex clarification 卡片被自动关闭 |
| **安全、权限与密钥管理** | OpenCode、Hermes、OpenClaw、Claude Code、Gemini、Codex | OpenCode 脱敏密钥仍明文入 `opencode.db`；Hermes API key 明文写 `config.yaml`；OpenClaw 脱敏过度导致 agent 无法自纠正；Claude Passkey 高赞；Gemini 不受信工作区只读；Codex 沙箱 GPU/MSIX 问题 |
| **Windows/Wayland/终端体验** | Codex、Claude Code、Gemini、Reasonix、OpenCode、Hermes、OpenClaw | Codex Windows 是最大质量洼地；Claude Windows 数据丢失与启动延迟；Gemini Wayland 浏览器子代理失败；Reasonix Windows shell；OpenCode Windows 控制台闪烁；OpenClaw 原生 Apple 聊天一致性 |
| **会话、上下文与状态一致性** | Claude Code、Codex、Gemini、Reasonix、OpenCode、Hermes、OpenClaw | 嵌套 skills/CLAUDE.md 加载失败；Codex 长回合耗尽 context 且 `/compact` 失效；Gemini 快速退出删除会话历史；Reasonix 切换会话遥测归零；OpenCode V2 配置不合并；Hermes 恢复会话状态不一致 |
| **模型行为、成本与回滚** | Claude Code、Codex、OpenCode、Gemini、Reasonix | Claude Opus 5.5 思考量约 2x、输出约 1.6x、判断力下降；Codex GPT-6.1 指令遵循回退且无法回退旧模型；OpenCode prompt cache 回退推高成本；Reasonix 每模型独立上下文设置 |
| **扩展生态与插件协议** | Claude Code、Gemini、OpenCode、Hermes、OpenClaw、Codex | Claude Mods 密集迭代但紧急回滚；Gemini agents 调用 agents；Hermes 需要 agent 关闭清理/后台状态钩子；OpenClaw hooks/secret 轮换；Codex connectors 重构 |
| **自动化、远程与多端协作** | Codex、Claude Code、Hermes、Reasonix、OpenClaw | Codex 需要显式 SessionID；Claude 无头并发导致 OAuth 互踢；Hermes 跨 gateway 文档传递；Reasonix SSH 登录 shell PATH；OpenClaw 企业仓库/云工作器 |
| **计费与订阅可靠性** | OpenCode | Go 订阅付款未激活、重复扣费、403、状态加载失败，一日内多地区投诉，已打 `needs:compliance` 标签 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线/生态位 |
|---|---|---|---|
| **Claude Code** | 深层插件 Mods、TUI、权限与模型治理 | Anthropic 生态专业开发者、企业团队 | 官方深度集成，强调运行时扩展与安全审批，生态影响力强，但模型行为漂移引发信任关注 |
| **OpenAI Codex** | CLI/Desktop/Cloud、app-server、gRPC、subagent、connectors | OpenAI 多端开发者、自动化/企业流水线 | Rust 系工程化路线，云线程与本地 app-server 并行推进，但 Windows 平台质量拖累体验 |
| **Gemini CLI** | 子代理、AST-aware 代码理解、沙箱、企业 policy | Google/Gemini 开发者、终端与 IDE 用户 | 开源 + nightly 高频迭代，强调 Agent 编排和代码库理解，P1 修复密集 |
| **DeepSeek Reasonix** | CLI/Desktop/Studio/移动端、远程 SSH、工作区写锁 | DeepSeek 生态、多端与远程开发者 | 产品化速度快，覆盖移动/桌面/远程，但写锁粒度和状态一致性争议较大 |
| **OpenCode** | 多模型适配、V2 桌面/TUI、Go 订阅 | 多模型用户、桌面开发者、付费订阅用户 | 社区/厂商混合路线，V2 重写期，安全与配置语义问题突出，订阅系统成信任缺口 |
| **Hermes** | gateway、cron、Discord、插件/技能、多 gateway | 自托管 Agent 运营者、自动化团队 | 面向分布式 agent 协作与运维自动化，PR 活跃，但 P1 可用性和密钥管理问题明显 |
| **OpenClaw** | 自托管 Control UI、原生 Apple、企业仓库 | 自托管用户、企业内网、跨平台团队 | 长运行稳定性与资源治理是核心，脱敏与安全边界需平衡，企业功能在补强 |
| **Deepseek Harness** | — | — | 过去 24 小时无活动，可能处于暂停/早期阶段 |

---

## 5. 社区热度与成熟度

- **最活跃社区**：OpenAI Codex（47 Issue 更新）、Hermes（50 PR 更新）、OpenCode（14 Issue + 20 PR）。Claude Code 虽未披露 Issue 总数，但 #91870 达到 227 评论 / 130 👍，单帖影响力最大。
- **最成熟发布节奏**：Claude Code、OpenAI Codex、Gemini CLI 均有稳定版或 nightly 发布；Reasonix 一日内双版本发布，产品化推进快。
- **快速迭代但风险较高**：Claude Code Mods 处于密集迭代并出现紧急回滚；OpenCode V2 配置语义和订阅系统不稳；Hermes/OpenClaw 的 P1 问题集中在资源泄漏、gateway 阻塞和密钥安全。
- **平台质量决定采用速度**：Codex 的 Windows 问题簇、Gemini 的 Wayland、Claude 的 Windows 数据丢失，说明跨平台兼容性仍是企业/个人采用的关键门槛。
- **DeepSeek Harness 静默**：与其他工具形成鲜明对比，需关注其是否停更或转入内部开发。

---

## 6. 值得关注的趋势信号

1. **Agent 可信度正在超过“能力演示”**  
   子代理误报成功、错误被静默吞掉、resume 重复副作用，说明社区开始要求 Agent 具备**可审计、可回滚、可中断**的工程属性。

2. **安全左移成为硬需求**  
   密钥明文落盘、脱敏过度、沙箱 GPU 阻断、不受信工作区写入等议题集中出现。开发者选型时应重点检查：密钥是否只进 `.env`/secret store、沙箱是否可配置、脱敏是否破坏自纠正。

3. **Windows 与 Wayland 是当前最大平台洼地**  
   Codex 的 MSIX/Computer Use、Claude 的数据丢失、Gemini 的 Wayland、OpenCode 的控制台闪烁，均指向平台底层适配不足。跨平台团队应优先验证这些场景。

4. **上下文经济学成为成本核心**  
   prompt cache 回退、长任务 context 耗尽、`/compact` 失效、SessionID 缺失，说明 CLI 工具作为 CI/自动化组件时，**上下文可管理、可恢复、可嵌入**比单次生成质量更关键。

5. **扩展生态进入协议竞争期**  
   Mods、plugins、skills、MCP、hooks、connectors 同时爆发，但契约不稳、生命周期钩子缺失、回滚频繁。开发者应关注工具是否提供稳定 API、测试工具和版本化协议。

6. **模型行为漂移要求透明度和回滚能力**  
   Claude Opus 5.5 行为漂移、Codex GPT-6.1 无法回退、OpenCode prompt cache 变化，表明用户不再接受“黑盒升级”。模型变更日志、版本锁定、成本告警将成为刚需。

7. **远程、多端、多 gateway 协作从边缘走向常态**  
   SSH/Tailscale 直连、跨 gateway 文档传递、移动端触控、企业私有仓库支持，说明 AI CLI 正在从本地终端扩展到分布式工作流。

8. **订阅与计费可靠性是信任底线**  
   OpenCode 一日内多条 Go 订阅故障投诉，提醒所有工具：付费即用、用量重置、状态接口稳定，是开发者工具最不能出错的链路。

---

**选型建议**：若重视扩展生态与模型治理，关注 Claude Code；若强调多端/云自动化和工程集成，关注 Codex；若需要开源与高频 Agent 能力，关注 Gemini CLI；若部署自托管、多 gateway 或企业内网，重点评估 Hermes/OpenClaw 的 P1 修复进度；若已使用 OpenCode，需密切关注其订阅系统与密钥落盘问题的修复。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-10-02）

> 数据口径：PR 评论数字段未返回，以下“热门 PR”按官方榜单顺序、更新活跃度及关联 Issue 综合判断；所列 PR 当前均为 **OPEN**。

## 1. 热门 Skills 排行（PR）

1. **#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime**  
   功能：修复 skill-creator 触发评估误判、Windows 子进程兼容、运行时失败处理。  
   热点：元技能评估可靠性，关联社区对 `run_eval.py` 触发率问题的长期反馈。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1298

2. **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client and custom headers**  
   功能：适配 MCP v2 客户端重命名与自定义 HTTP header 配置。  
   热点：MCP 生态升级兼容，修复真实连接脚本阻塞问题。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1742

3. **#1771 feat(skills): add proofcore-contract-auditor for smart contract notarization**  
   功能：面向 Web3 的 Solidity/Rust 合约静态分析与 TON 区块链审计凭证锚定。  
   热点：智能合约安全、审计可验证性、Web3 垂直技能。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1771

4. **#1734 Detect orphaned docx comments**  
   功能：检测 DOCX 中孤立/失效批注。  
   热点：文档处理完整性，DOCX 技能质量改进。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1734

5. **#1703 Add md2video-audio skill**  
   功能：将 Markdown 编译为带类真人配音的 MP4 视频，使用 Marp 生成幻灯片。  
   热点：零成本内容生产、音视频自动化。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1703

6. **#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills**  
   功能：Notion 规格转实现任务；量化简历审计。  
   热点：知识工作流自动化、求职与项目管理场景。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1245

7. **#1792 fix(docx): report LibreOffice timeout as an error and verify the output**  
   功能：修复 DOCX accept-changes 在 LibreOffice 超时后误报成功，并验证修订标记清除。  
   热点：文档转换可靠性、错误处理真实性。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1792

8. **#525 Add pyxel skill for retro game development**  
   功能：面向 Python/Pyxel 的复古游戏创建、调试、无头运行与状态检查。  
   热点：游戏开发垂直技能、可验证运行证据。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/525

## 2. 社区需求趋势

- **安全与信任边界**：社区担忧社区技能冒用 `anthropic/` 命名空间，绕过官方信任边界；同时关注 SharePoint 等企业文档权限与 Skill 内嵌权限逻辑风险。相关：#492、#1175、#1394。  
  https://github.com/anthropics/skills/issues/492  
  https://github.com/anthropics/skills/issues/1175  
  https://github.com/anthropics/skills/issues/1394

- **组织级共享与技能库**：希望 Claude.ai 支持组织内直接共享/发现 Skills，而非手动下载 `.skill` 文件再上传。  
  https://github.com/anthropics/skills/issues/228

- **评估、触发与基准可靠性**：`run_eval.py` 触发率为 0%、mcp-builder evaluation 对真实 MCP 服务器全错、skill-creator 基准静默失败等问题，说明社区急需可复现、跨平台、可诊断的评估链路。  
  https://github.com/anthropics/skills/issues/556  
  https://github.com/anthropics/skills/issues/1383  
  https://github.com/anthropics/skills/issues/1390

- **上下文与 token 效率**：`claude-api` 单次注入约 156k tokens、document-skills 与 example-skills 安装重复内容，推动“懒加载、去重、上下文预算”成为核心诉求。  
  https://github.com/anthropics/skills/issues/1487  
  https://github.com/anthropics/skills/issues/189

- **质量门与元技能**：社区提出 skill-quality-analyzer、skill-security-analyzer、Reasoning Quality Gate Pipeline 等方向，期待官方或半官方的 Skill 质量/安全/推理审查能力。  
  https://github.com/anthropics/skills/pull/83  
  https://github.com/anthropics/skills/issues/1385

- **垂直场景持续扩展**：文档排版、ODT、HPC、Web3 合约审计、E2E 测试、测试模式、记忆压缩等新 Skill 提案活跃，反映社区正从通用文档向专业工作流延伸。  
  https://github.com/anthropics/skills/pull/514  
  https://github.com/anthropics/skills/pull/486  
  https://github.com/anthropics/skills/pull/1615  
  https://github.com/anthropics/skills/pull/723  
  https://github.com/anthropics/skills/issues/1329

## 3. 高潜力待合并 Skills

1. **#1742 mcp-builder MCP v2 兼容修复**：更新至 2026-09-29，直接修复 `mcp>=2` 下的真实连接问题。  
   https://github.com/anthropics/skills/pull/1742

2. **#1607 claude-api 模型退役状态更新**：更新至 2026-09-28，修复官方模型文档滞后。  
   https://github.com/anthropics/skills/pull/1607

3. **#1681 skill-creator 支持直接执行 package_skill.py**：更新至 2026-09-27，修复 `ModuleNotFoundError` 与文档路径。  
   https://github.com/anthropics/skills/pull/1681

4. **#1792 docx LibreOffice 超时错误与输出验证**：更新至 2026-09-25，解决误报成功。  
   https://github.com/anthropics/skills/pull/1792

5. **#1298 skill-creator 触发评估隔离与 Windows 兼容**：更新至 2026-09-16，元技能关键修复。  
   https://github.com/anthropics/skills/pull/1298

6. **#1245 Notion 规格转实现 + 简历审计**：更新至 2026-09-30，面向知识工作流的高频场景。  
   https://github.com/anthropics/skills/pull/1245

7. **#723 testing-patterns 测试模式 Skill**：更新至 2026-09-21，覆盖单元、React 组件与测试策略。  
   https://github.com/anthropics/skills/pull/723

8. **#1776 blast-radius 批量/破坏性操作检查清单**：更新至 2026-09-18，补足高风险写操作的安全检查。  
   https://github.com/anthropics/skills/pull/1776

## 4. Skills 生态洞察

**一句话总结：当前社区最集中的诉求是让 Skills 从“能用”走向“可信、可评估、可治理”——优先修复 skill-creator、mcp-builder、docx 等核心技能的评估/兼容/可靠性问题，同时建立安全信任边界、组织共享和上下文效率机制。**

---

# Claude Code 社区动态日报

**日期：2026-10-02** | 数据来源：github.com/anthropics/claude-code

---

## 1. 今日速览

今日最重要的动态是 **Claude Mods 扩展机制正式落地并进入密集迭代期**：v2.1.287 发布，插件现在可以修改更深层的行为，并新增内置 Mod「You should know」（由侧边 Agent 帮你盯梢）。与此同时，社区对 **Opus 5.5 自 10 月 1 日起的行为漂移（思考量约 2x、输出约 1.6x、判断力下降）** 以及 **Auto 模式安全分类器间歇性失效导致 Bash 工具全面阻塞** 的反馈集中爆发，成为今日最受关注的两个风险信号。

---

## 2. 版本发布

### v2.1.287

- **Claude Mods**：插件（plugins）现在可以修改更深层的运行时行为，扩展能力显著增强。
- **新增内置 Mod「You should know」**：一个侧边 Agent 会持续监视你的会话，主动标记你或 Claude 可能遗漏的问题。启用方式：
  ```
  /plugin enable cc-plugin-you-should-know@builtin
  ```

> 结合 #91870（Mods 主线程）与多笔 mods 相关 PR，可判断官方正在快速收敛 Mods 的早期反馈。

---

## 3. 社区热点 Issues（Top 10）

### ① #91870 — Mods：让 Claude 的扩展性提升 10 倍 ⭐ 227 评论 / 130 👍
- **状态**：OPEN｜标签：enhancement, area:hooks, area:plugins
- **重要性**：官方 Mods 扩展体系的**主讨论帖**，作者 @poteat 于 10-01 发布社区微更新（"We're live!"），团队正在快速消化首批反馈。这是当前整个生态最具影响力的 Issue。
- 链接：https://github.com/anthropics/claude-code/issues/91870

### ② #97854 — Auto 模式服务端安全分类器间歇性不返回判定，Bash / ScheduleWakeup 全部阻塞 ⭐ 28 评论 / 35 👍
- **状态**：OPEN（标记 duplicate）｜标签：bug, area:permissions
- **重要性**：会话级**完全阻塞**（100% 调用失败），连 `echo ok`、`pwd` 这类平凡命令也无法执行，属于高严重度可用性事故。
- 链接：https://github.com/anthropics/claude-code/issues/97854

### ③ #98679 — Opus 5.5 自 2026-10-01 起行为漂移：思考 ~2x、输出 ~1.6x、判断力下降 ⭐ 3 评论
- **状态**：OPEN｜标签：bug, area:cost, area:model
- **重要性**：报告者用统计数据指出**无本地变更下的模型行为突变**，且同样现象出现在 Claude Code 之外——直接影响成本与输出质量，是模型层回归的关键预警。
- 链接：https://github.com/anthropics/claude-code/issues/98679

### ④ #84862 — Passkey（WebAuthn）登录，覆盖所有产品面 ⭐ 9 评论 / 82 👍
- **状态**：OPEN｜标签：enhancement, area:auth
- **重要性**：**点赞数今日最高（82）**的功能请求，反映社区对免密码、跨端一致认证体验的强烈诉求。
- 链接：https://github.com/anthropics/claude-code/issues/84862

### ⑤ #48636 — 可自定义代码片段配色 / 语法高亮主题 ⭐ 15 评论 / 17 👍
- **状态**：OPEN｜标签：enhancement
- **重要性**：长期存在（创建于 4 月）却持续活跃的体验类需求，说明 TUI 视觉个性化仍是高频痛点。
- 链接：https://github.com/anthropics/claude-code/issues/48636

### ⑥ #93403 — 嵌套 `.claude/skills` 与子目录 `CLAUDE.md` 在 Auto 模式下永不加载 ⭐ 2 👍
- **状态**：OPEN｜标签：bug, has repro, platform:windows, area:tools, area:skills
- **重要性**：触发条件只在 Read/Edit/Write 生效，Bash/Grep 不触发，导致**多级目录项目的上下文注入失败**，直接影响大型仓库使用体验（#90004 的嵌套目录变体）。
- 链接：https://github.com/anthropics/claude-code/issues/93403

### ⑦ #98815 — Opus 生成"自信但未经验证"的代码：单次生产会话出现 9 处缺陷 ⭐ 1 评论
- **状态**：OPEN｜标签：bug, platform:macos, area:model
- **重要性**：涉及不存在的 CLI flag、stderr 捕获、printf 参数数量等，部分**已对生产环境执行**。作者指出根因非推理错误，而是"未验证即输出"，与 #98679 形成互证。
- 链接：https://github.com/anthropics/claude-code/issues/98815

### ⑧ #98828 — Claude Desktop（Windows MSIX）十余个项目会话同时消失，项目被报告"在另一台电脑上" ⭐ 1 评论
- **状态**：OPEN｜标签：bug, platform:windows, data-loss, area:cowork, area:desktop
- **重要性**：带 **data-loss** 标签，属最高级别数据安全问题，桌面端同步/存储可信度受到挑战。
- 链接：https://github.com/anthropics/claude-code/issues/98828

### ⑨ #98693 — 并发 `claude --print` 无头调用导致 OAuth 会话失效，桌面端被强制登出 ⭐ 1 评论
- **状态**：OPEN｜标签：bug, platform:macos, area:auth, area:desktop
- **重要性**：CI/脚本化并发是无头场景的常见用法，**会话互踢**会打断自动化流水线。
- 链接：https://github.com/anthropics/claude-code/issues/98693

### ⑩ #98184 — 切换 Wi-Fi 后下一次请求在死连接上挂起 184 秒才重试（Linux）⭐ 4 评论
- **状态**：OPEN｜标签：bug, has repro, platform:linux, area:networking
- **重要性**：移动办公/笔记本用户的典型痛点，超长重试窗口严重影响交互体感。
- 链接：https://github.com/anthropics/claude-code/issues/98184

**其他值得留意**：#91884（桌面端定时任务模型选择端到端失效）、#81024（VS Code 扩展硬编码 `includeWorktrees: false`）、#94630（MCP OAuth DCR client_name 被严格校验服务器拒绝）、#98832（未知 `TERM_PROGRAM` 增加约 3s 启动延迟）、#95563（Agent 工具实际接受但 schema 未暴露 `name` 参数）、#98836 / #98837（`spawn_task` 经 cloud 启动时 prompt/plan 丢失）。

---

## 4. 重要 PR 进展

> 说明：过去 24 小时内更新的 PR 共 5 条，以下全部列出。

### ① #94847 [OPEN] diff：首次编辑时仅在确有文件可列时才打开面板
- @bcherny｜更新 2026-10-01
- **内容**：修复 diff 面板在首次成功的 Edit/Write/NotebookEdit 后**先打开再抓取**导致的空面板问题（例如写入仓库外、被忽略文件或不同 worktree 时显示 "No tracked changes"）。
- 链接：https://github.com/anthropics/claude-code/pull/94847

### ② #98555 [CLOSED] diff：对话框打开其列出的每一个文件，关闭时不再静默
- @poteat｜更新 2026-10-01
- **内容**：修复 `/diff` 对话框在非全屏布局下，**会话开始前已编辑的文件、测试/生成文件（如 lockfile）点不开 diff** 的问题。
- 链接：https://github.com/anthropics/claude-code/pull/98555

### ③ #98018 [CLOSED] mods：回滚两项改动（agents-md 截断读取、diff 强制配色）
- @poteat｜更新 2026-10-01
- **内容**：Revert #96363 与 #96364，将 **agents-md 与 diff 两个 mod 恢复到早期行为**，表明新版改动在测试/实际使用中出现问题。
- 链接：https://github.com/anthropics/claude-code/pull/98018

### ④ #16632 [CLOSED] 修复 "This command uses shell operators that require approval for safety"
- @ian｜创建 2026-01-07，更新 2026-10-01
- **内容**：将 ralph-loop 初始化从 Markdown 代码块（` ```! `）迁移为真正的 Bash 工具调用，解决旧格式被引擎当作**仅展示型建议**而触发安全审批拦截的问题（Fixes #16389）。
- 链接：https://github.com/anthropics/claude-code/pull/16632

### ⑤ #62592 [CLOSED] 更新 security-guidance 插件
- @mhegazy｜更新 2026-10-01
- **内容**：对 README.md 的单处修改。
- 链接：https://github.com/anthropics/claude-code/pull/62592

---

## 5. 功能需求趋势

从今日全部更新 Issue 中可提炼出以下社区关注方向：

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **可扩展性 / 插件与 Mods** | #91870、#98018、#98555 | 🔥🔥🔥 绝对主线 |
| **认证与账号安全** | #84862（Passkey, 82👍）、#98693、#94630 | 🔥🔥🔥 高赞 + 高危并存 |
| **模型行为质量与成本** | #98679、#98815 | 🔥🔥 新兴且敏感 |
| **IDE / 编辑器集成** | #81024（VS Code worktree）、#91884（Desktop 定时任务） | 🔥🔥 稳定需求 |
| **TUI / 视觉与终端体验** | #48636（语法高亮主题）、#98832（启动延迟）、#82055（评分提示误点） | 🔥🔥 |
| **网络与可靠性** | #98184（184s 挂起）、#97854（分类器失效） | 🔥🔥 |
| **移动端与 Routines / Agent** | #76841、#98836、#98837、#95563 | 🔥 上升中 |
| **Skills / 上下文自动加载** | #93403、#90377 | 🔥 面向大型仓库 |

---

## 6. 开发者关注点

1. **扩展机制（Mods）生态尚在磨合期**：一边是官方高调推送 Mods 与内置 Mod，一边是 #98018 的**紧急回滚**——说明"深层行为可修改"带来的可预测性问题正在显现，开发者需要更稳定的 mod 契约与测试工具（`claude plugin test`）。
2. **Auto 模式权限链路的单点故障**：#97854 显示服务端分类器一旦异常，**Bash 与 ScheduleWakeup 会 100% 阻塞**，缺乏降级/本地兜底策略，对自动化工作流是致命依赖。
3. **模型行为漂移的信任危机**：#98679 与 #98815 相互印证——**"思考更多、输出更长，但判断更差"** 且伴随未经验证的代码直入生产，社区开始要求官方公开模型变更日志与回滚能力。
4. **认证与数据可靠性成为硬伤**：并发无头调用踢掉桌面会话（#98693）、Windows 桌面十余项目会话丢失（#98828）、MCP OAuth 严格服务器拒绝（#94630）——三个不同层面同时暴露认证/持久化链路脆弱。
5. **网络与启动的"隐性等待"**：切换 Wi-Fi 后 184 秒挂起、未知 `TERM_PROGRAM` 增加 ~3s 启动——这类**沉默的延迟**在被显式测量前很难被发现，开发者呼吁更激进的连接健康检查与超时策略。
6. **目录层级上下文注入不完整**：嵌套 skills / 子目录 CLAUDE.md 仅在 Read/Edit/Write 触发，Bash/Grep 失效（#93403），对 monorepo 用户是高频且难定位的问题。
7. **文档与真实 schema 不一致**：#95563（Agent 工具的 `name` 参数文档有、模型看不到）等案例持续出现，社区希望**文档、schema、实现三者对齐**。

---

*本日报基于 github.com/anthropics/claude-code 于 2026-10-01 至 2026-10-02 的公开数据自动汇总。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期：2026-10-02** ｜ 数据源：github.com/openai/codex

---

## 1. 今日速览

稳定版 **rust-v0.160.0** 发布，带来命令中心任务浏览与 Linux X11 全屏中键粘贴功能。社区情绪被两类问题主导：**Windows 上 dot / Work 的 Computer Use 工具链持续失效**（多条 Issue 累计 40+ 评论），以及 **v0.157.0 之后遗留的终端剪贴板回归大面积收尾**。同时，"把分支选择加回 Codex App" 以 **43 个 👍** 成为当日呼声最高的功能需求。

---

## 2. 版本发布

### rust-v0.160.0（稳定版）
- **命令中心支持浏览更早任务**：新增键盘可访问的 "Show more" 操作（#49106）
- **Linux X11 全屏粘贴**：在支持的本地 Linux X11 终端中，可选中对话记录文本后使用中键粘贴（#49112）
- **项目外会话**：支持以工作区默认值启动不在项目内的会话

### Alpha 频道高频迭代
- `rust-v0.162.0-alpha.1` 已放出
- `rust-v0.161.0-alpha.6` ~ `.13` 共 8 个 alpha 版本连续发布，均无变更说明，推测为 0.161 稳定版发布前的密集修复列车

---

## 3. 社区热点 Issues（过去 24 小时更新共 47 条，选取 10 条）

### ① #49532 — 把 Branch 选择加回 Codex App ｜ 👍 43
[链接](https://github.com/openai/codex/issues/49532)
当日点赞最高。用户贴出 UI 截图指出启动任务时无法再选择分支，属于**明显的能力回退**。12 条评论中大量用户跟帖要求恢复，是本周期最强的功能反弹信号。

### ② #49497 — Codex Web 首条消息报 "Unable to determine project root for task" ｜ 👍 24
[链接](https://github.com/openai/codex/issues/49497)
在已发布保存的云环境中提交首条消息即失败，页面停留在错误态。13 条评论、24 个 👍，说明**影响面覆盖所有新用户 Cloud 接入路径**，属高优先级阻断性 Bug。

### ③ #49458 — [Windows] dot 启动的本地任务缺少 Computer Use 工具 ｜ 20 评论
[链接](https://github.com/openai/codex/issues/49458)
普通本地 Codex 会话正常，但通过 dot 发起的任务拿不到 Computer Use 工具。与 #49488、#49423 构成同一故障簇，是**Windows + dot 委托链路的核心阻塞**。

### ④ #49729 — Dot 无法在已保存项目中创建或跟进本地任务
[链接](https://github.com/openai/codex/issues/49729)
dot 能在连接的桌面端启动本地任务，但其任务创建工具**无法选中已有的 Codex App 项目**；即使任务成功建线程，dot 也无法按返回 ID 读取或回复。属于跨组件契约断裂。

### ⑤ #43803 — request_user_input_async 问题卡片被自动关闭，用户无法作答 ｜ 14 评论
[链接](https://github.com/openai/codex/issues/43803)
当回合最终消息渲染时，等待用户输入的澄清卡片被自动 dismiss，导致问题不可回答。**直接影响交互式 agent 循环的可用性**，macOS + GPT-6-Astra 环境复现。

### ⑥ #7801 — 支持为自动化工作流指定 SessionID ｜ 👍 18
[链接](https://github.com/openai/codex/issues/7801)
长期需求（创建于 2025-12，跨年仍在更新）。用户希望像 Claude Code 一样在管道中预先指定/捕获 session ID，而不必从 `codex exec` 输出里解析。**反映 Codex 作为 CI/自动化组件的嵌入能力缺口**。

### ⑦ #41665 — Windows Desktop exec 静默使用 MSIX 虚拟化 AppData ｜ 10 评论
[链接](https://github.com/openai/codex/issues/41665)
命令执行看到的用户目录是 MSIX 重定向后的路径，而非真实 profile。这是**一整套 Windows 文件系统/沙箱类问题的根因之一**，解释了多个"路径找不到"类报错。

### ⑧ #19676 — workspace-write 沙箱阻断 GPU 访问（bwrap 内无 /dev/nvidia*）
[链接](https://github.com/openai/codex/issues/19676)
Linux 下 bubblewrap 沙箱未 bind-mount `/dev/nvidia*`，任何 CUDA 子进程直接报 "Found no NVIDIA driver"。**对本地 ML 训练/推理工作流是硬性阻断**。

### ⑨ #31991 — 支持 Desktop 通过本地 App Server 直连移动端 SSH/Tailscale 控制 ｜ 👍 7
[链接](https://github.com/openai/codex/issues/31991)
用户希望绕开官方 Remote Control 中继，用自建 Tailscale + SSH 直连桌面端，理由是**中继延迟过高**。反映远程协同场景对低延迟私有链路的需求。

### ⑩ #50123 — 多小时挂起耗尽上下文，/compact 无法恢复会话
[链接](https://github.com/openai/codex/issues/50123)
单个回合持续约 3 小时 19 分钟后以 context-window 错误终止，后续消息与 `/compact` 均失败，只能新建分支会话。**暴露长任务下的上下文管理与恢复机制缺陷**。

> 附注：剪贴板/粘贴回归问题在当日集中关闭，包括 #48040（Fedora）、#48127（Konsole/Wayland）、#49092（mate-terminal）、#48357、#47469（Windows Terminal）、#48474 —— 详情见第 6 节。

---

## 4. 重要 PR 进展

### ① #50113 — 为云线程恢复与附加新增原生 gRPC 客户端
[链接](https://github.com/openai/codex/pull/50113)
新增 `codex-cloud-client` crate，复用共享 HTTP/2 栈实现 `ThreadService.Resume` 与实时 `Attach`，调用方自供 origin、bearer token、account ID。**为云端会话的本地/远程统一接入打地基**。

### ② #50082 — 为全新 V2 subagent 启用动态工具继承
[链接](https://github.com/openai/codex/pull/50082)
此前未 fork 历史而派生的 subagent 拿不到父级的客户端自定义动态工具，导致委派任务无法使用这些工具。新增默认关闭的 `multi_agent_v2_dynamic_tools` 开关。

### ③ #50087 — 会话驱逐时保留排队中的 agent mail
[链接](https://github.com/openai/codex/pull/50087)
此前未读的队列消息会阻止空闲 agent 卸载，且向被驱逐 agent 发消息会重新加载会话。修复后**排队的邮件不再需要接收方占用加载槽位**。

### ④ #50094 — app-server 新增附件归属反查
[链接](https://github.com/openai/codex/pull/50094)
新增 `thread/attachmentOwner/list`，由附件身份反查所属线程 ID 与归档状态。配合 #50083 的分页反查，**补齐附件的双向索引能力**。

### ⑤ #50059 — 修复 Linux 沙箱在多个被拒绝文件下的启动失败
[链接](https://github.com/openai/codex/pull/50059)
Bubblewrap 会消费并关闭每个 `--ro-bind-data` 的 fd，复用同一描述符会导致沙箱无法启动。改为为每个文件掩码单独保留 `/dev/null` fd。**沙箱稳定性修复**。

### ⑥ #50099 — 为 Guardian V2 增加可选的 Decisions 对比
[链接](https://github.com/openai/codex/pull/50099)
新增默认关闭的 `guardianv2_decisions_comparison`，在同一策略与证据下并行运行 Decisions 与 Guardian V2 快照分类，通过 `CODEX_GUARDIAN_DECISIONS_*` 初始化采样器。**安全策略评估链路的灰度能力**。

### ⑦ #50061 — 向 0.159.0-alpha.12 回合移植 MXC PowerShell 修复
[链接](https://github.com/openai/codex/pull/50061)
在精确的父提交上回移公共 #49019，复用未打包的 PowerShell 回退路径用于本地 MXC，服务桌面端 260930 发布列车。

### ⑧ #50058 — Windows 绑定升级至 windows-sys 0.61.2
[链接](https://github.com/openai/codex/pull/50058)
工作区统一 `windows-sys` 版本，迁移依赖 crate，用 `OwnedHandle` 替换自定义句柄持有者并适配新的 boolean/type 定义。**为后续 Windows 平台修复统一底座**。

### ⑨ #50109 — 全屏输入框限制高度并可滚动
[链接](https://github.com/openai/codex/pull/50109)
全屏 composer（含 padding 与提示）最多占三分之二高度，同时保证远端图片附件时仍保留可编辑的输入行。**直接回应长草稿场景的可用性问题**。

### ⑩ #31471 — [faster-connectors] 将 apps 缓存逻辑抽入 ConnectorRuntimeManager（仍 OPEN）
[链接](https://github.com/openai/codex/pull/31471)
将 Codex Apps 工具缓存抽象为 `ConnectorRuntimeManager` / `ConnectorRuntimeContext` 与不可变的 tools+refresh-time 快照，按 account、ChatGPT user、workspace mode、Codex home 作用域隔离并在上下文变更时丢弃陈旧数据。四部曲重构第 1 步。

---

## 5. 功能需求趋势

| 方向 | 代表 Issue | 社区诉求 |
|---|---|---|
| **App 项目管理能力回归** | #49532（👍43）、#49729、#49047 | 恢复分支选择、支持 dot 操作已保存项目、区分云项目与本地项目 |
| **Windows 平台质量** | #49458、#49488、#41665、#46726、#35446 | dot/Work、Computer Use、MSIX 虚拟化、Schannel、沙箱加载 profile —— 当日最大问题簇 |
| **终端剪贴板一致性** | #48040、#48127、#49092、#47469、#48474 | v0.157.0 引入的粘贴回归横跨 Fedora / Konsole / Wayland / mate-terminal / Windows Terminal |
| **CLI/IDE 嵌入与自动化** | #7801（👍18）、#46925、#50118 | SessionID 显式指定、app-server follow-up 丢失、VS Code 回合完成后仍排队 |
| **远程与跨主机协同** | #31991（👍7）、#41580、#49423 | 自建 SSH/Tailscale 直连、Remote CLI 与 Windows Desktop 线程协调 |
| **沙箱能力边界** | #19676 | GPU 直通被 bwrap 阻断，本地 CUDA 工作流不可用 |
| **上下文与长任务** | #50123 | 长回合耗尽 context window，`/compact` 失效且不可原地恢复 |
| **模型行为与回滚** | #50121 | GPT-6.1 Sol xhigh 指令遵循回退，且无法回退到 GPT-5.6 |

---

## 6. 开发者关注点

**1）Windows 是当前最大的质量洼地。** 从 MSIX AppData 虚拟化（#41665）→ 沙箱 Schannel 凭证失败（#46726）→ Computer Use 死锁（#35446）→ dot 工具链缺失（#49458 / #49488 / #49423），形成一条清晰的**平台底层缺陷向应用层传导的链路**。多个 Issue 反复出现 `DesktopTaskWorkspaceUnavailableError` 等难以定位的错误码。

**2）剪贴板/粘贴回归积压严重。** v0.157.0 引入的终端粘贴回归横跨 6 个以上终端环境，当日集中关闭一批，但修复较晚才以"Linux X11 中键粘贴"形式进入稳定版。**回归测试对终端/输入路径的覆盖明显不足**。

**3）Agent 委派链路的可靠性缺口。** dot → 本地任务 → 项目线程 → 跟进消息这条路径上至少三处断裂（#49458 / #49729 / #49883），委派完成后还会停滞并需要反复提醒。

**4）交互式提问环节脆弱。** `request_user_input_async` 卡片被自动关闭（#43803），Windows 下只渲染纯文本选项无交互控件（#43753）——**clarification 是 agent 闭环的关键节点，当前实现不够健壮**。

**5）自动化接入体验落后于同类工具。** SessionID 需求挂了一年多仍未落地（#7801），用户只能从 `codex exec` 标准输出里"抠"出 ID，反映 Codex 在作为流水线组件时的接口成熟度不足。

**6）缺少降级与回滚手段。** 报告模型回退时（#50121），用户明确指出无法退回旧模型版本；上下文耗尽时（#50123）也无法原地恢复会话，只能新建分支。**稳定性兜底机制是普遍诉求**。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# 2026-10-02 Gemini CLI 社区动态日报

> 数据来源：github.com/google-gemini/gemini-cli，基于过去 24 小时更新整理。

## 1. 今日速览

今日核心动态集中在 **稳定性修复与子代理可靠性**：v0.64.0 nightly 修复了 `@` 触发 CPU hang、引号吞噬，以及文件工具串行化/原子写；Issue 区子代理挂起、MAX_TURNS 误报成功仍是最高热度；PR 区多笔 p1 修复聚焦会话历史丢失、状态持久化、Ctrl+C 中止和不受信工作区安全边界。

## 2. 版本发布

- **v0.64.0-nightly.20261001.gc6bccb7ec**  
  主要修复：
  - `fix(cli)`：防止代码中 `@` 导致 CPU hang 和引号吞噬，相关 PR #29557。
  - `fix(core)`：序列化文件工具操作并让写入原子化，相关 PR #29078。  
  链接：https://github.com/google-gemini/gemini-cli/releases/tag/v0.64.0-nightly.20261001.gc6bccb7ec

## 3. 社区热点 Issues

1. **#22323 [OPEN][p1/bug] 子代理达到 MAX_TURNS 却报告 GOAL 成功**  
   评论 13、👍2，是今日讨论最热 Issue。问题在于子代理中断被伪装成成功，会严重影响用户判断和评测可信度。  
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **#21409 [OPEN][p1/bug] Generalist agent 永久挂起**  
   评论 8、👍8，点赞最高。用户反馈只要委托给 generalist agent 就可能无限挂起，禁用子代理可绕过，说明 Agent 编排路径存在阻塞风险。  
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **#19873 [OPEN][p2/enhancement] 零依赖 OS 沙箱与执行后意图路由**  
   评论 9。提出在安全沙箱中利用 Gemini 对 bash/POSIX 工具的亲和性，兼顾能力与安全，属于 Agent 执行架构方向的重要提案。  
   https://github.com/google-gemini/gemini-cli/issues/19873

4. **#22745 [OPEN][p2/feature] 评估 AST-aware 文件读取、搜索与代码库映射**  
   评论 7。目标是减少误读、降低 token 噪音、提升代码库理解效率，是代码理解能力的长期 EPIC。  
   https://github.com/google-gemini/gemini-cli/issues/22745

5. **#21968 [OPEN][p2/bug] Gemini 不够主动使用 skills 和 sub-agents**  
   评论 6。用户反馈即使场景高度相关，模型也不会自动调用自定义技能或子代理，需要显式指令，影响 Agent 自动化体验。  
   https://github.com/google-gemini/gemini-cli/issues/21968

6. **#22267 [OPEN][p2/bug] Browser Agent 忽略 settings.json 覆盖项**  
   评论 4。例如 `maxTurns` 等配置在 AgentRegistry 中读取成功，但 Browser Agent 实际运行不生效，暴露配置传递链路问题。  
   https://github.com/google-gemini/gemini-cli/issues/22267

7. **#22232 [OPEN][p3/feature] 增强 browser_agent 会话接管与锁恢复**  
   评论 4。当前浏览器 profile 锁采用 fail-fast，遇到残留进程或持久会话时体验较差，需要自动恢复能力。  
   https://github.com/google-gemini/gemini-cli/issues/22232

8. **#21983 [OPEN][p1/bug] browser subagent 在 Wayland 下失败**  
   评论 4、👍1。Wayland 是 Linux 桌面主流方向，浏览器子代理兼容性会直接影响 Linux 开发者采用。  
   https://github.com/google-gemini/gemini-cli/issues/21983

9. **#24246 [OPEN][p2/bug] 工具数量过多触发 400 错误**  
   标题指出 >128 tools，摘要称 >400 tools 时发生 400 错误。说明工具规模扩展后，模型/API 侧需要更智能的工具筛选与作用域控制。  
   https://github.com/google-gemini/gemini-cli/issues/24246

10. **#22672 [OPEN][p2] Agent 应停止/劝阻破坏性行为**  
    评论 3、👍1。涉及 `git reset`、`--force`、数据库修改等危险操作，社区希望默认更安全、更保守。  
    https://github.com/google-gemini/gemini-cli/issues/22672

## 4. 重要 PR 进展

1. **#29457 [OPEN][p1] 用 glob 匹配替换 read-many-files 的模糊 requestedExplicitly 逻辑**  
   修复二进制资产被误判为“显式请求”导致上下文膨胀的问题，属于核心上下文管理修复。  
   https://github.com/google-gemini/gemini-cli/pull/29457

2. **#29582 [OPEN][p1] 优化 ignore 过滤并启用子树剪枝**  
   面向大型仓库的文件发现性能优化，引入目录级状态记忆、通配符展开和 symlink/realpath 缓存，解决多秒阻塞。  
   https://github.com/google-gemini/gemini-cli/pull/29582

3. **#29584 [OPEN][p1] 防止快速退出删除已恢复会话历史**  
   修复恢复会话后快速 `Ctrl+C` 或 `/exit` 可能永久删除历史文件的严重数据丢失问题。  
   https://github.com/google-gemini/gemini-cli/pull/29584

4. **#29502 [OPEN][p1] 确保 Enter 和 Spacebar 可靠确认选择列表**  
   覆盖 `useSelectionList`、`RadioButtonSelect`、工具确认和 AskUserDialog，提升跨终端交互可靠性。  
   https://github.com/google-gemini/gemini-cli/pull/29502

5. **#29586 [CLOSED][p2] 确保 Ctrl+C 紧急中止到达取消处理器**  
   修复活动操作中 `Ctrl+C` 被吞掉或损坏的问题，让用户能可靠中断 Agent/流式输出。  
   https://github.com/google-gemini/gemini-cli/pull/29586

6. **#29558 [CLOSED][p1] 原子持久化状态并从备份恢复损坏状态**  
   针对 `~/.gemini/state.json` 引入临时文件、fsync、原子 rename、`.bak` 轮换和 `.corrupt` 保留，降低状态丢失风险。  
   https://github.com/google-gemini/gemini-cli/pull/29558

7. **#29581 [CLOSED][p2] 解析 @file:line 引用并防止 ghost text 换行挂起**  
   修复 `@file:10`、`@file#L10-L25` 等引用失败，以及窄终端/宽字符下 InputPrompt 无限循环。  
   https://github.com/google-gemini/gemini-cli/pull/29581

8. **#29583 [OPEN][p1] 在不受信文件夹中强制工作区设置为只读**  
   防止在未验证工作区执行 `gemini mcp add` 等配置写入时，因同步遗漏覆盖破坏性设置，是安全边界增强。  
   https://github.com/google-gemini/gemini-cli/pull/29583

9. **#28738 [OPEN][p2] 允许 agents 调用 agents**  
   通过 frontmatter 的 `tools:` 让子代理委派给其他子代理或递归调用自身，推进多 Agent 编排能力。  
   https://github.com/google-gemini/gemini-cli/pull/28738

10. **#29568 [CLOSED][p1] ChatRecordingService 引入 append-only delta 与有界历史窗口**  
    替换全历史重写和无界内存保留，改善聊天记录性能、内存占用与长期会话稳定性。  
    https://github.com/google-gemini/gemini-cli/pull/29568

## 5. 功能需求趋势

- **子代理与 Agent 编排可靠性**：挂起、MAX_TURNS 误报、自动调用技能不足、递归委派、后台化、轨迹可见性，是当前最集中方向。代表：#22323、#21409、#21968、#28738。
- **安全沙箱与权限边界**：社区希望充分利用 bash 能力，同时默认阻止破坏性操作、隔离不受信工作区、支持每工作区策略。代表：#19873、#22672、#29583。
- **上下文与 token 效率**：AST-aware 读取/搜索、Tactful Extraction、持久化文件任务追踪、避免二进制误入上下文。代表：#22745、#19561、#18836、#29457。
- **跨平台兼容性**：Windows 文件锁、ConPTY IME、Wayland 浏览器子代理、终端选择/滚动/中断等平台差异问题持续出现。代表：#21983、#29560、#29540。
- **性能与稳定性**：大型仓库 ignore 过滤、聊天历史增量写入、终端 resize 防闪烁、避免 CLI hang。代表：#29582、#29568、#21924。
- **配置与企业治理**：settings.json 覆盖不生效、`/policy` 模式展示、工作区级策略、评测稳定化。代表：#22267、#16772、#18397。
- **工具规模管理**：工具数量超过阈值导致 400 错误，需要更智能的工具筛选与模型可见性控制。代表：#24246。

## 6. 开发者关注点

- **稳定性优先**：挂起、崩溃、数据丢失和无法中断仍是高频痛点，尤其子代理和快速退出场景。
- **子代理黑盒感强**：失败被报告为成功、bug report 缺少子代理上下文、轨迹难分享，削弱可观测性和信任。
- **配置不生效**：Browser Agent 忽略 `settings.json` 等案例说明配置读取与运行时消费链路仍需统一。
- **平台差异显著**：Windows 文件锁/IME、Wayland、终端选择列表和滚动行为，是跨平台体验的主要阻力。
- **上下文成本敏感**：大文件读取、二进制资产误读、临时脚本散落，都会增加 token 成本和工作区清理负担。
- **安全默认值不足**：危险 git 操作、数据库修改、不受信工作区设置写入，需要更明确的默认防护和沙箱策略。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报（2026-10-02）

## 1. 今日速览
- Reasonix CLI / Desktop v1.39.6 稳定版发布，集中修复连接中断、配置告警、Windows shell 及桌面端会话问题。
- Reasonix Studio v2.24.0 上线应用内反馈与“每模型独立上下文设置”，并修复远程中转断线、启动误报等问题。
- 社区讨论集中在工作区写锁、会话并发、移动端体验和数据丢失类 Bug，多个高优 Issue 已有对应 PR 推进。

## 2. 版本发布

### v1.39.6（CLI / Desktop）
- **更新内容**：修复升级后清不掉的配置告警、停顿后连接已断导致的请求失败、Windows 上的 shell 命令问题，以及多处桌面端会话与侧边栏问题。
- **发布渠道**：稳定版 · v1.39.6。
- **链接**：[GitHub Releases v1.39.6](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v1.39.6) · [完整更新日志](https://reasonix.io/changelog/v1.39.6/)

### studio-v2.24.0（Reasonix Studio）
- **新增**：
  - 应用内反馈：可附截图和昵称，获得受理编号，并在「我的反馈」查看进度、维护者回复和追问。
  - 终端支持 `/feedback`，可提交反馈、查看进度并回复。
  - 每个模型可单独设置上下文窗口和最大输出，未设置的沿用服务商值。
- **修复**：重启后首次启动误报、远程中转断线原因不明等问题。
- **链接**：[GitHub Releases studio-v2.24.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.24.0)

## 3. 社区热点 Issues（10 个）

1. **#11338 [OPEN] [bug, desktop, v2, windows] 1.39.5 工具不能折叠**
   - 高热度 Bug，评论 13 条。用户反馈“查看执行过程”时工具卡片无法折叠，影响桌面端长会话阅读。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11338

2. **#11531 [OPEN] [desktop, agent, windows, v3] Studio 工作区写租约请提供总开关，并把互斥细化到真实同路径写入**
   - 评论 4 条。同一项目多会话时，一个会话拿到写租约会导致其他会话整轮卡死；只读操作也被当成写入，ask/等用户期间不释放。影响并行工作流。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11531

3. **#11581 [OPEN] [desktop, windows, data-loss] v1.39.6 归档遗留行导入恢复快照为新会话**
   - 数据丢失类问题，评论 3 条。此前 #11309 的修复未覆盖该路径，归档遗留行时会导入另一份恢复快照并新建会话。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11581

4. **#11619 [OPEN] [bug, v2, mcp, linux] SSH 时无法正确调用服务器 npm，导致连接不上**
   - 评论 4 条。远程已连上但 bootstrap 报 `npm: not found`，服务器实际 npm 正常。影响远程开发与 MCP 使用。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11619

5. **#11621 [OPEN] [desktop, v2, windows, data-loss] 桌面版 1.39.6 — 切换会话后上下文环显示偏大估算值，会话请求数/遥测归零**
   - 数据统计丢失，评论 1 条。切换会话后请求数、Token、成本、读文件记录全部归零，上下文环显示异常。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11621

6. **#11606 [OPEN] [bug, agent, config, windows, v3] 旧 Session 无法热更新 user-scope Standing Instructions**
   - 评论 1 条。全局 `REASONIX.md` 修改后，设置页和 `/memory instructions` 能读到新内容，但旧会话不生效，影响配置热更新。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11606

7. **#11615 [OPEN] [bug, desktop, v3] 移动端用量无法正常显示**
   - 评论 2 条。移动端查看当天/7天/30天用量时无法精确到具体日期，来源 UUID 标识也影响模型用量识别。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11615

8. **#11607 [OPEN] [enhancement, from-studio] 目前 reasonix 不支持在会话中开分支会话**
   - 评论 1 条。用户希望像 zcode/codex 一样复制会话并探索不同目标，认为这是功能缺口，需要排期。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11607

9. **#11605 [OPEN] [enhancement, from-studio] 建议在会话右键增加“一键复制会话信息”**
   - 评论 2 条。希望复制会话 ID、上下文路径、任务路径、任务日志，便于在不同 agent 之间接力会话。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11605

10. **#11577 [OPEN] [enhancement, from-studio] 建议在外观设置项添加字体大小设置**
    - 评论 6 条。UI 部分字体过小且有锯齿，不易辨识，社区希望开放自定义字体大小。
    - 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11577

## 4. 重要 PR 进展（10 个）

1. **#11620 [OPEN] fix(studio): keep Enter newline on touch-first devices**
   - 在触控优先设备上，Enter 保持换行，提交由 Send/Steer 按钮负责。对应 Issue #11616。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11620

2. **#11591 [OPEN] feat(studio): 重命名弹窗与最近消息自动命名**
   - 会话重命名改为弹窗，支持手动输入和“自动命名”；新增 `POST /tree/sessions/auto-name` 接口，根据最近用户消息重新生成标题。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11591

3. **#11628 [CLOSED] fix(desktop): keep session telemetry across switches for canonical sessions**
   - 修复 v5 store 中 canonical session 无 transcript path 导致遥测 sidecar 未写入、切换会话后请求数/Token/成本归零的问题。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11628

4. **#11624 [CLOSED] fix(remote): run bootstrap commands with the remote login-shell PATH**
   - 远程 bootstrap 改用远程用户登录终端的 PATH，解决通过 nvm/fnm/volta 安装的 npm 或 reasonix 找不到的问题。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11624

5. **#11622 [OPEN] fix(remote): inherit login shell PATH for SSH bootstrap**
   - 与 #11624 同方向，捕获远程登录 shell 的真实 PATH，修复 SSH exec 非登录 shell 导致的 `npm: not found`。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11622

6. **#11613 [CLOSED] fix(studio): let browser deployments add workspaces by path**
   - 浏览器端部署、无桌面壳时，内核无法打开原生文件夹选择器，改为通过 `POST /tree/workspaces` 按路径添加工作区。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11613

7. **#11625 [CLOSED] fix(desktop): fold a turn cut by a page boundary and load the next page at the bottom**
   - 修复历史分页截断 turn 时尾部工具卡片无法折叠的问题，并在底部加载下一页。对应 #11338。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11625

8. **#11632 [CLOSED] fix(studio): stop single-line labels from clipping glyphs of tall fonts**
   - 修复高字体下侧边栏标签、模型名、文件名上下裁切的问题，调整 `overflow: hidden` 与省略号逻辑。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11632

9. **#11611 [CLOSED] fix(studio): retain retry for returned MCP install failures**
   - MCP 安装返回 `state=issue` 且 `action=retry` 时，Studio 不再将其视为完成，保留重试入口。
   - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11611

10. **#11610 [CLOSED] fix(serve): archive a legacy recovery lineage atomically**
    - 归档折叠的 legacy/recovery 行时，连同同一谱系的所有 recovery 兄弟节点一起原子归档，避免只写可见 lead 的 sidecar 导致数据不一致。
    - 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11610

## 5. 功能需求趋势

- **移动端与触控体验**：换行与提交分离、用量按日期区间查看、移动端 UI 兼容性、远程扫码连接稳定性。
- **会话管理与可移植性**：会话分支、一键复制会话信息、重命名/自动命名、归档与恢复、跨会话遥测持久化。
- **并行工作区与写锁机制**：写租约总开关、按真实同路径细化互斥、只读不阻塞、等待用户期间释放锁。
- **远程 / SSH 连接可靠性**：登录 shell PATH 继承、npm 发现、远程中转断线原因可见。
- **UI 可定制与可读性**：字体大小调节、抗锯齿、标签防裁切、状态栏数字稳定、界面缩放适配。
- **后台任务与子代理可见性**：长时间运行后台应用/子代理、查看运行中的进程、等待结束后继续。
- **跨版本配置同步**：1.x 与 2.x 模型设置解耦，避免切换模型时互相影响。
- **MCP / 插件生态**：安装失败可重试、热重载失败与安装失败并列展示、恢复指引清晰。

## 6. 开发者关注点

- **数据安全与状态一致性**：归档遗留行导入恢复快照、切换会话遥测归零等 data-loss 类问题优先级高，开发者需要原子写入和持久化侧车文件。
- **工作区写锁设计争议**：当前写租约过于粗粒度，导致同项目多会话完全阻塞，且缺乏中断/总开关入口，社区要求细化到真实同路径写入并释放只读场景。
- **远程连接环境问题**：SSH bootstrap 不继承登录 shell PATH，导致 npm/reasonix 找不到；远程中转断线原因不透明，影响远程开发与 MCP 使用。
- **移动端交互与显示**：回车误发、无法换行、用量显示异常、触控优先设备交互未适配，是移动端高频反馈。
- **旧会话配置热更新**：全局 `REASONIX.md` 修改后旧会话不生效，开发者期望无需新建会话即可热加载指令。
- **对标竞品的功能缺口**：社区多次提及 codex、zcode，期望补齐会话分支、一键复制会话信息、后台子代理查看等能力。
- **UI 细节影响体验**：字体大小/锯齿、字体裁切、状态栏数字跳动、缩放后裁切等问题虽小，但反馈集中，影响日常使用舒适度。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 · 2026-10-02

---

## 1. 今日速览

今天社区动态几乎被 **OpenCode Go 订阅故障** 刷屏：过去 24 小时新增 5 条相关投诉（付款未激活、重复扣费、403、状态加载失败），横跨多个地区。同时安全层面出现一条重要问题：**"已脱敏的密钥仍以明文留在 `opencode.db` 事件日志中"**（#52586），以及 V2 核心行为缺陷（formatter 配置不合并、子代理报错被当作成功）。PR 侧以"历史积压清理"为主，但已有针对 Windows 控制台闪烁与空闲驱逐提示的实质修复。

---

## 2. 版本发布

过去 24 小时 **无新 Release**。

---

## 3. 社区热点 Issues（10 条）

**1. [#52586 [BUG/SECURITY] 脱敏密钥以明文残留在 opencode.db 事件日志中](https://github.com/anomalyco/opencode/issues/52586)**
安全类最高优先级。脱敏钩子 `tool.execute.after` 只在工具**完成后**触发一次，但流式工具（bash/shell）在执行过程中**逐块**把原始输出写入 `event` 表，导致密钥在钩子生效前就已落盘。这是当前唯一的安全标签 Issue，建议优先关注。

**2. [#52597 core: 空闲驱逐中断运行时，工具失败信息丢失原因](https://github.com/anomalyco/opencode/issues/52597)**
60 分钟空闲驱逐（#51343）打断运行后，工具失败只报笼统的 "Tool execution interrupted"，而调度器其实记录了 `reason: "inactivity"`。直接影响可观测性与排障体验。

**3. [#52590 V2: 项目级 formatter 配置整体替换而非合并全局配置](https://github.com/anomalyco/opencode/issues/52590)**
V2 配置合并语义的回归。仓库级 `.opencode/opencode.jsonc` 只覆盖 `biome`，却把全局的 `markdown` formatter 等条目全部顶掉。属于影响面较广的配置行为缺陷（今日 0 评论，可能尚未被充分注意）。

**4. [#52378 subagent: `finish:"error"` / `MALFORMED_FUNCTION_CALL` 被上报为成功完成](https://github.com/anomalyco/opencode/issues/52378)**
子代理最后一次 assistant 消息以 `finish:"error"`、`content:[]`、0 output tokens 结束，OpenCode 却把子会话置为 `idle` 并告知父会话"成功"。这是错误传播链上的静默失败，对 Agent 编排可信度影响很大。

**5. [#51993 go: 新增图片时 deepseek-v4.1-flash 的 prompt cache 回退到首张图](https://github.com/anomalyco/opencode/issues/51993)**
会话新增图片（用户附件或 `read` 工具结果）后，prompt cache 最多只匹配到第一张已有图片，其后全部作为未缓存输入重新处理。直接转化为成本与延迟上涨。

**6. [#42440 [CLOSED] [2.0] Windows: 每次 spawn 子进程都闪黑窗](https://github.com/anomalyco/opencode/issues/42440)**
长时间跟踪的老问题（8 月创建，12 条评论），今日关闭。每次 agent 执行 shell 命令（git/node/PowerShell）都会闪一个控制台窗口，对 Windows 用户体验影响明显。对应修复 PR 见 #52594。

**7. [#49561 [Desktop] 从侧边栏新建的会话永不响应](https://github.com/anomalyco/opencode/issues/49561)**
Desktop（Windows 11）点击 "+ New session" 后消息无任何回复、UI 无报错；同一项目/Provider 下 CLI 正常。根因指向 `prompt_async` 失败：`FileSystem.realPath ENOENT`（worktree 目录缺失）。今日唯一有 👍（1）的 Issue。

**8. [#49184 Go 付费订阅未激活 — DeepSeek 模型要求 Global 区域](https://github.com/anomalyco/opencode/issues/49184)**
用户 9/11 支付 $10，Go 页面仍显示 "Subscribe to Go"；API Key 有效、`/zen/go/v1/models` 正常返回 DeepSeek V4.1 Flash / V4 Pro / V4 Flash，但实际不可用。属于区域/账号绑定的后端问题。

**9. [#52592 [needs:compliance] 被重复扣费？](https://github.com/anomalyco/opencode/issues/52592)**
用户 19:00 ET 因账号停用再次支付 $10 并成功激活，随后发现当日凌晨 3 点已扣过一次款，且那次**没有**重置用量。涉及计费一致性，已进入合规标签流程。

**10. [#52593 Go 订阅状态加载失败，无模型可选（印尼新订阅用户）](https://github.com/anomalyco/opencode/issues/52593)**
订阅约 12 小时后完全不可用：App 内无法选择任何模型，Web 控制台 Go 页报 "Could not load Go subscription status"。

> 同批还有 #52595（"Where's GO subscription???"，标签 needs:compliance）、#52596（付款次日 403）、#52589（西班牙语，发票号 TISE75XW-0002，应用仍要求订阅）三条同类投诉。以及已关闭的 #52591（Web PDF 预览被 CSP 拦截，缺 `frame-src`/`object-src`）。

---

## 4. 重要 PR 进展（10 条）

**1. [#52594 fix(cli): 为 Windows 服务提供隐藏控制台](https://github.com/anomalyco/opencode/pull/52594)**
`Closes #51887 #50868`，`Refs #42440 #45259`。客户端以 `detached: true` 启动共享服务导致控制台窗口闪烁，本 PR 从根本上消除该现象——今日最值得关注的修复。

**2. [#52587 fix(core): 在被打断的工作中上报空闲驱逐原因](https://github.com/anomalyco/opencode/pull/52587)**
`Closes #52597`。让 `reason: "inactivity"` 真正传递到工具失败信息中，替代笼统的 "Tool execution interrupted"。

**3. [#52588 fix(session): 边界末位删除已回退消息，并按原始顺序做 ID 决胜](https://github.com/anomalyco/opencode/pull/52588)**
`Closes #42816`（第 1、2 项），取代已因 stale 被自动关闭的 #42819。修复会话回退/删除时的消息边界与排序问题。

**4. [#48808 fix(app): 在新布局中播放权限提醒](https://github.com/anomalyco/opencode/pull/48808)**
`Closes #37120`。新布局启用后审批请求静默、无桌面通知，导致 macOS 通知授权提示不触发。长时间挂起的 PR，今日终于有更新。

**5. [#46609 feat(ai): 支持 freeform 工具表示](https://github.com/anomalyco/opencode/pull/46609)**
为对象入参工具引入规范化 freeform 表示，支持可选 OpenAI grammar 方言；可将 GPT-5 Responses 工具降级为 custom tool call，同时保留 JSON-function 回退。

**6. [#46632 fix(desktop): 加固打包后的 Electron](https://github.com/anomalyco/opencode/pull/46632)**
禁用 `RunAsNode`、`NODE_OPTIONS` 与 CLI inspector 入口，关闭多余的 `file://` 特权（渲染进程改用 `oc://`），强制从 ASAR 加载并启用 ASAR 完整性校验。

**7. [#46657 feat(session-ui): 通过折叠块暴露推理与工具细节](https://github.com/anomalyco/opencode/pull/46657)**
`Closes #21549 #21548`。把模型 reasoning 部分包进带"Thinking"标题与大脑图标的可折叠卡片，改善长会话可读性。

**8. [#46670 feat(app): 新增会话历史侧边栏](https://github.com/anomalyco/opencode/pull/46670)**
为 v2 布局加入持久的项目 / 会话侧栏，替换浮动的会话标签页并统一控件对齐。

**9. [#46667 feat(ui): 支持从 URL 加载自定义主题](https://github.com/anomalyco/opencode/pull/46667)**
`Closes #46668`。在 Settings → General 增加 "Custom theme URL"，可加载未随应用打包的私有 `DesktopTheme` JSON。

**10. [#52515 chore(stats): 下线遗留 S3 lake](https://github.com/anomalyco/opencode/pull/52515)**
移除已停用的 S3 table、catalog、Athena workgroup、查询结果与投递错误桶；将 LakeVpc / LakeCluster 迁入 `stats.ts` 以保持 R2 统计同步的网络与服务不变。

> 其余可见项：#51640（review 面板展示"最后一轮"改动，已关闭）、#46676（剔除 Gemini 工具 schema 中的空字符串 enum）、#46630（`@solidjs/start` 从 pkg.pr.new 切回 npm 2.0.4）、#46621（稳定 TUI jump-latest 测试固件）、#46616（复现批处理期间 OAuth refresh 遗漏）。

---

## 5. 功能需求趋势

从本轮 14 条 Issue 与 20 条 PR 中可提炼出以下方向：

- **计费与订阅系统稳定性（当前最紧迫）**：Go 订阅相关 Issue 占今日新增近三分之一，覆盖"付款不激活 / 重复扣费 / 区域限制 / 状态接口不可用"四类。已统一打上 `needs:compliance` 标签，说明社区侧已将其作为流程问题处理。
- **Windows 平台体验**：控制台闪烁（#42440）、Desktop 新建会话不响应（#49561）、路径分隔符处理（#46659）——Windows 是当前问题密度最高的平台。
- **V2 配置与行为一致性**：formatter 配置不合并（#52590）暴露出 V2 在"全局 vs 项目级配置合并语义"上的系统性风险点，同类问题可能还会出现。
- **Agent 编排的可观测性与错误传播**：子代理错误被上报为成功（#52378）、工具失败丢失原因（#52597）——社区开始关注"Agent 跑完了但结果不可信"这类静默失败。
- **会话 UI 深化**：会话历史侧边栏（#46670）、reasoning 折叠块（#46657）、review 面板最后一轮 diff（#51640）、首页会话控件（#46655）——v2 布局的对话内信息组织正在被系统性地补齐。
- **模型适配与成本**：DeepSeek V4 系列 prompt cache 回退（#51993）、Gemini 空 enum 兼容（#46676）、GPT-5 Responses freeform 工具（#46609）——多模型适配仍是 PR 主力。
- **桌面端与供应链安全**：Electron 加固（#46632）、密钥残留明文落库（#52586）显示安全议题正在上升。

---

## 6. 开发者关注点

1. **密钥脱敏是"事后"的，不可信**（#52586）：流式输出的逐块落盘绕过了 `tool.execute.after` 钩子。这是设计层面的时序缺陷——脱敏必须发生在写入路径上，而不只是工具生命周期钩子上。
2. **订阅系统是当前最大的信任缺口**：一天内多条付费用户投诉，且部分用户"付了两次、用量未重置、账号显示 403"。对开发者工具而言，付费→可用这条链路的中断是最伤口碑的故障类型。
3. **静默失败比显式报错更危险**：子代理报错被记为成功（#52378）、工具中断原因被抹平（#52597）、Desktop 新会话无任何 UI 报错（#49561）——三条都指向"用户/父会话拿不到真实状态"。
4. **V2 配置语义需要明确契约**：项目级配置"替换"还是"合并"全局配置，目前行为与用户预期相反（#52590），建议在文档与实现上同步固化。
5. **大量 `automated-pr-cleanup` 关闭项**：今日出现的多条 9 月初关闭 PR 带此标签，说明维护者正在批量清理积压，长期挂起的优质修复（如 #48808）需要被重新推进而非静默关闭。

---

*数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode) · 报告日期 2026-10-02*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报（2026-10-02）

## 今日速览
今日无新版本发布。过去24小时内 4 条 Issue 更新、50 条 PR 更新，社区焦点集中在 **gateway 重启/更新被 cron 任务长时间阻塞**、**辅助端点 API 密钥明文写入 config.yaml**、以及 **会话恢复可能重复副作用工具调用** 等 P1/P2 问题。PR 侧已出现对应修复，同时跨 gateway 文档传递、Discord 角色授权交互、Bot 隐私控制等功能推进明显。

## 版本发布
无新版本发布。

## 社区热点 Issues
过去24小时仅有 4 条 Issue 更新，以下为全部条目：

1. **#130987 [P1][OPEN] gateway: restart wait holds for cron runs that already outlive the restart**
   - 链接：https://github.com/NousResearch/hermes-agent/issues/130987
   - 重要性：`hermes update` / `hermes gateway restart` 可能被独立 systemd scope 中的 cron run 拖住最长 30 分钟，期间 gateway 处于 draining 并拒绝 turn，直接影响升级与可用性。
   - 社区反应：2 条评论，P1 高优先级。

2. **#130970 [P3][needs-decision][OPEN] Plugin hooks for agent close cleanup and background-work status**
   - 链接：https://github.com/NousResearch/hermes-agent/issues/130970
   - 重要性：外部任务编排插件需要 agent 关闭清理和后台工作状态钩子，当前缺少上游支持，影响插件生态扩展。
   - 社区反应：1 条评论，需要决策。

3. **#131016 [P3][security][OPEN] auxiliary custom-endpoint API keys are written in plaintext to config.yaml**
   - 链接：https://github.com/NousResearch/hermes-agent/issues/131016
   - 重要性：通过 `hermes model` 辅助选择器或 dashboard 配置自定义端点时，API key 明文写入 config.yaml，存在泄露风险，并与已有 `.env` 迁移方向不一致。
   - 社区反应：暂无评论，但安全标签明确。

4. **#131019 [P2][OPEN] resume erases a killed turn's side-effecting tool call, so the model can repeat it**
   - 链接：https://github.com/NousResearch/hermes-agent/issues/131019
   - 重要性：恢复会话会擦除被杀死 turn 的副作用工具调用，导致模型可能重复执行，且 UNKNOWN-effect 恢复逻辑未触发，涉及状态一致性与安全。
   - 社区反应：暂无评论，P2 标签。

## 重要 PR 进展
过去24小时共 50 条 PR 更新，以下挑选 10 条重要进展：

1. **#130988 [P1] fix(gateway): restart wait must not hold for cron runs in their own restart-safe scope**
   - 链接：https://github.com/NousResearch/hermes-agent/pull/130988
   - 对应 #130987，修复 gateway 重启时被独立 systemd scope 中 cron run 阻塞的问题。

2. **#130303 [P2][security] fix(discord): role-authorized member's speech, native slash commands and /thread starters reach the agent**
   - 链接：https://github.com/NousResearch/hermes-agent/pull/130303
   - 修复 Discord 角色授权成员的语音、原生斜杠命令和 `/thread` starter 无法到达 agent 的问题，涉及授权与安全边界。

3. **#131017 [P3][security] fix(model): auxiliary custom-endpoint keys go to .env, not config.yaml**
   - 链接：https://github.com/NousResearch/hermes-agent/pull/131017
   - 对应 #131016，将辅助自定义端点 API key 迁移到 `.env`，避免明文写入 config.yaml。

4. **#131020 [P2] fix(agent): a resumed session keeps a killed turn's side-effecting tool call**
   - 链接：https://github.com/NousResearch/hermes-agent/pull/131020
   - 对应 #131019，恢复会话时用 UNKNOWN-effect 结果回答未完成工具调用，防止模型重复执行副作用操作。

5. **#131022 feat(groups): deliver documents to Bots on other gateways**
   - 链接：https://github.com/NousResearch/hermes-agent/pull/131022
   - 支持通过 Group Chat 向其他 gateway 上的 Bot 发送文件/PDF，接收端保留私有 admission-bound 副本，推进跨 gateway 协作。

6. **#131021 fix(cron): keep jobs.json mode across saves in containers**
   - 链接：https://github.com/NousResearch/hermes-agent/pull/131021
   - 修复容器环境中保存 `jobs.json` 时权限被强制为 0600 的问题，保持原有文件模式。

7. **#131014 [P3] fix(desktop): fail closed on unresolved bot chats**
   - 链接：https://github.com/NousResearch/hermes-agent/pull/131014
   - 桌面端无法解析 bot 聊天时改为失败关闭，而非回退到 `newBotChat` 并误报成功，提升会话隔离与可靠性。

8. **#131013 [P2] fix(tools): apply EXIF orientation before resizing vision images**
   - 链接：https://github.com/NousResearch/hermes-agent/pull/131013
   - 在视觉工具中调整图像大小前应用 EXIF 方向，修复手机竖拍照片方向错误。

9. **#127835 [P3] feat(skills): skills.enabled allowlists and external_dirs filters on one shared visibility check**
   - 链接：https://github.com/NousResearch/hermes-agent/pull/127835
   - 统一技能可见性检查，增加 `skills.enabled` 白名单和 `external_dirs` 过滤，回应多个技能管理 Issue。

10. **#104876 [P3] feat(bot-mode): per-agent `private` flag and install-wide `bots.force_private`**
    - 链接：https://github.com/NousResearch/hermes-agent/pull/104876
    - 为 Bot Mode 增加每 agent `private` 标志和安装级强制私有配置，控制跨机器 relay 中 agent 的可见性。

## 功能需求趋势
- **安全与密钥管理**：明文密钥写入 config.yaml、Discord 角色授权边界、辅助端点密钥迁移，安全类标签频繁出现。
- **多 gateway / 跨机器协作**：文档跨 gateway 传递、bot-relay 友好名解析、多 profile 子进程命名，社区正在扩展分布式 agent 协作。
- **会话与状态一致性**：恢复会话副作用重复、worker 存活误判、预览标签会话隔离，状态恢复可靠性是高频主题。
- **插件与技能生态**：插件生命周期钩子、技能 allowlist/外部目录、技能解析不致命，开发者需要更灵活的扩展机制。
- **自动化可靠性**：cron 重启阻塞、`jobs.json` 权限、kanban 阻塞循环/队列监控，定时任务与看板自动化持续修补。
- **桌面端体验**：bot 聊天失败关闭、YouTube embed 崩溃、预览标签作用域，桌面客户端稳定性与隔离性受关注。
- **权限与隐私控制**：Bot Mode private 标志、estop 白名单，运营者需要更细粒度的权限和暂停控制。

## 开发者关注点
- **P1 可用性**：gateway 重启/更新被 cron 任务阻塞最长 30 分钟，直接拒绝用户 turn，是今日最高优先级痛点。
- **安全合规**：辅助端点 API key 明文存储可能随 config.yaml 进入 bug 报告，开发者明确要求迁移到 `.env`。
- **状态恢复风险**：会话恢复擦除副作用工具调用，可能导致重复执行，开发者强调 UNKNOWN-effect 恢复必须运行。
- **插件扩展缺口**：外部任务编排插件缺少 agent 关闭清理和后台工作状态钩子，需要上游提供稳定生命周期接口。
- **跨 gateway 协作**：文档传递、Bot 友好名解析、profile 环境变量传递等需求表明多 gateway 部署正在成为常态。
- **自动化误判**：kanban 将人工升级误交给分解器、worker 被误判死亡后重复生成，运营自动化需要更保守的状态判断。
- **桌面端隔离**：预览标签、bot 聊天解析等需要严格限定到所属会话，避免跨会话串扰。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 — 2026-10-02

## 今日速览
过去24小时 OpenClaw 无新版本发布。社区焦点集中在两个 P1 级 Issue：长期存在的 hook/tool 子进程泄漏导致僵尸进程累积，以及敏感值脱敏过度导致 agent 无法自纠正。PR 侧则围绕 2026.9.8 发布候选回移、会话/更新可靠性、CI 性能和企业仓库支持持续推进。

## 版本发布
无新 Releases。

## 社区热点 Issues
> 过去24小时内仅 5 条 Issue 更新，以下全部列出。

1. **#97616 [OPEN][P1][bug] OpenClaw 泄漏未回收的 hook/tool 子进程，导致僵尸累积与运行时退化**  
   作者：@avp717 | 更新：2026-10-01 | 评论：16 | 👍：1  
   标签：`impact:message-loss`、`impact:crash-loop`、`🦪 silver shellfish`  
   重要性：P1 级资源泄漏，长期未关闭（6月创建），涉及消息丢失和崩溃循环，是当前社区讨论最集中的稳定性问题。  
   https://github.com/openclaw/openclaw/issues/97616

2. **#130209 [OPEN][P1] 敏感值脱敏屏蔽浏览器 act `key` 参数，模型看到的错误也变成 `Unknown key: "***"`，导致 agent 无法自纠正**  
   作者：@geekforlife | 更新：2026-10-01 | 评论：5 | 👍：0  
   标签：`impact:session-state`、`impact:security`、`🐚 platinum hermit`  
   重要性：安全脱敏与 agent 可用性冲突，P1 且需安全审查；过度脱敏直接破坏模型自我纠正能力。  
   https://github.com/openclaw/openclaw/issues/130209

3. **#162768 [OPEN][P2] OpenAI Codex 模型发现硬编码 `client_version=0.158.0`，忽略配置的外部 Codex app-server**  
   作者：@zizhongxiao-svg | 创建/更新：2026-10-01 | 评论：3 | 👍：0  
   标签：`impact:auth-provider`、`🐚 platinum hermit`  
   重要性：外部 Codex 集成被硬编码版本阻塞，影响自定义 app-server 用户。  
   https://github.com/openclaw/openclaw/issues/162768

4. **#119255 [OPEN][P3][Feature] 将已完成回合的 “Worked for X” 汇总带到原生 Apple 聊天**  
   作者：@CBruney | 更新：2026-10-01 | 评论：2 | 👍：0  
   标签：`impact:ux-friction`、`🌊 off-meta tidepool`  
   重要性：Web Control UI 已有折叠式回合汇总，原生 iOS/macOS 聊天体验落后，属于跨平台一致性需求。  
   https://github.com/openclaw/openclaw/issues/119255

5. **#163107 [OPEN] `view_image` 处理 HEIC 且无外部转换器时失败，每次尝试留下约 250–400 MB RSS（2026.9.4）**  
   作者：@geekforlife | 创建/更新：2026-10-01 | 评论：0 | 👍：0  
   重要性：HEIC 图片处理失败并伴随显著内存泄漏，影响自托管容器用户。  
   https://github.com/openclaw/openclaw/issues/163107

## 重要 PR 进展
1. **#160926 [OPEN][P0] fix(secrets): 轮换值时保留存储条目类型**  
   修复手动保护 secret 在轮换/导入时可能被静默降级为可读 `env` 条目并丢失 allowed-host 策略的问题。P0 安全边界，安全敏感变更。  
   https://github.com/openclaw/openclaw/pull/160926

2. **#163074 [OPEN][P1] fix: 回移发布关键更新与会话修复**  
   为 `2026.9.8` 候选版补上更新、Windows 复制、性能、内存和委托工作修复。发布关键，涉及兼容性和消息投递风险。  
   https://github.com/openclaw/openclaw/pull/163074

3. **#162268 [OPEN][P1] fix(update): 避免仅为了检查所有权而复制繁忙数据库**  
   修复 Gateway 写入共享状态库时更新所有权准入失败（SQLite 源 10 次只读检查后仍不稳定）的问题。  
   https://github.com/openclaw/openclaw/pull/162268

4. **#163015 [OPEN][P2] refactor(doctor): 移除 2026-07 之前的配置迁移**  
   清理已退役的 whole-agent runtime、sandbox `perSession`、prompt overrides 等旧配置迁移。兼容性风险需关注。  
   https://github.com/openclaw/openclaw/pull/163015

5. **#163030 [OPEN][P2] fix(sessions): 后台写入后保留详细信息**  
   修复会话行丢失 owner/participant 详细信息、后台刷新前错过已提交更新、生命周期回调抛异常时未解决等问题。  
   https://github.com/openclaw/openclaw/pull/163030

6. **#159988 [OPEN][P2] perf(ci): 使用原生 Bun 运行合格单元测试**  
   将 425 个合格文件 / 3,573 个用例路由到原生 Bun，减少 Vitest 启动、转换和 worker 销毁开销。  
   https://github.com/openclaw/openclaw/pull/159988

7. **#160108 [OPEN][P2] feat: 为企业仓库准备云工作器**  
   支持私有 GitHub Enterprise 仓库发现、新会话默认值，以及绑定到所选仓库和当前权限的云工作器。  
   https://github.com/openclaw/openclaw/pull/160108

8. **#162975 [OPEN][P3] refactor(workers): 在 SQLite 工作器中持久化持久 ACK**  
   将 worker transcript 和 terminal-event 确认从 Gateway 线程移出，保留游标顺序与原子 pending-result fence。  
   https://github.com/openclaw/openclaw/pull/162975

9. **#163099 [OPEN][P2] fix(control-ui): 更新后旧标签页对懒加载块 404**  
   修复每次 `openclaw update` 后，已打开的 Control UI 标签页无法加载未访问路由的问题。  
   https://github.com/openclaw/openclaw/pull/163099

10. **#162828 [OPEN][P2] fix(openai): 在单调时钟上保持设备代码截止时间**  
    修复 ChatGPT 设备代码 OAuth 流程可能因系统时钟移动而挂起超过 15 分钟预算或虚假失败的问题。  
    https://github.com/openclaw/openclaw/pull/162828

## 功能需求趋势
从过去24小时 Issue 更新中可提炼出以下方向：

- **稳定性与资源管理**：僵尸子进程泄漏（#97616）、HEIC 图片处理内存泄漏（#163107）反映长期运行时的资源回收与内存治理是核心痛点。
- **安全脱敏的可用性平衡**：敏感值脱敏不应破坏 agent 自纠正能力，需更细粒度或可感知的脱敏策略（#130209）。
- **外部提供商兼容性**：硬编码版本阻碍外部 Codex app-server 集成，配置驱动与版本协商需求上升（#162768）。
- **跨平台原生体验一致性**：原生 Apple 聊天 UI 需要对齐 Web Control UI 的回合汇总等交互（#119255）。

## 开发者关注点
- **子进程/内存泄漏**：hook/tool 子进程未回收、HEIC 失败路径 RSS 飙升，严重影响长时间运行稳定性。
- **安全与可用性冲突**：脱敏过度导致模型看到 `***` 后无法修正，开发者需要更智能的脱敏边界。
- **提供商集成硬编码**：OpenAI Codex 模型发现硬编码 `client_version`，外部 app-server 用户被阻塞。
- **更新与会话状态可靠性**：繁忙数据库复制导致更新失败、后台写入丢失会话详情等。
- **旧版本迁移与兼容性**：移除 pre-July-2026 迁移可能影响旧版本升级路径，需平衡代码清理与兼容性。
- **CI 性能与 flaky 测试**：原生 Bun 运行合格单元测试、修复 Usage 页概览 release 测试不稳定。
- **企业级功能**：私有 GitHub Enterprise 仓库、云工作器绑定与权限控制需求明确。

:::
