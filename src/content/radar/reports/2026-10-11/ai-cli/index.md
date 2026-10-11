---
title: "AI CLI 工具社区动态日报"
published: 2026-10-11
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-11

> 生成时间: 2026-10-11 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具社区动态横向对比分析报告  
**统计窗口：2026-10-10 至 2026-10-11**  
**口径说明：以下“Issue/PR 数”为各日报所列或明确提及的更新条目数，不等同于 GitHub 全量 API 统计；用于判断相对热度与方向。**

---

## 1. 生态全景

当前 AI CLI 工具正从“单点编码助手”转向 **多端会话 + Agent 编排 + MCP/插件生态 + 安全沙箱** 的综合平台。版本节奏明显分化：Codex 与 Gemini CLI 处于 alpha/nightly 快迭代，Reasonix、OpenClaw 发布正式版，Claude Code、OpenCode、Hermes 当日无 Release，但 Issue/PR 活跃。社区痛点已从“功能有没有”升级为“结果可不可信、权限可不可控、上下文连不连得上、失败是否显式暴露”。权限分类器、沙箱、静默失败、跨端会话一致性，正在成为大规模自动化落地的前置瓶颈。

---

## 2. 各工具活跃度对比

| 工具 | 今日 Issue 侧 | 今日 PR 侧 | Release | 备注 |
|---|---:|---:|---|---|
| **Claude Code** | 列出 30 条热点；关闭 8 条积压 Issue | 仅 2 条更新 | 无 | #13843 获 122 👍，跨端上下文诉求最强 |
| **OpenAI Codex** | 列 10 条热点 | 10 条更新/关闭 | `rust-v0.163.0-alpha.5` | Windows/CUA/沙箱问题高度集中 |
| **Gemini CLI** | 窗口内 49 条，精选 10 条 | 精选 10 条 | `v0.65.0-nightly.20261010...` | 子代理可靠性为 P1 焦点 |
| **DeepSeek Reasonix** | 6 条更新，全部纳入 | 10 条重点 + 另 4 条值得留意 | `v2.34.0 / studio-v2.34.0` | RPM 需求 Issue 当日到 PR，闭环快 |
| **OpenCode** | 列 10 条热点 | 列 10 条 | 无 | v2 兼容、工具可靠性、MCP 配置问题多 |
| **Deepseek Harness** | 0 | 0 | 无 | 过去 24 小时无活动 |
| **Hermes** | 9 条更新，全部纳入 | 过去 24h 更新 50 条，精选 10 条 | 无 | One gateway、插件目录、安装/压缩问题活跃 |
| **OpenClaw** | 列 10 条热点 | 列 10 条 | `v2026.10.1` | #97616 僵尸进程 P1，18 评论 |

**活跃度速判：**  
- **Issue 讨论最热**：Claude Code、Gemini CLI、OpenAI Codex。  
- **PR 流最密**：Hermes、OpenAI Codex、Gemini CLI、DeepSeek Reasonix。  
- **发布节奏最快**：Codex alpha、Gemini nightly、Reasonix/OpenClaw 正式版。  
- **低活跃/静默**：Deepseek Harness。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **上下文与会话连续性** | Claude Code、Codex、Gemini CLI、OpenCode、Hermes、OpenClaw、Reasonix | Claude.ai → Claude Code 上下文延续；compaction/`/clear` 后记忆；MCP session ID；跨设备同步；Hermes 压缩阈值与压缩标记污染；OpenClaw 异步 exec 错投 session |
| **权限、安全与沙箱** | Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw、Hermes、Reasonix | Auto mode 误判；远程无审批入口；Windows 沙箱 sharing violation；CUA 启动失败；破坏性命令抑制；exec 子进程缺少 agent 身份；MCP 工具定义固定 |
| **静默失败与可观测性** | Claude Code、Gemini CLI、OpenCode、Hermes、Reasonix、OpenClaw | 安全审核失败却报“无漏洞”；子代理 MAX_TURNS 报成功；压缩器生成不存在的 payload；配置被静默丢弃；wire-parity 漏检；日志风暴 |
| **MCP / 插件 / Skills 契约** | Claude Code、Codex、Gemini CLI、OpenCode、Hermes、Reasonix、OpenClaw | MCP 会话标识；工具数 >128 报 400；Bedrock 工具名 >64 字符整请求失败；User Skills 子资源读取失败；插件目录版本与分发不一致 |
| **多会话 / 远程 / Agent 编排** | Claude Code、Codex、Gemini CLI、OpenCode、Hermes、OpenClaw | 多会话批量回复；远程代批准；Dots/CUA；子代理权限挂起；One gateway 统一本地会话；后台任务状态恢复 |
| **性能、token 与成本** | Gemini CLI、OpenCode、Hermes、Reasonix、Claude Code | AST-aware 读取降 token；prompt cache 被 revert 破坏；标题生成无输出限制；security-guidance 每次编辑跑昂贵 git；trusted 目录 2.6 GB 膨胀 |
| **跨平台与本地模型** | Codex、OpenCode、Hermes、Claude Code、Gemini CLI、OpenClaw | Windows 沙箱/闪烁/托盘；Linux Wayland、rootless Podman、Termux；Ollama 自定义 Provider；本地思考模型失控 |

---

## 4. 差异化定位分析

| 工具 | 目标用户 / 定位 | 技术侧重 | 当前主要矛盾 |
|---|---|---|---|
| **Claude Code** | Anthropic 官方用户、企业专业开发者 | 终端/IDE/远程/后台会话，MCP、security-guidance、插件体系 | 权限分类器误判、跨产品上下文割裂、插件分发链路不一致 |
| **OpenAI Codex** | OpenAI/ChatGPT 生态、桌面自动化用户 | Rust CLI、Dots、Computer Use/CUA、Windows 深度集成、GPT-6 前沿模型 | Windows 沙箱与 CUA 稳定性、认证链路、跨设备同步 |
| **Gemini CLI** | Google 开源生态、CLI 极客与评估用户 | 子代理、浏览器代理、AST 感知、沙箱、ACP、IDE companion | 子代理可靠性、配置不生效、token 成本、Linux 兼容 |
| **DeepSeek Reasonix** | 安全敏感、自托管/长程任务用户 | Studio + CLI、MCP 工具固定、供应链安全、计算机操作权限 | 存储膨胀、跨发行版分发、ask 超时阻塞、工具链静默盲区 |
| **OpenCode** | 开源多 Provider、本地模型用户 | TUI-first、Provider 抽象、ACP、桌面/Web、AI SDK | v2 迁移兼容、read/edit 工具精度、MCP 凭据、本地模型行为 |
| **Hermes** | NousResearch 多端 Agent 平台用户 | One gateway 统一 CLI/TUI/Desktop/API/ACP/bots/cron，插件目录 | 跨平台安装、上下文压缩、会话恢复、文档默认值不一致 |
| **OpenClaw** | 自托管、多通道自动化用户 | Gateway、Control UI、多通道投递、skills/automations、记忆 | 子进程生命周期、日志噪音、本地 Ollama 集成、安全身份传播 |
| **Deepseek Harness** | 暂无公开活动信号 | 无法判断 | 过去 24h 无活动 |

**结论：**  
- Claude Code 与 Codex 更像“官方平台级 CLI”，强在模型与生态，但受权限/平台稳定性拖累。  
- Gemini CLI、OpenCode 更贴近开源开发者与工具链扩展，处在快速修复与协议完善期。  
- Reasonix、Hermes、OpenClaw 在架构层更激进，分别押注安全长程任务、One gateway、多通道自动化。  
- Deepseek Harness 当前无活动，暂不具备横向比较信息。

---

## 5. 社区热度与成熟度

**高热度成熟平台：Claude Code、OpenAI Codex、Gemini CLI**  
- Claude Code：#13843 获 122 👍，说明跨端上下文是强共识诉求；但 PR 仅 2 条，开发重心可能不在公开 PR 流。  
- Codex：#49458 达 71 评论 / 25 👍，Windows + CUA 是最大痛点；同时 10 条 PR 更新，迭代仍快。  
- Gemini CLI：窗口 49 条 Issue，P1 #22323 与 #21409 集中暴露子代理可靠性；nightly 机制保证修复速度。

**快速迭代 / 架构演进期：DeepSeek Reasonix、Hermes、OpenClaw**  
- Reasonix：Fedora RPM 需求同日 Issue → PR 合并，社区响应效率高；安全评审、MCP、供应链已成常规流程。  
- Hermes：24h 内 50 条 PR 更新，One gateway 和 CLI Ownership 重构是架构级动作；插件目录扩张明显。  
- OpenClaw：发布 v2026.10.1，P1 僵尸进程 Issue 18 评论；会话/记忆、Gateway、多通道是主线。

**修复与迁移阵痛期：OpenCode**  
- v2 迁移导致旧 Provider 配置被静默丢弃、Go 凭据失效、自定义 Ollama 不加载。  
- 高赞 TUI 滚动 Issue #7648 已关闭，但工具可靠性、MCP、桌面端体验仍在补课。

**低活跃：Deepseek Harness**  
- 过去 24 小时无 Issue/PR/Release，无法评估成熟度。

---

## 6. 值得关注的趋势信号

1. **“静默失败”成为最危险的 Bug 类型**  
   Claude 安全审核失败却报无漏洞、Gemini 子代理 MAX_TURNS 报成功、OpenCode 压缩器生成不存在的 payload、Hermes 压缩标记写入文件、Reasonix wire-parity 漏检——开发者越来越不能接受“看起来成功，实际失效”。未来 CLI 的信任度取决于失败是否显式暴露。

2. **权限与沙箱从安全能力变成自动化摩擦点**  
   Claude Auto mode 在用户批准后仍拒绝，Codex Windows 沙箱 sharing violation，Gemini 需要抑制 `git reset --force`，OpenClaw exec 子进程缺少 agent 身份。远程会话、CI、后台任务需要“可审批、可审计、可解释”的权限路径。

3. **上下文管理是下一代竞争核心**  
   compaction、`/clear`、MCP session ID、跨设备同步、embedding cache、prompt cache、token 预算——谁能让长会话不退化、跨端不失忆，谁就能拿下专业开发者。

4. **One Gateway / 跨端统一架构成为共识**  
   Hermes 的 One gateway、OpenClaw 的 Gateway 运行时、Claude 的 Remote Control、Codex 的 Dots/远程工作流、Gemini/OpenCode 的 ACP 支持，都指向同一方向：CLI 不再只是终端程序，而是多端 Agent 控制面。

5. **MCP / 插件生态进入契约治理期**  
   MCP 会话标识、工具数上限、Bedrock 工具名限制、User Skills 资源读取、插件版本分发不一致，说明生态已从“能接”进入“稳定接、可版本化、可审计”的阶段。

6. **平台兼容性决定真实可用性**  
   Windows 是当前最大痛点集中地：Codex 沙箱/CUA/控制台闪烁，OpenCode 托盘/退出，Hermes PATH 污染。Linux 侧 Wayland、rootless Podman、Termux 也在暴露短板。跨平台可靠性将直接影响企业采购与自托管选择。

7. **本地模型与自托管需求持续上升**  
   OpenCode 的 Ollama Provider 被忽略、标题生成在本地思考模型上失控，OpenClaw 的 Ollama 工具目录超时，说明本地推理用户需要更稳定的 Provider 抽象与输出限制。

