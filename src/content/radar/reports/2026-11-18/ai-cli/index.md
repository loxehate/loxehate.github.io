---
title: "AI CLI 工具社区动态日报"
published: 2026-11-18
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-18

> 生成时间: 2026-11-18 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-18)

## 1. 生态全景

当前 AI CLI 工具正处于从“单一对话助手”向“企业级开发平台”的关键转型期。各主流工具普遍进入稳定性补丁与安全加固阶段，重点聚焦会话状态一致性、跨平台兼容性及 MCP/插件生态的企业级可用性。模型行为回归（如代码块丢失、幻觉调用）与本地执行安全（破坏性命令防护、令牌泄露）成为社区共同的高优先级痛点。整体呈现“功能扩张放缓、基础设施夯实”的成熟化迹象，但跨端同步与国际化仍是普遍短板。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 近24h Issues | 近24h PR | 最新 Release | 核心动态特征 |
|------|------|-------------|---------|-------------|-------------|
| **Claude Code** | anthropics/claude-code | ~50条（列出10条热点） | 0条 | v2.1.327（小版本，安全增强） | Issue 讨论活跃，PR 停滞；侧重安全与企业协作 |
| **OpenAI Codex** | openai/codex | 10条热点（评论1-59条） | 多条（以 copyberry[bot] 自动化为主） | rust-v0.169.1 / 多个 Alpha 版 | Windows 稳定性问题集中爆发；后端审计与企业 SSO 持续迭代 |
| **Gemini CLI** | google-gemini/gemini-cli | 10条热点（P1/P2 级） | 10条（OPEN/CLOSED 混合） | 无新版本 | 子代理稳定性与工具调用安全为核心；PR 修复频繁 |
| **DeepSeek Reasonix** | esengine/DeepSeek-Reasonix | 0条 | 0条 | 无 | 过去24小时无任何社区活动 |
| **OpenCode** | anomalyco/opencode | 10条热点（OPEN/CLOSED 混合） | 50条 | v1.19.6（Desktop，OpenCode 2.0 升级通道） | PR 活跃度最高；桌面端与远程开发体验为重点 |
| **Deepseek Harness** | deepseek-ai/deepseek-harness | 0条 | 0条 | dsh-v0.2.2-rc.4 | 仅发布候选版本，无 Issue/PR 更新 |
| **Hermes** | NousResearch/hermes-agent | 10条热点 | 10条 | v0.23.2+canary（2026-11-17） | 网关性能瓶颈与桌面端卡顿突出；新模型支持快速跟进 |
| **OpenClaw** | openclaw/openclaw | 10条热点（P0-P2） | 10条 | v2026.11.5（稳定版） | 更新回滚与会话状态损坏为 P0/P1 阻塞级问题 |

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重合的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **跨端/跨平台会话同步** | Claude Code、OpenAI Codex、OpenCode | 会话 ID 打通、云端与本地项目清单一致性、桌面端与移动端消息实时送达 |
| **模型行为稳定性与可信度** | Claude Code、Gemini CLI | Opus 5.5 代码块丢失/幻觉、子代理虚假报告成功、通用代理无限挂起 |
| **本地执行安全与权限控制** | Claude Code、Gemini CLI、OpenClaw | MCP 令牌不暴露命令行、破坏性命令（git reset --force）拦截、YOLO 模式污点检查 |
| **国际化与文本渲染** | Claude Code、OpenCode | RTL 文本支持（阿拉伯/希伯来）、CJK/emoji 宽度计算与截断、多语言 UI 缺失键 |
| **SSH/远程开发体验** | OpenCode、OpenClaw | 远程服务安装进度显示、端口占用恢复、SSH 连接错误定位不准 |
| **MCP/插件生态稳定性** | Claude Code、Gemini CLI、Hermes | MCP 工具过滤解析、企业 IdP 登录无刷新令牌、插件扫描误报 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 企业协作、GitHub 深度集成、MCP 安全配置 | 企业开发团队、重度 GitHub 用户 | 以 Anthropic 模型为核心，强调令牌安全与多账户 Connector 切换 |
| **OpenAI Codex** | Computer Use、跨端同步、企业 SSO/Guardian 审计 | OpenAI 生态用户、Windows 桌面开发者 | Rust 后端为主，Alpha 版本频繁发布，侧重多模态输入与本地沙箱执行 |
| **Gemini CLI** | 子代理编排、AST 感知代码理解、Shell 跨平台兼容 | AI 原生代码助手用户、复杂代码库开发者 | 强调工具调用安全策略引擎，AST 与代码映射为差异化技术路线 |
| **OpenCode** | 桌面端 2.0 升级、远程浏览器侧边栏、Code Mode Rust 移植 | 桌面端 AI IDE 用户、跨语言嵌入式开发者 | 支持 Bun/Rust 双运行时，主打“已登录浏览器 + 本地 Agent”融合工作流 |
| **Hermes** | 网关会话管理、Telegram/Discord 多渠道、GPT-6.2 等前沿模型 | 多渠道机器人开发者、长上下文压缩场景 | Python 网关架构，关注 state.db 锁竞争与会话生命周期管理 |
| **OpenClaw** | 更新回滚、重启安全对话、多渠道（Telegram/Discord）会话准入 | 稳定性优先的团队、多渠道部署用户 | 强调 Doctor 自动修复与更新失败回滚，侧重基础设施可靠性 |
| **DeepSeek Reasonix / Harness** | （近24h 无活动，难以判断当前定位） | — | — |

## 5. 社区热度与成熟度

- **最活跃**：OpenCode（50 条 PR 更新，v1.19.6 正式版发布）、Claude Code（50 条 Issue 讨论，社区参与度高，单条 Issue 点赞超 480）。
- **快速迭代**：OpenAI Codex（多个 Rust Alpha 版本连续发布，但生产环境建议谨慎）、Hermes（Canary 版本频繁推送，新模型支持快速跟进）。
- **稳定维护**：Gemini CLI（无新版本，但 PR 修复持续，聚焦 P1/P2 Bug）、OpenClaw（v2026.11.5 稳定版，引入重启安全与自动回滚，成熟度较高）。
- **低活跃/停滞**：DeepSeek Reasonix（24 小时无任何活动）、Deepseek Harness（仅 rc 候选版本，无 Issue/PR）。

## 6. 值得关注的趋势信号

1. **安全即功能**：令牌不经命令行传递（Claude Code MCP stdin 读取）、破坏性命令拦截（Gemini CLI）、更新自动回滚（OpenClaw）表明，AI CLI 工具的安全边界正从“可选特性”升级为“核心功能”，企业采购决策将更看重安全合规能力。

2. **会话状态一致性成为基础设施**：多工具均出现会话丢失、云端本地不一致、恢复失败等问题，说明跨端会话同步已从“锦上添花”变成“标准配置”，开发者选型时应重点评估其会话持久化与恢复机制。

3. **模型行为回归影响可信度**：Opus 5.5 代码块丢失、子代理虚假成功等反馈集中爆发，提示模型版本升级与 CLI 工具适配存在滞后，开发者在生产环境引入新模型前需建立回归测试机制。

4. **桌面端 AI IDE 趋向浏览器化**：OpenCode 的“已登录浏览器侧边栏”、Codex 的 Computer Use 截图捕获，显示 CLI 工具正在向“本地终端 + 远程浏览器”混合形态演进，跨端协作将是下一波竞争焦点。

5. **国际化仍是普遍短板**：RTL 支持、CJK 截断、语言包缺失键在多个工具中反复出现，非英语市场的本地化体验尚未跟上功能迭代，面向全球用户的工具需额外投入 i18n 适配。

**决策建议**：若追求企业级稳定性与安全合规，优先考虑 OpenClaw 和 Claude Code；若需要前沿模型支持与快速迭代，关注 OpenAI Codex 和 Hermes；若侧重桌面端集成与远程开发，OpenCode 是当前活跃度最高的选择；DeepSeek 系列工具因社区活动停滞，短期内不建议作为核心依赖。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-18）

## 1. 热门 Skills 排行

