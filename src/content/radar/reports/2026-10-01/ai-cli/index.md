---
title: "AI CLI 工具社区动态日报"
published: 2026-10-01
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-01

> 生成时间: 2026-10-01 00:00 UTC | 覆盖工具: 8 个

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
**数据窗口：2026-10-01｜口径说明：部分仓库未披露全量 Issue/PR 数，表中“热点/重点”以日报列出的条目或明确更新量计。**

---

## 1. 生态全景

1. AI CLI 竞争已从“能否接入模型、能否执行命令”，转向**运行时可靠性、上下文经济与成本可观测性**。
2. 各主流工具的社区反馈高度集中在 P1 级问题：子代理错误传播、会话恢复、中断失效、升级迁移与平台兼容。
3. 插件、MCP、Skills 成为扩展能力主战场，但核心能力暴露不足、配置合并静默覆盖、权限边界不一致仍是共性摩擦。
4. Windows、移动端远程配对、企业安全合规与安全默认值，正在成为决定实际采纳率的“最后一公里”。

---

## 2. 各工具活跃度对比

| 工具 | 今日 Issues | 今日 PR | Release 情况 | 今日社区焦点 |
|---|---:|---:|---|---|
| **Claude Code** | 约 48 条更新；Top10 热点，最高 63 评论 | 重点 10 条，总量未披露 | **v2.1.286** | auto-memory 状态、compaction 后 skill 重注入、周用量消耗、会话记录清理、diff 面板 |
| **OpenAI Codex** | **49** | **50** | **rust-v0.159.3**；0.160/0.161 alpha 高频推进 | Windows 阻断、Android 配对死循环、工具集回归、async I/O 性能 |
| **Gemini CLI** | **48** | 重点 10 条，总量未披露 | **v0.64.0-nightly.20260930.g38700b4b3** | 子代理 MAX_TURNS 误报成功、无限挂起、Ctrl+C 中断、会话历史删除 |
| **DeepSeek Reasonix** | 热点 10 条，总量未披露 | 重点 10 条，总量未披露 | **studio-v2.23.0** | MCP 工具治理、UI 本地化、Claude Skills 兼容、网络加速 |
| **OpenCode** | 热点 10 条，总量未披露 | 重点 10 条，总量未披露 | **v1.18.34** | 插件 API 缺口、session 头缺失、V1→V2 迁移冲突、子代理无限重试 |
| **Deepseek Harness** | **0** | **0** | 无 | 过去 24 小时无活动 |
| **Hermes** | **8** | **50** | 无 | 桌面多会话状态、更新器协议、Windows 浏览器后端、安全凭证 |
| **OpenClaw** | **8** | 重点 10 条，总量未披露 | **v2026.9.7**；版本规模 518 commits / 2,818 PRs / 334 contributors | Gateway 生命周期、僵尸进程、启动阻塞、多 agent 队列隔离 |

> 注：Claude Code、Gemini CLI 的 Issue 数来自日报“更新 Issue”统计；OpenAI Codex 的 49/50 来自日报明确披露；Hermes 的 50 条为“过去 24 小时更新的 PR”。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **上下文与成本可观测** | Claude Code、Codex、Gemini CLI、OpenCode、Reasonix、Hermes、OpenClaw | Claude #82144：compaction 后 skill 重注入成本约为摘要 4 倍；#97398：周用量消耗速率疑似上升 3.6 倍；Codex #46140：单日 4.997 亿 token；Gemini #19561：每轮基线约 36.6k tokens；Reasonix：按模型 ID 设置上下文、cachecontext；OpenCode：session compaction；Hermes：压缩记账；OpenClaw：Thinking Off 仍输出推理。 |
| **Agent / Subagent 可靠性** | Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw、Hermes、Reasonix | Gemini #22323：MAX_TURNS 被谎报为 GOAL 成功；#21409：通用 agent 无限挂起；OpenCode #52372：无限重试，#52378：子代理失败上报成功；Claude #80569：agent-team 忽略 effort；Codex #40852/#42973：工具集缺失；OpenClaw #162179：多 agent 队列互相取消；Hermes #129740：stale-send 循环拒发。 |
| **数据留存、恢复与升级迁移** | Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw、Hermes | Claude #59248：会话记录被静默清理，无恢复路径；Gemini #29584：恢复会话后快速退出导致历史删除；OpenCode #52395：V1 会话在 V2 触发 UNIQUE 约束；OpenClaw #162209/#160674：更新失败、就地更新后 shutdown 失败；Hermes #118070：更新器协议不匹配。 |
| **权限、沙箱与安全边界** | Claude Code、Codex、Gemini CLI、OpenCode、Hermes、OpenClaw | Claude #96434：security-guidance 排除敏感文件；#88790：AskUserQuestion 结果无法区分真人；Codex #43929：bwrap deny 文件边界缺陷；Gemini #29583：不可信工作区只读设置；Hermes：API key 不明文落盘、Vault eTLD+1、npm audit；OpenClaw：secret egress、角色可见性。 |
| **MCP / 插件 / Skills 生态** | Claude Code、Codex、Gemini CLI、Reasonix、OpenCode、OpenClaw | Reasonix #5444：MCP `disabled_tools`；#11463：MCP 桥接 VS Code 扩展；OpenCode #49389：插件无法访问 5 个核心 session 能力；#52369：GUI 功能迁入内置扩展；Gemini #24246：工具超过 128 个触发 400；Codex #49689：OTel 导出 skill 调用事件。 |
| **跨平台与远程/移动端稳定性** | Codex、OpenClaw、Reasonix、Gemini CLI、Hermes、OpenCode | Codex：Windows #48043 无法启动、Android 配对失败；OpenClaw #162047：Windows 升级 Doctor 卡 39 分钟；#158592：macOS 睡眠唤醒后运行时发布失败；Reasonix #11434：Windows 冷启动 handshake 失败；Gemini #21983：Wayland 下 Browser 子代理失败；Hermes #129744：Windows elevated 浏览器后端失败。 |
| **配置一致性与“最后一公里”生效** | Gemini CLI、Reasonix、Hermes、OpenClaw、OpenCode | Gemini #22267：Browser Agent 忽略 settings.json；Reasonix #11473：项目配置静默覆盖用户 `disabled_tools`；Hermes #129747：显式 `platforms.<plat>.extra` 被顶层覆盖；OpenClaw #155300：重复发布未变更配置导致 session list 卡住。 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线/生态位置 |
|---|---|---|---|
| **Claude Code** | TUI 交互、diff、skills、agent-team、安全审查、记忆/上下文治理 | Claude 生态重度开发者、企业团队 | Anthropic 官方路线，成熟度高，重视安全与专业工作流，但成本/记忆透明度压力大 |
| **OpenAI Codex** | Rust CLI、企业合规、feature gate、模型/Bedrock 目录、可观测性 | 跨平台企业团队、合规敏感用户 | OpenAI 官方平台化路线，发布节奏快，Windows 与远程配对是短板 |
| **Gemini CLI** | headless/CI、AST 感知、OS 沙箱、Browser Agent、token 节约 | GCP/Gemini 开发者、自动化与 CI 场景 | Google 官方开源路线，强调代码检索智能化与多代理，但 agent 可靠性待补 |
| **DeepSeek Reasonix** | MCP 治理、UI 本地化、Claude Skills 兼容、网络加速、本地指标 | 多模型桌面+CLI 用户、MCP 重度用户 | 社区/ DeepSeek 生态扩展器，快速补生态兼容与客户端体验 |
| **OpenCode** | 插件 API、GUI 扩展化、多 provider、server/remote | 插件开发者、自托管用户 | anomalyco 路线，强调 SDK/插件架构，V1→V2 迁移与代理可靠性是当前瓶颈 |
| **Hermes** | 桌面端 + 网关 + Discord/Telegram/Slack + 本地 GPU | 多渠道 agent 自动化用户 | NousResearch 路线，平台适配广，安全凭证与多会话状态是关键战场 |
| **OpenClaw** | 自托管 Gateway、多 agent、渠道编排、插件/hooks | 高级自托管、多渠道编排用户 | 工程规模大，贡献者多，但 Gateway 生命周期与资源泄漏是主要风险 |
| **Deepseek Harness** | — | — | 过去 24 小时无活动，处于观察/停滞状态 |

---

## 5. 社区热度与成熟度

**第一梯队：成熟且高活跃**
- **Claude Code、OpenAI Codex、Gemini CLI** 今日 Issue 更新均在 48–49 条量级，且热点评论数高。它们拥有成熟发布流程、稳定维护线与 alpha/nightly 通道。
- 但成熟不等于低风险：Codex 的“升级即回归”、Claude 的“静默降级”、Gemini 的“子代理误报成功”都说明基础可靠性仍是信任核心。

**第二梯队：高工程活跃 / 快速迭代**
- **OpenClaw** 版本规模达 518 commits / 2,818 PRs / 334 contributors，但今日 P0/P1 问题集中在 Gateway 生命周期、僵尸进程、启动阻塞，属于“体量大、债务显性化”阶段。
- **Hermes** 过去 24 小时有 50 条 PR 更新，P0 Discord relay、P1 性能与多会话修复并行，处于快速修补与扩张期。
- **OpenCode、Reasonix** 分别发布 v1.18.34、studio-v2.23.0，热点集中在插件 API、MCP 治理、迁移兼容，属于生态构建早期的快速迭代者。

**低活动/观察**
- **Deepseek Harness** 无活动，社区热度暂缺。

---

## 6. 值得关注的趋势信号

1. **“静默失败”成为最大不信任来源。**  
   Claude 的 auto-memory 状态未知、transcript 静默清理；Gemini 子代理误报 GOAL；OpenCode 子代理失败上报成功；Reasonix 配置静默覆盖。开发者能接受能力边界，但难以接受“不知道发生了什么”。工具应默认显式失败、可回执、可恢复。

2. **上下文经济正在产品化。**  
   compaction、skill 重注入、AST 检索、cachecontext、token 预算、OTel skill 事件，说明 token 成本已从“模型参数”变成“会话内可归因资源”。未来竞争点是谁能让用户看清“哪一部分消耗了多少”。

3. **多代理从演示走向生产，但缺熔断与隔离。**  
   Gemini、OpenCode、Claude、OpenClaw 均出现子代理无限挂起、误报成功、队列串扰、工具集不一致。开发者需要：终止原因可信、错误向上传播、队列隔离、后台任务与可观测轨迹。

4. **安全边界双向收紧。**  
   一边是 security-guidance 排除敏感文件、工作区只读、凭证不落盘、secret egress 代理；另一边是 AskUserQuestion 无法区分真人响应等结构性缺口。安全默认值、权限一致性和 agent 权限模型将成为企业采购关键。

5. **MCP / 插件 / Skills 需要“核心能力 API 化”。**  
   OpenCode 插件无法访问 session 压缩/删除；Reasonix 需要 MCP 工具过滤与 VS Code 桥接；Gemini 面临工具数量 128 上限。生态扩展不能只靠外围 hook，必须暴露一等公民能力。

6. **升级迁移与平台质量决定长期留存。**  
   Codex Windows 阻断、Android 配对死循环；OpenClaw Windows Doctor 卡 39 分钟、macOS 睡眠恢复失败；OpenCode V1→V2 迁移冲突；Reasonix Windows 冷启动失败。跨平台测试、迁移脚本、回滚提示和恢复通道应成为发布门槛。

7. **用户主权与社区治理开始影响品牌信任。**  
   Claude #59248 的 38 👍 与 55 评论、stale issue 集中关闭引发的潜在不满，说明数据留存 opt-in、恢复路径、issue 生命周期管理不再只是运营细节，而是开发者信任的一部分。

**对开发者的参考：**  
选型时优先考察平台稳定性、成本可观测性、插件/MCP 生态、企业安全默认值；贡献或自研工具时，应把“显式失败、可恢复、可归因、跨平台一致”作为一等需求，而非上线后的补丁。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-10-01  
数据说明：PR 评论数字段缺失且点赞均为 0，因此“热度”综合官方排序、关联 Issue 评论量、更新活跃度判断；所列 PR 当前均为 OPEN。

## 1. 热门 Skills 排行（PR）