**对开发者的参考价值：**  
选型时不应只看模型能力，应重点评估：权限审批是否可编排、会话状态是否可恢复、MCP/插件契约是否稳定、Windows/Linux 是否可用、失败是否可观测。短期看，Claude Code 与 Codex 生态最强但平台摩擦仍大；Gemini CLI、OpenCode 适合愿意跟进快速迭代的开发者；Reasonix、Hermes、OpenClaw 更适合关注自托管、安全与多端编排的团队。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-10-11）

> 说明：原始数据中 PR 评论数字段为 `undefined`，因此 PR 排行主要参考仓库给出的排序、更新时间及关联 Issue 热度；所列 PR 状态均为 `OPEN`。

## 1. 热门 Skills 排行（PR）

| 排名 | Skill / PR | 功能 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | [#1742 mcp-builder](https://github.com/anthropics/skills/pull/1742) | 支持 `mcp>=2` 的 `streamable_http_client` 导入与自定义 headers | MCP 2.0 兼容性；关联 #1668、#1390 的 MCP 评估失败问题 | OPEN |
| 2 | [#1298 skill-creator](https://github.com/anthropics/skills/pull/1298) | 隔离 trigger evals，处理 Windows 与运行时失败 | Skill 触发评估误判、Windows 子进程兼容、评测可靠性 | OPEN |
| 3 | [#1771 proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 智能合约静态分析，并在 TON 上锚定审计证明 | Web3 合约审计、零存储 Merkle 存证新方向 | OPEN |
| 4 | [#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734) | 检测 DOCX 中孤立的评论 | DOCX 评论清理、文档质量保障 | OPEN |
| 5 | [#1703 md2video-audio](https://github.com/anthropics/skills/pull/1703) | Markdown → Marp 幻灯片 → MP4 + 类人语音 | 零成本内容视频化、文档自动化 | OPEN |
| 6 | [#1245 notion-spec-to-implementation / quantitative-resume-auditor](https://github.com/anthropics/skills/pull/1245) | Notion 规格转实现任务；量化简历审计 | 产品/技术规格落地、招聘流程自动化 | OPEN |
| 7 | [#1792 docx](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时报错，并验证输出无修订标记 | 文档修订处理可靠性、错误静默问题 | OPEN |
| 8 | [#1730 claude-api / academy-guide](https://github.com/anthropics/skills/pull/1730) | 替换失效文档 URL | 文档链接维护、开发者体验 | OPEN |

## 2. 社区需求趋势（Issues）

- **安全与信任边界**：社区 Skill 使用 `anthropic/` 命名空间，可能造成官方身份冒用与权限提升风险。代表：[#492](https://github.com/anthropics/skills/issues/492)，43 条评论。期待签名、来源验证、命名空间隔离。
- **团队共享与分发**：组织内 Skill 共享、共享库、直接分享链接需求突出。代表：[#228](https://github.com/anthropics/skills/issues/228)，16 条评论、👍 8。
- **触发与评测可靠性**：`run_eval.py` 触发率为 0、并行 worker UUID 交叉匹配、Windows 失败、benchmark 静默失败。代表：[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)、[#1383](https://github.com/anthropics/skills/issues/1383)。
- **上下文与记忆效率**：`claude-api` 单次注入约 156k tokens；`compact-memory` 提出符号化 agent 状态。代表：[#1487](https://github.com/anthropics/skills/issues/1487)、[#1329](https://github.com/anthropics/skills/issues/1329)。
- **治理与质量门**：社区期待 `agent-governance`、推理质量门、对抗审查、交付验证。代表：[#412](https://github.com/anthropics/skills/issues/412)、[#1385](https://github.com/anthropics/skills/issues/1385)。
- **企业文档与权限**：SharePoint 权限、插件重复、企业文档接入仍缺成熟方案。代表：[#1175](https://github.com/anthropics/skills/issues/1175)、[#189](https://github.com/anthropics/skills/issues/189)。
- **元技能与审查**：社区希望有 Skill 质量分析、安全分析、SKILL.md 最佳实践审查。代表：[#83](https://github.com/anthropics/skills/pull/83)、[#202](https://github.com/anthropics/skills/issues/202)、[#1394](https://github.com/anthropics/skills/issues/1394)。
- **测试与 MCP 生态**：MCP 真实服务器评估、E2E 测试生成、浏览器自动化需求明显。代表：[#1390](https://github.com/anthropics/skills/issues/1390)、[#822](https://github.com/anthropics/skills/pull/822)。

## 3. 高潜力待合并 Skills

- [#1742 mcp-builder](https://github.com/anthropics/skills/pull/1742)：修复 MCP 2.0 兼容性，关联 #1668、#1390，更新至 10-08，属于核心 Skill 修复，落地概率高。
- [#1298 skill-creator](https://github.com/anthropics/skills/pull/1298)：解决触发评估隔离与 Windows 失败，关联 #556、#1352、#1383，是评测可靠性的关键补丁。
- [#1961 skill-creator eval viewer](https://github.com/anthropics/skills/pull/1961)：加固脚本突破、DNS rebinding、跨站 POST、转义问题，安全属性强。
- [#1681 skill-creator](https://github.com/anthropics/skills/pull/1681)：支持 `package_skill.py` 直接执行并更新路径，更新至 10-08。
- [#1980 webapp-testing](https://github.com/anthropics/skills/pull/1980)：移除 `shell=True`，修复命令注入风险，属于高优先级安全修复。
- [#1792 docx](https://github.com/anthropics/skills/pull/1792)：LibreOffice 超时不再误报成功，并验证修订标记是否清除。
- [#1730 claude-api / academy-guide](https://github.com/anthropics/skills/pull/1730)：替换 3 个 404 文档链接，维护成本低，易合并。
- [#1703 md2video-audio](https://github.com/anthropics/skills/pull/1703)：Markdown 到 MP4 视频生成，若通过审核可补充内容视频化场景。

## 4. Skills 生态洞察

**一句话总结：当前社区最集中的诉求不是“更多 Skill”，而是让 Skill 变得可信任、可评估、可治理、可共享——先解决安全命名空间、触发/评测可靠性、上下文效率和团队分发，再扩展新能力。**

---

# Claude 社区动态日报 · 2026-10-11

数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 1. 今日速览

今日**无新版本发布**，仓库动态集中在 Issue 侧：过去 24 小时 Issue 讨论活跃（本次列出评论数最多的 30 条），社区关注点高度集中在**跨端会话上下文连续性**、**Auto mode 权限分类器的误判**、以及 **security-guidance 插件**的正确性与性能问题。同时仓库进行了明显的 stale 清理，多条旧 Issue 被关闭；PR 侧仅有 2 条更新，创下近期低点。

---

## 2. 版本发布

过去 24 小时无新 Release。用户侧仍在讨论 2.1.25x–2.1.296 区间的行为变化（如 `claude --bg` 的目录信任策略变更）。

---

## 3. 社区热点 Issues（按重要度与社区反馈挑选）

### ① [#13843](https://github.com/anthropics/claude-code/issues/13843) 从 Claude.ai 共享会话上下文到 Claude Code —— 122 👍 / 28 评论
本日热度最高。用户在 Claude.ai 上做规划、在 Claude Code 里执行时，上下文无法延续，需手动复述。高赞说明这是**跨产品体验割裂**的代表性诉求，官方至今未表态。

### ② [#41836](https://github.com/anthropics/claude-code/issues/41836) MCP 服务器收不到会话标识，无法区分并发会话 —— 39 👍
Claude Code / Desktop / claude.ai 连接 HTTP MCP Server 时不传递任何 conversation/session ID，导致服务端无法维护会话级状态。这是 **MCP 生态做有状态服务的前置阻塞问题**，对第三方 MCP 开发者价值极高。

### ③ [#70555](https://github.com/anthropics/claude-code/issues/70555) 工作状态连续性：需要熬过 compaction 与 `/clear` —— 19 评论
长会话中助手"越跑越笨"、压缩后反复重推已结论的内容，`/clear` 后完全失忆。这是**记忆与上下文管理**最核心的长期痛点，评论多但零赞，说明讨论集中在深度用户群。

### ④ [#95822](https://github.com/anthropics/claude-code/issues/95822) 短命命令触发 OAuth 刷新却不落盘，导致 refresh token 被"消耗" —— 7 评论
`claude auth status`、`claude --bg …` 等命令在 init 阶段发起 token 刷新后立即 `process.exit()`，刷新结果未保存，profile 里的 refresh token 变成已失效令牌。**直接导致用户被登出**，复现清晰，影响面广。

### ⑤ [#100374](https://github.com/anthropics/claude-code/issues/100374) Auto mode 分类器在用户明确批准后仍持续拒绝，远程用户无审批路径
用户从 Claude 项目线程远程驱动本地 Mac 会话时，分类器反复拦截已被批准的操作，既不给理由也无审批入口。关联 [#97914](https://github.com/anthropics/claude-code/issues/97914)（把 `cat .prettierrc` 等只读操作误判为"不可逆本地破坏"）。**权限系统正在成为自动化的最大摩擦点。**

### ⑥ [#100974](https://github.com/anthropics/claude-code/issues/100974) Auto mode 的"环境教学"提示只在终端出现，阻塞 Remote Control 会话（今日新建）
远程客户端看不到该提示，会话表现为"一直忙碌"；终端里一个误触的 Enter 会直接打开 `/auto-mode-setup`。属于 Auto mode 与远程控制交互的**新暴露缺陷**。

### ⑦ [#99840](https://github.com/anthropics/claude-code/issues/99840) + [#99857](https://github.com/anthropics/claude-code/issues/99857) security-guidance 审核失败被记录为"未发现漏洞"
- #99840：模型调用 401 时插件打印"no vulnerabilities found"，并把 commit 标记为已审核，push sweep 也不会重审——**失效的审核与干净的审核无法区分**，属于安全语义层面的严重问题。
- #99857：经 LLM 网关（WSL）时，`ANTHROPIC_CUSTOM_HEADERS` 从未发送，导致网关鉴权 401。

### ⑧ [#98731](https://github.com/anthropics/claude-code/issues/98731) security-guidance 的 `git status -uall` 在 66 个子模块仓库中单次耗时约 73 秒
缺少 `--ignore-submodules`，且插件在**每次 UserPromptSubmit 和每次文件编辑**时都会执行。对大型 monorepo 用户是硬性阻断。

### ⑨ [#101114](https://github.com/anthropics/claude-code/issues/101114) 2.1.296 在终端应答探测后仍不发送 OSC 7501 状态上报（今日新建）
Windows 11 + Sublime Text 内置 GhostShell（libghostty）。终端按顺序正确应答了 `ESC[>0q` / `ESC[?u` / `ESC]7501;?` / `CSI c`，Claude Code 仍未上报状态。**终端能力协商与状态集成**的回归问题。

### ⑩ [#97746](https://github.com/anthropics/claude-code/issues/97746) + [#99964](https://github.com/anthropics/claude-code/issues/99964) 多会话编排能力缺口
- #97746：Agent view 只能单目标操作，希望**勾选多个会话统一回复**，并提供 `claude send`。
- #99964：同机的外部进程（编排器、看板、手机中继）能看到会话卡在权限提示上，却**无法查看内容、无法代为批准**。
- 关联 [#98006](https://github.com/anthropics/claude-code/issues/98006)（脚本化 `claude --bg` 需要用户级目录预信任）与 [#87883](https://github.com/anthropics/claude-code/issues/87883)（`claude agents --json` 的 state 取值未文档化）。

**其他值得一提**：[#80202](https://github.com/anthropics/claude-code/issues/80202) 盘符/文件系统根目录下项目 `CLAUDE.md` 被静默忽略（已复现）；[#97929](https://github.com/anthropics/claude-code/issues/97929) / [#92402](https://github.com/anthropics/claude-code/issues/92402) / [#90576](https://github.com/anthropics/claude-code/issues/90576) 三条重复诉求指向同一件事——**桌面端语音听写的快捷键绑定缺失**；[#100426](https://github.com/anthropics/claude-code/issues/100426) 远程控制会话名被 AI 生成标题覆盖；[#100991](https://github.com/anthropics/claude-code/issues/100991) Projects 的 Debug access 授权对 Claude 不可见。

---

## 4. 重要 PR 进展

⚠️ **过去 24 小时仅 2 条 PR 更新，无法凑足 10 条**，以下为全部内容：

### #101131 [CLOSED] security-guidance: 与 claude-plugins-official (2.0.13) 同步
🔗 https://github.com/anthropics/claude-code/pull/101131
本仓库内置的 `security-guidance` 副本仍是 2.0.0，marketplace 条目写的是 1.0.0 且描述还是最早的 reminder hook。从本仓库 marketplace 安装会得到一个**功能缺失的版本**（无后续安全审核能力）。该 PR 将其同步至 2.0.13（作者 @mhegazy，已关闭/合入）。这条 PR 与上面 #99840 / #99857 / #98731 三条 Issue 形成呼应——插件版本分发链路本身存在问题。

### #6754 [OPEN] 为 VS Code 中的 Claude CLI 补充 RTL 支持文档
🔗 https://github.com/anthropics/claude-code/pull/6754
新增 `rtl-support.md`，说明 VS Code 集成终端中希伯来语/阿拉伯语/波斯语文本反向错乱的解决办法。自 2025-08-28 创建至今仍未合并，属于**长期挂起的纯文档 PR**。

> 观察：今日 PR 活跃度极低，且两条 PR 都不涉及核心功能演进，说明近期开发重心不在公开仓库的 PR 流上。

---

## 5. 功能需求趋势

从本次 30 条 Issue 中可提炼出以下方向：

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **跨端/跨会话上下文连续性** | #13843、#41836、#70555 | 🔥🔥🔥 最高赞 + 最高评论 |
| **权限系统（Auto mode）可控性** | #100374、#100974、#97914、#98006、#99964 | 🔥🔥🔥 集中在近两周，问题密集 |
| **security-guidance 插件成熟度** | #99840、#99857、#98731、#101131 | 🔥🔥 正确性 + 性能 + 分发三重问题 |
| **多会话 / Agent 编排** | #97746、#99964、#87883、#98006 | 🔥🔥 后台会话与 Agent view 是新一代工作流 |
| **MCP 生态基础设施** | #41836 | 🔥🔥 有状态 MCP 服务的前置条件 |
| **桌面端体验与快捷键** | #97929、#92402、#90576、#100426 | 🔥 语音听写快捷键被三次重复提出 |
| **Windows / 跨平台兼容** | #80202、#101114、#98731 | 🔥 盘符根目录、终端状态上报、子模块遍历 |
| **认证与凭据** | #95822、#99857 | 🔥 网关与企业网络场景 |
| **文档补全** | #6754、#87883 | 状态枚举、RTL 等文档缺口 |

---

## 6. 开发者关注点（痛点总结）

1. **权限分类器"宁可错杀"正在伤害自动化**：多条 Issue 反映同一模式——用户明确批准后仍被拦截、只读命令被判为破坏性操作、远程会话完全没有审批入口。对 CI、`--bg` 后台会话、远程中继类用法影响最大。
2. **静默失败是最危险的一类 Bug**：`CLAUDE.md` 在盘符根目录被静默忽略（#80202）、安全审核失败却报告"未发现漏洞"（#99840）、`ANTHROPIC_CUSTOM_HEADERS` 静默不发（#99857）、`claude agents --json` 的 state 值未文档化（#87883）。开发者普遍希望**失败必须显式暴露**。
3. **长会话记忆退化**：compaction 与 `/clear` 之后状态丢失，导致重复劳动与"自信的错误"（#70555）。
4. **插件在企业级仓库下的开销不可接受**：security-guidance 在每次 UserPromptSubmit / 每次编辑时执行昂贵的 git 操作（#98731）。
5. **分发链路不一致**：marketplace 中的插件版本与本仓库副本不一致，导致用户装到残缺版本（#101131）。
6. **仓库维护节奏**：今日关闭了 8 条 Issue（#73341、#72622、#80264、#76980、#87076、#78233、#77171、#77177），多数标记为 `stale` / `invalid` / `duplicate`——维护者正在进行积压清理，但其中如 #80264（大小写不敏感文件系统产生重复项目条目）被 stale 关闭的条目，社区未必认可其已解决。

---

*注：本期 PR 样本仅 2 条，第 4 部分已按实际数据完整呈现，未作补足。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-10-11）

## 1. 今日速览

- Codex 发布 `rust-v0.163.0-alpha.5`，仍处于 Rust 侧 alpha 快速迭代，暂无详细 release notes。
- 社区高热度问题高度集中在 Windows 桌面端：Dots/Computer Use 工具缺失、沙箱共享冲突、CUA 启动失败、浏览器策略加载失败等。
- 新模型 GPT-6 / GPT-6.1 Sol 的质量与负载反馈升温，同时 DeviceCheck、workspace routing 等认证链路问题继续影响 macOS/Windows 用户。

## 2. 版本发布

- **rust-v0.163.0-alpha.5**：Release 0.163.0-alpha.5。仅给出版本号，无进一步更新说明。  
  链接：https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.5

## 3. 社区热点 Issues

1. **[#49458](https://github.com/openai/codex/issues/49458)** Windows Dots 本地任务缺少 Computer Use 工具，普通本地 Codex 会话正常  
   71 评论 / 25 👍。当前最热问题。dot 启动任务无法使用 CUA，说明远程/自动化路径与本地路径能力不一致，阻塞关键工作流。

2. **[#51932](https://github.com/openai/codex/issues/51932)** Windows App 26.1002.7124.0 沙箱运行时读写/执行校验因 sharing violation 失败  
   29 评论。新版 Windows 沙箱直接阻塞基础命令执行，属于平台级稳定性问题。

3. **[#52407](https://github.com/openai/codex/issues/52407)** Windows Dots：CUA MXC launcher 在直接 shell 恢复后失败，HRESULT 0x80070003  
   27 评论 / 5 👍。Dots 的 Computer Use 启动链路异常，影响 Windows 自动化任务。

4. **[#26613](https://github.com/openai/codex/issues/26613)** Codex Desktop on Windows 后台轮询时闪烁 PowerShell/console 窗口  
   14 评论 / 11 👍。长期体验问题，用户可见控制台窗口反复闪烁，影响桌面端观感与信任。

5. **[#17541](https://github.com/openai/codex/issues/17541)** Azure 下对话中途切换模型失败：“encrypted content could not be decrypted”  
   11 评论 / 10 👍。跨模型切换与加密内容兼容性问题，可能影响 Azure/企业用户的多模型工作流。

6. **[#46129](https://github.com/openai/codex/issues/46129)** Windows 浏览器命令报 “Unable to load browser request-header policy”，疑似 Statsig 初始化载荷过大  
   10 评论。Edge 扩展浏览器命令在访问标签页前即失败，根因指向 ~4.8 MB 策略载荷超过 `nodeRepl.fetch` 限制。

7. **[#48490](https://github.com/openai/codex/issues/48490)** 跨设备会话同步变陈旧，旧客户端可能隐藏移动端更新内容  
   7 评论。ChatGPT iPhone 与 Windows/web 之间同步不一致，影响会话连续性和状态信任。

8. **[#51667](https://github.com/openai/codex/issues/51667)** macOS VM 更新到 26.1002.52244 后 Codex 消息被阻止  
   5 评论。更新后 safety-check/auth 相关链路导致消息被拦截；同类 DeviceCheck 问题也出现在 [#52001](https://github.com/openai/codex/issues/52001)、[#52470](https://github.com/openai/codex/issues/52470)。

9. **[#53002](https://github.com/openai/codex/issues/53002)** User Skills 声明的子资源被 `resources/read` 以 Unknown resource 拒绝  
   3 评论。涉及 MCP/Skills 资源契约一致性，影响自定义技能与 Codex 宿主的互操作。

10. **[#52995](https://github.com/openai/codex/issues/52995)** GPT-6 reasoning effort 设为 High 时效果仍显著低于预期  
    2 评论。另见 [#52994](https://github.com/openai/codex/issues/52994) 报告 GPT-6 Astra / GPT-6.1 Sol 质量回归与 `server_overloaded`。新模型质量与负载成为新增关注点。

## 4. 重要 PR 进展

以下 PR 均为过去 24 小时内更新/关闭，多数由自动化机器人 `copyberry[bot]` 提交，覆盖 TUI、MCP、code-mode、模型请求与可观测性。

1. **[#52990](https://github.com/openai/codex/pull/52990)** 为 TUI 添加可搜索 `/config` 偏好面板  
   将偏好分组为 Appearance、Notifications、Input、Sessions、Text selection，并支持搜索与持久化，提升 TUI 可配置性。

2. **[#52972](https://github.com/openai/codex/pull/52972)** 升级 `rmcp` 至 3.5.1 并强化生命周期测试  
   同步更新 Cargo/Bazel lockfile，迁移 MCP handler 到 `ClientConfig` / `ServerConfig`，改善 MCP 集成稳定性。

3. **[#52967](https://github.com/openai/codex/pull/52967)** 复用并预热 WSL 剪贴板文本读取器  
   避免每次粘贴都启动 PowerShell，解决 WSL 下进程创建挂起和剪贴板卡顿。

4. **[#52964](https://github.com/openai/codex/pull/52964)** 在原始粘贴爆发期间延迟 owned transcript 重绘  
   大批量字符、Enter、Tab 事件输入时跳过逐键重绘，改善 TUI 粘贴性能。

5. **[#52937](https://github.com/openai/codex/pull/52937)** 压缩后保留客户端标记的工具输出  
   新增默认关闭的 `retain: true` 行为，避免携带任务指令的客户端工具输出在 compaction 中被裁掉。

6. **[#52742](https://github.com/openai/codex/pull/52742)** 为 OpenAI 请求添加可选输出 token replay  
   引入默认关闭的 `output_token_replay`，请求 `output.encrypted_content`，保留加密消息、工具调用状态和注释。

7. **[#52748](https://github.com/openai/codex/pull/52748)** 让 code-mode `exit()` 停止整个 cell  
   防止 `catch`、`finally` 或 Promise 回调在 `exit()` 后继续执行，使单元格立即成功结束。

8. **[#52825](https://github.com/openai/codex/pull/52825)** 在执行运行时重置后、接受新请求前主动报告状态  
   gRPC code-mode runtime 替换会丢失存储值和运行单元格，此 PR 避免静默继续造成状态误解。

9. **[#52756](https://github.com/openai/codex/pull/52756)** 分类语音会话失败并记录终止结果  
   为 voice failure metrics 增加原因和生命周期阶段，避免失败的 control send 覆盖更具体的 WebRTC 错误。

10. **[#52736](https://github.com/openai/codex/pull/52736)** 允许模型目录覆盖增量工具通知  
    支持通过 `model_messages.tools.incremental_tools` 覆盖更新提示、工具/命名空间移除头、命名空间指令更新与清除消息。

## 5. 功能需求趋势

- **Windows 平台稳定性与沙箱**：大量高评论 Issue 指向 Windows 沙箱 sharing violation、elevated sandbox ACL、CUA 启动失败、进程崩溃、控制台闪烁。
- **Computer Use / Browser Use 可靠性**：Dots 下 CUA 工具缺失、截图超时、控件不可点击、浏览器 request-header policy 加载失败反复出现。
- **跨设备同步与 Dots/Remote 工作流**：跨设备会话陈旧、dot 到 native 任务授权拒绝、云电脑 GitHub 连接阻塞。
- **认证与安全校验链路**：DeviceCheck 失败、workspace routing HTTP 432、safety-check 阻塞发送，影响 macOS 与 Windows 桌面端。
- **新模型支持与质量**：GPT-6 / GPT-6.1 Sol / Astra 的 reasoning effort、模型选择器缺失、`server_overloaded` 成为新焦点。
- **MCP / Skills / Hooks 契约**：User Skills 子资源读取失败、Stop hook 在 `/goal` 边界误触发、`/review` 不派发 Stop hook，说明扩展点语义仍需明确。
- **TUI 与输入性能**：WSL 剪贴板、原始粘贴重绘、启动模态、可搜索配置面板、pinned prompt 点击导航等体验优化持续活跃。

## 6. 开发者关注点

- **Windows 是当前最大痛点集中地**：沙箱、Computer Use、浏览器自动化、安装包崩溃等问题评论数高、👍 多，说明已直接影响日常开发与自动化任务。
- **浏览器自动化“能读不能交互”**：多个 Issue 报告可读取网页，但滚动/点击等交互失败，指向 request-header policy 加载链路。
- **认证/路由错误直接阻塞消息发送**：DeviceCheck、HTTP 432、account lookup failure 使用户无法进入工作区或发送消息。
- **模型切换与加密内容兼容性**：Azure 下 encrypted content 解密失败，和新增 output token replay PR 可能共同指向跨模型/跨会话状态保留问题。
- **新模型质量回归与负载**：Pro 用户对 GPT-6 系列 reasoning 效果和 `server_overloaded` 的反馈需要关注。
- **会话状态一致性**：跨设备同步、回答内容消失、消息队列等 UI/后端状态问题仍高频。
- **Hooks / MCP / Skills 需要更清晰契约**：Stop hook 边界、资源读取拒绝、工具输出保留等，反映扩展生态对稳定语义的强需求。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-10-11）

## 1. 今日速览

今日社区焦点集中在**子代理（Subagent）可靠性**与**终端渲染稳定性**两大方向：P1 级 Issue #22323（子代理 MAX_TURNS 被误报为 GOAL 成功）持续发酵，成为评论数最高的开放问题；同时 #21409（generalist agent 无限挂起）累计 8 个 👍，反映用户对代理循环失控的强烈不满。PR 侧则有多项针对超时、编码边界与 IDE 集成的修复集中落地。

---

## 2. 版本发布

**v0.65.0-nightly.20261010.g9b6e0265d**（nightly 通道）

- `fix(cli)`: 处理 `fetchJson` 中的 JSON 解析与响应流错误（[PR #29658](https://github.com/google-gemini/gemini-cli/pull/29658)）
- `fix(core)`: 在 `truncateString` 中保留行终止符（[PR #29673](https://github.com/google-gemini/gemini-cli/pull/29673)）

两个修复均属稳健性方向，不涉及新功能；nightly 版本号由机器人自动提交（[PR #29701](https://github.com/google-gemini/gemini-cli/pull/29701)）。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级 | 评论/👍 | 为什么重要 |
|---|------|--------|---------|-----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS 被报告为 GOAL success | P1 | 13 / 2 | 子代理在未完成分析时就撞上 turn 上限，却仍返回 `status: "success"`，掩盖了真实中断。这是**代理可信度**的根因级问题，直接影响 `/chat share`、eval 与用户判断。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent 永久挂起 | P1 | 8 / 8 | 一旦交给 generalist agent 就无限等待（用户实测等待 1 小时以上）。👍 数最高，说明命中面广；临时规避方式是禁用 subagent 委派。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | 利用模型 bash 亲和性 + 零依赖 OS 沙箱 | P2 | 9 / 1 | 提出让 Gemini 3 原生 POSIX 工具链（grep/sed/awk）在安全沙箱内发挥，是**架构级方向**讨论，兼顾能力释放与安全边界。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | AST-aware 文件读取、搜索与映射的影响评估 | P2 | 7 / 1 | 探索用 AST 精准读取方法边界，减少错位读与 token 噪声，直接关系到 `codebase_investigator` 的上下文效率。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini 未主动使用 skills 和 sub-agents | P2 | 7 / 0 | 用户反馈：除非显式指令，模型几乎不会自主调用自定义 skill/子代理，说明工具路由与提示策略仍有缺口。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent 忽略 settings.json 覆盖（如 maxTurns） | P2 | 4 / 0 | AgentRegistry 读取了配置但 Agent 未生效，属配置链路断裂，影响所有浏览器自动化用户的可控性。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | Browser subagent 在 Wayland 下失败 | P1 | 4 / 1 | Linux 桌面主流 Wayland 会话下浏览器代理不可用，平台兼容性阻塞。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 工具数 > 128 时触发 400 错误 | P2 | 3 / 0 | 大型 MCP / 工具集场景直接报错，是**工具生态扩展**的天花板问题。 |
| [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | `get-shit-done` 输出钩子在收尾时崩溃 | P1 | 3 / 0 | 输出即将完成时 CLI 崩溃，属于影响会话成果保存的体验级 bug。 |
| [#18836](https://github.com/google-gemini/gemini-cli/issues/18836) | 用持久化文件任务追踪替换 WriteToDo | P3 | 2 / 0 | 直指“上下文腐化”与跨会话记忆丢失，是任务跟踪机制的重构提案，长期价值高。 |

> 另值得留意：#22672（代理应停止/劝阻 `git reset --force` 等破坏性操作）、#21763（`/bug` 报告缺失子代理上下文）、#22598（子代理轨迹应可通过 `/chat share` 查看），三者共同指向**代理行为可观测性与安全性**。

---

## 4. 重要 PR 进展（精选 10 条）

| # | 类型 | 内容 |
|---|------|------|
| [#29709](https://github.com/google-gemini/gemini-cli/pull/29709) | fix(vscode-ide-companion) | 修复 `activate()` 中因多余括号导致注册变成逗号表达式、disposable 未被纳入 `context.subscriptions` 的问题（Fixes #27790）——影响 VS Code 扩展卸载时的资源清理。 |
| [#29708](https://github.com/google-gemini/gemini-cli/pull/29708) | fix(acp) | `session/load` 在历史回放写入完成前就返回响应，导致 ACP 客户端收到错序的 `session/update`。修复后符合 ACP 规范。 |
| [#29611](https://github.com/google-gemini/gemini-cli/pull/29611) | fix(core) | 为带点号的 Gemini 3 模型（如 `gemini-3.8-flash`）及别名解析 `supportsMultimodalFunctionResponse()`，避免 `read_file` 读图等多模态工具输出被拆成非法 sibling parts 触发 HTTP 400。 |
| [#29608](https://github.com/google-gemini/gemini-cli/pull/29608) | fix(core) | 为 `GoogleSearch` / `WebFetch` 增加 **30 秒超时**，解决底层 LLM 调用不 settle 时 agent 永久停留 `Thinking...`（用户报告 30 分钟以上挂起）。 |
| [#29703](https://github.com/google-gemini/gemini-cli/pull/29703) | fix(core) | 原子写临时文件名 = 目标名 + 41 字节 `.uuid.tmp`，导致 215–255 字节文件名触发 `ENAMETOOLONG`；本 PR 将其裁至 `NAME_MAX` 内。 |
| [#29606](https://github.com/google-gemini/gemini-cli/pull/29606) | fix(core) | `parseCustomHeaders` 仅在合法 RFC 9110 token 前按逗号切分，修复 JSON 元数据（如 `x-portkey-metadata`）与多 URL 值被错误拆分的 bug。 |
| [#29607](https://github.com/google-gemini/gemini-cli/pull/29607) | fix(scripts) | `aggregate_evals.js` 在无 `report.json` 时曾 exit 0，配合 nightly 的 `continue-on-error` 会让“全部失败”被静默吞掉；改为失败退出。 |
| [#29705](https://github.com/google-gemini/gemini-cli/pull/29705) | fix(cli) | `formatDuration` 在单位选择前先按显示精度取整，使 `1000ms → 1.0s`、`60.0s → 1m`，消除边界显示错误（标记 help wanted）。 |
| [#29505](https://github.com/google-gemini/gemini-cli/pull/29505) | fix（已关闭） | 支持 rootless Podman + `keep-id`，修正沙箱内 UID/GID 映射导致的启动失败。 |
| [#29615](https://github.com/google-gemini/gemini-cli/pull/29615) | fix(ci) | `chained_e2e.yml` 的 `workflow_run` 路径加固：仅在上游成功时下载仓库，移除不可信的 `head_sha` 回退，降低非预期 checkout 风险。 |

---

## 5. 功能需求趋势

从 49 条 Issues 的标签与主题分布看，社区关注方向集中在以下几类：

1. **子代理 / Agent 编排（占比最高）**
   - 生命周期正确性：#22323、#21763、#22598
   - 行为自主性：#21968（不主动用 skill）、#18287（共享内存 / 并行子代理）、#22741（Ctrl+B 后台化子代理）
   - 输出稳健性：#22186、#21409

2. **上下文与 token 效率**
   - AST-aware 读写与代码库映射：#22745、#22746、#22747
   - 外科式读取与上下文瘦身：#19561（Tactful Extraction，当前基线约 36.6k tokens/turn）
   - 持久化任务追踪替代 in-context WriteToDo：#18836

3. **安全与沙箱**
   - #19873 零依赖 OS 沙箱 + 执行后意图路由
   - #22672 抑制破坏性命令（`git reset`、`--force`）
   - #18397 按 workspace 而非全局的自动策略

4. **平台 / IDE 集成**
   - VS Code companion 资源管理：#29709
   - Wayland 与 rootless Podman 等 Linux 环境：#21983、#29505

5. **评估与可观测性**
   - #23166 稳定内部项目评测、#23313 让 steering eval 稳定通过
   - #22598 子代理轨迹可分享

6. **模型层适配**
   - #29611 点号版本 Gemini 3 与多模态函数响应

---

## 6. 开发者关注点

综合 Issues 与 PR 的讨论，可归纳出四条高频痛点：

1. **“静默失败”与“无限等待”最伤信任**
   子代理把 MAX_TURNS 中断报成 GOAL success（#22323）、generalist agent 永久挂起（#21409）、web search 不超时导致 30 分钟 `Thinking...`（#29608）。开发者要的不是更多功能，而是**可解释的失败**。

2. **配置写了却不生效**
   Browser Agent 忽略 `settings.json`（#22267）、`~/.gemini/agents/*.md` 为符号链接时不被识别（#20079）、工具数超 128 触发 400（#24246）——配置解析链路与实际执行体之间存在脱节。

3. **token 成本敏感度高**
   社区已把每轮上下文基线（约 36.6k tokens）、大文件读入带来的 +15k tokens/turn 摆上台面，催生 AST 感知读取、Tactful Extraction、持久化任务追踪等一系列“省 token”提案。

4. **Linux / 容器环境的兼容性仍是短板**
   Wayland 下浏览器子代理失败、rootless Podman 的 UID/GID 映射问题，说明 CI 覆盖与真实桌面环境之间仍存在差距。

---

*日报基于 github.com/google-gemini/gemini-cli 公开数据生成，统计窗口为 2026-10-10 至 2026-10-11。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报
**日期：2026-10-11** ｜ 数据来源：[github.com/esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

---

## 一、今日速览

Studio v2.34.0 正式发布，带来工作区分支切换、统一界面缩放与应用操作生效校验。社区侧，Fedora/RPM 打包需求在一天内从 Issue 直接走到 PR 合并（[#12268](https://github.com/esengine/DeepSeek-Reasonix/issues/12268) → [#12608](https://github.com/esengine/DeepSeek-Reasonix/pull/12608)），同时 2.6 GB 的 `trusted/` 目录膨胀问题也被定位并修复。此外，仓库负责人 @esengine 抛出「智能 UI」RFC，指向 agent 生成、声明式渲染的交互界面这一新方向。

---

## 二、版本发布

### v2.34.0 / studio-v2.34.0
CLI 归档由 Studio 版本构建产出，本次主体更新集中在 Studio：

**新增**
- **输入框分支标签读取真实 git 状态**，可直接把工作区切换到另一个本地分支；当存在进行中的回合、后台任务或未提交改动时，会明确拒绝并说明原因（[#12092](https://github.com/esengine/DeepSeek-Reasonix/pull/12092) by @XTLine、[#12171](https://github.com/esengine/DeepSeek-Reasonix/pull/12171) by @XTLine）
- **界面缩放统一为单一声明范围 0.8–1.8（步长 0.05）**，滑块显示值即持久化值，并支持 Ctrl/Cmd + `+`、`-`、`0`

**修复**
- 电脑操作现在会判断每一步是否生效
- 修复回退冲突、旧版会话导入、模型切换、GLM 思考参数，以及多处终端界面问题

---

## 三、社区热点 Issues

> 过去 24 小时内更新的 Issue 共 6 条，以下为全部条目。

**1. [#12268](https://github.com/esengine/DeepSeek-Reasonix/issues/12268) — 为 Fedora 等 RPM 系发行版发布 RPM/AppImage 构建** `OPEN`
Studio 2.x 的 Linux 产物目前只有 `.deb`，Fedora、RHEL/CentOS、openSUSE 用户需要自行绕行。作者指出应用是 Electron 自包含构建、无运行时依赖，**打一个 `.rpm` 几乎零成本**。这是今日推进最快的需求：同日即有 PR #12608 落地。

**2. [#12584](https://github.com/esengine/DeepSeek-Reasonix/issues/12584) — RFC：Reasonix Studio 的智能 UI（agent 生成、声明式渲染的交互界面）** `OPEN`
由 @esengine 起草的草案型 RFC，探讨让 agent 生成可声明式渲染的交互界面。属于架构级方向性提案，目前仅 1 条评论、仍处 review 阶段，但可能影响 Studio 后续交互形态。

**3. [#12603](https://github.com/esengine/DeepSeek-Reasonix/issues/12603) — Trusted Host State 的 `trusted/` 目录无上限增长（约 2.6 GB / 7.4 万文件）** `CLOSED`
由 Studio 内反馈通道提交（Windows 11 amd64）。`%APPDATA%\reasonix\trusted\` 占整个数据根（约 3.8 GB）的 **69%**，且按天持续增长。根因是 `sealShadowBundle` 把契约 criteria 与 verdict obligations 全量内联进了每轮的 `shadow_bundle/1`，已由 [#12609](https://github.com/esengine/DeepSeek-Reasonix/pull/12609) 修复。

**4. [#12606](https://github.com/esengine/DeepSeek-Reasonix/issues/12606) — 增加开关：ask 超时自动跳过** `OPEN`
同样来自 Studio 反馈。诉求是让长程任务不必担心中途卡在 ask 环节，并直接引用 codex 已有同类功能作为参照。

**5. [#12576](https://github.com/esengine/DeepSeek-Reasonix/issues/12576) — wire-parity 无法声明嵌入 struct 或 extends 接口的 wire 类型** `CLOSED`
`wire-parity` 检查器看不到 Go 嵌入字段与 TS `extends`，导致外层 `PermissionRules` 无法声明，只有 `DormantPermissionRule` 被注册——**外层类型单侧新增字段不会被发现**。已由 [#12590](https://github.com/esengine/DeepSeek-Reasonix/pull/12590) 修复，属于工具链自身的静默盲区。

**6. [#12604](https://github.com/esengine/DeepSeek-Reasonix/issues/12604) — Daily research 2026-10-11** `OPEN`
例行研究记录，仅做调研不做构建，覆盖 `origin/studio` @ `6c146088c7` 的代码事实，只报告比 #12516 / #12433 / #12334 / #12235 更新的事实。

---

## 四、重要 PR 进展

**1. [#12608](https://github.com/esengine/DeepSeek-Reasonix/pull/12608) — 为 Linux Studio 构建并发布 RPM** `CLOSED`
回应 #12268。触及发布工作流、打包 hook 和更新清单，被标记为**供应链敏感**，请求安全评审；未新增特权代码、未放宽签名或摘要校验。

**2. [#12609](https://github.com/esengine/DeepSeek-Reasonix/pull/12609) — 停止把契约 criteria 复制进每个 sealed bundle** `CLOSED`
修复 #12603。此前 `sealShadowBundle` 内联了完整 criteria 列表（1.3 万条目量级）与 verdict obligations，直接造成磁盘膨胀。

**3. [#12597](https://github.com/esengine/DeepSeek-Reasonix/pull/12597) — 在审批时固定 MCP 工具定义，并 hold 住已变更的工具** `CLOSED`
回应 #12356 的第一切片：digest、baseline、检测、hold、类型化拒绝、通知与最小审批流程。涉及 `internal/ext/plugin/**` 敏感路径，`make coverage-gate` 通过。

**4. [#12451](https://github.com/esengine/DeepSeek-Reasonix/pull/12451) — 关闭硬件加速并展示窗口绘制方式** `CLOSED`
来自真实反馈：混合显卡笔记本（Intel Iris Xe + 旧驱动）在 Studio 打开时集显被钉在 100%。此前 Electron 外壳既不能关闭硬件加速，也无处查看 GPU 状态。

**5. [#12593](https://github.com/esengine/DeepSeek-Reasonix/pull/12593) — 拒绝有歧义的窗口目标，并允许调用指名窗口** `CLOSED`
#12485 的 slice E（Windows）。涉及 `internal/platform/computer/**`；按应用授权、`decideComputer`、`requireHuman` 与权限主体均未改动，仅让拒绝行为更明确。

**6. [#12590](https://github.com/esengine/DeepSeek-Reasonix/pull/12590) — wire-parity 读取嵌入 struct 与 extends，声明 PermissionRules** `CLOSED`
修复 #12576。`wireFieldNames` 此前跳过所有匿名字段，`tsInterfaceFields` 只匹配 `export interface X {`，导致嵌入或继承构造的类型无法被检查。

**7. [#12588](https://github.com/esengine/DeepSeek-Reasonix/pull/12588) — 对无法运行 driver 的子命令跳过 driver 列举** `CLOSED`
性能优化：`gitcmd.build` 此前在**每次**调用前都执行 `git config --get-regexp`，连 `rev-parse`、`write-tree`、`ls-tree`、`symbolic-ref` 这类不可能转换文件内容的命令也会多起一个进程。

**8. [#12440](https://github.com/esengine/DeepSeek-Reasonix/pull/12440) — 重启后保留已配对手机，附设置开关** `OPEN`
修复 #11834。新增 `[serve] remember_paired_devices`，**默认 false**，开关位于手机访问面板分享开关旁——保留凭证属于安全敏感行为，选择显式 opt-in 是合理取舍。

**9. [#11535](https://github.com/esengine/DeepSeek-Reasonix/pull/11535) — 可选开启：自动归档 N 天无活动的会话** `CLOSED`
回应 #11516。默认关闭，阈值默认 30 天、范围 1–3650 天。解决长期使用者的侧边栏无限膨胀问题。

**10. [#12607](https://github.com/esengine/DeepSeek-Reasonix/pull/12607) — 给异步查询在负载机器上留出余量** `OPEN`
通过统一 setup 文件把前端测试的 `asyncUtilTimeout` 从 testing-library 默认 1s 提到 10s。此前 `AskCard.markdown`、`chart.transcript`、`html-preview.interaction`、`Versions.notes`、`theme-inventory-app` 在 Windows 上即使在干净 `origin/studio` 也会失败。

**其他值得留意**：[#11299](https://github.com/esengine/DeepSeek-Reasonix/pull/11299) 从最终回复创建对话分支、[#11591](https://github.com/esengine/DeepSeek-Reasonix/pull/11591) 带回按需自动命名的重命名对话框、[#12596](https://github.com/esengine/DeepSeek-Reasonix/pull/12596) 修正 `POST /submit` 的 409 误判、[#12585](https://github.com/esengine/DeepSeek-Reasonix/pull/12585) 限制并转义快照与应用列表中的应用名。

---

## 五、功能需求趋势

**1. 分发与平台覆盖**
RPM/AppImage 是当前最明确的缺口（#12268）。Electron 自包含特性使打包成本低，社区期望很快从「仅 `.deb`」走向多发行版覆盖。

**2. 长程任务可靠性 / 无人值守**
ask 超时自动跳过（#12606）直指 agent 长程执行中的阻塞点，是典型的「跑得久」而非「跑得快」的需求。

**3. 存储与数据卫生**
`trusted/` 目录 2.6 GB 膨胀（#12603）与侧边栏会话无限增长（#11516 → #11535）属同一类问题：长期使用下的本地资源无上限累积。随着用户留存时间变长，这类问题会持续暴露。

**4. 交互形态演进**
「智能 UI」RFC（#12584）提出 agent 生成、声明式渲染的交互界面，是本期唯一的方向性提案，值得持续跟踪。

**5. 安全与供应链**
本期多条 PR 落在敏感路径：MCP 工具定义固定（#12597）、发布工作流（#12608）、计算机操作用户目标消歧（#12593）、配对设备凭证持久化默认关闭（#12440）。安全评审已成常规流程。

**6. 工具链与测试健壮性**
wire-parity 盲区（#12576）、e2ebench 恢复失败被吞（#12562）、tape 录制丢文件不报错（#12563）、负载机器上的测试超时（#12607）——检查器本身「静默通过」的问题被集中清理。

---

## 六、开发者关注点

1. **磁盘占用失控最伤用户**：`trusted/` 目录 7.4 万文件、占数据根 69%，且是逐步累积而非突发，用户往往在磁盘告警时才发现。根因「每轮塞入全量契约与义务列表」也说明写入路径缺乏大小上限约束。

2. **卡在 ask 上中断长程任务**：用户明确对比 codex 的同类能力，说明「超时后自动继续」已是 agent 工具的事实标准行为。

3. **显卡/驱动兼容性**：集显被钉在 100%（#12451）是典型的旧驱动 + Electron 组合问题，用户侧无法自行规避，只能靠应用提供开关与状态可见性。

4. **跨发行版安装阻力**：RPM 系用户需要自行绕行安装，是纯粹的分发摩擦，非功能缺陷。

5. **静默失效比显式报错更危险**：wire-parity 漏检外层类型字段漂移（#12576）、e2ebench 恢复失败被当作成功（#12562）、tape 录制缺文件无法与正常录制区分（#12563）——这类问题会让 CI 给出虚假的绿色信号。

6. **负载环境下的测试不稳定**：1s 默认超时在 Windows/繁忙机器上频繁误报，已影响开发者对测试结果的信任。

---

*本日报由 GitHub 公开数据自动汇总生成，链接均指向 esengine/DeepSeek-Reasonix 仓库。*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报（2026-10-11）

## 今日速览
过去 24 小时无新版本发布。社区焦点集中在 v2 升级兼容性、核心工具可靠性、Provider/MCP 配置与桌面端体验。高赞 TUI 滚动控制 Issue #7648 已关闭，同时多个带 `[reproduced]` / `[triaging]` 标签的问题持续更新，表明维护者正在处理工具链和会话层问题。

## 社区热点 Issues

- **[#7648 Setting to prevent TUI scrolling when new message are streamed-in](https://github.com/anomalyco/opencode/issues/7648)** — CLOSED | 评论 13 | 👍 26。用户希望在 TUI 流式输出时保留阅读位置，避免被自动滚动打断。社区高赞，已关闭，是今日最受关注的交互体验议题。
- **[#52269 Intermittent OpenAI Service Unavailable: upstream connection failure across models and sessions](https://github.com/anomalyco/opencode/issues/52269)** — OPEN | 评论 13 | 👍 2。OpenAI Provider 间歇性报 `Service Unavailable`，跨模型、跨会话复现，自动重试后部分成功。影响核心使用稳定性，讨论热度高。
- **[#54370 provider: legacy V1 provider.opencode-go block silently dropped in v2 breaks Go credentials](https://github.com/anomalyco/opencode/issues/54370)** — OPEN | 评论 7。升级到 v2 后，旧版 V1 格式的 `provider.<id>` 块被静默丢弃，导致 OpenCode Go 凭据失效。这是典型的升级兼容性回归。
- **[#54352 execute: compressor mints ccr pointers to never-persisted payloads - large tool results destroyed](https://github.com/anomalyco/opencode/issues/54352)** — OPEN | `[triaging]` | 评论 7。工具结果压缩器生成 `<<ccr:...>>` 指针，但对应 payload 未持久化，模型完全丢失大工具结果。属于破坏性数据丢失问题。
- **[#54109 Bug: Custom provider definitions in opencode.json are ignored (local Ollama provider cannot load)](https://github.com/anomalyco/opencode/issues/54109)** — OPEN | 评论 6。`opencode.json` 中的自定义 Provider 配置被完全忽略，本地 Ollama 无法加载。直接影响本地模型用户。
- **[#54400 tools: agents fall back to bash/powershell for read/write because read loses indentation and edit requires exact byte match](https://github.com/anomalyco/opencode/issues/54400)** — OPEN | `[triaging]` | 评论 5。`read` 丢失缩进、`edit` 要求字节级精确匹配，迫使 Agent 回退到 shell 读写。核心工具可靠性问题。
- **[#53828 Amazon Bedrock: a single tool name >64 chars rejects the entire Converse toolConfig](https://github.com/anomalyco/opencode/issues/53828)** — CLOSED | `[triaging]` | 评论 4。Bedrock Converse API 限制工具名 ≤64 字符，任一超长会导致整个请求被拒绝，并静默丢弃 MCP 工具/子代理。平台兼容性硬伤。
- **[#54217 desktop: tray icon missing on Windows, no way to fully quit from UI](https://github.com/anomalyco/opencode/issues/54217)** — CLOSED | `[pending close, triaging]` | 评论 4。Windows 桌面端缺少系统托盘图标，无法从 UI 完全退出。桌面端基础体验问题。
- **[#54205 mcp: remote server {env:...} header credentials resolve empty until service restart](https://github.com/anomalyco/opencode/issues/54205)** — CLOSED | `[pending close, triaging]` | 评论 4。远程 MCP 使用 `{env:VAR}` 时凭据解析为空，且全局配置被永久缓存，需重启服务。MCP 集成可靠性问题。
- **[#54401 session: title generation request has no output limit and runs away on local thinking models](https://github.com/anomalyco/opencode/issues/54401)** — OPEN | `[reproduced]` | 评论 1。会话标题生成请求没有 `max_completion_tokens` 限制，本地思考模型会进入无界推理循环。性能与成本隐患。

## 重要 PR 进展

- **[#54353 fix(core): map imported message-ID collisions to a 409 conflict](https://github.com/anomalyco/opencode/pull/54353)** — OPEN。修复 `session import` 在消息 ID 冲突时返回 HTTP 500 空响应的问题，改为返回 409 冲突，闭合 #54336。
- **[#54402 feat(tui): report hierarchical OSC 7501 program status](https://github.com/anomalyco/opencode/pull/54402)** — OPEN。在 TUI 中实现 OSC 7501 程序状态报告，对应 Issue #54179，改善终端集成与状态展示。
- **[#54394 feat(acp): support _session/steering](https://github.com/anomalyco/opencode/pull/54394)** — OPEN。为 ACP 增加 `_session/steering` 支持，作为 ACP v2 之前的过渡方案，闭合 #53042。
- **[#54210 fix(core): follow models.dev packages for Copilot fallback routing](https://github.com/anomalyco/opencode/pull/54210)** — CLOSED。修复 Copilot `GET /models` 失败时的回退路由，避免 Claude 被错误路由到 `/chat/completions`。
- **[#54278 fix(config): keep frontmatter values that start with an unquoted flow indicator](https://github.com/anomalyco/opencode/pull/54278)** — OPEN | `[needs:compliance]`。修复 Agent Markdown frontmatter 中未加引号的 flow indicator 值被误解析的问题，对应 #54200。
- **[#37902 fix(acp): child/subagent session permission requests no longer hang forever](https://github.com/anomalyco/opencode/pull/37902)** — CLOSED。修复 `task` 工具创建的子会话权限请求永久挂起的问题，对应 #12133。
- **[#54403 fix(core): make session interrupt faster and steer idempotent](https://github.com/anomalyco/opencode/pull/54403)** — CLOSED。加快会话中断，并让 steering 消息幂等，解决服务繁忙时停止慢、消息卡住的问题。
- **[#54093 fix(core): rebase directory watcher events across symlinked roots](https://github.com/anomalyco/opencode/pull/54093)** — OPEN。修复 macOS 符号链接根目录下目录监视事件路径不一致的问题。
- **[#54090 fix(core): drop undefined permission metadata values before publishing requests](https://github.com/anomalyco/opencode/pull/54090)** — OPEN。修复 `glob` / `grep` 权限请求中可选输入未提供时导致 HTTP 400 schema 拒绝的问题。
- **[#51482 fix(core): support AI SDK v4 media inputs](https://github.com/anomalyco/opencode/pull/51482)** — OPEN。支持 AI SDK v4 媒体输入，修复工具图片被序列化为 null 的问题。

## 功能需求趋势

- **TUI 与终端体验**：滚动控制、垂直标签、OSC 7501 状态协议、工具调用显示模式。相关需求：[#7648](https://github.com/anomalyco/opencode/issues/7648)、[#54216](https://github.com/anomalyco/opencode/issues/54216)、[#54179](https://github.com/anomalyco/opencode/issues/54179)、[PR #48300](https://github.com/anomalyco/opencode/pull/48300)。
- **桌面端与 Web UI**：Windows 托盘与退出、帮助菜单、Agent 选择菜单溢出、Web fork 支持完整会话。相关需求：[#54217](https://github.com/anomalyco/opencode/issues/54217)、[#54264](https://github.com/anomalyco/opencode/issues/54264)、[#54374](https://github.com/anomalyco/opencode/issues/54374)、[#54406](https://github.com/anomalyco/opencode/issues/54406)。
- **Provider / 模型兼容**：OpenAI 间歇故障、Bedrock 工具名限制、Copilot 输出 cap、v2 Go 凭据、自定义 Ollama、AI SDK v4 媒体输入。相关需求：[#52269](https://github.com/anomalyco/opencode/issues/52269)、[#53828](https://github.com/anomalyco/opencode/issues/53828)、[#54269](https://github.com/anomalyco/opencode/issues/54269)、[#54370](https://github.com/anomalyco/opencode/issues/54370)、[#54109](https://github.com/anomalyco/opencode/issues/54109)、[PR #51482](https://github.com/anomalyco/opencode/pull/51482)。
- **本地模型支持**：Ollama 自定义 Provider 加载、本地思考模型标题生成失控。相关需求：[#54109](https://github.com/anomalyco/opencode/issues/54109)、[#54401](https://github.com/anomalyco/opencode/issues/54401)。
- **成本与性能**：prompt cache 被 revert 破坏、标题生成无输出限制、会话中断慢。相关需求：[#54408](https://github.com/anomalyco/opencode/issues/54408)、[#54401](https://github.com/anomalyco/opencode/issues/54401)、[PR #54403](https://github.com/anomalyco/opencode/pull/54403)。
- **工具可靠性**：read/edit 精度问题、压缩破坏大工具结果、并行失败错误报告。相关需求：[#54400](https://github.com/anomalyco/opencode/issues/54400)、[#54352](https://github.com/anomalyco/opencode/issues/54352)、[#54203](https://github.com/anomalyco/opencode/issues/54203)。
- **MCP 与集成**：MCP 环境变量凭据为空、Bedrock 工具名超限导致 MCP 工具被丢弃。相关需求：[#54205](https://github.com/anomalyco/opencode/issues/54205)、[#53828](https://github.com/anomalyco/opencode/issues/53828)。

## 开发者关注点

- **v2 升级兼容性**：旧 V1 Provider 配置被静默丢弃，导致 Go 凭据失效；自定义 Provider 被忽略。开发者需要更平滑的迁移和显式告警。参考：[#54370](https://github.com/anomalyco/opencode/issues/54370)、[#54109](https://github.com/anomalyco/opencode/issues/54109)。
- **核心工具可靠性**：`read` 丢失缩进、`edit` 要求字节精确，迫使 Agent 用 bash/powershell 绕过，削弱安全性和可审计性；压缩器还会破坏大工具结果。参考：[#54400](https://github.com/anomalyco/opencode/issues/54400)、[#54352](https://github.com/anomalyco/opencode/issues/54352)。
- **Provider 稳定性**：OpenAI 上游间歇性不可用；Bedrock 单个工具名超 64 字符导致整个请求失败；Copilot Opus 5.5 思考占满输出 cap 后无回答。参考：[#52269](https://github.com/anomalyco/opencode/issues/52269)、[#53828](https://github.com/anomalyco/opencode/issues/53828)、[#54269](https://github.com/anomalyco/opencode/issues/54269)。
- **配置与凭据管理**：MCP 环境变量凭据解析为空且全局配置永久缓存；frontmatter 未加引号的 flow indicator 被误解析。参考：[#54205](https://github.com/anomalyco/opencode/issues/54205)、[PR #54278](https://github.com/anomalyco/opencode/pull/54278)。
- **性能与成本**：committed revert 重置指令基线并破坏整个对话的 prompt cache；标题生成无输出限制在本地思考模型上失控；会话中断在服务繁忙时较慢。参考：[#54408](https://github.com/anomalyco/opencode/issues/54408)、[#54401](https://github.com/anomalyco/opencode/issues/54401)、[PR #54403](https://github.com/anomalyco/opencode/pull/54403)。
- **桌面端体验**：Windows 托盘图标缺失、无法完全退出；CLI 在 Windows 无响应；Agent 选择菜单溢出窗口。参考：[#54217](https://github.com/anomalyco/opencode/issues/54217)、[#54213](https://github.com/anomalyco/opencode/issues/54213)、[#54374](https://github.com/anomalyco/opencode/issues/54374)。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报（2026-10-11）

数据来源：`github.com/NousResearch/hermes-agent`。以下基于过去 24 小时有更新的 Issue / PR / Release 数据整理；部分条目创建时间更早，但在今日有活动。

## 1. 今日速览

今日无新 Release。Issue 侧集中暴露跨平台安装、上下文压缩和会话恢复问题，尤其 Termux/Android 与 Windows 多安装场景较突出。PR 侧，“One gateway”跨端会话统一架构和 CLI Ownership 重构继续推进，同时插件目录更新非常活跃，桌面插件生态继续扩张。

## 2. 版本发布

无新版本发布。

## 3. 社区热点 Issues

过去 24 小时更新 Issue 共 9 条，以下全部纳入。整体看，P2 安装/兼容性和上下文压缩问题最值得警惕。

1. [\#135440](https://github.com/NousResearch/hermes-agent/issues/135440) **uv lock 在 managed-env resync 时未排除 Android，破坏 google-meet / playwright 解析**  
   标签：`type/bug`、`comp/cli`、`P2`、`python:uv`、`area/install-update`。  
   为什么重要：managed-env 的 `environments` marker 只限制 Python 版本，未排除 Android，导致 Playwright/google-meet 依赖解析失败。对 Termux/Android 及 uv 托管环境用户影响直接。社区反应：2 条评论、0 👍，仍在排查。

2. [\#136340](https://github.com/NousResearch/hermes-agent/issues/136340) **server_error 自动续跑后 Goal 仍保持暂停，即使会话已恢复工作**  
   标签：`type/bug`、`comp/agent`、`P2`、`comp/desktop`、`area/sessions`。  
   为什么重要：长时间目标在 provider 短暂 502 后自动恢复，但目标状态未恢复，影响 Agent 可靠性。社区反应：2 条评论、0 👍。

3. [\#132150](https://github.com/NousResearch/hermes-agent/issues/132150) **Termux/bionic 下 uv sync 跳过 libpython 链接修复，新 generation 无法导入；`hermes pm repair` 还会丢弃刚构建的 generation**  
   标签：`type/bug`、`comp/cli`、`P2`、`area/install-update`。  
   为什么重要：Android/Termux 安装修复链路存在严重缺陷，属于跨平台可用性问题。社区反应：1 条评论、0 👍。

4. [\#136349](https://github.com/NousResearch/hermes-agent/issues/136349) **压缩标记泄漏到 Agent 写入的文件中，造成数据损坏**  
   标签：无显式标签，但描述为数据损坏。  
   为什么重要：上下文压缩后的截断标记 `⟪HERMES-CONTEXT-COMPRESSION...` 被原样写入文件，属于输出污染/数据完整性问题。暂无评论。

5. [\#136350](https://github.com/NousResearch/hermes-agent/issues/136350) **`compression.threshold_tokens` 实际解析为 256000，而文档称默认 `null`**  
   为什么重要：1M token 主模型下，本应按 0.5 阈值在约 512k 触发压缩，实际在 256k 触发，导致长会话频繁压缩、丢失实时上下文。报告称 77 分钟会话压缩 7–8 次。暂无评论。

6. [\#136351](https://github.com/NousResearch/hermes-agent/issues/136351) **文档对默认 turn cap 自相矛盾**  
   为什么重要：同一配置页同时写“默认 500 turns”和“`agent.max_turns` 默认 unlimited”，会误导用户对迭代预算的预期。暂无评论。

7. [\#136348](https://github.com/NousResearch/hermes-agent/issues/136348) **Termux 下 `pm doctor` 因 `KeyError 'sha256'` 崩溃**  
   标签：`type/bug`、`comp/cli`、`P2`、`area/install-update`。  
   为什么重要：Termux bionic artifact 缺少 `sha256` 字段，直接导致诊断命令崩溃，阻碍安装修复。暂无评论。

8. [\#136346](https://github.com/NousResearch/hermes-agent/issues/136346) **Windows 下 `stdio.py` 将默认安装的 `venv\Scripts` 前置到 PATH，子进程 `hermes` 跑到另一个安装**  
   标签：`type/bug`、`comp/cli`、`P2`、`platform/windows`、`area/profiles`。  
   为什么重要：多安装/共享 profile 场景会出现 PATH 污染和警告循环，影响 Windows 用户体验。暂无评论。

9. [\#136344](https://github.com/NousResearch/hermes-agent/issues/136344) **Desktop 文件编辑器缺少长行软换行/换行开关**  
   标签：`type/feature`、`P3`、`comp/desktop`。  
   为什么重要：Markdown 等长段落文件在桌面编辑器中横向溢出，阅读和编辑体验差。暂无评论，属于体验型需求。

## 4. 重要 PR 进展

从过去 24 小时更新的 50 条 PR 中挑选 10 条，覆盖架构、性能、安全、平台修复和插件生态。

1. [\#106742](https://github.com/NousResearch/hermes-agent/pull/106742) **One gateway owns every local session**  
   架构级 PR：CLI、TUI、Desktop、API、ACP、bots、cron 都接入同一个 gateway 拥有的本地会话，而不是各自在 `state.db` 上跑 agent。标签包含大量组件与 `needs-decision`，是跨端会话统一的核心方向。

2. [\#128791](https://github.com/NousResearch/hermes-agent/pull/128791) **CLI Ownership Refactor — Phase 4: Plugin runtime ownership**  
   大型重构，当前已合并到 One Gateway checkpoint 上，推进插件运行时所有权调整。涉及 agent、CLI、gateway、tools、TUI、ACP、cron、plugins 等多模块。

3. [\#136142](https://github.com/NousResearch/hermes-agent/pull/136142) **fix(anthropic): route API key families through x-api-key, not OAuth**  
   修复 Anthropic API key 被误判为 OAuth/setup token，导致有效用户级 API key 走 Bearer/Claude Code 路径并出现误导性计费错误。认证与安全边界相关。

4. [\#133834](https://github.com/NousResearch/hermes-agent/pull/133834) **fix(gateway): keep async-delegation ledger writes off the event loop**  
   将异步委托 watcher 的 SQLite 写入移出 gateway 事件循环，避免大 WAL 数据库下频繁 open/commit/close 阻塞事件循环。性能与消息投递可靠性相关。

5. [\#136352](https://github.com/NousResearch/hermes-agent/pull/136352) **fix(cli): prepend the running install's venv Scripts to PATH, not the default install's**  
   直接对应 Issue [\#136346](https://github.com/NousResearch/hermes-agent/issues/136346)。修复 Windows 下 PATH 总是前置默认安装路径的问题，避免子进程 `hermes` 跑错安装。

6. [\#136347](https://github.com/NousResearch/hermes-agent/pull/136347) **fix(desktop): harden preview actions and redact passwords**  
   桌面预览安全加固：仅在前后 URL 均存在且不同时才认为点击成功；从预览 inventory 和 fallback labels 中脱敏密码输入值。涉及桌面端安全与隐私。

7. [\#136353](https://github.com/NousResearch/hermes-agent/pull/136353) **fix(agent): record ad-hoc evidence when workspace contains temp dir**  
   修复 verify-on-stop 的 ad-hoc evidence fallback：当配置的 OS temp 目录是宽 workspace root 的严格子目录时，分类器应正确记录临时验证证据。

8. [\#136032](https://github.com/NousResearch/hermes-agent/pull/136032) **fix(plugin-catalog): bump web-search-plus to 5.0.1**  
   已将 `web-search-plus` 从 4.3.5 直升 5.0.1，跳过未 pin 的 5.0.0。用户可获得按查询类型路由、更快 fallback 等更新。状态：CLOSED。

9. [\#135380](https://github.com/NousResearch/hermes-agent/pull/135380) **chore(plugin-catalog): add Telegram Client (v1.2.14)**  
   新增 Telegram 桌面插件目录条目：基于 Telethon 用户会话的 Telegram 客户端面板。反映桌面插件生态继续扩展。

10. [\#133775](https://github.com/NousResearch/hermes-agent/pull/133775) **catalog: add cognition standalone memory provider**  
    通过插件目录引入 `cognition` 独立记忆提供者，避免走已关闭的 in-tree `plugins/memory/` 路径。对记忆能力扩展和插件目录治理都有意义。

其他值得关注的插件目录更新还包括：VoiceStudio TTS、browser-toggle、Windows taskbar badge、Gmail、field-notes、agora、意大利语言包等，插件生态更新密度很高。

## 5. 功能需求趋势

从 Issues 与 PR 看，社区关注方向集中在以下几条：

- **跨平台安装与运行可靠性**：Termux/Android、bionic、Windows 多安装、uv managed-env、`pm doctor`、PATH 污染等问题反复出现。
- **上下文压缩与上下文完整性**：阈值解析、过度压缩、压缩标记污染文件，说明长会话上下文管理是核心质量区。
- **会话恢复与状态一致性**：provider 短暂 502 后 Goal 仍暂停，跨端会话统一架构也在推进，说明状态机可靠性是关键。
- **桌面端体验与安全**：文件编辑器软换行、预览点击判定、密码脱敏、Telegram/browser-toggle/taskbar badge 等桌面插件需求活跃。
- **插件生态与目录化**：大量 PR 围绕 plugin-catalog 做新增、升版和重新 pin，覆盖搜索、Gmail、TTS、记忆、语言包、Discord 等。
- **文档与默认值一致性**：turn cap、compression threshold 等文档与运行时行为不一致，容易造成配置误判。
- **认证与安全边界**：Anthropic API key 路由、桌面密码脱敏等，显示安全相关修复开始进入高优先级视野。

## 6. 开发者关注点

开发者反馈中的主要痛点和高频需求：

- **平台兼容性仍是最大痛点**：Termux/Android 与 Windows 相关问题集中，且多与安装、PATH、pm 工具有关。
- **上下文压缩必须可预测且不能污染输出**：阈值不按文档执行、压缩标记写入文件，都会直接影响 Agent 输出可信度。
- **会话状态需要在故障后可靠恢复**：server_error 自动恢复后 Goal 仍暂停，是长任务 Agent 的关键可靠性问题。
- **文档需与运行时默认值严格一致**：同一页面出现 500 turns 与 unlimited 矛盾，会降低配置信任度。
- **插件目录更新频繁，生态扩张快**：大量 catalog PR 带有 `ci-reviewed`，说明插件发布流程在运转，但也需要持续关注版本 pin、权限披露和兼容性。
- **桌面端编辑与预览安全需求上升**：软换行、密码脱敏、预览点击判定等，表明桌面端正从“能用”进入“好用且安全”的阶段。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报（2026-10-11）

> 数据来源：github.com/openclaw/openclaw

## 1. 今日速览

OpenClaw 发布 v2026.10.1，核心聚焦会话与记忆稳定性，覆盖 registry 变更、远程 worker 附件、排队取消、continuation signatures 与 embedding cache 迁移。社区侧，P1 级僵尸进程泄漏 Issue #97616 持续高热，18 条讨论，影响运行时稳定性。PR 侧，ChatGPT 登录会话服务端压缩、模型回退链修复、Gateway 运行时 API-key 设置等成为重点。

## 2. 版本发布

### v2026.10.1

- 重点方向：**Sessions and memory**
- 在 registry 变更期间保留 usage 数据
- 支持从远程 workspace 投递 worker attachments
- 防止排队取消与 transcript aliases 阻塞活跃 turns
- 保持 continuation signatures 对齐
- 迁移 embedding caches

链接：https://github.com/openclaw/openclaw/releases

## 3. 社区热点 Issues

1. **#97616 [P1] OpenClaw 泄漏未回收的 hook/tool 子进程，导致僵尸进程累积与运行时退化**
   - 重要原因：P1、回归问题，标记 `impact:message-loss`、`impact:crash-loop`，属于运行时稳定性核心故障。
   - 社区反应：18 条评论、1 个赞，是过去 24 小时内讨论最集中的 Issue。
   - https://github.com/openclaw/openclaw/issues/97616

2. **#130249 [P2] 异步 exec 完成结果缺少上下文，可能落入非发起命令的 session**
   - 重要原因：影响 `session-state` 与 `message-loss`，从请求线程外批准 pending exec 时触发，跨 Mattermost、Telegram 等通道。
   - 社区反应：3 条评论，已标记需要 maintainer review 与 live repro。
   - https://github.com/openclaw/openclaw/issues/130249

3. **#163581 [P2] `session.dmScope: "main"` 绑定会关闭 `rememberAcrossConversations` 默认值并暂停记忆搜索**
   - 重要原因：配置语义耦合导致记忆能力被意外关闭，属于高影响行为 bug。
   - 社区反应：2 条评论，已有 source repro，标记需产品决策。
   - https://github.com/openclaw/openclaw/issues/163581

4. **#165649 [P2] 从可用共享容量中分配 Testboxes**
   - 重要原因：CI 基础设施瓶颈。5 个 Testbox 工作流共享 32 个并发组，高内存请求仅限 4 组，且按 Testbox ID 哈希固定选择，导致排队。
   - 社区反应：2 条评论，已有 source repro。
   - https://github.com/openclaw/openclaw/issues/165649

5. **#137299 [P2] exec 子进程不携带调用 agent 身份，scoped wrapper 只能把 agent 编码进路径**
   - 重要原因：安全边界与审计问题，影响多 agent 场景下的权限隔离。
   - 社区反应：1 条评论，标记 `impact:security`。
   - https://github.com/openclaw/openclaw/issues/137299

6. **#128924 [P3] Cron 投递失败告警在 fallback 路由上每次失败都触发，无阈值或冷却**
   - 重要原因：回归自 #128610，会造成通知风暴，影响运维体验。
   - 社区反应：1 条评论，已有 source repro。
   - https://github.com/openclaw/openclaw/issues/128924

7. **#168744 [P3] `agent exec` 使用本地 Ollama 在工具目录后超时，直接/网关推理正常**
   - 重要原因：本地模型与工具调用链集成问题，直接影响自托管/本地推理用户。
   - 社区反应：1 条评论，2026.9.5 上可复现。
   - https://github.com/openclaw/openclaw/issues/168744

8. **#168743 [Bug] macOS Control UI 在 native-auth 拒绝后每 12–16 秒重连，无尝试上限**
   - 重要原因：4008 关闭在一周内记录 14,243 次，形成 warn 日志风暴，影响可观测性与资源占用。
   - 社区反应：1 条评论。
   - https://github.com/openclaw/openclaw/issues/168743

9. **#168742 [Feature] “node command surface withheld” 每个 node 和 withheld 集合只记录一次**
   - 重要原因：减少重复 warn，重复内容降为 debug，属于日志降噪与运维体验改进。
   - 社区反应：1 条评论，标记 `fix-shape-clear`、`queueable-fix`。
   - https://github.com/openclaw/openclaw/issues/168742

10. **#53345 [Feature] 为 Control UI 和 AI agent 增加韩语支持**
    - 重要原因：多语言本地化需求，当前 Control UI 缺少韩语界面，AI 回复语言一致性也未强制。
    - 社区反应：1 条评论、1 个赞。
    - https://github.com/openclaw/openclaw/issues/53345

## 4. 重要 PR 进展

1. **#168401 feat(agents): 服务端压缩 ChatGPT 登录会话（remote compaction V2）**
   - 内容：关闭 #168088。当前 ChatGPT 登录路径的自动压缩在客户端进行，产生无缓存 token 的摘要请求，并用有损文本摘要替代对话；该 PR 改为服务端压缩。
   - 影响：XL 规模，标记兼容性风险，涉及 agents 与文档。
   - https://github.com/openclaw/openclaw/pull/168401

2. **#167796 refactor(automations): 迁移周期 heartbeat 并退役 executor**
   - 内容：自动化架构重构，采用 #135933 已批准设计，是 #164265 的最终顺序切片。
   - 影响：XL 规模，覆盖大量通道、扩展、网关与 CLI，属于长期架构收敛。
   - https://github.com/openclaw/openclaw/pull/167796

3. **#141869 fix: 主模型超时导致配置的模型 fallback 被跳过**
   - 内容：修复运营商配置 fallback 后，主模型超时却没有任何回复的问题；回退链从未走过第一跳。
   - 影响：P2，影响模型路由可靠性。
   - https://github.com/openclaw/openclaw/pull/141869

4. **#168588 fix(models): 允许 Gateway 运行时进行 API-key 设置**
   - 内容：修复 CLI 在运行中的 Gateway 拥有本地状态时无法设置 API-key 的问题。用户可运行 `openclaw models auth paste-api-key --provider <id>` 而无需停止 Gateway。
   - 影响：P2，涉及 web-ui、gateway、cli、commands、agents。
   - https://github.com/openclaw/openclaw/pull/168588

5. **#168680 fix: 机器 join 命令匹配 Gateway release**
   - 内容：修复设备注册静默运行旧缓存 npm release 的问题；`devices join-code` 和 Control UI 现在建议 Gateway 发布的 npm 版本。
   - 影响：P2，涉及 web-ui、gateway、cli。
   - https://github.com/openclaw/openclaw/pull/168680

6. **#168728 fix: Claude Code CLI 选择使用原生模型**
   - 内容：修复 Claude CLI 选择来自静态模型列表，而非当前 Claude Code 账户和组织允许的模型菜单。
   - 影响：P2，标记安全敏感变更，涉及 anthropic 扩展。
   - https://github.com/openclaw/openclaw/pull/168728

7. **#168738 fix(telegram): 模糊网络失败后重投已保存的最终文本**
   - 内容：修复 Telegram 最终答案在模糊网络失败后被投递警告替换的问题；已保存的普通文本或富文本最终答案可自动重投一次。
   - 影响：通道投递可靠性。
   - https://github.com/openclaw/openclaw/pull/168738

8. **#168679 fix(skills): 后台技能评审限制为每 10 次模型迭代后运行**
   - 内容：修复持续使用已学习技能的对话中，几乎每轮都触发 Skill Workshop 评审和“💾 Learned”通知的问题。
   - 影响：P2，改善技能学习体验与通知噪音。
   - https://github.com/openclaw/openclaw/pull/168679

9. **#138087 fix(context): 在 budgets 和 prewarming 中保留已接受限制**
   - 内容：防止未知模型估算约束共享预算解析、CLI 准备和 Gateway 缓存预热中的已接受上下文限制。
   - 影响：P2，涉及 gateway、agents，影响上下文预算准确性。
   - https://github.com/openclaw/openclaw/pull/138087

10. **#168745 fix(context): 按 runtime 和 account 限定保存的容量**
    - 内容：修复保存的上下文容量在账户或模型/runtime 切换后仍然存活，以及成功运行缺少上下文元数据时容量丢失的问题。
    - 影响：涉及 scripts、commands、agents，改善 session 容量准确性。
    - https://github.com/openclaw/openclaw/pull/168745

## 5. 功能需求趋势

- **会话状态与记忆一致性**：异步 exec 跨 session 错投（#130249）、`dmScope` 影响记忆搜索（#163581）、上下文容量与压缩（#168401、#138087、#168745）集中出现，说明社区对 session 隔离、记忆保留和上下文预算非常敏感。
- **本地模型与工具执行集成**：本地 Ollama 在 `agent exec` 工具目录后超时（#168744），反映自托管用户需要更可靠的本地推理与工具调用链。
- **运行时健康与日志降噪**：僵尸进程泄漏（#97616）、macOS Control UI 高频重连（#168743）、node withheld 日志重复（#168742）、cron 告警无冷却（#128924）共同指向资源生命周期与可观测性治理。
- **安全与身份传播**：exec 子进程缺少调用 agent 身份（#137299），多 agent 权限隔离与审计需求上升。
- **通道能力与投递可靠性**：Telegram 媒体下载（#99055）、Telegram 最终文本重投（PR #168738）、WhatsApp 登录参数校验（PR #158719）显示通道能力仍在补齐。
- **多语言与个性化**：韩语支持（#53345）、macOS Talk Mode 使用 assistant avatar（#70266）代表 UI 本地化与助手身份一致性需求。
- **CI/测试基础设施**：Testbox 共享容量分配（#165649）说明大规模测试并发调度已成为开发效率瓶颈。

## 6. 开发者关注点

- **资源生命周期管理**：子进程回收、数据库显式关闭后重建、Gateway 状态与 CLI 操作冲突，是稳定性问题的共同根源。
- **异步与并发上下文传播**：异步命令完成、排队取消、session 绑定需要携带足够上下文，否则容易造成消息错投或 session 状态污染。
- **配置默认值的隐式耦合**：`session.dmScope: "main"` 意外关闭记忆搜索，说明配置项之间需要更清晰的优先级和文档说明。
- **模型路由与回退可靠性**：主模型超时后 fallback 不生效、Claude/Copilot 模型菜单与上下文限制不准确，是模型接入层的高频痛点。
- **告警与日志噪音**：无冷却的失败告警、高频重连 warn、重复 withheld 日志，会淹没真正重要的信号。
- **本地/自托管体验**：Ollama 等本地推理与工具目录的兼容性仍需加强。
- **安全身份与审计**：exec 子进程应携带调用 agent 身份，避免依赖路径编码等绕过式方案。
- **多语言与 UI 一致性**：Control UI 本地化、AI 回复语言一致性、助手头像等个性化配置逐渐成为社区期待。

:::
