---
title: "AI CLI 工具社区动态日报"
published: 2026-10-28
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-28

> 生成时间: 2026-10-28 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-10-28）

## 1. 生态全景

当前 AI CLI 工具正从单一“命令行助手”向多代理协作、企业级身份集成和跨端会话管理方向演进。各主流工具均进入稳定版迭代与 Alpha 并行发布阶段，社区核心诉求已从功能扩展转向稳定性、隐私合规与资源隔离。桌面端与 TUI 端的体验差距、子代理上下文继承、MCP 资源泄漏成为行业共性痛点。整体呈现“功能丰富但边缘场景尚未打磨”的成熟度特征，适合技术决策者关注企业级落地风险与长期生态兼容性。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Release | 精选 Issues 数 | 精选 PR 数 | PR 状态分布 | 主要版本 |
|------|------|-------------|---------------|-----------|------------|---------|
| Claude Code | anthropics/claude-code | v2.1.312 | 10 | 3 | 2 OPEN / 1 CLOSED | v2.1.312 |
| OpenAI Codex | openai/codex | rust-v0.165.0 稳定版 + 多个 0.166.0-alpha | 10 | 10 | 10 CLOSED（多为 bot 自动化合并） | v0.165.0 |
| Gemini CLI | google-gemini/gemini-cli | v0.67.0-nightly / v0.67.0-preview.0 / v0.66.0 | 10 | 10 | 10 CLOSED（Bugfix/Feature 混合） | v0.67.0-nightly |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | v2.53.1 (Studio + CLI) | 4 | 10 | 2 OPEN / 8 CLOSED | v2.53.1 |
| OpenCode | anomalyco/opencode | v2.2.0 | 10 | 10 | 8 OPEN / 2 CLOSED | v2.2.0 |
| DeepSeek Harness | deepseek-ai/deepseek-harness | 无 | 0 | 0 | 0 | 无活动 |
| Hermes | NousResearch/hermes-agent | 无 | 10 | 10 | 10（混合 Feature/Bugfix） | 无新版本 |
| OpenClaw | openclaw/openclaw | v2026.10.10-beta.4 / v2026.10.8 / v2026.9.35 | 11 | 10 | 10（混合） | v2026.10.10-beta.4 |

**数据补充**：DeepSeek Harness 过去 24 小时无社区活动；Hermes 与 OpenClaw 的 Issue/PR 数量与 Claude Code、OpenCode 相当，但未发布新版本，显示出“社区活跃但发布节奏较慢”的特征。

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重合的需求：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|---------|---------|------------|
| **子代理与多代理协作** | Claude Code、Gemini CLI、OpenCode、OpenClaw | 子代理未继承全局规则（`AGENTS.md`）；子代理挂起或状态误报；子代理直接打断用户而非通过父会话提问；多会话/多子代理锁竞争导致阻塞 |
| **会话生命周期与跨端恢复** | Claude Code、Hermes、OpenClaw | 归档为单向操作，缺乏反归档与 Archived 视图；远程后台/移动端会话在桌面端无法恢复（`session.resume` 返回 `not_found`）；自动更新重启导致 Remote Control 会话丢失 |
| **桌面端 UX 与自动化控制** | Claude Code、OpenCode、Gemini CLI | 自动更新未经同意强制重启；UI 遮挡（如“下一步”按钮框）；文件树/预览面板内容不同步；终端 UI 中 Emoji/代理对截断异常 |
| **隐私合规与企业身份集成** | Claude Code、Hermes | 账号 PII（邮箱）未经同意注入系统提示词；OIDC 声明自定义（如 `oid`）需扩展 IdP 兼容性；同一人多登录方式导致聊天历史隔离 |
| **MCP 与外部工具资源管理** | OpenAI Codex、OpenCode | MCP 服务器进程重复累积导致内存飙升（~6GB RAM）；MCP 进程批量启动与清理不彻底；资源目录缓存与 HTTP 429 退避机制不足 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 企业级 SSO/OIDC、隐私合规（PII 注入防护）、Cowork 云端协作 | 企业开发团队、合规敏感场景 | 基于 Anthropics 生态，强调企业身份集成与云端会话协作，桌面端与 TUI 双轨并行 |
| **OpenAI Codex** | IDE 扩集成（VS Code/Cursor/Windsurf）、跨平台远程（Android↔macOS）、模型目录多云（GCP Vertex AI） | 个人开发者、IDE 深度用户、多云模型用户 | Rust 核心库，频繁 Alpha 迭代，侧重 IDE 插件生态与跨操作系统沙箱兼容性 |
| **Gemini CLI** | 子代理稳定性、AST 感知代码读取、浏览器代理（Wayland/Linux）、扩展验证命令 | AI 原生应用开发者、Linux 桌面用户、代码导航密集型场景 | TypeScript/Node 生态，强调 AST 代码结构感知与浏览器自动化，扩展生态标准化 |
| **DeepSeek Reasonix** | 多会话/子代理锁机制、局域网远程连接、代理权限与预算隔离 | 远程开发团队、多项目并发场景、成本敏感型用户 | 侧重预算隔离与代理证明机制，提供 Studio GUI 与 CLI 双端，远程优先设计 |
| **OpenCode** | Desktop 插件系统（实验性）、MCP 资源泄漏修复、CLI 管道输出、TUI 键盘协议 | 插件开发者、终端重度用户、自动化脚本集成者 | 插件化架构，v2.2.0 引入 Desktop 插件，侧重可编程扩展与终端交互协议兼容性 |
| **Hermes** | 跨端会话互通（桌面/移动/TUI/Webapp）、网关高负载性能、多登录身份统一 | 多设备用户、团队协作、网关部署场景 | 侧重会话源标识与身份链接，网关架构复杂，多租户/多配置文件场景下资源控制是核心 |
| **OpenClaw** | 更新恢复机制、插件迁移死锁、事件循环阻塞、多 Agent 路由 | 自动化运维、插件开发者、企业网关部署 | 网关中心化架构，强调更新可用性与插件生命周期管理，P0 级阻塞问题较多 |
| **DeepSeek Harness** | 无活动 | — | 过去 24 小时无社区动态，需关注是否进入维护期或发布节奏调整 |

## 5. 社区热度与成熟度

- **高活跃、快速迭代**：OpenAI Codex（10 个合并 PR，多为基础设施自动化）、Gemini CLI（10 个合并 PR，覆盖 Bugfix 与 Feature）、OpenCode（8 个 OPEN PR，插件系统与核心流程并行推进）。这三个工具的代码贡献节奏最快，适合追求前沿功能的早期采用者。
- **社区活跃但发布节奏相对保守**：Claude Code（仅 3 个 PR，但 Issues 讨论深度高，集中在安全与合规）、Hermes（10 个 Issue/PR，但无新版本，集中在跨端会话修复）、OpenClaw（11 个 Issue，多个 P0/P1 阻塞问题，发布多个 beta/LTS 版本）。适合稳定性优先的企业评估。
- **低活跃/待观察**：DeepSeek Harness 过去 24 小时无任何 Issue/PR/Release，建议决策者关注其项目维护状态。

## 6. 值得关注的趋势信号

1. **从“功能堆砌”转向“边缘场景打磨”**  
   各工具不再竞相发布大型新特性，而是集中修复子代理上下文继承、会话恢复、MCP 资源泄漏等长尾问题。这表明 AI CLI 工具已进入成熟期，可靠性将成为产品差异化的核心。

2. **企业级身份与合规成为刚需**  
   Claude Code 的 OIDC `oid` 声明支持、Hermes 的多登录身份隔离、Claude Code 的 PII 注入问题，均指向企业采购对 SSO、数据合规与审计能力的硬性要求。选型时应优先评估工具的企业身份集成成熟度。

3. **多代理协作架构尚未标准化**  
   Claude Code、Gemini CLI、OpenCode、OpenClaw 均出现子代理上下文、锁竞争、权限隔离问题，但尚无行业统一的多代理通信协议。开发者在构建多代理工作流时，需预留较大的适配与重构空间。

4. **桌面端与 TUI 端体验存在代差**  
   多个工具的桌面端（自动更新重启、文件预览不同步）与 TUI 端（键盘协议、Unicode 截断）问题并存，跨端一致性是下一阶段的关键改进方向。对终端重度用户而言，TUI 稳定性可能比 GUI 新功能更重要。

5. **MCP 生态资源管理成为性能瓶颈**  
   OpenAI Codex 与 OpenCode 均出现 MCP 服务器进程累积与内存泄漏问题，说明外部工具接入已规模化，但资源生命周期管理尚未成熟。大规模部署 MCP 服务器前，建议先评估进程回收与内存上限控制机制。

**决策建议**：若追求企业级合规与云端协作，Claude Code 最为契合；若依赖 IDE 插件生态与多云模型，OpenAI Codex 更合适

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-10-28）

