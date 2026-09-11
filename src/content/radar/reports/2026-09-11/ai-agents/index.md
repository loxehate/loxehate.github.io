---
title: "OpenClaw 生态日报"
published: 2026-09-11
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-11

> Issues: 109 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-11 00:00 UTC

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

# OpenClaw 项目动态日报

**日期：** 2026-09-11
**数据来源：** github.com/openclaw/openclaw


## 1. 今日速览

OpenClaw 项目今日处于**高度活跃但稳定性承压**的状态。过去 24 小时内有 109 条 Issue 更新（71 条新开/活跃）和 500 条 PR 更新（249 条待合并），社区贡献量极大。然而，多个 P0/P1 级回归问题集中在 2026.9.2/9.3 版本，涉及消息丢失、会话状态损坏、认证故障和网关挂起，表明近期快速迭代对核心稳定性造成了明显冲击。新版本 v2026.6.35 作为 6 月 Extended Stable (LTS) 的最终版本发布，为生产用户提供了稳定锚点。整体来看，项目处于"高速开发 + 高优先级修复并行"的典型活跃期，但需警惕回归问题积压对用户信心的侵蚀。


## 2. 版本发布

### v2026.6.35 — 2026 年 6 月 Extended Stable (LTS) 最终版

这是 6 月 LTS 线的收官版本，重点在于**安全边界加固**：

- **更安全的 Provider 与 Channel 边界**：捆绑的 provider 和 channel adapter 现在会限制不可信响应体的大小，在昂贵操作前拒绝超大输入，并在传输过程中保持安全恢复能力。

**迁移注意事项**：此版本面向 LTS 用户，不涉及破坏性变更。建议生产环境用户优先评估此版本作为稳定基线，而非 9.x 快速迭代线。


## 3. 项目进展

过去 24 小时内合并/关闭了 251 条 PR，以下为代表性进展：

