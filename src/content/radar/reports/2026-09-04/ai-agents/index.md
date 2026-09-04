---
title: "OpenClaw 生态日报"
published: 2026-09-04
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-04

> Issues: 95 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-04 02:08 UTC

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

**日期：2026-09-04**
**项目：openclaw/openclaw**

---

## 1. 今日速览

OpenClaw 今日发布 **v2026.9.1** 版本，标志着又一个重要的迭代节点。社区活跃度持续高位运行，过去 24 小时内共有 **95 条 Issues 更新**（新开/活跃 74 条，已关闭 21 条）和 **500 条 PR 更新**（待合并 395 条，已合并/关闭 105 条）。从数据看，Issues 关闭率约 22%，PR 关闭/合并率约 21%，**整体属于"高吞吐、高积压"状态**——大量新问题涌入的同时，维护团队也在持续推进存量问题的解决。Bug 报告与回归问题集中爆发，尤其围绕 2026.8.2 升级路径和 v2026.9.1 新引入的行为。

---

## 2. 版本发布

### 🚀 v2026.9.1

**主要更新亮点：**

- **全平台 Mermaid 图表渲染**：Control UI 以及 macOS / iOS / Android 原生应用现已支持 Mermaid 块渲染为图表，移动端新增放大预览与失败重试机制
  - 相关 PR：#134913, #135746, #135470, #135342

- **从安装到对话的体验优化**（摘要被截断，预计包含首次配置、引导流程改进等）

**⚠️ 重要提醒：**
v2026.9.1 已发现至少 1 个高严重度新问题（#137570：health/heartbeat 在大型 agent 集群下出现 O(agents²) 复杂度问题），建议生产环境升级前先评估。

