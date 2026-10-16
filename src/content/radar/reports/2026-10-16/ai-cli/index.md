---
title: "AI CLI 工具社区动态日报"
published: 2026-10-16
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-16

> 生成时间: 2026-10-16 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具横向对比分析报告（2026-10-16）

> 口径说明：以下 Issue / PR 数量基于各工具日报已覆盖的“热点/更新条目”，非 GitHub 全量统计；评论、点赞等为日报中给出的社区热度信号。

---

## 1. 生态全景

AI CLI 工具正从“单点编码助手”快速转向“多表面 Agent 平台”：Desktop、TUI、Web、Remote、Gateway、插件/技能生态同时扩张。  
版本迭代节奏普遍加快，但社区反馈重心已从“功能有无”转向**权限安全、上下文/成本治理、远程无人值守、跨平台稳定性**。  
头部产品如 Claude Code、Codex、Gemini CLI 已进入平台化深水区，回归与平台兼容问题密集；OpenClaw、Hermes、Reasonix、OpenCode 处于架构重构或快速迭代期。  
社区对“静默自动批准”“资源无界增长”“不可解释拒绝”的容忍度显著降低，安全默认值与可观测性正成为选型硬指标。  
DeepSeek Harness 等早期项目仍处 alpha 静默期，生态成熟度分层明显。

---

## 2. 各工具活跃度对比

| 工具 | Release 情况 | 日报覆盖热点 Issues | 日报覆盖重要 PR | 热度 / 判断 |
|---|---|---|---|---|
| Claude Code | v2.1.301 | 10 个编号，另含 #100374 / #100370 / #101463 三条同类，及 3 条一瞥 | 1 条更新 | Issue 热、PR 低；#102088 51 评论、#43454 49 赞 |
| OpenAI Codex | rust-v0.163.0；alpha.10.2 | 10 | 10 | Windows 问题集中；#52407 94 评论、#49458 26 赞 |
| Gemini CLI | 无 | 10 | 10 | 子代理 P1 问题突出；#21409 8 赞 |
| DeepSeek Reasonix | v2.41.0 / studio-v2.41.0 | 10 | 10 | 压缩、停止、技能生态；多复现问题 |
| OpenCode | v1.19.1 | 10 | 10 | 工具调用、Windows、迁移、OpenTunnel |
| Deepseek Harness | dsh-v0.2.1-alpha.4 | 0 | 0 | 发布后静默，alpha 早期 |
| Hermes | v0.22.2 | 10 | 10 | #134889 追踪 68 评论，网关回归主导 |
| OpenClaw | v2026.10.10-beta.1 / v2026.10.5-beta.4 / v2026.9.33 | 10+，另 5 条值得留意 | 10+，另 1 条实验性 | 性能/资源收敛，多条 P1 资源与升级问题 |

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 / 证据 |
|---|---|---|
| 权限安全与自动化边界 | Claude Code、Codex、Gemini、OpenCode、Hermes、OpenClaw | Claude #102136 默认 “Always allow”、#102582 hook `ask` 被静默批准；Codex 远程凭证轮换/遮蔽；Gemini 阻止破坏性 Git；OpenCode 修复权限检查绕过；Hermes command_guard；OpenClaw 审批兼容 |
| 上下文 / 成本 / 记忆治理 | Claude Code、Codex、Gemini、Reasonix、Hermes、OpenClaw | Claude 后台 agent 睡眠耗用量、auto-clear/handover；Codex 截图重存 165 GiB；Reasonix 压缩后会话 332k→1.2M；OpenClaw Memory Dreaming；Hermes `/context` 虚构窗口 |
| 远程 / 无人值守 / 多表面会话 | Claude Code、Codex、OpenCode、Hermes、OpenClaw | Claude Cowork 定时任务、Remote Control；Codex remote exec-server；OpenCode OpenTunnel；Hermes 跨设备 takeover；OpenClaw Gateway/cron |
| 平台稳定性与升级可靠性 | Claude Code、Codex、Gemini、Reasonix、OpenCode、Hermes、OpenClaw | Codex Windows Computer Use/Browser/Dots 集中失败；Claude Linux seccomp、macOS TCC；OpenCode Windows ConPTY / exe stub；OpenClaw Docker 11 GB 快照、Node 缓存 26 GB |
| Agent / 子代理可观测与恢复 | Claude Code、Gemini、Reasonix、Hermes、OpenClaw | Gemini 子代理挂起、误报 success、Bug 报告缺上下文；Reasonix 停止卡住、思考循环；Hermes 网关孤儿路由；OpenClaw cron 错误计数污染 |
| 插件 / 技能 / MCP 治理 | Claude Code、Codex、Gemini、Reasonix、OpenCode、Harness、Hermes、OpenClaw | Claude hook 路径修复；Codex MCP capability broker；Reasonix skill 来源追踪/更新预览；Harness 自定义插件索引源；Hermes 插件秘密源；OpenClaw 插件服务启动 |
| 模型 / Provider 兼容与配置 | Codex、Gemini、Reasonix、OpenCode、Hermes、OpenClaw | Codex “Model not found” 与时区触发；Reasonix 命名模型/推理强度；OpenCode Sonnet 5.5 thinking 签名、XML/DSML；Hermes Azure Foundry / Anthropic 非流式；OpenClaw google-vertex 动态目录、Databricks |
| 基础 TUI / 编辑器体验 | Claude Code、Codex、Gemini、OpenCode | Claude vim redo；Codex undo/redo、`/presets`、`/config`；Gemini keybindings、终端 resize；OpenCode TUI raw mode、数字格式 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术 / 生态路线 |
|---|---|---|---|
| Claude Code | Desktop + Cowork + Remote、权限模型、hooks/plugins | 企业专业开发者、远程/无人值守团队 | Anthropic 生态内深度集成，强调权限与自动化边界 |
| OpenAI Codex | Rust CLI + Windows 桌面、Computer Use / Browser / Dots | 桌面自动化重度用户、企业远程执行 | Rust 底层 + 多表面工具链，MCP/子代理治理 |
| Gemini CLI | 开源 CLI、子代理、浏览器代理、AST 代码理解、IDE 集成 | Google 生态开发者、开源 CLI 用户 | 子代理与代码理解并行，MCP/IDE 扩展 |
| DeepSeek Reasonix | Studio + CLI、长上下文压缩、技能生态、worktree、成本账本 | 中文桌面开发者、长任务用户 | 压缩/缓存/技能迭代为特色，Studio 体验优先 |
| OpenCode | 开源 TUI/Desktop、OpenTunnel 远程配对、插件/GUI | 开源工具用户、远程开发用户 | v1/v2 迁移中，强调权限安全与桌面插件扩展 |
| Deepseek Harness | 推理等级 UI、自定义插件索引源、Office 交付 | 企业 Harness 用户、插件开发者 | alpha 早期，配置可视化与插件分发开放 |
| Hermes | 统一 Gateway、多表面会话、秘密管理、多提供商 | 多设备/多表面 Agent 用户 | Gateway 统一所有本地会话，安全与跨设备协调 |
| OpenClaw | Gateway/agent 集群、性能与资源治理、记忆 Dreaming、渠道兼容 | 规模化 agent 运维、企业集成 | worker 线程下沉、SQLite 负载优化，强调可靠性 |

---

## 5. 社区热度与成熟度

**高热且较成熟，但回归密集：**
- Claude Code：Issue 讨论深，但 PR 更新极少；Desktop、权限、平台回归是主要体感问题。
- OpenAI Codex：Windows 问题评论量最高，如 #52407 94 评论、#49458 82 评论；成熟度高但质量瓶颈明显。
- Gemini CLI：子代理 P1 问题集中，社区对 Agent 可靠性敏感。

**快速迭代 / 架构重构期：**
- OpenClaw：v2026.10.10-beta.1 与大量性能 PR 并行，但 Docker 11 GB 快照、Node 缓存 26 GB 等 P1 资源问题突出。
- Hermes：#134889 追踪 68 评论，统一网关合并后回归覆盖多组件，处于架构整合阵痛期。
- DeepSeek Reasonix：v2.41.0 发布后，压缩、停止、技能生态问题密集，版本迭代快。
- OpenCode：v1.19.1 停止分享功能，v1↔v2 迁移/降级风险高，远程配对稳定性待补。

**早期 / 静默期：**
- Deepseek Harness：Issues/PR 24 小时内零更新，仅 alpha 发布，社区反馈尚未沉淀。

---

## 6. 值得关注的趋势信号

1. **权限默认值 = 安全底线**  
   Claude Code 的 “Always allow” 默认、hook `ask` 被静默批准，说明用户显式意图必须优先。开发者应审计默认授权、hook/MCP 权限链和无人值守路径。

2. **上下文与成本治理成为基础设施**  
   压缩失败、缓存下降、睡眠耗用量、165 GiB 截图、26 GB 编译缓存等，表明成本可见性需细化到会话/agent/任务维度，并设置资源上限与自清理。

3. **远程 / 无人值守 / 多设备是主战场**  
   Cowork、Remote Control、OpenTunnel、Gateway、跨设备 takeover 均暴露持久授权、会话保持、凭证轮换、隧道可重置等系统缺口。

4. **平台稳定性决定采用速度**  
   Windows 是 Codex 最大瓶颈；Claude、OpenCode、Hermes、OpenClaw 也在 macOS/Linux/Docker/升级链路上频繁回归。升级、回滚、资源泄漏应纳入 CI 与发布门禁。

5. **Agent 可观测性需求升级**  
   子代理误报成功、Bug 报告缺上下文、auto 分类器无申诉、cron 错误计数污染，说明社区需要轨迹回放、状态诊断和可解释拒绝机制。

6. **插件 / 技能生态从“扩展”走向“治理”**  
   来源追踪、更新预览、索引源、命令守卫、秘密存储成为共同方向。插件生态的权限隔离和可审计更新将影响长期采用。

7. **模型/Provider 适配需动态化**  
   “Model not found”、时区路由、thinking 签名、XML/DSML、Databricks/Google Vertex 动态目录等，要求兼容层避免硬编码，支持区域、账户、推理强度和提供商差异。

8. **基础 TUI/编辑器体验仍是留存关键**  
   undo/redo、vim redo、presets、keybindings、raw mode 等看似小问题，实际直接影响高频使用体验，不宜长期积压。

**对开发者的参考价值：** 选型时应重点评估权限默认是否安全、上下文/成本是否可观测、远程与无人值守是否可靠、跨平台升级是否稳健；自研 Agent 工具则需优先设计资源上限、显式授权、会话状态持久化和插件权限治理。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-10-16｜来源：github.com/anthropics/skills

> 注：给定 PR 数据中评论数为 `undefined`，因此以下 PR 关注度以官方“按评论数排序”的展示位次、近期更新时间和关联 Issue 讨论量作为代理指标。所示 PR 状态均为 **OPEN**，未出现 merged/draft。

## 1. 热门 Skills 排行（PR）

1. **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers**  
   功能：修复 `mcp-builder` 对 `mcp>=2.0.0` 的兼容性，包括 `streamable_http_client` 重命名与自定义 headers 配置。  
   热点：MCP 生态升级后的兼容性断裂，关联 #1668。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1742

2. **#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures**  
   功能：修复 `skill-creator` 触发评估误判、Windows 下 subprocess pipe 问题、运行时失败被误判为“未触发”。  
   热点：技能评测可信度，尤其是触发率与负例评估。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1298

3. **#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills**  
   功能：新增两个 Skill：将 Notion 产品/技术规格转为实现任务；量化简历审计。  
   热点：工作流自动化、规格到任务拆解、HR/招聘辅助场景。  
   状态：OPEN，且更新至 2026-10-15，近期活跃度高。  
   https://github.com/anthropics/skills/pull/1245

4. **#1771 feat(skills): add proofcore-contract-auditor for smart contract notarization**  
   功能：面向 Web3 的 Solidity/Rust 智能合约静态分析，并将审计证明锚定到 TON 区块链。  
   热点：Web3 安全、可验证审计、零存储 Merkle 证明。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1771

