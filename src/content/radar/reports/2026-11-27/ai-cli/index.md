---
title: "AI CLI 工具社区动态日报"
published: 2026-11-27
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-27

> 生成时间: 2026-11-27 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告 (2026-11-27)

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单一对话界面”向“多代理协作与跨平台自动化”深度演进的关键期。各主流工具均在加强子代理编排、上下文压缩与安全护栏能力，同时计费透明度、跨平台消息可靠性及第三方生态集成（MCP/插件）成为普遍性痛点。商业闭源工具（Claude Code、Codex）侧重模型绑定与企业级安全合规，开源/社区驱动工具（OpenCode、Hermes、OpenClaw）则更关注可扩展性与跨平台一致性。整体而言，活跃项目日均 Issues 与 PR 规模维持在高位，但稳定性缺陷（P1/P2 级 Bug）仍是制约生产环境大规模采用的主要瓶颈。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues (24h) | PR (24h) | 最新 Release | 核心活跃特征 |
|------|------|-------------|---------|-------------|-------------|
| Claude Code | anthropics/claude-code | 47 | 6 | 无 | 计费争议高频，开源化 PR 持续发酵 |
| OpenAI Codex | openai/codex | 46 | 35 | rust-v0.174.0-alpha.7/8 | Rust 端 Alpha 快速迭代，TUI 与安全审计优化密集 |
| Gemini CLI | google-gemini/gemini-cli | 未披露具体数 | 未披露具体数 | 无 | 子代理与 ACP 协议修复为主，P1 级 Bug 集中 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 0 | 0 | 无 | 无活动 |
| OpenCode | anomalyco/opencode | 12 | 50 | v2.4.2 | PR 密集度高，子代理与上下文压缩稳定性为核心 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 无活动 |
| Hermes | NousResearch/hermes-agent | 9 | 50 | 无 | Windows 平台与 Gateway 稳定性修复为主，插件生态活跃 |
| OpenClaw | openclaw/openclaw | 8 | 50 | v2026.10.34 | 跨平台消息投递与凭据安全修复，gateway-only LTS 发布 |

> 注：PR 数量较高的项目（OpenCode、Hermes、OpenClaw 均约 50 个）多为社区驱动或插件生态丰富的项目，其变更颗粒度较细；Claude Code 与 Gemini CLI 虽 Issue 数较多，但 PR 数相对较少，说明核心团队对主干代码的把控更为集中。

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重叠的诉求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **子代理/多代理稳定性** | Claude Code、Gemini CLI、OpenCode | 子代理状态上报错误（Gemini #22323）、上下文压缩导致子代理失败（OpenCode #56862）、前台子代理执行恢复（OpenCode #64073） |
| **计费与配额透明度** | Claude Code、OpenAI Codex | 5 小时限额与实际 Token 不匹配（Claude Code #108661、#111759）、CLI 会话在配额重置后无法自动恢复（Codex #21073）、每周限额重置异常（Codex #64123） |
| **跨平台消息可靠性** | Claude Code、OpenAI Codex、OpenClaw | iOS 消息延迟/丢失（Claude Code #108975、Codex #60778）、iMessage/Signal/Mattermost 消息投递失败（OpenClaw #203329、#206226） |
| **第三方生态集成（MCP/插件/OAuth）** | Claude Code、OpenAI Codex、Hermes | MCP OAuth 认证失败（Claude Code #112081）、插件权限与服务端生效（OpenCode #66689）、OAuth 重定向 URI 修复（Hermes #158418） |
| **安全护栏与误报处理** | Claude Code、Hermes、OpenClaw | Bash 命令字符串检查误报（Claude Code #112621）、终端 heredoc 误判（Hermes #160584）、凭据明文存储合规风险（OpenClaw #206225） |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 桌面端交互、Artifacts 多模态、计费模型 | Anthropic 生态付费用户、企业开发者 | 客户端计费逻辑闭源，桌面端 + 移动端双端同步，强调与 Claude.ai 端体验一致 |
| **OpenAI Codex** | TUI 交互、Computer Use（屏幕/摄像头权限）、Guardian V3 安全审计 | OpenAI API 开发者、桌面端自动化场景 | Rust 端 Alpha 架构，强调本地执行与云端混合模式，安全审计机制内置 |
| **Gemini CLI** | 子代理编排、ACP（Agent Communication Protocol）、浏览器代理 | Google 生态开发者、多代理协作场景 | ACP 协议头less/嵌入式支持，工具调用超时与上下文预算控制为核心 |
| **OpenCode** | 子代理通知机制、上下文压缩、多模态请求分片 | 开源社区贡献者、需要自托管/定制化的团队 | 插件化架构，支持 Azure Foundry 等多模型提供商，强调会话生命周期可控 |
| **Hermes** | Gateway 事件循环、Windows/MSIX 分发、插件目录（Linear/QuickBooks OAuth） | 桌面端用户、企业插件生态构建者 | Python 插件生态丰富，Gateway 架构，侧重跨平台（Windows/macOS/Linux）稳定性 |
| **OpenClaw** | 跨平台消息网关（iMessage/Signal/Mattermost）、凭据加密存储、Codex 插件兼容 | 即时通讯集成开发者、安全合规要求高的团队 | Gateway-only LTS 发布，强调消息投递可靠性与 SecretRef 密钥管理 |

## 5. 社区热度与成熟度

- **高热度、快速迭代**：OpenAI Codex（35 PR + 2 Alpha 版本）、OpenCode（50 PR + v2.4.2 发布）、Hermes（50 PR）、OpenClaw（50 PR + v2026.10.34 LTS）。这些项目 PR 密集，说明社区贡献活跃，但也伴随较多回归缺陷（regression），处于功能扩张期。
- **中热度、稳定为主**：Claude Code（47 Issue，但仅 6 PR，无新版本）、Gemini CLI（Issue 与 PR 活跃，但无 Release）。核心团队对主干控制较强，社区更多体现为 Issue 反馈而非代码贡献。
- **低热度/停滞**：DeepSeek Reasonix、Deepseek Harness 均无 24 小时活动，社区关注度低或处于维护期。

从成熟度看，OpenCode、Hermes、OpenClaw 的 PR 规模表明其插件/扩展生态已初步形成；而 Claude Code 与 OpenAI Codex 因商业闭源特性，社区更多集中在 Bug 反馈与功能请求，开源化诉求（Claude Code 有两个大型开源化 PR）反映用户对代码透明度的强烈期待。

## 6. 值得关注的趋势信号

1. **计费透明度成为采用门槛**：Claude Code 与 OpenAI Codex 均出现大量计费与限额异常 Issue，说明 AI CLI 工具的商业模式（按 Token/按时限额）与客户端实际消耗之间的信任缺口正在扩大。开发者在选型时应重点评估计费审计能力与配额恢复机制。

2. **子代理编排从“锦上添花”变为“刚需”**：Gemini CLI、OpenCode、Claude Code 社区均围绕子代理稳定性、上下文压缩与多代理通信展开讨论，预示未来 AI CLI 将从单轮对话工具演进为多代理工作流编排平台。

3. **跨平台一致性仍是短板**：iOS/Android/Windows/macOS 之间的消息同步、权限生命周期（Computer Use 摄像头/屏幕捕获）、UI 渲染差异频繁出现回归缺陷，跨平台桌面端稳定性是当前所有工具的共同弱项。

4. **MCP/插件生态正在快速成熟但认证脆弱**：多个工具出现 OAuth 重定向 URI 错误、插件权限未服务端生效等问题，说明第三方集成层尚未标准化，开发者在构建基于 MCP 的插件时需预留认证容错与降级机制。

5. **安全护栏向“上下文感知”演进**：从基于字符串的 Bash 命令拦截，向支持细粒度例外、工作负载感知（如 ITAD 设备擦除合法场景）转变，安全策略的可配置性将成为企业级采购的关键考量。

**对开发者的参考建议**：若追求生态成熟度与多模型适配，OpenCode 与 Hermes 的插件化架构更具扩展性；若侧重桌面端自动化与安全审计，OpenAI Codex 的 Guardian V3 机制值得关注；若需要即时通讯网关集成，OpenClaw 的 gateway-only LTS 版本最为稳定。无论选型哪款，建议优先验证其计费透明度、子代理容错能力及跨平台消息可靠性三项核心指标。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-27）

