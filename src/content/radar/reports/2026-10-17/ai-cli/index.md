---
title: "AI CLI 工具社区动态日报"
published: 2026-10-17
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-17

> 生成时间: 2026-10-17 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具社区横向对比分析报告  
**日期：2026-10-17 ｜ 覆盖：Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenCode、Deepseek Harness、Hermes、OpenClaw**

> **数据口径说明**：除 Deepseek Harness 明确“Issues/PR 均为 0”、OpenClaw 明确“仅 2 条 Issue 更新”外，多数日报提供的是“热点/精选条目”，并非全量 Issue/PR 总数。下表“Issues/PR”按日报收录口径统计，用于比较社区关注密度，不代表仓库绝对总量。

---

## 1. 生态全景

当前 AI CLI 工具已从“能不能写代码”进入“能不能稳定托管长任务、多入口一致工作”的阶段。官方工具（Claude Code、Codex、Gemini CLI）继续以高频 Release 和 MCP/Agent 平台能力扩张，但 Windows 稳定性、会话恢复、权限可解释性成为共同短板。社区驱动工具（Reasonix、OpenCode、Hermes、OpenClaw）迭代更快，重点补审批自动化、Gateway 恢复、插件生态和本地模型支持。一个明显信号是：**静默失败、配置不生效、压缩后状态丢失，比显式报错更严重地侵蚀用户信任**。整体看，竞争焦点正从模型能力转向“Agent 宿主可靠性 + 可观测性 + 多端一致性”。

---

## 2. 各工具活跃度对比

| 工具 | Release 情况 | Issues 动态（日报收录/热点） | PR 动态（日报收录/重要） | 活跃度信号 |
|---|---|---|---|---|
| **Claude Code** | v2.1.302：新增 `CLAUDE_CODE_AUTO_MODE_MODEL`、Idle compaction 开关 | 10 条精选 + 3 条新提交，约 13 条 | **0 条新增/更新 PR** | 讨论热但外贡献通道弱；Windows VM 存储 #56089 获 53 👍 |
| **OpenAI Codex** | rust-v0.164.0-alpha.1 / .2 | 10 条热点 + 4 条其他，约 14 条 | 10 条重要 PR + 4 条发布工程，约 14 条 | Windows 问题集中爆发；MCP 并行调用、OAuth、动态工具列表密集落地 |
| **Gemini CLI** | v0.66.0-nightly.20261016 | 10 条热点 | 10 条重要 PR + 2 条补充，约 12 条 | 子代理挂起/误报成功为最高优先级；P0 #13292 关闭 |
| **DeepSeek Reasonix** | v2.42.0 / studio-v2.42.0 | 10 条热点 | 10 条重点 + 若干合并/测试修复 | 审批自动化 PR 潮；#13478“禁止无尽点击”成纲领 |
| **OpenCode** | v1.19.2 / v1.19.3 | 10 条热点 | 10 条重要 PR + 4 条其他，约 14 条 | 明确 1.x 不自动升 2.x；v2 可观测性回归修复中 |
| **Deepseek Harness** | dsh-v0.2.1-alpha.5 | **0 条** | **0 条** | 仅 alpha 稳定性维护；插件/技能同步、终端重试、PTC 指引 |
| **Hermes** | 无正式 Release；PR #140203 记录 v0.22.2 快进 | 10 条热点 + 2 条其他，约 12 条 | 10 条重要 PR + 5 条其他，约 15 条 | #134889 Gateway 统一化跟踪 128 评论；cron 投递可靠性最密集 |
| **OpenClaw** | v2026.10.4：修复休眠/时钟跳变导致 Gateway 自重启 | **仅 2 条 Issue 更新** | 10 条重点 + 若干；窗口内约 50 条 PR 更新 | Issue 少但 PR 极活跃；诊断可信度与工具调用恢复为核心 |

**活跃度简评**：  
- Release 频率：Codex（双 alpha）、OpenCode（双补丁）、Reasonix（Studio 大版本）最密集；Gemini 走 nightly；Claude/OpenClaw 为补丁/稳定性发布；Hermes 无正式版本但 PR 密集；Deepseek Harness 处于低互动 alpha 期。  
- Issue 讨论峰值：Hermes #134889（128 评论）> Codex #42739（65）、#49532（63）> Claude #56281（30）> Gemini #13292（15）> OpenCode #56212（10）> OpenClaw #101445（7）。  
- PR 活跃度：OpenClaw 窗口内约 50 条 PR 更新最高；Codex、Hermes、Reasonix、OpenCode、Gemini 均有密集修复/功能 PR；Claude Code 过去 24 小时 0 PR，社区推进主要靠 Issue。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具与具体诉求 | 信号强度 |
|---|---|---|
| **会话生命周期、恢复与压缩** | Claude #87984 后台会话新 session id、#82017 压缩后丢技能清单；Codex #30866 resume 线程历史；Gemini #22323 子代理误报成功；Reasonix #9766 turn 截断、#13467 `await_user` 不阻塞；OpenCode #55891 旧会话迁移搁浅、#56208 手动压缩指令；Hermes #134889 统一 Gateway 会话、#140198 lean tail 上限失效；OpenClaw #174855 重启后 legacy 子任务阻塞 | 🔥🔥🔥 |
| **多入口/多平台一致性** | Claude #99032 VS Code 忽略外部 @import、#56089 Windows VM 存储、#102132 Desktop 回合时序；Codex Windows 项目消失、BitLocker 沙箱、WSL2 锁；Gemini #22267 Browser Agent 忽略 settings；OpenCode v1→v2 行为回归；Hermes Desktop/TUI/CLI 指标与审批对齐；Reasonix 中文本地化不完整；Deepseek Harness Windows/Linux 右侧栏修复 | 🔥🔥🔥 |
| **沙箱、权限与审批可解释性** | Claude #95122 worktree 误拒无 git Bash；Codex #40060 execpolicy 误报、#50884 无解释拦截；Gemini #29688 命令替换守卫绕过、#29782 exitCode 误判；Reasonix #13478 禁止无尽点击、#13504 出站放行、#13507 计划审批开关；OpenCode #56247 v2 权限日志丢失；Hermes #140196 browser_vault 跨标签注入；OpenClaw #173313 `config get` 掩码误导排障 | 🔥🔥🔥 |
| **诊断、可观测性与静默失败** | Claude #102875 grep 静默丢文件、#87217 规则静默失效；Codex #54662 AGENTS.md 被忽略；Gemini #22323 失败报成功；OpenCode #56247 权限日志丢失；OpenClaw #101445 Ollama `payloads=0 tools=0`、#173313 敏感值掩码；Hermes #99988 cron 错误分类误判 | 🔥🔥🔥 |
| **MCP / 插件 / Agent 编排平台化** | Codex 并行工具调用 #31591、动态工具列表 #54656、OAuth 作用域最小化 #54653、跨环境复制 #54674；Reasonix MCP 资源模板 #13503、只读资源工具 #13485；OpenCode 插件暴露 session list #56264；Hermes 插件 API 创建可见会话 #140199、平台插件自声明 #140168；Gemini skills/子代理调度 #21968；OpenClaw 子任务恢复与工具回放 | 🔥🔥 |
| **计费、配额与授权透明度** | Claude #56281 升级支付失败挂 5 个月；Codex #54718 周额度骤降至 0%；Reasonix #12900 “已落地/每小时最多”显示反；OpenCode #52894 免费额度精确重置时间；OpenClaw auth-provider 相关标签反复出现 | 🔥🔥 |
| **Windows / 企业环境一等公民** | Claude #56089 VM 存储、#89113 MSIX 容器写入；Codex #42739 项目消失、#41982 git.exe 风暴 OOM、#50915 BitLocker 沙箱失败；Reasonix #13491 多会话卡死；OpenCode #55888 Windows npm postinstall 跳过；Hermes `risk-platform-windows`；Deepseek Harness Windows/Linux 交互修复 | 🔥🔥 |
| **Token 成本与上下文效率** | Gemini #22745/#22746/#22747 AST 感知读取与搜索、#29783 include 精确匹配；Hermes #140198 lean tail 不生效；Claude #82017 压缩后技能清单；OpenCode #56208 手动压缩指令 | 🔥🔥 |
| **指令遵循与项目规则** | Claude CLAUDE.md @import 失效；Codex AGENTS.md 跨模型/会话失效 #54662；OpenCode agents.md 被 developer instructions 压制 #56261；Gemini settings.json 覆写不生效 #22267 | 🔥🔥 |
| **本地模型 / 多模态 / provider 兼容** | OpenClaw Ollama 工具调用解析 #101445、llmman 绕行 #174861；Reasonix 会话图片缺失 #13471；OpenCode 含图历史被 provider 拒收 #56275、SAP AI Core 凭据 #56274 | 🔥 |

---

## 4. 差异化定位分析

| 工具 | 定位与目标用户 | 功能侧重 | 技术路线与主要风险 |
|---|---|---|---|
| **Claude Code** | Anthropic 官方，专业开发者/团队，Max 订阅用户 | CLI + VS Code + Desktop + Cowork VM；细粒度配置、auto mode、idle compaction、企业规则文件 | 官方闭源生态，强调可控性与安全防护；风险：多入口行为不一致、订阅/计费支持闭环差、Windows 配置缺口 |
| **OpenAI Codex** | OpenAI 官方，Pro/团队，云+本地混合工作流 | Rust CLI + app-server + Dots/Remote/Cloud Browser + MCP 平台；并行工具调用、跨环境复制 | 快速 alpha 迭代，Agent 宿主平台化；风险：Windows 稳定性、沙箱策略不可解释、配额透明度 |
| **Gemini CLI** | Google 官方开源，Google/Gemini 生态开发者 | 子代理编排、AST 感知代码理解、OS 沙箱、IDE/浏览器代理、token 效率 | nightly 快速迭代，强调 agent 可靠性与安全守卫；风险：通用代理挂起、子代理误报成功、配置不生效 |
| **DeepSeek Reasonix** | esengine/DeepSeek 生态，中文社区、长任务自动化用户 | Studio + CLI；计划审批自动化、沙箱出站放行、审批记忆、MCP、多会话 | 社区驱动 + 快速功能落地，中文本地化深；风险：并发卡死、加载慢、多模态缺失、工具语义不一致 |
| **OpenCode** | anomalyco，开源/多模型用户，TUI/Web/Desktop 多端 | 1.x/2.x 并行策略、provider 抽象、插件系统、语音输入、手动压缩 | 显式版本分流，插件与 provider 生态；风险：v1→v2 迁移数据安全、v2 可观测性回归、跨平台细节 |
| **Deepseek Harness** | DeepSeek 官方 harness，SDK/Web/headless 集成开发者 | 插件/技能同步、终端会话、PTC Mode、多端模型身份一致 | 早期 alpha，数据互动少；风险：社区反馈稀疏，生态成熟度待验证 |
| **Hermes** | NousResearch，自托管/多平台 Agent 用户 | 统一 Gateway 会话所有权、多平台适配器、cron 投递、插件 API、Desktop/TUI/CLI 对齐 | Gateway 重构期，插件平台自声明；风险：消息投递静默丢失、重启恢复语义、压缩预算不准确 |
| **OpenClaw** | openclaw，自托管/本地模型/运维向用户 | Gateway 生命周期、PostgreSQL 持久化、Ollama 本地模型、Doctor/dreaming、工具调用恢复 | Gateway 中心架构，PR 极活跃；风险：诊断工具不可信、本地模型工具调用跨层断层、重启后 legacy 状态接管 |

---

## 5. 社区热度与成熟度

**第一梯队：大厂官方工具，高热且高期望。**  
Claude Code、Codex、Gemini CLI 拥有最高关注度和订阅/企业用户基础，但问题也最“伤信任”：Claude 的支付支持、Codex 的 Windows 资源耗尽与配额、Gemini 的子代理挂起与失败伪装成功。三者都在通过 Release 快速修补，但社区对“被 stale 关闭 ≠ 已修复”的敏感度明显上升。

**第二梯队：社区/生态驱动工具，迭代快、体验打磨密集。**  
Reasonix、OpenCode、Hermes、OpenClaw 的 PR 活跃度普遍高于 Claude Code。Reasonix 围绕“无强制点击”快速推进审批自动化；OpenCode 明确 1.x/2.x 分流并修复 v2 回归；Hermes 以 #134889 128 评论的 Gateway 统一化为主线；OpenClaw 24 小时内约 50 条 PR 更新，聚焦 Gateway、数据库、工具调用恢复。它们更贴近自托管、多模型、多平台场景，但成熟度仍在补齐。

**第三梯队：早期/低互动。**  
Deepseek Harness 过去 24 小时 Issues/PR 均为 0，仅发布 alpha 维护版本，社区热度尚未形成。其插件、终端、PTC Mode 的修复方向明确，但需要更多反馈验证。

**成熟度判断**：  
- **发布成熟度**：Claude/Codex/Gemini 最高，但 Windows 和企业环境仍是长尾雷区。  
- **社区治理成熟度**：OpenCode/Reasonix/Hermes/OpenClaw 更依赖 PR 驱动，响应快但稳定性波动。  
- **迁移风险**：OpenCode v1→v2、Claude 多入口、Codex Windows 桌面更新，是当前最需要谨慎对待的升级路径。

---

## 6. 值得关注的趋势信号

1. **会话已是核心资产，恢复/压缩语义决定工具可信度。**  
   多工具都在处理 resume、后台会话、压缩后上下文、子代理轨迹。开发者选型时应重点验证：长会话压缩后技能/规则是否保留、跨重启是否能恢复、子代理失败是否会被正确上报。

2. **多入口一致性成为团队采用的关键门槛。**  
   VS Code、Desktop、CLI、WSL、Web、TUI 的行为分歧正在制造隐性成本。若团队共享 `CLAUDE.md`、`AGENTS.md`、`agents.md`，必须实测各入口是否加载一致。

