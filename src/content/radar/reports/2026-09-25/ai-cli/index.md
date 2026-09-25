---
title: "AI CLI 工具社区动态日报"
published: 2026-09-25
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-25

> 生成时间: 2026-09-25 00:00 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Deepseek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告（2026-09-25）

## 1. 生态全景

当前 AI CLI 工具正处于“高频发布、快速迭代”的爆发期，主要项目日均发布多个版本，社区讨论活跃。但伴随功能扩张，稳定性问题集中暴露：数据静默丢失、会话状态误报、安全脱敏绕过等成为多工具共性问题，开发者对“假成功”式反馈的容忍度降至低点。与此同时，MCP 协议完善、上下文/记忆透明化、子代理可靠性与沙箱安全加固正在成为跨工具的研发主线。整体态势从“能用”转向“可信、可观测、可治理”，多 Agent 协作与云会话场景开始定义新一代工具的核心竞争力。

## 2. 各工具活跃度对比

| 工具 | 24h 活跃 Issues | 24h PRs | Releases |
|------|----------------|---------|----------|
| Claude Code | 10 个热点 | 5 个（均关闭） | v2.1.282 |
| OpenAI Codex | 10 个热点 | 10 个（均关闭） | 6 个 Rust alpha（v0.158.0-alpha.7~11 + 补丁） |
| Gemini CLI | 10 个热点 | 10 个（稳定性修复为主） | v0.62.0-nightly.20260924 |
| DeepSeek Reasonix | 10 个热点 | 10 个 | v1.39.0 + Studio v2.20.0 |
| OpenCode | 5 个热点 | 10 个代表性 | 无 |
| Deepseek Harness | 0 | 0 | dsh-v0.1.7-rc.2 |
| Hermes | 10 个热点 | 10 个 | v0.21.5 |

注：Issues/PR 数为各工具日报中列出的“热点/代表性”数量，实际增量可能更大。OpenAI Codex 的 PR 均来自自动机器人，Deepseek Harness 当日无社区动态。

## 3. 共同关注的功能方向

- **上下文与记忆管理透明化**  
  - Claude Code：MEMORY.md 索引加载状态不可感知（#82056）  
  - Gemini CLI：Auto Memory 需确定性脱敏（#26525）、低信号会话重试（#26522）  
  - OpenCode：小窗口模型频繁自动压缩（#51021、#51238）  
  - Hermes：记忆同步绕过密钥脱敏（#115104）  
  - 核心诉求：让用户明确记忆是否完整加载、防止记忆污染、优化 token 成本。

- **MCP 生态标准化与安全**  
  - Claude Code：MCP 服务器无法区分并发会话（#41836）  
  - Gemini CLI：MCP OAuth 流程 iss 校验修复（#29488）  
  - DeepSeek Reasonix：Studio 支持 MCP 常驻加载  
  - Hermes：MCP 信任门“always”选择不持久化（#109818）  
  - 核心诉求：会话标识传递、持久化授权、协议一致性。

- **子代理/工具执行可靠性**  
  - Gemini CLI：MAX_TURNS 误报成功（#22323）、generalist agent 挂起（#21409）  
  - DeepSeek Reasonix：AI 思考无限循环（#10532）  
  - OpenCode：工具执行前护栏与 OpenTelemetry（#51230）  
  - Hermes：enabled_toolsets 未在分派时强制（#121934）  
  - 核心诉求：拒绝“假成功”，提供明确失败状态与干预手段。

- **数据一致性与静默失败防治**  
  - Claude Code：Cowork 文件回写落后（#93482、#96187）、工作树回收摧毁会话（#77268）  
  - DeepSeek Reasonix：v5 迁移后工作区只读（#10509）、历史会话消失（#10665）  
  - Hermes：write_file/patch 清空目标文件（#122012）  
  - OpenCode：权限拒绝原因不透明（#51083）  
  - 核心诉求：真实落盘、可回滚、错误信息可操作。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|----------|
| **Claude Code** | 企业级多 Agent 协作、云会话（Cowork）、工作树管理 | 团队开发者、DevOps | 闭源商业，与 Anthropic 模型深度集成，强调协作安全 |
| **OpenAI Codex** | 跨平台全栈体验（CLI/桌面/IDE）、沙箱隔离、远程会话 | 全栈开发者、Pro 订阅用户 | Rust 核心，高频 alpha 迭代，侧重稳定性与原生性能 |
| **Gemini CLI** | 自主 Agent（Browser/Subagent）、Auto Memory、AST 感知探索 | 探索型开发者、Google 生态用户 | 依托 Gemini 模型原生能力，开源，实验性较强 |
| **DeepSeek Reasonix** | 多端覆盖（CLI/Desktop/Studio）、技能路由、模型配额处理 | 对价格敏感的开源社区、Windows 用户 | 开源，活跃于新功能（扫码配对、MCP 常驻），但稳定性受迁移问题拖累 |
| **OpenCode** | 轻量 TUI、插件系统、权限护栏、上下文窗口精细调优 | 终端极客、插件开发者 | 开源，插件化架构，社区规模小但技术讨论深入 |
| **Deepseek Harness** | 定时任务、快捷键管理、新手引导 | 轻度 CLI 用户 | 早期阶段，功能基础，社区关注度低 |
| **Hermes** | 可自托管通用 Agent 框架、插件/技能生态、多后端支持 | 高级开发者、自托管用户 | 开源，大规模插件聚合（约 460 PR），强调安全脱敏与可扩展性 |

## 5. 社区热度与成熟度

- **第一梯队（高热度、高成熟度）**：Claude Code、OpenAI Codex、Gemini CLI。三者均拥有大量深度讨论（如 Codex #20214 达 112 评论）、高频版本发布，社区用户基数大，反馈闭环成熟。
- **活跃但信任波动**：DeepSeek Reasonix、Hermes。Reasonix 因 v1.38.x 系列数据丢失引发集体抗议，但 Issue/PR 密度高，仍处于快速迭代期；Hermes 聚合 460 个 PR 发布补丁，开发活跃，但多数 Issue 为 P3，平台一致性待提升。
- **小众聚焦**：OpenCode。Issue 量少但全部与核心痛点（配置、上下文、权限）相关，社区讨论质量高，处于精细化打磨阶段。
- **早期/平静**：Deepseek Harness。当日无新增 Issue/PR，仅发布 RC 版本，社区仍处于萌芽期。

## 6. 值得关注的趋势信号

1. **“假成功”正成为信任杀手**  
   Claude Code 的静默陈旧写入、Gemini CLI 的 MAX_TURNS 误报、DeepSeek Reasonix 的“永久只读”等，均以“成功反馈+实际异常”的方式打击用户信任。未来工具必须提供可验证的操作结果与状态回传，这是从“辅助工具”升级为“可信基础设施”的底线。

2. **多 Agent 协作的隔离与归属需求爆发**  
   工作树回收、并发会话文件干扰、云端/本地数据一致性等问题说明多 Agent 并行已是主流使用方式。开发者期望更严格的资源隔离、变更归因和事务性文件操作，成熟度高的工具将率先建立标准化沙箱与写回协议。

3. **安全脱敏必须嵌入数据全链路**  
   密钥泄漏已不仅发生在终端输出，还出现在记忆同步、代码执行溢出文件、外部 provider 传输等环节（Hermes 连续两起）。安全设计需要从“出口检查”转向“传输前脱敏”与“存储加密”，这对所有 AI 工具都是一票否决项。

4. **上下文窗口自适应将是刚需**  
   OpenCode 将压缩阈值改为动态百分比、Claude Code 增加散文宽度限制，反映出模型窗口差异对用户体验的直接影响。开发者希望工具能根据模型能力自动调整输出预算、压缩策略和渲染方式，以降低 token 成本与操作噪音。

5. **稳定版本机制与回退通道需求上升**  
   DeepSeek Reasonix 用户公开呼吁“推荐 bug 少的稳定版本”，Codex 高频 alpha 也让部分用户困惑。在快速迭代已成常态的背景下，提供 LTS 版本、已知问题清单、一键回滚路径，是维系社区耐心的关键举措。

---

*本报告基于 2026-09-25 各工具 GitHub 公开社区动态自动生成，数据来源已标注于原始日报。*

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-09-25）

> 说明：PR 列表按评论数排序，但原始数据未展示具体 PR 评论数，以下以排序位置和更新活跃度作为关注度参考。

## 1. 热门 Skills 排行

1. **skill-creator 修复** ([#1298](https://github.com/anthropics/skills/pull/1298))  
   修复 Skill 创建器在触发评估中的误报/漏报问题，并处理 Windows 兼容性与运行时失败。社区关注点集中在 Skill 自动化评估的可靠性。状态：Open。

2. **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771))  
   面向 Web3 的 Solidity/Rust 智能合约静态审计 Skill，并将审计证明锚定到 TON 区块链。社区讨论热点是区块链场景下的自动化审计与可验证性。状态：Open。

3. **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742))  
   适配 `mcp>=2.0.0` 的 `streamable_http_client` 导入变更，并支持自定义 HTTP Headers。社区关注 MCP 工具链版本兼容性。状态：Open。

4. **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703))  
   将 Markdown 文档直接编译为带人声旁白的 MP4 视频，定位为零成本内容视频化方案。社区关注文档到视频的自动化生产链路。状态：Open。

