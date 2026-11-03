---
title: "AI CLI 工具社区动态日报"
published: 2026-11-03
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-03

> 生成时间: 2026-11-03 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-03)

## 1. 生态全景

当前 AI CLI 工具正处于从“单一对话助手”向“多平台、多模态、企业级开发平台”的深水区转型。各主流工具普遍进入稳定性补丁与底层架构重构并行阶段，跨平台兼容性（Windows/macOS/Linux/WSL2）、沙箱安全、会话生命周期管理以及 MCP/ACP 协议生态成为四大共性瓶颈。企业用户对网络隔离、凭据持久化与合规审计的需求正在倒逼厂商加强企业级特性，而开发者侧则更关注子代理可靠性、AST 感知代码理解与多模态附件处理。整体呈现“功能扩张与稳定性债务并存”的特征，夜间构建与快速补丁发布已成为常态。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 24h Issues 更新 | 24h PR 更新 | 24h Release | 核心状态 |
|------|------|----------------|------------|------------|---------|
| Claude Code | anthropics/claude-code | 10+（精选） | 1 | 无 | 稳定性债务高，企业网络与跨平台崩溃问题突出 |
| OpenAI Codex | openai/codex | 42 | 50 | 无 | 活跃度最高，机器人自动化 PR 占比大，客户端稳定性为主 |
| Gemini CLI | google-gemini/gemini-cli | 10+（精选） | 10+（精选） | 夜间构建 v0.67.0-nightly | Subagent 稳定性与 AST 代码理解为核心 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 10+（精选） | 10+（精选） | 稳定版 v1.39.11 / Studio v2.57.0 | 安全加固与多模态文件预览 |
| OpenCode | anomalyco/opencode | 10+（精选） | 10 | 无 | V2 迁移遗留与 ACP 协议稳定性 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 无活动 |
| Hermes | NousResearch/hermes-agent | 10+（精选） | 10+（精选） | 补丁版 v0.22.6 | 多平台适配与附件内存管理 |

> 注：因原始数据仅提供精选 Issues/PR 列表，表格中“10+”表示精选条目数，非全量统计。

## 3. 共同关注的功能方向

多个工具社区在以下需求上形成共鸣，反映出行业共性痛点：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **跨平台稳定性与资源控制** | Claude Code、Codex、Gemini CLI、Hermes | Windows Electron 崩溃、macOS fseventsd/内存泄漏、WSL2 兼容性、客户端后台内存占用（高达 99% RAM） |
| **沙箱与文件系统权限** | Codex、Gemini CLI、Hermes | Windows 沙箱锁失败、macOS 完全访问权限丢失、Git 凭据缺失、权限错误误报为 not_found |
| **会话与消息隔离/生命周期** | Claude Code、OpenCode、Reasonix | 多会话历史混用、V1→V2 迁移后会话不可见、临时会话、会话压缩状态持久化 |
| **子代理/代理可靠性** | Claude Code、Gemini CLI、OpenCode | 子代理挂起、状态误报（MAX_TURNS 仍上报 success）、UI 状态丢失、自动 compact 覆盖后台运行 |
| **企业级网络与合规** | Claude Code、Codex | Cowork egress allowlist 失效、自定义 BASE_URL/代理支持、TCC 权限持久化、区域模型托管合规 |
| **协议与插件生态** | OpenCode、Hermes、Reasonix | ACP/MCP 工具中途消失、目录安装机制迁移、插件配置并发安全 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 终端原生 Agent、企业网络合规、Git 归因管理 | 专业开发者、企业团队 | 基于 Claude 模型的终端 CLI，强调与本地 Git 工作流深度集成，内部 Issue 分流已迁移至 Sonnet 5.5 |
| **OpenAI Codex** | 桌面客户端、TUI 体验、沙箱代码执行、多端同步 | 个人开发者、ChatGPT/Codex 订阅用户 | Electron 桌面端 + TUI，内置浏览器与沙箱，依赖 OpenAI 模型容量与云端同步 |
| **Gemini CLI** | 子代理编排、AST 感知代码理解、多模态终端 | AI 原生开发者、复杂代码库维护者 | 命令行优先，强调 Subagent 架构与代码库结构化理解（AST、文件映射），夜间构建迭代快 |
| **DeepSeek Reasonix** | 工作台多模态预览（Word/Excel）、SSH OTP 远程开发、ACP 协议 | 企业远程开发团队、安全敏感用户 | CLI + Studio + Desktop 三端，强调安全审计（密码不进命令行、只读预览隔离框），支持远程 SSH 交互 |
| **OpenCode** | V2 项目管理、Claude Code 钩子兼容、浏览器扩展 MCP | 插件开发者、跨生态集成者 | 开放插件架构，支持 @-mention 跨目录文件、浏览器控制 MCP，致力于与 Claude Code 生态互操作 |
| **Hermes** | 多平台消息适配（Telegram/Weixin/SimpleX）、图片附件生命周期、Kanban 自动化 | 多渠道机器人开发者、跨平台运维 | 网关 + 适配器架构，侧重即时通讯平台集成与消息语义统一，面向聊天机器人场景 |
| **Deepseek Harness** | — | — | 过去 24 小时无活动，处于低活跃或维护期 |

## 5. 社区热度与成熟度

- **最高活跃度**：OpenAI Codex（42 Issues + 50 PR，机器人自动化驱动，底层架构重构频繁）。
- **快速迭代**：Gemini CLI（夜间构建持续发布，Subagent 与 AST 能力快速演进）、DeepSeek Reasonix（稳定版与 Studio 同步发布，安全与多模态功能快速落地）。
- **稳定性债务高**：Claude Code（跨平台崩溃问题持续数月，社区焦虑情绪明显，评论数破百的 Issue 多）、Hermes（图片附件内存泄漏、MCP 工具静默消失等核心缺陷待修）。
- **低活跃/停滞**：Deepseek Harness（24 小时无任何活动）。

## 6. 值得关注的趋势信号

1. **子代理可观测性成为刚需**：Claude Code、Gemini CLI、OpenCode 均出现子代理状态误报、挂起或 UI 状态丢失问题，未来代理框架必须提供透明的生命周期追踪与轨迹可视化，否则企业级场景难以落地。

2. **AST 感知与代码库结构化理解是下一竞争点**：Gemini CLI 社区密集讨论 AST 感知文件读取、搜索与代码库映射，表明纯文本上下文正在成为瓶颈，能够精确定位代码边界的工具将获得更高采用率。

3. **企业级合规功能从“锦上添花”变为“门槛”**：Claude Code 的 Cowork allowlist、TCC 权限、Reasonix 的密码文件与只读预览，都说明网络隔离、凭据管理与数据不出域已成为大规模团队采购的必要条件。

4. **多平台即时通讯与 CLI 的边界模糊**：Hermes 在 Telegram/Weixin/SimpleX 等平台的适配，以及 OpenCode 的浏览器扩展 MCP，预示 AI CLI 正在向“多入口 AI 操作系统”延伸，终端不再是唯一交互入口。

5. **自动化 Triage 与机器人运维引发信任危机**：OpenCode 的 Openbotjr 误关闭已回复 Issue、Codex 的 copyberry[bot] 大量自动 PR，提示社区治理工具需要更精准的人机协作机制，否则将削弱维护者效率与开发者体验。

**对开发者的参考建议**：若选型侧重企业级稳定性与合规，Claude Code 和 Reasonix 的安全特性值得优先评估，但需关注其跨平台修复进度；若追求前沿代理能力与代码理解，Gemini CLI 的夜间构建迭代最快；若需要多端同步与桌面 TUI 体验，OpenAI Codex 社区活跃度最高，但客户端稳定性仍有隐患。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-03）

## 1. 热门 Skills 排行

基于 PR 更新频度与社区关注度，以下为当前最活跃的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1980 webapp-testing: avoid shell=True | 修复 `webapp-testing` 中 `with_server.py` 使用 `shell=True` 导致的命令注入风险（CWE-78） | 安全加固、子进程执行规范 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| 2 | #525 Add pyxel skill | 新增 Pyxel 复古游戏开发 Skill，支持头less 运行、帧检测与状态验证 | 游戏开发、Python 生态、长期维护（3 月创建至 11 月仍在更新） | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| 3 | #1792 fix(docx): report LibreOffice timeout | `docx` Skill 中 `accept_changes.py` 将 LibreOffice 超时标记为错误，并验证输出 DOCX 无修订痕迹 | 文档自动化、错误处理鲁棒性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| 4 | #1742 fix(mcp-builder): support mcp>=2 | 适配 `mcp>=2.0.0` 的 `streamable_http_client` 重命名及自定义 HTTP 头配置 | MCP 协议版本兼容、外部服务连接 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 5 | #1245 Add notion-spec-to-implementation | 新增两个 Skill：将 Notion 产品/技术规格转为可执行任务；以及简历定量审计 | 产品研发流程、Notion 集成、职业发展工具 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 6 | #1771 add proofcore-contract-auditor | 新增 Web3 智能合约审计 Skill，对 Solidity/Rust 进行静态分析并将审计证明锚定至 TON 区块链 | 智能合约安全、区块链存证、零知识协议 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 7 | #1298 fix(skill-creator): isolate trigger evals | 修复 `skill-creator` 触发评估误报、Windows 管道兼容及运行时失败处理 | Skill 开发者工具链、跨平台兼容性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 8 | #1703 Add md2video-audio | 新增 Markdown 转 MP4 视频 + 人声旁白 Skill（基于 Marp） | 内容多模态生成、零成本视频制作 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1703) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区当前最期待的新 Skill 方向与改进诉求如下：

