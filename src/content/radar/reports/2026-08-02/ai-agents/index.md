---
title: OpenClaw 生态日报
published: 2026-08-02
report: ai-agents
tags:
  - radar
  - AI
---
# OpenClaw 生态日报 2026-08-02

> Issues: 211 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-02 00:39 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)

---

## OpenClaw 项目深度报告

⚠️ 摘要生成失败。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期**：2026-08-02  
**数据来源**：NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、CoPaw（OpenClaw、Moltis 摘要生成失败，未纳入定量对比）


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**从"可用"向"可长期信赖"过渡的关键阶段**。各项目不约而同地把重心从"增加新能力"转向"数据一致性、多 Agent 安全边界、长会话稳定性"等工程化问题上——NanoBot 与 CoPaw 集中修复内存/上下文压缩缺陷，Zeroclaw 暴露了独属于多 Agent 场景的数据隔离架构弱点，IronClaw 在 CI 门禁与性能回归上建立基础设施级防线。与此同时，模型提供商兼容层（OrcaRouter、Exa、OpenRouter 等）成为所有项目同步发力的"标配赛道"，反映了上游模型生态碎片化对下游工具的持续压力。整体判断：生态正在经历从"demo-ready"到"production-grade"的第一次系统性筛选。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 合并/关闭 PR | Release | 健康度评估 |
|------|------------|---------|-------------|---------|-----------|
| **NanoBot** | 5（4 关闭） | 25（13 合/关） | 13 | 无 | 🟢 优秀 — 修复落地快、P1 集中收敛，开发节奏极佳 |
| **Zeroclaw** | 8（0 关闭） | 50 待合并 | 0 | 无 | 🟠 风险 — 提交活跃但合并完全停滞，2 个 S0 级安全缺陷悬置 |
| **PicoClaw** | 1（0 关闭） | 3（1 关闭） | 0 | 无 | 🟡 平稳 — 活跃度低，核心通道 Bug 32 天未获回应 |
| **NanoClaw** | 2 | 16（6 合/关） | 6 | v2.1.54 Rollup | 🟢 良好 — 发布频率高（Rollup 机制），iMessage 统一落地 |
| **IronClaw** | 19（2 关闭） | 24（8 合/关） | 8 | 无 | 🟢 良好 — 重构执行力强，但两条性能回归线和 release 积压 30 天是隐患 |
| **LobsterAI** | 7（6 stale 关闭） | 2（0 合并） | 0 | 无 | 🔴 低迷 — 6 条 bug Issue 被自动关闭且无修复，PR #1224 悬置 4 个月 |
| **CoPaw** | 9 | 13（1 合/关） | 1 | 无 | 🟠 活跃但合并滞后 — 12 条 PR 积压，4 条 first-time contributor 贡献等待合入 |

## 3. OpenClaw 在生态中的定位

⚠️ 本次 OpenClaw 日报摘要生成失败，无法提供当日精确数据。基于其作为**核心参照项目**的角色定位及生态整体格局推断：

- **生态位**：OpenClaw 承担着该生态内"枢纽/参照系"的职能——多个项目（LobsterAI 提及 "openclaw 引擎"、NanoBot/CoPaw 等命名及功能路径）都在向 OpenClaw 的 API 设计、通道抽象或引擎架构对齐。
- **技术路线**：从生态内其他项目对其的引用来看，OpenClaw 定义了偏通用的 Agent 运行时 + 多通道适配器架构，是各项目做"兼容性对比"时的基准线。
- **社区规模**：从本项目社区的提及频次推断，OpenClaw 的社区认知度高于多数同类，但其自身的活跃度指标本次缺失，无法量化。

> 建议在下次报告中重点追踪 OpenClaw 的恢复情况——它的状态直接影响生态内多个项目的兼容性策略。

## 4. 共同关注的技术方向

### 4.1 内存/上下文管理与压缩（最强共性信号）
| 项目 | 具体诉求 |
|------|---------|
| **NanoBot** | 容忍损坏的 session summary、保留 `wait_for` 跨截断状态 |
| **CoPaw** | 自动压缩未触发 `summarize_when_compact`、压缩占位符 `role=user` 导致 OpenAI 兼容 API 400 |
| **NanoClaw** | 模板 context Markdown 前置、migrate-v2 引用已删除函数 |
| **IronClaw** | Token 估算 Bug（用引用字符串长度而非内容长度） |

**诉求本质**：长会话已成为默认使用场景，上下文生命周期的正确性（压缩、恢复、估算）是决定 Agent 可不可信的基础。

### 4.2 模型提供商兼容层扩张
| 项目 | 具体动作 |
|------|---------|
| **CoPaw** | 新增 OrcaRouter（PR #6622）、对齐阿里云模型列表（#6631） |
| **PicoClaw** | 新增 Exa 搜索、OrcaRouter（#3299/#3309） |
| **IronClaw** | 用户请求内置 OrcaRouter（#7009） |
| **NanoBot** | 本地 provider 劫持云模型修复（#3732） |
| **Zeroclaw** | 请求向 OpenRouter 发送稳定 session_id 以降本（#9631） |

**诉求本质**：上游模型/provider 碎片化是普遍痛点，各项目都在通过统一兼容层降低用户的切换成本。

### 4.3 多 Agent 数据安全与所有权边界
| 项目 | 具体问题 |
|------|---------|
| **Zeroclaw** | S0：sessions/channel 工具无 per-agent 所有权校验；知识图谱全局限共享（#9646/#9647） |
| **CoPaw** | 多 Agent 协作无产品内引导，Default Agent 不会自动调用其他 Agent（#6621） |
| **NanoBot** | 按用户/聊天粒度的消息限流（#5108）——通道安全治理 |

**诉求本质**：多 Agent 从"演示"走向"真实部署"时，身份隔离、权限校验、协作边界是必须解决的架构级问题。

### 4.4 通道/运行时稳定性（"静默死亡"类 Bug）
| 项目 | 具体问题 |
|------|---------|
| **Zeroclaw** | WhatsApp 空 `allowed_groups` 默认放行全部群组（#9397，fail-closed 诉求） |
| **PicoClaw** | Matrix `/sync` 长轮询无重连，网络中断后静默死（#3203） |
| **CoPaw** | `nohup`/`&` 后台进程导致 Agent 永不返回（#6480） |

**诉求本质**：通信链路和进程生命周期必须在异常后自愈或显式告警，"看起来正常但实际已死"是对用户信任的最大伤害。

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|------|---------|---------|-------------|
| **NanoBot** | WebUI 体验、多通道适配器、Quick Chat/跨会话搜索 | 自部署个人用户、重视日常交互效率的开发者 | Python 为主，模块化 agent 运行时，通道适配器抽象统一 |
| **Zeroclaw** | 大规模多 Agent 编排、通道矩阵（WhatsApp/Telegram/Slack）、Eval 评测体系 | 高级用户 / 多账号运营者 / 社区型部署 | Go 类高性能运行时，安全中继、远程配对、浏览器/桌面控制（computer-use）、ScopedToolRegistry 架构演进 |
| **IronClaw** | 工程强度、架构重构（Reborn）、CI 门禁、性能回归防线 | 对工程质量有硬要求的团队/开发者 | Rust 多 crate 工作区，契约驱动（product_contracts）、依赖边界测试、可观测性建设 |
| **NanoClaw** | 通道多样性（iMessage 统一双后端、Telegram/WhatsApp）、快速发布迭代 | 追求新渠道快速接入、运维轻量的用户 | Rollup 版本模式，rootless Docker，凭证主动告警，MCP 工具链 |
| **CoPaw** | 中文用户生态、多 Agent 协作、ACP 传输协议、桌面端体验 | 中文开发者 / 研究生 / 使用 AGENTSCOPE 生态的用户 | 基于 AgentScope（Python），内存自动压缩（Scroll）、Skill 标签持久化、OrcaRouter 集成 |
| **PicoClaw** | 轻量级、外部集成扩展（搜索供应商、模型路由） | 嵌入式/边缘场景用户（SiPEED 背景）、轻量自部署 | 体积小，专注 provider 与 WebUI，Matrix 通道稳定性待补强 |
| **LobsterAI** | 中文 AI 编程助手/IDE 集成 | 网易有道生态用户、中文开发者 | Renderer 层（Web UI）为当前修复重点，i18n、MCP 支持、长图解析；维护活跃度低 |

**关键差异**：  
- **语言/技术栈**：IronClaw（Rust）与 Zeroclaw（Go）代表追求性能与工程严谨的路线；NanoBot/CoPaw（Python）代表快速迭代与生态兼容路线。  
- **用户分层**：NanoBot、PicoClaw 面向轻量自部署个人用户；Zeroclaw、IronClaw 面向高级/团队用户；NanoClaw、CoPaw、LobsterAI 各有渠道或生态绑定（iMessage / 中文社区 / 网易）。

## 6. 社区热度与成熟度

### 快速迭代期（高活跃 + 高合并率）
- **NanoBot** — 25 条 PR 更新、13 条合并，修复与功能并行，是生态中"节奏最健康"的项目。
- **IronClaw** — 24 条 PR、8 条合并，Reborn 重构按计划推进，CI 治理成熟，但 release 发布节奏被阻塞（#5598 悬置 30 天）。
- **NanoClaw** — Rollup 发布补丁版本，iMessage 统一落地，迭代频率生态内最高。

### 提交活跃但合并阻塞（贡献势能 > 维护带宽）
- **Zeroclaw** — 50 条待合并 PR 积压、0 合并，同时安全议题集中爆发，容易出现"分支漂移 → 冲突 → 更难合并"的恶性循环。
- **CoPaw** — 12 条 PR 积压、4 条首次贡献者 PR 等待合入，若不及时消化，外部贡献热情可能衰减。

### 稳定维护期 / 增长乏力
- **PicoClaw** — 活跃度低，新功能 PR 已完成但无合并，核心 Bug 长期未获回应；属于"开发仍在继续但社区参与稀薄"。
- **LobsterAI** — 6 条用户报告的 Bug 被 stale 机制自动关闭且无修复，PR 积压 4 个月未处理；低成本恶意拉低社区信任度，处于"低活跃、高积压"的亚健康状态。

### 健康度排序
**NanoBot > IronClaw ≈ NanoClaw > CoPaw > PicoClaw ≈ Zeroclaw > LobsterAI**

## 7. 值得关注的趋势信号

### 7.1 多 Agent 数据隔离将成为下一阶段的核心安全议题
Zeroclaw 一天内浮出两个 S0 级越权缺陷（会话工具、知识图谱），且同项目的 WhatsApp 空列表 fail-closed 讨论也在发酵。这标志着生态已从"单 Agent 工具"迈入"多 Agent 平台"阶段，但**身份与所有权边界尚未跟上功能发展速度**。对开发者：在设计内置工具时，应默认携带属主/作用域校验，而不是依赖模型参数中的标识符。

### 7.2 "静默失败"是最具杀伤力的稳定性问题
PicoClaw（Matrix 无重连）、CoPaw（nohup 卡死）、Zeroclaw（provider 失败模糊提示）三个不同项目在同一天暴露同类问题——系统不崩溃、不报错，但功能已死。**可观测性（告警、状态刷新、日志提示）正在成为基础能力要求**，而非可选项。

