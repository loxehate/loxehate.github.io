---
title: "OpenClaw 生态日报"
published: 2026-09-14
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-14

> Issues: 110 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-14 03:17 UTC

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

# OpenClaw 项目动态日报 — 2026-09-14

## 1. 今日速览

OpenClaw 项目今日保持高活跃度：过去 24 小时新增/更新 Issue 110 条（其中 48 条已关闭），PR 更新 500 条（已合并/关闭 223 条，待合并 277 条），显示核心开发与社区反馈双轨并行。今日无新版本发布，但存在多个与 2026.9.3 → 2026.9.4 升级相关的失败报告（P0），更新可靠性仍是当前最突出的稳定性短板。社区讨论热度集中在内联文本泄漏到消息通道（#25592）、子进程泄漏导致僵尸进程堆积（#97616）以及同步持久化阻塞事件循环（#119720）三大技术债问题上。整体看，项目处于高迭代节奏，维护者响应及时（大量 issue 已标注 `maintainer` 标签或进入 review 流程），但 P0 级更新失败问题积压值得警惕。

---

## 2. 版本发布

**无新版本发布。**

今日 Release 数量为 0。不过社区中有多条 P0 级 Issue 指向 2026.9.3 → 2026.9.4 的更新失败（见下文 Bug 部分），建议维护团队评估是否需要在 2026.9.4 基础上发布补丁版本。

---

## 3. 项目进展

过去 24 小时有 223 条 PR 被合并或关闭，反映出项目修复与迭代速度较快。虽然新展示的 PR 多为 OPEN 状态，但结合 48 条 Issue 关闭的情况，可以归纳出以下主要推进方向：

**重点推进的 PR（OPEN 待合并，反映后续版本方向）：**

