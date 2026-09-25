---
title: "OpenClaw 生态日报"
published: 2026-09-25
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-25

> Issues: 8 | PRs: 50 | 覆盖项目: 11 个 | 生成时间: 2026-09-25 00:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 2026-09-25

> 数据来源：github.com/openclaw/openclaw 公开仓库  
> 统计区间：2026-09-24 ~ 2026-09-25

## 1. 今日速览

过去 24 小时 OpenClaw 社区活跃度处于高位：8 条 Issue 更新全部为开放状态，无 Issue 关闭；50 条 PR 更新中 48 条仍在待合并/待评审状态，仅 2 条关闭/合并。今日无新版本发布，也没有用户可见的大型功能正式落地。Issue 侧最突出的是 Windows 平台稳定性问题（#142847 P1 原生 exec 参数被破坏、#157639 CP866 输出乱码回归），同时多个功能请求进入 `needs-product-decision` / `needs-maintainer-review` 决策阶段。PR 侧主要看点是一批 P0/P1 修复和桌面音频能力栈已进入可评审状态，但维护者合并速度明显低于提交速度。

## 2. 版本发布

今日无新版本发布（Latest Releases 为空）。

## 3. 项目进展

今日 50 条 PR 更新中，有 2 条进入合并/关闭状态。可见的关闭项为：

