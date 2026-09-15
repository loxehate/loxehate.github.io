---
title: "AI CLI 工具社区动态日报"
published: 2026-09-15
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-15

> 生成时间: 2026-09-15 09:46 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-15）

> 数据来源：Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenCode、Deepseek Harness、Hermes 七大工具 GitHub 社区动态日报（2026-09-15）。

## 1. 生态全景

AI CLI 工具已形成 **Anthropic、OpenAI、Google 三大官方势力与开源社区、DeepSeek 生态、Nous Research 多极并立**的格局，今日合计发布 11 个 Release、60 个精选 Issue 与 55 个精选 PR，迭代密度极高。然而稳定性与功能创新的矛盾普遍存在——Windows 平台故障、会话持久化缺陷、沙箱权限误伤成为跨工具共性痛点，无一幸免。多代理协作（子代理/Cowork/Task）、MCP 生态深化、成本透明化是当前竞争焦点。行业正从"单次对话生成代码"向"可编程的多代理开发基础设施"演进，**数据可靠性与结果诚实性**成为建立用户信任的关键门槛。

## 2. 各工具活跃度对比

| 工具 | 今日 Release | 精选 Issues | 精选 PRs | Issue 编号量级 | 单 Issue 最高评论 | 版本节奏 |
|---|---|---|---|---|---|---|
| Claude Code | 2（v2.1.271 / v2.1.272） | 10 | 3 | ~94k | **115** | 稳定补丁 |
| OpenAI Codex | **4**（rust alpha.2.4 → alpha.6） | 10 | 10 | ~45k | 61 | 激进 alpha |
| Gemini CLI | 1（nightly） | 10 | 12 | ~27k | 13 | 每日夜间版 |
| DeepSeek Reasonix | 1（Studio v2.16.0） | 10 | 10 | ~10k | 16 | 双轨并行 |
| OpenCode | 1（v1.18.31） | 10 | 10 | ~49k | 41 | 常规迭代 |
| Deepseek Harness | 1（v0.1.6-alpha.1） | 0 | 0 | — | — | 早期 alpha |
| Hermes | 1（v0.21.3，合并 ~338 PR） | 10 | 10 | **~111k** | 12 | 大规模批量合并 |

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求（数据佐证） |
|---|---|---|
| **Windows 平台稳定性** | Claude Code、Codex、OpenCode、Hermes、Reasonix | GPU 崩溃致 MSIX 不可启动（#80444，111 评论）、Plan9 共享挂载全灭（#92984，115 评论）、桌面首轮后无法发消息（#45626）、14+ 本地 MCP 全部启动失败（#48743）、Windows 11 会话窗口丢内容（#10316） |
| **会话持久化与恢复** | Reasonix、Codex、Gemini、OpenCode | 会话写入磁盘但列表不可见（#10343）、UI 丢记录但 JSONL 仍在（#44362）、`/compress` 摘要不落盘恢复后失效（#21335）、ACP 会话模型边界在 fork 时丢失（v1.18.31 修复项） |
| **子代理/多代理可靠性** | Claude Code、Gemini、OpenCode、Hermes | 桌面版禁 SendMessage 阻断子代理恢复（#92016/#92183）、Subagent 达 MAX_TURNS 误报 success（#22323）、generalist 挂起 1 小时（#21409）、Task 工具无法动态选模型（#6651，80👍）、cron 任务忽略模型固定（#100437） |
| **MCP 集成可靠性** | Claude Code、OpenCode、Hermes、Harness、Reasonix | 浏览器 MCP 无限挂起且无超时（#94475）、本地 MCP 冷启动全灭需手动重启（#48743）、HTTP/SSE MCP 忽略系统代理（#111794）、MCP 资源读取与 URI 模板补齐（Harness v0.1.6 / Reasonix #10349） |
| **成本透明度与配额管理** | OpenCode、Codex、Hermes、Reasonix | Go 计划用量 API 获 **138👍 全场最高**（#16017）、订阅额度耗尽后按 11-13 倍标价计费（#110912）、模型容量错误拒绝新会话（#45648）、提示缓存标记错位致压缩即失效（#111774） |
| **沙箱/权限模型过度收紧** | Claude Code、Gemini、Codex、Reasonix | bypassPermissions 被 Read 规则打断（#91683，26👍 但仅 8 评论，大量静默中招）、Worktree 拒绝所有复合命令（#87959）、沙箱扩展无限递归致内存溢出（PR #29332）、`bash="off"` 配置被强制覆盖（#10292） |
| **结果诚实性与进程安全** | Hermes、Gemini、OpenCode、Claude Code | `clear-legacy` 删除失败仍 exit 0（#111776）、不完整轮次被报告为完成（#111770）、Bash `exec` 后 `kill` 无防护可终止会话（#94469）、空 completion 一律重试（PR #49061） |

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线亮点 | 当前最大短板 |
|---|---|---|---|---|
| **Claude Code** | Anthropic 官方企业级全栈助手（CLI+桌面+Cowork） | 企业团队、多代理协作重度用户 | 远程会话快速模式、/config 鼠标支持、Cowork 多代理 | Windows 稳定性与桌面/CLI 功能分裂 |
| **OpenAI Codex** | OpenAI 官方统一入口，Rust 重构 | ChatGPT 生态订阅用户 | daemon 与 CLI 解耦、Windows 注册包沙箱、TUI 数学渲染 | alpha 迭代过快，桌面消息链路故障成串 |
| **Gemini CLI** | Google 官方 Agent 优先开发工具 | 企业治理环境、Gemini API 用户 | 策略目录权限体系、A2A 服务器、AST 感知文件读取提案 | 子代理行为不可预测，功能提案落地慢 |
| **DeepSeek Reasonix** | DeepSeek 生态桌面优先 + Studio IDE | 中文开发者、成本敏感型用户 | 桌面/Studio 双轨、SessionID 统一持久化重构、前缀缓存 ROI 看板 | 发布质量门禁缺失，v1.38.8 会话丢失信任危机 |
| **OpenCode** | 开源社区驱动的协议标准化客户端 | 插件开发者、ACP/MCP 重度用户 | ACP 协议深度支持、`mcp tools` 可观测命令、三端覆盖 | 桌面启动性能、模型 API 边界处理不完善 |
| **Deepseek Harness** | DeepSeek 官方 Headless 自动化工具链 | CI/CD、批处理、脚本化用户 | stdin 驱动、Web 侧边栏多标签终端、会话归档恢复 | 早期阶段（v0.1.6-alpha），社区未形成 |
| **Hermes** | Nous Research 多模型网关 + Agent 框架 | 多云路由、自托管高可用用户 | 凭证池管理、模型级故障隔离（PR #111787）、kanban 任务调度 | 批量补丁与已知问题"字节相同"未修复，CLI 假成功 |

**一句话概括**：Claude Code 卖企业稳、Codex 卖迭代快、Gemini 卖治理严、Reasonix 卖性价比、OpenCode 卖开放协议、Harness 卖自动化、Hermes 卖多模型路由。

## 5. 社区热度与成熟度

| 阶段 | 工具 | 判定依据 |
|---|---|---|
| **成熟稳定** | Claude Code | v2.1.x 补丁节奏；单 issue 115 条评论为全场最高，企业反馈有深度 |
| **快速迭代** | OpenAI Codex、Gemini CLI、Hermes | Codex 单日 4 个 alpha；Gemini 每日 nightly + 安全 PR 密集；Hermes 单版本合并约 338 个 PR |
| **扩张阵痛** | DeepSeek Reasonix | 功能与用户增长快，但会话持久化大规模回归、约 1/3 Issue 与数据丢失相关，处于"增长快于质量保障"的危险区间 |
| **社区驱动** | OpenCode | 功能投票热情最高（138👍），UI 改版争议（#48882）显示强用户粘性 |
| **早期培育** | Deepseek Harness | 24 小时内 0 Issue/PR，处于版本整合后的平静期 |

历史累计 Issue 编号量级排序：**Hermes（111k+）> Claude Code（94k+）> OpenCode（49k+）> Codex（45k+）> Gemini（27k+）> Reasonix（10k+）**。但需注意互动质量差异：Hermes 单 issue 最高评论仅 12 条，而 Claude Code 达 115 条——前者用户偏向"提交即走"的基础设施消费者，后者社区有深度的双向排障讨论。综合判断：**Claude Code 社区互动质量最高，OpenCode 需求表达最活跃，Codex 迭代速度领先但稳定性透支，Reasonix 正经历信任修复期**。

## 6. 值得关注的趋势信号

1. **结果诚实性成为 Agent 信任分水岭**。Hermes 删除失败仍返回 0、Gemini Subagent 达上限报成功、Claude Code 会话可被外部 `kill`、OpenCode 为空响应补重试——多个工具在"失败可感知"上集体失守。评估工具时应建立"退出码 + 产物校验"的双重确认机制，而非信任模型自述。

2. **Windows 是全体玩家的共同阿喀琉斯之踵**。没有任何工具在 Windows 上提供与 macOS/Linux 同等的体验。Windows 团队引入 AI CLI 前应做严格验收测试，并预留版本回滚方案（Reasonix 用户回滚 1.38.7 即恢复正常的案例值得借鉴）。

3. **会话数据已被视为不可再生资产**。Reasonix 的会话消失、Codex 的 UI/JSONL 数据分裂、Gemini 的压缩摘要不落盘、OpenCode 的启动同步加载阻塞——用户将长时间上下文视为生产力资产。企业应在工具外部建立定期导出备份机制，升级前验证持久化路径无回归。

4. **MCP 从"锦上添花"变成"生产依赖"**。浏览器 MCP 挂起无超时（Claude Code）、冷启动全灭（OpenCode）、代理缺失（Hermes）、资源读取补齐（Harness/Reasonix）——MCP 的启动生命周期、超时、认证与可观测性正成为标配能力。选型时需重点考察工具的 MCP 诊断能力。

5. **成本焦虑从"token 单价"升级为"系统级浪费"**。Hermes 缓存标记错位导致压缩即失效、OpenCode 用量 API 获全场最高 138👍、Reasonix 推出前缀缓存 ROI 看板——企业应关注缓存命中率、配额可见性和任务级预算能力，而非仅比较单价。

