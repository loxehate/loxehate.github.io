---
title: "AI CLI 工具社区动态日报"
published: 2026-09-06
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-06

> 生成时间: 2026-09-06 00:00 UTC | 覆盖工具: 7 个

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
**报告日期：2026-09-06**

---

## 一、生态全景

2026 年 9 月的 AI CLI 工具生态已进入**"功能扩张趋缓、质量稳定性承压"**的成熟期拐点。主流工具（Claude Code、Codex、Gemini CLI、DeepSeek Reasonix）几乎都在同一天**没有新版本发布**，但 PR 合并量与 Issue 创建量依旧活跃，反映出行业重心从"加新功能"转向"修旧债"——桌面端一致性、协议兼容、子代理可靠性、计费透明度成为普遍痛点。横向看，各工具正在沿三条路线分化：**桌面化深度整合**（Claude Desktop / Codex Desktop / Reasonix Desktop / Hermes）、**多供应商协议抽象**（OpenCode / Reasonix / Codex）、以及**可编程运行时化**（Claude Code Hooks / Codex app-server）。

---

## 二、各工具活跃度对比

| 工具 | 今日 Issues | 今日 PR | 新 Release | 主线工作 |
|------|------------|--------|-----------|---------|
| **Claude Code** | 10+（含 369⭐、242💬顶帖 #27302） | 1（仅 #87079） | ❌ 无 | 多账户 Auth、Function Hooks、桌面 Bug 集中修复 |
| **OpenAI Codex** | 37 | 38（合并） | ❌ 无 | Voice 实时链路 Bazel 化、TUI worktree、Desktop 会话同步 |
| **Gemini CLI** | 48 | 10+（Top 10 列出） | ✅ v0.60.0-nightly | 模型解析修复、扩展安全加固、Subagent 状态报告 |
| **DeepSeek Reasonix** | 18 | 10（Top 10） | ✅ v1.38.0 | 搜索解耦、协议恢复加固、桌面统一管理页 |
| **OpenCode** | 10+（Top 10） | 30+（50 条更新，已关闭 30+） | ❌ 无 | Bedrock 凭证链、MCP schema 规范化、自动化 PR 清理 |
| **Hermes** | 13 | 50 | ❌ 无 | Bot 群聊连续性、Desktop HUD 全局快捷键、Kanban 调度 |
| **Deepseek Harness** | 0 | 0 | ❌ 无 | 无活动 |

**关键观察**：Codex 与 Hermes 的 PR 合并量显著领先（38 / 50），反映团队规模与提交频率优势；Reasonix 与 Gemini CLI 是当日唯二发版的工具；Deepseek Harness 已静默。

---

## 三、共同关注的功能方向

### 1. 🔐 Auth / OAuth 并发与多账户体系
- **Claude Code #27302**（369⭐ 顶帖）：多 Connector 账户支持
- **Claude Code #88583**：并发 Desktop 会话争抢 refresh token
- **Codex**：OAuth fallback 硬编码 dummy key 导致 401
- **Reasonix**：v1.37.0 协议恢复路径中鉴权链路未根治

### 2. 🪟 桌面端稳定性（Windows / macOS）
- **Claude Code**：#55206（bash 沙箱失效）、#92059（内存治理失效 12.4 GB）、#92345（MSIX 安装 0x80073CF9）、#86647（UI/后端状态不一致）、#77071（侧边栏 Dispatch 缺失）
- **Codex**：#41079（会话分页 race）、#42190（桌面宠物点击穿透）、#42583（Composer 消失）
- **Reasonix**：#9208（react-virtuoso 滚动抖动）、#9807（自动化页控件重叠）

### 3. 🔌 MCP 协议兼容与工具链
- **OpenCode #46628 / #47543**：MCP 工具 `anyOf/oneOf/allOf` 根级组合器致 Anthropic 400
- **Claude Code #87079**：`fnmatch` 安全 glob 语义静默漏匹配
- **Gemini CLI #29200**：MCP 运行时策略大小写不敏感
- **Hermes #103943**：MCP 与内建工具同名遮蔽

### 4. 📊 计费 / 配额透明度
- **Claude Code #91747 / #91289 / #82429 / #82404**：模型路由静默回退、烧 token、误报余额、错误状态粘滞
- **Codex**：5 小时配额初始即耗 40%、Full reset credit 被无声消耗
- **Reasonix #9816**：官方故障与协议层错误归因混淆

### 5. 🧠 Subagent / Agent 可靠性
- **Gemini CLI #22323 / #21409**：Subagent MAX_TURNS 后假报 "GOAL success"、Generalist Agent 永久挂起
- **OpenCode #47546**：Subagent 在 bash 后台进程存活时挂起
- **Reasonix #9825 / #8946**：Agent 回合被掐、reasoning required to replay tool turn（21 评论积压）

### 6. 📡 协议层多供应商兼容
- **Reasonix #9820 / #9822 / #9817**：Anthropic 协议下工具调用失败、Grok 拒收 `metadata`、`content[].thinking` 序列化缺陷
- **OpenCode #47436**：Bedrock 凭证链补全（AWS_PROFILE / SSO / Web Identity）
- **Codex**：gpt-reserve 模型 0.151.0 回归

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | Agent 可编程运行时 | 追求深度定制化、Hooks 生态的开发者 | Function Hooks + MEMORY.md + 多账户 Auth 体系 |
| **OpenAI Codex** | 桌面一体化 + Voice Realtime | 多端协同、需要语音/视频能力的团队 | Bazel 原生语音栈 + TUI worktree + JSONL 会话历史 |
| **Gemini CLI** | 扩展安全 + AST 感知分析 | 大型代码库分析、企业沙箱需求 | 零依赖 OS 沙箱 + Auto Memory 确定性脱敏 + 模型硬约束 |
| **DeepSeek Reasonix** | 多供应商协议适配 | 中转站用户、跨模型工作流 | 协议字段白名单 + KV-cache 跨模型归属 + 桌面统一管理页 |
| **OpenCode** | Provider 生态扩展 | 多云（Bedrock/GitLab/CF）、第三方 Provider 维护者 | 自动化 PR 清理 + 请求级工具执行 API + 跨 Provider 凭证链 |
| **Hermes** | Bot 群聊 + Desktop HUD | 自动化运维、跨设备消息连续性用户 | Kanban 调度原子化 + 全局快捷键 + 网关隔离 |
| **Deepseek Harness** | — | — | 已停止活跃 |

**关键差异**：
- **可编程深度**：Claude Code（Hooks）> Hermes（Bot 控制）> 其余
- **桌面化程度**：Codex / Reasonix / Hermes > Claude Code > Gemini CLI > OpenCode
- **协议中立性**：Reasonix / OpenCode > Hermes > Claude Code / Codex / Gemini CLI
- **生态开放度**：OpenCode（Provider 插件）> Gemini CLI（Skills/Extensions）> Claude Code（Hooks）

---

## 五、社区热度与成熟度

### 🔥 高活跃度（成熟阶段）
- **OpenAI Codex**：37 Issues + 38 PR，节奏最稳定
- **Claude Code**：单帖 369⭐ / 242💬 显示用户基数与议题集中度极高
- **Gemini CLI**：48 Issues + 主动 nightly 发版，社区反馈链路活跃

### ⚡ 快速迭代阶段
- **DeepSeek Reasonix**：单日合并 8 项 PR 推动 v1.38.0，Issue 集中爆发（v1.37.0 回归）
- **OpenCode**：30+ PR 批量合并（含长期积压清理），处在大规模债务清偿期
- **Hermes**：Bot / HUD 路线产品迭代密集（13 Issues + 50 PR），节奏紧凑

### 🔇 低活跃 / 静默
- **Deepseek Harness**：24 小时零活动

**成熟度信号**：Claude Code 与 Codex 已进入"功能完备 + 债务清偿"阶段，单 Issue 评论数（200+）表明用户深度使用且愿意反馈；Reasonix / OpenCode / Hermes 仍在功能扩张与稳定性之间拉锯；Deepseek Harness 处于停滞状态。

---

## 六、值得关注的趋势信号

### 1. 🧩 "Agent 可编程运行时"成为下一战场
Claude Code #91870（Function Hooks）、Codex app-server、Hermes Bot 控制共同指向同一方向：**AI CLI 不再是"工具调用器"，而是"可被插件编排的运行时"**。Express/Koa 风格的中间件 + 安全副作用追踪模式可能成为参考架构。

### 2. 🔁 多供应商协议适配从"加分项"变"必选项"
Reasonix、OpenCode、Hermes 都在构建 Provider 抽象层；Reasonix v1.38.0 的"协议字段白名单"诉求反映**任何透传字段都可能成为 400/422 的雷区**。对开发者的参考价值：构建跨 Provider 应用必须从 Day 1 设计字段白名单与序列化策略。

### 3. 🖥️ 桌面端是真正的"质量试金石"
今日五大工具中有四个爆出桌面端跨平台一致性 Bug，覆盖 **Windows 内存治理、macOS OAuth 竞态、MSIX 安装、react-virtuoso 滚动、桌面宠物命中区** 等高度异质的问题。**桌面端正在取代 CLI 成为用户主入口**，但跨平台质量远未跟上。

### 4. 💸 "静默消耗信任"成系统性风险
Claude Code（#91747）、Codex（5h 配额初始 40%）、Reasonix（#9816 误判官方故障）共同暴露一类问题：**用户无法验证模型路由、计费状态、错误归因是否与请求一致**。可观测性（"为什么被中断、消耗了多少、是否真的调用了所选模型"）将成为下一轮差异化竞争点。