1. **组织级技能共享与分发**  
   Issue #228 呼吁在 Claude.ai 内实现 org-wide 技能共享，避免当前需手动下载 `.skill` 文件并通过 Slack/Teams 分发的低效流程。

2. **安全与信任边界治理**  
   Issue #492 指出社区 Skills 冒用 `anthropic/` 命名空间存在信任边界漏洞，用户可能误将社区 Skill 当作官方 Skill 授予高权限，亟需命名空间规范与信任机制。

3. **Agent 记忆与上下文压缩**  
   Issue #1329 提议 `compact-memory` Skill，采用符号化表示压缩长期 Agent 状态，减少上下文开销。

4. **Agent 治理与安全模式**  
   Issue #412 提出 `agent-governance` Skill，覆盖策略执行、威胁检测、信任评分与审计追踪，填充 AI Agent 安全领域空白。

5. **推理质量管道**  
   Issue #1385 提出三级推理质量门禁（前置校准 → 对抗评审 → 交付验证），关注 AI 输出质量全生命周期管控。

6. **技能触发与评测可靠性**  
   Issue #556 反映 `run_eval.py` 中 `claude -p` 无法触发 Skill（0% 触发率），社区对 Skill 触发机制与自动化评测的稳定性高度关注。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，且功能填补了社区明显空白，大概率近期落地：

