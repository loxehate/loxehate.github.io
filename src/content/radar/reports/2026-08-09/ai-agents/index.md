---
title: OpenClaw 生态日报
published: 2026-08-09
report: ai-agents
tags:
  - radar
  - AI
---
# OpenClaw 生态日报 2026-08-09

> Issues: 163 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-08-09 01:40 UTC

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

# OpenClaw 项目动态日报 — 2026-08-09

## 1. 今日速览

过去 24 小时，OpenClaw 项目保持高活跃度：163 条 Issue 更新（143 条新开/活跃、20 条关闭），500 条 PR 更新（185 条合并/关闭），并发布 v2026.6.33、v2026.6.34 两个安全强化版本。核心维护者 @steipete 集中提交了浏览器连接回收、Windows 环境变量兼容、冷启动延迟优化等多个修复 PR，响应积极。但项目仍有 2 个 P0 级问题（网关内存泄漏 [#91588](https://github.com/openclaw/openclaw/issues/91588)、启动迁移阻塞 [#112395](https://github.com/openclaw/openclaw/issues/112395)）处于积压状态，消息丢失/静默失败类 P1 问题占比偏高。整体判断：项目处于高频迭代期，安全与稳定性投入显著，但严重 Bug 的闭环速度仍有提升空间。

## 2. 版本发布

过去 24 小时内发布了两个版本，均聚焦安全边界强化：

**v2026.6.34**
- 更安全的浏览器与网络边界：沙箱化浏览器路由、可信 DNS 目标、自定义浏览器源、loopback provider 端点现已拒绝不安全访问路径（[#97958](https://github.com/openclaw/openclaw/pull/97958)、[#38290](https://github.com/openclaw/openclaw/pull/38290)、[#103075](https://github.com/openclaw/openclaw/pull/103075)、[#110693](https://github.com/openclaw/openclaw/pull/110693)）

**v2026.6.33**
- 更安全的网络与密钥边界：provider 流、Discord REST 响应、浏览器抓取、OAuth 路径和日志现在限制恶意响应大小；Telegram 凭据不再进入诊断输出（[#96989](https://github.com/openclaw/openclaw/pull/96989)、[#95412](https://github.com/openclaw/openclaw/pull/95412)、[#99428](https://github.com/openclaw/openclaw/pull/99428)）

未见破坏性变更说明，建议用户升级以获取安全修复。

## 3. 项目进展

过去 24 小时共有 185 条 PR 合并/关闭。在评论数最高的 30 条中，3 条已明确合并/关闭：

- **[#120806](https://github.com/openclaw/openclaw/pull/120806) fix(browser): reclaim stalled extension relay connections** — 修复浏览器扩展中继 WebSocket 失联后仍保持"假连接"的问题，完善心跳 pong 记录，使 readiness 端点和只读模式准确反映连接状态
- **[#120717](https://github.com/openclaw/openclaw/pull/120717) fix(cloud-workers): preserve accepted workspace after SSH loss** — 修复 Cloud Worker 在 SSH 断线时误判 workspace 结果并触发回滚的问题，避免远端仍在执行的任务被错误撤销
- **[#120505](https://github.com/openclaw/openclaw/pull/120505) refactor(gateway): centralize connect failure classification** — 将 probe、健康诊断、TUI 三处各自为政的连接失败分类逻辑统一为基于结构化 `details.code` 的单一实现

值得关注的开放中的高价值 PR（反映维护者当前投入方向）：

- [#120809](https://github.com/openclaw/openclaw/pull/120809) 降低网关重启后首轮冷启动延迟
- [#120808](https://github.com/openclaw/openclaw/pull/120808) 修复图像工具结果超出上下文预算时被整体丢弃、仅保留误导性文本的问题
- [#120802](https://github.com/openclaw/openclaw/pull/120802) 修复 Windows 子进程环境变量因 key 大小写不同而被忽略的问题（影响命令发现、MCP stdio、node-host catalog）
- [#120781](https://github.com/openclaw/openclaw/pull/120781) 修复 `openclaw doctor` 将活动转录误判为孤儿文件并归档的数据丢失路径（[#73471](https://github.com/openclaw/openclaw/issues/73471)）
- [#120768](https://github.com/openclaw/openclaw/pull/120768) 一键粘贴配对新设备（oc-pair setup links）
- [#107375](https://github.com/openclaw/openclaw/pull/107375) Durable Core 系列 PR 1/6：定义 residual-gap RFC，为长时运行代理的静默失败治理奠定架构基础

## 4. 社区热点

- **[#116277](https://github.com/openclaw/openclaw/issues/116277)（已关闭，179 条评论）DeepSeek v4 Flash 静默回复失败** — 模型未生成回复时 OpenClaw 仅发送泛化 fallback 消息"没有生成回复"，无错误码、无重试、无诊断。用户诉求：静默失败必须可观测、可恢复
- **[#44925](https://github.com/openclaw/openclaw/issues/44925)（24 条评论，2 👍）Subagent 完成静默丢失** — 子代理任务编排存在多个失败模式（完成通知失败、超时无自动重启、无重试），结果被静默吞掉
- **[#91588](https://github.com/openclaw/openclaw/issues/91588)（22 条评论，1 👍）P0 网关内存泄漏** — RSS 从 350MB 涨至 15.5GB 后被 OOM kill，触发 launchd-handoff 反复重启循环
- **[#84583](https://github.com/openclaw/openclaw/issues/84583)（11 条评论，3 👍）cron announce 触发会话接管错误** — cron 任务完成后的 announce 投递与用户正在进行的会话冲突，抛 `EmbeddedAttemptSessionTakeoverError`
- **[#86215](https://github.com/openclaw/openclaw/issues/86215)（11 条评论）Codex OAuth 失败可卡死 agent 数小时** — token 失效后无法轮换 profile，也无清晰告警

**热点诉求归纳**：社区最关切的三个主题是——消息可靠性（静默失败/重复发送/丢失）、会话状态完整性（上下文不丢、不卡死）、长时间运行稳定性（内存泄漏、OAuth 轮换、崩溃循环）。

## 5. Bug 与稳定性

**P0（严重，需立即关注）**

- [#91588](https://github.com/openclaw/openclaw/issues/91588) 网关内存泄漏（350MB→15.5GB，OOM 崩溃循环）— 无 fix PR，标记 `needs-maintainer-review`
- [#112395](https://github.com/openclaw/openclaw/issues/112395) 从 6.11 升级到 7.1 后启动迁移 preflight 阻塞，迁移表和 leases 为空 — 有 linked PR

**P1（高优先级，无 fix PR）**

- [#116277](https://github.com/openclaw/openclaw/issues/116277) DeepSeek v4 Flash 静默失败（已关闭但需回归验证）
- [#44925](https://github.com/openclaw/openclaw/issues/44925) Subagent 完成状态静默丢失，无重试/通知/自动重启
- [#86215](https://github.com/openclaw/openclaw/issues/86215) Codex OAuth 刷新失败 wedged agent 数小时
- [#84583](https://github.com/openclaw/openclaw/issues/84583) cron announce 与活跃会话冲突，触发 `EmbeddedAttemptSessionTakeoverError`
- [#114020](https://github.com/openclaw/openclaw/issues/114020) 升级至 7.2-beta.4 后 Feishu 频道全部无法分发消息
- [#55694](https://github.com/openclaw/openclaw/issues/55694) Agent 工具调用失败陷入 20+ 次重试循环，重复消息刷屏（飞书）
- [#87327](https://github.com/openclaw/openclaw/issues/87327) 隔离代理运行卡在 runtime-plugins 阶段，反复出现于 hourly cron
- [#103231](https://github.com/openclaw/openclaw/issues/103231) `claude-cli` 后端的 `ownsNativeCompaction` 假设不成立，会话膨胀超过 200% 上下文无人压缩
- [#111944](https://github.com/openclaw/openclaw/issues/111944) Codex commentary 不投递到 Telegram 进度/块级流
- [#112248](https://github.com/openclaw/openclaw/issues/112248) `@openclaw/codex` 插件启动时抛 `TypeError`，/codex 命令全部静默失效
- [#117358](https://github.com/openclaw/openclaw/issues/117358) 轮次后压缩忽略压缩/重置边界，延迟已完成回复的投递
- [#120425](https://github.com/openclaw/openclaw/issues/120425) Telegram DM 回复照片时无条件重新下载媒体，导致多分钟延迟并竞速超时
- [#84393](https://github.com/openclaw/openclaw/issues/84393) Codex 运行时向运营 agent 静默注入编码代理 base prompt

**P2（中等）**：qqbot 消息重复发送（[#77306](https://github.com/openclaw/openclaw/issues/77306)）、Teams 线程仅取前 50 条回复（[#98870](https://github.com/openclaw/openclaw/issues/98870)）、`model.completed` 事件缺失 stopReason（[#118673](https://github.com/openclaw/openclaw/issues/118673)）、exec 文档与运行时行为不一致（[#61009](https://github.com/openclaw/openclaw/issues/61009)）等。

**已有明确 fix PR 的 Bug**

- [#120781](https://github.com/openclaw/openclaw/pull/120781) 修复 doctor 归档活动转录（[#73471](https://github.com/openclaw/openclaw/issues/73471)）
- [#120589](https://github.com/openclaw/openclaw/pull/120589) 回填 provider 跳过 `input_json_delta` 时丢失的工具参数（[#120306](https://github.com/openclaw/openclaw/issues/120306)）
- [#113869](https://github.com/openclaw/openclaw/pull/113869) 丢弃临时 OpenAI reasoning 回放状态（[#113868](https://github.com/openclaw/openclaw/issues/113868)）
- [#110734](https://github.com/openclaw/openclaw/pull/110734) `tasks cancel` 时中断活动 Codex 子代理线程（[#110663](https://github.com/openclaw/openclaw/issues/110663)）
- [#119511](https://github.com/openclaw/openclaw/pull/119511) tasks maintenance 清理 cron 转录时补写 `.deleted` 归档

## 6. 功能请求与路线图信号

**社区呼声较高的新功能需求**

- [#10687](https://github.com/openclaw/openclaw/issues/10687) 完全动态模型发现（OpenRouter 优先）— 3 👍，2 月提出仍未解决
- [#13219](https://github.com/openclaw/openclaw/issues/13219) 按模型粒度使用日志与成本追踪
- [#52640](https://github.com/openclaw/openclaw/issues/52640) 长任务持久状态面板（Discord 优先）
- [#49740](https://github.com/openclaw/openclaw/issues/49740) cron 任务自动重试（`--retry-count` / `--retry-delay`）
- [#71195](https://github.com/openclaw/openclaw/issues/71195) macOS Talk Mode 接入 OpenAI Realtime 语音通路
- [#8299](https://github.com/openclaw/openclaw/issues/8299) 配置项抑制子代理 announce
- [#9637](https://github.com/openclaw/openclaw/issues/9637) TUI 无障碍：禁用 emoji 和 Unicode 符号的配置项

**可能被纳入下一版本的产品信号**

- 成本治理方向：[#113548](https://github.com/openclaw/openclaw/pull/113548)（warn-only 使用预算）、[#92649](https://github.com/openclaw/openclaw/pull/92649)（Kimi 配额显示）正在推进
- 配置管理方向：[#107026](https://github.com/openclaw/openclaw/pull/107026) 有序配置层，服务多租户部署场景
- 设备体验方向：[#120768](https://github.com/openclaw/openclaw/pull/120768) 一键配对流程，对应 docs/plan/runners.md milestone 3
- 架构治理方向：[#107375](https://github.com/openclaw/openclaw/pull/107375) Durable Core 系列启动，旨在系统性消除 agent 静默失败

## 7. 用户反馈摘要

- **静默失败是最大痛点**：[#116277](https://github.com/openclaw/openclaw/issues/116277) 中用户收到泛化 fallback 却无任何错误上下文；[#44925](https://github.com/openclaw/openclaw/issues/44925) 中 subagent 结果静默丢失，用户表示"无法信任自动化任务"
- **重复消息激怒用户**：[#55694](https://github.com/openclaw/openclaw/issues/55694)（飞书）用户收到 6+ 条几乎相同的重试刷屏；[#77306](https://github.com/openclaw/openclaw/issues/77306)（QQ）WebChat 历史回放触发 `message_sending` hook 导致 QQ API 重复发送
- **升级有风险**：[#112395](https://github.com/openclaw/openclaw/issues/112395) 用户升级 6.11→7.1 后网关无法启动；[#114020](https://github.com/openclaw/openclaw/issues/114020) 升级 beta.4 后 Feishu 全挂
- **长任务体验不佳**：[#98540](https://github.com/openclaw/openclaw/issues/98540) "composer 显示 idle 而 agent 正在跑工具"；[#52640](https://github.com/openclaw/openclaw/issues/52640) 用户需要持久任务状态而非仅靠 typing indicator
- **文档与行为不一致**：[#61009](https://github.com/openclaw/openclaw/issues/61009) 文档称 `host=node` 可从 auto 覆盖，运行时却拒绝；[#10354](https://github.com/openclaw/openclaw/issues/10354) message 工具 channel 参数无 enum 约束，agent 常传错 ID
- **中文社区活跃**：多份高质量中文 Bug 报告（[#55694](https://github.com/openclaw/openclaw/issues/55694)、[#77306](https://github.com/openclaw/openclaw/issues/77306)、[#120425](https://github.com/openclaw/openclaw/issues/120425)）反映了飞书/QQ 渠道在真实场景中的稳定性问题

## 8. 待处理积压

**长时间未解决的高优先级 Issue（提醒维护者关注）**

- [#10687](https://github.com/openclaw/openclaw/issues/10687) 动态模型发现 — 2/6 创建，10 条评论，3 👍，等待产品决策
- [#8299](https://github.com/openclaw/openclaw/issues/8299) 子代理 announce 抑制配置 — 2/3 创建，8 条评论，等待产品决策
- [#13219](https://github.com/openclaw/openclaw/issues/13219) 按模型使用日志 — 2/10 创建，7 条评论，等待产品决策
- [#44925](https://github.com/openclaw/openclaw/issues/44925) Subagent 静默丢失 — 3/13 创建，24 条评论，2 👍，P1，已积压近 5 个月
- [#91588](https://github.com/openclaw/openclaw/issues/91588) P0 网关内存泄漏 — 6/9 创建，22 条评论，P0，等待维护者审查
- [#86215](https://github.com/openclaw/openclaw/issues/86215) Codex OAuth 卡死 — 5/24 创建，P1，需要 live repro

**等待作者回应的 PR（积压超时提醒）**

- [#107375](https://github.com/openclaw/openclaw/pull/107375) Durable Core PR 1/6（等待作者）
- [#107026](https://github.com/openclaw/openclaw/pull/107026) 有序配置层（等待作者）
- [#92649](https://github.com/openclaw/openclaw/pull/92649) Kimi 配额显示（等待作者）
- [#69022](https://github.com/openclaw/openclaw/pull/69022) Telegram humanDelay 修复 — 4/19 创建，已等待近 4 个月

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**数据窗口**：2026-08-08 至 2026-08-09  
**数据来源**：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw 项目 GitHub 动态

---

## 1. 生态全景

当前个人 AI 助手 / 自主智能体开源生态正从“能跑通 demo”走向“可运营、可审计、可降本”的基础设施竞争。OpenClaw 以每日 500 条 PR 更新、163 条 Issue 更新的体量继续领跑，并同时推进安全加固与 Durable Core 架构治理。第二梯队中，IronClaw 已完成 Reborn 迁移关键里程碑，Zeroclaw 处于发布前架构收敛期，CoPaw 则在子代理编排与多模型能力上快速堆积功能。

跨项目共同高频痛点集中在**静默失败、MCP 稳定性、token 成本可观测性、多用户会话身份**。整体生态健康度分化明显：头部项目迭代快但严重 Bug 积压，中小项目功能收敛但面临维护者响应滞后与 PR 合并瓶颈。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 163（143 新/活跃，20 关闭） | 500（185 合并/关闭） | v2026.6.33 / v2026.6.34 | 高活跃；安全加固显著，但 P0 内存泄漏与启动迁移阻塞未闭环 |
| **IronClaw** | 25（23 关闭） | 50（32 合并/关闭） | 无 | 高；Reborn 迁移收尾，质量较高，P1 token 估算 Bug 待修 |
| **CoPaw** | 1（新） | 50（3 合并/关闭，47 待合） | 无 | 中高；贡献活跃但合并吞吐偏低，子代理体验问题无修复 PR |
| **Zeroclaw** | 4（3 活跃，1 关闭） | 50（2 合并/关闭，48 待合） | 无 | 中高；架构方向清晰，但合并积压 + S0 Matrix Bug 是风险 |
| **NanoClaw** | 8（5 新/活跃，3 关闭） | 6（3 合并/关闭） | 无 | 中高；远程 MCP 里程碑完成，main 分支构建回归待处理 |
| **NanoBot** | 5（全部新/活跃） | 9（4 合并/关闭，5 待合） | 无 | 中；用户反馈闭环快，但 MCP 故障可导致网关崩溃 |
| **Moltis** | 2（1 新，1 关闭） | 1（已合并/关闭） | 无 | 中；Docker 沙箱文件工具修复落地，新 Bug 待响应 |
| **PicoClaw** | 约 2 条新活跃 | 约 4 条待合，0 合入 | 无 | 中低；功能储备期，维护者响应明显滞后 |
| **LobsterAI** | 1（stale） | 3（stale / 关闭） | 无 | 低；长期积压，活跃度放缓 |

---

## 3. OpenClaw 在生态中的定位

| 维度 | OpenClaw | 生态内同类参照 |
|---|---|---|
| **社区规模** | 日 PR 更新约 500、Issue 更新约 163，约为其他列示项目合计的 3 倍左右 | IronClaw、CoPaw、Zeroclaw 日更新约 50 条，其余项目在 1–9 条 |
| **发布节奏** | 24 小时内发布 2 个安全强化版本 | 其余项目均无新版本发布 |
| **技术路线** | 多通道网关 + 浏览器沙箱 + Cloud Workers + Durable Core 架构治理 | IronClaw 走 Reborn 分层产品/工作流；Zeroclaw 走 Rust RFC 驱动收敛；NanoClaw 走 ChannelAdapter 注册式架构 |
| **核心优势** | 社区反馈密度最高，安全边界迭代快，浏览器/网络/密钥等领域有系统性加固 | 垂直场景更灵活，部分项目在渠道适配、成本控制、沙箱兼容性上有更快实验空间 |
| **主要风险** | P0 网关内存泄漏（#91588）、启动迁移阻塞（#112395）未闭环；P1 静默失败类问题占比偏高 | 合并吞吐低、维护者响应滞后、长期 stale 是普遍风险 |

OpenClaw 当前是生态中事实上的“参照系”：其 Issue/PR 讨论密度能提前暴露行业共性问题，例如静默失败、Codex/OAuth 卡死、cron 会话冲突等。但体量大也意味着噪声和积压并存，尚不能定义为“稳定性标杆”，更准确是“生态活跃度与方向性标杆”。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **静默失败与消息可靠性** | OpenClaw、IronClaw、NanoClaw、CoPaw、Zeroclaw | 模型 fallback 无诊断、子代理结果静默丢失、技能安装后不可见、附件被静默丢弃、fork 任务假成功 |
| **MCP 远程化与故障隔离** | NanoClaw、NanoBot、PicoClaw、CoPaw、OpenClaw | 远程 HTTP/SSE MCP、OAuth 网页授权、单点 MCP 故障不得拖垮网关、客户端超时未生效、stale 会话恢复 |
| **Token 成本可观测性与缓存优化** | NanoBot、OpenClaw、IronClaw、CoPaw、PicoClaw | 按调用/迭代记录 token 消耗、按模型用量计费、修正 token 估算口径、prompt caching、前缀缓存保持 |
| **会话状态、身份与多用户协作** | OpenClaw、Zeroclaw、IronClaw、CoPaw、LobsterAI | 会话被错误接管、Telegram 群聊 per-user session、Slack/Telegram 共享会话、子代理 workspace 共享、确定性配置覆盖 |
| **渠道适配器稳定性** | NanoClaw、PicoClaw、Zeroclaw、OpenClaw | Mattermost 新渠道、WhatsApp 客户端过期、Matrix `.well-known` 发现、飞书/QQ/Telegram 渠道在真实场景下的故障 |

其中“**静默失败**”和“**MCP 可靠性**”是目前跨越最多项目、最接近行业级共识的问题。

---

## 5. 差异化定位分析

| 项目 | 特征（依据 Issue/PR 推断） | 功能侧重 | 目标用户 / 场景 |
|---|---|---|---|
| **OpenClaw** | 多通道网关 + 浏览器/云边界 + 安全加固 | 全渠道个人 AI 助手、远程运行、长时任务治理 | 个人与团队，重度自动化和多 IM 接入 |
| **IronClaw** | Reborn 分层架构，ProductAdapter/ProductWorkflow | 产品化 agent 运行时、身份语义、Web Debug Inspector | 平台级部署、多用户协作、可审计性要求高 |
| **Zeroclaw** | RFC 驱动的 Rust workspace，SOP/headless 运行时 | 架构收敛、自托管、发布前清理 | 自托管、强架构纪律、隐私敏感用户 |
| **NanoClaw** | ChannelAdapter 注册式架构，远程 MCP | 多渠道集成、MCP 生态扩展、CLI 配置管理 | 开发者、企业渠道集成、MCP 生态使用者 |
| **CoPaw** | Python 子代理编排，provider fallback/caching | 多 agent 工作流、模型成本控制、前端会话管理 | 高级用户、多模型编排、成本敏感团队 |
| **PicoClaw** | Go 轻量多通道 | WhatsApp/Simplex/DeltaChat/IRC，轻量部署 | 隐私优先、轻量部署、个人用户 |
| **NanoBot** | 轻量 WebUI 服务 | token 诊断、临时会话、MCP 基础集成 | 个人开发者、快速自部署 |
| **Moltis** | 容器/沙箱文件系统桥接 | Docker、Apple Container 路径翻译与回退 | 容器化 agent、macOS 用户 |
| **LobsterAI** | SQLite 持久化 + 浏览器工具 | 通用工具型 agent、模型网关扩展 | 桌面自动化、中文社区 |

---

## 6. 社区热度与成熟度

| 阶段 | 项目 | 判断依据 |
|---|---|---|
| **快速迭代期** | OpenClaw、IronClaw | PR/Issue 活跃度最高；OpenClaw 安全版本密集，IronClaw 关闭率高、Reborn 迁移集中收口 |
| **功能堆积 / 评审瓶颈期** | CoPaw、Zeroclaw | PR 输入量大但合并率低，分别有 47 条与 48 条 PR 待处理 |
| **稳定推进期** | NanoClaw、NanoBot、Moltis | 功能与修复并行，Issue 关闭效果可见，体量适中 |
| **低活跃 / 待激活期** | PicoClaw、LobsterAI | PicoClaw 有社区贡献但维护者响应滞后；LobsterAI 长期 stale |

从成熟度看，**IronClaw 最接近“质量巩固型”**：Issue 关闭率 92%、PR 合并/关闭率 64%，且有审计驱动的架构修复。**OpenClaw 是“高流量高噪音型”**：活跃度第一，但 P0/P1 积压仍需要更快的闭环机制。**CoPaw 与 Zeroclaw 则需要优先解决维护者评审产能问题**，否则会损耗外部贡献热情。

---

## 7. 值得关注的趋势信号

1. **静默失败从 Bug 上升为架构治理问题**  
   OpenClaw 的 Durable Core RFC、IronClaw 的 durable delivery CAS 恢复、CoPaw 对 fork 假成功的修复，都指向同一方向：agent 执行链路必须具备可观测、可重试、可补偿的默认机制。对开发者而言，应尽早引入事件留痕、dead-letter 和超时重启，而不是等用户报告“任务消失”。

2. **MCP 正在成为一等公民，但需要企业级治理**  
   远程 MCP、OAuth 授权、连接超时、故障隔离、stale 会话恢复已在多个项目同时出现。MCP 不应再被视为“本地子进程”，而应作为外部依赖管理：独立进程、熔断、凭据轮换、单点故障隔离。

3. **Token 成本可观测性决定用户信任**  
   NanoBot 用户“2 小时烧掉百万 token”的反馈极具代表性；IronClaw 的 token 估算 Bug 和 PicoClaw 的前缀缓存修复则说明成本问题不只是 UI 问题，而是从估算口径到 prompt 排布的系统工程。提供 per-request token 明细、缓存友好 prompt 结构、预算告警将成为标配。

4. **多用户协作与身份语义开始显性化**  
   IronClaw 的“run acts as its invoker”、Zeroclaw 的 per-user session、OpenClaw 的会话接管冲突，共同指向一个核心需求：agent 必须知道“谁在什么上下文中发起任务”，并避免多人共享会话时的上下文串扰。

5. **确定性配置优先于模型“自由意志”**  
   LobsterAI 用户希望“写死浏览器无头模式”，CoPaw 用户因手工改配置导致前端状态分裂。模型指令跟随不稳定时，框架应提供显式配置优先级和校验机制，让关键工具行为可预测。

6. **PR review 产能是生态系统的普遍瓶颈**  
   CoPaw 47 条、Zeroclaw 48 条待合并 PR，PicoClaw 的 PR 长时间无评论，说明“代码贡献多、维护者评审慢”正在成为制约项目发展的共同风险。对 AI 智能体开发者而言，选择一个项目时，不仅要看功能活跃度，也要看 merge 效率与维护者响应速度。

---

**总结**：个人 AI 助手生态正在经历从“功能竞赛”到“可靠性、可观测性、成本控制”的转型。OpenClaw 仍是生态中心，但 IronClaw 在工程质量上显示出更强的收敛能力；MCP、静默失败、token 成本、多用户身份是下一阶段最具确定性的技术战场。

*注：部分项目的技术栈与目标用户为基于 Issue/PR 上下文的分析推断，未逐一核对官方仓库文档。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-09

## 今日速览

过去 24 小时项目活跃度较高：共产生 5 条 Issue 更新（全部为新开/活跃）与 9 条 PR 更新（5 条待合并、4 条已合并/关闭），无新版本发布。社区讨论焦点集中在 token 消耗诊断（#5266 获 13 条评论），且已有对应 PR #5293 被合入、#5299 待合并，体现了对用户痛点的快速响应。另一方面，暴露出两个值得警惕的稳定性问题：MCP 远程连接故障可导致网关进程崩溃（#5300），以及 Docker Compose 部署的权限错误（#5295）。总体来看，项目功能迭代节奏健康，但基础设施稳定性与故障隔离能力需要加强。

## 版本发布

今日无新版本发布。

## 项目进展

今日有 4 个 PR 被合并/关闭，主要集中在 WebUI 体验优化与代码库清理：

- **[#5252] feat(webui): add temporary chat mode**（已关闭/合并）— 新增"临时聊天"模式：首次消息后才创建会话、支持多个临时会话、不落盘（无 session/history 文件），为 WebUI 用户提供了轻量、可丢弃的对话方式。
- **[#5293] feat(usage): log per-iteration token diagnostics**（已关闭/合并）— 直接回应 #5266 的诉求，为每次 agent 执行记录粒度更细的 token 诊断信息，不再只保留按日/来源聚合的 WebUI 统计。该能力是定位"异常 token 消耗"的关键前置。
- **[#5296] refactor: remove verified dead code**（已关闭/合并）— 移除 19 个仓库内部死代码单元、11 个仅测试可达的接缝，并清理了孤儿前端依赖/资源；保留 6 个 API 敏感单元待后续兼容性决策。降低了维护成本。
- **[#5294] fix(webui): prevent image hover clipping**（已关闭/合并）— 移除图片预览的 hover 缩放与光环，避免容器裁剪导致图片边缘不可见，同时保留缩放光标、静态边框、键盘 focus-visible 等交互，并补充回归测试。

**整体判断**：项目在"对话体验（临时聊天、图片预览）"与"可观测性（token 诊断）"两个方向均有实质推进；死代码清理表明项目在主动控制技术债。

## 社区热点

- **[#5266] [enhancement] Logs about token consumption** — 13 条评论，今日最热 Issue。用户反馈 nanobot 在 2 小时内静默消耗了近百万 token，而用户侧无明显活动，要求提供调用级 token 消耗日志（何时、哪个调用、消耗多少）。该问题已获得从 Issue 到 PR 的快速闭环（#5293 合并、#5299 待合并），是当前社区最关心的效率痛点。

- **[#5297] [enhancement, feature request] MCP 增加 oauth 网页授权功能** — 2 条评论。用户希望支持需要网页授权的 MCP 服务（以 xmind 为例），并提议通过 gateway 获取授权信息，使非本机场景也能通过远程 IP/域名完成授权。涉及 Skills/Plugins 组件，目前尚无对应 PR。

- **[#5295] [bug] docker compose 部署失败：entrypoint.sh: Permission denied** — 2 条评论。用户按 deployment.md 指南部署后，`nanobot-gateway` 容器启动失败，报 `/usr/local/bin/entrypoint.sh: Permission denied`，目前无关联 fix PR。

**分析**：热点集中于"资源消耗透明度"与"部署易用性"两大类诉求。前者说明用户对 token 成本敏感，需要更强可观测性；后者说明 Docker 部署路径的细节体验仍有优化空间。

## Bug 与稳定性

按严重程度排列：

1. **[#5300] [bug] MCP 连接失败未隔离 + anyio cancel scope 跨任务崩溃**（严重，无 fix PR）
   远程 MCP 返回 HTTP 530（Cloudflare error 1033）时，MCP 客户端异常处理路径触发 `RuntimeError: Attempted to exit cancel scope in a different task than it was entered in`，导致网关进程崩溃/卡死、任务泄漏、事件循环空转、CPU 飙升。这暴露出故障隔离不足：单个 MCP 服务的连接失败不应拖垮整个网关。**优先级建议：P0**。

2. **[#5295] [bug] Docker Compose 部署失败：entrypoint.sh 权限拒绝**（部署阻塞，有 workaround 讨论）
   容器启动即退出，`docker compose logs` 报告 `/bin/sh: 0: cannot open /usr/local/bin/entrypoint.sh: Permission denied`。需排查镜像构建/挂载时的文件权限设置。**优先级建议：P1**。

3. **[#5271] [PR] fix(session): prevent stale background task saves from overwriting session data**（问题已定位，fix PR 待合并，带 conflict 标签）
   后台任务（如 `maybe_generate_webui_title`）持有旧 `Session` 引用，若用户在 await 期间执行 `/new`，旧任务保存可能覆盖新会话数据。这是数据一致性方面的隐患，fix PR #5271 已提交但标记有冲突需要解决。**优先级建议：P1**（修复存在但未合入）。

4. **[#5206] [PR] fix(delivery): log streamed responses exactly once**（轻微问题，fix PR 待合并，带 conflict 标签）
   流式响应被重复记录日志（在 `_publish_stream_end` 与 `_assemble_outbound` 各记一次），产生重复的 'Response to' 日志行。修复 PR 已存在待合并。**优先级建议：P2**。

5. **[#5294] fix(webui): image hover clipping**（已修复并合入）
   见"项目进展"部分。

另外，今日无新增回归类 Issue。

## 功能请求与路线图信号

- **token 消耗可观测性（已进入实施）**：#5266 用户需求驱动了 #5293（合并）与 #5299（待合并）。#5299 进一步在 WebUI 中展示最近的 token 使用明细（输入/输出/缓存 token 分解、来源 session、agent 迭代、请求的工具），预计不久后将形成"日志诊断 + 界面展示"的完整闭环。
- **MCP OAuth 网页授权（新增需求，暂无 PR）**：#5297 明确提出 MCP 需要 OAuth 网页授权能力，特别针对需要浏览器交互的远程 MCP（如 xmind）。结合 #5300（MCP 故障隔离）来看，MCP 子系统的"可用性"与"健壮性"正成为社区下一阶段关注重点。
- **大规模 MCP tool set 的上下文成本控制（新增提案）**：#5298 指出 `ToolRegistry.get_definitions()` 会将全部 MCP 工具 schema 传给 provider，建议为大型工具集做 budget 管理（如裁剪或精简 schema），降低 context 成本。这是一个前瞻性优化信号，目前无对应 PR。
- **模型无关的 computer use（长期 PR 待决策）**：#4276 自 6 月 10 日发起，提供 `computer_use`（截图+鼠标键盘控制，PyAutoGUI/Playwright 后端）与 `browser`（DOM 自动化）工具，使普通工具调用模型也能获得计算机操作能力。截至目前仍未合入，且无维护者明确表态，是路线图上悬而未决的最大功能块。

## 用户反馈摘要

- **token 消耗焦虑（#5266）**：用户明确表示"2 小时烧掉百万 token 且无感知活动"，对成本失控感到不安。希望看到"哪个调用、什么时候、消耗多少"的完整链路。这一反馈直接推动了 per-iteration token 诊断功能的落地，属于"用户需求 → 代码合入"的优秀案例。
- **部署文档与实际行为不一致（#5295）**：用户按文档操作 Docker Compose 部署失败，说明 deployment.md 的步骤在特定环境（可能涉及文件权限）下不可复现。这类"文档-行为偏差"会显著消耗新用户信任。
- **远程 MCP 故障拖垮全局（#5300）**：用户观察到的现象（网关崩溃、残留任务、CPU 飙升）说明 MCP 故障的影响范围未被隔离。用户期望的是"单点失败不应影响整体服务"，这是对系统韧性提出的明确要求。
- **Matrix 回复体验（#5292）**：PR #5292 指出 Matrix 房间级回复未使用 `m.relates_to` 关联原始用户消息，导致客户端无法将 bot 回答与触发消息对应。这属于跨平台接入时的细节体验问题，用户侧可能已经感知为"回复丢失上下文"。

## 待处理积压

需维护者重点关注：

- **[#4276] feat(tools): model-agnostic computer use（PR 已打开 60 天）** — 目前最长寿的待合并 PR，涉及 computer_use 与 browser 两个新工具，功能体量大、方向前瞻，但长期未得到决策。建议维护者明确表达接受/拒绝/要求调整，避免贡献者资源空耗。
- **[#5271] fix(session): 防止后台任务覆盖会话数据（PR，P0 级修复，带 conflict）** — 涉及数据一致性，修复思路正确但需要解决冲突后才能合入。拖延越久，用户触发该问题的概率越大。
- **[#5206] fix(delivery): 流式日志去重（PR，P2，带 conflict）** — 小问题但已悬置一周，建议尽快合并以保持 PR 队列整洁。
- **[#5266] token 消耗日志（Issue，已有部分修复）** — 虽然 #5293/#5299 已经覆盖主要诉求，但该 Issue 仍在开放中，建议在 #5299 合入后关闭，或要求补充更多诊断维度（如按 session/用户维度汇总）后关闭。
- **[#5297] MCP OAuth 网页授权（新增需求，无关联 PR）** — 需求明确且有具体用例（xmind），但目前无人认领。若 MCP 是项目重点方向，建议在路线图中给出回应。

---

*数据窗口：2026-08-08（距今 24 小时） | 数据来源：GitHub HKUDS/nanobot*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-09

数据来源：github.com/zeroclaw-labs/zeroclaw（采集周期：过去 24 小时）

---

## 1. 今日速览

过去 24 小时内，Zeroclaw 的 Issue 与 PR 均有显著活跃：4 条 Issue 更新（3 条新开/活跃、1 条关闭），50 条 PR 更新但仅 2 条关闭/合并，合并吞吐偏低，48 条 PR 仍在待合并状态。项目主线集中在**硬件 crate 架构收敛**（`aardvark-sys`、`zeroclaw-robot-kit` 的裁撤）与 **SOP 运行时修复**两条路径上。值得警惕的是出现了一个 S0 级 Matrix 通道 `.well-known` 发现 Bug（#9855），目前尚无对应修复 PR。整体项目架构演进方向清晰，但 PR 合并积压问题需要维护者关注。

---

## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases 为空）。

---

## 3. 项目进展

今日无新版本，但两项 PR 关闭/合并推动了关键进展：

- **[#9494] fix(sop): drive cron-started headless runs**（已关闭）  
  由 @Lusitaniae 提交、@JordanTheJet 延续的 SOP 运行时修复，解决了 cron 触发运行后因缺少 agent loop 导致 `ExecuteStep` 仅记录为 pending 的问题。将 cron 启动的运行接入共享 headless 运行驱动，修复了四个 blocking review findings。该 PR 的历史遗留缺陷已由 #9841 接续修复。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9494

- **[#9798] docs(sop): document which agent executes SOP steps**（已关闭）  
  该文档补丁记录了当前临时行为，但由于 #9841 的运行时修复会移除该行为，此 PR 已被 #9841 取代并关闭，属正常流程淘汰。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9798

- **[#9841] fix(sop): drive headless SOP runs + 5 defects**（待合并）  
  作为 #9494 的官方延续（rebase 到当前 master，保留原四个 commit），新增修复了 review 中发现的四个阻断问题及一个额外缺陷。涉及 docs/core/agent/cron/gateway/runtime/tool 等多个组件，是当前 SOP 修复主线的合并阻塞点。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9841

- **[#9853] chore(workspace): remove aardvark-sys and zeroclaw-robot-kit**（待合并）  
  落实 #9852 的决策，将两个硬件 crate 从 workspace 中删除。该 PR 直接解除 crates.io 发布阻塞（#9381），并明确 `zeroclaw-robot-kit` 在 workspace 内零反向依赖、`aardvark-sys` 在折叠后不必要保留。这是架构精简的重要一步。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9853

---

## 4. 社区热点

- **[#8043] RFC: Retire the standalone aardvark-sys crate**（已关闭，11 条评论）  
  这是本轮硬件 crate 裁撤讨论的源头 RFC，经过 11 条评论的充分讨论后，最终被 #9852 取代——社区共识从"折叠进 zeroclaw-hardware"演变为"直接从 workspace 删除"。这种"先 RFC 讨论、再收敛为更强方案"的路径展示了项目 RFC 流程的实际效力。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/8043

- **[#9803] RFC: Retire the standalone zeroclaw-robot-kit crate**（开放，2 条评论）  
  与 #8043 同构，作为第二张多米诺骨牌推动 robot-kit 的裁撤，已获得 accepted 状态。两条 RFC 叠加表明社区对"硬件支持不应阻碍主 crate 发布"的诉求一致。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9803

- **[#9855] [S0 Bug] Matrix channel fails to resolve homeserver via .well-known delegation**（新开，1 条评论）  
  新报告的 S0 级安全/数据丢失 Bug，社区关注度在上升。涉及 federated/self-hosted Matrix 场景下的标准发现机制缺失。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9855

---

## 5. Bug 与稳定性

按严重程度排列：

- **[S0 / 安全风险] #9855 — Matrix 通道绕过 `.well-known/matrix/client` 标准发现**（新开，无修复 PR）  
  Matrix channel 实现直接从配置的 host 字符串构造 homeserver API base URL，跳过了 Matrix 的 client-server discovery 标准（`.well-known/matrix/client`），在启用 delegation 的服务器上会导致连接失败或指向错误服务器。目前无关联 fix PR，建议尽快响应。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9855

- **[P1 / 安全] #9410 — 命令审计日志默认改为禁用**（待合并，已关联 #9391）  
  将一个"无效的"命令审计设置默认改为关闭，避免误导用户以为审计已启用。这是安全诚实性方向的一部分，审查通过后即可消除该安全语义隐患。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9410

- **[Bug 修复] #9854 — context-window 发现不再依赖手写列表**（待合并）  
  修复 `fetch_context_window` 中手写八家 provider 名称匹配的问题，改为从 family registry 派生，避免新 provider 接入时 context-window 查询静默返回 `None`。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9854

- **[Bug 修复] #9494 / #9841 — cron 启动的 SOP headless 运行被搁置**（#9494 已合并，#9841 待合并）  
  此前 cron 触发运行后无 agent loop 挂载，`ExecuteStep` 永远不会执行，现已通过共享 headless driver 修复，并附带五个衍生缺陷修复。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9841

---

## 6. 功能请求与路线图信号

- **硬件 crate 裁撤（路线图已确认）**  
  #8043/#9803 RFC 均已 accepted，#9852 为最终执行 Issue，#9853 为对应实现 PR。这属于下一版本发布前的阻塞项清理（crates.io 发布），预计将随下个版本落地。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9852

- **WATI 通道移除（P0）**  
  #9571 为 `priority:p0` 的通道清理 PR，移除 WATI channel 及全部关联基础设施（feature、config、路由、迁移、CI 等）。通道裁剪方向明确，但处于 `needs-author-action` 状态，需要推进。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9571

- **Telegram 群聊会话隔离（功能请求）**  
  #9772 提出为共享群聊增加 `per_user_session` 开关，解决多人协作时的上下文串扰。这是实际使用场景驱动的功能需求，属于小改动（size:S），进入下一版本的可能性较高。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9772

- **Agent 配置编辑权限（已接受方向）**  
  #9828 为 agent 提供经过 operator 批准的配置编辑路径，替代直接 `echo > config.toml` 的粗糙做法。六组独立可测试的提交，属于平台能力提升方向。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9828

- **Anthropic 安全回退可见性（功能堆栈）**  
  #9266/#9268/#9272 三个 stacked PR 将 server-side fallback 检测、通知记录、web chat 展示串联起来，补齐了 Fable 拒绝回退场景的可观测性闭环。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9266

- **Eval 历史记录（新功能）**  
  #9248 增加 opt-in 的 `[eval].history_dir`，以追加方式记录每次 eval 运行的 JSONL 回执，支撑趋势分析。该功能已在实现中，暂处于 `needs-author-action`。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9248

---

## 7. 用户反馈摘要

- **Matrix 自建服务器用户的委托发现痛点（#9855）**  
  @lugu 报告的场景非常典型：使用 `.well-known` delegation 的 Matrix 服务器无法被 Zeroclaw 正确解析，属于"标准功能未实现"而非配置错误。评论区初步确认这是实现缺陷，而非用户操作问题。该反馈暴露了 Matrix channel 对非默认部署形态的兼容性不足。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9855

- **Telegram 群聊协作场景的上下文串扰（#9772）**  
  @egorchenkov 描述了一个具体协作场景：一位成员上传文件并描述任务，另一位成员接着追问细节时，硬编码的 `Sender` scope 导致上下文丢失。这个反馈源自真实的多人在线协作模式，而非单用户使用模型，代表了 bot 在群组场景下的关键体验差距。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9772

- **维护者对硬件 crate 的"不划算"判断（#9852）**  
  @JordanTheJet 在 #9852 中直言 `zeroclaw-robot-kit` "neither earns its keep"（零反向依赖），且两个 crate 都阻塞 crates.io 发布。这种"非核心资产果断裁撤"的维护态度，在评论区得到了共识（#8043 经 11 条评论后收敛为更强方案）。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9852

---

## 8. 待处理积压

以下为长期未合并或卡在作者响应状态的 PR，提醒维护者关注：

- **[P0 / 通道清理] #9571 — chore(channels): remove the WATI channel**  
  已停留 10 天，状态 `needs-author-action`。P0 优先级且有明确的架构决策支撑，建议尽快推动。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9571

- **[P1 / 安全] #9580 — refactor(infra): move network guard primitives to zeroclaw-infra::net_guard**  
  ADR-013 的 Stage 1，对插件 egress 策略至关重要，停留 9 天，`needs-author-action`。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9580

- **[P1 / 安全] #9410 — fix(security): default command audit logging to disabled**  
  修复 #9391 的安全语义问题，已等待 14 天，`needs-author-action`。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9410

- **[长期滞留] #8337 — feat(observability): herdr agent reporting integration**  
  已滞留 44 天无合并进展，高风险大改动（risk:high, size:XL），需要维护者介入评估或分流。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/8337

- **[CI 可靠性] #9785 / #9787 — Scoop bucket 凭证预演 & AUR 发布重试**  
  一组提升发布通道容错性的 CI 修复，分别停留 3 天，均处于 `needs-author-action`。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9785  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9787

- **[Eval 功能] #9248 — feat(eval): append-only run-history receipts**  
  已停留 19 天，`needs-author-action`。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9248

- **[Webhook 安全] #9744 — refactor(gateway): require authenticated webhook ingress before agent dispatch**  
  已停留 5 天，`needs-author-action`，涉及安全边界强化。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9744

---

**日报小结**：Zeroclaw 当前处于"架构收敛 + 发布前清理"阶段——硬件 crate 的裁撤路径已完全打通，SOP 运行时修复进入收尾，但 **48 个 PR 待合并的积压**与 **S0 Matrix Bug 的快速响应需求**是当前最需要关注的风险点。项目活跃度维持高位，社区讨论质量较高，RFC 流程运转有效。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 — 2026-08-09

## 1. 今日速览

过去 24 小时项目整体活跃度中等，**无新版本发布**，Issues 与 PR 均以存量更新为主。核心信号集中在两条 P0 级修复 PR（WhatsApp 通道中断、前缀缓存失效）仍待合并，且尚无任何 PR 被合入主干，项目交付节奏偏缓。Issues 侧出现 2 条新活跃讨论（IRC 长消息支持、MCP OAuth 2.1），社区对新协议能力有明确诉求，但整体舆论风向平稳，未见激烈争议或回归性崩溃。长期挂起的两条渠道类 PR（Simplex、DeltaChat）已进入 `[stale]` 状态，维护者需注意积压清理。

---

## 2. 版本发布

**无。** 最新 Release 空缺，预计下一版本将包含 4 个待合并 PR 中的部分或全部。

---

## 3. 项目进展

**今日无 PR 合并/关闭（合并数: 0），项目主干尚无实质更新。** 但两条新提交的 PR 值得关注：

- **#3320 [待合并] fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"**  
  → 由 @grrowl 于 8 月 7 日提交，更新于 8 月 8 日。修复 WhatsApp 官方对该项目当前内置客户端版本拒绝连接的问题（`Client outdated (405)` 后无重连机制）。这是当前最紧急的实时通道修复，已定位到依赖版本过旧，需升级 `go.mau.fi/whatsmeow`。一旦合并，将恢复 WhatsApp 渠道的基本可用性。  
  https://github.com/sipeed/picoclaw/pull/3320

- **#3321 [待合并] fix(agent): move dynamic context after history to preserve prefix caching**  
  → 由 @grrowl 提交。将 `## Current Time`、`## Runtime` 等动态上下文从系统提示词移到对话历史之后，以保留前缀缓存的完整命中率。该改动直接影响长会话场景下的推理成本与响应延迟，是值得优先合入的性能优化。  
  https://github.com/sipeed/picoclaw/pull/3321

此外，此前挂起的两条大型功能 PR **#3193（新增 Simplex 渠道类型）** 与 **#3222（重构 DeltaChat 实现，净减约 200 行代码）** 今日均无新的 review 或合入动作，仍处于等待维护者反馈状态。

---

## 4. 社区热点

**#3287 [Feature] Better support long messages in IRC** — 评论区 4 条讨论，是今日热度最高的 Issue。  
链接: https://github.com/sipeed/picoclaw/issues/3287

用户指出 IRCv3 下长消息（超 512 字节）会被客户端自动拆分，PicoClaw 应将这些拆分片段正确合并为一条连贯消息，而非把每个片段当作独立消息处理。这个诉求揭示了一个真实使用痛点：**PicoClaw 若要作为主流 IRC AI 代理，就必须正确处理 IRC 协议层的消息边界**，否则多行输出会被打散成多条记录，影响上下文理解与指令解析。该 Issue 标记为 `[stale]` 后再次活跃，说明社区仍在期待回应。

**#3302 [Feature] Support OAuth 2.1 for MCP servers (same as #2546)** — 2 条评论，属于对旧需求（#2546）的扩展跟进。  
链接: https://github.com/sipeed/picoclaw/issues/3302

用户要求 PicoClaw 的 MCP 服务器支持 OAuth 2.1 认证流程，用于对接企业级 MCP 服务。由于该 Issue 被明确标注为 "Nice-to-Have / Enhancement"，社区反馈热度一般，但认证现代化对项目生态扩展具备长期价值。

**#3320 WhatsApp 修复 PR**（见上一节）虽评论数为 0，但因其直接影响真实用户可用性，也属于关注度高的热点——后续会被动等待合并。

---

## 5. Bug 与稳定性

按严重程度排序，当前共有 2 个值得关注的稳定性问题（1 个已关闭，1 个受 PR 覆盖，另 1 个为静态代码路径缺陷）。

| 严重度 | 问题 | 状态 | 说明 |
|--------|------|------|------|
| P0 | **WhatsApp 通道不可用（客户端版本过期）** | 已定位，待修复 PR #3320 | 官方在 2026-02 后拒绝旧客户端版本（错误码 `Client outdated (405)`），且现有代码在断开后不会自动重连，导致 WhatsApp 渠道持续不可用。依赖升级已提交 PR，但尚未合并。 |
| P1 | **Agent 前缀缓存失效（推理成本上升）** | 已定位，待修复 PR #3321 | 动态上下文放置在系统提示词内，任何一次 `## Current Time` 变化都会使整个对话上下文的前缀缓存失效，导致 token 重复计算。对长会话用户产生显著延迟与费用压力。 |
| P2 | **聊天界面输入框聚焦时 CPU 占用过高** | 已关闭 | 涉及 #3292，运行环境为 Firefox + Web 端，于 8 月 8 日关闭，未给出最终结论或修复方案（存在被搁置或转为线下讨论的可能）。 |

其中 WhasApp 通道故障是当前对普通用户影响面最大的可靠性问题，建议优先催促 PR #3320 的 merge 决策。

---

## 6. 功能请求与路线图信号

当前社区提出的需求与已提交但未合并的功能 PR 相互对应，可以初步推断下一版本的候选功能倾向：

- **IRC 长消息重组（#3287）**：属于 IRC 协议正确性改进，与现有 IRC 接入逻辑强相关。如果该 Issue 获得维护者确认，可能作为后续 `irc` channel 模块的迭代方向进入下一个 minor 版本。

- **MCP OAuth 2.1 支持（#3302）**：被标记为 Nice-to-Have，受 #2546 影响。短期内进入 Roadmap 的概率较低，除非有企业用户进一步推动。

- **新增 Simplex 协议渠道（PR #3193）**：已开放近 1.5 个月且无 review 反馈，具有完整功能实现。合入后可在通讯矩阵中引入 Simplex 这一隐私优先信道，是扩展覆盖面的重要候选。

- **DeltaChat 重构（PR #3222）**：属于工程质量改进（含弃用遗留的 password 配置、删减 200 行冗余代码、完善帮助文档），对于项目健康度有正向作用，但无用户可见的新功能。反馈周期已超过一个月，需要维护者明确处理结论。

结合两者判断，**下一版本最有可能的方向是 "通道稳定性为主，新渠道为辅"**：优先合入 WhatsApp 修复 (#3320) 与缓存性能优化 (#3321)，随后评估 DeltaChat 重构 (#3222) 若 Simplex (#3193) 经 review 质量合格，则一并纳入。

---

## 7. 用户反馈摘要

以下反馈摘自今日活跃的 Issues 正文及用户描述（评论内文未捕获）：

- **真实痛点 1（IRC 用户）**：PicoClaw 将 IRC 客户端自动拆分的长消息视为多条独立消息，导致 AI 对多行回复的理解出现偏差。用户期望 IRCv3 的拼接语义被原生支持。→ 反映该项目的 IRC 适配层还不够协议完整。

- **真实痛点 2（Web 用户）**：在 Firefox 中聚焦聊天输入框时 CPU 占用显著偏高，该用户在 0.3.1 版本上复现，并已随 Issue 附上环境配置（Go 1.26 / DeepSeek-v4-flash）。该反馈最终未获明确的修复结论即被关闭，可能让用户感到流程不透明。

- **满意度倾向**：两条 PR (#3320, #3321) 均由同一社区贡献者 @grrowl 在两天内连续提交，修复内容直接、定位准确，说明外部贡献者对项目认知清晰、参与意愿强。但维护者侧响应速度未同步，**PR 从提交到 review 的周期已超过 24 小时且无任何评论，这可能是外部贡献热情衰减的潜在风险**。

---

## 8. 待处理积压

以下为长时间未获维护者明确动作的 Issue / PR，建议优先关注：

1. **PR #3193 — Added simplex channel type（待合并，已挂 43 天）**  
   创建时间 2026-06-27，已标记 `[stale]`，功能完整待 review。  
   https://github.com/sipeed/picoclaw/pull/3193

2. **PR #3222 — refactor(deltachat): cleanup implementation（待合并，已挂 37 天）**  
   创建时间 2026-07-03，已标记 `[stale]`，重构内容成熟。  
   https://github.com/sipeed/picoclaw/pull/3222

3. **Issue #3302 — Support OAuth 2.1 for MCP servers（活跃但未获官方回复）**  
   创建时间 2026-07-30，更新于 8 月 8 日，无维护者评论。  
   https://github.com/sipeed/picoclaw/issues/3302

4. **Issue #3287 — Better support long messages in IRC（stale 后重新活跃）**  
   创建时间 2026-07-22，4 条评论全部来自社区，官方仍未表态。  
   https://github.com/sipeed/picoclaw/issues/3287

5. **Issue #3292 — CPU usage too high when focus on input box（已关闭，但未给出修复或解决说明）**  
   建议确认关闭原因（重复报告？还是已在线下解决？），并在对应 Release 中注明。  
   https://github.com/sipeed/picoclaw/issues/3292

> 整体评价：项目当前处于 **功能储备期而非交付期**，有 4 个有价值的 PR 待纳入主干，同时社区贡献活跃但维护者响应存在滞后。建议今日优先处理 PR #3320 的 review 与合并，以修复 WhatsApp 通道这一直接影响用户的稳定性问题。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-09

## 1. 今日速览

过去 24 小时项目活跃度中等偏上：共 8 条 Issue 更新（5 条新开/活跃、3 条关闭），6 条 PR 更新（3 条待合并、3 条已合并/关闭），无新版本发布。架构级能力「远程 HTTP/SSE MCP 服务器支持」（#2776）及其首个落地集成 Strava MCP 技能（#2777）已关闭合入；Mattermost 渠道集成以适配新 `ChannelAdapter` 架构的形态重新提交（#3202）。社区焦点集中在 Discord 审批按钮失效问题（#3201，对应修复 PR #3185 仍待合并），另有 3 个新 Bug（#3203/#3204/#3206）处于未分配状态，其中 codex provider 类型检查失败直接威胁 main 分支构建健康度。综合判断：项目处于「功能扩展与稳定性修补并行」的活跃窗口，但新引入的构建级回归需要维护者尽快介入。

## 2. 版本发布

无（过去 24 小时无新 Release 发布）。

## 3. 项目进展

今日关闭/合并的 PR 均为里程碑式贡献，值得重点关注：

- **[PR #2776]（已合并/关闭）feat: support remote HTTP/SSE MCP servers** — 将 MCP 服务器支持从 stdio 扩展为 `McpServerConfig` 联合类型，新增 `McpServerRemoteConfig`（`type`/`url`/`headers`/`instructions` 字段），并为 `ncl groups config add-mcp-server` 增加 `--type`、`--url`、`--header` 参数。这是 NanoClaw 接入远程 MCP 生态的基础架构能力。
  https://github.com/nanocoai/nanoclaw/pull/2776

- **[PR #2777]（已合并/关闭）feat: add /add-strava skill** — 基于上述远程 MCP 能力接入 Strava 官方 MCP 端点，包含 host 侧一次性 OAuth 流程（`scripts/strava-oauth.ts`）与 token 自动刷新模块。为新渠道/技能集成提供了可复制的范式。
  https://github.com/nanocoai/nanoclaw/pull/2777

- **[PR #3199]（已合并/关闭）Add Mattermost channel integration (v2 ChannelAdapter)** — 针对 pre-v2 架构的旧 PR #546 的替代实现；虽被紧随其后的 #3202 取代，但确认了 Mattermost 集成已按当前 `ChannelAdapter`/`channel-registry.ts` 契约完成重写。
  https://github.com/nanocoai/nanoclaw/pull/3199

- **[PR #3202]（待合并）Add Mattermost channel integration** — 基于新架构的正式提交，复用社区包 `chat-adapter-mattermost` 并通过 `registerChannelAdapter` 注册，目标关闭 Issue #1379。若合并，Mattermost 将成为 Slack、Discord、Signal、Telegram 之外的新渠道。
  https://github.com/nanocoai/nanoclaw/pull/3202

此外，[Issue #3177] 关于 Docker 跨挂载文件系统 SQLite 锁竞争的修复已关闭，意味着该稳定性问题已合入主线。

## 4. 社区热点

- **[Issue #3201]（2 条评论，已关闭）Discord 审批按钮点击不生效** — 今日最受关注的反馈：owner 角色点击 Approve 后卡片仍显示 "0 by [user]"，配置更新请求随后被拒绝。该问题直接破坏 Discord 渠道上的审批/治理流程，与开放中的修复 PR #3185 直接关联。背后诉求是审批链路的可靠性，预计 #3185 合并后闭环。
  https://github.com/nanocoai/nanoclaw/issues/3201

- **[Issue #3200]（1 条评论，已关闭）疑似提示词注入/滥用内容** — 标题为超长「The Cartographer」人格化提示词，属于典型的非技术性滥用/垃圾 Issue。已在 24 小时内被关闭，说明维护者对无效内容响应迅速、社区治理有效。
  https://github.com/nanocoai/nanoclaw/issues/3200

- **[Issue #3177]（1 条评论，已关闭）Docker 跨挂载 SQLite 锁竞争** — 该 Issue 聚集了 Docker 部署用户对稳定性的强烈关注（29,000+ readonly 错误、间歇性投递失败），现已关闭，修复合入对容器化部署用户是重大利好。
  https://github.com/nanocoai/nanoclaw/issues/3177

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | 编号 | 问题描述 | 状态 | 修复 PR |
|---|---|---|---|---|
| 🔴 高 | [#3203] | codex provider 发出未在 `ProviderEvent` 中声明的 `file` 事件，`/add-codex` 在 main 分支类型检查失败；即使编译通过，codex 生成图片也无人消费、被静默丢弃 | OPEN | 无 |
| 🔴 高 | [#3206] | `extractAttachmentFiles` 以 `isSafeAttachmentName(messageId)` 拦截含 `/` 或 `\` 的 message ID，导致 Google Chat 等渠道的入站附件被静默丢弃（数据丢失） | OPEN | 无 |
| 🟡 中 | [#3201] | Discord 审批卡片点击 Approve 后投票不注册、请求被拒绝（owner 角色无法审批配置更新） | CLOSED | [#3185] 待合并 |
| 🟡 中 | [#2528] | Signal 渠道图片/PDF 附件到达 host 后，容器内 agent 无法打开（已开放约 82 天） | OPEN | 无 |
| 🟢 低 | [#3204] | `.claude/skills/add-opencode/SKILL.md` 仍指导编辑已被 `cli-tools.json` 重构移除的 Dockerfile `ARG`+`RUN` 安装块，且 guard 测试断言旧结构 | OPEN | 无 |

已修复项：[Issue #3177]（SQLite Docker 锁竞争）已关闭合入，解决了 `inbound.db`/`outbound.db` 在 VirtioFS 跨挂载下的高频 readonly 错误。
https://github.com/nanocoai/nanoclaw/issues/3177

## 6. 功能请求与路线图信号

- **[Issue #3205] Support persistent group-scoped OneCLI secret assignment** — 提出了 NanoClaw 多用户场景下 spawn 时密钥分配的设计分叉：vault secret 的授予范围缺少持久化 per-group 模型。该设计决策将影响 OneCLI 凭据网关的后续演进，建议维护者明确方向后纳入路线图。
  https://github.com/nanocoai/nanoclaw/issues/3205

- **[PR #3202] Mattermost 渠道集成** — 新提交且目标明确（Closes #1379），是当前最接近合入的新功能 PR，预计进入下一版本。
  https://github.com/nanocoai/nanoclaw/pull/3202

- **[PR #2877] Telegram 原生富文本渲染（Bot API 10.1 `sendRichMessage`）** — 已标注 `[follows-guidelines]`，自 6 月 28 日起开放 41 天，等待 reviewer 推进。若合入，Telegram 渠道消息呈现将明显升级。
  https://github.com/nanocoai/nanoclaw/pull/2877

- **远程 MCP 支持落地（#2776/#2777）** 为后续接入更多 HTTP/SSE 型 MCP 服务铺平道路，预计将成为下一阶段生态扩展的主要途径。

## 7. 用户反馈摘要

- **Discord 审批流不可用（@churchcrm-hazel）**：「卡片在点击后仍显示 '0 by [user]'，请求随后被拒绝」——owner 角色无法完成配置更新审批，治理操作完全受阻。该反馈直接催生了修复 PR #3185。
  https://github.com/nanocoai/nanoclaw/issues/3201

- **Docker 部署稳定性痛点（@DawoudIO）**：SQLite DELETE journal 模式无法跨 Docker 挂载（VirtioFS）传播，产生 29,000+ readonly 错误和间歇性投递失败——对 macOS/Linux 容器化部署用户造成实质性可用性影响。该问题已修复关闭。
  https://github.com/nanocoai/nanoclaw/issues/3177

- **新贡献者活跃、集成意愿强（@wakqasahmed）**：同一作者在两天内连续提交 Mattermost 集成两个版本（#3199 → #3202），并在新版本中主动对齐 `ChannelAdapter` 契约，反映社区对新增渠道有明确需求且愿意配合架构演进。

## 8. 待处理积压

需维护者重点关注以下长期未响应或高优先级事项：

1. **[Issue #2528] Signal 渠道附件不可达** — 开放 82 天，无维护者回复、无评论更新。图片/PDF 附件在容器内不可用属于功能性缺陷，建议尽快 triage 并给出临时规避方案。
   https://github.com/nanocoai/nanoclaw/issues/2528

2. **[PR #3185] Discord custom_id 分隔符修复** — 开放 5 天，但直接决定 #3201 所代表的审批功能是否可用，建议优先审查合并。
   https://github.com/nanocoai/nanoclaw/pull/3185

3. **[PR #2877] Telegram sendRichMessage 富文本渲染** — 开放 41 天，贡献者已按指南标注，缺乏 reviewer 推进信号。
   https://github.com/nanocoai/nanoclaw/pull/2877

4. **[Issue #3203]/[#3206]/[#3204]** — 三个新 Bug 均无认领人、无 fix PR，其中 #3203（main 分支类型检查失败）与 #3206（附件静默丢失）应优先分配。
   https://github.com/nanocoai/nanoclaw/issues/3203
   https://github.com/nanocoai/nanoclaw/issues/3206
   https://github.com/nanocoai/nanoclaw/issues/3204

---

**项目健康度小结**：贡献者活跃度良好（新渠道、远程 MCP 双线推进），Issue 关闭率较高（8 条中关闭 3 条，含 1 条垃圾内容快速处置）。但 main 分支存在未修复的构建级回归（#3203），且 Signal 附件问题积压近 3 个月，建议维护者优先处理高严重度 Bug，维持「功能扩展」与「稳定性」的平衡。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-09

## 1. 今日速览

过去24小时项目活跃度极高：Issue 侧 25 条更新中 23 条已关闭（关闭率 92%），PR 侧 50 条更新中 32 条已完成合并或关闭（完成率 64%），大量 5 月至 6 月开启的 Reborn 重构跟踪 Issue 于昨日集中关闭，表明 **Reborn 架构迁移已跨过关键里程碑**。同时，Web Debug Inspector（v1.1.0 epic）、Web Push 通知、Slack/Telegram 共享会话等新功能处于密集开发与审查期，贡献者覆盖 core 与 new/experienced 多个梯队。无新版本发布，项目处于大版本前的功能收口与硬化阶段。

---

## 3. 项目进展

### 已合并/关闭的重要 PR

- **身份语义统一落地** — [#7377 feat!: a run acts as its invoker — remove shared-route subject binding (#7157 follow-ups)](https://github.com/nearai/ironclaw/pull/7377)（CLOSED，XL，risk: medium）
  合并了此前 #7157 的三处遗留分裂，并折叠了 2026-08-08 多智能体审计的全部 must-fix 发现。这是本轮最重要的架构一致性变更：**运行身份与调用者绑定**，为后续共享会话、多租户策略打下基础。

- **技能选择权回归模型** — [#6938 fix(skills): the model chooses the skill, not a keyword scorer](https://github.com/nearai/ironclaw/pull/6938)（CLOSED，XL）
  彻底移除宿主侧关键词打分选技能的机制，改为仅由模型通过 `builtin.skill_activate` 激活。这一变更修正了此前"两个东西都能激活技能但只有一个留痕"的隐患，是技能系统可观测性的重要修复。

- **外发投递可靠性加固** — [#7029 fix(product): restore durable delivery claim](https://github.com/nearai/ironclaw/pull/7029)（CLOSED，XL）
  恢复 `Prepared -> Sending` 比较并交换（CAS）作为厂商出口所有权的唯一权威路径，修复了投递认领可能丢失的问题。

- **Live QA 通道修复** — [#7389 fix(live-qa): verify triggered Slack delivery through the two-lane contract](https://github.com/nearai/ironclaw/pull/7389)（CLOSED，XL）
  修复了 #7157 合并后 `reborn-webui-v2-live-qa` 定时任务持续失败的问题——投递用例仍依赖已退役的 completion-driver push 记录，现改为验证双通道契约。

- **压力测试基础设施** — [#7382 feat(stress): scripted tool-call workload with durable write read-back (#7360)](https://github.com/nearai/ironclaw/pull/7382)（CLOSED，XL）
  为 `api-user-capacity` 场景新增 `--api-scripted-tool` 模式，mock LLM sidecar 可驱动确定性工具序列并验证持久化读回。

- **Inspector 测试覆盖** — [#7280 test(inspector): add browser, security, and operator coverage](https://github.com/nearai/ironclaw/pull/7280)（CLOSED，L）
  为 Web Debug Inspector 补充了权限、跨作用域隔离、无效游标、连接上限等安全覆盖。

### 批量关闭的 Reborn 迁移 Issue

昨日共有 23 条 Issue 关闭，绝大多数属于 Reborn 重构跟踪项，包括：

- [#3280 [Reborn] Add ProductWorkflow and InboundTurnService facade](https://github.com/nearai/ironclaw/issues/3280)（CLOSED，评论 7）— Reborn 产品工作流 facade 落地
- [#3288 Reborn: production/scoped capability lifecycle admin parity](https://github.com/nearai/ironclaw/issues/3288)（CLOSED）
- [#3287 [Reborn] Migrate memory and workspace product surfaces](https://github.com/nearai/ironclaw/issues/3287)（CLOSED）
- [#3286 [Reborn] Preserve agent command behavior through Reborn loops and services](https://github.com/nearai/ironclaw/issues/3286)（CLOSED）
- [#3285 [Reborn] Migrate external channel adapters onto ProductAdapter contract](https://github.com/nearai/ironclaw/issues/3285)（CLOSED）
- [#4118 Reborn CLI provider add/login parity](https://github.com/nearai/ironclaw/issues/4118)（CLOSED）
- [#4470 Refactor reborn composition into owned crates with CI-enforced boundaries](https://github.com/nearai/ironclaw/issues/4470)（CLOSED）

这批关闭标志着 **Reborn 产品面迁移、CLI 对等、组合层拆分的核心工作已告一段落**，项目正式从"迁移期"进入"新功能叠加期"。

---

## 4. 社区热点

- [#3280 [Reborn] Add ProductWorkflow and InboundTurnService facade](https://github.com/nearai/ironclaw/issues/3280) — 评论 7 条
  今日最受关注的 Issue，虽然是已关闭的跟踪项，但围绕 ProductAdapter → ProductWorkflow → Reborn 服务的分层设计有密集讨论。社区对 Reborn 最终形态的架构设计关注度最高。

- [#6989 Token accounting: hybrid provider-usage + tail estimates; fix ModelWorkRequest estimating from the content reference string](https://github.com/nearai/ironclaw/issues/6989) — 评论 5 条，OPEN
  P1 级 Bug 讨论活跃。核心矛盾在于 `ModelWorkRequest::for_assistant` 用 `content_ref.as_str().len()` 估算 token——即按**引用字符串长度**而非**被引用内容**估算，导致输入 token 数系统性偏差。这直接影响按量计费与成本观测，社区关注度高。

- [#7398 feat(web-push): browser push notifications + PWA — the web app as a first-party notification channel](https://github.com/nearai/ironclaw/pull/7398)（OPEN，XL，risk: medium）
  新提交的 PR，将 Web 应用升级为一等通知渠道（W3C Web Push / RFC 8030 / VAPID），与 Slack/Telegram 对齐。这是"Web 作为自动化的第一方终点"的重要信号，预计会引发关于通知权限模型与多端投递语义的讨论。

- [#7397 Presence-based shared conversations for Slack & Telegram](https://github.com/nearai/ironclaw/pull/7397)（OPEN，XL，risk: medium）
  基于 #7377 的 acting-identity 阶梯实现共享会话，让 owner ≠ actor 成为安全的日常运行形态。社区对多用户协作场景的需求正在显性化。

---

## 5. Bug 与稳定性

### 严重级别：高

- **[#6989] Token 估算：从引用字符串长度而非被引用内容估算（P1，OPEN）** — https://github.com/nearai/ironclaw/issues/6989
  `ModelWorkRequest::for_assistant` 从 `content_ref.as_str().len()` 估算输入 token，结果是引用串长度而非实际内容长度。影响模型成本核算、配额管理与提示词可观测性。已归属 pi-harness 采用计划（P1 #6），目前**尚无 fix PR**。

### 严重级别：中

- **[#7395] 外发发送认领 TOCTOU 竞态 + 失败行重开（fix PR 待合并）** — https://github.com/nearai/ironclaw/pull/7395
  `claim_delivery_attempt_for_send` 先前的 bool 返回 + 独立重读模式存在 CAS 竞态窗口，可能将发送行误判为 claim-loss。修复将 CAS 失败与行状态重读合并为原子判定，并允许失败行重新打开。PR 状态 OPEN（XL，risk: low），等待审查。

- **[#7352] Gate 投影身份冲突（fix PR 待合并）** — https://github.com/nearai/ironclaw/pull/7352
  同一 run 上多个同类审批/认证 gate 会派生完全相同的投影 ID（`run-notification:approval:<run_id>`），导致投递身份冲突。修复将投影身份绑定到具体 gate ref。PR 状态 OPEN（L，risk: low）。

- **[#7171] 技能安装后"消失"——DB 支撑的统一技能挂载树（fix PR 待合并）** — https://github.com/nearai/ironclaw/pull/7171（closes [#7168](https://github.com/nearai/ironclaw/issues/7168)）
  此前安装技能返回 `{"installed": true}` 但技能在 Settings → Skills 中不可见、也无法激活。修复将每个技能挂载点统一为 DB 支撑的树，并支持技能自身命令执行。PR 状态 OPEN（XL，risk: low）。

- **[#7048] WASM 访客诊断信息未消毒即写入 tracing（fix PR 待合并）** — https://github.com/nearai/ironclaw/pull/7048
  访客日志可能携带敏感数据直接进入 tracing。修复依赖 #7063 合并后解堆叠。PR 状态 OPEN（XL，risk: low）。

### 严重级别：低（已修复）

- [#7377] 多智能体审计发现的全部 must-fix 已在合并前折叠修复（见项目进展）
- [#7389] `reborn-webui-v2-live-qa` 定时任务持续失败问题已修复
- [#7029] 投递认领丢失问题已修复（合并）

---

## 6. 功能请求与路线图信号

### Web Debug Inspector（明确进入 v1.1.0）

- Epic: [#7218 Epic: Add the Web Debug Inspector](https://github.com/nearai/ironclaw/issues/7218)（OPEN，目标 v1.1.0）
  提供 Prompt 重构视图、实时 agent 活动、模型用量与工具执行三维调试能力，通过 `?debug=true` 启用。配套 PR：
  - [#7291 feat(inspector): complete statistics, navigation, and localization](https://github.com/nearai/ironclaw/pull/7291)（OPEN，human-verified）
  - [#7280 test(inspector): add browser, security, and operator coverage](https://github.com/nearai/ironclaw/pull/7280)（已合并）
  - [#7226 Add browser, security, and documentation coverage](https://github.com/nearai/ironclaw/issues/7226)（CLOSED）

  综合判断：**Inspector 功能已进入收尾阶段，大概率随 v1.1.0 发布**。

### Web Push 通知（新方向）

- [#7398 feat(web-push): browser push notifications + PWA](https://github.com/nearai/ironclaw/pull/7398)（OPEN，XL）
  Web 应用成为第一方通知渠道，实现与 Slack/Telegram 对等的自动化通知能力。这是 Web 平台从"管理端"走向"运行时入口"的信号，预计会进入下一版本路线图。

### Slack 渐进式预览

- [#7396 feat(channels): add generic progressive previews for Slack](https://github.com/nearai/ironclaw/pull/7396)（OPEN，XL）
  通过 `chat.startStream` / `chat.appendStream` / `chat.stopStream` 实现 Slack 渐进式消息预览，且保持最终消息路径为唯一权威投递。属于渠道体验增强，方向明确但优先级可能低于 Inspector 与身份语义。

### 共享会话（协作方向）

- [#7397 Presence-based shared conversations for Slack & Telegram](https://github.com/nearai/ironclaw/pull/7397)（OPEN，XL）
  在多用户场景中安全地让一个 run 以调用者身份工作，配合 #7377 的 acting-identity 阶梯。这是产品从单用户走向多租户协作的重要一步。

---

## 7. 用户反馈摘要

- **技能安装后不可见是近期最尖锐的体验问题**（[#7168](https://github.com/nearai/ironclaw/issues/7168) → [#7171](https://github.com/nearai/ironclaw/pull/7171)）：用户安装技能收到成功响应后，技能在设置中消失、无法激活。这类"静默丢失"对信任伤害最大，修复 PR 已提交并明确关闭了该 Issue。

- **OAuth 审批门重复触发**（[#4382](https://github.com/nearai/ironclaw/issues/4382)，已关闭）：用户完成 Notion/Google 认证后，OAuth 门仍会再次触发。根因是缺少"每个 provider 默认账号"的持久化。该问题已关闭，说明已解决或已并入 Reborn approvals parity 的更大范围。

- **Token 估算偏差影响成本信任**（[#6989](https://github.com/nearai/ironclaw/issues/6989)）：引用字符串长度 vs 被引用内容长度的估算偏差，属于典型的"基础设施计算口径"问题。用户侧感受到的是成本数字不准确，底层是架构层的估算模型缺陷。该 Issue 仍在讨论中，社区期待尽快有 fix。

- **Reborn 迁移获得认可**：昨日集中关闭的 23 条 Issue 中，多数有作者 @serrrfirat 的确认关闭记录。从关闭节奏看，社区对 Reborn 架构的推进速度与质量整体认可，CLI 对等、渠道迁移、能力生命周期管理等长期跟踪项陆续收口。

---

## 8. 待处理积压

- **[#6989] P1 Token 估算 Bug 尚无 fix PR** — https://github.com/nearai/ironclaw/issues/6989
  创建于 8 月 1 日，已活跃 8 天，评论 5 条。属于计费相关的高影响缺陷，建议优先指派。

- **[#7048] WASM 诊断消毒依赖堆叠阻塞** — https://github.com/nearai/ironclaw/pull/7048
  自 8 月 3 日起 OPEN，依赖 #7063 合并后需 peel/rebase 才能继续审查。长期堆叠容易引入冲突，建议维护者关注依赖链的合并时机。

- **[#7028] / [#7029] 外发恢复与投递认领的堆叠依赖** — https://github.com/nearai/ironclaw/pull/7028 / https://github.com/nearai/ironclaw/pull/7029
  #7029 已合并，但 #7028（保存终态状态 + CAS 保护的 `Sending -> Unknown` 转换）仍 OPEN，需确认是否已 rebase 到最新 main。

- **[#7218] Web Debug Inspector Epic 无评论且无里程碑** — https://github.com/nearai/ironclaw/issues/7218
  虽然配套 PR 活跃，但 epic 本身标记为 v1.1.0 且 0 评论，建议维护者补充验收标准与进度跟踪，避免 epic 与实际 PR 脱节。

- **18 条 OPEN PR 中 3 条来自新贡献者（@theredspoon）**：#7395、#7394、#7352 均处于待审查状态。新贡献者的 PR 质量标注为 low risk，建议维护者优先安排审查，避免新贡献者等待过久。

---

**总结**：IronClaw 正处于 Reborn 重构收尾与 v1.1.0 新功能叠加的交替期。项目健康度良好——关闭率高、审查活跃、审计驱动修复（#7377）在上游拦截了系统性风险。下一步需关注 P1 token 估算修复的排期、新贡献者 PR 的审查及时性，以及 Open PR 的堆叠依赖清理。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-09

## 1. 今日速览

过去 24 小时项目活跃度偏低：1 条 Issue 更新，3 条 PR 更新，无新版本发布。所有更新的 Issue / PR 均带有 `stale` 标记，且创建时间可追溯至 4 月至 7 月，说明这些条目已长期处于未决状态。唯一被关闭的 PR #2193（LiteLLM AI 网关支持）状态为 CLOSED，是否合并进主线未能从数据中确认。核心进展主要来自性能优化 PR #1193（SQLite 写入放大修复）——该 PR 仍未获维护者合并，属于高质量但积压的技术改进。整体项目活跃度呈放缓态势，长期积压（stale）条目是当前健康度的主要关注点。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

**今日无明确确认合并的功能变更。** 唯一状态变更的 PR 是 #2193，但该 PR 已被关闭，未确认是否成功合并。项目核心代码的可见推进有限，不过有一个值得关注的高价值性能 PR 仍处于待合并状态：

- **#1193 — perf(sqlite): eliminate write amplification with debounce + batch transactions** `[OPEN][stale]`  
  该 PR 针对 `sql.js` 的持久化性能问题：每次行级变更都会触发全量 `db.export()` + `fs.writeFileSync()`，造成严重的写入放大。PR 计划通过 debounce + 批量事务将多次小写入合并为一次持久化。如果该 PR 被采纳，将显著改善存储层的写入延迟与 I/O 开销。目前 PR 已被标记为 `stale`，建议维护者重点关注。  
  📎 https://github.com/netease-youdao/LobsterAI/pull/1193

- **#2193 — feat: add LiteLLM as AI gateway provider** `[CLOSED][stale]`  
  该 PR 旨在引入 LiteLLM 作为 AI 网关，目标是通过 OpenAI 兼容端点对接 100+ LLM 提供商，且无需新增依赖。PR 已关闭，合并状态不明确，若未合并，则意味着这一多模型网关扩展尚未进入主线。  
  📎 https://github.com/netease-youdao/LobsterAI/pull/2193

- **#2294 — docs: add TakoAPI directory badge** `[OPEN][stale]`  
  纯文档类 PR，为项目 README 添加 TakoAPI 开放目录徽章，不涉及功能变更。  
  📎 https://github.com/netease-youdao/LobsterAI/pull/2294

**总结：** 今日项目在功能层面几乎没有推进，核心动作是维护者将长期未处理的 PR / Issue 标记为 `stale`。SQLite 性能优化 PR 是当前最有潜力提升项目质量的未决变更。

## 4. 社区热点

今日讨论最活跃的是唯一有用户评论的 Issue **#1192**：

- **#1192 — 自定义已有工具的默认配置** `[OPEN][stale]`，作者 @duzhen1996，1 条评论  
  用户反馈在使用 browser 工具时，不希望浏览器窗口弹出，而希望默认以无头模式运行。用户曾尝试通过"记忆"让大模型遵循该偏好，但模型指令跟随不稳定，无法可靠生效。因此用户希望能够在代码层面**写死默认配置**，完全绕过大模型的临时决策。  
  📎 https://github.com/netease-youdao/LobsterAI/issues/1192

**诉求分析：** 这条 Issue 触及 AI Agent 框架的一个核心矛盾——用户期望**确定性系统行为**，但大模型的"自由意志"带来了不确定性。用户并不满足于"建议式"的偏好记忆，而是需要"强制式"的配置覆盖机制。这反映出用户对模型指令跟随能力的不信任，以及对框架提供更高阶配置优先级的迫切需求。

## 5. Bug 与稳定性

今日未报告崩溃级或回归级 Bug，但以下性能问题值得关注：

- **SQLite 持久化写入放大（性能缺陷）** —— 对应 PR #1193  
  根因是 `sql.js` 的数据库完全驻留内存、无增量持久化能力。`SqliteStore.save()` 每次变更都会执行全量 `db.export()` + 整库 `fs.writeFileSync()`，导致：
  - 数据量增长后写入延迟显著上升
  - 频繁全量写盘加速存储介质损耗
  
  该问题已在 #1193 中给出修复方案（debounce + 批量事务），但 PR 自 4 月以来一直未获合并，且已进入 stale 状态。**这是当前存储层最值得优先处理的技术债。**  
  📎 https://github.com/netease-youdao/LobsterAI/pull/1193

## 6. 功能请求与路线图信号

- **确定性配置覆盖机制（来自 Issue #1192）**：用户希望为已有工具提供"写死默认配置"的能力，例如强制 browser 以无头模式启动。这暗示项目可能需要引入"配置优先级"体系——**用户显式配置 > 模型即时决策**。这条请求与 Agent 框架的可靠性、可预测性方向密切相关，有理由被纳入下一版本的配置模块改进计划。  
  📎 https://github.com/netease-youdao/LobsterAI/issues/1192

- **AI 网关多提供商支持（来自 PR #2193）**：LiteLLM 集成 PR 展示了社区对"通过统一端点接入多家 LLM 提供商"的需求。尽管该 PR 已被关闭，但这仍是 Agent 框架在实际部署中绕不开的方向（多模型切换、成本优化、供应商容灾）。若 #2193 未被合并，建议维护者在路线图中重新评估该功能的优先级并考虑重新开放。  
  📎 https://github.com/netease-youdao/LobsterAI/pull/2193

## 7. 用户反馈摘要

来自 Issue #1192 的真实用户声音：

- **痛点：** 大模型指令跟随能力不可靠。用户明确要求"无头模式启动浏览器"，但模型经常不遵循该指令。
- **使用场景：** 用户希望在后台静默运行 browser 工具，不因弹出窗口而打扰正常桌面工作。
- **期望方案：** 用户希望能直接手写/固化一个默认配置（"写死"），使工具行为变得确定，而不是每次都依赖模型临场判断。
- **情绪：** 用户语气克制，但能感受到对不确定性行为的挫败感——"大模型的指令跟随经常不好"。

这一反馈与 AI Agent 助手类产品的落地体验直接相关：**当模型不可靠时，系统应提供绕过模型的确定性兜底机制。** 这是一条用户价值很高的反馈，建议产品团队认真评估。

📎 https://github.com/netease-youdao/LobsterAI/issues/1192

## 8. 待处理积压

以下条目均已带 `stale` 标记，长期未获有效响应，建议维护者尽快人工复审：

| 编号 | 类型 | 内容 | 创建时间 | 已搁置时长 | 优先级评估 |
|------|------|------|----------|------------|------------|
| #1193 | PR | SQLite 写入放大性能修复 | 2026-04-01 | ~4 个月 | **高** — 直指存储层核心性能瓶颈，方案成熟，值得尽快合并或给出明确反馈 |
| #1192 | Issue | 用户要求"固化默认配置"以规避模型指令跟随不稳定 | 2026-04-01 | ~4 个月 | **高** — 反映核心用户体验问题，与客户满意度直接相关 |
| #2294 | PR | 添加 TakoAPI 目录徽章（文档） | 2026-07-08 | ~1 个月 | **低** — 非功能性变更，可批量处理或直接关闭 |

📎 PR #1193: https://github.com/netease-youdao/LobsterAI/pull/1193  
📎 Issue #1192: https://github.com/netease-youdao/LobsterAI/issues/1192  
📎 PR #2294: https://github.com/netease-youdao/LobsterAI/pull/2294

---

**项目健康度评估：** 活跃度较低，长期积压的 stale 条目增多，核心功能 PR 未获及时响应。建议维护团队优先处理 #1193（高价值性能修复）与 #1192（关键用户体验反馈），避免项目因响应过慢而损失贡献者与用户信任。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-09

## 1. 今日速览

过去 24 小时内，Moltis 项目共更新 2 条 Issues（新开 1 条、关闭 1 条）和 1 条 PR（已合并/关闭），整体活跃度处于中等水平。值得关注的是，一个持续约两个月的 Docker 沙箱文件系统工具回归问题（#1096）最终通过 PR #1105 完成修复，解决了 `Read`/`Write`/`Edit` 在 Docker 环境中失效的核心痛点。新提交的 Issue #1185 指向 Apple Container 1.x 沙箱状态误判问题，目前尚无评论和修复 PR，属于待跟进状态。项目当日无新版本发布，稳定性修复是当前主要推进方向。

## 3. 项目进展

### 🔧 已修复：Docker 沙箱文件系统工具回归

- **PR #1105 — Fix Docker sandbox filesystem tool fallback**（[链接](https://github.com/moltis-org/moltis/pull/1105)）
  - 由 @penso 提交，于 2026-08-08 关闭。
  - 为 sandbox 环境下的 `Read`/`Write`/`Edit`/`MultiEdit` 操作（涉及 `/home/sandbox` 与 `workspace/data` 路径）补充了回归测试覆盖。
  - 核心修复：当网关进程无法访问宿主机挂载路径时，自动从翻译后的 Docker 宿主路径回退到容器内操作，确保工具在纯容器环境中依然可用。

这一 PR 直接对应并修复了已关闭的 Issue #1096（`Read`/`Write`/`Edit` tools don't work in Docker），解决了影响 Docker 用户近 2 个月的关键文件操作问题。从时间线看，该问题于 6 月初被报告，修复经历了一定周期的验证和迭代，最终落地，项目整体稳定性和容器环境兼容性迈出了重要一步。

## 4. 社区热点

过去 24 小时内所有 Issues 和 PR 的评论数均为 0，暂无高度活跃的社区讨论。当前社区关注焦点仍集中在沙箱/容器工具链的稳定性上，新 Issue #1185 与此主题一脉相承，预计可能成为短期内社区关注的新热点。

## 5. Bug 与稳定性

### 严重程度：中高（新报告，无修复方案）

- **[#1185] [Bug]: Apple Container 1.x sandbox starts but Moltis treats it as not running**（[链接](https://github.com/moltis-org/moltis/issues/1185)）
  - 报告者：@mikz | 创建时间：2026-08-08 | 评论：0
  - 问题描述：Apple Container 1.x 沙箱实际已启动，但 Moltis 错误地判定其未运行，导致后续流程无法正常进行。
  - 影响面：影响使用 Apple Container 1.x 的 macOS 用户；目前暂无修复 PR 或维护者回应。

### 已解决（今日关闭）

- **[#1096] `Read`/`Write`/`Edit` tools don't work in Docker**（[链接](https://github.com/moltis-org/moltis/issues/1096)）
  - 报告者：@IlyaBizyaev | 创建：2026-06-03 | 关闭：2026-08-08
  - 解决方式：由 PR #1105 完成修复（见上文“项目进展”），该问题正式关闭。

## 6. 功能请求与路线图信号

今日没有新的功能请求类 Issue。但从已合并的 PR #1105 中可以看出，项目对沙箱/容器环境的文件系统操作能力进行了一次系统性加固，暗示以下方向很可能进入近期路线图：

- **容器/沙箱环境下的工具链可靠性**：包括路径翻译回退机制、宿主机/容器双栈兼容等。
- **Apple Container 支持完善**：#1185 的提出表明 Moltis 已在面向 Apple Container 1.x 场景，未来可能针对该平台补充更精确的沙箱状态检测逻辑。

整体来看，项目当前处于“稳定性优先”的迭代阶段，功能新增暂缓，修复存量问题仍是主线。

## 7. 用户反馈摘要

由于当前数据内所有 Issue/PR 均无用户评论，无法提取直接的评论性质反馈。但从 Issue 内容和状态可推断以下用户痛点：

- 使用 Docker 沙箱的用户曾长期遭遇文件读写工具失效（#1096），期间工作流受阻，该问题现已解决。
- Apple Container 1.x 用户面临“沙箱实际运行但被误判为未运行”的阻断性 Bug（#1185），影响自动化任务执行，且目前无临时绕过方案。

建议维护者在后续回应中为 #1185 提供排查指导或临时 workaround。

## 8. 待处理积压

当前数据中无明显的“长期未响应”类 Issues 或 PR。综合来看：

- **#1185** 为新提交 Issue（不足 24 小时），尚在正常响应窗口期内，暂不构成积压。
- **#1096** 和 **#1105** 均已在今日关闭，清除了一个重要的长期积压项。

整体积压负担较轻，项目健康度良好，维护响应较为及时。

---

*本报告基于 2026-08-09 获取的 GitHub 数据自动生成，数据源：[Moltis Repository](https://github.com/moltis-org/moltis)。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-09


## 1. 今日速览

过去 24 小时 CoPaw 项目整体活跃度高：PR 更新量达 50 条，其中 3 条已合并/关闭，47 条仍在待合并队列中，显示社区贡献与维护评审节奏均处于密集状态。Issue 侧仅新增 1 条（#6838），集中于子代理功能的模型切换与目录共享缺陷，尚未有关联修复 PR 出现。无新版本发布，项目处于功能迭代与稳定性加固的并进阶段。整体健康度良好，但子代理相关体验问题及多条超过两周的积压 PR 值得关注。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日共 3 条 PR 被合并或关闭（具体编号未在数据概览中列出），整体合入/关闭率为 6%（3/50）。当前仍有 47 条开放 PR，其中多条处于 Under Review 阶段，重点项目方向包括：

**性能优化与基础设施：**
- [#6381 perf(drivers): avoid blocking on stale capabilities](https://github.com/agentscope-ai/QwenPaw/pull/6381) — 为共享 `AgentBuilder` 路径降低请求时 Driver 发现延迟，MCP 能力快照过期后先返回缓存、再后台异步刷新。
- [#6238 perf(drivers): initialize handlers concurrently](https://github.com/agentscope-ai/QwenPaw/pull/6238) — Driver 处理器并发初始化，上限 8 个并发连接，适用于多 MCP 配置场景的快速启动。

**可靠性修复：**
- [#6830 fix(memory): align compression and toolkit lifecycle](https://github.com/agentscope-ai/QwenPaw/pull/6830) — 修复 MemoryMiddleware 压缩前准备与实际上下文管理不一致、auto-memory 状态跨进程/重启无法延续、自动记忆污染 `AgentState.context` 等多处问题。
- [#6825 fix(mcp): apply configured timeout to client sessions](https://github.com/agentscope-ai/QwenPaw/pull/6825) — 修复 SDK `ClientSession` 未传入 5 分钟请求超时配置而导致旧会话请求可无限等待的问题。
- [#6725 fix(agents): report fork finalization failures in background tasks](https://github.com/agentscope-ai/QwenPaw/pull/6725) — 后台 fork 任务在工作树未完成 finalization 时仍报告成功，现改为如实上报失败。

**前端与体验：**
- [#6808 fix(console): show custom profile markdown files](https://github.com/agentscope-ai/QwenPaw/pull/6808) — 修复自定义 profile markdown 文件被后端过滤隐藏的问题。
- [#6750 fix(chat): session identity deadlock, early session save, oversized prompt collapse](https://github.com/agentscope-ai/QwenPaw/pull/6750) — 修复前端会话交互三处缺陷：会话身份失同步导致消息队列卡死、过早会话保存、超大提示词折叠异常。

**平台兼容性：**
- [#6586 fix(mcp): recover stale server sessions](https://github.com/agentscope-ai/QwenPaw/pull/6586) — 对 MCP 服务端重启或会话过期产生的 "Session terminated" 错误增加恢复机制，此前仅对传输层异常重连。


## 4. 社区热点

**[Issue #6838 [Bug] 子代理相关问题（今日唯一新 Issue）](https://github.com/agentscope-ai/QwenPaw/issues/6838)**
- 作者：@CreatorEdition | 创建/更新：2026-08-09 | 评论：1 | 👍：0

> 该 Issue 是今日社区讨论的核心，围绕子代理功能提出三点痛点：
> 1. 启用 `spawn_subagent` 自带子代理功能时无法自动切换模型（主代理旗舰模型 vs 子代理全量模型）；
> 2. 通过“智能体”方式配置子代理时，workspace 无法设置为同一目录；
> 3. 通过修改 `config.json` 实现共享目录会导致 web 端显示混乱，因为前端读取 `config.json` 后仍读取子目录下的 `chats.json`/`agent.json`。

社区热点分析：当前最突出的诉求集中在 **子代理的配置灵活性与一致性** 上，覆盖模型切换、目录共享、前端状态同步三个层面。该 Issue 同时触发了对 web 端配置文件读取机制的质疑，说明子代理功能已进入真实用户深度使用阶段，配置路径的体验短板正成为阻碍。

**PR 侧热点（按评论数排序）：**
- [#6381 perf(drivers): avoid blocking on stale capabilities](https://github.com/agentscope-ai/QwenPaw/pull/6381)
- [#6238 perf(drivers): initialize handlers concurrently](https://github.com/agentscope-ai/QwenPaw/pull/6238)
- [#6331 chore(website): declare Node 22 requirement](https://github.com/agentscope-ai/QwenPaw/pull/6331)（first-time-contributor）
- [#6615 fix(config): handle corrupted agent config and invalid JSON in load_agent_config](https://github.com/agentscope-ai/QwenPaw/pull/6615)（first-time-contributor, Under Review）
- [#6371 fix(file-handling): continue fallback after downloader timeout](https://github.com/agentscope-ai/QwenPaw/pull/6371)（first-time-contributor）
- [#6659 feat(providers): implement model fallback with cooldown mechanism](https://github.com/agentscope-ai/QwenPaw/pull/6659)（Under Review，关联 #2199 / #1327 / #2089 三个历史 Issue）
- [#6668 feat(providers): support responses prompt caching](https://github.com/agentscope-ai/QwenPaw/pull/6668)

在今日评论数 Top 20 PR 中，有 6 条来自首次贡献者（first-time-contributor），说明社区吸纳新贡献者的通道畅通；同时多个修复类 PR 围绕 MCP、配置解析、文件下载等“硬骨头”展开，社区讨论呈现“新老搭配、基础加固与功能创新并行”的活跃态势。


## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题描述 | 状态 | 链接 |
|--------|----------|------|------|
| 🟢 高 | 子代理功能三大问题：无法自动切换模型、workspace 无法共享目录、修改 config.json 导致 web 端显示混乱 | 已报告，**暂无关联修复 PR** | [#6838](https://github.com/agentscope-ai/QwenPaw/issues/6838) |
| 🟡 中 | fork 后台任务在 worktree 未 finalization 时仍上报 `completed` 成功状态 | 已有修复 PR | [#6725](https://github.com/agentscope-ai/QwenPaw/pull/6725) |
| 🟡 中 | MCP 客户端配置的超时（5 分钟）未传递给 SDK `ClientSession`，导致旧会话请求可无限挂起 | 已有修复 PR | [#6825](https://github.com/agentscope-ai/QwenPaw/pull/6825) |
| 🟡 中 | 会话身份 desync 导致消息排队但永不发送；超大 prompt 折叠异常 | 已有修复 PR | [#6750](https://github.com/agentscope-ai/QwenPaw/pull/6750) |
| 🟡 中 | 插件安装失败：`No module named 'utils.env'; 'utils' is not a package`（App Center 安装 qwenpaw-creator 场景） | 已有修复 PR，关联 #6683 | [#6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) |
| 🟢 低 | agent config 损坏（截断/非法 UTF-8）时 `load_agent_config()` 抛原始 `UnicodeDecodeError`/`json.JSONDecodeError` | 已有修复 PR（Under Review） | [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) |
| 🟢 低 | 下载器 wget/curl 超时未按文档回退到下一个下载器 | 已有修复 PR | [#6371](https://github.com/agentscope-ai/QwenPaw/pull/6371) |
| 🟢 低 | 流式重试路径未应用 Retry-After 上限策略 | 已有修复 PR（Under Review） | [#6617](https://github.com/agentscope-ai/QwenPaw/pull/6617) |
| 🟢 低 | 终端关闭后 stdout 指向已删除 TTY，打印 EIO/EPIPE 错误 | 已有修复 PR | [#6569](https://github.com/agentscope-ai/QwenPaw/pull/6569) |
| 🟢 低 | 上传附件时反复弹出无多模态能力警告 toast | 已有修复 PR | [#6581](https://github.com/agentscope-ai/QwenPaw/pull/6581) |

今日 Bug 面以配置兼容与边界条件为主，绝大多数缺陷已有对应修复 PR 或正处于评审中，稳定性修复管道运转有效。唯一需要重点关注的是 **#6838 子代理功能问题**，暂无修复 PR，且同时涉及后端配置引擎与前端状态同步，修复成本可能较高。


## 6. 功能请求与路线图信号

暂无新的独立功能请求 Issue，但以下开放 PR 反映了明确的功能演进方向：

- **[#6659 feat(providers): implement model fallback with cooldown mechanism](https://github.com/agentscope-ai/QwenPaw/pull/6659)** — 实现主模型失败（限流/超时/服务错误）时自动故障转移到备用模型，并带冷却机制避免反复命中失败 provider。关联 #2199 / #1327 / #2089 三个历史诉求。该功能正处于 Under Review，**极有可能纳入下一版本**。

- **[#6668 feat(providers): support responses prompt caching](https://github.com/agentscope-ai/QwenPaw/pull/6668)** — 为 OpenAI Responses provider 增加 opt-in 的 GPT-5.6+ prompt caching 支持，降低重复请求成本。

- **[#5930 feat: add structured run outcome to SSE response for API automation](https://github.com/agentscope-ai/QwenPaw/pull/5930)** — 在 SSE 流中增加结构化运行结果标记，解决 API 调用方（如 Java 服务）无法可靠感知对话异常结束的问题。创建于 7 月 10 日，仍在开放状态。

- **[#6663 feat: Keep console channel enabled](https://github.com/agentscope-ai/QwenPaw/pull/6663)** — 保持控制台通道持续启用，属于运行模式调整类功能。

路线图信号判断：**模型故障转移（model fallback）** 是当前呼声最集中的能力；**prompt caching** 与 **API SSE 结构化运行结果** 也代表了企业级使用与成本优化方向的明确需求。


## 7. 用户反馈摘要

从今日唯一 Issue（#6838）及其评论中可提炼出以下真实用户痛点与场景：

- **模型调度灵活性不足**：用户期望主代理与子代理可分别配置不同规格模型（旗舰 vs 全量），但当前 `spawn_subagent` 模式无法自动切换模型，限制了成本/质量的分层策略。
- **工作区共享机制不直观**：用户希望主代理与子代理共享同一 workspace 目录，但通过“智能体”配置无法实现；改用 `config.json` 手工修改后，又引发 web 端显示混乱。
- **前端配置缓存路径存在隐患**：web 端读取根目录 `config.json` 后，仍访问子目录下的 `chats.json`/`agent.json`，导致同一会话出现“两套真相”的显示错乱。用户对此体验不满，且该问题绕过常规配置路径后才会暴露。

整体而言，用户正积极尝试多代理协作的高级用法，但当前配置模型对这种深度场景的支持尚未成熟；子代理功能的易用性和一致性是后续迭代中需要优先补齐的体验短板。


## 8. 待处理积压

以下 PR 创建时间较长、今日虽有更新但仍未合并，提醒维护者关注：

| PR | 创建时间 | 开放天数 | 类型 | 状态 | 链接 |
|----|----------|----------|------|------|------|
| #5930 SSE 结构化运行结果 | 2026-07-10 | 30 天 | feature | OPEN | [链接](https://github.com/agentscope-ai/QwenPaw/pull/5930) |
| #6103 前端覆盖阈值提升（5/4/3/5 → 22/15/22/22） | 2026-07-14 | 26 天 | ci | OPEN | [链接](https://github.com/agentscope-ai/QwenPaw/pull/6103) |
| #6238 Driver handler 并发初始化 | 2026-07-18 | 22 天 | perf | OPEN, Under Review | [链接](https://github.com/agentscope-ai/QwenPaw/pull/6238) |
| #6381 stale capabilities 非阻塞 | 2026-07-23 | 17 天 | perf | OPEN | [链接](https://github.com/agentscope-ai/QwenPaw/pull/6381) |
| #6331 Node 22 版本声明（first-time） | 2026-07-22 | 18 天 | chore | OPEN | [链接](https://github.com/agentscope-ai/QwenPaw/pull/6331) |
| #6371 下载器超时回退（first-time） | 2026-07-22 | 18 天 | fix | OPEN | [链接](https://github.com/agentscope-ai/QwenPaw/pull/6371) |
| #6581 去除多模态重复警告 | 2026-07-30 | 10 天 | fix | OPEN | [链接](https://github.com/agentscope-ai/QwenPaw/pull/6581) |
| #6586 MCP stale 会话恢复 | 2026-07-30 | 10 天 | fix | OPEN | [链接](https://github.com/agentscope-ai/QwenPaw/pull/6586) |
| #6569 EIO/EPIPE 打印错误抑制 | 2026-07-30 | 10 天 | fix | OPEN | [链接](https://github.com/agentscope-ai/QwenPaw/pull/6569) |

特别提醒：**#5930**（SSE 结构化结果）已开放 30 天，是当前积压最久的 PR，且承载 API 自动化场景的关键需求；**#6103** 则属于 CI 质量护栏类 PR，长期搁置将弱化前端回归保护。两条 PR 均建议优先评审。

</details>
