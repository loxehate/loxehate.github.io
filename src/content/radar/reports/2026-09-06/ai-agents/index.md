---
title: "OpenClaw 生态日报"
published: 2026-09-06
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-06

> Issues: 156 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-06 00:00 UTC

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

**日期：2026-09-06**

---

## 1. 今日速览

OpenClaw 项目今日进入高强度迭代节奏，24 小时内共产生 156 条 Issue 更新和 500 条 PR 更新，并发布 `v2026.9.2` 版本，重点解决长会话/磁盘处理期间聊天响应迟滞的核心体验问题。Issue 关闭率（21/156 ≈ 13.5%）相对偏低，PR 待合并比例（285/500 = 57%）较高，叠加多个被标记为 `clawsweeper:no-new-fix-pr` 的历史 P0/P1 问题（如僵尸进程泄漏、SSH 协议挂起、Team 线程上下文截断等），显示当前 review/merge 通道存在压力；主线进展主要集中于 Gateway 关闭/挂起收敛、Update 流程加固以及 Codex CLI 行为修正，社区需要维持高吞吐以避免下一窗口积压。

---

## 2. 版本发布

### v2026.9.2 — openclaw 2026.9.2

**核心改进（Faster, more responsive chat）**

- **直接 dashboard 查询**：聊天面板、仪表盘、会话交互在处理长 transcript 与磁盘占用时保持响应
- **减少冷启动开销**：首屏加载路径减少重复工作
- **持久化历史读取移出 Gateway 事件循环**：避免阻塞主事件循环
- 关联：#136862、#138…（节选）

**升级建议**

- 该版本属于响应性能优化版本，未见 Breaking change 公告
- 适用于 2026.8.x / 2026.9.0 / 2026.9.1 用户就地升级；尤其建议受 Discord Working 预览残留（#138630）、Codex 120s 终态超时丢消息（#139173）影响的用户升级到 v2026.9.2
- 备注：release notes 字段在数据中被截断，建议维护者补全 #138 系列 PR 编号以方便追溯

---

## 3. 项目进展

今日合并/关闭 215 条 PR 中，已确认主线修复与功能推进如下：

### Gateway 关闭与生命周期

- **#139500** `fix(gateway): prevent shutdown hanging during suspension`：修复 Gateway 关闭时被挂起的配置重载或启动恢复阻塞的问题（XL/L）— [PR](https://github.com/openclaw/openclaw/pull/139500)
- **#139517** `fix(process): require cleanup evidence before releasing owned work`：监督命令完成前需提供后清理证据，防止关闭或后续 owner 在未确认清理的情况下继续推进（XL）— [PR](https://github.com/openclaw/openclaw/pull/139517)
- **#139509** `fix(gateway): converge monitors after config publication`：在配置发布后再收敛 monitor，避免 Gateway 在持久化行写入失败时回滚配置/密钥（L）— [PR](https://github.com/openclaw/openclaw/pull/139509)

### Update 流程加固

- **#138839** `fix(update): validate candidates before stopping the Gateway`：在停 Gateway 前校验更新候选，避免已是最新的更新仍停止服务、staging 中长时间不可用、回滚只还原文件不还原服务（XL，Closes #136997）— [PR](https://github.com/openclaw/openclaw/pull/138839)
- **#139523** `fix(models): recover automations with retired model overrides`：自动任务中模型被下线时可恢复，并给出失败提示（XL，Fixes #139235）— [PR](https://github.com/openclaw/openclaw/pull/139523)

### 客户端与 UI

- **#139514** `refactor(ios): move app settings into the Dashboard and keep Gateway native`：iOS 设置统一接入 Dashboard，macOS/iOS 共用 Swift 设备设置层（XL）— [PR](https://github.com/openclaw/openclaw/pull/139514)
- **#139525** `fix(ui): show shimmer skeletons while loading Control UI`：Control UI 加载时统一显示骨架屏（M）— [PR](https://github.com/openclaw/openclaw/pull/139525)
- **#139522** `feat(macos): open Gateway windows from the Gateways menu`：macOS 主菜单直接展示多 Gateway 入口（M）— [PR](https://github.com/openclaw/openclaw/pull/139522)
- **#139466** `feat(browser): set up the Chrome extension from this Mac`：Mac 应用内一键安装 Chrome 扩展（已关闭/合并，L，Closes #139448）— [PR](https://github.com/openclaw/openclaw/pull/139466)

### 行为修正与稳定性

- **#139530** `fix(anthropic): prevent duplicate questions from overwriting answers`：用户对两条相同文本但不同 header 的 Claude 问题回答时不再被覆盖（S，Closes #128932）— [PR](https://github.com/openclaw/openclaw/pull/139530)
- **#139529** `fix(sessions): avoid pauses decoding unrelated prompts during creation`：创建/接管会话时不再解码全部无关 prompt（M，Closes #139526）— [PR](https://github.com/openclaw/openclaw/pull/139529)
- **#139528** `fix: avoid slow incognito key checks in large session stores`：大 session store 下 incognito key 检查不再走慢路径（XS）— [PR](https://github.com/openclaw/openclaw/pull/139528)
- **#139532** `perf(browser): reuse parent links when finding role-tree roots`：浏览器 role 树构建去重（XS）— [PR](https://github.com/openclaw/openclaw/pull/139532)
- **#139502** `perf(browser): avoid temporary NodeList copies in snapshots`：避免快照中 NodeList 临时拷贝（XS）— [PR](https://github.com/openclaw/openclaw/pull/139502)
- **#139480** `fix: preserve realtime transcription message limits under Bun`：Bun 下实时转写恢复入站 WS 负载上限（XS）— [PR](https://github.com/openclaw/openclaw/pull/139480)
- **#139497** `fix: preserve targeted test selection under Bun`：修复 Bun 测试规划负 extglob 选测丢失（S）— [PR](https://github.com/openclaw/openclaw/pull/139497)
- **#139519** `fix(test): unblock CI after storage-failure regression assertion`：**维护者请求的修复** — #139409 合并后多个 CI 任务失败的清理（已合并，XS）— [PR](https://github.com/openclaw/openclaw/pull/139519)
- **#139524** `fix(test): drop the stale transient-retry assertion from assistant failure fixtures`：清理过期的瞬时重试断言（XS）— [PR](https://github.com/openclaw/openclaw/pull/139524)
- **#139531** `fix(agents): retain storage-failure retry and credential coverage`：保留 Gateway 存储失败重试与凭据轮换覆盖（XS）— [PR](https://github.com/openclaw/openclaw/pull/139531)
- **#139533** `perf(tui): prepare highlight patterns once per query`：TUI 选择器高亮准备单次化 — [PR](https://github.com/openclaw/openclaw/pull/139533)
- **#139520** `fix: speed up model filtering and preserve async tool results`：长模型回复过滤提速、异步工具结果保留（M，Closes #139515）— [PR](https://github.com/openclaw/openclaw/pull/139520)

**整体评估**：今日主线"前进了一步"，围绕 *Gateway 关闭/挂起*、*Update 安全*、*iOS/macOS 设置统一* 三大主题收口了多项 XL PR；多个 XS/S 性能/测试修复在 main 上并入，进一步提升 CI 与运行时稳定性。

---

## 4. 社区热点

### 讨论最活跃的 Issue

1. **#97616** OpenClaw leaks unreaped hook/tool child processes（10 评论，1 👍）— [Issue](https://github.com/openclaw/openclaw/issues/97616)
   - `P1` `silver shellfish`，影响面包括 message-loss 与 crash-loop；自 2026-06-29 累积至今已有近 3 个月讨论
2. **#136183** Command executor hangs on ssh（9 评论）— [Issue](https://github.com/openclaw/openclaw/issues/136183)
   - 2026.8.1 引入的 SSH banner 挂起回归，2026.8.2 未修复
3. **#90098** Stack-safe large attachment handling for Control UI / gateway（7 评论，2 👍）— [Issue](https://github.com/openclaw/openclaw/issues/90098)
   - `diamond lobster`，大 PDF 上传触发 `RangeError: Maximum call stack`
4. **#119992** Per-turn send budget for the `message` tool（7 评论）— [Issue](https://github.com/openclaw/openclaw/issues/119992)
   - 同一回合多次改写发送造成的重复回答风暴
5. **#120162** Safeguard compaction 与 qualityGuard 共享超时预算（6 评论）— [Issue](https://github.com/openclaw/openclaw/issues/120162)
   - `platinum hermit`，慢模型下审计重试被同一 abort 信号杀死
6. **#114967** agent-driven live update 留下 launchctl keepalive 反复重启 gateway（6 评论）— [Issue](https://github.com/openclaw/openclaw/issues/114967)
   - `diamond lobster`，与 #138839 的 Update 修复主题直接相关
7. **#91931** Preseeded SOUL/IDENTITY/USER.md 提前完成 bootstrap 并删除 BOOTSTRAP.md（6 评论，1 👍）— [Issue](https://github.com/openclaw/openclaw/issues/91931)
   - `P0 diamond lobster`，用户文件丢失风险
8. **#71452** `list chat / list messages` 硬编码 25 条限制（6 评论，1 👍）— [Issue](https://github.com/openclaw/openclaw/issues/71452)
   - 长期呼声最高的 P3 UX 请求
9. **#127148** Codex sessions.compact 获取第二个 app-server 触发 writer 冲突（5 评论）— [Issue](https://github.com/openclaw/openclaw/issues/127148)
   - `diamond lobster`
10. **#137332** mixed terminal requester-settle batches retry forever（5 评论）— [Issue](https://github.com/openclaw/openclaw/issues/137332)
    - 所有权检查后请求批次无限重试

### 高关注 PR

- **#139517** process cleanup evidence before releasing owned work（XL）— [PR](https://github.com/openclaw/openclaw/pull/139517)
- **#139500** gateway shutdown not hanging on suspension（L）— [PR](https://github.com/openclaw/openclaw/pull/139500)
- **#138839** `fix(update): validate candidates before stopping the Gateway`（XL）— [PR](https://github.com/openclaw/openclaw/pull/138839)
- **#139514** iOS Settings → Dashboard 重构（XL）— [PR](https://github.com/openclaw/openclaw/pull/139514)
- **#129144** `fix(talk): keep opaque realtime routes out of public config`（XL，跨多端）— [PR](https://github.com/openclaw/openclaw/pull/129144)
- **#139511** Gateway token 字面量 `"undefined"` 不被 doctor / audit 告警（P1，security-boundary）— [PR](https://github.com/openclaw/openclaw/pull/139511)

**诉求分析**：社区当前最痛的点仍是 *进程/会话生命周期*（僵尸、子进程孤儿、SSH 挂起、Codex app-server 冲突）与 *配置/部署安全*（token 校验、Update 流程），其次是大附件栈溢出与重复回答风暴等体验问题；UI 端呼声集中在 Dashboard 化与加载骨架屏。

---

## 5. Bug 与稳定性

### P0 / P1 高危

