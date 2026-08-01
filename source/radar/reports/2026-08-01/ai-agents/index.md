---
title: "OpenClaw 生态日报"
date: 2026-08-01
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# OpenClaw 生态日报 2026-08-01

> Issues: 244 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-01 00:38 UTC

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

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-01**


## 1. 生态全景

以 OpenClaw 为核心的 “Claw 系” 项目群（Zeroclaw、IronClaw、PicoClaw、NanoClaw、CoPaw 等）已构成当前个人 AI 助手开源生态最活跃的版图，呈现出“一核多衍、路线分化”的格局。各项目在高强度迭代中普遍聚焦三类共性问题：**IM 渠道可靠性**（微信、Telegram 静默失败频发）、**长上下文与缓存效率**（缓存命中率直接影响成本与体验）、**安全治理升级**（沙箱逃逸、跨用户隔离、命令审批策略）。安全已从“加分项”变为生产部署的硬性准入门槛，多家外部贡献者明确表示“先修安全才敢采用”。整体生态处于快速演进期，但部分项目面临评审积压，贡献者等待周期偏长。


## 2. 各项目活跃度对比（2026-07-31 ~ 2026-08-01）

| 项目 | Issues 更新 | PRs 更新 | Release | 健康度评估 |
|------|------------|----------|---------|-----------|
| **NanoBot** (HKUDS) | 4（2 活跃 / 2 关闭） | 16（10 待合并 / 6 合并） | 无 | 良好：Bug 修复与功能开发并行，响应迅速（微信 token 覆盖当日修复） |
| **Zeroclaw** | 17（15 活跃 / 2 关闭） | 50（35 待合并 / 15 合并） | 无 | 高活跃：安全 RFC 密集，但 35 条 PR 待合并形成阻塞 |
| **PicoClaw** | 2（均开放） | 3（均待合并） | 无 | 中等偏低：评审积压明显，PR 均悬置 4-5 周，1 个 Bug 已 stale |
| **NanoClaw** | 8（均开放） | 9（3 合并 / 6 待合并） | 无（修复 v2.1.54 发布路径） | 中高：渠道扩展活跃，但 Telegram 高优 Bug 无修复 PR |
| **IronClaw** | 16（14 活跃 / 2 关闭） | 50（33 合并 / 17 待合并） | 无 | 高强度：WS1 架构重构推进快，但 P0 安全漏洞未处理、CI 结构缺陷 |
| **LobsterAI** | 4（均为 stale 关闭） | 12（11 合并 / 1 待合并） | 无（7.31 发布分支已准备） | 中高：稳定迭代期，核心链路修复质量高，维护者响应及时 |
| **Moltis** | 2（1 新开 / 1 关闭） | 7（6 开放 / 1 合并） | 无 | 中等：外部安全贡献积极，但 PR 合并率偏低（1/7） |
| **CoPaw** | 18（13 活跃 / 5 关闭） | 43（13 合并 / 30 待合并） | 无 | 高活跃：2.x 迁移后稳定化修复密集，但 30 条待合并构成积压风险 |

> 注：OpenClaw 当日摘要生成失败，无法提供量化数据；作为核心参照项目，其生态影响力通过下游项目的衍生关系体现（见下节）。


## 3. OpenClaw 在生态中的定位

**生态源头与事实标准。** 从命名衍生关系（Zeroclaw、PicoClaw、NanoClaw、IronClaw、CoPaw）以及 LobsterAI 明确存在 “OpenClaw subsystem” 来看，OpenClaw 是该生态的架构蓝本与协议参照系。其他项目要么是其轻量化/安全化变体，要么以兼容其子系统为目标，说明其会话模型、工具调用协议、频道抽象已被广泛复用。

**优势：** 作为核心项目，OpenClaw 拥有最多的社区心智份额和衍生生态支撑。LobsterAI 将 OpenClaw 子系统稳定性作为核心开发对象（如 DeepSeek 缓存命中率修复），表明其已被企业级产品作为底层依赖。

**技术路线差异：** 各变体并非简单 fork，而是基于不同语言/架构重写——Zeroclaw 走 Rust + Landlock/Wasm 安全路线，PicoClaw 走轻量多协议路线，IronClaw 走多租户企业路线，NanoClaw 走极简容器隔离路线。

**社区规模对比：** 由于 OpenClaw 当日数据缺失，无法直接对比 Issue/PR 数量。但可间接判断：围绕其衍生出的项目横跨学术（HKUDS NanoBot）、硬件（Sipeed PicoClaw）、企业（net ease, nearai）、云厂商（AgentScope CoPaw），覆盖范围远超单一项目，印证其生态核心地位。


## 4. 共同关注的技术方向

以下需求在多个项目中独立涌现，反映行业共性痛点：

| 技术方向 | 涉及项目与具体诉求 |
|---------|-------------------|
| **IM 渠道可靠性** | NanoBot #5195（微信重扫码 token 覆盖）、Zeroclaw #8968（微信 iLink 静默丢消息）、CoPaw #6614（微信 cron 假成功、已耗 44M tokens）—— 微信渠道是重灾区 |
| **安全加固与审计** | Zeroclaw #7155（shell 命令分级确认策略）、IronClaw #6900（P0 跨用户内存泄漏）、Moltis #1179/#1180（配对验证、路径穿越）、NanoClaw #2923（伪造点击篡改卡片） |
| **架构现代化 / 存储迁移** | NanoBot #5173（JSONL→SQLite）、IronClaw WS1 契约抽取（3 个 PR 合并）、Zeroclaw Rust 1.97.1 工具链升级 |
| **模型选择权下沉** | NanoBot #5198（会话内切换模型）、PicoClaw #3200（可配置 fallback 链）、IronClaw #6941（模型自选技能）、CoPaw #6302（统一 provider 层） |
| **部署形态多元化** | NanoClaw #1184/#1732/#1225（K8s、native runner、去 Docker）、CoPaw #6160（内置 Python 环境）、NanoBot #5187（Termux 时区兼容） |
| **长上下文与性能** | LobsterAI #2415/#2413（缓存命中率 100%→57%→修复）、IronClaw #6974（libSQL p95 达 37-135s） |
| **新渠道扩展** | PicoClaw #3193（Simplex）、NanoClaw #3076/#3041（iMessage、Dial）、Moltis #1168（Nostr NIP-29 群聊） |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|----------------|
| **OpenClaw** | 核心参照，全功能基线 | 开发者社区 | 生态原点，协议标准制定者 |
| **Zeroclaw** | 安全优先 + Goal mode 有界自主 | 高级用户、安全敏感型团队 | Rust 实现；Landlock 沙箱、Wasm/WIT 插件、命令分级确认 |
| **IronClaw** | 多租户安全隔离 + MCP 托管 | 企业平台运营者 | Rust；WS1 契约分层、serde 枚举策略、openat2 防 TOCTOU |
| **NanoBot** | 多频道消息桥接 + WebUI | 个人用户、轻量部署 | Go；JSONL→SQLite 迁移、DeepSeek Responses API 适配 |
| **NanoClaw** | 极简安全 + 容器隔离 | 注重安全性的个人用户 | 容器/微VM 隔离优先；Docker 依赖成为部署门槛 |
| **PicoClaw** | 多协议轻量连接 | 硬件/嵌入式场景用户 | Go；强调低资源占用，但评审速度是短板 |
| **LobsterAI** | OpenClaw 企业级稳定化 | 企业客户（网易有道生态） | 基于 OpenClaw 子系统的增强；聚焦缓存效率与协议隔离 |
| **Moltis** | 安全基础 + 去中心化协议 | 早期采用者、隐私关注者 | 独立实现；Nostr/Block 生态集成、外部安全审计驱动 |
| **CoPaw** | 桌面体验 + AgentScope 集成 | 国内用户、桌面端重度用户 | Python/AgentScope 2.0；微信/飞书渠道、桌面快捷输入 |

**核心差异轴：** 安全强度（Zeroclaw/IronClaw/Moltis 领先）、部署灵活度（NanoClaw 受限 vs PicoClaw 轻量）、生态绑定（CoPaw×AgentScope、LobsterAI×OpenClaw、Moltis×Nostr）。


## 6. 社区热度与成熟度分层

**第一梯队 · 快速迭代期（高活跃、功能与架构并行推进）**
- **Zeroclaw**（50 PRs）、**IronClaw**（50 PRs）、**CoPaw**（43 PRs）
- 特征：日 PR 更新量大，架构级重构在途（WS1、Goal mode、provider 统一），同时面临 30+ 条待合并积压。

**第二梯队 · 质量巩固期（中高活跃、以稳定性修复为主）**
- **NanoBot**（16 PRs）、**NanoClaw**（9 PRs）、**LobsterAI**（12 PRs）
- 特征：核心链路已跑通，重点转向存储迁移、缓存优化、跨平台兼容等深度打磨；维护者响应周期短（NanoBot 微信 Bug 当日闭环）。

**第三梯队 · 早期培育期（贡献密度低、评审瓶颈明显）**
- **Moltis**（7 PRs）、**PicoClaw**（3 PRs）
- 特征：外部贡献开始出现（尤其安全补丁），但 PR 合并周期长达 4-5 周，PicoClaw 出现 stale Bug 无人认领。

**成熟度信号：** IronClaw 单日合并 3 个积压 2 月的 PR，说明主流项目正主动清理评审债务；而 PicoClaw、Moltis 的评审速度若无法改善，存在贡献者流失风险。


## 7. 值得关注的趋势信号

**信号一：安全已成为生产采用的“准入门槛”而非“加分项”。**
Moltis 外部贡献者原话：“I'd like to use Moltis, but I've got a couple of security fixes I'd like to get in before doing so.” Zeroclaw 高危命令确认策略与 IronClaw P0 跨用户泄漏同日引发高热度讨论，均指向同一结论：**安全治理能力决定项目能否从“玩具”走向“生产力工具”**。对开发者而言，评估任何 AI 助手框架时应优先审查其权限模型、沙箱隔离与配置审计能力。

**信号二：长上下文性能成为核心竞争力指标。**
LobsterAI 将“缓存命中率从 ~100% 跌至 ~57%”视为严重事故并当日修复；IronClaw 为 p95 延迟 37-135s 拆分专项跟踪。**在长会话场景下，prompt 字节稳定性、缓存友好度直接决定 API 成本与用户体验**，这是区别于传统聊天机器人的新型性能维度。

**信号三：消息渠道可靠性问题是生态系统性短板。**
微信渠道在 NanoBot、Zeroclaw、CoPaw 三个独立项目中同时出现“静默失败”类 Bug（token 覆盖、HTTP 200 包装错误、假 success）。**IM 平台的非标准错误处理是跨项目共性技术债**，新入局者应在一开始就建立渠道错误码到业务异常的完整映射。

**信号四：模型选择权正在经历“从开发者到终端用户”的下沉。**
NanoBot 用户抱怨“UI 上模型选择器不可用”，PicoClaw 提交 fallback 链配置 PR，IronClaw 提出“宿主停止替模型做选择”。这表明 **多模型路由正从硬编码配置演变为用户可交互、模型可自选的运行时能力**。

**信号五：部署形态从“容器优先”走向“多元共存”。**
NanoClaw 的 K8s 部署受阻与 native runner 诉求、CoPaw 的 Windows Python 环境问题、NanoBot 的 Termux 时区兼容，共同指向 **单一容器化方案无法覆盖长尾场景**。提供 bare-metal / 容器 / 受限集群的多级部署选项将成为主流框架的必备能力。

**信号六：可观测性与审计能力开始被“显式要求”。**
Zeroclaw 用户要求“能查看当前激活的安全策略”，IronClaw reviewer 要求“CI 缺陷必须显式跟踪”，Moltis 提交插桩 + Langfuse + OTLP 基础设施 PR。**AI 助手正从交互工具向可审计的自动化系统演进**，结构化日志脱敏（NanoClaw #3161）是这一趋势的直接注脚。