3. **静默失败比显式报错更危险。**  
   从 grep 跳过文件、规则静默失效，到权限日志丢失、`config get` 掩码误导排障，社区反复指出：没有报错但结果错误，会系统性破坏自动化与评测。工具需要结构化错误码、明确掩码提示、可诊断策略反馈。

4. **沙箱与权限必须“可解释 + 可放行”。**  
   Codex execpolicy 误报、Claude worktree 误拒、Reasonix 无尽点击审批，共同说明：开发者能接受拒绝，但不能接受无原因、无豁免、无切换入口。用户级放行、审批记忆、超时续跑将成为 Agent 产品标配。

5. **MCP/插件竞争进入“平台化”阶段。**  
   Codex 在并行工具调用、动态工具列表、OAuth 作用域上密集落地；Reasonix、OpenCode、Hermes 在插件 API、资源模板、会话暴露上跟进。AI CLI 正在从“工具”变成“Agent 宿主平台”。

6. **Windows / 企业环境不能只做兼容补丁。**  
   BitLocker、MSIX、WSL2、PATH 遮蔽、VM 存储位置、磁盘空间合规，反复成为阻塞级问题。面向企业推广的工具需要把 Windows 作为一等公民设计。

7. **计费与配额透明度直接影响付费信任。**  
   Claude 支付失败长期无闭环、Codex 周额度骤降、Reasonix 指标显示反、OpenCode 免费额度重置不明确。订阅制工具若不能提供实时、可审计的额度说明，会持续消耗用户耐心。

8. **上下文成本优化从“压缩”走向“精确理解”。**  
   Gemini 的 AST 感知读取/搜索、OpenCode 的手动压缩指令、Hermes 的 tail mode、Claude 的 idle compaction，说明社区不再满足于粗暴截断，而是要求可预测、可配置、可省钱的上下文管理。

9. **本地模型与多模态仍是薄弱环节。**  
   OpenClaw 的 Ollama 工具调用解析、Reasonix 图片展示缺失、OpenCode 含图历史被 provider 拒收，表明“本地模型 + 多模态 + 工具调用”的交叉场景仍缺少稳定抽象。

10. **发布工程与质量基建成为隐性竞争力。**  
    Codex 预发布 Draft 门控、Gemini 信号转发/SSE 末尾事件、OpenClaw 大规模测试清理、Hermes “先写失败测试再修”，说明头部项目正在把发布可靠性和回归防护系统化。对开发者而言，选择工具时应关注其 stale bot 关闭是否等于修复、alpha 是否可追溯。

---

### 对技术决策者的简要建议

- **若团队强依赖多 IDE/多入口规则一致性**：优先实测 Claude Code、Codex、OpenCode 在 VS Code/Desktop/CLI 下的规则加载与权限行为。  
- **若做长任务自动化与无人值守**：重点关注 Reasonix 的审批放行/超时续跑、Hermes 的 cron 投递可靠性、Codex 的 MCP 并行与云执行稳定性。  
- **若在 Windows 企业环境部署**：Claude、Codex、OpenCode、Reasonix 均需重点验证 BitLocker、MSIX、WSL2、PATH、磁盘位置和后台进程资源占用。  
- **若建设 Agent 平台/插件生态**：Codex、Reasonix、OpenCode、Hermes 的 MCP/插件接口最值得跟踪，但需接受其部分能力仍以 feature flag 或 alpha 形式存在。  
- **选型核心指标**：会话恢复语义、压缩后可观测性、权限可解释性、多端一致性、升级迁移路径、配额透明度。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

> 注：给定数据中 PR 评论数均为 `undefined`，因此“热门 PR”排行不完全按评论数，而按列表位次、更新活跃度、关联 Issue 讨论度综合整理。以下 PR 状态均为 **OPEN**。

## 1. 热门 Skills 排行