- [#157685 refactor: reuse prepared fixtures in slow core tests](https://github.com/openclaw/openclaw/pull/157685)  
  关闭状态，属于测试基建优化：将慢速核心测试中反复执行的 Git 仓库准备、SQLite owners、workers 等 fixture 逻辑改为复用，不改产品行为，目的是缩短 PR 验证时间。

另外一条合并/关闭的 PR 未进入今日 Top 30 展示列表，无法进一步核实具体内容。

今日虽然没有用户侧功能合并，但以下高价值 PR 已处于 `👀 ready for maintainer look` 状态，是下一批最可能合并的修复：

- [#157730 [P0] fix: prevent Doctor timeouts while restoring the Gateway](https://github.com/openclaw/openclaw/pull/157730)  
  修复 Doctor 在恢复 Gateway 时反复复制、同步同一状态库导致的超时问题。
- [#157422 [P1] fix(gateway): avoid blocking requests during worker inference persistence](https://github.com/openclaw/openclaw/pull/157422)  
  将推理持久化移入现有 database worker，避免阻塞 Gateway 事件循环。
- [#156940 [P1] fix(codex): prevent stale native sessions from mutating successors](https://github.com/openclaw/openclaw/pull/156940)  
  修复 Codex 陈旧原生 session 在会话被替换后仍可能污染 app-server 或 bindings 的问题。
- [#157666 [P1] perf(state): avoid agent database rescans after writer eviction](https://github.com/openclaw/openclaw/pull/157666)  
  减少会话写入时等待完整数据库完整性扫描的次数。

整体来看，项目当前处于“高密度修复 PR 待评审”阶段；如果上述 P0/P1 修复顺利合入，下一版本预计会显著改善 Gateway 稳定性、Windows 兼容性和 Codex 会话安全。

## 4. 社区热点

今日 Issue 讨论热度集中在两个较老但仍开放的问题上，各有 2 条评论：

- [#142847 [P1] Windows node host mangles quoted arguments in native exec](https://github.com/openclaw/openclaw/issues/142847)  
  讨论集中在 Windows 节点主机上 `runCommand` 未设置 `windowsVerbatimArguments`，导致带引号参数被错误拆分。作者报告在 OpenClaw 2026.9.1、2026.9.2 及当前 `main` 上均可复现。该 Issue 已持续 16 天但仍为 P1，社区关注度高。

- [#151637 [P3] Control UI command palette search status shifts results and footer by 52 px](https://github.com/openclaw/openclaw/issues/151637)  
  用户反馈命令面板搜索时，结果区和 footer 会先下移 52px，请求结束后再跳回，影响输入连贯性。虽然只是 P3 UI 问题，但触发路径非常日常，因此讨论活跃。

此外，#157639（Windows CP866 输出仍乱码）是最新出现的 Windows 兼容性回归，虽然评论数较少，但与 #142847 一并构成今日社区对 Windows 平台体验的核心不满信号。

## 5. Bug 与稳定性

按严重程度排列今日值得关注的缺陷：

| Issue / PR | 严重程度 | 描述 | Fix PR 状态 |
|---|---|---|---|
| [#142847 Windows node host mangles quoted arguments in native exec](https://github.com/openclaw/openclaw/issues/142847) | P1 | Windows 节点上原生 exec 命令的引号参数被破坏；`runCommand` 未设置 `windowsVerbatimArguments`；`main` 分支仍存在。 | 今日可见 PR 列表中未出现直接 fix PR，需继续跟进 |
| [#157639 Windows CP866 cmd output still mojibakes](https://github.com/openclaw/openclaw/issues/157639) | 未标级，实际影响高 | `chcp` 报告代码页 866（俄语 OEM）时，`cmd.exe` 输出仍乱码；此前 #72393 的 Windows 控制台代码页修复未覆盖 866。 | 刚报告，暂无 fix PR |
| [#157243 Doctor 恢复 Gateway 超时](https://github.com/openclaw/openclaw/issues/157243)（由 PR #157730 关联） | P0 | Doctor 在恢复 Gateway 时因重复 fresh admission 检查反复复制/同步状态数据库而超时。 | 已有 [#157730](https://github.com/openclaw/openclaw/pull/157730)，`👀 ready for maintainer look` |
| [#142890 skill_workshop update validator 对 CJK 长字符串校验失败](https://github.com/openclaw/openclaw/issues/142890) | P2 | `support_files[].content` 大于 5KB 且包含中文、代码块、特殊字符时，validator 收到嵌套对象而非字符串，报 `must be string`。 | 等待 `needs-info` 反馈，暂无 fix PR |
| [#151637 Control UI 命令面板搜索时布局跳动 52px](https://github.com/openclaw/openclaw/issues/151637) | P3 | 搜索 pending 状态导致结果区和 footer 位移，输入框本身不动但整体布局跳动。 | 暂无 fix PR |

稳定性总结：今日重点不是新 Bug 数量，而是 Windows 平台两个问题叠加：P1 引号参数破坏 + CP866 乱码回归。前者影响的是 Windows 作为节点主机时的“原生执行”能力，后者影响俄语区用户读取命令输出。二者都值得在下一版本前给出明确修复计划。

## 6. 功能请求与路线图信号

- [#142918 SearXNG 插件应支持认证实例（apiKey / Bearer / custom headers）](https://github.com/openclaw/openclaw/issues/142918)  
  当前官方 SearXNG 插件只能配置 `baseUrl` 等基本项，无法附加凭据。这对自托管用户是刚性需求；该 Issue 带 `needs-security-review`、`needs-product-decision` 和 `needs-maintainer-review` 标签，说明官方已经意识到需要产品决策和安全评审，可能进入后续版本。

- [#142879 后台拖放文件创建“预备会话”](https://github.com/openclaw/openclaw/issues/142879)  
  由 maintainer 提出，P3，等待产品决策。设想是拖文件到 Control UI 空白背景后，agent 读取材料、命名 session，并询问用户如何继续。这是一个偏“proactive agent”的产品方向信号。

- [#151306 多账号 channel 恢复 per-account inbound debounce](https://github.com/openclaw/openclaw/issues/151306)  
  用户在 #113174 合并后失去按账号设置 WhatsApp debounce 的能力，导致同一 channel 下不同 agent 无法差异化处理消息。该需求带 `needs-product-decision`，说明这是“配置收敛”和“灵活性”之间的路线图冲突。

- [#157736 Android Overview 节点状态应显示为 “8 of 9 online”](https://github.com/openclaw/openclaw/issues/157736)  
  移动端 UI 简洁性改进，技术实现简单，属于低门槛 enhancement，可能被快速纳入。

- 桌面音频能力栈是今日最明确的 PR 路线图信号：  
  - [#157718 feat(desktop): advertise optional audio capability](https://github.com/openclaw/openclaw/pull/157718)（1/7）  
  - [#157720 feat(desktop): isolate managed Linux application audio](https://github.com/openclaw/openclaw/pull/157720)（2/7）  
  - [#157723 feat(desktop): advertise current managed desktop audio](https://github.com/openclaw/openclaw/pull/157723)（4/7）  
  这说明 OpenClaw 正在系统性地推进桌面端音频采集/隔离能力，未来可能用于 agent 对桌面应用音频的感知。

- [#149880 feat(gemini): add google-interactions api backend](https://github.com/openclaw/openclaw/pull/149880)  
  为 Gemini Interactions 增加显式 opt-in API backend，不改变现有 GenerateContent 默认行为，但扩展文本、图像、推理和工具调用能力。该 PR 带 `security-sensitive-changed` 标签，等待 maintainer 评审。

## 7. 用户反馈摘要

从今日 Issue 和讨论中可以提炼出以下真实用户场景与痛点：

- **Windows 节点用户仍是最大的“不满意”群体**：#142847 显示用户试图在 Windows 11 节点上执行带引号命令，但参数被破坏；#157639 显示俄语区 Windows 用户即使升级到 2026.9.5，`cmd.exe` 在 CP866 下依然乱码。这些不是边缘 case，而是 Windows 作为受管节点的基础可用性问题。

- **非英语内容创作者被校验逻辑误伤**：#142890 中，CJK 字符 + 代码块 + 长字符串的 `support_files[].content` 被 validator 当成对象处理，导致 `skill_workshop update` 失败。这对中文、日文、韩文用户尤其不友好。

- **自托管用户希望安全接入私有搜索服务**：#142918 中用户明确需要给 SearXNG 配置 apiKey、Bearer 或自定义 header，否则无法使用需要认证的实例。这说明 OpenClaw 插件生态需要更强的“私有服务集成”能力。

- **多账号运营者对“配置收敛”有保留意见**：#151306 中用户指出，将 WhatsApp 多账号 debounce 统一到全局 `byChannel` 后，无法满足不同账号“相反方向”的 debounce 需求。这是“简化配置”与“多租户灵活性”的典型冲突。

- **UI 细粒度体验问题会显著影响日常使用**：#151637 的 52px 跳动虽然只是 P3，但属于“每次搜索都会发生”的高频摩擦，说明用户对 Control UI 的交互细节期待在提升。

## 8. 待处理积压

以下 Issue/PR 长期未关闭或未合入，建议维护者优先关注：

- [#142847 [P1] Windows node host mangles quoted arguments in native exec](https://github.com/openclaw/openclaw/issues/142847)  
  已开放 16 天，2026-09-25 仍有更新，P1 且 `main` 上仍可复现，属于阻塞级 Windows 兼容性问题。

- [#142890 [P2] skill_workshop update validator 对 CJK 长字符串失败](https://github.com/openclaw/openclaw/issues/142890)  
  已开放超过两周，仍处于 `needs-info`，需要维护者澄清 validator 预期行为。

- [#142918 [P2] SearXNG 插件应支持认证实例](https://github.com/openclaw/openclaw/issues/142918)  
  已开放超过两周，带着 `needs-maintainer-review`、`needs-product-decision`、`needs-security-review` 三个标签，说明已经进入流程但尚未明确负责人或排期。

- [#142879 [P3] Background file drops create prepared sessions for later](https://github.com/openclaw/openclaw/issues/142879)  
  maintainer 提出的 feature，但 9 月 9 日创建后一直处于 `needs-product-decision`，可能需要更明确的产品负责人。

- [#91271 [P2] fix(agents): include requester identity in sessions_send context](https://github.com/openclaw/openclaw/pull/91271)  
  创建于 2026-06-07，至今仍开放，标签为 `needs-real-behavior-proof` 和 `clawsweeper:human-review`。这是一个跨 3 个月以上的老 PR，修复的是会话发送请求者身份缺失问题，需要维护者决定是继续完善还是关闭。

---

**健康度总结**：OpenClaw 目前社区提交热情高、Issue 质量较好，但合并吞吐量偏低，48 条 PR 待处理意味着维护带宽可能成为瓶颈。最需要优先处理的并非新功能，而是 Windows 平台的两个 Bug，以及一批已处于 `ready for maintainer look` 状态的 P0/P1 修复 PR。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期**：2026-09-25  
**分析范围**：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、CoPaw 等 8 个活跃项目（TinyClaw / ZeptoClaw / EasyClaw 当日无活动）

---

## 1. 生态全景

个人 AI 助手开源生态正处于 **“高密度功能迭代 + 稳定性补课”** 的并行阶段。头部项目（OpenClaw、NanoBot、Zeroclaw、CoPaw）日均 PR 更新量均在 20 条以上，功能探索仍非常活跃，但同时大量 PR 积压待评审，维护带宽普遍成为瓶颈。跨平台兼容性（Windows、ARM）和上下文管理（压缩死锁、token 预算）成为多项目共同面临的稳定性短板。值得关注的是，**桌面端音频感知、实时语音对话、运行时插件化**等下一代交互能力已进入实质开发阶段，生态正从“纯文本对话工具”向“多模态自主智能体平台”演进。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（新开/活跃 | 关闭） | PR 更新（待合并 | 合并/关闭） | Release | 综合健康度 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 8（8 | 0） | 50（48 | 2） | 无 | ⚠️ 提交热度高，合并吞吐不足，P0/P1 修复待评审 |
| **NanoBot** | 14（8 | 6） | 39（13 | 26） | 无 | ✅ 高活跃且合并效率良好，但存在 1 个高危未决（自动压缩死锁） |
| **Zeroclaw** | 11（9 | 2） | 50（38 | 12） | 无 | ✅ 冲刺期，2 个 P1 快速闭环，CI 优化密集落地 |
| **PicoClaw** | 2（1 | 1） | 8（8 | 0） | 无 | ⚠️ 活跃度中等，3 个功能 PR 已 stale，维护响应偏慢 |
| **NanoClaw** | 2（2 | 0） | 14（10 | 4） | 无 | ✅ 活跃度中等偏高，但贡献集中单一作者，存在 31 天未合并 PR |
| **IronClaw** | 1（1 | 0） | 1（1 | 0） | `v1.4.1-rc.2` | ✅ 发布节奏稳健，但社区活跃度偏低，自动化 PR 积压 27 天 |
| **LobsterAI** | 18（2 | 16 stale 关闭） | 50（4 | 46） | 无 | ⚠️ 代码合入频繁（多为分支回 main），但严重性能 Bug 与安全报告长期悬置 |
| **CoPaw** | 27（16 | 11） | 23（17 | 6） | 无 | ✅ 高活跃，UI 回归 24h 内响应，但上下文管理类问题累积超百天 |

---

## 3. OpenClaw 在生态中的定位

**核心参照地位明确，是生态中 PR 提交量最大、技术栈最完整的项目。**

- **优势**：50 条 PR 更新中有 48 条待评审，说明贡献者活跃度远高于同类项目；技术路线覆盖 Gateway、Codex 会话安全、桌面音频能力栈等深水区，系统复杂度在生态中最接近“生产级自主智能体平台”。PR 质量标签体系（P0/P1、`ready for maintainer look`）显示出成熟的工程管理规范。
- **技术路线差异**：强调**原生会话安全**（Codex stale session 隔离）、**Gateway 状态恢复**（Doctor 机制）、**桌面端音频采集/隔离**（7 个 PR 的系统性推进），这是其他项目尚未涉足的方向。
- **明显短板**：**Windows 平台兼容性是当前最大痛点**——P1 引号参数破坏（#142847）+ CP866 乱码（#157639）两个问题直接冲击 Windows 节点用户的基础可用性。同时，合并吞吐量（48:2 的待评审/合并比）使其处于“高密度提交、低密度合入”状态，长期可能挫伤外部贡献者积极性。
- **社区规模对照**：日均 50 条 PR 更新远超 NanoBot（39）、CoPaw（23）等竞品，但合并效率低于 NanoBot（26 条合并）和 Zeroclaw（12 条合并），生态号召力强、落地效率有待提升。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 | 热度判断 |
|---|---|---|---|
| **上下文管理与压缩安全** | NanoBot、CoPaw、OpenClaw | 自动压缩死锁（NanoBot #5849，无 token 预算保护）；压缩丢失 tool_call 结构（CoPaw #5856，已 79 天）；活动窗口被整体丢弃（CoPaw #7836）；agent database 完整性扫描开销（OpenClaw #157666） | 🔥🔥🔥 多项目共有的最严重稳定性隐患，直接决定长会话可靠性 |
| **跨平台/异构硬件兼容** | OpenClaw、NanoClaw、Zeroclaw | Windows 原生 exec 参数破坏与 CP866 乱码（OpenClaw）；ARM64 主机 Iron Control `exec format error`（NanoClaw #3888）；macOS 测试断言差异（Zeroclaw #11080） | 🔥🔥🔥 随 AI 硬件多元化（DGX Spark、ARM Mac）愈发突出 |
| **渠道消息处理正确性** | NanoBot、CoPaw、Zeroclaw、PicoClaw | 飞书会话卡死（CoPaw #7534）；Feishu checkpoint 消息污染（NanoBot #5903）；WhatsApp suppress_voice（Zeroclaw）；多行输入被拆分（PicoClaw #3391） | 🔥🔥 渠道适配已进入“长尾正确性”打磨阶段 |
| **网关/认证/安全策略** | NanoClaw、OpenClaw、Zeroclaw | Iron Proxy per-host 自动审批（NanoClaw #3881）；SearXNG 认证实例支持（OpenClaw #142918）；RPC 认证（Zeroclaw #10259）；多个安全报告被 stale 关闭（LobsterAI #2176/#2181/#2286-2288） | 🔥🔥 自托管/企业场景的刚性需求 |
| **运行时插件化与可扩展架构** | Zeroclaw、OpenClaw、LobsterAI | 编译期 feature 迁移到运行时插件（Zeroclaw #8850/#11081）；MCP 工具 schema 兼容（CoPaw #7959）；“OpenClaw 化”编程工具联动（LobsterAI #2239） | 🔥🔥 生态演进的核心方向，Zeroclaw 走在前列 |
| **UI/UX 国际化与移动端** | CoPaw、NanoBot、OpenClaw、LobsterAI | 官方移动端 App（CoPaw #7976，用户已自建客户端）；WebUI 本地化（NanoBot #5367 已修复）；Android 节点状态显示（OpenClaw #157736）；侧边栏广告/布局优化（LobsterAI #2374/#2762） | 🔥 移动端缺位已成为多项目的共同用户痛点 |
| **CI/发布流程自动化** | Zeroclaw、IronClaw、NanoClaw、OpenClaw | CodeQL 条件执行、缓存键隔离（Zeroclaw）；代码知识图谱自动刷新积压 27 天（IronClaw #7988）；CI 时序 flake（NanoClaw #3887/#3892）；慢测试 fixture 复用（OpenClaw #157685） | 🔥 项目规模扩大后的共性工程债 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 全功能自主智能体（Gateway 恢复、Codex 会话安全、桌面音频） | 技术型个人用户 / 开发者 | 复杂 Gateway + Doctor 恢复机制，强调桌面端深度集成，架构复杂度最高 |
| **NanoBot** | 多渠道消息机器人（Matrix、Discord、Feishu、微信） + 轻量 WebUI | 社区/团队运维者、自托管用户 | 渠道适配广，合并节奏快，WebUI 与 agent 循环解耦 |
| **Zeroclaw** | 运行时与网关（Rust 基础）、SOP 自动化、插件系统 | 对性能与安全要求高的开发者 | **Rust + WASM 插件**路线，SOP 可编程工作流，插件化走在最前沿 |
| **PicoClaw** | 移动端 TUI 优先的轻量客户端 | 移动端用户 | 依赖批量更新为主，功能开发节奏较慢，定位轻量 |
| **NanoClaw** | OpenCode/Claude 生态的 Iron Proxy 网关 + CLI | 开发者工具链用户 | 网关审批模型 + 多 agent 身份管理，集成原生 agent SDK |
| **IronClaw** | 办公文档问答 / OCR 场景，Google 生态集成 | 企业办公用户 | 发布候选驱动，质量监控自动化（daily failure taxonomy），迭代保守 |
| **LobsterAI** | 桌面 IDE / 编程助手形态，OpenClaw 兼容层 + UI | 中文开发者，编程场景 | 兼容 OpenClaw 扩展生态，自研 UI（Cowork 模式），多分支回 main |
| **CoPaw** | 企业级多渠道会话（企业微信、飞书） + Hub 多租户 | 企业客户、团队协作场景 | QwenPaw 衍生，侧重渠道稳定性与上下文管理，移动端需求迫切 |

---

## 6. 社区热度与成熟度分层

**第一梯队：快速迭代期（高频提交 + 功能探索 + 存在稳定性欠账）**

- **OpenClaw**：提交量最大，功能探索最深（桌面音频），但合并吞吐低，Windows 兼容性是硬伤。
- **NanoBot**：迭代效率最高（26 条 PR 合并），功能覆盖面广，需要尽快解决自动压缩死锁（#5849）。
- **CoPaw**：响应速度极快（UI 回归 24h 内修复），新功能 PR 储备充足（语音、终端、持久化记录），但上下文管理类问题历史包袱重。
- **Zeroclaw**：冲刺期特征明显，Bug 闭环速度快，插件系统 XL PR 若合入将拉开代差。

**第二梯队：质量巩固期（发布节奏稳健 / 维护性修补为主）**

- **IronClaw**：处于 RC 候选迭代期，自动化质量监控机制健全，社区交互较低但发布可信度高。
- **LobsterAI**：合并量大但多为分支回主干的整合工作，严重性能问题（#2230，60M vs 67K tokens）与安全报告未闭环，需警惕 stale 机制掩盖真实风险。
- **NanoClaw**：目标聚焦 Iron Proxy 体验，修复质量高，但贡献集中在单一作者，存在 bus factor 风险。

**第三梯队：维护迟滞期**

- **PicoClaw**：功能 PR 长期 stale，Dependabot 依赖更新占主导，社区提交的修复（如 deltachat 配置校验）缺乏维护者回应。

---

## 7. 值得关注的趋势信号

**① 上下文管理将从“被动压缩”走向“主动预算治理”**
NanoBot 的压缩死锁（无 token 预算保护）、CoPaw 的结构化信息丢失（tool_call 转纯文本）表明，当前各项目的上下文压缩机制都缺乏系统性安全边界。预计下一阶段将出现 **token 预算感知的压缩调度**、**结构化消息保留策略** 以及 OpenClaw 正在探索的 **writer eviction 与完整性扫描解耦**。对开发者而言，在设计长会话 agent 时，应将“压缩失败恢复路径”作为一等公民纳入架构。

**② ARM/异构硬件支持成为 AI 原生应用的分水岭**
NanoClaw 的 arm64 `exec format error` 并非孤例——随着 NVIDIA DGX Spark、ARM Mac 等设备进入 AI 工作流，**镜像多架构发布** 和 **运行时平台抽象** 将是从“能用”到“好用”的关键。OpenClaw 的 Windows 问题同样属于此范畴：生态头部项目若不能解决平台兼容，可能将用户推向更轻量的竞品。

**③ 插件化架构成为生态卡位战的核心**
Zeroclaw 的 WASM 插件大 PR（#11081，host-mediated sockets、TLS、持久化状态）一旦落地，将使其成为唯一具备 **运行时动态插件能力** 的项目。OpenClaw 的 SearXNG 认证实例需求、LobsterAI 的 MCP/OpenCode 联动建议，本质上都是用户对“可扩展集成”的迫切需求。**“一切皆插件”不再只是口号，而是多租户、企业部署、私有服务集成的必然路径。**

**④ 移动端缺位催生“用户自制”现象**
CoPaw 用户自建非官方 Android 客户端（#7976），PicoClaw 的多行输入 Bug 直接出现在移动 TUI 场景——这表明移动端已不是“锦上添花”，而是影响用户留存的核心场景。开源项目若长期不提供官方移动体验，用户会自行解决，进而形成碎片化的第三方生态，增大官方后续整合成本。

**⑤ 安全报告被 stale 自动关闭是生态的潜在系统性风险**
LobsterAI 今日有 5 个安全漏洞报告（任意文件读取、SSRF 弱化、未认证 token 代理等）被 stale 机制批量关闭。这反映部分项目 **维护带宽已不足以覆盖安全响应 SLA**。对依赖这些项目的开发者而言，选择项目时需要评估其安全修复的确定性，而非仅看提交活跃度。

**⑥ CI 效率与发布可重复性成为工程团队的共同投资点**
Zeroclaw 的 5 个 CI 优化 PR、NanoClaw 的时序 flake 修复、IronClaw 的知识图谱刷新积压、OpenClaw 的测试 fixture 复用，共同指向一个信号：**项目规模扩张后，工程基础设施的自动化程度直接决定迭代上限**。`release-note` 强制校验（NanoClaw #3886，91 个 PR 中 59 个缺 release note）则是发布流程成熟度的缩影。

---

*报告基于 2026-09-25 各项目 GitHub 公开数据生成。数据源：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、CoPaw、TinyClaw、ZeptoClaw、EasyClaw 公开仓库。*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报（2026-09-25）

## 今日速览

- 过去 24 小时项目更新活跃：共更新 14 条 Issue，其中 8 条新开/活跃、6 条关闭；共更新 39 条 PR，其中 13 条待合并、26 条已合并/关闭。
- 今日无新版本发布，但合并/关闭的 PR 覆盖面较广，包括 WebUI 本地化与性能、Matrix 回复语义、Discord 状态清理、Agent 后台异常上报、Anthropic 扩展思考等。
- 社区关注点集中在升级回归、自动压缩死锁、长任务期间消息排队、以及 OpenAI Responses 协议兼容等方向。
- 综合 Issue 关闭速度、PR 合并数量和功能推进密度，项目当前处于 **高活跃、整体健康** 的状态，但存在一个高危未决问题需要尽快跟进。

## 版本发布

今日无新版本发布。

## 项目进展

今日有多项重要 PR 合并/关闭，代表项目在前端体验、渠道正确性和 Agent 稳定性上均有推进：

- **WebUI 本地化**：[#5367 feat(webui): localize agent activity](https://github.com/HKUDS/nanobot/pull/5367) 已合并/关闭，将前端 Agent 活动文本按用户所选语言本地化，补上了 [#5366](https://github.com/HKUDS/nanobot/issues/5366) 的需求。
- **WebUI 性能与路由**：
  - [#5905 fix(webui): keep global page URLs clean and defer chat mounting](https://github.com/HKUDS/nanobot/pull/5905)
  - [#5904 perf(webui): improve chat refresh and mobile interactions](https://github.com/HKUDS/nanobot/pull/5904)
- **Agent 后台任务可靠性**：
  - [#5724 fix(agent): retrieve background task exceptions and log unexpected failures](https://github.com/HKUDS/nanobot/pull/5724)
  - [#5431 fix(agent): report background task failures](https://github.com/HKUDS/nanobot/pull/5431)
- **Matrix 渠道回复语义**：[#5292 fix(matrix): reply to the room-level user event that started the turn](https://github.com/HKUDS/nanobot/pull/5292) 已合并/关闭，避免回复变成无关顶层消息。
- **Discord 状态清理**：[#5807 fix(discord): clean up reaction state on stop](https://github.com/HKUDS/nanobot/pull/5807) 修复了渠道停止后反应任务残留的问题。
- **Anthropic 扩展思考**：[#1387 feat: add Anthropic extended thinking support alongside reasoning_effort](https://github.com/HKUDS/nanobot/pull/1387) 在长时间后进入合并/关闭流程，为 Anthropic 模型增加 extended thinking 支持。

整体来看，今日合入内容覆盖 **前端体验、渠道行为、Agent 可观测性、模型能力兼容** 四条主线，项目迭代节奏良好。

## 社区热点

今日 Issue/PR 的评论数整体不高，评论最多的 Issue 也仅有 1 条评论，但讨论内容指向性很强：

- [#5881 [bug, regression] 0.3.5 版本要求 _nanobot 必须搬到 workspace 外](https://github.com/HKUDS/nanobot/issues/5881)  
  用户升级后遇到实例无法启动的问题，属于直接影响使用的回归类反馈，容易引发广泛共鸣。

- [#5849 Auto-compaction deadlock: summarize_transcript has no token-budget guard](https://github.com/HKUDS/nanobot/issues/5849)  
  自动压缩路径没有 token 预算保护，历史一旦超限将“永远无法恢复”，是高风险稳定性问题，评论区关注度较高。

- [#5896 feat(providers): support OpenAI Responses API for opencode_go](https://github.com/HKUDS/nanobot/issues/5896)  
  OpenCode Go 的 muse-spark contributor 模型在 `/chat/completions` 返回 500，属供应商兼容问题，已有对应 PR [#5906](https://github.com/HKUDS/nanobot/pull/5906) 在推进。

- [#5366 WebUI: localize Agent activity text using the user's selected language](https://github.com/HKUDS/nanobot/issues/5366)  
  该需求已关闭，但体现了用户对“界面语言与 Agent 活动语言一致性”的明确诉求。

## Bug 与稳定性

按严重程度列出今日出现的 Bug 与稳定性问题：

### 高危

- [#5849 Auto-compaction deadlock: summarize_transcript has no token-budget guard](https://github.com/HKUDS/nanobot/issues/5849)  
  自动压缩会把整个会话历史发送给摘要模型，没有 token 预算保护；一旦历史超过输入预算，压缩将永远无法恢复。当前仍为 OPEN，**未见对应 fix PR**，建议优先处理。

### 中危

- [#5881 [regression] 0.3.5 要求 _nanobot 必须搬到 workspace 外](https://github.com/HKUDS/nanobot/issues/5881)  
  升级后新校验规则导致某些实例拒绝启动。该 Issue 今日已关闭，但未在本次 PR 列表中看到对应修复，需要关注是否只是关闭而非解决。

- [#5898 [bug] gpt-6 model series through GitHub Copilot](https://github.com/HKUDS/nanobot/issues/5898)  
  v0.3.5 通过 GitHub Copilot 使用 OpenAI 6 系列模型时报 provider 错误，当前仍为 OPEN，未见 fix PR。

- [#5903 Feishu: hidden session-checkpoint marker is delivered to the user](https://github.com/HKUDS/nanobot/issues/5903)  
  Feishu 渠道在闲置自动压缩后，将内部 checkpoint 标记“Continue the active task...”当作普通消息发给用户，属于渠道行为污染，当前 OPEN。

### 已修复 / 已有修复 PR

- [#5429 AgentLoop does not retrieve exceptions from background tasks](https://github.com/HKUDS/nanobot/issues/5429)  
  已关闭，对应修复 PR 为 [#5724](https://github.com/HKUDS/nanobot/pull/5724)、[#5431](https://github.com/HKUDS/nanobot/pull/5431)。

- [#5806 Discord runtime leaves reaction tasks alive after stop](https://github.com/HKUDS/nanobot/issues/5806)  
  已关闭，对应修复 PR 为 [#5807](https://github.com/HKUDS/nanobot/pull/5807)、[#5864](https://github.com/HKUDS/nanobot/pull/5864)。

- [#5834 fix(providers): handle `response.reasoning_text.*` events in the SSE Responses consumer](https://github.com/HKUDS/nanobot/pull/5834)  
  针对 xAI Grok / OpenAI Codex 的 SSE 推理事件丢失问题，已有 PR，仍待合并。

## 功能请求与路线图信号

今日新功能请求集中在 **WebUI 交互细节** 和 **provider 协议兼容** 两个方向：

- [#5909 feat(api): server-side message queue ("waiting room") while agent is busy](https://github.com/HKUDS/nanobot/issues/5909)  
  用户希望在 agent 忙碌时能够排队发送消息，而不是被丢弃或行为异常。目前无直接 PR，可能是后续并发/会话管理的重要方向。

- [#5908 feat(webui): show live tokens/sec while streaming a reply](https://github.com/HKUDS/nanobot/issues/5908)  
  流式生成时希望看到实时速度，判断模型是否卡住。属轻量 UX 增强，暂无 PR。

- [#5910 feat(webui): persist composer draft per conversation](https://github.com/HKUDS/nanobot/issues/5910)  
  切换会话时草稿丢失，属于高频生活质量问题，暂无 PR。

- [#5900 [enhancement] Silent context compaction and reduce WeChat channel polling log verbosity](https://github.com/HKUDS/nanobot/issues/5900)  
  用户希望闲置自动压缩静默执行、不向渠道发送通知。已有相关 PR：[#5780 fix: stop sending context compaction notifications](https://github.com/HKUDS/nanobot/pull/5780)，若被接受很可能进入下一版本。

- [#5896 feat(providers): support OpenAI Responses API for opencode_go](https://github.com/HKUDS/nanobot/issues/5896)  
  已由 [#5906 feat(providers): route OpenCode Go muse-spark contributor models through Responses](https://github.com/HKUDS/nanobot/pull/5906) 提出实现，是最接近纳入下一版本的 provider 功能。

- [#5524 Feature: WebUI 会话结束通知铃声](https://github.com/HKUDS/nanobot/issues/5524)  
  该 Issue 已关闭，但反映用户对“长任务结束需要可见/可听提示”的需求，后续可能以其他形式回归。

## 用户反馈摘要

从今日 Issue 的描述和评论中，可以提炼出以下真实用户痛点：

- **升级阻碍**：0.3.5 强制要求 `_nanobot` 放在 workspace 外，用户认为“同一个实例 workspace 为啥要把 _nanobot 单独放出去”，对新增校验规则感到困惑和不满。（[#5881](https://github.com/HKUDS/nanobot/issues/5881)）

- **历史越长越容易永久卡死**：自动压缩没有 token 预算保护，一旦历史超过输入预算，压缩永远无法恢复，用户对此表达了较强的稳定性担忧。（[#5849](https://github.com/HKUDS/nanobot/issues/5849)）

- **压缩通知打扰**：用户设置了 `idleCompactAfterMinutes: 15` 后，微信/WhatsApp 会收到压缩通知，希望后台自动压缩保持静默。（[#5900](https://github.com/HKUDS/nanobot/issues/5900)）

- **长任务期间不能排队发消息**：agent 正在执行浏览器自动化等长任务时，用户无法插队发送后续消息，消息可能被丢弃或行为不可预测。（[#5909](https://github.com/HKUDS/nanobot/issues/5909)）

- **流式输出缺乏可视化反馈**：用户希望看到实时 tokens/sec，以判断模型是否正常工作，而不是只能干等。（[#5908](https://github.com/HKUDS/nanobot/issues/5908)）

- **本地化不彻底**：WebUI 已切换语言，但 Agent 活动文本仍为英文，体验割裂；该问题已通过 [#5367](https://github.com/HKUDS/nanobot/pull/5367) 得到处理。（[#5366](https://github.com/HKUDS/nanobot/issues/5366)）

## 待处理积压

以下 Issue/PR 值得维护者优先关注：

- [#5849 Auto-compaction deadlock](https://github.com/HKUDS/nanobot/issues/5849)  
  **高危**，可能造成会话永远无法恢复，当前无 fix PR。

- [#5257 fix(agent): bound sustained-goal continuation when the turn goes idle](https://github.com/HKUDS/nanobot/pull/5257)  
  自 2026-08-05 开启，已超过 7 周未合并，涉及 agent 自动续跑和迭代预算问题。

- [#5260 fix(memory): ignore runtime files inside tracked workspace dirs](https://github.com/HKUDS/nanobot/pull/5260)  
  同样自 2026-08-05 开启，长期未合并，涉及 memory 目录与 workspace 文件列表的边界。

- [#5838 fix(api): route each session_id to its own chat](https://github.com/HKUDS/nanobot/pull/5838)  
  API 会话隔离问题，标有 `conflict`，可能需要 rebase 或解决冲突。

- [#5834 fix(providers): handle `response.reasoning_text.*` events in the SSE Responses consumer](https://github.com/HKUDS/nanobot/pull/5834)  
  影响 xAI Grok 与 OpenAI Codex 的推理内容展示，已 4 天未合并。

- [#5845 Add Opper as a built-in provider](https://github.com/HKUDS/nanobot/pull/5845)  
  新 provider 接入，涉及 registry、WebUI 和文档，等待 review。

---

**总结**：NanoBot 今日整体活跃度高，PR 合并效率良好，WebUI、渠道和 Agent 稳定性均有改进；但需要重点关注自动压缩死锁问题（#5849），并加速处理多个已开启数周的关键 PR。

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报 — 2026-09-25

## 1. 今日速览

过去 24 小时 Zeroclaw 开发活动保持高强度：共 50 条 PR 更新（12 条已合并/关闭，38 条待合并），11 条 Issue 更新（2 条已关闭）。工作重心集中在三条主线：**SOP 运行日志与自动化修复**、**CI/发布效率优化**、**运行时与网关稳定性加固**。两个 P1 级 Bug（#8559、#9805）均在今日关闭并已有对应修复 PR 合入，问题闭环速度较快。目前无新版本发布，项目处于 v0.9.0 发布前的密集冲刺阶段。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日关闭/合并的 PR（12 条）主要推进了以下方向：

### 3.1 网关稳定性：WebSocket 断开不再中断 Agent 任务
- **PR [#10538](https://github.com/zeroclaw-labs/zeroclaw/pull/10538)（合并）**：修复用户在 Web 仪表盘退出聊天窗口后 Agent 工作循环被取消的问题，对应关闭 [Issue #8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559)。该修复同时防止 #6514 热循环回归，是今日最重要的稳定性修复。

### 3.2 SOP 自动化闭环
- **PR [#11083](https://github.com/zeroclaw-labs/zeroclaw/pull/11083)（合并）**：修复 Webhook 启动的 SOP 在执行 `ExecuteStep` 首步时因无 agent 循环而永不执行的问题，对应关闭 [Issue #9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805)。

### 3.3 CI 与发布效率（对应 Tracker #10814）
今日批量合入 5 个 CI 优化 PR，均为小改动（size:XS），但显著改善发布流水线效率：

| PR | 改动内容 | 风险 |
|---|---|---|
| [#11063](https://github.com/zeroclaw-labs/zeroclaw/pull/11063) | CodeQL 扫描器固定 runner 标签，移除 `CI_USE_BLACKSMITH` 变量 | medium |
| [#11069](https://github.com/zeroclaw-labs/zeroclaw/pull/11069) | 为 Rust 矩阵任务设置区分缓存键，避免重复编译 | low |
| [#11073](https://github.com/zeroclaw-labs/zeroclaw/pull/11073) | CodeQL 仅在受影响的代码路径变更时运行 | medium |
| [#11070](https://github.com/zeroclaw-labs/zeroclaw/pull/11070) | 仅 release workflow 变更时跳过 Docker 源码构建矩阵 | medium |
| [#11064](https://github.com/zeroclaw-labs/zeroclaw/pull/11064) | Windows task-owner 恢复测试改为并行独立 job | low |

这些改动直接服务于 [Tracker #10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814)（发布效率与可重复发布），为 v0.8.5 后的下一次发布打基础。

### 3.4 整体评估
今日合入内容以 **Bug 修复 + CI 基础设施优化** 为主，没有新功能落地，但为后续大 PR（SOP 日志、RPC 认证、插件系统）的合并扫清障碍。

---

## 4. 社区热点

### 4.1 讨论最活跃的 Issues

| Issue | 评论数 | 主题 | 诉求分析 |
|---|---|---|---|
| [#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) | 8 | 统一能力目录与插件迁移路线图 | 社区核心关注从"集成视图 + WASM 插件视图"走向"单一能力目录"，"一切皆插件"是长期方向 |
| [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559)（已关闭） | 5 | Web 仪表盘退出导致 Agent 中断 | 用户对"后台任务不依赖前台页面"有明确需求，已修复 |
| [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) | 5 | 可选渠道/工具从编译期 feature 迁移到运行时插件 | 要求默认二进制更小、渠道/工具可动态安装，与 #6489 形成呼应 |
| [#10315](https://github.com/zeroclaw-labs/zeroclaw/issues/10315) | 5 | 浏览器 enrollment frontdoor 回归 | 在 #10142 拆分后需要重新设计安全的浏览器端注册入口 |

### 4.2 值得注意的 PR
- **PR [#11081](https://github.com/zeroclaw-labs/zeroclaw/pull/11081)（Open, size:XL）**：插件系统迎来大版本升级——host-mediated sockets、WebSocket、TLS profiles、持久化状态。这是 #8850 路线图的关键实施步骤。

### 4.3 诉求总结
社区讨论集中在**插件化架构落地**（#6489、#8850、#11081）、**浏览器端体验**（#8559、#10315）、**SOP 自动化可靠性**（#9805）三条主线上，与项目 v0.9.0 目标高度一致。

---

## 5. Bug 与稳定性

### 5.1 已关闭（今日修复）

| Issue | 严重度 | 问题描述 | 修复 PR |
|---|---|---|---|
| [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | S1 - workflow blocked | 退出 Web 聊天窗口导致 Agent 工作循环被中断 | [#10538](https://github.com/zeroclaw-labs/zeroclaw/pull/10538) 已合并 |
| [#9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805) | P1 | SOP auto 模式从 channel/cron 触发时永不执行，卡在 running 状态 | [#11083](https://github.com/zeroclaw-labs/zeroclaw/pull/11083) 已合并 |

### 5.2 待处理（有修复 PR 在途）

- **PR [#10836](https://github.com/zeroclaw-labs/zeroclaw/pull/10836)（Open, size:S）**：声明式 cron job 在 agent 间移动声明时，存储的 owner 未同步迁移，可能导致权限判断错误。
- **PR [#11057](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)（Open, size:S）**：WhatsApp Web 自动语音路径未检查 `SendMessage.suppress_voice`，导致已标记不播报的消息仍进入 TTS 队列。
- **PR [#11080](https://github.com/zeroclaw-labs/zeroclaw/pull/11080)（Open, size:XS）**：Hailo provider 的 connect-failure 测试在 macOS 上失败（超时 vs 连接失败的断言差异），属测试平台兼容性问题。

### 5.3 稳定性总评
今日无新报告的严重 Bug，两个历史 P1 均以修复闭环。系统稳定性处于健康状态。

---

## 6. 功能请求与路线图信号

### 6.1 正在实施中的路线图

| Issue | 标题 | 相关 PR | 状态 |
|---|---|---|---|
| [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) | 可选渠道/工具从编译期 feature 迁移到运行时插件 | [#11081](https://github.com/zeroclaw-labs/zeroclaw/pull/11081)（Open, XL） | 插件系统已在推进 |
| [#10315](https://github.com/zeroclaw-labs/zeroclaw/issues/10315) | 重新添加浏览器 enrollment frontdoor | [#11089](https://github.com/zeroclaw-labs/zeroclaw/pull/11089)（Open） | 支持 `?node=&code=` 链接预填 |
| [#10993](https://github.com/zeroclaw-labs/zeroclaw/issues/10993) | 完成公共运行时组合边界 | [#11090](https://github.com/zeroclaw-labs/zeroclaw/pull/11090)（Open, 依赖 #11092） | 等待 Core Team ADR-016 审批 |

### 6.2 可能进入下一版本的功能信号
- **插件系统能力扩展**（#11081）：sockets、WebSocket、TLS、持久化状态，将显著提升 WASM 插件可用性，大概率进入 v0.9.0。
- **运行时组合契约**（#11090/#11092）：将 `zeroclaw-runtime` 打造为可嵌入公共 API，是 #7432 Phase 2 的收尾工作。
- **OIDC/RPC 认证**（PR [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259)）：Stage 3 认证推进中，对应 #8289 里程碑。

### 6.3 值得注意的新文档贡献
- **PR [#11039](https://github.com/zeroclaw-labs/zeroclaw/pull/11039)**：新增 You.com MCP 搜索服务器示例（keyless tier），丰富 MCP 接入文档，来自新贡献者 @mouse-value-add。

---

## 7. 用户反馈摘要

### 7.1 明确痛点（来自 Issue 报告）

- **Web 仪表盘任务中断**（[#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559)）：用户指出"退出聊天窗口完全阻塞了在 Agent 工作时做其他事情"，期望 Agent 任务与前台页面解耦——已修复。
- **SOP 卡死**（[#9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805)）：用户发现 SOP 从 channel/cron 触发后永远停在 step 1，占用并发槽位，且 daemon 重启后依然存在——已修复。

### 7.2 使用场景与功能期望（来自贡献者 PR）

- **WhatsApp 格式优化**（[#11054](https://github.com/zeroclaw-labs/zeroclaw/pull/11054)）：用户希望 WhatsApp 正确渲染 Markdown 分隔线和 setext 标题，说明 Markdown 转换器在多渠道适配中的细节需求。
- **Voice 控制精细化**（[#11057](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)）：用户期望 `suppress_voice` 在 TTS 排队前生效，而不是发出去之后——语音功能的控制粒度仍需完善。

### 7.3 满意度信号
今日无明确不满/抱怨的 Issue 评论；两个 P1 均在一天内修复并关闭，用户侧反馈整体积极。

---

## 8. 待处理积压

以下为长期未合并或需维护者关注的事项：

| 项目 | 创建日期 | 标签 | 状态说明 | 关注理由 |
|---|---|---|---|---|
| [PR #10155](https://github.com/zeroclaw-labs/zeroclaw/pull/10155) | 2026-08-20 | size:XL, needs-author-action | Open，已超一个月 | SOP 运行日志和触发去重，是 SOP 可观测性的核心 PR，但疑似需要作者回应评审 |
| [PR #10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) | 2026-08-22 | size:XL, stacked | Open，依赖 Stage 2/3 | RPC 认证是 #8289 OIDC 里程碑的关键环节，堆叠结构可能拖慢合并节奏 |
| [PR #10133](https://github.com/zeroclaw-labs/zeroclaw/pull/10133) | 2026-08-19 | status:parking-lot | 已标记搁置 | 移除 30 个 panic 候选，对长期稳定性很重要，但可能因优先级被暂缓 |
| [Issue #6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) | 2026-05-06 | type:tracker | Open，持续更新 | 统一能力目录是核心方向，已跟踪近 5 个月，需要保持推进节奏 |
| [Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | 2026-06-09 | type:tracker | Open，持续更新 | runtime/gateway 交付地图，v0.8.6/v0.9.0 的源头，建议维护者按 #10993 的进度同步更新 |

---

> **日报总结**：Zeroclaw 今日呈现"冲刺期"特征——无发布、大量小步快跑的修复与基础设施优化、关键大 PR 待评审。项目健康度良好，2 个 P1 Bug 快速闭环，CI 效率优化为后续发布提速。下一观察窗口应关注 #11081（插件系统 XL PR）及 #11090/#11092（运行时契约）能否获得 Core Team 批准。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报 — 2026-09-25

## 1. 今日速览

过去 24 小时 PicoClaw 项目整体活跃度中等偏上，主要以**依赖批量更新**和 **Bug 报告**为主。共产生 2 条 Issue（其中 1 条已关闭）、8 条待合并 PR，无新版本发布。值得关注的是，社区连续提交了两个描述完全相同的多行输入 Bug Issue（#3390 已关闭、#3391 仍开启），疑似重复上报；8 条待合并 PR 中有 5 条来自 Dependabot 的 Go 依赖升级，另有 3 条功能/修复型 PR 仍处于待审查状态。项目维护节奏以日常维护为主，暂无重大功能合并入主干。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日**无 PR 被合并或关闭**，均为待审查状态。但以下 PR 的推进值得关注：

- **[#3381] feat: Switch OpenAI to responses API** — 将 OpenAI provider 切换至新版 responses API，属于架构迁移型改动，但已被标记为 stale，需维护者关注是否继续推进。  
  https://github.com/sipeed/picoclaw/pull/3381

- **[#3371] feat(providers): add opencode-go provider with session header support** — 新增 `opencode-go` 提供商支持，可根据模型 ID 自动路由到正确的 API 端点，并携带 `x-opencode-session` 会话头。  
  https://github.com/sipeed/picoclaw/pull/3371

- **[#3376] fix(deltachat): initialize as custom channel to solve config validation error** — 修复 deltachat 频道启用时配置校验失败的问题（解决 #3265），同样已被标记为 stale。  
  https://github.com/sipeed/picoclaw/pull/3376

此外，**5 条 Dependabot 依赖更新 PR**（#3385–#3389）于今日提交，涵盖 `line-bot-sdk-go`、`mautrix`、`anthropic-sdk-go`、`modelcontextprotocol/go-sdk`、`golang.org/x/crypto` 等核心依赖，建议维护者尽快审阅合并，以减少安全与兼容性风险。

## 4. 社区热点

- **[#3390] / [#3391] BUG: Pico channel splits multi-line input into multiple messages** — **今日最受关注的 Issue**，同一作者重复提交了相同描述的问题，其中一个已关闭。该问题直指 Pico 客户端（移动 TUI）在粘贴多行文本（如诗歌、代码块）时，会按换行符拆分内容并逐行发送，破坏了消息完整性，严重影响移动端用户体验。  
  https://github.com/sipeed/picoclaw/issues/3390  
  https://github.com/sipeed/picoclaw/issues/3391

- 两个 stale PR（#3381、#3376）持续累积待审状态，社区贡献者的提交长期未被维护者回应，可能影响外部贡献积极性。

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 中 | [#3391](https://github.com/sipeed/picoclaw/issues/3391) | Pico channel 将多行输入拆分为多条消息，破坏消息结构 | 待修复，无关联 PR |
| 中 | [#3390](https://github.com/sipeed/picoclaw/issues/3390) | 与 #3391 完全相同的问题 | 已关闭（疑似重复上报） |

**分析**：该 Bug 影响 Pico 客户端的基础输入体验，涉及移动 TUI 场景下的文本处理逻辑。目前无对应修复 PR，建议维护者将其标记为 confirmed，并评估修复优先级。

## 6. 功能请求与路线图信号

从今日 PR 与 Issue 中可以提炼以下路线图信号：

- **OpenAI responses API 迁移**（#3381）：持续跟进上游 API 演进，保证兼容性与新特性支持。  
- **opencode-go 提供商**（#3371）：扩展新 provider 接入，并引入会话头支持，提升多会话管理能力。  
- **deltachat 通道修复**（#3376）：完善自定义通道注册机制，修复配置校验 bug，属于稳定性增强。  
- **多行输入处理**（#3391）：社区对移动端文本输入的完整性有明确需求，可能推动 Pico 客户端输入逻辑重构。

综合来看，**多行输入处理**是最可能进入下一版本修复范围的功能点，因为它直接影响用户日常使用。

## 7. 用户反馈摘要

- **真实痛点**：在 Pico 移动客户端中粘贴多行文本（诗歌、代码块）时，内容被自动拆分逐行发送，导致消息语义被破坏。用户提交了详细复现步骤，说明该问题可稳定触发，非偶发性。  
- **使用场景**：移动端 TUI 用户通过 Pico 渠道发送富文本内容，属于核心使用路径。  
- **反馈渠道**：两条 Issue 均由同一个用户提交，评论数仅 1，讨论热度尚未充分展开，但问题本身指向明确。

## 8. 待处理积压

以下 PR/Issue 长期未获维护者响应，建议优先关注：

- **[#3381] Switch OpenAI to responses API**（标记 stale）— 功能迁移型 PR，搁置越久合并成本越高。  
  https://github.com/sipeed/picoclaw/pull/3381

- **[#3376] fix(deltachat) config validation error**（标记 stale）— 已对应明确 Bug（#3265），修复方案清晰，不应长期挂起。  
  https://github.com/sipeed/picoclaw/pull/3376

- **[#3371] opencode-go provider** — 新功能型 PR，已开放 17 天无维护者评论。  
  https://github.com/sipeed/picoclaw/pull/3371

- **[#3391] 多行输入 Bug** — 今日新上报，暂无任何标记或评论，建议至少确认是否复现。  
  https://github.com/sipeed/picoclaw/issues/3391

---

**报告日期**：2026-09-25  
**数据范围**：2026-09-24 至 2026-09-25  
**数据来源**：github.com/sipeed/picoclaw

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-25

## 1. 今日速览

过去 24 小时 NanoClaw 项目保持稳定推进：新增 2 个 Issue（全部开放）、14 条 PR 动态（其中 10 条待合并、4 条已关闭），无新版本发布。今日的核心焦点集中在 **Iron Proxy 网关的安装与使用体验**上——2 个新 Issue 和 5 条相关 PR 全部围绕该主题，其中 arm64 架构支持是当前最紧迫的问题（对应 `exec format error` 运行时崩溃）。此外，项目在 CLI 正确性（审批状态与丢弃原因枚举）、CI 稳定性（消除时序性 flake）和安装流程健壮性（失败重试与错误提示）方面有多项修复落地。整体活跃度评级：**中等偏高**，贡献者 @glifocat 是今日的绝对主力。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日有 4 条 PR 被关闭（未区分合并/直接关闭），以下为关键进展：

**CLI 正确性修复**

- [PR #3882](https://github.com/nanocoai/nanoclaw/pull/3882)：修复 `ncl approvals help` 和 `ncl dropped-messages help` 中枚举缺失的问题，使帮助文本列出宿主机真实写入的所有审批状态和丢弃原因。这为后续 #3889 的进一步收尾（移除不存在的 `unknown_sender_public` 枚举值）铺平了道路，该序列修复让 CLI 与宿主机行为保持一致。

**安装流程修复**

- [PR #3885](https://github.com/nanocoai/nanoclaw/pull/3885)：修复 setup 流程在运行尚未选择 agent 运行时（如环境/容器/网关阶段失败）就尝试安装 Claude CLI 的问题。该 PR 已关闭，但同一问题的后续增强 [PR #3884](https://github.com/nanocoai/nanoclaw/pull/3884)（区分"已选择 Claude"的运行时后再提示）仍处于开放状态，说明修复仍在迭代中。

**依赖健壮性**

- [PR #3879](https://github.com/nanocoai/nanoclaw/pull/3879)：修复 `scripts/rebuild-native.mjs` 仅检测 better-sqlite3 的 JS 包装器、未真正验证原生 addon 可加载的问题。此前 `require(pkg)` 会"假阳性"通过，现在可检测到损坏（而非仅缺失）的原生模块，避免运行时才暴露崩溃。

**Agent Runner 可解释性**

- [PR #3890](https://github.com/nanocoai/nanoclaw/pull/3890)：为聊天会话的 system prompt 增加对 inbound 消息块（`<message>`、`<dm-history>`、`<cross-session-context>` 等）的语义说明，帮助 agent 理解多轮、多渠道上下文的结构。该 PR 已关闭但值得持续跟踪。

此外，3 条 hardening 类 PR（[#3887](https://github.com/nanocoai/nanoclaw/pull/3887)、[#3892](https://github.com/nanocoai/nanoclaw/pull/3892)、[#3893](https://github.com/nanocoai/nanoclaw/pull/3893)）针对 CI 时序性 flake 和 agent 容器被误杀问题提出了修复，均处于待合并状态，详情见下文。

## 4. 社区热点

今日社区讨论和 PR 动态高度集中在 **Iron Proxy** 主题上，主要围绕两大诉求：

**① arm64 架构支持（最高热度）**

- [Issue #3888](https://github.com/nanocoai/nanoclaw/issues/3888)：在 aarch64 主机（NVIDIA DGX Spark）上，Iron Control 镜像仅发布 `linux/amd64`，导致 `exec format error`。作者已在 2026-09-24 验证根因：`ironsh/iron-control` 所有 tag 均为 amd64-only（最后构建于 2026-06-15），且 `versions.json` 固定了该镜像。
- 对应的修复 PR [PR #3891](https://github.com/nanocoai/nanoclaw/pull/3891) 已在当日提交，方案是在 arm64 主机上改用替代镜像或仿真运行。

**② 审批流程的可用性摩擦（次高热度）**

- [Issue #3881](https://github.com/nanocoai/nanoclaw/issues/3881)：Iron Proxy 网关的审批协调器仅自动批准两件事——agent provider 声明的模型域名（所有方法）和 `NANOCLAW_GATEWAY_READ_ONLY_HOSTS` 中的 GET/HEAD 请求。其他所有请求都会触发人工审批卡片，用户希望有 per-host 级别的自动批准规则，减少频繁的人工介入。

两条 Issue 均无评论，但 @glifocat 同时提交了 5 条相关 PR（#3883、#3884、#3889、#3891 等），说明该贡献者既是问题提出者也是修复主力。背后诉求可归纳为：**NanoClaw 在异构硬件（arm64）上的可移植性和 Iron Proxy 在企业/自动化场景下的低摩擦运转**。

## 5. Bug 与稳定性

按严重程度排列：

**高严重度 — 运行时崩溃 / 完全不可用**

- **[Issue #3888](https://github.com/nanocoai/nanoclaw/issues/3888)**：Iron Control 在 arm64 主机上 `exec format error`，导致 Iron Proxy 高级设置在 ARM 环境完全不可用。**已有修复 PR：[#3891](https://github.com/nanocoai/nanoclaw/pull/3891)（开放中）**。

**中严重度 — 功能异常 / 流程阻塞**

- **[Issue #3881](https://github.com/nanocoai/nanoclaw/issues/3881)**：Iron Proxy 审批协调器缺少 per-host 自动批准规则，未在白名单内的请求每次都会阻塞等待人工审批，影响自动化工作流。属于使用体验缺陷，暂无对应修复 PR，但已被维护者跟踪。

- **[PR #3893](https://github.com/nanocoai/nanoclaw/pull/3893)（修复，开放中）**：Claude Agent SDK 在流式输出长内容块时，宿主机 sweep 逻辑可能因心跳超时误杀容器。这是间歇性故障，影响长任务稳定性。

**低严重度 — 时序性 flake / 诊断缺陷 / 回归**

- **[PR #3887](https://github.com/nanocoai/nanoclaw/pull/3887)（修复，开放中）**：修复两个 CI 时序 flake，其中一个为真实诊断 bug——重启就绪探测中 `waitForHost` 将 socket 超时错误地裁剪到剩余预算，可能掩盖真实故障。

- **[PR #3892](https://github.com/nanocoai/nanoclaw/pull/3892)（修复，开放中）**：`portal runtime.test.ts:205` 中，`until()` 看到 `sign_in_required` 日志后固定 sleep 200ms 再读 journal，在负载较高的 CI runner 上偶发失败。改为等待 journal 清空，消除时序依赖。

- **[PR #3889](https://github.com/nanocoai/nanoclaw/pull/3889)（修复，开放中）**：**回归问题**。由 #3882 引入——`reason` 枚举从 `UNKNOWN_SENDER_POLICIES` 的每个条目派生，导致帮助文本列出了宿主机永远不会写入的 `unknown_sender_public`，可能误导运维排障。

**基础设施**

- **[PR #3879](https://github.com/nanocoai/nanoclaw/pull/3879)（已关闭）**：better-sqlite3 原生模块损坏时 `rebuild-native.mjs` 检测不到，`require(pkg)` 仅加载 JS 包装器并"假阳性"通过，实际调用时才会崩溃。

## 6. 功能请求与路线图信号

结合今日 Issue/PR 动态，以下需求可能进入下一版本：

**高概率纳入（已有对应修复 PR）**

- **arm64 / aarch64 主机支持**（[Issue #3888](https://github.com/nanocoai/nanoclaw/issues/3888)、[PR #3891](https://github.com/nanocoai/nanoclaw/pull/3891)）：Iron Control 的 amd64-only 限制影响 ARM Mac、NVIDIA DGX Spark 等设备。若 PR #3891 被合并，NanoClaw 将具备在 ARM 主机运行 Iron Proxy 的能力，是重要的硬件生态扩展。

- **Iron Control 数据库孤儿恢复**（[PR #3883](https://github.com/nanocoai/nanoclaw/pull/3883)）：允许用户删除 checkout 后重试失败的 Iron Proxy 安装，修复安装流程的不可重入问题。

**中概率（有明确需求但尚无实现）**

- **Iron Proxy per-host 自动审批规则**（[Issue #3881](https://github.com/nanocoai/nanoclaw/issues/3881)）：用户希望以 host 为粒度配置自动批准，而非每次请求都弹卡片。这是对网关审批模型的重要增强，可能以配置项或策略规则形式落地。

**需关注（存在 PR 但开放已超过一个月）**

- **[PR #3509](https://github.com/nanocoai/nanoclaw/pull/3509) 与 [PR #3510](https://github.com/nanocoai/nanoclaw/pull/3510)（WhatsApp sender label）**：多 agent 共享同一 WhatsApp 号码时，为出站消息附加发送 agent 的标识，并支持将已知 agent label 视为 self-echo 以避免自回环。该功能对多租户/共享身份场景是刚需，开放一个月未被合并，建议维护者评估是否纳入下个版本。

**流程改进信号**

- [PR #3886](https://github.com/nanocoai/nanoclaw/pull/3886)：要求 PR 描述必须勾选"无用户可见变更"或填写 `release-note` 块。数据背景：2.4.0 合入的 91 个 PR 中有 59 个缺少 release note，导致 changelog 需手工重建。这是一项提升发布流程可维护性的元改进。

## 7. 用户反馈摘要

今日的 Issue 和 PR 描述中反映了几类真实用户痛点与使用场景：

**ARM 环境是真实战场（来自 Issue #3888 的报告者）**

- 用户环境：aarch64 主机（NVIDIA DGX Spark）、NanoClaw 2.4.0、OpenCode + Iron Proxy（Advanced 设置）。
- 痛点：在 ARM 主机上 Iron Control 步骤直接崩溃，错误为 docker `exec format error`。用户已自行验证根因并给出详细分析（镜像平台不匹配、`versions.json` 固定版本），表明是技术能力较强的用户，且对项目有较高期待。

**网关审批流程影响自动化效率（来自 Issue #3881 的报告者）**

- 使用场景：通过 Iron Proxy 网关转发工具调用，当前只自动批准模型域名和只读白名单主机的 GET/HEAD。
- 痛点：其他所有请求都会触发人工审批卡片，在自动化/无人值守场景下形成瓶颈。用户期望"per-host 级别批准一次，后续免打扰"，本质是对网关策略精细度的需求。

**开发者的流程负担（来自 PR #3886 的描述）**

- 现状：2.4.0 合并的 91 个 PR 中有 59 个未填写 release note，说明模板虽有要求但执行不到位。
- 诉求：通过 CI 强制校验减轻维护者的手工整理负担——这反映了贡献者对项目发布流程可持续性的关注。

**稳定性问题集中在长任务和边缘场景**

- Claude 流式长输出时容器被心跳机制误杀（[PR #3893](https://github.com/nanocoai/nanoclaw/pull/3893)）。
- better-sqlite3 原生模块损坏但安装脚本检测不到（[PR #3879](https://github.com/nanocoai/nanoclaw/pull/3879)）。

## 8. 待处理积压

**【重点关注】开放超过一个月的功能 PR**

- [PR #3510](https://github.com/nanocoai/nanoclaw/pull/3510)（WhatsApp per-agent sender label）— 2026-08-25 创建，已开放 31 天。
- [PR #3509](https://github.com/nanocoai/nanoclaw/pull/3509)（delivery 层传递 sender label）— 2026-08-25 创建，已开放 31 天。
  - 两者为配套 PR，解决多 agent 共享 WhatsApp 身份的消息归属问题。长时间未获维护者响应，建议明确评估：纳入路线图或关闭并说明原因。

**【需要维护者关注的开放 PR】**

- [PR #3891](https://github.com/nanocoai/nanoclaw/pull/3891)：修复 hari 今日报告的 arm64 崩溃，建议优先审查。
- [PR #3883](https://github.com/nanocoai/nanoclaw/pull/3883)：让 Iron Proxy 安装可重试，消除"失败即永久损坏"的隐患。
- [PR #3884](https://github.com/nanocoai/nanoclaw/pull/3884)：与已关闭的 #3885 高度重叠（均针对 Claude CLI 的安装时机），建议合入一个并关闭另一个，避免重复劳动。

**【流程提示】**

- 今日 10 条待合并 PR 集中在同一作者（@glifocat），建议在审查时关注 review 负载均衡，避免单一贡献者形成瓶颈。

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目日报 — 2026-09-25

## 1. 今日速览

IronClaw 项目在过去 24 小时内保持了平稳的维护节奏：发布了一个新的补丁候选版本 `v1.4.1-rc.2`，修复了 Google 扩展（Gmail、Google Calendar）的 OAuth 激活问题；同时有一条自动化质量监控 Issue（#8111）和一条 CI 基础设施 PR（#7988）处于活跃状态。整体活跃度中等偏低，无重大功能合并或关闭事件，项目处于版本候选迭代与质量基线持续跟踪阶段。值得关注的是，Issue #8111 反映了**deepseek-v4-flash 模型在 OCR 数字化文档上的系统性质量短板**，这可能影响项目在文档密集型场景下的基准表现。

- Release: `ironclaw-v1.4.1-rc.2` 发布（2026-09-24）
- Issues: 1 条新开（自动化质量监控报告）
- PRs: 1 条待合并（CI 基础设施维护）
- 合并/关闭: 0 条 PR 或 Issue 被合并/关闭

---

## 2. 版本发布

### ironclaw-v1.4.1-rc.2（2026-09-24）

🔗 [查看 Release 详情](https://github.com/nearai/ironclaw/releases)

这是 `1.4.0` 之上的第二个补丁候选版本，与 RC1 携带相同的修复内容。核心变更如下：

**修复内容**

- **Google 扩展（Gmail、Google Calendar）激活方式改进**：运营方现在可以通过 Web UI 提供 Google OAuth 客户端凭据来激活这些扩展，而不再仅限于通过环境变量注入。这降低了部署门槛，使非运维人员也能完成扩展配置。

**破坏性变更**

- 无。作为 RC 补丁候选，仅包含缺陷修复，不引入 API 或配置格式的破坏性变更。

**迁移注意事项**

- 对于已通过环境变量配置 Google OAuth 的现有部署，无需任何改动，行为保持兼容。
- 新部署或需要切换配置方式的用户，可在 Web UI 中直接录入 OAuth 客户端信息，无需重启服务。

**健康度评估**

发布节奏紧凑（RC1 后迅速推出 RC2 验证同一修复），表明团队在积极收敛 `1.4.1` 的发布候选状态，预计正式版临近。

---

## 3. 项目进展

### 今日无 PR 被合并或关闭

过去 24 小时内，没有 PR 被合并或关闭，代码主干没有发生新的变更。项目当前处于发布候选验证阶段，核心工作集中在修复验证和版本打包上，而非新功能开发。

### 待合并 PR 动态

**#7988 [OPEN] chore(agents): refresh codebase knowledge graph**
🔗 [查看 PR](https://github.com/nearai/ironclaw/pull/7988)

- 作者: @ironclaw-ci[bot] | 创建: 2026-08-29 | 最后更新: 2026-09-24
- 类型: CI/基础设施 | 尺寸: XS | 风险: 低 | 贡献者: core
- 内容: 由每晚自动运行的 `Codebase Graph Refresh` 工作流生成，刷新 agents 的代码库记忆引导快照（bootstrap snapshot），使其与当前 default 分支保持同步。
- **进展信号**：该 PR 虽创建于 8 月 29 日，但今日仍保持更新状态，说明 CI 工作流持续在跑，但人工 review 合并的节奏略显滞后。此类自动化 PR 若不及时合并，会导致快照持续过期，后续刷新时产生累积 diff。

---

## 4. 社区热点

今日社区讨论活跃度较低，仅有一条新 Issue 且无评论。唯一的观察热点是自动化质量监控报告：

**#8111 [OPEN] Daily ironclaw failure taxonomy — 2026-09-24**
🔗 [查看 Issue](https://github.com/nearai/ironclaw/issues/8111)

- 作者: @pranavraja99 | 创建/更新: 2026-09-24 | 评论: 0 | 👍: 0
- 内容: 每日失败分类报告，分析了 `officeqa` 套件中的 38 个非通过（non-pass）任务，并指出所有这些失败均源于 `deepseek-v4-flash` 模型对 OCR 数字化财政部文档的质量不足（genuine model-quality failures）。
- **诉求分析**：这并非用户提出的功能需求，而是项目内部的自动化质量监控机制产生的信号。其背后诉求在于持续跟踪底层模型在特定领域（OCR 文档理解）的能力退化或短板，为模型选型、微调方向或基准套件调整提供数据依据。38 个任务的失败全部归因于模型而非基础设施或代码缺陷，说明当前代码层面相对稳定，瓶颈在模型能力。

---

## 5. Bug 与稳定性

今日没有发现明显的代码 Bug、崩溃或回归问题。唯一值得关注的质量问题来自模型能力层面：

| 严重程度 | 问题描述 | 状态 | 关联链接 |
|---------|---------|------|---------|
| 中 | `deepseek-v4-flash` 在 `officeqa` 基准上 38 个非通过任务全部失败，属模型质量缺陷（对 OCR 数字化文档理解不足），非代码回归 | 已记录，无 fix PR（非代码问题） | [Issue #8111](https://github.com/nearai/ironclaw/issues/8111) |

**分析**：该问题不属于 IronClaw 代码库本身的 Bug，而是集成模型的能力边界。如果项目路线图强调办公文档问答场景，这可能需要考虑切换默认模型、引入 OCR 预处理优化或在基准文档中标注模型能力预期。

另外，最新 RC 版本修复的 Google OAuth 激活问题，是近期已知的功能性缺陷，已通过 `v1.4.1-rc.2` 提供修复验证。

---

## 6. 功能请求与路线图信号

今日没有新的社区功能请求提交。但可以从发布候选版本中提炼出以下路线图信号：

- **部署体验优化成为当前迭代重点**：`v1.4.1-rc.2` 中 Google 扩展的 OAuth 配置方式从环境变量扩展至 Web UI 操作，表明项目正在向「低门槛、可配置化」的运维方向演进。未来可能继续强化 Web UI 在扩展管理、凭据配置方面的能力。
- **质量监控自动化已在运行**：每日 failure taxonomy 流程的持续产出（Issue #8111 体系），说明项目已建立稳定的自动化质量基线，后续版本迭代将依赖这套体系来评估模型升级或功能改动的影响。

---

## 7. 用户反馈摘要

今日缺少来自用户的直接评论反馈。从 Issue #8111 的内容可以间接观察到以下使用场景与体验信号：

- **使用场景**：用户（或内部团队）在办公文档问答场景中使用 OCR 数字化文档（如 Treasury 文档），这属于典型的企业知识库问答场景，对模型的文档理解能力有较高要求。
- **潜在痛点**：当依赖特定模型（如 deepseek-v4-flash）处理低质量 OCR 文本时，答案质量可能显著下滑。虽然这是模型能力问题，但最终会传导为终端用户对 IronClaw 输出质量的感知。
- **积极信号**：项目能对失败案例进行系统化归因分析，主动识别问题是模型能力而非系统缺陷，说明质量保障体系运转良好，用户对项目的可控性会有更强信心。

---

## 8. 待处理积压

今日数据中无长期无响应的用户 Issue。有一个待关注的 CI 积压项：

**#7988 [OPEN] chore(agents): refresh codebase knowledge graph**
🔗 [查看 PR](https://github.com/nearai/ironclaw/pull/7988)

- 创建于 2026-08-29，已停留 **27 天**，今日（9 月 24 日）有更新但仍未合并。
- 该 PR 由自动化工作流生成，风险低、尺寸小、变更内容为代码库知识图谱快照刷新，属于常规维护。长时间未合并可能导致：
  1. 快照持续偏离 default 分支，未来刷新 diff 变大；
  2. 自动化流程的信任度下降，若机器人持续产出但无人处理，会积压成噪音。
- **建议**：维护者安排一次快速 review 并合并，或明确该系列 PR 的合并策略（如固定每周批量合并），避免积压。

---

## 项目健康度总结

| 维度 | 状态 | 说明 |
|------|------|------|
| 发布节奏 | ✅ 健康 | 连续发布 RC 候选版本，修复方向明确 |
| 代码稳定性 | ✅ 稳定 | 无新报告的 Bug 或回归，缺陷修复已进 RC |
| 社区活跃度 | ⚠️ 偏低 | 24h 内无评论互动，Issue/PR 均为自动化流程产出或维护类 |
| 质量保障 | ✅ 健全 | 每日失败归因机制运行正常，能明确区分模型问题与代码问题 |
| 维护响应 | ⚠️ 需要关注 | 自动化 PR 积压 27 天未合并，建议建立批量合并策略 |

*报告基于 2026-09-25 日 GitHub 数据生成，所有链接均可直接访问验证。*

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-25

## 1. 今日速览

过去 24 小时 LobsterAI 项目整体处于**维护平稳期**，无新版本发布。Issues 侧共 18 条更新，其中 16 条为 stale 自动关闭，仅 2 条仍处于开放状态，历史遗留问题（#1861、#2385）继续积压。PR 侧活跃度较高，共 50 条更新，其中 46 条已合并/关闭，4 条仍在待合并队列，新提交的 #2758、#2759、#2761、#2762 等 PR 集中在 OpenClaw 兼容性修复与 UI 布局调整，反映出项目当前重心在于**维护性修补与细节打磨**，而非激进的新功能扩展。值得注意的是，多个安全漏洞报告（#2176、#2181、#2286、#2287、#2288）均被 stale 关闭，需关注其真实修复状态。

## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases: 无）。

## 3. 项目进展

截至今日，46 条 PR 被合并/关闭，其中有若干值得关注的重要变更：

| PR | 内容 | 影响 |
|---|---|---|
| [#2761](https://github.com/netease-youdao/LobsterAI/pull/2761) | fix(openclaw): 解决模型输出长度截断问题 | 修复 GLM-5.3 等模型因 max_tokens 默认值过低导致的输出中途截断；同时修正模型目录扫描逻辑——原先仅扫描 dist/extensions，遗漏了 volcengine、zai、deepseek 等预装第三方插件扩展，本次补齐了该遗漏 |
| [#2759](https://github.com/netease-youdao/LobsterAI/pull/2759) | fix(openclaw): 修复并继续畸形的 OpenAI 兼容工具调用 | 解决 v2026.8.1 中工具调用参数含原始控制字符或非法转义时被整体拒绝、导致工具执行后的副作用回合被丢弃的问题。回移上游字符串修复逻辑，并允许对拒绝调用进行最多两次内部延续 |
| [#2762](https://github.com/netease-youdao/LobsterAI/pull/2762) / [#2760](https://github.com/netease-youdao/LobsterAI/pull/2760) | feat(ui): 对齐调色板与布局 | 将主题色板调整为中性灰阶（去除蓝色调），主内容区改为与侧边栏边缘对齐的无缝布局，侧边导航改为 14px 宽的胶囊按钮，并优化默认/存储窗口尺寸的独立宽度与高度适配 |
| [#2699](https://github.com/netease-youdao/LobsterAI/pull/2699)、[#2618](https://github.com/netease-youdao/LobsterAI/pull/2618)、[#2600](https://github.com/netease-youdao/LobsterAI/pull/2600) 等 | 多个 Release 分支回合 main | 9.16、9.4、8.31 等多个版本的发布分支在本周完成合并，main 分支已累计吸收大量功能更新与修复，包括引导式首次运行体验、Library 浏览加速、模型视频分享支持、Windows 安装器恢复等 |

整体判断：项目代码整合持续进行，OpenClaw 相关修复密集落地，但新功能增量有限，处于版本稳定化阶段。

## 4. 社区热点

今日最受关注的诉求集中在**性能与 token 效率**上，代表性讨论：

- [**#2230 同一个模型在 LobsterAI 比 CodeBuddy 慢很多**](https://github.com/netease-youdao/LobsterAI/issues/2230)（2026-06-30 创建，更新 09-24）：用户报告相同 DBX 模型、相同提示词下，CodeBuddy 耗时 2m24s、消耗 67,610 Token，而 LobsterAI 耗时 25 分钟、消耗 60M Token，性能差距达 10 倍以上、Token 消耗差距近 900 倍。这是今日最尖锐的性能对比反馈，直接冲击核心使用体验。
- [**#2121 对一个现象的疑问（怀疑是 bug）**](https://github.com/netease-youdao/LobsterAI/issues/2121)（2026-06-07 创建，更新 09-24）：用户质疑重复输出的文字是否大量消耗 token 造成浪费，并询问是否与 Claw 相关、如何解决。反映用户对 token 消耗透明度与效率的关切。
- [**#2120 建议**](https://github.com/netease-youdao/LobsterAI/issues/2120)（2026-06-06 创建，更新 09-24）：用户提出三条建议——任务运行时预输入下一个任务以提升连续性、延长单次任务运行时长避免 terminated 中断、技能 UI 从双列改为三列以适配宽屏。

这些讨论均发生在 6-7 月，今日因 stale 机制被关闭，说明**社区反馈未能获得充分跟进**，这类重要呼声的沉没有可能损害用户信任。

## 5. Bug 与稳定性

今日关闭的 Issue 大多为 stale，但其中包含若干未解决的严重 Bug。按严重程度排列：

**严重级**

- [**#2230 性能严重落后于 CodeBuddy**](https://github.com/netease-youdao/LobsterAI/issues/2230)：同模型、同提示词下耗时 25 分钟 vs 2m24s，Token 消耗 60M vs 67K。影响核心生产力场景，**暂无对应 fix PR**。
- [**#2214 桌面端"数据备份"功能导致主进程卡死（未响应）**](https://github.com/netease-youdao/LobsterAI/issues/2214)：100% 可复现（数据库 71.6MB、WAL 模式下约 5-10 秒后主窗口白屏），用户只能强制结束进程。数据安全相关功能崩溃风险高，**暂无确认修复**。
- [**#2215 安装反复出现 Resource extraction failed**](https://github.com/netease-youdao/LobsterAI/issues/2215)：用户详细排查后定位到真实安装路径为 G:\LobsterAI，C 盘目录为无关副本，涉及 NSIS 安装流程异常（错误码 -2147450726，ERROR_BAD_ENVIRONMENT）。安装器健壮性问题，**暂无确认修复**。

**中等级**

- [**#2216 Memory Search 无法切换 local embedding provider，索引重建被 DB 锁阻塞（EBUSY）**](https://github.com/netease-youdao/LobsterAI/issues/2216)：provider 被锁定为 openai，配额耗尽（429）后完全不可用；索引重建受 SQLite DB 锁阻塞。**暂无确认修复**。
- [**#2079 执行结果窗口滚动到顶端会假死**](https://github.com/netease-youdao/LobsterAI/issues/2079)：2026.5.27 版本可复现，滚动至顶端时窗口无响应。

**安全级（stale 关闭，值得警惕）**

- [#2176](https://github.com/netease-youdao/LobsterAI/issues/2176)、[#2181](https://github.com/netease-youdao/LobsterAI/issues/2181)、[#2286](https://github.com/netease-youdao/LobsterAI/issues/2286)、[#2287](https://github.com/netease-youdao/LobsterAI/issues/2287)、[#2288](https://github.com/netease-youdao/LobsterAI/issues/2288) 等多个安全漏洞报告（任意文件读取、SSRF 防护弱化、本地 token 代理未认证、文件外泄、符号链接穿越）均在今日被 stale 关闭。若未实际修复，以 stale 机制自动关闭安全报告存在较大风险，建议维护者逐一确认处置状态。

## 6. 功能请求与路线图信号

社区呼声较高的功能诉求：

- [**#2385 对话框支持添加文件夹**](https://github.com/netease-youdao/LobsterAI/issues/2385)：用户希望像其他 agent 一样通过 `@` 引用文件夹，目前仅支持添加文件。这是 Agent 易用性的常见需求。
- [**#2120 任务预输入 + 延长单次任务时长 + 技能 UI 多列**](https://github.com/netease-youdao/LobsterAI/issues/2120)：用户借鉴 workbuddy 提出"任务队列"概念，期望提升长任务连续性与宽屏利用效率。
- [**#2239 编程工具"OpenClaw 化"趋势建议**](https://github.com/netease-youdao/LobsterAI/issues/2239)：建议通过 MCP 协议与 OpenCode、CodeBuddy CN 等编程工具深度联动，实现全流程自动化编排，同时延伸生态边界。
- [**#2180 AI Collaborator 平台提案**](https://github.com/netease-youdao/LobsterAI/issues/2180)：主张将 LobsterAI 从底层工具集升级为面向"技术型非精英程序员"的 AI 协作者平台，提供自然语言命令栏与任务调度控制台。

对应 PR 侧的路线图信号：

- [**#2758 feats(cowork): 展示 OpenClaw 原生进度卡片**](https://github.com/netease-youdao/LobsterAI/pull/2758)（待合并）：多动作任务可在输入框上方显示真实计划、当前步骤与更新内容，无需用户深入工具输出。该能力若合入，将显著提升 Cowork 多步任务的可观测性。
- [**#2374 永久隐藏侧边栏广告的开关**](https://github.com/netease-youdao/LobsterAI/pull/2374)（待合并）：用户关注广告体验，设置项若落地将提升满意度。
- [**#2504 OrcaRouter provider 集成**](https://github.com/netease-youdao/LobsterAI/pull/2504)（待合并）：新增 Anthropic/OpenAI 兼容的 LLM 网关提供商，丰富模型路由选择。
- [**#2452 保留带斜杠模型 ID 的 provider 前缀**](https://github.com/netease-youdao/LobsterAI/pull/2452)（待合并）：修复 `custom_0` + `deepseek-ai/DeepSeek-V4-Flash` 类模型 ID 被错误持久化的问题。

## 7. 用户反馈摘要

从今日更新的 Issues 评论中可以提炼出以下真实用户声音：

- **性能焦虑**（[#2230](https://github.com/netease-youdao/LobsterAI/issues/2230)）：用户在真实工作流中对比测试，发现同模型下 LobsterAI 的耗时与 token 消耗远超竞品（差距 10~900 倍），对生产力的损害非常直接。用户原话数据（25 分钟/60M tokens vs 2m24s/67,610 tokens）是极重要的质量信号。
- **Token 消耗透明性**（[#2121](https://github.com/netease-youdao/LobsterAI/issues/2121)）：用户对重复输出是否浪费 token 存疑，说明用户对成本敏感，并希望产品提供更清晰的 token 使用可视化。
- **流程连续性**（[#2120](https://github.com/netease-youdao/LobsterAI/issues/2120)）：监控任务在运行时收到 terminated 提示，但脚本仍在执行，用户体验断裂。
- **备份与安装的稳定性**（[#2214](https://github.com/netease-youdao/LobsterAI/issues/2214)、[#2215](https://github.com/netease-youdao/LobsterAI/issues/2215)）：用户在重要数据场景下遭遇 100% 复现的卡死与安装失败，对工具信任度产生负面影响。用户做了详尽的日志分析，说明对项目抱有较高期待，希望官方提升工程健壮性。
- **技能库管理**（[#2243](https://github.com/netease-youdao/LobsterAI/issues/2243)）：174 个技能触发 watch 扫描导致严重 I/O 与 token 浪费，用户被迫手动删除 167 个 hidden 技能才能缓解，期望引入 UI 开关实现手动控制。

## 8. 待处理积压

需要维护者重点关注的长尾问题：

**长期开放 Issues**

- [**#1861 图片附件不随模型切换重新处理（supportsImage 状态不同步）**](https://github.com/netease-youdao/LobsterAI/issues/1861)：2026-04-28 创建，已开放近 5 个月。包含 3 个具体的状态不同步分支场景（非视觉→视觉、视觉→非视觉、Hint 不更新）。虽相关 PR [#2373](https://github.com/netease-youdao/LobsterAI/pull/2373) 已提交并关闭，但 Issue 仍未标记为已修复，需要确认修复是否完整落地。
- [**#2385 对话框无法添加文件夹**](https://github.com/netease-youdao/LobsterAI/issues/2385)：2026-07-25 创建，2 条评论，无 assignee、无里程碑，属于常见易用性短板。

**待合并 PR（4 条）**

- [#2758](https://github.com/netease-youdao/LobsterAI/pull/2758) — Cowork 展示 OpenClaw 原生进度卡片（9/24 提交，待 review）
- [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374) — 设置中永久隐藏侧边栏广告（7/21 创建，已 stale，待处理）
- [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) — 保留带斜杠模型 ID 的 provider 前缀（8/7 创建，已 stale）
- [#2504](https://github.com/netease-youdao/LobsterAI/pull/2504) — 新增 OrcaRouter provider 集成（8/17 创建，已 stale）

**安全报告积压风险**

多个安全漏洞报告（[#2176](https://github.com/netease-youdao/LobsterAI/issues/2176)、[#2181](https://github.com/netease-youdao/LobsterAI/issues/2181)、[#2286](https://github.com/netease-youdao/LobsterAI/issues/2286)、[#2287](https://github.com/netease-youdao/LobsterAI/issues/2287)、[#2288](https://github.com/netease-youdao/LobsterAI/issues/2288)）均由 @YLChen-007 提交，涉及任意文件读取、SSRF 防护弱化、未认证 token 代理、Host-local 文件外泄、符号链接穿越等，严重度较高。均于今日被 stale 机制关闭，建议维护者核查这些漏洞是否已通过其他渠道修复，或重新打开并给出明确处置计划。

---

**综合健康度评估**：项目今日代码合并活跃，OpenClaw 兼容性与 UI 细节持续打磨，但社区反馈的严重性能问题（#2230）与多起安全报告长期悬而未决；同时多个用户早起反馈的 Issue 被 stale 批量关闭，说明**维护带宽可能不足以覆盖社区反馈量**。建议优先处理性能对比、备份卡死与安全状态确认，并考虑在释放节奏中纳入社区呼声最高的功能（文件夹引用、任务预输入、技能 UI 优化）。

:::

:::details{title="TinyClaw" repo="TinyAGI/tinyclaw"}

过去24小时无活动。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-25

> 数据来源：[github.com/agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)（Issue/PR 数据实际托管于 QwenPaw 仓库）

---

## 1. 今日速览

过去 24 小时项目活跃度处于高位：**27 条 Issue 更新**（新开/活跃 16，关闭 11）与 **23 条 PR 更新**（待合并 17，已合并/关闭 6）。社区讨论最集中的是 [QwenPaw Hub 多租户版下一步方向（#7318）](https://github.com/agentscope-ai/QwenPaw/issues/7318)，累计 32 条评论。团队响应速度值得肯定：昨日（9/24）用户反馈的 [Console 侧边栏改版破坏分组功能（#7968）](https://github.com/agentscope-ai/QwenPaw/issues/7968) 当日即有关联修复 PR（[#7972](https://github.com/agentscope-ai/QwenPaw/pull/7972)）并被关闭。值得关注的是，实时语音对话（[#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785)）、持久化聊天记录（[#7931](https://github.com/agentscope-ai/QwenPaw/pull/7931)）、多标签终端（[#7861](https://github.com/agentscope-ai/QwenPaw/pull/7861)）等大型功能 PR 仍在待合并队列中。无新版本发布。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日合并/关闭的 PR 共 6 条，主要围绕 Console 稳定性、provider 健壮性和聊天功能完备性：

- **修复 Console 侧边栏分组回归**（[#7972](https://github.com/agentscope-ai/QwenPaw/pull/7972)）：将会话列表默认分组从 `date` 改回 `source`，直接回应用户报告的 [#7968](https://github.com/agentscope-ai/QwenPaw/issues/7968)。**说明：团队对 UI 回归的响应周期已压缩到 24 小时以内。**
- **修复工具调用生命周期查询时序**（[#7971](https://github.com/agentscope-ai/QwenPaw/pull/7971)）：Console 在 `plugin_call` 消息完成后即开始轮询工具调用状态，但后端需在 `on_acting` 阶段才注册调用，存在竞态窗口。
- **修复流式清理卡死后的恢复机制**（[#7960](https://github.com/agentscope-ai/QwenPaw/pull/7960)）：为 provider/model 隔离期增加 60 秒单调时钟上限，避免因流式读取卡死导致后续请求持续失败，直到重启进程。
- **允许无文字直接发送附件**（[#5659](https://github.com/agentscope-ai/QwenPaw/pull/5659)）：回应 [企业微信用户诉求（#5558）](https://github.com/agentscope-ai/QwenPaw/issues/5558)，支持上传附件后无需输入文字即可提交。**该 PR 自 6/30 创建，历时近 3 个月终于合入，属于用户高频诉求的落地。**

此外，两个历史安全/稳定性 Bug 于今日关闭：[execute_shell_command 绕过 File Guard 防护（#2967）](https://github.com/agentscope-ai/QwenPaw/issues/2967) 与 [qwenpaw-pet 0.1.1 丢弃 `actor` 参数破坏工具审批（#7856）](https://github.com/agentscope-ai/QwenPaw/issues/7856)。

---

## 4. 社区热点

- **[【讨论】QwenPaw Hub 多租户版发布后，下一步应构建什么？（#7318）](https://github.com/agentscope-ai/QwenPaw/issues/7318)** — 32 条评论，4 👍，持续近一个月的热门讨论。用户围绕多用户访问、管理员管理技能（关联 #2324）展开，核心诉求是：**个人助手向团队协作工具演进时，权限模型、技能隔离、计费方式如何设计**。这是项目路线图的重要信号。
- **[【Bug】Console 侧边栏改版破坏聊天分组/文件夹功能（#7968）](https://github.com/agentscope-ai/QwenPaw/issues/7968)** — 用户升级到 v2.2.2b3 后，已有会话分组不可见、无法创建新分组。虽当日已被修复，但反映出 **UI 改版需要更完善的回归测试覆盖**。
- **[【Feature】希望尽快推出官方移动端（#7976）](https://github.com/agentscope-ai/QwenPaw/issues/7976)** — 刚创建即获关注。用户自述已自制非官方 Android 客户端，但强调"不应替代官方长期维护的移动端"。**移动端需求的迫切性正在积累。**

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 Critical | [#7966](https://github.com/agentscope-ai/QwenPaw/issues/7966) | 切换 provider 后，历史消息中的 `file://` 媒体 URL 导致会话**永久损坏**，每轮对话都报 `invalid_parameter_error` | 有 PR [#7973](https://github.com/agentscope-ai/QwenPaw/pull/7973) 尝试修复 |
| 🔴 Critical | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) | 飞书会话 queue consumer 长驻卡死，会话静默无响应，新消息无法拉起新 consumer | **已开放 22 天，尚无修复 PR** |
| 🟠 High | [#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836) | scroll 淘汰策略会整体丢弃包含用户 turn 的工具密集片段，活动窗口丢失请求 | 已开放 8 天，无修复 |
| 🟠 High | [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 上下文压缩仍可能超出 provider 完整请求预算，导致活动 turn 失败 | 已开放 17 天，无修复 |
| 🟠 High | [#5856](https://github.com/agentscope-ai/QwenPaw/issues/5856) | 上下文压缩将 `tool_call` 结构化数据转为纯文本，导致后续 400 错误 / 消息数不匹配 | **已开放 79 天，仍无修复** |
| 🟡 Medium | [#7850](https://github.com/agentscope-ai/QwenPaw/issues/7850) | 后台 `reload_driver` 用过期卡片覆盖并发策略写入（丢失更新） | 已开放 7 天 |
| 🟡 Medium | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | Daily Paper 在 arxiv.org 不可达时静默失败，错误信息掩盖真实原因（`httpx` 异常），且无代理/端点配置 | 已开放 13 天 |
| 🟡 Medium | [#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857) | ACP 关闭回退路径可能跳过会话清理并泄漏事件循环 | 已开放 7 天 |
| 🟡 Medium | [#7963](https://github.com/agentscope-ai/QwenPaw/issues/7963) | Langfuse 工具观测从不记录 tool output（仅 input 和 metadata） | **已有修复 PR [#7964](https://github.com/agentscope-ai/QwenPaw/pull/7964)** |
| 🟡 Medium | [#7959](https://github.com/agentscope-ai/QwenPaw/issues/7959) | Moonshot (kimi-k3) 拒绝无顶层 `type` 的 anyOf 联合类型的 MCP 工具 schema | **已有修复 PR [#7962](https://github.com/agentscope-ai/QwenPaw/pull/7962)** |
| ✅ Closed | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | `RetryChatModel` 硬编码 32768 context_size 回退，导致超大上下文模型报 CONTEXT_UNFIT | 今日关闭 |
| ✅ Closed | [#2967](https://github.com/agentscope-ai/QwenPaw/issues/2967) | `execute_shell_command` 可能绕过 File Guard 防护（安全） | 今日关闭 |

---

## 6. 功能请求与路线图信号

**今日新增功能诉求：**

- **[官方移动端 App（#7976）](https://github.com/agentscope-ai/QwenPaw/issues/7976)** — 至少 Android，让用户安全连接自建服务完成对话和管理。用户已自建非官方客户端，说明**需求真实且强烈**。
- **[手动禁用预置模型和频道（#7957）](https://github.com/agentscope-ai/QwenPaw/issues/7957)** — 用户提到"看到一堆不用东西想关掉"的诉求，属于 UI/配置灵活性的小优化。

**近期活跃的功能 PR（待合并，可能进入下一版本）：**

- **[实时语音对话（#7785）](https://github.com/agentscope-ai/QwenPaw/pull/7785)** — provider 可配置的实时语音聊天，含语音输入、打断、模型选择，且复用现有聊天执行路径。
- **[持久化分页聊天记录（#7931）](https://github.com/agentscope-ai/QwenPaw/pull/7931)** — per-session SQLite 存储，支持向上翻页、去重、持久化 token 用量。
- **[多标签认证聊天终端（#7861）](https://github.com/agentscope-ai/QwenPaw/pull/7861)** — xterm 多标签终端，会话级工作目录，需认证。
- **[独立模型用于记忆写入（#7719）](https://github.com/agentscope-ai/QwenPaw/pull/7719)** — 允许为 ReMeLight 记忆写入指定独立（可更便宜）模型。

**长期路线图信号：**

- [QwenPaw Hub 多租户方向（#7318）](https://github.com/agentscope-ai/QwenPaw/issues/7318) 讨论热度持续，多用户/团队场景是社区最关心的演进方向。
- [Agent 自主上下文管理（#7733）](https://github.com/agentscope-ai/QwenPaw/issues/7733) — 让 agent 在上下文淘汰前拥有"话语权"，避免被动压缩丢失活动状态。

---

## 7. 用户反馈摘要

- **飞书私聊会话静默卡死（[#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534)）**：用户描述"某条消息进入高优先级卡片路径后，consumer 不再拉取下一条，也不崩溃，queue 永远不空"。这类**静默失效比崩溃更损害信任**，且已开放 3 周未修复。
- **企业微信附件发送诉求落地（[#5558](https://github.com/agentscope-ai/QwenPaw/issues/5558)）**：用户明确"上传 CAD/PLM 文件 → agent 自动解析"场景，认为"很多智能体场景下不需要额外输入文字"。对应 PR [#5659](https://github.com/agentscope-ai/QwenPaw/pull/5659) 已合入。
- **移动端真实需求（[#7976](https://github.com/agentscope-ai/QwenPaw/issues/7976)）**：用户自述做了非官方安卓客户端，但强调"不应替代官方长期维护的移动端"。这提醒团队：**移动端长期缺位，用户已被迫自行解决**。
- **Sidebar 改版引发不满（[#7968](https://github.com/agentscope-ai/QwenPaw/issues/7968)）**：用户对 v2.2.2b3 改版后的分组功能消失感到困惑。虽然当日修复，但**改版前应充分评估既有功能覆盖**。
- **用户对预置模型/频道的"整理欲"（[#7957](https://github.com/agentscope-ai/QwenPaw/issues/7957)）**：虽是轻量诉求，但反映真实使用习惯——**用户希望界面只呈现自己需要的选项**。
- **历史问题长期未解决的挫败感**：[#5856](https://github.com/agentscope-ai/QwenPaw/issues/5856) 的上下文压缩 tool_call 丢失问题已开放 79 天，用户仍在使用 v1.1.12.post2 并持续报告；[#5900](https://github.com/agentscope-ai/QwenPaw/issues/5900) 的 MCP streamable_http 会话终止后不自动重连问题虽已关闭，但用户实际工作流中仍可能受到影响。

---

## 8. 待处理积压

以下 Issue 已开放较长时间且无修复 PR，提醒维护者关注：

- **[#5856：上下文压缩丢失 tool_call 结构（79 天）](https://github.com/agentscope-ai/QwenPaw/issues/5856)** — 影响所有长会话用户的稳定性，且与 #7628、#7836 同属"上下文管理"类问题，建议集中排期。
- **[#7534：飞书会话 queue consumer 卡死（22 天）](https://github.com/agentscope-ai/QwenPaw/issues/7534)** — 静默无响应类故障，影响企业用户对飞书频道的信任。
- **[#7377：Agent Loop mode 配置不持久化（28 天）](https://github.com/agentscope-ai/QwenPaw/issues/7377)** — 用户修改的 Loop 模式在任务完成后自动恢复默认，属配置持久化的基础体验问题。
- **[#7715：Daily Paper 静默失败（13 天）](https://github.com/agentscope-ai/QwenPaw/issues/7715)** — arxiv 不可达时错误信息误导用户，且缺少代理/端点配置，影响 ReMe 记忆插件的日活体验。
- **[#7850：Driver card 策略丢失更新（7 天）](https://github.com/agentscope-ai/QwenPaw/issues/7850)** — 并发写覆盖问题，涉及策略配置的可靠性。

**健康度小结：** 项目整体活跃度高，新功能 PR 数量可观（语音、终端、历史记录），团队对 UI 回归的响应迅速。但上下文管理类问题（#5856、#7628、#7836）累计开放超百天，是当前最大的稳定性短板；移动端与多租户诉求持续升温，建议在路线图中给出明确回应。

:::

:::details{title="ZeptoClaw" repo="qhkm/zeptoclaw"}

过去24小时无活动。

:::

:::details{title="EasyClaw" repo="gaoyangz77/easyclaw"}

过去24小时无活动。

:::