### 5. 🤖 Subagent "假成功"是 Agent 系统的结构性缺陷
Gemini CLI #22323（GOAL success 但实际未完成）、OpenCode #47546（bash 后台进程致挂起）、Reasonix #9825（回合被掐 reasoning omit）显示：**长链 Agent 的可终止性、可观测性、可恢复性**仍是未解决难题。短期内建议：① 限制最大子代理深度；② 强制要求每个 subagent 报告可验证的终止证据（不仅是状态字符串）。

### 6. 🪟 "类 ChatGPT Quick Chat"成为桌面新标配
Hermes #103940 / #103942、Codex Desktop、Reasonix Desktop 都在向"全局快捷键唤起悬浮 HUD"靠拢，预示**桌面 AI 工具正从"应用窗口"转向"系统级伴随层"**。对独立开发者的参考价值：原生 SDK 集成 + 跨设备同步 + 最小化到托盘的紧凑态将是标配功能。

---

## 七、决策建议

| 角色 | 建议 |
|------|------|
| **企业技术决策者** | 优先评估 **Claude Code + OpenAI Codex**（生态成熟、文档完备）；跨云场景考虑 **OpenCode**；多供应商切换场景考虑 **Reasonix** |
| **独立开发者** | 关注 **Claude Code Function Hooks** 与 **Hermes Bot 生态**——可编程性与自动化是个人生产力的杠杆点 |
| **工具链维护者** | 吸取 **Reasonix 协议白名单** 与 **OpenCode 凭证链抽象** 的经验，从 Day 1 设计多 Provider 适配层 |
| **桌面产品设计者** | 跟进 Hermes / Codex 的全局 HUD 与托盘最小化模式，**桌面端 UX 正在重新定义** |
| **Agent 架构研究者** | 重点研究 **Gemini CLI subagent 终止语义** 与 **Reasonix turn 恢复机制**，这是当前 LLM Agent 系统最薄弱也最有价值的环节 |

---

*报告基于 2026-09-06 六大工具公开 GitHub 数据生成，覆盖 7 个仓库、约 140+ Issues、约 160+ PR。所有数字与链接均可溯源至各工具日报。*

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-09-06**

---

## 1. 热门 Skills 排行（PR 维度）