## 1. 热门 Skills 排行

基于 PR 活跃度与社区关注度，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 fix(mcp-builder) | 修复 `mcp-builder` 对 `mcp>=2.0.0` 的兼容性，适配 `streamable_http_client` 重命名及自定义 HTTP 头配置方式 | MCP 协议版本迁移导致连接脚本失效，社区关注官方 Skill 对底层依赖升级的跟进速度 | OPEN | https://github.com/anthropics/skills/pull/1742 |
| 2 | #1298 fix(skill-creator) | 修复 `skill-creator` 触发评估（trigger evals）的误报/漏报问题，修复 Windows 下 `select()` 管道失效及运行时失败误判 | 技能创建工具本身的可靠性直接影响社区贡献门槛，Windows 兼容性与评估准确性是核心痛点 | OPEN | https://github.com/anthropics/skills/pull/1298 |
| 3 | #1245 Add notion-spec-to-implementation & quantitative-resume-auditor | 新增两个 Skill：将 Notion 产品/技术规格转为可执行的实现任务；基于量化指标审计简历质量 | 企业知识库（Notion）与 AI 工作流的结合，以及简历筛选等 HR 自动化场景受到关注 | OPEN | https://github.com/anthropics/skills/pull/1245 |
| 4 | #1980 webapp-testing | 移除 `with_server.py` 中 `shell=True` 的使用，消除命令注入风险（CWE-78） | Web 应用测试 Skill 的安全加固，社区对代码执行安全边界的关注度提升 | OPEN | https://github.com/anthropics/skills/pull/1980 |
| 5 | #1792 fix(docx) | 修复 `docx` Skill 中 LibreOffice 超时被误报为成功的问题，增加输出文档修订痕迹验证 | 文档自动化处理的可靠性与错误处理，企业级文档工作流的关键痛点 | OPEN | https://github.com/anthropics/skills/pull/1792 |
| 6 | #1771 feat(proofcore-contract-auditor) | 新增 Web3 智能合约审计 Skill，对 Solidity/Rust 合约进行静态分析，并将审计证明锚定至 TON 区块链 | 区块链/智能合约安全审计进入 Claude Code Skills 生态，代表垂直领域专用 Skill 的探索 | OPEN | https://github.com/anthropics/skills/pull/1771 |
| 7 | #1703 Add md2video-audio | 新增 `md2video-audio` Skill，将 Markdown 文档通过 Marp 转为带人声旁白的 MP4 视频 | 内容多模态转换（文档→视频）的零成本自动化方案，创作者工具需求明显 | OPEN | https://github.com/anthropics/skills/pull/1703 |
| 8 | #525 Add pyxel | 新增 `pyxel` Skill，辅助使用 Python Pyxel 框架进行复古游戏开发、调试与帧级验证 | 游戏开发垂直领域 Skill，体现社区对特定编程框架的适配需求 | OPEN | https://github.com/anthropics/skills/pull/525 |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区目前最期待的新 Skill 方向与改进方向如下：

1. **组织级技能共享与协作**  
   Issue #228 呼吁在 Claude.ai 内实现组织内技能直接共享，避免手动下载/上传 `.skill` 文件，反映企业团队对技能分发与协作流程的刚性需求。

2. **技能创建与评估工具链完善**  
   Issue #556、#1352、#202 指出 `run_eval.py` 触发率统计失效、并行 worker 下 UUID 交叉匹配导致误报，以及 `skill-creator` 文档化过于冗长。社区期待更可靠、更高效的技能编写与验证工具。

3. **安全与信任边界**  
   Issue #492 披露社区技能冒用 `anthropic/` 命名空间的信任漏洞，用户担心非官方技能获得过高权限，暗示社区对技能来源验证、命名空间隔离及安全审计机制的需求迫切。

4. **文档与内容类技能优化**  
   Issue #1487（`claude-api` 注入 156k token 耗尽上下文）、#189（重复技能安装）、#2064（技能描述缺乏使用场景说明）均指向文档类技能的体验问题：按需加载、去重、以及清晰的触发场景定义。

5. **垂直领域专用技能**  
   Issue #1329（`compact-memory` 符号化状态）、#1385（推理质量门禁流水线）、#412（`agent-governance` 安全模式）显示社区希望在长上下文记忆、推理质量控制、Agent 治理等高阶场景获得专用技能支持。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、更新频繁，且解决了社区共性痛点，可能近期落地：

- **#1742 fix(mcp-builder)**：MCP 协议 2.0 兼容性修复，影响所有使用 `mcp-builder` 的技能，修复窗口期较短，合并优先级高。  
  https://github.com/anthropics/skills/pull/1742

- **#1298 fix(skill-creator)**：直接关系到社区贡献新技能的门槛与质量，Windows 兼容性与触发评估准确性是阻碍更多外部贡献的关键瓶颈。  
  https://github.com/anthropics/skills/pull/1298

- **#1980 webapp-testing**：涉及命令注入安全漏洞（CWE-78），属于安全修复类 PR，通常会获得维护者快速审核与合并。  
  https://github.com/anthropics/skills/pull/1980

- **#1792 fix(docx)**：文档类技能使用广泛，LibreOffice 超时误报问题影响自动化流程可靠性，修复后可提升企业文档工作流稳定性。  
  https://github.com/anthropics/skills/pull/1792

- **#1245 Add notion-spec-to-implementation & quantitative-resume-auditor**：跨 Notion 知识库与简历审计两个高频企业场景，功能完整且更新持续，具备较强落地潜力。  
  https://github.com/anthropics/skills/pull/1245

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在扩展垂直领域能力（如 Web3 审计、文档自动化、多模态内容生成）的同时，亟需通过修复 `skill-creator` 评估工具、规范命名空间信任边界及加强安全加固，构建更可靠、可共享、企业级可用的技能生态基础设施。**

---

# Claude Code 社区动态日报 (2026-11-27)

## 今日速览