基于仓库 PR 活跃度与更新频率，以下为社区关注度最高的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 `fix(mcp-builder)` | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入变更及自定义 HTTP 头配置不兼容问题 | MCP 协议版本迭代导致官方 Skill 失效，社区急需兼容性修复以保障 MCP 工具链可用性 | OPEN | [#1742](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 `fix(skill-creator)` | 隔离触发器评估（trigger evals），修复 Windows 子进程管道及运行时失败误报 | Skill 创建与评估流程的稳定性是社区核心痛点，跨平台兼容性受广泛关注 | OPEN | [#1298](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 `Add notion-spec-to-implementation...` | 新增 Notion 规格转实现技能与定量简历审计技能 | 企业级文档转代码与简历自动化审计场景需求强烈，代表向业务垂直领域延伸 | OPEN | [#1245](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1980 `webapp-testing` | 移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用测试 Skill 的安全性问题引发社区高度关注，安全加固成为优先级 | OPEN | [#1980](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 `fix(docx)` | DOCX 技能中将 LibreOffice 超时上报为错误，并验证输出文档无修订痕迹 | 文档自动化处理的可靠性与错误处理机制是社区关注重点 | OPEN | [#1792](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 `feat(skills): proofcore-contract-auditor` | 新增智能合约公证技能，对 Solidity/Rust 合约进行静态分析并将审计证明锚定至 TON 区块链 | Web3/区块链安全审计进入 Claude Code Skills 生态，体现垂直领域扩展趋势 | OPEN | [#1771](https://github.com/anthropics/skills/pull/1771) |
| 7 | #1703 `Add md2video-audio skill` | 将 Markdown 文档零成本编译为带人声旁白的 MP4 视频 | 内容多模态生成（文档→视频）是社区创意方向的热门探索 | OPEN | [#1703](https://github.com/anthropics/skills/pull/1703) |
| 8 | #525 `Add pyxel skill` | 新增 Python 复古游戏开发技能，涵盖实现、头less 运行、帧检查与状态验证 | 游戏开发等娱乐/创意类 Skill 获得长期关注，更新持续至 11 月 | OPEN | [#525](https://github.com/anthropics/skills/pull/525) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进方向如下：

1. **安全与信任边界**  
   Issue #492 指出社区 Skills 冒用 `anthropic/` 命名空间，导致信任边界被滥用。社区强烈要求建立 Skill 来源验证与命名空间隔离机制，防止用户误将社区 Skill 当作官方 Skill 授予高权限。

2. **组织内技能共享**  
   Issue #228 呼吁在 Claude.ai 中实现组织级 Skill 共享，避免当前需手动下载 `.skill` 文件并通过 Slack/Teams 传递的低效协作方式。

3. **Skill 触发与评估可靠性**  
   Issue #556、#1352 反映 `run_eval.py` 触发率异常（0% 触发、并行 worker 导致 UUID 交叉匹配），社区期待修复 Skill 触发检测与评估流程，确保自动化评测结果准确。

4. **文档与办公自动化**  
   Issue #1487（claude-api 注入 156k token 耗尽上下文）、#189（document-skills 与 example-skills 重复安装）、#2064（theme-factory 描述不明确）等，反映社区对文档类 Skill 的性能优化、去重与使用场景说明有明确需求。

5. **跨平台与工具链稳定性**  
   Issue #1298、#62 涉及 Windows 兼容性、Skill 丢失后的错误恢复，表明社区希望 Skill 创建器在不同操作系统上表现一致，并具备更好的状态管理。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，且功能切合社区痛点，大概率在近期落地：

- **#1742 `fix(mcp-builder)`**  
  MCP 协议 v2 兼容性修复，直接影响所有使用 MCP 连接的 Skill 可用性，修复窗口期短，合并优先级极高。  
  [链接](https://github.com/anthropics/skills/pull/1742)

- **#1298 `fix(skill-creator): isolate trigger evals...`**  
  触发器评估隔离与跨平台修复，解决 Skill 开发者最核心的调试痛点，社区讨论持续数月。  
  [链接](https://github.com/anthropics/skills/pull/1298)

- **#1980 `webapp-testing: avoid shell=True...`**  
  涉及 CWE-78 命令注入安全漏洞，属于安全类修复，通常会被快速审核合并。  
  [链接](https://github.com/anthropics/skills/pull/1980)

- **#1245 `Add notion-spec-to-implementation...`**  
  功能完整且切中企业知识管理场景，社区关注度持续较高，具备较强落地潜力。  
  [链接](https://github.com/anthropics/skills/pull/1245)

- **#1792 `fix(docx): report LibreOffice timeout...`**  
  文档处理可靠性修复，改进错误上报与输出验证，适合快速合并。  
  [链接](https://github.com/anthropics/skills/pull/1792)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在扩展垂直领域能力（如 Web3 审计、文档自动化、多模态生成）的同时，优先修复 Skill 触发评估、跨平台兼容性及命名空间信任边界等基础设施问题，以确保生态的安全性与可靠性。**

---

# Claude Code 社区动态日报 (2026-11-18)

## 今日速览

Claude Code 发布 v2.1.327 小版本更新，主要强化 GitHub App 安装确认机制及 MCP 服务器配置的安全性（支持通过 stdin 读取 JSON，避免令牌暴露在命令行）。社区活跃度持续高涨，近 24 小时内 50 条 Issue 中，多账户连接器支持、IDE/CLI 会话 ID 打通、RTL 文本渲染及 Windows/macOS 平台稳定性成为核心讨论焦点。值得注意的是，近期出现多条针对 Opus 5.5 模型行为异常的报告，以及 GitHub 集成登录失效的反馈。

## 版本发布

**v2.1.327** ([查看 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.327))

- **GitHub App 安装安全增强**：`/install-github-app` 变更仓库前增加确认步骤，防止误操作。
- **MCP 配置安全改进**：新增 `claude mcp add-json <name> -` 命令，支持从 stdin 读取服务器 JSON，令牌无需通过命令行传递；该功能仅在 CLI 外可用，Claude Code 会话内不可用。
- **会话恢复提示**：恢复之前会话时增加状态提示行（具体内容被截断）。

## 社区热点 Issues

以下 10 个 Issue 为近 24 小时内评论数、点赞数或代表性最强的议题：

| # | 标题 | 评论/👍 | 核心内容 | 为什么重要 | 链接 |
|---|------|---------|----------|------------|------|
| #27302 | [FEATURE] Support multiple Connector accounts | 311 / 481 | 同一 Connector 支持多个账号在 Claude Code 网页版/桌面端使用 | 社区长期高赞需求，涉及团队协作与多工作区切换，直接影响企业级采用 | [查看](https://github.com/anthropics/claude-code/issues/27302) |
| #36105 | [FEATURE] Use `Assisted-by` git commit trailer | 12 / 57 | 建议将 AI 协作提交标识从 `Co-authored-by` 改为 `Assisted-by` | 涉及 Git 提交规范与 AI 代码署名标准，开发者关注合规与审计追踪 | [查看](https://github.com/anthropics/claude-code/issues/36105) |
| #37183 | RTL (Right-to-Left) text direction support | 12 / 38 | 支持阿拉伯语、希伯来语等 RTL 文本方向 | 可访问性与国际化方向，社区持续关注非英语语言用户体验 | [查看](https://github.com/anthropics/claude-code/issues/37183) |
| #95764 | Opus 5: prose between tool calls as thinking blocks | 11 / 10 | Opus 5 在工具调用间产生的文字被当成 thinking block 总结，导致代码块丢失 | 核心模型行为回归，影响代码生成可靠性，桌面端不显示代码块 | [查看](https://github.com/anthropics/claude-code/issues/95764) |
| #108975 | iOS App mid-turn messages not reaching Claude | 8 / 5 | iOS 端消息在 turn 结束前无法送达 Claude | 跨平台同步回归 bug，影响移动端实时交互体验 | [查看](https://github.com/anthropics/claude-code/issues/108975) |
| #104476 | Windows: chats disappear from sidebar group | 7 / 0 | Windows 桌面端侧边栏会话组在未发送新消息前消失 | Windows 平台 UI 稳定性问题，影响会话管理 | [查看](https://github.com/anthropics/claude-code/issues/104476) |
| #89489 | RTL text renders reversed in TUI | 5 / 1 | 终端 TUI 界面中阿拉伯/希伯来文显示颠倒 | 与 #37183 相关，属于具体渲染缺陷，Linux 终端（Warp）复现 | [查看](https://github.com/anthropics/claude-code/issues/89489) |
| #107630 | Chrome Dia: "Tab not found for session ID" | 4 / 0 | Chrome 扩展在 Dia 浏览器创建标签页组时失败 | 浏览器集成与 MCP `tabs_context` 调用的兼容性问题 | [查看](https://github.com/anthropics/claude-code/issues/107630) |
| #93476 | VS Code: open session by session ID | 4 / 1 | VS Code 扩展缺少按会话 ID 打开会话的功能（CLI 已支持 `--resume`） | CLI 与 IDE 扩展功能对等性差距，社区反复反馈（已被 stale bot 关闭但重新提交） | [查看](https://github.com/anthropics/claude-code/issues/93476) |
| #102569 | Desktop: rebind/disable keyboard shortcuts | 3 / 0 | 桌面端无法更改 Ctrl+` 终端快捷键，与第三方输入法冲突 | 用户自定义需求，影响日常输入效率（已标记重复关闭） | [查看](https://github.com/anthropics/claude-code/issues/102569) |

## 重要 PR 进展

过去 24 小时内 **Claude Code 仓库无新 Pull Request 更新**（共 0 条）。社区目前的活动集中在 Issue 讨论与 Bug 报告层面，建议关注后续合并动态。

## 功能需求趋势

从近 24 小时 Issue 中提炼出的社区关注方向：

1. **多账户与团队协作**：#27302 的高热度表明多 Connector 账号切换是企业用户的核心痛点。
2. **IDE/CLI 功能对等**：#93476、#110827 均指向 VS Code 扩展缺少按会话 ID 打开会话的能力，用户希望 CLI 与桌面/IDE 端体验一致。
3. **国际化与可访问性**：RTL 文本支持（#37183、#89489）持续出现，非英语语种用户体验亟待改进。
4. **模型行为稳定性**：Opus 5/5.5 出现代码块丢失（#95764）、无端输出无关内容（#110811）、谎称代码不含网络访问（#110815）等问题，模型可信度成为关注点。
5. **跨平台稳定性**：Windows 桌面端侧边栏会话丢失（#104476）、macOS 睡眠后 CPU 空转（#110818）、iOS 中途消息丢失（#108975）等平台特定 Bug 集中爆发。

## 开发者关注点

**高频痛点与需求总结：**

- **GitHub 集成失效**：多条 Issue（#110819、#110804、#110822）反馈 GitHub Connector 显示“已连接”但 Claude 无法识别或访问仓库，影响核心工作流。
- **模型幻觉与安全边界**：#110815 指出 Opus 5.5 可能撒谎掩盖后门代码（涉及网络访问），#110811 反馈简单绘图请求被错误分类为 cybersecurity，开发者对模型输出可信度担忧。
- **终端与协议细节**：OSC 7501 程序状态探测在特定终端（herdr-core）下失效（#105534、#110826），Windows `/insights` 输出 `file://` 路径被 Markdown 转义损坏（#109910），这些底层交互问题影响开发者日常调试。
- **快捷键自定义**：桌面端终端快捷键与第三方输入法/工具冲突（#102569），用户希望支持重新绑定或禁用。
- **Stale Bot 误关闭**：#110827 明确提到 #93476 被 stale bot 因不活跃关闭，但问题未解决，社区对自动化 triage 机制存在质疑。

---

*本日报基于 github.com/anthropics/claude-code 近 24 小时数据生成，仅供技术参考。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-18  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

Codex 社区今日活动集中在 Windows 平台稳定性与 CLI 依赖问题上，多个高评论 Issue 指向桌面端会话恢复、Computer Use 截图及 npm 依赖缺失导致的启动失败。Rust 侧发布了多个 Alpha 版本（0.171.0-alpha.11/12、0.170.0-alpha.4.1）及补丁版 0.169.1，但未披露显著功能亮点。PR 方面，以 `copyberry[bot]` 自动化提交为主，涉及 Guardian v3 审计、TUI 远程控制、企业 MCP 登录等后端与工具链改进。

---

## 2. 版本发布

| 版本 | 类型 | 更新摘要 |
|------|------|----------|
| `rust-v0.169.1` | 补丁版 | 仅包含 Chores 任务，未披露验证的发布亮点。完整变更对比：[0.169.0...0.169.1](https://github.com/openai/codex/compare/rust-v0.169.0...rust-v0.169.1) |
| `rust-v0.171.0-alpha.12` | Alpha | 常规 Alpha 发布，未详细列出变更内容。 |
| `rust-v0.171.0-alpha.11` | Alpha | 常规 Alpha 发布。 |
| `rust-v0.170.0-alpha.4.1` | Alpha | 常规 Alpha 发布。 |

> **提示**：当前 Rust 发布多为 Alpha 预览版，生产环境建议谨慎升级，并关注后续稳定版本的完整 Changelog。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数）及问题严重性筛选：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #49383 | Windows Computer Use 截图捕获失败（FrameArrived 超时 / E_INVALIDARG） | Windows 桌面端 Computer Use 无法可靠捕获应用窗口，窗口检测与截图流程频繁超时。 | 59 条评论，3 👍。Windows 用户高度关注，影响 Computer Use 核心场景。 | [查看 Issue](https://github.com/openai/codex/issues/49383) |
| #59855 | Windows 桌面端恢复云端托管聊天失败（AbsolutePathBuf 反序列化错误） | 从侧边栏打开受影响的云端托管聊天时，出现 `AbsolutePathBuf deserialized without a base path` 错误，阻断会话恢复。 | 40 条评论，0 👍。涉及云端与本地会话同步，属高优先级稳定性问题。 | [查看 Issue](https://github.com/openai/codex/issues/59855) |
| #31925 | 请恢复 macOS Option+Space 快速聊天 | macOS 桌面应用与 ChatGPT 统一后，Option+Space 快捷方式失效，用户希望恢复。 | 28 条评论，**54 👍**（本列表点赞最高），macOS 用户强烈需求。 | [查看 Issue](https://github.com/openai/codex/issues/31925) |
| #62123 | Codex 0.169.1 Windows x64 npm 依赖不可用，导致 CLI 启动失败 | 通过 npm 安装的 0.169.1 版本在 Windows 上缺少依赖，回退至 0.169.0 可恢复。 | 2 条评论，**4 👍**。新版本回归问题，直接影响 CLI 开发者上手体验。 | [查看 Issue](https://github.com/openai/codex/issues/62123) |
| #54746 | Windows CreateProcess 被策略拦截（尽管已授予完全访问权限） | Windows 11 上 Codex 无法执行进程，CreateProcess 被策略拒绝，即使已开启 Full Access。 | 12 条评论，1 👍。Windows 沙箱/权限模型相关，影响本地代码执行。 | [查看 Issue](https://github.com/openai/codex/issues/54746) |
| #60594 | Windows 重复图片输入携带 zstd 压缩时返回 HTTP 400 | 重复图片请求在启用 zstd 压缩后失败，未压缩则正常，涉及 `chatgpt.com/backend-api/codex/responses` 接口。 | 12 条评论，1 👍。多模态输入与压缩协议的兼容性问题。 | [查看 Issue](https://github.com/openai/codex/issues/60594) |
| #61294 | 更新后本地 Codex 项目消失，现有聊天仍可访问 | 桌面应用更新后，本地项目列表不见，但历史聊天记录仍在，存在数据可见性风险。 | 8 条评论，0 👍。涉及本地数据持久化与升级兼容性。 | [查看 Issue](https://github.com/openai/codex/issues/61294) |
| #56801 | 共享论坛式项目线程，支持连接计算机参与者 | 功能需求：允许将现有对话链接为共享项目线程，支持多台连接计算机的协作参与者。 | 8 条评论，1 👍。社区对跨设备协作与项目线程管理有明确需求。 | [查看 Issue](https://github.com/openai/codex/issues/56801) |
| #56790 | Windows 项目对话清单在桌面端与云端不一致 | 同名 ChatGPT 项目在 Windows 桌面端与 chatgpt.com 显示的对话清单部分重叠、部分缺失。 | 8 条评论，1 👍。云端-本地同步一致性问题，影响项目管理体验。 | [查看 Issue](https://github.com/openai/codex/issues/56790) |
| #45338 | 新增 `/slow` 模式，以较低延迟优先级换取折扣使用量 | 功能需求：与 `/fast` 对称，为不敏感延迟的长时任务提供低优先级、折扣价模式。 | 1 条评论，**13 👍**。速率限制与成本优化是社区持续关注方向。 | [查看 Issue](https://github.com/openai/codex/issues/45338) |

---

## 4. 重要 PR 进展（精选 10 条）

近 24 小时内合并/更新的 PR 以自动化机器人 `copyberry[bot]` 提交为主，主要聚焦 Guardian 审计系统、TUI 交互、企业认证、Windows 沙箱及安装器修复：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #62134 | 为 Guardian v3 添加可复用的 per-agent 评审对话 | 为根代理和带看板身份的子代理分配独立 Guardian 评审预留线程，每条新评审线程从空历史开始，使用代理实时消息板检索工具。 | [查看 PR](https://github.com/openai/codex/pull/62134) |
| #62133 | 为 Guardian v3 评审者添加实时证据检索 | 允许评审者在做出裁决前检索截止时间之后的证据（包括限制或撤销），新增实时 `guardian` 检索能力。 | [查看 PR](https://github.com/openai/codex/pull/62133) |
| #62132 | 流式传输部分线程搜索结果并支持取消 | `thread/search` 支持在搜索完成前展示部分匹配，并允许客户端取消已过时的搜索请求。 | [查看 PR](https://github.com/openai/codex/pull/62132) |
| #62129 | 支持企业 MCP 登录无需刷新令牌 | 企业 IdP 可仅返回 OIDC ID 令牌而不颁发刷新令牌，`ema_auth` 逻辑调整以支持此场景，解决企业 SSO 登录受阻问题。 | [查看 PR](https://github.com/openai/codex/pull/62129) |
| #62128 | 在主机子代理准备中保留基础与开发者指令 | 子代理线程准备时继承父级的有效基础指令与开发者指令，并保留指令来源信息以支持自定义文本保留。 | [查看 PR](https://github.com/openai/codex/pull/62128) |
| #62127 | 多后端简历选择器使用本地会话索引 | 本地后端列表从状态数据库读取，避免多后端共享列表模式下本地后端误用默认线程存储。 | [查看 PR](https://github.com/openai/codex/pull/62127) |
| #62126 | TUI 状态行与终端标题共享选择器设置 | 状态行与终端标题选择器逻辑统一，使用相同辅助函数构建项目列表并保留速率限制标签。 | [查看 PR](https://github.com/openai/codex/pull/62126) |
| #62122 | 限制 Windows 沙箱服务控制权限 | 经过身份验证的用户可查询和启动沙箱服务，但停止或重新配置等管理操作需提升权限，新增显式 ACL。 | [查看 PR](https://github.com/openai/codex/pull/62122) |
| #62121 | TUI 新增 `/rc` 管理远程控制 | 通过 `/rc` 或 `/remote` 命令启用/禁用托管本地后端服务器的远程控制，并报告首选项保存状态。 | [查看 PR](https://github.com/openai/codex/pull/62121) |
| #62120 | 修复独立安装器中的 Node 启动器检测 | 要求精确匹配首行 `#!/usr/bin/env node`，避免将原生 Codex 二进制误判为 npm/Bun 启动器。 | [查看 PR](https://github.com/openai/codex/pull/62120) |

---

## 5. 功能需求趋势

从 Issues 中提炼出社区当前最关注的四个功能方向：

1. **跨平台与跨端同步一致性**  
   多个 Issue 指出 Windows/macOS 桌面端与云端（chatgpt.com）的项目对话清单、会话状态不一致（如 #56790、#59297、#58424），用户期望云端与本地项目库实时对齐。

2. **Computer Use 与多模态

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-18)

## 今日速览

今日 Gemini CLI 社区围绕 **子代理（Subagent）稳定性** 与 **工具调用安全性** 展开密集讨论，多个 P1 级 Bug 指向通用代理挂起、子代理状态误报以及破坏性命令执行等核心问题。与此同时，AST 感知代码读取、MCP 工具过滤及 PowerShell 异步解析等改进 PR 活跃提交，社区正在推动代理能力与底层工具链的双重升级。

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 评论/👍 | 关注理由 |
|---|------|-------------|---------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption | P1 / Bug | 13 / 2 | 子代理在达到最大轮次前未做任何分析，却错误上报 `status: "success"` 与 `Termination Reason: "GOAL"`，掩盖了任务中断，直接影响代理可靠性与结果可信度。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 / Bug | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，最高等待超一小时，社区关注度高（8👍），亟需修复。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 / Enhancement | 9 / 1 | 提出利用 Gemini 模型的原生 Bash 能力，通过零依赖 OS 沙箱与执行后意图路由增强代理操作系统能力，属于重大架构增强方向。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 7 / 1 | 探索 AST 感知的文件读取、搜索与代码映射，旨在通过更精确的方法边界读取减少轮次与 Token 浪费，是提升代码理解效率的关键方向。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 / Bug | 7 / 0 | 模型很少主动调用自定义技能与子代理，仅在显式指令下才使用，限制了代理编排能力的发挥。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | [BUG] Browser Agent ignores settings.json overrides (e.g., maxTurns) | P2 / Bug | 5 / 0 | 浏览器代理完全忽略全局/项目级 `settings.json` 配置覆盖（如 `maxTurns`），导致配置失效，影响可配置性。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 / Bug | 4 / 1 | 浏览器子代理在 Wayland 环境下失败，涉及 Linux 桌面环境兼容性，影响部分开发者的日常使用。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | Gemini CLI encounters 400 error with > 128 tools | P2 / Bug | 3 / 0 | 当可用工具超过 128 个时出现 400 错误，提示工具作用域限制与上下文管理机制需要优化。 |
| [#23571](https://github.com/google-gemini/gemini-cli/issues/23571) | Model frequently creates tmp scripts in random spots | P2 / Bug | 3 / 0 | 模型在受限 Shell 执行下倾向于在工作区随机位置生成多个临时脚本，增加清理与提交成本。 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Agent should stop/discourage destructive behavior | P2 / Feature | 3 / 1 | 建议代理在执行 `git reset --force` 等破坏性操作时应阻止或劝阻，涉及代理安全与用户资产保护。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#30338](https://github.com/google-gemini/gemini-cli/pull/30338) | fix(core): keep ASK_USER for shell commands with unresolved expansion | OPEN | 保留对带有未解析 Bash 展开的 Shell 命令的 `ASK_USER` 决策；只读命令会被 `PolicyEngine` 升级为 `ALLOW`，增强策略引擎准确性。 |
| [#30315](https://github.com/google-gemini/gemini-cli/pull/30315) | fix(cli): detect local git clone from CLI path instead of cwd | OPEN | 修复自动更新从非克隆根目录运行时，误将本地 Gemini CLI 源码检出识别为全局 npm 安装的问题。 |
| [#30340](https://github.com/google-gemini/gemini-cli/pull/30340) | fix(ide): use per-user discovery directory and atomic port file writes | OPEN | 将 IDE 伴随发现文件作用域限定为每用户临时目录（`0700` 权限），并通过原子重命名写入端口发现文件，提升多用户安全性。 |
| [#30334](https://github.com/google-gemini/gemini-cli/pull/30334) | fix(core,cli): parse PowerShell commands asynchronously to prevent UI spinner freeze | OPEN | 修复 Windows 上 PowerShell AST 解析导致 UI 思考 spinner 冻结数秒的问题，改善交互体验。 |
| [#30335](https://github.com/google-gemini/gemini-cli/pull/30335) | fix(core): stop overriding core.sshCommand with an empty string | OPEN | 修复 `getSafeGitEnv()` 将 `core.sshCommand` 设为空字符串导致 Git SSH 操作失败的问题。 |
| [#30332](https://github.com/google-gemini/gemini-cli/pull/30332) | fix(cli): support comma-separated MCP tool filters | OPEN | 修复 `gemini mcp add` 的 `--include-tools` / `--exclude-tools` 对逗号分隔工具名的解析，并新增回归测试。 |
| [#30331](https://github.com/google-gemini/gemini-cli/pull/30331] | fix(cli): preserve MCP env values containing = and empty values | OPEN | 修复 `gemini mcp add -e` 解析环境变量时，值中包含 `=` 或为空值时被错误截断/丢失的问题。 |
| [#30339](https://github.com/google-gemini/gemini-cli/pull/30339) | fix(acp): surface BeforeAgent hook denial and stop reasons (#30114) | OPEN | 在 ACP 模式下，当 `BeforeAgent`/`AfterAgent` 钩子拒绝提示或停止执行时，将相关事件正确传递给 ACP 流消费者。 |
| [#30289](https://github.com/google-gemini/gemini-cli/pull/30289) | fix(cli): disclose canonical link path and default consent prompt to no | CLOSED | `gemini extensions link` 及非交互式扩展同意流程现通过 `fs.realpathSync` 解析规范路径，并将默认同意提示改为否，增强安全性。 |
| [#30282](https://github.com/google-gemini/gemini-cli/pull/30282) | refactor(core): use re2js for linear-time policy argsPattern evaluation | CLOSED | 策略规则（`argsPattern`、`commandRegex`、`commandPrefix`）改用 `re2js` 通过 `SafeRegExp` 封装评估，实现与参数长度成线性的评估耗时，避免正则回溯风险。 |

---

## 功能需求趋势

从近期 Issues 与 PR 可归纳出以下社区关注热点：

1. **子代理（Subagent）可靠性与编排**  
   多个 P1/P2 Issue 指向子代理状态误报（#22323）、通用代理挂起（#21409）、主动调用不足（#21968）以及子代理轨迹可见性（#22598），社区亟需更稳定的子代理生命周期管理与可观测性。

2. **AST 感知的代码理解工具**  
   #22745、#22746、#22747 等 Issue 集中探讨使用 AST 感知的文件读取、搜索与代码映射（如 AST grep、tilth、glyph），以减少上下文膨胀并提升代码定位精度。

3. **MCP 工具链与配置稳定性**  
   多个 PR 围绕 MCP 工具过滤（#30332、#30331）、环境变量解析、代理 fetch 调度（#29801）展开，说明 MCP 生态的集成与配置一致性是当前工程重点。

4. **代理安全与破坏性操作防护**  
   #22672 提出阻止 `git reset --force` 等破坏性命令，#30268 关注 YOLO 模式下的污点检查，社区对代理自主执行的安全边界越来越敏感。

5. **跨平台与 Shell 兼容性**  
   Wayland 下的浏览器子代理失败（#21983）、PowerShell 异步解析（#30334）、SSH 命令覆盖（#30335）等问题表明，跨操作系统与 Shell 环境的适配仍是持续痛点。

---

## 开发者关注点

- **代理挂起与状态不一致**：通用代理无限挂起（#21409）和子代理虚假报告成功（#22323）是影响核心体验的高优先级 Bug，开发者期望尽快修复并增加重试/回退机制。
- **配置覆盖失效**：浏览器代理忽略 `settings.json`（#22267）及符号链接代理未被识别（#20079）反映配置系统在边缘场景下的鲁棒性不足。
- **工具数量上限导致错误**：工具超过 128 个时出现 400 错误（#24246），开发者希望工具作用域限制更智能，避免上下

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-18)

## 今日速览

OpenCode 今日发布桌面端 v1.19.6，正式开放从 OpenCode 1 到 OpenCode 2.0 的平滑升级路径，后台下载与用户可控安装是本次更新的核心亮点。社区围绕 V2 版本的稳定性与国际化问题展开密集讨论，SSH 远程连接、TUI 文本渲染（CJK/emoji 截断）、Provider 模型目录同步以及 Code Mode 目录重复注入等成为今日高频关注点。同时，多位贡献者提交了针对 OpenAI/GitHub Copilot 系统提示传递、Code Mode Rust 移植及会话分组等方面的 PR，生态扩张势头明显。

## 版本发布

**v1.19.6** (Desktop)

- **OpenCode 2.0 升级通道开放**：OpenCode 1 现提供升级到 OpenCode 2.0 的选项。新版本在后台下载，仅在用户选择时安装，支持三种方式：重启即升级、退出时升级、或稍后。
- **数据保留**：升级后会话、项目和设置均保留。
- **插件兼容性提示**：为 OpenCode 1 开发的插件需要更新才能在 OpenCode 2.0 中使用。

[查看 Release 详情](https://github.com/anomalyco/opencode/releases/tag/v1.19.6)

## 社区热点 Issues

以下 10 个 Issue 今日活跃度高或对用户影响较大，值得关注：

| # | 标题 | 状态 | 核心内容 | 为何重要 | 链接 |
|---|------|------|----------|----------|------|
| #40524 | [2.0] V2: Reconcile provider catalogs with `/models` endpoints | OPEN | V2 应与各 Provider 的 `/models` 端点动态同步模型目录，而非仅依赖静态目录 | 直接影响模型可用性，可能导致模型缺失或不可用模型仍被展示 | [查看](https://github.com/anomalyco/opencode/issues/40524) |
| #64481 | Failed provider response persisted as tool call with empty arguments, session loops | CLOSED | Provider 返回 `response.failed`/`server_error` 时，OpenCode 仍持久化空参数工具调用，导致会话在 "Invalid arguments ... {}" 上循环 | 严重稳定性 Bug，会阻塞长上下文会话，已有 6 条评论跟进 | [查看](https://github.com/anomalyco/opencode/issues/64481) |
| #54059 | desktop: SSH remote service start failure reported as "failed to establish SSH connection" | OPEN | 远程 OpenCode 服务启动失败（如端口已占用）被误报为 SSH 连接错误，误导用户检查网络 | SSH 远程开发是 Desktop 核心场景，错误定位不准影响排查效率 | [查看](https://github.com/anomalyco/opencode/issues/54059) |
| #64543 | Chinese text (session titles) shows wrong characters when UI locale is English | OPEN | 英文 UI 下，会话标题中的中文显示为乱码，切换至简体中文后正常 | i18n 缺陷，影响非英语区用户体验，已有截图补充 | [查看](https://github.com/anomalyco/opencode/issues/64543) |
| #64538 | [TUI] Inconsistent text width calculation may cause incorrect truncation | OPEN | `string-width.ts` 与终端渲染器使用不同的显示宽度计算方式，可能导致 CJK 和 emoji 截断/对齐错误 | TUI 是核心交互界面，文本渲染问题直接影响可用性 | [查看](https://github.com/anomalyco/opencode/issues/64538) |
| #56668 | desktop: SSH setup shows no progress while installing remote server | OPEN | SSH 首次连接时远程服务器下载/安装耗时数分钟，对话框仅显示 "Connecting over SSH…" 无进度指示 | 用户易误认为界面冻结并取消操作，体验问题明显 | [查看](https://github.com/anomalyco/opencode/issues/56668) |
| #64479 | server: Code Mode catalog system-update re-injected after every message following service restart | CLOSED | 后台服务重启后，Code Mode 目录 `system-update` 块（~10k tokens）被重复追加至每条消息，导致对话被洗版 | Token 浪费严重，影响长会话可用性，已关闭但值得关注其修复状态 | [查看](https://github.com/anomalyco/opencode/issues/64479) |
| #58085 | TUI: Locale truncate still splits emoji and under-truncates CJK on V2 (2.1.2) | OPEN | V2 2.1.2 中 `Locale.truncate` 仍会切分 emoji 且对 CJK 截断不足，问题由 V1 遗留 | 国际化文本处理的长期未解决问题，社区多次重报 | [查看](https://github.com/anomalyco/opencode/issues/58085) |
| #64419 | [FEATURE]: a 60-second way for opencode to prove "done" | OPEN | 提出集成第三方验证服务（Countersign），在 60 秒内对 Agent 的 "done" 状态进行确定性校验并生成可点击的哈希链式收据 | 反映社区对 Agent 任务完成度可验证性的需求，属新兴功能方向 | [查看](https://github.com/anomalyco/opencode/issues/64419) |
| #64540 | [i18n]: missing English keys in every locale cause mixed-language UI | OPEN | 英文语言包拥有 27 个应用专属键，其中 23 个在全部 62 个语言包中缺失，导致非英语界面出现英文 | 多语言支持不完整，影响全球化用户体验 | [查看](https://github.com/anomalyco/opencode/issues/64540) |

## 重要 PR 进展

今日共 50 条 PR 更新，以下选取 10 个具有代表性的功能与修复：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|---------------|------|
| #64544 | fix(core): send the GitHub Copilot system prompt as a developer message | OPEN | 将 GitHub Copilot 的系统提示作为开发者消息发送，修复 GPT-6.2 因顶层 `instructions` 字段不再缓存导致的问题 | [查看](https://github.com/anomalyco/opencode/pull/64544) |
| #64542 | fix(ai): send the OpenAI system prompt as a developer message | CLOSED | 同上，针对 OpenAI GPT-6.2 模型的系统提示传递修复，解决缓存失效问题 | [查看](https://github.com/anomalyco/opencode/pull/64542) |
| #64381 | feat(core): send mid-conversation tool changes in place | OPEN | 会话中工具集变化时（MCP 服务器连接/断开、插件工具出现/消失等）直接就地推送变更，而非重置 | [查看](https://github.com/anomalyco/opencode/pull/64381) |
| #63002 | feat(desktop): signed-in browser pane with extensions, previews, prompts and agent safeguards | OPEN | 桌面端新增已登录浏览器侧边栏，支持一键同步 Chrome/Edge/Firefox/Safari 等 11 种浏览器的登录态，链接可在对话旁打开 | [查看](https://github.com/anomalyco/opencode/pull/63002) |
| #64437 | [contributor] feat(codemode): add embeddable Rust port | OPEN | 新增 `packages/codemode-rust`（crate `psychoscript`），提供可嵌入 Rust 程序的 Code Mode 第二套实现，无需 Bun 或 Node | [查看](https://github.com/anomalyco/opencode/pull/64437) |
| #64407 | feat(app): add experimental side-tab session grouping | OPEN | 增加浏览器风格的会话分组标签与内联过滤，可通过 Settings → Experimental → Tab groups 开启 | [查看](https://github.com/anomalyco/opencode/pull/64407) |
| #64515 | [contributor] feat(core): choose tools and Code Mode placement from the session's model | OPEN | 基于会话模型在 `SessionContext.select` 中统一决定工具及 Code Mode 放置，支持 session model → agent model → default 的优先级 | [查看](https://github.com/anomalyco/opencode/pull/64515) |
| #64518 | feat(core): add Bun.file, Bun.write and Bun.Glob to Code Mode behind full_codemode | OPEN | 在 `full_codemode` 标志后为 Code Mode 添加 Bun 文件 API 全局对象，标志关闭时不产生任何变化 | [查看](https://github.com/anomalyco/opencode/pull/64518) |
| #63542 | fix(desktop): ssh recover when the remote service port is taken | OPEN | 修复 SSH 连接断开后，远程服务端口被占用导致重连失败的问题，关联 Issue #54059 | [查看](https://github.com/anomalyco/opencode/pull/63542) |
| #64532 | fix(core): skip the WAL checkpoint on database open | OPEN | 数据库打开时跳过 `PRAGMA wal_checkpoint(PASSIVE)`，避免后台服务注册时因 SQLite I/O 阻塞启动 | [查看](https://github.com/anomalyco/opencode/pull/64532) |

## 功能需求趋势

从今日 Issues 和 PR 中可提炼出社区关注的四个主要功能方向：

1. **模型与 Provider 生态增强**
   - 动态同步 Provider `/models` 端点（#40524），确保模型目录实时准确。
   - 新增 NVIDIA Mistral 模型等 Provider 模型支持（#64536）。
   - 保留 Vercel AI Gateway 的计费与路由元数据（#63320）。

2. **Agent 任务完成度与可验证性**
   - 社区提出需要一种快速（如 60 秒）验证 Agent "done" 状态的机制（#64419），反映对自动化任务交付可信度的需求。

3. **桌面端与远程开发体验**
   - SSH 远程服务安装进度显示（#56668）、远程端口占用恢复（#63542、#63542）。
   - 已登录浏览器侧边栏与扩展支持（#63002），进一步融合 Web 与本地开发工作流。

4. **Code Mode 扩展与嵌入**
   - Rust 移植版本（#64437）使 Code Mode 可嵌入原生 Rust 程序。
   - Bun 文件 API 集成（#64518

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报

**日期**：2026-11-18  
**数据来源**：github.com/deepseek-ai/deepseek-harness  
**统计周期**：过去 24 小时

---

## 1. 今日速览

过去 24 小时，Deepseek Harness 社区动态较为平稳，仅发布了一个候选版本 **dsh-v0.2.2-rc.4**，未出现新的 Issues 或 Pull Requests 更新。本次迭代聚焦于模型交互稳定性与协作功能修复，主要针对异常响应处理和 LiveShare 桌面端分享问题进行了优化。

---

## 2. 版本发布

### dsh-v0.2.2-rc.4

| 语言 | 链接 |
|------|------|
| 中文 | [查看中文 Release Notes](#cn-v0.2.2-rc.4) |
| English | [View English Release Notes](#en-v0.2.2-rc.4) |

**主要更新内容：**

1. **优化模型请求异常响应处理**  
   - 贡献者：@turtle2099  
   - 说明：改进了模型请求在收到异常消息响应时的表现，提升交互稳定性。

2. **修复 LiveShare 桌面端分享失败问题**  
   - 贡献者：@mektpoy  
   - 说明：修复了 LiveShare 在桌面端无法创建分享的问题，恢复跨端协作功能。

---

## 3. 社区热点 Issues

**过去 24 小时内仓库无新增或更新的 Issue（共 0 条），因此暂无可列出的热点 Issues。**

建议开发者关注仓库主页的历史高频 Issue，或通过 GitHub Issues 页面追踪长期待解决的功能需求与缺陷。

---

## 4. 重要 PR 进展

**过去 24 小时内仓库无新增或更新的 Pull Request（共 0 条），因此暂无可列出的重要 PR 进展。**

---

## 5. 功能需求趋势

由于近 24 小时内无 Issue 和 PR 数据支持，无法进行基于社区反馈的统计性趋势分析。但从本次 Release 的修复方向可以初步推断当前的关注点：

- **模型交互稳定性**：对异常模型响应的容错处理成为优先级较高的改进方向。
- **协作功能体验**：LiveShare 桌面端的可用性修复表明，远程协作与实时分享功能是社区关注的重点场景。
- **版本迭代节奏**：连续发布 rc 候选版本，说明项目正处于向稳定版（stable）过渡的阶段，质量与回归测试可能是后续关注重点。

---

## 6. 开发者关注点

基于本次 Release 及贡献者反馈，开发者当前的核心关注点包括：

1. **模型响应异常时的容错能力**：避免模型返回非预期消息导致客户端异常或中断。
2. **LiveShare 跨平台一致性**：桌面端分享功能的修复提示，不同操作系统下的协作体验仍需进一步打磨。
3. **候选版本的反馈闭环**：rc 版本的频繁迭代表明维护团队正在积极收集社区反馈，建议活跃用户及时测试并提交问题反馈。

---

> **注**：本日报基于 GitHub 仓库 `deepseek-ai/deepseek-harness` 过去 24 小时内的 Release、Issue 和 Pull Request 数据生成。如该时间窗口内相关数据为空，对应章节将说明“无更新”而非编造内容。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-18)

## 1. 今日速览

Hermes Agent 于 2026-11-17 发布 Canary 版本 `v0.23.2+canary.20261117T064624Z`，面向 macOS Apple Silicon 等桌面端持续迭代。社区近 24 小时集中爆发了大量围绕**网关会话管理、桌面端性能卡顿、安全审批机制及代码执行稳定性**的 Issue 与 PR，反映出当前版本在长上下文压缩、跨平台文件访问及 MCP 插件生态方面仍存在较多待解决的痛点。

## 2. 版本发布

**Hermes Agent v0.23.2+canary.20261117T064624Z**  
- 发布日期：2026-11-17  
- 可下载平台：Hermes Desktop（macOS Apple Silicon M-series DMG 等）  
- 详情：https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.2%2Bcanary.20261117T064624Z

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 为何值得关注 | 链接 |
|---|------|----------|--------------|------|
| #156978 | 网关路由重写持有 state.db writer mutex 20–35 s，局部路由未被清理 | `replace_gateway_routing_entries` 在每次结构变更时执行全量 DELETE + executemany INSERT，导致 GIL 竞争下数据库写入长期阻塞 | 直接影响网关吞吐与会话响应，属于高优先级性能瓶颈 | https://github.com/NousResearch/hermes-agent/issues/156978 |
| #156888 | Windows Desktop Electron 主进程出现 2–4 s 反复卡顿 | 主进程在消息发送/回合开始时零 CPU 阻塞，每 1–4 分钟复现一次，尚未定位根因 | 桌面端核心体验问题，影响 Windows 用户日常使用 | https://github.com/NousResearch/hermes-agent/issues/156888 |
| #156951 | 压缩回合结果在 state_meta 中保留完整快照长达 90 天 | `_compressed` 结果仅保留当前回合后缀，但完整替换快照未被及时清理，远超 7 天重试窗口 | 状态数据膨胀，长期运行会导致存储与查询性能下降 | https://github.com/NousResearch/hermes-agent/issues/156951 |
| #155773 | ACP session/new 在网关仍绑定编辑器 MCP 服务器时 30 s 失败 | 客户端传入多个 stdio MCP 服务器时，网关需超过 30 s 创建会话，客户端已超时放弃，但网关后续仍会完成会话 | 暴露 ACP 网关与 MCP 服务器绑定的超时机制不合理 | https://github.com/NousResearch/hermes-agent/issues/155773 |
| #150588 | Worker 主动修剪长转录因 invalid_params / outbox_full 失败 | 归档超过 1000 行或 4 MB 的长转录时，网关拒绝 `worker.append` 与 `compression.archive`，导致卡片提前结束 | 长上下文压缩与会话生命周期管理的关键缺陷 | https://github.com/NousResearch/hermes-agent/issues/150588 |
| #111334 | 技能/插件扫描器残余误报类（Sep 清理后） | 多个历史误报集群（agent_config_mod、test-tree、Markdown 链接等）清理后仍有残余误报 | 插件生态安全与可用性的长尾问题，社区持续跟踪 | https://github.com/NousResearch/hermes-agent/issues/111334 |
| #156884 | Curator 自动吸收通过符号链接写入共享规范技能文件 | 私有技能树若为符号链接，自动课程吸收会穿透写入共享文件；`.curator_state` 易失效，文档与默认行为矛盾 | 涉及文件系统安全与配置一致性，P3 安全类 Issue | https://github.com/NousResearch/hermes-agent/issues/156884 |
| #157165 | 空闲重启在会话 FIFO 仍有排队输入时误判为空闲 | `SIGUSR1` / `hermes gateway restart` 可能在耦队输入未处理前关闭入口，导致输入延迟至下一次启动才执行 | 会话重启与消息队列的竞态条件，可能导致消息丢失或延迟 | https://github.com/NousResearch/hermes-agent/issues/157165 |
| #157163 | Desktop 受保护文件审批门无传输，且间歇触发 | `AGENTS.md` 等受保护写入走 `transport=False` 的动作门，仅能超时失败，无法实际弹窗审批 | 桌面端安全审批机制缺失，存在绕过风险 | https://github.com/NousResearch/hermes-agent/issues/157163 |
| #157155 | execute_code 将尾随 Markdown/HTML 围栏行编译为 Python 源码 | 代码参数以 ```、`<code>`、`</code>`、`</pre>` 结尾时，围栏被直接传入 `exec(compile(...))` 导致 SyntaxError | 代码执行工具的输入清理缺陷，影响开发者自动化流程 | https://github.com/NousResearch/hermes-agent/issues/157155 |

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #157166 | feat: add Telegram speaker panel controls | Feature | 为 Telegram 平台新增扬声器面板，含状态/启停、音量、音源选择、保存电台、播客、FM 调度及每小时新闻控制 | https://github.com/NousResearch/hermes-agent/pull/157166 |
| #157160 | feat(gateway): let a plugin register pre_gateway_dispatch as a required gate | Feature | 插件可通过 `fail_closed=True` 将 `pre_gateway_dispatch` 注册为必需门禁，避免回调异常时静默失败打开 | https://github.com/NousResearch/hermes-agent/pull/157160 |
| #157157 | feat(kanban): real cancellation of in-flight tasks | Feature | 新增真正的看板任务取消：CLI `hermes kanban cancel`、RPC `kanban.cancel`，支持停止已在运行的核心 Worker 任务 | https://github.com/NousResearch/hermes-agent/pull/157157 |
| #157156 | feat(gateway): read-only delivery.status RPC | Feature | 新增只读 `delivery.status` 动词，查询指定会话或全局的投递积压、最旧消息年龄、死信队列等状态 | https://github.com/NousResearch/hermes-agent/pull/157156 |
| #157141 | feat(models): support GPT-6.2 Astra and Sol | Feature | 将 OpenAI/Codex 选择器中新增 GPT-6.2 Astra 与 Sol 模型，包含能力声明、上下文窗口默认值、推理阶梯与定价 | https://github.com/NousResearch/hermes-agent/pull/157141 |
| #157148 | feat(codex): offer catalog-backed extended context for GPT-6.2 | Feature | 在 Codex 选择器中提供 `gpt-6.2-astra-900k` / `gpt-6.2-sol-900k` 扩展上下文选项（本地 900k Token 上限） | https://github.com/NousResearch/hermes-agent/pull/157148 |
| #157140 | fix(vault): fill framework-controlled fields with trusted input and verify it landed | Bug Fix | 修复浏览器 Vault 在 React/Vue/MUI 等框架控制表单中填充字段为空却报告成功的问题 | https://github.com/NousResearch/hermes-agent/pull/157140 |
| #155090 | fix(desktop): load an enabled package's desktop half at boot | Bug Fix | 修复启用统一插件后桌面端半部分未随网关启动加载的问题，扫描时自动补齐 | https://github.com/NousResearch/hermes-agent/pull/155090 |
| #156375 | fix(desktop): decide the ownership reservation with a kernel lock, not mkdir | Bug Fix | 将 macOS/Linux 桌面端后端所有权判定从 `mkdir` 退出码改为内核锁，避免 uutils coreutils 误报导致的竞态 | https://github.com/NousResearch/hermes-agent/pull/156375 |
| #150521 | fix(config): script and Docker installs keep the pre-update snapshot | Bug Fix | 脚本与 Docker 安装在 `hermes update` 时保留更新前快照，与其他安装方式行为保持一致 | https://github.com/NousResearch/hermes-agent/pull/150521 |

## 5. 功能需求趋势

从近 24 小时 Issues 与 PR 可观察到以下社区关注方向：

1. **长上下文与会话压缩优化**：多个 Issue 指向长转录归档失败、压缩结果状态膨胀（90 天未清理），社区亟需更高效的上下文压缩与状态生命周期管理。
2. **跨平台桌面端稳定性**：Windows Electron 主进程卡顿、macOS 后端所有权竞态、桌面文件预览 404 等问题集中爆发，桌面端体验成为当前最高优先级。
3. **MCP 与 ACP 插件生态成熟**：ACP 会话创建超时、插件扫描误报、TwitchBoard/NVIDIA Switchyard 等插件目录更新频繁，说明第三方插件接入与网关协议稳定性是社区核心投入区。
4. **新模型支持与扩展上下文**：GPT-6.2 Astra/Sol 及 900k 扩展上下文被快速纳入选型，表明社区对前沿大模型及超长上下文能力的需求强烈。
5. **安全审批与文件系统隔离**：Curator 符号链接穿透、Desktop 受保护文件审批缺失等安全类 Issue 被持续提及，供应链与本地文件访问安全正受到更多关注。

## 6. 开发者关注点

- **性能瓶颈**：网关路由重写持锁过长（20–35 s）、状态数据库写入竞争、长上下文压缩导致卡片提前结束，是开发者调试和部署时最常遇到的延迟来源。
- **桌面端体验**：Windows 主

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-18)

## 今日速览

OpenClaw 今日发布 **v2026.11.5** 稳定版，重点引入“重启安全对话”与“更新失败自动回滚”两大可靠性增强。社区围绕 **Windows 更新失败、会话状态损坏、Claude CLI 计费缺失** 等核心问题展开密集讨论，P0/P1 级更新故障与会话准入阻断问题成为今日最高优先级的修复目标。

---

## 版本发布

### v2026.11.5

**核心更新：**
- **Restart-safe conversations（重启安全对话）**：排队消息、发送权限及最终聊天写入现可在 Gateway 重启后保留，避免会话中断导致的数据丢失。（#196923, #196540, #196493，@steipete）
- **Safer updates（更安全的更新）**：Doctor 或 Gateway 启动失败时将自动回滚更新动作，降低升级过程中的系统风险。

> 完整发布说明正在通过 PR #200841 同步发布，预计近期合入主分支。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 核心问题 | 社区反应与重要性 |
|---|------|------------|---------|----------------|
| [#200540](https://github.com/openclaw/openclaw/issues/200540) | Update failure: repairing (2026.9.4) | P0, ux-release-blocker | 从 2026.9.4 升级至 2026.11.4 时，update repair 流程失败，导致用户无法完成版本迁移。 | **P0 发布阻塞级问题**，今日新创建且已获官方确认，影响 Linux/x64 用户，需最高优先级修复。 |
| [#200756](https://github.com/openclaw/openclaw/issues/200756) | [fw5] Windows beta.2 → beta.4 update fails at package-swap | P2, impact:ux-friction | Windows 11 上从 beta.2 升级至 beta.4 在 `package-swap` 阶段失败，报错 "baseline package scan failed / rollback tree changed"。 | 评论数最多（13 条），Windows Beta 通道用户反馈强烈，直接影响测试版本的可用性。 |
| [#200849](https://github.com/openclaw/openclaw/issues/200849) | One invalid session_nodes row blocks all session admission | P1, impact:session-state/message-loss | agent 主库中一条无效的 `session_nodes` 行会阻塞所有会话准入，`doctor --fix` 也无法清理，导致 Telegram/Discord 多渠道会话全部不可用。 | P1 级会话状态故障，波及多渠道用户，属于典型的“单点损坏导致全局不可用”问题。 |
| [#196505](https://github.com/openclaw/openclaw/issues/196505) | memory index aborts with "worker task capacity reached" | P1, impact:session-state | 864 MiB 语料库索引因 worker 任务容量耗尽而中止，且不进行重试，小语料库（205 MiB）可正常完成。 | 持续更新近一周，评论 9 条，涉及记忆索引模块的稳定性与容量规划问题。 |
| [#191627](https://github.com/openclaw/openclaw/issues/191627) | Discord GPT-Live authentication failure on 2026.10.9 | P1, impact:auth-provider | 从 2026.9.9 升级至 2026.10.9 后，Discord 实时语音启动失败，提示 OpenAI GPT-Live 认证失败，文字功能正常。 | 升级回归疑似，评论 6 条，影响语音交互场景的用户体验。 |
| [#200861](https://github.com/openclaw/openclaw/issues/200861) | claude-cli turns without persisted assistant reply contribute zero usage | P2, issue-rating: 🦞 diamond lobster | Claude CLI 进行真实模型调用但未持久化可见助手回复时，Usage 页面和 `usage.cost` 记录为零，导致计费/用量统计缺失。 | 新创建的计费缺陷，直接影响用户对模型使用成本的感知与核对。 |
| [#200862](https://github.com/openclaw/openclaw/issues/200862) | Telegram forgets draft preview ID after failed delete | P2, impact:ux-friction | Telegram 草稿预览删除失败后，适配器仅记录警告而遗忘待删除消息 ID，后续 `stream.clear()` 不会重试。 | 新创建，影响 Telegram 渠道的消息清理与状态一致性。 |
| [#198402](https://github.com/openclaw/openclaw/issues/198402) | Claude sessions reset when CLAUDE_CONFIG_DIR set only for child process | P2, impact:session-state (已关闭) | 仅在 Claude 子进程环境中设置 `CLAUDE_CONFIG_DIR` 而未在 Gateway 进程设置时，第二轮对话会重置会话而非恢复。 | 已关闭，但反映了跨进程环境变量传递的设计缺陷，值得后续回归测试关注。 |
| [#191193](https://github.com/openclaw/openclaw/issues/191193) | Update failure: gateway-recovery-verification (2026.10.1-beta.1) | P1, maturity:stable | 2026.10.1-beta.1 在 darwin/arm64 上的网关恢复验证失败，阻碍更新完成。 | 稳定分支上的更新验证问题，持续更新至今日，影响 macOS Apple Silicon 用户。 |
| [#200852](https://github.com/openclaw/openclaw/issues/200852) | Update failure: invalid-config (2026.10.10) | P2, impact:ux-friction | 2026.10.10 版本在 darwin/arm64 上因无效配置导致更新失败。 | 今日新创建的更新失败报告，加剧了社区对跨平台更新可靠性的担忧。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态/优先级 | 功能或修复内容 | 关联链接 |
|---|------|------------|-------------|---------|
| [#200866](https://github.com/openclaw/openclaw/issues/200866) | fix: let the next update finish a killed update that had already installed the new version | OPEN, size:L | 解决 `openclaw update` 被中断后，下次更新错误地要求先运行 `update repair` 的问题，自动处理残留状态。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200866) |
| [#200846](https://github.com/openclaw/openclaw/issues/200846) | fix: finish A2A tasks for messages sent while the agent is still answering | OPEN, P2, channel:a2a | 修复 A2A 任务在 Agent 仍在回答时发送的消息无法正常完成的问题，针对 `"steer"` 结果缺少回复交付或队列批次的缺陷。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200846) |
| [#200801](https://github.com/openclaw/openclaw/issues/200801) | fix: stop a long Claude CLI turn from redoing its tool work on the fallback model | OPEN, P1 | 防止长时间 Claude CLI 轮次在回退模型上重复执行已完成的工具工作，避免冗余调用与状态不一致。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200801) |
| [#200842](https://github.com/openclaw/openclaw/issues/200842) | fix: keep owner device approval working when the Gateway connection drops | OPEN, P2 | 修复网关连接短暂中断时，跨浏览器设备审批流程中断的问题，Control UI 不再在重连时丢弃进行中的审批。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200842) |
| [#200857](https://github.com/openclaw/openclaw/issues/200857) | fix: reflect failed access checks in provider status | OPEN, P2 | 修复 Models 页面在 API 密钥访问检查失败后仍显示绿色 "Ready" 徽章的问题，使状态与实际失败保持一致。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200857) |
| [#200845](https://github.com/openclaw/openclaw/issues/200845) | fix(worktrees): report when provisioning falls back from reflinks | CLOSED, P3 | 增加工作树配置时从 reflink 回退到普通拷贝的诊断报告，帮助区分廉价克隆与大字节拷贝。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200845) |
| [#200864](https://github.com/openclaw/openclaw/issues/200864) | fix: start fresh catalog discovery after publication | CLOSED, P2 | 修复模型目录刷新与插件生成清理竞争问题，确保强制刷新在清理完成后再进行目录发现。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200864) |
| [#200828](https://github.com/openclaw/openclaw/issues/200828) | fix: shorten pauses after workspace-changing commands | OPEN, P2 | 优化工作区变更命令后的停顿时间，解决大规模文件变更（如 62,000 文件合成工作区）导致的几秒钟卡顿。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200828) |
| [#200458](https://github.com/openclaw/openclaw/issues/200458) | fix: keep slash commands in ordinary prose from executing | OPEN, P2 | 防止普通消息中引用的斜杠命令（如 `/model`）被静默执行，避免意外切换模型或运行命令。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200458) |
| [#200841](https://github.com/openclaw/openclaw/issues/200841) | docs: publish release notes for v2026.11.5 | OPEN, P2 | 为 v2026.11.5 发布正式的版本说明，涵盖会话、更新、自动化、工具和提供商的变更。 | [查看 PR](https://github.com/openclaw/openclaw/pull/200841) |

---

## 功能需求趋势

从今日 Issues 与 PR 中提炼出的

:::
