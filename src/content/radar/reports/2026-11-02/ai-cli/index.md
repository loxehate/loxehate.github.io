---
title: "AI CLI 工具社区动态日报"
published: 2026-11-02
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-02

> 生成时间: 2026-11-02 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-02）

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单一对话助手”向“多端协作开发平台”演进的关键期。各主流工具已进入稳定性修复与多平台适配并行阶段，社区高度关注会话状态一致性、计费透明度、跨端身份管理以及本地工具链（MCP/子代理）的可靠性。整体呈现出“功能扩张放缓、工程质量提升”的特征，企业级可用性与数据安全成为各厂商共同的优先级。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues 更新 | PR 活动 | 24 小时 Release | 主要版本状态 |
|------|------|------------|---------|----------------|-------------|
| Claude Code | anthropics/claude-code | 49 条 | 7 条 | 无 | 稳定版，无新发布 |
| OpenAI Codex | openai/codex | 未披露总数（热点 10 条） | 13 条（全 CLOSED） | 2 个 Alpha | rust-v0.167.0-alpha.2 / .3 |
| Gemini CLI | google-gemini/gemini-cli | 未披露总数（热点 10 条） | 未披露总数（精选 10 条） | 1 个夜间版 | v0.67.0-nightly.20261101 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 未披露总数（热点 10 条） | 未披露总数（精选 10 条）| 2 个修复版 | v2.56.1 / studio-v2.56.1 |
| OpenCode | anomalyco/opencode | 25 个 | 50 个 | 无 | 稳定版，无新发布 |
| Hermes | NousResearch/hermes-agent | 未披露总数（热点 10 条）| 未披露总数（精选 10 条）| 无 | 稳定版，无新发布 |
| OpenClaw | openclaw/openclaw | 18 个 | 50 个 | 无 | 稳定版，无新发布 |
| DeepSeek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 0 | 无活动 |

**数据读取**：OpenCode 与 OpenClaw 的 PR 活动最为密集（各 50 个），Claude Code 的 Issue 讨论最为活跃（49 条）；Codex 与 Gemini CLI 维持 Alpha/夜间版快速迭代节奏；DeepSeek Harness 今日无社区活动。

## 3. 共同关注的功能方向

多个工具社区在以下维度上存在高度重叠的需求：

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **会话状态与持久化** | Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenClaw | 会话掉落/丢失（#84938、#78439、#14897、#186684）、跨端会话同步（#102762、#57721）、额度重置后自动续会（#21073、#28931） |
| **计费与使用量透明度** | Claude Code、OpenAI Codex | Max 5x 使用量异常激增（#105240、#103437）、Plus 订阅独立额度（#58530）、跨区支付失败（#52958） |
| **跨平台与多端适配** | OpenAI Codex、Gemini CLI、DeepSeek Reasonix、Hermes、OpenClaw | Windows 性能回归（#20933、#56941）、Wayland/Linux 兼容（#21983、#141443）、macOS 钥匙链/认证（#147655）、移动端远程聊天（#57721、#147321） |
| **本地工具链与代理稳定性** | Claude Code、Gemini CLI、OpenCode | MCP 服务器生命周期（#104895）、子代理虚假成功/挂起（#22323、#21409）、终端命令执行异常（#61109、#1852） |
| **身份与账号管理** | Claude Code、DeepSeek Reasonix | 跨个人/工作账号切换（#22872）、邮箱修改（#103389）、密码明文泄露（#14913） |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 账号多身份管理、MCP 生态、桌面端认证稳定性 | 多工作空间开发者、企业团队 | 基于 Anthropic 模型栈，强调与 Claude Desktop/扩展的深度集成，内部已将 Issue 分流工作流迁移至 Sonnet 5.5 |
| **OpenAI Codex** | 使用额度自动恢复、CLI/App 端统一、Computer Use 自动化 | OpenAI 生态用户、Plus 订阅者 | Rust 核心 + Alpha 迭代，侧重 CLI 与桌面端的无缝衔接，Computer Use 是其差异化自动化能力 |
| **Gemini CLI** | 子代理（Subagent）可靠性、AST 感知代码理解、浏览器代理 | 重代码理解场景的开发者、Google 生态用户 | 夜间版快速迭代，重点打磨子代理状态上报、工具调用超时与 OSC 7501 终端状态上报 |
| **DeepSeek Reasonix** | Office 多模态预览与内容引用、会话批量管理、本地化体验 | 中文场景用户、办公自动化开发者 | Studio + CLI 双架构，强调文件预览（Word/Excel/PPT）、剪贴板文件粘贴及中文路径兼容性 |
| **OpenCode** | 终端 PTY 稳定性、跨端插件生态、SQLite 写入性能 | 终端重度用户、插件开发者 | 核心优化方向为会话部分行写入（降低 84.4% WAL 写入）、Web/Desktop/TUI 三端状态同步 |
| **Hermes** | 统一网关（Unified Gateway）、多客户端路由、插件目录 | 消息平台集成开发者、跨平台机器人运营者 | 单网关进程架构，面向 CLI/TUI/Desktop/API 多入口统一，正处理网关合并后的会话路由与性能瓶颈 |
| **OpenClaw** | 会话状态机可靠性、网关内存泄漏、Discord/非拉丁字符频道支持 | 社区运营者、多频道机器人管理者 | 侧重网关排水期消息幂等、子会话启动反馈及跨语言频道解析 |

## 5. 社区热度与成熟度

- **高活跃、快速迭代**：OpenCode（50 PR）、OpenClaw（50 PR）、Codex（13 PR 全关闭、2 个 Alpha 版本）。这些工具社区对 Bug 修复响应迅速，但仍存在大量回归问题（如 OpenCode 的 v2.2.x 不可用、Codex 的 Windows git.exe 风暴）。
- **讨论密集、稳定版为主**：Claude Code（49 Issue 更新，7 PR）。社区围绕账号切换与计费异常展开深度讨论，但未发布新版本，说明工程团队可能正在酝酿更大的稳定性更新。
- **夜间/Alpha 迭代**：Gemini CLI（夜间版）、Codex（Alpha.2/.3）。适合早期采用者，但 P1 级 Bug 未解决比例较高（Gemini CLI 有 4 个 P1 未修复）。
- **企业级/本地化垂直**：DeepSeek Reasonix（v2.56.1 修复版）。发布节奏稳健，侧重 Office 预览与会话管理等垂直场景，适合中文办公自动化场景。
- **低活跃**：DeepSeek Harness 今日无任何社区活动，需关注其项目维护状态。

## 6. 值得关注的趋势信号

### 6.1 从“功能堆砌”转向“工程可靠性”
社区高频痛点已从“新增模型/新增技能”转移到会话丢失、配置永久覆盖（#78439）、内存泄漏（#162709）、认证会话掉落（#84938）等基础设施问题。对开发者而言，选型时应优先评估工具的会话状态机、备份恢复机制及跨平台崩溃恢复能力，而非仅看模型能力。

### 6.2 计费透明度成为采购决策核心因素
Claude Code 的 Max 5x 使用量异常（#105240）与 OpenAI Codex 的独立额度诉求（#58530）表明，企业用户对 Token 成本的不可预测性极为敏感。未来具备细粒度 Token/成本追踪、异常告警和额度自动恢复能力的工具，将在企业采购中更具竞争力。

### 6.3 跨端身份与会话继承是下一个摩擦点
多个工具同时出现跨个人/工作账号切换（#22872）、移动端会话卡片缺失（#102762）、远程聊天初始化缺陷（#57721）。开发者在构建基于这些 CLI 的工作流时，需预先设计身份切换与会话迁移的降级方案，避免被单一平台锁定。

### 6.4 本地代理协议（MCP/子代理）进入稳定性瓶颈期
Claude Code 的 MCP 服务器拆解（#104895）、Gemini CLI 的子代理虚假成功（#22323）显示，本地代理编排已从“概念验证”进入“生产可用性”阶段。依赖子代理或 MCP 扩展的团队，应重点关注超时控制（#27423）、错误报告隔离（#30088）及工具调用幂等性。

### 6.5 插件生态跨端统一尚未实现
OpenCode 社区明确要求将 Desktop 独占插件扩展到 Web App（#60976），Hermes 也在推进插件目录可发现性（#147658）。跨端插件标准尚未成熟，开发者在投入插件开发前，建议优先选择已提供跨端插件注册机制（如客户端 MCP）的工具

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-02）

## 1. 热门 Skills 排行

