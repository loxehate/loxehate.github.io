---
title: "AI CLI 工具社区动态日报"
published: 2026-10-04
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-04

> 生成时间: 2026-10-04 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-10-04）

> 数据口径说明：以下基于各日报过去 24 小时摘要。不同项目统计口径不同，有的给出 Issue/PR 总数，有的仅列 Top 10 或“重要更新”。表中“列出”表示日报呈现条目，不等于全量。

## 1. 生态全景

AI CLI 工具已从“终端里的编码助手”演化为多端 Agent 平台，竞争焦点正从模型能力转向运行时治理、IDE 集成、权限安全与跨平台可靠性。社区反馈中，消息丢失、静默失败、子代理路由异常、成本失控、上下文压缩反效果成为跨工具共性痛点。插件/MCP 生态快速扩张，但兼容性、诊断能力与安全边界仍不成熟。Windows、远程桌面、Wayland、非 UTF-8 终端等跨平台问题构成系统性债务。商业化与权益交付开始成为信任门槛，OpenCode Go 支付后余额/API Key 不同步即为典型信号。

## 2. 各工具活跃度对比

| 工具 | Release | Issues 动态 | PR 动态 | 本期信号 |
|---|---|---|---|---|
| Claude Code | v2.1.289 | 10 条热点，未给总数；#33932 41 评论/202👍 | 6 条更新，全部列出 | IDE Diff Review 需求最强，权限/成本/压缩问题集中 |
| OpenAI Codex | rust-v0.162.0-alpha.9/10/11 | 48 条，Top10；#49988 44👍 | 28 条，均 CLOSED | VS Code 消息可靠性成第一痛点，Windows 重灾区 |
| Gemini CLI | v0.64.0-nightly | Top10+其他3，未给总数；#22323 13 评论 | Top10+其他3，未给总数 | 子代理可靠性与沙箱安全并重，P1/P2 修复密集 |
| DeepSeek Reasonix | 无 | 列出 11 条；#11846 数据丢失级 | 约 17 条列出 | Windows CI 优化链 + 子代理 effort 配置体系 |
| Deepseek Harness | dsh-v0.2.1-alpha.1 | 0 | 0 | 早期 alpha，推出 Claude Code Mods 兼容层 |
| Hermes | 无 | 5 条，全部列出；#132401 P0 14 评论 | 50 条更新，挑 10 | scratch 静默清理风险最高，权限/沙箱 PR 活跃 |
| OpenClaw | v2026.9.8 | 14 条更新 | 50 条更新 | 消息投递可靠性、会话状态、多平台集成 |
| OpenCode | 无 | 列出 8 条；#37790 22 评论 | 列出 10 条 | 计费/权益断层、edit 工具缺陷、认证崩溃 |

补充：OpenClaw v2026.9.8 含 58 commits、43 PR、21 contributors，是本期发布力度最大的项目之一。

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| IDE 集成与消息可靠性 | Claude Code、OpenAI Codex、OpenClaw、OpenCode | Claude Code 要 VS Code Diff Review UI；Codex 出现消息被吞、队列卡死、streaming 状态不重置；OpenClaw 关注 Telegram/ACP 投递丢失 |
| Agent/Subagent 编排与成本治理 | Claude Code、Gemini CLI、OpenCode、OpenClaw、OpenAI Codex | 子代理结果误路由、MAX_TURNS 误报成功、对抗审查消耗 1.5M tokens、Dots 委派工具缺失；需要轮次/成本上限与可靠路由 |
| 权限、安全与沙箱 | Claude Code、Gemini CLI、Hermes、OpenClaw、OpenCode | 工具级 allow/ask/deny、插件不能放宽权限、零依赖 OS 沙箱、bwrap、防 `git reset --force`、审批链路可达 |
| 上下文压缩与成本可观测 | Claude Code、OpenAI Codex、Gemini CLI、OpenCode、DeepSeek Reasonix、OpenClaw | 自动压缩反而增加 on-wire context；长上下文被错误限制为 400k；工具数 >128/400 触发 400；需要压缩前后 token 透明与成本估算 |
| 插件/MCP 生态成熟度 | Claude Code、Gemini CLI、DeepSeek Reasonix、Deepseek Harness、OpenClaw、OpenAI Codex | 插件提示不可用、Unicode 名称不一致、MCP 超时/登录断裂、step-up authorization、Claude Code Mods 兼容层、可关闭外部 catalog feed |
| 跨平台与 Windows 专项 | OpenAI Codex、Claude Code、Gemini CLI、OpenCode、DeepSeek Reasonix、Hermes | Windows 桌面崩溃、WSL 项目失败、非 UTF-8 编码乱码、Wayland browser subagent 失败、FreeBSD 原生二进制、Windows CI 423s 超时 |
| 数据持久化、迁移与清理 | Gemini CLI、DeepSeek Reasonix、Hermes、OpenClaw | `state.json` 原子写、恢复会话重复 functionResponse、MigrateV2 无快照、scratch 24h 静默删除、显式归档未释放资源 |
| 本地/私有模型与商业化 | OpenCode、DeepSeek Reasonix、Hermes | LAN 本地提供商发现、远程 SSH 引导 PATH 问题、MCP env_file 隔离；OpenCode Go 支付成功但余额/API Key 未同步 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术/生态位 |
|---|---|---|---|
| Claude Code | 终端+IDE 深度集成、插件/Mod、企业权限治理 | 专业开发者、团队 | Anthropic 生态核心入口，强权限规则、hooks、插件系统 |
| OpenAI Codex | 多端统一、Dots 委派、Code Mode、Computer Use/Chrome | ChatGPT 生态用户、企业 | Rust 快速迭代，MCP/工具目录，Windows 与桌面端问题突出 |
| Gemini CLI | 开源 CLI、Agent/Subagent/Browser、沙箱、AST-aware | Google/Gemini 开发者、Linux 用户 | 模型原生 bash 能力、安全沙箱、扩展系统 |
| DeepSeek Reasonix | Studio+插件+MCP+用量+远程 SSH | DeepSeek 用户、中文插件生态、自托管 | Unicode 插件、Windows CI、配置归一化正在补课 |
| Deepseek Harness | Claude Code Mods 兼容、Agent 创建插件 | 插件开发者、尝鲜者 | 早期 alpha，探索外部插件 API 映射 |
| Hermes | 自托管 Agent 平台、细粒度权限、沙箱、缓存、集成 | 企业、自托管、多平台团队 | 工具级审批、bwrap/Docker、MCP 隔离、资源生命周期 |
| OpenClaw | IM 消息网关 Agent、多平台集成、会话/审批 | 自动化用户、IM 工作流团队 | Telegram/Slack/Signal/WhatsApp 等通道，投递可靠性为核心 |
| OpenCode | 开源编码代理、TUI、本地模型、浏览器扩展 | 个人开发者、本地部署用户 | edit 工具可靠性、LAN 模型发现、task-parallel、订阅制 |

## 5. 社区热度与成熟度

**高活跃、高迭代：**
- **OpenClaw**：14 Issues、50 PR、v2026.9.8 含 58 commits/43 PR/21 contributors，消息投递与多平台集成问题密集。
- **OpenAI Codex**：48 Issues、28 PR、24 小时内连发 3 个 alpha，VS Code 扩展回归引发 44👍 高共鸣。
- **Hermes**：50 条 PR 更新，P0 scratch 清理问题 14 评论，权限/沙箱 PR 活跃。
- **DeepSeek Reasonix**：Windows CI 优化催生 #11882–#11889 一整条 PR 链，维护者主动治理测试性能。

**高关注、进入治理期：**
- **Claude Code**：Issue 热度极高，#33932 获 202👍，但 PR 仅 6 条更新，重点在权限、成本、压缩等运行时治理。
- **Gemini CLI**：P1/P2 修复集中关闭，nightly 持续发布，子代理挂起与误报成功是信任关键。

**快速迭代但基础可靠性承压：**
- **OpenCode**：计费、API Key、edit 工具、OpenAI 认证等多点出现问题，社区对稳定性敏感。

**早期/静默：**
- **Deepseek Harness**：过去 24 小时 Issues/PR 均为 0，仅发布 alpha 版本，仍处早期验证阶段。

结论：社区热度不等于成熟度。OpenAI Codex、OpenClaw 热度高但问题密度大；Claude Code、Gemini CLI 已进入稳定性与治理深水区；Deepseek Harness 仍需观察。

## 6. 值得关注的趋势信号

1. **消息可靠性压倒新功能**：OpenAI Codex 消息被吞、OpenClaw 投递丢失、OpenCode 死循环，说明“不丢、不卡、可解释”是 CLI/IDE Agent 的第一底线。
2. **Agent 成本治理成为硬需求**：Claude Code 对抗审查耗尽账号、Gemini 子代理挂起、OpenCode doom-loop 检测，开发者需要轮次上限、花费上限、严重性下限。
3. **权限从提示词走向硬约束**：Claude Code 插件不能放宽 deny/ask、Hermes 工具级 allow/ask/deny、Gemini 调度层阻止破坏性工具，表明安全策略必须下沉到运行时。
4. **上下文压缩透明化**：Claude Code 自动压缩反增 6.34 倍、Codex compaction 正确性、Gemini Tactful Extraction，长会话可信度取决于压缩机制是否可观测。
5. **IDE Diff Review 是最大体验缺口**：Claude Code #33932 202👍，Codex VS Code 回归，说明用户不满足终端交互，希望编辑器内完成审查、接受、拒绝。
6. **插件/MCP 进入兼容与治理阶段**：Claude Code Mods 兼容层、MCP step-up auth、插件诊断、Unicode 名称、catalog feed 可关闭，生态从“能装”走向“可诊断、可安全运行”。
7. **Windows/跨平台债务系统性爆发**：Codex Windows 桌面崩溃、WSL 失败、OpenCode 非 UTF-8 乱码、DeepSeek Reasonix Windows CI 423s，跨平台一致性仍是选型关键。
8. **数据迁移与清理安全需默认保守**：MigrateV2 无快照、scratch 24h 静默删除、显式归档不释放资源，自动清理/迁移必须引入快照、回滚、保留标记。
9. **本地/私有模型与局域网发现上升**：OpenCode LAN provider discovery、DeepSeek Reasonix 远程 SSH、MCP env_file 隔离，企业隐私与自托管需求持续增强。
10. **商业化权益交付影响信任**：OpenCode Go 支付成功但余额/API Key 不同步，说明计费与权益链路必须端到端校验，否则直接打击付费转化。

对技术决策者的建议：选型时优先评估运行时治理、消息可靠性、权限模型、上下文/成本可观测性和跨平台矩阵；插件生态重点看兼容层、诊断能力与安全边界；长会话/大仓库场景需重点验证压缩正确性与模型上下文限制。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-10-04  
说明：PR 评论数字段未展示，以下 PR 排行按给定热度顺序、近期更新活跃度及关联 Issue 影响综合选取；所列 PR 当前均为 **OPEN**，数据中未见 merged/draft 状态。

---

## 1. 热门 Skills 排行（PR）

1. **#1298 — fix(skill-creator): isolate trigger evals and handle Windows and runtime failures**  
   功能：修复 skill-creator 的 trigger evaluation 误判、Windows 子进程管道问题、运行时失败被错误当作“未触发”等问题。  
   热点：skill-creator 评测可靠性、Windows 兼容、负例误通过。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1298

2. **#1742 — fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers**  
   功能：适配 MCP >= 2.0 的 `streamable_http_client` 重命名，并修复自定义 HTTP headers 配置。  
   热点：MCP 2.0 破坏性变更、mcp-builder 连接脚本维护。关联 #1668。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1742

3. **#1771 — feat(skills): add proofcore-contract-auditor for smart contract notarization**  
   功能：新增 Web3 智能合约审计 Skill，对 Solidity / Rust 合约做静态分析，并将审计证明锚定到 TON 区块链。  
   热点：智能合约安全、链上证明、垂直行业 Skill。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1771

4. **#1734 — Detect orphaned docx comments**  
   功能：检测 DOCX 中孤立的批注/评论。  
   热点：文档批注完整性、办公文档处理可靠性。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1734

5. **#1703 — Add md2video-audio skill**  
   功能：将 Markdown 编译为带拟真人语音的 MP4 视频，基于 Marp 生成幻灯片。  
   热点：内容生产自动化、零成本视频生成。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1703

