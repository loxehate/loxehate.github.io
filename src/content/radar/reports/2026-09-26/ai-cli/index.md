---
title: "AI CLI 工具社区动态日报"
published: 2026-09-26
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-26

> 生成时间: 2026-09-26 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-26）

## 1. 生态全景

当前 AI CLI 工具已从“单点聊天脚本”演进为**具备完整 Agent 能力、插件生态与企业级治理功能的生产力平台**。头部阵营（Claude Code、OpenAI Codex、Gemini CLI）版本发布节奏稳定，均在向更高阶的网关控制、多模型适配与 IDE 深度集成推进；第二梯队（DeepSeek Reasonix、OpenCode、Hermes）则以差异化场景切入，分别在桌面端会话管理、多 Provider 中介、消息平台网关等领域建立壁垒。但社区反馈同时揭示出**普遍性痛点**——认证凭据混乱（多工具出现 OAuth 401 故障）、Windows 平台兼容性不足、长会话稳定性与模型隐性回归问题，正在成为工具间用户信任的分水岭。各工具均处于高频迭代期，PR 合入速度显著加快，社区驱动的“报修一体化”协同模式渐成常态。

---

## 2. 各工具活跃度对比

| 工具 | 精选 Issues | PRs（新增观察） | Release | 信号指标 |
|------|------------|----------------|---------|---------|
| **Claude Code** | 10 | 6 | **v2.1.283**（网关请求分组+白名单精确匹配） | 高赞 Issue：Connector 多账户（👍390）、Mods 插件系统（👍126） |
| **OpenAI Codex** | 10 | 10 | **rust-v0.157.0**（GPT-6 Sol/Luna + Bedrock） | 401 认证故障（👍99/88评论）、Windows 弹窗（👍12） |
| **Gemini CLI** | 10 | 10 | v0.62.0-nightly（MCP 配置解析修复） | Generalist 挂起（👍8）、Subagent 误报（P1） |
| **DeepSeek Reasonix** | 10 | 10 | 无（v1.39.0 为最近稳定版） | 会话迁移数据损坏（7评论）、启动卡顿 40s（进程级定位） |
| **OpenCode** | 10 | 10 | 无 | Copilot 学生计划（👍21）、OpenAI 401（👍12） |
| **DeepSeek Harness** | 0 | 0 | 无 | 过去 24h 完全无活动 |
| **Hermes** | 10 | 10 | 无 | 更新循环（7评论）、macOS 快速切换阻塞（6评论） |

> 注：以上 Issue/PR 数量均为当日精选数量，非全量。DeepSeek Harness 处于休眠状态，不参与后续对比。

---

## 3. 共同关注的功能方向

### 3.1 认证与凭据管理（📌 全工具通病）

| 工具 | 具体问题 | 影响面 |
|------|---------|--------|
| **OpenAI Codex** | ChatGPT OAuth 登录后仍发送 `sk-svcac` 错误 key，多平台 401；Desktop 与 CLI 凭据状态不同步 | 🌐 全平台、所有订阅层级 |
| **OpenCode** | ChatGPT OAuth 误绑定 Zen key；OpenAI 收到 `sk-` 无效 key；Copilot 学生计划 OAuth 成功但 provider 不注册 | 多 Provider 绑定的选择逻辑混乱 |
| **Claude Code** | MCP OAuth 硬编码 `prompt=consent`，破坏 Entra 租户；CLI OAuth 登录报 “Invalid code” | 企业租户 + Linux 用户 |
| **Gemini CLI** | 认证死循环（文件竞争、keyring 不可用） | Windows/WSL/headless |
| **Hermes** | Codex OAuth 重新认证后仍 401；环境变量凭证让未配置 provider 成为默认路由 | 凭据残留与配置来源优先级颠倒 |

**底层共因**：客户端在 token 存储、刷新轮换、provider 绑定三个环节均缺乏统一且强隔离的抽象层。环境变量、旧凭据、错误绑定的 key 之间存在“静默兜底”逻辑，恰恰是生产事故的温床。

### 3.2 Windows 平台兼容性（📌 高频区）

- **Claude Code**：EXDEV 跨设备重命名（OneDrive）、终端/桌面权限键位相反、VS Code 复制失效。
- **OpenAI Codex**：终端窗口反复弹出（~20 个）、MCP 服务器弹控制台、守护进程继承 stdio、渲染器失焦重载。
- **Hermes**：更新误判 PID、`gateway.cmd`/VBS 烘焙系统 Python、启动器历史包袱。
- **Gemini CLI**：WSL2 剪贴板、认证死循环。
- **DeepSeek Reasonix**：桌面端会话迁移损坏、事件循环 2 秒阻塞（Windows 专属）。

**结论**：Windows 已成为各工具“稳定性洼地”。Mac/Linux 上已验证的代码路径在 Windows 上因文件系统、进程隔离、终端行为差异频繁翻车，且多与 OneDrive、Scheduled Task、venv 重定向器等系统组件耦合。

### 3.3 插件化与可扩展性（📈 上升期）

- **Claude Code**：Mods 插件系统呼声高（👍126），官方承诺“数周内交付函数钩子”；PR 已就 `process.run` 截断标志、列表 `mtimeMs` 等类型声明与运行时对齐。
- **OpenCode**：#51416 提案将 LSP 运行时暴露为 `ctx.lsp`，让插件直接获取诊断/定义/符号。
- **Gemini CLI**：社区不满 Gemini 不主动使用 skills/sub-agents，期望更高阶的自主调用能力。
- **Hermes**：辅助客户端参数错误（`_reasoning_config` 泄漏）反映内部 API 边界需插件化约束。

**共性判断**：各家都在从“内置工具的 Agent”走向“开发者可编程的 Agent 平台”。函数钩子（function hooks）与插件 API 的成熟度，将决定下一阶段生态位竞争。

### 3.4 会话数据一致性与迁移安全（⚠️ 信任危机）

- **DeepSeek Reasonix**：会话迁移重复导入 5 次、删除重复项静默删除全部记录、31 条哨兵记录导致会话永久无法打开。
- **OpenCode**：V2 回填完成后旧版新写入永不重新导入；陈旧事件序列导致会话进入不可写状态。
- **Hermes**：`/btw` fork 路径丢失上下文；压缩围栏未覆盖全部遍历路径。
- **Claude Code**：VS Code 评审评论无法同步至 CLI 核心会话。

**共性代价**：会话数据是用户对 Agent 工具“记忆连续性”的信任基石。迁移/同步/压缩逻辑一旦出错，将直接摧毁长期项目的工作契约。

### 3.5 模型行为可靠性（🔍 隐性回归集中爆发）

- **Claude Code**：Opus 5.5 在长任务中严重范围蔓延（用户回退 4.6）；“verifiable” 被反复误写为 “falsifiable”。
- **Gemini CLI**：Subagent 在 MAX_TURNS 后误报 “GOAL 成功”；generalist agent 无限挂起。
- **DeepSeek Reasonix**：20~30 轮后频繁 turn 截断（宿主判定“长时间无 tool call 即无活动”）。
- **OpenAI Codex**：WebSocket 在 `response.completed` 前断开导致重连循环。

**核心矛盾**：模型能力升级的同时，**行为边界（何时停止、何时求助、何时上报失败）**未同步收敛。长会话、多轮工具调用的场景下，“看似成功实则中断”或“静默低效空转”成为新的信任杀手。

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线 | 目标用户 | 特色信号 |
|------|---------|---------|---------|---------|
| **Claude Code** | 企业级开发副驾驶 | 网关控制（LLM Gateway + 白名单精确匹配）、托管设置、Mods 函数钩子 | 中大型企业/合规团队 | 多账户治理需求突出（Connector 多账户 👍390）；系统提示词 section 延续、安全默认（sec-default）PR 显示“企业安全优先”路径 |
| **OpenAI Codex** | 模型能力先锋 + 多端覆盖 | 最新模型首发（GPT-6）、全屏转录、代理执行环境；TUI 细节持续打磨 | 追求前沿模型能力的开发者 | GPT-6 接入速度最快；但认证链路因历史包袱（`sk-svcac`）问题集中爆发 |
| **Gemini CLI** | 多 Agent 编排与记忆体系 | Subagent 架构 + Auto Memory + AST 感知方向；P1 级修复密集 | 偏学术/研究型长任务场景 | Auto Memory 安全性争议（密钥泄露风险）反映记忆系统正从“能用”走向“可控”；沙箱方案探索零依赖 POSIX 工具链 |
| **DeepSeek Reasonix** | Windows 桌面端深度绑定 | 与 DeepSeek 模型供应商深度集成（思考模式 400 修复、`strip_chain_of_thought`）；CLI/TUI 效率优化（vi 模式、YOLO 数字键） | Windows 桌面 + 中文社区用户 | 会话数据一致性成最大短板，迁移正确性需追平；CLI 一次性命令泄漏至桌面侧栏（隔离不彻底） |
| **OpenCode** | 多 Provider 中介与开源生态 | 兼容 Zen、Copilot、OpenAI 等多凭据体系；Plugin API 扩展（LSP 暴露） | 开源社区/自托管用户 | 高赞集中在 Copilot 学生计划支持（👍21），显示低成本用户群诉求；资源审计 PR（递归/分配深度）体现安全意识 |
| **Hermes** | 消息平台网关 + 桌面工作台 | 网关（Gateway）管理多消息平台、桌面端 repo 扫描、TCC 保护；Windows 网关专项修复 | 多消息平台集成/跨设备用户 | 更新流程“报告成功但实际失败”模式普遍（venv/解释器/PID 判断）；辅助客户端参数泄漏暴露内部边界粗糙 |

**横向对比要点**：
- **Claude Code** 在企业治理（连接器、网关、白名单）上明显领先；
- **OpenAI Codex** 依托模型迭代速度占据“能力高地”，但客户端稳定性和认证历史包袱拖累体验；
- **Gemini CLI** 在 Agent 架构探索上最激进（Subagent/Auto Memory），但“挂起/误报”类问题削弱可信任度；
- **DeepSeek Reasonix** 在 Windows 桌面端投入最深，但迁移类数据事故是当前致命弱点；
- **OpenCode** 用多 Provider 策略切入，生态潜力大但社区体量决定了其关注度集中于小众场景；
- **Hermes** 最具“B 端消息平台路由器”特质，Windows 专项问题突出。

---

## 5. 社区热度与成熟度

