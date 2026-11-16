---
title: "AI CLI 工具社区动态日报"
published: 2026-11-16
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-16

> 生成时间: 2026-11-16 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-16）

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单轮对话”向“多代理协作与远程自动化”深化的关键期。各主流工具均未在近24小时发布稳定版本，但社区 Issue 与 PR 活跃度整体偏高，核心矛盾集中在跨平台一致性（尤其是 Windows）、权限模型细化、子代理可靠性以及 IDE/MCP 生态集成。工具间正呈现出“桌面端集成深化”与“终端轻量化”两条并行演进路线，安全审批与会话状态同步成为普遍痛点。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues（24h 更新） | PR（24h 更新） | Release（24h） | 主要版本状态 |
|------|------|-------------------|---------------|---------------|-------------|
| Claude Code | anthropics/claude-code | 50 条 | 0 条 | 无 | 无新版本，社区讨论集中在 Bug 跟进 |
| OpenAI Codex | openai/codex | 48 条 | 18 条（全关闭） | 2 个 Rust Alpha (0.171.0-alpha.6/7) | 预发布迭代活跃，TUI 与 app-server 重构持续 |
| Gemini CLI | google-gemini/gemini-cli | 未披露总数（热点 10 条） | 11 条 | 无 | 子代理修复与核心工具链优化为主 |
| OpenCode | anomalyco/opencode | 11 条 | 50 条 | 无 | PR 数量领先，Windows 兼容性修复密集 |
| Hermes | NousResearch/hermes-agent | 未披露总数（热点 10 条） | 10 条（精选） | Canary v0.23.1+canary.20261115 | 统一网关合并后长尾问题修复 |
| OpenClaw | openclaw/openclaw | 未披露总数（热点 10 条） | 10 条（精选） | v2026.11.5-beta.3 | 大会话内存优化与多代理稳定性 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 0 | 0 | 0 | 无活动 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 0 | 无活动 |

> 注：部分仓库未披露 24 小时 Issue 总数，表格中仅列出可验证数据。

## 3. 共同关注的功能方向

多个工具社区在以下维度上存在高度重叠的诉求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **跨平台/Windows 稳定性** | Claude Code、OpenAI Codex、OpenCode、OpenClaw | Windows 下 Artifact 菜单缺失、Computer Use 无法获取浏览器 URL、PowerShell 管道启动失败（0xC0070005）、节点能力声明缺失（computer.act） |
| **权限模型与信任机制** | Claude Code、OpenAI Codex | 永久信任特定应用、减少重复权限弹窗、远程控制下的计算机使用审批缺失 |
| **子代理/多代理可靠性** | Gemini CLI、OpenClaw、Claude Code | Subagent 恢复后状态误报（MAX_TURNS 被标记为成功）、多代理事件循环饥饿、跨会话消息与审批机制 |
| **MCP 与工具发现** | OpenCode、Claude Code | `notifications/tools/list_changed` 通知未生效、MCP 协议版本不匹配导致无状态调用失败 |
| **TUI/终端交互体验** | OpenAI Codex、OpenCode、Claude Code | 终端滚动模式恢复、粘贴文本内联、子代理状态显示、提示词剪切缺失 |
| **会话状态与数据持久化** | Hermes、Claude Code、Gemini CLI | 统一网关合并后会话恢复报 `storage_unavailable`、跨会话收件箱失效、符号链接代理未识别 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 桌面端集成、Artifact 版本管理、Remote Control/Cowork 远程协作 | 桌面端开发者、跨端协作团队 | Electron/桌面端 + CLI 混合，强调三端（Claude Code、Cowork、claude.ai）一致性 |
| **OpenAI Codex** | Computer Use（桌面自动化）、IDE 插件（VS Code/JetBrains）、Rust 端 TUI | 重度 IDE 用户、桌面自动化探索者 | Rust 端 Alpha 迭代，app-server 架构，侧重本地沙箱与浏览器控制 |
| **Gemini CLI** | Subagent 编排、AST 感知代码理解、浏览器子代理 | 大型代码库开发者、Agent 工作流构建者 | Go/TypeScript 核心，子代理委派模型，探索零依赖 OS 沙箱 |
| **OpenCode** | MCP 生态、ACP（Agent-IDE 协议）、多模态图片渲染、服务器端媒体计划 | IDE 插件开发者、MCP 服务器提供商 | TypeScript/Node 核心，服务器端 API 为主，桌面端与 CLI 双轨 |
| **Hermes** | 统一网关（Unified Gateway）、多配置文件隔离、语音/TTS 交互、看板自动化 | 多配置文件用户、语音优先交互场景 | 网关多路复用架构，Python 后端 + 桌面端客户端，侧重会话与环境隔离 |
| **OpenClaw** | 大会话压缩、多代理事件循环、跨渠道富文本（Telegram/Slack）、Cua Spaces 集成 | 大规模 Agent 部署、基础设施集成商 | 网关 + WorkerProvider 插件契约，侧重大会场景内存控制与异构资源调度 |
| **DeepSeek 系列** | 无活动 | — | — |

## 5. 社区热度与成熟度

- **最高活跃度**：OpenCode（50 个 PR 更新）与 OpenAI Codex（48 条 Issues + 18 个 PR + 2 个 Alpha 版本）处于快速迭代阶段，社区反馈与代码提交形成紧密闭环。
- **高讨论、低代码更新**：Claude Code 虽有 50 条 Issue 更新，但 24 小时内无 PR 合并与 Release，说明社区反馈集中在 Bug 报告与功能请求，维护侧发布节奏相对保守。
- **架构阵痛期**：Hermes 因统一网关合并（#143547 有 73 条评论）引发大量会话与存储问题，处于架构重构后的长尾修复期，成熟度受短期影响。
- **停滞/低活跃**：DeepSeek Reasonix 与 Deepseek Harness 过去 24 小时无任何活动，社区关注度与维护频率均处于低位。

## 6. 值得关注的趋势信号

1. **权限模型从“会话级”向“永久信任”演进**  
   Claude Code、OpenAI Codex 均出现用户强烈要求“一次信任、长期有效”的诉求。这表明 AI CLI 正从实验性工具转向日常生产力工具，频繁的安全弹窗已成为采用障碍。开发者应提前布局细粒度信任策略与审计日志。

2. **Windows 平台成为兼容性分水岭**  
   四款工具均在 Windows 上暴露核心功能缺陷（PowerShell 管道、Computer Use、节点能力声明、Artifact 菜单）。对于面向企业开发者的工具，Windows 稳定性已不再是次要问题，而是决定市场渗透率的关键指标。

3. **子代理状态可靠性是 Agent 工作流的基石**  
   Gemini CLI（#22323）与 OpenClaw（#192124）均暴露子代理状态误报或压缩超时问题。当 Agent 开始处理长周期、多步骤任务时，状态一致性与可恢复性直接决定自动化流程的可信度。

4. **MCP/ACP 协议层正成为新的集成战场**  
   OpenCode 的 MCP 工具列表变更通知失效、Claude Code 的 MCP 协议版本不匹配，反映出协议层标准化尚未完成。开发者在构建 MCP 服务器或 IDE 插件时，应预留协议版本适配与动态工具发现的容错空间。

5. **大会话与多代理场景推高基础设施要求**  
   OpenClaw 的大会话内存优化、Hermes 的网关多路复用、Gemini CLI 的 AST 感知工具，均指向同一个方向：AI CLI 正从单轮轻量查询向长上下文、多代理并行执行演进。对开发者而言，内存控制、事件循环调度与会话持久化将成为下一代工具的核心竞争力。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-16）

## 1. 热门 Skills 排行