6. **#1245 — Add notion-spec-to-implementation and quantitative-resume-auditor skills**  
   功能：新增“Notion 规格转实现任务”与“量化简历审计”两个 Skill。  
   热点：规格到任务的工作流自动化、招聘/职业垂直工具。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1245

7. **#1792 — fix(docx): report LibreOffice timeout as an error and verify the output**  
   功能：LibreOffice 超时不报成功，并验证输出 DOCX 是否仍含修订标记。  
   热点：静默失败、输出验证、docx 处理稳定性。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1792

8. **#1607 — Update claude-api skill: mark four retired model IDs as retired**  
   功能：更新 claude-api Skill，标记四个已退役模型 ID。关联 #1603。  
   热点：官方 Skill 内容时效性、模型生命周期维护。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1607

---

## 2. 社区需求趋势

1. **安全与信任边界成为最高热度议题**  
   #492 讨论社区 Skill 冒用 `anthropic/` 命名空间、权限提升风险，43 条评论，是当前最热 Issue。相关还有 eval-viewer XSS #1394、SharePoint 权限 #1175、agent-governance #412。  
   https://github.com/anthropics/skills/issues/492  
   https://github.com/anthropics/skills/issues/1394  
   https://github.com/anthropics/skills/issues/1175  
   https://github.com/anthropics/skills/issues/412

2. **组织内共享与 Skill 去重需求强烈**  
   #228 期待 Claude.ai 组织级 Skill 共享库，16 条评论、8 个 👍；#189 指出 `document-skills` 与 `example-skills` 安装内容重复，6 条评论、9 个 👍。  
   https://github.com/anthropics/skills/issues/228  
   https://github.com/anthropics/skills/issues/189

3. **skill-creator 工具链质量与评测可靠性**  
   #556 报告 `run_eval.py` 触发率 0%，12 条评论、7 个 👍；#202 讨论 skill-creator 应更新最佳实践；#1383 汇总 benchmark、Windows、skill shadowing 等多类问题。  
   https://github.com/anthropics/skills/issues/556  
   https://github.com/anthropics/skills/issues/202  
   https://github.com/anthropics/skills/issues/1383

4. **上下文窗口与性能问题**  
   #1487 指出 `claude-api` Skill 单次工具调用注入约 156k tokens，直接耗尽上下文窗口。  
   https://github.com/anthropics/skills/issues/1487

5. **文档与办公自动化仍是长期需求**  
   社区持续提出 DOCX 孤立批注、LibreOffice 超时验证、ODT、PDF 大小写引用、排版质量控制等需求。相关 PR 包括 #1734、#1792、#486、#538、#514。  
   https://github.com/anthropics/skills/pull/1734  
   https://github.com/anthropics/skills/pull/1792  
   https://github.com/anthropics/skills/pull/486  
   https://github.com/anthropics/skills/pull/538  
   https://github.com/anthropics/skills/pull/514

6. **测试、MCP 与生产治理成为新增方向**  
   测试类有 AWT E2E、testing-patterns；MCP 评估 harness 存在 0/N 评分问题；治理类有 compact-memory、Reasoning Quality Gate Pipeline。  
   https://github.com/anthropics/skills/pull/822  
   https://github.com/anthropics/skills/pull/723  
   https://github.com/anthropics/skills/issues/1390  
   https://github.com/anthropics/skills/issues/1329  
   https://github.com/anthropics/skills/issues/1385

---

## 3. 高潜力待合并 Skills / PR

以下 PR 近期更新频繁、修复目标明确或关联高热度 Issue，较可能近期落地：

1. **#1607 — claude-api 退役模型 ID 更新**  
   2026-10-03 更新，修复 #1603，属于低风险文档时效修复。  
   https://github.com/anthropics/skills/pull/1607

2. **#1730 — 替换 academy-guide / tool-use-concepts 死链**  
   2026-10-02 更新，已用 `curl` 验证 HTTP 200，低风险。  
   https://github.com/anthropics/skills/pull/1730

3. **#1742 — mcp-builder 适配 mcp>=2**  
   2026-09-29 更新，修复 #1668，直接影响 MCP 工具链兼容性。  
   https://github.com/anthropics/skills/pull/1742

4. **#1245 — Notion spec-to-implementation + quantitative-resume-auditor**  
   2026-09-30 更新，一次提交两个垂直工作流 Skill。  
   https://github.com/anthropics/skills/pull/1245

5. **#1681 — skill-creator 支持直接执行 package_skill.py**  
   2026-09-27 更新，修复直接运行脚本的 ModuleNotFoundError。  
   https://github.com/anthropics/skills/pull/1681

6. **#1792 — docx LibreOffice 超时与输出验证**  
   2026-09-25 更新，针对静默失败和修订标记残留。  
   https://github.com/anthropics/skills/pull/1792

7. **#1298 — skill-creator trigger evals / Windows / runtime failures**  
   2026-09-16 更新，关联 #556、#1383，属于 skill-creator 核心可靠性修复。  
   https://github.com/anthropics/skills/pull/1298

8. **#1776 — blast-radius 批量破坏性操作检查清单**  
   2026-09-18 更新，面向删除、批量邮件、权限回收等高风险操作。  
   https://github.com/anthropics/skills/pull/1776

---

## 4. Skills 生态洞察

**一句话总结：** 当前社区在 Skills 层面最集中的诉求，是把 Skills 从“示例集合”推进为“可靠、安全、可治理的生产级能力”——优先修复 skill-creator、mcp-builder、claude-api 等官方工具链的评测、兼容性与时效性问题，同时建立命名空间、权限、组织共享等信任治理机制。

---

# Claude Code 社区动态日报（2026-10-04）

> 数据来源：github.com/anthropics/claude-code  
> 统计窗口：过去 24 小时（截至 2026-10-03 更新）

## 1. 今日速览

- 新版本 **v2.1.289** 重点修复复合 shell 命令权限规则覆盖问题，以及终端在特定代码块下的冻结问题。
- 社区最高热度仍是 **VS Code 扩展 Diff Review UI**（#33932，41 评论 / 202 👍），IDE 深度集成需求非常强烈。
- 高信息量反馈集中在 **自动压缩反效果、子代理编排与成本失控、桌面 GPU 后台占用、模型切换后身份不一致**，说明 agent 运行时治理是当前核心痛点。

---

## 2. 版本发布

### v2.1.289

- 修复托管机器上，复合 shell 命令嵌套部分的 `deny` / `ask` 规则未覆盖用户安装 mod 批准的问题。
- 修复短代码块中包含大量未闭合 `<script>` 标签或深层嵌套 `${` 替换时终端冻结的问题。
- 包含一项与 `Read` 相关的修复，但 release note 原文在数据中截断。

链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.289

---

## 3. 社区热点 Issues

### 1. #33932 [OPEN] VS Code Extension: Diff review UI similar to GitHub Copilot Edits Review
- 作者：@yakupadakli | 评论：41 | 👍：202
- 为什么重要：这是当前社区热度最高的功能请求。VS Code 用户希望获得类似 Copilot Edits 的 diff review 体验，直接在编辑器内审查 Claude Code 改动。
- 社区反应：202 👍 表明 IDE 集成与 diff 审查流程是最大缺口之一。

链接：https://github.com/anthropics/claude-code/issues/33932

### 2. #98159 [OPEN] claude.ai: let users set a default permission mode, incl. “Skip all approvals”
- 作者：@brianaicoding | 评论：4 | 👍：7
- 为什么重要：Web 端权限模式不能设默认值，用户每次都要手动选择。支持默认模式甚至“跳过所有批准”可显著提升自动化场景效率。
- 社区反应：涉及权限与效率平衡，是 Web / claude.ai 用户的高频诉求。

链接：https://github.com/anthropics/claude-code/issues/98159

### 3. #81704 [OPEN] Ship a FreeBSD native binary — Bun no longer a blocker
- 作者：@elliejs | 评论：9 | 👍：1
- 为什么重要：请求提供 FreeBSD 原生二进制。作者指出 Bun 已不再是阻塞因素，说明平台覆盖仍有扩展空间。
- 社区反应：评论数较高，反映非主流平台用户对官方支持的持续关注。

链接：https://github.com/anthropics/claude-code/issues/81704

### 4. #99071 [OPEN] Built-in plugin startup tip references unavailable plugin
- 作者：@menezescassio | 评论：4 | 👍：0
- 为什么重要：启动提示引导用户启用一个实际不可用的内置插件，执行后报 “Plugin is not installed”，影响新手体验与插件系统可信度。
- 社区反应：属于插件生态基础体验问题，容易造成困惑。

链接：https://github.com/anthropics/claude-code/issues/99071

### 5. #99265 [OPEN] Desktop app draws a mod’s AbovePrompt band in only one chat at a time
- 作者：@rb17080 | 评论：1 | 👍：0
- 为什么重要：Windows 桌面端同时打开两个聊天时，mod 的 `AbovePrompt` 区域只在一个聊天中绘制。多聊天 / 多会话 UI 的插件渲染一致性存在问题。
- 社区反应：新提交 bug，涉及桌面端插件 UI 架构。

链接：https://github.com/anthropics/claude-code/issues/99265

### 6. #85483 [CLOSED/stale] Auto-compaction INCREASES real on-wire context when preTokens diverges
- 作者：@terrylica | 评论：1 | 👍：0
- 为什么重要：报告用大量数据指出自动压缩可能反而增加真实上下文，最高达 6.34 倍；5,180 个压缩边界中有 133 个负收益事件，最差 +167,519 tokens，12.9% 的 subagent 压缩受影响。
- 社区反应：虽因 stale 关闭，但数据质量高，直指上下文压缩机制的核心副作用。

链接：https://github.com/anthropics/claude-code/issues/85483

### 7. #85496 [CLOSED/stale] Self-directed adversarial review loops have no severity floor or spend ceiling
- 作者：@aeldaly | 评论：1 | 👍：0
- 为什么重要：一个约 700 行 PR 触发 9 轮对抗式审查，消耗约 1.5M subagent tokens，据称耗尽两个 Max 20 账号。说明 agent 自动化审查缺少严重性下限和花费上限。
- 社区反应：对多 agent 工作流的成本控制与停止条件提出严重警告。

链接：https://github.com/anthropics/claude-code/issues/85496

### 8. #85515 [CLOSED/stale] /code-review orchestrator stalls ~1h: subagent results misrouted to a different local session
- 作者：@Antonio100898 | 评论：1 | 👍：0
- 为什么重要：`/code-review` 编排器的子代理结果被误路由到其他本地会话，父会话未被唤醒，导致流程停滞约 1 小时。
- 社区反应：暴露多 agent 跨会话消息路由的可靠性问题。

链接：https://github.com/anthropics/claude-code/issues/85515

### 9. #85521 [CLOSED/stale] Desktop app GPU process renders continuously while backgrounded with a Claude Code remote session open
- 作者：@narnd | 评论：1 | 👍：0
- 为什么重要：桌面端在后台且打开 Claude Code 远程会话视图时，GPU 进程持续渲染，系统 GPU 占用约 60–90%。
- 社区反应：影响笔记本续航与桌面端可用性，属于明显性能回归。

链接：https://github.com/anthropics/claude-code/issues/85521

### 10. #85545 [CLOSED/stale] /model mid-session: served model changes but the agent’s stated identity does not
- 作者：@ktimesk1776 | 评论：1 | 👍：0
- 为什么重要：中途使用 `/model` 后，实际服务模型已改变，但 system-prompt 环境块仍报告旧模型，agent 无法查询真实模型。
- 社区反应：模型可观测性与身份一致性对调试、成本归因和自动化决策很关键。

链接：https://github.com/anthropics/claude-code/issues/85545

---

## 4. 重要 PR 进展

> 过去 24 小时仅有 6 条 PR 更新，以下全部列出。

### 1. #81672 [OPEN] fix(hookify): make package import independent of the install directory name
- 作者：@ozdemirsarman
- 内容：修复 `hookify` 包导入依赖插件目录必须命名为 `hookify` 的问题，使 marketplace 安装不再因目录名不同而失败。
- 链接：https://github.com/anthropics/claude-code/pull/81672

