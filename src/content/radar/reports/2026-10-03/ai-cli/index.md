---
title: "AI CLI 工具社区动态日报"
published: 2026-10-03
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-03

> 生成时间: 2026-10-03 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告

**数据窗口：2026-10-02 至 2026-10-03**


## 一、生态全景

当前 AI CLI 工具生态已从"功能竞赛"进入**"工程化深水区"**：一方面，插件/扩展体系（Claude Code 的 Mods、Hermes 的 Plugin Catalog、OpenCode 的 GUI Extensions）成为各家的核心战场，标志着工具正从"对话式 REPL"向"可编程的 Agent 运行时"演进；另一方面，**长会话成本治理、跨平台稳定性、会话持久化**三类"隐性工程质量"问题集中爆发，成为用户信任的主要侵蚀点。Windows/WSL 与桌面端几乎在所有工具中都是缺陷重灾区，而配额与计费透明度正在从"客服问题"升级为产品竞争力问题。安全边界（递归删除、沙箱逃逸、凭据泄露）在同日多份报告中同时出现，说明 Agent 自主执行能力已越过需要系统性护栏的临界点。


## 二、各工具活跃度对比

| 工具 | 更新 Issues | 更新 PR | Release 情况 | 社区热度特征 |
|---|---|---|---|---|
| **Claude Code** | 10+ 热点（含 stale 批量关闭 12+） | **1** | v2.1.288（稳定版） | 单线程极高热度（#91870 237 评论），PR 极度稀缺 |
| **OpenAI Codex** | 10 热点 | 10+（批量合入） | **7× alpha**（无 changelog） | Windows/VS Code 缺陷密集，PR 活跃 |
| **Gemini CLI** | **49**（口径为"更新"） | 10+ | v0.64.0-nightly | Issue 体量最大，P1 bug 集中复测 |
| **DeepSeek Reasonix** | 4 | **50**（更新） | v1.39.7 + Studio v2.26.0/v2.25.0 | PR 最活跃，安全议题突出 |
| **Deepseek Harness** | 0 | 0 | 无 | 静默 |
| **Hermes** | 2 | **50**（更新） | 无 | 插件目录爆发，Issue 少 |
| **OpenClaw** | 7 | **50**（更新） | v2026.8.35/34（extended-stable） | 长稳问题主导，双轨发布 |
| **OpenCode** | 10 热点 | 10+ | 无 | v2 Beta 反馈集中，计费话题热 |

> 数据说明：部分工具报告仅披露"热点/精选"条目，PR 数以报告声明口径为准；Codex 的 7 个 alpha 版本均无 changelog，实际变更不可观测。


## 三、共同关注的功能方向

### 1. 上下文与 Token 成本治理（全行业共识）🔥🔥🔥
- **Gemini CLI**：`@<dir>` 急切递归读取（#29617）、二进制误判为显式请求（#29457）、AST 感知读取提案（#22745）
- **OpenCode**：compaction 忽略模型配置（#44094）、prompt cache 命中率异常（#52761）
- **Claude Code**：图像驱逐导致全量上下文重缓存（#90716）、`/compact` 二次执行导致转录平方膨胀（#92089）
- **Codex**：MCP 结果与命令输出统一 64 KiB 裁剪（#50458、#50427）

**共性**：社区已不满足于"能压缩"，而是要求缓存可预测、裁剪有边界、配置被精确执行。

### 2. Agent / Subagent 生命周期可信度 🔥🔥
- **Gemini CLI**：subagent 耗尽轮次仍报 `GOAL success`（#22323）、generalist agent 永久挂起（#21409）
- **OpenClaw**：子代理完成消息静默丢失（#154299）、Rewind 清空会话绑定（#163871）
- **Codex**：Dot safety-pause 状态失同步，暂停期间继续自主执行（#49873）
- **Hermes**：跨网关 Bot 协作的控制权设计（#97681）

**共性**：用户核心痛点已从"能否运行"转向"能否判断到底发生了什么"——**状态可观测性是新的信任基石**。

### 3. 计费 / 配额透明度 🔥🔥
- **Claude Code**：Max 用户实际用量 16% 却报限流（#29579，8 个月未闭环）
- **OpenCode**：支付被拒（#45278，32 评论）、Go 套餐额度误扣（#52554）
- **Codex**：五小时额度异常、全局 reset 未生效、DOT 周额度不一致

**共性**：付费用户对"钱花在哪、额度剩多少"缺乏可信反馈，已形成**跨工具的信任危机苗头**。

### 4. 跨平台稳定性（Windows 为首）🔥🔥
- **Codex**：WSL 命令全失败（#49731）、sandbox ACL、桌面渲染崩溃
- **Claude Code**：Linux SIGSEGV（#89390）、Windows Cowork VM 死循环（#88921）
- **OpenCode**：Windows 大小写路径栈溢出（#52874）、后台子进程窗口
- **Reasonix**：Windows `Remove-Item -Recurse` 删除真实主目录（#11782）

### 5. 插件 / 扩展生态成熟度 🔥
- **Claude Code**：Mods 声明层与运行时严格对齐（#97293）、`$.ui.selection()` API
- **Hermes**：Plugin Catalog 密集新增（cron/memanto/vet402/council）
- **OpenCode**：npm 包子路径导出修复（#49863）、GUI 扩展生命周期原语（#52868）
- **Codex**：Connector 架构重构（#31471）、自定义 provider 能力覆盖（#50459）

### 6. 会话持久化与恢复一致性 🔥
- **Gemini CLI**：快速退出删除历史（#29584）、恢复时重复工具轮次（#29618）
- **OpenClaw**：macOS VM 重启后 SQLite receipt 身份不稳定（#163870）
- **OpenCode**：`/init` 与 `/review` 误用 worktree 根目录（#52833）


## 四、差异化定位分析

| 维度 | Claude Code | OpenAI Codex | Gemini CLI | OpenCode | OpenClaw | Reasonix | Hermes |
|---|---|---|---|---|---|---|---|
| **功能侧重** | Mods 可编程宿主、TUI 深度介入 | Rust 内核、Connector、Windows 生态 | Agent/Subagent 体系、AST/token 效率 | v2 Beta、插件生态、Go 订阅 | 网关/LTS 长稳、worker 化 | 安全护栏、Desktop/SDK 生命周期 | 插件目录、跨网关协作 |
| **目标用户** | 插件作者 + 高级 CLI 用户 | Windows/VS Code 重度用户 | 企业/沙箱部署、CI | 追求模型目录灵活性者 | 生产/企业网关运营 | 安全敏感团队 | 个人代理、社区插件开发者 |
| **技术路线** | 声明层-运行时-测试桩三段式（@poteat 主导） | 多 alpha 快速迭代 + 批量合入 | Nightly 节奏 + RFC 对齐（9207） | Effect 大版本升级、TS 严格化 | Rust sidecar 统一、主线程去同步化 | Go SDK 并发治理、AST 命令拦截 | Plugin SDK + Catalog 治理 |
| **发布节奏** | 小步快跑（稳定版） | 高速 alpha（不可观测） | 每日 nightly | 功能冻结、Beta 反馈期 | **双轨**（主线 + LTS） | 稳定版 + Studio 双线 | 无版本号、Catalog 驱动 |
| **核心风险** | PR 吞吐严重不足，Issue 积压 | alpha 无 changelog，变更不可审计 | Agent 状态可信度 | v2 静默失败、计费信任 | 长稳退化、僵尸进程 | Windows 递归删除、MCP 凭据泄露 | 安全扫描误报、记忆污染 |

**关键分化点**：
- **Claude Code vs Codex**：前者走"深度可编程 + 声明纪律"，后者走"高速迭代 + 平台覆盖"，但 Codex 的 alpha 无 changelog 是治理短板。
- **OpenClaw 是唯一明确双轨发布的工具**（extended-stable ≈ LTS），反映其已具备生产级运营意识。
- **Reasonix 与 Codex 在 Windows 安全护栏上都暴露出结构性缺陷**（递归删除 / 沙箱 ACL），但 Reasonix 已提交 AST 级拦截修复（#11786），响应更快。


## 五、社区热度与成熟度

### 热度分层（按 Issue 讨论深度 + PR 吞吐）

**第一梯队（高热度 + 高迭代）**
- **Gemini CLI**：49 条 Issue 更新为今日之最，P1 bug 集中复测，PR 侧高质量健壮性修复密集 → **迭代最快、问题最集中**
- **DeepSeek Reasonix / Hermes / OpenClaw**：PR 更新均达 50 条，但 Issue 基数小（2-7 条）→ **工程推进快于社区反馈，属"内部驱动型"**

**第二梯队（高热度 + 低吞吐）**
- **Claude Code**：#91870 单线程 237 评论、#29579 153 评论显示极高参与度，但 **24 小时仅 1 条 PR** → 社区热情与官方交付能力严重错配，是最大隐忧
- **OpenCode**：v2 Beta 反馈密集，计费议题发酵，但无版本发布 → **处于"冻结观察期"**

**第三梯队（平台期）**
- **OpenAI Codex**：7 个 alpha 但无 changelog，Issue 集中于 Windows/IDE，PR 批量合入 → **节奏快但透明度低**
- **Deepseek Harness**：零活动，需持续观察是否进入维护模式

### 成熟度信号
- **成熟标志**：OpenClaw 双轨发布、Claude Code 声明层版本协商纪律（#97293）、Gemini CLI 按 RFC 9207 对齐 OAuth
- **不成熟信号**：多数工具仍在"stale bot 批量关闭 issue"（Claude Code 今日 12+ 条）、alpha 无 changelog（Codex）、静默失败普遍存在


## 六、值得关注的趋势信号

### 信号 1：Agent 运行时正在取代 CLI 成为产品定义
Gemini CLI 的 `/skill-name` 非交互模式（#29546）、Codex 的 Connector 重构、Claude Code 的 Mods 声明层——**各工具都在把自己重新定义为"可编程的 Agent 运行时"**，而非交互式终端。对开发者的参考：**现在投入插件/Skill 开发是窗口期**，但需警惕 API 承诺漂移风险（参考 Claude Code 的保守门控策略）。

### 信号 2：长会话成本问题从"限流"转向"客户端实现缺陷"
Claude Code 的图像驱逐重缓存、OpenCode 的 prompt cache 低命中、Gemini CLI 的上下文膨胀——**用户感知的"订阅不够用"部分实为客户端缓存实现问题**。对技术决策者的参考：评估工具时应区分"服务端限流"与"客户端缓存效率"，后者可通过版本升级改善。

### 信号 3：安全护栏成为 Agent 自主性的硬约束
Reasonix 的递归删除真实主目录、Codex 的 safety-pause 失同步、Hermes 的 OAuth secret 扫描分级——**Agent 已越过"需要系统性护栏"的临界点**。对开发者的参考：在生产环境启用 Auto/YOLO 模式前，必须验证授权根目录校验、变量赋值失败处理、递归删除拦截三层护栏。

### 信号 4：会话状态可观测性是下一个竞争高地
Gemini CLI 的状态误报、OpenClaw 的消息静默丢失、Codex 的队列锁静默失败——**"不报错但行为不对"比崩溃更难排查**。对开发者的参考：优先选择提供会话诊断、subagent 轨迹可分享、失败可追溯的工具。

### 信号 5：Windows / WSL 已成"一等公民"缺陷区
Codex、Claude Code、OpenCode、Reasonix、Hermes 今日均报告 Windows/WSL 问题。对技术决策者的参考：**跨平台团队应将 Windows 支持成熟度纳入工具选型评估**，而非仅看 macOS/Linux 体验。

### 信号 6：stale bot 正在掩盖真实缺陷
Claude Code 今日批量关闭的 12+ 条包含"拒绝的工具调用仍被执行"（#83760）、"恶意域名资源拉取"（#84643）等安全条目。对社区的参考：**对自动关闭的 issue 保持追踪**，必要时重新提交并引用原编号。