基于 PR 更新活跃度与社区关注度，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | **#1742 fix(mcp-builder)** | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入变更及自定义 HTTP 头配置问题，解决 MCP 连接脚本在新版 SDK 下失效 | MCP 协议版本兼容性是社区痛点，涉及官方技术栈升级，关注度高 | OPEN | https://github.com/anthropics/skills/pull/1742 |
| 2 | **#1298 fix(skill-creator)** | 修复 Skill 触发评估（trigger eval）的误报与 Windows 下 subprocess 管道问题，增强运行时失败处理 | 直接影响 Skill 创建与质量评估的可靠性，跨平台支持受关注 | OPEN | https://github.com/anthropics/skills/pull/1298 |
| 3 | **#1245 Add notion-spec-to-implementation...** | 新增两个 Skill：Notion 规格转实现（将产品/技术规格拆解为 Notion 任务）与定量简历审计 | 企业文档自动化与产品工程落地方向，社区对 Notion 生态集成需求明显 | OPEN | https://github.com/anthropics/skills/pull/1245 |
| 4 | **#1980 webapp-testing: avoid shell=True** | 移除 `with_server.py` 中 `shell=True` 的子进程调用，修复命令注入风险（CWE-78） | Web 应用测试 Skill 的安全加固，供应链安全话题引发讨论 | OPEN | https://github.com/anthropics/skills/pull/1980 |
| 5 | **#1792 fix(docx)** | DOCX 技能中将 LibreOffice 超时上报为错误，并验证输出文件不再包含修订痕迹 | 文档自动化 Skill 的鲁棒性与输出校验，企业级文档处理场景关注 | OPEN | https://github.com/anthropics/skills/pull/1792 |
| 6 | **#1771 feat(proofcore-contract-auditor)** | 新增智能合约公证 Skill，对 Solidity/Rust 合约进行静态分析，并将审计证明锚定至 TON 区块链 | Web3/区块链安全方向，代表社区对垂直领域合规审计的扩展需求 | OPEN | https://github.com/anthropics/skills/pull/1771 |
| 7 | **#525 Add pyxel skill** | 新增 Python 复古游戏开发 Skill，涵盖实现、无头输入运行、帧检测与状态验证 | 游戏开发与创意编程方向，长期未合并但持续获得更新，社区兴趣稳定 | OPEN | https://github.com/anthropics/skills/pull/525 |
| 8 | **#1703 Add md2video-audio skill** | 新增 Markdown 转视频 Skill，基于 Marp 生成幻灯片并合成逼真人声 MP4 | 内容多模态生成，零成本文档转视频工作流受内容创作者关注 | OPEN | https://github.com/anthropics/skills/pull/1703 |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并至主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进诉求如下：

1. **安全与信任边界（Security & Trust）**
   - 社区技能分发存在 `anthropic/` 命名空间冒充官方技能的信任漏洞（Issue #492），急需官方出台社区技能签名、命名空间隔离或信任分级机制。

2. **组织内技能共享（Org-wide Sharing）**
   - 用户希望在 Claude.ai 组织内直接共享技能，避免手动下载/上传 `.skill` 文件（Issue #228），企业协作场景需求强烈。

3. **技能触发与评估可靠性（Trigger & Eval Reliability）**
   - `run_eval.py` 触发率为 0%（Issue #556）、并行 worker 下 UUID 交叉匹配导致假阴性（Issue #1352），社区对 Skill 触发机制与评估工具链的稳定性要求很高。

4. **文档与内容自动化（Document Automation）**
   - DOCX 批注检测（#1734）、排版质量控制（#514）、Notion 规格转实现（#1245）等，显示社区对结构化文档生成与审计的持续需求。

5. **垂直领域专用 Skill**
   - 智能合约审计（#1771）、HPC 集群操作（#1615）、代理治理（#412）等提案，表明社区希望将 Claude Code 扩展至金融、科研、AI 安全等专业领域。

6. **技能创作者体验（skill-creator）**
   - 多个 Issues 指向 `skill-creator` 本身需要最佳实践重构（#202）、YAML frontmatter 解析修复（#1997）、直接执行支持（#1681），社区期待更易用的 Skill 开发工具链。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且功能完整，可能在近期落地：

