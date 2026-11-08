---
title: "AI CLI 工具社区动态日报"
published: 2026-11-08
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-08

> 生成时间: 2026-11-08 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-08）

## 1. 生态全景

当前 AI CLI 工具生态正处于“从单一对话向代理编排（Agentic Workflow）跃迁”的关键期。各主流工具普遍将安全边界、会话状态持久化、多模态/本地工具调用作为核心竞争点，但隐私泄露、数据丢失、跨平台稳定性等基础问题仍频繁爆发。社区对“免费层配额透明度”和“头less 与交互式体验一致性”的关注度显著上升，表明开发者正从尝鲜阶段转向生产化脚本化使用。整体呈现“功能快速堆叠与基础稳定性修复并行”的特征，安全与隐私已成为各工具的头等优先级。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Issues 数 | 今日 PR 数 | 新版本发布 | 核心活跃领域 |
|------|------|---------------|-----------|-----------|-------------|
| **OpenAI Codex** | openai/codex | 41 条（新增/更新） | 48 条 | rust-v0.169.0-alpha.3（Alpha 预览） | Windows 桌面稳定性、Computer Use、MCP 兼容性、IDE 集成 |
| **OpenCode** | anomalyco/opencode | 15 条 | 50 条 | 无 | Zen 免费层配额、TUI 插件生态、桌面端启动性能、会话数据安全 |
| **Gemini CLI** | google-gemini/gemini-cli | 未披露总数（Top 10 热点） | 未披露总数（Top 10 热点） | 无 | Subagent 稳定性、安全加固（命令允许列表、信息防泄露）、ACP 协议 |
| **Claude Code** | anthropics/claude-code | 未披露总数（Top 10 热点） | 0 条 | 无 | 隐私安全（User-Agent 泄露邮箱）、Auto 模式沙箱、Headless/交互式一致性 |
| **DeepSeek Reasonix** | esengine/DeepSeek-Reasonix | 10 条（精选） | 10 条（精选） | v2.58.0（Studio + CLI） | 移动端适配、记忆星系系统、团队/Agent 编排、Android API Key 兼容 |
| **Hermes** | NousResearch/hermes-agent | 7 条（全部更新） | 未披露总数 | 无 | 桌面端网关/连接管理、轻量化部署（context_length 下限）、Apple fm serve 适配 |
| **OpenClaw** | openclaw/openclaw | 5 条（全部更新） | 20 条（活跃） | 无 | 会话状态恢复、本地模型提供商生态、Web UI 性能、错误分类与回退机制 |
| **Deepseek Reasonix** | esengine/DeepSeek-Reasonix | 10 条（精选） | 10 条（精选） | v2.58.0（Studio + CLI） | 移动端适配、记忆星系系统、团队/Agent 编排、Android API Key 兼容 |
| **Deepseek Harness** | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 无活动 |

> 注：部分仓库仅披露精选热点而非全量统计，表格中“未披露总数”表示原日报未提供全量计数。

## 3. 共同关注的功能方向

多个工具社区在以下维度上呈现高度一致的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **安全边界与沙箱机制** | Claude Code、Gemini CLI、OpenClaw | Claude Code 要求彻底移除 User-Agent 中的用户邮箱；Gemini CLI 连续发布多个安全修复 PR（受污染命令始终允许规则、错误报告隔离、敏感信息防泄露）；OpenClaw 关注会话状态与安全边界的并发处理 |
| **会话状态持久化与恢复** | Claude Code、OpenCode、OpenClaw、Hermes | Claude Code 关注 Remote Control 会话在本地 `/resume` 中不可见；OpenCode 出现 2.2.6 升级导致会话数据目录被重建的严重数据丢失；OpenClaw 讨论访客任务恢复与会话重置；Hermes 修复已删除网关重启后“复活”问题 |
| **Headless/CLI 与交互式体验一致性** | Claude Code、OpenAI Codex | Claude Code 报告 Headless 模式 token 消耗约为交互式的 1.8 倍，且权限校验存在差异；Codex 关注 TUI 崩溃与 CLI 稳定性回归 |
| **跨平台与桌面端稳定性** | OpenAI Codex、Hermes、OpenCode | Codex 集中爆发 Windows Computer Use 与桌面端项目消失问题；Hermes 桌面端网关路由漂移；OpenCode Windows 端 ResizeObserver 循环风暴 |
| **MCP / 插件生态与 IDE 集成** | OpenAI Codex、Gemini CLI、OpenCode | Codex 关注 MCP 表单自动拒绝与 VS Code 扩展预加载失败；Gemini CLI 推进 ACP 协议与 Zed/JetBrains/VS Code 集成；OpenCode 致力于 TUI 外部 TSX 插件的响应式支持 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|-----|---------|---------|------------|
| **Claude Code** | 交互式编程助手、Web 搜索、Remote Control | 专业开发者、Anthropic 生态用户 | 基于 Claude 模型，强调交互式 CLI 与桌面端对齐，近期陷入隐私与 Auto 模式安全争议 |
| **OpenAI Codex** | Computer Use、IDE 插件、MCP 协议、跨平台桌面应用 | OpenAI 订阅用户、企业自动化场景 | Rust 后端 + Electron 桌面端，侧重“模型操作计算机”能力，Windows/macOS 稳定性是短板 |
| **Gemini CLI** | Subagent 编排、AST 感知代码理解、ACP 协议 | Google 生态开发者、复杂代理工作流构建者 | 强调子代理可靠性与代码结构化理解，安全加固密集，IDE 插件生态扩展明显 |
| **DeepSeek Reasonix** | 移动端 Studio、记忆星系（遗忘曲线）、团队/Agent 编排 | 移动端开发者、多会话协作团队 | Studio + CLI 双端同步，独具记忆衰减机制，团队功能分阶段（1/7 至 6/7）逐层交付 |
| **OpenCode** | TUI 插件系统、会话 API、Zen 免费层、Code Mode | 命令行重度用户、插件开发者、成本敏感型用户 | Bun 打包 CLI，侧重 TUI 插件生态与会话管理 API，数据安全（会话丢失）是当前信任危机 |
| **Hermes** | 桌面端网关管理、多 Provider 适配（Apple fm serve、Ollama）、WhatsApp 插件 | 本地模型部署者、轻量化设备用户 | 支持低资源设备（主张 context_length 降至 64K 以下），Provider 兼容性与连接状态持久性是核心痛点 |
| **OpenClaw** | 本地模型提供商生态（NagaAI、MLX/OmLX）、CLI 插件更新、备份恢复 | 本地模型爱好者、自托管团队 | 强调第三方提供商原生支持与本地工具链稳定性，P0 级合并风险较高，偏向底层基础设施 |

## 5. 社区热度与成熟度

- **最活跃**：OpenAI Codex（41 Issues + 48 PR/24h）和 OpenCode（15 Issues + 50 PR/24h）的代码提交与问题反馈频次最高，处于快速迭代阶段。
- **高关注、低代码动态**：Claude Code 虽无 PR 合并，但单个隐私 Issue（#107757）获得 727 个赞和 104 条评论，社区情绪强烈，说明用户基数大且对安全极度敏感。
- **稳步演进**：Gemini CLI 和 DeepSeek Reasonix 保持持续的安全修复与功能 PR，版本发布节奏相对稳定（Reasonix 刚发布 v2.58.0），属于成熟期维护与功能扩展并重。
- **低活跃/停滞**：Deepseek Harness 过去 24 小时无活动，社区热度显著低于其他工具。

## 6. 值得关注的趋势信号

1. **隐私与数据主权成为产品护城河**  
   Claude Code 的 User-Agent 邮箱泄露事件引发社区强烈反弹，用户明确要求“彻底移除而非 opt-out”。这表明 AI CLI 工具的隐私设计已从“锦上添花”变成“生死线”，开发者在选型时应优先评估工具的数据收集与请求头透明度。

2. **会话数据丢失是信任红线**  
   OpenCode 2.2.5→2.2.6 升级导致 3 个月会话记录丢失，属于严重回归问题。对于将 AI CLI 纳入日常开发流程的团队，数据迁移兼容性与升级回滚能力必须作为评估标准。

3. **Headless 模式与交互式模式的“双轨制”正在消融**  
   Claude Code、OpenAI Codex 均出现 Headless/CLI 与交互式模式在成本、权限、会话可见性上的不一致。未来能够提供“一次编写，到处运行”且行为一致的 CLI 工具，将在自动化工作流中更具竞争力。