基于 PR 讨论活跃度与更新频率，以下为社区关注度最高的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简介 | 社区讨论热点 | 状态 | 链接 |
|------|------|----------|--------------|------|------|
| 1 | #1742 fix(mcp-builder) | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入路径变更及自定义 HTTP 头配置问题 | MCP 协议版本兼容性是社区痛点，直接影响技能与外部服务的连接稳定性 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 fix(skill-creator) | 隔离触发器评估，修复 Windows 子进程管道及运行时失败误报问题 | Skill 触发机制的可靠性直接决定自动化体验，跨平台兼容性受关注 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 Add notion-spec-to-implementation | 新增 Notion 规格转实现技能与定量简历审计技能，将产品规格拆解为可执行任务 | 企业级文档到代码的自动化转换需求强烈，Notion 生态集成受欢迎 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1980 webapp-testing | 移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用测试技能的安全加固成为社区共识，供应链安全受重视 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 fix(docx) | LibreOffice 超时改为报错，并验证输出 DOCX 无修订痕迹后再判定成功 | 文档自动化流程的容错与验证机制是企业落地的关键 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 feat(proofcore-contract-auditor) | 新增智能合约公证技能，对 Solidity/Rust 合约做静态分析并将审计证明锚定至 TON 区块链 | Web3 安全审计与链上存证是新兴垂直方向，社区对区块链技能兴趣上升 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 7 | #1703 Add md2video-audio | 基于 Marp 将 Markdown 转为带真人语音的 MP4 视频，零成本生成演示内容 | 内容多模态输出（文档→视频）是创作者工具链的热点方向 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1703) |
| 8 | #525 Add pyxel skill | 为 Python 复古游戏开发提供实现指导、头less 运行、帧检查与状态验证 | 游戏开发垂直领域技能开始进入官方技能库视野 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼出四大社区期待方向：

1. **工作流自动化与跨平台协作**  
   Issue #228（组织内技能共享）与 #1329（compact-memory 符号化状态）反映社区希望技能能突破个人使用，实现团队级共享与长上下文记忆压缩，降低企业协作成本。

2. **代码审查与安全治理**  
   Issue #412（agent-governance 安全模式）与 PR #1771（智能合约审计）显示，社区对 AI Agent 的策略 enforcement、威胁检测、审计追踪及区块链存证需求显著增长。

3. **测试生成与质量验证**  
   Issue #556（run_eval.py 触发率为 0）与 PR #1980（webapp-testing 安全加固）表明，自动化测试技能的触发机制不稳定及安全漏洞是当前阻碍落地的核心瓶颈。

4. **文档处理与排版质量**  
   Issue #2018（docx 合并运行导致无效 XML）、PR #1792（docx 超时处理）与 PR #514（文档排版质量控制）集中指向 Office 格式文档的生成、转换与排版自动化是高频刚需。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且修复了影响核心体验的问题，大概率近期合并：