| PR | 功能 | 关键信息 | 链接 |
|------|------|----------|------|
| **#1245** | Notion 规格转实现 + 定量简历审计 | 创建于 6 月，10 月仍有更新，功能完整且覆盖企业文档场景 | https://github.com/anthropics/skills/pull/1245 |
| **#1742** | MCP Builder 适配 `mcp>=2.0.0` | 涉及官方依赖升级，修复紧迫，合并优先级高 | https://github.com/anthropics/skills/pull/1742 |
| **#1298** | Skill Creator 触发评估修复 | 影响所有新 Skill 的质量门禁，社区对评估可靠性诉求强烈 | https://github.com/anthropics/skills/pull/1298 |
| **#1980** | Webapp Testing 安全加固 | 修复 CWE-78 命令注入，安全合规类修复通常审核通过快 | https://github.com/anthropics/skills/pull/1980 |
| **#1792** | DOCX 超时错误上报与输出验证 | 文档技能稳定性改进，已有多次更新，接近可合并状态 | https://github.com/anthropics/skills/pull/1792 |
| **#525** | Pyxel 复古游戏开发 | 虽然创建较早，但 11 月仍有更新，社区持续关注创意编程方向 | https://github.com/anthropics/skills/pull/525 |

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在构建垂直领域专用 Skill（如文档自动化、Web3 审计、游戏开发）的同时，亟需通过技能信任机制、组织共享能力以及更可靠的触发/评估工具链，将 Claude Code Skills 从“个人实验性插件”提升为企业级可信能力。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-16  
**数据来源**: [anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 1. 今日速览

过去 24 小时内，Claude Code 仓库未发布新版本，也无新 PR 合并。社区活动集中在 50 条已更新 Issue 的跟进与讨论上，核心关注点集中在 **Windows 平台稳定性、插件/Mods 系统兼容性、权限模型细化以及远程协作（Remote Control/Cowork）体验** 四个方向。最高关注度的 Issue #96718 涉及 Artifact 版本历史菜单缺失，已引发 10 条评论与 16 个赞，社区对该回归性 bug 反应强烈。

---

## 2. 版本发布

过去 24 小时内无新 Release 发布，本节省略。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数及问题影响范围）筛选：

| # | 标题 | 核心内容 | 社区反应/重要性 | 链接 |
|---|------|----------|----------------|------|
| #96718 | Artifact "版本历史" 从查看器菜单移除，导致已保存版本无法访问 | Windows 平台回归性 bug，影响 Claude Code、Cowork 与 claude.ai 三端 | 评论最多（10 条）、点赞最高（16 👍），用户反馈已保存的 Artifact 版本彻底不可达，属于高优先级回归问题 | [查看 Issue](https://github.com/anthropics/claude-code/issues/96718) |
| #96526 | modifyOtherKeys 仅对允许列表终端启用，导致 xterm/VTE 无法绑定 Ctrl+Enter | Linux TUI 键位绑定限制，仅 iTerm/kitty/WezTerm 等少数终端支持扩展键模式 | 5 条评论，Linux 终端用户反映强烈，影响开发者自定义快捷键体验 | [查看 Issue](https://github.com/anthropics/claude-code/issues/96526) |
| #94032 | summarizedThinking 功能标志强制所有模型使用简化思考显示，完整思考链不可访问 | macOS/iOS 桌面端，用户无法 opt-out，完全丧失完整推理过程可见性 | 5 条评论，涉及模型透明度与调试能力，对高级用户影响大 | [查看 Issue](https://github.com/anthropics/claude-code/issues/94032) |
| #105390 | Claude for Chrome：站点权限永远无法授予，approved-sites 列表保持为空 | Chrome 扩展权限机制失效，所有页面读取均失败，MCP 工具也受影响 | 4 条评论、5 👍，直接导致浏览器集成不可用，属于核心功能中断 | [查看 Issue](https://github.com/anthropics/claude-code/issues/105390) |
| #99691 | 桌面端 Mods 注册的斜杠命令显示 "isn't a command here"，且不出现在 / 菜单中 | 插件通过 `$.command.register` 注册的命令在桌面端 Code 标签页失效，尽管后台仍可执行 | 4 条评论，插件生态兼容性问题，影响 Mod 开发者与桌面端用户 | [查看 Issue](https://github.com/anthropics/claude-code/issues/99691) |
| #107281 | [功能请求] 向队友的 Claude Code 会话发送消息，供其审批 | 跨开发者会话消息发送与审批机制，用于协作开发场景 | 3 条评论，体现社区对多人协作与代码审查流程的需求 | [查看 Issue](https://github.com/anthropics/claude-code/issues/107281) |
| #100433 | [功能请求] 可选设置：永久信任特定应用用于计算机使用 | 当前计算机使用权限为每应用、每会话弹窗，绕过权限模式也不改变此行为 | 3 条评论、2 👍，开发者希望减少重复授权干扰，提升自动化体验 | [查看 Issue](https://github.com/anthropics/claude-code/issues/100433) |
| #97521 | 跨会话收件箱在 `/tmp/cc-socks-<uid>` 回退目录被移除后永久失效 | Linux/WSL2 系统因 systemd-tmpfiles 引导扫清竞态导致会话中断 | 2 条评论，Linux 服务器/WSL 用户遇到的会话稳定性问题 | [查看 Issue](https://github.com/anthropics/claude-code/issues/97521) |
| #105218 | 绕过权限模式下，Claude 因 Chrome 集成安全规则拒绝用户自身机器的防火墙/系统更改 | Linux 本地管理场景中，安全规则过度广泛地应用于所有 shell 操作 | 2 条评论，权限模型与本地管理员场景的冲突 | [查看 Issue](https://github.com/anthropics/claude-code/issues/105218) |
| #107436 | Windows 远程控制/项目线程中从不显示计算机使用审批 | Windows 11 桌面端 4.16336 + Claude Code 2.1.317，Remote Control 下 `request_access` 无审批弹窗 | 2 条评论、1 👍，远程控制场景下的安全审批缺失，涉及安全与可用性 | [查看 Issue](https://github.com/anthropics/claude-code/issues/107436) |

---

## 4. 重要 PR 进展

过去 24 小时内 **无 Pull Request 更新**（共 0 条），本节暂无内容。

---

## 5. 功能需求趋势

从近 24 小时更新的 50 条 Issue 中，可提炼出以下社区功能关注方向：

1. **跨端协作与远程控制增强**  
   多个 Issue 指向 Remote Control、Cowork 及跨会话消息发送（如 #107281、#95581、#107436），社区希望在多设备、多人协作场景下获得更完整的会话可见性与审批流程。

2. **权限模型细化与信任机制**  
   用户反复提出对计算机使用、防火墙操作、站点权限的精细控制需求（如 #100433、#105218、#105390），期望支持“永久信任特定应用”或“绕过模式下的例外配置”，减少重复弹窗。

3. **插件/Mods 生态稳定性**  
   桌面端与 CLI 之间的插件命令注册不一致（#99691、#99234）、Mods 会话重启后丢失（#108796），表明插件系统在跨平台同步与持久化方面仍有缺口。

4. **终端与 TUI 兼容性**  
   Linux 终端键位绑定限制（#96526）、WSL 套接字回退目录竞态（#97521）等问题显示，非 macOS/Windows 主流终端的适配仍需加强。

5. **模型思考过程透明度**  
   关于 `summarizedThinking` 强制简化显示的投诉（#94032）反映，高级用户希望保留完整思考链的访问权限，而非被功能标志一刀切限制。

---

## 6. 开发者关注点（痛点与高频需求）

**高频痛点：**
- **Windows 平台回归问题**：Artifact 版本历史菜单消失（#96718）、Cowork 首条消息后挂起（#92921）、个人技能缺失自动补全（#93339）等，Windows 用户体验不稳定。
- **权限弹窗过于频繁**：无论是计算机使用、Chrome 站点权限还是防火墙操作，开发者希望有“一次信任、长期有效”的选项，而非每次会话都重复确认。
- **远程控制审批缺失**：Windows 下 Remote Control 中计算机使用审批不弹出（#107436），可能导致远程操作被静默阻断或安全风险不可感知。

**开发者高频需求：**
- 提供 `claude agents` 终端视图中显示 Remote Control 会话的能力（#95581）。
- 支持插件命令在桌面端 `/` 菜单中正确隐藏/显示（#99234）。
- 增加跨会话消息发送与队友审批机制，以支持结对编程与代码审查工作流（#107281）。
- 修复 MCP 协议版本不匹配导致的无状态服务器调用失败（#93290）。

---

**总结**：本周 Claude Code 社区未见新版本发布，但 Issue 反馈活跃，核心矛盾集中在 **跨平台一致性（尤其是 Windows/Linux 桌面端）、权限模型的灵活性、以及远程协作体验的完整性**。建议关注团队优先处理 #96718 等回归性 bug，并评估权限信任机制与插件系统的中长期改进路线图。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-16  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

Codex 社区近24小时活跃度持续高位，共更新 48 条 Issue 与 18 条 PR。Windows 平台的 Computer Use、沙箱权限及本地对话访问问题成为社区核心关注点；CLI 侧则集中发布了两个 Rust alpha 版本（0.171.0-alpha.6/7），并通过多个 TUI 与 app-server 修复 PR 改进了终端交互、配置读取与云端会话稳定性。

---

## 2. 版本发布

过去24小时发布了两个 Rust 端 Alpha 版本，均为预发布迭代：

| 版本 | 标签 | 说明 |
|------|------|------|
| rust-v0.171.0-alpha.7 | `0.171.0-alpha.7` | Release 0.171.0-alpha.7 |
| rust-v0.171.0-alpha.6 | `0.171.0-alpha.6` | Release 0.171.0-alpha.6 |

> 注：发布说明未提供详细变更日志，建议开发者通过 [GitHub Releases](https://github.com/openai/codex/releases) 查看完整资产与提交记录。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数）与问题影响范围筛选：

| # | 标题 | 状态 | 评论/👍 | 核心内容与重要性 | 链接 |
|---|------|------|---------|------------------|------|
| #51524 | [Windows] Computer Use stops at `get_window_state`: cannot determine current browser URL (Chrome and Edge) | OPEN | 91 / 9 | Windows 端 Computer Use 核心功能失效，窗口枚举正常但无法获取浏览器当前 URL，导致任务在点击/输入前中断。评论数远超其他 Issue，是当前社区最活跃的 bug。 | [查看](https://github.com/openai/codex/issues/51524) |
| #48756 | Mini’s global shortcut cannot be changed or disabled in Settings | OPEN | 15 / 47 | macOS 端 ChatGPT Mini 注册全局快捷键 ⌥+Space，但设置中无法修改或禁用。点赞数最高，反映用户对快捷键冲突与自定义需求的强烈诉求。 | [查看](https://github.com/openai/codex/issues/48756) |
| #49862 | Windows: dot lacks native tools to read or message an existing local Codex conversation | OPEN | 22 / 3 | Windows 桌面端缺乏原生工具读取或回复已有本地 Codex 对话，影响本地会话的可访问性与跨客户端续写。 | [查看](https://github.com/openai/codex/issues/49862) |
| #43776 | Windows: Codex-created `.agents` ownership breaks sandbox setup and in-app browser control | OPEN | 16 / 3 | Windows 上 Codex 创建的 `.agents` 文件所有权问题导致沙箱设置失败及应用内浏览器控制异常，涉及安全沙箱与多平台一致性。 | [查看](https://github.com/openai/codex/issues/43776) |
| #27731 | Compaction resume incorrectly presents stale latest user prompt as current active instruction | OPEN | 11 / 10 | 上下文压缩恢复后，会将陈旧的用户提示词误当作当前活跃指令，导致模型执行过期任务，属于核心上下文管理逻辑缺陷。 | [查看](https://github.com/openai/codex/issues/27731) |
| #60594 | HTTP 400 for repeated image inputs with zstd request compression; same inputs succeed uncompressed (Windows) | OPEN | 9 / 1 | Windows 端重复图像输入配合 zstd 压缩时返回 HTTP 400，未压缩则正常，指向请求压缩与多模态输入的兼容性问题。 | [查看](https://github.com/openai/codex/issues/60594) |
| #54538 | Empty desktop project cache hides intact database projects; restoring cache resolves it | OPEN | 13 / 2 | Windows 桌面端项目缓存为空时会隐藏完整的本地数据库项目，恢复缓存后可见，影响项目可见性与数据可信度。 | [查看](https://github.com/openai/codex/issues/54538) |
| #58565 | Locked Use screen cannot be dismissed after manual macOS unlock; forced reboot required | OPEN | 4 / 0 | macOS 上代理运行锁屏后，手动解锁无法恢复界面，需强制重启，影响无人值守代理任务的可恢复性。 | [查看](https://github.com/openai/codex/issues/58565) |
| #61459 | Dot cannot control connected Windows VM: GetCursorPos access denied | OPEN | 4 / 0 | Dot 无法控制连接的 Windows 11 虚拟机，报 `GetCursorPos: Access is denied`，而同环境下 ChatGPT Work 可正常控制，指向权限隔离差异。 | [查看](https://github.com/openai/codex/issues/61459) |
| #61665 | Codex fails to start shell in specific VS Code workspace on Windows | OPEN | 3 / 0 | VS Code 扩展在特定 Windows 工作区下无法启动 Shell，涉及 IDE 集成与沙箱工具调用，对开发者工作流影响直接。 | [查看](https://github.com/openai/codex/issues/61665) |

---

## 4. 重要 PR 进展（精选 10 条）

过去24小时共 18 条 PR 均已关闭（CLOSED），主要由 `@copyberry[bot]` 提交，集中在 TUI 交互、app-server 客户端重构、配置读取、云端会话及预算控制等方面：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #61706 | Refactor exec to use the shared app-server client | 将 exec 模块改用共享 app-server 客户端，提取 turn 完成逻辑至 `finish_turn`，统一处理服务器与线程流断连；将远程地址解析与 auth token 解析移至 `codex-app-server-client`。 | [查看](https://github.com/openai/codex/pull/61706) |
| #61697 | Restore the terminal's original alternate-scroll mode | 修复 TUI 释放输入模式时会无条件禁用终端 alternate scroll 的问题；启动时探测 `1007` 模式并过滤，避免覆盖用户原始终端设置。 | [查看](https://github.com/openai/codex/pull/61697) |
| #61694 | Discard unsaved experimental feature edits on cancel | 实验性功能弹窗取消（Esc / Ctrl+C / 重映射键）时丢弃未保存编辑，仅在确认（Enter）时保存，并更新页脚提示。 | [查看](https://github.com/openai/codex/pull/61694) |
| #61692 | Fix status detail truncation for wide Unicode characters | 状态栏详情截断改为基于显示宽度（display-width-aware）的整行截断，避免宽字符导致最终行溢出终端宽度。 | [查看](https://github.com/openai/codex/pull/61692) |
| #61690 | Keep pasted text inline in TUI goals | 粘贴的目标文本不再存为独立文件，而是在处理图片附件与检查目标长度前直接展开到目标编辑器中。 | [查看](https://github.com/openai/codex/pull/61690) |
| #61688 | Add TUI review ownership and risk guidance | 为 `codex-rs/tui` 增加 `OWNERS` 文件（`tempest::evaluate-only`），并补充 `TEMPEST_REVIEW` 审查指南，明确局部渲染与文案修复的快照要求。 | [查看](https://github.com/openai/codex/pull/61688) |
| #61686 | Defer plugin manifest loading until marketplace entries are selected | 插件清单加载延迟至市场条目被选中后，避免因策略、产品可见性或跨项目重复选择导致不必要的读取与解析警告。 | [查看](https://github.com/openai/codex/pull/61686) |
| #61663 | Fix config reads with relative working directories | `config/read` 响应基于最新加载配置的层级栈构建，支持相对 `cwd`（如 `.`）请求，并复用配置用于特性覆盖，保留优先级语义。 | [查看](https://github.com/openai/codex/pull/61663) |
| #61600 | Enable automatic titles for Cloud conversations | 云端会话此前跳过 TUI 标题生成，现根据选定的云端账户及其后端路由生成结构化标题，无需代理工具或临时会话。 | [查看](https://github.com/openai/codex/pull/61600) |
| #61587 | Add request IDs and attempt numbers to model request hooks | 在 `PreModelRequest` 与 `PostModelRequest` 钩子中增加 `request_id` 与一-based `attempt_number`，用于关联重试与模型回退中的同一代码生成尝试。 | [查看](https://github.com/openai/codex/pull/61587) |

---

## 5. 功能需求趋势

从近24小时全部 Issue 与 PR 中提炼，社区最关注的功能方向包括：

1. **Computer Use 与跨平台桌面控制**  
   Windows 端浏览器 URL 获取失败（#51524）、Windows VM 控制权限拒绝（#61459）、macOS 锁屏无法恢复（#58565）等问题集中暴露，表明 Computer Use 的稳定性与权限模型是当前最高优先级的功能短板。

2. **IDE 与编辑器集成（尤其是 VS Code / Windows）**  
   多个 Issue 指向 VS Code 扩展在 Windows 工作区下的 Shell 启动失败（#61665）、新建聊天路径反序列化问题（#23213），以及 app-server 与本地线程的交互（#49862），开发者希望 Codex 能更无缝地嵌入现有 IDE 工作流。

3. **上下文管理与 Plan Mode 增强**  
   压缩恢复后陈旧提示词被误当作当前指令（#27731），以及社区提出的“压缩上下文并执行计划”选项（#18490），显示用户对长对话状态恢复与计划模式细粒度控制的需求日益增长。

4. **本地会话可访问性与数据所有权**  
   Windows 桌面端缺乏读取/回复本地对话的原生工

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报
**日期**: 2026-11-16  
**来源**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 1. 今日速览

今日社区活动围绕 **Subagent（子代理）稳定性** 与 **核心工具链修复** 展开。P1 级别的子代理恢复缺陷（#22323）已有对应修复 PR 提交，同时多个与浏览器代理、AST 感知文件操作及配置生效相关的问题持续获得关注。未发布新版本，但 11 个 PR 在昨日更新，涵盖 Windows 路径处理、后台进程退出码、扫描警告抑制等核心修复。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 评论/👍 | 关注理由 |
|---|------|-------------|---------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS 报告为 GOAL 成功，掩盖中断 | P1 / bug | 13 / 2 | 子代理触达最大轮次后仍被标记为成功，导致任务中断被隐藏。已有对应修复 PR #29367，是今日最高优先级的修复跟踪项。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent 挂起 | P1 / bug | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，社区👍数较高，影响日常使用体验。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | 基于零依赖 OS 沙箱的 Bash 亲和性路由 | P2 / enhancement | 9 / 1 | 探索让模型更安全地使用原生 POSIX 工具（grep/sed/awk 等），属于架构方向的重大增强提案。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | 评估 AST 感知文件读取、搜索与映射的影响 | P2 / feature | 7 / 1 | 探索通过 AST 感知工具精确读取方法边界、减少 Token 浪费，对提升大型代码库处理效率意义重大。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini 主动使用技能和子代理不足 | P2 / bug | 7 / 0 | 用户反馈模型不会自主调用自定义技能/子代理，需显式指令才触发，影响 Agent 工作流自动化。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent 忽略 settings.json 覆盖（如 maxTurns） | P2 / bug | 5 / 0 | 浏览器子代理未正确读取全局/项目级配置，导致配置项失效，属于配置一致性问题。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent 在 Wayland 下失败 | P1 / bug | 4 / 1 | 特定 Linux 显示服务器环境下的兼容性问题，影响部分开发者的浏览器自动化场景。 |
| [#24246](https://github.com/github.com/google-gemini/gemini-cli/issues/24246) | 工具数量超过 128 个时遇到 400 错误 | P2 / bug | 3 / 0 | 工具作用域限制不足导致 API 请求失败，涉及大型工具集下的稳定性。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done 输出钩子导致崩溃 | P1 / bug | 3 / 0 | 输出摘要打印时触发 CLI 崩溃，属于严重稳定性缺陷。 |
| [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) | ~/.gemini/agents/ 下的符号链接代理未被识别 | P2 / bug | 4 / 0 | 影响用户通过符号链接管理子代理的工作流，配置灵活性不足。 |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 核心内容 |
|---|------|------|----------|
| [#29367](https://github.com/google-gemini/gemini-cli/pull/29367) | fix(agents): 子代理恢复时保留原始终止原因，防止虚假 GOAL 成功 | @dylanyunlon | 修复 #22323。`LocalAgentExecutor` 恢复路径会无条件覆盖 `terminateReason`，导致 MAX_TURNS 中断被错误标记为成功。 |
| [#30308](https://github.com/google-gemini/gemini-cli/pull/30308) | fix(cli): 在 resolvePath 中扩展 Windows 波浪号-反斜杠路径 | @Noxtimo | 修复 Windows 下 `~\...` 路径无法解析到用户主目录的问题，影响 `policyPaths`、`includeDirectories` 等配置项。 |
| [#30307](https://github.com/google-gemini/gemini-cli/pull/30307) | fix(core): list_background_processes 中省略 null 退出码 | @nios-x | 修复被信号杀死的后台进程显示 `(Exit Code: null)`，仅在正常退出时显示退出码。 |
| [#30306](https://github.com/google-gemini/gemini-cli/pull/30306) | fix(core): 扫描过程中跳过已删除的子目录，不再警告 | @anistark | 抑制因 `.gemini/projects.json.lock` 等文件竞争导致的 `ENOENT` 目录读取警告，减少日志噪音。 |
| [#30267](https://github.com/google-gemini/gemini-cli/pull/30267) | fix(cli): 从 CLI 可执行路径检测本地 Git 克隆安装 | @tanveerhkit | 修复从源码检出目录外运行时，安装类型被误判为全局 npm 安装，从而触发意外的后台自动更新。 |
| [#30305](https://github.com/google-gemini/gemini-cli/pull/30305) | docs(extensions): 停止推荐永不匹配的 excludeTools 形式 | @hemv-857 | 修正扩展文档，`excludeTools` 条目与工具完整名称比对，文档示例需调整才能生效。 |
| [#30194](https://github.com/google-gemini/gemini-cli/pull/30194) | fix: `gemini models` 遗漏 `gemini-3.8-flash` | @xixi-box | 修复模型列表命令未显示 `gemini-3.8-flash`，与 `/model manage` 不一致的问题。 |
| [#30196](https://github.com/google-gemini/gemini-cli/pull/30196) | fix(core): 防止对受污染 shell 命令设置永久允许规则 | @kanchinadd98 | 修复“始终允许”受污染命令后，会为命令根（如 `npm`）创建持久化允许规则的安全问题。 |
| [#30068](https://github.com/google-gemini/gemini-cli/pull/30068) | fix(cli): 将上下文管理设置转发至核心配置 | @Linxiushen | 修复配置的输出掩码阈值（如 400k Token）被丢弃，核心配置仍保留默认 50k 阈值的问题。 |
| [#30066](https://github.com/google-gemini/gemini-cli/pull/30066) | ci: inert canary in package.json scripts（安全 PoC，勿合并） | @AkheelQi | Google OSS VRP 安全概念验证，已关闭，不合并。 |

---

## 5. 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

1. **子代理（Subagent）可靠性与可见性**  
   子代理恢复后状态误报（#22323）、主动调用不足（#21968）、轨迹不可共享（#22598）、崩溃时缺乏上下文（#21763）等问题集中暴露，社区亟需更可靠、可观测的子代理执行模型。

2. **AST 感知的代码理解能力**  
   多个 Issue（#22745、#22746、#22747、#19561）围绕 AST 感知的文件读取、搜索与映射展开，旨在减少 Token 浪费、提升大型代码库的定位精度。

3. **浏览器子代理稳定性与配置一致性**  
   Wayland 兼容性（#21983）、settings.json 覆盖失效（#22267）、会话锁恢复（#22232）表明浏览器自动化是当前薄弱环节。

4. **安全与破坏性操作防护**  
   阻止 `git reset --force` 等破坏性命令（#22672）、受污染 shell 命令的永久允许规则（#30196）体现社区对 Agent 安全边界的重视。

5. **跨平台与配置体验**  
   Windows 路径解析（#30308）、符号链接代理识别（#20079）、每工作区策略（#18397）等反映用户希望在不同环境下获得一致的配置体验。

---

## 6. 开发者关注点

**高频痛点：**
- **子代理状态不准确**：MAX_TURNS 中断被误报为成功，导致任务状态不可信，直接影响自动化流程的可靠性。
- **通用代理挂起**：简单操作即可能导致无限等待，用户需手动干预或禁用子代理委派。
- **配置不生效**：settings.json 中的 `maxTurns`、`contextManagement` 等项在子代理或核心配置中被忽略，造成配置与实际行为不一致。
- **日志与崩溃体验**：后台进程退出码为 null、扫描 ENOENT 警告干扰、输出钩子导致 CLI 崩溃，影响开发者调试效率。

**开发者建

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-16)

## 今日速览

OpenCode 社区今日活跃度较高，共更新 11 个 Issue 和 50 个 PR。核心关注点集中在 Windows 平台兼容性（PowerShell 管道启动失败、后台服务异常退出）、MCP 工具列表变更通知未生效，以及 TUI 交互体验（子代理状态显示、提示词剪切缺失）等方面。暂无新版本发布，但多个针对 v2.3.0 的修复 PR 已提交或合并。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 关键指标 | 重要性说明 | 链接 |
|---|------|------|----------|------------|------|
| #50155 | opencode-go: DeepSeek V4 Flash 缺少全球区域隐私设置 | OPEN | 26 评论 / 17 👍 | 付费订阅用户反馈 DeepSeek V4 Flash 模型因缺少隐私设置中的“全球区域”选项而无法使用，涉及订阅模型可用性与配置缺陷，社区讨论活跃。 | [查看](https://github.com/anomalyco/opencode/issues/50155) |
| #54371 | ACP: 斜杠命令执行但不流式输出 | OPEN | 9 评论 / 6 👍 | 在 JetBrains Rider 2026.2 中运行 ACP Agent 时，内置/自定义斜杠命令输出不可见，影响 IDE 插件场景下的交互体验，已复现。 | [查看](https://github.com/anomalyco/opencode/issues/54371) |
| #63892 | Windows 管道模式下 Microsoft Store PowerShell 启动失败 (0xC0070005) | OPEN | 3 评论 / 2 👍 | 从 v2.2.7 升级到 v2.3.0 后，Windows 上调用商店版 PowerShell 7 失败，直接阻断 Shell 工具在 Windows 的使用，已有对应修复 PR。 | [查看](https://github.com/anomalyco/opencode/issues/63892) |
| #64117 | MCP `notifications/tools/list_changed` 未将新工具暴露给模型 | OPEN | 2 评论 / 0 👍 | MCP 服务器发布工具列表变更通知后，新工具未被模型调用，影响 MCP 生态扩展性，属 v2 版本核心协议缺陷。 | [查看](https://github.com/anomalyco/opencode/issues/64117) |
| #64135 | 桌面端新会话 + 斜杠命令使用目录最新模型而非选中模型 | OPEN | 1 评论 / 0 👍 | 桌面应用新会话未存储模型选择，斜杠命令请求未携带 model 字段，导致服务端回退到默认最新目录模型，影响模型指定准确性。 | [查看](https://github.com/anomalyco/opencode/issues/64135) |
| #64129 | TUI 提示词无剪切功能 | OPEN | 1 评论 / 0 👍 | TUI 缺少 `prompt.cut` 命令或数字键盘镜像，Shift+Delete 无法剪切，属基础编辑体验缺失。 | [查看](https://github.com/anomalyco/opencode/issues/64129) |
| #62365 | TUI 子代理标签页将等待后台 Shell 的子代理显示为非活跃 | OPEN | 2 评论 / 1 👍 | 子代理在后台 Shell 工作结束回合等待时被标记为 idle，导致“活跃”过滤器失效，影响子代理状态可视化。 | [查看](https://github.com/anomalyco/opencode/issues/62365) |
| #21227 | 聊天 UI 中显示工具结果的图片附件 | OPEN | 6 评论 / 13 👍 | 功能请求：当工具返回图片数据（如 webfetch 或 MCP ImageContent）时，聊天 UI 应能渲染图片，增强多模态交互。 | [查看](https://github.com/anomalyco/opencode/issues/21227) |
| #64085 | 本地高负载下 M.2 SSD 故障（俄语） | OPEN | 8 评论 / 0 👍 | 用户反馈两台电脑在本地高负载运行 OpenCode 时 SSD 出现故障，可能与本地模型（qwen3）推理负载相关，需进一步排查是否为误报或真实硬件压力问题。 | [查看](https://github.com/anomalyco/opencode/issues/64085) |
| #64138 | Windows 技能目录快速修改时后台服务静默退出 | CLOSED | 1 评论 / 0 👍 | v2.3.0 Windows 下，`opencode serve --service` 在技能目录快速写入时静默崩溃，桌面端检测到 `reason: 'missing'`，已关闭但提示服务稳定性风险。 | [查看](https://github.com/anomalyco/opencode/issues/64138) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #64140 | feat(server): 基于磁盘的异步视频生成 API | OPEN | HTTP 层媒体计划的一部分，支持异步视频生成与磁盘缓存，为代理工具 PR (#63666) 铺路。 | [查看](https://github.com/anomalyco/opencode/pull/64140) |
| #62490 | feat(tui): 导出对话框中选择保存位置 | OPEN | 完善 `/export` 功能，允许用户在 TUI 导出对话中指定保存路径，改善文件管理体验。 | [查看](https://github.com/anomalyco/opencode/pull/62490) |
| #64137 | fix(service): 重试 Windows 管道 spawn 权限拒绝错误 | OPEN | 修复 #63892，针对打包环境下 Windows 管道进程创建失败（0xC0070005）增加重试机制。 | [查看](https://github.com/anomalyco/opencode/pull/64137) |
| #64134 | feat(server): 通过 OpenCode Console 预览 Slack 链接 | OPEN | 新增实验性 `GET /api/experimental/console/slack/message` 接口，受 `console_slack_preview` 标志控制，用于 Console Box 标签页配对。 | [查看](https://github.com/anomalyco/opencode/pull/64134) |
| #63542 | fix(ssh): 远程服务端口被占用后恢复连接 | OPEN | 修复 SSH 连接断开后重连时因端口占用导致失败的问题，关联 #54059。 | [查看](https://github.com/anomalyco/opencode/pull/63542) |
| #64133 | fix(core): Claude 上下文发现不完整后冷却重试 | OPEN | 修复 Claude 上下文发现失败后的重试逻辑，增加冷却时间，关联 #61020。 | [查看](https://github.com/anomalyco/opencode/pull/64133) |
| #64126 | fix(cli): 使用实际 cwd 而非过时 PWD | CLOSED | 修复 CLI 位置回退问题，当 `file.list` 失败时不再使用服务器活动位置，增加回归测试。 | [查看](https://github.com/anomalyco/opencode/pull/64126) |
| #64128 | fix(tui): 文件列表失败时解析实际 cwd | OPEN | 修复 TUI 路径回退逻辑，与 #64126 互补，解决全量 TUI 路径错误问题。 | [查看](https://github.com/anomalyco/opencode/pull/64128) |
| #64132 | fix(app): 新时间轴中子代理行不应显示加载器 | CLOSED | 修复时间轴 UI 中子代理行的加载状态显示，始终显示环形 glyph。 | [查看](https://github.com/anomalyco/opencode/pull/64132) |
| #64130 | feat(app): Hex 安装后隐藏 Hex 提示 | CLOSED | 桌面端在两分钟提示延迟后，通过 `checkAppExists` 检查 Hex 是否已安装，若已安装则隐藏提示。 | [查看](https://github.com/anomalyco/opencode/pull/64130) |

---

## 功能需求趋势

从本日 Issues 与 PR 可观察到以下社区关注方向：

1. **IDE 与编辑器集成（ACP）**：#54371 反映 JetBrains Rider 等 IDE 中 ACP Agent 的斜杠命令输出流式问题，说明 IDE 插件生态的交互完整性仍是社区痛点。
2. **MCP 协议与工具发现**：#64117 等 Issue 指向 MCP 工具列表变更通知未能及时同步给模型，社区对 MCP 服务器动态扩展支持的期待较高。
3. **多模态内容支持**：#21227 持续获得关注，用户希望聊天 UI 能直接渲染工具返回的图片附件，多模态体验成为功能增强方向。
4. **TUI 编辑体验**：#64129、#62365 等反映 TUI 在基础编辑（剪切）和子代理状态可视化上的不足，终端界面交互仍需打磨。
5. **跨平台兼容性（Windows）**：大量 Issue 和 PR 集中在 Windows 管道、PowerShell、后台服务稳定性上，Windows 平台是当前修复的重灾区。

---

## 开发者关注点

**高频痛点：**
- **Windows 平台稳定性**：PowerShell 7 管道启动失败（0xC0070005）、后台服务在技能目录快速写入时静默退出、桌面端模型解析回退问题，均集中在 v2.3.0 的 Windows 表现。
- **模型选择与路由**：桌面端新会话未正确继承选中模型，导致斜杠命令使用错误模型；DeepSeek V4 Flash 因缺少隐私设置无法使用，涉及订阅模型配置缺陷。
- **MCP 工具动态发现**：`notifications/tools/list_changed` 通知未触发工具重新注册，影响 MCP 服务器的动态能力扩展。

**开发者行动建议：**
- 优先合并 #64137 等

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-16)

## 今日速览

Hermes Agent 于 2026-11-15 发布 Canary 版本 **v0.23.1+canary.20261115T064406Z**，桌面端持续提供 macOS Apple Silicon 构建。社区围绕**统一网关（Unified Gateway）合并后的会话与存储问题**展开高强度讨论，#143547 已积累 73 条评论；同时，多个与会话恢复、后端环境隔离、TTS 播放及定时任务清理相关的 Bug 在当日集中被提交与修复。

## 版本发布

**Hermes Agent v0.23.1+canary.20261115T064406Z**  
- 发布日期：2026-11-15  
- 发布渠道：Canary  
- 下载：提供 Hermes Desktop 客户端，其中 macOS Apple Silicon (M-series) 提供 DMG 安装包  
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.1%2Bcanary.20261115T064406Z

> 注：Release 说明中未列出详细变更日志，建议关注后续稳定版本的完整 Changelog。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态/优先级 | 核心内容 | 为何值得关注 | 链接 |
|---|------|-------------|----------|--------------|------|
| #143547 | Unified gateway: open post-merge problems on main | OPEN / P2 | 统一网关 (#106742) 合并后，CLI、TUI、Desktop、API 等所有入口共享单一网关进程，主分支仍存在未解决的会话与配置文件问题 | 社区讨论最活跃（73 条评论），涉及网关、会话、配置文件、桌面等多个核心组件，是当前架构稳定性的关键瓶颈 | https://github.com/NousResearch/hermes-agent/issues/143547 |
| #143150 | Desktop shows "storage_unavailable" on session resume after multiplex migration | OPEN / P1 | 从 per-profile 独立网关迁移到 One-Gateway-per-Host 多路复用后，桌面端恢复历史会话时报 `storage_unavailable` | P1 级会话存储 Bug，直接影响多配置文件用户的数据可用性，迁移路径风险高 | https://github.com/NousResearch/hermes-agent/issues/143150 |
| #122928 | macOS Desktop: long-running backend leaks superseded runtime venv via PYTHONPATH | OPEN / P2 | 环境切换后，后端通过 `PYTHONPATH` 将已废弃的运行时 venv 泄露给终端子进程 | 影响 macOS 桌面端的环境隔离与长时间运行稳定性，已有 10 条评论跟进 | https://github.com/NousResearch/hermes-agent/issues/122928 |
| #156258 | App re-selects app-managed local backend on refresh despite a remote Primary | OPEN / P2 | 多配置文件安装中，非默认配置文件的聊天在刷新后 404，客户端错误地重新选择本地后端而非远程主节点 | 直接导致跨配置文件聊天不可用，新提交（11-15）且已有 3 条评论 | https://github.com/NousResearch/hermes-agent/issues/156258 |
| #154965 | Curator consolidation archives source skill with no successor record | OPEN / P2 | 技能合并归档后未保留继任者记录，按名称恢复会返回陈旧副本 | 涉及技能管理与版本溯源，对依赖 Curator 插件的用户有数据一致性风险 | https://github.com/NousResearch/hermes-agent/issues/154965 |
| #130676 | Moving a multiplex-served profile directory can recreate its absent home | OPEN / P2 | 移动多路复用服务的配置文件目录时，网关卸载路径可能在缺失数据库旁创建暂存目录 | 涉及会话状态与文件系统竞态，属于 `sweeper:risk-session-state` 风险类 | https://github.com/NousResearch/hermes-agent/issues/130676 |
| #146973 | Kanban iteration-budget settlement writes false `timed_out` on done card | OPEN / P2 | 已完成的看板卡片在结算后仍可能收到错误的 `timed_out` 事件并触发重试 | 看板自动化逻辑缺陷，可能导致任务状态混乱 | https://github.com/NousResearch/hermes-agent/issues/146973 |
| #154516 | Desktop Read aloud beeps with xAI TTS (24kHz PCM not resampled) | OPEN / P2 | xAI TTS 的 24kHz PCM 流未重采样至设备采样率，导致“朗读”功能发出哔声 | 音频播放路径 Bug，影响桌面端语音交互体验 | https://github.com/NousResearch/hermes-agent/issues/154516 |
| #156244 | Injected "Current model" block names a model never served | OPEN / P3 / Security | 运行时注入的上下文块错误标注未服务过的模型（如 deepseek-v4-pro），涉及模型标识可信性 | 安全/信任相关，可能误导用户关于当前使用模型的认知 | https://github.com/NousResearch/hermes-agent/issues/156244 |
| #156291 | Cron: completed records with spent repeat budget are never swept | OPEN / P2 | 重复预算已耗尽的已完成定时任务记录不会被清理，导致“永生”记录 | 定时任务模块资源泄漏，新提交（11-15）且已有对应修复 PR #156292 | https://github.com/NousResearch/hermes-agent/issues/156291 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 核心变更 | 链接 |
|---|------|------|----------|------|
| #156081 | Cache expired: old tool output moves to disk instead of re-sent | Bug / P2 | 提供商缓存过期后，旧工具输出不再全量重发（避免重复计费），而是移至磁盘并以一行指针替代 | https://github.com/NousResearch/hermes-agent/pull/156081 |
| #156250 | Terminal sandboxes keep working after cwd is deleted | Bug / P2 | 沙箱工作目录被删除后，终端自动退到最近仍存在的父目录并继续执行，避免 `exit 126` | https://github.com/NousResearch/hermes-agent/pull/156250 |
| #156295 | Desktop tool rows show long IDs exactly | Bug / P2 | 桌面端工具行不再对长 ID（如 Discord/Telegram 频道 ID）进行四舍五入显示，确保复制内容准确 | https://github.com/NousResearch/hermes-agent/pull/156295 |
| #156292 | Fix cron: sweep completed records whose repeat budget is spent | Bug / P2 | 扩展 `_sweep_completed_oneshots()` 判定条件，清理重复预算已耗尽的已完成记录（修复 #156291） | https://github.com/NousResearch/hermes-agent/pull/156292 |
| #156287 | Stop delivering failed turn's long provider diagnostic to chat | Bug / P2 | 提供商终端失败时，不再将原始错误诊断文本作为 `final_response` 推送到聊天界面 | https://github.com/NousResearch/hermes-agent/pull/156287 |
| #156119 | Gateway/Matrix: wire event_ts through to MessageEvent.timestamp | Bug / P2 | Matrix 适配器将 `event_ts` 正确转发至消息时间戳，使 `gateway.message_timestamps` 生效 | https://github.com/NousResearch/hermes-agent/pull/156119 |
| #149145 | Context boundary resets tool-loop guard's window evidence | Bug / P2 | 压缩/微压缩后重置工具循环保护的无进度证据窗口，避免误判 | https://github.com/NousResearch/hermes-agent/pull/149145 |
| #122094 | Prompt cache stays warm through long tool runs | Feature / P3 | 长时间工具运行前发送一次微小 keep-alive 请求，保持提示缓存温暖，减少重复写入成本 | https://github.com/NousResearch/hermes-agent/pull/122094 |
| #156294 | Plugin-catalog: add token-stats | Feature / P3 | 新增桌面端插件 `token-stats`，展示 Hermes Desktop 终身 Token 使用量 | https://github.com/NousResearch/hermes-agent/pull/156294 |
| #156293 | Catalog: re-pin Personae to 2.0.1 | Feature / P3 | Personae 插件升级至 v2.0.0，在单个插件中提供每个配置文件会话的两种视图 | https://github.com/NousResearch/hermes-agent/pull/156293 |

---

## 功能需求趋势

从当日 Issues 与 PR 中可提炼出以下社区关注方向：

1. **多配置文件与网关多路复用稳定性**  
   统一网关合并后，会话恢复、配置文件目录迁移、远程主节点选择等问题集中爆发，社区对“一主机一网关”架构下的数据一致性与迁移路径需求迫切。

2. **语音与实时交互体验**  
   出现 xAI TTS 采样率不匹配导致的播放异常（#154516）、每会话结果黑板与 epoch 机制（#156286）等需求，表明语音优先交互和背景委托的流畅度是提升方向。

3. **工具沙箱与环境隔离**  
   终端沙箱工作目录删除后的容错（#156250）、macOS 后端 `PYTHONPATH` 运行时泄露（#122928）等，反映用户对本地工具执行环境稳定性与隔离性的高要求。

4. **缓存与计费优化**  
   提示缓存过期后的工具输出降级策略（#156081）、长工具运行期间保持缓存温暖（#122094），显示社区关注 LLM 调用成本与上下文管理效率。

5. **插件生态与目录管理**  
   插件目录持续更新（adaptlypost、redreplier、flowsery、stoa、Personae 等），并新增 `token-stats`，说明插件化扩展与使用量可观测性是活跃领域。

---

## 开发者关注点

- **统一网关合并后的长尾问题**：#14

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-16)

## 今日速览

OpenClaw 今日发布 **v2026.11.5-beta.3**，重点优化大会话（large-session）下的内存压力与转录索引可靠性。社区围绕 **会话压缩超时、多代理事件循环饥饿、Windows 节点能力声明** 等核心稳定性问题展开讨论，同时 Telegram 消息富文本与 Cua Spaces 工作器集成等功能需求持续获得关注。

## 版本发布

**v2026.11.5-beta.3** — openclaw 2026.11.5-beta.3

- **Large-session reliability**：降低转录索引、修剪与压缩过程中的内存压力；仅流式传输选定的 hydration payloads，并支持可配置的摘要限制。
- 相关 PR：#194099、#194066、#194536、#196207
- 贡献者：@vincentkoc、@aniruddhaadak80

[查看完整 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.11.5-beta.3)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态/优先级 | 核心内容 | 为何值得关注 | 链接 |
|---|------|-------------|----------|--------------|------|
| #192124 | Manual /compact of large claude-cli session killed at 180s window | OPEN · P2 · stale | 766k Token 会话在 180s 压缩窗口被强制终止，尽管 Claude Code 约 226s 完成且无进度信号 | 直接影响大规模会话的可用性，标记为 `diamond lobster`，社区关注度高 | [链接](https://github.com/openclaw/openclaw/issues/192124) |
| #191104 | Prolonged event-loop starvation during multi-agent model publication | OPEN · P2 · stale | 25 代理安装中，序列化模型/密钥发布导致事件循环饥饿与主机入住等待 | 涉及多代理场景下的系统级稳定性，属 crash-loop 类问题 | [链接](https://github.com/openclaw/openclaw/issues/191104) |
| #199848 | Codex 0.169 model-catalog refresh 502s via inference relay | OPEN · P2 | 新版 Codex 的模型目录刷新被错误发送到仅允许 `POST /responses` 的中继，导致每轮 5 次 502 | 新近出现（11-15 创建），涉及认证提供商与代理兼容性，需尽快跟进 | [链接](https://github.com/openclaw/openclaw/issues/199848) |
| #196836 | Windows Node does not advertise computer.act despite Screen Capture enabled | OPEN · bug · regression · P2 | Windows 节点已启用屏幕捕获，但仍不广播 `computer.act` 能力 | 回归性 bug，影响 Windows 端自动化交互功能 | [链接](https://github.com/openclaw/openclaw/issues/196836) |
| #189332 | exec (zsh) heredoc on non-first pipeline stage receives upstream pipe output | OPEN · P3 · stale | zsh 管道中非首阶段的 heredoc 会混入上游管道输出，触发误报 "Exec failed" NameError | 影响 CLI 执行可靠性，尤其在 macOS 本地网关场景下 | [链接](https://github.com/openclaw/openclaw/issues/189332) |
| #190914 | Sharing one GPU between local MoE engine and media renders | OPEN · P3 · stale | 单 RTX 3090 上同时运行 MoE 引擎与 ComfyUI 媒体渲染，寻求 VRAM 借贷与 mmap 专家方案 | 反映社区对异构计算资源调度与多租户 GPU 共享的需求 | [链接](https://github.com/openclaw/openclaw/issues/190914) |
| #192156 | Telegram rich messages: expandable `<blockquote>` | OPEN · P2 · stale | 支持 Bot API 10.3 的 `expandable_blockquote`，使引用在 Telegram 中默认折叠 | 增强 Telegram 频道的富文本体验，属 UX 优化方向 | [链接](https://github.com/openclaw/openclaw/issues/192156) |
| #192157 | Telegram rich messages: honor `<table compact>` | OPEN · P3 · stale | 映射 HTML `<table compact>` 到 Bot API 10.3 `is_compact` 标志，减少单元格内边距 | 针对密集型表格（统计面板等）的显示优化 | [链接](https://github.com/openclaw/openclaw/issues/192157) |
| #187774 | Add optional Cua Spaces worker provider | OPEN · P3 · stale | 通过现有 WorkerProvider 插件契约集成 Cua Spaces 作为可选工作者提供商 | 扩展基础设施兼容性，让现有 Cua 基础设施可接入 OpenClaw | [链接](https://github.com/openclaw/openclaw/issues/187774) |
| #198767 | Binary workspace files decoded as text in Template catalog preview | CLOSED · P2 | 模板目录详情与预览将 PNG 等二进制文件按 UTF-8 解码，产生乱码 | 已关闭，但反映了模板系统中文件类型处理的基础性缺陷，可作为回归测试参考 | [链接](https://github.com/openclaw/openclaw/issues/198767) |

**社区反应总结**：过去 24 小时内大多数 Issue 均为 `stale` 状态，评论数普遍较低（0–4 条），但多个 P2 级问题（如会话压缩、事件循环饥饿、Codex 502）未获得解决，维护者审查与产品决策仍是瓶颈。

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态/标签 | 功能或修复内容 | 链接 |
|---|------|-----------|----------------|------|
| #199851 | test: stabilize hourly Gateway and runtime fixtures | OPEN · gateway, agents, size: M | 修复每小时测试因过期契约或时序假设而误拒正常启动、恢复与异步工具行为的问题 | [链接](https://github.com/openclaw/openclaw/pull/199851) |
| #199840 | fix: avoid repeated transcript copies during manual compaction | CLOSED · gateway, agents, size: XS | 手动压缩准备阶段不再为不可变转录请求可写副本，减少网关主线程工作 | [链接](https://github.com/openclaw/openclaw/pull/199840) |
| #199847 | fix(state): restore dependency checks for upgrade internals | OPEN · size: S, release-fast-lane | 修复状态升级内部与动态加载 fixture/preload 入口点上的每小时依赖检查失败 | [链接](https://github.com/openclaw/openclaw/pull/199847) |
| #199853 | fix: unblock carrier-backed releases within 12k request budget | OPEN · scripts, release-fast-lane | 将 beta.4 发布的 GitHub 请求预算从 26,880 降至 12,000，解决载体支持发布被拒问题 | [链接](https://github.com/openclaw/openclaw/pull/199853) |
| #199849 | fix(slack): deliver final reply on boundary or msg_too_long native stream | OPEN · docs, channel: slack, size: L | 修复 Slack 原生流在边界或消息过长时的最终回复投递问题 | [链接](https://github.com/openclaw/openclaw/pull/199849) |
| #199845 | fix(ui): Template detail page missing plugin page's security and version rail | CLOSED · app: web-ui, gateway, size: XL | 为模板详情页补充右侧安全与版本信息栏，与插件详情页保持一致 | [链接](https://github.com/openclaw/openclaw/pull/199845) |
| #199363 | fix(ui): Profile recovery points to unavailable actions | OPEN · app: web-ui, size: XS | 修复个人资料恢复消息指向不存在的控件，现指向支持的后续步骤 | [链接](https://github.com/openclaw/openclaw/pull/199363) |
| #199834 | improve(ui): read Activity in standard page column | OPEN · app: web-ui, size: XS | 将 Activity 页面内容移入标准 1120px 居中列，与 Automations 和 Sessions 保持一致 | [链接](https://github.com/openclaw/openclaw/pull/199834) |
| #199833 | fix(ui): give Systems its own sidebar header | OPEN · app: web-ui, size: XS | 为 Systems 页面提供独立侧边栏标题，避免显示 Sessions 头部 | [链接](https://github.com/openclaw/openclaw/pull/199833) |
| #198906 | fix(ssh): preserve whitespace inside resolved identity filenames | OPEN · size: XS, P2 | 修复 SSH 配置解析时身份文件名中重复空格或制表符被折叠的问题 | [链接](https://github.com/openclaw/openclaw/pull/198906) |

---

## 功能需求趋势

从近期 Issues 与 PR 可观察到以下社区关注方向：

1. **大会话与长上下文可靠性**  
   会话压缩超时（#192124）、转录索引内存压力（v2026.11.5-beta.3 更新内容）表明用户正在将 OpenClaw 推向更大规模的代理会话，对压缩窗口、进度反馈与内存控制提出更高要求。

2. **多代理与事件循环稳定性**  
   多代理模型发布导致的事件循环饥饿（#191104）反映出在高并发代理场景下，调度与资源竞争已成为核心痛点。

3. **跨平台节点能力一致性**  
   Windows 节点未广播 `computer.act`（#196836）等问题显示，跨操作系统（尤其是 Windows）的功能对等性仍需加强。

4. **即时通讯渠道富文本增强**  
   Telegram 可折叠引用（#192156）与紧凑表格（#192157）需求，以及 Slack 原生流修复（#199849），表明社区希望在不同通讯渠道中获得更丰富、更本地化的消息呈现。

5. **第三方基础设施集成**  
   Cua Spaces 工

:::