**信号七：外部贡献者结构出现“以用促建”的健康信号。**
Moltis 安全修复 PR、CoPaw 多个 first-time-contributor 补丁、IronClaw 清理 2 个月积压 PR——**真实用户带着生产环境痛点参与共建**，比单纯的“为开源而开源”更有持续性。项目维护者应通过缩短首次响应时间、明确 RFC 决策节点来保护和放大这一势头。


**总结建议：** 对技术决策者，当前生态中 IronClaw（企业多租户）、Zeroclaw（安全强化）、NanoBot（轻量快速）已形成差异化选择矩阵，选择时需优先匹配部署环境与安全合规需求；对开发者，微信渠道可靠性、长上下文缓存、安全策略可视化是短期内最值得投入的跨项目贡献方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 (2026-08-01)

## 1. 今日速览

过去24小时内，NanoBot 项目保持较高活跃度：共收到 4 条 Issue 更新（新开/活跃 2 条，关闭 2 条），16 条 PR 更新（待合并 10 条，已合并/关闭 6 条），无新版本发布。社区焦点集中在微信频道会话恢复、Termux 时区兼容性、WebUI MIME 类型加载错误，以及 DeepSeek 新 API 支持等议题。项目整体处于快速迭代阶段，Bug 修复和功能开发并行推进，健康度良好。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日共有 6 个 PR 被合并或关闭，涵盖微信、Slack、WebUI、会话存储迁移及跨平台兼容性等多项重要改进：

