---
title: "AI CLI 工具社区动态日报"
published: 2026-09-27
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-27

> 生成时间: 2026-09-27 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具社区横向对比分析报告（2026-09-27）

## 一、生态全景

当前 AI CLI 工具赛道正从"功能扩张"转向"稳定性与信任建设"阶段。社区反馈高度集中在模型行为可控性、权限透明、成本治理与跨平台可靠性四大主题，对新增功能的诉求相对降温。各工具均出现升级后立即暴露的回归（Claude Code Linux 输入框卡死、Codex Windows 启动失败、OpenCode Provider 全量断开），"升级恐惧症"在社区蔓延。与此同时，Agent 自主性虽被寄予厚望，但误报成功、挂起、范围蔓延等可靠性问题频发，说明该领域仍处早期。整体上，各工具差异化定位逐渐清晰：有的押注企业安全治理，有的押注平台成熟度，有的押注 Agent 自治，有的押注本地化体验。

## 二、各工具活跃度对比

| 工具 | 活跃 Issues | 重要 PR | 版本发布 | 24h 动态特征 |
|---|---|---|---|---|
| Claude Code | 10 | 1 | 0 | 社区讨论度极高（#65961 获 247 👍，为全行业单 Issue 最高），但官方迭代节奏慢 |
| OpenAI Codex | 10 | 10 | 6（Rust CLI alpha/patch） | 迭代最密集；认证故障 + Windows 回归为主旋律 |
| Gemini CLI | 10 | 10 | 1（nightly） | 双高活跃；P1 级 agent 可靠性问题待解 |
| DeepSeek Reasonix | 10 | 10（全部合并） | 1（v1.39.1 稳定版） | 执行效率最高，社区反馈闭环最快 |
| OpenCode | 10 | 10 | 0 | PR 活跃但存在机器人批量清理；v2 迁移阵痛 |
| Hermes | 8 | 10 | 0 | 插件 API 扩展密集（@nekwo 贡献 8 个 PR）；小而深 |
| Deepseek Harness | 0 | 0 | 0 | 过去 24 小时无活动 |

> 注：Issues/PR 数为各工具日报列出的"热点/重要"数量，非仓库总增量。

## 三、共同关注的功能方向

### 1. 模型行为可控性与 Agent 可靠性
- **Claude Code**：#65961 要求严格遵守"不写注释"指令（247 👍）；#97117 报告 Opus 5.5 范围蔓延。
- **Gemini CLI**：#22323 子代理在 MAX_TURNS 后误报 GOAL 成功，隐藏中断；#21409 Generalist agent 永久挂起。
- **共同诉求**：指令遵循、任务聚焦、中断状态可感知，是当前最核心的信任痛点。

### 2. 权限透明与执行安全
- **Claude Code**：#69397 PowerShell 无确认执行破坏性命令且无事件记录；#97538 子进程未继承安全包装器。
- **Gemini CLI**：#26525 Auto Memory 在脱敏前将内容发送给提取模型；PR #29510 修复 Windows 命令注入。
- **Hermes**：#102311 tool-arg 修复逻辑将可修复参数静默破坏为 `{}`，真实 payload 被丢弃。
- **共同诉求**：默认保守、全程留痕、执行前审批。

### 3. 成本治理与可观测性
- **Claude Code**：#89865 单次 workflow 启动 355 个 agent、724 次 Opus 调用，无成本确认。
- **OpenCode**：#40544 `run --format json` 事件缺少 model 字段，无法按模型归因用量。
- **Codex**：#47656 GPT-6 Sol 单任务耗时 40+ 分钟，性能归因困难。
- **共同诉求**：agent fan-out 需要预算闸门；用量数据需要结构化输出。

### 4. 跨平台稳定性（Windows 是最大短板）
- **Codex**：#48074/#48540 终端闪烁、#48016 无法启动、#48415 Cmd+C 快捷键失效，Windows 问题最为集中。
- **DeepSeek Reasonix**：#8213 GBK 编码致无限恢复循环、#6488 edit_file 字节损坏。
- **OpenCode**：#51553 npm 12 升级后 Windows 可执行文件残留 stub。
- **Claude Code**：#96931 Linux TUI 输入框 0-90 秒必现卡死。
- **共同诉求**：六款活跃工具均有 Windows 相关缺陷报告，跨平台 CI 覆盖明显不足。

### 5. 配置可靠性与环境隔离
- **Claude Code**：#25664 SSH 远程错误传递本地插件/MCP 配置导致无限挂起。
- **OpenCode**：#46692 timeout/chunkTimeout 文档已声明但代码从未读取；#51561 API 不展开 `~` 路径。
- **Hermes**：#124561 要求按频道覆盖 busy_input_mode；#124565 多账户 1Password vault 隔离。
- **共同诉求**：配置必须"真正生效"，本地/远程、全局/项目边界必须清晰隔离。

### 6. MCP 与连接器生态可靠性
- **Claude Code**：#61682 GitHub connector 显示已连接但 Cowork 中无工具可用。
- **Gemini CLI**：#29398 MCP 工具发现异常时阻塞长达 10 分钟。
- **DeepSeek Reasonix**：#7857 Windows 下 MCP stderr 乱码无法定位原因。
- **Hermes**：#124210 补齐 MCP transform hooks。
- **共同诉求**：连接器状态需真实可信、故障需快速失败、错误信息需可读。

### 7. TUI/桌面交互细节
- **Codex**：#48415 基础快捷键回归、#48549 复制表格破坏 Markdown 结构。
- **OpenCode**：#27661 Home/End 键被劫持、#48882 要求恢复经典双栏 UI（32 👍）。
- **Gemini CLI**：#29520 流式输出时滚动位置重置。
- **共同诉求**：TUI 已成日常生产力入口，细节体验直接决定口碑。

## 四、差异化定位分析

| 工具 | 核心定位 | 技术路线侧重 | 目标用户 |
|---|---|---|---|
| **Claude Code** | 企业级安全与治理标杆 | 模型行为管控、权限系统、成本治理；迭代保守 | 对合规与审计有强要求的团队 |
| **OpenAI Codex** | 平台化全栈覆盖 | Rust CLI + Desktop + VS Code 扩展多端齐进，日更 6 版 | 追求新版本能力、云原生开发者 |
| **Gemini CLI** | Agent 自治与上下文创新 | Subagent/Skills/Auto Memory/AST 感知读取，nightly 快速验证 | 愿意尝试 Agent 驱动工作流的开发者 |
| **DeepSeek Reasonix** | 本地化与编码正确性 | 中文 Windows 适配、字节级编码修复、稳定版节奏 | 中文开发者及本地化部署用户 |
| **OpenCode** | 开源多 Provider 聚合 | v2 架构、UI 可配置、Provider 兼容层，社区驱动 | Provider 中立、高度定制需求的开发者 |
| **Hermes** | 嵌入式 Agent 中间件 | 网关/插件 API/多租户隔离，面向产品嵌入 | 将 Agent 能力嵌入自身产品的开发者 |
| **Deepseek Harness** | — | 当前停滞 | — |

关键差异：**Claude Code** 与 **Hermes** 处于"稳定维护"状态，前者重治理、后者重插件生态；**Codex** 与 **Gemini** 高速迭代但伴随明显回归阵痛；**Reasonix** 的"10 个 PR 全部合并"显示其修复效率同类最高；**OpenCode** 的最大不确定性来自 v2 迁移期兼容性。

## 五、社区热度与成熟度

- **第一梯队（高热迭代）**：**OpenAI Codex**（24h 内 6 版本 + 20 条活跃 Issue/PR，#48237 单 Issue 评论 96 条）、**Gemini CLI**（10+10+nightly）、**DeepSeek Reasonix**（PR 全合并、反馈闭环最快）、**OpenCode**（10+10，但存在机器人清理，活跃度有部分"水分"）。
- **第二梯队（社区热、官方冷）**：**Claude Code** 社区参与度全行业最高（#65961 获 247 👍），但项目侧仅 1 个 PR，呈明显"剪刀差"。
- **第三梯队（小而深 / 休眠）**：**Hermes** 体量小但单开发者贡献密度高；**Deepseek Harness** 无活动。

成熟度判断：Claude Code 功能最成熟但灵活性受限；Codex、Gemini、Reasonix 处于快速迭代期，稳定性波动大；Hermes 在嵌入场景成熟度高；OpenCode 的 v2 迁移是当前最大变量。

## 六、值得关注的趋势信号

1. **"静默失败"是信任头号杀手**：Hermes 的"截断但 CRC 有效"备份（#124564）、OpenCode 的配置被静默忽略（#46692）、Claude Code 的权限执行无记录（#69397）、Gemini 的子代理假成功（#22323）——"看起来成功、实则损坏"是 AI 工具最危险的行为模式。**开发者应优先考察工具的错误可观测性，而非功能列表。**

2. **升级回归已常态化**：Claude Code 2.1.282、Codex 0.157.1、Codex Desktop 26.924、OpenCode 最新版均在发布后立即暴露严重回归。**建议生产环境采取"滞后 N 个版本"或"固定版本 + 灰度验证"策略。**

3. **成本治理从"事后账单"走向"事前闸门"**：Claude Code 的 355-agent 案例（#89865）将成本失控问题推到台前。**决策者应要求工具提供硬性预算上限、fan-out 前成本预览、按模型/任务的用量归因能力。**

4. **Windows 是当前行业共同短板**：几乎所有活跃工具在 Windows 均有编码、启动、沙箱、升级类问题。**Windows 开发者优先选择有专项投入的工具（如 Reasonix），并关注各工具 Windows CI 覆盖情况。**