### 7.3 AI 辅助 Bug 报告开始成为常态
CoPaw #6619 的人类报告者明确声明由 AI 编码 Agent（Factory Droid）辅助完成复现与根因分析，并得到维护者认可。这意味着**外部贡献质量正在被 AI 工具提高**，维护者需要适应"更专业的社区报告"，而开发者则应学会把 AI Agent 作为代码分析放大器来使用。

### 7.4 存储/数据膨胀成为产品级问题
CoPaw #6593 对磁盘占用（自动记忆、工具产物、备份、历史对话）的系统性梳理，标志着 Agent 长期运行后的资源治理从"小事"上升为"产品需求"。**自动清理策略、全局管理页面、可回收的工作区目录**将成为成熟 Agent 项目的标配功能。

### 7.5 轻量唤起式交互（Spotlight/Raycast 化）
CoPaw #6568 提出全局快捷键唤出浮动快速输入框，与 ChatGPT/豆包等商业产品的交互趋势一致。**Agent 正在从"应用内工具"演化为"系统级工具"**，对桌面端架构（Tauri/Electron）和系统集成能力提出新要求。

### 7.6 性能回归需要被"制度化"地监测
IronClaw 的容量门禁（Postgres p95 3.74s→12s）和 libSQL 写入病理（p95 37–135s）显示，即使工程严格如 IronClaw，性能劣化仍会悄然发生。**门禁自动化 + 趋势追踪**将成为大型 Agent 项目的必要基础设施，而非事后排查手段。

---

**结语**：个人 AI 助手生态正处于"功能丰富度竞争"接近尾声、"可信赖度竞争"全面开启的分水岭。NanoBot 与 IronClaw 代表了两条值得借鉴的工程路径——前者以快速修复维持用户信任，后者以架构纪律防患于未然。对于技术决策者，建议在选择项目时优先考察其在 **数据隔离模型、上下文生命周期管理、失败可观测性** 三个维度上的成熟度，而非单纯的功能列表广度。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-02

## 1. 今日速览

过去 24 小时项目非常活跃：PR 更新 25 条，其中 13 条已合并/关闭、12 条待合并，开发节奏紧凑；Issue 处理效率同样较高，5 条更新中 4 条已关闭。无新版本发布。今日变更以稳定性修复为主，多个 P1 级 bug（cron 状态丢失、session 元数据损坏、exec 截断、通道限流）均已落地修复；功能侧则出现 Quick Chat、跨会话搜索、受信任代理认证等多项 WebUI/Agent 能力增强 PR，显示项目正在从基础修复向量化增长阶段过渡。整体项目健康度良好，维护者的响应速度和交付质量均处高位。

---

## 3. 项目进展

今日合并/关闭的 PR 共 13 条，覆盖 bug 修复、安全加固、重构与进阶功能四类，项目在数据一致性、通道治理、provider 兼容性三个方面取得明显进展。

### 关键修复合并
- **[bug, fix, test, priority: p1] fix(session): tolerate malformed persisted session summary**（#5201，已合并）— 自动压缩逻辑不再因损坏的 `_last_summary` 元数据崩溃，缺失文本时回退到 `updated_at`，增强长期运行稳定性。[链接](https://github.com/HKUDS/nanobot/pull/5201)
- **[bug, fix, test, priority: p1] fix(exec): preserve wait targets across response truncation**（#5200，已合并）— `write_stdin(wait_for=...)` 的等待目标不再因输出截断而丢失，修复 head/tail 截断导致的匹配失败。[链接](https://github.com/HKUDS/nanobot/pull/5200)
- **[fix, test, priority: p1] fix(cron): preserve manual run completion state**（#5183，已合并）— 对应 #5163，手动触发的 cron 任务在 WebUI 轮询并发读取时不再丢失完成状态。[链接](https://github.com/HKUDS/nanobot/pull/5183)
- **[regression, fix, test, priority: p1] fix(memory): handle non-string timestamp and missing role in raw_archive**（#5153，已合并）— 对应 #4801，raw 归档时不再因 `timestamp: None` 或缺失 `role` 键抛 KeyError。[链接](https://github.com/HKUDS/nanobot/pull/5153)
- **[documentation, channel, fix, test, priority: p1] fix(channels): add per-sender message rate limiting**（#5108，已合并）— 为所有通道适配器增加按用户/聊天粒度的消息限流，防止配对用户无限消耗 token 与执行工具，是今日最重要的安全加固。[链接](https://github.com/HKUDS/nanobot/pull/5108)
- **[bug, fix, priority: p1] fix(dream): advance cursor when durable changes were made**（#5208，已合并）— Dream cron 任务在 ephemeral agent run 产生编辑但报告非 clean 状态时，不再重复处理历史批次。[链接](https://github.com/HKUDS/nanobot/pull/5208)