1. **[PR #1742] mcp-builder：兼容 mcp>=2 的 streamable_http_client 与自定义 headers**  
   功能：修复 `mcp>=2.0.0` 中 `streamablehttp_client` 重命名及 headers 配置方式变化。  
   热点：MCP 工具链兼容性、真实 MCP Server 评估失败，关联 #1668、#1390。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/1742

2. **[PR #1298] skill-creator：隔离 trigger evals，处理 Windows 与运行时失败**  
   功能：修复触发评估误报、Windows 管道 `select()` 失败、无关工具干扰扫描等问题。  
   热点：Skill 评估可信度、Windows 跨平台稳定性，关联 #556、#1383。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/1298

3. **[PR #1245] 新增 notion-spec-to-implementation 与 quantitative-resume-auditor**  
   功能：把 Notion 产品/技术规格拆成可实现任务；量化审计简历。  
   热点：规格到落地任务的工作流自动化、求职场景 Skill。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/1245

4. **[PR #1771] proofcore-contract-auditor：智能合约审计与链上存证**  
   功能：对 Solidity/Rust 合约做静态分析，并把审计证明锚定到 TON 区块链。  
   热点：Web3 安全、零存储 Merkle 证明、审计可验证性。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/1771

5. **[PR #1703] md2video-audio：Markdown 转视频与配音**  
   功能：Markdown 经 Marp 生成幻灯片，再编译为带人声配音的 MP4。  
   热点：零成本内容视频化、TTS 配音、演示文档自动化。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/1703

6. **[PR #1961] skill-creator：加固 eval viewer 安全**  
   功能：修复脚本越界、DNS rebinding、跨站 POST、转义不严等本地查看器风险。  
   热点：Skill 评估输出不可信、XSS 与本地服务安全，关联 #1394。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/1961

7. **[PR #1792] docx：LibreOffice 超时报错并验证输出**  
   功能：`accept_changes.py` 超时不再假成功，并检查 DOCX 是否仍含修订标记。  
   热点：docx 修订处理可靠性、静默失败。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/1792

8. **[PR #2039 / #2040] harness SDD suite：规范驱动开发与架构顾问**  
   功能：#2039 提供 spec-driven development、dispatch discipline、adversarial review；#2040 增加 architecture-advisor。  
   热点：多智能体流程、对抗式审查、架构决策留痕。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/2039  
   链接：https://github.com/anthropics/skills/pull/2040

## 2. 社区需求趋势

- **安全与信任边界是最高优先级**  
  社区最热 Issue 是社区 Skill 滥用 `anthropic/` 命名空间带来的信任问题，46 条评论；同时 eval viewer XSS 也持续被讨论。  
  链接：https://github.com/anthropics/skills/issues/492  
  链接：https://github.com/anthropics/skills/issues/1394

- **组织级 Skill 共享与去重**  
  用户希望 Claude.ai 支持组织内直接共享 Skill，而不是下载 `.skill` 后手动上传；同时 `document-skills` 与 `example-skills` 内容重复导致上下文污染。  
  链接：https://github.com/anthropics/skills/issues/228  
  链接：https://github.com/anthropics/skills/issues/189

- **Skill 评估与触发可靠性**  
  `run_eval.py` 报告 0% 触发率，skill-creator 在 Windows、基准测试、触发评估上存在多类静默失败。  
  链接：https://github.com/anthropics/skills/issues/556  
  链接：https://github.com/anthropics/skills/issues/1383

- **上下文与性能优化**  
  `claude-api` 单次工具调用注入约 156k tokens；社区也在提出 `compact-memory` 等符号化记忆方案。  
  链接：https://github.com/anthropics/skills/issues/1487  
  链接：https://github.com/anthropics/skills/issues/1329

- **文档生成与格式质量**  
  docx、pdf、ODT、排版、修订标记、评论清理等需求密集，说明文档类 Skill 仍是主战场。  
  链接：https://github.com/anthropics/skills/issues/2018  
  链接：https://github.com/anthropics/skills/pull/486  
  链接：https://github.com/anthropics/skills/pull/514

- **流程治理与质量门禁**  
  社区提出 agent-governance、reasoning quality gate、harness SDD 等方向，关注策略执行、对抗审查、交付验证。  
  链接：https://github.com/anthropics/skills/issues/412  
  链接：https://github.com/anthropics/skills/issues/1385

- **MCP/API 工具链稳定性**  
  mcp-builder 的评估脚本和 SDK 升级兼容问题被多次提出，影响真实 MCP Server 使用。  
  链接：https://github.com/anthropics/skills/issues/1390  
  链接：https://github.com/anthropics/skills/pull/1742

## 3. 高潜力待合并 Skills

- **[PR #1742] mcp-builder 兼容修复**：关联 MCP SDK 升级和评估失败，更新至 10-08，落地概率高。  
  https://github.com/anthropics/skills/pull/1742

- **[PR #1298] skill-creator trigger evals 隔离**：直击 #556 的 0% 触发率和 Windows 问题，更新至 09-16。  
  https://github.com/anthropics/skills/pull/1298

- **[PR #1961] skill-creator eval viewer 安全加固**：对应 #1394，安全问题通常优先级较高，更新至 10-11。  
  https://github.com/anthropics/skills/pull/1961

- **[PR #1681] skill-creator 支持直接执行 package_skill.py**：修复 `ModuleNotFoundError` 和过期路径，更新至 10-08。  
  https://github.com/anthropics/skills/pull/1681

- **[PR #2039 / #2040] harness SDD suite**：新提交于 10-16，覆盖规范驱动、调度纪律、对抗审查、架构顾问，流程类 Skill 潜力大。  
  https://github.com/anthropics/skills/pull/2039  
  https://github.com/anthropics/skills/pull/2040

- **[PR #1245] Notion 规格落地 + 简历审计**：更新至 10-15，覆盖高需求工作流自动化场景。  
  https://github.com/anthropics/skills/pull/1245

- **[PR #2004 / #1997] slack-gif-creator 居中与 skill-creator YAML 解析修复**：近期更新，属于小而关键的可靠性修复。  
  https://github.com/anthropics/skills/pull/2004  
  https://github.com/anthropics/skills/pull/1997

- **[PR #1792] docx 超时与输出验证**：文档类 Skill 的高频静默失败问题，更新至 09-25。  
  https://github.com/anthropics/skills/pull/1792

## 4. Skills 生态洞察

**当前社区最集中的诉求不是“更多垂直 Skill”，而是让 Skills 成为可信赖的基础设施：官方命名与安全边界、评估触发可靠性、跨平台稳定、组织级共享与去重，以及文档/流程类 Skill 的静默失败治理。**

---

# Claude Code 社区动态日报
**日期：2026-10-17** ｜ 数据来源：github.com/anthropics/claude-code

---

## 1. 今日速览

今日发布 **v2.1.302**，新增 `CLAUDE_CODE_AUTO_MODE_MODEL` 环境变量与 `/config` 中的 Idle compaction 开关。社区侧讨论重心集中在 **平台行为不一致**（VS Code / Desktop / CLI 三方差异）、**会话状态与恢复可靠性**（后台会话、压缩后上下文丢失）与 **Windows 平台体验**三大方向；其中 Windows VM 存储位置可配置的需求以 53 个 👍 成为当前呼声最高的功能请求。过去 24 小时无新增 PR。

---

## 2. 版本发布

### v2.1.302
- 新增环境变量 `CLAUDE_CODE_AUTO_MODE_MODEL`：用于指定**客户端侧 auto mode 分类器**所使用的模型；注意它**不影响服务端 auto mode 的模型选择**。
- `/config` 新增 **Idle compaction** 行，可随时关闭/重新开启空闲压缩；空闲压缩后会显示相应提示。

> 解读：本次更新延续了近期的"细粒度可控性"路线——把自动模式与上下文压缩这两个黑盒行为下放为可配置项，让开发者能按成本/延迟偏好自行调优。

---

## 3. 社区热点 Issues（精选 10 条）

### ① 升级 Max 5x → Max 20x 支付持续失败，支持无响应
[#56281](https://github.com/anthropics/claude-code/issues/56281) ｜ OPEN ｜ 💬 30 ｜ 👍 9
**为何重要**：当前评论数最高的开放 Issue，且从 5 月挂到 10 月仍未解决，被标记 `invalid` 却保持 OPEN，反映**订阅/计费类问题缺乏闭环通道**。30 条评论说明这不是个例，而是影响付费转化的阻塞性问题。

### ② [功能] 允许配置 VM bundle（vhdx）存储位置
[#56089](https://github.com/anthropics/claude-code/issues/56089) ｜ OPEN ｜ 💬 12 ｜ 👍 53
**为何重要**：全站点赞最高。Claude Cowork 的 VM 镜像默认落在系统盘，对 Windows 用户的磁盘空间与合规要求构成硬伤。12 条讨论 + 53 赞的组合，说明这是**平台级配置缺口**而非个人偏好。

### ③ Desktop Code tab：next-step 框可能在回复写入前结束回合
[#102132](https://github.com/anthropics/claude-code/issues/102132) ｜ OPEN ｜ 💬 8 ｜ 👍 4
**为何重要**：新提交（10-14）却迅速聚集 8 条评论。问题出在 `wrap_up` 工具带 `ask` 时的回合终止时序，属于**交互层的竞态缺陷**，会直接导致用户看不到回复——影响面广且难以自查。

### ④ [功能] 跨会话发送上限（每人输入 10 条）不可配置，且误伤外部人类消息
[#94000](https://github.com/anthropics/claude-code/issues/94000) ｜ OPEN ｜ 💬 7 ｜ 👍 8
**为何重要**：`ccd_session_mgmt` 的 10 次发送上限在**多 agent 协作场景**下极易触发，且当前实现把"外部人类发起"的消息也计入配额，属于策略与实现脱节。对做 agent swarm / 多会话编排的开发者影响显著。

### ⑤ 后台化会话产生新 session id，`--resume` 出现停滞的重复副本
[#87984](https://github.com/anthropics/claude-code/issues/87984) ｜ OPEN ｜ has repro ｜ 💬 6
**为何重要**：macOS 上有稳定复现路径。左箭头后台化后，原 transcript 在几秒内停止写入，同时生成了新 session id 的副本，两个条目在恢复选择器中同名。这是**会话标识与内存键不一致**的典型案例（与已关闭的 #85595 同源）。

### ⑥ Worktree 隔离误拒"无 git"的 Bash 调用（3 天内 75 次拒绝）
[#95122](https://github.com/anthropics/claude-code/issues/95122) ｜ OPEN ｜ has repro ｜ 💬 5
**为何重要**：沙箱策略过严的实证。变量赋值、`$(…)` 参数、循环、heredoc 等**纯 shell 语法**被误判为危险操作，即使所有路径都在 worktree 内。对依赖隔离环境做自动化重构的用户是持续性的效率损耗。

### ⑦ VS Code 扩展忽略项目 CLAUDE.md 中的外部 @import（终端正常）
[#99032](https://github.com/anthropics/claude-code/issues/99032) ｜ OPEN ｜ 💬 4
**为何重要**：同一份 CLAUDE.md 在 CLI 与 VS Code 面板中加载结果不同——项目目录内的 import 生效、目录外的不生效。**多入口行为不一致**会让团队共享的规则文件在不同 IDE 里静默失效，排查成本极高。

### ⑧ 压缩续接会话丢失技能清单（skill_listing），模型对全部技能"路由失明"
[#82017](https://github.com/anthropics/claude-code/issues/82017) ｜ OPEN ｜ 💬 3 ｜ 👍 3
**为何重要**：自动压缩后 harness 不再重新注入技能清单，只剩增量公告。这意味着**长会话在压缩点之后会逐渐丧失技能调用能力**——与今日 v2.1.302 的 Idle compaction 配置形成直接呼应，值得重点跟踪。

### ⑨ Bash `grep` 影子函数静默丢弃子目录文件
[#102875](https://github.com/anthropics/claude-code/issues/102875) ｜ OPEN ｜ has repro ｜ 💬 2
**为何重要**：Bash 工具快照中的 `grep` 函数以 `--ignore-files -I` 运行内嵌 ugrep。当根目录 `.gitignore` 以 `*` 开头时，**连 `git check-ignore` 确认未被忽略的文件也会被跳过**。这是搜索结果的静默缺失，比报错更危险。

### ⑩ [功能] 固定且可编辑的计划/检查清单，工作期间常驻可见
[#101253](https://github.com/anthropics/claude-code/issues/101253) ｜ OPEN ｜ 💬 1
**为何重要**：plan mode 与 todo list 都会随输出滚走，用户在多步任务中缺失"当前进度锚点"。这是**TUI 信息架构层面的体验需求**，与 #94556（任务组件可见时输入框溢出屏幕底部）互为镜像。

> 另值得留意（新提交，尚未形成讨论）：
> - [#102884](https://github.com/anthropics/claude-code/issues/102884) Opus 5.5 安全防护阻止按用户要求读取 Basic Memory 笔记（同一会话内已发生 3 次）
> - [#102874](https://github.com/anthropics/claude-code/issues/102874) Routines API 触发 Project routine 返回 403 "this project is paused"，但项目实际处于活跃状态
> - [#98872](https://github.com/anthropics/claude-code/issues/98872) `claude --bg` 继承的是 daemon 首次启动终端的环境，而非调用方 shell

---

## 4. 重要 PR 进展

**过去 24 小时内无新增或更新的 Pull Request（0 条）。**

社区侧的推进完全依赖 Issue 讨论，这也在一定程度上解释了为何多个带 `has repro` 的缺陷（#87984、#95122、#102875、#91140）长期停留在 OPEN 状态——缺少外部贡献者提 PR 的通道或激励。

---

## 5. 功能需求趋势

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **平台一致性 / 多入口对齐** | #99032（VS Code vs CLI 的 @import）、#56089（Windows VM 存储）、#102132（Desktop Code tab） | 🔥🔥🔥 |
| **会话生命周期与恢复** | #87984（后台化新 session id）、#98872（`--bg` 环境继承）、#82017（压缩丢技能清单） | 🔥🔥🔥 |
| **细粒度可配置化** | #94000（跨会话发送上限）、#56089（存储路径）、v2.1.302 的 auto mode / idle compaction 开关 | 🔥🔥 |
| **Agent 协作可靠性** | #94000（跨会话消息）、#91140（停泊子代理无第二轮）、#86365（子代理通知丢失，已 stale 关闭） | 🔥🔥 |
| **沙箱与隔离策略精度** | #95122（worktree 误拒无 git 命令） | 🔥🔥 |
| **TUI / 交互信息架构** | #101253（常驻计划面板）、#94556（输入框溢出）、#89118（/stats 热力图月份错位） | 🔥 |
| **模型安全防护与行为可控** | #102884（Opus 5.5 拦截用户主动请求）、#89119（非威胁场景升级到 Opus）、#89114（未授权高成本模型调用） | 🔥 |
| **国际化 / 非 ASCII 支持** | #84966（韩文路径 Glob 失效）、#89117（Hangul 弹窗乱码）、#88439（日文输出异常） | 🔥 |

**趋势判断**：需求重心正从"能不能用"转向"**多个入口会不会给出同一个答案**"。VS Code、Desktop、CLI、WSL 四条路径的行为分歧（规则加载、路径解析、环境继承、剪贴板）构成了本周最密集的问题簇。

---

## 6. 开发者关注点

**1. 静默失败远比显式报错更伤信任**
本周三个最典型的案例都指向同一模式：不报错，但结果错。
- `grep` 影子函数跳过未被 gitignore 的文件（#102875）
- 用户级规则带 `paths:` frontmatter 时**静默失效**，既不 session_start 也不 path_glob_match（#87217，已 stale 关闭）
- VS Code 扩展静默丢失外部 @import（#99032）

**2. 上下文压缩是可靠性的薄弱环节**
#82017 显示压缩后技能清单不会重新注入，#87217 显示规则可能从未加载。当 v2.1.302 正在把 idle compaction 变成用户可调开关时，**压缩后的状态重建语义**需要官方给出明确说明。

**3. stale bot 关闭 ≠ 问题修复**
本轮更新的 50 条 Issue 中，大量在 2026-10-16 被 `stale` 批量关闭，包括：
- [#89113](https://github.com/anthropics/claude-code/issues/89113) Windows 桌面 app 在 `%APPDATA%`/`%LOCALAPPDATA%` 根目录的新建条目静默落入 MSIX 容器（`data-loss` 标签）
- [#89097](https://github.com/anthropics/claude-code/issues/89097) WSL2 下 `/stats` Ctrl+S 复制固定失败（平台字符串为 `wsl`，分支只匹配 `linux`）
- [#86365](https://github.com/anthropics/claude-code/issues/86365) 后台子代理任务通知在父 agent 回合中被丢弃，导致 fan-out 技能永久静默停滞
- [##94556](https://github.com/anthropics/claude-code/issues/94556) 则被维护者复现后仍遭 stale 关闭，用户被迫重新提交

对依赖这些能力的生产用户来说，**"被关闭"与"被修复"之间的差距**是当前最需要透明化的部分。

**4. 计费与支持的透明度**
#56281 挂起 5 个多月、30 条评论无实质回应；#89106、#89114 涉及礼品卡折算与未授权模型消耗。付费用户的**申诉闭环**仍是缺口。

**5. Windows 平台需要一等公民待遇**
VM 存储位置（#56089，53 👍）、MSIX 容器写入（#89113）、非 ASCII 路径 Glob（#84966）、Desktop Code tab 回合时序（#102132）——Windows 相关 Issue 在本次样本中占比最高，且多数带有平台专属标签。

---

*本日报由 AI 开发工具技术分析视角生成，数据截至 2026-10-17。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-10-17）

---

## 1. 今日速览

今日 Codex 仓库发布两个 `rust-v0.164.0-alpha` 预发布版本，主干继续快速迭代。社区侧 Windows 桌面端问题集中爆发：本地项目消失、Git 进程风暴导致系统 OOM、BitLocker 环境沙箱崩溃等严重缺陷占据高评论榜；与此同时，MCP 生态相关 PR 密集落地（并行工具调用、工具列表动态刷新、OAuth 作用域最小化），显示官方正在加强 Codex 作为 Agent 平台的底层能力。

---

## 2. 版本发布

- **rust-v0.164.0-alpha.2** — 0.164.0-alpha.2 预发布
  https://github.com/openai/codex/releases
- **rust-v0.164.0-alpha.1** — 0.164.0-alpha.1 预发布
  https://github.com/openai/codex/releases

两条 Release 均无详细变更说明，属于典型的每日 alpha 迭代。结合配套 PR（#54716、#54724、#54737）来看，官方正在调整预发布流水线：预发布资产上传完成前保持 Draft 状态、保留 `prereleased` 事件、并为语音构建启用 BuildBuddy，说明发布工程的可靠性与可追溯性正在被系统化处理。

---

## 3. 社区热点 Issues

### ① #42739 [OPEN] Windows 桌面更新后本地项目从侧边栏消失（65 评论）
更新后 Projects 区显示"No projects"，历史会话仍在 Recents 中、磁盘文件未丢失。评论量居首，说明是影响面较广的回归，用户对"项目"这一入口级功能的可靠性极其敏感。
https://github.com/openai/codex/issues/42739

### ② #49532 [CLOSED] 请把分支选择功能放回 Codex 应用（63 评论 / 99 👍）
全站点赞最高的一条，用户强烈要求恢复在启动任务时选择 Git 分支的能力。已关闭说明官方采纳，是本次数据中社区诉求最一致的功能回退案例。
https://github.com/openai/codex/issues/49532

### ③ #40060 [OPEN] Windows execpolicy 误报：Start-Process 与无关 URL 同脚本即触发（40 评论）
`codex-cli 0.146.0` 及最新 stable/main 均可复现：脚本中出现 `Start-Process` 搭配任意 URL 即被分类器拦截。这是沙箱策略分类器的典型误报，跨版本未修复，在 Pro 用户中长期存在。
https://github.com/openai/codex/issues/40060

### ④ #41982 [OPEN] [Windows][Remote] 从 Android 打开任务触发 git.exe 崩溃风暴与系统级 OOM（23 评论）
远程会话初始化时疯狂拉起 `git.exe`，直接耗尽系统内存。属于严重稳定性事故，与 #53645 形成同一类"进程风暴"问题簇，Windows + Remote 组合风险突出。
https://github.com/openai/codex/issues/41982

### ⑤ #50915 [OPEN] 存在锁定的 BitLocker 卷时 MXC 沙箱在启动前失败（14 评论 / 7 👍）
项目位于其他盘且未引用被锁卷，沙箱仍整体失败。反映沙箱初始化对环境探测过于激进，企业 Windows 环境（BitLocker 常见）兼容性告急。
https://github.com/openai/codex/issues/50915

### ⑥ #52503 [OPEN] [Dots][Web][GitHub] 选择"Always allow"后仍重复审批、审批卡非 pending、长任务上传结果丢失
Web 端 dot 编码工作流中 `create_blob` 反复要求授权，历史授权不生效。审批状态机与长任务结果回传的双重缺陷，直接影响云工作流可用性。
https://github.com/openai/codex/issues/52503

### ⑦ #53645 [OPEN] Windows app-server 生成数千个 Git 进程、耗尽系统 commit（2 评论，关联 #53063）
与 #41982 同源，桌面端 app-server 在约 16GB 内存机器上触发系统性资源枯竭。虽评论不多但危害等级高，属于必须优先处置的性能缺陷。
https://github.com/openai/codex/issues/53645

### ⑧ #54718 [OPEN] [Windows] 10 月 16 日 UTC 周额度骤降至 0%，请求紧急排查配额核算（2 评论）
用户报告额度在约 8 秒内从 ~58% 跌至 0%，直接影响付费用户工作连续性。计费/配额透明度问题在 Pro 用户中反复出现（参见 #45566），是信任度敏感区。
https://github.com/openai/codex/issues/54718

### ⑨ #54662 [OPEN] Codex Desktop 在三款模型、七个会话中持续忽略 AGENTS.md 规则
跨模型、跨会话一致失效，指向指令遵循与项目级规则注入链路的系统性问题。对依赖 AGENTS.md 约束代码风格的团队影响显著。
https://github.com/openai/codex/issues/54662

### ⑩ #54738 [OPEN] [0.163.0][WSL2] 空闲守护进程锁阻塞 `--no-daemon` 恢复，报错误导且无 "Switch here"
CLI 自身后台服务持有锁，却提示"在另一个应用中关闭"，缺少所有权识别与安全切换入口。属于开发者体验中的"死胡同"式故障，恢复路径设计需要重做。
https://github.com/openai/codex/issues/54738

> 其他值得关注的：**#50884**（exec_command 被"blocked by policy"拦截且无可执行解释）、**#28281**（桌面端忽略自定义 `default_permissions` 配置）、**#54376**（内置浏览器无法连接）、**#54728**（macOS 打开特定会话反复崩溃渲染器）。

---

## 4. 重要 PR 进展

### ① #30866 [OPEN] fix(app-server): resume 时协调已加载的线程历史
在 `thread/resume` 时对已加载的空闲线程与持久化 rollout 做对账，并在运行中线程上串行化 resume/rollback/历史注入，保留 live overlay。这是 app-server 会话一致性长期修复项。
https://github.com/openai/codex/pull/30866

### ② #31591 [OPEN] 为 Codex Apps 启用并行工具调用
新增默认关闭的 `codex_apps_parallel_tool_calls` 特性，仅对 host 拥有的 `codex_apps` MCP server 生效，第三方 MCP 保持原行为。为后续高并发 Agent 工作流铺路。
https://github.com/openai/codex/pull/31591

### ③ #31657 [OPEN] 重试 Codex Apps 文件上传的瞬时失败
当前一次 PUT 传输失败即作废整个短时效 presigned URL，导致 MCP 工具调用整体失败。该 PR 引入重试并细化错误分类（连接 / TLS / 请求体 / 超时）。
https://github.com/openai/codex/pull/31657

### ④ #54674 [CLOSED] 新增跨环境复制文件的可选工具
引入 `codex-multi-env-copy-file` 扩展，暴露 `multi_env_copy_file`，可在不同选定环境间复制文件而不将内容载入模型上下文，并返回字节级信息。多环境协作的关键拼图。
https://github.com/openai/codex/pull/54674

### ⑤ #54654 [CLOSED] 允许动态工具调用并行执行
`DynamicToolHandler` 支持并行，避免一个待响应的动态调用阻塞其他调用到达客户端，提升 code mode 的程序化吞吐。
https://github.com/openai/codex/pull/54654

### ⑥ #54656 [CLOSED] 单轮内响应 MCP 工具列表变化
新增默认关闭的 `mcp_tool_list_changed` 特性，在收到工具列表通知后刷新目录，使同一轮内即可发现并调用新出现的工具。
https://github.com/openai/codex/pull/54656

### ⑦ #54664 [CLOSED] 区分可重试的线程存储错误与未知写入结果
新增 `ThreadStoreError::Retryable` 与 `OutcomeUnknown` 两类语义，把恢复责任明确交还给操作发起方，减少"重复写入/丢失写入"的模糊状态。
https://github.com/openai/codex/pull/54664

### ⑧ #54653 [CLOSED] MCP OAuth 发现阶段优先采用资源特定作用域
避免直接使用授权服务器元数据中与 MCP 资源无关的 scope（可能导致申请过宽权限），更新 `rmcp` 并改用其初始 scope 选择逻辑。安全边界收敛。
https://github.com/openai/codex/pull/54653

### ⑨ #54708 [CLOSED] Windows 卸载时尊重 home 目录删除偏好
读取 `config.toml` 中的 `desktop.uninstall_codex_home`，普通安装默认保留 home 目录，避免卸载过程递归删除用户数据。
https://github.com/openai/codex/pull/54708

### ⑩ #54686 [CLOSED] 在 server status 中保留 MCP 工具清单元数据
此前工具发现会丢弃响应级 `_meta`，导致状态客户端无法检查工具目录元数据；现保留首页 `_meta` 并贯穿目录刷新。为可观测性补链。
https://github.com/openai/codex/pull/54686

> 发布工程侧同样值得留意：**#54716 / #54724**（预发布保持 Draft 直到资产上传完成、修正 `prereleased` 事件语义）、**#54739**（删除临时目录前释放 arg0 锁文件，避免 NFS 残留 `.nfs*`）、**#54710**（把 V8 的 ICU Bazel 规则内联进工作区）。

---

## 5. 功能需求趋势

**1. Windows 桌面端稳定性成为第一优先级。**
本次 30 条热点 Issue 中，带 `windows-os` 标签的接近一半，覆盖项目列表消失、沙箱初始化失败、进程风暴、附件预览失效、配额异常等。Windows 端与 macOS/Linux 的体验差距正在扩大。

**2. 沙箱与权限模型需要"可解释性"。**
`execpolicy` 误报（#40060）、`exec_command` 被策略阻止却无原因（#50884）、`default_permissions` 被忽略（#28281）、`sandbox_approval=false` 反向阻塞写操作（#54274）、Full Access 实际仍是 workspace-write（#54691）——共同指向：策略判定结果缺乏可诊断的反馈回路。

**3. MCP / Agent 平台能力加速铺设。**
并行工具调用、工具列表动态刷新、OAuth 作用域最小化、工具清单元数据保留、跨环境文件复制，均围绕"让 Codex 成为可编排的 Agent 宿主"展开，但多数仍以默认关闭的 feature flag 形式存在。

**4. 云/远程执行（Dots、Remote、Cloud Browser）的可靠性待补。**
审批循环（#52503）、预览限制误报（#54306）、云历史丢失（#52129）、Environment Offline（#54727）显示云路径的状态同步与配额语义尚不稳定。

**5. 会话与历史管理是隐性高频诉求。**
项目从侧边栏消失、云会话无法加载、打开特定会话崩溃、resume 后历史不一致——用户对"会话是我的一切资产"这一心智模型非常强烈。

---

## 6. 开发者关注点

- **误报式拦截比直接报错更令人困扰。** 开发者可接受"被策略拒绝"，但无法接受"没有原因、没有豁免路径、没有可切换入口"（#40060、#50884、#54738）。
- **配置不落地侵蚀信任。** 显式配置的权限 profile、卸载偏好、分支选择被忽略或撤销，让用户对"我改了设置是否真的生效"产生怀疑（#28281、#49532、#54708）。
- **资源耗尽类缺陷破坏开发机可用性。** git.exe 崩溃风暴与 app-server 进程爆炸会拖垮整台工作站，属于阻断级问题（#41982、#53645）。
- **配额与计费需要实时、可审计。** 周额度瞬时归零、5.3 权限不可用等反馈缺少明确核算说明（#54718、#45566）。
- **指令遵循一致性受关注。** AGENTS.md 在多个模型与多个会话中失效，直接影响团队级规范落地（#54662）。
- **CLI 在 WSL2/无人值守场景下的恢复路径缺失。** 守护进程自持锁却引导用户"去别的应用关闭"，是自动化流程中的硬阻塞（#54738）。

---

*数据来源：github.com/openai/codex ｜ 报告日期：2026-10-17*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-10-17）

## 一、今日速览

今天社区的核心矛盾仍集中在 **Agent/子代理的可靠性与可观测性**：通用代理挂起（#21409，8 👍，为今日最高赞）、子代理达到 MAX_TURNS 却误报成功（#22323）等长期问题持续发酵。与此同时，一个创建于 2025 年 11 月、涉及 Gemini 3.0 的 P0 级 400 badRequest 问题（#13292）在历经 15 条讨论后正式关闭，是本周期最显著的进展。PR 侧则迎来一批核心稳定性与安全修复，涵盖信号转发、SSE 流末尾事件丢失、沙箱启发式误判、命令替换守卫绕过等。

---

## 二、版本发布

**v0.66.0-nightly.20261016.gdebf42324**（nightly 通道）
🔗 https://github.com/google-gemini/gemini-cli/releases

- 版本号提升至 `0.66.0-nightly`，由 `gemini-cli-robot` 自动发布（#29740）。
- 引入 **v0.64.0 的 Changelog**（#29741），便于追踪稳定版变更轨迹。
- 包含一项 UI 同步相关修复（`fix(ui): implement synchroniz...`，发布说明被截断，细节需查看 nightly 完整 diff）。
- 提示：这是 nightly 构建，不建议生产环境直接采用，正式用户可关注后续 `v0.64.x` 稳定线。

---

## 三、社区热点 Issues

### 1. #13292 [CLOSED] [p0] Gemini 3.0 响应中途 400 badRequest —— 本周最大进展
15 评论 | 3 👍 | 历时近 11 个月后关闭
🔗 https://github.com/google-gemini/gemini-cli/issues/13292
报错为 `Please ensure that the number of function response parts is ...`，发生在模型处理崩溃报告、阅读代码的过程中。作为 P0 + Gemini 3.0 模型相关的长尾阻塞问题，其关闭对使用函数调用密集场景的用户是明确利好，建议关注关闭对应的修复提交。

### 2. #21409 [OPEN] [p1] Generalist agent 无限挂起（今日最高赞）
8 评论 | 8 👍
🔗 https://github.com/google-gemini/gemini-cli/issues/21409
只要 CLI 委派给 generalist agent，即使只是建目录这类简单操作也会永久卡住，用户最长等待 1 小时后手动取消；显式禁止使用子代理可绕过。**高赞说明这是普遍性阻塞**，直接破坏默认工作流，属于当前最需要优先解决的体验问题。

### 3. #22323 [OPEN] [p1] 子代理 MAX_TURNS 中断被上报为 GOAL 成功
13 评论 | 2 👍
🔗 https://github.com/google-gemini/gemini-cli/issues/22323
`codebase_investigator` 在未做任何分析、因轮次上限中断的情况下，仍返回 `status: "success"` 与 `Termination Reason: "GOAL"`。这会**掩盖失败并污染上层决策与评测数据**，对依赖子代理做代码调查的用户影响严重。

### 4. #21968 [OPEN] [p2] Gemini 几乎不会主动使用 skills 与子代理
7 评论
🔗 https://github.com/google-gemini/gemini-cli/issues/21968
用户配置了描述清晰的 `gradle`、`git` 等技能，但模型在高度相关的任务中也不会自发调用，必须显式指令。这反映出**能力供给与模型调度之间的断层**，直接影响自定义技能体系的投入产出比。

### 5. #19873 [OPEN] [p2] 通过零依赖 OS 沙箱释放模型的 bash 亲和性
9 评论 | 1 👍
🔗 https://github.com/google-gemini/gemini-cli/issues/19873
提案指出 Gemini 3 本质上是"原生 bash 用户"，倾向串联 `grep`/`cat`/`sed`/`awk`。该 issue 提出在**不牺牲安全与 UX 的前提下**用零依赖沙箱 + 执行后意图路由来承接这种能力，属于架构级方向，可能影响后续工具设计路线。

### 6. #22745 [OPEN] [p2] AST 感知的文件读取、搜索与代码库映射评估（EPIC）
7 评论 | 1 👍
🔗 https://github.com/google-gemini/gemini-cli/issues/22745
目标是减少错位读取、降低 token 噪声、提升单次工具调用的精度。与之配套的还有 #22746（AST 感知 CLI 映射代码库）与 #22747（用 AST grep 搜索与读文件），三者共同构成"代码理解效率"主题簇。

### 7. #22267 [OPEN] [p2] Browser Agent 忽略 settings.json 覆写（如 maxTurns）
4 评论
🔗 https://github.com/google-gemini/gemini-cli/issues/22267
`AgentRegistry` 初始化时能正确读取并合并配置，但浏览器代理实际运行时完全不生效。**配置写了不生效**是典型的信任杀手，用户难以靠参数控制代理行为边界。

### 8. #21983 [OPEN] [p1] 浏览器子代理在 Wayland 下失败
4 评论 | 1 👍
🔗 https://github.com/google-gemini/gemini-cli/issues/21983
输出为 `Termination Reason: GOAL` 但实际执行失败，属于 Linux 桌面环境兼容性问题，与 #22232（浏览器会话接管与锁恢复）共同暴露浏览器子代理的健壮性不足。

### 9. #24246 [OPEN] [p2] 工具数量超过 128 个时触发 400 错误
3 评论
🔗 https://github.com/google-gemini/gemini-cli/issues/24246
工具集膨胀后 CLI 直接报 400，期望代理能智能裁剪启用范围内的工具。对安装了大量 MCP/自定义工具的重度用户来说，这是一条硬性天花板。

### 10. #22672 [OPEN] [p2] Agent 应主动停止/劝阻破坏性行为
3 评论 | 1 👍
🔗 https://github.com/google-gemini/gemini-cli/issues/22672
在复杂 git 操作与分支管理中，模型偶尔会使用 `git reset` 或 `--force`，而更安全的替代方案其实存在。这关乎**默认安全姿态**，尤其在自动化/CI 场景中风险放大。

---

## 四、重要 PR 进展

### 1. #29744 [OPEN] fix(core): 让 `/ide enable` 在 IDE 服务器重启后可重连
🔗 https://github.com/google-gemini/gemini-cli/pull/29744
修复 VS Code "Developer: Reload Window" 或扩展更新后，集成终端里的 CLI 一直显示 `🔴 Disconnected`、且 `/ide enable` 反复失败、必须完全重启 VS Code 才能恢复的问题。

### 2. #29792 [OPEN] [p2] fix(ui): 视图刷新时保留终端 scrollback
🔗 https://github.com/google-gemini/gemini-cli/pull/29792
`refreshStatic` 原使用 `\x1b[3J`（Erase Saved Lines）清屏，导致标准缓冲模式下终端历史被清空。该 PR 改为不清除已保存行，保住用户回滚查看的能力。

### 3. #29790 [CLOSED] [p2] fix(cli): 将终止信号从 bootstrap 父进程转发给子进程
🔗 https://github.com/google-gemini/gemini-cli/pull/29790
在 `index.ts` 与 `relaunch.ts` 中转发 `SIGTERM`/`SIGHUP`/`SIGINT`/`SIGQUIT`/`SIGUSR1`/`SIGUSR2`，避免子进程忽略终止信号而残留。

### 4. #29757 [CLOSED] [p2] fix(cli): 验证实际生效的二进制，避免 PATH 遮蔽导致的"假更新成功"
🔗 https://github.com/google-gemini/gemini-cli/pull/29757
`handleAutoUpdate` 此前在活跃二进制被 `$PATH` 遮蔽或包管理器前缀不匹配时仍报告成功，用户实际还在跑旧版本。修复后更新结果更可信。

### 5. #29773 [CLOSED] [p2] fix(cli): keybindings.json 支持 `keys` 数组
🔗 https://github.com/google-gemini/gemini-cli/pull/29773
在原有单值 `"key"` 之外支持 `"keys"` 数组，解决一次解绑多个默认快捷键时 schema 校验失败的问题。

### 6. #29749 [OPEN] fix(core): 原子写入需尊重只读文件与硬链接
🔗 https://github.com/google-gemini/gemini-cli/pull/29749
自 #29499 引入原子写入后，`writeTextFile` 会静默覆盖 `0444` 只读文件并拆散硬链接（rename 只看目录权限）。这是数据安全类回归，建议尽快合入。

### 7. #29782 [OPEN] [p1] fix(core): 沙箱拒绝启发式中 exitCode 改用 null 检查
🔗 https://github.com/google-gemini/gemini-cli/pull/29782
`ExecutionResult.exitCode` 类型为 `number | null`，原判断 `!== undefined` 恒为真，导致所有 `null` 退出码都进入"沙箱拒绝"分支。典型的类型误用导致逻辑恒真。

### 8. #29688 [OPEN] fix(core): 修复经 shell wrapper 标志绕过的命令替换守卫
🔗 https://github.com/google-gemini/gemini-cli/pull/29688
`stripShellWrapper()` 在 POSIX shell wrapper 的 `-c` 前存在中间/链式标志时无法识别，形成**命令替换守卫绕过**。安全相关，值得关注后续 review 结论。

### 9. #29785 [OPEN] fix(core): 在流结束时派发最后一个 Code Assist SSE 事件
🔗 https://github.com/google-gemini/gemini-cli/pull/29785
连接在最后一行 `data:` 后直接关闭（截断或非规范代理）时，缓冲事件被静默丢弃，既无错误也无日志。修复后流末尾事件不再丢失。

### 10. #29783 [OPEN] [p1] fix(core): read_many_files 需按 include 模式精确匹配资产请求
🔗 https://github.com/google-gemini/gemini-cli/pull/29783
原先用原始 include 字符串与文件 stem/extension 做子串匹配，任何文本重叠都算命中，导致用户从未请求的图片/PDF/音频被内联进上下文。既浪费 token 又可能引入非预期内容。

> 补充：#29779（ripgrep 失败未标记为工具错误，被调度器当成成功）、#29786（新增 `human-ui` skill，规避通用 AI 设计套路）也值得一并关注。

---

## 五、功能需求趋势

**1. 子代理编排与可靠性（当前最密集的主题）**
挂起、误报成功、配置不生效、无法后台化、轨迹不可见——#21409、#22323、#22267、#22741（Ctrl+B 将本地子代理转后台）、#22598（`/chat share` 展示子代理轨迹）、#21763（`/bug` 报告缺少子代理上下文）构成完整问题链。社区诉求已从"能用"转向"可控、可观测、可复现"。

**2. AST 感知的代码理解与 token 节约**
#22745 / #22746 / #22747 三件套 + #19561（Tactful Extraction，当前每轮基线约 36.6k tokens，大文件读取曾单轮 +15k）显示官方正在系统性评估以 `ast-grep`、`tilth`、`glyph` 等工具替代"firehose 式"读取。

**3. 安全与沙箱**
#19873（零依赖 OS 沙箱）、#22672（劝阻破坏性命令）、#29688 / #29782 / #29749（守卫绕过、exitCode 误判、只读文件保护）、#18397（工作区级策略而非全局策略）共同指向"默认安全 + 细粒度授权"。

**4. 工具规模与上下文管理**
#24246 暴露 >128 工具即 400 的硬限制；#18836 提议以持久化文件任务跟踪取代仅存于上下文的 `WriteToDo`，以对抗 context rot；#21000 则探索用原生文件工具维护任务追踪。

**5. IDE 与终端 UX 打磨**
#29744（IDE 重连）、#29792（scrollback）、#21924（终端 resize 高性能无闪烁，需迁移到 RenderStatic + 小批量更新历史）、#29705（时长跨单位取整）、#29773（多键绑定）。

**6. 浏览器子代理健壮性**
#22232（会话接管与锁恢复）、#21983（Wayland 失败）、#22267（settings 覆写失效）——三个独立问题说明该模块在生产级稳定性上仍有明显缺口。

**7. 模型能力自省**
#21432 提出让 CLI 准确回答自身 CLI 标志、热键与自执行方式，属于"代理作为自己专家向导"的能力补全。

---

## 六、开发者关注点

1. **"卡死"比"报错"更令人沮丧**：#21409 能挂起一小时且无反馈，用户只能靠"禁止使用子代理"这种非正式 workaround 自救。缺乏超时与可中断机制是核心痛点。
2. **失败被伪装成成功**：#22323 的 `status: "success"` + `Termination Reason: "GOAL"` 会误导人工判断与自动化评测，属于可信度层面的系统性问题。
3. **配置系统的信任赤字**：`settings.json` 被忽略（#22267）、`~/.gemini/agents/` 下的 symlink 不被识别（#20079）、`keybindings.json` 数组校验失败（#29773）——多处"写了不生效"。
4. **Token 成本仍是高频诉求**：基线 36.6k/轮、大文件读取 +15k/轮，推动 AST 感知工具、Tactful Extraction、精确 include 匹配（#29783）等一系列优化。
5. **环境兼容性长尾**：Wayland 下浏览器子代理失败、终端 resize 闪烁、PATH 遮蔽导致更新假成功，均属于"特定环境下才炸"的问题，排查成本高。
6. **破坏性操作的默认防线不足**：`git reset --force` 类命令在具备 shell 执行权的代理中风险偏高，社区期待更主动的劝阻与工作区级策略。
7. **子代理可观测性缺失**：轨迹虽已记录却难以查阅（#22598），bug 报告不含子代理内部上下文（#21763），使问题复现与调试链路不完整。

---

*数据来源：github.com/google-gemini/gemini-cli，统计窗口为 2026-10-16 至 2026-10-17。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报（2026-10-17）

## 1. 今日速览

Reasonix Studio v2.42.0 正式发布，带来会话概览、技能源文件夹更新、按模型配置价格、子代理乐观写入范围与分支独立工作区副本等能力，并集中修复停止卡住、后台任务状态、同仓库项目互锁等稳定性问题。与此同时，围绕 Issue #13478 提出的“禁止无尽点击”所有者规则，维护者连续提交/合并了计划审批自动化、沙箱出站放行、审批记忆选项、`await_user` 超时续跑等一批 PR。社区反馈则集中在会话/项目加载慢、多会话并发卡死、中文本地化不完整以及多模态图片支持缺失上。

## 2. 版本发布

### v2.42.0 / studio-v2.42.0

- **CLI**：`v2.42.0` 归档基于 Studio 版本 `studio-v2.42.0` 构建。
- **Studio 新增**
  - 会话概览
  - 从源文件夹更新技能
  - 更新提醒
  - 按模型填写价格
  - 子代理乐观写入范围
  - 从分支创建独立工作区副本
- **Studio 修复**
  - 停止卡住
  - 后台任务状态
  - 同仓库项目互相等待写入
  - 压缩恢复
  - 一批界面问题

链接：https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.42.0

### 其他新增能力

- 「我的反馈」新增「账号关联」：登录后可手动关联本机与账号，随时解除；默认关闭，不改变额度，网页账号页后续据此显示反馈等级。关联 #13141。
- 会话右键菜单新增“从最近回复分叉”：会话执行中也可从最近一个已完成回复分叉，旧回复下的分叉按钮在执行中同样可用。关联 #13177。
- 侧边栏会话右键菜单加入“自动命名”，一步生成并保存标题，无需先打开重命名。关联 #13。

## 3. 社区热点 Issues

1. **#13345 加载项目和会话太慢了**（OPEN，评论 5）
   - v2.42.0 Studio 用户反馈，属于新版本发布后的首批性能问题。加载慢直接影响日常使用，社区已有 5 条讨论，值得优先排查。
   - https://github.com/esengine/DeepSeek-Reasonix/issues/13345

2. **#9766 v1.34.0 / v1.36.0 会话轮数一多就出现 turn 截断**（OPEN，评论 5，👍 1）
   - 老版本用户在 21–30 轮区间高频触发 turn 截断，用户自行定位到“长时间无 tool call 输出导致宿主判定无动作”。涉及 Agent 宿主判活机制，对长对话和 v1 用户影响大。
   - https://github.com/esengine/DeepSeek-Reasonix/issues/9766

3. **#13467 `await_user` 工具没有真正阻塞任务**（OPEN，评论 4）
   - 用户实际使用时任务继续运行，而非交回控制权，工具语义与文档不一致。这是对 Agent 控制流可信度的直接质疑，讨论热度较高。
   - https://github.com/esengine/DeepSeek-Reasonix/issues/13467

4. **#13478 “每次运行都要点击的关卡”清单与放行机制**（OPEN，评论 1）
   - 所有者规则：任何需要用户反复点击的环节，都必须提供“用户级设置直接放行”或“始终允许/不再询问”。该 Issue 是今日大量自动化审批 PR 的源头，方向性极强。
   - https://github.com/esengine/DeepSeek-Reasonix/issues/13478

5. **#13491 多会话同时工作体验很差**（OPEN，评论 0）
   - 开 5 个标签页即卡死，工作中的会话无法停止，已停止的会话无法输入，提示内核无响应。Windows + v2.42.0 环境，属于并发与内核响应级问题。
   - https://github.com/esengine/DeepSeek-Reasonix/issues/13491

6. **#13471 会话需要能展示图片**（OPEN，评论 0）
   - 用户指出当前会话完全无法显示图片，而 Codex 等主流工具已支持多模态图片交互。这是能力缺口型需求，影响 Reasonix 在主流工作流中的竞争力。
   - https://github.com/esengine/DeepSeek-Reasonix/issues/13471

7. **#13493 `/goal`、`/memory` 等子菜单没有中文本地化**（OPEN，评论 0）
   - 用户要求选择中文后各界面与说明均应以中文包适配。该问题已被 PR #13505 直接修复，反馈到修复链路较短，体现本地化仍是高频诉求。
   - https://github.com/esengine/DeepSeek-Reasonix/issues/13493

8. **#13476 建议增加界面字体大小与代码字体大小设置**（OPEN，评论 0）
   - 用户不希望依赖整体缩放调整字体，并建议按功能/分组设计默认字体大小与样式。属于长期可访问性与阅读体验需求。
   - https://github.com/esengine/DeepSeek-Reasonix/issues/13476

9. **#12900 “已落地”和“每小时最多”显示反了**（OPEN，评论 2）
   - v2.38.0 Studio 反馈，指标展示语义颠倒。涉及计费/额度类信息，错误显示会直接影响用户信任，虽小但值得尽快修复。
   - https://github.com/esengine/DeepSeek-Reasonix/issues/12900

10. **#13475 Reasonix Studio 左上角 Logo 设计不佳**（OPEN，评论 0）
    - 用户建议参考 dsh 的 Logo 方案重新设计。与 #13472（下拉尖角号偏下、图标偏小）共同反映社区对 Studio 视觉细节的持续关注。
    - https://github.com/esengine/DeepSeek-Reasonix/issues/13475

## 4. 重要 PR 进展

1. **#13507 feat(studio): Settings 中的 Plan approval 开关**（OPEN，2026-10-17 新开）
   - 在 Studio 设置中增加“计划审批”开关，长任务用户无需编辑配置文件即可让已提交计划自动开始。这是 #13478 规则在 Studio 侧的落地。
   - https://github.com/esengine/DeepSeek-Reasonix/pull/13507

2. **#13506 feat(desktop): 统一的“记住选择”审批页脚**（OPEN）
   - 为审批卡片引入共享的“记住此选择”页脚组件，并注明每个选择保存在何处。是“无强制点击”审计的 UI 第一片。
   - https://github.com/esengine/DeepSeek-Reasonix/pull/13506

3. **#13504 feat(sandbox): 对 allowed_domains 之外主机的出站询问可关闭**（OPEN）
   - 新增用户级设置 `sandbox.egress_unlisted = "allow"`，未列入名单的主机直接放行，终结每个新主机都询问一次的问题。
   - https://github.com/esengine/DeepSeek-Reasonix/pull/13504

4. **#13502 feat(control): ask 超时未回复后继续用户交回的任务列表**（OPEN）
   - 当 turn 以 `await_user` 结束，若用户设置了 `ask_timeout_seconds`，宿主等待超时后自动继续任务，避免无人值守长任务被永久挂起。
   - https://github.com/esengine/DeepSeek-Reasonix/pull/13502

5. **#13505 fix(control): 本地化 slash 命令参数提示**（OPEN，Fixes #13493）
   - 修复 `/goal`、`/memory`、`/mcp`、`/skills`、`/plugins`、`/theme` 等命令参数补全描述硬编码英文的问题，共 41 处。
   - https://github.com/esengine/DeepSeek-Reasonix/pull/13505

6. **#13503 feat(mcp): 资源工具可读取服务器声明模板构建的地址**（OPEN）
   - `read_mcp_resource` 除服务器列出的资源外，现支持读取由 `resources/templates/list` 声明模板构建的地址，扩展 MCP 资源访问能力。
   - https://github.com/esengine/DeepSeek-Reasonix/pull/13503

7. **#13479 feat(plan): 用户配置可让已提交计划跳过审批点击**（CLOSED）
   - 引入 `[agent] plan_approval = "ask" | "auto"`，仅限用户文件，配套 `GET/POST /plan-approval` 接口。是“无强制点击”规则的第一片。
   - https://github.com/esengine/DeepSeek-Reasonix/pull/13479

8. **#13487 feat(sandbox): 出站卡片提供“始终允许”并写入 allowed_domains**（CLOSED）
   - 在 bash 访问 `allowed_domains` 外主机时，卡片新增“始终允许”，选择后将主机小写化写入用户自己的 `[sandbox] allowed_domains`。
   - https://github.com/esengine/DeepSeek-Reasonix/pull/13487

9. **#13485 feat(mcp): 新增只读 read_mcp_resource 工具，默认关闭且仅用户文件可开启**（CLOSED）
   - 通过 `[tools] mcp_resources = true` 启用，项目级 `reasonix.toml` 无法打开，且会被报告为忽略，安全边界清晰。
   - https://github.com/esengine/DeepSeek-Reasonix/pull/13485

10. **#13499 fix(web): 将待处理提示交给晚加入的客户端，并停止误报过期**（OPEN）
    - 修复托管 Web Studio 三个缺陷：待审批/询问未到达晚加入客户端、远程事件源水位问题、以及错误的 stale 报告。
    - https://github.com/esengine/DeepSeek-Reasonix/pull/13499

> 其他值得关注的合并/关闭项：#13457 移除会话时间线导轨；#13477 删除会话过滤器旁重复放大镜；#13495/#13500/#13498 持续调整卡片语法与执行组详情面板；#13482、#13490、#13436 修复测试稳定性。

## 5. 功能需求趋势

- **性能与并发稳定性**：会话/项目加载慢（#13345）、多会话标签卡死（#13491）成为 v2.42.0 发布后的首要负面反馈，性能优化和内核响应性预计是下一阶段重点。
- **无人值守与审批自动化**：以 #13478 为纲领，社区与维护者同时推进计划审批自动化、沙箱出站放行、审批记忆、`await_user` 超时续跑，目标是让长任务真正“跑得下去、不用一直点”。
- **国际化与本地化补全**：中文本地化不再只是界面文案，已深入到 slash 命令参数提示（#13493 / PR #13505）和内核写入的 wire 字段（PR #13484）。
- **多模态能力**：会话内图片展示缺失（#13471）被明确对标 Codex，说明用户希望 Reasonix 跟上主流多模态交互。
- **UI/UX 细节打磨**：字体大小设置（#13476）、Logo 重设计（#13475）、下拉控件图标与位置（#13472）、移除冗余 UI（#13457、#13477）等，显示 Studio 进入体验精细化阶段。
- **MCP 能力扩展**：资源模板读取（#13503）与只读资源工具（#13485）表明 MCP 生态集成仍在持续加深。
- **会话管理增强**：从最近回复分叉、自动命名、会话概览、账号关联等新增能力，反映社区对多会话工作流和可追溯性的需求上升。
- **Agent 控制流可靠性**：turn 截断（#9766）和 `await_user` 语义不阻塞（#13467）指向宿主判活、任务挂起/恢复机制仍需加强。

## 6. 开发者关注点

- **长任务被交互关卡打断**：频繁审批、出站询问、`await_user` 永久挂起，是当前自动化工作流的最大痛点；解决方案集中在用户级放行设置与超时续跑。
- **Windows 平台稳定性**：多会话卡死、内核无响应（#13491）出现在 Windows + v2.42.0，需关注平台特异性资源与进程管理。
- **性能回归敏感**：新版本发布后立即出现加载慢反馈（#13345），说明用户对 Studio 启动、项目与会话加载的响应速度容忍度很低。
- **本地化完整度**：中文用户期望“选了中文就全中文”，包括命令子菜单、参数提示、说明文本，而非仅主界面。
- **工具语义与文档一致性**：`await_user` 实际行为与介绍不符（#13467），会削弱开发者对 Agent 控制工具的信任；类似地，指标展示错误（#12900）也属于信任类问题。
- **旧版本迁移与长会话质量**：v1.34/v1.36 的 turn 截断（#9766）虽属旧线，但说明长会话场景下的判活策略仍被持续讨论。
- **多模态与主流对标**：用户直接以 Codex 为参照提出图片交互需求（#13471），多模态支持可能成为下一轮功能竞争点。
- **UI 细节即体验**：字体大小、Logo、图标尺寸、下拉控件位置等看似细小的问题被密集反馈，说明核心功能趋于稳定后，体验打磨成为留存关键。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-10-17

## 1. 今日速览

今日 OpenCode 连发 v1.19.2 / v1.19.3 两个 1.x 补丁版本，核心是**明确 1.x 与 2.x 的分流策略**（1.x 不再自动接收 2.x 更新），并优化模型推理变体配置。v2 侧则集中修复权限日志丢失、会话迁移搁浅等升级遗留问题，多个社区反馈已进入 PR 阶段。整体看，社区对 v2 的行为一致性（身份注入、限流提示、配置兼容）关注度显著上升。

---

## 2. 版本发布

**v1.19.3** — Core Improvements
- 配置模型 reasoning 选项以生成 reasoning variants，替代 catalog variants，同时保留用户已配置的 variant overrides。
- 链接：https://github.com/anomalyco/opencode/releases

**v1.19.2** — Core Bugfixes
- OpenCode 1 现在严格停留在 1.x 发布线：更新检查只使用 npm `opencode-ai` 的 latest 版本，1.x 安装**永远不会**收到 2.x 更新提示。
- 升级到 OpenCode 2 成为独立的显式选择，需通过 `/update` 中的 2.0 offer 触发。
- 链接：https://github.com/anomalyco/opencode/releases

---

## 3. 社区热点 Issues（10 条）

1. **[OPEN] #56212 模型切换后 agent 自我身份不刷新**（10 评论）
   切换对话模型后，注入的 `# Your Model` 身份未更新，agent 继续报告会话初始模型名，导致自我认知错误。评论数最高，反映多模型工作流下的上下文一致性问题。
   https://github.com/anomalyco/opencode/issues/56212

2. **[OPEN] #56247 v2 权限评估与询问不再写入日志**（3 评论，已复现）
   v2.0.31 不再向 `opencode.log` 写入 permission-evaluation / ask 事件，用户无法调试"为何被询问/拒绝"。已由 PR #56271 修复，属于 v2 可观测性回归。
   https://github.com/anomalyco/opencode/issues/56247

3. **[CLOSED] #55891 1.x→2.x 升级导致旧会话搁浅**（2 评论）
   v1→v2 会话迁移只运行一次并标记为 `completed`，此后写入旧表的数据会永久丢失。升级路径的数据安全问题是本次 2.x 推广的核心痛点。
   https://github.com/anomalyco/opencode/issues/55891

4. **[CLOSED] #55888 Windows 下 npm upgrade 跳过 postinstall**（4 评论）
   `opencode upgrade` 后 `bin/opencode.exe` 停留为 229 字节占位符，导致命令全部失败。Windows 安装体验的典型阻塞问题。
   https://github.com/anomalyco/opencode/issues/55888

5. **[OPEN] #56275 会话历史含粘贴图片时请求被 provider 拒绝**（0 评论）
   某些模型请求返回 `[unsupported_request] Message content supports text content only`，整个 turn 中止。涉及多模态历史与 provider 能力协商，影响面较广但尚未有回应。
   https://github.com/anomalyco/opencode/issues/56275

6. **[CLOSED] #55709 模型误将"provider 重启"理解为"操作系统重启"**（4 评论，已复现）
   v2.0.28 下模型表征异常，虽已关闭但暴露了系统提示与环境感知的可靠性问题。
   https://github.com/anomalyco/opencode/issues/55709

7. **[OPEN] #52894 显示免费额度的精确重置时间**（4 评论，1 👍）
   当前仅提示 "Free limit reached"，用户希望看到具体恢复时刻。与 #56266（限流倒计时）形成同一诉求簇。
   https://github.com/anomalyco/opencode/issues/52894

8. **[OPEN] #56261 agent 更倾向 developer instructions 而非 agents.md**（3 评论）
   用户反馈 v2 agent 忽略 `agents.md` 中"用特定语言回复"等指令，相比 v1 行为回归。涉及指令优先级设计。
   https://github.com/anomalyco/opencode/issues/56261

9. **[OPEN] #56263 Desktop 需允许可信自定义 URL 协议**（2 评论）
   自 #30613 安全修复后，桌面端静默屏蔽 `obsidian://` 等非 http(s)/mailto 协议。安全与可用性之间的权衡需求。
   https://github.com/anomalyco/opencode/issues/56263

10. **[OPEN] #56258 文档化的 plugin option tuples 被 normalization 拒绝**（1 评论，已复现）
    schema 声明支持 `[string, PluginOptions]`，但实际校验拒绝该形式，导致需要传参的插件无法使用。配置与类型声明不一致的 bug。
    https://github.com/anomalyco/opencode/issues/56258

---

## 4. 重要 PR 进展（10 条）

1. **#56271 fix(core): restore permission decision diagnostics**
   恢复 v2 中 Info 级权限评估、ask 与 reply 诊断日志，直接关闭 #56247。修复 v2 可观测性回归的关键补丁。
   https://github.com/anomalyco/opencode/pull/56271

2. **#56208 feat(core): accept instructions for manual compaction**
   手动压缩会话时支持传入 `instructions`，用户可引导摘要保留/丢弃哪些内容，提升长会话可控性。
   https://github.com/anomalyco/opencode/pull/56208

3. **#56264 feat(plugin): expose session list**
   插件可通过 `ctx.session.list(...)` 访问会话列表，支持与 `GET /api/session` 相同的过滤、limit、cursor 分页，扩展插件生态能力。
   https://github.com/anomalyco/opencode/pull/56264

4. **#56265 fix(server): wait for plugin activation before reading agents**
   `agent.list` / `agent.get` 在读取 registry 前等待 location 插件激活，避免返回过期数据（同类问题此前在 `skill.list` 已修）。
   https://github.com/anomalyco/opencode/pull/56265

5. **#56267 fix(core): publish catalog updates only when they change**
   修复 `Agent`/`Command`/`Skill` 等 catalog 服务在每次 State 通知时无条件发布 `*.updated` 事件的问题，减少事件风暴。
   https://github.com/anomalyco/opencode/pull/56267

6. **#53492 feat: voice input for the terminal and web clients**
   为终端与 Web 客户端新增语音输入功能，关联早期请求 #18226 / #29663，是社区期待已久的交互增强。
   https://github.com/anomalyco/opencode/pull/53492

7. **#56274 fix(core): use saved SAP AI Core credentials**
   将 model resolver 的 `apiKey` 作为 SAP service-key 回退，使已保存凭据能正确传递到 SAP hook（Closes #56126）。
   https://github.com/anomalyco/opencode/pull/56274

8. **#56257 fix(core): send step-limit instructions as user messages**
   将最大步数指令改为 user message 发送，兼容拒绝 assistant prefill 的 provider，修复 #56250。
   https://github.com/anomalyco/opencode/pull/56257

9. **#56259 fix(core): canonicalize location in activity tracking**
   统一 `LocationServiceMap` 的 canonical 键，修复持久化会话事件因 raw Location.Ref 导致的活动追踪不一致。
   https://github.com/anomalyco/opencode/pull/56259

10. **#55893 fix(cli): deliver large stdout writes past one pipe buffer**
    修复 `--completions fish` 约 68 KiB 输出被截断的问题（Closes #55525），保障大体积 stdout 的完整性。
    https://github.com/anomalyco/opencode/pull/55893

其他值得关注：**#56273**（切换会话标签后聚焦 composer）、**#56268**（TUI 粘贴对话框）、**#56017**（面板分隔条显示 resize 指针）、**#56252**（无项目时从标题栏创建会话草稿）。

---

## 5. 功能需求趋势

- **限流与额度可视性**：#52894（精确重置时间）、#56266（限流倒计时）集中体现用户希望免费额度状态更透明，v1 已有的提示在 v2 中被简化引发不满。
- **指令优先级与 agent 行为一致性**：#56261 反映 v2 对 `agents.md` 的遵循度下降，用户期望项目级指令享有更高优先级。
- **多模态输入兼容性**：#56275 显示会话历史含图片时部分 provider 拒收，多模态支持仍是薄弱环节。
- **桌面端集成能力**：#56263 提出自定义 URL 协议的信任白名单，反映 OpenCode 作为工作枢纽与外部工具（Obsidian 等）联通的诉求。
- **插件系统成熟度**：#56264（session list 暴露）、#56258（plugin options 校验 bug）显示插件生态正从"可用"向"规范一致"演进。
- **测试与工程基建**：#53982（引入 tui-test 做 e2e）、#56272（移除 flaky 测试）、#54174（MCP 超时迁移回归测试）表明社区主动推动质量保障建设。

---

## 6. 开发者关注点

- **v1→v2 升级路径是最大痛点**：会话迁移（#55891）、Windows 安装（#55888）、旧服务停止时序问题反复出现，升级安全性直接影响用户是否愿意迁移。
- **v2 可观测性回归明显**：权限日志丢失（#56247）、限流提示弱化（#52894/#56266）等问题显示 v2 在重构中牺牲了部分诊断能力，开发者调试成本上升。
- **跨平台细节仍是高频雷区**：Windows 的 `.exe` 占位符、Linux 下的 folder rename / `tabs.layout` 渲染（#56269）、macOS 后台服务环境继承（#49398）等平台特有 bug 持续消耗维护精力。
- **provider 兼容层脆弱**：OpenAI-compatible 模型不可用（#37531）、图片内容被拒（#56275）、SAP AI Core 凭据（#56274）等说明 provider 抽象层需要更稳健的能力协商。
- **1.x 维护线与 2.x 并行的策略已明确**：v1.19.2 正式确认 1.x 不会被自动推向 2.x，为仍依赖 1.x 的团队提供了缓冲期，但两边功能分化也将逐步加大。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报（2026-10-17）

**数据源**：[github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)  
**统计窗口**：过去 24 小时  
**说明**：本日报严格基于给定 GitHub 数据生成；过去 24 小时 Issues、PR 均为 0 条，因此相关章节无法列出 10 条具体条目，亦不进行虚构。

---

## 1. 今日速览

今日社区动态较少，仅发布 `dsh-v0.2.1-alpha.5`，无新增或更新的 Issue、PR。该版本主要修复插件/技能列表同步、终端会话重复查询与重试、PTC Mode 指引与多端模型身份说明，以及 Windows/Linux 右侧栏交互问题。整体属于稳定性与一致性维护型 alpha 发布。

链接：[Releases](https://github.com/deepseek-ai/deepseek-harness/releases)

---

## 2. 版本发布

### dsh-v0.2.1-alpha.5

[Release 链接](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- 修复在插件页启用或停用插件后，已打开会话的 `/` 菜单未更新技能列表的问题。@grllll  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- 减少新建与恢复多个终端时的重复查询，并避免失效终端在切换面板后反复重试。@LegGasai  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- 改善 PTC Mode 中缺失的部分指引，并统一 SDK、Web 和 headless 的模型身份说明。@koalazf99  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- 修复 Windows 和 Linux 下右侧栏收起时，在输入框按 Page（原文在此截断）相关交互问题。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

---

## 3. 社区热点 Issues

过去 24 小时内更新 Issues：**0 条**。  
因此无法挑选 10 个最值得关注的 Issue，也无法分析社区反应。

- 暂无 Issue 动态。  
  [GitHub Issues](https://github.com/deepseek-ai/deepseek-harness/issues)

---

## 4. 重要 PR 进展

过去 24 小时内更新 Pull Requests：**0 条**。  
因此无法挑选 10 个重要 PR。

- 暂无 PR 动态。  
  [GitHub Pull Requests](https://github.com/deepseek-ai/deepseek-harness/pulls)

---

## 5. 功能需求趋势

由于过去 24 小时 Issues/PR 为 0，以下趋势仅能从 `dsh-v0.2.1-alpha.5` release note 中做有限推断，置信度较低，不代表社区讨论热度。

- **插件/技能系统动态同步**：插件启停后，已打开会话的 `/` 菜单需实时反映技能列表。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- **终端会话性能与可靠性**：减少新建、恢复多个终端时的重复查询，并避免失效终端反复重试。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- **PTC Mode 与多端一致性**：改善 PTC Mode 指引，统一 SDK、Web、headless 的模型身份说明。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- **跨平台 UI 与输入交互**：Windows/Linux 下右侧栏收起、输入框 Page 键等细节修复。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

---

## 6. 开发者关注点

- **插件生命周期与 UI 状态一致性**：插件启停后，会话内技能菜单未刷新，属于高频交互一致性问题。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- **终端恢复与重试策略**：失效终端在切换面板后反复重试，影响性能和体验，需更稳健的会话管理。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- **PTC Mode 文档/指引完整性**：缺失指引被修复，说明开发者对模式使用说明和多端行为一致性有需求。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- **多端模型身份说明统一**：SDK、Web、headless 的身份说明不一致会增加集成与调试成本。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

- **跨平台键盘/布局细节**：Windows/Linux 右侧栏收起后的输入框 Page 键交互被提及，反映跨平台输入体验仍是关注点。  
  [Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.5)

---

**备注**：今日无 Issues/PR 数据，无法生成“10 个热点 Issue”和“10 个重要 PR”清单。建议后续结合 GitHub Issues 与 Pull Requests 的更新情况继续跟踪。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 · 2026-10-17

> 数据来源：github.com/NousResearch/hermes-agent

## 一、今日速览

过去 24 小时无新版本发布，社区焦点集中在 **统一 Gateway 运行时的合并后修复**：跟踪议题 #134889 已累积 128 条评论，配套修复 bundle（package 5 / package 7）在本周期内陆续落地或进入评审。与此同时，**cron 消息投递可靠性**成为最密集的 bug 集群（#99988、#127187、#140200、#140202、#127188），而 Desktop 侧则持续收到状态栏指标、时间格式、项目管理等 UX 细节反馈。

---

## 二、社区热点 Issues（精选 10 条）

**1. #134889 — Tracking: one gateway owns every local session（OPEN，128 评论）**
PR #106742（`feat/unified-gateway-runtime`）已于 10 月 14 日合入 main，该议题转为合并后修复的跟踪主线程，覆盖 CLI / Desktop / TUI / gateway 全部交互面，并挂有 session-state、message-delivery、Windows 兼容等多个风险标签。**这是当前社区讨论量最大、影响面最广的一条议题**，几乎决定了后续所有本地会话相关修复的优先级。
https://github.com/NousResearch/hermes-agent/issues/134889

**2. #139523 — Gateway fixes package 5: plugins 与只读一次的配置（CLOSED，1 评论）**
#134889 的第五批修复包，10 个 PR 已于 10 月 16 日全部合并（5 条车道 #139569/#139570/#139575/#139576/#139577 + 5 条跟进项）。标记为 done，说明 Gateway 统一化工作正在按批次收口，可作为判断主线稳定度的风向标。
https://github.com/NousResearch/hermes-agent/issues/139523

**3. #140041 — Gateway 重启后崩溃循环（stale host-ownership 记录 PID 复用，CLOSED，P1）**
systemd user 单元在重启后陷入 ~600 次崩溃循环（exit code 75），所有平台（Matrix/Telegram/Discord/Slack）均无法投递消息。根因是 incarnation 启动时间匹配过于宽松，导致复用 PID 被误判为自身宿主。**典型的"重启后不可用"类高严重度故障，已关闭**。
https://github.com/NousResearch/hermes-agent/issues/140041

**4. #107402 — `hermes update` 在延迟重启时留下永久 stale 警告（OPEN，P1，23 评论）**
当 `hermes update` 从 gateway 自身进程树内发起时，重启被正确延迟到飞行中的 work unit 结束，但更新器立即校验并写入 `state: stale`，导致运行以 `partial` 结束并永久残留 `fleet_restart` 警告。**更新流程的状态机与 gateway 延迟语义不一致**，是运维体验上的高频痛点。
https://github.com/NousResearch/hermes-agent/issues/107402

**5. #99988 — Cron 失败摘要误把非鉴权错误标为"provider authentication error"（OPEN，P1）**
`cron/scheduler.py::_summarize_cron_failure_for_delivery` 用正则扫描整段错误文本匹配 `authenticat|authoriz` 或裸 `401/403`，只要 payload 文本里出现相关字样就会误判。**误报会直接误导排障方向**，属于诊断准确性问题。
https://github.com/NousResearch/hermes-agent/issues/99988

**6. #127187 — Cron 可重试的 live rejection 仍会丢失，独立超时会在重放中重复（OPEN，P2）**
#126156 修好了 `send_path_degraded` 的 fall-through，但同一投递路径上仍有三个边界未覆盖（队列覆盖仅按字符串识别重连等）。该议题是 cron 投递链路的**后续补丁主线**，配套 PR #127188 已在评审中。
https://github.com/NousResearch/hermes-agent/issues/127187

**7. #59560 — `custom_providers.models` 列表被忽略，多模型无法在 Desktop 选择（CLOSED，P2）**
配置里按 schema 声明了多个 models，但 Hermes Desktop 只识别顶层单个 `model:`，模型选择器无法列出其余模型。**影响自定义 provider（combo/9router 等）用户的核心可用性**，现已关闭。
https://github.com/NousResearch/hermes-agent/issues/59560

**8. #140198 — lean tail 模式声明的 25,000 token 上限不生效（OPEN，P2）**
`compression.tail_mode: lean` 文档承诺"clamped 2.5% tail，10K–25K，不超过窗口 20%"，但实测最新 6 轮工具调用会原样保留、完全不受 token 约束。**上下文压缩与成本控制的可信度问题**，直接关系到长会话的实际开销。
https://github.com/NousResearch/hermes-agent/issues/140198

**9. #140196 — `browser_vault fill` 会附着到首个同源标签页而非调用方会话（OPEN，P3，security）**
在共享 CDP 浏览器（`browser.cdp_url`）场景下，`BrowserSupervisor.focus_page(origin, ...)` 只取该 origin 上第一个 `accept` 探测为真的页面目标。**多标签同源时会向错误会话注入凭据**，是一个典型的会话隔离 / 安全边界问题。
https://github.com/NousResearch/hermes-agent/issues/140196

**10. #140199 — Plugin API：为 slash 命令处理器暴露调用会话、支持插件创建可见会话（OPEN，P3）**
社区插件 `hermes-spawn-session` 作者提出需要两个公共接口：从 session A 启动可见的顶层 session B，并支持交接文件与回传。**这是插件生态开始触及"会话编排"层级的信号**，若被采纳将显著扩展插件能力边界。
https://github.com/NousResearch/hermes-agent/issues/140199

*其他值得留意：* #140201（Desktop 应遵循 24 小时制 / `display.timestamp_format`）、#140194（Desktop 连接 host gateway 时 context / cache-hit / tokens·s 三个指标恒显示 "—"）。

---

## 三、重要 PR 进展（精选 10 条）

**1. #140203 — v0.22.2 就地快进到 main**
纯元数据改动、不修改任何文件：把 v0.22.2（`d923a5eb487`）记录为 main 的祖先，使 git 安装用户可以从 v0.22.2 以 fast-forward 方式升级到 main。**修复了"从 release 分支发布导致无法快进"的发布流程坑**。
https://github.com/NousResearch/hermes-agent/pull/140203

**2. #93508 — `hermes webapp`：在浏览器中托管真实的 Desktop 渲染器（P1，needs-decision）**
不是 Web Dashboard，而是把 chat-first 的 Desktop 工作区跑在浏览器里，注入基于宿主实现的 `window.hermesDesktop`。带 auth、security-boundary、session-state 等多重风险标签，**是本周野心最大的功能型 PR，也是争议最大的一条**。
https://github.com/NousResearch/hermes-agent/pull/93508

**3. #140183 — Gateway：重新打开未加载的持久化会话、压缩子会话恢复、TUI switcher 关闭（package 7）**
逐行对应可复现缺陷并先写失败测试：RT-30（resume 未在 live registry 中的 Discord/Feishu/Weixin/Telegram 行）、LC-12（压缩子会话恢复）、TUI-25。**延续 #134889 的收口思路，工程质量较高**。
https://github.com/NousResearch/hermes-agent/pull/140183

**4. #140168 — 重构：核心不再维护逐平台硬编码表，改由各平台插件自声明**
每个内置平台插件自行声明 env bridge、连接检查、allowlist、cron env、prompt hint、展示默认值、发送目标语法、媒体路由、dashboard 卡片等。**这是平台适配层架构的重要解耦，直接降低新增平台的门槛**。
https://github.com/NousResearch/hermes-agent/pull/140168

**5. #140202 — fix(cron)：限流时重试 live-adapter 发送，而不是丢推送**
针对 WeChat/iLink 适配器的滑动窗口限流断路器，改为"熬过限流并重试"而非静默丢弃。
https://github.com/NousResearch/hermes-agent/pull/140202

**6. #127188 — fix(cron)：为 standalone fallback 加门控（对应 #127187）**
三处改动：排队任何可重试的 live rejection、绝不排队已超时的发送、跳过无凭据的 worker；对持有凭据的 worker 保持 standalone-first 顺序不变。**配套上一条构成 cron 投递可靠性的完整补丁组**。
https://github.com/NousResearch/hermes-agent/pull/127188

**7. #140200 — fix(cron)：被抑制的 monitor tick 对作业失败状态应保持中性**
monitor 作业的 `no_change` tick 会抑制 agent 运行，`_apply_monitor_gate` 将其报为 `success=True` 本身正确（无 LLM 轮次、无投递），但记账尾部无法把这种成功与"作业真的成功"区分开。
https://github.com/NousResearch/hermes-agent/pull/140200

**8. #11458 / #140197 — Nextcloud Talk 平台适配器与插件目录条目**
#11458 是完整的内置适配器（User API + app password、长轮询接收、OCS 回复）；#140197 则是独立的第三方插件目录条目（`chefboyrdave21/hermes-nextcloud-talk`，含两种模式）。**内置与插件两条路线并行，恰好呼应 #140168 的解耦方向**。
https://github.com/NousResearch/hermes-agent/pull/11458 ｜ https://github.com/NousResearch/hermes-agent/pull/140197

**9. #139553 — fix(tui)：让 canonical switcher 的关闭走 owner 自己的动词**
在 canonical gateway 上，活跃会话切换器的 close 动作永远无法成功，因为 `closeSession()` 在那里刻意不发任何东西（legacy `session.close` 不在 canonical 契约内，契约只注册 `session.detach`/`session.*`）。
https://github.com/NousResearch/hermes-agent/pull/139553

**10. #138038 / #138037 — Desktop UX：Capabilities 改为浮层、会话菜单内新建项目**
#138038 让 Capabilities 像 Settings 一样以 overlay 打开，不再替换用户正在使用的会话标签；#138037 在"移动到项目"子菜单加入"新建项目"，避免取消后重来。**两条都是小而实的桌面端体验改进**。
https://github.com/NousResearch/hermes-agent/pull/138038 ｜ https://github.com/NousResearch/hermes-agent/pull/138037

*其他已合并/推进：* #139674（本地会话自身轮次不再为整段 `execute_code` 弹审批，已关闭）、#139691（gateway 中为每个本地命令触发 `pre_command`，已关闭）、#122537（清理全 workspace 的 npm audit 漏洞，已关闭）、#109867（delegation context 不可评估时写围栏 fail-closed）、#132326（允许内置技能被 pin/unpin）。

---

## 四、功能需求趋势

从本周期全部 Issues 与 PR 的标签分布看，社区关注方向集中在以下几条线：

1. **Gateway 统一会话所有权（绝对主线）**
   `comp/gateway`、`area/sessions`、`area/profiles`、`comp/tui-gateway` 几乎出现在每条重要条目上。核心命题是"谁能拥有本地会话、session.close vs session.detach 的契约边界、Desktop/TUI/CLI 如何共享同一套权威"。这是当前版本最大的架构变更期。

2. **消息投递可靠性（尤其 cron 链路）**
   `sweeper:risk-message-delivery` 标签高频出现：限流重试、可重试 rejection 排队、超时不得重放、无凭据 worker 跳过、monitor tick 状态语义。社区对"静默丢推送"零容忍。

3. **Desktop 与 CLI/TUI 的能力对齐**
   24 小时制显示、状态栏 context/cache-hit/tokens·s 指标、Capabilities 打开方式、项目创建入口 —— 都是"CLI/TUI 已有、Desktop 缺失"的落差型需求。`apps/desktop` 与 `comp/tui` 正在被持续拉平。

4. **插件 API 的公共接口扩展**
   #140199 要求暴露 slash 命令的调用会话、允许插件创建可见会话；配合 #140168 平台插件自声明、#140197 插件目录条目，社区正在推动插件从"工具扩展"走向"会话与平台扩展"。

5. **平台适配器广度**
   Nextcloud Talk（内置 #11458 + 插件 #140197）、WeChat/iLink 限流（#140202）、Telegram cron 投递（#127187）——平台层仍是活跃的扩展面。

6. **压缩与上下文预算的正确性**
   #140198 指出 `compression.tail_mode: lean` 的 token 上限形同虚设，`area/compression` 与 `comp/tui` 的压缩子会话恢复问题并存，说明上下文管理已从"能不能压"进入"压得准不准、省不省钱"的阶段。

7. **安全与审批边界**
   #140196（browser_vault 跨标签注入）、#139674（本地会话整段脚本审批）、plugin/gateway 的 `risk-security-boundary` 标签，共同指向"会话级隔离"这一主题。

---

## 五、开发者关注点

- **重启与恢复的语义正确性**：从 #140041（PID 复用致崩溃循环）到 #107402（延迟重启被误判 stale），开发者对"重启后系统是否真的可用、状态是否真的准确"极为敏感。systemd 场景下的宿主所有权判定需要更严格的标识（不能只靠 PID + 宽松时间匹配）。

- **延迟操作与立即校验的矛盾**：#107402 的根因是更新器在 gateway 延迟重启的同一时刻就做终态校验。这类"异步流程 + 同步断言"的组合是反复出现的问题模式。

- **错误分类不能靠文本子串**：#99988 的正则误判说明诊断信息需要结构化错误码，而非对整段 payload 做字符串匹配 —— 否则一次误报会把排障带偏。

- **声明与实现必须一致**：#140198 的 lean tail 上限"文档写了但代码不绑定"是典型的配置契约违背。开发者明确引用文档行号与 `upstream/main` commit 来举证，反馈质量很高。

- **命令与文档的准确性**：#108831（kanban 提示指向不存在的 `events` 子命令）、#101086（antigravity-cli print 模式输出参数写错）显示社区会主动核对 CLI 帮助文本与 SKILL 文档，小错误也会被"中途排障踩坑"的实践者挑出来。

- **测试与 CI 卫生**：#140170（bot 自动格式化）、#122537（npm audit 清零）表明仓库在持续做依赖与格式治理；而 #140183 这类"先写失败测试再修"的 PR 正获得 maintainer 认可（`ci-reviewed`），是贡献者可以参考的范式。

- **跨平台一致性**：`sweeper:risk-platform-windows`、`os/macos` 标签在 gateway 与 Desktop 议题中反复出现，Windows / macOS 行为差异仍是稳定的长尾问题来源。

---

*日报生成时间：2026-10-17 ｜ 数据截至过去 24 小时更新*

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 · 2026-10-17

数据来源：github.com/openclaw/openclaw

---

## 1. 今日速览

今日主线是 **Gateway 稳定性与恢复能力**：v2026.10.4 修复了休眠/系统时钟跳变导致 Gateway 误判心跳过期而自重启的问题，并解决了关停与重启挂起。社区侧，两个高优先级 Issue 都指向"**诊断信息不可信**"这一类痛点——Ollama 嵌入式 agent 的 `incomplete_result` 和 `config get` 对敏感值的静默掩码。PR 侧则集中在工具调用恢复、PostgreSQL Gateway 修复、内存索引与凭证轮换、以及大批量的测试清理。

---

## 2. 版本发布

### v2026.10.4

- **Gateway 不再因休眠或系统时钟跳变自重启**。此前 ownership heartbeat 会因休眠/时钟跳跃被判定为 stale，触发不必要的重启；现在 Gateway 保持运行。(#170790) 感谢 @AnvinaLI、@sgh6688、@waynegault、@RomneyDa。
- **Gateway 关停与重启不再挂起**（release note 原文在此处截断，具体触发条件未完整披露，建议关注后续 changelog）。

---

## 3. 社区热点 Issues

> 说明：数据源显示过去 24 小时内**仅有 2 条 Issue 更新**，因此本节按实际数据全部收录，不做凑数。

### #101445 · 嵌入式 Ollama agent 报告 `payloads=0 tools=0`（OPEN）
- **标签**：P2、clawsweeper:no-new-fix-pr、needs-maintainer-review、impact:message-loss、impact:auth-provider、issue-rating: 🦪 silver shellfish
- **作者**：@Zvimarmor ｜ 创建 2026-07-07 ｜ 更新 2026-10-17 ｜ 评论 7 ｜ 👍 1
- **为什么重要**：这是典型的**静默消息丢失**。嵌入式 `ollama` agent（qwen3:8b、tool-calling、thinking=off）在特定 prompt 下确定性地产出 `payloads=0 tools=0`（`code=incomplete_result`，即"不完整的终端回合"），但 Ollama 自己的响应里明明带着合法的 `tool_calls`。属于跨层协议解析问题：模型侧输出正确，OpenClaw 侧却判定为空。
- **社区反应**：存在 7 条讨论，说明复现路径较清晰但修复 PR 尚未出现（`no-new-fix-pr`）。今天已有 docs PR #174861 给出临时绕行方案（改用 llmman 作为本地服务端），侧面印证该问题短期内无根治补丁。
- 🔗 https://github.com/openclaw/openclaw/issues/101445

### #173313 · `config get` 掩码敏感值，导致故障恢复时验证循环误导数小时（OPEN）
- **标签**：P2、clawsweeper:no-new-fix-pr、needs-maintainer-review、needs-product-decision、source-repro、impact:auth-provider、issue-rating: 🦞 diamond lobster、impact:ux-friction、clawsweeper:intake:bug / needs-repro
- **作者**：@tomdailey55 ｜ 创建 2026-10-15 ｜ 更新 2026-10-17 ｜ 评论 4 ｜ 👍 0
- **为什么重要**：报告者描述了一次 Funnel 暴露网关上长达 **4 小时以上的故障与误诊**。最大单一原因是"诊断陷阱"：`openclaw config get gateway.auth.password` 返回的是**掩码占位符**而非真实值，且界面上没有任何"这是掩码"的提示。运维人员在凭证轮换后反复"验证"，实际上每次都在验证一个假值，陷入死循环。
- **社区反应**：diamond lobster 高分评级 + `needs-product-decision`，说明维护者认可问题严重性，但在"该不该让 CLI 输出明文密码"这一安全边界上需要产品决策。属于安全性与可诊断性之间的经典权衡。
- 🔗 https://github.com/openclaw/openclaw/issues/173313

---

## 4. 重要 PR 进展

### 工具调用与回合恢复
1. **#174376 · fix(agents): 恢复仅有 reasoning 或裸 tool-call 的 settled-turn 答案**（P1，merge-risk: 🚨 auth-provider，status: needs proof）
   修复模型在工具结算后只输出 reasoning、或只输出未闭合 `<tool_call>` 标记（含输出长度截断、projected transcript 场景）时最终答案缺失的问题，OpenClaw 可从已结算工具结果中合成答案。与 #101445 属同一问题域。
   🔗 https://github.com/openclaw/openclaw/pull/174376

2. **#174797 · fix(ai): 将不可用的历史工具回放为文本**
   历史会话中某工具已从当前 catalog 移除时，旧调用仍被序列化为原生 Chat Completions function call，严格 provider 会拒绝该会话后续的所有请求。改为回放为文本。Closes #174779。
   🔗 https://github.com/openclaw/openclaw/pull/174797

3. **#174855 · fix(subagents): legacy 结果在重启后阻塞回复恢复**
   Gateway 每次重启都会导致 legacy 子任务完成事件失败（因其早于 operator-source evidence 的保存机制），父会话续写被无限期阻塞。
   🔗 https://github.com/openclaw/openclaw/pull/174855

### Gateway / 数据库 / 性能
4. **#174786 · fix(database): 修复 PostgreSQL Gateway 启动与恢复**（P1，merge-risk: 🚨 compatibility / 🚨 security-boundary，security-sensitive-changed）
   全新 PostgreSQL Gateway 启动即失败；保留会话会撞上 SQLite 专用迁移查询；完整 PG 备份/恢复在验证、结果记录、恢复三个环节全部失败。同时涉及 SQLite usage-cache key 与缺失的 Logbook 打包。
   🔗 https://github.com/openclaw/openclaw/pull/174786

5. **#174860 · perf(gateway): 提交后 reload 不再重扫插件元数据**
   配置变更、登录、登出或密钥移除后，Gateway 的 post-commit 工作会从磁盘重新加载插件元数据，而不是复用刚刚建立的内存 inventory。堆叠于 #173626 之上。
   🔗 https://github.com/openclaw/openclaw/pull/174860

6. **#174851 · fix: 凭证轮换后保留 legacy 内存索引**
   升级 + 凭证轮换后，既有内存索引变陈旧，即使首次升级后的搜索已成功接受 legacy 身份。关联 #173327（oMLX 与 auth-independent embedding identities）。
   🔗 https://github.com/openclaw/openclaw/pull/174851

7. **#174833 · fix(streaming): 避免对普通标记重复扫描标签**（Closes #174354）
   普通 HTML、泛型语法、比较运算符会导致流式回复反复全量扫描 reasoning/final 标签。感谢 @JasonBuildAI 的复现与原始提案。
   🔗 https://github.com/openclaw/openclaw/pull/174833

### UI / 可观测性
8. **#167445 · fix: 在聊天队列中显示被延迟的 steering**（web-ui + gateway，size L，status: ready for maintainer look）
   用 **Steer** 发送的消息可能被当前 runtime 拒绝并安全延迟，但 UI 仍把它显示为已进入活跃对话，composer queue 显示为空——而 Gateway 实际已接管该后续。修复后队列状态与真实所有权一致。
   🔗 https://github.com/openclaw/openclaw/pull/167445

9. **#174806 · fix(doctor): 显示上次 dreaming 运行与下次调度**（关联 #87637）
   普通 Doctor 报告只显示 dreaming 是否启用与频率，即使 SQLite 中已存在"上次记录运行"和"下次计划运行"也不展示。修复后运维可直接看到上次 dreaming 阶段的时间戳与结果。
   🔗 https://github.com/openclaw/openclaw/pull/174806

10. **#174861 · docs(ollama): 回合在持有 tool call 时仍 incomplete 的替代方案**（关联 #101445）
    为受 `incomplete_result` 困扰的 Ollama 用户补充文档：可尝试使用 llmman 作为本地服务端。属临时绕行而非根治。
    🔗 https://github.com/openclaw/openclaw/pull/174861

**其他值得留意的动态**：#174713（在配对设备上浏览文件夹选择 existing-folder 会话）已 CLOSED；#174162（ONNX 使用 Decision V2 prepared 执行）已 CLOSED；#174816 / #174747 / #174840（`steipete` 主导的测试清理批次 d186/d188/d189，其中 d189 为 62 文件、+11172/−18125，净减 ~6953 行）；#174827（简化 lobster 输入 reconciliation）。

---

## 5. 功能需求趋势

从本期数据（2 个 Issue + 20 个 PR）可提炼出以下方向：

- **本地 / 自托管模型支持链路仍在补强**：Ollama 工具调用解析（#101445）、llmman 作为替代服务端（#174861）、ONNX 接入 Decision V2（#174162）、Baseten 相关修复（#174797）。社区明显在把"本地模型 + 工具调用"当作一等场景打磨。
- **Gateway 生命周期与持久化可靠性**：休眠、时钟跳变、关停挂起（v2026.10.4）、重启后 legacy 子任务阻塞（#174855）、PostgreSQL 启动与备份恢复（#174786）。这是当前投入最重的方向。
- **诊断与可观测性**：`config get` 掩码（#173313）、Doctor 显示 dreaming 运行历史（#174806）。需求从"能跑"转向"跑挂了能快速定位"。
- **凭证轮换 / 身份稳定性**：内存索引在凭证轮换后保留（#174851）、auth-provider 相关问题在 Issue 标签中反复出现（两条 Issue 都带 `impact:auth-provider`）。
- **流式输出性能与 UI 状态一致性**：流式标签扫描优化（#174833）、聊天队列显示 deferred steering（#167445）。
- **测试债务清理**：d186/d188/d189 三个批次，规模巨大，说明项目正处于"重构 + 减重"阶段。

---

## 6. 开发者关注点

1. **诊断工具本身不可信**是最刺眼的反馈。#173313 中，一个没有任何"已掩码"提示的占位符直接造成了 4 小时以上的误诊。运维工具的输出需要明确区分"真实值"与"被遮蔽的值"，否则自动化验证流程会被系统性误导。
2. **本地模型的工具调用链存在跨层语义断层**。#101445 里 Ollama 返回了合法 `tool_calls`，OpenClaw 却判定 `payloads=0`，且 `thinking=off` 场景下确定性复现。这不是模型能力问题，而是适配层解析/校验逻辑问题，且目前只有文档级绕行。
3. **重启与休眠后的恢复路径仍是主要故障源**。`legacy` 数据（#174855）、`legacy` 索引（#174851）、休眠/时钟跳变（#170790）、PostgreSQL 迁移（#174786）——"升级/重启后旧状态能否被正确接管"是反复出现的主题。
4. **严格 provider 的兼容性边界**。历史工具被移除后仍以原生 function call 形式回放，会导致整段会话被拒（#174797）。会话历史的序列化策略需要更强的向后兼容保证。
5. **UI 状态与 Gateway 真实所有权不一致**。#167445 中 composer queue 为空但 Gateway 已持有后续消息，这类"界面说没有、系统说有"的偏差会直接削弱用户对队列语义的信任。

---

*本期数据窗口内 Issue 更新量偏低（仅 2 条），PR 更新活跃（24 小时内 50 条）。如需更完整的 Issue 趋势分析，建议结合更长时间窗口的数据。*

:::