### 2. #99137 [OPEN] sec-default: a person’s plugin may tighten, never loosen, what holds over it
- 作者：@poteat
- 内容：在 `sec-default` 下，用户插件只能收紧权限，不能放宽已有 `deny` / `ask` 规则或修改固定变量。与 v2.1.289 的权限修复方向呼应。
- 链接：https://github.com/anthropics/claude-code/pull/99137

### 3. #99118 [OPEN] diff: toasts show while the pane is open
- 作者：@poteat
- 内容：`/diff` 面板或对话框打开时，其他插件的 toast 可以正常显示，而不再被 `holdToasts: true` 全部挂起。
- 链接：https://github.com/anthropics/claude-code/pull/99118

### 4. #99141 [OPEN] diff: a pane nothing can draw yet is kept, and shows once something can
- 作者：@poteat
- 内容：如果 `/diff` 在尚无渲染能力时打开，保留 pane，一旦宿主可绘制就显示，避免过早打开导致面板丢失。
- 链接：https://github.com/anthropics/claude-code/pull/99141

### 5. #99206 [OPEN] diff: the docked pane starts at its header, under the engine’s own head row
- 作者：@poteat
- 内容：修复 docked `/diff` 多出一行空白的问题，使其从 header 开始显示。
- 链接：https://github.com/anthropics/claude-code/pull/99206

### 6. #77977 [CLOSED] docs(plugin-dev): document skipLfs marketplace sources
- 作者：@superdiaodiao
- 内容：为插件开发文档补充 `skipLfs` 选项，说明 GitHub 和通用 Git marketplace 源如何跳过 Git LFS 下载。
- 链接：https://github.com/anthropics/claude-code/pull/77977

---

## 5. 功能需求趋势

从过去 24 小时更新 Issue 看，社区关注集中在以下方向：

1. **IDE 深度集成与 Diff Review**  
   VS Code 扩展的 Diff Review UI 以 202 👍 成为绝对热点，说明用户不满足于终端交互，希望编辑器内完成审查、接受、拒绝改动。  
   代表：https://github.com/anthropics/claude-code/issues/33932

2. **权限模式与安全策略可控性**  
   默认权限模式、`deny` / `ask` 规则、复合命令审批、插件不能放宽权限等诉求密集。权限既要安全，也要可预测、可自动化。  
   代表：https://github.com/anthropics/claude-code/issues/98159

3. **平台覆盖与跨环境一致性**  
   FreeBSD 原生二进制、Windows 盘根 `.mcp.json`、RDP/AVD 剪贴板、iTerm2 滚动缓冲等问题，反映跨平台体验仍是长期债。  
   代表：https://github.com/anthropics/claude-code/issues/81704

4. **插件 / Mod 生态成熟度**  
   内置插件提示不可用、`AbovePrompt` 多聊天渲染、marketplace 安装目录名依赖、`skipLfs` 文档等，说明插件系统正在快速扩张但基础体验仍需打磨。  
   代表：https://github.com/anthropics/claude-code/issues/99071

5. **Agent / Subagent 编排与成本治理**  
   `/code-review` 编排停滞、子代理结果误路由、对抗式审查消耗大量 token，说明多 agent 工作流需要更强的路由可靠性、预算上限与停止条件。  
   代表：https://github.com/anthropics/claude-code/issues/85496

6. **上下文压缩与统计准确性**  
   自动压缩反而增加 on-wire context、压缩后 Read-state 丢失、Desktop token 统计窗口截断等问题，直指上下文管理机制的透明度与正确性。  
   代表：https://github.com/anthropics/claude-code/issues/85483

7. **桌面端性能与模型可观测性**  
   桌面 GPU 后台高占用、`/model` 切换后身份不一致，说明桌面运行时和模型状态同步仍需改进。  
   代表：https://github.com/anthropics/claude-code/issues/85521

---

## 6. 开发者关注点

- **权限规则必须可预测**：复合命令中一个片段被标记，不应该让整条命令反复审批；插件也不应绕过用户已有 deny/ask 规则。  
  相关：https://github.com/anthropics/claude-code/issues/85492

- **成本控制不能缺位**：自导向 agent 循环、多轮对抗审查、subagent 编排都可能失控，需要花费上限、轮次上限和严重性下限。  
  相关：https://github.com/anthropics/claude-code/issues/85496

- **自动压缩需要更透明**：压缩可能增加真实上下文、破坏 Read-state，开发者希望看到压缩前后 token 变化与机制解释。  
  相关：https://github.com/anthropics/claude-code/issues/85483

- **多 agent 通信可靠性是硬需求**：子代理完成通知延迟、结果误路由、父会话未唤醒，会直接破坏自动化工作流。  
  相关：https://github.com/anthropics/claude-code/issues/85515

- **跨平台细节决定可用性**：Windows、macOS、Linux、FreeBSD、远程桌面、不同终端下的行为差异，仍是开发者高频反馈来源。  
  相关：https://github.com/anthropics/claude-code/issues/81704

- **桌面端性能与统计准确性影响信任**：后台 GPU 高占用、Token 统计不一致、插件 UI 渲染异常，都会降低桌面端作为主入口的可信度。  
  相关：https://github.com/anthropics/claude-code/issues/85521

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 · 2026-10-04