- **#1980 webapp-testing 安全修复**  
  涉及命令注入（CWE-78）的安全漏洞，修复优先级高，社区对测试类 Skill 的安全性要求迫切。  
  [查看 PR](https://github.com/anthropics/skills/pull/1980)

- **#525 Pyxel 复古游戏开发 Skill**  
  创建于 3 月但持续更新至 11 月，表明作者与社区维持高活跃度，游戏开发是 Claude Code 创意类应用的热门垂直领域。  
  [查看 PR](https://github.com/anthropics/skills/pull/525)

- **#1245 Notion 规格转实现 + 简历审计**  
  覆盖产品研发与职业发展两个高频场景，更新持续至 10 月，社区关注度稳定。  
  [查看 PR](https://github.com/anthropics/skills/pull/1245)

- **#1771 proofcore-contract-auditor**  
  Web3 智能合约审计与区块链存证是细分但高价值场景，技术新颖性强，适合快速合并后形成差异化能力。  
  [查看 PR](https://github.com/anthropics/skills/pull/1771)

- **#1742 mcp-builder 协议适配**  
  修复 `mcp>=2.0.0` 的破坏性变更，直接影响所有依赖 MCP 连接的 Skill，属于基础设施级修复，合并迫在眉睫。  
  [查看 PR](https://github.com/anthropics/skills/pull/1742)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在构建垂直领域专业能力（如文档自动化、Web3 审计、游戏开发）的同时，亟需通过命名空间治理、触发机制修复及组织级共享机制，解决社区 Skill 的信任边界与可用性瓶颈。**

---

# Claude Code 社区动态日报 (2026-11-03)

## 今日速览

过去24小时内，Claude Code 仓库未发布新版本，但社区活跃度依然较高。核心关注点集中在 **跨平台稳定性（macOS/Windows 崩溃与卡死）**、**企业网络与权限控制（Cowork allowlist、TCC 权限、git 凭据）** 以及 **AI 归因与会话管理（Claude-Session trailer、自动 compact）** 等长期未解决的问题上。唯一更新的 PR 显示团队正在将内部 Issue 分流工作流迁移至 Claude Sonnet 5.5。

---

## 版本发布

过去24小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数及问题严重性）筛选：

| # | 标题 | 状态 | 评论/👍 | 核心内容与重要性 | 链接 |
|---|------|------|---------|------------------|------|
| #26224 | Claude Code hanging / freezing / stuck on heaps of prompts | OPEN | 132 / 152 | **最高优先级稳定性问题**。用户反馈在处理大量 Prompt 时，Claude Code 会卡死 5-20 分钟甚至更久，问题持续近9个月未修复，社区讨论极为活跃。 | https://github.com/anthropics/claude-code/issues/26224 |
| #30112 | Cowork network egress allowlist not working | OPEN | 77 / 59 | **企业网络安全痛点**。自定义域被 403 `blocked-by-allowlist` 拦截，影响受限网络环境下的团队协作功能，已更新至11月2日仍未解决。 | https://github.com/anthropics/claude-code/issues/30112 |
| #98769 | macOS: fseventsd runaway on agent-heavy Macs | OPEN | 14 / 1 | **macOS 性能与资源泄漏**。在高负载 Agent 场景下，fseventsd 占用高达 24GB 内存并长期占用一个 CPU 核心，导致启动阻塞且无自恢复，涉及 `area:core` 与 `perf:memory`。 | https://github.com/anthropics/claude-code/issues/98769 |
| #105318 | Windows Desktop 3.x: Electron main process crashes 0xc0000005 | OPEN | 5 / 0 | **Windows 3.x 回归崩溃**。Electron 主进程每日多次崩溃（4-6次），疑似 V8 跳转至 tagged heap 指针，从 2.x 稳定版本回归，影响桌面端可用性。 | https://github.com/anthropics/claude-code/issues/105318 |
| #26572 | Proposal: CustomPaneBackend protocol | OPEN | 9 / 29 | **终端集成架构提案**。建议解耦 Agent 团队与 tmux CLI，以支持 Ghostty、WezTerm、Zellij、KILD 及远程部署，由 KILD 创建者提出，具有社区生态扩展意义。 | https://github.com/anthropics/claude-code/issues/26572 |
| #91546 | Claude-Session trailer still appended with includeCoAuthoredBy: false | OPEN | 9 / 5 | **Git 归因回归**。尽管用户设置 `includeCoAuthoredBy: false`，`Claude-Session:` trailer 仍被追加至提交和 PR 正文，属于 #66504 的回归问题，影响提交记录整洁度。 | https://github.com/anthropics/claude-code/issues/91546 |
| #65093 | Transient network loss recorded as persistent install_failed (Windows) | OPEN | 9 / 3 | **Windows 安装/更新体验**。瞬时网络丢失被错误记录为持久安装失败，"Auto-update failed" 横幅在重连后不自动清除，已在最新版本中仍可复现。 | https://github.com/anthropics/claude-code/issues/65093 |
| #102828 | Remote Control: start_session rejects "user_asked" from mobile | OPEN | 11 / 7 | **移动端远程控制**。从移动端发送的人类消息触发 `start_session` 时，`user_asked` 被拒绝，影响跨设备会话启动流程。 | https://github.com/anthropics/claude-code/issues/102828 |
| #102906 | Desktop app: host-side git fetch has no credentials for private HTTPS repos | OPEN | 3 / 0 | **macOS 桌面端 Git 凭据**。自 2.16120.0 起，私有 HTTPS 仓库的 host-side git fetch 因 "terminal prompts disabled" 失败，涉及 `sync_with_base_branch` 与 worktree 刷新。 | https://github.com/anthropics/claude-code/issues/102906 |
| #92169 | Attribution session reminder overrides user's no-attribution preference | OPEN | 2 / 5 | **隐私与偏好覆盖**。Claude Code 注入的会话归因提醒会覆盖用户显式的 "no-attribution" 偏好，强制在提交和 PR 中添加归因信息。 | https://github.com/anthropics/claude-code/issues/92169 |

---

## 重要 PR 进展

过去24小时内仅有 1 个 PR 更新：

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #106583 | Move issue triage and dedupe workflows to Claude Sonnet 5.5 | CLOSED | 将三个调用 Claude 的工作流迁移至 **Claude Sonnet 5.5**：<br>• `claude-issue-triage.yml`: `claude-opus-4-6` → `claude-sonnet-5-5`<br>• `claude-dedupe-issues.yml`: `claude-sonnet-4-6` → `claude-sonnet-5-5`<br>• `claude.yml` (`@claude`): 同上<br>这表明 Anthropic 内部正在逐步将 Issue 分流与去重工作流切换到新模型，可能旨在降低成本或提升分类准确率。 | https://github.com/anthropics/claude-code/pull/106583 |

> 注：因数据源中仅提供 1 条近期更新的 PR，本部分未能列出 10 条，其余 PR 暂无公开更新记录。

---

## 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

1. **跨平台稳定性与资源控制**  
   Windows Electron 主进程崩溃、macOS fseventsd 内存失控、跨平台卡死等问题反复出现，社区对底层稳定性和资源占用的容忍度正在降低。

2. **企业级网络与安全合规**  
   Cowork egress allowlist 失效、TCC 权限重复弹窗、Chrome 扩展 CSP 限制、自定义 `ANTHROPIC_BASE_URL`（网关/代理）需求等，表明企业用户对网络隔离、代理支持和权限持久化的需求迫切。

3. **终端与 IDE 生态解耦**  
   `CustomPaneBackend` 协议提案反映社区希望摆脱对 tmux CLI 的依赖，支持更多现代终端（Ghostty、WezTerm、Zellij 等）及远程部署场景。

4. **AI 归因与会话管理精细化**  
   用户希望能够精确控制 `Claude-Session` trailer、`Co-Authored-By` 归因信息的写入，以及对自动 compact（Idle compaction）行为的可配置性，避免在后台 Agent 运行时误触发。

5. **桌面端 Git 与凭据集成**  
   私有 HTTPS 仓库凭据缺失、macOS 密匙串集成问题，显示桌面应用在 Git 工作流中的凭据传递仍需加强。

---

## 开发者关注点（痛点与高频需求）

- **严重稳定性回归**：Windows 3.x Electron 崩溃、macOS 启动阻塞、长时间卡死等问题已持续数月，社区对修复进度的焦虑情绪明显（如 #26224 评论数破百）。
- **企业环境适配不足**：网络 allowlist、代理 URL、TCC 权限持久化等企业级功能存在明显缺口，影响大规模团队落地。
- **用户偏好被覆盖**：归因设置（`includeCoAuthoredBy: false`）未被完全尊重，自动 compact 覆盖后台 Agent 运行状态，体现“用户显式设置被系统行为覆盖”的反复模式。
- **移动端与远程控制体验断层**：`start_session` 在移动端触发时的参数拒绝，提示跨设备会话生命周期管理尚不完善。
- **内部工具链模型迁移**：团队已开始将 Issue 分流工作流迁移至 Sonnet 5.5，暗示模型版本迭代正在加速，社区或需关注未来 CLI 行为随模型更替可能产生的差异。

---

*本日报基于 github.com/anthropics/claude-code 的公开 Issues 与 PR 数据生成，仅供技术参考。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-03  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

过去 24 小时内 OpenAI Codex 仓库未发布新版本，但社区活跃度依然较高，共更新 42 条 Issue 和 50 条 PR。当前社区核心关注点集中在 **Windows/macOS 客户端稳定性、TUI 界面渲染、沙箱权限以及跨平台同步** 等可用性问题上；PR 侧则以自动化机器人（copyberry[bot]）提交的代码重构与功能补完为主，涉及弹性上下文、守护框架、会话恢复等底层能力。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心指标 | 为什么重要 | 社区反应 |
|---|------|---------|-----------|---------|
| [#49453](https://github.com/openai/codex/issues/49453) | Browser access remains blocked by a saved chat-level denial after explicitly allowing the site | 41 评论 / 3 👍 | Windows 客户端内置浏览器访问 localhost 服务被“聊天级拒绝”缓存导致持续阻断，影响本地开发调试流程。 | 讨论集中于如何清除或重置保存的拒绝状态，用户反映显式允许后仍无效。 |
| [#45163](https://github.com/openai/codex/issues/45163) | TUI: startup-only palette cache leaves input unreadable after system light/dark changes (0.154.0) | 22 评论 / 23 👍 | TUI 启动时仅缓存一次配色，系统浅色/深色模式切换后输入区域变得不可读，直接影响终端用户体验。 | 社区高度关注（23 👍），确认问题也存在于 upstream main，属于回归性 UI 缺陷。 |
| [#50520](https://github.com/openai/codex/issues/50520) | Windows sandbox: recurring helper_sandbox_lock_failed after .sandbox-bin permissions return to Modify | 15 评论 / 2 👍 | Windows 沙箱在 `.sandbox-bin` 权限恢复为 Modify 后反复报锁失败，导致 shell 命令无法启动。 | 用户通过手动授予 SYSTEM/Administrators 全控权限可暂时恢复，但问题会复发，属持续性环境故障。 |
| [#58302](https://github.com/codex/issues/58302) | macOS desktop: XLSX attachments stay pending with spinning send control on 26.1027.30824 | 14 评论 / 1 👍 | macOS 桌面端上传 XLSX 附件后发送按钮持续旋转，对话未进入新一轮，阻断数据分析工作流。 | 影响版本为最新稳定版，用户集中在 macOS 27.0.1 Apple Silicon 设备。 |
| [#44449](https://github.com/openai/codex/issues/44449) | Remote Control: threads viewed in the iOS app stay locked in the daemon, desktop fails with "already has an active writer" | 12 评论 / 7 👍 | iOS 端查看的线程会被守护进程锁定，导致桌面端无法写入，严重影响多设备协作。 | 涉及 App、App Server、远程控制多个模块，跨平台同步一致性是社区长期痛点。 |
| [#52394](https://github.com/openai/codex/issues/52394) | Codex long-running tasks repeatedly hit `server_overloaded` / At Capacity despite ~70% usage remaining | 12 评论 / 2 👍 | Windows 长时间运行任务反复触发模型容量错误，尽管仪表盘显示仍有约 70% 额度，任务被频繁中断。 | 用户尝试切换模型可暂时恢复，但错误很快复返，影响长周期自动化任务。 |
| [#38351](https://github.com/openai/codex/issues/38351) | GitHub @codex work task gets no tool to push back to existing PR despite write access | 7 评论 / 9 👍 | Codex Cloud 工作任务在现有 PR 上工作后，缺少推回（push）工具，导致无法将更代码提交回原始拉取请求。 | 直接影响 GitHub 集成工作流的核心闭环，社区关注度较高（9 👍）。 |
| [#59012](https://github.com/openai/codex/issues/59012) | "You stopped after 0s" and invisible responses | 2 评论 / 0 👍 | 新出现的严重 Bug：响应长时间旋转后不可见，提示“0 秒后停止”，对话无法继续。 | 创建于 2026-11-02，属于近期新增的客户端稳定性问题，需跟进。 |
| [#59006](https://github.com/openai/codex/issues/59006) | [Windows] Severe system-wide memory growth with ChatGPT/Codex background processes (up to 99% RAM) | 1 评论 / 0 👍 | Windows 后台进程导致系统内存占用高达 99%，可能引发全系统卡顿。 | 性能/内存泄漏类问题，创建于 2026-11-02，需关注是否为新版本回归。 |
| [#59004](https://github.com/openai/codex/issues/59004) | Consistently unable to publish environment to Codex Cloud | 1 评论 / 0 👍 | 企业版用户无法将特定环境发布到 Codex Cloud，影响团队协作与部署流程。 | 新出现的云端发布失败问题，涉及 macOS Darwin 25.6.0 环境。 |

---

## 4. 重要 PR 进展（精选 10 条）

过去 24 小时内合并的 PR 多由 `copyberry[bot]` 自动提交，主要集中在底层架构重构、会话管理、沙箱安全和 TUI 体验改进：

| # | 标题 | 功能/修复说明 |
|---|------|-------------|
| [#59011](https://github.com/openai/codex/pull/59011) | Add optional total token limits to elastic section configuration | 为 `ElasticSectionLimits` 增加 `max_total_section_tokens`，支持在构建和反序列化时拒绝低于最小值的上限，默认无区间最大值。 |
| [#59009](https://github.com/openai/codex/pull/59009) | Centralize filesystem permission resolution for sandbox enforcement | 新增 `resolve_for_enforcement` 统一收集文件系统授权、拒绝、glob 模式和平台默认值，供 Linux bubblewrap 和 macOS Seatbelt 策略共用。 |
| [#59007](https://github.com/openai/codex/pull/59007) | Add host cycling and saved defaults for new TUI conversations | 多后端支持下显示当前主机，支持 `leader b` 循环连接（映射为 `tui.keymap.global.change_host`），并保存会话默认值。 |
| [#59003](https://github.com/openai/codex/pull/59003) | Preserve Guardian review framing under elastic context limits | 在弹性上下文截断证据时，保留受保护的审查框架和授权警告，防止安全边界信息丢失。 |
| [#59001](https://github.com/openai/codex/pull/59001) | Test connection events against active environment selections | 新增集成测试，验证环境连接事件是否遵循当前轮次的环境选择：未选中的远程环境不应产生连接事件。 |
| [#59000](https://github.com/openai/codex/pull/59000] | Allow hosted child threads to inherit a root session ID | 通过 `ExtensionDataInit` 允许主机为子线程提供根会话 ID，子线程保留独立线程 ID，并将继承的会话 ID 持久化到回滚中。 |
| [#58998](https://github.com/openai/codex/pull/58998] | Preserve steering when returning to a long-running turn | 保留被有限重放缓存驱逐的活跃轮次状态，并在切换回运行中的线程时将其包含在重放中，避免转向状态丢失。 |
| [#58996](https://github.com/openai/codex/pull/58996] | Deliver environment hook decisions while output reads are queued | 将进程事件与输出轮询竞争，确保已完成的环境钩子决策不会被排队的输出读取 RPC 阻塞。 |
| [#58992](https://github.com/openai/codex/pull/58992] | Add opt-in side conversation panes to the TUI | 新增默认关闭的 `tui_workspace` 特性，终端宽度 ≥100 列时在父对话旁显示侧边对话，仅聚焦的作曲器接受输入。 |
| [#58990](https://github.com/openai/codex/pull/58990] | Preserve modified Ctrl+C keys in active TUI views | 修复按键检查器无法显示 `ctrl-alt-c` / `ctrl-shift-c` 的问题，仅当修饰键集恰好为 Control 时才将其视为普通 `Ctrl+C` 例外。 |

---

## 5. 功能需求趋势

从 Issues 中提炼，社区目前最关注的功能方向包括：

1. **跨平台与多端同步**  
   远程控制（Remote Control）、iOS 与 Windows/macOS 之间的线程锁定、对话历史不同步等问题频繁出现，用户期望更稳定的多设备协作体验。

2. **客户端稳定性与性能**  
   Windows 内存增长（高达 99% RAM）、macOS 附件上传卡死、“0 秒停止”不可见响应等问题表明，桌面端资源管理和 UI 响应仍是主要短板。

3. **沙箱与文件系统权限**  
   Windows 沙箱锁失败、macOS 完全访问权限丢失、本地文件访问失败等问题反映出沙箱策略在不同操作系统上的一致性仍需加强。

4. **GitHub 与外部工具集成**  
   `@codex` 工作任务无法推回现有 PR、MCP 插件在 ChatGPT Work/Codex 桌面端无法初始化、Google Drive 连接器未暴露工具等，显示开发者希望 Codex 更深度地融入现有开发工具链。

5. **TUI 与终端体验**  
   配色缓存导致深色/浅色切换后输入不可读、侧边对话窗格、Ctrl+C 键绑定等反馈表明，命令行界面的可用性正在成为活跃用户的关注点。

---

## 6. 开发者关注点

**高频

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-03)

## 1. 今日速览

Gemini CLI 今日发布夜间构建版本 `v0.67.0-nightly.20261102.g6814e00d6`，社区围绕 **Subagent（子代理）稳定性** 与 **Agent 行为可控性** 展开密集讨论。多个 P1/P2 级别 Bug 指向子代理在达到最大轮次后误报成功、通用代理挂起以及浏览器代理忽略配置等核心问题；PR 侧则集中于 CLI 核心修复、Windows 兼容性及安全加固。

## 2. 版本发布

- **v0.67.0-nightly.20261102.g6814e00d6**  
  夜间构建版本，相较于前一日版本 `v0.67.0-nightly.20261101.g6814e00d6` 进行了滚动更新。  
  [完整变更对比](https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261101.g6814e00d6...v0.67.0-nightly.20261102.g6814e00d6)

> 注：本次发布未附详细变更日志，建议跟踪上述对比链接查看具体提交。

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 核心内容 | 为何值得关注 | 链接 |
|---|------|------------|---------|-------------|------|
| #22323 | Subagent recovery after MAX_TURNS reported as GOAL success | P1 / Bug | 子代理在达到最大轮次前未完成分析，却仍上报 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了实际中断。 | 直接影响任务可靠性，可能导致用户误以为子代理已完成工作。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent hangs | P1 / Bug | 通用代理在处理简单操作（如创建文件夹）时无限挂起，最长等待超 1 小时。 | 严重影响交互体验，需禁用子代理才能规避，属于核心稳定性缺陷。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | P2 / Enhancement | 提出利用 Gemini 3 模型的原生 Bash 能力，通过零依赖 OS 沙箱与后执行意图路由增强代理操作系统能力。 | 涉及架构方向的重大增强，关乎代理如何更安全地执行原生命令。 | [查看](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 探索 AST 感知的文件读取、搜索与代码库映射，以减少读取误差与 Token 浪费。 | 关系到代码理解精度与上下文效率，是提升代理工程能力的关键方向。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini does not use skills and sub-agents enough | P2 / Bug | 模型在相关任务中不会主动调用自定义技能和子代理，需显式指令才触发。 | 影响子代理生态的实用性，自动化编排体验有待改进。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #22267 | Browser Agent ignores settings.json overrides | P2 / Bug | 浏览器代理完全忽略全局/项目级 `settings.json` 中的配置（如 `maxTurns`）。 | 配置失效会导致行为不可预期，影响企业级可管控性。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22267) |
| #22186 | get-shit-done output hook causes crash | P1 / Bug | 在 `get-shit-done` 输出即将完成（打印用户摘要）时导致 CLI 崩溃。 | 直接引发客户端崩溃，属于高优先级稳定性问题。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22186) |
| #24246 | Gemini CLI encounters 400 error with > 128 tools | P2 / Bug | 可用工具超过 128 个时触发 400 错误，期望代理能更智能地限制工具范围。 | 工具数量增长带来的协议层限制，影响大型代码库或扩展场景。 | [查看](https://github.com/google-gemini/gemini-cli/issues/24246) |
| #23571 | Model frequently creates tmp scripts in random spots | P2 / Bug | 模型在多个目录生成临时编辑脚本，增加工作区清理负担。 | 影响工作区整洁度与提交质量，属于代理卫生习惯问题。 | [查看](https://github.com/google-gemini/gemini-cli/issues/23571) |
| #22672 | Agent should stop/discourage destructive behavior | P2 / Feature | 建议代理在执行 `git reset --force` 等破坏性操作前进行阻止或警示。 | 涉及代理安全对齐与用户资产保护，是企业采用的重要考量。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22672) |

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 核心修复/功能 | 影响范围 | 链接 |
|---|------|-------------|---------|------|
| #30102 | fix(core): log IDE connections with the ide_connection event name | 将 IDE 连接事件从 `start_session` 改为 `ide_connection`，避免 IDE 伴随使用虚增会话计数。 | 企业/IDE 集成、遥测准确性 | [查看](https://github.com/google-gemini/gemini-cli/pull/30102) |
| #30104 | fix(cli): refresh slash commands after /skills link | `/skills link` 后技能重新发现但斜杠命令列表未刷新，现已修复。 | CLI 交互、技能系统 | [查看](https://github.com/google-gemini/gemini-cli/pull/30104) |
| #30058 | fix(core): prevent interrupted Whisper model downloads from being treated as installed | 修复 Whisper 模型下载中断后留下部分文件，导致 `isModelInstalled()` 误判的问题。 | 语音/Whisper 模型、安装可靠性 | [查看](https://github.com/google-gemini/gemini-cli/pull/30058) |
| #30100 | fix(cli): handle stream failures during extension release downloads | 增强扩展下载的流错误处理、部分文件清理、SSRF/重定向加固及 socket 超时。 | 扩展系统、下载安全性 | [查看](https://github.com/google-gemini/gemini-cli/pull/30100) |
| #30003 | fix(cli): use default value when env var is set but empty | `${VAR:-default}` 在变量为空时现在会使用默认值，与 Bash 行为一致。 | 配置解析、环境变量 | [查看](https://github.com/google-gemini/gemini-cli/pull/30003) |
| #30051 | fix(cli): kill active shells and persist tool calls on headless interruption | 头less 模式中断时杀死活跃 Shell 并持久化工具调用，避免进程以退出码 0 退出或 Shell 残留。 | 非交互模式、进程管理 | [查看](https://github.com/google-gemini/gemini-cli/pull/30051) |
| #30097 | fix(cli): make image paste work on WSL2 | WSLg 环境下图片粘贴失败，新增 `WAYLAND_DISPLAY` / `DISPLAY` 回退及 BMP 降级。 | WSL2、剪贴板、多平台兼容 | [查看](https://github.com/google-gemini/gemini-cli/pull/30097) |
| #30095 | fix: prevent Windows git diff permission bypass | 修复 Windows 上 Git 命令安全绕过，统一只读 Git 命令校验。 | Windows、Git 安全 | [查看](https://github.com/google-gemini/gemini-cli/pull/30095) |
| #30094 | fix(cli): show executing subagent tool calls in UI state | 修复子代理无需审批的工具调用（读取、搜索等）在 UI 状态中丢失的问题。 | 子代理 UI、调度器 | [查看](https://github.com/google-gemini/gemini-cli/pull/30094) |
| #29935 | fix(cli): preserve whitespace in referenced file content | 移除 `@file` 引用文件内容时的额外 `.trim()`，保留缩进与末尾换行。 | 文件引用、上下文保真度 | [查看](https://github.com/google-gemini/gemini-cli/pull/29935) |

## 5. 功能需求趋势

从近 24 小时的 Issue 与 PR 中，可清晰识别出社区关注的四大功能方向：

1. **子代理（Subagent）可观测性与可靠性**  
   多个高优先级 Issue 指向子代理状态上报错误（#22323）、挂起（#21409）、UI 状态丢失（#30094）以及 Bug 报告缺乏子代理上下文（#21763）。社区亟需更透明的子代理生命周期管理与轨迹可见性（如 #22598 提议通过 `/chat share` 共享子代理轨迹）。

2. **AST 感知的代码理解能力**  
   #22745、#22746、#22747 围绕 AST 感知的文件读取、搜索与代码库映射展开，社区希望通过更精确的代码边界定位减少 Token 浪费并提升代理在大型代码库中的检索效率。

3. **跨平台与本地环境兼容性**  
   WSL2 图片粘贴（#30097）、Windows Git 权限绕过（#30095）、Windows 路径解析（#29931）、Wayland 下浏览器子代理失效（#21983）等问题表明，跨平台（尤其是 Windows/WSL/Linux 桌面环境）的稳定性是当前痛点。

4. **代理安全与破坏性行为防护**  
   #22672 提出阻止 `

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期：** 2026-11-03  
**数据来源：** github.com/esengine/DeepSeek-Reasonix

---

## 1. 今日速览

Reasonix 今日发布稳定版 **v1.39.11** 及 **Studio v2.57.0**，核心聚焦安全加固与工作台能力扩展：修复 `python3 -v` 被误判为只读探针的安全漏洞，新增 `reasonix serve --password-file` 避免密码泄露至进程命令行，并上线 Word/Excel 只读预览。社区侧围绕会话管理、WSL 兼容性及 Mermaid 渲染等议题活跃，开发者提交了多项针对 TUI、桌面端及 ACP 协议的修复与特性 PR。

---

## 2. 版本发布

### Reasonix CLI v1.39.11（稳定版）
**安全修复：** `python3 -v` 脚本不再被当作只读的版本探针，与其他会运行代码的命令一样，执行前需先获得用户批准。

### Reasonix CLI v2.57.0
基于 Studio 发布版 `studio-v2.57.0` 构建的 CLI 归档包。

### Reasonix Studio v2.57.0
- **新增：** 工作台支持只读预览 Word（.docx）与 Excel（.xlsx），包含多工作表、数字格式和合并单元格；内容在隔离框中显示，不运行宏和脚本，可在设置中关闭。（关联 #14622）
- **修复：** `reasonix serve` 密码不再出现在进程命令行中，新增 `--password-file` 从仅所有者可读的文件读取密码；`--hash-password` 同步支持。（修复 #14913，已在 #14914 解决）
- **优化：** 改进长时间等待后台任务时模型的表现与功耗。

### Reasonix Desktop v1.39.11（稳定版）
同步 v1.39.11 的安全修复：`python3 -v` 不再被当成只读版本探针，需先批准。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 关注理由 | 链接 |
|---|------|------|----------|------|
| #14622 | 右侧工作台添加多种文件格式预览及引用部分内容插入对话 | OPEN | 社区高参与度（26 条评论），直接对应 v2.57.0 新上线的 Word/Excel 预览能力，后续或将扩展至 PPT、视频及网页控件引用。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14622) |
| #13748 | Add Mermaid diagram rendering to Reasonix Studio Markdown | OPEN | 请求在 Markdown 消息中渲染 Mermaid 图表而非纯代码块，已有对应 PR #14945 进行实现，是文档与可视化体验的关键需求。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/13748) |
| #14892 | 建议加入临时会话功能 | OPEN | 用户希望新建不保存的临时对话，支持问完后选择转为正常会话，反映社区对会话生命周期管理的灵活性需求。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14892) |
| #14936 | 不输出答案 | CLOSED | v2.57.0 用户反馈模型不输出答案，属于新版本回归问题，已关闭，需关注是否彻底解决。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14936) |
| #14880 | Failed to fetch | CLOSED | 前端 `TypeError: Failed to fetch` 网络请求失败，涉及 Studio 与后端通信稳定性，已关闭。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14880) |
| #14932 | WSL kernel outlives its link | OPEN | Windows 11 + WSL 2 环境下内核未随链接拆除，技术性较强，影响跨平台开发者使用体验。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14932) |
| #14924 | 重启+更新后会话压缩状态失效 | OPEN | 更新后会话被重新压缩但内容未变，涉及会话状态持久化与压缩逻辑，影响长期使用的会话完整性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14924) |
| #14929 | 建议增加查看未读消息功能 | CLOSED | 用户困惑于图标上的红点未明确指示未读内容，属于 UI 通知透明度优化需求。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14929) |
| #14845 | expanded tool results have a weird shadow | CLOSED | macOS 桌面端工具结果展开时出现异常阴影，属于渲染层细节修复。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14845) |
| #14931 | text overlap when downloading new version | OPEN | v2.57.0 下载新版本时版本描述与“更新内容”按钮重叠，已有对应修复 PR #14938，影响更新流程的可读性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14931) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #14945 | feat(studio): render Mermaid fences safely on demand | OPEN | 在 Studio Markdown 中懒加载渲染 Mermaid 围栏，支持预览/源码切换、复制源码、可读的渲染/语法错误，适配浅色/深色主题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14945) |
| #14944 | feat(remote): support SSH OTP and keyboard-interactive challenges | OPEN | Studio 与 CLI 支持 SSH 键盘交互式 OTP 和密码+OTP，保留服务器标题、指令、问题顺序、回显标志及多轮交互，断线重连请求新答案。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14944) |
| #14940 | fix(agent): recover DeepSeek reasoning-only final answers | OPEN | 要求 DeepSeek 思考完成必须包含可见最终答案内容，使用有界空答案恢复机制（重试通知 + 最多两轮模型调用，随后抛出 `EmptyFinalError`）。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14940) |
| #14935 | fix(studio): 消息正文不再出现附件内部路径 | OPEN | 修复用户消息展示文本中包含 `@.reasonix/attachments/...` 宿主寻址 token 的问题，图片改为附件字段呈现，正文仅保留用户输入；支持“全部复制 / 仅复制文字”及粘贴还原。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14935) |
| #14916 | feat(studio): 新增「管理会话」面板 | OPEN | 新增跨项目批量归档与删除面板，支持从项目列表更多操作菜单和 Ctrl-K 打开，按最近活动列出本机会话，支持搜索、翻页、逐行勾选和全选。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14916) |
| #14938 | fix(desktop): prevent version download text overlap | OPEN | 修复下载新版本时版本描述与“更新内容”按钮占用同一网格单元导致的文字重叠问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14938) |
| #14943 | fix(skills): render first and new discovery warnings safely in TUI | OPEN | 修复 TUI 中活跃期间的首次/新发现诊断缺陷，将技能发现诊断作为渲染器管理的通知发送，保留现有去重逻辑。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14943) |
| #14948 | fix(acp): a lease refusal says which refusal it is | OPEN | ACP 前端对会话租约拒绝返回更明确的错误码与描述，避免所有租约失败都使用不透明的 `-32603`。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14948) |
| #14947 | fix(history): a search says when the index could not read a source | OPEN | 历史搜索在索引无法读取来源时能够区分“索引损坏”与“未找到结果”，通过 `history_sources.health = 'corrupt'` 记录失败。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14947) |
| #14928 | fix(shellsafe): python -v is import tracing, not a version probe | CLOSED | 1.x 线安全修复（GHSA-qrrg-f72x-hx7r），将 `python -v` 从只读版本探针允许列表移除，改为按运行代码命令的方式审批。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14928) |

---

## 5. 功能需求趋势

从近 24 小时 Issues 与 PR 可观察到以下社区关注方向：

1. **多模态文件预览与内容引用**  
   #14622 持续获得关注，用户期望在工作台内直接预览 Word、Excel、PPT 及视频，并支持将文件内容或片段引用到对话中，供模型定位修改。v2.57.0 已率先落地 Word/Excel 只读预览。

2. **会话生命周期管理**  
   临时会话（#14892）、跨项目批量归档/删除（#14916）、会话压缩状态持久化（#14924）等需求集中出现，表明开发者对会话的组织、归档与临时使用场景有更强控制欲。

3. **Markdown 与可视化增强**  
   Mermaid 图表渲染（#13748、PR #14945）成为文档体验的高频诉求，社区希望 Reasonix Studio 在技术文档展示上更接近现代笔记/知识库工具。

4. **远程开发与 SSH 交互**  
   PR #14944 引入 SSH OTP 和

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-03)

## 今日速览

OpenCode 社区今日围绕 V2 迁移遗留问题、ACP 协议稳定性及 DeepSeek 模型区域托管展开广泛讨论。虽然过去 24 小时无新版本发布，但社区提交了多个针对 V2 项目管理、插件配置并发及会话迁移的修复 PR，机器人自动化 triage 机制引发开发者关注。

## 版本发布

过去 24 小时内无新版本 Release。

## 社区热点 Issues

以下 10 个 Issue 今日更新活跃或社区关注度较高，建议重点跟进：

| # | 标题 | 状态 | 核心内容 | 关注理由 |
|---|------|------|----------|----------|
| [#49827](https://github.com/anomalyco/opencode/issues/49827) | migrate-v1: non-git sessions in "global" project hidden after V1→V2 upgrade | OPEN | V1 存储在 `global` 项目（非 git 目录）的会话在升级到 V2 后，因 TUI 会话选择器过滤为当前项目而不可见。 | 迁移兼容性问题，评论数达 20 条，社区讨论热烈，直接影响老用户升级体验。 |
| [#52154](https://github.com/anomalyco/opencode/issues/52154) | message history isolation per session | OPEN | 多会话场景下，按方向键调取历史消息时会混入其他会话的记录，而非当前会话的最后一条消息。 | 核心交互体验问题，👍5，影响日常多会话切换效率。 |
| [#52958](https://github.com/anomalyco/opencode/issues/52958) | [Billing] OpenCode Go subscription: all payment methods declined from Italy (EU) | CLOSED | 意大利用户尝试订阅 OpenCode Go 时，所有支付方式（实体卡、Apple Pay、Stripe Link、虚拟 Mastercard）均被拒绝。 | 跨区域支付问题，评论 14 条，涉及订阅转化与全球化服务可用性。 |
| [#61077](https://github.com/anomalyco/opencode/issues/61077) | [FEATURE]: Serve DeepSeek V4.1 Flash / V4 Pro on OpenCode Go from US/EU hosting | CLOSED | 订阅用户需选择 Global 区域才能使用 DeepSeek V4.1 Flash/V4 Pro，而 Console 按量用户已可使用 US/EU 托管，社区要求统一区域选项。 | 新模型区域托管需求，反映社区对数据合规与访问延迟的关注。 |
| [#61072](https://github.com/anomalyco/opencode/issues/61072] | Claude Agent: 5-hour plan limit drains ~1.8x faster because the SDK labels requests sdk-ts | CLOSED | Claude Agent 通过 SDK 启动时设置 `CLAUDE_CODE_ENTRYPOINT=sdk-ts`，导致请求被贴上该标签，5 小时计划消耗速度比 Claude Code 原生 TUI 快约 1.8 倍。 | 计费与计量透明度问题，直接影响付费用户成本。 |
| [#60316](https://github.com/anomalyco/opencode/issues/60316] | [reproduced] ACP: set_config_option can answer with the previous selection when the switch echo lands late | OPEN | ACP 协议下 `session/set_config_option` 响应可能描述的是上一次选择而非当前选择，根因在于服务端切换响应滞后。 | ACP 协议一致性缺陷，影响第三方客户端集成可靠性。 |
| [#61303](https://github.com/anomalyco/opencode/issues/61303] | projects: new project in folder without git repo resolves to C:\ root | OPEN | Windows 上在非 git 文件夹创建新项目时，项目根路径错误解析为 `C:\` 并命名为 "Root"，初始化 git 仓库后仍无效。 | Windows 平台项目管理 Bug，影响本地开发工作流。 |
| [#61301](https://github.com/anomalyco/opencode/issues/61301] | [reproduced] Uncaught Exception: Error: ENOSPC: no space left on device | OPEN | 桌面应用写入窗口状态文件时因磁盘空间不足抛出未捕获异常，导致崩溃。 | 客户端稳定性问题，涉及磁盘空间边界情况的异常处理。 |
| [#61298](https://github.com/anomalyco/opencode/issues/61298] | [reproduced] cli: concurrent plugin config updates can lose successful changes | OPEN | `opencode plugin add/remove` 的配置写入缺乏锁保护，并发执行时会丢失成功的更改。 | CLI 配置并发安全问题，已有对应修复 PR (#61300)。 |
| [#61304](https://github.com/anomalyco/opencode/issues/61304] | OPENBOTJR CLOSES ISSUES THAT HAVE RESPONSES WITH "HAVEN'T HEARD BACK" | OPEN | 社区机器人 Openbotjr 在用户已回复的情况下仍误关闭 Issue，且无法通过 @ 提及触发，triage 机制存在缺陷。 | 社区治理与工具链问题，影响 Issue 流转效率与开发者体验。 |

## 重要 PR 进展

今日合并或更新的 10 个重要 PR，涵盖 Bug 修复与功能增强：

| # | 标题 | 状态 | 功能/修复内容 | 关联 Issue |
|---|------|------|---------------|------------|
| [#61300](https://github.com/anomalyco/opencode/pull/61300) | fix(cli): serialize plugin config updates | OPEN | 在 CLI 插件 add/remove 中，将配置读取、编辑与重命名的读-改-写操作加锁，防止并发更新丢失。 | #61298 |
| [#61306](https://github.com/anomalyco/opencode/pull/61306) | fix(core): compact once after payload size rejections | OPEN | 针对 HTTP 413 负载过大拒绝后，长会话重复重发同一负载的问题，增加一次性 compact 机制。 | #53107 |
| [#61299](https://github.com/anomalyco/opencode/pull/61299] | feat(tui): support @-mentioning files outside the project directory | OPEN | 将 V1 中的功能移植到 V2，支持在 TUI 中 @ 提及项目目录外的文件。 | #16463, #16464 |
| [#58846](https://github.com/anomalyco/opencode/pull/58846] | fix(core): repair V1 global sessions left by completed imports | OPEN | 修复已完成导入的 V1 全局会话归属问题，将其正确关联到所在文件夹的项目，解决升级后会话不可见。 | #49827 |
| [#59001](https://github.com/anomalyco/opencode/pull/59001] | fix(core): save a location's project only after its folder is found | CLOSED | 仅在文件夹存在后才保存位置的项目，避免不存在文件夹的位置先行保存 Project 导致 404。 | #57988 |
| [#54885](https://github.com/anomalyco/opencode/pull/54885] | docs(www): add ecosystem page listing community projects | OPEN | 为 V2 文档补充生态页面，列出社区项目与插件，填补 V1 站点归档后的空白。 | #42752, #48746 |
| [#52765](https://github.com/anomalyco/opencode/pull/52765] | feat(core): run Claude Code tool hooks | CLOSED | 运行 `~/.claude/settings.json` 中的 `PreToolUse`、`PostToolUse` 和 `SessionStart` 钩子，增强与 Claude Code 生态的兼容性。 | #12472 |
| [#52764](https://github.com/anomalyco/opencode/pull/52764] | feat(tui): add custom statusline command | CLOSED | TUI 新增 `statusline` 配置项，支持执行 shell 命令并将会话状态作为 JSON 通过 stdin 传入，用于自定义状态栏。 | #37464 |
| [#52818](https://github.com/anomalyco/opencode/pull/52818] | feat(browser-extension): add OpenCode Browser | CLOSED | 新增 Chromium 浏览器扩展，允许 AI 代理通过 `browse` MCP 工具控制真实浏览器（标签页、截图、网络流量等）。 | — |
| [#52629](https://github.com/anomalyco/opencode/pull/52629] | fix(core): use provider-reported costs when using OpenAI chat protocol | CLOSED | 对 OpenAI 聊天协议（OpenRouter、LiteLLM、Manifest OpenAI 模式）使用供应商报告的费用，修正网关按请求计费的成本统计。 | #43818 |

## 功能需求趋势

从今日全部 Issues 中提炼出的社区关注方向：

1. **跨区域模型托管与合规**：多个 Issue 指出 DeepSeek V4.1 系列模型在 OpenCode Go 上受限于 Global 区域，欧洲用户反馈首 token 等待时间显著更长，社区强烈要求在 US/EU 提供托管选项。
2. **会话与消息隔离**：用户希望多会话之间的消息历史、上下文能够更好地隔离，避免方向键等交互混入其他会话记录。
3. **ACP 协议稳定性**：作为第三方客户端集成的关键协议，ACP 的 `set_config_option` 响应一致性、MCP 工具在会话移动后的短暂丢失等问题成为集成商关注重点。
4. **跨平台项目管理**：Windows 上非 git 目录的项目根路径解析错误，以及 V1 迁移后全局会话不可见，表明跨平台项目与会话管理仍需打磨。
5. **计费透明度**：Claude Agent 的 SDK 入口标签导致计划消耗加快，用户对计量逻辑与实际使用的差异敏感。

## 开发者关注点

1. **自动化 Triage 机制引发信任危机**：Openbotjr 多次在用户已回复的情况下误关闭 Issue，社区多次呼吁修复机器人逻辑，否则将影响 Issue 流转与维护者响应效率。
2. **并发配置写入安全**：CLI 插件管理的读-改-写缺乏锁保护，并发场景下会丢失配置更改，需尽快合并 #61300 并覆盖更多配置入口。
3. **客户端异常处理健壮性**：桌面应用在磁盘空间不足等边界情况下抛出未捕获

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 | 2026-11-03

## 1. 今日速览

Hermes Agent 于 2026-11-02 发布补丁版本 **v0.22.6**，汇总了自 v0.22.5 以来约 776 个 PR 的稳定性修复，覆盖 CLI、安装程序、Microsoft Store、Docker 及 Hermes Cloud。社区当前高度关注图片附件内存泄漏、MCP 工具中途消失、Windows 平台日志与 Kanban 工作器异常，以及跨平台适配（Telegram/Weixin/SimpleX）等核心问题。

## 2. 版本发布

**Hermes Agent v0.22.6** (2026-11-02)  
- 类型：Patch 版本，滚合自 v0.22.5 以来约 776 个已合并 PR  
- 发布渠道：CLI、安装程序、Microsoft Store 应用、Docker、Hermes Cloud  
- 备注：本版本为稳定性滚动发布，完整 curated 变更说明将随 v0.23.0 交付  
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.6

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 关注理由 | 链接 |
|---|------|---------|---------|------|
| #143918 | Image attachments: user uploads are never evicted | 图片附件从不被回收，且按全尺寸附带，导致图片密集型对话中每次 LLM 调用都携带 multi-MB relay body | 评论数最多（10条），由 Hermes AI Agent 自动生成并附代码引用与复现测试，直接影响推理成本与响应延迟 | https://github.com/NousResearch/hermes-agent/issues/143918 |
| #55287 | feat(desktop): Add configurable chat width setting | 桌面端外观设置缺少可调节对话内容最大宽度（`--composer-width`）的控制项 | 评论9条，👍3，典型的用户体验改进需求，社区关注度高 | https://github.com/NousResearch/hermes-agent/issues/55287 |
| #133435 | committed package-lock.json pins 18 high npm vulnerabilities | 锁文件锁定了 undici、electron、axios、js-yaml 等 18 个高危 npm 漏洞，`hermes update` 路径会丢弃 lockfile 变更并重新安装致命锁文件 | 评论6条，涉及供应链安全与依赖管理，对企业部署敏感 | https://github.com/NousResearch/hermes-agent/issues/133435 |
| #44843 | `read_file` returns inconsistent response structure in `execute_code()` sandbox | 沙箱中 `read_file()` 返回结构不一致，取决于是否传入 `limit` 及文件是否已被读取 | 评论6条，工具层稳定性问题，直接影响代码执行 Agent 的可靠性 | https://github.com/NousResearch/hermes-agent/issues/44843 |
| #147377 | Login-stamped legacy Bot Chat row can't be adopted | 部分 profile 的 "Bot Chat" 行无法被任何 actor 采纳，`message_agent` 持续返回 `not_found` | 评论4条，网关/会话层严重 bug，导致消息投递永久失败 | https://github.com/NousResearch/hermes-agent/issues/147377 |
| #109798 | MCP tool silently and permanently vanishes mid-run | 远程 MCP 服务器的工具在会话运行中途静默消失，尽管 `hermes mcp test` 显示连接正常 | 评论3条，MCP 生态稳定性是当前 Agent 框架的关键痛点 | https://github.com/NousResearch/hermes-agent/issues/109798 |
| #118678 | Telegram: bot-created forum topics bypass `require_mention` | 机器人创建的论坛话题中，所有消息都被视为回复机器人，绕过 `require_mention` 限制 | 评论3条，👍2，Telegram 平台适配缺陷，影响群组权限控制 | https://github.com/NousResearch/hermes-agent/issues/118678 |
| #146955 | v0.22.5 Windows: Kanban worker prompt never delivered | Windows 11 多 profile 网关下，Kanban worker 升级到 v0.22.5 后提示词不再投递，空闲超时 | 评论3条，平台特定回归 bug，影响自动化工作流 | https://github.com/NousResearch/hermes-agent/issues/146955 |
| #127975 | Windows file logging stops rolling when pywin32's DLL is not registered | Windows 上 pywin32 DLL 未注册导致日志不滚动，文件无限增长 | 评论3条，Windows 运维与可观测性问题 | https://github.com/NousResearch/hermes-agent/issues/127975 |
| #138090 | `read_file` reports "File not found" for permission denied / sandbox | 权限不足或沙箱拒绝时，`read_file` 错误返回 `not_found: true` 而非准确的权限错误 | 评论3条，工具错误处理不清晰，增加排查难度 | https://github.com/NousResearch/hermes-agent/issues/138090 |

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 修复/功能内容 | 链接 |
|---|------|------|--------------|------|
| #148201 | fix(desktop): move macOS traffic lights closer to the window edge | Bug | 将 macOS 窗口红绿灯左侧边距从 24pt 调至 12pt，匹配渲染器初始间距，避免原生窗口状态到达时的布局偏移 | https://github.com/NousResearch/hermes-agent/pull/148201 |
| #148196 | fix(pm): build native sdists with gcc/g++ when pinned Python's clang is missing | Bug | 包管理器在检测到绑定 Python 记住的 clang 缺失时，自动回退使用 gcc/g++ 编译 C/C++ 代码，修复 Ubuntu/Debian/WSL 等环境下的构建失败 | https://github.com/NousResearch/hermes-agent/pull/148196 |
| #148199 | fix(pm): plugin dev/test extras and dependency groups no longer fail the update lock | Bug | 插件测试专用依赖（如 `dev = ["httpx<0.28"]`）不再与 Hermes 核心依赖一起求解，避免 `hermes update` 整体锁定失败 | https://github.com/NousResearch/hermes-agent/pull/148199 |
| #148193 | fix(bundles): keep uv's wheel links from payload cache to machine cache | Bug | 绑定安装保留 uv wheel 链接，使每个 wheel 仅打包一次并支持离线重建 | https://github.com/NousResearch/hermes-agent/pull/148193 |
| #148205 | fix(pm): leave out a carried extra that no longer builds instead of failing every update | Bug | 迁移旧安装时，若某可选特性无法在当前机器构建，不再导致整个更新失败，而是跳过该特性 | https://github.com/NousResearch/hermes-agent/pull/148205 |
| #148208 | refactor(mcp): manage_connections and gateway RPCs stop using the MCP catalog | Refactor | Agent 的 `manage_connections` 工具不再提供从内置目录安装 MCP 服务器，TUI 网关 MCP RPC 亦停止读取目录，旧客户端保持兼容 | https://github.com/NousResearch/hermes-agent/pull/148208 |
| #148209 | refactor(mcp): catalog REST and CLI become stubs; docs teach `hermes mcp add` | Refactor | MCP 目录 REST 路由与 `hermes mcp install\|catalog\|picker` 降级为指向 `hermes mcp add` 的存根，文档改为教导手动添加服务器 | https://github.com/NousResearch/hermes-agent/pull/148209 |
| #148206 | fix(desktop): resize the PTY to the pane's size when the shell opens | Bug | 修复 Webapp/桌面终端打开时 PTY 列数过期导致右对齐输出换行的问题， pane 拖拽后即可修正 | https://github.com/NousResearch/hermes-agent/pull/148206 |
| #148200 | fix(pm): default a CMake policy floor into uv source builds so python-olm builds under CMake 4 | Bug | 为 uv 源码构建设置 CMake 策略下限，修复 CMake 4 环境下 Matrix 支持（python-olm）的构建失败 | https://github.com/NousResearch/hermes-agent/pull/148200 |
| #148202 | fix(auth): sticky DEAD applies only to the 401 following a dead grant | Bug | 修复凭证池中 `_mark_exhausted` 逻辑：一旦 OAuth 凭证被标记为 `STATUS_DEAD`，后续任意失败状态都会使其保持终端状态，现已限定为仅对紧随其后的 401 生效 | https://github.com/NousResearch/hermes-agent/pull/148202 |

## 5. 功能需求趋势

从近 24 小时的 Issue 与 PR 中可观察到以下社区关注方向：

1. **多模态与附件管理**：图片附件不被回收、全尺寸转发导致 LLM 调用体积膨胀（#143918）；SimpleX 内联 base64 图片丢失（#76362）。社区亟需更高效的多媒体附件生命周期管理与压缩策略。
2. **桌面端用户体验定制**：可配置聊天宽度（#55287）、Kanban 移动端适配（#87186、#87244）、macOS 窗口控件布局（#148201）。桌面端个性化与跨设备适配成为高频需求。
3. **MCP 与插件生态稳定性**：MCP 工具中途静默消失（#109798）、内置 MCP 目录正在被移除并改为手动添加（#148208、#148209）、插件目录条目不可安装（#147662）。插件/工具链的可靠性与发现机制是核心趋势。
4. **跨平台消息适配**：Telegram 论坛话题绕过提及限制（#118678）、Weixin `/model` 指令缺乏反馈（#147774）、非 WhatsApp 适配器元数据被拒绝（#146220）。多平台消息语义统一仍有缺口。
5. **Windows 平台支持**：日志滚动失效（#127975）、Kanban worker 提示词不投递（#146955）、绑定 Git 无法克隆（#1455

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-03)

## 今日速览

今日 OpenClaw 社区围绕 **iOS 端体验修复**、**Gateway 内存泄漏** 以及 **语音会话（Talk）功能完善** 展开活跃讨论。P1 级 macOS Gateway 内存泄漏问题持续发酵，多个 P2 级 iOS UI 缺陷已有对应修复 PR 提交；ElevenLabs 语音插件与 ClawHub 技能扩展成为社区功能需求的新热点。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues

| # | 标题 | 优先级/标签 | 核心内容 | 关注理由 | 链接 |
|---|------|------------|---------|---------|------|
| #189806 | macOS app-hosted Gateway (Bun) 内存每日增长 ~0.5 GB，导致主机交换 | P1, crash-loop, 🦪 silver shellfish | macOS 上 OpenClaw.app 托管的 Gateway 内存持续泄漏，六天内从空闲增长至 9.39 GB，触发大量 Swap 并影响 CLI 调用 | 仅有的 P1 级生产稳定性问题，直接影响 macOS 用户可用性，需紧急跟进 | [查看 Issue](https://github.com/openclaw/openclaw/issues/189806) |
| #112313 | 死信外投递队列条目永久化，无任何访问路径可读取、重试或清除 | P2, source-repro, 🦞 diamond lobster, ux-friction | 条目一旦进入 `status='failed'` 即成为终端状态，`openclaw health` 会永久计数，其他访问器均无法处理 | 创建于 2026-07-21 的老旧高影响 Bug，评论数达 11 条，社区关注度持续高涨 | [查看 Issue](https://github.com/openclaw/openclaw/issues/112313) |
| #191539 | 原生 iOS 代理头像显示为首字母缩写而非桌面端图片 | P2, source-repro, 🦞 diamond lobster, ux-friction | iOS 原生代理选择器、列表和聊天工具栏消耗徽章文本而非配置图片，在 iPhone Duo 上可复现 | 今日新建并已有对应修复 PR (#191540)，代表 iOS 端体验优化的紧迫需求 | [查看 Issue](https://github.com/openclaw/openclaw/issues/191539) |
| #191531 | 通过 Gateway 中继的语音-only Talk 会话不自动生成标题 | P2, source-repro, 🦞 diamond lobster, ux-friction | 会话列表显示原始密钥而非标题，客户端直连模式不存在此问题 | 今日新建，已有对应修复 PR (#191532)，语音交互体验缺陷 | [查看 Issue](https://github.com/openclaw/openclaw/issues/191531) |
| #190914 | 单 GPU 共享：本地 MoE 引擎与媒体渲染（mmap 专家 + VRAM 借用） | P3, clawsweeper:intake:support | 单 RTX 3090 (24 GiB) 上同时运行 MoE 聊天与 ComfyUI 图像/视频工作，寻求社区先例 | 反映开发者在消费级显卡上部署多模态工作负载的真实痛点 | [查看 Issue](https://github.com/openclaw/openclaw/issues/190914) |
| #184709 | 支持 ElevenLabs 批量转录的关键词提示 (keyterm prompting) | P3, clawsweeper:intake:feature | 通过 `providerOptions.elevenlabs` 向 Scribe v2 传入显式词汇表，提升专有名词转录准确率 | ElevenLabs 插件功能扩展的代表性需求 | [查看 Issue](https://github.com/openclaw/openclaw/issues/184709) |
| #187817 | ElevenLabs 插件生成短多对话对话 MP3 | P3, clawsweeper:intake:feature | 将带两个选定声音的有序脚本转换为一段生成的对话 MP3，适用于访谈或播客场景 | 语音内容生成方向的社区需求 | [查看 Issue](https://github.com/openclaw/openclaw/issues/187817) |
| #189354 | 通过现有 zalouser 频道搜索并发送原生 Zalo 贴纸 | P3, clawsweeper:intake:feature | 基于社区补丁，在官方 Zalo Personal 插件中支持贴纸搜索与发送 | 即时通讯渠道本地化功能扩展 | [查看 Issue](https://github.com/openclaw/openclaw/issues/189354) |
| #183537 | 考虑将 ShieldCortex 和 multi-clawd 加入官方插件目录或认证发布者列表 | P3, clawsweeper:intake:feature | Drakon Systems 维护的两款开源插件已在自有 OpenClaw Agent 机群上日常运行 | 插件生态认证与分发机制的社区讨论 | [查看 Issue](https://github.com/openclaw/openclaw/issues/183537) |
| #191008 | ClawHub 技能提供：公司研究任务（付费研究任务，用于免费搜索额度耗尽时） | P3 | 基于 x402 按次付费 API，公司输入，输出富研究简报，$1.50 仅按交付收费 | ClawHub 商业化技能市场的早期探索 | [查看 Issue](https://github.com/openclaw/openclaw/issues/191008) |

---

## 重要 PR 进展

| # | 标题 | 状态/优先级 | 功能或修复内容 | 链接 |
|---|------|------------|-------------|------|
| #191474 | fix(ios): 网关重连重试期间保持恢复控件可用 | OPEN, P0, app: ios | 修复 iPhone 用户保存的网关地址失响应时（如 DHCP 变更的 LAN 主机），整个聊天屏幕因重试而卡死的问题；头卡在“连接中”，侧边栏不可用 | [查看 PR](https://github.com/openclaw/openclaw/pull/191474) |
| #191540 | fix(ios): 显示代理图片并放大 Duo 侧边控件 | OPEN, app: ios | 修复原生 iOS 选择器、代理列表和聊天工具栏中代理头像显示为首字母缩写的问题，关联 Issue #191539 | [查看 PR](https://github.com/openclaw/openclaw/pull/191540) |
| #191532 | fix(talk): 语音-only 继电器 Talk 会话在用户发言后仍保持无标题 | OPEN, P2, gateway | 修复通过 Gateway 中继运行实时语音的新语音-only Talk 会话在用户发言后仍保持无标题，关联 Issue #191531 | [查看 PR](https://github.com/openclaw/openclaw/pull/191532) |
| #191536 | fix(gateway): 失败插件替换后恢复回复发布 | OPEN, agents | 修复失败的串行插件替换会使每个回复运行时退出，导致对话在手动重启 Gateway 前不可用 | [查看 PR](https://github.com/openclaw/openclaw/pull/191536) |
| #191538 | fix(ui): Android 代理浏览器冷启动后显示标签不可用 | OPEN, app: web-ui | 修复 Android 聊天代理浏览器卡片在冷启动复用 Chrome 启动标签时显示“此标签已不可用”并保持空白 | [查看 PR](https://github.com/openclaw/openclaw/pull/191538) |
| #191523 | fix(doctor): 无人值守插件下载要求维修同意 | OPEN, P2, docs, commands | 修复 `openclaw doctor --non-interactive` 可在未传入 `--fix` 或 `--yes` 的情况下，基于继承的 API 密钥环境变量下载提供商插件包 | [查看 PR](https://github.com/openclaw/openclaw/pull/191523) |
| #191530 | fix(sandbox): 避免回合设置期间缓慢构建器移除 | OPEN, P2, docs, scripts, agents | 修复首轮沙箱设置缓慢问题，当容器引擎花费数十秒移除一次性依赖构建器时，工作空间在构建器停止后即可用，无需等待物理移除 | [查看 PR](https://github.com/openclaw/openclaw/pull/191530) |
| #191056 | fix(update): 解析插件链接时容忍 ENOTDIR | OPEN, P2, size: XS | 修复 `openclaw update` 在插件链接通过常规文件而非目录解析时中止整个插件树捕获，而非跳过单个链接 | [查看 PR](https://github.com/openclaw/openclaw/pull/191056) |
| #168261 | fix(config): 保留密钥提供程序文件路径中的空白字符 | OPEN, P2, security-sensitive-changed | 修复 `openclaw config set … --provider-source file --provider-path` 会修剪路径，导致以空格结尾的凭据文件名被静默重写到相邻或缺失路径 | [查看 PR](https://github.com/openclaw/openclaw/pull/168261) |
| #191537 | fix(voice-call): 播放期间忽略回声来电者转录 | CLOSED, docs, channel: voice-call | 修复实时转录在载波播放期间返回助手自身话语时产生的幻影来电者轮次，替代 #159145 | [查看 PR](https://github.com/openclaw/openclaw/pull/191537) |

---

## 功能需求趋势

从近期 Issues 可观察到以下社区功能关注方向：

1. **语音与音频插件增强**：ElevenLabs 批量转录关键词提示（#184709）、多对话对话生成（#187817）以及语音-only Talk 会话标题缺失（#191531）表明社区正在推动语音交互功能从基础可用向产品级体验演进。
2. **即时通讯渠道本地化**：Zalo 贴纸支持（#189354）等需求显示开发者希望 OpenClaw 在区域性即时通讯平台上获得更完整的原生功能覆盖。
3. **异构计算资源调度**：单 GPU 共享 MoE 引擎与媒体渲染（#19

:::