4. **代理（Agent）可靠性超过功能丰富度**  
   Gemini CLI 的 Subagent 挂起、超时伪装成功，以及 OpenAI Codex 的 Computer Use 跨平台失败，都指向同一个核心问题：代理执行的可预测性仍不足。开发者在构建基于 AI CLI 的自动化流水线时，应预留人工介入与异常恢复机制。

5. **本地模型与多 Provider 生态加速碎片化**  
   OpenClaw、Hermes、DeepSeek Reasonix 均在推进本地模型提供商（MLX、Ollama、Apple fm serve）的原生适配。这预示着 AI CLI 工具将从“单一云模型客户端”演变为“多模型供应商的统一编排层”，开发者需关注工具对本地推理

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-08）

## 1. 热门 Skills 排行

基于 PR 活跃度与更新频率，以下为社区关注度最高的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 `fix(mcp-builder)` | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入变更及自定义 HTTP 头配置问题，适配 MCP 协议新版本 | MCP 协议破坏性升级导致现有技能失效，社区急需兼容性修复 | OPEN | [#1742](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 `fix(skill-creator)` | 修复触发器评估误报/漏报，解决 Windows 下 `select()` 管道失效及运行时失败误判为非触发器的问题 | 技能创建工具的跨平台稳定性与触发逻辑准确性是社区痛点 | OPEN | [#1298](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 `Add notion-spec-to-implementation...` | 新增 Notion 规格转实现技能与定量简历审计技能，将产品/技术规格拆解为可执行的 Notion 任务 | 企业级文档到代码的自动化转换需求强烈 | OPEN | [#1245](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1980 `webapp-testing` | 移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用测试技能的安全加固受到高度关注 | OPEN | [#1980](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 `fix(docx)` | DOCX 技能中 LibreOffice 超时现报告为错误，并通过 XML 校验确认修订痕迹已清理 | 文档自动化处理的可靠性与输出校验是核心诉求 | OPEN | [#1792](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 `feat(skills): proofcore-contract-auditor` | 新增智能合约公证技能，对 Solidity/Rust 合约进行静态分析并将审计证明锚定至 TON 区块链 | Web3/区块链安全审计方向开始进入 Skills 生态 | OPEN | [#1771](https://github.com/anthropics/skills/pull/1771) |
| 7 | #525 `Add pyxel skill` | 新增 Python 复古游戏开发技能，涵盖实现指导、无头输入运行、帧检查与状态验证 | 游戏开发等垂直领域技能持续获得社区关注 | OPEN | [#525](https://github.com/anthropics/skills/pull/525) |
| 8 | #2019 `fix(xlsx)` | 修复 `external_links_at_risk` 对工作表级定义名称与外部链接别名的误报问题 | Excel/表格自动化处理的边界情况修复需求持续存在 | OPEN | [#2019](https://github.com/anthropics/skills/pull/2019) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并至主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向包括：

1. **工作流自动化与文档转换**  
   如 #1245 提出的 Notion 规格转实现、#1329 提议的 `compact-memory`（紧凑代理状态符号），反映开发者希望将非代码文档（产品规格、会议记录、长期记忆）转化为可执行的代码任务或轻量状态。

2. **代码审查与安全治理**  
   #1771（智能合约审计）、#412（Agent Governance 安全模式）显示社区对 AI 生成代码的审计、合规与治理能力有明确需求，尤其是 Web3 与企业级 Agent 安全。

3. **测试生成与 Web 应用测试**  
   #1980（webapp-testing 安全加固）、#556（`run_eval.py` 触发率为 0 的 Bug）表明社区希望技能能更可靠地触发测试流程，并修复现有测试技能的工具链问题。

4. **文档与办公自动化**  
   #1792（DOCX 超时处理）、#2018（DOCX 合并运行 XML 命名空间缺陷）、#2019（XLSX 外部链接解析）集中在 Word/Excel 等办公文档的程序化处理，社区期待更稳健的文档生成与校验技能。

5. **跨平台与工具链稳定性**  
   #1298（Windows 兼容性）、#1681（`package_skill.py` 直接执行失败）、#62（技能丢失/路径错误）显示开发者对技能创建、打包与跨平台运行的基础设施体验要求较高。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，且修复了明确的功能缺陷或引入了新领域能力，可能近期落地：

- **#1742 `fix(mcp-builder)`** — MCP 2.0 兼容性修复，涉及官方核心依赖，优先级高，合并可避免大量现有技能失效。  
  [https://github.com/anthropics/skills/pull/1742](https://github.com/anthropics/skills/pull/1742)

- **#1298 `fix(skill-creator)`** — 修复触发器评估与 Windows 兼容性，直接影响技能创建工具的可用性，社区讨论持续数月。  
  [https://github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

- **#1245 `Add notion-spec-to-implementation...`** — 新增企业级文档转代码技能，功能完整且更新活跃（至 2026-10-15），符合社区自动化工作流需求。  
  [https://github.com/anthropics/skills/pull/1245](https://github.com/anthropics/skills/pull/1245)

- **#1980 `webapp-testing`** — 消除命令注入漏洞，安全修复类 PR 通常审核通过速度较快。  
  [https://github.com/anthropics/skills/pull/1980](https://github.com/anthropics/skills/pull/1980)

- **#1771 `proofcore-contract-auditor`** — 引入区块链智能合约审计新领域，若审核通过将丰富 Web3 技能生态。  
  [https://github.com/anthropics/skills/pull/1771](https://github.com/anthropics/skills/pull/1771)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在文档自动化、代码审查与 Web 测试等垂直领域构建更稳健、安全的技能，同时修复 MCP 协议兼容、跨平台运行及触发机制等基础工具链缺陷，以提升技能的生产可用性。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-08  
**数据来源**: [anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 1. 今日速览

过去24小时内，Claude Code 仓库未发布新版本，也无新的 Pull Request 合并。社区活动集中在 Issue 讨论上，其中 **#107757（User-Agent 头泄露用户邮箱）** 成为绝对焦点，以 104 条评论和 727 个赞远超其他议题，引发了对隐私与安全机制的广泛关注。其余热点主要围绕 Remote Control 会话可见性、本地开发域名信任、以及 headless 模式下的成本与权限问题展开。

---

## 2. 版本发布

过去24小时内无新版本发布，该部分暂无内容。

---

## 3. 社区热点 Issues

以下是过去24小时内更新、社区关注度最高的 10 个 Issue：

| # | 标题 | 评论/👍 | 核心关注点 | 链接 |
|---|------|---------|-----------|------|
| #107757 | [Bug] Privacy violation in User-Agent header | 104 / 727 | **最高优先级安全隐患**：Claude Code 在 Web 搜索时未经用户同意，在 `User-Agent` 请求头中泄露用户邮箱给任意第三方，导致用户收到大量垃圾邮件。社区强烈要求彻底移除该行为，而非提供 opt-out/opt-in 选项。 | [查看详情](https://github.com/anthropics/claude-code/issues/107757) |
| #97074 | [Bug] Headless `claude -p` consumes ~1.8× more 5-hour window per token | 72 / 154 | **成本与效率差异**：无头模式（entrypoint `sdk-cli`）在相同工作负载下，每 token 消耗的 5 小时窗口额度约为交互式 CLI 的 1.8 倍，引发 API 计费透明度讨论。 | [查看详情](https://github.com/claude-code/issues/97074) |
| #100684 | [Bug] Auto mode `pkill -f "cat"` killed every GUI app on macOS | 8 / 2 | **自动模式安全风险**：Auto 模式下执行的 Bash 命令因子串匹配误杀了用户会话中所有 GUI 应用（Safari、Chrome、Claude 等），凸显命令执行沙箱与安全校验不足。 | [查看详情](https://github.com/claude-code/issues/100684) |
| #96508 | [Bug] Browser pane blocks same-origin subresources for 127.0.0.1 | 8 / 7 | **回归性 Bug**：Windows 上本地开发域名解析到 127.0.0.1 时，浏览器面板仍拦截同源子资源（ERR_BLOCKED_BY_CLIENT），问题在 #86362 关闭后未修复便重现。 | [查看详情](https://github.com/claude-code/issues/96508) |
| #95231 | [Bug] Remote Control sessions hidden from local /resume picker | 7 / 3 | **会话管理缺口**：通过 `claude remote-control` 启动的会话因 `entrypoint=sdk-cli` 被过滤，不出现在本地 `/resume` 选择器中，影响多机工作流的可用性。 | [查看详情](https://github.com/claude-code/issues/95231) |
| #107144 | [Bug] Account-email check denies local-only Bash calls in headless bypass | 6 / 2 | **权限误报**：2.1.317+ 版本中，headless 绕过运行中的本地 Bash 调用（如 heredoc 写文件、curl 到 127.0.0.1）被账号邮箱检查拦截，影响本地自动化场景。 | [查看详情](https://github.com/claude-code/issues/107144) |
| #87190 | [Feature] Attach a terminal to a Remote Control session on another machine | 6 / 9 | **功能需求**：用户希望能将本地终端附加到运行在其他机器上的 Remote Control 会话，增强远程开发交互体验。 | [查看详情](https://github.com/claude-code/issues/87190) |
| #98551 | [Feature] Browser pane: trust local-dev domains resolving to 127.0.0.1 | 5 / 10 | **本地开发体验**：社区请求允许信任 `*.lndo.site`、`*.ddev.site` 等解析到 127.0.0.1 的本地开发域名，避免浏览器面板拦截。 | [查看详情](https://github.com/claude-code/issues/98551) |
| #106772 | [Bug] Background sessions stop reporting terminal status (OSC 7501) | 4 / 3 | **TUI/状态集成**：后台会话不再通过 OSC 7501 上报终端状态，导致类似 herdr 的终端代理应用无法在代理列表中显示 Claude Code。 | [查看详情](https://github.com/claude-code/issues/106772) |
| #104359 | [Bug] CLI env credential renewal conflicts with macOS Keychain sandbox | 4 / 0 | **认证与沙箱冲突**：持有环境凭证的 CLI 进程仍会续期存储的 claude.ai 登录；macOS 沙箱进程因 Keychain 不可写，续期写入 `.credentials.json` 并消耗 Keychain 中的 refresh token，导致后续 400 错误。 | [查看详情](https://github.com/claude-code/issues/104359) |

---

## 4. 重要 PR 进展

过去24小时内，Claude Code 仓库 **无 Pull Request 更新**（共 0 条）。社区当前的代码变更与修复尚未通过 PR 形式公开同步，建议开发者持续关注仓库的后续合并记录。

---

## 5. 功能需求趋势

从近期 Issue 中可提炼出以下社区关注的功能方向：

1. **远程协作与会话管理（Remote Control / Resume）**
   - 多个 Issue 反映 Remote Control 会话在本地 `/resume` 选择器中不可见（#95231、#94546）。
   - 用户希望能附加终端到远程机器上的会话（#87190）。
   - 远程会话空闲超时不可调整且重连体验差（#104361）。

2. **本地开发与浏览器面板体验**
   - 社区普遍希望浏览器面板支持信任解析到 127.0.0.1 的本地开发域名（#98551、#96508）。
   - 桌面端浏览器面板缺少“在新标签页打开链接”的支持（#106887）。
   - 桌面端 Code 标签页缺少提示建议，与 CLI 体验不一致（#106323）。

3. **安全与权限细粒度控制**
   - Auto 模式下危险 Bash 命令缺乏有效拦截（#100684）。
   - Headless 模式下本地调用被账号邮箱检查误拦截（#107144）。
   - macOS 沙箱环境下凭证存储与续期机制冲突（#104359）。

4. **性能与资源消耗透明度**
   - Headless 与交互式 CLI 的 token 消耗差异引发成本关注（#97074）。
   - 桌面端输入卡顿与高 CPU 占用（#108216）。

---

## 6. 开发者关注点

基于社区反馈，开发者当前的核心痛点与高频需求包括：

- **隐私安全是头等大事**：#107757 的高赞数（727）表明用户对数据泄露极为敏感，期望 Anthropic 在 User-Agent 等请求头中彻底移除个人身份信息，而非仅提供设置开关。
- **自动化模式的安全边界不清**：Auto 模式下执行的 shell 命令缺乏足够的上下文感知与破坏性操作确认，已导致严重的误杀进程事件，社区呼吁增加命令预审或沙箱限制。
- **Headless/CLI 与交互式体验不一致**：无论是 token 消耗（#97074）、会话可见性（#95231、#94546），还是权限校验（#107144），无头模式与交互模式之间存在多处行为差异，增加了脚本化工作流的维护成本。
- **桌面端与 CLI 端功能对齐不足**：桌面应用的浏览器面板、侧边栏状态保持、提示建议等功能与 CLI 版本存在差距，影响跨平台用户的使用习惯。
- **Stale Issue 清理与回归问题**：大量标记为 `stale` 的旧 Issue 在近期被重新更新，其中部分（如 #96508）明确指出之前的修复未生效或问题回归，说明回归测试与旧 Issue 跟踪机制有待加强。

---

**注**：本日报基于 GitHub 仓库 `anthropics/claude-code` 在 2026-11-08 的公开 Issue 与 PR 数据生成，未包含未公开的内部版本或私有讨论。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-08  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

本周 Codex 社区活跃度持续高位，过去 24 小时内新增/更新 Issue 41 条、PR 48 条。Windows 平台的 Computer Use 功能与桌面端稳定性问题集中爆发，CLI 侧则围绕 TUI 崩溃、MCP 协议兼容性及增量工具定义展开密集迭代；Rust 后端发布 `0.169.0-alpha.3` 预览版。

---

## 2. 版本发布

| 版本 | 标签 | 说明 |
|------|------|------|
| rust-v0.169.0-alpha.3 | `0.169.0-alpha.3` | Rust 后端预览版发布，具体变更详见 Release 页面。 |

> 注：本次为 Alpha 预览版，建议在生产环境谨慎升级。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数、更新时效性）筛选，涵盖桌面端、CLI、Computer Use 及计费等核心领域。

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #42739 | Windows 桌面更新后本地项目从侧边栏消失 | 更新 Codex/ChatGPT Windows 桌面应用后，Projects 面板显示“No projects”，源码文件仍在磁盘上，仅 Recents 可访问。 | 81 条评论，8 👍，持续 2 个月未解决，Windows 用户反应强烈。 | [查看 Issue](https://github.com/openai/codex/issues/42739) |
| #51524 | Windows Computer Use 无法获取浏览器 URL（Chrome/Edge） | `sky.get_window_state({window, include_text:true})` 立即中断轮次，无法读取页面 URL 或截图，窗口枚举正常。 | 74 条评论，9 👍，Computer Use 核心能力受阻，影响自动化场景。 | [查看 Issue](https://github.com/openai/codex/issues/51524) |
| #50428 | Windows 桌面：耐用聊天/启动和线程分叉失败 | `AbsolutePathBuf` 缺少基础路径反序列化，导致直接提交和同目录分叉在执行前失败。 | 42 条评论，3 👍，影响会话恢复与分支工作流。 | [查看 Issue](https://github.com/openai/codex/issues/50428) |
| #35420 | OneDrive 后端工作区降级时流反复断开 | 选中 OneDrive 备份的 Windows 工作区时，请求反复失败，报 `stream disconnected before completion`。 | 37 条评论，涉及企业/工作区场景，连接稳定性问题。 | [查看 Issue](https://github.com/openai/codex/issues/35420) |
| #48369 | OpenAI 用量耗尽后发送按钮全局禁用 | 团队/Plus 订阅用量用尽后，Send 按钮全局置灰，无法继续对话，缺乏恢复提示。 | 16 条评论，8 👍，用户体验与计费透明度争议集中点。 | [查看 Issue](https://github.com/openai/codex/issues/48369) |
| #54979 | TUI 因终端缩小前 SIGWINCH 竞争导致 Panic | `codex-cli 0.163.0` 在终端尺寸变化前未正确处理 `SIGWINCH`，导致 `index outside of buffer` 崩溃。 | 4 条评论，**今日（11-08）刚更新**，CLI 稳定性回归关注点。 | [查看 Issue](https://github.com/openai/codex/issues/54979) |
| #58811 | VS Code 扩展因预加载 3,203 个 Chunk 失败 | 渲染器就绪超时（`renderer_ready_timeout`），异步模块预加载导致侧边栏无法启动。 | 4 条评论，IDE 集成性能瓶颈，影响 VS Code 用户群体。 | [查看 Issue](https://github.com/openai/codex/issues/58811) |
| #60147 | macOS Computer Use 物理输入重复/三重 | 单次按键在 Chrome/Safari 中插入 2–3 次字符，与紫色控制指示器激活相关。 | 3 条评论，1 👍，**11-07 新报告**，macOS 平台新发现的输入异常。 | [查看 Issue](https://github.com/openai/codex/issues/60147) |
| #60158 | MCP form elicitations 在 0.167.0 中自动拒绝 | 即使 `approval_policy = "on-request"`，MCP 表单确认仍被自动拒绝，阻断人机协作流程。 | 2 条评论，**11-07 新报告**，MCP 协议兼容性回归。 | [查看 Issue](https://github.com/openai/codex/issues/60158) |
| #54400 | Windows 沙箱泄漏内核访问令牌 | 每个沙箱命令泄漏约 33 个内核访问令牌对象，分页池持续增长直至重启。 | 2 条评论，涉及内核资源泄漏，安全与长期运行稳定性隐患。 | [查看 Issue](https://github.com/openai/codex/issues/54400) |

---

## 4. 重要 PR 进展（精选 10 条）

过去 24 小时内合并/更新的 PR 多为自动化机器人（`copyberry[bot]`）提交的增量改进，核心集中在增量执行目录、运行时认证、MCP 与 Code Mode 等底层能力。

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|---------------|------|
| #60186 | 允许登录期间创建自定义提供商 | 登录选择器新增“创建自定义提供商或网关”，复用设置表单，无需预先保存网关配置。 | [查看 PR](https://github.com/openai/codex/pull/60186) |
| #60181 | 侧边栏标签页键盘与鼠标导航 | 新增 `sidebar_up` / `sidebar_down` 动作，支持循环切换；默认快捷键 `Shift-Tab/Tab`、`Up/Down`、`k/j`，并支持鼠标滚轮。 | [查看 PR](https://github.com/openai/codex/pull/60181) |
| #60180 | 将输入标点附加到已完成的技能提及 | 技能补全后若紧跟标点，自动替换尾随空格，避免 `$rustdoc ,` 等多余空白。 | [查看 PR](https://github.com/openai/codex/pull/60180) |
| #60177 | 增量执行目录更新指标 | 新增 `codex.tools.exec_entry_updates` 指标，按 `added` / `schema_changed` / `removed` 标记工具与命名空间指令变更。 | [查看 PR](https://github.com/openai/codex/pull/60177) |
| #60173 | 会话与压缩变更下的执行目录保留测试 | 覆盖简历、分叉、工具模式切换和压缩场景，验证后台压缩下的实时执行声明与元数据更新。 | [查看 PR](https://github.com/openai/codex/pull/60173) |
| #60172 | 答案审核中保留显示指令 | 恢复的答案历史需携带审核标记旁的展示指令，新增可选 `display` 元数据（`action`、`blockType` 等）。 | [查看 PR](https://github.com/openai/codex/pull/60172) |
| #60163 | 将增量执行工具更新接入 Code Mode 会话 | 嵌套工具变更无需重复完整 `functions.exec` 声明，通过结构化定义更新模型目录。 | [查看 PR](https://github.com/openai/codex/pull/60163) |
| #60157 | 支持增量 Code Mode 工具定义 | 渲染嵌套工具定义与命名空间指令的稳定条目，并新增可选目录跟踪。 | [查看 PR](https://github.com/openai/codex/pull/60157) |
| #60152 | 持久化本地工作区侧聊并添加标签页关闭控件 | 侧聊作为附件保存至父对话，支持重启后从侧边栏重新打开；侧边栏显示聊天名称或首条提示预览。 | [查看 PR](https://github.com/openai/codex/pull/60152) |
| #60122 | 在推送追踪中保留 Code Mode 分发错误 | 记录 Code Mode 自定义负载的分发生命周期，避免在 `CodeCellStarted` 事件前失败时丢失调用方错误。 | [查看 PR](https://github.com/openai/codex/pull/60122) |

---

## 5. 功能需求趋势

从近 24 小时及历史未解决 Issue 中提炼，社区最关注的功能方向如下：

1. **Computer Use 稳定性与跨平台一致性**  
   Windows 与 macOS 均出现浏览器 URL 识别失败、输入重复、截图超时等问题，成为自动化代理场景的首要瓶颈。

2. **IDE 集成与扩展性**  
   VS Code 扩展启动失败、侧边栏导航需求、公共桌面扩展 API（#51138）等反映开发者希望 Codex 深度嵌入现有编辑器工作流，而非孤立运行。

3. **MCP 协议与工具调用可靠性**  
   MCP 表单自动拒绝、启动阻塞审核、TUI 附加已启动线程后 MCP 状态未 settled 等问题，表明开发者对标准化工具协议的依赖度在提升。

4. **计费与用量透明度**  
   发送按钮全局禁用、GPT-6.1 Terra 缓存输入按全价计费、模型选择器缺少剩余配额显示，用户对速率限制与计费可见性的诉求强烈。

5. **CLI/TUI 健壮性**  
   终端尺寸变化崩溃、工作区路由发现失败、嵌套沙箱权限冲突等底层稳定性问题，直接影响命令行开发者的日常体验。

---

##

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-08)

## 今日速览

今日 Gemini CLI 社区未发布新版本，但 Issue 与 PR 活跃度依然较高。核心关注点集中在 **Subagent 稳定性**（如 MAX_TURNS 恢复、通用代理卡死、子代理调用不足）与 **安全加固**（危险命令识别、敏感信息防泄露、错误报告隔离）。多位维护者连续提交安全修复 PR，显示社区正处于代理能力与安全边界并重的迭代阶段。

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（Top 10）

以下按社区讨论热度（评论数）与优先级筛选，涵盖最值得关注的问题：

| # | 标题 | 优先级/类型 | 评论 | 关注理由 |
|---|------|------------|------|---------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption | P1 / Bug | 13 | 子代理在达到最大轮次后仍上报 `status: "success"`，掩盖了任务中断，直接影响代理可靠性与任务结果可信度。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 / Enhancement | 9 | 探索让模型以原生 Bash 用户身份操作，同时通过零依赖沙箱保障安全，是提升代理代码操作能力的关键方向。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 / Bug | 8 | 通用代理在处理简单操作（如创建文件夹）时会无限挂起，严重影响日常可用性，已有 8 个赞同。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 7 | 探索 AST 感知的文件读取与代码映射，有望大幅减少上下文膨胀并提升代码导航精度。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 / Bug | 7 | 模型在不显式指令的情况下极少主动调用自定义技能与子代理，限制了代理生态的自动化潜力。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides (e.g., maxTurns) | P2 / Bug | 5 | 浏览器代理忽略全局/项目级配置覆盖，导致用户无法通过 settings.json 控制代理行为。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 / Bug | 4 | 浏览器子代理在 Wayland 环境下失效，影响 Linux 桌面用户的体验。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done output hook causes crash | P1 / Bug | 3 | 输出钩子在任务接近完成时导致 CLI 崩溃，影响最终交付体验。 |
| [#30005](https://github.com/google-gemini/gemini-cli/issues/30005) | ACP: BeforeTool and AfterTool hooks do not run for tools called over ACP | Needs Triage | 3 | ACP 协议下的工具钩子未触发，影响 IDE 插件（Zed、JetBrains、VS Code）等客户端的可扩展性。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | Gemini CLI encounters 400 error with > 128 tools | P2 / Bug | 3 | 工具数量超过阈值时出现 400 错误，限制了大型工具集的使用场景。 |

---

## 重要 PR 进展（Top 10）

以下 PR 代表当前代码库的主要修复与功能方向，按安全性与核心稳定性排序：

| # | 标题 | 作者 | 类型 | 核心内容 |
|---|------|------|------|---------|
| [#30196](https://github.com/google-gemini/gemini-cli/pull/30196) | fix(core): prevent always-allow rules for tainted shell commands | @kanchinadd98 | 安全 | 防止对受污染的 shell 命令设置“始终允许”规则，使受污染命令仅批准一次，避免根命令被滥用。 |
| [#30088](https://github.com/google-gemini/gemini-cli/pull/30088) | fix(core): keep error reports out of the shared temp directory | @Neal006 | 安全 | 将包含完整聊天历史的错误报告从 `os.tmpdir()` 移至 `~/.gemini/tmp/error-reports/`，并限制为当前用户可读。 |
| [#30169](https://github.com/google-gemini/gemini-cli/pull/30169) | fix(cli): keep pasted @ text and fuzzy @ matches from attaching secrets | @BigSmoKe07 | 安默 | 默认转义粘贴文本中的 `@` 符号，防止 shell 记录中的 SSH 私钥等敏感信息被意外附加到模型请求。 |
| [#30173](https://github.com/google-gemini/gemini-cli/pull/30173) | fix(cli): load ~/.gemini/.env in untrusted folders | @BigSmoKe07 | 安全 | 允许非信任文件夹读取用户级 `~/.gemini/.env`，修复工作区账户在非信任目录下的登录循环问题。 |
| [#30171](https://github.com/google-gemini/gemini-cli/pull/30171) | fix(core): flag recursive and forced rm regardless of flag position | @BigSmoKe07 | 安全 | 修复 `isDangerousCommand` 对 `rm` 参数位置的误判，覆盖 `rm -r -f`、`rm --recursive --force` 等等价形式。 |
| [#30170](https://github.com/google-gemini/gemini-cli/pull/30170) | fix(core): stop local subagents from waiting out their deadline on a stalled model call | @BigSmoKe07 | 代理 | 为本地代理执行器增加每轮模型响应超时限制，避免单次调用卡死导致等待整个 3 分钟截止期。 |
| [#30172](https://github.com/google-gemini/gemini-cli/pull/30172) | fix(core): keep one result per tool call ID in session records and live history | @BigSmoKe07 | 代理 | 确保每个工具调用 ID 在保存的会话和实时历史中只有一个结果，修复 `--resume` 时的结果重复问题。 |
| [#30175](https://github.com/google-gemini/gemini-cli/pull/30175) | fix(core): apply local subagents' generateContentConfig for every model | @BigSmoKe07 | 代理 | 让本地子代理对所有模型值（`auto`、`flash`、`pro`、具体模型名）都应用其声明的生成配置（temperature、topP 等）。 |
| [#30194](https://github.com/google-gemini/gemini-cli/pull/30194) | fix: `gemini models` omits `gemini-3.8-flash` available in `/model manage` on v0.67.0 | @xixi-box | 核心 | 修复 `gemini models` 命令遗漏 `gemini-3.8-flash`，与 `/model manage` 保持一致。 |
| [#30176](https://github.com/google-gemini/gemini-cli/pull/30176) | fix(cli): preserve selected worktree across authentication restarts | @duvanka-prasad | 核心 | 在身份验证重启（退出码 199）后保留通过 `--worktree` 选择的 Git 工作树，覆盖引导监督器与旧版子进程监督器。 |

---

## 功能需求趋势

从近期 Issues 与 PR 中可提炼出以下社区关注方向：

1. **代理（Subagent）可靠性与自主性**  
   社区高度关注子代理在超时、挂起、配置忽略等场景下的表现（#22323、#21409、#21968、#22267），以及如何让模型更主动地调用技能与子代理。

2. **安全边界与策略引擎加固**  
   连续多个安全修复 PR（#30196、#30088、#30169、#30173、#30171）表明社区正在收紧 shell 命令允许列表、敏感信息防泄露及错误报告隔离，尤其是在非信任工作区和 YOLO/无人值守模式下。

3. **AST 感知的代码理解**  
   #22745 与 #22746 探索基于 AST 的文件读取、搜索与代码映射，旨在减少上下文膨胀并提升代码导航精度，属于长期性能优化方向。

4. **ACP 协议与 IDE 生态集成**  
   #30005、#29901 等围绕 ACP（Agent Client Protocol）展开，关注工具钩子、会话转向等能力，以支持 Zed、JetBrains、VS Code 等客户端更深度集成。

5. **持久化任务追踪与上下文管理**  
   #21000、#18836 等提议用基于文件的 CRUD 任务追踪替代上下文内的 WriteToDo，解决上下文腐烂与跨会话记忆丢失问题。

---

## 开发者关注点

1. **子代理稳定性是首要痛点**  
   通用代理挂起（#21409）、子代理超时伪装成功（#22323）、浏览器子代理在 Wayland 下失效（#21983）等问题反复出现，开发者期待更可靠的代理恢复与超时处理机制。

2. **配置覆盖与设置生效不一致**  
   浏览器代理忽略 `settings.json` 覆盖（#22267）、软链接代理未被识别（#20079）、子代理生成配置未对所有模型生效（#30175 修复中），表明配置系统仍存在覆盖范围不足的问题。

3.

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报
**日期**: 2026-11-08  
**数据来源**: github.com/esengine/DeepSeek-Reasonix

---

## 1. 今日速览

Reasonix 今日发布 **v2.58.0** 版本，重点优化了 Studio 手机端布局、设置检索体验及长会话恢复性能，并引入了基于“星系”分类与遗忘曲线的记忆管理系统。社区反馈集中在 Windows 安装阻塞、Android API Key 兼容性、CPU 异常占用及思考流展示逻辑等问题上，团队当前处于 studio 分支 bug-fix-only 状态。

---

## 2. 版本发布

### Reasonix Studio v2.58.0 / CLI v2.58.0
- **手机端重构**：重新排版标题栏、审批流、输入区、模型菜单及设置页，适配移动端操作习惯。
- **设置体验优化**：支持按相关度搜索，每页增加目录，设置项更易定位。
- **性能提升**：缩小发送给模型的工具定义体积，加快启动速度与长会话的恢复和保存。
- **CLI 同步**：CLI 归档从 Studio 发布构建，保持版本一致。

> 发布链接：[studio-v2.58.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.58.0)

### 新增功能亮点（近期提交）
- **记忆星系系统**：记忆按“星系”归类，带重要度与遗忘曲线，常用越记越牢，久不用逐渐淡化但仍可搜索。
- **常驻记忆保护**：约束类和每轮常驻记忆永不变淡。
- **记忆设置页三栏布局**：左侧分类、中间带搜索列表、右侧详情，支持修改类型、星系、重要度。
- **新记忆处理**：新记忆进入「新的」区间，一键「对 / 忘掉」，忘掉为归档而非删除。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 关注理由 | 链接 |
|---|------|------|----------|------|
| #14981 | 安装/更新被“Reasonix Studio 仍在运行”永久阻塞 | CLOSED | Windows 安装器因 `customCheckAppRunning` 误判无路径的 `cua-driver.exe` 为应用进程，导致用户无法完成安装或更新，影响面广。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14981) |
| #14998 | 输入存储迁移路径时每敲一个字符就创建半截目录 | CLOSED | 数据迁移功能存在副作用，输入 `D:\test\reasonix` 会在磁盘上留下多个空目录，涉及文件系统污染风险。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14998) |
| #15001 | DeepSeek API key 无法在 Android 移动端使用 | OPEN | 用户在 Android 端填写 DS Key 时提示“服务器不允许修改模型来源”，跨平台密钥兼容性问题亟待解决。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15001) |
| #15002 | CPU 异常飙升至 61% | OPEN | 用户反馈即使在高性能 CPU 上也出现高占用，涉及客户端性能与资源调度问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15002) |
| #15003 | 找不到该文件，可能已被移动或删除 | OPEN | Studio 反馈机制上报的文件丢失问题，可能关联本地缓存或索引异常。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15003) |
| #15013 | 思考显示模式“进行中展开”不生效 | OPEN | 用户设置完全展开后，思考过程仅展开六七行，与预期不符，影响推理过程可读性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15013) |
| #14991 | 希望增加定时任务独立入口，支持会话上下文自动生成 | OPEN | 社区强烈需求类 WORKBUDDY 的定时任务功能，并希望可从会话上下文自动生成监控任务。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14991) |
| #15004 | 主会话与其他会话支持引用辅助会话 | OPEN | 多会话协作需求，用户希望跨会话引用辅助会话内容，增强上下文关联能力。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15004) |
| #15014 | 安卓版启动图标建议改用应用内黑白鲸鱼 R 标志 | OPEN | 品牌一致性问题，启动器图标与应用内标志不一致，且未适配 Android 13 主题图标。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15014) |
| #15005 | 最近怎么不更新了 | OPEN | 用户关注更新频率，反映社区对版本迭代节奏的期待较高。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15005) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复内容 | 链接 |
|---|------|------|--------------|------|
| #14945 | feat(studio): render Mermaid fences safely on demand | OPEN | Studio Markdown 中懒加载渲染 Mermaid 图表，支持 Preview/Source 切换、源码复制、错误可读化及深浅色主题适配。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14945) |
| #14944 | feat(remote): support SSH OTP and keyboard-interactive challenges | OPEN | Studio 与 CLI 增加 SSH 键盘交互式 OTP 与密码+OTP 支持，基于传输层可取消的每题契约，保留服务器标题、指令顺序等。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14944) |
| #14917 | feat(workbench): add Office preview selection to chat | OPEN | 从 Word/Excel 预览中选取内容并带位置信息加入会话，采用结构化位置引用而非文本猜测。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14917) |
| #14798 | feat(studio): pick element in built-in browser | OPEN | 内置浏览器支持元素拾取（Ctrl+Shift+C），高亮页面元素并将选择器、文本、样式及截图作为 composer chip 发送给会话。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14798) |
| #14641 | feat(team): secrets, mentions, /team and /msg, group paging (6/7) | OPEN | 团队功能第 6 层：显式密钥授权、私有凭据引用、终端命令、@提及、群聊分页等。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14641) |
| #14640 | feat(team): shared memory, memory review and schedules (5/7) | OPEN | 团队功能第 5 层：共享记忆、显式 opt-in 记忆审查与定时任务调度。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14640) |
| #14639 | feat(studio): team in Studio's sidebar, chats and group stage (4/7) | OPEN | Studio 侧边栏团队面板、Agent/群组页面及照片上传，保留 Agent 专属回复身份。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14639) |
| #14638 | feat(team): hub keeps agents' sessions and serves /team (3/7) | OPEN | Hub 托管 Agent 后台会话，提供 host-only /team 路由、类型化拒绝与缓存团队视图。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14638) |
| #14637 | feat(team): a session can speak for an agent (2/7) | OPEN | Agent 座位、团队工具、新鲜人类配置审批、有限委托与重放重放守卫。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14637) |
| #14636 | feat(team): roster store and orchestration service (1/7) | OPEN | 团队名册持久化存储、有限编排与规范主机框架，本层无 UI 调用方。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14636) |

---

## 5. 功能需求趋势

从近 24 小时 Issues 与 PR 可观察到以下社区关注方向：

1. **多会话协作与引用**：用户希望跨会话引用辅助会话（#15004），并增加定时任务独立入口并基于上下文自动生成（#14991），表明对复杂工作流编排需求上升。
2. **移动端体验与兼容性**：Android 端 API Key 无法使用（#15001）、启动图标品牌不一致（#15014），移动端适配成为短期痛点。
3. **性能与资源管控**：CPU 异常占用（#15002）、长会话恢复与保存优化（v2.58.0 已部分解决），客户端效率持续受关注。
4. **思考流可视化**：思考显示模式不生效（#15013），用户对推理过程透明度与展示控制有更高要求。
5. **团队与 Agent 编排**：大量团队功能 PR（#14636–#14641）集中更新，显示多 Agent 协作、共享记忆与密钥管理是中长期产品主线。

---

## 6. 开发者关注点

- **安装与更新阻塞**：Windows 安装器进程检测逻辑缺陷（#14981）导致用户无法升级，建议优先修复 `customCheckAppRunning` 的进程匹配逻辑。
- **文件系统副作用**：存储迁移路径输入时实时创建半截目录（#14998），需在路径校验完成前避免落盘操作。
- **Android 端密钥与 UI**：DeepSeek API Key 在移动端不可用（#15001），以及启

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-08)

## 今日速览

OpenCode 社区今日活跃度较高，共 15 条 Issue 与 50 条 PR 更新。社区核心关注点集中在 **Zen 免费层配额问题**（#59387 已持续讨论超 300 条评论）及 **2.2.6 版本数据丢失风险**（#62659）。同时，TUI 插件系统、桌面端稳定性及 API 功能完善成为开发者提交 PR 的重点领域。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 核心指标 | 关注理由 |
|---|------|------|----------|----------|
| [#59387](https://github.com/anomalyco/opencode/issues/59387) | [zen] Free tier issues: read this first, then post your report here | OPEN | 326 评论 / 24 👍 | 免费层配额问题的主楼，涉及“免费用量已超”“重置不生效”等高频报错，社区反应最为强烈，需官方优先回应。 |
| [#62659](https://github.com/anomalyco/opencode/issues/62659) | data: all sessions lost — data dir recreated from scratch at service bootstrap (2.2.5→2.2.6) | OPEN | 1 评论 | 升级后数据目录被重建，导致 8 月至 11 月所有会话记录丢失，属严重数据安全问题，需引起高度重视。 |
| [#39986](https://github.com/anomalyco/opencode/issues/39986) | [reproduced] tui: support reactive external TSX plugins in packaged CLI | OPEN | 9 评论 / 1 👍 | 打包后的 Bun CLI 对外部 TUI 插件的 Solid 运行时变换支持不稳定，涉及插件生态成熟度。 |
| [#55268](https://github.com/anomalyco/opencode/issues/55268) | provider: big-pickle leaks chain-of-thought into visible text | OPEN | 5 评论 | 推理内容因字面闭合标签误判泄漏至可见文本通道，影响模型输出安全与可控性。 |
| [#61252](https://github.com/anomalyco/opencode/issues/61252) | [reproduced] app: hamburger menu shows message templates instead of item labels | OPEN | 3 评论 | 桌面端汉堡菜单渲染原始模板占位符（`{{path}}`/`{{error}}`），属本地化/UI 显示缺陷。 |
| [#62666](https://github.com/anomalyco/opencode/issues/62666) | TUI plugin from an npm package: solid-js signal updates do not re-render slots | CLOSED | 4 评论 | npm 包加载的 TUI 插件中，`createSignal` 更新未触发槽位重渲染，已关闭但反映插件响应式问题。 |
| [#62452](https://github.com/anomalyco/opencode/issues/62452) | [zen] limit message | CLOSED | 3 评论 | 用户反复收到“今日免费消息已用完”提示，与免费层限制逻辑相关。 |
| [#62206](https://github.com/anomalyco/opencode/issues/62206) | desktop: ResizeObserver loop storm on every launch (Windows) | CLOSED | 3 评论 | Windows 11 桌面端启动后出现 ResizeObserver 循环风暴，伴随 33–37 MB 渲染进程转储，影响启动体验。 |
| [#62655](https://github.com/anomalyco/opencode/issues/62655) | [FEATURE]: Add last chat message timestamp to GET /api/session | OPEN | 2 评论 | 社区请求会话 API 返回最近聊天消息时间戳，以便更精确的会话排序与展示。 |
| [#54861](https://github.com/anomalyco/opencode/issues/54861) | reasoning: v2.0.19 + opencode-go/deepseek-v4.1-flash — replies hidden inside reasoning | OPEN | 2 评论 | 推理与文本部分分类在单次会话中双向失效，导致用户可见回复被错误持久化为推理内容。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 变更摘要 |
|---|------|------|----------|
| [#62667](https://github.com/anomalyco/opencode/pull/62667) | fix(desktop): stop blocking startup on the login shell probe | OPEN | 桌面端主进程启动时不再因读取登录 shell 环境（`$SHELL -il -c "env -0"`）而阻塞，改善启动速度。 |
| [#62664](https://github.com/anomalyco/opencode/pull/62664) | feat(app): add /rename slash command | OPEN | 桌面端新增 `/rename` 斜杠命令，与 TUI 保持一致，支持通过命令行重命名会话。 |
| [#62662](https://github.com/anomalyco/opencode/pull/62662) | feat(core): wake sessions on Console event watches | CLOSED | 会话可在 Console 监听的 Slack 线程、GitHub PR/提交/Actions 运行事件触发时被唤醒。 |
| [#62654](https://github.com/anomalyco/opencode/pull/62654) | feat(site): add the shared product and logo menus to every nav | CLOSED | 统一 opencode.ai、文档、Data、Console 及状态页的导航栏，使用相同的产品与 Logo 菜单布局。 |
| [#62665](https://github.com/anomalyco/opencode/pull/62665) | fix(site): match the product chevron to the docs chevron | CLOSED | 修复产品名称后的 Chevron 图标与文档 Chevron 样式不一致的问题（#62654 的后续修复）。 |
| [#62660](https://github.com/anomalyco/opencode/pull/62660) | fix(data): keep native light-dark() so the shared nav menus get their colours | CLOSED | 修复 Data 页面产品菜单与 Logo 菜单因颜色丢失导致的不可读问题（#62654 的后续修复）。 |
| [#62150](https://github.com/anomalyco/opencode/pull/62150) | feat(app): match English source text in palette and settings search | CLOSED | 非英文 UI 下，面板与设置搜索现可匹配英文源文本，解决多语言环境下搜索失效问题。 |
| [#62176](https://github.com/anomalyco/opencode/pull/62176) | fix(core): keep Code Mode catalog updates small and stable | OPEN | 优化 Code Mode 目录更新，避免服务器连接/断开导致整个工具目录被重新陈列，减少 token 浪费与历史记录冗余。 |
| [#62141](https://github.com/anomalyco/opencode/pull/62141) | fix(core): clearer shell exit and timeout status, pass unmatched zsh globs through | OPEN | Shell 结果状态改为明确的 `Exit code: N`，超时提示等待时长与退出方式，zsh 传递未匹配的 glob 而非直接失败。 |
| [#62615](https://github.com/anomalyco/opencode/pull/62615) | fix(codemode): defer search index creation for known tool calls | OPEN | 仅在缺失工具建议时才读取 `searchIndex`，避免已知工具调用时提前创建搜索索引，提升性能。 |

---

## 功能需求趋势

从本日全部 Issues 与 PR 中，可提炼出以下社区关注方向：

1. **会话管理与 API 增强**  
   社区多次提出会话列表按项目分组（#62436）、会话 API 返回最近消息时间戳（#62655）、TUI 中代理发起顶层会话（#62663）等需求，表明开发者希望获得更灵活的会话组织与检索能力。

2. **TUI 插件生态稳定性**  
   外部 TSX 插件响应式支持（#39986）、npm 包加载的插件信号更新不重渲染（#62666）等问题反复出现，插件系统的跨运行时兼容性是下一阶段的重点。

3. **桌面端启动与渲染性能**  
   Windows 端 ResizeObserver 循环风暴（#62206）、登录 shell 探测阻塞启动（#62667）等问题集中在桌面应用的启动链路与渲染层，社区对启动速度与资源占用敏感度较高。

4. **免费层与配额透明度**  
   Zen 免费层配额问题（#59387、#62452、#62658）持续占据讨论热度，用户期望更清晰的配额重置机制与限制提示。

---

## 开发者关注点

**高频痛点：**
- **数据安全**：2.2.5 → 2.2.6 升级导致会话数据目录被重建（#62659），是当前最严重的回归问题。
- **免费层体验**：配额耗尽提示频繁且重置不生效（#59387、#62658），影响日常可用性。
- **推理内容泄漏**：big-pickle 提供商将推理链错误流式输出到可见文本（#55268、#54861），涉及输出可控性与安全边界。

**开发者反馈偏好：**
- 社区积极提交细粒度修复 PR（如导航 Chevron 对齐、Shell 退出状态明确化），倾向于通过小步快跑的方式改进稳定性。
- 多语言 UI 下的搜索与显示问题（#62150、#61252）表明国际化支持仍需持续打磨。

---

*注：本日报基于 GitHub anomalyco/opencode 仓库在 2026-11-07 至 2026-11-08 期间的 Issue 与 PR 更新数据生成。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-08)

## 今日速览

Hermes Agent 社区今日无新版本发布，但桌面端（Desktop）与网关（Gateway）稳定性成为核心关注点。多个与“已删除连接/网关重启后复活”相关的 Bug 已被修复并合并，同时社区积极推进插件生态扩展（如 Signal Dog、Distro Reader）及 Apple Foundation Models 适配工作。

---

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues

以下选取社区讨论活跃或影响较大的 7 条 Issue（今日更新共 7 条，全部列出）：

| # | 标题 | 状态 | 核心内容 | 社区反应/重要性 | 链接 |
|---|------|------|----------|----------------|------|
| #52554 | Desktop App: floating "Quote" button on selected text in chat pane | OPEN | 桌面端聊天面板缺少鼠标选中文本后的“引用”按钮，目前仅支持键盘操作（⌥-drag / Shift-drag + ⌘L/Ctrl+L）。 | 13 条评论，4 👍，UX 改进需求明确，桌面端用户关注度高。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/52554) |
| #53347 | [Feature]: Allow context_length below 64K — warn instead of hard failure | OPEN | Hermes 对 `model.context_length` 设置了 64K 硬下限，导致资源受限设备（如 16GB MacBook + Ollama）无法使用 32K 等较小上下文。 | 10 条评论，9 👍，轻量化部署场景的迫切需求，建议改为警告而非直接失败。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/53347) |
| #139029 | [Bug]: Kanban managed worker dies with WorkerPersistenceError: synchronous_rpc_on_event_loop | OPEN | Kanban 托管 Worker 在 v0.22.1 稳定版下因事件循环同步 RPC 问题崩溃，涉及会话状态持久化。 | 8 条评论，P1 优先级，影响任务调度稳定性，需跟进修复。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/139029) |
| #142906 | [Bug]: Desktop: deleted legacy HTTP gateway is restored as primary after restart, blocking SSH startup | CLOSED | Windows 桌面端删除旧 HTTP 网关后，重启后被重新设为主网关，阻塞 SSH 启动。 | 2 条评论，已关闭，桌面端连接管理回归问题的典型案例。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/142906) |
| #150933 | [Bug]: Rechecking a saved record returns stale history without tools | OPEN | 重新检查已保存记录时，返回对话历史中的过期值且不调用工具，即使用户显式要求重新读取。 | 1 条评论，新提交（11-07），涉及记忆/上下文一致性，值得关注。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/150933) |
| #149996 | [Bug]: Apple fm serve 400s every full-toolset turn — tool-schema unions | OPEN | 使用 Apple `fm serve`（macOS Foundation Models CLI）作为自定义 Provider 时，完整工具集回合返回 HTTP 400，疑似工具 Schema 联合类型问题。 | 1 条评论，macOS 原生模型适配新兴方向，涉及 Provider 兼容性。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/149996) |
| #150084 | Desktop: deleting a saved SSH connection doesn't stick — legacy-route drift heal re-creates it | CLOSED | 桌面端设置中删除保存的 SSH 连接后，下次读取或重启后会重新出现并被提升为默认连接。 | 0 评论，已关闭，与 #142906 同类“删除不生效”Bug。 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/150084) |

---

## 重要 PR 进展

选取 10 个代表性 PR（涵盖修复、功能、文档与安全）：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #150934 | fix(gateway): a typed relay reply answers the prompt its running turn waits on | OPEN | 修复带会话权威的网关上，通过 Relay 连接器发送的类型化回复未能到达正在等待的 Prompt 的问题。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/150934) |
| #150904 | fix(webapp): open saved SSH terminals over SSH | CLOSED | Webapp 端修复保存的 SSH 终端打开问题，改为通过保存连接建立 SSH PTY，保留 shell 所有权。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/150904) |
| #150938 | fix(whatsapp): support passkey verification during CLI pairing | OPEN | WhatsApp CLI 配对新增 passkey 交互验证，支持 `hermes whatsapp --passkey-browser EXECUTABLE` 完成握手，避免配对失败导致登出。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/150938) |
| #150928 | feat(plugin-catalog): add signal-dog plugin (Plugin Hackathon entry) | OPEN | 插件目录新增 Signal Dog 插件（Python 原生插件），通过麦克风监听家庭声音（敲门、设备运行等），为 Plugin Hackathon 参赛作品。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/150928) |
| #150916 | [ci-reviewed] A message sent while a clarify question is pending runs at once | OPEN | 修复 Hermes Cloud 聊天中，澄清问题（clarify question）挂起时用户发送其他消息会被排队长达 1 小时的问题，现改为 90 秒超时并立即处理。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/150916) |
| #149955 | fix(cron): require profile plugin hosts for foreign ticks | OPEN | 安全加固：外部 Profile 定时任务触发时，复用现有 per-profile 插件主机，避免在启动网关的 Python 解释器中发现外部 Profile 插件。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/149955) |
| #150881 | [ci-reviewed] A removed saved gateway stays removed after restart | CLOSED | 修复桌面端和 Webapp 中删除保存网关后重启会“复活”并成为主网关的问题，旧设置文件仅在首次迁移时读取一次。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/150881) |
| #143160 | fix(desktop): keep removed legacy gateway routes deleted | CLOSED | 修复删除保存网关后，`connection.json` 中的全局路径未被清理，导致 `reconcileRegistryDrift` 重新导入并设为主路径的问题。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/143160) |
| #128308 | fix(desktop): clear a removed connection's cookie jar and native tokens on removal | CLOSED | 桌面端移除连接时，除了拆除后端和 SSH 隧道外，现在还会清除 Electron Cookie Jar 和原生令牌，避免凭据残留。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/128308) |
| #126161 | docs(desktop): say keychain encryption of saved gateway tokens is opt-in | CLOSED | 文档更新：说明桌面端保存网关令牌的钥匙串加密自 v95015 起为 opt-in 且默认关闭，修正两处过时描述。 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/126161) |

---

## 功能需求趋势

从今日 Issues 与 PR 中提炼出的社区关注方向：

1. **桌面端交互体验优化**：用户希望在聊天面板中获得更直观的文本引用方式（如浮动“Quote”按钮），减少对键盘快捷键的依赖。
2. **轻量化与低资源部署支持**：社区强烈希望降低 `context_length` 的硬性下限（64K），以便在 16GB 内存等受限设备上运行 Hermes + Ollama。
3. **多 Provider 与本地模型适配**：Apple `fm serve`（Foundation Models / PCC）的集成问题凸显，社区正在推动对 macOS 原生模型及更多自定义 Provider 的支持。
4. **插件生态扩展**：Plugin Hackathon 相关 PR 增多（Signal Dog、Distro Reader 等），说明社区开发者正在积极贡献垂直领域插件。
5. **连接与网关状态持久性**：反复出现“删除后重启复活”的 Bug，说明用户对连接管理、网关路由和会话状态的可预期性有较高要求。

---

## 开发者关注点

1. **桌面端连接管理 Bug 频发**：多个 Issue 和 PR 围绕“已删除的 SSH 连接/HTTP 网关在重启后被重新创建并提升为主连接”展开，涉及 `reconcileRegistryDrift`、配置文件迁移及 Cookie Jar 清理，是桌面端稳定性的主要痛点。
2. **会话状态与 Worker 持久化**：Kanban 托管 Worker 因 `synchronous_rpc_on_event_loop` 崩溃，以及已保存记录返回 stale history 的问题，表明跨会话状态一致性仍需加强。
3. **Provider 兼容性与工具 Schema**：Apple `fm serve` 返回 HTTP 400 的问题提示，不同 Provider 对工具 Schema（尤其是联合类型）的支持不一致，需统一适配层或更宽松的 Schema 校验。
4. **云中继（Cloud Relay）实时性**：澄清问题（clarify question）下用户消息被长时间排队（原最高 1 小时）影响交互体验，已有 PR 将其缩短至 90 秒，但云中继消息路由的可靠性仍是开发者关注点。
5. **安全边界与凭据清理**：移除连接时需同步清理 Cookie Jar 和原生令牌，外部 Profile 定时任务需隔离插件主机，体现社区对多租户安全边界的重视。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-08)

## 今日速览

OpenClaw 社区今日活跃度持续，共更新 5 个 Issue 和 20 个活跃 Pull Request，围绕会话状态恢复、Provider 兼容性、UI 性能优化以及本地工具链稳定性展开。未发布新版本，但多个 P0/P2 级别的 Bug 修复 PR 已进入审核阶段，涉及 Gateway、Web UI 和 CLI 核心模块。

## 版本发布

过去 24 小时内无新版本发布。

## 社区热点 Issues

以下 5 个 Issue 为过去 24 小时内更新的全部 Issue，按优先级和影响范围排序：

| # | 标题 | 核心内容 | 为何值得关注 | 链接 |
|---|------|---------|-------------|------|
| #194878 | `before_prompt_build` 无法在同一轮中观察到 claude-cli 会话重置 | 连续性插件无法在首个受影响模型轮次前选择性恢复上下文 | P2 优先级，标记为 `diamond lobster` 且涉及 `session-state`，对会话连续性插件开发者影响大 | [查看](https://github.com/openclaw/openclaw/issues/194878) |
| #194875 | Doctor 无法在成功修复后解决禁用 iMessage 状态迁移 | 外部 iMessage 插件状态迁移在通道禁用后仍停留 pending | P2 优先级，`maturity:stable`，影响状态迁移与 Doctor 诊断准确性 | [查看](https://github.com/openclaw/openclaw/issues/194875) |
| #194731 | 小模型 Web 工具修复 (PR #169556) 是否覆盖 omlx/MLX 提供商？ | 询问 Ollama 端的 Web 工具安全修复是否扩展至 MLX 提供商 | 涉及本地模型提供商兼容性，社区关注跨提供商功能一致性 | [查看](https://github.com/openclaw/openclaw/issues/194731) |
| #194705 | 在提供商目录中列出 NagaAI | 建议将 NagaAI 加入外部提供商目录，避免用户手动维护模型列表 | 提供商生态扩展需求，反映社区对更多第三方模型供应商原生支持的期待 | [查看](https://github.com/openclaw/openclaw/issues/194705) |
| #184709 | 支持 ElevenLabs 批量转录的关键词提示 | 允许通过 `providerOptions.elevenlabs` 向 Scribe v2 传递显式词汇表 | 功能增强类 Issue，涉及语音转录场景下的专业术语支持 | [查看](https://github.com/openclaw/openclaw/issues/184709) |

> 注：今日更新的 Issue 共 5 条，全部已列出。各 Issue 均有 1 条评论，暂无点赞数据，社区讨论处于早期阶段。

## 重要 PR 进展

从过去 24 小时更新的 20 个活跃 PR 中，选取 10 个代表性修复与功能：

| # | 标题 | 作者 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #194430 | fix(gateway): 修复并发托管工作区编辑后的访客任务恢复 | @MasterSwords1 | P0 级别，修复访客任务因并发编辑而永久卡住的问题，涉及会话状态与安全边界，合并风险高 | [查看](https://github.com/openclaw/openclaw/pull/194430) |
| #194866 | fix(ui): 提供商设置在推进到端点兼容性时失败 | @steipete | 修复 Chromium 中 10/10 复现的 `Cannot read properties of undefined (reading 'variant')` 渲染崩溃 | [查看](https://github.com/openclaw/openclaw/pull/194866) |
| #194846 | fix(swabble): 转录历史忽略 `transcripts.maxEntries` | @thejesh23 | 修复日志固定保留 100 条，现遵循 `transcripts.maxEntries` 配置（默认 50） | [查看](https://github.com/openclaw/openclaw/pull/194846) |
| #194860 | fix(agents): Claude Code 会话限制通知跳过速率限制回退 | @DasX | 修复会话限制结束原因被错误分类为 `unknown`，影响 failover 行为 | [查看](https://github.com/openclaw/openclaw/pull/194860) |
| #194810 | fix: doctor/status 在 beta→stable 后仍推荐仅 ID 的插件更新 | @DonnieFi | 修复切换到稳定版后仍推荐 `@beta` 插件选择器，导致用户停留在 beta 插件线 | [查看](https://github.com/openclaw/openclaw/pull/194810) |
| #194874 | perf(ui): 在库存读取期间保持技能发现可用 | @steipete | 解决 Skills 路由因等待缓慢库存读取而隐藏页面 Chrome 和搜索输入的问题 | [查看](https://github.com/openclaw/openclaw/pull/194874) |
| #194845 | fix(swabble): serve 用默认值覆盖不可读配置 | @thejesh23 | 修复配置文件加载失败时 `serve` 会用默认值覆盖用户配置，现保留原文件并报错 | [查看](https://github.com/openclaw/openclaw/pull/194845) |
| #194813 | fix: 压缩在配额错误后跳过配置的回退 | @roboclaw-bot | 修复 summarizer 返回 HTTP 429 时压缩不再尝试配置的回退提供商 | [查看](https://github.com/openclaw/openclaw/pull/194813) |
| #194724 | fix(goals): 在未配置操作员角色的情况下继续本地 Codex 目标 | @VACInc | 修复本地 Codex `/goal` 会话在未配置可选 Gateway 操作员角色后意外停止 | [查看](https://github.com/openclaw/openclaw/pull/194724) |
| #194808 | feat(backup): 将 PostgreSQL 存储恢复到暂存数据库用于恢复演练 | @etzelm | 新增 `--postgres-connection-env` 标志，支持指定不同的 PostgreSQL 目标进行恢复演练 | [查看](https://github.com/openclaw/openclaw/pull/194808) |

## 功能需求趋势

从今日 Issues 与 PR 中提炼出的社区关注方向：

1. **本地模型与提供商生态扩展**：社区持续推动更多第三方提供商（如 NagaAI、MLX/OmLX）的原生支持，减少手动配置 OpenAI 兼容端点的成本。
2. **会话状态与连续性**：多个 Issue 和 PR 围绕会话重置、会话限制、状态迁移展开，说明用户对长时间运行任务的状态保持与恢复能力要求较高。
3. **Web UI 性能与可用性**：提供商设置流程、Skills 发现页面、Logbook 历史时间线等 UI 环节的卡顿与崩溃问题被频繁提及，前端体验优化成为高频需求。
4. **本地工具链稳定性**：Codex 目标会话、swabble 转录历史、CLI 插件更新等本地化功能的稳定性问题较为集中，社区期望本地运行体验与云端保持一致。

## 开发者关注点

1. **会话状态边界处理**：`before_prompt_build` 无法在同一轮观察会话重置，以及访客任务在并发编辑后的恢复问题，表明会话状态机的边界条件仍需完善。
2. **错误分类与回退机制**：Claude Code 会话限制被误分类为 `unknown`、压缩诊断误将提供商 429 归因于质量守卫，反映错误原因识别与回退逻辑存在误报。
3. **配置容错性**：`swabble serve` 覆盖不可读配置、Doctor 在 beta→stable 后仍推荐 beta 插件，说明配置加载失败与版本切换后的状态同步需要更严谨的容错设计。
4. **P0 合并风险**：#194430 涉及会话状态与安全边界，标记为 `merge-risk: 🚨`，社区维护者需谨慎评估其对主干稳定性的影响。

:::
