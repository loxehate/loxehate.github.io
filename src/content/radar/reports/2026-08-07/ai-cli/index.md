---
title: AI CLI 工具社区动态日报
published: 2026-08-07
report: ai-cli
tags:
  - radar
  - AI
---
# AI CLI 工具社区动态日报 2026-08-07

> 生成时间: 2026-08-07 02:37 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告（2026-08-07）

基于 7 款主流 AI CLI 工具的 GitHub 社区动态，以下从生态全景、活跃度、共性需求、差异化定位与趋势信号五个维度进行交叉分析。

---

## 一、生态全景

AI CLI 工具已从「功能可用」阶段迈入「生产可信」阶段。2026-08-07 各项目仍保持高频迭代（Codex 发布 `rust-v0.147.0`、DeepSeek 发布 `v1.21.0` 稳定版、Qwen 连发 3 个版本），但社区讨论重心正明显从「新增能力」转向「稳定性、数据安全与成本可信度」。**Windows 平台是全行业公认短板**——7 款工具同日均有平台相关问题被报出，覆盖死锁、路径前缀、自更新损坏运行时等基础性问题。会话/上下文可观测性、MCP 协议完整度与桌面端体验成为新的差异化竞争点。整体呈现「功能加速、地基补课」的并行态势。

---

## 二、各工具活跃度对比

| 工具 | 热门/更新 Issues | PR 动态 | Release | 热度信号 |
|---|---|---|---|---|
| **Claude Code** | 30 条热门（Top 10 详述） | 3 条活跃（近 48h，无新增） | 无 | 单 Issue 👍 最高 72（复制粘贴污染），累计 👍 121 |
| **OpenAI Codex** | 重点报告 10+ 条 | 20+ 条合并，详述 12 条 | `rust-v0.147.0` | 单 Issue 👍 933（Linux 桌面请求），203 条评论 |
| **Gemini CLI** | 热门 10 条 | 10 条 | `v0.56.0-nightly` | P1 数据丢失 Issue 47 条评论 |
| **DeepSeek Reasonix** | 热门 10 条 | 10 条 | `v1.21.0` 稳定版 | 新版集中爆发闪退/死锁，单 Issue最高 3 评论 |
| **OpenCode** | 热门 10 条 | 50 条更新（详述 10 条） | 未提及 | Feature 请求 👍 129（上下文用量）与 👍 119（链接可点击） |
| **Qwen Code** | 仅 3 条 Issue 更新 | 50 条更新（详述 10 条） | `v0.21.7` + nightly + live-host | 大量 PR 带 autofix/takeover 标签，bot 驱动开发常态化 |
| **Hermes** | 热门 10 条 | 10 条 | 无 | God-file 拆解 Epic 累计 53 条评论 |

**解读**：Qwen Code 与 OpenCode 在 PR 数量上领先（各 50 条），呈快速迭代态势；Codex 社区声量最大（单 Issue 933 👍）；Claude Code 虽无新版本与新增 PR，但 Issue 质量与投票密度高，处于「沉淀维护期」。DeepSeek 社区规模尚小，但新版本发布后 24 小时内即有多平台崩溃报告，用户跟测积极。

---

## 三、共同关注的功能方向

### 1. Windows 平台稳定性（7 款工具全覆盖）
- **Claude Code**：8/30 条热门 Issue 与 Windows 相关——GPU 崩溃、HTTP 连接重置、MSIX 自毁
- **Codex**：`ChatGPT.exe` 衍生 287 个残留进程拖垮 DWM（#33776）
- **Gemini**：PowerShell 5.1 不支持 `&&`（#20773）、退格键异常、命令替换误判（#26318）
- **DeepSeek**：TUI 启动即死锁（#7435）、更新器残留状态（#7783）
- **OpenCode**：1.18.14 启动失败（#40957）、桌面 UI 不显示（#40961）
- **Qwen Code**：WSL/ConPTY 流式文本重复渲染（#7897）、`\\?\` 路径前缀（#8619）
- **Hermes**：自更新可能损坏 Python 运行时（#80710）、UTF-16 文件乱码（#80717）

### 2. 会话/上下文可观测性与持久化
- **OpenCode** #6152（👍 129）：请求类 Claude `/context` 的上下文用量可视化对话框
- **Claude Code** #26581（👍 32）：长任务完成后的系统通知
- **Gemini** #28596：跨工作区 `--list-all-sessions`；社区抱怨会话意外丢失（#27180）
- **Hermes** #80724：`token_count` 列存在但 20,930 条消息全为 NULL，成本数据「盲飞」
- **Codex** `v0.147.0`：会话分区与超长会话增量浏览

### 3. TUI 渲染与复制粘贴/链接体验
- **Claude Code** #13378（👍 72）+ #37796（👍 49）：2 空格缩进与 80 列硬换行污染复制内容
- **OpenCode** #1168（👍 119）：TUI 链接可点击，持续一年未实现
- **Gemini** #25884：命令混入无效空白导致粘贴执行失败
- **Qwen** #7897：WSL 下流式文本重复渲染
- **Codex** #24685：复制粘贴体验待优化

### 4. MCP 协议能力补全
- **Gemini** #10704：MCP Client Sampling（server 反向调用 LLM）
- **Codex** #37337/#37344：OAuth 重认证后自动恢复 MCP 连接、修复子代理 MCP 假启动
- **Hermes** #80712：`_meta` 字段透传，此前校验负载等契约信息被整体丢弃
- **Claude Code** PR #84427/#84381：插件开发工具链修复

### 5. 权限安全与数据完整性
- **Claude Code** #6527：allow list 静默吞掉 ask 确认项——权限模型核心漏洞
- **Gemini** #26856：AI 删除数万 Obsidian 文件，用户要求退款
- **DeepSeek** #7784：Agent 未经授权执行 `git checkout`
- **Qwen** #8653：daemon 多工作区环境变量泄漏（NODE_OPTIONS/PATH）
- **Claude Code** #73638：会话重命名并发写入导致 transcript 永久损坏（HTTP 400）

---

## 四、差异化定位分析

| 工具 | 定位 | 核心差异化 | 当前最大短板 |
|---|---|---|---|
| **Claude Code** | 企业级专业开发终端 | 权限模型与插件生态最深，安全边界讨论最前沿 | 渲染层污染日常输出；权限配置存在静默失效 |
| **OpenAI Codex** | 桌面优先的 Agent 平台 | 发布节奏最快，会话分区、子代理上下文跟踪领先 | macOS 僵尸进程泄漏（同版本 4 起报告）、Windows 进程风暴 |
| **Gemini CLI** | 官方生态 + 协议规范派 | MCP/eval 基础设施投入大，组件级评估体系在建 | Windows 兼容性差；数据删除事故引发信任危机 |
| **DeepSeek Reasonix** | 成本效率型 | 成本核算与缓存优化扎实（实测成本 -40.9%），CLI/Desktop 同步发布 | v1.21.0 多平台 TUI 死锁/闪退集中 |
| **OpenCode** | 社区驱动 + TUI 体验派 | 社区需求响应快，上下文用量可视化呼声最高，插件可定制 prompt 命令 | 计费/订阅状态不同步；Windows 启动失败 |
| **Qwen Code** | 自动化工程流水线 | autofix/takeover bot 驱动日常开发，飞书/钉钉集成深，review 证据链工程化 | daemon 环境隔离不严；Issue 反馈通道声量低 |
| **Hermes** | 架构治理 + 桌面体验 | God-file 拆解作为 repo 级政策推进，Kanban/附件、跨设备会话等桌面功能齐全 | 代码库膨胀严重（单文件 10,275 行）；更新可靠性弱 |

**技术路线差异**：Claude Code 与 OpenCode 走「终端体验纵深」路线；Codex 与 Hermes 明显押注「桌面端为主入口」；Qwen Code 在「用 AI 维护 AI 工具」的自动化工程上走得最远；Gemini 侧重协议规范性；DeepSeek 以「更低成本获得同等能力」为核心卖点。

---

## 五、社区热度与成熟度

**快速迭代期（高 PR 量 + 高功能增速）**：**Qwen Code**（50 PRs，bot 自动化合入成常态）与 **OpenCode**（50 PRs，功能请求热情高）。**Codex** 处于高速发布与稳定性欠账并存的阶段——`v0.147.0` 功能亮眼，但同一 macOS 构建版本下 4 起独立僵尸进程报告说明回归测试覆盖不足。

**成熟沉淀期（低版本频率 + 高质量 Issue）**：**Claude Code** 连续两日无新版本，但社区提出的问题均触及安全边界（#6527）与数据完整性（#73638），Issue 质量最高；👍 投票集中在日常体验痛点（复制粘贴 121 👍），说明用户基数大且已进入「深度使用吐槽」阶段。

**社区声量对比**：Codex 的 Linux 桌面请求（933 👍）是当前全行业最高单 Issue 热度；OpenCode 与 Claude Code 的功能/体验投票最活跃；Hermes 的讨论集中在架构治理（53 评论），社区更偏核心开发者与维护者导向；Gemini 社区情绪性最强的议题是数据安全（Obsidian 事故）；DeepSeek 社区规模最小但用户对新版本跟测积极。

---

## 六、值得关注的趋势信号

### 1. Windows 体验是 AI CLI 的共性短板，也是差异化机会
7 款工具同日均有 Windows 相关缺陷报告，覆盖从启动失败、死锁到路径编码等基础问题。当前没有任何工具在 Windows 上形成「可靠」心智。**参考价值**：Windows 重度用户在选择工具时应优先查看该项目的 Windows issue 关闭率；对工具厂商而言，率先补齐 Windows 稳定性即可建立明确竞争优势。

### 2. 渲染层与数据层必须分离——终端输出可复用性是「卫生底线」
Claude Code 的复制粘贴污染问题以合计 121 👍 成为今日最高频痛点，OpenCode 的链接可点击（119 👍）持续一年未解决。这说明 CLI 输出正在被直接喂给 IDE、代码评审和文档工具，任何展示型格式都不应污染复用内容。**参考价值**：将「复制内容纯净」作为 CLI 工具的验收标准之一。

