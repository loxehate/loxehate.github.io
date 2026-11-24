---
title: "AI CLI 工具社区动态日报"
published: 2026-11-24
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-24

> 生成时间: 2026-11-24 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-24）

## 1. 生态全景

当前 AI CLI 工具正处于从“单一代理助手”向“企业级多代理编排平台”演进的关键期。各主流工具均在加速构建多云部署能力、桌面端集成与远程协作编排层，但跨平台稳定性（尤其 Windows/Linux）与插件/钩子安全性已成为普遍瓶颈。社区需求呈现明显分化：企业用户侧重多云身份认证、成本归属与更新可靠性；个人开发者则关注跨语言支持、终端兼容性与浏览器自动化。整体而言，工具链正从实验性 Alpha/Canary 阶段向稳定版交付过渡，但回归性 Bug 频发，升级路径的回归测试成为各项目共同的成长阵痛。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Release | Issues（精选/总计） | PR（24h） | 活跃度评级 |
|------|------|-------------|-------------------|-----------|------------|
| Claude Code | anthropics/claude-code | v2.1.331（多云 Code Mode、OIDC 网关） | 10 条精选 / 未披露总数 | 2 条（1 开放 1 关闭） | 中高（企业发布频繁，社区反馈集中） |
| OpenAI Codex | openai/codex | 2 个 Rust Alpha（v0.171/0.172） | 10 条精选 / 未披露总数 | ~50 个合并（绝大多数由 bot 提交） | 高（PR 合并量大，但以基础设施优化为主） |
| Gemini CLI | google-gemini/gemini-cli | v0.71.0-nightly.20261123（夜间构建） | 10 条精选 / 未披露总数 | 10 条精选 | 中高（夜间迭代快，P1 Bug 集中） |
| OpenCode | anomalyco/opencode | v2.4.0、v2.4.1（内置桌面浏览器） | 10 条精选 / 未披露总数 | 10 条精选 | 高（版本迭代密集，稳定性问题集中爆发） |
| Hermes | NousResearch/hermes-agent | canary v0.23.3+canary.20261123（macOS DMG） | 10 条精选 / 未披露总数 | 10 条精选 | 中（安全审批与多平台集成活跃） |
| OpenClaw | openclaw/openclaw | v2026.11.10-beta.2、v2026.11.7（更新恢复） | 10 条精选 / 未披露总数 | 10 条精选 | 中（更新管道与会话恢复为核心） |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 无 | 无 | 0 | 低（过去24小时无活动） |
| Deepseek Harness | deepseek-ai/deepseek-harness | 无 | 无 | 0 | 低（过去24小时无活动） |

> 注：各仓库未公开今日新增 Issues/PR 总数，上表“精选”数为报告中披露的热点条目，仅供相对参考。

## 3. 共同关注的功能方向

多个工具社区在以下四个方向上存在高度重叠的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **跨平台桌面端稳定性** | Claude Code、OpenAI Codex、OpenCode、Hermes | Windows 后台任务孤儿进程、应用启动冻结、ConEmu/WSL2 终端兼容性、macOS 深度链接与 Keychain 崩溃 |
| **浏览器/网页自动化能力** | OpenAI Codex、Gemini CLI、OpenCode | 内置浏览器 Agent 无法被代理控制、Wayland 兼容性、登录态导入与跨会话标签恢复 |
| **安全与审批机制细化** | Claude Code、Gemini CLI、Hermes、OpenClaw | 插件自动更新“失败即放行”风险、MCP OAuth 预注册客户端支持、terminal force 模式硬底线、A2A 服务器 Bearer Token 认证 |
| **会话状态与后台任务生命周期** | Claude Code、OpenCode、Gemini CLI、OpenClaw | 后台任务清理不干净、会话恢复后权限丢失、子代理状态误报（GOAL success 掩盖中断）、长期僵尸会话无法归档 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 多云企业部署、OIDC 联合身份、桌面端国际化（RTL） | 企业级开发团队、跨国分布式团队 | 原生支持 Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry、AWS Claude Platform；侧重网关权限粒度与合规 |
| **OpenAI Codex** | Rust 端重构、TUI/CLI 性能、Web 自动化 | 个人开发者、安全研究员、自动化极客 | 以 Rust 端 Alpha 迭代为主，强调 WebSocket 重连优化、Statsig 引导、NFS 下 SQLite 锁竞争缓解 |
| **Gemini CLI** | 子代理（Subagent）编排、AST 感知代码工具、YOLO 模式 | AI 原生应用开发者、头less 自动化场景 | 聚焦代理生命周期管理、工具作用域控制（>128 工具触发 400 错误）、A2A 服务器安全加固 |
| **OpenCode** | 内置桌面浏览器、跨平台 TUI、MCP 生态 | 桌面端重度用户、本地优先开发者 | 内置 Chromium/Chrome/Edge 扩展支持，聊天链接保持登录态；强调 V2 模型访问控制与 per-provider 白名单 |
| **Hermes** | 多平台消息集成（Telegram/WhatsApp/AppleScript）、安全审批门控 | 即时通讯平台代理运营者、多租户网关管理员 | 以网关事件循环为核心，强调配置文件隔离、读取池可调、审批来源可审计 |
| **OpenClaw** | 更新恢复管道、会话/对话恢复、多代理成本归属 | 企业 ACP（Agent Collaboration Protocol）用户、运维团队 | 侧重更新中断后的可运行保持、sqlite-maintenance 冲突解决、Tasks ledger 子运行成本归属 |
| **DeepSeek Reasonix / Harness** | — | — | 过去24小时无社区活动，处于停滞或低频维护状态 |

## 5. 社区热度与成熟度

- **高热度、快速迭代**：OpenCode（v2.4.0/2.4.1 连续发布，稳定性问题集中爆发，社区反馈强烈）、OpenAI Codex（~50 个 PR 合并，Rust 端 Alpha 密集迭代）。这两个工具正处于功能扩张与稳定性修补的交织期，适合追求前沿特性的早期采用者，但生产环境需谨慎评估升级风险。
- **中高热度、企业导向**：Claude Code（多云发布是企业落地积极信号，但 Windows/Linux/macOS 回归性 Bug 待解决）、Gemini CLI（夜间构建频繁，P1 子代理 Bug 集中，适合愿意参与前沿代理编排实验的团队）。
- **中热度、垂直场景**：Hermes（多平台消息集成与安全审批机制活跃，适合即时通讯代理场景）、OpenClaw（更新恢复与成本归属是企业级 ACP 的核心痛点，社区讨论集中在管道可靠性）。
- **低活跃度**：DeepSeek Reasonix 与 Deepseek Harness 过去24小时无任何动态，社区关注度低，不建议作为关键路径依赖。

## 6. 值得关注的趋势信号

1. **多云与联合身份成为标配**：Claude Code 已原生支持四大云平台的 Code Mode 并引入 OIDC 组路径解析，预示未来 AI CLI 工具将不再绑定单一模型供应商，企业选型时应优先考虑多云兼容与身份认证标准（OIDC/SAML）支持。

2. **代理编排层下沉至 CLI**：Gemini CLI 的子代理恢复、OpenClaw 的 ACP 成本归属、Claude Code 的云端会话持久化编排，表明“代理工作流”正从 Web 界面下沉到命令行，开发者需要关注子代理状态可见性、任务中断恢复与跨代理成本追踪能力。

3. **桌面端集成是下一个竞争点**：OpenCode 内置桌面浏览器、Hermes 发布 macOS Apple Silicon DMG、OpenClaw 支持深度链接（openclaw://session），AI CLI 正从终端工具向桌面操作系统深度集成方向演进，跨平台终端兼容性（ConEmu、WSL2、Wayland）将成为用户留存关键。

