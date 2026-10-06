---
title: "AI CLI 工具社区动态日报"
published: 2026-10-06
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-06

> 生成时间: 2026-10-06 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具社区横向对比分析报告（2026-10-06）

> 口径说明：以下基于各工具日报摘要整理。部分工具仅披露热点 Issues / 重要 PR，未给全量更新数，表中以“列示10”“未披露总数”标注，避免误读为总量。

---

## 1. 生态全景

当前 AI CLI 工具已从“补功能”进入“可靠性工程”阶段：版本发布频繁，但社区焦点集中在上下文/记忆一致性、子代理委派、权限安全与静默失败。MCP、插件、多 Provider 路由快速扩张，同时带来工具规模、OAuth、安装源、环境变量等集成治理问题。Windows、VS Code、Wayland、TUI 渲染等跨平台体验仍是采用障碍，Codex、Claude Code、Hermes、OpenCode 均有集中反馈。社区对“自动更新/自动压缩/权限漂移杀死长任务”容忍度极低，可观测、可恢复、可审计正在成为核心竞争力。生态分层明显：大厂 CLI 高活跃但回归压力大，自托管/桌面/多渠道工具快速迭代，Deepseek Harness 等已停滞。

---

## 2. 各工具活跃度对比

| 工具 | Issues（今日口径） | PR（今日口径） | Release | 动态量级/备注 |
|---|---:|---:|---|---|
| Claude Code | 热点 Top10，未披露总数 | 未披露 | v2.1.290 | 插件/mod hook 可观测性；compaction 争议最集中 |
| OpenAI Codex | 30 条更新 | 重要 PR 列示 10 条 | rust-v0.160.1；0.162.0-alpha.16/.15/.14 | Windows + Dots 痛点；发布工程活跃 |
| Gemini CLI | 50 | 34 | v0.64.0-nightly.20261005 | 今日最高活跃；子代理、安全、终端渲染 |
| DeepSeek Reasonix | 4（全量） | 列示 10 条 | v2.28.0；studio-v2.28.0 | CLI 并入 Studio；多连接状态隔离密集修复 |
| OpenCode | 热点列示 10 条，未披露总数 | 列示 10 条 | 无 | V1→V2 迁移、Provider 生态、性能修复 |
| Deepseek Harness | 0 | 0 | 无 | 过去 24 小时无活动 |
| Hermes | 热点列示 10 条，未披露总数 | 列示 10 条 | 无 | 桌面/Windows/安全/多渠道问题集中 |
| OpenClaw | 8（全量覆盖） | 列示 10 条 | v2026.10.1-beta.1 | P0 生命周期卡死、僵尸进程；worker 原生推理 |

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| 上下文/会话/记忆一致性 | Claude、Codex、Gemini、Reasonix、OpenCode、Hermes、OpenClaw | 压缩丢上下文、压缩后 token 估算不准、会话消失/move 错误、transcript 别名、memory 锁、持久化任务追踪 |
| 子代理/委派任务可靠性 | Claude、Codex、Gemini、OpenCode、OpenClaw、Hermes | 子代理身份识别、Dots 继承工具/权限/thread、MAX_TURNS 误报成功、永久挂起、轨迹可视化、分支隔离 |
| 权限与安全沙箱 | Claude、Codex、Gemini、Reasonix、OpenCode、Hermes、OpenClaw | opt-in 逃生舱、权限漂移、命令注入、glob 路径逃逸、环境变量/密钥泄露、PreToolUse 执行顺序 |
| 静默失败与可观测性 | Claude、Codex、Gemini、OpenCode、OpenClaw、Hermes | 参数静默丢失、exit 0 未执行、GOAL success 误报、204 成功但写错路径、sessions.list 误报、更新误报 |
| Windows/跨平台/终端体验 | Claude、Codex、Gemini、OpenCode、Hermes | VS Code 复制失效、Windows 终端闪烁、环境变量丢失、Wayland 失败、非 TTY 崩溃、TUI 分屏与渲染抖动 |
| Provider/路由/成本 | Reasonix、OpenCode、Hermes、OpenClaw、Gemini | 重试延迟可见、token 预算、Vercel AI Gateway、Bedrock GPT-6、MiniMax OAuth、worker 推理、OTLP 自定义头 |
| MCP/OAuth/插件生态 | Claude、Codex、Gemini、OpenCode、Reasonix | MCP 参数解析、OAuth `iss` 兼容、工具数 >128 报错、插件 Effect 运行时、安装源边界校验 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线/生态 | 当前主要短板 |
|---|---|---|---|---|
| Claude Code | 终端编码 Agent、插件/mod hook、权限与子代理可观测 | 专业开发者、企业团队 | Anthropic 官方，强 hook/权限生态 | 上下文压缩争议、VS Code 终端交互回归 |
| OpenAI Codex | 多端编码 + 远程委派 + Computer Use + MCP | 广泛开发者、企业、Windows 用户 | CLI/App/IDE/Dots/daemon，发布工程成熟 | Windows 稳定性、委派任务工具继承、权限漂移 |
| Gemini CLI | 开源 Agent CLI、子代理、skills、AST 代码库理解 | 大仓库开发者、安全敏感团队 | 子代理编排、OS 沙箱、nightly 节奏 | 子代理挂起/状态误报、配置一致性、渲染抖动 |
| DeepSeek Reasonix | Studio + CLI 桌面一体化、多连接、多 Provider | 桌面用户、多 Provider 开发者 | Studio 发布 CLI，2.x 内核，技能/插件安装 | Issue 样本少，压缩后 token 估算、多连接串扰 |
| OpenCode | 开源编码 Agent、TUI/GUI/浏览器、插件生态 | 开源社区、多模型用户 | V1→V2 迁移中，Provider/插件扩张 | 迁移兼容、权限错误泄露、计费透明度 |
| Hermes | 多渠道消息、桌面、语音、技能系统 | 多平台助手用户、自托管用户 | Provider 适配、渠道集成、安全凭据 | 桌面稳定性、Windows 更新、数据库锁 |
| OpenClaw | 自托管 gateway/worker 多代理基础设施 | 自托管、多代理、渠道集成用户 | gateway-worker 架构、原生推理、cron/doctor | P0 生命周期卡死、僵尸进程、渠道 debounce |
| Deepseek Harness | 无活动 | — | — | 过去 24 小时无动态 |

---

## 5. 社区热度与成熟度

**第一梯队：高活跃、成熟但承压。**  
Gemini CLI 今日 50 Issues / 34 PR，为最高活跃；OpenAI Codex 30 条 Issue 更新且有补丁发布，Claude Code 有版本发布，OpenCode 在迁移与 Provider 生态上 PR 密集。这些工具用户基数大，任何回归都会被放大，例如 Codex #48074 达 144 评论 / 152 👍，Gemini #21409 子代理永久挂起获 8 👍。

**第二梯队：快速迭代、架构治理。**  
OpenClaw 虽仅 8 条 Issue 更新，但出现 P0 生命周期卡死 #158095、P1 僵尸进程 #97616，同时推进 worker 原生推理，属于“功能扩张与稳定性补课并行”。DeepSeek Reasonix 仅 4 条 Issue，但 10 条 PR 集中于多连接状态隔离，并发布 v2.28.0。Hermes 桌面端 P2 bug 集中爆发，Windows 更新、会话历史、语音打断是主要痛点。

**低活跃/停滞。**  
Deepseek Harness 过去 24 小时无活动。整体看，社区最伤信任的问题不是“缺功能”，而是静默失败、自动更新中断任务、权限状态漂移、计费/用量不透明。

---

## 6. 值得关注的趋势信号

1. **Agent 可靠性工程化成为主战场。** 终止语义、超时、心跳、幂等、回滚，比单纯增加模型能力更影响采用。开发者集成时应默认给工具调用加超时与失败显式处理。
2. **上下文与记忆是一等公民。** 自动压缩必须可配置、可观测；持久化任务追踪、跨会话一致性、token 估算准确性将直接影响长任务可靠性。
3. **子代理/远程委派需要继承契约。** Dots、subagent、worker 若不能完整继承工具、权限与 thread 上下文，就会变成“能力缩水路径”。选型时应验证委派任务的工具可见性与权限一致性。
4. **安全从点状补洞走向体系化。** OAuth `iss`、grep 注入、glob 逃逸、环境变量泄露、PreToolUse 顺序，说明沙箱、最小权限、命令参数化需统一设计。
5. **静默失败是最不可接受的缺陷。** 参数静默丢失、exit 0 未执行、204 但写错路径、状态误报 `GOAL success`，都会破坏自动化流水线可信度。
6. **Windows/终端/IDE 体验决定采用上限。** Codex Windows 闪烁、Claude VS Code 复制、Gemini Wayland/非 TTY、OpenCode TUI 分屏，说明跨平台测试矩阵仍是短板。
7. **多 Provider 与成本可观测性升温。** Vercel AI Gateway、Bedrock GPT-6、MiniMax OAuth、重试延迟、OTLP header，表明企业级路由、回退、计费与遥测正在补课。
8. **MCP/插件生态需要治理。** 工具数 >128、MCP OAuth 兼容、插件运行时隔离、安装源边界，是生态扩张后的必然治理点。
9. **发布与自更新可靠性影响信任。** 自动更新杀死 in-flight turn、release 指针回退、安装器签名，说明发布工程本身已成为产品体验的一部分。
10. **选型参考：** 若重企业/多端，关注 Codex、Claude Code、Gemini CLI 的平台与权限修复速度；若重自托管/多代理，关注 OpenClaw、OpenCode；若重桌面多 Provider 与渠道，关注 Reasonix、Hermes。核心看 P0/P1 与静默失败修复节奏，而非单日功能数量。

**总体判断：** 2026-10-06 的社区信号显示，AI CLI 竞争点正从“模型能力”转向“工程可靠性、上下文治理、安全边界与可观测性”。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-10-06）

> 说明：给定 PR 的评论数字段均为 `undefined`，因此下文 PR 排行依据仓库“按评论数排序”的展示顺序，并结合更新时间、关联 Issue 与主题热度判断。除特别注明外，PR 状态均为 **OPEN**。

## 1. 热门 Skills 排行（PR）

1. **#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures**  
   功能：修复 skill-creator 触发评估中的假阴性、无效评分、Windows 子进程兼容和运行时失败误判。  
   热点：评估可靠性、跨平台、负例误通过。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1298