1. **skill-creator 触发评估与跨平台修复** — PR #1298 [OPEN]  
   功能：隔离 trigger evals，修复 Windows 子进程 `select()`、运行时失败被误判为非触发等问题。  
   热点：Skill 评估可靠性、Windows 支持、负样例误通过。  
   https://github.com/anthropics/skills/pull/1298

2. **mcp-builder 兼容 mcp>=2** — PR #1742 [OPEN]  
   功能：适配 `streamable_http_client` 重命名，支持通过 `create_mcp_http_client` 配置自定义 headers。  
   热点：MCP SDK 升级后的兼容性与真实 MCP Server 可用性。  
   https://github.com/anthropics/skills/pull/1742

3. **proofcore-contract-auditor** — PR #1771 [OPEN]  
   功能：面向 Web3 的 Solidity/Rust 智能合约静态分析，并将审计证明锚定到 TON 区块链。  
   热点：智能合约审计、零存储 Merkle 证明、链上存证。  
   https://github.com/anthropics/skills/pull/1771

4. **Detect orphaned docx comments** — PR #1734 [OPEN]  
   功能：检测 DOCX 中孤立/悬空评论。  
   热点：文档协作清理、DOCX 完整性与评论生命周期。  
   https://github.com/anthropics/skills/pull/1734

5. **md2video-audio** — PR #1703 [OPEN]  
   功能：将 Markdown 经 Marp 转为演示幻灯片，再编译为带拟真配音的 MP4 视频。  
   热点：零成本内容生产、文档视频化、音视频自动化。  
   https://github.com/anthropics/skills/pull/1703

6. **notion-spec-to-implementation + quantitative-resume-auditor** — PR #1245 [OPEN]  
   功能：将 Notion 规格拆解为可执行任务；量化审计简历。  
   热点：规格到实现的工作流自动化、个人职业文档分析。  
   https://github.com/anthropics/skills/pull/1245

7. **docx LibreOffice 超时与输出验证** — PR #1792 [OPEN]  
   功能：LibreOffice 超时时返回错误，并验证输出 DOCX 不再含修订标记。  
   热点：文档处理可靠性、避免“假成功”。  
   https://github.com/anthropics/skills/pull/1792

8. **pyxel 复古游戏开发** — PR #525 [OPEN]  
   功能：用 Python/Pyxel 创建、调试、验证复古游戏，支持无头输入运行与帧检查。  
   热点：游戏开发技能、可验证运行、任务状态检查。  
   https://github.com/anthropics/skills/pull/525

## 2. 社区需求趋势

- **安全与信任边界**：最热 Issue #492（43 评论）指出社区技能冒充 `anthropic/` 命名空间，存在信任边界滥用；#1394 还涉及 eval-viewer XSS。需求集中在命名空间治理、权限透明、安全扫描。  
  https://github.com/anthropics/skills/issues/492  
  https://github.com/anthropics/skills/issues/1394

- **组织级共享与分发**：Issue #228（16 评论、8 赞）希望 Claude.ai 内组织级技能共享；#189 抱怨插件重复安装导致上下文重复。需求是共享库、去重、企业分发。  
  https://github.com/anthropics/skills/issues/228  
  https://github.com/anthropics/skills/issues/189

- **技能评估与触发可靠性**：Issue #556 报告 `run_eval.py` 触发率 0%；#1383 指出 benchmark、Windows trigger eval、skill shadowing 等问题。社区需要可靠、跨平台的 Skill 评测体系。  
  https://github.com/anthropics/skills/issues/556  
  https://github.com/anthropics/skills/issues/1383

- **上下文与性能治理**：Issue #1487 称 `claude-api` 单次注入约 156k tokens；#1329 提议 `compact-memory` 符号化记忆。需求是按需加载、紧凑记忆、token 预算控制。  
  https://github.com/anthropics/skills/issues/1487  
  https://github.com/anthropics/skills/issues/1329

- **测试与质量门禁**：PR #822 提议 AI E2E 测试 AWT；PR #723 提议 testing-patterns；Issue #1385 提议推理质量门 Pipeline。需求是测试生成、E2E 验证、交付前审查。  
  https://github.com/anthropics/skills/pull/822  
  https://github.com/anthropics/skills/pull/723  
  https://github.com/anthropics/skills/issues/1385

- **文档/办公自动化**：DOCX 评论、LibreOffice 超时、排版质量、ODT、PDF 大小写、tracked change ID 冲突等 PR/Issue 密集。需求是格式兼容、文档质量控制和可靠转换。  
  https://github.com/anthropics/skills/pull/514  
  https://github.com/anthropics/skills/pull/486  
  https://github.com/anthropics/skills/pull/538  
  https://github.com/anthropics/skills/pull/541

- **上游依赖兼容**：mcp-builder 需适配 `mcp>=2`，claude-api 需标记退役模型，web-artifacts-builder 需兼容 pnpm≥10.1。社区要求 Skills 持续跟进 API、SDK、前端工具链变化。  
  https://github.com/anthropics/skills/pull/1742  
  https://github.com/anthropics/skills/pull/1607  
  https://github.com/anthropics/skills/issues/1362

- **垂直领域专用 Skill**：Web3 合约审计、HPC 集群操作、Notion 规格转实现、批量破坏性写操作检查等方向正在出现。  
  https://github.com/anthropics/skills/pull/1771  
  https://github.com/anthropics/skills/pull/1615  
  https://github.com/anthropics/skills/pull/1776

## 3. 高潜力待合并 Skills

以下 PR 均为 OPEN，但更新活跃、需求明确或修复边界清晰，较可能优先落地：

- **#1245 notion-spec-to-implementation / quantitative-resume-auditor**：更新至 2026-09-30，工作流自动化与简历审计需求明确。  
  https://github.com/anthropics/skills/pull/1245

- **#1742 mcp-builder mcp>=2 兼容修复**：更新至 2026-09-29，属于上游依赖硬兼容问题。  
  https://github.com/anthropics/skills/pull/1742

- **#1607 claude-api 退役模型 ID 更新**：更新至 2026-09-28，文档修正型 PR，风险低。  
  https://github.com/anthropics/skills/pull/1607

- **#1681 skill-creator 支持直接执行 package_skill.py**：更新至 2026-09-27，改善工具链可用性。  
  https://github.com/anthropics/skills/pull/1681

- **#1792 docx LibreOffice 超时错误与输出验证**：更新至 2026-09-25，解决“假成功”可靠性问题。  
  https://github.com/anthropics/skills/pull/1792

- **#1734 检测孤立 DOCX 评论**：更新至 2026-09-25，DOCX 生态高频痛点。  
  https://github.com/anthropics/skills/pull/1734

- **#1298 skill-creator trigger evals 与 Windows/runtime 修复**：关联高评论 Issue #1383/#556，若维护者推进评测体系，该 PR 关键。  
  https://github.com/anthropics/skills/pull/1298

- **#1703 md2video-audio**：更新至 2026-09-15，内容视频化方向差异化明显。  
  https://github.com/anthropics/skills/pull/1703

## 4. Skills 生态洞察

一句话：当前社区最集中的诉求是——**把 Skills 从“能用的提示包”升级为可靠、可评估、安全可共享、按需加载的生产级组件**。

---

# Claude Code 社区动态日报 · 2026-10-01

数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 一、今日速览

今日社区焦点集中在**上下文与记忆的成本可见性**：auto-memory 加载状态不可知（63 条评论）、compaction 后 skill 全量重注入导致上下文膨胀，以及 9 月 25 日重置后周用量消耗速率疑似上升 3.6 倍，三者共同指向"用户无法看清自己消耗了什么"。同时，v2.1.286 继续打磨全屏交互细节（权限队列计数、列表鼠标操作），而 diff 面板迎来一批由核心贡献者 @poteat 提交的性能与状态同步修复。数据安全仍是情绪最强的话题——会话记录被静默清理的 issue 已累计 55 条评论、38 个 👍。

---

## 二、版本发布

### v2.1.286

- **权限提示排队计数**：当多个权限请求堆积时，提示中会显示 "2 of 5" 之类的序号，用户可明确知道当前处于队列中的位置。
- **全屏模式列表鼠标支持**：列表中的 "N more" 折叠行现可点击，点击即跳转到列表对应一端，并带有 hover 与 pressed 状态反馈。
- 修复了若干 Claude Code 进程相关问题。