4. **安全门控从“事后审计”转向“事前拦截”**：Hermes 对 `browser_exec` 纳入审批流程、Claude Code 修复插件更新“失败即放行”、Gemini CLI 加固 A2A 服务器认证，反映行业共识：AI 代理执行主机操作前必须经过可审计的审批门控，企业采购时应重点评估工具的权限模型与审计日志能力。

5. **Alpha/Canary 版本成为常态化发布形态**：OpenAI Codex 与 Hermes 均以 Alpha/Canary 版本高频迭代，稳定版发布周期拉长。技术决策者应建立“灰度发布—回归测试—全量推送”的内部机制，避免直接将前沿版本部署到生产环境。

**建议**：对于企业级落地，优先考虑 Claude Code（多云合规）与 OpenClaw（ACP 成本管控）；对于个人开发者与自动化极客，OpenCode 与 Gemini CLI 的功能迭代更快，但需做好版本锁定与回滚准备；DeepSeek 系列工具当前社区活跃度不足，建议观望。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-24）

## 1. 热门 Skills 排行

基于 PR 活跃度与社区讨论热度，以下为关注度最高的 8 个 Skills 相关 PR：

| 排名 | PR | Skill 名称 | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|-----|-----------|---------|-------------|------|------|
| 1 | #1742 | **mcp-builder** | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入路径变更及自定义 HTTP 头配置问题 | MCP 协议版本兼容性是社区痛点，直接影响技能构建器的可用性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 | **skill-creator** | 隔离触发评估（trigger evals），修复 Windows 子进程管道及运行时失败误报 | 触发机制可靠性影响所有自定义 Skill 的质量，Windows 兼容性讨论集中 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 | **notion-spec-to-implementation** / **quantitative-resume-auditor** | 将 Notion 产品/技术规格拆解为可执行任务；定量简历审计 | 企业级文档转工作流与简历审计是两个独立但高需求的垂直场景 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1980 | **webapp-testing** | 移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用测试技能的安全加固，社区对供应链安全关注度高 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 | **docx** | LibreOffice 超时改为报错，并验证输出 DOCX 无修订痕迹 | 文档自动化处理的鲁棒性问题，影响 docx 技能在生产环境的可信度 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 | **proofcore-contract-auditor** | Solidity/Rust 智能合约静态分析，并将审计证明锚定至 TON 区块链 | Web3 安全审计是新兴垂直领域，区块链锚定机制引发技术讨论 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 7 | #525 | **pyxel** | 复古游戏开发（Python），支持头less 运行、帧检测与状态验证 | 游戏开发类技能在社区中具有长尾关注度，更新周期长但持续受关注 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| 8 | #2019 | **xlsx** | 修复工作表级定义名称与外部链接别名解析，减少误报 | Excel 自动化处理的边界场景修复，企业数据处理技能的细节打磨 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/2019) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并至主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向与改进诉求如下：

### 核心需求方向
1. **工作流自动化与企业协作**
   - 组织内技能共享（Issue #228）：用户希望在 Claude.ai 内直接实现 org-wide 技能共享，避免手动下载/上传 .skill 文件。
   - Notion 规格转实现（PR #1245）：产品规格到可执行任务的自动化拆解。

2. **代码审查与安全治理**
   - 智能合约审计（PR #1771）：Solidity/Rust 静态分析 + 区块链锚定证明。
   - Agent 治理模式（Issue #412）：策略执行、威胁检测、信任评分与审计追踪。
   - 文档技能质量控制（PR #514）：AI 生成文档的排版质量（孤行、寡妇段、编号对齐）。

3. **测试生成与质量保障**
   - Web 应用测试安全加固（PR #1980）：避免 `shell=True` 引入的命令注入风险。
   - 技能触发评估可靠性（Issue #556, #1352）：`run_eval.py` 触发率为 0 及多 worker 下 UUID 交叉匹配导致假阴性，亟需修复。

4. **文档与多媒体处理**
   - Markdown 转视频/音频（PR #1703）：零成本将 Markdown 编译为带人声旁白的 MP4。
   - DOCX/XLSX/PPTX 文档处理（PR #1792, #1734, #2019）：办公文档自动化的鲁棒性与边界场景修复。

### 共性痛点
- **技能触发机制不稳定**：多个 Issues 指向 `run_eval.py` 和触发评估的误报/漏报问题。
- **信任边界与命名空间**：社区技能冒用 `anthropic/` 命名空间（Issue #492），导致用户可能误授予过高权限。
- **技能重复与碎片化**：不同插件安装相同内容导致重复技能（Issue #189）。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，且解决了社区明确痛点，大概率近期落地：

| PR | 技能 | 合并潜力分析 | 状态 | 链接 |
|----|------|-------------|------|------|
| #1681 | **skill-creator** | 修复 `package_skill.py` 直接执行失败及过时路径引用，直接影响社区自行打包新技能的能力，更新至 2026-11-19，活跃度高 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1681) |
| #1950 | **claude-api** | 更新 Python `pause_turn` 运行器指导，适配 SDK 1.1.0 自动恢复特性，涉及核心技能的上下文管理 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1950) |
| #1980 | **webapp-testing** | 消除 `shell=True` 命令注入漏洞，安全类修复通常优先级较高 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| #1742 | **mcp-builder** | 适配 MCP 2.0 协议变更，影响所有基于 MCP 构建的技能，兼容性修复具有紧迫性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| #1298 | **skill-creator** | 修复触发评估在 Windows 上的失效及运行时误报，直接关系到技能创建流程的可靠性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建一个可信、可靠且易于共享的技能生态——即通过修复触发机制、消除安全隐患、统一命名空间与提升跨平台兼容性，降低社区贡献与企业级采用的门槛。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-24  
**数据来源**: github.com/anthropics/claude-code  
**定位**: AI 开发工具技术分析

---

## 1. 今日速览

Claude Code 发布 v2.1.331，重点扩展了多云平台的 Code Mode 支持（Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry 及 AWS Claude Platform），并为网关引入了 OIDC 组路径解析能力。社区方面，RTL（右至左）语言支持、跨平台后台任务清理、插件更新安全性以及自动压缩循环等问题成为开发者关注焦点，Windows 和 Linux 平台的稳定性问题尤为突出。

---

## 2. 版本发布

### v2.1.331
- **多云 Code Mode 支持**：在终端会话中新增对 Amazon Bedrock、Google Cloud 的 Agent Platform、Microsoft Foundry 以及 AWS 上 Claude Platform 的 Code Mode 支持，进一步拓展企业级部署选项。
- **OIDC 网关增强**：为 Claude apps gateway 新增 `oidc.groups_jsonpath` 配置，支持从匹配对象列表的子条目中读取组信息，优化联合身份认证下的权限粒度控制。