- **[fix(weixin): recover refreshed state after session expiry (#5196)](https://github.com/HKUDS/nanobot/pull/5196)** — 修复 #5195，解决微信重新扫码后 token 被旧值覆盖、导致立即触发 `errcode -14` 并暂停 60 分钟的问题。该 PR 使频道在暂停结束后能重新加载持久化状态，恢复正确会话。
- **[fix(slack): scope channel thread openers to their own session (#5192)](https://github.com/HKUDS/nanobot/pull/5192)** — 修复 Slack 线程会话隔离问题：顶级频道消息打开线程时不再落入共享频道会话，而是正确创建线程独立会话。
- **[fix(webui): preserve user scroll ownership near tail (#5193)](https://github.com/HKUDS/nanobot/pull/5193)** — 优化 WebUI 聊天列表滚动行为，用户在接近底部时手动上滑不会被强制跳回尾部，提升交互体验。
- **[feat(session): migrate session storage from JSONL to SQLite (#5173)](https://github.com/HKUDS/nanobot/pull/5173)** — 将运行时会话存储从 JSONL 迁移到 `sessions.db`，首次启动时自动导入历史 JSONL，并保留原文件作为回滚备份。这是架构层面的重大改进，为后续性能和可靠性提升奠定基础。
- **[fix(config): install timezone data on all platforms (#5189)](https://github.com/HKUDS/nanobot/pull/5189)** — 在所有平台安装 `tzdata` 作为 `zoneinfo` 回退，使 Termux 等缺少系统时区库的环境也能正常启动，并增加回归测试。
- **[fix(weixin): reload session state after pause expiry (#4223)](https://github.com/HKUDS/nanobot/pull/4223)** — 该 PR 于 2026-06-06 创建，今日关闭。其目标与 #5196 重叠，可能是被更完整的 #5196 替代而关闭。

此外，还有多个人待合并 PR 展示了后续方向，如 DeepSeek Responses API 支持（#5197）、WebUI Quick Chat / Temporary Chat（#5184）、Windows MIME 类型修复（#5191）以及若干系统健壮性修复（#5200、#5201）。

## 4. 社区热点

今日讨论最活跃的是 **[Issue #5195：Re-scan QR login overwrites new token with old one in stop()](https://github.com/HKUDS/nanobot/issues/5195)**，共有 2 条评论。该问题详细描述了微信个人号在 WebUI 重新扫码登录后，新 token 被旧 token 覆盖，导致首个 `getupdates` 请求即失败并进入 60 分钟暂停。用户对此反馈强烈，因为它让微信渠道陷入长时间不可用。背后诉求是重新登录流程的可靠性和状态管理的健壮性。该问题已在同日由 PR #5196 修复并关闭，响应速度非常快。

## 5. Bug 与稳定性

按严重程度排列，今日报告的 Bug 及处理状态如下：

| 严重度 | Issue | 问题描述 | 对应修复 PR |
|--------|-------|----------|-------------|
| 🔴 严重 | [#5195](https://github.com/HKUDS/nanobot/issues/5195) | 微信重新扫码后新 token 被旧 token 覆盖，立即 `errcode -14`，频道暂停 60 分钟 | [#5196](https://github.com/HKUDS/nanobot/pull/5196) 已合并 |
| 🟠 高 | [#5187](https://github.com/HKUDS/nanobot/issues/5187) | Termux 下因缺少时区数据导致配置加载失败，无法启动 | [#5189](https://github.com/HKUDS/nanobot/pull/5189) 已合并 |
| 🟠 高 | [#5190](https://github.com/HKUDS/nanobot/issues/5190) | Windows 下静态资源被错误识别为 `text/plain`，WebUI 模块脚本加载失败 | [#5191](https://github.com/HKUDS/nanobot/pull/5191) 待合并 |
| 🟡 中 | [#5198](https://github.com/HKUDS/nanobot/issues/5198) | 无法在会话中更改模型，点击模型徽标无响应，`/model` 命令行为异常 | 尚无对应 PR |

另外，PR #5201（容忍损坏的持久化 session summary）和 #5200（修复 exec wait_for 因截断而丢失）虽未明确对应 Issue，但也属于稳定性和健壮性修复，目前待合并。

## 6. 功能请求与路线图信号

- **会话内模型切换**（[#5198](https://github.com/HKUDS/nanobot/issues/5198)）：用户希望像云服务 AI 一样点击即可切换模型，目前 `nanobot` 仅将附加模型作为 fallback。这是一项典型 UX 功能请求，可能推动后续 UI 和命令交互的改进。
- **Quick Chat 与 Temporary Chat**（[PR #5184](https://github.com/HKUDS/nanobot/pull/5184)）：新增 WebUI 快速聊天和临时会话功能，体现了对轻量交互和隐私需求的关注，可能纳入下个版本。
- **DeepSeek Responses API 支持**（[PR #5197](https://github.com/HKUDS/nanobot/pull/5197)）：为 `deepseek-v4-flash` 路由到原生 Responses API，其余模型继续走 Chat Completions，扩大 provider 生态。
- **会话存储 SQLite 化**（[PR #5173](https://github.com/HKUDS/nanobot/pull/5173)）：已完成合并，标志存储架构现代化，为未来性能优化和大规模会话管理铺路。
- **长期待合并的增强功能**：session 导入/导出/搜索/统计（[#1565](https://github.com/HKUDS/nanobot/pull/1565)）和 skill status 命令（[#1319](https://github.com/HKUDS/nanobot/pull/1319)）虽因冲突未合并，但仍是社区期待的功能路线。

## 7. 用户反馈摘要

从今日 Issue 评论中可提炼出真实痛点：

- **微信渠道稳定性**（#5195）：用户在重新扫码后遭遇 token 被覆盖，导致渠道静默停摆。反馈显示对重新登录机制十分依赖，修复需求迫切。
- **跨平台兼容性**（#5187、#5190）：Termux 用户因时区问题无法启动；Windows 用户因 MIME 类型错误导致前端完全白屏。这些反馈凸显了项目在非主流平台的适配仍待加强，尤其 Windows 下的静态资源服务行为需要测试覆盖。
- **模型交互方式**（#5198）：有用户指出 UI 上模型选择器不可用，期望能像商业产品一样直接切换模型，说明当前模型管理逻辑与用户预期有差距。

## 8. 待处理积压

以下长期未合并或未关闭的 PR 需要维护者关注：

- [PR #1656](https://github.com/HKUDS/nanobot/pull/1656)（2026-03-07）：修复 string schema 验证 None 值，避免 TypeError。标记为 `conflict`，长时间未处理。
- [PR #1565](https://github.com/HKUDS/nanobot/pull/1565)（2026-03-05）：session 导出/导入/搜索/统计命令，价值高但处于冲突状态。
- [PR #1319](https://github.com/HKUDS/nanobot/pull/1319)（2026-02-28）：添加 `nanobot skill status` 命令，帮助诊断 skill 不可用原因，同样因冲突搁置。

这些 PR 都来自社区贡献，且功能未在主线中实现，建议维护者优先解决冲突或明确关闭原因，避免社区贡献长期悬置。

---

*数据统计时间范围：2026-07-31 至 2026-08-01（UTC）*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-01

> 数据来源：Zeroclaw (github.com/zeroclaw-labs/zeroclaw) GitHub Issues / PRs

---

## 1. 今日速览

- 过去 24 小时项目保持高活跃：**17 条 Issues 更新（15 条活跃 / 2 条关闭）**，**50 条 PR 更新（35 条待合并 / 15 条已合并或关闭）**，无新版本发布。
- 今日讨论焦点集中在**安全治理与架构演进**：高危 shell 命令确认策略（#7155，7 条评论）、桌面 computer-use 支持（#6909，7 条评论）与“一切皆插件”统一目录（#6489，6 条评论）是热度最高的议题。
- 两项高影响 Bug 修复落地：**Signal/Voice Call 空凭据 crashloop**（#6724 关闭，修复 PR #9524 合并）与 **Fedora 上 Landlock 阻断 shell 访问**（#8973 关闭）。
- 待合并 PR 池庞大（35 条），其中 **4 条 p1 级修复**（命令 allowlist 绕过、WhatsApp 策略失效、微信消息静默丢失、cron SOP 不执行）仍在排队，需维护者优先关注。
- 社区贡献者结构健康：今日活跃 PR 中包括 **principal / trusted / distinguished contributor** 提交的多条核心改动（如 #9527、#8689、#9286），体现出项目对资深贡献者的持续吸引力。

---

## 2. 版本发布

无新版本发布（最新 Releases 为空）。多个已合并 PR（见第 3 节）尚未形成正式版本，预计下次 release 将包含今日合并的 Bug 修复与 CI 基础设施改动。

---

## 3. 项目进展

今日共有 **15 条 PR 已合并/关闭**（其中 2 条在列），关键进展如下：

### 已合并/关闭（今日）

- **修复：Signal/Voice Call 空凭据导致 supervisor crashloop** — [PR #9524](https://github.com/zeroclaw-labs/zeroclaw/pull/9524)（关闭）。
  - 背景下：启用的 Signal / Voice Call 频道若缺少必需凭据，supervisor 会以约 2 秒一次的频率反复重启（[Issue #6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724)，今日已关闭）。该 PR 在启动时跳过此类频道配置，从根源消除崩溃循环，亦修复了 Dashboard UX 中“只启不填”的配置陷阱。
- **CI：MUSL 测量构建** — [PR #9286](https://github.com/zeroclaw-labs/zeroclaw/pull/9286)（关闭）。
  - 维护者 Audacity88 在 review 后追加 commit，确保 feature 分支的测量运行仅做恢复、并将 target 目录从 Rust 缓存中排除。属于 CI 基础设施加固，为后续静态链接发布做准备。

### 重要 Bug 关闭（今日）

- [Issue #8973](https://github.com/zeroclaw-labs/zeroclaw/issues/8973)：Landlock 沙箱导致 Fedora 上 shell 工具无法访问 `/dev/null`（p1, S2 降级），今日关闭。
- [Issue #6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724)：上述 Signal/Voice Call crashloop，今日关闭。

### 尚未合并但在推进中的核心方向

- **Rust 工具链升级至 1.97.1** — [PR #9527](https://github.com/zeroclaw-labs/zeroclaw/pull/9527)：覆盖 CI、MSRV、容器镜像与文档共 26 处 pin 更新，由 principal contributor @NiuBlibing 提交，状态 OPEN。
- **Goal 模式频道接入** — [PR #8689](https://github.com/zeroclaw-labs/zeroclaw/pull/8689)：为频道新增 `/goal` 命令准入（start/status/budget/pause/resume/cancel 等），是该系列功能的主干 PR。
- **Goal 自恢复循环修复** — [PR #8746](https://github.com/zeroclaw-labs/zeroclaw/pull/8746)：阻止已运行的 goal 被重复 resume，依赖 #8689，两者属同一功能栈。

> 综合来看，项目今日在**稳定性修复**（2 个 Bug 关闭）与**CI 层面**有明确进展；核心功能（goal mode、A2A、Telegram 流式发送）仍处评审-迭代循环中，尚未合并。

---

## 4. 社区热点

今日讨论最活跃的议题集中在 **RFC 与架构设计**（以下按评论数排序）：

- **[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)（7 条评论）— RFC：高危 shell 命令分级确认 + Claude Code 风格 allow/ask/deny 策略**
  - 作者 @NiuBlibing，p1 优先级，risk:high。
  - 核心诉求：现有 `auto_approve`、通配符批准或“始终允许 shell”都过于粗粒度；需要命令模式级别的策略中间层。这是对 shell 工具安全治理的直接增强呼声。
- **[#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)（7 条评论）— RFC：桌面 computer-use 支持（屏幕交互与输入控制）**
  - 作者 @NiuBlibing，p2，risk:high。
  - 社区关注的是“安全默认”前提下实现桌面自动化：仓库已有 `browser.backend = "computer_use..."` 相关碎片代码，但缺少完整的维护级方案。
- **[#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489)（6 条评论）— RFC：“一切皆插件”统一插件目录**
  - 作者 @theonlyhennygod，p2，risk:high，type:tracker。
  - 主张将“Integrations”（channels + providers + 内置工具）与“Plugins”（Wasm/WIT）合并为统一插件目录，反映社区对架构碎片化的长期担忧。
- **[#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)（5 条评论）— RFC：安全 UX、运行时凭据边界与隔离默认值**
  - 用户 @Audacity88 提出安全控制“可检查性”问题——操作员需要能查看当前激活的安全策略，否则安全功能难以落地。
- **[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)（5 条评论，1 👍）— RFC：Goal mode 有界自主会话**
  - 作者 @vrurg。需要“面向一个目标持续运行到完成/暂停/取消/预算耗尽”的一等持久模式。与之对应的 PR #8689 / #8746 已在评审中。

**热点背后的诉求归纳**：社区当前集中关住两条主线——**安全默认值可配置、可审计**（#7155、#6971、#6909）与**运行时架构统一**（#6489、#8135、#8187）。大量 RFC 标 `risk:high`，说明这些改动涉及核心执行路径，对维护者决策质量要求很高。

---

## 5. Bug 与稳定性

按严重程度排列：

### 已修复（今日关闭）

| 严重度 | Issue | 问题 | 修复 PR |
|---|---|---|---|
| P1 | [#8973](https://github.com/zeroclaw-labs/zeroclaw/issues/8973) | Landlock 沙箱下 `sh` 无法访问 `/dev/null`，shell 工具全部失败（Fedora，S2） | 今日关闭（未在今日列出的 PR 中定位到直接对应项） |
| P3（影响大） | [#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724) | Signal / Voice Call 空凭据导致 supervisor 无限 crashloop | [#9524](https://github.com/zeroclaw-labs/zeroclaw/pull/9524)（已合并） |

### 待修复 / 修复 PR 排队中

- **P1 安全：命令 allowlist 大小写绕过** — [Issue 关联 PR #9568](https://github.com/zeroclaw-labs/zeroclaw/pull/9568)。
  - `is_allowlist_entry_match` 在非 Windows 平台以大小写敏感方式比较可执行文件名，攻击者可通过变换大小写绕过拦截。修复 PR 已提交（size:XS，风险中），尚未合并。
- **P1 配置误导：WhatsApp 聊天策略不生效** — [PR #9354](https://github.com/zeroclaw-labs/zeroclaw/pull/9354)。
  - `dm_policy`、`group_policy`、`self_chat_mode` 仅 `mode = "personal"` 下生效，business 模式下静默失效，容易造成“配置看似严格实则开放”的错觉。修复改为显式警告。
- **P1 功能 Bug：cron 启动的 SOP 无头运行从不执行** — [PR #9494](https://github.com/zeroclaw-labs/zeroclaw/pull/9494)。
  - maintenance tick 将 `ExecuteStep` 传给 `process_headless_results` 后仅记录 pending，没有 agent 循环。修复后由 SOP 驱动 cron 无头执行。
- **P1 消息丢失：微信 iLink 发送失败被静默吞掉** — [PR #8968](https://github.com/zeroclaw-labs/zeroclaw/pull/8968)。
  - iLink 以 HTTP 200 + 非零 `ret`/`errcode` 返回发送失败，`send_message_items` 只检查 HTTP 状态码，导致消息丢失无感知。已标记 `stale-candidate`。
- **安全：Lark 验证 token 比较存在时序攻击风险** — [PR #9110](https://github.com/zeroclaw-labs/zeroclaw/pull/9110)。
  - 将 `==` 替换为 `constant_time_eq()`，待合并。

### 性能 / 稳定性改进

- **[PR #8937](https://github.com/zeroclaw-labs/zeroclaw/pull/8937)**：LoopDetector 每次工具调用深拷贝 `args`，改为流式哈希，降低性能开销。
- **[PR #8927](https://github.com/zeroclaw-labs/zeroclaw/pull/8927)**：兼容提供方（如 MiniMax）将思维链放在 `content` 中时，无条件 `strip_think_tags` 会破坏正文，改为按条件剥离。
- **[PR #8964](https://github.com/zeroclaw-labs/zeroclaw/pull/8964)**：流式草稿缺失消毒边界，原始 `<...>` 内容可能直接发到频道，需在 assistant 边界处加消毒。

> 整体来看，今日修的 2 个 Bug 均为真实环境用户报告（Fedora、Dashboard 配置），修复 PR 质量较高；但 4 条 P1 修复仍在等待合并或作者响应（见第 8 节），项目在“发现-修复-合并”链路上仍有阻塞。

---

## 6. 功能请求与路线图信号

### 已有实现 PR、可能进入下一版本的功能

- **Goal Mode（有界自主会话）** — [RFC #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) + [PR #8689](https://github.com/zeroclaw-labs/zeroclaw/pull/8689)（频道 `/goal` 命令准入）+ [PR #8746](https://github.com/zeroclaw-labs/zeroclaw/pull/8746)（自恢复循环修复）。
  - 信号最强：两个 XL 级 PR 均已进入评审，是当前最接近落地的新功能。
- **A2A 出站客户端** — [PR #9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)。
  - 对应 [RFC #9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)（不在今日列表但为 PR 明确引用）：实现 4 个 `a2a_*` 工具、共享 A2A v1.0 Serde wire model 与默认关闭的 `[a2a.client]` 配置，已满足 6 条维护者评审意见。
- **Telegram 多消息流式发送** — [PR #8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561)。
- **Slack 线程上下文注入** — [PR #8969](https://github.com/zeroclaw-labs/zeroclaw/pull/8969)。
- **Skills 声明式自动激活** — [PR #8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965)，但作者声明“分支已拆分、2 个评审问题未解决”，暂不建议合并。

### 设计讨论阶段（暂无实现）

- **Computer-use 桌面支持** — [RFC #6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)：高风险高复杂度，短期内无实现者。
- **“一切皆插件”统一目录** — [RFC #6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489)：长期架构方向，影响面大。
- **Wasm-first 插件运行时** — [RFC #8135](https://github.com/zeroclaw-labs/zeroclaw/issues/8135) + 能力门控 WASI 硬件函数 [RFC #8187](https://github.com/zeroclaw-labs/zeroclaw/issues/8187)：与 #6489 形成架构组合拳，但均停留在 RFC 阶段。
- **LSP 支持** — [RFC #5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)：用户 @tidux 主张用于减少幻觉，尤其对本地模型重要；已引用 Claude Code / OpenCode 作竞品参照。
- **响应缓存策略** — [RFC #8321](https://github.com/zeroclaw-labs/zeroclaw/issues/8321)：等待 #8320 配合，评论仅 1 条，需补充关注。

> 路线图判断：**短期（下一版本）最可能合并的是 goal mode 相关 PR（#8689/#8746）与 A2A 第一阶段（#9324）**。安全类新功能（shell 确认层 #7155）即使获得批准，也需先解决命令策略匹配等基础问题（#9568），预计排期靠后。

---

## 7. 用户反馈摘要

从今日活跃 Issues / PR 中提炼的真实用户声音：

- **Fedora 用户环境级故障（@perillamint）**：Landlock 开启后 `sh` 无法访问 `/dev/null`，shell 工具“总是失败”，属于安全功能破坏核心功能的反面案例，已在今日修复/关闭。
- **配置陷阱吐槽（@belumume 的 PR 描述）**：“WhatsApp Web 配置看起来严格实际开放”，`dm_policy` 在 business 模式下不生效且无任何提示——用户期待“配置无效时及时警告”。
- **消息可靠性痛点（@tonsiasy）**：微信 iLink 发送失败返回 HTTP 200 包装错误，消息被静默丢弃，用户无感知——对 IM 类频道是不可接受的。
- **安全能力对标（@NiuBlibing）**：shell 控制需要一个介于“完全阻断”与“完全放行”之间的中间层；Direct 引用 Claude Code 的命令策略作为参照物。
- **本地模型用户需求（@tidux）**：语言服务器可有效减少幻觉，尤其是本地模型；“Claude Code 和 OpenCode 已经支持 LSP”，Zeroclaw 在此落后于同类产品。
- **架构复杂度抱怨（@theonlyhennygod）**：Integrations 与 Plugins 两个概念长期并存，用户困惑“到底走哪条路”，呼吁统一为单一插件目录。
- **操作员可审计诉求（@Audacity88）**：安全控制“只有操作员能检查当前启用了什么策略才有用”，暗示当前安全控制黑盒化问题。

整体情绪：用户高度认可项目在安全技术栈上的投入（Landlock、沙箱、Wasm），但普遍反映**安全功能对真实使用场景不够友好、配置失败不易感知、部分粒度过粗**。

---

## 8. 待处理积压

### 长期未响应 / 等待作者更新的 PR（按等待时间排序）

| PR | 创建时间 | 状态 | 说明 |
|---|---|---|---|
| [#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) | 2026-06-30 | needs-author-action | Telegram `multi_message` 流式模式，XL 级，等待作者响应 30+ 天 |
| [#8689](https://github.com/zeroclaw-labs/zeroclaw/pull/8689) | 2026-07-04 | needs-author-action | Trusted contributor 的 goal 命令准入，是 #8746 的前置依赖 |
| [#8746](https://github.com/zeroclaw-labs/zeroclaw/pull/8746) | 2026-07-05 | needs-author-action | goal 自恢复循环修复，依赖 #8689，需一并处理 |
| [#8878](https://github.com/zeroclaw-labs/zeroclaw/pull/8878) | 2026-07-09 | needs-author-action | per-model vision catalog 解析（#8733 前半部分） |
| [#8927](https://github.com/zeroclaw-labs/zeroclaw/pull/8927)、[#8928](https://github.com/zeroclaw-labs/zeroclaw/pull/8928)、[#8937](https://github.com/zeroclaw-labs/zeroclaw/pull/8937) | 2026-07-10 | needs-author-action | 兼容提供方修复 / Doctor 日志路径 / LoopDetector 流式哈希，均出自 @wangmiao0668000666 |
| [#8969](https://github.com/zeroclaw-labs/zeroclaw/pull/8969) | 2026-07-11 | needs-author-action | Slack 线程上下文，XL 级 |
| [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) | 2026-07-11 | needs-author-action | 作者明确“not ready to merge”，可暂缓评审资源 |
| [#9110](https://github.com/zeroclaw-labs/zeroclaw/pull/9110) | 2026-07-17 | needs-author-action | Lark 时序攻击修复，安全相关，建议尽快推进 |
| [#9494](https://github.com/zeroclaw-labs/zeroclaw/pull/9494) | 2026-07-28 | needs-author-action | P1：cron SOP 不执行，修复 PR 等待作者更新 |
| [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) | 2026-07-24 | needs-author-action | A2A 出站客户端，已响应两轮 review，XL 级重点功能 |

### 长期开放、等待维护者决策的 RFC / Tracker

- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（Tracker，5 条评论）**：维护者决策队列本身已积压 5 条评论，侧面说明 RFC 决策是当前瓶颈。
- **[#5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)（2026-04-19，100+ 天）**：LSP 支持 RFC，仍为 `needs-author-action`，无维护者明确表态。
- **[#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489)（2026-05-06）**：统一插件目录，多条相关依赖 RFC 已合流，建议尽快指定架构 owner。
- **[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)（p1）**：高危 shell 命令确认层级为 p1 安全需求，但尚未看到维护者分配或指派实现者。
- **[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)（2026-05-28）**：细粒度沙箱策略，与已修复的 #8973 相关，需重新评估优先级。

### 总体积压信号

- **35 条待合并 PR** 中大量为 `needs-author-action`，说明阻塞更多在**贡献者侧**而非维护者侧；但 4 条 P1 修复（#9568、#9354、#8968、#9494）若持续等待，将影响项目稳定性的实际交付。
- 维护者决策队列 tracker（#8692）与 ADR 审计 tracker（#8691）已建立，建议维护者在下一次 release 前集中过一遍高风险 RFC，为社区给出明确预期。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 项目动态日报（2026-08-01）

### 今日速览
过去 24 小时，PicoClaw 项目无新版本发布；共更新 2 条 Issue（均为开放）与 3 条 Pull Request（全部待合并）。社区讨论量较低（各 Issue 评论仅 1–2 条），但反馈问题较为具体，指向 IRC 消息处理与界面性能。值得注意的是，3 条 PR 均创建于 6 月下旬至 7 月初，至今仍在待审状态，项目可能存在评审积压或维护者响应速度放缓的迹象，整体活跃度评估为**中等偏低**。

### 项目进展
今日没有 PR 被合并或关闭，因此没有直接的功能落地。3 条待合并 PR 虽未合入主分支，但清晰透露了项目近期的工作方向：

- **[#3222 refactor(deltachat): cleanup implementation, documentation -200LOC](https://github.com/sipeed/picoclaw/pull/3222)**：大幅精简 DeltaChat 通道实现，废弃旧特性和遗留测试，强化官方 relay 列表引用与 JSON-RPC 密钥流转，并新增 `show_invite_link` 等接口。若合并，可显著降低该协议的维护成本。
- **[#3193 Added simplex channel type](https://github.com/sipeed/picoclaw/pull/3193)**：为项目新增 Simplex 通道，扩展端到端加密通信的接入能力，属于新平台集成。
- **[#3200 feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200)**：允许用户在 Web UI 中配置默认模型及可排序的 fallback 链，并通过后端 API 持久化，增强多模型场景下的可用性。

以上 PR 分别对应“既有通道优化”“新通道拓展”“模型管理增强”三条主线，若后续顺利合入，将实质性提升 PicoClaw 的多平台连接能力与模型调度灵活性。

### 社区热点
- **[Issue #3287：[Feature] Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)**（2 条评论）  
  用户指出 IRC 默认 512 字节限制会导致消息被客户端自动拆分，而 PicoClaw 当前未能将分片重组为单一语义消息，影响 LLM 对上下文的完整理解。该问题指向 IRC 通道在真实场景下的体验短板，背后是对消息完整性和对话连贯性的核心诉求。
- **[Issue #3292：[BUG] CPU usage too high when focus on input box in chat interface / 聊天界面输入框在选中时cpu占用高](https://github.com/sipeed/picoclaw/issues/3292)**（1 条评论）  
  唯一一个明确 Reproduced 的 Bug，涉及高频交互操作时的性能下降，直接影响用户输入体验。虽然讨论热度不高，但反馈环境信息完整，值得维护者重视。

### Bug 与稳定性
当前活跃 Bug 仅 1 条，严重程度评定为**中等**：

| Issue | 严重程度 | 问题描述 | 修复 PR |
|---|---|---|---|
| [#3292](https://github.com/sipeed/picoclaw/issues/3292) | 中 | 聊天界面输入框聚焦时 CPU 占用过高。用户环境：PicoClaw v0.3.1 / Go 1.26 / deepseek-v4-flash / Firefox on Debian Linux x64 | 无 |

该问题目前**没有关联的 fix PR**，且已被自动标记为 `stale`，存在被机器人关闭的风险。建议维护者尽快复现并确认原因，避免性能问题被忽略。

### 功能请求与路线图信号
- **[#3287 IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287)**：要求将 IRCv3 中超过 512 字节并自动拆分的消息视为一条完整消息。考虑到 PicoClaw 定位为多协议 AI 助手，且 IRC 为已支持的通道类型，该需求符合产品方向。结合正在等待合并的 PR #3193（新增 Simplex 通道）和 #3200（模型 fallback 链），项目近期明显在“连接性扩展”与“模型管理”上发力，该请求有可能被纳入下一版本的通道体验优化范围，但目前无 👍 或 roadmap 背书，优先级尚不明朗。

### 用户反馈摘要
- 来自 [#3287](https://github.com/sipeed/picoclaw/issues/3287) 的用户反馈表明，存在真实用户在 IRC 场景中深度使用 PicoClaw，并因协议限制而遇到“长消息被切断、上下文不连贯”的实际痛点，侧面反映 IRC 通道并非摆设，而是有实际活跃度。
- [#3292](https://github.com/sipeed/picoclaw/issues/3292) 的反馈者使用中英双语提交，提示项目存在中文用户群体。输入框聚焦时的高 CPU 占用属于高频触发问题，可能对日常对话节奏造成明显干扰。
- 两个 Issue 的 👍 均为 0，可能意味着这些问题尚未获得广泛社区共鸣，需要 Maintainer 主动引导和确认影响面。

### 待处理积压
以下 PR/Issue 已开放较长时间，且最近一次更新均为 2026-07-31（统计当日），说明仍有人在跟进，但长期处于待合并或待响应状态，建议维护者重点关注：

| 类型 | 编号 | 标题 | 创建时间 | 待响应时长（约） |
|---|---|---|---|---|
| PR | [#3193](https://github.com/sipeed/picoclaw/pull/3193) | Added simplex channel type | 2026-06-27 | 5 周 |
| PR | [#3200](https://github.com/sipeed/picoclaw/pull/3200) | feat(models): add configurable default fallback chain | 2026-07-01 | 4 周 |
| PR | [#3222](https://github.com/sipeed/picoclaw/pull/3222) | refactor(deltachat): cleanup implementation, documentation -200LOC | 2026-07-03 | 4 周 |
| Issue | [#3292](https://github.com/sipeed/picoclaw/issues/3292) | CPU usage too high when focus on input box | 2026-07-24 | 已标记 `stale` |

特别是 #3292 已进入 stale 状态，若维护者不尽快介入，可能被自动关闭，导致真实性能问题被遗漏。整体来看，项目当前主要风险不在社区贡献量，而在**合并与响应速度**，建议维护团队加速评审进程，避免阻塞功能落地。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-01

## 1. 今日速览

过去24小时 NanoClaw 项目保持中高活跃度：共产生 8 条 Issue 更新和 9 条 PR 更新，无新版本发布。所有 8 条 Issue 均处于开放状态，无关闭记录；PR 方面有 3 条关闭/合并、6 条待合并。值得关注的是，社区讨论集中在**容器化部署限制**（K8s、Docker 依赖、Apple Container breakage）和**Telegram 高优先级 Bug** 两条主线上，同时出现了 Hosted iMessage、Dial 渠道等新集成 PR，反映出项目正在向多平台消息渠道和更灵活的运行时形态演进。整体健康度良好，但维护者需留意部分长期未彻底解决的问题（如 #1732 的原生运行诉求）。

## 2. 版本发布

过去24小时内无新版本发布。但有一条已关闭的 PR #3163「fix(release): restore the v2.1.54 release path」专门修复了 v2.1.54 的发布路径，暗示此前版本发布流程曾出现中断，现已恢复。正式版本发布预计将在后续落地。

## 3. 项目进展

今日共有 3 条 PR 关闭/合并，对项目有实质推进：

- **[#3163] fix(release): restore the v2.1.54 release path** — 修复 v2.1.54 版本的发布流程问题，确保版本发布管道恢复畅通。属于工程基建修复。链接：https://github.com/nanocoai/nanoclaw/pull/3163
- **[#3076] feat(imessage): unified local+hosted adapter targeting spectrum-ts v11** — 面向 iMessage 的统一本地 + 托管适配器，对接 spectrum-ts v11。这是此前 Hosted iMessage 系列 PR 的后续，为跨平台消息集成铺路。链接：https://github.com/nanocoai/nanoclaw/pull/3076
- **[#1678] docs(skills): update voice transcription skills for Telegram + Linux** — 更新语音转写技能的文档，将 `use-local-whisper` 从仅支持 WhatsApp 扩展到 Telegram，并适配 Linux 环境。文档完善有助于提升用户上手体验。链接：https://github.com/nanocoai/nanoclaw/pull/1678

整体来看，项目在消息渠道兼容性、文档完善和发布流程稳定性三个方面都向前迈进了。

## 4. 社区热点

今日讨论热度最高的议题集中在两条 Issue：

- **[#1184] Challenges deploying nanoclaw in restricted K8s environments (Sealos)** — 3 条评论，1 个 👍。作者赞赏 NanoClaw 极简、安全的架构，但分享在受限 K8s（Sealos）环境中部署时遇到的阻碍。社区诉求直奔**生产环境落地**：如何在无法直接使用 Docker 的 K8s 集群中运行 NanoClaw。链接：https://github.com/nanocoai/nanoclaw/issues/1184
- **[#1732] feat: native runner mode — bypass Docker for host-tool access** — 3 条评论。用户列举了 tmux、有头浏览器、macOS API 等被 Docker 隔离阻断的场景，请求提供原生运行模式。这是**对容器隔离与宿主集成的权衡讨论**，反映了部分高级用户的安全/便捷取舍需求。链接：https://github.com/nanocoai/nanoclaw/issues/1732

两者的共性在于：**NanoClaw 的容器隔离是安全优势，但也构成部署灵活性的天花板**。社区希望项目提供更多运行时选项。

## 5. Bug 与稳定性

按严重程度排列：

- **[高] [#3162] Telegram pairing is silently broken for the whole process lifetime if the boot-time getMe fails** — 在 `channels` 分支复现，boot 阶段一次 `getMe` 失败会导致整个进程生命周期内 Telegram 配对功能静默失效，用户毫无提示。**目前无对应修复 PR**，维护者应优先处理。链接：https://github.com/nanocoai/nanoclaw/issues/3162
- **[安全/中] [#2923] ask_user_question card can be defaced by a forged click before origin authz** — 伪造按钮点击可以在源校验之前篡改问题卡片显示文本，属于显示完整性欺骗漏洞。已有相关修复 PR #2651（validate pending question response origin）处于开放状态，但尚未合并。链接：https://github.com/nanocoai/nanoclaw/issues/2923；相关 PR：https://github.com/nanocoai/nanoclaw/pull/2651
- **[中] [#2589] Apple Container: host.docker.internal in OneCLI proxy URL doesn't resolve from inside the microVM** — Apple Container 环境不解析 `host.docker.internal`，且不支持 `--add-host` 注入，导致代理 URL 失效。链接：https://github.com/nanocoai/nanoclaw/issues/2589
- **[中] [#2588] skill/apple-container branch is substantially out of sync with mainline** — `apple-container` 分支引用已删除的 API、模块，且假设 Node+tsc 运行时（主线已迁移到 bun），`/convert-to-apple-container` 技能会立即失败。已有 PR #2809 试图解决 Apple Container 运行时支持，但尚在待合并状态。链接：https://github.com/nanocoai/nanoclaw/issues/2588；PR：https://github.com/nanocoai/nanoclaw/pull/2809

另有一条 PR **#3161** 提交了安全修复：`fix: redact secrets from host structured logs`，对宿主结构化日志中的凭证进行脱敏，这是对潜在敏感信息泄露的预防性修复，待合并。链接：https://github.com/nanocoai/nanoclaw/pull/3161

## 6. 功能请求与路线图信号

今日出现多个功能请求，合计 4 项：

| 功能请求 | Issue/PR | 状态 | 可能纳入版本 |
|---------|----------|------|-------------|
| **Native runner mode**（绕过 Docker，支持宿主机工具访问） | #1732 | OPEN Issue | 路线图候选，与 #2354 有一定关联 |
| **Kubernetes container runtime**（在用户集群上以 Pod 方式运行代理容器） | #2354 | OPEN Issue（1 👍） | 与 #1184 部署诉求互补，值得评估 |
| **无需 Docker 运行**（支持 Windows/Linux bare-metal） | #1225 | OPEN Issue | 简化部署的长期需求 |
| **Hosted iMessage (Photon) 完整注册流程** | #3164 | OPEN PR（core-team） | 若合并将大幅增强 iMessage 渠道可用性 |
| **Dial channel adapter**（SMS + AI 语音通话） | #3041 | OPEN PR | 新渠道扩展，可能纳入后续版本 |

此外，PR #2809（Apple Container runtime + 远程 OneCLI gateway）与 #2651（问题响应源校验）是当前待合并队列中与 Bug/安全直接相关的关键 PR，建议优先处理。

## 7. 用户反馈摘要

从今日活跃 Issue 评论中提炼的用户声音：

- **正向反馈**：用户 @JachinShen 在 #1184 中表示欣赏 NanoClaw 极简、轻量、安全的设计理念，认为用现有代码代理构建精简「Claw」很巧妙，明确表达了「很想在生产环境运行」的意愿。
- **痛点 1：Docker 依赖成为硬性门槛**。多位用户（#1225、#1732）提到 Docker 在 Windows、Linux 裸机、受限 K8s 环境下不可用或不受控，希望提供原生运行模式或替代容器运行时。
- **痛点 2：Apple Container 支持断裂**。用户 @snymanpaul 提交的两条 Issue（#2588、#2589）表明 `apple-container` 分支已与主线严重脱节，文档技能开箱即失败，直接影响 macOS 用户体验。
- **痛点 3：静默故障**。用户 @glifocat 报告的 Telegram 配对问题（#3162）体现了「出错不报、持续不可用」的糟糕体验，用户在评论中强调「nothing tells them why」。

## 8. 待处理积压

以下问题长期存在但尚未闭环，建议维护者重点关注：

- **[#1225] Run it without docker** — 2026-03-18 创建，接近 4.5 个月无实质解决，2 条评论。这是基础可用性诉求，与 #1732 可合并评估。链接：https://github.com/nanocoai/nanoclaw/issues/1225
- **[#1184] Challenges deploying in restricted K8s environments (Sealos)** — 2026-03-17 创建，3 条评论，有真实生产环境部署诉求，但项目侧暂无明确回复。链接：https://github.com/nanocoai/nanoclaw/issues/1184
- **[#1732] Native runner mode** — 2026-04-10 创建，3 条评论，已产出较完整的方案讨论但无路线图回应。链接：https://github.com/nanocoai/nanoclaw/issues/1732
- **[#2588] apple-container 分支失联** — 2026-05-22 创建，对应 PR #2809 已开放 1 个多月，合并进展缓慢，影响 macOS 用户。链接：https://github.com/nanocoai/nanoclaw/issues/2588
- **[#2923] 安全问题修复 PR #2651 长期未合并** — PR 自 2026-05-30 开放至今已 2 个月，涉及交互安全（来源校验），建议尽快代码审查并合入。链接：https://github.com/nanocoai/nanoclaw/pull/2651

---

*本日报基于 GitHub 公开数据生成，数据统计时间窗口为 2026-07-31 至 2026-08-01。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-01

## 1. 今日速览

过去 24 小时项目保持高强度迭代：16 条 Issue 更新（14 条活跃、2 条关闭），50 条 PR 更新（33 条已合并/关闭、17 条待合并），无新版本发布。核心事件是目标架构 WS1 重构浪潮持续推进，[#6967](https://github.com/nearai/ironclaw/issues/6967)（WS1.1）、[#6975](https://github.com/nearai/ironclaw/issues/6975)（WS1.2）、[#6977](https://github.com/nearai/ironclaw/issues/6977)（WS1.3）三个契约抽取 PR 相继合并，[#6980](https://github.com/nearai/ironclaw/issues/6980)（WS1.4）、[#6981](https://github.com/nearai/ironclaw/issues/6981)（WS1.5）、[#6982](https://github.com/nearai/ironclaw/issues/6982)（WS1.6+1.7）排队跟进，Wave 1 接近收尾。功能侧，大型 PR [#6930](https://github.com/nearai/ironclaw/issues/6930)「注册托管 MCP 服务器」（153 文件，+15,002/−1,818）已合并并完成文档对齐。健康度方面：P0 安全漏洞 [#6900](https://github.com/nearai/ironclaw/issues/6900)（跨用户内存泄漏）仍未修复，同时 [#6963](https://github.com/nearai/ironclaw/issues/6963)、[#6978](https://github.com/nearai/ironclaw/issues/6978) 暴露 CI 门禁体系存在结构性缺陷，需维护者优先关注。

## 3. 项目进展

**WS1 目标架构重构浪潮（核心进展）** — 契约抽取工作流稳步推进，WS0 前置清理 Issue [#6920](https://github.com/nearai/ironclaw/issues/6920) 已关闭，架构基线就绪：

- [#6967](https://github.com/nearai/ironclaw/issues/6967)（WS1.1，已合并）— 完成 `ironclaw_host_api` 轮次词汇表并退役 turns shim
- [#6975](https://github.com/nearai/ironclaw/issues/6975)（WS1.2，已合并）— 抽取 `ironclaw_loop_contracts`，翻转 `agent_loop` 依赖
- [#6977](https://github.com/nearai/ironclaw/issues/6977)（WS1.3，已合并）— 抽取 `ironclaw_extension_contracts`，关闭双导入路径
- [#6980](https://github.com/nearai/ironclaw/issues/6980)（WS1.4）、[#6981](https://github.com/nearai/ironclaw/issues/6981)（WS1.5）、[#6982](https://github.com/nearai/ironclaw/issues/6982)（WS1.6+1.7）已在队列中，其中 WS1.5 涉及安全敏感的 sealed evidence minting 整合（PROPOSAL §12.1a）

**重大功能落地：**

- [#6930](https://github.com/nearai/ironclaw/issues/6930) 注册托管 MCP 服务器（已合并）— 支持无认证/Bearer/OAuth 自动检测，与扩展安装、激活、调用、卸载全生命周期集成；[#6979](https://github.com/nearai/ironclaw/issues/6979) 同步将 north-star 文档与之一致化

**Bug 修复与清理：**

- [#6908](https://github.com/nearai/ironclaw/issues/6908) Admin 用户列表分页修复（已合并）— cursor 感知无限查询，关闭 [#6903](https://github.com/nearai/ironclaw/issues/6903)
- [#4022](https://github.com/nearai/ironclaw/issues/4022) HTTP 响应错误改为可恢复（已合并）— 修复 [#4014](https://github.com/nearai/ironclaw/issues/4014) 引入的运行中止回归
- [#3952](https://github.com/nearai/ironclaw/issues/3952) LocalFilesystem TOCTOU 加固（已合并）— openat2/O_NOFOLLOW fd 相对路径遍历，强化多租户 FS 安全边界
- [#3942](https://github.com/nearai/ironclaw/issues/3942) PilotAllowlist 字符串匹配改为 serde 枚举（已合并）
- [#6932](https://github.com/nearai/ironclaw/issues/6932) 批量依赖升级（已合并）

值得注意的是，[#4022](https://github.com/nearai/ironclaw/issues/4022)、[#3942](https://github.com/nearai/ironclaw/issues/3942)、[#3952](https://github.com/nearai/ironclaw/issues/3952) 三个自 5 月起积压的 PR 今日集中合并，长期评审积压得到有效清理，是项目健康度提升的积极信号。

## 4. 社区热点

- **[#6963](https://github.com/nearai/ironclaw/issues/6963)（5 评论，今日最高）** — 跟踪 [#6946](https://github.com/nearai/ironclaw/issues/6946)（WS10）未重写的 8 个 path-keyed CI/开发门禁缺陷（6 静默 + 2 响亮）。由该 PR 的 review 评论升级为独立 tracking issue。背后诉求：CI 基础设施的重构覆盖面不足，reviewer 要求"缺陷必须被显式跟踪，而非埋没在 checklist 行里"。
- **[#6940](https://github.com/nearai/ironclaw/issues/6940)（2 评论）** — IronHub 技能 CTA 在所有技能上全量 404。用户表示"不确定该属性归谁所有"，反映产品模块所有权边界模糊，是运营流程问题而非单纯代码缺陷。
- **[#6900](https://github.com/nearai/ironclaw/issues/6900)（1 评论，P0）** — 共享频道默认主题绑定将所有用户折叠进操作员内存命名空间，构成跨用户内存泄漏。评论量不高但安全等级最高，应视为最紧迫的社区关注点。
- **[#6939](https://github.com/nearai/ironclaw/issues/6939)（1 评论）** — 用户明确表达"不愿从零开始"的迁移阻力，是典型的产品采纳门槛信号。

## 5. Bug 与稳定性

按严重程度排列：

**P0 / 安全：**
- [#6900](https://github.com/nearai/ironclaw/issues/6900) 共享频道默认主体绑定导致跨用户内存泄漏 — 无身份路由的共享会话（如多人群 Slack 频道）流量会落入操作员命名空间。**尚无 fix PR，需立即响应**。

**性能 / 可靠性：**
- [#6974](https://github.com/nearai/ironclaw/issues/6974) libSQL `thread_store_writes` 性能病态 — 工具密集型压力场景 p95 达 37–135s（#6696 回归）。已从 [#6973](https://github.com/nearai/ironclaw/issues/6973) 拆分；#6973 的修复虽让 libSQL 套件首次完整跑完，但工具密集场景仍远超 2.5s p95 目标。修复 PR [#6973](https://github.com/nearai/ironclaw/issues/6973) 尚在评审。
- [#6976](https://github.com/nearai/ironclaw/issues/6976) Linux 服务安装未启用 user lingering — 无头服务器/VM 场景下 systemd 用户单元不可靠，影响无人值守运行。

**CI 结构性缺陷：**
- [#6978](https://github.com/nearai/ironclaw/issues/6978) `reborn-tests.yml` 的 workflow_dispatch 运行必然导致 Tests (Reborn) roll-up 失败 — `critical-mutation` 的 `if:` 排除 dispatch 事件，但 roll-up 又要求其必须运行。零真实用例失败仍整体红，CI 可信度受损。

**功能缺陷（p2）：**
- [#6972](https://github.com/nearai/ironclaw/issues/6972) 新账号邮箱认证不可用 — 建号后无法登录，属入门阻断问题。
- [#6940](https://github.com/nearai/ironclaw/issues/6940) IronHub 技能 CTA 全量 404。
- [#6866](https://github.com/nearai/ironclaw/issues/6866) 所有用户共享同一 home 目录、workspaces 互相可见 — 隐私/安全双重重度问题，自 7/29 报告以来 0 条维护者回复。

**已修复：**
- [#6903](https://github.com/nearai/ironclaw/issues/6903) Admin 用户列表超 100 人无法翻页 — 已关闭（PR [#6908](https://github.com/nearai/ironclaw/issues/6908)）
- [#4022](https://github.com/nearai/ironclaw/issues/4022) HTTP 响应错误被错误归类为 run-aborting 输出契约违规 — 已合并修复

## 6. 功能请求与路线图信号

- **[#6939](https://github.com/nearai/ironclaw/issues/6939) 遗留代理迁移工具** — 将 Hermes/Openclaw 的配置与记忆迁移至 IronClaw。用户"不愿从零开始"的抵触情绪明显，这是降低切换成本、扩大用户基数的关键候选功能。
- **[#6941](https://github.com/nearai/ironclaw/issues/6941) 技能史诗：模型可发现、选择、使用技能** — 从 [#6565](https://github.com/nearai/ironclaw/issues/6565) 拆分的"可度量"子集，落地 PR [#6938](https://github.com/nearai/ironclaw/issues/6938)（模型选择技能，而非关键词打分器）已开，"宿主停止替模型做选择"是明确的产品方向信号。
- **[#6971](https://github.com/nearai/ironclaw/issues/6971) "Tools" vs "Extensions" 术语统一** — 用户质疑当前"tools/channels 是 extensions 类型"的模型是否持续，产品定义需对外给出明确答复。
- **[#6578](https://github.com/nearai/ironclaw/issues/6578) Admin 托管 Agents 作为 UserId Subjects**（p1/安全史诗）— 租户管理员为非人主体建号而不破坏私有用户隔离，是多租户产品演进的重要方向，但目前推进缓慢。
- **[#6831](https://github.com/nearai/ironclaw/issues/6831) 标准化消息框架**（16 个核心操作 + 规范错误码体系）与 **[#6780](https://github.com/nearai/ironclaw/issues/6780) IronHub 深链注册/安装网关** 两个 XL 功能 PR 均在待评审状态，是 Reborn 生态能力的关键拼图。

## 7. 用户反馈摘要

- **技能 CTA 全军覆没**（[#6940](https://github.com/nearai/ironclaw/issues/6940)）："每个技能的 CTA 都指向 404，且不确定归属方" — 除代码修复外，也暴露产品所有权不清晰。
- **品牌口径混乱**（[#6854](https://github.com/nearai/ironclaw/issues/6854)）：扩展页描述仍使用 "Reborn" 措辞，与对外统一的 "Ironclaw 1.0" 不一致。
- **隐私担忧**（[#6866](https://github.com/nearai/ironclaw/issues/6866)，来自 tobias.holenstein）："滚动工作区时，home 目录对所有用户相同，所有人都能看到其他人的 workspaces" — 用户对多租户数据隔离缺乏信心，且该 Issue 已 3 天无维护者回复，需尽快安抚。
- **注册即被卡在门外**（[#6972](https://github.com/nearai/ironclaw/issues/6972)）：新建账号后无法完成认证登录，属体验漏斗最前端故障。
- **品牌与术语双重困惑**（[#6971](https://github.com/nearai/ironclaw/issues/6971)）：用户对 "Tools" 与 "Extensions" 的层级关系表示疑问，并追问未来模型是否保持。

## 8. 待处理积压

- **[#5598](https://github.com/nearai/ironclaw/issues/5598) 发布 PR 积压 29 天**（7/3 创建）— 阻塞 `ironclaw_common` 0.4.2→0.5.0 与 `ironclaw_skills` 0.3.0→0.4.0 两个含破坏性变更的版本发布。发布流程长期停滞，建议优先评审。
- **[#6900](https://github.com/nearai/ironclaw/issues/6900) P0 跨用户内存泄漏** — 报告 2 天，仅 1 条评论，无 assignee、无 fix PR，安全漏洞需立即介入。
- **[#6578](https://github.com/nearai/ironclaw/issues/6578) Admin 托管 Agent 史诗** — 自 7/23 起 9 天无实质推进，p1/安全级别值得排期。
- **[#6831](https://github.com/nearai/ironclaw/issues/6831) / [#6780](https://github.com/nearai/ironclaw/issues/6780)** — 两个 XL 功能 PR 自 7/28 起待评审，与 #6941 技能史诗和 #6930 MCP 生态相互依赖。
- **[#6866](https://github.com/nearai/ironclaw/issues/6866) home 目录共享隐私问题** / **[#6854](https://github.com/nearai/ironclaw/issues/6854) Reborn 品牌残留** — 分别 0/1 条评论，用户反馈长期无维护者回应，影响社区信任度。

---

**总体评估**：项目处于架构重构的高产期，WS1 浪潮七天完成三轮合并、五个工作流在途，吞吐健康；同时 P0 安全漏洞、CI 结构性缺陷和发布流程停滞构成三大短期风险，建议按「安全 > CI 可信度 > 发布流程」的优先级排定响应顺序。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-01

## 1. 今日速览

过去 24 小时项目无新版本发布，Issue 侧无新增报告（4 条均为 stale 自动关闭），PR 侧保持活跃（12 条更新，其中 11 条已合并/关闭，1 条待合并）。主要开发力量集中在 OpenClaw 子系统的稳定性与性能修复，特别是 DeepSeek 长会话缓存命中率、工具协议隔离等核心链路问题。整体活跃度评估为 **中高**，项目处于稳定迭代期，维护者响应及时，健康状况良好。

---

## 3. 项目进展

过去 24 小时合并/关闭的 PR 中，**OpenClaw 核心链路的稳定性修复** 是本阶段最关键的推进：

- **[#2415 fix(openclaw): drop aggregate cap in live tool-result prompt projection](https://github.com/netease-youdao/LobsterAI/pull/2415)**（已合并）
  修复了实时工具结果 prompt 投影中 `aggregateMaxCharsOverride` 固定上限导致已缓存历史被反复重写、DeepSeek 长会话缓存命中率从 ~100% 暴跌至 ~57% 的问题。该修复为后续长会话场景的性能恢复奠定了基础。

- **[#2413 fix(openclaw): keep live prompt tool-result history byte-stable across turns](https://github.com/netease-youdao/LobsterAI/pull/2413)**（已合并）
  与 #2415 同源的缓存稳定性修复，确保已发送的历史内容保持字节级稳定，避免前缀缓存失效。

- **[#2414 fix(cowork): prevent BTW tool protocol leakage](https://github.com/netease-youdao/LobsterAI/pull/2414)**（已合并）
  从侧聊结果中清理 provider 工具调用标记，并在侧问需要工具时返回稳定引导，同时通过 OpenClaw 网关保留错误元数据。该修复提升了多轮对话中协议层的健壮性。

- **[#2417 fix(sites): add copy success feedback](https://github.com/netease-youdao/LobsterAI/pull/2417)**（已合并）
  复用会话复制的图标与交互模式，为站点 URL 和分享码增加复制成功反馈，属小型 UX 改进。

- **[#2416 Release/2026.7.31](https://github.com/netease-youdao/LobsterAI/pull/2416)**（已合并）
  7 月 31 日的发布分支 PR，合并了当日多项 OpenClaw 修复，说明项目正准备或已发布一个新迭代。

> 综合来看，项目在 24 小时内完成了从缓存性能到协议隔离的多项关键修复，并为下一版本发布了准备。开发节奏紧凑，核心质量持续加固。

---

## 4. 社区热点

今日无新开 Issue，讨论热度集中在 4 条因超过 60 天未活跃而被自动关闭的 stale Issue 上（每条均有 2 条评论）：

- **[#1311 表格内容换行展示带原始标签；长文本截断后加 hover 展示全文](https://github.com/netease-youdao/LobsterAI/issues/1311)** — 用户对表格渲染中原始标签暴露和长文本查看体验提出改进建议。
- **[#1314 功能增强：支持拖拽调整侧边栏宽度](https://github.com/netease-youdao/LobsterAI/issues/1314)** — 固定 240px 侧边栏无法适配不同屏幕与使用习惯。
- **[#1317 功能增强：侧边栏按钮显示键盘快捷键 kbd 提示](https://github.com/netease-youdao/LobsterAI/issues/1317)** — 快捷键存在但界面不可见，新用户发现成本高。
- **[#1319 功能增强：会话列表添加骨架屏加载状态](https://github.com/netease-youdao/LobsterAI/issues/1319)** — 启动时会话列表先闪现“暂无历史记录”，再加载真实数据，造成误解。

**分析**：这批 stale Issue 集中反映了用户对 **前端交互细节与可发现性** 的持续诉求。侧边栏拖拽、快捷键可视化、骨架屏、表格悬浮展示全文——虽非核心功能，但直接影响日常使用的舒适度与效率。值得注意的是，其中 #1314、#1317、#1319 均已存在对应实现 PR（#1315、#1318、#1320），说明团队已将这些反馈纳入开发并完成实现，本次关闭属于正常的积压清理。

---

## 5. Bug 与稳定性

今日报告的 Bug 较少，主要通过 PR 合并完成修复，按严重程度排列如下：

| 严重程度 | 问题描述 | 状态 | 链接 |
|---------|---------|------|------|
| 🔴 高（性能/缓存） | DeepSeek 长会话缓存命中率从 ~100% 跌至 ~57%，原因是实时 prompt 投影重新应用固定 aggregate 上限，导致已缓存历史被重写 | ✅ 已修复（#2415 + #2413） | [PR #2415](https://github.com/netease-youdao/LobsterAI/pull/2415) / [PR #2413](https://github.com/netease-youdao/LobsterAI/pull/2413) |
| 🟠 中（协议/安全） | 侧聊结果中 BTW 工具协议泄漏（provider 工具调用标记被透出） | ✅ 已修复（#2414） | [PR #2414](https://github.com/netease-youdao/LobsterAI/pull/2414) |
| 🟡 低（UI） | 切换设置页签后，记忆编辑器/模型连接测试弹窗仍以全屏遮罩残留，导致界面看似只读 | ✅ 已修复（此前 PR #1321） | [PR #1321](https://github.com/netease-youdao/LobsterAI/pull/1321) |

未发现新的崩溃级 Bug 或回归报告。稳定性整体可控。

---

## 6. 功能请求与路线图信号

今日无新增功能请求，以下既有请求中释放了路线图信号：

- **UI/UX 体验优化**（#1314、#1317、#1319）——虽然已经 stale 关闭，但对应的功能实现 PR（#1315 拖拽侧边栏、#1318 kbd 快捷键提示、#1320 骨架屏）均已存在，预计这些功能将成为近期版本的前端改进点。若尚未合并，可能在后续小版本中随 UI 优化一并放出。
- **Antigravity OAuth 集成**（[PR #172](https://github.com/netease-youdao/LobsterAI/pull/172)）——覆盖 OAuth 子系统、SQLite 持久化、OpenAI 兼容代理适配，虽已标记 stale，但未关闭，仍属于长期路线图中的接入能力方向。

> 信号：项目当前路线图以 **核心链路稳定性** 为主（OpenClaw 缓存、协议隔离），同时 **前端体验微优化** 已有代码实现待释放。

---

## 7. 用户反馈摘要

从近 24 小时关闭的 Issue 及其评论中，可以提炼出以下真实用户痛点与使用场景：

- **表格渲染体验欠佳**（#1311）：用户在使用表格时发现换行内容会暴露原始 HTML 标签，同时长文本截断后缺少悬停查看全文的能力，影响数据查阅效率。
- **侧边栏灵活性不足**（#1314）：小屏用户侧边栏占用过多空间，大屏用户难以扩展查看会话标题；标题过长时只能截断显示，用户无法判断内容。
- **快捷键不可发现**（#1317）：用户知道有快捷键，但在界面上找不到任何提示，只能进入设置页查看，发现成本高，尤其对新用户不友好。
- **启动期空状态误导**（#1319）：应用初始化期间会话列表显示“暂无历史记录”，用户误以为数据丢失；骨架屏需求背后是“加载中”与“空状态”区分不清的体验问题。

> 总结：用户对 LobsterAI 的使用已进入精细化阶段，反馈集中在“信息密度”与“状态可视化”上，说明产品已跨越功能可用性门槛，开始打磨细节体验。

---

## 8. 待处理积压

- **[#2234 [OPEN] fix(openclaw): cron yield descendant finalization](https://github.com/netease-youdao/LobsterAI/pull/2234)** ⚠️ 重点关注
  创建于 2026-06-30，当前仍处于打开状态且标记 stale。该 PR 修复 cron 场景下 `sessions_yield` 后子 agent 完成事件无法驱动父 agent 继续执行的关键逻辑问题，涉及并行/串行三种场景。长期未合并，建议维护者评估是否需要拆分或补充测试。

- **[#172 [STALE] feat(oauth): add Antigravity OAuth integration](https://github.com/netease-youdao/LobsterAI/pull/172)** ⚠️
  创建于 2026-02-27，已 stale 但未关闭。这是较大的功能 PR，包含 OAuth 子系统与多级适配，长期未合入可能因代码冲突而失效。建议维护者明确其是否仍纳入路线图，或主动关闭避免积压。

- **4 个 stale Issue 对应 PR 确认**（#1315、#1318、#1320、#1321）——建议核对其实装状态，确认在下一个版本中是否包含这些功能，避免用户重复反馈。

---

*数据源：[LobsterAI · GitHub](https://github.com/netease-youdao/LobsterAI) ｜ 报告时间：2026-08-01*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Moltis 项目动态日报 — 2026-08-01

### 1. 今日速览

项目今日活跃度中等偏高：过去 24 小时内有 2 条 Issue 更新（1 新开 / 1 关闭）、7 条 PR 更新（6 条处于开放状态），核心活动集中于安全加固与功能实现两个方向。安全方面，两条由外部贡献者提交的修复 PR（#1179、#1180）直指节点配对验证与路径穿越漏洞，表明项目在安全审查上开始获得外部信任并获得实质性补强。功能方面，Markdown 导出相关 Issue #1131 随 PR #1176 一并关闭，标志着该功能正式落地；同时多条新功能 PR（Nostr 群聊、zvec 内存后端、可观测性基础设施）仍在推进。值得关注的是，当前 PR 合并率偏低（1/7），维护者需加快审查节奏以避免贡献积压。


### 2. 版本发布

今日无新版本发布，无更新内容可说明。


### 3. 项目进展

今日重要的合并/关闭项为 **PR #1176**（feat(web): add Markdown copy and session export），该 PR 关闭了此前悬置约一个半月的功能请求 Issue #1131，为前端补充了两项能力：保留原始 Markdown 格式的回复复制，以及加载完整分页历史的会话级“另存为 Markdown”导出。该合入意味着用户长期期待的“将对话导出为 Markdown”已从请求变为正式功能。

此外，两条开放但更新于今日的安全修复 PR 虽未合并，但值得重点关注：

- **PR #1179** — fix(gateway): verify node pairing signatures：将节点配对验证绑定到服务器签发的待处理请求，防止调用方自行提供密钥或挑战。作者在描述中表示“我希望使用 Moltis，但想先把几个安全修复合入”，这直接反映了外部用户在实际采用时对安全基础的信赖要求。
- **PR #1180** — fix(security): harden model and zip paths：修复恶意 zip 或 HuggingFace 仓库导致任意文件写入的安全漏洞，覆盖 `clawhub.rs` 解压路径校验缺失等两类绕过方式，可防止配置文件、凭据被覆盖进而导致代码执行。

整体来看，项目在功能交付（Markdown 导出）与安全基础（配对验证、路径防护）两条线上均有明确进展，且安全修复来自独立外部贡献，说明项目已开始吸引以安全为前提的真实使用方参与。


### 4. 社区热点

今日社区讨论热度整体偏低，绝大多数 PR 与 Issue 的评论数均为 0。相对值得关注的动态如下：

- **[Issue #1181**（[链接](https://github.com/moltis-org/moltis/issues/1181)）— [bug] Issue with GPT 5.6 Luna**：为新提交的 Bug 报告，反馈在使用 GPT 5.6 Luna 模型时出现问题。虽然尚无评论，但 “GPT 5.6 Luna” 对应新模型版本的兼容性问题，往往容易引发社区共鸣，存在潜在讨论热度。

- **[PR #1168**（[链接](https://github.com/moltis-org/moltis/pull/1168)）— feat(nostr): add NIP-29 group chat support for Buzz channels**：作者 @penso 将 Moltis 的 Nostr 支持扩展至 Block 旗下开源工作区 Buzz 的 NIP-29 群聊协议，属于面向实际产品集成的前沿功能，有一定生态关注度。

从当前数据看，项目社区仍处于早期采用阶段，讨论密度不高，但外部贡献者正围绕安全、主流 AI 模型兼容性和真实生产环境集成提交实质性补丁。


### 5. Bug 与稳定性

今日新增 Bug 报告 1 项：

- **[Issue #1181**（[链接](https://github.com/moltis-org/moltis/issues/1181)）— [bug] Issue with GPT 5.6 Luna**：高优先级兼容性问题。报告者已确认使用最新版本并预先搜索过现有 Issue，反馈与 GPT 5.6 Luna 模型相关，目前无评论、无对应修复 PR。严重度暂无法确认，但新模型兼容性问题通常会影响使用最新模型的核心用户，建议优先复现排查。

此外，今日更新的两条安全修复 PR（#1179、#1180）虽非直接 Bug 报告，但性质上有助于消除潜在高危“任意文件写入 → 代码执行”类的安全漏洞，建议一并纳入下一个补丁版本。


### 6. 功能请求与路线图信号

今日无新增功能请求，但关闭/活跃的功能相关 PR 透露了明确的路线图信号：

- **Markdown 导出（已落地）**：Issue #1131 关闭 + PR #1176 合入，标志着该功能的开发完成，后续版本将包含此能力。
- **Nostr 群聊支持**（PR #1168）：为 Buzz 通道增加 NIP-29 群聊支持，使 Moltis 能接入 Block 生态的 AI 协作空间，属于对外部工具链的实质扩展。
- **zvec 向量数据库内存后端**（PR #1158）：作者以“vibe-coded”方式实验性地增加 Zvec + redb 内存后端，并默认集成在 `full` feature 中。该 PR 持续活跃已半月，若被采纳，将为用户提供更多记忆存储选择。
- **可观测性与反馈基础设施**（PR #1174）：增加后端无关的代理插桩、Langfuse v4 导出、OTLP 后端与终端用户反馈收集，属于为生产化部署铺路的平台级能力。

综合判断，v0.x 后续版本可能围绕“导出/互操作（Markdown、Nostr）”“部署可观测性”和“安全加固”三条主线推进。


### 7. 用户反馈摘要

- **安全顾虑是采用的前提**：PR #1179 作者明确表示“I'd like to use Moltis, but I've got a couple of security fixes I'd like to get in before doing so.” 这显示外部开发者对 Moltis 有兴趣，但当前安全基础（配对验证、路径防护）尚未完全满足其生产使用门槛。该反馈是“有保留的兴趣”，对项目是积极信号，也提示安全加固是获得早期用户信任的关键。

- **功能需求的实际落地**：Issue #1131（Markdown 导出）获得 1 个 👍，虽然反馈量不大，但从提出到合并经历了约 6 周时间，说明用户确实存在导出完整对话记录用于分享或沉淀的需求。

其余 PR/Issue 暂无更多用户评论可供提炼。


### 8. 待处理积压

以下开放 PR 已超过数日且尚未合并，建议维护者关注，避免贡献者等待过久：

- **PR #1158**（[链接](https://github.com/moltis-org/moltis/pull/1158)）— feat(memory): add zvec vector database memory backend：创建于 7 月 17 日，已持续 15 天，作为实验性质的后端实现，需要维护者评估是否纳入主线或给出调整意见。
- **PR #1170**（[链接](https://github.com/moltis-org/moltis/pull/1170)）— fix(channels): gate /sh and privileged tools behind a per-account operators list：创建于 7 月 26 日，涉及权限边界的安全修复（分离访问许可与操作员权限），安全相关 PR 不宜长期积压。
- **PR #1174**（[链接](https://github.com/moltis-org/moltis/pull/1174)）— Add instrumentation and feedback collection infrastructure：创建于 7 月 27 日，功能范围较大（插桩 + Langfuse + OTLP + 反馈），建议拆分评审或明确合入时间表。

此外，Issue #1131 此前从创建到关闭历时约 6 周，反映了 issue 响应周期的现状；建议对开放性 PR 设定更明确的审查时限，以维持外部贡献者的积极性。

---

**报告总结**：Moltis 今日处在“功能落地 + 安全补强”并行推进的窗口期。外部贡献者开始以真实部署需求为前提提交安全修复，显示出项目正从早期原型向可信基础设施演进。维护者当前的首要任务是尽快审查并合入 #1179 和 #1180 两条安全修复，同时为已停留两周的 #1158 和潜在扩权的 #1170 给出明确反馈，避免积压挫伤贡献动力。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-08-01）

## 今日速览

- 过去 24 小时项目保持高活跃度：18 条 Issue 更新（新开/活跃 13、关闭 5），43 条 PR 更新（待合并 30、已合并/关闭 13）。
- 社区贡献者参与度明显，多个 first-time-contributor PR 提交，覆盖 shell 崩溃、agent.json 损坏、subagent schema 等关键问题。
- 稳定性是当前焦点：shell 命令超时/UI 冻结、agentscope 兼容性、内存压缩丢失早期事件等问题均有对应修复 PR 进入管线。
- 暂无新版本发布；已关闭的 PR 主要集中在音频转写恢复、会话完整性、Auto-Memory 冲刷等方向。
- 风险点：30 个 PR 待合并，可能形成 review 积压；另有 WeChat 定时推送静默失败等严重问题尚无修复 PR。

## 项目进展

今日可见的已合并/关闭 PR 中，关键进展包括：

- **修复多会话 UI 数据完整性问题**：[#6602 Fix/issue 6558 session integrity](https://github.com/agentscope-ai/QwenPaw/pull/6602)  
  保留 Coding/Chat 模式切换时的 in-flight 流，通过共享 TaskTracker 重连缓冲事件，修复切换模式/会话丢消息、回复重渲染、指令漂移等问题。

- **恢复频道音频消息转写**：[#6573 fix(audio): restore transcription for channel audio messages](https://github.com/agentscope-ai/QwenPaw/pull/6573)  
  修复 AgentScope 2.0 迁移后飞书等频道音频消息静默转写失败的问题，对应 Issue #6544。

- **修复 Auto-Memory 在上下文压缩前未冲刷**：[#6592 fix(memory): flush Auto-Memory before Scroll context eviction](https://github.com/agentscope-ai/QwenPaw/pull/6592)  
  解决早期会话在生成每日记忆前被滚动压缩导致永久丢失的问题，对应 Issue #6555。

- **修复 read_file 数字字符串行号解析**：[#6606 fix(read_file): accept numeric string line ranges](https://github.com/agentscope-ai/QwenPaw/pull/6606)

- **完善 ReMe 记忆机制文档**：[#6604 docs(memory): explain ReMe self-evolving knowledge base](https://github.com/agentscope-ai/QwenPaw/pull/6604)

整体来看，项目正在集中修复 2.x 迁移后遗留的稳定性与数据一致性问题，同时有多个功能型 PR 在途。

## 社区热点

- [#6537 [Bug] Skill tags disappear on restart (regression of #3270)](https://github.com/agentscope-ai/QwenPaw/issues/6537) — 10 条评论  
  最受关注的 Issue。用户报告 Skill Pool 标签在重启后消失，即使已正确保存到 `skill_pool/skill.json`，仍在 manifest 对账时丢失。社区对该回归的持久化一致性非常敏感。

- [#6601 [Bug] QwenPaw 不报空响应错误](https://github.com/agentscope-ai/QwenPaw/issues/6601) — 5 条评论  
  长会话在接近上下文窗口上限时，模型空响应但 QwenPaw 不报错，导致会话彻底失去响应。用户认为这是框架层问题，希望有明确的错误上报机制。

- [#6588 [Bug] spawn_subagent single-task mode is unusable because batch is exposed as required](https://github.com/agentscope-ai/QwenPaw/issues/6588) — 4 条评论  
  模型面工具 schema 将 `batch` 强制标记为必填，导致单任务子代理无法创建。社区已提交修复 PR [#6609](https://github.com/agentscope-ai/QwenPaw/pull/6609)。

- [#6083 Desktop 窗口增加工作区产出物快捷访问按钮](https://github.com/agentscope-ai/QwenPaw/issues/6083) — 4 条评论  
  用户希望桌面端一键直达工作区文件，避免手动去资源管理器找 `~/.qwenpaw/workspaces/<agent_id>/`。

- [#6160 可以为 QwenPaw 配备独立 Python 运行环境吗？](https://github.com/agentscope-ai/QwenPaw/issues/6160) — 4 条评论  
  Windows 用户因系统未装 Python 而无法执行生成脚本，期望内置/复用后端解释器。

社区诉求集中表现为：**本地数据持久化可靠性、长会话可用性、桌面端易用性**。

## Bug 与稳定性

按严重程度排列：

### 严重 / 致命

- **[#6612 QwenPaw 2.0.1 与 agentscope 2.0.4.post1 不兼容](https://github.com/agentscope-ai/QwenPaw/issues/6612)**  
  proactive 子系统因 `Msg.content` 类型变化崩溃，且工具权限出现 deadlock。已有修复 PR [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615)。

- **[#6608 Long-running shell commands bypass shell_command_timeout 并无限阻塞飞书会话](https://github.com/agentscope-ai/QwenPaw/issues/6608)**  
  长命令绕过超时机制，阻塞会话 1.5 小时；取消后留下孤儿子进程，且缺少 per-channel 总超时。已有修复 PR [#6610](https://github.com/agentscope-ai/QwenPaw/pull/6610)。

- **[#6520 agent.json systematic corruption](https://github.com/agentscope-ai/QwenPaw/issues/6520)**  
  BOM 头、字符串缺失引号、中文双重编码等 20+ 字段系统性损坏，导致系统完全不可用。已有修复 PR [#6528](https://github.com/agentscope-ai/QwenPaw/pull/6528)。

- **[#6614 微信 cron 定时推送从未真正送达](https://github.com/agentscope-ai/QwenPaw/issues/6614)**  
  任务显示 `success`，但微信侧返回 `ret=-2 context_token 失效`，属静默失败，已消耗约 44M tokens。**暂无修复 PR**。

### 高

- **[#6589 execute_shell_command 大量输出导致 UI 冻结](https://github.com/agentscope-ai/QwenPaw/issues/6589)**  
  数万行 stdout 一次性渲染，阻塞 UI 主线程。可由 [#6610](https://github.com/agentscope-ai/QwenPaw/pull/6610) 一并修复。

- **[#6601 QwenPaw 不报空响应错误](https://github.com/agentscope-ai/QwenPaw/issues/6601)**  
  长会话模型空响应时无任何错误提示，用户无法感知会话已失效。**暂无修复 PR**。

- **[#6537 Skill tags disappear on restart](https://github.com/agentscope-ai/QwenPaw/issues/6537)**  
  标签写入成功但重启后丢失，属于 #3270 的回归。**暂无修复 PR**。

### 中

- **[#6588 spawn_subagent 单任务模式不可用](https://github.com/agentscope-ai/QwenPaw/issues/6588)**  
  `batch` 被错误设为必填，导致单任务子代理无法创建。修复 PR [#6609](https://github.com/agentscope-ai/QwenPaw/pull/6609) 已提交。

- **[#6512 execute_shell_command 大输出截断](https://github.com/agentscope-ai/QwenPaw/issues/6512)**  
  超过约 30KB 的输出会被截断，甚至触发 `Internal error`。建议自动写文件或流式读取。暂无独立修复 PR。

### 已关闭 / 已修复

- [#6555 Dream/memory 压缩丢失早期会话事件](https://github.com/agentscope-ai/QwenPaw/issues/6555) — 已关闭，对应 [#6592](https://github.com/agentscope-ai/QwenPaw/pull/6592) 合并/关闭，另有 [#6564](https://github.com/agentscope-ai/QwenPaw/pull/6564) 仍待审。
- [#6544 飞书音频消息静默转写失败](https://github.com/agentscope-ai/QwenPaw/issues/6544) — 已关闭，对应 [#6573](https://github.com/agentscope-ai/QwenPaw/pull/6573)。
- [#6558 多会话 UI 数据完整性问题](https://github.com/agentscope-ai/QwenPaw/issues/6558) — 已关闭，对应 [#6602](https://github.com/agentscope-ai/QwenPaw/pull/6602)。
- [#6529 ACP new_session 缺少 models 字段](https://github.com/agentscope-ai/QwenPaw/issues/6529) — 已关闭。
- [#6549 Desktop 输入框被遮挡](https://github.com/agentscope-ai/QwenPaw/issues/6549) — 已关闭。

## 功能请求与路线图信号

用户侧功能需求：

- **[#6083 Desktop 工作区产出物快捷访问](https://github.com/agentscope-ai/QwenPaw/issues/6083)**  
  一键打开工作区文件夹或下载最近产出物，尤其对非技术用户重要。

- **[#6160 独立 Python 运行环境](https://github.com/agentscope-ai/QwenPaw/issues/6160)**  
  内置 Python 或复用后端解释器，解决 Windows/Conda 环境下脚本无法执行的问题。

- **[#6260 结果呈现方式提升](https://github.com/agentscope-ai/QwenPaw/issues/6260)**  
  思考过程和工具调用应可折叠，突出最终交付结果，而非让过程淹没结果。

- **[#6512 Shell 大输出自动写文件/流式读取](https://github.com/agentscope-ai/QwenPaw/issues/6512)**  
  适合与命令执行超时/UI 冻结问题合并解决。

- **[#6587 桌面应用名去掉 “Desktop” 后缀](https://github.com/agentscope-ai/QwenPaw/issues/6587)**  
  低成本命名优化。

路线图信号（PR 侧）：

- **[#6607 桌面端全局快捷键悬浮快速输入窗口](https://github.com/agentscope-ai/QwenPaw/pull/6607)** — 类 Doubao 风格的 quick-input window。
- **[#6302 统一 provider 发现、模型元数据、路由与 Agent 控制](https://github.com/agentscope-ai/QwenPaw/pull/6302)** — 架构级重构，影响面较大。
- **[#6526 NVIDIA NIM provider 支持](https://github.com/agentscope-ai/QwenPaw/pull/6526)** — 扩展模型服务生态。
- **[#6550 CI AI review bot 增强](https://github.com/agentscope-ai/QwenPaw/pull/6550)** — 工程效率方向。
- **[#6548 官网博客与 Hero 点击追踪](https://github.com/agentscope-ai/QwenPaw/pull/6548)** — 社区/官网运营侧投入。

下一版本很可能继续围绕**桌面端体验、provider 生态扩展、以及 Shell/内存可靠性**三个方向推进。

## 用户反馈摘要

- **“结果被过程淹没”**（[#6260](https://github.com/agentscope-ai/QwenPaw/issues/6260)）：用户关心 Agent 交付的结果，而非中间的命令执行和依赖构建；满屏思考过程反而干扰阅读。
- **“没有 Python 环境就用不了”**（[#6160](https://github.com/agentscope-ai/QwenPaw/issues/6160)）：桌面版直接调用系统 Python，对普通用户不友好，期望开箱即用。
- **“显示 success 但什么都没收到”**（[#6614](https://github.com/agentscope-ai/QwenPaw/issues/6614)）：微信定时推送静默失败，用户对“假成功”状态极为不满，且已造成大量 token 浪费。
- **“长会话突然彻底失去响应”**（[#6601](https://github.com/agentscope-ai/QwenPaw/issues/6601)）：没有错误提示，用户无法判断是模型问题还是框架问题。
- **“频繁切换模式/会话导致丢消息”**（[#6558](https://github.com/agentscope-ai/QwenPaw/issues/6558)）：严重影响日常多会话工作流，所幸修复 PR [#6602](https://github.com/agentscope-ai/QwenPaw/pull/6602) 已关闭。
- **“访问工作区文件太绕”**（[#6083](https://github.com/agentscope-ai/QwenPaw/issues/6083)）：用户希望桌面内一键直达，而不是打开资源管理器手动导航。
- **“输入框被遮挡，发送按钮要滚动才能看到”**（[#6549](https://github.com/agentscope-ai/QwenPaw/issues/6549)）：Windows 高 DPI 缩放下 UI 布局有问题，已关闭。
- **“‘Desktop’ 后缀多此一举”**（[#6587](https://github.com/agentscope-ai/QwenPaw/issues/6587)）：用户对命名细节也有期待。

## 待处理积压

以下 Issue/PR 已经历较长时间仍未合并或未获得维护者明确响应，建议优先关注：

- **[#6083 Desktop 工作区产出物快捷访问](https://github.com/agentscope-ai/QwenPaw/issues/6083)** — 自 07-14 开启，已 18 天，4 条评论，无关联 PR。
- **[#6160 独立 Python 运行环境](https://github.com/agentscope-ai/QwenPaw/issues/6160)** — 自 07-16 开启，已 16 天，4 条评论，无关联 PR。
- **[#6260 结果呈现方式提升](https://github.com/agentscope-ai/QwenPaw/issues/6260)** — 自 07-19 开启，已 13 天，有 1 👍，无关联 PR。
- **[#6512 Shell 大输出截断](https://github.com/agentscope-ai/QwenPaw/issues/6512)** — 自 07-28 开启，有明确复现场景，无独立修复 PR。
- **[PR #6203 Windows tasklist 探针修复](https://github.com/agentscope-ai/QwenPaw/pull/6203)** — 自 07-16 提交，first-time-contributor，已 Under Review 16 天。
- **[PR #6302 Provider 统一架构](https://github.com/agentscope-ai/QwenPaw/pull/6302)** — 自 07-21 提交，已 11 天，涉及核心架构，建议尽快安排 review。

</details>

</div>