**结论**：AI CLI 工具生态正处于"能力扩张快于稳定性收敛"的阶段。**插件生态的可编程深度**与**长会话成本/会话状态的可预测性**将决定下一阶段的分水岭。建议技术决策者关注三类指标：PR 吞吐量（反映官方响应能力）、alpha/nightly 的 changelog 完整度（反映工程治理）、以及跨平台 Issue 的闭环时效（反映生产就绪度）。

---
*报告生成：2026-10-03 · 基于 8 个工具的社区动态汇总*

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-10-03**  
说明：PR 评论数字段在给定数据中为 `undefined`，因此“热度”综合官方返回顺序、更新时间、关联 Issue 热度与修复必要性判断。

## 1. 热门 Skills 排行（PR）
| 排名 | Skill / PR | 功能与社区讨论热点 | 状态 |
|---|---|---|---|
| 1 | [#1298 skill-creator 触发评估修复](https://github.com/anthropics/skills/pull/1298) | 修复 trigger eval 误判、Windows 子进程 `select()` 失败、运行时失败被当作 non-trigger；直击技能评估可靠性问题 | OPEN |
| 2 | [#1742 mcp-builder 适配 mcp>=2](https://github.com/anthropics/skills/pull/1742) | 适配 `streamable_http_client` 重命名及自定义 headers；MCP 生态版本兼容是当前高频痛点 | OPEN |
| 3 | [#1771 proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 智能合约静态分析，并将审计证明锚定至 TON 链；Web3 + 安全审计垂直方向 | OPEN |
| 4 | [#1703 md2video-audio](https://github.com/anthropics/skills/pull/1703) | Markdown → Marp → MP4，带拟真人配音；内容视频化、零成本自动化 | OPEN |
| 5 | [#1245 Notion Spec + 量化简历审计](https://github.com/anthropics/skills/pull/1245) | 将 Notion 规格转为实现任务；量化简历审计；产品工作流与求职场景结合 | OPEN |
| 6 | [#1792 docx LibreOffice 超时修复](https://github.com/anthropics/skills/pull/1792) | `accept_changes.py` 超时不再误报成功，并校验 DOCX 修订标记；Office 文档处理可靠性 | OPEN |
| 7 | [#514 document-typography](https://github.com/anthropics/skills/pull/514) | 控制 AI 生成文档的孤词换行、寡行段落、编号错位；文档质量与排版规范 | OPEN |
| 8 | [#723 testing-patterns](https://github.com/anthropics/skills/pull/723) | 覆盖 Testing Trophy、单元测试、React 组件测试等完整测试栈；测试生成与质量保障 | OPEN |

## 2. 社区需求趋势
从 Issues 看，社区诉求已从“增加更多 Skill”转向“让 Skill 安全、可靠、可治理”。

- **安全与信任边界**：社区技能冒用 `anthropic/` 命名空间是最大争议，涉及权限提升与信任边界滥用。代表：[#492](https://github.com/anthropics/skills/issues/492)（43 评论）、[#1394](https://github.com/anthropics/skills/issues/1394)、[#1175](https://github.com/anthropics/skills/issues/1175)。
- **企业内分发与协作**：希望组织级共享 Skill 库，而不是手动下载、上传 `.skill` 文件。代表：[#228](https://github.com/anthropics/skills/issues/228)（16 评论，👍8）、[#189](https://github.com/anthropics/skills/issues/189)（插件重复）。
- **评估与触发可靠性**：`run_eval.py` 0% 触发率、benchmark 静默失败、mcp-builder 评测 0/N 等问题集中爆发。代表：[#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383)、[#1390](https://github.com/anthropics/skills/issues/1390)。
- **上下文与 Token 效率**：`claude-api` 单次注入约 156k token，以及 compact-memory 等符号化记忆方案受到关注。代表：[#1487](https://github.com/anthropics/skills/issues/1487)、[#1329](https://github.com/anthropics/skills/issues/1329)。
- **质量门禁与治理**：预任务校准、对抗审查、交付验证、破坏性操作防护等“治理型 Skill”开始出现。代表：[#1385](https://github.com/anthropics/skills/issues/1385)、[#412](https://github.com/anthropics/skills/issues/412)、[#1776](https://github.com/anthropics/skills/pull/1776)。
- **垂直工作流自动化**：Notion → 实现、HPC/Slurm、Web3 合约审计、E2E 测试、文档/ODT/PDF/视频/排版等方向需求明显。
- **测试与代码审查**：testing-patterns、AWT E2E 测试、reasoning quality gate 等 PR/Issue 显示，社区期待测试生成、代码审查与质量验证一体化。

## 3. 高潜力待合并 Skills
以下均为 OPEN，按最近更新、关联高热度 Issue、修复刚需筛选，近期落地概率较高。

| PR | 方向 | 高潜力理由 | 状态 |
|---|---|---|---|
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder mcp>=2 兼容 | 更新至 2026-09-29，修复 #1668，关联 MCP 评测热点 | OPEN |
| [#1681](https://github.com/anthropics/skills/pull/1681) | skill-creator 打包脚本修复 | 更新至 2026-09-27，解决 `package_skill.py` 直接执行失败 | OPEN |
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator trigger eval 修复 | 关联 #556/#1383，跨平台评估可靠性刚需 | OPEN |
| [#1730](https://github.com/anthropics/skills/pull/1730) | claude-api 死链修复 | 更新至 2026-10-02，风险低、易合并 | OPEN |
| [#1607](https://github.com/anthropics/skills/pull/1607) | claude-api 模型退役标记 | Fixes #1603，文档准确性维护 | OPEN |
| [#1792](https://github.com/anthropics/skills/pull/1792) | docx 超时与输出校验 | 更新至 2026-09-25，办公文档可靠性 | OPEN |
| [#1245](https://github.com/anthropics/skills/pull/1245) | Notion 规格转实现 + 简历审计 | 更新至 2026-09-30，双 Skill 工作流自动化 | OPEN |
| [#1771](https://github.com/anthropics/skills/pull/1771) | proofcore-contract-auditor | Web3 安全审计垂直场景，更新活跃 | OPEN |

## 4. Skills 生态洞察
**一句话总结：当前社区最集中的诉求，是让 Skills 从“功能集合”走向“可安全分发、可可靠评估、可治理执行”的基础设施。**

---

# Claude Code 社区动态日报 · 2026-10-03

> 数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 一、今日速览

1. **Mods 生态成为绝对主线**：v2.1.288 新增 `$.ui.selection()`，配合 Issue #91870（237 条评论、130 👍）以及 PR #97293，官方正围绕"可扩展性"密集迭代，社区已进入实测反馈阶段。
2. **配额与成本问题持续发酵**：Max 订阅用户遭遇 Rate limit（#29579，153 条评论）已持续半年未能闭环，成为社区情绪最集中的痛点；长会话中的图像驱逐导致全量上下文重缓存（#90716）也指向同类成本问题。
3. **平台稳定性问题抬头**：Linux SIGSEGV（#89390）、Windows Cowork 虚拟机死循环（#88921）、macOS worktree hook 路径错误（#88747）等多平台缺陷同日更新，跨平台可靠性仍是短板。

---

## 二、版本发布

### v2.1.288

**核心更新：**

- **Mods 新增 `$.ui.selection()` API**：返回用户在 fullscreen 模式下最近选中的文本；当选中内容位于同一转录行内时，一并返回该行对象。这为插件提供了"感知用户当前关注内容"的能力，是构建上下文感知型扩展的关键原语。
- **Cloud Sessions 内置 `gh api`**：对于镜像中未安装 GitHub CLI 的云会话，提供内置的 `gh api` 能力，并修复了内置组件的控制字符发送问题。这意味着云会话环境下调用 GitHub API 不再依赖外部二进制。

> 评价：本次更新延续"小步快跑"的 Mods 能力补齐路线，两个改动都直接服务于插件作者与云会话场景，而非终端用户可见功能。

---

## 三、社区热点 Issues（Top 10）

### 1. [#91870](https://github.com/anthropics/claude-code/issues/91870) — Mods：让 Claude 的可扩展性提升 10 倍
`OPEN` · enhancement / area:hooks / area:plugins · **237 评论 · 130 👍** · 作者 @poteat

**为什么重要**：这是当前社区体量最大的讨论线程，也是官方 Mods 项目的"主阵地"。维护者在此持续发布社区微更新（最新一条为 Oct 1, 2026 "We're live!"），并逐条消化反馈。评论数与点赞数双高，说明扩展性已成为 Claude Code 生态的核心诉求。

**社区反应**：极高热度，官方亲自下场维护，属于"产品级路线图讨论"而非普通 issue。

---

### 2. [#29579](https://github.com/anthropics/claude-code/issues/29579) — Max 订阅仍报 Rate limit，实际用量仅 16%
`OPEN` · bug / has repro / platform:windows / area:auth / area:api / platform:vscode · **153 评论 · 94 👍** · 作者 @CaptainDaredevil

**为什么重要**：从 2026-02-28 创建至今近 8 个月仍未关闭，涉及认证、API 限流、VS Code 集成三个领域。付费用户被误判限流直接影响可用性与信任度，是当前社区情绪最强的"老赖级"缺陷。

**社区反应**：长期高热度，评论数仅次于 Mods 主线程，属于典型的"反复复现但迟迟无解"问题。

---

### 3. [#37951](https://github.com/anthropics/claude-code/issues/37951) — 提供隐藏 Edit/Write 内联 diff 的选项
`OPEN` · enhancement / area:tui · **27 评论 · 99 👍** · 作者 @sjlee001

**为什么重要**：点赞数全榜第二（99），说明这是"沉默大多数"的强需求——文件编辑时的内联 diff 刷屏严重影响会话可读性，用户希望能用 `"showDiffs": false` 之类配置关闭。

**社区反应**：高赞低评论，典型的"共识明确、等待官方排期"型需求。

---

### 4. [#15148](https://github.com/anthropics/claude-code/issues/15148) — LSP 插件 `lspServers` 配置未被解析
`OPEN` · bug / has repro / platform:macos / area:tools / area:core · **23 评论 · 73 👍** · 作者 @giovannirco

**为什么重要**：`marketplace.json` 中定义的 `lspServers` 不会被加载，导致 typescript-lsp、pyright-lsp、gopls-lsp 等插件**装得上但完全不可用**。这直接切断了插件生态中"语言智能"这一整条能力链，是从 2025-12-23 就悬而未决的阻塞性缺陷。

**社区反应**：高赞且持续时间长，是插件系统可信度的关键卡点。

---

### 5. [#88747](https://github.com/anthropics/claude-code/issues/88747) — Worktree 写入绝对 `core.hooksPath`，导致子 worktree 执行主检出的 hooks
`OPEN` · bug / has repro / platform:macos / area:tools · **17 评论 · 1 👍** · 作者 @DearMaestro

**为什么重要**：一份技术含量很高的问题报告，作者已明确论证这不是 #27474 / #72714 / #85039 的重复。核心风险在于 Git hooks 的隔离被打破——**worktree 隔离是安全边界**，一旦子 worktree 执行主仓库 hooks，将带来非预期的代码执行路径。

**社区反应**：评论数可观，属于开发者深度用户才会踩到但后果较重的问题。

---

### 6. [#89390](https://github.com/anthropics/claude-code/issues/89390) — 2.1.243 在 Linux 启动即 SIGSEGV（空指针解引用）
`OPEN` · bug / has repro / platform:linux / area:packaging · **6 评论 · 12 👍** · 作者 @Heromachine

**为什么重要**：连 `claude --version` 都会崩溃，属于"完全不可用"级别的回归，且已定位到固定地址的 null deref，2.1.241 正常。对 Linux CI/容器场景影响尤为严重。

**社区反应**：评论不多但点赞/评论比高，说明沉默受害者为数不少。

---

### 7. [#92089](https://github.com/anthropics/claude-code/issues/92089) — 单进程内第二次 `/compact` 会重新追加已被压缩的历史，转录呈二次增长
`OPEN` · bug / has repro / platform:macos / area:core · **6 评论** · 作者 @thomasbachem

**为什么重要**：`/compact` 本是长会话的救命稻草，这里却因 `compact_boundary` 处理不当导致转录文件**平方级膨胀**，与 #90716 的图像驱逐缓存失效问题一起，构成"长会话成本失控"的组合问题。

---

### 8. [#99008](https://github.com/anthropics/claude-code/issues/99008) — Cowork 中输入含失败 `!`cmd`` 的 `/skill` 会静默挂起云会话
`OPEN` · bug / has repro / area:cowork / area:skills / area:plugins · **3 评论** · 作者 @yaniv-golan

**为什么重要**：今日新报的交互式缺陷（对应无头版本 #87159）。技能执行失败时**没有报错、没有超时、没有提示**，直接静默挂死会话，属于典型的可观测性缺失，对云端协作场景体验破坏极大。

---

### 9. [#98986](https://github.com/anthropics/claude-code/issues/98986) — Mods：让插件能够感知或接管 AbovePrompt 折叠带（`[-]` 标记）
`OPEN` · enhancement / area:tui / area:plugins · **1 评论** · 作者 @PieroAlvarez

**为什么重要**：与 v2.1.288 的 `$.ui.selection()` 一脉相承，反映插件作者正在要求更细粒度的 TUI 介入能力——不只是"读"界面状态，还希望"接管"界面行为。这是 Mods 能力边界讨论的前沿。

---

### 10. [#99095](https://github.com/anthropics/claude-code/issues/99095) — 桌面端需要可配置的回车键行为（多行输入）
`OPEN` · feature request · **1 评论** · 作者 @leerho

**为什么重要**：报告同时指出两个问题：桌面端缺少 CLI 已有的"回车换行 / Cmd+Enter 发送"配置；以及 **CLI 与桌面端切换时上下文丢失**（transcript 文件存在但桌面仅显示 CLI 之前的消息）。后者若成立，属于比快捷键更严重的会话一致性问题。

---

### 其他值得留意的条目

| Issue | 标签 | 要点 |
|---|---|---|
| [#97182](https://github.com/anthropics/claude-code/issues/97182) | `CLOSED` bug / area:model | 用户需重复三次明确指令才被执行，模型指令遵循问题（已关闭） |
| [#97913](https://github.com/anthropics/claude-code/issues/97913) | bug / area:tui | `/model` 中 "Default (recommended)" 重启后显示的是用户保存的选择，语义误导 |
| [#99071](https://github.com/anthropics/claude-code/issues/99071) | bug / area:plugins | 启动提示推荐 `cc-plugin-you-should-know@builtin`，但该插件实际不可安装 |
| [#98971](https://github.com/anthropics/claude-code/issues/98971) | bug / area:desktop | Windows 桌面端 Composer 幽灵文本提示自 10-02 起消失，设置仍为开启 |
| [#88921](https://github.com/anthropics/claude-code/issues/88921) | bug / area:cowork | CoworkVMService 卡在静默连接/断开循环，VM 创建永不完成 |
| [#90677](https://github.com/anthropics/claude-code/issues/90716) / [#90716](https://github.com/anthropics/claude-code/issues/90716) | bug / area:cost | 长会话图像驱逐改变会话前缀，每次读图都触发全量上下文重缓存 |

> ⚠️ 注意：今日有大量 `stale` 标签的 issue 被批量关闭（#83937、#83933、#83760、#84010、#84858、#84864、#84643、#84076、#84082、#84012、#83975、#83982 等），集中在 area:desktop / area:ide，多为 Windows/macOS 桌面端问题。建议关注其中是否有被"误杀"的有效缺陷。

---

## 四、重要 PR 进展

> **说明**：过去 24 小时内更新的 PR **仅 1 条**，无法凑足 10 条。以下如实呈现该 PR，并补充其代表的开发方向。

### [#97293](https://github.com/anthropics/claude-code/pull/97293) — mods：声明层携带 `process.run` 截断标志与 `fs.list` 条目的 `mtimeMs`
`OPEN` · 作者 @poteat · 更新 2026-10-02

**内容**：Mods 的类型声明（declarations）开始携带 `$.process.run` 结果上的 `isStdoutTruncated` / `isStderrTruncated` 字段，以及 `$.fs.list` 条目上的 `mtimeMs`。PR 作者采取**保守的启用策略**：只有当已发布的 npm CLI 真正返回这两个字段后才激活相应声明与测试桩，避免声明向插件作者"承诺 SDK 尚未提供的能力"。

**为什么值得关注**：
- 体现了 Mods 项目的**版本协商纪律**——声明层与运行时能力严格对齐，避免 API 承诺漂移。
- `isStdoutTruncated` / `isStderrTruncated` 对插件作者意义重大：此前无法判断 `process.run` 输出是否被截断，容易在日志分析、构建输出解析类插件中产生静默错误。
- `mtimeMs` 为文件监听、增量索引类插件提供基础能力。

**趋势解读**：由 @poteat 同时主导 #91870 与 #97293，可确认 Mods 目前处于"运行时能力 → 类型声明 → 测试桩"三段式推进的工程化落地阶段，而非停留在设计讨论。

---

## 五、功能需求趋势

从今日全部 Issue 中可提炼出以下六条主线：

### 1. Mods / 插件可扩展性（最热）🔥🔥🔥
- 代表性：#91870（237 评论）、#98986、#97293、v2.1.288 的 `$.ui.selection()`
- 社区诉求已从"能否扩展"进入**"扩展能触达多深"**：从读取选择内容，到感知/接管 TUI 折叠行为，到 `process.run` 截断状态与文件 mtime。插件作者正在把 Claude Code 当作一个**可编程的编辑器宿主**来要求。

### 2. 上下文与成本治理 🔥🔥
- 代表性：#90716（图像驱逐导致全量重缓存）、#92089（`/compact` 二次执行导致转录平方增长）、#84012（`cache_control.ttl` 排序错误，已关闭）
- 长会话场景下，**缓存失效与转录膨胀**正在侵蚀实际配额。用户对"订阅了却不够用"的感知，一部分并非限流策略问题，而是客户端缓存实现问题。

### 3. 配额 / 认证可信度 🔥🔥
- 代表性：#29579（16% 用量被限流，8 个月未解）
- 付费用户与 API 实际状态不一致，是**信任类问题**，优先级应高于普通功能缺陷。

### 4. 桌面端与 CLI 的能力对齐 / 会话一致性 🔥
- 代表性：#99095（回车键行为、切换后上下文丢失）、#98971（幽灵文本消失）、#81364（开机自启不持久）、#84858（重启后历史消失）
- 桌面端正成为短板集中区：设置不持久、上下文不同步、功能比 CLI 少。**"同一会话跨端连续"**已成为明确诉求。

### 5. 跨平台稳定性与打包 🔥
- 代表性：#89390（Linux SIGSEGV）、#83982（Windows Bun 语法错误）、#88921（Windows Cowork VM）、#88747（macOS worktree hooks）
- 涉及 Bun 运行时、MSIX 打包、VM 服务、worktree 隔离多个层面，说明客户端形态快速扩张（CLI / VS Code / Desktop / Cowork / Cloud）已超出稳定性维护的节奏。

### 6. IDE / 语言智能集成 🔥
- 代表性：#15148（lspServers 未解析）、#80004/#84864（VS Code 60s 初始化超时误报认证错误）
- LSP 插件链路断裂是**生态级阻塞**：没有 LSP，Claude Code 在类型系统、跨文件重构上的表现会明显逊于专业 IDE。

---

## 六、开发者关注点

### 核心痛点（按紧迫度排序）

| 优先级 | 痛点 | 相关 Issue | 影响面 |
|---|---|---|---|
| 🔴 高 | **付费却被限流**，用量显示与实际不符 | #29579 | 全体付费用户 |
| 🔴 高 | **LSP 插件配置不生效**，语言智能整条链路失效 | #15148 | 插件生态 |
| 🔴 高 | **长会话成本失控**（缓存反复失效、转录膨胀） | #90716、#92089 | 重度使用者 |
| 🟠 中 | **插件失败静默挂起**，无错误无超时 | #99008 | 云端/Cowork 用户 |
| 🟠 中 | **TUI 输出噪声**（内联 diff 无法关闭） | #37951（99 👍） | 全体 CLI 用户 |
| 🟠 中 | **跨平台崩溃与启动失败** | #89390、#83982、#88921 | Linux/Windows |
| 🟡 中 | **桌面端设置不持久、跨端上下文丢失** | #81364、#99095、#98971 | 桌面端用户 |
| 🟡 中 | **worktree 隔离边界被破坏**（hook 路径逃逸） | #88747 | Git 深度用户 |
| 🟡 低 | **默认行为语义误导**（`/model` Default 显示保存值） | #97913 | 普通用户 |
| ⚪ 低 | **官方指引指向不可用资源** | #99071 | 新用户 |

### 值得警惕的信号

1. **Stale bot 大面积关闭桌面端 issue**。今日关闭的 12+ 条中，包含"拒绝的工具调用仍被执行"（#83760）、"VS Code 有效 token 却误报认证失败"（#84864）、"从恶意域名拉取资源"（#84643）等**安全性或高影响**条目。自动关闭会掩盖尚未修复的真实缺陷，建议社区持续追踪或重新提交。
2. **声明与运行时不同步的风险已被官方识别**。PR #97293 的保守门控策略值得肯定——插件 API 一旦承诺却未兑现，会直接摧毁开发者信任，代价远高于延迟发布。
3. **可观测性缺口普遍存在**。从 #99008 的静默挂起，到 #83933 的 bridge 状态码 4090、#83975 的 MCP 断连后段错误，插件/服务失败时的**诊断信息严重不足**，是下一个需要系统性投入的方向。

---

*日报生成时间：2026-10-03 · 数据窗口：过去 24 小时*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-10-03）

## 1. 今日速览

今日 Codex 仓库连续发布 7 个 `rust-v0.162.0-alpha` 预发布版本，但 Release Note 仅包含版本号，未披露具体变更。社区焦点集中在 Windows/WSL 与 VS Code 扩展稳定性：WSL 命令执行失败、队列消息锁异常、重启后旧提示重放，以及 Windows 桌面端渲染崩溃/启动卡死成为高频问题。PR 侧则有大量批量合入，重点涉及历史持久化裁剪、MCP/命令输出限流、自定义 provider 能力、Windows sandbox 清理和 Connector 架构重构。

---

## 2. 版本发布

过去 24 小时发布 7 个 Rust 组件 alpha 版本，均属于 `0.162.0-alpha` 预发布通道：

| 版本 | 链接 |
|---|---|
| rust-v0.162.0-alpha.8 | https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.8 |
| rust-v0.162.0-alpha.7 | https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.7 |
| rust-v0.162.0-alpha.6 | https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.6 |
| rust-v0.162.0-alpha.5 | https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.5 |
| rust-v0.162.0-alpha.4 | https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.4 |
| rust-v0.162.0-alpha.3 | https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.3 |
| rust-v0.162.0-alpha.2 | https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.2 |

> 注：以上 Release Note 均未提供 changelog，暂无法判断具体功能或修复内容。

---

## 3. 社区热点 Issues

1. **#49731 Windows App + WSL：所有命令执行失败**  
   报错 `Failed to create unified exec process: No such file or directory`，疑似 Windows exec-server 删除了 arg0 helper 目录。18 条评论、9 个 👍，属于 Windows/WSL 核心执行链故障。  
   https://github.com/openai/codex/issues/49731

2. **#49968 VS Code 扩展：follow-up prompt 卡队列，重启后旧 prompt 被重新执行**  
   影响 `26.928.31416`，17 条评论、17 个 👍，是近期 IDE 扩展中社区反响最强的问题之一。  
   https://github.com/openai/codex/issues/49968

3. **#49834 VS Code 扩展：undefined fetch response 导致 JSON parse error，队列消息 send-lock 释放失败**  
   16 条评论，和 #50403、#50404 属于同一类消息队列/锁异常，影响消息发送可靠性。  
   https://github.com/openai/codex/issues/49834

4. **#48938 Windows 桌面端：渲染进程反复崩溃、白屏重载、严重输入延迟**  
   更新到 `26.924.2738.0` 后出现，14 条评论。付费 Pro 用户明确表达强烈不满，影响高强度并发工作流。  
   https://github.com/openai/codex/issues/48938

5. **#24550 Responses WebSocket 在 compacted replacement_history 包含大内联图片时回退**  
   14 条评论，长期未关闭。涉及上下文压缩、WebSocket 回退和 CLI 大负载场景，属于性能与连接层深水区问题。  
   https://github.com/openai/codex/issues/24550

6. **#49477 Windows Native：durable-task follow-up 因 AbsolutePathBuf 和混合路径失败**  
   8 条评论。任务初始 turn 可完成，但后续 turn 无法启动，涉及路径序列化和权限 profile 关联。  
   https://github.com/openai/codex/issues/49477

7. **#49873 Dot safety-pause 状态失同步：安全暂停期间自主执行继续，人工控制/恢复被阻塞**  
   4 条评论，但属于安全边界问题。用户使用 ChatGPT Pro，涉及自动化执行与人类接管机制失效。  
   https://github.com/openai/codex/issues/49873

8. **#18778 功能请求：像浏览器标签一样在顶部展示活动运行标签**  
   7 条评论、11 个 👍。反映并发工作流中用户对运行上下文可见性的强需求。  
   https://github.com/openai/codex/issues/18778

9. **#46380 Windows elevated sandbox：升级后在之前锁定的 .sandbox-bin ACL 上重新 provision 失败**  
   7 条评论。影响 Windows sandbox 升级和权限修复流程，属于安装/权限类高频痛点。  
   https://github.com/openai/codex/issues/46380

10. **#50403 VS Code 扩展：queued messages 静默发送失败，`Failed to release queued message send lock`**  
    新报问题，5 条评论。与 #49834、#50404 高度相关，表现为 `SyntaxError: "undefined" is not valid JSON`，说明队列锁问题仍在扩散。  
    https://github.com/openai/codex/issues/50403

---

## 4. 重要 PR 进展

1. **#50459 为自定义模型 provider 增加能力覆盖**  
   允许 Responses-compatible provider 配置 `external_web_access`、`remote_compaction` 等能力，提升第三方/自定义模型接入灵活性。  
   https://github.com/openai/codex/pull/50459

2. **#50458 在分页线程历史中截断超大 MCP 结果**  
   对持久化的 MCP 工具结果应用 64 KiB 预览预算，避免多 MB 级 payload 进入历史记录。  
   https://github.com/openai/codex/pull/50458

3. **#50427 将分页历史中持久化的命令输出限制在 64 KiB**  
   对 completed command 的 `aggregated_output` 做裁剪，控制历史膨胀。  
   https://github.com/openai/codex/pull/50427

4. **#50446 将 rollout 附件打包为 gzip tar**  
   将文件型 rollout 和缓冲前缀合并为 `rollouts.tar.gz`，同时保留诊断附件，优化上传体积。  
   https://github.com/openai/codex/pull/50446

5. **#50437 增加卸载旧版 Windows sandbox 的 CLI 命令**  
   新增 `codex sandbox uninstall`，用于清理机器级 legacy Windows sandbox 账户和网络规则。  
   https://github.com/openai/codex/pull/50437

6. **#50433 允许 API-key 账户在 TUI 中使用 Daybreak**  
   使用 OpenAI provider API key 的账户可访问 `/daybreak` 和 Daybreak policy notices。  
   https://github.com/openai/codex/pull/50433

7. **#50434 为 owned transcript 增加键盘复制选择**  
   `/copy` 可直接选择最新完成响应，支持方向键、`j/k`、`g/G`、Enter 复制、Esc 退出。  
   https://github.com/openai/codex/pull/50434

8. **#50442 在线程 usage 响应中保留原生 USD 金额**  
   增加可选 `native_usage_usd_micros`，让用量展示更准确，避免仅依赖 credit/估算 USD。  
   https://github.com/openai/codex/pull/50442

9. **#50418 在 failed Responses 事件中遵循 Retry-After 头**  
   解析 `response.error.headers` 中的嵌套 `Retry-After`，避免忽略服务端重试建议或使用冲突延迟。  
   https://github.com/openai/codex/pull/50418

10. **#31471 [faster-connectors] 将 apps cache 逻辑抽取到 ConnectorRuntimeManager**  
    以 account、ChatGPT user、workspace-account mode、Codex home 为维度作用域化 runtime context，属于 Connector 架构重构的重要一步。  
    https://github.com/openai/codex/pull/31471

---

## 5. 功能需求趋势

- **Windows/WSL 稳定性与兼容性**：WSL 执行失败、路径序列化、sandbox ACL、启动卡死/白屏等问题集中爆发。
- **IDE 扩展可靠性**：VS Code 队列消息、send-lock、重启恢复、JSON 解析、认证/限流状态是最高频方向。
- **桌面端性能与渲染稳定性**：渲染进程崩溃、输入延迟、语音/图片提交导致无响应等问题突出。
- **限流与用量透明度**：五小时额度异常下降、全局 reset 未生效、DOT 周额度显示不一致，用户要求更清晰解释。
- **DOT/Cloud/本地线程互操作**：Dot 无法恢复本地任务、云线程读取 placement format 失败，跨执行环境协调仍是短板。
- **并发工作流上下文可见性**：显示活动运行标签、恢复执行上下文可见性成为明确功能请求。
- **模型上下文与 provider 能力配置**：本地 override 与 Cloud 线程不一致，自定义 provider 能力需要可配置。
- **MCP/Connector 与大负载治理**：超大 MCP 结果、命令输出持久化、rollout 附件打包，说明大上下文和存储优化正在推进。

---

## 6. 开发者关注点

- **Windows 平台问题高度集中**：WSL 命令执行、sandbox 权限、路径反序列化、Windows 桌面启动/渲染问题占据大量高评论 Issue。
- **VS Code 扩展消息队列可靠性**：队列锁释放失败、`undefined` JSON 解析错误、重启后消息重放，已经形成多个重复报告。
- **配额与限流透明度不足**：开发者对五小时额度、周额度、全局 reset 的实际生效状态缺乏信任，需要更明确的审计和状态展示。
- **安全暂停与人工接管机制**：Dot safety-pause 状态失同步属于高风险问题，社区要求确保暂停后不会继续自主执行。
- **诊断与恢复能力**：大量错误信息不够明确，例如 `AbsolutePathBuf`、placement format、send-lock 等，开发者需要更可读日志和状态恢复路径。
- **大输出治理成为共识**：MCP 结果、命令输出、rollout 附件都在做 64 KiB 级别裁剪或压缩，说明历史持久化体积已影响性能和上传。
- **并发工作流体验需要增强**：用户不仅需要功能可用，还需要清楚知道哪些任务在运行、运行在哪个执行上下文、如何切换和恢复。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报
**日期：2026-10-03**

---

## 1. 今日速览

今天 Gemini CLI 继续以 nightly 节奏推进，核心修复集中在**会话状态持久化、恢复一致性与 OAuth 安全校验**三类问题上。社区端，**subagent 生命周期管理**（误报成功、generalist agent 卡死、skills/subagent 触发不足）依然是讨论最密集的话题，多条 P1 bug 在持续复测中。PR 侧则涌现出一批高质量的健壮性修复（会话恢复去重、目录引用懒加载、web 搜索超时等）。

---

## 2. 版本发布

### v0.64.0-nightly.20261002.gc9096a847

本次 nightly 包含两项稳定性修复：

- **fix(core): ChatRecordingService 引入 append-only 增量补丁与有界历史窗口**
  ([PR #29568](https://github.com/google-gemini/gemini-cli/pull/29568))
  通过只追加（append-only）增量方式记录会话，并给历史窗口设置上限，缓解长会话下的内存与记录膨胀问题。

- **fix(cli): 状态原子化持久化并在损坏时从备份恢复**
  提升 CLI 状态文件在异常中断场景下的可靠性，避免状态损坏导致会话不可用。

---

## 3. 社区热点 Issues

> 按优先级、讨论热度与影响面综合挑选 10 条。

### 🔴 #22323 [P1] Subagent 超限后被误报为 "GOAL success"
[链接](https://github.com/google-gemini/gemini-cli/issues/22323) | 评论 13 👍 2
`codebase_investigator` 子代理在耗尽最大轮次（MAX_TURNS）后，仍返回 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了本次中断。**这是整个 subagent 体系中信任度最关键的一条 bug**——用户无法区分“真完成”与“被截断”。评论数最多，说明复现广泛。

### 🔴 #21409 [P1] Generalist agent 永久挂起
[链接](https://github.com/google-gemini/gemini-cli/issues/21409) | 评论 8 👍 8
一旦 CLI 委派给 generalist agent，连"创建文件夹"这类简单操作也会无限挂起（用户等待长达 1 小时）。显式禁止委派子代理即可绕过。**👍 数最高，用户痛点强烈。**

### 🔴 #21983 [P1] Browser subagent 在 Wayland 下失败
[链接](https://github.com/google-gemini/gemini-cli/issues/21983) | 评论 4 👍 1
Linux Wayland 会话下浏览器子代理直接报告 `Termination Reason: GOAL` 但实际未完成。对 Linux 桌面用户影响较大。

### 🔴 #22186 [P1] get-shit-done 输出钩子导致崩溃
[链接](https://github.com/google-gemini/gemini-cli/issues/22186) | 评论 3
输出摘要打印阶段崩溃退出，属高危稳定性问题。

### 🟠 #19873 [P2] 通过零依赖 OS 沙箱 + 后置意图路由释放 bash 能力
[链接](https://github.com/google-gemini/gemini-cli/issues/19873) | 评论 9 👍 1
提出让 Gemini 3 原生以 `grep/cat/sed/awk` 等 POSIX 工具链完成代码探索与编辑，同时用 OS 级沙箱保证安全。**这是模型能力与安全 UX 结合的方向性提案，代表官方路线图思路。**

### 🟠 #22745 [P2] AST 感知的文件读取 / 搜索 / 代码库映射评估
[链接](https://github.com/google-gemini/gemini-cli/issues/22745) | 评论 7 👍 1
EPIC 级提案，探索用 AST 精准读取方法体边界、减少错位读取与 token 噪音。关联 #22746、#22747（AST grep / tilth / glyph）。属于**长期 token 效率优化的核心议题**。

### 🟠 #21968 [P2] Gemini 几乎不主动使用 skills 和 sub-agents
[链接](https://github.com/google-gemini/gemini-cli/issues/21968) | 评论 7
用户反馈：除非显式指令，模型几乎从不主动调用自定义 skills（如 gradle/git）和子代理。**这说明 skill 触发机制与模型偏好之间存在断层**，直接影响自定义能力体系的实用价值。

### 🟠 #22267 [P2] Browser Agent 忽略 settings.json 覆盖
[链接](https://github.com/google-gemini/gemini-cli/issues/22267) | 评论 4
`AgentRegistry` 正确合并了配置，但 Browser Agent 执行时未生效（如 `maxTurns`）。典型的“配置双源不一致”问题。

### 🟠 #24246 [P2] 工具数 >128 时报 400 错误
[链接](https://github.com/google-gemini/gemini-cli/issues/24246) | 评论 3
工具规模较大（MCP 扩展丰富）的用户会直接命中 API 报错，缺少自动裁剪/范围限制逻辑。

### 🟠 #22672 [P2] Agent 应阻止破坏性操作
[链接](https://github.com/google-gemini/gemini-cli/issues/22672) | 评论 3 👍 1
模型在复杂 git 操作中偶发使用 `git reset` / `--force`；维护数据库等资源时缺乏风险意识。**安全护栏方向的代表性问题。**

---

## 4. 重要 PR 进展

> 挑选 10 条对稳定性、安全性、性能与功能面影响最大的 PR。

### 🔧 #29617 [P1] 目录引用 `@<dir>` 不再急切递归读取
[链接](https://github.com/google-gemini/gemini-cli/pull/29617)
`atCommandProcessor.ts` 中目录引用改为解析为相对工作区路径，不再展开 `**` 递归——**直接缓解大仓库下的上下文膨胀**。

### 🔧 #29618 [P1] 恢复会话时避免重复的工具响应轮次
[链接](https://github.com/google-gemini/gemini-cli/pull/29618)
`convertSessionToClientHistory` 在重建历史时会重放已记录的用户 `functionResponse` 轮次，导致重复。修复后恢复画面的对话历史将正确一致。

### 🔧 #29616 [P1] OAuth 回调 `iss` 校验对齐 RFC 9207
[链接](https://github.com/google-gemini/gemini-cli/pull/29616)
按 RFC 9207 与 MCP 授权规范的要求，仅在授权服务器元数据声明支持时强制校验 `iss` 参数——**安全性与兼容性兼顾的改动**。

### 🔧 #29584 [P1] 修复快速退出导致恢复会话历史被删除
[链接](https://github.com/google-gemini/gemini-cli/pull/29584)
恢复会话后立刻 `Ctrl+C` / `/exit` 会永久删除磁盘上的历史文件，属**数据丢失级修复**，关联 #29198。

### 🔧 #29582 [P1] core 忽略过滤性能优化 + 子树剪枝
[链接](https://github.com/google-gemini/gemini-cli/pull/29582)
引入目录级状态记忆、通配符目录模式展开剪枝、符号链接/realpath 内存缓存。**在大型仓库上消除数秒级阻塞**（关联 #29077）。

### 🔧 #29457 [P1] read-many-files 用 glob 匹配替换模糊字符串逻辑
[链接](https://github.com/google-gemini/gemini-cli/pull/29457)
原用 `String.includes()` 判断文件是否"被显式请求"，导致图片/PDF/音频等二进制资源误判为显式请求，引发严重上下文膨胀。

### 🔧 #29608 [P1] Web 搜索 / WebFetch 增加 30 秒超时
[链接](https://github.com/google-gemini/gemini-cli/pull/29608)
底层 LLM 调用不返回时，agent 循环会永久停留在 `Thinking...`（用户报告挂起 30+ 分钟）。修复后自动超时退出。

### 🔧 #29612 强制 terminal user turn 不变量并规范化请求内容
[链接](https://github.com/google-gemini/gemini-cli/pull/29612)
确保发往 `generateContentStream` 的历史始终以合法 user turn 结尾（非空 content parts），覆盖 `/rewind`、流中断等边界场景。

### 🔧 #29611 支持点分 Gemini 3 模型与别名的多模态函数响应
[链接](https://github.com/google-gemini/gemini-cli/pull/29611)
修复 `gemini-3.8-flash` 等模型下 `read_file` 图片输出被作为非法 sibling parts 触发的 HTTP 错误。

### ✨ #29546 [P2] 非交互模式支持 `/skill-name` 激活 skill
[链接](https://github.com/google-gemini/gemini-cli/pull/29546)
注册 `SkillCommandLoader` 到非交互 slash 命令路径，并处理 `tool` 动作结果——**脚本化 / CI 场景下使用 skills 的关键补齐**。

> 其他值得留意：#29597（gVisor/runsc 沙箱 IPC 回退）、#29607（nightly eval 无报告时显式失败）、#29482（可选"快速决策门"加速短消息）。

---

## 5. 功能需求趋势

从本期 49 条更新 Issue 中提炼出的社区方向：

| 方向 | 代表 Issue | 关注点 |
|---|---|---|
| **Subagent / Agent 体系成熟度** | #22323 #21409 #21983 #21763 #22741 #22598 | 生命周期管理、状态上报准确、可在后台运行、轨迹可分享 |
| **上下文与 Token 效率** | #19561 #22745 #22746 #22747 #29457 | AST 感知读取、surgical reads、减少"火焰管式"文件读取 |
| **Skill / 自定义能力触发** | #21968 #29546 | 模型主动使用 skills、非交互模式支持 |
| **安全护栏与权限控制** | #19873 #22672 #18397 | 沙箱化 bash、破坏性命令拦截、按工作区策略 |
| **配置一致性** | #22267 #20079 | settings.json 生效范围、符号链接识别 |
| **持久化任务追踪** | #18836 #21000 | 用文件式 CRUD 取代 WriteToDo，避免 context rot |
| **多代理协作** | #18287 #20195 | 共享内存、并行 subagent 协作（目前被阻塞） |
| **CLI 自省能力** | #21432 | 模型能准确回答自身的 CLI flags / 热键 |
| **终端渲染体验** | #21924 | 窗口缩放无闪烁、迁移至 RenderStatic |
| **扩展规模上限** | #24246 | 工具数过多时自动收窄作用域 |

---

## 6. 开发者关注点

综合评论与 PR 证据，当前开发者反馈集中在以下几点：

1. **Agent 状态可信度是第一痛点。** 无论是 subagent 报"GOAL 成功"（#22323）、generalist agent 永久挂起（#21409），还是 Wayland 下 browser subagent 静默失败（#21983），本质都是**用户无法从日志与状态中判断"到底发生了什么"**。这与 #21763（`/bug` 不包含 subagent 上下文）、#22598（`/chat share` 看不到 subagent 轨迹）形成同一条诉求链。

2. **上下文卫生（context hygiene）需求强烈。** `@<dir>` 急切递归（#29617）、二进制文件误判为显式请求（#29457）、临时脚本散落（#23571）、`\n` 转义处理简陋（#22466）——都是同一类"代理把无关内容灌进上下文"的问题。

3. **数据丢失与状态损坏零容忍。** 快速退出删历史（#29584）、状态文件损坏（nightly 修复）、会话恢复重复工具轮次（#29618）表明**会话持久化层正处于集中打磨期**，建议开发者升级到最新 nightly 验证。

4. **企业 / 沙箱部署场景浮出水面。** gVisor / runsc 下 IPC 通信失败（#29597）、OAuth `iss` 参数严格校验（#29616）说明 Gemini CLI 正在进入更严格的安全与合规部署环境。

5. **非交互 / CI 使用是明确的增长面。** `/skill-name` 在非交互模式下可用（#29546）、ACP `session/load` 修复（#29368）都指向同一方向——开发者希望把 Gemini CLI 当作**可编程的 agent 运行时**，而不只是交互式 REPL。

---

*数据来源：[github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) · 生成于 2026-10-03*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报（2026-10-03）

> 数据来源：github.com/esengine/DeepSeek-Reasonix  
> 统计窗口：过去 24 小时更新

## 1. 今日速览

- Reasonix 发布稳定版 **v1.39.7 / Desktop v1.39.7**，集中修复桌面端会话用量统计清零、长轮次历史分页、远端会话切换、分叉会话和迁移后会话消失等问题。
- **Studio v2.26.0 / v2.25.0** 继续补终端连接、队列、YOLO 模式与子代理记录，并修复启动失败、DeepSeek 请求连接错误、Windows 远端项目、存储迁移丢清单等问题。
- 安全与数据丢失成为社区焦点：Windows 下 agent 递归删除真实用户主目录、MCP endpoint 凭据仍可能在显示/预览/导出中泄露，相关修复 PR 已提交。

## 2. 版本发布

### v1.39.7 / desktop-v1.39.7（稳定版）

- 桌面端修复：会话用量统计清零、长轮次历史分页、远端会话切换、分叉会话和编辑目标。
- 部分修复迁移后会话消失问题。
- GitHub Releases：https://github.com/esengine/DeepSeek-Reasonix/releases  
- 完整更新日志：https://reasonix.io/changelog/v1.39.7/

### studio-v2.26.0

- 终端界面补齐 1.x 的连接引导、排队与引导命令、设置命令和 YOLO 模式。
- 设置中新增社区与贡献者入口。
- 修复已保存默认模型不在配置中时 Studio 启动失败、DeepSeek 请求偶发连接错误、子代理状态一直显示运行中。
- 新增：无可用密钥时启动即打开「配置连接」面板，支持 `/setup`、`/auth`、连接筛选、密钥掩码、Ctrl+T 测试、Enter 保存，以及 `/queue`、`/steer`、`/takeover`、`/status`、`/expor...` 等命令。
- GitHub Releases：https://github.com/esengine/DeepSeek-Reasonix/releases

### studio-v2.25.0

- 新增子代理记录入口、文件管理器菜单、MCP 外部步骤经同意的 URL 征询。
- 修复 Windows 远端打不开项目、存储迁移丢项目清单、引导按钮点不到、远端 nvm 安装的 npm 找不到、模型因上下文提示提前停手、底部栏数字跳动等问题。
- GitHub Releases：https://github.com/esengine/DeepSeek-Reasonix/releases

## 3. 社区热点 Issues

> 过去 24 小时内更新的 Issue 共 4 条。以下全部列出；数量不足 10 条，未做虚构补充。

1. **#11782 [OPEN] Windows 下 `Remove-Item -Recurse -Force $home` 递归删除真实用户主目录**  
   重要性：极高危数据丢失问题。Reasonix Studio 2.25.0 在 Windows + pwsh 7.6.6 下，agent 生成“隔离 HOME 复跑 CLI”命令，但 `$home` 只读自动变量赋值失败后命令继续执行，最终递归删除真实用户主目录。涉及 agent 安全边界、Windows shell、Auto/YOLO 审批。  
   社区反应：评论 1，👍 0，仍为 OPEN。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11782

2. **#11769 [CLOSED] Studio 有新版本未更新时登录状态错误**  
   重要性：影响 Studio 登录态一致性。主界面显示问好头像，设置 tab 显示已登录，但内容区实际未登录，点击登录无反应，无法查看反馈历史。通过 Studio feedback 提交，环境为 v2.26.0。  
   社区反应：评论 1，👍 0，已关闭。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11769

3. **#11473 [CLOSED] MCP `disabled_tools` 后续问题：项目条目覆盖用户列表、无类型拒绝、拼写错误静默**  
   重要性：MCP 权限配置语义问题。项目级 `reasonix.toml` 或 `.mcp.json` 中同名 server 会替换用户条目，并静默丢弃用户的 `disabled_tools`；拼写错误也不会告警。对权限控制与配置可预期性影响较大。  
   社区反应：评论 0，👍 0，已关闭。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11473

4. **#11785 [OPEN] MCP endpoint 凭据仍会在显示、预览和导出中泄露**  
   重要性：安全审查发现 MCP endpoint URL 中的凭据仍在多个位置被显示或导出。此前已有 URL 脱敏相关 PR，但仍存在遗漏。  
   社区反应：评论 0，👍 0，仍为 OPEN。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/issues/11785

## 4. 重要 PR 进展

> 从过去 24 小时更新的 50 条 PR 中，按安全、稳定性、SDK 生命周期和 Studio 体验挑选 10 条。

1. **#11786 [OPEN] fix(shell): 拒绝目标不是授权根内字面量路径的递归删除**  
   即使 Auto/YOLO 已批准，也阻止目标未知或超出授权根目录的递归删除；使用 Bash 与 PowerShell AST，要求字面量目标严格位于授权根内。直接回应 #11782 的高危数据丢失问题。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11786

2. **#11796 [OPEN] fix(studio): 从扩展 inventory 读取失败中恢复**  
   插件包、MCP 或技能列表读取失败时，不再显示与“成功但为空”相同的空状态；展示错误并提供可键盘访问的重试。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11796

3. **#11795 [OPEN] fix(sdk): 在打开过程中取消 provider 流**  
   宿主在 `Provider.Stream` 仍打开时取消，SDK 现在会预留句柄并正确响应取消，避免回调继续运行。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11795

4. **#11793 [OPEN] fix(sdk): 同步通知队列关闭**  
   修复 Go SDK 在宿主关闭 stdin 时可能发生的通知队列关闭与入队竞态，避免 panic。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11793

5. **#11791 [OPEN] fix(sdk): 流结束时取消 provider context**  
   Go SDK 在发出 `stream/end` 或 `ErrorChunk` 后取消传给 `Provider.Stream` 的 context，及时释放每流资源。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11791

6. **#11789 [OPEN] fix(sdk): 将外部化读取纳入 intercept 超时预算**  
   拦截超时从读取外部化 payload 前开始计算，避免 `host/content/read` 延迟导致回调获得额外超时。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11789

7. **#11794 [OPEN] fix(cli): 在 `plugin show` 中脱敏 MCP 查询凭据**  
   `reasonix plugin show NAME` 不再打印 MCP HTTP/SSE URL 中的凭据查询参数，覆盖禁用包，复用 `RedactURL` 策略。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11794

8. **#11787 [OPEN] fix(studio): 从 endpoint 路径段推断 MCP 传输协议**  
   避免因为 host、query、fragment、userinfo 或普通路径子串包含 `sse` 而误选 SSE；仅在路径段上应用自动 SSE 启发式。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11787

9. **#11546 [OPEN] perf(studio): 未变更模型或 effort 时跳过重建**  
   ACP、serve 或 CLI 切换到当前已运行的 model/effort 时提前返回，避免重建 controller。  
   链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11546

10. **#11504 [OPEN] fix(shell): 跳过无法启动的 PowerShell Store alias，并记录实际运行项**  
    修复 shell 解析到 `pwsh` 但实际未安装时命令全部失败的问题，完善 pinned-path 分支检查。  
    链接：https://github.com/esengine/DeepSeek-Reasonix/pull/11504

## 5. 功能需求趋势

1. **MCP 安全与配置治理**  
   社区关注 MCP endpoint 凭据脱敏、`disabled_tools` 合并语义、项目级配置覆盖用户配置、传输协议推断。相关：#11785、#11473、#11794、#11787。

2. **Agent / Shell 安全边界**  
   高危递归删除、只读变量赋值失败后继续执行、Auto/YOLO 审批范围外命令，成为最严重的数据安全议题。相关：#11782、#11786、#11504。

3. **Studio 桌面端稳定性与状态一致性**  
   登录态、版本更新、迁移后会话消失、远端会话切换、子代理状态、Windows 远端项目等仍是高频问题。相关：#11769、v1.39.7、v2.26.0、v2.25.0。

4. **SDK 与扩展生命周期正确性**  
   流取消、context 释放、通知队列关闭、intercept 超时预算、inventory 读取失败恢复，说明 SDK 并发与资源管理是开发者重点。相关：#11795、#11793、#11791、#11789、#11796。

5. **性能与验证策略优化**  
   未变模型/effort 跳过重建，减少无测试项目中无意义的验证债务，体现对性能和低摩擦体验的需求。相关：#11546、#11780。

6. **文档与生态建设**  
   主题作者指南、SDK demo、兼容命令示例、市场发布流程草稿等 PR 密集，表明社区在补齐插件、主题和发布生态文档。相关：#11578、#11556、#11569、#11716、#11566。  
   本期数据未出现新模型支持或 IDE 集成的新热点。

## 6. 开发者关注点

- **安全默认值必须更严格**：递归删除、变量赋值失败、授权根外路径不应继续执行。相关：#11782、#11786。
- **MCP 凭据全链路脱敏**：显示、预览、导出、CLI `plugin show` 都不能泄露 endpoint 查询凭据。相关：#11785、#11794。
- **配置合并要可预期**：项目级 MCP 配置不应静默覆盖用户 `disabled_tools`，拼写错误应报错。相关：#11473。
- **Studio 更新与登录状态一致性**：新版本未更新时不应导致登录态错乱、反馈历史不可用。相关：#11769。
- **会话与迁移数据可靠性**：迁移后会话消失、用量统计清零、长轮次分页、远端会话切换仍需持续验证。相关：v1.39.7。
- **SDK 并发与资源释放**：取消流、关闭队列、释放 context、超时预算，都是开发者高频痛点。相关：#11795、#11793、#11791、#11789。
- **扩展生态可诊断性**：插件安装成功但 profile 不可用、inventory 读取失败静默为空，应明确报错和恢复入口。相关：#11796、#11697、#11790。
- **跨平台 shell 兼容**：Windows PowerShell、nvm 安装的 npm、无效 Store alias 仍影响使用。相关：#11504、v2.25.0。
- **验证策略避免过度打扰**：无测试项目中的普通文本编辑不应强制要求验证命令。相关：#11780。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 · 2026-10-03

## 今日速览

今日无新版本发布，社区注意力集中在 **v2 Beta 的稳定性与配置正确性**：compaction 忽略模型配置、提示缓存命中率低、指令发现栈溢出等问题集中爆发。同时，**计费与订阅透明度**成为高热度话题，Go 套餐额度误扣和信用卡支付被拒两条 Issue 均获得大量跟进。PR 侧则以 Windows 平台修复、插件子路径导出、TUI 交互优化和 Effect 大版本升级为主。

---

## 版本发布

过去 24 小时无新 Release。

---

## 社区热点 Issues（精选 10 条）

1. **[#45278](https://github.com/anomalyco/opencode/issues/45278) Payment Declined After 3 Months（OPEN，32 评论 / 👍20）**
   用户使用同一张卡续费三个月后突然被拒，银行确认无异常。这是当前评论数最高的 Issue，大量用户疑似复现，指向支付网关风控或订阅状态同步问题，影响付费转化，优先级高。

2. **[#24649](https://github.com/anomalyco/opencode/issues/24649) OpenCode Go：澄清自托管 vs 第三方代理模型（CLOSED，19 评论 / 👍33）**
   社区点赞数最高的问题，直指 Go 套餐的基础设施声明透明度——哪些模型自托管、哪些经第三方代理。已关闭，说明官方给出了正式说明，是理解 OpenCode Go 商业模式的关键条目。

3. **[#18108](https://github.com/anomalyco/opencode/issues/18108) 截断的工具调用被误判且不可恢复（OPEN，11 评论 / 👍11）**
   当工具调用 JSON 参数超过 `maxOutputTokens` 被截断时，OpenCode 仅报「invalid tool call」，不向模型传递截断信号，甚至进入 doom loop。这是核心 Agent 循环的可靠性缺陷，与 #17471 形成同一主题簇。

4. **[#42729](https://github.com/anomalyco/opencode/issues/42729) [FEATURE] 收录 Qwen3.8-27B（OPEN，10 评论 / 👍13）**
   请求将 Qwen3.8-27B 开源权重模型纳入 OpenCode Go 目录。社区对新模型支持的需求持续旺盛，说明模型目录的更新速度是用户留存的敏感点。

5. **[#17471](https://github.com/anomalyco/opencode/issues/17471) [FEATURE] 命中输出上限时自动续写（CLOSED，7 评论 / 👍14）**
   针对大上下文模型（如百万级 Opus 4.6）`finish_reason: "length"` 场景，要求自动续写而非中断。已关闭，但对应底层问题在 #18108 仍以 bug 形式存在，值得追踪落地情况。

6. **[#44094](https://github.com/anomalyco/opencode/issues/44094) [2.0] compaction 忽略 `agents.compaction.model`（OPEN，6 评论）**
   自 8 月 19–21 日「shared model request」重构后，v2 Beta 的手动 compaction 始终使用会话当前模型，静默忽略专用配置。属于典型的「配置被吞」回归，对成本控制敏感的用户影响明显。

7. **[#52761](https://github.com/anomalyco/opencode/issues/52761) V2 summary compaction 几乎读不到 prompt cache（OPEN，3 评论）**
   即使在刚完成热请求后立即压缩，缓存读取量仍极低。提示缓存命中率直接决定长会话成本与延迟，是 v2 性能优化的重点方向。

8. **[#52873](https://github.com/anomalyco/opencode/issues/52873) [FEATURE] v2 支持 `rules` 指令机制（OPEN，1 评论）**
   当前指令只能来自根目录/子项目的 AGENTS.md 或 CLAUDE.md，缺少更细粒度、可组合的规则加载机制。反映出社区对「项目级指令工程」的诉求正在升级。

9. **[#52833](https://github.com/anomalyco/opencode/issues/52833) `/init` 与 `/review` 误用 git worktree 根目录（OPEN，2 评论）**
   两个命令用 `project.directory`（worktree 根）替换 `${path}`，而非会话的 `location.directory`，在多 worktree / 子目录会话场景下行为错误，属于 v2 路径作用域治理的细节缺陷。

10. **[#52554](https://github.com/anomalyco/opencode/issues/52554) Go 套餐 Kimi K3 被记为 Zen 按量付费（CLOSED，3 评论）**
    Go 套餐内模型被错误扣减 pay-as-you-go 余额，而 Go 控制台显示额度 100% 剩余。与 #45278 共同构成今日计费类热点，已被关闭，说明官方确认并处理。

> 其他值得留意：[#52860](https://github.com/anomalyco/opencode/issues/52860) ACP 丢失 API 错误的状态码/限流头；[#52874](https://github.com/anomalyco/opencode/issues/52874) Windows 大小写变体路径导致指令发现栈溢出；[#52701](https://github.com/anomalyco/opencode/issues/52701) 新增 skill 目录需重启才被发现。

---

## 重要 PR 进展（精选 10 条）

1. **[#52868](https://github.com/anomalyco/opencode/pull/52868) feat(gui-extensions): 引入类型化组合与生命周期原语（OPEN）**
   让内置扩展声明依赖与状态，类型系统拒绝缺失/重复 provider、冲突 key 与非法 IPC；宿主并行激活扩展。这是 GUI 扩展体系的结构性增强，值得重点关注。

2. **[#52869](https://github.com/anomalyco/opencode/pull/52869) feat(tui): `/tui/select-session` 可定向单个已附加 TUI（OPEN）**
   关联 #39181 的会话切换部分，让多 TUI 附加场景下的会话选择更可控，不改动目录作用域逻辑。

3. **[#52871](https://github.com/anomalyco/opencode/pull/52871) fix(windows): 隐藏后台子进程窗口（OPEN，bot 提交）**
   隐藏后台服务、常驻 PTY 守护进程、应用查找与签名辅助进程的窗口，交互式编辑器与显式启动应用保持可见。关闭 #42440，改善 Windows 日常体验。

4. **[#52872](https://github.com/anomalyco/opencode/pull/52872) fix(tui): 修复问题表单高亮与浮层不匹配（OPEN）**
   由知名贡献者 jlongster 提交，修复 #49661 引入的 `background.raised.base` 色值错配，属细节但直接影响 TUI 观感。

5. **[#46912](https://github.com/anomalyco/opencode/pull/46912) fix(opencode): 退出前等待 stdout 写入，避免管道 JSON 截断（OPEN）**
   修复 `export`、非分页 `session list --format json`、`db --format json` 在 `process.exit()` 前写入导致的管道截断。对脚本化/CI 集成很关键，关闭 #29330。

6. **[#49863](https://github.com/anomalyco/opencode/pull/49863) fix(plugin): 支持 npm 包子路径导出（OPEN）**
   修复 `opencode-pty/v2` 这类子路径被误解析为 GitHub 仓库的问题，直接关闭 #49852，是插件生态可用性的关键修复。

7. **[#52668](https://github.com/anomalyco/opencode/pull/52668) fix(server): 目录缺失时返回 404 而非 500（OPEN）**
   已保存项目文件夹被删除后，`/api/model`、`/api/integration`、权限/表单/指令等请求会 500。改为保留类型化 `DirectoryNotFoundError`，提升服务端错误语义正确性。

8. **[#50231](https://github.com/anomalyco/opencode/pull/50231) chore: 升级 Effect 至 rc.118（OPEN）**
   从 `4.0.0-rc.112` 迁至 `rc.118`，涉及 socket、schema 解析、JSON Schema 输出、模块路径等多处破坏性变更。虽标为 chore，实为高风险的底层基础设施升级，需重点回归。

9. **[#52866](https://github.com/anomalyco/opencode/pull/52866) fix(ai): 为分帧事件的原生流设置停滞上限（OPEN）**
   在 #49229 之后补齐原生 `@opencode/ai` HTTP 传输层的流停滞检测，关闭 #43519，延续 #43618 / #51879 一系的流式稳健性工作。

10. **[#51901](https://github.com/anomalyco/opencode/pull/51901) fix(core): 顶层 `model` 同步重命名旧 provider（CLOSED）**
    配置归一化此前只覆盖 provider 块、agent/command 模型与策略，遗漏顶层 `model` 字段，导致 `azure-cognitive-services`、`google-vertex-anthropic` 迁移不完整。

> 另注：kitlangton 连续提交一组 `noUnusedLocals` 开启 PR（[#52851](https://github.com/anomalyco/opencode/pull/52851) TUI、[#52856](https://github.com/anomalyco/opencode/pull/52856) app、[#52857](https://github.com/anomalyco/opencode/pull/52857) cli、[#52858](https://github.com/anomalyco/opencode/pull/52858) ai/core），逐包清理未使用代码并收紧 TS 配置，是今天体量最大的质量基建动作。

---

## 功能需求趋势

- **模型目录与托管透明度**：#42729 要求收录 Qwen3.8-27B，#24649（👍33）要求明确自托管 vs 代理边界。社区既要「更多模型」，也要「更清楚模型从哪来、走哪条链路」。
- **v2 配置语义一致性**：compaction 模型、rules 指令机制、skill 目录热发现、plugin hooks 边界——多条需求都指向「配置应当被精确、可预期地生效」。
- **指令工程（Instruction Engineering）**：从 AGENTS.md/CLAUDE.md 单一来源，演进到可组合、可分层、可热加载的 `rules` 机制。
- **计费与配额可视化**：Go 套餐额度、Zen 按量余额、订阅状态三者的一致性和可解释性，已成为产品体验而非「客服问题」。
- **跨平台健壮性**：Windows 路径大小写、后台子进程窗口、Scoop 安装更新（[#52865](https://github.com/anomalyco/opencode/pull/52865)）等条目明显增多，Windows 已成为一等公民议题。
- **插件与扩展生态**：子路径导出修复、GUI 扩展生命周期原语、生态插件文档收录（[#52864](https://github.com/anomalyco/opencode/pull/52864) dabloons），生态建设进入「可用性打磨」阶段。

---

## 开发者关注点

1. **计费信任危机苗头**：支付被拒（#45278，32 评论）与套餐额度误扣（#52554）同时出现，用户对「钱花在哪、额度剩多少」缺乏可信反馈，建议官方提供更细粒度的用量与计费诊断。
2. **v2 Beta 的「静默失败」**：compaction 模型被忽略、缓存命中率异常、路径作用域错误——共同特征是**不报错但行为不对**，比崩溃更难排查，是当前 v2 反馈中的最大痛点。
3. **长上下文成本与可靠性**：截断工具调用不可恢复（#18108）、prompt cache 读不到（#52761）、输出上限不自动续写（#17471），三者叠加直接影响大上下文工作流的稳定性与费用。
4. **CI 质量门禁薄弱**：Nix 工作流只在求值不构建（#52863），使「能求值但构建失败」的改动可以合入 v2；#52123/#52129/#51891 一串修复表明打包链路仍在补漏。
5. **平台细节仍在还债**：Windows 大小写变体路径触发指令发现栈溢出（#52874）、ACP 丢错误元数据（#52860）、服务端 500 代替 404（#52668），说明错误处理与路径规范化还有系统性收口空间。

---

*数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode) · 统计窗口：2026-10-02 至 2026-10-03*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报（2026-10-03）

> 数据来源：github.com/NousResearch/hermes-agent  
> 统计窗口：过去 24 小时

## 1. 今日速览

过去 24 小时无新 Release。Issue 更新仅 2 条，其中跨网关 Bot 协作 #97681 持续高热，讨论如何在不牺牲控制权的前提下让 Bot 跨机器、跨 owner 协作；Firecrawl 无密钥 403 导致免费 provider 回退链中断的 bug 已关闭。PR 侧插件目录依旧活跃，新增/升级多个社区插件，同时有多项平台兼容、TUI 记忆隔离和 Portal 推理重放修复。

## 2. 版本发布

无新版本发布。

## 3. 社区热点 Issues

> 说明：按“过去 24 小时更新”口径，本期仅有 2 条 Issue，因此全部列出；无法筛选 10 条，不虚构补充。

### #97681 [OPEN] Let Bots collaborate across gateways
- 作者：@dokterdok
- 创建：2026-08-29｜更新：2026-10-02｜评论：33｜👍：4
- 标签：`type/feature`, `innovation`, `comp/gateway`, `P2`, `sweeper:risk-session-state`, `sweeper:risk-message-delivery`, `comp/desktop`, `area/sessions`
- 为什么重要：Hermes Bots 是个人代理，每个 Bot 运行在 owner 选择的位置，拥有自己的模型、工具、记忆和凭证。该 issue 试图建立跨机器协作基础，并为未来跨 owner 协作铺路，同时不让用户放弃对 Bot 的控制权。涉及 gateway、desktop、会话状态与消息投递风险。
- 社区反应：33 条评论、4 个 👍，属于高讨论度的架构/产品设计类 issue。
- 链接：https://github.com/NousResearch/hermes-agent/issues/97681

### #91609 [CLOSED] [Bug]: keyless Firecrawl HTTP 403 stops the free-provider failover ring
- 作者：@sky0eyes
- 创建：2026-08-21｜更新：2026-10-02｜评论：3｜👍：0
- 标签：`type/bug`, `comp/plugins`, `tool/web`, `P3`
- 为什么重要：当匿名/无密钥 Firecrawl endpoint 返回 HTTP 403 时，`web_search` 会立即失败，而不是继续到配置的免费 provider 回退链中的下一个 provider。这会直接影响搜索工具稳定性。
- 状态：已关闭。
- 链接：https://github.com/NousResearch/hermes-agent/issues/91609

## 4. 重要 PR 进展

> 过去 24 小时 PR 更新共 50 条，以下按功能影响与风险修复挑选 10 条。

1. **#131841 [OPEN] Plugin installs no longer blocked by a Google installed-app OAuth client secret**  
   插件安全扫描将内嵌 Google installed-app OAuth client secret 从 `dangerous` 降级为 `caution`，允许审查后安装，而不是直接阻止。  
   链接：https://github.com/NousResearch/hermes-agent/pull/131841

2. **#130659 [OPEN] fix(tui): preserve plugin authorship for injected turns**  
   在 TUI/Desktop 会话中保留插件注入消息的作者身份，避免插件指令被误写入人类 profile，保护 memory-provider 隔离。  
   链接：https://github.com/NousResearch/hermes-agent/pull/130659

3. **#130682 [CLOSED] feat(plugin-catalog): add hermes-cron**  
   向插件目录添加 `hermes-cron`，为 Hermes cron scheduler 提供操作技能，帮助 agent 管理定时任务。  
   链接：https://github.com/NousResearch/hermes-agent/pull/130682

4. **#130736 [CLOSED] feat(plugin-catalog): add memanto**  
   新增社区 memory provider，提供类型化长期记忆、自动 recall、turn capture，并镜像内置 `memory` 写入。  
   链接：https://github.com/NousResearch/hermes-agent/pull/130736

5. **#131334 [CLOSED] Add vet402 to the plugin catalog**  
   新增支付风控插件：在 agent 向 x402/MPP 卖家付款前，读取链上交付记录，辅助判断是否付款。  
   链接：https://github.com/NousResearch/hermes-agent/pull/131334

6. **#118185 [CLOSED] fix(transports): cap Portal reasoning replay**  
   限制 Nous Portal 推理详情重放，只保留最新 assistant turn 的 reasoning sidecar，避免累计预算超限导致非可重试 HTTP 400。  
   链接：https://github.com/NousResearch/hermes-agent/pull/118185

7. **#73174 [CLOSED] fix(gateway): stop scraping every /mnt/ PATH entry into WSL systemd interop unit**  
   修复 WSL systemd interop 单元生成逻辑，不再把所有 `/mnt/` PATH 条目都写入，减少 Windows/WSL 环境下的路径污染。  
   链接：https://github.com/NousResearch/hermes-agent/pull/73174

8. **#84099 [CLOSED] fix(voice): honor configured silence threshold on stop**  
   修复语音活动检测在 `stop()` 时使用固定 `SILENCE_RMS_THRESHOLD=200` 的问题，改为尊重配置的 `voice.silence_threshold`。  
   链接：https://github.com/NousResearch/hermes-agent/pull/84099

9. **#106360 [CLOSED] fix(tools): hide console window for command-provider TTS/STT on Windows**  
   Windows 下命令型 TTS/STT provider 调用时不再弹出黑色 `cmd.exe` 控制台窗口。  
   链接：https://github.com/NousResearch/hermes-agent/pull/106360

10. **#130155 [CLOSED] feat(plugin-catalog): add hermes-council plugin**  
    新增 LLM Council 语义插件：多个固定顾问并行回答、匿名互评和排名，适合复杂决策场景。  
    链接：https://github.com/NousResearch/hermes-agent/pull/130155

## 5. 功能需求趋势

结合本期 Issue 与 PR 标签，社区关注方向集中在：

- **跨网关/跨设备 Bot 协作**：gateway、desktop、sessions、消息投递成为核心架构议题。
- **插件生态爆发**：Plugin Catalog 相关 PR 占绝对多数，覆盖 memory、cron、支付风控、图表、git-hook、Council 等方向。
- **免费 provider 回退鲁棒性**：Firecrawl 403 问题说明搜索工具链需要更强的 failover 容错。
- **平台兼容性**：Windows 控制台闪烁、WSL PATH 污染等修复持续出现。
- **会话状态与记忆隔离**：TUI 注入回合作者身份、memory provider 保护是高频关注点。
- **推理重放与预算管理**：Portal reasoning replay 需要 cap，避免长会话触发上游 400。
- **语音与终端工具体验**：TTS/STT 阈值、Windows 控制台体验、终端命令重写等仍有优化需求。

## 6. 开发者关注点

- **插件目录治理与安全扫描**：版本 bump、owner 提交、salvage 流程频繁；OAuth secret 等安全扫描误报需要更精细分级。
- **跨 owner 协作的控制权**：Bot 协作不能以交出模型、工具、记忆和凭证控制权为代价。
- **failover ring 鲁棒性**：单个 provider 的 403 不应中断整个免费 provider 回退链。
- **平台差异痛点**：Windows 控制台闪烁、WSL `/mnt/` PATH 污染影响安装与使用体验。
- **记忆污染与隔离**：插件注入消息不应进入人类 profile 或污染长期记忆。
- **长会话推理历史管理**：推理详情重放需要预算控制，否则容易触发上游 HTTP 400。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 · 2026-10-03

> 数据来源：github.com/openclaw/openclaw

---

## 一、今日速览

今日 OpenClaw 动态呈现"稳定分支发版 + 运行时稳定性问题集中爆发"的双线格局：`extended-stable`（LTS 等价）分支连续发布 v2026.8.34/v2026.8.35，仅含网关侧安全与性能修复；而 Issues 侧被进程生命周期问题主导——僵尸进程泄漏（#97616）持续发酵，`claude-cli` 会话上下文丢失系列（#163871/#163872）同日集中上报。PR 侧则由核心维护者 steipete 主导，主旋律是把网关主线程的同步 SQLite 操作与大对象保留迁移到 worker，属于典型的长稳性能治理。

---

## 二、版本发布

**v2026.8.35 / v2026.8.34 — gateway-only `extended-stable` 发布**

- 定位：`extended-stable` 分支，当前等同于 LTS，仅包含网关（Gateway）侧更新。
- 基线：基于 2026 年 8 月末的 OpenClaw 代码。
- 内容：关键安全更新 + 可靠性与性能修复 + 新模型支持等特性。
- 解读：这是与主线 2026.9.x 并行的长期支持轨道，说明项目已进入"双轨发布"节奏——前沿功能走主线，稳定性与安全加固回灌至 extended-stable。企业/生产用户应关注此分支。

---

## 三、社区热点 Issues

> 注：过去 24 小时内更新的 Issue 共 7 条，以下为全部条目（均属高价值项）。

### 1. #97616 🔴 僵尸子进程累积导致运行时退化（最热）
`P1 · bug · impact:message-loss · impact:crash-loop`｜17 评论｜👍1｜创建 6/29，更新 10/2
hook/tool 执行产生的子进程（`openclaw-hooks`、`bash`、`codex` 等）未被回收，在主进程下不断累积为僵尸进程，长期运行后导致运行时性能退化。**为什么重要**：这是本批次中唯一跨月未闭环的 P1，评论数远超其他 Issue，且被标记 `impact:crash-loop`，属于典型"越跑越慢直至崩溃"的长稳杀手。
🔗 https://github.com/openclaw/openclaw/issues/97616

### 2. #154299 🔴 子代理完成消息静默丢失（9.5 回归）
`P1 · impact:message-loss`｜6 评论｜创建 9/21
在 OpenClaw 2026.9.5 上，子代理的 completion-delivery 最终文本被静默丢弃——既无队列条目，也无失败记录（普通 Telegram 出站不受影响）。**为什么重要**：典型的"静默失败"，用户无从感知消息已丢失，且已被 `clawsweeper` 标记需维护者评审。
🔗 https://github.com/openclaw/openclaw/issues/154299

### 3. #163871 🔴 Control UI Rewind 清空 claude-cli 会话绑定
`P1 · impact:session-state`｜2 评论｜创建并更新于 10/2–10/3（当日新增）
在 `claude-cli` 会话上执行 Control UI 的 **Rewind to here**，会清除已存储的 Claude Code 会话绑定，下一轮直接启动全新 Claude Code 进程，导致全部上下文丢失。**为什么重要**：回退功能是会话调试的核心手段，此处语义完全错误（应恢复到检查点，而非重置会话）。
🔗 https://github.com/openclaw/openclaw/issues/163871

### 4. #163872 ✅ `/compact` 在 claude-cli 模型引用上失败（已关闭）
`P1 · impact:session-state · impact:auth-provider`｜1 评论｜10/2 创建，10/3 关闭
手动 `/compact` 作用于旧式 `claude-cli/<model>` 引用（或缺少 `agentRuntime` 条目的规范 `anthropic/<model>`）时，无法触达 Claude Code 原生压缩逻辑，报错 "No API key found for provider claude-cli"。**为什么重要**：与 #163871 同源同作者，暴露 `claude-cli` 旧引用与规范化引用之间的兼容断层；已关闭，修复应已落地。
🔗 https://github.com/openclaw/openclaw/issues/163872

### 5. #122133 🟠 exec 子进程在会话超时后继续存活
`P2 · 🦞 diamond lobster · impact:other`｜4 评论｜创建 8/11
Agent 会话超时或被终止后，其工具调用派生的后台 `exec` 进程不会被杀死或清理，成为孤儿进程持续占用资源。**为什么重要**：与 #97616 同属进程生命周期泄漏家族，互为印证，说明资源回收是系统性问题而非孤例。
🔗 https://github.com/openclaw/openclaw/issues/122133

### 6. #163870 🟠 会话 SQLite receipt 身份在 macOS VM 重启后不稳定
`P2 · 🦞 diamond lobster · impact:session-state · impact:ux-friction`｜1 评论｜10/2
2026.9.7 中，已完成的 deferred session-SQLite 导入在同一个 macOS VM 重启后会退回 `retained_plugin_source_conflict` 状态——因为 receipt 将 `databaseIdentity` 绑定到 `device-id:inode`，而虚拟文件系统的 inode 在重启后变化。**为什么重要**：回归类问题，直接影响 macOS 虚拟化环境（CI/沙箱）中的会话可靠性。
🔗 https://github.com/openclaw/openclaw/issues/163870

### 7. #163873 🟠 更新失败：runtime-verification-failed（2026.9.4）
`OPEN`｜1 评论｜10/2
darwin/arm64、Node 26.8.2 环境下，从 2026.9.4 执行精确目标更新时运行时报验证失败。**为什么重要**：更新链路是用户信任的底线，失败报告已带官方哈希标记，说明是经确认的真实案例。
🔗 https://github.com/openclaw/openclaw/issues/163873

---

## 四、重要 PR 进展

### 1. #163853 同一 root 的本地状态变更改由在线 owner 路由（routing 1/4）
`P2 · 🦐 gold shrimp · merge-risk: 🚨 security-boundary · size: XL`
`openclaw worktrees create` 目前在运行中的 Gateway 旁直接改写本地状态，导致服务 owner 并未执行或发布该操作；而"探测监听是否可达"也无法安全判定 CLI 何时可接管离线 root。该 PR 是 routing 系列 4 篇之一，涉及安全边界。
🔗 https://github.com/openclaw/openclaw/pull/163853

### 2. #163875 修复 HTTPS Dashboard 下连接已安装的 MCP 插件
`gateway · agents · clawsweeper:autofix · security-sensitive-changed`
修复 operator 管理的 HTTPS Gateway 上 MCP 插件登录失败的问题（含从 ClawHub 安装的 Notion 插件），启用 OAuth 的插件安装后即可直接连接。Closes #163858。
🔗 https://github.com/openclaw/openclaw/pull/163875

### 3. #163492 恢复 Telegram 校验检查（发布工装）
`docs · channel: telegram · proof: telegram-e2e · merge-risk: 🚨 automation`
修复 release/2026.9.8 期间 Telegram 门禁在策略热重载与预投递恢复时超时的问题，以及 rich-inline 校验无法跨越候选私有进程边界编辑的缺陷。
🔗 https://github.com/openclaw/openclaw/pull/163492

### 4. #163835 跨重启保留 ACP source ownership
`P1 · gateway · agents · merge-risk: 🚨 compatibility / session-state / availability`
修复当 Gateway 重启打断一次经由绑定 ACP agent 的已接受请求时，出现的意外 native-agent 重放问题。新 ACP 轮次在重启后保留执行来源，已完成轮次正确结算。
🔗 https://github.com/openclaw/openclaw/pull/163835

### 5. #149725 macOS 应用采用共享 Rust sidecar 处理 node 会话
`P2 · 🦐 gold shrimp · merge-risk: 🚨 compatibility / security-boundary / availability · size: XL`
让 macOS 应用成为 RFC #54 中共享 Rust Gateway 客户端与 node runtime 的真实采用者，同时保留 macOS 原生安全性与工具所有权；node 连接使用已签名、受监督的 sidecar。属于跨平台架构统一的关键一步。
🔗 https://github.com/openclaw/openclaw/pull/149725

### 6. #162669 plugin-sdk：服务与账号调度在退休时合并
`P2 · 🐚 platinum hermit · merge-risk: 🚨 compatibility · 覆盖面极广`
修复插件定时器在服务/账号被替换或关闭时"存活过久"的问题，新增版本化的 scheduler capability 并绑定内核持有的 GatewayScheduler；迁移 ClickClack、Device Pair、Reef、Buzz、Discord presence/voice、IMAP 等多个插件。**与进程泄漏类 Issue 直接相关。**
🔗 https://github.com/openclaw/openclaw/pull/162669

### 7. #163834 释放已完成运行与过期缓存（主线程堆保留治理）
`P2 · 🐚 platinum hermit · proof: sufficient · security-sensitive-changed · size: XL`
长时间运行的 Gateway 会保留已完成的 chat 注册、过期用量报告与仅供诊断的 prompt 文本；`sessions.describe`/`sessions.get` 在连接关闭后仍继续准备行数据。该 PR 主动释放这些对象，缓解内存持续增长。
🔗 https://github.com/openclaw/openclaw/pull/163834

### 8. #163866 缩短远程节点回复完成前的延迟
`P2 · 🐚 platinum hermit · proof: sufficient · size: L`
配对节点轮次在 provider 流式结束后仍会让聊天响应保持"未完成"约 1 秒，即使是无工作区改动的简单回复。在 32 核 Linux loopback 租约 + OpenAI `gpt-5.6-luna` 下测得明显改善。
🔗 https://github.com/openclaw/openclaw/pull/163866

### 9. #163869 doctor：在修复前接纳一次性更新演练
`P2 · 🦐 gold shrimp · merge-risk: 🚨 compatibility · size: L`
修复 Doctor 更新演练在获取维护所有权之前即被拒绝的问题，同时防止演练标志在一次性命名空间之外授权修复。Related: #144005、#145169。
🔗 https://github.com/openclaw/openclaw/pull/163869

### 10. #163868 node-host：整合命令执行所有权
`P3 · 🐚 platinum hermit · size: L`
Node-host 命令分发目前在多层之间转发实现辅助函数并重建生命周期事件，抬高维护成本。该重构收敛执行路径，不改变审批策略、环境过滤等现有行为。
🔗 https://github.com/openclaw/openclaw/pull/163868

**其他值得关注**：#163874（精简 worker 校验 RPC 分发开销）、#163861/#163819（把 placement 结算写入移入 worker，解除文件系统协调与同步 DB 访问的耦合）、#163797（cron 显示名在 worker 中准备，避免主线程惰性查 SQLite）、#158087（QA Lab 关停期间保留运行结果）、#163865/#163867（修复发布工装与 session-group CI 测试脆弱性）。

---

## 五、功能需求趋势

综合本批次 Issues 与 PR，社区关注点集中在以下方向：

| 方向 | 代表条目 | 趋势解读 |
|---|---|---|
| **进程与资源生命周期** | #97616、#122133、#162669 | 最突出的系统性诉求。僵尸进程、孤儿 exec 进程、插件定时器越界、主线程堆保留，四类泄漏指向同一根因：缺少统一的所有权与回收契约。 |
| **会话状态持久化与恢复** | #163871、#163835、#163870 | Rewind 语义、ACP 来源溯源、SQLite receipt 身份稳定性，共同构成"会话状态可信度"议题。 |
| **运行时兼容层** | #163872、#154299 | 旧式 `claude-cli/*` 引用与规范 `anthropic/*` 引用之间的行为分叉，以及子代理投递链路，暴露出多 agent runtime 抽象的边界模糊。 |
| **网关主线程去同步化** | #163853、#163834、#163861、#163819、#163797 | 维护者正系统性把 SQLite 读写、placement 结算、cron 名称解析移出 Gateway 主线程，属性能与可用性长期投资。 |
| **插件生态与鉴权** | #163875、#162669 | MCP/ClawHub 插件在 HTTPS 与企业代理环境下的 OAuth 连接体验，以及插件 SDK 的生命周期治理。 |
| **跨平台稳定性** | #163870、#163873、#149725 | macOS VM、darwin/arm64 的更新验证与 inode 依赖问题突出；同时 macOS 侧正在向共享 Rust sidecar 收敛。 |

---

## 六、开发者关注点

1. **"静默失败"是最刺痛的体验**：#154299 明确描述"无队列条目、无失败记录"，用户与开发者都无法定位丢失的消息。社区期待的是失败可视化与可追溯，而非仅在出站通道正常时"看起来没事"。

2. **长稳运行退化是一条共识主线**：#97616（僵尸进程）、#122133（孤儿 exec）、#163834（堆保留）、#162669（插件定时器）分布在四个不同子系统中，说明"跑得越久越不稳"是当前架构级痛点，而非单点 bug。

3. **claude-cli 兼容路径是当下的热点雷区**：#163871 与 #163872 由同一作者同日上报、同属 P1 session-state，反映旧模型引用格式与新 `agentRuntime` 体系并存带来的断裂，迁移期用户风险最高。

4. **发布工程与 CI 门禁脆弱性被反复修补**：#163865、#163867、#163492、#163855 多条 PR 均针对测试/发布工装的既有假设失效（obsolete diagnostic、错误的 writer 假设、Telegram 超时），暗示近期架构重构（worker 化）对测试基础设施造成了连带冲击。

5. **诊断与自愈能力需求上升**：#163869（Doctor 演练）、#163873（更新失败报告）表明用户希望在更新/修复链路上获得更清晰的预检与失败归因，而不是核心流程中途报错。

6. **安全边界被显式标注**：#163853 与 #163834 均带 `security-sensitive-changed`，说明"谁有权改写本地状态"与"内存中残留什么"已进入维护者的正式威胁模型考量。

---

*本日报基于给定 GitHub 数据生成，Issue 部分因过去 24 小时仅 7 条更新而全量收录；PR 部分从 50 条中筛选评论/影响权重最高的 10 条。*

:::