| 排名 | Skill / PR | 核心功能 | 状态 | 链接 |
|---|---|---|---|---|
| 1 | **run_eval.py 评估体系修复** (#1298) | 修复 skill-creator 评估脚本 `recall=0%` 的系统性 Bug，并修正 Windows 子进程读取、触发检测、并行 worker 问题 | OPEN | [#1298](https://github.com/anthropics/skills/pull/1298) |
| 2 | **document-typography** (#514) | 自动防止 AI 生成文档中的孤字/寡行/widow 等排版问题 | OPEN | [#514](https://github.com/anthropics/skills/pull/514) |
| 3 | **scnet-hpc** (#1615) | 面向 SCNet 高性能计算集群的 SSH + Slurm 工作流 Skill | OPEN | [#1615](https://github.com/anthropics/skills/pull/1615) |
| 4 | **skill-quality-analyzer / skill-security-analyzer** (#83) | 元 Skill：对其他 Skill 做五维质量评估与安全审计 | OPEN | [#83](https://github.com/anthropics/skills/pull/83) |
| 5 | **frontend-design 优化** (#210) | 提升 frontend-design 的可执行性与内部一致性 | OPEN | [#210](https://github.com/anthropics/skills/pull/210) |
| 6 | **ODT (OpenDocument)** (#486) | 创建/填充/解析 ODT、ODS 等开放文档格式 | OPEN | [#486](https://github.com/anthropics/skills/pull/486) |
| 7 | **Hivemind 多 Agent 编排** (#1628) | 将机械任务分发给 headless opencode worker，主模型只做规划与审查 | OPEN | [#1628](https://github.com/anthropics/skills/pull/1628) |
| 8 | **Buffer API** (#1627) | 通过 GraphQL 让任意 Agent 调度社交媒体发帖 | OPEN | [#1627](https://github.com/anthropics/skills/pull/1627) |

**讨论热点总结**：
- **评估基础设施可信度**：#1298 与 #556 共同指向同一根因——`run_eval.py` 在所有平台上 `recall=0%`，导致描述优化循环在噪声中迭代，社区强烈呼吁修复。
- **跨平台兼容性**：#1050、#1099 集中暴露 Windows 上的 subprocess、编码、`PATHEXT` 等问题。
- **元能力建设**：#83 提出对 Skill 本身做质量与安全分析，反映生态已进入"治理阶段"。

---

## 2. 社区需求趋势（Issues 维度）

按议题聚类：

**🔐 安全与信任（最高呼声）**
- [#492](https://github.com/anthropics/skills/issues/492)（💬43）社区 Skill 借 `anthropic/` 命名空间冒充官方，**形成信任边界滥用**——这是当前最热的议题。

**🏢 企业级协作与权限**
- [#228](https://github.com/anthropics/skills/issues/228)（💬16）期望 Claude.ai 支持组织级 Skill 共享，避免手动下载/上传。
- [#1175](https://github.com/anthropics/skills/issues/1175)（💬4）在 SKILL.md 中实现 SharePoint 访问控制的合规性顾虑。

**🧠 推理质量与自我审计**
- [#1385](https://github.com/anthropics/skills/issues/1385) 三阶段质量门（预校准 → 对抗性审查 → 交付验证）。
- [#1329](https://github.com/anthropics/skills/issues/1329) compact-memory：用符号化符号压缩 Agent 长期记忆，节省上下文。

**🛠️ 评估/调试可靠性**
- [#556](https://github.com/anthropics/skills/issues/556)（💬12）`claude -p` 在评估中从不触发 Skill。
- [#1390](https://github.com/anthropics/skills/issues/1390) mcp-builder 评估对真实 MCP 静默失败。
- [#1487](https://github.com/anthropics/skills/issues/1487) `claude-api` Skill 一次性注入 ~156k tokens，**撑爆上下文窗口**。

**🔌 互操作与协议化**
- [#16](https://github.com/anthropics/skills/issues/16) 将 Skill 暴露为 MCP 接口，统一信号协议。
- [#29](https://github.com/anthropics/skills/issues/29) 与 AWS Bedrock 的集成路径。
- [#189](https://github.com/anthropics/skills/issues/189) `document-skills` 与 `example-skills` 插件内容重复。

**🧹 用户体验故障**
- [#62](https://github.com/anthropics/skills/issues/62)（💬10）Skill 凭空消失且无法恢复——影响创作者信心。

**趋势归纳**：社区需求正从"做更多 Skill"转向"做更可信的 Skill 生态"——安全、可评估、可治理、可互操作。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论密度高且方向明确，具备近期落地可能：

| PR | Skill | 亮点 | 链接 |
|---|---|---|---|
| #1298 | run_eval.py 全面重写 | 修复评估可信度基础设施，影响所有 Skill | [#1298](https://github.com/anthropics/skills/pull/1298) |
| #1628 | Hivemind 多 Agent 编排 | 用免费模型分担上下文稀缺问题 | [#1628](https://github.com/anthropics/skills/pull/1628) |
| #1627 | Buffer API Skill | 跨 Agent 协议（Claude/Cursor/Codex/Hermes）通用 | [#1627](https://github.com/anthropics/skills/pull/1627) |
| #1367 | self-audit v1.3.0 | 机械验证 + 四维推理审计的输出质量门 | [#1367](https://github.com/anthropics/skills/pull/1367) |
| #568 | ServiceNow 平台 Skill | 覆盖 ITSM/ITOM/SecOps/FSM 等 8 大模块 | [#568](https://github.com/anthropics/skills/pull/568) |
| #83 | quality + security analyzer | 元 Skill，回应 #492 信任危机 | [#83](https://github.com/anthropics/skills/pull/83) |
| #1602 | 评估/基准/编码综合修复 | 覆盖 mcp-builder 等多 Skill 的稳定性 | [#1602](https://github.com/anthropics/skills/pull/1602) |

---

## 4. Skills 生态洞察

> **当前社区最集中的诉求是"可信的 Skill 治理"——既能验证 Skill 的真实性（命名空间安全）、又能客观度量 Skill 的效果（评估管线修复），并通过元 Skill（质量/安全分析）与多 Agent 编排（Hivemind）将治理能力本身沉淀为生态基础设施。**

简言之：社区正在从"造 Skill"迈向"信 Skill"。

---

# Claude Code 社区动态日报
**日期：2026-09-06**

---

## 一、今日速览

今日社区热度集中在 **多账户连接器支持** 与 **Function Hooks 插件扩展** 两大增强提案，其中多账户连接器议题以 242 条评论、369 点赞稳居榜首；与此同时，Windows / macOS 平台的 Cowork、Desktop 与 Auth 模块暴露出多个真实可复现的 Bug，反映桌面端稳定性仍是社区关注焦点。

---

## 二、版本发布

过去 24 小时**无新版本发布**。

---

## 三、社区热点 Issues

### 1. [#27302](https://github.com/anthropics/claude-code/issues/27302) — 支持多 Connector 账户（同一连接器、不同账户） ⭐369 💬242
- **类型**：Feature / Auth
- **重要性**：呼声最高的长期增强请求，用户希望在同一 Claude / Claude Code on the web 中同时登录同一连接器（如 Google Drive）的多个账户
- **社区反应**：369 点赞、242 条评论，是过去 24 小时内更新热度最高的 Issue

### 2. [#91870](https://github.com/anthropics/claude-code/issues/91870) — Function Hooks：让插件能力提升 10 倍 ⭐72 💬110
- **类型**：Enhancement / Hooks / Plugins
- **重要性**：提议通过参数化 `$` 对象 + 基于注册顺序的 `next` 续传模型（参考 Express/Koa），让插件可深度修改 CC 行为，同时通过副作用追踪保证安全
- **社区反应**：72 点赞、110 条评论，作者已被邀请收集反馈

### 3. [#91188](https://github.com/anthropics/claude-code/issues/91188) — MEMORY.md 自动压缩阈值可配置
- **类型**：Enhancement / Memory
- **重要性**：当前硬编码为前 200 行 / 25KB；用户希望可配置或单独抑制，避免长会话中频繁提醒压缩

### 4. [#55206](https://github.com/anthropics/claude-code/issues/55206) — Windows Cowork：bash 沙箱可创建但无法删除宿主挂载目录文件，git 写入全面失效 ⭐11 💬15
- **类型**：Bug / Windows / macOS / Cowork / Sandbox
- **重要性**：直接影响 git 工作流，影响面广且有完整复现路径

### 5. [#77071](https://github.com/anthropics/claude-code/issues/77071) — Claude Desktop 侧边栏 Dispatch 标签完全缺失（Windows 11 / Pro 套餐）
- **类型**：Bug / Desktop
- **重要性**：影响 Pro 用户核心入口体验

### 6. [#88583](https://github.com/anthropics/claude-code/issues/88583) — 并发 Desktop 会话争抢 refresh token，致 OAuth 凭据被清空
- **类型**：Bug / macOS / Auth
- **重要性**：揭示了先前 #84331 / #83345 / #83834 / #43392 等类似故障的根因——单次刷新 token 在并发场景下被竞态覆盖

### 7. [#86647](https://github.com/anthropics/claude-code/issues/86647) — Cowork 会话报告零已连接文件夹，但项目 UI 显示已连接
- **类型**：Bug / macOS / Cowork / Desktop
- **重要性**：UI 与后端状态不一致，影响用户信任

### 8. [#92059](https://github.com/anthropics/claude-code/issues/92059) — Windows 内存压力治理失效：15+ 空闲会话未被回收，进程飙至 12.4 GB RSS 后卡死
- **类型**：Bug / Windows / Desktop / 内存性能
- **重要性**：直接影响 16 GB RAM 等中低端设备的可用性

### 9. [#92345](https://github.com/anthropics/claude-code/issues/92345) — Desktop MSIX 中残留 priconfig.xml 导致安装失败 0x80073CF9
- **类型**：Bug / Windows / Cowork / Installation / Desktop
- **重要性**：阻塞新用户与升级用户的安装路径

### 10. [#91747](https://github.com/anthropics/claude-code/issues/91747) — `--model claude-fable-5 / 5-1` 静默回退至 claude-opus-5（regression）
- **类型**：Bug / macOS / Model
- **重要性**：模型路由静默回退，可能导致用户消耗与预期不符的 token

---

## 四、重要 PR 进展

> 过去 24 小时仅 1 条 PR 更新。

### [#87079](https://github.com/anthropics/claude-code/pull/87079) — fix(security-guidance): 让 `**` glob 模式匹配零深度路径
- **作者**：@anishsamant
- **状态**：Open
- **内容**：`_glob_match` 当前委托给 `fnmatch`，裸 `*` 已跨 `/`，导致 `**/*.ts` 必须包含字面 `/`，会把顶层 `.ts` 文件从 `security-patterns.json` 规则中静默排除
- **重要性**：作为安全规则，静默漏匹配会带来真实的权限绕过风险；修复文档承诺的 "`**` 匹配任意深度"语义具有高安全价值

---

## 五、功能需求趋势

综合今日活跃 Issue 分布，社区诉求可归纳为以下方向：

| 方向 | 代表 Issue | 关注度 |
|---|---|---|
| **多账户 / Auth 体系增强** | #27302、#88583 | 🔥🔥🔥 极高 |
| **插件与 Hook 扩展性** | #91870（Function Hooks）、#82428（CLAUDE_CONFIG_DIR 插件安装） | 🔥🔥🔥 极高 |
| **内存 / 上下文工程** | #91188（MEMORY.md 阈值）、#82211（task store 注入） | 🔥🔥 高 |
| **桌面端稳定性（Windows / macOS）** | #55206、#86647、#92059、#92345、#77071 | 🔥🔥🔥 极高 |
| **模型路由与计费一致性** | #91747（静默回退）、#91289（Fable 5.1 烧 token）、#82429（CLI 误报余额）、#82404（错误状态粘滞） | 🔥🔥 高 |
| **安全与合规策略** | #87079（glob 语义）、#82432（NO_COLOR）、#82415/#82411（误过滤） | 🔥 中 |

---

## 六、开发者关注点

1. **桌面端 Bug 集中爆发**：Windows 与 macOS 的 Cowork / Desktop 模块昨日同步出现 5+ 条可复现 Bug，覆盖沙箱挂载、文件夹连接状态、内存治理、MSIX 安装、Auth 凭据并发等多个子系统，提示近期桌面版本在跨平台一致性上存在质量回退。

2. **Auth 并发竞态亟需根治**：#88583 揭示出 OAuth 单次刷新 token 在并发会话下的竞态问题已横跨多个 Issue 长期未解决，开发者希望官方给出统一的并发刷新策略（锁 / 串行化 / 退避重试）。

3. **Hook / Plugin 体系成新焦点**：#91870 的 Function Hooks 提案以"安全 + 可组合"为核心卖点，仅 2 天即收获 110 评论，社区明显期待 CC 从"工具调用"向"可编程运行时"演进。

4. **模型路由可观测性不足**：#91747、#91289、#82429、#82404 共同指向同一类痛点——CLI 在模型选择、计费判定、错误传播上缺乏透明的路由与状态日志，用户难以判断实际调用是否与请求一致。

5. **配置与环境变量语义需统一**：#87079（glob 匹配语义）、#82428（CLAUDE_CONFIG_DIR 插件安装不生效）、#82432（NO_COLOR 不被遵守）等表明，配置层级的"文档承诺 vs 实际行为"差距正在成为开发者信任摩擦的主要来源。

6. **长会话 / 记忆工程走向精细化**：#91188 反映出社区已不满足于"自动压缩"二元开关，开始追求阈值、策略、注入范围的可控性。

---

*日报基于 github.com/anthropics/claude-code 过去 24 小时数据生成。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期：2026-09-06**

---

## 一、今日速览

今天 Codex 仓库活跃度较高，过去 24 小时共有 **37 个 Issue 更新** 和 **38 个 PR 合并**，但**无新版本发布**。开发者关注焦点集中在三方面：**Windows / macOS Desktop 端的会话历史与同步 Bug**、**配额/计费逻辑异常**（如 5 小时配额初始就被消耗 40%），以及一个贯穿全平台的 **Voice 实时音视频基础设施重构**（基于 Bazel 构建原生 Opus / GStreamer / WebRTC 链路）。从 PR 内容看，团队正将语音模块从临时脚本迁移到 Bazel 化的、可审计的依赖管理，同时持续打磨 TUI 的会话与 worktree 工作流。

---

## 二、版本发布

**今日无新 Release。** 过去 24 小时无版本发布。

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 评论数 | 为什么值得关注 |
|---|-------|--------|---------------|
| 1 | [Desktop][Windows] 分页会话历史在重复 ordinal 上卡住 (#41079) | 28 | 会话历史分页的经典 race condition，JSONL rollout 完整但 UI 投影停滞，社区持续讨论补丁方案。 |
| 2 | [Built-in image generation] 7 月 9 日更新后图像生成反复网络错误 (#32297) | 26 | 高赞（👍9），影响 Plus 用户日常使用，且跨越多个桌面端 build 未修复。 |
| 3 | [WSL] Windows Desktop 中 Browser Use / Node REPL 失败 (#29639) | 20 | MCP 工具链在跨 Windows↔WSL 沙箱路径映射上的设计缺陷，影响 Computer Use 类核心场景。 |
| 4 | [Android Remote] 大型任务空闲时 turn/start 30 秒超时 (#38023) | 12 | 移动端 Remote 与桌面长任务交互的可用性问题，30s 超时阈值需要重新审视。 |
| 5 | [ChatGPT App] 新版滚动异常 (#37884) | 11 | macOS 27 / 新 ChatGPT App 体验类问题，影响面广。 |
| 6 | [CLI] gpt-reserve 模型不可用 (#41520) | 9 | 与新模型接入相关，反映 reserve 模型在 CLI 0.151.0 的可用性回归。 |
| 7 | [macOS] Composer 在首条消息后消失 (#42583) | 8 | 新 ChatGPT Desktop 的会话 UI 稳定性问题，Plus/Pro 多用户反馈。 |
| 8 | [Windows] 桌面宠物拖拽/缩放后点击穿透 (#42190) | 8 | 桌面宠物这类轻量交互特性也需要独立命中测试，暴露 Desktop 命中区与渲染层解耦不彻底。 |
| 9 | [macOS] 已删除会话在 Recents 中残留 (#41661) | 7 | 客户端/服务端状态同步一致性问题，多端协同的典型痛点。 |
| 10 | [TUI 0.145.0] Esc-Esc Edit/Resume 把 gpt-5.6-sol Ultra 改为 xhigh (#35292) | 6 | 推理档位被会话恢复流程静默改写，属于不易察觉但影响计费/输出的严重 Bug。 |

**社区反应小结**：Windows/macOS 双端的 Desktop 会话状态、Recents 同步与配额/计费问题占据多数；模型档位被静默修改与图像生成长尾故障显示出跨多个版本的稳定性债。

---

## 四、重要 PR 进展（Top 10）

| PR | 主要内容 |
|----|---------|
| #43126 — [Windows] 通过 Bazel 暴露原生构建工具 | 修复 MSVC / Windows SDK 在 `windows_support` 中被丢弃的工具二进制，使 Bazel 消费者可复用原生构建工具。 |
| #43125 — Windows 原生语音构建的显式工具选择 | 新增 `--windows-build-inputs` 以避免 Cygwin 的 `link.exe` 被错误选中，强化工具链可控性。 |
| #43121 — 语音 helper 包要求 prepared runtime | 强制 `--runtime` 必填，避免 helper-only 包进入 `main` 时缺少动态库。 |
| #43120 — TUI 新增 `/worktree` 与受管 worktree 创建 | 在 `/new`、`/fork` 中提供当前 checkout 或新建 worktree 的选择，是开发者工作流的关键改进。 |
| #43117 — Unix Bazel bindings 链接到 prepared voice runtime | 让 GStreamer/GLib Rust 构建脚本使用声明的 pkg-config，统一 SDK 来源。 |
| #43114 — 新增 Bazel 原生语音 runtime 准备 | 手工 target `//third_party/voice:native_runtime` 校验构建收据与源码 manifest。 |
| #43113 — Subagent / memory opt-in 通过 app server 持久化 | 把 TUI 中的开关从客户端偏好迁移为 server-side config，新会话生效，行为更可审计。 |
| #43111 — 新增 native voice 依赖 Bazel target | `//third_party/voice:native_prefix` 用 Bazel 管理原生构建归档与工具链输入。 |
| #43110 — reasoning_effort 变更写入会话历史（默认关闭） | 新增 `reasoning_effort_override` 开关（搭配 `use_responses_lite`），让推理档位变化可追溯，回应了 #35292 类问题。 |
| #43097 — Realtime WebRTC 会话 API（helper 后端） | 新增可克隆句柄的 `RealtimeWebrtcSession`，覆盖启动、SDP 协商、音频控制、电平表与错误回调，是 Codex Voice 实时链路的核心抽象。 |

其他值得关注的：#43100（Opus RTP 引入有界缓冲，64 包/2MiB 上限）、#43090（voice-host 把麦克风音频送出到对端）、#43079（语音 helper 启用可选本地音频设备，macOS/Linux/Windows 通过 CPAL）、#43074（`/apps` 弹窗失败给出可重试错误）。

**整体看**：今天的 PR 主线是 **「Voice 基础设施 Bazel 化 + 实时链路补全」**，并辅以 TUI 工作流增强与会话历史可信度提升。

---

## 五、功能需求趋势

从近 24 小时 Issue 标签与描述提炼出的关注方向：

1. **桌面会话历史与多端一致性（最高频）**
   `session`、`windows-os`、`app-server`、`recents`、`history` 相关 Issue 占近 1/3，反映出 Desktop、CLI、iOS/Android 之间会话/状态同步是当前最大痛点。

2. **配额 / 计费透明度与可控性**
   `rate-limits`、`Full reset credit`、5 小时配额“初始即耗 40%” 等问题表明用户希望看到更明确的额度状态与 agent 消耗确认机制。

3. **模型能力与可用性**
   `gpt-reserve` 不可用、`gpt-5.6-sol Ultra → xhigh` 静默降档、`gpt-6-astra` 触发安全审查等显示新模型接入与档位控制仍需打磨。

4. **跨平台沙箱 / MCP 工具链**
   WSL ↔ Windows 路径映射、Computer Use 插件缺失、`node_repl` 的 `sandboxCwd` 不一致，凸显 MCP 工具跨平台沙箱抽象的统一性不足。

5. **Voice / Realtime 体验**
   Windows 语音伴侣透明度丢失、Opus RTP 边界、WebRTC session API，说明语音类场景正快速从“能跑”走向“可生产”。

6. **Computer Use / Pets 等轻量交互**
   macOS 坐标点击 `-10005 noWindowsAvailable`、桌面宠物命中区与点击穿透，属于 UI/交互细节回归。

7. **可观测性与开发者体验**
   `@` skill picker 不显示来源、OAuth fallback 使用硬编码 dummy key、Doctor 信息缺失等，体现社区对**“可调试、可解释”**体验的诉求。

---

## 六、开发者关注点（痛点 / 高频需求）

- **会话/历史状态机的健壮性**
  多端切换账号、删除会话、跨端同步时出现 “ghost entry / stale turn / 投影 ordinal 卡住” 等问题。开发者呼吁在客户端做幂等回放 + 显式状态版本号（与 #43110 的 `configuration_update` 思路一致）。

- **计费 / 配额的可见性**
  “Full reset credit 被 agent 无声消耗”“5 小时额度初始 40% 已被用” 这类问题直接打击信任。希望看到：单次操作消耗预测、运行前确认、以及发生消耗后的回滚/申诉通道。

- **工具链与沙箱抽象的统一**
  WSL ↔ Windows 的 `sandboxCwd`、`node_repl.exe` 选错宿主、Computer Use 插件仅在部分平台可见。开发者希望 Codex 提供统一的 `tool host` 抽象，明确“工具运行在哪个 OS/容器”以及权限边界。

- **OAuth 与鉴权恢复路径**
  切网/VPN 后 OAuth token 失效却回退到 `dummy` key 导致 401；macOS 上 `auth.json` token 在 CLI/Desktop 中被拒但 curl 接受。期望：明确的 re-auth 提示 + 更透明的 token 失效处理。

- **Voice / Realtime 工具链**
  PR 集群围绕 Bazel 化原生语音栈，但 Issue 侧用户更关心 “实际能用”：Windows 语音伴侣透明度、mic 路由、电平反馈、RTP 抖动处理。需求是**“低延迟、稳定、跨平台一致”**。

- **TUI 工作流**
  `/worktree`、`/new`、`/fork` 的 worktree 支持（#43120）回应了长期呼声；`Esc-Esc` 编辑恢复时档位被改写（#35292）需要修复，确保“恢复即所见”。

- **可观测性 / 调试信息**
  Codex doctor 输出缺字段、helper 报 `helper_unknown_error: setup refresh had errors`、版本号在 About 中不可见。开发者希望“出问题时第一时间拿到 build、CLI、auth、session 快照”，以自助排查。

- **小但烦人的体验回归**
  Composer 消失、滚动异常、桌面宠物点击穿透、`/apps` 弹窗卡在 Loading——这些虽不致命但高频出现，是用户“今日 Codex 不好用”感受的主要来源。

---

*本日报基于 GitHub 公开数据生成，所有链接均指向 openai/codex 仓库。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报
**日期：2026-09-06**

---

## 📌 今日速览

Gemini CLI 今日发布 `v0.60.0-nightly`，核心改动集中在**模型解析修复**与**扩展安全加固**：当用户显式指定 `gemini-2.5-flash` 时，CLI 不再被静默重写为 `gemini-3.5-flash`，避免了 Vertex AI 后端因找不到模型而返回 400 的问题；与此同时，扩展安装流程新增环境变量变更的二次确认机制，并对运行时变量做脱敏处理。社区层面，**Subagent 状态报告失真**成为当前最高热度议题——多个 P1 级 Bug 显示子代理在提前耗尽回合数后仍向用户报告"GOAL success"，掩盖了真实中断状态。

---

## 🚀 版本发布

### v0.60.0-nightly.20260905.g85aca163f
🔗 [Release 链接](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260905.g85aca163f)

**核心更新：**
- **fix(extensions)**：扩展安装时对环境变量变更提示用户二次确认，并对运行时变量进行脱敏处理（[#28863](https://github.com/google-gemini/gemini-cli/pull/28863)）
- **fix(core)**：强化工作区路径边界检查与符号链接解析，提升命令执行安全性

---

## 🔥 社区热点 Issues（Top 10）

### 1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) ⭐ P1 · 13 评论 · 2 👍
**Subagent 达到 MAX_TURNS 后仍被报告为 GOAL success**
`codebase_investigator` 子代理在达到最大回合数前未做任何分析，但返回 `status: "success"` 和 `Termination Reason: "GOAL"`，完全掩盖了中断事实。**这是当前最高优先级 Bug 之一**，直接影响用户对子代理行为的可信度判断。

### 2. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) ⭐ P2 · 9 评论 · 1 👍
**基于模型 Bash 亲和力的零依赖 OS 沙箱与执行后意图路由**
Gemini 3 模型被设计为原生 bash 用户（链式使用 grep/cat/sed/awk），需要在不牺牲安全的前提下充分利用此能力。提案构建零依赖 OS 沙箱并增加执行后意图路由层，是 AGI 级 Agent 架构演进的标志性议题。

### 3. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) ⭐ P1 · 8 评论 · 8 👍
**Generalist Agent 永久挂起**
当 CLI 委派给 generalist agent 时会无限期挂起——即便是创建文件夹这样的简单操作。用户等待一小时后取消才恢复。该 Bug 获 **8 个赞**，反映用户挫败感极强，提示模型需被明确指令"不使用子代理"才可绕过。

### 4. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) ⭐ P2 · 7 评论 · 1 👍
**AST 感知文件读取/搜索/映射的影响评估**
通过 AST 感知工具精确读取方法边界、减少误对齐读取回合并降低 token 噪声，是提升大型代码库分析效率的关键 EPIC。

### 5. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) ⭐ P2 · 6 评论
**Gemini 几乎不主动使用自定义 Skills 与 Sub-Agents**
即便存在"gradle"、"git"等描述清晰的 Skills，模型也很少主动调用。反映了**模型自主能力调用意识薄弱**这一普遍痛点。

### 6. [#29213](https://github.com/google-gemini/gemini-cli/issues/29213) ⭐ P2 · 4 评论
**意外模型解析：`gemini-2.5-flash` 被映射到 `gemini-3.5-flash`**
在 Vertex AI 后端，用户指定的 2.5 Flash 被静默替换为 3.5 Flash，导致请求失败。该问题触发两个 PR 修复（#29217、#29222），是今日"模型解析"主线工作的核心 issue。

### 7. [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) ⭐ P1 · 4 评论 · 3 👍
**Shell 命令执行完成后卡在"等待输入"状态**
简单 CLI 命令结束后，shell 仍显示为活动并"等待用户输入"。**影响范围极广**——任何依赖 shell 工具的任务都可能遭遇。

### 8. [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) ⭐ P2 · 5 评论
**Auto Memory 需引入确定性脱敏并降低日志量**
当前 Auto Memory 仅靠 LLM 在上下文中做秘密脱敏，敏感信息已进入模型上下文。需建立确定性脱敏层以避免凭据泄漏。

### 9. [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) ⭐ P2 · 3 评论
**Browser Agent 完全忽略 `settings.json` 覆盖项（如 maxTurns）**
AgentRegistry 初始化时正确合并了设置，但 Browser Agent 内部并未应用，造成用户配置失效。

### 10. [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) ⭐ P1 · 4 评论 · 1 👍
**Browser Subagent 在 Wayland 下失败**
Wayland 用户无法使用 browser 子代理，终止原因显示为"GOAL"但实际未完成。

---

## 🔧 重要 PR 进展（Top 10）

### 1. [#29217](https://github.com/google-gemini/gemini-cli/pull/29217) ⭐ P1+P2 · size/m
**fix(config): 修复显式指定的 `gemini-2.5-flash` 被自动改写**
`isFlashModel()` 通过 `endsWith('flash')` 宽匹配把所有 Flash 模型升级到 3.5 Flash，连用户显式 pin 的 2.5 Flash 也被波及。修复后显式选择不被覆盖。

### 2. [#29222](https://github.com/google-gemini/gemini-cli/pull/29222) ⭐ P1+P2 · size/s
**fix(config): 防止显式 pin 的 Flash 模型被改写**
针对同一 #29213 问题的并发修复方案，更聚焦于"显式锁定"语义，确保 Vertex AI 等后端的旧模型调用正常工作。

### 3. [#29211](https://github.com/google-gemini/gemini-cli/pull/29211) ⭐ P2 · size/m
**fix(cli): 停止在 state updater 内部调度 state 更新**
修复 React 中"`setPastSessionMessages` 在 `setCurrentSessionMessages` 更新器内部调用"的反模式，避免 React 渲染告警。

### 4. [#29200](https://github.com/google-gemini/gemini-cli/pull/29200) ⭐ P2 · size/m
**fix(core): 运行时一致地强制执行 MCP 策略**
将 MCP 运行时策略与 CLI 的大小写不敏感、空格裁剪的服务器名匹配对齐；显式空 allowlist 视为 fail-closed 而非"全允许"。

### 5. [#29215](https://github.com/google-gemini/gemini-cli/pull/29215) ⭐ size/m
**fix(core): 对不可信工具输出强制执行 envelope 元数据溯源**
更新核心系统提示，指示模型**仅从已验证的顶层 envelope 属性**推导作者身份与运行状态，防御外部工具/MCP 的伪造元数据。

### 6. [#29116](https://github.com/google-gemini/gemini-cli/pull/29116) ⭐ size/s+m+l
**fix(core): 缓解 NTFS 8.3 短名（SFN）路径绕过**
增强 `AllowedPathChecker` 安全引擎对 `git~1`、`env~1`、`node_m~1` 等 Windows 短名的处理，防止路径遍历与黑名单绕过。

### 7. [#29114](https://github.com/google-gemini/gemini-cli/pull/29114) ⭐ size/s
**fix(core): 防止 spawn 失败时 `handleExit` 重复执行**
Node.js `child_process` 在 spawn 失败时同时触发 `error` 与 `close` 事件，旧代码会执行两次；新增可重入保护标志。

### 8. [#29110](https://github.com/google-gemini/gemini-cli/pull/29110) ⭐ size/m+l
**fix(core): `read_file` 内容路由通过 `FileSystemService`**
修复 ACP 客户端声明 `fs: { readTextFile }` 后被绕过的问题，统一所有 I/O 走 `config.getFileSystemService()`，提升远程/沙箱环境下的一致性。

### 9. [#29118](https://github.com/google-gemini/gemini-cli/pull/29118) ⭐ size/xs
**fix(extensions): 仅剥离尾随 `.git` 后缀**
修复 `blog.github.io` 这类内部含 `.git` 的仓库名被错误剥离的问题，仅匹配尾部并大小写不敏感。

### 10. [#29219](https://github.com/google-gemini/gemini-cli/pull/29219) ⭐ P1 · size/s
**新增 webpack.yml 工作流**
引入 CI 工作流配置，与 #29218 的版本 bump PR 一同推进 nightly 发布流水线。

---

## 📈 功能需求趋势

从 48 条 Issues 中提炼出以下社区最关注的方向：

| 方向 | 代表 Issue | 热度 |
|------|-----------|------|
| **Subagent 行为可靠性** | #22323, #21409, #21968, #21763 | 极高（P1 多发） |
| **OS 级沙箱与 Bash 安全** | #19873, #22672, #28863（已合并） | 高 |
| **AST 感知代码库分析** | #22745, #22746 | 中高（EPIC 级） |
| **浏览器代理鲁棒性** | #21983, #22267, #22232 | 中高 |
| **Auto Memory 隐私与质量** | #26525, #26523, #26522, #26516 | 中（集中爆点） |
| **模型路由与解析** | #29213, #24246 | 中（修复已发） |
| **自我认知与文档一致性** | #21432, #22598 | 中 |
| **终端性能与渲染** | #21924, #22466 | 中 |

---

## 💡 开发者关注点

1. **🔴 子代理"假成功"是最大痛点**
   多位开发者反馈 subagent 报告的状态与实际行为严重不符（#22323、#21409），社区迫切需要更精准的终止语义与可观测性。

2. **🟠 模型路由应尊重显式选择**
   自动升级机制（#29213）对稳定生产环境是**潜在风险**——开发者期望 `--model` 参数是"硬约束"而非"建议"。

3. **🟡 Skills/Sub-Agents 调用率低**
   开发者投入精力配置自定义技能（#21968），但模型几乎不主动调用，需要更显式的提示或训练引导。

4. **🟢 沙箱化执行路径成为共识**
   无论是模型原生 bash 倾向（#19873）还是扩展环境变量（#28863），都指向"零依赖 OS 级隔离"是 AGI Agent 的必然选择。

5. **🔵 Windows 兼容性长期欠账**
   NTFS 短名绕过（#29116）揭示 Windows 平台安全细节长期被忽视，社区呼吁投入更多资源。

6. **🟣 Memory 子系统进入集中治理期**
   单日出现 4 条与 Auto Memory 相关的 Bug（#26522-26525），表明该子系统已从"可用"转向"需加固"。

---

> 📊 **日报小结**：今日 Gemini CLI 的开发节奏聚焦于"**修复正确性 + 加固沙箱**"，主线工作是 #29213 触发的模型解析修复闭环。社区最关心的不再是"能不能用"，而是"**子代理报告可不可信、模型选择会不会被偷偷改写**"——这反映出 Gemini CLI 正从功能扩张期进入质量稳定期。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期：2026-09-06**

---

## 📌 今日速览

Reasonix 今日集中推送 **v1.38.0 稳定版**（CLI 与 Desktop 双端），核心改动为**网络搜索与主对话解耦**及**协议恢复可靠性增强**，围绕该版本一次性合入 8 项 PR。Issues 方面，v1.37.0 在 Agent 模式下集中爆发 `interrupted-turn-recovery` 与 `Reasoning required to replay tool turn` 两类"回合被中途掐断"故障，单日新增 14 条相关报告，成为社区最集中的痛点。

---

## 🚀 版本发布

### v1.38.0（Reasonix CLI / Desktop · 稳定版）

- **网络搜索独立通道**：将 `web_search` 从主对话协议剥离，避免搜索失败拖垮整个回合
- **协议恢复加固**：恢复路径显式化、可度量、有边界，支持 bounded retries
- **统一桌面管理页面**：Settings / Trash / Automation 三页共享导航、标题栏几何、焦点隔离
- **更新重启稳定化**：版本化更新经永久启动器或活动桌面重启，托盘身份不再漂移；横幅每小时刷新
- **链接菜单增强**：web / GitHub / mailto 链接新增右键上下文菜单，支持"复制引用"等操作
- **中转站图片能力识别**：保留 `supported / unsupported / unknown` 三态，支持 `Auto/On/Off` 手动覆盖
- **修复**：`/compact` 期间发送失败、自动化页面控件重叠、Windows 更新后回退旧版本等

🔗 [Release Notes](https://reasonix.io/changelog/v1.38.0/) · [PR #9826](https://github.com/esengine/DeepSeek-Reasonix/pull/9826)

---

## 🔥 社区热点 Issues

### 1. [#9825](https://github.com/esengine/DeepSeek-Reasonix/issues/9825) — Agent 回合被宿主中断，需 recovery 重发
长会话中多步工具链（edit → bash commit → 汇报）收尾阶段被掐，`bash` 输出被排除在模型上下文外，单会话可连续出现 4 次以上。**重要**：这是 v1.37.0 后 Agent 模式最核心的稳定性问题，直接影响交付质量。

### 2. [#8946](https://github.com/esengine/DeepSeek-Reasonix/issues/8946) — 频繁提示 "provider omitted reasoning required"
一个月前出现的顽固 bug，至今累积 21 条评论、5 个 👍。**重要**：跨 v1.25.3 → v1.37.0 持续出现，说明 v2 重写未根治该链路问题。

### 3. [#9818](https://github.com/esengine/DeepSeek-Reasonix/issues/9818) — 上下文压缩失败导致溢出
阈值到达后未触发自动压缩，最终窗口占满溢出。**重要**：与"回合中断"是不同维度但同等严重的故障，会让长会话直接中断。

### 4. [#9820](https://github.com/esengine/DeepSeek-Reasonix/issues/9820) — DeepSeek 官方供应商用 Anthropic 协议时工具调用失败
v1.37.0 + Anthropic Messages 协议 + 联网搜索 → 回合以错误结束。**重要**：揭示了**官方供应商 + 第三方协议**组合下的兼容性盲区，影响默认用户。

### 5. [#9822](https://github.com/esengine/DeepSeek-Reasonix/issues/9822) — Responses provider 发送 `metadata` 致 Grok 422
Grok (`grok-4.6`) 拒绝带 `metadata` 字段的请求。**重要**：典型"协议字段透传未做白名单"的兼容性问题，会扩散到所有严格校验的上游。

### 6. [#9817](https://github.com/esengine/DeepSeek-Reasonix/issues/9817) — Malformed request (HTTP 400)
`content[].thinking` 在 thinking 模式下必须回传，否则上游拒绝。**重要**：反映 **thinking 模式序列化**的协议合规性缺陷，跨协议通用。

### 7. [#9208](https://github.com/esengine/DeepSeek-Reasonix/issues/9208) — Desktop 转录滚动不收敛
滚动到 transcript 底部出现无限弹跳/闪烁，长会话尾部抖动。**重要**：v1.31.0 引入的 `react-virtuoso` 问题，预计在 PR #9777 中清理。

### 8. [#9806](https://github.com/esengine/DeepSeek-Reasonix/issues/9806) — `/compact` 期间发送失败
"turn admission did not produce a durable turn id" 在 `/compact` 窗口期内可复现。**重要**：涉及 turn-id 生命周期的一致性问题。

### 9. [#9816](https://github.com/esengine/DeepSeek-Reasonix/issues/9816) — 显示 deepseek 官方故障
用户侧误判为官方故障，实际是 Reasonix 协议层问题。**重要**：说明**错误信息归因**需要更精准，避免误导用户。

### 10. [#9621](https://github.com/esengine/DeepSeek-Reasonix/issues/9621) — 提案：切换模型时保留上下文投影
`promptCacheKey` 含 `modelRef`，切模型后上下文折叠投影失效，10% → 77% 瞬间膨胀。**重要**：高质量的功能提案，直击**跨模型会话连续性**这一核心场景。

---

## 🛠 重要 PR 进展

### 1. [#9826](https://github.com/esengine/DeepSeek-Reasonix/pull/9826) — 独立搜索与协议恢复可靠性改造 ⭐ 已合并
v1.38.0 核心 PR：将 `web_search` 解耦、恢复路径显式化。**功能**：搜索失败不再污染主回合；bounded retries 防止无限重试。

### 2. [#9821](https://github.com/esengine/DeepSeek-Reasonix/pull/9821) — 统一整页管理中心与模型配置 ⭐ 已合并
Settings / Trash / Automation 三页统一为全窗口管理页，workspace 保持挂载以保留草稿与阅读状态。

### 3. [#9809](https://github.com/esengine/DeepSeek-Reasonix/pull/9809) — 稳定更新重启、托盘身份 ⭐ 已合并
彻底解决 [#8458](https://github.com/esengine/DeepSeek-Reasonix/issues/8458) 中"更新后回退旧版"问题，永久启动器接管重启路径。

### 4. [#9777](https://github.com/esengine/DeepSeek-Reasonix/pull/9777) — 统一会话体验并稳定 Transcript 滚动 🔄 OPEN
移除 `react-virtuoso`、合并"Standard / Deep"两态会话偏好。**修复** [#9208](https://github.com/esengine/DeepSeek-Reasonix/issues/9208) 长会话抖动问题。

### 5. [#9812](https://github.com/esengine/DeepSeek-Reasonix/pull/9812) — 修复中转站模型图片能力识别 ⭐ 已合并
保留三态能力发现，新增 `Auto/On/Off` 手动覆盖控件。回应 [#9814](https://github.com/esengine/DeepSeek-Reasonix/issues/9814) 等中转站用户诉求。

### 6. [#9811](https://github.com/esengine/DeepSeek-Reasonix/pull/9811) — 修复自动化页面控件重叠 ⭐ 已合并
回应 [#9807](https://github.com/esengine/DeepSeek-Reasonix/issues/9807) 报告的按钮 X 重叠问题，Windows / macOS 平台分别调整。

### 7. [#9810](https://github.com/esengine/DeepSeek-Reasonix/pull/9810) — 恢复会话操作 ⭐ 已合并
复制/导出/终端/摘要等常用操作回到 topic bar 主层级，macOS 工作区对齐。

### 8. [#9824](https://github.com/esengine/DeepSeek-Reasonix/pull/9824) + [#9823](https://github.com/esengine/DeepSeek-Reasonix/pull/9823) — 链接上下文菜单 ⭐ 已合并
Markdown / GitHub / mailto 链接右键菜单（复制引用、复制邮箱、解码 mailto 路径）。

### 9. [#9827](https://github.com/esengine/DeepSeek-Reasonix/pull/9827) — 修复平台与工具输出断言 ⭐ 已合并
两个测试断言阻断 v1.38.0 发布资格：Windows 平台 Unix 权限位断言、argument-recovery 自适应预算断言。

### 10. [#9163](https://github.com/esengine/DeepSeek-Reasonix/pull/9163) — cachecontext 配置路径 + 按项目用户归属 🔄 OPEN
为 per-project DeepSeek KV-cache 归属奠基，包含 shared project-config 重构与默认值自动生成。

---

## 📈 功能需求趋势

从今日 18 条 Issues 中提炼的社区关注方向：

| 方向 | 代表 Issue | 关注度 |
|------|------------|--------|
| **Agent 回合稳定性** | [#9825](https://github.com/esengine/DeepSeek-Reasonix/issues/9825) · [#8946](https://github.com/esengine/DeepSeek-Reasonix/issues/8946) · [#9805](https://github.com/esengine/DeepSeek-Reasonix/issues/9805) | 🔴 极高（5+ 条同类） |
| **协议兼容性 / 多供应商** | [#9820](https://github.com/esengine/DeepSeek-Reasonix/issues/9820) · [#9822](https://github.com/esengine/DeepSeek-Reasonix/issues/9822) · [#9817](https://github.com/esengine/DeepSeek-Reasonix/issues/9817) · [#9815](https://github.com/esengine/DeepSeek-Reasonix/issues/9815) | 🔴 极高 |
| **上下文管理（压缩/投影/切换）** | [#9818](https://github.com/esengine/DeepSeek-Reasonix/issues/9818) · [#9621](https://github.com/esengine/DeepSeek-Reasonix/issues/9621) | 🟠 高 |
| **中转站 / 第三方模型支持** | [#9814](https://github.com/esengine/DeepSeek-Reasonix/issues/9814) · [#9822](https://github.com/esengine/DeepSeek-Reasonix/issues/9822) · [#9812 PR](https://github.com/esengine/DeepSeek-Reasonix/pull/9812) | 🟠 高 |
| **桌面 UI 体验** | [#9208](https://github.com/esengine/DeepSeek-Reasonix/issues/9208) · [#9807](https://github.com/esengine/DeepSeek-Reasonix/issues/9807) | 🟡 中 |
| **官方供应商状态归因** | [#9816](https://github.com/esengine/DeepSeek-Reasonix/issues/9816) | 🟡 中 |

---

## 👨‍💻 开发者关注点

### 高频痛点

1. **Agent "回合中断"已成系统性问题**：v1.37.0 之后连续出现 `interrupted-turn-recovery` 和 `Reasoning required to replay tool turn` 两条错误家族，跨官方供应商、Anthropic 协议、Grok responses 中转站、Anthropic 中转站等多个协议栈，强烈暗示 **tool-turn 的 reasoning 持久化层**在 v2 重写中存在结构性缺陷。v1.38.0 虽做了 recovery 加固，但根因（reasoning 被 omit）尚未明确修复。

2. **协议字段透传缺少白名单**：thinking block、metadata、promptCacheKey 等字段直接透传到上游，导致 HTTP 400 / 422。需要针对每种上游（OpenAI Responses / Anthropic Messages / Grok）建立字段白名单与序列化策略。

3. **错误归因误导**：上游故障与客户端故障在错误文案上混为一谈（如 [#9816](https://github.com/esengine/DeepSeek-Reasonix/issues/9816) 误判为官方故障），运维侧难以快速定位。

4. **测试断言与生产行为脱节**：[#9827](https://github.com/esengine/DeepSeek-Reasonix/pull/9827) 揭示存在平台假设硬编码、Windows 上断言 Unix 权限位等反模式，CI 质量需要重审。

5. **跨模型会话连续性缺失**：上下文折叠投影绑定 `modelRef`，切换模型即丢失 KV-cache 命中，提案 [#9621](https://github.com/esengine/DeepSeek-Reasonix/issues/9621) 直指这一长期痛点。

### 高频需求

- **更细粒度的回合可观测性**：用户希望看到"为什么被中断 / 哪个工具被掐 / recovery 是否真的无损"
- **官方 + 第三方供应商统一抽象层**：避免每加一个上游都要打补丁
- **Desktop 与 CLI 错误信息对齐**：让桌面端能展示与 CLI 同源的诊断信息
- **可恢复的 `/compact`**：避免压缩窗口期内无法发送消息

---

*日报基于 GitHub 仓库 `esengine/DeepSeek-Reasonix` 过去 24 小时数据生成。*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报

**日期：2026-09-06**

---

## 📌 今日速览

今日 OpenCode 社区活跃度集中在 **Bug 修复与 MCP/Anthropic 兼容性**领域，PR 合并量显著（50 条更新中已关闭 30+ 条），其中 Bedrock 凭证链路补全、MCP 工具 schema 规范化等高价值修复尤为突出。Issues 方面围绕 **CPU 资源浪费（#19466）** 和 **会话历史搜索功能（#41354）** 持续发酵，反映出社区对资源效率与生产力增强功能的强烈需求。

---

## 🚀 版本发布

*过去 24 小时内无新版本发布。*

---

## 🔥 社区热点 Issues（Top 10）

### 1. [#19466 - opencode 在空闲时仍占用 CPU](https://github.com/anomalyco/opencode/issues/19466) ⭐16
- **重要性**：用户报告在等待 API 速率限制时，OpenCode 占用单核 ~50% CPU（i9-14900），资源浪费严重
- **社区反应**：评论 17 条，👍 16 个，是当前热度最高的 Issue
- **影响**：揭示了 API 限流场景下的轮询机制缺陷，影响所有高频调用用户

### 2. [#41354 - 跨会话消息历史搜索功能](https://github.com/anomalyco/opencode/issues/41354) ⭐1
- **重要性**：用户积累数百个会话后无法快速定位"之前告诉 OpenCode 的内容"，严重影响长期生产力
- **社区反应**：评论 9 条，讨论详细，涉及需求分析
- **影响**：这是高频用户核心痛点，类似 Cursor 的历史搜索能力

### 3. [#37893 - 发布 Windows 便携版 OpenCode Desktop](https://github.com/anomalyco/opencode/issues/37893)
- **重要性**：当前仅提供 NSIS 安装包，缺少便携 ZIP/可执行文件，限制了 U 盘使用、企业部署等场景
- **社区反应**：评论 5 条
- **影响**：影响 Windows 用户群体，特别是受限环境的开发者

### 4. [#46628 - MCP 工具 schema 未对 Anthropic 规范化处理](https://github.com/anomalyco/opencode/issues/46628)
- **重要性**：MCP 服务器暴露的 `anyOf/oneOf/allOf` 根级组合器导致 Anthropic API 返回 400 错误，所有调用失败
- **社区反应**：评论 3 条，技术细节深入
- **影响**：影响所有使用 MCP + Anthropic 的用户，阻断核心工作流

### 5. [#47546 - Subagent 在 bash 完成后挂起](https://github.com/anomalyco/opencode/issues/47546)
- **重要性**：当 bash 调用完成但有分离的子进程存活时，subagent 会卡住不再发起下一次 LLM 请求
- **社区反应**：评论 1 条（新发）
- **影响**：影响多 agent 架构可靠性

### 6. [#47545 - Auto 模式在终端中触发重复权限通知](https://github.com/anomalyco/opencode/issues/47545)
- **重要性**：Warp/Orca 等 AI 终端中，Auto 模式每几秒触发权限通知，即使已自动批准
- **社区反应**：评论 0（新发）
- **影响**：严重影响无人值守运行体验

### 7. [#47543 - Anthropic MCP 工具的 anyOf/oneOf/allOf 根级失败](https://github.com/anomalyco/opencode/issues/47543)
- **重要性**：与 #46628 高度相关，独立的复现报告
- **社区反应**：评论 1 条
- **影响**：MCP + Anthropic 组合的阻塞性 Bug

### 8. [#47511 - 误导性提示信息](https://github.com/anomalyco/opencode/issues/47511)
- **重要性**：标记为重复（dupe of #36265），但反映了用户对 UI 文案的信任问题
- **影响**：涉及产品透明度和信任

### 9. [#47544 - 为 OpenCode 添加图像查看能力](https://github.com/anomalyco/opencode/issues/47544)
- **重要性**：用户请求支持查看截图、图片（OCR）
- **社区反应**：评论 2 条
- **影响**：补齐多模态输入能力短板

### 10. [#47541 - 向 Provider 插件暴露请求级工具执行](https://github.com/anomalyco/opencode/issues/47541)
- **重要性**：opencode-cursor-provider 维护者请求扩展 Provider API，用于跨请求工具执行
- **社区反应**：评论 0（新发）
- **影响**：影响第三方 Provider 生态扩展能力

---

## 🛠️ 重要 PR 进展（Top 10）

### 1. [#47436 - Bedrock 凭证通过 AWS 默认链路解析](https://github.com/anomalyco/opencode/pull/47436) ✅ Closed
- 补全 `AWS_PROFILE`、`~/.aws` 共享配置、SSO 缓存、Web Identity、实例元数据、STS 等完整凭证链
- **意义**：Bedrock 用户不再需要手动管理静态凭证

### 2. [#47542 - 修复 MCP 工具 schema 的 Anthropic 根级组合器](https://github.com/anomalyco/opencode/pull/47542) 🟢 Open
- 关闭 #47543：规范化 `anyOf/oneOf/allOf` 嵌套结构
- **意义**：解决 MCP + Anthropic 集成的关键阻塞 Bug

### 3. [#46912 - 退出前等待 stdout 写入完成](https://github.com/anomalyco/opencode/pull/46912) 🟢 Open
- 关闭 #29330：修复 `export`、`session list --format json` 管道截断
- **意义**：修复 CLI JSON 输出完整性问题

### 4. [#47306 - GitLab 推理变体支持](https://github.com/anomalyco/opencode/pull/47306) ✅ Closed
- 关闭 #47304：升级 gitlab-ai-provider 到 6.14.0，支持 GPT/Claude 推理强度控制
- **意义**：扩展企业级 Provider 能力

### 5. [#47441 - 按需加载 worktree 并限制并发请求](https://github.com/anomalyco/opencode/pull/47441) ✅ Closed
- 修复 Desktop 周期性卡死（红点状态），解决 SOCKET_POOL_STALLED 问题
- **意义**：显著改善 Desktop 应用稳定性

### 6. [#42746 - 修复 Cloudflare token 缺失时的崩溃](https://github.com/anomalyco/opencode/pull/42746) 🟢 Open
- 关闭 #42739：当环境变量存在但 token 缺失时优雅处理
- **意义**：提升 Provider 初始化健壮性

### 7. [#46520 - Web Home 显示全局项目会话](https://github.com/anomalyco/opencode/pull/46520) 🟢 Open
- 关闭 #46444：修复非 git 目录下隐藏会话的问题
- **意义**：改善 Web 端会话可见性

### 8. [#41016 - 为自定义模型转发 temperature 参数](https://github.com/anomalyco/opencode/pull/41016) 🟢 Open
- 关闭 #34554：修复 config-defined 自定义模型丢失 temperature 的问题
- **意义**：提升模型配置完整性

### 9. [#47213 - Copilot 请求附带 Session ID](https://github.com/anomalyco/opencode/pull/47213) ✅ Closed
- 在 `X-Interaction-Id` 头中传递 OpenCode session ID
- **意义**：便于服务端追踪和调试

### 10. [#46912 / #40727 - TUI 纯文本粘贴](https://github.com/anomalyco/opencode/pull/40727) ✅ Closed
- 关闭 #34006：新增 `Ctrl+Alt+V` 粘贴纯文本，避免图片/PDF 路径误转换
- **意义**：TUI 交互细节优化

---

## 📈 功能需求趋势

从今日 Issues 提炼出社区最关注的方向：

| 方向 | 代表 Issue | 关注度 |
|------|-----------|--------|
| **🔍 历史/会话搜索** | #41354 | 高（用户长期积累会话后检索困难） |
| **🪟 跨平台打包** | #37893（Windows 便携版） | 中 |
| **🖼️ 多模态输入** | #47544（图像查看） | 中 |
| **🔌 Provider 扩展性** | #47541（请求级工具执行） | 中 |
| **🧠 新模型/推理支持** | #47304（GitLab 推理变体） | 中 |
| **⚡ 性能优化** | #19466（CPU 占用） | 高 |
| **🛠️ MCP 生态兼容** | #46628, #47543 | 高（Anthropic 集成） |

**核心趋势**：**MCP 生态成熟度**、**Provider 扩展性**、**会话管理能力** 是当前三大主线。

---

## 👨‍💻 开发者关注点

### 痛点（高频反馈）
1. **资源效率问题** - 即使在限流等待时空闲进程仍占用显著 CPU（#19466）
2. **MCP + Anthropic 兼容性** - 多个根级组合器导致的 400 错误（#46628/#47543）
3. **会话管理缺失** - 无法搜索/检索历史会话内容（#41354）
4. **Desktop 稳定性** - 周期性卡死、SOCKET_POOL_STALLED（#47441）
5. **Subagent 可靠性** - bash 后台进程导致挂起（#47546）

### 高频需求
- ✅ **跨 Provider 的统一体验** - Bedrock/GitLab/Cloudflare 等多云凭证与配置一致性
- ✅ **CLI 输出完整性** - JSON 流式输出不截断（#46912）
- ✅ **TUI 交互细节** - 纯文本粘贴、Skills UX 改进（#40727, #40674）
- ✅ **国际化** - 新增瑞典语翻译（#40717）
- ✅ **快照/版本控制** - Unicode 路径 revert 修复（#40648）

### 社区贡献亮点
- **第三方 Provider 生态** 持续扩展（opencode-cursor-provider、gitlab-ai-provider）
- **自动化 PR 清理流程**（automated-pr-cleanup 标签）批量合并了大量长期未处理的 PR
- 多语言本地化（瑞典语）正在推进

---

*📊 数据来源：GitHub Issues & Pull Requests · 报告生成时间 2026-09-06*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期：2026-09-06**

---

## 📌 今日速览

今日 Hermes 仓库以 **Desktop HUD 全局快捷键**、**Bot 群聊持续运行**、**Kanban 调度原子化** 三条主线持续推进，多个高优 Issue 在 24 小时内被同步打开并配套提交修复 PR，节奏紧凑。安全侧亦有 `tornado 6.5.7→6.5.8` 的 lock-only 升级以应对 GHSA 高危公告。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues

| # | Issue | 优先级 | 摘要 | 链接 |
|---|---|---|---|---|
| 1 | **#97681** Bot 群聊在 Desktop 关闭后仍应工作 | P2 | Hermes 支持把 Bot 部署在笔记本、家用服务器或 VPS 并加入同一群聊；网关级权限与跨网关传输已合入 `main`，生产化重点是把基础接入会话生命周期与桌面聊天。**评论 23 条**，是今日讨论最热的工单。 | [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) |
| 2 | **#94916** Kanban lifecycle honesty：dry-run 写入状态、stop guard 拒绝 review 交接 | P3 | 两个 Kanban 生命周期契约与实现不一致：`dispatch --dry-run` 会污染持久化状态，stop guard 会拒绝 review 交接。影响调度可观测性。 | [#94916](https://github.com/NousResearch/hermes-agent/issues/94916) |
| 3 | **#83904** Hermes Desktop 调度的 cron 任务无法投递到当前聊天 | P2 | Desktop 端 chat 并非网关连接目标，`deliver=origin` 无法解析，导致定时任务结果丢失。Windows 平台复现。 | [#83904](https://github.com/NousResearch/hermes-agent/issues/83904) |
| 4 | **#103946** 32K 模型启动被 64K 最低值拒绝 | P2 | 本地 llama.cpp 32K 上下文（即便 YaRN 服务 64K）启动时直接抛 `ValueError`。影响本地推理用户。 | [#103946](https://github.com/NousResearch/hermes-agent/issues/103946) |
| 5 | **#103917** `delegate_task` 简化结构化输出契约 | P3 | 要求父模型手写 JSON Schema 太重，需要更轻的契约语法，并配套重试与校验。 | [#103917](https://github.com/NousResearch/hermes-agent/issues/103917) |
| 6 | **#103949** `select_backend()` 在 Linux+NVIDIA 上误返回 `cuda` | P2 | Linux CUDA 没有预编译产物，自动 backend 选择直接失败；Ubuntu 26.04 + RTX 5070 Ti 复现。 | [#103949](https://github.com/NousResearch/hermes-agent/issues/103949) |
| 7 | **#103936** Kanban 任务日志截断大工具 stdout | P3 | 工具 stdout 超过几 KB 即被换行/截断，影响“字面证据”留痕能力。 | [#103936](https://github.com/NousResearch/hermes-agent/issues/103936) |
| 8 | **#103940** 全局快捷键唤起 HUD 悬浮聊天 | P3 | 仿 ChatGPT Quick Chat 的 `⌘/Ctrl+Shift+G` 全局唤起 HUD，提升多任务切换效率。 | [#103940](https://github.com/NousResearch/hermes-agent/issues/103940) |
| 9 | **#103947** 扩展键“修饰维度”从未构建 | P2 | 52736 个键序列中只有 3.2% 被映射，本质是一个维度缺失，而非 N 个独立 bug。 | [#103947](https://github.com/NousResearch/hermes-agent/issues/103947) |
| 10 | **#43224** 最小化到托盘时的紧凑聊天弹窗（仿 Codex CLI） | P3 | 旧特性请求，今日再次被讨论以配合全局 HUD 路线。 | [#43224](https://github.com/NousResearch/hermes-agent/issues/43224) |

---

## 🛠 重要 PR 进展

| # | PR | 类型 | 要点 | 链接 |
|---|---|---|---|---|
| 1 | **#103943** MCP 服务器与内建工具集同名时不再被遮蔽 | Bug 修复 | 救援 #19793 的合并策略并 rebased 到当前 `toolsets.py`；让 `homeassistant`、`browser` 等命名冲突的 MCP 工具真正触达模型。 | [#103943](https://github.com/NousResearch/hermes-agent/pull/103943) |
| 2 | **#98073** Bot 模式：从消息应用控制群聊 | 功能 | 授权 owner 用 `/group` 命令族查询群聊、跟进消息、重试未完成工作、批准精确请求或 Stop。 | [#98073](https://github.com/NousResearch/hermes-agent/pull/98073) |
| 3 | **#98307** Bot 模式：群聊连续性、控制与文件 | 功能 | #97681 的完整字段构建；Desktop 关闭后 Bot 仍可跨网关收发消息与文件，可从手机接力。 | [#98307](https://github.com/NousResearch/hermes-agent/pull/98307) |
| 4 | **#103948** CLI：解析扩展键语法而非枚举 | Bug 修复 | 放弃对 CSI-u 笛卡尔积的硬编码，转向语法解析并向终端请求 `modifyOtherKeys`，根治 #103947 的根因。 | [#103948](https://github.com/NousResearch/hermes-agent/pull/103948) |
| 5 | **#103939** `delegate_task` 简化结构化输出契约 | 功能 | 新增 `output_fields` / `required_output_fields` 简写，编译到现有 JSON Schema 与重试管线，闭环 #103917。 | [#103939](https://github.com/NousResearch/hermes-agent/pull/103939) |
| 6 | **#103942** Desktop：HUD 全局召唤快捷键 | 功能 | 新增 `Ctrl/Command+Shift+U` 全局快捷键，冷启 / 收起双向，关闭 #103940，引用 #43224。 | [#103942](https://github.com/NousResearch/hermes-agent/pull/103942) |
| 7 | **#103945** tornado 6.5.7→6.5.8 安全升级 | 安全 | 仅 `uv.lock`，修复 GHSA-mpf4-983q-p7j4 等三个 HIGH 公告。 | [#103945](https://github.com/NousResearch/hermes-agent/pull/103945) |
| 8 | **#102098** 网关：隔离 profile 媒体缓存根目录 | Bug 修复 | 媒体缓存根目录从 import-time 默认值改为运行期 `HERMES_HOME`，限定白名单子目录。 | [#102098](https://github.com/NousResearch/hermes-agent/pull/102098) |
| 9 | **#103279** 实时离设备语音：服务端拥有 WS `/v1/audio/converse` | 功能 | 服务端持有 VAD / STT / Agent turn / 流式 TTS / barge-in，客户端只传 PCM。 | [#103279](https://github.com/NousResearch/hermes-agent/pull/103279) |
| 10 | **#75418** Docker：解析宿主机上的兄弟 bind 源 | Bug 修复 | 修复 #50798：Hermes 在 Docker 中通过宿主机 socket 创建 sandbox 时，需把 bind 源解析到宿主机路径。 | [#75418](https://github.com/NousResearch/hermes-agent/pull/75418) |

---

## 📈 功能需求趋势

- **Bot 群聊与多设备连续性**：#97681、#98073、#98307、#86198、#83904 共同指向“跨网关、跨设备、Desktop 关闭后仍在线”的体验闭环，是当前最重要的产品主线。
- **Desktop HUD / 全局快捷键 / 最小化体验**：#103940、#103942、#101951、#43224 形成明显簇群，社区在向“类 ChatGPT Quick Chat / Codex CLI”的桌面交互范式对齐。
- **Kanban / 调度可观测性**：#94916、#95900、#103936 共同关注调度原子化、dry-run 语义、日志保真——这是 Hermes 自动化的“可靠性”议题。
- **多 Provider / 聚合网关 / 推理参数**：#85631（Freemaxxing）、#103944（per-model `reasoning_format`）、#103917（轻结构化输出）反映出用户希望更细粒度的 Provider 控制与成本优化。
- **i18n / 本地化**：#92192（印尼语文档三件套）、#93632（Docusaurus `id` locale）、#103863（zh-Hant Skill 描述）显示社区在系统性补齐多语言资产。

---

## 💡 开发者关注点

- **本地推理入门门槛**：#103946、#103949 揭示“模型上下文最小值”与“自动 backend 选择”两条硬门槛，分别让 32K 模型用户和 Linux + NVIDIA 用户直接被拒之门外——配置层的“最小可行”需要更柔和。
- **CLI / TUI 终端语义**：#103947 / #103948 表明扩展键处理应走“语法解析 + 终端能力协商”而非“笛卡尔积硬编码”，这是跨平台终端健壮性的关键补丁。
- **安全依赖治理**：#103945 把 `hermes security audit` 接入 OSV.dev 扫描并自动产出 PR，体现团队希望把“高危 → PR”流程制度化。
- **Bot / 插件安全边界**：#103462（scoped plugin credential authorization）、#103941（向原生插件暴露原始消息上下文）显示“插件权限模型”是 Bot 生态能否放量的瓶颈。
- **自动化可观测性**：#100240（bounded local CI repair queue）、#102098（profile 媒体缓存隔离）、#85744（持久化 usage 渲染）共同指向“持久化状态 → 运行时上下文”的贯通问题，开发者希望系统不再“启动即遗忘历史”。

---

*日报基于 GitHub 公开数据自动生成，覆盖范围：Issues 13 条、PRs 50 条。*

:::