5. **权限系统向"默认拒绝 + 全程留痕"演进**：无确认执行、wrapper 缺失、命令注入等多起事件表明，宽松权限默认值已不被接受。**企业采购应将权限审计能力列为硬性评估项。**

6. **Agent 自主性仍被高估**：子代理误报、挂起、不调用技能、范围蔓延在多个社区普遍存在。**对 Agent 自动化任务应设置明确超时、重试与人工确认点，不宜完全放手。**

7. **插件生态成为差异化护城河**：Hermes 的插件 API 扩展、Gemini 的 skills、Claude Code 的 plugins 均在快速迭代。**选型时应评估工具是否支持工具集注册、命令拦截、hook 等深度定制能力。**

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

> 数据口径说明：PR 列表中「评论数」字段在本次数据中显示为 `undefined`，因此以下“热门”排名综合了 PR 的功能影响力、更新活跃度、关联 Issue 热度及社区讨论指向。

## 1. 热门 Skills 排行

以下为当前关注度较高的 Skill 相关 PR，**状态均为 Open**。

- **fix(skill-creator): isolate trigger evals and handle Windows and runtime failures**  
  [#1298](https://github.com/anthropics/skills/pull/1298)  
  功能：修复 `skill-creator` 在触发器评估时的误报/漏报，包括 Windows 下 `select()` 管道失败、无关工具中断扫描等问题。  
  社区关注点：skill-creator 是官方技能生产工具，直接影响所有 Skill 的质量；触发评估可靠性是开发者最常遇到的痛点。  
  状态：Open，最后更新 2026-09-16。

- **fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers**  
  [#1742](https://github.com/anthropics/skills/pull/1742)  
  功能：适配 `mcp>=2.0.0` 的 API 变更，支持 `streamable_http_client` 改名和自定义 HTTP headers。  
  社区关注点：MCP 生态快速演进，`mcp-builder` 是否能兼容最新版本已成为社区刚需。  
  状态：Open，最后更新 2026-09-26。

- **feat(skills): add proofcore-contract-auditor for smart contract notarization**  
  [#1771](https://github.com/anthropics/skills/pull/1771)  
  功能：面向 Web3 开发者，对 Solidity/Rust 智能合约做静态分析，并将审计证明锚定到 TON 区块链。  
  社区关注点：这是仓库中少见的 Web3/合约安全方向 Skill，涉及审计信任与链上存证。  
  状态：Open，最后更新 2026-09-16。

- **Add md2video-audio skill**  
  [#1703](https://github.com/anthropics/skills/pull/1703)  
  功能：将 Markdown 文档通过 Marp 编译为幻灯片，再生成带真人语音的 MP4 视频。  
  社区关注点：零成本文档转视频，适合教育培训、内容分发场景。  
  状态：Open，最后更新 2026-09-15。

- **Add pyxel skill for retro game development**  
  [#525](https://github.com/anthropics/skills/pull/525)  
  功能：指导 Claude 使用 Pyxel 创建、调试和验证复古风格 Python 游戏，支持 headless 输入驱动和逐帧检查。  
  社区关注点：长期开放但持续更新的 Skill，代表了娱乐/创意编程方向的需求。  
  状态：Open，最后更新 2026-09-22。

- **Add document-typography skill**  
  [#514](https://github.com/anthropics/skills/pull/514)  
  功能：对 AI 生成文档做排版质量控制，包括孤词换行、标题孤行、编号错位等。  
  社区关注点：直击 AI 生成文档的常见质量问题，但与现有 docx/pptx Skill 可能存在边界重叠。  
  状态：Open，最后更新 2026-03-13。

- **feat: add AWT (AI Watch Tester) — AI-powered E2E testing skill**  
  [#822](https://github.com/anthropics/skills/pull/822)  
  功能：通过视觉和浏览器控制自动运行 E2E 测试，支持零代码测试生成。  
  社区关注点：自动化 UI 测试是社区反复提出的方向，AWT 作为独立开源项目被引入。  
  状态：Open，最后更新 2026-09-19。

## 2. 社区需求趋势

从 Issues 看，社区最关注的不只是单个 Skill，而是 **Skills 生态的可靠性、安全性和可分享性**：

- **安全与信任边界**  
  [#492](https://github.com/anthropics/skills/issues/492)（43 评论）指出社区 Skill 被放到 `anthropic/` 命名空间下，可能造成“官方 Skill”的信任误导；另有 [#1394](https://github.com/anthropics/skills/issues/1394) 提到 eval-viewer 的 XSS 风险。

- **组织级分享与协作**  
  [#228](https://github.com/anthropics/skills/issues/228)（16 评论）希望 Skill 能直接组织内共享，而不是手动下载 .skill 文件再分发。

- **技能可评估性与稳定性**  
  [#556](https://github.com/anthropics/skills/issues/556)（12 评论）报告 `run_eval.py` 触发率始终为 0；[#1390](https://github.com/anthropics/skills/issues/1390) 报告 mcp-builder 评估脚本对所有真实 MCP server 都误报为 0/N。

- **上下文窗口效率**  
  [#1487](https://github.com/anthropics/skills/issues/1487) 指出 `claude-api` Skill 一次注入约 156k tokens，导致上下文窗口被耗尽；[#1329](https://github.com/anthropics/skills/issues/1329) 则提出 `compact-memory` 符号化记忆方案。

- **新 Skill 方向：治理、推理质量、文档处理**  
  社区提案包括 agent-governance（[#412](https://github.com/anthropics/skills/issues/412)）、reasoning quality gate（[#1385](https://github.com/anthropics/skills/issues/1385)）、Notion spec 转实现（[#1245](https://github.com/anthropics/skills/pull/1245)）等。

## 3. 高潜力待合并 Skills

以下 PR 均未合并，但更新时间近、且修复或补齐了明确痛点，属于近期可能落地的候选：

- **fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers**  
  [#1742](https://github.com/anthropics/skills/pull/1742)  
  最后更新 2026-09-26，直接修复 [#1668](https://github.com/anthropics/skills/issues/1668)，是新版 MCP 兼容的关键补丁。

- **fix(docx): report LibreOffice timeout as an error and verify the output**  
  [#1792](https://github.com/anthropics/skills/pull/1792)  
  最后更新 2026-09-25，修复 `soffice` 超时却报告成功的问题，提升 docx 处理可靠性。

- **Detect orphaned docx comments**  
  [#1734](https://github.com/anthropics/skills/pull/1734)  
  最后更新 2026-09-25，补齐 DOCX 评论孤悬检测。

- **Add notion-spec-to-implementation and quantitative-resume-auditor skills**  
  [#1245](https://github.com/anthropics/skills/pull/1245)  
  最后更新 2026-09-24，一次新增两个实用 Skill，覆盖需求拆解和简历量化审计。

- **Add pyxel skill for retro game development**  
  [#525](https://github.com/anthropics/skills/pull/525)  
  最后更新 2026-09-22，虽是长期 PR，但近期仍在活跃，创意编程方向关注度高。

- **feat: add testing-patterns skill**  
  [#723](https://github.com/anthropics/skills/pull/723)  
  最后更新 2026-09-21，覆盖单元测试、React 组件测试、测试哲学等完整测试栈。

## 4. Skills 生态洞察

当前社区最集中的诉求已从“新增更多业务 Skill”转向“让 Skill 的创建、评估、分发、安全与上下文占用更加可靠”——官方工具链（skill-creator / mcp-builder / run_eval）和信任治理是最大痛点，单个业务 Skill 的热度反而相对有限。

---

# Claude Code 社区动态日报 — 2026-09-27

## 今日速览

过去 24 小时无新版本发布，但社区反馈持续升温：Linux 端 TUI 输入框在 2.1.282 出现严重回归（#96931），Opus 5.5 被报告存在范围蔓延问题（#97117），另有一起 PowerShell 工具绕过权限执行破坏性命令的安全事件被曝光（#69397）。此外，社区对模型过度注释、SSH 远程配置泄漏、成本失控等问题保持高关注度。

---

## 社区热点 Issues（10 个）

### 1. [MODEL] Claude 默认输出冗长注释，无视禁止指令
**#65961** | 👍 247 | 💬 38 | [链接](https://github.com/anthropics/claude-code/issues/65961)
- **要点**：用户反复要求不写注释，但模型仍默认生成大量冗余注释，指令遵守能力受到广泛质疑。
- **价值**：当前社区关注度最高的 Issue，反映模型行为控制的核心痛点。

### 2. [BUG] Linux 2.1.282 输入框停止接收按键，0-90 秒必现
**#96931** | 👍 0 | 💬 11 | [链接](https://github.com/anthropics/claude-code/issues/96931)
- **要点**：2.1.282 每次会话开始后 0-90 秒内键盘输入完全失效，Ctrl-C 无效，2.1.281 正常。属于严重回归。
- **价值**：直接影响 Linux 用户日常可用性，社区反馈急切。

### 3. [BUG] GitHub connector 显示已连接但 Cowork 中无工具可用
**#61682** | 👍 25 | 💬 33 | [链接](https://github.com/anthropics/claude-code/issues/61682)
- **要点**：Windows 11 上 app v1.8555.2.0 的 GitHub 连接器状态为“已连接”，但 Cowork 界面不暴露任何工具。
- **价值**：连接器可靠性问题长期未解，影响面广，评论区讨论热烈。

### 4. Opus 5.5：严重范围蔓延和任务聚焦回归
**#97117** | 👍 0 | 💬 4 | [链接](https://github.com/anthropics/claude-code/issues/97117)
- **要点**：从 Opus 4.6 切换到 5.5 后，同一项目出现明显范围蔓延、丢失任务焦点，被迫回退到 4.6。
- **价值**：新模型质量回归的典型报告，对模型选型有重要参考意义。

### 5. [BUG] SSH 远程把本地插件路径和 MCP 配置传给远程服务器导致挂起
**#25664** | 👍 1 | 💬 9 | [链接](https://github.com/anthropics/claude-code/issues/25664)
- **要点**：SSH 远程时，本地 macOS 插件路径与 MCP 配置被错误传递给远端 `ccd-cli`，路径不存在导致无限挂起。
- **价值**：远程开发核心路径的配置隔离问题，影响远程协作体验。

### 6. [BUG] PowerShell 工具无权限提示执行破坏性命令，且无事件记录
**#69397** | 👍 0 | 💬 3 | [链接](https://github.com/anthropics/claude-code/issues/69397)
- **要点**：PowerShell 工具执行了破坏性命令，未弹出权限确认，转录中也没有任何事件记录。
- **价值**：严重安全缺陷，直接触及权限系统的可信度底线。

### 7. [BUG] `self-hosted-runner` 与 `plugin eval` 启动进程缺少 `CLAUDE_CODE_PROCESS_WRAPPER`
**#97538** | 👍 0 | 💬 1 | [链接](https://github.com/anthropics/claude-code/issues/97538)
- **要点**：新提交的 Issue（9-26），指出这两类子进程未继承安全包装器，可能绕过企业安全策略。
- **价值**：最新的安全问题报告，涉及自托管环境的安全边界。

### 8. 工作流 verify 阶段超出规模指引 20 倍，无确认或成本预览
**#89865** | 👍 0 | 💬 1 | [链接](https://github.com/anthropics/claude-code/issues/89865)
- **要点**：一次 `fleet-sweep` 工作流单次运行启动 355 个 Opus 5 agent，总计 724 次 Opus 启动，超出规模指引且无成本确认。
- **价值**：成本失控的真实案例，暴露 agent fan-out 缺乏预算保护机制。

### 9. [BUG] macOS 桌面版 computer:// 文件链接渲染为纯文本
**#97255** | 👍 0 | 💬 1 | [链接](https://github.com/anthropics/claude-code/issues/97255)
- **要点**：桌面版 2.9939.2 中，chat 记录里的 `computer://` 链接变成纯文本或约 1 秒后失活，无法从转录打开 Finder。
- **价值**：桌面 UI 回归，打断从会话直达文件的交互路径。

### 10. [BUG] Artifact“版本历史”从查看器菜单移除，历史版本不可达
**#96718** | 👍 3 | 💬 4 | [链接](https://github.com/anthropics/claude-code/issues/96718)
- **要点**：Claude Code、Cowork 与 claude.ai 三端的 artifact 版本历史入口均被移除（关联 #95442），已保存版本无法访问。
- **价值**：跨端功能回退，对依赖 artifact 迭代的用户影响明显。

---

## 重要 PR 进展

过去 24 小时仅 1 条活跃 PR：

### #97334 sec-default: the rows a conversation keeps continue past the user tier
**@poteat** | [链接](https://github.com/anthropics/claude-code/pull/97334)
- **内容**：调整对话保留行数的安全默认值，使会话延续行为不再受用户层级上限的隐含约束。
- **说明**：该 PR 依赖引擎侧 `session.append` 事件（合入顺序有严格要求），`test` 检查在当前 CLI 未携带该事件时预期为红。属于基础设施级安全默认值调整，与近期多起“会话行为异常”类问题可能相关。

---

## 功能需求趋势

从全部 Issues 中提炼的社区主要关注方向：

1. **模型行为可控性**
   - 要求遵守“不写注释”等显式指令（#65961）
   - 要求模型保持任务聚焦、避免范围蔓延（#97117）
   - 要求 usage-limit 警告准确指向实际消耗的模型（#93046）

2. **权限系统安全与透明**
   - 权限弹窗不应窃取焦点或吞掉输入（#75360）
   - 工具执行必须经过审批并有记录（#69397、#75330）
   - 子进程应继承安全包装器（#97538）

3. **成本可见性与保护**
   - agent 大规模 fan-out 前应确认并预览成本（#89865）
   - 工作流规模指引需要更严格的执行机制

4. **远程与多机协作**
   - SSH 远程会话不应传递本地路径配置（#25664）
   - 本地/远程插件和 MCP 配置需要隔离或正确映射

5. **连接器与 Git 集成可靠性**
   - GitHub connector “假连接”问题（#61682）
   - 跨仓库搜索与访问权限配置问题（#96396、#96369）

6. **跨平台回归修复**
   - Linux TUI 输入卡死（#96931）
   - Windows 安装失败、diff 预览 CRLF 失败（#75485、#88114）
   - macOS 桌面 `computer://` 链接失效（#97255）

---

## 开发者关注点

- **升级恐惧症**：2.1.282 的输入框回归（#96931）与 Opus 5.5 的范围蔓延（#97117）均发生在升级后，社区对“升级即引入新问题”的容忍度正在下降。
- **安全底线**：PowerShell 无确认执行破坏性命令（#69397）、权限弹窗吞输入（#75360）被反复提及，开发者呼吁权限系统默认“保守并留痕”。
- **成本失控**：355 个 agent 单次启动的案例（#89865）引发对 workflow fan-out 机制的质疑，开发者希望有硬性预算门槛。
- **配置隔离需求**：SSH 远程挂起（#25664）与插件孤儿问题（#97095）说明本地/远端、账号/实例之间的配置边界需要更清晰的设计。
- **模型“话痨”问题**：#65961 的高赞数证明，“少写注释、少废话”已成为开发者对代码生成模型的最基础期待，而当前表现未达预期。

---
*数据来源：github.com/anthropics/claude-code · 统计时间：2026-09-27*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 — 2026-09-27

## 今日速览

昨日认证服务异常（401 Unauthorized）仍是社区焦点，多个关联 Issue 持续发酵，并出现 VS Code 扩展端间歇性 401 的新报告；同时 Windows 26.924 版本更新引发多起启动卡死、黑屏/闪烁等回归问题。值得关注的是，一批针对 Windows 子进程控制台闪烁、TUI 复制/渲染体验、macOS TLS 沙箱放行的 PR 已合并，预期将缓解近期高频痛点。

---

## 版本发布

过去 24 小时共发布 6 个版本，均为 Rust CLI 的 alpha/patch 迭代：

- **rust-v0.159.0-alpha.6 / alpha.5 / alpha.4**：连续三个 0.159.0 预发布版本，暂无详细变更说明。
- **rust-v0.158.0-alpha.2.1 / alpha.15.1**：0.158.0 分支的小版本修正。
- **rust-v0.157.1**：本版本发布说明显示自动生成失败（PR 索引为空，GitHub tag 比较返回 404），变更内容需查看 [Full Changelog](https://github.com/openai/codex/compare/rust-v0.157.0...rust-v0.157.1)。

---

## 社区热点 Issues

### 1. 大规模 401 Unauthorized 认证故障
- **#48237** [bug, auth] · 评论 96 · 👍 104  
  [链接](https://github.com/openai/codex/issues/48237)  
  用户报告 API key 被拒（`sk-svcac...`），平台返回 401。该 Issue 已成为社区中心，大量用户在评论区确认遇到相同问题。9 月 26 日官方声称已缓解，但今日仍有多起后续报告。

### 2. Windows 终端窗口高频闪烁
- **#48074** [bug, windows-os, CLI] · 评论 28 · 👍 47  
  [链接](https://github.com/openai/codex/issues/48074)  
  安装 Codex daemon 后，Windows 11 上每次请求期间终端窗口反复闪烁。0.157.1 发布后仍有新增报告（#48540），说明修复尚未覆盖全部场景。

### 3. Linux 桌面版更新后无限挂起
- **#48189** [bug, app, Linux] · 评论 14 · 👍 27  
  [链接](https://github.com/openai/codex/issues/48189)  
  Codex Desktop 26.924.20706 在 Linux Mint 上 "Starting your task" 永久挂起，回滚至 26.917.71314 即恢复正常。

### 4. Windows 完全无法启动
- **#48016** [bug, windows-os, CLI] · 评论 29 · 👍 17 · 已关闭  
  [链接](https://github.com/openai/codex/issues/48016)  
  codex-cli 0.157.0 在 Windows 上无法启动。虽然已关闭，但评论数量说明此问题在用户群中影响不小。

### 5. macOS 沙箱启动失败：TIOCSTI 未绑定变量
- **#45119** [bug, sandbox, macOS] · 评论 30  
  [链接](https://github.com/openai/codex/issues/45119)  
  macOS 14.2 上沙箱启动报 `unbound variable TIOCSTI`，且 main 分支同样存在此问题。属于长期未解决的 macOS 兼容性 Bug。

### 6. Linux 沙箱拒绝 snapd 的合法 nsfs 挂载
- **#46110** [bug, sandbox, Linux] · 评论 19 · 👍 6  
  [链接](https://github.com/openai/codex/issues/46110)  
  原生 Ubuntu 上 snapd 生成的合法 `nsfs` 挂载项被沙箱判为 `mountinfo path is not absolute`，导致任何文件系统受限命令无法执行。

### 7. Windows app-server 为每个 hook 弹出控制台窗口
- **#44768** [bug, windows-os, hooks] · 评论 11 · 👍 3  
  [链接](https://github.com/openai/codex/issues/44768)  
  共享 app-server daemon 启动后，每次执行 hook 或 shell 命令都会弹出一个可见的控制台窗口，严重影响使用体验。

### 8. GPT-6 Sol 任务耗时 40+ 分钟
- **#47656** [bug, performance] · 评论 4 · 👍 3  
  [链接](https://github.com/openai/codex/issues/47656)  
  Windows 上 GPT-6 Sol 任务出现严重性能回退，单个任务耗时超过 40 分钟，社区对模型性能稳定性的关注度上升。

### 9. macOS 基础快捷键被破坏：Cmd+C 失效
- **#48415** [bug, TUI] · 评论 3  
  [链接](https://github.com/openai/codex/issues/48415)  
  0.157.1 中 Cmd+C 无法用于复制（Ctrl+C 正常）。另有 [#48122](https://github.com/openai/codex/issues/48122)（👍 7）报告相同问题，说明 TUI 快捷键回归影响面较大。

### 10. Windows 沙箱刷新失败：helper_sandbox_lock_failed
- **#36475** [bug, windows-os, sandbox] · 评论 14  
  [链接](https://github.com/openai/codex/issues/36475)  
  老问题（8 月报告）昨日仍有更新：sandbox 刷新时 `SetNamedSecurityInfoW(ERROR_ACCESS_DENIED)`，导致 `.sandbox-bin` 锁冲突。Windows 沙箱机制的稳定性持续受到质疑。

---

## 重要 PR 进展

### 1. 允许 exec-server 代理私有 IP 到上游代理
- **#48568** · [链接](https://github.com/openai/codex/pull/48568)  
  新增 `--proxy-private-ips-via-upstream` 参数，使私有 IP 目标也能走继承的上游 VPN 代理，解决 VPN 场景下私有网络不可达的问题。

### 2. macOS Seatbelt 网络配置放行 TLS 信任评估
- **#48565** · [链接](https://github.com/openai/codex/pull/48565)  
  系统 libcurl 需要访问 `com.apple.TrustEvaluationAgent` 服务，此前 Seatbelt 网络配置文件未放行 mach-lookup，此 PR 修复了 macOS 上启用网络时的 TLS 评估失败。

### 3. 修复本地 app-server 的 ChatGPT 浏览器登录
- **#48502** · [链接](https://github.com/openai/codex/pull/48502)  
  本地 daemon 使用远程请求句柄导致 TUI 跳过了浏览器打开；同时修复登录完成事件早于 TUI 记录登录状态导致的竞态。

### 4. 转向时保留 WebSocket 连续连接
- **#48508** · [链接](https://github.com/openai/codex/pull/48508)  
  此前 steering 一个活动 WebSocket 响应会断开连接并重发完整历史，现在改为排空响应并携带 `previous_response_id` 继续，省流量且更稳定。

### 5. Windows 子进程默认禁止分配控制台窗口
- **#48483** · [链接](https://github.com/openai/codex/pull/48483)  
  为 `codex-rs/utils/pty` 的子命令默认设置 `CREATE_NO_WINDOW`，直接针对 #44768、#48074 等控制台闪烁问题。

### 6. 受限 Windows 启动器下回退嵌入式模式
- **#48491** · [链接](https://github.com/openai/codex/pull/48491)  
  `cargo run` 等启动器不允许后台进程存活时，自动回退到嵌入式模式，避免 daemon 启动失败导致 CLI 无法打开。

### 7. 复制 TUI 响应时保留 Markdown 表格与空白
- **#48549** · [链接](https://github.com/openai/codex/pull/48549)  
  修复复制表格时变成代码块、去除尾随空白破坏 Markdown 硬换行和代码内空格的问题。

### 8. 修复 TUI 数学渲染边界情况
- **#48551** · [链接](https://github.com/openai/codex/pull/48551)  
  行内 `$0$` 正确识别渲染；`\bigwedge`、`\bigl`、`\bigr` 不再回退为原始 LaTeX。

### 9. 稳定技能目录跨执行器变化
- **#48353** · [链接](https://github.com/openai/codex/pull/48353)  
  将云技能元数据预算上限设为 3/4，执行器重连时不再重复渲染未变化的目录，减少预算耗尽和目录抖动。

### 10. TUI 统一无边框会话头
- **#48562** · [链接](https://github.com/openai/codex/pull/48562)  
  所有会话头（resume、fork、清屏流程）统一采用紧凑型标题+版本+目录布局，移除盒式模型行，保留可选问候语和 YOLO 权限指示器。

---

## 功能需求趋势

1. **认证与账户可靠性**：401 Unauthorized 波及 CLI、Desktop、VS Code 扩展多个入口，Remote 在账号切换后失效，社区对“认证状态可诊断、可恢复”的需求极为迫切。
2. **Windows 平台成熟度**：启动崩溃、终端闪烁、沙箱权限、控制台窗口、长路径（CODEX_HOME）等问题大量堆积，Windows 已是当前最大的稳定性短板。
3. **终端/TUI 交互体验**：快捷键回归（Cmd+C）、复制 Markdown 结构与表格、数学公式渲染、欢迎界面、提示稳定性等细节，说明开发者对 TUI 作为日常工具的完成度要求正在提高。
4. **沙箱兼容性**：macOS TIOCSTI、Linux snapd nsfs、Windows ACL/锁冲突，多平台下沙箱与宿主环境（snapd、安全软件、ICC 色彩配置）的集成能力待加强。
5. **性能可观测性**：GPT-6 Sol 任务耗时异常引发担忧，开发者希望 Codex 提供更多任务级性能诊断和耗时归因信息。
6. **显式功能请求**：[#39406](https://github.com/openai/codex/issues/39406) 要求 `codex exec --json` 暴露 provider 上报的模型 ID，便于自动化工具记录实际使用模型。

---

## 开发者关注点

- **401 认证问题仍是最大痛点**：#48237 单 Issue 评论已达 96 条，且 9 月 26 日官方声称缓解后，仍有 #48545、#48570、#48571 等新报告不断出现，开发者对认证服务稳定性信心不足。
- **Windows 26.924 版本疑似引入批量回归**：#48189（Linux 挂起）、#48466（冷启动卡 Loading）、#48557/#48556/#48558（黑窗/加载失败）等多起 Issue 均指向新版本，开发者呼吁加快修复或提供回滚通道。
- **终端窗口闪烁问题高频复现**：#48074（0.157.0）、#48540（0.157.1）相隔一天先后报告，尽管 #48483 已合入，但尚未进入正式版本，用户仍受影响。
- **基础快捷键破坏引发不满**：macOS 下 Cmd+C 无法复制（#48415、#48122）被认为是“不可接受的基础体验回归”，社区期待快速修复。
- **沙箱兼容性成为多平台共性问题**：从 macOS 到 Linux 再到 Windows，沙箱与宿主系统的交互冲突反复出现，开发者希望 Codex 提供更清晰的沙箱故障诊断和更宽松的绕行选项。
- **功能请求关注“可编程性”**：开发者希望 Codex 输出更结构化（如暴露模型 ID）、行为更可预期（如 Full Access 审批提示），以便更好地集成进自动化工作流。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-09-27）

## 一、今日速览

- 发布 `v0.63.0-nightly.20260926`，修复 `diff.external` 的无效覆盖问题。
- 社区聚焦两大 P1 Bug：Subagent 在 `MAX_TURNS` 后误报“成功”隐藏中断（#22323），以及 Generalist agent 无响应挂起（#21409）。
- PR 侧重点转向稳定性：多个 PR 修复终端滚动、状态持久化、MCP 超时、命令注入与上下文污染问题。

## 二、版本发布

### v0.63.0-nightly.20260926.g2fe7c2d3f
- 发布链接：[Release v0.63.0-nightly.20260926.g2fe7c2d3f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.63.0-nightly.20260926.g2fe7c2d3f)
- 更新内容：
  - `fix(core): remove invalid diff.external override` by @urielefrenvirtusa in [#29467](https://github.com/google-gemini/gemini-cli/pull/29467)
  - `chore(release): bump version to 0.63.0-nightly.20260923.gf50ba8608` by @gemini-cli-robot in [#29471](https://github.com/google-gemini/gemini-cli/pull/29471)

## 三、社区热点 Issues（10 个）

1. **[#22323] Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption**  
   - 状态：OPEN | P1 | 评论 13 | 👍 2  
   - 摘要：`codebase_investigator` 子代理在达到最大轮次后，自己的结果明明显示中断，却仍向主会话报告 `success` / `GOAL`，导致用户误以为任务完成。  
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22323

2. **[#21409] Generalist agent hangs**  
   - 状态：OPEN | P1 | 评论 8 | 👍 8  
   - 摘要：`gemini-cli` 一旦交给 Generalist agent 处理简单操作（如创建文件夹）就会永久挂起，用户等待一小时后只能取消；提示模型不要使用 subagent 可绕过。  
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21409

3. **[#19873] Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing**  
   - 状态：OPEN | P2 | 评论 9 | 👍 1  
   - 摘要：提议利用 Gemini 3 原生 bash 能力，通过零依赖 OS 沙箱在保证安全的情况下允许模型直接执行 POSIX 工具链，减少工具调用摩擦。  
   - 链接：https://github.com/google-gemini/gemini-cli/issues/19873

4. **[#22745] Assess the impact of AST-aware file reads, search, and mapping**  
   - 状态：OPEN | P2 | 评论 7 | 👍 1  
   - 摘要：EPIC 追踪 AST 感知的文件读取/搜索/代码库映射是否能降低 token 噪音、减少读取轮次，并提升代码库导航精度。  
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22745

5. **[#21968] Gemini does not use skills and sub-agents enough**  
   - 状态：OPEN | P2 | 评论 6 | 👍 0  
   - 摘要：用户反馈 Gemini 几乎不会主动调用自定义 skills 和 sub-agents，即使有 `gradle`、`git` 等描述明确的技能，也必须显式指示才会使用。  
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21968

6. **[#26525] Add deterministic redaction and reduce Auto Memory logging**  
   - 状态：OPEN | P2（area/security）| 评论 5 | 👍 0  
   - 摘要：Auto Memory 会在脱敏前将本地 transcript 内容发送到后台提取模型，存在敏感信息泄露风险；日志也可能记录技能文件内容。  
   - 链接：https://github.com/google-gemini/gemini-cli/issues/26525

7. **[#22267] Browser Agent ignores settings.json overrides (e.g., maxTurns)**  
   - 状态：OPEN | P2 | 评论 4 | 👍 0  
   - 摘要：AgentRegistry 虽然正确读取并合并了全局/项目级 `settings.json`，但 Browser Agent 运行时完全忽略这些覆盖项，`maxTurns` 等配置不生效。  
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22267

8. **[#21983] browser subagent fails in wayland**  
   - 状态：OPEN | P1 | 评论 4 | 👍 1  
   - 摘要：在 Wayland 环境下 Browser subagent 直接失败，`Termination Reason: GOAL`，没有有效操作输出。  
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21983

9. **[#20079] ~/.gemini/agents/filename.md is not recognized as an agent if filename.md is a symlink**  
   - 状态：OPEN | P2 | 评论 4 | 👍 0  
   - 摘要：自定义 agent 文件是 symlink 时无法被识别，导致用户不能在 agents 目录中使用符号链接管理配置。  
   - 链接：https://github.com/google-gemini/gemini-cli/issues/20079

10. **[#26522] Stop Auto Memory from retrying low-signal sessions indefinitely**  
    - 状态：OPEN | P2 | 评论 4 | 👍 0  
    - 摘要：Auto Memory 只将“成功读取”的会话标记为已处理；低信号会话会被后台提取器反复扫描和重试，浪费资源。  
    - 链接：https://github.com/google-gemini/gemini-cli/issues/26522

## 四、重要 PR 进展（10 个）

1. **[#29520] fix(cli): preserve scroll position and partition pending height budget**  
   - 状态：OPEN | priority/p1, p2 | size/l  
   - 摘要：修复流式输出、工具确认期间终端滚动位置被重置的问题，并合理分配挂起高度预算，提升长会话浏览体验。  
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29520

2. **[#29451] fix(core): bound tool output size and optimize memory lifecycle in long-running agent loops**  
   - 状态：CLOSED | priority/p1 | size/l/xl  
   - 摘要：限制工具执行输出大小，优化多轮 agent 循环中的内存生命周期，避免长时间构建/测试任务中内存无限增长。  
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29451

3. **[#29398] fix(mcp): bound initial tool discovery to a short timeout**  
   - 状态：OPEN | priority/p1 | size/m  
   - 摘要：当 MCP 服务器声明 `tools` 能力但 `tools/list` 响应 id 不匹配时，SDK 会等待完整默认超时（10 分钟）；本次 PR 为初始工具发现设置短超时，避免长时间卡死。Closes #28355。  
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29398

4. **[#29397] fix(agent): prevent session context poisoning and infinite loops on interrupted turns**  
   - 状态：OPEN | priority/p2 | size/xl  
   - 摘要：中断的 agent 流会在会话中注入“previous response was interrupted”合成消息，导致上下文污染和无限循环；PR 修复该注入逻辑。  
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29397

5. **[#29400] Fix/29365 duplicate tool responses**  
   - 状态：OPEN | priority/p1 | size/m  
   - 摘要：修复使用 `-r` 恢复会话时，工具结果同时存在 `toolCalls[].result` 和 durable user 消息，导致 `functionResponse` 重复回放的问题。  
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29400

6. **[#29402] fix(cli): make persistent state writes failure-safe**  
   - 状态：OPEN | priority/p1 | size/m/l  
   - 摘要：`PersistentState` 现在通过唯一临时文件 + `fsync` + 原子重命名写入，避免中断导致 `state.json` 变成截断 JSON，防止 CLI 状态被静默清空。  
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29402

7. **[#29510] fix(editor): harden Windows subprocess argument quoting and prevent command injection on Windows**  
   - 状态：OPEN | size/m  
   - 摘要：为 Windows 上 `shell: true` 的子进程调用新增健壮参数引用（`quoteCmdArg`），修复文件路径/参数导致的命令注入风险。  
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29510

8. **[#29459] fix(cli): propagate cancellation into shell command injections**  
   - 状态：OPEN | priority/p1 | size/m  
   - 摘要：`!{...}` shell 注入使用全新 `AbortController` 导致调用方取消无法传递；PR 将取消信号传递给子进程，并设置预算，避免挂死命令无法终止。  
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29459

9. **[#29387] fix(cli): don't let one malformed extension directory fail all extension loading**  
   - 状态：OPEN | area/extensions | size/m  
   - 摘要：修复 `_buildExtension()` 在 security 校验阶段提前抛错、绕过 try/catch 的问题，确保单个损坏扩展目录不会导致全部扩展加载失败。  
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29387

10. **[#29399] fix(core): preserve unrelated comments during edits**  
    - 状态：OPEN | priority/p2 | size/m  
    - 摘要：加强 replace 工具契约，要求保留无关注释和代码；引导模型做最小化、独立的编辑，避免重写大段无关区块，并添加对应的行为回归评测。  
    - 链接：https://github.com/google-gemini/gemini-cli/pull/29399

## 五、功能需求趋势

从近期 Issues 看，社区最关注的方向集中在：

- **Agent 自主性与可靠性**：希望 Gemini 更聪明地使用 skills/sub-agents、正确处理中断恢复，而不是误报成功或无限挂起。
- **上下文与内存管理**：AST-aware 文件读取、Tactful Extraction、上下文压缩线性化等，都是为了降低 token 消耗和会话膨胀。
- **隐私与安全**：Auto Memory 的确定性脱敏、OS 沙箱、Windows 命令注入防护，说明开发者对敏感信息和执行安全日益重视。
- **终端体验与跨平台**：Wayland 兼容、resize 无闪烁、滚动位置保持、Windows 参数引用等，都是提升日常使用体验的关键。
- **可配置性与扩展健壮性**：`settings.json` 对子代理真正生效、支持 symlink agent、per-workspace 策略、单个扩展损坏不影响全局加载等。

## 六、开发者关注点

- **高频痛点**：
  - Subagent 在 `MAX_TURNS` 后仍显示成功，用户无法感知任务实际被中断。
  - Generalist agent 无故挂死，简单操作也需等待数十分钟，只能靠禁用 subagent 规避。
  - Browser agent 在 Wayland 下不可用，且忽略全局配置覆盖。
  - 模型几乎不主动使用自定义 skills/sub-agents，定制能力形同虚设。
  - Auto Memory 在内容脱敏前就将其发送给模型，隐私保护存在缺口。
  - 大文件读取导致上下文暴涨，需要更精准的代码读取和搜索策略。
  - 会话恢复时重复工具响应、状态文件损坏，影响长时间工作的连续性。
  - MCP 工具发现异常时可能阻塞长达 10 分钟，响应太慢。
  - 终端滚动/resize 体验不稳定，影响审查历史输出。

- **社区期待改进的方向**：更稳定的子代理生命周期、更安全的自动记忆、更透明的上下文管理、更好的跨平台兼容性。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-27

## 今日速览

今日发布稳定版 v1.39.1，集中修复桌面端与 CLI 的稳定性问题，包括会话丢失、Windows 窗口无法打开、旧会话导入及记忆安全等。社区方面，多个长期悬而未决的编码问题（GBK/UTF-8 乱码、edit_file 误写）获得对应 PR 修复，同时用户对 AUTOPILOT 长时间无人值守模式、多会话并行执行等新能力的呼声明显上升。

## 版本发布

### v1.39.1（稳定版）
- **Reasonix CLI v1.39.1** / **Reasonix Desktop v1.39.1**
- 主要更新：桌面端与 CLI 的稳定性修复——更新后会话“消失”、Windows 窗口打不开、旧会话导入、钩子覆盖所有工具调用处，以及记忆安全。
- 发布渠道：稳定版
- 链接：[CLI 更新日志](https://reasonix.io/changelog/v1.39.1/?lang=en) · [网页版完整更新日志](https://reasonix.io/changelog/v1.39.1/)

## 社区热点 Issues

1. **[Bug]: [Critical] Infinite recovery loop and UI freeze caused by JSON truncation (GBK/UTF-8 encoding mismatch during Bash tool call)**  
   #8213 | 已关闭 | 评论 4  
   Windows 下 bash 工具输出 GBK 编码导致 JSON 截断，引发无限恢复循环和 UI 冻结。今日 PR #10918 直接修复了该问题。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/8213)

2. **[Bug]: edit_file 工具小概率写入错误**  
   #6488 | 已关闭 | 评论 3  
   字节级编码损坏，多处 UTF-8 续字节被错误替换为 `?`。PR #10892、#10948 分别针对根因和截断场景修复。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/6488)

3. **[Bug]: 历史搜索搜不到工具输出（默认索引排除 tool_output，UI 无开关）**  
   #9675 | 已关闭 | 评论 2  
   桌面端历史面板只能搜索会话标题，无法检索工具输出内容。PR #10938 已修复。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/9675)

4. **[Bug]: 通知弹窗反复出现**  
   #9156 | 已关闭 | 评论 2  
   待处理审批/提问在通知开启时反复弹出。PR #10934 与 #10942 双管齐下修复。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/9156)

5. **[bug]: STEP 官方模型下因无法获取 token/usage 信息，导致上下文长度不显示、吞吐失效、压缩失败并最终超出窗口**  
   #9129 | 已关闭 | 评论 2  
   StepFun 模型缺失 token 统计，导致压缩失效并溢出上下文。PR #10930 为预设补充 262144 上下文窗口。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/9129)

6. **[Feature]: 增加适合 24h 长时间无人值守任务的 AUTOPILOT 模式**  
   #10051 | 开放 | 评论 2 | 👍 1  
   用户希望 Agent 能在长时间任务中自动继续、处理暂停条件，实现真正无人值守。社区中热度较高的新需求。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10051)

7. **[Bug]: MCP 安装 MySQL 服务器报错，stderr 为不可读乱码**  
   #7857 | 已关闭 | 评论 1  
   Windows 上 MCP 服务器命令不在 PATH 时显示乱码，用户无法定位原因。PR #10911/#10912 修复 stderr 解码。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/7857)

8. **[Feature]: Expose an explicit Goal resume operation over ACP**  
   #10201 | 已关闭 | 评论 1  
   希望 ACP 协议能显式恢复已有 Goal 会话，避免每次重新创建。PR #10943 已实现。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10201)

9. **[Bug]: 新建自定义供应商，会把官方的 key 覆盖**  
   #9178 | 已关闭 | 评论 1  
   自定义供应商命名冲突时可能覆盖官方凭据。PR #10932 修复 key 槽位分配。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/9178)

10. **[Feature]: 当在一个被 git 管理的目录下运行 reasonix 时，能自动把 .reasonix 加入到 .gitignore**  
    #10114 | 已关闭 | 评论 1  
    希望自动忽略 `.reasonix` 目录，避免手动添加。PR #10941 已完成。  
    [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10114)

## 重要 PR 进展

1. **fix(shellrun): read a command's output in the code page it was written in**  
   #10918 | 已合并  
   修复 Windows 中文环境下 bash 工具输出 GBK 乱码的问题，直接解决 #8213。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10918)

2. **fix(encoding): read uncut UTF-8 that ends in half a character as UTF-8**  
   #10948 | 已合并  
   处理未截断但结束于 UTF-8 半字符的输出，避免被误判为 GB18030，参考 #6488。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10948)

3. **fix(desktop): history content search finds tool output**  
   #10938 | 已合并  
   历史面板搜索现在可命中工具输出内容，补齐全文检索缺口。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10938)

4. **fix(notify): do not announce a replayed approval or question again**  
   #10934 | 已合并  
   禁止重放待处理审批时重复发送系统通知，修复 #9156 的外部表现。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10934)

5. **fix(desktop): push a replayed approval or question to bot watchers once**  
   #10942 | 已合并  
   确保通过 IM bot 桥接监看桌面会话时，审批/提问只推送一次。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10942)

6. **feat(acp,serve): expose explicit Goal pause and resume**  
   #10943 | 已合并  
   为 ACP 客户端增加 Goal 暂停/恢复操作，解决 #10201。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10943)

7. **fix(workspace): keep host-written .reasonix state out of git status**  
   #10941 | 已合并  
   将 `.reasonix/attachments` 和 `.reasonix/tasks` 自动加入忽略列表，不必手动改 .gitignore。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10941)

8. **fix(encoding): a file is GB18030 only if a write can restore its bytes**  
   #10892 | 已合并  
   修复 `edit_file` 将 UTF-8 文件误判为 GB18030 导致字节被改写的问题，根治 #6488。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10892)

9. **fix(config): StepFun presets declare their 262144-token context window**  
   #10930 | 已合并  
   给 StepFun 预设补充上下文窗口声明，修复 #9129 中无法显示/压缩的缺陷。  
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10930)

10. **fix(serve): give a new provider a key slot nothing else holds**  
    #10932 | 已合并  
    调整自定义供应商 key 槽位分配，避免覆盖官方或其他供应商的凭据，修复 #9178。  
    [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10932)

## 功能需求趋势

- **Windows 平台稳定性与编码适配**：大量 issue 集中在 GBK/UTF-8 编码误判、乱码输出、窗口闪退还停留在“解决中”。社区对中文 Windows 环境的支持需求迫切。
- **Agent 自主性与无人值守**：AUTOPILOT 模式（#10051）、并发多会话执行（#10191）等需求显示用户希望 Agent 能长时间平稳运行，减少人工干预。
- **MCP 生态完善**：MCP 服务器安装、状态监控（#9904）、健康通知等成为高频话题，用户期待更透明的 MCP 管理能力。
- **桌面端体验优化**：历史内容搜索、Markdown 文件自动刷新（#9780）、窗口空白恢复（#10319）等 UI/UX 问题被反复提及。
- **配置安全与易用性**：自动 .gitignore、防止 key 覆盖、权限规则校验（#10949）等需求说明用户对配置过程的防御性设计有明确期待。

## 开发者关注点

- **编码乱码是最常见痛**：无论是 bash 输出、MCP stderr 还是 edit_file 写入，开发者频繁遭遇中文乱码与字节损坏，相关 PR 获得了积极反馈。
- **会话与窗口稳定性**：更新后会话消失、窗口打不开、空白窗口等严重影响工作流，用户期望桌面端有类似“刷新”的恢复手段。
- **通知与提醒过度打扰**：重复的审批弹窗、系统通知在长时间任务中成为干扰，社区希望有更智能的聚合推送。
- **权限规则易写错**：用户常将 `rm`、`git push` 等裸命令直接写入 `deny` 而无法匹配工具，说明文档引导和启动时校验仍不足。
- **供应商配置细节**：自定义供应商的 key 槽位冲突、不支持 balance 接口（如 OpenRouter）等问题，影响了多供应商用户的使用体验。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-09-27

## 今日速览

昨日 OpenCode 社区聚焦于 **v2 架构下的 Provider 兼容性与缓存策略问题**：DigitalOcean 模型无法命中 prompt cache（#51557）、GitLab Astra 子代理创建失败（#51464）、全部 Provider 在更新后断开连接（#51544）等新 Issue 密集涌现。与此同时，**npm 12 升级在 Windows 上遗留无效可执行文件**（#51553）也引发了广泛讨论，已有对应修复 PR。TUI 与桌面端则在持续推进细节修复，多个标记为 `automated-pr-cleanup` 的历史 PR 被批量关闭。

## 社区热点 Issues

以下 10 个 Issue 因影响范围广、社区讨论度高或触达核心架构问题，值得重点关注：

### 1. 恢复经典 UI（持久化左栏）作为选项 — #48882
- **作者**: @HRronaldo | 👍 32 | 💬 26 | 状态: OPEN
- **为什么重要**: 近期侧边栏重新设计（#20242）将经典的双栏布局改为新布局，社区对 UI 回归的诉求强烈，是目前讨论热度最高的 Issue。
- **链接**: https://github.com/anomalyco/opencode/issues/48882

### 2. 更新后所有 Provider 断开连接（HTTP 400/408）— #51544
- **作者**: @es1144t | 👍 0 | 💬 4 | 状态: CLOSED
- **为什么重要**: 更新到最新版后，官方、自定义及 Atria-Dawn-Preview 等所有 Provider 均出现连接失败，且 UI 报错"unavailable on this server"会**完全阻塞添加新 Provider**。属严重回归问题。
- **链接**: https://github.com/anomalyco/opencode/issues/51544

### 3. v2 路径下 chunkTimeout 和 timeout 被静默忽略 — #46692
- **作者**: @alandotcom | 👍 1 | 💬 4 | 状态: OPEN
- **为什么重要**: `packages/llm` 从不读取 config schema 中已声明并文档化的 `chunkTimeout`/`timeout`，导致 v2 原生 Provider 路径**完全没有客户端停滞保护**，且设置静默失效。
- **链接**: https://github.com/anomalyco/opencode/issues/46692

### 4. GitLab：Astra 新建子代理失败而 Opus 成功 — #51464
- **作者**: @pedropombeiro | 👍 0 | 💬 2 | 状态: OPEN
- **为什么重要**: `gitlab/duo-chat-gpt-6-astra` 模型在子代理委派时反复将父 session ID 当作 `subagent.sessionID`，暴露了 GitLab 模型路由的兼容性问题。
- **链接**: https://github.com/anomalyco/opencode/issues/51464

### 5. DigitalOcean 模型永不命中 prompt cache — #51557
- **作者**: @Xowap | 👍 0 | 💬 1 | 状态: OPEN
- **为什么重要**: v2 中 DigitalOcean 模型（Claude Fable 等）走 `openai-compatible` 路径，因不在 `RESPECTS_INLINE_HINTS` 白名单导致 **prompt cache 完全失效**，直接影响推理成本。已有关联修复 PR #51559。
- **链接**: https://github.com/anomalyco/opencode/issues/51557

### 6. 项目路径被普通文件占用导致启动 500（ENOTDIR）— #51560
- **作者**: @djbclark | 👍 0 | 💬 1 | 状态: OPEN
- **为什么重要**: 当 SQLite 中注册的项目 worktree 路径不再是目录时，**桌面 GUI 和 TUI 均无法启动**。对长期使用本地注册项目的用户是隐蔽的启动故障源。
- **链接**: https://github.com/anomalyco/opencode/issues/51560

### 7. `run --format json` 事件不包含模型信息 — #40544
- **作者**: @macurandb | 👍 0 | 💬 1 | 状态: OPEN
- **为什么重要**: 流式事件中的 `step_start`/`step_finish` 只有 token 和成本，缺少 model 字段，**无头消费者无法按模型归因用量**，影响自动化计费与监控场景。
- **链接**: https://github.com/anomalyco/opencode/issues/40544

### 8. npm 12 升级遗留 Windows 可执行文件 stub — #51553
- **作者**: @renatomoselli | 👍 0 | 💬 1 | 状态: OPEN
- **为什么重要**: `opencode upgrade` 在 npm 12 下报告成功但未运行 postinstall，导致 `bin/opencode.exe` 仍是文本 stub，**Windows 用户下次启动直接失败**。已有关联修复 PR #51554。
- **链接**: https://github.com/anomalyco/opencode/issues/51553

### 9. `/api/fs/read` 对 `~` 前缀路径返回 404 — #51561
- **作者**: @Tim-Shadow | 👍 0 | 💬 0 | 状态: OPEN（最后更新 09-27）
- **为什么重要**: 全局 `AGENTS.md` 已加载进模型上下文，但因 API 不展开 `~` 路径导致**上下文面板中不显示**。影响用户对全局指令的可见性与调试。
- **链接**: https://github.com/anomalyco/opencode/issues/51561

### 10. Home/End 键在输入框滚动消息列表而非移动光标 — #27661
- **作者**: @Mrqqeat | 👍 9 | 💬 7 | 状态: CLOSED
- **为什么重要**: 经典 TUI 编辑痛点：长消息编辑时 Home/End 被劫持为列表滚动。已由 PR #31489 修复并关闭，但该问题持续数月、关注度高，修复终于落地。
- **链接**: https://github.com/anomalyco/opencode/issues/27661

---

## 重要 PR 进展

以下 10 个 PR 值得关注，覆盖 Bug 修复与功能完善：

### 1. fix(ai): 支持 DigitalOcean 推理的 prompt 缓存 — #51559
- **作者**: @Xowap | 状态: OPEN | 关联: Closes #51557
- **内容**: 将 DigitalOcean 模型从 `openai-compatible` 调整为可识别 inline hints 的路径，使 **Claude Fable 等模型恢复 prompt cache 命中**。
- **链接**: https://github.com/anomalyco/opencode/pull/51559

### 2. fix(cli): 允许 npm upgrade 安装脚本 — #51554
- **作者**: @renatomoselli | 状态: OPEN | 关联: Fixes #51553
- **内容**: 修复 npm 12 下 `opencode upgrade` 不运行 postinstall 的问题，确保 Windows 下 `bin/opencode.exe` stub 被正确替换。
- **链接**: https://github.com/anomalyco/opencode/pull/51554

### 3. fix(core): 未决工具结果处理 — #51558
- **作者**: @ljluestc | 状态: OPEN | 关联: Closes #51117
- **内容**: 修复会话在工具调用中途结束时，工具状态残留 `pending`/`running` 的问题，避免恢复会话时状态不一致。
- **链接**: https://github.com/anomalyco/opencode/pull/51558

### 4. fix(tui): 点击其他标签时退出问题编辑模式 — #51356
- **作者**: @resonanceee | 状态: OPEN | 关联: Closes #47624
- **内容**: TUI 问题对话框中，鼠标点击其他标签页时未退出自定义答案编辑状态，现已修复。
- **链接**: https://github.com/anomalyco/opencode/pull/51356

### 5. fix(tui): 合并 message.part.delta 存储写入 — #48431
- **作者**: @dcerisano | 状态: OPEN | 关联: Closes #36043
- **内容**: 将流式消息的部分更新合并写，消除客户端流路径中的 O(n²) 复杂度，**解决长回复 UI 卡顿/冻结**。联合 markdown-live-relex PR 共同生效。
- **链接**: https://github.com/anomalyco/opencode/pull/48431

### 6. fix(opencode): 限制 apply_patch diff 元数据 — #51059
- **作者**: @cyrilialab-prog | 状态: OPEN | 关联: Closes #41733
- **内容**: `apply_patch` 将文件 diff 重复写入元数据两次（`metadata.diff` 与 `metadata.files[].patch`），此 PR 限制冗余元数据，降低存储与传输开销。
- **链接**: https://github.com/anomalyco/opencode/pull/51059

### 7. fix(core): 保持 OPENCODE_CONFIG_DIR 对全局 AGENTS.md 的叠加性 — #47468
- **作者**: @minutechreview | 状态: OPEN | 关联: Closes #28658, #32825
- **内容**: 修复 `OPENCODE_CONFIG_DIR` 本应叠加配置目录，却意外替换全局配置目录的问题，确保全局 AGENTS.md 仍然生效。
- **链接**: https://github.com/anomalyco/opencode/pull/47468

### 8. fix(tui): Home/End 键在 prompt 输入框中的行为 — #31489
- **作者**: @lichuang | 状态: CLOSED | 关联: Closes #27661
- **内容**: 为 prompt 文本框显式处理 Home/End 键导航到行首/行尾，不再触发消息列表滚动。
- **链接**: https://github.com/anomalyco/opencode/pull/31489

### 9. fix(app): 将 UI 字体应用于 prompt 输入框 — #45128
- **作者**: @feng-pip | 状态: CLOSED | 关联: Closes #44873
- **内容**: V2 的 prompt 编辑器与占位符未继承全局 UI 字体设置，现已在外观设置中正确应用 sans 字体变量。
- **链接**: https://github.com/anomalyco/opencode/pull/45128

### 10. fix(tui): 对话框打开时跳过问题拒绝 — #45306
- **作者**: @niho2 | 状态: CLOSED | 关联: Fixes #45304
- **内容**: 修复模型选择器/对话框打开时按 ESC 会同时拒绝后台 agent 问题的双重触发问题，保护对话中断。
- **链接**: https://github.com/anomalyco/opencode/pull/45306

---

## 功能需求趋势

从近期 Issue 与 PR 中可提炼出以下社区关注方向：

- **UI/UX 可配置性**：用户对强制 UI 重设计不满，要求保留经典布局作为选项（#48882），并持续反馈 TUI 细节问题（透明主题渲染 #51555、多击选择 #45298）。
- **Provider 生态兼容性**：v2 架构下大量 Provider 出现新问题——DigitalOcean 缓存失效（#51557）、GitLab Astra 兼容（#51464）、更新后全量断开（#51544），说明 v2 的 provider 路由与缓存策略需要加强回归测试。
- **配置项真正生效**：`timeout`、`chunkTimeout`（#46692）与 `~` 路径展开（#51561）等配置/API 行为"文档有、实现无"的问题，反映社区对配置可靠性的重视。
- **CLI/API 可观测性**：`run --format json` 缺少模型归属字段（#40544），开发者希望 headless 场景下能按模型统计成本与用量。
- **升级机制的健壮性**：npm 12 下的 Windows 升级失败（#51553）暴露了跨平台升级测试的薄弱环节。

## 开发者关注点

- **"静默失败"问题集中爆发**：从 `timeout` 被忽略、`~` 路径 404、到 grep 在无效路径上静默返回空集，开发者普遍对配置不生效、错误被吞的体验不满，期待更明确的告警或错误提示。
- **v2 迁移阵痛仍在继续**：多条 Provider 与缓存相关 Issue 均指向 v2 原生路径与旧版行为不一致，社区需要更清晰的迁移指南和兼容层。
- **Windows 平台体验需加强**：升级后 exe 损坏、路径处理等问题反复出现，Windows 用户希望 CI 覆盖升级与文件系统边界场景。
- **TUI 细节打磨受关注**：输入框按键行为、对话框焦点冲突、标签渲染等小问题被高频报告，说明 TUI 仍是日常重度使用入口，细节体验直接影响口碑。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-27

## 今日速览

过去 24 小时 Hermes 无新版本发布，社区重心集中在**插件系统能力扩展**与**数据完整性修复**两条主线上。@nekwo 连续提交了 8 个插件与嵌入能力增强 PR，覆盖工具集注册、命令拦截、调用成本透出等关键缺口；与此同时，一个 P1 级备份完整性问题（#124564）浮出水面——读取故障可能导致截断但 CRC 有效的 ZIP 成员混入自动备份，恢复时可能覆盖完整文件。另有多个新功能提案处于 `needs-decision` 状态，等待维护者定夺。

## 社区热点 Issues

过去 24 小时更新的 Issue 共 8 条，全部列出：

### 1. [P1] 完整备份在读取失败后可发布截断但 CRC 有效的 ZIP 成员
**#124564** · [查看](https://github.com/NousResearch/hermes-agent/issues/124564) · 作者：@0xble · 评论：0  
ZIP 成员打开后源读取失败，会留下截断但 CRC 通过校验的成员；归档仍可读，恢复时可能用截断数据覆盖完整文件。涉及 `sweeper:risk-compatibility`，当前 Issue 中优先级最高，建议尽快跟踪修复进度。

### 2. [Telegram] 顶级入站富文本消息被静默忽略
**#63485** · [查看](https://github.com/NousResearch/hermes-agent/issues/63485) · 作者：@codxt · 评论：6  
Telegram Bot API 10.1 下，用户发送的顶级富文本消息被 Hermes Telegram 网关静默丢弃。复现环境明确（python-telegram-bot 22.6、轮询模式、启用话题的私聊）。8 条 Issue 中评论最多，社区关注度高，带有 `sweeper:risk-message-delivery` 标签。

### 3. [Bug] tool-arg 修复按错误顺序追加闭合符且统计字符串内花括号
**#102311** · [查看](https://github.com/NousResearch/hermes-agent/issues/102311) · 作者：@soroush5 · 评论：1  
`_repair_tool_call_arguments()` 存在两个缺陷：闭合符追加顺序错误、未排除字符串字面量中的花括号，导致本可修复的截断 tool-call 参数被破坏成 `{}`，真实 payload 被静默丢弃。工具调用可靠性直接受影响。

### 4. [Feature] 有界公共链接元数据用于自动会话标题
**#124560** · [查看](https://github.com/NousResearch/hermes-agent/issues/124560) · 作者：@0xble · 评论：0  
当开场消息主要是无意义 URL 时，允许自动标题生成使用有界的公共页面元数据。提交者已在 fork 中实现为后台标题增强，等待上游决策。

### 5. [Feature] 网关按频道覆盖 busy_input_mode 与 Slack reply_in_thread
**#124561** · [查看](https://github.com/NousResearch/hermes-agent/issues/124561) · 作者：@jdudleyie · 评论：0  
当前忙时输入模式和 Slack 线程回复行为是全局开关，无法适配混合频道场景（如 `#general` 问答频道每个问题开独立线程，而任务频道需要平铺回复）。

### 6. [Bug] security-guidance 六条 JS/DOM 规则丢失源文件类型过滤
**#124562** · [查看](https://github.com/NousResearch/hermes-agent/issues/124562) · 作者：@0xble · 评论：0  
上游提交 `50873d2` 后，六条 JS/DOM 安全规则（如 `innerHTML_xss`、`document_write_xss`）丢失了 JavaScript 扩展名过滤，导致在 Markdown/Python 中补充文档也会误报代码安全告警。

### 7. [Feature] 显式端点并发能力用于辅助标题调度
**#124563** · [查看](https://github.com/NousResearch/hermes-agent/issues/124563) · 作者：@0xble · 评论：0  
当前辅助标题生成延迟到主回合结束是安全的默认值，但支持独立并发请求的端点不应被迫失去回合开始时的标题生成能力，建议增加显式并发能力宣告。

### 8. [Feature] 隔离的多账户 1Password vault 句柄与填充路由
**#124565** · [查看](https://github.com/NousResearch/hermes-agent/issues/124565) · 作者：@0xble · 评论：0  
单个 Hermes profile 内支持多个独立认证的 1Password vault 后端：每个账户拥有独立句柄、独立 service-account 凭据引用、以及支持时的浏览器身份绑定。

## 重要 PR 进展

以下为过去 24 小时内更新、值得关注的 10 个 PR：

### 1. feat: 面向 workers、delegation 与 MoA 的引导模型路由
**#124574** · [查看](https://github.com/NousResearch/hermes-agent/pull/124574) · 作者：@jhaynes  
为 Kanban workers、委托子任务与托管 MoA 队列引入可选的引导模型路由：确定性精确路由选择、不可变策略/决策回执、发送前路由/推理/预算校验，并通过既有恢复机制实现有界回退。

### 2. fix(compression): 压缩前校验覆盖的行代次
**#124573** · [查看](https://github.com/NousResearch/hermes-agent/pull/124573) · 作者：@JoaoMarcos44 · 修复 #123664  
`/branch` 之后子会话持有新 ID 的复制的转录行，但实时历史仍保留父会话的行 ID 戳；一旦分支写入自己的行，精确压缩覆盖变为可达，但代次不匹配。本 PR 在压缩前验证代次，避免错误覆盖。

### 3. feat(plugins): busy_policy 与 gateway_context 插件斜杠命令支持
**#123976** · [查看](https://github.com/NousResearch/hermes-agent/pull/123976) · 作者：@nekwo  
插件 `register_command` 现在可声明 busy 策略并在命令回调中获得 gateway 上下文，解决会话 agent 运行中 `/my-status` 类命令被当作普通文本排队的问题。

### 4. feat(plugins): PluginContext 注册复合 toolset
**#123979** · [查看](https://github.com/NousResearch/hermes-agent/pull/123979) · 作者：@nekwo  
`register_tool(toolset=...)` 只能把工具放进唯一 toolset；本 PR 新增 `register_toolset` 和 `add_to_toolset`，允许插件发布自己的复合工具集（命名工具 + 内建 bundle 引用），或把工具放入内建 bundle。

### 5. feat(plugins): persisted-row 与 MCP transform hooks、HERMES_HOME 透传
**#124210** · [查看](https://github.com/NousResearch/hermes-agent/pull/124210) · 作者：@nekwo  
补齐三个嵌入者缺口：会话 DB 行落库前投影 hook、复用当前用户消息的能力、stdio MCP 子进程继承 HERMES_HOME。带有 `sweeper:risk-session-state` 标签，需关注会话状态兼容性。

### 6. feat(local-runtime): 新增 executable_path、model_dirs 与 model_overrides 配置
**#124194** · [查看](https://github.com/NousResearch/hermes-agent/pull/124194) · 作者：@nekwo  
当前受管本地运行时只能服务 PM 引擎、只能加载 models_dir() 下 GGUF、只能用策略自带 preset。本 PR 开放可执行文件路径、模型目录与覆盖配置，增强本地模型部署灵活性。

### 7. feat(skills): writable extra_dirs 根目录与 excluded_dirs、POSIX 命名
**#124191** · [查看](https://github.com/NousResearch/hermes-agent/pull/124191) · 作者：@nekwo  
外部技能目录目前只读，且排除规则缺失；本 PR 新增 `skills.extra_dirs` 可写根与 `skills.excluded_dirs`，统一技能名称为 POSIX 风格，改善 Windows 兼容性。

### 8. fix(update): macOS 更新后 launchd 重启等待窗口调整
**#121117** · [查看](https://github.com/NousResearch/hermes-agent/pull/121117) · 作者：@0xble  
`hermes update` 在 macOS 上等待 launchd 报告新 PID，但 20 秒超时从重启请求时就开始计时，旧网关优雅关闭时间被计入。真实案例中繁忙网关（4 agents、1 cron job）多次超时。

### 9. fix(security-guidance): 恢复六个 JS/DOM 规则的 JS 扩展名过滤
**#124576** · [查看](https://github.com/NousResearch/hermes-agent/pull/124576) · 作者：@liuhao1024 · 关联 #124562  
`new_function_injection`、`react_dangerously_set_html`、`document_write_xss`、`innerHTML_xss`、`outerHTML_xss`、`insertAdjacentHTML_xss` 六条规则恢复 `path_filter`，消除非 JS 文件中的误报。

### 10. fix(desktop): 默认将 composer 锁定到 dock
**#122368** · [查看](https://github.com/NousResearch/hermes-agent/pull/122368) · 作者：@OutThisLife  
拖拽 grab ring 向上 16px 就会使 docked composer 意外浮起，误触率高。Appearance 设置中已有 Floating Composer 开关，本 PR 将默认行为改为锁定 dock，用户如需浮动可显式开启。

## 功能需求趋势

从近期 Issue 与 PR 可以提炼出以下社区关注方向：

- **插件系统深度扩展**：过去 24 小时内有 6+ 个 PR 直接增强插件 API（busy_policy、command_guard、register_toolset、per-call cost、persisted-row hooks），说明嵌入者/插件开发者是 Hermes 生态的重要群体，当前插件能力仍有关键缺口。
- **细粒度配置与多租户隔离**：per-channel 网关覆盖（#124561）、per-store home 覆盖（#124190）、多账户 1Password 隔离（#124565）——全局开关已无法满足混合频道、多 profile 嵌入等真实场景。
- **数据安全与完整性保障**：P1 备份截断 bug（#124564）、压缩代次校验（#124573）、tool-arg 修复破坏参数（#102311）——社区对数据丢失风险高度敏感。
- **本地/自托管部署灵活性**：本地运行时路径与模型目录可配置（#124194）、ARM32 Pillow 轮子解析（#72134）、skills 可写外部根（#124191）——自托管用户希望减少对上游预置的依赖。
- **会话标题与调度优化**：有界 URL 元数据标题增强（#124560）、显式端点并发能力（#124563）——围绕辅助标题生成的体验优化仍在持续推进。

## 开发者关注点

- **数据完整性的隐性风险最受关注**：备份中 CRC 有效但截断的 ZIP 成员（#124564）、tool-arg 修复把可修复参数静默变成 `{}`（#102311），这类“看起来成功实则损坏”的问题对 AI 工具的信任伤害最大。
- **插件 API 缺口集中暴露**：工具无法跨 toolset 注册、终端命令无法被插件 veto、`post_api_request` 拿不到成本数据——多个 PR 都在补“本应有但没有的门”。
- **配置粒度不足**：busy_input_mode、reply_in_thread 等全局开关无法按频道/按 store 覆盖，开发者需要为混合工作区提供更细的配置层级。
- **平台兼容性反复出现**：ARM32 Pillow 构建、Windows 路径语义、macOS launchd 超时——跨平台安装与更新的可靠性仍是高频痛点。
- **决策等待**：多个 feature 提案（#124560、#124561、#124563、#124565）均处于 `needs-decision` 状态且零评论，社区正等待维护者对 API 方向和配置模型给出明确反馈。

:::