过去 24 小时内，Claude Code 仓库未发布新版本，但社区活跃度保持高位，共更新 47 条 Issue 和 6 条 PR。**费用计费异常（5 小时限额消耗过快）成为今日最高频的讨论话题**，多个平台（Windows、macOS）的用户反馈计费与实际 Token 用量不匹配；同时，iOS 端消息传递回归、MCP OAuth 认证失败、以及开源化 PR 持续引发社区关注。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 核心标签 | 关注理由 |
|---|------|------|---------|----------|----------|
| [#108975](https://github.com/anthropics/claude-code/issues/108975) | iOS App Mid-Turn 消息不再实时送达 Claude，需等待 Turn 结束 | OPEN | 12 / 6 | `bug`, `platform:macos`, `platform:ios`, `area:core`, `regression` | 评论数最高的跨平台核心回归缺陷，直接影响移动端交互体验，社区讨论集中在回归原因与修复进度。 |
| [#112473](https://github.com/anthropics/claude-code/issues/112473) | 教育类短输出下出现异常高额用量消耗 | OPEN | 9 / 0 | `bug`, `platform:windows`, `area:cost`, `platform:vscode`, `regression` | 今日新建（11-26），反映 VS Code 插件场景下计费与实际使用不符，短期内可能影响教育用户。 |
| [#108661](https://github.com/archaic) | 5 小时用量限额提前耗尽，远低于历史同等窗口 | OPEN | 5 / 2 | `bug`, `platform:windows`, `area:cost` | 持续更新的计费争议，用户强调未使用 claude.ai 端，问题仅限 Claude Code，排查范围聚焦客户端计费逻辑。 |
| [#111759](https://github.com/anthropics/claude-code/issues/111759) | 5 小时用量限额填充速度比之前快约 2 倍 | OPEN | 1 / 3 | `bug`, `platform:windows`, `platform:macos`, `area:cost`, `regression` | 跨平台回归缺陷，👍 数相对较高，表明多平台用户均遇到类似计费异常。 |
| [#110773](https://github.com/anthropics/claude-code/issues/110773) | 5 小时用量限额消耗速度远超 Token 用量提示 | OPEN | 3 / 1 | `bug`, `platform:windows`, `area:cost`, `platform:vscode` | 本地 Transcript 显示 Token 未增加，但限额占比上升，指向计费统计与实际消耗的脱节。 |
| [#102233](https://github.com/anthropics/claude-code/issues/102233) | 桌面端会话信息面板（Environment 卡片）无法隐藏，分屏视图浪费宽度 | OPEN | 4 / 4 | `enhancement`, `platform:windows`, `area:ui`, `area:desktop` | UI 空间利用率问题，👍 数较高，反映桌面端布局灵活性需求强烈。 |
| [#108694](https://github.com/anthropics/claude-code/issues/108694) | Artifacts 语音交互：语音提问并由 Claude 朗读 Artifact 内容 | OPEN | 3 / 2 | `enhancement`, `platform:macos`, `area:desktop` | 多模态交互功能请求，社区关注语音模式与 Artifacts 的深度融合。 |
| [#112621](https://github.com/anthropics/claude-code/issues/112621) | 合法 ITAD 设备擦除请求被安全拦截 | OPEN | 2 / 0 | `bug` | 涉及安全策略误报与合法企业场景（IT 资产处置）的冲突，提示安全护栏需更细粒度的例外机制。 |
| [#112377](https://github.com/anthropics/claude-code/issues/112377) | 明确说明 `claude -p` 即使在交互模式被拒绝后，仍会计费 ANTHROPIC_API_KEY | OPEN | 2 / 0 | `bug`, `platform:linux`, `area:cost`, `area:auth` | API 密钥计费透明度问题，用户要求 CLI 场景下的计费行为更明确。 |
| [#112081](https://github.com/anthropics/claude-code/issues/112081) | Canva MCP OAuth 失败，提示 "Invalid redirect URI" | OPEN | 1 / 0 | `bug`, `platform:windows`, `area:auth`, `area:mcp` | MCP 生态集成中的典型认证失败案例，反映第三方连接器 OAuth 流程仍不稳定。 |

---

## 重要 PR 进展（精选 6 条，全部可用 PR）

| # | 标题 | 状态 | 作者 | 功能/修复摘要 |
|---|------|------|------|---------------|
| [#112436](https://github.com/anthropics/claude-code/pull/112436) | 不再将可复现或高影响 Issue 标记为 stale | OPEN | @bpasero-ant | 调整 stale 扫描逻辑：带有 `has repro`、`reproduced`、`data-loss`、`high-priority` 标签的 Issue 不再被自动标记或关闭，旨在保留高价值反馈。 |
| [#41518](https://github.com/anthropics/claude-code/pull/41518) | Fully Open Source Claude Code | OPEN | @BH3GEI | 从 `cli.js.map`（57MB）中提取 1906 个 TypeScript 源文件，添加 Bun 打包配置与缺失模块 Stub，实现 `--version` / `--help` 正常运行，是开源化尝试的重要里程碑。 |
| [#41447](https://github.com/anthropics/claude-code/pull/41447) | feat: open source claude code ✨ | OPEN | @gameroman | 另一份开源化 PR，关联多个历史 Issue（#59、#456、#2846 等），社区对完整开源代码库的需求持续发酵。 |
| [#35761](https://github.com/anthropics/claude-code/pull/35761) | 添加 powershell-default 插件：将 PowerShell Preview 设为默认 Shell | CLOSED | @cruzlauroiii | 跨平台插件，通过 `SessionStart` Hook 检测并注入 PowerShell 语法规则，改善 Windows 及多平台终端体验。 |
| [#35684](https://github.com/anthropics/claude-code/pull/35684) | 添加 bridge-fix 插件：修复 Chrome 扩展桥接连接失败 | CLOSED | @cruzlauroiii | 针对 Max 订阅用户的 `tengu_copper_bridge` 连接失败提供自动安装/卸载脚本，替代之前的 #34789 方案。 |
| [#35683](https://github.com/anthropics/claude-code/pull#35683) | 添加 scroll-fix 插件：修复终端滚动到顶部回归 | CLOSED | @cruzlauroiii | 拦截并限制同步输出块内的累积光标上移，提供 Ctrl+6 冻结切换，修复全平台终端滚动回归问题。 |

> 注：仓库过去 24 小时内仅更新 6 条 PR，均已列出。

---

## 功能需求趋势

从 Issue 与 PR 中提炼出的社区关注方向：

1. **计费透明度与限额修正**  
   多个高频 Issue 指向 5 小时用量限额与实际 Token 消耗不匹配，用户要求更透明的计费说明、限额扣除逻辑审计，以及 CLI（`claude -p`）与交互模式下的计费边界明确化。

2. **跨平台稳定性（iOS / Android / 桌面端）**  
   iOS Mid-Turn 消息延迟、Android 远程会话消息丢失、macOS 桌面端冻结、Windows MSIX 安装/自动更新失败，表明移动端与桌面端的同步与稳定性是当前短板。

3. **MCP 与第三方集成**  
   Canva OAuth 失败、MCP 工具 Schema 占用上下文 Token、连接器认证问题，反映用户正在积极扩展 MCP 生态，但期待更可靠的 OAuth 流程与资源占用控制。

4. **UI/UX 灵活性**  
   桌面端 Environment 卡片无法隐藏、CLI 侧边栏实时代码版本显示、Artifacts 语音交互，用户希望界面布局更可定制，并引入语音与多模态交互。

5. **安全护栏与误报处理**  
   `PreToolUse` Bash 守护仅检查字符串、合法 ITAD 擦除被拦截、Windows VM 实验室误报，开发者希望安全策略支持更细粒度的例外配置与上下文感知。

6. **开源化与社区贡献**  
   两个大型开源化 PR 持续更新，社区强烈希望 Anthropic 开放完整源代码，并允许社区通过插件机制扩展 Shell、桥接、终端行为等底层能力。

---

## 开发者关注点（痛点与高频需求）

- **计费异常是首要痛点**：Windows/macOS 上 5 小时限额消耗速度异常，且与本地 Token 统计不符，用户怀疑客户端计费逻辑存在回归或统计偏差。
- **移动端消息可靠性**：iOS 端消息在 Mid-Turn 不实时送达，Android 远程会话消息丢失，影响跨设备工作流的连续性。
- **MCP 认证脆弱**：OAuth 重定向 URI 错误等问题导致第三方连接器（如 Canva）无法正常使用，需更稳健的认证握手机制。
- **安全策略过于严格**：基于字符串的 Bash 命令检查无法覆盖脚本内的破坏性命令，且合法运维场景（如设备擦除）易被误拦截。
- **桌面端布局僵化**：分屏视图下信息面板无法隐藏，浪费屏幕空间，用户期待更灵活的 UI 定制选项。
- **开源化诉求强烈**：社区持续推动完整开源 Claude

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-27  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

过去24小时，OpenAI Codex 仓库发布了两个 Rust 端 Alpha 版本（v0.174.0-alpha.7/8），社区活跃度保持高位，共更新 46 条 Issue 和 35 条 PR。Windows 平台的“电脑使用”（Computer Use）权限残留与 iOS 端会话列表空白成为讨论热点；CLI 侧则集中于 TUI 交互细节优化与 Guardian V3 安全审计机制的完善。

---

## 2. 版本发布

| 版本 | 发布时间 | 备注 |
|------|---------|------|
| rust-v0.174.0-alpha.8 | 2026-11-27 | Rust 端 Alpha 迭代，具体变更未详述 |
| rust-v0.174.0-alpha.7 | 2026-11-27 | Rust 端 Alpha 迭代，具体变更未详述 |

> 两个版本均为预发布通道，建议开发者在生产环境谨慎升级，并关注后续稳定版发布说明。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数）与影响范围筛选：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|---------|---------|------|
| #57101 | Windows Computer Use：截图生成后捕获权限与金色/黄色显示边框未关闭 | Windows 桌面应用在截图产生的回合结束后，摄像头/屏幕捕获权限及视觉边框持续占用，可能引发隐私与资源泄露担忧 | 评论数最高（90条），Windows 用户关注度集中，涉及权限生命周期管理 | [查看](https://github.com/openai/codex/issues/57101) |
| #62943 | Windows 11 月 21 日更新回归：新对话丢失权限与执行位置选择器，Max 推理等级消失 | Nov 21 更新后，Windows 端新建对话时权限选择器与“本地/云端”运行位置选择器消失，Max 推理等级选项亦不可见 | 37条评论，18👍，直接影响工作流配置，属明显回归缺陷 | [查看](https://github.com/openai/codex/issues/62943) |
| #60778 | iOS Codex 显示“无任务”，但既有对话仍可通过搜索访问 | iPhone 端 Codex 界面显示绿色主机连接状态，但任务列表为空，提示“Start a task to see it here”，既有对话仅能通过搜索找到 | 35条评论，19👍，iOS 端 UI 与数据同步问题 | [查看](https://github.com/openai/codex/issues/60778) |
| #21073 | 功能请求：CLI 会话在使用量限制重置后自动恢复 | CLI 命中配额时错误信息已给出重置时间，但若重置时段用户正在睡眠，任务将中断且无法自动续期 | 25条评论，**95👍（全榜最高）**，社区强烈希望 CLI 增加自动恢复机制 | [查看](https://github.com/openai/codex/issues/21073) |
| #62669 | Windows 某些窗口宽度下文件路径面包屑持续闪烁 | Codex Desktop 26.1117 在特定窗口宽度下，文件路径导航栏出现连续闪烁 | 18条评论，6👍，Windows 桌面端 UI 渲染稳定性问题 | [查看](https://github.com/openai/codex/issues/62669) |
| #63093 | macOS 新建 Work 聊天时“本地/云端”选择器缺失 | macOS ChatGPT 26.1117.41037 新建 Work 聊天页不再显示运行位置选择器，用户无法明确选择本地或云端执行 | 12条评论，6👍，用户体验退步，社区质疑是故障还是有意移除 | [查看](https://github.com/openai/codex/issues/63093) |
| #63466 | GPT-6.2 Astra 和 Sol：行为回归、执行不可靠及过度人工监督 | GPT-6.2 发布后，多个此前正常运行的应用出现持续模型行为问题，即使是简单任务也需频繁人工干预 | 10条评论，5👍，围绕新模型版本的稳定性展开讨论 | [查看](https://github.com/openai/codex/issues/63466) |
| #62195 | GPT-6.2 SOL：相较 GPT-6.1 SOL，指令遵循、主动性与任务完成能力回归 | 用户在 Codex/Work 中使用 GPT-6.2 SOL 评估编程项目时，发现指令遵循与任务完成能力不如 GPT-6.1 SOL | 8条评论，15👍，模型版本对比与回归报告 | [查看](https://github.com/openai/codex/issues/62195) |
| #56955 | shell_environment_policy 默认排除项剥离 GIT_CONFIG_KEY_n 但保留 GIT_CONFIG_COUNT，破坏所有 git 命令 | CLI shell 环境策略在忽略默认排除项时，因模式匹配问题导致 Git 配置环境变量不完整，进而破坏 git 命令 | 5条评论，2👍，CLI 配置缺陷直接影响开发者日常 Git 工作流 | [查看](https://github.com/openai/codex/issues/56955) |
| #64123 | 使用量重置未应用到强制每周限制；使用量页面在 7% 和 93% 余量之间交替 | Linux 端 Codex CLI 0.172.0，ChatGPT Pro 100 计划，每周使用量限制重置未生效，页面数据反复跳变 | 新创建 Issue（11-26），涉及计费与配额系统可靠性 | [查看](https://github.com/openai/codex/issues/64123) |

---

## 4. 重要 PR 进展（精选 10 条）

过去24小时内合并的 PR 多为 TUI 交互细节优化、MCP 服务器稳定性及 Guardian V3 安全审计增强：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #64232 | Consolidate TUI tests and prune snapshots | 为 Markdown 文件链接、积分显示、文本截断等使用表驱动测试；合并历史搜索去重与边界检查、Vim 光标移动等用例 | [查看](https://github.com/openai/codex/pull/64232) |
| #64230 | Render matching file link labels once in the TUI | 修复 Markdown 文件链接重复渲染问题，例如 `[docs/guide.md](docs/guide.md)` 不再显示为 `docs/guide.md (docs/guide.md)` | [查看](https://github.com/openai/codex/pull/64230) |
| #64221 | Keep MCP startup from showing the TUI as working | MCP 启动不再在用户回合开始前错误显示“Working”状态；重载 MCP 服务器时不再临时隐藏未读“Done”状态 | [查看](https://github.com/openai/codex/pull/64221) |
| #64219 | Focus the sidebar chooser when clicking empty space | 点击侧边栏文件列表下方空白区域时，将键盘焦点移至侧边栏选择器，便于恢复键盘导航 | [查看](https://github.com/openai/codex/pull/64219) |
| #64214 | Fix Unicode highlighting in fuzzy file search | 修复模糊文件搜索中 Unicode 高亮偏移错误；包含连字 emoji 或组合标记的路径可正确高亮 | [查看](https://github.com/openai/codex/pull/64214) |
| #64211 | Open and highlight file line ranges in the TUI | TUI 识别 `src/search.ts:42-44` 及 `src/search.ts#L42-L44` 等文件范围引用，侧边栏可直接跳转至指定行区间 | [查看](https://github.com/openai/codex/pull/64211) |
| #64207 | Save and cycle through side chats in TUI scrollback mode | TUI 回滚模式支持保存侧边对话并在恢复父对话后重新打开，改善多会话上下文切换体验 | [查看](https://github.com/openai/codex/pull/64207) |
| #64204 | Batch terminal writes when inserting TUI history | 使用有界缓冲区合并历史记录回放时的终端写入，减少长历史回放中的小频次刷新 | [查看](https://github.com/openai/codex/pull/64204) |
| #64187 | Configure Guardian V3 shadow reviews from the root thread | 将 `features.guardianv3_shadow` 替换为 `features.guardianv3.shadow_enabled`，支持从根线程配置 Guardian V3 影子评审路由与检索指令 | [查看](https://github.com/openai/codex/pull/64187) |
| #64166 | Cap evidence stored on Guardian v3 shadow boards | 为每个根影子评审板默认设置 32 MiB 序列化证据上限，防止影子路由在多个渠道重复存储证据导致膨胀 | [查看](https://github.com/openai/codex/pull/64166) |

---

## 5. 功能需求趋势

从 Issues 与 PR 中提炼出的社区关注方向：

1. **CLI 会话生命周期与配额管理**  
   #21073（自动恢复会话）与 #64123（每周限额重置异常）反映开发者希望 CLI 能更智能地处理使用量限制，减少任务中断。

2. **跨平台桌面端稳定性（Windows / macOS / iOS）**  
   Windows 端 Computer Use 权限残留（#57101）、UI 回归（#62943、#62669）；macOS 端本地/云端选择器缺失（#63093）；iOS 端任务列表空白（#60778）。桌面端与移动端的一致性与权限生命周期是当前痛点。

3. **模型版本行为回归（GPT-6.2 系列）**  
   #63466 与 #62195 显示社区对 GPT

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-27)

## 今日速览

Gemini CLI 社区今日无新版本发布，但 Issue 和 PR 活跃度依然较高。核心关注点集中在 **子代理（Subagent）稳定性**、**浏览器代理兼容性** 以及 **ACP（Agent Communication Protocol）模式下的鲁棒性修复** 上。多个 P1 级别 Bug 仍未解决，开发者正通过一系列补丁改进工具调用超时、Web Search 卡死、二进制载荷处理等底层问题。

---

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 评论 | 关注理由 |
|---|------|-------------|------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS is reported as GOAL success | P1 / Bug | 14 | 子代理在达到最大轮次限制后仍错误上报 `status: "success"`，导致中断被掩盖，严重影响任务可靠性，社区讨论最为集中。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 / Bug | 8 (👍8) | 通用代理在处理简单操作（如创建文件夹）时无限挂起，用户反馈需等待一小时才能手动取消，是影响日常使用的高优先级缺陷。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 / Enhancement | 9 | 提出利用 Gemini 3 模型的 Bash 原生能力，通过零依赖 OS 沙箱增强代理操作系统的能力，属于重要架构方向增强。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 7 | 探索 AST 感知的文件读取、搜索与代码映射，旨在减少上下文膨胀并提升代码导航精度，是提升代理效率的关键方向。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 / Bug | 7 | 模型不会主动调用自定义技能和子代理，仅在显式指令下才使用，限制了代理的自主编排能力。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides | P2 / Bug | 5 | 浏览器代理完全忽略全局/项目级 `settings.json` 中的配置覆盖（如 `maxTurns`），导致配置失效。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 / Bug | 4 (👍1) | 浏览器子代理在 Wayland 显示服务器下失败，影响 Linux 桌面用户的浏览器自动化场景。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done output hook causes crash | P1 / Bug | 3 | 输出钩子在打印用户摘要时导致 CLI 崩溃，直接影响交互体验稳定性。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 400 error with > 128 tools | P2 / Bug | 3 | 当可用工具超过一定数量时，Gemini CLI 遇到 400 错误，反映工具调度与上下文管理存在扩展性瓶颈。 |
| [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) | Symlink agent file not recognized | P2 / Bug | 4 | `~/.gemini/agents/` 下的符号链接代理文件未被识别，影响用户通过链接方式管理子代理的场景。 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| [#30487](https://github.com/google-gemini/gemini-cli/pull/30487) | fix(acp): handle rejection when sending the approval-mode update | OPEN | 修复 ACP 模式下 `handleApprovalModeChanged` 火并忘式调用 `sendUpdate()` 导致未处理 Promise 拒绝，进而终止进程的问题。 |
| [#30419](https://github.com/google-gemini/gemini-cli/pull/30419) | fix(core): mark folders whose contents were never scanned as truncated | OPEN | 修复 `getFolderStructure()` 在文件夹内容未完全扫描时未正确标记截断，确保目录结构展示准确。 |
| [#30212](https://github.com/google-gemini/gemini-cli/pull/30212) | feat(core): add configurable per-tool-call timeout | OPEN | 新增 `tools.callTimeout` 配置（秒，默认 0 禁用），单次工具调用超时后触发 `AbortSignal` 并返回可恢复的 `TOOL_CALL_TIMEOUT` 错误，避免模型长时间卡死。 |
| [#30375](https://github.com/google-gemini/gemini-cli/pull/30375) | docs: fix broken internal links | OPEN | 修复文档中损坏的内部链接（缺失 `.md` 后缀、绝对路径、重命名的锚点等），改善开发者文档体验。 |
| [#30109](https://github.com/google-gemini/gemini-cli/pull/30109) | fix(core): cap grep_search output size | OPEN | 限制 `grep_search` 输出大小，并提示模型缩小过于宽泛的搜索范围，防止超长日志或压缩文件撑爆上下文。 |
| [#30473](https://github.com/google-gemini/gemini-cli/pull/30473) | fix(core): exclude evicted binary payloads from exempt retrieval byte budget | OPEN | 修复旧检索轮次字节预算计算问题，排除已驱逐的二进制载荷，避免单个图片 `read_file` 导致预算计算异常。 |
| [#30459](https://github.com/google-gemini/gemini-cli/pull/30459) | fix(extensions): allow unsafe config paths for extension git operations | OPEN | 修复 0.70.0 后基于 Git 的扩展安装/更新因 `GIT_CONFIG_SYSTEM` 限制失败的问题，启用 `simple-git` 的 `unsafe` 配置类别。 |
| [#30415](https://github.com/google-gemini/gemini-cli/pull/30415) | fix(core): add a time limit to web search and stop retries on abort | OPEN | 为 `google_web_search` 工具增加请求时限，并在中止时停止重试，解决 Web Search 卡死导致代理长时间无响应的问题（#29594）。 |
| [#30400](https://github.com/google-gemini/gemini-cli/pull/30400) | fix(cli): skip piped-stdin read before the sandbox hop in ACP mode | OPEN | 修复 ACP 模式下启动时 `gemini --acp` 不响应 `initialize` 请求的问题，通过跳过沙箱跳转前的 stdin 读取解决 ACP 客户端挂起。 |
| [#30470](https://github.com/google-gemini/gemini-cli/pull/30470) | feat(core): add gemini-2.5-flash-image model config | OPEN | 新增 `gemini-2.5-flash-image`（Nano Banana 图像生成模型）内置配置，支持通过 `--model` 和 `/model` 命令选择，响应模态包含 `TEXT` 和 `IMAGE`。 |

---

## 功能需求趋势

从近期 Issues 和 PR 可以看出，社区对 Gemini CLI 的功能需求呈现以下趋势：

1. **子代理（Subagent）自主性与可观测性**  
   多个 Issue 指出模型不主动使用技能/子代理（#21968）、子代理轨迹不可见（#22598）、子代理崩溃或挂起后状态上报错误（#22323、#21409）。社区亟需更可靠的子代理生命周期管理与轨迹共享能力。

2. **工具调用与上下文管理优化**  
   `grep_search` 输出过大（#30109）、工具数量过多导致 400 错误（#24246）、模型在随机位置生成临时脚本（#23571）等问题反映出对工具调度、输出截断和上下文预算控制的强烈需求。

3. **浏览器代理与跨平台兼容性**  
   浏览器子代理在 Wayland 下失效（#21983）、忽略 `settings.json` 配置（#22267）、缺乏会话接管与锁恢复机制（#22232），显示社区希望浏览器自动化能力更稳定、更可配置。

4. **ACP（Agent Communication Protocol）生态完善**  
   大量 PR 集中在 ACP 模式的修复（会话关闭、Token 追踪、Hook 拒绝上报、stdin 读取等），说明 ACP 作为代理间通信标准正在快速迭代，社区对头less/嵌入式场景的支持期待较高。

5. **新模型与多模态支持**  
   新增 `gemini-2.5-flash-image` 模型配置（#30470）体现社区对多模态模型（尤其是图像生成）的快速适配需求。

---

## 开发者关注点（痛点与高频需求）

- **稳定性痛点**：P1 级 Bug 较多，包括通用代理挂起（#21409）、输出钩子导致崩溃（#22186）、子代理状态上报错误（#22323），直接影响 CLI 的可用性。
- **配置生效问题**：`settings.json` 覆盖在浏览器代理中不生效（#22267）、符号链接代理未被识别（#20079），开发者希望配置系统更统一、更可预测。
- **长时间操作卡死**：Web Search 无超时导致代理挂起（#30415）、单次工具调用缺乏超时控制（#30212），亟需更细粒度的超时与中止机制。
- **破坏性操作防护**：模型可能执行 `git reset --force` 等危险命令（#22672），

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

过去24小时无活动。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-27)

## 今日速览

OpenCode 昨日发布 v2.4.2 版本，引入 GPT-6.2 系统提示词并修复 OpenCode Go 引导流程。社区活跃度较高，12 个 Issue 和 50 个 PR 在过去 24 小时内更新，核心讨论集中在子代理执行、上下文压缩稳定性、桌面端插件权限以及 Code Mode 子代理通知机制等方面。

## 版本发布

**v2.4.2** ([Release 链接](https://github.com/anomalyco/opencode/releases/tag/v2.4.2))

- **GPT-6.2 System Prompt**：GPT-6.2 Sol 和 Astra 以及 `gpt-latest` 别名现使用专为 GPT-6.2 编写的系统提示词。([#66297](https://github.com/anomalyco/opencode/pull/66297))
- **OpenCode Go Onboarding Fix**：连接 OpenCode 后，模型选择器现会正确列出 OpenCode Go。

## 社区热点 Issues

以下选取过去 24 小时内更新最活跃、社区关注度最高的 10 个 Issue：

| # | 标题 | 状态 | 核心内容 | 关注理由 | 链接 |
|---|------|------|----------|----------|------|
| #64073 | [FEATURE]: Restore Foreground Subagent Execution | OPEN | 请求恢复前台子代理执行机制 | 评论数最多（38 条）、点赞最高（13 👍），社区对子代理交互模式的改进诉求强烈 | [查看](https://github.com/anomalyco/opencode/issues/64073) |
| #56862 | Subagents kept failing with context compaction | OPEN | 子代理在读取大文件（106Kb–427Kb）时因上下文压缩反复失败 | 涉及核心稳定性，已有 8 条评论跟进，影响大文件处理场景 | [查看](https://github.com/anomalyco/opencode/issues/56862) |
| #47721 | core: request accumulates 52 images, exceeds provider max of 50 | OPEN | 单会话迭代图片资源后请求包含 52 张图片，超出提供商 50 张上限 | 多模态工作流中的硬性限制问题，已有 4 条评论 | [查看](https://github.com/anomalyco/opencode/issues/47721) |
| #64610 | The model list id seems to have been deduplicated based on the prefix | CLOSED | 模型列表按前缀去重导致 DeepSeek-V4.1-Flash-1017 等模型不可见 | 模型发现与切换体验问题，已关闭但值得关注后续修复 | [查看](https://github.com/anomalyco/opencode/issues/64610) |
| #66689 | Desktop Plugins tab: switches should actually enable/disable plugins (server side) | OPEN | 桌面端插件开关仅隐藏 UI，未在服务端真正禁用插件 | 新创建（2026-11-26），涉及桌面端权限控制与安全边界 | [查看](https://github.com/anomalyco/opencode/issues/66689) |
| #52412 | service set/unset silently erases the stored config when service.json cannot be decoded | OPEN | service.json 解码失败时配置被静默擦除 | 数据安全风险，可能导致背景服务器配置丢失 | [查看](https://github.com/anomalyco/opencode/issues/52412) |
| #65551 | browser.press drops punctuation: single characters map to colliding virtual key codes | OPEN | 浏览器按键单字符映射冲突，如 `.` 被识别为 Delete 键 | 桌面端自动化交互的精度问题，影响 Linux 平台 | [查看](https://github.com/anomalyco/opencode/issues/65551) |
| #66697 | question: widget not rendered leaves session running | OPEN | 移动端 `question` 工具小部件未渲染，会话卡在运行状态且用户无可见提示 | 新创建（2026-11-26），移动端体验缺陷，会话无法正常结束 | [查看](https://github.com/anomalyco/opencode/issues/66697) |
| #66693 | agent: repeated identical tool calls run indefinitely with no doom_loop detection | CLOSED | 代理重复执行相同工具调用且无 doom_loop 检测，需人工干预停止 | 核心代理安全机制缺失，已关联 #59339 | [查看](https://github.com/anomalyco/opencode/issues/66693) |
| #66692 | compaction: session drain hard-fails when summary hits the model's output token limit | CLOSED | 压缩摘要达到模型输出 token 上限时，会话排水硬失败 | 上下文压缩路径的容错性问题，与常规步骤处理不一致 | [查看](https://github.com/anomalyco/opencode/issues/66692) |

## 重要 PR 进展

选取 10 个具有代表性的合并请求，涵盖 Bug 修复、性能优化与新功能：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #66696 | fix(core): keep Code Mode agent() children from notifying the parent or leaving jobs running | OPEN | 修复 Code Mode 中 `agent()` 子代理向父会话发送通知并留下后台作业的问题，关联 #66691 | [查看](https://github.com/anomalyco/opencode/pull/66696) |
| #66670 | fix(data): guard alias and catalog lookups against Object.prototype keys | CLOSED | 防止 `/data/alibaba/__proto__` 等路径导致 HTTP 500，修复原型链污染风险 | [查看](https://github.com/anomalyco/opencode/pull/66670) |
| #66694 | feat(server): sync and write several experimental spaces in one request | CLOSED | 支持单次请求同步或写入多个实验空间，新增 `POST /api/experimental/space/sync` | [查看](https://github.com/anomalyco/opencode/pull/66694) |
| #66690 | refactor(core): unify location and private SDK instances in one map | OPEN | 将默认位置和私有 SDK 实例统一到同一生命周期 Map，简化实例管理 | [查看](https://github.com/anomalyco/opencode/pull/66690) |
| #66684 | fix(core): re-provision workspace when destroy and recreate race connect | CLOSED | 修复工作区销毁与重建竞态连接时的重新配置崩溃问题 | [查看](https://github.com/anomalyco/opencode/pull/66684) |
| #60604 | fix(ai): keep an unencodable tool result from killing the session | CLOSED | 修复 `toolResultText` 对不可编码 JSON 工具结果缺乏保护，导致会话中断 | [查看](https://github.com/anomalyco/opencode/pull/60604) |
| #66695 | fix(core): watch the branch ref that HEAD points at | OPEN | 修复“分支变更”刷新过时问题，监听 HEAD 指向的分支引用 | [查看](https://github.com/anomalyco/opencode/pull/66695) |
| #66687 | fix(cli): refuse to overwrite an invalid service.json | OPEN | service.json 语法错误时拒绝覆盖，给出明确错误而非擦除背景服务器配置 | [查看](https://github.com/anomalyco/opencode/pull/66687) |
| #66686 | fix(ai): enable prompt caching on Azure Foundry Claude models | OPEN | 为 Azure AI Foundry 上的 Claude 模型启用提示词缓存，避免每步全额付费 | [查看](https://github.com/anomalyco/opencode/pull/66686) |
| #66673 | fix(core): poll Console config every 5 minutes with jitter | CLOSED | Console `/v2/config` 轮询改为每 5 分钟一次并加入抖动，优化配置刷新策略 | [查看](https://github.com/anomalyco/opencode/pull/66673) |

## 功能需求趋势

从近期 Issues 中可提炼出社区关注的四个主要功能方向：

1. **子代理与多代理编排**：#64073（恢复前台子代理执行）和 #56862（子代理上下文压缩失败）表明开发者希望获得更稳定、可控的子代理执行模型，尤其是在长上下文和大文件场景下。
2. **桌面端与移动端体验**：#66689（插件开关服务端生效）、#66697（移动端 question 小部件未渲染）和 #65551（浏览器按键精度）集中反映客户端交互与权限控制的细节缺陷。
3. **上下文压缩与会话稳定性**：#66692（压缩摘要 token 限制导致硬失败）和 #56862 指出上下文压缩路径的容错性仍需加强，避免会话意外中断。
4. **Code Mode 与代理安全**：#66691/#66696（Code Mode 子代理通知）和 #66693（无 doom_loop 检测的无限工具调用）显示社区对代理循环检测、后台作业清理及父子代理边界的关注度提升。

## 开发者关注点

- **配置数据安全**：#52412 和 #66687 均涉及 `service.json` 解码失败时的配置擦除风险，开发者期望在配置损坏时获得明确报错而非静默数据丢失。
- **代理无限循环检测**：#66693 指出 v2 版本中缺乏 `doom_loop` 检测与断路器，重复工具调用可无限执行，需人工干预，属于高优先级稳定性问题。
- **多模态请求限制**：#47721 反映图片资源累积超出提供商上限（50 张），开发者需要更好的多模态请求分片或自动截断机制。
- **跨平台一致性**：#65551（Linux 浏览器按键）和 #66697（Android 移动端小部件）提示桌面端与移动端在输入交互和 UI 渲染上仍存在平台差异。
- **模型提供商适配**：#64610（模型列表去重）和 #66686（Azure Foundry Claude 缓存）显示对新模型及特

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期**: 2026-11-27  
**仓库**: NousResearch/hermes-agent  
**数据周期**: 2026-11-26 至 2026-11-27

---

## 1. 今日速览

过去24小时 Hermes 社区未发布新版本，但活跃度较高：共更新 9 个 Issue 和 50 个 PR。核心关注点集中在 **Windows 平台稳定性**、**网关（Gateway）事件循环卡死**、**会话压缩与搜索修复** 以及 **插件目录维护** 上。值得注意的是多个 P1/P2 级别缺陷在当天被提交并引发社区讨论。

---

## 2. 版本发布

过去24小时无新版本发布。

---

## 3. 社区热点 Issues（共 9 条，精选 10 条）

以下按社区影响力和紧急程度排序：

| # | 标题 | 类型/优先级 | 核心内容 | 为何值得关注 | 链接 |
|---|------|------------|---------|------------|------|
| #160387 | Gateway 事件循环卡死冻结整个进程（看门狗也失效） | bug / P2 / Windows | Windows 上 Gateway 的 asyncio 事件循环因同步阻塞工作反复卡死 10–30 秒，严重时整个进程冻结，仅靠外部强制替换可恢复。 | P1 级别可用性缺陷，直接导致 Gateway 不可用，且看门狗机制未能生效，需高优先级修复。 | https://github.com/NousResearch/hermes-agent/issues/160387 |
| #160575 | `for` 循环中仅运行通过的命令仍要求手动审批 | bug / P2 / terminal | 只读脚本单独运行可通过终端审批，但放入 `for` 循环后触发人工审批提示，影响无人值守场景。 | 影响终端工具自动化体验，属于安全审批逻辑误报，社区关注度高。 | https://github.com/NousResearch/hermes-agent/issues/160575 |
| #136657 | Gateway 重启时丢弃插件平台路由行 | bug / P2 / gateway/plugins | 网关在插件适配器注册前就加载路由索引，导致运行时注册的插件平台路由行解析失败并被丢弃。 | 涉及插件生态核心机制，影响插件平台持久性，已有 5 条社区评论跟进。 | https://github.com/NousResearch/hermes-agent/issues/136657 |
| #157671 | Windows 桌面启动失败：`whoami.exe /USER` | bug / P2 / Windows | 因 `PATH` 中 GNU coreutils 的 `whoami.exe` 遮蔽系统自带版本，导致 Hermes Desktop 启动失败并报 `service_identity_unverified`。 | Windows 安装/启动类问题，影响 MSIX 和桌面端用户，已有 5 条评论。 | https://github.com/NousResearch/hermes-agent/issues/157671 |
| #151274 | Windows/MSIX：`hermes pm repair` 无法安装插件 Python 依赖 | bug / P2 / Windows/install | MSIX 只读负载导致无法拷贝三个 `config-resolution` fixture，插件 `python_dependencies` 静默未安装。 | 影响 Windows 应用商店分发渠道的插件功能完整性。 | https://github.com/NousResearch/hermes-agent/issues/151274 |
| #160597 | disk-cleanup 插件误删 `workbenches/` 下的 `test_*/tmp_*` 文件 | bug / P2 / plugins | 清理插件将用户工作台目录下的测试/临时文件误判为可丢弃文件，会话结束时删除，但 `workbenches/` 未列入 `_NEVER_TRACK_TOP_LEVEL`。 | 可能导致用户项目数据丢失，属于数据安全类缺陷。 | https://github.com/NousResearch/hermes-agent/issues/160597 |
| #160590 | Cron 调度器缺少密钥作用域，触发 `UnscopedSecretError` | security / P3 / cron/auth | 复用网关的 Cron 调度器在投递路径读取 profile 密钥时未安装密钥作用域，每 60 秒打印一次堆栈跟踪。 | 涉及认证与密钥访问控制，虽为 P3 但重复报错会干扰日志与审计。 | https://github.com/NousResearch/hermes-agent/issues/160590 |
| #85700 | 为 `delegate_task` 新增 `enabled_toolsets` 参数 | feature / P3 / agent/tools | 子代理默认继承父代理完整工具集，建议支持按子代理限制可用工具集，以节省 token 并提升专注度。 | 社区长期关注的多代理工具隔离需求，已有 3 条评论，标记 `needs-decision`。 | https://github.com/NousResearch/hermes-agent/issues/85700 |
| #160603 | `hermes update` 期间支持可选插件更新 | feature / P3 / cli/config | 当前 `hermes update` 仅失效插件目录缓存并打印通知，建议增加 `--plugins` 或配置项实现可选插件自动更新。 | 插件生命周期管理需求，反映用户希望统一更新主程序与插件。 | https://github.com/NousResearch/hermes-agent/issues/160603 |
| #160600 | 插件目录：将 `hermes-finance` 重新固定到 v0.7.0 | feature / P3 / plugins | 将 `hermes-finance` 从 v0.4.0 升至 v0.7.0，新增 3 个只读财务报表工具，共提供 23 个工具。 | 插件生态持续演进，直接影响财务类插件可用能力。 | https://github.com/NousResearch/hermes-agent/pull/160600 |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态/优先级 | 功能或修复内容 | 作者 | 链接 |
|---|------|------------|-------------|------|------|
| #160576 | session_search 修复：定位压缩指向的内容，避免空返回 | OPEN / P1 | 修复会话压缩后搜索忽略查询、只返回首尾消息的问题；修复普通搜索因自身问题匹配而返回空结果的情况；保持结果集小巧。修复 #157734、#156687、#147548。 | @teknium1 | https://github.com/NousResearch/hermes-agent/pull/160576 |
| #160584 | 修复 lifecycle-guard：heredoc 正文属于其附加的命令 | OPEN / P3 | 终端安全检查不再将包裹命令（如 `timeout 600 python3 - <<'EOF'`）或管道输出中的数据文件误判为不可扫描的脚本，允许只读数据文件通过。 | @teknium1 | https://github.com/NousResearch/hermes-agent/pull/160584 |
| #160592 | 聊天 5 分钟缓存在消息间保持温暖，随后压缩并移至 1 小时缓存 | OPEN / P3 | 在用户输入间保持 Claude 5 分钟缓存存活，通过少量廉价刷新（约 17 分钟）避免缓存失效导致重新支付整个对话成本。涉及计费与压缩。 | @teknium1 | https://github.com/NousResearch/hermes-agent/pull/160592 |
| #158418 | 插件可登录 Linear 和 QuickBooks：OAuth 条目固定重定向 URI 并逗号连接作用域 | OPEN / P2 / ci-reviewed | 修复插件通过 OAuth 登录 Linear/QuickBooks 时，因随机本地端口和空格分隔作用域导致登录无法完成的问题。 | @teknium1 | https://github.com/NousResearch/hermes-agent/pull/158418 |
| #160449 | 修复 gateway：`/discard` 在聊天路由条目缺失时找到丢失的轮次 | OPEN / P2 | 修复 `/discard` 仅通过 `SessionStore.peek_session_id` 查找对话的问题，解决重启后路由条目不在内存时无法找回丢失轮次的问题。 | @alextidalrise | https://github.com/NousResearch/hermes-agent/pull/160449 |
| #120754 | 修复 desktop：将就绪探测范围限定为拥有会话的 profile | OPEN / P2 | 将 Desktop 就绪探测（`setup.status`、`setup.runtime_check`）限定为客户端即将打开的会话所属 profile，避免多路由后端中未签名 profile 被误报为已完成 OAuth。 | @pat-blumemethod | https://github.com/NousResearch/hermes-agent/pull/120754 |
| #137340 | 修复 cli：量化内存审批在待处理列表中销毁的内容 | CLOSED / P2 | 修复 `/memory pending` 显示 staged 内存替换/移除时的完整条目，解决源 fork 删除恢复后的线程重开问题。 | @PRELVAS94 | https://github.com/NousResearch/hermes-agent/pull/137340 |
| #137349 | 修复 agent：在压缩之间传递 lean 压缩的摘要章节 | CLOSED / P2 | 确保 lean 压缩的摘要章节在多次压缩之间正确传递，避免摘要信息丢失。 | @PRELVAS94 | https://github.com/NousResearch/hermes-agent/pull/137349 |
| #160601 | catalog：快速路径赞助商信用 + pin 更新 | OPEN / P3 / docs | 更新 fastpath 条目 pin 并添加赞助商信用（Backed by Metadigi）。 | @siavashmirtaheri | https://github.com/NousResearch/hermes-agent/pull/160601 |
| #160602 | chore(plugin-catalog)：将 3ds-platform 升至 0.3.3 | OPEN / P3 | 将 Hermes 3DS 插件从 0.3.2 升至 0.3.3，现仅通过存储接口访问会话，不再依赖 `hermes_state`。 | @rndaom | https://github.com/NousResearch/hermes-agent/pull/160602 |

> 注：仓库中还有 3 条由 @benbarclay 提交的幽默/测试性 PR（#158027、#158026、#158025，均已关闭），内容涉及“逆熵”、“因果倒置 Cron”、“黑洞即服务”，不计入实质性开发进展。

---

## 5. 功能需求趋势

从近

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-27)

---

## 1. 今日速览

OpenClaw 今日发布了 gateway-only 的 `extended-stable` 版本 **v2026.10.34**，侧重安全修复、可靠性与性能提升及新模型支持。社区活跃度保持高位，过去 24 小时内有 8 个 Issue 更新和 50 个 PR 活跃，其中多个 P1/P2 级别问题涉及内存泄漏、消息丢失和凭据安全，开发者正集中修复跨平台（iMessage、Signal、Mattermost）的消息传递缺陷以及 Codex 插件兼容性问题。

---

## 2. 版本发布

**v2026.10.34 — openclaw 2026.10.34**  
这是一个 gateway-only 的 `extended-stable` 发布（当前等价于 LTS 版本），包含 2026 年 10 月底的 OpenClaw 代码，并叠加了关键安全更新、可靠性与性能修复，以及新模型支持。适合生产环境长期运行的用户升级。

[查看 Release 详情](https://github.com/openclaw/openclaw/releases/tag/v2026.10.34)

---

## 3. 社区热点 Issues（共 8 条，全部列出）

| # | 标题 | 优先级/标签 | 核心摘要 | 链接 |
|---|------|------------|---------|------|
| #198830 | LM Studio embedding 预加载请求模型最大上下文（32768），在 16 GB 主机上无 catalog 条目时 OOM | P2 · diamond lobster · impact:other | macOS Apple Silicon + 16 GB RAM 环境下，Qwen3-Embedding-0.6B Q8_0 模型因请求最大上下文长度导致内存溢出，影响本地 Embedding 场景。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/198830) |
| #174253 | Standalone Doctor 在重建 Docker 容器时捕获填满磁盘；保留期（固定 30 天）不可配置 | P1 · diamond lobster · impact:other | Docker 滚动更新每次重建 Gateway 容器都会产生完整 doctor 捕获，缺乏按数量或年龄清理机制，长期运行会耗尽磁盘。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/174253) |
| #194157 | Codex harness 每新建线程都从 plugin-captures 重新导入插件模块图，每会话保留约 50 MB 主堆内存 | P1 · impact:crash-loop · silver shellfish | 原生 Codex harness 在每个新线程/隔离 cron 运行中重复加载模块图且不释放，导致内存持续增长，可能引发崩溃循环。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/194157) |
| #203329 | 发送到 iMessage 后端会话的系统事件从未送达；事件自身 ID 成为隐式回复引用 | P1 · impact:message-loss · diamond lobster | `openclaw system event` 返回 ok，Agent 回复已生成，但 iMessage 端因消息引用不属于选定会话而投递失败，属消息丢失类缺陷。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/203329) |
| #204999 | Signal：块引用续行、嵌套引用行及后续块丢失 `>` 标记 | P2 · impact:ux-friction · diamond lobster | 多行块引用仅首行保留 `>`，后续段落和嵌套引用变为纯文本，影响跨平台消息格式还原。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/204999) |
| #202818 | refactor(android)：将共享应用策略与功能所有者分离 | P3 · off-meta tidepool | Android 端通用 JSON 访问器与节点调用助手混杂，建议整合重复实现，保持应用行为不变，属代码重构类需求。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/202818) |
| #206226 | Mattermost 按钮值包含非字母数字字符（中文、空格、Agent 回调）点击后打开“页面未找到” | P1 · impact:message-loss · diamond lobster | 中文、空格或标点作为按钮值时，点击不会到达 OpenClaw，直接影响中文用户及复杂回调场景的可用性。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/206226) |
| #206225 | Paste-token 仅支持以明文保存凭据，导致密钥审计发现无法修复 | P2 · impact:security · diamond lobster · needs-security-review | `paste-token`/`paste-api-key` 始终以明文写入 auth store，`secrets audit` 会标记 `PLAINTEXT_FOUND`，且 `secrets apply` 无法迁移至 SecretRef，存在安全合规风险。 | [查看 Issue](https://github.com/openclaw/openclaw/issues/206225) |

**社区反应概览**：  
近期新开 Issue（#206225、#206226）均于 2026-11-26 创建并当日更新，显示社区对安全与跨平台消息投递问题反应迅速。多个 P1 级 Issue 长期未获点赞（👍: 0），但均带有 `clawsweeper` 维护者审查标签，说明核心团队已纳入跟踪。

---

## 4. 重要 PR 进展（精选 10 个）

| # | 标题 | 类型/优先级 | 主要内容 | 链接 |
|---|------|------------|---------|------|
| #206235 | fix(plugin-sdk)：允许已发布的 Codex 插件在新主机上启动会话 | P1 · impact:auth-provider | 修复 `@openclaw/codex@2026.11.10` 插件因主机不再导出 `AgentHarnessRuntimeUpdateRequiredError` 而导致的模块加载失败，恢复 Codex 插件启动能力。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206235) |
| #206241 | feat(codex)：将选定主机工具委派给原生子进程 | P1 · impact:security · security-review-required | 解决原生 Codex 子进程可继承工具声明但不继承处理器的问题（如 `memory_get`），避免“未注册处理器”错误，涉及安全审查。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206241) |
| #206230 | fix：按委派内存限制调整 Linux Gateway 大小 | P2 · impact:auth-provider | 修复 Linux 下 Gateway 因 cgroup 可见性不全导致的内存尺寸计算错误，防止误用主机 RAM 或指向错误限制。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206230) |
| #206243 | fix：保留 Signal 引用标记在每行引用和消息中 | P2 · impact:message-loss · channel:signal | 修复 Markdown 解析器仅在引用开头写入 `> ` 前缀，导致续行、嵌套段落丢失引用标记，与 Issue #204999 对应。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206243) |
| #206150 | fix：在网关重启竞态中保留首条回复 | P2 · impact:session-state · platinum hermit | 修复网关恢复期间后续消息可能到达模型但因溢出压缩重试而丢失回复的问题，提升会话状态一致性。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206150) |
| #206231 | fix(codex)：当仅 OpenClaw 版本变化时保留远程 Worker | P2 · impact:session-state · extensions:codex | 修复 OpenClaw 更新后 `resume_agent` 能找到远程 Worker 但 `send_input` 拒绝任务的问题，避免版本变更导致的会话中断。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206231) |
| #206221 | fix(sqlite)：释放退役池化读取器的启动所有者 | P2 · rating: gold shrimp | 修复池化 SQLite 读取器退出时其槽位仍持有退役启动对象，导致子环境和 broker/runtime 代际对象被长期占用（最多 4 个槽位）。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206221) |
| #206237 | improve：模型选择期间跳过未使用的上下文引擎查找 | P2 · rating: unranked krab | 优化本地模型运行和 Gateway 启动时的插件上下文引擎声明遍历，减少默认上下文引擎场景下的无谓开销。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206237) |
| #206240 | improve(cli)：模型凭据选择时跳过频道和 Web 发现 | P3 · cli, commands | 避免短生命周期 CLI 进程在仅使用模型提供商时仍加载频道和 Web 能力代码，提升 CLI 启动性能。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206240) |
| #206201 | fix(ci)：为 Crabbox 作业提供所需的 Git 能力 | P3 · ready for maintainer look | 修复 Crabbox 默认 hydration 保留 Ubuntu Git 2.43 导致的 PR 工具测试失败，需升级至支持 `--no-lazy-fetch` 的 Git 2.45+。 | [查看 PR](https://github.com/openclaw/openclaw/pull/206201) |

---

## 5. 功能需求趋势

从近 24 小时的 Issue 和 PR 中可观察到以下社区关注方向：

1. **跨平台消息投递与格式还原**  
   iMessage（#203329）、Signal（#204999、#206243）、Mattermost（#206226）相关问题集中爆发，社区高度关注多渠道消息的可靠投递与 Markdown/引用格式保真。

2. **凭据安全与密钥管理**  
   `#206225` 暴露出 `paste-token` 仅支持明文存储，与 `secrets audit` 合规要求冲突，表明社区对敏感信息加密存储和 SecretRef 迁移

:::