6. **安全策略进入"收紧—误伤—校准"周期**。Claude Code bypassPermissions 回归（26👍 vs 8 评论，大量静默中招）、Gemini 沙箱无限递归、Reasonix 配置被强制覆盖——安全功能应渐进式生效并提供明确拒绝原因，而非一刀切；开发者在升级后应针对权限类变更做专项回归测试。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据源**: github.com/anthropics/skills | 截止 2026-09-15

---

## 1. 热门 Skills 排行

以下按社区关注度（评论数）排序，均为 **Open** 状态：

### 🥇 #1298 skill-creator 触发器评测修复（最受关注）
- **作者**: @MartinCajiao | 创建 2026-06，持续活跃至 9 月
- **功能**: 修复 skill-creator 的 trigger 评测逻辑——隔离 per-worker 命令探针竞争、解决 Windows 下 `select()` 子进程管道失败、防止无关工具中断扫描，并修正运行时失败被误判为"非触发"导致负例误通过的问题。
- **讨论热点**: 评测准确性、Windows 跨平台兼容、负例/正例判定可靠性。
- 🔗 https://github.com/anthropics/skills/pull/1298

### 🥈 #1742 mcp-builder 兼容 mcp>=2
- **作者**: @Kuldeep18 | 创建 2026-09-08，更新 09-13
- **功能**: 修复 `mcp>=2.0.0` 后 `streamablehttp_client` 更名为 `streamable_http_client`，且自定义 headers 需通过 `create_mcp_http_client` 传递的问题。
- **讨论热点**: MCP SDK 版本演进带来的破坏性变更，直接影响所有 mcp-builder 用户。
- 🔗 https://github.com/anthropics/skills/pull/1742

### 🥉 #514 document-typography 文档排版质检
- **作者**: @PGTBoos | 创建 2026-03
- **功能**: 新增独立 skill，专门修复 AI 生成文档的排版问题：孤行（1-6 词溢出到下一行）、寡妇段落（标题滞留页底）、编号错位。
- **讨论热点**: 这是 AI 生成文档的普遍痛点，社区认可度高。
- 🔗 https://github.com/anthropics/skills/pull/514

### #525 pyxel 复古游戏开发
- **作者**: @kitao（Pyxel 引擎作者）| 创建 2026-03，09-13 仍在更新
- **功能**: 基于 pyxel-mcp 的复古/像素风游戏开发 skill，覆盖"编写→运行截图→检查→迭代"全流程。
- **讨论热点**: 官方引擎作者亲自贡献，生态价值高，活跃度持续。
- 🔗 https://github.com/anthropics/skills/pull/525

### #1703 md2video-audio Markdown 转视频
- **作者**: @70v-Yoyo | 创建 2026-09-01
- **功能**: 零成本将 Markdown 文档经 Marp 转幻灯片，合成带真人感配音的 MP4 视频。
- **讨论热点**: 内容创作自动化方向，完整实现了从文档到成片的流水线。
- 🔗 https://github.com/anthropics/skills/pull/1703

### #1628 Hivemind 多智能体编排
- **作者**: @Hanishchow | 创建 2026-08-21
- **功能**: 让 Claude Code 将机械性工作委派给 headless opencode worker（跑免费模型），Claude 保留规划、审查、合并的决策权。
- **讨论热点**: "贵模型的上下文是稀缺资源"这一观点引发讨论，属于成本优化型新范式。
- 🔗 https://github.com/anthropics/skills/pull/1628

### #1734 检测孤立 docx 评论
- **作者**: @rohitjain25 | 创建 2026-09-06
- **功能**: 检测 OOXML 文档中失去归属的孤儿评论（comment 未关联任何文本范围）。
- **讨论热点**: 文档完整性验证方向的细分补充。
- 🔗 https://github.com/anthropics/skills/pull/1734

---

## 2. 社区需求趋势（来自 Issues）

| 方向 | 代表 Issue | 评论数 | 核心诉求 |
|---|---|---|---|
| **安全与信任边界** | #492 社区技能冒充官方 | **43** | 社区技能混入 `anthropic/` 命名空间，存在信任边界滥用、权限提升风险——**目前最高热度议题** |
| **组织级共享** | #228 org-wide 技能共享 | 16 | 需在 Claude.ai 内直接共享技能库，而不是手动下载+Slack 传播 |
| **评测工具可靠性** | #556 run_eval.py 触发率 0% | 12 | 评测框架下 `claude -p` 从不触发技能，评测结果失真 |
| **技能管理/恢复** | #62 技能全部消失 | 10 | 用户技能文件丢失、重命名导致不可见，缺少恢复机制 |
| **记忆与状态管理** | #1329 compact-memory | 9 | 用符号化记法压缩长时运行 agent 的上下文笔记 |
| **插件去重** | #189 双插件内容重复 | 6 | document-skills 与 example-skills 安装后产生重复技能，浪费上下文 |
| **上下文窗口效率** | #1487 claude-api 注入 156k tokens | 4 | 单次工具调用即耗尽上下文，需按需加载而非全量注入 |
| **平台集成** | #29 Bedrock 支持 | 4 | 希望 Skills 可在 AWS Bedrock 上使用 |
| **协议开放** | #16 将 Skills 暴露为 MCP | 4 | 用 MCP 统一技能 API 形态，便于跨 Agent 复用 |
| **Agent 治理** | #412 agent-governance | 6 | 策略执行、威胁检测、信任评分、审计轨迹（已关闭但方向明确） |
| **推理质量门** | #1385 质量门流水线 | 4 | 任务前校准→对抗审查→交付验证的三段式质检 |

**趋势总结**: 社区已从"要更多技能"转向"技能更可靠、更安全、更省上下文"——评测框架的 bug 和命名空间信任问题占据了最高热度。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃且未合并，近期落地概率较高：