## 1. 热门 Skills 排行

基于 PR 更新活跃度与社区关注度，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简介 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers | 修复 MCP Builder 技能，适配 `mcp>=2.0.0` 中 `streamable_http_client` 的重命名及自定义 HTTP 头配置 | MCP 协议版本兼容性是社区痛点，涉及技能底层连接稳定性 | OPEN | [#1742](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills | 新增两个技能：Notion 规格转实现计划（拆解任务、验收标准、进度追踪）与定量简历审计 | 企业级文档自动化与人力资源场景需求明显 | OPEN | [#1245](https://github.com/anthropics/skills/pull/1245) |
| 3 | #1771 feat(skills): add proofcore-contract-auditor for smart contract notarization | Web3 智能合约审计技能，对 Solidity/Rust 合约进行静态分析，并将审计证明锚定至 TON 区块链 | 区块链/智能合约安全审计是新兴垂直领域 | OPEN | [#1771](https://github.com/anthropics/skills/pull/1771) |
| 4 | #1703 Add md2video-audio skill | 将 Markdown 文档零成本编译为带真人感语音的 MP4 视频（基于 Marp 生成幻灯片） | 内容多模态转换（文档→视频）受到关注 | OPEN | [#1703](https://github.com/anthropics/skills/pull/1703) |
| 5 | #525 Add pyxel skill for retro game development | Python 复古游戏开发技能，涵盖实现指导、无头输入运行、帧检查与状态验证 | 游戏开发垂直领域技能有持续社区需求 | OPEN | [#525](https://github.com/anthropics/skills/pull/525) |
| 6 | #514 Add document-typography skill: typographic quality control for generated documents | AI 生成文档的排版质量控制，防止孤行词、孤段及编号错位 | 生成式文档的专业排版质量是通用痛点 | OPEN | [#514](https://github.com/anthropics/skills/pull/514) |
| 7 | #1980 webapp-testing: avoid shell=True in with_server.py | Web App 测试技能安全修复，移除 `shell=True` 以避免命令注入风险（CWE-78） | 技能脚本安全性与供应链安全受到重视 | OPEN | [#1980](https://github.com/anthropics/skills/pull/1980) |
| 8 | #1681 fix(skill-creator): support direct execution of package_skill.py and update usage paths | 修复 skill-creator 技能打包脚本直接执行失败问题，更新过时的引用路径 | 技能创建/打包工具链的可用性影响社区贡献门槛 | OPEN | [#1681](https://github.com/anthropics/skills/pull/1681) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进诉求如下：

1. **组织级技能共享与分发**  
   Issue #228 呼吁在 Claude.ai 内实现 org-wide 技能共享，避免手动下载/上传 .skill 文件，期望出现共享技能库或直接分享链接。

2. **技能触发与评估可靠性**  
   Issue #556 报告 `run_eval.py` 中 `claude -p` 无法触发技能（0% 触发率）；Issue #1298 关注触发评估误报、Windows 兼容性及运行时失败处理。社区对技能触发机制的稳定性要求较高。

3. **安全与信任边界**  
   Issue #492 指出社区技能冒用 `anthropic/` 命名空间存在信任边界漏洞，用户可能误将社区技能当作官方技能授予高权限，亟需命名空间治理或官方认证机制。

4. **文档与文件格式处理**  
   Issue #2018（docx 合并运行丢失命名空间）、#1868（Slack GIF 背景渐变颜色偏差）、#1792（docx LibreOffice 超时处理）等，显示社区对 Office 文档、多媒体文件处理技能的鲁棒性有明确期待。

5. **AI 治理与推理质量**  
   Issue #1385 提出“推理质量闸门流水线”（预校准→对抗审查→交付验证）；Issue #412 提出 agent-governance 技能（策略执行、威胁检测、审计追踪），反映企业对 AI Agent 安全与可解释性的关注。

6. **记忆压缩与长上下文管理**  
   Issue #1329 提议 `compact-memory` 技能，使用符号表示法压缩 Agent 状态，解决长期运行 Agent 上下文膨胀问题。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新最近，且功能切合实际场景，可能近期落地：

- **#1742 mcp-builder MCP v2 适配**  
  修复 MCP 协议 v2 破坏性变更，直接影响所有基于 MCP Builder 的技能连接能力，修复优先级高。  
  [https://github.com/anthropics/skills/pull/1742](https://github.com/anthropics/skills/pull/1742)

- **#1245 notion-spec-to-implementation & quantitative-resume-auditor**  
  覆盖产品规格到工单拆解、简历定量审计两个企业高频场景，实用性强，社区关注度持续。  
  [https://github.com/anthropics/skills/pull/1245](https://github.com/anthropics/skills/pull/1245)

- **#1771 proofcore-contract-auditor**  
  Web3 智能合约审计 + 区块链存证，垂直领域壁垒高，若合并将丰富安全审计类技能生态。  
  [https://github.com/anthropics/skills/pull/1771](https://github.com/anthropics/skills/pull/1771)

- **#1980 webapp-testing 安全加固**  
  涉及命令注入漏洞（CWE-78）修复，属于安全类必修补丁，合并可能性大。  
  [https://github.com/anthropics/skills/pull/1980](https://github.com/anthropics/skills/pull/1980)

- **#1681 skill-creator 打包脚本修复**  
  降低社区贡献新技能的门槛，对整个 Skills 生态的扩展性有基础性影响。  
  [https://github.com/anthropics/skills/pull/1681](https://github.com/anthropics/skills/pull/1681)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在提升技能触发可靠性、分发安全与企业级文档/合规自动化能力的同时，构建更易于创建、共享与审计的官方技能基础设施。**

---

# Claude Code 社区动态日报
**日期**: 2026-10-28  
**数据来源**: github.com/anthropics/claude-code

---

## 1. 今日速览

Claude Code 昨日发布 v2.1.312 小版本更新，主要增强了企业级 OIDC 认证灵活性（支持 Microsoft Entra ID 的 `oid` 声明）并优化了全屏模式下的消息发送体验。社区方面，隐私合规（PII 注入）、Cowork/GitHub 集成稳定性、桌面端会话管理以及子代理上下文继承成为开发者讨论的核心焦点，多个长期悬而未决的 Issue 在近期获得新进展。

---

## 2. 版本发布

### v2.1.312

| 更新项 | 说明 |
|--------|------|
| `oidc.user_id_claim` | Claude apps gateway 新增配置，允许通过 `id_token` 中除 `sub` 以外的声明（如 Microsoft Entra ID 的 `oid`）来识别用户，增强企业 SSO 兼容性。 |
| Click to send | 全屏模式下，排队消息下方的“点击立即发送”提示现在可直接点击发送，行为与快捷键保持一致。 |

[查看完整 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.312)

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数）及问题严重性筛选：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #81138 | 账号邮箱（PII）未经同意被注入模型系统提示词 | 用户邮箱被自动写入 system prompt，涉及隐私合规与数据泄露风险 | 65 👍 / 19 评论，持续关注的高优先级安全问题 | [查看](https://github.com/anthropics/claude-code/issues/81138) |
| #102273 | 桌面端 Code 标签页：回合末“下一步”按钮框阻碍真实讨论 | 1–2 个答案按钮弹出后遮挡对话，影响多轮交互体验 | 51 👍 / 24 评论，UI/UX 热点 | [查看](https://github.com/claude-code/issues/102273) |
| #78795 | 触发式自动记忆主题文件注入（类 rules-style frontmatter） | 请求支持基于触发条件自动注入记忆文件，增强长期上下文管理 | 15 评论，刚在 10-28 更新，核心记忆功能方向 | [查看](https://github.com/claude-code/issues/78795) |
| #84581 | Cowork 云会话无法访问 GitHub 仓库，Git 代理指向不存在的 `add_repo` 工具 | 云端协作会话与 GitHub 集成彻底失效，影响团队协作场景 | 8 👍 / 13 评论，Cowork 稳定性重灾区 | [查看](https://github.com/claude-code/issues/84581) |
| #67835 | 会话归档为单向操作：无反归档工具，桌面端无 Archived 视图 | 归档后会话成为“孤岛”，助手和用户均无法恢复 | 15 👍 / 13 评论，会话生命周期管理缺口 | [查看](https://github.com/claude-code/issues/67835) |
| #95455 | v2.1.277 回归：`excludedCommands` 精确匹配也会丢弃带前置子命令标志的单命令 | `git -C`、`git -c`、`git --git-dir` 等被误拦截，影响 Linux/WSL 沙箱使用 | 8 👍 / 13 评论，明确回归 bug | [查看](https://github.com/claude-code/issues/95455) |
| #103005 | 桌面端自动更新重启会归档活跃的 Remote Control 会话且不恢复 | 手机端会话列表消失，重连后显示“Remote control...”错误 | 3 👍 / 4 评论，远程控制场景下的数据丢失风险 | [查看](https://github.com/claude-code/issues/103005) |
| #105252 | 子代理不继承 `~/.claude/AGENTS.md` 上下文 | 子代理启动时未加载全局规则文件，导致项目约束失效 | 新建 Issue（10-26），子代理与项目规则体系的痛点 | [查看](https://github.com/claude-code/issues/105252) |
| #105520 | 支持通过 SSH 使用 Kitty 剪贴板协议（OSC 5522）粘贴图片 | Ghostty 1.4 和 Kitty 已支持，请求 TUI 端跟进图片粘贴能力 | 新建 Issue（10-27），终端端多模态输入需求 | [查看](https://github.com/claude-code/issues/105520) |
| #104422 | 桌面端自动更新在工作日未经同意重启应用 | 每日多次强制重启，忽略“空闲”状态，严重干扰开发流程 | 1 👍 / 1 评论，Windows 用户体验投诉 | [查看](https://github.com/claude-code/issues/104422) |

---

## 4. 重要 PR 进展（共 3 条）

| PR | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #15620 | fix(plugin-dev): 修正 agent/command 示例中的工具格式 | OPEN | 修复 YAML 解析问题：JSON 数组格式 `["Read", "Write"]` 被当作字符串处理，已转换为 YAML 逗号分隔格式 `Read, Write`，涉及 11 个 plugin-dev 插件文件 | [查看](https://github.com/anthropics/claude-code/pull/15620) |
| #105303 | 从 claude-plugins-official 安装市场插件 | CLOSED | `claude-code-plugins` 市场现支持安装所有来自 `claude-plugins-official` 的插件，需在 `claude-plugins-official#6905` 和 `#6906` 合并后再合并，避免安装旧版 `code-review` | [查看](https://github.com/anthropics/claude-code/pull/105303) |
| #32753 | docs: 修复仓库中过时的文档 URL | OPEN | 将 `docs.anthropic.com` 和 `docs.claude.com` 替换为当前 `code.claude.com` 域名，涉及 12 个文件、26 行变更；`CHANGELOG.md` 保留历史引用不做更改 | [查看](https://github.com/anthropics/claude-code/pull/32753) |

> 注：过去 24 小时内仅有 3 个 PR 更新，其中 2 个为 OPEN 状态，1 个已 CLOSED，社区代码贡献节奏相对平稳。

---

## 5. 功能需求趋势

从近 24 小时更新的 Issues 中可提炼出以下社区关注方向：

1. **会话与记忆管理增强**  
   用户强烈希望打通会话生命周期（归档/反归档、Archived 视图），并支持更灵活的自动记忆注入机制（如基于触发条件的 topic 文件），以支撑长周期复杂项目。

2. **Cowork 与云端协作稳定性**  
   多个 Issue 指向 Cowork 云会话与 GitHub 集成的断连、权限同步失效、仓库访问异常，成为团队协作场景下的首要痛点。

3. **桌面端 UX 与自动化控制**  
   开发者反映自动更新强制重启、通知不稳定、UI 遮挡（如“下一步”按钮框）等问题，希望获得更细粒度的更新策略和界面定制能力。

4. **子代理与项目规则继承**  
   `AGENTS.md` 上下文未传递给子代理，表明多代理协作模式下的规则一致性仍需加强。

5. **终端端多模态输入**  
   SSH 图片粘贴（OSC 5522）等请求显示 TUI 用户希望在终端环境下获得与桌面端相当的多模态交互体验。

---

## 6. 开发者关注点（痛点与高频需求）

### 高频痛点
- **隐私合规**：账号 PII（邮箱）未经明确同意注入系统提示词，涉及数据合规风险，社区呼声最高（65 👍）。
- **集成稳定性**：Cowork/GitHub 云会话频繁出现“设置显示绿色但实际不可用”的情况，代理工具（如 `add_repo`）缺失或指向错误。
- **自动化干扰**：桌面端自动更新未经用户确认即重启，且可能导致 Remote Control 会话丢失，影响工作日连续性。

### 高频需求
- **更细粒度的权限与更新控制**：允许用户选择安装时间、跳过非关键更新、保留通知而不强制重启。
- **会话双向管理**：提供 `unarchive_session` 工具及桌面端 Archived 视图，避免会话孤岛。
- **企业身份集成**：OIDC 声明自定义（如 `oid`）的支持已进入 v2.1.312，社区期待后续继续扩展 IdP 兼容性。

---

*本日报基于 GitHub 仓库 `anthropics/claude-code` 在 2026-10-28 的公开 Issue、PR 与 Release 数据整理，仅供技术参考。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-10-28  
**数据来源**: [github.com/openai/codex](https://github.com/openai/codex)

---

## 1. 今日速览

Codex 近期发布了 Rust 核心库 `v0.165.0` 稳定版，原生支持 Google Cloud Vertex AI 提供商并将 GPT-6.1 Terra 加入模型目录；同时多个 `0.166.0-alpha` 版本持续迭代。社区高度关注 IDE 扩展启动失败、Windows 沙箱环境变量缺失导致会话无法恢复，以及可自定义 TUI 状态行等长期待办功能，Windows 与跨平台兼容性成为当前主要反馈集中区。

---

## 2. 版本发布

| 版本 | 类型 | 主要更新 |
|------|------|----------|
| **rust-v0.165.0** | 稳定版 | 新增内置 Google Cloud Vertex AI 提供商（`model_provider = "gcp"`）；将 **GPT-6.1 Terra** 加入模型目录；会话选择器新增仓库过滤器，Agent 命令中心增加目录分组，提升导航体验。 |
| rust-v0.166.0-alpha.3 / .2 / .1 | Alpha | 持续发布中，本次未附详细变更说明。 |
| rust-v0.165.0-alpha.1.2 / .1.1 | Alpha | 补丁版本，未附详细变更说明。 |

[查看完整 Releases](https://github.com/openai/codex/releases)

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 关注理由 |
|---|------|------|---------|----------|
| [#17827](https://github.com/openai/codex/issues/17827) | Customizable status line | OPEN | 55 / 209 | 社区最高点赞 Issue，用户呼吁效仿 Claude Code 提供可自定义的 TUI 状态行（显示 Token 用途、模型名、速率限制、Git 分支等），属于核心体验增强需求。 |
| [#37458](https://github.com/openai/codex/issues/37458) | Codex extension fails to start: "The extension couldn't load its resources" | CLOSED | 58 / 14 | Windows 上 VS Code 扩展无法加载资源的高频故障，评论数最多，反映 IDE 集成稳定性仍是痛点。 |
| [#52873](https://github.com/openai/codex/issues/52873) | dot cannot read user-created Codex threads | OPEN | 29 / 9 | `dot` 无法读取用户自创建的 Codex 线程，报“unsupported placement format version/region”，涉及本地数据互操作性。 |
| [#50915](https://github.com/openai/codex/issues/50915) | MXC fails before command launch when an unrelated BitLocker volume is locked | OPEN | 24 / 8 | Windows 11 下，无关 BitLocker 卷被锁定会导致 MXC 沙箱在启动子进程前失败，与工作区所在盘无关，属环境隔离缺陷。 |
| [#39678](https://github.com/openai/codex/issues/39678) | [Remote][Android to macOS] "No project" chat fails with project trust error | OPEN | 21 / 14 | 跨平台远程会话（Android → macOS）出现项目信任错误，影响移动端与桌面端协作场景。 |
| [#56264](https://github.com/openai/codex/issues/56264) | Windows desktop: thread resume fails after update because MXC process.env lacks SYSTEMROOT | OPEN | 19 / 3 | 更新后 Windows 桌面端无法恢复现有对话，根因是 MXC 启动器环境变量缺少 `SYSTEMROOT`，属典型更新回归问题。 |
| [#32499](https://github.com/openai/codex/issues/32499) | No 5.6 in open-vsx extension - publish the updated extension to open-vsx | CLOSED | 16 / 9 | Open-VSX 市场上的 Codex 扩展版本滞后于微软市场，影响 Cursor、Windsurf 等非官方 IDE 用户的更新体验。 |
| [#50346](https://github.com/openai/codex/issues/50346) | [Linux desktop] 26.930.21537 removes Ctrl+Shift+D composer dictation | CLOSED | 15 / 3 | Linux 桌面端升级后 Composer 听写快捷键及提示消失，点击麦克风仍可录制，属 UI 回归缺陷。 |
| [#40579](https://github.com/openai/codex/issues/40579) | [Windows 26.818] MCP process-batch accumulation and incomplete cleanup | OPEN | 13 / 2 | 5 个 MCP 服务器下，Codex 桌面端重复启动完整进程批次且清理不彻底，影响 Windows 上的资源占用与性能。 |
| [#57344](https://github.com/openai/codex/issues/57344) | [BUG][Windows][VS Code] Codex v26.1021.22027 fails to start UI | OPEN | 3 / 2 | 最新 VS Code 扩展版本无法启动 UI，降级至 `26.1007.21434` 可恢复，提示近期发布存在回归风险。 |

---

## 4. 重要 PR 进展（精选 10 条）

近 24 小时内合并的 PR 多由 `copyberry[bot]` 自动化提交，涉及底层基础设施、安全与兼容性改进：

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#57590](https://github.com/openai/codex/pull/57590) | Ship `codex-exec-server` in CLI and app-server packages | CLOSED | 在 CLI 和 app-server 包中构建并捆绑独立执行器，通过 `codex-package.json` 的 `execServer` 字段暴露路径，覆盖 macOS 签名与发布打包。 |
| [#57589](https://github.com/openai/codex/pull/57589) | Add a standalone `codex-exec-server` executable | CLOSED | 提取执行器启动逻辑为独立 CLI，供 `codex exec-server` 与新二进制复用，保持参数、鉴权、配置覆盖及沙箱助手分发一致。 |
| [#57586](https://github.com/openai/codex/pull/57586) | Add host-reserved V2 child creation APIs | CLOSED | 新增 `CodexThread::create_child` 及 `prepare_child` / `ThreadManager::create_prepared_child`，支持从活跃工具调用创建空闲子线程，捕获继承设置。 |
| [#57585](https://github.com/openai/codex/pull/57585) | Replace unavailable image references in model requests | CLOSED | 增加附件可用性检查（可选），模型请求反映图片当前可用性，同时在保存历史中保留原始引用。 |
| [#57584](https://github.com/openai/codex/pull/57584) | Preserve output boundaries through token truncation | CLOSED | 新增 `OutputBoundary` 与 Token 预算格式化 API，在截断后重新映射输入位置与文本偏移，保持输出边界完整性。 |
| [#57581](https://github.com/openai/codex/pull/57581) | Allow model catalogs to customize approval instruction headings | CLOSED | 目录审批消息新增 `request_permissions` / `auto_review_suffix` 字段，支持自定义权限工具标题与自动审查指引。 |
| [#57575](https://github.com/openai/codex/pull/57575) | Refactor HTTP client construction and request execution | CLOSED | 重构 HTTP 客户端构建与请求执行，Windows 代码路径中绑定 awaited 结果再进行匹配，提升稳定性。 |
| [#57573](https://github.com/openai/codex/pull/57573) | Add filesystem-free classification of intercepted patch commands | CLOSED | 新增 `MaybeApplyPatch::intercepts_command`，在不读取补丁目标文件的前提下识别被 exec 拦截的命令，包括显式/畸形/隐式补丁调用。 |
| [#57568](https://github.com/openai/codex/pull/57568) | Configure memory consolidation service tiers independently | CLOSED | 记忆整合服务新增独立服务层级配置 `memories.consolidation_service_tier`，默认 Standard，避免继承会话层级。 |
| [#57567](https://github.com/openai/codex/pull/57567) | Allow catalog URL overrides for the built-in OpenAI provider | CLOSED | 允许在 `[model_providers.openai]` 下使用 `model_catalog_url` 覆盖目录地址，同时保留内置提供商身份、鉴权与推理路由。 |

[查看全部 PR](https://github.com/openai/codex/pulls)

---

## 5. 功能需求趋势

从 Issues 与 PR 中提炼出的社区关注方向：

1. **IDE 集成与扩展稳定性**  
   VS Code 扩展启动失败（#37458、#57344）、Open-VSX 版本滞后（#32499）反复出现，说明跨 IDE（Cursor、Windsurf、VS Code）的兼容性与发布同步是用户最直接的痛点。

2. **TUI/CLI 体验增强**  
   可自定义状态行（#17827）获得 209 个 👍，显示用户希望在终端界面获得更多实时元信息（Token、模型、速率限制、Git 分支等），与竞品功能对齐。

3. **跨平台与远程协作**  
   Windows BitLocker 沙箱失败（#50915）、Linux 快捷键回归（#50346）、Android 到 macOS 远程项目信任错误（#39678），表明多操作系统及远程场景下的环境一致性仍需加强。

4. **MCP 与外部工具生态**  
   MCP 进程批量累积与清理不彻底（#40579），以及多个与 `app-server`、`sandbox` 相关的 Issue，显示用户正在大规模接入 MCP 服务器，对资源管理与生命周期控制提出更高要求。

5. **模型目录与提供商扩展**  
   GCP Vertex AI 原生支持（#56265）、GPT-6.1 Terra 加入目录，以及允许目录 URL 覆盖（#57567），体现社区对多云模型供应商和自定义模型路由的需求增长。

---

## 6. 开发者关注点

- **Windows 平台回归问题集中**：`SYSTEMROOT` 缺失导致会话无法恢复（#56264）、BitLocker 卷锁定

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-10-28)

## 今日速览

Gemini CLI 今日发布了 v0.67.0-nightly 及 v0.67.0-preview.0 两个版本，主要修复了项目支出上限错误分类、ACP 权限请求元数据缺失等核心问题。社区围绕子代理（Subagent）稳定性、浏览器代理兼容性以及 AST 感知代码读取等议题保持高度活跃，多个 P1 级 Bug 仍待修复。

## 版本发布

### v0.67.0-nightly.20261027.g363a13119
- **fix(core)**: 将项目支出上限（spending cap）错误分类为终端配额错误（terminal quota errors），改善配额耗尽时的错误处理体验。[@jesussamuel-byte](https://github.com/google-gemini/gemini-cli/pull/29961)
- **fix(acp)**: 在权限请求中包含 MCP 服务器和工具元数据，增强 ACP 协议下的工具调用透明度。[@duvanka-prasad](https://github.com/google-gemini/gemini-cli/pull/29961)

### v0.67.0-preview.0
- 主要为版本号 bump 与自动生成的 Changelog 更新，未引入显著新功能。

### v0.66.0
- 更新 ROADMAP.md，移除过时的 2025 路线图引用。[@DavidAPierce](https://github.com/google-gemini/gemini-cli/pull/29723)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级 | 评论/👍 | 关注理由 | 链接 |
|---|------|--------|---------|----------|------|
| #22323 | Subagent recovery after MAX_TURNS reported as GOAL success | P1 | 13 / 2 | 子代理在达到最大轮次后仍报告 `GOAL` 成功，掩盖了中断，导致调研任务看似完成实则未执行分析。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent hangs | P1 | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，社区反馈强烈（👍数较高），影响核心可用性。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | P2 | 9 / 1 | 提出利用 Gemini 3 原生 Bash 能力，通过零依赖 OS 沙箱增强代码库探索，属于大型功能增强提案。 | [查看](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | Assess the impact of AST-aware file reads, search, and mapping | P2 | 7 / 1 | 探索 AST 感知的文件读取与搜索，旨在减少 Token 浪费并提升代码导航精度，涉及多个子 Issue。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini does not use skills and sub-agents enough | P2 | 7 / 0 | 模型主动调用自定义技能和子代理的意愿不足，需显式指令才会触发，影响 Agent 工作流自动化。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #21983 | browser subagent fails in wayland | P1 | 4 / 1 | 浏览器子代理在 Wayland 显示服务器下失败，影响 Linux 桌面用户的浏览器自动化场景。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #22267 | Browser Agent ignores settings.json overrides | P2 | 4 / 0 | 浏览器代理忽略全局/项目级 `settings.json` 中的 `maxTurns` 等配置覆盖，导致配置失效。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22267) |
| #24246 | Gemini CLI encounters 400 error with > 128 tools | P2 | 3 / 0 | 当可用工具超过 128 个时出现 400 错误，提示需要更智能的工具作用域限制机制。 | [查看](https://github.com/google-gemini/gemini-cli/issues/24246) |
| #22186 | get-shit-done output hook causes crash | P1 | 3 / 0 | 输出钩子在打印用户摘要时导致 CLI 崩溃，影响任务完成后的反馈闭环。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22186) |
| #22672 | Agent should stop/discourage destructive behavior | P2 | 3 / 1 | 模型可能执行 `git reset --force` 等破坏性操作，社区呼吁增加安全拦截与替代方案提示。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22672) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #29989 | fix(core,cli): fix instances of incorrect `\n` escape behavior | Bugfix | 修复 `@google/gemini-cli-core` 及 `@google/gemini-cli` 中多个 naive `\n` 转义/反转义问题，防止字符串、正则及代码片段在文件编辑和 UI 文本规范化中被损坏。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29989) |
| #29994 | fix(vscode-ide-companion): register all extension disposables | Bugfix | 修复 VS Code IDE 伴侣扩展中 `context.subscriptions` 注册逻辑，避免因多余括号导致部分 Disposable 未被正确跟踪。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29994) |
| #29987 | fix(core): normalize leading slashes in file search query | Bugfix | 规范 `@` 文件搜索查询中的前导斜杠（`/`、`./`、`\`、`.\`），支持在 CLI 输入提示中使用 `@/` 或根相对路径进行自动补全。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29987) |
| #29993 | fix(ui): handle surrogate pairs when truncating | Bugfix | 修复 `sanitizeForDisplay` 在 UTF-16 代理对边界截断字符串时产生未配对代理的问题，避免 Emoji 等字符显示异常。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29993) |
| #29798 | fix(cli): restore approval focus after cancelling editor selection | Bugfix | 取消外部编辑器选择后恢复审批焦点，使用户可在不更改编辑器偏好或取消请求的情况下 Allow/Reject 编辑。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29798) |
| #29982 | fix(core): recognize dotted Gemini 3 models | Bugfix | 修复 `supportsMultimodalFunctionResponse()` 对带点号的 Gemini 3 模型名称识别缺失，确保多模态函数响应能力正确开启。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29982) |
| #29980 | feat(cli): add extension validation command | Feature | 新增 `gemini extensions validate <path>` 命令，用于在安装或发布前验证本地扩展配置，包括清单文件路径安全性检查。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29980) |
| #29904 | fix(cli): bound inline history re-render after terminal width changes | Performance | 限制终端宽度变更时内联历史重渲染的工作量，减少 resize 刷新产生的重复输出，提升终端交互流畅度。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29904) |
| #29965 | fix(cli): Fixes unexpected truncation in ExpandableText | Bugfix | 修复 `ExpandableText` 在 UTF-16 代理对边界截断时丢失补充字符（如 Emoji）的问题，确保 Unicode 完整性。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29965) |
| #29973 | fix(core): skip file writes after cancellation | Bugfix | 在文件读取取消后重新检查取消状态，防止 `replace` 或 `write_file` 操作在取消后仍覆盖目标文件或创建新文件。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29973) |

---

## 功能需求趋势

从近期 Issues 与 PR 中可观察到以下社区关注方向：

1. **子代理（Subagent）稳定性与可见性**：多个 P1/P2 Issue 指出子代理在达到轮次上限后状态报告错误、通用代理挂起、Bug 报告缺乏子代理上下文，以及子代理轨迹难以共享（`/chat share`）。社区亟需更可靠的子代理生命周期管理与可观测性。
2. **AST 感知的代码操作**：围绕 AST-aware 文件读取、搜索与代码库映射的 Issue 数量较多（如 #22745、#22746、#22747），社区希望通过更精确的代码结构感知降低 Token 消耗并提升导航效率。
3. **浏览器代理与跨平台兼容性**：Wayland 下的浏览器子代理失败、配置覆盖失效、会话锁恢复等问题表明，浏览器自动化模块在不同桌面环境下的稳定性仍是短板。
4. **扩展生态与安全验证**：新增扩展验证命令（`gemini extensions validate`）及研究模式示例扩展，显示社区正在推动扩展生态的标准化与安全门槛建设。
5. **终端 UI 与 Unicode 兼容性**：多个 PR 针对 Emoji/代理对截断、终端宽度变更重渲染、歧义宽度字符等问题进行修复，反映跨终端环境的 UI 一致性是持续改进点。

---

## 开发者关注点

- **高频痛点**：子代理挂起与状态误报（P1）、浏览器代理在 Wayland/Linux 下失效（P1）、输出钩子导致崩溃（P1）直接影响日常可用性，建议

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报
**日期：** 2026-10-28  
**数据来源：** github.com/esengine/DeepSeek-Reasonix

---

## 1. 今日速览

Reasonix 昨日发布 **v2.53.1 补丁版本**，主要修复了 2.53.0 中放大后设置窗口头部按钮不可点击的问题，并将语义路由用量纳入规划与执行的共享预算。社区围绕**多会话/子代理锁竞争**、**局域网远程能力增强**以及**代理权限与预算隔离**展开活跃讨论，@SivanCola 成为昨日最活跃的核心贡献者，多项与预算、启动、代理证明相关的修复 PR 获得合并。

---

## 2. 版本发布

### Reasonix Studio v2.53.1 / CLI v2.53.1
- **修复**：2.53.0 版本中，界面放大后设置窗口头部的收起、关闭、最小化、最大化按钮及搜索框无法点击的问题（#14596，修复于 #14597）。
- **优化**：语义路由用量在路由前即绑定根预算，计入规划与执行共享的软额度，同时保留缓存决定和任务边界（#14595，@SivanCola）。
- **链接**：[studio-v2.53.1 Release](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.53.1) | [CLI v2.53.1 Release](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.53.1)

> 补充：v2.53.0 此前已引入跨项目派发、厂商图标、壁纸场景图层、个人预设默认，并加固了配对设备、Git 读命令与项目配置的信任边界。

---

## 3. 社区热点 Issues（共 4 条更新）

| # | 标题 | 状态 | 核心内容 | 关注理由 | 链接 |
|---|------|------|----------|----------|------|
| #14025 | 多会话、多子代理问题 | OPEN | 用户反馈长任务/长会话下频繁出现锁竞争，一个会话锁定后其他会话死等，影响多子代理协作效率。 | 直接关系到 Reasonix 在多代理并发场景下的可用性，社区期待锁机制优化或分级开关。 | [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/14025) |
| #14675 | 局域网远程连接地址动态变化 | OPEN | 局域网远程能力每次连接地址都会改变，用户希望支持静态地址配置及开机自启。 | 远程开发是 Reasonix 的差异化能力，稳定性和可配置性是企业/团队落地的关键。 | [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/14675) |
| #14674 | 远程能力文件管理与会话转移 | OPEN | 远程 SSH 连接后缺乏 Win/Linux 文件管理（目录选择器），希望支持会话/工作区转移到远程机器。 | 提升远程开发体验，减少本地与远程机器切换成本，符合“远程优先”趋势。 | [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/14674) |
| #14573 | mapie 路由无法隐藏 group 信息 | CLOSED | 通过 mapie 路由大模型时，所有模型都显示 group\XXX 信息，无法隐藏。 | 涉及提供商路由的 UI 定制与隐私展示，已关闭，可参考其解决方案。 | [查看 Issue](https://github.com/esengine/DeepSeek-Reasonix/issues/14573) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #14677 | fix(agent): 文件模式变化时拒绝旧证明 | OPEN | 代理在文件权限变更后，拒绝复用基于旧文件字节的验证/签署证明，防止权限绕过。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14677) |
| #14615 | fix(studio): 统一远程项目移除与菜单交互 | OPEN | 远程目录即使断开连接也可从列表移除，保留主机、远程文件和会话历史，菜单交互统一。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14615) |
| #14676 | fix(boot): 保持环境探测快照前缀稳定 | OPEN | 修复跨进程 boot.Build 回归问题，确保环境快照有效时系统前缀不被意外更改。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14676) |
| #14631 | fix(control): 显式技能共享任务根预算 | CLOSED（已合并） | 让显式技能共享任务根预算，与主预算体系对齐。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14631) |
| #14671 | fix: 本地费用门禁采用权威报价 | CLOSED（已合并） | 本地成本门禁改用权威报价，提升预算控制准确性。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14671) |
| #14433 | perf: 合并事务等待观察并保留锁内准入 | OPEN | 合并同一进程内路径冲突等待事务的重复注册表观察，降低锁竞争开销。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14433) |
| #14228 | fix: 修复历史图片阻断文字对话及错误详情丢失 | OPEN | 历史消息含图片且图理解析模型不可用时，文字后续对话不再被阻断，图片降级为不可用标注。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14228) |
| #14659 | feat(installer): 彻底关闭运行中的 Studio 并说明原因 | OPEN | Windows 安装程序在无法停止占用进程时，给出明确原因并指导用户手动关闭后重试。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14659) |
| #14654 | feat(openwith): 说明已安装程序为何未在“打开方式”中提供 | OPEN | 当程序位于已知项目文件夹内时，因代理可写入风险被隐藏，现显示拒绝原因。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14654) |
| #14646 | feat: 新增会话管理视图（搜索、筛选、多选、批量删除） | OPEN | 侧边栏新增独立会话管理视图，支持按名称搜索、范围筛选、按项目筛选及二次确认批量删除。 | [查看 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/14646) |

---

## 5. 功能需求趋势

从 Issues 与 PR 中提炼，社区当前最关注的四个功能方向：

1. **多代理并发与锁机制优化**  
   长会话、多子代理协作场景下的锁竞争是最高频痛点，用户期待更细粒度的锁策略或效率/安全等级开关（#14025）。

2. **远程开发体验增强**  
   局域网远程连接的静态地址配置、开机自启、远程文件管理器（目录选择器）以及会话/工作区转移能力，成为远程办公场景下的核心需求（#14675、#14674）。

3. **代理权限与预算隔离**  
   文件模式变更后的证明失效、显式技能共享根预算、本地费用权威报价等，表明社区对代理执行边界、预算归属与安全隔离的要求在提升（#14677、#14631、#14671）。

4. **会话与项目管理便捷化**  
   会话管理视图、远程项目移除统一、安装程序进程处理等，反映用户希望在多项目、多会话环境下获得更好的组织与清理工具（#14646、#14615、#14659）。

---

## 6. 开发者关注点

- **锁竞争与长任务调度**：多会话/多子代理协作时，单个长任务锁定会导致其他会话阻塞，开发者呼吁提供锁等级切换或并发优化方案。
- **远程能力的“割裂感”**：SSH 连接建立后，文件浏览、目录选择、会话迁移仍需手动切换，缺乏可视化统一入口。
- **安装与升级体验**：Windows 下安装程序无法彻底关闭占用进程时，缺乏明确错误提示和恢复引导。
- **预算与成本透明度**：语义路由、代理执行等场景下的用量计入规则需要更清晰，本地费用门禁需基于权威报价以避免预算超支。

---

**报告生成时间：** 2026-10-28  
**数据覆盖范围：** 2026-10-27 至 2026-10-28 的 GitHub 仓库活动

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-10-28)

## 今日速览

OpenCode 发布 **v2.2.0**，引入实验性的 Desktop 插件系统，标志着桌面端可扩展性迈出重要一步。社区今日围绕 **MCP 资源泄漏、SQLite 磁盘满导致的工具卡死、CLI 管道输出截断** 等核心稳定性问题展开热烈讨论，同时 TUI 键盘协议兼容性和子代理交互模式成为功能改进的焦点。

---

## 版本发布

### v2.2.0
**主要更新：**
- **Desktop 插件（实验性）**：支持创建、安装和分享桌面端插件，扩展 OpenCode Desktop 的 GUI 扩展能力（PR #55246、#59469、#59489）

[查看完整 Release 详情](https://github.com/anomalyco/opencode/releases/tag/v2.2.0)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #52965 | Duplicate MCP servers accumulate under one opencode process (~6GB RAM) | 单进程下重复 MCP 服务器未被回收，Windows 上出现 5×mcp-reva、30+node.exe，内存占用高达 6.3GB | 5 条评论，资源泄漏问题引发关注 | [链接](https://github.com/anomalyco/opencode/issues/52965) |
| #52796 | core: tool stuck in pending state when hitting SQLITE full errors | SQLite 磁盘满时工具步骤仍正常结束，导致后续请求缺少 `tool_result`，被 Anthropic 拒绝 | 7 条评论，核心稳定性 Bug | [链接](https://github.com/anomalyco/opencode/issues/52796) |
| #52925 | cli: "api get" truncates stdout when it is a pipe | 管道输出被截断导致 JSON 无效，`opencode api get ... \| jq` 场景失效 | 7 条评论，CLI 可用性问题 | [链接](https://github.com/anomalyco/opencode/issues/52925) |
| #52941 | desktop: file tree and preview pane show stale file contents after agent edits | 代理编辑文件后，桌面端文件树和预览面板未刷新，显示过期内容 | 7 条评论，桌面端 UI 同步缺陷 | [链接](https://github.com/anomalyco/opencode/issues/52941) |
| #52894 | [FEATURE]: Show exact free usage limit reset time | 免费额度耗尽时仅显示模糊提示，用户希望精确显示重置时间 | 9 条评论，6 👍，用户体验改进需求 | [链接](https://github.com/anomalyco/opencode/issues/52894) |
| #43132 | [FEATURE]: Plugin UI surface for the web/desktop app, mirroring the TUI plugin API | 希望 Web/Desktop 端提供与 TUI 等同的插件 UI 能力（keymap、dialog、slot 等） | 5 条评论，16 👍，插件生态扩展的高赞需求 | [链接](https://github.com/anomalyco/opencode/issues/43132) |
| #56352 | Bug: reasoning_content is replayed in the request history | 模型 `reasoning_content` 被持久化并回传至后续请求，违反 DeepSeek 等模型 API 规范，导致工具调用标记泄露 | 3 条评论，涉及推理模型兼容性与隐私 | [链接](https://github.com/anomalyco/opencode/issues/56352) |
| #52953 | snapshot: fails on git < 2.45 — unknown option 'sparse' | `git add --all --sparse` 要求 Git ≥2.45，旧版 Git 环境下快照/检查点功能失效 | 5 条评论，向下兼容性问题 | [链接](https://github.com/anomalyco/opencode/issues/52953) |
| #52846 | permission: pending requests destroyed on instance disposal without revocation event | 实例销毁时未发送 `permission.replied` 事件，导致权限对话无法响应并永久返回 404 | 5 条评论，权限流程缺陷 | [链接](https://github.com/anomalyco/opencode/issues/52846) |
| #52795 | [FEATURE]: Subagents should ask questions to the parent session, not to the user | 子代理（task）使用 `question` 工具会直接打断用户，建议改为向父会话提问 | 5 条评论，多代理架构设计讨论 | [链接](https://github.com/anomalyco/opencode/issues/52795) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #59770 | fix(tui): navigate the transcript with keypad Home and End | OPEN | 修复 Kitty 键盘协议下 TUI 数字小键盘 Home/End 无法导航转录记录的问题，关联 #55533 | [链接](https://github.com/anomalyco/opencode/pull/59770) |
| #58292 | feat(ui): add gallery navigation to image preview | OPEN (Draft) | Web 端图片预览增加画廊导航，支持多图片浏览，对应功能请求 #58295 | [链接](https://github.com/anomalyco/opencode/pull/58292) |
| #59437 | feat(core): add /goal with a client-side done check | OPEN | 新增 `/goal` 命令，采用客户端完成检查而非新增服务器事件，替代方案对比 #58508 | [链接](https://github.com/anomalyco/opencode/pull/59437) |
| #59403 | refactor(nix): fetch dependencies from bun.lock | OPEN | 从 `bun.lock` 获取 Nix 依赖，替代维护平台特定的 `node_modules` 哈希，关联 #49063 | [链接](https://github.com/anomalyco/opencode/pull/59403) |
| #59630 | chore: upgrade effect to 4.0.6 | OPEN | 升级 Effect 库至 4.0.6，修复 SQLite snowflake ID 舍入问题 | [链接](https://github.com/anomalyco/opencode/pull/59630) |
| #59765 | feat(ai): make provider model() settings optional and add Config type everywhere | OPEN | 统一 Provider 的 `model()` 设置为可选，规范化 `Config` 类型，改善类型安全性 | [链接](https://github.com/anomalyco/opencode/pull/59765) |
| #59763 | chore(deps): bump zod to 4.6.7 | OPEN | 将根工作区 Zod 从 4.1.8 升级至 4.6.7，锁文件去重嵌套副本 | [链接](https://github.com/anomalyco/opencode/pull/59763) |
| #59463 | fix(codemode): fail fast instead of hanging when a script awaits a promise that can never settle | CLOSED | Code Mode 脚本若等待永不 resolve 的 Promise 会导致会话卡死，现改为快速失败 | [链接](https://github.com/anomalyco/opencode/pull/59463) |
| #59761 | fix(update): only apply minimum versions on stable channels | CLOSED | 修复 `selectArtifacts` 在 dev/beta 频道错误应用最小版本限制的问题 | [链接](https://github.com/anomalyco/opencode/pull/59761) |
| #55983 | feat(core): add subagent concurrency limit | OPEN | 新增 `experimental.subagent_concurrency`，限制子代理并发执行数量，关联 #27110 | [链接](https://github.com/anomalyco/opencode/pull/55983) |

---

## 功能需求趋势

从近 24 小时的 Issues 和 PR 中，社区关注点呈现以下明显趋势：

1. **插件生态与 UI 扩展**：v2.2.0 发布 Desktop 插件后，社区积极推动 Web/Desktop 端与 TUI 插件 API 对齐（#43132），并探索子代理并发控制（#55983）、目标完成检查（#59437）等可编程能力。
2. **MCP 与外部工具稳定性**：MCP 服务器进程泄漏（#52965）、资源目录缓存（#52852）、HTTP 429 退避（#52854）等问题集中暴露，说明 MCP 集成的资源管理仍需加强。
3. **TUI 与终端兼容性**：Kitty 键盘协议下的按键映射（#55533、#59770）、NumPad 导航、透明主题下的文本可见性（#52832）等终端适配问题持续出现。
4. **模型与推理内容处理**：`reasoning_content` 回传泄露（#56352）、模型限额配置失效（#53005）、并发会话模型切换（#52805）等反映用户对多模型、推理模型支持的要求日益提高。
5. **桌面端体验**：文件树/预览刷新（#52941）、图片画廊导航（#58295/#58292）、空闲 CPU 占用（#52927）等桌面端细节问题成为改进重点。

---

## 开发者关注点（痛点与高频需求）

- **资源泄漏与内存**：MCP 服务器进程未回收导致内存飙升（#52965）是当前最严重的稳定性隐患之一，开发者期望尽快提供进程回收机制。
- **核心流程鲁棒性**：SQLite 磁盘满（#52796）、权限请求销毁无事件（#52846）、CLI 管道输出截断（#52925）等基础设施层 Bug 直接影响日常可用性。
- **向下兼容性**：Git 版本低于 2.45 的环境下快照功能失效（#52953），开发者希望在旧环境中也能优雅降级。
- **子代理交互模型**：子代理不应直接向用户提问，而应通过父会话中转（#52795），这涉及多代理架构的设计规范。
- **配置与类型体系**：Provider 配置类型不统一（#59765）、模型限额字段填写后提供商消失（#53005），

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-10-28)

## 今日速览

本周 Hermes 社区围绕**跨端会话恢复（session.resume）**与**多端身份隔离**展开密集讨论，桌面端、TUI、移动端及 Webapp 之间的会话互通性成为最高优先级的 Bug 修复方向。与此同时，网关在高负载下的超时、资源竞争以及 Windows ARM64 构建等平台适配问题也引发开发者关注。过去 24 小时无新版本发布，但多个核心修复 PR 已提交并等待审核。

## 版本发布

过去 24 小时内无新版本 Release。

## 社区热点 Issues

以下 10 个 Issue 按社区关注度与影响范围筛选，涵盖会话恢复、跨端访问、性能与平台适配等核心领域：

| # | 标题 | 核心内容 | 为何重要 | 社区反应 | 链接 |
|---|------|---------|---------|---------|------|
| #139818 | Remote-backend desktop sessions unresumable from local desktop | 远程后台桌面会话在本地桌面无法恢复，`session.resume` 返回 `not_found` | 直接影响远程桌面场景的核心体验，已持续 10+ 天未解决 | 24 条评论，讨论活跃，P2 优先级 | [查看](https://github.com/NousResearch/hermes-agent/issues/139818) |
| #144814 | session.resume 4001 not_found: sessions created by hermes-mobile can never be resumed by native Desktop | 移动端创建的会话在桌面端显示但无法打开，渲染器报 `not_found` | 暴露了移动端与桌面端会话源标识不一致的根本问题 | 7 条评论，1 👍，多端用户反馈强烈 | [查看](https://github.com/NousResearch/hermes-agent/issues/144814) |
| #112028 | Support multi-surface access to the same session (desktop + mobile dashboard) | 桌面端与移动端仪表盘无法访问同一会话，服务器拒绝第二个表面提交消息 | 社区长期期待的多端同步功能，涉及会话架构设计 | 8 条评论，需决策，P2 | [查看](https://github.com/NousResearch/hermes-agent/issues/112028) |
| #144140 | Dashboard lists serve/Desktop sessions it cannot open | 仪表盘侧边栏列出会话但点击后返回 `not_found`，转录为空 | 影响仪表盘作为统一入口的可用性，与 #144814 同属会话可见性问题 | 4 条评论，1 👍 | [查看](https://github.com/NousResearch/hermes-agent/issues/144140) |
| #143907 | Desktop-app chat cannot be resumed from terminal TUI | 桌面端聊天无法从终端 TUI 恢复，未路由的登录戳记行返回 `not_found`，绑定戳记行返回 `permission_denied` | 暴露了不同客户端登录模式下的权限与路由不一致 | 3 条评论，1 👍，涉及 v0.22.5 | [查看](https://github.com/NousResearch/hermes-agent/issues/143907) |
| #143561 | Gateway: /api/status, tickets and session.resume time out on a loaded host | 高负载主机下网关状态、票据和会话恢复超时（30s），约 200 网关线程 | 性能瓶颈，直接影响繁忙主机上的可用性，已有补丁提交 | 5 条评论，已关闭，P2 | [查看](https://github.com/NousResearch/hermes-agent/issues/143561) |
| #143256 | hosted-room driver runs one 5s supervisor thread per multiplexed profile | 每个服务配置文件都运行独立的 5s 监督线程，即使没有房间也轮询，耗尽读取池 | 多租户/多配置文件场景下的资源浪费与事件循环饥饿 | 4 条评论，P2，性能隐患明显 | [查看](https://github.com/NousResearch/hermes-agent/issues/143256) |
| #145762 | Desktop profile=all session and sidebar fan-out issues | 29 个配置文件时桌面端开启 107 个 TCP 连接，207 线程，650 文件描述符，空载 CPU 25-60% | 桌面端在多配置文件场景下的资源占用异常，影响启动与空载表现 | 1 条评论，P2，MaverickKB 反馈 | [查看](https://github.com/NousResearch/hermes-agent/issues/145762) |
| #145723 | Windows ARM64 setup compiles OpenSSL with GNU clang.exe and MSVC switches | Windows ARM64 上 OpenSSL 构建使用 GNU clang.exe 但传递 MSVC 参数，导致编译失败 | 平台适配问题，阻碍 Windows ARM64 用户安装 | 3 条评论，P2，新报告 | [查看](https://github.com/NousResearch/hermes-agent/issues/145723) |
| #145074 | One person, several logins: chats are walled off between their own sessions | 同一人通过多种登录方式（基本认证、本地对等、SSO）导致聊天历史相互不可见 | 身份链接缺失，影响单用户多设备/多入口的体验 | 2 条评论，1 👍，P2 | [查看](https://github.com/NousResearch/hermes-agent/issues/145074) |

## 重要 PR 进展

以下 10 个 PR 代表了当前社区与核心维护者的主要代码变更方向：

| # | 标题 | 类型 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #145764 | feat(plugin-catalog): add GitHub Mentions | Feature | 插件目录新增社区提交的 `hermes-github-mentions` 插件 v0.4.3，允许经批准的 GitHub 用户在 Issue/PR 中提及专用机器人 | [查看](https://github.com/NousResearch/hermes-agent/pull/145764) |
| #144840 | fix(gateway): after a chat's /new, Desktop view of old conversation keeps working | Bug | 修复会话切换（`/new`、`/resume`、`/branch` 等）后，桌面/Webapp/移动端对旧会话的视图仍可正常操作，但回复不再误送至新会话 | [查看](https://github.com/NousResearch/hermes-agent/pull/144840) |
| #145598 | The Webapp is you on your machine: sessions and Group Chats match native Desktop | Security/Auth | Webapp 标签页现在以机器所有者身份运行，其聊天和群聊与原生桌面端及 TUI 共享同一网关路由和 `hermes serve` 路由 | [查看](https://github.com/NousResearch/hermes-agent/pull/145598) |
| #145644 | fix(desktop): New session reuses the blank draft tab instead of opening another | Bug | 修复 Webapp 中重复点击“新建会话”会产生无限草稿标签页的问题，现改为复用/导航至单个待处理对话 | [查看](https://github.com/NousResearch/hermes-agent/pull/145644) |
| #145572 | fix(webapp): keep session shortcuts clear of browser commands | Bug | 修复 Webapp 中 ⌘N/⌘T/⌘W 等快捷键被浏览器拦截的问题，确保 Hermes 的新建会话、标签页切换等快捷键正常生效 | [查看](https://github.com/NousResearch/hermes-agent/pull/145572) |
| #145753 | fix(pm): a launcher waiting on a reclaimed install state's lock retries on the live file | Bug | 修复安装状态锁竞争条件，避免两个安装程序在同一状态下并发运行 | [查看](https://github.com/NousResearch/hermes-agent/pull/145753) |
| #145722 | fix: honor longer Discord prompt timeouts and retire settled approval cards | Bug | 提升 Discord 提示超时上限至平台安全最大值，保留一小时 UI 超时设置，并清理已结算的审批卡片 | [查看](https://github.com/NousResearch/hermes-agent/pull/145722) |
| #145364 | fix(tests): run_tests.sh under a faked HOME provisions from the account's tool store | CI/Tests | 测试脚本在模拟 HOME 环境下从账户现有工具存储预置测试环境，避免每次携带 1.5 GB / 13.8k 文件的工具链副本 | [查看](https://github.com/NousResearch/hermes-agent/pull/145364) |
| #145766 | fix(delegation): a served profile session resolves the launch home's registered backends | Bug | 修复多主机网关中会话解析启动主机注册后端的范围写入/读取不匹配问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/145766) |
| #145670 | feat(skills): add optional 0xArchive backtesting workflow | Feature | 新增可选的 `0xarchive-backtest` 金融技能，支持可复现的交易研究与回测工作流 | [查看](https://github.com/NousResearch/hermes-agent/pull/145670) |

## 功能需求趋势

从近 24 小时更新的 27 个 Issue 中，社区关注点呈现以下明显趋势：

1. **跨端会话互通与身份统一**：多个 Issue（#139818、#144814、#112028、#144140、#145074）集中反映桌面端、移动端、TUI 与 Webapp 之间会话无法无缝恢复、同一用户多登录方式导致历史隔离。这表明“多端同步”与“身份链接”是社区最迫切的功能需求。
2. **网关性能与资源控制**：#143561、#143256、#145762 指向高负载下的超时、线程/文件描述符耗尽以及多配置文件场景下的资源爆炸，开发者对网关在多租户/多配置文件环境下的稳定性要求提高。
3. **平台适配与构建稳定性**：#145723（Windows ARM64 OpenSSL 编译）显示非 x86 平台支持仍有缺口，跨平台构建可靠性成为安装与部署环节的痛点。
4. **桌面端细节体验

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-10-28)

## 今日速览

OpenClaw 今日发布了 v2026.10.10-beta.4 与 v2026.10.8 两个版本，重点修复了自动化调度权限保留、更新恢复机制及 Gateway 启动阻塞等问题。社区围绕更新停机、插件迁移死锁、事件循环阻塞及多 Agent 路由等核心稳定性议题展开活跃讨论，共 11 个 Issue 和 20 个高活跃 PR 在过去 24 小时内更新。

---

## 版本发布

### v2026.10.10-beta.4
- **Automations**：保留显式同一会话计划跟进的经过身份验证的操作员权限，包括一次性 `next_check` 重新武装，同时保留角色、会话、取消、目标和工具策略撤销边界。
- [查看 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.10.10-beta.4)

### v2026.10.8
- **更新恢复机制**：普通的 post-update Doctor 失败现在会重启 Gateway，而非使其停止；孤立的维护 worker 不再阻塞所有 CLI 命令和 Gateway 启动；更新不再在 ACL 文件系统、Windows 等环境中中止。
- [查看 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.10.8)

### v2026.9.35 (extended-stable / LTS 等价版本)
- 网关专用长期支持版本，包含 2026 年 9 月底的 OpenClaw 代码，并附带关键安全更新、可靠性与性能修复以及新模型支持。
- [查看 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.35)

---

## 社区热点 Issues

| # | 标题 | 优先级/标签 | 核心问题 | 链接 |
|---|------|------------|---------|------|
| #161921 | state-migrated-no-rollback 后，doctor --fix 与插件更新互相阻塞 | P0, ux-release-blocker | 插件数据迁移与插件更新形成死锁，`plugins update` 要求先运行 `doctor --fix`，而 `doctor --fix` 在网关停止时因插件占用拒绝执行，导致插件停留在旧版本。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/161921) |
| #121823 | 内存核心“梦境提升”任务阻塞事件循环 | P1, crash-loop | 夜间任务在主线程执行同步 SQLite 写入与评分，导致 healthz 失响、日志刷新停止，原生文件系统阻塞数分钟，FUSE 状态下超过 90 分钟。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/121823) |
| #181662 | npm 更新期间网关停止约 19 分钟 | P2, crash-loop | Ubuntu 24.04 上 `openclaw update` 的 `activating` 阶段导致网关长时间停机，且每次发布停机时间递增。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/181662) |
| #184720 | Windows 中断更新修复留下空 Doctor 托管收据 | P1, ux-friction | 两次受 Doctor 截止时间中断的 `update repair` 返回 `doctor-processes-unsettled`，收据文件无法提供可操作的结算流程，网关需保持停止状态。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/184720) |
| #119455 | cron 工具添加：空字段断言在归一化前运行 | P1, message-loss | schema-eager 模型填充空字符串等垃圾默认值，导致不可能的触发器被转发，用户无法创建提醒。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/119455) |
| #121921 | Feishu 入场提及在 #93522 后再次级联回复 | P1, message-loss, regression | Feishu `mentionTargets` 自动附加到普通和错误回复，重现了之前由 #71396 修复的多机器人提及级联问题。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/121921) |
| #186392 | iOS 分享带图片在多 Agent 网关上失败 | P1, message-loss | `agents.ownership: "explicit"` 下，iOS 共享扩展携带图片时因 `agent.request` 从原始会话键解析 Agent，抛出 `AGENT_SELECTION_REQUIRED`。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/186392) |
| #143946 | Web Push“Agent 完成”通知无法归因到会话 | P2, ux-friction (已关闭) | `agent-finished` 类别的 Web Push 通知始终渲染为通用正文，多会话下无法区分。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/143946) |
| #183287 | 空闲看门狗：允许提供商将 loopback baseUrl 声明为远程 | P2, auth-provider (已关闭) | 本地中继（日志、审计、缓存）位于托管 API 前时，主机名判断逻辑误将其视为本地模型服务器。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/183287) |
| #186029 | 全局审批模态框省略来源会话和项目 | P2, ux-friction (已关闭) | 审查者看到 Agent、命令和目录，但必须打开 Details 才能找到原始会话键，影响多会话审批效率。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/186029) |

**社区反应总览**：P0 与 P1 级 Issue 集中在更新流程、插件生命周期和跨平台（Windows/iOS）兼容性上，多个 Issue 标记为 `clawsweeper:needs-maintainer-review`，表明维护者介入需求迫切；已关闭的 Issue 多为 UX 摩擦类，反映社区对操作透明度的持续关注。

---

## 重要 PR 进展

| # | 标题 | 类型/优先级 | 主要内容 | 链接 |
|---|------|------------|---------|------|
| #186338 | fix: 保持会话提示在延续轮次中稳定 | docs/gateway/agents, P2 | 解决本地模型对话在 CLI 延续或计划延续替换自动化架构时丢失可复用提示前缀的问题。 | [查看 PR](https://github.com/openclaw/openclaw/pull/186338) |
| #186390 | fix(agents): 将共享 TPM 重试窗口保留在单调时钟 | agents, P2 | 将 15 秒重试窗口从 `Date.now()`（墙时钟）迁移至单调时钟，防止 NTP 校正或 VM 暂停导致速率限制预算损坏。 | [查看 PR](https://github.com/openclaw/openclaw/pull/186390) |
| #185730 | refactor: 优雅重启后恢复运行中的会话 | docs/app/web-ui/gateway/cli..., XL | 解决优雅重启等待繁忙 Agent 工作数秒，随后通过竞争恢复所有者重建执行，并阻塞新用户输入的问题。 | [查看 PR](https://github.com/openclaw/openclaw/pull/185730) |
| #185915 | fix(claude-cli): 排队输入到达时保留完成上下文 | docs/gateway/scripts/agents, P2 | 修复 Claude 支持的会话在父级忙碌时丢失子完成上下文，或将 OpenClaw 供应的上下文误记为用户输入的问题。 | [查看 PR](https://github.com/openclaw/openclaw/pull/185915) |
| #186395 | fix(agents): personal_instructions 在网关工具策略列出其操作时每轮失败 | agents, XS | 当 `tools.gatewayPolicy` 允许 `personal_instructions` 带操作列表时，每轮 Agent 失败，现已修复。 | [查看 PR](https://github.com/openclaw/openclaw/pull/186395) |
| #186394 | perf(workboard): 跨轮次复用静态工具架构 | scripts, L | Workboard 启用时每轮 Agent 重建 32 个不变工具架构，现通过描述符发布缓存避免重复投影、哈希和提供商预热。 | [查看 PR](https://github.com/openclaw/openclaw/pull/186394) |
| #186376 | fix(ui): 按会话选定的运行时判断作曲家模型可用性 | app: web-ui, P2 | 修复作曲家的运行时盲凭据横幅，支持 OpenClaw API 路由与原生 `clau...` 等多运行时路由。 | [查看 PR](https://github.com/openclaw/openclaw/pull/186376) |
| #186391 | fix(ui): Agent 面板中断原生移动聊天 | app: web-ui, P2 | 修复工具呈现面板或会话获得自动资源时，原生 iOS/Android 聊天被中断的问题。 | [查看 PR](https://github.com/openclaw/openclaw/pull/186391) |
| #186327 | fix: ClawRouter 主机在 utilityModel 未设置时无实用模型 | docs/gateway/scripts/commands/agents, P2 | 修复通过 ClawRouter 运行的主模型下，作曲家预测、生成标题、进度叙述等无实用模型的问题。 | [查看 PR](https://github.com/openclaw/openclaw/pull/186327) |
| #186389 | perf(gateway): 复用祖先子贡献 | gateway/scripts/agents, P2 | 优化进度事件广播，避免父级 500 子级 × 20 查看器产生 10,040 次成员读取，降低主线程开销。 | [查看 PR](https://github.com/openclaw/openclaw/pull/186389) |

---

## 功能需求趋势

从近期 Issues 与 PR 中提炼，社区最关注的功能方向包括：

1. **更新与网关可用性**：减少 `npm update` 期间的网关停机时间（#181662）、改进中断后的修复与托管收据流程（#184720）、优雅重启后的会话恢复（#

:::
