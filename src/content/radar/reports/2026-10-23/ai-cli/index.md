---
title: "AI CLI 工具社区动态日报"
published: 2026-10-23
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-23

> 生成时间: 2026-10-23 02:21 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-10-23)

## 1. 生态全景

当前 AI CLI 工具正处于从“单一对话助手”向“多代理协作平台”演进的关键期。各主流工具均在加强沙箱安全、子代理生命周期管理及跨平台桌面集成，但稳定性与权限模型仍是共性瓶颈。生态呈现“商业闭源工具快速补丁迭代”与“开源社区功能扩张”并行的格态，Windows/macOS 桌面端的兼容性问题成为普遍痛点。整体来看，工具链正从 CLI 向桌面应用与 IDE 插件双轨延伸，企业级安全与审计需求开始显著影响产品路线图。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues(今日更新) | PR(今日更新) | Release 情况 | 主要版本 |
|------|------|-----------------|-------------|-------------|---------|
| Claude Code | anthropics/claude-code | 10条(精选，总数未披露) | 7个(全部已关闭) | 2个补丁版本 | v2.1.309 / v2.1.308 |
| OpenAI Codex | openai/codex | 44条 | 20个 | 4个 Rust 组件 Alpha 版本 | rust-v0.164.0-alpha.12 等 |
| Gemini CLI | google-gemini/gemini-cli | 38条 | 33个 | 1个夜间版本 | v0.67.0-nightly.20261023 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 10条(精选) | 10条(精选) | 3个版本 | Studio v2.49.0 / CLI v2.49.0 |
| OpenCode | anomalyco/opencode | 20条 | 50个 | 1个补丁版本 | v1.19.4 |
| Hermes | NousResearch/hermes-agent | 11条 | 50个 | 无新版本 | — |
| OpenClaw | openclaw/openclaw | 4条 | 50个 | 1个安全补丁版本 | v2026.10.6 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 过去24小时无活动 |

**数据读取**：OpenCode、Hermes、OpenClaw 的 PR 更新量均达到 50 个，处于高频迭代状态；Codex 和 Gemini CLI 的 Issues 基数较大（44条/38条），社区反馈密集；Deepseek Harness 今日完全静默，可能处于维护低谷或版本空窗期。

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重叠的诉求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **子代理/多代理生命周期管理** | Claude Code、Gemini CLI | 子代理停止后未实际终止、进程树未杀死导致数据误删（#85200、#103274）；子代理达到回合上限仍误报成功（#22323）；主动调用意愿不足（#21968） |
| **桌面端跨平台稳定性** | Claude Code、Codex、Reasonix | Windows MSIX/DEB 启动崩溃、CPU 空转、内核池泄漏（#96722、#41540）；macOS 沙盒路径解析、通知中心问题（#104436、#73370）；Windows 客户端崩溃闪退（#14116） |
| **IDE 与编辑器生态扩展** | Claude Code、Gemini CLI | Neovim/Emacs 集成需求（#1234）；相对路径解析至 IDE 工作区根（#29838） |
| **权限模型与安全加固** | Claude Code、Gemini CLI、OpenClaw | 权限提示 UX 优化（#103615）；命令替换防护绕过（#29688）；凭证存储原子写入（#29765）；组织策略穿透用户层级（#97334、#99540） |
| **会话状态与数据一致性** | Claude Code、OpenCode、OpenClaw | 会话标题不生成（#58176）；会话键不匹配导致消息丢失（#159104）；会话历史重放内存溢出（#14161） |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 沙箱安全、组织级策略（sec-default）、桌面端主题与权限 UX | 企业级开发团队、注重数据安全与合规的团队 | Electron 桌面端 + CLI，强调 `mods` 插件系统与组织策略穿透 |
| **OpenAI Codex** | 跨平台会话同步、模型容量/速率限制、远程 SSH 工作区 | 付费订阅用户（Pro/Plus）、跨设备开发者 | Rust 组件 Alpha 迭代，头less 模式与桌面应用并行，侧重模型目录与配置服务器 |
| **Gemini CLI** | 多模型提供商支持、AST 感知代码理解、A2A 协议 | 开源爱好者、需要模型中立的 CLI 用户 | 纯 CLI 为主，夜间版快速迭代，重视 Token 用量元数据与思考签名 |
| **DeepSeek Reasonix** | 桌面端 UI 国际化、长会话内存优化、Patina 主题、辅助会话 | 中文用户、长会话重度使用者 | Studio（桌面端）+ CLI 双架构，侧重用量统计可视化与中文本地化 |
| **OpenCode** | LLM API 重试策略、V2 会话管理、多模态 Web 来源溯源 | 开发者、自托管/本地模型部署用户 | Bun 运行时，TUI + Web + 桌面端三端，强调免费模型限额与计费安全 |
| **Hermes** | 插件/MCP 生态、内存矛盾整合、跨配置文件会话恢复 | 高级用户、插件开发者、多模态工作流构建者 | 网关 + 客户端架构，支持远程 MCP 目录与自定义提供商，Python 工具链耦合较深 |
| **OpenClaw** | Gateway 身份配置、会话状态恢复、SQLite 更新兼容性、macOS 系统级控制 | 企业级 Gateway 部署者、macOS 远程控制用户 | Node.js 运行时，强调 Gateway 工作流与子代理交接，安全补丁响应迅速 |

## 5. 社区热度与成熟度

- **高热度、快速迭代**：OpenCode、Hermes、OpenClaw 均保持每日 50 个左右的 PR 更新，说明核心代码库处于活跃重构期；Gemini CLI 的 33 个 PR 和 38 个 Issues 也显示出强劲的社区参与度。
- **稳定补丁模式**：Claude Code 今日仅 7 个 PR 且全部已关闭，发布两个小版本补丁，体现成熟产品的“小步快跑”修复风格，重点在可靠性而非大功能。
- **企业级/付费用户聚焦**：Codex 的 44 个 Issues 中大量涉及速率限制、模型满载、远程协作，反映其用户基础偏向付费订阅者，对服务可用性敏感度高。
- **低活跃/停滞**：Deepseek Harness 过去 24 小时无任何活动，需关注其项目维护状态是否出现断层。

## 6. 值得关注的趋势信号

1. **沙箱与权限成为产品核心竞争力**  
   Claude Code 的 `sec-default` 策略模组、Gemini CLI 的命令替换防护修复、OpenClaw 的 TLS 证书链安全补丁，均表明“可信执行环境”正从基础设施上升到产品卖点。开发者选型时应重点评估工具的沙箱隔离能力与组织策略支持。

2. **多代理协作的可靠性仍是瓶颈**  
   Claude Code、Gemini CLI 同时出现子代理“假停止”“误报成功”等问题，说明多代理编排尚未进入成熟期。依赖 Agent 工作流的团队应预留人工介入与回滚机制，避免全自动化部署。

3. **桌面端体验成为差异化战场**  
   从 Windows MSIX 内核池泄漏到 macOS 沙盒路径，再到 Reasonix 的 Windows 崩溃，桌面端稳定性直接影响用户留存。未来能够提供统一跨平台桌面体验的工具将获得竞争优势。

4. **模型中立性需求上升**  
   Gemini CLI 社区强烈呼吁支持 OpenAI 兼容及开源模型提供商，OpenCode 也出现本地模型思考内容实时查看需求。这表明开发者不愿被单一模型供应商锁定，具备多模型适配能力的 CLI 工具更具长期价值。

5. **计费与限额透明度成为信任关键**  
   Codex 出现“所有模型满载”且支持确认无中断的异常，OpenCode 出现免费额度通过 VPN 重置的漏洞，均指向计费系统与配额管理的透明度问题。企业采购时应要求供应商提供清晰的用量审计与异常说明机制。

**决策建议**：若侧重企业安全与合规，Claude Code 的组织策略模组最为成熟；若需要多模型中立与开源生态，Gemini CLI 更具扩展性；若追求桌面端集成与中文体验，DeepSeek Reasonix 近期迭代活跃；若涉及自托管与本地模型部署，OpenCode 的 Bun 运行时与重试策略可配置性值得关注。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-10-23）

## 1. 热门 Skills 排行