| Skill | 简述 | 落地潜力分析 |
|---|---|---|
| [#1742 mcp-builder 修复](https://github.com/anthropics/skills/pull/1742) | mcp>=2 兼容 | ⭐⭐⭐⭐⭐ 明确的破坏性变更修复，范围小、收益大 |
| [#1734 docx 孤儿评论检测](https://github.com/anthropics/skills/pull/1734) | 文档完整性 | ⭐⭐⭐⭐ 功能独立、易于验证，契合 office 系列 skill 体系 |
| [#525 pyxel 游戏开发](https://github.com/anthropics/skills/pull/525) | 复古游戏 | ⭐⭐⭐⭐ 官方引擎作者维护，9 月仍在迭代 |
| [#1703 md2video-audio](https://github.com/anthropics/skills/pull/1703) | Markdown→视频 | ⭐⭐⭐ 完整实现+配音方案，但涉及外部工具链较多 |
| [#1628 Hivemind](https://github.com/anthropics/skills/pull/1628) | 多智能体编排 | ⭐⭐⭐ 概念新颖，但依赖第三方 headless agent，官方合并可能持谨慎态度 |

**共同特征**: 近期（8-9 月）创建的 PR 更新频率更高，说明作者维护意愿强、与维护者交互活跃。

---

## 4. Skills 生态洞察

> **当前社区最集中的诉求是"可靠性与信任"**：既要修复技能评测/触发的可靠性问题（#556、#1298、#1390），又要解决命名空间滥用带来的安全信任危机（#492），同时抑制技能体积膨胀对上下文的消耗（#1487、#189）——社区正在从"堆数量"转向"建质量基础设施"。

---

# Claude Code 社区动态日报 | 2026-09-15

## 今日速览

今日发布两个补丁版本 v2.1.271 / v2.1.272，前者引入远程会话"快速模式"和 `/config` 面板鼠标支持。Issue 侧热度集中在 **Windows 平台稳定性**：KB5124008 导致 Cowork 全部 Plan9 共享挂载失败（#92984，115 条评论）与桌面版 GPU 进程崩溃簇（#80444，111 条评论）构成社区讨论主力；同时桌面版与 CLI 功能分裂（SendMessage 禁用、斜杠命令补全失效）引发多起回归投诉。

## 版本发布

**v2.1.272**
- Bug 修复与可靠性改进

**v2.1.271**
- Claude Code 远程会话（云端与自托管 runner）新增**快速模式**：支持继承宿主 fast-mode 设置，或会话内输入 `/fast` 启用（组织策略允许时）
- `/config` 面板在全屏模式下新增鼠标支持，滚轮可滚动设置

## 社区热点 Issues

### 1. Windows 更新 KB5124008 破坏全部 Plan9 共享 — #92984
[链接](https://github.com/anthropics/claude-code/issues/92984)

安装 KB5124008（build 26200.9445）后，所有 Plan9 共享报 `Plan9 mount failed: invalid argument`，卸载 KB 即恢复。**115 条评论 / 58 👍**，是当前社区影响面最大的单点故障，Cowork 用户几乎无法正常工作。

### 2. 桌面版 GPU 崩溃致 MSIX 包不可启动 — #80444
[链接](https://github.com/anthropics/claude-code/issues/80444)

Electron GPU 进程崩溃（0x060C201E）后应用包进入 appxState=2 状态，必须 Repair 才能重新启动。**111 条评论 / 17 👍**，属于 Windows 桌面版 GPU 崩溃问题集群（#89016、#90891、#89525 等）的核心案例，持续近两个月仍未根治。

### 3. 桌面版自动拒绝 SendMessage，子代理恢复被阻断 — #92016
[链接](https://github.com/anthropics/claude-code/issues/92016)

macOS Desktop 1.46388.1 在 Code 标签页自动拒绝 CLI 原生 `SendMessage` 工具，导致子代理无法接续会话。**23 条评论 / 11 👍**。与 #92183、#92646 构成同一问题族——桌面版对子代理通信工具的禁用是系统性的。

### 4. bypassPermissions 模式回归：Read 拒绝规则引发多余提示 — #91683
[链接](https://github.com/anthropics/claude-code/issues/91683)

2.1.259 起，配置了 Read deny 规则后 `cd DIR && grep …` 在 bypassPermissions 模式下仍弹权限确认，2.1.258 无此行为。**8 条评论 / 26 👍**，点赞量远高于评论量，说明大量用户被此回归波及。

### 5. 桌面版全面禁止 SendMessage — #92183
[链接](https://github.com/anthropics/claude-code/issues/92183)

Code 标签页中 Claude 无法向运行中或已完成的子代理发送消息/恢复会话。**6 条评论 / 18 👍**，与 #92016 独立报出，进一步佐证该问题是跨平台（macOS + Windows）通用缺陷。

### 6. Cowork (Windows) mcp__workspace__bash 每次会话均被拒绝 — #91594
[链接](https://github.com/anthropics/claude-code/issues/91594)

从 1.40609.1.0 升级到 1.44121.1.0 后，Cowork 会话中 MCP 工作区 bash 工具被全量拒绝，权限模型疑似回归。**7 条评论 / 3 👍**，Windows + Cowork + MCP 的组合问题。

### 7. Worktree 隔离下 Bash 守卫拒绝所有复合命令 — #87959
[链接](https://github.com/anthropics/claude-code/issues/87959)

只要命令解析结果不是单个简单命令——heredoc、`&&` 链、`;` 链全部被拒，与命令实际内容无关。**7 条评论**，隔离安全检查过于激进，已开放近一个月仍未修复。

### 8. VS Code 集成浏览器 MCP 工具无限挂起 — #94475
[链接](https://github.com/anthropics/claude-code/issues/94475)

`openBrowserPage` / `navigatePage` / `screenshotPage` 等工具在浏览器中动作已完成，但结果永不返回，会话卡死直到手动中断，且无超时机制。**新问题**，严重度极高。

### 9. Bash exec 后父进程被杀导致会话终止 — #94469
[链接](https://github.com/anthropics/claude-code/issues/94469)

Linux 上命令内 `exec` 后 CLI 成为目标程序的直接父进程；`pkill` 有防护但 `kill` 没有，杀死父 PID 即可终止整个会话。**新问题**，值得注意的是——该 issue 由 Claude 本人在会话中分析并代用户提交。

### 10. 自动模式 Bash 覆盖文件未做存在性检查 — #94472
[链接](https://github.com/anthropics/claude-code/issues/94472)

自动模式下 Claude 用 Bash 写入 `staticwebapp.config.json`，未检查文件已存在，原安全规则配置被整体清空。**新问题**，暴露了 auto 模式下 Bash 写文件绕过 Write 工具检查的数据安全风险。

## 重要 PR 进展

> 过去 24 小时 PR 更新较少（共 3 条），全部列出：

1. **mods/diff 交互重构：dock 面板与内置 /diff 对齐** — [#94184](https://github.com/anthropics/claude-code/pull/94184)
   固定头部的 body-only 滚动模式；标题、基础行和 8 行文件列表保持固定，滚轮按 3 行/tick 移动 hunks（或悬停在溢出列表时按文件滚动）；ctrl/opt+↑↓ 与 ctrl+x b 快捷键行为与内置面板一致。**已关闭**。

2. **新增 pylint CI 工作流** — [#83890](https://github.com/anthropics/claude-code/pull/83890)
   添加 `.github/workflows/pylint.yml`。**已关闭**，未合并。

3. **sandbox 文档：注明 prompt 批准的宿主为会话级** — [#71627](https://github.com/anthropics/claude-code/pull/71627)
   在 `examples/settings/README.md` 的 Tips 中补充说明：prompt 时批准的域名是**会话作用域**的，恢复会话后需重新批准。**仍开放**，等待维护者处理。

## 功能需求趋势

- **Windows 稳定性是当前最大短板**：GPU 崩溃簇（#80444、#90891、#89016、#89525、#90461）与 Plan9 挂载失败（#92984）占社区反馈最大比重；MSIX 包完整性被破坏导致应用不可启动的问题尤为严重。
- **桌面版与 CLI 能力对齐需求迫切**：SendMessage 被禁（#92016、#92183）、斜杠命令补全失效（#91094）、上下文指示器含义变化（#91075）——桌面 Code 标签页的权限与交互实现明显落后于终端 CLI。
- **沙箱/权限模型收紧但误伤率偏高**：bypassPermissions 回归（#91683）、Worktree 复合命令被拒（#87959）、prompt 批准宿主改为会话级（PR #71627）——安全边界的调整仍在进行中，用户体验受损明显。
- **子代理 / Cowork 工作流成为核心使用场景**：多个 issue 围绕子代理消息恢复、Cowork MCP 工具权限展开，说明多代理协作已经从实验特性变成日常依赖，其稳定性亟待加强。
- **MCP 生态集成进入深水区**：VS Code 浏览器 MCP 工具挂起（#94475）、MCP OAuth token 撤销异常（#94471），MCP 工具的可靠性与鉴权链路仍需打磨。

## 开发者关注点

- **Windows 用户受伤最深**：从 GPU 崩溃、Plan9 挂载失败到 MSIX 包升级破坏代码完整性，问题集中且修复周期长。KB5124008 是外部系统更新，但社区期望 Claude Code 侧提供规避方案或加速修复。
- **权限系统回归伤害信任**：bypassPermissions 在 2.1.259 的行为变化让用户质疑"模式是否真的生效"。该 issue 点赞数（26）远超评论数（8），说明大量用户静默中招。
- **数据安全焦虑上升**：#94472 暴露自动模式下 Bash 写入绕过 Write 工具检查的风险，用户希望有强制性的文件存在性检查或写保护机制。
- **桌面版被视为"二等公民"**：同一能力在 CLI 可用、桌面版不可用的情况反复出现（SendMessage、斜杠补全），用户期望桌面入口与 CLI 行为保持一致，而非功能子集。
- **进程管理存在安全空白**：#94469 揭示了 Bash 工具 `exec` 后进程树归属缺陷，`kill` 缺少与 `pkill` 同级的防护，存在会话被意外终止的隐患。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 — 2026-09-15

## 今日速览

昨日发布 4 个 rust 系列 alpha 版本（0.155.0-alpha.2.4 → 0.155.0-alpha.6），主要围绕沙箱稳定性与 TUI 体验迭代。社区方面，Windows 桌面版消息发送缺陷与模型容量报错成为今日最集中的反馈热点，另有 macOS 沙箱启动失败等新问题浮出水面。

## 版本发布

过去 24 小时发布了 4 个版本：

- **rust-v0.155.0-alpha.6** — 0.155.0-alpha.6
- **rust-v0.155.0-alpha.5** — 0.155.0-alpha.5
- **rust-v0.155.0-alpha.4** — 0.155.0-alpha.4
- **rust-v0.155.0-alpha.2.4** — 0.155.0-alpha.2.4

Release 说明暂未附带详细变更日志，但从同期合并的 PR 推断，以上版本大概率包含：Windows 注册包沙箱执行模式、daemon 包管理与 CLI 解耦、TUI 数学公式渲染、附件上传/解析 API 等新能力。

## 社区热点 Issues（10 个）

1. **#8197 — [CLOSED] VS Code 扩展长时间运行后面板变灰**
   （评论 61 | 👍 21）
   存在时间最长的热门 bug 之一，企业版用户反馈扩展在长时间任务后面板完全变灰。终于关闭，但根因与修复细节值得关注。
   https://github.com/openai/codex/issues/8197

2. **#44781 — [Codex Desktop] 编辑并重发排队消息触发 "App-server queued follow-up no longer exists"**
   （评论 33 | 👍 40）
   今日高赞问题。Windows 桌面版在消息排队状态下编辑并重发会导致 app-server 报错，影响聊天连续性。
   https://github.com/openai/codex/issues/44781

3. **#4867 — 允许 Codex Web 创建包含二进制文件的 PR**
   （评论 30 | 👍 52）
   高赞功能请求。用户耗时 40 分钟完成的任务因误生成的小二进制文件而无法合并 PR，希望支持二进制文件。
   https://github.com/openai/codex/issues/4867

4. **#44102 — Windows Desktop 首个回合完成后无法发送后续消息**
   （评论 22 | 👍 2）
   与 #45626 同源的高频故障：Windows 桌面版在首轮对话完成后，输入框发送按钮不可用，严重阻塞工作流。
   https://github.com/openai/codex/issues/44102

5. **#34349 — 允许用户完全禁用 Pets 并移除侧边栏入口**
   （评论 13 | 👍 54）
   今日最高赞功能请求。社区对 Pets 功能的反对声持续升温，要求提供完整的禁用选项和 UI 隐藏能力。
   https://github.com/openai/codex/issues/34349

6. **#45119 — macOS 14.2：沙箱启动失败，报未绑定变量 TIOCSTI**
   （评论 14）
   影响 Apple Silicon + macOS 14.2 用户的沙箱启动故障，上游 main 分支仍存在相同问题，需尽快修复。
   https://github.com/openai/codex/issues/45119

7. **#45626 — [Windows Desktop 26.908.70816] 首轮对话后所有线程无法发送消息**
   （评论 4 | 今日新建）
   最新版本仍未修复 #44102 类问题，且影响范围扩展至既有会话和新建会话，CLI 不受影响。
   https://github.com/openai/codex/issues/45626

8. **#45603 — Windows 写入操作挂起，干净工作区不执行写入命令**
   （评论 4 | 今日新建）
   沙箱写入操作完全挂起，系统重启无效。与 #45153 (helper_sandbox_lock_failed) 可能是同一沙箱锁问题。
   https://github.com/openai/codex/issues/45603

9. **#44135 — Windows 上 Chrome 控制失败，报 nodeRepl.fetch request failed**
   （评论 16）
   已检测到 Chrome 但无法列出标签页，Edge 打开也失败。浏览器控制工具在 Windows 上不可用。
   https://github.com/openai/codex/issues/44135

10. **#45648 — 新建对话报 "Selected model is at capacity"，既有对话不受影响**
    （评论 2 | 今日新建）
    Pro x20 用户反馈新会话被容量错误拒绝，但旧会话可继续使用，疑似路由或配额状态同步缺陷。
    https://github.com/openai/codex/issues/45648

## 重要 PR 进展（10 个）

1. **#45612 — TUI 渲染独立显示数学公式**
   copyberry bot 提交。为 TUI 增加显示级数学公式的空间布局能力，流式公式在闭合分隔符未到达前保持可变。
   https://github.com/openai/codex/pull/45612

2. **#45602 — 修复节流与配额错误的重试分类**
   `slow_down` 错误此前被误判为终端服务器过载；余额耗尽与消费限额错误被错误归为可重试流错误。本次修正分类逻辑。
   https://github.com/openai/codex/pull/45602

3. **#45580 — 从 CLI 显式替换 daemon 包**
   新增 `codex app-server daemon update --from-cli`，支持从 CLI 复制并固定完整包（含降级和本地构建），需交互确认。
   https://github.com/openai/codex/pull/45580

4. **#45579 — 复制当前线程附件到非临时 fork**
   非临时 fork（含回溯到早期回合的 fork）现在会正确携带源线程的当前附件，保留资源标识与内容。
   https://github.com/openai/codex/pull/45579

5. **#45559 — 服务重启后恢复 Windows 沙箱注册刷新**
   修复服务重启可能中断沙箱账户注册刷新流程的问题，避免运行时就绪状态被吊销后无响应。
   https://github.com/openai/codex/pull/45559

6. **#45558 — 通过本地 CLI 包补齐缺失的 daemon 安装**
   daemon 生命周期命令不再强制要求独立托管安装，完整的 CLI 包即可提供 daemon 可执行文件与辅助程序。
   https://github.com/openai/codex/pull/45558

7. **#45556 — 新增附件上传与解析 API，并将会话接入存储**
   用 `upload`/`resolve` 替代原 `persist` 方法，上传返回内联字节或文件 ID，解析仅在请求最小 URL 存活期时返回下载链接。
   https://github.com/openai/codex/pull/45556

8. **#45550 — Windows 沙箱新增可选注册包执行模式**
   通过 `CODEX_WINDOWS_REGISTERED_CORE=1` 启用，启动时捕获并传播所选运行时，通过服务记录的别名启动注册 runner，并校验所有权与包标识。
   https://github.com/openai/codex/pull/45550

9. **#45549 — 回合终止时保留流式 answer/plan 内容**
   修复中断或失败的回合可能丢弃缓冲的 answer/plan 源码，导致数学内容从记录中丢失或无法正确回流的问题。
   https://github.com/openai/codex/pull/45549

10. **#45546 — daemon 包从独立 CLI 安装中解耦**
    为 daemon 引入专用包，避免 daemon 更新影响可见的 CLI 版本与 shell profile，降低耦合度。
    https://github.com/openai/codex/pull/45546

## 功能需求趋势

- **Windows 桌面版稳定性成为压倒性诉求**：多条 issue 指向同一批问题（消息发送禁用、沙箱锁失败、写入挂起），社区呼声已从"希望修复"升级为"必须尽快修复"。
- **Pets 功能引发抵触情绪**：#34349 获得 54 👍，用户要求彻底禁用并移除入口，建议官方提供默认隐藏选项。
- **模型容量与配额透明度**：多起"Selected model is at capacity"事件，以及 GPT-5.3-Codex-Spark 在 Pro 账号下缺失于模型选择器，用户希望获得更清晰的配额展示和模型可用性状态。
- **浏览器控制与跨平台一致性**：Windows 上 Chrome/Edge 控制不可用的反馈持续，功能在 macOS 上正常，平台差异明显。
- **任务预算控制**：#45536 要求可执行的任务级预算限制和更清晰的用量控制，付费用户对额度消耗缺乏可控性表示担忧。

## 开发者关注点

- **高频痛点：Windows 消息发送链路** — #44102、#45626、#44781 三连击，用户在第一个回合完成后无法继续对话，涉及队列消息编辑、线程恢复等多个环节。
- **沙箱锁与写入挂起** — #45153（helper_sandbox_lock_failed）和 #45603（写入命令永不执行）让 Windows 用户的本地命令工具链接近不可用状态。
- **会话历史可靠性** — #44362 报告对话记录在 UI 中丢失但 JSONL 文件中仍有数据；#45191 则出现"Failed to resume chat"且本地记录完全缺失的残留入口问题。
- **性能异常** — #41822 指向 Windows 更新后首次启动耗时约 8 分钟（4,680 次加密复制重试）；#43971 报告 macOS 上 Codex Desktop 每 5 分钟泄漏一个 MCP 进程池。
- **模型行为可信度** — #37325 与 #42080 从不同角度指出：长任务中 Codex 可能将检查点文字提升为权威状态、未经充分证据就宣称任务完成，开发者希望有"基于证据的完成状态"与"熔断机制"。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-15

## 今日速览

今日发布 `v0.61.0-nightly.20260915.g9c1b0a610` 夜间版，核心聚焦 Agent 稳定性与安全加固。社区讨论热度集中在 Subagent 误报成功、shell 命令卡死等可靠性问题上，同时 Auto Memory 的隐私与效率问题成为新关注焦点。PR 侧则有大量针对策略目录权限、A2A 服务器日志安全和运行时资源控制的安全修复。

## 版本发布

**v0.61.0-nightly.20260915.g9c1b0a610**
仅发布 nightly 版本号，包含常规更新，无独立功能摘要。完整变更可查看 [Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260914.g9c1b0a610...v0.61.0-nightly.20260915.g9c1b0a610)。

## 社区热点 Issues

精选今日讨论最活跃、影响面最广的 10 个 Issue：

1. **[#22323 Subagent 达到 MAX_TURNS 被误报为 GOAL 成功](https://github.com/google-gemini/gemini-cli/issues/22323)** — `codebase_investigator` 子代理在达到最大轮次后仍返回 `status: "success"`，隐藏了真实的中断原因。评论 13 条，是目前社区讨论最激烈的正确性问题，直接误导用户对任务执行结果的判断。

2. **[#21409 Generalist agent 永久挂起](https://github.com/google-gemini/gemini-cli/issues/21409)** — 委派给 generalist agent 时无限期卡住，创建文件夹这类简单操作也受影响，用户最长等待 1 小时无响应。👍 8，是当前最影响日常使用的 P1 级 bug。

3. **[#19873 利用模型 bash 亲和力：零依赖 OS 沙箱与执行后意图路由](https://github.com/google-gemini/gemini-cli/issues/19873)** — 提议充分发挥 Gemini 3 原生 bash 操作能力，同时通过沙箱机制保障安全。评论 9 条，讨论热度高，代表了 Agent 工具调用的未来演进方向。

4. **[#25166 shell 命令执行后卡在 "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** — 简单命令执行完毕后 CLI 仍然显示等待输入，是高频复现的核心稳定性问题。👍 3，用户反馈「极简单的命令也会触发」。

5. **[#26525 Auto Memory 日志缺少确定性脱敏](https://github.com/google-gemini/gemini-cli/issues/26525)** — 本地转录内容在脱敏前就已进入模型上下文，且服务可能记录包含敏感信息的 skill 内容，引发隐私担忧。

6. **[#22745 AST 感知文件读取、搜索与代码库映射的影响评估](https://github.com/google-gemini/gemini-cli/issues/22745)** — EPIC 级优化提案：通过 AST 感知工具精确读取方法边界、减少 token 噪声和无效轮次，是上下文效率优化的重要方向。

7. **[#21968 Gemini 不会主动使用 skills 和 sub-agents](https://github.com/google-gemini/gemini-cli/issues/21968)** — 用户反馈模型几乎不会自主调用自定义 skills，即使存在相关描述也需显式指令。影响自定义 agent 生态的实际价值。

8. **[#21983 browser subagent 在 Wayland 下失败](https://github.com/google-gemini/gemini-cli/issues/21983)** — Linux/Wayland 环境下浏览器子代理无法正常工作，属于兼容性缺陷。

9. **[#24246 工具数量超过 128 个时触发 400 错误](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数量上限导致请求失败，社区期望模型能动态限制工具范围而非硬报错。

10. **[#21335 `/compress` 命令在会话恢复后不持久](https://github.com/google-gemini/gemini-cli/issues/21335)** — 内存中的压缩摘要不会写回磁盘 session 文件，导致恢复后 token 节省失效。👍 2，涉及日常 token 成本管理。

## 重要 PR 进展

以下 10 个 PR 反映了当前开发重点：

1. **[#29304 修复截断时拆分 UTF-16 代理对](https://github.com/google-gemini/gemini-cli/pull/29304)** — 修复 emoji 等字符在截断边界处产生未配对 surrogate 导致渲染丢失的问题。

2. **[#29335 确保 AgentLoopContext 属性在对象展开后保留](https://github.com/google-gemini/gemini-cli/pull/29335)** — 修复 Config 类原型 getter 在 spread 操作中丢失的问题，涉及多个核心属性的传递完整性。

3. **[#29242 停止将 401 作为子字符串匹配认证错误](https://github.com/google-gemini/gemini-cli/pull/29242)** — 修复端口号、ID 等包含 "401" 的错误信息被误判为认证失败，触发虚假重新登录流程的问题。

4. **[#29328 A2A 服务器遵循 LOG_LEVEL 并保护凭证](https://github.com/google-gemini/gemini-cli/pull/29328)** — LOG_LEVEL 环境变量此前被硬编码为 `info`，同时确保凭证不写入日志，是安全加固的重要一步。

5. **[#29327 修复 SDK AgentShellOptions 的 env 与 timeoutSeconds 不生效](https://github.com/google-gemini/gemini-cli/pull/29327)** — `exec('sleep 30', { timeoutSeconds: 1 })` 此前会完整等待 30 秒，现在超时和 env 均正确生效。

6. **[#29332 限制单次调用的沙箱扩展频率](https://github.com/google-gemini/gemini-cli/pull/29332)** — 修复工具每次返回 `sandbox_expansion_required` 导致无限递归、最终堆内存溢出的问题。

7. **[#29333 校验按约定发现的策略目录权限](https://github.com/google-gemini/gemini-cli/pull/29333)** — 此前只校验系统策略目录，现在对用户目录和工作区目录也执行权限检查，防止因目录权限不足导致的安全缺口。

8. **[#29336 保护非系统策略目录的写权限](https://github.com/google-gemini/gemini-cli/pull/29336)** — 针对 #29311 的修复，将权限校验扩展到所有策略层，并支持 POSIX/Windows 下的当前用户所有权验证。

9. **[#29237 修复信号杀死进程显示 `(Exit Code: null)`](https://github.com/google-gemini/gemini-cli/pull/29237)** — 当后台进程被信号杀死或 `exitCode` 为 null 时，不再打印误导性的 `(Exit Code: null)`。

10. **[#29337 版本号自动更新](https://github.com/google-gemini/gemini-cli/pull/29337)** — 例行 nightly 版本 bump，对应今日发布的 v0.61.0-nightly.20260915.g9c1b0a610。

另外两个值得关注的 PR 包括：[#29329](https://github.com/google-gemini/gemini-cli/pull/29329) 修复 stdin 截断后无法恢复读取的问题；[#29334](https://github.com/google-gemini/gemini-cli/pull/29334) 为 A2A 任务元数据接口补齐 501 响应后的提前返回逻辑。

## 功能需求趋势

从今日活跃 Issue 中可提炼出社区最关注的功能方向：

- **Agent 可靠性与可观测性**（占比最高）：Subagent 状态误报、挂起、错误上下文缺失等问题频发，用户需要更透明的子代理执行轨迹和准确的中断原因反馈。
- **上下文与记忆优化**：Auto Memory 的脱敏逻辑、低信号会话重试、无效 patch 处理是近期新增的集中讨论方向；`/compress` 持久化则反映了用户对 token 成本的持续关注。
- **安全与权限治理**：从 API 密钥脱敏到策略目录权限校验，企业级安全配置成为活跃开发区域，多项安全 PR 正在并行推进。
- **工具使用效率**：AST 感知文件读取、Tactful Extraction 等提案试图解决大文件读取导致的 token 膨胀和无效轮次问题。
- **终端体验**：shell 命令卡死、终端 resize 闪烁/性能、stdin 截断后不可恢复等交互层问题正在被系统性处理。

## 开发者关注点

- **子代理行为不可预测是最大痛点**：包括不主动使用 skills、误报成功、在 Wayland 下失败等，开发者普遍反映需要更细粒度的子代理控制和更完整的状态报告。
- **命令执行卡死频繁复现**：多个 Issue 涉及 CLI 在命令完成后仍挂起等待输入，严重影响自动化流程的可靠性。
- **配置不生效问题突出**：`settings.json` 被浏览器子代理忽略、`/compress` 不持久等配置持久化问题反复出现。
- **隐私与安全诉求明显上升**：Auto Memory 读取本地转录内容引发关注，开发者希望日志和上下文传输前即完成脱敏，而非事后补救。
- **工具数量与上下文管理**：超过 128 个工具即触发 400 错误，社区希望模型能按需动态裁剪工具集，而非简单报错。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

## 今日速览

今日动态集中在三件事：一是 Reasonix Studio v2.16.0 正式发布，重点修正“界面与内核状态一致”问题；二是桌面端 v1.38.8 爆发了大规模会话持久化回归，社区集中反馈新会话消失、消息丢失、窗口切换后内容丢失等数据类事故；三是多项 PR 直指这些回归的根源，包括 SessionID 架构迁移、bash 沙箱配置修复等。v1.38.8 与 Studio v2.16.0 两个版本并行、质量反差明显，建议桌面端用户暂时观望或回滚至 1.38.7。

## 版本发布

### Reasonix Studio v2.16.0
[查看 Release](https://github.com/esengine/DeepSeek-Reasonix/releases)

本次更新主线是“屏幕上写着的东西与内核里的事实是同一件”：任务面板改为读取内核发布的清单而非从转录猜测；被拒工具调用携带主机身份；卡片名称与能力清单同内核实际行为对齐；能力清单在调用前即声明参数要求。工作台新增会话内查找、代码块高亮、消息改写重发、能力名到卡片映射四项能力。回合增加“把清单交回用户”的出口，不再被主机强制推进。界面侧按实测结果整理了阅读尺寸、栏宽、等宽字体、中文小型大写与浅色灰阶，并修复了三个失效交互。自 2.15.0 起共 43 个提交，三平台自动更新，无需人工步骤。

## 社区热点 Issues（10 条）

### 1. 会话“打地鼠”：消息找不到、列表分裂又合并 — #10339
[@freerpa](https://github.com/freerpa) 吐槽升级 1.38.8 后，后台在改代码但消息找不到、加载图标乱闪、会话列表分身三个并互相“追逐”，点击后合体。5 条评论，开发者表示“精神恍惚、备受折磨”。这是典型的会话状态机错乱，指向 v1.38.8 会话持久化重构的严重缺陷。
[GitHub #10339](https://github.com/esengine/DeepSeek-Reasonix/issues/10339)

### 2. 切换窗口后再点回，内容变成“开始页面” — #10316
[@pzwhale-hue](https://github.com/pzwhale-hue) 反馈：正在运行的窗口一旦被切换，点回去只剩开始页面，运行中的内容完全不见。涉及窗口状态恢复与会话内容的绑定问题，Windows 端复现，4 条评论。
[GitHub #10316](https://github.com/esengine/DeepSeek-Reasonix/issues/10316)

### 3. 新会话写入磁盘但列表不可见 — #10343
[@cheerjun](https://github.com/cheerjun) 给出深度诊断：新会话发出第一轮后切换会话即从列表消失，重开应用也一样。数据确认在磁盘上（logSize=933820），但 tab/session 绑定失败导致列表与历史都读不到。作者已将结论存入项目记忆以加速后续排查。
[GitHub #10343](https://github.com/esengine/DeepSeek-Reasonix/issues/10343)

### 4. 新对话无法存档，退出即清空 — #10345
[@BY-svg-del](https://github.com/BY-svg-del) 反馈：新对话无法被识别为对话记录，一旦退出当前对话，对话记录立即清空。Windows 11 复现，复现步骤明确：提问后切换再回来，历史不见了，变成了全新对话。
[GitHub #10345](https://github.com/esengine/DeepSeek-Reasonix/issues/10345)

### 5. 升级 1.38.8 后原本正常的会话直接“超窗” — #10348
[@li-2021-hs](https://github.com/li-2021-hs) 报告：1.38.7 中多次正常压缩的会话，升级后显示超出上下文窗口上限，压缩命令也无法执行，会话彻底卡死。另发现打开时会话内容偶尔不完整，再次打开恢复正常。属于压缩元数据在升级路径中的兼容性 bug。
[GitHub #10348](https://github.com/esengine/DeepSeek-Reasonix/issues/10348)

### 6. bash 工具完全不可用：沙箱无视配置 — #10292
[@Aresitoo](https://github.com/Aresitoo) 报告 1.38.8 的回归：`[sandbox] bash = "off"` 被无视，每次 bash 调用即失败（exit 0xc0000142）。1.38.7 工作正常，确认是 1.38.8 引入的回归。已有对应 PR #10297 修复。
[GitHub #10292](https://github.com/esengine/DeepSeek-Reasonix/issues/10292)

### 7. resume 找不到其他电脑的会话历史 — #9477
[@wintsa123](https://github.com/wintsa123) 的长期诉求（8 月 27 日提出，今日仍在更新）：在 A 电脑 ssh 会话后，B 电脑 resume 找不到相关历史，且不知会话 ID。对比 Claude 和 Codex 没有此问题。跨设备工作流的核心痛点，已关闭但社区讨论达 16 条。
[GitHub #9477](https://github.com/esengine/DeepSeek-Reasonix/issues/9477)

### 8. 新会话不自动命名，再新建时直接覆盖 — #10331
[@duanhuiling123](https://github.com/duanhuiling123) 反馈：v1.38.8 新建会话保持“新的会话”不自动命名，再次新建会直接覆盖上一个“新的会话”，造成历史丢失。对日常多任务用户打击极大。
[GitHub #10331](https://github.com/esengine/DeepSeek-Reasonix/issues/10331)

### 9. 闲置时 CPU 占用 15%-20% — #10332
[@s7133](https://github.com/s7133) 报告无任务执行时 CPU 持续占用 15%-20%，带有截图。性能回归，可能与会话状态机循环或渲染重试有关。
[GitHub #10332](https://github.com/esengine/DeepSeek-Reasonix/issues/10332)

### 10. 回合事件账本不可用：会话所有权异常 — #10322
[@NeoInBJ](https://github.com/NeoInBJ) 报告旧会话迁移后 writer 所有权异常，提交问题后卡死超 10 分钟或直接报错。同类问题 #10347 亦报告 “turn event ledger unavailable”，涉及会话持久化所有权架构问题，是当前最棘手的技术债之一。
[GitHub #10322](https://github.com/esengine/DeepSeek-Reasonix/issues/10322)

## 重要 PR 进展（10 条）

### 1. 仅以 SessionID 重做桌面持久化，根治会话消失 — #10326
[@SivanCola](https://github.com/SivanCola) 提出桌面端会话从列表消失的根因：本地会话身份分散在 Topic ID、项目相对路径、活动目录路由、标签页状态和控制器中，切走即被清理。该 PR 统一为 SessionID 单一路径，直接针对今日大量“会话消失”反馈。
[GitHub #10326](https://github.com/esengine/DeepSeek-Reasonix/pull/10326)

### 2. 修复 `[sandbox] bash="off"` 被无视的回归 — #10297
[@BuGlessRB](https://github.com/BuGlessRB) 定位到 `specForCall` 对只读/工作区写权限预设强制 `spec.Mode = "enforce"`，覆盖了用户配置。修复后 bash=off 时跳过 bwrap 探测，直接解决 #10292。
[GitHub #10297](https://github.com/esengine/DeepSeek-Reasonix/pull/10297)

### 3. 普通 DeepSeek 回合回放 reasoning_content，修复重复 400 — #10084
[@BuGlessRB](https://github.com/BuGlessRB) 修复思考模式下未将 `reasoning_content` 回传导致的持续 400 错误，涉及每个 assistant 历史回合（含纯文本回合）的序列化。影响所有 DeepSeek 思考模式用户。
[GitHub #10084](https://github.com/esengine/DeepSeek-Reasonix/pull/10084)

### 4. 按需暴露 MCP 资源与 URI 模板工具 — #10349
[@SivanCola](https://github.com/SivanCola) 让模型能看到 MCP 服务器广告的资源与 URI 模板，新增 `list_mcp_resources`、`list_mcp_resource_templates`、`read_mcp_resource` 三个稳定工具，解决纯资源型 MCP 服务器完全不可用的问题。
[GitHub #10349](https://github.com/esengine/DeepSeek-Reasonix/pull/10349)

### 5. 修复远端/桌面 session-id 迁移缺口 — #10320
[@XTLine](https://github.com/XTLine) 补齐 serve 端 `/runtime-states` 的 `session-id:` 路由，并让会话围栏与 transcript 读取都能正确解析 `session-id:` 引用，修复远端会话在桌面端无法调和的问题。
[GitHub #10320](https://github.com/esengine/DeepSeek-Reasonix/pull/10320)

### 6. 官方视觉按 v41 tokens 计价并超预算省略图片 — #10342
[@SivanCola](https://github.com/SivanCola) 修正官方 DeepSeek 视觉计费：原本图片按免费计算、小图缩放比与官方 v41 网格不符、超预算时无持久省略机制。该 PR 移植官方 token 计算器并确保超出路由预算后稳定省略图片。
[GitHub #10342](https://github.com/esengine/DeepSeek-Reasonix/pull/10342)

### 7. 官方视觉图优先走 Files API 上传并复用 — #10346
[@SivanCola](https://github.com/SivanCola) 继 #10342 后，让官方视觉图片优先经 Files API 上传并复用 file-id，避免请求体积膨胀，同时修正 Files 模式 offload 水位计把 file-id 计为零字节的问题。
[GitHub #10346](https://github.com/esengine/DeepSeek-Reasonix/pull/10346)

### 8. 新增 per-provider 流空闲超时 — #10344
[@BuGlessRB](https://github.com/BuGlessRB) 为每个 provider 增加 `stream_idle_timeout_seconds` 配置，超过设定时间无字节到达即判定为连接断开并重放。未配置时保持现有 300s 适配器默认值，解决长思考场景下误断问题。
[GitHub #10344](https://github.com/esengine/DeepSeek-Reasonix/pull/10344)

### 9. YOLO 模式数字键直接选择行 — #9491
[@BuGlessRB](https://github.com/BuGlessRB) 让 `/model`、`/provider`、`/resume` 选择器中的数字键直接选中对应行，而不是过滤文本。与方向键 + 回车相比，数字键为一次性确认，提升 YOLO 模式操作效率。
[GitHub #9491](https://github.com/esengine/DeepSeek-Reasonix/pull/9491)

### 10. 多币种费用显示修复 + 前缀缓存 ROI 看板 — #10334
[@Xxcool](https://github.com/Xxcool) 修复配置 `display_currency = "CNY"` 后 TUI/CLI 仍按美元显示的问题（#10310），并新增前缀缓存节省看板，让用户直观看到 KV-cache 带来的成本下降。
[GitHub #10334](https://github.com/esengine/DeepSeek-Reasonix/pull/10334)

## 功能需求趋势

- **会话持久化与可恢复性成为第一优先级**：今日 Issue 中约 1/3 直接与会话丢失、消失、覆盖相关（#10313、#10318、#10331、#10338、#10343、#10345）。社区已不是“期望”，而是“强烈要求”将持久化做成可靠基础能力。
- **跨设备工作流补全**：#9477 是跨设备 resume 诉求的代表，用户希望 A 电脑的 SSH 会话能在 B 电脑无缝继续，对比 Claude/Codex 的体验差距。
- **输入体验多样化**：#10323 提出语音输入，支持长文本、无障碍场景；#10329 提出“简洁”会话体验档位，希望运行中收起工具过程、只看摘要。
- **稳定性与诊断能力**：#10319 希望有组合键或按钮强制刷新窗口（应对 React 崩溃）；#10332/#10341 反映对 CPU 与“long task”警告的敏感度上升。
- **MCP 生态深化**：#10349 的合并将使资源型 MCP 服务器真正可用，社区对 MCP 工具链的期待从“能用”转向“完整”。

## 开发者关注点

- **数据丢失是首要痛点**：多条 Issue 指向同一个核心——会话数据在磁盘上，但 UI 读不到；消息发出去就“消失”；切窗口丢内容；新建会话被覆盖。无论技术架构如何演进，会话的“可见性”与“持久性”必须先于功能迭代，否则每升级一版都消耗一次信任。
- **回归频率过高**：#10292（bash 工具 1.38.7→1.38.8 回归）、#10348（升级后已有会话不可用）表明当前发布流程缺少关键路径回归测试。开发者对“每版必坏一处”的节奏已有明显倦怠感，#10339 的“哈哈，我已疯魔”并非个例。
- **权限与状态管理不透明**：#10335 关闭软件或切换页面后所有会话权限静默变为“工作区内修改”，说明会话权限未与持久化状态绑定，属典型的隐性状态漂移。
- **诊断难、恢复更难**：#10322、#10347 的“turn event ledger unavailable”错误对普通用户几乎不可理解，且会话一旦触发即不可用，缺少自愈或降级路径。
- **积极信号**：PR #10326 直接回应会话消失的根因、#10297 快速修复沙箱回归、#10084 解决思考模式 400 错误——维护者对核心问题响应较快，社区愿意继续反馈，但下一次版本发布需要更严格的回归验证来挽回信任。

---

> 本日报由 AI 根据 GitHub 公开数据自动生成，数据截止 2026-09-15。人工核实渠道：[DeepSeek-Reasonix 仓库](https://github.com/esengine/DeepSeek-Reasonix)。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-09-15

## 今日速览

- **v1.18.31 发布**，主要修复 ACP 会话模型边界在加载/恢复/fork 时丢失的问题，并改善了 TUI 对远程配置认证错误的处理。
- **模型能力与用量管理成为社区焦点**：#6651 子 agent 动态模型选择（41 评论 / 80 👍）与 #16017 Go 计划用量 API（35 评论 / 138 👍）讨论度最高。
- **桌面端 UI 与启动性能问题集中爆发**：新侧边栏设计引发回退诉求（#48882），同步加载所有 workspace 历史导致启动阻塞（#49153）；Zen/Go 模型错误与 MCP 冷启动失败也在持续发酵。

## 版本发布

**v1.18.31**（过去 24 小时）

- **Core**：修复 ACP 会话在保存、恢复或 fork 时，model、effort、mode 及 reasoning chunk 边界丢失的问题（感谢 @JacobNWolf）。
- **TUI**：远程配置认证错误现在会在启动时显示，并以失败状态退出。
- **Extensions**：包含改进内容，但本次发布说明未完整披露细节。

## 社区热点 Issues

1. **[#6651] 子 agent 动态模型选择（Task 工具）**  
   @mcking-07 | 41 评论 / 80 👍  
   主 agent 通过 Task 工具调用子 agent 时，无法动态指定模型，限制复杂工作流编排。评论数高且获赞多，说明 agent 编排是当前社区最关心的能力之一。  
   https://github.com/anomalyco/opencode/issues/6651

2. **[#16017] Go 计划用量/余额 API 端点**  
   @StephanMeijer | 35 评论 / 138 👍 | CLOSED  
   希望公开 Go 订阅的用量数据（滚动/周/月窗口）为 API，dashboard 已有展示但无外部接口。138 👍 为当日最高，集成需求非常强烈。  
   https://github.com/anomalyco/opencode/issues/16017

3. **[#48741] Zen 在 Muse Spark 系列上收到图片/工具调用时报 critical error**  
   @pompompur-in | 27 评论 / 6 👍  
   `reasoning encrypted_content was not issued to this caller`，影响所有 Zen 上的 Muse Spark 模型。2.0 版本稳定性问题，用户反馈集中。  
   https://github.com/anomalyco/opencode/issues/48741

4. **[#37231] Go 模型全线 "Upstream request failed"**  
   @gwynnbleiidd | 19 评论 / 1 👍 | CLOSED  
   所有 Go 模型服务返回同一错误，CLI、桌面端、VSCode 扩展均受影响。虽然已关闭，但影响范围大，许多用户曾中招。  
   https://github.com/anomalyco/opencode/issues/37231

5. **[#48882] 恢复经典 UI：带持久左侧边栏的旧布局**  
   @HRronaldo | 18 评论 / 23 👍  
   新版侧边栏设计（#20242）替代了经典双栏布局，用户希望保留旧版选项。UI 改版争议在社区持续升温。  
   https://github.com/anomalyco/opencode/issues/48882

6. **[#29094] LLM 响应期间阅读历史仍会被拉回底部（#4196 复发）**  
   @divitkashyap | 10 评论 / 3 👍 | CLOSED  
   生成过程中向上滚动阅读历史会被每个 token 拉回底部，老问题 #4196 自动关闭后复发。用户体感强烈的交互 bug。  
   https://github.com/anomalyco/opencode/issues/29094

7. **[#36682] Compaction summary 注入可执行指令**  
   @rustysixslinger | 4 评论 / 1 👍  
   自动压缩长会话时，摘要中的 "Next Move" 被模型当作 user 指令执行，形成指令注入向量。安全相关，需重视。  
   https://github.com/anomalyco/opencode/issues/36682

8. **[#48743] 官方 MCP 预热/预启动机制缺失：Windows 下多个本地 MCP 全部启动失败**  
   @liudongyan13701205717-source | 3 评论 / 1 👍  
   配置 14+ 本地 stdio MCP 时，所有 server 在会话启动时被标记为 failed，需手动逐个重启。重度 MCP 用户痛点明显。  
   https://github.com/anomalyco/opencode/issues/48743

9. **[#30659] ACP：从 todowrite 工具调用发出 SessionUpdate::Plan 事件**  
   @smagnuso | 4 评论 / 4 👍 | CLOSED  
   ACP 场景下 todo 列表只作为通用 tool_call 发送，无法映射为结构化 Plan 事件。ACP 协议增强方向，受插件开发者关注。  
   https://github.com/anomalyco/opencode/issues/30659

10. **[#49153] 桌面端启动被同步加载所有 workspace 历史阻塞**  
    @crafteve | 0 评论 / 1 👍  
    启动时同步加载每个打开 workspace 的完整聊天历史，多/大历史项目会长时间占满单核。新提交的性能问题，应引起核心团队注意。  
    https://github.com/anomalyco/opencode/issues/49153

## 重要 PR 进展

1. **[#49061] fix(session): 空 completion 无论 finish reason 均重试**  
   扩展 #40531 的守卫逻辑，覆盖 `finish: "stop"` 而不仅是 `"unknown"`，提升空响应恢复能力。  
   https://github.com/anomalyco/opencode/pull/49061

2. **[#48908] fix(session): 从 provider 拒绝的 stale encrypted reasoning 中恢复**  
   修复 #48741，在会话恢复或工具执行时清理过期的加密推理内容，避免 Responses API 模型继续报错。  
   https://github.com/anomalyco/opencode/pull/48908

3. **[#49155] fix(app): Question Dock 自定义输入忽略 IME 组合键**  
   修复 #49154，日语输入法（Google Japanese Input）确认时 Enter/Escape 不再被误判为提交/取消，解决焦点跳走问题。  
   https://github.com/anomalyco/opencode/pull/49155

4. **[#49145] fix(build): macOS 下 --baseline 只构建 baseline 目标**  
   修复 #49150，非 AVX Intel Mac（Westmere/Xeon X5690）上避免构建含 AVX2 指令的 runtime 导致 SIGILL 崩溃。  
   https://github.com/anomalyco/opencode/pull/49145

5. **[#49151] feat(mcp): 列出 MCP 服务器暴露的工具**  
   新增 `opencode mcp tools` 命令，按 server 分组展示工具及描述，解决 #41499，提升 MCP 可观测性。  
   https://github.com/anomalyco/opencode/pull/49151

6. **[#49071] fix(ai): OpenAI prompt cache key 使用白名单**  
   不再无条件将 `request.promptCacheKey` 转为小写，修复 #45113。  
   https://github.com/anomalyco/opencode/pull/49071

7. **[#47999] fix(tui): 保存的 tabs 按 server 隔离**  
   修复 #47998，远程 TUI 连接不再复用或覆盖其他 server 的保存 tab。  
   https://github.com/anomalyco/opencode/pull/47999

8. **[#49106] fix(client): 快照读取期间保留 inbox 事件**  
   修复远程客户端重连时，已答问题跳到末尾并仍显示 pending 的状态错乱问题。  
   https://github.com/anomalyco/opencode/pull/49106

9. **[#49143] fix(app): 限制导出文件名长度**  
   修复 #49142，清理后的标题限制在 250 字符内再加 `.json`，避免 255 字节文件名上限导致的 `ENAMETOOLONG`。  
   https://github.com/anomalyco/opencode/pull/49143

10. **[#49119] fix(provider): Bedrock `au.` 前缀应用到完整 Claude 家族**  
    在 ap-southeast-2/4 区域，跨区域推理前缀 `au.` 不再只用于 Sonnet 4.5/Haiku，Opus 和 Sonnet 4.6 也被正确覆盖。  
    https://github.com/anomalyco/opencode/pull/49119

## 功能需求趋势

从今日所有 Issues 中提炼出社区最关注的方向：

- **模型与 Provider 管理**  
  动态子 agent 模型选择（#6651）、Go 计划用量 API 与 TUI 展示（#16017 / #42776）、`/models` 列表保留完整 provider 模型而不移入 Recents（#49141）。

- **UI/UX 调整与回退选项**  
  恢复经典持久侧边栏（#48882）、桌面与 Web 端永久保留 Old/V2 UI 切换（#38230）、统一 Thinking 与 Patch 的并行动作指示器（#44164）、自动折叠已完成活动为摘要行（#49088）、Web 界面补上 Plan Mode（#49135）、prompt 历史跳转列表（#49147）。

- **性能与稳定性**  
  桌面启动改为异步/懒加载 workspace 历史（#49153）、本地 MCP 预热/预启动与自动重连（#48743）、彻底修复生成阅读时视口回弹（#29094）、导出文件名长度与 Windows 保留名处理（#49142 / #49138）。

- **安全与合规**  
  防止 compaction summary 注入可执行指令（#36682）、Zen 加密内容权限错误（#48741 / #48740）、远程 MCP OAuth 重认证补齐 RFC 8707 `resource` 参数（#46316）。

- **协议与生态建设**  
  ACP 增加结构化 Plan 事件（#30659）、MCP 工具列表 CLI 支持（PR #49151）、更多插件接入官方生态列表（#49156、PR #48722 / #49152）。

## 开发者关注点

- **视口回弹问题反复复发**（#29094 重开 #4196），TUI 历史阅读体验长期未得到根治，是高频抱怨点。
- **Zen/Go 模型兼容性是当前最大稳定性短板**：Muse Spark 图片/工具调用报错（#48741）、Go 全线 Upstream failed（#37231）、glm-5.3-flash 处理截图工具输出时 422（#48740），多个 issue 集中指向模型 API 边界处理不完善。
- **Windows 桌面端大规模本地 MCP 配置不可用**（#48743，14+ 全部 failed）影响重度用户，MCP 连接生命周期管理需要改进。
- **桌面启动同步加载全部 workspace 历史**（#49153），多项目开发者明显感受到卡顿，期望异步化或按需加载。
- **IME 输入法确认键被误处理**（#49154），日文等非拉丁输入用户受影响，尤其发生在桌面 question dock。
- **UI 改版争议仍在继续**（#48882 / #38230），社区希望保留经典布局或提供永久的切换入口，而非强制迁移。
- **导出文件名细节问题**（过长、Windows 保留名 #49142 / #49137）虽小但直接影响日常使用，开发者对这类边角体验也很敏感。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报

**日期：2026-09-15**  
**数据来源：github.com/deepseek-ai/deepseek-harness**

---

## 1. 今日速览

过去 24 小时内，项目发布了 **v0.1.6-alpha.1** 版本，重点引入了 Web 侧边栏终端、会话归档管理与 MCP 资源读取支持。社区活跃度方面，**无新增或更新的 Issue 与 PR**，整体处于版本整合与发布后的平静期。

---

## 2. 版本发布

### dsh-v0.1.6-alpha.1

**发布链接：** [dsh-v0.1.6-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.6-alpha.1)

**主要更新内容：**

- **Web 侧边栏终端**（贡献者：@LegGasai）
  - 支持多标签页，可同时管理多个终端会话
  - 支持 Shell 选择，适配不同工作环境
  - 页面刷新后自动恢复之前打开的终端会话

- **已归档会话管理**（贡献者：@tianyicui）
  - 设置界面新增“已归档会话”列表
  - 支持查看归档会话内容，并一键恢复继续使用

- **MCP 资源能力增强**（贡献者：@tianyicui）
  - 支持发现并读取远程资源
  - 支持 URI 模板，可动态构造资源地址
  - 内置 Profile 配置 MCP 服务器后，即可使用共享资源工具

- **Headless 模式改进**
  - 支持从标准输入（stdin）接收任务指令
  - 支持通过 `--session-id` 参数延续已有会话，便于脚本化与自动化调用

---

## 3. 社区热点 Issues

**过去 24 小时内无新增或更新的 Issue。**

> ⚠️ 说明：当前仓库 Issue 列表在本窗口内无任何活动。如需回顾历史精选 Issue，请参考仓库 [Issues 页面](https://github.com/deepseek-ai/deepseek-harness/issues)。

---

## 4. 重要 PR 进展

**过去 24 小时内无新增或更新的 Pull Request。**

> ⚠️ 说明：当前仓库 PR 列表在本窗口内无任何活动。历史合并记录请参考 [Pull Requests 页面](https://github.com/deepseek-ai/deepseek-harness/pulls)。

---

## 5. 功能需求趋势

虽然当前窗口内没有直接的 Issue 数据，但结合本次版本发布的内容，可以观察到社区关注度较高的几个功能方向：

| 方向 | 佐证 | 说明 |
|------|------|------|
| **Web 化交互体验** | Sidebar 终端、会话恢复 | 用户越来越倾向于通过浏览器完成开发与调试，而非仅依赖本地 CLI |
| **会话持久化与恢复** | 归档会话列表、`--session-id` 续跑 | 长时任务管理、断点续跑是高频场景，社区对状态保持需求强烈 |
| **MCP 生态集成** | 资源发现、URI 模板、共享资源工具 | 工具链标准化与互操作性成为关注重点，期待通过 MCP 打通更多外部系统 |
| **Headless 自动化** | stdin 任务输入、会话延续 | 服务于 CI/CD、批处理等自动化场景，表明开发者希望进一步将 Harness 嵌入到工作流中 |

---

## 6. 开发者关注点

基于本次版本所解决问题的方向，可以推断开发者反馈中的高频需求点：

- **多任务并发管理**：Web 终端多标签设计，侧面反映用户在同一界面管理多个并发会话的需求。
- **上下文不丢失**：无论是页面刷新恢复终端，还是归档会话恢复，均指向“会话状态必须可持续、可追溯”的核心诉求。
- **资源发现复杂度高**：MCP 资源读取与 URI 模板的加入，意味着此前资源定义和使用流程繁琐，开发者期待更自动化的发现机制。
- **脚本化调用便利性**：Headless 模式下通过 stdin 输入任务，降低了外部程序调用的难度，说明自动化场景在社区中占有重要比重。

---

*本日报由 AI 技术分析师基于 GitHub 公开数据自动整理生成，仅供技术交流参考。*  
*仓库地址：https://github.com/deepseek-ai/deepseek-harness*

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-15

## 1. 今日速览

昨日发布了 v0.21.3 补丁版本，合并了约 338 个 PR，重点修复远程网关登录问题。社区方面，一批涉及计费异常、模型级故障隔离、缓存失效的高优 Bug 集中浮出水面，其中 Nous Portal 计费偏差和 Anthropic 429 全局熔断引发较多讨论。与此同时，开发者们提交了密集的修复 PR，覆盖 MCP 代理支持、checkpoints 假成功、TUI 中文输入等多个痛点。

## 2. 版本发布

**v0.21.3 (v2026.9.14)** — 9月14日发布

- 补丁版本，汇总自 v0.21.2 以来合并的约 338 个 PR
- 主要目的：为下游消费者（Docker 镜像、Hermes Cloud、托管部署）提供稳定标签
- 包含远程网关（remote-gateway）登录修复

链接：https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.14

## 3. 社区热点 Issues（10 个）

### #111774 — [P0] Anthropic 静态提示缓存标记只覆盖稳定层，每次压缩都重写字节稳定上下文
- 作者：@deaiki389-web | 评论：0 | 👍：0
- 影响：每次上下文压缩都会导致缓存失效，推高 Anthropic API 成本；0.21.2 和 0.21.3 代码字节相同，问题未修复
- 链接：https://github.com/NousResearch/hermes-agent/issues/111774

### #97065 — [P3] Keet 网关设置崩溃：TypeError: _n() missing required argument 'config'
- 作者：@Nikkiokeet | 评论：12 | 👍：0
- 影响：Windows 11 上 `hermes gateway setup` 选择 Keet 时直接崩溃，属于 CLI 插件路径的兼容性 Bug，是今日评论数最高的 Issue
- 链接：https://github.com/NousResearch/hermes-agent/issues/97065

### #110912 — [P2] Nous Portal：deepseek-v4-flash-0731 在订阅额度耗尽后按约 11-13 倍标价计费
- 作者：@LohasGuy | 评论：9 | 👍：0
- 影响：用户订阅额度耗尽后，日账单飙升约 3 倍而 token 用量未变，涉及计费与用量成本追踪，社区关注度高
- 链接：https://github.com/NousResearch/hermes-agent/issues/110912

### #100437 — [P2] v0.21.0 cron 智能体任务忽略模型固定，且本地 Ollama 回退失败 64K 上下文门槛
- 作者：@elchocadorTV | 评论：7 | 👍：0
- 影响：定时任务实际使用 qwen3:8b 而非用户指定的模型，且上下文窗口检查逻辑错误，导致任务全部失败
- 链接：https://github.com/NousResearch/hermes-agent/issues/100437

### #111769 — [P2] Anthropic 单一模型 429 导致整个凭证池被熔断，所有 Claude 模型下线
- 作者：@deaiki389-web | 评论：1 | 👍：0
- 影响：一个模型的限流错误会连坐其他模型，缺乏模型级隔离机制，影响高可用场景
- 链接：https://github.com/NousResearch/hermes-agent/issues/111769

### #111761 — [P2] 纯推理干净停止时，推理内容被提升为助手可见内容，污染历史
- 作者：@lijing200609 | 评论：2 | 👍：0
- 影响：当模型只返回 reasoning 而无可见文本时，Hermes 将推理内容写入正式消息，流式传输给客户端并持久化，不仅是显示问题
- 链接：https://github.com/NousResearch/hermes-agent/issues/111761

### #111776 — [P3] `hermes checkpoints clear-legacy` 即使删除失败也打印成功并退出 0
- 作者：@deaiki389-web | 评论：2 | 👍：0
- 影响：脚本和运维无法区分清理是否真正成功，已有 3 个 PR 针对此问题提交修复，属于自动化友好度问题
- 链接：https://github.com/NousResearch/hermes-agent/issues/111776

### #111794 — HTTP/SSE MCP 服务器忽略系统代理（HTTP_PROXY）
- 作者：@VictorTran1023 | 评论：0 | 👍：0
- 影响：自定义 transport 禁用了 httpx 的代理检测，导致 MCP 服务器连接失败，影响企业网络环境用户的 MCP 工具链
- 链接：https://github.com/NousResearch/hermes-agent/issues/111794

### #111791 — kanban 工作线程完成任务后成为孤儿，持有已删除的 state.db 边车文件且无法回收
- 作者：@livechenjt-prog | 评论：0 | 👍：0
- 影响：残留 inode 永久阻塞所有新 state.db 写入，且 `worker_pid` 已被清除，无官方命令可回收
- 链接：https://github.com/NousResearch/hermes-agent/issues/111791

### #111779 — Hermes 0.21.3 在 macOS Tahoe 上导致副屏渲染/性能问题
- 作者：@oylove888 | 评论：0 | 👍：0
- 影响：M4 Max + 128GB 内存 + 双屏环境出现明显性能退化，影响桌面端体验
- 链接：https://github.com/NousResearch/hermes-agent/issues/111779

## 4. 重要 PR 进展（10 个）

### #111796 — fix(mcp): 恢复 HTTP/SSE MCP 服务器的代理支持
- 作者：@VictorTran1023
- 内容：修复 httpx 在自定义 transport 下禁用环境代理检测的问题（关闭 #111794）
- 链接：https://github.com/NousResearch/hermes-agent/pull/111796

### #111787 — fix(agent): 将 Anthropic 429 冷却范围限定到模型级别
- 作者：@KoNit-K
- 内容：单个模型的 429 不再使整个凭证池离线，按请求模型记录冷却（关闭 #111769）
- 链接：https://github.com/NousResearch/hermes-agent/pull/111787

### #111786 — fix(agent): 保留可缓存提示上下文
- 作者：@KoNit-K
- 内容：调整系统标记位置，确保项目上下文文件在压缩后仍保持字节稳定，避免重写（关闭 #111774）
- 链接：https://github.com/NousResearch/hermes-agent/pull/111786

### #111785 — fix(gateway): 如实报告不完整的对话轮次
- 作者：@KoNit-K
- 内容：不完整、部分或中断的轮次不再以 exit 0 报告成功；CLI、one-shot 模式和 API 均从最终状态推导结果
- 链接：https://github.com/NousResearch/hermes-agent/pull/111785

### #111766 — fix(kanban): 防止无 claim 地完成活跃运行任务
- 作者：@KoNit-K
- 内容：终结任务更新不再仅按状态过滤，避免外部会话关闭 dispatcher worker 的活跃运行（关闭 #111764）
- 链接：https://github.com/NousResearch/hermes-agent/pull/111766

### #111793 — fix(checkpoints): 报告遗留清理失败
- 作者：@ONEMYX
- 内容：`clear-legacy` 删除失败时不再静默返回 0（关闭 #111776）
- 链接：https://github.com/NousResearch/hermes-agent/pull/111793

### #111788 — fix(agent): 澄清文件变更验证逻辑
- 作者：@KoNit-K
- 内容：仅在缺少写入回执时不再声称文件"未被修改"，使用任务感知的文件工具解析器解析变更路径（关闭 #111771）
- 链接：https://github.com/NousResearch/hermes-agent/pull/111788

### #111783 — fix(tui): 使用会话模型解析运行时检查
- 作者：@KoNit-K
- 内容：`setup.runtime_check` 现在传入新会话的模型和启动提供者，避免解析到不同的提供者路由并修复 `model: null`（关闭 #111775）
- 链接：https://github.com/NousResearch/hermes-agent/pull/111783

### #111790 — fix(tools): POSIX PATH 中包含用户本地 bin
- 作者：@KoNit-K
- 内容：Desktop 管理的 SSH 会话 PATH 现在会追加 `~/.local/bin`（若存在），修复远程工具缺失问题（关闭 #111778）
- 链接：https://github.com/NousResearch/hermes-agent/pull/111790

### #111792 — fix(desktop): 释放非活跃 macOS vibrancy
- 作者：@KoNit-K
- 内容：非活跃窗口不再保持 macOS vibrancy 合成器表面激活，提升桌面性能（关联 #111779）
- 链接：https://github.com/NousResearch/hermes-agent/pull/111792

## 5. 功能需求趋势

从过去 24 小时的 Issues 中，社区最关注的方向集中在：

- **成本与配额管理**：Nous Portal 计费偏差（#110912）、Anthropic 缓存失效推高成本（#111774）、订阅额度耗尽后的费率变化——用户对成本透明度和可预测性有强烈诉求
- **模型级故障隔离**：单一 Anthropic 模型 429 连坐整个凭证池（#111769），说明多模型/多凭证场景下需要更细粒度的容错机制
- **MCP 生态与网络兼容性**：HTTP/SSE MCP 服务器缺少代理支持（#111794），影响企业网络环境
- **会话与历史数据完整性**：推理内容污染历史（#111761）、不完整轮次被误报成功（#111770）、孤儿 worker 阻塞数据库（#111791）——会话状态管理的可靠性成为高频关注焦点
- **Windows/macOS 平台健壮性**：Windows 上 checkpoints 假成功（#111776）、文件验证误报（#111771）、macOS 副屏性能（#111779）均有提交，桌面体验问题持续受到关注

## 6. 开发者关注点

- **CLI 自动化友好度不足**：多个 Issue 指出命令"假成功"——`clear-legacy` 删除失败仍退出 0（#111776）、不完整轮次报告为完成（#111770），说明开发者在用脚本和 CI 集成 Hermes CLI，对退出码和输出可靠性要求很高
- **回归问题集中在"旧版本已存在，0.21.3 仍字节相同"**：大量由 @deaiki389-web 提交的 Issue（#111769、#111771、#111772、#111773、#111774、#111775、#111776）明确标注代码在 0.21.2 和 0.21.3 中**字节相同**，说明多个已知问题未随版本发布得到修复，开发者对补丁版本的覆盖范围有疑虑
- **高频贡献者集中提交**：@KoNit-K 在一天内提交了 6 个修复 PR（#111766、#111783、#111785、#111786、#111787、#111788、#111790、#111792），覆盖 kanban、Anthropic 冷却、缓存、运行时检查等方向，说明社区已有系统性修复节奏
- **配置与模型解析路径不一致**：cron 任务忽略模型固定（#100437）、`setup.runtime_check` 解析到不同提供者路由（#111775）——模型/配置解析链路存在多处不一致，是高频 Bug 模式

:::