> 数据来源：[github.com/openai/codex](https://github.com/openai/codex)
> 统计窗口：过去 24 小时（截至 2026-10-03）

---

## 1. 今日速览

今日社区热度高度集中在 **IDE 扩展与桌面端的消息可靠性问题**：多条关于 VS Code 扩展"消息被吞""队列卡死""streaming 状态不重置"的 Issue 同时冲上评论榜，其中 #49988 单条获得 44 个 👍，是近期反响最强烈的缺陷之一。Windows 平台依旧是问题重灾区，桌面端组织配置加载失败、Dots 委派任务缺失 Computer Use/Chrome 工具等问题持续发酵。代码侧则有一批由 `copyberry[bot]` 提交并已关闭的 PR，集中在 Code Mode 工具目录稳定性、Windows 终端输入与 daemon 生命周期等底层细节。

---

## 2. 版本发布

过去 24 小时发布 3 个 Rust 通道 alpha 版本，均为同一 patch 的连续迭代，Release Note 无正文内容：

| 版本 | 说明 |
|---|---|
| [rust-v0.162.0-alpha.9](https://github.com/openai/codex/releases) | 0.162.0-alpha.9 |
| [rust-v0.162.0-alpha.10](https://github.com/openai/codex/releases) | 0.162.0-alpha.10 |
| [rust-v0.162.0-alpha.11](https://github.com/openai/codex/releases) | 0.162.0-alpha.11 |

**解读**：24 小时内连发三个 alpha，属于典型的快速迭代节奏，通常对应内部分支的持续合流。由于未附带 changelog，建议关注后续 0.162.0 正式版说明以确认修复范围。

---

## 3. 社区热点 Issues（Top 10）

### ① #49458 · [Windows] Dots 启动的本地任务缺少 Computer Use 工具
- 作者：@gaopengbin | 评论 **41** | 👍 **18** | [链接](https://github.com/openai/codex/issues/49458)
- 普通本地 Codex 会话可正常使用 Computer Use，但由 dot 启动的任务无法加载对应工具，版本为 Windows 端 `26.928.1915.0`。
- **为何重要**：这是今日评论数最高的 Issue，直接指向 Dots 委派链路与工具权限体系的不一致——同一台机器、同一账号，能力却按入口不同而割裂。

### ② #48324 · [Windows 桌面] "Unable to load organization settings" 导致 Composer 无法加载
- 作者：@GuanXinTang | 评论 **39** | 👍 **6** | [链接](https://github.com/openai/codex/issues/48324)
- Codex 在 ChatGPT Windows 桌面端启动即报错，会话创建流程被阻断，用户甚至拿不到 session ID 去提交反馈。
- **为何重要**：问题发生在会话创建之前，属于"完全不可用"级别，且 Web 与 CLI 正常，说明是桌面端独有的初始化路径缺陷。

### ③ #49988 · VS Code 扩展更新后间歇性丢弃已提交消息
- 作者：@jorgeCabreraSanchez | 评论 **34** | 👍 **44** | [链接](https://github.com/openai/codex/issues/49988)
- 10 月 1 日更新扩展后，按 Enter 会清空输入框，但消息既不出现在对话中，Codex 也不响应；重复发送数次后才偶尔成功。
- **为何重要**：**今日点赞数最高**。消息静默丢失且无任何错误提示，对日常编码流是致命体验问题，社区共鸣最强。

### ④ #50118 · VS Code：上一轮已完成，但线程仍标记为 streaming
- 作者：@stansult | 评论 **25** | 👍 **11** | [链接](https://github.com/openai/codex/issues/50118)
- 约 9 月 30 日起，前一轮已完成且无其他请求运行时，普通 prompt 仍被排队；新线程通常正常数轮后才复现。
- **为何重要**：暴露了客户端会话状态机的泄漏问题，与 ③ 很可能同源，是近期扩展回归的典型症状。

### ⑤ #50403 · VS Code：队列消息发送失败，"undefined" is not valid JSON
- 作者：@brad-alexander | 评论 **25** | 👍 **2** | [链接](https://github.com/openai/codex/issues/50403)
- 报错为 `Failed to release queued message send lock` 并伴随 `SyntaxError: "undefined" is not valid JSON`，环境为 Windows + `openai.chatgpt 26.930.21537`。
- **为何重要**：终于给出了可定位的具体堆栈线索，对修复队列锁相关的并发缺陷价值很大。

### ⑥ #49497 · Codex Web：首条消息报 "Unable to determine project root for task"
- 作者：@parteeksinghlavish | 评论 **22** | 👍 **30** | [链接](https://github.com/openai/codex/issues/49497)
- 选择已发布的云端环境后发送首条消息即失败，页面卡在初始态。
- **为何重要**：👍 数列今日第二，说明云端环境与任务根目录的解析逻辑存在普遍性问题，影响新用户首次上手。

### ⑦ #41695 · iPad 端访问远程 Codex 会话时频繁卡死
- 作者：@jpagan | 评论 **16** | 👍 **0** | [链接](https://github.com/openai/codex/issues/41695)
- iPad App `1.2026.230`，iPadOS 27 Beta 5，Pro 20x 订阅，远程会话场景下持续冻结。
- **为何重要**：从 8 月 30 日持续至今仍未关闭，属于长期未解的跨端性能问题，远程协作体验的关键阻塞点。

### ⑧ #26683 · 队列消息消失或卡住，任务停留在 thinking 状态
- 作者：@GH-X-ST | 评论 **12** | 👍 **33** | [链接](https://github.com/openai/codex/issues/26683)
- 起始于 6 月的长期 Issue，VS Code 扩展 `26.602.40724` 版本即存在。
- **为何重要**：👍 数高达 33，说明"队列不可靠"是跨越四个月、多个版本仍未根治的顽疾，今日多条新 Issue 实为其延续。

### ⑨ #49551 · Dots 委派任务缺失 Chrome 工具，手动 Chat 正常
- 作者：@scottmcpherson | 评论 **12** | 👍 **7** | [链接](https://github.com/openai/codex/issues/49551)
- macOS 26.3 + ChatGPT `26.928.21956`，委派任务具备浏览器技能和本地 shell，但缺少必需的 `node_repl js` 工具；重启重试无效。
- **为何重要**：与 ① 形成镜像对照（Windows 缺 Computer Use / macOS 缺 Chrome），指向 Dots 工具注入逻辑的系统性缺口。

### ⑩ #25498 · [功能需求] Codex Desktop 增加项目注册与线程跨项目迁移
- 作者：@0okay | 评论 **12** | 👍 **7** | [链接](https://github.com/openai/codex/issues/25498)
- 诉求包括：从侧边栏或命令面板注册本地文件夹为项目、在线程间迁移线程、修改线程的项目绑定。
- **为何重要**：今日少数高互动 enhancement，反映桌面端已从"实验工具"进入"日常主工作台"阶段，工程化管理能力开始成为刚需。

> 其他值得留意：#34859（远程插件 MCP 提示 `codex mcp login` 却无法解析服务器）、#18620（Windows 沙箱 `CreateProcessWithLogonW failed: 1326/1909`）、#43628（Windows 无法添加 WSL 项目）、#50481（Windows/Android 远程配对陷入 Google 登录循环）。

---

## 4. 重要 PR 进展（Top 10）

> ⚠️ 说明：本批 28 条 PR 均为 **CLOSED** 状态，作者统一为 `copyberry[bot]`，且评论字段缺失。推测为内部自动化同步/批量合流流程，具体合并结果以主干代码为准。

### 工具与 Code Mode 稳定性
1. **[#50741](https://github.com/openai/codex/pull/50741) Keep environment-backed tools exposed across readiness changes**
   环境就绪状态变化不再影响已选环境的工具与命令参数暴露，避免工具列表随就绪状态抖动，提升模型上下文稳定性。
2. **[#50687](https://github.com/openai/codex/pull/50687) Keep third-party tools deferred in strict Code Mode Only**
   严格 Code Mode Only 下保持第三方工具延迟暴露，使 MCP 目录在轮次间变化时不改变模型的 eager 工具前缀。
3. **[#50562](https://github.com/openai/codex/pull/50562) Keep Code Mode tool discovery guidance stable across catalog changes**
   工具发现引导不再依赖当前是否存在延迟工具，`exec` 描述在目录变化时保持稳定。

### Windows 平台体验
4. **[#50720](https://github.com/openai/codex/pull/50720) Decode Windows Terminal's mapped Shift+Enter sequence**
   将 Windows Terminal `sendInput` 产生的 `ESC[13;2u` 事件流解码为 Shift+Enter，恢复 Composer 中插入换行的能力。
5. **[#50700](https://github.com/openai/codex/pull/50700) Let the transport create the Windows remote-control socket directory**
   由传输层以受保护 DACL 创建 `codex-remote-control/rc-*` 目录，替代继承临时目录的宽泛 ACL，属安全加固。
6. **[#50555](https://github.com/openai/codex/pull/50555) Skip daemon auto-start for Windows-mounted WSL homes**
   在 DrvFS/9p 挂载的 WSL home 下跳过 daemon 自启，规避权限语义不兼容导致的 TUI 启动失败。

### TUI 与交互
7. **[#50695](https://github.com/openai/codex/pull/50695) Preserve local Markdown link labels in the TUI**
   路径类链接标签不再被折叠为目的地，改为 `label (target)` 形式渲染，表格内同样生效。
8. **[#50564](https://github.com/openai/codex/pull/50564) Allow transcript selection and copying while bottom modals are open**
   计划确认等底部模态开启时，仍可对可见 transcript 进行鼠标选择与复制。

### 基础设施与正确性
9. **[#50559](https://github.com/openai/codex/pull/50559) Distinguish daemon release identity from executable contents**
   区分发布身份与可执行文件字节内容，使资源变化可被识别，同时允许过期的 updater 平稳交接而不重启已是最新的 daemon。
10. **[#50558](https://github.com/openai/codex/pull/50558) Avoid reading the current directory when resolving absolute paths**
   绝对路径解析不再读取当前工作目录，修复目录已被删除时路径解析失败的问题。

> 其余可关注：[#50540](https://github.com/openai/codex/pull/50540)（Responses Lite 增量工具目录）、[#50546](https://github.com/openai/codex/pull/50546)（Code Mode 常驻 MCP 资源助手）、[#50531](https://github.com/openai/codex/pull/50531)（会话结束前持久化实时转录尾部）、[#50507](https://github.com/openai/codex/pull/50507)（Windows 沙箱服务停止诊断）、[#50525](https://github.com/openai/codex/pull/50525)（严格配置校验拒绝未知 TUI 键）。

---

## 5. 功能需求趋势

从今日 48 条 Issue 中可提炼出以下方向：

**① IDE 集成稳定性成为第一优先级**
VS Code 扩展相关 Issue 密集出现（#49988、#50118、#50403、#50224、#50395、#26683），问题覆盖面从消息提交、队列调度到 streaming 状态管理。社区关注点已从"功能有没有"转向"能不能稳定用"。

**② 多端一致性与远程会话**
Windows 桌面、iPad、Android 配对、Codex Web 各自出现独立缺陷（#48324、#41695、#49497、#50481），跨端"同一会话、不同行为"的一致性问题突出。

**③ Dots / 委派任务的工具注入完整性**
#49458、#49551、#50119、#50388、#49566、#50168 等多条 Issue 指向 Dots 场景：任务能被创建，但工具、授权、云端线程写路径频繁失效，`UNKNOWN` / `CloudThreadNotFoundError` 等模糊错误反复出现。

**④ 上下文压缩（Compaction）的正确性**
#38969、#42695、#42611、#35307 集中反映压缩后重放旧指令、路由到错误项目、传输解码失败等数据正确性问题——这类问题会污染任务语义，风险等级高于单纯的功能缺陷。

**⑤ Windows 平台专项问题持续堆积**
WSL 项目添加失败、沙箱 `1326/1909`、socket 权限、daemon 自启等（#43628、#18620、#49365、#50738）横跨数月未见收敛。

**⑥ 项目与任务管理能力**
#25498 代表的新兴诉求：项目注册、线程迁移、项目绑定修改——桌面端正在被当作正式工作台使用。

**⑦ MCP 生态与认证链路**
#34859 反映远程安装插件的 MCP 登录流程断裂，说明 MCP 作为扩展机制在实际使用中仍有闭环缺口。

---

## 6. 开发者关注点

**痛点一：静默失败难以排查**
消息被吞、队列不发送、任务无响应——大量 Issue 的共同特征是"没有报错"。开发者被迫靠反复重发来碰运气，而不是获得可操作的提示。这是当前最伤体验的一类问题。

**痛点二：队列与 streaming 状态机不可信**
"上一轮已完成但线程仍标记 streaming"（#50118）与"队列消息卡住/消失"（#26683）是同一枚硬币的两面。评审者对客户端会话状态与服务端执行状态的一致性预期非常明确。

**痛点三：错误信息缺乏可行动性**
`UNKNOWN`、`CloudThreadNotFoundError`、`"undefined" is not valid JSON`、`AppServerBackendRequestError` 这类输出无法帮助用户自助定位，反而抬高了 Issue 的沟通成本（可从多条 Issue 长达数十条评论的排查过程中看出）。

**痛点四：平台差异导致的能力漂移**
同一账号、同一台机器，手动 Chat 可用而 Dots 委派不可用；Web 与 CLI 正常而桌面端崩溃。用户期待的是能力按权限而非按入口划分。

**痛点五：长期未闭合的老 Issue**
#26683（6 月）、#41695（8 月）、#18620（4 月）等问题跨越多个版本仍处 OPEN 状态，削弱了社区对回归修复速度的信心。

**痛点六：压缩语义需要更强的可预期性**
自动压缩后重放旧指令、把 prompt 写入错误项目，会让开发者对长会话的可靠性产生根本性质疑——这已不只是体验问题，而是结果可信度问题。

---

*本日报由 AI 分析生成，数据取自 GitHub 公开 Issue/PR 摘要，具体细节请以原始链接为准。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-10-04）

## 1. 今日速览
今日 Gemini CLI 发布新的 nightly 版本，主要修复交互式选择列表中 Enter/Spacebar 确认不稳定的问题。过去 24 小时社区活跃度集中在 Agent/Subagent 可靠性、上下文与工具调用响应处理、以及沙箱/安全策略上；多个 P1/P2 修复 PR 进入关闭状态，显示维护者正在集中清理子代理挂起、会话恢复重复响应和持久化状态损坏等问题。

## 2. 版本发布
**v0.64.0-nightly.20261003.gfb972b2f8**
- 修复内容：确保 Enter 和 Spacebar 能可靠确认选择列表选项，由 @ugorla-dev 通过 PR #29502 提交。
- PR 链接：https://github.com/google-gemini/gemini-cli/pull/29502
- Release 链接：https://github.com/google-gemini/gemini-cli/releases

## 3. 社区热点 Issues
过去 24 小时内更新、评论数较多或优先级较高的 Issue 如下：

1. **#22323 [P1] Subagent 达到 MAX_TURNS 后仍报告 GOAL success，掩盖中断**
   - 为什么重要：子代理明明因轮次上限中断，却向上层报告成功，会直接误导主 Agent 和用户，属于严重的可靠性与可观测性问题。
   - 社区反应：13 条评论、2 个 👍，是当前讨论最热的 Issue。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22323

2. **#21409 [P1] Generalist agent 永久挂起**
   - 为什么重要：一旦 Gemini CLI 调用 generalist agent，简单任务如创建目录也会挂起，用户等待一小时也无法完成。
   - 社区反应：8 条评论、8 个 👍，说明不少用户遇到同类问题。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21409

3. **#19873 [P2] 通过零依赖 OS 沙箱与执行后意图路由发挥模型 bash 能力**
   - 为什么重要：Gemini 3 模型天然偏好 bash 工具链，该提案希望在安全与 UX 不受损的前提下释放其原生能力，可能影响未来工具架构。
   - 社区反应：9 条评论，属于架构级讨论。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/19873

4. **#21968 [P2] Gemini 不够主动使用 skills 和 sub-agents**
   - 为什么重要：用户发现即使存在 gradle、git 等自定义 skill，模型也不会主动调用，导致扩展能力形同虚设。
   - 社区反应：7 条评论，反映 prompt/调度层仍有优化空间。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21968

5. **#22745 [P2] 评估 AST-aware 文件读取、搜索与代码库映射**
   - 为什么重要：AST 感知工具有望减少错误读取、降低 token 噪声并提升代码导航精度，是代码智能方向的重要 EPIC。
   - 社区反应：7 条评论、1 个 👍。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22745

6. **#22267 [P2] Browser Agent 忽略 settings.json 覆盖项，例如 maxTurns**
   - 为什么重要：配置系统与 AgentRegistry 读取正常，但 Browser Agent 不使用覆盖值，导致用户无法限制浏览器代理行为。
   - 社区反应：4 条评论。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22267

7. **#21983 [P1] Browser subagent 在 Wayland 下失败**
   - 为什么重要：Linux/Wayland 用户无法正常使用 browser subagent，属于平台兼容性阻塞问题。
   - 社区反应：4 条评论、1 个 👍。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21983

8. **#24246 [P2] 工具数量过多时出现 400 错误**
   - 为什么重要：标题提到 >128 tools，正文提到 >400 tools 时触发 400 错误，说明工具范围控制与模型上下文管理存在边界问题。
   - 社区反应：3 条评论。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/24246

9. **#22672 [P2] Agent 应停止或劝阻破坏性行为**
   - 为什么重要：模型在复杂 git 操作中可能使用 `git reset`、`--force` 等危险命令，用户希望有更安全的行为约束。
   - 社区反应：3 条评论、1 个 👍。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22672

10. **#21763 [P1] Bug report 不包含子代理上下文**
    - 为什么重要：`/bug` 报告只包含主会话，丢失 subagent 内部信息，导致问题难以复现和定位。
    - 社区反应：2 条评论，但优先级为 P1。
    - 链接：https://github.com/google-gemini/gemini-cli/issues/21763

其他值得关注的活跃 Issue：  
- #22465 创建 Vite 应用卡在交互式提示：https://github.com/google-gemini/gemini-cli/issues/22465  
- #18836 用持久化文件任务跟踪替代 WriteToDo：https://github.com/google-gemini/gemini-cli/issues/18836  
- #19561 面向 token 节俭的 Tactful Extraction 读取策略：https://github.com/google-gemini/gemini-cli/issues/19561  

## 4. 重要 PR 进展
1. **#29590 [OPEN] 修复工具调用 ID 前缀剥离后 functionResponse.parts 丢失**
   - 内容：工具返回的图片等多模态内容此前无法到达模型，因为 `stripToolCallIdPrefixes()` 重建 function response 时丢弃了 `functionResponse.parts`。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29590

2. **#29621 [OPEN] 保留子代理多模态工具响应 parts**
   - 内容：当本地 subagent 将工具结果反馈给模型时，图像数据作为 function response 的 sibling 被丢弃；该 PR 按 call ID 跟踪并追加完整响应 parts。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29621

3. **#29622 [OPEN] 将 tildeifyPath 限制在路径段边界**
   - 内容：修复与 home 目录共享前缀的兄弟目录被错误显示为 `~` 下路径的问题。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29622

4. **#29402 [CLOSED] 使持久化状态写入失败安全**
   - 内容：通过临时文件、fsync、原子 rename 避免中断保存导致 `state.json` 被截断并清空 CLI 持久状态。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29402

5. **#29387 [CLOSED] 单个畸形扩展目录不应导致全部扩展加载失败**
   - 内容：修复扩展加载时验证逻辑位于 try/catch 之前的问题，避免一个坏扩展拖垮所有扩展。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29387

6. **#29400 [CLOSED] 修复 `-r` 恢复会话时重复 functionResponse**
   - 内容：工具结果同时存在于 `toolCalls[].result` 和 durable user 消息中，恢复时被重放两次，导致重复 function responses。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29400

7. **#29399 [CLOSED] 编辑时保留无关注释**
   - 内容：强化 replace 工具契约，要求逐字保留无关注释和代码，引导模型做最小化、分离式编辑。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29399

8. **#29398 [CLOSED] 限制 MCP 初始工具发现超时**
   - 内容：当 MCP server 返回不匹配 JSON-RPC id 的 `tools/list` 响应时，SDK 会等待默认 10 分钟；该 PR 将初始发现限制为短超时。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29398

9. **#29397 [CLOSED] 防止中断回合导致会话上下文污染和无限循环**
   - 内容：流被 SIGINT、超时或工具中止后，CLI 会写入“上一响应被中断”的合成助手回合，可能污染会话历史并引发循环。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29397

10. **#29394 [CLOSED] 在调度器层阻止修改型工具，以执行用户 hold 指令**
    - 内容：解决 Agent 行动偏好过强的问题，当用户说“等等”“先解释”时，仍触发 `replace`、`write_file`、`run_shell_command` 等破坏性工具。
    - 链接：https://github.com/google-gemini/gemini-cli/pull/29394

其他值得关注：  
- #29386 修复 a2a-server `express.json` 注册顺序导致 `req.body` 为空：https://github.com/google-gemini/gemini-cli/pull/29386  
- #29505 支持 rootless Podman + keep-id：https://github.com/google-gemini/gemini-cli/pull/29505  
- #28669 合并 TUI 测试为单一自包含 skill：https://github.com/google-gemini/gemini-cli/pull/28669  

## 5. 功能需求趋势
从过去 24 小时活跃 Issue 看，社区关注方向集中在以下几类：

- **Agent/Subagent 可靠性与可观测性**：达到 MAX_TURNS 却报告成功、generalist agent 挂起、子代理轨迹不可见、bug report 缺少子代理上下文。  
- **安全与权限控制**：零依赖 OS 沙箱、防止破坏性 git 操作、用户 hold 指令、按 workspace 管理 policy。  
- **上下文与工具调用效率**：重复 functionResponse、多模态 parts 丢失、工具数量过多导致 400、Tactful Extraction、AST-aware 读取与搜索。  
- **配置与扩展系统**：settings.json 覆盖不生效、symlink agent 无法识别、扩展目录容错、MCP 初始发现超时。  
- **浏览器与平台兼容性**：Wayland 下 browser subagent 失败、Browser Agent 锁恢复、Podman rootless 支持。  
- **任务状态持久化**：用文件型 CRUD 任务跟踪替代 in-context WriteToDo，减少 context rot 和跨会话记忆丢失。  
- **TUI 与性能**：终端 resize 闪烁、交互式提示卡住、Vite 创建流程中断。  

## 6. 开发者关注点
开发者反馈中的高频痛点和需求包括：

1. **子代理挂起或错误报告成功**：最影响信任度，尤其是 generalist agent 挂起和 MAX_TURNS 被报告为 GOAL success。  
2. **配置不生效**：Browser Agent 忽略 `settings.json`，用户无法通过配置限制 `maxTurns` 等行为。  
3. **危险操作缺乏硬约束**：模型可能执行 `git reset`、`--force` 等命令，用户希望调度层直接阻止，而不仅依赖 prompt。  
4. **多模态工具结果丢失**：图片、截图等 `functionResponse.parts` 在工具调用 ID 处理或子代理反馈中被丢弃。  
5. **会话恢复与上下文污染**：`-r` 恢复导致重复 functionResponse，中断回合写入合成消息后污染上下文并可能死循环。  
6. **工具数量膨胀引发 API 错误**：工具超过阈值时出现 400，需要更智能的工具范围裁剪。  
7. **平台兼容性碎片化**：Wayland、rootless Podman、浏览器 profile lock 等环境问题持续出现。  
8. **交互式命令容易卡住**：创建 Vite 应用等流程停在交互提示，需要行为 eval 和 prompt 调整。  
9. **测试与评估稳定性不足**：steering eval 被注释、内部项目评估结果不一致，影响质量趋势判断。  
10. **临时脚本污染工作区**：模型在随机位置创建 tmp 脚本，清理成本高，开发者希望更可控的文件操作策略。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 · 2026-10-04

> 数据来源：github.com/esengine/DeepSeek-Reasonix

---

## 1. 今日速览

今日无新版本发布，社区重心集中在**质量与稳定性**：一边是 Studio 侧 Unicode 命名、主题导入、MCP 推断等一批修复集中落地；另一边是 Windows CI 上启动测试包耗时过长（约 423s）引发的一整条优化链（#11882–#11889）。同时 `subagent_effort` 继承与 `MigrateV2` 无快照迁移两个问题持续发酵，前者衍生出两个新 Issue，后者被标记为 data-loss。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

**① #11846 [CLOSED] MigrateV2 原地重写旧记忆文件且无快照，迁移前字节不可恢复 —— 数据丢失级问题**
`Store.MigrateV2` 在启动时自动运行（早于 memory 并入 durable prefix），直接原地重写所有旧记忆文件，没有快照也没有回滚路径。这是今日唯一带 `data-loss` 标签的 Bug，严重度最高，建议关注其修复方案是否引入备份机制。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11846

**② #11871 [OPEN] ACP subagent 派生失败：全局 `subagent_effort` 不被执行模型支持**
`acpTaskProfileDefaults` 把 `SubagentEffort` 当作硬默认值合并，随后走严格的 `NormalizeEffort`，导致执行模型不支持该 effort 时 ACP subagent 直接派生失败。由 #11269 引出，属于配置校验边界的典型问题。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11871

**③ #11872 [OPEN] 继承的 `subagent_effort` 仍会被重映射到非父级模型**
继承 effort 只对父条目做过校验；当实际 subagent 模型来自 `subagent_models.task`、技能自带模型或 per-profile key 时，`NormalizeEffort` 仍会把继承值映射到不支持它的模型上。是 ② 的“另一半”，说明该模块的校验路径尚未完全收口。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11872

**④ #11268 [CLOSED] Studio 中 inherited subagent effort 不随模型切换回退（已修复）**
与 ②③ 同源的老 Issue，今日关闭。当切到不支持 `max` 的执行模型时，Studio 会继续沿用继承的 effort。该 Issue 关闭意味着基础场景已被覆盖，但边缘路径仍由 ②③ 接管。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11268

**⑤ #11619 [CLOSED] SSH 远程连接报 `npm: not found` 导致连接中断（已关闭，4 条评论）**
服务器上 `npm -v` 正常返回 10.8.2，但 bootstrap 阶段 `sh -c` 找不到 npm，提示 `npm install failed`。作者还指出该问题在前几个版本中反复出现。这是今日讨论热度最高的 Issue（4 条评论），反映远程引导对非交互式 shell 环境的 PATH 依赖仍是痛点。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11619

**⑥ #11626 [CLOSED] 1.x 切换模型会同步影响 2.x 的模型选择（已关闭）**
1.39.4 中把模型从 deepseek 切到 mimo，2.24.0 的模型也跟着变，反之亦然。属于 Studio 与主线共用配置状态导致的耦合问题，涉及 config/provider 层隔离。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11626

**⑦ #11885 [OPEN] Windows 上 boot 测试包约需 7 分钟，应优化重用例而非调高超时**
实测 471 个串行测试耗时约 423s，单次 `boot.Build` 约 2.4s（能力探测与 shell 检测都要拉起进程）。这是今日**唯一由维护者发起、并直接催生 6+ 个 PR 的根因 Issue**，是理解今日 PR 洪流的入口。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11885

**⑧ #11878 [OPEN] RFC：平台侧设备注册以支持手机访问**
配对二维码对同一台手机反复生成 “device 1 / device 2 …”，根因之一是身份绑定在 relay 连接上。属于设计阶段 RFC，只出设计不落代码，涉及手机端接入的长期架构。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11878

**⑨ #11876 [OPEN] [Studio 反馈] 任务完成增加可选提示音**
用户 `keeyang` 通过 Studio 内反馈渠道提交（回执 FB-D9PB-7RTE）：希望无论 Studio 在前台还是后台，任务完成时都能播放提示音，并指出 1.x 版本本来就有该选项。典型的“1.x 功能在 2.x 回退”类需求。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11876

**⑩ #11873 [OPEN] Studio：provider 重试事件应带上重试延迟与安全原因**
Provider 层 `RetryInfo` 已含 attempt、max attempts、scheduled delay 和错误原因，但信息传到上层时丢失。属于可观测性增强，对排查限流/网络问题价值高。
🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11873

> 补充：#11880 每日研究聚焦 MCP step-up authorization（运行时 `insufficient_scope`），结论为“需要构建”，后续可能转化为实现任务。
> 🔗 https://github.com/esengine/DeepSeek-Reasonix/issues/11880

---

## 4. 重要 PR 进展

### Windows CI 与测试性能（今日最大一批改动）

**① #11884 [OPEN] ci(windows)：为 boot 密集步骤给出 16–20 分钟包预算**
Windows 全量步骤两次触发 `panic: test timed out after 12m0s`，其中 `internal/assembly/boot` 占到 685s/720s。这是治标的第一道闸门。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11884

**② #11887 [CLOSED] perf(sandbox)：缓存已通过启动探测的 bash.exe**
每次 `boot.Build` 都会跑 `probeBash` 启动 Git bash（约 150ms），在 471 个测试里成为 memory 阶段 200ms 中的 150ms。缓存后收益直接。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11887

**③ #11886 [CLOSED] test(boot)：让工作区扫描上限可注入**
原本为跨越 50000 文件扫描边界要真写 50001 个文件，单子测试 22.4s。改为可注入后重用例成本大幅下降。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11886

**④ #11889 [CLOSED] test(boot)：在删除临时目录前关闭进程级全局 catalog**
`usage-catalog/v5.sqlite` 与 `history-search/v1.sqlite` 在 teardown 时仍未关闭，Windows 上导致 `RemoveAll` 重试 100×20ms。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11889

**⑤ #11883 [CLOSED] test(boot)：用 writer 数量与 testenv.Budget 约束权限规则争用**
32 个 writer 争抢 5s 文件锁，在慢速 Windows 文件系统上尾部等待者超时（5.08s）。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11883

> 同批还有 #11882、#11888 修复 shellrun 静默超时用例与 PowerShell/Bash 启动竞态。
> 🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11882 ｜ https://github.com/esengine/DeepSeek-Reasonix/pull/11888

### 功能与修复

**⑥ #11665 [OPEN] feat(usage)：新增日历区间与精确每日明细**
在保持原有 `days` API 兼容的前提下，增加显式 `from`/`to` 区间查询、自定义日期范围与日历月控件，以及可滚动的每日 token 明细表。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11665

**⑦ #11742 [OPEN] fix(studio)：包内 agent 清单与运行时名称对齐**
含 `agents/审查.md` 的原生插件运行时名为 `/unicode-agents:agent:审查`，但已安装包清单显示为空。根因是清单使用了 ASCII-only 校验与独立的 frontmatter 解析。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11742

**⑧ #11740 [CLOSED] fix(studio)：包内 skill 清单与运行时名称对齐**
同类问题：Unicode skill 被加载为 `/unicode-kit:审查`，清单里却显示 `/unicode-kit:SKILL`；规范等价的来源还会重复上报两行。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11740

**⑨ #11697 [OPEN] fix(studio)：对插件中被拒绝的 profile 声明给出诊断**
插件包能装成功，但 skill/agent frontmatter 声明的交付契约被 canonical loader 拒绝时，Studio 列表与 `reasonix plugin doctor` 都无任何告警——不可用的 profile 看起来是健康的。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11697

**⑩ #11787 [CLOSED] fix(studio)：从端点路径段推断 MCP transport**
旧启发式在整个 URL 中搜 `sse`，导致 host、query、fragment、userinfo 中的普通子串误判为 SSE；且对已解码的 `URL.Path` 再切分会把编码斜杠当成路径分隔符。
🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11787

> 其他值得扫一眼的：#11865 统一 MCP 启动器名称推断（合并 npx/bunx/Python/Node/uv/pnpm/container/Go 八类 argv 走查）、#11702 agent 清单符号链接越界读保护、#11811 主题资源改用内容 ETag 重新校验、#11814 拒绝混合主题压缩包选择、#11569 生态兼容命令示例与真实 host 验证。
> 🔗 https://github.com/esengine/DeepSeek-Reasonix/pull/11865 ｜ https://github.com/esengine/DeepSeek-Reasonix/pull/11702 ｜ https://github.com/esengine/DeepSeek-Reasonix/pull/11811

---

## 5. 功能需求趋势

从今日全部 Issue 与 PR 的标签分布看，社区关注点集中在六个方向：

| 方向 | 代表条目 | 说明 |
|---|---|---|
| **Windows 平台稳定性与测试性能** | #11885、#11882–#11889 | 今日绝对主线。boot 包 423s、bash 探测每次 150ms、文件锁争用 5s 超时，全部是 Windows 特有的慢路径 |
| **子代理模型/effort 配置体系** | #11268、#11871、#11872 | 继承、归一化、按任务/技能/profile 覆写四条路径尚未统一，是配置模型最活跃的战场 |
| **插件生态的 Unicode 与名称规范** | #11742、#11740、#11702、#11697 | 中文 agent/skill 名在清单、预览、运行时三处不一致，且越界符号链接无保护、非法声明无诊断 |
| **MCP 能力完善** | #11787、#11865、#11880、#11619 | 传输推断、启动器推断、step-up 授权研究、远程 npm 引导，四条线并行推进 |
| **桌面端体验补齐（1.x 功能回流）** | #11876、#11665、#11811、#11814、#11821 | 提示音、用量日历、主题导入反馈与键盘导航，多为“1.x 有而 2.x 缺失” |
| **数据安全与可观测性** | #11846、#11873 | 迁移无快照属最高风险；重试事件信息丢失属排查效率问题 |

---

## 6. 开发者关注点

**1. 配置状态的跨版本/跨模块耦合仍是高频雷区**
#11626（1.x 切模型带动 2.x）与 #11268/#11871/#11872（effort 继承与重映射）本质相同：配置项在多处被读取、各自校验，导致“在一处改、在别处炸”。建议关注是否需要统一的配置归一化入口。

**2. 数据丢失类问题的处理标准需要明确**
#11846 的 `MigrateV2` 自动在启动阶段原地改写在先、无快照在后，且发生在 memory 并入 durable prefix 之前。这类自动迁移一旦出错后果不可逆，社区后续大概率会追问快照/回滚策略。

**3. 远程与非交互式环境的 PATH 假设**
#11619 中服务器交互式 shell 能找到 npm，bootstrap 的 `sh -c` 却找不到——这是远程引导的经典陷阱，且用户反馈“前几个版本也有过”，说明修复被反复回退，需要更稳健的探测逻辑而非硬编码调用。

**4. Windows 作为开发平台的体验被系统性低估**
今日超过三分之一的 PR 都在处理 Windows 上的测试超时与文件锁竞态，说明 CI 绿灯在很大程度上靠调大超时维持。维护者明确表态“优化重用例而非调高超时”（#11885），这个方向值得跟进。

**5. 插件失败要“可见”**
#11697 指出插件可以安装成功却完全不可用，而 UI 与 `plugin doctor` 都不报警。对插件生态而言，“静默失败”比“报错”危害更大。

**6. 1.x → 2.x 的功能回流压力**
#11876（提示音）直接点名“1.x 就有这个选项”。随着 Studio 使用面扩大，这类对比会持续增加，产品侧需要一份明确的功能对齐清单。

---

*日报生成时间：2026-10-04 ｜ 数据窗口：过去 24 小时*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 · 2026-10-04

## 今日速览
今日无新版本发布。社区焦点集中在 OpenCode Go 订阅支付后工作区仍显示“余额不足”的计费问题（#37790），以及 API Key 无法生成/查看的订阅权益断层（#50885，已关闭）。此外，`edit` 工具出现数字替换重复、缩进匹配失败等多个可靠性缺陷，Windows 非 UTF-8 编码问题与 OpenAI 认证崩溃也引发关注。PR 侧重点修复子代理文本块边界、工具调用死循环，并推进浏览器扩展、局域网模型发现等新功能。

## 版本发布
无。

## 社区热点 Issues
1. **[OPEN] [BUG] OpenCode Go 订阅支付成功但工作区显示“余额不足”**  
   [#37790](https://github.com/anomalyco/opencode/issues/37790) | 评论 22 | 👍 0  
   支付已通过 Stripe 成功，但工作区仍报 `Insufficient balance`，导致无法使用 OpenCode Go。这是直接阻断付费用户使用的严重计费同步问题，社区讨论热烈，官方需优先排查。

2. **[CLOSED] NO API KEY**  
   [#50885](https://github.com/anomalyco/opencode/issues/50885) | 评论 9 | 👍 11  
   用户订阅 OpenCode Go 后，控制台不显示个人 API Key，`/connect` 要求 API Key，但 Keys 页面只能创建 Service Accounts。该问题已关闭，但高点赞说明订阅权益交付存在普遍困惑。

3. **[OPEN] [2.0] openai: ChatGPT OAuth 报告长上下文模型为 400k 上下文**  
   [#47646](https://github.com/anomalyco/opencode/issues/47646) | 评论 6 | 👍 0  
   通过 ChatGPT OAuth 使用 OpenAI 模型时，OpenCode 将有效上下文限制覆盖为 400,000 tokens，而实际目录限制约 1.05M，导致 TUI 严重高估/低估可用上下文。影响长上下文场景的准确性。

4. **[OPEN] edit: 数字替换会重复变更值**  
   [#53011](https://github.com/anomalyco/opencode/issues/53011) | 评论 4 | 👍 0  
   `edit` 工具在替换数字时间歇性复制新值，例如 `640` → `900` 变成 `900900`，重复次数从 2x 到 129x 不等。全文件 `write` 不受影响，说明是增量编辑逻辑的缺陷。

5. **[CLOSED] edit: 带前导缩进的 oldString 匹配失败**  
   [#53036](https://github.com/anomalyco/opencode/issues/53036) | 评论 3 | 👍 0  
   `oldString` 包含多空格缩进或反斜杠序列时，即使与文件完全一致也报 `Could not find oldString`。仅单行 `oldString` 正常，影响多行编辑的可靠性。

6. **[OPEN] [Bug][Windows] 非 UTF-8 PowerShell 输出导致文件工具与 shell 重定向产生双重编码乱码**  
   [#53038](https://github.com/anomalyco/opencode/issues/53038) | 评论 1 | 👍 0  
   在土耳其 CP1254、西欧 CP1252 等非 ASCII 默认区域设置下，OpenCode 以 `-NoProfile` 启动 PowerShell/pwsh，因 `[Console]::OutputEncoding` 默认为 ANSI 代码页，导致 UTF-8 双重编码乱码。Windows 多语言环境兼容性问题。

7. **[OPEN] bug: OpenAI 认证流程崩溃**  
   [#53037](https://github.com/anomalyco/opencode/issues/53037) | 评论 1 | 👍 0  
   浏览器和无头模式下 `opencode auth login` 选择 OpenAI ChatGPT Pro/Plus 后授权流程崩溃。影响新用户接入 OpenAI 模型。

8. **[OPEN] V2: 子代理完成时拼接独立文本块**  
   [#53039](https://github.com/anomalyco/opencode/issues/53039) | 评论 0 | 👍 0  
   V2 中 `SubagentCompletion.text` 用空字符串连接独立文本块，丢失段落边界，例如 `production is unchanged.` 与 `## Result` 被直接拼接。影响子代理最终输出的可读性和结构。

## 重要 PR 进展
1. **[OPEN] fix(core): 保留子代理文本块边界**  
   [#53040](https://github.com/anomalyco/opencode/pull/53040) | 作者 @mlimarenko  
   关闭 #53039，修复子代理完成时独立非空文本部分被空字符串拼接的问题，保留段落边界。

2. **[OPEN] fix(core): 停止重复工具调用循环与停滞流**  
   [#53032](https://github.com/anomalyco/opencode/pull/53032) | 作者 @davtur19  
   关闭 #45442，引入两击 doom-loop 检测，防止工具调用无限循环和流停滞，提升运行稳定性。

3. **[OPEN] feat(browser-extension): 添加 OpenCode 浏览器扩展**  
   [#52818](https://github.com/anomalyco/opencode/pull/52818) | 作者 @R44VC0RP  
   新增 `packages/browser-extension`，将 OpenCode 能力扩展到浏览器环境，是产品形态的重要扩展。

4. **[OPEN] feat(opencode): 局域网本地提供商发现 + 自动发现模型**  
   [#27554](https://github.com/anomalyco/opencode/pull/27554) | 作者 @androidand  
   在 `/connect` 中添加 `Local (LAN)` 发现，支持本地 OpenAI 兼容服务器，结合 mDNS 等自动发现模型，方便本地部署用户。

5. **[OPEN] feat(opencode): 添加 /loop 命令**  
   [#51974](https://github.com/anomalyco/opencode/pull/51974) | 作者 @rudolf-blue  
   实现计时器形式的循环命令，引用 #41907、#18001、#23578，满足用户对“重试直到通过”或定时循环的需求。

6. **[CLOSED] feat(opencode): 添加 task-parallel 工具并发分发独立子任务**  
   [#47107](https://github.com/anomalyco/opencode/pull/47107) | 作者 @everest-an  
   新增 `task-parallel` 工具，允许主代理将 2-5 个独立子任务并发分发给子代理，提升多任务处理效率。

7. **[CLOSED] fix(core): 等待提供商调度的配额重试窗口**  
   [#50101](https://github.com/anomalyco/opencode/pull/50101) | 作者 @sghng  
   处理 Gemini 免费层 429 错误中嵌入的 `retryDelay`，避免会话因配额暂时耗尽而硬失败。

8. **[CLOSED] feat(tui): 在插件面板槽位渲染 diffs**  
   [#47152](https://github.com/anomalyco/opencode/pull/47152) | 作者 @jlongster  
   面向 `v2` 的 diff 查看器部分，将 diff 插件追加到 `session.panel`，完善 TUI 插件化展示能力。

9. **[CLOSED] fix(core): 拒绝仅行尾风格不同的编辑**  
   [#47088](https://github.com/anomalyco/opencode/pull/47088) | 作者 @devYRPauli  
   关闭 #45927，修复 `oldString` 与 `newString` 仅行尾风格不同时被错误接受的问题，提升编辑工具安全性。

10. **[CLOSED] fix(session): 停止在重新发出的 delta 上创建幽灵 “unknown” 工具部分**  
    [#44535](https://github.com/anomalyco/opencode/pull/44535) | 作者 @internetisalie  
    关闭 #33618，解决 OpenCode 自身创建幽灵 `unknown` 工具调用的问题，减少会话中的错误工具节点。

## 功能需求趋势
- **订阅与计费系统**：OpenCode Go 支付成功但余额/API Key 未同步，成为最突出的用户阻断问题，反映计费与权益交付链路需要端到端校验。
- **模型上下文准确性**：ChatGPT OAuth 下长上下文模型被错误限制为 400k，社区希望 OpenCode 正确读取模型目录上下文长度。
- **编辑工具可靠性**：数字替换重复、缩进匹配失败、行尾风格差异等 `edit` 工具缺陷集中出现，用户对文件编辑的精确性和稳定性要求高。
- **跨平台兼容性**：Windows 非 UTF-8 控制台导致双重编码乱码，多语言区域设置下的兼容性亟待改善。
- **认证流程健壮性**：OpenAI 认证崩溃影响新用户接入，浏览器与无头模式均受影响。
- **子代理与多任务编排**：子代理文本块边界丢失、任务并行工具、`/loop` 命令等，显示社区对复杂代理工作流和输出结构的关注。
- **本地/局域网模型支持**：局域网提供商发现与自动模型发现 PR 持续更新，本地部署和私有模型接入是长期需求。
- **浏览器扩展与 TUI 插件化**：浏览器扩展、TUI diff 面板等 PR 表明产品形态正在向多端和可扩展方向演进。

## 开发者关注点
- **支付与权益同步断层**：付费成功后仍无法使用、API Key 缺失，直接打击付费转化与信任，需优先修复。
- **`edit` 工具高频缺陷**：数字替换重复、缩进/反斜杠匹配失败、行尾风格误判，严重影响代码修改的可靠性，是开发者日常使用的核心痛点。
- **Windows 编码问题**：非 UTF-8 区域下 PowerShell 输出双重编码，导致文件工具和 shell 重定向乱码，Windows 开发者体验受损。
- **OpenAI 认证崩溃**：浏览器和无头模式均无法完成 ChatGPT OAuth 登录，阻碍 OpenAI 模型用户接入。
- **长上下文模型上下文被覆盖**：ChatGPT OAuth 连接下上下文限制被错误设为 400k，影响大仓库/长文档场景。
- **子代理输出结构丢失**：V2 子代理完成时拼接独立文本块，破坏 Markdown 结构，影响可读性和下游解析。
- **工具调用死循环与流停滞**：重复工具调用和未终止流导致会话卡死，PR #53032 的 doom-loop 检测是重要缓解。
- **配额重试处理**：Gemini 等提供商将重试延迟嵌入错误负载，现有分类将其视为终止错误，需更智能的退避等待。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报（2026-10-04）

> 数据来源：[github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## 1. 今日速览

- 过去 24 小时最重要动态是发布 `dsh-v0.2.1-alpha.1`，新增实验性 Claude Code Mods 兼容层，并在插件管理页加入「让 Agent 创建插件」入口。
- Issues 与 Pull Requests 过去 24 小时更新均为 0 条，公开协作讨论静默，因此今日社区热点主要集中在版本功能而非 Issue/PR 议题。
- 该版本仍为 alpha，兼容层定位是验证 Claude Code Mods API 可映射为 DeepSeek Harness 插件子集，并非完整兼容。

## 2. 版本发布

### dsh-v0.2.1-alpha.1

Release 链接：[dsh-v0.2.1-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)

- **新增实验性 Claude Code Mods 兼容层**  
  主要目的是验证 Claude Code Mods API 功能大致为 DeepSeek Harness 插件的一个子集，而非为用户提供完整兼容性。该功能由 [@tianyicui](https://github.com/tianyicui) 贡献。  
  链接：[Release 说明](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)

- **插件管理页新增「让 Agent 创建插件」入口**  
  可保留草稿进入创造模式；发送需求后才开始执行。这意味着插件创作流程进一步向 Agent 驱动、按需执行方向演进。  
  链接：[Release 说明](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)

## 3. 社区热点 Issues

过去 24 小时内更新 Issues 共 **0 条**，因此无法挑选 10 个最值得关注的 Issue，也无法分析社区反应。  
Issue 列表入口：[deepseek-harness Issues](https://github.com/deepseek-ai/deepseek-harness/issues)

- 状态：无新增或更新 Issue。
- 社区反应：无可分析数据。
- 说明：本日报不编造 Issue 内容，当前 Issue 侧无动态。

## 4. 重要 PR 进展

过去 24 小时内更新 Pull Requests 共 **0 条**，因此无法挑选 10 个重要 PR，也无法总结具体功能或修复内容。  
PR 列表入口：[deepseek-harness Pull Requests](https://github.com/deepseek-ai/deepseek-harness/pulls)

- 状态：无新增或更新 PR。
- 功能/修复：无可用数据。
- 说明：当前 PR 侧无公开进展。

## 5. 功能需求趋势

由于过去 24 小时 Issues 为 0，无法直接从 Issue 中提炼社区需求趋势。以下趋势仅基于本次 Release 内容推断：

- **插件兼容性与生态接入**  
  Claude Code Mods 兼容层表明项目正在探索外部插件 API 的兼容与映射，目标是降低插件迁移或复用成本。  
  链接：[dsh-v0.2.1-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)

- **Agent 驱动的插件开发**  
  「让 Agent 创建插件」入口说明插件创作正在向自然语言需求驱动、Agent 辅助生成方向演进。  
  链接：[dsh-v0.2.1-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)

- **插件管理流程优化**  
  草稿保留、创造模式、发送需求后执行等设计，反映出对插件开发交互流程和可控性的关注。  
  链接：[dsh-v0.2.1-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)

- **其他方向数据不足**  
  IDE 集成、性能优化、新模型支持等方向在本次数据中无 Issues/PR 支撑，暂无法判断趋势。  
  链接：[deepseek-harness Issues](https://github.com/deepseek-ai/deepseek-harness/issues)

## 6. 开发者关注点

基于本次 Release 可识别以下潜在关注点：

- **兼容层边界与 API 覆盖范围**  
  Claude Code Mods API 被视为 DeepSeek Harness 插件 API 的子集，开发者可能关注哪些能力可兼容、哪些不兼容。  
  链接：[dsh-v0.2.1-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)

- **实验性功能的稳定性风险**  
  该兼容层明确为实验性，且不承诺完整兼容，生产环境使用需谨慎评估。  
  链接：[dsh-v0.2.1-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)

- **Agent 创建插件的交互体验**  
  草稿保留、创造模式、发送需求后执行等流程是否清晰可控，可能是后续插件作者关注重点。  
  链接：[dsh-v0.2.1-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)

- **社区反馈静默，缺少高频痛点信号**  
  过去 24 小时无 Issues/PR 更新，暂时无法从开发者反馈中总结高频需求或痛点，建议持续观察后续 Issue/PR。  
  链接：[deepseek-harness Issues](https://github.com/deepseek-ai/deepseek-harness/issues) / [Pull Requests](https://github.com/deepseek-ai/deepseek-harness/pulls)

---

**备注**：本日报严格基于给定数据生成；过去 24 小时 Issues 与 PR 均为 0 条，因此未虚构 Issue/PR 条目或社区反应。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-10-04

## 1. 今日速览

过去24小时无新版本发布，社区焦点集中在 **scratch 临时目录的静默清理问题**（#132401，P0，14条评论），该问题可能导致多天的 agent 工作成果被意外销毁。同时，多个安全与资源管理相关的 PR 进入活跃评审，包括前缀缓存稳定性、Docker 容器重用姿态绑定以及飞书配置热重载等。

## 2. 版本发布

无新版本发布。

## 3. 社区热点 Issues

过去24小时内更新的 Issues 共 5 条，以下全部列出：

- **#132401 [OPEN] [P0] scratch prune: 24h idle delete silently destroys multi-day agent work parked in TMPDIR-pointed scratch**  
  作者：@justinsharpe  
  Hermes 将所有进程的 `TMPDIR`/`TMP`/`TEMP` 指向 `~/.hermes/cache/scratch`，并告知 agents 该目录用于临时文件。但空闲 24 小时后会静默删除文件，无日志、无隔离、无保留标记，导致多天的 agent 工作被销毁。社区反应强烈（14 条评论），标记为 P0 且需要决策。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/132401

- **#132498 [OPEN] [Bug] kanban artifact examples send deliverables to scratch, which the kernel never copies and prunes after 24h idle**  
  作者：@jonpol01  
  `kanban_complete` 和 `kanban_request_review` 的 artifacts 描述示例指向 `~/.hermes/cache/scratch/` 下的文件，但内核从不复制这些交付物，且 24 小时空闲后会被修剪，导致交付物丢失。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/132498

- **#132499 [OPEN] Proposal: opt-in descriptor-relative native file writes without symlink following**  
  作者：@lockhartheavyindustries  
  指出路径检查与后续基于路径的写入之间存在 TOCTOU 窗口，攻击者可通过替换符号链接将写入重定向到检查根之外。提议增加可选的基于描述符的相对原生文件写入，不跟随符号链接。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/132499

- **#132497 [OPEN] [Bug] explicit session archive only flips the flag, so runtime, active-session lease and transcript stay resident**  
  作者：@hermes-kinex  
  `PATCH /api/sessions/{id}` 设置 `{"archived": true}` 是显式的会话结束操作，但仅翻转标志，运行时、活动会话租约和转录内容仍驻留内存。自动清理时保留可恢复是合理的，但显式关闭应释放资源。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/132497

- **#132494 [OPEN] [P3] plugins check-updates shows "update available" from a PyPI row a catalog/lock-pinned plugin can never act on**  
  作者：@Stooovie  
  `hermes plugins check-updates` 会为每个插件打印一行 `pip` 类结果，比较入口点分发包与 PyPI 最新版。对于目录安装的插件，该行可能显示“有更新可用”，但唯一能操作的命令 `hermes plugins update` 比较的是目录固定 SHA，无法处理 PyPI 更新，造成误导。  
  🔗 https://github.com/NousResearch/hermes-agent/issues/132494

## 4. 重要 PR 进展

从过去24小时内更新的 50 条 PR 中，挑选以下 10 条重要进展：

- **#132294 [OPEN] [P0] fix(tools): keep already-sent tool schemas byte-identical on preserve_prefix refresh (fixes #128817)**  
  作者：@Sahilvishnaliya  
  修复 `_merge_preserving_prefix` 在保留槽位时取新 schema 导致已发送字节变化、进而使前缀缓存失效的问题。现在会保持已发送条目的字节不变，新工具仍追加在尾部。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/132294

- **#132501 [OPEN] fix(api): hand back a steer accepted after the final drain**  
  作者：@ericcurtin  
  修复 `/v1/runs` 中最终 drain 后接受的 steer 消息丢失问题。在进入终端状态前再 drain 一次，并将其作为 `pending_steer` 返回。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/132501

- **#132500 [OPEN] fix(plugins): keep the PyPI row informational for catalog-pinned plugins**  
  作者：@liuhao1024  
  针对 #132494，对于从目录安装的插件，将 PyPI 行保持为信息性展示，不再显示“有更新可用”，避免无法执行的更新提示。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/132500

- **#132421 [OPEN] [P1] fix(installer): settle the launch invoke and keep the Launch retry idempotent [risk 1.00]**  
  作者：@OutThisLife  
  修复 Windows 安装程序中 `launch_hermes_desktop` 在异步执行器上内联运行阻塞文件系统探测且无超时的问题，使启动重试幂等。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/132421

- **#106704 [OPEN] feishu: hot-reload per-group group_rules without gateway restart**  
  作者：@KoNit-K  
  飞书适配器的按组准入设置（如 `require_mention`）原先在构造时解析并冻结，变更需重启网关。此 PR 实现热重载，无需重启即可更新组规则。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/106704

- **#74809 [OPEN] fix(mcp): isolate per-server env_file resolution**  
  作者：@seppegadeyne  
  为原生 MCP 配置添加隔离的 per-server `env_file` 支持，并统一运行时发现与 CLI 探测的解析路径，提升安全边界与兼容性。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/74809

- **#95247 [OPEN] feat(approvals): per-tool allow/ask/deny policy — non-shell tools finally gated**  
  作者：@teknium1  
  为所有工具（包括 MCP 连接器和插件工具）引入按工具的 `allow`/`ask`/`deny` 权限策略。此前只有终端命令需要用户批准，现在可对任意工具进行细粒度管控。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/95247

- **#107791 [OPEN] fix(docker): bind container reuse to runtime posture**  
  作者：@foma-agent  
  将跨进程 Docker 容器重用绑定到有效运行姿态。若挂载、Docker 参数或转发的环境值发生变化，则不能附加到旧姿态创建的容器上，避免安全策略绕过。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/107791

- **#102875 [OPEN] feat(terminal): bubblewrap backend, a per-command bwrap sandbox on the host**  
  作者：@TacoTakumi  
  为 Linux 添加 bubblewrap 终端后端。设置 `terminal.backend` 为 `bubblewrap` 后，每个 shell 命令在独立的 bwrap 沙箱中运行，主机文件系统只读，工作目录可写，凭证被隐藏。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/102875

- **#126381 [OPEN] fix(agent): keep per-provider transport config on fallback activation**  
  作者：@rpridal  
  当 agent 故障转移到备用路由时，保留每个提供者的传输配置（如 TLS 旋钮、网关设置）。原先备用激活会从客户端对象重建 `_client_kwargs`，导致这些配置丢失。  
  🔗 https://github.com/NousResearch/hermes-agent/pull/126381

## 5. 功能需求趋势

从近期 Issues 和 PR 中可提炼出以下社区关注方向：

- **临时文件与交付物生命周期管理**：scratch 目录的自动清理策略亟待改进，需要日志、隔离区、保留标记，并确保 kanban 等交付物不会被误删。
- **安全加固**：TOCTOU 防护、符号链接安全、Docker 容器重用姿态绑定、MCP 环境文件隔离、bubblewrap 沙箱等。
- **会话与资源释放**：显式归档会话时应释放运行时、租约和转录内容，避免资源泄漏。
- **缓存与性能稳定性**：保持已发送工具 schema 的字节一致性，防止前缀缓存失效。
- **插件更新生态**：目录固定插件与 PyPI 更新检查的语义冲突需要更清晰的提示。
- **多平台集成**：飞书配置热重载、Windows 安装启动可靠性、Linux 桌面启动器环境继承。
- **细粒度工具权限**：从仅终端命令审批扩展到所有工具（含 MCP 和插件）的 allow/ask/deny 策略。

## 6. 开发者关注点

开发者反馈中反复出现的痛点与高频需求：

- **数据丢失风险**：scratch 目录 24 小时静默清理被标记为 P0，开发者担心多日工作成果被意外销毁，要求至少提供日志、隔离或保留机制。
- **安全边界模糊**：路径检查与写入之间的 TOCTOU 窗口、Docker 重用绕过姿态、MCP 环境文件泄漏等问题表明开发者对安全边界的一致性高度敏感。
- **资源管理不彻底**：显式归档会话后运行时和租约仍驻留，开发者期望显式操作能真正释放资源。
- **误导性提示**：插件更新检查显示无法执行的更新，增加运维困惑。
- **跨平台稳定性**：Windows 安装启动阻塞、Linux 桌面启动器环境丢失，反映出多平台支持仍需打磨。
- **性能敏感**：前缀缓存失效问题虽为 P0，但属于性能优化范畴，说明开发者对推理效率有持续需求。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报（2026-10-04）

## 1. 今日速览

OpenClaw 发布 **v2026.9.8**，包含 58 commits、43 PR、21 位贡献者。过去 24 小时社区高度活跃：14 个 Issue 更新、50 个 PR 更新，重点集中在**消息投递可靠性、会话状态稳定性、多平台集成修复**。P1 问题包括审批丢失、ACP 线程回复丢失、memory-core 数据库死锁等，相关修复 PR 已提交或关闭。

---

## 2. 版本发布

### v2026.9.8
- 发布内容：58 commits · 43 pull requests · 21 contributors
- 官方 Release notes / Changelog 见 [docs.openclaw.ai/releases/2026.9](https://docs.openclaw.ai/releases/2026.9)
- 本次发布延续近期高频迭代节奏，具体变更以官方文档为准。

---

## 3. 社区热点 Issues（精选 10 条）

1. **[P1] Gate superseded-preview delete on confirmed replacement delivery (draft-stream.ts)**  
   [#164611](https://github.com/openclaw/openclaw/issues/164611) · OPEN · 评论 2 · 🦞 diamond lobster  
   重要性：Telegram 流式预览在未确认替换交付前被删除，可能导致消息丢失。属于 `message-loss` 影响面，修复方案明确（`extensions/telegram/src/draft-stream.ts`）。

2. **[P1] memory-core: session publication self-deadlocks for busy timeout on rollback-journal agent databases**  
   [#164621](https://github.com/openclaw/openclaw/issues/164621) · OPEN · 评论 1 · 🦞 diamond lobster  
   重要性：SQLite rollback-journal 模式下 `openclaw memory index` 因 “database is locked” 失败，影响 macOS Docker 绑定挂载等网络/虚拟化文件系统。会话状态与记忆索引的核心稳定性问题。

3. **[P1] approvals from a sessions_spawn child never reach the chat that delegated the task**  
   [#164569](https://github.com/openclaw/openclaw/issues/164569) · CLOSED · 评论 1 · 🦞 diamond lobster  
   重要性：WhatsApp/Slack DM 中委派 `sessions_spawn` 后，子会话的审批无法到达原聊天，涉及安全与消息丢失。已有修复 PR [#164570](https://github.com/openclaw/openclaw/pull/164570)。

4. **[P1] Hook requests can execute after client disconnects during admission**  
   [#120978](https://github.com/openclaw/openclaw/issues/120978) · OPEN · 评论 2 · 🦞 diamond lobster  
   重要性：Gmail watcher 重试可能在客户端断开后启动重复 hook agent 运行。可靠性问题，可能导致重复处理。

5. **[P1] ACP session spawned into its own thread never replies in-thread**  
   [#123933](https://github.com/openclaw/openclaw/issues/123933) · OPEN · 评论 1 · 🦞 diamond lobster  
   重要性：通过 `sessions_spawn({ thread: true })` 创建的 ACP 会话无法将回复投递回原线程，直接影响 OpenCode 编码线程体验。修复 PR [#123930](https://github.com/openclaw/openclaw/pull/123930) 已提交。

6. **[P2] Signal outbound attachments are passed to signal-cli as a filesystem path**  
   [#123815](https://github.com/openclaw/openclaw/issues/123815) · OPEN · 评论 2 · 🦞 diamond lobster  
   重要性：当 signal-cli 与网关以不同 uid 运行时，所有生成的图片/视频附件发送失败。属于 `message-loss`，对强化部署场景影响显著。

7. **[P2] Telegram model picker overlaps stale rich text after legacy edit**  
   [#123886](https://github.com/openclaw/openclaw/issues/123886) · OPEN · 评论 4 · 🦞 diamond lobster  
   重要性：Telegram iOS 在 `richMessages: true` 下，`/models` 选择器通过旧版 HTML 路径编辑后出现富文本重叠。UX 摩擦类问题，评论数较多。

8. **[P2] inline-button prompt guidance ignores chat type**  
   [#123918](https://github.com/openclaw/openclaw/issues/123918) · OPEN · 评论 2 · 🦞 diamond lobster  
   重要性：Agent 提示词不考虑聊天类型，向群组宣传运行时拒绝的内联按钮，导致配置与运行时不一致。需要产品决策。

9. **[P2] Codex app-server: apply_patch/exec fail with bwrap ENOENT**  
   [#123900](https://github.com/openclaw/openclaw/issues/123900) · OPEN · 评论 3 · 🦐 gold shrimp  
   重要性：Codex 插件间歇性出现 `bwrap: execvp .../bin/codex: No such file or directory`，一天内复现 4 次。涉及 guardian 路径解析与 network_proxy re-exec。

10. **[P2] Feature: Setting to disable the hosted plugin catalog feed**  
    [#164620](https://github.com/openclaw/openclaw/issues/164620) · OPEN · 评论 1 · 🌊 off-meta tidepool  
    重要性：网关会硬编码拉取 `https://clawhub.ai/v1/feeds/plugins`，用户希望可关闭。隐私与离线部署需求。

---

## 4. 重要 PR 进展（精选 10 条）

1. **[CLOSED] fix(approvals): approvals from a spawned session reach the chat that delegated it**  
   [#164570](https://github.com/openclaw/openclaw/pull/164570)  
   修复 #164569：让 `sessions_spawn` 子会话中的审批请求到达委派任务的 WhatsApp/Slack 聊天，涉及安全与消息投递。

2. **[OPEN] fix(acp): deliver thread-bound ACP child replies instead of suppressing them**  
   [#123930](https://github.com/openclaw/openclaw/pull/123930)  
   修复 #123933：让线程绑定的 ACP 子会话回复正常投递回原线程，而不是被抑制。

3. **[CLOSED] fix: queued workers miss cooperative checkpoints under shared pressure**  
   [#164537](https://github.com/openclaw/openclaw/pull/164537)  
   修复 #164536：共享计算压力下，排队 worker 任务可到达下一个可协作检查点，避免反复信号同一阻塞交换。

4. **[OPEN] fix(agents): park a requester settle wake that cannot settle instead of retrying every 2 minutes forever**  
   [#164529](https://github.com/openclaw/openclaw/pull/164529)  
   修复无法结算的 requester settle wake 每 2 分钟无限重试的问题，避免持久化行所有权不一致导致的持续失败。

5. **[OPEN] fix(browser): host guidance conflicts with configured node routing**  
   [#164575](https://github.com/openclaw/openclaw/pull/164575)  
   修复浏览器工具在配置了浏览器节点时仍推荐 host 的问题，确保 agent 收到的指导与实际节点路由一致。

6. **[OPEN] fix: preserve channel context in node exec**  
   [#164584](https://github.com/openclaw/openclaw/pull/164584)  
   P1 修复：当 shell 过滤移除内部环境标记时，保留通道发起的节点执行中的发送者/聊天上下文。安全敏感。

7. **[OPEN] feat(workboard): show boards in the sidebar and pin your own**  
   [#164604](https://github.com/openclaw/openclaw/pull/164604)  
   为 Workboard 插件增加侧边栏导航和固定能力，通过 `parent` 实现一级插件导航嵌套，提升可发现性。

8. **[OPEN] fix(codex): automate managed runtime and model updates**  
   [#157920](https://github.com/openclaw/openclaw/pull/157920)  
   关闭 #157883：自动检查并更新兼容的官方稳定版 Codex 运行时与模型，避免托管运行时长期过期。

9. **[CLOSED] perf(sessions): compact shared lists and apply row deltas**  
   [#164573](https://github.com/openclaw/openclaw/pull/164573)  
   性能优化：会话行事件不再导致 Activity 重新拉取完整名单，列表响应复用详情元数据，降低序列化开销。

10. **[OPEN] feat(google): expose Flash Lite image cost estimate**  
    [#108892](https://github.com/openclaw/openclaw/pull/108892)  
    为 `google/gemini-3.1-flash-lite-image` 1K 标准图像生成暴露确定性的 `metadata.costEstimate`，提供每张图像成本回执。

---

## 5. 功能需求趋势

从近期 Issues 与 PR 中可提炼出以下方向：

- **消息投递可靠性**：Signal 附件路径、Telegram 富文本预览、Slack 线程卡片、ACP 线程回复、审批投递等，`message-loss` 是最高频影响标签。
- **会话状态与数据迁移**：memory-core 数据库死锁、历史压缩状态迁移、ACP 遗留元数据迁移，社区对 Doctor 工具和稳定持久化需求强烈。
- **隐私与离线控制**：希望禁用托管插件目录 feed（#164620），减少硬编码外部请求。
- **模型可用性与成本透明度**：xAI server-tool 在默认模型不可用时的行为契约（#122736）、Google Flash Lite 图像成本估算。
- **配置语义一致性**：内联按钮作用域忽略聊天类型、浏览器节点路由与 host 指导冲突，说明配置与实际运行时行为需要更一致。
- **性能与资源管理**：共享 worker 压力、会话列表增量更新、运行时缓存清理，持续优化网关主线程负载。
- **开发者体验与 CI**：Android 商店截图失败捕获、移动上传后 Git 瞬时失败容忍、Codex 托管运行时自动更新。

---

## 6. 开发者关注点

- **最高优先级痛点仍是“消息丢失”**：多个 P1/P2 Issue 带有 `impact:message-loss`，覆盖审批、ACP、Signal、Telegram、Slack 等场景。修复需覆盖端到端投递确认与权限/uid 边界。
- **会话状态与数据库稳定性**：SQLite rollback-journal 模式下的死锁、worker 无限重试、子代理结算所有权冲突，反映高并发与异常恢复路径仍需加固。
- **多平台集成细节**：Telegram、Slack、Signal、WhatsApp、Discord、Matrix 等通道的配置语义、线程模型、富文本渲染差异，是社区反馈最密集的区域。
- **安全边界与审批链路**：`sessions_spawn` 子会话审批、节点执行通道上下文、插件目录外部请求，均涉及安全与隐私边界。
- **UX 摩擦不可忽视**：静默时间设置设计、隐私指示器断连丢失、模型选择器重叠，虽非崩溃，但直接影响日常使用信心。
- **基础设施与性能重构活跃**：维护者 @steipete 主导多项 `deslop`、worker 迁移、缓存清理和 Doctor 迁移 PR，显示项目正在为长期可维护性做系统性清理。

---

*日报由 AI 技术分析生成，数据截至 2026-10-04。*

:::