| Issue | 标题 | 是否已有 fix PR | 严重性 |
|---|---|---|---|
| [#91931](https://github.com/openclaw/openclaw/issues/91931) | Preseeded SOUL.md/IDENTITY.md/USER.md 提前完成 bootstrap 并删除 BOOTSTRAP.md | `clawsweeper:linked-pr-open` | P0 diamond lobster |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 钩子/工具子进程未被收割，僵尸累积 | 否（no-new-fix-pr） | P1 silver shellfish |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | ssh 协议 banner 阶段 SIGTERM（2026.8.1 回归） | 否 | P1 silver shellfish |
| [#90098](https://github.com/openclaw/openclaw/issues/90098) | 大附件上传栈溢出 | 是（linked-pr-open） | P1 diamond lobster |
| [#119992](https://github.com/openclaw/openclaw/issues/119992) | message 工具 per-turn 发送预算 | 否 | P1 silver shellfish |
| [#120162](https://github.com/openclaw/openclaw/issues/120162) | safeguard compaction 与 qualityGuard 共用超时 | 否 | P1 platinum hermit |
| [#114967](https://github.com/openclaw/openclaw/issues/114967) | launchctl keepalive 反复重启 gateway | 否 | P1 diamond lobster |
| [#127148](https://github.com/openclaw/openclaw/issues/127148) | Codex sessions.compact writer 冲突 | 否 | P1 diamond lobster |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | 混合终态批次所有权检查后无限重试 | 否 | P1 diamond lobster |
| [#137056](https://github.com/openclaw/openclaw/issues/137056) | memory-core 维护拖慢 search/watch | 否 | P1 diamond lobster |
| [#109634](https://github.com/openclaw/openclaw/issues/109634) | Telegram 长轮询健康监控后沉默停摆 | 否 | P1 silver shellfish |
| [#104719](https://github.com/openclaw/openclaw/issues/104719) | memory-wiki supplement 忽略工具 deadline | 是（linked-pr-open） | P1 diamond lobster |
| [#110337](https://github.com/openclaw/openclaw/issues/110337) | tools.loopDetection 默认 false，1 小时烧掉 $30–$50 | 否 | P1 diamond lobster |
| [#139173](https://github.com/openclaw/openclaw/issues/139173) | 2026.9.1 Codex 120s 终态超时丢消息（已关闭，可能随 v2026.9.2 修复） | 否 | P1 platinum hermit |
| [#139277](https://github.com/openclaw/openclaw/openclaw/issues/139277) | Android Talk 重连后回退默认 agent | 否 | P1 diamond lobster |
| [#112707](https://github.com/openclaw/openclaw/issues/112707) | message 工具 turn capability 长回合中途过期 | 否 | P1 silver shellfish |

### P2 / P3 中等

| Issue | 标题 |
|---|---|
| [#115430](https://github.com/openclaw/openclaw/issues/115430) | Windows Corepack pnpm shim EPERM |
| [#111547](https://github.com/openclaw/openclaw/issues/111547) | typingMode:"message" 被执行阶段旁路 |
| [#105622](https://github.com/openclaw/openclaw/issues/105622) | 前置工具钩子未转发 Abort 信号 |
| [#106583](https://github.com/openclaw/openclaw/issues/106583) | Sandbox 大 Buffer OOM |
| [#98870](https://github.com/openclaw/openclaw/issues/98870) | Teams 线程 >50 回复时截断新消息 |
| [#138630](https://github.com/openclaw/openclaw/issues/138630) | Discord 心跳超时后 Working 预览残留 |
| [#42252](https://github.com/openclaw/openclaw/issues/42252) | doctor / gateway 诊断在混合 LaunchAgent 状态不一致 |
| [#77249](https://github.com/openclaw/openclaw/issues/77249) | Slack socket-mode zombie WSS 重连监督器挂死 |
| [#92238](https://github.com/openclaw/openclaw/issues/92238) | 隔离 cron job OpenAI/Codex 模型路径 `exec unavailable` |
| [#111370](https://github.com/openclaw/openclaw/issues/111370) | openclaw-hooks 异常终止后孤儿 |
| [#131877](https://github.com/openclaw/openclaw/issues/131877) | auth.order 首个 token 静默跳过，无日志 |
| [#119592](https://github.com/openclaw/openclaw/issues/119592) | workboard_move 终态未清理 claim |
| [#110500](https://github.com/openclaw/openclaw/issues/110500) | BM25 textScore 对 CJK 查询返回 0 |
| [#119117](https://github.com/openclaw/openclaw/issues/119117) | 延迟 turn 维护无超时，task_runs 永久 running |
| [#111538](https://github.com/openclaw/openclaw/issues/111538) | active-memory 注入被模型误作 prompt 导致循环 |
| [#130061](https://github.com/openclaw/openclaw/issues/130061) | GPT-5.6 Responses 缺显式缓存断点 |
| [#92674](https://github.com/openclaw/openclaw/issues/92674) | thinking 默认 medium 被静默降级 adaptive，token ×4–5 |
| [#130673](https://github.com/openclaw/openclaw/issues/130673) | Claude CLI 已认证模型在 models list 显示 unknown |
| [#132708](https://github.com/openclaw/openclaw/issues/132708) | openai-compatible embeddings 需节流 + 尊重 Retry-After + Batch API |

**总体观察**：在排名前 10 的 P1 中，仅 2 个已有 Linked PR（P0 #91931、P1 #90098/P1 #104719），其余 P1 仍处于 `no-new-fix-pr` 状态，是当前最大的稳定性风险池。

---

## 6. 功能请求与路线图信号

| 提案 | 关联 Issue / PR | 优先级 |
|---|---|---|
| `list chat / list messages` 支持分页替代硬编码 25 条 | [#71452](https://github.com/openclaw/openclaw/issues/71452) | P3 |
| Session labels / nicknames 便于识别 | [#55249](https://github.com/openclaw/openclaw/issues/55249) | P2 |
| Telegram progress 模式保留已完成草稿 | [#102199](https://github.com/openclaw/openclaw/issues/102199) | P3 |
| user-level skill 偏好/约定（不覆盖 SKILL.md） | [#48918](https://github.com/openclaw/openclaw/issues/48918) | P3 |
| Feishu 群聊预发送消息校验（@mention XML 格式） | [#104855](https://github.com/openclaw/openclaw/issues/104855) | P2 |
| per-agent agentToAgent / session 可见性作用域 | [#59149](https://github.com/openclaw/openclaw/issues/59149) | P2（需安全评审） |
| iOS exec-approval coordinator 拆出 NodeAppModel | [#104520](https://github.com/openclaw/openclaw/issues/104520) | P3 |
| CLI 后端同模型瞬时重试后再走 fallback chain | [#139521](https://github.com/openclaw/openclaw/issues/139521) | P2 |
| 工具循环检测默认启用 | [#110337](https://github.com/openclaw/openclaw/issues/110337) | P1（伴随安全与成本信号） |
| iPhone 宽度设置页 + embed 模式 | [#139492](https://github.com/openclaw/openclaw/pull/139492) | 已提 XL PR |
| CLI agents 默认启用 | [#139459](https://github.com/openclaw/openclaw/pull/139459) | 已提 PR（已关闭，方向或需调整） |
| Agent-created PR 模板添加可折叠指引 | [#86680](https://github.com/openclaw/openclaw/issues/86680) | P3 |
| `openclaw doctor` / gateway 诊断在混合 LaunchAgent 状态可读性 | [#42252](https://github.com/openclaw/openclaw/issues/42252) | P2 |

**路线图信号**：维护者侧在 PR 主题上重点投入 *Update 安全*（#138839、#139523）、*Gateway 生命周期*（#139500、#139509、#139517、#139531）、*iOS/macOS 统一*（#139514、#139522）以及 *Browser/CDP 性能*（#139502、#139532）；下一版本（2026.10.x）很可能把 `tools.loopDetection.enabled` 默认 true、Telegram long-polling 恢复路径、Codex 终态超时三件事合并收口（其中 #139173 已对应 2026.9.2 的"快速响应"改进）。

---

## 7. 用户反馈摘要

- **挂死/孤儿进程是头号痛点**：用户报告 `openclaw-hooks` / `bash` / `codex` 子进程在 run 异常终止后未被收割，主进程内存与 fd 累积（#97616、#111370），社区多次提议在 runBeforeToolCallHook 转发 Abort 信号并加 bounded execution timeout（#105622）。
- **SSH 与网络链路脆弱**：通过 OpenClaw 命令执行器调用 ssh 时等待 banner 完成阶段被 SIGTERM 杀死，相同命令直接 shell 运行成功（#136183）；本地 HTTP 代理 + watchdog 重启链路下，Telegram long-polling 在 `released stopped` 之后不再出现 `starting provider`，不可见地停摆（#109634）。
- **Slack 重连监督器在僵尸 WSS 下挂死**：仅监听 emitter 事件，TCP keepalive 仍在但 ping/pong 停顿时无任何事件/日志，必须手动重启（#77249）。
- **Windows 体验偏差**：`corepack enable` 在 `C:\Program Files\nodejs` 下创建 pnpm shim 报 EPERM（#115430）；Sandbox 在向 `runShellCommand` 写入大 Buffer 时存在 OOM 隐患（#106583）。
- **Codex 集成痛点**：2026.9.1 终态 120s 超时丢弃已完成 Codex 回复（#139173，已关闭）；`sessions.compact` 获取第二个 app-server 触发 writer 冲突（#127148）；agent 拒绝非核心工具时 Codex Apps 直接消失（#139343 跟进 PR）。
- **多模型 / 多提供商体验问题**：openai-compatible embeddings（千帆、阿里百炼、火山方舟）缺乏节流、不尊重 Retry-After、未启用 Batch（#132708）；BM25 hybrid 模式对中文/CJK 查询 textScore 始终为 0（#110500）；thinking level 静默降级到 adaptive，token 飙 4–5 倍（#92674）。
- **客户端体验细节**：Discord 心跳超时后 Working 预览不消失，与正常回复并列残留（#138630）；Android Talk 选择 agent 仅在 picker tap 时生效，重连后回退默认 agent（#139277）。
- **正面/积极反馈**：v2026.9.2 在 chat / dashboard / session 交互的响应性提升被官方列为 highlights（#136862 等）；control UI 加载骨架屏 PR（#139525）回应了"打开页面只有居中吉祥物"的吐槽。

---

## 8. 待处理积压

### 长期未关闭的高优先级 Issue

- **#91931** P0 diamond lobster，2026-06-10 创建（90 天+），仍有 `linked-pr-open` 但未合并 — [Issue](https://github.com/openclaw/openclaw/issues/91931)
- **#97616** P1 silver shellfish，2026-06-29 创建，10 条评论无 fix PR — [Issue](https://github.com/openclaw/openclaw/issues/97616)
- **#136183** P1 silver shellfish，2026-09-02 创建的回归，9 条评论无 fix PR — [Issue](https://github.com/openclaw/openclaw/issues/136183)
- **#119992** P1 silver shellfish，2026-08-06 起讨论 per-turn send budget — [Issue](https://github.com/openclaw/openclaw/issues/119992)
- **#120162** P1 platinum hermit，2026-08-07 起，safeguard compaction 共享超时 — [Issue](https://github.com/openclaw/openclaw/issues/120162)
- **#114967** P1 diamond lobster，2026-07-28 起，与 update 流程直接相关 — [Issue](https://github.com/openclaw/openclaw/issues/114967)
- **#110337** P1 diamond lobster，2026-07-18 起，loop detection 默认值争议 — [Issue](https://github.com/openclaw/openclaw/issues/110337)
- **#109634** P1 silver shellfish，2026-07-17 起 Telegram 长轮询恢复 — [Issue](https://github.com/openclaw/openclaw/issues/109634)
- **#71452** P3 off-meta tidepool，2026-04-25 起，长期 UX 请求 — [Issue](https://github.com/openclaw/openclaw/issues/71452)
- **#55249** P2 off-meta tidepool，2026-03-26 起，session 标签/昵称 — [Issue](https://github.com/openclaw/openclaw/issues/55249)
- **#42408** P2 silver shellfish，2026-03-10 起，memory_search 质量波动（path drift + 基准文件污染）— [Issue](https://github.com/openclaw/openclaw/issues/42408)
- **#77249** P1 platinum hermit，2026-05-04 起 Slack 重连监督器挂死 — [Issue](https://github.com/openclaw/openclaw/issues/77249)

### 长期未合并的重要 PR

- **#137144** `fix(subagents): preserve media in direct completion fallback`（M，P1，P0 message-delivery risk）— [PR](https://github.com/openclaw/openclaw/pull/137144)
- **#129144** `fix(talk): keep opaque realtime routes out of public config`（XL，多端）— [PR](https://github.com/openclaw/openclaw/pull/129144)
- **#112446** `fix(memory-core): refresh stale manager in memory_search`（M，stale，需补 proof）— [PR](https://github.com/openclaw/openclaw/pull/112446)
- **#139492** `feat(ui): add native embed mode and phone-width settings pages`（XL，waiting on author）— [PR](https://github.com/openclaw/openclaw/pull/139492)
- **#139343** `fix: Codex Apps disappear when an agent denies any non-core tool`（XL，waiting on author）— [PR](https://github.com/openclaw/openclaw/pull/139343)

### 提醒维护者关注

- `clawsweeper:no-new-fix-pr` 标签下 P0/P1 已堆积至少 10 项，建议在 v2026.10.x 启动一个 *Burning Down* 计划，每周集中收口 2–3 项
- 多项 Issue 显示 *修复方向已有 PR 但被维护者驳回或作者等待中*（#137144、#129144、#139492、#139343），需要 reviewer 给出明确下一步
- 多个 P0/P1 Issue 在事件循环、Abort 信号、超时预算上互相纠缠（#114967 / #120162 / #127148 / #137332 / #139173），建议在主线设置 owner 统一跟进 Codex & 进程生命周期相关修复

---

*日报基于 OpenClaw GitHub 公开数据生成，覆盖窗口：2026-09-05 → 2026-09-06。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析

**报告日期：2026-09-06** · 数据窗口：2026-09-05 → 2026-09-06

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态在 2026-09-06 呈现出**"双轨并行"格局**：以 OpenClaw 为代表的头部项目已进入"高吞吐、强治理"阶段，单日处理 500+ PR 与 156 条 Issue，同时在响应性能、Gateway 生命周期、Update 安全等基础设施层面集中投入；与之并行的 NanoBot、ZeroClaw、IronClaw 等项目则处于**安全加固与质量打磨阶段**，聚焦进程生命周期、配置边界、错误归类等稳健性问题。值得关注的是，PicoClaw、NanoClaw、LobsterAI、Moltis 等项目当日活跃度偏低，反映出**生态内部已出现明显的活跃度分层**——技术债重、生态位重叠的项目正面临维护节奏放缓的挑战，而具备清晰架构边界和商业背书的项目（如 ZeroClaw v0.8.5、CoPaw 2.2.0 Hub）则在加速演进。整体趋势上，**安全边界细化、多通道/多租户扩展、Provider 错误处理鲁棒性、CLI/Web/桌面三端体验统一**是当前四大共性诉求。

---

## 2. 各项目活跃度对比

| 项目 | Issue 增量 | PR 增量 | Release | 健康度 | 当日阶段定位 |
|---|---|---|---|---|---|
| **OpenClaw** | 156 更新 / 21 关闭 (~13.5%) | 500 更新 / 215 合并关闭 / 285 待合并 (57%) | ✅ v2026.9.2 | ⭐⭐⭐⭐ | 高强度迭代 + 版本发布 |
| **ZeroClaw** | 1 活跃 / 2 关闭 | 10 合并/关闭 / 40 待合并 | ✅ v0.8.5（454 commits） | ⭐⭐⭐⭐ | 重大版本发布 + 安全主线 |
| **NanoBot** | 1 新开 | 23 更新 / 7 合并 (30%) / 16 待合并 | ❌ | ⭐⭐⭐ | 重构收尾 + 质量打磨 |
| **IronClaw** | 3 更新 | 5 更新 / 2 合并 | ❌ | ⭐⭐⭐⭐ | 体验文案精准化修复 |
| **CoPaw** | 10 更新（7 新开/3 关闭） | 4 更新（均待合并） | ❌ | ⭐⭐⭐ | Bug 闭环 + Hub 多租户预热 |
| **NanoClaw** | 0 | 4 更新 / 1 关闭 / 3 待合并 | ❌ | ⭐⭐⭐ | 工程维护周期 |
| **PicoClaw** | 1 新开 / 1 关闭 | 5 更新（4 旧 PR 批量关闭） | ❌ | ⭐⭐ | 积压清理期 |
| **Moltis** | 1 新开 | 0 | ❌ | ⭐⭐ | 静默观察日 |
| **LobsterAI** | 0 | 2 旧 PR 后台刷新 | ❌ | ⭐ | 低活跃静默期 |

**关键观察**：当日 Issue/PR 总处理量排序为 OpenClaw >> ZeroClaw ≈ CoPaw > NanoBot ≈ IronClaw > 其他。**PR 待合并比例**是更可靠的健康度指标——OpenClaw（57%）、NanoBot（70%）、ZeroClaw（80%）均显示合并通道承压，而 PicoClaw/LobsterAI 的"批量关闭旧 PR"现象则指向更深层的维护节奏问题。

---

## 3. OpenClaw 在生态中的定位

**优势对比**：

| 维度 | OpenClaw | 生态平均 |
|---|---|---|
| 社区吞吐 | 24h 内 500 PR、156 Issue | 大多数项目日处理 < 30 PR |
| 版本节奏 | 9 月内已发 2026.9.0/9.1/9.2 | ZeroClaw 月均 0.5-1 版，其他更稀疏 |
| 端覆盖 | iOS/macOS/Android/Web/CLI/TUI/Discord/Telegram/Slack/Feishu | 多项目仅覆盖 CLI + 单一 IM |
| 贡献者规模 | XL/L 级 PR 集中由核心团队驱动 | NanoBot/ZeroClaw 同样依赖少数 trusted contributor |
| 议题深度 | 同时推进 Gateway 生命周期、Update 安全、模型治理、UI 重构 | 多数项目聚焦单一主线 |

**技术路线差异**：

- **OpenClaw**：以"全能桌面 Agent + 多端 Dashboard 统一"为核心叙事，技术重心在 Gateway 事件循环、Update 候选校验、iOS Swift 设置层与 Web Control UI 收敛
- **ZeroClaw**：更聚焦"安全边界 + Provider 兼容性矩阵"，v0.8.5 的 ZeroRelay/ZeroRouter 表明其在向"路由层 + 中继层"架构演进
- **NanoBot**：延续"会话安全 + MessageBus 统一"的轻量化路线，与 OpenClaw 在"事件总线解耦"上思路一致但更克制
- **IronClaw/CoPaw**：以特定 IM/桌面场景为切入口（IronClaw 强 Telegram、CoPaw 强飞书/Qwen 生态）

**社区规模对比**：OpenClaw 的 PR/Issue 处理量约为第二梯队的 5-10 倍，且**维护者响应密度**显著更高（当日合并 215 条 PR 涉及多位 reviewer）。但这一规模也带来"review 通道承压"（57% 待合并率）与"P0/P1 积压 10+ 项"的结构性问题。

---

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **进程/会话生命周期** | OpenClaw (#97616, #127148, #137332)、NanoBot (#5580, #5589)、ZeroClaw (#9320) | 子进程收割、session 持久化移出 event loop、已丢弃 session 不复活、cron job wall-clock 超时 |
| **Provider 错误鲁棒性** | NanoBot (#5674 Nvidia NIM)、OpenClaw (#139173 Codex 120s)、ZeroClaw (#9447 Anthropic 不完整终态) | 超时/不完整响应不应被当作正常模型输出，需在 Provider 层做严格错误归类 |
| **配置/凭据安全边界** | OpenClaw (#139511 token 字面量 "undefined")、ZeroClaw (#10308 shared_workspace deny、#10337 Git 路径约束、#9420 OAuth ACL) | Token 校验、workspace 默认 deny、Git 工具路径收口、Anthropic 凭据 ACL 重构 |
| **多通道安全审批** | ZeroClaw (#9997 Telegram 选择器、#10358 Mattermost)、OpenClaw (#139514 iOS Settings 统一)、CoPaw (#7318 Hub 多租户) | 各 IM 渠道审批流、权限分级、共享频道文案精准化 |
| **Update / 部署安全** | OpenClaw (#138839 Update 候选校验、#114967 launchctl 循环)、NanoClaw (#2403 CI Release concurrency guard) | 升级前校验、并发锁避免版本竞态、staging 回滚还原服务 |
| **CJK/多语言检索** | OpenClaw (#110500 BM25 textScore CJK=0) | 单一项目问题但具有代表性，反映多语言检索仍是通用痛点 |
| **可观测性** | CoPaw (#7572 `except Exception` 仅返回 `str(exc)`) | 异常栈丢失是企业/运维用户的硬伤 |

**横向信号**：进程生命周期与 Provider 错误处理是当日**最强烈的两个共性诉求**，分别覆盖 4 个和 3 个项目，建议作为下一周期生态级标准化的优先方向。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全平台桌面 Agent + 多端 Dashboard | 重度个人用户 + 跨端协作 | Gateway 中心 + iOS/macOS Swift 设置层 + Web Control UI 收敛 |
| **ZeroClaw** | 安全优先的多 Provider 框架 | 企业/多租户用户 | ZeroRelay/ZeroRouter 路由层 + per-agent shared_workspace 开关 |
| **NanoBot** | 轻量 CLI/WebUI Agent | 开发者/CLI 重度用户 | MessageBus 统一事件总线 + 路径遍历/复活防护 |
| **IronClaw** | Telegram/IM 集成打磨 | IM 渠道重度用户 | 嵌入式 Pi 沙箱即将默认化 + 配对流程文案精准化 |
| **CoPaw** | 桌面 Agent + Qwen 生态 + 飞书集成 | 国内/Qwen 生态用户 | Hub 多租户（2.2.0）+ Skill 元数据 + Advisor 双模型模式 |
| **NanoClaw** | 稳定维护型桌面 Agent | 偏好稳定的运维用户 | CI Release concurrency guard + signal-cli 严格版本锁定 |
| **PicoClaw** | 轻量 MCP 工具集成 | MCP 工具探索者 | CLI + IRC/Telegram，文档驱动型扩展 |
| **Moltis** | 个人 AI 助手 | 通用个人用户 | reasoning 等级持久化需求（#1259）反映个性化深度 |
| **LobsterAI** | Cowork 会话 + MCP 控制 | 桌面 Agent 重度用户 | CoworkSessionDetail 模块化 + per-session MCP 开关（PR 待合并） |

**架构关键差异提炼**：
- **中心化 vs 分布式**：OpenClaw/ZeroClaw 采用 Gateway/Relay 中心节点，NanoBot/Moltis 倾向轻量化无中心架构
- **多端覆盖广度**：OpenClaw > ZeroClaw > CoPaw > IronClaw > 其他
- **安全模型**：ZeroClaw 最严格（per-agent 策略 + shared_workspace 默认 deny），OpenClaw 居中，NanoBot/Moltis 最轻
- **商业背书**：ZeroClaw（73 位贡献者）、CoPaw（阿里 Qwen 生态）、LobsterAI（网易有道）、IronClaw（NEAR AI）有明确机构支持，其他更偏社区驱动

---

## 6. 社区热度与成熟度

### 快速迭代阶段（活跃度 ⭐⭐⭐⭐）

- **OpenClaw**：单日 500 PR + v2026.9.2 发布，处于"高强度版本迭代 + 多端重构"窗口
- **ZeroClaw**：v0.8.5（454 commits、73 contributors）发布当日仍保持 40 PR 待合并，处于"安全边界强化 + 多通道扩展"爆发期
- **IronClaw**：当日 3 PR 合并集中在用户体验修复，处于"产品打磨 + 沙箱默认化"过渡期

### 质量巩固阶段（活跃度 ⭐⭐⭐）

- **NanoBot**：30% PR 合并率 + 多个 P1 fix 待合并，处于"重构收尾 + 文档完善"阶段
- **CoPaw**：Bug 修复闭环率高（3/3），但 4 个 PR 全部待合并，处于"Hub 多租户预热 + 关键 Bug 待 patch"阶段
- **NanoClaw**：4 个月长期 PR 清理完毕 + 3 项维护性 PR 待合并，处于"稳定运维"周期

### 静默/积压阶段（活跃度 ⭐⭐）

- **PicoClaw**：批量关闭 6 个月前旧 PR + 仅 1 个文档 PR 待合并，**有维护节奏放缓信号**
- **Moltis**：仅 1 条 enhancement Issue，**社区反馈通道需主动激活**
- **LobsterAI**：2 条 PR stale 超 5 个月，**需维护者明确处置决策**

**成熟度信号**：当日活跃度与项目年龄/历史 PR 数量呈弱相关——**真正决定健康度的是"是否有清晰的主线叙事"**。OpenClaw/ZeroClaw/IronClaw 主线清晰故吞吐高，PicoClaw/LobsterAI 主线模糊故活跃度衰减。

---

## 7. 值得关注的趋势信号

### 趋势一：**安全边界细化成为 Agent 框架的"分水岭"**

OpenClaw（#139511 token 校验、#138839 Update 安全）、ZeroClaw（#10308、#10337、#9420）、NanoBot（#5633 path traversal）共同指向：**当 Agent 走向多租户/多用户/多凭据场景后，安全边界将成为框架成熟度的核心指标**。对开发者参考：构建生产级 Agent 时，配置文件默认值应采用 deny-by-default，而非依赖用户手动配置安全策略。

### 趋势二：**Provider 错误处理鲁棒性成为新瓶颈**

NanoBot #5674（Nvidia NIM 超时误判）、OpenClaw #139173（Codex 120s 丢消息）、ZeroClaw #9447（Anthropic 不完整终态）三件事具有共同模式：**超时/不完整响应被错误归类为模型输出**。这反映出 AI Agent 框架在多 Provider 时代的错误归类标准化仍未解决。对开发者参考：实现自定义 Provider 时，必须显式区分"网络超时"、"模型超时"、"内容不完整"、"内容被截断"四种错误类型，并在协议层定义标准错误码。

### 趋势三：**多端体验统一从"可选"走向"必选"**

OpenClaw #139514（iOS Settings → Dashboard 重构）、#139522（macOS 多 Gateway 菜单）、#139525（Control UI 骨架屏）显示：**跨端一致性不再是 nice-to-have，而是用户对"个人 AI 助手"产品的基本预期**。对开发者参考：早期项目即应建立 Design System 抽象层，避免后期重写。

### 趋势四：**Hub/多租户化是个人 Agent 走向团队的关键跃迁**

CoPaw #7318（23 条评论的 Hub 需求征集）显示，社区已不再满足于"个人 Agent"，开始向"团队 Agent 平台"演进。对开发者参考：若产品定位为长期项目，应在 v1.0 前预留 `workspace`、`permission scope`、`audit log` 三个扩展点，否则后期重构成本极高。

### 趋势五：**长期 PR 积压反映"维护者倦怠"风险**

OpenClaw（#91931 90 天+ P0）、ZeroClaw（#9420 41 天 blocked）、NanoBot（#4549、#4551 71 天 conflict）、PicoClaw（#1541 等 175 天后批量关闭）形成了一个跨项目的共性问题：**高活跃度项目同样面临 PR 长期悬挂**。对开发者参考：作为贡献者，提交大型 PR 前应先与维护者对齐方向；作为维护者，应建立"按月收敛"的 PR 评审节奏，避免积压跨越版本周期。

### 趋势六：**CLI/WebUI/IM 三端体验差异化收敛**

NanoBot（#5671 WebUI dev 模式）、ZeroClaw（#10358 Mattermost）、IronClaw（#8072 Bot API 命令菜单）、CoPaw（#7573 Web UI Edit/Rewind）显示：**三端体验的"差异化收敛"是 2026 年的产品趋势**——既要保持各端的原生体验，又要在核心交互（命令菜单、消息边界、错误归因）上保持一致。

---

## 总结建议

**对技术决策者**：
- 选型个人 AI 助手框架时，**安全边界默认值**应作为首要评估指标（ZeroClaw > OpenClaw > 其他）
- 关注**长期 PR 待合并率**，超过 60% 的项目（如 ZeroClaw 80%）需评估维护者响应能力
- Hub/多租户化（如 CoPaw 2.2.0）是 2026 下半年的重要演进方向，提前布局可获得生态位优势

**对 AI 智能体开发者**：
- **进程生命周期管理**（子进程收割、session 持久化移出 event loop）是 Agent 走向生产环境的必修课
- **Provider 错误归类**应在协议层定义标准，避免超时/不完整响应污染主流程
- **多端 Design System** 应在项目早期建立，避免后期重写成本
- **配置文件默认值**采用 deny-by-default 而非 allow-by-default

---

*报告基于 2026-09-06 GitHub 公开数据生成，覆盖 9 个项目横向对比。*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报
**日期：2026-09-06**
**数据来源：github.com/HKUDS/nanobot**

---

## 1. 今日速览

NanoBot 今日维持高强度开发节奏，过去 24 小时内共有 **1 个 Issue 新开**、**23 个 PR 更新**，其中 **7 个 PR 已合并/关闭、16 个 PR 仍待合并**，整体活跃度较高。社区贡献方面，单日出现 5 个新提交 PR（#5667、#5669、#5670、#5671、#5672、#5673），呈现明显的"清理 + 收尾"特征——多个 PR 集中清理历史遗留代码、补齐文档、修复与近期重构相关的回归问题。新报告的 Issue 数量虽少（仅 1 条），但涉及一个与 Nvidia NIM Provider 相关的 agent 崩溃问题，具备较高严重性。无新版本发布。

---

## 2. 版本发布

⚠️ 无新版本发布。

---

## 3. 项目进展

今日共 **7 个 PR 已合并/关闭**，整体属于"内务整理 + 文档完善"阶段，并未推进大型新功能上线：

| PR | 标题 | 意义 |
|---|---|---|
| [#5670](https://github.com/HKUDS/nanobot/pull/5670) | refactor(events): unify scoped runtime notifications across clients | 统一 MessageBus 作为本地事件订阅和通道传递的统一出口，对上下文压缩链路做了端到端迁移，向后兼容已有线协议与持久化格式 |
| [#5672](https://github.com/HKUDS/nanobot/pull/5672) | test: remove obsolete nonexistence checks | 清理仅检查已退役/从未暴露符号的测试，保留可观测行为、安全与协议层面的覆盖 |
| [#5671](https://github.com/HKUDS/nanobot/pull/5671) | fix(cli): skip WebUI bundle check in dev mode | 修复 `nanobot webui --dev` 在跳过模式下仍警告生产 bundle 过期的体验问题 |
| [#5669](https://github.com/HKUDS/nanobot/pull/5669) | docs: explain derived context budget | 补充模型上下文窗口推导逻辑的文档说明，作为 #5668 的文档跟进 |
| [#5667](https://github.com/HKUDS/nanobot/pull/5667) | refactor: remove unused internal helpers and state | 移除 ContextBuilder 私有别名、Telegram 只写回复映射等无用代码与测试 |
| #5659 / 其他 | (其他已关闭 PR) | 略 |

**整体评价**：今日并未"向前迈出一大步"，更多是清理技术债务、为近期重构收尾，并为未来版本做铺垫。这反映出项目在进入稳定迭代阶段，开发重心从"新增特性"转向"打磨质量"。

---

## 4. 社区热点

由于今日所有 PR 的评论数均为 `undefined`（未显示数据），无法以评论数排序热点。但从 **更新频率与优先级标签** 看，社区关注集中在以下方向：

- 🔒 **会话安全与稳定性**（P1 高优先级）：
  - [#5633](https://github.com/HKUDS/nanobot/pull/5633) 修复 session key 的 path traversal 漏洞
  - [#5580](https://github.com/HKUDS/nanobot/pull/5580) 将 session 持久化移出 event loop，解决阻塞问题
  - [#5589](https://github.com/HKUDS/nanobot/pull/5589) 阻止已丢弃的 session "复活"
- 🧠 **Agent / 内存管理**：
  - [#5664](https://github.com/HKUDS/nanobot/pull/5664) 为 idle summary 缓存加上边界
  - [#5630](https://github.com/HKUDS/nanobot/pull/5630) 为 Dream 内存文件加上尺寸护栏
- 🔌 **MCP / Provider 生态**：
  - [#5573](https://github.com/HKUDS/nanobot/pull/5573) 自动刷新过期的 OAuth token
  - [#5386](https://github.com/HKUDS/nanobot/pull/5386) 保留 MCP Apps 结果元数据

**背后诉求**：社区明显倾向于"加固可靠性 + 收敛历史欠账"，而非追求新功能，这与近期多次重构遗留的问题密切相关。

---

## 5. Bug 与稳定性

### 🔴 P1 严重 Bug（已有 fix PR）

| 缺陷 | 链接 | 状态 |
|---|---|---|
| **agent 在 Nvidia NIM 返回特定错误时停止工作** | [#5674](https://github.com/HKUDS/nanobot/issues/5674) | 新开 Issue，无 fix PR |
| session key 存在 path traversal 漏洞（`../../etc/passwd`） | [#5633](https://github.com/HKUDS/nanobot/pull/5633) | 已有 fix PR，待合并 |
| session 持久化阻塞 event loop | [#5580](https://github.com/HKUDS/nanobot/pull/5580) | 已有 fix PR，待合并 |
| 已丢弃的 session 在清理过程中"复活" | [#5589](https://github.com/HKUDS/nanobot/pull/5589) | 已有 fix PR，待合并 |

### 🟠 P2 中等 Bug（已有 fix PR 或正在处理）

| 缺陷 | 链接 |
|---|---|
| idle summary 缓存无界增长 | [#5664](https://github.com/HKUDS/nanobot/pull/5664) |
| WebUI 远程项目路径支持与 picker capabilities | [#5673](https://github.com/HKUDS/nanobot/pull/5673) |
| 通道分发异常边界未隔离（一条消息失败导致后台任务整体挂掉） | [#5457](https://github.com/HKUDS/nanobot/pull/5457) |
| Dream 内存文件缺少尺寸上限（#5622 修复的回归） | [#5630](https://github.com/HKUDS/nanobot/pull/5630) |
| WebUI 模型重试状态展示缺失 | [#5504](https://github.com/HKUDS/nanobot/pull/5504) |

**重点关注**：⚠️ **Issue #5674** —— 当 Nvidia NIM 返回 `timed out after 300s` / `timed out after 600s` 时，nanobot 误将其当作模型输出，导致 agent 整体停止。该 Bug 影响所有使用 Nvidia NIM 作为 Provider 的用户，建议维护者优先响应。

---

## 6. 功能请求与路线图信号

| 提案 | 链接 | 评估 |
|---|---|---|
| **gateway.heartbeat.modelOverride** —— 为心跳使用更便宜的模型 | [#4549](https://github.com/HKUDS/nanobot/pull/4549) | 长期开放、标签 `conflict`，可能撞车其他心跳相关 PR |
| **gateway.heartbeat.isolatedSession** —— 心跳可选用目标会话上下文 | [#4551](https://github.com/HKUDS/nanobot/pull/4551) | 与 #4549 同样长期开放且带 `conflict` 标签，两者合并路径需协调 |
| **签名直送 webhook** —— 受信系统绕过 agent loop 直接发送通知 | [#5652](https://github.com/HKUDS/nanobot/pull/5652) | 面向 CI/监控/计费场景，具备明确业务价值 |
| **spawn 模型预设白名单** | [#5561](https://github.com/HKUDS/nanobot/pull/5561) | 解决 #4231，与已废弃的 #4291 形成替代实现 |
| **MCP Apps 结果元数据保留** | [#5386](https://github.com/HKUDS/nanobot/pull/5386) | MCP 生态完善的关键一步 |

**路线图信号**：心跳机制（heartbeat）的两项配置 PR（#4549、#4551）已开放 **超过 2 个月** 且都带 `conflict` 标签，提示维护者需要做合并决策，否则可能成为长期积压。

---

## 7. 用户反馈摘要

⚠️ 今日唯一新开 Issue（[#5674](https://github.com/HKUDS/nanobot/issues/5674)）暂无评论，但描述中已透露清晰的真实用户痛点：

- **使用场景**：将 **Nvidia NIM** 作为 LLM Provider 的用户
- **痛点**：当 NIM 返回 `timed out after 300s/600s` 时，nanobot 没有将其识别为 Provider 错误，而是当作模型输出，导致 agent 整个停止工作，只能重启进程
- **诉求**：期望 nanobot 在 Provider 层做更严格的错误归类，避免错误消息被当作正常输出处理

这反映出用户对 **Provider 错误边界鲁棒性** 的需求，与今日已合并的"事件总线统一化"重构（#5670）方向一致——强化错误处理与消息通道隔离。

---

## 8. 待处理积压

以下 PR 创建已久且仍处于 OPEN 状态，建议维护者关注：

| PR | 标题 | 创建日期 | 已开放 |
|---|---|---|---|
| [#4549](https://github.com/HKUDS/nanobot/pull/4549) | feat(heartbeat): add model_override config | 2026-06-26 | **~71 天** ⚠️ |
| [#4551](https://github.com/HKUDS/nanobot/pull/4551) | feat(heartbeat): add isolated_session config | 2026-06-26 | **~71 天** ⚠️ |
| [#5386](https://github.com/HKUDS/nanobot/pull/5386) | feat(mcp): preserve MCP Apps result metadata | 2026-08-13 | ~24 天 |
| [#5457](https://github.com/HKUDS/nanobot/pull/5457) | fix(channels): scope dispatcher exception boundary | 2026-08-20 | ~17 天 |
| [#5471](https://github.com/HKUDS/nanobot/pull/5471) | fix(sdk): make ephemeral runs leave session state unchanged | 2026-08-21 | ~16 天 |

**维护建议**：#4549 与 #4551 同属心跳机制且互相 `conflict`，建议尽快协调合并方案，避免无限期悬挂。#5386（MCP Apps 元数据）已开放近一个月，对 MCP 生态推进较为关键。

---

## 项目健康度总评

| 维度 | 评分 | 说明 |
|---|---|---|
| 开发活跃度 | ⭐⭐⭐⭐ | 24h 内 24 次更新，节奏稳定 |
| 合并吞吐 | ⭐⭐⭐ | 7/23 = 30% 合并率，待合并积压较多 |
| 社区参与 | ⭐⭐⭐ | 集中于内部维护者（chengyongru 等），外部贡献有限 |
| 稳定性 | ⭐⭐⭐ | 多个 P1 bug 已具备 fix 但待合并，存在 Provider 错误处理盲点 |
| 长期积压 | ⚠️ | 2 个 PR 开放超 70 天，需维护者主动收敛 |

**总结**：NanoBot 当前处于"重构收尾 + 质量打磨"阶段，开发活跃度健康，但 PR 合并率与长期积压需关注。Issue #5674 暴露的 Provider 错误归类问题应优先处理。

---
*报告生成时间：2026-09-06 · 数据基于过去 24 小时 GitHub 公开活动*

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# ZeroClaw 项目动态日报

**日期**：2026-09-06
**项目**：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
**报告生成**：开源项目分析师 · AI 智能体赛道

---

## 1. 今日速览

ZeroClaw 今日处于**高强度迭代周期**：24 小时内合并/关闭 PR 10 条、关闭 Issues 2 条，同时仍有 40 个 PR 处于待合并状态，社区活跃度维持在高位。**v0.8.5 重大版本发布**，涵盖 454 个 commit 与 73 位贡献者，集中强化安全、连接性与运维体验。Issue 端增量很小（仅 1 条新开/活跃），但 PR 端涌入大量 security 与 channel 相关变更，说明核心团队与贡献者正围绕 v0.8.5 后的稳定性与安全边界进行密集打磨。整体项目健康度评估：**良好向优**，安全主题突出，版本节奏稳健。

---

## 2. 版本发布

### 🚀 v0.8.5 — 安全 / 连接性 / 运维体验发布

- **链接**：https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5
- **规模**：454 commits · 73 contributors
- **关键变更**：
  - 引入 **ZeroRelay** 与 **ZeroRouter**（推断为转发/路由新组件）
  - 扩展**实时聊天（live chat）**与**多 provider 接入能力**
  - 强化插件、沙箱（sandbox）、Webhook、凭据、文件访问边界
- **破坏性变更**：未在摘要中明确披露，建议查阅 release notes 与 CHANGELOG 确认 `SecurityPolicy`、`for_agent`、`[agents.<alias>]` 等关键接口是否调整。
- **迁移注意事项**：
  - 若使用自定义 `<install>/shared/` 路径，需关注 PR #10308 新增的 `can_use_shared_workspace` 默认 deny 策略
  - 若自定义 channel 注册，需配合 PR #10361 新增的 drift test 验证
  - 升级前建议在 staging 环境运行 `zeroclaw config migrate`（见 PR #10630 修复）

---

## 3. 项目进展

今日合并/关闭的 PR 共 10 条，重点进展如下：

| PR | 主题 | 影响 |
|---|---|---|
| [#10435](https://github.com/zeroclaw-labs/zeroclaw/pull/10435) | fix(providers): preserve Gemini 请求锚定时的模型上下文 | ✅ 已关闭 — 修复 Gemini provider 上下文丢失 |
| [#10064](https://github.com/zeroclaw-labs/zeroclaw/pull/10064) | fix(channels/telegram): 操作员点击后自毁审批卡片 | ✅ 已关闭 — Telegram UX 优化 |
| 其余 8 条 | 集中于 CI、文档、配置清理等维护性合并 | ✅ 全部关闭 |

**整体推进评估**：v0.8.5 发布当日，团队主动收尾历史 PR 并清理积压，`do-not-merge` 状态的 PR 暂无新增合并，表明对主干稳定性保持高度克制。下一波（v0.8.6 或 v0.9）的方向已经可以从 40 条待合并 PR 中看出端倪——**安全边界细化**与**多通道能力扩展**是两条主线。

---

## 4. 社区热点

### 🔥 长期跟踪型高优先级议题

- **[#8583 Tracker: channel/source shared-boundary cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/8583)** — 由 @Audacity88 维护的架构清理 tracker，自 2026-07-01 起持续推进，最新更新于昨日。**评论 6 条**，是当前 Issue 列表中互动最密集的。诉求集中在：channel、webhook、fan-in 源、streaming 模式应复用统一的生命周期、schema、流式协议、信任模型与配置骨架——典型的"消除子系统割裂"诉求。
- **[#10045 Bug: Persisted image markers 残留临时路径](https://github.com/zeroclaw-labs/zeroclaw/issues/10045)** — 严重度 S2，今日**已关闭**。修复后用户工作区中的图片附件不再因 `[IMAGE:...]` 标记引用临时源路径而反复告警。

### 🔥 待合并 PR 中的高关注议题

虽然 PR 评论数据为 `undefined`，但根据 **label 强度**与**作者权威度**，以下 PR 处于"被密切围观"状态：

- **[#10407 feat(sessions): 持久化会话 prompt 附件](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)**（@vrurg，XL）— SQLite-backed 长效 prompt 附件，4 个上限 + 单次审批默认开启，是 v0.8.x 之后会话管理的重要能力补全。
- **[#10337 fix(tools): Git 操作受限根目录](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)**（@vrurg，XL，security:policy）— 收紧 Git 工具路径执行边界，与 v0.8.5 的安全主线一脉相承。
- **[#10308 feat(config): per-agent `can_use_shared_workspace` 开关](https://github.com/zeroclaw-labs/zeroclaw/pull/10308)**（@JordanTheJet，distinguished contributor）— 把 shared workspace 降级为只读，按 agent 粒度开关。
- **[#9420 fix(anthropic): 支持存储的 OAuth profiles](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)**（@vrurg，trusted contributor，do-not-merge）— Anthropic 凭据管理与 ACL 重构，规模 XL，是 v0.9 候选核心。

**诉求分析**：社区对"边界（boundary）"的关注度极高——文件系统、凭据、provider、channel 四类边界同时在被加固，反映出用户对**多租户/多 agent 场景下安全默认**的迫切需求。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 编号 | 描述 | Fix 状态 |
|---|---|---|---|
| **High** | [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) | Git 工具未约束至授权根目录，子进程可能逃逸 | ⏳ PR 待合并（needs-author-action） |
| **High** | [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) | 会话 prompt 附件机制尚未落地 | ⏳ PR 待合并（needs-author-action） |
| **High** | [#10630](https://github.com/zeroclaw-labs/zeroclaw/pull/10630) | 降级配置提醒指向错误二进制 | ✅ 已提交，今日新建 |
| **High** | [#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) | Cron agent job 缺少 wall-clock 超时释放锁 | ⏳ 待合并（needs-author-action） |
| **High** | [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) | Anthropic 不完整终态响应被误判为成功空输出 | ⏳ 待合并（needs-author-action） |
| **Medium** | [#10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) | Telegram 群组未 @ 消息被 `mention_only` 误丢 | ⏳ 待合并（needs-author-action） |
| **Medium** | [#10435](https://github.com/zeroclaw-labs/zeroclaw/pull/10435) | Gemini 请求锚定时丢失模型上下文 | ✅ **已关闭** |
| **Medium** | [#10064](https://github.com/zeroclaw-labs/zeroclaw/pull/10064) | Telegram 审批卡片点击后未自毁 | ✅ **已关闭** |
| ~~S2~~ | ~~[#10045](https://github.com/zeroclaw-labs/zeroclaw/issues/10045)~~ | ~~图片标记残留临时路径~~ | ✅ **已关闭** |

**稳定性观察**：今日无新增崩溃/回归类报告，安全类 high 风险修复主要停留在"等待作者再处理"阶段，建议维护者集中审阅 `needs-author-action` 标记的 PR。

---

## 6. 功能请求与路线图信号

| 需求方向 | 代表 PR | 进入下版本的概率 |
|---|---|---|
| **多 channel 安全审批** | [#9997 Telegram 安全模型选择器](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)、[#10358 Mattermost 审批流](https://github.com/zeroclaw-labs/zeroclaw/pull/10358) | 🟡 中（do-not-merge，需架构收敛） |
| **Telegram 群组协作增强** | [#9772 `per_user_session` 开关](https://github.com/zeroclaw-labs/zeroclaw/pull/9772)、[#10640 passive group context](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) | 🟢 高（issue 驱动） |
| **Web 搜索扩展** | [#10356 AnySearch provider](https://github.com/zeroclaw-labs/zeroclaw/pull/10356) | 🟡 中（do-not-merge，待评审） |
| **会话上下文能力** | [#10407 持久化 prompt 附件](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) | 🟢 高（核心作者 + v0.8.x 主线） |
| **Anthropic 兼容性矩阵** | [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)、[#9272 refusal fallback](https://github.com/zeroclaw-labs/zeroclaw/pull/9272)、[#9420 OAuth profiles](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) | 🟢 高（3 个 XL PR 联动） |
| **Voice / TTS 跨通道** | [#10489 Matrix MSC3245 语音回复](https://github.com/zeroclaw-labs/zeroclaw/pull/10489) | 🟡 中（依赖 TtsManager 重构） |

**路线图信号**：v0.9 候选主题已可识别为 **"Anthropic 全面兼容 + 多 channel 安全审批 + 跨通道语音/会话上下文"** 三件套。

---

## 7. 用户反馈摘要

可从 Issues 评论中提炼的真实痛点（样本较小，仅供参考）：

- **痛点 A：channel/source 边界碎片化**（#8583, 6 条评论）
  - 用户场景：多通道（IM、webhook、自定义源）混合部署
  - 不满意：每个 channel 自带一套 lifecycle/schema 配置，维护成本陡增
  - 期望：统一抽象 + drift test 保证回归
- **痛点 B：图片附件残留告警噪音**（#10045, 1 条评论）
  - 场景：agent 处理临时文件型图片附件
  - 满意点：今日已修复，告警噪声问题闭环
- **痛点 C：CI 覆盖盲区**（#10361, 0 评论但 issue 描述明确）
  - 用户/维护者诉求：`channel-matrix` 库测试从未在 workspace test 中真正执行，仅编译通过

整体而言，**反馈风格偏工程化**，少见终端用户投诉，主要由维护者 @Audacity88 主动组织清理与回归测试。

---

## 8. 待处理积压

按维护者关注优先级提示：

| 编号 | 类型 | 状态 | 风险 | 提醒 |
|---|---|---|---|---|
| [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) | Telegram 安全模型选择器 | OPEN · blocked · **do-not-merge** | high | 创建 23 天，需 maintainer review |
| [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) | Telegram `per_user_session` | OPEN · blocked · **do-not-merge** | high | 创建 32 天 |
| [#10356](https://github.com/zeroclaw-labs/zeroclaw/pull/10356) | AnySearch provider | OPEN · blocked · **do-not-merge** | high | 创建 12 天 |
| [#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358) | Mattermost 审批流 | OPEN · blocked · **do-not-merge** | high | 创建 12 天 |
| [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) | Anthropic OAuth profiles | OPEN · blocked · **do-not-merge** | high | 创建 41 天，规模 XL，核心能力 |
| [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) | Git 工具边界 | OPEN · needs-author-action | high | 创建 12 天，安全关键 |
| [#8583](https://github.com/zeroclaw-labs/zeroclaw/issues/8583) | Tracker: 架构清理 | OPEN · in-progress | medium | 创建 67 天，是多份 PR 的协调中枢 |

**维护者建议**：优先审阅 `do-not-merge` + `blocked` + `risk:high` 的 PR 集群，避免积压跨越 v0.9 周期；同时对 `needs-author-action` 的高风险 PR（#10337、#9447、#9320、#10407）发送提醒 ping，提升 review 流转。

---

### 📌 报告小结

> ZeroClaw 在 v0.8.5 发布当日完成了关键的"安全 + 连接性 + 运维体验"组合升级，社区活跃度高位运行，安全边界细化是当下最核心的工程叙事。建议下一周期聚焦：(1) 解锁 6 个 `do-not-merge` 高风险 PR 的架构评审；(2) 推动 Anthropic 兼容性三件套（#9447 / #9272 / #9420）合并；(3) 集中清理 `needs-author-action` 标签下的高风险变更，避免安全债累积。

*本报告基于公开 GitHub 数据生成，数据时间窗口：2026-09-05 → 2026-09-06。*

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目动态日报

**日期：2026-09-06**
**数据周期：过去 24 小时**

---

## 1. 今日速览

PicoClaw 今日整体活跃度偏低，主要由历史遗留的"合并 PR"批量操作收尾构成。Issues 端仅有 1 条新增活跃帖与 1 条关闭，PR 端则集中关闭了 4 条由同一作者 @xuwei-xy 提交的旧 PR 合并请求（创建于 2026-03-14，已搁置近 6 个月），同时新开 1 条由外部贡献者提交的文档增强 PR。无新版本发布，社区推进以"清理积压"为主旋律。

---

## 2. 版本发布

**无新版本发布。** 过去 24 小时未检测到任何 Release 标签变动。

---

## 3. 项目进展

今日合并/关闭的 PR 呈现明显的"清理历史 PR 队列"特征：

- **[#1559](https://github.com/sipeed/picoclaw/pull/1559)**、`#1545`、`#1555`、`#1541`（均关闭）：由 @xuwei-xy 提交，统一以 "fix: merge PR #xxx" 形式批量打包旧 PR 改动，涵盖：
  - `#1541` 涉及媒体临时目录集中化（`pkg/media/tempdir.go`）、渠道 DoS 加固、DeepWiki 徽章；
  - 其他合并包涉及多项历史修复。

⚠️ **需要关注**：这些 PR 创建于 2026-03-14，今日一次性关闭而**未合并**，意味着这些修复方案未被官方采纳，可能是维护者认为应走常规单 PR 流程而非打包合并。后续是否会有替代 PR 跟进值得观察。

- **[#3368](https://github.com/sipeed/picoclaw/pull/3368)**（OPEN，文档）：由 @georgeatparallel 新提交，向 CLI 指南补充 Parallel Search MCP 配置示例，为 PicoClaw 提供免账号/免 API Key 的网页搜索与页面提取能力，文档清晰说明向 Parallel 发送的数据范围。

整体而言，项目今日在代码层面**净进展有限**，但文档生态有小幅扩展。

---

## 4. 社区热点

今日评论/关注度最高的是以下两条：

- **[Issue #3287 - Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)**（OPEN）
  - 10 条评论，最后更新于 2026-09-05
  - **核心诉求**：IRCv3 协议默认限制单条消息 512 字节，长消息会被客户端自动拆分。@superuser-does 希望 PicoClaw 能将拆分后的片段识别为同一条消息进行连贯处理。
  - 这是 IRC 集成用户的经典痛点，反映项目在非主流渠道（IRC）上的稳健性仍有提升空间。

- **[Issue #3342 - Opt-in "after-turn" steering mode](https://github.com/sipeed/picoclaw/issues/3342)**（CLOSED，stale）
  - 2 条评论，标签 `[stale]`
  - 因长期未更新被自动归档，**社区诉求未得到实质响应**。诉求是希望提供一种"后置转向"模式：用户中途发消息时，不立即打断当前 turn，而是排队等待当前 turn 结束后再注入。

---

## 5. Bug 与稳定性

今日未直接报告新的崩溃或回归 Bug。但有两个稳定性相关信号需留意：

1. **PR #1541 曾包含的渠道 DoS 加固**（channel DoS hardening）：该批量化 PR 被关闭后，相关加固代码是否已被其他途径合入主线不明确。建议维护者确认 DoS 防护是否仍在生效路径上。
2. **IRC 长消息拆分问题**（Issue #3287）本质上是消息边界解析的鲁棒性问题，在高频 IRC 场景下可能引发上下文错乱。

🔗 [Issue #3287](https://github.com/sipeed/picoclaw/issues/3287)

---

## 6. 功能请求与路线图信号

| 需求 | 链接 | 可能性评估 |
|---|---|---|
| IRC 长消息连贯处理 | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | 中等 - 10 条评论说明有一定社区关注，但 0 点赞（👍:0）表明尚未形成广泛共识 |
| After-turn 转向模式 | [#3342](https://github.com/sipeed/picoclaw/issues/3342) | 低 - 已因 stale 被关闭，除非作者复活否则进入"待重新提案"状态 |
| Parallel Search MCP 集成（文档） | [#3368](https://github.com/sipeed/picoclaw/pull/3368) | 高 - 已是 PR 形式且为文档增强，合并阻力较小 |

**路线图信号**：项目当前似乎更倾向于"轻量 MCP 工具集成 + 文档完善"路径，而非大型功能改造。

---

## 7. 用户反馈摘要

从有限数据中可提炼：

- **🎯 IRC 用户群体存在但被低估**：Issue #3287 长达 10 条讨论表明有人在生产场景使用 PicoClaw 的 IRC 集成，且遇到切实障碍。
- **😕 "steering 打断 turn"体验不佳**（Issue #3342）：用户认为当前把中途消息当作"中途纠偏"过于激进，会跳过 task #1 的剩余工具调用，体验突兀。
- **👍 外部贡献者活跃**（PR #3368）：@georgeatparallel 主动补充文档，提示社区生态正在向"扩展 MCP 工具"方向自然生长。
- **🤔 批量合并 PR 模式遇冷**（#1559/#1545/#1555/#1541）：维护者未接受"打包合并"工作流，可能希望贡献者按惯例逐 PR 提交。

---

## 8. 待处理积压

| 类型 | ID | 创建时间 | 状态 |
|---|---|---|---|
| Issue（讨论中） | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | 2026-07-22 | 持续 10 条评论未落地 |
| Issue（已关闭） | [#3342](https://github.com/sipeed/picoclaw/issues/3342) | 2026-08-21 | 因 stale 关闭，诉求悬空 |
| PR（已关闭） | #1541, #1545, #1555, #1559 | 2026-03-14 | 搁置 175 天后批量关闭，未合并 |

⏰ **提醒维护者**：Issue #3287 是当前社区讨论密度最高的活跃帖，已超过 6 周未见明确技术响应，建议排入下一迭代评估。

---

## 📊 项目健康度速览

| 维度 | 评估 |
|---|---|
| 代码活跃度 | 🟡 中低 - 主要为历史 PR 收尾 |
| 社区参与度 | 🟡 中 - 外部贡献者有提交，但维护者反馈节奏慢 |
| 响应及时性 | 🟠 偏低 - stale 机制触发关闭，存在超期未响应 |
| 文档建设 | 🟢 健康 - 有新文档 PR 持续涌入 |
| 整体推进 | 🟡 缓慢 - 净代码变化有限 |

---

*本日报基于 GitHub 公开数据自动生成，数据时间为 2026-09-06。*

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报

**日期**：2026-09-06
**数据周期**：过去 24 小时

---

## 1. 今日速览

NanoClaw 今日活跃度处于**低-中位区间**：过去 24 小时无新 Issue 提交，但仓库保持持续推进节奏，共有 4 条 PR 更新（3 条待合并、1 条已关闭），无新版本发布。值得关注的是，今日关闭的 PR #2403（CI 版本发布流程重构）是一个**长达近 4 个月的长期沉淀项**终于被清理，说明维护团队正在对仓库历史债务做系统性收尾；同时待合并 PR 集中在**依赖稳定性修复、测试基础设施清理、文档过期内容更新**三个方向，呈现出"维护型提交"特征。整体而言，项目处于稳健的日常维护阶段，无突发热点。

---

## 2. 版本发布

本周期内无新版本发布。

---

## 3. 项目进展

### ✅ 已合并/关闭

**PR #2403 — CI 版本发布流程重构** [🔗 链接](https://github.com/nanocoai/nanoclaw/pull/2403)
- **作者**：@glifocat
- **跨度**：2026-05-10 创建 → 2026-09-05 关闭（约 4 个月）
- **内容**：将 `bump-version` 流程替换为显式的 Release workflow，并加入 **concurrency guard（并发锁）**，避免 CI 在并发场景下产生版本号竞态或重复发布
- **意义**：这是一项**基础设施级改进**，直接提升发布流水线的确定性。在 AI Agent 类项目快速迭代的背景下，稳定的版本号管理是供应链可信度的基石

### 🔄 关键待合并 PR

| PR | 方向 | 价值点 |
|---|---|---|
| [#3725](https://github.com/nanocoai/nanoclaw/pull/3725) | Linux 安装依赖修复 | 将 signal-cli 从有缺陷的 0.14.3 升级到 0.14.7，修复"向无会话联系人发送消息时永久挂起"的严重问题 |
| [#3710](https://github.com/nanocoai/nanoclaw/pull/3710) | 测试卫生 | 清理 `pnpm test` 在 OS 临时目录留下的 ~355 个临时目录，降低长周期 dev box 与 CI runner 的存储压力 |
| [#3724](https://github.com/nanocoai/nanoclaw/pull/3724) | 文档时效性 | 更新 `add-opencode` skill 中已退役的 Anthropic 模型 ID |

**整体推进评估**：今日仓库**净推进 1 项长期基础设施改进**（#2403），并有 3 项短平快的维护性修复在排队。功能层面无重大变化，项目处于**稳定运维周期**。

---

## 4. 社区热点

本周期内 Issues/PRs 的评论数与反应数均处于低位（多为 0），未形成显著讨论热点。从议题关注度排序：

1. **PR #3725**（signal-cli 修复）— 涉及 Linux 安装链路，影响所有新部署用户，是潜在"装机即挂"类问题的根因
2. **PR #3710**（临时目录清理）— 跨 5 个 area 标签（channels、containers、ncl-cli、setup-installation、skills），说明其影响面广
3. **PR #2403**（CI Release 流程）— 维护工程范畴，对外部用户不可见，但对生态合作方重要

**社区诉求信号**：今日无新 Issue 提交，**社区反馈通道处于静默状态**，无法从 Issues 评论中观察到用户痛点。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 P0 — 装机级阻塞（已有 Fix PR）

**signal-cli 0.14.3 永久挂起 Bug**
- **影响范围**：所有通过 `setup/install-signal-cli.sh` 在 Linux 上进行全新 Signal 集成的用户
- **触发条件**：向**没有现有会话的联系人**发送消息时，进程会无限挂起
- **修复状态**：✅ 已有 PR [#3725](https://github.com/nanocoai/nanoclaw/pull/3725) 锁定至 0.14.7，待合并
- **风险点**：若该 PR 未及时合并，新用户仍可能踩坑

### 🟡 P2 — 卫生类问题（已有 Fix PR）

**测试套件残留临时目录**
- **影响范围**：长周期 dev box、持久化 CI runner
- **现象**：每次 `pnpm test` 在 OS 临时目录遗留约 355 个目录
- **修复状态**：✅ 已有 PR [#3710](https://github.com/nanocoai/nanoclaw/pull/3710) 待合并

### 🟢 P3 — 文档过期

**已退役的 Anthropic 模型 ID**
- **影响**：在 `add-opencode` skill 中引导用户使用 `claude-sonnet-4-20250514`，但该 ID 已于 2026-06-15 退役
- **修复状态**：✅ 已有 PR [#3724](https://github.com/nanocoai/nanoclaw/pull/3724) 更新至 `claude-sonnet-5`

**稳定性总评**：所有已知 Bug 均已有对应 Fix PR 排队等待合并，**无悬空缺陷**。

---

## 6. 功能请求与路线图信号

本周期内**无新增功能请求或 Issue 提交**，无法直接捕捉社区的新需求方向。

从已开放的 PR 中可观察到的路线图信号：
- **CI/CD 工程化深化**：PR #2403 反映出维护团队对**发布流程可控性**的持续投入，未来可能进一步规范化（如自动 changelog 校验、签名、SBOM 等）
- **测试基础设施治理**：PR #3710 触及多 area 标签，提示后续可能展开更系统的**测试清理与隔离机制**

---

## 7. 用户反馈摘要

本周期内 Issues 评论为 0、PR 评论亦接近 0，**无真实用户反馈可供提炼**。这一静默状态需要从两个维度解读：

- **积极面**：仓库当前无明显用户痛点爆发，常见问题已被修复
- **风险面**：缺少社区反馈可能掩盖边缘场景问题，建议维护者主动回顾近 7 日的 Discussions / 外部社区（Discord、Reddit 等）

---

## 8. 待处理积压

### ⏰ 长期未响应提醒

| 类别 | 标识 | 提醒 |
|---|---|---|
| 跨季度 PR | #2403 | 已在今日关闭 ✅，无需跟进 |
| 待合并维护 PR | #3725、#3710、#3724 | 三条均为低风险维护性改动，建议**批量合并**以减少积压 |
| Issue 入口 | — | 过去 24 小时无新 Issue，但需留意是否仍有**长期未回复**的存量 Issue（本次数据未提供完整列表） |

### 🛎️ 给维护者的建议

1. **优先合并 PR #3725**：signal-cli 挂起属于"装机即坏"类问题，发布风险高于其他两项
2. **批量处理 #3710 + #3724**：两者互不冲突，可一并合入减少 review 负担
3. **关注 Issue 静默期**：连续 24 小时 0 Issue 值得警惕，建议主动核查用户上报渠道是否畅通

---

## 项目健康度总评

| 维度 | 评分 | 说明 |
|---|---|---|
| 提交活跃度 | ⭐⭐⭐☆☆ | 4 条 PR 更新，无 Issue，无 Release |
| 缺陷修复响应 | ⭐⭐⭐⭐☆ | 所有 Bug 均有对应 Fix PR，但合并节奏待提速 |
| 社区互动 | ⭐⭐☆☆☆ | 评论与反应数极低，信号不足 |
| 工程卫生 | ⭐⭐⭐⭐☆ | 主动清理测试残留、升级依赖版本、修正文档 |
| 长期债务管理 | ⭐⭐⭐⭐☆ | 4 个月龄 PR 终于清理，趋势向好 |

**结论**：NanoClaw 当前处于**稳定的工程维护周期**，无重大风险敞口，建议维护者聚焦于**推进积压 PR 合并**与**主动激活社区反馈通道**。

---

*数据来源：GitHub REST API · 报告生成时间：2026-09-06*

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报

**日期：2026-09-06**
**数据来源：** GitHub 仓库 [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日速览

IronClaw 今日整体处于**中等活跃的迭代修复状态**，无新版本发布。过去 24 小时共有 3 条 Issue 更新和 5 条 PR 更新，工作重心集中在 **Telegram 集成的人机交互文案与配对流程优化** 上，3 条 PR 已合并/关闭，多个长期遗留的连接提示与配对体验缺陷得到集中治理。此外一项将嵌入式 Pi 沙箱作为默认启动配置的 XL 级功能 PR 处于待评审阶段，预示着沙箱架构即将发生默认行为变更。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日有 2 条 PR 完成合并/关闭，均属于"用户体验文案精准化"方向：

- **[#8054](https://github.com/nearai/ironclaw/pull/8054)** — `fix(assistant): check pairing before command admission so first contact gets the connect notice`
  将配对/绑定查询前置到命令准入检查之前，修复未配对 Telegram 用户首次接触时被错误地回复"可用命令清单"而非"连接/配对提示"的根因。这是面向首次接触用户的关键体验修复。

- **[#8073](https://github.com/nearai/ironclaw/pull/8073)** — `fix(device-link): say "not configured by administrator" instead of blaming the user's account`
  Telegram 个人账户链接失败时，原错误信息将问题归咎于用户账户；现已改为指向"管理员未配置 api_id/api_hash"，降低了用户侧排查噪音。

这两项合并表明团队正在系统性地清理与"配对/连接/管理员配置"相关的错误信息，使错误归因更精准，整体向前迈进了**实质的一步**。

---

## 4. 社区热点

| 排名 | 编号 | 标题 | 评论 / 👍 |
|------|------|------|-----------|
| 1 | [#8074](https://github.com/nearai/ironclaw/issues/8074) | Paired user's rejected action in a not-connected shared channel gets the pairing notice copy instead of channel-not-connected copy | 1 / 0 |
| 2 | [#7955](https://github.com/nearai/ironclaw/issues/7955) | Telegram personal-account linking shows a generic "Something went wrong" when admin has not configured api_id/api_hash | 0 / 0 |
| 3 | [#7956](https://github.com/nearai/ironclaw/issues/7956) | Telegram unpaired sender's /start gets command inventory instead of connect/pairing notice | 0 / 0 |

**诉求分析：** 当前社区热度集中在 **Telegram 渠道的文案与配对流程**。三个 Issue 共同指向一个核心诉求——**不同用户状态（未配对 / 已配对 / 管理员未配置）应当看到精准、有针对性且归因正确的提示信息**，而非通用错误或与场景不符的提示。这表明用户对"产品是否能引导我正确完成首次接入"高度敏感。

---

## 5. Bug 与稳定性

| 严重程度 | 编号 | 描述 | 是否已有 fix PR |
|----------|------|------|------------------|
| 中 | [#8074](https://github.com/nearai/ironclaw/issues/8074) | 已配对用户在未连接的共享频道中收到错误的"未配对"文案 | ❌ 暂未关联 PR（Open） |
| 中 | [#7955](https://github.com/nearai/ironclaw/issues/7955) | 管理员未配置 Telegram MTProto 时显示通用"Something went wrong" | ✅ 已通过 [#8073](https://github.com/nearai/ironclaw/pull/8073) 修复（CLOSED） |
| 中 | [#7956](https://github.com/nearai/ironclaw/issues/7956) | 未配对用户的 `/start` 收到命令清单而非配对提示 | ✅ 已通过 [#8054](https://github.com/nearai/ironclaw/pull/8054) 修复（CLOSED） |

**稳定性评估：** 当日无崩溃或回归类 Bug 报告。所有报告的问题均集中在**错误信息文案与配对/连接流**上，属于体验类缺陷而非功能性故障。**Bug 修复率较高（2/3 已通过今日 PR 解决）**，响应效率良好。

---

## 6. 功能请求与路线图信号

- **嵌入式 Pi 沙箱作为默认启动配置** — [#8075](https://github.com/nearai/ironclaw/pull/8075)（XL 级，Open）
  添加 Bun/Pi agent-core worker 到沙箱镜像并设为默认启动档，明确说明为基准测试所需。这是即将到来的**重大默认行为变更**，需关注其依赖 PR [#7908](https://github.com/nearai/ironclaw/pull/7908) 的合并进度。

- **Telegram Bot API 命令菜单注册** — [#8072](https://github.com/nearai/ironclaw/pull/8072)（L 级，Open）
  在扩展激活时通过 `setMyCommands` 自动注册 `/model`、`/status`、`/new`、`/stop`、`/interrupt` 到聊天菜单按钮，关闭时调用 `deleteMyCommands`。属于功能增强，**有望在下一版本纳入**。

- **代码库知识图谱刷新** — [#7988](https://github.com/nearai/ironclaw/pull/7988)（XS 级，Open）
  由 nightly CI 生成的常规基础设施更新，**几乎肯定会合并**。

---

## 7. 用户反馈摘要

由于今日 Issue 评论数普遍为 0–1，可提炼的真实用户痛点有限，主要来自 [#8074](https://github.com/nearai/ironclaw/issues/8074) 的描述与 [#7955](https://github.com/nearai/ironclaw/issues/7955) 的截图：

- **痛点一：错误信息归因错位**
  用户在 Telegram 个人账户链接失败时，会先怀疑自己账户出问题，被迫反复排查；改为"管理员未配置"后才意识到是部署侧问题。**用户期望更精准的错误归因，以减少自助排查时间。**

- **痛点二：共享频道状态下的文案混乱**
  已配对用户在"未连接"共享频道中被引导去"配对"，造成体验断点。**用户期望系统能区分用户状态与频道状态，给出有针对性的下一步动作建议。**

- **痛点三：首次接触体验不友好**
  未配对用户首次 `/start` 收到的是命令清单而非引导。**用户（尤其是非技术背景）期望在首次接触时被引导完成配对，而非面对一份看不懂的命令索引。**

目前未观察到明显的满意/不满意情绪对立，整体反馈聚焦于**首次接触与边缘场景下的引导质量**。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 状态 | 关注建议 |
|------|------|------|------|----------|
| Issue | [#8074](https://github.com/nearai/ironclaw/issues/8074) | Paired user's rejected action in a not-connected shared channel gets pairing copy | Open | **建议优先处理**，文案精准度问题已形成系列，需统一规划 |
| PR | [#8075](https://github.com/nearai/ironclaw/pull/8075) | feat: make the embedded Pi sandbox loop the startup default | Open（XL） | **阻塞依赖 #7908**，需维护者协调基准测试窗口与合并节奏 |
| PR | [#8072](https://github.com/nearai/ironclaw/pull/8072) | feat(telegram): register the Bot API command menu at activation | Open（L） | 用户体验增益明显，建议在下一版本窗口评估合并 |
| PR | [#7988](https://github.com/nearai/ironclaw/pull/7988) | chore(agents): refresh codebase knowledge graph | Open（XS） | 常规 CI 产物，**低风险可快速合并** |

---

## 项目健康度总结

- **活跃度：** 中等偏高，5 条 PR + 3 条 Issue，单日工作量集中在体验修复。
- **响应速度：** 良好，2 条历史 Bug 在同日得到对应 PR 关闭。
- **架构演进：** Pi 沙箱默认化提案进入评审后期，是近期最值得关注的架构信号。
- **风险点：** [#8075](https://github.com/nearai/ironclaw/pull/8075) 涉及默认启动行为变更，需关注其依赖链路与基准测试数据。
- **社区氛围：** 暂未观察到争议性讨论，反馈理性、建设性。

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报

**报告日期**：2026-09-06
**数据周期**：过去 24 小时
**项目地址**：https://github.com/netease-youdao/LobsterAI

---

## 1. 今日速览

LobsterAI 项目今日整体活跃度较低，处于 **静默期**。过去 24 小时内无新 Issue 提交、无新版本发布，仅有 2 条历史 PR 在后台被系统标记更新。两条 PR 均来自 2026-03-30，至今已超过 5 个月仍处于 `[OPEN]` 且被标记为 `[stale]`，表明项目当前的协作节奏放缓，社区维护与代码审查流程存在明显积压。整体而言，项目处于低活跃度的待整理状态，建议维护者关注积压 PR 的处置。

---

## 2. 版本发布

**今日无新版本发布。**

最近一次版本发布信息未在本次数据范围内体现。如需了解完整发布历史，请访问 [Releases 页面](https://github.com/netease-youdao/LobsterAI/releases)。

---

## 3. 项目进展

今日无新增合并或关闭的 PR，项目代码主分支无实质性推进。

从历史数据看，仓库中有两条与 **Cowork 会话模块** 相关的待合并 PR（详见下文），但均未在 24 小时内产生合并事件，因此项目今日在代码层面 **未向前推进任何新功能或修复**。

---

## 4. 社区热点

今日无新增讨论，无评论活跃的 Issue 或 PR。

近 24 小时内唯一产生更新的两条 PR 均为后台元数据刷新（如 stale 标记或心跳更新），无新的代码评审、评论或评审意见提交。以下为近期仍处于 Open 状态的代表性 PR，供关注项目方向的读者参考：

- **PR [#1069](https://github.com/netease-youdao/LobsterAI/pull/1069)** — 重构：`CoworkSessionDetail` 单文件拆分
  - 作者：@stone333
  - 创建于 2026-03-30，更新于 2026-09-05
  - 背景：`CoworkSessionDetail.tsx` 已膨胀至 2100+ 行，职责过重、存在不必要的重渲染，且纯函数与 UI 逻辑混杂
  - 价值：若合并，将显著提升对话页面的可维护性、渲染性能与单元测试覆盖能力

- **PR [#1070](https://github.com/netease-youdao/LobsterAI/pull/1070)** — feat(cowork)：支持 per-session MCP 开关控制
  - 作者：@vdorchan
  - 创建于 2026-03-30，更新于 2026-09-05
  - 背景：当前 MCP server 仅支持全局开关，无法满足多场景独立配置需求
  - 价值：若合并，将为 OpenClaw 引擎带来更细粒度的 MCP 控制能力，是桌面级 Agent 的重要功能扩展

---

## 5. Bug 与稳定性

**今日无新增 Bug 报告、崩溃报告或回归问题。**

过去 24 小时未产生任何与稳定性相关的 Issue 提交。从这一现象无法直接判定项目稳定性良好，更可能是 **用户反馈渠道当前处于静默状态**。建议结合 CI/CD 状态、近期 Release notes 综合判断稳定性趋势。

---

## 6. 功能请求与路线图信号

今日无新增功能请求 Issue。

不过从仓库内仍处于 Open 状态的两条 PR 可看出 **路线图候选方向**：

| 方向 | 对应 PR | 战略意义 |
|---|---|---|
| Cowork 模块架构治理 | [#1069](https://github.com/netease-youdao/LobsterAI/pull/1069) | 解决核心组件技术债，为后续功能迭代铺路 |
| MCP 细粒度控制 | [#1070](https://github.com/netease-youdao/LobsterAI/pull/1070) | 强化 OpenClaw 生态下桌面 Agent 的差异化能力 |

两条 PR 均契合"AI 智能体与个人 AI 助手"的核心定位，且能直接改善用户体验，具备进入下一版本的潜力。但因当前 stale 状态，纳入时间表尚不明朗。

---

## 7. 用户反馈摘要

今日 Issues 与 PRs 评论区均无新增评论内容，**无法从用户反馈维度提炼真实痛点或使用场景**。

建议维护者主动通过社区渠道（如 Discussions、用户群）回收反馈，以弥补 Issue/PR 渠道当前的静默。

---

## 8. 待处理积压

以下两项需维护者重点关注：

- **[PR #1069](https://github.com/netease-youdao/LobsterAI/pull/1069) — 已 Stale 约 5 个月**
  - 重构性质 PR，鉴于其涉及技术债清理，建议优先 Review 与合并，避免与未来 Cowork 模块改动产生冲突

- **[PR #1070](https://github.com/netease-youdao/LobsterAI/pull/1070) — 已 Stale 约 5 个月**
  - 功能增强 PR，涉及数据库持久化层与 OpenClaw 引擎 `McpBridgeServer` 请求拦截改动，合并复杂度较高，建议作者与维护者同步推进

**维护建议**：
1. 为两条 Stale PR 给出明确处置决策（合并 / 关闭 / 拆分），避免长期悬而未决
2. 若计划合并，建议在 Review 前确认与当前 main 分支的兼容性，并补充 CI 测试覆盖
3. 在项目主页或 README 增加贡献状态说明，提升社区透明度

---

## 健康度总结

| 维度 | 状态 | 说明 |
|------|------|------|
| 代码活跃度 | 🟡 低 | 无新增/合并 PR |
| Issue 响应 | ⚪ 无数据 | 24 小时内无 Issue 活动 |
| 社区互动 | 🔴 待改善 | 关键 PR 评论数为 0，长期 Stale |
| 版本节奏 | ⚪ 无数据 | 24 小时内无新版本 |
| 技术债治理 | 🟡 关注中 | PR #1069 待处置 |
| 路线图清晰度 | 🟡 待明确 | 两条候选 PR 未排期 |

**结论**：LobsterAI 今日处于明显的低活跃期，社区反馈与代码评审流程均处于静默状态。维护者宜借此窗口清理积压 PR、稳定主干，并为下一轮迭代做准备。

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目日报
**日期：2026-09-06**

---

## 1. 今日速览

Moltis 项目在 2026-09-06 整体活跃度处于**低位运行**状态。过去 24 小时内仓库仅出现 1 条新增 Issue，无 PR 提交，无版本发布，属于典型的"观察日"模式。该 Issue 属于 enhancement 类功能请求，尚未引发社区讨论（评论数 0、点赞 0）。整体而言，项目进入功能打磨与用户反馈收集阶段，无重大代码合入或版本交付事件。考虑到项目仍持续接收来自社区的增强请求，说明用户参与度依然健康，长期发展势头良好。

---

## 2. 版本发布

无新版本发布，跳过此节。

---

## 3. 项目进展

今日无 PR 合并或关闭记录，代码层面无实质性推进。

---

## 4. 社区热点

今日仅产生 1 条 Issue，社区讨论度较低，但该 Issue 反映了 AI 助手领域的一个共性需求，值得关注：

- **[#1259 - Configurable default reasoning/thinking level (persist across sessions)](https://github.com/moltis-org/moltis/issues/1259)** by @Scentedtiger（创建 2026-09-05）
  - **分类**：enhancement / Feature Request
  - **热度**：0 评论、0 点赞（尚未发酵）
  - **诉求分析**：用户希望能够配置默认的推理/思考等级，并希望该配置在会话之间持久化保存。这反映出当前会话级 reasoning 设置每次都需要重新设定的痛点，属于典型的"高频重复操作"优化请求。对于 AI 智能体/个人助手类产品而言，个性化配置的持久化是提升用户体验的关键环节之一。

---

## 5. Bug 与稳定性

今日未报告任何 Bug、崩溃或回归问题。仓库稳定性层面保持沉默状态——即无新故障报告，但也无相关讨论热度。建议维护者留意后续是否有用户补充复现路径或相关回归报告。

---

## 6. 功能请求与路线图信号

**唯一信号：[#1259 - 可配置的默认推理/思考等级](https://github.com/moltis-org/moltis/issues/1259)**

该请求的核心要点：
- 用户希望能**全局设置**默认 reasoning/thinking 等级（而非每次会话手动调整）
- 配置需**跨会话持久化**
- 降低用户每次启用高级推理能力的重复操作成本

**纳入下一版本的可能性评估**：
- **可能性：中等偏高**。该需求属于体验型增强，技术实现门槛相对较低（通常为配置持久化层扩展），且具备明确的使用场景。
- **建议关注点**：维护者可考虑在配置系统中新增 `default_reasoning_level` 字段，并在 `settings` schema 中加入对应项。
- **附加价值**：若与未来可能推出的"用户配置文件（profiles）"功能结合，会形成更完整的个性化体系。

目前无相关 PR 提交，处于"待响应"状态。

---

## 7. 用户反馈摘要

由于今日 Issues 评论为 0，暂无直接的用户文本反馈可提炼。但从 [#1259](https://github.com/moltis-org/moltis/issues/1259) 的描述可推断：

- **痛点**：用户在使用 Moltis 进行复杂任务时，每次都需要重新设置 reasoning/thinking 等级，操作冗余。
- **使用场景**：用户大概率是**频繁使用高级推理能力**的重度用户（开发者、研究人员、复杂任务处理者）。
- **满意度信号**：该用户能主动撰写详细的 enhancement 请求（包含 preflight checklist 完整勾选），表明对项目保持关注与认可，而非流失型用户。

---

## 8. 待处理积压

- **[#1259](https://github.com/moltis-org/moltis/issues/1259)**：创建于 2026-09-05，发布 24 小时内尚无维护者响应或标签添加。建议维护者：① 标记 `enhancement` 标签；② 评估技术可行性；③ 在评论区给出初步意向（accept/needs-discussion/deferred）。
- 由于近 24 小时 Issue/PR 总量极少，建议同时检查是否有**超过 30 天未响应**的存量 Issue，以避免社区响应度下滑。

---

### 📊 项目健康度总评

| 维度 | 状态 | 说明 |
|------|------|------|
| 代码活跃度 | 🟡 低 | 无 PR、无合并 |
| 社区参与度 | 🟢 正常 | 有新 Issue 提交 |
| 发布节奏 | ⚪ 无新版本 | 处于间歇期 |
| 稳定性 | 🟢 良好 | 无 Bug 报告 |
| 响应及时性 | 🟡 待观察 | #1259 尚未获维护者响应 |

**整体判断**：项目处于稳健运行中的"静默期"，未出现异常信号。维护者建议主动响应 #1259 等社区请求，以保持良好的开源协作节奏。

---

*数据来源：[Moltis GitHub Repository](https://github.com/moltis-org/moltis) · 统计周期：2026-09-05 至 2026-09-06（UTC）*

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报

**日期：2026-09-06**
**项目：[CoPaw](https://github.com/agentscope-ai/CoPaw)（原 QwenPaw）**

---

## 1. 今日速览

过去 24 小时项目保持中等活跃度：共产生 10 条 Issue 更新（7 新开/活跃、3 已关闭）和 4 条 PR 更新（均待合并），无新版本发布。社区议题聚焦在 **img-gen 技能的两个 HTTP 错误修复**（同日报内闭环）、**RetryChatModel 上下文窗口硬编码导致的回归 Bug**、**QwenPaw Hub 多租户版的需求征集** 等方向。整体来看，2.2.0 版本临近（议题反复提及 v2.1.0–v2.2.0），维护节奏稳定，但仍存在如异常栈丢失（#7572）等可观测性问题需要关注。

---

## 2. 版本发布

**无新版本发布。**

最近相关动作是 PR #7337（`ModelInfo.max_tokens` → `max_output_length` 迁移），该变更已并入主线，但意外引发自定义提供商加载失败（#7474，今日已关闭）。

---

## 3. 项目进展

过去 24 小时无 PR 被合并/关闭。值得关注的推进信号：

- **img-gen 技能两个相关 Bug 已被关闭**（#7574、#7575），均由 @zztdandan 报告，疑似已通过直接修复或关联 PR 解决。
- **PR #7337 触发的回归 Bug（#7474）已被关闭**，意味着自定义提供商 `ModelInfo` 字段迁移问题已修复。
- 4 个待合并 PR 均处于推进阶段，但尚未落地：
  - #7509 [Ready for Merge] — make-skill v2 工作流重构
  - #7569 — 新增 Advisor Mode（双模型协作）
  - #6874 [Under Review] — MCP 工具调用超时配置
  - #7486 — Creator 1.1.2 大型功能合集

> 进度评估：今日主线净推进有限，但 bug 修复闭环率较高（3/3 已关闭 Issue 均为 Bug 类），质量闭环顺畅。

---

## 4. 社区热点

### #7318 ⭐ 最热讨论 — QwenPaw Hub 多租户版需求征集
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/7318
- 作者：@rayrayraykk | 评论数：**23** | 👍：3
- **关键信号**：项目从个人 AI 助手向团队/多租户方向扩展，2.2.0 将发布 Hub 版本。社区诉求集中于：
  - 多用户访问与管理员统一管理 skills（关联 #2324）
  - 共享工作空间、权限分级、审计日志
  - 集中部署与运维
- **战略意义**：这是项目从"个人工具"迈向"平台型产品"的标志性议题，社区反响强烈。

### #7557 — Skill 版本与依赖元数据
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/7557
- 作者：@laob9444 | 评论数：2 | 👍：0
- **痛点**：9 个 agent 的多工作空间部署中，同一 skill 多份拷贝无法追溯版本，升级混乱。提议在 `SKILL.md` 增加元数据头（类似 `package.json`）或单独的 `skill.yaml`。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | `RetryChatModel.__init__` 中 `context_size` 硬编码回退为 **32768**，导致**所有模型**触发 `CONTEXT_UNFIT` (>31130 tokens)；影响 **v2.1.0 至 v2.2.0 全部已发布版本** | OPEN，无 fix PR |
| 🟠 中 | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572) | `tool_calls/_coordinator.py` 的 `_drain()` 中 `except Exception` 仅返回 `str(exc)`，未 `logger.exception()` 也不重抛，**故障现场完全不可观测** | OPEN，无 fix PR |
| 🟡 中 | [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) | Agent 记忆失效：被反复告知"TODO 文件只允许出现在 B 路径"，数日后仍会在 A/B/C 路径产生；插件开发模式从 A 跑到 C，覆盖运行时文件 | OPEN，无 fix PR（更偏行为/系统约束问题） |
| 🟢 低 | [#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474) | PR #7337 合并后自定义 provider 加载失败（`max_tokens` → `max_output_length` 字段迁移遗漏） | ✅ 已关闭 |
| 🟢 低 | [#7574](https://github.com/agentscope-ai/QwenPaw/issues/7574) | `openai_images.py` 的 `generate()/edit()` 未传 `model` 字段，触发 HTTP 503 并回退到 `dall-e-2` | ✅ 已关闭 |
| 🟢 低 | [#7575](https://github.com/agentscope-ai/QwenPaw/issues/7575) | `edit()` 无条件发送 `response_format`，对 `gpt-image-2` 触发 HTTP 400 | ✅ 已关闭 |

**重点关注**：
- **#7576 影响范围最广**（覆盖全部已发布版本），所有使用默认配置的调用都可能受影响，建议优先修复并发布 patch 版本。
- **#7572 反映工程化短板**：缺乏结构化错误传播与日志埋点，会让后续排障持续困难。

---

## 6. 功能请求与路线图信号

| Issue | 诉求 | 与现有 PR/方向契合度 |
|---|---|---|
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 多租户 Hub、共享 skills、管理员后台 | ✅ 官方已立项（2.2.0） |
| [#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557) | Skill 版本/依赖元数据 + 升级工作流 | 与 **PR #7509**（make-skill v2 的 approval-driven 发布流）方向高度一致，可能成为 2.3.0+ 的后续 |
| [#7573](https://github.com/agentscope-ai/QwenPaw/issues/7573) | Web UI 增加 "Edit last message" 与 "Rewind" 按钮 | 前端 UX 改进，未见对应 PR |
| [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) | 飞书流式卡片：思考过程输出完成后自动折叠 | 已提供可行方案（`collapsible_panel` + JSON 2.0），有望作为低成本的飞书集成改进被采纳 |
| **PR #7569** | 新增 Advisor Mode（双模型协作，强模型顾问 + 弱模型执行） | 进一步丰富 modes 生态（与 Goal/Mission 并列） |

> 路线图信号：下一阶段重点是 **Hub 多租户化** 与 **Skill 工程化（版本化/审批流）**。

---

## 7. 用户反馈摘要

- **多用户/团队场景是核心增长诉求**：23 条评论的 #7318 显示大量用户在尝试把 QwenPaw 用于团队而非个人。
- **企业集成（飞书）体验需打磨**：@ZhengNC 在 #7570 提到 2.1.0 的飞书 CardKit 流式输出"用着不错"，但长思考过程挤占回复区域是真实痛点，且用户已自研可行方案。
- **Agent 行为稳定性引发挫败感**：@xiaohushi512 在 #7571 中描述"反复强调还是会遗忘"，并因此遭遇生产事故（自动部署覆盖运行时），反映出**长期记忆与行为约束的可靠性是当前的硬伤**。
- **img-gen 技能体验问题**：@zztdandan 连续提交 #7574、#7575 两个相互关联的 Bug，说明该技能在 gpt-image-2 模型上可用性差，用户必须主动排错。
- **异常可观测性差**：@Jonhow324 在 #7572 强调"日志里不留任何痕迹"，这是企业用户/运维视角的核心痛点。

---

## 8. 待处理积压

以下 Issue/PR 长期未响应，维护者需关注：

| 编号 | 类型 | 创建日期 | 现状 |
|---|---|---|---|
| [PR #6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) | MCP 工具调用超时配置 | **2026-08-10**（已近 1 个月） | 仍为 "Under Review"，未合并 |
| [#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557) | Skill 版本/依赖元数据（与 #7509 紧密相关） | 2026-09-04 | 缺少维护者回应，可能影响 PR #7509 的落地完整性 |
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | Hub 多租户版需求征集 | 2026-08-26 | 虽为 2.2.0 已立项议题，但 23 条评论中可能含未消化的细节需求，建议维护者正式答复并归类 |

> **建议维护者动作**：
> 1. 优先处理 #7576（影响所有版本的全局回归 Bug），考虑 patch 发布；
> 2. 推进 PR #6874、#7509、#7569 的 review 流程，避免 PR 长期滞留；
> 3. 在 #7318 中发布 Hub 路线图回复，沉淀社区需求；
> 4. 评估将 #7572 的可观测性修复纳入下个版本。

---

*报告生成时间：2026-09-06 · 数据范围：过去 24 小时*
*GitHub 仓库：https://github.com/agentscope-ai/CoPaw*

:::