### 3. 成本与配额的透明化是生产采用的前提
Codex 子代理一夜耗尽整周配额（#35463）、OpenCode 订阅后不生效（#40234）、Hermes 的 token_count 从未写入（#80724）——三个不同层面暴露同一问题：**用户无法信任用量统计**。在 agent 自主执行越来越长的任务链条时，「可核算」比「便宜」更重要。**参考价值**：评估工具时检查其用量统计是实时落盘还是估算值。

### 4. 数据完整性事故正在透支用户信任
Gemini 的 Obsidian 数万文件被删、Claude Code 的 transcript 永久损坏、DeepSeek 的越权 git checkout、Qwen 的环境变量跨工作区泄漏——单日 4 起不同工具的数据安全事件。这些不再是「功能 bug」，而是「信任事故」。**参考价值**：建议为 CLI 工具配置严格的权限边界和 git 操作确认机制后再用于生产仓库。

### 5. 多代理与长任务生命周期管理成为新 UX 战场
Codex 引入会话分区与子代理上下文跟踪、Qwen 实现工作流暂停/恢复、OpenCode 支持子代理会话续跑、Hermes 探索多设备观看同一会话（#80723）——各工具都在解决「任务跑起来了，但用户无法有效监控和接管」的问题。**参考价值**：长时运行任务的完成通知（Claude #26581）和跨设备接管能力将成为下一轮功能竞争焦点。

### 6. 桌面端从「附加品」走向「主入口」
Codex、Claude Desktop、DeepSeek Desktop、Hermes Desktop、OpenCode 桌面端同步推进功能开发；与此同时，Claude 的 Cowork 捆绑后台服务（42 👍 反对）与 Codex 的进程泄漏事件说明：桌面端的**资源占用与隐私边界**尚未形成行业规范。**参考价值**：关注桌面版是否提供后台服务禁用入口、进程清理是否干净。

### 7. 工具链正在被 AI 自我维护
Qwen Code 的 autofix/takeover bot 驱动的 PR 合入已成常态、Codex 推出会话迁移专用 CLI 工具、Qwen 的审查流程开始要求 `capture-tui` 截图留证——AI CLI 项目正在用 agent 维护 agent。**参考价值**：这不只是效率提升，也意味着「AI 生成的代码审查 AI 生成的代码」将成为开源维护的常规模式，开发者需要适应并审计这类自动化流程的质量边界。

---

**总体判断**：AI CLI 工具的竞争已从「谁能完成任务」转向「谁能被信任地用于真实生产」——Windows 稳定性、成本透明度、数据安全与会话可观测性，是下一阶段决定工具成败的四个关键维度。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据截止 2026-08-07 · 来源：github.com/anthropics/skills

## 1. 热门 Skills 排行

**#1298 — skill-creator 评估回路修复**（Open）
- 功能：修复 `run_eval.py` 在所有场景下报告 0% recall 的严重问题（Windows 流读取、触发检测、并行 worker）。
- 热点：触及 skill-creator 的核心信任问题——描述优化闭环一直在"优化噪声"。Issue #556 有 10+ 独立复现，社区影响面极大。
- 链接：https://github.com/anthropics/skills/pull/1298

**#514 — document-typography 文档排版技能**（Open）
- 功能：自动修复 AI 生成文档中的孤行（1-6 个词溢出）、widow 段落（页底孤立标题）、编号错位。
- 热点：所有 AI 生成文档均存在此类问题，用户几乎不会主动要求排版质量，属于"隐性刚需"。
- 链接：https://github.com/anthropics/skills/pull/514

**#486 — ODT 技能**（Open）
- 功能：创建/填充/读取 OpenDocument 格式（.odt/.ods），支持 ODT→HTML 转换。
- 热点：对 ISO 标准开源文档格式的支持呼声高，契合企业 LibreOffice 生态。
- 链接：https://github.com/anthropics/skills/pull/486

**#210 — frontend-design 技能改进**（Open）
- 功能：重写前端设计技能，使每条指令在单次会话内可执行，行为指引具体到可操作。
- 热点：社区对现有技能"读起来像开发文档而非可执行指令"的普遍批评（同见 #202）。
- 链接：https://github.com/anthropics/skills/pull/210

**#1367 — self-audit 自我审计技能**（Open）
- 功能：先机械验证输出文件是否真实存在，再按损害严重度进行四维度推理审计；声称通用任何项目与模型。
- 热点：交付前质量门控是当前 AI 工程化最热的实践方向，讨论活跃度高。
- 链接：https://github.com/anthropics/skills/pull/1367

**#723 — testing-patterns 测试模式技能**（Open）
- 功能：覆盖测试哲学（Testing Trophy）、单元测试（AAA/命名/边界）、React 组件测试（Testing Library）的完整栈技能。
- 热点：测试方法论的系统化沉淀，属于社区高频需求方向。
- 链接：https://github.com/anthropics/skills/pull/723

**#525 — pyxel 复古游戏开发技能**（Open）
- 功能：基于 pyxel-mcp 的像素/8-bit 游戏开发工作流（write → run_and_capture → inspect → iterate）。
- 热点：垂直领域（游戏）+ MCP 集成模式，差异化明显，作者为 pyxel 引擎原作者。
- 链接：https://github.com/anthropics/skills/pull/525

**#1302 — color-expert 色彩专家技能**（Open）
- 功能：涵盖色彩命名系统（ISCC-NBS/Munsell/XKCD/RAL）、色彩空间选择表（OKLCH/OKLAB/CAM16）的自包含技能。
- 热点：跨 UI/数据可视化/设计的高频刚需，专业深度较高。
- 链接：https://github.com/anthropics/skills/pull/1302

## 2. 社区需求趋势

- **安全与信任边界**（#492，43 条评论）：社区技能在 `anthropic/` 命名空间下分发、冒充官方技能，构成信任边界滥用风险——单点讨论热度最高。
- **组织级技能共享**（#228，16 条评论）：需要组织内技能库或直接分享链接，替代"下载 .skill 文件→Slack 传文件→手动上传"的原始流程。
- **Skill 开发工具链可靠性**（#556、#202、#1169）：`run_eval.py` 的 0% 召回率 bug 让描述优化闭环失效；skill-creator 本身被批评"叙事冗长、违反技能命名规范"。
- **新技能方向**：agent 治理模式（#412）、紧凑记忆符号表示（#1329）、推理质量门控流水线（#1385）。
- **企业/平台集成**：Bedrock 支持（#29）、SharePoint Online 安全处理（#1175）、通过 MCP 协议暴露技能（#16）。
- **技能体积敏感**：#1487 报告 `claude-api` 技能单次注入约 156k tokens 耗尽上下文窗口，社区对技能膨胀高度警惕。

## 3. 高潜力待合并 Skills

以下 PR 均处于 **Open** 状态，但讨论活跃、完整度高、需求明确：

- **#1367 — self-audit**：v1.3.0 质量门控技能，机制设计与通用性俱佳，作者已形成完整提案（#1385 配套）。
- **#1302 — color-expert**：自包含程度高、专业体系完整，近期有持续更新（最后更新 07-21）。
- **#723 — testing-patterns**：测试栈全覆盖，方法论成熟，是社区长期期待的"官方测试指导"。
- **#525 — pyxel**：垂直领域 + MCP 集成模式，且为领域原作者提交，权威性强。
- **#1479 — plan-file-hygiene**：解决规划产物无生命周期的实际问题（对应 #1417），有明确问题定义和社区协作基础。

## 4. Skills 生态洞察

社区最集中的诉求是：**修复 skill-creator 的评估与优化闭环（`run_eval.py` 的 0% 召回率 bug 占据了热点 PR 的近半数），让"创建→验证→优化"真正可用**；同时，官方命名空间下的安全信任边界（#492）是 Issues 侧最受关注的治理议题——工具链的可靠性尚未跑通，生态治理的信任基础又面临挑战。

---

## 1. 今日速览

过去 24 小时无新版本发布，社区焦点集中在**权限系统失效**、**Windows 平台稳定性**与**终端文本渲染格式**三大问题上。其中权限配置 ask list 被静默忽略（#6527）与复制粘贴格式损坏（#13378，获 👍 72）是今日讨论热度最高的两个 Bug，分别触及工具安全边界与日常开发体验。此外，3 个 PR 均为插件开发工具链修复，社区贡献活跃度集中在 CLI 插件生态。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 社区热点 Issues（10 条）

### ① 权限配置失效：ask list 被静默忽略
- **#6527** — [[bug, platform:linux, area:tools, area:security] ask list is ignored when "Bash" is in allow list](https://github.com/anthropics/claude-code/issues/6527)
- 💬 23 评论 | 👍 19
- **为什么重要**：当允许列表中包含 `Bash` 时，用户通过 `ask` 设置的安全确认项完全不生效，相当于静默扩大工具权限边界。这是安全机制的核心漏洞，涉及 Linux 平台的权限模型，值得 Anthropic 优先排查。

### ② Windows 桌面版强迫捆绑 Cowork 后台服务
- **#57371** — [[enhancement, platform:windows, area:cowork, area:desktop] Claude Desktop (Windows)：disable bundled Cowork background service](https://github.com/anthropics/claude-code/issues/57371)
- 💬 18 评论 | 👍 42（今日 👍 数最高 Issue）
- **为什么重要**：`CoworkVMService` 作为后台常驻服务随 Windows 版桌面应用自动装入，但大量用户根本不用 Cowork 功能。社区强烈要求提供禁用入口，涉及资源占用、隐私边界与系统权限控制。

### ③ 终端输出格式损坏复制粘贴内容
- **#13378** — [[bug] 2-space indent and hard wrap at 80 breaks copy-paste](https://github.com/anthropics/claude-code/issues/13378)
- 💬 16 评论 | 👍 72（今日总 👍 数最高）
- **为什么重要**：Claude Code 渲染时强制 2 空格缩进、80 列硬换行，导致复制到编辑器/IDE 的代码全部错乱。这是高频日常工作流痛点，已严重影响依赖 CLI 输出的开发者。另一条同类 Issue #37796（👍 49）也验证了此问题具有普遍性。