**链接**：https://github.com/openclaw/openclaw/releases/tag/v2026.9.1

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 标题 | 影响 |
|---|---|---|
| [#134307](https://github.com/openclaw/openclaw/issues/134307) | **CLOSED** - 修复 `auth: "oauth"` MCP 服务器在 claude-cli runtime 下缺失 | 修复 OAuth MCP 工具目录差异 |
| [#135970](https://github.com/openclaw/openclaw/issues/135970) | **CLOSED** - 修复 codex 插件 `dist/extensions/codex` 缺少 `node_modules` | 解决 Codex 后端无法启动问题 |
| [#137377](https://github.com/openclaw/openclaw/issues/137377) | **CLOSED** - Windows `doctor --fix` 最终重启失败 | 修复 Windows 升级路径 |
| [#135900](https://github.com/openclaw/openclaw/issues/135900) | **CLOSED** - Telegram session-manager 回归 | 修复 2026.8.2 Telegram 会话边界 |
| [#136317](https://github.com/openclaw/openclaw/issues/136317) | **CLOSED** - Windows CI 平台启动竞态 | 修复 CI 哨兵提前退出 |
| [#137386](https://github.com/openclaw/openclaw/issues/137386) | **CLOSED** - Gateway 启动/停止错误 | 修复托管 Gateway 生命周期问题 |
| [#137391](https://github.com/openclaw/openclaw/issues/137391) | **CLOSED** - Usage 路由被陈旧 Chat 恢复覆盖 | 修复 Control UI 路由持久化 |
| [#137388](https://github.com/openclaw/openclaw/issues/137388) | **CLOSED** - Usage 日总计丢失 session 过滤 | 修复数据展示问题 |
| [#124177](https://github.com/openclaw/openclaw/issues/124177) | **CLOSED** - Codex app-server 剥离 `read` 工具 | 完善 sandbox 容器支持 |
| [#137560](https://github.com/openclaw/openclaw/issues/137560) | **CLOSED** - memory-core 误报"磁盘满" | 修复容器环境问题 |

**整体评估：** 项目当日在稳定性修复上取得实质性进展，特别是 2026.8.2 → 2026.9.1 升级路径上的多个关键问题得到解决。但 500 条 PR 中仅有约 21% 关闭/合并，**积压压力较大**，主要集中在需要维护者 review 的高风险变更。

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

| 排名 | Issue | 评论 | 关注点 |
|---|---|---|---|
| 1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) | 10 | hook/tool 子进程泄漏 → 僵尸进程累积，影响运行时稳定性 |
| 2 | [#110190](https://github.com/openclaw/openclaw/issues/110190) | 9 | 运行时上下文载体位置错误，导致模型推理混乱和 token 浪费 |
| 3 | [#123799](https://github.com/openclaw/openclaw/issues/123799) | 8 | 生产环境升级指引缺失，Codex compact 404 影响 |
| 4 | [#134307](https://github.com/openclaw/openclaw/issues/134307) | 7 | OAuth MCP 工具目录在 claude-cli 下缺失（已关闭） |
| 5 | [#137377](https://github.com/openclaw/openclaw/issues/137377) | 6 | Windows `doctor --fix` 重启失败（已关闭） |
| 6 | [#132781](https://github.com/openclaw/openclaw/issues/132781) | 6 | 进度流模式优化（功能请求） |
| 7 | [#135970](https://github.com/openclaw/openclaw/issues/135970) | 6 | Codex 插件 node_modules 缺失（已关闭） |

### 背后诉求分析

- **生产环境升级焦虑**（#123799）：用户希望有更清晰的版本升级/回退指引
- **运行时效率担忧**（#110190, #97616）：大上下文/长时间运行下的资源管理问题
- **跨 runtime 一致性**（#134307）：同一配置在不同 runtime 下行为不一致
- **可观测性不足**：用户希望 doctor 工具能更准确地诊断问题

---

## 5. Bug 与稳定性

### 🔴 P0 / 紧急

| Issue | 标题 | 是否有 Fix PR |
|---|---|---|
| [#136148](https://github.com/openclaw/openclaw/issues/136148) | **P0** - Linux AppImage WebKitWebProcess SIGABRT，桌面应用空白窗口 | ❌ 无 |

### 🟠 P1 / 高优先级

| Issue | 标题 | 是否有 Fix PR |
|---|---|---|
| [#137690](https://github.com/openclaw/openclaw/issues/137690) | Telegram 会话 `sessions_spawn` 报"unknown parent session" | ❌ 无 |
| [#137697](https://github.com/openclaw/openclaw/issues/137697) | 2026.8.2 中等会话长度即触发压缩失败 | ❌ 无 |
| [#137710](https://github.com/openclaw/openclaw/issues/137710) | Native Codex 完成不唤醒 `sessions_yield` 父会话 | ❌ 无 |
| [#137750](https://github.com/openclaw/openclaw/issues/137750) | Memory-only search 拖垮 Gateway | ❌ 无 |
| [#137773](https://github.com/openclaw/openclaw/issues/137773) | Docker `OPENCLAW_INSTALL_BROWSER=1` 权限错误 | ❌ 无 |
| [#137570](https://github.com/openclaw/openclaw/issues/137570) | v2026.9.1 health/heartbeat O(agents²) 阻塞 | ❌ 无（回归） |
| [#137613](https://github.com/openclaw/openclaw/issues/137613) | CLI backend 预压缩 memory flush 被禁用 | ❌ 无 |
| [#137591](https://github.com/openclaw/openclaw/issues/137591) | 配置热重载丢失 channel webhook 路由 | ❌ 无 |
| [#137124](https://github.com/openclaw/openclaw/issues/137124) | claude-cli 工具重复 + 代理身份泄漏（安全） | ❌ 无 |
| [#135858](https://github.com/openclaw/openclaw/issues/135858) | opencode-go 目录快照配置覆盖丢失 | ❌ 无 |

### 🟡 P2 / 中等优先级

| Issue | 标题 | 是否有 Fix PR |
|---|---|---|
| [#137729](https://github.com/openclaw/openclaw/issues/137729) | transcript replay 中未保护的 `.trim()` | ❌ 无 |
| [#137056](https://github.com/openclaw/openclaw/issues/137056) | memory-core 维护阻塞 search/watch | ❌ 无 |
| [#137197](https://github.com/openclaw/openclaw/issues/137197) | inline `/model` 解析器误识别普通文本 | ❌ 无 |
| [#137508](https://github.com/openclaw/openclaw/issues/137508) | 移动端键盘弹出后聊天被遮挡 | ❌ 无 |
| [#136786](https://github.com/openclaw/openclaw/issues/136786) | 2026.8.2 archive symlink guard 破坏备份 | ❌ 无 |

### 整体评估

- **回归问题突出**：大量 P1/P2 标记为 `regression`，集中在 2026.8.2 升级路径
- **新版本本身引入问题**：v2026.9.1 已有 O(agents²) 阻塞等新 bug
- **Fix PR 覆盖不足**：超过 30 个 P1/Bug issue 中，明确关联 fix PR 的不足 30%

---

## 6. 功能请求与路线图信号

### 较受关注的功能请求

| Issue | 描述 | 相关 PR 状态 |
|---|---|---|
| [#132781](https://github.com/openclaw/openclaw/issues/132781) | narration 不可用时使用最新评论作为进度标签 | 暂无 PR |
| [#126781](https://github.com/openclaw/openclaw/issues/126781) | `/loop` 和 Automations 启动 Durable Lobster 工作流 | 暂无 PR |

### 已存在对应 PR 的功能

| 功能 | Issue | PR |
|---|---|---|
| 跨 surface 统一模型列表与 provider 登录 | - | [#136257](https://github.com/openclaw/openclaw/pull/136257)（XL，等待 review） |
| Apple Watch 原生实时语音 | - | [#135808](https://github.com/openclaw/openclaw/pull/135808)（XL，waiting on author） |
| 更新/启动失败后启动 owned recovery | [#134685](https://github.com/openclaw/openclaw/issues/134685) | [#135868](https://github.com/openclaw/openclaw/pull/135868)（XL，needs proof） |
| 插件可定制 Control UI | - | [#134943](https://github.com/openclaw/openclaw/pull/134943)（XL，waiting on author） |
| 会话保留优化（维护压力下） | [#127970](https://github.com/openclaw/openclaw/issues/127970) | [#136639](https://github.com/openclaw/openclaw/pull/136639)（XL，ready for maintainer） |

**路线图信号：** 多个 XL 级 PR 集中在多端一致性、跨平台体验和插件生态扩展，反映出项目正从"核心稳定性"向"生态丰富度"过渡。

---

## 7. 用户反馈摘要

### 🗣️ 真实用户痛点

- **生产环境焦虑**（来自 #123799）：用户 @FlaviaDyckerhoff 表示"我们是一个受影响的生产部署"，需要 2026.5.12 上的安全升级/回退指引 → 反映企业用户对升级路径清晰度的强烈需求

- **升级即破坏**（来自 #137377、#135900、#136786 等）：多位用户反映从 2026.7.x / 2026.8.x 升级后出现备份失败、会话边界异常、doctor 工具不可用 → **回归是当前最严重的信任问题**

- **跨平台体验割裂**（来自 #137508）：用户 @ken780814 反馈华为 Android 设备上键盘弹出后聊天被遮挡，"严重影响使用体验" → 移动端 UX 是短板

- **多 Agent 房间的重复回复**（来自 #126813）：用户在多 agent 群组中遭遇同一问题被多个 agent 重复回答 → 反映协作场景的边界控制问题

- **大型部署的性能瓶颈**（来自 #137570）：632 个 agent 集群下，event loop 被 health/heartbeat 阻塞 45-57 秒 → 暴露在大规模部署下的架构问题

### 👍 满意点

- Codex 插件修复（#135970 已关闭）
- OAuth MCP 工具目录修复（#134307 已关闭）
- Mermaid 图表全平台渲染获得 v2026.9.1 官方支持

---

## 8. 待处理积压

### ⚠️ 长期未响应的重要 Issue

| Issue | 标题 | 创建时间 | 状态 |
|---|---|---|---|
| [#91860](https://github.com/openclaw/openclaw/issues/91860) | Discord 消息发送忽略 `maxLinesPerMessage`，CLI 发送在 17 行处被切分 | **2026-06-10** | 3 个月+，有 linked-pr-open |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程泄漏 | **2026-06-29** | 2 个月+，无 fix PR，标记 needs-maintainer-review |
| [#110190](https://github.com/openclaw/openclaw/issues/110190) | 运行时上下文载体位置错误 | **2026-07-17** | 近 2 个月，无 fix PR |
| [#123071](https://github.com/openclaw/openclaw/issues/123071) | `openclaw doctor` 在 2026.6.1 启动优化后挂起 | **2026-08-13** | 22 天，无 fix PR，maturity: stable |
| [#125640](https://github.com/openclaw/openclaw/issues/125640) | Memory index 批量限制回归 | **2026-08-18** | 17 天，回归问题 |
| [#126874](https://github.com/openclaw/openclaw/issues/126874) | Windows CI 仅覆盖 0.60% 测试 | **2026-08-20** | 15 天，P2 |
| [#126906](https://github.com/openclaw/openclaw/issues/126906) | 拒绝 write 工具静默禁用 memory 持久化 | **2026-08-21** | 14 天，P1，影响 data-loss |
| [#123265](https://github.com/openclaw/openclaw/issues/123265) | `role:"custom"` 上下文被序列化为 user 消息 | **2026-08-13** | 22 天，P1 |

### 🔴 需要维护者紧急关注的 PR

| PR | 标题 | 状态 |
|---|---|---|
| [#136257](https://github.com/openclaw/openclaw/pull/136257) | 跨 surface 模型列表与 provider 登录 | XL，多 merge-risk，等待 maintainer |
| [#134943](https://github.com/openclaw/openclaw/pull/134943) | 插件可定制 Control UI | XL，security-boundary 风险 |
| [#135868](https://github.com/openclaw/openclaw/pull/135868) | 启动失败后启动 owned recovery | XL，availability 风险 |
| [#136639](https://github.com/openclaw/openclaw/pull/136639) | 会话保留优化 | XL，session-state 风险 |
| [#137342](https://github.com/openclaw/openclaw/pull/137342) | channel 进度/工具日志保持 | XL，message-delivery 风险 |
| [#135808](https://github.com/openclaw/openclaw/pull/135808) | Apple Watch 原生语音 | XL，security-boundary 风险 |

**建议：** 维护者团队应优先处理标记 `no-new-fix-pr` 且 `needs-maintainer-review` 的 P1 issue，以及 3 个月以上未关闭的 #91860。

---

## 📊 项目健康度总评

| 维度 | 评分 | 说明 |
|---|---|---|
| 活跃度 | ⭐⭐⭐⭐⭐ | Issues/PRs 流量极高，社区参与度强 |
| 稳定性 | ⭐⭐☆☆ | 回归问题集中爆发，新版本引入新 bug |
| 响应速度 | ⭐⭐⭐☆☆ | Issues 关闭率 22%，存在长期未响应 issue |
| 路线图清晰度 | ⭐⭐⭐⭐ | 多端一致性与生态扩展方向明确 |
| 升级友好度 | ⭐⭐☆☆ | 多个版本升级路径出现问题，生产用户焦虑 |

**核心建议：**
1. 优先修复 2026.8.2 → 2026.9.1 升级路径上的回归问题
2. 为 v2026.9.1 已知问题（#137570）发布 hotfix
3. 建立更清晰的"生产环境升级"文档与回退指引
4. 加强对 `clawsweeper:no-new-fix-pr` 标签 issue 的维护者 review 调度

---

*本日报基于 2026-09-04 GitHub 数据自动生成*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告

**报告日期：2026-09-04**
**覆盖项目**：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态在 2026 年 9 月已进入**多极竞速 + 能力外延期**：OpenClaw 凭借日均 500 条 PR 吞吐稳居流量核心，但其回归问题与升级焦虑成为生态最显著的"信任税"；NanoBot、IronClaw、CoPaw 处于"高频合龙"节奏，单日合并/关闭 PR 数量维持在 10-30 条区间，呈现典型快速迭代特征；Zeroclaw、NanoClaw 集中力量进行架构分箱与契约化重构，为下一波能力扩展铺路；Moltis 则进入低水位维护期；而 PicoClaw 受限于依赖驱动型维护节奏，社区响应明显滞后。整体而言，生态重心已从"单 agent 对话能力"转向**多通道协同、provider 契约化、可观测性、移动端 PWA、安全沙箱**五条主线，**MCP 生态对接**（LobsterAI #2601、CoPaw #6960、NanoBot 多通道修复）正在成为新一轮差异化竞争的焦点。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | 今日 Release | 合并/关闭 PR | 健康度 | 阶段定位 |
|------|-----------|---------|--------------|--------------|--------|----------|
| **OpenClaw** | 95（74 开/活 / 21 闭） | 500（395 待 / 105 闭） | v2026.9.1 | ~105 | ⭐⭐☆☆ | 高吞吐 · 高积压 · 回归压力 |
| **NanoBot** | 4（3 开 / 1 闭） | 25（12 待 / 13 闭） | 无 | 13 | 🟢 健康 | 稳步修补 · 体验升级 |
| **Zeroclaw** | 1（开） | 50（全部 OPEN） | 无 | 0 | ⭐⭐☆☆ | 重构密集 · 评审阻塞 |
| **PicoClaw** | 5（4 开 / 1 闭） | 7（5 待 / 1 闭 + 4 Dependabot） | 无 | 1 | ⭐⭐☆☆ | 低活跃 · 依赖驱动 |
| **NanoClaw** | 5（4 开 / 1 闭） | 23（20 待 / 3 闭） | 无 | 3 | ⭐⭐⭐☆☆ | 多线重构 · 积压中 |
| **IronClaw** | 7 | 17（9 闭 / 8 待） | 无 | 9 | ⭐⭐⭐⭐☆ | 高质合龙 · 类型化收尾 |
| **LobsterAI** | 6（4 开 / 2 闭） | 15（5 待 / 10 闭） | 2026.8.31 预热 + 2026.9.4 预告 | 10 | ⭐⭐⭐☆☆ | 发布窗口 · 体验打磨 |
| **Moltis** | 0 | 1（待合并） | 无 | 0 | ⭐⭐⭐☆☆ | 静默维护 · Hook 补全 |
| **CoPaw** | 23 | 29 | **v2.2.0 正式发布** | 多笔合龙 | ⭐⭐⭐⭐☆ | 高速迭代 · 多租户上线 |

> **数据观察**：CoPaw 是今日唯一完成正式版本发布的项目；OpenClaw 的 PR 待合并数（395）约为 NanoBot（12）的 **33 倍**，但合并速率反而相当——说明其维护者**已逼近产能上限**。IronClaw 合并质量最高（多为 XL 级 + 带回归测试），是当前**单 PR 价值密度最强**的项目。

---

## 3. OpenClaw 在生态中的定位

| 维度 | OpenClaw 现状 | 同类对比 |
|------|---------------|----------|
| **流量规模** | 日均 95 Issues / 500 PR | 约为 NanoBot（4/25）的 20 倍 / 20 倍；远超 Zeroclaw（1/50） |
| **合并节奏** | 21%（105/500） | 低于 NanoBot 的 52%、IronClaw 的 53%，但绝对数量最大 |
| **平台覆盖** | 全平台桌面 + iOS + Android + Control UI | 与 IronClaw、LobsterAI、CoPaw 同级 |
| **功能广度** | Mermaid 渲染、Codex 插件、OAuth MCP、Gateway、Memory、channels 全栈 | **生态最广**，但单点深度被 Zeroclaw、NanoClaw 追赶 |
| **稳定性问题** | v2026.9.1 即引入 O(agents²) 阻塞（#137570），多个 P0/P1 无 fix PR | PicoClaw 同样有 P0 通道 bug 但 PR 已就位；IronClaw 主动拆分 `main` 红屏 |
| **社区成熟度** | 出现长期未响应 issue（#91860 3 个月+） | Moltis、NanoBot 几乎无积压，但流量也小 |

**核心定位**：OpenClaw 仍是生态的**事实标准与流量枢纽**，但其**回归问题（#137377 Windows 升级、#135900 Telegram 回归、#136786 备份破坏）+ 升级焦虑**正在动摇企业用户信任。多位用户在 #123799 明确表达"我们是一个受影响的生产部署"的诉求，反映出 **OpenClaw 已从"个人玩具"进入"生产关键基础设施"角色**，但治理能力尚未跟上。

**技术路线差异**：
- 与 Zeroclaw 的"模块化单体"路线相比，OpenClaw 仍保持较重的核心 runtime；
- 与 IronClaw 的"WebUI 类型化收尾 + Reborn 架构"路线相比，OpenClaw 的前端治理节奏偏弱（v2026.9.1 才补齐 Mermaid 渲染）；
- 与 NanoBot 的"WebUI 边界态稳定"路线相比，OpenClaw 的多通道健壮性受回归拖累。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|----------|----------|
| **MCP 生态对接** | LobsterAI、CoPaw、NanoBot、OpenClaw | LobsterAI #2601 要求渲染 MCP Apps/Prefab UI；CoPaw #6960 PawPort 跨生态导入；NanoBot #5637 修复 Matrix 流式投递；OpenClaw #134307 修复 OAuth MCP 工具目录 |
| **Provider 契约化重构** | NanoClaw、Zeroclaw、IronClaw | NanoClaw #3581-#3591 一组 PR 把 provider 改为声明式 + 注册校验；Zeroclaw #10602 对可重放但为空流允许重试；IronClaw #8044 缓存新 Claude 家族（`claude-fable-*` / `claude-mythos-*`） |
| **可观测性 / 调试能力** | IronClaw、Zeroclaw、OpenClaw | IronClaw #8009 要求 MCP 出站错误保留字节/原因；Zeroclaw #10597 上报 context budget 裁剪、#10599 cron 静默失败可见化、#10600 修复投递误报；OpenClaw 用户希望 doctor 工具更准确（#123799） |
| **多 Agent / 子代理协作** | OpenClaw、Zeroclaw、IronClaw、CoPaw | OpenClaw #126813 多 agent 房间重复回复；Zeroclaw #10601 修复 delegate 工具被无条件剥离；IronClaw #8046 子代理审批/凭据闸口事件可达父代理；CoPaw #7318 Hub 多租户路线图 |
| **移动端 / PWA 体验** | OpenClaw、NanoBot、CoPaw、IronClaw | OpenClaw #137508 华为设备键盘遮挡；NanoBot #5640/#5641 iOS PWA 完整闭环；CoPaw #7378/#7519 QwenPaw Mobile；IronClaw #8043 流式文本去重 |
| **升级路径与回归控制** | OpenClaw、PicoClaw、LobsterAI | OpenClaw v2026.8.2 → v2026.9.1 多条 P1 回归；PicoClaw 0.3.1 → 0.3.2/0.4.0 积压；LobsterAI #1082 openclaw 版本合规风险 |
| **安全沙箱 / Prompt 注入** | CoPaw、OpenClaw、Zeroclaw | CoPaw #7511 沙箱突破 + #7443 危险指令绕过；OpenClaw #137124 claude-cli 工具重复 + 代理身份泄漏；Zeroclaw #10563 重新标记"未凭证动作"对抗幻觉执行 |
| **架构分箱 / 模块化** | Zeroclaw、NanoClaw、OpenClaw | Zeroclaw 拆出 zeroclaw-cron / zeroclaw-dist / zeroclaw-bootstrap（#10557/#10590/#10591）；NanoClaw mailbox session hook（#3704）+ admission gate（#3707）；OpenClaw Codex plugin 修复（#135970） |

---

## 5. 差异化定位分析

| 项目 | 核心定位 | 目标用户 | 技术架构关键差异 |
|------|----------|----------|------------------|
| **OpenClaw** | 全平台个人 AI 助手 + 智能体平台 | 个人开发者 + 企业部署 | 重 runtime + 插件生态；多 surface 统一（Control UI + 原生应用） |
| **NanoBot** | WebUI-first 个人助手 | 偏前端体验敏感的用户 | 强调 WebUI 边界态稳定 + 多通道鲁棒性 |
| **Zeroclaw** | 代码工作流导向 agent | 开发者 / 代码任务自动化 | Modularization 重构（zeroclaw-cron / zerocode / zeroclaw-dist），强调反幻觉与可靠性基线 |
| **PicoClaw** | 轻量级 + 边缘部署 | 嵌入式 / ARM 设备 / 极简场景 | Go + Web UI，依赖驱动型维护 |
| **NanoClaw** | 多 agent 编排 + Provider 契约化 | 中高级开发者 / 平台型用户 | Provider 注册校验、mailbox 可扩展 hook、CLI 优先 |
| **IronClaw** | 企业级 + 强类型 + Reborn 架构 | 企业 / 重视代码质量的团队 | WebUI 完整类型化、`@ts-nocheck` ratchet 机制、子代理可观测性 |
| **LobsterAI** | 桌面端 AI 助手（教育产品） | 桌面用户 / 教育场景 | 应用内浏览器 + 加密凭据 + IM 卡片 UI，紧跟 OpenClaw 上游 |
| **Moltis** | Hook 体系 / 事件总线导向 | 二次开发者 / 中间件构建者 | 强调事件契约完整性与可观测性接缝 |
| **CoPaw** | 多租户 Hub + 移动端 + 安全治理 | 团队 / 企业 | QwenPaw Hub 多用户架构 + QwenPaw Mobile + 安全审批治理 |

**关键观察**：
- **OpenClaw + LobsterAI** 形成"上游核心 + 桌面产品包装"的标准组合；
- **Zeroclaw + NanoClaw** 在"代码工作流 agent + 多 agent 编排"方向形成技术路线相近的竞争；
- **IronClaw** 凭借 WebUI 类型化与子代理 R3 切片走"工程严谨"路线，与 OpenClaw 形成对照；
- **CoPaw** 通过 QwenPaw Hub 多租户 + 移动端切入**团队场景**，与 OpenClaw 的"个人 + 插件扩展"路径形成差异；
- **PicoClaw** 与 **Moltis** 体量较小但在边缘部署 / Hook 体系方向具备差异化价值。

---

## 6. 社区热度与成熟度分层

### 🔥 第一梯队：高速迭代 + 高曝光
- **OpenClaw**：日 500 PR 吞吐，绝对头部，但**回归压力正在侵蚀信任**
- **CoPaw**：v2.2.0 重大版本 + 23 Issues / 29 PR + 多租户 + 安全议题并重，是当前**话题密度最高**的项目

### 🟢 第二梯队：稳定迭代 + 高质合龙
- **NanoBot**：合并率 52%，无新版本但累计修补密集
- **IronClaw**：9 条 PR 合龙多为 XL 级 + 带回归测试，**单 PR 价值密度最强**
- **LobsterAI**：10/15 PR 已闭，2026.8.31/9.4 双版本窗口推进

### 🟡 第三梯队：架构重构 + 评审承压
- **Zeroclaw**：50 PR 全部 OPEN，0 合并，JordanTheJet 一人贡献半数——**评审通道已成为瓶颈**
- **NanoClaw**：20/23 PR 待合并，providers 契约化重构组（#3581-#3591）等待集中评审

### ⚪ 第四梯队：低水位 / 依赖驱动
- **PicoClaw**：日 7 PR 中 4 条为 Dependabot，社区响应迟缓
- **Moltis**：仅 1 条 PR 待合并，处于静默维护期

---

## 7. 值得关注的趋势信号

### 趋势一：**Provider 契约化进入深水区**
NanoClaw 一组 6+ 个 PR 把 provider 从"散落 flag + Claude 专属辅助"重构为"声明式 + 注册校验的契约"；IronClaw 同步把 prompt budget 从硬编码改为按模型声明窗口派生；Zeroclaw 对 provider 可重放但空流建立"二阶防御"层。
**对开发者的启示**：未来扩展第三方 LLM 必须走 schema-first 路径，prompt-level hack 收益递减。

### 趋势二：**MCP 从"协议接入"演进为"应用层"**
LobsterAI 要求渲染 MCP Apps / Prefab UI（`ui://` 资源），OpenClaw 修复 OAuth MCP 工具目录，CoPaw PawPort 跨生态导入配置。**MCP 正在成为 agent 之间的"浏览器级"中间层**，而非单纯的消息协议。

### 趋势三：**可观测性成为商业化前夜的关键成熟度信号**
Zeroclaw 集中补齐 memory 召回戳、context budget、cron 静默失败、投递真伪四个观测点；IronClaw 主动识别 MCP 出站错误被压平的可观测性盲区；OpenClaw 用户多次要求 doctor 工具改进。
**对开发者的启示**：构建 production-grade agent 时，observability hooks 优先级应高于功能特性。

### 趋势四：**安全治理从"提示词工程"转向"结构化审批"**
CoPaw #7525 把 Governance CRITICAL 改为需审批而非直接拒绝，与 UI 描述对齐；Zeroclaw #10563 引入"未凭证动作"对抗机制；OpenClaw #137124 修复代理身份泄漏。
**对开发者的启示**：硬拒绝路径不可持续，**审批制 + 工具调用凭证化**将成为标准模式。

### 趋势五：**架构分箱成为下一波能力扩展的前提**
Zeroclaw 系统性拆出 cron / dist / bootstrap 三个 crate；NanoClaw 暴露 mailbox session hook；OpenClaw Codex plugin 修复预示 plugin boundary 收紧。
**对开发者的启示**：fork 与定制化需求倒逼核心团队主动提供扩展点，**单插槽时代结束**。

### 趋势六：**回归问题成为生态最大的"信任税"**
OpenClaw v2026.8.2 → v2026.9.1 升级路径上集中爆发 P1/P2 回归，#123799 用户直接表达"生产部署焦虑"；PicoClaw 多个 stale Issue 指向同一模式。
**对开发者的启示**：版本发布前的回归测试套件覆盖率（IronClaw 借此清理 158 处 `@ts-nocheck`）与 changelog 透明度（NanoBot #5645 抱怨 0.2.2 → 0.3.0 breaking change 无提示）将成为项目口碑分水岭。

---

## 核心结论

OpenClaw 仍是生态流量枢纽与事实标准，但**回归压力、升级焦虑与维护者产能上限**已构成显著风险；**IronClaw 与 CoPaw** 在工程严谨度与多租户扩展性上展现了与 OpenClaw 形成互补的差异化路径；**Zeroclaw 与 NanoClaw** 处于架构重构深水期，能否突破评审瓶颈将决定下一阶段竞争力；**MCP 生态应用层、可观测性、结构化安全治理、Provider 契约化**是未来 6-12 个月开发者最值得投入的方向。

对技术决策者而言：**不要把生产关键路径完全押注单一项目**——OpenClaw 的回归教训已经验证了这一原则。对 AI 智能体开发者而言：**hook/契约/可观测性/审批制**四件套，正在从"加分项"变成"准入门槛"。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报

**报告日期：2026-09-04**

---

## 1. 今日速览

NanoBot 项目今日保持中高度活跃，全天无新版本发布。代码层面共发生 25 条 PR 更新，其中 13 条已合并/关闭、12 条仍待处理，合并节奏健康。问题侧共 4 条 Issue 更新，3 条仍开放、1 条已关闭——值得注意的是 Issue #5512（Gateway 重启后 WebUI 假死）已由 PR #5514 闭环修复，说明社区响应链路畅通。今日工作高度集中在 **WebUI 体验打磨**（iOS PWA 修复、session title、流状态可视化）与 **多通道稳定性**（Matrix/Signal/Channels 修复）两条主线。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日有 13 条 PR 完成生命周期，可按主题归纳如下：

### 多通道（Matrix / Signal / Channels）健壮性
- **PR #5637**（[链接](https://github.com/HKUDS/nanobot/pull/5637)）— 修复 Matrix 流式投递失败被静默吞掉的问题，使失败可走 channel manager 重试策略。
- **PR #5385**（[链接](https://github.com/HKUDS/nanobot/pull/5385)）— 补齐 Element 端 `m.key.verification.request` 现代事件流程，完成 SAS 配对闭环。
- **PR #5334**（[链接](https://github.com/HKUDS/nanobot/pull/5334)）— 修复长消息在换行切分后缩进丢失的问题，并保持 Signal UTF-16 偏移对齐。
- **PR #5472**（[链接](https://github.com/HKUDS/nanobot/pull/5472)）— 让 Signal 入站白名单支持 `*` 通配符。
- **PR #5634**（[链接](https://github.com/HKUDS/nanobot/pull/5634)）— 给 `_origin_reply_fingerprints` 加上边界，防止长跑网关内存无限增长。

### 运行时与 Provider 稳定性
- **PR #5413**（[链接](https://github.com/HKUDS/nanobot/pull/5413)）— Provider 抛异常时同样走 fallback 链路，避免绕过容错策略。
- **PR #5632**（[链接](https://github.com/HKUDS/nanobot/pull/5632)）— 为 Codex 注入稳定的 `session-id` / `prompt_cache_key`，显著改善 prompt 缓存命中率。
- **PR #5635**（[链接](https://github.com/HKUDS/nanobot/pull/5635)）— SDK 流关闭时不再因队列入队 sentinel 而丢失未读事件。
- **PR #5515**（[链接](https://github.com/HKUDS/nanobot/pull/5515)）— 把 session reply timeout 任务失败纳入观察，避免后台 task 静默丢弃异常。

### 体验与小修
- **PR #5514**（[链接](https://github.com/HKUDS/nanobot/pull/5514)）— 闭环 Issue #5512：Gateway 重连后 WebUI 不会卡死。
- **PR #5646**（[链接](https://github.com/HKUDS/nanobot/pull/5646)）— 语言选择器只展示本地语言名。
- **PR #5629**（[链接](https://github.com/HKUDS/nanobot/pull/5629)）— 修复 `format_tool_hints` 对普通（非路径/命令）值不应用 `max_length` 的截断漏洞。

> 综合判断：今日合并内容未涉及架构级重构，属于"**稳步修补 + 体验升级**"节奏，但 Codex 缓存亲和性、iOS PWA、流状态可视化等单点价值较高，项目处于量变积累期。

---

## 4. 社区热点

按反应与互动维度排序：

| 排序 | Issue / PR | 标题 | 评论 | 👍 | 链接 |
|---|---|---|---|---|---|
| 1 | #5644 | [WebUI] Channel locale registry 并发丢 locale | 1 | 0 | [链接](https://github.com/HKUDS/nanobot/issues/5644) |
| 2 | #5512 | Gateway 重启后 WebUI 卡 spinning | 1 | 0 | [链接](https://github.com/HKUDS/nanobot/issues/5512) |

> 注：今日所有 PR 的 `comments` 字段在数据源中未提供，**无法**按 PR 评论数做对比。从整体看，热度仍集中在 "WebUI 在断连/重启边界状态下的行为" 这条主线上，反映出用户对长连接稳定性的高度敏感。

---

## 5. Bug 与稳定性

按"用户可感知度 × 影响范围"严重度排序：

| 严重度 | Issue | 描述 | 已有 fix |
|---|---|---|---|
| 🔴 高 | [#5644](https://github.com/HKUDS/nanobot/issues/5644) | `loadChannelLocale()` 在并发加载时存在竞态，可能丢失某个 locale 的翻译映射，导致 WebUI 出现混合语言或 key 暴露 | ❌ 暂无 |
| 🟠 中 | [#5645](https://github.com/HKUDS/nanobot/issues/5645) | 0.3.0 默认不再注入 Current Time 运行时上下文，破坏 0.2.2 既有行为 | ❌ 暂无 |
| 🟠 中 | [#5647](https://github.com/HKUDS/nanobot/issues/5647) | 当前端 envelope 缺少 webui 标记时，session 标题不会被生成 | ✅ [#5648](https://github.com/HKUDS/nanobot/pull/5648) 待合并 |
| 🟢 低 | [#5512](https://github.com/HKUDS/nanobot/issues/5512) | Gateway 重启后 WebUI 假死 | ✅ [#5514](https://github.com/HKUDS/nanobot/pull/5514) 已关闭 |

另需关注的回归风险：
- **PR #5446**（[链接](https://github.com/HKUDS/nanobot/pull/5446)）标记为 `conflict`，将 Codex OAuth token 迁移到 Nanobot 数据目录，存在合并冲突需维护者介入。
- **PR #5504**（[链接](https://github.com/HKUDS/nanobot/pull/5504)）实现模型重试倒计时 UI（任务 NAN-34），尚未合并。

---

## 6. 功能请求与路线图信号

下表归纳今日提交的可纳入下一版本的功能/增强：

| PR | 主题 | 关键信号 |
|---|---|---|
| [#5620](https://github.com/HKUDS/nanobot/pull/5620) | cron 投递目标可配置 + 批量归档 | 已含工具与 WebUI 双重管理面，路径完整 |
| [#5649](https://github.com/HKUDS/nanobot/pull/5649) | WebUI 可视化 per-request context 复用 | 与 token 用量展示合并为 popover，跨刷新保留历史 |
| [#5640](https://github.com/HKUDS/nanobot/pull/5640) | 移动端键盘：Enter 换行、send 按钮发送 | 与 #5641 共同构成 iOS PWA 体验闭环 |
| [#5641](https://github.com/HKUDS/nanobot/pull/5641) | iOS PWA 单击响应、状态栏、键盘占位 | 同上 |
| [#5639](https://github.com/HKUDS/nanobot/pull/5639) | session 标签居中、TUI 流式与配对提示稳定化 | OpenTUI 0.5.3 → 0.5.10 升级 |

**路线图判断**：iOS PWA（#5640 + #5641）与 WebUI 上下文可视化（#5649）两个方向都已具备合并条件，很可能进入下一 release；cron 投递与归档（#5620）跨度较大，需要维护者评审。

---

## 7. 用户反馈摘要

从开放 Issue 评论中可提炼的痛点：

- **国际化脆弱性**（#5644）：`loadChannelLocale` 在 `async work` 期间持有的 `Map` 引用可能在并发加载时被覆盖，说明用户对 WebUI 多语种稳定性的关注集中在并发边界。
- **断连后行为不可预期**（#5512，已修）：用户希望"Gateway 重启后能自动恢复，而不是卡住等待"——后端其实已 idle，只是前端没收到终止事件，**用户感知到的可用性 ≠ 实际可用性**，是常见但重要的体验盲区。
- **跨版本行为不一致**（#5645）：从 0.2.2 升级到 0.3.0 后，时区相关的运行时上下文"消失"且无 changelog 提示，**反映出对 breaking change 缺乏明确告知**的痛点。
- **WebUI 标题生成缺陷**（#5647）：在 `unifiedSession` 模式下，标题投影到共享 session 而不是 per-chat session，**多端使用同一 gateway 的用户最容易遇到**。

---

## 8. 待处理积压

按"已开放天数 × 影响"提醒维护者关注：

| 类型 | 编号 | 标题 | 开放天数（截至 2026-09-04） | 备注 |
|---|---|---|---|---|
| PR | [#5446](https://github.com/HKUDS/nanobot/pull/5446) | fix(codex): persist OAuth tokens in Nanobot data dir | 16 | 标记 `conflict`，需解决冲突后合并 |
| PR | [#5620](https://github.com/HKUDS/nanobot/pull/5620) | feat(cron): configurable delivery + batch archive | 3 | 跨度大、建议维护者立项 |
| PR | [#5504](https://github.com/HKUDS/nanobot/pull/5504) | fix(ui): surface model retry status (NAN-34) | 11 | 体验向，缺一次审 |
| Issue | [#5644](https://github.com/HKUDS/nanobot/issues/5644) | locale registry 并发丢 locale | 1 | 高严重度，**建议优先修复** |
| Issue | [#5645](https://github.com/HKUDS/nanobot/issues/5645) | 0.3.0 缺 Current Time 运行时上下文 | 1 | 涉及默认行为，建议作为 0.3.x 补丁 |

---

**总体健康度评估**：🟢 **健康**。合并/关闭比例（13/25 = 52%）与新开 Issue 数量（3）匹配良好；无版本发布但累计修补密集；社区信号清晰集中于"WebUI 边界态稳定"与"多通道鲁棒性"，与项目当前重心一致。建议维护者重点关注 **PR #5446 合并冲突**与 **Issue #5644 修复**两项。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报

**报告日期：2026-09-04**

---

## 1. 今日速览

Zeroclaw 今日呈现"高吞吐、低合并"的状态：过去 24 小时内共有 **50 个 PR 处于待合并状态**、**1 个新 Issue 打开**，但合并/关闭数为 0，新版本发布为 0。PR 集中度较高，**JordanTheJet 一人贡献了约半数**（涉及 cron 重构、ADR 文档、bootstrap、Web 上传、dist 注册表等多个领域），反映出项目当前正处于密集的架构重构与模块化解耦阶段。整体活跃度处于高位，但评审与合并通道明显承压，建议维护者尽快对高风险 XL 级 PR 给出评审反馈。

---

## 2. 版本发布

**今日无新版本发布。**

---

## 3. 项目进展

今日**无 PR 合并或关闭**，因此"项目进展"主要以"高价值待合并 PR"形式呈现，这些 PR 一旦合并将代表 Zeroclaw 的下一波重要能力变化：

### 🏗️ 架构重构类（XL 级，影响范围大）

- **#10557** [refactor(cron)] 由 @JordanTheJet 提交，将 cron 从临时持有 crate 抽离到独立 `zeroclaw-cron`，并落地前置条件门控。涉及 **11,386 行代码** `git mv` 移动，是今日规模最大的架构变更。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10557

- **#10584** [feat(zerocode)] 为 zerocode 持久化 Todo 追踪器的关闭状态，跨 Chat/Code 面板与重启场景生效。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10584

- **#10595** [fix(zerocode)] 为长时间思考输出缓存包装行（stacked on #9317）。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10595

- **#10596** [feat(runtime)] 为持久化 ACP transcript 增加有界游标分页，避免会话全量物化。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10596

### 🔐 安全与可靠性类（高风险领域）

- **#10563** [feat(runtime)] 重新采样并标记那些在 prose 中声称执行了动作但未发出工具调用的回复（对抗"幻觉执行"）。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10563

- **#10583** [feat(gateway)] 允许 `/api/upload` 接受任意文件，并以与 RPC 对齐的文档标记处理（stacked on #10544，高风险）。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10583

- **#10602** [fix(providers)] 对被分类为可重放但内容为空的流允许一次非流式恢复请求（对抗 provider 静默丢消息）。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10602

- **#10600** [fix(channels)] 停止对"实际未投递"的外发消息上报成功（修复误报告警问题）。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10600

### 📦 分发与引导

- **#10590** [feat(dist)] 新增 `crates/zeroclaw-dist` 作为平台/目标三元组/资产命名的规范注册表。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10590

- **#10591** [feat(bootstrap)] 新增 MCP 启动器（zeroclaw-bootstrap）及其跨平台分发（依赖 #10590，stacked PR）。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10591

### 🧩 小幅修复与增强

- **#10567** [feat(memory)] 在记忆上下文渲染时为召回条目打上召回日期。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10567

- **#10578** [feat(web)] 为 Web 组合器新增 `/upload` 斜杠命令以打开图片选择器。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10578

- **#10589** [feat(config)] 将 `multimodal.max_image_size_mb` 默认值从 5 MiB 调整为 20 MiB 上限。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10589

---

## 4. 社区热点

由于今日所有 PR/Issue 的评论数与点赞数均较少（Issue #10609 仅 1 条评论、0 点赞，PR 列表中评论数普遍为 undefined），社区**互动深度有限**。热度主要由提交量驱动：

- **JordanTheJet** 是今日最活跃贡献者，10+ 个 PR 涉及 cron 重构、ADR、Web 上传、dist 分发、provider 修复等。
- **Audacity88** 提交了 4 个 XL 级 PR（Todo 持久化、长思考缓存、ACP 分页、delegation 策略、provider 重试），承担了 zerocode 与 runtime 的多个关键修复。
- **wromansky** 关注记忆上下文与"未凭证动作"的对抗检测（#10563、#10567、#10597）。

> 🔎 观察：所有 PR 均为 0 点赞/0 评论，说明新提交的 PR **尚未进入社区评审阶段**，建议关注者尽早介入。

---

## 5. Bug 与稳定性

### 🔴 S1 严重 - 工作流阻塞

- **#10609** [Bug] zerocode 忽略启动目录，强制使用 agent workspace 作为 cwd  
  作者：@singlerider | 状态：OPEN | 评论：1  
  **影响**：本地启动的 zerocode 会话不遵守启动路径，每次都进入 `<install>/agents/<alias>/workspace/`，影响用户对工作目录的预期。  
  修复 PR：✅ **#10565**（由 @tidux 提交，pin 本地 Code 会话到进程 cwd）  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/10609  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10565

### 🟠 中等风险 Bug

| PR | 描述 | 链接 |
|---|---|---|
| **#10582** | 附件 IMAGE 标记应由 provider 可加载契约而非 MIME/扩展名猜测定 | https://github.com/zeroclaw-labs/zeroclaw/pull/10582 |
| **#10599** | `skip_missed_run` 的循环分支不写状态，导致 cron 静默失败不可见 | https://github.com/zeroclaw-labs/zeroclaw/pull/10599 |
| **#10600** | 两条独立路径对"未投递"消息误报成功 | https://github.com/zeroclaw-labs/zeroclaw/pull/10600 |
| **#10602** | provider 返回可重放但为空的流时无重试机制 | https://github.com/zeroclaw-labs/zeroclaw/pull/10602 |
| **#10565** | zerocode Code 会话未固定到进程 cwd（同 #10609 关联） | https://github.com/zeroclaw-labs/zeroclaw/pull/10565 |

### 🟢 隐含的"行为正确性"修复

- **#10601** [fix(runtime)] 让有界 delegate 目标真正遵循其自身 `delegation_policy`（之前 `delegate` 工具被无条件剥离）。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10601

- **#10597** [feat(runtime)] 记录 provider 上报的 context 用量与 budget 裁剪，便于事后诊断"上下文爆炸"。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10597

---

## 6. 功能请求与路线图信号

从今日 PR 主题来看，下一版本的路线图信号清晰：

1. **多通道与多模态深化**  
   - Web 端 `/upload` 斜杠命令（#10578）  
   - `/api/upload` 通用文件上传 + RPC 文档标记对齐（#10583）  
   - 默认图片上限提升至 20 MiB（#10589）  
   - Twitch 频道设置文档（#10581）  
   👉 表明 Zeroclaw 正从"CLI 工具"向"统一对话前端 + 渠道网关"演进。

2. **可观测性与可调试性**  
   - memory 召回日期戳（#10567）  
   - context budget 上报日志（#10597）  
   - cron 静默失败可见化（#10599）  
   - channel 投递真伪区分（#10600）  
   👉 多个 PR 都聚焦于"系统对自身状态的可解释性"，这通常是商业化前的关键成熟度信号。

3. **架构分箱（Modularization）**  
   - `zeroclaw-cron` 抽离（#10557）  
   - `zeroclaw-dist` 注册表（#10590）  
   - `zeroclaw-bootstrap` MCP 启动器（#10591）  
   - 持有 crate 例外流程 ADR（#10562）  
   👉 表明团队正系统性地将单体 crate 拆分为可独立发布/复用的工作区。

4. **反幻觉/可靠性基线**  
   - tool_receipts 之外的"未凭证动作"对抗（#10563）  
   - provider 重试协议（#10602）  
   👉 对模型/上游的不可靠行为建立"二阶防御"层。

---

## 7. 用户反馈摘要

由于 Issue 仅 1 条且评论有限，用户层面的直接痛点尚不丰富，但可以从该 Issue 中提炼：

- **@singlerider (Issue #10609)** 痛点：本地启动 `zerocode` 时被强制切换到 agent workspace，破坏了"在哪个目录启动就在哪个目录工作"的直觉。该问题已被识别为 **S1（工作流阻塞）**，且对应修复 #10565 已在排队。  
  🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/10609

> ⚠️ 提示：所有 PR 评论区均未显示任何用户反馈（评论数为 undefined / 0 点赞），说明**新功能尚处于内部提交阶段，未触达用户试用**。建议维护者在 #10589、#10578、#10565 等面向用户的小幅改进合并后，主动邀请用户复测以收集反馈。

---

## 8. 待处理积压

虽然今日没有"长期挂起"的 Issue（仅 1 条新开），但以下 PR 存在**合并/评审依赖关系**且包含 XL 级变更，**维护者应优先关注**：

| PR | 阻塞/依赖 | 建议处理优先级 |
|---|---|---|
| **#10590** | 是 #10591 的前置 | 🟥 P0（阻塞下游） |
| **#10591** | stacked on #10590 | 🟥 P0（需 #10590 先行） |
| **#10583** | stacked on #10544 | 🟧 P1（高风险 M 级） |
| **#10595** | stacked on #9317 | 🟧 P1（XL 级） |
| **#10557** | 与 #10546 相关，重构规模 11k+ 行 | 🟧 P1（XL 级） |
| **#10562** | ADR 文档，影响后续所有持有 crate 例外流程 | 🟨 P2（规范类） |
| **#10596** | ACP transcript 分页，XL 级 | 🟨 P2 |
| **#10584** | zerocode Todo 持久化，XL 级 | 🟨 P2 |
| **#10609 → #10565** | Bug + 修复配对已就位 | 🟥 P0（建议快速合并） |

**总览建议**：今日 50 个 PR 全部 OPEN、0 合并，**评审队列首次出现明显堆积**。建议维护者：

1. 优先评审 #10565（轻量 S1 Bug 修复）+ #10589（用户可感知的默认值调整），快速释放合并量；
2. 锁定 #10590 → #10591 的 stacked 链，避免下游 PR 持续累积；
3. 对 #10557 等 XL 级重构要求至少 2 位评审者，并明确合并窗口。

---

*报告生成时间：2026-09-04 | 数据来源：Zeroclaw GitHub 仓库*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

**日期：2026-09-04**
**项目：** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)
**分类：** AI 智能体 / 个人 AI 助手（Go + Web UI）

---

## 1. 今日速览

PicoClaw 今日活跃度偏低，未有新版本发布。社区侧以 **bug 反馈** 和 **依赖升级** 为主旋律：过去 24 小时共有 5 条 Issue 更新、7 条 PR 更新，其中 4 条 PR 为 Dependabot 自动提交的 Go 依赖升级（aws-sdk-go-v2、golang.org/x/term、irc-go、protobuf、larksuite/oapi-sdk-go），仅 1 条为功能性修复（Slack 媒体上传）。1 条 Issue 被关闭（Antigravity 429 错误），其余 4 条仍为 OPEN 状态。整体来看，项目维护节奏平稳但社区响应略显迟缓，多个 Issue 已被标记为 `[stale]`，维护者需关注积压。

---

## 2. 版本发布

⚠️ **本日报周期内无新版本发布。** 上一已知版本为 `0.3.1`（来自 Issue #3281、#3346 报告），距离最新 Issue 反映的修复需求已积累多处 bug 修复 PR（#3340、#3329），建议关注下一次 0.3.2 或 0.4.0 的发布窗口。

---

## 3. 项目进展

今日无功能性 PR 合并，**核心进展集中在"待合并修复"层面**：

- ✅ **#3329 [已关闭]** — [fix(line): warn on inert webhook_host / webhook_port instead of seeding them](https://github.com/sipeed/picoclaw/pull/3329)
  - 修复了 LINE channel 配置项 `webhook_host` / `webhook_port` 被声明、默认绑定但实际未被读取的"幽灵配置"问题。改为在配置时直接告警，避免误导用户。属于**配置卫生**类改进。
- 🟡 **#3340 [待合并]** — [fix(slack): set FileSize on media upload params](https://github.com/sipeed/picoclaw/pull/3340)
  - 修复 Slack `SendMedia` 未设置 `FileSize` 字段导致所有图片上传均失败的 bug。属于**通道完整性**修复，关联 Issue #3338。若合并将解决 Slack 集成长期不可用的核心问题。

**整体评估：** 项目在"代码质量"和"依赖维护"层面持续推进，但缺乏面向用户的功能交付，**进展感较弱**。

---

## 4. 社区热点

**最活跃议题（按评论数排序）：**

| 排名 | 编号 | 标题 | 评论数 | 👍 |
|------|------|------|--------|------|
| 1 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI chat input is very laggy when history has a little bit long | 9 | 2 |
| 2 | [#3338](https://github.com/sipeed/picoclaw/issues/3338) | Slack does not attach image media content | 3 | 0 |
| 3 | [#3339](https://github.com/sipeed/picoclaw/issues/3339) | Antigravity generation returns generic 429 | 3 | 0 |
| 4 | [#3349](https://github.com/sipeed/picoclaw/issues/3349) | QQ 频道无法正常使用 | 3 | 0 |

**热点诉求分析：**

- **#3281** 是当前社区**反馈最集中**的问题，反映 Web UI 在聊天历史变长后输入框出现明显卡顿。9 条评论 + 2 个点赞说明该问题在 v0.3.1 用户中具有普遍性，**可能涉及前端性能瓶颈**（如长列表渲染、状态管理），应优先排查。
- **#3338 / #3340** 构成"Issue + Fix PR"的良好闭环，但 PR 至今未合并，反映出**维护者响应速度**是当前瓶颈。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重等级 | 编号 | 标题 | 影响范围 | 已有 Fix PR |
|---------|------|------|---------|------------|
| 🔴 高 | [#3338](https://github.com/sipeed/picoclaw/issues/3338) | Slack does not attach image media content | Slack 通道图片上传完全失效 | ✅ [#3340](https://github.com/sipeed/picoclaw/pull/3340) 待合并 |
| 🔴 高 | [#3349](https://github.com/sipeed/picoclaw/issues/3349) | QQ 频道无法正常使用 | QQ 通道鉴权失败（Docker + Linux x86 均复现） | ❌ |
| 🟠 中 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI chat input laggy | 长会话场景下前端不可用 | ❌ |
| 🟠 中 | [#3346](https://github.com/sipeed/picoclaw/issues/3346) | RKLLM reply abnormal | ARM 开发板上 Qwen3.5-0.8B_w4 模型响应异常 | ❌ |
| 🟢 低（已关闭） | [#3339](https://github.com/sipeed/picoclaw/issues/3339) | Antigravity 429 error | Google Antigravity OAuth 鉴权 OK 但生成请求 429 | N/A（已关闭） |

**稳定性评估：** 通道层（Slack/QQ）出现**双高严重 bug**，且 QQ 通道为中文用户核心场景，影响面较大。Web UI 性能问题影响日常使用体验，需重点关注。

---

## 6. 功能请求与路线图信号

本日报周期内**未发现明确的新功能请求 Issue**。但从现有议题中可提取以下**隐含的路线图信号**：

- **Web UI 性能优化** — #3281 的高互动表明前端性能优化是用户的核心痛点，可能驱动下一版本的 UI 重构或长列表虚拟化改造。
- **QQ 通道鉴权重构** — #3349 反映的 `Authorization` 头格式错误（err_code 40011005）意味着 QQ 机器人 API 适配可能已过期，需要追新。
- **多通道媒体支持** — Slack、未来的其他通道都需要可靠的媒体上传能力，#3340 的修复模式可作为模板。

---

## 7. 用户反馈摘要

提炼自 Issue 评论与摘要中的真实用户声音：

- 😡 **Web UI 用户（#3281）：** 聊天历史稍长即出现严重输入卡顿，**严重影响日常使用**，"keep try to input something, it will be very laggy"——反映前端在长会话下的性能缺陷。
- 😡 **Slack 集成用户（#3338）：** 媒体上传完全失败，"Slack media uploads always fail with `file.upload.v2: file size cannot be 0`"——属于**SDK 集成 bug**，给用户造成"功能存在但完全不可用"的困惑。
- 😟 **QQ 机器人用户（#3349）：** Docker 与 Linux x86 双环境均无法连接，错误码 `40011005` 提示鉴权协议变更——用户**跨平台验证**后仍无法解决，期待官方修复。
- 😟 **边缘部署用户（#3346）：** 在 ARM 开发板上跑 RKLLM + Qwen3.5-0.8B_w4 出现异常回复，附截图说明——体现 PicoClaw 在**边缘/嵌入式**场景的部署需求与稳定性挑战。
- 😐 **Google Antigravity 用户（#3339）：** OAuth 通过但生成 429 报错，问题已关闭——可能为配额或服务端问题，不属于产品 bug。

**总体满意度：** 用户对**功能广度**认可，但**核心体验**（UI 性能、通道稳定性）存在明显短板。

---

## 8. 待处理积压

以下 Issue/PR 已被系统标记为 `[stale]`，且**距创建已超 2 周未获实质性响应**，建议维护者优先处理：

| 编号 | 类型 | 标题 | 停滞时长 | 紧迫性 |
|------|------|------|---------|--------|
| [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Issue | Web UI chat input laggy | ~45 天 | 🔴 高（高互动 + 影响面广） |
| [#3338](https://github.com/sipeed/picoclaw/issues/3338) | Issue | Slack image upload fails | ~18 天 | 🔴 高（Slack 通道不可用） |
| [#3340](https://github.com/sipeed/picoclaw/pull/3340) | PR | fix(slack): set FileSize | ~18 天 | 🔴 高（修复已就绪，仅待合并） |
| [#3346](https://github.com/sipeed/picoclaw/issues/3346) | Issue | RKLLM reply abnormal | ~8 天 | 🟠 中（边缘场景） |

**维护者建议：**
1. 优先合并 #3340，闭环 Slack 媒体问题。
2. 对 #3281 给出官方回复或临时缓解方案（如清理历史长度上限）。
3. 排查 #3349 QQ 鉴权协议变更，准备适配补丁。
4. 评估是否发布 v0.3.2 收拢上述修复。

---

**报告生成时间：** 2026-09-04
**数据来源：** GitHub REST API（Issues & Pull Requests）
**说明：** 本报告基于公开数据自动生成，所有链接均指向 GitHub 原始页面。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报

**日期：2026-09-04**
**数据周期：过去 24 小时**

---

## 1. 今日速览

NanoClaw 过去 24 小时呈现 **中高强度维护活动**：共记录 5 条 Issue 更新与 23 条 PR 更新，活跃贡献者至少 5 位（@dwalthour、@DawoudIO、@glifocat、@mmv、@davekim917、@zvi-fried、@jorgenclaw 等）。PR 端以**待合并 PR 占绝对主导**（20/23），且多个 PR 横跨核心、agent-runner、providers、channels、containers 等多个领域——表明项目正处于一次有规模的**多线并行的架构重构阶段**（尤其是 providers 子系统的契约化重构）。未发布新版本，issue 中已关闭的仅 1 条。

**整体健康度评估：良好**，但 PR 待合并积压较厚，建议维护者集中评审。

---

## 2. 版本发布

**今日无新版本发布。** 最近一次 release 数据缺失，待补充。

---

## 3. 项目进展

今日合并/关闭的重要 PR 共 3 条：

### ✅ 已关闭 PR

| PR | 标题 | 影响领域 |
|---|---|---|
| [#3461](https://github.com/nanocoai/nanoclaw/pull/3461) | chore(deps): bump all @chat-adapter/* + chat 4.29.0 → 4.38.1（@DawoudIO） | 依赖更新 / channels |
| [#3126](https://github.com/nanocoai/nanoclaw/pull/3126) | fix(agent-runner): never deliver silence, never deliver `<internal>` thinking（@glifocat） | agent-runner / 核心行为 |
| #3426（Issue，伴随相关修复关闭） | send_card 文档与桥接实际行为不一致（@glifocat） | tools / 文档 |

**推进意义：**
- **PR #3126** 是面向用户感知层面的修复：阻止 agent 在一轮中投递"静默"或 `<internal>` 思考内容，**直接改善了终端用户体验**与平台信任度。
- **PR #3461** 将所有 chat-adapter 同步升级 9 个 minor 版本（4.29.0 → 4.38.1），显著缩短了与 trunk 的版本漂移，**降低后续维护与安全修复延迟风险**。
- **Issue #3426** 的关闭意味着 send_card 的 `actions`（按钮）能力与文档口径已对齐，**消除了 agent 把问题归咎于平台的误判路径**。

**项目整体推进度量：** 上述修复在 UX 一致性、依赖卫生、核心 agent 行为三方面均有实质推进，属于"日常稳健型"前进，非大型特性里程碑。

---

## 4. 社区热点

虽然各 PR/Issue 评论数普遍偏低（多数 0–1 条），但**互动最显眼的入口仍是技术深度较强的扩展点讨论**：

### 🔥 讨论 / 关注度较高的入口

- **Issue [#3704](https://github.com/nanocoai/nanoclaw/issues/3704)** — @davekim917 提议为 `SqliteAgentMailbox` 暴露一个 **protected session-assembly hook** 以便 fork 扩展。
  - 背后诉求：当前 `src/mailbox/compose.ts` 是**单一插槽**，fork 想承载自有表/列/SQL 触发器时缺乏官方接缝。这是一个**架构可扩展性**诉求，与 [#3707](https://github.com/nanocoai/nanoclaw/pull/3707)（PR：registerAdmissionGate poll-loop seam）形成"扩展点对"——维护者正在系统性补齐子类化能力。

- **Issue [#3706](https://github.com/nanocoai/nanoclaw/issues/3706)** — `ncl groups config add-mount --container <path>` 接受绝对路径却产生 **双层嵌套的损坏路径**，且 `--help` 未声明路径必须相对。
  - 真实用户痛点：用户按"自然习惯"输入绝对路径就会得到一个静默损坏的配置——典型的"无声失败"，对运维极不友好。

- **PR [#3440](https://github.com/nanocoai/nanoclaw/pull/3440)** — docker-driver 一揽子修复（SELinux 阻断挂载、组可写 rw、NUL 字节）。
  - 多区域标签（containers / ncl-cli / providers / security），是**典型的"小而关键"的稳定性 PR**，值得优先评审。

---

## 5. Bug 与稳定性

按严重程度排序：

### 🔴 严重（影响数据/正确性）

1. **[Issue #3705](https://github.com/nanocoai/nanoclaw/issues/3705)** — `ncl tasks update --recurrence <new-cron>` 不会重算 `process_after`。
   - 影响：任务从 weekly 切到 daily 后仍按原 weekly 时间触发，**调度语义错误**。
   - 当前 fix PR：**无**。

2. **[Issue #3709](https://github.com/nanocoai/nanoclaw/issues/3709)** — Mailbox SQLite 测试使用**固定 /tmp 路径**，并发 vitest run 会互相删除数据库。
   - 影响：多 worktree / CI 并行时**测试结果不稳定甚至数据丢失**。
   - 当前 fix PR：**无**。

### 🟠 中等（功能/路径损坏）

3. **[Issue #3706](https://github.com/nanocoai/nanoclaw/issues/3706)** — `add-mount --container <abs>` 静默产生嵌套损坏路径。
   - 影响：容器挂载配置出错但**无报错**，运维难以察觉。
   - 当前 fix PR：**无**。

### 🟡 一般（文档/可观测性）

4. **Issue #3426（已关闭）** — `send_card` 文档承诺 callback 按钮，桥接却丢弃无 `url` 的 action。
   - 影响：agent 误将问题归咎于平台。
   - 当前状态：**已关闭**，伴随 PR 修复落地。

5. **PR [#3708](https://github.com/nanocoai/nanoclaw/pull/3708)** — `getOutboundDb()` 中 `busy_timeout` 必须在 `journal_mode` 之前设置。
   - 影响：顺序错误会导致锁竞争场景下 busy handler 不生效，**间接的死锁/超时风险**。该 PR 已是修复，待合并。

6. **PR [#3712](https://github.com/nanocoai/nanoclaw/pull/3712)** / **[#3711](https://github.com/nanocoai/nanoclaw/pull/3711)** — WhatsApp 适配器未读取文档 caption + 无差别下载媒体；router 未延迟昂贵的内容解析。
   - 影响：媒体/带宽浪费，且文档 caption 丢失。
   - 状态：#3712 依赖 #3711，**整条链路待合并**。

7. **PR [#3710](https://github.com/nanocoai/nanoclaw/pull/3710)** — 一次完整 `pnpm test` 留下 **~355 个临时目录**，长期不清理。
   - 影响：tmpfs 环境下磁盘压力累积。
   - 状态：修复 PR 已就绪。

---

## 6. 功能请求与路线图信号

### 已被实现或正在推进的需求

| 需求 | 关联 PR | 状态 |
|---|---|---|
| Cursor 作为 provider | [#3355](https://github.com/nanocoai/nanoclaw/pull/3355)（install skill）+ [#3356](https://github.com/nanocoai/nanoclaw/pull/3356)（payload） | 待合并 |
| `speed` 属性作为核心可配置项（与 `model`、`effort` 并列） | [#3592](https://github.com/nanocoai/nanoclaw/pull/3592) | 待合并 |
| Per-agent-group delivery mode 记录 | [#3713](https://github.com/nanocoai/nanoclaw/pull/3713) | 待合并（仅列与管道，未读取） |
| 容器侧语音转写 V2（sovereign-by-default） | [#2003](https://github.com/nanocoai/nanoclaw/pull/2003) | 待合并（已超 4 个月） |
| 扩展点：mailbox 子类化 hook | [#3704](https://github.com/nanocoai/nanoclaw/issues/3704) + [#3707](https://github.com/nanocoai/nanoclaw/pull/3707) | 提案/部分实现 |

### 路线图信号解读

- **provider 子系统的契约化重构**是当前最显著的方向：#3581、#3584、#3585、#3586、#3588、#3591 一组 PR（@zvi-fried）正在把 provider 从"散落的 flag + Claude 专属辅助"重构为"声明式 + 注册校验的契约"。这是**一个明确的、跨多 PR 的架构演进**，下一版本很可能以"providers contract v1"为里程碑。
- **可扩展性扩展点**也在系统化补齐：admission gate（#3707）、mailbox session hook（#3704）。维护者显然在主动降低 fork 与下游定制成本。
- **测试卫生与运行时安全**：#3708、#3710、#3711 是面向 CI 稳定性与运行时锁竞争的连续修复。

---

## 7. 用户反馈摘要

由于多数 Issue 评论数为 0–1 条，社区文本反馈较为稀薄，但仍可从 issue 摘要中提炼出几条**真实痛点**：

1. **"静默失败比报错更糟糕"** — Issue #3706：用户按直觉输入绝对路径，得到的是损坏配置而非错误。这是 CLI UX 的反复出现的诉求：**输入校验应当前置并明确报错**。
2. **"调度语义必须符合直觉"** — Issue #3705：用户期望"改 cron 就应该按新 cron 重算下次触发"，而当前实现保留了旧 schedule。属于**期望行为与文档/语义对齐**的诉求。
3. **"fork 应当有官方扩展点"** — Issue #3704：维护者本人也是 fork 维护者，呼吁核心提供 protected hook 而非依赖私有插槽。反映了**生态对核心扩展 API 健全度的需求**。
4. **"测试不要互相打架"** — Issue #3709：开发者在意 CI 可重复性，**并发安全是基础设施诉求**。
5. **"别让 agent 把锅甩给平台"** — Issue #3426：send_card 文档误导导致 agent 误报平台缺陷，反映**文档/能力一致性**对代理可靠性至关重要。

无明显满意/赞扬类反馈被记录——这与项目以工程导向为主、社区偏静默的特征一致。

---

## 8. 待处理积压（提醒维护者关注）

按停留时长与重要性排序：

| 排名 | 条目 | 类型 | 停留时间 | 建议优先级 |
|---|---|---|---|---|
| 1 | **[PR #2003](https://github.com/nanocoai/nanoclaw/pull/2003)** — voice transcription V2 | Feature（容器侧转写） | **~4.3 个月**（2026-04-25 起） | 🔴 高 |
| 2 | **[PR #3440](https://github.com/nanocoai/nanoclaw/pull/3440)** — docker-driver 一揽子修复（SELinux / NUL / group-writable） | Fix（多区域、安全） | ~13 天 | 🔴 高 |
| 3 | **[PR #3462](https://github.com/nanocoai/nanoclaw/pull/3462)** — send_message 双投递防护 | Fix | ~12 天 | 🟠 中 |
| 4 | **[Issue #3705](https://github.com/nanocoai/nanoclaw/issues/3705)** — recurrence 更新不重算 process_after | Bug（调度正确性） | 新开，建议尽快 | 🟠 中 |
| 5 | **[Issue #3709](https://github.com/nanocoai/nanoclaw/issues/3709)** — Mailbox 测试 /tmp 固定路径并发冲突 | Bug（CI） | 新开 | 🟠 中 |
| 6 | **[Issue #3706](https://github.com/nanocoai/nanoclaw/issues/3706)** — add-mount 绝对路径静默损坏 | Bug（CLI UX） | 新开 | 🟡 中 |
| 7 | **[Issue #3704](https://github.com/nanocoai/nanoclaw/issues/3704)** — SqliteAgentMailbox protected hook | Feature/扩展点 | 新开 | 🟡 中 |

### 维护者建议

- **#2003 停留超 4 个月**，建议要么合并要么给出明确延期/拆分计划，避免长期悬挂。
- **providers 契约化重构组（#3581/#3584/#3585/#3586/#3588/#3591）** 已形成明显 PR 群，建议尽快安排集中评审，决定是否整体纳入下一个 release。
- **#3440（docker-driver 修复）** 覆盖安全/可观测性，应当进入快速通道。
- **三条新 Issue（#3705/#3706/#3709）** 均为可量化修复，建议在下个小版本（patch release）中处理。

---

*日报基于公开 GitHub 数据自动整理生成，所有链接指向 github.com/qwibitai/nanoclaw 对应页面。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报

**日期：2026-09-04**

---

## 1. 今日速览

IronClaw 今日整体保持中高度活跃。过去 24 小时内共有 7 条 Issue 更新、17 条 PR 更新，其中 PR 已关闭 9 条，合并与流转节奏稳定。核心贡献者 @henrypark133 仍是主要推动力，独力主导了循环性能、上下文预算、Subagent 流转与缓存门控等多条 XL 级 PR；同时 WebUI 类型化整改系列（@italic-jinxin）已合龙落地。值得关注的是 9 月 3 日起 `main` 分支因 API 边界用例出现红屏，修复 PR 今日已合并。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日合龙/关闭的 9 条 PR 中，重要进展如下：

- **[#8039](https://github.com/nearai/ironclaw/pull/8039)** *refactor(webui): type production components and hooks*（XL）—— 移除 64 个生产组件/hooks 中的 `@ts-nocheck`，补齐 React Query、outlet-context、DOM、ref、认证载荷等显式类型，显著抬升前端类型安全基线。

- **[#8038](https://github.com/nearai/ironclaw/pull/8038)** *refactor(webui): type and validate frontend API boundaries*（XL）—— 在设备配对、通知设置、项目、工作区等接口层引入运行时解码器与类型化对象边界，从源头拦截缺 ID 请求。

- **[#8040](https://github.com/nearai/ironclaw/pull/8040)** *test(webui): type frontend test infrastructure*（M）—— 一次性清除测试侧 94 处 `@ts-nocheck`，统一 Storage/VM/JSX 渲染的类型助手。

- **[#8037](https://github.com/nearai/ironclaw/pull/8037)** *chore(webui): ratchet TypeScript suppressions*（M）—— 落盘遗留抑制基线并新增 ratchet 机制，防止新增 `@ts-nocheck` / `@ts-ignore`。

- **[#7984](https://github.com/nearai/ironclaw/pull/7984)** *fix(tools): size tool_search replies to the first-look envelope*（XL）—— `tool_search` 响应体积对齐模型首视信封，实测将 16,066 B 压缩到 857 B，避免大结果被压成 `omitted` 单标记。

- **[#8043](https://github.com/nearai/ironclaw/pull/8043)** *perf(loop-host): coalesce streamed text updates*（L）—— 流式文本增量去重，O(N·k) → O(N) 复杂度，1,000 个 16 KiB 增量场景的实测开销已被回归用例锁定。

- **[#8046](https://github.com/nearai/ironclaw/pull/8046)** *feat(subagent): a child's approval/auth gate reaches the owner's inbox (R3 slice 3a)*（XL）—— 子代理在审批/凭据闸口阻塞时，事件首次能可靠到达所有者收件箱，堵上一个长期沉默故障点。

- **[#8055](https://github.com/nearai/ironclaw/pull/8055)** *fix(webui): follow authorizeTraceHold to trace-api.ts*（XS）—— 修复 #8038 引入的红屏，解除 `cargo test -p ironclaw_webui` 在 `main` 上的 panic。

- **[#8058](https://github.com/nearai/ironclaw/pull/8058)** *test(webui): use the live extension id in the notification-setup boundary test*（XS）—— 同步架构门规 `web-push` → `web-app` 改名，解除 `Tests (Reborn)` 红屏。

**整体判断**：前端类型化收尾工程基本闭环，循环与工具侧的性能/正确性改进同步推进，子代理可观测性迈出 R3 阶段第一步，项目健康度向上。

---

## 4. 社区热点

- **[#7903](https://github.com/nearai/ironclaw/issues/7903)** *Decision spike: persistent per-user sandboxed executor behind the trusted host kernel* — 标记为 `risk: high`，定调 Reborn 架构的关键决策：是否将完整智能体循环迁入持久化 per-user 沙箱，置于受信 host 内核之后。已有 2 条评论，是过去一周最重的设计讨论帖。

- **[#8044](https://github.com/nearai/ironclaw/pull/8044)** *fix(llm): cache-gate new Claude families by denylist; send prompt_cache_key on OpenAI Responses* — 解决新 Claude 家族（`claude-fable-*`、`claude-mythos-*`）在白名单策略下被静默降级到 `CacheRetention::None` 的故障，叠加 OpenAI Responses 缓存键发送，命中面广、关注度高。

- **[#8053](https://github.com/nearai/ironclaw/pull/8053)** *feat(loop): derive the prompt context budget from the model's advertised window* — 改写沿用已久的 128k/20k 硬编码预算，改为按模型声明窗口 90% 派生，紧扣 [#8057](https://github.com/nearai/ironclaw/issues/8057) 的反馈。

- **[#8009](https://github.com/nearai/ironclaw/issues/8009)** *MCP egress errors flatten to "response_error", making discovery failures undiagnosable* — MCP 出站错误被压成单一 token，暴露可观测性盲区。

**诉求洞察**：社区当前最强烈的诉求集中在三方面——架构级信任边界厘清、新模型家族及时获得缓存能力、生产可观测性不要"丢字段"。

---

## 5. Bug 与稳定性

按严重程度排序：

| 等级 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| 高 | [#8038 引入的 `main` 红屏](https://github.com/nearai/ironclaw/pull/8055) | `cargo test -p ironclaw_webui` panic；`Tests (Reborn)` 中 API 边界用例用退役 `web-push` 字面量，违反架构门规 | ✅ 已合 [#8055](https://github.com/nearai/ironclaw/pull/8055) + [#8058](https://github.com/nearai/ironclaw/pull/8058) |
| 高 | [#8059](https://github.com/nearai/ironclaw/pull/8059) *fix(responses): send cancel reason the product surface accepts* | `POST /api/v1/responses/{id}/cancel` 全状态返回 `400 invalid_request`，且运行不中止 | 🟡 PR 待合并（contributor: new） |
| 中 | [#8056](https://github.com/nearai/ironclaw/pull/8056) *fix(host-api): avoid malformed preview range panic* | 嵌入工具结果文本畸形（关闭分隔符先于开启）触发字节切片 panic | 🟡 PR 待合并 |
| 中 | [#8044](https://github.com/nearai/ironclaw/pull/8044) | 新 Claude 家族静默降级至无缓存 | 🟡 PR 待合并 |
| 中 | [#8009](https://github.com/nearai/ironclaw/issues/8009) | MCP 出站错误被压成 `"response_error"`，无字节/原因可查 | 🔴 暂无修复 PR |
| 低 | [#7988](https://github.com/nearai/ironclaw/pull/7988) | 代码库知识图谱刷新 | 🟡 待合并（CI 机器人例行） |

整体看，`main` 红屏已被拆解，剩余 P1 缺陷集中在 cancel 语义与 MCP 错误可观测性。

---

## 6. 功能请求与路线图信号

- **[#7903](https://github.com/nearai/ironclaw/issues/7903) 持久化 per-user 沙箱执行器（风险: high）** — 决策型 spike，决定 Reborn 架构第二阶段走向。已有 PR 配套讨论，节奏上很可能影响下一里程碑的安全模型。

- **[#8057](https://github.com/nearai/ironclaw/issues/8057) Prompt 预算覆盖非对话内容** — 立即有 [#8053](https://github.com/nearai/ironclaw/pull/8053) 跟进，将预算改为按模型声明窗口派生。**高度可能进入下一个稳定版本**。

- **[#8061](https://github.com/nearai/ironclaw/pull/8061) Subagent 并发子任务上限 + 子代理门卡回放校验** — R2 技术债清理 + R3 子代理可观测性第三刀，与 [#8046](https://github.com/nearai/ironclaw/pull/8046) 串联，构成完整 R3 切片。

- **[#8054](https://github.com/nearai/ironclaw/pull/8054) 助手首次接触先做配对检查** — 新贡献者 @thisisjoshford 提交的产品改进，提升 Telegram 等通道的首响体验，符合 Onboarding 体验线。

- **[#8060](https://github.com/nearai/ironclaw/pull/8060) nextest 架构扫描放宽超时** — 直接回应 [#8053](https://github.com/nearai/ironclaw/pull/8053) 出现的 176.8 s 逼近 180 s 超时问题。

---

## 7. 用户反馈摘要

- **配对体验差**（[#8054](https://github.com/nearai/ironclaw/pull/8054)）：未配对用户首次 `/start` 拿到的是冷冰冰的"可用命令"清单，连接提示被推迟到第二条消息。真实痛点：**首屏就要给人"下一步该做什么"的明确信号**。

- **调试黑洞**（[#8009](https://github.com/nearai/ironclaw/issues/8009)）：托管 MCP 发现失败只剩一个 `"response_error"` 字符串，运营侧无法定位是 DNS、TLS 还是上游 5xx。**用户明确要求保留错误码 + 字节计数**。

- **预算超限不可见**（[#8057](https://github.com/nearai/ironclaw/issues/8057)）：身份/SKILL/工具 schema 与对话脚本叠加超预算，请求实际尺寸与循环自我认知不一致。**用户对"循环自我认知与现实一致"有强诉求**。

- **沉默失败**（[#7903](https://github.com/nearai/ironclaw/issues/7903) / [#8046](https://github.com/nearai/ironclaw/pull/8046)）：子代理在审批闸口上挂起时，父代理得不到任何通知，用户对"子任务死了 / 活着 / 卡了"非常敏感。

- **失败分类日常**（[#8052](https://github.com/nearai/ironclaw/issues/8052)）：每日失败分类日报已形成节奏，officeqa 等基准由 deepseek-v4-flash 在 OCR 财政公报上集中暴露模型质量缺陷，社区认可这种透明化做法。

---

## 8. 待处理积压

| 链接 | 标题 | 风险/规模 | 创建-更新间隔 | 备注 |
|---|---|---|---|---|
| [#7903](https://github.com/ironclaw/issues/7903) | Decision spike: persistent per-user sandboxed executor | risk: high | 9 天 | 仅 2 条评论、0 👍，需要核心维护者明确决策 |
| [#8009](https://github.com/nearai/ironclaw/issues/8009) | MCP egress errors flatten to "response_error" | — | 4 天 | 暂无修复 PR，可观测性 P1 |
| [#7988](https://github.com/nearai/ironclaw/pull/7988) | chore(agents): refresh codebase knowledge graph | size: XS | 6 天 | CI 机器人例行 PR，但仍未合龙，建议维护者跟进 |
| [#8054](https://github.com/nearai/ironclaw/pull/8054) | fix(assistant): check pairing before command admission | size: M | 1 天 | 新贡献者首作，建议评审优先以保留贡献者活跃度 |
| [#8056](https://github.com/nearai/ironclaw/pull/8056) / [#8059](https://github.com/nearai/ironclaw/pull/8059) | 取消语义 + 预览切片 panic | size: XS | 1 天 | 均为生产崩溃类，建议当日合龙 |

**提醒**：维护者请优先合龙 [#8056](https://github.com/nearai/ironclaw/pull/8056) 与 [#8059](https://github.com/nearai/ironclaw/pull/8059)（生产崩溃），并对 [#7903](https://github.com/nearai/ironclaw/issues/7903) 给出架构决策信号，避免 spike 议题长期悬置。

---

*数据来源：GitHub API 抓取窗口 2026-09-03 → 2026-09-04。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报

**日期：2026-09-04**
**项目地址**：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. 今日速览

LobsterAI 过去 24 小时仓库活动以 **PR 合入与关闭为主**（15 条 PR 中 10 条已关闭），Issues 侧相对平淡（6 条更新、4 条仍开放）。整体节奏表现为 **2026.8.31 发布窗口的收尾与 2026.9.4 版本的预热**：多个面向桌面端的浏览器、IM 机器人卡片、安装体验改进集中合并。Issues 中以 stale（陈旧）自动提醒为主，真实新问题仅 1 条（#2601 MCP Apps 渲染支持），社区互动量偏低，需要关注积压。

**活跃度评级：中等偏上**（PR 流转活跃，Issues 讨论低迷）。

---

## 2. 版本发布

**无新版本发布。**

不过 [#2600](https://github.com/netease-youdao/LobsterAI/pull/2600) 合并了 `Release: 2026.8.31` 准备分支，内容包括：首次运行引导流程、Library 浏览提速与稳定性、模型生成视频的客户端分享、登录/配额文案优化、Windows 安装器恢复能力增强——预计 2026.8.31 版本即将正式推出。

另据 [#2602](https://github.com/netease-youdao/LobsterAI/pull/2602) 的描述，**2026.9.4 版本将恢复交互式应用内 Agent 浏览器**及其加密凭据、自动填充（审批制）、手动凭据捕获等能力，建议用户留意。

---

## 3. 项目进展（已合并/关闭的重要 PR）

| PR | 标题 | 领域 | 影响 |
|---|---|---|---|
| [#2600](https://github.com/netease-youdao/LobsterAI/pull/2600) | Release: 2026.8.31 | 渲染/文档/主进程/协作/IM/Windows/制品 | 发布主线分支合并 |
| [#2602](https://github.com/netease-youdao/LobsterAI/pull/2602) | feat(browser): 恢复应用内交互浏览器 | 渲染/主进程/OpenClaw/协作/制品 | 恢复浏览器 MCP 桥、加密凭据、Agent 自动填充能力 |
| [#2609](https://github.com/netease-youdao/LobsterAI/pull/2609) | feat(update): 安装与退出前确认 | 渲染/主进程 | Agent 任务/定时任务运行中或下载中途不再静默打断用户 |
| [#2607](https://github.com/netease-youdao/LobsterAI/pull/2607) | fix(openclaw): 停止 dsh 过度膨胀插件包 | 构建/OpenClaw | 移除 dsh 作为 MCP 服务器注册，缩减打包体积 |
| [#2608](https://github.com/netease-youdao/LobsterAI/pull/2608) | fix: dsh drop mcp delegation | 文档/主进程 | 与 #2607 配套，清理 dsh 委派逻辑 |
| [#2605](https://github.com/netease-youdao/LobsterAI/pull/2605) | fix(installer): Windows 安装器声明 DPI-aware | Windows | 修复安装器图标模糊 |
| [#2606](https://github.com/netease-youdao/LobsterAI/pull/2606) | fix(installer): 启动 helper 进程时不弹出控制台窗口 | 文档/Windows | 改善 Windows 安装体验 |
| [#2604](https://github.com/netease-youdao/LobsterAI/pull/2604) | fix(cowork): 语音输入按钮配额耗尽时置灰 | 渲染/协作 | 视觉状态稳定，按钮仍可点击触发配额提示 |
| [#2603](https://github.com/netease-youdao/LobsterAI/pull/2603) | fix(i18n): 精修语音配额耗尽文案 | 渲染 | 中英文案统一、时长格式紧凑 |
| [#2599](https://github.com/netease-youdao/LobsterAI/pull/2599) | fix(im): 优化机器人卡片布局 | 渲染/IM | 多实例卡片上限 2 列响应式，空添加卡片紧凑居中 |

**整体评价**：本日推进集中在 **Windows 安装体验打磨、桌面端浏览器能力恢复、IM 卡片 UI 改进、国际化文案精修** 四个方向，对终端用户透明度、稳定性与视觉一致性均有正向提升。

---

## 4. 社区热点

- 最高互动 Issue：[#1556](https://github.com/netease-youdao/LobsterAI/issues/1556)（3 条评论）——IM 机器人配置指南 404，已被标记 stale 并关闭，**反映出文档同步与产品功能跟进存在脱节**。
- 最新最实质的功能需求：[#2601](https://github.com/netease-youdao/LobsterAI/issues/2601)（1 条评论）——请求在桌面客户端渲染 MCP Apps / Prefab UI（如 PrefectHQ Prefab / FastMCP 提供的 `ui://` 资源），这是一个面向 MCP 生态扩展的关键诉求。
- 唯一仍然活跃的待处理 PR（无 stale 标记）：[#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) Dependabot 提议将 electron 40.2.1 → 44.0.0，跨 4 个月未合并，存在 **重大升级与主版本兼容风险**。

**背后诉求**：用户期望 LobsterAI 紧跟 MCP 生态（Apps / Prefab），并保持桌面端核心能力（应用内浏览器、加密凭据）不被剥离；同时希望文档与功能同步更新。

---

## 5. Bug 与稳定性

按严重程度排列：

1. **高危 · Prefetch 跨轮次污染** — [#1088](https://github.com/netease-youdao/LobsterAI/issues/1088) `openclawRuntimeAdapter.ts:3809-3814` 的 prefetch 异步回调未校验 `turnToken`，可能将 Turn A 的消息错误投递到 Turn B。**尚无关联 fix PR。**
2. **高危 · CoworkRunner 缺重入保护** — [#1089](https://github.com/netease-youdao/LobsterAI/issues/1089) `startSession`/`continueSession` 在快速连续消息或 IM 批量投递场景下并发修改 `ActiveSession`，导致流式消息损坏与重复。**尚无关联 fix PR。**
3. **中危 · openclaw 版本过旧** — [#1082](https://github.com/netease-youdao/LobsterAI/issues/1082) `package.json` 中 `openclaw.version` 仍为 `v2026.3.2`，与监管要求更新到最新版本存在合规风险。**无 fix PR。**
4. **中危 · continueSession 重复错误消息** — [#1087](https://github.com/netease-youdao/LobsterAI/pull/1087) 同名 PR 已提出修复（移除一处重复 `addMessage`），但仍处于 OPEN/stale 状态，未合并。
5. **中危 · 文档 404** — [#1556](https://github.com/netease-youdao/LobsterAI/issues/1556) IM 机器人配置指南链接已失效，已关闭但需补齐文档。

今日合并的 [#2609](https://github.com/netease-youdao/LobsterAI/pull/2609) 间接修复了"更新安装静默打断任务"这一类稳定性/体验问题，值得肯定。

---

## 6. 功能请求与路线图信号

| 需求 | 链接 | 当前状态 | 路线可能性 |
|---|---|---|---|
| 渲染 MCP Apps / Prefab UI | [#2601](https://github.com/netease-youdao/LobsterAI/issues/2601) | 新开，1 评论 | **高**——MCP 生态正在快速演进，桌面客户端跟进是大势所趋 |
| AI 产物 Markdown 预览与文件卡片 | [#1552](https://github.com/netease-youdao/LobsterAI/issues/1552) | 已关闭（stale），需求未落地 | 中——典型"写作场景"刚需，但目前无 PR |
| 定时任务失败 IM 告警 | [#1078](https://github.com/netease-youdao/LobsterAI/pull/1078) | PR OPEN/stale | 中——逻辑清晰但被陈旧标签延误 |
| 「当前进程」右侧面板 + diff 视图 | [#1079](https://github.com/netease-youdao/LobsterAI/pull/1079) | PR OPEN/stale | 中——增强协作文档可读性，~400 行新组件 |

**信号**：路线图重心正从"功能可用"向"桌面端体验闭环"倾斜（应用内浏览器、UI 渲染、IM 卡片、安装确认）。MCP Apps 渲染能力很可能成为下一阶段的差异化亮点。

---

## 7. 用户反馈摘要

- **文档与产品脱节**（[#1556](https://github.com/netease-youdao/LobsterAI/issues/1556)）：用户按官方文档配置 IM 机器人时遇到 404，影响首次接入体验。
- **合规与安全焦虑**（[#1082](https://github.com/netease-youdao/LobsterAI/issues/1082)）：用户引用国家互联网应急中心要求，担忧 openclaw 版本落后带来的合规风险。
- **MCP 生态期待**（[#2601](https://github.com/netease-youdao/LobsterAI/issues/2601)）：希望桌面端能渲染 MCP Apps 提供的交互式 HTML UI，体现专业用户对生态扩展性的关注。
- **对 IM 卡片与语音配额的细节打磨**（[#2604](https://github.com/netease-youdao/LobsterAI/pull/2604)、[#2603](https://github.com/netease-youdao/LobsterAI/pull/2603)、[#2599](https://github.com/netease-youdao/LobsterAI/pull/2599)）：合并的多项 i18n/UI 调整反映真实用户对"按配额明确禁用 + 文案清晰"的诉求。

**整体满意点**：更新/退出前的二次确认、IM 卡片多列布局、Windows 安装器 DPI 修复。**不满意点**：stale 机制导致合法功能请求被误关、并发安全与跨轮次污染问题长期未解。

---

## 8. 待处理积压（提醒维护者）

- **陈旧但仍重要**（建议立即复审 stale 标记，避免误关）：
  - [#1082](https://github.com/netease-youdao/LobsterAI/issues/1082) openclaw 版本合规风险
  - [#1088](https://github.com/netease-youdao/LobsterAI/issues/1088) Prefetch turnToken 校验（安全相关）
  - [#1089](https://github.com/netease-youdao/LobsterAI/issues/1089) CoworkRunner 重入保护（数据一致性）
  - [#1078](https://github.com/netease-youdao/LobsterAI/pull/1078) 定时任务失败 IM 告警
  - [#1079](https://github.com/netease-youdao/LobsterAI/pull/1079) 当前进程面板 + diff 视图
  - [#1081](https://github.com/netease-youdao/LobsterAI/pull/1081) MCP 同步提示国际化 + 弹窗滚动条溢出
  - [#1087](https://github.com/netease-youdao/LobsterAI/pull/1087) continueSession 重复错误消息
- **跨 4 个月未合并**：[#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) Electron 40 → 44 升级，积压的安全/性能收益亟待评估。
- **新功能未对接**：[#2601](https://github.com/netease-youdao/LobsterAI/issues/2601) MCP Apps 渲染，开放仅 1 天，建议尽快指派 owner。

---

**健康度小结**：LobsterAI 在版本节奏与体验打磨上表现稳健，但 Issues 互动量偏低、stale 机制可能掩盖真实风险。建议维护者：(1) 复审陈旧 Issue/PR 的归属；(2) 优先处理高危并发与合规问题；(3) 评估 Electron 主版本升级与 MCP Apps 渲染两条战略性线索。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 · 2026-09-04

> 数据来源：GitHub 公开数据（moltis-org/moltis）· 报告生成时间：2026-09-04

---

## 一、今日速览

Moltis 项目今日活跃度处于**低水位**，过去 24 小时内 **0 条 Issue 变动、0 个新版本发布**，仅观察到 **1 条 PR 处于待合并状态**。整体来看，项目处于常规维护与小幅迭代周期，未出现重大事件或社区讨论热度激增。当前在跑的 PR #1257 聚焦于 Hook 生命周期事件的完善，属于核心功能稳定化范畴，显示出维护者仍在持续打磨事件分发机制。短期内项目健康度评估为**稳定但静默**。

---

## 二、版本发布

**今日无新版本发布。** 跳过本节。

---

## 三、项目进展

今日无 PR 合并或关闭，**无新代码合入主干**。仓库最新可观察的进展仅为一条仍待评审的 PR：

- **[PR #1257 – fix(hooks): complete lifecycle dispatch](https://github.com/moltis-org/moltis/pull/1257)**
  - 作者：@GTanger
  - 状态：OPEN（待合并）
  - 摘要要点：
    - 为 `BeforeToolCall`、`AfterToolCall`、`ToolResultPersist` 三个 Hook payload **新增可选字段 `tool_call_id`**，用于在工具调用全生命周期中实现端到端关联，同时保持对旧 JSON 结构的兼容；
    - 补齐此前已声明但未实际派发的三类事件 —— `AgentEnd`、`MessageSending`、`MessageSent`，针对非流式（native non-streaming）调用路径。

从提交信息判断，这是一项**面向 Hook 体系完整性的修复**，填补了声明与实现之间的缺口，对依赖事件总线进行可观测性建设、审计日志、回调编排的二次开发者具有直接价值。项目主线功能推进幅度：**小步前进**。

---

## 四、社区热点

今日**无任何 Issue 或 PR 产生新评论、点赞或讨论互动**。社区反馈渠道整体沉寂，缺乏可量化的热点议题。建议关注以下观察信号：

- 持续 48 小时以上未出现任何用户互动，可能意味着：
  - 项目进入稳定期，使用者暂未遇到阻塞性问题；
  - 或社区活跃度本身偏低，需维护者主动通过 Release Note、Roadmap 公告等方式激活讨论。
- 维护者可考虑在 PR #1257 评论区主动 @ 相关贡献者或领域 reviewer，加速评审节奏。

---

## 五、Bug 与稳定性

今日**未捕获到新报告的 Bug、崩溃或回归问题**。基于 PR #1257 的性质（标题为 `fix`），可推断此前存在以下隐性问题：

- **Hook 事件派发不完整（潜在 P1 级）**
  - 现象：`AgentEnd`、`MessageSending`、`MessageSent` 三类事件在原生非流式调用路径下未被实际派发，但相关代码已声明；
  - 影响范围：依赖完整 Hook 生命周期做日志、审计、消息中介（middleware）的下游模块将出现观测盲区；
  - 修复状态：**已有 Fix PR（#1257，待合并）**，但 PR 尚未获得评审反馈或点赞，合并节奏偏慢。

> 建议维护者优先评审该 PR，因其涉及事件契约的向后兼容性，延迟合并可能放大后续破坏面。

---

## 六、功能请求与路线图信号

今日**未收到新的功能请求 Issue**。结合仓库主线演进方向，从 PR #1257 可观察到以下隐含路线图信号：

- **可观测性与 Hook 体系完善仍是当前阶段重点**：
  - 引入 `tool_call_id` 实现调用全链路追踪，是面向 AIOps / Agent Debug 工具链的铺垫；
  - 补齐事件派发表明项目正在收敛“声明 - 实际行为”不一致问题，为后续稳定版本（如 1.x LTS）做准备。
- 维护者可考虑在 Issue 区主动发起 `Discussion` 标签，收集社区对 Hook 扩展性（如自定义事件、新 Hook 类型）的需求，以校准下一里程碑方向。

---

## 七、用户反馈摘要

今日**无新增 Issue 评论**，无可提炼的用户反馈。建议将本节视为**基线占位**——若后续 24-72 小时内 Issue 渠道仍无输入，可视为当前用户群体对现有功能满意度处于静默可接受区间。

---

## 八、待处理积压

按当前公开数据，重点待处理项如下：

| 优先级 | 条目 | 类型 | 状态 | 建议 |
| --- | --- | --- | --- | --- |
| 🔴 高 | [PR #1257](https://github.com/moltis-org/moltis/pull/1257) | Bug Fix + 功能补全 | OPEN，0 评论，0 👍，已更新于 2026-09-03 | 建议维护者 24h 内安排评审；该 PR 涉及事件契约，需明确版本兼容策略 |

> 由于 0 条 Issue 数据，无可识别的长期未响应 Issue 积压。若历史上存在未在此数据快照内但已超期未回复的 Issue，建议另行通过 GitHub Issue 过滤视图（`is:open updated:<2026-06-01`）补充巡检。

---

**报告小结**：Moltis 今日处于低活跃维护期，唯一可观察动作为 PR #1257 的 Hook 生命周期补全。整体节奏平稳，无紧急事件。下一份日报建议重点跟踪该 PR 的合并进展与社区反馈是否回暖。

*本报告由 AI 助手基于 GitHub 公开 API 数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报
**日期：2026-09-04**

---

## 1. 今日速览

CoPaw 项目今日保持高活跃度，过去 24 小时共产生 23 条 Issue 更新与 29 条 PR 更新，伴随 **v2.2.0 正式版本发布**。社区讨论度显著上升，Issue 平均评论数明显高于日常水平，主要围绕 QwenPaw Hub 多租户架构、移动端接入、安全沙箱突破等议题展开。Bug 报告密度较高（涉及安全、稳定性、可观测性多个维度），但大部分已有对应 PR 在跟进，项目整体处于 **快速迭代 + 安全修复并重** 的健康阶段。

---

## 2. 版本发布

### 🚀 v2.2.0 正式发布

主要更新内容：

- **QwenPaw Hub**：新增多用户 Hub，支持本地进程或 Docker 运行时、工作区级访问控制、凭据管理、反向代理（[#7112](https://github.com/agentscope-ai/CoPaw/pull/7112)）
- **QwenPaw Data**：相关数据模块更新（详情见 Release Notes）

> **迁移注意事项**：从 v2.1.0 升级至 v2.2.0 时，需注意 `ModelInfo.max_tokens` 字段已迁移至 `max_output_length`（见 #7474），自定义 provider 配置文件需同步更新。**破坏性变更**：环境变量管理统一至 `os.environ` + `EnvVarLoader` 模型（见 #7538），原有的进程级覆盖行为发生调整，建议回归测试。

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 说明 | 影响 |
|---|---|---|
| [#7536](https://github.com/agentscope-ai/CoPaw/pull/7536) | OpenCode API 兼容 `x-opencode-session` 头 | 修复 OpenCode 集成将在 09/06 开始的强制头校验 |
| [#7532](https://github.com/agentscope-ai/CoPaw/pull/7532) | Langfuse 工具 output 字段空白修复 | 修复可观测性链路（关联 #7529） |
| [#7525](https://github.com/agentscope-ai/CoPaw/pull/7525) | Governance CRITICAL 需审批而非直接拒绝 | 安全治理对齐 UI 描述（修复 #7496） |
| [#7267](https://github.com/agentscope-ai/CoPaw/pull/7267) | 渠道契约检查可移植化（Windows 非 UTF-8 兼容） | 关闭 #7264，提升 CI 鲁棒性 |
| [#7441](https://github.com/agentscope-ai/CoPaw/pull/7441) | ReMe 升级至 0.4.1.11 + Auto Fin 长期记忆 | 长期记忆能力增强 |
| [#7522](https://github.com/agentscope-ai/CoPaw/pull/7522) | 版本号升至 2.2.1b1 | 下一个迭代版本启动 |

**整体评估**：项目在安全治理、可观测性、跨平台兼容性、多租户架构四条主线均有实质推进，**单日合并质量高**，且多为带回归测试的 fix，代码健康度良好。

---

## 4. 社区热点

### 🔥 讨论最活跃

**[#7318](https://github.com/agentscope-ai/CoPaw/issues/7318) — QwenPaw Hub 多租户版路线图讨论**（17 条评论，3 个 👍）
- 作者 @rayrayraykk 提议社区共同规划 2.2.0 后方向，关联 #2324 等多用户访问请求
- **背后诉求**：从"个人助手"演进至"团队助手"，反映企业级部署需求强烈

**[#7511](https://github.com/agentscope-ai/CoPaw/issues/7511) — 安全沙箱被突破**（9 条评论）
- 关联 Zhihu 技术分析文章，社区高度关注
- **背后诉求**：安全边界的可信度问题

**[#4036](https://github.com/agentscope-ai/CoPaw/issues/4036) — 添加模型流程繁琐**（6 条评论，good first issue）
- **背后诉求**：UX 简化，新手门槛降低

**[#7505](https://github.com/agentscope-ai/CoPaw/issues/7505) — 局域网 LLM 频繁断连重试**（5 条评论）
- **背后诉求**：本地化部署稳定性

**[#7443](https://github.com/agentscope-ai/CoPaw/issues/7443) — 危险指令绕过**（6 条评论）
- **背后诉求**：与 #7511 同源的安全议题

---

## 5. Bug 与稳定性

### 按严重程度排列

| 等级 | Issue | 描述 | Fix PR |
|---|---|---|---|
| 🔴 高 | [#7511](https://github.com/agentscope-ai/CoPaw/issues/7511) | 安全沙箱被突破 | ❌ 无（已关闭但需复盘） |
| 🔴 高 | [#7443](https://github.com/agentscope-ai/CoPaw/issues/7443) | 危险指令绕过 | ❌ 无 |
| 🟠 中 | [#7534](https://github.com/agentscope-ai/CoPaw/issues/7534) | 飞书会话 consumer 卡死 | ❌ 无 |
| 🟠 中 | [#7505](https://github.com/agentscope-ai/CoPaw/issues/7505) | 局域网 LLM client disconnect | ❌ 无 |
| 🟠 中 | [#7476](https://github.com/agentscope-ai/CoPaw/issues/7476) | cron 任务重复触发 | ❌ 无 |
| 🟡 中低 | [#7474](https://github.com/agentscope-ai/CoPaw/issues/7474) | 自定义 provider 加载失败（已关闭） | ✅ 关联 #7337 |
| 🟡 中低 | [#7510](https://github.com/agentscope-ai/CoPaw/issues/7510) | `/memory/status` Desktop 500 | ❌ 无 |
| 🟡 中低 | [#7531](https://github.com/agentscope-ai/CoPaw/issues/7531) | OpenCode 缺少 session header | ✅ [#7536](https://github.com/agentscope-ai/CoPaw/pull/7536) |
| 🟡 中低 | [#7512](https://github.com/agentscope-ai/CoPaw/issues/7512) | 无法切换会话（已关闭） | — |
| 🟡 中低 | [#7516](https://github.com/agentscope-ai/CoPaw/issues/7516) | WeCom 无法发送 base64 图片 | ❌ 无 |
| 🟢 低 | [#7529](https://github.com/agentscope-ai/CoPaw/issues/7529) | Langfuse 工具输出空白 | ✅ [#7532](https://github.com/agentscope-ai/CoPaw/pull/7532) |

**安全风险提示**：#7511 与 #7443 形成"安全双议题"，均涉及 prompt 注入/沙箱逃逸，虽 #7511 已关闭但缺乏公开的复盘与加固说明，建议维护者发布官方安全公告。

---

## 6. 功能请求与路线图信号

### 高确定性（已有 PR 跟进）

- **[#7519](https://github.com/agentscope-ai/CoPaw/issues/7519) — 手机移动端远程连接桌面**
  → 对应 [#7378](https://github.com/agentscope-ai/CoPaw/pull/7378) QwenPaw Mobile（Expo/React Native）已起草，移动端路线明确

- **[#1775](https://github.com/agentscope-ai/CoPaw/issues/1775) — 类似 codex 的 steer mode**
  → 已有社区关注，等待实现

- **[#6960](https://github.com/agentscope-ai/CoPaw/pull/6960) — PawPort：从其他 Agent 导入配置**
  → 已支持 Codex 与 Qoder，跨生态互通即将落地

- **[#7543](https://github.com/agentscope-ai/CoPaw/issues/7543) — 后台更新机制**（已关闭为 review-later）
  → 用户对"更新期间不可用"痛感强

### 中等确定性

- **[#7533](https://github.com/agentscope-ai/CoPaw/issues/7533) — 消息按钮支持**（跨 channel）
- **[#7535](https://github.com/agentscope-ai/CoPaw/issues/7535) — Matrix/Element 兼容**
- **[#7540](https://github.com/agentscope-ai/CoPaw/issues/7540) — `env_context` 中硬编码 identity 可配置**
- **[#7527](https://github.com/agentscope-ai/CoPaw/issues/7527) — Native 上下文压缩保留 persona**
- **[#7080](https://github.com/agentscope-ai/CoPaw/pull/7080) — PowerContext 长记忆后端**（可选）
- **[#7502](https://github.com/agentscope-ai/CoPaw/pull/7502) — Console 侧边栏与设置重设计**

### 长期方向

- **[#7318](https://github.com/agentscope-ai/CoPaw/issues/7318) — Hub 多租户迭代方向**（社区驱动）

---

## 7. 用户反馈摘要

### 痛点

1. **模型接入繁琐**（#4036）：5 步流程 + 多次往返，新手友好度差
2. **本地化稳定性**（#7505）：局域网 LLM 高频断连，影响自托管用户体验
3. **桌面端会话切换**（#7512）：思考/输出期间无法切换会话，影响多任务并行
4. **远程 WebUI 加载慢**（#7518）：首次进入对话内容明显滞后，移动端尤甚
5. **在线更新阻塞前台**（#7543）：更新期间应用不可用
6. **会话架构缺陷**（#7541，俄语用户）：按 channel 分割 session 不合理，应统一视图
7. **会话 persona 漂移**（#7527）：长对话压缩后丢失 agent 个性与上下文风格

### 满意点

- 多租户 Hub 上线获得期待（#7318 3 个 👍）
- Console UI 主题统一与重设计（#7487、#7502）正在被积极推进

---

## 8. 待处理积压

> 提醒维护者关注以下长期未响应/低活动度的关键条目

| 编号 | 类型 | 标题 | 创建时间 | 状态 |
|---|---|---|---|---|
| [#1775](https://github.com/agentscope-ai/CoPaw/issues/1775) | Feature | 类似 codex 的 steer mode | 2026-03-18 | OPEN，5 个多月 |
| [#4036](https://github.com/agentscope-ai/CoPaw/issues/4036) | UX | 添加模型流程繁琐 | 2026-05-04 | OPEN，good first issue，4 个月 |
| [#7401](https://github.com/agentscope-ai/CoPaw/pull/7401) | PR | Windows ACP agent bootstrap 卡顿 | 2026-08-29 | OPEN，Under Review |
| [#7476](https://github.com/agentscope-ai/CoPaw/issues/7476) | Bug | cron 任务重复触发 | 2026-09-01 | OPEN，3 评论，无 PR |
| [#7534](https://github.com/agentscope-ai/CoPaw/issues/7534) | Bug | 飞书会话 consumer 卡死 | 2026-09-03 | OPEN，影响生产稳定性 |
| [#6960](https://github.com/agentscope-ai/CoPaw/pull/6960) | PR | PawPort 导入流 | 2026-08-13 | OPEN，3 周未合并 |

### 风险提醒

- **#1775** 与 **#4036** 长期挂在 good first issue 列表却无人认领，建议维护者主动 triage 或拆解为更小的子任务
- **#7401** 涉及 Windows 平台核心路径性能问题，已 Under Review 一周
- **#7511 安全沙箱突破议题**虽关闭但未给出加固说明，建议补充 post-mortem

---

**报告生成时间**：2026-09-04 ｜ 数据来源：GitHub REST API
**项目健康度评分**：⭐⭐⭐⭐☆（4/5，高活跃度 + 重大版本 + 安全议题待跟进）

</details>
