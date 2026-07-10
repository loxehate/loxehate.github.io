# OpenClaw 生态日报 2026-07-10

> Issues: 500 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-07-10 00:42 UTC

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

# OpenClaw 项目动态日报 · 2026-07-10

## 📊 今日速览
过去 24 小时内，OpenClaw 保持极高活跃度：共处理 **500 条 Issue**（新开/活跃 319，关闭 181）和 **500 条 PR**（待合并 266，已合并/关闭 234）。无新版本发布。社区围绕会话可靠性、消息丢失、安全注入等议题讨论激烈，同时多项高影响 Bug 的修复 PR 成功合并。仍有约 2/3 的 PR 停留在待合并状态，P1 级问题积压较多，项目整体处于“高产出修复、高密度反馈”的密集开发阶段。

---

## 📦 版本发布
今日无新版本发布。

---

## 🚀 项目进展（关键合并/关闭 PR）
过去 24 小时共 **234 个 PR 被合并或关闭**，以下为影响较大的条目：

- [#103009 fix(state-migrations): skip default-profile migration for named –profile](https://github.com/openclaw/openclaw/pull/103009) — 修复使用 `--profile` 时默认配置意外导入的问题，避免状态混写。
- [#103154 feat(webchat): rare lobster pet events](https://github.com/openclaw/openclaw/pull/103154) — 为 Webchat 增加“龙虾蜕皮”与“双胞胎来访”稀有事件，提升沉浸感。
- [#103126 fix: fail release performance when reports do not publish](https://github.com/openclaw/openclaw/pull/103126) — 确保发布 CI 在性能基线未产出时报红，防止误判。
- [#103119 fix(browser): reject ambiguous tab references](https://github.com/openclaw/openclaw/pull/103119) — 修复浏览器标签混淆可能导致操作错误标签的安全问题。
- [#96684 fix(heartbeat): remove static iteration cap](https://github.com/openclaw/openclaw/pull/96684) — 移除心跳相位计算的硬编码循环上限，支持更低间隔的 heartbeat。
- 历史问题清理：`#63918`（Cron 向 OpenAI 发送错误 thinking 值）、`#73148`（缺少 sharp 时的误导性错误）、`#38439`（Webchat 头像 404）、`#88870`（Stuck-session 恢复误杀活跃请求）等长期 Bug 在过去 24 小时内关闭。

---

## 🔥 社区热点
| Issue/PR | 评论数 | 核心诉求 |
|----------|--------|----------|
| [#44925 Subagent 完成静默丢失](https://github.com/openclaw/openclaw/issues/44925) ⭐P1 | 21 | 子代理任务超时/失败后无重试、无通知，结果彻底丢失。用户呼吁建立补偿机制。 |
| [#99241 工具输出变为图片附件](https://github.com/openclaw/openclaw/issues/99241) ⭐P1 | 15 | 长输出或 ANSI 内容折叠为 `(see attached image)`，Agent 无法读取原文，阻塞自动化。 |
| [#50090 社区技能与 ClawHub 生态](https://github.com/openclaw/openclaw/issues/50090) | 15 | 技能编写→发布→安装链路断裂，用户期望降低门槛、实现“写 SKILL.md 即可分发”。 |
| [#48003 Steer 模式无法中 turn 注入](https://github.com/openclaw/openclaw/issues/48003) ⭐P1 | 15 | `messages.queue.mode: "steer"` 消息排队等到 turn 完成才注入，失去实时干预能力。 |
| [#102175 room_event 强制 message_tool_only](https://github.com/openclaw/openclaw/issues/102175) (Regression) | 12 | `visibleReplies=automatic` 下未提及群消息被错误分类，破坏 Prompt 缓存命中。 |

**趋势分析**：社区当前最焦虑的是 **任务的端到端可见性与可靠性**。大量反馈指向同一问题——“任务失败/超时/状态变化时，用户和 Agent 都得不到通知”。这种不确定性在自动化场景中不可接受。同时，**技能生态** 呼声增高，表明用户开始将 OpenClaw 视为平台而非单机工具。

---

## 🐛 Bug 与稳定性
以下按影响范围排序（P1 为重点关注），并标注是否有关联修复 PR（✅ 有 / ❌ 暂无）。

| ID | 严重性 | 描述 | 标签 / 修复状态 |
|----|--------|------|----------------|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | P1 | Subagent 完成静默丢失（超时后无重试无通知） | `linked-pr-open` ❹ |
| [#99241](https://github.com/openclaw/openclaw/issues/99241) | P1 | 工具输出转为图片 → Agent 不可读 | ❌ 无 fix PR |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | P1 | Steer 模式无法在 turn 中间注入 | `linked-pr-open` |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | P1 | Codex OAuth 刷新跑成功但 cron 仍超时（10s 窗口） | `linked-pr-open` |
| [#49876](https://github.com/openclaw/openclaw/issues/49876) | P1 | Cron 会话在工具失败时生成幻觉输出 | ❌ 无 fix PR |
| [#54155](https://github.com/openclaw/openclaw/issues/54155) | P1 | Gateway 内存泄漏 4 天内 389MB → 14.7GB | ❌ 无 fix PR |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | P1 | 长对话后 write/exec 参数静默丢失 | ❌ 无 fix PR |
| [#46786](https://github.com/openclaw/openclaw/issues/46786) | P1 | `tools.elevated.enabled` 导致所有 exec 路由到宿主机 | ❌ 无 fix PR |
| [#92516](https://github.com/openclaw/openclaw/issues/92516) | P1 | 容器部署下外部 channel 插件 `openKeyedStore` 不可用 | `needs-security-review` |
| [#43996](https://github.com/openclaw/openclaw/issues/43996) | P1 | Sandbox 容器因 `no-new-privileges` 立即退出 | ❌ 无 fix PR |
| [#94251](https://github.com/openclaw/openclaw/issues/94251) | P1 | Ollama 远程 provider 流式响应未被消费，会话卡死 | ❌ 无 fix PR |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | P1 | WhatsApp 图片消息导致主通道挂起约 3 分钟 | ❌ 无 fix PR |
| [#52130](https://github.com/openclaw/openclaw/issues/52130) | P1 | Telegram retry jitter 类型不匹配 → 重启风暴 | `linked-pr-open` |
| [#51363](https://github.com/openclaw/openclaw/issues/51363) | P1 | 同一主机多实例 Docker sandbox 容器名冲突 | ❌ 无 fix PR |

此外，今日有数个稳定性相关的 PR 合并/提交，可能改善部分症状：
- [#102935](https://github.com/openclaw/openclaw/pull/102935) / [#102995](https://github.com/openclaw/openclaw/pull/102995) — 清理客户端断开后的残留队列项，避免 Gateway 泄漏。
- [#102975](https://github.com/openclaw/openclaw/pull/102975) — 修复零参数 XML 格式 tool call 被拒绝。
- [#102530](https://github.com/openclaw/openclaw/pull/102530) — 修复 Skill Workshop 自动批准仍会挂起的问题。

---

## 🧩 功能请求与路线图信号
### ⭐ 高频呼声（可能纳入下一版本）
| Issue | 简述 | 当前状态 |
|-------|------|----------|
| [#50090](https://github.com/openclaw/openclaw/issues/50090) | ClawHub 技能市场：简化发布与安装流程 | 长期开放，无明确时间线 |
| [#50199](https://github.com/openclaw/openclaw/issues/50199) | 技能优先级配置，解决技能重叠选择问题 | `needs-product-decision` |
| [#52640](https://github.com/openclaw/openclaw/issues/52640) | 长时任务持久状态展示（Discord 先行） | 概念讨论阶段 |
| [#50739](https://github.com/openclaw/openclaw/issues/50739) | 系统事件优先级/绕过队列模式 | `needs-maintainer-review` |
| [#45758](https://github.com/openclaw/openclaw/issues/45758) | 支持 YAML 配置文件 | 简单但未实施 |
| [#50093](https://github.com/openclaw/openclaw/issues/50093) | WhatsApp 断线后回补消息 | `stale`，已放置数月 |

### ✅ 已有实质性进展的功能 PR
- [#103176 feat: add Control UI plugin management](https://github.com/openclaw/openclaw/pull/103176) — 为 Web UI 增加插件管理页面，可浏览/安装/启用官方插件，迈出平台化关键一步。
- [#103160 refactor: move device pairing to shared SQLite state DB](https://github.com/openclaw/openclaw/pull/103160) — 将配对准 DB 存储，为多设备协作铺路。
- [#103158 / #103154](https://github.com/openclaw/openclaw/pull/103158) — Webchat 龙虾宠物季节性换装与稀有事件，提升 UI 趣味性。

---

## 💬 用户反馈摘要
- **信任危机**：多位用户反映 Subagent 和 Cron 任务在失败时“静默处理”，既无日志也无通知，导致自动化产出不可信（#44925, #49876）。
- **回归之痛**：#99241 中工具输出变图片被描述为“阻碍正常工作流”，#102175 的 `room_event` 分类错误让群聊体验雪上加霜。
- **环境欠缺**：Sandbox 镜像缺少 python3 导致 `edit/write` 失败（#57713 已关闭），用户认为这类基础依赖应在发布前覆盖。
- **生态期待**：希望“写一个 SKILL.md → 发布到 ClawHub → 安装”能像 npm 一样顺畅（#50090）；当前技能安装跳过 `XDG_CONFIG_HOME` 变量展开等问题（#53628）进一步降低了体验。
- **正面信号**：用户对 PR 响应速度表示肯定，尤其对今日合并的 Browser 标签安全问题修复（#103119）和 Queued turn 内存清理（#102935）有积极反馈（评论区）。

---

## ⏳ 待处理积压
以下 Issue 长期未关闭或未获答复，建议维护者优先关注：

| Issue | 创建时间 | 关键标签 | 上次更新 | 说明 |
|-------|----------|----------|----------|------|
| [#45740 gh-issues 安全注入](https://github.com/openclaw/openclaw/issues/45740) | 2026-03-14 | `impact:security`, `needs-security-review` | 2026-07-09 | 风险明确，PR 已标记但无安全审查结论 |
| [#44431 Browser 工具 7 项改进](https://github.com/openclaw/openclaw/issues/44431) | 2026-03-12 | `needs-product-decision` | 2026-07-09 | 真实用户场测报告，保留未动 |
| [#50090 社区技能生态](https://github.com/openclaw/openclaw/issues/50090) | 2026-03-19 | `needs-product-decision` | 2026-07-09 | 平台方向核心诉求，持续无计划透露 |
| [#45565 生命周期警告独立通道](https://github.com/openclaw/openclaw/issues/45565) | 2026-03-14 | `needs-product-decision` | 2026-07-09 | 简单配置项，3 个月未定夺 |
| [#45314 早停模板变量未填充](https://github.com/openclaw/openclaw/issues/45314) | 2026-03-13 | `linked-pr-open` | 2026-07-09 | 低优先级但影响自定义回复的用户体验 |

---

> **总结**：OpenClaw 今日处于高强度迭代修复与社区反馈爆发期。Bug 修复和平台功能建设并进，但 P1 积压仍达 15+ 项，尤其是消息丢失与 Agent 可见性问题已触及用户信任底线。建议下一里程碑将 **端到端任务状态可观测** 列为首要议题，并尽快对长期搁置的生态需求给出方向性答复。

---

## 横向生态对比

好的，作为资深技术分析师，我将基于您提供的各项目动态数据，生成一份横向对比分析报告。

---

### **AI 智能体与个人助手开源生态横向分析报告 (2026-07-10)**

**分析时段：** 2026-07-09 至 2026-07-10
**数据来源：** OpenClaw, NanoBot, Zeroclaw, PicoClaw, NanoClaw, IronClaw, LobsterAI, Moltis, CoPaw (内部代号 QwenPaw) 的 GitHub Issue 及 PR 动态。

---

#### **1. 生态全景**

今日的社区动态揭示，个人 AI 助手与自主智能体开源生态正经历一场 **“由创新驱动向生产级可靠性驱动”的深刻转型**。一方面，平台化（技能市场、插件系统）、多模态（MCP 生态）和协作能力（子代理、Cowork）成为头部项目（如 OpenClaw, Zeroclaw, QwenPaw）争夺的制高点；另一方面，**“任务端到端可见性”** 和 **“消息可靠性”** 已成为全行业的核心痛点，大量 P1 级 Bug 直指任务静默失败、消息丢失和工具输出不可读等用户信任根基问题。同时，安全加固（沙箱逃逸、令牌泄露、审批走私）成为所有项目不容忽视的底线。整体生态呈现出 “高活跃、高要求、高门槛” 的三高态势，从实验性玩具向基础软件工具的进化速度正在加快。

---

#### **2. 各项目活跃度对比**

| 项目名称 | Issues (新开/活跃) | PRs (总/合并) | 版本发布 | **健康度评估** | 主要特征 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 319 / 500 | 500 / 234 | ❌ | **高产但承压** | Bug 修复密集，P1 积压多（15+），社区信任危机浮现，平台化（插件管理）初见端倪。 |
| **NanoBot (HKUDS)** | 12 / 23 | 22 / 5 | ❌ | **高速迭代** | 专注于解决 exec 安全、会话管理、MCP 重连等核心稳定性问题，响应迅速。 |
| **Zeroclaw** | 23 / 32 | 50 / 5 | ❌ | **功能密集合并** | SOP 审批、插件目录、MCP 泄漏修复等重量级功能持续推进，架构处于快速膨胀期。 |
| **PicoClaw (Sipeed)** | 3 / 3 | 16 / 4 | ❌ | **稳定但存风险** | 修复了关键安全行为（`write_file`），但两个阻挡级 Bug（配置迁移、Matrix）悬而未决，威胁用户转化。 |
| **NanoClaw** | 9 / 9 | 17 / 3 | ❌ | **活跃且灵敏** | 调度任务迈向可用，核心 Bug 修复及时（容器降级），安全漏洞（审批走私）修复已提交，社区积极。 |
| **IronClaw (NearAI)** | 32 / 32 | 50 / - | ❌ | **架构重塑期** | 大规模重构（Builder模式）与 Bug Bash 齐头并进，Slack 集成问题是当前最大短板。 |
| **LobsterAI (Youdao)** | 0 / 35 | 0 / 11 | ❌ | **平台加固期** | Cowork 引擎和 Windows 体验大幅增强，社区功能请求积压（stale），显示资源向核心路线图集中。 |
| **Moltis** | 0 / 0 | 0 / 1 | ❌ | **平稳跟进** | 唯一动态是添加 GPT-5.6 模型支持，维持模型兼容性，活跃度最低。 |
| **CoPaw (QwenPaw, AgentScope)** | 35 / 35 | 50 / 32 | ✅ **v2.0.0-beta.5** | **高强度测试与修复** | 安全修复、MCP 生态打磨、大量回归测试，社区反馈激烈（沙箱控制权）是 v2.0 推广的关键挑战。 |

---

#### **3. OpenClaw 在生态中的定位**

- **社区规模与活跃度：** 毫无争议的生态龙头。其日处理 **500 条 Issue 和 500 条 PR** 的量级，远超其他项目一个数量级，社区反馈密度和问题暴露程度是其他项目无法比拟的。
- **技术路线：** 兼具 **平台化野心** 与 **功能前瞻性**。`ClawHub` 技能市场（#50090）和 `Control UI` 插件管理（#103176）预示着其目标是构建一个类似 “App Store” 的生态。同时，其对 “龙虾宠物” 等趣味性功能的投入，显示其在用户体验层面向消费者应用靠拢。
- **优势：** 极其活跃的社区带来了 **最广的功能覆盖** 和 **最快的 Bug 发现速度**。大量 P1 问题虽然带来了压力，但也意味着问题被迅速暴露和关注。
- **弱点：** **任务核心可靠性的缺失正成为致命伤**。`Subagent 静默丢失`（#44925）和 `工具输出变图片`（#99241）等 P1 问题并非新出现，但长期无有效解决方案，已经引发了社区的 **“信任危机”**。项目在快速推进新功能的同时，**稳定性和可观测性已经成为明显短板**。

---

#### **4. 共同关注的技术方向**

| 技术方向 | 涉及项目 | 具体表现与诉求 |
| :--- | :--- | :--- |
| **端到端任务可观测性** | OpenClaw, NanoBot, Zeroclaw, NanoClaw, IronClaw | Subagent/Cron 任务静默失败无通知、无重试 (OpenClaw #44925; NanoBot #1006; IronClaw #5553)。用户对“黑箱”状态普遍不满。 |
| **消息与数据可靠性** | OpenClaw, NanoClaw, Zeroclaw, IronClaw | 消息丢失、重复、被吞或发错 (NanoClaw #2989; Zeroclaw #6034; IronClaw #5877)。这是所有通信信道 (Telegram, Matrix, Slack) 的共性问题。 |
| **工具/沙箱安全加固** | NanoBot, PicoClaw, Zeroclaw, QwenPaw, IronClaw | 系统提示注入、符号链接逃逸 (NanoBot #4629)、`write_file` 误导 (PicoClaw #3226)、MCP 审批走私 (NanoClaw #2998)、宿主机路由问题 (OpenClaw #46786)。安全是普遍底线。 |
| **MCP 生态与连接可靠性** | OpenClaw, NanoBot, Zeroclaw, QwenPaw | MCP 子进程泄漏 (Zeroclaw #5903)、重连崩溃 (NanoBot #4843)、策略应用失效 (QwenPaw #5864)。MCP 作为核心扩展机制，其稳定性是共同挑战。 |
| **平台化/生态化** | OpenClaw, Zeroclaw, LobsterAI, IronClaw | 技能市场、插件系统、审批流程、多用户支持。头部项目已不满足于单一工具，均在向平台演进。 |
| **用户体验与反馈** | LobsterAI, QwenPaw, PicoClaw | 支持方向键回溯、时间戳、搜索 (LobsterAI)；沙箱权限控制 (QwenPaw)；新手上手文档问题 (PicoClaw)。项目从 “能用” 向 “好用” 进化。 |

---

#### **5. 差异化定位分析**

| 项目 | 功能侧重 | 目标用户 | 架构与语言 | 社区风格 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | **全能平台** (聊天、工具、子代理、Web、技能) | 所有开发者与重度用户 | Node.js 生态 | 规模庞大、噪声多、反馈激烈 |
| **NanoBot (HKUDS)** | **轻量、灵活、易部署** (强调子代理) | 追求轻量和快速实验的开发者 | Python (轻量依赖) | 响应快、代码优先、重视安全 |
| **Zeroclaw** | **安全与审批工作流** (SOP 机制、Sandbox) | 注重合规与生产安全的企业用户 | Rust (性能、安全) | 架构师导向、通过 RFC 治理 |
| **PicoClaw (Sipeed)** | **边缘设备/嵌入式** (ARM、低资源) | Raspberry Pi 等嵌入式设备玩家 | Go (轻量、跨平台) | 硬件极客社区、关注兼容性 |
| **NanoClaw** | **任务调度与业务自动化** (Scheduled Tasks) | 需要定时执行复杂任务链的自动化工程师 | (基于 OpenClaw 派生) | 功能驱动、关注具体场景 |
| **IronClaw (NearAI)** | **企业级协作与集成** (Slack, 审批流) | 企业团队，深度依赖 Slack 等工具 | Rust (大规模重构中) | 高度治理、版本发布严谨 |
| **LobsterAI (Youdao)** | **桌面端 Cowork 与导向** (Guided Run, Steer) | 专业用户、内容创作者，专注深度协作 | 桌面客户端 (C++/Qt?) | 国内社区为主，关注移动端 |
| **CoPaw (QwenPaw)** | **MCP 生态、沙箱与安全** (v2 重写) | 对安全和 AI 能力边界有高要求的开发者 | TypeScript/Go (混合) | 测试驱动、严格 beta 测试 |

---

#### **6. 社区热度与成熟度**

- **第一梯队 (极高热度，密集开发)：**
    - **OpenClaw, Zeroclaw, QwenPaw, IronClaw**: 这些项目的 PR 和 Issue 吞吐量巨大，社区反馈激烈，项目本身处于架构快速演进或重大重构期。特点是 bug 多、功能多、社区声音嘈杂。

- **第二梯队 (活跃开发，专注稳定)：**
    - **NanoBot, NanoClaw, LobsterAI**: 活跃度适中，重心在解决现有问题（稳定性、可靠性）和打磨特定功能（Cowork、任务调度），而非大规模功能堆叠。

- **第三梯队 (稳定迭代，低活跃)：**
    - **PicoClaw, Moltis**: 项目更新频率较低，PicoClaw 虽有严重 Bug 但缺少人力，Moltis 仅做被动模型适配，活跃度主要依赖关键维护者。

---

#### **7. 值得关注的趋势信号**

1.  **“可观测性”是下一个架构级挑战**：社区对 `Subagent 静默丢失`、`任务执行黑箱` 的抱怨，标志着用户对 AI Agent 的要求已超越“实现功能”，进入 “**可信任、可审计、可复现**” 的阶段。这将成为项目成熟度的分水岭，预计未来会有项目推出专用的 **事件总线或审计日志模块**。
2.  **安全防护从“过滤”走向“沙箱”与“签名”**：多个项目同时出现安全相关 Bug 和修复，且已深入到 `符号链接逃逸`、`审批走私` 等高级攻击面。这要求开发者不仅要做好应用层的输入过滤，更要从**操作系统级（AppContainer）和协议级（MCP签名）** 构建防御体系。
3.  **“平台化”成为头部玩家共识，但路径各异**：OpenClaw 走 “App Store” 路线（技能市场），Zeroclaw 走 “SOP+审批” 路线，IronClaw 走 “企业集成” 路线。这预示着生态将形成 **“通用平台”** 和 **“垂直行业平台”** 的分化。对于开发者而言，选择一个具有生态潜力的平台，比选择一个功能齐全的工具更重要。
4.  **模型吞吐量与 Token 成本成新博弈点**：Moltis 积极支持 GPT-5.6 的长上下文，而 QwenPaw 修复“推理重复”、“上下文压缩”问题，Troubles (IronClaw) 面临 “缺乏线程附加” 的例程失败。这背后是 **“大模型输出的不可预测性和高成本”** 对 Agent 稳定性的真实冲击。未来，能有效管理 Token 成本、处理长上下文并优雅降级的框架将更具竞争力。
5.  **消息渠道差异化竞争白热化**：Telegram (NanoBot)、WhatsApp (OpenClaw, NanoBot)、Matrix (PicoClaw)、飞书 (QwenPaw)、Slack (IronClaw) 均有特定 Bug 或功能请求。说明 Agent 的落地严重依赖前端通信渠道，**“渠道适配器”** 的质量和功能完整性，将直接影响用户体验和市场占有率。支持 QQ 频道流式输出（PicoClaw）和飞书通知（NanoClaw）等区域性需求，是打入特定市场的关键。

**给开发者的建议**：在选择 AI 智能体框架时，不要只看 GitHub Star 或 Issue 热度。请重点关注：
- **它如何处理任务失败？** (是否有重试、通知、审计日志？)
- **它的消息层可靠性如何？** (消息是否会丢失、重复、错乱？)
- **它的安全模型是怎样设计的？** (是否通过沙箱隔离？工具权限如何管理？)
- **它的生态是否契合你的场景？** (是否有现成的技能/插件支持你的关键业务？)

目前没有完美的框架，每个项目都面临着成长的阵痛。选择与你项目风险偏好和技术栈最接近的框架，并深度参与其社区，是明智之选。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 2026-07-10

## 1. 今日速览

过去 24 小时内，NanoBot 项目保持高活跃度：共处理 23 条 Issue（新开/活跃 12 条，关闭 11 条）与 22 个 PR（待合并 17 个，已合并/关闭 5 个）。多个优先级为 P1 的修复 PR 已提交或合入，项目正集中解决 exec 安全、MCP 重连崩溃、Matrix 图片兼容等关键问题。同时社区围绕 WhatsApp 群组回归、新用户上手命令缺失等反馈热烈，整体开发节奏快且对用户反馈响应及时。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日共有 5 个 PR 被合并/关闭，重要推进包括：

- **修复 exec 相对符号链接逃逸**（[PR #4629](https://github.com/HKUDS/nanobot/pull/4629)）：阻止受限 exec 命令通过工作区外的相对符号链接读取文件，增强了沙盒安全性。
- **修复 Matrix 频道图片源**（[PR #4859](https://github.com/HKUDS/nanobot/pull/4859)）：`mistune==3.3.3` 将 `mxc://` 图片源错误重写，PR 保留了合法的 Matrix 图片链接，同时维持 nh3 消毒策略。
- **Dockerfile 新增构建参数**（[PR #4857](https://github.com/HKUDS/nanobot/pull/4857)）：允许用户在 Docker 构建时通过 `NANOBOT_EXTRAS` 覆盖可选的 Python 依赖安装项（默认为 `whatsapp`），提升容器化部署灵活性。

此外，多个高优先级 PR 已进入 Review 阶段（见 Bug 部分），项目在安全、通道兼容性和部署体验上持续迈进。

## 4. 社区热点

- **#912 任务特定模型配置**（[Issue #912](https://github.com/HKUDS/nanobot/issues/912)，评论 5，👍 3）：用户期待为对话、工具调用、浏览器使用等不同任务类型指定不同模型，已持续开放近 5 个月，获较多支持，是社区长期关注的功能诉求。
- **#4823 WhatsApp 群组回应混乱**（[Issue #4823](https://github.com/HKUDS/nanobot/issues/4823)，评论 4，👍 0）：0.2.2 版本后 WhatsApp 群组 allow 配置失效，机器人会回应所在所有群组。有多位用户确认该行为，属于较严重的回归。
- **#4860 onboard/webui 命令不存在**（[Issue #4860](https://github.com/HKUDS/nanobot/issues/4860)，评论 2）：新用户按文档安装后执行 `nanobot onboard` 或 `nanobot webui` 失败，文档与实际 CLI 不一致，影响新手体验。
- **#1267 zhipu provider 无法工作**（[Issue #1267](https://github.com/HKUDS/nanobot/issues/1267)，评论 6，已关闭）：用户订阅智谱 Coding 计划后报“Insufficient balance”，虽已关闭，但配置与异常原因仍有讨论。

## 5. Bug 与稳定性

按严重程度排序，今日活跃的 Bug 或稳定性问题：

| 严重程度 | Issue / PR | 描述 | 修复状态 |
|----------|------------|------|----------|
| **P1 / 回归** | [#4823](https://github.com/HKUDS/nanobot/issues/4823) | WhatsApp 群组回应失控，allow 配置失效 | 暂无直接 fix PR，社区等待修复 |
| **P1** | [#4864](https://github.com/HKUDS/nanobot/issues/4864) | `complete_goal` 因 gateway 参数序列化错误陷入死循环 | OPEN，尚无关联 PR |
| **P1** | [#4860](https://github.com/HKUDS/nanobot/issues/4860) | CLI 命令 `onboard` / `webui` 缺失，文档与实现不符 | OPEN |
| **P1** | [#896](https://github.com/HKUDS/nanobot/issues/896) | Telegram / Discord 媒体文件从不清理，磁盘无限增长 | OPEN，已有 root cause 分析 |
| **P1** | MCP 重连崩溃 | [#4843](https://github.com/HKUDS/nanobot/pull/4843) 已提交 fix PR：推迟清理 stale stack | PR 待合并 |
| **P1** | Shell 僵尸进程 | [#4840](https://github.com/HKUDS/nanobot/pull/4840) 已提交 fix PR：在所有子进程退出路径收割僵尸进程 | PR 待合并 |
| **P1** | exec 会话管理器隔离 | [#4862](https://github.com/HKUDS/nanobot/pull/4862) 为 AgentLoop 和 SubagentManager 分配独立会话管理器 | PR 待合并 |
| **P2** | Runner 捕获 BaseException | [#4816](https://github.com/HKUDS/nanobot/pull/4816) 缩小异常捕获范围，避免捕获 KeyboardInterrupt 等 | PR 待合并（有冲突） |
| **P2** | WebUI Docker 构建失败 | [#4863](https://github.com/HKUDS/nanobot/pull/4863) 同步 package-lock.json 修复 npm ci 失败 | PR 待合并 |

另有多项旧 bug 被标记 `[stale]` 但今日仍有更新（如 #954 内部工具泄漏、#935 MCP 超时等），表明维护者正逐步清理旧积压。

## 6. 功能请求与路线图信号

今日活跃的功能请求及对应 PR 信号：

- **任务特定模型配置**（[#912](https://github.com/HKUDS/nanobot/issues/912)）：高赞需求，尚无对应 PR，但社区讨论持续。
- **子代理控制平面**（[#1006](https://github.com/HKUDS/nanobot/issues/1006)）：要求提供 list/kill 子代理命令，已有相关 PR [#4844](https://github.com/HKUDS/nanobot/pull/4844) 将长期目标功能 gating 为显式运行时模式，可视为控制平面的前置步骤。
- **多租户网关**（[#936](https://github.com/HKUDS/nanobot/issues/936)）：多个代理共享一个网关实例以降低资源消耗。
- **预处理器 Hook**（[#990](https://github.com/HKUDS/nanobot/issues/990)）：支持“#日记”等模式绕过 LLM 处理，节省 Token。
- **Cron 模型预设**（[PR #4622](https://github.com/HKUDS/nanobot/pull/4622)）：为 cron 任务添加可选的模型预设，并持久化显示，已提交 PR 待合并。
- **Eden AI 新供应商**（[PR #4861](https://github.com/HKUDS/nanobot/pull/4861)）：添加 Eden AI 作为 OpenAI 兼容网关，支持 100+ 模型聚合。
- **nano_timer 核心工具**（[PR #4853](https://github.com/HKUDS/nanobot/pull/4853)）：无依赖的时间工具，提供 UTC/本地时间、日历字段，已提交 PR。
- **引导式通道设置**（[PR #4855](https://github.com/HKUDS/nanobot/pull/4855)）：新增产品化的通道设置引导流程，支持飞书助手等。

以上 PR 多数带 `priority: p1` 或 `p2`，预期会在近期合入。社区请求中 #912、#1006 与现有 PR 方向吻合，具备较高纳入下版本的可能性。

## 7. 用户反馈摘要

从 Issues 评论中提取的真实用户声音：

- **智谱 API 接入**：用户 @Andygogo15 配置后始终报余额不足，虽已关闭，但反映第三 provider 接入的文档或兼容性需加强。
- **exec 工具幻觉严重**：@jaydenchoe 直言因 exec 工具频繁幻觉已停止评估该框架，认为这是 agent 类工具的核心短板（[#937](https://github.com/HKUDS/nanobot/issues/937)）。
- **WhatsApp 群组功能“坏了”**：@mxnbf 指出升级后群组 allow 设置失效，机器人“跑到每个群组里回复”，严重干扰使用（[#4823](https://github.com/HKUDS/nanobot/issues/4823)）。
- **新用户上手困惑**：@justTravis 按官网文档执行命令失败，怀疑安装或文档同步问题（[#4860](https://github.com/HKUDS/nanobot/issues/4860)）。
- **磁盘空间无限增长**：@nikolasdehor 报告 Telegram/Discord 媒体文件从不清理，并附带了根因分析和 Python 代码位置（[#896](https://github.com/HKUDS/nanobot/issues/896)）。
- **内置技能与 restrictToWorkspace 冲突**：@Rose22 发现开启 restrictToWorkspace 后内置技能因位于工作区外而无法使用（[#1138](https://github.com/HKUDS/nanobot/issues/1138)）。
- **cron 任务伦理警告**：@zwbdzb 删除喝水提醒的 cron 后 AI 自动重新添加并显示伦理警告，颇为困惑（[#1100](https://github.com/HKUDS/nanobot/issues/1100)）。

整体来看，用户对 agent 核心工具（exec）的可靠性要求极高，而文件处理、通道兼容性、新手上手体验是当前的主要摩擦点。

## 8. 待处理积压

以下为长期未响应或停滞但在社区仍有重要度的 Issue/PR，提醒维护者关注：

- **[#912] Task-Specific Model Configuration**：创建 2026-02-20，👍3，评论 5，无关联 PR。是社区呼声最高的功能之一。
- **[#240] SimpleX Chat 通道支持**：创建 2026-02-07，👍3，评论 2，未分配。
- **[#936] 多租户网关**：创建 2026-02-21，评论 2，无开发信号。
- **[#896] 媒体文件无限增长**：创建 2026-02-20，已有根因但未修复，属持续性 bug。
- **[#931] 原生沙箱接口**：创建 2026-02-21，提案性质，需决策是否进入路线图。
- **[#990] 预处理器 Hook**：创建 2026-02-22，评论 1，有明确使用场景。
- **[#937] exec 幻觉问题**：创建 2026-02-21，用户已放弃评估，影响口碑；近年份的多个 exec 相关 PR（如 #4862、#4629、#4840）已在解决底层问题，但幻觉缓解需持续关注。
- **[PR #4522] 通用重复工具调用防护**：创建 2026-06-25，有冲突，未合并，但关系稳定性。
- **[PR #4696] WebUI 流式 Markdown 显示优化**：创建 2026-07-04，有冲突，可视需求决定是否推动合并。

建议维护团队优先处理 P1 级别的开放 Bug，并对长期未处理的 feature request 给予路线图表态，减少社区不确定性。

---

*数据来源：GitHub HKUDS/nanobot Issues & Pull Requests，截止 2026-07-09 23:59 UTC。*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

好的，这是根据您提供的 Zeroclaw (github.com/zeroclaw-labs/zeroclaw) GitHub 数据生成的 2026-07-10 项目动态日报。

---

# Zeroclaw 开发动态日报 | 2026-07-10

**数据统计：** 过去24小时 Issues 32条（新开/活跃23 | 关闭9） | PR 50条（待合并45 | 合并/关闭5） | 新版本0个

---

## 1. 今日速览

过去 24 小时内，Zeroclaw 项目保持了极高的迭代频率，核心开发与社区反馈均十分密集（32条议题、50条拉取请求更新）。项目主要精力集中在**安全加固**（令牌泄漏检测、鉴权审计）、**运行时稳定性**（MCP 子进程泄漏修复、配置热加载崩溃）以及**配置系统健壮性**上。虽然没有新版本发布，但针对 v0.8.3 和 v0.9.0 的多个功能体系（SOP审批代理、可信目标工具、插件目录）正在大踏步推进，项目整体处于**高活跃度的功能密集合并期**。

---

## 2. 版本发布

- **无新版本发布。** （上一个大版本仍为 0.8.x 系列，v0.9.0 正在里程碑 #7432 中紧张筹划，当前包含 111 个待处理项。）

---

## 3. 项目进展

今日有 **5 个 PR 被合并/关闭**，同时多个重量级功能 PR 获得了主分支的大量更新。

**重点合并内容：**
- **[Docs] 工具执行生命周期文档 (#8917)：** 新增了架构文档，用于追踪模型调用工具的全链路（暴露、批准、分发、回执、取消等），有助于降低新贡献者的理解门槛。
- **[CI] 修复 Rustdoc 主题冲突 (#8888)：** Rust 1.96 编译器的变化导致 CI 构建失败，已紧急修复。
- **[Zerocode] 修复主题覆盖层渲染 (#8886)：** 修复了 TUI 界面在操作后背景色不一致的问题。

**持续推进的核心 PR：**
- **[SOP] 审批代理机制 (#8880)：** 高风险 XL 级 PR。作为 #8288 里程碑的核心，引入了基于群组成员和法定人数的审批代理，将标准操作流程推向生产级可用。
- **[Daemon] MCP 子进程泄漏修复 (#8866)：** 高严重性 Bug #5903 的修复，解决了 `heartbeat.enabled` 导致 stdio MCP 进程积累的问题，对生产部署至关重要。
- **[Plugins] 网关与仪表盘能力目录 (#8909)：** 打通了插件系统网关与前端目录，是 #8850 插件功能统一化的重要一环。

---

## 4. 社区热点

1. **[#6808] 工作流与看板自动化 RFC（13条评论）**
   长期运行的治理型 RFC，讨论如何在不增加维护者负担的情况下优化工作路由和标签自动化。社区核心贡献者仍在积极参与修订，体现了项目较高的治理成熟度。
   > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/6808

2. **[#6699] tool_filter_groups 配置失效 Bug（9条评论 | 已关闭）**
   真实 MCP 工具因前缀匹配 Bug 完全无视 `tool_filter_groups` 配置，引发了社区对细粒度工具权限控制的热议。问题已被标记为 P1 高风险并修复。
   > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/6699

3. **[#6034] 对话丢失用户消息（8条评论 | 已关闭）**
   中文社区用户报告的 S1 级严重 Bug（所有模型/提供商均失败），最终被定位并解决。这起事件暴露了自定义 API 兼容层在极端情况下的脆弱性。
   > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/6034

---

## 5. Bug 与稳定性

**新报告严重 Bug：**
- **[S2] 渠道轮次缺失 Agent 生命周期事件 (#8915)：**
  所有通过 Telegram/Discord/Slack 等渠道的对话均无法触发 `agent_start/agent_end` 观察者事件，导致可观测性数据缺失。**尚无修复 PR。**
  > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8915

- **[S2] Anthropic 提供商固定超时 (120秒) (#8762)：**
  长时间文档合成任务静默失败，已确认且被接受，等待修复。
  > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8762

**已有关注的稳定性问题：**
- **[S3] ZeroCode 启动失败后进程残留 (#8578)：** 用户报告命名管道超时后进程未退出。
- **[Blocked] 第三方 API 429 错误处理 (#8871)：** 作者未响应，任务阻塞。

**已有修复 PR：**
- **#8873**：对 UTF-8 截断问题（#7828 追踪器）进行了批量审计修复。
- **#8918**：新增 Slack 令牌在泄漏检测器中的脱敏。安全边界进一步收紧。
- **#8912**：修复了运行时在非交互模式下错误打印 Agent 标准输出的问题。

---

## 6. 功能请求与路线图信号

1. **[OpenAI 兼容端点 (#8550)]：** 社区高频呼声。集成 Open WebUI、LobeChat 等生态的敲门砖。虽然尚在讨论，但已标记为 P2/高风险，极有可能是 v0.9.0 或后续版本的重点突破方向。
   > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8550

2. **[本地优先模式 (Local-First Mode) (#5287)]：** 自 4 月起开放，得到了社区成员的支持（👍2）。旨在为小模型提供紧凑提示和防止提示泄漏。虽然目前无实现 PR，但契合“离线优先”的行业趋势，不应被长期搁置。
   > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/5287

3. **[Web 网关多会话支持 (#7543)]：** 解决当前 Web Chat 只能单会话的痛点。属于提升用户体验的高频需求。

4. **[ZeroCode 会话存档与清理 (#8894)]：** 由核心维护者提出，提升持久化会话的用户体验，大概率会被纳入 v0.8.3 路线图。
   > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8894

---

## 7. 用户反馈摘要

- **“快速启动”体验不佳：** 用户 @cloud-post-code 在 #8094 中反馈，Quickstart 添加 Anthropic 提供商后无法直接聊天，需要“重置”操作，令人困惑（尽管已关闭，但体验痛感真实）。
- **文档质量争议：** 用户 @cr3a7ure 在 #8810 中针对 Telegram 文档给出严厉批评（原文用词“slop remains slop”），认为文档的示例代码与实际行为不符。这暴露出项目在文档质量审核上的短板。
- **配置复杂度的痛点：** 用户 @ngamradt 在 #8925 中专门发帖询问“配置 Amazon Bedrock 的正确方法”，表明 AWS 集成路径不够直观或文档覆盖不足。
- **核心稳定性受肯定：** 尽管出现了 S1 级丢失消息的 Bug，但社区在处理 #6034 和 #5903（MCP泄漏）时，对开发者快速响应和定位效率表示认可。

---

## 8. 待处理积压

- **[本地优先模式 (#5287)]：** 自 2026年4月开放，诉求明确（小模型、防泄漏）。
  - 状态：Open | 风险：High
  - 若无开发资源介入，该功能可能会在竞品浪潮中掉队。
  > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/5287

- **[Matrix 协议流式草稿 (#8443)]：** 大型功能 PR（XL 级）。
  - 状态：阻塞中（等待作者回复）
  - 由于长时间未响应，可能面临被关闭的风险，若被搁置将影响 Matrix 渠道的功能对等性。
  > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8443

- **[第三方 API 429 错误处理 (#8871)]：** 简单但必要的错误处理任务。
  - 状态：阻塞中（等待作者回复）
  > 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8871

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，这是根据您提供的 GitHub 数据生成的 PicoClaw 项目动态日报。

---

# PicoClaw 项目动态日报 | 2026年7月10日

## 1. 今日速览
过去24小时内，PicoClaw 项目保持高度活跃，共更新 3 个 Issue 和 16 个 PR。社区贡献力度显著，Dependabot 驱动了大量的依赖刷新，同时人力贡献的 PR 集中在 Bug 修复与功能增强上。项目合入了 4 个 PR，其中包括提升智能体安全的 `write_file` 行为修复 (`#3226`) 和 LINE 渠道的 Panic 修复 (`#3171`)。然而，配置迁移失败 (`#3206`) 和 Matrix 断连无重连 (`#3203`) 两个阻挡性 Bug 仍悬而未决，构成了当前项目健康度的主要风险。

## 2. 版本发布
（无新版本发布，此部分省略）

## 3. 项目进展
今日共有 4 个 PR 被合并/关闭，项目在工具安全模型和代码健壮性上取得了实质性进展：
- ** **[已合并] `#3226` fix(tools): stop write_file from coaching destructive overwrite**：这是今日最值得关注的 PR。修复了 `write_file` 工具在修改已存在文件时引导模型进行“覆盖”操作的安全隐患。合并后该工具将避免误导性提示，大幅提升了文件操作的安全性。 [链接](https://github.com/sipeed/picoclaw/pull/3226)
- **[已合并] `#3171` fix(line): add ok checks for sync.Map type assertions in Send**：修复了 LINE 消息渠道潜在的 Panic 风险。增加了类型断言的 `ok` 检查，防止因 `sync.Map` 中存储了非预期类型值而导致程序崩溃。 [链接](https://github.com/sipeed/picoclaw/pull/3171)
- **[已合并] `#3213 / #3207` (Dependabot)**：完成 AWS SDK v2 Config 和 GitHub Copilot SDK 两个基础依赖项的版本升级，保障了项目供应链的安全性与兼容性。

## 4. 社区热点
- **严重 Bug 再获关注**：尽管被标记为 `[stale]`，`#3206`（配置迁移失败）和 `#3203`（Matrix 断连）在昨日均有更新，表明用户并未遗忘。这是目前社区最关切的两个稳定性议题，直接影响新用户的上手体验和 Matrix 用户的消息可靠性，但至今仍无对应的修复 PR。 [Issues#3206](https://github.com/sipeed/picoclaw/issues/3206) | [Issues#3203](https://github.com/sipeed/picoclaw/issues/3203)
- **功能缺口凸显**：《支持 QQ 频道流式输出》（`#3201`）虽评论不多，但明确指出了项目在多平台体验上的不平。目前仅 Telegram 和 WebSocket 支持增量输出，QQ 频道的缺失是明显的功能短板，反映了社区对多平台体验一致性的需求。 [Issues#3201](https://github.com/sipeed/picoclaw/issues/3201)
- **DeltaChat 大重构**：`#3222` 虽然未合并，但一次性删除了 320 行旧代码，并标准化了配置方式。这标志着社区正在积极对维护负担较重的模块进行精简。 [PR#3222](https://github.com/sipeed/picoclaw/pull/3222)

## 5. Bug 与稳定性
- **[严重] v2→v3 配置迁移失败** (`#3206`)：全新安装最新版（v0.2.9）时运行报错，无法加载配置。这是“零日”级的阻挡性 Bug，当前无人认领。 [链接](https://github.com/sipeed/picoclaw/issues/3206)
- **[严重] Matrix 同步无重连逻辑** (`#3203`)：网络抖动或服务器重启后，同步循环会静默终止。主进程不死导致 systemd 无法自动恢复，用户需手动重启。 [链接](https://github.com/sipeed/picoclaw/issues/3203)
- **[中等] CLI 工具调用参数异常** (`#3180`)：当 `function.arguments` 为非法 JSON 时，CLI 模式下会丢弃整个响应批次。已有待合并的修复 PR。 [PR#3180](https://github.com/sipeed/picoclaw/pull/3180)
- **[中等] 9router 网关兼容性 + ARMv7 支持** (`#3205`)：Raspberry Pi 3 B+ 用户报告无法使用 9router 网关，且缺少 ARMv7 构建目标。已有待合并的修复 PR。 [PR#3205](https://github.com/sipeed/picoclaw/pull/3205)
- **[轻微] 内联 Data URL 媒体提取异常** (`#3115`)：`read_file` 等工具返回的日志/代码中包含的 Base64 图片字符串被误当作媒体附件，导致对话历史错误。已有待合并的修复 PR。 [PR#3115](https://github.com/sipeed/picoclaw/pull/3115)

## 6. 功能请求与路线图信号
- **高需求信号**：
    - **`#3201` 支持 QQ 频道流式输出**：可能是下一版本在渠道功能上的发力点。 [链接](https://github.com/sipeed/picoclaw/issues/3201)
    - **`#3118` 远程 Pico WebSocket 模式**：允许 Agent 连接远程 WebSocket，契合了 Agent 远程化部署的趋势。 [PR#3118](https://github.com/sipeed/picoclaw/pull/3118)
- **基础设施信号**：
    - **`#3163` AWS Bedrock 提示缓存**：利用缓存降低 LLM 调用成本，体现社区对经济性的考量。 [PR#3163](https://github.com/sipeed/picoclaw/pull/3163)
    - **`#3202` 路由 ID 标准化修正**：修复 Agent ID 的规范化逻辑微调，属于对核心数据流的严谨性改进。 [PR#3202](https://github.com/sipeed/picoclaw/pull/3202)

## 7. 用户反馈摘要
- **核心痛点**：
    - “新安装根本无法运行，配置迁移就直接报错，体验太差了。” (`#3206` by @OhYash)
    - “Matrix 渠道的可靠性太差，网络一断就彻底死了，必须绑外部监控才能用。” (`#3203` by @weissfl)
    - “树莓派用户被排除在外，没有 ARM 构建目标，第三方网关对接也不顺利。” (`#3205` by @sarwonous)
- **满意点**：
    - 用户对 `#3226` 的修复表示出高度的期待，认为避免工具“教唆”覆盖是智能体安全行为的重要一步。
    - 社区对 DeltaChat 的清理表示认可 (`#3222`)，认为官方 Relay 列表的引用比硬编码维护起来更省心。

## 8. 待处理积压
- **严重 Bug 建议优先处理**：
    - `#3206`（配置迁移失败）和 `#3203`（Matrix 断连）是当前拦路的两座大山。前者直接影响用户转化率，后者会导致重度用户流失。强烈建议维护团队立即分配资源解决。
- **高风险 PR 请及时 Review**：
    - `#3118`（远程Agent）、`#3115`（Data URL 修复）、`#3163`（Bedrock 缓存）等 PR 自 6 月中旬或 6 月底开启，至今已有 2-4 周未合并，存在严重冲突风险或逐渐偏离主分支。
- **低门槛 PR 尽快合入**：
    - `#3180`（CLI 工具调用）修复逻辑清晰，合入门槛较低，应尽快操作以提升 CLI 的鲁棒性。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

好的，今天的日报聚焦于 NanoClaw 项目在 2026 年 7 月 9 日至 10 日期间的活动情况。

---

## NanoClaw 项目日报 | 2026-07-10

### 1. 今日速览

项目今日非常活跃，共收到 **9 条新 Issue** 和 **17 个 Pull Request**，其中 **3 个 PR 被合并/关闭**。社区贡献者非常积极，但同时也暴露了一些关键问题。今天的主要动态集中在 **Telegram 适配器** 的一系列 Bug 修复（#2989, #2991, #2990）以及 **预定任务系统** 的功能推进上。值得注意的是，**一个严重的安全漏洞（#2827/#2762）的修复 PR（#2998）** 已被提交，这是社区关注的核心。总体来看，项目处于高度迭代期，新功能开发与稳定性/安全性修复并行，活跃度评分为 **9/10**。

### 2. 版本发布

无

### 3. 项目进展

今日项目在 **系统韧性** 和 **任务调度** 两方面有坚实进展。

- **`[core-team]` Scheduled tasks: ncl tasks control plane (#2981) - 已合并**: 这是预定任务（Scheduled Tasks）功能系列的 **第 2/5 部分**，作为该功能的重要里程碑。它实现了 `ncl tasks` 控制面的核心，包括任务创建、更新、运行、暂停、取消及历史记录，并为每个任务创建了隔离的会话环境。这标志着 NanoClaw 的内置任务调度能力从概念走向了可用阶段。
- **`[core-team]` Make NanoClaw resilient to a down container runtime (#2993) - 已关闭**: 一个实用的稳定性修复。此前，如果 Docker 等容器运行时宕机，NanoClaw 启动时会直接崩溃。现在，启动失败不再导致进程退出，而是优雅降级，让其他通道服务继续运行。这直接提升了项目在生产环境下的鲁棒性。
- **`[core-team]` fix(self-mod): render full MCP server payload on the approval card (#2998) - 新开**: 这是一个针对 **严重安全漏洞** 的修复 PR，旨在解决 `add_mcp_server` 审批流中隐藏参数（`args`/`env`）的问题。此 PR 的提交表明核心团队正在积极响应安全风险。
- **`[core-team]` chore: add .gitattributes (#2621) - 已关闭**: 一个看似微小的改动，但解决了 Windows 开发者的一个痛点——确保 Shell 脚本在 Git 检出事保持 Unix 换行符，避免了跨平台开发的兼容性问题。

### 4. 社区热点

今日社区讨论的焦点显著集中在 **Telegram 适配器** 的问题和 **安全漏洞** 的修复上。

- **Telegram 适配器“静默黑洞”问题 (#2989)**：该 Issue 揭示了 **一个严重且具有欺骗性的 Bug**：如果 Bot Token 曾被其他服务以更窄的 `allowed_updates` 轮询过，NanoClaw 的 Telegram 适配器就会因为未显式设置该参数，导致 Telegram 服务端继续使用旧的、更窄的设置，从而使所有更新（如消息）被静默丢弃。这引发了开发者对 Telegram Bot 服务端状态持久化机制的讨论。
- **MCP 安全漏洞修复方案 (#2998)**：该 PR 作为对之前安全报告（#2827, #2762）的回应，引发了高度关注。它提出在审批卡片中完整显示 MCP 服务器的所有参数，从根本上杜绝“审批走私”的可能。这一及时响应获得了社区正面评价。

### 5. Bug 与稳定性

今日报告了 **4 个新的 Bug**，其中 1 个已有对应的修复 PR。

- **严重 - Telegram 适配器“静默黑洞” (#2989)**：Bot 因 `allowed_updates` 未显式设置而静默丢弃所有消息。**尚无 fix PR**。
- **中等 - 下线通道适配器消息被标记为已送达 (#2995)**：当消息通道适配器未注册或离线时，消息仍被标记为“已送达”，导致用户感知为“消息丢失”。**已有 Fix PR (#2996)**，将此类消息转入重试路径。
- **中等 - 重复提醒只有首次触发 (#2997)**：由于 `hasIdenticalSend` 函数会错误地将本次消息与历史记录匹配，导致重复文本的提醒任务只推送一次。**尚无 fix PR**。
- **低 - 通道选择 `sender_scope='known'` 对频道无效 (#2991)**：在 Telegram 频道中，由于匿名性，该配置无法生效。

此外，**安全相关的 Bug**：
- **严重 - `add_mcp_server` 审批走私 (#2827, #2762)**：攻击者可以隐藏 `args` 和 `env` 参数，诱骗审批者批准恶意 MCP 服务器。此问题已存在数周，**今日已有 Fix PR (#2998)**。

### 6. 功能请求与路线图信号

今日没有提出全新的功能请求，但几个新提交的 PR 指向了未来的路线图方向：

- **集成生态扩展**：
    - `feat(delegation): 汇报结果直发飞书群通知 (#2994)`：满足特定地区用户需求，将 Agent 执行结果直接推送至飞书，解决 Agent “闷头干活”的问题。
    - `feat(telegram): native rich rendering via Bot API 10.1 (#2877)`：利用最新的 Telegram Bot API 提升消息渲染能力，显著改善 Telegram 用户与 Bot 的交互体验。
- **安全与合规**：
    - `feat: /add-audit skill (#2987)`：作为可选技能引入本地审计日志，记录所有 `ncl` 命令操作，为审计和合规场景提供基础能力。
- **平台能力**：
    - `feat: add-remote-storage skill (#1598)`：通过 rclone 集成 WebDAV/S3 远程存储，扩展了 NanoClaw 的数据持久化能力。此 PR 已存在较长时间，但仍在更新。

### 7. 用户反馈摘要

从今日的 Issues 和 PR 中可以提炼出用户的真实痛点：

- **“我的 Telegram Bot 没有反应，但看起来一切正常。”** (#2989) : 这是用户最困惑的反馈。机器人加入群聊后对所有消息无响应，日志中没有任何错误，只有一条模糊的 `Dropping turn-final echo` 信息。用户期望能有一个更清晰的错误提示或启动日志来诊断此类问题。
- **“消息发给了离线频道，我以为成功了。”** (#2995) : 用户报告称，当向一个配置错误（如凭证无效）的频道发送消息时，系统显示“已送达”，但实际消息并未发出。用户感到被误导，期望系统能诚实报告送达状态或直接抛出错误。
- **“重复提醒任务只成功了一次。”** (#2997) : 用户对一个固定文本的重复提醒任务感到困惑，因为它仅在工作流启动的第一次触发，之后便悄无声息地“完成”了。用户希望预定任务能稳定重复触发。

### 8. 待处理积压

以下重要议题已开启较长时间但尚未解决，建议维护者重点关注。

- **`[Security]` `add_mcp_server` 审批走私 (#2827, #2762)**：此安全问题已存在近一个月，严重程度高。虽然今日已有修复 PR (#2998)，但考虑到其影响范围，建议核心团队加速审查并合并。
- **`[PR]` feat: add-remote-storage skill (#1598)**：一个由核心团队成员提交的新技能，已开启超过三个月（自 4 月 2 日）。该技能对扩展项目功能有显著价值，积压时间过长可能导致代码冲突或社区失去信心。
- **`[PR]` feat(telegram): enable message_reaction (#2544)**：对 Telegram 适配器的功能性增强，已开启近两个月。与其相关的 Telegram 适配器问题近日频发，合并此 PR 或许能带来一些正面的连锁改进。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

OK，以下是根据 IronClaw 项目 2026-07-10 的 GitHub 数据生成的每日动态报告。

---

# IronClaw 开源项目日报 | 2026-07-10

## 1. 今日速览
过去24小时内项目活跃度极高，共更新 32 条 Issue 和 50 条 PR。项目正在进行密集的 “Bug Bash” 回归测试，发现了大量 P1/P2 级缺陷，尤其是**Slack 集成**和**审批流**领域问题较为集中。核心团队响应迅速，针对 Slack 通知误送等严重问题已提交修复性 PR。同时，`@ilblackdragon` 主导的大规模代码重构（Builder 模式统一、错误处理强化）已批量合入主分支，代码库健康度显著提升。整体处于“高强度稳定加固 + 底层架构重构”的关键阶段。

## 2. 版本发布
今日无新版本发布。

> **背景备注：** 发布流水线 PR #5598 仍处于开放状态，该版本包含了 `ironclaw_common` (0.4.2 → 0.5.0) 等核心库的 Breaking Changes。发布序列目前处于阻塞状态，需关注。

## 3. 项目进展
今日合并/推进了多项关键功能与修复，具体包括：

- **Slack 集成稳定性攻坚：** 针对 #5877（Slack通知发送给错误用户）等系列问题，`@BenKurrek` 提交了修复 PR [#5898](https://github.com/nearai/ironclaw/pull/5898)（更改投递目标、ID到名称的丰富化、单次投递契约），并配套了自动化线上探测 PR [#5899](https://github.com/nearai/ironclaw/pull/5899) 用于验证修复效果。
- **平台核心修复：**
    - [#5876](https://github.com/nearai/ironclaw/pull/5876) 修复了 Postgres CAS 在并发删除与重建场景下的错误分类问题。
    - [#5902](https://github.com/nearai/ironclaw/pull/5902) 修复了上下文压缩错误（Fixes #5838），通过将 LocalDev 工具链结果持久化在外部，仅向模型暴露有限引用来解决。
- **代码质量大跃迁：** `@ilblackdragon` 批量合入了系列重构 PR（[#5652](https://github.com/nearai/ironclaw/pull/5652)、[#5791](https://github.com/nearai/ironclaw/pull/5791) - [#5812](https://github.com/nearai/ironclaw/pull/5812) 等）。核心变更包括：
    - **构建强化：** 将 `unused_must_use` 提升为全局拒绝，丢弃 `Result` 将无法通过编译，彻底杜绝静默吞错误。
    - **默认值 Builder 模式统一：** 为 Reborn 各组件配置模块（Identity、Slack、Budget、Event Store等）引入了 `::default().set_*()` 链式调用，大幅减少样板代码。
- **架构演进：** [#5901](https://github.com/nearai/ironclaw/pull/5901) 完成了 Wave 4 的可行部分，对 Runner 控制平面进行了重新命名和定位，将调度和执行职责收敛到统一的 `ironclaw_reborn_runner_control_plane` 中。
- **CI 与基础设施：** [#5900](https://github.com/nearai/ironclaw/pull/5900) 新增了针对托管 Postgres 的容量压测 CI 流水线。

## 4. 社区热点
过去24小时内讨论最活跃的 Issue 集中在 **Slack 集成**与 **审批流** 的体验上：

- **#5553（审批通知消失）**：4条评论。用户反映当自动化需要用户审批时，通知要么闪一下就消失，要么根本不出现。这是影响自动化工作流可用性的核心痛点。
    - 链接：https://github.com/nearai/ironclaw/issues/5553
- **#5747（Slack 无法解绑）**：3条评论。用户反馈在 `slack-v2-host-beta` 挂载点上配对 Slack 后，无法通过 UI 或命令解绑，形成了“死锁”。
    - 链接：https://github.com/nearai/ironclaw/issues/5747
- **#5701（活动面板不更新）**：3条评论。用户对运行时黑盒状态表示不满，活动面板仅显示摘要（"N tools"），不展示具体调用了哪些工具及其返回结果，且运行时无实时更新。
    - 链接：https://github.com/nearai/ironclaw/issues/5701

**分析：** 社区用户对后端运行的 **透明性** 和 **可控性** 有较高期望。Slack 作为核心交互渠道，其配对、通知、认证的可靠性是当前影响用户体验的最大瓶颈。

## 5. Bug 与稳定性
今日 Bug Bash 集中暴露了大量缺陷，按严重程度排列如下：

**P1（严重，1个）：**
- [#5877](https://github.com/nearai/ironclaw/issues/5877) **Slack 通知发送给了错误的用户**：隐私安全风险。团队已定位根因并为 #5898 提交了修复。

**P2（高影响，13个）：**
- **Slack/认证生态：** [#5881](https://github.com/nearai/ironclaw/issues/5881)（通知发错App）、[#5880](https://github.com/nearai/ironclaw/issues/5880)（外部完成认证Web UI不同步）、[#5882](https://github.com/nearai/ironclaw/issues/5882)（反复重连进入死锁状态）。
- **审批/任务流：** [#5553](https://github.com/nearai/ironclaw/issues/5553)（通知消失）、[#5886](https://github.com/nearai/ironclaw/issues/5886)（待审批阻塞后续任务）、[#5885](https://github.com/nearai/ironclaw/issues/5885)（打开通知无审批卡片）。
- **执行引擎：** [#5887](https://github.com/nearai/ironclaw/issues/5887)（达到上限丢弃进度）、[#5838](https://github.com/nearai/ironclaw/issues/5838)（上下文压缩失败）、[#5883](https://github.com/nearai/ironclaw/issues/5883)（工具执行成功后模型输出报错）。
- **凭据/令牌：** [#5878](https://github.com/nearai/ironclaw/issues/5878)（吊销后误导性报错）、[#5884](https://github.com/nearai/ironclaw/issues/5884)（例程丢失凭据）。
- **UI/反馈：** [#5879](https://github.com/nearai/ironclaw/issues/5879)（成功运行后错误横幅残留）、[#5836](https://github.com/nearai/ironclaw/issues/5836)（定时例程因“无线程附加”全部失败）。

**P3（中低影响，5个）：**
- [#5891](https://github.com/nearai/ironclaw/issues/5891)（“上次完成”显示运行中时间戳）、[#5890](https://github.com/nearai/ironclaw/issues/5890)（通知发送者不一致）、[#5889](https://github.com/nearai/ironclaw/issues/5889)（“加载更早消息”按钮失效）、[#5888](https://github.com/nearai/ironclaw/issues/5888)（无法删除旧线程）、[#5706](https://github.com/nearai/ironclaw/issues/5859)（延迟时侧栏显示原始ID）等。

## 6. 功能请求与路线图信号
- **CLI 密钥管理（#2601）：** 该 Issue 由社区用户 @ek775 于 4 月提出，至今仍在开放。这表明命令行管理密钥的需求长期存在，但团队尚未明确其优先级。
    - 链接：https://github.com/nearai/ironclaw/issues/2601
- **WASM 工具生态（#5499）：** 核心 PR，旨在支持通过 ZIP 安装 WASM 工具，并为租户共享凭据提供基础设施。这是 Reborn 平台可扩展性的关键基石，目前仍在活跃开发中。
    - 链接：https://github.com/nearai/ironclaw/pull/5499
- **外部工具贡献（#5903）：** 新贡献者 @jmthomasofficial 添加了 25 个 Base 主网上的付费 x402 端点工具。这表明项目外部集成生态正在萌芽。
    - 链接：https://github.com/nearai/ironclaw/pull/5903
- **代码清理（#5897）：** 提出将一方的技能激活模块进行拆分，以解决职责过于集中的技术债问题。这反映了团队对内部架构健康的持续关注。
    - 链接：https://github.com/nearai/ironclaw/issues/5897

## 7. 用户反馈摘要
- **核心痛点：** 审批流体验断裂（弹窗不可靠）和 Slack 集成失去了可控性（无法解绑、通知错乱、认证卡死）是用户抱怨最集中的领域。
- **场景困境：** 定时任务（Routine）的抗风险能力较弱，遇到凭据失效或线程丢失时，整个任务链彻底断裂，且错误信息过于通用（如“无法编码模型输出”），不利于用户自助排障。
- **积极信号：** 尽管回归测试爆出了大量问题，但从 @joe-rlo 密集的提 Bug 动作和 @BenKurrek 迅速跟进的修复来看，项目正经历一次深度体检。外部贡献（#5903）和功能反馈（#2601）的持续流入也表明社区的开发者和早期用户粘性正在形成。

## 8. 待处理积压
- **#2601 CLI 密钥管理：** 创建于 2026-04-18，至今已近 3 个月。这是社区呼声较高的一项功能，团队至今未给出路线图回应。如果在 Reborn 阶段有相应的 CLI 重写计划，建议在此 Issue 中进行里程碑标注，以避免社区失焦。
    - 链接：https://github.com/nearai/ironclaw/issues/2601
- **#5598 发布 PR 阻塞：** 发布 PR 已开放 7 天，包含了 Breaking Changes。长期未完成合并或关闭会阻塞下游依赖方，建议尽快完成决策和发布。
    - 链接：https://github.com/nearai/ironclaw/pull/5598
- **#5553 审批通知问题：** 尽管优先级为 P2，但作为影响自动化核心链路的问题，社区关注度较高且已存在多日。目前仍处于分析阶段，未有分配优先级的修复 PR 链接，建议维护者尽快挂载修复目标。
    - 链接：https://github.com/nearai/ironclaw/issues/5553

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

好的，这是根据您提供的 LobsterAI GitHub 数据生成的 2026-07-10 项目动态日报。

---

# LobsterAI 项目动态日报 | 2026-07-10

## 1. 今日速览

项目整体活跃度极高。过去 24 小时内，核心团队完成了 14 条 PR 的更新，其中 11 条已成功合并，显示出强劲的推进力。工作重心主要围绕 **Cowork 交互引擎的健壮性加固**、**OpenClaw 后端集成的权限与配置优化** 以及 **Windows 平台专属的桌面 UI 增强**。Issue 方面无新增 Bug 报告，但社区里程碑式的功能请求（消息时间戳、全文搜索等）已正式进入 `[stale]` 状态，提醒维护团队需尽快审视长期积压的社区呼声。

## 2. 版本发布

无。

## 3. 项目进展（重点 PR 合并/关闭）

今日合并的 11 个 PR 标志着项目在稳定性、功能完整性和平台适配性上迈出了一大步：

*   **Cowork 核心重构与修复：**
    *   **空字符防御 (#2308)**：修复了 OpenClaw 网关因 prompt 包含 `U+0000` 空字符而硬拒绝请求的严重问题，从输入和输出链路上双重清洗。
    *   **交互模式优化 (#2307)**：移除了 Plan Mode 开关，优化了 Goal/Steer 状态栏的位置及图标，并修复了 Steer 队列的 follow-up 处理逻辑。
    *   **附件与历史同步 (#2300, #2299)**：Steer 队列现在支持附件传递；子代理的工具调用历史能够正确同步到子会话页面，解决了子代理结果“丢失”的幽灵问题。
*   **OpenClaw 后端集成优化：**
    *   **Agent 工具权限 (#2303)**：允许非主桌面的 Agent 和委托的子会话使用 `AskUserQuestion` 等本地工具，同时限制 IM 会话的调用权限。
    *   **配置修复 (#2301)**：显式写入配置以关闭 Memory Dreaming 功能，确保 OpenClaw 能正确清理遗留的定时任务。
    *   **显示名修复 (#2305)**：统一了子 Agent 在界面各处的显示名称来源，保持一致性。
*   **用户体验与平台适配：**
    *   **侧边栏增强 (#2304)**：任务列表支持增量加载、展开/折叠控制，并引入了基于 `dnd-kit` 的拖拽排序功能。
    *   **Windows 专属标题栏 (#2302)**：为 Windows 端定制了融合 LobsterAI Logo 和原生窗口控件的标题栏，并将侧边栏操作整合其中，优化了多窗口体验。
    *   **卸载流程与本地化 (#1396, #1397，旧 PR 合并)**：增强了 NSIS 卸载程序的用户数据清理能力，并修复了会话列表时间缩写无法跟随系统语言的问题。

## 4. 社区热点

尽管今日没有新的 Issue 被发起，但由社区贡献者 @MaoQianTu 在 2026 年 4 月提交的 4 条高质量 Issue（#1339, #1341, #1343, #1345）被 `stale` 机器人标注，引发了项目健康度的一个重要信号。

*   **核心诉求分析：** 这组 Issue 非常清晰地描绘了用户对 LobsterAI **“从能用到好用”** 的期望。用户不再满足于基本的对话能力，而是渴望拥有**媲美主流 Chat 客户端（如 Slack）和 IDE（如 VSCode）的信息消费与操作效率**。
*   **涉及功能：** 消息时间戳、快捷键回溯历史、全文搜索、导出为 Markdown。
*   **链接：**
    *   [#1339 消息气泡缺少发送时间戳显示](https://github.com/netease-youdao/LobsterAI/issues/1339)
    *   [#1341 输入框不支持方向键回溯历史](https://github.com/netease-youdao/LobsterAI/issues/1341)
    *   [#1343 不支持消息内容全文搜索](https://github.com/netease-youdao/LobsterAI/issues/1343)
    *   [#1345 会话详情缺少导出 Markdown 功能](https://github.com/netease-youdao/LobsterAI/issues/1345)

## 5. Bug 与稳定性

今日没有新曝出的严重 Bug，合并的 PR 主要针对以下已存在的稳定性问题：

*   **（严重 - 已修复）Cowork 输入空字符导致 OpenClaw 拒服：** 连续性胶囊等场景引入空字符的问题已在 #2308 中修复。
*   **（严重 - 待修复）IM 群组任务调度路由错误：** #2306 指出了定时选择 IM 群组时的路由问题，目前该修复 PR 还处于开放（待合并）状态。这会影响 IM 场景下的定时任务可靠性。
    *   `[OPEN PR #2306 - 待合并]` [fix(scheduled-task): repair IM group task routing](https://github.com/netease-youdao/LobsterAI/pull/2306)
*   **（中等 - 已修复）子代理工具调用历史遗漏：** #2299 修复了子会话页面看不到工具调用结果的“幽灵操作”问题。
*   **（低 - 已修复）内存幻方配置错误：** #2301 修复了关闭 Dreaming 功能后，OpenClaw 仍管理着旧定时任务的配置不一致问题。

## 6. 功能请求与路线图信号

*   **高概率入选下一版本的候选功能：** 从今天合并的 PR 来看，团队正在对 Cowork 进行深度打磨。这暗示着用户提出的**消息时间戳 (#1339)** 和 **输入框历史 (#1341)** 这两项与交互元数据及输入效率密切相关的功能，有较大概率在后续版本中落地，因为它们是“Power User”体验的基础组件。
*   **低优先级/延期风险：** **全文搜索 (#1343)** 和 **Markdown 导出 (#1345)** 涉及较重的数据结构变更或文件系统操作，从路线图信号来看，团队当前优先保障核心交互流程和后台集成的稳定性，这两项功能可能会被排入更远的“QoL（生活质量）”迭代中。

## 7. 用户反馈摘要

本日反馈主要来自 @MaoQianTu 的 Issue 集，反映了该类重度用户的典型诉求：

*   **痛点：缺乏信息时空感与操作效率。** 用户在无法看到时间戳的对话流中感到“迷失”，难以追溯排查问题；无法通过键盘复用指令，导致调整同一任务时需要反复手打，效率低下。
*   **使用场景：工作流集成。** 用户除了对话，还希望将 AI 的产出一条龙地纳入自己的工作笔记或文档库（导出 Markdown），而不仅仅局限于截图分享。这表明了 AI 助手从“聊天工具”向“生产力创作工具”演进的强烈需求。

## 8. 待处理积压（提醒维护者关注）

以下 Issue 和 PR 已长期未获维护团队明确响应或合并，易造成社区贡献浪费，建议本周内给出反馈：

*   **Issue 积压（已标记 `[stale]`）：**
    *   `#1339` [消息时间戳](https://github.com/netease-youdao/LobsterAI/issues/1339)
    *   `#1341` [方向键回溯历史](https://github.com/netease-youdao/LobsterAI/issues/1341)
    *   `#1343` [全文搜索](https://github.com/netease-youdao/LobsterAI/issues/1343)
    *   `#1345` [导出 Markdown](https://github.com/netease-youdao/LobsterAI/issues/1345)
*   **PR 积压（状态 `[OPEN] [stale]`）：**
    *   [#1340: 用户消息气泡添加发送时间戳](https://github.com/netease-youdao/LobsterAI/pull/1340) (关联 #1339)
    *   [#1342: 输入框支持 Up/Down 方向键回溯已发送历史](https://github.com/netease-youdao/LobsterAI/pull/1342) (关联 #1341)
    *   **风险提示：** PR `#1340` 与 `#1342` 由同一社区贡献者提交。如果继续搁置直至被机器关闭，将对社区贡献积极性造成打击。强烈建议尽快合并或给出详细的技术原因回复。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**项目动态日报 2026‑07‑10 | Moltis (moltis-org/moltis)**  
---
**数据快照** | Issues变动: 0 | PR变动: 1 (待合并) | 新版本: 0  
所有动态仅统计过去24小时（2026‑07‑09 至 2026‑07‑10）。  

---

## 1. 今日速览  
过去24小时项目未产生新的Issue或版本发布，唯一动态是合并待处理的PR #1146，该PR计划新增GPT-5.6系列模型支持。整体活跃度偏低，但PR内容涉及核心适配器更新，属于紧跟前端模型演进的必要改动。项目状态平稳，维护者对最新OpenAI模型的能力同步较为主动。  

- 项目仓库: [https://github.com/moltis-org/moltis](https://github.com/moltis-org/moltis)  

## 2. 版本发布  
无新版本发布。  

## 3. 项目进展  
- **合并/关闭的PR**: 无  
- **待合并的重要PR**:  
  [#1146 [OPEN] Add GPT-5.6 model support](https://github.com/moltis-org/moltis/pull/1146)  
  - 作者: @PeterDaveHello  
  - 摘要: 在OpenAI及OpenAI Codex fallback目录中添加GPT-5.6 Sol、Terra、Luna模型；适配OpenAI API 1.05M上下文窗口及ChatGPT/Codex后端372K限制；包含`gpt-5.6` Sol别名；更新配置文件模板和提供者选择文档。  
  - **项目推进**: 该PR一旦合并，将让Moltis原生支持最新的GPT-5.6系列，使Agent能选用更大上下文窗口的模型，同时保持与官方API文档描述一致。这代表了项目在“模型支持”这条主线上的一次重要更新。  

## 4. 社区热点  
今日唯一公开动态即PR #1146。虽然目前无评论或表情反应，但“Add GPT-5.6 model support”这一标题直接指向社区对下一代模型接入的普遍需求。GPT-5.6系列刚发布不久，Moltis能够迅速跟进，说明团队对用户需求的响应意识较强。  
- 线索链接: [PR #1146](https://github.com/moltis-org/moltis/pull/1146)  
- 诉求分析: 用户期望能在Moltis中使用最新、容量更大的模型来提升Agent的任务处理能力（尤其是长上下文场景）。  

## 5. Bug 与稳定性  
过去24小时无新Bug、崩溃或回归问题报告。项目当前无已知的稳定性缺陷。  

## 6. 功能请求与路线图信号  
- **功能请求/添加**: PR #1146 本质是一次功能添加，将GPT-5.6 Series纳入模型目录。这很可能源于用户请求或项目自身的路线图规划。同时，更新配置模板与文档表明项目重视用户体验和配置透明性，这些工作常是社区呼声的转化。  
- **路线图信号**: 项目持续扩展支持的模型列表，尤其专注于OpenAI生态的最新变化。可以推测下一版本（若发布）会包含该PR。  
- 相关位置: [https://github.com/moltis-org/moltis/pull/1146](https://github.com/moltis-org/moltis/pull/1146)  

## 7. 用户反馈摘要  
由于24小时内无新Issue及PR评论，无直接用户反馈可以提炼。  

## 8. 待处理积压  
目前项目仅有一条PR（#1146），且为刚创建的新PR，不构成积压。没有长期未回复或搁置的Issue/PR。项目积累管理良好。  
- 当前所有待处理项: [https://github.com/moltis-org/moltis/pulls](https://github.com/moltis-org/moltis/pulls)  

---

**报告日期**：2026‑07‑10 | **分析师**：AI 开源项目分析助手

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

好的，根据您提供的 `QwenPaw` 开源项目 GitHub 数据，我整理出 2026-07-10 的项目动态日报如下：

---

# QwenPaw 项目动态日报 (2026-07-10)

## 1. 今日速览
过去 24 小时，QwenPaw 项目保持高强度迭代，累计出现 35 条 Issue 更新、50 条 PR 更新，并发布了 `v2.0.0-beta.5` 版本。项目合并/关闭了 32 个 PR，核心聚焦于 **安全加固**、**MCP 生态打磨**、**上下文管理 Bug 修复** 以及 **测试覆盖度提升**。社区反馈非常踊跃，尤其是围绕 v2.0.0-beta 系列的沙箱策略与逻辑控制问题引发了激烈讨论，反映出用户对新版本寄予厚望，同时也坦诚地提出了阻碍性痛点。

## 2. 版本发布
- **版本号:** `v2.0.0-beta.5`
- **链接:** [[Release] v2.0.0-beta.5](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.0-beta.5)
- **主要内容：**
  - `fix(scroll)`: 修复了 Eviction Index（驱逐索引）中未带标题的 Spans 标签问题。
  - `fix(scroll)`: 通过引入 Seam Banner 来锚定 Live Turn，提升了复杂会话流中的滚动浏览体验。
- **影响分析：** 本次为小版本优化性迭代，不涉及破坏性变更，用户可无缝升级。

## 3. 项目进展
- **安全与合规：**
  - 修复了 `rm -rf ${HOME}` 高危命令注入绕过漏洞（[PR #5866](https://github.com/agentscope-ai/QwenPaw/pull/5866)），已合并。
- **MCP 生态深度优化：**
  - 修复了 MCP Driver Policy 在运行时无法正确应用 Off/Approval 级别的问题（[#5864](https://github.com/agentscope-ai/QwenPaw/pull/5864), [#5853](https://github.com/agentscope-ai/QwenPaw/pull/5853)），已合并。
  - 修复了 MCP 模块依赖版本错误（[#5904](https://github.com/agentscope-ai/QwenPaw/pull/5904)），已合并。
- **工具调用与模型推理链路修复：**
  - 修复了历史记录中因 JSON 参数带前缀空格导致的 Tool-call 解析失败问题（[PR #5841](https://github.com/agentscope-ai/QwenPaw/pull/5841)），已合并。
  - 默认将 `preserve_thinking` 参数置为 `False`，从根本上解决了推理重复（Reasoning Reflux Loop）问题（[PR #5870](https://github.com/agentscope-ai/QwenPaw/pull/5870)），已合并。
  - 修复了日志误用 WARNING 级别导致的日志刷屏问题（[PR #5908](https://github.com/agentscope-ai/QwenPaw/pull/5908)），待合并。
- **渠道与通知修复：**
  - 修复钉钉渠道：空内容不再发送无意义通知，并显式上报发送失败（[PR #5654](https://github.com/agentscope-ai/QwenPaw/pull/5654)），已合并。
- **测试体系大幅强化：**
  - 合并了 Sprint 4.1 集成测试（工具调用生命周期、后台任务，[#5895](https://github.com/agentscope-ai/QwenPaw/pull/5895)）。
  - 新增并合并了大文件会话加载回归测试（[#5810](https://github.com/agentscope-ai/QwenPaw/pull/5810)）和前端 Hook/Store 单元测试（[#5808](https://github.com/agentscope-ai/QwenPaw/pull/5808)）。
  - 开放了 Channels 模块（176 例，[#5812](https://github.com/agentscope-ai/QwenPaw/pull/5812)）和 Runtime/安全回归（43 例，[#5813](https://github.com/agentscope-ai/QwenPaw/pull/5813)）的庞大测试套件。

## 4. 社区热点
1. **飞书渠道“假死”故障讨论（[#5757](https://github.com/agentscope-ai/QwenPaw/issues/5757)）** ：13 条评论。用户普遍反馈飞书机器人存在“首问必答，次问无反应”的稳定性问题，是今日 IM 渠道体验的最大障碍点。
2. **请求增加沙箱关闭权限（[#5879](https://github.com/agentscope-ai/QwenPaw/issues/5879)）** ：6 条评论。社区针对 v2.0 沙箱机制发起了“用户自决权”的辩论，用户强烈要求允许在可信设备上完全关闭沙箱。
3. **定时任务弹窗设计分歧（[#5797](https://github.com/agentscope-ai/QwenPaw/issues/5797)）** ：6 条评论。核心争议在于产品设计理念——是开发者替用户做决定，还是把弹窗开关完全交给用户。
4. **v2.0 核心逻辑回归 Bug（[#5896](https://github.com/agentscope-ai/QwenPaw/issues/5896), [#5906](https://github.com/agentscope-ai/QwenPaw/issues/5906)）** ：用户 @MCQSJ 连续提出了“迭代计数逻辑错误”和“防重复机制误报”两个直接破坏对话体验的 Bug。

## 5. Bug 与稳定性
- **严重级别 (S1/S2):**
  - [OPEN] [Bug] 上下文压缩丢失 Tool_call 结构，导致 400 错误 ([#5856](https://github.com/agentscope-ai/QwenPaw/issues/5856))。无关联 fix PR。
  - [OPEN] [Bug] Docker 容器内 `browser_use` 因 dbus 连接失败而启动失败 ([#5872](https://github.com/agentscope-ai/QwenPaw/issues/5872))。无关联 fix PR。
  - [OPEN] [Bug] 防重复功能异常触发 “Doom Loop” ([#5906](https://github.com/agentscope-ai/QwenPaw/issues/5906))。无关联 fix PR。
  - [OPEN] [Bug] 迭代次数限制计次逻辑错误，导致对话被过度终止 ([#5896](https://github.com/agentscope-ai/QwenPaw/issues/5896))。无关联 fix PR。
  - [OPEN] [Bug] Windows AppContainer 沙箱忽略配置的 Shell，始终使用 cmd.exe ([#5911](https://github.com/agentscope-ai/QwenPaw/issues/5911))。无关联 fix PR。
  - [OPEN] [Bug] Auto Memory Search 为 OpenAI Responses API 生成错误的历史记录 ([#5910](https://github.com/agentscope-ai/QwenPaw/issues/5910))。无关联 fix PR。
  - [CLOSED] 安全漏洞 `${HOME}` bypass 修复（[PR #5866](https://github.com/agentscope-ai/QwenPaw/pull/5866)），已合入主线。
  - [CLOSED] OneBot 通道默认启用致无限重启修复（[#5898](https://github.com/agentscope-ai/QwenPaw/issues/5898)），已关闭。
- **中等/已修复：**
  - 日志刷屏（[PR #5908](https://github.com/agentscope-ai/QwenPaw/pull/5908)，待合并）。
  - Matrix Token 登录失败（[#5868](https://github.com/agentscope-ai/QwenPaw/issues/5868)，已关闭）。
  - 前端压缩阈值显示错误（[#5784](https://github.com/agentscope-ai/QwenPaw/issues/5784)，已关闭）。

## 6. 功能请求与路线图信号
- **高优先级社区呼声：**
  - **沙箱开关** ([#5879](https://github.com/agentscope-ai/QwenPaw/issues/5879)): 当前 v2.0 被采纳的最大障碍，建议项目团队在 beta.6 中优先考虑加入配置选项。
  - **对话分组与导入导出** ([#5903](https://github.com/agentscope-ai/QwenPaw/issues/5903)): 用户数据管理的基本需求。
- **已纳入设计/开发中：**
  - **可配置主题/皮肤模块** ([#5909](https://github.com/agentscope-ai/QwenPaw/issues/5909)): P0 任务，已提出初步设计提案。
  - **Windows 桌面 GUI 自动化** ([PR #5187](https://github.com/agentscope-ai/QwenPaw/pull/5187)): 大型特性，仍在开发评审中。
  - **记忆搜索重排序功能** ([PR #5692](https://github.com/agentscope-ai/QwenPaw/pull/5692)): 基于 reme0.4 的增强。

## 7. 用户反馈摘要
- **痛点与批评：**
  - **沙箱过度限制**：用户在 #5879 中痛陈“沙盒严重限制了 agent 的能力，且无法关闭，连让 agent 安装 python 的库都无法正常完成了”，直言这是对 Agent 能力的“因噎废食”。
  - **核心逻辑回归**：用户 @MCQSJ 在 #5896 和 #5906 中连续精准地报告了 v2.0.0-beta 中迭代计数和防重复机制的缺陷，直言“计次根据的是上次触发开始，而不是新消息开始”，说明核心对话循环逻辑存在明显的 Bug。
  - **渠道体验**：飞书渠道的普遍性“假死”问题（#5757）表明后端处理用户请求队列或长连接稳定性上仍有待优化。
- **肯定与协作：**
  - **高效率协作闭环**：用户 @guanyanlai-collab 在 #5893 中不仅报告了企业微信二维码 Bug，还直接给出了正则修复方案（修改贪婪匹配），社区自发的高质量修复值得推广。
  - **安全响应**：社区上报的安全漏洞（`${HOME}` bypass）得到了快速响应和修复（#5866），展现了项目组对安全的重视。

## 8. 待处理积压
- **高优待修复（建议纳入 Beta.6）：**
  1. **[Bug] 上下文压缩破坏 Tool_call** ([#5856](https://github.com/agentscope-ai/QwenPaw/issues/5856)) - 严重影响 Agent 长期任务稳定。
  2. **[Bug] Docker 下 browser_use 不可用** ([#5872](https://github.com/agentscope-ai/QwenPaw/issues/5872)) - 影响容器化部署群体。
  3. **[Bug] 防重复与迭代计数逻辑错误** ([#5906](https://github.com/agentscope-ai/QwenPaw/issues/5906), [#5896](https://github.com/agentscope-ai/QwenPaw/issues/5896)) - 直接影响核心对话体验，属于破坏性回归。
  4. **[Feature] 增加可关沙箱的开关** ([#5879](https://github.com/agentscope-ai/QwenPaw/issues/5879)) - 用户**自决权**的问题，是项目能否赢得 v2.0 早期用户信任的关键一步。
- **长期关注：**
  - **Windows 桌面自动化** ([PR #5187](https://github.com/agentscope-ai/QwenPaw/pull/5187)): 大特性 PR 开放近一个月，需推动审查进度。
  - **贡献任务列表更新** ([#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291)): 维护者 @cuiyuebing 需及时更新任务进度，以免挫伤贡献者热情。
  - **能力短板分析报告** ([#5711](https://github.com/agentscope-ai/QwenPaw/issues/5711)): Issue 已关闭，但社区投资者/贡献者期待看到更具体的架构改进路线图进展。

</details>