### ④ 会话限制误判：本地用量低但限额 100%
- **#54750** — [[bug, platform:macos, area:cost] Current session limit reaches 100% despite low visible usage](https://github.com/anthropics/claude-code/issues/54750)
- 💬 16 评论 | 👍 9
- **为什么重要**：本地可见会话使用量很低，但 Claude Code / Desktop 判定当前会话配额已用尽并阻止继续使用。涉及配额计费逻辑 bug，直接影响付费用户可用性。

### ⑤ Cowork/Cloud 会话 git 推送被误拦截
- **#76248** — [[bug, has repro, area:cowork] Git proxy blocks all pushes — PAT pass-through no longer works](https://github.com/anthropics/claude-code/issues/76248)
- 💬 14 评论 | 👍 5
- **为什么重要**：自 7 月 10 日起，Cowork/远程云会话中无法向"授权仓库集合"之外的 GitHub 仓库推送，即使用户显式传入自己的细粒度 PAT 也被绕过。问题在会话中途出现，影响远程协作场景的完整性。

### ⑥ 渲染缩进跟随复制，污染粘贴内容
- **#37796** — [[bug, platform:macos, area:tui] Copied text includes 2-space leading indentation](https://github.com/anthropics/claude-code/issues/37796)
- 💬 13 评论 | 👍 49
- **为什么重要**：与 #13378 同根源但发生在 macOS 终端：复制渲染输出时每一行都带上 UI 的 2 空格 padding，每次粘贴后都需要手动清理。该问题与 #13378 合并观察，应作为渲染层统一修复项。

### ⑦ Windows 工具调用前文案丢失
- **#79584** — [[bug, platform:windows, area:tui] Assistant text before tool call intermittently never rendered](https://github.com/anthropics/claude-code/issues/79584)
- 💬 9 评论 | 👍 7
- **为什么重要**：在 Windows 上，同一轮中工具调用（尤其是 `AskUserQuestion`）之前生成的助手文本有时完全不显示。用户看不到模型推理过程，只能看到突然弹出的提问，交互可理解性打折扣。

### ⑧ 会话重命名导致 transcript 永久损坏
- **#73638** — [[bug, has repro, area:core] Session rename injects a turn that corrupts transcript (HTTP 400)](https://github.com/anthropics/claude-code/issues/73638)
- 💬 9 评论 | 👍 0
- **为什么重要**：当会话重命名与 `server_tool_use` 调用并发时，系统注入一个合成的 `system-reminder` 作为 user turn，导致 transcript 结构损坏，之后所有请求返回 400。**数据完整性**问题，属于必须修复的严重 bug。

### ⑨ 功能请求：系统级任务完成通知
- **#26581** — [[enhancement] System notifications when Claude needs attention or completes tasks](https://github.com/anthropics/claude-code/issues/26581)
- 💬 8 评论 | 👍 32
- **为什么重要**：长时间后台任务（测试编译、批量重构）完成后缺少主动通知。社区期望类似 Copilot 的系统通知能力。这是提升多任务开发效率的高频诉求，也是终端工具"后台化"的关键一环。

### ⑩ Desktop 会话筛选回归：时间范围过滤器消失
- **#78775** — [[bug, platform:windows, platform:macos, regression, area:desktop] Session time-range filter only appears when Group by = State](https://github.com/anthropics/claude-code/issues/78775)
- 💬 7 评论 | 👍 23
- **为什么重要**：桌面版回归 bug：会话列表的"时间范围筛选"只在分组方式为 State 时才显示。看似 UI 小问题，但直接削弱会话回溯管理效率，且为跨平台回归，表明桌面端 UI 逻辑缺少回归测试覆盖。

## 4. 重要 PR 进展（3 条）

> 注：过去 24 小时无新增 PR，以下为近 48 小时内活跃的 PR。

### ① 默认启用 frontend-design 插件
- **#84600** — [Enable frontend-design plugin at project scope](https://github.com/anthropics/claude-code/pull/84600)
- 👤 @DanWebOps | 状态：Open
- **内容**：通过 `.claude/settings.json` 注册官方 marketplace 并启用 frontend-design skill，让该仓库的用户自动加载前端设计能力。对插件分发与项目级插件配置有参考意义。

### ② 修复 validate-agent.sh 在 set -e 下提前退出
- **#84427** — [fix(plugin-dev): prevent validate-agent.sh exiting on first warning](https://github.com/anthropics/claude-code/pull/84427)
- 👤 @erichanwang | 状态：Open
- **内容**：`((error_count++))` 这类表达式在 Bash 中返回非零状态，导致 `set -e` 下脚本在第一个警告处就终止。此修复让校验脚本能完整输出所有告警，是插件开发工具链的实用性改进（跟进 #76985）。

### ③ 改进 validate-hook-schema.sh 对 hook 配置的兼容性
- **#84381** — [fix(plugin-dev): handle wrapped hook schemas and optional matchers](https://github.com/anthropics/claude-code/pull/84381)
- 👤 @erichanwang | 状态：Open
- **内容**：支持 `{"description": {...}, "hooks": {...}}` 顶层包装结构，并修正可选 matchers 的校验逻辑，提升 `hooks.json` schema 验证准确率。

## 5. 功能需求趋势

从今日全部 Issue 中提炼出四个最明确的功能方向：

1. **终端 UI 文字渲染可配置化**（#13378、#37796）
   - 核心诉求：缩进宽度、自动换行策略必须允许用户关闭或自定义，否则任何展示型格式都不应污染复制内容。
2. **Windows / Linux 桌面端细化控制**（#57371、#78775、#81123）
   - 核心诉求：后台服务可禁用、UI 筛选器稳定可靠、MSIX 包不自毁。Windows 桌面版正在从"可用"走向"可控"。
3. **权限系统精细粒度与透明化**（#6527、#76718）
   - 核心诉求：允许列表不应吞掉 ask 列表；复合命令应逐段判断；权限提示数量要可控，否则多会话并行工作流无法落地。
4. **会话生命周期可观测性**（#26581、#73638、#54750）
   - 核心诉求：任务完成主动通知；会话并发修改不得损坏 transcript；配额使用率要可真实反映。

## 6. 开发者关注点

- **复制粘贴格式污染成最高频痛点**：两条独立 Issue 合计 👍 121，且覆盖 macOS/Linux/Windows 三端。当前 CLI 渲染与剪贴板内容未做剥离，已直接影响日常输出复用效率。
- **Windows 平台是稳定性重灾区**：今日 30 条热门 Issue 中 **8 条**与 Windows 相关（#57371、#79584、#81664、#84194、#81123、#76718、#54750、#58402），涉及 GPU 崩溃、HTTP 连接重置、权限提示风暴、MSIX 自毁，可判断 Windows 仍是该类问题的高发环境。
- **权限系统过度提示与失效并存**：#76718 报告在并行会话中 700+ 次权限确认；#6527 则暴露 allow list 使 ask list 失效。两者结合说明权限模型在表达式匹配与多会话聚合上需要重新设计。
- **transcript 数据完整性风险敏感度高**：#73638 与 #81461（模型伪造 user turn）均涉及会话记录被污染，开发者在评论中对"记忆与上下文不可信"表达了明显担忧。
- **后台服务合法性信任危机**：#57371 的 42 个 👍 表明用户对捆绑后台服务的容忍度很低，官方应在安装流程中明示并给出关闭选项。