5. **#1734 Detect orphaned docx comments**  
   功能：检测 DOCX 中孤立/失效评论。  
   热点：文档处理质量与评论生命周期管理。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1734

6. **#1703 Add md2video-audio skill**  
   功能：将 Markdown 通过 Marp 转为演示幻灯片，并生成带类真人语音的 MP4。  
   热点：零成本内容生产、多模态输出、Markdown 到视频自动化。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1703

7. **#1961 skill-creator: harden eval viewer (script breakout, DNS rebinding, cross-site POST, escaping)**  
   功能：加固 `skill-creator` 的 eval viewer，修复脚本逃逸、DNS rebinding、跨站 POST、转义不足等问题。  
   热点：Skill 开发工具本身的本地安全与不可信输出渲染。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1961

8. **#1792 fix(docx): report LibreOffice timeout as an error and verify the output**  
   功能：DOCX 接受修订脚本在 LibreOffice 超时时返回错误，并验证输出不再含修订标记。  
   热点：文档处理链路可靠性，避免“假成功”。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1792

## 2. 社区需求趋势（来自 Issues）

1. **安全与信任边界最突出**  
   社区技能以 `anthropic/` 命名空间分发，可能被误认为官方技能，导致权限与信任边界滥用。  
   #492，46 评论，2 👍  
   https://github.com/anthropics/skills/issues/492

2. **组织内技能共享与分发**  
   企业希望直接在组织内共享 Skills，而不是下载 `.skill` 文件后通过 Slack/Teams 手动上传。  
   #228，16 评论，8 👍  
   https://github.com/anthropics/skills/issues/228

3. **触发评估、benchmark 与评测工具链可靠性**  
   高频问题包括：`run_eval.py` 触发率为 0%、并行 worker 交叉匹配、benchmark 静默失败、MCP evaluation 0/N。社区需要可复现、可信的技能评测。  
   #556、#1352、#1383、#1390  
   https://github.com/anthropics/skills/issues/556  
   https://github.com/anthropics/skills/issues/1352  
   https://github.com/anthropics/skills/issues/1383  
   https://github.com/anthropics/skills/issues/1390

4. **上下文与 token 效率**  
   `claude-api` 技能被反馈单次工具调用注入约 156k tokens，说明社区关注技能按需加载和上下文预算控制。  
   #1487  
   https://github.com/anthropics/skills/issues/1487

5. **技能/插件管理与去重**  
   `document-skills` 与 `example-skills` 安装相同内容导致重复技能；也有用户反馈技能消失与错误。  
   #189、#62  
   https://github.com/anthropics/skills/issues/189  
   https://github.com/anthropics/skills/issues/62

6. **新方向：元技能与垂直技能**  
   社区提出 `compact-memory`、`agent-governance`、Reasoning Quality Gate、skill-quality/security analyzer 等，显示对记忆压缩、AI 治理、推理质量、技能质量与安全分析的兴趣。  
   #1329、#412、#1385、#83  
   https://github.com/anthropics/skills/issues/1329  
   https://github.com/anthropics/skills/issues/412  
   https://github.com/anthropics/skills/issues/1385  
   https://github.com/anthropics/skills/pull/83

## 3. 高潜力待合并 Skills（PR）

以下 PR 均为 OPEN，且更新较近或修复关键链路，可能近期落地：

1. **#1245 notion-spec-to-implementation + quantitative-resume-auditor**  
   更新至 2026-10-15，最新活跃的新 Skill 提交。  
   https://github.com/anthropics/skills/pull/1245

2. **#2004 fix(slack-gif-creator): account for text bounds when centering**  
   修复 Pillow 文本边界导致居中偏移，更新至 2026-10-14。  
   https://github.com/anthropics/skills/pull/2004

3. **#1997 fix(skill-creator): parse YAML frontmatter scalars correctly**  
   修复 YAML frontmatter 解析错误，影响评测与描述优化，更新至 2026-10-13。  
   https://github.com/anthropics/skills/pull/1997

4. **#1961 skill-creator: harden eval viewer**  
   安全加固 eval viewer，更新至 2026-10-11，关联本地 XSS/DNS rebinding 风险。  
   https://github.com/anthropics/skills/pull/1961

5. **#1742 mcp-builder 兼容 mcp>=2**  
   修复 MCP 2.x 导入与 headers 配置，更新至 2026-10-08，关联 #1668。  
   https://github.com/anthropics/skills/pull/1742

6. **#1681 fix(skill-creator): support direct execution of package_skill.py**  
   修复直接运行 `package_skill.py` 的 `ModuleNotFoundError`，更新至 2026-10-08。  
   https://github.com/anthropics/skills/pull/1681

7. **#1980 webapp-testing: avoid shell=True in with_server.py**  
   消除 `shell=True` 带来的命令注入风险，更新至 2026-10-06。  
   https://github.com/anthropics/skills/pull/1980

8. **#1977 algorithmic-art: wrapAround() now wraps**  
   修复取模边界，关联 #1897，更新至 2026-10-07。  
   https://github.com/anthropics/skills/pull/1977

## 4. Skills 生态洞察

**一句话总结：当前社区在 Skills 层面最集中的诉求不是“更多技能”，而是“更可信、可评测、可共享的技能供应链”——安全与命名空间治理、触发/评测可靠性、组织分发和上下文效率已成为核心议题。**

---

# Claude Code 社区动态日报 · 2026-10-16

> 数据来源：github.com/anthropics/claude-code

---

## 1. 今日速览

今日社区热度集中在 **Desktop 端体验回归** 与 **权限模型争议** 两条主线上：Desktop 侧边栏移除 "Group by" 分组选项引发 51 条评论讨论，Cowork 定时任务无视 "Always allow" 授权（39 评论 / 48 👍）持续发酵。版本侧发布 v2.1.301，新增无人值守重试的用量上限等待配置；安全侧出现两起值得警惕的新报告——权限提示默认值退化为 "Always allow"，以及 hook 触发的权限请求在用户无感知的情况下被自动批准。

---

## 2. 版本发布

### v2.1.301

- **新增环境变量 `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS`**：为无人值守重试模式（`CLAUDE_CODE_RETRY_WATCHDOG`）设定等待阈值——当命中的用量限制重置时间过远时，直接结束请求而非无限期挂起。这对 CI/自动化场景下的成本与时延可控性有实际意义。
- **`claude-api` skill 新增 OpenTelemetry tracing 指南**：指导用户为 Claude API 调用接入 OTel 链路追踪，补齐了可观测性方向的能力。

---

## 3. 社区热点 Issues