5. **Orphaned docx comments 检测** ([#1734](https://github.com/anthropics/skills/pull/1734))  
   检测 DOCX 文件中孤立评论的问题，属于文档处理健壮性方向。状态：Open。

6. **Pyxel 复古游戏开发** ([#525](https://github.com/anthropics/skills/pull/525))  
   支持用 Python/Pyxel 创建、调试和验证复古游戏，包含无头输入驱动运行和帧级检查。PR 持续活跃时间较长，社区关注度高。状态：Open。

7. **document-typography** ([#514](https://github.com/anthropics/skills/pull/514))  
   针对 AI 生成文档的排版质量进行控制，解决孤行、寡段、编号错位等问题。社区关注生成文档的专业排版质量。状态：Open。

8. **scnet-hpc** ([#1615](https://github.com/anthropics/skills/pull/1615))  
   面向 SCNet HPC 集群的操作 Skill，基于 profile 化 SSH 和 Slurm 工作流，覆盖集群发现、作业生成、资源查询等。状态：Open。

---

## 2. 社区需求趋势

从 Issues 看，社区最集中的诉求已经不只是“新增某个 Skill”，而是 **Skills 生态的工程化与治理**：

- **安全与信任边界**  
  [#492](https://github.com/anthropics/skills/issues/492)（43 评论）指出社区 Skill 使用 `anthropic/` 命名空间会造成信任边界滥用，是当前最热议题。另有 [#1175](https://github.com/anthropics/skills/issues/1175) 关注 SharePoint Online 文档处理时的权限与上下文安全。

- **组织级共享与分发**  
  [#228](https://github.com/anthropics/skills/issues/228)（16 评论）希望支持组织内直接共享 Skill，而不是手动下载、传输、上传。  
  [#189](https://github.com/anthropics/skills/issues/189)（9 👍）则反映 `document-skills` 与 `example-skills` 插件内容重复，造成上下文窗口污染。

- **评估与触发可靠性**  
  [#556](https://github.com/anthropics/skills/issues/556)（12 评论，7 👍）指出 `run_eval.py` 在 `claude -p` 模式下触发率为 0%，是 Skill 自动化评估的核心障碍。  
  [#1390](https://github.com/anthropics/skills/issues/1390) 暴露 mcp-builder 评估器对真实 MCP Server 全部报错的问题。

- **上下文窗口效率**  
  [#1487](https://github.com/anthropics/skills/issues/1487) 指出 `claude-api` Skill 一次注入约 156k token，直接撑爆上下文窗口，代表社区对 Skill 资源开销的高度敏感。

- **新 Skill 方向提案**  
  社区仍在持续提出“元技能/治理类” Skill：如 [#412](https://github.com/anthropics/skills/issues/412) Agent 治理模式、[#1385](https://github.com/anthropics/skills/issues/1385) 推理质量门控流水线、[#1329](https://github.com/anthropics/skills/issues/1329) 紧凑符号化记忆表示。

---

## 3. 高潜力待合并 Skills

以下 Open PR 更新活跃、问题明确或功能完整，近期落地概率较高：

- **fix(docx): 将 LibreOffice 超时报告为错误并校验输出** ([#1792](https://github.com/anthropics/skills/pull/1792))  
  最近更新于 09-23，修复“超时却返回成功”的假阳性问题，属于文档可靠性关键修复。

- **新增 notion-spec-to-implementation 与 quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245))  
  最近更新于 09-24，将 Notion 产品/技术 Spec 转化为可执行任务，并提供量化简历审计能力，功能覆盖面广。

- **fix(mcp-builder): 支持 mcp>=2 streamable_http_client 与自定义 headers** ([#1742](https://github.com/anthropics/skills/pull/1742))  
  直接对应 Issue [#1668](https://github.com/anthropics/skills/issues/1668)，是 MCP 生态高频痛点，更新于 09-19。

- **fix(skill-creator): 隔离触发评估并支持 Windows** ([#1298](https://github.com/anthropics/skills/pull/1298))  
  属于 Skill 开发基础设施修复，更新于 09-16，影响面大。

- **新增 testing-patterns** ([#723](https://github.com/anthropics/skills/pull/723))  
  覆盖完整测试栈：Testing Trophy、单元测试、React 组件测试、E2E 与测试哲学，更新于 09-21，是社区高频需求方向。

- **Pyxel 复古游戏开发** ([#525](https://github.com/anthropics/skills/pull/525))  
  虽创建较早，但更新于 09-22，说明仍在持续迭代，具备合并潜力。

---

## 4. Skills 生态洞察

当前社区对 Skills 最集中的诉求，是把 Skills 从“能用”提升到“可信赖”：既要解决触发率、上下文膨胀、兼容性等工程稳定性问题，也要建立命名空间、权限与安全治理机制，同时通过组织级共享和质量评估类元技能让 Skills 可发现、可复用、可治理。

---

# Claude Code 社区动态日报（2026-09-25）

## 今日速览

- 发布 v2.1.282，新增 `maxProseWidth` 排版设置与遥测变量可见性提示。
- 社区热度集中在**自动记忆索引透明性**（#82056，55 条评论）与 **MCP 会话标识符缺失**（#41836，👍 37）两大议题上。
- 多条与 **Cowork/云会话数据一致性** 相关的数据丢失级 Bug 正在发酵（#93482、#96187、#77268）。

---

## 版本发布

**v2.1.282**（过去 24 小时内发布）

- 新增 `maxProseWidth` 设置：在宽终端中限制 Claude 散文输出宽度，表格与代码块保持全宽。
- 新增启动通知，并在 `/status` 与 `claude doctor` 中列出项目设置文件里被忽略的遥测变量。

---

## 社区热点 Issues

### 1. 会话无法确定自动记忆索引加载状态（55 条评论）
[#82056](https://github.com/anthropics/claude-code/issues/82056) · @shawnacason · 更新于 2026-09-24 · 👍 1

**讨论最热**：`MEMORY.md` 索引在会话中可能完整加载、截断或完全未加载，但会话本身无法感知。开发者希望对自动记忆的加载状态获得显式反馈，避免基于不完整记忆做出错误决策。评论中社区普遍支持增加会话内可见性。

### 2. MCP 服务器无法区分并发会话（17 条评论，👍 37）
[#41836](https://github.com/anthropics/claude-code/issues/41836) · @ben1787 · 更新于 2026-09-24 · 👍 37

**赞数最高**：HTTP MCP 服务器无法从请求中识别会话/对话 ID，导致无法维护服务端按会话隔离的状态。关注度极高，社区普遍认为这是 MCP 协议集成中的结构性缺口。

### 3. `.ignore` 不被文件选择器尊重（23 条评论）
[#30176](https://github.com/anthropics/claude-code/issues/30176) · @jboulter11 · 已关闭 · 👍 3

**回归 Bug**：文件选择器不遵守 `.ignore` 规则，导致本应排除的文件出现在选择列表中。虽已关闭，但 23 条评论表明该回归影响了大量依赖 gitignore 语义的开发流程。

### 4. Cowork：`device_commit_files` 静默陈旧写入（12 条评论）
[#93482](https://github.com/anthropics/claude-code/issues/93482) · @GBalunis · 更新于 2026-09-24

**数据丢失级**：Windows 上 `device_commit_files` 报告覆盖成功，但磁盘内容始终落后一个提交，形成"静默陈旧写入"。mtime 是新的，问题极难察觉。社区认为此类静默数据不一致比显式报错更具破坏性。

### 5. `totalTokensReminder` 导致提示缓存下限重复（7 条评论）
[#90018](https://github.com/anthropics/claude-code/issues/90018) · @DanLanEX · 更新于 2026-09-24 · 👍 2

**成本隐患**：默认的 token 提醒机制在工具循环中反复触发提示缓存重建，关闭后恢复正常增量命中。直接影响 API 成本与响应速度，开发者对缓存踩踏问题高度敏感。

### 6. 工作树回收摧毁活跃兄弟会话（6 条评论，👍 4）
[#77268](https://github.com/anthropics/claude-code/issues/77268) · @sailmob · 更新于 2026-09-24

**数据丢失级**：Worktree 回收会删除其他存活会话的工作树，包括已锁定及含未提交工作的树。多 Agent 并行是 Claude Code 的核心场景，此问题直接影响协作者的代码安全。

### 7. Opus 5.5 安全防护误报 `reasoning_extraction`（6 条评论）
[#96118](https://github.com/anthropics/claude-code/issues/96118) · @ithadmin · 更新于 2026-09-24 · 👍 1

**新模型适配**：Opus 5.5 的安全机制将正常推理过程标记为 `reasoning_extraction`，导致响应中断。社区呼吁在界面上展示模型思考内容而非错误提示。

### 8. Windows 桌面版：自动更新后会话迁移至云端导致文件工具失效（3 条评论）
[#96187](https://github.com/anthropics/claude-code/issues/96187) · @dwrightii · 更新于 2026-09-24

**数据一致性**：Claude Desktop 自动更新将会话迁移到云端后，文件工具操作的是副本而非本地真实文件，`device_commit_files` 留下旧字节。与 #93482 同一领域，说明 Cowork 本地文件回写机制存在系统性隐患。

### 9. 计划任务只记录 `lastRunAt` 但从不真正启动（2 条评论）
[#93015](https://github.com/anthropics/claude-code/issues/93015) · @sathishrao02 · 更新于 2026-09-24

**自动化可靠性**：Scheduled 任务更新运行时间戳后不启动任何会话，无错误提示、无失败状态，整个自动化批量静默停止。对依赖定时任务的团队来说，这类"无声失败"比明确报错更难排查。

### 10. 非会话文件变更被错误渲染为会话内 diff（2 条评论，👍 2）
[#95930](https://github.com/anthropics/claude-code/issues/95930) · @ksmithbaylor · 更新于 2026-09-24

**UI 误报**：切换分支、rebase 等操作导致的磁盘文件变化，被 Claude Code 渲染为会话内的新编辑。开发者反馈这会误导对工具调用过程的理解，应只展示会话真正执行的编辑操作。

---

## 重要 PR 进展

> 过去 24 小时共 5 个 PR，全部来自 @poteat 且均已关闭，集中围绕 diff 工具的准确性、AGENTS.md 读取语义与遥测信息补全。

### 1. agents-md：自动分页读取嵌套 `AGENTS.md` 不再计为已交付
[#96364](https://github.com/anthropics/claude-code/pull/96364) · @poteat · 已关闭

未指定 `offset`/`limit` 时，对嵌套 `AGENTS.md` 的读取会被视为"已交付"，导致后续同目录读取不再附加其内容。修正后分页读取不再错误地满足交付语义，确保模型每次都能获取完整指令。

### 2. diff：传递 `--no-color` 修复强制 git 颜色导致 diff 内容为空
[#96363](https://github.com/anthropics/claude-code/pull/96363) · @poteat · 已关闭

当仓库或用户 git 配置设置了 `color.ui=always` 或 `color.diff=always` 时，diff 工具的 hunk 头因 ANSI 转义序列被截断，diff 正文显示为空。添加 `--no-color` 强制禁用颜色，保证 diff 内容正常展示。

### 3. telemetry：遥测行携带引擎版本、基础版本与构建时间
[#96487](https://github.com/anthropics/claude-code/pull/96487) · @poteat · 已关闭

外部构建的遥测数据此前不携带版本信息。修改后从 `$.session.version()` 读取 `{ version, base?, builtAt? }`，为问题排查提供完整版本上下文。

### 4. diff：只读 shell 命令不再触发 diff 刷新
[#95423](https://github.com/anthropics/claude-code/pull/95423) · @poteat · 已关闭

此前 diff 面板在每次 Bash/PowerShell 工具调用后都会重新获取 diff，即使该命令被标记为只读（`ls`、`git status`、`cat`）。修正后通过 `isReadOnly` 跳过无副作用的命令，减少无效刷新。

### 5. diff：`command.run` 钩子的命令命名与引擎字面量扫描对齐
[#96570](https://github.com/anthropics/claude-code/pull/96570) · @poteat · 已关闭

钩子模块使用命名常量作为 `command.run` 匹配的命令名，而引擎扫描仅识别字面量命令名，导致启动时斜杠命令等待逻辑失效。改为字面量后，斜杠命令可以正确等待模块加载。

---

## 功能需求趋势

从近 24 小时更新的 Issues 中，社区关注的功能方向可归纳为以下几类：

| 方向 | 代表 Issue | 社区诉求 |
|------|-----------|----------|
| **MCP 协议完善** | #41836、#92815 | 支持会话/对话标识符传递；支持持久化频道选项使运行中的会话能接收推送事件 |
| **自动记忆/上下文透明度** | #82056、#71254 | 暴露记忆索引加载状态；优化 Auto-Compact 触发时机，避免空闲恢复时误触发 |
| **多会话隔离与安全** | #77268、#94571、#95930 | 工作树回收保护；文件变更归因隔离；仅展示会话真实编辑 |
| **云会话（Cowork）数据一致性** | #93482、#96187、#96075 | 本地文件回写必须真实落盘；拒绝操作不可见仓库时应给出明确错误与修复途径 |
| **新模型（Opus 5.5）适配** | #96118、#96899 | 安全误报导致会话中断；故障恢复机制需要在 UI 上透明展示 |
| **终端渲染增强** | #92993、v2.1.282 | 保留 ANSI 颜色支持终端绘图；限制散文宽度防止表格挤压 |
| **桌面/Web 集成体验** | #96825、#96904 | computer-use 侧面板停靠策略；iOS Simulator 面板 Intel 机型黑屏修复 |

---

## 开发者关注点

### 1. 静默数据不一致是最大信任危机
Cowork 的 `device_commit_files`"报告成功但内容滞后"（#93482）、"会话迁移云端后工具操作副本"（#96187）以及"工作树回收摧毁兄弟会话"（#77268），都属于**无报错的静默数据丢失**。开发者普遍表示：明确的报错可以接受，但"假成功"会直接摧毁对工具的信任。

### 2. 成本与 Token 计量敏感
`totalTokensReminder` 引发提示缓存下限（#90018）与 Opus 5 使用量被计入 Fable 配额（#96035）都指向同一个核心诉求：**计量必须准确、缓存必须可预期**。任何导致缓存失效或配额误计的改动，都会立刻引起开发者注意。

### 3. 自动化任务需要可观测性
计划任务"只记录时间戳不真正执行"（#93015）暴露了自动化能力缺乏失败态透明度的问题。"静默停止"比执行失败更可怕，因为没有入口去发现它。

### 4. 新模型过渡期的摩擦
Opus 5.5 的安全机制误报（#96118）、模型故障后的不可恢复状态（#96899）等，说明模型层变更对上层工具链的影响尚未平滑。开发者希望在模型切换或故障时获得明确、可操作的反馈，而非通用错误提示。

### 5. 多会话并行的工作流安全
GitHub 集成授权仓库集合过窄（#96075）、并发会话间文件变更相互干扰（#94571、#95930），显示主流使用方式正在从单会话编辑走向多 Agent 协作，隔离与归属语义需要跟上。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-09-25）

## 1. 今日速览

过去 24 小时内，OpenAI Codex 密集发布了 6 个 Rust 版本（`0.158.0-alpha.7` 至 `0.158.0-alpha.11`），持续迭代 CLI 核心。社区方面，Windows 桌面应用的问题依然占据主导：应用卡顿/冻结、沙箱权限失败以及 Chrome 集成失效是开发者反馈最集中的领域。此外，多个关于“功能回退”（如 Commit/Push 按钮消失、Usage 显示缺失）的 Issue 引发了广泛共鸣，反映出用户对桌面端与 IDE 扩展近期更新的体验下降有明显感知。

## 2. 版本发布

过去 24 小时内共发布 6 个版本，均为 Rust 核心的预发布迭代：

| 版本号 | 说明 |
|---|---|
| [rust-v0.158.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.7) | 0.158.0 系列第 7 个 alpha |
| [rust-v0.158.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.8) | 0.158.0 系列第 8 个 alpha |
| [rust-v0.158.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.9) | 0.158.0 系列第 9 个 alpha |
| [rust-v0.158.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.10) | 0.158.0 系列第 10 个 alpha |
| [rust-v0.158.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.11) | 0.158.0 系列第 11 个 alpha |
| [rust-v0.157.0-alpha.11.1](https://github.com/openai/codex/releases/tag/rust-v0.157.0-alpha.11.1) | 0.157.0 系列补丁版本 |

所有 Release 均未附带详细的变更说明，但结合同日合并的 PR 来看，这波 alpha 迭代大概率与 MCP 配置优化、TUI 体验改进、多会话消息板以及构建性能优化（V8 预构建）等方向相关。

## 3. 社区热点 Issues（Top 10）

### 3.1 [Windows 11 上 Codex App 频繁卡顿/冻结（即使系统资源充足）](https://github.com/openai/codex/issues/20214)
- **标签**：`bug`, `windows-os`, `app`, `performance`
- **评论/点赞**：112 评论 / 87 👍
- **动态**：长期置顶的热门 Issue，过去 24 小时仍有更新。用户报告在 AMD Ryzen 5 5600 + 32GB RAM 的配置下应用依旧出现严重卡顿，即使在 Plus 订阅下执行轻量任务也无法避免。该 Issue 已成为 Windows 桌面端性能问题的集中讨论帖。

### 3.2 [Windows：ChatGPT 项目预热锁定本地镜像，启动时擦除 node_repl cwd 的临时方案](https://github.com/openai/codex/issues/44736)
- **标签**：`bug`, `windows-os`, `mcp`, `app`, `config`
- **评论/点赞**：18 评论 / 0 👍
- **动态**：用户确认了“辅助工作目录锁定”和“桌面启动重写导致临时方案失效”两个叠加问题。虽然该 Issue 提供了用户侧 workaround，但底层产品缺陷仍未修复，影响 Windows 上使用 MCP 的项目工作流。

### 3.3 [Windows Codex Desktop：Chrome 集成已安装但 chrome-native-hosts-v2.json 从未创建](https://github.com/openai/codex/issues/42520)
- **标签**：`bug`, `windows-os`, `app`, `app-server`, `browser`
- **评论/点赞**：15 评论 / 1 👍
- **动态**：Codex Desktop 宣称已安装 Chrome 集成，但从未生成必要的 native hosts 文件，导致浏览器集成功能实际不可用。该问题在 26.901.1978.0 版本上复现，且更新后遗留了“latest junction”错误。

### 3.4 [Windows Desktop：沙箱提权失败——每个线程都报 “requires effective :root read access”](https://github.com/openai/codex/issues/46114)
- **标签**：`bug`, `windows-os`, `sandbox`, `app`
- **评论/点赞**：13 评论 / 4 👍
- **动态**：最新的 ChatGPT Desktop 更新后，所有新会话和既有会话均立即失败。用户尝试了非提权运行、管理员重启、应用修复和重置，均无法解决。这是一个阻断性的 Windows 沙箱故障。

### 3.5 [VSCode 插件 Bug：无法通过 `Codex: New Codex Agent` 打开多个窗口](https://github.com/openai/codex/issues/15807)
- **标签**：`bug`, `extension`
- **评论/点赞**：11 评论 / 15 👍
- **动态**：在 macOS（Darwin arm64）上，使用 API 订阅的 VS Code 扩展无法打开多个 Agent 窗口。该问题在多个版本中持续存在（26.5324.21329 等），是扩展侧长期未解决的多窗口管理缺陷。

### 3.6 [Bug：缺少 Git commit 和 push 按钮](https://github.com/openai/codex/issues/47511)
- **标签**：`bug`, `app`
- **评论/点赞**：10 评论 / 27 👍
- **动态**：Pro 用户报告在桌面应用 26.917.51856 版本中，原本可见的 Commit 和 Push 按钮被移除，属于明显的 UI 回归。27 个 👍 说明该问题影响面较大，开发者对常用操作的“入口隐藏”感到不满。

### 3.7 [Codex App：恢复项目侧边栏中可见的 Commit 和 Push 按钮](https://github.com/openai/codex/issues/47897)
- **标签**：`enhancement`, `app`
- **评论/点赞**：3 评论 / 3 👍
- **动态**：这是针对 #47511 的配套 Feature Request。用户明确要求将 Commit 和 Push 从“未标记的省略号菜单”中移回可见区域，强调这是日常开发循环中的高频操作。社区的诉求非常明确：不要将常用操作折叠进隐藏菜单。

### 3.8 [Codex Remote 切换主机提示 “Paginated chats cannot be continued on another host yet”](https://github.com/openai/codex/issues/40879)
- **标签**：`bug`, `app`, `remote`
- **评论/点赞**：6 评论 / 3 👍
- **动态**：Pro 用户的工作流是在家用 Mac 上开启会话，随后在其他主机上继续，但 Remote 功能不允许分页对话跨主机延续。这限制了 Remote 在真实多设备环境下的实用价值，属于远程协作的核心功能缺口。

### 3.9 [Codex CLI：为 /resume 会话选择器添加当前 worktree 过滤器](https://github.com/openai/codex/issues/47485)
- **标签**：`enhancement`, `TUI`, `CLI`, `session`
- **评论/点赞**：5 评论 / 1 👍
- **动态**：用户同时使用多个 Git worktree 并行开发不同功能，每个 worktree 有自己的 Codex 会话。当前 /resume 选择器无法按 worktree 过滤，导致会话列表混杂、难以定位。这是一个针对 Git worktree 工作流的实用增强建议。

### 3.10 [Mac 应用无法工作，账户连接提示“尚无 Work 访问权限”](https://github.com/openai/codex/issues/47969)
- **标签**：`bug`, `auth`, `app`
- **评论/点赞**：3 评论 / 0 👍
- **动态**：昨日新提交的 Issue。用户账号在网页端正常，但 Mac 应用从昨天开始无法使用。尝试重新登录、清除缓存、切换应用权限均无效。虽然目前证据有限，但属于新出现的认证类阻断问题，值得持续关注。

## 4. 重要 PR 进展（Top 10）

> 注：以下 PR 均于 2026-09-24 创建并已关闭，作者为 copyberry[bot]。由于评论数为 `undefined`，无法展示社区讨论热度，以下基于功能重要性排序。

### 4.1 [移除捆绑目录中的 GPT-5.4 并保留迁移提示](https://github.com/openai/codex/pull/47932)
- **说明**：从捆绑的模型目录中移除 `gpt-5.4`，同时确保用户已保存的模型选择能获得迁移路径，且不会误伤其他仍支持该模型的供应商。涉及模型生命周期管理和兼容性的关键变更。

### 4.2 [将工具调用观测绑定到外发 Responses 消息预算](https://github.com/openai/codex/pull/47957)
- **说明**：修复了仅删除工具结果元数据仍可能超过 15 MiB 消息预算的问题。现在会在裁剪时同时考虑工具调用及参数所占用的空间，防止后续写入失败。

### 4.3 [支持图片编辑请求中的文件引用](https://github.com/openai/codex/pull/47956)
- **说明**：编辑最近对话中的图片时，若图片来自消息或工具输出的文件引用，此前会失败。本次更新使 `ImageEditRequest` 同时接受 `image_url` 和 `file_id`。

### 4.4 [将 Flex 容量故障呈现为独立的终态错误](https://github.com/openai/codex/pull/47967)
- **说明**：识别 HTTP 429 响应及流式事件中的 `flex_unavailable` 信号，正常结束对话（不重试）并报告“Flex capacity unavailable”，同时通过核心 API 暴露 `flexUnavailable` 状态。

### 4.5 [使用 macOS 与 GNU Linux 的预构建 V8 归档](https://github.com/openai/codex/pull/47951)
- **说明**：在启用指针压缩和 V8 沙箱时，选用校验和固定的 `rusty_v8` 150.4.0 预构建归档，并新增 `--//:rusty_v8_from_source=true` 开关供强制源码构建。可显著缩短 Bazel 构建时间。

### 4.6 [处理 Btrfs 设备不匹配时的守护进程 socket 掩码问题](https://github.com/openai/codex/pull/47968)
- **说明**：Btrfs 子卷报告的 `st_dev` 可能与 `/proc/self/mountinfo` 中的设备不一致，导致守护进程 socket 挂载校验误拒绝有效挂载。该 PR 允许在打开目录与挂载点一致时容忍此差异。

### 4.7 [将根授权上下文扩展到 16 条消息](https://github.com/openai/codex/pull/47947)
- **说明**：将 `MAX_ROOT_MESSAGES` 从 8 提升至 16，使 Guardian 子代理在进行授权审查时能查看更多根对话上下文，并同步更新了授权集成测试。

### 4.8 [为临时会话增加内存版 Agent 消息板](https://github.com/openai/codex/pull/47946)
- **说明**：临时会话无法使用基于 SQLite 的消息板。该 PR 新增 `message_board_in_memory` 设置项，允许 Agent 在临时会话中共享讨论内容，无需持久化存储。

### 4.9 [清理过期的内存消息板注册表条目](https://github.com/openai/codex/pull/47952)
- **说明**：当最后一个 board 句柄被释放时，其状态会残留于 `InMemoryMessageBoards` 注册表中，导致跨会话累积。该 PR 增加了无强引用状态的自动清理逻辑。

### 4.10 [将完整屏启动提示移入会话记录](https://github.com/openai/codex/pull/47954)
- **说明**：将 TUI 全屏模式下的启动提示移动到会话头部下方，并在窄终端上支持换行；同时移除了输入框上方的轮换提示和启动公告，为用法警告腾出空间。TUI 界面细节的打磨。

## 5. 功能需求趋势

综合过去 24 小时活跃的 Issues 和 PR，社区关注的功能方向集中在以下五个维度：

- **Windows 桌面端稳定性（最突出）** ：从应用冻结（#20214）、CPU/SSD 启动饱和（#47948）、渲染进程内存泄漏（#46690）到 UI 输入卡死（#47632），Windows 平台的稳定性问题已成为当前社区反馈密度最高的方向。用户普遍反映“系统资源充足但应用表现极差”。
- **沙箱与权限系统可靠性**：Windows 沙箱提权失败（#46114）、ACL 状态损坏（#47950）、mountinfo 路径错误（#47559）等问题集中出现，表明沙箱功能在 Windows 和 Linux 环境下的边界情况处理仍需加强。
- **IDE 扩展体验优化**：VS Code 扩展的多窗口支持（#15807）、会话恢复能力（#44807）、Work 使用量显示（#47486/#47578）等诉求持续被提出。扩展功能与桌面端的功能对齐度是社区关注的焦点。
- **高频操作回归与 UI 可发现性**：Commit/Push 按钮隐藏（#47511/#47897）和 Usage 显示消失（#47578）等“功能回退”引发较多讨论。用户对把常用操作折叠进菜单的改动普遍持负面态度。
- **会话管理与多设备协同**：Remote 跨主机会话延续（#40879）、不同设备间项目分组不一致（#47963）、/resume 的 worktree 过滤（#47485）等需求表明，用户在真实工作流中对会话管理的灵活性和一致性要求正在提升。

## 6. 开发者关注点

- **Windows 平台体验是最大痛点**：多个高热度 Issue（#20214、#42520、#46114、#47948）均与 Windows 直接相关。冻结、沙箱失败、Chrome 集成失效、启动时满载磁盘等问题叠加，严重影响了 Windows 用户的生产力。开发者普遍反馈“配置并不低，但体验不及预期”。
- **对“功能回退”容忍度低**：Commit/Push 按钮的移除获得了极高的点赞（#47511 有 27 👍），且用户迅速提交了恢复请求（#47897）。这表明开发者对 IDE/桌面端常用控制项的可见性非常敏感，任何“藏入菜单”的改动都会遭到明显抵制。
- **沙箱错误信息难以自助解决**：多个 Issue（如 #46114、#47559、#47950）中，用户表示“尝试了管理员重启、应用修复、重置后仍然失败”，错误信息（如“requires effective :root read access”）对普通用户而言缺乏可操作的解决路径。
- **ChatGPT 项目 / Work 的本地协作机制存在设计缺陷**：#44736（项目预热锁）、#45596（Work helpers 占用镜像目录导致同步失败）等 Issue 指向同一类问题：本地文件系统访问与项目同步机制之间存在冲突，且用户无法通过配置绕过。
- **模型身份不透明引发疑虑**：#47961 指出原生 OpenAI 模型在对话中无法报告自己的模型 ID（identity 行缺少模型标识）。对于代理类工具的用户而言，这种不透明性会引发对模型路由和计费的担忧。

---
*本日报基于 GitHub 公开数据生成，数据截至 2026-09-25。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-25

## 今日速览

昨日发布 v0.62.0-nightly.20260924 版本，主要修复了 VS Code 集成测试检测与连接恢复时的重试进度显示问题。社区讨论热度集中在 Subagent 可靠性（MAX_TURNS 误报成功、通用 agent 挂起）、Auto Memory 安全性以及配置覆盖不生效等长期未决问题上。PR 侧则以核心稳定性修复为主，涵盖文件操作竞态、认证死循环、Enter 键卡死等多项 P1 修复。

## 版本发布

### v0.62.0-nightly.20260924.g8e70c862f
- 检查 VS Code 集成测试是否存在后再尝试运行（#29462）
- 连接恢复期间显示重试进度指示器（#28340）
- 链接: https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260924.g8e70c862f

## 社区热点 Issues

### 1. Subagent 达到 MAX_TURNS 后误报为 GOAL 成功（#22323）
- **优先级**: P1 | 评论: 13 | 👍: 2
- **为什么重要**: `codebase_investigator` 子代理在已达最大轮次的情况下仍返回 `status: "success"` 和 `Termination Reason: "GOAL"`，导致用户无法察觉任务被截断，属于严重的状态误报问题。
- 链接: https://github.com/google-gemini/gemini-cli/issues/22323

### 2. Generalist agent 挂起（#21409）
- **优先级**: P1 | 评论: 8 | 👍: 8
- **为什么重要**: 一旦 `gemini-cli` 委派给 generalist agent 便会永久挂起（等待长达一小时），且影响简单操作如文件夹创建。社区获得 8 个 👍，表明影响范围较广。
- 链接: https://github.com/google-gemini/gemini-cli/issues/21409

### 3. 零依赖 OS 沙箱与执行后意图路由（#19873）
- **优先级**: P2 | 评论: 9 | 👍: 1
- **为什么重要**: 提出利用 Gemini 3 模型的原生 bash 能力，通过零依赖 OS 沙箱在保证安全的同时释放模型最高效的工作方式，是 agent 执行架构的重要演进方向。
- 链接: https://github.com/google-gemini/gemini-cli/issues/19873

### 4. AST 感知文件读取与代码库映射评估（#22745）
- **优先级**: P2 | 评论: 7 | 👍: 1
- **为什么重要**: EPIC 级 issue，探索用 AST 感知工具提升文件读取精度、减少 token 噪声和回合数，直接影响长上下文任务成本和代码理解质量。
- 链接: https://github.com/google-gemini/gemini-cli/issues/22745

### 5. Gemini 默认不主动使用 skills 和 sub-agents（#21968）
- **优先级**: P2 | 评论: 6
- **为什么重要**: 用户反映即使配置了 gradle/git 等自定义 skill，Gemini 几乎不会主动调用，只有显式指示才使用，削弱了 skill 机制的实际价值。
- 链接: https://github.com/google-gemini/gemini-cli/issues/21968

### 6. Auto Memory 需确定性脱敏并减少日志（#26525）
- **优先级**: P2 | 评论: 5
- **为什么重要**: 安全问题——Auto Memory 将本地转录发送至后台提取模型时，脱敏发生在内容进入模型上下文之后；且服务会记录现有 skill 内容。需在发送前确定性 redaction。
- 链接: https://github.com/google-gemini/gemini-cli/issues/26525

### 7. Auto Memory 无限重试低信号会话（#26522）
- **优先级**: P2 | 评论: 4
- **为什么重要**: 低信号会话因未调用 `read_file` 而永远标记为未处理，导致同一会话被反复捞起重试，浪费 token 和后台资源，需引入退避或终止策略。
- 链接: https://github.com/google-gemini/gemini-cli/issues/26522

### 8. Browser Agent 忽略 settings.json 覆盖（#22267）
- **优先级**: P2 | 评论: 4
- **为什么重要**: 全局/项目级 `settings.json` 中的 `maxTurns` 等配置对 Browser Agent 完全不生效，`AgentRegistry` 虽读取合并但实际未传给 agent，配置体系存在断裂。
- 链接: https://github.com/google-gemini/gemini-cli/issues/22267

### 9. Browser subagent 在 Wayland 下失败（#21983）
- **优先级**: P1 | 评论: 4 | 👍: 1
- **为什么重要**: 在 Wayland 环境下浏览器子代理直接失败，显示 `Termination Reason: GOAL` 但无实质结果，影响 Linux 桌面用户。
- 链接: https://github.com/google-gemini/gemini-cli/issues/21983

### 10. `~/.gemini/agents/` 下 symlink 不被识别（#20079）
- **优先级**: P2 | 评论: 4
- **为什么重要**: 用户通过 symlink 管理 agent 配置的常见需求未被满足，属于低成本的易用性改进点，社区有明确诉求。
- 链接: https://github.com/google-gemini/gemini-cli/issues/20079

## 重要 PR 进展

### 1. 串行化文件工具操作，防止丢更新竞态（#29494）
- **优先级**: P1 | 标签: area/core, size/l
- **内容**: 并行的多个工具操作（subagent 执行或批调度）针对同一文件的 `edit` 操作会交错读写造成丢更新；PR 在 shadow repository 层串行化文件工具动作。此前 #29493 已关闭，此为修正版。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29494

### 2. 修复无限认证循环（#29448）
- **优先级**: P1 | 标签: area/core, size/m, size/l
- **内容**: 解决 Windows/WSL/headless 环境下与 VS Code 扩展等伴侣工具的文件竞争、headless keyring 不可用及 supervisor 状态丢失导致的无限认证循环（#28341），并自动回退到加密文件存储。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29448

### 3. 修复 IDE 集成终端 Enter 键卡死（#29476）
- **优先级**: P1 | 标签: area/core, size/m, size/l
- **内容**: 集成终端 + IDE 伴侣集成启用时，文件编辑确认等工具确认提示的 Enter 键无响应（#23297）；PR 将用户确认事件发布与 IDE 事件解耦。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29476

### 4. 后台 shell 执行退出时清理临时目录（#29437）
- **优先级**: P1 | 标签: area/core, size/m, size/l
- **内容**: `gemini-shell-*` 临时目录中的 `bgpids.tmp` 在后台进程完成后未被清理，PR 将临时目录所有权移交 `ShellExecutionService` 并自动移除。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29437

### 5. ACP 模式会话加载竞态修复（#29463）
- **优先级**: P1 | 标签: area/core, size/m
- **内容**: 同一 UTC 分钟内 `session/load` 与 `session/new` 竞态导致会话覆盖，checkpoint 在解析会话文件前被提前写入，引发 `No previous sessions found` 错误。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29463

### 6. 移除无效的 diff.external 覆盖（#29467）
- **优先级**: P1 | 标签: area/core, size/m, size/l
- **内容**: `ShellExecutionService` 和 `gitUtils.getSafeGitEnv()` 中设置的 `diff.external` 配置无效，导致 git diff 命令报 `fatal: cannot spawn : No such file or directory`。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29467

### 7. 恢复会话时避免工具响应回合重复（#29490）
- **优先级**: P1 | 标签: area/core, size/l
- **内容**: 使用 `-r` 恢复会话时工具结果被重放两次（`geminiChat.ts` 记录 + 客户端历史回放），PR 修复了 #29365 的重复回合问题。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29490

### 8. 沙箱构建与网络设置避免 shell 插值（#29492）
- **优先级**: 无明确标记 | 标签: area/security, size/m
- **内容**: `BUILD_SANDBOX=1` 时 `start_sandbox` 使用 `execSync` + shell 字符串拼接路径，`gcRoot` 含元字符可导致任意命令执行，PR 改为参数化传参。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29492

### 9. 阻止 Flash-Lite 继承 ThinkingLevel.HIGH（#29489）
- **优先级**: P2 | 标签: area/agent, size/m
- **内容**: Flash-Lite 系列模型（`gemini-3.1/3.5-flash-lite`）不应继承高思考预算，通过引入 `chat-base-3-flash-lite` 设置 `thinkingBudget: 0` 修复。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29489

### 10. MCP OAuth 流程 RFC 9207 iss 校验修正（#29488）
- **优先级**: P1 | 标签: area/security, size/m
- **内容**: 自 v0.61.0 起 `/mcp auth` 对发布 RFC 8414 metadata 但不返回 iss 的授权服务器直接失败；PR 将 iss-absence 拒绝条件绑定到 `authorization_response_iss_parameter_supported` 声明（#29477）。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29488

## 功能需求趋势

从过去 24 小时更新的 Issues 中，社区最关注的方向集中在以下几点：

- **Subagent 可靠性与可控性**: 大量 P1/P2 bug 围绕子代理挂起、误报成功、配置不生效展开（#22323、#21409、#22267、#21983）。需求不只在"能用"，而在"可预期、可观测、可干预"。
- **安全加固**: 包括 Auto Memory 的确定性脱敏（#26525）、沙箱构建的 shell 注入防护（#29492）、MCP OAuth 流程的 RFC 规范对齐（#29488），安全正在从外围配置走向执行链路内部。
- **Auto Memory 智能治理**: 低信号会话重试（#26522）、无效 patch 隔离（#26523）、脱敏前置（#26525）构成一个完整的内存系统质量改进集，说明社区开始关注记忆功能在长尾场景下的健壮性。
- **AST 感知代码操作**: #22745 和 #22746 表明了社区对更精确、更低 token 消耗的代码读取/搜索/映射方式的兴趣，目标是解决大文件"消防水带式"读取问题。
- **持久化任务追踪**: #18836 和 #21000 持续推动用文件系统替代 in-context 任务列表（WriteToDo），以对抗上下文腐化和 token 膨胀。

## 开发者关注点

- **Agent 挂起与超时**是最迫切的痛点：generalist agent 长时间无响应（#21409）、交互式提示卡死（#22465），开发者普遍需要更清晰的进度反馈和强制终止手段。
- **状态误报加剧信任危机**: MAX_TURNS 被包装为 GOAL 成功（#22323）、browser agent 无实质产出却返回 GOAL（#21983），这类"假成功"比直接报错更难排查。
- **配置覆盖不生效**: Browser Agent 忽略 `settings.json`（#22267）暴露了配置系统在子代理层面的断链，开发者期望全局/项目配置对一切 agent 透明一致。
- **临时文件与工作区污染**: 模型在任意目录生成临时编辑脚本（#23571），给 git 提交带来额外清理成本，社区期望更严格的写入边界。
- **工具规模上限**: 超过 400 个工具触发 400 错误（#24246），开发者期望按需裁剪工具集而非全量注入。
- **破坏性操作缺乏护栏**: `git reset`、`--force` 等危险命令需要更保守的执行策略（#22672）。
- **诊断信息缺失**: `/bug` 报告不含 subagent 上下文（#21763）、`/chat share` 无法分享 subagent 轨迹（#22598），调试与协作链路尚不完整。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-25

## 今日速览

今日发布两个稳定版更新：Reasonix CLI/Desktop v1.39.0 聚焦会话恢复与错误处理改进，Studio v2.20.0 带来扫码配对、MCP 常驻加载等新能力；与此同时，桌面端 v1.38.x 系列的历史会话数据丢失、迁移失败、启动无响应等严重 Bug 仍在社区持续发酵，多个高赞 Issue 要求开发团队给出稳定版本推荐与彻底的修复方案。

---

## 版本发布

### Reasonix CLI v1.39.0 / Desktop v1.39.0（稳定版）

> 此版本改进了会话恢复、错误处理和会话管理，带来更流畅的桌面体验。

- **发布渠道：** 稳定版 · v1.39.0
- **更新日志：** [English](https://reasonix.io/changelog/v1.39.0/?lang=en) · [中文完整版](https://reasonix.io/changelog/v1.39.0/)
- **恢复指南：** [docs/RECOVERY_GUIDE.md](https://github.com/esengine/DeepSeek-Reasonix/blob/438566dd6c9b39eaf0d49027576e57e7f610d0dc/docs/RECO)

### Reasonix Studio v2.20.0（稳定版）

本版主要更新内容包括：

- **手机扫码配对：** 同一网络下手机扫描顶栏二维码即可配对，并在手机上操作窗口内会话（[74f76057f](https://github.com/esengine/DeepSeek-Reasonix/commit/74f76057f) 等）
- **跨设备消息同步：** 各屏幕能看到彼此发出的消息，并标明来源设备（[3b5aef077](https://github.com/esengine/DeepSeek-Reasonix/commit/3b5aef077) 等）
- **窄屏适配：** 改用抽屉式侧栏，工作台不再横向滚动（[96ed3492f](https://github.com/esengine/DeepSeek-Reasonix/commit/96ed3492f)）
- **MCP 常驻加载：** 工具每轮直接交给模型，启动时预先连接，可在扩展设置中切换（[1333c04e7](https://github.com/esengine/DeepSeek-Reasonix/commit/1333c04e7)）
- **Windows 增量更新：** 更新时只下载差异部分，减少带宽消耗

- **更新日志：** [English](https://reasonix.io/changelog/v2.20.0/?lang=en) · [中文完整版](https://reasonix.io/changelog/v2.20.0/)

---

## 社区热点 Issues（10 个）

### 1. #10527 — [CLOSED] 升级 v1.38.10 后所有会话历史全乱 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10527)
- **作者：** @Sicarmon | **评论：** 17 | **👍：** 3
- **标签：** bug, desktop, v2, windows, data-loss
- **摘要：** 用户从 v1.38.3 升级到 v1.38.10 后，所有会话的时间、命名、顺序全部混乱，新会话无法使用。用户强烈抗议合并未经充分验证的 PR。
- **关注理由：** 该 Issue 是 v1.38.x 系列数据丢失问题中呼声最高的一条，直接反映了升级流程缺乏质量保障，社区信任受损。

### 2. #10509 — [OPEN] v5 迁移重复导入导致工作区永久只读 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10509)
- **作者：** @huojian17-star | **评论：** 10
- **标签：** desktop, v2, agent, windows, data-loss
- **摘要：** v1.38.10 的 v5 会话存储迁移中断后，工作区永久只读，shell 工具不可用，数据未损坏但无法访问。
- **关注理由：** 这是最严重的故障模式之一——工作区完全不可用且无法自愈，对依赖 shell 工具的用户是致命打击。

### 3. #10665 — [OPEN] 升级 v1.38.11 后侧边栏历史会话全部消失 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10665)
- **作者：** @gwanting | **评论：** 6
- **标签：** bug, desktop, v2, windows, data-loss
- **摘要：** 升级后侧边栏只剩「1条历史需要修复」，几百个会话全部不显示。日志显示 `unsupported session storage version` 错误。
- **关注理由：** 大批用户在 v1.38.10/11 连续遭遇同类问题，说明 v5 存储迁移在不同升级路径上存在系统性的兼容缺陷。

### 4. #10687 — [OPEN] 社区呼吁推荐 Bug 少、稳定的版本 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10687)
- **作者：** @ganbiedetuzi | **评论：** 8 | **👍：** 1
- **标签：** enhancement, v2
- **摘要：** 用户希望开发团队指定一个 Issue 来推荐问题少的稳定版本，让不需要新功能的用户可以安心使用。
- **关注理由：** 该需求反映了用户对频繁升级带来的不稳定已经疲惫，社区迫切需要一个「稳定版」选择机制。

### 5. #10532 — [OPEN] v1.38.10 后 AI 思考过程陷入无限死循环 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10532)
- **作者：** @Rainboow1908 | **评论：** 5
- **标签：** bug, v2, agent, windows
- **摘要：** AI 在思考过程中反复输出特定词汇，陷入无限循环，输出预算被耗尽。
- **关注理由：** 与 PR #10431（perseveration 循环检测）直接相关，是 agent 稳定性领域最典型的故障形态，影响实际生产使用。

### 6. #10713 — [OPEN] 启动无响应，界面卡死，程序异常退出 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10713)
- **作者：** @JackMere | **评论：** 4
- **标签：** bug, desktop, v2, windows, crash
- **摘要：** v1.38.12 启动后 CPU 高位、界面无响应，历史列表、新会话和新项目都无法操作。
- **关注理由：** v1.38.12 是较新版本，但仍存在严重的启动卡死问题，说明 v1.38.x 系列的根本性缺陷尚未修复。

### 7. #10735 — [OPEN] 「清除残留」重启后被回滚 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10735)
- **作者：** @233-bot | **评论：** 2
- **标签：** bug, desktop, v2, windows, data-loss
- **摘要：** 已删除的对话在侧栏留下条目，「清除残留」后重启又全部恢复；v1.39.0 仍可复现。作者还实测提供了详细的日志分析。
- **关注理由：** v1.39.0 已发布但该问题仍存在，说明“删除/归档”的持久化逻辑存在基础性缺陷，且修复优先级不足。

### 8. #10738 — [OPEN] 启动时服务侧全量扫描 40 秒，导致侧栏空白 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10738)
- **作者：** @233-bot | **评论：** 1
- **标签：** bug, desktop, v2, agent, windows
- **摘要：** 通过进程级采样证实启动空白期的根因是服务端全量扫描磁盘，CPU 持续满载约 40 秒。
- **关注理由：** 这是社区少见的高质量性能诊断报告，为开发团队定位启动性能瓶颈提供了精确的切入点。

### 9. #10739 — [OPEN] 打开 SSH 连接后桌面端完全无法使用 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10739)
- **作者：** @wintsa123 | **评论：** 0
- **标签：** bug, desktop, v2, windows
- **摘要：** 桌面端打开 SSH 连接服务端后，项目无法切换、无法输入提示词，重新打开远程连接窗口才恢复正常。
- **关注理由：** SSH 远程连接是桌面端核心场景，该问题会导致整个应用不可用，影响远程开发用户群体。

### 10. #10743 — [OPEN] 右侧工作区图层遮挡弹窗内容 [🔗](https://github.com/esengine/DeepSeek-Reasonix/issues/10743)
- **作者：** @JH-D-admin | **评论：** 0
- **标签：** bug, desktop, v2, windows
- **摘要：** 右侧工作区图层被置于应用内顶层，可能遮挡 Git 图谱等弹窗内容。
- **关注理由：** UI 层级管理问题，虽非数据丢失类严重故障，但影响日常操作体验，且已持续存在于多个版本。

---

## 重要 PR 进展（10 个）

### 1. #10368 — [OPEN] 在 bash 中强制使用标准 git 行为 [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10368)
- **作者：** @BuGlessRB | **标签：** skills, v2, config
- **内容：** 强制 Reasonix 启动的所有 git 子进程（含 agent 通过 bash 工具调用的）使用标准 git 行为，避免用户 `~/.gitconfig` 中的 rebase 等配置导致 agent 行为与预期不符。
- **价值：** 提高 agent 操作的确定性与可复现性，是 agent 可靠性的基础修复。

### 2. #10431 — [OPEN] 检测 perseveration 循环并提示后重试一次 [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10431)
- **作者：** @BuGlessRB | **标签：** desktop, v2, agent
- **内容：** 新增客户端侧守卫——当模型持续输出相同短文本或推理内容且不调用工具时，判定为无意义重复循环，主动中断并以提示词重试一次。
- **价值：** 直接回应 Issue #10532 所描述的 AI 死循环问题，是 agent 稳定性关键补丁。

### 3. #10084 — [OPEN] 修复 DeepSeek 思考模式重复 400 错误 [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10084)
- **作者：** @BuGlessRB | **标签：** v2, provider
- **内容：** 在思维链模式下，每次 assistant 历史轮（含纯文本轮）都序列化 `reasoning_content` 字段，修复 `The reasoning_content in the thinking mode must be passed back to the API` 的重复 400 报错。
- **价值：** 这是 DeepSeek 模型接入的核心修复，直接影响使用思考模式的用户体验。

### 4. #10419 — [OPEN] 技能路由改用 use_capability [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10419)
- **作者：** @BuGlessRB | **标签：** v2, agent
- **内容：** 修复技能（skills）路由仍指示模型调用已退役的 `connect_tool_source` 工具的问题，改为正确的 `use_capability` 路由，使技能在 agent 中真正可用。
- **价值：** 修复了技能功能在生产环境中长期失效的问题，属功能性缺陷修复。

### 5. #10516 — [OPEN] `--continue` 找不到会话时自动开新会话 [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10516)
- **作者：** @BuGlessRB | **标签：** tui, v2
- **内容：** `-c/--continue` 此前在无会话可恢复时以 exit 1 退出，改为提示并自动开启新会话，telemetry 也标记为 "fresh"。
- **价值：** 优化 CLI 工作流，减少不必要的失败中断，提升命令行使用体验。

### 6. #10297 — [OPEN] 尊重 `[sandbox].bash="off"` 配置并跳过 bwrap 探测 [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10297)
- **作者：** @BuGlessRB | **标签：** tui, skills, v2, agent, config
- **内容：** 修复 `bash = "off"` 配置不生效的问题，并在此模式下跳过 bubblewrap 探测，避免不必要的沙箱开销。
- **价值：** 修复配置语义不一致的问题，同时对关闭沙箱的用户提供更好的启动性能。

### 7. #10525 — [OPEN] 原生鼠标复制模式下去除滚动条与代码块装饰 [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10525)
- **作者：** @BuGlessRB | **标签：** tui, v2
- **内容：** 在 `/mouse`、SSH 等原生鼠标模式下，将鼠标控制权交还终端，同时移除代码块装饰线，使复制粘贴的内容保持干净。
- **价值：** 提升终端复制体验，修复复制内容包含装饰字符的历史痛点。

### 8. #10367 — [OPEN] 为 CLI 输入框添加 vi 命令模式 [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10367)
- **作者：** @BuGlessRB | **标签：** tui, v2, config
- **内容：** 新增可选 `ui.commandmode = "vi"`，`Esc` 进入命令模式，`Ctrl+C` 保留已输入内容至历史记录。
- **价值：** 满足 vi 用户的操作习惯，提升 CLI 编辑体验与草稿安全性。

### 9. #10344 — [OPEN] 新增按供应商配置的 stream 空闲超时 [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10344)
- **作者：** @BuGlessRB | **标签：** v2, config, provider
- **内容：** 增加 `stream_idle_timeout_seconds` 设置，按供应商配置流式响应的空闲超时时间，未设置时保持默认 300 秒。
- **价值：** 为不同供应商的网络特性提供灵活的超时策略，减少假死或误判断连。

### 10. #10745 — [OPEN] CI 增加结构门禁（god objects、跨文件类型、架构、重复代码） [🔗](https://github.com/esengine/DeepSeek-Reasonix/pull/10745)
- **作者：** @bfxh | **标签：** v2
- **内容：** 使用纯 Python stdlib 实现结构与复杂度检查门禁，`make gates` 约 45 秒扫描 7000+ 文件，量化模块腐化程度。
- **价值：** 在 CI 层面提升代码库可维护性，从工程实践上回应社区对代码质量的关切。

---

## 功能需求趋势

从近期 Issues 与 PRs 中可提炼出以下社区关注方向：

1. **稳定版选择与版本回退机制（高优先级）**：多个用户呼吁推荐 bug 少的稳定版本，说明频繁升级已造成信任危机，官方需提供快速回退或版本锁定方案。

2. **会话数据迁移与备份的可靠性**：围绕 v5 存储迁移的大量 data-loss Issue 表明，社区最迫切的需求是「升级不丢数据」，建议优先完善迁移测试矩阵与失败自动回滚。

3. **Agent 循环检测与自恢复能力**：#10532 的死循环问题与 #10431 的 perseveration 检测 PR 形成呼应，用户需要 agent 能够识别并跳出无意义重复。

4. **移动端远程操控**：#10717 提出像 zcode 一样支持移动端网页操作，Studio v2.20.0 已开始提供扫码配对，但社区期待更完整的移动端控制方案。

5. **MCP 服务器常驻与性能优化**：Studio v2.20.0 已支持 MCP 常驻加载；同时 #10738 的启动全量扫描问题表明，性能优化仍是桌面端的持续关注点。

6. **配置项精细化**：多个 PR 围绕超时、沙箱、git 行为等提供更细粒度的配置能力，社区正在推动 Reasonix 向「可深度定制的开发工具平台」演进。

---

## 开发者关注点

- **升级恐惧症已形成**：v1.38.x 系列的连续数据丢失问题导致社区对升级表现出明显的抵触情绪（参考 #10527 的「强烈级抗议」），建议官方建立更严格的 PR 验证流程和发布前回归测试，并明确道歉与补偿方案。

- **问题版本不透明**：用户无法快速知道哪些版本有已知严重问题，建议设立「已知问题/推荐版本」的置顶 Issue 或文档页。

- **自愈与降级能力缺失**：多个 Issue 指出迁移失败后工作区「永久只读」「不自愈」，用户期望至少能回滚到迁移前状态，而不是手动编辑存储文件。

- **重复的同类 Bug 报告过多**：#10365、#10509、#10665 等描述的均为同一类 v5 迁移问题，社区希望开发团队能统一回复并给出临时规避方案，而不是逐条处理。

- **高质量诊断报告涌现**：#10735 和 #10738 由社区用户提交了详尽的日志和性能采样分析，说明用户愿意深度参与问题定位，建议团队对这些高质量的贡献给予更积极的回应与感谢。

---

*日报生成时间：2026-09-25 · 数据来源：[github.com/esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) · 本日报由 AI 自动聚合生成，仅供参考。*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-09-25

## 1. 今日速览

过去24小时，OpenCode 的核心优化集中在上下文窗口管理：多项 PR 试图修复“小窗口模型频繁自动压缩”与“输出限制超出上下文窗口”的痛点，其中 #51021 已合并关闭，直接解决 #46595 与 #47398 两个 issue。功能需求方面，社区对 V2 配置 schema 与文档不一致的问题讨论热烈（#43748，👍 9），同时出现了模型变体支持（#51234）、工具执行护栏（#51230）等新需求。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 社区热点 Issues

过去 24 小时更新的 issue 共 5 条，均列入下方。

**#43748 — V2 配置 schema 与文档不一致，导致合法配置被误报**
- ⭐ 重要性：所有 V2 用户都会在编辑器中遇到 IntelliSense 误报“非法字段”，影响面极广。
- 📊 社区反应：评论 6，👍 9。用户对官方 schema 长期滞后表示不满。
- 🔗 [链接](https://github.com/anomalyco/opencode/issues/43748)

**#50091 — 免费额度未按期重置，反而延长**
- ⭐ 重要性：用户昨日耗尽额度后，等待约 20 小时仍未重置，质疑计费/额度系统存在 bug。
- 📊 社区反应：评论 3，👍 4。疑似时区计算或重置逻辑偏移问题。
- 🔗 [链接](https://github.com/anomalyco/opencode/issues/50091)

**#51233 — 插件 API 注册自定义 provider 图标**
- ⭐ 重要性：自定义 provider（插件或配置添加）在模型选择器中始终显示通用图标，影响品牌识别与可用性。
- 📊 社区反应：新 issue，暂无评论。属于小而明确的 UI/API 增强需求。
- 🔗 [链接](https://github.com/anomalyco/opencode/issues/51233)

**#51234 — 斜杠命令 frontmatter 支持模型变体**
- ⭐ 重要性：1.18.31 中命令无法指定模型变体（如 gpt-5.6-luna），是 #7713 的复活请求，此前因无活动关闭。
- 📊 社区反应：新 issue，暂无评论。对依赖 slash command 工作流的用户是刚需。
- 🔗 [链接](https://github.com/anomalyco/opencode/issues/51234)

**#51230 — 工具执行前钩子 / 护栏中间件 & 原生 OpenTelemetry**
- ⭐ 重要性：Agentic LLM 执行 shell/工具调用时可能违反仓库规则，用户请求在执行前加护栏层，并希望获得原生可观测性支持。
- 📊 社区反应：新 issue，暂无评论。涉及 enterprise 安全治理方向，潜在需求大。
- 🔗 [链接](https://github.com/anomalyco/opencode/issues/51230)

## 4. 重要 PR 进展

以下挑选 10 个最具代表性或促进核心逻辑变更的 PR（投稿的 50 条中很多为 bot 自动清理或草稿，已过滤）。

**#51021 — [已合并] 输出限制适配上下文窗口**
- 修复小上下文窗口模型因固定 20k/32k 保留区而每次 step 都触发压缩的问题，同时解决多个 thinking budget 相关 bug。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/51021)

**#51235 — [已关闭] 当输入窗口使用达 85% 时触发自动压缩**
- 将自动压缩阈值从固定值改为动态百分比，避免小窗口模型每一步都压缩。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/51235)

**#51238 — 适配模型限制并恢复压缩溢出**
- 将主输出限制（最高 256k）与压缩输出限制（32k）适配到目录与剩余上下文；默认在可用输入窗口的 85% 处启动自动压缩。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/51238)

**#50965 — 新增 session model.select 钩子，支持逐步模型路由**
- 允许插件在 session 每步执行前动态选择模型，解决 #50729。面向复杂路由策略的高级功能。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/50965)

**#51237 — 标题生成钩子可选模型；使用 Copilot 的 utility 模型**
- 让标题生成不再受限于 picker 可见模型，并通过 `copilot-utility-small`（gpt-4o-mini）免费生成标题，降低账单成本。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/51237)

**#50837 — [已关闭] CodeMode 解释器支持 valueOf/toString**
- 程序自定义的 valueOf/toString 之前被解释器忽略，现已在二元运算符、模板字符串、`Number()`/`String()`、`Math.*` 等场景中生效。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/50837)

**#51083 — 权限错误中包含被拒绝的匹配规则**
- 在权限错误中输出具体命中的 deny 规则（考虑优先级），帮助用户理解拒绝原因。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/51083)

**#50429 — 自定义 agent 未指定权限时默认拒绝**
- 声明了 permission 块的自定义 agent 会在显式规则之前插入隐式 catch-all deny，防止遗漏规则导致越权。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/50429)

**#51236 — UI：diff 词级高亮与折叠行优化**
- 减少 diff 中逐词高亮的视觉噪音；每次只高亮一个变更词，折叠行为更稳定，接近 GitHub Desktop 的体验。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/51236)

**#51232 — TUI：子 agent 状态旁显示子模型**
- Subagents 标签页中显示每个子会话选中的模型，并解析目录名称；即使与父模型相同也显示，无选择时不猜测。
- 🔗 [链接](https://github.com/anomalyco/opencode/pull/51232)

## 5. 功能需求趋势

- **配置生态一致性**（#43748）：V2 迁移后 schema 与文档脱节，用户对配置校验、IntelliSense 的可靠性高度敏感。
- **模型路由与变体**（#50965、#51234、#51237）：从“固定单模型”走向“动态模型选择/变体”，包括 step 级路由、标题生成降本模型、slash command 模型变体。
- **安全治理与可观测性**（#51230、#51083、#50429）：工具执行护栏、权限错误可解释性、自定义 agent 默认拒绝，以及 OpenTelemetry 追踪是 enterprise 使用者关注的重点。
- **上下文窗口优化**（#51021、#51235、#51238）：针对不同模型窗口大小动态调整压缩阈值与输出限制，是目前 bug 修复最集中的方向。
- **免费额度计费透明度**（#50091）：用户对免费层重置时间、日志粒度不满意，需要更好的配额展示与解释。

## 6. 开发者关注点

- **小上下文窗口模型体验**：固定保留区导致每次 step 都触发自动压缩，是近期投诉热点。新 PR 正在将其改为按 85% 阈值动态触发。
- **V2 配置校验误报**：`$schema` 与文档不一致，让编辑器提示连线报错，影响信任度。
- **权限拒绝不够透明**：用户不知道自己的请求为什么被拒。`deny rule` 详情显示需求被明确提出。
- **自动清理 PR 噪音**：大量 `[automated-pr-cleanup]` 标记的旧 PR 被频繁触碰（#447xx/#4476x 系列），干扰了活跃 PR 的可见性，建议维护者统一处理标签或归档流程。
- **标题生成的额外成本**：标题使用大模型计费被认为不合理，社区认可并期待改用 Copilot utility 等低成本/免费模型的做法（#51237）。

---
*本日报由 AI 从 GitHub 公开数据自动生成，仅供参考。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报（2026-09-25）

## 1. 今日速览

今日唯一重大动态为 **dsh-v0.1.7-rc.2 候选版本发布**，带来三项面向可用性的改进：定时任务持久化与提醒、桌面端首次引导，以及跨平台快捷键自定义。过去 24 小时内无新增 Issue 或 PR，社区讨论处于相对平静期。

## 2. 版本发布

### dsh-v0.1.7-rc.2

**发布日期**：2026-09-25
**查看详情**：[GitHub Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.7-rc.2)

本次候选版本主要包含以下面向用户体验的更新：

- **定时任务增强**（[#@Chinesezjc](https://github.com/Chinesezjc)、[#@ZiyaZhang](https://github.com/ZiyaZhang)）：启用定时任务后，用户可创建和管理提醒、查看运行记录；任务重启后保留，支持最短每分钟一次的重复调度。
- **桌面端首次引导**（[@std4453](https://github.com/std4453)）：新增引导流程，介绍可用额度、帮助用户选择用途与工作过程展示方式；中途退出后可继续，降低新手上手门槛。
- **快捷键管理**（[@yxy](https://github.com/yxy)）：Web 与桌面端支持查看、搜索、自定义及恢复快捷键，侧边栏同步显示当前键位，提升操作效率。

> 注意：该版本为发布候选（rc），建议在测试环境验证后使用。

## 3. 社区热点 Issues

过去 24 小时内无新增或更新 Issue，因此暂无热点条目可列。

建议关注已在追踪的议题，可访问 [全部 Issues](https://github.com/deepseek-ai/deepseek-harness/issues) 查看当前已知问题与讨论。

## 4. 重要 PR 进展

过去 24 小时内无新增或更新的 Pull Request，因此无重要进展可列。

近期合入的代码集中在定时任务、引导流程与快捷键管理三个方向，与本次 Release 内容一致。历史 PR 可访问 [全部 Pull Requests](https://github.com/deepseek-ai/deepseek-harness/pulls) 查看。

## 5. 功能需求趋势

虽然今日无新 Issue 可提炼，但结合本次 Release 内容，可以观察社区当前关注的功能方向：

- **任务自动化与持久化**：定时任务的支持表明社区对"无人值守"和"可恢复"自动化工作流的强烈需求，未来可能向更复杂的任务编排（如依赖关系、条件触发）演进。
- **新用户体验（Onboarding）**：首次使用引导的引入，说明项目正在扩大用户基础，将易用性置于优先位置，后续可能出现更多面向非技术用户的引导式功能。
- **界面可定制化**：快捷键自定义与同步显示，反映社区对"个性化交互方式"的期待，未来可能延伸至主题、布局等更多定制维度。
- **多端一致性**：Web 与桌面端同步支持同一功能，说明跨端体验统一是当前开发主线之一。

## 6. 开发者关注点

基于近期版本重点与社区反馈方向，开发者主要关注以下痛点：

- **自动化任务稳定性**：任务在重启后保留是重要进步，但每分钟一次的频率上限可能无法满足部分高频率场景，后续可观察社区是否提出更低间隔需求。
- **快捷键冲突管理**：自定义快捷键带来灵活性，但也伴随冲突可能，未来版本或需增加冲突检测与提示机制。
- **引导流程的可跳过性**：首次引导虽支持中途退出，但部分进阶用户可能希望直接跳过，避免影响工作效率，建议持续关注相关反馈。
- **RC 版本稳定性**：候选版本期间，建议开发者关注定时任务与快捷键功能在边界场景下的表现，并及时提交回归问题。

---

*日报由 AI 技术分析师基于公开 GitHub 数据自动生成，时间范围为 2026-09-24 至 2026-09-25。条目链接均可点击跳转至对应页面。*

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-25

## 今日速览

Hermes Agent 发布 v0.21.5 补丁版本，聚合了 v0.21.4 以来约 460 个 PR。安全方面，社区连续报告两处“绕过密钥脱敏”的漏洞（记忆同步与代码执行输出），值得警惕。此外，两项 P0 修复（插件更新数据保留、Modal/Daytona/Vercel 后端文件写入被清空）进入 PR 审核阶段。

---

## 版本发布

### Hermes Agent v0.21.5 (v2026.9.24)

- 发布说明：补丁版本，将 v0.21.4 以来合并的约 460 个 PR 收拢为稳定标签，供下游（Docker 镜像、Hermes Cloud、托管部署）消费。完整更新说明推迟发布。
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/v0.21.5

---

## 社区热点 Issues（10 个精选）

### 安全类

#### 1. Memory-provider 同步绕过密钥脱敏（#115104）
- **状态**：OPEN / P3 / 3 条评论
- **要点**：`MemoryManager.sync_all` 直接发送会话内容至外部记忆提供方，未经 `redact_for_egress` 脱敏。工具输出中的密钥将原文归档。
- **影响**：使用外部记忆提供方的用户面临凭证泄露风险，建议尽快修复并考虑加密存储。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/115104

#### 2. execute_code 输出溢出文件绕过脱敏（#122024）
- **状态**：OPEN / P3 / 0 条评论（新提交）
- **要点**：`execute_code` 标准输出超过内联上限时写入 `cache/exec` 溢出文件，该文件在 ANSI 清理和密钥脱敏管线之前生成，且文件路径可被伪造。
- **影响**：恶意代码可将密钥明文写入可预测路径并诱导模型读取。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/122024

#### 3. enabled_toolsets 在工具调用时未强制生效（#121934）
- **状态**：OPEN / P2 / 0 条评论
- **要点**：`enabled_toolsets` 仅在 schema 构建时生效，模型调用未授权工具（如幻觉名称或旧上下文遗留）时仍会被分派。
- **影响**：会话权限边界可被绕过，属于安全边界缺陷。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/121934

### 平台/桌面端

#### 4. Windows 安装器 npm 版本与仓库 engines 冲突（#82383）
- **状态**：CLOSED / P2 / 4 条评论 / 👍 2
- **要点**：Hermes-Setup.exe 捆绑的 npm 11.16.0 不满足仓库 `engines` 约束（`<11.10.0 || >=11.17.0`），桌面版构建失败于 `EBADENGINE`。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/82383

#### 5. macOS 桌面版卡在 CONNECTING（#85029）
- **状态**：CLOSED / P2 / 3 条评论
- **要点**：macOS Apple Silicon 上 `hermes serve` headless 后端无法读取 dashboard token，Web UI 返回 404，桌面应用反复重启等待。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/85029

#### 6. 桌面版打开缺失文件报错误导（#122027）
- **状态**：OPEN / P3 / 1 条评论
- **要点**：打开已删除或重命名的本地产物时，macOS 返回 `kLSApplicationNotFoundErr`，用户看到“No application found to open URL”，实际是路径不存在而未经 stat 校验。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/122027

### 功能/命令

#### 7. Signal 适配器：增加禁用 Note to Self 处理的选项（#121970）
- **状态**：OPEN / P3 / 9 条评论
- **要点**：当 signal-cli 作为操作者主号码的“链接副设备”运行时，适配器将所有“Note to Self”消息升级为 agent prompt。社区已有 9 条评论，部分用户主张默认关闭该行为。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/121970

#### 8. 桌面版不支持 /compress 命令（#78340）
- **状态**：CLOSED / P2 / 2 条评论
- **要点**：桌面端输入 `/compress` 返回“not a quick/plugin/skill command: compress”，上下文压缩仅经典 CLI 可用。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/78340

### MCP/工具链

#### 9. MCP 信任门“always”选择不持久化（#109818）
- **状态**：OPEN / P2 / 0 条评论
- **要点**：`request_elicitation_consent()` 将 once/session/always 全部映射为 `"accept"`，不落盘。每个新会话都需重新授权，且三种选项实际行为无差异。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/109818

### 其他

#### 10. Windows 桌面 UI 启动失败：DEFAULT_INDICATOR_STYLE 导入错误（#78482）
- **状态**：CLOSED / P2 / 2 条评论
- **要点**：Windows 上后端 HTTP 可达但 WebSocket 会话被拒，UI 无法加载，源于 `hermes_constants` 导入失败。
- **链接**：https://github.com/NousResearch/hermes-agent/issues/78482

---

## 重要 PR 进展（10 个精选）

### 高优先级（P0）

#### 1. 插件更新保留用户文件（#122007）
- **要点**：`hermes plugins update` 在子目录安装（monorepo 插件，含 67 条目录条目）和 gitignore 数据目录下不再丢失用户编辑的 `config.yaml` 和数据文件。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/122007

#### 2. 修复 Modal/Daytona/Vercel 上 write_file/patch 清空目标文件（#122012）
- **要点**：heredoc 定向到原子写入脚本最后一条命令，导致 `cat > "$tmp"` 读不到输入，目标文件被写空。本次改为字节精确传输。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/122012

### 桌面端

#### 3. 状态栏计时器统一焦点语义（#122044）
- **要点**：主聊天与 tile 使用不同时钟，导致 day-old tile 显示 23:03:00 旁又有 “Running 0:12”，本次统一为自聚焦起计时并明确标注。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/122044

#### 4. 缺失文件打开时提示“file not found”（#122029）
- **要点**：关闭 #122027。打开路径前先 stat，捕获 `ENOENT` 后显示准确错误，替代 macOS LaunchServices 的误导信息。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/122029

#### 5. 拖拽嵌套区域分隔条显示错位（#122039）
- **要点**：右栏属于嵌套 section，拖拽时因未分发指针事件导致宽度突变，本次改为追踪指针。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/122039

### 语义/网关

#### 6. /branch 子会话继承父级 system prompt（#122037）
- **要点**：`create_session()` 未传 `system_prompt`，子会话 `system_prompt` 为 NULL，首轮推理缺少上下文。本次拷贝父级 prompt 到分支。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/122037

#### 7. Anthropic 模型 ID 拼写与 API 对齐（#122036）
- **要点**：`claude-opus-5-5` 等条目用了点号，而官方 `/v1/models` 为全连字符。本次修正拼写，避免模型列表去重产生重复项。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/122036

### 插件/技能

#### 8. 目录新增 Nachos 插件（#122043）
- **要点**：将 Nachos 社区记忆插件加入 catalog，提供持久记忆 provider 与可选上下文压缩引擎，固定至 commit `7bd87e7`。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/122043

#### 9. ACP 暴露技能斜杠命令（#122017）
- **要点**：让 ACP 客户端可发现并展开已安装技能（如 `/paseo-sidekick`），涵盖堆叠技能。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/122017

### 钩子/请求改写

#### 10. pre_api_request 钩子支持改写采样参数（#121923）
- **要点**：`pre_api_request` 插件目前仅观测性（返回值被丢弃），本次允许返回 dict 并改写请求中的采样旋钮。
- **链接**：https://github.com/NousResearch/hermes-agent/pull/121923

---

## 功能需求趋势

从近 24 小时 Issue/PR 中提炼社区最关注的方向：

1. **密钥脱敏与安全边界强化**：连续两份报告指出不同路径（memory-provider 同步、execute_code stdout 溢出）绕过 `redact_for_egress`。另有 #121934 暴露工具权限未在分派时强制，安全是当前社区焦点。
2. **桌面端体验打磨**：大量桌面端修复集中在计时器一致性、拖拽交互、菜单层级、错误提示准确性等领域，桌面应用已进入精细化阶段。
3. **MCP/工具信任机制完善**：#109818 指出 MCP 信任门持久化缺失；#122017 将技能注入 ACP 生态，开发者希望信任决策一次设置、长期生效。
4. **本地/边缘模型支持**：#122031 添加 AMD GPU VRAM 池化（hipInfo），本地模型方向热度持续。
5. **插件系统健壮性**：插件更新数据保留（#122007）、新插件目录扩展（#122043），生态建设与稳定性并重。

---

## 开发者关注点

- **高频痛点：桌面端行为不一致**
  计时器双时钟、子菜单被遮罩遮挡、启动失败无法关闭、/compress 缺失——桌面端仍有不少细节问题待收敛。

- **隐患：工具权限与密钥边界**
  toolsets 在 schema 层拦截但分派层不拦截、密钥通过外部 provider 泄出——这两类问题影响信任边界，应优先处理。

- **质量抱怨：Windows 与 macOS 平台差异**
  安装器 engines 冲突、WebSocket 会话拒绝、DEFAULT_INDICATOR_STYLE 导入错误、起点控件间距——平台兼容性修复多但零散，社区期待一次系统性的跨平台审计。

- **正向信号：P0/P1 修复动作迅速**
  插件数据保留、远端后端文件清空等 P0 修复快速落地，显示核心维护者对数据安全类问题响应积极。

---

*日报数据来源：github.com/NousResearch/hermes-agent 公开 Issue/PR/Release，生成时间 2026-09-25。*

:::