- **#1742 fix(mcp-builder)**：MCP 2.0 兼容性修复，涉及官方核心技能基础设施，优先级最高。  
  [https://github.com/anthropics/skills/pull/1742](https://github.com/anthropics/skills/pull/1742)

- **#1298 fix(skill-creator)**：修复触发器评估误报与 Windows 兼容性，直接关系到所有自定义 Skill 的可用性。  
  [https://github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

- **#1980 webapp-testing**：消除 `shell=True` 命令注入风险，Web 测试技能的安全合规修复。  
  [https://github.com/anthropics/skills/pull/1980](https://github.com/anthropics/skills/pull/1980)

- **#1792 fix(docx)**：LibreOffice 超时错误处理与输出验证，文档自动化流程的关键稳定性补丁。  
  [https://github.com/anthropics/skills/pull/1792](https://github.com/anthropics/skills/pull/1792)

- **#1681 fix(skill-creator)**：修复 `package_skill.py` 直接执行失败及过时路径引用，降低社区贡献新 Skill 的门槛。  
  [https://github.com/anthropics/skills/pull/1681](https://github.com/anthropics/skills/pull/1681)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在确保跨平台稳定性与安全合规的前提下，将文档自动化、Web 测试及企业工作流集成能力从“个人实验”提升至“团队级可信基础设施”。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-02  
**数据来源**: github.com/anthropics/claude-code

---

## 1. 今日速览

过去 24 小时内 Claude Code 仓库未发布新版本，但社区活跃度保持高位，共 49 条 Issue 更新和 7 条 PR 活动。**账号管理体验、Max 5x 使用量异常、以及跨平台认证稳定性**成为今日最受关注的三大议题，其中账号切换体验问题（#22872）以 19 条评论和 24 个赞成为讨论热点。

---

## 2. 版本发布

过去 24 小时内无新版本发布，本节省略。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/赞 | 核心关注点 | 链接 |
|---|------|------|---------|------------|------|
| #22872 | 个人与工作 Claude Code 账号切换体验极差 | OPEN | 19 / 24 | 跨账号切换流程繁琐，影响多身份开发者的日常使用 | [查看](https://github.com/anthropics/claude-code/issues/22872) |
| #105240 | Max 5x 每周使用量在 48 小时内突增至 94%，自 10 月 17 日起显著恶化 | OPEN | 11 / 3 | 使用量计费异常，用户工作负载未变却触及配额上限 | [查看](https://github.com/anthropics/claude-code/issues/105240) |
| #103437 | Max 5x 自 10 月中旬起使用量消耗突然大幅增加 | OPEN | 10 / 3 | 与 #105240 同类计费异常，集中在 macOS 平台 | [查看](https://github.com/anthropics/claude-code/issues/103437) |
| #106167 | 服务器下发的 "games" 指令阻塞专业开发工作 | OPEN | 9 / 8 | 模型行为/系统提示词干扰正常开发场景 | [查看](https://github.com/anthropics/claude-code/issues/106167) |
| #84938 | Claude Desktop 反复要求重新登录，会话/会话掉落持续存在 | OPEN | 9 / 0 | 长期未解决的认证会话不稳定问题，影响桌面端可用性 | [查看](https://github.com/anthropics/claude-code/issues/84938) |
| #102762 | 远程控制（移动端）：手机端未显示会话启动卡片/任务芯片，start_session 被拒绝 | OPEN | 5 / 3 | 跨端协作体验缺口，Windows 11 + Android 组合受影响 | [查看](https://github.com/anthropics/claude-code/issues/102762) |
| #104895 | 预热备用会话中，项目和本地 MCP 服务器在首轮结束时被拆解 | OPEN | 4 / 3 | MCP 服务器生命周期管理缺陷，涉及多平台桌面端 | [查看](https://github.com/anthropics/claude-code/issues/104895) |
| #78439 | 备份保留机制（keep-last-5）在并发写入损坏后淘汰最后一个良好 .claude.json，导致配置永久丢失 | OPEN | 3 / 0 | 数据丢失风险，配置文件备份逻辑存在缺陷 | [查看](https://github.com/anthropics/claude-code/issues/78439) |
| #103389 | 允许修改现有 Claude 账户的邮箱地址（#61022 的后续） | OPEN | 2 / 4 | 账户管理功能缺失，用户迁移/更换邮箱时受阻 | [查看](https://github.com/anthropics/claude-code/issues/103389) |
| #106412 | 在 Claude Code 中原生集成 Forgejo / Gitea（桌面端 PR 栏、CLI、云端会话、连接器） | OPEN | 1 / 1 | 代码托管平台生态扩展，超越 GitHub/GitLab 范围 | [查看](https://github.com/anthropics/claude-code/issues/106412) |

**社区反应简述**：  
计费异常（#105240、#103437）和账号切换（#22872）是今日评论与赞数双高的议题，表明用户对**成本可预测性**和**多账号工作流**的敏感度较高。MCP 服务器生命周期（#104895）和配置丢失（#78439）则涉及核心工程稳定性，值得工程团队优先排查。

---

## 4. 重要 PR 进展（精选 7 条，全部列出）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #106583 | 将 Issue 分类和去重工作流迁移至 Claude Sonnet 5.5 | OPEN | 把三个调用 Claude 的 GitHub Actions 工作流（claude-issue-triage、claude-dedupe-issues、claude.yml）的模型从 Opus 4.6 / Sonnet 4.6 统一升级到 Sonnet 5.5 | [查看](https://github.com/anthropics/claude-code/pull/106583) |
| #19866 | fix(ralph-wiggum): 处理空 PROMPT_PARTS 数组的 set -u | CLOSED | 修复 `/ralph-loop` 无参数运行时因 `set -u` 导致的 "unbound variable" 崩溃，为数组扩展添加默认空字符串 | [查看](https://github.com/claude-code/pull/19866) |
| #44071 | docs: 将 README 中的 'Get Started' 标题大写 | CLOSED | 文档规范化，将 `## Get started` 改为 `## Get Started`，与其他章节标题大小写风格保持一致 | [查看](https://github.com/claude-code/pull/44071) |
| #50672 | docs(changelog): 修复 2.1.111 条目中的技能名称 | CLOSED | 将 CHANGELOG 中 2.1.111 版本的技能名从 `/less-permission-prompts` 更正为实际名称 `/fewer-permission-prompts` | [查看](https://github.com/claude-code/pull/50672) |
| #19867 | fix(code-review): 允许在推送新提交时重新审查 | CLOSED | 修复 code-review 插件在新提交推送后跳过审查的问题，新增 `--force` 标志可绕过检查 | [查看](https://github.com/claude-code/pull/19867) |
| #40822 | docs(vscode): 添加 "未响应" 状态栏指导 | CLOSED | 在 README 中补充 VS Code 扩展状态栏说明，区分正常 spinner 进度与 ~60 秒无后端响应的 "Not responding" 警告状态 | [查看](https://github.com/claude-code/pull/40822) |
| #24360 | docs: 向 README 添加配置文件参考 | CLOSED | 新增配置章节，说明 `~/.claude.json`（应用状态）与 `~/.claude/settings.json`（用户可编辑配置）的层级与优先级 | [查看](https://github.com/claude-code/pull/24360) |

**PR 趋势简述**：  
今日 PR 以文档修复、小型 Bug 修复和内部工作流模型升级为主，无重大功能合入。#106583 将社区 Issue 处理流程迁移至 Sonnet 5.5，体现 Anthropic 内部也在加速新模型在工具链中的落地。

---

## 5. 功能需求趋势

从近 24 小时的 Issue 讨论中，可提炼出以下社区关注方向：

1. **账号与身份管理**  
   跨个人/工作账号切换（#22872）、邮箱修改（#103389）、OAuth 权限扩展（#69496）反复出现，用户希望获得更灵活的多身份、多工作空间切换体验。

2. **计费与使用量透明度**  
   Max 5x 使用量异常激增（#105240、#103437、#106322）集中在 10 月中下旬，社区强烈要求提供更细粒度的 Token/成本追踪和异常告警机制。

3. **IDE 与跨端集成深化**  
   VS Code 扩展会话配置（#90818）、远程控制移动端会话卡片（#102762）、iOS Simulator MCP 定位（#88217）表明开发者希望在编辑器与移动端之间获得无缝的会话继承与状态同步。

4. **MCP 生态稳定性**  
   MCP 服务器拆解（#104895）、数组参数字符串化（#86459）等问题显示，MCP 协议在桌面端的生命周期管理和参数传递仍需打磨。

5. **第三方代码托管支持**  
   Forgejo/Gitea 集成请求（#106412）显示部分企业用户希望脱离 GitHub/GitLab，获得自托管代码平台的原生支持。

---

## 6. 开发者关注点（痛点与高频需求）

### 高频痛点
- **认证会话不稳定**：Claude Desktop 反复要求重新登录（#84938），会话掉落导致桌面端体验中断，是长期未解决的老问题。
- **配置与数据丢失风险**：备份机制在并发损坏场景下可能永久覆盖良好配置（#78439），涉及 `.claude.json` 等核心配置文件的安全性。
- **跨平台兼容性**：Windows 路径大小写敏感导致工作区无法恢复（#85234）、旧 CPU 缺乏 AVX/AVX2 指令集导致崩溃（#103589）、Linux 托盘图标主题适配问题（#77170），提示底层跨平台适配仍有短板。

### 高频需求
- **更细粒度的模型/插件条件配置**：按模型差异化启用 Hooks/Plugin/Skill（#90817），以在小模型上节省 Token、在前沿模型上发挥性能。
- **会话状态与历史保留**：VS Code 扩展中远程控制下 Fork 会话

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-02  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

Codex 社区今日围绕 **CLI 与桌面端的使用额度自动恢复** 展开高强度讨论，多个关于 "usage limit reset 后自动续会" 的功能请求持续获得高赞与评论。同时，Windows 平台的 `git.exe` 进程风暴与 Computer Use 卡顿问题，以及 macOS 移动端远程聊天初始化缺陷，成为跨平台稳定性的主要痛点。Rust 侧发布了 `0.167.0-alpha.2` / `0.167.0-alpha.3` 两个连续 Alpha 版本，主要涉及构建配置与 TUI 会话管理的细节修复。

---

## 2. 版本发布

过去 24 小时内发布了两个 Rust 侧 Alpha 版本：

| 版本 | 标签 | 说明 |
|------|------|------|
| rust-v0.167.0-alpha.3 | `0.167.0-alpha.3` | 连续迭代的 Alpha 预览版 |
| rust-v0.167.0-alpha.2 | `0.167.0-alpha.2` | 连续迭代的 Alpha 预览版 |

> 注：发布说明未提供详细变更日志，建议关注后续稳定版发布说明以获取完整变更内容。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数及代表性）筛选：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #21073 | Feature Request: Auto-resume CLI session when usage limit resets | CLI 命中使用额度时已显示重置时间，但若重置时段用户正在睡眠，任务会中断且需手动恢复，请求在额度恢复后自动续会。 | 23 条评论，89 👍，社区高度认可，属于长期高频需求 | [查看](https://github.com/openai/codex/issues/21073) |
| #28931 | Auto Resume /Goal after limit reached once limit is reset (5h) | App 端在 5 小时或周限额达到后停止，期望额度重置后自动恢复 Goal，或提供开关选项。 | 15 条评论，76 👍，与 #21073 形成 CLI/App 端的双重诉求 | [查看](https://github.com/openai/codex/issues/28931) |
| #58530 | Please preserve separate ChatGPT and Codex usage allowances on Plus | Plus 订阅用户反馈，希望 ChatGPT 与 Codex 保持独立使用额度，反对统一限额。 | 10 条评论，16 👍，涉及订阅计费模式的敏感反馈 | [查看](https://github.com/openai/codex/issues/58530) |
| #57721 | macOS: mobile-created remote chats report browser disabled until a desktop message initializes the same chat | 完全在移动端创建的远程聊天，在 macOS 桌面端显示“浏览器已禁用”，需桌面端发送一条消息初始化后才可访问连接的 Mac。 | 17 条评论，跨平台同步缺陷 | [查看](https://github.com/openai/codex/issues/57721) |
| #20933 | Windows desktop app triggers multiple `git.exe add -A` processes | 打开本地项目/聊天 UI 时触发多个并行 `git.exe add -A` 及 `rev-parse`，导致严重 CPU 和磁盘占用。 | 16 条评论，11 👍，Windows 性能回归问题 | [查看](https://github.com/openai/codex/issues/20933) |
| #56941 | [Windows][Computer Use] System-wide UI lag persists after Computer Use | 使用 Computer Use 后，整个 Windows 图形界面持续卡顿，仅杀死 `codex-computer-use.exe` 即可立即恢复。 | 13 条评论，Windows 端自动化模块的稳定性隐患 | [查看](https://github.com/openai/codex/issues/56941) |
| #32810 | Shared Projects missing from ChatGPT macOS app after update | 更新后，ChatGPT macOS 应用中共享项目不再显示。 | 11 条评论，8 👍，macOS 项目同步/显示缺陷 | [查看](https://github.com/openai/codex/issues/32810) |
| #45873 | New ChatGPT Desktop Personalization showing Codex settings instead of ChatGPT settings | 新版 ChatGPT 桌面个性化设置中错误地显示了 Codex 设置而非 ChatGPT 设置。 | 14 条评论，7 👍，UI/设置界面混淆问题 | [查看](https://github.com/openai/codex/issues/45873) |
| #28437 | Support PreToolUse permissionDecision: ask for native approval prompts | 请求原生支持 `PreToolUse` 钩子返回 `permissionDecision: "ask"`，以便钩子可将特定工具调用升级为人工审批提示。 | 9 条评论，9 👍，钩子权限控制的增强需求 | [查看](https://github.com/openai/codex/issues/28437) |
| #18937 | Windows: Codex can fail to execute any PowerShell shell commands when PATH resolves an unusable pwsh alias | Windows 上 PATH 解析到不可用的 `pwsh` 别名时，Codex 无法执行任何 PowerShell 后端的 shell 命令。 | 8 条评论，4 👍，CLI 工具调用在 Windows 上的兼容性问题 | [查看](https://github.com/openai/codex/issues/18937) |

---

## 4. 重要 PR 进展（精选 10 条）

过去 24 小时内共 13 个 PR 更新，全部为 `CLOSED` 状态，多由 `copyberry[bot]` 提交，涉及 TUI、构建流程、语音构建及剪贴板等细节：

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #58767 | Validate `/fork` before consuming the composer draft | 在分发前验证 `/fork`，避免 MCP 启动阻塞分叉，并在前台工作待处理时保留草稿及图片附件。 | [查看](https://github.com/openai/codex/pull/58767) |
| #58766 | Distinguish update handoffs in TUI startup telemetry | 启动更新提示时记录 `app_server_mode=update_requested`，区分更新交接与未确认启动，修正遥测数据。 | [查看](https://github.com/openai/codex/pull/58766) |
| #58757 | Remove Bazel outputs from DotSlash release configs | 移除 DotSlash 发布配置中的 Bazel 输出，修复 `0.167.0-alpha.2` Cargo-only 发布资产中缺少 Bazel 资产的问题。 | [查看](https://github.com/openai/codex/pull/58757) |
| #58751 | Release superseded assistant text from live paginated history | 为持久化历史线程释放过时助手文本，仅保留最新消息摘要，同时保留完整简历响应。 | [查看](https://github.com/openai/codex/pull/58751) |
| #58727 | Use local Bazel for voice release builds | 语音发布构建因 BuildBuddy 凭证不可用，改为使用本地 Bazel 配置（Linux/macOS/Windows）。 | [查看](https://github.com/openai/codex/pull/58727) |
| #58722 | Add naming and navigation helpers for TUI backend sessions | 为 TUI 后端会话增加命名、查找首个监听后端及按注册顺序循环切换的辅助方法。 | [查看](https://github.com/openai/codex/pull/58722) |
| #58720 | Prioritize pending approvals in the subagent picker | 在 `/subagents` 选择器中将需审批的线程置顶并标记 `(needs approval)`，默认选中第一个等待线程。 | [查看](https://github.com/openai/codex/pull/58720) |
| #58719 | Wire native voice dependencies into full Rust CI | 将原生语音 SDK 与运行时构件纳入完整 Rust CI（Linux/macOS/Windows，x64/ARM64），musl 构建单独作业。 | [查看](https://github.com/openai/codex/pull/58719) |
| #58718 | Support rendering TUI conversations within an inset area | 将 TUI 会话渲染拆分为准备、绘制、后处理步骤，支持在指定边界内渲染对话内容。 | [查看](https://github.com/openai/codex/pull/58718) |
| #58716 | Support OSC 52 clipboard forwarding through GNU screen | 检测 GNU screen（`STY` 环境变量）并将 OSC 52 剪贴板序列封装为 DCS 透传字符串，分块发送以兼容 screen 的 256 字节限制。 | [查看](https://github.com/openai/codex/pull/58716) |

---

## 5. 功能需求趋势

从近 24 小时 Issues 中可清晰识别出以下社区关注方向：

1. **使用额度自动恢复（Auto-Resume / Quota Management）**  
   多个 Issue（#21073、#28931、#32218、#34188、#43605、#44987）集中请求在 CLI 与 App 端实现“额度重置后自动续会”，是社区最强烈的功能诉求。

2. **跨平台与多端同步稳定性**  
   macOS 移动端创建的远程聊天无法在桌面端直接访问（#57721）、Android 缺少模型选择器（#43034）、Windows 与 macOS 的项目/设置同步缺陷（#32810、#45873），表明多端体验一致性仍是短板。

3. **Windows 平台性能与兼容性**  
   `git.exe` 进程风暴（#20933）、Computer Use 后系统级 UI 卡顿（#56941）、PowerShell 路径解析失败（#18937）、策略阻止缺乏详情（#58437、#55556），Windows 端的工具调用与自动化模块需要重点优化。

4. **钩子与权限控制增强**  
   `PreToolUse` 原生审批提示（#28437）及子代理选择器审批优先级（#58720）显示开发者希望获得更细粒度的代理行为干预能力。

5. **计费与订阅模式透明

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-02)

## 今日速览

Gemini CLI 今日发布夜间版本 `v0.67.0-nightly.20261101`，社区围绕 **子代理（Subagent）稳定性**、**浏览器代理兼容性** 以及 **工具调用超时与安全性** 展开密集讨论与修复。多个 P1 级 Bug 仍未解决，特别是子代理状态上报错误和通用代理挂起问题，成为当前最高优先级的修复目标。

## 版本发布

- **v0.67.0-nightly.20261101.g6814e00d6**  
  夜间构建版本，自动化版本 bump，详见完整变更对比：  
  https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261031.g6814e00d6...v0.67.0-nightly.20261101.g6814e00d6  
  关联 PR：#30072

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 核心内容 | 为何值得关注 | 链接 |
|---|------|------------|---------|------------|------|
| #22323 | Subagent recovery after MAX_TURNS reported as GOAL success | P1 / Bug | 子代理在达到最大轮次限制后仍上报 `status: "success"`，掩盖了实际中断。 | 直接影响任务可靠性，用户可能误以为子代理已完成工作。 | https://github.com/google-gemini/gemini-cli/issues/22323 |
| #21409 | Generalist agent hangs | P1 / Bug | 通用代理在处理简单操作（如创建文件夹）时无限挂起，需手动取消。 | 严重影响交互体验，已有用户等待超一小时。 | https://github.com/google-gemini/gemini-cli/issues/21409 |
| #19873 | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | P2 / Enhancement | 提出利用 Gemini 模型原生 Bash 能力，通过零依赖 OS 沙箱与后执行意图路由提升代理能力。 | 指向未来代理执行架构的重大方向，社区讨论活跃。 | https://github.com/google-gemini/gemini-cli/issues/19873 |
| #22745 | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 探索 AST 感知的文件读取、搜索与代码映射，以减少 Token 浪费并提升定位精度。 | 涉及代码理解质量与上下文效率的核心优化方向。 | https://github.com/google-gemini/gemini-cli/issues/22745 |
| #21968 | Gemini does not use skills and sub-agents enough | P2 / Bug | 模型主动调用自定义技能和子代理的意愿不足，需显式指令才会使用。 | 影响子代理生态的实用性，是当前 Agent 工作流的关键瓶颈。 | https://github.com/google-gemini/gemini-cli/issues/21968 |
| #22267 | Browser Agent ignores settings.json overrides | P2 / Bug | 浏览器代理完全忽略全局/项目级 `settings.json` 中的配置（如 `maxTurns`）。 | 配置不生效会导致行为不可预期，影响企业级定制场景。 | https://github.com/google-gemini/gemini-cli/issues/22267 |
| #21983 | browser subagent fails in wayland | P1 / Bug | 浏览器子代理在 Wayland 环境下失败，终止原因为 GOAL。 | Linux 桌面环境兼容性问题，影响部分开发者的日常使用。 | https://github.com/google-gemini/gemini-cli/issues/21983 |
| #24246 | Gemini CLI encounters 400 error with > 128 tools | P2 / Bug | 工具数量超过 128 个时出现 400 错误，期望代理能更智能地限制工具范围。 | 随技能和子代理增多，工具爆炸问题日益凸显。 | https://github.com/google-gemini/gemini-cli/issues/24246 |
| #22186 | get-shit-done output hook causes crash | P1 / Bug | 在输出用户总结近完成时，输出钩子导致 CLI 崩溃。 | 影响任务完成后的反馈闭环，需尽快修复。 | https://github.com/google-gemini/gemini-cli/issues/22186 |
| #22672 | Agent should stop/discourage destructive behavior | P2 / Customer Issue | 模型在复杂 Git 操作或数据库维护中可能使用 `git reset --force` 等破坏性命令。 | 涉及数据安全与操作可控性，社区关注度高。 | https://github.com/google-gemini/gemini-cli/issues/22672 |

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型/规模 | 核心变更 | 状态 | 链接 |
|---|------|----------|---------|------|------|
| #30088 | fix(core): keep error reports out of the shared temp directory | Security / M | 将包含完整聊天历史的错误报告从 `os.tmpdir()` 移至 `~/.gemini/tmp/error-reports/`，并限制为当前用户可读。 | Open | https://github.com/google-gemini/gemini-cli/pull/30088 |
| #30051 | fix(cli): kill active shells and persist tool calls on headless interruption | Non-interactive / L | 修复头less 模式下中断信号（SIGINT/SIGTERM/SIGHUP）导致 shell 进程孤立及退出码错误的问题。 | Open | https://github.com/google-gemini/gemini-cli/pull/30051 |
| #30082 | feat(core): add model.requestTimeoutMs setting | Core / M | 新增 `model.requestTimeoutMs` 设置，允许调整 API 头部超时（原为 60s 硬编码），解决长思考请求被中断问题。 | Open | https://github.com/google-gemini/gemini-cli/pull/30082 |
| #27423 | feat(core): add configurable per-tool-call timeout (tools.callTimeout) | Core / L | 新增 `tools.callTimeout` 设置，对单次工具调用（尤其 shell 命令）设置墙时钟超时。 | Open | https://github.com/google-gemini/gemini-cli/pull/27423 |
| #29918 | feat(cli): report working, blocked and idle status to the terminal (OSC 7501) | Core / XL | 交互式 TUI 通过 OSC 7501 向终端报告会话状态（working/blocked/done/error/idle），便于多标签页管理。 | Open | https://github.com/google-gemini/gemini-cli/pull/29918 |
| #30020 | fix(core): drop tool calls streamed by failed attempts on retry | Core / L | 修复重试时失败尝试的工具调用流被前端误执行，导致副作用命令重复执行的问题。 | Open | https://github.com/google-gemini/gemini-cli/pull/30020 |
| #30071 | Route MCP OAuth fetches through the safe dispatcher | Security / M | 将 MCP OAuth 元数据与注册请求改通过安全分发器，防止 DNS 解析不一致导致的安全绕过。 | Open | https://github.com/google-gemini/gemini-cli/pull/30071 |
| #29912 | fix(core): strip trailing punctuation and unbalanced brackets from web_fetch URLs | Core / M | 修复 `web_fetch` 工具中 URL 解析问题，避免逗号等标点污染 URL 导致请求失败。 | Open | https://github.com/google-gemini/gemini-cli/pull/29912 |
| #29919 | feat(cli): append to the system prompt with --append-system-prompt | Core / L | 新增 `--append-system-prompt` / `--append-system-prompt-file` / 环境变量，支持在不替换系统提示词的前提下追加指令。 | Open | https://github.com/google-gemini/gemini-cli/pull/29919 |
| #29806 | fix(cli): support WSL2 clipboard display server fallbacks and non-PNG image formats | Core / M | 修复 WSL2 及非标准 Linux 环境下图片粘贴（Alt+V）问题，支持 BMP 等非 PNG 格式及 Wayland 回退。 | Closed | https://github.com/google-gemini/gemini-cli/pull/29806 |

## 功能需求趋势

从近期 Issues 与 PR 可观察到以下社区关注热点：

1. **子代理（Subagent）可靠性与可见性**  
   社区高度关注子代理状态上报准确性（#22323）、主动调用意愿不足（#21968）、轨迹共享（#22598）以及崩溃时的上下文丢失（#21763）。可见子代理已成为 Gemini CLI 核心工作流，但稳定性仍是短板。

2. **工具调用安全与超时控制**  
   多个 PR 和 Issue 指向单次工具调用超时（#27423）、工具数量过多导致 400 错误（#24246）、破坏性命令拦截（#22672）以及错误报告泄露（#30088）。开发者希望在保持代理能力的同时，增强可控性与安全边界。

3. **跨平台与环境兼容性**  
   Wayland 下的浏览器代理失败（#21983）、WSL2 剪贴板与图片格式支持（#29806）、symlink 代理识别（#20079）等问题表明，社区期望在 Linux 桌面及容器化环境下获得一致体验。

4. **模型能力与系统提示词定制**  
   零依赖 OS 沙箱（#19873）、API 超时可配置（#30082）、系统提示词追加（#29919）等需求显示，开发者希望更深度地定制模型行为与执行环境，以适配复杂工程场景。

## 开发者关注点

- **P1 级 Bug 未解决**：#21409（通用代理挂起）、#22323（子代理虚假成功）、#22186（输出钩子崩溃）、#21983（Wayland 浏览器失败）均为 P1 优先级，但均处于 Open 状态，社区对修复进度关注度高。
- **配置不生效问题**：#22267 反映浏览器代理忽略 `settings.json` 覆盖，#20079 提到 symlink 代理未被识别，配置系统的一致性亟待加强。
- **长时间运行任务的中断恢复**：#30051 试图解决头less 中断时 shell

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 (2026-11-02)

## 1. 今日速览

Reasonix 今日发布 **v2.56.1 修复版本**，重点收紧只读命令判定中的 `python -v` 安全漏洞，并修复手机窄屏布局、定时运行按钮空白、中文路径会话读取失败等多个客户端问题。社区围绕 **Office 文件预览与内容引用**、**会话批量管理**、**超级窗口/代理分发** 等功能展开活跃讨论，同时多个与上下文显示、会话丢失、密码明文泄露相关的 Bug 被反馈并随即通过 PR 修复。

---

## 2. 版本发布

| 版本 | 组件 | 核心更新 | 链接 |
|------|------|----------|------|
| **v2.56.1** | Reasonix CLI | 基于 Studio 发布构建 CLI 归档包 | [v2.56.1](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.56.1) |
| **studio-v2.56.1** | Reasonix Studio | **修复版**：收紧只读命令判定中 `python -v` 的漏洞；限制模型同时打开的网页数量；修复手机窄屏布局、定时运行按钮空白、待发送区误显示按钮、中文路径导致会话读不出等问题 | [studio-v2.56.1](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.56.1) |

**其他重要变更：**
- 网络盘（如 SMB 映射盘）工作区下，运行无法判断写入范围的命令前的目录遍历改为并发读取，大目录树等待时间大幅缩短（关联 [#14813](https://github.com/esengine/DeepSeek-Reasonix/issues/14813)）。
- 启动环境摘要优先复用当前数据目录的可信快照，避免其他目录探测结果改变系统提示，提升首次请求缓存命中率（修复 [#14676](https://github.com/esengine/DeepSeek-Reasonix/issues/14676)，@SivanCola 贡献）。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 类型 | 评论/赞 | 关注理由 | 链接 |
|---|------|------|---------|----------|------|
| #14622 | 右侧工作台添加多种文件格式预览及引用部分内容插入对话 | enhancement | 24 / 0 | 社区最高评论的功能需求，涵盖 Word/Excel/PPT 预览、视频支持、网页控件提取、Markdown 部分内容拖拽引用，直接关联后续多个 Office 预览 PR 的实施路线图。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14622) |
| #14897 | 没有这个会话 | bug | 8 / 0 | 用户反馈点击旧会话框提示“没有这个会话”，且不限于单一对话框，内存未清理，可能指向会话状态同步或持久化层的缺陷。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14897) |
| #14921 | 建议加入“超级窗口”实现跨会话任务分发 | enhancement | 5 / 0 | 参考 DeepSeek 官方 Super Agent 框架设想，建议在 Reasonix 增加实验性“超级窗口”作为任务调度入口，体现社区对多代理协作与跨会话工作流的期待。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14921) |
| #14611 | 会话增加批量删除功能 | enhancement | 5 / 0 | 用户吐槽当前逐个删除效率低，界面拥挤，呼吁增加批量归档/删除或独立会话管理界面，与近期合并的 SessionManager PR 形成需求-实现闭环。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14611) |
| #14892 | 建议加入临时会话功能 | enhancement | 2 / 0 | 提出类似“一次性对话”的需求：问完不保存，支持后续选择转为正常会话，反映用户对轻量级交互场景的需求。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14892) |
| #14870 | 编辑自动化-定时运行按键 UI Bug（预览键变白） | bug | 2 / 0 | v2.56.0 回归问题，定时任务编辑时预览按钮异常，已在 v2.56.1 修复日志中对应“定时运行按钮空白”。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14870) |
| #14872 | 反馈回复已读但仍提示查看回复 | bug | 2 / 0 | 反馈系统的已读状态不同步 Bug，影响用户对平台互动体验的信任度。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14872) |
| #14910 | 上下文只显示 60% 左右，且经常变动 | bug | 1 / 0 | 涉及模型上下文长度限制（1M tokens）与流式中断恢复，用户感知上下文窗口不稳定，可能与上下文截断或显示逻辑有关。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14910) |
| #14913 | `reasonix serve --auth password` 密码明文暴露在进程命令行 | bug | 0 / 0 | 安全问题：Linux 下密码通过 `--password` 明文传入，`ps` 即可泄露，已通过 PR #14914 改为从 `--password-file` 读取。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14913) |
| #14895 | 找不到该文件，它可能已被移动或删除 | bug | 1 / 0 | 文件引用失效后的提示体验问题，涉及工作区文件路径追踪与附件生命周期管理。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14895) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #14914 | fix(serve): 从 `--password-file` 读取密码，而非 argv | CLOSED | 修复 #14913，避免密码以明文出现在进程命令行中，提升服务端启动安全性。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14914) |
| #14922 | fix(studio): Reduced effects 也会停止循环运行动画 | CLOSED | 修复 #14919，解决两个会话处于 `wait` 状态时前台功耗异常（40–50 W）的问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14922) |
| #14916 | feat(studio): 新增「管理会话」面板，支持跨项目批量归档与删除 | OPEN | 实现 #14611 需求，提供跨项目会话列表、搜索、翻页、逐行/全选勾选、批量归档/取消归档/删除及二次确认。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14916) |
| #14917 | feat(workbench): 从 Office 预览中选取内容并附带位置插入对话 | OPEN | 实现 #14622 stage 1b，支持选中 Word/Excel 预览中的部分内容并以结构化位置插入聊天，而非猜测性文本定位。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14917) |
| #14915 | feat(workbench): 只读预览 Word 和 Excel 文件 | CLOSED | 实现 #14622 stage 1a，将 `.docx`/`.xlsx` 从不支持格式改为可只读预览，为后续 PPT 支持和内容引用奠定基础。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14915) |
| #14912 | fix(computer): 在符号边界截断长 CUA 拒绝原因 | CLOSED | 修复非 ASCII 字符下 `reason[:2048]` 按字节截断导致字符乱码的问题，改为按 grapheme 边界截断。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14912) |
| #14911 | fix(browser): 在符号边界截断长 eval 结果 | CLOSED | 修复浏览器评估结果非 ASCII 文本按字节截断导致的截断异常。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14911) |
| #14646 | feat: 新增会话管理视图，支持搜索、筛选、多选与二次确认批量删除 | CLOSED | 更早的会话管理视图实现，侧边栏入口，支持按名称搜索、状态筛选、项目筛选及批量删除。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14646) |
| #14787 | feat: 粘贴从系统文件管理器复制的文件 | CLOSED | 支持从 Windows 资源管理器/macOS Finder 复制文件后粘贴到输入框，Studio 通过 Electron 主进程读取剪贴板文件格式并落盘，行为与拖拽一致。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14787) |
| #14779 | feat: 仅在有授权时从工作区外部读取图片 | CLOSED | `GET /workspace/image` 接受工作区外绝对路径，但需存在覆盖该路径的授权（grant），否则返回 403；复制按钮拆分为“复制全部”与“仅复制文本”，避免泄露内部附件路径。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14779) |

---

## 5. 功能需求趋势

从近 24 小时的 Issues 和 PR 中，可提炼出以下社区关注方向：

1. **多模态文件预览与精细化引用**  
   用户强烈希望在工作台直接预览 Word/Excel/PPT 及

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报
**日期**: 2026-11-02  
**数据来源**: github.com/anomalyco/opencode  

---

## 1. 今日速览

过去24小时 OpenCode 仓库未发布新版本，但社区活跃度较高，共更新 25 个 Issue 和 50 个 PR。核心关注点集中在 **终端命令执行异常、网络连接中断（ECONNRESET）、付费/订阅问题** 以及 **插件系统扩展** 上。多个新开 Issue 反映用户在 v2.2.x 版本中遇到“不可用”或“崩溃”场景，亟待官方 triage 与修复。

---

## 2. 版本发布

过去24小时内无新 Release 发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 核心内容 | 关注理由 | 链接 |
|---|------|------|----------|----------|------|
| #61109 | The OpenCode terminal appears unable to execute commands properly | OPEN | 终端命令时常失败并挂起，需 Ctrl+C 强制中断后重新输入 | 直接影响日常使用，属于高优先级可用性 Bug | [查看](https://github.com/anomalyco/opencode/issues/61109) |
| #60636 | [triaging] error: CONNRESET socket connection closed | OPEN | 桌面应用出现 `CONNRESET: the socket connection was unexpectedly closed` 错误 | 网络连接不稳定是近期高频报错，与 #60662 形成模式 | [查看](https://github.com/anomalyco/opencode/issues/60636) |
| #60662 | [triaging] does not connect to the internet | OPEN | 会话操作失败并抛出 `ECONNRESET`，建议开启 `verbose: true` 排查 | 多用户反馈无法联网，可能与代理、防火墙或底层 fetch 实现有关 | [查看](https://github.com/anomalyco/opencode/issues/60662) |
| #61113 | TUI crash: Authentication required | OPEN | TUI 崩溃，抛出 `UnauthorizedError: Authentication required` | 认证模块异常会导致终端界面直接不可用，需紧急修复 | [查看](https://github.com/anomalyco/opencode/issues/61113) |
| #60739 | [triaging] Not usable | OPEN | v2.2.4 版本突然无法使用，仅输入 `opencode` 后即报错 | 用户反馈“突然不可用”，暗示可能存在版本回归或环境依赖问题 | [查看](https://github.com/anomalyco/opencode/issues/60739) |
| #60818 | [Bug]: Specific session gets stuck with "No items available" | OPEN | 特定会话卡住，显示“无可用代理”和 `Model: n/a`，其他会话正常 | 会话级别故障，排查难度较高，影响多项目并行使用 | [查看](https://github.com/anomalyco/opencode/issues/60818) |
| #53529 | [FEATURE]: Allow API clients and agents to open existing sessions as Desktop tabs | OPEN | API 可创建/移动会话，但无法让桌面客户端将现有会话作为标签页打开 | 桌面端多会话管理是增强开发者工作流的重要方向 | [查看](https://github.com/anomalyco/opencode/issues/53529) |
| #60976 | [FEATURE]: Load configured ./gui-experimental plugins in the web app | OPEN | GUI 插件目前仅在 Desktop 加载，请求在 Web App 中也支持 | 插件生态跨端统一是社区长期关注的扩展性需求 | [查看](https://github.com/anomalyco/opencode/issues/60976) |
| #52958 | [Billing] OpenCode Go subscription: all payment methods declined from Italy (EU) | CLOSED | 意大利用户所有支付方式（实体卡、Apple Pay、Stripe Link、虚拟 Mastercard）均被拒绝 | 涉及跨区支付网关，影响订阅转化，属于商业化关键路径 | [查看](https://github.com/anomalyco/opencode/issues/52958) |
| #1852 | Commands that need sudo access break the UI and make the agent hang | CLOSED | 需 sudo 权限的工具调用不接收输入，导致 UI 卡死或进程挂起 | 提权命令处理是终端类 AI 工具的经典难题，14 条评论显示社区关注度高 | [查看](https://github.com/anomalyco/opencode/issues/1852) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 影响 | 链接 |
|---|------|------|--------------|------|------|
| #58916 | perf(core): write each assistant part as its own row instead of rewriting the message | OPEN | 每个 assistant part 单独写入 `session_part` 行，而非重写整条消息。SQLite WAL 写入降低 84.4%，fsync 次数显著减少 | 核心性能优化，对长会话、多截图场景收益明显 | [查看](https://github.com/anomalyco/opencode/pull/58916) |
| #58938 | feat(core): stamp session rows with a change seq and add experimental changes endpoint | OPEN | 为会话行添加变更序列号，并提供实验性变更端点，支持客户端增量同步 | 改善多客户端（Web/Desktop/TUI）状态同步体验 | [查看](https://github.com/anomalyco/opencode/pull/58938) |
| #60836 | fix(core): let retry hooks handle content-filter finishes | OPEN | 修复 `finish: "content-filter"` 步骤导致重试钩子失效的问题 | 提升内容过滤场景下的重试鲁棒性 | [查看](https://github.com/anomalyco/opencode/pull/60836) |
| #59477 | refactor(browser): serve the in-app browser's tools from the desktop over client MCP | OPEN (Draft) | 内置浏览器工具通过客户端 MCP 注册，桌面端托管 `browser` MCP 服务，浏览器代码下沉 | 浏览器能力与桌面端解耦，为跨端复用铺路 | [查看](https://github.com/anomalyco/opencode/pull/59477) |
| #61112 | feat(app): group vertical tabs by server | CLOSED | 将垂直标签页按服务器分组，避免多服务器场景下标签混淆 | 改善多服务器连接时的标签页管理体验 | [查看](https://github.com/anomalyco/opencode/pull/61112) |
| #52533 | fix(tui): keep session model stable when recents sync | CLOSED | 修复 TUI 会话模型因最近列表同步而意外变更的问题 | 稳定 TUI 会话状态，避免模型被意外切换 | [查看](https://github.com/anomalyco/opencode/pull/52533) |
| #52496 | feat(sdk): expose session resume through API | CLOSED | 新增 `POST /api/session/:sessionID/resume`，支持在不写入消息的情况下恢复会话执行 | SDK 层会话恢复能力增强，利于头less 集成 | [查看](https://github.com/anomalyco/opencode/pull/52496) |
| #52539 | feat(app): add British English locale | CLOSED | 桌面端新增英式英语（UK）本地化，原 `en` 统一为美式英语 | 国际化支持进一步完善 | [查看](https://github.com/anomalyco/opencode/pull/52539) |
| #52517 | fix(ai): prevent unsupported tool files from breaking Chat sessions | CLOSED | 工具返回不支持的文件时不再导致后续 OpenAI Chat 请求失败 | 修复工具调用链中的历史重放脆弱点 | [查看](https://github.com/anomalyco/opencode/pull/52517) |
| #52580 | fix(core): keep background shell locations alive | CLOSED | 后台 shell 作业所在的 Location 服务保持缓存，避免因 Session 移动而误判 | 后台长运行命令的位置上下文更可靠 | [查看](https://github.com/anomalyco/opencode/pull/52580) |

---

## 5. 功能需求趋势

从近期 Issues 和 PR 中可提炼出以下社区关注方向：

1. **跨端插件生态**：多个 Issue 要求将 Desktop 独占的 `./gui-experimental` 插件能力扩展到 Web App（#60976），并希望插件可提供 worktree 设置默认值（#61117），表明社区希望插件系统实现“一次开发，多端运行”。
2. **桌面端多会话管理**：#53529 请求允许 API 客户端将现有会话作为 Desktop 标签页打开，反映用户在多项目并行场景下对标签页/工作区管理的需求。
3. **底层兼容性与降级**：#60982 请求为旧版非 SSE4.2 CPU 提供 Node.js 回退或兼容模式，显示社区关注在旧硬件上的可运行性。
4. **AI 思考过程可见性**：#60400 反馈 OpenAI 模型的思考摘要不再显示，用户希望恢复或增强模型推理过程的透明度。
5. **付费与订阅体验**：#52958 等跨区支付失败问题，以及 #61027、#60832 中的额度/限额错误，表明计费与订阅模块是用户体验的痛点。

---

## 6. 开发者关注点（痛点与高频需求）

### 痛点
- **终端与命令执行不可靠**：#61109、#1852 均涉及命令挂起、UI 卡死，需加强 PTY/Shell 层的错误恢复与超时机制。
- **网络连接中断**：`CONNRESET` / `ECONNRESET` 在 #60636、#60662 中多次出现，建议官方提供更详细的网络诊断工具（如 `verbose` 模式默认开放或文档化）。
- **认证与会话状态脆弱**：#61113 的 TUI 认证崩溃、#60818 的会话卡死（`Model: n/a`），说明会话状态机和认证刷新逻辑存在边界情况。
- **跨区支付失败**：欧洲用户无法完成 OpenCode Go 订阅（#52958），建议检查 Stripe 区域限制与支付网关配置。

### 高频需求
- **性能优化**：#58916 等 PR 显示社区对 SQLite

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-02)

## 今日速览

Hermes 社区今日围绕**统一网关（Unified Gateway）合并后遗症**展开密集讨论，#143547 成为评论量最高的跟踪 Issue，涉及会话持久化、跨客户端路由及安全边界等多个核心模块。与此同时，开发者集中提交了大量针对网关性能、桌面端 Wayland/macOS 适配、插件目录失效及移动端连接的 Bug 修复与性能优化 PR，社区整体处于“稳定性修复 + 多平台适配”并行阶段。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 为何值得关注 | 社区反应 | 链接 |
|---|------|---------|-------------|---------|------|
| #143547 | Unified gateway post-merge problems on main | 统一网关合并后，CLI、TUI、Desktop、API 等所有入口共享单一网关进程，出现会话路由、合并后遗留问题 | 评论数最多（34 条），涉及 gateway/cron/telegram/desktop 等多个组件，是当前主干分支最大的稳定性隐患 | 34 条评论，@dokterdok 持续跟进，社区关注度极高 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/143547) |
| #136012 | Gateway DM sessions grow unbounded; session_reset policy never consumed | 长期网关 DM 会话无限增长，配置的 `session_reset`（idle/at_hour）策略在路由路径中无消费者 | 直接影响生产环境 UX，会导致会话膨胀进入压缩循环，属 P2 级别核心缺陷 | 3 条评论，@JinHanAI 提供了生产实例数据 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/136012) |
| #147321 | Android beta: conversation scrolling stutters | Android 测试版对话滚动卡顿，长流式回复无法滚动至可视区域 | 移动端体验问题，涉及 streaming 组件，影响日常使用 | 5 条评论，@jasestu 反馈 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/147321) |
| #147377 | Login-stamped legacy Bot Chat row can't be adopted | 三个 profile 的“Bot Chat”行无法被任何 actor 采纳，message_agent 永久返回 not_found | 导致部分 profile 机器人对话完全不可用，属会话/认证交叉缺陷 | 2 条评论，@fredhill 新建，尚未修复 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/147377) |
| #147071 | `hermes chat -r` permanently detaches channel | CLI 打开消息平台会话后正常退出，通道被永久分离，下一条入站消息会创建全新空会话 | `cli_close` 不可恢复，影响 CLI 与消息平台（如 Feishu）的互操作性 | 2 条评论，@xuanyuezone 报告 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/147071) |
| #147660 | session-reset-policy never fires for GUI sessions | 仪表盘/桌面/移动端（source=gui）会话的重置策略不触发，导致会话膨胀进入压缩循环 | 与 #136012 类似，但范围扩展至 GUI 客户端，`hermes doctor` 误报已应用 | 1 条评论，@lEWFkRAD 新建 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/147660) |
| #147649 | session.close from one client tears down shared live session | 两个客户端共享同一 tui_gateway 会话时，任一方关闭会终止所有客户端运行时 | 跨客户端会话生命周期管理缺陷，影响桌面 + 移动端并发场景 | 0 条评论，@ivcdigital26 新建 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/147649) |
| #147655 | macOS gateway can't read login keychain | macOS LaunchAgent 在后台域加载，无法读取登录钥匙链，Claude DirectSDK 提示“Not logged in” | macOS 特定认证问题，影响桌面端关键插件功能 | 0 条评论，@linean 报告 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/147655) |
| #147726 | iOS beta SSH & Mosh mode fails post-auth | iOS TestFlight 版 SSH/Mosh 连接服务端成功但客户端报凭证错误 | 移动端远程连接模块缺陷，影响 iOS 用户核心功能 | 0 条评论，@joshpcm-coder 新建 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/147726) |
| #147725 | hermes security reports HIGH/MODERATE for pinned deps | pyasn1/setuptools/filelock 等依赖存在已知漏洞，需升级 | 供应链安全问题，涉及直接 pinned 依赖，需尽快修补 | 0 条评论，@IggyTheWolf 跟进 #143229 后续 | [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/147725) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 功能/修复说明 | 链接 |
|---|------|------|-------------|------|
| #147724 | Grok Bot users can move to Hermes from setup and migrate | Feature | `hermes setup` 首次运行新增 Grok Bot 导入选项；`hermes migrate <agent>` 安装导入器，填补 Grok Bot 迁移空白 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147724) |
| #147293 | Draw images inline in CLI and TUI | Feature | CLI/TUI 现在支持内联渲染图片（用户附件、工具生成图像、vision_analyze、浏览器截图），不再仅显示路径 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147293) |
| #147291 | Reach other gateways from one Webapp through signed relay | Feature | Web 应用可通过签名中继访问其他 Hermes 网关（如桌面、尾网 mini PC），加入网关切换器和侧边栏组 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147291) |
| #147654 | Offload xAI video generation to worker thread | Bug Fix | 修复在已运行事件循环的异步上下文中调用 `video_generate` 报“Cannot run the event loop”的问题 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147654) |
| #147294 | Interrupt during model wait never becomes stored reply | Bug Fix | 修复模型等待期间中断时，`final_response` 错误存储为等待哨兵，导致工具序列未正确关闭 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147294) |
| #147295 | Keep generated image in compact history projection | Bug Fix | 修复 TUI 历史压缩投影中 `image_generate` 结果丢失，桌面卡片仅显示“Image created”而不展示图片 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147295) |
| #147296 | Failed turn's error card stays single after later turns | Bug Fix | 修复桌面端失败回合的错误卡片在后续回合中重复插入/重建的问题 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147296) |
| #147288 | Read freshest of gui.log and gateway.log for activity tail | Bug Fix | 修复“最近活动”尾部日志读取问题，当 Desktop 以 gateway 模式运行时 gui.log 冻结导致活动尾部缺失 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147288) |
| #147661 | Support paginated GitHub acceptance reads | Bug Fix | Kanban 插件支持分页读取 GitHub 接受记录，替代不可用的 `--slurp`，处理 rulesets 403 回退 | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147661) |
| #147658 | Catalog: add hermes-gruvbox themes | Feature | 插件目录新增 `hermes-gruvbox`，提供六款桌面端 Gruvbox 主题（MIT 协议） | [查看 PR](https://github.com/NousResearch/hermes-agent/pull/147658) |

---

## 功能需求趋势

从今日 Issues 和 PR 中可提炼出以下社区关注方向：

1. **多平台客户端稳定性**：Android 滚动卡顿（#147321）、iOS SSH/Mosh 连接失败（#147726）、Linux Wayland 窗口按钮重叠（#147561）、macOS 钥匙链读取失败（#147655），移动端与桌面端适配成为高频需求。
2. **会话生命周期与重置策略**：`session_reset` 策略在 GUI 会话中不触发（#147660）、长期 DM 会话无限增长（#136012）、跨客户端 `session.close` 误伤（#147649），社区强烈要求更可靠的会话轮转与隔离机制。
3. **网关性能优化**：多个 P2 性能 PR 集中在网关 SQLite 读取离主事件循环（#147665）、TUI WebSocket 并发读取扩容（#147666）、Web API 内存缓存（#147667），说明单网关进程架构下的性能瓶颈已凸显。
4. **插件生态与目录可用性**：ZidoCode 四个条目不可安装（#147662）、移动端推送插件不可发现（#147651）、新增 Gruvbox 主题（#147658），插件目录的维护与发现性受到关注。
5. **安全与合规**：依赖漏洞报告（#147725）、跨 profile 记忆读取越权（#147659）、业务机器人绕过工具限制写入数据库（#147647），安全边界审计成为持续需求。

---

## 开发者关注点

- **统一网关合并后遗症**：#143547 暴露出单网关进程模式下，

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-02)

## 今日速览

今日 OpenClaw 社区无新版本发布，但活跃度较高：18 个 Issue 和 50 个 PR 在过去 24 小时内更新。社区核心关注点集中在 **会话状态丢失、内存泄漏、网关崩溃循环以及跨平台 UI 兼容性** 上，其中多个 P0/P1 级别的严重 Bug 仍未修复，建议运维和维护人员优先评估影响范围。

---

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 关键原因 | 链接 |
|---|------|------------|---------|------|
| #154474 | Completion batch 重复发布至顶层会话，操作器停止指令在循环中被丢弃 | P2, impact:session-state, impact:message-loss | 同一批次完成结果被重复发布 ~15 次，且操作器中止指令在循环中途丢失，可能导致会话状态不一致与消息丢失。 | [查看](https://github.com/openclaw/openclaw/issues/154474) |
| #141791 | 空的 legacy auth_profile_store 阻塞所有请求，删除表又导致网关无法启动 | P0, impact:auth-provider | 认证存储迁移陷入死锁：不迁移则所有请求失败，迁移/清理则网关无法启动，属于典型的无法恢复状态。 | [查看](https://github.com/openclaw/openclaw/issues/141791) |
| #162709 | 内存泄漏：session-transcript.worker.js 不会退出 Worker，RSS 每分钟增长 ~23 MB | P1, impact:crash-loop | 网关进程在正常负载下持续泄漏内存，1.5 小时内从 2.3 GiB 增至 4.07 GiB，触发多次 CRITICAL 内存压力事件，长期运行必然 OOM。 | [查看](https://github.com/openclaw/openclaw/issues/162709) |
| #141853 | 2026.9.2 后 browser 工具在 Agent 轮次中卡死，CLI 路径正常 | P1, regression, impact:ux-friction | 从 2026.8.2 升级后回归，浏览器工具在 Agent 调用时卡死直至网关重启，CLI 路径不受影响，范围明确但影响严重。 | [查看](https://github.com/openclaw/openclaw/issues/141853) |
| #186684 | claude-cli 工具列表变更导致原生会话失效，历史重新加载被拒绝，Agent 无历史重启 | P1, impact:session-state, impact:auth-provider | 会话历史丢失，Agent 重启后无法恢复上下文，直接影响长对话任务的可用性。 | [查看](https://github.com/openclaw/openclaw/issues/186684) |
| #141443 | Linux AppImage 2026.8.2 在 CachyOS Wayland 上显示空白/黑色窗口 | P0, regression, impact:ux-release-blocker | Linux 桌面端在特定发行版上无法渲染 UI，属于发布阻塞级别的回归问题。 | [查看](https://github.com/openclaw/openclaw/issues/141443) |
| #142013 | 网关排水期内 channel 入口每 40 ms 重复认领同一消息，3 分钟内产生 7098 次失败 | P2, impact:crash-loop | 消息入口在网关排水阶段陷入无效重试循环，可能导致消息积压和网关资源浪费。 | [查看](https://github.com/openclaw/openclaw/issues/142013) |
| #142002 | Codex 助手回复未标记 Control UI 会话为未读 | P2, impact:session-state, impact:ux-friction | UI 会话状态不同步，用户可能错过重要回复，影响交互体验。 | [查看](https://github.com/openclaw/openclaw/issues/142002) |
| #151068 | macOS 菜单栏 Settings 闪现但不显示 Dashboard 窗口 | P2, impact:ux-friction | macOS 原生应用菜单栏入口异常，用户无法通过常规路径打开设置。 | [查看](https://github.com/openclaw/openclaw/issues/151068) |
| #181884 | 模型通过 Tool Search 恢复后，未知工具名错误仍作为运行错误保留，导致 NO_REPLY 定时任务被判定失败 | P2, impact:ux-friction | 错误状态未随恢复操作清除，导致定时任务被误判为失败，影响自动化流程可靠性。 | [查看](https://github.com/openclaw/openclaw/issues/181884) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 类型 | 主要内容 | 链接 |
|---|------|------|---------|------|
| #190728 | fix: queued background replies drop sandbox attachments | Bugfix | 修复后台完成回复在附件使用绝对沙箱路径（如 `/workspace/exports/report.txt`）时丢失的问题，使其行为与前台回复一致。 | [查看](https://github.com/openclaw/openclaw/pull/190728) |
| #188147 | fix: child session activity ring freezes during startup | Bugfix | 修复新建子会话在工作区准备期间活动环冻结的问题，提升启动期的 UI 反馈准确性。 | [查看](https://github.com/openclaw/openclaw/pull/188147) |
| #188123 | fix(memory): one binding's dmScope pauses memory search for every agent | Bugfix | 修复单个路由绑定设置 `session.dmScope` 导致所有 Agent 内存搜索停止返回结果的问题，包括 `"main"` 绑定。 | [查看](https://github.com/openclaw/openclaw/pull/188123) |
| #188127 | fix(discord): channels named in non-Latin script resolve to a different channel | Bugfix | 修复非拉丁文字符（如 "чат"）命名的 Discord 频道解析错误，避免频道设置和工具策略应用到错误频道。 | [查看](https://github.com/openclaw/openclaw/pull/188127) |
| #190594 | fix(computer): preserve field and browser typing whitespace | Bugfix | 修复 `set_value.value` 和 `browser_type.text` 中前后空格被静默修剪的问题，保留空白字符串输入。 | [查看](https://github.com/openclaw/openclaw/pull/190594) |
| #190643 | fix(codex): retain compatible tool catalogs on settled local threads | Bugfix | 修复本地已定稿会话在添加兼容工具后丢失的问题，以及审批延迟后工具仍执行旧操作的问题。 | [查看](https://github.com/openclaw/openclaw/pull/190643) |
| #168261 | fix(config): preserve whitespace in secrets provider file paths | Bugfix | 修复 `openclaw config set` 在写入 secrets 提供程序路径时修剪空格，导致以空格结尾的凭证文件路径被错误重写。 | [查看](https://github.com/openclaw/openclaw/pull/168261) |
| #188125 | feat(ui): start diagnostic conversations from the command palette | Feature | 新增 Control UI 命令面板（Cmd/Ctrl+K → Diagnose a problem）入口，可直接打开带诊断附件的对话，无需手动复制 CLI 输出。 | [查看](https://github.com/openclaw/openclaw/pull/188125) |
| #190727 | feat(cron): expose selected agent failure observations to plugins | Feature | 为 Cron 自动化失败钩子提供无内容的终端观察，让插件能区分选定 Agent 失败与替代交付错误。 | [查看](https://github.com/openclaw/openclaw/pull/190727) |
| #190589 | perf(control-ui): show placed dashboard conversations immediately | Performance | 优化 Control Dashboard 会话可见性，减少温启动后转录可见前的加载状态帧数，提升感知性能。 | [查看](https://github.com/openclaw/openclaw/pull/190589) |

---

## 功能需求趋势

从本期 Issues 中可观察到社区在以下功能方向上有明确需求：

1. **插件生态扩展**：多个 P3 级 Feature Issue 指向官方插件目录与能力扩展，包括 Zalo 贴纸支持（#189354）、ElevenLabs 多角色对话生成（#187817）、ElevenLabs 批量转录关键词提示（#184709），以及 ShieldCortex 和 multi-clawd 进入官方插件目录或认证发布者列表（#183537）。说明社区正在积极构建第三方插件，并期望获得更正式的分发与认证通道。

2. **技能与学习复用（Skill Workshop）**：#150250 提出验证学习覆盖率和行为复用的 Skill Workshop 功能，旨在从日常工作中捕获过程性发现，并验证技能修订对后续任务的改进效果。这反映出用户希望 OpenClaw 不仅是执行工具，还能承担知识沉淀与复用的角色。

3. **跨平台与桌面端体验**：macOS 菜单栏设置异常（#151068）、Linux Wayland 空白窗口（#141443）、Windows 多网关运行文档缺失（#188161）等问题表明，桌面端兼容性与多操作系统一致性仍是社区关注的薄弱环节。

---

## 开发者关注点

1. **会话状态与消息可靠性**：多个高优先级 Issue 涉及会话状态损坏、消息重复发布、历史重新加载被拒绝（#154474、#186684、#142002），开发者亟需更稳定的会话状态机与消息幂等性保障。

2. **网关稳定性与资源泄漏**：内存泄漏（#162709）、消息入口重复认领（#142013）、浏览器工具卡死（#141853）均直接导致网关崩溃或需要重启，运维人员应重点关注网关进程的长期运行表现。

3. **认证与迁移陷阱**：`auth_profile_store` 空表导致网关无法启动（#14179

:::