基于 PR 讨论活跃度与社区关注度，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|---------|-------------|------|------|
| 1 | #1742 fix(mcp-builder) | 修复 `mcp-builder` 对 `mcp>=2.0.0` 的兼容性，适配 `streamable_http_client` 重命名及自定义 HTTP 头配置 | MCP 协议版本迁移导致现有连接脚本失效，开发者关注向下兼容与自定义头部传递 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 fix(skill-creator) | 修复 `skill-creator` 触发评估机制：隔离 per-worker 探测、修复 Windows 管道 `select()` 失败、处理运行时失败误报 | 技能触发准确率（false miss/false positive）是创作者核心痛点，跨平台兼容性受关注 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 Add notion-spec-to-implementation & quantitative-resume-auditor | 新增两个技能：Notion 产品/技术规范转实现任务；定量简历审计 | 企业知识管理与 AI 辅助招聘/HR 自动化场景需求明显 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1771 feat(skills): add proofcore-contract-auditor | Web3 智能合约静态审计（Solidity/Rust），并将审计证明锚定至 TON 区块链 | 区块链安全与可验证审计是新兴细分方向，社区对 Web3 技能反响热烈 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 5 | #1703 Add md2video-audio | 零成本将 Markdown 文档编译为带真人感语音的 MP4 视频（基于 Marp 幻灯片） | 内容多模态转化（文档→视频）是社区关注的创意工作流方向 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1703) |
| 6 | #525 Add pyxel skill | 复古游戏开发技能：Python 游戏实现、头less 输入驱动运行、帧检查与状态验证 | 游戏开发垂直领域技能需求持续存在，强调可验证的闭环测试 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| 7 | #514 Add document-typography | AI 生成文档的排版质量控制：孤行、孤段、编号错位等排版问题预防 | 生成式文档的“最后一公里”排版质量是企业级用户共性痛点 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/514) |
| 8 | #486 Add ODT skill | OpenDocument 格式（.odt/.ods）创建、模板填充及 ODT 转 HTML | 开源办公文档格式支持，满足对 ISO 标准文档的合规与互操作需求 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/486) |

> 注：上述 PR 均为 OPEN 状态，尚未合并入主分支。社区讨论集中在技术兼容性（MCP/Windows）、新领域技能（Web3/视频/游戏）以及文档生产力工具上。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进诉求如下：

1. **组织内技能共享与分发**  
   Issue #228（17 评论，8 👍）呼吁在 Claude.ai 内实现 org-wide 技能共享库，避免当前需手动下载 .skill 文件并通过 Slack/Teams 分发的低效流程。

2. **技能触发机制与可靠性**  
   Issue #556（13 评论，7 👍）反馈 `run_eval.py` 中 `claude -p` 无法触发技能/命令（0% 触发率），社区高度关注技能触发逻辑的稳定性与评估工具链。

3. **安全与信任边界**  
   Issue #492（46 评论，3 👍）是讨论最热的安全议题：社区技能被分发在 `anthropic/` 命名空间下，存在冒充官方技能的信任边界漏洞，用户可能误授予过高权限。

4. **长上下文与记忆压缩**  
   Issue #1329（10 评论）提议 `compact-memory` 技能，采用符号化表示压缩长期 Agent 状态，解决长运行 Agent 上下文膨胀问题。

5. **Agent 治理与安全审计**  
   Issue #412（6 评论）提议 `agent-governance` 技能，覆盖策略执行、威胁检测、信任评分与审计轨迹，填补 AI Agent 安全治理的空白。

6. **文档与办公自动化**  
   Issue #189（6 评论，9 👍）及多个 DOCX/PDF 相关 Issue 反映，社区对文档处理（DOCX、PDF、ODT）的自动化技能需求强烈，且期待插件间内容去重与兼容性修复。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、社区关注度高，且功能切入明确，可能在近期落地合并：