| 工具 | 热度信号 | 成熟度判断 | 阶段特征 |
|------|---------|-----------|---------|
| **Claude Code** | 高（Connector 多账户 👍390, 评论 256） | **成熟期** — 企业级需求主导，功能趋势集中于治理与扩展性，而非基础能力 | 社区关注“如何规模化落地”（多账户、插件系统、模型白名单）；Issue 讨论有组织、信号密度高 |
| **OpenAI Codex** | 高（401 故障 88 评论，PR 当日合入） | **快速迭代期** — 用户量大、问题反馈集中爆发，但修复响应快 | “报修-修复”链条短；官方与社区双向反馈节奏紧凑；GPT-6 等新特性持续拉高关注 |
| **Gemini CLI** | 中高（P1 级密集修复） | **修复追赶期** — 架构设计有前瞻性，但核心可靠性待补 | 多个 “挂起/误报/不生效” 类问题并存，说明工程质量与愿景之间仍有距离；P1 PR 集中说明团队在集中止血 |
| **DeepSeek Reasonix** | 中（同一位用户连续多 issue） | **质量攻坚期** — v1.38~v1.39 引入的迁移缺陷密集暴露 | 功能迭代快（vi 模式、供应商超时配置），但数据安全类 Bug 正在消耗信任；“启动 40 秒空白”被用户进程级定位，说明社区技术素养高 |
| **OpenCode** | 中低（最高 👍21） | **成长期** — 功能方向明确，但社区体量与影响面有限 | 贡献者活跃且分工清晰（自动化清理+定向修复双轨），但认证、会话迁移等基础问题与头部工具同步率低 |
| **Hermes** | 中低（评论普遍 <10） | **追赶期** — 更新链条、Windows 适配、会话状态丢失等问题集中在“基础设施层” | 多次 “报告成功但实际失败” 的模式表明发布验证体系需补强；话题集中在网关与桌面端，定位独特但规模偏小 |

---

## 6. 值得关注的趋势信号

### 信号 1：认证与凭据管理成为“一票否决”级体验瓶颈
OpenAI Codex、OpenCode、Hermes 在同一天内爆出 401/OAuth 相关故障，且根源各不相同（token 刷新、provider 绑定、环境变量污染、轮换冲突）。**对开发者的启示**：无论选用哪款工具，都应提前规划 API key 管理策略（环境隔离、最小权限、定期轮换）；工具供应商需将认证链路视为“基础设施”，而非“功能”。

### 信号 2：Windows 平台 = 新战场（但也是试金石）
多个工具的 Windows 反馈集中在“弹窗、文件系统、进程管理”三类问题，且多与系统级组件（OneDrive、Scheduled Task、venv）耦合。**对工具供应商**：Windows 支持不能靠“核验”，而应投入原生测试矩阵；**对用户**：Windows 上使用 AI CLI 工具应有“次等体验”的心理预期，或选择 Reasonix 等 Windows 优先的工具。

### 信号 3：插件化的“函数钩子”竞赛已开始
Claude Code 确认数周内交付函数钩子；OpenCode 提案暴露 LSP 给插件；Gemini CLI 社区也在要求“让模型主动使用 skills”。**判断**：未来 6 个月内，插件生态的完整性（钩子粒度、类型安全、平台一致性）将成为工具选型的第二决策因素，仅次于模型能力。

### 信号 4：长会话稳定性的“隐性回归”比功能缺失更致命
Opus 5.5 范围蔓延、Subagent 误报成功、turn 截断误判——这些都发生在“模型升级后”或“长时间运行时”。**对开发者**：升级工具时务必做“回归基准测试”（如长任务基准、多轮工具调用基准）；对供应商而言，需要将模型行为评估从“单轮正确率”转向“多轮任务达成率+中途失败上报率”。

### 信号 5：会话数据迁移的正确性将决定桌面端工具的生死
DeepSeek Reasonix 的重复导入/删除连带数据丢失、OpenCode 的 V2 回填后旧写入被忽略，暴露了“迁移是一次性事件”的错误假设。**趋势**：数据迁移必须是**持续双向同步**而非“一次性 ETL”。任何新版本发布时，跨版本会话兼容性应成为发布阻断项。

### 信号 6：上下文管理的“精细化”时代来临
Gemini CLI 的 AST 感知方向、Claude Code 对系统提示词 section 延续的 PR、OpenCode 限制递归深度的安全审计，都指向同一个方向：**从“塞更多上下文”转向“精准读取更少但更相关的上下文”**。二进制文件误读导致的 context bloat（Gemini #29045）和递归/分配深度限制，是这一趋势的直接注脚。

### 信号 7：安全护栏从“权限提示”升级为“行为治理”
Claude Code 的权限键位冲突、OpenCode 的 `.aws` 保护、Gemini 的破坏性命令劝阻建议、Reasonix 的配置文件写入审批，说明行业正在从“每次操作询问”转向“对危险操作的系统性识别与默认阻断”。**方向**：未来的 AI CLI 应内置“危险操作分级”（如 `git reset --force`、配置覆盖、敏感目录读写），而非依赖用户人工判断。

---

*本报告基于 2026-09-26 各工具 GitHub 社区公开数据生成，侧重横向横比与趋势研判，具体 Issue/PR 细节请参考原始链接。*

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-09-26）

> 说明：以下排序基于仓库展示的评论热度顺序，所有 PR 当前均为 Open 状态。

## 1. 热门 Skills 排行

