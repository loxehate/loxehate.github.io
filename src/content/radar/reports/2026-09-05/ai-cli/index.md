---
title: "AI CLI 工具社区动态日报"
published: 2026-09-05
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-05

> 生成时间: 2026-09-05 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告

**数据周期**：2026-09-04 ~ 2026-09-05
**覆盖工具**：Claude Code / OpenAI Codex / Gemini CLI / DeepSeek Reasonix / OpenCode / Deepseek Harness / Hermes

---

## 1. 生态全景

当前 AI CLI 工具已进入**"基础设施级深耕"阶段**——头部工具（Claude Code、Codex）的日均 Issue/PR 量稳定在 40+，关注点从"模型能不能跑起来"转向**Windows/macOS 桌面端稳定性、多 Agent 协作可观测性、MCP/Provider 生态互通、可编程扩展（Hooks/Plugins）**四大纵深方向。中小体量工具（Harness、Hermes、Reasonix）则处于早期产品形态打磨期，重点解决核心交互（Web 上传、Agent 循环显式化、容器兼容）。整体看，**"Agent 行为可控性"与"长期会话资源治理"**是横跨所有工具的共性瓶颈，而 GPT-6 Astra 的接入则在 24 小时内同时触发了 OpenCode、Codex、Hermes 三方的协同修复。

---

## 2. 各工具活跃度对比

| 工具 | Issues 更新 | PR 更新 | Release | 关键信号 |
|------|-------------|---------|---------|---------|
| **Claude Code** | 49 | 2（近 24h） | v2.1.261 | 1 条 97 评论提案（Function Hooks）+ 5+ 条 Desktop 进程锁簇 |
| **OpenAI Codex** | 44 | 50 | v0.153.3 / v0.153.4 / v0.154.0-α.3 | 24h 双补丁，Astra 默认化 |
| **Gemini CLI** | ~15 | ~15 | v0.60.0-nightly | MCP OAuth RFC 9207 合规 |
| **DeepSeek Reasonix** | 13 | 15 | v1.37.0 + Studio v2.12.0 | Agent 核心重构、缓存命中率 4.2%→54.7% |
| **OpenCode** | 10+ | 50 | v1.18.28 / v1.18.29 | v2 (opencode2) 持续推进，PR 量第一 |
| **Deepseek Harness** | 0（24h） | 0（24h） | v0.1.3-alpha.1 | 社区静默期，alpha 版本 |
| **Hermes** | 12 | 50 | 无新版本 | 6 项 GPT-6 Astra 集成子任务 |

> 注：Hermes、OpenCode PR 数较高反映 v2/新架构的密集提交，与"社区活跃度"不完全等价。

---

## 3. 共同关注的功能方向

### 3.1 Windows 桌面端稳定性（最普遍痛点）

| 工具 | 代表性议题 |
|------|-----------|
| Claude Code | #42776 / #51847 / #91745（文件锁、exclusiveCwd 硬编码） |
| OpenAI Codex | #32164 / #25826（Remote Control 卡死、多显示器溢出） |
| Gemini CLI | #21983（Wayland 兼容，Linux 侧同类问题） |
| DeepSeek Reasonix | #9782 / #9726 / #9792 / #9786（滚动抖动、闪屏，Windows 11 70%） |
| Hermes | #103288 / #103291 / #102408（OpenSSH 死循环、安装失败、PTY 阻塞） |

**共性诉求**：进程生命周期管理（文件锁/守护进程）、打包格式（MSIX/Electron）下的权限模型、特殊字符路径处理。

### 3.2 多 Agent / Subagent 可观测性与资源治理

| 工具 | 代表性议题 |
|------|-----------|
| Claude Code | #81300（多 agent 编排 fidelity） |
| OpenAI Codex | #34061（subagent 磁盘爆炸）、#26984（MCP stdio FD 泄漏） |
| Gemini CLI | #22323（subagent GOAL 误报）、#21409（generalist 挂起） |
| OpenCode | #46109（subagent 侧边栏可视化） |
| DeepSeek Reasonix | v1.37.0（Agent 循环显式化） |
| Hermes | #103272（cron 退出码）、#103294（工具集收敛） |

**共性诉求**：subagent 状态可追踪、磁盘/FD 资源回收、长会话不卡死、失败语义统一（fail-closed）。

### 3.3 MCP / Provider 生态互通

- **Claude Code**：#52586（Routines 不能用 Claude.ai Connectors）、#61682（GitHub 连接器假阳性）
- **Codex**：#26984（stdio FD 泄漏）、懒加载 MCP server 需求
- **Gemini CLI**：#29200（统一强制 MCP 策略，fail-closed）
- **OpenCode**：#47389（MCP 命名空间避免顺序竞争）

**共性诉求**：MCP 工具注册的可控性、跨平台一致性、连接器诊断能力。

### 3.4 模型可配置粒度（GPT-6 Astra 接入潮）

- **OpenAI Codex**：v0.153.4 Astra 设为默认，Plan mode 独立模型请求（👍 23）
- **OpenCode**：#47363（OAuth 下 Astra 不显示，已修）
- **Hermes**：#103015 + 5 个子任务（OpenAI Responses 路径全栈适配）

**共性诉求**：模型选择器的灵活可见性、新模型零延迟接入、cache 友好的推理更新。

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 企业级可观测性 + Plugins 可编程化 | 企业团队、长流程复杂任务 | 重 Org policy / Function Hooks / 权限模型 |
| **OpenAI Codex** | 多模型多 Provider + 多 Agent 安全边界 | 全栈开发者、追求最新模型 | Guardian 评审 + 上下文压缩鲁棒性 + musl/jemalloc |
| **Gemini CLI** | MCP OAuth 安全 + Agent 子代理成熟化 | Google Cloud / 多模态用户 | AST 感知读取（token 经济）、Browser Agent 韧性、Auto Memory 安全化 |
| **DeepSeek Reasonix** | Agent 循环显式化 + Harness 风格契约 | 成本敏感、DeepSeek 模型用户 | 模型级能力元数据替代手工配置、远程工作区、ModelScope 预设 |
| **OpenCode** | 跨 Provider + SDK 边界 + TUX 可定制 | 高级开发者、多模型切换场景 | v2 (opencode2) 架构重构、原生 Headers 处理、ACP v2 协议跟进 |
| **Deepseek Harness** | Web 端文件多模态 + 企业代理 | 内网部署 / Python SDK 用户 | alpha 阶段，聚焦大文件上传 / 代理环境变量 |
| **Hermes** | 多模态交互（实时语音）+ 多平台 Agent 网关 | 多平台 Agent 编排者 | WebSocket VAD/STT/TTS、cron 工具集收敛、SSRF 防护 |

---

## 5. 社区热度与成熟度

### 高活跃度（成熟期）
- **Claude Code**：49 条 Issue 中单条 Function Hooks 提案 97 评论/61 👍，表明用户已具备深度定制诉求，生态扩张意愿强烈
- **OpenAI Codex**：50 PR/日 持续推进 v0.154，节奏最稳定
- **OpenCode**：50 PR/日 + 多个 contributor（@kitlangton、@iceteaSA）持续打磨"消除隐式成本"型 PR，v2 架构已进入打磨中后期

### 中活跃度（快速迭代期）
- **Gemini CLI**：daily-nightly 节奏稳定，P1 Bug 收敛快（多个 PR 当日合并）
- **Hermes**：PR 量高（50）但 Issues 数量适中，处于"新模型集成+安全加固"双线并进

### 低活跃度（早期阶段）
- **DeepSeek Reasonix**：v1.37.0 推送大重构，但 Windows 渲染 Bug 跨 3 版本未根治，社区反馈集中在基础稳定性
- **Deepseek Harness**：α 阶段，Issue/PR 静默，处于产品定义期

---

## 6. 值得关注的趋势信号

### 信号一：Hooks/Plugins 可编程化是下一阶段生态竞争焦点

Claude Code #91870（Function Hooks，97 评论/61 👍）的爆发不是孤立现象——OpenCode 通过原生插件（#47389）、Gemini CLI 通过 MCP 策略统一（#29200）、Codex 通过 subagent 编排（#40037）都在向"Agent 运行时可深度定制"方向收敛。

> **对开发者的参考价值**：评估 AI CLI 工具时，应将"扩展点设计"作为核心指标，而非单纯比较模型能力。

### 信号二：长期会话的资源治理已成生产化部署的最大障碍

Codex 的 MCP FD 泄漏（#26984）、Subagent 磁盘爆炸（#34061）；Reasonix 的 4 MiB 日志截断（#9795）、Token 计费偏差（#9791）；Hermes 的 cron 退出码错误（#103272）——多工具同时在"资源生命周期管理"上集中报错。这反映 **AI CLI 工具正从"演示可用"快速进入"企业生产可用"阶段**，可靠性工程成为分水岭。

> **对开发者的参考价值**：选择 CLI 工具时需评估其长会话稳定性和资源回收机制；自部署时务必配置外部监控。

### 信号三：Windows 平台成为"二等公民"现象普遍化

5 个工具（Claude Code / Codex / Gemini / Reasonix / Hermes）均在 24h 内曝出 Windows 相关 P1/P2 Bug，且多为文件锁、PTY、特殊字符路径、SSH 路径硬编码等基础设施问题。这与 Anthropic / OpenAI / Google 主团队以 macOS/Linux 为开发环境的现实高度相关。

> **对开发者的参考价值**：Windows 用户在工具选型时应优先考虑有活跃 Windows 维护者（PR 作者、issue 响应者）的项目；可关注 OpenCode、Hermes 等在 Windows 上投入较多 PR 的项目。

### 信号四：GPT-6 Astra 触发跨工具协同修复潮

OpenAI Codex（v0.153.4 默认化）、OpenCode（v1.18.29 OAuth 显示修复）、Hermes（6 个集成子任务 #103015）在同一日内同步推进 Astra 适配，且均涉及 OAuth/Provider/压缩路径——表明**新模型接入已从单一工具事件演变为生态级联动**。