### Provider 兼容性
- **[fix(providers): require api_base before local provider wins on keyword match**（#3732，已合并）— 修复同名 model-family 关键字下本地 provider 静默劫持云模型的选择缺陷，是自 5 月以来的长期 issue，今日终于落地。[链接](https://github.com/HKUDS/nanobot/pull/3732)

### 功能进阶
- **feat: preserve Responses reasoning state and compact context**（#5172，已合并）— 完整保留并回放 Responses API 的 opaque output-item 链（含加密推理），并支持压缩上下文，为推理密集型任务提供更强上下文保持能力。[链接](https://github.com/HKUDS/nanobot/pull/5172)

### 代码质量重构
- **refactor(cli): narrow Pyright suppressions**（#5199，已合并）— 用更精准的行级忽略替代文件级 suppression，降低类型检查盲区。[链接](https://github.com/HKUDS/nanobot/pull/5199)
- **refactor(webui): reuse sidebar selection highlight**（#5209，已合并）— 统一侧边栏选中态视觉组件，修复闪烁并改善新话题路由的即时高亮。[链接](https://github.com/HKUDS/nanobot/pull/5209)

> 另有 #5186（skills.sh 知名源支持）等 PR 处于待合并状态，详见第 6 节。

---

## 4. 社区热点

### 最热门 Issue：#5185 — 响应中突然出现 tool call 代码
- 评论 4 条（今日最高），作者 @fablau 反馈"突然"开始出现 tool calls 代码出现在响应文本中，并附截图。已被标记为 `[invalid, provider]`，说明最终定位为 provider 配置或外部行为，不是 Nanobot 本身的缺陷。[链接](https://github.com/HKUDS/nanobot/issues/5185)
- **分析**：用户对"响应中出现代码块"非常敏感，即使是外部原因也值得在文档中做排查指引。

### #5205 — `ensurepip` 缺失导致飞书插件无法启用
- 评论 2 条，通过 `uv tool` 安装的 Nanobot 在 `plugins enable feishu` 时因 Python 无 `ensurepip` 模块失败。该 issue 已关闭，但反映了 uv 工具链在不同系统下的环境一致性问题。[链接](https://github.com/HKUDS/nanobot/issues/5205)

### #5198 — 会话内无法切换模型（唯一新开 issue）
- 评论 1 条，用户 @whisperity 明确表达对多模型灵活切换的期望：点击模型 blip 无反应、`/model` 命令传 ID 无效。该 issue 仍为打开状态。[链接](https://github.com/HKUDS/nanobot/issues/5198)

---

## 5. Bug 与稳定性

今日报告的 bug 较少，大部分已有关联 fix PR 或已关闭，项目正处于"修复收敛"节奏。

### 高严重度（P1）
- **#5198 [OPEN] 无法在会话中切换模型** — 用户用词强烈（"Not possible to change models"），且 `/model` 命令行为与预期不符，影响核心使用体验。暂无直接 fix PR，但有 #5202 正在改善 UI 可发现性。[链接](https://github.com/HKUDS/nanobot/issues/5198)
- **#5163 [CLOSED] 手动 cron 运行成功但 UI 仍显示 Failed** — 已由 #5183 修复（已合并），根因是 `CronService.run_job()` 与 WebUI 轮询读 store 的并发竞争。[链接](https://github.com/HKUDS/nanobot/issues/5163)
- **#4801 [CLOSED] malformed session 条目导致 KeyError** — 已由 #5153 修复（已合并），`_format_messages()` 现可容忍缺失 `role` 字段及非字符串时间戳。[链接](https://github.com/HKUDS/nanobot/issues/4801)

### 中低严重度
- **#5205 [CLOSED] `ensurepip` 缺失导致飞书插件不可用** — 环境依赖问题，已关闭，建议在安装文档中补充 `uv tool install` 的 Python 依赖说明。[链接](https://github.com/HKUDS/nanobot/issues/5205)
- **#5185 [CLOSED] tool calls 代码泄漏到响应** — 标记为 invalid/provider 问题，非核心代码 bug，但值得跟进用户在何种 provider/模型下复现。[链接](https://github.com/HKUDS/nanobot/issues/5185)

### 仍在待合并队列中的 P1 修复
- **#5139 [OPEN, conflict] 保留媒体路径（regression）** — 修复归档后媒体文件不可恢复的问题，功能完整但带有 conflict 标签，需维护者解决冲突后合入。[链接](https://github.com/HKUDS/nanobot/pull/5139)
- **#5208 [CLOSED] Dream 游标不推进** — 已合并，但注意该 PR 的"ephemeral agent run 产生 edited 但不报 clean"场景在其他模块可能也有类似判断逻辑，建议排查。[链接](https://github.com/HKUDS/nanobot/pull/5208)

---

## 6. 功能请求与路线图信号

### 模型切换（高确定性需求）
用户 #5198 明确要求能够在会话中动态切换模型，这是当前体验与 ChatGPT 等商业产品差距最大的地方。虽然 #5202（模型预设菜单）仅解决"可发现性"，但可以推测完整的多模型灵活切换可能会在近期版本中实现。[#5202](https://github.com/HKUDS/nanobot/pull/5202)

### Quick Chat / Temporary Chat（#5184，OPEN）
新增持久 Quick Chat（独立会话身份、不混入普通列表）与临时会话（连接生命周期内内存存储）。该功能会明显改变 WebUI 的使用方式，预计下一版本将纳入。[链接](https://github.com/HKUDS/nanobot/pull/5184)

### 跨会话搜索与提及（#5211，OPEN）
增加只读 `search_sessions` / `read_session` 工具并支持 `@` 引用另一个会话，将对话历史从"每个会话孤立"升级为"全局可检索"，是多会话管理的一大步。[链接](https://github.com/HKUDS/nanobot/pull/5211)

### 受信任代理认证（#5210，OPEN）
为 `/webui/bootstrap` 增加基于直连 IP CIDR + header 校验的免 token 认证路径，目标场景是 Cloudflare Tunnel + Access 等部署形态。DevOps/server 用户会非常欢迎。[链接](https://github.com/HKUDS/nanobot/pull/5210)

### 子代理模型预设（#5207，OPEN）
`spawn` 工具新增 `preset` 参数，子代理可独立指定 model + temperature，提升多 agent 协作的灵活性。[链接](https://github.com/HKUDS/nanobot/pull/5207)

### WebUI 性能优化（#5194，OPEN）
加速 JSONL 会话列表与线程加载，通过缓存 workspace scope 快照降低 `/api/sessions` 重复计算。大型会话库用户痛点明确。[链接](https://github.com/HKUDS/nanobot/pull/5194)

---

## 7. 用户反馈摘要

- **模型交互心智模型（#5198）**：用户以商业 SaaS 的"点击模型名即可切换"为预期，说明 Nanobot 正在从小众自部署工具走向更广泛的用户群体，交互直觉需要对齐行业标准。
- **tool call 代码泄漏（#5185）**：用户第一反应是"突然坏了"，即使最终归因为 provider，也反映出响应中不应出现非最终文本的调试信息；建议增加显式的内部调用展示开关。
- **cron 状态不一致（#5163）**：用户手动触发 cron 成功却看到 UI 显示"Failed"，此类状态不同步严重打击信任感，已经在 #5183 中修复，但仍建议补充 WebUI 侧的状态刷新机制测试。
- **uv 工具链环境（#5205）**：`uv tool` 安装的 Python 环境缺少 ensurepip，插件启用流程没有做降级处理。用户需要在文档中看到明确的 uv 依赖说明，或代码中补一个更友好的错误提示。

---

## 8. 待处理积压

- **#3869 [OPEN, question, conflict] DeepSeek 消息硬化**（5月16日创建，已 78 天未合并）— 解决 DeepSeek 对 null 内容 400 报错、"(empty)" 占位符泄漏、assistant 文本被丢弃三个问题。功能完整但与现有 sanitize 逻辑有冲突，且带 question 标签，维护者需要决策是合入重写还是吸收进新架构。[链接](https://github.com/HKUDS/nanobot/pull/3869)

- **#5139 [OPEN, regression, conflict] 媒体路径在 session 归档时丢失**（7月28日创建，P1）— 修复 #5118、#5135，根因是 `MemoryStore` 在 consolidate 时丢弃仅存在于 `media[]` 的路径，导致归档后文件不可恢复。功能代码已完成但存在 merge conflict，鉴于该问题影响数据持久化，建议尽快优先解决。[链接](https://github.com/HKUDS/nanobot/pull/5139)

- **#5198 [OPEN] 会话内无法切换模型**（7月31日）— 唯一新开 issue，核心功能缺口，直接影响模型管理体验。目前仅有 UI 可发现性 PR（#5202），缺少对 `/model` 命令失效的修复。[链接](https://github.com/HKUDS/nanobot/issues/5198)

- **#5186 [OPEN] WebUI 不支持知名 skills.sh 源**（7月30日）— 功能完整且影响技能市场可用性，目前仍在 review 中，建议关注合入进度。[链接](https://github.com/HKUDS/nanobot/pull/5186)

---

**总结**：NanoBot 在 8 月 2 日处于一个"修复落地、功能并行"的健康窗口期。P1 级稳定性问题集中解决（cron、memory、exec、channel rate limit），新功能 PR（Quick Chat、跨会话搜索、trusted proxy）展示了明确的路线图方向。项目的核心风险点在于：模型切换的开放 issue 尚未有完整修复方案、DeepSeek provider 硬化 PR 积压过久、P1 媒体路径修复存在 conflict 未合入。建议维护者优先处理 #5139 的冲突解决和 #5198 的模型切换方案确认。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-02

> 数据范围：过去 24 小时（2026-08-01 → 2026-08-02）· 数据源：Zeroclaw GitHub 仓库

## 1. 今日速览

过去 24 小时内，Zeroclaw 保持高活跃度但合并停滞：**无新版本发布，0 个 PR 被合并/关闭，50 个 PR 待合并，8 个新 Issues 全部为打开状态**。安全与权限治理是今日最突出的主题——两个 S0 级数据隔离缺陷（[#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646)、[#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647)）和一个高风险 WhatsApp 安全 RFC（[#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)）同时浮出水面。PR 池以大型功能分支为主（eval 评测体系、桌面控制、安全中继），大量 PR 标注 `needs-author-action`，评审积压与作者响应延迟是当前主要瓶颈。整体看，项目处于**提交活跃、合并阻塞、安全议题集中爆发**的阶段，社区对数据隔离和默认安全语义的关注度显著上升。

## 2. 版本发布

今日无新版本发布（Releases: 0）。上一个里程碑追踪器为 [v0.8.5 每周非破坏性发布](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)，目前仍处于进行中状态，截至今日实时快照未更新具体内容。

## 3. 项目进展

今日**无 PR 被合并或关闭**（merged/closed: 0），这是需要关注的信号——50 个待合并 PR 中不乏已存在数周以上的大型分支。结合待合并 PR 池分析，项目在以下几个方向有集中投入但尚未落地：

- **Eval 评测体系**：贡献者 @IftekharUddin 提交了 9 个相互关联的 PR，构成一个完整的评测工具链——[运行收据与失败转储](https://github.com/zeroclaw-labs/zeroclaw/pull/9220)、[基线文件与回归门控](https://github.com/zeroclaw-labs/zeroclaw/pull/9221)、[LLM-judge 分维度评分器](https://github.com/zeroclaw-labs/zeroclaw/pull/9222)、[JUnit XML 报告](https://github.com/zeroclaw-labs/zeroclaw/pull/9223)、[隔离案例内存评测](https://github.com/zeroclaw-labs/zeroclaw/pull/9244)、[追加式运行历史](https://github.com/zeroclaw-labs/zeroclaw/pull/9248)及[回归套件种子](https://github.com/zeroclaw-labs/zeroclaw/pull/9225)。该系列若合并，将显著提升 CI 对 agent 行为回归的感知能力。
- **通道治理与安全加固**：[移除 WATI 通道](https://github.com/zeroclaw-labs/zeroclaw/pull/9571)（priority:p0）和[Telegram 消息过滤修复](https://github.com/zeroclaw-labs/zeroclaw/pull/9634）均待合并；[浏览器截图路径校验](https://github.com/zeroclaw-labs/zeroclaw/pull/9362）修复任意文件写入漏洞。
- **运行时架构演进**：[引擎工具注册表封装为 ScopedToolRegistry](https://github.com/zeroclaw-labs/zeroclaw/pull/9319)与[skills 紧凑注入默认化](https://github.com/zeroclaw-labs/zeroclaw/pull/8313）代表了运行时层面的方向性改动，但均停留于待合并状态。

总体来看，**项目在功能开发和工程质量上的投入规模可观，但合并通道淤塞**——建议维护者优先处理一批已获得 `principal contributor` 背书的 eval 系列 PR 和标记 `priority:p0` 的 WATI 移除 PR，以避免分支漂移和后续冲突成本。

## 4. 社区热点

### 讨论最活跃

| 排名 | 条目 | 评论数 | 核心议题 |
|------|------|--------|----------|
| 1 | [#8692 Maintainer 决策队列跟踪器](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 7 | RFC 与设计议题的维护者裁决流程 |
| 2 | [#9397 WhatsApp 空 allowed_groups 应视为 permit-none](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) | 5 | 默认安全语义与 fail-closed 原则 |
| 3 | [#9631 向 OpenRouter 发送稳定 session_id](https://github.com/zeroclaw-labs/zeroclaw/issues/9631) | 2 | LLM API 调用成本优化 |

### 需求分析

- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** 的 7 条评论反映社区对**决策透明度和响应时效**的关注——RFC、设计议题和发布策略的裁决需要一个公开队列，避免长期悬置。
- **[#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)** 的讨论围绕 `allowed_groups` 空列表当前「放行所有群组」的默认行为展开，社区诉求是遵循安全默认原则（fail-closed）。该议题同时带 `risk:high` 和 `needs-maintainer-review` 标签，属于高优先级安全语义讨论。
- **[#9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)** 的诉求来自使用 OpenRouter 的真实成本痛点——同一会话内系统提示词和工具 schema 被反复计费，社区期望通过稳定 `session_id` 触发 prompt caching 以降低开销。

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列：

### 🔴 严重（S0 — 数据泄露/安全风险）

| 编号 | 标题 | 状态 | 修复 PR |
|------|------|------|---------|
| [#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646) | Session/channel 读写工具缺少 per-agent 所有权范围（`sessions_list/history/send`、`discord_search`） | OPEN · 1 评论 | 无 |
| [#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647) | 知识图谱无 per-agent 归属，任意 agent 可读/改其他 agent 的知识 | OPEN · 0 评论 | 无 |

**分析**：这两个 S0 级缺陷均由 @metalmon 在同一天报告，指向一个共同的架构问题——**多 agent 场景下缺少身份与所有权边界**。工具层从模型参数直接获取目标标识符（`session_id`、`channel_id`），无属主校验；知识图存储则完全全局共享。这与当日另一个高风险 RFC（[#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)，WhatsApp 群组越权）共同说明：**权限模型正受到社区严格审视**。目前尚无对应修复 PR，但 [#9319 ScopedToolRegistry](https://github.com/zeroclaw-labs/zeroclaw/pull/9319) 在架构上走向了工具作用域化的方向，可能成为解决该问题的基础设施。

### 🟠 高风险安全议题

- **[#9397 WhatsApp 空 `allowed_groups` 默认放行全部群组](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)**（RFC · risk:high · 5 评论）：当前空列表语义与用户预期相反，可能导致消息意外泄露至非授权群组。无对应修复 PR，需维护者裁决。

### 🟡 其他 Bug

- **[#9628 博客缺少 RSS/Atom Feed](https://github.com/zeroclaw-labs/zeroclaw/issues/9628)**（docs · risk:low · 1 评论）：项目博客（zeroclawlabs.ai/blog）缺少订阅入口，影响用户跟进项目动态。

### 待合并的修复类 PR（今日未合并）

- [#9362 修复浏览器工具截图路径逃逸](https://github.com/zeroclaw-labs/zeroclaw/pull/9362) — 关闭任意文件写入漏洞（priority:p1）
- [#9056 呈现 provider 失败的具体原因诊断](https://github.com/zeroclaw-labs/zeroclaw/pull/9056) — 替代模糊的 `All model_providers/models failed` 错误
- [#8576 OpenAI STT 凭证支持环境变量回退](https://github.com/zeroclaw-labs/zeroclaw/pull/8576)
- [#8546 CLI 状态片段本地化](https://github.com/zeroclaw-labs/zeroclaw/pull/8546)

## 6. 功能请求与路线图信号

### 新提出的功能需求

| 编号 | 功能 | 分析 |
|------|------|------|
| [#9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631) | 向 OpenRouter 发送稳定 `session_id` 以节省 prompt-cache 成本 | 成本优化类需求，实现面较窄（Provider 层参数透传），较可能进入近期版本 |
| [#9632](https://github.com/zeroclaw-labs/zeroclaw/issues/9632) | 为独立 ACP 模式增加 `--agent` 参数选择默认 agent | 完善 ACP 协议兼容性，属体验补全，优先级 p2 |
| [#9628](https://github.com/zeroclaw-labs/zeroclaw/issues/9628) | 博客增加 RSS/Atom feed | 低成本高社区价值的文档类改进，已标记 `status:accepted` |

### 路线图信号

结合待合并 PR 池，未来版本的轮廓逐渐清晰：

- **评测体系落地**：9 个 eval 相关 PR 构成了一套从「可复现运行」到「LLM 判定」再到「回归门控」的完整评测能力，预计 v0.8.5 之后的版本会重点整合。
- **桌面端自动化**：[native macOS/Linux/Windows 驱动（computer-use）](https://github.com/zeroclaw-labs/zeroclaw/pull/9091）是除浏览器与 shell 之外的新工具维度，体量 XL，短期内合入难度较大。
- **安全中继与远程配对**：[secure transport + browser enrollment frontdoor](https://github.com/zeroclaw-labs/zeroclaw/pull/9080）涉及 mTLS、证书签发与撤销，是长周期的架构级功能。
- **通道治理**：[移除 WATI 通道](https://github.com/zeroclaw-labs/zeroclaw/pull/9571）表明团队在收敛维护成本高、使用量低的通道，以集中资源。

## 7. 用户反馈摘要

从今日 Issues 评论与描述中提炼的真实用户声音：

- **成本敏感（OpenRouter 用户）**：[@OskarSwierad 在 #9631 中描述](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)——「一次对话产生数十次 LLM 请求，系统提示词和工具 schema 每次都重复计费」，反馈 ZeroClaw 通过 OpenRouter 对话成本不必要地高昂。这是 Agent 类项目共有的成本结构问题，用户期望通过协议层面的 session 复用直接降低账单。

- **信任边界焦虑（多 agent 部署用户）**：[@metalmon 在 #9646/#9647 中描述](https://github.com/zeroclaw-labs/zeroclaw/issues/9646)——内置工具接受模型提供的标识符且无属主校验，「任何 agent 都能触达另一个 agent 的会话历史」；知识图同样是全局共享，「任何 agent 都可以读取和修改其他 agent 捕获的知识」。这直接挑战了多 agent 场景的数据隔离承诺，是架构级信任缺陷。

- **默认安全语义期待（WhatsApp 通道用户）**：[@belumume 在 #9397 中强调](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)——`allowed_groups` 为空列表时当前行为是「放行账号所属全部群组」，与直觉和最小权限原则相悖。社区期待 ZeroClaw 采用 fail-closed 的默认值。

- **项目动态跟进诉求（博客读者）**：[@dwt 在 #9628 中反馈](https://github.com/zeroclaw-labs/zeroclaw/issues/9628)——「博客很不错，但缺少 RSS feed，希望更方便地关注项目」。

## 8. 待处理积压

### ⚠️ 长期未合并的 PR（需维护者关注）

| PR | 创建时间 | 标签 | 阻塞原因 |
|----|---------|------|---------|
| [#8313 skills 紧凑注入默认化](https://github.com/zeroclaw-labs/zeroclaw/pull/8313) | 2026-06-25 | risk:high, size:XL | 已超 5 周未合并，无 reviewer 响应记录 |
| [#8546 CLI 状态片段本地化](https://github.com/zeroclaw-labs/zeroclaw/pull/8546) | 2026-06-30 | stale-candidate, needs-author-action | 可能因长期未活动进入 stale 流程 |
| [#8576 OpenAI STT 凭证 env-var 回退](https://github.com/zeroclaw-labs/zeroclaw/pull/8576) | 2026-07-01 | stale-candidate, needs-author-action | 修复 #7899，但作者较长时间未更新 |
| [#8655 zerocode Code 面板重构](https://github.com/zeroclaw-labs/zeroclaw/pull/8655) | 2026-07-03 | stale-candidate, needs-author-action, size:XL | 大体积重构，涉及 UI 与 ACP 两层 |
| [#9056 provider 错误诊断改进](https://github.com/zeroclaw-labs/zeroclaw/pull/9056) | 2026-07-14 | stale-candidate, needs-author-action, priority:p2 | 修复 #9001，长期未推进 |
| [#8985 Slack 生命周期进度展示](https://github.com/zeroclaw-labs/zeroclaw/pull/8985) | 2026-07-11 | risk:high, size:XL | 超 3 周待合并，活跃讨论但无结论 |

### 🔴 优先级积压事项

- **[#9571 移除 WATI 通道](https://github.com/zeroclaw-labs/zeroclaw/pull/9571)**（priority:p0, needs-author-action）：虽然标记为 P0（涉及 CI、容器、安装器、迁移入口的联动删除），但当前阻塞在作者响应。此 PR 若不尽快推进，将持续占用维护者上下文，并影响后续通道治理节奏。
- **[#8692 Maintainer 决策队列](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（7 条评论）：作为 RFC/设计裁决的总入口，该队列目前积压了至少 2 个 `needs-maintainer-review` 的条目（[#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) 和 [#9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)），需要维护者尽快给出裁决方向。

---

**总结**：Zeroclaw 今日在提交层面非常活跃，但合并率为零。安全性（尤其多 agent 数据隔离）成为社区最强烈的关切，建议维护者：① 优先回应两个 S0 级越权 Bug；② 对 #9397 的安全 RFC 给出明确裁决；③ 推进 p0 的 WATI 移除 PR，并为 stalled 的 PR 安排 reviewer 或明确关闭。

*本日报由 AI 分析师自动生成，所有数据均链接至 GitHub 原始条目，仅供参考。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-02

## 1. 今日速览

过去 24 小时 PicoClaw 项目活跃度中等偏低：Issues 侧仅 1 条更新（1 条活跃，0 条关闭），PR 侧有 3 条动态（2 条待合并，1 条已关闭），无新版本发布。社区讨论焦点集中在 Matrix 通道 `/sync` 长轮询无重连机制的稳定性缺陷（#3203），该 issue 已持续活跃一个月，获得 7 条评论和 2 个 👍，反映出用户对核心通信链路可靠性的关注度较高。功能开发方面，Exa 搜索提供商（#3299）和 OrcaRouter 提供商（#3309）两个新 PR 处于待合并状态，项目在扩展外部服务集成方面仍在持续推进，但整体合并节奏偏缓。

---

## 2. 版本发布

过去 24 小时无新版本发布（最新 Release 无）。

---

## 3. 项目进展

今日无 PR 被正式合并，1 条 PR 被关闭：

- **[#3261] Add zh-TW locale and Traditional Chinese translations** — 已关闭（closed）
  - 作者：@PeterDaveHello | 创建：2026-07-16 | 关闭：2026-08-01
  - 该 PR 为 WebUI 和文档添加繁体中文（台湾用语）翻译，属于非破坏性新功能。标注为 [stale]，最终以关闭收尾，未进入合并流程。
  - 链接：https://github.com/sipeed/picoclaw/pull/3261

**待合并 PR（2 条，方向性信号）：**

- **[#3299] Add native Exa web search provider** — 待合并
  - 新增 Exa 作为原生 `tools.web` / `web_search` 提供商，支持 `X-Api-Key` 认证和 `d`/`w`/`m`/`y` 时间范围过滤。若合并，将直接扩展 PicoClaw 的联网搜索能力。
  - 链接：https://github.com/sipeed/picoclaw/pull/3299

- **[#3309] feat(providers): add OrcaRouter as an OpenAI-compatible provider** — 待合并
  - 新增 OrcaRouter 作为一类 OpenAI 兼容提供商，支持 `vendor/model` 格式的上游模型 ID。若合并，将进一步丰富多供应商路由支持。
  - 链接：https://github.com/sipeed/picoclaw/pull/3309

整体来看，项目今日没有完成功能落地，但两个新提供商 PR（Exa、OrcaRouter）已进入可合并状态，表明项目正在向更丰富的搜索和模型路由生态扩展。

---

## 4. 社区热点

今日讨论最活跃的条目是唯一有实质讨论的 Issue：

- **[#3203] [BUG] Matrix sync loop has no reconnection logic — silent death after network/server disruption**
  - 作者：@weissfl | 创建：2026-07-02 | 更新：2026-08-01
  - 评论：7 条 | 👍：2
  - 链接：https://github.com/sipeed/picoclaw/issues/3203

**分析：** 该 issue 讨论热度集中在 Matrix 通道在面临网络中断或服务器重启后无法自动恢复的问题。用户遇到的情况是：`/sync` 长轮询循环永久性死亡，主进程仍存活，导致 systemd 的 `Restart=on-failure` 无法触发（因为进程没有退出）。这意味着整个 Matrix 消息通道会静默失效，用户无从感知，属于比较隐蔽且严重的稳定性缺陷。7 条评论反映出有多位用户可能遇到或关注类似问题，核心诉求是：**为长轮询循环增加自动重连和指数退避机制**，让系统能够在网络抖动后自愈。

---

## 5. Bug 与稳定性

今日报告的 Bug 仅 1 条，但严重程度较高：

| 严重程度 | Issue | 问题描述 | 是否有 Fix PR |
|---------|-------|---------|--------------|
| 🔴 高 | [#3203](https://github.com/sipeed/picoclaw/issues/3203) | Matrix `/sync` 长轮询无重连逻辑，网络中断或服务器重启后静默死亡；主进程不退出，systemd `Restart=on-failure` 不会触发，导致通道永久失联 | ❌ 无 |

该 Bug 涉及核心通信通道（Matrix）的可用性，且属于"静默失败"类型，用户难以快速察觉，影响面较大。截至今日仍无对应的修复 PR，且已持续一个月未解决，建议维护者优先关注。

---

## 6. 功能请求与路线图信号

今日无新的功能请求 Issue，但在待合并 PR 中出现了两个明确的功能扩展方向：

1. **原生网络搜索支持（Exa）** — PR #3299 新增 Exa 作为 `web_search` 提供商。信号：PicoClaw 在持续补强联网搜索生态，此前已支持多种 `tools.web` 后端，Exa 的加入将提供另一个搜索选项，满足用户对多样化搜索来源的需求。
   - 链接：https://github.com/sipeed/picoclaw/pull/3299

2. **OpenAI 兼容提供商扩展（OrcaRouter）** — PR #3309 将 OrcaRouter 作为一类提供商接入。信号：项目正在系统性地扩大 OpenAI 兼容的供应商列表，OrcaRouter 作为多供应商路由器，可帮助用户通过单一端点访问多家上游模型，降低切换成本。
   - 链接：https://github.com/sipeed/picoclaw/pull/3309

**路线图判断：** 这两个 PR 均已进入待合并状态，且完成度较高，如果 CI 和 review 顺利，有望在下一版本（v0.3.x 或 v0.2.10）中纳入。它们共同指向"更开放的集成生态"这一方向——更多搜索供应商 + 更多模型路由选项。

---

## 7. 用户反馈摘要

基于 #3203 的评论内容（7 条评论），可以提炼以下真实用户反馈：

- **核心痛点：** 用户 @weissfl 使用 PicoClaw v0.2.9 时，Matrix 通道在 homeserver 重启或网络中断后永久失效，且没有任何日志警报或自动恢复。主进程保持存活让 systemd 的自动重启机制无法生效，用户必须手动干预才能恢复。
- **使用场景：** 该用户在真实部署中依赖 Matrix 作为消息通道，对通道的持续可用性有硬性要求。
- **满意度：** 对功能本身未表达不满，但**对稳定性保障明显不满意**——无重连机制、无告警、无自动恢复，导致服务"看起来正常但实际已死"。
- **期望：** 评论中期望加入自动重连（含退避策略）和可观测性（如日志警告或事件上报），让系统具备自愈能力。

在 PR 侧，暂时没有用户评论可供分析（评论数均为 0 或 undefined），社区讨论热度主要集中在上述稳定性问题上。

---

## 8. 待处理积压

**值得提醒维护者关注的重要积压项：**

| 类型 | 编号 | 标题 | 创建时间 | 未响应时长 | 备注 |
|------|------|------|---------|-----------|------|
| Issue | [#3203](https://github.com/sipeed/picoclaw/issues/3203) | [BUG] Matrix sync loop has no reconnection logic | 2026-07-02 | 31 天 | 核心通道稳定性问题，7 条评论、2 个 👍，无修复 PR |

该 Issue 自 7 月 2 日创建以来已超过一个月，期间有多次评论参与，但没有任何维护者回复或关联修复 PR。作为影响核心通信链路且在真实部署中会"静默死亡"的 Bug，建议维护者优先回应，至少给出排查计划或 workaround 建议。

另注意：PR #3261（繁中翻译）今日被标记为 stale 后关闭，属于正常清理，不算长期积压。

---

**总结：** PicoClaw 项目当前处于功能扩展和稳定性加固并行的阶段。新增 Exa 和 OrcaRouter 两个 PR 展示了生态扩展的积极态势，但 Matrix 重连 Bug 的长期悬而未决仍是影响项目健康度的关键短板。建议维护者在推进新功能合并的同时，优先对 #3203 给出修复计划或明确的社区回应。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-02

## 今日速览

过去 24 小时 NanoClaw 项目活跃度处于高位：1 个 Rollup 版本发布，16 条 PR 更新（其中 6 条合并/关闭），2 条 Issue 更新。核心进展集中在三方面：iMessage 通道统一正式随 v2.1.54 发布（含破坏性变更）；设置向导对非 Claude 用户的误导性流程已通过 PR #3170 修复关闭；针对 Qodo skills 依赖外部服务且拦截正常请求的问题，已提交移除 PR。社区讨论热度不高（各 Issue/PR 评论数均为 0），但贡献者提交频率和修复响应速度值得肯定。

## 版本发布

### v2.1.54（Rollup 版本）
- **链接**: [v2.1.54 Release](https://github.com/nanocoai/nanoclaw/releases)
- **内容**: 覆盖从 v2.1.18 到 v2.1.54 的所有合并内容，是自 v2.1.17 tag 以来的滚动累积版本。

**破坏性变更 — iMessage 通道统一：**
- 原先分散的 iMessage 能力合并为单一 `imessage` channel，通过 `/add-imessage` 安装，提供两种可插拔后端：
  - **Local**: 通过 Chat SDK 桥接本机 `chat.db`
  - **Hosted**: 通过 [Photon](https://photon.codes) 原生接入（`spectru...` 截断，详见 PR #3164）

**迁移注意事项：**
- 已在使用旧版 iMessage 通道的用户需重新运行 `/add-imessage` 完成迁移。
- Photo 托管后端的注册流程已在 PR #3164 中被重新实现，旧流程（PR #2999）已被取代，建议部署方验证新注册流程后再升级生产环境。

## 项目进展

今日合并/关闭的 PR 共 6 条，对应多个功能落地与修复：

- **iMessage 通道统一落地（#2999, #3164）**: [PR #2999](https://github.com/nanocoai/nanoclaw/pull/2999) 最初实现统一方案，[PR #3164](https://github.com/nanocoai/nanoclaw/pull/3164) 作为后续 PR 以可用的 Photon 托管注册流程取代前者，两项均已合并，构成 v2.1.54 的核心变更。
- **Setup 修复（#3170）**: [PR #3170](https://github.com/nanocoai/nanoclaw/pull/3170) 修复设置失败时错误引导安装 Claude CLI 的问题（对应 Issue #3169），已关闭。
- **发布流程加固（#3168）**: [PR #3168](https://github.com/nanocoai/nanoclaw/pull/3168) 修复发布后合并的安全缺口，已合并。
- **凭证过期告警（#3167）**: [PR #3167](https://github.com/nanocoai/nanoclaw/pull/3167) 新增 provider 凭证过期时的主动告警功能，已合并。
- **Codex/copilot 相关更改（#3165）**: [PR #3165](https://github.com/nanocoai/nanoclaw/pull/3165) 已关闭。

此外，多条修复 PR 处于开放状态但今日有更新（如 #3174 rootless Docker、#3172 移除 qodo skills、#3166 migrate-v2 修复等），说明提交与 review 循环仍在推进。

## 社区热点

今日未出现高讨论量条目（所有 Issues/PRs 评论数均为 0，👍 数均为 0），社区互动集中在功能提交与维护者响应之间：

- **[Issue #3171](https://github.com/nanocoai/nanoclaw/issues/3171) — Qodo skills 依赖未初始化集成并拦截正常编码请求**：由 @glifocat 提交，直指两个内置 skills（`get-qodo-rules`、`qodo-pr-resolver`）读取不存在的 `~/.qodo/config.json`，且拦截了正常编码请求。作者同时提交了移除 PR #3172，反馈与修复形成闭环。
- **[Issue #3169](https://github.com/nanocoai/nanoclaw/issues/3169) — 非 Claude 安装失败的误导性引导**：从真实使用场景出发，指出设置向导在选择 codex 后仍强制推荐安装 Claude CLI 并以 Yes 为默认项，体验问题明确，当天即被 PR #3170 修复。

两个热点均来自同一贡献者 @glifocat，且均为发现问题后立即附带修复方案，反映出该贡献者工作的高效，但也侧面说明当前项目的外部独立反馈较少。

## Bug 与稳定性

按严重程度排序：

| 严重程度 | 问题 | 状态 | 链接 |
|---------|------|------|------|
| 🔴 高 | Agent 容器在 rootless Docker 守护进程下完全不可用（两组独立故障，因 docker 组成员身份而未被发现） | 修复 PR #3174 开放中 | [Issue/PR #3174](https://github.com/nanocoai/nanoclaw/pull/3174) |
| 🔴 高 | `migrate-v2` 引用已删除的 `insertTask` 函数，静态 ESM import 导致迁移步骤直接崩溃 | 修复 PR #3166 开放中 | [PR #3166](https://github.com/nanocoai/nanoclaw/pull/3166) |
| 🟠 中 | Qodo skills 拦截正常编码请求，需外部 SaaS 账号且仓库未提供配置 | 移除 PR #3172 开放中 | [Issue #3171](https://github.com/nanocoai/nanoclaw/issues/3171) |
| 🟠 中 | 非 Claude 安装失败时错误建议安装 Claude CLI，且默认选中 Yes | 已由 PR #3170 修复 | [Issue #3169](https://github.com/nanocoai/nanoclaw/issues/3169) |
| 🟠 中 | Agent 通过 `send_message` MCP 工具发送消息后，最终输出重复导致重复投递 | 修复 PR #2956 开放中 | [PR #2956](https://github.com/nanocoai/nanoclaw/pull/2956) |
| 🟠 中 | 容器被杀死后 `outbound.db` 残留陈旧 journal，轮询竞争导致故障 | 修复 PR #2750 开放中 | [PR #2750](https://github.com/nanocoai/nanoclaw/pull/2750) |
| 🟡 低 | Router 对不可信输入解析后返回非对象，调用方读取 `.text`/`.sender` 得到 undefined | 加固 PR #2801 开放中 | [PR #2801](https://github.com/nanocoai/nanoclaw/pull/2801) |
| 🟡 低 | Reaction 投递失败可能导致整体流程失败，需降级为 best-effort | PR #3121 开放中 | [PR #3121](https://github.com/nanocoai/nanoclaw/pull/3121) |
| 🟡 低 | 模板未前置全部顶层 context Markdown，可能影响上下文注入 | 修复 PR #3090 开放中 | [PR #3090](https://github.com/nanocoai/nanoclaw/pull/3090) |

## 功能请求与路线图信号

- **iMessage 统一通道已正式落地**（v2.1.54）：双后端（Local + Hosted Photon）设计为多设备/多部署场景提供了灵活性，是本周最重磅的路线图进展。
- **凭证到期主动告警已实现**（PR #3167）：从"报错后被动排查"升级为"事前主动通知"，提升运维体验，同类告警机制可能扩展至其他 provider。
- **Rootless Docker 支持（PR #3174）**：修复 agent 容器在 rootless 环境的可用性，是容器化部署友好度的重要补强，预计将在后续版本合并。
- **Qodo skills 处置方向（Issue #3171 + PR #3172）**：移除概率较大；若保留则需补充配置引导或自动初始化逻辑——当前 PR 趋势指向移除。
- **Egress 更新（PR #3173）**：涉及网络出口配置的变更，可能与安全策略或新集成相关，待 review 后可在 release notes 中确认具体能力。

## 用户反馈摘要

- **设置向导默认值误导用户（Issue #3169）**：用户选择非 Claude provider 后，失败引导仍以 "Yes" 默认推荐安装 Claude CLI，甚至引导进入 Anthropic 登录流程。该问题已修复，修复方式为将失败辅助分发到用户实际选中的 provider。
- **依赖未初始化集成的内置 skill 干扰正常工作（Issue #3171）**：`get-qodo-rules` 和 `qodo-pr-resolver` 在无 Qodo 配置时会拦截正常编码请求，用户期望要么仓库自举配置、要么移除，从 PR 动态看作者倾向移除。
- **根因可见性不足（PR #3174）**：rootless Docker 故障因宿主用户常在 docker 组而未暴露，说明现有测试/使用场景对非标准权限配置覆盖不足。
- **凭证过期无感知（PR #3167）**：Codex ChatGPT 凭证过期后，用户在 WhatsApp 只看到 "Read-only file system" 错误，无法判断根因——该 PR 直接解决此痛点。
- **重复消息投递（PR #2956）**：Agent 同时使用 MCP 工具发送消息并在最终输出重复该文本时，用户会收到两条相同消息，影响交互体验。

## 待处理积压

以下为长期开放未合并的重要 PR，建议维护者优先关注：

- **[PR #2750](https://github.com/nanocoai/nanoclaw/pull/2750)**（2026-06-12 创建）：修复容器 SIGKILL 后 `outbound.db` 陈旧 journal 及轮询竞争，关联 Issue #2516、#2640。已开放 51 天，涉及数据安全。
- **[PR #2801](https://github.com/nanocoai/nanoclaw/pull/2801)**（2026-06-17 创建）：Router 对不可信输入的安全加固，已开放 46 天，关系到多租户/不可信消息输入场景的健壮性。
- **[PR #2956](https://github.com/nanocoai/nanoclaw/pull/2956)**（2026-07-05 创建）：修复消息重复投递问题，已开放 28 天，直接影响终端用户体验。
- **[PR #3046](https://github.com/nanocoai/nanoclaw/pull/3046)**（2026-07-14 创建）：Docs 更新，使 init-first-agent 文档与当前 Telegram pairing 输出对齐，开放 19 天，影响新用户上手。
- **[PR #3090](https://github.com/nanocoai/nanoclaw/pull/3090)**（2026-07-19 创建）：模板 context Markdown 前置修复，开放 14 天，涉及上下文注入顺序。
- **[PR #3121](https://github.com/nanocoai/nanoclaw/pull/3121)**（2026-07-23 创建）：Reaction 投递改为 best-effort，开放 10 天，有助于降低非关键路径的故障面。

---

*本报告由 AI 基于 GitHub 数据自动生成，数据时间范围：2026-08-01 至 2026-08-02。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-02

## 1. 今日速览

过去 24 小时项目活跃度处于高位：19 条 Issue 更新（17 条活跃、2 条关闭），24 条 PR 更新（16 条待合并、8 条合并/关闭），无新版本发布。Reborn 重构节奏明显加快：Wave 1 真相审计合并收官（#6995），Wave 2 首批两个 XL 级契约反转 PR（#6998、#7002）落地，CI 门禁清扫闭环（#6996）关闭了追踪 issue #6963。与此同时，pi-harness 采用计划正式进入实施阶段，P0 缓存前缀稳定性配套 PR（#6997、#7001）已提交。仍需警惕的是 Postgres API 与 libSQL 两条性能回归线，其中 libSQL 写入问题（#6974）尚无明显修复 PR。

## 3. 项目进展

合并/关闭的 8 个 PR 中，以下 5 个为可见主项：

- **#6998 [merged] WS2.1 — extension_host 产品面端口反转**：`ironclaw_extension_host` 改为实现 `ironclaw_product_contracts` 端口定义，行为零变更，是 Reborn Wave 2 第一个完成合并的依赖约束重构。[链接](https://github.com/nearai/ironclaw/pull/6998)
- **#7002 [merged] WS5 — webui + openai_compat 端口反转**：与 #7000 在 `product_contracts` 模块并集上完成联合决议，消除对 `ironclaw_product` 的直接依赖。[链接](https://github.com/nearai/ironclaw/pull/7002)
- **#6996 [merged] CI 门禁清扫闭环**：关闭 #6963，以清单驱动方式修复 6 个同类 path-keyed 门禁 + 2 个 loud-but-flat-keyed repoint，全部改为 fail-closed（含 #6930 引入的静默 no-op 门禁）。[链接](https://github.com/nearai/ironclaw/pull/6996)
- **#6995 [merged] Wave 1 真相审计**：将 `docs/reborn/target-architecture/` 与合并后的 `main`（`a50ad0638`）逐条核对，校正决策记录与实现现实的偏差。[链接](https://github.com/nearai/ironclaw/pull/6995)
- **#6761 [merged] 通用 outbound 注册回归测试**：新贡献者 @ogarciarevett 提交，覆盖泛型通道 outbound-target provider 在 registry 边界的注册与查询。[链接](https://github.com/nearai/ironclaw/pull/6761)

伴随关闭 Issue **#6963**（path-keyed CI 门禁）与 **#6921**（契约提取与证据铸造密封）。Wave 2 剩余槽位——WS2.2（#7000）、WS2.4（#7003）、WS5 后半（#7004/#7005）——均已在待合并队列中，整体重构按 CHECKLIST 有序推进。

## 4. 社区热点

- **#6963（7 评论，已关闭）**：path-keyed CI 门禁追踪 issue，由 #6946 评审意见衍生出 8 个独立缺陷（6 静默 + 2 loud）。高评论量反映维护团队对"追踪清单弱于代码事实"的治理共识，最终以清单驱动的一次性清扫收束。[链接](https://github.com/nearai/ironclaw/issues/6963)
- **#6974（2 评论）**：libSQL 线程写瓶颈，tool-heavy 压测 p95 37–135s，远超 2.5s 目标。从 #6973 拆出独立追踪，说明性能回归问题被赋予独立可见性。[链接](https://github.com/nearai/ironclaw/issues/6974)
- **#6978（1 评论）**：reborn-tests.yml 的 `workflow_dispatch` 结构性失败——`critical-mutation` 被跳过但仍参与 roll-up，造成"零真实失败、roll-up 仍红"的 CI 假象。[链接](https://github.com/nearai/ironclaw/issues/6978)

社区诉求集中在 CI 可靠性（门禁是否真正生效）与性能回归的可观测性两个方向。

## 5. Bug 与稳定性

按严重程度排列：

- **高 — libSQL 写入性能病理（#6974）**：tool-heavy 场景 p95 37–135s，远超市面上缓存方案的 2.5s 目标；#6973 的修复仅让套件"能跑完"，本项尚无独立 fix PR。[链接](https://github.com/nearai/ironclaw/issues/6974)
- **高 — Postgres API 容量回归（#6973 修复中）**：容量门禁 p95 从 3.74s 恶化至 12.0s，`send_message` p95 275ms → 4.78s；修复 PR（XL，低风险）已提交待合并。[链接](https://github.com/nearai/ironclaw/pull/6973)
- **中高 — reborn-tests.yml workflow_dispatch 滚红（#6978）**：`critical-mutation` 的 `if:` 限定 PR/merge_group 事件，dispatch 场景整体结构性失败，需调整门禁条件。[链接](https://github.com/nearai/ironclaw/issues/6978)
- **中 — Token 估算 Bug（#6989）**：`ModelWorkRequest::for_assistant` 从 `content_ref.as_str().len()`（引用字符串长度）估算输入 token，而非引用内容本身，影响计费与上下文预算准确性。[链接](https://github.com/nearai/ironclaw/issues/6989)
- **中 — extension_manager 五处遗留问题（#7011）**：WS2.4 拆分评审发现，全部位于 100% rename 相似度的既有代码中（含 false WriteFilesystem effect、未测试的锁谓词、缺失的 dispatch 测试等）。[链接](https://github.com/nearai/ironclaw/issues/7011)
- **中 — 变更覆盖门禁阻塞（#7006）**：#5981 的约 180 行错误路径属于 fault-injection 类，现有 hermetic 集成测试无法执行，导致门禁拦截，需门禁规则协商。[链接](https://github.com/nearai/ironclaw/issues/7006)
- **低 — server-lifecycle 规则缺口（#6999）**：依赖边界测试的 server-lifecycle 规则从未覆盖其文档声明的 WebChat v2 路由面，属架构决策而非简单门禁 repoint。[链接](https://github.com/nearai/ironclaw/issues/6999)

## 6. 功能请求与路线图信号

- **#7009 — 内置 OrcaRouter 提供方**：用户请求在 `providers.json` 增加 OrcaRouter 条目，与 OpenRouter/Together/Fireworks 等网关并列。改动面小且符合既有模式，预计可纳入下一版本。[链接](https://github.com/nearai/ironclaw/issues/7009)
- **#6983 — `hub` 作为 CLI 子命令别名**：用户反馈 `ironclaw ironhub` 可发现性不足，建议增加 `hub` 别名（保留现有 `iron-hub`）。属低成本 CLI 改进。[链接](https://github.com/nearai/ironclaw/issues/6983)
- **#6993 — OOBE 自动化任务后端接线**：追踪 #6994 UI-only 原型（mock 数据）的产品化，依据 `AUTOMATION-TASKS-CONTRACT.md` 落地真实 API。[链接](https://github.com/nearai/ironclaw/issues/6993)
- **路线图强信号 — pi-harness 采用计划**：P0 #6984–#6987（缓存断点、前缀稳定性、工具数组字节一致、回归测试）与 P1 #6988–#6990（模型窗口预算、Token 估算、缓存亲和）已系统化立项；其中 P0 #1/#2 的配套 PR（#6997、#7001）已提交，显示该计划正快速进入实施。

## 7. 用户反馈摘要

- **CLI 可发现性不足（#6983）**：用户在编写 IronHub 发布文档时发现子命令仅有 `ironhub`/`iron-hub`，缺少直觉化的 `hub` 别名，反映 CLI 命名一致性与检索成本问题。[链接](https://github.com/nearai/ironclaw/issues/6983)
- **Provider 覆盖缺口（#7009）**：用户希望直接选用 OrcaRouter 网关，当前只能走通用 OpenAI 兼容路径，配置体验与专用条目不一致。[链接](https://github.com/nearai/ironclaw/issues/7009)
- **OOBE 设计资产复活（#6994）**：七月设计会话的 onboarding 概念（原 WIP 分支落后 248 commits、从未开 PR）被恢复并重构为 UI 原型，说明社区对首次用户体验（carousel、内联卡片、agent-mode 开关）有持续期待。[链接](https://github.com/nearai/ironclaw/pull/6994)

## 8. 待处理积压

- **#5598 release PR（2026-07-03 起，悬置 30 天）**：`ironclaw_common` 0.4.2→0.5.0 与 `ironclaw_skills` 0.3.0→0.4.0 均含破坏性变更，长期未合并将阻塞下游版本节奏。[链接](https://github.com/nearai/ironclaw/pull/5598)
- **#5981 queued-message steering（2026-07-11 起，21 天）**：核心功能 PR（队列消息转向 + 轮次边界竞态修复），当前被 #7006 覆盖门禁阻塞，需门禁规则协商或补充 fault-injection 测试。[链接](https://github.com/nearai/ironclaw/pull/5981)
- **#5982 budget approval-gate（2026-07-11 起，21 天）**：#5279 的拆分 2/2，依赖 #5981 先合入，连带阻塞。[链接](https://github.com/nearai/ironclaw/pull/5982)
- **#6780 ironhub deep-link 网关（2026-07-28 起，5 天）**：功能完整（公开注册握手、私有 manifest 源），需等待 Wave 2 重构合并后完成 rebase。[链接](https://github.com/nearai/ironclaw/pull/6780)
- **#6917 webui 工作区文件链接预览（2026-07-30 起，3 天）**：安全增强（认证预览 + DOMPurify 兼容），等待评审。[链接](https://github.com/nearai/ironclaw/pull/6917)

---

**项目健康度评估**：核心基础设施（CI 门禁、契约边界）持续加固，重构执行力强（Wave 1 完成、Wave 2 过半）；但两条性能回归线（Postgres/libSQL）与一个月的 release 积压是当前最值得关注的健康度风险。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 | 2026-08-02


## 1. 今日速览

项目过去24小时进入低活跃状态：**无新版本发布，无 PR 合并/关闭，无新 Issue 提交**。全部动态来自存量 Issue/PR 的自动 stale 清理与状态流转（6 条 Issue 被标记关闭，均为 4 月创建、长期未获响应的积压问题）。两条 PR（#1224、#2358）仍处于待合并状态，分别悬置 4 个月和 2 周，合并通道亟待疏通。整体来看，项目维护重心近期偏向 renderer 层问题修复，但 issue 积压清理与 PR 审查效率是当前主要瓶颈。

- 过去 24 小时 Issue 动态：7 条（新开 0，关闭 6，开放 1）
- 过去 24 小时 PR 动态：2 条（无新开，无合并，2 条待合并）
- 新版本发布：0 个


## 2. 版本发布

过去 24 小时无新版本 Release。


## 3. 项目进展

**今日无 PR 被合并或关闭，项目代码主干暂无新增提交。** 但有两条 PR 仍处于待合并状态，值得关注：

- **PR #1224 — fix(agent): 修复 i18n 硬编码、Agent 弹窗 Escape 键支持及删除防重复点击**
  创建于 2026-04-01，已悬置 4 个月。该 PR 关联并计划关闭 Issue #1223，包含三处修复：(1) CoworkPromptInput 中硬编码中文字符串「输入文件」替换为 i18n 翻译调用；(2) Agent 弹窗增加 Escape 键关闭；(3) 删除操作防重复点击保护。目前处于 stale 状态，若再不处理可能被自动关闭。
  🔗 https://github.com/netease-youdao/LobsterAI/pull/1224

- **PR #2358 — fix(cowork): show feedback when session rename fails**
  创建于 2026-07-18，悬置 2 周。修复会话重命名失败时无任何用户反馈的问题，计划关闭 Issue #670。该 PR 是近期（7 月）启动的新一批修复之一。
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2358

> ⚠️ 两条 PR 均未被合并，提示维护者优先审查 #2358（较新、修复明确），并尽快决定 #1224 的去留（合并或关闭，避免 stale bot 自动关闭）。


## 4. 社区热点

今日社区讨论热度整体偏低，所有 Issue 评论数均为 1~2 条，无爆发性讨论。相对活跃的条目如下：

- **Issue #1293 — 自定义 studio http 的 MCP 无法使用**（2 评论 · 1 👍）
  用户反馈自定义 HTTP 类型 MCP 未在 openclaw 引擎中生效，仅 SSE 类型可用。虽然该 Issue 今日被关闭（stale），但其功能缺失问题可能仍未解决，值得关注是否有后续跟踪。
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1293

- **Issue #1307 — 关闭编辑面板后无法编辑其他模型供应商配置**（2 评论）
  用户报告一个 UI 状态残留 bug：打开并关闭某个模型供应商配置面板后，切换到其他供应商会变成只读（灰化/禁用），必须重启或刷新才能恢复。这是一个典型的"状态未重置"交互缺陷。
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1307

> 特征：这些 Issue 均为 4 月 2 日创建、今日因 stale 被关闭，评论数停留在创建初期的 2 条，说明 4 个月来维护者未实际介入处理。


## 5. Bug 与稳定性

今日关闭的 6 条 Issue 中，有 5 条为明确的 Bug 报告。按严重程度排列：

### 高严重度

- **Issue #1296 — 上传 3MB 长图解析，页面直接报错，且新开任务持续不可用**
  模型解析长图时页面报错，且错误状态持久化——"新开任务会一直报错，整体不可用"。这属于阻塞性故障，严重影响核心功能的可用性。**无关联修复 PR。**
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1296

- **Issue #1298 — 测试连接通过，但输入两个字即提示"输入内容过长，超出模型限制"**
  模型上下文窗口计算疑似存在缺陷，极短输入被误判为超长。**无关联修复 PR。**
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1298

### 中严重度

- **Issue #1293 — 自定义 HTTP MCP 无法被 openclaw 引擎调用**
  SST 类型可用但 HTTP 类型失效，属于功能不完整，非崩溃性问题。**无关联修复 PR。**
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1293

- **Issue #1307 — 关闭编辑面板后，另一模型供应商配置无法编辑**
  状态残留 bug，需要重启才能恢复，影响配置管理效率。**无关联修复 PR。**
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1307

### 低严重度

- **Issue #1305 — 定时任务删除后，历史运行记录标题展示错误**
  任务删除后，历史 tab 中该任务运行记录的"标题"字段显示异常（可能回退为默认值）。数据展示问题，不影响任务执行。**无关联修复 PR。**
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1305

> ⚠️ 提示：上述所有 Bug Issue 今日均被 stale 机制自动关闭，但**没有任何一个带有已提交的修复 PR**。若这些 bug 仍在当前版本中存在，建议维护者重新开启或建立跟踪机制，避免问题被静默丢弃。


## 6. 功能请求与路线图信号

今日无新功能请求提交，但存量 PR 中释放了以下路线图信号：

- **代码块行号显示切换（Issue #1302，已关闭）**
  用户以 feature 形式详细提出了代码块行号显示需求：
  - 有语言标识的代码块：在头部工具栏复制按钮左侧增加行号开关，激活时高亮，利用 react-syntax-highlighter 的 showLineNumbers 实现；
  - 无语言标识的代码块：在右上角悬浮工具栏增加开关，自定义 PlainCodeWithLineNumbers 组件支持。
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1302

  由于该 Issue 以 "[stale]" 关闭且无对应 PR 提交，判断该功能尚未实现。结合同日关闭的情况，此需求大概率被搁置，但作为 UX 细节优化，仍有被未来版本纳入的可能。

- **i18n 与弹窗 UX 优化（PR #1224 关联 Issue #1223，仍开放）**
  Issue #1223 明确指出 `CoworkPromptInput.tsx` 中硬编码中文「输入文件」违反 `AGENTS.md` 的 i18n 规范，同时提出 Agent 弹窗缺少 Escape 关闭和删除防重复点击保护。修复 PR 已存在但长期未合并——这关系到英文用户的基础体验质量。
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1223

- **会话重命名失败的用户反馈（PR #2358）**
  当重命名会话失败时展示本地化错误提示，属于体验细节完善，响应 Issue #670 的需求。
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2358


## 7. 用户反馈摘要

- **「整体不可用」的强烈负面反馈**
  Issue #1296（3MB 长图解析报错）中，用户描述了页面报错后"新开任务会一直报错，整体不可用了"。这表明该类错误并非一次性崩溃，而是会污染后续任务状态，用户体验损伤极大。相似的可用性投诉也出现在 Issue #1298（短输入被误判为超长），用户对"测试连接可以通过但实际无法对话"表示困惑。

- **功能缺失的无奈**
  Issue #1293（HTTP MCP 不支持）中，用户专门强调"自定义的 mcp 实际未在 openclaw 引擎里更新"，说明用户已经尝试过自定义配置但功能无效，对"支持了但实际不可用"的状态感到失望。

- **配置流程中的挫败感**
  Issue #1307（编辑面板状态残留）反映了用户在设置页面来回切换供应商时的操作阻碍——"打开关闭一次后，其他全部变成只读"，这会让用户怀疑是配置锁定机制而非 bug，造成困惑。

- **数据展示不一致**
  Issue #1305（定时任务历史标题错乱）是唯一一条纯数据展示类反馈，用户按步骤稳定复现，说明问题具有确定性，应该修复成本不高，但可能因优先级低被忽略。


## 8. 待处理积压

- **唯一开放 Issue：#1223 — CoworkPromptInput 硬编码中文 + Agent 弹窗 UX 缺陷**
  创建于 2026-04-01，已开放 4 个月，标记为 stale 但仍开放。修复 PR #1224 已存在 4 个月未合并。**建议：** 尽快审查并合并 #1224，或在 24 小时内明确关闭理由。这是当前唯一"有修复方案但悬而未决"的开放问题。
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1223

- **PR #1224 — i18n 与弹窗 UX 修复（4 个月未合并）**
  长期悬置的主要原因不明。考虑到该 PR 同时关闭一个 i18n 硬编码问题和一个 UX 交互问题，建议维护者评估合并成本——若存在冲突，可考虑提取其中 i18n 修复部分单独合并。
  🔗 https://github.com/netease-youdao/LobsterAI/pull/1224

- **PR #2358 — 会话重命名失败反馈（2 周未合并）**
  相对较新的 PR，修复简单明确，风险低。目前处于 stale 边缘，建议尽快处理以免同样陷入长期悬置。
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2358

- **其余 5 条今日关闭的 Bug Issue（#1293、#1296、#1298、#1305、#1307）**
  均为 4 月 2 日创建，今日被自动关闭，**无任何修复 PR 关联**。如果这些 bug 在当前代码库中依然存在，建议维护者筛选 1~2 条严重度较高的（#1296、#1298）重新打开或用新 Issue 跟踪，避免核心可用性问题被静默流失。


> **健康度小结**：项目当前处于"低活跃、高积压"状态。新功能开发速度放缓，renderer 层修复处于 PR 待合并阶段（#2358），但 i18n/UX 修复（#1224）与多个已确认 Bug 的处理长期停滞。建议未来一周优先处理 PR 合并与 stale issue 的策略性重开/关闭，恢复社区对项目维护节奏的信心。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 · 2026-08-02

> 数据来源：github.com/agentscope-ai/QwenPaw | 覆盖窗口：2026-08-01 ~ 2026-08-02

---

## 一、今日速览

CoPaw (QwenPaw) 过去 24 小时社区活跃度处于**高位**：共产生 9 条 Issue 更新和 13 条 PR 更新，其中新开/活跃 Issue 9 条，待合并 PR 12 条，仅 1 条 PR 被合并/关闭。当日无新版本发布。社区提交集中在**内存自动压缩、模型提供商兼容性、技能（Skill）管理与 ACP 传输层**四大主题。值得关注的是，当天共有 4 条来自首次贡献者（first-time-contributor）的 PR，显示项目外部吸引力良好，但维护者 review 与合并速度（12 条 PR 积压）可能成为短期瓶颈。整体项目处于高频迭代、社区反馈密集但发布节奏放缓的阶段。

---

## 二、版本发布

**无新版本发布。**

---

## 三、项目进展

当日仅 1 条 PR 关闭/合并，另有多条高价值修复 PR 进入待合并队列，项目整体处于**修复集中提交、等待合入**的窗口期。

### 已合并/关闭

- **[#6598] fix(skills): preserve plugin-sourced skill tags across reconcile cycles** · 由 @BlackBox-Labs 提交
  修复了插件来源技能（plugin-sourced skills）的标签在重启后丢失的问题（#6537）。该 PR 今日关闭，但作者随后提交了改进版 [#6632](https://github.com/agentscope-ai/QwenPaw/pull/6632) 重新进入合并队列，说明该修复仍在迭代中。

### 关键待合并 PR（非首次贡献者）

- **[#6632] fix(skills): preserve plugin-sourced skill tags across reconcile cycles**（8/2 提交）
  修复 #6537：Skill Pool UI 中设置的技能标签在重启后消失。`reconcile_pool_manifest()` 与 `reconcile_workspace_manifest()` 会无条件移除磁盘目录不存在的 manifest 条目，插件来源技能（`source: plugin:...`）没有本地目录，因此被误删。

- **[#6631] fix(providers): align Aliyun coding plan models with official website**（8/1 提交）
  修复 #6551：阿里云 coding plan 提供商列出了 `glm-5.2`、`glm-5.1` 等官方 API 不支持的模型（用户会收到 "model unknown" 错误），且遗漏了 `qwen3.7-plus`，现与官网对齐。

- **[#6630] fix(agents): report empty model response to user instead of silently failing**（8/1 提交）
  修复 #6601：当模型返回空响应（无内容、无 tool_calls）时，QwenPaw 会静默应用 stop handlers 而不给用户任何提示，在长会话接近上下文窗口时尤为隐蔽。该 PR 将空响应明确上报给用户。

- **[#6629] fix(memory): trigger summarize on auto-compression when summarize_when_compact is enabled**（8/1 提交）
  修复 #6624：Scroll 自动压缩（token 超阈值触发 eviction）时未触发 `summarize_when_compact` 记忆流程，手动 `/compact` 可触发。根因是 `MemoryMiddleware.on_compress_context()` 仅刷新了需要累积用户 turn 的自动记忆标记。

- **[#6628] fix(scroll): use SystemMsg for compressed memory placeholder in _rebuild_context**（8/1 提交）
  修复 #6541：Scroll 压缩后注入的 `[context compressed]` 占位块使用了 `role=user`，导致 DeepSeek 等 OpenAI 兼容 API 返回 HTTP 400（`Messages with role 'tool' must be a response to a preceding message with 'tool_calls'`）。

**项目推进评估：** 内存压缩触发链路（#6629、#6628）与技能持久化（#6632）是当前最核心的稳定性修复方向，二者均直指 2.0 版本长期运行的体验问题。若上述 PR 顺利合入，2.0.x 的稳定性将显著提升。

---

## 四、社区热点

当日讨论热度最高的 3 个议题（各有 2 条评论），反映了用户对**存储治理、shell 工具可靠性、桌面端交互效率**的集中诉求。

- **[#6593] [Feature] 增加统一且专业的 qwenpaw 专用清理页面**（@MCQSJ，创建 7/31，更新 8/1）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6593

  用户系统性地列举了 QwenPaw 长期使用后的数据膨胀来源：自动记忆累积、工具调用产生的临时文件、Agent 协作产生的混乱数据、自动备份、历史对话内容等。指出"连删除会话都无法选择删除对应工作区目录"，且清理应是**全局化**而非单个 Agent 管理，并希望收件箱也纳入管理。

  **诉求分析：** 这是 2.0 版本存储模型复杂度上升后的必然反馈。自动记忆 + 工具调用 + 多 Agent 工作区三者叠加，使磁盘占用问题从"可手动处理"变为"需要产品级解决方案"。该 Issue 被标记为 enhancement，很可能被纳入 2.1 路线图。

- **[#6480] [Question] 运行 nohup 命令 agent 都会卡住，是否可以解决这个问题**（@focus883，创建 7/26，更新 8/1）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6480

  `execute_shell_command` 对 `nohup` 或尾部 `&` 启动的后台进程无法返回 idle 状态，导致 Agent 卡死。该 Issue 已存在 7 天仍未关闭，属老问题回热。

  **诉求分析：** 后台任务执行是 Agent 自动化场景的刚需（如启动服务、定时任务）。该问题直接阻断了一类真实工作流，虽有 2 条评论但尚无对应修复 PR，严重度被低估。

- **[#6568] [Feature] 全局快捷键唤出浮动快速输入框（豆包式）**（@WilShi，创建 7/30，更新 8/1）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6568

  希望桌面端支持全局快捷键（macOS `Option+Space`、Win/Linux `Alt+Space`）唤出屏幕中央的小型浮动输入框，类似豆包/Raycast 的轻量唤起体验。用户已核查代码，指出当前桌面端只能唤起整个 1280×800 主窗口，对"随手问一句"场景过重。

  **诉求分析：** 这是 AI 助手向"系统级工具"演进的典型信号。用户不再满足于打开应用再提问，而是期望 Agent 像 Spotlight/Raycast 一样随时可达，对交互设计有明确参考对象（豆包）。

---

## 五、Bug 与稳定性

当日新报告 Bug 5 个，按严重程度排列如下：

### 🔴 高严重度（有对应修复 PR）

- **[#6619] "ToolCallBlock" object has no field "extra_content" — crash in openai_chat_model_compat**（@namphamdev，创建 8/1）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6619

  QwenPaw 2.0.1 + agentscope 2.0.4.post1 环境下，流式响应中若 tool calls 携带 Gemini `extra_content`（thought signature），会在 `_parse_stream_response` 崩溃。报告由 AI 编码 agent（Factory Droid）辅助生成，人类报告者亲自复现并验证了 root cause。

  **✅ 已有修复 PR：** [#6620](https://github.com/agentscope-ai/QwenPaw/pull/6620)（首次贡献者，@namphamdev）

- **[#6625] ACP delegate_external_agent 有时返回 "completed without text output"**（@cocoakekeyu，创建 8/1）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6625

  当外部 ACP agent 在同一 TCP 段内背靠背写入 `session/update` 通知和 `session/prompt` 响应时，ACP 传输层会先解析 prompt future，而通知 runner 仍作为独立 task 排队，导致最终文本丢失。

  **✅ 已有修复 PR：** [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623)（首次贡献者，@cocoakekeyu）

### 🟡 中高严重度（有对应修复 PR）

- **[#6624] 2.0 新版本自动压缩（Scroll）无法触发记忆 summarize**（@Cederys，创建 8/1）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6624

  当上下文被 Scroll 自动压缩（token 超阈值 eviction）时，期望按配置执行记忆流程（`summarize_when_compact: true` 时触发 summarize），但实际未触发；手动 `/compact` 可正常触发。用户不确定是设计如此还是缺陷，先行记录供维护者判断。

  **✅ 已有修复 PR：** [#6629](https://github.com/agentscope-ai/QwenPaw/pull/6629)

### 🟠 中严重度（影响开发流程，无专属修复 PR）

- **[#6626] Real behavior proof CI gate 会完全剥离 fenced Evidence 块**（@cocoakekeyu，创建 8/1）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6626

  CI 的 `Real behavior proof` 门禁会拒绝 `## Evidence` 部分**仅含** fenced code blocks（如 ```text / ```bash 端末记录、且 fence 外无散文）的 PR。证据内容会被完全剥离后再评估，导致合法的行为证明被误拒。

  **影响：** 该问题直接影响所有依赖终端 transcript 作为 evidence 的贡献者，增加了外部 PR 的提交摩擦成本。

### 🟢 中低严重度（待确认，无修复 PR）

- **[#6480] execute_shell_command: nohup / & 后台进程导致 Agent 永不返回 idle**（@focus883，创建 7/26，更新 8/1）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6480

  该问题已存活 7 天，评论仅 2 条，暂无修复 PR。考虑到 shell 工具是 Agent 的核心能力，建议维护者关注。

---

## 六、功能请求与路线图信号

当日新增功能相关议题 2 个，结合已有 PR 判断下一版本可能的走向：

### 新提出的功能需求

- **[#6593] 统一且专业的全局清理页面**（enhancement，8/1 更新）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6593

  支持全局（非单 Agent）视角清理自动记忆、工具产物、备份、历史对话等，可搭配自动清理策略。该需求若被采纳，涉及存储层重构 + 新 UI 页面，预计进入 2.1+ 路线图。

- **[#6568] 全局快捷键唤出浮动快速输入框**（enhancement，8/1 更新）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6568

  用户已核查 Tauri 代码，说明改造点清晰。该功能属于桌面端交互体验升级，与 #6306（桌面端 sidebar 添加工件快捷入口）同属"桌面端易用性"方向，有一定概率排入 2.1。

- **[#6621] 多智能体协作引导缺失反馈**（question，8/1 更新）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6621

  用户经历 50+ 轮对话后才意识到 Default Agent 不会自动调用其他 Agent，必须在 PROFILE.md 显式写入指令。用户认为文档虽完整描述了机制，但缺少产品内引导。这更接近**产品体验/文档策略**问题，可能需要 onboarding 引导而非纯代码变更。

### 已有 PR 对应的路线图信号

| PR | 方向 | 状态 |
|---|---|---|
| [#6622](https://github.com/agentscope-ai/QwenPaw/pull/6622) 添加 OrcaRouter 为内置 provider | 扩大模型生态覆盖 | 待合并，首次贡献者 |
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) 统一 provider discovery、模型元数据、路由与 agent controls | provider 架构整合（对应 #6167） | 待合并，大 PR，已积压 12 天 |
| [#5490](https://github.com/agentscope-ai/QwenPaw/pull/5490) 在 console 中内联展示 tool-card 图片并增加画廊导航 | console 交互增强 | 待合并，已积压 39 天 |
| [#6306](https://github.com/agentscope-ai/QwenPaw/pull/6306) 桌面端 sidebar 添加工件工作区快捷入口 | 桌面端文件访问体验 | 待合并，已积压 12 天 |

---

## 七、用户反馈摘要

从当日 Issue 评论与描述中提炼的真实用户声音：

### 不满意 / 受阻场景

- **数据膨胀已影响日常使用**（#6593）："日积月累会越来越臃肿，占用存储空间。qwenpaw 目前对于空间占用似乎没有很好的处理，如连删除会话都无法选择删除对应工作区目录。" 用户自述长期使用后"混乱不堪"，手动清理又怕误删，处于两难。

- **后台命令阻塞 Agent 自动化**（#6480）：用户执行 `nohup` 或 `&` 后台任务后 Agent 卡死，直接阻断"启动服务再继续对话"这类常见操作。

- **多智能体协作缺乏发现机制**（#6621）："直到 8 月 1 日才发现 Default Agent 不会自动调用其他已创建的 Agent……导致大量无效调试和时间损耗。" 用户完整读过官方文档仍踩坑，说明产品内引导缺失。

### 有明确期望的正向诉求

- **期望轻量级交互**（#6568）：用户明确以豆包/Raycast 为参照，希望"随手问一句"只需一个快捷键 + 迷你输入框，而不是打开整个主窗口。说明用户已将 AI Agent 视为系统级工具而非普通应用。

- **期望自动清理选项**（#6593）：用户不仅要求手动清理页面，还提出"可以配着一些自动化的自动清理功能"，显示出对长期使用维护成本的主动规划。

### 值得注意的信号

- **AI 辅助报告已成常态**（#6619）：报告声明由 Factory Droid（AI 编码 agent）与人类报告者协作完成，且"reporter personally reproduced the bug, verified the root cause"。说明开发者社区已开始采用 AI agent 辅助提交高质量 Bug 报告，项目维护者会越来越多地面对此类报告格式。

---

## 八、待处理积压

以下 Issue / PR 长期未获得合入或响应，建议维护者优先关注：

### 长时间待合并 PR

- **[#5490] feat(console): show tool-card images inline and add gallery navigation**（@maximilize，自 6/24 起，已积压 39 天）
  链接：https://github.com/agentscope-ai/QwenPaw/pull/5490

  改进 console 聊天中工具产出图片的查看方式，从折叠 `<details>` 改为内联卡片 + 画廊导航。纯体验增强，代码风险较低，但搁置时间最长。

- **[#6302] feat: unify provider discovery, model metadata, routing, and agent controls**（@wangfei010313，自 7/21 起，已积压 12 天）
  链接：https://github.com/agentscope-ai/QwenPaw/pull/6302

  对应 #6167 的大型架构 PR，统一 provider 发现、模型元数据、路由与 Agent 控制。此类大 PR 需要维护者投入较多 review 时间，但长期搁置会阻塞后续 provider 相关功能开发。

- **[#6306] feat(desktop): add workspace shortcut to sidebar**（@qiuC123，自 7/21 起，已积压 12 天）
  链接：https://github.com/agentscope-ai/QwenPaw/pull/6306

  关闭 #6083：桌面端用户无需手动在文件管理器中定位 agent 工作区。功能小而明确，与 #6568 的"桌面端体验优化"方向一致。

- **[#6632] fix(skills): preserve plugin-sourced skill tags across reconcile cycles**（@BlackBox-Labs，8/2 提交）
  链接：https://github.com/agentscope-ai/QwenPaw/pull/6632

  修复重启后技能标签丢失问题。作为 #6598 的迭代版本，建议尽快 review，避免与已合并版本产生逻辑分叉。

### 长期未响应的重要 Issue

- **[#6480] nohup / & 后台命令导致 Agent 卡死**（自 7/26 起已 7 天，无修复 PR）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6480

  属核心 shell 工具能力缺陷，直接阻断后台任务类自动化场景。鉴于该 Issue 已有 2 条评论且仍无维护者表态，建议确认是否为已知问题/是否有 workaround。

- **[#6621] 多智能体协作引导缺失**（8/1 提交，1 条评论）
  链接：https://github.com/agentscope-ai/QwenPaw/issues/6621

  虽是 question 标签，但揭示了产品引导的系统性缺失。长期搁置可能继续产生同类用户困惑，建议至少补充文档/UI 提示层面的改进计划。

---

**日报结语：** CoPaw 当日数据呈现出"外部贡献活跃、内部合入滞后"的典型成长项目特征——12 条 PR 等待合并，其中 4 条来自首次贡献者。内存管理（#6624/#6629）与技能持久化（#6537/#6632）的修复链条已基本闭环，而存储清理（#6593）、后台命令（#6480）等问题则指向更深层的产品架构命题。建议维护团队在下一版本发布前优先消化这批积压 PR，以维持社区贡献势能。

*本日报基于 GitHub 公开数据自动生成，仅供项目健康度参考。*

</details>