- **skill-creator 触发评估修复** — [PR #1298](https://github.com/anthropics/skills/pull/1298)  
  官方元技能改进。修复 Windows 下 select() 管道失败、多 worker 竞争导致触发评估误判、运行时异常被当成“非触发”等问题。社区关注点集中在技能评估可靠性与跨平台兼容性。当前状态：Open。

- **proofcore-contract-auditor 智能合约审计** — [PR #1771](https://github.com/anthropics/skills/pull/1771)  
  面向 Web3 开发者的 Solidity/Rust 静态分析技能，并将审计证明锚定到 TON 区块链。社区讨论热点：第三方协议类技能进入官方仓库的边界、审计结果的可信度。当前状态：Open。

- **mcp-builder 兼容性修复** — [PR #1742](https://github.com/anthropics/skills/pull/1742)  
  修复 `mcp>=2.0.0` 中 `streamablehttp_client` 更名问题，并支持自定义 HTTP headers。社区关注：MCP SDK 版本演进对构建器的影响。当前状态：Open。

- **检测 DOCX 孤立评论** — [PR #1734](https://github.com/anthropics/skills/pull/1734)  
  针对 DOCX 中 orphaned comments 的检测技能/修复。社区关注：文档批注数据一致性与清理能力。当前状态：Open。

- **md2video-audio 文档转视频** — [PR #1703](https://github.com/anthropics/skills/pull/1703)  
  将 Markdown 通过 Marp 转成幻灯片，再合成带拟真配音的 MP4 视频。社区关注：零成本媒体生成、演示文档工作流自动化。当前状态：Open。

- **docx LibreOffice 超时处理修复** — [PR #1792](https://github.com/anthropics/skills/pull/1792)  
  修复 `soffice` 超时后误报成功的问题，并校验输出 DOCX 不再含修订标记。社区关注：文档转换任务的失败可观测性与输出验证。当前状态：Open。

- **Pyxel 复古游戏开发** — [PR #525](https://github.com/anthropics/skills/pull/525)  
  提供 Pyxel 复古游戏创建、调试、验证技能，支持 headless 输入驱动与逐帧检查。社区关注：游戏开发场景下 Claude Code 的可测试性。当前状态：Open。

- **document-typography 排版质量检查** — [PR #514](https://github.com/anthropics/skills/pull/514)  
  针对 AI 生成文档的孤儿词、孤行标题、编号错位等排版问题做质量控制。社区关注：生成式文档的最终交付质量。当前状态：Open。

## 2. 社区需求趋势

从 Issues 来看，社区最期待的方向集中在四类：

- **安全与信任边界**  
  社区技能被放进 `anthropic/` 命名空间，造成“官方技能”的信任错觉，可能诱导用户授予过高权限（[#492](https://github.com/anthropics/skills/issues/492)）；同时也有 SharePoint Online 权限逻辑放进 SKILL.md 的安全顾虑（[#1175](https://github.com/anthropics/skills/issues/1175)）。

- **技能共享与生命周期管理**  
  用户希望技能能在组织内直接共享，而不是手动下载/上传（[#228](https://github.com/anthropics/skills/issues/228)）；同时存在技能意外消失（[#62](https://github.com/anthropics/skills/issues/62)）和插件重复安装导致重复技能（[#189](https://github.com/anthropics/skills/issues/189)）等问题。

- **运行稳定性与上下文成本**  
  多个 Issue 指向技能运行时可靠性：`run_eval.py` 触发率 0%（[#556](https://github.com/anthropics/skills/issues/556)）、MCP 评估器静默生成假错误（[#1390](https://github.com/anthropics/skills/issues/1390)）、`claude-api` 技能一次注入约 156k tokens 耗尽上下文（[#1487](https://github.com/anthropics/skills/issues/1487)）、web-artifacts-builder 在 pnpm ≥10.1 下失败（[#1362](https://github.com/anthropics/skills/issues/1362)）。

- **面向 Agent 的新能力**  
  社区主动提案：agent-governance 治理模式（[#412](https://github.com/anthropics/skills/issues/412)）、compact-memory 符号化记忆（[#1329](https://github.com/anthropics/skills/issues/1329)）、推理质量门禁流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）。

## 3. 高潜力待合并 Skills

以下 PR 讨论持续更新且实现较完整，值得关注近期是否合并：

- **skill-creator 触发评估修复** — [PR #1298](https://github.com/anthropics/skills/pull/1298)  
  直接修复官方技能评估工具的核心缺陷，更新至 2026-09-16，落地概率高。

- **proofcore-contract-auditor** — [PR #1771](https://github.com/anthropics/skills/pull/1771)  
  新提交但定位清晰，满足 Web3 智能合约审计需求，社区讨论活跃。

- **mcp-builder 兼容性修复** — [PR #1742](https://github.com/anthropics/skills/pull/1742)  
  MCP 版本兼容是刚需，且修复了明确 Issue（#1668），近期合入可能性大。

- **md2video-audio** — [PR #1703](https://github.com/anthropics/skills/pull/1703)  
  完整的多媒体生成技能，适合文档转视频场景，更新较活跃。

- **AWT E2E 测试技能** — [PR #822](https://github.com/anthropics/skills/pull/822)  
  提供零代码 E2E 测试能力，结合视觉与浏览器控制，更新至 2026-09-19，社区关注度高。

- **testing-patterns 测试模式技能** — [PR #723](https://github.com/anthropics/skills/pull/723)  
  覆盖单元测试、React 组件测试、测试哲学等系统化内容，更新至 2026-09-21。

## 4. Skills 生态洞察

社区当前最集中的诉求是：**让 Skills 从“能跑”走向“可信、可管、可复用”——修复运行时/评估/跨平台可靠性问题，建立安全边界，并完善组织级共享与上下文成本控制。**

---

# Claude Code 社区动态日报 — 2026-09-26

## 今日速览

昨日发布 **v2.1.283**，为 LLM 网关增加请求分组标识（`x-claude-code-prompt-id`），并新增 `availableModelsMatch` 托管设置以精确控制模型白名单匹配。社区侧，**“支持多个 Connector 账户”**（#27302，👍390，评论 256）与 **“Mods 插件系统”**（#91870，👍126，评论 216）继续霸榜讨论热度；Opus 5.5 的“任务聚焦回归”与 Windows 平台多处权限/集成 Bug 亦形成集中反馈。

---

## 版本发布

### v2.1.283
- **网关请求分组**：新增 `x-claude-code-prompt-id` 网关提示头，允许 LLM 网关将服务于同一用户提示的请求归类；需通过 `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` 开启。
- **模型白名单精确匹配**：新增 `availableModelsMatch` 托管设置；当设为 `"exact"` 时，`availableModels` 中的条目仅允许完全匹配的模型，避免模糊匹配带来的意外放行或阻塞。

> 注：发布说明中“With "exact", an availableModels entry allows only ...”原文即中断，未提供更多细节。

---

## 社区热点 Issues

### 1. [FEATURE] 支持多个 Connector 账户（同一连接器、不同账户）
- **编号**: #27302 | **状态**: OPEN | **评论**: 256 | **👍**: 390
- **作者**: @nathanmargaglio
- **为什么重要**: 企业用户常需在同一台机器上切换多个身份（如工作/个人账户），当前 Claude Code 与 claude.ai/code Web 端只支持单一 Connector 账户，成为组织采纳的主要阻塞项。高赞+高评论说明受影响面极广。
- **链接**: https://github.com/anthropics/claude-code/issues/27302

### 2. [FEATURE] Mods — 让 Claude 可扩展性提升 10 倍
- **编号**: #91870 | **状态**: OPEN | **评论**: 216 | **👍**: 126
- **作者**: @poteat
- **为什么重要**: 社区驱动的插件/Mod 方案，官方已回应“在数周内交付函数钩子（function hooks）”。该 issue 已成为扩展性讨论的中心，大量高信号反馈直接影响设计。
- **链接**: https://github.com/anthropics/claude-code/issues/91870

### 3. [BUG] Cowork EXDEV: 跨设备链接不允许 — 同目录重命名失败（Windows 11 + OneDrive）
- **编号**: #45178 | **状态**: CLOSED | **评论**: 17 | **👍**: 0
- **作者**: @theopeixoto23
- **为什么重要**: OneDrive 同步目录在 Windows 上的文件操作仍是高频痛点，即使是同目录 rename 也会触发 `EXDEV`。已标记为重复并关闭。
- **链接**: https://github.com/anthropics/claude-code/issues/45178

### 4. [BUG] VS Code 扩展中从 Claude Code 窗口复制文本（Ctrl+C）失效
- **编号**: #43477 | **状态**: OPEN | **评论**: 16 | **👍**: 6
- **作者**: @NeilTalbott
- **为什么重要**: 影响 VS Code 深度用户的基础编辑体验（复制/粘贴），无临时绕过方案，直接降低日常可用性。
- **链接**: https://github.com/anthropics/claude-code/issues/43477

### 5. [BUG] Skill 的 paths frontmatter 导致技能完全不可发现
- **编号**: #49835 | **状态**: CLOSED | **评论**: 10 | **👍**: 4
- **作者**: @bradennss
- **为什么重要**: 技能（Skill）的可发现性是插件生态的关键；如果 paths 声明导致技能消失，将严重打击技能作者积极性。已复现并关闭（推测已修复）。
- **链接**: https://github.com/anthropics/claude-code/issues/49835

### 6. [BUG] VS Code 计划审查评论未转发至 Claude Code
- **编号**: #72234 | **状态**: CLOSED | **评论**: 3 | **👍**: 1
- **作者**: @adam-kral
- **为什么重要**: 计划/审查工作流中，用户在 VS Code 里留下的评审意见无法同步到 CLI/核心会话，破坏“人在回路”的协作闭环。
- **链接**: https://github.com/anthropics/claude-code/issues/72234

### 7. [BUG] 权限提示快捷键冲突：终端 CLI 按 `1` = 批准，Windows 桌面按 `1` = 拒绝
- **编号**: #73325 | **状态**: CLOSED | **评论**: 3 | **👍**: 0
- **作者**: @mermachine
- **为什么重要**: 跨平台权限提示的交互不一致，远程控制场景下肌肉记忆会直接导致误拒绝，属于影响安全决策的人因 Bug。
- **链接**: https://github.com/anthropics/claude-code/issues/73325

### 8. [BUG] Opus 5.5 严重范围蔓延与任务聚焦回归（对比 4.6）
- **编号**: #97117 | **状态**: OPEN | **评论**: 3 | **👍**: 0
- **作者**: @jschachter-apex
- **为什么重要**: 在长期、多会话工程任务中从 Opus 4.6 切到 5.5 后出现严重 scope creep，用户被迫回退模型。这直接关系到重活场景下的模型选型信心。
- **链接**: https://github.com/anthropics/claude-code/issues/97117

### 9. [BUG] MCP OAuth 硬编码 `prompt=consent`，影响 Entra 租户（禁用用户同意）
- **编号**: #94804 | **状态**: OPEN | **评论**: 2 | **👍**: 0
- **作者**: @mguttmann
- **为什么重要**: 该问题位于共享 MCP TypeScript SDK，影响 Claude Code CLI、Web Connector、桌面端全部客户端；此前 #49722 被错误关闭（标记完成但实际未修复）。
- **链接**: https://github.com/anthropics/claude-code/issues/94804

### 10. [BUG] CLI OAuth 错误: “Invalid code. Please make sure the full code was copied”
- **编号**: #97307 | **状态**: OPEN | **评论**: 0 | **👍**: 0
- **作者**: @freesh
- **为什么重要**: 影响 Linux 用户完成 CLI 登录的入口级问题，虽为最新提交，但由于涉及核心认证链路，需优先关注。
- **链接**: https://github.com/anthropics/claude-code/issues/97307

---

## 重要 PR 进展

> 过去 24 小时共观察到 6 个 PR，以下全部列出。

### 1. [OPEN] add the missing source to claude code
- **编号**: #41611 | **作者**: @tornikeo
- **内容**: 为 Claude Code 补充缺失的 source 来源。
- **链接**: https://github.com/anthropics/claude-code/pull/41611

### 2. [OPEN] mods: 声明补齐 `process.run` 截断标志与列表 `mtimeMs`
- **编号**: #97293 | **作者**: @poteat
- **内容**: 确保 npm CLI 发布版携带 `isStdoutTruncated` / `isStderrTruncated`（`$.process.run` 结果）与 `mtimeMs`（`$.fs.list` 条目）后，类型声明才承诺这些字段，避免声明先行导致运行时缺失。
- **链接**: https://github.com/anthropics/claude-code/pull/97293

### 3. [OPEN] sec-default: 系统提示词的 sections 延续至用户层级之后
- **编号**: #97241 | **作者**: @poteat
- **内容**: 调整系统提示的 section 排布，使其在用户层级之后继续延伸；合并顺序依赖引擎的 `prompt.compose` 事件。
- **链接**: https://github.com/anthropics/claude-code/pull/97241

### 4. [CLOSED] diff: focus 钩子响应引擎命名的两种元素
- **编号**: #96953 | **作者**: @poteat
- **内容**: 修复 `ui.focus` 钩子只按单一插件名匹配的问题，使其兼容引擎以 `cc-plugin-diff` 等注册名盖章的元素。
- **链接**: https://github.com/anthropics/claude-code/pull/96953

### 5. [CLOSED] telemetry, agents-md: 测试插件按名称接入收集器流
- **编号**: #96930 | **作者**: @poteat
- **内容**: 仅测试变更：测试插件改为通过 `on('telemetry.log', { to: 'collector' })` 等具名方式接入遥测收集器，模拟真实插件行为。
- **链接**: https://github.com/anthropics/claude-code/pull/96930

### 6. [CLOSED] telemetry: `log` 与 `mark` 作为钩子行为名词化收敛
- **编号**: #96917 | **作者**: @poteat
- **内容**: 将 `$.telemetry.log` 和 `$.telemetry.mark` 重构为基于 `telemetry.log` / `telemetry.mark` 事件的钩子实现，统一遥测写入路径。
- **链接**: https://github.com/anthropics/claude-code/pull/96917

---

## 功能需求趋势

| 趋势方向 | 代表 Issue | 信号强度 |
|---------|-----------|---------|
| **多账户/身份管理** | #27302（Connector 多账户） | 🔥🔥🔥 高（👍390，评论 256） |
| **插件/Mod 可扩展性** | #91870（Mods 与函数钩子） | 🔥🔥🔥 高（👍126，评论 216） |
| **模型行为可靠性** | #97117（Opus 5.5 范围蔓延）、#97305（用词错误） | 🔥🔥 中高（新模型回归担忧） |
| **MCP 认证一致性** | #94804（OAuth prompt=consent 硬编码） | 🔥🔥 中高（影响全部客户端） |
| **IDE 集成体验** | #43477（VS Code 复制）、#72234（评审评论同步） | 🔥🔥 中（高频开发场景） |
| **权限系统跨端统一** | #73325（终端 vs 桌面按键相反）、#96096（Bypass 模式仍弹窗） | 🔥🔥 中（安全+体验交集） |
| **Artifacts 生命周期管理** | #74589（允许删除/取消发布 Artifact） | 🔥 中低 |
| **会话持久化/恢复** | #97300（取消的 Agent 会话未持久化） | 🔥 中低（新增反馈） |

---

## 开发者关注点

1. **Windows 平台稳定性仍是最大痛点**：EXDEV 跨设备重命名（#45178）、VS Code 复制失灵（#43477）、Cowork 会话消失（#69663）、权限按键与 CLI 语义相反（#73325）——相关 issue 密集且 Update 时间集中，说明团队正在批量清理 Windows 路线问题。

2. **模型升级的“隐性回归”令人警惕**：Opus 5.5 在长任务中的范围蔓延（#97117）、反复将 “verifiable” 误写为 “falsifiable”（#97305）等报告，均指向对模型行为稳定性的不信任感在上升，用户倾向于用脚投票（回退 4.6）。

3. **MCP 生态的认证与权限体验粗糙**：硬编码 `prompt=consent` 破坏 Entra 租户（#94804）；Bypass 模式下 `claude-in-chrome` 仍反复弹权限窗（#96096）；Chrome 连接在切换账户后失联（#97309）——MCP 在真实企业环境中的“最后一公里”问题突出。

4. **插件体系（Mods）期望值极高、耐心有限**：#91870 社区更新明确“数周内发布函数钩子”，但开发者已在 PR 层面对类型声明与引擎时序保持高强度对齐（见 #97293、#97241），既体现热情也反映对质量的不妥协。

5. **高频副驾驶场景的中断感**：Skills 路径不可发现（#49835）、任务芯片错注入当前线程（#91820）、`SendUserFile` 在 remote-control 会话中无法送达（#97301）——这些细节虽小，却持续消耗注意力，是用户从“能用”到“好用”的关键差距。

---

*本日报由 AI 技术分析师基于 GitHub 公开数据生成，数据截至 2026-09-26。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-09-26）

## 1. 今日速览

今日社区最突出的动态是**大量用户报告 ChatGPT OAuth 登录成功后，Codex CLI/Desktop 仍使用错误的 `sk-svcac` 凭据导致 401 Unauthorized**，涉及 Windows、macOS、Linux 多平台，成为今日最集中的故障类型。同时，**Windows 平台多个稳定性问题**（终端窗口反复弹出、守护进程继承 stdio、MCP 服务器弹出控制台窗口等）也引起了广泛关注，官方已通过多个 PR 着手修复。此外，新版本 v0.157.0 正式发布，引入了 GPT-6 Sol/Luna 模型支持（含 Amazon Bedrock 集成）等新特性。

---

## 2. 版本发布

### rust-v0.157.0（正式版）
- **新增 GPT-6 Sol 和 Luna 模型支持**，包括 Amazon Bedrock 支持以及旧模型迁移提示。（[#47332](https://github.com/openai/codex/issues/47332)、[#47347](https://github.com/openai/codex/issues/47347)）
- 默认启用全屏转录，并新增 Shift+点击扩展文本选择功能。（[#47178](https://github.com/openai/codex/issues/47178)、[#47414](https://github.com/openai/codex/issues/47414)）
- 启用符合条件的后台服务器自动启动。

**发布链接**：https://github.com/openai/codex/releases/tag/rust-v0.157.0

另有多项 alpha 预发布版本（`0.158.0-alpha.13` ~ `0.159.0-alpha.3`），无公开详细变更说明。

---

## 3. 社区热点 Issues（10 条精选）

### 🔴 认证故障（今日焦点）

**1. [#48237 - unexpected status 401 Unauthorized issue](https://github.com/openai/codex/issues/48237)**
- **创建**：2026-09-25 | **更新**：2026-09-26 | **评论**：88 | **👍**：99
- 报告使用 API key 时收到 401 错误，提示 key 不正确。评论数最多、点赞最高的今日热点问题，反映出大量用户受到影响。

**2. [#18960 - Frequent reconnect loop in Codex App: websocket closed by server before response.completed](https://github.com/openai/codex/issues/18960)**
- **创建**：2026-04-22 | **更新**：2026-09-25 | **评论**：61 | **👍**：54
- Codex App 反复出现 WebSocket 在 `response.completed` 前被服务器关闭，导致流式输出反复重连。老问题持续收到新反馈。

**3. [#41975 - [macOS] Codex CLI/Desktop returns 401 while the same auth.json access token is accepted via curl](https://github.com/openai/codex/issues/41975)**
- **创建**：2026-09-01 | **更新**：2026-09-25 | **评论**：20
- 同一份 `auth.json` token 使用 curl 请求成功，但 Codex CLI/Desktop 返回 401，说明客户端在 token 传递或 header 构造上存在问题。

**4. [#41973 - [macOS] Refresh token is revoked after successful ChatGPT login, causing 401 in Desktop and CLI](https://github.com/openai/codex/issues/41973)**
- **创建**：2026-09-01 | **更新**：2026-09-25 | **评论**：13
- ChatGPT 登录成功后 refresh token 却被吊销，导致桌面端和 CLI 均出现 401。

**5. [#37192 - OAuth fallback silently uses hardcoded "dummy" API key after network change, causing 401](https://github.com/openai/codex/issues/37192)**
- **创建**：2026-08-06 | **更新**：2026-09-25 | **评论**：11
- 网络切换后 OAuth token 过期，Codex 静默回退到硬编码的 "dummy" API key，导致 401。该问题揭示了认证失败时的安全降级路径设计缺陷。

### 🪟 Windows 平台问题

**6. [#48059 - [Windows][Codex CLI 0.157.0] Terminal windows repeatedly pop up during normal use](https://github.com/openai/codex/issues/48059)**
- **创建**：2026-09-25 | **更新**：2026-09-25 | **评论**：4 | **👍**：12
- Windows 上使用 Codex CLI 时反复弹出终端窗口。点赞数高达 12，说明该问题对 Windows 用户影响较大。

**7. [#48277 - CLI: about 20 persistent terminal windows keep opening after an update](https://github.com/openai/codex/issues/48277)**
- **创建**：2026-09-25 | **更新**：2026-09-25 | **评论**：3
- 更新后约 20 个终端窗口持续弹出，连手动关闭都跟不上速度，严重影响使用。

**8. [#47449 - [Windows] Desktop renderer reloads every time app loses and regains focus](https://github.com/openai/codex/issues/47449)**
- **创建**：2026-09-23 | **更新**：2026-09-25 | **评论**：5
- 窗口失焦再聚焦时渲染器重复加载，桌面端体验严重受损。

### 📋 其他值得关注的 Issue

**9. [#44323 - Can't paste text from clipboard into codex CLI 153.4](https://github.com/openai/codex/issues/44323)**
- **创建**：2026-09-09 | **更新**：2026-09-25 | **评论**：6 | **👍**：2
- Windows Terminal 中无法从剪贴板粘贴文本到 Codex CLI，影响日常操作效率。

**10. [#45663 - Windows Codex Desktop enters authentication loop while Codex CLI remains logged in and works](https://github.com/openai/codex/issues/45663)**
- **创建**：2026-09-15 | **更新**：2026-09-25 | **评论**：3
- Desktop 陷入认证循环（"access token could not be refreshed"），而同一台机器上的 CLI 却正常，说明 Desktop 与 CLI 的 token 管理逻辑存在差异。

---

## 4. 重要 PR 进展（10 条精选）

**1. [#48272 - Prevent Windows daemon launches from retaining launcher stdio](https://github.com/openai/codex/pull/48272)**
- 修复 Windows 守护进程继承启动器输出管道的问题，避免调用方在启动器退出后一直等待 EOF。直接回应了 Windows 终端挂起问题。

**2. [#48238 - Suppress console windows for local Windows MCP servers](https://github.com/openai/codex/pull/48238)**
- 启动本地 stdio MCP 服务器时使用 `CREATE_NO_WINDOW` 标志，避免弹出额外控制台窗口。对应社区关于弹出终端窗口的反馈。

**3. [#48224 - Preserve model and access program pairs during compaction](https://github.com/openai/codex/pull/48224)**
- 修复压缩（compaction）使用上一模型时可能继承当前轮的 access program，导致服务器拒绝请求的问题。

**4. [#48222 - Preserve late result metadata for truncated code-mode calls](https://github.com/openai/codex/pull/48222)**
- 修复嵌套 code-mode 调用参数被截断时，结果元数据无法正确附加的问题。

**5. [#48211 - Keep Codex visible during external editor handoff](https://github.com/openai/codex/pull/48211)**
- 从全屏 TUI 打开外部编辑器时，保留并重绘最后一帧 Codex 画面，避免切换到备用屏幕后草稿和提示信息不可见。

**6. [#48206 - Add a keep-and-next action to the warnings viewer](https://github.com/openai/codex/pull/48206)**
- 在警告查看器中新增 `k` 快捷键，保留当前警告以便稍后处理，同时继续浏览剩余警告。

**7. [#48205 - Dismiss viewed TUI warnings when closing the viewer](https://github.com/openai/codex/pull/48205)**
- 关闭警告查看器（Esc/F2/Ctrl+C）时，仅消除实际已渲染的警告页，使警告标记不再残留已审阅的诊断信息。

**8. [#48198 - Honor execution environment proxy requirements](https://github.com/openai/codex/pull/48198)**
- 执行环境的代理配置此前被简化为流量限制，导致受限命令在没有 controller 代理或网络授权时离线。此 PR 使 `NetworkProxyConfig.enabled` 配置真正生效。

**9. [#48190 - Bound agent message board SSE frames before parsing](https://github.com/openai/codex/pull/48190)**
- 在 SSE 解析前强制限制 `MAX_BODY` 大小，防止超大字段和未终止帧在解析器中无限累积，修复恶意 UTF-8 数据导致内存增长的安全隐患。

**10. [#48176 - Protect `.aws` directories under sandbox writable roots](https://github.com/openai/codex/pull/48176)**
- 将 `.aws` 目录纳入沙箱可写根下的受保护元数据路径，避免 AWS 配置文件被意外篡改，属于安全加固改进。

---

## 5. 功能需求趋势

从今日 Issues 和 PR 中可提炼出以下社区关注方向：

| 方向 | 具体诉求 | 代表 Issue / PR |
|------|---------|-----------------|
| **认证与会话管理** | 修复 ChatGPT OAuth 凭据误用、refresh token 失效、401 问题；统一 Desktop 与 CLI 的 token 管理逻辑 | #48237、#41973、#41975、#37192 |
| **Windows 平台兼容性** | 消除弹窗终端、修复剪贴板粘贴、解决渲染器重载、daemon stdio 继承等问题 | #48059、#48277、#44323、#47449；PR #48272、#48238 |
| **稳定性与网络韧性** | 减少 WebSocket 重连循环、提升流式响应可靠性、改进 fallback 降级策略 | #18960、#30933、#32868 |
| **模型与功能支持** | 新模型（GPT-6 Sol/Luna）快速接入；Amazon Bedrock 等云服务集成 | v0.157.0 release |
| **安全与权限加固** | 沙箱对敏感目录（如 `.aws`）、代理配置的正确执行、SSE 帧大小限制 | PR #48176、#48198、#48190 |
| **TUI/UX 优化** | 全屏转录默认开启、编辑器切换画面保持、警告查看器交互改进 | PR #48211、#48205、#48206；Release v0.157.0 |

---

## 6. 开发者关注点

### 高频痛点

1. **401 Unauthorized 认证故障大爆发**：今日多平台大量用户报告，ChatGPT OAuth 登录成功后 Codex 仍发送 `sk-svcac` 类型的错误 API key，请求 `/backend-api/codex/responses` 返回 401。涉及 macOS、Windows、Linux 及 Codespaces 环境，覆盖 Plus/Pro/Max 订阅。开发者期待官方尽快定位是 token 存储、刷新机制还是请求 header 拼接的问题。

2. **Windows 平台体验欠佳**：终端窗口反复弹出、剪贴板粘贴失效、桌面端失焦重载等问题集中反馈，Windows 用户明显感到"二等公民"待遇。官方已通过 `CREATE_NO_WINDOW` 和 stdio 继承修复等 PR 积极回应。

3. **WebSocket 连接不稳定**：流式响应过程中服务器过早关闭连接、反复重连回退的现象持续存在，尤其在长时间对话或查看多张图片时更容易触发。

4. **Desktop 与 CLI 认证状态不同步**：在 macOS 和 Windows 上均出现 Desktop 进入认证循环或 401，而同一台机器的 CLI 正常工作（或相反）的情况，说明两个入口的 token 刷新逻辑需要对齐。

### 社区情绪

- 认证问题的相关 Issue 评论区点赞和讨论热度极高（[#48237](https://github.com/openai/codex/issues/48237) 获 99 👍、88 评论），有用户表示"公司内多人同时中招"，推测是服务端或客户端更新引入的回归。
- 对官方响应速度总体认可，多个 PR 在 Issue 报告的同一天内即被合并（如 #48272、#48238），显示出较高的修复效率。

---

*日报生成时间：2026-09-26 | 数据来源：[github.com/openai/codex](https://github.com/openai/codex)*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-26

## 1. 今日速览

昨日 Gemini CLI 发布 v0.62.0-nightly 版本，修复 MCP 启用配置解析问题；社区讨论焦点集中在 **Subagent 可靠性**（MAX_TURNS 误报成功、generalist agent 挂起）与 **Auto Memory 系统安全与重试机制**。PR 方面，多项 P0/P1 级修复推进中，**认证死循环**、**文件并发写入竞态**、**上下文膨胀**等核心问题均有对应补丁。

---

## 2. 版本发布

**v0.62.0-nightly.20260925.gbedef96ef** 发布。核心变更：
- 修复 CLI 中无法区分 MCP 缺失启用配置与配置格式错误的问题
- 同步 v0.61.0-preview.1 与 v0.61.0 的 changelog

链接：https://github.com/google-gemini/gemini-cli/releases

---

## 3. 社区热点 Issues（Top 10）

### 1. Subagent 在 MAX_TURNS 后误报 GOAL 成功
[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | P1 | 评论 13 | 👍 2
codebase_investigator 子代理在达到最大轮数中断后，仍上报 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了真实的中断原因。属高风险误导性问题，社区讨论活跃。

### 2. Generalist agent 挂起，等待数小时无响应
[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | P1 | 评论 8 | 👍 8
创建文件夹等简单操作一旦移交 generalist agent 即无限挂起。用户反馈指令模型不委派给子代理可绕过。👍 数最高，影响面广。

### 3. Gemini 不主动使用 skills 和 sub-agents
[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | P2 | 评论 6
社区反馈 Gemini 基本不会自主调用已配置的 skills（如 gradle、git），仅在显式指令下才会使用，与预期的 agent 自主性不符。

### 4. 利用模型 bash 亲和力的零依赖 OS 沙箱方案
[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | P2 | 评论 9 | 👍 1
建议利用 Gemini 3 模型天然擅长 POSIX 工具链的特性，设计零依赖沙箱 + 执行后意图路由，在安全与能力间取得平衡。

### 5. AST 感知的文件读取/搜索/映射调研
[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | P2 | 评论 7
EPIC 级调研：AST 感知工具可精确定位方法边界、减少无效读取与 token 噪声，社区关注度较高。

### 6. Auto Memory 缺少确定性脱敏，存在日志泄露风险
[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | P2 | 评论 5
Auto Memory 在将转录内容送入模型后才提示脱敏，且 service 可能记录已有 skills 内容，存在密钥泄露与日志过度记录风险。

### 7. Auto Memory 对低信号 session 无限重试
[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) | P2 | 评论 4
低价值 session 因持续"未处理"状态而被反复提取，浪费 token 与模型调用，需终止条件。

### 8. Browser Agent 忽略 settings.json 覆盖配置
[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | P2 | 评论 4
Browser Agent 启动时未正确应用全局/项目级 settings.json 中的 maxTurns 等配置，AgentRegistry 已合并但实际执行被忽略。

### 9. 模型频繁在随机目录创建临时脚本
[#23571](https://github.com/google-gemini/gemini-cli/issues/23571) | P2 | 评论 3
模型被限制 shell 执行后，转向在工作区各处生成多个编辑脚本，造成清理负担，社区呼声较高。

### 10. 代理应主动阻止/劝阻破坏性行为
[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | P2 | 评论 3 | 👍 1
在复杂 git 操作中模型可能使用 `git reset --force` 等危险命令，社区建议代理应主动提示更安全的替代方案。

---

## 4. 重要 PR 进展（Top 10）

### 1. [P1] 修复无限认证循环
[#29448](https://github.com/google-gemini/gemini-cli/pull/29448) | area/core
解决 Windows/WSL/headless 环境中与 VS Code 扩展的文件竞争、keyring 不可用导致的无尽认证死循环（#28341）。

### 2. [P1] 文件工具操作序列化 + 原子写入
[#29499](https://github.com/google-gemini/gemini-cli/pull/29499) | area/core, size/l
修复并行 sub-agents 对同一文件的并发读写导致的静默丢失更新与错误 diff（#29078）。

### 3. [P1] 修复 Enter 键在交互模式下挂起
[#29476](https://github.com/google-gemini/gemini-cli/pull/29476) | area/core, size/m
工具确认提示（如文件编辑审批）按 Enter 无响应的问题，将用户确认事件与 IDE 集成解耦（#23297）。

### 4. [P1] read-many-files 改用 glob 精确匹配
[#29457](https://github.com/google-gemini/gemini-cli/pull/29457) | area/core, size/xl
修复二进制文件因模糊子串匹配被误认为"显式请求"而导致的上下文膨胀问题（#29045）。

### 5. [P1] 支持 rootless Podman + keep-id
[#29505](https://github.com/google-gemini/gemini-cli/pull/29505) | size/l
修复 rootless Podman 沙箱启动失败问题，正确保留宿主机 UID/GID 映射。

### 6. 策略重定向门控与工作流解析对齐
[#29506](https://github.com/google-gemini/gemini-cli/pull/29506) | size/l, CLOSED
简化 CI issue 自动化流程，直接解析结构化输出，并对策略重定向与路径验证逻辑做了统一。

### 7. [P1] 修复 ACP 会话加载文件名冲突
[#29463](https://github.com/google-gemini/gemini-cli/pull/29463) | area/core, CLOSED
解决 ACP 模式下同一 UTC 分钟内 `session/new` 与 `session/load` 的文件名冲突，避免"无历史会话"误报。

### 8. [P1] 清理后台 shell 临时目录
[#29437](https://github.com/google-gemini/gemini-cli/pull/29437) | area/core, CLOSED
`gemini-shell-*` 临时目录现随后台进程退出自动清理，避免磁盘残留。

### 9. [P1] A2A Server 设置 V1→V2 迁移
[#29450](https://github.com/google-gemini/gemini-cli/pull/29450) | area/non-interactive, size/xl
为 a2a-server 新增层级化 V2 配置加载，同时保持对旧扁平 V1 配置的内存兼容。

### 10. [P1] 移除非法 diff.external 覆盖
[#29467](https://github.com/google-gemini/gemini-cli/pull/29467) | area/core, CLOSED
删除 ShellExecutionService 中无效的 `diff.external` 配置，修复沙箱内 Git diff 执行报 `cannot spawn` 致命错误。

---

## 5. 功能需求趋势

1. **Subagent 可靠性与可观测性**：MAX_TURNS 误报、轨迹可见性（#22598）、bugreport 上下文缺失（#21763）——社区对子代理的信任与调试能力要求明显提升。
2. **Auto Memory 治理**：脱敏前移、低信号终止、无效 patch 隔离（#26525/#26522/#26523）——记忆系统开始进入精细化打磨阶段。
3. **AST 感知代码操作**：方法级精准读取、代码库映射（#22745/#22746）成为下一阶段减少上下文膨胀的核心方向。
4. **代理安全护栏**：防破坏性命令、sandbox 方案（#19873/#22672）——用户对模型自主执行危险操作的风险意识增强。
5. **跨平台与环境适配**：WSL2 剪贴板、Wayland 浏览器代理（#27588/#21983）——Linux 桌面用户场景持续补全。

---

## 6. 开发者关注点

- **"挂起"类问题成为首要痛点**：generalist agent 无限等待（#21409）、Enter 无响应（#23297）、浏览器代理卡死——高频阻塞类 bug 严重影响日常使用。
- **配置"不生效"的挫败感**：browser agent 忽略 settings.json（#22267）、symlink agent 不被识别（#20079）——配置层的一致性问题亟需修复。
- **上下文与 token 成本控制**：二进制文件误读导致的 context bloat（#29045）、tactful extraction 诉求（#19561）——开发者对 token 效率高度敏感。
- **安全性前置**：认证死循环（#28341）、内存脱敏（#26525）、危险命令防范（#22672）——企业级用户关注的安全底线正在形成社区共识。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-26

## 今日速览

- 过去 24 小时无新版本发布，社区稳定版仍为 v1.39.0（build 2026-09-24），但 Windows 桌面端会话迁移相关的数据一致性缺陷持续发酵，多个 issue 在同一位用户反馈下形成关联线索。
- PR 侧异常活跃：CLI/TUI 体验优化与 Agent 可靠性修复批量合入，其中 DeepSeek 思考模式 400 错误修复（#10084）、perseveration 循环检测（#10794）和配置路径重构（#10780）值得重点关注。

---

## 社区热点 Issues

以下是过去 24 小时内有更新、最值得开发者关注的 10 个 Issue：

### 1. 侧边栏会话标签被“宿主注入块”替换，且同一会话被导入 5 次
[#10495](https://github.com/esengine/DeepSeek-Reasonix/issues/10495) · `[Bug]` · v1.38.10 · Windows · **7 条评论**

升级 v1.38.7 → v1.38.10 后，Windows 桌面端侧边栏的会话主题名被替换为每个迁移会话的第一条 `user` 角色记录（实际是注入的宿主块），并且同一旧会话被重复导入多次。用户自定义的会话标题完全丢失，属于严重的迁移数据损坏问题。

### 2. v1.38.7 切换会话时约 2 秒阻塞事件循环
[#10190](https://github.com/esengine/DeepSeek-Reasonix/issues/10190) · `[Bug]` · v1.38.7 · Windows · **5 条评论**

在项目内切换会话仍会卡顿约 2 秒，应用自身的 lag 检测器报 `[performance.lag] reason: event loop la...`。虽然 Markdown 缓存正常，但这表明事件循环被某个同步操作阻塞，影响高频切换场景下的核心体验。

### 3. 启动后侧边栏空白 20~40 秒的真正原因：服务侧全量扫描
[#10738](https://github.com/esengine/DeepSeek-Reasonix/issues/10738) · `[Bug]` · v1.38.12 · Windows · **已关闭** · **4 条评论**

用户用进程级 CPU/IO 采样实测三轮完全退出→重启，定位到 `reasonix-desktop.exe --host-rpc` 启动后持续满载约 40 秒（平均 2.6 核，峰值 5.4 核），导致左侧栏空白。真正问题在服务侧而非渲染侧，值得开发团队优化启动时的全量扫描策略。

### 4. 会话轮数一多就频繁触发 turn 截断
[#9766](https://github.com/esengine/DeepSeek-Reasonix/issues/9766) · `[Bug]` · v1.34.0 / v1.36.0 · Windows · **3 条评论 · 👍 1**

当会话轮数达到约 21~30 轮后，持续出现 turn 截断。用户排查认为是“长时间没有 tool call 输出”，导致宿主判定无动作而截断。这是长会话场景下 Agent 稳定性的关键问题，涉及“空闲判定”与“思考型任务”之间的边界。

### 5. “Cannot open session”错误跨重启持续存在
[#10456](https://github.com/esengine/DeepSeek-Reasonix/issues/10456) · `[Bug]` · v1.38.7 · Windows · **3 条评论**

某个会话在桌面端完全无法打开，报 `Failed to load conversation histor...`。根本原因是会话转录投影时遇到重复转录记录，并累积了 31 条 `local_only` 哨兵记录。该问题不随重启消失，用户面临会话永久不可恢复的风险。

### 6. 模型发现接口连接失败，但浏览器可正常访问
[#10204](https://github.com/esengine/DeepSeek-Reasonix/issues/10204) · `[Bug]` · v1.38.7 · Linux · **已关闭** · **2 条评论**

添加 DeepSeek 模型时提示“无法连接模型发现接口”，但系统浏览器访问 `api.deepseek.com` 正常。删除 `~/.reasonix` 和 `~/.config/reasonix` 后问题依旧。反映的是代理/网络配置在应用内与系统级解析不一致的问题。

### 7. 恢复一个会话会恢复两行，删除一条会删除全部——静默数据丢失
[#10508](https://github.com/esengine/DeepSeek-Reasonix/issues/10508) · `[Bug]` · v1.38.10 · Windows · **已关闭** · **2 条评论**

迁移后同一会话在侧边栏显示为两行甚至多行；用户删除其中一个“重复行”时，该会话的所有记录会一并被删除。由于用户以为删除的是重复项，实际上会静默丢失整个对话，是 #10495 的连带缺陷中危害最大的场景。

### 8. 打开的 Markdown 文档在文件变更后不会自动刷新
[#9780](https://github.com/esengine/DeepSeek-Reasonix/issues/9780) · `[Feature]` · 桌面端 · **1 条评论**

Markdown 预览（编辑器）在文件被 Agent 写入、其他编辑器保存或 git 更新后不会自动刷新。这是桌面端 Agent 协作工作流中的高频体验需求——用户期待“文件变化即刷新”。

### 9. 工作区文件面板静默隐藏顶层 tmp/bin/stage 目录
[#10006](https://github.com/esengine/DeepSeek-Reasonix/issues/10006) · `[Bug]` · 桌面端 · Windows · **已关闭** · **1 条评论**

`internal/fileref/skipDirPaths` 将 `tmp` / `bin` / `stage` 当作根相对路径跳过，而这个表同时被 `@` 引用搜索（跳过是合理的）和右侧文件面板（应当忠实反映磁盘）共用，导致用户真实的顶层 `tmp/` 目录在文件面板中完全不可见、无法展开。

### 10. 一次性 `reasonix -p` 运行泄漏为侧边栏 “Legacy” 会话
[#10802](https://github.com/esengine/DeepSeek-Reasonix/issues/10802) · `[Bug]` · v1.39.0 · Windows · **新建，无评论**

通过 `reasonix -p` 运行的一次性命令会以原始 session id 作为名称，泄漏到桌面端侧边栏，显示为无标题的 “Legacy” 条目。这是 v1.39.0 中 CLI 与桌面端会话隔离不彻底的新问题。

---

## 重要 PR 进展

以下是过去 24 小时内更新、值得关注度最高的 10 个 PR（多数已合入/关闭，体现为主分支的新能力）：

### 1. 新增 `strip_chain_of_thought` 供应商选项
[#10814](https://github.com/esengine/DeepSeek-Reasonix/pull/10814) · `[Open]` · provider

在 DeepSeek 思考模式下，将 `reasoning_content` 序列化到**每一个** assistant 历史轮次（包括纯文本轮次），避免 DeepSeek 对思考模式历史返回 400 错误。新增 `strip_chain_of_thought` 选项允许用户按需剥离思考链内容，是对 #10084 修复的进一步配置化。

### 2. 检测 perseveration 循环，提示后重试一次
[#10794](https://github.com/esengine/DeepSeek-Reasonix/pull/10794) · `[Closed]` · agent

新增客户端侧 guard：当模型卡在重复输出同一段文本或推理内容、且从不调用工具时，判定为 perseveration（无意义重复）循环。原来的 guard 只关注工具调用或静默，导致“聊天式死循环”会烧掉整个输出预算而不被察觉。此 PR 为该场景增加一次“带提示重试”的兜底。

### 3. 统一项目配置路径解析
[#10780](https://github.com/esengine/DeepSeek-Reasonix/pull/10780) · `[Closed]` · config

将 `<root>/reasonix.toml` 路径由原先散布在约 15 处的内联拼写收敛为一个 `ProjectConfigPath(root)` 帮助函数，所有调用方（load、credentials、edit、旧 key 迁移、MCP 迁移、boot）统一走该函数。降低配置相关 bug 的排查成本。

### 4. 修复 DeepSeek 思考模式重复 400 错误
[#10084](https://github.com/esengine/DeepSeek-Reasonix/pull/10084) · `[Closed]` · provider

在 DeepSeek 思考模式下，将 `reasoning_content` 序列化到每个 assistant 历史轮次（包括纯文本轮次），修复服务端报 `The reasoning_content in the thinking mode must be passed back to the API` 的重复错误。这是长期影响 DeepSeek 用户长会话稳定性的关键修复。

### 5. ```diff / ```patch 围栏渲染为彩色 diff
[#10251](https://github.com/esengine/DeepSeek-Reasonix/pull/10251) · `[Closed]` · tui

Assistant 输出中 `diff` / `patch` 信息串的代码围栏现在走既有 diff 渲染器（红/绿背景条、`+`/`-` 沟槽、行号、chroma 高亮），替代通用代码块样式。对开发者阅读代码变更输出有直接的体验提升。

### 6. Composer 输入框支持 vi 命令模式
[#10367](https://github.com/esengine/DeepSeek-Reasonix/pull/10367) · `[Closed]` · tui

新增 `ui.commandmode = "vi"` 可选配置：`Esc` 进入命令模式（不再打断正在运行的 turn），`Ctrl+C` 作为唯一中断键；有已输入文本时 `Ctrl+C` 会将草稿原样存入 cmdline 历史并清空提示。面向 vim 用户的输入交互增强。

### 7. 尊重 `[sandbox].bash="off"`，关闭时跳过 bwrap 探测
[#10297](https://github.com/esengine/DeepSeek-Reasonix/pull/10297) · `[Closed]` · sandbox

此前配置 `bash = "off"` 并不会真正禁用 OS 沙箱：`specForCall` 会强制覆盖 `spec.Mode = "enforce"`，且 bubblewrap 探测在 `bash=off` 的会话中仍然执行。此 PR 修复了配置不生效的问题，并避免无效探测带来的启动开销。

### 8. 新增按供应商配置的 `stream_idle_timeout_seconds`
[#10344](https://github.com/esengine/DeepSeek-Reasonix/pull/10344) · `[Closed]` · provider

为每个 provider 增加独立的流空闲超时配置：模型流已开始后若超过设定时间无任何字节，则视为连接断开并触发重放。未设置时保持原有 300 秒适配器默认值，兼容不同供应商的网络特性。

### 9. 强制 bash 中的 git 行为符合 Reasonix 预期
[#10368](https://github.com/esengine/DeepSeek-Reasonix/pull/10368) · `[Closed]` · tools

强制 Reasonix 启动的每个 git 子进程（包括自身 `gitcmd` 和 Agent 通过 bash 工具执行的 git）使用标准 git 行为，避免用户 `~/.gitconfig` 中的 `rebase` 等自定义配置干扰 Agent 的 git 操作，保证 Agent 看到的仓库行为与 Reasonix 假设的一致。

### 10. 受管配置文件写入始终需要人工确认
[#9770](https://github.com/esengine/DeepSeek-Reasonix/pull/9770) · `[Closed]` · config

Reasonix 受管配置文件（`config.toml`、兼容 TOML、旧版 `config.json`）在**任何位置**的写入都必须经过 `config_write` 审批。此前 `confineWrite` 仅在目标位于写入根外部时才征求审批，导致 Agent 可能绕过人工确认修改关键配置。此 PR 堵住了该安全缺口。

---

## 功能需求趋势

从近期 Issues 和 PR 合入情况来看，社区关注度最高的功能方向集中在以下五类：

1. **会话数据安全与迁移正确性（Windows 桌面端）**
   多个 issue（#10495、#10508、#10456）指向会话导入、去重、删除操作中的数据一致性。社区对“迁移不丢数据、删除不误伤”有强烈诉求，这是桌面端最核心的信任问题。

2. **启动与操作性能**（#10190、#10738）
   启动 40 秒全量扫描、切换会话 2 秒阻塞，是当前桌面端性能吐槽最集中的两个场景。服务侧扫描策略优化与事件循环去阻塞是开发重点。

3. **长会话 Agent 稳定性**（#9766）
   20~30 轮后的 turn 截断问题在多版本中反复出现，社区期待更合理的“空闲判定”策略，区分“思考中”与“卡死”。

4. **CLI/TUI 高频操作效率**（#9491、#9769、#10367、#10516）
   YOLO 模式数字键直选、自动提交已完整作答的 ask 批次、vi 命令模式、`--continue` 找不到会话时回退新会话等，说明 CLI 用户正在追求“零多余确认”的交互效率。

5. **供应商兼容性与可配置性**（#10344、#10084、#10814）
   针对不同模型供应商的超时设置、思考链传递选项、模型发现接口的网络兼容等，是 provider 层持续迭代的方向，尤其 DeepSeek 思考模式的 400 错误修复获得了社区高度关注。

---

## 开发者关注点（高频痛点）

1. **会话迁移缺陷集中爆发**：v1.38.10 引入的重复导入、标签替换、删除连带问题（#10495、#10508）相互关联，同一位用户连续提交多个数据丢失类 issue，说明迁移代码的测试覆盖不足。
2. **“无法打开会话”类错误缺少自愈机制**：#10456 中 31 条哨兵记录导致永久性打开失败，且跨重启持续，用户完全无法自行恢复。
3. **启动与切换延迟直接影响日常使用**：40 秒空白期和 2 秒切换卡顿属于每次启动、每次切换都会遇到的确定性性能问题，优先级应高于偶发 bug。
4. **长会话没有稳定的轮次保障**：turn 截断在 21~30 轮反复触发，而用户已经定位到“宿主长时间无 tool call 即判定无活动”的机制，说明判定策略需要结合 Agent 实际运行模式（如读文件、思考）进行优化。
5. **文件系统透明性不足**：文件面板隐藏 `tmp/`、`bin/`、`stage/` 目录（#10006）、Markdown 文件变更不自动刷新（#9780），这些都影响了桌面端作为“本地 Agent 工作台”的可靠性。
6. **CLI 与桌面端会话隔离不彻底**：#10802 显示一次性的 `-p` 命令会污染桌面端侧边栏，CLI 与 GUI 的会话边界需要更清晰的定义。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-09-26

> 数据来源：github.com/anomalyco/opencode

## 今日速览

昨日社区聚焦于**核心稳定性**修复：事件序列陈旧导致会话不可写、MCP OAuth 并发刷新竞争、WebSocket 流计费缺失等问题均有对应 PR 推进。高热度 issue 集中在**认证凭据混乱**（ChatGPT OAuth 误用 Zen key、OpenAI 401）与 **Copilot 学生计划支持**上，其中 Copilot issue 获 👍 21，为全库最高。此外功能需求侧出现“元素注释队列”“LSP 运行时暴露给插件”两个新方向。

---

## 社区热点 Issues（10 个）

### 1. TUI 在合成器缩放至 4 时触发 SIGILL（ud2）
- **#42094** | @dhh | 评论 8 | 👍 2
- 两次相隔数周在不同版本上复现，崩溃指令指针和触发秒数完全相同，指向 OpenTUI 绘制路径中与合成器缩放相关的确定性缺陷。
- https://github.com/anomalyco/opencode/issues/42094

### 2. ChatGPT OAuth 请求错误携带 Zen API key
- **#49847** | @jhsu | 评论 7 | 👍 2
- OpenAI provider 被错误绑定到 OpenCode Zen 集成，导致 Zen key 被发送到仅支持 OAuth 的 Codex 端点而被拒绝。恢复正确的 OpenAI OAuth 凭据后正常，说明是绑定时选择逻辑出错。
- https://github.com/anomalyco/opencode/issues/49847

### 3. `Incorrect API key provided: sk-` — OpenAI 401
- **#51419** | @scrapelabs | 评论 7 | 👍 12
- 发送 prompt 即收到 OpenAI 401，API key 以 `sk-svcac` 开头但被拒绝。机器人要求编辑 issue 正文补充结构化信息，社区关注度高。
- https://github.com/anomalyco/opencode/issues/51419

### 4. OpenCode Go 周/月配额与使用历史不一致
- **#41206** | @diqdrax | 评论 6 | 👍 1
- 用户 8 月 7 日才开始使用，配额却显示更早的用量。用量历史与配额计算口径不一致，影响用户对计费可信度的判断。
- https://github.com/anomalyco/opencode/issues/41206

### 5. Copilot 学生计划（仅 Auto 模式）provider 未注册
- **#34644** | @TavoMtz | 评论 5 | 👍 21
- OAuth 连接成功但 `github-copilot` provider 不出现在模型选择器中，直接查询也无法识别。全库最高 👍，学生用户群体受影响的典型场景。
- https://github.com/anomalyco/opencode/issues/34644

### 6. [FEATURE] 元素注释队列与视觉标记（Codex 风格）
- **#51421** | @Revens2 | 评论 3 | 👍 0
- 不同于一般内嵌浏览器需求，专门针对页面元素的注释队列和视觉标记交互，关联 #26772、#30755、#20543。
- https://github.com/anomalyco/opencode/issues/51421

### 7. Zen Go `/v1/responses` 对 GLM-5.3 返回 503
- **#51306** | @Validatus | 已关闭 | 评论 3
- 模型列表展示 `glm-5.3` 系列，但 `/v1/responses` 端点不可用，`/v1/chat/completions` 正常。文档与实现不一致。
- https://github.com/anomalyco/opencode/issues/51306

### 8. 陈旧事件序列导致新会话事件被永久拒绝
- **#51411** | @d4n-sec | 评论 2
- 当 `event_sequence.seq` 落后于 `event` 表中的已有行时，派生的新序号与唯一索引冲突，聚合进入不可写状态。对应 PR #51413 已提交修复。
- https://github.com/anomalyco/opencode/issues/51411

### 9. V2 回填后写入的旧版会话永不重新导入
- **#51404** | @abhijeet3001 | 已关闭 | 评论 2
- V2 的会话迁移是一次性回填，回填完成后旧表的新写入（例如 V1 1.18.x 构建）不会再被导入，跨版本混用会丢失会话数据。
- https://github.com/anomalyco/opencode/issues/51404

### 10. 注意声音在每个 TUI 窗口播放一次，叠成合唱
- **#51415** | @LangLangBart | 评论 1
- 同一服务开两个 TUI 窗口时，通知声音叠加播放。小问题但体验影响直接，说明 TUI 多窗口模式的音频管理缺少全局协调。
- https://github.com/anomalyco/opencode/issues/51415

---

## 重要 PR 进展（10 个）

### 1. 服务器凭据以 UTF-8 编码
- **#46225** | @sdivyanshu90
- 修复 `btoa()` 直接接收非 ASCII 凭据导致编码错误的问题。影响所有含非拉丁字符用户名/密码的代理场景。
- https://github.com/anomalyco/opencode/pull/46225

### 2. auth.json 原子写入 + 锁保护
- **#46131** | @iceteaSA
- 两个 commit 分别修复：认证写入持久化环境快照、并发写入丢失凭据。对多进程共享配置的场景至关重要。
- https://github.com/anomalyco/opencode/pull/46131

### 3. 工作树外的绝对权限模式匹配
- **#40149** | @iceteaSA
- 修复权限规则中绝对路径无法匹配工作树外文件的缺陷。此前多个 issue（#30551/#20045/#22465/#25097）报告过，本次覆盖了反向场景。
- https://github.com/anomalyco/opencode/pull/40149

### 4. WebSocket 流失败计数
- **#50955** | @rekram1-node
- 修复流结束前的清理逻辑导致空闲超时和响应解析错误未计入失败的问题。关联 #50213。
- https://github.com/anomalyco/opencode/pull/50955

### 5. MCP OAuth 跨进程刷新序列化
- **#50994** | @rekram1-node
- 修复多进程同时刷新 token 导致授权服务器轮换 refresh token 后其他进程全部失效的问题。修复 #34520。
- https://github.com/anomalyco/opencode/pull/50994

### 6. 保留 MCP 服务器配置中的数字超时值
- **#50911** | @Veld101
- V2→V1 兼容层只接受字符串形式的 `timeout`，数字类型被丢弃。关闭 #50807。
- https://github.com/anomalyco/opencode/pull/50911

### 7. 忽略 JSONC 注释中的文件引用
- **#50899** | @kassdinzheng123
- 内联注释中的 `{file:...}` 被 V2 误读为真实文件路径，导致合法配置被拒绝。关闭 #50898。
- https://github.com/anomalyco/opencode/pull/50899

### 8. 限制替换字符串/参数/递归深度/诊断链
- **#51407** | @rekram1-node
- 递归与分配审计的第一批共 6 个精确且局部的修复，所有修复场景都会无界分配内存或挂起至超时。
- https://github.com/anomalyco/opencode/pull/51407

### 9. 恢复陈旧事件序列
- **#51413** | @d4n-sec
- 取聚合游标与已持久化事件序列的较大者再分配本地序号，修复 #51411。
- https://github.com/anomalyco/opencode/pull/51413

### 10. 折叠推理时遵循 thinking 透明度
- **#51417** | @Yun-0000
- 折叠态标题忽略 `theme.thinkingOpacity`，展开时才有透明度，修复 #51134。属于 TUI 视觉一致性小修。
- https://github.com/anomalyco/opencode/pull/51417

---

## 功能需求趋势

社区当前关注方向：

| 方向 | 代表 Issue/PR | 说明 |
|---|---|---|
| **会话/历史数据一致性与迁移** | #51404、#51411、#51413 | V2 会话迁移、事件序列恢复、跨版本数据兼容，稳定性第一优先级 |
| **认证与凭据正确性** | #49847、#51419、#46131、#50994 | OAuth 绑定错误、并发刷新竞争、凭据持久化丢失，开发者对“凭据混乱”容忍度极低 |
| **TUI/桌面端细节打磨** | #42094、#51415、#51417、#51418 | 合成器缩放崩溃、声音重叠、主题透明度、工具行对齐，多窗口场景持续暴露问题 |
| **编辑器/IDE 集成体验** | #34644、#51421 | Copilot 模型接入、元素注释队列（类似 Codex），从终端走向 GUI 交互 |
| **Plugin API 扩展** | #51416 | 将 LSP 运行时暴露为 `ctx.lsp`，让插件直接获取诊断/定义/符号，无需启动第二个 LSP |

---

## 开发者关注点

- **崩溃类问题被高度重视**：#42094 在合成器缩放到 4 的瞬间触发 `ud2`，同指令指针、同秒复现两次，这种确定性崩溃通常意味着硬件/驱动相关的深层缺陷。
- **认证链路混乱是最大痛点**：ChatGPT 端点收到 Zen key、OpenAI 收到 `sk-svcac` 前缀的无效 key、Copilot 学生计划无法识别——多条线索同时指向 provider 凭据绑定逻辑需要全面审查。
- **配额与用量历史不一致**（#41206）影响用户对 OpenCode Go 计费系统的信任，属于商业层面的高优问题。
- **会话迁移的“一次性”陷阱**：V2 回填完成后旧表的新写入被永久忽略（#51404），暴露出迁移设计未考虑“迁移期间及之后仍在运行旧版本”的场景。
- **社区贡献活跃且分工明确**：多个 `automated-pr-cleanup` 标签的 PR 集中在 8-25 被清理，而 9-25 新增的 PR 多为作者定向修复（例如 #51413 由 issue 作者直接提交），说明 bug 报告到修复的闭环效率在提升。

---
*本日报由 GitHub 公开数据自动生成，统计时间为 2026-09-26。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-26

## 今日速览

今日 Hermes 社区聚焦于**桌面端更新循环、Windows 平台兼容性、以及辅助客户端参数错误**三大核心问题。OpenAI Codex OAuth 401 新缺陷浮出水面，另有多个 PR 针对桌面端生命周期管理、Windows 网关启动机制和 Gemini 会话恢复进行系统性修复。

---

## 社区热点 Issues（10 个）

### 1. 桌面端每次启动触发 no-op 更新循环，导致聊天中断
**#122656** | 作者: @chloecaffeinexo | 评论: 7 | 更新: 2026-09-25

源码安装的桌面版每次 backend 启动都会执行 `_update_takeover.py`，触发应用重建和网关重启，导致活跃会话反复中断。社区讨论活跃，涉及安装器设计的历史包袱。

🔗 https://github.com/NousResearch/hermes-agent/issues/122656

### 2. macOS 快速用户切换被网关阻塞 20~30 秒
**#120545** | 作者: @Thomas-Kluge | 评论: 6 | 更新: 2026-09-25

macOS 26.3 上，launchd 网关通过 osascript `do shell script` 包装运行时，即使没有任何消息平台启用，也会阻塞快速用户切换。影响多账户用户日常使用。

🔗 https://github.com/NousResearch/hermes-agent/issues/120545

### 3. Windows: `hermes update` 因 venv 重定向器误判中止
**#122495** | 作者: @mysoul12138 | 评论: 6 | 更新: 2026-09-25

更新流程在 pause gateways 阶段将 profile 网关误判为非活跃实例，导致 `RuntimeError: Could not map Windows gateway PIDs to profiles`。身份分类器存在误报。

🔗 https://github.com/NousResearch/hermes-agent/issues/122495

### 4. OpenAI Codex OAuth 重新认证后仍返回 HTTP 401
**#123210** | 作者: @hongbaemoon-ux | 评论: 0 | 更新: 2026-09-26

用户完成全新设备码登录后，Hermes 显示凭据已登录，但实际请求 Codex 后端仍 401。旧凭据残留与刷新令牌轮换可能存在冲突。

🔗 https://github.com/NousResearch/hermes-agent/issues/123210

### 5. aux `_build_call_kwargs` 向纯 OpenAI 客户端注入私有参数
**#123194** | 作者: @omar5b2007-git | 评论: 0 | 更新: 2026-09-25

`agent/auxiliary_client.py` 将私有 kwarg `_reasoning_config` 附加到辅助请求上，导致 `TypeError: Completions.create() got an unexpected keyword argument`，影响所有走共享路径的消息平台。

🔗 https://github.com/NousResearch/hermes-agent/issues/123194

### 6. `write_file` 等工具调用在 JSON 不可修复时被静默丢弃
**#119389** | 作者: @lowcodai | 评论: 2 | 更新: 2026-09-25

包含引号/反引号/换行的大文件写入时，工具调用参数 JSON 无法修复会被直接丢弃，目标文件保留旧内容且无任何错误提示。数据完整性风险高，标注需要复现。

🔗 https://github.com/NousResearch/hermes-agent/issues/119389

### 7. 环境变量凭证使未配置 provider 成为持久默认路由
**#115079** | 作者: @gkd2323c | 评论: 2 | 更新: 2026-09-25

从未配置 Alibaba 的机器上，`model.provider` 被自动设为 `alibaba-cn`，主聊天循环及全部 14 个辅助角色请求都发送至 DashScope 端点。环境变量污染配置的安全隐患。

🔗 https://github.com/NousResearch/hermes-agent/issues/115079

### 8. `hermes update` 在 git-checkout 安装中跳过 venv 重建
**#123201** | 作者: @opethnb | 评论: 0 | 更新: 2026-09-25

提交要求 Python 3.14 后，更新报告成功但运行时仍旧在旧 Python 3.13 上，因只检查依赖戳而非解释器版本。更新流程需要感知 Python 版本变更。

🔗 https://github.com/NousResearch/hermes-agent/issues/123201

### 9. `/btw` fork 路径丢失当前轮次上下文
**#123202** | 作者: @thregit | 评论: 0 | 更新: 2026-09-25

交互式 CLI 中，任务进行中时 `/btw` 看不到当前请求和已做的工具调用，首轮会话完全空白。fork 路径裁剪过度，核心使用场景失效。

🔗 https://github.com/NousResearch/hermes-agent/issues/123202

### 10. NVIDIA ≥580 驱动被误判为需 SwiftShader 回退
**#123203** | 作者: @jmott85 | 评论: 0 | 更新: 2026-09-25

`decideNvidiaEglFallback()` 对 all major version ≥ 580 的驱动启用 `--use-angle=swiftshader`，影响新驱动用户的 GPU 加速。

🔗 https://github.com/NousResearch/hermes-agent/issues/123203

---

## 重要 PR 进展（10 个）

### 1. fix(aux): 从纯 OpenAI 客户端移除私有推理参数
**#123209** | 作者: @Wenfengcheng | 更新: 2026-09-25

针对 #123194 的直接修复。`_build_call_kwargs` 不再基于 provider profile 推断适配器所有权，从而避免向标准 SDK 传递 `_reasoning_config`。

🔗 https://github.com/NousResearch/hermes-agent/pull/123209

### 2. fix(agent): 禁止 Gemini contents 以模型函数调用开头
**#122181** | 作者: @YuanQY | 更新: 2026-09-25

原生 Gemini 适配器不再发送以函数调用开头的请求。该形状会被 Gemini 拒绝，且若已写入转录会导致后续所有请求失败直至 `/new`。

🔗 https://github.com/NousResearch/hermes-agent/pull/122181

### 3. fix(gateway): Windows 网关使用 checkout 的提交解释器
**#123206** | 作者: @dskwe | 更新: 2026-09-25

解决 Windows 网关 ABI 崩溃循环中 PATH 竞争问题：从 PATH 前缀取解释器会烘焙系统 Python（如 3.14）到 `gateway.cmd`/`gateway.vbs`，应使用 checkout 自带 venv 的解释器。

🔗 https://github.com/NousResearch/hermes-agent/pull/123206

### 4. fix(gateway): 统一 Windows 网关自启动机制
**#122268** | 作者: @OutThisLife | 更新: 2026-09-25

Scheduled Task 与 Startup-folder launcher 并存导致冲突。`install()` 注册计划任务后未清除旧的 .vbs/.cmd 启动器，用户会看到重复启动或更新失败。

🔗 https://github.com/NousResearch/hermes-agent/pull/122268

### 5. fix(desktop): 无配置根目录时停止扫描 home 目录
**#122900** | 作者: @OutThisLife | 更新: 2026-09-25

空的 `desktop.repo_scan_roots` 被静默扩展为整个 home 目录的扫描。macOS 上还会触达 TCC 保护位置，每次桌面启动都有隐私和性能风险。

🔗 https://github.com/NousResearch/hermes-agent/pull/122900

### 6. fix(tui): 技能密钥提示路由至当前会话
**#121471** | 作者: @OutThisLife | 更新: 2026-09-25

`set_secret_capture_callback` 使用进程级全局回调，导致密钥提示进入错误会话。修复后 `secret_cb` 会查询绑定到当前会话的 UI owner。

🔗 https://github.com/NousResearch/hermes-agent/pull/121471

### 7. fix(desktop): 会话生命周期集群修复
**#122083** | 作者: @OutThisLife | 更新: 2026-09-25

涵盖标签页标题、已耗尽会话恢复、Command Center 加载更多、`/new` 嵌套、压缩双标签页、嵌套 git、队列排空等多个会话相关缺陷。P3 级修复清单中合并次数最多的一批。

🔗 https://github.com/NousResearch/hermes-agent/pull/122083

### 8. fix(gateway): Windows 打包启动与 Ctrl-C 干净退出
**#122866** | 作者: @OutThisLife | 更新: 2026-09-25

修复打包后的 `hermes desktop` Windows 启动路径中进程未与父进程分离、以及 Ctrl-C 退出时清理不彻底的问题。

🔗 https://github.com/NousResearch/hermes-agent/pull/122866

### 9. fix(state): 重置受限会话浏览的压缩围栏
**#123148** | 作者: @CocaKova | 更新: 2026-09-25

#114271 的压缩围栏引入时遗漏了 `list_recent_sessions_bounded`，压缩根节点为 fork 时会导致浏览视图展示错误数据。现在围栏逻辑覆盖全部三个遍历路径。

🔗 https://github.com/NousResearch/hermes-agent/pull/123148

### 10. fix(desktop): 模型行拆分与渲染可访问性修复
**#122080** | 作者: @OutThisLife | 更新: 2026-09-25

重复模型选择行由 `deepseek-flash` 硬编码导致，现已通过 vendor-word 大小写归一化解决。同时修复归档会话 tombstone 合并和搜索字段清除按钮。

🔗 https://github.com/NousResearch/hermes-agent/pull/122080

---

## 功能需求趋势

| 方向 | 代表 Issues/PRs | 热度 |
|------|----------------|------|
| **更新流程可靠性** | #122656, #122495, #123201, #122268 | 高 — 更新失败类型多样，涉及所有平台 |
| **桌面端体验完善** | #122080, #122083, #122084, #122866, #122900 | 高 — P3 修复集群合并推进中 |
| **Windows 平台适配** | #122495, #122268, #123206, #122866 | 高 — 网关/启动/更新均含 Windows 专项 |
| **认证与凭证安全** | #123210, #115079 | 中 — 环境变量污染与 OAuth 令牌残留 |
| **Agent 核心稳定性** | #119389, #123202, #122181 | 中 — JSON 丢弃、上下文丢失、模型函数调用 |
| **插件生态扩展** | #123207, #123204, #123193 | 中 — 目录新增、下拉框标签、守护误报 |
| **辅助任务/LLM 客户端** | #123194, #123209 | 中 — 私有参数泄漏、兼容性问题 |

---

## 开发者关注点

1. **更新流程的“静默故障”** — 多次更新相关 issue 的共同模式是“报告成功但实际运行时异常”，包括跳过 venv 重建、误判网关 PID、误启更新循环。开发者认为更新器需要对 Python 版本、进程身份、当前安装形态做更全面的预设条件检查。

2. **会话状态丢失的高频出现** — `/btw` 无上下文、压缩会话遍历出错、fork 路径裁剪过度，多个独立 issue 指向同一根因：会话图遍历与 fork 边界处理不够统一。社区对此类问题关注度高，因为直接影响日常使用。

3. **环境变量和配置来源的优先级问题** — #115079 显示环境变量凭证可以让未配置 provider 成为默认路由。开发者希望配置系统明确区分“显式配置”“环境变量注入”“自动探测”三个来源的优先级。

4. **Windows 网关的启动器历史包袱** — 多个 issue/PR 指向 Windows 网关启动、更新、PID 映射的连锁问题。旧版 .cmd 启动器、Scheduled Task、venv 重定向器的并存导致维护负担。社区期待一个统一的 Windows 网关管理方案。

5. **private 参数跨 SDK 泄漏** — #123194 反映的是更深层的模式问题：内部参数（`_reasoning_config`）缺少命名空间的强隔离，被误传给不支持的客户端。开发者建议对内部参数使用明确的内部 adapter 接口标记。

---

*日报生成时间：2026-09-26 | 数据源：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)*

:::