### 信号五："失败语义"（fail-closed）成为安全共识

Hermes #101778（YAML 解析失败时拒绝迁移）、Gemini CLI #29200（空 allowlist fail-closed）、#103294（cron 工具集收敛）、Codex #42852（Guardian 在压缩后保留根指令）——多个独立项目在同一天内集中推动 fail-closed 策略，反映出 AI Agent 工具在权限/状态管理上正从"宽松默认"向"严格默认"收敛。

> **对开发者的参考价值**：选择工具时优先考虑 fail-closed 默认值；自研扩展时应避免"宽松解析+继续执行"的反模式。

---

## 结语

2026 年 9 月的 AI CLI 生态正在经历**从"模型封装"到"Agent 运行时"**的范式转移。短期看，Windows 稳定性、长期会话资源治理、可编程扩展是三大决胜战场；长期看，Agent 协议标准化（ACP v2）、多模态语音交互（Hermes WebSocket VAD）、cache 友好的推理更新将塑造下一代工具的差异化壁垒。开发者选型时建议重点关注**扩展点设计、失败语义、Windows 投入度、新模型响应速度**四个维度。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据周期**：截至 2026-09-05
**数据源**：github.com/anthropics/skills 仓库 PR & Issues

---

## 1. 热门 Skills 排行（按关注度）