2. **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers**  
   功能：适配 `mcp>=2.0.0` 的 `streamable_http_client` 重命名及自定义 HTTP headers 配置。  
   热点：MCP 生态兼容性，关联 #1668。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1742

3. **#1771 feat(skills): add proofcore-contract-auditor for smart contract notarization**  
   功能：新增 Web3 智能合约审计 Skill，对 Solidity/Rust 做静态分析，并将审计证明锚定至 TON 区块链。  
   热点：Web3 安全审计、链上存证、零存储 Merkle 协议。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1771

4. **#1734 Detect orphaned docx comments**  
   功能：检测 DOCX 中孤立/悬空的评论。  
   热点：文档技能鲁棒性、OOXML 评论清理。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1734

5. **#1703 Add md2video-audio skill**  
   功能：将 Markdown 经 Marp 转为幻灯片，再编译为带真人感配音的 MP4。  
   热点：零成本文档转视频、多媒体生成。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1703

6. **#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills**  
   功能：将 Notion 产品/技术规格转为可实施任务；量化简历审计。  
   热点：工作流自动化、任务拆解、简历评估。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1245

7. **#1792 fix(docx): report LibreOffice timeout as an error and verify the output**  
   功能：LibreOffice 超时不再误报成功，并验证输出 DOCX 已无修订标记。  
   热点：文档转换可靠性、失败可见性。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1792

8. **#1730 fix(claude-api): replace dead URLs in academy-guide and tool-use-concepts**  
   功能：替换 `claude-api` 与 `academy-guide` 中 3 个失效文档 URL。  
   热点：文档维护、开发者体验。  
   状态：OPEN  
   https://github.com/anthropics/skills/pull/1730

## 2. 社区需求趋势

- **安全与信任边界**：社区技能冒用 `anthropic/` 命名空间，可能诱导用户授予高权限。Issue #492 讨论最热，43 评论。  
  https://github.com/anthropics/skills/issues/492

- **组织级共享与分发**：希望 Claude.ai 内支持组织级技能库、分享链接，避免手动下载/上传 `.skill`。Issue #228 获 8 👍。  
  https://github.com/anthropics/skills/issues/228

- **评估与触发可靠性**：`run_eval.py` 下 `claude -p` 出现 0% 触发率；skill-creator 存在基准失败、Windows 触发异常、技能遮蔽等问题。  
  https://github.com/anthropics/skills/issues/556  
  https://github.com/anthropics/skills/issues/1383  
  https://github.com/anthropics/skills/issues/1390

- **上下文窗口与性能**：`claude-api` 单次工具调用注入约 156k tokens，社区要求懒加载、渐进披露和 token 预算控制。  
  https://github.com/anthropics/skills/issues/1487

- **质量与安全元技能**：社区希望 skill-creator 更符合最佳实践，并出现 skill-quality-analyzer、skill-security-analyzer 等质量/安全分析方向。  
  https://github.com/anthropics/skills/issues/202  
  https://github.com/anthropics/skills/pull/83

- **新 Skill 方向**：记忆压缩/符号化状态（#1329）、AI 治理（#412）、推理质量门（#1385）、测试模式（#723）、E2E 测试（#822）、文档格式（ODT #486、排版 #514、PDF #538、DOCX #541）、工作流集成（Notion #1245、MCP #1742、HPC #1615）、破坏性操作前检查（#1776）。

## 3. 高潜力待合并 Skills

以下 PR 更新较活跃、问题定义明确，或直接关联高讨论 Issue，可能近期落地：

- **#1742 mcp-builder 适配 mcp>=2**：修复真实 MCP 服务器兼容问题，关联 #1668。OPEN。  
  https://github.com/anthropics/skills/pull/1742

- **#1298 skill-creator 触发评估隔离与运行时失败修复**：直击 #556/#1383 类评估可靠性问题。OPEN。  
  https://github.com/anthropics/skills/pull/1298

- **#1792 docx LibreOffice 超时误报成功**：小而明确的可靠性修复。OPEN。  
  https://github.com/anthropics/skills/pull/1792

- **#1681 skill-creator 支持 package_skill.py 直接执行**：修复 `ModuleNotFoundError` 和过时路径。OPEN。  
  https://github.com/anthropics/skills/pull/1681

- **#1730 claude-api 失效链接修复**：低风险文档维护，更新至 2026-10-04。OPEN。  
  https://github.com/anthropics/skills/pull/1730

- **#1245 Notion 规格转实现 + 量化简历审计**：工作流自动化方向，更新至 2026-09-30。OPEN。  
  https://github.com/anthropics/skills/pull/1245

## 4. Skills 生态洞察

**一句话总结**：社区当前最集中的诉求是——把 Skills 从“可用”推进到“可信、可共享、可评估”，即安全命名与权限治理、组织级分发、触发/基准评估可靠性、上下文成本控制，并快速修复官方核心技能（skill-creator、docx、mcp-builder、claude-api）的跨平台与兼容性问题。

---

# Claude Code 社区动态日报 · 2026-10-06

数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 一、今日速览

今日发布 **v2.1.290**，重点强化插件与 mod hook 的可观测性（暴露 API 侧 advisor 工具调用、暴露子 agent 身份）；社区侧最集中的声音是**上下文压缩（compaction）引发的上下文/记录丢失**，同时出现"要自动 compact 省钱"与"拒绝自动 compact 丢上下文"这对鲜明对立的需求。此外，VS Code / 桌面端与 Remote Control 的会话稳定性问题持续发酵，多个 8 月的 stale issue 在今日被批量关闭。

---

## 二、版本发布

### v2.1.290

面向插件/mod 开发者的一次能力补强：

- **`serverToolUses` 加入 mod 的 `turn.step` hook 结果**：可拿到 API 自身（advisor）执行的工具调用，含 `id`、`name`、`input`、`start`、`end`。这意味着插件作者首次能观察到"非模型直接发起"的服务端工具行为，对审计、计费归因、耗时分析都有价值。
- **`tool.check` 事件新增 `agentId`**：插件 hook 现在能区分**子 agent 的权限检查**与主 agent 的权限检查，为细粒度的权限策略（例如"只对 subagent 放宽 X 工具"）铺路。

> 解读：本次更新没有面向终端用户的可见功能，但两项改动都指向同一方向——**hook 生态需要更完整的上下文与身份信息**。这与社区中关于权限策略、子 agent 行为的讨论高度呼应。

---

## 三、社区热点 Issues（Top 10）

### 1. VS Code 终端文本选择/复制被破坏 — [#61021](https://github.com/anthropics/claude-code/issues/61021)
**OPEN** · `area:tui` `platform:vscode` `platform:windows` · 17 评论 · 👍14
今日评论数最高的 issue。用户反馈在 VS Code 终端里运行 Claude Code 后，左键选中文本再 Ctrl+C 复制的常规操作失效。这是**跨平台编辑器集成的基础交互回归**，影响面广、修复预期成本低，属于典型的"高优先级低垂果实"。自 5 月创建至今未解决，社区耐心正在消耗。

### 2. Tag-grammar 工具调用解析器静默吞掉参数块 — [#84362](https://github.com/anthropics/claude-code/issues/84362)
**CLOSED** · `area:core` `stale` · 13 评论
在模型输出不匹配/畸变的闭合标签时，解析器会把后续参数块**静默吸收进前一个字符串字段**：受害参数永不绑定，若其余字段可选，调用会"成功"返回但数据丢失。报告中给出了**在参数密集的 MCP 调用上测得 6.2% 静默字段丢失率**。此类 bug 的可怕之处在于无报错、无告警，直接污染 MCP 生态的可靠性。该条为 stale 关闭后重新提起，今日再次被关闭。

### 3. 2.1.286 空闲压缩静默丢弃工作上下文 — [#98747](https://github.com/anthropics/claude-code/issues/98747)
**OPEN** · `area:core` `platform:macos` · 12 评论 · 👍11
自 2.1.286 起，空闲会话会在 prompt cache 过期前被自动压缩（"Compacted while idle, before the prompt cache expired"），**既无 opt-out 也无提示**，且日志中被记为 "manual"。对长时间运行的工程会话而言，这等于丢弃了会话赖以成立的地基。这是今日 compaction 系列问题中最具代表性的一条。

### 4. 硬性阻断输入密码，破坏合法开发/测试流程 — [#78160](https://github.com/anthropics/claude-code/issues/78160)
**OPEN** · `area:security` `area:model` · 11 评论 · 👍20
Claude Code 一律拒绝在登录表单中键入密码——即便是开发者**自己应用、localhost、明文文档化的测试账号**，且用户已明确指示。作者承认默认策略的合理性，但指出"一刀切"缺乏**权限门控的 opt-in 逃生舱**。👍20 说明"本地开发环境需要可控豁免"是相当普遍的诉求。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-10-06）

---

## 一、今日速览

1. **0.160.1 补丁版发布**，修复 Windows 远程 MCP 场景下 `SYSTEMROOT`/`TEMP`/`TMP` 丢失导致的 MCP 启动失败，同步出现在 0.162.0-alpha 系列迭代中。
2. **Windows + Dots（委派/远程任务）仍是最大痛点来源**：今日更新的 30 条 Issue 中，超过三分之一带有 `dots`、`remote`、`windows-os` 标签，集中在工具丢失、环境变量缺失、任务回复失败等问题。
3. **App 端功能回归引发高热度讨论**：#49532 要求恢复「启动任务时选择分支」的功能，已获 80+ 👍，是当日呼声最高的 enhancement。

---

## 二、版本发布