> 本次为体验细节迭代，暂无破坏性变更。相关改动在 PR [#98275](https://github.com/anthropics/claude-code/pull/98275) 中被同步描述（AGENTS.md 加载信息改为写入 debug 日志而非 transcript）。

---

## 三、社区热点 Issues

1. **[#82056](https://github.com/anthropics/claude-code/issues/82056) — 会话无法判断 auto-memory 索引是完整加载、被截断还是完全未加载**（63 评论）
   今日讨论量最高。用户 `~/.claude/projects/<project>/memory/` 下的 `MEMORY.md` 索引 + 分主题文件在会话内没有任何加载状态回执，导致模型和用户都无法判断记忆是否真正生效。这类"静默降级"是长会话可靠性的核心隐患。

2. **[#59248](https://github.com/anthropics/claude-code/issues/59248) — 静默保留策略清理会话记录，无警告、无选择、无恢复途径**（55 评论，38 👍）
   情绪最强的 issue：用户在 Cursor 扩展中直接失去上一会话在内的**所有**历史 transcript 的恢复、查看能力。数据丢失 + 无 opt-in + 无恢复路径三点叠加，长期未被解决。

3. **[#97398](https://github.com/anthropics/claude-code/issues/97398) — 周用量限制消耗速率在 9 月 25 日重置后上升约 3.6 倍**
   用户用本地去重 transcript 做量化：上周 9,352 次响应到 100%，本周 715 次响应已达 24%（约 93 次响应/1% → 约 26 次/1%）。成本透明度问题，数据翔实，值得官方正面回应。

4. **[#82144](https://github.com/anthropics/claude-code/issues/82144) — compaction 后 skill 重新注入的开销约为压缩摘要的 4 倍**
   `<system-reminder>` 中"本会话早前调用的 skills"会**整段重注入** skill 正文并做字节截断。5 个 skill 的会话中，这部分上下文成本是压缩摘要本身的约 4 倍——反而抵消了 compaction 的收益。

5. **[#98184](https://github.com/anthropics/claude-code/issues/98184) — Wi-Fi 切换后，下一请求在死连接上挂起 184 秒才重试（Linux）**
   典型的网络韧性缺陷：缺少连接健康检测与快速失败。对移动办公和 CI 场景影响明显，附带完整复现步骤。

6. **[#80569](https://github.com/anthropics/claude-code/issues/80569) — Agent-team 队友忽略 subagent 定义中的 `effort` frontmatter**
   `effort` 是官方文档明确支持的 subagent 字段，在直接调用时生效，但在 agent-team 场景下被静默忽略。属于"文档承诺与实际行为不一致"，会误导用户对成本/质量的预期。

7. **[#87954](https://github.com/anthropics/claude-code/issues/87954) — 功能请求：跨会话对话通道，让两个用户的 Claude Code 会话互相对话**
   主张的是两个**不同人**的会话之间建立一等公民的消息通道（交接工作、互相请求输入、协调任务），而非共享同一会话。若成立，将催生多智能体协作的新范式。

8. **[#88790](https://github.com/anthropics/claude-code/issues/88790) — AskUserQuestion 的工具结果无法与真实人类响应区分**
   安全/权限方向：subagent 无法分辨提问结果是真人回答还是被构造的返回值，存在提示注入与权限绕过风险面。低评论但高权重。

9. **[#92108](https://github.com/anthropics/claude-code/issues/92108) — `/diff` 应覆盖 `--add-dir` 追加的工作目录**
   `/diff` 只展示会话起始目录的 git 变更，忽略通过 `--add-dir` 加入的目录。多仓/多目录工作流下，审查可见性缺失。

10. **[#95139](https://github.com/anthropics/claude-code/issues/95139) — Browser pane 在 DDEV 的 `*.ddev.site` 上仍阻断同源子资源（#86362 修复后）**
    公有 DNS 解析到 127.0.0.1 的场景仍被沙箱判定为跨源，而 `*.test` 正常。说明前一版修复只覆盖了部分域名形态，本地开发环境路径需补齐。

*其他值得留意的变化：* [#79520](https://github.com/anthropics/claude-code/issues/79520)（已关闭）、[#94884](https://github.com/anthropics/claude-code/issues/94884)（Linux 登录卡在 "Finish sign-in in the Claude app"，已关闭）、[#98541](https://github.com/anthropics/claude-code/issues/98541)（GitHub 集成仅支持公开仓库，被作为重复项关闭）。此外今日有**大量 issue 被集中以 `stale` 标签关闭**（#83159、#82983、#81088、#80977、#80975、#80970、#80953、#80961、#80944、#83171、#83094、#83087、#83054、#83017 等），其中包含 a11y、IDE 渲染、桌面端崩溃等实质问题，建议关注社区对"stale 自动关闭"机制的不满是否会继续累积。

---

## 四、重要 PR 进展

diff 面板是本轮 PR 的主战场，绝大部分由 @poteat 提交，围绕"少起进程、状态同步、边界正确性"三条主线：

1. **[#98555](https://github.com/anthropics/claude-code/pull/98555) — diff：对话框会打开它列出的每一个文件，关闭时却什么都不说**
   非全屏布局下的 `/diff` 对话框把会话前已修改的文件、测试/生成文件（如 lockfile）也一并打开；关闭对话框无任何输出反馈。属可用性噪音问题。

2. **[#94847](https://github.com/anthropics/claude-code/pull/94847) — diff：首次编辑仅在确实有文件可列时才打开面板**
   原先首次 Edit/Write/NotebookEdit 会**先打开面板再取数**，写入仓库外、被忽略路径或另一个 worktree 时会先弹出一个空面板（"No tracked changes"）。改为条件化打开。

3. **[#98445](https://github.com/anthropics/claude-code/pull/98445) — diff：用单个 git 进程读取所有文件的 hunk，替代每文件一个进程**
   每次工具调用后最多 50 个进程降为 1 个，对 Windows 等进程启动开销高的平台收益显著，同时减少"某进程超时/失败"的失败面。

4. **[#98357](https://github.com/anthropics/claude-code/pull/98357) — diff：面板自行感知 merge 已完成，且不再在异常分支名上频繁起 git**
   此前在部分分支名上会每两秒启动一次 git；现在通过监听仓库 HEAD 变化来感知外部完成的 merge。

5. **[#98374](https://github.com/anthropics/claude-code/pull/98374) — diff：rebase 完成后重新读取 diff**
   修复 git 在 rebase 结束后残留 `REBASE_HEAD` 导致面板误判为"rebase 进行中"、错误显示 "Diff unavailable" 的问题。

6. **[#97293](https://github.com/anthropics/claude-code/pull/97293) — mods：补全 `process.run` 截断标志与 list 条目 `mtimeMs` 的声明与测试桩**
   仅在已发布的 npm CLI 确实携带 `isStdoutTruncated` / `isStderrTruncated` / `mtimeMs` 后才启用，避免类型声明承诺了 CLI 尚未实现的能力——值得肯定的兼容性纪律。

7. **[#96434](https://github.com/anthropics/claude-code/pull/96434) — security-guidance：让被拒文件与密钥文件远离审查者视野**（作者：@claude[bot]）
   修复 #96276。安全审查不再纳入被 `Read` deny/ask 规则覆盖的文件与 `.env`、密钥、凭据库等常见敏感文件；审查子代理获得同样的 `disallowed_tools` 且禁用 shell，`SG_SKIP_SECRET_FILES=0` 可退出该行为。

8. **[#97952](https://github.com/anthropics/claude-code/pull/97952) — ci：调用 Claude 的 GitHub Actions 工作流安全加固**（已关闭）
   针对 `claude-issue-triage.yml`、`claude-dedupe-issues.yml`、`claude.yml` 三个工作流引入 egress 防火墙 runner 等加固措施，其余不调用 Claude API 的工作流不受影响。

9. **[#98275](https://github.com/anthropics/claude-code/pull/98275) — agents-md：将 AGENTS.md 加载行发送到 debug 日志**（已关闭）
   项目仅有 `AGENTS.md` 而无 `CLAUDE.md` 时，不再新增 transcript 行，`no CLAUDE.md found; AGENTS.md loaded: <paths>` 改走 `{ to: 'debug' }`，与 v2.1.286 内置行为对齐。

10. **[#39417](https://github.com/anthropics/claude-code/pull/39417) — 为 SKILL.md 增补关键设计思考步骤**（已关闭）
    面向前端开发场景，在 SKILL.md 中加入关键设计规范指引。虽为文档类改动，但反映社区正尝试通过 skill 定义来约束模型的设计输出质量。

---

## 五、功能需求趋势

从今日 48 条更新 issue 中可提炼出六个主要方向：

| 方向 | 代表 issue | 社区诉求 |
|---|---|---|
| **记忆与上下文治理** | #82056、#82144 | 记忆加载状态可观测、compaction 后避免 skill 全量重注入 |
| **成本与配额透明度** | #97398 | 用量消耗速率可解释、可按来源归因 |
| **数据留存与恢复** | #59248 | 保留策略需 opt-in、需警告、需可恢复 |
| **Agent / Subagent 语义一致性** | #80569、#87954、#88790 | frontmatter 契约可信、跨会话通道、人与工具响应可区分 |
| **TUI / diff 工作流** | #92108、#98555、#94847 | `/diff` 覆盖多目录、避免空面板与噪音打开 |
| **桌面端 / IDE 稳定性与可访问性** | #94353、#82983、#83087、#83171 | 屏幕阅读器支持、输入焦点丢失、流式响应 livelock、Bedrock 失败时无法切模型 |

网络韧性与本地开发沙箱（#98184、#95139）虽条目不多，但复现清晰、影响明确，属于"小改动、高收益"的修复类型。

---

## 六、开发者关注点

1. **静默降级是最大的不信任来源。** 记忆索引加载状态未知（#82056）、transcript 被静默清理（#59248）、skill 被静默截断重注入（#82144）、`effort` 被静默忽略（#80569）——四类问题共享同一模式：行为发生了，但系统不告知。开发者普遍接受"能力有限"，但难以接受"不知道发生了什么"。

2. **成本必须在会话内可归因。** #97398 用去重 transcript 精算出消耗倍率，说明用户已经在自建计量体系。当前缺的不是"总量"，而是"哪一部分消耗了多少"——compaction、skill 注入、系统提醒各占多少。

3. **数据留存需要用户主权。** #59248 的 38 个 👍 与 55 条评论表明，"自动清理"若无 opt-in 与恢复通道，会直接击穿开发者对工具的信任底线。

4. **多目录 / 多 worktree 是主流工作流，但工具仍在单目录假设上运行。** `/diff` 忽略 `--add-dir`（#92108）、diff 面板对仓库外写入表现异常（#94847）都源于此。

5. **机构化关闭 stale issue 的做法正在积累负面反馈。** 今日被以 `stale` 关闭的 issue 中包含 a11y（#94353 相关）、IDE 渲染丢失（#80961）、桌面端卡死（#83171）、会话中途丢上下文（#83094）等实际缺陷。若社区认为"未回复即关闭"，会削弱高质量 issue 的提交意愿。

6. **安全边界同时向两侧收紧。** 一方面 security-guidance 主动排除敏感文件（#96434）、CI 工作流加固（#97952）；另一方面 `AskUserQuestion` 的工具结果与真人响应不可区分（#88790）暴露出 agent 权限模型仍有结构性缺口。

---

*本日报基于 github.com/anthropics/claude-code 过去 24 小时的公开数据自动整理，Issue/PR 状态与评论数随时间变化。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 · 2026-10-01

> 数据来源：github.com/openai/codex ｜ 统计窗口：过去 24 小时

---

## 1. 今日速览

- **维护线发布 rust-v0.159.3**，唯一变更是将账号安全设置提醒（#49715）回迁到 0.159 分支，同时 0.160 维护候选版完成与 0.159 线的对齐（含模型目录、Bedrock 目录等 cherry-pick）。
- **Alpha 线高频推进**：0.161.0-alpha.3/4/5 与 0.160.0-alpha.6.1 同日推进，主分支合并节奏明显加快。
- **Windows 与移动端远程配对成为社区最大痛点**：Windows 平台相关 Issue 占据高评论榜多数席位，Android ↔ 桌面端的 "Authorize this phone" 死循环形成一组跨多条 Issue 的关联缺陷簇。

---

## 2. 版本发布

### rust-v0.159.3（稳定维护线）
- **新增**：使用 ChatGPT 登录的本地会话，现在可选择性地展示账号安全设置完成提醒（可选、非强制）。
- **变更**：#49744 将上游 #49715 原样 cherry-pick 到 0.159 维护线，共涉及 23 个文件，覆盖认证请求、陈旧账号响应、通知文案校验与 TUI 回归测试。
- 链接：https://github.com/openai/codex/compare/rust-v0.159.2...rust-v0.159.3

> 说明：完整改动清单以仓库 Changelog 为准；上游 PR 见 https://github.com/openai/codex/pull/49744

### 预发布通道
| 版本 | 说明 |
|---|---|
| rust-v0.161.0-alpha.5 | 主分支 alpha 持续推进 |
| rust-v0.161.0-alpha.4 | 同上 |
| rust-v0.161.0-alpha.3 | 同上 |
| rust-v0.160.0-alpha.6.1 | 0.160 alpha 线热修 |

预发布版本均未附带详细说明，建议关注对应 PR 以获知具体内容。

---

## 3. 社区热点 Issues（Top 10）

### ① Windows CLI 0.157.0 因守护进程权限错误无法启动（回归）
- **#48043** ｜ 51 评论 ｜ 👍 40 ｜ OPEN
- 0.156.1 正常、0.157.0 直接启动失败，影响面广且是版本回归，评论数与点赞数均为今日最高，属于**最高优先级平台阻断问题**。
- https://github.com/openai/codex/issues/48043

### ② [Windows] EFS 加密的 WindowsApps 文件导致内置插件全部不可用
- **#25220** ｜ 45 评论 ｜ 👍 5 ｜ OPEN（自 2026-05 起长期未解）
- `copyfile` 在 EFS 加密环境下失败，导致 Computer Use、Browser、Chrome、LaTeX 全部显示不可用。**持续 4 个月未修复**，说明 Windows Store / MSIX 安装路径的兼容性是结构性欠债。
- https://github.com/openai/codex/issues/25220

### ③ Windows 桌面端更新后本地项目从侧边栏消失
- **#42739** ｜ 39 评论 ｜ OPEN
- 更新后 Projects 显示 "No projects"，聊天仍留在 Recents，磁盘文件完好。属于典型的**升级迁移逻辑不完整**，同类问题 #42867 已关闭但本 issue 仍在。
- https://github.com/openai/codex/issues/42739

### ④ Codex Remote 在 Android 上配对失败
- **#48774** ｜ 28 评论 ｜ 👍 8 ｜ OPEN
- 同一账号、PC 已开启 "Allow connections"，扫码后进入 auth.openai.com 后流程中断。
- https://github.com/openai/codex/issues/48774

### ⑤ 桌面端切换账号后，Android 配对陷入死循环（跨账号陈旧状态）
- **#48555** ｜ 14 评论 ｜ 👍 15 ｜ OPEN
- 从账号 B 切回账号 A 后扫码授权永远回到 "Allow this phone"，一次尝试产生两条 pending enrollment。**点赞/评论比最高**，反映用户对认证状态机的强烈不满。
- 关联：#36268（重装 App 后循环，22 评论）、#49618（Windows↔Android 循环，5 评论）
- https://github.com/openai/codex/issues/48555

### ⑥ [macOS] code-mode 任务丢失 `send_message_to_thread` 工具
- **#40852** ｜ 18 评论 ｜ 👍 10 ｜ OPEN
- 桌面端 26.820 起，code-mode 任务只保留读工具、缺失发送工具，导致**工具集在不同任务模式下不一致**，是子代理/协作能力的核心回归。
- https://github.com/openai/codex/issues/40852

### ⑦ Headless SSH 任务丢失线程消息与委派工具（回归）
- **#42973** ｜ 15 评论 ｜ 👍 6 ｜ OPEN
- 桌面端更新后，远程 headless Linux HPC 节点上的任务失去线程通信与委派能力，**直接破坏远程大规模工作流**。
- https://github.com/openai/codex/issues/42973

### ⑧ [Windows] 内置 LaTeX 编译器找不到标准目录
- **#48311** ｜ 12 评论 ｜ 👍 8 ｜ OPEN
- 即便是最简文档也无法产出 PDF，诊断信息仅有一行。与 #25220 同属 Windows 打包/环境变量问题族。
- https://github.com/openai/codex/issues/48311

### ⑨ Linux 沙箱：工作区含 2 个以上 deny 文件时 bwrap 报 "Bad file descriptor"
- **#43929** ｜ 8 评论 ｜ 👍 4 ｜ OPEN
- 1 个 deny 文件正常、2 个及以上必定崩溃。**边界条件精确可复现**，属于沙箱 deny 规则实现的确定性缺陷。
- https://github.com/openai/codex/issues/43929

### ⑩ Astra 长会话失控：单日记录 4.997 亿 token
- **#46140** ｜ 2 评论 ｜ OPEN
- 单线程单日消耗约 5 亿 token（两日约 10 亿），监督丢失、目标/停止循环失效。虽讨论量小，但**暴露长会话上下文与成本控制的系统性风险**，值得产品与计费团队关注。
- https://github.com/openai/codex/issues/46140

> 其他值得关注的 Issue：#43019（Windows `git diff --no-index` 每个未跟踪文件一次调用，约 4771 个文件时耗尽 commit 并崩溃）、#43776（Windows `.agents` 目录属主破坏沙箱与浏览器控制）、#49055（`Unsupported service_tier: flex`）、#49768（macOS 新建 Work/项目聊天缺少 Full access 控制）。

---

## 4. 重要 PR 进展（Top 10）

### 1. #49763 [0.160] 维护线目录与安全提醒回迁
将冻结的 0.160 候选版与 0.159 维护线对齐，包含 #49318（内置模型目录）、#49339（Bedrock 目录）、#49715（可选账号安全提醒）的干净 cherry-pick。
https://github.com/openai/codex/pull/49763

### 2. #49744 [0.159] 账号安全设置提醒回迁（随 0.159.3 发布）
本日报唯一已落地到稳定版的功能变更，涉及认证、陈旧账号、通知校验与 TUI 测试。
https://github.com/openai/codex/pull/49744 ｜ 上游：https://github.com/openai/codex/pull/49715

### 3. #49714 API-key 网络访问程序与模型发现解耦
允许 API-key 会话在 `features.api_key_cyber_access_programs` 开启时独立转发 cyber access programs，不再依赖 `api_key_model_discovery`。**企业/合规场景的能力门控更灵活**。
https://github.com/openai/codex/pull/49714

### 4. #49713 移除仓库内置的 Codex 指引、skills 与环境配置
删除根 `AGENTS.md`、`.codex/skills/` 及其脚本/测试、`.codex/environments/environment.toml`。属于**仓库自举配置的清理**，可能影响依赖这些本地 skill 的工作流。
https://github.com/openai/codex/pull/49713

### 5. #49690 在高权限 Windows 沙箱中保留 PowerShell 相对路径
通过向提权沙箱传递 `USERPROFILE`，修复用户配置文件目录不可访问时 PowerShell 无法保持工作目录的问题——与今日多项 Windows 沙箱 Issue 直接相关。
https://github.com/openai/codex/pull/49690

### 6. #49689 通过 OpenTelemetry 导出 skill 调用事件
新增 `codex.skill_invocation` 日志，覆盖显式注入、隐式识别与 skill-tool 读取，附带 skill 名、调用类型、会话、turn、模型、客户端元数据及作用域/插件 ID。**可观测性能力的重要补齐**。
https://github.com/openai/codex/pull/49689

### 7. #49686 向活跃 turn 投递远程消息板通知
使用与董事会工具相同的远程客户端与 session 身份启动 turn 级通知接收器，将帖子预览作为 agent 消息投递，并在 turn 停止/中止/出错时取消接收。
https://github.com/openai/codex/pull/49686

### 8. #49683 新增 in-app voice 托管功能门控
将 `in_app_voice` 注册为稳定的默认启用特性并纳入配置 schema，供托管要求控制桌面端语音权限（注意：权限不等于能力可用）。
https://github.com/openai/codex/pull/49683

### 9. #49701 / #49710 SQLite 损坏检测与类型化错误码
启动阶段检测数据库损坏并保留可用于恢复的备份（#49701）；用类型化错误码替代基于错误文本的字符串匹配来判断是否触发自动备份恢复（#49710）。**提升 CLI 启动失败的恢复能力与稳健性**。
https://github.com/openai/codex/pull/49701 ｜ https://github.com/openai/codex/pull/49710

### 10. 异步运行时性能加固批次（多个 PR）
- #49712：token 预算截断避免全串扫描，改用 UTF-8 边界查找；
- #49696：exec-server 文件读取分块可取消，保留 512 MiB 上限；
- #49694：rollout 列表扫描批量化到可取消的 blocking worker；
- #49708：session index I/O 移出 async 运行时线程。

这一组改动集中解决**同步 I/O 阻塞 async 运行时**的问题，是大文件 / 大量会话场景下的关键优化。
https://github.com/openai/codex/pull/49712 ｜ https://github.com/openai/codex/pull/49696 ｜ https://github.com/openai/codex/pull/49694 ｜ https://github.com/openai/codex/pull/49708

> 另有 #49704 为 npm alpha dist-tag 增加"禁止回退"保护，避免旧 alpha 覆盖新版本标签：https://github.com/openai/codex/pull/49704

---

## 5. 功能需求趋势

从今日 49 条 Issue 与 50 条 PR 的标签分布中，可提炼出以下方向：

| 方向 | 证据 | 趋势判断 |
|---|---|---|
| **Windows 平台质量** | `windows-os` 标签在 Top 30 Issue 中占比过半；#48043、#25220、#42739、#48311、#43019、#43776、#48896、#48372 | 当前最集中的质量洼地，涉及安装生态（MSIX/EFS）、沙箱提权、UI 渲染、Git 集成 |
| **远程 / 移动端配对** | `remote` + `auth` 标签：#48774、#48555、#36268、#49618、#42973 | Android ↔ 桌面端的认证状态机是独立的高频故障域 |
| **沙箱与权限控制** | #43929（bwrap deny）、#49768（缺 Full access）、#49088（--yolo 丢失）、#43776（.agents 属主） | 权限模型在跨平台、跨重启、跨会话下的一致性不足 |
| **子代理 / 多代理协作** | #40852、#42973、#34518、#40397、#49551 | 工具集在 code-mode、委派任务、headless 环境下不一致，是 agent 能力扩展的主要摩擦点 |
| **性能与资源控制** | #43019（diff fan-out 崩溃）、#46140（5 亿 token）、多组 async I/O PR | 长会话与大规模工作区的资源上限问题开始显性化 |
| **可观测性与运维** | #49689（OTel skill 事件）、#49701/#49710（SQLite 恢复） | 项目正补齐企业级可观测与故障恢复能力 |
| **功能门控与合规** | #49714（cyber access）、#49683（in-app voice）、#49763（模型/Bedrock 目录） | 托管式 feature gate 体系在持续扩张 |
| **账号安全** | #49715 / #49744（安全设置提醒） | 从"强制"转向"可选提醒"的温和引导策略 |

---

## 6. 开发者关注点

1. **升级即回归，信任成本高**
   #48043（0.157.0 无法启动）、#42739（Projects 消失）、#42973（远程工具丢失）、#40852（工具集缩减）都呈现同一模式：**新版本破坏既有能力，且无回滚提示**。用户被迫在 Issue 里互相传递"降级到 X 版本"的临时方案。

2. **Windows 是首要短板**
   从 EFS 加密路径、MSIX 包权限、守护进程权限到 UI 着色（#48372）、启动白屏（#48896），问题跨越安装、运行时与渲染三层。**建议官方设立 Windows 专项跟踪 Issue**。

3. **认证状态管理需要一次系统性重构**
   Android 配对相关的 5 条 Issue（#48774、#48555、#36268、#49618 等）指向同一根因：**跨账号、跨重装、跨设备的 pending enrollment 状态未正确清理或消费**，且多条 pending 记录并存。

4. **沙箱语义在不同平台/场景下不一致**
   `deny` 规则的数量（#43929）、提权时的相对路径（#49690）、重启后的 `--yolo` 保持（#49088）、新建聊天的 Full access 开关（#49768）都属于"同一概念、多种行为"，增加了开发者的心智负担。

5. **成本与上下文失控缺乏护栏**
   #46140 的 5 亿 token 单日消耗、#43019 的进程风暴，说明在长会话与超大工作区下**缺少硬性熔断与预算提示**。开发者需要可配置的 token/进程上限。

6. **错误信息不可操作**
   #31001（额度已耗尽但仪表盘显示正常）、#49055（`Unsupported service_tier: flex` 无解释）、#48311（LaTeX 仅一行诊断）反映**错误路径缺乏可执行指引**，拉长了自助排查链路。

---

*本日报由 GitHub 公开数据自动汇总生成，条目链接均指向 openai/codex 仓库原始内容。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 · 2026-10-01

数据来源：[github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 一、今日速览

今日 nightly 版本继续小幅迭代，核心修复集中在非交互模式下的自主计划执行与工具输出截断逻辑。社区侧最值得关注的是 **Agent/Subagent 可靠性**问题的集中爆发：子代理在触达 `MAX_TURNS` 后仍上报 `GOAL` 成功（#22323）、通用 agent 无限挂起（#21409）等 P1 问题持续发酵。PR 区则密集涌现一批 P1 稳定性修复，覆盖会话历史防丢失、`Ctrl+C` 中断失效、文件并发写竞态与工作区信任边界等高风险面。

---

## 二、版本发布

**v0.64.0-nightly.20260930.g38700b4b3**

- `fix(core)`：在非交互模式（non-interactive）下启用自主计划执行 —— 由 @urielefrenvirtusa 提交（[#29539](https://github.com/google-gemini/gemini-cli/pull/29539)）
- `fix(core)`：当 `maxChars <= 0` 时，`formatTruncatedToolOutput` 禁用截断 —— 由 @diegogodinezr 提交

> 简评：两项均为 core 层行为修正，前者改善 headless/脚本化场景下的 Agent 自主性，后者修正了一个边界条件导致输出被意外截断的问题，对依赖 `-p` 非交互模式的 CI 集成用户影响直接。

---

## 三、社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) 子代理 MAX_TURNS 中断被谎报为 GOAL 成功** `P1 · 13 评论`
   本日讨论度最高的 Issue。`codebase_investigator` 子代理在未做任何分析、因回合上限被截断的情况下，仍返回 `status: "success"` 与 `Termination Reason: "GOAL"`。这会直接污染上层 agent 的决策与用户判断，属于"静默失败"类缺陷，对多代理架构的可信度杀伤力最大。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) 通用 Agent 无限挂起** `P1 · 8 评论 · 👍8`
   社区共鸣度最高（8 个赞）。只要 CLI 委派给 generalist agent，连创建文件夹这类简单操作都会永久卡死，用户等待长达一小时。绕过方式是显式禁止使用子代理——这暴露出委派机制存在架构级隐患。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由** `P2 · 9 评论`
   提案核心：Gemini 3 模型原生擅长链式调用 `grep`/`sed`/`awk` 等 POSIX 工具，应通过 OS 级沙箱释放这一能力，同时不牺牲安全性与 UX。属于方向性设计讨论，代表官方对"bash 亲和力"产品化路径的探索。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取、搜索与代码映射（EPIC）** `P2 · 7 评论`
   跟踪多项调研：AST 感知工具能否更精确地读取方法边界、减少错位读取轮次与 token 噪声。这是当前 Agent 效率优化中最系统的技术路线图之一，与 #22746、#22747 构成完整议题簇。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 不会主动使用 skills 与子代理** `P2 · 6 评论`
   用户反馈：即使配置了 `gradle`、`git` 等自定义 skill 及其描述，模型在高度相关场景下几乎从不主动调用，必须显式指令才行。这直接影响 skills 生态的实际价值，是功能性（而非 bug 性）的能力缺口。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 覆盖配置** `P2 · 4 评论`
   `AgentRegistry` 在初始化时正确读取并合并了全局/项目级 `settings.json`，但 Browser Agent 完全无视 `maxTurns` 等覆盖项。配置系统与 Agent 运行时脱节，属于典型的"看起来生效实则无效"陷阱。

7. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数量超过 128 个触发 400 错误** `P2 · 3 评论`
   工具规模治理问题。当可用工具（含 MCP 扩展）膨胀到一定量级，API 直接返回 400。对于重度 MCP 用户，这是可扩展性的硬性天花板，期望 Agent 能更智能地按需裁剪工具范围。

8. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) Agent 应主动抑制破坏性操作** `P2 · 3 评论`
   模型在复杂 git 操作、分支管理中会使用 `git reset`、`--force` 等危险命令，即使存在更安全的替代方案；对数据库等资源的修改同样缺乏风险意识。安全边界议题，与今日的 workspace 信任修复 PR 形成呼应。

9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser 子代理在 Wayland 下失败** `P1 · 4 评论`
   Linux Wayland 环境下 browser subagent 直接失败。桌面环境兼容性问题长期存在，对 Linux 主力开发者群体体验影响明显。

10. **[#22741](https://github.com/google-gemini/gemini-cli/issues/22741) 支持将本地子代理转为后台任务（Ctrl+B）** `P3 · 👍2`
    用户希望把探索、构建、lint 等非阻塞型子代理任务丢到后台运行。这是多代理工作流走向"并发化"的关键交互能力，呼应 #18287（共享内存/并行子代理协作）的长期方向。

---

## 四、重要 PR 进展

1. **[#29520](https://github.com/google-gemini/gemini-cli/pull/29520) 保持滚动位置 + 分区 pending 高度预算** `P1/P2 · size/l`
   修复流式输出、工具确认提示、高度约束检查时视口滚动位置被重置的问题，确保用户在向上翻阅历史时视口稳定。交互流畅度类高优修复。

2. **[#29586](https://github.com/google-gemini/gemini-cli/pull/29586) 确保 Ctrl+C 紧急中止能触达取消处理器** `P2 · help wanted`
   修复输入处理缺陷：运行中的 agent 或流式响应期间，`Ctrl+C` 可能被吞掉或损坏，导致用户无法中断。这是本日最贴近"救命按钮"属性的修复。

3. **[#29584](https://github.com/google-gemini/gemini-cli/pull/29584) 修复恢复会话后快速退出导致历史被删除** `P1 · size/l`
   数据丢失级缺陷：恢复会话后若在提交提示前快速 `Ctrl+C` 或 `/exit`，会话历史文件会被永久删除。定位到两处根因，已修复（关联 #29198）。

4. **[#29568](https://github.com/google-gemini/gemini-cli/pull/29568) ChatRecordingService 引入 append-only 增量补丁与有界历史窗口** `P1 · size/xl`
   将全量 `{ $set: { messages } }` 重写替换为增量追加，并对内存中的消息保留量设界。对长会话的 I/O 开销、内存占用与卡顿均有结构性改善。

5. **[#29583](https://github.com/google-gemini/gemini-cli/pull/29583) 在不可信文件夹中强制只读工作区设置** `P1 · size/m/l`
   当 CLI 运行于未验证工作区时，对 `.gemini/settings.json` 施加确定性只读边界，防止 `gemini mcp add` 等写命令触发"因省略而覆盖"的破坏性同步。安全加固类关键 PR。

6. **[#29580](https://github.com/google-gemini/gemini-cli/pull/29580) 按精确 ID 解析会话并处理会话失败时的监听器清理** `P1 · 非交互`
   修复 ACP `session/load` 在恢复"无对话轮次的新建会话"时报 `Invalid session identifier` 的问题，同时完善事件监听器生命周期管理。

7. **[#29581](https://github.com/google-gemini/gemini-cli/pull/29581) 解析 @file:line 引用并修复 ghost text 换行死循环** `P2 · help wanted`
   修复两类场景：`@file:10`、`@file#L10-L25` 形式引用解析失败；终端宽度狭窄或含宽字符时 `InputPrompt` ghost text 换行陷入无限循环。

8. **[#29582](https://github.com/google-gemini/gemini-cli/pull/29582) 优化 ignore 过滤并启用子树剪枝** `P1 · size/l`
   通过分层目录状态记忆化、通配目录模式展开剪枝与 symlink/realpath 内存缓存，解决大型仓库（如含大量 `node_modules`）文件发现阻塞数秒的问题。

9. **[#29499](https://github.com/google-gemini/gemini-cli/pull/29499) 序列化文件工具操作并使写入原子化** `P1 · 已关闭`
   修复并发工具执行（尤其是并行子代理）下的文件竞态：同一路径的 read-modify-write 序列失去协调，造成静默丢更新与 diff 失真。已被关闭，需确认合并或替代方案。

10. **[#29578](https://github.com/google-gemini/gemini-cli/pull/29578) 为 Google 端点请求离线访问并在刷新时保留 clientSecret** `size/m`
    修复远程 MCP 服务器配置 Google Workspace OAuth（Docs/Sheets/Slides/Drive）时首次登录拿不到 refresh token、后台刷新失败的问题。

> 另有值得留意的进展：[#29457](https://github.com/google-gemini/gemini-cli/pull/29457) 用 glob 匹配替换模糊的 `requestedExplicitly` 逻辑（修复二进制资源被误读导致的上下文膨胀）、[#29525](https://github.com/google-gemini/gemini-cli/pull/29525) 禁止从请求体 `agentSettings` 推导工作区信任、[#29432](https://github.com/google-gemini/gemini-cli/pull/29432) 调度器释放时结算排队工具调用。

---

## 五、功能需求趋势

从本期 48 条更新 Issue 中可提炼出以下六条主线：

| 方向 | 代表 Issue | 核心诉求 |
|---|---|---|
| **Agent/Subagent 可靠性** | #22323、#21409、#22232、#21763 | 终止原因如实上报、避免无限挂起、失败可恢复、子代理上下文可追溯 |
| **代码检索智能化与 token 节约** | #22745、#22746、#22747、#19561 | AST 感知读写、分层检索（grep → 精确读取）、抑制上下文 firehose |
| **安全与权限边界** | #22672、#18397、#19873 | 抑制破坏性命令、按工作区粒度管理策略、OS 级沙箱 |
| **Browser Agent 健壮性** | #22267、#22232、#21983 | 配置覆盖生效、会话接管与锁恢复、Wayland 兼容 |
| **多代理协作与持久化** | #18287、#22741、#18836、#22598 | 并行子代理共享内存、后台化、文件级任务追踪、轨迹可分享 |
| **终端体验与性能** | #21924、#23313、#22466 | resize 无闪烁、评测稳定化、转义字符处理 |

一个明显信号是：**「Agent 可观测性」正在成为一个独立诉求簇**（#22598 轨迹分享、#21763 子代理上下文入 bug report、#21432 Agent 自我认知），社区不再只要求 agent"能干活"，而是要求它"干了什么能被查证"。

---

## 六、开发者关注点

- **静默失败与数据丢失是最高敏感区**。今日 Top Issue 与 Top PR 高度重合于同一主题：会话历史被误删（#29584）、子代理误报成功（#22323）、文件并发写丢更新（#29499）。开发者对"看起来成功了但实际没成功"的容忍度极低。

- **中断能力必须绝对可靠**。`Ctrl+C` 在流式输出与 agent 运行期间失效（#29586、#29557）反复出现，属于会直接动摇用户信任的基础性缺陷。

- **上下文成本仍是核心痛点**。当前每轮上下文基线约 36.6k tokens（#19561），大文件读取可再增 15k/轮。围绕 token 节约的提案（Tactful Extraction、AST 感知、glob 精确匹配）构成最活跃的技术路线讨论。

- **配置系统的"最后一公里"失效**。`settings.json` 被读取却不被下游 Agent 消费（#22267）、symlink 形式的 agent 定义不被识别（#20079），反映出配置解析与运行时消费之间的断层。

- **工作区整洁度是隐性痛点**。模型倾向在随机目录生成临时编辑脚本（#23571），给提交前的清理带来显著负担。

- **跨平台兼容性欠账仍多**。Windows 文件锁 `EBUSY`（#19013）、Wayland 下 browser 子代理失败（#21983）、不含 Kitty 协议的终端中 Enter/Space 确认失效（#29502），说明平台适配仍需系统性投入。

- **交互式提示阻塞自动化**。创建 vite app 时卡在交互式提示（#22465）、创建文件夹即挂起（#21409），暴露出 agent 在遇到需要标准输入的子进程时缺乏兜底策略。

---

*日报生成时间：2026-10-01 · 数据窗口：过去 24 小时*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报（2026-10-01）

## 1. 今日速览

Reasonix Studio v2.23.0 正式发布，终端 diff 差异视图、模型服务空闲超时和市场安装改进是本次亮点。社区围绕 MCP 工具治理、UI 本地化、Claude Skills 兼容性展开密集讨论；PR 侧则集中在冷启动修复、网络加速、本地调用指标等方向。

## 2. 版本发布

### studio-v2.23.0

本版主要更新：

- **终端差异视图**：终端中的 diff/patch 代码块，以及整段输出就是 diff 的命令结果，会渲染为差异视图，并支持通过 `[cli].diff_formatter` 指定外部格式化命令（#11201 by @BuGlessRB）。
- **模型服务空闲超时**：可为每个模型服务单独设置 `idle_timeout_seconds`，超时后中止等待（#11258 by @BuGlessRB）。
- **市场安装策略**：已批准但未固定版本的包，在用户明确表示信任后可以安装；更新优先走镜像并支持续传。

链接：https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.23.0

## 3. 社区热点 Issues

1. **[OPEN] #11434 Reasonix Studio 无法启动（Windows）**  
   首次打开客户端报错 `the kernel sent no handshake`，再次打开可正常使用。该问题直接影响 Windows 用户日常启动体验，已有 4 条评论讨论。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/11434

2. **[CLOSED] #11392 希望为每个模型 ID 单独设置上下文大小**  
   当前上下文大小按供应商统一设置，无法按模型 ID 实际能力区分。该需求获得 3 条评论，已关闭，表明配置灵活性是 provider 层的重要方向。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/11392

3. **[CLOSED] #5444 为 MCP 服务器增加 per-plugin `disabled_tools` 过滤**  
   MCP 服务器暴露的工具过多时，工作区无法抑制单个工具。该 Issue 从 6 月持续到 9 月底，最终关闭，反映 MCP 工具治理的长期需求。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/5444

4. **[CLOSED] #11383 自动化规则下拉列表信息希望中文化**  
   设置 → 自动化 → 添加规则的下拉列表仍显示英文。社区对 UI 本地化的诉求持续存在，该 Issue 当天关闭。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/11383

5. **[CLOSED] #11378 无法安装 ppt-master 技能（Windows）**  
   在 Windows 上安装技能时失败，附有截图。技能安装链路在 Windows 平台的兼容性值得关注。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/11378

6. **[OPEN] #11464 自动 UI 本地化：浏览器渲染提取 + AI 翻译（fail-closed）**  
   提出静态扫描无法覆盖模板拼接、条件渲染、webview 硬编码字符串等问题，建议用浏览器渲染提取 + AI 翻译实现自动本地化。方案系统性强，有助于根治 UI 多语言滞后。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/11464

7. **[OPEN] #11463 通过单个 MCP 桥接暴露 VS Code 扩展生态**  
   希望 Reasonix 能复用 VS Code 海量扩展（格式化、lint、重构、图表等），而不是为每个插件重新实现。若落地将极大扩展 Reasonix 的 IDE 能力边界。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/11463

8. **[CLOSED] #11457 IS — 只读源码解释器（只解释代码，不做其他事）**  
   当前“理解代码”依赖把源码塞进上下文，token 成本高且结果不可复现。提出只读源码解释器，按需解释代码。该设计有望改善代码理解场景的 token 效率与可复现性。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/11457

9. **[OPEN] #11473 MCP disabled_tools 后续：项目条目覆盖用户列表、无类型拒绝、静默拼写错误**  
   来自 #11468 评审的跟进问题：项目级 `reasonix.toml` 或 `.mcp.json` 会静默替换用户条目并丢弃 `disabled_tools`。该问题由 @esengine 提出，涉及配置合并优先级与错误提示，需尽快修复。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/11473

10. **[CLOSED] #11347 Skills: `disable-model-invocation: true` 被忽略，手动技能变成模型可调用**  
    Claude 风格仓库中标记为仅手动调用的技能，在 Reasonix 中会变成自动可调用。这属于 Claude Skills 兼容性缺口，社区关注度较高。  
    https://github.com/esengine/DeepSeek-Reasonix/issues/11347

## 4. 重要 PR 进展

1. **[OPEN] #11479 fix(studio): 冷启动内核等待更久、早期退出重试一次并标明原因**  
   直接针对 #11434：首次启动 handshake 超时，第二次正常。延长冷启动等待时间，并对早期退出做一次重试，同时给出明确原因。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/11479

2. **[OPEN] #11475 feat(mcp): 支持基于同意的 URL elicitation**  
   MCP 服务器返回 URL 模式 elicitation 时不再直接失败，而是通过现有 Ask 通道让用户完成外部步骤，并为现代 HTTP 与旧版 MCP 传输声明 `form` 与 `url` 能力。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/11475

3. **[OPEN] #11471 feat(hostmetrics): 本地调用统计（次数、耗时百分位、成功率）**  
   新增 `internal/hostmetrics`，按 `subsystem.operation` 记录调用次数、成功/失败、p50/p95/max/avg 耗时。为加速、下载、本地化等模块提供可观测性基础。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/11471

4. **[OPEN] #11470 feat(netaccel): 客户端网络加速（端点探测 + 多连接下载）**  
   新增 `internal/netaccel`，包含端点池探测、排序、URL 重写，以及支持分片续传的多连接 `Range` 下载。无需 Reasonix 托管服务，直接提升客户端网络体验。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/11470

5. **[CLOSED] #11468 feat(studio): 支持禁用单个 MCP 工具**  
   为每个 MCP 服务器增加 `disabled_tools`，使用原始 `tools/list` 名称，在命名空间处理前过滤，确保工具不进入注册表、模型内容、能力目录等。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/11468

6. **[OPEN] #11356 feat(provider): 按项目设置 cachecontext user id 与 session_id**  
   增加顶层、按工作区的 `cachecontext`，作为 DeepSeek `user_id`（Anthropic `metadata.user_id` / OpenAI `user`）发送，并在 OpenAI 兼容线上传递 OpenRouter `session_id`。`auto` 值可从工作区键推导稳定 ID。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/11356

7. **[CLOSED] #11357 feat(cli): 多题问询答完最后一题自动提交，由 `auto_submit` 控制**  
   多问题 ask 批次全部答完后立即提交，跳过额外确认；未答完则跳转到第一个未回答问题。由新顶层配置 `auto_submit` 控制。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/11357

8. **[OPEN] #11458 feat(studio): 持久化手动项目排序，且不改变启动项目**  
   为记住的项目菜单增加“上移/下移”，并从宿主返回保存的顺序。实现 #11420 的项目排序阶段，后续会单独处理会话排序与拖拽控制。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/11458

9. **[CLOSED] #11446 feat(studio): 反馈对话框增加回复线程、需输入提示与未读徽章**  
   为双向反馈闭环提供 Studio UI（RFC #11424），反馈回执、Issue 链接及官方回复/提问会出现在“我的反馈”下，并支持未读提醒。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/11446

10. **[CLOSED] #11454 fix(studio): 本地化自动化事件标签**  
    自动化事件下拉框和只读插件规则此前只显示 `PreToolUse`、`Stop` 等运行时 ID，现在会并列显示所有 14 个规范事件 ID 的本地化标签。  
    https://github.com/esengine/DeepSeek-Reasonix/pull/11454

## 5. 功能需求趋势

从近期 Issues 与 PR 可以提炼出以下方向：

- **MCP 生态与工具治理**：`disabled_tools`、MCP 桥接 VS Code 扩展、URL elicitation、配置合并优先级等密集出现，表明 MCP 已成为社区扩展能力的核心抓手，工具可见性与权限控制是刚需。
- **国际化与本地化**：从自动化下拉中文化，到自动 UI 本地化方案，社区对多语言 UI 的诉求从“个别翻译”升级为“系统性提取 + AI 翻译”。
- **模型配置灵活性**：按模型 ID 设置上下文大小、按项目设置 cachecontext user_id/session_id，说明 provider 层需要更细粒度的配置能力。
- **性能可观测与网络加速**：hostmetrics（调用统计、耗时百分位）和 netaccel（端点探测、多连接下载）同时推进，反映对本地性能与网络稳定性的关注。
- **Claude Skills 兼容性**：`user-invocable`、`argument-hint`、`disable-model-invocation` 等 frontmatter 被忽略，社区希望 Reasonix 能更完整地兼容 Claude 技能生态。
- **代码理解与 token 效率**：只读源解释器提案试图降低“理解代码”的 token 成本并提升可复现性，代表 agent 场景下的新探索。

## 6. 开发者关注点

- **Windows 冷启动稳定性**：`the kernel sent no handshake` 首次启动失败、二次成功，是当前最典型的平台稳定性痛点，PR #11479 已着手修复。
- **MCP 配置合并的静默覆盖**：项目级配置会覆盖用户 `disabled_tools` 且不报错，拼写错误也静默忽略，开发者需要更明确的冲突提示与合并策略。
- **Skills 行为与 Claude 不一致**：手动技能被自动调用、参数提示丢失，影响从 Claude 生态迁移的用户体验。
- **UI 本地化滞后**：自动化规则下拉、事件标签等仍显示英文，手动翻译无法跟上迭代，催生了自动本地化需求。
- **安装与更新链路**：技能安装失败（如 ppt-master）、市场跨 runtime 状态残留、更新时控件状态不清等，说明安装/更新流程的健壮性仍需加强。
- **配置粒度不足**：上下文大小按供应商统一设置、cachecontext 无法按项目区分，开发者希望获得更细粒度的 provider 与工作区配置。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报（2026-10-01）

## 1. 今日速览

过去 24 小时，OpenCode 发布 v1.18.34，重点修复模型请求中的 session / parent-session 身份头缺失，并补齐 macOS 二进制签名，确保 macOS 27+ 可用。社区讨论集中在插件 API 能力缺口、Go provider 缺少 `x-opencode-session` 导致 400、V1→V2 会话迁移冲突，以及 Agent 无限重试/子代理错误误报等可靠性问题。PR 侧继续推进 GUI 扩展化、插件暴露 session 压缩与删除、模型兼容性和 shell 中断回滚。

---

## 2. 版本发布

### v1.18.34

- **Core Bugfixes**
  - 模型请求现在会发送 namespaced session 和 parent-session identity headers。
  - 重新签名本地编译的 macOS 二进制，确保在 macOS 27+ 上可靠运行。
  - 使用 Developer ID 签名 macOS CLI release 二进制。
- 官方感谢 3 位社区贡献者（数据中未展示具体账号）。
- 链接：https://github.com/anomalyco/opencode/releases/tag/v1.18.34

---

## 3. 社区热点 Issues（10 个）

1. **#49389 [OPEN] 插件无法访问 5 个核心 session 能力**  
   作者：@ualtinok｜评论：12｜👍：4  
   插件生态关键缺口：session 枚举、隐藏/临时会话、压缩、删除等核心能力存在但插件不可达。社区讨论最热烈，已有 PR 分项回应。  
   链接：https://github.com/anomalyco/opencode/issues/49389

2. **#47763 [OPEN] Go provider 400 MissingSessionID，未发送 x-opencode-session**  
   作者：@vvn6d4zg82-byte｜评论：3｜👍：9  
   影响 OpenCode Go provider 的路由与订阅使用，报错为缺少 `x-opencode-session`。高赞说明影响面较大。  
   链接：https://github.com/anomalyco/opencode/issues/47763

3. **#50594 [OPEN] serve 文件监听重注册风暴导致服务进程终止**  
   作者：@caimf1991｜评论：2  
   批量写入 skills 目录时，后台服务进入文件监听风暴并终止。影响自托管/后台服务稳定性。  
   链接：https://github.com/anomalyco/opencode/issues/50594

4. **#52372 [CLOSED] Agent 无限重试失败工具调用，缺少熔断**  
   作者：@surapuramakhil｜评论：2  
   子代理读取无法渲染的图片时，连续 100+ 次近似重试，而不是失败切换。核心代理可靠性问题，已关闭处理。  
   链接：https://github.com/anomalyco/opencode/issues/52372

5. **#52378 [OPEN] subagent 失败被上报为成功完成**  
   作者：@rebelliard｜评论：2  
   子代理以 `finish:"error"` / `MALFORMED_FUNCTION_CALL` 和空内容结束，父会话却视为成功。错误传播正确性问题。  
   链接：https://github.com/anomalyco/opencode/issues/52378

6. **#52395 [OPEN] V1 创建的 session 在 V2 继续时触发 UNIQUE constraint on event seq**  
   作者：@edward-ong-tiliter｜评论：1  
   从 1.18.20 升级到 2.0.20 后，旧会话事件序列冲突导致永久失败。升级兼容性与数据迁移痛点。  
   链接：https://github.com/anomalyco/opencode/issues/52395

7. **#52394 [OPEN] GET /api/location 对客户端本地目录返回空 500，破坏 opencode run --server**  
   作者：@kunwar-vp｜评论：1  
   客户端 cwd 在服务端不存在时，`opencode run --server` 在创建 session 前失败。远程/服务端模式阻塞项。  
   链接：https://github.com/anomalyco/opencode/issues/52394

8. **#52390 [OPEN] MCP local schema 的 $ref 在 Nemotron/Qwen 下变成字符串化对象参数**  
   作者：@itayzit｜评论：1  
   嵌套对象经 `$ref` 描述后可能以 JSON 字符串到达，导致工具校验失败。影响新模型兼容性。  
   链接：https://github.com/anomalyco/opencode/issues/52390

9. **#52393 [CLOSED] Zen free tier 在 Desktop v1.18.33 上错误要求 “OpenCode 1.18.0 or newer”**  
   作者：@diegovelezg｜评论：3  
   版本号明明更新，但免费层仍被拒绝，影响所有 `-free` Zen 模型。版本判断逻辑问题。  
   链接：https://github.com/anomalyco/opencode/issues/52393

10. **#51638 [OPEN] Desktop 2.0.18 更新后 /compact slash command 缺失**  
    作者：@benizzio-opencode｜评论：3  
    手动压缩命令从斜杠菜单消失，属于桌面端功能回归，影响日常会话管理。  
    链接：https://github.com/anomalyco/opencode/issues/51638

---

## 4. 重要 PR 进展（10 个）

1. **#52369 [OPEN] refactor(app): 将 GUI 功能迁入内置扩展**  
    桌面端与 Web 端除核心会话循环外的功能，改为通过统一 SDK 以内置 GUI 扩展形式发布，保留通用宿主概念。架构层面重要变化。  
    链接：https://github.com/anomalyco/opencode/pull/52369

2. **#52387 [CLOSED] feat(plugin): 暴露 session removal**  
    对应 #49389 第 2 项，将已有 `session.remove` 操作暴露给 Effect 和插件 API。  
    链接：https://github.com/anomalyco/opencode/pull/52387

3. **#52385 [OPEN] feat(plugin): 暴露 session compaction**  
    对应 #49389 第 1 项，将 `session.compact` 暴露给插件，补齐手动压缩能力。  
    链接：https://github.com/anomalyco/opencode/pull/52385

4. **#52391 [OPEN] fix(opencode): 为 Nemotron 和 Qwen 内联 tool schema refs**  
    修复 MCP 参数中 `$ref` 被模型输出为 JSON 字符串的问题，直接回应 #52390。  
    链接：https://github.com/anomalyco/opencode/pull/52391

5. **#52386 [OPEN] fix(core): 回滚被中断的 shell 获取**  
    当调用方在 `Shell.create` 注册后、交接前被中断时，回滚进程管理器，防止孤儿进程。关联 #48838。  
    链接：https://github.com/anomalyco/opencode/pull/52386

6. **#52388 [CLOSED] fix(ai): 使模型能力默认值前向兼容**  
    对 GPT 主版本 >= 6、GLM >= 4.6 等默认开启对应能力，同时保留显式覆盖。减少新模型接入时的手工配置。  
    链接：https://github.com/anomalyco/opencode/pull/52388

7. **#52384 [OPEN] fix(github): 使用 share API 返回的 URL**  
    GitHub agent 页脚此前自行拼接 `opencode.ai/s/<short-id>` 导致 404，现改为使用 share API 返回值。  
    链接：https://github.com/anomalyco/opencode/pull/52384

8. **#52382 [OPEN] fix(core): 跳过直接读取指令文件的自动复制**  
    读取 `AGENTS.md` 时不再自动添加同一文件的副本，避免指令重复加载，适用于完整和部分读取。  
    链接：https://github.com/anomalyco/opencode/pull/52382

9. **#50844 [OPEN] fix: 支持自托管 GitLab Duo 工作流**  
    GitLab provider 现在使用配置的实例地址，修复自管理 GitLab 实例上的 Duo 工作流。  
    链接：https://github.com/anomalyco/opencode/pull/50844

10. **#43069 [OPEN] feat(cli): 增加 no-auth serve 选项**  
    新增 `opencode serve --no-auth` 和 `OPENCODE_AUTH=false`，默认仍启用认证，支持无密码管理服务注册。  
    链接：https://github.com/anomalyco/opencode/pull/43069

---

## 5. 功能需求趋势

- **插件 API 补全与扩展化**：社区希望核心 session 能力（压缩、删除、枚举、隐藏/临时会话等）全面暴露给插件；GUI 功能也在向内置扩展迁移。代表：#49389、#52385、#52387。
- **Provider 兼容与路由稳定性**：`x-opencode-session` / parent-session 头缺失、Zen free tier 版本判断、OpenAI Enterprise、Go 订阅、GitLab Duo 自托管、Nemotron/Qwen schema 处理。代表：#47763、#52393、#52390、#50844。
- **代理与子代理可靠性**：无限重试、错误误报成功、缺少熔断、shell 中断进程泄漏。代表：#52372、#52378、#48838。
- **升级与数据迁移**：V1 创建的 session 在 V2 继续时出现事件序列唯一约束冲突，升级路径需要更稳健。代表：#52395。
- **服务端/远程模式稳定性**：文件监听风暴、`GET /api/location` 500、`opencode run --server` 失败。代表：#50594、#52394。
- **桌面端体验与回归**：`/compact` 缺失、更新降级、Markdown 加粗权重、主题请求（ZenBlue）。代表：#51638、#52396。
- **配置与权限**：MCP `--global` 写入位置错误、foreground-only subagents 配置、no-auth serve、权限请求 `always` 选项。代表：#49904、#52379、#43069、#46302。
- **支付与额度**：免费层版本限制、购买 credits 后无法使用。代表：#52393、#52380。

---

## 6. 开发者关注点

- **会话身份头传播是当前高频痛点**：多个 provider 请求因缺少 `x-opencode-session` / parent-session 失败，v1.18.34 已修复核心路径，但相关 issue 仍在跟进。  
  代表：#47763、#52192、v1.18.34。
- **版本与兼容性判断混乱**：桌面端、CLI、Zen 免费层对版本号判断不一致；V1/V2 session 迁移出现唯一约束冲突。  
  代表：#52393、#52395、#49944。
- **代理可靠性需要系统级防护**：无限重试、子代理错误被吞、shell 中断后进程泄漏，开发者希望有熔断、正确错误传播和资源回收。  
  代表：#52372、#52378、#48838、#52386。
- **插件生态核心能力不可达**：插件开发者无法从 API 调用已有 session 操作，PR 正在逐项暴露。  
  代表：#49389、#52385、#52387。
- **服务端与远程模式稳定性不足**：文件监听风暴、location API 500、MCP 进程树清理等问题影响自托管和远程运行。  
  代表：#50594、#52394、#46312。
- **企业/付费用户体验待改善**：OpenAI Enterprise 连接失败、Zen credits 购买后无法使用、免费层误判版本。  
  代表：#52392、#52380、#52393。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报｜2026-10-01

> 数据源：NousResearch/hermes-agent  
> 窗口：过去24小时（以 2026-09-30 更新为准）

## 1. 今日速览

今日无新 Release。社区讨论集中在桌面端会话状态一致性：多会话 stale-send、重复渲染、profile 切换记忆、更新器协议不匹配。PR 侧活跃，出现 P0 Discord relay 修复、P1 桌面与网关性能修复，以及 Windows 浏览器后端、凭证安全、本地 GPU 探测等改进。

## 2. 版本发布

无。

## 3. 社区热点 Issues

> 过去24小时共 8 条 Issue 更新，以下为全部重点条目。

1. **#129740 [P1] Desktop stale-send guard 多会话下循环拒发**  
   一个桌面窗口开启四个并发会话时，向空闲会话发送消息会被 stale-send guard 循环拒绝，只能 fork 逃生。属于 P1 会话状态问题，直接影响多会话工作流。已有同窗口修复 PR #129741。  
   https://github.com/NousResearch/hermes-agent/issues/129740

2. **#118070 [P2] 打包版 Desktop 更新器可造成 backend/client 协议不匹配，审批交互失效**  
   Python backend 被更新到需要新协议，但 Electron 包未同步更新，应用看似可用，实际 server→client 交互审批失败。升级路径风险较高。  
   https://github.com/NousResearch/hermes-agent/issues/118070

3. **#129731 [P2] Desktop final answer 在 narration → tool → answer 轮次重复渲染**  
   重复渲染在关闭/重开 session 后仍存在，但 DB 只有一行，说明 UI/持久层状态不一致。影响用户对会话结果的信任。  
   https://github.com/NousResearch/hermes-agent/issues/129731

4. **#129744 [P2] Windows elevated 启动导致浏览器后端静默失败并泄漏孤儿 Chrome**  
   Windows 11 下以管理员权限运行 Hermes 时，Chrome 退出 rc=0 且无输出，browser 后端失败；agent-browser 还会泄漏孤儿 Chrome。已有 PR #129745 修复。  
   https://github.com/NousResearch/hermes-agent/issues/129744

5. **#116085 [P3] Vault 允许 registrable-domain / eTLD+1 凭证来源匹配**  
   Vault 凭证目前绑定单一 exact origin，导致在 `naver.com` 保存的登录无法用于实际承载登录表单的子域。涉及安全边界与可用性权衡，标记 needs-decision。  
   https://github.com/NousResearch/hermes-agent/issues/116085

6. **#129426 [P3 security] npm audit 现场报告：现有修复目标已过时**  
   报告 root、`web`、`ui-tui` 三棵依赖树的 audit 发现，涉及 brace-expansion ≥5.0.12、undici ≥6.28.1/7.29.1、vitest ≥4.1.11、yaml ≥2.8.3 等。供应链安全需持续跟进。  
   https://github.com/NousResearch/hermes-agent/issues/129426

7. **#77952 [P3] Desktop 切换 profile 后恢复上次选中 session**  
   从 profile A 切到 B 再切回 A 时，Desktop 打开新聊天或保留当前上下文，而不是恢复该 profile 上次会话。评论数 5，是今日评论较多的体验类需求。  
   https://github.com/NousResearch/hermes-agent/issues/77952

8. **#70732 [CLOSED] 运行时 i18n 遗漏平台适配器硬编码字符串与提示，意大利语翻译已准备贡献**  
   `display.language` 与 `locales/*.yaml` 覆盖不全，Telegram 等平台适配器仍有高可见度英文硬编码。Issue 已关闭，社区贡献意愿明确。  
   https://github.com/NousResearch/hermes-agent/issues/70732

## 4. 重要 PR 进展

> 从过去24小时更新的 50 条 PR 中挑选重点 10 条。

1. **#129741 [P1] fix(desktop): stale send guard 前先比较持久化行身份**  
   修复桌面多会话下 stale-send guard 误判：先以 durable row identity 为准，再比较渲染消息数，避免 transcript refresh 被误认为新 peer window。  
   https://github.com/NousResearch/hermes-agent/pull/129741

2. **#128797 [P0] fix(relay): 转发的 Discord interaction 携带文本 lane 的 chat/user 标签**  
   转发 slash command / component 时此前丢失 `chat_name`、`chat_topic`、`user_display_name`，导致同一 session 中上下文渲染不一致。  
   https://github.com/NousResearch/hermes-agent/pull/128797

3. **#129745 [P2] fix(browser): 拒绝 elevated Windows 启动并回收超时进程树**  
   对应 #129744：在 elevated 进程下不再尝试启动 Chrome，返回可操作错误；同时清理 agent-browser 超时后的完整进程树。  
   https://github.com/NousResearch/hermes-agent/pull/129745

4. **#112142 [P2 security] fix(gateway): 媒体凭证 denylist 覆盖平台原生 ~/.hermes**  
   修复当 `HERMES_HOME` 位于 `$HOME` 之外时，媒体交付可能泄漏凭证的问题。  
   https://github.com/NousResearch/hermes-agent/pull/112142

5. **#80927 [P3 security] fix(security): 自定义 endpoint API key 改用 key_env，避免写入 config.yaml**  
   修复桌面 model-assignment 流程将 API key 明文写入 `config.yaml` 的问题。  
   https://github.com/NousResearch/hermes-agent/pull/80927

6. **#129322 [P1 perf] fix: 防止 lifecycle guard 与审批规则中的全局 flag 正则回溯**  
   修复 #129281 网关冻结问题，覆盖终端路径上的 profile-flag 扫描与危险命令规则。  
   https://github.com/NousResearch/hermes-agent/pull/129322

7. **#94367 [P3 feature] Workflows：编写并运行 agent graph 的 opt-in 插件**  
   支持 agent、gate、human approval、wait、trigger 等步骤；cron、inbound webhooks、CLI 与 workflow tool 共用同一 runner。  
   https://github.com/NousResearch/hermes-agent/pull/94367

8. **#104345 [P2] fix(chat-completions): 为 Gemini 目标注入 thought_signature sentinel**  
   修复从非 Gemini 模型回退并重放无 thought signature 工具调用时，Gemini 3.x 返回 HTTP 400 的问题。  
   https://github.com/NousResearch/hermes-agent/pull/104345

9. **#129747 [P2] fix(gateway): authored `platforms.<plat>.extra` 优先于顶层 platform block**  
   修复 YAML 平台配置冲突时，显式 `platforms.<platform>.extra` 被静默覆盖的问题，影响 Telegram/Discord/Slack 等平台适配。  
   https://github.com/NousResearch/hermes-agent/pull/129747

10. **#129750 fix(local-runtime): 为 auto backend 检测 Intel 与 AMD GPU**  
    当 `nvidia-smi` 不提供详细 NVIDIA 名称时，使用跨平台 GPU 探测；本地运行时 `auto` 可在 Intel/AMD 上选择 Vulkan，而非静默回退 CPU。  
    https://github.com/NousResearch/hermes-agent/pull/129750

## 5. 功能需求趋势

- **桌面会话状态与多窗口一致性**：恢复上次会话、stale-send、重复渲染、更新器协议不匹配。代表：#129740、#129731、#77952、#118070、#129741。
- **安全与凭证管理**：Vault eTLD+1、API key 不明文落盘、媒体凭证 denylist、npm audit。代表：#116085、#80927、#112142、#129426。
- **平台配置与国际化**：Telegram/Discord/Slack 配置优先级、运行时 i18n 硬编码字符串。代表：#129747、#128797、#70732。
- **Windows/跨平台稳定性**：管理员启动浏览器后端失败、孤儿 Chrome、Linux GPU fallback、Intel/AMD GPU 自动选择。代表：#129744、#129745、#129750、#124898。
- **模型兼容与本地运行时**：Gemini thought_signature、本地推理 GPU 探测。代表：#104345、#129750。
- **可靠性与性能**：正则回溯导致网关冻结、Cron 失败恢复、压缩记账。代表：#129322、#129748、#129749。
- **插件生态**：Workflows agent graph、Plugin Catalog 增加 gh-ref/osv-ref/wiki-ref、TUI `/keys`。代表：#94367、#128615、#128540、#128257、#129743。

## 6. 开发者关注点

- **桌面端多会话状态同步是最高频痛点**：发送守卫误判、重复渲染、profile 切换丢失上下文，都指向 UI 层与持久层状态不一致。代表：#129740、#129731、#77952。
- **Windows 浏览器后端在 elevated 上下文静默失败**，并可能泄漏孤儿 Chrome，影响 Windows 自动化可靠性。代表：#129744、#129745。
- **安全默认值仍需加强**：自定义 endpoint key 写入 `config.yaml`、媒体交付凭证 denylist 覆盖外置 `HERMES_HOME`、Vault 域匹配过严。代表：#80927、#112142、#116085。
- **供应链审计需持续更新**：npm audit 新 advisory 使现有修复目标过时，涉及 brace-expansion、undici、vitest、yaml 等。代表：#129426。
- **网关配置优先级影响平台行为**：显式 `platforms.<plat>.extra` 被顶层 block 覆盖，容易造成 Telegram/Discord/Slack 配置不符合预期。代表：#129747。
- **性能与稳定性风险**：正则全局标志回溯可冻结网关；Cron worker 失败未充分暴露；压缩修复影响长会话成本与一致性。代表：#129322、#129748、#129749。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 — 2026-10-01

## 1. 今日速览

OpenClaw 发布 **v2026.9.7**，规模达 518 direct commits、2,818 PRs、334 contributors。但社区焦点不在功能扩展，而在 **Gateway 生命周期与运行时稳定性**：Windows 升级 Doctor 卡顿、Gateway 启动阻塞触发重启循环、macOS 睡眠唤醒后模型运行时发布失败、僵尸进程泄漏等问题集中出现。PR 侧则有多 agent 队列隔离、session list 卡顿、CLI exec 密钥代理、Codex session link、Telegram 进度恢复等关键修复推进。

---

## 2. 版本发布

**v2026.9.7 已发布。**

- 版本：`openclaw 2026.9.7`
- 规模：518 direct commits · 2,818 pull requests · 334 contributors
- 发布说明与 changelog 内容相同，以两种格式提供。
- Release 页面：https://github.com/openclaw/openclaw/releases/tag/v2026.9.7
- 文档发布说明：https://docs.openclaw.ai/rel

---

## 3. 社区热点 Issues

> 过去 24 小时更新 Issues 共 8 条，以下全部列出；今日数据不足 10 条，按优先级与影响面排序。

1. **#97616 [OPEN][P1] 僵尸进程泄漏导致运行时退化**  
   Hook/tool 子进程未被回收，`openclaw-hooks`、`bash`、`codex` 等进程逐步累积为 zombie，关联 message-loss 与 crash-loop。社区已有 16 条评论、1 个 👍，属于长期回归问题，需要维护者评审。  
   https://github.com/openclaw/openclaw/issues/97616

2. **#158592 [OPEN] 主机睡眠唤醒后模型运行时发布超时且无法恢复**  
   macOS 睡眠约 60 分钟后，Gateway 的 wake-recovery 刷新某个 agent 的 model runtime 失败，此后所有入站消息均报 “runtime owner was not published”，直到重启 Gateway。影响生产可用性。  
   https://github.com/openclaw/openclaw/issues/158592

3. **#162047 [OPEN][P0] Windows 2026.9.7 升级在 Doctor 中卡 35 分钟以上**  
   Windows npm 从 2026.9.6 升级到 2026.9.7 时，Doctor 耗时 39 分 15 秒，CPU profile 显示 82.7% 样本集中在硬链接命名空间校验。标签包含 `impact:ux-release-blocker`，属于发布阻塞级问题。  
   https://github.com/openclaw/openclaw/issues/162047

4. **#161361 [CLOSED][P2] Session 菜单按 Enter 误把会话分配给自己**  
   鼠标指针停在 “Assign to…” 上按 Enter，会无确认地把 session 分配给自己。该问题随 2026.9.6 的搜索式分配菜单引入，目前已关闭。属于典型 UI/UX 回归。  
   https://github.com/openclaw/openclaw/issues/161361

5. **#162209 [OPEN] 更新失败：candidate-state-snapshot 2026.9.6**  
   用户报告 darwin/arm64、Node 26.7.0 下 CLI 更新失败，并附有 OpenClaw 更新失败报告标识。影响升级路径可靠性。  
   https://github.com/openclaw/openclaw/issues/162209

6. **#126688 [CLOSED][P2] tts 工具不属于任何内置工具 profile 且未文档化**  
   代码中 `tts` 的 `profiles: []`，但文档没有说明。属于工具配置可发现性与文档缺失问题；已关闭。  
   https://github.com/openclaw/openclaw/issues/126688

7. **#162205 [OPEN][P1] Ollama Cloud glm-5.3 在 Thinking Off 下仍输出完整推理**  
   默认 Thinking Off 会发送 `think: false`，但 Ollama Cloud `glm-5.3` / `glm-5.3-flash` 不识别该参数，仍执行推理并作为 answer content 返回。影响新模型支持、成本与输出质量。  
   https://github.com/openclaw/openclaw/issues/162205

8. **#162211 [OPEN] Gateway 启动阻塞事件循环 40–200 秒，健康监控误判并进入重启循环**  
   macOS launchd 下 Gateway 启动时事件循环被长时间阻塞，健康监控将其误读为断连并升级为重启循环。暂无评论，但可用性影响很高。  
   https://github.com/openclaw/openclaw/issues/162211

---

## 4. 重要 PR 进展

1. **#162179 [OPEN][P1] 修复多 agent 队列清理互相取消**  
   当一个 agent 执行 worker placement、rewind、provider-review pause、`sessions.abort` 或 interrupt reply 时，可能取消另一个 agent 的排队任务。该 PR 针对共享 raw session key 下的消息投递隔离问题。  
   https://github.com/openclaw/openclaw/pull/162179

2. **#155300 [OPEN][P1] 修复 Gateway 重复发布未变更配置导致 session list 卡住**  
   当配置写入路径触发 republish，但运行时快照值未变化时，`sessions.list` 会卡数分钟，Gateway 甚至停止响应。该 PR 面向性能与可用性关键路径。  
   https://github.com/openclaw/openclaw/pull/155300

3. **#160760 [CLOSED][P1] 恢复 CLI-backed exec 与 secret egress proxy**  
   修复 CLI 后端在启用 secret-egress proxy 并使用 MCP loopback 时，exec 命令报 “Secret egress proxy requires an admitted agent run instance” 的问题。涉及安全边界。  
   https://github.com/openclaw/openclaw/pull/160760

4. **#161019 [CLOSED][P1] 按 operator role 隐藏无权限 agent**  
   修复 Control UI picker 与 agent directory 中显示用户角色无权访问的私有 agent。属于权限与 UI 可见性修复。  
   https://github.com/openclaw/openclaw/pull/161019

5. **#161546 [OPEN][P1] Telegram 回复 hook 抑制预览时恢复进度**  
   注册 reply-modifying 插件后，Telegram 长任务可能看起来卡住。该 PR 回退到正常 hooked block delivery，让完成文本与进度可达用户。  
   https://github.com/openclaw/openclaw/pull/161546

6. **#159697 [OPEN][P2] Talk 语音请求遵循普通权限**  
   修复认证后的 Talk 请求相比等价文本请求多出语音确认屏障或不同执行上下文的问题，使语音与文本共享同一套工具/执行权限。  
   https://github.com/openclaw/openclaw/pull/159697

7. **#162180 [OPEN][P2] 修复 Codex runtime agent 收不到 session link**  
   当 `gateway.publicOrigin` 为 HTTPS 且 Control UI 启用时，Codex app-server turn 无法像 embedded/CLI 运行那样获得 `sessionUrl=<link>`。影响 Codex 集成体验。  
   https://github.com/openclaw/openclaw/pull/162180

8. **#159896 [OPEN][P2] 将 Gateway 原生命令绑定到 run-scoped GitHub App 凭据**  
   Gateway-local Codex 原生命令需要 run-owned App 凭据，同时不影响 System/agent 账户、不阻塞未绑定 turn、不丢失 Git authorship，并在 binding 关闭后不保留 App 访问。涉及安全与凭据生命周期。  
   https://github.com/openclaw/openclaw/pull/159896

9. **#162212 [OPEN] Gateway shutdown 不再等待一次性 session 维护 worker**  
   修复自动 session maintenance 激活时，Gateway 停止/重启额外等待数秒，Bun Gateway 可能错过 5 秒 stop grace 的问题。  
   https://github.com/openclaw/openclaw/pull/162212

10. **#160674 [OPEN] 防止就地更新后 Gateway shutdown 失败**  
    修复 in-place update 替换运行中安装的 hashed bundles 后，Gateway shutdown 报 `ERR_MODULE_NOT_FOUND`。与 2026.9.6 更新证明中暴露的问题相关。  
    https://github.com/openclaw/openclaw/pull/160674

---

## 5. 功能需求趋势

- **Gateway 生命周期与恢复能力**：启动、关闭、更新、睡眠唤醒后的恢复路径成为最集中的稳定性主题。相关：#162211、#158592、#162209、#160674、#162212。
- **性能与资源治理**：僵尸进程、Doctor 硬链接校验、session list 卡顿、启动事件循环阻塞，说明社区对长时间运行和升级性能敏感。相关：#97616、#162047、#155300、#162211。
- **模型运行时与推理控制**：Ollama Cloud glm-5.3 的 Thinking Off 失效、model runtime publication 超时，显示新模型适配与推理开关语义仍需加强。相关：#162205、#158592。
- **权限与安全边界**：语音/文本权限一致性、CLI exec 的 secret egress、按角色隐藏 agent、GitHub App 凭据生命周期，均是高优先级安全相关需求。相关：#159697、#160760、#161019、#159896。
- **多 Agent 与会话隔离**：共享 session key 下的队列清理串扰、后台维护 owner 作用域、Codex session link 缺失，反映多 agent 场景的隔离与可观测性不足。相关：#162179、#162079、#162180。
- **渠道与 UI 可观测性**：Telegram 长任务进度、归档会话刷新、session 菜单误操作、tts 工具文档缺失，属于高频 UX/文档需求。相关：#161546、#162208、#161361、#126688。
- **跨平台升级与 CI 稳定性**：Windows 升级 Doctor 卡顿、macOS 睡眠恢复、原生测试与 Web UI 测试 flake，说明跨平台 CI 与升级体验仍是痛点。相关：#162047、#158592、#161616、#161509。

---

## 6. 开发者关注点

- **Gateway 生命周期不可靠**：启动阻塞、健康监控误判、重启循环、更新失败、就地更新后 shutdown 失败、睡眠唤醒无法恢复。相关：#162211、#158592、#162209、#160674。
- **性能阻塞与资源泄漏**：僵尸进程累积、Doctor 耗时 39 分钟、`sessions.list` 卡数分钟、shutdown 等待一次性 worker。相关：#97616、#162047、#155300、#162212。
- **权限语义不一致**：语音与文本权限不同、CLI exec 与 secret egress 冲突、角色可见性泄漏、App 凭据生命周期不清晰。相关：#159697、#160760、#161019、#159896。
- **推理控制不可信**：Thinking Off 仍产生推理并作为答案内容返回，影响成本与输出可预期性。相关：#162205。
- **多 agent 隔离不足**：共享 session key 时一个 agent 的操作可能取消另一个 agent 的工作。相关：#162179。
- **文档与配置可发现性**：tts 工具不在任何内置 profile 且未文档化，迁移链接失效。相关：#126688、#157441。
- **CI 测试 flake 拖慢合并**：macOS native tests、Web UI e2e、Vitest browser provider 等问题反复出现。相关：#161616、#161509、#162137。
- **跨平台升级体验**：Windows 升级阻塞、macOS 睡眠恢复失败，是当前最影响普通用户升级与日常使用的两类环境问题。相关：#162047、#158592。

:::