[查看完整 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.331)

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心标签 | 评论/👍 | 关注理由 |
|---|------|----------|---------|----------|
| [#38005](https://github.com/anthropics/claude-code/issues/38005) | RTL (Right-to-Left) Support for Hebrew & Arabic in Claude Desktop / Cowork | `enhancement`, `area:a11y`, `area:cowork`, `area:desktop` | 49 / 99 | 社区讨论最活跃的无障碍/国际化需求，涉及希伯来语与阿拉伯语界面支持，👍数最高，反映全球化用户诉求强烈。 |
| [#96326](https://github.com/claude-code/issues/96326) | Replies drift into English despite Japanese CLAUDE.md rule | `bug`, `platform:linux`, `area:model` | 25 / 42 | 长会话中模型语言切换不稳定，CLAUDE.md 规则未生效，影响非英语用户的可用性，属于模型行为一致性问题。 |
| [#45361](https://github.com/claude-code/issues/45361) | Cannot purchase API credits - Stripe declines despite 3DS pass | `bug`, `invalid` | 24 / 9 | 计费与支付链路问题，银行已通过 3DS 验证但 Stripe 拒绝，直接影响用户充值与续费体验。 |
| [#101012](https://github.com/claude-code/issues/101012) | [Windows] TaskStop leaves orphaned Git Bash child processes | `bug`, `has repro`, `platform:windows`, `area:bash` | 10 / 2 | 后台任务终止后残留 grep/find/du/sleep 等进程，属于回归性稳定性问题，Windows 用户受影响明显。 |
| [#88094](https://github.com/claude-code/issues/88094) | Remote Control Being Turned on by Default | `bug`, `regression`, `platform:windows`, `area:tui` | 9 / 10 | 远程控制功能默认开启引发安全与隐私担忧，回归缺陷，需尽快修复或提供明确的默认关闭选项。 |
| [#104506](https://github.com/claude-code/issues/104506) | Desktop Code sidebar: sessions per group "Show more" setting | `enhancement`, `platform:macos`, `area:ui`, `area:desktop` | 9 / 11 | 桌面端会话分组展示优化需求，社区希望获得更灵活的 UI 配置，反映桌面应用使用频率提升。 |
| [#97847](https://github.com/claude-code/issues/97847) | Synced plugin update moves plugin folder to .trash; hooks fail open | `bug`, `has repro`, `area:security`, `area:hooks`, `area:plugins` | 4 / 0 | 插件自动更新时将旧版本移至废纸篓导致钩子“失败即放行”（fail open），存在安全风险，macOS 用户已复现。 |
| [#108987](https://github.com/claude-code/issues/108987) | Removing `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` doesn't stop autocompact loop | `bug`, `platform:windows`, `area:core`, `area:desktop` | 4 / 0 | 核心配置更改后不会立即生效，需重启应用才能停止自动压缩循环，影响会话稳定性与配置可管理性。 |
| [#103124](https://github.com/claude-code/issues/103124) | Cloud session as persistent orchestrator for Remote Control CLI | `enhancement`, `area:claude-code-web` | 4 / 3 | 社区希望将云端会话作为远程控制 CLI 的持久化编排层，支持双向消息与完成事件，指向更复杂的多代理工作流。 |
| [#97834](https://github.com/claude-code/issues/97834) | Desktop PR monitor loops on GraphQL NOT_FOUND (~5000/h) | `bug`, `has repro`, `platform:linux`, `area:desktop` | 3 / 0 | PR 监控器陷入 GraphQL 请求死循环，每小时约 5000 次 NOT_FOUND，进而耗尽 GitHub REST 与 GraphQL 双重限额，严重影响 Linux 桌面端可用性。 |

---

## 4. 重要 PR 进展

过去 24 小时内仅有 2 条 PR 更新，社区贡献相对平静：

| # | 标题 | 状态 | 作者 | 说明 |
|---|------|------|------|------|
| [#11713](https://github.com/anthropics/claude-code/pull/11713) | feat: Add developer-utilities plugin | CLOSED | @adamkwhite | 新增 `developer-utilities` 插件，提供 5 条社区请求的命令；会话管理与技能初始化相关命令已移除（原生功能已覆盖）。 |
| [#95698](https://github.com/anthropics/claude-code/pull/95698) | fix(plugins): run ralph-wiggum and output-style .sh hooks through bash with a quoted path | OPEN | @claude[bot] | 修复三个内置插件的 hook 路径未加引号问题，通过 bash 执行 quoted path，解决特殊字符路径下的 hook 执行失败。关联 #95673、#78490。 |

> **注**：PR 活动较少，社区近期更多集中在 Issue 反馈与 Bug 报告，而非代码贡献。

---

## 5. 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

1. **多语言与 RTL 无障碍支持**：#38005（希伯来语/阿拉伯语 RTL）与 #107185（RTL 渲染错位）集中反映非拉丁文字用户对桌面端与 Cowork 界面的适配需求。
2. **远程控制与云端编排**：#103124（云端会话作为持久化编排层）与 #88094（远程控制默认开启）显示开发者希望在 CLI 与云端会话之间构建更稳定、可控的双向通信机制。
3. **桌面端 UI 细粒度配置**：#104506（侧边栏会话分组显示数量）与 #111224（Projects 线程视图主题）表明桌面应用用户希望获得更多界面个性化选项。
4. **跨平台后台任务与进程管理**：#101012（Windows 孤儿进程）与 #105443（Linux 沙箱重复绑定导致 Bash 失效）指向跨平台工具链稳定性的普遍痛点。

---

## 6. 开发者关注点（痛点与高频需求）

### 高频痛点
- **跨平台稳定性**：Windows 上后台任务杀除不干净（#101012）、远程控制默认开启（#88094）；Linux 上 PR 监控器耗尽 API 限额（#97834）、沙箱重复挂载导致 Bash 全面失效（#105443）；macOS 上插件更新导致钩子失效（#97847）及 Keychain 访问崩溃（#106288）。
- **配置即时生效问题**：#108987 显示修改 `settings.json` 后部分环境变量不会在运行中会话立即生效，需重启应用，影响调试效率。
- **计费与支付链路**：#45361 反映 Stripe 支付被拒的排查困难，用户无法正常购买 API 额度。

### 高频需求
- **非英语语言一致性**：#96326 等问题表明 CLAUDE.md 语言规则在长会话中易失效，模型会切回英语，亟需加强系统提示词的优先级执行。
- **插件与钩子安全性**：#97847 暴露插件自动更新时的“失败即放行”风险，社区期望更严格的插件生命周期管理与回滚机制。
- **远程协作编排**：#103124 等需求指向将 Claude Code 纳入更大规模多代理/远程工作流的编排需求。

---

**分析师总结**：本周 Claude Code 社区活跃度集中在稳定性修复与国际化扩展上。v2.1.331 的多云发布是企业级落地的积极信号，但 Windows/Linux/macOS 平台的回归性 Bug 与插件安全问题仍需团队优先处理。建议关注 #38005 与 #97847 的后续进展，它们分别代表社区最强烈的功能诉求与最高优先级的安全隐患。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-24  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

Codex 社区近24小时集中爆发了大量 Windows 桌面端与 macOS 客户端的稳定性问题，其中“应用启动后数秒冻结”、“本地/云端环境选择器消失”以及“权限选择器失效”等问题引发开发者广泛关注。与此同时，Rust 端持续发布 alpha 版本（v0.171.0-alpha.13.2 / v0.172.0-alpha.2.1），CLI 与 TUI 领域也有多项性能优化与体验修复 PR 合并。安全过滤误报与模型提前终止任务的问题仍是社区长期关注的痛点。

---

## 2. 版本发布

过去24小时内发布了两个 Rust 端 alpha 版本，均为预发布迭代，未附详细变更日志：

| 版本 | 标签 | 说明 |
|------|------|------|
| rust-v0.172.0-alpha.2.1 | `0.172.0-alpha.2.1` | Rust 端最新 alpha 版本 |
| rust-v0.171.0-alpha.13.2 | `0.171.0-alpha.13.2` | Rust 端前一版本 alpha 迭代 |

> 建议追踪 Rust 工具链的开发者留意后续稳定版发布说明，当前版本仍处于 alpha 阶段，可能包含破坏性变更。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数）及问题严重性筛选，涵盖桌面端、移动端、CLI/TUI 及安全策略等核心领域。

| # | 标题 | 状态 | 评论/👍 | 核心问题与重要性 | 链接 |
|---|------|------|---------|------------------|------|
| #59546 | [Desktop] 内置自动化限制阻止外部 Web 系统监控任务，与 Scheduled tasks 文档冲突 | OPEN | 28 / 27 | 自动化策略与官方文档不一致，直接影响依赖 Codex 进行外部 Web 监控的自动化工作流，社区讨论最活跃。 | https://github.com/openai/codex/issues/59546 |
| #17793 | [TUI] Backspace 似乎会删除多个字符，使输入变得困难 | CLOSED | 24 / 6 | CLI/TUI 端基础输入体验缺陷，虽已关闭但反映终端交互稳定性仍需关注。 | https://github.com/openai/codex/issues/17793 |
| #62975 | [Windows] 发送第一条消息后权限选择器消失；Work 主页强制 Cloud/TPP，无 Local 选项 | OPEN | 19 / 8 | Windows 桌面端核心交互异常，用户无法在本地与云端环境间切换，严重影响 Work 模式下的本地开发流程。 | https://github.com/openai/codex/issues/62975 |
| #63042 | [Windows] Work Local/Cloud 选择器在线时消失，离线时重现（v26.1117.41037） | OPEN | 15 / 9 | 与上述权限选择器问题相关，进一步证实 Windows 端环境选择器存在网络状态相关的回归缺陷。 | https://github.com/openai/codex/issues/63042 |
| #63123 | Windows 桌面应用启动约 3 秒后冻结 | OPEN | 12 / 0 | 严重可用性问题，应用几乎不可用，事件日志显示 `Application Hang`，需优先修复。 | https://github.com/openai/codex/issues/63123 |
| #54746 | Codex Windows: CreateProcess 被策略拒绝，尽管已授予 Full Access | OPEN | 13 / 1 | Windows 沙箱/权限策略阻止进程创建，影响本地命令执行与自动化任务。 | https://github.com/openai/codex/issues/54746 |
| #37161 | 网络安全请求过滤存在严重误报 | OPEN | 10 / 3 | 合法的软件工程与安全研究任务（静态分析、模糊测试、漏洞检测等）被误拦截，影响安全从业者正常使用。 | https://github.com/openai/codex/issues/37161 |
| #56822 | 内置浏览器打开，但 Agent 无法控制它 | OPEN | 10 / 0 | 浏览器自动化核心功能失效，影响依赖 Codex 进行 Web 操作的 Agent 工作流。 | https://github.com/openai/codex/issues/56822 |
| #62899 | iOS 打开 Codex 标签页崩溃：SwiftUI metadata EXC_BAD_ACCESS（iOS 27.2 Beta） | OPEN | 6 / 5 | 移动端回归缺陷，iOS 客户端无法进入 Codex 功能，桌面端正常，提示跨平台同步存在问题。 | https://github.com/openai/codex/issues/62899 |
| #63434 | GPT-6.2 SOL 在批准的任务未完成前反复停止 | OPEN | 3 / 0 | 模型行为异常，代理在仍有可执行工作时提前终止，影响任务自动化完成率。 | https://github.com/openai/codex/issues/63434 |

---

## 4. 重要 PR 进展（精选 10 条）

过去24小时内合并了约 50 个 PR，绝大多数由 `copyberry[bot]` 提交，聚焦于性能优化、后端稳定性、TUI 体验及 Statsig 等基础设施。以下选取对开发者体验影响更直接的 10 条：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #63471 | 加速活跃控制器下的远程控制重连 | CLOSED | 将 WebSocket 断连检测从 60 秒缩短至 30 秒，减少控制器等待主机恢复的时间。 | https://github.com/openai/codex/pull/63471 |
| #63468 | 在无全局默认值的情况下遵循显式插件禁用 | CLOSED | 修复插件激活策略忽略 `enabled = false` 的问题，使 CLI 显示的远程插件状态与实际生效状态一致。 | https://github.com/openai/codex/pull/63468 |
| #63462 | 在远程执行中支持模型和推理努力覆盖 | CLOSED | `codex exec --remote` 现接受 `--model`、`-c model=...` 和 `-c model_reasoning_effort=...`，无需在 App Server 侧单独配置。 | https://github.com/openai/codex/pull/63462 |
| #63461 | 请求省略初步推理密文 | CLOSED | 默认在 Responses API 请求头中排除 `reasoning.added.encrypted_content`，减少不必要的推理回放数据传输。 | https://github.com/openai/codex/pull/63461 |
| #63460 | 应用补丁时避免冗余缓冲区拷贝 | CLOSED | 优化文件系统写入路径，仅在初始写入或重试创建缺失父目录时分配字节向量，降低内存拷贝开销。 | https://github.com/openai/codex/pull/63460 |
| #63458 | 发送前避免克隆实时对话事件 | CLOSED | 减少实时对话事件在发送路径中的克隆操作，降低延迟与 CPU 开销。 | https://github.com/openai/codex/pull/63458 |
| #63456 | 在 NFS 上延迟分页线程历史更新 | CLOSED | 对本地线程的分页历史在 NFS 上的 SQLite 更新进行延迟处理，缓解回滚日志模式下的锁竞争。 | https://github.com/openai/codex/pull/63456 |
| #63448 | 向 Codex 后端客户端添加 Statsig 引导 | CLOSED | 暴露 `Client::statsig_bootstrap` 等接口，允许调用方使用现有身份验证获取服务端评估的 Statsig 值。 | https://github.com/openai/codex/pull/63448 |
| #63445 | 保持 TUI Logo 在不同终端单元尺寸下的宽高比 | CLOSED | 根据终端像素与网格尺寸等比例缩放 Logo，避免在非正方形终端单元下出现拉伸。 | https://github.com/openai/codex/pull/63445 |
| #63444 | 在 TUI 转录中解析子代理昵称 | CLOSED | 后台查找缺失的子代理昵称并刷新转录，避免显示原始线程 ID，提升多代理任务的可观测性。 | https://github.com/openai/codex/pull/63444 |

---

## 5. 功能需求趋势

从近期 Issues 中可提炼出社区最关注的四个功能方向：

1. **跨平台桌面端稳定性（Windows/macOS/iOS）**  
   Windows 端环境选择器消失、应用启动后冻结、CreateProcess 被策略拒绝；macOS 端听写超时、渲染器重新加载；iOS 端 Codex 标签页崩溃。桌面端与移动端的可用性已成为最高优先级。

2. **Agent 自动化与浏览器控制能力**  
   内置浏览器无法被 Agent 控制、自动化限制与文档冲突、外部 Web 系统监计任务受阻，表明开发者希望 Codex 在 Web 自动化和跨系统编排方面拥有更强、更明确的能力。

3. **安全策略与误报机制优化**  
   网络安全请求过滤误报严重，合法的静态分析、模糊测试、漏洞检测等任务被拦截。社区呼吁提供更细粒度的安全策略配置或“授权安全工作”豁免通道（如 Daybreak 计划）。

4. **模型行为与任务完成可靠性**  
   GPT-6.2 SOL 等模型在任务未完成前提前停止，以及子代理编排中父代理自动唤醒需求（#61901），反映开发者对代理任务可靠性、上下文管理和多代理协作的期待正在提升。

---

## 6. 开发者关注点

**高频痛点总结：**

- **Windows 客户端权限与沙

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-24)

## 今日速览

Gemini CLI 今日发布夜间版本 `v0.71.0-nightly.20261123`，社区围绕子代理（Subagent）稳定性与浏览器代理兼容性展开密集讨论。多个 P1 级别 Bug 指向代理挂起、配置覆盖失效及崩溃问题，而安全加固与核心工具链修复成为 PR 主战场。

## 版本发布

- **v0.71.0-nightly.20261123.geecccfcd5**  
  夜间构建版本，包含自上一夜间版本以来的全部变更。  
  [完整变更日志](https://github.com/google-gemini/gemini-cli/compare/v0.71.0-nightly.20261122.geecccfcd5...v0.71.0-nightly.20261123.geecccfcd5)

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 核心关注点 | 链接 |
|---|------|------------|-----------|------|
| #22323 | Subagent recovery after MAX_TURNS reported as GOAL success | P1 / Bug | 子代理在达到最大轮次后仍误报 `status: "success"`，掩盖中断，导致上层任务误判完成。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent hangs | P1 / Bug | 通用代理在处理简单操作（如创建文件夹）时无限挂起，用户需手动取消，严重影响可用性。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 / Enhancement | 提议利用模型原生 Bash 亲和力，通过零依赖 OS 沙箱增强代理操作系统能力，兼顾安全与 UX。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 探索 AST 感知的文件读取、搜索与代码映射，以减少上下文噪声并提升代码定位精度。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini does not use skills and sub-agents enough | P2 / Bug | 模型主动调用自定义技能与子代理的意愿不足，需显式指令才会触发，影响自动化体验。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #22267 | Browser Agent ignores settings.json overrides | P2 / Bug | 浏览器代理完全忽略全局/项目级 `settings.json` 中的 `maxTurns` 等配置覆盖。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/22267) |
| #21983 | browser subagent fails in wayland | P1 / Bug | 浏览器子代理在 Wayland 显示服务器下失败，终止原因为 GOAL，跨平台兼容性存疑。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #24246 | Gemini CLI encounters 400 error with > 128 tools | P2 / Bug | 当可用工具超过 128 个时出现 400 错误，建议智能限制工具作用域。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/24246) |
| #22186 | get-shit-done output hook causes crash | P1 / Bug | 输出钩子在打印用户摘要时导致 CLI 崩溃，影响长任务完成后的反馈闭环。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/22186) |
| #22232 | Enhance browser_agent resilience: Automatic session takeover and lock recovery | P3 / Feature | 浏览器代理在遇到锁定配置文件时采用“快速失败”策略，缺乏自动会话接管与锁恢复机制。 | [查看详情](https://github.com/google-gemini/gemini-cli/issues/22232) |

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #30423 | chore(deps): bump npm-dependencies group (69 updates) | OPEN | 依赖大规模升级，涉及 `simple-git`、`@octokit/rest` 等 69 个包，保持生态兼容性。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/30423) |
| #30420 | fix(a2a-server): enforce bearer token authentication | CLOSED | 为 A2A 服务器配置环境变量驱动的 Bearer Token 认证，并对任务创建与恢复接口加强输入校验。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/30420) |
| #30415 | fix(core): add a time limit to web search | OPEN | 为 `google_web_search` 工具增加请求时限，防止模型请求卡死导致代理无限挂起（关联 #29594）。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/30415) |
| #30417 | fix(a2a-server): enforce HTTP auth, harden createTask trust | OPEN | 修复 A2A 服务器三处安全漏洞：强制 Bearer Token 认证、校验 Host/Origin、防止恢复路径遍历。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/30417) |
| #30418 | fix(core): do not stringify a non-string part text | OPEN | 修复 `appendToLastTextPart()` 在处理非字符串部分文本时的拼接问题，避免提示构建异常。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/30418) |
| #30419 | fix(core): mark folders whose contents were never scanned as truncated | OPEN | 修复 `getFolderStructure()` 在预算耗尽时未正确标记文件夹为截断的问题，提升工作区扫描准确性。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/30419) |
| #30268 | fix(core): respect active YOLO mode in taint and build file checks | OPEN | 使污点检查与构建文件保护尊重活跃 YOLO 模式，避免自主运行时被确认提示或策略违规阻断。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/30268) |
| #30305 | docs(extensions): stop recommending an excludeTools form that never matches | OPEN | 修正扩展文档中 `excludeTools` 的错误用法，该形式实际不会匹配任何工具名。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/30305) |
| #29822 | fix(core): cap total_max_matches and clarify context overflow message | OPEN | 为广泛的 `SearchText` 查询增加总匹配数上限，并优化上下文溢出提示信息。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/29822) |
| #30306 | fix(core): skip subdirectories removed mid-scan without warning | OPEN | 工作区扫描时若子目录在扫描中间消失，不再记录 `ENOENT` 警告，减少无关日志噪声。 | [查看详情](https://github.com/google-gemini/gemini-cli/pull/30306) |

## 功能需求趋势

从近期 Issues 与 PR 可观察到以下社区关注方向：

1. **子代理（Subagent）稳定性与可见性**：多个 P1/P2 Bug 指向子代理状态误报、挂起、配置不生效，以及轨迹不可共享（`/chat share` 不可见）。社区亟需更可靠的子代理生命周期管理与调试能力。
2. **AST 感知的代码工具**：围绕 AST-aware 文件读取、搜索与代码映射的议题较多，开发者希望通过更精确的代码结构理解来降低 Token 消耗并提升定位准确率。
3. **浏览器代理跨平台与韧性**：Wayland 兼容性、会话锁恢复、自动接管等需求表明，浏览器子代理正成为增强自动化能力的重点领域。
4. **安全与认证加固**：A2A 服务器的 Bearer Token 认证、输入校验、路径遍历防护等 PR 密集出现，说明社区对 MCP/A2A 接口的安全性要求正在提升。
5. **YOLO 模式与策略引擎**：对 `--approval-mode=yolo` 的支持正在深化，开发者期望在自主交互与头less 运行中减少不必要的确认中断。

## 开发者关注点

- **代理挂起与崩溃**：通用代理无限挂起（#21409）、输出钩子导致崩溃（#22186）以及 Web 搜索无时限导致的卡死（#30415 修复中）是当前最高优先级的可用性痛点。
- **配置覆盖不一致**：浏览器代理忽略 `settings.json` 覆盖（#22267）、Symlink 代理未被识别（#20079）等问题反映出配置系统在不同代理类型间的执行不一致。
- **工具数量限制**：超过 128 个工具时触发 400 错误（#24246），提示工具注册与上下文注入机制需要更好的分页或作用域控制。
- **文档与开发者体验**：扩展文档中的 `excludeTools` 示例失效（#30305）、内部链接损坏（#30375）等问题表明，社区对文档准确性与开发者上手体验持续关注。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-24)

## 今日速览

OpenCode 连续发布 v2.4.0 与 v2.4.1 两个版本，重点引入内置桌面浏览器并修复 macOS 12 会话持久化问题。社区围绕 v2.4.x 版本的稳定性展开广泛讨论，Windows/Linux 终端兼容性、MCP OAuth 认证、后台服务会话恢复等问题成为今日核心关注点。

## 版本发布

### v2.4.1
- **macOS 12 Session Fix**：修复旧版 SQLite 下助手消息无法保存的会话问题 ([#65771](https://github.com/anomalyco/opencode/pull/65771))
- **Config-Only Providers Show Their Models**：仅在配置中设置的提供商（如 Ollama）现在能正确显示其模型列表

### v2.4.0
- **Built-In Desktop Browser**：内置桌面浏览器，支持从 Chrome、Edge、Firefox、Safari 导入登录态与浏览历史，并可安装 Chromium/Chrome/Edge 扩展。所有数据保存在单一持久化桌面配置文件中，聊天链接可保持登录状态，标签页支持跨会话恢复

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 核心内容与社区反应 | 链接 |
|---|------|------|-------------------|------|
| #65799 | OpenCode Crashes and it's unreliable | CLOSED (pending close) | 从 2.3.2 升级到 2.4.0 后，切换会话时界面空白且服务重启，20 条评论显示用户普遍遇到稳定性回退，是今日讨论量最大的问题。 | [查看](https://github.com/anomalyco/opencode/issues/65799) |
| #55076 | Background service resumes standalone sessions without permissions | OPEN | 后台服务在 `opencode run --standalone` 进程结束后仍会恢复会话，且丢失权限与步数限制，曾导致 1,660 步、约 $24 的失控消耗，标记为 `severity:high`，安全与成本风险高。 | [查看](https://github.com/anomalyco/opencode/issues/55076) |
| #58080 | macOS Local Network Privacy blocks LAN access | OPEN | macOS 15+ 上后台服务无法连接 LAN 地址（192.168.x.x 等），建议通过签名 .app 包修复，持续影响局域网部署场景。 | [查看](https://github.com/anomalyco/opencode/issues/58080) |
| #49986 | FEATURE: Add native V2 replacement for provider model filtering | OPEN | 社区请求在 V2 中恢复 V1 的 per-provider model whitelist/blacklist 功能，已有 5 个点赞，反映对模型访问控制的细粒度需求。 | [查看](https://github.com/anomalyco/opencode/issues/49986) |
| #65863 | Remote MCP OAuth fails against Figma | CLOSED | Figma 远程 MCP 服务器因 DCR 发送的 `client_name` 为 "OpenCode" 被允许名单拒绝（403），`dev` 分支已有小写修复但未发布，影响 MCP 生态兼容性。 | [查看](https://github.com/anomalyco/opencode/issues/65863) |
| #65832 | ConEmu+Far: colors distorted, tabs not work | CLOSED | Windows 上从 2.3.2 升级到 2.4.0 后，ConEmu 终端颜色混乱且标签页失效，属于跨平台终端兼容性回归问题。 | [查看](https://github.com/anomalyco/opencode/issues/65832) |
| #65894 | Mouse clicks fail in 2.4.1 on ConEmu / Windows | CLOSED | 2.4.1 在 Windows Build 17763 的 ConEmu 中鼠标点击失效（标签页点击不可用），滚动正常，影响桌面端可用性。 | [查看](https://github.com/anomalyco/opencode/issues/65894) |
| #65913 | TUI on WSL2: clipboard copy works, paste does nothing | OPEN | v2.4.1 在 WSL2/Windows Terminal 中选中文本显示“已复制”，但 Ctrl+V 无法粘贴，且禁用鼠标捕获会破坏回滚，影响跨平台剪贴板体验。 | [查看](https://github.com/anomalyco/opencode/issues/65913) |
| #65814 | TUI: goal view cuts off long content | CLOSED | TUI 目标视图长内容被截断且不可滚动，导致部分目标不可读，已在 v2.4.0 中出现并随 PR 修复。 | [查看](https://github.com/anomalyco/opencode/issues/65814) |
| #64464 | Plugin reloading leaves tool list inconsistent | OPEN | 插件原地重载后，`ctx.tool.list()` 与 `ctx.plugin.list()` 状态不一致，短时间内工具缺失，影响插件开发者体验。 | [查看](https://github.com/anomalyco/opencode/issues/64464) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #65836 | feat(core): generate opencode skill API reference from openapi.json | OPEN | 启用 `opencode_api` 时，内置 `opencode` 技能将从 `openapi.json` 生成 HTTP API 参考，帮助 Agent 精确定位 `opencode:///api/...` 调用。 | [查看](https://github.com/anomalyco/opencode/pull/65836) |
| #65919 | chore: upgrade opentui v0.9.9 | CLOSED | 升级 opentui 至 v0.9.9，修复 #65832、#65894、#65766 等多个 TUI 终端兼容性崩溃问题。 | [查看](https://github.com/anomalyco/opencode/pull/65919) |
| #65912 | fix(app): show app menu in side tabs header on Linux | CLOSED | 修复 Linux 桌面端侧边标签/Inbox 布局下缺少设置、帮助等菜单按钮的问题（关联 #65864）。 | [查看](https://github.com/anomalyco/opencode/pull/65912) |
| #65925 | fix(tui): revert to default theme when theme removed | CLOSED | 修复从 `cli.json` 移除 `theme` 后未回退到默认主题的问题（关联 #64420）。 | [查看](https://github.com/anomalyco/opencode/pull/65925) |
| #65906 | fix(tui): make goal dialog content scrollable | CLOSED | 使 TUI 目标对话框内容可滚动，解决长目标被截断问题（关联 #65814）。 | [查看](https://github.com/anomalyco/opencode/pull/65906) |
| #65920 | fix(tui): scroll long goal dialog content | CLOSED | 另一份针对目标对话框长内容滚动的修复 PR，与 #65906 同一问题的不同实现。 | [查看](https://github.com/anomalyco/opencode/pull/65920) |
| #65918 | fix(tui): stop idle terminals from overwriting session env | OPEN | 修复两个终端共享会话时，空闲终端会覆盖发送提示的终端的会话环境变量问题（关联 #65883）。 | [查看](https://github.com/anomalyco/opencode/pull/65918) |
| #65909 | fix(core): keep plugin list consistent during reload | OPEN | 插件原地重载期间保持插件列表与实时状态一致，修复工具列表不一致问题（关联 #64464）。 | [查看](https://github.com/anomalyco/opencode/pull/65909) |
| #65899 | fix(core): hide tools when narrow denies trail a blanket deny | CLOSED | 修复被完全拒绝的技能工具仍出现在模型工具列表中，避免不必要的模型调用与权限拒绝步骤（关联 #65892）。 | [查看](https://github.com/anomalyco/opencode/pull/65899) |
| #65905 | docs: update CLI loopback proxy exclusion guidance | OPEN | 更新网络文档，移除 CLI 回环代理的过时手动排除要求（关联 #65891）。 | [查看](https://github.com/anomalyco/opencode/pull/65905) |

---

## 功能需求趋势

从今日 Issues 与 PR 中可观察到社区关注的四个主要功能方向：

1. **桌面端体验增强**：用户希望 `/btw` 等功能升级为可独立停靠的侧边聊天面板（#60890），并希望评审面板中的 diff 堆叠布局更灵活（#65927），表明桌面应用的多窗口/多面板布局需求在增加。
2. **模型与提供商访问控制**：社区持续请求 V2 原生支持 per-provider 模型白名单/黑名单（#49986），反映企业用户对模型使用管控的细粒度需求。
3. **MCP 生态兼容性**：Figma OAuth 认证失败（#65863）和 SSE 重连 409 处理（#65866）显示，远程 MCP 服务器的身份认证与会话恢复是当前集成痛点。
4. **跨平台终端与剪贴板**：Windows ConEmu、WSL2、Linux 桌面菜单等问题集中爆发，说明跨终端模拟器的一致性（鼠标事件、剪贴板、颜色、标签）是 v2.4.x 版本需要重点兜底的兼容性领域。

---

## 开发者关注点（痛点与高频反馈）

1. **v2.4.x 稳定性回退**：多个用户反馈从 2.3.x 升级到 2.4.0/2.4.1 后出现会话选择器空白、服务重启、鼠标点击失效、颜色异常等问题，升级路径的回归测试不足是社区最大担忧。
2. **后台服务会话生命周期管理**：后台服务在未保留原始权限、步数限制或配置的情况下恢复 `standalone` 会话，存在成本失控与安全风险，需要更严格的会话隔离与权限继承机制。
3. **TUI 可用性细节**：目标视图不可滚动、主题移除后不回退、空闲终端覆盖环境变量

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-24)

## 今日速览

Hermes Agent 于 2026-11-23 发布了 canary 版本 `v0.23.3+canary.20261123T065600Z`，面向 macOS Apple Silicon 提供桌面端安装包。社区近期高度关注会话状态持久性、网关事件循环阻塞（尤其是 Windows 平台）以及多平台集成（Telegram/WhatsApp/AppleScript）等问题，安全与审批机制的细化成为 PR 活跃的主要方向。

## 版本发布

**Hermes Agent v0.23.3+canary.20261123T065600Z**  
- 发布日期：2026-11-23  
- 可下载：Hermes Desktop (macOS, Apple Silicon M-series, DMG)  
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/canary.20261123T065600Z-v0.23.3  

> 注：当前版本存在 `--version` 与启动横幅显示过期发布日期的已知问题（Issue #159217），建议开发者留意后续修复。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 为何值得关注 | 链接 |
|---|------|----------|--------------|------|
| #129129 | `execute_code` 会话内核：`terminal cd` 静默将会话移至新内核 | `cwd` 是内核密钥的一部分，导致“持久会话”承诺在 `project` 模式下被破坏 | 直接影响代码执行工具的核心可靠性，开发者依赖变量与导入跨调用存活 | https://github.com/NousResearch/hermes-agent/issues/129129 |
| #159217 | `--version` 和横幅打印过期发布日期 | `__release_date__` 未更新，v0.23.3 仍显示 2026.9.24 | 版本元数据不一致，影响运维追踪与用户确认当前运行版本 | https://github.com/NousResearch/hermes-agent/issues/159217 |
| #159263 | 多路由网关：`session_search` 在次要配置文件中搜索默认配置文件的会话存储 | 多配置文件复用同一网关时，次要配置文件的会话搜索命中默认存储 | 涉及多租户/多配置文件场景下的数据隔离与安全边界 | https://github.com/NousResearch/hermes-agent/issues/159263 |
| #153063 | Windows 上网关事件循环被同步 I/O 阻塞（6 个配置文件） | SQLite 写入、hosted-rooms 轮询、线程生成导致事件循环冻结，退出码 75 并全天重启 | Windows 平台稳定性瓶颈，严重影响多配置文件网关的可用性 | https://github.com/NousResearch/hermes-agent/issues/153063 |
| #159061 | Windows 上 lefthook pre-commit 模板损坏，每次提交需 `--no-verify` | Python 任务在解析 `just` 模板时出现 shell 语法错误，钩子退出码 2 | 阻塞 Windows 开发者的常规提交流程，影响社区贡献效率 | https://github.com/NousResearch/hermes-agent/issues/159061 |
| #110610 | 通过 `config.yaml` 增加读取池最大大小配置 | `_READ_POOL_MAX` 硬编码，高并发网关（50+ 标签页）降级为写锁 | 高并发网关运维的性能调优需求，社区长期关注的配置化议题 | https://github.com/NousResearch/hermes-agent/issues/110610 |
| #156560 | 只读提供者目录模式阻止快照发布与清理 | `shutil.copytree` 保留源目录权限，只读源导致副本不可写，清理忽略移除错误 | 涉及插件/提供者快照生命周期管理，可能导致磁盘空间泄漏 | https://github.com/NousResearch/hermes-agent/issues/156560 |
| #159391 | Worker 运行状态为 "unknown" 并崩溃循环，当代理以 `kanban_request_review` 结束回合 | 看板审查作为 worker 终止结果未被运行生命周期正确处理 | 影响看板工作流的自动化闭环，属于新近出现的运行时缺陷 | https://github.com/NousResearch/hermes-agent/issues/159391 |
| #159396 | 主机内存压力导致所有托管看板工作者同时丢失并阻塞卡片 | `MemAvailable` 低于 5% 且交换空间填满后，网关事件循环停滞 >10s | 资源受限环境下的级联故障，对生产环境部署有直接警示意义 | https://github.com/NousResearch/hermes-agent/issues/159396 |
| #159395 | 代理模式定时任务在每次受阻（抑制）触发时泄漏空打开会话 | 会话在预代理门控前创建，门控短路后会话未释放，累积饱和网关事件循环 | 定时任务场景下的会话泄漏，长期运行会导致网关性能退化 | https://github.com/NousResearch/hermes-agent/issues/159395 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #159403 | fix(skills): 按 ID 和单位选择 USDA 营养素 | Bug | 修复 `fitness-nutrition` 技能中 USDA FoodData Central 营养素解析，避免 kJ 与 kcal 混淆导致数值偏差约 4.2 倍 | https://github.com/NousResearch/hermes-agent/pull/159403 |
| #159303 | fix(browser): 将 `browser_exec` 代码如 `execute_code` 脚本一样审批 | Security | `browser_exec` 此前未经过审批门控即在主机进程中执行 `exec()`，现已纳入审批流程，消除未授权主机代码执行风险 | https://github.com/NousResearch/hermes-agent/pull/159303 |
| #159307 | fix(approvals): `suggest` 仅提出已审批的 glob，按个人审批计数 | Security | 修复 `hermes approvals suggest` 可能为危险类（强制推送、反向 shell、网关重启等）生成永久允许列表的问题 | https://github.com/NousResearch/hermes-agent/pull/159307 |
| #159291 | fix(approval): 任何无人值守拒绝在上下文堆叠时优先 | Security | 修复多个无人值守上下文（如 cron 内嵌 chat）时，审批门控错误采用第一个上下文模式的问题 | https://github.com/NousResearch/hermes-agent/pull/159291 |
| #159276 | fix(terminal): `force=True` 不再跳过硬性底线 | Security | 强制模式不再绕过硬命令、运行时自删除、密码管入 `sudo -S` 及 `approvals.deny` 规则 | https://github.com/NousResearch/hermes-agent/pull/159276 |
| #159400 | fix(whatsapp): 将反应关联到被反应消息的文本，允许无需回复 | Bug | WhatsApp 反应现携带被反应消息文本，代理可判断反应对象并选择静默 | https://github.com/NousResearch/hermes-agent/pull/159400 |
| #159401 | fix(whatsapp): 将入站 WhatsApp 事件传递给代理 | Bug | 修复 `eventMessage` 类型事件因 `extractBridgeEvent` 缺乏分支而被丢弃的问题 | https://github.com/NousResearch/hermes-agent/pull/159401 |
| #159398 | fix(kanban): OAuth 桌面远程和浏览器 Webapp 的实时事件流 | Bug | 修复 OAuth 桌面远程与浏览器 Webapp 无法通过插件事件套接字接收看板实时更新，回退到 60s REST 轮询 | https://github.com/NousResearch/hermes-agent/pull/159398 |
| #159399 | fix(steer): 每部分 steer 来源（入队侧）+ 机械哨兵包含 | Security | 增强 steer 来源追踪与工具结果中的哨兵机械包含，提升指令可审计性 | https://github.com/NousResearch/hermes-agent/pull/159399 |
| #159374 | plugin-catalog: 将 agentchat 升级到 0.6.5（所有者 SHA 升级） | Dependency | 社区插件 `agentchatme/agentchat-hermes` 从 0.2.311111 升级至当前发布 v0.6.5 | https://github.com/NousResearch/hermes-agent/pull/159374 |

---

## 功能需求趋势

从近 24 小时的 Issues 与 PR 可观察到以下社区关注方向：

1. **会话状态与内核持久性**  
   多个 Issue 指向 `execute_code` 会话内核、`cwd` 作为内核密钥的一部分、会话泄漏及空会话累积等问题，表明开发者对代码执行环境的稳定性与状态隔离有强烈需求。

2. **跨平台稳定性（Windows / macOS）**  
   Windows 上的网关事件循环阻塞、lefthook 钩子失效、Kanban 工作者批量崩溃，以及 macOS 上 AppleScript 审批与浏览器操作频繁打断，显示跨平台桌面端体验是当前痛点。

3. **安全与审批机制细化**  
   大量 PR 集中在 `approvals`、`steer`、`browser_exec` 审批、`terminal force` 硬底线等安全门控上，社区正在推动更精细、可审计的代理行为控制。

4. **多平台消息集成（Telegram / WhatsApp）**  
   多个 Issue 与 PR 涉及 Telegram 令牌替换后的 `admission_conflict`、WhatsApp 反应与事件传递，说明即时通讯平台作为代理交互入口的使用正在扩大。

5. **配置化与可运维性**  
   读取池大小、`config.yaml` 配置、Cron 任务 AppleScript 预审批等需求，反映运维人员希望通过配置而非代码变更来调优网关行为。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-24)

## 今日速览

OpenClaw 今日发布了 **v2026.11.10-beta.2** 与 **v2026.11.7** 两个版本，重点增强了更新恢复能力与会话/对话恢复机制。社区围绕 **2026.11.x 系列的更新稳定性、Discord 提供商回归及内存索引分片问题** 展开密集讨论，P1 级缺陷与更新失败报告占据热点。

---

## 版本发布

### v2026.11.10-beta.2
- **更新恢复**：包替换中断时保持 OpenClaw 可运行，崩溃或重启后可安全完成下一次更新（#200273, #200366, #200460, #200550, #200994，@fuller-stack-dev）。
- **后台工作可靠性**：保存已完成的后台工作，避免中断导致任务丢失。

### v2026.11.7
- **对话恢复**：Gateway 重启后可恢复中断的回复与子结果，不丢失待处理工作（#198905, #201544, #200924, #200967，@steipete）。
- **可靠自动化**：增强自动化任务在异常情况下的可恢复性。

> 链接：[openclaw/openclaw Releases](https://github.com/openclaw/openclaw/releases)

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 核心内容与重要性 | 链接 |
|---|------|-------------|------------------|------|
| #198958 | memory-core 仅标题分片合并产生 8000 字节 chunk，导致非原生 OpenAI 兼容嵌入端点拒绝（400/1210），中止整个索引重建 | P1, 🦞 diamond lobster, session-state | 影响 RAG/记忆索引重建的核心流程，嵌入端点兼容性问题可能导致大规模索引失败，需紧急修复。 | [查看](https://github.com/openclaw/openclaw/issues/198958) |
| #204226 | 2026.11.7: `openclaw update repair` 在 `finalize:targetConfigConvergence` 处始终失败，状态数据库被 sqlite-maintenance 进程占用 | P1, 🦐 gold shrimp, ux-friction | 直接阻断 2026.11.7 用户的更新修复路径，Gateway 保持停止状态，属于回归缺陷。 | [查看](https://github.com/openclaw/openclaw/issues/204226) |
| #204283 | Discord 提供商升级到 2026.11.7 后无法到达 client init（启用 commands.nativeSkills 时），健康监控重启循环 | P1, 🦪 silver shellfish, message-loss | 导致 Discord 频道无法连接，消息丢失风险高，属于 2026.11.x 系列回归问题。 | [查看](https://github.com/openclaw/openclaw/issues/204283) |
| #130257 | Tasks ledger 无委托 ACP 运行的 token/成本记录，子运行花费无法归属（父轮次 $0.04 vs 子 $14.14） | P2, 🦞 diamond lobster, impact:other | 涉及多代理成本归属与账单透明度，对企业级 ACP 使用场景影响显著。 | [查看](https://github.com/openclaw/openclaw/issues/130257) |
| #116052 | MCP OAuth：支持预注册客户端（authorization_code），针对不支持动态客户端注册的授权服务器 | P2, 🦞 diamond lobster, security, auth-provider | 扩展 MCP 身份验证适配范围，解决企业自建 OAuth 服务器的接入障碍。 | [查看](https://github.com/openclaw/openclaw/issues/116052) |
| #188377 | 孤立的 'running' 会话窗口持续数周，13k 活跃转录事件，无支持命令可结束或归档 | P2, 🦪 silver shellfish, session-state | 长期僵尸会话占用资源且无法清理，影响会话状态管理与系统可维护性。 | [查看](https://github.com/openclaw/openclaw/issues/188377) |
| #204020 | macOS 深度链接路由：打开并聚焦特定会话（openclaw://session） | P2, 🦞 diamond lobster, ux-friction | 桌面端用户体验增强，期望与 Control UI URL 契约保持一致，提升跨应用集成便利性。 | [查看](https://github.com/openclaw/openclaw/issues/204020) |
| #204284 / #204282 | Update failure: requested (2026.11.6)，darwin/arm64，Node 24.22.1 | P2, 🦪 silver shellfish, ux-friction | 多个用户反馈相同版本更新失败，可能存在分发或校验问题，需关注更新管道稳定性。 | [#204284](https://github.com/openclaw/openclaw/issues/204284) / [#204282](https://github.com/openclaw/openclaw/issues/204282) |
| #204276 | npm 重新安装后发布转换隐藏 CLI/Gateway 版本分裂，`update status` 报告 up to date 但未显示活跃发布 | P2, 🦞 diamond lobster, ux-friction | 版本状态显示不一致可能导致运维误判，影响更新可观测性。 | [查看](https://github.com/openclaw/openclaw/issues/204276) |
| #198901 | 更新的 plugin SecretInput 合同在重新加载后过期，需完整 Gateway 重启才生效 | P2, 🦞 diamond lobster, auth-provider | 插件密钥输入变更不生效，影响插件热更新体验与安全合规流程。 | [查看](https://github.com/openclaw/openclaw/issues/198901) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型/状态 | 功能或修复说明 | 链接 |
|---|------|-----------|----------------|------|
| #204289 | fix(ci): select prompt-cache and compaction owner tests | CI 修复，OPEN | 解决激进 PR 测试选择遗漏 prompt-cache 与 compaction 行为套件的问题，防止主分支验证失败。 | [查看](https://github.com/openclaw/openclaw/pull/204289) |
| #186888 | feat: watch a running command automation's output live in the Control UI | 功能，P2, web-ui | 让长时间运行的命令自动化在 Control UI 中实时输出日志，而非仅在结束后显示。 | [查看](https://github.com/openclaw/openclaw/pull/186888) |
| #204286 | feat: transcribe voice notes through Vercel AI Gateway | 功能，Vercel AI Gateway | 为使用 Vercel AI Gateway 的用户提供语音笔记/音频附件转录能力，减少对独立 OpenAI/ElevenLabs 密钥的依赖。 | [查看](https://github.com/openclaw/openclaw/pull/204286) |
| #204287 | fix: click the desktop mic to dictate and hold for Talk | 修复，desktop chat | 调整桌面端麦克风交互：点击听写，按住启动语音对话（Talk），修正当前点击即启动对话的预期偏差。 | [查看](https://github.com/openclaw/openclaw/pull/204287) |
| #204281 | fix(sessions): unread advances only when a run ends with a new visible reply | 修复，sessions | 仅在运行结束并产生新可见回复时才推进未读状态，避免心跳/子结束唤醒导致误报未读。 | [查看](https://github.com/openclaw/openclaw/pull/204281) |
| #204250 | fix: let signed-in Gateway users connect personal MCP accounts | 修复，gateway/agents | 允许已登录 Gateway 用户连接个人 MCP 账户，替代此前的 Webchat 请求者与 OAuth 生命周期修复方案。 | [查看](https://github.com/openclaw/openclaw/pull/204250) |
| #204285 | feat: let operators turn off Lobsterdex without losing collections | 功能，Control UI | 允许运营商关闭 Lobsterdex（访客、集合、Memory 艺术品、标签图标），同时保留已有集合数据。 | [查看](https://github.com/openclaw/openclaw/pull/204285) |
| #204265 | fix: let finished background commands reach the agent before an active goal advances | 修复，session-state/message-delivery | 确保活跃目标自动推进前，已完成的后台命令结果先送达 Agent，避免结果丢失或顺序错误。 | [查看](https://github.com/openclaw/openclaw/pull/204265) |
| #203891 | fix(sessions): charge settled run billing to goal token budgets | 修复，billing | 修复预算化内置目标因上下文窗口高水位增量为零而导致 `tokensUsed: 0` 的计费问题。 | [查看](https://github.com/openclaw/openclaw/pull/203891) |
| #204279 | fix: explain node restart steps after manual updates | 文档，CLI | 手动更新后，说明节点重启步骤，避免 Gateway 重启输出未提示节点仍运行旧运行时的困惑。 | [查看](https://github.com/openclaw/openclaw/pull/204279) |

---

## 功能需求趋势

从本日 Issues 与 PR 中提炼，社区最关注的功能方向包括：

1. **更新与恢复可靠性**：`openclaw update repair` 失败、版本分裂、sqlite-maintenance 冲突等问题集中爆发，社区对更新管道的鲁棒性与回滚能力需求迫切。
2. **多代理成本归属与计费**：Tasks ledger 缺失子运行 token/成本记录，以及目标 token 预算计费不准，反映企业用户对 ACP 多代理账单透明度的强烈需求。
3. **桌面端与深度集成体验**：macOS 深度链接（openclaw://session）、桌面聊天麦克风交互（点击听写/按住 Talk）等需求，表明用户希望 OpenClaw 更好地融入本地操作系统工作流。
4. **MCP 与插件身份验证扩展**：支持

:::