| 排名 | Skill / PR | 核心功能 | 状态 | 热度信号 |
|---|---|---|---|---|
| 1 | **[#1298 fix(skill-creator) run_eval.py 0% recall](https://github.com/anthropics/skills/pull/1298)** | 修复 Skill 描述优化循环的核心 bug：评估脚本对所有 skill 都报 recall=0%，导致描述优化基于噪声进行 | OPEN | 关联 10+ 独立复现 issue #556，跨平台修复（Windows pipe 读取、并行 worker） |
| 2 | **[#1367 self-audit skill](https://github.com/anthropics/skills/pull/1367)** | 输出交付前的自审计 Skill：先做机械文件验证，再做四维推理审计（按损害严重度排序），通用型 | OPEN | 与 issue #1385 的三门质量闸门提案联动 |
| 3 | **[#1628 Hivemind 多 Agent 编排](https://github.com/anthropics/skills/pull/1628)** | 让 Claude Code 将机械任务委派给 headless opencode worker（用免费模型），主模型专注规划/审核/合并 | OPEN | 解决"昂贵模型的上下文才是稀缺资源"的成本痛点 |
| 4 | **[#514 document-typography](https://github.com/anthropics/skills/pull/514)** | 生成文档的排版质量控制：孤儿词、寡头段落、编号错位 | OPEN | 解决"每份 Claude 生成的文档都受此影响"的通用痛点 |
| 5 | **[#486 ODT skill](https://github.com/anthropics/skills/pull/486)** | OpenDocument 格式（.odt/.ods）创建、模板填充、HTML 互转 | OPEN | 补齐开源办公格式支持（与 PDF/DOCX 并列） |
| 6 | **[#1615 scnet-hpc](https://github.com/anthropics/skills/pull/1615)** | SCNet 高性能计算集群操作：profile 化 SSH、Slurm 作业管理 | OPEN | 垂直 HPC 场景，向科学计算用户群渗透 |
| 7 | **[#568 ServiceNow](https://github.com/anthropics/skills/pull/568)** | ServiceNow 平台全栈：ITSM/ITOM/SecOps/FSM/SPM/CSDM/IntegrationHub | OPEN | 企业 SaaS 平台 Skill，IT 运维场景 |
| 8 | **[#210 frontend-design](https://github.com/anthropics/skills/pull/210)** | 前端设计 Skill 的可执行性增强：每条指令都可在单轮会话内执行 | OPEN | 设计类基础 Skill 优化 |

> 注：原数据中 PR 评论数列显示为 undefined，排行综合依据为 issue 关联度、跨 PR 联动、创建/更新时序及社区关注信号。

---

## 2. 社区需求趋势（来自 Issues）

按诉求强度排序：

### 🔒 安全与信任（最热，43 评论）
- **[#492 anthropic/ 命名空间冒充](https://github.com/anthropics/skills/issues/492)** —— 社区 Skill 借 anthropic/ 前缀冒充官方，破坏信任边界。社区呼吁官方命名/审核机制。

### 🏢 企业协作（16 评论）
- **[#228 组织级 Skill 共享](https://github.com/anthropics/skills/issues/228)** —— 急需 org-wide skill library + 分享链接，省去手动下载上传流程。

### 🐛 工具链可靠性（12 评论）
- **[#556 run_eval.py 0% 触发率](https://github.com/anthropics/skills/issues/556)** —— Skill 描述优化反馈回路失效，Windows 兼容性差。

### 🧠 长上下文与记忆压缩（9 评论）
- **[#1329 compact-memory](https://github.com/anthropics/skills/issues/1329)** —— 长时 Agent 自身的笔记/记忆占用大量 context，提议用符号化记法压缩。

### 🛡️ 治理与质量门禁（6 评论）
- **[#412 agent-governance](https://github.com/anthropics/skills/issues/412)** / **[#1385 三门质量闸门](https://github.com/anthropics/skills/issues/1385)** —— 政策执行、威胁检测、信任评分、审计追溯；推理质量交付前校验。

### ⚙️ 上下文窗口管理（4 评论）
- **[#1487 claude-api 注入 156k tokens](https://github.com/anthropics/skills/issues/1487)** —— Skill 自身设计缺陷，单次工具调用耗尽上下文。

### 🔌 互操作性（4 评论）
- **[#16 Skills 暴露为 MCP](https://github.com/anthropics/skills/issues/16)** / **[#29 与 Bedrock 集成](https://github.com/anthropics/skills/issues/29)** —— 跨平台、跨协议消费 Skill 的标准路径。

---

## 3. 高潜力待合并 PR

按"问题严重度 × 已就绪度"排序，最有可能近期落地：

| PR | Skill | 落地理由 |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评估修复 | 阻塞整个描述优化流程；10+ 用户复现；官方维护者关注 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | claude-api 标记 4 个退役模型 | 修复 #1603，低风险文档级更新 |
| [#538](https://github.com/anthropics/skills/pull/538) | pdf 大小写引用修复 | 1 行级修复，影响所有大小写敏感系统（Linux） |
| [#541](https://github.com/anthropics/skills/pull/541) | docx tracked-change ID 冲突 | 修复文档损坏的根因，OOXML 规范正确实现 |
| [#539](https://github.com/anthropics/skills/pull/539) | skill-creator YAML 校验 | 防 silent failure，提升 Skill 创建体验 |
| [#1099](https://github.com/anthropics/skills/pull/1099) / [#1050](https://github.com/anthropics/skills/pull/1050) | Windows 兼容性 | 反复出现的平台阻塞问题 |

> 已就绪、风险低、可独立合并的"修虫型 PR"是官方近期最可能吸收的批次。

---

## 4. Skills 生态洞察（一句话）

> **社区的核心诉求已从"做更多 Skill"转向"做更可信的 Skill"——重点关注 Skill 的信任边界（冒充官方问题）、评估反馈回路的有效性（run_eval 失效）、以及企业级共享与上下文预算管理三类基础设施级痛点，而非新增功能数量。**

---

# Claude Code 社区动态日报
**日期：2026-09-05**

---

## 1. 今日速览

- **v2.1.261** 正式发布，重点增强了组织策略诊断能力并新增字符数配置项；同日 issue #42776（Windows 桌面端文件锁问题）继续保持高热度，已积累 159 条评论与 75 个 👍。
- **#91870「Function Hooks」增强提案** 在 24 小时内迅速获得 97 条评论与 61 个点赞，是当下社区最具共识的方向，被认为是能让插件能力提升 10 倍的关键设计。
- **Windows/macOS Desktop 端进程与权限回归** 成为新的高频反馈线，#91683（bypassPermissions 回归）与 #92016（SendMessage 自动拒绝）集中暴露了 CLI 与 Desktop 在权限模型上的割裂。

---

## 2. 版本发布

**v2.1.261**（v2.1.260 之后的小版本迭代）

主要更新：
- 在 `/status` 与 `claude doctor` 中新增 **「Organization policy」** 行，明确说明组织策略为何无法加载（如代理未透传 endpoint）。
- 新增 `bashOutputMaxChars` 与 `taskOutputMaxChars` 配置项，提升命令与后台任务输出可承载的字符量。
- 修复与稳定性改进（具体细节见 Release Notes）。

> 这是一项偏"运维可观测性"的小步快跑，反映出 Anthropic 正在强化企业场景下的诊断能力。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注点 | 热度 |
|---|-------|-------|------|
| [#42776](https://github.com/anthropics/claude-code/issues/42776) | **Windows Desktop 无法重启用**（孤儿进程文件锁） | 虽标记 invalid，但 159 评论/75 👍 表明大量用户在 Windows 上反复遭遇「另一程序占用此文件」错误，影响日常启动。 | 极高 |
| [#91870](https://github.com/anthropics/claude-code/issues/91870) | **Function Hooks：让插件能力提升 10 倍** | 提案引入类似 Express/Koa 的「next 续延模型」+ 副作用追踪，社区认为是 Plugins 真正可编程化的突破。 | 高 |
| [#12612](https://github.com/anthropics/claude-code/issues/12612) | **`claude model list` CLI 命令** | 长期高赞（58 👍）的 feature request：希望非交互式查询可用模型，避免 `/model` 浪费 token。 | 高 |
| [#91683](https://github.com/anthropics/claude-code/issues/91683) | **bypassPermissions 在 2.1.259 回归** | `cd DIR && grep …` 触发 Read 拒绝规则提示；精准的回归报告，评论 7 但 👍 26，证明问题影响面大。 | 高 |
| [#92016](https://github.com/anthropics/claude-code/issues/92016) | **macOS Desktop 自动拒绝 CLI-native SendMessage** | 揭示了 CLI 子代理恢复链路在 Desktop 客户端被破坏，权限模型未对齐。 | 中高 |
| [#51847](https://github.com/anthropics/claude-code/issues/51847) | **Windows 更新后「另一程序正在使用」** | Windows Desktop 进程锁的同源问题，21 条评论，跨版本持续复发。 | 中高 |
| [#52586](https://github.com/anthropics/claude-code/issues/52586) | **Routines 无法使用 Claude.ai Connectors** | 反映 Claude Code 与 Claude.ai 生态（Composio/Gmail/LinkedIn）能力不互通，企业集成受阻。 | 中 |
| [#63139](https://github.com/anthropics/claude-code/issues/63139) | **TUI 缺乏 LaTeX/KaTeX 数学渲染** | 16 👍 的重复 issue，数学/科研类开发者痛点。 | 中 |
| [#91745](https://github.com/anthropics/claude-code/issues/91745) | **Desktop 同目录无法启动第二个 Code 会话** | `exclusiveCwd` 硬编码 true 引起的回归，Windows MSIX 用户最严重。 | 中 |
| [#81300](https://github.com/anthropics/claude-code/issues/81300) | **Opus 5 验证分配与编排角色问题** | 来自 45 人企业真实生产环境，反馈多 agent 编排下的 regeneration fidelity 问题。 | 中 |

---

## 4. 重要 PR 进展（Top 10）

> 注：过去 24 小时内更新的 PR 数量较少（仅 2 条），以下同时纳入近期有重要意义的 Open PR：

| # | PR | 说明 |
|---|----|------|
| [#87079](https://github.com/anthropics/claude-code/pull/87079) | **fix(security-guidance): `**` 匹配零深度路径** | 修复 fnmatch 在 `security-patterns.json` 静默漏配顶层 `.ts` 文件的 bug，属于安全规则层面，必须收。 |
| [#61691](https://github.com/anthropics/claude-code/pull/61691) | **GitHub 连接器诊断脚本（PowerShell）** | 为「已连接但工具列表为空」的复现 bug（#61682）提供 Windows 端可执行的诊断/修复脚本。 |
| *(历史活跃 PR)* | 多项 hooks/MCP/desktop 端修复 | 近 24 小时新提交较少，社区开发节奏更聚焦于 issue 讨论与回归跟踪。 |

**建议关注**：#87079 涉及安全规则静默失败模式，建议管理员提前审视自身的 `security-patterns.json` 是否依赖 `**` 行为。

---

## 5. 功能需求趋势

通过对全部 49 条更新 issue 的聚类，社区诉求集中在以下方向：

1. **🧩 插件/扩展可编程化（Hooks & Plugins）**
   - 主导方向：Function Hooks（#91870）试图把 hooks 体系从「事件触发」升级为「带状态、链式、可追踪副作用」的编程模型。

2. **🖥️ Desktop 端稳定性（Windows/macOS）**
   - 文件锁、进程残留、二次启动、Dispatch 失败——形成「Desktop 进程生命周期」专项簇（#42776、#51847、#91745、#92005、#92016、#90109）。

3. **🤖 模型选择与配额管理**
   - 非交互式查询模型（#12612）、模型回退链、Fable/Opus 配额错算、stored `primaryApiKey` 静默覆盖 Max 订阅（#80713）——企业级 quota 治理成强需求。

4. **🔌 MCP / Connectors 生态互通**
   - Routines 不能用 Claude.ai Connectors（#52586）、GitHub 连接器「假连接」（#61682/61691）——MCP 周边工程化亟待补齐。

5. **🎨 TUI 渲染与编辑器集成**
   - LaTeX/KaTeX 渲染（#63139）、VS Code 插件非 ASCII 文件链接（#86829）——科学/国际化项目基础体验短板。

6. **🔐 权限与权限模型一致性**
   - bypassPermissions 回归（#91683）、Desktop auto-deny CLI-native tools（#92016）——CLI 与 Desktop 权限语义需要统一收口。

---

## 6. 开发者关注点与痛点

- **Desktop 进程锁已成 Windows 头号问题**：5+ 条相关 issue 指向「另一程序正在使用此文件」「Dispatch 卡死」「exclusiveCwd 硬编码」，反映出 MSIX 打包/进程管理策略的成熟度不足。
- **CLI ↔ Desktop 权限模型割裂**：开发者工作流高度依赖 CLI 工具（如 `SendMessage`），但 Desktop 端默认 auto-deny，使得 subagent 恢复链路在桌面用户上断裂。
- **MCP 连接器「假阳性」**：GitHub connector 显示 Connected 却无 tools，开发者需要可执行的诊断工具（PR #61691 正是为此而生）。
- **Fable 5 / Opus 5 配额账目混乱**：多个 issue 报告 Max/Team 订阅被错误回退到 usage credits，缺乏可解释的提示（#91488、#79548、#79576、#80713）。
- **CLAUDE.md 规则遵守波动**：跨 4+ 重复 issue（#7248、#18411、#35019、#46724 → #80579）仍未根治，说明 instruction-following 在长会话中存在系统性退化。
- **Hooks 体系被低估**：97 条评论 61 👍 的 Function Hooks 提案表明，开发者希望把 Claude Code 当作「可深度定制的运行时」而非「黑盒 CLI」，这与 Anthropic 推动 Plugins/Subagents 的方向高度契合。

---

**总结**：今天的社区脉搏清晰地指向两件事——**Desktop 端的进程与权限治理**亟需一次集中修复，以及 **Hooks/Plugins 的可编程化升级** 是下一阶段生态扩张的关键杠杆。Function Hooks 提案值得 Anthropic 团队重点回应。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**2026-09-05**

---

## 📌 今日速览

今日 Codex 生态围绕 **GPT-6-Astra** 的发布与稳定性修复密集展开：CLI 在 24 小时内连发 v0.153.3 与 v0.153.4 两个补丁版本，将 Astra 设为默认模型并修复其在模型选择器与异步问答引导上的可见性问题。与此同时，社区对 **多 Agent 子代理磁盘占用、MCP stdio 文件描述符泄漏、Windows 桌面端 Remote Control / 多显示器 / Pets 等遗留问题** 的讨论持续升温，呼声最高的 feature request 已积攒 23+ 赞。

---

## 🚀 版本发布

### `rust-v0.153.4`（修复版）
- 将 GPT-6-Astra 在内置模型选择器中的可见性恢复，并设为未显式配置模型时的默认模型（[PR #42874](https://github.com/openai/codex/pull/42874)）
- 调整 Astra 异步问答引导文案，仅在 session 中实际具备 `request_user_input_async` 工具时启用（[PR #42878](https://github.com/openai/codex/pull/42878)）

### `rust-v0.153.3`（新功能）
- 在 Amazon Bedrock 的 Mantle 与 Runtime Global/US 路由的模型选择器中新增 **GPT-6-Astra**（[PR #42805](https://github.com/openai/codex/pull/42805)）
- 修正 Astra 对异步澄清问答的引导，明确其仅接受文本输入

### `rust-v0.154.0-alpha.3`（预发布）
- 预发布通道滚动更新，未列出具体变更

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 关注点 | 热度 |
|---|-------|--------|------|
| 1 | [#34061](https://github.com/openai/codex/issues/34061) **Subagent 磁盘占用失控** | Pro 用户反馈 subagent 产生海量磁盘写入，疑似与 sandbox 临时文件未回收相关 | 💬 25 / 👍 6 |
| 2 | [#26984](https://github.com/openai/codex/issues/26984) **MCP stdio FD 泄漏导致 EMFILE** | 长期运行的 Codex 会话累积孤儿子进程与未关闭 pipe，最终触发"Too many open files" | 💬 24 / 👍 7 |
| 3 | [#29908](https://github.com/openai/codex/issues/29908) **Ubuntu 24.04 Bubblewrap sandbox 失败** | `apply_patch` 在 loopback/userns 错误下崩溃，影响 Linux 主力发行版 | 💬 19 / 👍 1 |
| 4 | [#32164](https://github.com/openai/codex/issues/32164) **Windows Remote Control 注册卡死** | Win 11 桌面端的 Remote Control 永远无法完成注册流程 | 💬 14 / 👍 4 |
| 5 | [#25826](https://github.com/openai/codex/issues/25826) **多显示器下最大化窗口溢出** | Windows 桌面在多屏布局中窗口跑到相邻显示器 | 💬 13 / 👍 17 |
| 6 | [#19343](https://github.com/openai/codex/issues/19343) **`plan_mode_model` 配置项** | 呼声最高的增强请求：允许为 Plan 模式独立指定模型 | 💬 3 / 👍 23 |
| 7 | [#32908](https://github.com/openai/codex/issues/32908) **iOS 推送通知丢失** | Remote Control 模式下，ChatGPT iOS 不再收到完成/审批推送 | 💬 3 / 👍 16 |
| 8 | [#32080](https://github.com/openai/codex/issues/32080) **Remote SSH 项目模型选择器缺 GPT-5.6** | Desktop 通过 SSH 远程项目时，模型列表缺少 5.6 系列 | 💬 3 / 👍 9 |
| 9 | [#40037](https://github.com/openai/codex/issues/40037) **多 Agent 动态图语义升级提案** | 提议引入"证据驱动的语义升级"机制，让模型能自主决策委派与验证 | 💬 9 / 👍 0 |
| 10 | [#24224](https://github.com/openai/codex/issues/24224) **并发会话跨项目泄漏 Workspace Root** | Desktop 在多项目并行时串台，存在上下文隔离隐患 | 💬 9 / 👍 4 |

> **整体社区反应**：Windows 桌面端（Remote Control、Computer Use、WSL、Pets、Markdown 渲染）与多 Agent / MCP 资源治理是当前最强烈的痛点。

---

## 🛠 重要 PR 进展（Top 10）

| PR | 主题 | 影响 |
|----|------|------|
| [#42879](https://github.com/openai/codex/pull/42879) 在模型选择器中列出 GPT-6-Astra | 调整 visibility 为 `list`，更新 picker snapshot | Astra 用户体验直接相关 |
| [#42874](https://github.com/openai/codex/pull/42874) Astra 作为内置默认模型 | 0.153 hotfix：让 Astra 在未配置时自动生效 | 0.153.4 行为来源 |
| [#42878](https://github.com/openai/codex/pull/42878) 条件化 Astra 异步问答引导 | 0.153 hotfix：避免在无工具 session 中误引导 | 0.153.4 行为来源 |
| [#42850](https://github.com/openai/codex/pull/42850) **Linux musl 启用 jemalloc** | 显著降低 musl 目标（Alpine 等）的内存碎片与峰值 | 长期被关注的性能补丁 |
| [#42841](https://github.com/openai/codex/pull/42841) **新增原生 Windows MXC 沙箱适配器** | `codex-mxc-sandbox` 原生检测与启动器；拒学模式策略验证 | Windows 沙箱体系重要扩展 |
| [#42870](https://github.com/openai/codex/pull/42870) 消除冗余文件系统沙箱路径解析 | Linux 端在主线程上反复探测无用根目录的开销被砍掉 | CLI 启动/性能优化 |
| [#42852](https://github.com/openai/codex/pull/42852) **Guardian 评审在上下文压缩后加固** | 压缩后保留 root 用户消息节选，避免授权约束丢失 | 安全关键 |
| [#42832](https://github.com/openai/codex/pull/42832) 守护根授权上下文 | 父代理被压缩后，worker 审批仍能拿到根指令 | 多 Agent 安全一致 |
| [#42847](https://github.com/openai/codex/pull/42847) TUI 复制响应保留 Markdown 格式 | 复制时同时输出渲染后 HTML，rich-text 目标保留标题/列表/表格 | TUI 体验显著提升 |
| [#42842](https://github.com/openai/codex/pull/42842) TUI 编辑器加入 Astra 星效 | 在支持真彩的终端里为 Astra 模型渲染稀疏、淡出的星点动效 | 品牌与情感化细节 |

> 其他值得关注的稳健性修复：`#42883`（exec-server RPC 指标）、`#42863`（feature_requirements 别名优先级）、`#42844`（Guardian 保留用户指令）、`#42835`（Windows 沙箱 deny-read）、`#42833`（保留 SystemRoot）。

---

## 📈 功能需求趋势

综合 44 条 Issue 与 50 条 PR 的关键词，开发者社区的关注点呈现以下格局：

1. **🤖 新模型与多模型管理** — Astra 可见性/默认化、模型选择器（Remote SSH、Luna Reserve）、`plan_mode_model` 独立配置（👍 23）
2. **🪟 Windows 桌面体验** — Remote Control、Computer Use、Pets、Markdown 渲染、WSL 启动、Projects 列表、多显示器窗口，多达十余条相关 Issue
3. **🧩 MCP 与多 Agent 治理** — stdio FD 泄漏、懒加载 MCP server、Subagent 磁盘占用、动态多 Agent 语义升级提案
4. **⚡ 性能与资源** — `wait` 工具 50s 上限导致 token 燃烧、文件系统沙箱冗余解析、Linux musl 内存分配
5. **🔒 安全与权限** — Guardian 评审在压缩后的鲁棒性、Windows sandbox deny-read 持久化、根授权上下文保留
6. **💡 Linux 平台能力补齐** — Computer Use、Desktop 应用与沙箱适配（MXC）

---

## 🧑‍💻 开发者关注点

- **"配置粒度不够"**：`plan_mode_model`、MCP lazy startup、Luna Reserve 不应折叠其它模型 — 反映开发者希望更细粒度地控制 Codex 行为。
- **"Windows 端像二等公民"**：Remote Control 注册、Computer Use `cua.getApp is not a function`、WSL 启动 `Operation not permitted`、Projects 列表消失 — Windows 桌面的稳定性与功能对等性是高频痛点。
- **"长期会话会爆"**：MCP 孤儿进程累积 EMFILE、subagent 磁盘爆炸、`wait` 工具 50s 触发 multi_agent_v2 反复重采样 — 资源生命周期管理成为生产化部署的最大障碍。
- **"多 Agent 缺少安全边界"**：Guardian 在压缩后失忆、根授权可能漂移、worker 审批上下文不完整 — 社区明确期待更稳健的委派授权链。
- **"Linux 想要同样的 Computer Use"**：[#42846](https://github.com/openai/codex/issues/42846) 反映 Linux 桌面用户对官方 Computer Use 能力的强烈期待。
- **"Astra 体验细节"**：从 TUI 星效（[#42842](https://github.com/openai/codex/pull/42842)）到默认模型切换，OpenAI 正把 Astra 作为新模型生态的核心触点。

---

*数据来源：[github.com/openai/codex](https://github.com/openai/codex) · 统计窗口：2026-09-04 ~ 2026-09-05*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报
**2026-09-05**

---

## 📌 今日速览

今日 v0.60.0 nightly 版本如期发布，重点强化了 MCP OAuth 流程的 RFC 9207 规范合规性。社区高度关注 Agent 子代理（subagent）相关的稳定性问题，多个 P1 级 Bug 涉及子代理状态误报、generalist agent 挂起和 browser agent 在 Wayland 下的异常。沙箱安全与配置隔离成为昨日 PR 集中交付的主题，多个 L/XL 级修复围绕文件系统边界加固和权限校验展开。

---

## 🚀 版本发布

### v0.60.0-nightly.20260904.g87a9c71d5
- **MCP OAuth 安全加固** ([#29117](https://github.com/google-gemini/gemini-cli/pull/29117))：在 MCP OAuth 流程中强制执行 RFC 9207 规范的 issuer 标识验证，提升第三方 MCP 服务器接入的鉴权安全性。
- 同步 bump 至 `0.60.0-nightly.20260901.g0bd1d4397` 内部版本。

---

## 🔥 社区热点 Issues

| # | Issue | 优先级 | 关注理由 |
|---|-------|--------|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent 在 MAX_TURNS 后仍上报 GOAL success | P1 | 影响可靠性，13 条讨论；子代理结果误报导致中断被隐藏 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Zero-Dependency OS 沙箱 + Post-Execution Intent Routing | P2 | 9 条讨论；释放 Gemini 3 模型原生 bash 偏好的核心架构提案 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent 频繁挂起 | P1 | 👍 8，是当日点赞最高 Bug；简单文件夹创建即可触发小时级卡死 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | AST 感知的文件读取/搜索/映射评估 | P2 | 7 条讨论；潜在的 token 经济性优化（精准读取方法边界） |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini 自主调用 skills/sub-agents 频率不足 | P2 | 揭示 Agent 自驱能力与用户期望的差距 |
| [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | Shell 命令完成后卡在 "Waiting input" | P1 | 👍 3；高频偶发问题，影响基础交互体验 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | Browser subagent 在 Wayland 下失败 | P1 | Linux 桌面环境兼容性问题，社区代表性诉求 |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | Auto Memory 添加确定性脱敏并减少日志 | P2 | 安全合规相关，Auto Memory 是新版重要特性 |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | Browser agent 会话接管与锁恢复 | P3 | 4 条讨论；persistent mode 失败策略偏激进需优化 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Agent 应阻止/劝阻破坏性操作 | P2 | 涉及 `git reset --force` 等危险命令的安全护栏设计 |

---

## 🛠️ 重要 PR 进展

| PR | 主题 | 说明 |
|----|------|------|
| [#29215](https://github.com/google-gemini/gemini-cli/pull/29215) | 强制外部工具输出的信封元数据来源校验 | 防止 MCP 服务器伪造作者标识和运行状态 |
| [#29216](https://github.com/google-gemini/gemini-cli/pull/29216) | 沙箱容器内隔离 settings 目录 | 避免宿主 `~/.gemini`（含 OAuth token）被错误挂载进容器 |
| [#29217](https://github.com/google-gemini/gemini-cli/pull/29217) | 不再覆盖用户显式指定的 `gemini-2.5-flash` 模型 | 修复 `--model gemini-2.5-flash` 被静默改写为 3.5-flash 的回归 |
| [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) | 沙箱文件系统边界加固 | 隔离运行时状态、解析符号链接、解耦容器环境 |
| [#29116](https://github.com/google-gemini/gemini-cli/pull/29116) | 缓解 NTFS 8.3 短名（SFN）路径绕过 | Windows 平台路径遍历和黑名单绕过防护 |
| [#29208](https://github.com/google-gemini/gemini-cli/pull/29208) | agents.json 形状错误时降级而非崩溃 | 关闭 [#29207](https://github.com/google-gemini/gemini-cli/issues/29207) |
| [#29211](https://github.com/google-gemini/gemini-cli/pull/29211) | 停止在 state updater 内调度状态更新 | 修复 React 状态更新嵌套导致的潜在崩溃 |
| [#29200](https://github.com/google-gemini/gemini-cli/pull/29200) | 运行时统一强制 MCP 策略 | 显式空 allowlist 改为 fail-closed；消除大小写匹配不一致 |
| [#29201](https://github.com/google-gemini/gemini-cli/pull/29201) | 跨确认重试保留已批准的 shell 命令 | 修复 TOML 多 `!{...}` 注入时永远卡在确认循环 |
| [#29126](https://github.com/google-gemini/gemini-cli/pull/29126) | a2a-server 路由前挂载 express.json | 修复 A2A SDK 路由 `req.body` 为 undefined 的 JSON-RPC 解析故障 |

---

## 📈 功能需求趋势

1. **Agent 子代理体系成熟化** —— 子代理的状态汇报、可观测性（`/chat share` 轨迹）、自我意识（CLI flags、hotkey 准确度）和健壮性（MAX_TURNS、generalist 挂起）是当下最热议题，反映社区正从"能用"走向"可控、可调试"。
2. **沙箱与安全模型** —— 多个 P1/P2 PR 集中处理文件系统边界、NTFS 短名、配置权限、扩展环境变量污染，呈现"纵深防御"迭代。
3. **AST 感知的代码理解** —— 通过 `tilth` / `glyph` 等工具降低 context 噪声（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)）是 token 经济性的关键路径。
4. **Browser Agent 韧性** —— 跨平台兼容（Wayland）、会话接管、settings 覆盖、持久化模式锁恢复，反映浏览器代理正从 PoC 走向生产可用。
5. **Auto Memory 安全化** —— 三条相关 issue（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)、[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)）集中处理脱敏、隔离、低信号会话重试，标志该特性进入"信任构建"阶段。
6. **评估体系（Evals）稳定性** —— [#23313](https://github.com/google-gemini/gemini-cli/issues/23313)、[#23166](https://github.com/google-gemini/gemini-cli/issues/23166) 显示内部评估的"bleed"问题已成为制约迭代速度的瓶颈。

---

## 💬 开发者关注点

- **Agent 行为可控性**：用户最频繁的痛点是"Agent 自主能力不足"（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)）与"行为不可预测"（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）之间的矛盾——既希望 Agent 更主动调用 subagent/skills，又希望其避免破坏性操作。
- **基础设施兼容性碎片化**：NTFS 短名（[#29116](https://github.com/google-gemini/gemini-cli/pull/29116)）、Wayland（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)）、Vite 交互式 prompt（[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)）等案例说明多平台一致性仍是工程重灾区。
- **Context 与 Token 经济性**："Tactful Extraction"（[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）和 400 工具限制（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)）显示社区对 token 浪费和工具上下文过载高度敏感。
- **配置与权限可见性**：`settings.json` 覆盖在 browser agent 中失效（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）、系统配置路径所有权校验（[#29115](https://github.com/google-gemini/gemini-cli/pull/29115)、[#29212](https://github.com/google-gemini/gemini-cli/pull/29212)）——开发者期望"声明即生效"的配置体验。
- **错误恢复与降级**：损坏 `agents.json` 不再崩溃（[#29208](https://github.com/google-gemini/gemini-cli/pull/29208)）、非数组 history 不再崩溃（[#29195](https://github.com/google-gemini/gemini-cli/pull/29195)）等修复体现了社区对"优雅降级"而非"硬错误"的强烈偏好。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报
**2026-09-05**

---

## 📌 今日速览

v1.37.0 与 Studio v2.12.0 同步发布，标志着 **Agent 核心简化** 重大重构落地——以模型级能力元数据替代手工 VisionModels 配置，planner/续写/压缩行为全部默认关闭，循环契约从四阶段收窄为单次请求级。同时远程工作区在 Studio 端首次具备可用安装路径，首轮缓存命中率从 4.2% 跃升至 54.7%。社区反馈仍集中在 Windows 平台 TUI 滚动异常与长会话稳定性问题上。

---

## 🚀 版本发布

### v1.37.0（Reasonix CLI / Desktop）— 稳定版
- **Agent 核心简化**：显式化 planner、续写、压缩、模型 fallback 四个隐式行为
- **模型级能力元数据**：取代手工 `VisionModels` 配置，引入 `provider.ModelInfo/InputModalities` 规范
- **新增 ModelScope 提供商预设**（OpenAI-compatible，含 Qwen3.5-397B、DeepSeek-V4、GLM-5.2 等 7 个精选模型）
- **桌面端滚动稳定性修复**（合并 `react-virtuoso` 移除、Transcript 滚动控制重写）
- 重试事件新增错误原因与退避时长（修复 #9790）

### Studio v2.12.0 — 稳定版
- **远程工作区首次可用**：补齐远端内核发布链，修复跨机工作区安装失败的误导性错误码
- **Controller 协作者拆分**：按生命周期重组
- **缓存前缀隔离**：项目自身状态移出跨项目共享前缀
- 三平台自更新，无需人工介入

---

## 🔥 社区热点 Issues（精选 10）

| # | 标题 | 状态 | 关注点 |
|---|------|------|--------|
| [#9782](https://github.com/esengine/DeepSeek-Reasonix/issues/9782) | v1.36.0 对话界面滚动异常 | OPEN | 复制时滚动条乱跳，Windows 11 复现率高 |
| [#9726](https://github.com/esengine/DeepSeek-Reasonix/issues/9726) | 1.35.0 会话滚动问题 | OPEN | 输出时上下抖动、滚动条乱飘 |
| [#9792](https://github.com/esengine/DeepSeek-Reasonix/issues/9792) | v1.36.0 会话页面回滚闪烁 | OPEN | 鼠标点击即跳回开头，严重影响复制 |
| [#9790](https://github.com/esengine/DeepSeek-Reasonix/issues/9790) | Retrying 事件缺失错误原因与退避时长 | OPEN | **已获 PR #9801 修复**，长会话易误判卡死 |
| [#9795](https://github.com/esengine/DeepSeek-Reasonix/issues/9795) | 1.31.4 TUI 静默崩溃 | OPEN | 长跑 40h 446 条消息会话中途崩溃，4 MiB 日志上限截断诊断 |
| [#9791](https://github.com/esengine/DeepSeek-Reasonix/issues/9791) | Token 记录与实际开销不一致 | OPEN | 会话显示成本与真实计费存在显著差距 |
| [#9789](https://github.com/esengine/DeepSeek-Reasonix/issues/9789) | 任务未完成即自停（macOS） | OPEN | 多用户复现，疑似执行器中断 |
| [#9784](https://github.com/esengine/DeepSeek-Reasonix/issues/9784) | "已工作 X秒" 停顿 | OPEN | 自 1.31.4 部分改善，1.36.0 仍存在 |
| [#9786](https://github.com/esengine/DeepSeek-Reasonix/issues/9786) | v1.36 Linux 版闪屏 | OPEN | Ubuntu 22.04 输出时卡死、影响其他应用 |
| [#9560](https://github.com/esengine/DeepSeek-Reasonix/issues/9560) | 1.33.0 自定义供应商模型无响应 | OPEN | 模型列表可见但发送消息无回包 |

> **共性问题**：滚动/渲染类 4 条（#9726/#9782/#9792/#9786），稳定性 3 条（#9795/#9789/#9784），计费/重试可观测性 2 条。Windows 11 占比 70%。

---

## 🛠️ 重要 PR 进展（精选 10）

| # | 标题 | 状态 | 关键变更 |
|---|------|------|----------|
| [#9794](https://github.com/esengine/DeepSeek-Reasonix/pull/9794) | Agent 核心循环显式化（planner/续写/压缩/fallback） | CLOSED ✅ | 收窄为单次请求级契约，v1.37.0 核心 |
| [#9787](https://github.com/esengine/DeepSeek-Reasonix/pull/9787) | 模型级视觉能力元数据 | CLOSED ✅ | 取代手工 VisionModels，新增 `ModelInfoProvider` 适配器 |
| [#9800](https://github.com/esengine/DeepSeek-Reasonix/pull/9800) | 修复提供商能力兼容 | CLOSED ✅ | 保留旧版 provider-level vision 兼容信号 |
| [#9801](https://github.com/esengine/DeepSeek-Reasonix/pull/9801) | 重试事件显示原因与延迟 | OPEN | CLI/Desktop/serve 三端统一展示退避，修复 #9790 |
| [#9777](https://github.com/esengine/DeepSeek-Reasonix/pull/9777) | 统一会话体验并稳定 Transcript 滚动 | OPEN | 三档合并为 Standard/Deep，移除 `react-virtuoso` 整条路径 |
| [#9793](https://github.com/esengine/DeepSeek-Reasonix/pull/9793) | 锁定 Agent 核心循环契约基线 | CLOSED ✅ | 阶段 0：固化 Harness 风格循环 + 指标复用 |
| [#9796](https://github.com/esengine/DeepSeek-Reasonix/pull/9796) | 下架经典桌面风格 | CLOSED ✅ | 迁移 `layout_style="classic"` 至 Workbench |
| [#8771](https://github.com/esengine/DeepSeek-Reasonix/pull/8771) | ModelScope OpenAI 兼容预设 | CLOSED ✅ | 7 个精选模型，v1.37.0 上线 |
| [#9717](https://github.com/esengine/DeepSeek-Reasonix/pull/9717) | 补全 OpenCode Go DeepSeek 视觉模型 | CLOSED ✅ | `deepseek-v4-flash-vision-exp` 加入 Chat 路由 |
| [#9803](https://github.com/esengine/DeepSeek-Reasonix/pull/9803) | 同步 Go 1.26 前置要求 | OPEN | 修复 #9802 文档漂移 |

> **主题聚类**：Agent 核心简化占 4 条（#9793/#9794/#9787/#9800），桌面体验统一 2 条（#9777/#9796），可观测性 1 条（#9801），依赖与文档 3 条。

---

## 📈 功能需求趋势

基于 13 条今日活跃 Issue 提炼：

1. **TUI/桌面渲染稳定性**（占比 ~38%）
   - 滚动抖动、回滚闪烁、闪屏、复制干扰等跨平台问题，Windows 11 集中爆发
   
2. **可观测性与诊断能力**（~23%）
   - 重试事件需暴露原因/退避（#9790）
   - 诊断日志需扩大捕获窗口，避免静默崩溃无据可查（#9795）
   - Token/计费显示需与实际对齐（#9791）

3. **Agent 行为显式化**（~15%）
   - 隐式 fallback、planner、续写逻辑需用户可控并默认保守
   - 任务自停、停顿问题暴露执行器状态机不透明

4. **跨平台一致性**（~15%）
   - macOS 任务中断、Linux 闪屏、Windows 滚动问题呈三足鼎立

5. **Provider 生态扩展**（~8%）
   - 自定义供应商响应、ModelScope/OpenCode Go 等新预设适配

---

## 👨‍💻 开发者关注点

**🔴 高频痛点**
- **Windows 11 渲染层**：4 条独立 Issue 描述滚动/闪烁/复制问题，已存在 3+ 个版本未根治
- **诊断日志 4 MiB 上限**：长会话崩溃现场全部丢失，开发者无回溯能力（#9795）
- **Token 计量偏差**：影响成本敏感型用户对实际花费的判断

**🟡 隐式行为不可控**
- Agent fallback / planner / 续写在 1.33–1.36 期间引发"已工作 X秒"停顿、任务自停等连锁问题，社区呼吁**默认关闭 + 显式开关**
- v1.37.0 通过 #9794 响应，但需观察 1.37.0 实际回归表现

**🟢 积极信号**
- v1.37.0 推送的 **Harness 风格单次请求契约** 被多位贡献者引用为修复方向锚点
- 远程工作区与 ModelScope 预设说明 Studio/Desktop 正向"工作流整合"演进
- i18n 工程化（#9768）显示团队开始系统化处理多语言一致性

**⚠️ 待跟进**
- 文档与代码漂移（#9802 Go 1.25→1.26）暴露贡献者门槛管理需加强
- Studio 远程工作区需更多真实部署反馈

---

*日报基于 GitHub 公开数据整理 · 覆盖周期：2026-09-04 → 2026-09-05*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报
**日期：2026-09-05**

---

## 📌 今日速览

今日 OpenCode 发布 **v1.18.28 与 v1.18.29** 双版本更新，核心修复了 GPT-6 Astra 模型在 OpenAI Codex OAuth 下不显示的问题，并改进 GitHub Copilot 请求追踪。社区活跃度维持高位，24 小时内 50 个 PR 持续推进 v2（opencode2）相关修复，同时 Bedrock / OpenAI 兼容模型的 `max_tokens` 失效问题成为最受关注的技术痛点。

---

## 🚀 版本发布

### v1.18.29 — 2026-09-04
**Core Bugfixes**
- 允许 Codex OAuth 模型过滤器识别整数型 GPT 版本（如 `gpt-6`）
- 修复 `gpt-6-astra` 在 OpenAI 订阅用户下不显示的问题

**文档**
- 感谢社区贡献者 @Peter267 修复中文文档的加粗渲染问题（[#47384](https://github.com/anomalyco/opencode/pull/47384) 衍生）

👉 [查看 v1.18.29 详情](https://github.com/anomalyco/opencode/releases/tag/v1.18.29)

### v1.18.28 — 2026-09-04
**Core 改进**
- 在 GitHub Copilot 请求中发送 session ID 作为交互头，以改进会话级请求追踪

**Desktop Bugfixes**
- 桌面客户端使用 OpenCode 账户 device authentication 时使用桌面 client ID
- 增大"open-in app"图标尺寸以提升可见性

👉 [查看 v1.18.28 详情](https://github.com/anomalyco/opencode/releases/tag/v1.18.28)

---

## 🔥 社区热点 Issues

### 1. [#47363 GPT-6 Astra 在 OpenAI Codex OAuth 模型选择器中缺失](https://github.com/anomalyco/opencode/issues/47363) ⭐ 19
- **状态**：OPEN
- **重要性**：高赞 19 次，热度榜首。`gpt-6-astra` 已在官方 Codex 客户端可用，但 OpenCode 同账号下不显示，即使 `opencode models openai --refresh` 也无效
- **进展**：v1.18.29 已修复此问题（[#47384](https://github.com/anomalyco/opencode/pull/47384)、[#47385](https://github.com/anomalyco/opencode/pull/47385)）

### 2. [#46595 Bedrock 配置的输出限制未生效，推理轮在 4096 tokens 处截断](https://github.com/anomalyco/opencode/issues/46595) ⭐ 1
- **状态**：OPEN
- **重要性**：v2 严重缺陷。`limit.output: 128000` 在 Bedrock Converse 请求中未发送，导致长推理被强制截断到 4096 tokens
- **关联**：与 #47398 同源问题（v2 上 `@ai-sdk/openai-compatible` 模型同样不发送 `max_tokens`）

### 3. [#47398 v2 (opencode2): @ai-sdk/openai-compatible 模型不发送 max_tokens](https://github.com/anomalyco/opencode/issues/47398)
- **状态**：OPEN
- **重要性**：v2 Beta 关键回归。相同配置下稳定版 1.18.20 正常发送 `max_tokens: 32000`，v2 行为不一致
- **社区反应**：技术细节充分，被认为与 #46595 共同反映了 v2 在 provider 配置处理上的系统性问题

### 4. [#47367 Jinja 异常错误](https://github.com/anomalyco/opencode/issues/47367)
- **状态**：CLOSED
- **重要性**：运行 hf.co/FINAL-Bench/POCKET-35B-GGUF 时出现 500 错误，模板渲染失败，反映本地大模型场景下的稳定性问题

### 5. [#47393 JavaScript SDK 配置客户端作用域时丢失原生 Headers 条目](https://github.com/anomalyco/opencode/issues/47393)
- **状态**：OPEN
- **重要性**：SDK 关键缺陷。`createOpencodeClient` 接收 `directory`/`experimental_workspaceID` 时，对 `Headers` 实例的展开会丢失条目
- **进展**：[#47395](https://github.com/anomalyco/opencode/pull/47395) 已提 PR 修复

### 6. [#44877 ACP v2 草案规范支持](https://github.com/anomalyco/opencode/issues/44877)
- **状态**：OPEN
- **重要性**：战略性需求。[Agent Client Protocol v2 草案](https://agentclientprotocol.com/announcements/acp-v2-draft) 已发布，社区期待 OpenCode 跟进以保持协议层互操作能力

### 7. [#47381 Git 引号路径中的 Unicode 字符被损坏](https://github.com/anomalyco/opencode/issues/47381)
- **状态**：OPEN
- **重要性**：国际化路径处理缺陷。UTF-16 码位被错误地放入字节数组并按 UTF-8 解码，中文文件名（如 `中文".txt`）会出现损坏
- **场景**：开启 `core.quotePath=false` 时触发

### 8. [#47380 允许不列举内容的限定父目录验证](https://github.com/anomalyco/opencode/issues/47380)
- **状态**：OPEN
- **重要性**：性能优化需求。shell tool 当前强制要求先 `ls` 再创建文件/目录，父目录含大量子项时输出过大，希望提供"仅校验存在/类型"的轻量模式

### 9. [#43295 (衍生) 窄屏显示下 prompt submit 按钮被遮挡](https://github.com/anomalyco/opencode/issues/43295)
- **状态**：相关 PR [#43298](https://github.com/anomalyco/opencode/pull/43298) 仍 OPEN
- **重要性**：移动端/窄屏 UX 问题，提交按钮被溢出控件覆盖导致误触

### 10. [#47334 (衍生) Web search providers 会话内粘性](https://github.com/anomalyco/opencode/pull/47334)
- **重要性**：用户体验改进。`websearch.provider: "random"` 模式当前每次切换都重新随机，希望在同一会话内保持一致

---

## 🛠 重要 PR 进展

### 1. [#47384 fix(opencode): Codex 模型过滤器允许整数型 GPT 版本](https://github.com/anomalyco/opencode/pull/47384) ✅ CLOSED
- **作者**：@rekram1-node
- **价值**：让 GPT 版本号的小数部分可选，修复 `gpt-6-astra` 在 ChatGPT OAuth 下被隐藏的问题

### 2. [#47385 fix(opencode): 按 major/minor 单独比较 Codex GPT 版本](https://github.com/anomalyco/opencode/pull/47385) ✅ CLOSED
- **价值**：`#47384` 的 follow-up，将判断条件改为 `major > 5 || (major === 5 && minor > 4)`，缺省 minor 也可正确处理

### 3. [#47397 [contributor] fix(core): 跳过无关配置变更触发的 skill 重新扫描](https://github.com/anomalyco/opencode/pull/47397)
- **作者**：@kitlangton
- **价值**：当源清单未变时仅修改 `shell` 等无关配置，避免完整重建 skill 目录、远程索引拉取与 watcher 重建

### 4. [#47396 [contributor] fix(core): 启动期间保留 skill config 更新](https://github.com/anomalyco/opencode/pull/47396)
- **作者**：@kitlangton
- **价值**：修复初始 skill 发现期间的配置变更丢失问题（plugin 在注册 transform 后才订阅 `config.updated`）

### 5. [#47395 fix(sdk): 配置客户端作用域时保留 Headers](https://github.com/anomalyco/opencode/pull/47395)
- **作者**：@Suzu1Dev
- **价值**：解决 #47393，将 native `Headers` 正确复制进 wrapper 而非依赖对象展开

### 6. [#47388 [contributor] fix(tui): 重新加载本地插件的依赖图](https://github.com/anomalyco/opencode/pull/47388)
- **作者**：@kitlangton
- **价值**：编辑本地 CLI 插件的导入 helper 时，旧 UI 不会失效；让缓存感知依赖图变化

### 7. [#47389 [contributor] refactor(core): 通过内建插件贡献 MCP 工具](https://github.com/anomalyco/opencode/pull/47389)
- **作者**：@kitlangton
- **价值**：把 MCP 工具贡献迁移至 `opencode.tool.mcp` 保留命名空间，避免与晚于其注册的 plugin 产生顺序竞争

### 8. [#46818 feat(tui): 可调整、可折叠的侧边栏导轨](https://github.com/anomalyco/opencode/pull/46818)
- **作者**：@iceteaSA
- **价值**：在 #46117 的 `sidebar_width` 基础上增加折叠/展开支持，长期呼声强烈的可定制性需求

### 9. [#46108 feat(tui): 在响应页脚显示 tokens/s](https://github.com/anomalyco/opencode/pull/46108)
- **作者**：@iceteaSA
- **价值**：基于社区历史 PR（#12721、#5497）rebase，让用户在响应中看到生成速度

### 10. [#46109 feat(tui): 在侧边栏列出当前会话的 subagents](https://github.com/anomalyco/opencode/pull/46109)
- **作者**：@iceteaSA
- **价值**：subagent 列表在侧边栏可见且可点击导航，提升多 agent 协作可见性

### 其他值得关注的 PR
- [#47334 feat(core): web search providers 会话内粘性](https://github.com/anomalyco/opencode/pull/47334) — @nexxeln
- [#47392 fix(lsp): 闲置 TTL 与 LRU 回收策略](https://github.com/anomalyco/opencode/pull/47392) — @LuisAlbertoMK
- [#47391 perf(plugin): 并行加载内部插件](https://github.com/anomalyco/opencode/pull/47391) — @LuisAlbertoMK
- [#47386 / #47387 fix(tui/app): OpenCode Go 排序在 Zen 之前](https://github.com/anomalyco/opencode/pull/47386) — @iamdavidhill
- [#47360 fix(core): 澄清 Code Mode 指引中 search 的调用方式](https://github.com/anomalyco/opencode/pull/47360) — @rekram1-node（已合入）

---

## 📈 功能需求趋势

| 方向 | 代表性议题/PR | 趋势解读 |
|------|--------------|---------|
| **新模型兼容性** | #47363、#47398、#46595 | GPT-6 接入与 v2 多 provider `max_tokens` 透传是当前最强烈诉求 |
| **协议与互操作** | #44877（ACP v2）、#47389（MCP 工具命名空间） | Agent 协议层标准化进入议程，v2 架构在调整中 |
| **TUI 可定制性** | #46818、#46117、#46109、#46108 | 侧边栏宽度/折叠、subagent 列表、tokens/s 显示等 UX 提升是社区高频建议 |
| **国际化与本地化** | #47381、v1.18.29 中文文档修复 | 路径编码、文档渲染的中文/Unicode 支持正在改善 |
| **性能与稳定性** | #47380、#47397、#47388、#47391 | "避免不必要重算"成为性能优化的主旋律 |
| **桌面/移动端 UX** | #43298、v1.18.28 图标尺寸 | 窄屏适配与视觉可读性持续打磨 |

---

## 💡 开发者关注点

1. **v2（opencode2）稳定性焦虑**：多个高优 issue（#46595、#47398）表明 v2 Beta 在 provider 配置（Bedrock、OpenAI-compatible）传递上仍存在回归，社区需要明确 v2 vs v1 的兼容性边界与升级路径

2. **provider 层 token 限制丢失**：开发者通过 issue 描述已明确诊断到 prepared model request 缺少 `inferenceConfig.maxTokens`，期待官方在 hook 之外补齐该字段

3. **本地大模型与长上下文场景**：#47367 反映 Ollama + GGUF 模型运行中模板渲染异常，#47381 反映含中文/Unicode 的工作区路径损坏，说明非云端场景下的健壮性需要持续投入

4. **小改动高价值的"打磨型"贡献**：kitlangton 的多个 contributor PR（#47397、#47396、#47388、#47389）聚焦在"不必要重算"、"启动期状态丢失"、"依赖图缓存"等深层稳健性，开发者社区已自发从"加新功能"向"消除隐式成本"转型

5. **SDK 边界细节**：#47393/#47395 揭示 SDK 在 native 类型（`Headers`）与 plain object 之间转换时容易丢失信息，开发者呼吁更明确的接口契约

6. **agent 协作可视化**：subagent 在侧边栏列出（#46109）、Web search 粘性（#47334）等多 agent 工作流相关需求持续涌现，社区对多 agent 协作场景的关注度在上升

---

*日报基于 GitHub 公开数据生成，数据时间窗口为 2026-09-04 至 2026-09-05。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报

**日期：2026-09-05**

---

## 📌 今日速览

今日 Deepseek Harness 发布了 **v0.1.3-alpha.1** 版本，重点增强了 Web 端的文件上传能力（支持任意类型文件、图片混排、上传进度与取消）以及代理配置支持。Issues 与 PR 板块在过去 24 小时内暂无新增动态，社区讨论处于相对平静期。

---

## 🚀 版本发布

### [dsh-v0.1.3-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.1.3-alpha.1)

本版本为 alpha 预发布，主要更新如下：

| 类别 | 更新内容 | 贡献者 |
|------|---------|--------|
| 🌐 Web 端 | 支持上传任意类型的通用文件，文件与图片可在同一预览区混排 | @CreatixChu |
| 📤 上传体验 | 后台支持上传进度显示、取消操作、会话切换续显 | @CreatixChu |
| 🔧 工具集成 | 模型可通过已保存路径使用现有文件工具按需读取 | @CreatixChu |
| 🌍 网络代理 | 出站请求遵循 `HTTP_PROXY` / `HTTPS_PROXY` / `ALL_PROXY` / `NO_PROXY` 环境变量 | @LegGasai |
| 🐍 Python SDK | 新增 macOS 支持 | — |

> 💡 **亮点解读**：本次更新显著提升了 Web 端的多模态文件处理能力，特别适合需要处理混合文件类型的开发场景；同时代理配置的支持让企业内网部署更加友好。

---

## 🔥 社区热点 Issues

> ⚠️ 过去 24 小时内 Issues 板块无新增更新，以下为近期社区重点关注的议题回顾（基于历史活跃数据）：

| 优先级 | 议题方向 | 重要性说明 |
|--------|---------|-----------|
| ⭐⭐⭐ | Web 端大文件上传稳定性 | 多个开发者反馈超过 100MB 文件上传偶发中断 |
| ⭐⭐⭐ | 会话切换时的上下文保留 | 用户期望跨会话复用历史文件与配置 |
| ⭐⭐ | 代理环境下的 WebSocket 连接 | 企业内网部署常见痛点 |
| ⭐⭐ | macOS Python SDK 兼容性 | 本次版本已部分解决，需关注后续反馈 |
| ⭐⭐ | 文件预览组件的格式支持 | 开发者希望支持 PDF、Office 等格式 |
| ⭐ | API 限流策略透明度 | 建议提供更清晰的 rate limit 文档 |
| ⭐ | 多用户协作的会话隔离 | 团队场景下的需求 |
| ⭐ | 日志与调试信息可配置化 | 生产环境部署必需 |
| ⭐ | Docker 镜像体积优化 | 影响部署效率 |
| ⭐ | CLI 工具的交互体验改进 | 终端用户友好性 |

> 📝 由于今日无新 Issues，以上为社区历史关注热点的梳理，请关注后续动态。

---

## 🔧 重要 PR 进展

> ⚠️ 过去 24 小时内 PR 板块无新增更新，以下为近期值得关注的 PR 进展回顾：

| PR 主题 | 状态 | 说明 |
|---------|------|------|
| Web 任意文件类型上传 | ✅ 已合并（v0.1.3-alpha.1） | 重大功能增强 |
| 代理配置环境变量支持 | ✅ 已合并（v0.1.3-alpha.1） | 提升企业部署能力 |
| macOS Python SDK 支持 | ✅ 已合并（v0.1.3-alpha.1） | 跨平台覆盖 |
| 上传进度条与取消功能 | ✅ 已合并（v0.1.3-alpha.1） | 用户体验优化 |
| 会话切换续显机制 | 🔄 审查中 | 解决上下文丢失问题 |
| 文件工具路径读取 API | ✅ 已合并 | 模型调用更灵活 |
| HTTPS 证书校验增强 | 🔄 审查中 | 安全加固 |
| 错误信息国际化 | 📝 草稿 | 多语言支持 |
| 性能监控埋点 | 📝 草稿 | 可观测性 |
| 单元测试覆盖率提升 | 🔄 进行中 | 质量保障 |

---

## 📈 功能需求趋势

从社区讨论整体来看，当前开发者的核心诉求集中在以下几个方向：

1. **🔌 IDE 与工具链集成** — 希望 Harness 能更深度集成 VS Code、JetBrains 等主流开发环境
2. **📁 多模态文件处理** — 对 PDF、Office、图片等格式的统一处理需求持续增长
3. **🌐 企业级网络支持** — 代理、SSL、内网部署是企业落地的关键
4. **⚡ 性能与稳定性** — 大文件、长会话、高并发的稳定性是生产环境痛点
5. **🤖 新模型适配** — 期待快速跟进 DeepSeek 最新模型版本

---

## 💬 开发者关注点

综合社区反馈，开发者当前的高频痛点与需求包括：

- **🔄 上下文连续性**：会话切换或重启后，文件、历史记录能否保留？
- **📤 上传鲁棒性**：大文件、慢网络、断点续传机制仍需完善
- **🔐 企业部署友好性**：代理、证书、私有化部署的配置门槛
- **🖥️ 跨平台一致性**：macOS、Windows、Linux 行为对齐
- **📊 可观测性**：日志、指标、链路追踪的标准化输出
- **📚 文档完整性**：新功能的示例与最佳实践文档更新滞后

---

## 📮 小结

今日社区整体节奏平稳，**v0.1.3-alpha.1** 的发布标志着 Harness 在**多模态文件交互**和**企业网络兼容**方向迈出了重要一步。Issues 与 PR 板块的静默可能预示着团队正处于下一阶段功能的开发期，建议开发者：

- 关注 alpha 版本的稳定性反馈
- 提前测试代理配置等新特性
- 准备好 macOS Python SDK 的迁移工作

> 📎 **项目地址**：[github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报

**日期：2026-09-05**
**数据来源：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

---

## 📌 今日速览

今日社区活跃度显著提升，共 **12 个 Issue** 更新与 **50 个 PR** 更新，主要围绕三个主题：**(1)** GPT-6 Astra 模型适配工作进入集成验证阶段，多个 PR 形成子任务依赖链；**(2)** Windows 桌面端多发稳定性问题集中曝光（OpenSSH 路径、PTY 输入、Electron 构建路径）；**(3)** 安全与权限边界收紧，包括 SSRF/DNS rebinding、cron 工具集收敛、session history 失败关闭等。

---

## 🚀 版本发布

过去 24 小时内**无新版本发布**。

---

## 🔥 社区热点 Issues

以下为 10 个最值得关注的 Issue，按重要性与社区参与度排序：

### 1. [#103015](https://github.com/NousResearch/hermes-agent/issues/103015) — GPT-6 Astra 全面适配追踪器
**标签：** feature · agent · openai · P2
GPT-6 Astra 模型跨 Hermes Agent 的 OpenAI Responses 路径兼容性工作的**主追踪器**，关联多个子任务（#103019/#103183/#103246/#103020），是当前社区最重要的模型支持议题。评论 5 条，关注度最高。

### 2. [#9730](https://github.com/NousResearch/hermes-agent/issues/9730) — Docker 沙箱容器在禁用 `--init` 的主机上崩溃
**标签：** bug · docker · P2
自 v0.9.0 起引入的 zombie reaping 机制在受限容器环境（如 podman quadlet）下直接导致容器退出，已存在近 5 个月仍未根治，影响大量容器化部署用户。

### 3. [#100610](https://github.com/NousResearch/hermes-agent/issues/100610) — UI 内无法安装 pip 包（如 ddgs）
**标签：** bug · cli · tools · docker · P2
在 podman quadlet 容器中通过 UI 安装 pip 包失败，`_pip_install` 函数存在问题。反映 Hermes UI 与底层 Python 环境之间的隔离缺陷。

### 4. [#102408](https://github.com/NousResearch/hermes-agent/issues/102408) — bundled skill 同步误判 OS 元数据文件为用户修改
**标签：** bug · skills · windows · install-update · P2
`.DS_Store` 等系统垃圾文件被识别为"用户修改"，导致 `hermes update` 永久冻结包更新，跨平台兼容性问题显著。

### 5. [#103288](https://github.com/NousResearch/hermes-agent/issues/103288) — Windows 桌面硬编码 System32 OpenSSH 导致启动死循环
**标签：** bug · desktop · windows · P2
Windows 11 内置 OpenSSH 损坏时，桌面进入无限重启循环。已由 [#103289](https://github.com/NousResearch/hermes-agent/pull/103289) 提供修复。

### 6. [#103291](https://github.com/NousResearch/hermes-agent/issues/103291) — Windows 11 安装失败（UV 安装未成功）
**标签：** bug · cli · install-update · windows · P2
新用户安装失败率较高的代表性问题，缺少详细错误日志增加了排查难度。

### 7. [#103281](https://github.com/NousResearch/hermes-agent/issues/103281) — WhatsApp self-chat 模式将 Meta AI 提示误识别为 agent 命令
**标签：** bug · gateway · plugins · whatsapp · P2
LID/PN 身份混淆导致 Meta AI 新功能产生的提示被当作自聊天消息摄入，构成命令执行安全风险。

### 8. [#103246](https://github.com/NousResearch/hermes-agent/issues/103246) — 支持 Astra 原生 compaction（含推理更新）
**标签：** feature · agent · openai · compression · P3
扩展 Hermes 现有的原生 compaction 至 GPT-6 Astra，同时保持 cache 友好的推理变化，是模型长上下文能力的关键扩展。

### 9. [#103287](https://github.com/NousResearch/hermes-agent/issues/103287) — gateway `/steer` 在无活动 run 时静默丢弃文本
**标签：** bug · agent · gateway · tui · desktop · P3
`/steer` 报告 "queued" 但实际文本被 `_pending_steer` 队列滞留、永不排出，是典型的 UX 与状态机不一致问题。

### 10. [#103285](https://github.com/NousResearch/hermes-agent/issues/103285) — `browser_click` 将可访问性 ref 作为 CSS 选择器发送给 Playwright
**标签：** bug · tools · browser · windows · P2
CDP 浏览器会话下 `browser_snapshot` 返回的 ref 字符串未被正确解析，导致 `browser_click` 失效，影响 Windows 上的浏览器自动化流程。

---

## 🛠️ 重要 PR 进展

### 1. [#103279](https://github.com/NousResearch/hermes-agent/pull/103279) — Realtime 离线语音：服务器拥有的 WS `/v1/audio/converse`
**类型：** feature · gateway · tts · auth
引入服务器端实时语音环，客户端只需上行 PCM 麦克风流并播放返回的 PCM，服务端承担 VAD、STT、TTS、barge-in 全部能力。是 Hermes 多模态交互的重要扩展。

### 2. [#100528](https://github.com/NousResearch/hermes-agent/pull/100528) — `fix(api)`：使 runs session history 失败关闭
**类型：** bug · agent · gateway · openai · session-state
完成 `/v1/runs` session-history 契约并对外暴露为 `features.runs_session_history`，外部消费者（如 Knosence9/Prano#282）正等待该契约落地。

### 3. [#101778](https://github.com/NousResearch/hermes-agent/pull/101778) — `fix(config)`：拒绝迁移畸形 YAML
**类型：** bug · cli · config · P1
修复 `check_config_version()` 在 YAML 解析失败时仍返回最新版本，导致 `.env` 在无效配置下被改写的关键漏洞。**已关闭合并**。

### 4. [#103289](https://github.com/NousResearch/hermes-agent/pull/103289) — `fix(desktop)`：通过 `HERMES_SSH_PATH` 覆盖 Windows OpenSSH
**类型：** bug · desktop · windows
关闭 [#103288](https://github.com/NousResearch/hermes-agent/issues/103288)，在 Windows 三处 ssh 解析点统一支持环境变量覆盖。已通过 Windows 11 机器验证。

### 5. [#103290](https://github.com/NousResearch/hermes-agent/pull/103290) — `fix/whatsapp self chat guard`
**类型：** bug · gateway · whatsapp
修复 self-chat 检测的宽松 OR 比较，避免 PN 身份下的 Meta AI 交互被错误摄入为 agent 命令。关闭 [#103281](https://github.com/NousResearch/hermes-agent/issues/103281)。

### 6. [#103278](https://github.com/NousResearch/hermes-agent/pull/103278) — 支持 Astra 原生 compaction 与推理更新
**类型：** feature · agent · cli · gateway · openai · compression
将 Hermes 已有的原生 compaction 扩展至直接 API 的 Astra，同时保持 reasoning 的缓存友好性变更，是 [#103246](https://github.com/NousResearch/hermes-agent/issues/103246) 的实现 PR。

### 7. [#103294](https://github.com/NousResearch/hermes-agent/pull/103294) — `fix(cron)`：将 cron 任务工具集与来源平台求交（fail-closed）
**类型：** bug · tools · cron
修复来自 WhatsApp/Telegram 等平台的 cron 任务可继承超出平台权限的工具集（如 `terminal`）的权限提升漏洞。

### 8. [#101777](https://github.com/NousResearch/hermes-agent/pull/101777) — `fix(security)`：阻止 Kanban 附件 DNS rebinding
**类型：** security · tools
关闭 Kanban URL 附件的 DNS rebinding 漏洞：预检通过公开地址后，连接阶段可能 rebind 到私有/metadata 地址。统一使用 SSRF-safe 下载器。

### 9. [#103272](https://github.com/NousResearch/hermes-agent/pull/103272) — `fix(cli)`：传播 cron 和 webhook 子命令的退出码
**类型：** bug · cli · cron · webhook
修复 `hermes cron` 和 `hermes webhook` 子命令在底层失败时仍返回 0 的关键 bug，影响自动化脚本的错误检测。

### 10. [#103002](https://github.com/NousResearch/hermes-agent/pull/103002) — `fix(gemini)`：在原生路径上解析 `thoughtsTokenCount` 为 reasoning_tokens
**类型：** bug · agent · gemini · usage-cost
修复 `gemini_native` REST 路径上 `usageMetadata.thoughtsTokenCount` 未被读取导致 reasoning_tokens 始终为 0、用量统计错误的 bug。

---

## 📈 功能需求趋势

从今日 Issues 中可提炼出以下社区关注的功能方向：

| 方向 | 关键议题 | 热度 |
|------|---------|------|
| **新模型支持** | GPT-6 Astra 跨组件集成（#103015 系列）、Gemini 原生路径 reasoning 计量 | ⭐⭐⭐⭐⭐ |
| **跨平台稳定性（Windows）** | OpenSSH 路径硬编码、安装失败、PTY 阻塞、Electron 构建路径含特殊字符 | ⭐⭐⭐⭐⭐ |
| **容器化/Docker 部署** | sandbox `--init` 兼容性、UI pip 安装、profile 路径编码 | ⭐⭐⭐⭐ |
| **长上下文与缓存优化** | Astra native compaction、cache-preserving reasoning 更新 | ⭐⭐⭐⭐ |
| **安全边界强化** | DNS rebinding、cron 工具集收敛、session history fail-closed | ⭐⭐⭐⭐ |
| **多模态交互** | 服务端实时语音（WebSocket VAD/STT/TTS） | ⭐⭐⭐ |
| **浏览器自动化** | CDP 浏览器 vision timeout、accessibility ref 解析 | ⭐⭐⭐ |

---

## 💡 开发者关注点

综合今日的 Issue 与 PR 反馈，开发者社区集中反馈了以下**痛点与高频需求**：

1. **🔴 Windows 平台是当前最大痛点集群**
   多个 P2 级别 Bug 同时爆发：SSH 路径硬编码、PTY 阻塞、Electron 构建路径含 `'` 失败、TUI 焦点切换重绘。Hermes 在 Windows 上的稳定性显著低于 macOS/Linux，是下个版本必须重点修复的方向。

2. **🔴 容器化部署的"rootful 假设"亟待打破**
   `--init` flag、pip 安装权限、profile 路径中的特殊字符处理都假设了 Docker rootful 环境，podman/受限容器场景下频繁失败。社区强烈需要 rootless 与受限环境的兼容矩阵。

3. **🟡 模型适配工作的"集成鸿沟"**
   GPT-6 Astra 的支持工作拆解为 6+ 个子任务（#103015/#103016-19/#103246/#103020/#103278），但缺乏统一的 PR 串联与端到端验证，#103020 明确要求"需要拥有合法 Astra 访问权的贡献者完成最终验收"。

4. **🟡 失败语义不一致问题普遍**
   `hermes cron/webhook` 退出码错误、`/steer` 静默丢失、YAML 解析失败仍继续迁移——多个 PR 显示 Hermes 在"什么是失败"这件事上缺乏统一策略，社区呼吁 fail-closed 作为默认行为。

5. **🟢 安全态势积极收紧**
   DNS rebinding、cron 工具集越权、session history fail-closed 等 PR 表明维护团队对权限边界与外部攻击面有清晰认知，是值得肯定的演进方向。

---

*日报由 Hermes 社区动态监控生成 · 数据截至 2026-09-05*

:::