---
*数据范围：2026-08-07 更新，来源 [anthropics/claude-code](https://github.com/anthropics/claude-code/issues)*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-07

## 1. 今日速览

今日 Codex 发布 `rust-v0.147.0`，带来便携式 Agent 插件与持久化会话管理两大新能力。社区方面，macOS 桌面端**僵尸进程泄漏**成为最集中的负面反馈（至少 4 条独立 Issue 指向同一构建版本），Linux 桌面端诉求（933 👍）与 Windows 进程风暴问题则持续高热。PR 侧密集合并了 20+ 条针对 app-server、MCP 与沙箱稳定性的修复，整体呈现"功能迭代加速、稳定性问题待收口"的态势。

## 2. 版本发布

**rust-v0.147.0**（[Release 链接](https://github.com/openai/codex/releases)）

- **便携式 Agent 插件**：支持安装可移植插件，并可在本地、个人、工作区及远程插件目录中统一搜索（#36544, #36409, #36919, #36796）。
- **会话组织升级**：可将对话整理为持久的、手动排序的分区，并支持增量浏览超长会话记录（#35722, #36007, #36380, #36948）。

## 3. 社区热点 Issues

### 🔥 最高热度：Linux 桌面应用请求
- **[#11023](https://github.com/openai/codex/issues/11023) Codex 桌面应用支持 Linux** — 作者受 macOS 端已知问题困扰，希望在 Linux 桌面使用该应用。收获 **933 👍 / 203 💬**，是当前社区关注度最高的未关闭 Issue，强烈反映 Linux 开发者对官方桌面客户端的刚需。

### macOS 桌面端僵尸进程泄漏（同一构建版本 26.730.61639 集中爆发）
- **[#37247](https://github.com/openai/codex/issues/37247) 泄漏数千个僵尸子进程，耗尽进程表** — 观测到 4,876 个僵尸进程，最终导致 `Resource temporarily unavailable`。
- **[#37244](https://github.com/openai/codex/issues/37244) 持续泄漏僵尸进程直至达到系统上限** — 约 77 个僵尸进程在短时间内积累，触及用户软限制 2,666。
- **[#37240](https://github.com/openai/codex/issues/37240) 僵尸进程 + 文件描述符泄漏可复现** — Pro 用户报告构建 26.730.61639 上两者并发泄漏。

这三条均指向同一构建，社区已形成明确的回归报告链，预计会推动紧急 hotfix 发布。

### Windows 平台稳定性
- **[#33776](https://github.com/openai/codex/issues/33776) ChatGPT.exe 衍生数百个 taskkill.exe/conhost.exe，导致 WMI 风暴与 DWM 降级** — 单次会话观察 287 个残留进程，严重拖累系统图形性能。32 条评论，Windows 用户共鸣强烈。
- **[#28080](https://github.com/openai/codex/issues/28080) 桌面线程工具间歇性丢失 handler（`No handler registered`）** — 活跃会话中工具调用随机失败，直接影响工作流可靠性。

### 企业/代理能力缺口
- **[#6060](https://github.com/openai/codex/issues/6060) 支持在 config.toml 中配置 `http_proxy` 出站代理** — 企业环境（Zscaler、PAC 代理）无法正常使用 Codex，收获 **68 👍**，企业用户关注度最高的功能请求。

### 配额与认证异常
- **[#35463](https://github.com/openai/codex/issues/35463) 子代理一夜之间耗尽整周配额** — Pro 20x 用户报告使用量统计失效，后台子代理任务出现计费失控。
- **[#37192](https://github.com/openai/codex/issues/37192) OAuth 回退静默使用硬编码 "dummy" API Key 导致 401** — 网络切换后不提示重新认证，静默降级为无效凭据，认证链路存在严重健壮性问题。

### 其他值得关注
- **[#37346](https://github.com/openai/codex/issues/37346) 上下文压缩期间内联图像无限复制，生成 20+ GB JSONL 文件** — 磁盘空间被迅速耗尽，存储层缺少去重保护。

## 4. 重要 PR 进展

### 沙箱与安全
- **[#37349](https://github.com/openai/codex/pull/37349) 在完整文件系统 Bubblewrap 沙箱中挂载最小化 `/dev`** — 修复宿主机设备树随根 bind 泄漏到隔离环境的问题，是安全加固的关键一步。
- **[#37338](https://github.com/openai/codex/pull/37338) 连接器安装 URL 遵循配置的 ChatGPT Origin** — 支持通过 `CODEX_APP_SERVER_CHATGPT_BASE_URL` 自定义连接器安装地址。

### MCP 生态修复
- **[#37337](https://github.com/openai/codex/pull/37337) OAuth 重新认证后自动恢复 MCP 服务器** — 修复凭证失效后必须重启客户端才能重新连接的问题。
- **[#37344](https://github.com/openai/codex/pull/37344) 修复子代理 MCP 启动状态驻留** — 解决 TUI 一直显示 "MCP 启动中" 的假象。

### 会话与上下文管理
- **[#37348](https://github.com/openai/codex/pull/37348) 新增会话文件迁移 CLI 工具与后台迁移** — 提供 `codex migrate-rollouts` 支持 dry-run、线程过滤与 I/O 节流，为大型会话存储迁移铺路。
- **[#37347](https://github.com/openai/codex/pull/37347) 按 Agent 跟踪上下文窗口** — Forked 子代理继承压缩历史后，上下文窗口元数据可正确区分归属与代际。
- **[#37350](https://github.com/openai/codex/pull/37350) 允许 `ThreadManager` 自定义线程 ID 生成** — 默认保留 UUIDv7 生成器，为扩展预留自定义 ID 分配能力。

### 运行时与模型路由
- **[#37345](https://github.com/openai/codex/pull/37345) 向 Codex 后端发送模型路由提示** — 新增 `x-codex-routing-hint` 头部，涵盖请求模型与服务层级，提升服务端路由精度。
- **[#37352](https://github.com/openai/codex/pull/37352) 可配置 code-mode exec yield 默认超时** — 新增 `features.code_mode.default_exec_yield_time_ms`（默认 30 秒）。
- **[#37357](https://github.com/openai/codex/pull/37357) 将过短的 `wait_agent` 超时钳制到配置最小值** — 拒绝改为钳制处理，并在结果中提示调整值，提升工具可用性。

### 遥测与调试
- **[#37339](https://github.com/openai/codex/pull/37339) 账户切换后重新加载 app-server 遥测配置** — 修复切换账号后 OpenTelemetry 仍使用旧 Collector 设置的问题。
- **[#37341](https://github.com/openai/codex/pull/37341) 支持内联可视化的内容引用** — 在 TUI 的缓存、流式及最终渲染路径中统一识别结构化可视化指令。

## 5. 功能需求趋势

从今日 Issue 声量来看，社区最关注的功能方向集中为：

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **Linux 桌面端支持** | #11023（933 👍） | 🔥🔥🔥 最高，无官方回应 |
| **企业代理与网络兼容** | #6060（68 👍） | 企业用户刚需，配置层缺失 |
| **TUI/终端体验打磨** | #21653 多行状态行、#24685 复制粘贴 | 高频日常操作受阻 |
| **Windows 默认 Shell 可配置** | #16579（32 👍） | 非 PowerShell 用户强烈诉求 |
| **桌面端稳定性（双平台）** | macOS 僵尸进程 ×4、Windows 进程风暴 | 单日多条回归报告，优先级应上调 |

## 6. 开发者关注点

- **macOS 僵尸进程泄漏成为首要痛点**：同一构建（26.730.61639）下至少 4 起独立报告，涉及进程表耗尽、文件描述符泄漏，开发者普遍认为这是近期回归而非历史缺陷。若您仍停留在该版本，建议关注后续 hotfix。
- **配额统计可信度受质疑**：#35463 子代理一夜耗尽整周配额、#37250 重置后仍被错误限制，社区对用量计算的准确性信心正在下降。
- **认证流程健壮性不足**：#37192 显示 OAuth 失败时静默降级为无效凭据，开发者期望的行为是明确提示重新登录而不是返回 401。
- **MCP 工具序确定性**：#37351 指出 MCP 服务器组按 `HashMap` 随机顺序输出，影响模型对工具列表的稳定认知，这是追求可复现 agent 行为的开发者关心的细节问题。
- **数据体积失控**：#37346 的 20+ GB JSONL 文件与 #37355 的 58 GB 空闲流量传输，表明客户端在数据管理和网络行为上仍有粗放之处。

---

*本日报由 GitHub 公开数据自动整理生成，仅供参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-07

## 今日速览

今日发布 v0.56.0 nightly 版本（常规 changelog 与版本号更新）。社区层面，一则关于“AI 导致 Obsidian 数据丢失”的 P1 投诉持续发酵（47 条评论），另有多个 Windows 平台稳定性问题与性能相关讨论热度上升。PR 方面，容量耗尽错误分类、流中断 usage 统计、以及 Docker 基础镜像安全升级等修复值得关注。

## 版本发布

**v0.56.0-nightly.20260807.gd5c9a97dc**：常规 nightly 版本，包含 v0.55.0-preview.1 的 changelog 更新、版本号 bump 以及部分 v0.54 系列 changelog 补录。无重大功能变更。

🔗 https://github.com/google-gemini/gemini-cli/releases

## 社区热点 Issues（Top 10）

1. **【P1/数据丢失】AI 导致 Obsidian 大量文件被删，用户要求退款** — [#26856](https://github.com/google-gemini/gemini-cli/issues/26856)
   用户情绪激烈，声称 CLI 在未授权情况下删除了数万个 Obsidian 文件，造成约 300 美元的工作损失。社区 47 条评论、16 个 👍，是最受关注的 issue。官方已要求用户上传 chat history JSON 以协助排查。

2. **【P1/Windows 兼容】PowerShell 5.1 下 `&&` 操作符导致 ParserError** — [#20773](https://github.com/google-gemini/gemini-cli/issues/20773)
   CLI 执行 `git status && git branch` 时在 Windows PowerShell 5.1 下报错（该版本不支持 `&&` 链式操作符）。17 条评论，已被关闭，但社区关注度较高。

3. **【功能需求】MCP 增加 Client Sampling 支持** — [#10704](https://github.com/google-gemini/gemini-cli/issues/10704)
   开发者希望 Gemini CLI 实现 MCP 规范中的 Client Sampling，使 MCP server 能反向调用 LLM，类似 VS Code + GitHub Copilot 的集成方式。13 条评论、9 个 👍。

4. **【P1/核心】Shell 命令执行完成后卡在 “Waiting input”** — [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
   即使执行最简单的命令，CLI 仍会显示命令正在执行且等待用户输入，导致流程挂起。影响面较广，3 个 👍，等官方确认。

5. **【Windows 输入】退格键删除整个词而非单个字符** — [#25867](https://github.com/google-gemini/gemini-cli/issues/25867)
   Windows 平台上退格键行为异常，影响编辑体验。10 条评论，已被关闭但社区仍在讨论。

6. **【核心/体验】CLI 生成的命令中混入无效空白和换行** — [#25884](https://github.com/google-gemini/gemini-cli/issues/25884)
   Agent 在回复命令时偶尔引入多余空格或换行，导致用户在 Zsh 中直接复制粘贴时执行失败。10 条评论。

7. **【Extensions/性能】VS Code 扩展 UI 锁死，globalState 存储阻塞主线程** — [#27132](https://github.com/google-gemini/gemini-cli/issues/27132)
   长时间会话或恢复历史记录时 VS Code 扩展卡死，Windows 弹出“无响应”。7 条评论，定位到 globalState 存储阻塞主线程。

8. **【新 Issue/性能】高内存占用** — [#28698](https://github.com/google-gemini/gemini-cli/issues/28698)
   2026-08-05 提交的新 issue，描述在使用过程中内存持续增长（疑似循环）。5 条评论，当前无明确结论。

9. **【安全风险】PowerShell 命令替换阻止 `/setup-github`** — [#26318](https://github.com/google-gemini/gemini-cli/issues/26318)
   `detectCommandSubstitution` 检查将 PowerShell 的 `(...)` 子 shell 误判为命令注入，同时指出参数转义缺失问题，存在真实注入风险。5 条评论，已被关闭。

10. **【官方 EPIC】组件级评估（Component Level Evaluations）** — [#24353](https://github.com/google-gemini/gemini-cli/issues/24353)
    官方维护者追踪的 EPIC，目标是在现有 76 个 behavioral eval 测试基础上构建更细粒度的组件级评估体系，覆盖 6 个支持的 Gemini 模型。7 条评论（maintainer only）。

## 重要 PR 进展（Top 10）

1. **将容量耗尽（Capacity Exhaustion）重新分类为终止错误** — [#28716](https://github.com/google-gemini/gemini-cli/pull/28716)
   将模型容量不足和余额不足从“可重试”改为“终止”错误，从而触发立即模型回退或优雅降级，避免无效重试。

2. **修复流中止时 usage 数据丢失** — [#28718](https://github.com/google-gemini/gemini-cli/pull/28718)
   `generateContentStream` 在 catch 路径未将已累积的 `usageMetadata` 落盘。修复后流中止（如用户按 ESC、网络中断）也能正确记录 token 消耗。Closes #28682。

3. **修复“新用户消息被合并进未答复的工具响应”** — [#28700](https://github.com/google-gemini/gemini-cli/pull/28700)
   工具调用被中断或流失败后，用户的下一条消息会被并入上一轮未完成的 turn，导致模型“帮你补全句子”而不是执行指令。该 PR 修复了这一关键交互缺陷。

4. **修复无限认证循环** — [#28519](https://github.com/google-gemini/gemini-cli/pull/28519)
   正确 await `oauth_creds.json` 的异步写入并强制 consent，避免认证状态未落盘导致的无限重试。Fixes #28430。

5. **设置加载顺序修复：环境变量先于 settings 占位符解析** — [#28597](https://github.com/google-gemini/gemini-cli/pull/28597)
   修复了 `.env` 文件中的环境变量未能及时应用导致 settings 占位符解析竞态的问题。

6. **Docker 沙箱升级至 Node 22** — [#28603](https://github.com/google-gemini/gemini-cli/pull/28603)
   Node 20 已于 2026-04-30 EOL，沙箱内运行模型指令需要避免已知安全漏洞。Resolves #28584。

7. **修复窄宽度下幽灵文本（ghost text）无限循环** — [#28641](https://github.com/google-gemini/gemini-cli/pull/28641)
   `InputPrompt.tsx` 中当输入宽度小于单个宽字符（CJK/emoji）时 `getGhostTextLines` 无限循环。增加回归测试。Fixes #19985。

8. **新增 `--list-all-sessions` 选项** — [#28596](https://github.com/google-gemini/gemini-cli/pull/28596)
   允许跨所有注册工作区列出并管理会话，按路径分组展示，方便找回遗忘在某个文件夹中的会话。

9. **修复 ProjectIdRequiredError 文档链接** — [#28640](https://github.com/google-gemini/gemini-cli/pull/28640)
   将错误信息中已失效的 `goo.gle` 短链替换为最新认证文档地址，并补充 docs 重定向。

10. **限制搜索结果数量，防止上下文溢出** — [#19638](https://github.com/google-gemini/gemini-cli/pull/19638)
    对 `SearchText`（grep/ripgrep）工具的返回结果进行上限限制，并优化上下文溢出时的提示信息，使其更具可操作性。

## 功能需求趋势

- **MCP 协议能力扩展**：社区持续要求完整 MCP 支持，尤其是 Client Sampling（#10704），希望让 MCP server 能回调 LLM。
- **代码库理解增强**：官方 EPIC 系列探索 AST 感知的文件读取、搜索与代码库映射（#22745、#22746），目标是减少 token 消耗并提高导航精确度。
- **会话管理改进**：会话意外丢失（#27180）、历史文件被清理（#27721）、跨目录会话管理（#28596）反映出用户对会话持久化和可恢复性的强烈需求。
- **上下文窗口与工具数量优化**：超过 128 个工具时触发 400 错误（#24246）、搜索返回过多结果导致溢出（#19638），社区希望 CLI 能更智能地管理上下文占用。
- **Auto Memory（自动记忆）系统完善**：多项维护者 EPIC 涉及记忆系统的低信号会话重试、非法补丁隔离、日志脱敏等（#26522、#26523、#26525），说明记忆机制仍是当前迭代重点。
- **破坏性行为防护**：社区提议 agent 应尽量避免 `git reset --force`、危险 DB 操作等破坏性命令（#22672）。

## 开发者关注点

- **Windows 平台兼容性仍是重灾区**：PowerShell 5.1 不支持 `&&`（#20773）、退格键行为异常（#25867）、命令替换检测误伤（#26318）等多条 issue 均与 Windows 相关，开发者对 win32 下的体验提升有较高期待。
- **数据安全与可靠性焦虑**：#26856（Obsidian 数据删除）和 #27386（Unicode 文件被静默改写）这类数据破坏性问题引发强烈情绪反应，用户对 CLI 的信任感明显受挫，要求更严格的确认机制。
- **命令执行卡死与格式问题**：执行后卡在 “Waiting input”（#25166）、生成的命令混入非法空白（#25884）等，直接干扰日常使用流。
- **认证与权限细节**：无限认证循环（#28519）、Vertex AI 401 错误提示不友好（#28679）、NFS 环境下 `execvp: Permission denied`（#25933）等认证/权限相关反馈高频出现。
- **性能体验**：高内存占用（#28698）和 VS Code 扩展 UI 卡顿（#27132）显示长会话场景下的资源管理仍有优化空间。

---

*本日报由 AI 自动汇总生成，数据来自 github.com/google-gemini/gemini-cli，仅供技术参考。*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报（2026-08-07）

> 数据来源：github.com/esengine/DeepSeek-Reasonix

## 今日速览

v1.21.0 稳定版正式发布，引入 Shell 执行契约与分阶段错误报告，提升了提示缓存命中率与成本核算精度。然而新版本在 Windows/Linux 平台集中暴露了多起 TUI 死锁与闪退问题（#7809、#7435、#7810）。与此同时，核心代码重构系列 PR 持续推进，agent.go 与 controller.go 的“上帝对象”拆解取得阶段性进展。

---

## 版本发布

### v1.21.0（CLI 与 Desktop 同步发布，稳定版）

此版本核心更新：

- **结构化 Shell 执行契约**：引入 shell 命令执行的结构化协议，行为更可预期
- **分阶段错误报告**：错误按阶段分级上报，便于定位失败环节
- **提示缓存命中率提升**：优化缓存策略，减少重复计算
- **成本核算精度优化**：更准确的 token/费用统计
- **流恢复**：支持中断后恢复响应流
- **会话临时文件持久化**：临时文件在会话间可保留
- **官网焕新**：全新官网设计

完整更新日志：https://reasonix.io/changelog/v1.21.0/

---

## 社区热点 Issues（Top 10）

### #7809 [Bug] 1.21.0 CLI 打开后自动退出（Windows）
- **作者**：@zichuan3 | **评论**：3
- 通过 scoop 更新到 1.21.0 后启动，30 秒内闪退，提示 “program was killed”。直接冲击最新版 Windows 用户。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7809

### #7435 [Bug] Windows 下交互 TUI 启动即死锁
- **作者**：@zhaohl1993 | **评论**：2
- v1.19.3 / v1.17.21 均复现：界面刚弹出即整终端冻结、Ctrl+C 无效、日志恒为 0 字节。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7435

### #7810 [Bug] TUI 在 Linux 上死锁并被 watchdog 强杀
- **作者**：@pandaye | **评论**：0
- 启动数秒后死锁，非交互模式（-p/run）不受影响，指向 TUI 事件循环问题。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7810

### #7811 [Bug] macOS TUI 流停滞导致永久阻塞
- **作者**：@VictorNanka | **评论**：0
- 使用 ollama-cloud deepseek-v4-flash 模型时，HTTP/2 路径下事件循环卡死，SIGTERM 后提示 “program was killed”。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7811

### #7812 [Bug] 1.21.0 启动加载极慢，设置界面需 40+ 秒
- **作者**：@HaoyueQin | **评论**：0
- 每次启动卡在欢迎界面十几秒，设置界面更久，疑似 v1.21.0 引入的性能回归。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7812

### #7784 [Bug] Agent 未经授权执行 git checkout
- **作者**：@ppdayz | **评论**：1
- 在无用户指令的情况下自动 checkout 历史版本，违反“使用 git 前需征得同意”的约束，涉及 agent 安全信任问题。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7784

### #7798 [Bug] 会话内切换模型后读图能力不生效
- **作者**：@1489998 | **评论**：0
- 从无视觉模型切换到 mimo-v2.5 后，图片仅以路径引用，需重新开对话才能恢复。影响多模型协作场景。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7798

### #7799 [Bug] 1.21.0 Desktop UI 界面异常，不随系统缩放
- **作者**：@jsanoob | **评论**：0
- 刚安装正常，重启后 UI 不符合系统缩放设置，Windows 显示器适配问题。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7799

### #7808 [Feature] 新增快捷短语功能
- **作者**：@ktech0 | **评论**：0
- 请求增加 /pmt 系列菜单管理预设快捷短语，减少每次重复输入上下文背景。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7808

### #7783 [Bug] Windows 更新失败：pending update already exists
- **作者**：@invocarem | **评论**：1
- 多日尝试更新均卡在 “prepare update”，更新器需处理残留 pending 状态。
- https://github.com/esengine/DeepSeek-Reasonix/issues/7783

---

## 重要 PR 进展

### #7742 feat(desktop): OS 级全局快捷键呼唤窗口
- 设置 → Shortcuts 新增 Show/Hide 快捷键（默认 Ctrl+Shift+Space / Cmd+Shift+Space），绑定持久化到 Config（非 localStorage）。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7742

### #7726 feat(desktop): 可选的 per-topic Git worktree 隔离
- 从项目右键菜单创建独立 worktree（分支前缀 `reasonix/topic-*`），会话索引仍以源项目为准。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7726

### #7644 fix(responses): 对齐 MiMo SDK 配置 + DeepSeek 128K 输出预算
- 按官方文档修正 vendor 能力表，修复输出截断，实测成本降低 **40.9%**。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7644

### #7807 fix(sandbox): 探测 sandbox-exec 可用性而非 PATH 存在
- macOS 10.14+ 中 sandbox-exec 即使存在也不可用（exit 71），本 PR 对齐 Linux 端 bwrap 检测模式。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7807

### #7802 feat(intent): 用分层信号替代关键词表解析交付意图
- 重构 internal/taskintent，替换 5 套易冲突的 mutation-verb 关键词表为分层信号机制。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7802

### #7806 chore(standards): 机器强制注释/文件大小/分层规则
- 将仅存于 CLAUDE.md 的规范固化为可执行检查，清理 TypeScript 遗留引用。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7806

### #7805 fix(dev): 根目录 dev 脚本重命名为 dev.sh
- 修复 `git checkout dev` 被同名文件遮蔽导致分支切换失败的问题。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7805

### #7788 refactor(agent): 提取任务意图分类器到 internal/taskintent
- 将 agent.go 中约 600 行命名实体分类代码拆分为独立包，属 god-object 清理系列关键一步。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7788

### #7797 refactor(evidence): 会话转录上下文能力改为懒加载
- 修复 executeOne 中每次完整复制会话转录的性能问题，仅在 complete_step 验证回退时按需读取。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7797

### #7682 fix(i18n): 对齐 zh-TW 与 en/zh 翻译
- 修正繁体中文字符串 14 处，并新增回归测试捕获翻译漂移类问题。
- https://github.com/esengine/DeepSeek-Reasonix/pull/7682

---

## 功能需求趋势

- **桌面端快捷操作**：全局快捷键（#7742）、Git worktree 隔离（#7726）是 8 月桌面端的核心增强方向
- **预设指令/快捷短语**：#7808 请求类似 /pmt 的快捷短语菜单，避免每次手动输入项目背景说明
- **Agent 安全边界**：#7784 中越权 git checkout 引发对 agent 自动操作安全边界的讨论
- **多模型能力一致性**：#7798 期望会话内切换模型时，视觉/功能能力自动同步
- **跨平台 UI 适配**：Windows 缩放异常（#7794、#7799）与 macOS 信息显示不完整（#7800、#7801）说明平台适配仍需加强

---

## 开发者关注点

1. **v1.21.0 稳定性风险**：Windows 闪退（#7809）、Linux/macOS TUI 死锁（#7810 #7811）、启动卡顿（#7812）集中在新版本，建议暂缓升级或先在隔离环境验证。
2. **Windows 平台仍是短板**：TUI 死锁（#7435）、UI 缩放异常（#7799）、更新失败（#7783）均发生在 Windows。
3. **更新器可靠性**：macOS（#7232）与 Windows（#7783）均有更新失败报告，需增强残留状态清理与错误恢复。
4. **Agent 行为的可预测性**：不主动执行 git 等危险操作应成为默认约束，避免信任危机。
5. **性能退化警觉**：#7812 中欢迎页与设置页的加载耗时（10s / 40s）与此前版本差异明显，需排查会话序列化/反序列化路径是否引入 O(n²) 行为。

---

*本日报自动生成，内容基于 GitHub Issues / PR 元数据分析，不代表项目官方立场。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-07

## 今日速览

今日社区聚焦于 **会话（Session）管理体验** 与 **TUI/桌面端可用性** 两大方向：#6152（会话上下文用量可视化）与 #1168（链接可点击）两个老 Issue 分别获得 129 和 119 个 👍，成为社区最强烈的呼声。同时，DeepSeek V4 Flash Free 的上下文元数据错误、Windows 启动失败等新 Bug 引发密集讨论，团队则通过 50 条 PR 持续推进 TUI 命令系统、子代理续跑、工具输出截断等核心能力。

---

## 社区热点 Issues

### 1. [FEATURE] Session context usage（会话上下文用量可视化）
👍 129 | 💬 22 | 作者 @mtymek

希望实现一个 TUI 对话框，展示当前会话上下文窗口的构成明细，类似 Claude 的 `/context` 功能。这是今日热度最高的功能请求，开发者对长会话中上下文消耗的可观测性有强烈需求。
🔗 https://github.com/anomalyco/opencode/issues/6152

### 2. [FEATURE] Make Links Clickable（链接可点击）
👍 119 | 💬 11 | 作者 @jay-tau

请求在 TUI/界面中支持 Ctrl+左键点击 URL 并在默认浏览器打开。该需求已持续一年仍为 Open 状态，累计 119 个 👍，是终端类 AI 工具普遍缺失的基础体验。
🔗 https://github.com/anomalyco/opencode/issues/1168

### 3. [BUG] DeepSeek V4 Flash Free 上下文元数据被错误限制为 200K
👍 1 | 💬 3 | 作者 @abhisheksharma611

models.dev 中 `deepseek-v4-flash-free` 的上下文被标注为 200K，但模型原生支持 1M。开发者认为这是元数据配置问题而非硬件限制，导致长上下文编码任务中模型效用被削弱。
🔗 https://github.com/anomalyco/opencode/issues/40958

### 4. [FEATURE] Cross-project session list / picker for TUI
👍 6 | 💬 15 | 作者 @mskadu

`/sessions` 命令目前仅作用于当前项目，跨多仓库开发时无法统一查看/切换会话，希望增加跨项目的会话列表/选择器。反映了多仓库工作流用户的使用痛点。
🔗 https://github.com/anomalyco/opencode/issues/31932

### 5. [BUG] 订阅 opencode go 之后套餐未生效
💬 13 | 作者 @MrLiaoy

用户反馈已订阅 Go 套餐并收到邮件，但页面仍显示未订阅，且调用时提示 `No payment method`。同类付费订阅问题已多次出现（另有 #40055），涉及计费系统状态同步，值得官方高度重视。
🔗 https://github.com/anomalyco/opencode/issues/40234

### 6. [BUG] Web 界面不会实时刷新会话消息
💬 7 | 作者 @afonsoft

Web 界面中同一会话内的新消息无法实时显示，必须手动刷新页面。影响 Web 端的核心聊天体验。
🔗 https://github.com/anomalyco/opencode/issues/40502

### 7. [BUG] OpenCode 1.18.14 在 Windows 10 + Node.js 26.7 上无法启动
💬 2 | 作者 @28723249

最新版本在 Windows 10 64-bit 环境下启动即报错。今日已出现多个 Windows 相关兼容问题（另有 #40961 桌面端 UI 不显示），Windows 平台的稳定性亟待修复。
🔗 https://github.com/anomalyco/opencode/issues/40957

### 8. [i18n] zh 语言下 token 被翻译为「令牌」，在 LLM 语境中读起来很别扭
💬 0 | 作者 @Speechlessmanbilibili

简体中文环境下，上下文用量面板将 token 译为「令牌」（如「推理令牌」「缓存令牌」），该词更常用于 API 凭据（访问令牌）语境。社区已提交 PR #40977 修正为「词元」，涉及 7 处翻译。
🔗 https://github.com/anomalyco/opencode/issues/40976

### 9. [BUG] 权限对话框按钮被推出屏幕外，长命令无法批准
💬 1 | 作者 @WHAT-BUG

桌面端执行长 shell 命令时，权限确认对话框的「批准」按钮被命令内容挤出可视区域，用户无法点击。涉及超长 `git commit` 等常见场景。
🔗 https://github.com/anomalyco/opencode/issues/40968

### 10. [BUG] 打断轮次时排队消息被静默丢弃
💬 1 | 作者 @zhihanliu-collab

当用户按 Esc 中断长时间工具调用后，排队中的消息会被静默丢弃，且 TUI 与 headless API（`POST /session/:id/abort`）均可复现。开发者定位在 `SessionPrompt.cancel` 逻辑。
🔗 https://github.com/anomalyco/opencode/issues/40955

---

## 重要 PR 进展

### 1. fix(i18n): 简体中文 locale 中 token 译为「词元」
作者 @Speechlessmanbilibili | Closes #40976

将 7 处 zh 翻译中的「令牌」替换为「词元」，避免 LLM 语境中的术语混淆。
🔗 https://github.com/anomalyco/opencode/pull/40977

### 2. fix(desktop): 关闭窗口时保留 macOS 应用运行
作者 @opencode-agent[bot] | 贡献者友好

macOS 下关闭最后一个窗口后应用不再退出，Dock 点击可恢复窗口，同时保持 Windows/Linux 原有行为，并包含窗口注册表测试。
🔗 https://github.com/anomalyco/opencode/pull/40974

### 3. fix(provider): 自定义模型转发 agent 级 temperature
作者 @SeashoreShi

修复 `provider.<id>.models` 中自定义模型默认 `temperature: false` 的问题，确保 agent 级温度设置不被静默丢弃，使自定义 OpenAI 兼容提供商与内置模型行为一致。
🔗 https://github.com/anomalyco/opencode/pull/40973

### 4. feat(tui): 向插件暴露稳定的 prompt action 命令
作者 @mustfsb | Closes #40953

为 TUI 插件提供 `form.option.previous` 等稳定命令，替代匿名的内联按键绑定，使插件可自定义表单与权限 prompt 的导航/主操作。
🔗 https://github.com/anomalyco/opencode/pull/40971

### 5. feat(core): 支持继续子代理会话
作者 @opencode-agent[bot]

新增可选 `sessionID` 输入，可延续已有前台子代理会话，同时校验父会话归属与代理身份，并在完成信封中暴露可复用的 sessionID。
🔗 https://github.com/anomalyco/opencode/pull/40931

### 6. feat(core): 限制工具输出大小
作者 @rekram1-node

按配置的行/字节限制截断顶层工具文本，完整内容保留至托管文件并清理 7 天前的旧文件；尊重工具自身的 `metadata.truncated` 标记。
🔗 https://github.com/anomalyco/opencode/pull/40929

### 7. feat(tui): Option+Enter 排队发送 prompt
作者 @opencode-agent[bot]

Enter 直接操控当前响应，Option+Enter / Alt+Enter 将 prompt 排入紧凑停靠栏，并以 `<count> queued · <first prompt>` 形式汇总，实现类似 Claude Code 的排队机制。
🔗 https://github.com/anomalyco/opencode/pull/40922

### 8. fix(llm): 流式 delta 中空 tool call id 视为缺失
作者 @Curzibn

阿里云 DashScope 等 OpenAI 兼容端点会在续传 delta 中发送空字符串 id，导致 `OpenAI Chat tool call delta is missing id or name` 报错。此 PR 将空 id 作为缺失处理。
🔗 https://github.com/anomalyco/opencode/pull/40969

### 9. feat(core): 工作区环境基础模块
作者 @kitlangton

新增纯增量模块：以 `ChildProcessSpawner` 为驱动契约，`Files` 派生自该 Effect；原生驱动可提供快速路径覆盖。当前未被任何模块消费，为后续架构铺路。
🔗 https://github.com/anomalyco/opencode/pull/40967

### 10. fix(ai): 支持无 finish_reason 的流式响应
作者 @rekram1-node

当 `compatibility.requireFinishReason` 为 `false` 时，对非空干净 EOF 合成 `unknown` 终止符；协议终止逻辑改为可选 effectful，使 OpenAI Chat 能正确收尾累积的工具调用。
🔗 https://github.com/anomalyco/opencode/pull/40965

---

## 功能需求趋势

### 1. Session 管理与可观测性（热度最高）
- 上下文用量可视化（#6152, 👍129）
- 跨项目会话选择器（#31932）
- 从会话选择器中搜索会话内容（#38973）

### 2. TUI 交互体验
- 链接可点击（#1168, 👍119）
- 表单/权限 prompt 对插件开放稳定命令（#40953）
- 会话统计信息（#37760）

### 3. Web/桌面端完善
- Web 界面实时刷新（#40502）
- 跨项目/路径项目添加（#40963）
- macOS 窗口生命周期管理（PR #40974）

### 4. 多模型与提供商兼容
- DeepSeek 上下文元数据修正（#40958）
- 流式响应缺 id / finish_reason 的容错（PR #40969/#40965）
- 自定义模型 temperature 转发（PR #40973）

### 5. 本地化（i18n）
- 中文术语准确性（#40976，已由 PR #40977 修复）

---

## 开发者关注点

### 付费/订阅问题频发
- 订阅后套餐未生效、`No payment method` 报错（#40234、#40055）反复出现，影响付费用户信任，建议优先排查计费状态同步。

### Windows 平台稳定性堪忧
- 1.18.14 启动失败（#40957）、桌面端 UI 不显示（#40961）、PowerShell 残留花屏（#11748），Windows 用户覆盖场景亟需回归测试。

### 中断与异常处理
- 消息排队后被打断即静默丢弃（#40955）、`state.json.lock` 残留目录导致崩溃（#40972），异常路径的数据安全性是核心开发者的重点关切。

### 长命令/长内容场景的对话框可用性
- 权限对话框按钮被推出屏幕（#40968）是 TUI/桌面端在真实 CLI 工作流（如长 git commit）中的直观阻碍。

### 流式响应兼容性
- 多个 Issue/PR 指向流式协议细节（空 id、缺 finish_reason、末尾 delta 丢失），说明 OpenAI 兼容生态下厂商差异仍是接入成本的主要来源。

---

> 以上为 2026-08-07 OpenCode 社区动态摘要，数据来源 github.com/anomalyco/opencode。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-08-07）

## 今日速览

今日最重磅的是 v0.21.7 正式版发布：移除 Goals 的 50 轮限制，并在交互式 CLI 中支持终端内联图像渲染。社区方面，「daemon 多工作区环境变量泄漏」的 bug 上报（#8653）与新一批环境隔离修复 PR 形成了今日最集中的技术话题；与此同时，大量 PR 持续通过 autofix/takeover 自动化流程合入，覆盖工作流暂停恢复、审查工具链路优化与飞书/钉钉集成增强。

## 版本发布

### v0.21.7（正式版）
- 移除 Goals 的 50 轮限制，任务可越过原边界恢复并继续执行（[#8421](https://github.com/QwenLM/qwen-code/pull/8421)）
- 交互式 CLI 支持渲染来自模型输出的终端内联图像

### v0.21.7-nightly.20260807.fca8f3c1f
- 修复 CI 中 autofix takeover 准入被阻塞时的显示问题（[#8410](https://github.com/QwenLM/qwen-code/pull/8410)）

### live-host-v0.1.0（Qwen Live Host）
- 在 ECS 上运行 Windows merge queue 测试（[#8386](https://github.com/QwenLM/qwen-code/pull/8386)）
- 为 GitHub 审查准备证据图像工具链

### live-host-latest
- 稳定版 Qwen Live Host 安装源更新

## 社区热点 Issues

过去 24 小时共有 3 条 Issue 更新：

1. **[#8653] daemon 多工作区会话继承另一工作区的 harness 环境（NODE_OPTIONS/PATH 泄漏）**（[链接](https://github.com/QwenLM/qwen-code/issues/8653)）
   - 标签：`status/needs-triage`, `type/bug`
   - 作者：@wenshao | 评论：1
   - **重要性**：环境变量跨工作区泄漏可能导致构建/校验行为异常，甚至引发意外副作用。这是当前处于 tracing 阶段、最需要尽快复现定位的高优先级 bug。

2. **[#8551] 为文档站与 README 语言栏添加韩语（ko）**（[链接](https://github.com/QwenLM/qwen-code/issues/8551)）
   - 标签：`priority/P3`, `type/feature-request`, `scope/documentation`
   - 作者：@ken-jo | 评论：4
   - **重要性**：文档多语言覆盖扩展到韩语，社区反馈活跃（4 条评论），说明非英语用户对文档本地化的持续诉求。

3. **[#7167] Fleet Shepherd Dashboard**（[链接](https://github.com/QwenLM/qwen-code/issues/7167)）
   - 标签：`status/need-information`, `scope/ci-cd`
   - 作者：@qwen-code-dev-bot | 评论：3
   - **重要性**：自动维护的 CI/CD 仪表板，追踪 PR 状态与调度信息。虽对普通用户不直接可见，但反映了项目在自动化工程效率上的投入。

## 重要 PR 进展

以下是 50 条更新 PR 中值得关注的 10 条：

1. **[#8525] fix(core): 解决 Qwen 3.8 reasoning budget 冲突**（[链接](https://github.com/QwenLM/qwen-code/pull/8525)）
   - 防止 DashScope Qwen 3.8 请求同时携带 `reasoning_effort` 与 `thinking_budget`，按既有优先级规则消除配置层冲突，直接影响 Qwen 3.8 用户。

2. **[#8658] perf(review): 将远程匹配逻辑移入 CLI**（[链接](https://github.com/QwenLM/qwen-code/pull/8658)）
   - 将 `/review` 的 Git 远程解析从模型文本生成改为确定性 `qwen review match-remote` 子命令，减少编排负担，提升审查工具的可信度与速度。

3. **[#8320] feat(workflows): 为动态工作流添加协作暂停与恢复**（[链接](https://github.com/QwenLM/qwen-code/pull/8320)）
   - 新增 pause-aware 调度器，暂停时不再派发新 agent，等待在飞任务收敛并暂存结果，支持运行级恢复。

4. **[#7897] fix(cli): 在 WSL/ConPTY 下跳过终端重绘优化器**（[链接](https://github.com/QwenLM/qwen-code/pull/7897)）
   - 修复 Windows Terminal + WSL 下流式文本重复渲染 bug（[#7634](https://github.com/QwenLM/qwen-code/issues/7634)），对 WSL 用户是刚需修复。

5. **[#8619] fix(desktop): 剥离 Windows verbatim 路径前缀**（[链接](https://github.com/QwenLM/qwen-code/pull/8619)）
   - 用 `dunce::canonicalize` 替换 `std::fs::canonicalize`，解决 Windows 桌面端工作区路径 `\\?\` 前缀问题。

6. **[#8594] fix(desktop): 内置浏览器失败时回退到系统浏览器**（[链接](https://github.com/QwenLM/qwen-code/pull/8594)）
   - 修复桌面端 markdown 链接点击无响应的问题（[#8593](https://github.com/QwenLM/qwen-code/issues/8593)）。

7. **[#8601] fix(web-shell): 移动端 composer 保持于聊天面板底部**（[链接](https://github.com/QwenLM/qwen-code/pull/8601)）
   - 多移动端特性同时开启时，修复空会话 composer 错位，改善 Web Shell 移动端输入体验。

8. **[#8559] feat(web-shell): 改进并行 agent 活动反馈**（[链接](https://github.com/QwenLM/qwen-code/pull/8559)）
   - 并行子代理运行时状态停留在会话尾部、详情自动展开、结束时向上过渡收起，提升 Web Shell 中并行任务的可见性。

9. **[#8639] feat(dingtalk): 入站上下文包含非 bot 提及目标标识符**（[链接](https://github.com/QwenLM/qwen-code/pull/8639)）
   - 将 DingTalk 群消息中提及的非 bot 成员以稳定标识符带入上下文，增强群聊 C2B 场景处理能力。

10. **[#8569] feat(feishu): 丰富 observed contact 标签**（[链接](https://github.com/QwenLM/qwen-code/pull/8569)）
    - 为飞书 observed-contact 条目补充发送者显示名与群名称，后台解析并写入 enriched observation，完善飞书集成审计信息。

## 功能需求趋势

综合本次 Issue 与 PR 数据，社区最关注的功能方向包括：

- **多语言文档与本地化**：韩语文档请求（#8551）表明文档国际化覆盖仍在持续扩展。
- **终端体验与渲染正确性**：内联终端图像、窄终端命令名保留、WSL/ConPTY 重绘优化等多项 PR，显示终端在多平台上的渲染一致性是重点。
- **工作流与并行执行能力**：协作暂停/恢复、并行 agent 活动反馈、Agent View 会话生命周期等，反映用户对长时间运行、多代理编排的需求增强。
- **自动化审查与 CI 基础设施**：remote matching 移入 CLI、capture-tui 证据图像、Fleet Shepherd Dashboard，标明项目正在将审查工程化。
- **外部集成（飞书/钉钉）与外部上下文**：群配对、非 bot 提及标识符、Mem0 内存写入等，说明 Chat 渠道与记忆扩展是热门方向。

## 开发者关注点

- **环境隔离与密钥安全**：#8653 daemon 环境泄漏与 PR #6606（清理 shell 子进程环境中的内部密钥）共同指向：daemon 模式下会话隔离和密钥清洗需要更严格。
- **Windows/WSL 平台体验**：WSL + Windows Terminal 文本重复、Windows verbatim 路径前缀、桌面内置浏览器失效，多个平台相关修复集中出现。
- **CLI 可信度与可操作性**：斜杠命令在窄终端中的完整性、瞬时命令从历史中剔除、Agent View 生命周期管理，都是高频交互场景下的细节打磨。
- **自动化修复工作流进入常态**：大量 PR 带有 `autofix/takeover` 标签，说明 bot 驱动的代码修复流程已成为 Qwen Code 日常开发的一部分。
- **审查流程对证据依赖增强**：从「解释渲染问题」到「capture-tui 截图留证」，审查工具正转向确定性证据链，提升 UI 类缺陷的可验证性。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报 — 2026-08-07

## 今日速览

今日无新版本发布，社区焦点集中在 **repo 级 god-file 分解 Epic**（#78647 已积累 53 条评论）与一批**桌面端体验和跨平台兼容性修复 PR**的集中落地。功能需求方面，多设备同时观看同一会话（#80723）和超长粘贴自动转文件附件（#80716）是今天最受关注的新方向。

## 社区热点 Issues

1. **[#78647] Epic: Shard all 20 god files — repo-wide god-file decomposition**
   - **标签**: P3 / needs-decision / 重构 / 架构
   - **为什么重要**: Repo 级 sharding 政策（2026-08）的纲领性 Issue，要求所有 god file 必须拆分为干净模块且不可回退。已有 53 条评论，是当前社区讨论最密集的架构议题。
   - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/78647)

2. **[#80710] [Bug]: Desktop 自更新在 Windows 上可破坏现有运行时**
   - **标签**: P2 / Windows / 安装更新
   - **为什么重要**: Hermes Desktop v0.20.0 在 Windows 上更新失败时可能损坏现有 Python 运行时，严重性超出普通更新失败。Windows 用户受影响面大，社区关注度高。
   - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/80710)

3. **[#80723] 一个 live session 只能被一台设备观看 — WS 事件路由只有单一传输槽**
   - **标签**: P3 / 功能 / 会话状态 / 消息投递
   - **为什么重要**: 同一运行会话在第二台设备打开时，第一台会静默"被接管"。这是实现"合上笔记本、任务继续跑、换设备看结果"工作流的关键阻碍。
   - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/80723)

4. **[#78635] Shard agent/auxiliary_client.py（god-file 分解）**
   - **标签**: P3 / needs-decision / 重构
   - **为什么重要**: `agent/auxiliary_client.py` 在 main 分支上已达 **9,924 行**。作为 god-file 分解 Epic 首批拆解目标，涉及辅助调用的核心路径，社区有 7 条讨论。
   - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/78635)

5. **[#78632] Shard hermes_cli/kanban_db.py（god-file 分解）**
   - **标签**: P3 / needs-decision / 重构
   - **为什么重要**: `hermes_cli/kanban_db.py` 达 **10,275 行**，是当前最大的 god file 之一。Kanban 子系统长期膨胀，拆分方案将直接影响 CLI 和 Desktop 的 Kanban 功能维护性。
   - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/78632)

6. **[#74411] Desktop SSH 模式: 版本检查参数顺序错误，误报功能不支持**
   - **标签**: P2 / SSH / 安装更新 / 桌面端
   - **为什么重要**: 对 git/source 安装（venv 非 console-script）会误报 `--ssh-session-token-file` 等参数不支持，阻断 SSH 模式使用；`remoteHermesPath` 覆盖也被忽略。影响所有源码安装用户的远程连接。
   - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/74411)

7. **[#66622] [Feature]: 将超长粘贴文本转换为 Desktop 编辑器中的文件附件**
   - **标签**: P3 / 桌面端 / 功能
   - **为什么重要**: 粘贴超长文本会淹没输入框、混淆真实指令与素材。社区建议类似 ChatGPT 的"自动转 .txt 附件"方案，今天已有对应 PR（#80716）。
   - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/66622)

8. **[#80522] [Bug]: zero-match casing probe 仅提示不返回路径，弱模型陷入重复搜索（测出 +6 turns）**
   - **标签**: P3 / 工具 / 搜索
   - **为什么重要**: 搜索探针明明已找到大小写不匹配的文件路径却只给提示不给路径，强模型能一步转向，弱模型平均多花 6 轮重复搜索，直接影响推理成本与响应质量。
   - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/80522)

9. **[#80720] Kanban 附件行应支持打开、预览、Quick Look 和文件显示**
   - **标签**: P3 / 桌面端 / Cron
   - **为什么重要**: 桌面端 Kanban 附件目前只能干瞪眼，社区要求补齐「点击打开（本地文件系统）」「内置预览（Markdown 渲染/图片）」「Quick Look」「在 Finder 中显示」四类操作，是桌面体验的重要缺口。
   - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/80720)

10. **[#80726] [Bug]: 点击不同项目 session 时右侧文件浏览器不切换**
    - **标签**: Bug / 桌面端
    - **为什么重要**: 中文社区反馈的桌面端问题：当 session 属于不同 project scope 时，右侧文件浏览器不会切换到对应工作目录，影响多项目并行开发的效率。
    - [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/80726)

## 重要 PR 进展

1. **[#80711] Sidebar pin/unpin 真正持久化，不再"自动重排"**
   - **说明**: 修复 pin 从未持久化（后端 PATCH 拒绝 'pinned' 返回 400）、手动排序漂移、桌面端与后端不同步等一系列"sidebar 自己乱动"问题。关联 #75468。
   - **状态**: 已合并
   - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/80711)

2. **[#80724] 持久化每条消息的 token_count（来自 response usage）**
   - **说明**: `messages.token_count` 列存在但从未有代码写入 — 全部 20,930 条消息均为 NULL。此修复让各上下文窗口组件的真实成本可测，为压缩决策提供数据支撑。
   - **状态**: 待审查
   - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/80724)

3. **[#80716] feat(desktop): 超过 10k 字符的粘贴自动转为 .txt 附件 chip**
   - **说明**: 对齐 ChatGPT 2026-08-04 发布的大段粘贴处理方式，防止长文本淹没输入框。与 #66622 对应。
   - **状态**: 待审查
   - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/80716)

4. **[#80714] fix(tools): zero-match probe 返回已找到的候选路径**
   - **说明**: 修复 #80522 — 大小写不匹配/隐藏/忽略文件的探针结果不再只给提示，而是把路径直接交给模型，消除弱模型的重复搜索螺旋。
   - **状态**: 待审查
   - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/80714)

5. **[#80717] read_file: UTF-16 文本文件转码为 UTF-8，不再误判为二进制**
   - **说明**: Windows 记事本和 PowerShell 重定向默认输出 UTF-16，此前内容到达模型时已是 U+FFFD 乱码。该 PR 在读取时自动转码。
   - **状态**: 待审查
   - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/80717)

6. **[#80713] fix(desktop): 仅对最后一个聊天窗口关闭时弹确认**
   - **说明**: 多窗口场景下，关闭次要窗口不应拦截；仅当最后一个窗口关闭且会话仍在进行中时确认，防止误关任务。
   - **状态**: 待审查
   - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/80713)

7. **[#80721] 长时会话跨天时通知日期变更，不触碰 prompt cache**
   - **说明**: 从 kimi-code 移植。系统提示保持字节级稳定（prompt-cache 不变量），仅在下一轮注入一行日期变更提示，防止模型用过期日期推理。
   - **状态**: 待审查
   - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/80721)

8. **[#80712] MCP 工具结果的 _meta 透传给模型（过滤协议保留键）**
   - **说明**: 从 kimi-code 移植。此前 MCP 服务器返回的 `_meta` 字段被整体丢弃，包含校验负载、浏览器交接 URL 等结构化契约信息无法被模型感知。
   - **状态**: 待审查
   - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/80712)

9. **[#71884] fix(gateway/signal): 用 /v1/receive 轮询替代失效的 /v1/events SSE**
   - **说明**: signal-cli-rest-api v0.100+ 已不提供 SSE 端点，当前 SignalAdapter 收不到消息。改轮询后兼容实际运行版本。
   - **状态**: 待审查 / BLOCKED
   - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/71884)

10. **[#78321] fix(agent): 剥离堆叠的不受支持的辅助参数（temp + max_tokens）**
    - **说明**: 对同时拒绝 `temperature` 和 `max_tokens` 的推理模型，此前只剥离 temp 重试仍会 400。现在按序剥离两个参数，保证标题生成等辅助调用可用。
    - **状态**: 待审查
    - [查看 PR](https://github.com/NousResearch/hermes-agent/pull/78321)

## 功能需求趋势

- **会话状态可靠性与跨设备**: pin/unpin 持久化（#75468/#80711）、多设备同时观看同一会话（#80723）表明社区正推动"会话不中断、状态可迁移"的使用模式。
- **桌面端输入与文件体验**: 超长粘贴自动转附件（#66622/#80716）、Kanban 附件打开/预览/Quick Look（#80720）显示桌面端正在从"能跑"走向"好用"。
- **AI 上下文工程**: token_count 持久化（#80724）、不触碰 prompt cache 的日期变更通知（#80721）、MCP `_meta` 透传（#80712）——社区在精细化控制上下文成本与模型感知能力。
- **Windows 平台补强**: 自更新保护（#80710）、UTF-16 文件读取（#80717）、末窗口关闭守卫（#80713）、SSH 模式检查修复（#74411），一天 4 个 Windows 相关 PR/Issue，平台成熟度是当前重点。
- **代码库可维护性**: god-file 分解已从建议升级为 repo 级政策，20 个 god file 将分批拆解，是未来数周持续性的架构话题。

## 开发者关注点

- **God-file 拆分是当前最大痛点**: 3 个相关 Issue 共 67 条评论，超过今日所有 Issue 评论量的一半；`kanban_db.py`（10,275 行）与 `auxiliary_client.py`（9,924 行）被点名为首批拆解目标。
- **敏感信息 redact 存在误伤**: `Authorization` 头匹配器会把普通冒号分隔的散文（如 "not authorization: release only..."）也打码，影响日志可读性（#72774）。
- **搜索探针信息不完整**: zero-match 探针"只提示不给出路径"导致弱模型平均多消耗 6 轮推理轮次，开发者希望工具直接返回已找到的路径而非提示。
- **成本数据长期缺失**: `token_count` 列从未被写入，所有压缩/上下文窗口管理决策都在"盲飞"状态，补数据是当务之急。
- **更新流程可靠性**: Windows 自更新可能损坏已有运行时的报告（#80710）引发了社区对更新机制安全性的担忧，预计会有后续的更新回滚/校验机制讨论。

</details>