- **#1742 fix(mcp-builder)**：MCP 协议 2.0 适配是当前技术栈迁移的刚需，修复窗口期集中，合并概率高。  
  [https://github.com/anthropics/skills/pull/1742](https://github.com/anthropics/skills/pull/1742)

- **#1298 fix(skill-creator)**：触发评估与跨平台兼容性直接影响所有技能创作者的体验，属于基础设施级修复，优先级高。  
  [https://github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

- **#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills**：两个垂直场景技能，更新活跃（至 10-15），企业知识管理与 HR 自动化需求明确。  
  [https://github.com/anthropics/skills/pull/1245](https://github.com/anthropics/skills/pull/1245)

- **#1771 feat(skills): add proofcore-contract-auditor**：Web3 智能合约审计与区块链锚定证明，属于差异化新领域，社区讨论热度高。  
  [https://github.com/anthropics/skills/pull/1771](https://github.com/anthropics/skills/pull/1771)

- **#1703 Add md2video-audio**：多模态内容生成（Markdown→视频+语音），契合 AIGC 工作流扩展趋势，具备示范效应。  
  [https://github.com/anthropics/skills/pull/1703](https://github.com/anthropics/skills/pull/1703)

- **#1997 fix(skill-creator): parse YAML frontmatter scalars correctly**：修复 SKILL.md 元数据解析偏差，直接影响技能描述与评估优化的准确性，属于基础修复。  
  [https://github.com/anthropics/skills/pull/1997](https://github.com/anthropics/skills/pull/1997)

- **#1980 webapp-testing: avoid shell=True**：消除命令注入风险（CWE-78），安全加固类 PR 通常获得维护者快速关注。  
  [https://github.com/anthropics/skills/pull/1980](https://github.com/anthropics/skills/pull/1980)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可信、可靠且可跨组织共享的技能基础设施，同时扩展文档自动化、Web3 安全审计和多模态内容生成等垂直场景能力。**

---

# Claude Code 社区动态日报 (2026-10-23)

## 今日速览

Claude Code 今日发布 v2.1.309 与 v2.1.308 两个补丁版本，重点修复 macOS/Linux 沙盒 Bash 执行及符号链接路径问题。社区活跃度持续高位，桌面端自定义主题、IDE 集成（Neovim/Emacs）以及 Agent 子代理生命周期管理成为今日讨论焦点；多个 Windows 与 macOS 平台的性能与数据安全类 Bug 引发开发者关注。

---

## 版本发布

### v2.1.309
- 修复 macOS 和 Linux 上沙盒化 Bash 命令在每条命令前在沙盒外运行 shell 启动文件的问题
- 修复 macOS 沙盒 `denyWrite` glob 模式：当模式所在文件夹通过符号链接到达时，未在路径真实位置生效
- 其他沙盒相关修复（描述被截断）

### v2.1.308
- Bug 修复与可靠性改进

> 发布页：https://github.com/anthropics/claude-code/releases

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 评论/👍 | 核心关注点 | 链接 |
|---|------|---------|-----------|------|
| #79305 | Desktop app: support custom themes / accent colors | 23 / 71 | 桌面端仅提供浅色/深色/高对比度，用户强烈要求与 CLI 保持一致的自定义主题/强调色，以便多显示器环境下快速识别窗口 | https://github.com/anthropics/claude-code/issues/79305 |
| #1234 | Support for other IDEs (Neovim/Emacs) | 17 / 89 | 社区长期关注的 IDE 集成扩展，建议通过暴露 MCP 服务器实现与 Neovim/Emacs 等编辑器的对接 | https://github.com/anthropics/claude-code/issues/1234 |
| #85200 | TaskStop does not kill the process tree — orphaned `rm -rf /c` deleted user data | 4 / 0 | **高严重性**：停止任务未杀死进程树，导致孤儿进程持续删除用户数据长达 20 分钟，涉及数据安全 | https://github.com/anthropics/claude-code/issues/85200 |
| #96722 | Windows MSIX Desktop: main process spins at 100% CPU, kernel pool grows to ~9.4 GB | 3 / 0 | **性能/内存泄漏**：Windows MSIX 版主进程空转单核 100%，每秒 15 万–33 万次文件 I/O，内核池膨胀至 9.4 GB | https://github.com/anthropics/claude-code/issues/96722 |
| #102653 | User-tier prompt.attachment hooks no longer run since 2.1.299 | 3 / 3 | **回归 Bug**：插件系统中 `prompt.attachment` 钩子在 2.1.299 后不再触发，影响用户自定义模组功能 | https://github.com/anthropics/claude-code/issues/102653 |
| #103274 | Didn't stop a thread it said it stopped. then lied | 4 / 0 | Agent 子代理声明停止后实际未停止，并给出误导性反馈，导致 Token 浪费，用户体验差 | https://github.com/anthropics/claude-code/issues/103274 |
| #88423 | In-process subagents are never re-invoked when their own run_in_background Bash / Monitor task completes | 5 / 0 | 进程内子代理在后台 Bash/Monitor 任务完成后未被重新调用，影响多代理工作流稳定性 | https://github.com/anthropics/claude-code/issues/88423 |
| #103615 | Permission prompt UX: "Always Allow" silently escalates session permission mode | 3 / 1 | 权限提示 UX 缺陷："Always Allow" 一键静默切换整个会话权限模式，而一次性 "Allow" 被埋在下拉菜单中 | https://github.com/anthropics/claude-code/issues/103615 |
| #104436 | bashEditDiff stages the whole working tree in the user's real repo | 1 / 0 | **数据丢失风险**：macOS 沙盒环境下，当 `GIT_DIR`/`GIT_WORK_TREE` 无法定位 Git 时，bashEditDiff 会暂存用户真实仓库的整个工作树 | https://github.com/anthropics/claude-code/issues/104436 |
| #101961 | Claude Desktop (Windows): "Archive" missing from session menu after Chat + Cowork update | 4 / 1 | 桌面端 UI 回归：Chat + Cowork 合并更新后，Windows 会话菜单中的 "Archive" 消失，定时任务失去独立侧边栏区域 | https://github.com/anthropics/claude-code/issues/101961 |

---

## 重要 PR 进展（精选 7 条，全部已关闭）

今日仓库共更新 7 个 PR，均为 **CLOSED** 状态，主要围绕 `sec-default` 策略模组、`diff` 面板及 `mods` 声明的细节完善：

| # | 标题 | 作者 | 更新时间 | 简要说明 | 链接 |
|---|------|------|---------|---------|------|
| #97293 | mods: the declarations carry process.run's truncation flags and list entries' mtimeMs | @poteat | 2026-10-22 | 为 `mods` 声明补充 `process.run` 的截断标志（`isStdoutTruncated`/`isStderrTruncated`）与 `$.fs.list` 条目的 `mtimeMs`，等待发布的 npm CLI 同步支持 | https://github.com/anthropics/claude-code/pull/97293 |
| #97334 | sec-default: the rows a conversation keeps continue past the user tier | @poteat | 2026-10-22 | 组织级 `sec-default` 策略下，会话保留的记录行将延续至用户层级之上，插件不再能丢弃或重写发送至收集器的记录 | https://github.com/anthropics/claude-code/pull/97334 |
| #97688 | sec-default: collector records continue past the user tier | @poteat | 2026-10-22 | 收集器记录流（`telemetry.log`）在组织策略下继续穿透用户层级，`classic.*` 和 `settings.read` 行为保持一致 | https://github.com/anthropics/claude-code/pull/97688 |
| #99118 | diff: toasts show while the pane is open | @poteat | 2026-10-22 | 修复 `/diff` 面板或对话框打开时，其他插件的 Toast 提示被持续挂起的问题，现改为在面板显示期间正常展示 | https://github.com/anthropics/claude-code/pull/99118 |
| #99137 | sec-default: a person's plugin may tighten, never loosen, what holds over it | @poteat | 2026-10-22 | 在 `sec-default` 策略下，个人插件只能收紧（deny/ask/锁定变量），不能放宽已有限制，无需新 engine 即可生效 | https://github.com/anthropics/claude-code/pull/99137 |
| #99141 | diff: a pane nothing can draw yet is kept, and shows once something can | @poteat | 2026-10-22 | `/diff` 在无可绘制内容时保留面板，待有内容可绘制时再显示，与 #99118 堆叠 | https://github.com/anthropics/claude-code/pull/99141 |
| #99540 | sec-default: an organization's ceiling on a tool holds over the plugins a person installs | @poteat | 2026-10-22 | 组织对工具的上限策略对个人安装的插件生效，所有策略钩子均携带 `.catch` 处理 | https://github.com/anthropics/claude-code/pull/99540 |

---

## 功能需求趋势

从今日 Issues 中可提炼出以下社区关注方向：

1. **桌面端个性化与 UI 可定制化**  
   自定义主题/强调色（#79305）、侧边栏主题与用户 CSS（#102699）、隐藏权限模式页脚指示器（#89126）等需求集中，用户希望桌面应用与 CLI 体验保持一致并支持视觉区分。

2. **IDE 生态扩展**  
   Neovim/Emacs 等非 VS Code 编辑器的集成需求持续发酵（#1234），社区期待通过 MCP 服务器标准化接口，降低跨 IDE 接入成本。

3. **Agent 子代理生命周期与可靠性**  
   子代理未重新调用（#88423）、声明停止后未实际停止（#103274）、云端会话无法向父会话回传完成通知（#104160）等问题表明，多代理协作的稳定性是当前痛点。

4. **权限与安全模型细化**  
   权限提示 UX（#103615）、钩子回归（#102653）、组织策略穿透用户层级（#97334/#97688/#99540）等反映开发者对精细化权限控制和审计的需求日益增长。

---

## 开发者关注点（痛点与高频需求）

1. **跨平台稳定性差异明显**  
   Windows MSIX 版出现主进程空转与内核池泄漏（#96722）、MAX_PATH 导致 Dispatch/Cowork 会话启动失败（#98009）；macOS 上出现沙盒路径解析（#104436）、通知中心未注册（#73370）、Remote Control 自动更新后未恢复（#104230）等问题，提示桌面端不同打包格式与操作系统的适配仍需加强。

2. **数据安全与破坏性操作防护不足**  
   `TaskStop` 未杀死进程树导致数据被误删（#85200）、`bashEditDiff` 暂存整个工作树（#104436）、会话转录文件静默丢失（#102106）等 Bug 直接威胁用户代码与数据安全，应优先修复。

3. **Hook 与插件系统回归问题**  
   自 2.1.299 起 `prompt.attachment` 钩子不再触发（#102653）、`PreCompact` 钩子在自动压缩时不触发（#50467），插件开发者对版本间行为一致性提出担忧。

4. **权限交互体验需

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 (2026-10-23)

## 今日速览

OpenAI Codex 今日持续发布 Rust 组件 Alpha 版本，社区围绕 Windows 启动故障、跨平台会话同步及速率限制机制展开激烈讨论。多个高优先级 Bug 仍未修复，尤其是 Windows 桌面应用的启动崩溃与任务栏异常问题，以及 macOS 上的内存泄漏和 Swap 耗尽现象，成为开发者今日关注的核心痛点。

## 版本发布

过去 24 小时内，Codex 相关 Rust 组件连续发布 4 个 Alpha 版本，均为预发布迭代：

- **rust-v0.164.0-alpha.12** [Release 链接](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.12)
- **rust-v0.164.0-alpha.11.1** [Release 链接](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.11.1)
- **rust-v0.164.0-alpha.11** [Release 链接](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.11)
- **rust-v0.163.0-alpha.11.2** [Release 链接](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.11.2)

> 注：发布说明未提供具体变更细节，建议关注后续稳定版本的完整 Changelog。

## 社区热点 Issues

以下选取评论数、点赞数及影响范围较大的 10 个 Issue：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|---------|---------|------|
| #28931 | Auto Resume / Goal after limit reached | 请求在达到 5 小时或每周限额后，重置时自动恢复目标任务 | 评论 14 条，👍 63（最高），社区强烈期待该自动化功能 | [查看](https://github.com/openai/codex/issues/28931) |
| #41540 | Windows headless startup caused by node_repl.exe relocation failure | Windows 应用因 `node_repl.exe` 重定位失败（0x80071770）导致无头启动，影响多个版本 | 评论 19 条，👍 2，Windows 用户反复遇到启动失败 | [查看](https://github.com/openai/codex/issues/41540) |
| #55795 | Dots entry disappears after updating to 26.1016.51333 | 更新后 Windows 桌面应用的 Dots 入口消失，重装和快捷键均无法恢复 | 评论 14 条，👍 4，UI 回归问题引发关注 | [查看](https://github.com/openai/codex/issues/55795) |
| #51053 | iOS Remote cannot view active VS Code Codex task due to writer lock | iPhone 端无法查看 macOS 上活跃的 VS Code Codex 任务，受写入锁限制 | 评论 12 条，👍 9，跨平台远程协作痛点 | [查看](https://github.com/openai/codex/issues/51053) |
| #14613 | Stream disconnected before completion error | 连接在任务完成前断开，影响长时间运行的代码生成任务 | 评论 12 条，历史悠久（2026-03 创建），稳定性问题持续未解 | [查看](https://github.com/openai/codex/issues/14613) |
| #51475 | dot cloud browser: page reads fail approval after user handback | 云端浏览器在用户交还控制后，授权只读页面观察被间歇性拒绝 | 评论 12 条，影响代理浏览器场景的可用性 | [查看](https://github.com/openai/codex/issues/51475) |
| #52877 | Auto-hidden taskbar stops appearing when Codex is maximized | Windows 11 下 Codex 最大化后自动隐藏任务栏不再弹出 | 评论 12 条，👍 2，桌面集成体验缺陷 | [查看](https://github.com/openai/codex/issues/52877) |
| #24295 | Codex desktop sidebar should support Connection → Project → Thread grouping for remote hosts | 远程 SSH 工作区下，侧边栏缺乏按项目/线程分组的远程主机视图 | 评论 11 条，👍 12，远程开发工作流优化需求 | [查看](https://github.com/openai/codex/issues/24295) |
| #36718 | Add evidence-backed completion reports for agent tasks | 代理任务完成时应提供需求与证据的结构化映射，而非仅自然语言总结 | 评论 9 条，Agent 可观测性需求上升 | [查看](https://github.com/openai/codex/issues/36718) |
| #56324 | "Selected model is at capacity" on ALL models for 2+ days | Pro 订阅用户所有模型均显示满载，持续超 2 天，支持确认无服务中断 | 评论 2 条，今日新增，速率限制/计费系统疑似异常 | [查看](https://github.com/openai/codex/issues/56324) |

## 重要 PR 进展

今日合并/更新的 20 个 PR 中，以下 10 个对架构与功能影响更为显著：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|-------------|------|
| #24663 | Serialize managed ChatGPT token refreshes | 在共享 `CODEX_HOME` 的多个 Codex 进程间序列化刷新令牌兑换，避免重复刷新与凭据竞争 | [查看](https://github.com/openai/codex/pull/24663) |
| #56314 | Add managed configuration loaders for custom config servers | 新增自定义配置服务器加载器，支持从 `<base_url>/codex/config/bundle` 获取配置包 | [查看](https://github.com/openai/codex/pull/56314) |
| #56313 | Apply model catalog overrides to history, notes, and context tools | 从模型目录读取 `history`、`notes`、`new_context`、`get_context_remaining` 的工具描述与参数 Schema | [查看](https://github.com/openai/codex/pull/56313) |
| #56312 | Track accepted conversation history in rollout traces | 在回滚追踪中记录实际进入对话历史的内容，避免将丢弃的尝试误标为已接受 | [查看](https://github.com/openai/codex/pull/56312) |
| #56309 | Support model-specific writable-root permission wording | 为模型目录权限消息新增 `writable_root` / `writable_roots` 模板，按根目录数量动态选择措辞 | [查看](https://github.com/openai/codex/pull/56309) |
| #56308 | Separate directory and repository scopes in the TUI | TUI 中区分目录与仓库作用域，避免链接工作树的会话污染当前目录选择器 | [查看](https://github.com/openai/codex/pull/56308) |
| #56304 | Add support for environment-scoped managed hooks | 新增环境级托管 Hook 的发现与列表 API，命令与 MCP 执行归属于所属环境 | [查看](https://github.com/openai/codex/pull/56304) |
| #56302 | Add hook configuration to environment attachments | 向环境附件添加 `environment_hooks` 配置，初始化为空并报告 Handler 数量至调试输出 | [查看](https://github.com/openai/codex/pull/56302) |
| #56301 | Add TLS forwarding tests for MITM SigV4 requests | 新增测试用 MITM CA 与本地 TLS 源，验证 AWS SigV4 转发中的负载哈希与凭据替换 | [查看](https://github.com/openai/codex/pull/56301) |
| #56297 | Mark built-in dummy credentials and strengthen collision checks | 为内置虚拟凭据添加 `masked` 标记及至少 22 位随机字符，增强碰撞检测 | [查看](https://github.com/openai/codex/pull/56297) |

## 功能需求趋势

从今日全部 44 条 Issue 中提炼，社区最关注的功能方向包括：

1. **任务恢复与限流管理**：#28931 等 Issue 反映用户希望在达到使用额度后，重置时能自动恢复长时间运行的目标任务，减少人工干预。
2. **Agent 任务可观测性**：#36718 等需求呼吁 Codex 在报告任务完成时，提供结构化的需求-证据映射报告，提升 AI 代理结果的可审计性。
3. **跨平台与远程协作**：#51053（iOS/macOS 远程查看锁定）、#24295（远程主机侧边栏分组）、#56291（iOS/Mac 项目列表不同步）表明多设备会话同步仍是薄弱环节。
4. **桌面应用稳定性**：Windows 启动崩溃（#41540、#55598）、任务栏异常（#52877）、macOS 内存/Swap 耗尽（#54416）显示桌面端资源管理与启动可靠性亟待加强。
5. **速率限制与计费透明度**：#56262、#56324、#56328 等 Issue 指出银行重置（banked reset）资格判断异常及全模型满载问题，用户对配额机制更加敏感。

## 开发者关注点

开发者今日反馈的高频痛点与需求可归纳为：

- **Windows 平台启动与 UI 回归**：多个 Windows 启动失败（#41540、#55598）和界面异常（#55795、#52877）集中在近期版本更新后出现，疑似 MSIX 打包或 Electron/桌面壳回归。
- **速率限制与模型容量**：Pro/Plus 订阅用户反复遇到“模型已满载”或重置资格判定错误（#56324、#56262），影响付费用户的核心体验。
- **CLI 与沙箱执行**：Windows CLI 出现 `helper_unknown_error: setup refresh had errors`（#52944），以及统一执行进程创建失败，影响命令行工作流。
- **会话与项目状态同步**：远程 SSH 工作区聊天历史丢失（#53080）、移动项目后工作目录状态陈旧（#56325）、跨设备项目列表不一致

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-10-23)

## 1. 今日速览

Gemini CLI 今日发布夜间版本 **v0.67.0-nightly.20261023**，主要修复了 A2A 服务器的 Token 用量元数据保留问题，并确保所有携带函数调用的模型回合都能正确接收思考签名。社区活跃度保持高位，38 个 Issue 今日更新，围绕子代理（Subagent）可靠性、跨提供商模型支持、终端兼容性及安全加固展开广泛讨论。多个 P1/P2 级别的修复 PR 正在审核中，涉及认证设置持久化、凭证存储原子性、MCP 工具发现超时等核心领域。

## 2. 版本发布

**v0.67.0-nightly.20261023.ga713410ab**  
[发布详情](https://github.com/google-gemini/gemini-cli/releases/tag/v0.67.0-nightly.20261023.ga713410ab)

本次夜间版本包含两项核心修复：
- **fix(a2a-server,core)**: 保留扩展 Token 用量元数据，并统一每回合（per-turn）的上报逻辑，提升 Token 计费与监控的准确性。
- **fix(core)**: 确保所有包含函数调用（function calls）的模型回合都能接收到思考签名（thought signatures），修复此前部分回合缺失签名导致的推理链路不完整问题。

## 3. 社区热点 Issues

以下选取 10 个今日更新、优先级较高或社区讨论度显著的 Issue：

| # | 标题 | 优先级/标签 | 评论 | 关注理由 |
|---|------|-------------|------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURN is reported as GOAL success | P1, area/agent, bug | 13 | **最高优先级 bug**。子代理在达到最大回合限制后仍上报 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了任务中断，可能导致用户误以为分析已完成。 |
| [#28477](https://github.com/google-gemini/gemini-cli/issues/28477) | Support Open-source LLM providers alongside Gemini | area/agent, feature | 8 | 社区强烈希望 Gemini CLI 支持 OpenAI 兼容及开源模型提供商，通过统一提供商接口扩展模型选择，当前处于待分类状态。 |
| [#28416](https://github.com/google-gemini/gemini-cli/issues/28416) | GlobTool returns raw symlink paths | P2, area/core, bug | 7 | macOS 及符号链接工作区下，GlobTool 输出原始路径而内部使用解析后路径，导致后续 `read_file`/`edit_file` 失败，影响跨平台稳定性。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads | P2, area/agent, feature | 7 | 探索 AST 感知的文件读取、搜索与代码映射，旨在通过更精确的方法边界读取减少回合数与 Token 噪声，属于代码理解能力提升方向。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2, area/agent, bug | 7 | 用户反馈模型不会主动调用自定义技能和子代理，仅在显式指令下才使用，影响自动化编排体验。 |
| [#28826](https://github.com/google-gemini/gemini-cli/issues/28826) | Workspace scan warns when projects.json.lock disappears | P1, area/agent, bug | 5 | 隔离主目录作为项目扫描时会误触发文件系统警告，属于 P1 级误报问题。 |
| [#27847](https://github.com/google-gemini/gemini-cli/issues/27847) | Feature: Add a command to list available models | P3, enhancement | 4 (2👍) | 社区请求增加 `gemini models --json` 等机器可读格式的模型发现命令，便于脚本化与工具链集成。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides | P2, area/agent, bug | 4 | 浏览器代理完全忽略全局/项目级 `settings.json` 中的 `maxTurns` 等覆盖配置，导致行为不可控。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1, area/agent, bug | 4 (1👍) | 浏览器子代理在 Wayland 显示服务器下失败，影响 Linux 桌面用户的自动化浏览场景。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 400 error with > 128 tools | P2, area/agent, bug | 3 | 当可用工具超过 128 个时触发 400 错误，社区期望模型能更智能地限制工具作用域。 |

## 4. 重要 PR 进展

今日更新的 33 个 PR 中，以下 10 个对核心稳定性与安全性影响较大：

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#29887](https://github.com/google-gemini/gemini-cli/pull/29887) | chore/release: bump version to 0.67.0-nightly | OPEN | 自动化版本 bump，对应今日夜间发布。 |
| [#29688](https://github.com/google-gemini/gemini-cli/pull/29688) | fix(core): prevent command substitution guard bypass | CLOSED | 修复 `stripShellWrapper()` 中通过 shell 包装器标志绕过命令替换防护的安全漏洞，加强命令执行安全。 |
| [#29762](https://github.com/google-gemini/gemini-cli/pull/29762) | fix(settings): preserve disk edits when changing authentication | OPEN, P1 | 修改认证方式等设置时，保留 CLI 启动后对磁盘文件的手动编辑，避免启动快照覆盖用户更改。 |
| [#29771](https://github.com/google-gemini/gemini-cli/pull/29771) | fix(cli): only auto-nudge genuinely empty continuations | OPEN, P1 | 仅在工具循环续传真正为空文本时才发送系统提示，并等待提示完成，避免火并忘式调用导致的竞态。 |
| [#29765](https://github.com/google-gemini/gemini-cli/pull/29765) | fix(core): make file credential store writes atomic | OPEN | 对基于文件的凭证存储（FileKeychain）进行原子化与序列化写入，防止并发写入导致凭证丢失或用户被锁定。 |
| [#29767](https://github.com/google-gemini/gemini-cli/pull/29767) | fix(core): bound MCP tools/list discovery with timeout | OPEN, P1 | 为 MCP 工具发现增加默认 60s 超时，避免服务器不响应 `tools/list` 时导致发现过程阻塞长达 10 分钟。 |
| [#29763](https://github.com/google-gemini/gemini-cli/pull/29763) | fix(a2a-server): handle unhandled rejection in scheduleToolCalls | OPEN | 修复 A2A 服务器中因 `void` 调用调度器导致的未处理 Promise 拒绝，提升任务取消时的稳定性。 |
| [#29761](https://github.com/google-gemini/gemini-cli/pull/29761) | fix(core): stop $ patterns corrupting prompt templates | OPEN, P2 | 修复提示模板填充中 `$&`、`$``、`$'`、`$$` 被当作替换模式处理的问题，防止编辑指令和文件内容被静默损坏。 |
| [#29884](https://github.com/google-gemini/gemini-cli/pull/29884) | fix(core): allow trusted system paths on Android (Termux) | OPEN | 在 Android/Termux 环境下允许受信任的系统目录前缀，使原生 ripgrep 二进制可被 `grep_search` 解析执行。 |
| [#29880](https://github.com/google-gemini/gemini-cli/pull/29880) | feat(cli): add models command and --list-models flag | OPEN | 实现 `gemini models` 子命令及 `--list-models` 标志，支持 JSON 与人类可读两种格式的模型发现，响应社区功能需求。 |

## 5. 功能需求趋势

从今日 Issue 与 PR 中可提炼出以下社区关注方向：

1. **多模型提供商支持**：社区持续呼吁摆脱对 Gemini 模型的单一依赖，增加 OpenAI 兼容及开源模型接入（#28477），并配套机器可读的模型列表命令（#27847、#29880）。
2. **子代理（Subagent）可靠性与可见性**：子代理在达到回合上限后误报成功（#22323）、主动调用意愿不足（#21968）、轨迹不可见（#22598）等问题反复出现，成为社区关注的核心痛点。
3. **IDE 与跨平台集成**：相对路径需解析至 IDE 工作区根（#29838）、Android/Termux 环境支持（#29884）、Wayland 下浏览器代理失效（#21983），表明社区希望 CLI 在更多终端与 IDE 场景下稳定运行。
4. **AST 感知的代码理解**：多个 Epic 跟踪 AST 感知的文件读取、搜索与映射（#22745、#22746、#22747），社区期望通过更精确的代码结构分析降低 Token 消耗并提升编辑准确率。
5. **安全与配置持久化**：命令替换防护绕过（#29688）、凭证存储原子写入（#29765）、认证变更时保留磁盘编辑（#29762）等安全与配置相关修复密集出现，反映企业用户对稳定性与数据安全的高要求。

## 6. 开发者关注点

**高频痛点：**
- **子代理状态不一致**：多个 P1/P2 Issue 指出子代理在中断、失败或达到限制时未能正确上报终

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 (2026-10-23)

## 1. 今日速览

Reasonix 今日发布 Studio v2.49.0 与 CLI v2.49.0/v2.48.0，重点引入 Patina 主题、用量页“今日”小时视图，并优化长会话内存占用与辅助会话交互。社区反馈集中在 Windows 端崩溃、UI 国际化缺失、侧边栏布局不一致以及 Agent 流程卡顿等问题，开发者已通过多个 PR 开展针对性修复。

## 2. 版本发布

### Reasonix Studio v2.49.0
- **新增**：内置 Patina 主题（雾灰画布、白色浮卡、钢蓝强调色，明暗两套，需在设置手动选择）；用量页新增“今日”范围，单日窗口按小时显示用量、花费和请求；辅助会话支持 Markdown 与流式进度。
- **变更**：改过文件的回合不再默认要求检查、复核和签收即可结束（可通过 `host_verification = "on"` 开启）。
- **修复**：多处内存、卡住和显示问题。
- [查看发布详情](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.49.0)

### Reasonix CLI v2.49.0 / v2.48.0
- 基于对应 Studio 版本构建的 CLI 归档包。
- [v2.49.0 发布详情](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.49.0) | [v2.48.0 发布详情](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.48.0)

### Reasonix Studio v2.48.0（补充）
- 大幅降低长会话和大型工作区的页面内存占用；预设模块选择支持多选、搜索、全选与内置/自定义分组；修复记忆多进程写入互相覆盖等问题。

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 类型 | 关注理由 | 链接 |
|---|------|------|----------|------|
| #14116 | Windows 端打开软件后崩溃闪退 | Bug (desktop, windows, crash, v3) | 过去24小时评论最多（10条），涉及 v2.44.0 严重稳定性问题，用户反复切出后进程消失，需优先排查。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14116) |
| #14206 | 非图标模式左侧边栏图标与文字大小规范性调整 | Feature (desktop, v3) | 今日新增，8条评论，反映社区对 UI 一致性与视觉层级的高度关注。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14206) |
| #14174 | 设置界面部分信息未翻译为简体中文 | Bug (from-studio) | i18n 缺失，涉及模型工具说明等核心设置文本，影响中文用户体验。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14174) |
| #14203 | 输出内容突然出现英文 | Bug (from-studio) | 今日新增，反映模型输出语言切换不稳定，可能与 Prompt 或模型配置相关。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14203) |
| #14160 | 建议去掉“这一轮还欠东西，继续把它做完”提示 | Feature (desktop, agent, v3) | 用户反馈 Agent 自主继续执行导致 Token 浪费，交互体验需优化。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14160) |
| #14153 | 建议删除截图处重复显示，与设置及左侧边栏重复 | Bug (from-studio) | 界面冗余问题，涉及信息架构与重复展示，影响操作效率。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14153) |
| #14205 | 最新版反馈无法贴图 | Bug (from-studio) | 今日新增，反馈功能异常直接影响用户问题上报效率。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14205) |
| #14194 | 生成的文件无法右键定位到文件树；会话消耗未统计 | Bug (from-studio) | 涉及文件系统集成与成本统计两个核心工作流，用户版本为 v2.48.0。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14194) |
| #14189 | 自动命名模型未显示关闭思考提醒 | Bug (from-studio) | 影响模型配置可用性，用户明确表示“用不了”，属于功能阻塞类反馈。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14189) |
| #14209 | 模型思考过程中发送新对话导致思考流卡住约十秒 | Bug (from-studio) | 今日新增，涉及并发交互与 UI 响应，严重影响对话流畅度。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14209) |

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复内容 | 链接 |
|---|------|------|--------------|------|
| #14215 | fix(stats): the projection keeps a zero-amount quote | OPEN | 修复用量读取路径中零金额引用的不一致问题，确保成本统计准确。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14215) |
| #14214 | fix(stats): a relocated stats root does not count twice | OPEN | 修复存储根目录迁移后用量记录重复计算问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14214) |
| #14213 | fix(migrate): an imported session completes its sidecar | OPEN | 修复导入会话时 sidecar 元数据（范围、工作区根、标题等）写入时序问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14213) |
| #14212 | fix(migrate): a failed copy must not stamp the import marker | OPEN | 修复导入失败时错误标记导致后续启动不再重试导入的问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14212) |
| #14161 | fix(sessionstore): bound history replay memory | CLOSED | 修复 Windows 上会话历史重放导致内存分配失败（VirtualAlloc 错误 1455），与崩溃 Issue #14116 相关。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14161) |
| #14162 | fix(studio): stream progress for side questions | CLOSED | 侧边问题现支持即时显示提交内容、流式答案文本，并保留等待/思考/工具阶段与计时器。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14162) |
| #14211 | fix(desktop): settings sheet menu, memory icon, run analysis view | OPEN | 修复设置面板滚动条、内存图标居中、运行分析视图名称显示等 UI 细节。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14211) |
| #14208 | fix(desktop): describe every built-in tool in settings list in interface language | CLOSED | 修复设置中内置工具描述回退为英文的问题，统一为界面语言。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14208) |
| #14207 | fix(desktop): line up sidebar rows' icons and labels with the rail hidden | CLOSED | 修复隐藏图标轨道时侧边栏图标与标签对齐问题，回应 #14206 等 UI 反馈。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14207) |
| #14204 | fix(desktop): show only the start of a long command in the delivery receipt | CLOSED | 修复交付凭证中长命令完整显示导致卡片内容过长的问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14204) |

## 5. 功能需求趋势

从近 24 小时 Issues 与 PR 可观察到以下社区关注方向：

1. **UI 一致性与国际化**：侧边栏布局、文字大小、设置界面翻译、模型输出语言切换等问题频繁出现，社区对本地化体验和视觉统一性要求提高。
2. **Agent 交互与自主行为控制**：用户希望能更精细地控制 Agent 的自主继续执行行为，避免不必要的 Token 消耗与干扰。
3. **桌面端稳定性**：Windows 崩溃、内存分配失败、长会话内存占用等问题集中反映，性能与稳定性是当前首要改进领域。
4. **文件系统与工作流集成**：生成文件右键定位、会话成本统计、定时任务入口缺失等需求表明用户期望 Reasonix 更深度地融入本地开发工作流。
5. **反馈与报错体验**：反馈表单贴图失败、思考流卡住等问题影响问题上报与调试效率。

## 6. 开发者关注点

- **高频痛点**：Windows 端进程崩溃（#14116）、长会话/大型工作区内存占用、设置与界面未完全汉化、侧边栏布局错乱。
- **紧急修复方向**：零金额用量统计不一致（#14215/#14214）、导入会话 sidecar 写入失败（#14213/#14212）、会话历史重放内存溢出（#14161）。
- **社区期待**：开发者正在积极响应 UI 细节修复（侧边栏对齐、设置面板尺寸、内置工具多语言描述），建议后续版本继续加强桌面端稳定性测试与 i18n 覆盖度。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-10-23)

## 今日速览

OpenCode 今日发布 v1.19.4 补丁版本，主要升级 Bun 运行时至 1.4.4 以修复多项网络安全漏洞并更新根证书。社区活跃度较高，20 个 Issue 与 50 个 PR 在过去 24 小时内更新，核心关注点集中在 Linux/macOS 桌面端稳定性、LLM API 重试机制、V2 会话标题生成缺失以及免费额度异常等问题上。

## 版本发布

**v1.19.4**  
- 核心改进：将内置 Bun 运行时升级至 1.4.4，包含 Brotli、TLS、HTTP/1.1、HTTP/2、HTTP/3、WebSocket 及 `fetch` 的安全修复，并将根证书更新至 NSS 3.131.1。  
[查看 Release](https://github.com/anomalyco/opencode/releases/tag/v1.19.4)

## 社区热点 Issues

| # | 标题 | 状态 | 关注理由 | 链接 |
|---|------|------|----------|------|
| #34344 | Unlimited usage Exploit on opencode models | CLOSED | 免费模型限额与 IP 绑定，通过 VPN 切换可重置限额，导致免费模型可无限使用。涉及服务滥用与计费安全，社区已确认可自动化利用。 | [链接](https://github.com/anomalyco/opencode/issues/34344) |
| #58128 | do not stop retrying on LLM API failures | OPEN | 指数退避重试硬编码为最大 10 次/10s 间隔，网络抖动或后端重启可能导致任务中断，社区呼吁将其设为可配置项。 | [链接](https://github.com/anomalyco/opencode/issues/58128) |
| #58188 | desktop: New Session and Open Project menu items permanently greyed out on Linux | OPEN | Linux 官方 .deb 包中“新建会话”和“打开项目”菜单项长期置灰，影响桌面端核心工作流，已有对应修复 PR。 | [链接](https://github.com/anomalyco/opencode/issues/58188) |
| #58157 | desktop: deb ships chrome-sandbox without setuid bit | OPEN | Ubuntu 上 deb 包的 `chrome-sandbox` 缺少 setuid 权限，导致应用内自动更新因 `pkexec 127` 失败，影响 Linux 用户的更新体验。 | [链接](https://github.com/anomalyco/opencode/issues/58157) |
| #58176 | session: titles never generated in v2 | OPEN | V2 版本不再自动生成会话标题，新会话保持 `title = NULL`（“Untitled session”），与 v1.18.x 行为不一致，影响会话管理。 | [链接](https://github.com/anomalyco/opencode/issues/58176) |
| #58302 | OpenCode刚打开就提示免费额度耗尽 | OPEN | 中文 Issue，用户反馈升级后免费额度异常快速耗尽，怀疑为升级引入的新 Bug，社区关注度高。 | [链接](https://github.com/anomalyco/opencode/issues/58302) |
| #58129 | Opencode Github Actions Bot Cannot Install | OPEN | GitHub Actions Bot 安装链接失效，阻碍 CI/CD 集成，已有 PR 尝试将 GitHub 集成从 v1 移植到 v2。 | [链接](https://github.com/anomalyco/opencode/issues/58129) |
| #57262 | The thinking content of the model cannot be viewed in real-time | OPEN | 本地部署模型（如 Qwen3.8）的思考过程无法实时查看，必须停止后才能看到，影响调试与交互体验。 | [链接](https://github.com/anomalyco/opencode/issues/57262) |
| #52345 | web: URL.canParse is not a function on iPadOS 16 | OPEN | iPadOS 16 Safari 因 `URL.canParse` 不可用导致 Web UI 无法打开会话，涉及旧设备兼容性问题。 | [链接](https://github.com/anomalyco/opencode/issues/52345) |
| #56432 | tui: /highlights should show all releases since the previous version | OPEN | TUI 更新弹窗仅显示最新版本的更新内容，跨多个版本升级时中间版本的更新说明缺失，影响变更感知。 | [链接](https://github.com/anomalyco/opencode/issues/56432) |

## 重要 PR 进展

| # | 标题 | 状态 | 功能/修复内容 | 链接 |
|---|------|------|--------------|------|
| #58308 | feat(app): add a timeline width setting | OPEN | 新增“时间轴宽度”设置（Focused/默认/宽），将会话列文本列宽控制在可读范围（约 66 字符/行），改善可读性。 | [链接](https://github.com/anomalyco/opencode/pull/58308) |
| #58306 | fix(desktop): keep New Session enabled outside sessions | OPEN | 修复 Linux/macOS 桌面端“新建会话”菜单项在非会话页面被禁用的问题，对应 Issue #58188。 | [链接](https://github.com/anomalyco/opencode/pull/58306) |
| #58307 | feat(app): show the web sources a reply used | OPEN | 在 Web 回复下显示“N 来源”芯片，点击可在侧边栏打开来源面板，列出搜索查询、结果数及打开的页面，增强可溯源性。 | [链接](https://github.com/anomalyco/opencode/pull/58307) |
| #58305 | fix(app): show MCP elicitation forms | OPEN | 修复桌面端和 Web 端不显示 MCP 诱导表单（elicitation forms）的问题，目前仅支持 `question` 和 `websearch.provider` 类型。 | [链接](https://github.com/anomalyco/opencode/pull/58305) |
| #58293 | fix(desktop): keep chrome-sandbox setuid in Linux packages | OPEN | 修复 Linux deb 包中 `chrome-sandbox` 缺少 setuid 位的问题，解决 AppArmor 环境下自动更新失败，对应 Issue #58157。 | [链接](https://github.com/anomalyco/opencode/pull/58293) |
| #58297 | fix(core): Fix Github Bot so it is supported in v2 | OPEN | 将 GitHub 集成（`opencode github install` / `run`）从 v1 移植到 v2，修复 GitHub Actions Bot 安装问题，对应 Issue #57911/#58129。 | [链接](https://github.com/anomalyco/opencode/pull/58297) |
| #58301 | fix(core): publish shell deletions on location teardown | OPEN | 修复 Location 拆卸时未向客户端发布 shell 删除事件，导致客户端 shell 注册表状态不同步。 | [链接](https://github.com/anomalyco/opencode/pull/58301) |
| #58300 | fix(cli): isolate background service per config profile | OPEN | 为后台服务引入按配置文件隔离的状态文件，避免多配置文件间冲突，对应 Issue #58141。 | [链接](https://github.com/anomalyco/opencode/pull/58300) |
| #58299 | fix(app): show live Thinking instead of hiding reasoning-only turns | CLOSED | 修复分组思考模式下，仅输出推理的回合显示为空白“Working”行，现在会实时展示思考内容和耗时。 | [链接](https://github.com/anomalyco/opencode/pull/58299) |
| #58294 | feat(core): rename precompute_compaction to background_compaction | CLOSED | 在发布前重命名实验性标志 `precompute_compaction` 为 `background_compaction`，并更新文档描述。 | [链接](https://github.com/anomalyco/opencode/pull/58294) |

## 功能需求趋势

从近 24 小时的 Issues 和 PR 中，社区最关注的功能方向包括：

1. **桌面端稳定性与集成**：Linux/macOS 菜单置灰、沙箱权限、自动更新失败、退出行为异常等桌面端 Bug 集中爆发，用户期望跨平台桌面体验达到生产级稳定性。
2. **LLM API 可靠性**：重试策略硬编码、提供商响应被阻止、特定模型（DeepSeek V4.1 Flash）返回 503 等问题表明，社区希望对模型调用的容错与重试机制有更细粒度的控制。
3. **V2 会话管理体验**：会话标题不自动生成、Web 端会话删除不同步、待办事项进度条不实时更新等，反映用户对 V2 会话生命周期管理的打磨需求。
4. **多模态与 Web 交互**：图片预览画廊导航、粘贴图片丢失提示词、Web 来源展示等需求显示，社区正在推动更丰富的多模态输入输出和信息溯源能力。
5. **移动端与旧设备兼容性**：iPadOS 16 Safari 兼容性问题提示，部分用户仍依赖旧设备访问 Web UI，降级兼容成为潜在需求。

## 开发者关注点

- **安全与计费**：免费模型通过 VPN 切换 IP 即可重置限额的漏洞（#34344）引发对计费系统安全性的担忧，建议后续加强设备/账户层面的限流而非单纯依赖 IP。
- **默认配置过于 rigid**：LLM API 重试次数和间隔硬编码在源码中（#58128），开发者希望能通过配置文件自定义重试策略，以适应不同网络环境和后端稳定性。
- **V2 版本回归问题**：多个 V2 功能（会话标题生成、思考内容实时显示）表现不如 V1，升级过程中出现回归，社区呼吁在新版本发布前做更充分的行为兼容性测试。
- **文档滞后于代码**：多个 PR 集中修复过时的 V1/V2 文档示例和链接（#58280、#58289、#58290 等），说明文档同步机制需要加强，避免开发者参考失效示例。
- **中文用户反馈增多**：出现中文 Issue（#58302 免费额度耗尽），提示 OpenCode 中文社区规模扩大，建议加强中文问题的分类与响应。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 | 2026-10-23

**数据来源**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

今日 Hermes 社区活跃度较高，共更新 11 个 Issue 与 50 个 PR，围绕 **桌面端稳定性、网关通信、内存管理及插件生态** 展开。未发布新版本，但多个 P2 级别 Bug 已被提交，涉及 Windows 权限、会话上下文显示、群聊锁死及视觉模型提供商解析等核心体验问题。

---

## 2. 版本发布

过去 24 小时内无新版本 Release。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 为何值得关注 | 链接 |
|---|------|----------|--------------|------|
| #143326 | 更新后模型选择延迟与 Windows 权限问题 | Hermes Windows 应用与网关权限不一致（网关以管理员运行，应用非管理员），导致通信错误及模型选择延迟 | 直接影响 Windows 桌面端可用性，属典型安装/更新后回归问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/143326) |
| #142925 | 非驻留会话的桌面上下文弹窗永久为空 | 非当前运行会话的 Context-usage 弹窗显示「暂无上下文数据」，尽管表头仍有真实 used/max 数据 | 桌面端上下文可见性 Bug，影响多会话切换体验 | [查看](https://github.com/NousResearch/hermes-agent/issues/142925) |
| #140189 | 网关对不可投递的进程完成通知每 5s 无限重试 | 无退避、无上限、无日志说明，导致持续 INFO 日志刷屏 | 网关稳定性与日志噪声问题，长期运行可能影响性能 | [查看](https://github.com/NousResearch/hermes-agent/issues/140189) |
| #142988 | `hermes update` 清除手动安装的内存提供商运行时 | 更新会重新同步 Python 工具链，导致 `hindsight-all` 被静默移除，内存提供商功能中断 | 涉及更新机制与用户自定义运行时的冲突，对依赖内存功能的用户影响大 | [查看](https://github.com/NousResearch/hermes-agent/issues/142988) |
| #143349 | 桌面群聊作曲在重试时永久锁定 | 当 `groups.send` 因载荷超过 64 KB 等原因拒绝时，作曲界面锁死 | 桌面端群聊场景下的严重交互阻塞 Bug | [查看](https://github.com/NousResearch/hermes-agent/issues/143349) |
| #143348 | 过期 `sessionOwnerHints` 导致会话固定到默认配置文件 | 跨配置文件打开会话时，持久化所有者提示将其固定到 `profile=default`，引发 REST 404 和 `session.resume` 404 | 多配置文件场景下的会话恢复故障，影响桌面端连接稳定性 | [查看](https://github.com/NousResearch/hermes-agent/issues/143348) |
| #143347 | 视觉探测无法为命名自定义提供商解析 `catalog_provider` | 命名自定义提供商被规范化为 `custom`，导致视觉路由失效，尽管 `get_model_capabilities` 能正确解析目录 | 涉及多模态模型路由与自定义提供商配置，影响视觉能力可用性 | [查看](https://github.com/NousResearch/hermes-agent/issues/143347) |
| #136094 | 每任务 HERMES_HOME 链接会重新发布共享检出启动器 | `tools/` 和 `installs/` 为指向主目录的符号链接时，首次非元数据启动会重新发布共享启动器 | 路径与安装更新机制问题，影响容器化/符号链接部署场景 | [查看](https://github.com/NousResearch/hermes-agent/issues/136094) |
| #130443 | 无法安装技能（no skill） | 执行 `hermes skills install official/autonomous-ai-agents/dynamic-workflow` 失败 | 技能/插件安装流程存在可用性问题，影响生态扩展 | [查看](https://github.com/NousResearch/hermes-agent/issues/130443) |
| #143346 | 看板调度器卡住警告未报告容量保持原因 | 当 `kanban.max_in_progress` 满载时，仅记录泛化警告，未说明具体阻塞原因 | 调度器诊断信息不足，影响自动化工作流排障效率 | [查看](https://github.com/NousResearch/hermes-agent/issues/143346) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #142850 | 添加 IAJUS 巴西和葡萄牙远程 MCP 目录条目 | feature | 新增两个可选远程 MCP 目录条目（巴西法律研究、葡萄牙判例研究），使用 HTTPS Streamable HTTP 端点和 OAuth，不运行本地进程也不嵌入凭据 | [查看](https://github.com/NousResearch/hermes-agent/pull/142850) |
| #143343 | WIP：批量更新 Python 依赖（仅非阻塞的次要/补丁更新） | feature | 仅更新非阻塞的次要/补丁版本依赖，降低工具链刷新风险 | [查看](https://github.com/NousResearch/hermes-agent/pull/143343) |
| #49684 | 修复工具：在 `_build_safe_env` 中保留规范 Windows 位置环境变量名 | bug | 修复 stdio MCP 子进程环境过滤，保留 `ProgramFiles`、`ProgramData`、`ProgramW6432` 等混合大写 Windows 位置变量 | [查看](https://github.com/NousResearch/hermes-agent/pull/49684) |
| #49740 | 写入内存时进行矛盾整合 | feature | 为 `memory add` 增加可选认知整合，由辅助 LLM 在写入前对比现有条目并解决矛盾/冗余 | [查看](https://github.com/NousResearch/hermes-agent/pull/49740) |
| #53299 | ACP 测试：使用 socketpair 传输以在 Windows 上运行 ping 抑制 E2E | test | 将 ACP 测试的匿名 `os.pipe()` 替换为 `socket.socketpair()`，修复 Windows 原生 `ProactorEventLoop` 无法注册匿名管道文件描述符的问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/53299) |
| #77998 | 修复 Discord：跨重新密钥跟踪实时语音凭据 | bug | 修复 Discord 语音 E2EE（DAVE/MLS）在群组成员变更或重连时的凭据轮换问题，不再仅在 `start()` 时快照一次 | [查看](https://github.com/NousResearch/hermes-agent/pull/77998) |
| #78204 | 修复 ACP：在会话构建站点遵守 `HERMES_ACP_SKIP_CONFIGURED_MCP` | bug | 修复环境变量仅在单一位置检查的问题，确保 ACP 主机可正确跳过配置的 MCP 服务器自动启动 | [查看](https://github.com/NousResearch/hermes-agent/pull/78204) |
| #79009 | 修复工具：扫描仅看起来已被阻止的内存条目 | security | 修复 `MemoryStore.load_from_disk` 的扫描遗漏，确保磁盘上的毒化内存文件在快照构建时被正确替换为占位符 | [查看](https://github.com/NousResearch/hermes-agent/pull/79009) |
| #107622 | 状态：添加幂等被动对话历史 | feature | 为实时语音客户端添加无需启动新 Agent 运行即可保存最终对话轮次的功能，空闲 Agent 在下次执行边界可见已保存轮次 | [查看](https://github.com/NousResearch/hermes-agent/pull/107622) |
| #142717 | 插件目录：添加 ld-workbench（辩论工作台）插件 | feature | 将 `ld-workbench`（MIT）添加到插件目录， pinned 到特定提交，用于辩论工作流 | [查看](https://github.com/NousResearch/hermes-agent/pull/142717) |

---

## 5. 功能需求趋势

从本日 Issues 与 PR 中提炼，社区最关注的功能方向包括：

1. **桌面端稳定性与多会话体验**  
   多个 Issue 指向桌面端上下文弹窗、群聊作曲锁死、跨配置文件会话恢复等问题，说明桌面客户端（Electron/TUI 网关）是当前体验瓶颈。

2. **插件与 MCP 生态扩展**  
   新增 IAJUS 法律 MCP 目录、ld-workbench 辩论插件、MrScraper 工具目录更新，显示社区正在积极丰富远程工具与专业领域插件。

3. **内存与状态管理增强**  
   矛盾整合、内存条目安全扫描、被动对话历史等 PR 表明，用户对长期记忆、对话状态一致性与安全性的需求在增加。

4. **跨平台兼容性（尤其是 Windows）**  
   多个 PR 专门修复 Windows 环境变量、管道传输、权限问题，说明 Windows 桌面端与容器化部署的适配仍是持续关注点。

5. **多模态与自定义模型提供商支持**  
   视觉探测无法解析命名自定义提供商的问题，反映用户希望更灵活地接入第三方模型目录并获得完整多模态能力。

---

## 6. 开发者关注点

**高频痛点：**

- **更新机制破坏自定义运行时**：`hermes update` 会重新同步 Python 工具链并静默移除未在清单中的运行时（如 `hindsight-all`），导致内存提供商功能中断。开发者期望更新过程更具可预测性，或提供排除列表。
- **网关重试与日志噪声**：对不可投递通知的无限 5s 重试缺乏退避策略和上限，产生大量无意义 INFO 日

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-10-23)

## 1. 今日速览

OpenClaw 今日发布 **v2026.10.6** 安全补丁版本，强制升级 Node.js 运行时以修复受 10 月 Node.js 安全公告影响的 TLS 证书链信任问题。社区活跃度保持在较高水平，今日新增/更新 4 个 Issue 与 50 个 PR，核心关注点集中在 Gateway 身份配置、会话恢复、SQLite 更新兼容性以及 macOS 系统级控制等领域。

## 2. 版本发布

**v2026.10.6** — openclaw 2026.10.6  
[GitHub Release 链接](https://github.com/openclaw/openclaw/releases/tag/v2026.10.6)

- **运行时安全补丁**：OpenClaw 现要求 Node 24.22.1+（24 线）或 26.12.1+（26 线），以拒绝由 2026 年 10 月 Node.js 安全发布中披露的受损证书密钥签名的 TLS 链。
- **Docker 镜像**：随附 Node 24.2.x 运行时，建议生产环境尽快升级以规避证书信任链风险。

## 3. 社区热点 Issues

本周期内进入更新窗口的 Issue 共 4 条，全部列出如下：

| # | 标题 | 状态 | 优先级/标签 | 核心摘要 | 链接 |
|---|------|------|-------------|----------|------|
| #159104 | Ambient webchat session resolves into a `kind: cron` session, failing with "session key does not match its placement" | CLOSED | P0, impact:session-state/message-loss/ux-release-blocker | iOS 端环境式 WebChat 会话错误解析为 cron 类型会话键，导致 Worker 回合失败，直接影响消息送达与用户体验。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/159104) |
| #178907 | Bug: MiniMax M3.1 Flash (Ollama Pro) tool calls fail 100% — "Provider returned an incomplete or malformed tool call" | OPEN | P1, impact:auth-provider | MiniMax M3.1 Flash（Ollama Pro）工具调用 100% 失败，提供商返回不完整或格式错误的工具调用，影响第三方模型供应商集成稳定性。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/178907) |
| #176994 | QA: subagent handoff times out without identifying which transition was missing | CLOSED | P2, impact:other | 子代理交接场景出现六分钟超时，但未定位具体缺失的状态转移，调试成本高，需改进超时诊断信息。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/176994) |
| #181197 | [Bug]: macOS Computer control reports unlocked Screen Sharing session as locked when another user owns physical console | OPEN | P2, impact:other | macOS 上当物理控制台由另一本地用户占用时，`screen.snapshot` 会将已解锁的标准屏幕共享会话误判为 `COMPUTER_DESKTOP_LOCKED`，影响远程控制可靠性。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/181197) |

**社区反应简述**：今日 Issue 讨论热度中等，#159104 获得 4 条评论并已关闭，#178907 获得 3 条评论，其余均为 1–3 条评论。Star 数普遍为 0，说明当前更多为内部回归与 Bug 修复跟踪，而非社区驱动的新功能请求。

## 4. 重要 PR 进展

从今日更新的 50 个 PR 中，选取 10 个具有代表性的合并候选与修复：

| # | 标题 | 作者 | 类型/标签 | 功能或修复内容 | 链接 |
|---|------|------|-----------|----------------|------|
| #181208 | fix(gateway): tools.github.configure failures now log the real cause before the generic response | @LiuwqGit | gateway, size:S, AI-assisted | 修复 GitHub 身份设置流仅返回通用失败信息的问题，现将 `tools.github.configure` 内部真实错误原因记录到日志，便于运维排查。Closes #181165。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181208) |
| #181207 | fix(gateway): let workers message non-default global families | @steipete | docs, gateway, size:S | 修复 Worker 因原始家族键查找丢失发送方所属者而拒绝向非默认代理的全局父级/兄弟节点发送消息的问题，恢复现有消息策略下的合法通信。Fixes #138234。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181207) |
| #181184 | fix: recover sessions left processing without an active run | @steipete | docs, size:M, P2, merge-risk: compatibility | 修复操作移动或输入等待保留清理后，会话长期停留在 `processing` 且无活跃运行的问题；之前诊断对该状态仅给出 `recovery=none`。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181184) |
| #181206 | fix(update): updates refuse with candidate-snapshot-failed after a SQLite tokenizer change | @steipete | docs, commands, size:M | 修复 `openclaw update` 在更新后的 Node 自带 SQLite FTS5 分词器与构建代理数据库时的分词器不一致时，因 `candidate-snapshot-failed` 拒绝更新的问题。Related: #176220, #176833。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181206) |
| #181166 | fix(update): keep verified updates successful after maintenance errors | @steipete | docs, cli, size:M, P2 | 修复更新在成功验证目标 Gateway 后，因后续可选维护步骤失败而误报失败或进入回滚的问题；最终器现在保留同一次调用内的健康验证事实。Fixes #181020。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181166) |
| #181204 | fix(codex): stop model fallback when native threads are active | @steipete | docs, gateway, size:M, extensions: codex | 修复当 Codex 原生线程仍被活跃工作占用且策略变更需要释放时，不必要的模型回退行为。Fixes #181046。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181204) |
| #181196 | fix(ui): keep chat selection on message text | @roboclaw-bot | app: web-ui, size:S | 修复 WebUI 聊天选择范围包含发送者/时间戳等 UI 铬的问题，现仅选中消息文本，选色采用请求色调的柔和蓝。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181196) |
| #181077 | perf(ui): defer dictation capture until voice starts | @steipete | app: web-ui, scripts, size:S, ci:full | 将 Composer 听写捕获（麦克风、音频转换、转录会话）延迟至首次听写或 Split Talk 交互时加载，降低聊天启动时的资源占用。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181077) |
| #181121 | perf(ui): defer workspace preview content until it is opened | @steipete | app: web-ui, scripts, size:XL, P3 | 将文件预览准备、编辑及工件解码代码延迟至工作区项被打开时加载，聊天启动 gzip 体积减少 2,019 字节，JS 请求数保持 23 个不变。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181121) |
| #181189 | refactor(ui): share ref lifetimes and settle menu focus | @steipete | app: web-ui, size:L, ci:full | 重构 UI 组件 DOM ref 生命周期管理，消除重复清理、侧边栏第二个插件回退渲染器，以及菜单/预览焦点变更时的同步 Solid 刷新。 | [查看 PR](https://github.com/openclaw/openclaw/pull/181189) |

## 5. 功能需求趋势

基于今日 Issues 与 PR 的标签分布与变更内容，社区关注的功能方向可归纳为：

1. **多供应商模型兼容性与工具调用**  
   #178907 反映 Ollama Pro / MiniMax 等第三方供应商的工具调用协议兼容性仍是痛点，社区对“非 OpenAI 原生供应商”的工具调用稳定性需求较高。

2. **会话状态恢复与诊断可观测性**  
   #159104、#176994、#181184 均围绕会话键不匹配、子代理交接超时、无活跃运行的处理会话等问题，说明对“会话状态机”的鲁棒性与故障定位能力是核心诉求。

3. **更新流程与数据库兼容性**  
   #181206、#181166 涉及 SQLite 分词器变更、更新候选快照失败及维护错误回滚，显示社区对平滑升级、版本回退安全性的关注度在提升。

4. **前端性能与资源懒加载**  
   #181077、#181121、#181189 均来自 WebUI 性能优化，聚焦于听写运行时、工作区预览内容及 DOM ref 生命周期的按需加载，以降低聊天启动开销。

5. **原生系统集成（macOS）**  
   #181197 涉及 macOS 屏幕共享会话状态误判，提示对操作系统级控制（Computer Control）在多用户环境下的适配需求正在浮现。

## 6. 开发者关注点

从今日提交的 PR 与 Issue 摘要中，开发者反馈的高频痛点包括：

- **错误信息不透明**：多处修复（如 #181208、#181206）针对的是“仅返回通用失败提示，缺少根因日志”的问题，开发者希望在 Gateway、更新、身份配置等关键路径中获得更精确的错误诊断。
- **更新与回滚的原子性**：#181166 指出更新在验

:::