| 版本 | 类型 | 关键内容 |
|---|---|---|
| **rust-v0.160.1** | Bug Fix | 在使用显式配置的远程环境变量启动 **remote stdio MCP servers** 时，保留 `SYSTEMROOT`、`TEMP`、`TMP`，使 Unix 主机能保留 Windows executor 的启动环境。对应回移 PR [#51121](https://github.com/openai/codex/pull/51121)。 |
| rust-v0.162.0-alpha.16 / .15 / .14 | 预发布 | 常规 alpha 迭代，无公开 changelog 说明。 |

> 本次补丁直接回应 Issue [#49820](https://github.com/openai/codex/issues/49820)：Windows 上 Dot 连接的任务能执行 shell 命令，但因缺少 `SystemRoot` 导致原生 `codex_app` MCP server 在 `initialize` 前中止。

---

## 三、社区热点 Issues（10 条）

1. **[#48074 [CLOSED] Windows：安装 Codex daemon 后终端窗口在请求期间反复闪烁](https://github.com/openai/codex/issues/48074)**
   `bug, windows-os, CLI, app-server` · 144 评论 · 152 👍
   当日绝对热度第一，CLI 0.157.0 在 Win 11 下弹窗闪烁，用户量级与情绪都很强烈。已关闭，说明官方已定位/修复。

2. **[#49458 [OPEN] [Windows] dot 启动的本地任务缺少 Computer Use 工具，而普通本地会话正常](https://github.com/openai/codex/issues/49458)**
   `bug, windows-os, app, computer-use, remote, dots` · 57 评论 · 24 👍
   典型「只有委派任务缺能力」问题，说明 Dot 路径与常规会话的工具装配逻辑存在分叉，是当前架构性缺陷的代表。

3. **[#49532 [OPEN] 把分支选择功能还给 Codex App](https://github.com/openai/codex/issues/49532)**
   `enhancement, app` · 42 评论 · **80 👍**
   用户以截图控诉 App 内无法在启动任务时选择分支，是当日呼声最高的功能需求，反映 App 与 CLI 能力不对齐。

4. **[#49729 [OPEN] Dot 无法在已保存项目中创建或跟进本地 Codex 任务](https://github.com/openai/codex/issues/49729)**
   `bug, app, app-server, dots` · 38 评论
   任务创建工具选不中已保存项目，且无法按返回 ID 读取/回复 thread，直接破坏「dot 协调本地任务」的闭环。

5. **[#49820 [OPEN] Windows 远程 MCP 丢失 SystemRoot，内置 Node 在 initialize 前中止](https://github.com/openai/codex/issues/49820)**
   `bug, windows-os, mcp, app, remote, dots` · 8 评论
   0.160.1 修复的直接来源，属于「可复现、可定位、已修复」的高质量缺陷报告。

6. **[#51201 [OPEN] macOS 托管 daemon 自动更新重启，杀死进行中的 turn 并以默认权限重载线程](https://github.com/openai/codex/issues/51201)**
   `bug, sandbox, app, app-server` · 1 评论
   从 0.160.0 升级到 0.160.1 时触发，长任务被中断且 `Full access` 权限丢失。**潜在数据/信任风险高于其评论数**，值得优先关注。

7. **[#34231 [OPEN] 防御性漏洞报告 worker 反复触发网络安全误报](https://github.com/openai/codex/issues/34231)**
   `bug, app, safety-check, subagent` · 9 评论
   授权范围内的防御性安全审查被反复拦截，长期未决（7 月至今），是安全策略误伤正常研发流程的典型案例。

8. **[#49351 [OPEN] VS Code 扩展语音听写 403 Forbidden](https://github.com/openai/codex/issues/49351)**
   `bug, extension, auth` · 9 评论 · 5 👍
   同一账号在 ChatGPT macOS 桌面端可用、在 VS Code 扩展内 403，指向扩展侧鉴权链路问题，直接影响 IDE 集成体验。

9. **[#50077 [OPEN] macOS dot：本地 thread 读取拒绝 placement format v1，委派任务丢失原生工具](https://github.com/openai/codex/issues/50077)**
   `bug, app, app-server, dots` · 8 评论
   与 #49729 / #50697 共同构成「Dot 无法读回本地 thread」的跨平台同源问题族（协议版本不兼容）。

10. **[#50697 [OPEN] Windows 桌面无法回复 dot 创建的任务：AbsolutePathBuf 反序列化错误](https://github.com/openai/codex/issues/50697)**
    `bug, windows-os, app, app-server, dots` · 3 评论 · 2 👍
    报错信息明确（`AbsolutePathBuf deserialized without a base path`），是可直接定位的协议/序列化缺陷，修复成本低、用户影响大。

> 其他值得留意的：#51187（Codex Desktop 出现「保留细节但丢失目标」的持续性目标一致性失败）、#50333（Windows SSH denybin wrapper 返回 0 却未执行命令，**静默失败**风险）、#37971（fd 耗尽被误报为缺少 requirements 文件，误导排查）。

---

## 四、重要 PR 进展（10 条）

1. **[#51121 Backport Windows 远程 MCP 环境保留到 0.160](https://github.com/openai/codex/pull/51121)**
   将 #50129 回移到 0.160 发布线，保留 `SYSTEMROOT`/`TEMP`/`TMP` 白名单并附带回归测试 —— 即 0.160.1 的实质内容。

2. **[#51203 apply_patch 无条件保留行尾格式](https://github.com/openai/codex/pull/51203)**
   此前 CRLF 文件被 `apply_patch` 悄悄规范化为 LF，现在默认保留原文件行尾，避免 Windows 仓库产生大规模噪声 diff。

3. **[#51202 区分增量工具更新中的命名空间移除](https://github.com/openai/codex/pull/51202)**
   移除整个命名空间时不再把命名空间及其所有成员都列为不可用工具，改善 Responses Lite 下的工具提示可读性。

4. **[#51198 允许并发 release 构建，但序列化发布流程](https://github.com/openai/codex/pull/51198)**
   不同 tag 的构建可并行，发布仍串行，防止 channel 检查与更新竞争或 release 指针倒退。

5. **[#51186 防止 stable release 指针回退](https://github.com/openai/codex/pull/51186)**
   发布旧稳定版不再覆盖更新的默认下载/安装目标，同版本重跑可接受。与 #51198 共同加固发布可靠性。

6. **[#51194 将浏览器扩展请求头纳入 config requirements](https://github.com/openai/codex/pull/51194)**
   新增 `browser_use.extension.request_headers`（name/value 对），并通过 `config/requirements/read` 暴露为 `browserUse.extension.requestHeaders`，同步更新 JSON Schema 与 TS 类型。

7. **[#51192 TUI 恢复时等待 SIGCONT](https://github.com/openai/codex/pull/51192)**
   为 `Ctrl+Z` 挂起安装临时 `SIGCONT` handler，带超时的恢复确认，修复 TUI 恢复竞态。

8. **[#51191 清理 Unix app-server control-socket 启动锁文件](https://github.com/openai/codex/pull/51191)**
   关闭时不再残留 startup lock 文件，属于长期卫生问题清理，降低僵尸锁导致的启动失败概率。

9. **[#51158 在 Windows 发布中签名 PowerShell 安装器](https://github.com/openai/codex/pull/51158)**
   扩展 Windows 签名 action 支持 `additional-files`，用 Azure Trusted Signing 签名 `install.ps1`，改善企业环境下的安装可信度。

10. **[#51157 在模型推理前强制校验必需的环境技能](https://github.com/openai/codex/pull/51157)**
    支持通过 `environment/add` 与 `environments.toml` 声明 `skills.required`，缺失即快速失败，把「技能缺失」从运行期故障前移到推理前检查。

> 另有 #51185（重试 gRPC code-mode 会话 `Unavailable`/`ResourceExhausted` 准入失败）、#51156（base instructions 改为 Responses input 中的 developer 消息）、#51200（Bazel 升级至 9.2.0）等工程性改动。

---

## 五、功能需求趋势

从今日 38 条 Issue 的标签分布看，社区关注方向集中在以下六类：

1. **Windows 平台稳定性（最高频）**
   `windows-os` 出现在近三分之一 Issue 中：终端闪烁、对话视图闪烁、LaTeX 编译器路径、`AbsolutePathBuf` 反序列化、环境变量丢失。Windows 已是 Codex 体验最薄弱的一环。

2. **Dots / 远程委派任务协调**
   `dots` + `remote` + `app-server` 组合标签密集出现（#49458、#49729、#50077、#50333、#50697、#50887、#51189）。核心诉求是：dot 创建的任务必须能**完整继承本地工具、权限与 thread 上下文**。

3. **Computer Use 与浏览器自动化**
   #49458（委派任务缺 Computer Use 工具）、#45177（无法识别 Chrome 当前 URL）、#36776（唤醒显示器后锁屏）、#51197（云任务标签遮蔽本地执行主机信息）。跨平台可用性与状态可观测性是主要阻力。

4. **App 功能与 CLI 能力对齐**
   #49532（恢复分支选择）以 80 👍 居首，反映用户对「App 端功能被裁剪」的明显不满，是典型的能力回归类需求。

5. **沙箱与权限模型一致性**
   #49439（Auto-review 拒绝后 `/approve` 不可用）、#45953（自定义 profile 下权限变更后禁止所有命令）、#51201（重载线程丢掉 Full access）。权限状态「漂移」是信任度杀手。

6. **模型行为与安全策略**
   #51187（丢失治理目标）、#34231（防御性安全工作被误判为网络安全风险）。随着 agent 承担长周期任务，**目标一致性与安全策略精确度**开始成为独立诉求方向。

另：IDE 集成（#49351 VS Code 语音 403）与 MCP 生态（#49820）虽评论数不高，但涉及关键集成路径。

---

## 六、开发者关注点

汇总反馈，当前开发者最痛的几类问题：

- **静默失败最危险**：`ssh` denybin wrapper 返回 exit 0 却未执行（#50333）、fd 耗尽被报为「缺少 requirements 文件」（#37971）。错误信息与实际根因脱节，显著拉长排查时间。
- **自动更新会打断工作**：daemon 升级重启杀死 in-flight turn，并以默认权限重载线程（#51201）。对跑长任务的用户而言，这等同于不可预期的数据丢失。
- **委派任务是能力盲区**：Dot 路径下工具集缩水、thread 读不回、回复报序列化错误，说明远程/委派链路尚未与本地会话同等治理。
- **Windows 环境变量契约需要系统化解决**：今日的 0.160.1 只补了 `SYSTEMROOT`/`TEMP`/`TMP` 三个变量，但同类问题很可能继续出现，社区倾向希望看到白名单机制的通用化。
- **权限状态不应在会话中途变化**：Auto-review、profile 切换、daemon 重启都可能让既有权限静默失效。
- **发布工程质量在提升**：本次 PR 集中处理了 release 指针回退、并发构建、安装器签名、Bazel 升级等基础设施问题，说明官方正在为更频繁的发版节奏做铺垫。

---

*数据来源：[github.com/openai/codex](https://github.com/openai/codex) · 统计窗口：2026-10-05 ~ 2026-10-06*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-10-06）

## 今日速览

过去 24 小时内，Gemini CLI 更新了 50 个 Issue 和 34 个 PR，主旋律是**子代理（Subagent）可靠性与安全加固**：多个 P1 级 Bug 集中在子代理挂起、终止状态误报、以及浏览器代理在 Wayland/配置覆盖下的异常行为。PR 侧则以安全修复（OAuth `iss` 校验、grep 参数注入、glob 路径逃逸、环境变量泄露）和终端渲染体验优化为主。整体来看，社区在推动 Agent 能力从"能用"走向"可控、可审计、可恢复"。

---

## 版本发布

**v0.64.0-nightly.20261005.gfb972b2f8**（nightly 通道）

- 仅包含一个 nightly 构建，无详细变更说明，相比上一 nightly（`v0.64.0-nightly.20261003.gfb972b2f8`）的完整 diff 可通过下方链接查看。功能层面的实质性变化主要体现在当日合并的 PR 中。
- 变更对比：https://github.com/google-gemini/gemini-cli/compare/v0.64.0-nightly.20261003.gfb972b2f8...v0.64.0-nightly.20261005.gfb972b2f8

---

## 社区热点 Issues

挑出 10 个最值得关注的议题（按重要性与社区讨论热度排序）：

1. **[#22323] [P1] 子代理 MAX_TURNS 中断被误报为 GOAL 成功**（13 条评论，👍2）
   `codebase_investigator` 子代理在达到最大轮次限制、未做任何分析的情况下，仍上报 `status: "success"` 与 `Termination Reason: "GOAL"`。这是一个**状态语义被掩盖**的严重问题——上层调用者无法感知任务其实失败。今日评论数最高，说明维护者正在深挖。
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **[#21409] [P1] Generalist agent 永久挂起**（8 条评论，👍8）
   一旦 CLI 把任务交给 generalist agent，即便"创建文件夹"这类简单操作也会无限挂起，最长等待一小时。社区 👍 数最高，属于**影响面最广、用户最痛**的阻塞性问题；临时规避方式是显式禁止模型委托子代理。
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **[#19873] [P2] 通过零依赖 OS 沙箱 + 执行后意图路由，释放模型的 bash 原生能力**（9 条评论）
   认为 Gemini 3 系列本质上是"原生 bash 用户"，主张在**不牺牲安全与 UX**的前提下让模型自由组合 `grep/cat/sed/awk`。这是安全沙箱方向的纲领性提案，可能与近期多个安全 PR 形成呼应。
   https://github.com/google-gemini/gemini-cli/issues/19873

4. **[#22745] [P2] AST 感知的文件读取、搜索与代码库映射评估（EPIC）**（7 条评论）
   系列调研的总纲，目标是减少错位读取、降低 token 噪声、更精准地定位方法边界。配套子任务还有 [#22746]（CLI 工具映射代码库）与 [#22747]（AST grep 搜索）。代表社区对**大仓库下 Agent 效率**的长期投入方向。
   https://github.com/google-gemini/gemini-cli/issues/22745

5. **[#21968] [P2] Gemini 很少主动使用 skills 和子代理**（7 条评论）
   用户反馈：即使定义了 `gradle`、`git` 等 skills，模型在高度相关的场景下也不会自发调用，必须显式指令才触发。这是**能力存在但无法被激活**的典型问题，直接影响 Agent 自主性体验。
   https://github.com/google-gemini/gemini-cli/issues/21968

6. **[#22267] [P2] Browser Agent 忽略 settings.json 覆盖（如 maxTurns）**（4 条评论）
   `AgentRegistry` 初始化时能正确读取合并配置，但 Browser Agent 执行阶段完全忽略全局/项目级 `settings.json`。属于**配置系统一致性缺陷**，让用户对 Agent 行为的可调性失去信任。
   https://github.com/google-gemini/gemini-cli/issues/22267

7. **[#21983] [P1] browser 子代理在 Wayland 下失败**（4 条评论，👍1）
   Linux Wayland 环境下浏览器子代理直接失败并报 `Termination Reason: GOAL`。与 #22323 一样，暴露了**终止原因上报不可信**的共性问题，同时反映 Linux 桌面环境的兼容性缺口。
   https://github.com/google-gemini/gemini-cli/issues/21983

8. **[#24246] [P2] 工具数超过 128 个时触发 400 错误**（3 条评论）
   可用工具数量过多时请求直接失败。随着 MCP 与自定义工具生态扩张，**工具作用域管理（tool scoping）**已成为必须解决的架构问题，否则用户无法安全地接入大量工具。
   https://github.com/google-gemini/gemini-cli/issues/24246

9. **[#22672] [P2] Agent 应停止/抑制破坏性行为**（3 条评论，👍1）
   模型在复杂 git 操作中会使用 `git reset` 或 `--force`，而更安全的替代方案本可实现。涉及安全护栏的**默认策略设计**，与 #19873 的沙箱路线互为补充。
   https://github.com/google-gemini/gemini-cli/issues/22672

10. **[#18836] [P3] 用持久化文件型任务追踪（CRUD）替代 WriteToDo**（2 条评论）
    当前 WriteToDo 依赖"上下文内"任务列表，带来上下文腐化、高 token 成本、跨会话记忆丢失。提案改为文件持久化，配合 [#21000]（用原生文件工具维护任务追踪器），是**长任务可靠性**的关键改造。
    https://github.com/google-gemini/gemini-cli/issues/18836

> 其他值得留意的议题：[#22598] 子代理轨迹应可通过 `/chat share` 查看、[#21763] `/bug` 报告缺失子代理上下文、[#18287] Shared Memory 与并行子代理协作、[#22465] 创建 vite 应用时卡在交互式提示、[#21432] 提升 Agent "自我认知"（准确的 CLI 参数与快捷键）。

---

## 重要 PR 进展

1. **#29643 重新选择 Google 登录时清除缓存凭证**
   修复用户在 `AuthDialog` 中重新选择 `LOGIN_WITH_GOOGLE` 时无法切换账号或重新认证、被陈旧 token 锁定的问题。属于**高频账号管理痛点**的直接修复。
   https://github.com/google-gemini/gemini-cli/pull/29643

2. **#29490 [P1] 恢复会话时避免重复的工具响应轮次**
   使用 `-r` 恢复会话时，工具结果会在客户端历史中被重放两次（`geminiChat.ts` 将工具响应记录为合成 user 消息）。会直接影响**多轮工具调用的上下文正确性**。
   https://github.com/google-gemini/gemini-cli/pull/29490

3. **#29488 [P1] MCP OAuth：按 `authorization_response_iss_parameter_supported` 判定 iss 缺失**
   自 v0.61.0 起，`/mcp auth <server>` 对发布了 RFC 8414 元数据但不在授权响应中返回 `iss` 的服务器失败。属于**MCP 认证兼容性回归修复**。
   https://github.com/google-gemini/gemini-cli/pull/29488

4. **#29616 [P1] 对齐 OAuth 回调 iss 参数校验与 RFC 9207 元数据**
   仅在授权服务器声明支持时才强制要求回调中的 `iss` 参数，与 #29488 属同一批 OAuth 安全收敛工作。
   https://github.com/google-gemini/gemini-cli/pull/29616

5. **#29536 [P2] grep 使用显式 `-e` 界定符，防止命令行选项注入（CWE-88）**
   为 `git grep` 与系统 `grep` 管道强制参数分隔，防止搜索模式被解释为命令行选项。**典型的安全硬化**。
   https://github.com/google-gemini/gemini-cli/pull/29536

6. **#29522 glob 工具匹配结果限制在已校验的搜索目录内**
   修复 glob 12 下绝对模式（如 `/etc/*.conf`）绕过 `cwd`、以文件系统根为基准解析，从而导致**路径逃逸**的问题。
   https://github.com/google-gemini/gemini-cli/pull/29522

7. **#29523 为外部安全检查器提供最小环境变量并限制输出**
   此前 `CheckerRunner` 会把完整 CLI 环境（含 `GEMINI_API_KEY` 等机密）传给第三方检查器二进制，且 stdout 无上限累积。修复**密钥泄露 + 无界输出**双重风险。
   https://github.com/google-gemini/gemini-cli/pull/29523

8. **#29612 强制"以有效 user turn 结尾"的协议不变量并规范化请求内容**
   确保发给 `generateContentStream` 的对话历史始终以含非空内容 part 的 user turn 结尾（涉及 `/rewind`、流中断等场景）。属于**核心请求正确性**修复。
   https://github.com/google-gemini/gemini-cli/pull/29612

9. **#29644 / #29640 / #29629 终端渲染体验三连修**
   - #29644 [P1]：恢复终端宽度变化时的防抖静态 UI 刷新（100ms debounce）。
   - #29640：`Ctrl+O` 展开时避免不必要的清屏与滚动重置（针对 Terminator 等 VTE 终端）。
   - #29629：为流式纯文本渲染设置高度上限，消除每帧全屏清屏重绘造成的闪烁。
   三者共同指向**终端 UI 抖动/闪烁**这一高频体验痛点。
   https://github.com/google-gemini/gemini-cli/pull/29644
   https://github.com/google-gemini/gemini-cli/pull/29640
   https://github.com/google-gemini/gemini-cli/pull/29629

10. **#29641 [P2] 遥测配置支持自定义 OTLP headers**
    允许对 OTLP HTTP/gRPC 端点传入自定义元数据与认证头（Grafana Cloud、Honeycomb、Datadog、受认证的 OTel Collector）。**企业可观测性落地**的关键一步。
    https://github.com/google-gemini/gemini-cli/pull/29641

> 其他值得关注：#29638 移除 VS Code 扩展启动时的 Marketplace 更新检查（消除启动网络阻塞）、#29622 修复 `tildeifyPath` 对同前缀兄弟目录的误判、#29635 修复非 TTY 环境下测试崩溃。

---

## 功能需求趋势

从本期 Issue/PR 全量数据中可提炼出五条主线：

1. **子代理（Subagent）编排与生命周期管理**
   绝对主导方向。涉及终止语义（#22323）、挂起（#21409）、配置覆盖（#22267）、轨迹可视化（#22598）、并行协作与共享内存（#18287）、发现机制（#18285）、本地子代理 Sprint（#20195）。社区已经不满足于"能跑子代理"，而是要求**可观测、可恢复、可配置**。

2. **安全与沙箱化**
   一端是 OS 级沙箱（#19873）、抑制破坏性命令（#22672），另一端是具体漏洞修补（grep 注入、glob 路径逃逸、检查器环境变量泄露）。安全正从"逐点补洞"走向"体系化设计"。

3. **代码库理解效率：AST 感知工具链**
   #22745 / #22746 / #22747 构成完整 EPIC，配合 #19561 的"精准抽取"（Tactful Extraction）与 #22466 的 `\n` 转义修复，目标一致：**降低每轮 36.6k tokens 的上下文基线与错位读取噪声**。

4. **长任务持久化与上下文治理**
   #18836（文件型任务追踪替代 WriteToDo）、#21000（原生文件工具维护 tracker）、#21924（终端 resize 时批量更新历史项）都指向同一诉求：**跨会话、跨轮次的状态一致性**。

5. **工具规模扩展性与可观测性**
   #24246（>128 工具触发 400）暴露工具作用域瓶颈；#29641（OTLP 自定义 header）与 #23166（稳定内部项目评估）显示**企业级遥测与评测体系**正在补课。

---

## 开发者关注点

综合本期反馈，开发者痛点集中在以下几个方面：

- **"静默失败"最不可接受**：#22323 与 #21983 中，任务实际中断却上报 `GOAL success`。这类**状态误报**比直接报错更危险，因为它破坏了自动化流水线的可信度。
- **Agent 挂起不可中止**：#21409 中用户等待一小时才手动取消，缺乏超时、心跳或可中断机制，是 Agent 类工具最基础却最致命的体验缺陷。
- **配置写了不生效**：Browser Agent 无视 `settings.json`（#22267）、子代理发现不读 `settings.json`（#18285），让高级用户对调优手段失去信心。
- **能力"存在但不会被调用"**：#21968、#21432 显示模型对自身 skills、子代理、CLI 参数、快捷键的"自我认知"不足，自主编排能力远未兑现。
- **终端渲染抖动**：resize 闪烁（#21924）、流式输出闪烁（#29629）、`Ctrl+O` 清屏（#29640）——TUI 稳定性是被反复提及的日常体验痛点。
- **会话恢复的上下文污染**：#29490（工具响应重复）与 #29612（对话必须以 user turn 结尾）说明会话持久化路径仍存在一致性漏洞。
- **多环境兼容性**：Wayland（#21983）、非 TTY/CI 环境（#29635）、Terminator 等 VTE 终端（#29640）暴露出测试矩阵的覆盖缺口。

**总体判断**：Gemini CLI 的 Agent 能力正在快速扩张，但可靠性、状态语义与安全边界尚未同步跟上。未来 1–2 周内，子代理恢复机制、配置系统一致性与终端渲染稳定性将是需要重点观察的修复窗口。

---

*数据来源：github.com/google-gemini/gemini-cli，统计时间窗 2026-10-05 至 2026-10-06。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-10-06

## 1. 今日速览

Studio v2.28.0 与 CLI v2.28.0 同步发布，`reasonix` 命令行正式并入 Studio 发布节奏，并迁移到 2.x 内核。PR 侧以桌面端多连接状态隔离和安全门控为主，Hook/Memory 草稿保持、技能安装来源修复密集。Issue 侧出现压缩后 token 估算不准、Provider 重试可观测性、RTL 支持等诉求，但过去 24 小时仅 4 条 Issue 更新。

## 2. 版本发布

- [v2.28.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.28.0)：Reasonix CLI v2.28.0，CLI archives 由 Studio release 构建。
- [studio-v2.28.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.28.0)：Reasonix Studio v2.28.0，本版是第一个同时发布命令行 `reasonix` 的 Studio 版本。
  - `reasonix` 命令行随 Studio 一同发布，1.x 命令迁移到 2.x 内核，迁移差异见 `docs/MIGRATING.md`。
  - 终端界面 `/model`、`/provider` 支持可搜索选择面板，并可切换当前会话；选择仅对当前会话生效。
  - 加固权限规则、插件安装与凭据显示。
  - 新增提交说明草拟、用量日历范围和复制会话信息。

## 3. 社区热点 Issues

> 说明：过去 24 小时内仅 4 条 Issue 更新，无法按题要求挑选 10 条。以下为全量列出，避免虚构。

- [#11873 [OPEN] include retry delay and a safe reason in provider retry events](https://github.com/esengine/DeepSeek-Reasonix/issues/11873)  
  Provider 重试可观测性增强。Studio 已有 `RetryInfo`，但事件层未暴露重试延迟和安全原因。对调试限流、网络故障和用户解释很重要。社区反应：6 条评论，是本期讨论最多的 Issue。

- [#12119 [OPEN] 压缩后会话长度估计不准了](https://github.com/esengine/DeepSeek-Reasonix/issues/12119)  
  Studio 反馈的 bug，Windows + `v2.28.0-mine.2`。压缩后会话长度估计不准会直接影响上下文预算、自动压缩和成本控制。社区反应：1 条评论，需进一步定位。

- [#12130 [OPEN] Daily research 2026-10-06](https://github.com/esengine/DeepSeek-Reasonix/issues/12130)  
  官方每日调研 Issue，覆盖 2026-09-28 至 2026-10-05 的 vendor changelogs 和 release pages。虽非功能需求，但可能为路线图和生态追踪提供输入。社区反应：暂无评论。

- [#12114 [OPEN] Add automatic RTL support for Persian and Arabic text in Desktop UI](https://github.com/esengine/DeepSeek-Reasonix/issues/12114)  
  桌面端国际化需求。波斯语和阿拉伯语输出当前仍为 LTR，阅读困难。对多语言用户和 UI 可访问性重要。社区反应：暂无评论。

## 4. 重要 PR 进展

- [#12115 [OPEN] fix(agent): gate file previews on target access and PreToolUse](https://github.com/esengine/DeepSeek-Reasonix/pull/12115)  
  在 Agent 策略准入阶段检查具体文件目标访问权限，将 `PreToolUse` 放在权限检查之后、预览生成之前。被拒绝的调用不会进入预览、预像捕获或执行，安全关键。

- [#12129 [OPEN] fix(studio): preserve hook edits during trial and save](https://github.com/esengine/DeepSeek-Reasonix/pull/12129)  
  在 Hook 试用或保存更新反馈时，保留未保存的 hook 命令、事件、匹配器和新增行。失败保存可重试，成功重载后才加载已保存规则。

- [#12131 [OPEN] fix(studio): scope memory panels to their connection](https://github.com/esengine/DeepSeek-Reasonix/pull/12131)  
  将记忆目录、编辑草稿、修订缓存和反馈绑定到所属连接。替换连接时开启新的记忆面板，普通渲染则保留草稿和缓存历史。

- [#12126 [OPEN] fix(studio): scope package installation forms to connection](https://github.com/esengine/DeepSeek-Reasonix/pull/12126)  
  包安装表单跟随产生输入的运行时连接。切换 Settings 连接时清空旧表单，防止可见确认把旧 source 和预览票据发送到新连接。

- [#12090 [OPEN] fix(studio): scope theme inventory reads to their connection](https://github.com/esengine/DeepSeek-Reasonix/pull/12090)  
  主题清单读取绑定当前内核，已安装主题选项、警告和读取错误不应跨连接串扰，刷新也不应被旧请求覆盖。

- [#12107 [OPEN] fix(installsource): report skill installation shadowing accurately](https://github.com/esengine/DeepSeek-Reasonix/pull/12107)  
  修正技能安装影子报告。若不同同名项目或自定义技能赢得发现权，则报告安装完成并附带两条路径警告，同时正确设置 `discoverable`/`indexed`。

- [#12110 [OPEN] fix(installsource): follow skill collection root aliases](https://github.com/esengine/DeepSeek-Reasonix/pull/12110)  
  通过本地目录符号链接安装多技能集合时，在 auto、register、copy、link 模式下正确发现技能。按名称卸载也可移除先前配置的别名根，而不删除作者文件。

- [#12136 [OPEN] fix(studio): associate hook receipts with their trial](https://github.com/esengine/DeepSeek-Reasonix/pull/12136)  
  Hook 试用结果和错误只显示给产生它的规则与调用。编辑规则、删除行或重试试用后，不再把先前执行结果显示为当前规则结果。

- [#12135 [OPEN] fix(studio): preserve memory drafts and pending writes](https://github.com/esengine/DeepSeek-Reasonix/pull/12135)  
  较早保存完成时保留较新的 Memory 草稿，并让每条事实的写控件在自身请求落定前保持禁用，避免编辑内容被无条件清空。

- [#11354 [OPEN] fix(installsource): reject npm package segments made only of dots](https://github.com/esengine/DeepSeek-Reasonix/pull/11354)  
  拒绝 scope 或 name 段仅由点组成的 npm 包名，例如 `@a/..` 不再被接受为包源。属于安装源输入校验与安全加固。

## 5. 功能需求趋势

> 本期 Issue 样本仅 4 条，以下方向结合 Issue 与 PR 主题观察。

- **桌面端国际化与 RTL 支持**：波斯语、阿拉伯语输出自动 RTL 排版需求出现，见 [#12114](https://github.com/esengine/DeepSeek-Reasonix/issues/12114)。
- **Provider 可观测性**：社区希望重试事件暴露延迟和安全原因，便于理解限流与失败，见 [#11873](https://github.com/esengine/DeepSeek-Reasonix/issues/11873)。
- **上下文压缩与 token 估算准确性**：压缩后会话长度估计不准，影响预算与压缩策略，见 [#12119](https://github.com/esengine/DeepSeek-Reasonix/issues/12119)。
- **多连接/多运行时状态隔离**：大量 PR 集中修复 backup、memory、theme、package、hook 等状态跨连接串扰，代表 PR：[#12131](https://github.com/esengine/DeepSeek-Reasonix/pull/12131)、[#12126](https://github.com/esengine/DeepSeek-Reasonix/pull/12126)、[#12090](https://github.com/esengine/DeepSeek-Reasonix/pull/12090)。
- **技能/插件安装源健壮性**：同名影子、目录符号链接、非法 npm 包名等边界持续修复，代表 PR：[#12107](https://github.com/esengine/DeepSeek-Reasonix/pull/12107)、[#12110](https://github.com/esengine/DeepSeek-Reasonix/pull/12110)、[#11354](https://github.com/esengine/DeepSeek-Reasonix/pull/11354)。
- **权限与安全门控**：文件预览、`PreToolUse`、权限检查执行顺序成为安全重点，见 [#12115](https://github.com/esengine/DeepSeek-Reasonix/pull/12115)。
- **编辑态与草稿保持**：Hook/Memory 在试用、保存、重试过程中不应丢失未保存编辑，见 [#12129](https://github.com/esengine/DeepSeek-Reasonix/pull/12129)、[#12135](https://github.com/esengine/DeepSeek-Reasonix/pull/12135)、[#12136](https://github.com/esengine/DeepSeek-Reasonix/pull/12136)。

## 6. 开发者关注点

- **多连接切换状态串扰是最大痛点**：备份恢复票据、记忆草稿、主题导入反馈、包安装表单、Hook 试用结果都可能跨连接泄漏，相关修复密集。代表：[#12131](https://github.com/esengine/DeepSeek-Reasonix/pull/12131)。
- **安装来源边界条件复杂**：同名技能影子、符号链接根、npm 点段包名等需要更准确的发现、报告与拒绝逻辑。代表：[#12107](https://github.com/esengine/DeepSeek-Reasonix/pull/12107)、[#12110](https://github.com/esengine/DeepSeek-Reasonix/pull/12110)、[#11354](https://github.com/esengine/DeepSeek-Reasonix/pull/11354)。
- **安全默认与执行顺序受重视**：文件访问检查、`PreToolUse`、预览/预像/执行之间的顺序需要更严格门控。代表：[#12115](https://github.com/esengine/DeepSeek-Reasonix/pull/12115)。
- **编辑器可靠性需求高**：保存、试用、重试期间不应清空未保存内容，写操作应独立禁用。代表：[#12129](https://github.com/esengine/DeepSeek-Reasonix/pull/12129)、[#12135](https://github.com/esengine/DeepSeek-Reasonix/pull/12135)。
- **重试可观测性不足**：Provider 层已有重试信息，但事件层未暴露延迟与安全原因，影响排障体验。代表：[#11873](https://github.com/esengine/DeepSeek-Reasonix/issues/11873)。
- **压缩后 token/会话长度估计需更准**：直接影响上下文窗口管理和成本预期。代表：[#12119](https://github.com/esengine/DeepSeek-Reasonix/issues/12119)。
- **国际化与可访问性开始进入桌面端需求池**：RTL 自动支持是本期明确的新方向。代表：[#12114](https://github.com/esengine/DeepSeek-Reasonix/issues/12114)。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 · 2026-10-06

> 数据来源：github.com/anomalyco/opencode

---

## 一、今日速览

今日无新版本发布，社区动态集中在 **V1 → V2 迁移遗留问题** 与 **生态插件文档扩张** 两条主线。多个 V1 时代会话管理、Azure 凭据迁移缺陷被陆续曝光；同时，开发者围绕 Vercel AI Gateway 原生接入、浏览器面板会话持久化、未跟踪文件 diff 性能等提交了一批高质量 PR。计费争议 Issue（#46365）仍是社区热度最高的长期话题。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues（10 条）

**1. [#46365] [Go] 月度用量在 ~$24.5 即显示 100%，远低于文档所述 $60 上限**
🔗 https://github.com/anomalyco/opencode/issues/46365
付费订阅用户反馈实际额度与官方文档严重不符。该 Issue 自 8 月底开启至今持续更新，累计 **5 👍 / 5 评论**，是当前社区情绪最强、最需要官方回应的计费类问题。

**2. [#53450] V1 会话在非 git 目录下从项目列表中消失（V2 回归）**
🔗 https://github.com/anomalyco/opencode/issues/53450
升级到 V2 后，在非 git 目录创建的 V1 会话从 TUI 侧栏与 `session list` 中消失，但数据仍在数据库中、可通过全局选择器访问。典型的升级回归，直接影响老用户迁移体验。

**3. [#53443] azure: 迁移后的 resourceName 被拒为 unknown_parameter**
🔗 https://github.com/anomalyco/opencode/issues/53443
V1.18.34 可用的 Azure API-key 账号升级到 V2.0.23 后立即报 `[ObjectParam] [resourceName] [unknown_parameter]`。凭据迁移逻辑破坏企业用户工作流，优先级应较高。

**4. [#51241] [BUG] 当 `shell` / `read` 权限被 deny 时免费模型直接失败**
🔗 https://github.com/anomalyco/opencode/issues/51241
v2.0.16 下使用 `opencode/big-pickle` 等免费模型，只要任一权限被拒绝即报错。权限系统与免费模型编排之间的耦合缺陷，影响安全敏感场景。

**5. [#53454] POST /api/session/{id}/move 写入错误路径并隐藏会话**
🔗 https://github.com/anomalyco/opencode/issues/53454
将会话移动到目标项目根目录时，写入 bogus 路径，接口返回 204「成功」但会话从项目列表消失。静默数据错乱问题，风险等级较高。

**6. [#53446] PermissionDenied 错误将完整 bash 规则集回显进工具结果**
🔗 https://github.com/anomalyco/opencode/issues/53446
权限拒绝时把整个生效中的 `permission.bash` 规则集嵌入错误信息，并在会话每次请求中重放给模型。存在 **信息泄露 + token 浪费** 双重问题，值得优先修复。

**7. [#53442] 主机 IP 变更后 provider 请求挂起直到重启**
🔗 https://github.com/anomalyco/opencode/issues/53442
`opencode serve --service` 运行中切换网卡配置会导致 socket 停留在 ESTAB 但请求无响应，须重启服务。对笔记本/移动办公场景影响明显。

**8. [#53307] [CLOSED] "Continuing after restart" 无限循环**
🔗 https://github.com/anomalyco/opencode/issues/53307
用户询问 ASR 模型实时能力后触发无限重启提示，新建会话、重装均无效。已关闭，但作为一般可用性类 bug 具有代表性（9 条评论）。

**9. [#53452] [FEATURE] TUI 支持水平分屏终端**
🔗 https://github.com/anomalyco/opencode/issues/53452
当前终端固定为会话右侧面板，用户希望支持下方布局。属于高性价比的 TUI 体验优化诉求。

**10. [#53447] `/cd` 在 Windows 上不显示符号链接目录**
🔗 https://github.com/anomalyco/opencode/issues/53447
Windows 下符号链接目录不出现在自动补全中，输入完整路径后才显示其子目录。跨平台一致性缺口。

> 其他值得留意：#52862（模型选择项缺失，已关闭）、#53307 已关闭。

---

## 四、重要 PR 进展（10 条）

**1. [#53432] feat(core): 原生接入 Vercel AI Gateway provider（已合）**
🔗 https://github.com/anomalyco/opencode/pull/53432
在 Provider builtins、AISDKNative、ModelResolver 中注册 `vercel-ai-gateway`，支持 `/messages`、`/responses`、`/chat` 三种入口。模型接入层的重要扩展。

**2. [#53449] fix(core): 未跟踪文件 diff 合并为单次 git 调用**
🔗 https://github.com/anomalyco/opencode/pr/53449
原实现每个未跟踪文件触发 2 次 git 进程；257 个文件的 worktree 会让 `/api/vcs/diff` 超过 60s 超时并引发重试风暴与空白页。性能修复价值高。

**3. [#51996] perf(core): 加速并加固快照捕获**
🔗 https://github.com/anomalyco/opencode/pull/51996
一次性关联 #44511、#36093、#42237、#48848、#43390 等 5 个 Issue，属核心性能路径的系统性优化。

**4. [#53453] fix(browser): 持久化会话存储、导航时保留标签页、提高隧道连接上限**
🔗 https://github.com/anomalyco/opencode/pull/53453
修复内嵌浏览器关闭后 cookie / IndexedDB / 登录态丢失（原用 `crypto.randomUUID()` 生成临时分区）。踩中大量用户痛点。

**5. [#53425] feat(task): 子代理分支隔离**
🔗 https://github.com/anomalyco/opencode/pull/53425
为 task 工具添加可选 `branch` 参数，通过独立 git worktree 隔离子代理工作，提升多代理并行安全性与可回滚性。

**6. [#53287] fix(core): 默认安装 AI SDK v6 provider**
🔗 https://github.com/anomalyco/opencode/pull/53287
AI SDK 官方包 npm `latest` 已切到 v7，导致未指定版本时静默装错。修复后显式锁定 v6 分支，避免 provider 兼容性事故。

**7. [#53422] fix(cli): 让插件共享宿主的 Effect 运行时**
🔗 https://github.com/anomalyco/opencode/pull/53422
插件自行解析 `effect` / `@opencode/plugin` 副本会导致模块私有符号与 Schema AST 无法共享，加载即失败。插件系统的关键稳定性修复。

**8. [#53445] fix(app): 切换选择前提交已暂存的 revert**
🔗 https://github.com/anomalyco/opencode/pull/53445
修复「回退后立即换模型发送」出现 `Message not found` 的 GUI 竞态，行为与 TUI 对齐。

**9. [#47539] fix(tui): 项目标识变更后保持会话可见（含自动清理）**
🔗 https://github.com/anomalyco/opencode/pull/47539
与 #53450 同类问题，修复会话在目录级选择器中消失，长期滞留的清理项。

**10. [#53448] docs: 将 OpenCode Model Router 加入生态插件表**
🔗 https://github.com/anomalyco/opencode/pull/53448
支持按 agent 配置 primary/secondary/tertiary 模型回退链并提供本地 Web UI。同期 #53455（opencode-courier）、#52864（dabloons）等生态插件文档 PR 密集提交，社区生态活跃度显著。

> 其他：`#53451` ChatGPT OAuth 标签区分 legacy、`#53441` 加速 managed-service 测试、`#53444` GUI 间距自动修复。

---

## 五、功能需求趋势

从本轮 Issues / PR 中可提炼以下三条主线：

1. **升级迁移与向后兼容**
   #53450、#53443、#47539、#10351（crossPlatformSessions）共同指向 V1→V2 的会话可见性、凭据迁移、跨平台同步三类兼容缺口，是当前**最高优先级**的社区诉求。

2. **权限与安全语义精细化**
   #51241（权限拒绝导致免费模型失败）、#53446（错误信息泄露完整规则集）显示 `permission.*` 体系在「拒绝时的可恢复性」与「错误信息披露」两个维度仍需打磨。

3. **模型 / Provider 生态接入**
   PR #53432（Vercel AI Gateway 原生）、#53287（AI SDK v6 锁定）+ 生态插件文档 PR 潮（Model Router、courier、dabloons、twg），说明社区强烈期待多 provider 与路由/回退能力。

4. **TUI / GUI 体验对等**
   #53452（TUI 水平分屏）、#53445（GUI 与 TUI 回退行为对齐）、#53315（侧栏标签裁剪）等表明 TUI 与 GUI 的功能一致性是持续改进方向。

---

## 六、开发者关注点

- **计费透明度**：#46365 长期未解且点赞最高，付费用户对「用量上限与文档不符」容忍度极低，建议官方尽快给出对账说明。
- **静默数据错乱**：#53454 返回成功但写入错误路径、#53450 会话「消失」——这类无报错的数据问题最伤信任。
- **升级即坏的体验**：Azure 凭据、非 git 目录会话、插件 Effect 冲突均为「升级后才出现」，反映 V2 迁移路径的回归测试覆盖不足。
- **性能与请求风暴**：#53449 揭示的 60s 超时 + 无限重试模式，在大型 worktree 场景下会放大为整体不可用。
- **信息泄露风险**：#53446 将完整权限规则集写回模型上下文，既是隐私问题也是 token 成本问题，建议纳入安全类修复。

---

*本日报基于 GitHub 公开数据自动整理，仅供参考。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 2026-10-06

## 1. 今日速览
过去 24 小时无新版本发布。社区主要集中在桌面端与 Windows 更新问题的集中反馈，同时安全凭据、多平台消息投递、新模型/provider 适配的修复 PR 活跃。多个 P1/P2 修复正在推进，桌面端稳定性成为今日最突出的痛点。

## 2. 版本发布
无。

## 3. 社区热点 Issues

1. **#133554 [OPEN] Copilot fallback 后无法选择 OpenAI 模型**  
   `P2 / needs-repro`，4 条评论。用户报告在使用 Copilot fallback 后，模型选择流程不再允许选择 OpenAI 模型；尚未复现。影响模型切换与回退流程，需要社区协助复现。  
   https://github.com/NousResearch/hermes-agent/issues/133554

2. **#133576 [OPEN] 全进程不可信输入安全姿态提案**  
   安全架构类 issue，建议引入代理凭据、默认拒绝出站、可执行的妥协矩阵。属于系统性安全设计需求，影响整个 agent 的信任边界。  
   https://github.com/NousResearch/hermes-agent/issues/133576

3. **#133577 [OPEN] `secure_parent_dir()` 忽略 `HERMES_HOME_MODE`，凭据写入重新锁死 0700**  
   安全回归（#6991 的回归）。当凭据文件直接位于 `HERMES_HOME` 时，父目录权限被硬编码为 `0700`，导致文档中的 `HERMES_HOME_MODE=0701` 逃生舱口失效。  
   https://github.com/NousResearch/hermes-agent/issues/133577

4. **#133575 [OPEN] Claude 订阅实验 provider 的 prompt cache 卡在固定下限**  
   `claude-subscription-directsdk-experimental` 下 Anthropic prompt cache 整个会话不前进，命中数停滞。影响实验性订阅 provider 的成本与性能。  
   https://github.com/NousResearch/hermes-agent/issues/133575

5. **#133574 [OPEN] 自定义技能子目录需要写支持**  
   目前技能子目录（如 `steps/`、`checks/`）自动发现为只读，`_validate_file_path()` 仍限制 `write_file`/`remove`。这是 PR #31091 的后续需求，影响技能生态扩展。  
   https://github.com/NousResearch/hermes-agent/issues/133574

6. **#133569 [OPEN] 桌面“显示更早消息”按钮可见但无效**  
   `P2 / comp/desktop / area/sessions`。点击后不加载旧记录、无滚动、无加载动画、无错误提示，按钮从不消失。桌面核心会话历史功能受损。  
   https://github.com/NousResearch/hermes-agent/issues/133569

7. **#133570 [OPEN] Windows 桌面更新成功后误报“无法验证新构建”（退出码 8）**  
   `P2 / platform/windows / area/install-update`。验证逻辑与延迟完成尾部竞争，导致成功更新后仍报错。影响 Windows 桌面更新体验。  
   https://github.com/NousResearch/hermes-agent/issues/133570

8. **#133561 [OPEN] 桌面语音 barge-in 硬中断工具执行**  
   `P2 / comp/desktop / tool/terminal / tool/delegate / tool/tts`。用户在工具执行阶段打断时，barge-in 触发完整 session 中断，导致有副作用的工具被中止，而非仅转向。  
   https://github.com/NousResearch/hermes-agent/issues/133561

9. **#131838 [OPEN] Mnemosyne 数据库锁与硬编码 5s busy timeout 过小**  
   `P3 / area/memory`，1 条评论。单日出现约 1540 次 `database is locked` / `cannot commit transaction` 错误。多写入竞争下 5s 超时明显不足。  
   https://github.com/NousResearch/hermes-agent/issues/131838

10. **#37315 [CLOSED] QQ Bot `send_message` 静默丢弃 MEDIA 文件**  
    `P2 / platform/qqbot`，2 条评论。QQ Bot REST API 支持图片/文件，但 `_send_qqbot` 仅发送文本。该问题已关闭，但反映了平台媒体支持的重要性。  
    https://github.com/NousResearch/hermes-agent/issues/37315

> 其他值得留意：#133568 桌面斜杠命令尾随空格丢失；#130307 Discord 语音转录去重 runner-wide 导致第二 bot 丢话（已关闭）。

## 4. 重要 PR 进展

1. **#133579 [OPEN] 修复旧 Python 3.11 安装的 Windows 更新证书检查失败**  
   `ci-reviewed`。旧 Python 3.11 venv 的 Windows 安装执行 `hermes update` 时不再因 `CERTIFICATE_VERIFY_FAILED` 失败，是对 #133497 的挽救。  
   https://github.com/NousResearch/hermes-agent/pull/133579

2. **#133567 [OPEN] Treeless 安装在更新依赖步骤前转换，避免磁盘填满**  
   `P1 / comp/cli / platform/windows / ci-reviewed`。修复 treeless (`tree:0`) 安装在更新过程中填满磁盘的问题，在 pull 后第一步及安装器重跑时转换为 blobless。  
   https://github.com/NousResearch/hermes-agent/pull/133567

3. **#99757 [CLOSED] 安全：限制 `key_cmd` 子进程环境**  
   `type/security / comp/agent / area/auth`。`key_cmd` 子进程此前继承完整父环境，包括无关的 provider 和工具凭据；现通过现有非终端子进程策略隔离。  
   https://github.com/NousResearch/hermes-agent/pull/99757

4. **#133572 [OPEN] 压缩时脱敏散文中的裸高熵密钥**  
   `type/security / area/compression`。防止用户在对话中粘贴的裸密钥进入压缩历史，降低凭据泄漏风险。  
   https://github.com/NousResearch/hermes-agent/pull/133572

5. **#133573 [OPEN] Bedrock 路由 GPT-6 系列及带前缀的 OpenAI 推理配置，并设置 1M 窗口**  
   `P2 / provider/bedrock / area/compression`。修复 `us.openai.gpt-6.1-sol` 在 96,000 token 就压缩、400K 上限未生效的问题。  
   https://github.com/NousResearch/hermes-agent/pull/133573

6. **#133534 [OPEN] 支持 MiniMax OAuth 辅助任务**  
   `provider/minimax / area/auth`。`minimax-oauth` 注册了 `auth_type == "oauth_minimax"`，但辅助解析器缺少对应分支，导致所有解析失败。  
   https://github.com/NousResearch/hermes-agent/pull/133534

7. **#133565 [OPEN] 辅助任务重试时使用选定池凭据**  
   `P2 / area/auth`。修复凭据池中健康 key 被错误标记为耗尽的问题：当 key A 返回 402 并切到 key B 后，重试应使用 B 而非仍用 A。  
   https://github.com/NousResearch/hermes-agent/pull/133565

8. **#133580 [OPEN] 桌面 OAuth 登录：每个网关一次静默登录并退避**  
   修复网关 session cookie 缺失时，桌面 App 为每个被拒请求打开一个登录窗口、持续数分钟的问题。  
   https://github.com/NousResearch/hermes-agent/pull/133580

9. **#133578 [OPEN] LSP：空 `.git` 目录不再将语言服务器根目录上移**  
   修复 `find_git_worktree()` 接受任意名为 `.git` 的路径，导致一个空的 `~/.git` 使所有文件被错误归入其父目录。  
   https://github.com/NousResearch/hermes-agent/pull/133578

10. **#105572 [OPEN] Skills Hub 增加本地目录源和批量导入命令**  
    `type/feature / tool/skills`。允许注册任意本地 `<name>/SKILL.md` 技能目录，并通过现有隔离与安全扫描流程浏览、搜索、安装。  
    https://github.com/NousResearch/hermes-agent/pull/105572

> 其他活跃 PR：#124754 网关重启后公告恢复在线；#133471 / #130312 修复 Discord `/voice join` 重绑定期间转录投递；#108582 会话精确选择修剪。

## 5. 功能需求趋势

- **桌面端体验与稳定性**：会话历史加载、更新验证、语音打断、输入框细节、OAuth 登录弹窗等，桌面端成为 bug 最集中区域。
- **安全与凭据管理**：全进程不可信输入姿态、凭据写入权限、子进程环境隔离、压缩历史密钥脱敏。
- **多平台消息投递**：QQ Bot 媒体文件、Discord 语音转录去重与重绑定、Matrix 收据/处理反馈、BlueBubbles 重复轮次。
- **模型/provider 适配**：OpenAI/Copilot 回退后模型选择、Claude 订阅缓存、Bedrock GPT-6 窗口、MiniMax OAuth 辅助任务。
- **技能系统扩展**：自定义子目录读写、自动发现、本地目录源、批量导入。
- **内存与数据库并发**：Mnemosyne SQLite 锁与硬编码超时，多写入竞争需要可配置策略。
- **语音交互**：barge-in 行为应从硬中断改为转向，避免中止有副作用的工具。

## 6. 开发者关注点

- 桌面端 P2 bug 集中爆发，建议优先排查会话历史与更新验证链路。
- Windows 安装/更新问题反复出现：证书检查、验证竞态、treeless 磁盘填满。
- 安全边界问题高频：子进程继承全部凭据、凭据写入忽略环境变量、密钥进入压缩历史。
- Provider 兼容性和缓存行为仍需加强：模型选择回退、prompt cache 不前进、新模型窗口大小未正确路由。
- 多写入内存数据库的锁竞争和硬编码超时导致大量运行时错误，需要可配置 busy timeout 和写入协调。
- 技能文件权限不一致：能读能列但写不了，影响开发者创作自定义技能子目录。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 · 2026-10-06

## 1. 今日速览

今日社区重心集中在**会话/内存状态一致性**与**进程生命周期管理**两大主线：v2026.10.1-beta.1 发布，重点修复会话注册表变更、worker 附件投递与嵌入缓存迁移问题；同时 P0 级 Issue #158095（gateway worker 状态生命周期卡死）与 P1 级 #97616（子进程僵尸累积）持续发酵，成为稳定性风险焦点。PR 侧则以 worker 原生推理运行时（#163645、#163646）和 doctor/update 恢复流程（#165854）为最大看点。

---

## 2. 版本发布

**v2026.10.1-beta.1** — 主题为 Sessions and memory：

- 保留跨注册表变更的 usage 数据
- 支持从远程工作区投递 worker 附件
- 修复排队取消与 transcript 别名导致活跃 turn 停滞的问题
- 保持 continuation 签名对齐
- 完成 embedding 缓存迁移

该 beta 版本呼应了近期多个会话状态类 Issue（如 #149341、#158095），但尚未覆盖进程泄漏与生命周期卡死问题。

---

## 3. 社区热点 Issues

> 注：过去 24 小时内更新的 Issue 共 8 条，以下全部覆盖。

### 🔴 P0 / P1 稳定性风险

1. **[#158095](https://github.com/openclaw/openclaw/issues/158095) [OPEN][P0] Gateway worker 在 acquireSqliteWorkerLifecycle 后持有状态生命周期，后续 acquire 全部失败直至重启**
   作者 @ryanjkelly。crash 类缺陷，标注 `impact:crash-loop`、`ux-release-blocker`，需要维护者评审。已在 2026.9.6 (eb377ac) 复现，主线程与回收 worker 均报 `StateDatabaseC...` 失败。**为何重要**：直接影响 gateway 可用性，是当前最高优先级未修复项。

2. **[#97616](https://github.com/openclaw/openclaw/issues/97616) [OPEN][P1] Hook/Tool 子进程未回收，僵尸进程累积导致运行时退化**
   作者 @avp717。17 条评论、1 👍，是今日互动量最高的 Issue。涉及 `openclaw-hooks`、`bash`、`codex` 等子进程。**为何重要**：长跑实例的慢性退化问题，社区已有多人确认，长时间运行场景首当其冲。

3. **[#149270](https://github.com/openclaw/openclaw/issues/149270) [OPEN][P1] Code-mode turn 被不落地的工具调度永久卡住，session 准入活性锁死**
   作者 @arthur-drozdov。第三方工具 `bridge:sleep` 永不 resolve 导致 turn 永久 in-flight，后续消息全部堆积。**为何重要**：暴露工具调度缺乏超时兜底，属会话状态与消息丢失双重影响。

### 🟠 行为缺陷 / 消息丢失

4. **[#149313](https://github.com/openclaw/openclaw/issues/149313) [OPEN][P2] 飞书文本重试去重把不同 topic root 误判为同一消息**
   作者 @yunligou711-commits。当 sender、chat、create_time、text 均相同时，去重键无法区分不同 thread。**为何重要**：多线程话题场景下的静默消息丢弃，评级 🦞 diamond lobster。

5. **[#149303](https://github.com/openclaw/openclaw/issues/149303) [OPEN][P2] MSTeams 入站 debounce 跨不同线程根合并回复**
   作者 @yunligou711-commits。`conversation.id` 归一化导致同发送者不同线程的消息被合并成一个 agent turn。**为何重要**：与 #149313 同源，指向多渠道 debounce 归一化策略的系统性缺陷。

6. **[#149341](https://github.com/openclaw/openclaw/issues/149341) [OPEN][P2] sessions.list 上报 agent 默认模型却未标记为 fallback**
   作者 @DasX。当模型实际由自动化 `payload.model` 等来源决定时，行解析读取不到，报告值误导。**为何重要**：影响可观测性与排障准确性，已有关联 PR。

7. **[#165857](https://github.com/openclaw/openclaw/issues/165857) [OPEN] system-owned every-kind cron 卡在 nextRunAtMs 哨兵值**
   作者 @jaimeehenry。外部脚本写入 `9999999999999` 后，`cron disable && enable` 与启动收敛均无法修复。**为何重要**：自动化任务静默失效，且缺乏自愈机制。

### ✅ 已关闭

8. **[#148755](https://github.com/openclaw/openclaw/issues/148755) [CLOSED][P1] 90s 瞬时重试窗口被重试尝试自身消耗，工具类 turn 仅一次重试后报"temporarily overloaded"**
   作者 @keyfetcher5。`MAX_TRANSIENT_RETRY_TIME_MS` 计时跨重试尝试，导致无 fallback 可用。**为何重要**：已关闭，为 provider 过载场景的重试策略提供了修复样本。

---

## 4. 重要 PR 进展

1. **[#163645](https://github.com/openclaw/openclaw/pull/163645) feat(worker): 新增原生推理运行时**（XL，🐚 platinum hermit）
   在 #158902 之上，为 worker 引入自有推理运行时，接受顶层 `models.providers` 投影的模型目录与凭据。**当前最具架构意义的改动。**

2. **[#163646](https://github.com/openclaw/openclaw/pull/163646) feat(gateway): 安全调度 worker 本地原生推理**
   与 #163645 配套，仅在 capability、model-policy、placement、receipt 与当前授权检查通过后调度 worker 推理。标注 `merge-risk: auth-provider`。

3. **[#165854](https://github.com/openclaw/openclaw/pull/165854) fix: doctor/update 恢复归档且不遗留 gateway 停止**（XL，P1）
   关闭 #165789、#164948、#161734、#161921 四个 Issue。解决 transcript archive 迁移不完整或受管 Gateway 被停的问题。

4. **[#165716](https://github.com/openclaw/openclaw/pull/165716) feat(voice-call): 单次通话简报、通话报告、实时引导、回调与语音信箱检测**（XL）
   让 agent 代打电话具备 per-call 指令，而非固定话术。标注 `merge-risk: compatibility` 与 `security-boundary`。

5. **[#165844](https://github.com/openclaw/openclaw/pull/165844) fix(agents): watchdog 在模型 fallback 前取消回复**
   关闭 #103697。修复诊断 watchdog 过早使停滞后端模型的父回复过期、抢占 lane 导致配置的 fallback 无法运行。

6. **[#164372](https://github.com/openclaw/openclaw/pull/164372) fix(agents): 孤儿修复前重载 transcript，避免陈旧视图写冲突**（P1）
   修复 #162907。Talk 语音咨询在会话管理器加载后 transcript 被推进导致模型无法运行。

7. **[#165858](https://github.com/openclaw/openclaw/pull/165858) perf(git): 大仓库中保持 session diff 响应性**
   针对 packfile 众多仓库中 diff 耗时数十秒、以及时间戳变更后重复重哈希的问题。

8. **[#165819](https://github.com/openclaw/openclaw/pull/165819) perf(session-entry): 将冷启动与子会话补丁移至 worker**
   将首轮与子会话在 Gateway 线程上执行的 7 个 native session-entry 事务下沉，减少主线程阻塞（49 条事务信封语句 + 71 条内核语句）。

9. **[#149337](https://github.com/openclaw/openclaw/pull/149337) fix(memory): 并发写入下保持 forgetting 一致性**
   修复 `memory forget` 可能漏掉等待数据库写入期间提交的记录，或沿用已被替换的存储连接。

10. **[#155526](https://github.com/openclaw/openclaw/pull/155526) fix(doctor): 深层嵌套 model-ref 配置不再栈溢出**
    将递归改为显式工作栈，修复约 2500 层嵌套配置导致 `openclaw doctor --fix` 崩溃（RangeError）。

**其他值得关注**：#165824（Matrix debounce 失效）、#165728（Codex 原始可视化指令泄漏到聊天）、#164462（macOS/iOS 暴露 Systems 仪表盘入口）、#165855（解除十月 beta 打包阻塞）、#165849（UI PR 引用指向错误仓库）。

---

## 5. 功能需求趋势

从 Issues 与 PR 的交集中可提炼出四个方向：

- **会话状态一致性（最热）**：usage 保留、transcript 别名、continuation 签名、rollback 权限、孤儿修复——v2026.10.1-beta.1 与 #165859、#164372、#149337 均围绕此展开。
- **多进程 / 多 worker 架构治理**：worker 生命周期授权（#158095）、worker 原生推理（#163645/#163646）、子进程回收（#97616）、session-entry 下沉（#165819）——社区正把负载从 Gateway 主线程向 worker 迁移，但生命周期管理尚未收敛。
- **渠道集成健壮性**：飞书（#149313）、MSTeams（#149303）、Matrix（#165824）三条 Issue/PR 指向同一类缺陷——入站 debounce 与去重键归一化跨线程根失效。这是当前最集中的渠道类问题簇。
- **原生多端能力扩展**：voice-call 增强（#165716）、macOS/iOS Systems 路由（#164462）、Codex 可视化治理（#165728）。

---

## 6. 开发者关注点

1. **缺乏超时兜底的工具调度**：#149270 的 `bridge:sleep` 永不 resolve 直接锁死 session 准入，说明工具 dispatch 缺少强制超时与活性检测，是对话式框架的通用陷阱。
2. **生命周期状态机难以恢复**：#158095 与 #165857 均表现为"进入异常状态后无法自愈，只能重启/手工介入"，开发者期望启动收敛能修复更多脏状态。
3. **重试与 fallback 逻辑互相干扰**：#148755（已关闭）与 #165844 显示 retry 窗口计量、watchdog 取消、模型 fallback 三者的时序耦合脆弱。
4. **可观测性失真**：#149341（sessions.list 模型误报）反映内部状态与对外报告之间存在"来源未被读取"的盲区，排障依赖的报告不可信。
5. **大仓库与长跑实例的慢性性能退化**：#165858（packfile 重哈希）与 #97616（僵尸累积）都是"越用越慢"型问题，对长期运行的部署影响显著。

---

*数据来源：github.com/openclaw/openclaw · 报告期：2026-10-05 至 2026-10-06*

:::