| PR | 内容 | 影响 |
|---|---|---|
| [#144510](https://github.com/openclaw/openclaw/pull/144510) | 复用 Full Access 测试夹具，减少约 24 秒/用例的测试开销 | QA 效率提升 |
| [#144474](https://github.com/openclaw/openclaw/pull/144474) | 修复 CLI 配置写入时模型别名双重解析导致的验证错误 | 配置可靠性 |
| [#144394](https://github.com/openclaw/openclaw/pull/144394) | 沙箱化 agent 的 Git 配置隔离，防止仓库级配置以 Gateway 主机权限执行 | 安全边界加固 |
| [#144491](https://github.com/openclaw/openclaw/pull/144491) | 支持从 Telegram 私聊完成 OpenRouter 登录 | 认证体验优化 |
| [#143015](https://github.com/openclaw/openclaw/pull/143015) | 远程浏览器任务移动端交接（CAPTCHA/登录人工步骤） | 多端协同能力 |
| [#144480](https://github.com/openclaw/openclaw/pull/144480) | Browser 侧边栏资产下载功能 | UI 功能补全 |
| [#144511](https://github.com/openclaw/openclaw/pull/144511) | 修复 Codex 压缩写入器未释放导致的下一轮停滞 | 稳定性修复 |

**整体评估**：项目在安全边界、多端协同、测试基础设施三个方向均有实质推进，但大量 PR 仍处于"待维护者审查"状态，合并吞吐量可能成为瓶颈。


## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) — Hook/tool 子进程泄漏导致僵尸进程累积 | 15 | 长期运行的网关实例性能持续退化，用户要求修复进程回收机制 |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) — 回复运行期间到达的消息被丢弃 | 8 | 消息丢失回归（2026.9.2 引入），直接影响聊天可靠性 |
| [#12855](https://github.com/openclaw/openclaw/issues/12855) — 内置自动更新功能 | 8 | 用户希望有调度、确认和通知的完整自动更新工作流 |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) — 混合终端 requester-settle 批次无限重试 | 7 | 会话状态卡死，影响 agent 工作流完成 |
| [#79588](https://github.com/openclaw/openclaw/issues/79588) — 压缩质量守卫未验证标识符存活 | 6 | 摘要压缩可能丢失 UUID/commit SHA 等关键标识符 |

**热点分析**：社区关注焦点集中在**消息可靠性**（#139847、#137332）和**长期运行稳定性**（#97616、#79588）。这些问题的共同特征是"静默失败"——用户不会立即发现，但会在长时间运行后累积成严重故障。社区对这类问题的容忍度明显低于显式报错。


## 5. Bug 与稳定性

### P0 级（发布阻断）

| Issue | 描述 | Fix PR |
|---|---|---|
| [#141615](https://github.com/openclaw/openclaw/issues/141615) | 2026.9.2 webchat 认证验证不可用，所有 RPC 阻塞至网关重启 | 无 |
| [#144460](https://github.com/openclaw/openclaw/issues/144460) | 2026.9.2 网关主线程 futex 等待挂起，健康检查无响应 | 无（main 分支未复现） |
| [#144148](https://github.com/openclaw/openclaw/issues/144148) | heartbeat_respond 在 notify=true 时 scratch 未持久化（数据丢失） | 无 |
| [#144325](https://github.com/openclaw/openclaw/issues/144325) | dev 更新修复拒绝迁移（移除 Codex 别名后） | 无 |
| [#144286](https://github.com/openclaw/openclaw/issues/144286) | LM Studio 模型 reasoning:true 导致无限"思考中"挂起 | 有候选 PR |

### P1 级（高优先级）

| Issue | 描述 | Fix PR |
|---|---|---|
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 回复运行期间消息被丢弃（回归） | 无 |
| [#144424](https://github.com/openclaw/openclaw/issues/144424) | 并发心跳通道碰撞触发 Anthropic 429 风暴 | 无 |
| [#143461](https://github.com/openclaw/openclaw/issues/143461) | message_sending hook 取消被误报为传输错误 | 无 |
| [#143569](https://github.com/openclaw/openclaw/issues/143569) | Slack 单通道 ingress 阻塞 33 分钟 | 无 |
| [#142139](https://github.com/openclaw/openclaw/issues/142139) | Codex 运行时 18-26 秒工具间隔延迟 | 无 |
| [#144047](https://github.com/openclaw/openclaw/issues/144047) | claude-cli 后端 cron 任务 OAuth 过期 | 无 |

### 已有 Fix PR 的 Bug

| Issue | Fix PR | 状态 |
|---|---|---|
| [#143646](https://github.com/openclaw/openclaw/issues/143646) — Control UI 配置渲染错误 | [#143700](https://github.com/openclaw/openclaw/pull/143700) | 待审查 |
| [#144477](https://github.com/openclaw/openclaw/issues/144477) — Browser 侧边栏缺少下载按钮 | [#144480](https://github.com/openclaw/openclaw/pull/144480) | 待审查 |
| [#144176](https://github.com/openclaw/openclaw/issues/144176) — macOS 内存条误报 | 无直接 PR | — |

**稳定性评估**：9.x 快速迭代线存在**系统性回归风险**，多个 P0/P1 问题集中在认证、会话状态和消息传递三个核心路径。建议维护者评估是否需要发布 9.3.x 热修复版本，而非等待下一个 minor 版本。


## 6. 功能请求与路线图信号

### 高信号功能请求

| Issue | 需求 | 相关 PR | 纳入可能性 |
|---|---|---|---|
| [#12855](https://github.com/openclaw/openclaw/issues/12855) | 内置自动更新（调度+确认+通知） | 无 | 中 — 多次讨论但无 PR |
| [#144306](https://github.com/openclaw/openclaw/issues/144306) | 自动化结果推送到配对节点（Android 通知） | 无 | 中 — 与移动端体验直接相关 |
| [#142484](https://github.com/openclaw/openclaw/issues/142484) | 跨环境持久 agent 连续性 | 无 | 低 — 需要产品决策 |
| [#144486](https://github.com/openclaw/openclaw/issues/144486) | 插件可观察原生子 agent 结果 | 无 | 中 — 插件生态需求 |
| [#144470](https://github.com/openclaw/openclaw/issues/144470) | Signal 消息延迟日志增强 | 无 | 高 — 低复杂度诊断改进 |

### 已有 PR 的功能

| PR | 功能 | 状态 |
|---|---|---|
| [#144491](https://github.com/openclaw/openclaw/pull/144491) | Telegram 私聊 OpenRouter 登录 | 待审查 |
| [#143015](https://github.com/openclaw/openclaw/pull/143015) | 远程浏览器移动端交接 | 待审查 |
| [#141777](https://github.com/openclaw/openclaw/pull/141777) | CLI 查询 cron 运行历史 | 待审查 |
| [#141742](https://github.com/openclaw/openclaw/pull/141742) | Cron 可读时间戳 | 待审查 |

**路线图信号**：移动端体验（通知、浏览器交接）和运维可观测性（日志、时间戳）是当前社区贡献的两个明确方向。自动更新功能呼声高但推进缓慢，可能受限于安全审查复杂度。


## 7. 用户反馈摘要

### 真实痛点

1. **"静默消息丢失是最糟糕的"** — 多个用户报告消息在特定时序下被丢弃且无任何提示（[#139847](https://github.com/openclaw/openclaw/issues/139847)、[#144203](https://github.com/openclaw/openclaw/issues/144203)）。用户期望至少有一条日志或死信记录。

2. **"升级后反而更不稳定"** — 从 2026.8.x 升级到 9.x 的用户频繁遭遇回归（[#141615](https://github.com/openclaw/openclaw/issues/141615)、[#144460](https://github.com/openclaw/openclaw/issues/144460)、[#138260](https://github.com/openclaw/openclaw/issues/138260)）。部分用户明确表示"切换模型/运行时立即解决"，暗示问题出在 OpenClaw 层而非上游 API。

3. **"长期运行实例在悄悄退化"** — 僵尸进程累积（[#97616](https://github.com/openclaw/openclaw/issues/97616)）、缓存前缀重写浪费 21.3M tokens（[#143017](https://github.com/openclaw/openclaw/issues/143017)）、SQLite 补丁重复解码（[#136338](https://github.com/openclaw/openclaw/issues/136338)）——这些问题的共同点是用户直到成本显著增加或性能明显下降时才发现。

4. **"移动端体验不完整"** — Android 通知点击后渲染空白（[#144395](https://github.com/openclaw/openclaw/issues/144395)）、WhatsApp TTS 语音无法播放（[#144502](https://github.com/openclaw/openclaw/issues/144502)）、自动化结果无法推送到手机（[#144306](https://github.com/openclaw/openclaw/issues/144306)）。

### 满意度信号

- 社区对 **LTS 版本的安全加固方向**表示认可（v2026.6.35 发布无负面反馈）。
- 对 **PR 审查速度**存在隐性不满——大量 PR 标记为"ready for maintainer look"但长期未合并（如 [#132409](https://github.com/openclaw/openclaw/pull/132409) 已等待 13 天）。
- 用户对 **clawsweeper 自动化标签系统**的响应速度表示肯定，多个 Issue 在数小时内获得分类和关联 PR。


## 8. 待处理积压

### 长期未解决的高优先级 Issue

| Issue | 创建日期 | 已等待 | 阻塞原因 |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸进程泄漏 | 2026-06-29 | 74 天 | 需要进程生命周期重构 |
| [#79588](https://github.com/openclaw/openclaw/issues/79588) — 压缩质量守卫缺陷 | 2026-05-09 | 125 天 | 需要产品决策 + 安全审查 |
| [#12855](https://github.com/openclaw/openclaw/issues/12855) — 自动更新功能 | 2026-02-09 | 214 天 | 需要产品决策 + 安全审查 |
| [#114200](https://github.com/openclaw/openclaw/issues/114200) — OpenAI Responses 结构化输出丢失 | 2026-07-27 | 46 天 | 有 PR 但未合并 |
| [#123009](https://github.com/openclaw/openclaw/issues/123009) — Codex 订阅每 5 分钟阻塞 | 2026-08-13 | 29 天 | 需要维护者审查 |

### 长期等待审查的 PR

| PR | 创建日期 | 已等待 | 状态 |
|---|---|---|---|
| [#132409](https://github.com/openclaw/openclaw/pull/132409) — 保留采纳前停滞的消息 | 2026-08-29 | 13 天 | Ready for maintainer look |
| [#123864](https://github.com/openclaw/openclaw/pull/123864) — 会话替换后拒绝过期重置 | 2026-08-14 | 28 天 | Ready for maintainer look |
| [#130745](https://github.com/openclaw/openclaw/pull/130745) — app-server 运行时可选 | 2026-08-27 | 15 天 | Needs proof |
| [#144404](https://github.com/openclaw/openclaw/pull/144404) — 复用已完成嵌入 | 2026-09-10 | 1 天 | Waiting on author |

**积压分析**：P1 级 Issue 的平均等待时间超过 60 天，而 P1 级 PR 的平均等待时间约 15 天。维护者审查带宽是当前最明显的瓶颈。建议考虑增加维护者数量或引入更细粒度的 triage 机制，优先处理带有 `clawsweeper:linked-pr-open` 标签的 Issue（已有修复但未合并）。


## 附：项目健康度指标

| 指标 | 数值 | 趋势 |
|---|---|---|
| 24h Issue 活跃量 | 109 | ↑ 高 |
| 24h PR 活跃量 | 500 | ↑ 极高 |
| Issue 关闭率 | 35% (38/109) | 正常 |
| PR 合并/关闭率 | 50% (251/500) | 正常 |
| P0 级未解决 Bug | 5 | ⚠️ 偏高 |
| P1 级未解决 Bug | 6+ | ⚠️ 偏高 |
| 最长未解决 P1 Issue | 125 天 | ⚠️ 需关注 |
| 新版本发布 | 1 (LTS) | 稳定 |

**综合评级：B+** — 社区活跃度极高，功能迭代迅速，但核心稳定性回归问题和维护者审查积压是当前两大风险因素。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**日期：2026-09-11**
**分析范围：** OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw 共 9 个项目


## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高速扩张与结构性分化并行的关键期**。以 OpenClaw 为参照核心，生态内 9 个活跃项目在 24 小时内累计产生约 200 条 Issue 更新和 640+ 条 PR 更新，社区贡献量级已接近中型商业软件项目。然而，活跃度的分布极不均衡——OpenClaw 单项目贡献了约 55% 的 PR 流量，头部效应显著。与此同时，多个项目在快速迭代中暴露出**核心稳定性回归**（消息丢失、会话状态损坏、安全沙箱突破）与**维护者审查带宽不足**的系统性矛盾。生态整体从"功能竞赛"阶段开始向"稳定性与安全加固"阶段过渡，LTS 版本线的价值正在被重新评估。

## 2. 各项目活跃度对比

| 项目 | 24h Issue 更新 | 24h PR 更新 | Release | 健康度评估 | 核心特征 |
|---|---|---|---|---|---|
| **OpenClaw** | 109（71 新开） | 500（249 待合并） | v2026.6.35 (LTS) | **B+** ⚠️ 稳定性承压 | 生态核心，高速开发+高优修复并行 |
| **CoPaw** | 21（15 新开） | 35（23 待合并） | v2.2.1-beta.2 | **B+** 活跃健康 | 多租户 Hub 转型中，移动端发力 |
| **NanoBot** | 3 | 23（12 待合并） | 无 | **B** 稳定 | WebUI 打磨+通道适配，贡献者成熟 |
| **Zeroclaw** | 22 | 50（0 合并） | 无 | **B-** 审查瓶颈 | 安全架构重构中，PR 积压严重 |
| **LobsterAI** | 0 | 13（10 合并） | 无 | **B+** 响应迅速 | OpenClaw 下游适配，工程能力强 |
| **Moltis** | 2（2 关闭） | 7（3 合并） | 无 | **B** 维护型 | 稳定收敛，长期 Bug 闭环 |
| **NanoClaw** | 1（1 关闭） | 6（3 合并） | 无 | **B+** 闭环高效 | 安装验证+运行时加固 |
| **IronClaw** | 1 | 8（5 依赖更新） | 无 | **B-** 社区冷清 | 自动化驱动，人类互动少 |
| **PicoClaw** | 2（1 关闭） | 7（0 合并） | 无 | **C+** 响应偏慢 | 社区自愈但维护者缺位 |

**关键观察：** 活跃度呈明显的**三梯队分布**——OpenClaw 独占第一梯队（500 PR/日），CoPaw 和 Zeroclaw 构成第二梯队（35-50 PR/日），其余项目处于第三梯队（<25 PR/日）。Release 节奏上，仅 OpenClaw 和 CoPaw 在近期有版本发布，其余项目均处于"累积待发"状态。

## 3. OpenClaw 在生态中的定位

### 3.1 核心优势

- **社区规模绝对领先**：24h PR 更新量（500）是第二梯队 CoPaw（35）的 14 倍，Zeroclaw（50）的 10 倍，生态内无可比肩者。
- **版本线策略成熟**：同时维护 6 月 LTS 线（v2026.6.35）和 9.x 快速迭代线，为不同风险偏好的用户提供明确选择。这是其他项目尚未建立的能力。
- **安全边界意识领先**：LTS 版本聚焦"不可信响应体大小限制""Git 配置隔离""沙箱化 agent"等安全加固，PR #144394 的 Git 配置隔离是生态内少见的纵深防御实践。

### 3.2 技术路线差异

| 维度 | OpenClaw | 同类项目 |
|---|---|---|
| **版本策略** | 双线并行（LTS + 快速迭代） | 单线滚动（CoPaw 有 beta 通道但无 LTS） |
| **安全模型** | 纵深防御（沙箱、边界限制、配置隔离） | Zeroclaw 正在追赶（RFC 7141 安全架构），其余项目较少涉及 |
| **多端协同** | 远程浏览器移动端交接（#143015） | CoPaw 原生移动端（#7378 草稿），方向一致但实现路径不同 |
| **测试基础设施** | 复用测试夹具减少 24s/用例（#144510） | 各项目均无类似优化报告 |

### 3.3 社区规模对比

OpenClaw 的 Issue 活跃量（109/日）超过其余 8 个项目总和（约 52/日）。但需注意：**规模优势伴随着治理成本**——P1 级 Issue 平均等待超 60 天，PR 审查积压（#132409 等待 13 天），维护者带宽已成为瓶颈。相比之下，NanoClaw 和 LobsterAI 虽规模小，但"报告→修复→合并"闭环效率显著更高（NanoClaw #3759 从报告到合并仅 1 天）。

## 4. 共同关注的技术方向

### 4.1 消息可靠性与"静默失败"治理

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | #139847 回复运行期间消息被丢弃；#137332 会话状态卡死无限重试 |
| **CoPaw** | #7579 模型回复从上下文丢失；#7534 飞书 queue consumer 静默卡死 |
| **NanoBot** | #5429 后台任务异常被 asyncio 泛化吞掉，无法定位失败原因 |
| **Zeroclaw** | #9187 WeChat 同步游标先于消息入队持久化，崩溃丢失消息 |

**共性：** 用户对"无感知失败"的容忍度远低于显式报错。多个项目同时出现消息丢失/会话卡死类回归，暗示这是 AI 智能体异步消息架构的**系统性设计挑战**，而非单一项目缺陷。

### 4.2 多端/移动端体验补全

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | #144306 自动化结果推送到配对节点；#143015 远程浏览器移动端交接；#144395 Android 通知渲染空白 |
| **CoPaw** | #7177 移动端操作入口不合理；#7378 原生移动端 App 草稿 |
| **NanoBot** | #5641 iOS PWA 修复 |

**共性：** 用户期望 AI 助手从"桌面/Web 工具"进化为"跨设备持续在线的个人基础设施"，移动端通知、远程交接、跨设备连续性成为共同需求。

### 4.3 模型成本可控性

| 项目 | 具体诉求 |
|---|---|
| **LobsterAI** | #2641 自动 Skill 审查改为 opt-in；#2643 压缩前记忆保存默认关闭 |
| **CoPaw** | #7664 记忆写入消耗昂贵旗舰模型 Token，要求独立轻量模型 |
| **OpenClaw** | #143017 缓存前缀重写浪费 21.3M tokens |

**共性：** 用户对"后台隐性模型调用"的成本敏感度显著上升，要求将成本决策权交还用户。

### 4.4 安全边界加固

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | LTS 安全边界加固；#144394 Git 配置隔离 |
| **Zeroclaw** | #8279 delegate 工具绕过父级白名单（S0 级，79 天未修复）；RFC 7141 安全架构系列 |
| **CoPaw** | #7672 Windows 安全沙箱被突破 |

**共性：** 随着 agent 能力增强（工具调用、子代理、跨服务集成），**最小权限原则**的落实成为安全核心议题。

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 全功能通用 AI 助手平台 | 全谱系用户（从个人到生产） | 双版本线，Provider/Channel 插件化，安全纵深防御 |
| **CoPaw** | 多租户团队协作 + 记忆系统 | 从个人向团队转型的用户 | Hub 架构，RemeLight 记忆引擎，移动端优先 |
| **NanoBot** | WebUI 体验 + 多通道适配 | 重视 UI/UX 的个人用户 | 轻量级，WebUI 为核心交互界面 |
| **Zeroclaw** | 安全架构 + 跨平台可靠性 | 安全敏感型用户，Windows 用户 | Rust 技术栈，RFC 治理流程，签名/溯源机制 |
| **LobsterAI** | OpenClaw 下游封装 | 需要开箱即用体验的用户 | 基于 OpenClaw 的配置桥接层，成本可控性优先 |
| **Moltis** | 外部 Agent 生态接入 | 多 Agent 编排用户 | 轻量级，支持 AGY/Gemini 等外部 CLI |
| **NanoClaw** | 安装验证 + 运行时稳定性 | 非标准部署环境用户 | 聚焦 setup/agent-runner 核心路径 |
| **IronClaw** | 多租户 MCP 隔离 + IME 体验 | 东亚用户，SaaS 场景 | Rust 技术栈，托管 MCP 目录隔离 |
| **PicoClaw** | 中国渠道适配（QQ/WeChat） | 国内用户 | 轻量级，渠道适配为主 |

**关键差异：** OpenClaw 是"平台型"项目，追求全功能覆盖；CoPaw 是"产品型"项目，聚焦团队协作和记忆系统；Zeroclaw 是"安全型"项目，以 Rust 和 RFC 治理为特色；LobsterAI 是"封装型"项目，在 OpenClaw 之上做体验优化。生态呈现**"一超多强、各有所长"**的格局。

## 6. 社区热度与成熟度

### 6.1 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **极高速迭代** | OpenClaw | 500 PR/日，但 P0/P1 回归积压，稳定性与速度矛盾突出 |
| **快速迭代** | CoPaw、Zeroclaw | 35-50 PR/日，CoPaw 有版本发布节奏，Zeroclaw 审查瓶颈明显 |
| **稳定迭代** | NanoBot、LobsterAI、NanoClaw | 6-23 PR/日，闭环效率高，社区贡献者成熟 |
| **维护型** | Moltis、IronClaw、PicoClaw | <10 PR/日，以依赖更新和 Bug 修复为主 |

### 6.2 成熟度评估

| 维度 | 最成熟 | 最不成熟 |
|---|---|---|
| **版本管理** | OpenClaw（LTS+快速双线） | 多数项目无明确版本策略 |
| **安全治理** | OpenClaw（纵深防御） | PicoClaw（无安全相关活动） |
| **社区治理** | Zeroclaw（RFC 流程，虽慢但有序） | IronClaw（人类互动几乎为零） |
| **贡献者体验** | NanoClaw（1 天闭环） | Zeroclaw（PR 等待 41 天） |
| **文档完整性** | LobsterAI（部署文档修复及时） | NanoBot（无头部署文档缺失） |

**核心矛盾：** 规模与响应速度呈负相关。OpenClaw 和 Zeroclaw 的 PR 积压问题表明，**维护者审查带宽是当前生态最稀缺的资源**。NanoClaw 和 LobsterAI 的高效闭环证明，小团队在特定领域可以做到"小而美"。

## 7. 值得关注的趋势信号

### 7.1 对 AI 智能体开发者的参考价值

**信号 1：消息可靠性是用户信任的基石，而非功能丰富度。**
多个项目同时出现消息丢失/会话卡死类回归，且用户反馈强烈（OpenClaw #139847 被明确称为"最糟糕的"）。开发者应优先投资于**消息传递的端到端可观测性**（至少一条日志或死信记录），而非新功能。

**信号 2：LTS/稳定版本线的价值正在被重新发现。**
OpenClaw 的 6 月 LTS 线在 9.x 快速迭代线出现系统性回归时成为"稳定锚点"，社区对 LTS 安全加固方向无负面反馈。对于面向生产用户的 AI 智能体项目，**双版本线策略**可能是平衡创新与稳定的最优解。

**信号 3：安全边界从"可选加固"变为"必选设计"。**
Zeroclaw 的 delegate 工具白名单绕过（S0 级，79 天未修复）和 CoPaw 的 Windows 沙箱突破报告表明，随着 agent 能力增强，**最小权限原则**必须内建于架构而非事后修补。OpenClaw 的 Git 配置隔离（#144394）是值得借鉴的实践。

**信号 4：移动端是下一个战场，但路径分化。**
CoPaw 选择原生 App（Expo/React Native），OpenClaw 选择远程浏览器交接+通知推送，NanoBot 选择 PWA 优化。开发者应根据自身技术栈和用户场景选择路径，但**跨设备连续性**是共同目标。

**信号 5：模型成本透明化成为产品竞争力。**
LobsterAI 将上游默认开启的模型调用改为 opt-in，CoPaw 用户要求记忆写入使用独立轻量模型。开发者应在产品设计中**显式暴露模型调用成本**，让用户对"隐性 Token 消耗"有知情权和决策权。

**信号 6：维护者审查带宽是生态最稀缺资源。**
OpenClaw 的 P1 Issue 平均等待 60+ 天，Zeroclaw 的 50 条 PR 零合并，多个项目出现 `needs-author-action` 标签长期滞留。对于开源项目维护者，**建立更细粒度的 triage 机制**（如 OpenClaw 的 clawsweeper 自动化标签系统）和**培养更多核心审查者**是可持续性的关键。

**信号 7：中国渠道适配是差异化机会。**
PicoClaw 的 QQ 频道问题（#3349，12 天无维护者响应）和 CoPaw 的飞书渠道卡死（#7534）表明，中国市场的渠道适配（QQ、微信、飞书、Telegram 中文用户）存在真实需求但供给不足。对于有中国用户基础的开发者，**深耕中国渠道适配**可能是一个被低估的差异化方向。


**报告结论：** 个人 AI 助手开源生态正处于从"功能竞赛"向"稳定性与安全竞赛"的转折点。OpenClaw 凭借规模优势仍是生态核心，但其稳定性回归问题为其他项目提供了差异化机会。CoPaw 的多租户转型、Zeroclaw 的安全架构、LobsterAI 的成本可控性，分别代表了生态演进的三个可能方向。对于技术决策者，建议根据自身对**稳定性、安全性、成本可控性**的优先级排序选择项目；对于开发者，**消息可靠性、安全边界、移动端体验、成本透明化**是当前最值得投入的四个技术方向。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报

**日期：2026-09-11**

---

## 1. 今日速览

NanoBot 项目今日处于**高活跃度状态**，过去 24 小时内 PR 更新达 23 条（12 条待合并，11 条已合并/关闭），显示出强劲的社区贡献势头。Issue 侧相对平静，仅 3 条更新，其中 1 条已关闭。值得注意的是，今日无新版本发布，但多个 PR 涉及 WebUI 体验优化、后台任务异常处理、以及多通道适配等关键领域，项目整体处于密集迭代期。活跃贡献者包括 @chengyongru、@DannyYTL、@Naster17 等，其中 @chengyongru 今日有 4 个 PR 被合并/关闭，贡献最为突出。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共有 **11 个 PR 被合并/关闭**，项目在以下方向取得实质性推进：

### WebUI 体验优化（4 项合并）
- **[#5723](https://github.com/HKUDS/nanobot/pull/5723)** — 统一独立页面（Apps、Skills、Automations、Channels）与会话页面的内容宽度（`49.5rem` 上限），提升视觉一致性。
- **[#5725](https://github.com/HKUDS/nanobot/pull/5725)** — 修复消息底部图标对齐问题，并将上下文压缩通知渲染为居中元素，改善聊天界面细节。
- **[#5722](https://github.com/HKUDS/nanobot/pull/5722)** — 侧边栏层级重构：用滑动圆角背景替代下划线选中态，增加垂直引导线和展开箭头，提升导航可读性。
- **[#5710](https://github.com/HKUDS/nanobot/pull/5710)** — 项目与话题分离：项目拥有独立目录视图，侧边栏固定提供 Topics、Projects、Automations 入口，解决侧边栏混杂问题。

### 通道适配与修复（3 项合并）
- **[#5711](https://github.com/HKUDS/nanobot/pull/5711)** — Telegram 通道内命令拼写适配：将下划线风格命令映射到 nanobot 规范的连字符风格，保持通道内一致性。
- **[#5707](https://github.com/HKUDS/nanobot/pull/5707)** — 修复 Telegram 通道静默丢弃 `/compact` 和 `/evaluator-prompt` 命令的问题，将其正确路由至命令路由器。
- **[#5573](https://github.com/HKUDS/nanobot/pull/5573)** — MCP OAuth 令牌自动刷新：持久化绝对过期时间与授权服务器元数据，支持网关重启后恢复刷新能力，并在 401 后自动发现并刷新。

### 核心稳定性（2 项合并）
- **[#5469](https://github.com/HKUDS/nanobot/pull/5469)** — TUI 显示实测请求上下文：区分累计令牌用量与最新请求的实测数据，在空闲 TUI 页脚展示提示词上下文/窗口、缓存命中率、输出令牌和生成速率。
- **[#5708](https://github.com/HKUDS/nanobot/pull/5708)** — 修复 exec 流式输出中 UTF-8 多字节字符跨块被截断的问题，使用增量解码器确保长时运行会话的输出完整性。

**整体评估**：今日合并的 11 个 PR 覆盖 WebUI 体验、Telegram 通道、MCP 协议、TUI 遥测和 exec 稳定性五大领域，项目在"打磨用户体验"和"加固基础设施"两条线上同步推进，健康度良好。

---

## 4. 社区热点

今日 Issues 评论数普遍较低（均为 0-2 条），无明显的"高热度"讨论。但以下条目值得关注：

### 🔥 最值得关注的 Issue
**[#5726 [bug] Startup initial password?](https://github.com/HKUDS/nanobot/issues/5726)**
- 作者 @gardiol 在无头服务器上安装 NanoBot 后，默认启动的链接不支持 JS，被迫从另一台工作站通过 Firefox 访问 WebUI，但不知道登录密码。
- **背后诉求**：无头部署场景下的首次登录引导严重缺失。用户期望在启动日志或文档中明确告知初始密码/密钥的获取方式。
- **已有响应**：PR [#5727](https://github.com/HKUDS/nanobot/pull/5727) 已提交，专门补充了 `channels.websocket.tokenIssueSecret` 作为 WebUI 登录密钥的文档说明，并指向 LAN 访问指引。该 PR 目前处于 OPEN 状态，建议优先合并。

### 持续关注的长期 Issue
**[#5429 AgentLoop does not retrieve exceptions from background tasks](https://github.com/HKUDS/nanobot/issues/5429)**
- 创建于 2026-08-18，今日有更新。指出 `AgentLoop.schedule_background()` 仅用 `set.discard` 清理任务，从不调用 `task.result()`，导致后台任务异常仅以 asyncio 泛化的 "Task exception was never retrieved" 形式出现，无法定位具体失败原因。
- **已有修复 PR**：[#5724](https://github.com/HKUDS/nanobot/pull/5724) 今日提交，添加了异常检索和日志记录逻辑。该 PR 目前 OPEN，是解决此长期问题的关键一步。

---

## 5. Bug 与稳定性

### 🔴 高严重度

| Issue/PR | 描述 | 状态 |
|----------|------|------|
| [#5429](https://github.com/HKUDS/nanobot/issues/5429) | 后台任务异常被静默吞掉，影响会话归档、WebUI 标题生成、后台命令等关键路径的可观测性 | ✅ 已有修复 PR [#5724](https://github.com/HKUDS/nanobot/pull/5724) |
| [#5630](https://github.com/HKUDS/nanobot/pull/5630) | Dream 记忆文件（SOUL.md / USER.md / MEMORY.md）无大小上限，可无限增长并注入每次请求，造成性能退化 | ⏳ PR 待合并（标记 conflict） |

### 🟡 中严重度

| Issue/PR | 描述 | 状态 |
|----------|------|------|
| [#5726](https://github.com/HKUDS/nanobot/issues/5726) | 无头部署首次登录密码不明确，阻塞新用户上手 | ✅ 已有文档 PR [#5727](https://github.com/HKUDS/nanobot/pull/5727) |
| [#5647](https://github.com/HKUDS/nanobot/issues/5647) | WebUI 会话标题在缺少 `webui` 标志的前端信封下不生成（已关闭） | ✅ 已关闭 |

### 🟢 低严重度（已修复）

- **[#5708](https://github.com/HKUDS/nanobot/pull/5708)** — exec 输出 UTF-8 跨块截断（已合并）
- **[#5641](https://github.com/HKUDS/nanobot/pull/5641)** — iOS PWA 点击和状态栏修复（待合并，标记 conflict）

---

## 6. 功能请求与路线图信号

### 正在推进的功能（有对应 PR）

| 功能方向 | PR | 状态 | 路线图信号 |
|----------|-----|------|-----------|
| **WebUI 完成通知音** | [#5602](https://github.com/HKUDS/nanobot/pull/5602) | OPEN（conflict） | 关闭 Issue #5524，用户明确需要前台完成提示音 |
| **Cron 可配置投递与批量归档** | [#5620](https://github.com/HKUDS/nanobot/pull/5620) | OPEN（conflict） | 支持按 cron 任务指定投递目标，引入批量归档生命周期状态 |
| **模型提供商移除控制** | [#5352](https://github.com/HKUDS/nanobot/pull/5352) | OPEN（conflict） | WebUI 增加模型提供商删除功能，带引用检查和本地化反馈 |
| **通道设置流程重构** | [#5356](https://github.com/HKUDS/nanobot/pull/5356) | OPEN | 通道目录改为双列分组布局，依赖安装与激活解耦 |
| **Discord 压缩通知就地更新** | [#5720](https://github.com/HKUDS/nanobot/pull/5720) | OPEN | 修复 #5719，压缩通知不再发送第二条独立消息 |
| **Archive 提示词工作区覆盖** | [#5702](https://github.com/HKUDS/nanobot/pull/5702) | OPEN（conflict） | 允许工作区自定义 Archive 整合提示词，与 Dream 提示词覆盖机制对齐 |

### 路线图判断

多个 PR 带有 `conflict` 标签（#5352、#5620、#5630、#5641、#5698、#5702），说明这些功能与主分支存在合并冲突，需要维护者介入解决。**WebUI 体验类功能**（通知音、设置流程、页面宽度统一）和**通道适配类功能**（Discord、Telegram）是当前社区贡献的两大主线，预计下一版本将重点收敛这些方向。

---

## 7. 用户反馈摘要

### 真实痛点

1. **无头部署门槛高**（[#5726](https://github.com/HKUDS/nanobot/issues/5726)）
   - 用户 @gardiol 在无头服务器上安装后完全不知道如何获取 WebUI 登录密码，反映出首次部署体验的文档缺口。该反馈直接催生了文档 PR #5727。

2. **后台任务可观测性不足**（[#5429](https://github.com/HKUDS/nanobot/issues/5429)）
   - 用户 @yu-xin-c 指出后台任务失败时仅出现 asyncio 泛化警告，无法定位是哪个具体任务（会话归档、标题生成、后台命令）出了问题。这是典型的"开发者体验"痛点，影响调试效率。

3. **WebUI 细节打磨需求旺盛**
   - 今日合并的多个 PR（#5722、#5723、#5725）均来自社区对界面细节的自发改进，说明用户对 NanoBot WebUI 的使用频率较高，且对视觉一致性和交互反馈有明确期待。

### 满意度信号

- 社区贡献者主动提交修复和功能增强的意愿强烈（今日 23 条 PR 更新），且多数 PR 带有完整的测试和文档说明，反映出项目贡献者群体的成熟度较高。
- 维护者对 PR 的响应速度较快（多个 PR 在 1-2 天内被合并或关闭），社区与维护者之间的协作节奏健康。

---

## 8. 待处理积压

### 长期未关闭的 Issue

| Issue | 创建日期 | 状态 | 关注点 |
|-------|----------|------|--------|
| [#5429](https://github.com/HKUDS/nanobot/issues/5429) | 2026-08-18 | OPEN | 后台任务异常检索，已有 PR #5724 待合并，建议优先处理 |

### 标记 conflict 的待合并 PR（需维护者介入）

| PR | 创建日期 | 功能 | 冲突原因推测 |
|-----|----------|------|-------------|
| [#5352](https://github.com/HKUDS/nanobot/pull/5352) | 2026-08-12 | 模型提供商移除控制 | 可能与 WebUI 设置页重构（#5356）存在代码重叠 |
| [#5356](https://github.com/HKUDS/nanobot/pull/5356) | 2026-08-12 | 通道设置流程重构 | 涉及面广，与多个 WebUI PR 存在潜在冲突 |
| [#5620](https://github.com/HKUDS/nanobot/pull/5620) | 2026-09-01 | Cron 可配置投递与批量归档 | 可能与 #5702（Archive 提示词覆盖）存在功能重叠 |
| [#5630](https://github.com/HKUDS/nanobot/pull/5630) | 2026-09-02 | Dream 记忆文件大小护栏 | 与 #5622 的修复存在依赖关系 |
| [#5641](https://github.com/HKUDS/nanobot/pull/5641) | 2026-09-03 | iOS PWA 修复 | 可能与 #5722/#5725 的侧边栏和消息对齐改动冲突 |
| [#5698](https://github.com/HKUDS/nanobot/pull/5698) | 2026-09-08 | API 类型搜索切换保留 | 可能与 #5352 的提供商管理改动冲突 |
| [#5702](https://github.com/HKUDS/nanobot/pull/5702) | 2026-09-08 | Archive 提示词工作区覆盖 | 与 #5620 的归档功能存在功能边界重叠 |

**建议**：维护者应优先处理 #5429 的修复 PR #5724（无 conflict 标记，且解决的是核心可观测性问题），随后集中解决 7 个 conflict PR 的合并冲突，避免社区贡献长期悬置。

---

*报告生成时间：2026-09-11 | 数据来源：GitHub API*

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报

**日期：** 2026-09-11
**数据来源：** github.com/zeroclaw-labs/zeroclaw
**报告人：** AI 智能体开源项目分析师

---

## 1. 今日速览

Zeroclaw 项目今日处于**高活跃度但零合并**状态。过去 24 小时内新增/活跃 Issues 22 条、PR 50 条，但 Issues 关闭数为 0、PR 合并/关闭数同样为 0，且无新版本发布。这一模式表明项目当前处于**大规模功能开发与安全加固的并行推进期**——大量 PR 正在等待审查（其中以 @JordanTheJet 的 RFC 7141 安全架构系列 PR 最为突出，形成了一条 9 层堆叠的依赖链），但合并管道暂时阻塞。社区讨论集中在 Windows 平台兼容性、安全策略收紧、以及 RFC 治理流程简化三个方向。整体健康度评估：**活跃但存在审查瓶颈**，50 条待合并 PR 的积压需要维护者优先处理。

---

## 2. 版本发布

今日无新版本发布。最近一次发布仍为 v0.8.3（依据 Issue #9101 提及），该版本曾引入三套并行的签名/溯源机制（cosign bundles、GitHub artifact attestations、slsa-github-generator），目前正在被整合为统一方案。

---

## 3. 项目进展

**今日无 PR 被合并或关闭。** 项目在功能推进上处于"蓄势"阶段，以下 PR 已进入待合并队列且具备较高完成度：

| PR | 标题 | 影响面 |
|---|---|---|
| [#10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768) | 新增 Sendblue iMessage/SMS 频道 | 渠道扩展（非 Apple 设备接入 iMessage） |
| [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511) | Quickstart 在凭据被拒绝时阻止持久化 | 用户体验改进 |
| [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) | 修复 git 操作允许根目录绕过 | 安全修复 |
| [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) | 隔离被提供商拒绝的图片 | 运行时稳定性 |

**安全架构系列 PR**（@JordanTheJet 主导，RFC 7141 实施）形成了从 #10248 → #10255 → #10268 → #10270 → #10274 → #10275 → #10321 的 7 层堆叠依赖链，涵盖身份认证、OIDC 注册、内存隔离、网关路由鉴权等核心安全能力。该系列一旦合并，将是 Zeroclaw 安全模型的一次重大升级。

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

| Issue | 标题 | 评论数 | 核心诉求 |
|---|---|---|---|
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | Windows 上 74 个测试失败 | 19 | Windows 开发者无法本地验证代码质量 |
| [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) | 整合发布签名机制（53→20 个资产） | 9 | CI 时间翻倍、维护负担过重 |
| [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | RFC：简化投票流程 | 8 | 治理流程摩擦过大，拖慢决策 |
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | Telegram 媒体组批量处理 | 8 | 多图发送时产生重复回复 |
| [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) | Nextcloud Talk 机器人 API 错误 | 8 | 频道集成功能不可用 |

**分析：** 社区最迫切的诉求集中在**跨平台可靠性**（Windows 测试与运行时问题占据多个高评论 Issue）和**治理效率**（RFC 流程简化、签名机制整合）。@Audacity88 和 @JordanTheJet 是当前最活跃的社区贡献者，分别主导治理流程优化和安全架构升级。

---

## 5. Bug 与稳定性

### 🔴 S0 - 数据丢失/安全风险（最高优先级）

| Issue | 标题 | 状态 | 关联 Fix PR |
|---|---|---|---|
| [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | delegate 工具绕过父级工具白名单 | accepted, no-stale | 无 |
| [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) | WeChat 同步游标先于消息入队持久化，崩溃丢失消息 | in-progress | 无 |

### 🟠 S1 - 工作流阻塞

| Issue | 标题 | 状态 | 关联 Fix PR |
|---|---|---|---|
| [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | Web 仪表盘退出聊天窗口导致 Agent 停止工作 | in-progress | 无 |
| [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | 停止 Agent 时清除工具调用和思考上下文 | accepted | 无 |
| [#8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) | WhatsApp Web 设备链接被新 passkey 门禁阻断 | in-progress | 无 |

### 🟡 S2 - 功能降级

| Issue | 标题 | 状态 | 关联 Fix PR |
|---|---|---|---|
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | Windows 74 个测试失败 | in-progress | [#10703](https://github.com/zeroclaw-labs/zeroclaw/pull/10703)（部分修复 Clippy） |
| [#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) | Windows 僵尸进程占用端口 | accepted | 无 |
| [#9028](https://github.com/zeroclaw-labs/zeroclaw/issues/9028) | Windows Ctrl+C 强制退出 | in-progress | 无 |
| [#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089) | 工具输出不支持 [AUDIO:] 标记 | accepted | 无 |
| [#9177](https://github.com/zeroclaw-labs/zeroclaw/issues/9177) | Qwen3.6-35B JIT 加载失败 | accepted | 无 |

**关键观察：** Windows 平台问题集中爆发（#7462、#8800、#9028），且多数尚无对应 Fix PR。S0 级安全漏洞 #8279（delegate 工具白名单绕过）自 6 月 24 日报告以来已近 3 个月，仍未进入修复阶段，建议维护者提升优先级。

---

## 6. 功能请求与路线图信号

### 明确的功能请求（Enhancement Issues）

| Issue | 标题 | 优先级 | 可能进入下一版本？ |
|---|---|---|---|
| [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) | CI 测试矩阵扩展到 Windows/macOS | P2 | ✅ 高概率（与 #7462 联动） |
| [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) | 改进 Rust 构建缓存与 CI 关键路径 | P2 | ✅ 高概率（CI 优化刚需） |
| [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) | 统一发布签名机制 | P1 | ✅ 高概率（已 accepted） |

### 已有 PR 支撑的功能方向

| 方向 | 代表 PR | 成熟度 |
|---|---|---|
| 安全架构升级（RFC 7141） | [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) 等 7 个堆叠 PR | ⚠️ 依赖链复杂，需逐步合并 |
| 新频道支持（Sendblue iMessage/SMS） | [#10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768) | ✅ 独立 PR，可快速合并 |
| Hailo-Ollama 硬件加速提供商 | [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | ⚠️ 标记 do-not-merge，需进一步验证 |
| OIDC 身份认证 | [#10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270) | ⚠️ 依赖堆叠链 |

**路线图信号：** 下一版本（推测 v0.9.0）的核心主题将是**安全架构重构**（RFC 7141 全栈实施）与**跨平台可靠性**（Windows/macOS CI 覆盖）。频道扩展（Sendblue）和 CI 性能优化可能作为次要目标并行推进。

---

## 7. 用户反馈摘要

### 真实痛点提炼

1. **Windows 用户被边缘化**（来自 #7462、#8800、#9028）：
   > "CI does not catch this because the Test job only runs on Linux" — @NiuBlibing
   
   Windows 用户无法在本地运行测试套件，且运行时存在僵尸进程、Ctrl+C 强制退出等问题，体验显著低于 Linux。

2. **Web 仪表盘中断工作流**（来自 #8559、#8794）：
   > "This completely blocks from doing stuff while the agent is working or even looking at his files" — @susyabashti
   
   用户期望 Agent 在后台持续工作，但退出聊天窗口或手动停止会丢失全部进度，这是工作流层面的设计缺陷。

3. **治理流程摩擦**（来自 #10549）：
   > "That timer often does not produce more review. Some RFCs sit for the full window with zero new comments" — @Audacity88
   
   强制讨论窗口并未带来更多审查，反而拖慢了决策速度。

4. **安全与便利的张力**（来自 #8279）：
   > "sub-agent can invoke tools the parent policy excludes" — @wangmiao0668000666
   
   用户对 delegate 工具的安全边界有明确预期，当前实现违背了最小权限原则。

### 满意度信号

- **正面：** 社区贡献者参与度高（@Audacity88、@JordanTheJet 持续提交高质量 PR），RFC 流程虽慢但仍在运转。
- **负面：** 50 条 PR 积压未合并，部分 Issue 已等待 2-3 个月无实质进展，维护者响应速度需提升。

---

## 8. 待处理积压

### ⚠️ 长期未响应的高优先级 Issue（>30 天）

| Issue | 标题 | 创建日期 | 已等待 | 建议行动 |
|---|---|---|---|---|
| [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | delegate 绕过工具白名单（S0） | 2026-06-24 | 79 天 | 🔴 立即安排修复 |
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | Windows 74 个测试失败 | 2026-06-10 | 93 天 | 🟠 与 #7461 合并处理 |
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | Telegram 媒体组批量处理 | 2026-04-08 | 156 天 | 🟡 确认是否纳入路线图 |
| [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) | Nextcloud Talk API 错误 | 2026-04-27 | 137 天 | 🟡 标记 blocked，需解除阻塞 |

### 📦 待合并 PR 积压（按风险排序）

| PR | 标题 | 风险 | 等待时间 | 阻塞因素 |
|---|---|---|---|---|
| [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) | git 操作允许根目录修复 | high | 17 天 | needs-author-action |
| [#10417](https://github.com/zeroclaw-labs/zeroclaw/pull/10417) | 终端回退实时交付 | high | 15 天 | needs-author-action |
| [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) | git 子命令风险分类器修复 | high | 41 天 | needs-author-action |
| [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) | 安全架构系列（堆叠链起点） | medium | 20 天 | 依赖链复杂，需按序合并 |

**维护者行动建议：**
1. 优先处理 S0 级安全 Issue #8279，该漏洞已暴露 79 天
2. 对标记 `needs-author-action` 的 PR 进行批量提醒或关闭
3. 评估 @JordanTheJet 的安全架构堆叠 PR 链，制定分阶段合并计划
4. 将 Windows CI 矩阵（#7461）纳入下一里程碑，解决跨平台测试盲区

---

*报告结束。数据截至 2026-09-11 00:00 UTC。*

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报

**日期：2026-09-11**

---

## 1. 今日速览

PicoClaw 项目今日活跃度中等偏低。过去 24 小时内无新版本发布，无 PR 被合并或关闭，7 条 PR 全部处于待合并状态，其中 5 条为 dependabot 自动依赖更新。Issues 方面有 2 条更新，其中 1 条已关闭（#3265），1 条仍处于开放状态（#3349）。值得关注的是，社区贡献者已针对 #3265 的 deltachat 通道配置验证错误提交了修复 PR（#3376），显示出社区自愈能力。整体来看，项目处于常规维护节奏，无重大事件发生。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日无 PR 被合并或关闭，项目代码库无实质性推进。但以下待合并 PR 值得关注：

- **[#3376 fix(deltachat): initialize as custom channel to solve config validation error](https://github.com/sipeed/picoclaw/pull/3376)** — 由社区贡献者 @luisgdev 提交，直接修复了 #3265 中报告的 deltachat 通道配置验证失败问题。该 PR 将 deltachat 注册为自定义通道类型，解决了 `channel "deltachat" has unknown type "deltachat"` 的启动错误。这是今日最具价值的社区贡献，一旦合并将解决一个已存在近两个月的用户阻塞问题。

- **[#3371 feat(providers): add opencode-go provider with session header support](https://github.com/sipeed/picoclaw/pull/3371)** — 新增 `opencode-go` provider 支持，自动根据模型 ID 路由到正确的端点，并携带 `x-opencode-session` 会话头。这是一个功能性增强，扩展了 PicoClaw 的 AI 提供商生态。

---

## 4. 社区热点

今日讨论最活跃的内容：

- **[#3265 Gateway startup fails with 'channel deltachat has unknown type deltachat'](https://github.com/sipeed/picoclaw/issues/3265)** — 6 条评论，1 个 👍，已于昨日（9 月 10 日）关闭。该 Issue 自 7 月 19 日创建以来持续受到关注，核心问题是即使未在 config.json 中配置 deltachat，网关启动仍会报错。社区成员 @luisgdev 主动提交了修复 PR（#3376），体现了良好的社区协作氛围。

- **[#3349 QQ频道无法正常使用](https://github.com/sipeed/picoclaw/issues/3349)** — 4 条评论，仍处于开放状态。用户报告 QQ 频道在 Docker 和 Linux x86 版本中均无法正常使用，错误信息显示 `Authorization参数格式错误`（code: 401）。该问题涉及 QQ 官方 API 的鉴权机制，可能影响大量使用 QQ 频道的国内用户。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 | 是否有 Fix PR |
|---------|-------|------|------|--------------|
| 🔴 高 | [#3349 QQ频道无法正常使用](https://github.com/sipeed/picoclaw/issues/3349) | QQ 频道 websocket 连接返回 401 鉴权错误，Docker 和 Linux 版本均受影响 | 开放中 | ❌ 无 |
| 🟡 中 | [#3265 deltachat 通道配置验证错误](https://github.com/sipeed/picoclaw/issues/3265) | 未配置 deltachat 时网关启动仍报 unknown type 错误 | 已关闭 | ✅ [#3376](https://github.com/sipeed/picoclaw/pull/3376) |

**分析**：#3349 的 QQ 频道鉴权问题目前无修复方案，且涉及第三方平台 API 变更，可能需要等待上游适配或官方介入。#3265 已有社区修复 PR 待合并，预计短期内可解决。

---

## 6. 功能请求与路线图信号

- **AI Provider 扩展**：[#3371](https://github.com/sipeed/picoclaw/pull/3371) 新增 opencode-go provider，表明社区对更多 AI 后端接入有持续需求。该 PR 引入了会话头支持，暗示未来 PicoClaw 可能向多会话、多模型路由方向发展。

- **QQ 频道稳定性**：[#3349](https://github.com/sipeed/picoclaw/issues/3349) 的持续存在表明 QQ 频道是 PicoClaw 在中国市场的重要使用场景，维护者可能需要优先处理该平台的兼容性问题。

- **依赖更新**：5 条 dependabot PR（[#3360](https://github.com/sipeed/picoclaw/pull/3360)、[#3361](https://github.com/sipeed/picoclaw/pull/3361)、[#3362](https://github.com/sipeed/picoclaw/pull/3362)、[#3363](https://github.com/sipeed/picoclaw/pull/3363)、[#3364](https://github.com/sipeed/picoclaw/pull/3364)）均为常规安全/版本更新，无破坏性变更迹象。

---

## 7. 用户反馈摘要

- **deltachat 用户**（来自 #3265）：用户困惑于"未配置 deltachat 却报 deltachat 错误"的行为，反映出配置验证逻辑存在设计缺陷——不应在通道未启用时仍进行类型校验。社区贡献者主动修复，说明该问题对部分用户造成了实际阻塞。

- **QQ 频道用户**（来自 #3349）：用户尝试了 Docker 和 Linux x86 两种部署方式均失败，错误码 `11241` 和 `40011005` 指向 QQ 官方 API 的鉴权格式问题。用户提供了详细的错误日志，但问题至今未解决，可能影响用户对项目稳定性的信心。

- **整体反馈**：社区成员展现出较强的自助修复意愿（如 @luisgdev 主动提交 PR），但核心维护者对 Issue 和 PR 的响应速度有待提升——#3265 从创建到关闭历时近两个月，#3349 已开放 12 天仍无维护者回复。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 创建时间 | 状态 | 关注点 |
|------|------|------|---------|------|--------|
| Issue | [#3349](https://github.com/sipeed/picoclaw/issues/3349) | QQ频道无法正常使用 | 2026-08-30 | 开放 12 天 | 高优先级，影响国内用户，无维护者响应 |
| PR | [#3376](https://github.com/sipeed/picoclaw/pull/3376) | fix(deltachat): initialize as custom channel | 2026-09-10 | 待合并 1 天 | 修复已验证的 Bug，建议尽快 review |
| PR | [#3371](https://github.com/sipeed/picoclaw/pull/3371) | feat(providers): add opencode-go provider | 2026-09-08 | 待合并 3 天 | 功能性增强，需评估代码质量 |
| PR | [#3360](https://github.com/sipeed/picoclaw/pull/3360) ~ [#3364](https://github.com/sipeed/picoclaw/pull/3364) | dependabot 依赖更新 ×5 | 2026-09-03 | 待合并 8 天 | 常规更新，建议批量处理 |

**维护者提醒**：#3349 已开放 12 天且无任何维护者回复，建议尽快确认是否为 QQ 官方 API 变更所致，并给出临时解决方案或时间表。#3376 是社区贡献的高质量修复，建议优先 review 合并。

---

*报告生成时间：2026-09-11 | 数据来源：github.com/sipeed/picoclaw*

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报

**日期**：2026-09-11
**数据来源**：[github.com/qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)

---

## 1. 今日速览

NanoClaw 今日整体活跃度中等偏上，过去 24 小时共产生 1 条 Issue 更新和 6 条 PR 更新，无新版本发布。Issue 侧仅有一条已关闭的 bug 报告，且已有对应修复 PR 合并，闭环效率较高。PR 侧呈现"3 开 3 闭"的均衡格局，其中 3 条关闭的 PR 全部集中在 `setup`/`agent-runner` 核心区域，表明项目当前正处于安装验证与运行器稳定性加固阶段。整体来看，项目健康度良好，核心团队响应及时，社区贡献者参与度稳定。

---

## 2. 版本发布

今日无新版本发布。最新版本仍为 2.3.0（commit `2c754a2`），近期合并的多个修复预计将累积至下一补丁版本。

---

## 3. 项目进展

过去 24 小时内有 3 条 PR 被合并/关闭，均涉及核心基础设施的稳定性改进：

### ✅ [PR #3760] fix(setup): verify sees a nohup-started host when systemd has no user instance
- **作者**：@glifocat
- **链接**：https://github.com/nanocoai/nanoclaw/pull/3760
- **进展**：修复了 `setup verify` 在 systemd 用户实例不可达时无法识别通过 nohup 启动的主机进程的问题。该 PR 直接关闭了 Issue #3759，是今日最完整的"报告→修复→合并"闭环案例。

### ✅ [PR #3708] fix(agent-runner): set busy_timeout before journal_mode on outbound open
- **作者**：@davekim917
- **链接**：https://github.com/nanocoai/nanoclaw/pull/3708
- **进展**：调整了 SQLite 连接初始化中两条 PRAGMA 语句的执行顺序。`journal_mode` 会获取数据库文件的排他锁，而 `busy_timeout` 是让并发连接等待锁释放的关键机制——顺序颠倒会导致 `busy_timeout` 失效，进而引发 `SQLITE_BUSY` 错误。此修复直接提升了 agent-runner 在并发场景下的数据库可靠性。

### ✅ [PR #3707] feat(agent-runner): add registerAdmissionGate poll-loop seam
- **作者**：@davekim917
- **链接**：https://github.com/nanocoai/nanoclaw/pull/3707
- **进展**：在 agent-runner 的外层轮询循环中新增了 `registerAdmissionGate` 接入点，位于现有 abort 检查之后。这是一个可扩展性改进，为后续引入准入控制、资源配额或灰度发布等机制预留了标准化的扩展缝。

**综合评估**：今日合并的 3 条 PR 分别覆盖了安装验证、数据库并发安全和轮询循环扩展性三个维度，项目在核心运行时的健壮性上向前迈进了坚实一步。

---

## 4. 社区热点

今日社区互动整体较为安静，无高评论量或高反应量的条目。唯一有评论的 Issue 为：

### [Issue #3759] verify reports SERVICE: not_found for a nohup-started host when systemd has no user instance
- **作者**：@glifocat
- **评论数**：1
- **链接**：https://github.com/nanocoai/nanoclaw/issues/3759
- **热点分析**：该 Issue 揭示了 NanoClaw 在非标准 systemd 环境（systemd 为 PID 1 但用户实例不可达）下的验证盲区。作者不仅报告了问题，还主动提交了修复 PR（#3760），体现了社区成员从"问题报告者"向"问题解决者"转变的积极态势。背后的诉求是：**NanoClaw 的安装验证逻辑需要覆盖更多非典型部署场景**，尤其是那些 systemd 存在但功能受限的容器化或最小化 Linux 环境。

---

## 5. Bug 与稳定性

### 🔴 已修复（今日关闭）

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| **中** | [#3759](https://github.com/nanocoai/nanoclaw/issues/3759) | `setup verify` 在 systemd 用户实例不可达时误报 `SERVICE: not_found`，导致验证失败 | ✅ 已由 PR #3760 修复并合并 |
| **中** | [#3708](https://github.com/nanocoai/nanoclaw/pull/3708) | SQLite `busy_timeout` 在 `journal_mode` 之后设置，导致并发场景下 `SQLITE_BUSY` 错误 | ✅ 已合并 |

### 🟡 待合并修复

| 严重程度 | PR | 描述 | 状态 |
|---------|-----|------|------|
| **低** | [#3757](https://github.com/nanocoai/nanoclaw/pull/3757) | `verify.ts` 中环境变量中的凭据可能导致误判通道已配置 | ⏳ 待合并 |
| **低** | [#3758](https://github.com/nanocoai/nanoclaw/pull/3758) | Setup 门户提醒会重复询问操作者已回答过的问题 | ⏳ 待合并 |
| **低** | [#3689](https://github.com/nanocoai/nanoclaw/pull/3689) | 快照功能对符号链接根目录的可变路径处理不正确 | ⏳ 待合并（已开放 11 天） |

**稳定性评估**：今日无新的严重崩溃或回归报告。已修复的两个 bug 均属于中等严重程度，且修复速度较快（Issue #3759 从报告到修复合并仅用 1 天）。待合并的 3 条修复均为低严重程度，不影响核心功能。

---

## 6. 功能请求与路线图信号

今日无直接的功能请求 Issue，但以下 PR 透露出路线图信号：

### 📌 准入控制机制（Admission Gate）
- **PR #3707**（已合并）引入了 `registerAdmissionGate` 扩展缝，位于 agent-runner 轮询循环的入口处。这暗示项目正在为**消息处理的前置准入控制**做准备，未来可能支持：
  - 基于资源使用率的动态限流
  - 消息优先级队列
  - 灰度发布/金丝雀部署的流量控制

### 📌 快照系统符号链接支持
- **PR #3689**（待合并）修复了快照功能对符号链接根目录的处理。这表明快照/恢复功能正在被实际使用，且用户场景中包含了符号链接目录结构，项目需要完善对这类非标准文件系统布局的支持。

**下一版本预测**：基于当前积压的 PR 标签分布（3 条 `area/setup-installation`，1 条 `area/core`），下一补丁版本（预计 2.3.1 或 2.4.0）将重点改善安装验证体验和快照功能的边缘场景。

---

## 7. 用户反馈摘要

今日用户反馈集中在 Issue #3759 中，核心痛点如下：

> **部署环境多样性挑战**：用户 @glifocat 的部署环境中，systemd 作为 PID 1 运行，但用户实例（`systemctl --user`）无法连接（返回 `Failed to connect to bus`）。NanoClaw 的 `setup/service.ts` 在这种情况下会回退到 nohup 启动方式，但 `verify` 步骤的检测逻辑未同步适配这一回退路径，导致主机明明在正常运行却被判定为 `not_found`。

**反馈要点**：
- 用户对 NanoClaw 在非标准 systemd 环境下的行为有明确预期：**回退机制应该端到端一致**，即 service 启动时回退到 nohup，verify 验证时也应能识别 nohup 启动的进程。
- 用户不仅报告了问题，还主动提交了修复，说明社区对项目的**代码贡献门槛较低，文档和代码结构清晰**，有利于快速上手。

---

## 8. 待处理积压

### ⚠️ 长期未合并的 PR

| PR | 标题 | 作者 | 开放天数 | 状态 |
|----|------|------|---------|------|
| [#3689](https://github.com/nanocoai/nanoclaw/pull/3689) | fix(update): snapshot symlinked mutable roots | @linhongyu510 | **11 天** | 待合并 |

**提醒**：PR #3689 已开放 11 天，涉及快照功能对符号链接根目录的处理。该 PR 关联 Issue #3684，属于用户实际使用中遇到的边缘场景。建议维护者优先审查，避免因积压过久导致合并冲突或贡献者流失。

### 📊 积压健康度

当前无超过 30 天未响应的 Issue 或 PR。项目整体响应速度良好，核心团队对 `area/setup-installation` 和 `area/agent-runner` 区域的关注度较高。

---

**报告生成时间**：2026-09-11
**分析师**：AI 智能体开源项目分析师

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报

**日期：2026-09-11**

---

## 1. 今日速览

IronClaw 项目今日整体活跃度处于**中等偏低**水平。过去 24 小时内无新版本发布，Issue 侧仅有一条自动化失败分类报告（#8093），社区讨论热度较低。PR 侧则呈现典型的 Dependabot 依赖更新潮特征：8 条 PR 中 5 条为自动化依赖升级，仅 3 条为实质性代码变更。值得关注的是，两个功能性 PR（#8072 Telegram 命令菜单注册、#8092 WebUI IME 输入修复）于今日关闭/活跃推进，表明核心功能迭代仍在持续，但整体节奏偏向维护性工作。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 已合并/关闭的 PR（2 条）

| PR | 标题 | 状态 | 影响 |
|---|---|---|---|
| [#8072](https://github.com/nearai/ironclaw/pull/8072) | feat(telegram): register the Bot API command menu at activation | ✅ 已关闭 | Telegram 扩展在激活时通过 `setMyCommands` 注册 `/model`、`/status`、`/new`、`/stop`、`/interrupt` 等命令菜单，并在停用时尽力清理。提升了 Telegram 渠道的用户交互可发现性。 |
| [#8080](https://github.com/nearai/ironclaw/pull/8080) | chore(deps): bump everything-else group (21 updates) | ✅ 已关闭 | Rust 依赖批量升级（uuid、base64、rust_decimal 等 21 项），被更新的 #8097 所取代。 |

### 活跃中的实质性 PR（3 条）

- **[#8092](https://github.com/nearai/ironclaw/pull/8092) fix(webui): preserve IME composition in the chat composer** — 修复 WebUI 聊天输入框在中文/日文等 IME 输入法组合期间的按键处理问题，避免 Enter 误发送和命令菜单误触发。对东亚用户输入体验有直接改善。
- **[#8090](https://github.com/nearai/ironclaw/pull/8090) fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension** — 修复托管 MCP 服务器在多用户场景下工具目录互相覆盖的严重缺陷。此前目录按扩展 ID 共享单一槽位，后发现的用户会覆盖先前用户的工具列表。
- **[#8097](https://github.com/nearai/ironclaw/pull/8097) chore(deps): bump everything-else group (24 updates)** — 取代 #8080 的新一轮 Rust 依赖批量升级。

**整体评估**：项目今日推进了 2 个功能性修复（IME 输入、MCP 多用户隔离），均为用户体验和正确性层面的实质改进。依赖维护工作正常运转，无积压风险。

---

## 4. 社区热点

今日社区互动极为冷清。唯一 Issue（#8093）和所有 PR 的评论数均为 0，无 👍 反应。**无热点讨论可报告**。

这一现象本身值得注意：项目当前处于"自动化驱动"状态，Dependabot 贡献了大部分 PR 流量，而人类贡献者的讨论和互动处于低位。建议维护者关注社区参与度的持续性。

---

## 5. Bug 与稳定性

### 已报告的 Bug / 失败分类

| 严重程度 | 来源 | 描述 | Fix PR |
|---|---|---|---|
| 🟡 中 | [#8093](https://github.com/nearai/ironclaw/issues/8093) | 每日失败分类报告：officeqa 套件 42 个非通过任务中，绝大多数为 DeepSeek-V4-Flash 模型的真实推理错误（navigate 类任务），非基础设施故障 | 无（模型能力问题，非代码缺陷） |

### 已修复的 Bug（PR 已关闭或活跃）

| 严重程度 | PR | 描述 |
|---|---|---|
| 🔴 高 | [#8090](https://github.com/nearai/ironclaw/pull/8090) | 托管 MCP 多用户工具目录互相覆盖 — 数据隔离缺陷，可能导致用户 A 调用到用户 B 的工具 |
| 🟡 中 | [#8092](https://github.com/nearai/ironclaw/pull/8092) | WebUI IME 组合输入期间 Enter 误发送 / 命令菜单误触发 |

**稳定性总结**：今日无基础设施级故障报告。MCP 多用户覆盖问题属于高优先级正确性缺陷，已有活跃修复 PR。officeqa 失败集中在模型推理能力边界，不构成工程稳定性风险。

---

## 6. 功能请求与路线图信号

今日无用户主动提交的功能请求 Issue。从活跃 PR 推断近期路线图方向：

1. **多用户隔离强化**（[#8090](https://github.com/nearai/ironclaw/pull/8090)）：托管 MCP 场景下的 per-caller 目录隔离，暗示项目正在向多租户 SaaS 形态演进。
2. **国际化输入体验**（[#8092](https://github.com/nearai/ironclaw/pull/8092)）：IME 组合输入修复，表明东亚市场用户群体正在增长。
3. **Telegram 渠道体验优化**（[#8072](https://github.com/nearai/ironclaw/pull/8072)）：命令菜单注册，提升 Bot 交互的可发现性。

以上均为增量改进，无重大新功能信号。

---

## 7. 用户反馈摘要

今日 Issue 和 PR 均无用户评论，**无直接用户反馈可提炼**。

从 [#8093](https://github.com/nearai/ironclaw/issues/8093) 的自动化报告中可间接推断：用户（或内部测试）正在通过 officeqa 基准套件持续验证模型在办公场景的导航能力，当前 DeepSeek-V4-Flash 在 navigate 类任务上存在系统性短板，可能影响依赖该模型的用户体验。

---

## 8. 待处理积压

### 长期未关闭的实质性 PR

| PR | 标题 | 创建日期 | 已等待 | 状态 |
|---|---|---|---|---|
| [#8090](https://github.com/nearai/ironclaw/pull/8090) | fix(mcp): key discovered hosted-MCP catalogs per caller | 2026-09-08 | 3 天 | 仍 OPEN，高优先级正确性修复，建议加速审查 |

### 持续滚动更新的依赖 PR

Dependabot 的依赖升级 PR 流转正常（#8080 已被 #8097 取代），无积压风险。

### 观察建议

- **#8090 已等待 3 天**，涉及多用户数据隔离的正确性缺陷，建议维护者优先审查合并。
- 项目整体 Issue 响应速度正常，无长期无人响应的 Issue。

---

*报告生成时间：2026-09-11 | 数据来源：github.com/nearai/ironclaw*

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报

**日期：2026-09-11**

---

## 1. 今日速览

过去 24 小时，LobsterAI 项目在 PR 层面呈现出**高度活跃**态势，共产生 13 条 PR 更新，其中 10 条已合并/关闭，3 条仍处于待合并状态。所有已关闭 PR 均由同一作者 `@btc69m979y-dotcom` 提交，内容聚焦于 OpenClaw v2026.8.1 升级后的兼容性修复与配置优化，表明项目正处于**上游依赖升级后的集中适配期**。Issues 侧无新增或活跃记录，社区讨论热度集中在代码贡献层面。整体项目健康度良好，响应速度较快（多数 PR 在 24 小时内完成合并），但依赖机器人（dependabot）的 3 条 PR 已滞留约一个月，需关注。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日合并/关闭的 10 条 PR 集中解决了 OpenClaw v2026.8.1 升级引入的多个兼容性问题，核心进展如下：

### 3.1 Gateway 启动稳定性修复（高优先级）

- **[#2647](https://github.com/netease-youdao/LobsterAI/pull/2647)** — 修复损坏的 workspace attestation 文件（如全 NUL 字节）阻塞 Gateway 启动的问题，在启动前自动隔离并备份无效标记文件。
- **[#2642](https://github.com/netease-youdao/LobsterAI/pull/2642)** — 修复旧版会话迁移中因重复 session header 导致归档验证失败、Gateway 无法启动的问题。
- **[#2649](https://github.com/netease-youdao/LobsterAI/pull/2649)** — 完成 Gateway 启动状态迁移的收尾工作，解决设备身份仍存留于 JSON 导致 preflight 跳过自动迁移的问题。

### 3.2 配置同步与重启优化

- **[#2644](https://github.com/netease-youdao/LobsterAI/pull/2644)** — 修复配置同步时 Gateway 因短暂就绪探针超时而反复显示引擎启动页的问题，同时避免 `agents.defaults.sessionStore` 字段在 LobsterAI 与上游之间反复补入/移除。
- **[#2648](https://github.com/netease-youdao/LobsterAI/pull/2648)** — 去除 IM 配置保存时的重复重启，MCP 配置改用 OpenClaw 原生热重载，减少不必要的 Gateway 重启次数。

### 3.3 用户可控的模型成本优化

- **[#2641](https://github.com/netease-youdao/LobsterAI/pull/2641)** — 将 OpenClaw 默认开启的自动 Skill 审查改为**用户主动开启**（opt-in），避免长任务后产生大量额外模型调用费用。
- **[#2643](https://github.com/netease-youdao/LobsterAI/pull/2643)** — 新增「启用压缩前记忆保存」开关，默认关闭，由用户根据 token 成本自行决定是否开启。

### 3.4 会话模型选择行为修正

- **[#2640](https://github.com/netease-youdao/LobsterAI/pull/2640)** — 显式写入 `agents.defaults.modelSelectionScope = "session"`，确保会话内的模型切换仅影响当前会话，不再意外写回默认偏好。

### 3.5 UI/渲染层修复

- **[#2645](https://github.com/netease-youdao/LobsterAI/pull/2645)** — 修复 Windows 上引擎启动失败对话框折叠后按钮点击被窗口拖拽区域吞掉的问题。
- **[#2646](https://github.com/netease-youdao/LobsterAI/pull/2646)** — 修复定时任务历史日期筛选向 OpenClaw 发送不支持的参数导致请求被拒的问题，改为本地筛选。

**整体评估**：项目在 OpenClaw v2026.8.1 升级后迅速完成了从启动稳定性、配置同步到 UI 交互的全链路适配，体现了较强的工程响应能力。

---

## 4. 社区热点

过去 24 小时无 Issues 活跃记录，PR 评论数据缺失（均为 `undefined`），无法从评论/反应维度判断热点。但从 PR 的密集程度和主题集中度来看，**OpenClaw v2026.8.1 升级适配**是当前社区（至少是核心贡献者）最关注的话题。

- 相关 PR 序列：[#2640](https://github.com/netease-youdao/LobsterAI/pull/2640) → [#2641](https://github.com/netease-youdao/LobsterAI/pull/2641) → [#2642](https://github.com/netease-youdao/LobsterAI/pull/2642) → [#2643](https://github.com/netease-youdao/LobsterAI/pull/2643) → [#2644](https://github.com/netease-youdao/LobsterAI/pull/2644) → [#2645](https://github.com/netease-youdao/LobsterAI/pull/2645) → [#2646](https://github.com/netease-youdao/LobsterAI/pull/2646) → [#2647](https://github.com/netease-youdao/LobsterAI/pull/2647) → [#2648](https://github.com/netease-youdao/LobsterAI/pull/2648) → [#2649](https://github.com/netease-youdao/LobsterAI/pull/2649)

**背后诉求**：上游 OpenClaw 的版本升级引入了多项行为变更（自动 Skill 审查、模型选择 scope、记忆保存策略、Gateway 启动校验等），核心贡献者正在系统性地将这些变更对 LobsterAI 用户的影响降至最低，同时将部分上游默认行为转为用户可控选项。

---

## 5. Bug 与稳定性

### 严重（已修复 ✅）

| 问题 | 影响 | 修复 PR |
|------|------|---------|
| 损坏的 workspace attestation 文件导致 Gateway 无法启动 | 所有升级到 v2026.8.1 且存在旧版标记文件的用户 | [#2647](https://github.com/netease-youdao/LobsterAI/pull/2647) |
| 旧版会话迁移因重复 session header 阻塞 Gateway 启动 | 存在旧版 transcript 的用户 | [#2642](https://github.com/netease-youdao/LobsterAI/pull/2642) |
| 设备身份残留 JSON 导致 Gateway preflight 跳过自动迁移 | 迁移后仍可能退出的用户 | [#2649](https://github.com/netease-youdao/LobsterAI/pull/2649) |

### 中等（已修复 ✅）

| 问题 | 影响 | 修复 PR |
|------|------|---------|
| 配置同步时 Gateway 反复显示引擎启动页 | 用户体验受损 | [#2644](https://github.com/netease-youdao/LobsterAI/pull/2644) |
| IM 配置保存触发重复重启 | Gateway 重启两次 | [#2648](https://github.com/netease-youdao/LobsterAI/pull/2648) |
| 会话模型切换意外写回默认偏好 | 用户默认模型被意外修改 | [#2640](https://github.com/netease-youdao/LobsterAI/pull/2640) |

### 轻微（已修复 ✅）

| 问题 | 影响 | 修复 PR |
|------|------|---------|
| Windows 上折叠对话框按钮不可点击 | 无法恢复/快速修复 | [#2645](https://github.com/netease-youdao/LobsterAI/pull/2645) |
| 定时任务历史日期筛选请求被拒 | 功能不可用 | [#2646](https://github.com/netease-youdao/LobsterAI/pull/2646) |

**稳定性总结**：今日报告的 Bug 均已有对应修复 PR 且已合并，无未解决的已知问题。Bug 来源主要为 QA 反馈和上游升级适配，说明项目在发布前有较完善的测试流程。

---

## 6. 功能请求与路线图信号

今日无来自用户的新功能请求（Issues 为 0）。但从已合并的 PR 中可以识别出以下**产品方向信号**：

1. **模型成本可控性成为产品关注点**：连续两个 PR（[#2641](https://github.com/netease-youdao/LobsterAI/pull/2641)、[#2643](https://github.com/netease-youdao/LobsterAI/pull/2643)）将上游默认开启的模型调用行为改为用户 opt-in，表明团队正在积极管理用户的 token 成本预期。未来可能看到更多「成本可见性」相关功能。

2. **配置同步机制持续打磨**：[#2644](https://github.com/netease-youdao/LobsterAI/pull/2644) 和 [#2648](https://github.com/netease-youdao/LobsterAI/pull/2648) 均涉及配置同步与 Gateway 重启策略的优化，暗示 LobsterAI 与 OpenClaw 之间的配置桥接层仍在演进中，后续可能有更优雅的热重载方案。

3. **MCP 生态集成深化**：[#2648](https://github.com/netease-youdao/LobsterAI/pull/2648) 提到 MCP 配置改用 OpenClaw 原生热重载，说明 MCP 插件生态是当前集成重点。

---

## 7. 用户反馈摘要

过去 24 小时无 Issues 评论数据，无法直接提炼用户反馈。但从 PR 描述中引用的 QA 反馈可以间接了解用户痛点：

- **「Agent 编辑 IM 开关时 gateway 重启两次，安装 MCP 时有时也出现多次重启」**（来源：[#2648](https://github.com/netease-youdao/LobsterAI/pull/2648)）— 用户对重复重启的感知明显，影响使用流畅度。
- **「定时任务历史选择日期后请求被拒」**（来源：[#2646](https://github.com/netease-youdao/LobsterAI/pull/2646)）— 功能回归问题，用户无法正常使用定时任务历史查询。
- **「升级后 Gateway 无法启动，报 legacy workspace attestation invalid header」**（来源：[#2647](https://github.com/netease-youdao/LobsterAI/pull/2647)）— 升级阻断性问题，影响所有存在旧版标记文件的用户。

**整体反馈基调**：用户遇到的问题集中在升级后的兼容性和稳定性，团队响应迅速，所有已知问题均在当日完成修复。

---

## 8. 待处理积压

### 长期未合并的依赖更新 PR（⚠️ 需关注）

以下 3 条 dependabot PR 已滞留约 **1 个月**（创建于 2026-08-10，最后更新于 2026-09-10），均标记为 `stale`：

| PR | 依赖 | 目标版本 | 风险提示 |
|----|------|---------|---------|
| [#2459](https://github.com/netease-youdao/LobsterAI/pull/2459) | `@nodesecure/js-x-ray` | 14.3.0 → 16.0.0 | 跨 2 个大版本，可能有 breaking changes |
| [#2461](https://github.com/netease-youdao/LobsterAI/pull/2461) | `eslint-plugin-react-hooks` | 5.2.0 → 7.1.1 | 跨 2 个大版本，lint 规则可能有变化 |
| [#2464](https://github.com/netease-youdao/LobsterAI/pull/2464) | `react-dom` | 18.3.1 → 19.2.8 | React 19 有重大架构变更，需谨慎评估 |

**建议**：维护者需评估这些依赖升级的兼容性风险，尤其是 `react-dom` 19.x 的升级涉及 React 19 的并发渲染等重大变更，不宜长期搁置也不宜贸然合并。建议明确关闭或排期处理。

---

*报告生成时间：2026-09-11 | 数据来源：GitHub API | 分析范围：过去 24 小时*

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报

**日期：2026-09-11**


## 1. 今日速览

过去 24 小时内，Moltis 项目呈现出**以代码合流与问题收敛为主的维护型活跃状态**。共有 7 条 PR 更新（4 条待合并、3 条已关闭/合并）和 2 条 Issue 关闭，无新版本发布。值得关注的是，两个长期悬置的 Bug（#293 和 #279）在近期获得了对应的修复 PR 并已关闭，表明项目在稳定性治理上有所推进。整体活跃度处于中等水平，主要由 Dependabot 依赖更新和社区贡献者的功能增强驱动，核心维护者的响应节奏保持稳定。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

过去 24 小时内共有 **3 条 PR 完成合并/关闭**，其中 2 条为实质性修复，1 条为依赖更新：

| PR | 标题 | 类型 | 推进内容 |
|---|---|---|---|
| [#1252](https://github.com/moltis-org/moltis/pull/1252) | docs(docker): document the bind-mount permission fix for fresh deploys | 文档 | 针对全新 Docker Compose 部署时 `moltis.db` 无法创建的问题（#293），补充了 bind-mount 权限修复的文档说明，降低新用户首次部署的摩擦 |
| [#1260](https://github.com/moltis-org/moltis/pull/1260) | fix(exec): report missing shell accurately | Bug 修复 | 修复了当 `sh` 不在 PATH 中时 exec 工具误报"工作目录不存在"的问题（#279），通过正确分类 spawn `NotFound` 错误，使错误信息准确指向缺失的 shell |
| [#1256](https://github.com/moltis-org/moltis/pull/1256) | chore(deps-dev): bump browserslist | 依赖更新 | 将 `browserslist` 从 4.28.2 升级至 4.28.8，属于常规安全/兼容性维护 |

**整体评估**：项目在错误信息准确性、新用户部署体验和依赖安全三个维度均有小幅推进。两个 Bug 修复的落地标志着项目在工具链健壮性方面的持续投入。


## 4. 社区热点

今日关闭的 Issue 和合并的 PR 均无评论互动（评论数均为 0），社区讨论热度整体偏低。但从**问题解决链路**来看，以下两个闭环值得关注：

- **[#279](https://github.com/moltis-org/moltis/issues/279) → [#1260](https://github.com/moltis-org/moltis/pull/1260)**：用户 @elsbrock 于 3 月 1 日报告 exec 工具在 `sh` 不在 PATH 时给出误导性错误，时隔约 6 个月由 @be-student 提交修复 PR 并于昨日关闭。**背后诉求**：开发者希望工具的错误诊断能够精确定位根因，而非将问题归咎于无关的工作目录，这反映了对 CLI 工具可调试性的基本期待。

- **[#293](https://github.com/moltis-org/moltis/issues/293) → [#1252](https://github.com/moltis-org/moltis/pull/1252)**：用户 @temobard 于 3 月 2 日报告全新 Docker Compose 部署时缺少 db 文件，由 @Saraswat123 提交文档修复 PR 关闭。**背后诉求**：新用户的首次部署体验是开源项目转化率的关键环节，bind-mount 权限问题属于典型的"入门即踩坑"场景。

> 注：由于数据中评论数均为 0，无法进一步分析社区讨论热度。建议后续关注这些关闭 Issue 是否引发后续反馈。


## 5. Bug 与稳定性

### 已关闭（今日确认修复）

| 严重程度 | Issue | 描述 | 修复 PR | 状态 |
|---|---|---|---|---|
| 🟡 中 | [#279](https://github.com/moltis-org/moltis/issues/279) | exec 工具在 `sh` 不在 PATH 时误报"工作目录不存在"，掩盖真实错误原因 | [#1260](https://github.com/moltis-org/moltis/pull/1260) | ✅ 已合并 |
| 🟡 中 | [#293](https://github.com/moltis-org/moltis/issues/293) | 全新 Docker Compose 部署时缺少 db 文件，导致启动 panic | [#1252](https://github.com/moltis-org/moltis/pull/1252) | ✅ 已合并（文档修复） |

### 待合并的稳定性相关 PR

| PR | 描述 | 潜在影响 |
|---|---|---|
| [#1262](https://github.com/moltis-org/moltis/pull/1262) | 修复 cron 调度中 `active_hours` 的 `end="24:00"` 解析失败问题，当前 fail-open 导致任务在非活跃时段也执行 | 影响定时任务的执行准确性，属于中等优先级稳定性修复 |

**稳定性小结**：今日无新增 Bug 报告，两个历史 Bug 完成闭环。待合并队列中 #1262 涉及 cron 调度逻辑缺陷，建议优先审查。


## 6. 功能请求与路线图信号

今日无新功能请求 Issue。但待合并队列中的两个功能 PR 释放了明确的路线图信号：

| PR | 功能 | 路线图信号 |
|---|---|---|
| [#1258](https://github.com/moltis-org/moltis/pull/1258) | feat(external-agents): add direct AGY streaming | 为官方 `agy` CLI 添加一流的流式传输支持，复用 Google OAuth 会话，无需 Gemini CLI 或 API key。这表明项目正在**扩展外部 Agent 生态的接入能力**，降低用户使用门槛 |
| [#1253](https://github.com/moltis-org/moltis/pull/1253) | feat(reasoning): add max effort level | 在共享 `ReasoningEffort` schema 中新增 `max` 级别，并支持 `@reasoning-max` 模型后缀解析。这反映了项目在**推理深度控制**上的精细化演进，为用户提供更强的推理选项 |

**判断**：这两个 PR 均由 @GTanger 提交，且已活跃数日（分别创建于 9 月 2 日和 9 月 4 日），功能方向明确、代码量较大，有较大概率被纳入下一版本。建议维护者优先审查 #1258 的流式传输实现，因其涉及外部服务集成，需关注安全性和错误处理。


## 7. 用户反馈摘要

由于今日关闭的 Issues 评论数均为 0，无法提取直接的用户评论反馈。但从 Issue 内容本身可以提炼以下用户痛点：

- **部署体验痛点**（来自 #293）：用户 @temobard 在全新 Docker Compose 部署时遇到 db 文件缺失问题，且按照 Issue 模板完成了预检清单（搜索已有 issue、确认使用最新版本），说明用户遵循了贡献规范但仍遇到阻碍。这提示项目的**首次部署文档和默认配置仍有优化空间**。

- **错误信息质量痛点**（来自 #279）：用户 @elsbrock 在 Issue 中详细分析了根因（`sh` 不在 PATH 导致 spawn 失败，但错误信息指向工作目录），并指出了具体代码位置（`c...`）。这表明用户具备一定的技术深度，期望项目在**错误诊断的准确性**上达到更高标准。

**总体反馈基调**：用户对项目的贡献规范遵循度较高，反馈内容具体、有建设性，但互动讨论较少，社区尚未形成热烈的讨论氛围。


## 8. 待处理积压

### 长期未关闭的 PR（超过 7 天）

| PR | 标题 | 创建日期 | 已活跃天数 | 建议 |
|---|---|---|---|---|
| [#1253](https://github.com/moltis-org/moltis/pull/1253) | feat(reasoning): add max effort level | 2026-09-02 | 9 天 | 功能完整度高，建议维护者尽快 review |
| [#1258](https://github.com/moltis-org/moltis/pull/1258) | feat(external-agents): add direct AGY streaming | 2026-09-04 | 7 天 | 涉及外部集成，需关注安全审查 |
| [#1262](https://github.com/moltis-org/moltis/pull/1262) | fix(cron): treat active_hours end="24:00" as end-of-day | 2026-09-07 | 4 天 | 稳定性修复，建议优先合并 |

### 需关注的积压信号

- **Dependabot PR 堆积**：今日有 2 条 Dependabot 依赖更新 PR（#1263 待合并、#1256 已合并），其中 #1263 涉及 npm_and_yarn 组跨 2 个目录的 4 项更新。建议维护者建立依赖更新的自动化合并策略，避免安全更新长期滞留。

- **Issue 响应周期偏长**：#279 和 #293 均于 3 月初创建，直到 9 月才完成闭环，响应周期约 6 个月。虽然最终得到了解决，但建议项目考虑引入 Issue 优先级标签或 stale bot，以缩短用户等待时间。


**项目健康度总评**：Moltis 项目在代码合流和 Bug 修复方面保持稳定节奏，社区贡献者（@GTanger、@be-student、@Saraswat123）的参与度良好。主要改进空间在于 Issue 响应速度和社区讨论活跃度的提升。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报

**日期：** 2026-09-11
**数据来源：** github.com/agentscope-ai/CoPaw
**报告周期：** 过去 24 小时（截至 2026-09-10 UTC）

---

## 1. 今日速览

CoPaw 项目今日处于**高度活跃状态**，过去 24 小时内产生 21 条 Issue 更新（15 条新开/活跃，6 条关闭）和 35 条 PR 更新（23 条待合并，12 条已合并/关闭），并发布了 **v2.2.1-beta.2** 版本。社区讨论聚焦于多租户 Hub 路线图（#7318，24 条评论）、Windows 安全沙箱突破（#7672）、以及多个渠道层 Bug 修复。项目整体呈现"快速迭代 + 社区共议"的健康节奏，但 Windows 安全沙箱问题值得高度关注。

---

## 2. 版本发布

### v2.2.1-beta.2

**发布日期：** 2026-09-10
**Release 链接：** https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2

**主要变更：**
- **Console 移动端 Agent 选择器优化**（PR #7623）：改进了移动端 Agent 选择器的交互体验
- **CSS 选择器对齐修复**（PR #7643）：修复了 QwenPaw Console 的 CSS 选择器对齐问题
- **版本号升级**至 2.2.1b2

**破坏性变更：** 未报告
**迁移注意事项：** 此为 Beta 版本，建议生产环境用户等待正式版。安装验证 Issue（#7674）已由 GitHub Actions 自动创建，要求各平台在发布后 4 小时内完成四项检查点验证。

---

## 3. 项目进展

过去 24 小时内，以下重要 PR 已合并/关闭，推动了项目的实质性进展：

| PR | 标题 | 影响 |
|---|---|---|
| [#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) | fix(channels): support Base64 data URLs in outbound media | 修复了 WeCom/Telegram 等渠道发送 Base64 图片时的 OSError 崩溃，解决了 #7516 和 #7370 两个长期 Bug |
| [#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663) | fix(memory): fall back when plugin backend is unavailable | 当记忆插件后端不可用时，自动回退到内置 ReMeLight 后端，避免工作区启动失败 |
| [#7667](https://github.com/agentscope-ai/QwenPaw/pull/7667) | fix(files): show upload only in workspace | 文件上传按钮仅在 Workspace 标签页显示，避免在只读页面误操作 |
| [#6978](https://github.com/agentscope-ai/QwenPaw/pull/6978) | feat(commands): add session management slash commands | 为 IM 渠道和 HTTP 调用者新增 `/sessions` 和 `/session` 命令，补齐了非 Console 渠道的会话管理能力 |

**整体评估：** 项目在渠道兼容性（Base64 媒体支持）、系统韧性（记忆后端回退）和跨渠道功能一致性（会话管理命令）三个维度均有推进。

---

## 4. 社区热点

### 🔥 最热讨论

**#7318 — QwenPaw Hub 多租户版路线图讨论**
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/7318
- 评论：24 条 | 👍 4 | 创建于 2026-08-26，持续活跃至 09-10
- **诉求分析：** 社区反复要求团队协作/多用户能力，QwenPaw Hub 是官方首次回应。讨论集中在多租户权限模型、管理员技能管理、与现有单用户模式的兼容性。这是项目从"个人 AI 助手"向"团队 AI 平台"转型的关键信号。

**#7672 — Windows 安全沙箱被突破**
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/7672
- 评论：1 条 | 创建于 2026-09-10
- **诉求分析：** 报告者引用了知乎技术文章，声称 QwenPaw 2.2.0 在 Windows 上的安全沙箱可被突破。虽然评论数少，但安全类问题通常需要维护者优先响应。

**#7177 — 部署平台首页优化请求**
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/7177
- 评论：9 条 | 创建于 2026-08-20
- **诉求分析：** 用户反馈移动端操作入口位置不合理、按钮顺序易误触，反映了移动端用户体验的普遍痛点。

---

## 5. Bug 与稳定性

### 🔴 严重（安全/数据丢失）

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) | Windows 安全沙箱被突破 | OPEN，1 评论 | ❌ 无 |
| [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) | 模型回复意外从上下文中丢失（助手看不到自己刚说的话） | CLOSED，10 评论 | ✅ 已关闭（修复已合并） |
| [#7668](https://github.com/agentscope-ai/QwenPaw/issues/7668) | 邮件监控：持久化 last_uid=0 导致整个收件箱被重复处理 | OPEN，1 评论 | ❌ 无 |

### 🟡 中等（功能异常/体验退化）

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) | 飞书会话 queue consumer 卡死后静默无响应 | OPEN，4 评论 | ❌ 无 |
| [#7661](https://github.com/agentscope-ai/QwenPaw/issues/7661) | 错误的创建新会话（侧边栏重复创建） | OPEN，4 评论 | ❌ 无 |
| [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | `subagent_model` 配置无效，子代理始终继承父代理模型 | OPEN，1 评论 | ❌ 无（关联 #5992 待合并） |
| [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) | Hub 无法连接本地模型服务（127.0.0.1/LAN 地址） | OPEN，2 评论 | ❌ 无 |

### 🟢 已修复

| Issue | 标题 | 修复 PR |
|---|---|---|
| [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) | Chrome 下 Console 流式渲染直到回合结束才显示 | ✅ 已关闭 |
| [#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662) | Telegram 轮询在代理黑洞下静默死亡 | ✅ 已关闭 |
| [#7516](https://github.com/agentscope-ai/QwenPaw/issues/7516) | WeCom 无法发送 Base64 图片 | ✅ 由 #7647 修复 |
| [#7370](https://github.com/agentscope-ai/QwenPaw/issues/7370) | WeCom Base64 图片发送 OSError | ✅ 由 #7647 修复 |
| [#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666) | 本地模型无法从 HF 下载 | ✅ 已关闭 |

---

## 6. 功能请求与路线图信号

### 可能纳入下一版本的功能

| 功能请求 | 相关 PR | 状态 |
|---|---|---|
| **每会话模型覆盖**（#4901 关联） | [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) — Add per-session model overrides | Under Review，创建于 07-12，持续更新 |
| **RemeLight 独立记忆模型**（#7664） | 暂无直接 PR，但 [#7444](https://github.com/agentscope-ai/QwenPaw/pull/7444) 正在统一 ReMe 命令 | 需求已提出，架构基础正在搭建 |
| **图片自动降采样**（#7671） | 暂无 PR | 新提出，解决 2MiB 图片限制问题 |
| **文件面板语法高亮**（#7670） | 暂无 PR | 新提出，Console 体验优化 |
| **PawPort 导入流程** | [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) — feat(pawport) | OPEN，从 Codex/Qoder 导入配置 |
| **原生移动端体验** | [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) — DO NOT MERGE | 草稿阶段，Expo/React Native 方案 |

### 路线图信号解读

1. **多租户 Hub 是明确的战略方向**（#7318），预计在 2.2.x 系列中持续迭代
2. **记忆系统正在经历架构重构**（#7444、#7663、#7664），RemeLight 正在成为核心记忆引擎
3. **移动端体验是下一个重点**（#7378 原生 App 草稿 + #7177 移动端优化请求 + v2.2.1-beta.2 的移动端 Agent 选择器改进）

---

## 7. 用户反馈摘要

### 真实痛点

1. **移动端操作不便**（#7177）：用户明确表示"手机上每次操作都很紧张，怕误点到了停止"，操作入口位置不合理，反映了移动端 UI 设计的紧迫性。

2. **模型上下文丢失**（#7579）：用户报告"模型看不到自己刚说的话"，这是对话连续性的核心体验问题，已关闭但值得回归测试关注。

3. **飞书渠道稳定性**（#7534）：用户描述了"静默卡死"的完整链路——queue consumer 长驻卡死后，同一 session 的新消息无法新建消费者，导致用户完全无感知地失去响应。

4. **成本控制诉求**（#7664）：用户明确提出"使用昂贵的旗舰模型聊天时，后台记忆写入也会消耗同样昂贵的 Token，造成不必要的经济损失"，希望为记忆写入配置独立的轻量模型。

5. **本地模型部署困难**（#7666、#7445）：Windows 桌面版从 HuggingFace 下载模型报错，Hub 无法连接本地 API 服务，说明本地模型部署链路仍需打磨。

### 满意度信号

- 社区对 QwenPaw Hub 的推出反应积极（#7318 获 4 个 👍，24 条评论持续讨论）
- 维护者对 Bug 的响应速度较快（#7642 Chrome 流式渲染问题在 24 小时内关闭）
- 贡献者生态活跃，今日有多个 first-time-contributor PR（#7611、#7614、#6978）

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 标题 | 创建日期 | 状态 | 建议 |
|---|---|---|---|---|
| [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113) | 团队协作指令首次被忽略，需中断重试才生效 | 2026-04-08 | OPEN，2 评论 | 已挂起 5 个月，与 Hub 多租户方向相关，建议在 Hub 迭代中一并处理 |
| [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | 每任务模型选择 | 关联 #5992 | 仍 OPEN | 有 PR 在 Review 中，但已持续 2 个月，建议加速评审 |

### 长期未合并的 PR

| PR | 标题 | 创建日期 | 状态 | 建议 |
|---|---|---|---|---|
| [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | Add per-session model overrides | 2026-07-12 | Under Review | 已 2 个月，关联多个 Issue（#4901、#7676），建议优先合并 |
| [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) | Add reranker UI config panel | 2026-07-23 | Under Review | 已 1.5 个月，与记忆系统重构相关 |
| [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) | PawPort 导入流程 | 2026-08-13 | OPEN | 大型功能 PR，建议拆分评审 |
| [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) | 原生移动端体验 | 2026-08-28 | DO NOT MERGE | 草稿阶段，建议明确里程碑 |

---

## 项目健康度总结

| 维度 | 评估 | 趋势 |
|---|---|---|
| **活跃度** | 高（21 Issues + 35 PRs / 24h） | 📈 稳定 |
| **响应速度** | 良好（6 个 Issue 在 24h 内关闭） | 📈 改善 |
| **安全态势** | ⚠️ 需关注（Windows 沙箱突破报告待确认） | 📉 风险上升 |
| **社区参与** | 积极（多语言贡献者，first-time-contributor 活跃） | 📈 增长 |
| **技术债务** | 中等（#3113 挂起 5 个月，#5992 评审 2 个月） | ➡️ 持平 |

**建议维护者优先关注：**
1. 验证 #7672 Windows 安全沙箱问题
2. 加速 #5992 的合并（阻塞 #7676）
3. 关注飞书渠道的 queue consumer 卡死问题（#7534）

:::