| PR | 聚焦领域 | 说明 |
|---|---|---|
| [#147631](https://github.com/openclaw/openclaw/pull/147631) | 会话恢复 | 删除/归档前先恢复离线设备持有的未同步工作区，统一侧边栏、聊天菜单与 Sessions 页面的恢复路径（size: XL，`ready for maintainer look`） |
| [#147785](https://github.com/openclaw/openclaw/pull/147785) | 安全 | 网关 reload 时撤销已受理的 in-flight hook 请求，防止热更新后旧快照请求仍到达分发层（merge-risk: security-boundary） |
| [#147720](https://github.com/openclaw/openclaw/pull/147720) | 更新可靠性 | 修复 `openclaw update repair` 将自己的 Doctor 子进程误判为竞争更新导致无法修复的问题，直接关联 #146860 |
| [#147779](https://github.com/openclaw/openclaw/pull/147779) | 网关稳定性 | 防止 cron 子代理等待导致网关 stall，保持等待期间其他请求的响应性 |
| [#145335](https://github.com/openclaw/openclaw/pull/145335) | 升级可靠性 | 修复 nvm 用户升级 Node 后 CLI 与网关全局安装不一致的问题，保证更新指向正确的 Node prefix（size: XL，涉及 CLI/网关/脚本） |

**合并/关闭的重要 Issue 印证修复推进：**
- [#141252](https://github.com/openclaw/openclaw/issues/141252)（P1，回复操作无活动工具权限快照）已关闭，表明 busy-session/queued reply 回归问题已完成修复
- [#135658](https://github.com/openclaw/openclaw/issues/135658)、[#135856](https://github.com/openclaw/openclaw/issues/135856)、[#135084](https://github.com/openclaw/openclaw/issues/135084) 等多个 2026.8.x 回归问题在今日关闭，说明 8.x 系列的缺陷修复正在收尾
- [#147346](https://github.com/openclaw/openclaw/issues/147346)（doctor 误禁用健康技能）与 [#147259](https://github.com/openclaw/openclaw/issues/147259)（logs 命令残留 SQLite 副作用）在创建后短时间内即被关闭，`fix-shape-clear` + `queueable-fix` 流程效率较高

---

## 4. 社区热点

### 🔥 讨论最激烈

**#25592 — Text between tool calls leaks to messaging channels**  
链接：https://github.com/openclaw/openclaw/issues/25592  
- 评论：40 条 | 👍 1 | 状态：OPEN（P1，diamond lobster）
- 核心诉求：Agent 在工具调用之间产生的内部文本（错误处理、处理确认、叙述等）被路由到 Slack/iMessage 等消息通道作为可见消息，严重损害用户体验。内部处理输出不应暴露给终端用户。
- 社区反应：该 issue 已存活近 7 个月仍为 OPEN，涉及 `needs-product-decision` 与 `needs-security-review`，说明产品层面如何区分"内部处理文本"与"应发送给用户的内容"仍无定论。PR #147294（Slack QA 验证中间模型文本）与此相关。

**#97616 — OpenClaw leaks unreaped hook/tool child processes, causing zombie accumulation**  
链接：https://github.com/openclaw/openclaw/issues/97616  
- 评论：30 条 | 👍 1 | 状态：OPEN（P1，silver shellfish）
- 核心诉求：hook/tool 执行的子进程未被正确回收，导致 `openclaw` 主进程下堆积僵尸进程（`openclaw-hooks`、`bash`、`codex` 等），最终引发运行时性能退化。
- 社区反应：标记为 regression（此前正常），自 6 月 29 日报告至今仍无 fix PR，长期未解决。

**#119720 — Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale**  
链接：https://github.com/openclaw/openclaw/issues/119720  
- 评论：19 条 | 状态：OPEN（P1，diamond lobster）
- 核心诉求：Agent 同步持久化与 transcript 维护在大规模场景下阻塞网关事件循环。#140231 和 #138984 已做部分修复，但根本问题仍在。
- 社区反应：作者在 issue 中同步了历史观察与最新重写实现的差异，说明该问题复杂、修复难度大。

### 📊 其他高关注

- **#108435**（15 条评论）：2026.7.1 版本 gateway 在 systemd/ollama/手动启动三种方式下均无法启动（P0，已关闭，修复完成）
- **#31331**（9 条评论，👍 4）：Docker 安装 + Sandbox 无法访问 /workspace，暴露 Docker-outside-of-Docker 场景下的路径绑定问题

---

## 5. Bug 与稳定性

### 🔴 P0 级

| Issue | 描述 | 状态 |
|---|---|---|
| [#145252](https://github.com/openclaw/openclaw/issues/145252) | **2026.9.3/9.4 更新与恢复可靠性跟踪** — 更新、升级、Doctor、迁移、回滚与重启问题的协调索引 | OPEN（maintainer 跟踪） |
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | **Windows 更新停滞** — Scheduled Task 使用 InteractiveToken 时无法获取进程启动身份，更新卡在 activating 后 abandoned | OPEN |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | **2026.9.3 更新失败** — win32/x64 平台运行时验证失败（runtime-verification-failed） | OPEN |
| [#147739](https://github.com/openclaw/openclaw/issues/147739) | **2026.9.3 更新失败** — global-install-failed（win32/x64，npm 模式） | OPEN |
| [#147704](https://github.com/openclaw/openclaw/issues/147704) | **安全相关** — 真实业务部署中总结的 105 项运营挑战与改进机会，含安全影响 | OPEN |
| [#141245](https://github.com/openclaw/openclaw/issues/141245) | **插件更新失败静默禁用全部插件** — 防御性 `enabled:false` 写入导致 7 个 npm 插件全部被禁用 | CLOSED |

### 🟠 P1 级

| Issue | 描述 | 是否有 Fix PR |
|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 工具调用间文本泄漏到消息通道（安全/UX） | 无（待产品决策） |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 子进程泄漏导致僵尸进程堆积 | 无 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步持久化阻塞事件循环 | 部分修复（#140231/#138984） |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server 初始化超时导致网关崩溃（`service child cleanup identity lost`） | 无 |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) | 2026.8.1 升级后网关单核 CPU 100%（文件系统发现忙循环） | 无 |
| [#147040](https://github.com/openclaw/openclaw/issues/147040) | malformed JSON arguments 在 v2026.9.4 仍复现，修复不完整 | 合并了 #141323/#142176 但未根治 |
| [#143420](https://github.com/openclaw/openclaw/issues/143420) | 强制 drain 超时后后台任务记录未终止，导致再次重启重复等待 300s | 无 |
| [#132720](https://github.com/openclaw/openclaw/issues/132720) | claude-cli 410 session_expired（2026.9.1-beta.1，doctor 迁移主路径） | CLOSED |

### 🟡 值得注意

- **#147722**：Control UI 无法关闭 "Gateway Host Desktop"（Labs），布尔值校验拒绝 undefined，属于小的 UX bug，已有 `fix-shape-clear` 标记
- **#147346**（已关闭）：`doctor --fix` 基于环境变量误判技能不可用并自动禁用，破坏性 auto-fix 导致 ping-pong（已修复）
- **#147259**（已关闭）：`openclaw logs` 仍产生 SQLite WAL/SHM 副作用（已修复）

---

## 6. 功能请求与路线图信号

### 值得关注的新增请求

| Issue | 说明 |
|---|---|
| [#147732](https://github.com/openclaw/openclaw/issues/147732) | Control UI 聊天需要段落级（auto）RTL 方向支持，处理波斯语/阿拉伯语与英语混排 |
| [#146902](https://github.com/openclaw/openclaw/issues/146902) | 同一会话内工具集变化导致 prompt-cache 失效，影响推理成本与延迟 |
| [#147776](https://github.com/openclaw/openclaw/issues/147776) | wiki_lint 在详情超限时丢弃全部结果，建议截断而非丢弃 |

### 长期未决的功能需求

| Issue | 创建时间 | 说明 |
|---|---|---|
| [#9912](https://github.com/openclaw/openclaw/issues/9912) | 2026-02-05 | 请求 `maxTurns`/`maxToolCalls` 配置项限制代理迭代次数。7 个月未实现，`needs-product-decision` |
| [#7406](https://github.com/openclaw/openclaw/issues/7406) | 2026-02-02 | Telegram 论坛主题显示为原始 key，需可读名称。长期挂起，`needs-product-decision` |
| [#45233](https://github.com/openclaw/openclaw/issues/45233) | 2026-03-13 | 请求 FreeBSD 支持（👍 4），长期未响应 |
| [#122898](https://github.com/openclaw/openclaw/issues/122898) | 2026-08-13 | 内置文件发现工具（list/find/search），已关闭但被标记 `stale` |

### PR 暗示的路线图方向

- **更新可靠性加固**：#147720（doctor 自冲突）、#145335（Node prefix 变化）均指向更新链路是当前重点
- **工作板/Telegram 性能优化**：#147780、#147786 均为性能改进，表明项目在扩展功能的同时开始治理性能债
- **安全边界收紧**：#147785、#147008（子会话不能检查自动化运行）体现权限模型在细粒度化

---

## 7. 用户反馈摘要

### 高频痛点

1. **更新/升级流程脆弱**（出现频率最高）：从 2026.7.x 到 2026.9.x，每次版本更新都有用户报告失败。今日集中爆发 2026.9.3 → 2026.9.4 的问题（[#145510](https://github.com/openclaw/openclaw/issues/145510)、[#147739](https://github.com/openclaw/openclaw/issues/147739)、[#146860](https://github.com/openclaw/openclaw/issues/146860)），Windows 平台尤其严重。插件版本不跟随核心更新的问题（[#135776](https://github.com/openclaw/openclaw/issues/135776)）也反复出现。

2. **内部处理文本泄漏到聊天渠道**（[#25592](https://github.com/openclaw/openclaw/issues/25592)）：开发者 @doomclaw 描述代理在工具调用之间产生的错误处理、处理确认等文本被作为可见消息发送到 Slack/iMessage。这是安全+UX 双重问题，用户在等待数月后仍未看到解决方案。

3. **僵尸进程累积**（[#97616](https://github.com/openclaw/openclaw/issues/97616)）：@avp717 详细记录了 hook/tool 子进程未被回收的问题，标明"回归"（此前正常）。长时间运行导致运行时退化。

4. **doctor 工具的"好心办坏事"**：多个反馈指向自动修复造成新问题 — [#147346](https://github.com/openclaw/openclaw/issues/147346) 误禁用健康技能、[#147772](https://github.com/openclaw/openclaw/issues/147772) 对无插件通道误报 OAuth 目录缺失、[#135717](https://github.com/openclaw/openclaw/issues/135717) 维护租约心跳在事件循环拥塞下误判丢失。

5. **"malformed JSON arguments" 持久不愈**（[#147040](https://github.com/openclaw/openclaw/issues/147040)）：@1Vision365-PeterTijsma 报告在 v2026.9.4 上两次修复（#141323、#142176）后仍然复现，说明根因未被完全理解。

### 正面信号

- 多条 issue 在创建后 24 小时内即被关闭（如 #147346、#147259），表明 `queueable-fix` + `fix-shape-clear` 的工作流对高价值 bug 响应迅速
- 用户 @jt7852chsg-ux 在 [#147704](https://github.com/openclaw/openclaw/issues/147704) 中描述了使用 OpenClaw 构建多智能体自主业务的完整场景（CEO/CFO/Amazon Seller/房地产/安全/审计/软件工程），尽管列出 105 项挑战，但侧面印证了项目在真实复杂业务中的可用性与用户投入度

---

## 8. 待处理积压

### ⚠️ 长期未响应的关键 Issue

| Issue | 创建时间 | 持续天数 | 说明 |
|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | ~203 天 | 文本泄漏到消息通道，40 条评论，P1，安全+UX 双高影响，无 fix PR，`needs-product-decision` |
| [#9912](https://github.com/openclaw/openclaw/issues/9912) | 2026-02-05 | ~222 天 | maxTurns/maxToolCalls 配置项，社区有明确需求，7 个月无实质进展 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | ~78 天 | 僵尸进程泄漏，30 条评论，"回归"标记，无 fix PR |
| [#31331](https://github.com/openclaw/openclaw/issues/31331) | 2026-03-02 | ~197 天 | Docker 安装 + Sandbox 工作区无法访问，👍 4，已关闭但 `dedupe:parent` 标记，需确认真正的修复 PR |
| [#45233](https://github.com/openclaw/openclaw/issues/45233) | 2026-03-13 | ~186 天 | FreeBSD 支持，👍 4，`off-meta tidepool` |
| [#7406](https://github.com/openclaw/openclaw/issues/7406) | 2026-02-02 | ~225 天 | Telegram 主题可读名称，长期挂起 |

### 🔍 需要维护者关注

- **#119720**（同步持久化阻塞）：已存活 40 天，虽有两个部分修复，但作者表示"最新重写实现"与此前的描述已有差异，需要维护者重新评估当前状态
- **#144911**（MCP 超时崩溃）：9 月 11 日创建，`fix-shape-clear` + `queueable-fix` 标记齐全，但尚未见对应 PR，建议保持关注
- **#147704**：105 项运营挑战值得系统性梳理，虽然目前标注 `needs-info`，但这是了解真实企业级用户需求的重要素材

---

> **总结**：OpenClaw 项目迭代速度没有放缓，PR 合入量大、社区反馈活跃。当前最大的健康度风险集中在 **更新链路可靠性**（多个 P0）和 **若干长期未决的技术债**（文本泄漏、进程泄漏、事件循环阻塞）。建议维护团队优先分配资源给 2026.9.4 的更新失败问题，并在下一版本中明确是否纳入对 #25592 的产品决策。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期**：2026-09-14  
**数据来源**：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw 九大开源项目社区动态

---

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态正处于**由单点工具向平台化、生态化演进的关键阶段**，多项目在会话持久化、多通道消息路由、MCP 兼容性、更新可靠性等共性问题上密集发力。头部项目与差异化细分项目并存，但除 OpenClaw 外，多数项目社区规模与贡献者活跃度仍处于早期积累期。整体呈现"**头部高歌猛进、尾部持续分化**"的两极格局，稳定性与安全加固正取代单纯的功能堆叠成为各项目竞逐的新焦点。

---

## 2. 各项目活跃度对比

| 项目 | Issues（更新/新开） | PR 数 | 合并/关闭 PR | Release | 健康度评估 |
|------|---------------------|-------|-------------|---------|-----------|
| **OpenClaw** | 110（48 关闭） | 500 | 223 | 无 | ⚠️ 高迭代，更新可靠性风险突出 |
| **CoPaw** | 13（12 活跃 / 1 关闭） | 23 | 3 | 无 | ✅ 高活跃，响应快，内存问题待整改 |
| **NanoClaw** | 5（4 活跃 / 1 关闭） | 16 | 2 | 无 | ✅ 活跃，PR 积压偏高 |
| **Moltis** | 3（1 新开 / 2 关闭） | 5 | 4 | ✅ 已发布 | ✅ 健康，修复快速、迭代节奏紧凑 |
| **NanoBot** | 0 | 7 | 2 | 无 | ✅ 稳定，低量但持续 |
| **Zeroclaw** | 2 | 50 | 0 | 无 | ⚠️ 开发活跃但合并瓶颈明显 |
| **PicoClaw** | 5（3 活跃 / 2 关闭） | 4（全部 stale 关闭） | 0（人工） | 无 | ⚠️ 社区需求真实，维护响应滞后 |
| **IronClaw** | 0 | 5（全部 Dependabot） | 1 | 无 | ✅ 稳定，人工活跃度偏低 |
| **LobsterAI** | 4（1 新开 / 3 stale） | 4（全部 stale） | 0 | 无 | ❌ 低活跃，安全修复 PR 长期搁置 |

---

## 3. OpenClaw 在生态中的定位

- **社区规模绝对领先**：单日 110 条 Issue、500 条 PR 更新，量级是第二名 CoPaw 的 8-20 倍，是生态中唯一达到规模化社区运转状态的项目。
- **技术覆盖度最广**：会话恢复（#147631）、网关稳定性（#147779）、更新可靠性（#147720）、安全边界（#147785）多线并进，具备头部平台的特征。
- **核心差异在于"高容错 + 多通道"的技术路线**：相比 NanoBot/Moltis 侧重单一 WebUI 或 Telegram 体验优化，OpenClaw 更强调跨通道消息路由一致性（Slack / iMessage / cron 子代理等）与运行时的自适应恢复能力。
- **主要风险**：P0 级更新失败问题积压、三大技术债（文本泄漏、进程泄漏、事件循环阻塞）长期未根治，若持续将削弱其相对于快速追赶者（如 CoPaw）的稳定性优势。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|---------|---------|
| **更新/升级链路可靠性** | OpenClaw（Windows 更新停滞、runtime 验证失败）、NanoClaw（update-nanoclaw 覆盖本地修改） | 升级失败导致服务不可用、本地改动被意外覆盖，已成为阻碍用户信任的共通问题 |
| **MCP 生态兼容性** | CoPaw（Java/Kotlin MCP SDK 非标准信封）、Zeroclaw/PicoClaw（OpenCode provider x-opencode-session 头缺失） | 跨语言、跨协议互操作成为日常使用的硬性需求，但 SDK 规范差异产生大量兼容性缺陷 |
| **会话持久化、记忆与恢复** | OpenClaw（离线设备未同步工作区恢复）、LobsterAI（用户/工作区跨会话持久记忆提案）、NanoBot（搜索持久化会话旧消息）、Moltis（默认推理强度跨会话持久化） | 用户普遍不再接受"每次会话从零开始"；上下文连续性与可恢复性成为基础体验要求 |
| **异步稳定性与进程生命周期** | OpenClaw（僵尸进程堆积、同步持久化阻塞事件循环）、CoPaw（内存耗尽三路径叠加）、LobsterAI（流式响应 reader 泄漏） | 长时运行场景下，子进程/流资源/事件循环的健壮性成为规模化部署的隐形门槛 |
| **工具调用结果可见性与消息边界** | OpenClaw（工具调用间文本泄漏到消息频道）、CoPaw（定时任务结果被折叠在 steps/thinking 中） | 用户对"哪些文本是 agent 内部思考、哪些应公开展示"的需求日益明确，涉及安全与 UX 双重治理 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键特征 |
|------|---------|---------|-----------------|
| **OpenClaw** | 全栈多通道 agent 网关 | 开发者/企业级多场景 | 多通道消息路由 + 子代理 + 结构化持久化；更新链路复杂度高 |
| **CoPaw** | MCP 生态优先 + Hub 多租户 | 部署 MCP 工具集的技术团队 | MCP/ACP 兼容层 + Hub 管理 + 插件系统，2.2.x 升级后仍处回归修复期 |
| **Moltis** | 共享频道 + 推理强度精细化控制 | 深度使用 Telegram 的 agent 爱好者 | ReasoningEffort 枚举可配置化（minimal→max）+ hooks 生命周期事件完善 |
| **NanoClaw** | 零门槛安装体验 + Mattermost 适配 | 自托管、中小团队 | 设置向导/Provider picker 是核心入口，容器 ceiling 硬编码仍是短板 |
| **NanoBot** | 轻量 WebUI 会话机器人 | 个人用户/小规模部署 | Theme 一致性、移动端适配、cron 自动化；无重型扩展体系 |
| **Zeroclaw** | 安全加固 + 插件架构重构 | 高安全敏感开发者 | OIDC 令牌验证、egress grant、RPC 强制认证等安全 PR 形成系列依赖链 |
| **PicoClaw** | 嵌入式/低性能设备 agent | RV1106/RISC-V 等边缘硬件用户 | 轻量级适配为主，Web UI 性能与设备算力的矛盾最为突出 |
| **IronClaw** | WebAssembly 运行时 + Rust 生态 | Rust/WASM 技术栈团队 | 依赖 wasmtime/wit-* 沙箱执行路径，当前以依赖维护为主 |
| **LobsterAI** | 多场景桌面生产力（文档/PPT/视频） | 知识工作者、深度本地化用户 | 安全修复 PR 长期挂起；上下文窗口不可配置，平台化能力不足 |

---

## 6. 社区热度与成熟度

**第一梯队：快速迭代期（高活跃 + 高响应）**

- **OpenClaw**：PR 合入量大、Issue 响应快（`queueable-fix` + `fix-shape-clear` 流程成熟），但 P0 积压警示规模化后的质量治理压力。
- **CoPaw**：Bug 报告 48 小时内即有对应修复 PR，正处 2.2.x 升级后的密集修复窗口，社区参与度与响应速度俱佳。

**第二梯队：质量巩固期（节奏稳定）**

- **Moltis**：修复与功能开发并进，Issue 关闭周期短（用户报 Bug 后 1 天修复合入），新版本发布及时。
- **NanoBot / NanoClaw**：PR 活跃度中等，分别聚焦 WebUI 打磨和安装链路完善，无重大风险。
- **IronClaw**：依赖自动维护为主，人工活跃度低但无明显健康问题。

**第三梯队：合并瓶颈期（活跃但流转效率低）**

- **Zeroclaw**：50 条 PR 并行但 24 小时零合并，`do-not-merge`/`needs-author-action` 大量积压，贡献者耐心可能被消耗。
- **PicoClaw**：社区需求真实热烈（IRC、Web UI 性能），但 stale bot 取代人工评审，多条功能性 PR 被无差别关闭。

**第四梯队：维护乏力期（安全与功能双重沉淀）**

- **LobsterAI**：P0 安全漏洞 PR 搁置约半年、所有 PR 带 stale 标记，健康度堪忧。

---

## 7. 值得关注的趋势信号

**① 记忆与持久化正从"增强功能"变为"基础能力"**

从 OpenClaw 的离线工作区恢复到 Moltis 的默认推理强度持久化，再到 LobsterAI 获得的第三方记忆层提案，跨会话连续性已成为 agent 产品化的关键分水岭。对开发者的启示是：在设计 agent 架构时，应优先考虑会话状态的可序列化与可恢复性，而非事后补救。

**② MCP 生态兼容性将主导未来 6 个月的整合竞争**

CoPaw、Zeroclaw、PicoClaw 不约而同遭遇 MCP/OpenCode/Java SDK 等协议互通问题。这释放了一个明确信号：**agent 的竞争力不再取决于单一模型能力，而取决于其接入外部工具生态的顺畅程度**。建议开发者关注 MCP 规范演进及各项目对非标准错误信封的处理方式。

**③ 更新机制健壮性成为项目成熟度试金石**

OpenClaw 的 P0 更新失败、NanoClaw 的 update 覆盖本地修改、LobsterAI 的安装路径缺陷——更新链路已经超越单纯的 CI/CD 问题，成为直接影响用户留存的生命线工程。越是快速迭代的项目，越需要把原子化更新、回滚机制与配置迁移作为一等公民对待。

**④ 内部文本与用户可见消息的边界治理浮出水面**

OpenClaw #25592（内部文本泄漏到 Slack/iMessage）与 CoPaw #7709（任务结果被折叠进 thinking）指向同一问题：**LLM 的"思维过程"正在干扰用户界面的信息层次**。这不仅是 UX 问题，更是安全边界问题——如何在流式工具调用中识别、过滤并正确路由"内部叙述"与"对外声明"，将成为多通道 agent 框架必须具备的过滤器能力。

**⑤ 自动化任务的可观测性需求急剧上升**

NanoBot 的 cron 持久化 claim、CoPaw 的定时任务无输出、OpenClaw 的 cron 子代理导致网关 stall——定时/自动化场景正从"做了就行"走向"必须可验证、可追踪、可恢复"。对于任何计划将 agent 投入生产自动化环境的团队，事件日志、心跳上报与结果物化应在一开始就进入设计清单。

---

> **总结**：2026-09-14 的社区动态折射出个人 AI 助手生态正在经历从"能做什么"到"能否可靠地持续做"的深刻转向。OpenClaw 仍将在一段时间内保有头部引领地位，但更新链路与长期技术债的累积给了垂直细分项目以窗口期。对于技术决策者而言，当前是选择技术栈、建立试点、并密切关注 MCP 兼容层与持久化方案演进的关键时点。

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-14

## 1. 今日速览

过去24小时 NanoBot 项目无新 Issue 提交，PR 活跃度中等偏上：共 7 条 PR 更新，其中 2 条已合并/关闭，5 条待合并。合并 PR 聚焦 WebUI 移动端体验与品牌一致性，代码质量与稳定性（cron 持久化、会话搜索、代理清理测试）是本轮更新的重点方向。项目未发布新版本，整体健康度良好，维护节奏稳定。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日 2 条 PR 进入合并/关闭状态，均来自 WebUI 体验优化：

- **[merged/closed] fix(webui): improve mobile composer and settings navigation**（[#5755](https://github.com/HKUDS/nanobot/pull/5755)，@Re-bin）：移动端 composer 控件自适应宽度，保留附件/模型控制于左侧，改进上下文使用面板与设置导航。该改动不涉及后端逻辑，对移动端用户使用体验提升明显。
- **[merged/closed] fix(webui): unify app logos and brand mentions**（[#5754](https://github.com/HKUDS/nanobot/pull/5754)，@Re-bin）：统一 Apps 目录中的 Logo 样式（紧凑圆角全画布），在消息与 composer 中展示元数据提供的品牌名（Linear、iTerm2、Draw.io、Google Drive 等），并统一尺寸与对齐。

两个合并 PR 集中在 WebUI 一致性打磨，说明项目在前端细节与品牌标准化方面正逐步收敛，整体向前迈进一小步。

## 4. 社区热点

今日无 Issue 讨论，PR 评论数、点赞数均无数据。结合 PR 摘要，以下 PR 可能具备较高关注度：

- **#3245 [conflict] fix(cron): persist claim before await**（[链接](https://github.com/HKUDS/nanobot/pull/3245)，@linziyanleo）：该 PR 悬置已久且存在冲突标记，涉及 cron 作业运行声明的持久化时序问题，对任务可靠性有关键影响，可能引发维护者对合并时机的关注。
- **#5757 fix(session): search older pages of persisted conversation history**（[链接](https://github.com/HKUDS/nanobot/pull/5757)，@beemines）：直接命中长 WebUI 对话中搜索历史消息失败的用户痛点，涉及核心会话查询逻辑，容易在社区引起共鸣。

背后诉求集中在数据可靠性与用户可见行为的一致性：确保搜索结果完整、编辑不意外丢失任务、错误提示及时并清晰。

## 5. Bug 与稳定性

今日 PR 中涉及 4 项稳定性/修复性工作，按影响范围排序：

- **（中等）会话历史搜索遗漏旧消息**（[#5757](https://github.com/HKUDS/nanobot/pull/5757)，@beemines）：`search_sessions` 与过滤后的 `read_session` 在长对话中静默遗漏旧消息；`build_webui_thread_response()` 只返回最新页导致搜索决策可匹配但结果缺失。已有 fix PR，优先级 P2。
- **（中等）编辑自动化配置导致计划任务被跳过**（[#5751](https://github.com/HKUDS/nanobot/pull/5751)，@beemines）：修改名称/说明时重算 `next_run_at_ms`，导致间隔任务被推迟、到期 cron 任务被跳过、一次性任务被置为 `None` 永不执行。已有 fix PR，优先级 P2。
- **（较低）测试代理清理不完善**（[#5756](https://github.com/HKUDS/nanobot/pull/5756)，@fszcd）：SSRF/代理测试 fixtures 仅清除环境变量，在 Windows 注册表或 macOS SystemConfiguration 存在系统级代理时，测试隔离性失败。已有 fix PR，涉及安全测试可靠性。
- **（较低）WebUI 连接屏验证反馈错位**（[#5758](https://github.com/HKUDS/nanobot/pull/5758)，@chengyongru）：长设置说明与验证错误导致布局位移；改为紧凑居中层、内联连接箭头、折叠式密码帮助与密码字段内部短反馈，属于界面稳定性优化。

所有 Bug 均有对应修复 PR，其中两个 P2 级问题已进入待合并状态，风险可控。

## 6. 功能请求与路线图信号

今日无用户新提交 Issue，但 5 条待合并 PR 揭示了近期路线图方向：

- **WebUI 连接流程重设计**（[#5758](https://github.com/HKUDS/nanobot/pull/5758)）：紧凑布局、语言切换器、折叠式帮助——暗示项目正在打磨首次配置向导，向国际化与低门槛方向演进。
- **持久化会话深度检索**（[#5757](https://github.com/HKUDS/nanobot/pull/5757)）：修复多页历史消息的搜索/读取，意味着 WebUI 即将支持更长的会话上下文，配套的检索能力正在补强。
- **自动化任务编辑保护**（[#5751](https://github.com/HKUDS/nanobot/pull/5751)）：确保编辑不丢失待运行任务，说明 cron 自动化已成为核心功能，产品化进程中对数据一致性的要求提升。

以上改动大概率被纳入下一小版本（Patch/Minor）。

## 7. 用户反馈摘要

基于 PR 摘要，可提炼以下真实用户场景痛点：

- **首次连接配置体验不佳**：连接屏幕展示大段设置说明，且验证错误导致布局跳动，用户容易迷失（对应 #5758）。
- **长对话搜索不可靠**：长时间使用 WebUI 后，搜索历史消息会漏掉较旧内容，用户必须滚动手动查找（对应 #5757）。
- **编辑自动化配置有隐性副作用**：用户仅修改任务名称或说明，却被悄悄推迟或跳过下次运行，造成任务丢失感（对应 #5751）。
- **移动端操作空间拥挤**：窄屏下所有控件挤在一行，操作困难（对应 #5755）。

这些反馈集中于“可预测性”与“一致性”：用户期望界面稳定、搜索结果完整、编辑行为无副作用、移动端操作顺畅。

## 8. 待处理积压

- **PR #3245 [conflict] fix(cron): persist claim before await**（[链接](https://github.com/HKUDS/nanobot/pull/3245)，@linziyanleo，创建于 2026-04-17，更新于 2026-09-14）：距首次提交已近 5 个月，存在冲突标记，仍未被合并或关闭。该 PR 解决 cron 作业运行声明在回调前未落盘的问题，直接影响崩溃恢复能力，建议维护者尽快处理冲突并评审合并。

---

**总结**：NanoBot 今日无新 Issue、无版本发布，PR 活动集中在 WebUI 优化与 cron/会话稳定性修复。两个 WebUI 优化已合并，五个修复待评审。项目整体健康，长期积压的 cron PR 是当前需关注的主要维护债务。

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报 — 2026-09-14

## 1. 今日速览

过去 24 小时项目保持活跃，但整体呈现“开发推进快、合并节奏慢”的状态：Issues 更新 2 条、PR 更新 50 条，然而 0 个 PR 被合并/关闭，且无新版本发布，维护者侧可能存在合并瓶颈。值得关注的是，安全与高风险（`domain:security` / `risk:high`）相关工作项在待处理 PR 中占比极高，其中 2 个 PR 被标记为 `do-not-merge`、大量 PR 处于 `needs-author-action` 或 `needs-maintainer-review` 状态，等待作者或维护者响应。社区讨论热度主要集中在 OpenCode provider 的协议兼容性缺陷（#10603）和 Telegram 反应工具静默失败（#10842，已有一对一修复 PR）。

## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases：无）。

## 3. 项目进展

过去 24 小时 **无 PR 被合并或关闭**（0 merged/closed）。所有 50 条待合并 PR 仍在等待审查或作者更新，项目在“合并推进”维度上没有产生新的增量。但值得注意的积极信号是：

- 多个老牌大型 PR 在 9 月 14 日仍有持续更新（如 #9134、#9819、#8965、#9143、#9109、#10450、#9535 等），说明作者并未停滞，仍在基于最新 `master` 进行 rebase / 修改。
- 新提交的 PR 集中于补全文档和修复刚被报告的 bug，例如 #10840（生成 llms.txt）、#10839（插件 webhook-ingress 能力标志文档）、#10843（修复 Telegram 反应工具），体现出社区对文档完整性和快速修 bug 的正向响应。
- 安全加固系列的 stage 3 / stage 5 PR（#10259、#10255）在 9 月 13 日曾有更新，该系列跨多个 PR 形成依赖链，方向明确，但合并进展缓慢，可能受限于审查资源和依赖关系。

整体来看，项目的开发活跃度很高，但合并吞吐率偏低，长期积压的 PR 数量可能成为影响迭代速度的风险点。

## 4. 社区热点

过去 24 小时评论与反应数据主要集中在 Issues 侧（PR 的评论数在数据中均为 `undefined`，无法统计）：

- [#10603 [Bug]: OpenCode providers never send x-opencode-session, breaking Go models and risking account flags](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — 3 条评论，👍 3 次，`severity: S1`（workflow blocked），`risk: high`。
  **诉求分析**：这是当前社区最关注的单点问题。用户 @JordanTheJet 指出 ZeroClaw 从未在 OpenCode relay 请求中发送 `x-opencode-session` 头，会直接导致 Go 模型（如 OpenAI 兼容层上的 Go 系模型）无法工作，并可能引发账号风控标记。该 Issue 已持续 11 天（9 月 3 日创建），至今仍在 `in-progress`，且标签标有 `status:in-progress` 但尚未出现对应的 Fix PR，社区等待时间较长，是需要优先关注的高优先级缺陷。

- [#10842 [Bug]: Telegram reaction tool silently no-ops, inherited Channel trait default returns Ok(()) without calling the Telegram API](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) — 0 评论，0 👍，创建于 9 月 13 日。
  **诉求分析**：该 bug 虽无评论数据，但问题非常典型：代理面向用户的 `reaction` 工具“假装成功”但实际不执行任何网络 I/O，会严重误导用户判断。该 Issue 在 24 小时内已获得对应修复 PR（#10843），说明这次 bug 响应速度很快，值得在日报中标记为“社区高效协作案例”。

## 5. Bug 与稳定性

按严重程度排列：

- **严重（S1 / high）**：
  - [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — OpenCode providers 未发送 `x-opencode-session` 头，导致 Go 模型工作流受阻且有账号风控风险。已有 3 条评论、3 个 👍，状态为 `in-progress`，但尚未见修复 PR 出现。项目健康度影响面较大。

- **中等（可静默失败 / 误导用户）**：
  - [#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) — Telegram `reaction` 工具静默无操作，继承自 `Channel` trait 的默认实现直接返回 `Ok(())`，未调用 Telegram API。**已有对应修复 PR：[#10843](https://github.com/zeroclaw-labs/zeroclaw/pull/10843)**（实现 `add_reaction` / `remove_reaction` 覆写，并在不支持的频道上显式报错）。该问题从报告到修复 PR 提交不足 24 小时，响应速度值得肯定。

- **其他稳定性相关待合并 PR**（非新 bug，但属于长期未合并的稳定性/安全修复）：
  - #9819 — pixel-level 图像验证，防止损坏图片导致 provider 请求失败（`risk:high`，待作者/审查者响应）。
  - #10245 — 守护进程保留 supervised error chains（`risk:high`，等待 maintainer 审查）。
  - #10337 — git 操作遵守 allowed roots（`risk:high`，等待作者操作）。

## 6. 功能请求与路线图信号

结合当前待合并 PR 的标签与摘要，可以观察到下一版本的方向性信号：

- **安全体系增强**（多 PR 系列推进，由 @JordanTheJet 主导）：
  - [#10255 oidc 令牌验证 provider](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)（#8289 stage 5）
  - [#10259 RPC 强制已认证主体](https://github.com/zeroclaw-labs/zeroclaw/pull/10259)（#8289 stage 3，依赖 #10255 与 #10248）
  - [#9584 插件安装/列表中的 egress grant 仪式](https://github.com/zeroclaw-labs/zeroclaw/pull/9584)
  
  这一系列说明 ZeroClaw 正在系统性强化认证、授权与安全边界，是中期路线图中的核心主题。

- **会话与上下文治理**：
  - [#10407 持久化会话提示附件](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)（SQLite 存储，最多 4 个附件，单次使用审批）
  - [#9535 上下文压缩锚定模型窗口比例](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)（替代固定 32k 预算）

- **技能与工具能力扩展**：
  - [#8965 技能声明式自动激活 + provider 切换 + 图片轮次阻断](https://github.com/zeroclaw-labs/zeroclaw/pull/8965)（restacked 到最新 master）
  - [#10450 webhook 聊天回合 SSE 流式化](https://github.com/zeroclaw-labs/zeroclaw/pull/10450)

- **插件系统重构**：
  - [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134) 与 [#9143](https://github.com/zeroclaw-labs/zeroclaw/pull/9143) — 插件字节精确传递、插件事件路由共享运行时（两者均被标记为 `do-not-merge`，短期不会合入）。

- **Hailo-Ollama 原生支持**：
  - [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) 增加 Hailo-Ollama 0.5.1 provider（`do-not-merge`，状态 blocked）。

以上 PR 若在未来数周陆续合并，将覆盖安全、会话管理、技能自动化与插件架构等多个方面，成为下一个版本的重要功能集。

## 7. 用户反馈摘要

基于当前可获取的数据（Issues 描述与 PR 维护者备注），提炼用户真实反馈：

- **OpenCode 兼容性痛点（#10603）**：用户 @JordanTheJet 反馈，OpenCode 系列 provider 缺少 `x-opencode-session` 请求头，不仅“workflow blocked”，而且可能触发账号安全风控，用户对数据面合规性的担忧非常明确。虽然该 Issue 得到 3 个 👍，但 11 天无修复 PR，用户侧的焦灼感可能正在上升。

- **Telegram 工具“假成功”问题（#10842）**：用户 @xManan 在提交 Issue 的同一天也提交了修复 PR（#10843），说明用户既是 bug 发现者也是修复贡献者。这类“用户即贡献者”的行为模式反映社区参与度高，同时也暴露了 trait 默认实现容易产生“静默安全失败”的设计隐患——未来在新增 channel 时需警惕默认行为对用户产生误导。

- **维护者协作模式（#9724、#9753）**：Audacity88 在多个 PR 中主动 refresh 分支、修复规范性问题并改写描述，同时保留原始贡献者署名。这种维护者兜底模式减轻了贡献者的工作量，但也在侧面反映部分贡献者可能缺少时间或 CI 资源来维持 PR 与 master 同步，社区需要进一步降低贡献门槛。

- **审查等待时间**：大量 PR 带有 `needs-maintainer-review`（#10283、#10450、#9724、#9753、#10245 等）或 `needs-author-action`（#9134、#8965、#9143、#9109、#9535、#10407、#10337 等），说明双向等待现象普遍存在，用户的 PR 体验可能在“等待审查”与“作者需要更新”之间反复横跳。

## 8. 待处理积压

以下 PR/Issue 长期未合入或未解决，建议维护者优先关注：

**严重 Bug 无修复 PR**
- [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — OpenCode 会话头缺失（S1，9 月 3 日创建，已 11 天无修复 PR，状态 in-progress）⚠️ 最高优先

**被卡住的 PR（do-not-merge / blocked）**
- [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134) — admit exact component payload bytes（7/18 创建，`do-not-merge`，`needs-author-action`）
- [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — Hailo-Ollama 原生支持（7/17 创建，`do-not-merge`，`status:blocked`）

**长期等待作者更新的大型 PR（超 30 天）**
- [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) — 技能声明式自动激活（7/11 创建，`needs-author-action`，size XL）
- [#9143](https://github.com/zeroclaw-labs/zeroclaw/pull/9143) — 插件事件路由共享运行时（7/18 创建，`needs-author-action`，size XL）
- [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — egress grant 仪式（7/31 创建，size XL）

**依赖链/系列推进中的安全 PR**
- [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)（stage 5）与 [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259)（stage 3）互为依赖，且依赖 #10248；建议维护者按 stage 顺序逐一推进，避免链条阻塞。

**等待 maintainer 审查的 XS/S 级小改动**
- [#10245](https://github.com/zeroclaw-labs/zeroclaw/pull/10245) — 保存 supervisor error chains（XS，`needs-maintainer-review`）
- [#10283](https://github.com/zeroclaw-labs/zeroclaw/pull/10283) — MCP 文档补充（XS，`needs-maintainer-review`）

---

**健康度评估**：项目社区贡献活跃度高（50 个 PR 同时活跃），安全问题得到重视，但合并吞吐率过低（0 merged in 24h）、`do-not-merge`/`blocked` 状态 PR 较多，长期积压可能拖慢版本迭代并消耗贡献者耐心。建议维护者优先处理 S1 级 Issue（#10603），并对 30 天以上未动的 PR 进行明确的“合并 / 关闭 / 请求更新”三选一决策，提升整体流转效率。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报 — 2026-09-14

## 1. 今日速览

过去 24 小时内，PicoClaw 项目共产生 5 条 Issue 更新与 4 条 PR 更新，无新版本发布。Issue 侧有 3 条活跃讨论（#3287、#3281、#3369），反映了社区对 IRC 长消息支持、Web UI 性能及 OpenCode Go 协议兼容性的明确诉求；2 条老 Issue 被 stale bot 自动关闭。PR 侧 4 条全部被关闭，均带 [stale] 标签，说明并非人工合并而是机器人清理，实际代码合入量有限。综合来看，社区反馈活跃度中等，但维护者对 PR 的处置响应偏慢，项目处于「用户有需求、维护响应待加强」的阶段。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日关闭的 4 条 PR 均标记为 [stale]，由自动化流程关闭，非人工合并。具体情况如下：

- **[#3348] i18n: complete Czech code wrap labels**（i18n 捷克斯洛伐克语文案补全）
  - 8 月创建，今日被 stale 关闭。小型国际化补充，未被合入。
  - https://github.com/sipeed/picoclaw/pull/3348

- **[#1545] fix: merge PR #1500 #1490 #1488 #1487 #1485**（合并 5 个修复类 PR）
  - 3 月创建，包含多个 PR 的合并修复，历经近 6 个月后今日被关闭。合并意图明确但未落地，相关修复仍处于悬空状态。
  - https://github.com/sipeed/picoclaw/pull/1545

- **[#20] Fix typos and update API keys in README**（修正 README 配置示例）
  - 2 月创建，修正 OpenRouter api_base、snake_case 键名及 Quick Start 步骤编号。基础文档改进，今日被关闭，未合入。
  - https://github.com/sipeed/picoclaw/pull/20

- **[#1268] [type: enhancement, domain: provider, domain: channel, go] imessage support stop command some logs**
  - 3 月创建，包含 iMessage 渠道支持、LLM API 调用日志、对话日志、stop 命令及隐私清洗功能。今日被 stale 关闭，功能性 PR 未获人工评审。
  - https://github.com/sipeed/picoclaw/pull/1268

**小结**：今日无实际代码合入，项目进展主要体现为老 PR 的清理与归档。值得注意的是 #1268 这类功能性 PR 因长期无人评审而被自动关闭，若维护团队有意支持 iMessage 渠道，建议重新打开并评估。

---

## 4. 社区热点

- **[#3281] Web UI chat input is very laggy when history has a little bit long**
  - 评论 11 条，获得 2 个 👍，是今日讨论最活跃的 bug 类 Issue。用户报告当会话历史稍长时，Web UI 输入框严重卡顿，输入体验受到显著影响。
  - 这也直接关联到被 stale 关闭的 #3350（低性能设备下输入卡顿），属于同类痛点。
  - https://github.com/sipeed/picoclaw/issues/3281

- **[#3287] [Feature] Better support long messages in IRC**
  - 评论 12 条，今日仍保持活跃。用户要求 PicoClaw 将 IRCv3 超过 512 字节被拆分的长消息视为一个整体，涉及 IRC 协议层面的消息聚合处理。
  - https://github.com/sipeed/picoclaw/issues/3287

- **[#3369] [Feature] Add OpenCode Go session header support**
  - 创建仅一周，已获得 2 个 👍，是新功能需求中反响较快的。用户要求 OpenAI 兼容 Provider 将 PicoClaw 的 session ID 映射到 `x-opencode-session` 请求头，以满足 OpenCode Go 的协议要求。
  - https://github.com/sipeed/picoclaw/issues/3369

**诉求分析**：社区痛点集中在两个方向——（1）Web UI 在长历史记录下的交互性能；（2）对第三方协议/渠道（IRCv3、OpenCode Go）的兼容性支持。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 高 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 输入框在聊天历史较长时严重卡顿，影响核心聊天体验 | OPEN，无关联 fix PR |
| 🟡 中 | [#3350](https://github.com/sipeed/picoclaw/issues/3350) | 嵌入式/低性能设备上输入框打字严重卡顿，CPU 飙升，用户质疑聊天记录加载与输入框耦合的设计 | CLOSED（stale），无修复方案 |

**备注**：#3350 与 #3281 为同一类性能问题，但 #3350 已被 stale bot 自动关闭，建议维护者将两案合并跟进，避免有效反馈被归档遗漏。

---

## 6. 功能请求与路线图信号

- **[#3369] OpenCode Go session header 支持**（OPEN，2 👍，较新）
  - 用户明确说明需求仅针对 OpenCode Go 而非 OpenCode Zen，且 PicoClaw 已有 session ID 跟踪能力，实现路径清晰（将 session ID 映射到 header）。鉴于其明确性与代码改动范围较小，有望进入下一版本候选。
  - https://github.com/sipeed/picoclaw/issues/3369

- **[#3287] IRC 长消息支持**（OPEN，12 评论）
  - 涉及 IRCv3 消息聚合、多行合并与语义保持，属于协议层增强。讨论已有 12 条，社区关注度较高，但需评估与现有 IRC 适配器的集成复杂度。可能纳入中期版本计划。
  - https://github.com/sipeed/picoclaw/issues/3287

- **[#3281] Web UI 性能优化**（bug 但隐含功能信号）
  - 用户关注长历史记录下的渲染与事件处理性能，可能推动前端对会话历史的分页/虚拟滚动支持。若解决，将显著提升大对话场景的可用性。
  - https://github.com/sipeed/picoclaw/issues/3281

---

## 7. 用户反馈摘要

- **Web UI 性能是最直接的痛点**（#3281、#3350）：多位用户反馈输入框卡顿与聊天记录长度强相关，且 #3350 的用户进一步指出在 RV1106、RISC-V 等低配置设备上问题被放大，CPU 飙升明显。用户认为「输入框打字不应受聊天记录长度影响」，暗示对前端架构设计的质疑。

- **数据持久化信任危机**（#3351）：用户通过直接检查 `.jsonl` 文件，确认自动压缩会物理删除原始聊天记录，而非仅在前端折叠历史。该用户表示「失忆后历史无法找回」，对数据安全性表达强烈不满。虽然该 Issue 被 stale 关闭，但背后反映的是「长对话内存管理 vs 记录持久性」之间的产品平衡问题，值得认真复盘。

- **IRC 长消息语境割裂**（#3287）：用户指出 512 字节限制导致的长消息拆分会让 PicoClaw 将一条完整消息误判为多条独立消息，影响对话理解。这表明在 IRC 渠道上，协议细节的处理直接关系到 LLM 的输入质量。

---

## 8. 待处理积压

以下 Issue/PR 长期开放但未获维护者响应，建议优先关注：

- **[#3281] Web UI 输入卡顿** — 开放近 2 个月，11 评论，2 👍，无官方回复，核心体验问题。
  - https://github.com/sipeed/picoclaw/issues/3281

- **[#3287] IRC 长消息支持** — 开放近 2 个月，12 评论，无官方回复，功能需求清晰。
  - https://github.com/sipeed/picoclaw/issues/3287

- **[#3369] OpenCode Go session header** — 开放约 1 周，已有 2 👍，尚未有维护者评论。
  - https://github.com/sipeed/picoclaw/issues/3369

- **[#1545] 合并 5 个修复 PR** — 3 月创建，包含 #1500 #1490 #1488 #1487 #1485 的合并修复，今日被 stale 关闭，相关修复仍悬而未决，建议人工评估。
  - https://github.com/sipeed/picoclaw/pull/1545

- **[#1268] iMessage 支持及日志功能** — 3 月创建，功能性 PR 遭 stale 关闭，若社区有 iMessage 需求建议重新开放评审。
  - https://github.com/sipeed/picoclaw/pull/1268

---

**项目健康度总评**：社区需求真实且具体（性能、协议兼容、数据持久化），但 PR 评审与 Issue 响应存在明显滞后，多条有效反馈因 stale 机制被自动归档。建议维护者**优先响应 #3281 与 #3287 两条高热度 Issue**，并人工审阅被 stale 关闭的功能性 PR（#1268、#1545），避免有价值贡献流失。

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报（2026-09-14）

## 1. 今日速览

过去 24 小时项目活跃度较高：共更新 5 条 Issues（新开/活跃 4 条、关闭 1 条），更新 16 条 Pull Requests（待合并 14 条、合并/关闭 2 条），无新版本发布。社区提交集中在安装/设置体验、Mattermost 适配、容器稳定性与交付模式等领域。两个设置相关 PR（#3792、#3790）已合并，分别修复了 Codex CLI 引导和全新安装时 provider 选择器被跳过的问题。当前 PR 积压较多（14 条待合并），同时有 2 个 8 月下旬创建的老 PR 仍未合并，维护者需要关注积压趋势。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日有 2 个 PR 被合并，均为安装设置链路的关键修复：

- **fix(setup): bootstrap pinned Codex CLI for auth**（[#3792](https://github.com/nanocoai/nanoclaw/pull/3792)）— 允许全新 Codex 设置不依赖全局安装的 CLI 即可完成认证，修复了无特权用户全局 npm 安装失败导致 `codex_cli_missing` 的问题。
- **fix(setup): restore the agent provider picker for fresh installs**（[#3790](https://github.com/nanocoai/nanoclaw/pull/3790)）— 修复了社区门户 PR #3729 引入的回归：`DEFAULT_AGENT_PROVIDER` 解析为 `claude` 时跳过运行时选择器，导致新用户无法选择 Codex 等 provider。

这两个合并在安装体验上形成互补：先让使用者在设置时能选择 provider，再让所选 provider（Codex）的认证流程可独立完成。同时关闭的 Issue #3787 正是对 provider picker 回归的反馈，整体来看“全新安装链路”的修复已基本落地。

## 4. 社区热点

- **[#3787 [bug] Fresh setup skips the provider picker and silently selects Claude](https://github.com/nanocoai/nanoclaw/issues/3787)**（已关闭，2 条评论）— 新用户运行 `bash nanoclaw.sh` 时不会看到“Which agent runtime should power your assistant?”提示，而是静默选择默认的 Claude。这是新用户进入项目的第一印象问题，用户对“静默选择”感到困惑。该 Issue 今日关闭，对应修复 PR #3790 已合并，但标签仍含 `triage/unresolved`，需要维护者确认是否完全解决并做后续跟进。

- **[#3643 [bug] Hardcoded 30-min ABSOLUTE_CEILING_MS cold-kills long local-model turns](https://github.com/nanocoai/nanoclaw/issues/3643)**（1 条评论，9 月 14 日有更新）— 本地模型后端运行长任务时，容器会被 30 分钟的绝对上限强杀，且没有配置入口。该 Issue 创建于 8 月 28 日，至今仍开放，今日再次更新说明仍在影响用户。评论中用户详细给出了心跳日志（`heartbeatAgeMs=1829985 ceilingMs=1800000`），这是稳定性方面的重点讨论对象。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 | 相关修复 |
|---|---|---|---|
| 高 | **#3643** 容器 30 分钟绝对上限强杀本地模型长任务，且无配置项可调整 | 开放中，今日有更新 | 暂无对应 PR |
| 中 | **#3801** `update-nanoclaw validate` 会刷新 channel/provider 并覆盖本地 patch skills 修改的文件 | 今日新开，暂无回复 | 暂无 |
| 中 | **#3800** 文档中 controller 提取步骤遗漏三个导入脚本，导致 controller 无法加载 | 今日新开，暂无回复 | 暂无 |
| 中 | **#3791** 全新 Codex 设置要求全局安装 host CLI，无权限用户无法安装 | 开放中 | PR #3792 已合并 |
| 低 | **#3787** 全新安装跳过 provider picker（已关闭，但标 unresolved） | 已关闭 | #3790 已合并 |

此外，还有多个 Bug 修复 PR 待合并：

- **fix(signal): stage inbound attachments via the session inbox**（[#3799](https://github.com/nanocoai/nanoclaw/pull/3799)）
- **fix(setup): verify linger without interactive polkit prompts**（[#3798](https://github.com/nanocoai/nanoclaw/pull/3798)）
- **fix(mattermost): reply in thread when mentioned**（[#3797](https://github.com/nanocoai/nanoclaw/pull/3797)）
- **fix(mattermost): verify the running adapter after setup**（[#3780](https://github.com/nanocoai/nanoclaw/pull/3780)）
- **fix(mattermost): validate and persist setup choices**（[#3778](https://github.com/nanocoai/nanoclaw/pull/3778)）
- **fix(setup): verify restarted host identity and readiness**（[#3779](https://github.com/nanocoai/nanoclaw/pull/3779)）
- **fix(drivers): a watch feed that cannot subscribe must never break arming**（[#3789](https://github.com/nanocoai/nanoclaw/pull/3789)）

大量 Mattermost 相关修复等待合并，建议维护者优先 review 这批 PR，避免多个分支同时改动导致冲突。

## 6. 功能请求与路线图信号

当前多个 Feature PR 处于待合并状态，可能成为下一版本的重要能力：

- **feat(config): record a per-agent-group delivery mode**（[#3713](https://github.com/nanocoai/nanoclaw/pull/3713)）— 为每个 agent 组记录交付模式，允许无法可靠输出 final-text 的 provider 通过 outbound tools 交付。是配置系统的一次扩展。
- **feat(agent-runner): enforce tools-only delivery**（[#3781](https://github.com/nanocoai/nanoclaw/pull/3781)）— 与 #3713 配套，让 `tools-only` 交付模式在 provider 无法保证 final-text envelope 时依然可靠。
- **feat(skills): add-telemetry, OpenTelemetry tracing for agent containers**（[#3796](https://github.com/nanocoai/nanoclaw/pull/3796)）— 新增 `/add-telemetry` 技能，可选导出 OpenTelemetry traces，覆盖 turn、模型调用、工具、子代理、压缩、后台任务和交付等。
- **feat(codex): structured setup-driver authentication for the Codex provider**（[#3489](https://github.com/nanocoai/nanoclaw/pull/3489)）— 为 Codex provider 增加结构化认证流程，支持浏览器和 device-code 登录。该 PR 创建于 8 月 23 日，等待时间较长。

从需求信号看，社区对可观测性、交付模式灵活性和多 provider 支持有明显诉求，且这些 PR 都由核心成员推动，预计会成为近期版本重点。

## 7. 用户反馈摘要

来自今日更新 Issues 的真实反馈：

- **新用户设置流程困惑**（[#3787](https://github.com/nanocoai/nanoclaw/issues/3787)）：用户使用 macOS 全新安装，期望看到 agent runtime 选择界面，却被静默带入 Claude。反馈中提到“不再询问”的措辞，说明这类行为变化让用户感到意外，也说明设置引导需要更明确的可视化确认。
- **本地模型长时间任务被强杀**（[#3643](https://github.com/nanocoai/nanoclaw/issues/3643)）：用户运行本地 OpenAI-compatible 模型时，agent turn 超过 30 分钟即被容器调度器强杀，日志中出现 `Killing container past absolute ceiling`。用户明确表示需要“config seam”来调整该上限，当前硬编码 30 分钟对本地大模型场景不友好，属于可靠性层面的实际痛点。

## 8. 待处理积压

以下 Issue/PR 长期未合并或未解决，建议维护者优先关注：

- **#3643 [bug] Hardcoded 30-min ABSOLUTE_CEILING_MS**（开放 17 天，今日仍有更新）— 涉及本地模型用户核心体验，目前无修复 PR，存在风险。
- **#3489 [feat] structured Codex authentication**（开放 22 天，PR 待合并）— 功能完整度较高，长期未合并可能阻塞后续 Codex 相关迭代。
- **#3463 [fix] opencode provider fall back to message.part.delta text**（开放 22 天，PR 待合并）— 修复 #2985 的事件循环竞态问题，是 provider 稳定性修复。
- **#3801 / #3800**（今日新开）— 均与 `update-nanoclaw` 技能维护有关，可能会影响社区维护者的升级流程，建议尽快响应。

整体看，项目在安装设置和 Mattermost 适配两个方向投入较多，社区活跃度良好；但 PR 积压数量偏高，尤其多个 8 月下旬的 PR 仍未处理，需要管理层审视 review 容量，避免大量功能长期悬置。

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报 — 2026-09-14

> 数据来源：[github.com/nearai/ironclaw](https://github.com/nearai/ironclaw) | 统计区间：2026-09-13 至 2026-09-14

---

## 1. 今日速览

过去 24 小时 IronClaw 未产生新的 Issue，也未发布新版本；PR 侧共 5 条更新，全部来自 Dependabot 的依赖批量升级，其中 1 条已关闭、4 条待合并。项目当前处于**以自动化依赖维护为主的平静期**，无人工提交的 feature PR 或 bug fix PR，社区讨论与用户互动几乎为零。整体健康度良好：依赖供应链保持持续更新、Issue 积压为零，但人工开发活跃度偏低，值得关注。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日仅 1 条 PR 关闭（#8097），其余 4 条仍在等待合并。依赖生态的更新正在稳步推进，但项目本身的功能开发与修复未见新的人工提交。

| PR | 状态 | 内容 | 说明 |
| --- | --- | --- | --- |
| [#8097](https://github.com/nearai/ironclaw/pull/8097) | 已关闭 | everything-else 组 24 项依赖更新（uuid、base64、rust_decimal 等） | 该批依赖升级已收尾，有效期内的供应链更新任务完成一项 |
| [#8099](https://github.com/nearai/ironclaw/pull/8099) | 待合并 | everything-else 组 25 项依赖更新 | 在 #8097 基础上新增 1 项，涉及 uuid 至 1.26.1 等 |
| [#8079](https://github.com/nearai/ironclaw/pull/8079) | 待合并 | actions 组 6 项 GitHub Actions 更新 | 包括 claude-code-action 升级至 1.0.221、setup-node 跨大版本至 7.0.0 |
| [#8078](https://github.com/nearai/ironclaw/pull/8078) | 待合并 | tokio-ecosystem 组 2 项更新 | tower-http → 0.7.1，tokio-tungstenite 同步升级 |
| [#7834](https://github.com/nearai/ironclaw/pull/7834) | 待合并 | wasm 组 4 项更新 | 涉及 wasmtime、wasmtime-wasi、wit-component、wit-parser |

---

## 4. 社区热点

今日**无任何热门讨论**。所有 5 条活跃 PR 均无评论、无 👍 反应，且作者全部是 `@dependabot[bot]`，没有来自社区或维护者的互动。这说明当前社区焦点并不在功能讨论或问题反馈上，而是完全由依赖机器人驱动的基础设施维护。

如需关注潜在讨论起点，可留意：

- [PR #8099](https://github.com/nearai/ironclaw/pull/8099) — 最大规模依赖更新（25 项），合并时可能引起维护者讨论
- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — wasm 相关依赖升级，通常涉及兼容性验证，是社区关注度较高的领域

---

## 5. Bug 与稳定性

今日**无新 Bug、崩溃或回归报告**。稳定性方面的工作体现在依赖升级上，主要集中在三类：

- **Rust 核心生态**：uuid、base64、rust_decimal 等基础库批量升级（PR #8097/#8099），降低已知漏洞风险
- **异步运行时**：tower-http、tokio-tungstenite 升级（[PR #8078](https://github.com/nearai/ironclaw/pull/8078)），涉及 HTTP 与 WebSocket 链路稳定性
- **WebAssembly 运行时**：wasmtime 等 4 项组件升级（[PR #7834](https://github.com/nearai/ironclaw/pull/7834)），涉及沙箱执行环境的安全补丁

目前没有已报告的 Bug 需要 fix PR 跟进。

---

## 6. 功能请求与路线图信号

今日**无用户提出的新功能需求**。从依赖升级的分布方向可以间接观察到几个技术侧重点：

- **WebAssembly 生态投入**：wasmtime/wasi/wit-* 的持续升级表明 IronClaw 的 WASM 执行路径仍是核心维护方向，未来可能在插件系统或多语言支持上继续演进
- **CI/CD 现代化**：actions/setup-node 跨大版本升级至 7.0.0、claude-code-action 快速迭代，说明项目在跟随 GitHub Actions 生态演进，AI 辅助开发工作流可能是团队关注方向

以上均为基于依赖变化的推断，不构成明确路线图承诺。

---

## 7. 用户反馈摘要

由于今日无新的 Issue 活动和评论，**无法提炼用户反馈**。所有 PR 均无讨论内容，缺乏来自真实使用场景的痛点或满意度信息。建议关注下一轮 Issue 活跃周期或版本发布后的用户反馈。

---

## 8. 待处理积压

当前有 4 条待合并 PR，其中 1 条已积压超过三周，建议维护者优先安排评审：

| PR | 创建时间 | 积压时长 | 风险提示 |
| --- | --- | --- | --- |
| [#7834](https://github.com/nearai/ironclaw/pull/7834) — wasm 组 4 项更新 | 2026-08-23 | **3 周+** | 标记 `size: L, risk: medium`，涉及 wasmtime 等核心组件，工作量与回归风险较高，**建议优先处理** |
| [#8078](https://github.com/nearai/ironclaw/pull/8078) — tokio-ecosystem 组 2 项更新 | 2026-09-06 | 1 周+ | 影响面较小（2 项），可快速合并 |
| [#8079](https://github.com/nearai/ironclaw/pull/8079) — actions 组 6 项更新 | 2026-09-06 | 1 周+ | 含跨大版本升级（setup-node 4→7），建议验证 CI 流水线兼容性 |
| [#8099](https://github.com/nearai/ironclaw/pull/8099) — everything-else 组 25 项更新 | 2026-09-13 | 1 天 | 刚提交，可在 #8097 合并确认无回归后跟进 |

另外，#8097 虽已关闭但摘要未指明是合并还是直接关闭，建议维护者确认该组依赖更新是否已实际落地，以免与 #8099 产生版本冲突。

---

**总结**：IronClaw 今日处于依赖维护主导的低人工活跃期，供应链更新有条不紊，Issue 积压为零，整体健康度稳定。需要留意的是人工开发贡献与社区互动的缺失，以及 wasm 组 PR 持续积压带来的潜在版本漂移风险。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 (2026-09-14)

## 1. 今日速览

- 过去 24 小时共 4 条 Issue、4 条 PR 更新，无新版本发布，项目处于低活跃维护期。
- 新开 Issue #2660 提出“持久化用户与工作区记忆”方案，是今日唯一真正的新增讨论。
- 其余 3 条 Issue 和 4 条 PR 均为长期未活动项，已带 `[stale]` 标记，昨日更新疑为自动化 stale 操作，缺少人工响应。
- 项目健康度偏弱：P0 安全漏洞修复 PR 已搁置约半年，当前所有 PR 均未被合并。
- 核心风险：社区新需求与安全修复同时积压，维护响应速度亟需提升。

## 3. 项目进展

- 今日无 PR 被合并或关闭，4 条 PR 全部仍然待合并，且均处于 `[stale]` 状态。
- 主要积压 PR：
  - [#1038 fix(proxy): 确保流式响应 ReadableStream reader 在异常时也能释放](https://github.com/netease-youdao/LobsterAI/pull/1038) — 修复网络中断等场景下 reader 泄漏。
  - [#1042 fix(security): 修复 api:fetch/stream SSRF 与任意文件读取](https://github.com/netease-youdao/LobsterAI/pull/1042) — 关联 P0 漏洞 Issue #1041。
  - [#1044 fix(installer): normalize root drive install path](https://github.com/netease-youdao/LobsterAI/pull/1044) — 修复 Windows 下选择盘符根目录安装路径异常。
  - [#1045 feat(renderer): Agent 设置面板切换时增加未保存更改提示](https://github.com/netease-youdao/LobsterAI/pull/1045) — 避免切换 Agent 时丢失未保存修改。
- 结论：项目在功能与安全修复上几乎没有向前推进，长期处于 PR review 积压状态。

## 4. 社区热点

- [#2660 Proposal: durable user and workspace memory for LobsterAI](https://github.com/netease-youdao/LobsterAI/issues/2660)  
  今日唯一新开 Issue，由 MemCode 创始人提出。讨论点集中在：偏好、工作区、历史来源、未完成决策应跨会话持久化，映衬深度用户对“连续性”的强烈需求。

- [#1041 security: api:fetch/stream IPC 可被用于 SSRF 攻击，readFileAsDataUrl 可读取任意本地文件](https://github.com/netease-youdao/LobsterAI/issues/1041)  
  长期未关闭的高危安全议题，虽然评论不多，但因存在对应修复 PR 却迟迟未合并，持续受到关注。

- 诉求分析：社区当前最关心两点——**安全漏洞能否被尽快修复**，以及 **AI 助手是否能真正拥有跨会话记忆**。

## 5. Bug 与稳定性

- **严重：安全漏洞** — [#1041](https://github.com/netease-youdao/LobsterAI/issues/1041)  
  `api:fetch` / `api:stream` 可被用于 SSRF，`readFileAsDataUrl` 可读取任意本地文件，风险较高。已有修复 PR [#1042](https://github.com/netease-youdao/LobsterAI/pull/1042)，但尚未合并。

- **中等：上下文窗口限制不透明** — [#1046](https://github.com/netease-youdao/LobsterAI/issues/1046)  
  用户反馈模型上下文窗口被限制为 200K，未知原因，也找不到自定义配置入口。属于文档缺失与配置灵活性不足。

- **中等：已清除技能在切换 Agent 后依旧存在** — [#1047](https://github.com/netease-youdao/LobsterAI/issues/1047)  
  清除 Agent 技能后，切换再切回，技能仍被保留，影响多 Agent 管理一致性。

- 今日未发现新报告的崩溃或回归问题，以上均为存量问题。

## 6. 功能请求与路线图信号

- **跨会话持久记忆** — [#2660](https://github.com/netease-youdao/LobsterAI/issues/2660)  
  用户希望 LobsterAI 能记住偏好、工作区、历史资料和未完成决策。这是明显的产品路线图信号，可能推动后续加入“记忆层”设计。

- **模型上下文窗口参数自定义** — [#1046](https://github.com/netease-youdao/LobsterAI/issues/1046)  
  用户要求将上下文窗口从 200K 提升至模型官方支持的 1M，并希望提供平台侧或本地配置入口。

- **Agent 切换未保存提示** — PR [#1045](https://github.com/netease-youdao/LobsterAI/pull/1045)  
  如果被合并，将优化配置面板交互，降低用户误操作成本。该 PR 与 #2660 共同反映用户对状态持久性和可恢复性的重视。

## 7. 用户反馈摘要

- 来自 #2660 的输入：LobsterAI 覆盖研究、文档、PPT、视频、Web 等多个场景，用户希望这些场景中的“上下文”能跨会话延续，属于高频深度使用后的真实痛点。

- 来自 #1046 的用户询问：为什么上下文窗口被限制为 200K？能否自定义？说明高级用户对模型参数透明度与可配置性不满。

- 来自 #1047 的用户反馈：清除技能后切换 Agent，再次返回时技能仍存在，直接影响多 Agent 工作流的可信度。

- 总结：用户当前最在意的是**记忆持久化、配置开放、状态一致性**，而不只是模型生成能力本身。

## 8. 待处理积压

- **高危安全修复长期搁置**  
  PR [#1042](https://github.com/netease-youdao/LobsterAI/pull/1042) 修复 P0 级漏洞（SSRF + 任意文件读取），关联 Issue [#1041](https://github.com/netease-youdao/LobsterAI/issues/1041)，已开放数月，建议维护者最高优先级处理。

- **稳定性修复被 stale 标记**  
  PR [#1038](https://github.com/netease-youdao/LobsterAI/pull/1038) 修复流式响应 reader 泄漏，是影响长连接稳定性的关键补丁，需要及时 review。

- **体验类 PR 等待合并**  
  [#1044](https://github.com/netease-youdao/LobsterAI/pull/1044)（安装路径）和 [#1045](https://github.com/netease-youdao/LobsterAI/pull/1045)（未保存提醒）虽非紧急，但均影响日常用户体验。

- **存量 Issue 缺少负责人**  
  [#1046](https://github.com/netease-youdao/LobsterAI/issues/1046) 与 [#1047](https://github.com/netease-youdao/LobsterAI/issues/1047) 长期无 Assignee，若未规划处理，建议明确标注“已计划”或关闭。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报 — 2026-09-14

---

## 1. 今日速览

Moltis 项目过去24小时整体活跃度良好，合并节奏紧凑。共 3 条 Issue 更新（1 新开 / 2 关闭）、5 条 PR 更新（4 合并或关闭 / 1 待合并），并发布了新版本 `20260913.02`。核心进展集中在两大方向：一是 **Telegram 共享频道工具策略的可配置化修复**（#1264 → #1265），解决了工具在共享频道中失效的 Bug；二是 **推理强度（reasoning effort）体系的完善**（#1259 → #1266 + #1253），实现了默认推理等级跨会话持久化，并新增 `max` 最大推理档位。此外，社区出现一条来自第三方创业者（MemCode CEO）的高级记忆提供商能力请求（#1268），值得关注其后续讨论走向。项目整体处于健康的迭代节奏中，修复与功能开发同步推进。

---

## 2. 版本发布

### v20260913.02（2026-09-13）

- **发布链接**：https://github.com/moltis-org/moltis/releases/tag/20260913.02
- **关联 PR**：#1253、#1263、#1265、#1266、#1267

**更新内容（基于已合并 PR 推断）**：

| 类别 | 内容 |
|---|---|
| 新功能 | 新增 `chat.reasoning_default` 配置项，支持为新会话（含主聊天）设置默认推理强度，可选 `minimal`、`low`、`medium`、`high`、`xhigh`、`max`，并接受 `extra-high` 作为 `xhigh` 的别名（#1266） |
| 新功能 | `ReasoningEffort` 架构新增 `max` 档位，支持 `@reasoning-max` 模型后缀解析，OpenAI Codex Responses API 直传，非支持的最高档时自动降级（#1253） |
| Bug 修复 | Telegram 共享频道现可通过 `untrusted_audience` 与 `untrusted_tools` 配置项控制工具策略，与 Slack 行为对齐（#1265） |
| Bug 修复 | Agent 生命周期事件与消息外发事件正确派发：`AgentEnd` 在流式/非流式循环成功完成后发送，包含最终文本与真实工具调用统计；`MessageSending` 在最终发布前发送，尊重内容重写与 blocks（#1267，若已随版发布） |
| 依赖 | 前端（crates/web/ui）与文档目录（docs）npm/yarn 依赖批量升级（#1263） |

**破坏性变更**：`ReasoningEffort` 新增 `max` 枚举值若被外部系统直接消费需检查兼容性；Telegram 频道工具策略默认为 deny-all 的既有行为在配置缺省时保持不变，已有自定义配置的用户建议在升级后核对 `untrusted_audience` / `untrusted_tools` 设置。

**迁移注意事项**：无重大数据迁移或配置格式变更；使用 Telegram 共享频道的部署者建议确认工具策略配置是否符合预期。

---

## 3. 项目进展

过去 24 小时有 **4 条 PR 进入合并/关闭状态**，另有 1 条新 PR 待审。整体项目在「Telegram 稳定性」与「推理能力」两条线上均有实质推进。

### 已合并 / 已关闭 PR

- **[#1266] feat(chat): persist configurable default reasoning effort**（已关闭，关闭 #1259）
  - https://github.com/moltis-org/moltis/pull/1266
  - 引入 `chat.reasoning_default`，用户可为所有新聊天会话预设推理强度并跨会话持久化。该 PR 还处理了与主分支已有 `max` 档位的语义合并，避免概念混淆。
  - **意义**：直接响应用户对「默认思考级别」的长期诉求（#1259），提升会话体验的一致性。

- **[#1253] feat(reasoning): add max effort level**（已关闭）
  - https://github.com/moltis-org/moltis/pull/1253
  - 在共享 ReasoningEffort schema 中新增 `max` 档，支持 `@reasoning-max` 模型后缀，并对不支持最高档的提供商做安全钳制。
  - **意义**：为追求最强推理能力的用户提供更高上限，同时保证了跨提供商兼容性。

- **[#1265] fix(telegram): expose shared-chat tool policy controls**（已关闭，关闭 #1264）
  - https://github.com/moltis-org/moltis/pull/1265
  - 修复共享 Telegram 频道工具不可用的回归问题。之前 Telegram 继承了网关 deny-all 工具上限，但未暴露 Slack 已支持的设置；本 PR 将 `untrusted_audience` 和 `untrusted_tools` 打通至 Telegram 配置、运行时访问、存储序列化及 redacted API 响应。
  - **意义**：解决了一个影响共享频道实际使用的功能性 Bug，使 Telegram 渠道能力与 Slack 对齐。

- **[#1263] chore(deps): bump the npm_and_yarn group across 2 directories with 4 updates**（已关闭）
  - https://github.com/moltis-org/moltis/pull/1263
  - 依赖项批量升级：`@babel/core`、`astro`、`js-yaml` 等 4 项更新，涉及前端 UI 与文档目录。

### 待合并 PR

- **[#1267] fix(hooks): dispatch agent and outbound message lifecycle events**（OPEN）
  - https://github.com/moltis-org/moltis/pull/1267
  - 修复 hooks 生命周期事件派发：确保 `AgentEnd` 只在真正完成后触发一次，并携带准确的迭代与工具调用计数；`MessageSending` 在最终发布前触发，兼容内容重写与输出通道。
  - **状态**：等待 review 与合并，预计进入下一版本。

---

## 4. 社区热点

- **[#1268] Could Moltis expose an optional advanced memory provider?**（OPEN，0 评论）
  - https://github.com/moltis-org/moltis/issues/1268
  - 作者：@memcodeoff（自称 MemCode 创始人兼 CEO Vivek Gupta）
  - **分析**：目前该 Issue 暂无评论和点赞，但作者身份特殊——以 MemCode 产品方身份提出「可选高级记忆提供商」的接口建议，隐含商业合作或生态扩展意图。该请求直指 Moltis 的「持久化」「跨会话记忆」核心能力，若被接受，可能打开第三方记忆后端接入的生态位。目前 0 评论表明社区尚未响应，维护者宜尽快给出初步态度，避免潜在贡献者冷却。

- **[#1259] Configurable default reasoning/thinking level**（CLOSED）
  - https://github.com/moltis-org/moltis/issues/1259
  - 该 Issue 由 #1266 关闭，虽然评论为 0，但它作为「用户明确要求的配置能力」已被快速实现（从 9/5 提出到 9/13 关闭，仅 8 天），是社区诉求得到响应的正面信号。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 高（功能失效） | [#1264] Tools stop working in shared Telegram channels | 共享 Telegram 频道中工具完全停止工作，属于影响核心功能的回归问题。用户在 Preflight 中确认使用最新版本 | 已关闭；修复 PR [#1265] 已合并，问题解决 |
| 中（生命周期/事件） | PR [#1267]（关联 #1255） | Agent 结束事件与消息外发事件未按预期派发，可能导致 hooks 消费者收到缺失或重复事件 | 修复 PR 待合并，未关闭对应 Issue |
| 低（依赖安全与兼容） | [#1263] 批量更新 npm/yarn 依赖 | 前端与文档依赖过期，涉及 `@babel/core`、`astro` 等 | 已合并 |

**风险评估**：#1264 的修复已进入发布版本，但建议部署 Telegram 共享频道的用户验证 `untrusted_tools` 配置在升级后的实际效果。`#1267` 修复的 hooks 生命周期问题影响面较广，应在下个版本优先合并。

---

## 6. 功能请求与路线图信号

| 功能请求 | 来源 | 状态 | 路线图判断 |
|---|---|---|---|
| 默认推理级别跨会话持久化（#1259） | 用户 @Scentedtiger | 已关闭，由 #1266 实现 | ✅ 已进入版本，预期 20260913.02 起可用 |
| 新增 `max` 推理档位（#1253） | 用户 @GTanger | 已合并 | ✅ 已进入版本，与 #1266 联合构成完整推理强度体系 |
| 可选高级记忆提供商（#1268） | MemCode CEO @memcodeoff | 新开，未响应 | ⚠️ 方向性能力建议，若采纳将涉及架构抽象与插件化设计，短期纳入可能性低，但可能代表生态合作信号 |
| hooks 生命周期事件完善（#1267，关联 #1255） | 内部修复 | 待合并 | ✅ 高概率进入下一补丁版本 |

**路线图趋势**：项目近期在「推理强度配置」上密集投入（两个 PR 同时落点），说明开发者对多档位思考强度控制有明确需求；同时 Telegram 渠道的工具策略对齐 Slack，表明渠道一致性是持续优化的方向。

---

## 7. 用户反馈摘要

> 说明：当前 Issue/PR 评论区数据为空，以下基于 Issue 正文描述提炼。

- **共享频道工具策略诉求（#1264）**：用户在共享 Telegram 频道中遭遇工具静默失效，且确认使用最新版本。此类问题意味着「多用户共享场景」对工具权限的细粒度控制存在实际需求。用户期望的行为是：共享频道中也能按受众/工具类型区分是否启用，而非被统一禁用。

- **默认推理等级配置需求（#1259）**：用户明确提出「持久化默认思考级别」——不希望每次新建会话都要重新指定推理强度。这表明部分用户的工作流高度依赖稳定一致的模型行为，可配置默认值是刚需而非可选项。

- **高级记忆提供商的外部提案（#1268）**：第三方创业者主动联系，认为 Moltis 的持久化与跨会话记忆「已经做得很严肃」，并提出扩展接口可能。这从侧面印证 Moltis 在 agent 持久化领域的品牌认知正在形成；但需要甄别这是真实用户需求还是商业推广行为。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 持续时长 | 建议 |
|---|---|---|---|---|
| Issue（新开） | [#1268] | Could Moltis expose an optional advanced memory provider? | 1 天（2026-09-13 创建） | 维护者宜在 1-2 个工作日内给出初步回应（接受探讨 / 婉拒 / 转至 discussion），避免外部合作方悬空等待 |
| PR（待合并） | [#1267] | fix(hooks): dispatch agent and outbound message lifecycle events | 1 天（2026-09-13 创建） | 建议尽快 review 并合并——该修复影响 hooks 消费方的事件准确性，且已有关联 Issue #1255 在等待关闭 |
| Issue（已关闭，可回访） | [#1259] | Configurable default reasoning/thinking level | 8 天（9/5 → 9/13 关闭） | 尽管已实现，但可在后续发布说明中明确引导用户使用 `chat.reasoning_default`，并收集使用反馈 |

**长期观察项**：目前没有超过 30 天未响应的历史遗留 Issue 或 PR，项目 backlog 处于健康水位。

---

**总结**：Moltis 近 24 小时展现出「响应快、修复准」的维护风格——用户报 Bug 后 1 天内即有修复 PR 合入，功能请求 8 天内完成实现。项目健康度良好。建议下一阶段关注：1）尽快合入 #1267；2）对 #1268 给出明确态度；3）在发布说明中强化新配置项的用户指引。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-14

## 今日速览

过去 24 小时 CoPaw（QwenPaw）社区保持高活跃：13 条 Issue 更新（12 活跃 / 1 关闭），23 条 PR 更新（20 待合并 / 3 合并或关闭），其中多个 MCP 兼容性与内存稳定性 Bug 在 48 小时内获得了对应修复 PR，维护响应速度良好。社区关注焦点集中在升级 2.2.x 后的 MCP 回归（#7716、#7728）与容器内存耗尽（#7722）两件事上。功能侧亦有 DeepSeek V4 Flash 支持、Console 主题定制、Hub 管理员引导等新特性 PR 排队待合并。今日无新版本发布，合并的 2 条可见 PR 均为文档正确性修正。

## 版本发布

无新版本发布。

## 项目进展

今日合并/关闭 3 条 PR（数据概览），其中可见的 2 条为文档修正：

- [#7675 docs(mcp): fix wrong agent.json field name in Chinese MCP page](https://github.com/agentscope-ai/QwenPaw/pull/7675) — 修正中文 MCP 文档中 `tools.builtins` 字段名错误（正确为 `tools.builtin_tools`），避免用户配置踩坑。
- [#7706 docs(multi-agent): drop nonexistent qwenpaw providers command](https://github.com/agentscope-ai/QwenPaw/pull/7706) — 删除文档中不存在的 `qwenpaw providers` 命令（正确命令组为 `qwenpaw models`）。

此外，4 月创建的功能请求 [#3429](https://github.com/agentscope-ai/QwenPaw/issues/3429)（Docker 镜像预装常用 CLI 工具）今日关闭，长尾 Issue 得到清理。

**待合并关键 PR**（20 条中值得关注）：

- [#7729 fix(mcp): recognize Java jsonRpcError envelope on discover probe](https://github.com/agentscope-ai/QwenPaw/pull/7729) — 修复 Java/Kotlin MCP SDK 服务器兼容性（对应 #7728）
- [#7735 fix(mcp): preserve decoded HTTP error responses](https://github.com/agentscope-ai/QwenPaw/pull/7735) — 修复 2.2.x MCP 连接回归（对应 #7716）
- [#7732 fix(acp): select permission options by protocol kind](https://github.com/agentscope-ai/QwenPaw/pull/7732) — 修复 ACP 信任模式静默回退（对应 #7726）
- [#7736 feat(providers): add DeepSeek V4 Flash capabilities](https://github.com/agentscope-ai/QwenPaw/pull/7736) — 新增 DeepSeek V4 Flash 模型能力目录

## 社区热点

今日评论最活跃的 Issues（各 2 条评论）：

| Issue | 主题 | 背后的诉求 |
|---|---|---|
| [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 升级 2.2.x 后 MCP 无法连接和注册 | 2.1.1b3 正常、2.2.x 失败，属于升级回归，直接影响存量用户升级意愿 |
| [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) | Java MCP SDK 服务器 `server/discover` 返回 HTTP 500 非标准错误信封导致 Driver 构建失败 | 跨语言 MCP 生态互通（Java/Kotlin SDK）的兼容性瓶颈 |
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 内存耗尽三路径叠加：无界流缓冲、keep-alive 实例堆叠、doom-loop 门控绕过 | 容器化长时间运行稳定性，约 1MB/s 内存增长直至 OOM |
| [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | 定时任务经常无输出，结果被折叠在 steps/thinking 中 | 自动化任务结果不可见，威胁高频定时场景的使用信任 |
| [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) | 历史对话移至右侧的 UI 布局建议 | 14 寸笔记本等中小屏设备上信息密度过高的可用性问题 |

整体来看，社区在 2.2.x 升级周期中表现出对稳定性与兼容性的敏感度上升，MCP 生态（尤其 Java 系 SDK）已成为不可忽视的使用场景。

## Bug 与稳定性

按严重程度排列，并标注是否已有修复 PR：

| 严重度 | Issue | 问题概要 | 修复 PR |
|---|---|---|---|
| 🔴 严重 | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 内存耗尽（容器约以 1MB/s 填充后挂起/OOM），三路径叠加：无界流缓冲、keep-alive 实例堆叠、doom-loop 门控绕过 | 部分（[#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) 仅修复 `stream_one` 静默失败，内存问题需完整修复） |
| 🟠 高 | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 2.2.x 升级后 MCP 无法连接和注册（回归） | [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) |
| 🟠 高 | [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) | Java/Kotlin MCP SDK 服务器 HTTP 500 非标准 `jsonRpcError` 信封未被识别，Driver 构建失败 | [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) |
| 🟠 高 | [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) | 越界写入硬阻止对 kimi-code 的 Write 工具失效（安全边界绕过，`_paths` 未识别 kimi toolCall 路径字段） | 无 |
| 🟡 中 | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) | ACP `trusted: true` 静默回退到交互式确认（`_pick_allow_option` 只匹配 `allow_*` ID），信任机制失效 | [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) |
| 🟡 中 | [#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693) | Creator 多图生成期间用户「审核通过」中断图片任务且不重新调度，任务永久卡在 RUNNING | 无 |
| 🟡 中 | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | 定时任务无输出，结果被折叠在步骤/thinking 中；正常对话偶尔也出现 | 无 |
| 🟢 低 | [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) | Agent 默认工作目录设置失效，重启后回退旧路径，且文件夹项目会话缺少引导 | 无 |

## 功能请求与路线图信号

**今日新增功能请求：**

- [#7739 历史对话移至右侧](https://github.com/agentscope-ai/QwenPaw/issues/7739) — 中小屏设备 UI 布局优化。
- [#7740 Hub 模式下管理员重置密码](https://github.com/agentscope-ai/QwenPaw/issues/7740) — Hub 基础运维能力补全。
- [#7707 安卓浏览器会话框支持换行](https://github.com/agentscope-ai/QwenPaw/issues/7707) — 移动端输入体验改进（点击换行即提交的交互与中文长文本输入冲突）。
- [#7733 Agent-autonomous context management](https://github.com/agentscope-ai/QwenPaw/issues/7733) — 长任务上下文驱逐时由 Agent 主导的平滑交接，属高级架构演进方向。

**结合已有 PR 判断路线图：**

- **Console UI 个性化**：新 PR [#7741 feat(console): add customizable theme colors](https://github.com/agentscope-ai/QwenPaw/pull/7741) 实现主题色自定义（关闭 #7406），与 #7739 同属界面体验优化方向，预计有较大概率随下一版本合入。
- **Hub 运维能力**：PR [#7696 feat(hub): support local administrator bootstrap](https://github.com/agentscope-ai/QwenPaw/pull/7696) 支持命令行本地初始化管理员（`hub --init-admin`），与 #7740 的密码重置需求互补，Hub 管理功能正加速完善。
- **插件生态**：PR [#7702 feat(plugins): add bot-manager](https://github.com/agentscope-ai/QwenPaw/pull/7702) 提出统一多通道机器人管理插件（微信、钉钉等），若合入将成为多通道管理的基础设施。
- **模型支持**：PR [#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736) 增加 DeepSeek V4 Flash 能力目录，模型生态持续扩展。

## 用户反馈摘要

从今日活跃 Issues 中提炼的用户声音：

- **升级顾虑**：#7716 用户从 2.1.1b3 升级到 2.2.x 后 MCP 连接失败，同类场景可能波及更多存量用户，建议在 Release Notes 中明确已知问题与临时规避方案。
- **自动化工作流信任危机**：#7709 定时任务经常无输出、结果被折叠；#7693 任务永久卡在 RUNNING——自动化场景的可靠性问题会直接削弱用户对 Agent 的信任。
- **配置行为不可预期**：#7705 用户已设置新工作目录，重启后仍回退旧路径；同时"基于文件夹的项目会话"缺少新手引导，小白用户理解成本高。
- **移动端输入困境**：#7707 用户在 Android 浏览器中输入法只有换行键且点击即提交，长内容无法换行编辑，只能借助微信传输助手中转，操作成本明显。
- **Hub 运维缺口**：#7740 管理员无法为用户重置密码，多用户场景下缺少基础运维手段。

## 待处理积压

以下 PR/Issue 长期处于待合并或未响应状态，建议维护者优先安排 review 或给出明确回复：

1. **PR [#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211) fix(runtime): prevent injected context from persisting** — 8 月 21 日提交（近 4 周），已标记 `Under Review`、`ready-for-human-review`。修复 request-local 注入上下文被持久化为用户聊天记录的数据正确性问题。
2. **PR [#7413](https://github.com/agentscope-ai/QwenPaw/pull/7413) fix(runtime): preserve state when stream generator closes** — 8 月 30 日提交。处理异步流 `GeneratorExit` 时的运行状态保存，对异常中断场景很重要。
3. **PR [#7491](https://github.com/agentscope-ai/QwenPaw/pull/7491) fix(plugins): preserve prerelease minimum ordering** — 9 月 2 日提交。修复插件兼容性检查中 PEP 440 预发布版本排序问题。
4. **PR [#7532](https://github.com/agentscope-ai/QwenPaw/pull/7532) 启用 langfuse 监控，工具输出空白** — 9 月 3 日提交。修复 Langfuse 监控下工具调用成功后 Observation `output` 字段为空的问题。
5. **PR [#7632](https://github.com/agentscope-ai/QwenPaw/pull/7632) fix(runtime): return feedback for unknown slash commands** — 9 月 8 日提交。为未知斜杠命令提供本地反馈与拼写建议（对应 issue #7479）。

:::