### ① #102088 — Desktop "Group by" 选项被移除，会话只能按环境分组 🔥
[链接](https://github.com/anthropics/claude-code/issues/102088) · 51 评论 · 37 👍

Desktop 2.37337.1 从 Code tab 侧边栏移除了 "Group by" 选项，用户无法再按自定义维度组织 session。**这是今日评论量最高的 issue**，标签包含 `regression` + `area:desktop`，说明是一次非预期回归而非有意设计，多环境/多项目并行的用户受影响最大。

### ② #47180 — Cowork 定时任务忽略 "Always allow" 文件夹/工具权限
[链接](https://github.com/anthropics/claude-code/issues/47180) · 39 评论 · 48 👍

macOS 上 Cowork 的定时任务每次运行都会重新弹出已被 "Always allow" 授权的权限提示。**高赞 + 长周期讨论（4 月提报、10 月仍在更新）**，暴露的是"持久化授权在无人值守调度路径上未生效"的架构问题——定时任务恰恰是最不能依赖人工点确认的场景。

### ③ #43454 — Linux `apply-seccomp` 失败：无法写入 `/proc/self/setgroups`
[链接](https://github.com/anthropics/claude-code/issues/43454) · 29 评论 · 49 👍

沙箱初始化在 Linux 上直接失败，标签带 `has repro` / `reproduced`，是**今日点赞最高的 issue**。沙箱是安全边界，跑不起来意味着部分 Linux 用户只能降级或绕过隔离运行，属于阻塞级缺陷。

### ④ #95364 — Desktop "stealth update" 在用户离开时重启应用，丢弃所有 Remote Control 会话
[链接](https://github.com/anthropics/claude-code/issues/95364) · 11 评论 · 8 👍

自动更新在空闲窗口退出并重启应用，导致 `claude.ai/code` 远程接管中的会话全部中断。**远程办公用户的典型痛点**：更新策略与服务连续性之间存在直接冲突，需要"延迟更新"或"会话保持"机制。

### ⑤ #102136 — 权限提示默认选中 "Always allow" 而非 "Allow once"（危险 UX 回归）
[链接](https://github.com/anthropics/claude-code/issues/102136) · 6 评论 · 7 👍

macOS 上权限弹窗的默认按钮从 "Allow once" 变为 "Always allow"。**一个回车就可能授予永久权限**，标签带 `regression` + `user-experience`。与 ⑥ 合并看，今日权限相关的安全类反馈明显增多。

### ⑥ #102582 — hook 触发的 `git commit` 权限请求被系统在用户未见时回答 "Allow once"
[链接](https://github.com/anthropics/claude-code/issues/102582) · 1 评论

Windows Desktop：`PreToolUse` hook 返回 `permissionDecision: "ask"`，应用发出请求后 **4 秒内被应用内部自动答复 "Allow once"，用户全程未见弹窗**。这是 hook 权限链路与 UI 层脱节的严重安全问题——显式 `ask` 语义被静默吞掉。

### ⑦ #102597 — macOS 后台 agent 在合盖后每次 DarkWake 重发完整上下文，睡眠中消耗用量
[链接](https://github.com/anthropics/claude-code/issues/102597) · 0 评论

合盖后 6.5 小时内，Claude Code 在几乎每次 DarkWake 都重发每个 agent 的完整会话（400–580K tokens），发出 81 次请求、仅 29 次完成。**典型的"睡着的成本泄漏"**，带 `has repro` + `area:cost`，对长任务用户影响直接。

### ⑧ #100374 / #100370 / #101463 — auto 模式分类器连续误拒，且无申诉路径
- [#100374](https://github.com/anthropics/claude-code/issues/100374)（macOS，本地会话经 Remote Control）
- [#100370](https://github.com/anthropics/claude-code/issues/100370)（Cowork 云会话，合并自有 PR 被拦）
- [#101463](https://github.com/anthropics/claude-code/issues/101463)（编辑用户同一对话中已批准的邮件草稿被拦）

同一模式下的三条独立报告：**分类器否决了用户已明确、反复批准的操作，不给出可用原因，也不提供覆盖/申诉入口**，远程场景下用户甚至无法现场点确认。这是当前 auto 模式最集中的信任缺口。

### ⑨ #74068 — macOS TCC 权限弹窗以版本号（"2.1.201"）作为应用名，且每次更新后授权重置
[链接](https://github.com/anthropics/claude-code/issues/74068) · 4 评论 · 4 👍

原生安装器把二进制放在 `~/.local/share/claude/versions/2.1.201`，导致系统权限弹窗显示裸版本号而非 "Claude Code"，且版本升级后 TCC 授权不继承。**既影响用户信任，也造成每次更新都要重新授权**。

### ⑩ #76684 — 为 vim NORMAL 模式添加 `Ctrl+R` redo 与可绑定 `chat:redo` 动作
[链接](https://github.com/anthropics/claude-code/issues/76684) · 5 评论 · 7 👍

输入编辑器支持 undo 但完全没有 redo：vim 模式有 `u` 无 `Ctrl+R`，keybinding 系统也无对应 action。属于**小而明确的 TUI 交互缺口**，社区呼声稳定。

> 其他值得一瞥：#102548（[Windows 麦克风听写丢失实时转写](https://github.com/anthropics/claude-code/issues/102548)）、#90061（[Desktop 启动会话首轮缺失 connector 工具](https://github.com/anthropics/claude-code/issues/90061)）、#102595（[实时 prompt 持久化到外部记忆](https://github.com/anthropics/claude-code/issues/102595)）。

---

## 4. 重要 PR 进展

⚠️ **过去 24 小时内仅 1 条 PR 有更新**，社区提交侧活跃度处于低位。

### #95698 — fix(plugins): 通过 bash + 引号路径运行 ralph-wiggum 与 output-style 的 .sh hooks
[链接](https://github.com/anthropics/claude-code/issues/95698) · 作者：@claude[bot] · 状态：OPEN

修复三个内置插件（`ralph-wiggum`、`output-style` 等）将 hook 注册为**裸的、未加引号的脚本路径**的问题，改为 `bash "<path>"` 形式：

| plugin | event | before | after |
|---|---|---|---|
| `ralph-wiggum` | `Stop` | `${CLAUDE_PLUGIN_ROOT}/hooks/stop-hook.sh` | `bash "${CLAUDE_PLUGIN_ROOT}/..."` |

这同时修复了 #95673，以及 #78490 中 ralph-wiggum / output-style 相关的另一半问题。**意义**：路径含空格、缺少执行位或 shell 解析差异导致的 hook 静默失效，是插件生态的常见故障源，此修复提升跨平台一致性。

---

## 5. 功能需求趋势

从 50 条 issue 中可提炼出五条清晰主线：

1. **权限模型与自动化边界（最热）**
   Cowork 定时任务持久授权失效（#47180）、auto 模式分类器误拒且无申诉（#100370/#100374/#101463）、hook `ask` 被静默批准（#102582）、权限默认值退化（#102136）。社区正在要求一套**可解释、可覆盖、可持久化**的授权语义。

2. **Desktop / Remote Control 体验**
   会话分组能力回退（#102088）、自动更新打断远程会话（#95364）、usage ring 只反映 5 小时窗口而非会话上下文（#91712）、麦克风听写回归（#102548）。Desktop 正从"附属客户端"变成主力工作面，但稳定性欠账明显。

3. **上下文与成本治理**
   threshold 触发 auto-clear + handover doc 替代 lossy auto-compact（#90089）、agent team 单 agent 上下文耗尽与压缩协议（#86716）、后台 agent 睡眠中重发上下文烧用量（#102597）。**"上下文生命周期"成为独立议题**。

4. **平台层健壮性（Linux / macOS 打包与沙箱）**
   Linux seccomp 沙箱写入失败（#43454）、macOS TCC 应用名与授权重置（#74068）、WSL2 下 connector 推送不生效（#90061）。

5. **记忆持久化与外部生态集成**
   实时 prompt 落盘到外部记忆（#102595）、插件与主线程直连升级（#101325）、跨机器 LAN 分布式 agent team（#79507，已 stale）。此外 vim redo（#76684）代表 TUI 编辑体验的细粒度补完。

---

## 6. 开发者关注点

- **权限默认值即安全底线**：无论是默认选中 "Always allow"（#102136），还是 hook 声明 `ask` 却被自动批准（#102582），反馈都指向同一诉求——**用户显式意图必须被优先尊重，静默降级不可接受**。
- **无人值守场景的系统性缺口**：定时任务、远程接管、后台 agent 三类"人不在场"场景同时暴露问题（#47180、#95364、#102597），而 v2.1.301 新增的用量等待上限正是对这一方向的产品级回应。
- **auto 模式分类器缺乏可解释性与申诉通道**：三条独立 issue 指向同一体验缺陷，开发者抱怨的是"被拒绝但不知道为什么、也不知道怎么改"，这在远程/云会话中会直接阻断工作流。
- **平台回归密集出现在 Windows / macOS / Linux 三端**：涉及 UI、权限、沙箱、打包多个子系统，`regression` 标签在今日 issue 中反复出现，稳定性质控是当前最大体感问题。
- **成本可见性不足**：usage ring 只报 5 小时窗口（#91712）、睡眠期间持续消耗（#102597），开发者需要更细粒度的用量归因到"会话 / agent / 任务"维度。
- **低质量与流程性 issue 增多**：出现 `needs-info`（#102598，全文为西班牙语且无复现步骤）、`[Redacted]`（#102596，由反馈流程误创建）等条目，配合多条 `stale` 自动关闭，说明 issue 噪声治理与反馈入口体验仍有优化空间。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-10-16）

数据来源：github.com/openai/codex  
统计口径：过去 24 小时内更新的 Releases、Issues、Pull Requests；Issue 评论数为累计值。

## 1. 今日速览

Codex 发布 `rust-v0.163.0`，重点改进 `/config` 集中配置体验、响应中 follow-up 实时引导，以及中断回合时停止 Code Mode cells 等交互控制。社区热点仍高度集中在 Windows 桌面端：Computer Use / Browser / Dots 启动失败、模型 “Model not found”、内存与磁盘泄漏是过去 24 小时讨论最密集的问题。PR 侧则集中推进 TUI presets、权限/状态栏配置、远程执行凭证轮换、SQLite 与沙箱优化，显示项目正在强化可配置性与底层稳定性。

---

## 2. 版本发布

### `rust-v0.163.0`
- 新增 `/config`：支持跨类别搜索偏好设置，可立即修改受支持设置，并提示哪些变更需要重启（#52990, #53429）。
- 支持在 Codex 响应过程中发送 follow-up，立即引导模型行为；中断当前回合时也会停止活跃的 Code Mode cells 等。
- 链接：https://github.com/openai/codex/releases/tag/rust-v0.163.0

### `rust-v0.163.0-alpha.10.2`
- 发布 alpha 版本，给定数据中无详细 release note，预计为 0.163.0 预览轨道迭代。
- 链接：https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.10.2

---

## 3. 社区热点 Issues

1. **[#52407](https://github.com/openai/codex/issues/52407) Windows Dots: CUA MXC launcher fails with HRESULT 0x80070003**  
   94 评论 / 10 👍。Windows 桌面 Dots 的 CUA/MXC 启动器在直接 shell 恢复后失败，阻塞 Computer Use 恢复路径。高评论量说明 Windows 自动化用户受影响面很大。

2. **[#49458](https://github.com/openai/codex/issues/49458) [Windows] dot-started local tasks lack Computer Use tools while ordinary local Codex sessions work**  
   82 评论 / 26 👍。通过 dot 启动的本地任务缺少 Computer Use 工具，而普通本地会话正常。核心能力不一致，社区反应强烈。

3. **[#25271](https://github.com/openai/codex/issues/25271) Computer Use cannot determine Chrome URL on Windows, even on chrome://newtab/**  
   60 评论 / 12 👍。Windows 上 Computer Use 无法识别 Chrome URL，连新标签页都失败。浏览器自动化基础能力受阻，长期未解。

4. **[#54083](https://github.com/openai/codex/issues/54083) [Windows Chat] “Model not found” for 5.6 and 6 at all three thinking levels; web succeeds**  
   48 评论。Windows Chat 中 GPT-5.6 / GPT-6 在所有思考级别均返回 “Model not found”，但 Web 端成功。影响桌面端模型可用性，用户排查困难。

5. **[#53188](https://github.com/openai/codex/issues/53188) [Windows] Browser tools fail to initialize: MXC launcher HRESULT 0x80070003**  
   39 评论。与 #52407 同源的 Browser 工具初始化失败，错误码一致。说明 MXC launcher 问题已扩散到多个工具链。

6. **[#37754](https://github.com/openai/codex/issues/37754) TUI resume fails: list_turns is not supported yet**  
   18 评论 / 4 👍。CLI 无法恢复已有 TUI 会话，因为 `thread/resume` 调用了未支持的 `list_turns`。影响 CLI/TUI 工作流连续性。

7. **[#35458](https://github.com/openai/codex/issues/35458) Codex Desktop screenshots re-persisted in full on every compaction and inherited by subagent forks - ~/.codex/sessions reached ~165 GiB**  
   14 评论。桌面端每次压缩都完整重存截图，并被 subagent fork 继承，导致 `~/.codex/sessions` 达到约 165 GiB，其中 95% 为 base64 图片。磁盘爆炸问题严重。

8. **[#2379](https://github.com/openai/codex/issues/2379) Undo / redo typing**  
   14 评论 / 37 👍。TUI 输入框缺少 Cmd-Z / Shift-Cmd-Z 撤销重做。高赞 enhancement，说明基础编辑体验需求强烈。

9. **[#46690](https://github.com/openai/codex/issues/46690) [Windows][26.915.4065.0] Renderer memory leak grows to 4–7 GB and repeatedly crashes; rollback to 26.903.9818.0 appears stable**  
   7 评论。Windows 渲染进程内存泄漏至 4–7 GB 并反复崩溃，回滚旧版可稳定。属于阻塞级稳定性问题。

10. **[#54340](https://github.com/openai/codex/issues/54340) [Windows][Chat] “Model not found” reproducibly triggered by China Standard Time; other UTC+8 zones work**  
    6 评论 / 1 👍。模型不可用问题可由 China Standard Time 稳定触发，其他 UTC+8 时区正常。为模型路由/区域问题提供了明确排查线索。

---

## 4. 重要 PR 进展

1. **[#54445](https://github.com/openai/codex/pull/54445) Remove obsolete protected-path monitoring from the Linux sandbox**  
   移除 Linux 沙箱中已无目标的保护路径监控。相关路径已由只读合成挂载覆盖，可减少无效监控。

2. **[#54434](https://github.com/openai/codex/pull/54434) Add rotating stdin credentials for remote exec-server**  
   为远程执行服务增加 stdin 凭证轮换，要求 30 秒内提供初始凭证并接受后续轮换，提升远程执行安全性。

3. **[#54432](https://github.com/openai/codex/pull/54432) Support remote credential masking with Zsh shell snapshots**  
   将远程凭证遮蔽扩展到 Zsh login 命令与 shell snapshot，此前仅支持 Bash。

4. **[#54421](https://github.com/openai/codex/pull/54421) Treat explicit connections to the verified default daemon as local**  
   修复显式连接默认 daemon 时被误判为远程的问题，避免本地配置和线程参数处理异常。

5. **[#54417](https://github.com/openai/codex/pull/54417) Skip SQLite page reclamation on Linux NFS mounts**  
   在 Linux NFS 挂载上跳过 SQLite 页回收，减少 I/O 负载与争用，并缓存文件系统探测结果。

6. **[#54414](https://github.com/openai/codex/pull/54414) Allow root turn suspension with live descendants**  
   允许根回合在有活跃后代时挂起，改善复杂会话恢复、迁移和关闭流程。

7. **[#54401](https://github.com/openai/codex/pull/54401) Run managed daemon processes at background priority on macOS**  
   macOS 上通过 `taskpolicy -b` 以后台优先级运行托管进程，探测失败则回退直接启动，降低资源争抢。

8. **[#54398](https://github.com/openai/codex/pull/54398) Store generated image items as attachment references**  
   将生成图像存入附件存储并暴露 `fileId`，避免内联结果膨胀，保留旧事件兼容与持久化引用。

9. **[#54389](https://github.com/openai/codex/pull/54389) Preserve existing SQLite journal modes on startup**  
   启动时保留已有 SQLite journal 模式，避免在 `DELETE` 模式且存在写锁时强制转 WAL 失败。

10. **[#54380](https://github.com/openai/codex/pull/54380) Add `/presets` for reusable prompts and slash commands**  
    TUI 新增 `/presets`，提供十个编号槽位、编辑器与替换/删除确认，可保存提示词和斜杠命令。

---

## 5. 功能需求趋势

- **Windows 桌面端 Computer Use / Browser / Dots 稳定性**：HRESULT 0x80070003、浏览器 URL 识别失败、工具初始化失败、权限拒绝、in-app browser 绑定失败等集中爆发。相关：[#52407](https://github.com/openai/codex/issues/52407)、[#49458](https://github.com/openai/codex/issues/49458)、[#25271](https://github.com/openai/codex/issues/25271)、[#53188](https://github.com/openai/codex/issues/53188)、[#54036](https://github.com/openai/codex/issues/54036)、[#50640](https://github.com/openai/codex/issues/50640)。
- **模型可用性与区域/账户适配**：GPT-5.6 / GPT-6 “Model not found”、GPT-5.5 退役后兼容、China Standard Time 触发、ChatGPT Team 账户 HTTP 400。相关：[#54083](https://github.com/openai/codex/issues/54083)、[#54340](https://github.com/openai/codex/issues/54340)、[#54209](https://github.com/openai/codex/issues/54209)、[#54234](https://github.com/openai/codex/issues/54234)。
- **性能与资源治理**：renderer 内存泄漏、macOS swap 耗尽、截图持久化 165 GiB、Git LFS 临时文件泄漏、MLX 转录耗尽内存。相关：[#46690](https://github.com/openai/codex/issues/46690)、[#44996](https://github.com/openai/codex/issues/44996)、[#35458](https://github.com/openai/codex/issues/35458)、[#34953](https://github.com/openai/codex/issues/34953)、[#54416](https://github.com/openai/codex/issues/54416)。
- **CLI/TUI 会话恢复与交互效率**：resume 失败、`list_turns` 不支持、`thread/read` 失败、undo/redo、presets、`/config`、权限与状态栏配置。相关：[#37754](https://github.com/openai/codex/issues/37754)、[#54073](https://github.com/openai/codex/issues/54073)、[#2379](https://github.com/openai/codex/issues/2379)、[#54380](https://github.com/openai/codex/pull/54380)、[#54388](https://github.com/openai/codex/pull/54388)。
- **子代理 / MCP 治理与安全**：MCP capability broker、allowlists、零启动、有限池化、确定性 teardown；远程凭证遮蔽与安全传输。相关：[#38353](https://github.com/openai/codex/issues/38353)、[#52801](https://github.com/openai/codex/issues/52801)、[#54432](https://github.com/openai/codex/pull/54432)、[#54434](https://github.com/openai/codex/pull/54434)。
- **线程 / 项目管理与状态一致性**：新线程上下文不清晰、General / Projects 间移动、项目成员持久化、通知角标异常。相关：[#24222](https://github.com/openai/codex/issues/24222)、[#53761](https://github.com/openai/codex/issues/53761)、[#51915](https://github.com/openai/codex/issues/51915)。

---

## 6. 开发者关注点

- **Windows 是当前最大质量瓶颈**：Computer Use / Browser / Dots 大量失败，且错误码、权限状态与实际行为不一致，用户反复报告但修复周期较长。
- **模型路由需按区域、账户和时区排查**：桌面端 “Model not found” 与 Web 成功形成明显反差，付费用户受影响，且 China Standard Time 线索表明可能存在区域化路由缺陷。
- **资源泄漏必须优先处理**：内存、磁盘和渲染进程崩溃已导致机器不可用或用户被迫回滚版本，直接影响 Codex Desktop 可信度。
- **会话恢复与状态持久化不可靠**：TUI/CLI resume、项目移动、通知角标等问题让工作流断裂，开发者需要更确定的状态管理。
- **配置与权限需要更直观**：`/config` 与 TUI presets 是正确方向，但 “Always allow” 不生效、通知声音无控制等说明设置层仍需统一。
- **子代理 / MCP 缺少治理能力**：高并发下需要能力代理、凭证隔离、资源池化和确定性清理，避免资源失控与权限扩散。
- **错误信息应更可诊断**：HRESULT、Model not found、Reconnecting 等应附带环境检查或修复建议，降低用户排查成本。

---

**结语**：`v0.163.0` 与一系列 TUI presets / 权限 / 状态栏 PR 表明 Codex 正在强化交互与可配置性；但社区反馈最迫切的仍是 Windows 桌面端稳定性、模型可用性和资源泄漏。若这些问题不能快速收敛，可能继续影响桌面端与自动化场景的采用。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-10-16）

## 今日速览
今日无新版本发布。社区讨论主要集中在子代理（Subagent）的可靠性问题上，包括挂起、错误恢复报告、上下文缺失等；同时多个 PR 聚焦核心设置、MCP 超时、IDE 集成与安全修复，开发者对 Agent 行为可控性和工具管理的关注度持续上升。

## 版本发布
无新版本发布。

## 社区热点 Issues

1. **#22323 [p1] Subagent 恢复被误报为 GOAL 成功，隐藏中断**  
   子代理在达到 MAX_TURNS 后仍报告 `status: "success"`，掩盖了实际中断。13 条评论，社区高度关注子代理状态准确性。  
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **#21409 [p1] 通用 Agent 无限挂起**  
   当 CLI 委托给 generalist agent 时永久挂起，简单操作如创建文件夹也会卡住。8 条评论、8 个赞，是当前最影响体验的严重 Bug 之一。  
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **#19873 [p2] 利用模型 Bash 亲和性：零依赖 OS 沙箱与执行后意图路由**  
   提议通过沙箱安全地发挥 Gemini 3 的原生 Bash 能力（grep、sed、awk 等），提升代码库探索与编辑效率。9 条评论，属于架构级增强。  
   https://github.com/google-gemini/gemini-cli/issues/19873

4. **#21983 [p1] 浏览器子代理在 Wayland 下失败**  
   browser subagent 在 Wayland 环境终止并报 GOAL，但实际未完成。4 条评论，Linux 桌面用户痛点。  
   https://github.com/google-gemini/gemini-cli/issues/21983

5. **#22186 [p1] get-shit-done 输出钩子导致崩溃**  
   输出即将完成时反复崩溃，影响自动化流程稳定性。3 条评论，p1 级崩溃问题。  
   https://github.com/google-gemini/gemini-cli/issues/22186

6. **#21763 [p1] Bug 报告不包含子代理上下文**  
   `/bug` 报告仅含主会话信息，缺少子代理内部执行细节，增加排查难度。2 条评论，与子代理可观测性直接相关。  
   https://github.com/google-gemini/gemini-cli/issues/21763

7. **#22745 [p2] 评估 AST 感知文件读取、搜索与映射的影响**  
   EPIC 级调查，探索 AST 工具能否减少误读、降低 token 噪声并提升导航精度。7 条评论，代表代码理解方向的长期投入。  
   https://github.com/google-gemini/gemini-cli/issues/22745

8. **#21968 [p2] Gemini 不主动使用技能和子代理**  
   用户反馈除非显式指令，否则模型几乎不会调用自定义 skills 和 sub-agents。7 条评论，反映 Agent 自主性不足。  
   https://github.com/google-gemini/gemini-cli/issues/21968

9. **#24246 [p2] 超过 128 个工具时遇到 400 错误**  
   可用工具数量过多导致 API 返回 400，期望 Agent 能智能限制工具范围。3 条评论，工具管理成为扩展性瓶颈。  
   https://github.com/google-gemini/gemini-cli/issues/24246

10. **#22672 [p2] Agent 应停止/劝阻破坏性行为**  
    模型在复杂 Git 操作中可能使用 `git reset`、`--force` 等危险命令，社区呼吁增加安全约束。3 条评论、1 个赞。  
    https://github.com/google-gemini/gemini-cli/issues/22672

## 重要 PR 进展

1. **#29762 [p1] 修复认证时保留磁盘编辑**  
   防止 `/auth signin` 覆盖启动后用户对设置文件的其他编辑。  
   https://github.com/google-gemini/gemini-cli/pull/29762

2. **#29767 [p1] 限制 MCP tools/list 发现超时**  
   为 MCP 工具发现增加短默认超时（60 秒），避免服务器无响应时静默卡住 10 分钟。  
   https://github.com/google-gemini/gemini-cli/pull/29767

3. **#28183 [p1] VS Code 扩展：关闭 diff 标签时保持终端焦点**  
   修复审批文件编辑后焦点被抢走的问题，提升 IDE 集成体验。  
   https://github.com/google-gemini/gemini-cli/pull/28183

4. **#29753 [p1/p2] 修复 Windows diff 命令参数格式化与引号处理**  
   确保通过 `cmd.exe` 启动外部 diff 编辑器时参数正确引用。  
   https://github.com/google-gemini/gemini-cli/pull/29753

5. **#29770 [p1] 移除 CI 工作流中不支持的 members 权限**  
   修复 `unassign-inactive-assignees` 工作流因权限问题失败。  
   https://github.com/google-gemini/gemini-cli/pull/29770

6. **#29773 [p2] 支持 keybindings.json 中的 `keys` 数组**  
   允许为单个键位绑定定义多个组合键，解决 schema 校验失败问题。  
   https://github.com/google-gemini/gemini-cli/pull/29773

7. **#29757 [p2] 验证活跃二进制更新，防止 PATH 遮蔽误报成功**  
   当存在多个安装时，确保自动更新真正作用于当前执行的二进制。  
   https://github.com/google-gemini/gemini-cli/pull/29757

8. **#29768 [p2] 重置斜杠命令冲突去重，允许重新通知**  
   命令冲突解决后若再次出现，会重新提示用户，避免遗漏。  
   https://github.com/google-gemini/gemini-cli/pull/29768

9. **#29769 [p2] 加强 SKILL.md frontmatter 解析**  
   兼容单行 `description`、BOM、尾随空格等平台差异，提升技能加载成功率。  
   https://github.com/google-gemini/gemini-cli/pull/29769

10. **#29750 [p2] 在加载 .env 文件后解析设置占位符**  
    修复 `loadSettings()` 中因加载顺序导致 `.env` 变量无法替换占位符的问题。  
    https://github.com/google-gemini/gemini-cli/pull/29750

## 功能需求趋势

- **子代理与 Agent 可靠性**：错误恢复、挂起、状态报告、上下文可见性、配置覆盖、自主调用技能/子代理是最集中的方向。
- **代码理解与 AST 工具**：AST 感知的文件读取、搜索、代码库映射被作为 EPIC 推进，目标降低 token 消耗、提升导航精度。
- **浏览器代理增强**：Wayland 兼容、会话接管、锁恢复、设置覆盖等需求突出。
- **任务跟踪持久化**：从上下文内 `WriteToDo` 迁移到文件型 CRUD，解决上下文腐化和跨会话记忆丢失。
- **安全与破坏性行为**：零依赖 OS 沙箱、阻止危险 Git 命令、文件凭证存储原子化等安全需求增多。
- **性能与交互**：终端 resize 无闪烁、减少临时脚本污染、修复交互式提示卡住。
- **工具管理与扩展性**：工具数量超过 128 报 400、MCP 发现超时、智能限制工具范围。
- **配置与设置**：settings.json 覆盖、符号链接代理识别、keybindings 数组、.env 占位符解析等细节问题持续被反馈。

## 开发者关注点

- 子代理挂起、错误报告为成功、Bug 报告缺少子代理上下文，严重影响调试和信任。
- 浏览器代理在 Linux Wayland 下失败、忽略 settings.json 覆盖，跨平台体验待提升。
- 模型不主动使用 skills 和 sub-agents，需要用户显式指令，自主性不足。
- 工具数量过多触发 400 错误，缺乏智能裁剪机制。
- 模型频繁在随机位置创建临时脚本，且可能执行 `git reset --force` 等破坏性操作。
- 交互式提示卡住、终端 resize 闪烁、`\n` 转义错误等核心交互问题仍待修复。
- 认证设置覆盖磁盘编辑、二进制更新 PATH 遮蔽、文件凭证存储并发丢失等日常使用痛点。
- MCP 工具发现超时过长（10 分钟），缺少快速失败机制。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报（2026-10-16）

> 数据来源：github.com/esengine/DeepSeek-Reasonix  
> 说明：以下内容基于过去 24 小时/近期更新整理，重点覆盖版本发布、Issues、PR 与社区需求趋势。

## 1. 今日速览

Reasonix 发布 v2.41.0 / Studio v2.41.0，新增辅助会话、命名模型与按角色推理强度、上下文详情展开等能力，并修复窄窗口布局、对比度、记忆召回和远控兼容问题。社区当前最集中的反馈是上下文压缩与会话长度异常，以及停止任务、后台任务状态和 Windows 进程清理问题，已有多个修复 PR 跟进。技能生态与 worktree 工作区配置也在持续推进。

---

## 2. 版本发布

### v2.41.0 / studio-v2.41.0

- **CLI v2.41.0**：由 Studio v2.41.0 构建发布。
- **Studio v2.41.0 新增**：
  - 设置 → 模型偏好新增「命名模型」和按角色的推理强度，可单独指定会话标题模型。
  - 新增「辅助会话」：主对话旁只读小问题，不写入主对话、不改文件，关闭即丢弃。
  - 上下文详情中每类占用可展开，查看最大的几项，仅显示大小和工具名。
  - 支持长粘贴按需保存为文件、会话行快捷按钮、沙盒设备白名单。
- **修复**：窄窗口布局、对比度、记忆召回、远控兼容等一批问题。

相关发布：  
https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.41.0

此外，PR #13339 已整理 Studio 2.42.0 release notes，说明 2.42.0 发布准备工作已启动：  
https://github.com/esengine/DeepSeek-Reasonix/pull/13339

---

## 3. 社区热点 Issues

1. **#13295 会话突然变长，压缩内容像被重新展开**  
   用户反馈会话从 332k 变成 1.2M，压缩因超长失败，中间切换过模型。该问题直接指向压缩结果复用条件，是长会话可用性的核心 Bug。已有 PR #13336、#13340 跟进。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/13295

2. **#11181 Windows 下 `reasonix-desktop.exe --host-rpc` 持续空转 1.4-1.7 核**  
   冷启动即可复现，长时间空闲 CPU 占用异常。该 Issue 已关闭，评论 8 条，属于高关注度性能问题。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/11181

3. **#13335 多工作区并行时「写范围」按同树公共祖先判定，导致同树下项目互相误锁**  
   用户本机 100% 复现，涉及多工作区隔离和写租约设计。PR #13337 已尝试说明具体 git 仓库折叠关系。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/13335

4. **#13299 会话进行中点停止，一直卡在“正在停止”**  
   v2.41.0 用户反馈，评论 2 条。该问题与 Windows 进程树清理相关，PR #13323 已为 `taskkill` 加时限。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/13299

5. **#13318 手动停止后继续任务，概率陷入思考循环**  
   同一任务可能循环三到四次才推进，用户怀疑重复提示词导致。PR #13325 指出停止后未应用的 steer 可能被重复处理。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/13318

6. **#13152 关闭 Reasonix 后重新打开，旧会话点击报“无法解析该会话路径”**  
   v2.40.0、Windows 环境，评论 2 条。属于会话持久化与路径解析回归，影响重启后恢复体验。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/13152

7. **#13320 RFC：通过构造约束压缩结果，并让摘要共享前缀**  
   作者为 @esengine，状态 DRAFT。该 RFC 讨论压缩机制的未来设计，涉及阈值、前缀复用和可测量性，是上下文管理方向的重要设计信号。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/13320

8. **#13284 压缩压不下去，会有 300k+，这是正常的吗？**  
   用户对压缩阈值和实际行为存在困惑，与 #13295 形成呼应，说明压缩策略需要更明确的状态提示。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/13284

9. **#13311 希望恢复个人 skill 目录写入授权，支持 AI 持续迭代已安装 skill**  
   用户指出 2.35.0 可把个人 skill 目录加入额外可写目录，2.41.0 被目录保护拒绝。该需求与 PR #13317、#13321、#13324 的技能更新链路直接相关。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/13311

10. **#13305 当前缓存相较之前显著降低，是 Reasonix 还是模型原因？**  
    缓存命中下降会直接影响长会话成本与响应速度。社区需要更清晰诊断入口，也反映对缓存/成本可观测性的关注。  
    https://github.com/esengine/DeepSeek-Reasonix/issues/13305

---

## 4. 重要 PR 进展

1. **#13336 fix(control): 打开会话时说明保存的 fold 为何未被复用**  
   直接回应 #13295：当保存的压缩结果因历史变化或谱系不匹配被丢弃时，不再静默发送完整历史，避免用户看到会话突然膨胀。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/13336

2. **#13340 test(boot): 系统提示变化时，已保存 fold 不应被复用**  
   为 #13295 增加 `boot.Build` 效果测试，同时覆盖系统提示未变化时保留 fold 的情况。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/13340

3. **#13337 fix(workspacelease): 说明哪个 git 仓库将两个文件夹折叠为同一写域**  
   针对 #13335 的误锁问题，明确 workspace 写租约按仓库折叠的行为，帮助定位同仓库下不同项目互相等待的原因。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/13337

4. **#13323 fix(proc): 限制 Windows 停止所依赖的 taskkill 耗时**  
   关联 #13299 与 #13319。Windows 上 `proc.KillTree` 原先无时限执行 `taskkill /F /T`，可能导致停止流程卡住。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/13323

5. **#13325 fix(inbox): 首份等待期间再次发送同样文字，不应变成另一项**  
   关联 #13318。停止 turn 后未应用的 steer 会变成 uncertain 并暂停队列，窗口可能重复提示，导致思考循环。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/13325

6. **#13273 feat(studio): 会话 worktree 配置与统一聊天区菜单**  
   新会话可在输入框下方选择「新建 worktree」和起始分支，首次发送时创建独立目录与任务分支，默认继续使用当前目录。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/13273

7. **#13321 feat(skills): 预览后从源文件夹更新已安装 skill**  
   #13311 的第三步：支持用户触发从源文件夹更新 skill，并需要安全审查。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/13321

8. **#13317 feat(skills): 记住已安装 skill 的来源，并显示是否同步**  
   为技能安装来源与同步状态建立记录，是技能可持续迭代的基础设施。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/13317

9. **#13328 feat(serve): `/status` 按来源携带会话用量，来自成本账本**  
   为 session overview 提供内核侧数据，包括按来源的缓存、成本、请求数等，支撑更细粒度的用量可视化。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/13328

10. **#13330 feat(studio): 缓存表后的会话概览，每个数字旁标注统计对象**  
    为 Studio 增加会话 overview，把缓存在 meter 与成本中的分散数字集中展示。  
    https://github.com/esengine/DeepSeek-Reasonix/pull/13330

---

## 5. 功能需求趋势

从本期 Issues 与 PR 看，社区关注方向主要集中在：

- **上下文压缩与缓存一致性**：会话突然变长、压缩失败、缓存下降、RFC 讨论等，说明长上下文管理是当前最核心的技术议题。
- **任务生命周期与停止可靠性**：停止卡死、后台任务假运行、思考循环、Windows 进程树清理，涉及 Agent 运行时稳定性。
- **多工作区隔离与写锁**：同 git 仓库下多个项目互相误锁，用户需要更细粒度、更可解释的 workspace lease。
- **技能生态可迭代**：个人 skill 目录写入授权、从源更新、来源追踪、更新预览，表明用户希望 AI 能持续维护已安装技能。
- **UI/UX 与信息架构**：侧边栏卡顿、滚动按钮行为、顶部功能栏精简、内置浏览器标签重命名、中文文案等，说明 Studio 交互细节仍高频被反馈。
- **会话持久化与恢复**：重启后会话路径无法解析，是影响日常使用的可靠性问题。
- **性能与资源占用**：Windows 空闲 CPU 空转、长任务后 UI 掉帧、缓存命中下降，持续受到关注。
- **模型与推理配置**：v2.41.0 已加入命名模型和按角色推理强度，后续可能继续围绕模型选择、成本与效果平衡扩展。

---

## 6. 开发者关注点

- **压缩行为必须可解释、可恢复**：用户不希望会话体积静默从 332k 涨到 1.2M，也不清楚 300k+ 是否正常。需要明确提示 fold 未复用、压缩失败、缓存变化的原因。
- **停止与清理链路要彻底**：Windows 下 `taskkill` 无时限、后台任务显示仍在运行、停止后重复 steer，都会破坏 Agent 的可控感。
- **多工作区需要更清晰的隔离语义**：按 git 仓库折叠写域虽有设计原因，但同仓库子项目互相误锁会严重影响并行开发，需要更细粒度或更明确提示。
- **技能目录写入权限是生态关键**：目录保护不能只“拒绝”，还需安全、可审计的更新与预览机制，才能支持 AI 持续迭代 skill。
- **长时间运行后的 UI 性能**：侧边栏展开收起卡顿、滚动按钮不能直达端部，反映 Studio 在长任务/长会话下的渲染与状态管理压力。
- **本地化与文案细节**：File manager / Terminal 中文化、按钮位置和样式等反馈虽小，但直接影响中文用户体验。
- **可观测性需求上升**：缓存、成本、上下文占用、后台任务状态都需要更直观的诊断面板，减少“是模型问题还是 Reasonix 问题”的猜测。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# 2026-10-16 OpenCode 社区动态日报

## 1. 今日速览

- v1.19.1 发布，正式停止会话分享功能，现有分享链接与导入能力全部移除。
- 社区热点集中在 Windows 平台问题、OpenTunnel 远程配对稳定性，以及 v1↔v2 迁移/降级导致的数据库与会话异常。
- 工具调用可靠性仍是核心：OpenCode Go 模型输出畸形 XML/DSML、Anthropic Sonnet 5.5 thinking 签名错误、服务重启打断工具调用等均被讨论。

## 2. 版本发布

**v1.19.1**  
- Core Bugfixes：Session sharing 已停止。现有分享链接和会话分享命令不再可用，从分享 URL 导入会话也不受支持。  
- 链接：https://github.com/anomalyco/opencode/releases/tag/v1.19.1

## 3. 社区热点 Issues

1. **#50206 [OPEN] OpenCode Go 模型输出畸形 XML/DSML 工具调用**  
   模型经常输出 XML/DSML 风格内容而非有效 tool-call payload，导致工具执行失败。8 条评论，属于核心工具链可靠性问题，社区关注度高。  
   https://github.com/anomalyco/opencode/issues/50206

2. **#55163 [OPEN] Windows ConPTY 下 TUI 退出后终端残留 raw mode**  
   Alacritty + zellij 等环境退出 TUI 后仍开启鼠标报告，可能拖垮整个 multiplexer 会话。8 条评论，V2 严重终端体验问题。  
   https://github.com/anomalyco/opencode/issues/55163

3. **#51553 [OPEN] npm 12 升级后 Windows 可执行文件仍是占位 stub**  
   `opencode upgrade` 报告成功，但 `bin/opencode.exe` 仍是文本占位文件，下次调用失败。4 条评论，影响 Windows 升级可靠性。  
   https://github.com/anomalyco/opencode/issues/51553

4. **#55555 [CLOSED] v2 降级回 1.19.0 后数据库混合状态，所有 v1 会话 500**  
   1.19.0 → 2.0.29 → 1.19.0 后，打开旧会话返回 `no such column: project_id`。迁移/降级路径高风险，2 条评论。  
   https://github.com/anomalyco/opencode/issues/55555

5. **#55891 [OPEN] 2.x 升级搁置旧服务停止前创建的会话**  
   v1→v2 会话迁移只运行一次并标记完成，旧 1.x 后台服务停止前写入的会话会被搁置。升级迁移边界条件问题，1 条评论。  
   https://github.com/anomalyco/opencode/issues/55891

6. **#55886 [OPEN] 服务重启打断工具调用，后续 Anthropic 请求失败**  
   重启中断 shell 工具调用后，下一次请求被 Anthropic 拒绝：`tool_use.input: Input should be an object`。工具调用状态管理问题，1 条评论。  
   https://github.com/anomalyco/opencode/issues/55886

7. **#55880 [OPEN] Sonnet 5.5 thinking block 签名无效**  
   Claude Sonnet 5.5 报错 `Invalid signature in thinking block`，提示块绑定到不同对话。新模型兼容性问题，1 条评论。  
   https://github.com/anomalyco/opencode/issues/55880

8. **#54631 [OPEN] v2 位置失效重复创建 fff engine，旧引擎不销毁**  
   每次位置图构建都会新建 fff engine，旧引擎在 v2 中从未销毁。2 条评论，已复现，属于资源泄漏/性能问题。  
   https://github.com/anomalyco/opencode/issues/54631

9. **#54624 [OPEN] CLI 需要重置/丢弃卡住的 OpenTunnel pending 隧道**  
   `opencode pair --remote` 卡在 pending 后无法丢弃，每次都会恢复同一坏隧道。5 条评论，阻塞远程配对工作流。  
   https://github.com/anomalyco/opencode/issues/54624

10. **#55873 [CLOSED] OpenTunnel 503 “storage unavailable” 导致远程配对不可用**  
    `pair --remote` 始终失败，OpenTunnel 服务返回 HTTP 503。3 条评论，服务端故障直接影响远程访问。  
    https://github.com/anomalyco/opencode/issues/55873

## 4. 重要 PR 进展

1. **#49954 [OPEN] fix(core): 对扫描器无法分解的命令执行权限检查**  
   当 shell 扫描器未解析出命令节点时，当前会跳过 `permission.assert`，导致裸重定向等命令绕过配置规则。安全相关修复。  
   https://github.com/anomalyco/opencode/pull/49954

2. **#55883 [CLOSED] fix(core): 即使命令无法解析也运行 shell 权限检查**  
   修复 #54393，对无法解析的原始命令仍执行权限检查，避免 PowerShell 等场景绕过 `shell` 规则。  
   https://github.com/anomalyco/opencode/pull/55883

3. **#55246 [OPEN] feat(desktop): 通过 `./gui` 导出发布 GUI 插件**  
   插件可在 server、`./tui` 之外提供 `./gui` 导出；桌面内置功能变为内置插件，统一在 Settings > Plugins 列出。提升桌面扩展性。  
   https://github.com/anomalyco/opencode/pull/55246

4. **#55248 [OPEN] feat(app): 添加 Commentary 时间线类别**  
   在 Settings → Timeline detail → Advanced 中新增 Commentary 行，可显示、分组或隐藏 agent 在工具调用间写的文本。  
   https://github.com/anomalyco/opencode/pull/55248

5. **#55890 [OPEN] fix(app): 目录选择器跳过已添加文件夹**  
   修复 #55887：展开后台预加载的文件夹时不再重复添加，避免 `Path already exists` 错误。  
   https://github.com/anomalyco/opencode/pull/55890

6. **#55882 [OPEN] fix(client): 服务注册指向死进程时立即启动**  
   重启或崩溃后遗留 `service.json`，导致桌面首次启动等待 5 秒。现在检测到死进程会立刻启动替代服务。  
   https://github.com/anomalyco/opencode/pull/55882

7. **#55595 [CLOSED] fix(cli): Windows 结束会话时关闭服务**  
   Windows 重启/注销会无声杀死后台服务并遗留注册文件；该 PR 在会话结束时主动关闭服务，避免下次启动等待。  
   https://github.com/anomalyco/opencode/pull/55595

8. **#55871 [CLOSED] fix(tui): 紧凑数字在舍入边界正确进位到 M**  
   修复 #55256：999,950–999,999 此前显示为 `1000.0K`，现在正确显示 `1.0M`。  
   https://github.com/anomalyco/opencode/pull/55871

9. **#55756 [OPEN] fix(core): 在冷激活前发布 prompt 准备状态**  
   在 inbox 协调后、冷位置/插件准备前发布临时 `busy` 状态，改善 prompt 准备阶段的用户反馈。  
   https://github.com/anomalyco/opencode/pull/55756

10. **#55893 [OPEN] fix(cli): 大 stdout 写入可跨单个 pipe buffer**  
    修复 `opencode --completions fish` 约 68 KiB 输出经管道时丢失 65536 字节之后内容的问题。  
    https://github.com/anomalyco/opencode/pull/55893

## 5. 功能需求趋势

- **远程访问与隧道稳定性**：OpenTunnel 远程 URL 不附加、隧道卡住无法重置、服务 503，是远程开发工作流的主要阻塞点。
- **升级/迁移与降级可靠性**：Windows npm 升级、v1↔v2 数据库迁移、旧会话搁置等问题反复出现，社区需要更稳健的迁移与回滚机制。
- **Windows 平台体验**：TUI raw mode 残留、升级后 exe 无效、插件更新闪出 git 控制台，Windows 相关反馈密集。
- **工具调用与模型兼容**：OpenCode Go 模型畸形 XML/DSML、Anthropic thinking 签名、服务重启中断工具调用，直接影响核心请求链路。
- **资源管理与性能**：fff engine 重复创建不销毁、可配置 loaded-location 上限与驱逐并发，长期运行/多目录场景下的资源控制需求上升。
- **TUI/UX 细节**：斜杠自动补全重复别名、数字格式化边界错误，说明社区对终端交互细节敏感。
- **插件与桌面扩展**：GUI 插件导出、Commentary 时间线分类，显示桌面端可扩展性和可配置性在增强。
- **权限与安全**：无法解析命令时跳过权限检查的问题被多个 PR 修复，安全边界受到重视。

## 6. 开发者关注点

- **Windows 日常使用痛点集中**：终端状态恢复、升级后可执行文件损坏、控制台闪窗，影响安装、运行、退出全流程。
- **版本迁移路径脆弱**：v1↔v2 升级/降级可能导致数据库不兼容、会话 500 或被搁置，开发者需要更清晰的迁移保证和回滚方案。
- **工具调用可靠性是核心链路痛点**：模型输出格式、thinking 签名、服务重启中断都会让请求失败，且难以自行恢复。
- **OpenTunnel 服务稳定性与可恢复性不足**：503 和卡住隧道无法重置，直接阻塞 `pair --remote` 远程配对。
- **资源泄漏与容量控制需求明确**：长生命周期进程、多短生命周期目录场景下，fff engine 重复创建和缺失上限会带来性能与内存问题。
- **权限检查绕过风险**：shell 扫描器无法解析命令时跳过检查，已有 PR 修复，说明安全规则边界需要更严格覆盖。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报
**日期：2026-10-16** ｜ 数据源：`github.com/deepseek-ai/deepseek-harness`

> **数据说明**：本期 Issues 与 PR 在统计窗口（过去 24 小时）内更新数均为 **0**，因此第 3、4 部分无实体条目可列举；第 5、6 部分的分析基于本次 Release 内容与历史上下文推断，已明确标注，未虚构条目。

---

## 1. 今日速览

今日唯一动态是 **dsh-v0.2.1-alpha.4** 预发布版本上线，聚焦两类能力：**自定义模型推理等级的可视化配置**（告别手改配置文件）与**自定义插件索引源发现/安装**，插件生态的可扩展性明显前进一步。修复侧集中在编辑器输入边界（命令与参数交界处）、Office 文件交付链路与开发者工具相关缺陷。Issues 与 PR 全天零更新，社区处于"发布后静默期"，尚无对新版本的反馈沉淀。

---

## 2. 版本发布

### dsh-v0.2.1-alpha.4
🔗 https://github.com/deepseek-ai/deepseek-harness/releases

#### 新增功能

| 功能 | 说明 | 作者 |
|---|---|---|
| 自定义模型推理等级 UI 配置 | 可在 UI 中为各模型配置推理等级，**无需手动修改配置文件**，降低多模型场景的调参门槛 | @LegGasai |
| 自定义插件索引源 | 支持从用户自建的"插件索引源"中发现并安装插件，插件分发不再局限于官方源 | @turtle1999 |

#### 问题修复

| 修复项 | 说明 | 作者 |
|---|---|---|
| 命令/参数交界处输入异常 | 修复交界处输入异常；支持整体选中与删除，并在撤销或页面刷新后正确恢复 | @LegGasai |
| Office 文件交付优化 | 避免回复中引用已被删除的预览图，减少 PDF 导出后不必要的工具查找与额外检查 | @yudshj |
| 开发者工具相关缺陷 | 修复启用开发者工具后仍存在的遗留问题（**原始 Release 正文在此处截断，未获取到完整描述**） | — |

> 版本号仍处于 `alpha` 通道，建议生产环境谨慎升级。

---

## 3. 社区热点 Issues

**过去 24 小时内：无新 Issue，无 Issue 更新（共 0 条）。**

无法按"最值得关注的 10 个 Issue"要求列举实体条目——在无数据的情况下编造 Issue 编号、标题与社区反应会误导读者。本节留空，待后续窗口回补。

---

## 4. 重要 PR 进展

**过去 24 小时内：无 PR 创建或更新（共 0 条）。**

新增功能与修复均随 `v0.2.1-alpha.4` 直接发布，未观测到处于开放状态的待合并 PR。本节留空。

---

## 5. 功能需求趋势（基于发布内容的推断，非社区 Issue 统计）

⚠️ 因 Issues/PR 为零，以下方向来自本次 Release 的功能取舍，仅代表**维护者当前投入方向**，不等同于社区需求分布：

1. **模型配置的"去文件化"与可视化治理** — 推理等级从配置文件迁移到 UI，说明多模型/多等级组合已成为高频使用场景，手改 YAML/JSON 的体验成为瓶颈。
2. **插件生态的开放分发** — 自定义索引源意味着官方可能在做"插件市场"的开放协议层，社区侧的自建源、私有源需求值得关注。
3. **文档/Office 交付链路的稳定性** — 连续针对预览图引用、PDF 导出后冗余工具调用做优化，指向"产出物交付"这一长尾但高频的体验痛点。
4. **编辑器的输入鲁棒性** — 命令与参数交界、整体选中删除、撤销与刷新后的状态恢复，属于典型的编辑器核心交互体验问题。

---

## 6. 开发者关注点（痛点归纳）

同样基于发布内容推断，本期修复项反向暴露了以下高频痛点：

- **配置门槛**：自定义模型需手改配置文件 → 诉求是"配置即界面"。
- **插件获取路径单一**：仅官方索引源 → 诉求是私有源/企业内源/第三方源的发现与安装能力。
- **Agent 产出物的引用一致性**：已删除的预览图仍被引用，暴露出上下文与文件状态同步问题；同时 PDF 导出后的重复工具查找说明**工具调用存在冗余开销**。
- **编辑器状态持久化**：撤销与页面刷新后输入状态丢失，影响长会话可靠性。
- **开发者工具可用性**：该修复项在 Release 正文中被截断，建议关注后续 alpha 版本是否补齐说明。

---

### 下期观察建议

1. 跟踪 `v0.2.1-alpha.4` 发布后 24–48 小时内是否出现回归类 Issue（尤其是自定义索引源的插件安装失败、推理等级配置未生效）。
2. 关注 `dsh-v0.2.1-alpha.5` 是否补齐被截断的开发者工具修复说明。
3. 若 Issues/PR 连续多日为零，可考虑扩大统计窗口至 7 天，避免日报信息密度过低。

*本日报由 GitHub 公开数据自动汇总生成，条目以原始数据为准。*

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报（2026-10-16）

数据来源：`github.com/NousResearch/hermes-agent`

## 1. 今日速览

- v0.22.2 已发布，用于修正 v0.22.1 从错误 commit 构建、提前带入未完成 gateway 工作，以及 Microsoft Store 应用可能卡在 “Connecting” 的问题。
- 统一网关 PR #106742 合并后的回归修复继续主导社区：追踪 Issue #134889 已有 68 条评论，覆盖会话、网关、桌面、Windows、配置等多个组件。
- 安全、更新可靠性、提供商兼容仍是重点：依赖漏洞、1Password vault 填充、Anthropic 非流式路径、Azure Foundry 模型兼容等问题集中出现。

## 2. 版本发布

### v0.22.2

- **发布日期**：2026-10-15
- **核心内容**：v0.22.1 从错误 commit 构建，发布了未完成的 gateway 工作，且 Microsoft Store 应用可能卡在 “Connecting”。v0.22.2 是 v0.22.1 原本应发布的版本。
- **已知问题**：在 0.22.1 gateway 下运行的会话……（发布说明中该段被截断）。
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.2

## 3. 社区热点 Issues

1. **#134889 [P1] 统一网关拥有所有本地会话——合并后修复追踪**  
   68 条评论，是当前最热的追踪 Issue。标签覆盖 agent、CLI、gateway、TUI、ACP、cron、desktop、Windows、sessions、profiles，说明 #106742 合并后仍有大量跨表面回归需要协调。  
   链接：https://github.com/NousResearch/hermes-agent/issues/134889

2. **#134394 依赖 pin 携带开放安全公告**  
   `hermes security audit` 报告约 50 个已知漏洞，涉及 PyJWT、httpx2、urllib3、oauthlib 等依赖。对安装更新和供应链安全影响较大，已有 4 条评论。  
   链接：https://github.com/NousResearch/hermes-agent/issues/134394

3. **#132492 1Password vault fill 无法确定页面 origin**  
   Browser Use Cloud 的 `browser_exec` 可正常打开登录页并输入用户名，但原生 `browser_vault_fill` 无法确定页面 origin。涉及认证与安全边界，P2，4 条评论。  
   链接：https://github.com/NousResearch/hermes-agent/issues/132492

4. **#125095 claude-subscription-directsdk 被强制走非流式路径**  
   240s reasoning-model stale floor 会杀死健康的长 Opus 响应。该问题影响 Anthropic 订阅用户的长推理体验，8 条评论、1 个 👍。  
   链接：https://github.com/NousResearch/hermes-agent/issues/125095

5. **#139091 stable 更新 10s merge-base 探测超时**  
   即使两个 commit 都在本地，`hermes update` 仍会在任何 fetch/checkout 前中止。稳定通道用户更新受阻，已有 3 条评论，并已有对应 PR #139506。  
   链接：https://github.com/NousResearch/hermes-agent/issues/139091

6. **#139048 孤儿 gateway_routing 条目无法清理，Desktop 404 删除失败不命名目标**  
   Desktop + host-gateway 场景下，删除失败只显示 `404 not_found`，没有 session id，也不在主进程日志中。P2，影响会话状态诊断。  
   链接：https://github.com/NousResearch/hermes-agent/issues/139048

7. **#139496 Desktop 单会话删除在 multiplex 次要 profile 下总是 409**  
   在 gateway multiplex 模式下，Desktop 删除次要 profile 的单个聊天总是返回 `runtime_coordination_required`。P2、重复，但反映多 profile 会话协调问题。  
   链接：https://github.com/NousResearch/hermes-agent/issues/139496

8. **#139492 `/context` 显示虚构的 256K fallback 作为真实上下文窗口**  
   用户看到 `used` 大于 `window`、100%、headroom 为 0 的自相矛盾仪表；实际会话可能有 1M token 窗口。已有对应修复 PR #139503。  
   链接：https://github.com/NousResearch/hermes-agent/issues/139492

9. **#90435 提议统一 Desktop Preview 与 Browser 为 Workspace Viewer**  
   希望把预览栏、Markdown/diff/图片/PDF/音视频查看器与内嵌 Browser 合并为人类-代理共享工作区。属于长期功能方向，needs-decision。  
   链接：https://github.com/NousResearch/hermes-agent/issues/90435

10. **#120263 Azure Foundry gpt-6-luna 需要 Responses API**  
    当同时启用 function tools 和 `reasoning_effort` 时，`/v1/chat/completions` 被 Azure Foundry 拒绝。影响新模型兼容，3 条评论。  
    链接：https://github.com/NousResearch/hermes-agent/issues/120263

## 4. 重要 PR 进展

1. **#139509 [OPEN] feat(plugins): 捆绑 hermesvault 秘密源**  
   新增可选捆绑插件 `plugins/hermesvault/`，为 Hermes 提供 agent 自有的本地 AES-256-SIV SQLite 秘密存储。它不是浏览器填充凭证库，而是第二秘密存储后端。  
   链接：https://github.com/NousResearch/hermes-agent/pull/139509

2. **#139483 [OPEN] fix(gateway): Ink 和 Desktop 会话的 slash 命令遵循会话 checkpoints 和 repo**  
   `/diff session` 现在尊重 `--checkpoints`，仓库内受信项目技能会出现在自动补全和命令列表中并可运行。  
   链接：https://github.com/NousResearch/hermes-agent/pull/139483

3. **#93508 [OPEN] feat(webapp): 在浏览器中服务 Desktop renderer**  
   新增 `hermes webapp`，以认证的浏览器托管模式运行真正的 Hermes Desktop renderer，而不仅是 Web Dashboard。  
   链接：https://github.com/NousResearch/hermes-agent/pull/93508

4. **#117321 [OPEN] feat(sessions): opt-in takeover，让一个聊天跨设备跟随**  
   当前会话锁按 surface 而非人绑定，导致同一用户的桌面端会拒绝其手机端。该 PR 增加显式接管选项。  
   链接：https://github.com/NousResearch/hermes-agent/pull/117321

5. **#117280 [OPEN] feat(discord): 增加频道、角色和服务器管理动作**  
   为 `discord_admin` 工具增加 7 个动作，包括创建/编辑/删除频道、创建/编辑角色等。  
   链接：https://github.com/NousResearch/hermes-agent/pull/117280

6. **#139506 [OPEN] fix(update): 在 commit-graph 写入后本地回答 ancestry probe**  
   针对 #139091 的性能问题：在 commit-graph 写入关闭的 checkout 上，本地 `merge-base --is-ancestor` 仍可能消耗约 12 秒 CPU。  
   链接：https://github.com/NousResearch/hermes-agent/pull/139506

7. **#139503 [OPEN] fix(gateway): 防止 `/context` 将虚构 256K fallback 当作窗口**  
   当 resolver 无法确定模型上下文长度时，不再把硬 fallback 值显示为真实窗口。  
   链接：https://github.com/NousResearch/hermes-agent/pull/139503

8. **#139504 [OPEN] fix(desktop): 重新进入会话时恢复待处理 clarify cards**  
   修复 Desktop 中未回答的 clarify card 在切换会话再回来后消失的问题，使其保持可见且可回答。  
   链接：https://github.com/NousResearch/hermes-agent/pull/139504

9. **#130458 [OPEN] fix(agent): 不要在 rate limit 重置超过 600s 上限时睡眠 600s**  
   当前退避会把 `Retry-After` 钳制到 600 秒；对于周限额约 1.9 天后重置的场景，等待无效。该 PR 改进退避逻辑。  
   链接：https://github.com/NousResearch/hermes-agent/pull/130458

10. **#123977 [OPEN] feat(plugins): terminal 命令的 `command_guard` 钩子**  
    `pre_tool_call` 只能看到模型发起的工具调用，直接调用 `terminal_tool()` 的代码不会被插件否决。该 PR 增加终端命令守卫钩子。  
    链接：https://github.com/NousResearch/hermes-agent/pull/123977

## 5. 功能需求趋势

从近期 Issues 与 PR 看，社区关注方向集中在以下几类：

- **统一网关与多表面会话一致性**  
  一个 gateway 拥有所有本地会话、孤儿 `gateway_routing`、Desktop 删除 409、Bot Mode DM 排队、跨设备接管等，说明多表面/多设备会话状态协调是当前最大主题。  
  代表：#134889、#139048、#139496、#117321、#139483

- **桌面与浏览器工作区融合**  
  Desktop Preview 与 Browser 统一、浏览器托管 Desktop renderer、桌面 i18n、clarify card 恢复等，显示社区希望桌面体验更统一、更可访问。  
  代表：#90435、#93508、#139461、#139504

- **安全与秘密管理**  
  依赖漏洞、1Password vault origin、bundled hermesvault、terminal command_guard，表明安全边界和 agent 自有秘密存储是高频需求。  
  代表：#134394、#132492、#139509、#123977

- **提供商与模型兼容**  
  Anthropic 非流式路径、Azure Foundry gpt-6-luna Responses API、rate limit 退避、AuthError 错误码等，说明新模型/提供商接入和错误处理仍需加强。  
  代表：#125095、#120263、#138785、#130458

- **更新、安装与依赖健康**  
  stable 通道更新失败、merge-base 超时、pyc 缓存膨胀、依赖 pin 安全问题，均指向安装更新链路的可靠性。  
  代表：#139091、#139099、#139500、#134394

- **Windows 平台完善**  
  Bot Mode DM turn lock 无 `fcntl`、Windows 测试假设 POSIX、runner cygpath、Microsoft Store 连接问题，说明 Windows 仍是一等平台需求。  
  代表：#139507、#125263、#121225、#119071

- **可观测性与错误透明度**  
  `/context` 错误 fallback、provider stall 无提示、Desktop 404 不显示 session id、AuthError 无 code，都是用户无法判断系统状态的问题。  
  代表：#139492、#139502、#139048、#138785

## 6. 开发者关注点

- **网关统一后的回归与协调成本**  
  #134889 作为 P1 追踪 Issue 已积累 68 条评论，覆盖 sessions、profiles、Windows、桌面和 gateway，说明合并后的状态协调和消息投递仍是最大痛点。

- **更新通道对 git 安装不友好**  
  stable 通道会给 main 分支的 git 安装反复提供 v0.22.2 并失败，`merge-base` 探测还可能超时。#139091 与 #139506 正在处理，但更新器体验仍需系统修复。

- **安全债与供应链风险**  
  `pyproject.toml` 中的依赖 pin 已携带开放安全公告，`hermes security audit` 报告约 50 个发现。开发者需要更频繁的依赖升级和安全审计集成。

- **Windows 平台缺口**  
  从 Bot Mode DM 的 turn lock、POSIX 测试假设，到 runner 路径和 Store 连接，Windows 相关问题分散但高频。社区期待 Windows 行为与 POSIX 对齐。

- **错误码与诊断信息不足**  
  Anthropic AuthError 没有 `code`，导致 kanban worker 退出 1 而非 75；Desktop 删除 404 不含 session id；provider stall 时 UI 无反馈。这些都会增加调试和自动化处理成本。

- **资源占用与安装体积**  
  约 12,600 个 `*.pyc` 文件占用超过 180 MiB，以及 root owned 备份文件被放入 profile 的 backup 目录，反映安装和维护脚本仍需清理。

- **国际化硬编码**  
  Desktop 中 300+ 用户可见字符串硬编码，语言包无法覆盖。随着非英语用户增长，i18n 会从边缘需求变成常规质量项。

- **流式与超时/退避策略**  
  Anthropic 长 Opus 响应被非流式路径和 240s stale floor 杀掉，rate limit 重置超过 600s 时又可能无效等待。开发者需要更细粒度的流式、超时和退避策略。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 · 2026-10-16

---

## 一、今日速览

今日主线是**性能与可靠性收敛**：v2026.10.10-beta.1 把 Gateway 的 SQLite 与主线程负载大幅下沉到 worker 线程，配套的十余个 PR（多数由 @steipete 提交）在同步"去重复所有权、信任已确认事实"的架构清理。同时社区连续报出多个 **P1 级资源与升级问题**——Docker 启动 10 分钟、Node 编译缓存涨到 26 GB、飞书审批卡片被 V2 schema 拒绝，值得优先关注。

---

## 二、版本发布

**v2026.10.10-beta.1（最新 beta）**
核心是"更快更稳的 Gateway"：聊天轮次、会话列表、启动与空闲状态的 SQLite 查询和主线程工作量显著下降，更多数据库工作迁移到 worker 线程，使高负载主机和大规模 agent 集群保持响应。
https://github.com/openclaw/openclaw/releases

**v2026.10.5-beta.4**
更新流程更可靠：macOS 更新不再因别名临时目录超时；systemd 用户安装会回收被遗弃的 runtime；pacman 与 FreeBSD 的包安装交还给包管理器处理；快照失败在更早阶段被识别。

**v2026.9.33（extended-stable / LTS 等价）**
仅网关侧的长期稳定版本：2026 年 9 月底的 OpenClaw 基线，叠加关键安全更新、可靠性/性能修复，以及新模型支持等特性。

---

## 三、社区热点 Issues

1. **[P1] Docker entrypoint 每次启动都跑 doctor --fix，产生约 11 GB 预修复快照，启动约 10 分钟，30 天保留写满磁盘**
   #173564 · @8bitsforge · 2026-10-15 提交
   官方镜像的 entrypoint 在前台 gateway 启动前无条件执行 `doctor --fix --non-interactive`，把每个本地 SQLite 存储全量捕获到 `<stateDir>.up...`。容器化部署的磁盘与启动时间双重灾难，P1 且需产品决策。
   https://github.com/openclaw/openclaw/issues/173564

2. **[P1] Node 编译缓存远超 MAX_BYTES（512 MiB），macOS 上 3.5 天涨到约 26 GB**
   #173568 · @personaltrainerkoichan · 更新于 2026-10-16
   `$TMPDIR/node-compile-cache/openclaw/...` 达到约 512 MiB 上限的 50 倍，且短生命周期的 CLI 进程永远无法完成维护清理。属于"无崩溃但状态错误"的静默资源泄漏。
   https://github.com/openclaw/openclaw/issues/173568

3. **[P1] 飞书 V2 卡片 schema 拒绝已废弃的 `action` 容器，exec/plugin 审批卡片报错 230099**
   #79824 · @xiabee · 2026-05-09 创建，持续更新
   内置 `@openclaw/feishu` 插件仍在卡片顶层使用 `{ tag: "action", actions: [...] }`，而飞书 V2 已移除该容器，所有带按钮的卡片被服务端拒绝。影响审批链路，属消息丢失级问题，已有链接受理 PR。
   https://github.com/openclaw/openclaw/issues/79824

4. **[P2] reasoning 思考过程在回复完成后自动消失，无法回顾**
   #79469 · @moc2216 · 中文提案
   流式输出期间可见思维链，回复结束后被自动折叠/隐藏，用户无法回溯模型推理过程。对调试与信任建立影响明显，社区标记为 🦞 diamond lobster。
   https://github.com/openclaw/openclaw/issues/79469

5. **[P2] Cron `consecutiveErrors` 在 gateway 重启中断时递增，掩盖真实 agent 失败率**
   #77298 · @aderius
   修完"重启中断被静默标记完成"后翻转到另一个极端：中断被算作失败并污染连续错误计数，使监控指标失真。可观测性类问题，容易误导自动化运维决策。
   https://github.com/openclaw/openclaw/issues/77298

6. **从 2026.8.35 升级间歇性失败：GATEWAY_RESTART_PREPARATION_REFUSED（serving-owner），但新版本实际已在运行**
   #173570 · @obviyus · 2026-10-15
   systemd + npm 全局安装路径下，更新本身成功却报 `restart-unhealthy`。升级路径的幂等性与状态判定问题，直接关系到 LTS 用户能否平滑升级。
   https://github.com/openclaw/openclaw/issues/173570

7. **[P2] Memory Dreaming 会把 assistant 内部过程闲聊写进 session-corpus 候选**
   #80664 · @ArthurNie
   内部过程文本进入 `memory/.dreams/session-corpus/*`，并经 Light/REM/Deep 进入长期记忆晋升候选，污染记忆质量。与下面两条共同构成"记忆/Dreaming"议题簇。
   https://github.com/openclaw/openclaw/issues/80664

8. **[P2] Dreaming 阶段崩溃恢复：检测并记录被中断的运行**
   #97692 · @lg320531124
   进程崩溃、OOM 或超时导致 dreaming 阶段中途死亡时，系统无法识别部分运行，也无法恢复或干净丢弃。对记忆系统的数据一致性至关重要。
   https://github.com/openclaw/openclaw/issues/97692

9. **[P2] `lightContext: true` 导致隔离会话缺失 TOOLS.md / AGENTS.md / LEARNINGS.md**
   #96334 · @taosiuman
   cron 任务开启轻上下文后跳过工作区文件加载，agent 丢失关键工具使用规则。属于"优化开关与语义完整性冲突"的典型问题，影响定时任务可靠性。
   https://github.com/openclaw/openclaw/issues/96334

10. **[P2] Chrome relay：`Network.setCacheDisabled` 在已授权导航中误报"访问被撤销"**
    #173453 · @ValantisV · 标记 fix-shape-clear / queueable-fix
    当已授权导航在命令在途时改变文档修订号，该命令会报 `tab <id> access was revoked`。已有隔离复现，无需移除标签权限即可重现，属浏览器自动化稳定性问题，修复路径清晰。
    https://github.com/openclaw/openclaw/issues/173453

> 其余值得留意的条目：**#95072**（Windows `/restart` 回退为进程内重启，PID 不变）、**#173562**（Pixel 9 上 en-CA 听写不可用，en-US 正常）、**#79902**（在 database-first runtime 上开放 companion 友好的 SQLite transcript/session 接缝）、**#96597**（google-vertex 模型列表硬编码，需动态目录与覆盖选项）、**#80176**（Codex×Pi parity Phase 5：JSONL 会话回放测试框架）。

---

## 四、重要 PR 进展

1. **#173337 refactor(ui): trust owned facts and remove redundant adapters**（web-ui / gateway / XL）
   Control UI 在事实已由所有者确立后仍重复解析、拷贝与转发；本 PR 移除冗余适配层，声明不改变渲染、文本、功能、配置与协议行为。@steipete
   https://github.com/openclaw/openclaw/pull/173337

2. **#173556 refactor(gateway): collapse duplicate read and service lifecycles**（XL，security-sensitive-changed）
   移除 Gateway 显示读取与服务适配器中重复的生命周期准备逻辑，保留安全效果、有界工作、每会话 FIFO 与提交语义。与 beta 的"更稳 Gateway"主题直接对应。
   https://github.com/openclaw/openclaw/pull/173556

3. **#173534 perf(state): keep plugin and GitHub reads off the writer queue**（P2）
   未缓存的插件状态读取与 GitHub 发布状态查询此前占用共享 SQLite 写队列，拖慢无关写入与附件元数据；现将 5 个纯读操作移出写队列。启动与 UI 重连场景收益明显。
   https://github.com/openclaw/openclaw/pull/173534

4. **#173548 perf(subagents): release settled run text from memory**（L）
   已完成的 subagent 运行会长期把完整 task/result 字符串留在活跃注册表、持久化行读缓存与会话列表索引中；本 PR 让已结算运行释放大体积载荷，保留可选择的摘要。
   https://github.com/openclaw/openclaw/pull/173548

5. **#173571 fix(agents): keep deepseek v4 reasoning replay when the transport requires it**（XS）
   `resolveTranscriptPolicy` 中的 `REASONING_CONTENT_REPLAY_MODEL_IDS` 遗漏 `deepseek-v4-flash` / `deepseek-v4-pro`，导致无插件所有的 OpenAI-completions 路由丢失历史 reasoning。新模型适配类修复。
   https://github.com/openclaw/openclaw/pull/173571

6. **#173560 fix: exclude generated sandbox skills from Git changes**（docs / gateway / docker，S）
   关闭 #173546。沙箱 Git 工作流会把运行时提供的 skill 包识别为未跟踪变更，使小任务产生大量噪声 diff；本 PR 将其从普通 Git 发现中排除。
   https://github.com/openclaw/openclaw/pull/173560

7. **#167275 fix(usage): Usage tab double-counts prompts that older Codex runs mirrored twice**（P2，proof: sufficient + 截图）
   关闭 #140464。旧版 Codex app-server 运行会把同一条 prompt 镜像两次，导致 Usage 页把一条提示计为两条用户消息。计数准确性修复。
   https://github.com/openclaw/openclaw/pull/167275

8. **#155634 feat(provider): add Databricks Unity Gateway**（XL，dependencies-changed）
   关闭 #155633。为通过 Databricks Unity Gateway 路由推理的组织提供 provider 级 onboarding 与模型解析，此前需手工编写 workspace 路由、凭据、传输与模型元数据。企业侧新接入方向。
   https://github.com/openclaw/openclaw/pull/155634

9. **#173572 fix(cron): ignore rate-limit cooldowns when Doctor records an automation account**（XS）
   关联 #173509。当常用首选账号在 Doctor 运行期间处于限流冷却时，planner 会把账号移到列表末尾，导致 Doctor 记录错误的自动化账号。升级期间的账号归属修正。
   https://github.com/openclaw/openclaw/pull/173572

10. **#173566 fix(cli): report resource disposal failures after cleanup deadlines**（cli，S）
    CLI 资源释放此前吞掉普通失败（包括超过上报截止时间后的 rejection），命令可能在不告知操作者的情况下结束。现在会在 stderr 输出脱敏诊断。
    https://github.com/openclaw/openclaw/pull/173566

> 另有一条**明确标注"do not merge"的实验性 PR #173550**（overlap plugin service startup），用于测量部署后仪表盘深链重连的启动归因，可作为性能路线的信号观察。
> https://github.com/openclaw/openclaw/pull/173550

---

## 五、功能需求趋势

**1. Gateway / 状态层性能与内存治理（今日最强主线）**
从 v2026.10.10-beta.1 的 release note 到 #173534、#173548、#173556、#173481、#173527、#173563 等一整批重构，方向高度一致：把 SQLite 写入从主线程与写队列中剥离、信任已准入事实、删除重复的生命周期与适配器。这已不是零散优化，而是一次系统性的所有权模型重构。

**2. 记忆系统（Memory Dreaming）的语义边界与容错**
#80664（过滤过程闲聊）、#97692（崩溃恢复）、#79916（允许纯机器可读 dreaming，关闭 Dream Diary 散文）、#79902（在 database-first runtime 上开放 canonical transcript/session 接缝）构成一组需求：社区希望 dreaming 既可编程、可过滤，又能从崩溃中恢复。

**3. 新模型与 provider 动态化**
#96597 要求 google-vertex 模型目录动态拉取 + 覆盖选项；#155634 引入 Databricks Unity Gateway；#173571 补上 deepseek v4 的 reasoning 回放。模型支持正从"硬编码清单"转向"可动态发现 + 可覆盖"。

**4. 上下文完整性与隔离会话**
#96334（lightContext 丢工具规则）、#79859（TUI 录制友好静默状态）、#173562（Android 听写 locale 支持）反映同一类诉求：优化开关不应悄悄改变语义完整性，多平台/多语言能力需要一致覆盖。

**5. 跨平台运维可靠性**
#95072（Windows /restart 不换 PID）、#173570（systemd 升级假失败）、#173568（macOS 编译缓存无界增长）、beta.4 中 pacman/FreeBSD 的包管理交还——升级、重启、清理三条路径在各平台仍不齐整。

**6. 渠道渲染与审批兼容**
#79824（飞书 V2 卡片）、#80432（Matrix 出站 @mention 缺 matrix.to pill 与 m.mentions）指向同一类问题：第三方渠道协议演进后的兼容性维护滞后。

---

## 六、开发者关注点

- **磁盘与内存的无界增长是当前最尖锐的痛点。** 单日出现两条 P1：Docker 启动产生 11 GB 快照（#173564）、Node 编译缓存 3.5 天涨到 26 GB（#173568），再加上 subagent 已结算文本长期驻留内存（#173548）。这类问题不崩溃、不报错，但会静默拖垮生产环境，开发者对"有上限、可自清理"的资源语义诉求强烈。

- **升级与重启路径的可信度不足。** #173570 更新成功却报 `restart-unhealthy`、#95072 `/restart` 在 Windows 上 PID 不变——UI 显示成功而实际状态不符，是运维场景中最难排查的一类故障。

- **可观测性指标被污染。** #77298 的 cron `consecutiveErrors` 把网关重启算作 agent 失败、#167275 的 Usage 页重复计数、#173572 的 Doctor 记录错误账号——开发者需要的是"能直接用于告警和容量规划"的准确指标。

- **内部状态的编程化访问需求浮现。** #79902 明确希望不要靠"抓取不透明 blob"或重实现内部分支/会话逻辑，而是在 canonical runtime state 之上提供稳定接缝；#80176 的 JSONL 会话回放在做轨迹 diff 测试。这标志着社区正从"用 OpenClaw"走向"在 OpenClaw 上构建"。

- **标签体系（clawsweeper / issue-rating）正在承担分流职能。** 大量 issue 带 `needs-product-decision`、`needs-maintainer-review`、`queueable-fix`、`source-repro` 等标记，说明项目方在规模化处理 issue 时依赖自动化分类，但也意味着不少高价值条目（如 #79469 reasoning 可见性）仍卡在"待产品决策"环节。

---

*本日报基于 github.com/openclaw/openclaw 公开数据生成，数据窗口为 2026-10-15 至 2026-10-16。*

:::
