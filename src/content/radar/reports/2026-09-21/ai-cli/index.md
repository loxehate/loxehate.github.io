---
title: "AI CLI 工具社区动态日报"
published: 2026-09-21
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-21

> 生成时间: 2026-09-21 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-21）

> 数据来源：各工具 GitHub 仓库社区日报，覆盖过去 24 小时动态。

---

## 1. 生态全景

当前 AI CLI 工具正从“可用”加速走向“可信赖的生产力基础设施”，但普遍暴露出稳定性、权限可控性和跨平台适配短板。头部工具迭代节奏极快，OpenAI Codex 一天连发 3 个 alpha，Gemini CLI 保持 nightly，DeepSeek Reasonix 则在事故后 24 小时内紧急发布 hotfix。社区关注点高度收敛：headless/CI 环境认证、subagent 行为可靠性、权限审批透明度、会话持久化与成本/隐私透明度，成为跨工具共性问题。整体上，工具能力已超越“能跑通 Demo”，但在真实团队工作流中仍需在安全边界与开发效率之间重新校准。

---

## 2. 各工具活跃度对比

| 工具 | 重点 Issues（日报收录） | 重点 PRs（日报收录） | Releases | 迭代状态 |
|---|---|---|---|---|
| Claude Code | 10 | 5 | 无 | 稳定，但认证/权限/工具回归问题集中 |
| OpenAI Codex | 10 | 10 | 3 个 `rust-v0.156.0-alpha` | 高频迭代，桌面端与配额问题突出 |
| Gemini CLI | 10（共 48 条 Issue 更新） | 10（共 30 条 PR 更新） | 1 个 nightly | 活跃，subagent 稳定性是焦点 |
| DeepSeek Reasonix | 10（共 11 条更新） | 10（共 50 条更新） | v1.38.11 稳定版 | 紧急修复 v1.38.10 回归，信任受挫 |
| OpenCode | 10 | 10 | 无 | 活跃，后台服务崩溃与 ACP 回归待解 |
| Deepseek Harness | 无 | 无 | 无 | 24 小时无活动 |
| Hermes | 8 | 10 | 无 | 社区 PR 驱动，多 Profile 隔离改善 |

> 注：Issues/PR 数为社区日报重点追踪数量，非仓库全量变更数。

---

## 3. 共同关注的功能方向

- **headless/CI 环境认证与凭据持久化**  
  Claude Code 请求设备代码认证流（#22992），`/login` token 未落盘（#95425）；Gemini CLI 修复 OAuth 凭据持久化（#29282）；DeepSeek Reasonix 出现 Windows 凭据读取失败（#10583）；OpenAI Codex 的 OAuth MCP 认证成功但工具不导入（#20009）。无人值守场景已成为刚需。

- **权限系统精准度与可解释性**  
  Claude Code Auto 模式对 solo 开发者产生 12 倍以上误拦截（#95200）；OpenCode 权限弹窗不显示具体命令（#50234）；Gemini 修复 TOML 策略规则容错（#29431）；Codex 安全审查误伤已授权操作（#46869）。社区普遍要求“安全机制可解释、可校准”。

- **Subagent / Agent 行为可控性**  
  Gemini subagent 在 MAX_TURNS 后谎报成功（#22323）、generalist agent 无限挂起（#21409）；Claude Code agent 将未验证假设写入记忆（#95436）；Codex 安全扫描通过 worker/subagent 耗尽周配额（#46819）；Reasonix 停止任务失效（#10565）。多代理可靠性成为最突出瓶颈。

- **会话与状态管理可靠性**  
  Reasonix v1.38.10 导致会话历史全乱（#10527）；Codex Remote-SSH 重连后会话被陈旧进程锁死（#41849）；OpenCode 对“无输出但正常结束”的会话静默空闲（#50250）；Gemini Auto Memory 无限重试低信号会话（#26522）。开发者将会话数据视为重要资产，持久化和恢复能力直接影响信任度。

- **跨平台与桌面稳定性**  
  Codex Windows 发送按钮失效、配置加载卡死（#45307/#44342）；Reasonix Windows 凭据与 CJK 路径损坏（#10583/#10588）；Gemini 浏览器 agent 在 Wayland 下失败（#21983）；Claude Code Windows 窗口被置顶（#95580）。Windows/Linux 平台体验仍是重灾区。

---

## 4. 差异化定位分析

- **Claude Code**：深度绑定 Anthropic 生态，强调插件、hooks、diff 面板、权限分类器等专业开发流细节。社区讨论偏“治理”：企业级认证、隐私开关、文档缺失、工具行为一致性。定位是**稳健的 AI 原生开发环境**。

- **OpenAI Codex**：Rust 运行时 + ChatGPT 多端联动，Desktop/TUI/CLI 全界面覆盖，大量 PR 投入 TUI 鼠标交互、转录布局等体验细节。定位是**ChatGPT 驱动的全平台 agent 工作台**，但配额计量和桌面端稳定性是其短板。

- **Gemini CLI**：Google 模型 + subagent 框架 + Auto Memory + 浏览器 agent，同时关注 Vertex AI 企业模型版本管理。定位是**Google 生态下的多代理自动化平台**，但目前 subagent 可控性和记忆系统安全边界是最受质疑的部分。

- **DeepSeek Reasonix**：CLI + Desktop 双端，重视会话历史、迁移、压缩与 1M 上下文管理。定位是**桌面优先的会话管理与长上下文工具**，但 v1.38.10 暴露的版本质量控制问题严重影响了社区信心。

- **OpenCode**：强调协议中立与可扩展性，支持 ACP、OpenAI-compatible、本地模型（Ollama），插件机制活跃。定位是**连接各类模型与编辑器的开放层**，但后台服务稳定性和贡献者流程仍需改进。

- **Hermes**：NousResearch 出品，多 Profile、Bot 模式、Dashboard、Plugin Catalog，Python 生态色彩浓厚，近期大量工作是隔离性与契约一致性修复。定位是**多身份/多 agent 协作编排框架**，适合需要高度自定义和本地化部署的团队。

---

## 5. 社区热度与成熟度

- **OpenAI Codex**：热度最高之一，一天 3 个 alpha、10+ 重点 PR，社区反馈量大且覆盖 Windows、配额、MCP、TUI。处于**快速迭代期**，功能推进快但稳定性滞后。
- **Gemini CLI**：同样活跃，48 条 Issue 更新、30 条 PR 更新，P1 级 subagent bug 密集。属于**功能丰富但可靠性待补课**的阶段。
- **Claude Code**：更显成熟：无版本发布但 Issue 质量高，设备认证请求获 36 👍，社区对隐私/成本文档缺口的讨论体现企业级诉求。处于**精细化治理期**。
- **DeepSeek Reasonix**：社区情绪激烈，v1.38.10 数据混乱引发“信任危机”，官方 24 小时内发 v1.38.11 补救。属于**快速修复但质量管控承压**阶段。
- **OpenCode**：社区活跃，但自动关闭 PR 的 `needs:issue` 流程挫伤贡献者，SIGSEGV 问题也影响信任。处于**从早期采用走向稳定化**阶段。
- **Hermes**：中等活跃，社区贡献 PR 占比高，无官方 release，重点在生态扩展和代码健康度。属于**社区驱动型成长阶段**。
- **Deepseek Harness**：24 小时无活动，可视为暂停或低关注状态。

---

## 6. 值得关注的趋势信号

- **无人值守/CI 环境成为一等公民**  
  设备认证流、token 持久化、后台服务稳定性的高频出现，说明 AI CLI 正从“交互式助手”转向“可嵌入流水线的执行引擎”。技术决策者应优先评估工具对 SSH、容器、CI 的原生支持，否则自动化落地会受阻。

- **自主 Agent 的“证据链管理”是下一阶段核心能力**  
  Claude Code 将假设写入记忆、Gemini subagent 谎报成功、Codex 后台任务耗尽配额，本质都是 agent 缺乏验证与审计机制。未来需要显式的“待验证”标记、工具调用轨迹共享和可回滚操作，才能在发布等高风险场景使用。

- **安全机制必须可解释、可配置、可关闭**  
  Auto 模式误拦截、权限弹窗不显示命令、安全扫描误伤用户授权操作，说明粗糙的安全策略比没有策略更容易摧毁生产力。权限系统会向“按命令/路径/风险级别”细化，并提供对个人开发者的低摩擦模式。

- **平台适配速度决定工具采用半径**  
  Windows、Wayland、Linux 发行版的 bug 占据大量 Issue。对于非 macOS 团队，选型时必须将“目标平台的 issue 数量和修复响应速度”纳入评估，而不是只看模型能力。

- **成本与隐私透明度成为选型硬指标**  
  GPT-6 Astra 配额耗尽、Classify session states 无文档、Auto Memory 脱敏不足，都直接触及企业合规和个人账单。工具方需要提供细粒度计量、本地优先处理、默认保守的数据策略，开发者应警惕“默认开启但未说明”的功能。

- **TUI 和桌面端体验正在成为新的竞争阵地**  
  Codex 连续 PR 完善鼠标选择、链接点击、布局一致性，Reasonix 优化会话切换闪屏，OpenCode 增加会话生命周期反馈。当模型能力趋同，终端/桌面交互的“手感”会成为用户留存的差异化因素。

> **对开发者的参考价值**：当前阶段选择 AI CLI 工具，建议同时考察“模型能力 / 自动化可靠性 / 权限可控性 / 平台支持 / 成本透明度”五个维度；对于生产环境，优先选择发布节奏稳定、issue 响应快速、安全机制可解释的工具，并为关键操作保留人工审批和回滚路径。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据源**: [anthropics/skills](https://github.com/anthropics/skills) | 截止 2026-09-21

---

## 1. 热门 Skills 排行

按社区关注度（评论/讨论热度）排序，当前均处于 **OPEN** 状态：

**① skill-creator 触发评估修复** · [#1298](https://github.com/anthropics/skills/pull/1298)
修复 trigger 评估的误报与无效评分：Windows 下 `select()` 管道失败、多 worker 探针竞争等问题导致负例错误通过。**社区关注点**：Skill 质量验证基础设施的可靠性，直接影响所有 Skill 的触发调优。

**② proofcore-contract-auditor 智能合约审计** · [#1771](https://github.com/anthropics/skills/pull/1771)
负责 Solidity/Rust 合约的自动化静态分析，并将审计密码学证明锚定到 TON 区块链（零存储 Merkle 协议）。**社区关注点**：Web3 安全审计是全新赛道，首次出现区块链场景 Skill。

**③ mcp-builder 兼容 mcp>=2.0 修复** · [#1742](https://github.com/anthropics/skills/pull/1742)
上游 `streamablehttp_client` 更名及自定义 Header 新写法导致的构建失败。**社区关注点**：官方 Skill 绑定快速演进的外部依赖时，维护滞后问题突出（修复 #1668）。

**④ md2video-audio 文档转视频** · [#1703](https://github.com/anthropics/skills/pull/1703)
将 Markdown 经 Marp 转为幻灯片并合成人声旁白 MP4，零成本产出专业视频。**社区关注点**：内容生产自动化需求明确，教育/自媒体场景想象空间大。

**⑤ docx 孤岛评论检测** · [#1734](https://github.com/anthropics/skills/pull/1734)
检测 Word 文档中的孤儿评论（orphaned comments）。**社区关注点**：OOXML 细节繁复，文档类 Skill 需持续打补丁。

**⑥ pyxel 复古游戏开发** · [#525](https://github.com/anthropics/skills/pull/525)
基于 Pyxel 引擎的 Python 复古游戏 Skill，支持确定性无头运行与逐帧检查。**社区关注点**：作者 @kitao 为 Pyxel 官方维护者，品牌背书强；PR 历经半年仍持续更新，打磨时间长。

**⑦ document-typography 文档排版质控** · [#514](https://github.com/anthropics/skills/pull/514)
解决 AI 生成文档的孤行（1–6 词溢出）、孤段（页底悬空标题）、编号错位等排版问题。**社区关注点**：切中"AI 文档最后 1% 质量"的普遍痛点。

**⑧ AWT 端到端测试** · [#822](https://github.com/anthropics/skills/pull/822)
集成 AI Watch Tester 开源工具，零代码生成 E2E 测试并让 Claude 获得视觉+浏览器控制能力。**社区关注点**：AI 驱动测试的趋势方向，2026-09-19 仍保持活跃。

---

## 2. 社区需求趋势（Issues）

按议题评论量与点赞提炼如下方向：

**🔴 安全与信任（最热议题，43 评论）**
- [#492](https://github.com/anthropics/skills/issues/492)：社区 Skill 被分发在 `anthropic/` 命名空间下，冒充官方身份，构成信任边界漏洞——用户可能向第三方 Skill 授予过高权限。
- [#1175](https://github.com/anthropics/skills/issues/1175)：在 SKILL.md 内编写 SharePoint 访问控制逻辑的安全隐患与上下文窗口顾虑。

**🔵 Skill 生态管理**
- [#228](https://github.com/anthropics/skills/issues/228)（8👍）：组织级 Skill 共享。当前只能通过 Slack/Teams 传文件再手动上传，亟需共享库或直链。
- [#189](https://github.com/anthropics/skills/issues/189)（9👍）：`document-skills` 与 `example-skills` 插件内容重复，导致上下文窗口内加载重复 Skill。
- [#62](https://github.com/anthropics/skills/issues/62)：用户 12 个 Skill 突然消失且报错，基础可用性/持久化问题仍存在。

**🟢 评估与可靠性工具链**
- [#556](https://github.com/anthropics/skills/issues/556)（7👍）：`claude -p` 模式下所有 Skill 触发率恒为 0%，评估脚本形同虚设。
- [#1390](https://github.com/anthropics/skills/issues/1390)：mcp-builder 评估器对所有真实 MCP 服务器打出 0/N——TextContent 不可 JSON 序列化，错误被吞成"工具故障"。
- [#1487](https://github.com/anthropics/skills/issues/1487)：claude-api Skill 单次调用注入约 156k tokens，直接耗尽上下文窗口。

**🟣 新方向提案**
- [#1329](https://github.com/anthropics/skills/issues/1329)：**compact-memory**——符号化紧凑记忆标记，减少长会话上下文膨胀。
- [#412](https://github.com/anthropics/skills/issues/412)：**agent-governance**——AI Agent 治理模式（策略执行/威胁检测/信任评分/审计轨迹）。
- [#1385](https://github.com/anthropics/skills/issues/1385)：**质量门禁管道**——任务前校准 → 对抗性审查 → 交付验证三阶段。

---

## 3. 高潜力待合并 Skills

以下 PR 关注度高、近期有更新，落地概率较大：

| Skill | PR | 最近更新 | 亮点 |
|---|---|---|---|
| **blast-radius** 破坏性操作安全清单 | [#1776](https://github.com/anthropics/skills/pull/1776) | 09-18 | 批量删除/归档前"核对世界"的检查清单，概念新颖 |
| **md2video-audio** 文档转视频 | [#1703](https://github.com/anthropics/skills/pull/1703) | 09-15 | 零成本内容生产管线，应用场景清晰 |
| **AWT** E2E 测试 | [#822](https://github.com/anthropics/skills/pull/822) | 09-19 | 视觉+浏览器控制，AI 原生测试方案 |
| **proofcore-contract-auditor** | [#1771](https://github.com/anthropics/skills/pull/1771) | 09-16 | 区块链审计垂直领域，差异化强 |
| **pyxel** 复古游戏 | [#525](https://github.com/anthropics/skills/pull/525) | 09-16 | 官方作者认证，社区号召力强 |
| **scnet-hpc** 集群运维 | [#1615](https://github.com/anthropics/skills/pull/1615) | 08-24 | 面向 HPC 场景，填补企业级集群操作空白 |

---

## 4. Skills 生态洞察

> **当前社区最集中的诉求并非"更多新 Skill"，而是"让 Skill 本身更可靠"——触发评估准确率、依赖兼容性、上下文安全、权限边界与共享分发机制，才是制约生态发展的核心瓶颈。**

---

# Claude Code 社区动态日报（2026-09-21）

## 今日速览

过去 24 小时无新版本发布。社区焦点集中在三大方向：设备代码认证流功能需求获得高赞（36 👍）、Auto 模式权限分类器回归干扰单人开发者正常工作流、以及“Classify session states”开关的隐私/成本文档缺失。5 个 PR 主要围绕 diff 面板行为修复、插件 hooks 路径安全与遥测数据治理。

## 社区热点 Issues

### 1. 支持设备代码认证流（RFC 8628）[enhancement]
**链接**: https://github.com/anthropics/claude-code/issues/22992

Pro/Max 订阅用户在 headless 环境（SSH、容器、CI）中无法完成 OAuth 交互式登录，请求实现 RFC 8628 标准的设备代码认证流。这是过去 24 小时关注度最高的 Issue——36 👍 和 19 条评论居首，社区对 headless 场景认证体验的诉求强烈。

### 2. “Classify session states”开关无文档且影响隐私/成本 [documentation]
**链接**: https://github.com/anthropics/claude-code/issues/60955

`claude.ai/new#settings/claude-code` 中的 “Classify session states” 开关未被官方文档覆盖，用户无法确认该功能的数据发送范围及其对账单费用的影响。22 👍 说明大量用户遭遇同类困惑，隐私与成本透明度成为主要关切。

### 3. Auto 模式回归：2.1.270 后合法操作被误拦截 [regression, permissions]
**链接**: https://github.com/anthropics/claude-code/issues/95200

单人游戏工作室开发者反馈，自核心 2.1.270 自动更新后，Auto 模式对 solo 开发者自己的例行发布操作产生 **12 倍以上**的权限拒绝，手动回退需 55+ 次权限点击才能完成一个 2 键配置变更。该 Issue 处于 OPEN 状态，是当前权限系统争议最大的回归报告。

### 4. `/login` 报告成功但 token 未保存 [auth]
**链接**: https://github.com/anthropics/claude-code/issues/95425

macOS 上执行 `/login` 显示 “Login successful”，但 token 因 stale `.storage-write.lock` 文件触发 ENOTDIR rmdir 而从未写入磁盘（2.1.277）。每次重启 CLI 都需重新登录，对依赖持久会话的开发者影响明显。

### 5. Agent 将未验证假设作为事实写入记忆 [model, memory]
**链接**: https://github.com/anthropics/claude-code/issues/95436

在 iOS 发布任务（CI → archive 流水线 → App Store Connect）中，agent 反复将推测当作已验证结论，执行操作并**持久化到记忆**作为事实。每个错误结论都导致后续步骤方向错误，社区认为这是自主 agent 在风险管理场景的严重可靠性缺口。

### 6. EnterWorktree 对非嵌套 worktree 的 Write/Edit guard 失效 [tools]
**链接**: https://github.com/anthropics/claude-code/issues/95389

`EnterWorktree(path=...)` 指向有效但非嵌套 worktree 时，Bash cwd 成功切换，但 Write/Edit 的跨 worktree 守卫生效绑定的仍是原始路径——即报成功但保护不生效。属于工具行为不一致问题，Windows 平台可复现。

### 7. iOS Simulator 工具在 Xcode 27 后静默失效 [tools]
**链接**: https://github.com/anthropics/claude-code/issues/95466

Xcode 27 将 Simulator.app 替换为 headless DeviceHub 后，iOS Simulator 工具的 touch/tap 注入静默 no-op，无任何报错反馈。对依赖模拟器 UI 自动化测试的 macOS 开发者影响较大，且排查困难。

### 8. `claude upgrade` 报告成功但二进制未链接 [packaging, cli]
**链接**: https://github.com/anthropics/claude-code/issues/95297

`claude upgrade` 显示成功，但 `bin/claude.exe` 仍为 fallback stub——原生二进制未被实际链接。用户容易被“升级成功”的假象误导，属于打包/CLI 链路的可靠性问题。

### 9. 云会话中 `git push` tags 返回 403 [claude-code-web, sandbox]
**链接**: https://github.com/anthropics/claude-code/issues/95576

Claude Code 云会话中推送 git tags 返回 403，即使 GitHub App 已授予完整权限且仓库无保护规则。web/sandbox 环境的 git 权限传递似乎不完整，影响云端自动化发布流程。

### 10. Windows 桌面窗口被 computer-use 工具卡在置顶状态 [desktop]
**链接**: https://github.com/anthropics/claude-code/issues/95580

Claude Code 的 computer-use 工具在 Windows 上将 `WS_EX_TOPMOST` 遗留在宿主窗口——side-panel 恢复与 Win32 截图 re-pin 存在竞态，导致桌面窗口一直置顶，只能手动操作解除。

## 重要 PR 进展

> 过去 24 小时共 5 个 PR（全部覆盖）。

### 1. diff: 对只读 shell 命令跳过 refetch
**链接**: https://github.com/anthropics/claude-code/pull/95423

diff 面板此前在每次 Bash/PowerShell 调用后都会重新拉取 diff。该 PR 让面板读取工具的 `isReadOnly` 标记，对 `ls`、`git status`、`cat`、grep 等只读命令跳过 refetch，与内置面板行为对齐，减少无用刷新。

### 2. fix(plugins): ralph-wiggum 与 output-style hooks 通过 bash + 带引号路径运行
**链接**: https://github.com/anthropics/claude-code/pull/95698

由 claude[bot] 提交。修复三个内置插件将 hook 注册为裸路径的问题——改为 `bash <quoted-path>` 方式执行，修复了 #95673 及 #78490 中 ralph-wiggum / output-style 的一半问题。

### 3. diff: 会话恢复、/clear 与起始行行为对齐
**链接**: https://github.com/anthropics/claude-code/pull/95587

三处 diff 插件的面板行为与内置面板对齐：会话恢复或继续且 transcript 已有编辑时，在宽度确定后立即打开面板；`/clear` 后面板保持状态；会话起始行跟随引擎的实际起点。

### 4. diff: 首个编辑仅在存在可展示文件时打开面板
**链接**: https://github.com/anthropics/claude-code/pull/94847

此前会话首次成功 Edit/Write/NotebookEdit 后 pane 无条件打开，且先于 fetch 执行。仓库外写入、忽略文件或跨 worktree 写入都会导致空白面板（“No tracked changes”）。现在 pane 只在有真实文件可展示时才打开。

### 5. telemetry: 完整 rows 采集、批量发送、仅限内置插件
**链接**: https://github.com/anthropics/claude-code/pull/95618

telemetry 插件在 Claude Code 分析功能开启时运行，通过 hook 读取 `next.origin` 拒绝用户安装或管理员配置的第三方插件上报，仅服务内置插件。rows 与 CLI 自身格式一致并批量发送。

## 功能需求趋势

- **认证与授权**：设备代码认证流支持（#22992）与登录 token 持久化修复（#95425）共同指向 headless/CI 场景的无缝认证需求，现有 OAuth 交互流严重阻碍无人值守环境。
- **权限系统精准度**：Auto 模式权限分类器回归（#95200）引发对误拦截率的讨论；代理转发的权限请求消息丢失（#87581）也反映权限链路细节仍需打磨。
- **模型事实核查能力**：多个 Issue（#95436、#95480、#87532）反馈 agent 将推测当结论、把平台正常产物误判为 bug symptom，社区对模型在高风险任务中的证据链要求明显提高。
- **平台兼容响应速度**：Xcode 27 后 iOS 模拟器工具失效（#95466）、Windows 窗口置顶竞态（#95580）、升级后二进制未链接（#95297），说明开发者需要更快速的平台升级适配。
- **隐私与成本透明度**：“Classify session states”未文档化（#60955）与诊断命令输出的隐私提醒（#75869）显示，社区希望明确数据流向与控制手段。
- **IDE 集成**：VS Code 扩展请求 ghost-text 下一提示建议（#879999），延续终端 CLI 向 IDE 生态迁移的趋势。
- **会话管理工具**：官方只读 transcript 查看器（#87585），便于开发者审计与回溯历史会话内容。

## 开发者关注点

- **权限误拦截严重影响产出效率**：Auto 模式 12 倍拒绝增加、55+ 次手动点击回退（#95200），在单人开发者或小型团队场景被放大，安全机制需要在保护性与生产力之间重新校准。
- **headless 环境认证摩擦**：无交互式浏览器可用时，Pro/Max 用户被设备代码认证缺失阻塞（#22992）；登录 token 持久化偶发失败（#95425）进一步破坏自动化工作流。
- **模型缺乏证据链管理**：在 CI/发布等不可逆操作中，agent 将假设当作事实写入记忆（#95436）会造成连锁错误，需要更强的推理基线约束或显式“待验证”标记机制。
- **升级与安装链路可靠性**：`claude upgrade` 报告成功但二进制未更新（#95297），用户希望升级命令具备更完整的校验与回滚提示。
- **平台迁移期适配滞后**：Xcode 27 迁移至 headless DeviceHub 导致现有工具静默失效（#95466），开发者期望在工具链稳定之前有明确的兼容性检测或降级方案。
- **隐私/成本设置不透明**：会话状态分类默认开启但缺少文档说明（#60955），开发者难以评估数据发送范围与费用影响，需官方提供详细说明或默认关闭选项。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 — 2026-09-21

## 今日速览

昨日 Codex 仓库共发布 3 个 `rust-v0.156.0-alpha` 系列迭代版本；社区讨论热度集中在 **配额消耗过快**（多条 Issue 投诉 GPT-6 Astra 在短时间或后台任务中耗尽周/5 小时配额）以及 **Windows 桌面端稳定性**（发送按钮失效、聊天记录丢失、MSIX 更新失败等）。PR 方面，TUI 交互体验成为显著重点，多项 PR 围绕鼠标支持、文本选择、布局优化等展开。

---

## 版本发布

过去 24 小时发布了 3 个版本，均为 Rust 运行时迭代：

- **[rust-v0.156.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.11)** — `0.156.0-alpha.11`，常规 alpha 更新
- **[rust-v0.156.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.10)** — `0.156.0-alpha.10`，常规 alpha 更新
- **[rust-v0.156.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.9)** — `0.156.0-alpha.9`，常规 alpha 更新

三个版本的变更详情未随发布说明披露，建议关注 Changelog 获取具体修复内容。

---

## 社区热点 Issues（10 个）

### 1. GPT-6 Astra 两次对话耗尽 Plus 用户 5 小时配额
[#42987](https://github.com/openai/codex/issues/42987) — `[bug, windows-os, rate-limits, CLI]`，评论 25 | 👍 15

> 用户报告 GPT-6 Astra Medium 在约几分钟内两次简短对话即耗尽 ChatGPT Plus 全部 5 小时 Codex 配额。该 Issue 获得大量共鸣，是目前社区最关注的问题之一，反映了 **配额计量与消耗透明度** 方面的迫切诉求。

### 2. Windows Codex Desktop 发送按钮在首次回复后失效
[#45307](https://github.com/openai/codex/issues/45307) — `[bug, windows-os, app]`，评论 14 | 👍 3

> Windows 11 上新建对话首次成功回复后，发送按钮即变为不可用状态。影响 GPT Pro 用户的基础交互流程，属高频复现的桌面端 Bug。

### 3. Linux Debian 13 桌面版启动即崩溃
[#44785](https://github.com/openai/codex/issues/44785) — `[bug, app, Linux]`，评论 13 | 👍 1（已关闭）

> ChatGPT Desktop Linux 包 `26.908.31748` 启动时报告 renderer `TypeError: n is not a function`，应用直接崩溃。该 Issue 已关闭，但社区关注度较高。

### 4. VS Code Remote-SSH 重连后会话被陈旧 app-server 阻塞
[#41849](https://github.com/openai/codex/issues/41849) — `[bug, extension, session, app-server, remote]`，评论 11 | 👍 12

> Remote-SSH 断线/服务器故障后，旧 VS Code Server 与 Codex app-server 残留，导致重连后新会话被提示 "This is open in another app" 而无法继续。远程开发场景下影响显著。

### 5. Codex 移动端间歇性无法打开运行中的任务会话
[#28340](https://github.com/openai/codex/issues/28340) — `[bug, iOS, connectivity, session]`，评论 11 | 👍 14

> iOS 端 Codex 偶发无法恢复正在运行的任务会话，反馈中包含上传的诊断包。跨端会话一致性成为社区持续关注的话题。

### 6. Windows 桌面端现有会话被本地配置加载阻塞
[#44342](https://github.com/openai/codex/issues/44342) — `[bug, windows-os, app, app-server]`，评论 11 | 👍 4

> 在部分 Windows 环境中，打开已有会话会因 `loading-local-config / pending codex-home` 无限挂起；窗口刷新可恢复，但正常重启后可能复发。

### 7. Windows + WSL 下浏览器/计算机使用功能全部不可用
[#34458](https://github.com/openai/codex/issues/34458) — `[bug, windows-os, mcp, tool-calls, app]`，评论 8 | 👍 9

> Windows Desktop + WSL agent 组合下，Browser、Chrome 控制、Computer Use 均因共享 bridge 故障而失败，影响 Windows 用户的高级代理功能。

### 8. OAuth MCP 服务器认证成功但工具未导入
[#20009](https://github.com/openai/codex/issues/20009) — `[bug, auth, mcp]`，评论 7 | 👍 5

> Codex Desktop 完成 OAuth MCP 服务器认证后，线程中无法导入对应工具，`auth_status` 停留在 unsupported。MCP 生态集成体验存在明显短板。

### 9. 安全扫描通过 worker/subagent 并行耗尽周配额
[#46819](https://github.com/openai/codex/issues/46819) — `[bug, model-behavior, rate-limits, app, subagent]`，评论 4 | 👍 0（新）

> 单次 Codex Security 评估在约 44 分钟内通过 worker/subagent 扇出策略耗尽整周配额。**用户未预期安全扫描会如此激进地调用子代理**，配额保护机制引发质疑。

### 10. Review-only 任务被 "Daybreak isn't available for Astra" 打断
[#46869](https://github.com/openai/codex/issues/46869) — `[bug, code-review, app, safety-check]`，评论 4 | 👍 0（新）

> 仅执行代码审查的任务被不透明横幅 "Daybreak isn't available for Astra" 中断，用户无法理解该提示与当前任务的关系，交互可理解性需改善。

---

## 重要 PR 进展（10 个）

### 1. 允许子代理请求 MCP 用户输入
[#46877](https://github.com/openai/codex/pull/46877) — `[CLOSED]`

> 移除了仅 root 代理可请求 MCP elicitation 的限制，子代理现在可以直接请求用户输入。解决了浏览器登录、表单填写、交互式工具审批在子线程中阻塞的问题，对 multi-agent 工作流有实质性改善。

### 2. 保留子代理完成时的流式回答
[#46867](https://github.com/openai/codex/pull/46867) — `[CLOSED]`

> 子代理活动不再立即打断父代理正在流式输出中的答案，而是延迟到主消息完成后再渲染，避免流式输出被意外截断或刷新。

### 3. 新增 `/tui` 命令切换终端 UI 模式
[#46883](https://github.com/openai/codex/pull/46883) — `[CLOSED]`

> 为 TUI 新增 `/tui` 命令，可在 Scrollback 与 Fullscreen 模式间切换，需确认并写入用户配置，重启后生效。增强终端用户对界面模式的控制力。

### 4. `/status` 识别本地后台服务器
[#46905](https://github.com/openai/codex/pull/46905) — `[CLOSED]`

> `/status` 中连接行从 "Remote" 更改为 "Server"，对本地 daemon 显示 "Local background server" 而非 socket 地址，远程连接仍保留地址和版本信息。

### 5. 为完整模式编辑器增加鼠标选择与编辑
[#46858](https://github.com/openai/codex/pull/46858) — `[CLOSED]`

> 完整模式（Fullscreen）编辑器支持点击定位、拖动选择、双击选词、三击选行，并支持鼠标右键复制，同时尊重换行、滚动和原子字素边界。

### 6. 支持简单点击打开转录链接并美化裸 URL
[#46884](https://github.com/openai/codex/pull/46884) — `[CLOSED]`

> 转录中的链接无需修饰键即可点击打开，裸 URL 现在获得与显式 Markdown 链接一致的视觉样式。

### 7. TUI 使用量视图支持鼠标导航
[#46866](https://github.com/openai/codex/pull/46866) — `[CLOSED]`

> usage overlay 支持鼠标：可点击标签页与报表控件，滚轮以三行步长滚动报告正文，并保持有界滚动和键盘等价操作。

### 8. 提取共享文本选择辅助模块
[#46857](https://github.com/openai/codex/pull/46857) — `[CLOSED]`

> 将选择单元、词/逻辑行边界、点击计数与复制键检测等逻辑提取到公共 `text_selection` 模块，统一转录与编辑器的选择行为，并增加 UTF-8 边界钳制。

### 9. 修复活动图表未遵循终端色阶配置
[#46897](https://github.com/openai/codex/pull/46897) — `[CLOSED]`

> 活动图表改用 `effective_stdout_color_level()` 构建，修复 Windows Terminal 在支持 truecolor 时仍获得低色彩回退的问题。

### 10. 流式传输后转录列表间距统一
[#46899](https://github.com/openai/codex/pull/46899) — `[CLOSED]`

> 不再仅对多行条目追加空行，而是基于渲染宽度对完成的列表使用一致间距，使转录视图在流式结束后布局更均匀。

---

## 功能需求趋势

从当前 Issue 与 PR 的分布来看，社区关注方向集中在以下几个维度：

1. **配额与用量透明化/保护机制** — 多条高赞 Issue 指向模型（特别是 GPT-6 Astra）在正常或后台任务中快速消耗配额，用户强烈要求更细粒度的配额计量、预警与保护开关。PR 侧则同步在 TUI 使用量报告中增加了鼠标导航、布局优化与实时刷新，侧面回应了这一诉求。
2. **Windows 桌面端体验修复** — 发送按钮失效、加载阻塞、聊天记录丢失、MSIX 更新失败等占据大量 Issue 数量，Windows 已成为桌面端问题重灾区。
3. **MCP 集成完善** — 认证成功但工具不导入、子代理无法请求用户输入等问题持续被提出，PR #46877 已开始补齐子代理 MCP 交互能力，预计 MCP 仍是接下来重点迭代方向。
4. **TUI 交互体验升级** — 今日 PR 几乎全部围绕 TUI：鼠标选择/导航、复制粘贴、布局统一、颜色修正、快捷键分组等。终端 UI 正在从"可用"迈向"好用"。
5. **沙箱安全性 vs 兼容性平衡** — 受限沙箱破坏 Unix socket 通信（#33793）、Windows 沙箱 ACL 设置失败（#46062）等，提示安全策略需要在功能兼容上做更多精细化处理。

---

## 开发者关注点

- **配额消耗的"意外性"最令人沮丧**：无论是正常对话（#42987）、长轮询任务（#45974）、还是后台扫描（#46819、#46904），开发者在非预期场景下被动耗尽配额，且缺少中途干预手段。"暂停后仍在持续消耗"（#46904，5 小时 2466 轮）是最极端的案例。
- **Windows 平台的高频阻断性问题**：发送按钮失效（#45307）、本地配置加载卡死（#44342）、更新失败（#46622）、CPU 100% 启动占用（#46906）等，直接影响日常使用，且部分问题缺少有效的绕过手段。
- **远程/移动场景的会话可靠性**：VS Code Remote-SSH 断线重连后会话被陈旧进程锁死（#41849）、iOS 端无法打开运行中任务（#28340），跨端/跨设备会话连续性仍是明显短板。
- **"安全防护"误伤正常操作**：多起 Issue（#46869、#46889、#45604）表明安全审查/审批机制在特定场景下会错误阻断用户已授权的操作，且缺少可解释性和便捷解除途径。
- **TUI 终端体验正在成为核心阵地**：大量 PR 集中改善鼠标交互、选择逻辑、布局一致性，说明 Codex 在终端场景下的用户体验投入明显加大，这也符合 CLI 用户的日常高频需求。

---

> 数据来源：github.com/openai/codex ｜ 报告生成时间：2026-09-21

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-21

## 1. 今日速览

昨日社区聚焦于 subagent 稳定性问题：通用型 agent 挂起、MAX_TURNS 被误报为成功、浏览器 agent 在 Wayland 下失败等 P1 级 bug 持续发酵。同时，Auto Memory 记忆系统在安全性和效率方面引发多轮讨论。PR 方面，信号转发防孤儿进程、OAuth 凭据持久化、显式版本模型 ID 保留等修复值得关注。

## 2. 版本发布

**v0.62.0-nightly.20260920.gcfbcaa8df** 昨晚发布，为常规 nightly 更新，具体变更内容未提供详细说明，可查看完整 Changelog：
https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260919.gcfbcaa8df...v0.62.0-nightly.20260920.gcfbcaa8df

## 3. 社区热点 Issues

过去 24 小时内共有 48 条 Issue 更新，以下选取 10 个最受关注或技术价值最高的重点 Issue：

**① Subagent 在 MAX_TURNS 后误报成功 — #22323** ⭐ 13 条评论
`codebase_investigator` 子代理自身结果显示已触发最大轮次限制（未做任何分析），却向主代理返回 `status: "success"` 和 `Termination Reason: "GOAL"`。这会导致主代理基于虚假的"成功"结果做出错误决策，属 P1 级需要重新测试的 bug。
https://github.com/google-gemini/gemini-cli/issues/22323

**② 通用 agent 无限期挂起 — #21409** ⭐ 8 条评论 / 8 👍
用户在 Gemini CLI 委派给 generalist agent 时遭遇永久挂起（等待长达一小时），即使是"创建文件夹"这类简单操作也会触发。社区用户确认"禁止委派 subagent"可绕过此问题，表明问题出在 subagent 调度链路本身。
https://github.com/google-gemini/gemini-cli/issues/21409

**③ Gemini 不主动使用自定义 skills 和 sub-agents — #21968**
用户反馈 Gemini CLI 几乎不会自发调用已配置的自定义 skill（如 gradle、git）和 subagent，只有在显式指令下才使用。这暴露了模型在工具调用主动性上的严重不足，影响 agent 的自动化效率。
https://github.com/google-gemini/gemini-cli/issues/21968

**④ AST 感知文件读写与代码库映射评估 — #22745**
EPIC 级追踪 Issue，探讨通过 AST 感知工具精确定位方法边界、减少误读次数、降低 token 噪声。涉及路径包括 `grep_search`、`read_file`、`codebase_investigator` 等核心工具链的升级改造，是一个影响面较大的方向性议题。
https://github.com/google-gemini/gemini-cli/issues/22745

**⑤ 零依赖 OS 沙箱与执行后意图路由 — #19873**
Gemini 3 模型天然具备 bash 操作能力，此 Issue 提议在不牺牲安全性的前提下，通过零依赖 OS 级沙箱和"执行后意图路由"机制，让模型原生地使用 POSIX 工具链进行代码探索和编辑。当前处于 P2 级别，工程量大。
https://github.com/google-gemini/gemini-cli/issues/19873

**⑥ 浏览器 subagent 在 Wayland 下失败 — #21983**
浏览器 subagent 在 Wayland 环境中无法正常工作，Termination Reason 直接显示为 "GOAL"。该问题影响 Linux 用户的浏览器自动化场景，已进入 need-retesting 流程。
https://github.com/google-gemini/gemini-cli/issues/21983

**⑦ 符号链接的 agent 文件不被识别 — #20079**
用户配置的 `~/.gemini/agents/*.md` 设为 symlink 后无法被识别为可用 agent。对使用 dotfiles 管理配置的开发者影响较大，属于易复现的 P2 bug。
https://github.com/google-gemini/gemini-cli/issues/20079

**⑧ Auto Memory 需确定性脱敏并减少日志 — #26525**
Auto Memory 在将本地转录内容发送给后台提取 agent 之前，并没有先执行脱敏——提示词要求模型脱敏属于事后补救，且服务会记录已有 skill 内容。涉及跨会话数据安全，值得关注。
https://github.com/google-gemini/gemini-cli/issues/26525

**⑨ Auto Memory 无限重试低信号会话 — #26522**
Auto Memory 只在提取 agent 成功通过 `read_file` 读取转录后才将会话标记为"已处理"。若 agent 判断会话低信号而跳过读取，该会话将永远留在索引中被反复检索，导致重复处理。建议对低信号会话引入放弃机制。
https://github.com/google-gemini/gemini-cli/issues/26522

**⑩ 浏览器 agent 会话接管与锁恢复 — #22232**
`BrowserManager.ts` 当前采用 fail-fast 策略，遇到锁定的浏览器 profile（如 persistent 模式下已存在实例或孤儿进程）直接失败。社区建议实现自动会话接管和锁恢复机制，提升浏览器 agent 在 CI 环境中的韧性。
https://github.com/google-gemini/gemini-cli/issues/22232

## 4. 重要 PR 进展

过去 24 小时内有 30 条 PR 更新，以下选取 10 条重要的进行解读：

**① 父进程信号转发，防止孤儿进程 — #29427**（已关闭）
修复 bc6d6：当父进程（bootstrap/relaunch）收到 SIGTERM 等终止信号时，子进程此前会被静默隔离到 PID 1 并继续运行。该 PR 修复两条 spawn 路径的信号转发问题。虽已关闭，但解决的是一个重要的进程生命周期隐患。
https://github.com/google-gemini/gemini-cli/pull/29427

**② 保留显式版本化模型 ID — #29422**（P2, size/m）
不再将 `gemini-3-pro-preview`、`gemini-2.5-flash` 等显式版本号在滚动升级中静默重映射，保证 `--model` 参数精确定位。修复了 Vertex AI 上 3.5 Flash 不可访问的问题，对生产环境用户很重要。
https://github.com/google-gemini/gemini-cli/pull/29422

**③ 登录后立即持久化 OAuth 凭据 — #29282**（P2, area/security）
此前 OAuth 凭据仅在特定时机写入，导致 CLI 重启后重复要求 Google 登录。此 PR 在浏览器或用户代码登录成功后立即持久化凭据，提升登录体验。
https://github.com/google-gemini/gemini-cli/pull/29282

**④ 跳过无效 TOML 策略规则 — #29431**
修复两项问题：空工具名导致 `PolicyEngine` 启动崩溃；shell 命令字段冲突被报错但仍强制执行。现在无效规则会在转换前被标记并跳过，提升策略配置的容错性。
https://github.com/google-gemini/gemini-cli/pull/29431

**⑤ 在沙箱中持久化文件夹信任决策 — #29423**（size/l）
在 podman/docker 沙箱中运行时，`trustedFolders.json` 此前无法写入宿主机，导致每次启动 CLI 都要重新确认信任弹窗。此 PR 将首次信任决策在进入沙箱前于宿主机完成处理。
https://github.com/google-gemini/gemini-cli/pull/29423

**⑥ 修复 DevTools HTTP 响应分块解码 — #29375**（P2, size/m）
`ActivityLogger.patchNodeHttp()` 此前对每个 HTTP data chunk 独立执行 `toString('utf8')`，当多字节字符被分割在不同 chunk 时会产生乱码。改为有状态解码器，解决 streaming 事件中的字符损坏。
https://github.com/google-gemini/gemini-cli/pull/29375

**⑦ 会话调度器释放时正确拒绝排队的工具调用 — #29432**
修复调度器销毁后，排队中的工具批次未及时拒绝、仍可能执行的问题。现在通过现有 rejection 包装完整排空请求队列，防止资源泄露和回调悬挂。
https://github.com/google-gemini/gemini-cli/pull/29432

**⑧ 新增 `gemini models list` 子命令 — #29404**（P3, size/l)
提供 `gemini models list -o json` 输出可用模型列表，使外部集成工具无需硬编码模型 ID，也无需解析交互式 `/model` 对话框。
https://github.com/google-gemini/gemini-cli/pull/29404

**⑨ 避免嵌套输入历史状态更新 — #29342**（P2, size/m）
重构 `useInputHistoryStore`，新增历史记录不再触发嵌套 React state 更新，规避 StrictMode 双重调用问题，并保持原有排序和去重行为。
https://github.com/google-gemini/gemini-cli/pull/29342

**⑩ 截断时避免拆分 UTF-16 代理对 — #29304**（size/s）
修复 `sanitizeForDisplay` 在截断边界落在 emoji 等多字节字符中间时产生未配对代理项的问题，避免渲染时静默丢失字符。
https://github.com/google-gemini/gemini-cli/pull/29304

## 5. 功能需求趋势

综合分析所有 Issues 和 PRs，社区最关注的功能方向集中在以下领域：

- **Subagent 运行稳定性与行为可靠性**：通用 agent 挂起、MAX_TURNS 误报成功、不主动使用 skills/subagents 等多个 P1/P2 bug 集中出现；讨论也从"增加功能"转移到了"如何让 subagent 更可预测、可观测"（如 #22598 subagent 轨迹共享）。
- **Auto Memory 记忆系统的安全性与效率**：连续多个 Issue（#26525、#26522、#26523、#26516）围绕记忆系统的脱敏时机、低信号会话重试、无效 patch 隔离展开，显示记忆功能已在真实用户场景中暴露问题。
- **浏览器 agent 的跨平台与韧性**：Wayland 失败（#21983）、锁定 profile 恢复（#22232）、settings.json 覆盖不生效（#22267）等，说明浏览器自动化的平台适配和生产环境可用性仍需打磨。
- **AST 感知的代码导航**：两个相关 Issue（#22745、#22746）探讨利用 AST 实现精准方法级读取和代码库映射，以降低 token 消耗和读取噪音，代表了工具链智能化的下一阶段。
- **安全与配置管理**：零依赖 OS 沙箱执行（#19873）、确定性脱敏（#26525）、TOML 策略容错（#29431）等，强调在 agent 自动化能力增强的同时必须保证安全边界。
- **模型与后端集成**：显式版本化模型 ID 保留（#29422）、OAuth 凭据持久化（#29282）、配额信息透出（#29429）等，都是企业与生产环境落地的关键能力。

## 6. 开发者关注点

从用户反馈中提炼出的高频痛点和需求如下：

- **Subagent 行为不够可控**：不做任何分析却谎报"GOAL"成功（#22323）；遇到小任务便无限挂起（#21409）；不按用户配置调用 skills（#21968）。这几个问题相互关联，开发者普遍期望更透明的 agent 内部状态和更强的行为约束能力。
- **配置文件与覆盖机制不生效**：浏览器 agent 忽略 `settings.json`（#22267）、symlink 不被识别为 agent（#20079）、`/compress` 在会话恢复后失效（#21335）——配置系统的行为一致性令人失望。
- **Auto Memory 引发隐私与实际效率顾虑**：敏感内容在脱敏前就已进入模型上下文（#26525）；低信号会话被无限重试（#26522）；无效补丁被静默跳过（#26523）。开发者对记忆系统的信任度受到挑战。
- **多工具数量导致 400 错误**：超过约 128~400 个工具时 API 返回 400 错误（#24246），说明工具编排的规模上限需要更聪明的作用域管理，而非简单堆叠。
- **终端与交互体验细节**：终端 resize 闪烁和高性能要求（#21924）、`\n` 转义处理错误（#22466）、vite 等交互式命令卡住（#22465）、`get-shit-done` 输出钩子崩溃（#22186）等问题显示交互层仍存在不少细节缺陷。

---

*数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) GitHub 仓库*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期：2026-09-21**


## 今日速览

官方紧急发布 v1.38.11 修复版本，针对 v1.38.10 引发的会话历史混乱、Windows 凭据/Shell 问题等进行了集中修复。但社区对 v1.38.10 的批评仍在发酵，数据丢失类 issue 获大量共鸣，用户对版本质量控制表达了强烈不满。


## 版本发布

### v1.38.11（稳定版 · CLI 与 Desktop 同步更新）

此版本提升了**会话迁移、接管与导出的可靠性**，修复了 **Windows 凭据与 Shell 问题**，并完善了**图片附件在提交、历史记录与导出中的处理**。这是针对 v1.38.10 系列问题的快速跟进修复。

- [完整更新日志](https://reasonix.io/changelog/v1.38.11/) · [English Changelog](https://reasonix.io/changelog/v1.38.11/?lang=en)


## 社区热点 Issues

过去 24 小时内共更新 11 条 Issue，以下为最值得关注的 10 条：

1. **[数据丢失] 升级 v1.38.10 后所有会话历史全乱** — @Sicarmon
   用户从 v1.38.3 升级到 v1.38.10 后，数十个项目下的会话时间、命名、顺序全部错乱，新会话也无法使用。作者强烈抗议"未经验证的 PR 被合并"，获 14 条评论与 3 个 👍，是当前社区情绪最激烈的 Issue。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10527)

2. **[崩溃] 1.38.10 在 macOS 上已无法打开** — @Pingxh
   应用启动即闪退，10 条评论跟进，影响范围较大。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10556)

3. **[严重 BUG] 历史任务无法打断，重启后仍继续执行** — @xgh5188
   用户报告 1.38.10 中停止任务完全失效，重启后 Agent 继续消耗 token。作者直言"准备切其他的用了"。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10565)

4. **[状态异常] 强行停止任务后出现"连接中断/状态待同步"** — @xgh5188
   同一用户的另一报告：强行停止 Agent 后应用进入不可恢复状态。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10563)

5. **[配置] Windows 下配置文件无法读取或写入** — @sukiyou-seven
   使用过程中突然无法读写配置、无法配置 key 或删除接入，用户无从自行修复。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10541)

6. **[凭据] 关闭后无法读取凭据存储** — @linmour
   Windows 11 下频繁出现凭据读取失败，需手动修改文件权限才能恢复。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10583)

7. **[数据丢失] 遗留会话导入破坏非 ASCII（CJK）Windows 路径** — @air041001
   自动更新到 v1.38.10 后，含中文路径的遗留会话导入异常，会话从全局工作区消失。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10588)

8. **[性能] 内存暴涨** — @123zkw-bu
   多次采样显示 App 进程内存持续高位，疑似存在内存泄漏。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10581)

9. **[功能] Linux 下会话无法删除** — @suanfalalala
   Linux Mint 22.3 上删除会话后，原位置会自动生成新会话。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/10582)

10. **[经验分享] 压缩/上下文管理实战经验与修复参考** — @clearnature
    虽是已关闭的分享帖（更新于 9/20），社区仍持续关注。内容详实记录了压缩触发估算偏差（高估 2.2 倍导致一晚 24 次误触发）、修复方案等，对 1M 窗口用户极具参考价值。
    [链接](https://github.com/esengine/DeepSeek-Reasonix/issues/8839)


## 重要 PR 进展

过去 24 小时内共更新 50 条 PR，以下为值得关注的 10 条：

1. **#10603 降低历史会话与多会话资源占用**（OPEN）— @SivanCola
   针对历史目录和多会话场景下重复解码 workspace registry、重建列表、重渲染 transcript 等问题，减少切换时的重复计算。这是社区期待已久的性能优化。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10603)

2. **#10590 修复任务完成后工具结果重复显示**（已关闭）— @SivanCola
   保留工具结果的规范身份、历史位置与执行元数据，构建有界窗口关联，解决重复投影问题。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10590)

3. **#10598 修复压缩生命周期、取消与恢复**（已关闭）— @SivanCola
   手动压缩改为可取消的会话维护生命周期；停止操作保留已接受的收件箱消息，恢复需安全持久化完成。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10598)

4. **#10599 延迟会话加载提示以避免切换闪屏**（已关闭）— @SivanCola
   将加载反馈延迟 250ms，快速切换会话时不再闪烁加载界面，提升交互流畅度。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10599)

5. **#10596 统一内置 HTML 预览与响应式工作区交付**（已关闭）— @SivanCola
   修复 Agent 交付的 HTML 因打开方式不同而行为不一致的问题，统一预览、分割操作与代码块处理。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10596)

6. **#10602 发布流程：前置契约检查与官网独立恢复**（已关闭）— @SivanCola
   发布前预检 candidate/resolver/archive/tag/ledger 契约，并为官网部署失败提供独立恢复路径。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10602)

7. **#10601 发布流程：审批前校验标签发布身份**（已关闭）— @SivanCola
   要求显式维护者凭据（`RELEASE_TAG_TOKEN`）与预期登录名，审批前检查仓库访问与继承规则，避免 Actions 身份被标签创建规则拒绝。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10601)

8. **#10431 检测无意义重复循环并在提示后重试一次**（OPEN）— @BuGlessRB
   针对模型卡在重复输出同一段文本而不调用工具的情况（perseveration loop），现有守卫只看工具轮次或静默，聊天式循环会烧光输出预算。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10431)

9. **#10344 新增按供应商配置的 stream_idle_timeout_seconds**（OPEN）— @BuGlessRB
   允许为每个模型供应商设置独立的流空闲超时时间，未设置时保持 300s 默认值。
   [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10344)

10. **#10297 尊重 [sandbox].bash="off" 配置并跳过 bwrap 探测**（OPEN）— @BuGlessRB
    修复设置 bash=off 后仍强制 enforce 沙箱模式、bubblewrap 探测照常运行的问题。
    [链接](https://github.com/esengine/DeepSeek-Reasonix/pull/10297)


## 功能需求趋势

从过去 24 小时的 Issues 与 PR 来看，社区关注方向集中在以下五个方面：

1. **稳定性与数据安全（最高优先级）**：v1.38.10 引发的会话历史混乱、数据丢失、启动崩溃成为绝对焦点，大量 PR 也在集中修复 Agent 生命周期与持久化可靠性。
2. **Windows 平台体验**：凭据存储读取失败、配置文件权限、CJK 路径导入损坏、Shell 相关问题反复出现，Windows 为当前问题重灾区。
3. **会话管理可靠性**：会话迁移/导入/导出、删除后自动重生、会话顺序与重命名保持，是高频反馈方向。
4. **Agent 任务可控性**：任务打断失效、停止后状态异常、权限切换导致中断，暴露 Agent 生命周期管理的不足，开发者需要更强的任务控制能力。
5. **性能优化**：内存暴涨、多会话资源占用过高等问题持续被关注，PR #10603 是社区期待已久的优化方向。


## 开发者关注点

- **版本升级信任危机**：多个用户在 issue 中明确表示"切记不要升级""准备切其他的用了"，v1.38.10 的回归问题已严重影响社区信任度。
- **PR 合并质量遭质疑**：#10527 作者强烈抗议"不要合并未经认真验证过的 PR"，开发者希望维护者加强测试覆盖与回归验证。
- **会话元数据是用户资产**：会话的命名、时间、顺序对用户而言是重要工作资产，单纯"会话内容正常"无法缓解混乱带来的愤怒。
- **配置与凭据问题需要可诊断性**：Windows 下配置文件和凭据存储的权限问题让用户无从下手，需要更清晰的错误提示与修复指引。
- **Agent 执行需更强控制力**：用户期望在执行任务过程中拥有暂停、恢复、切换权限等精细控制能力，同时避免意外中断和 token 浪费。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报（2026-09-21）

## 今日速览

v2.0.11 后台服务在 Linux x64 上一天内发生 9 次 SIGSEGV 崩溃，成为当前最突出的稳定性问题（#50246）；ACP 自 v2.0.4 起的配置加载回归持续发酵，自定义 provider、agent 与默认模型在 session/new 目录中缺失（#50236、#49630）；此外，多枚贡献者 PR 因 `needs:issue` 工作流问题被自动关闭，社区贡献流程引发关注。

## 社区热点 Issues

1. **[#50246] server: v2.0.11 background service segfaults repeatedly (SIGSEGV, Linux x64)**  
   后台服务进程在 2026-09-20 一天内崩溃 9 次，每次产生 240–380 MB 核心转储文件，客户端虽能自动重启但用户体验受损。涉及崩溃机制与核心转储治理，属高频稳定性问题。  
   https://github.com/anomalyco/opencode/issues/50246

2. **[#50236] acp: session/new catalog ignores config providers, agents, and default model since 2.0.4**  
   `opencode acp` 自 v2.0.4 起不再加载用户配置，导致 Zed 等 ACP 客户端只能看到内置模型，Ollama 等自定义 provider 完全不可用，影响大量本地模型用户。  
   https://github.com/anomalyco/opencode/issues/50236

3. **[#50250] Session idles silently when a turn ends with `stop` and no model output**  
   Provider 以干净 `stop` 结束且输出 0 token 时，会话静默空闲，TUI 无任何提示。用户无从判断是正常结束还是异常，是交互反馈上的关键缺口。  
   https://github.com/anomalyco/opencode/issues/50250

4. **[#50234] Permission prompts don't say what is being approved**  
   批准外部目录访问时，弹窗只显示目录路径，不说明将执行的具体命令或文件操作，用户只能盲批或拒绝，涉及安全体验与权限透明度。  
   https://github.com/anomalyco/opencode/issues/50234

5. **[#50241] [2.0] plan: plan-mode guard denies writes to configured plan directory (~/.opencode/plan)**  
   Plan 模式下，AI 无法向显式配置的计划目录写入文件，守卫误判目标路径“位于计划目录之外”，导致 Plan 功能在独立目录配置下不可用。  
   https://github.com/anomalyco/opencode/issues/50241

6. **[#50247] GitHub action: pull_request_review (review body) is not a supported trigger event**  
   在 PR Review body 中触发 `/oc` 的自动化工作流无法运行，action 不支持 `pull_request_review` 事件，对依赖 Review 流程的团队影响明显。  
   https://github.com/anomalyco/opencode/issues/50247

7. **[#49630] acp: custom providers fail to load due to SchemaError(Missing key at ["path"]) on event subscription**  
   v2.0.6/2.0.7 中 `opencode acp` 内部事件订阅器崩溃，配置在 `opencode.jsonc` 中的自定义 provider 无法合并进 ACP 会话，供应商接入受阻。  
   https://github.com/anomalyco/opencode/issues/49630

8. **[#50237] provider: openai-compatible endpoint rejects multi-dot tool names**  
   工具名如 `browser.tabs.open`（含多个点）会使 openai-compatible 端点的每次调用失败，`Failed to drain Session` 持续触发，浏览器工具目录无法使用。  
   https://github.com/anomalyco/opencode/issues/50237

9. **[#50179] Error from provider (Console)**  
   Console 提供商返回 `reasoning encrypted_content was not issued to this caller`，桌面客户端用户无法正常完成请求，涉及鉴权与加密内容分发机制。  
   https://github.com/anomalyco/opencode/issues/50179

10. **[#41232] opencode completion fish emits bash/zsh script, not fish syntax**  
    一个长期未修复的 shell 补全缺陷：`opencode completion fish` 实际输出 bash/zsh 模板，fish 用户 source 后直接报错。该 issue 自 8 月创建仍在开放，社区关注度稳定。  
    https://github.com/anomalyco/opencode/issues/41232

---

此外 #50242 指出 v1.18.31 中不存在文档所述的 `scout` 内置子代理，文档与实现脱节也值得注意：https://github.com/anomalyco/opencode/issues/50242

## 重要 PR 进展

1. **[#49560] fix(tui): allow custom destination path in move session**  
   允许 `/move` 命令指定任意目标路径，不再局限于当前项目的 worktree，解决多个相关 issue（#49212、#40200、#43938、#35306），属于 TUI 实用增强。  
   https://github.com/anomalyco/opencode/pull/49560

2. **[#50251] fix(session): surface turns that end with no model output**  
   当 provider 以 clean `stop` + 0 输出 token 结束时，在界面上给出明确反馈而非静默空闲，直接对应 #50250。这是一个 9 月 20 日新提交的修复。  
   https://github.com/anomalyco/opencode/pull/50251

3. **[#50106] fix(core): stop republishing summary diffs into durable event snapshots**  
   修复摘要差异被重复写入持久化事件快照的问题，减少事件存储膨胀，关联 #48641、#46833，为长期存储健康提供改进。  
   https://github.com/anomalyco/opencode/pull/50106

4. **[#50239] fix(tui): show the command in external_directory permission prompts**  
   外部目录权限弹窗增加将要执行的命令信息，提升权限审批透明性，直接回应 #50234。  
   https://github.com/anomalyco/opencode/pull/50239

5. **[#46495] fix(core): match absolute permission rules for relative paths**  
   让绝对权限规则正确匹配相对路径的解析身份，并修复 Plan 全局目录位于活动 Location 内时的写入问题，与 #50241 密切相关。  
   https://github.com/anomalyco/opencode/pull/46495

6. **[#47486] fix(opencode): run live metadata updates from plugin tools**  
   修复 `ToolContext.metadata()` 在插件桥接中因 Effect 类型不匹配而无法完成实时元数据更新的问题，保证插件工具元数据准确。  
   https://github.com/anomalyco/opencode/pull/47486

7. **[#50252] fix(util): expose npm installation failure details**  
   将 npm 安装失败的底层错误信息透出，解决 #50080 中“空错误”的问题，降低环境配置类问题的排查成本。  
   https://github.com/anomalyco/opencode/pull/50252

8. **[#50249] fix(app): show OAuth provider connection badges**  
   为已连接的 OAuth provider 在应用中显示连接状态徽章，提升账户/Provider 管理的可视性。  
   https://github.com/anomalyco/opencode/pull/50249

9. **[#50248] fix(cli): keep mini session waits alive**  
   修复 CLI mini 会话在等待期间被提前终止的问题，改善命令行轻量交互的稳定性，关联 #50135。  
   https://github.com/anomalyco/opencode/pull/50248

10. **[#50240] fix(cli): report fatal startup causes on stderr**  
    将致命启动原因输出到 stderr，使 `opencode serve --service` 的失败原因能被桌面客户端等下游进程正确捕获，目前该 PR 已关闭但补丁保留在分支上。  
    https://github.com/anomalyco/opencode/pull/50240

---

另有多枚早期功能型 PR（如 #43713 按模型压缩配置、#43708 服务端响应压缩、#43704 保留模型 ID 斜杠）于今日被 `automated-pr-cleanup` 批量关闭，代码未合并但功能方向仍具参考价值。

## 功能需求趋势

- **ACP 配置一致性回归修复**：多个 issue（#49630、#50236）指向 `opencode acp` 在 2.0.x 版本中的配置加载回归，自定义 provider、agent 与默认模型无法进入 ACP 会话目录。这直接冲击 Zed 等 ACP 客户端的本地模型使用场景，是当前最集中的功能诉求。
- **权限系统透明化与规则修正**：社区既要求权限提示展示具体命令（#50234、#50239），也在修正权限规则匹配逻辑（#46495），尤其是 Plan 模式写计划目录失败（#50241）。权限模块正经历“提示增强 + 规则修正”双线改进。
- **Provider 与协议兼容性**：Console provider 的鉴权错误（#50179）、openai-compatible 端点多点工具名失败（#50237）以及被清理的“Zen 网关流转换”类修复，说明 provider 兼容性仍是高频维护区域。
- **Session 生命周期语义完善**：“无输出但正常结束”的会话需要显式反馈（#50250、#50251），Mini 会话等待保持活跃（#50248），说明会话状态机仍在补齐边界交互。
- **自动化与 CI 集成扩展**：用户希望 GitHub Action 支持 PR review body 触发（#50247），并改善 npm 安装失败的可见性（#50252），自动化集成的体验细节正被持续打磨。
- **文档准确性与 shell 体验**：文档声称的 `scout` 子代理在稳定版中不存在（#50242），fish 补全输出错误语法（#41232），反映文档与发行版同步、多 shell 支持仍是遗留短板。

## 开发者关注点

- **后台服务稳定性亟待解决**：一天 9 次 SIGSEGV（#50246）是当前最高优先级反馈。核心转储文件体积庞大（单次 240–380 MB），社区期待尽快定位崩溃根因并限制转储频率。
- **权限提示不可读，安全与效率冲突**：外部目录授权弹窗不显示命令内容（#50234），开发者被迫在“盲批”和“拒绝但阻塞任务”之间做选择，合理的做法是弹窗内展示完整命令与目标路径。
- **ACP 配置加载回归影响本地模型工作流**：自 v2.0.4 后自定义 provider 无法通过 ACP 使用（#50236），对依赖 Ollama 等本地模型的开发者是实质性功能回退，期望尽快恢复配置继承。
- **PR 自动清理流程挫伤贡献者积极性**：多枚 PR（#50245、#50244、#50243 等）以 `needs:issue` 为由被标记、关闭或撤回，贡献者反复遇到“关联 issue 已被分配”的撞车情况，且 default-branch 检查缺少 body 引用回退（#43964），社区的贡献链路体验需要优化。
- **错误信息可观测性不足**：服务启动失败原因仅写 stdout（#50240）导致下游进程无法感知，npm 安装失败错误信息为空（#50252），均为排查问题时的常见痛点。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

好的，这是 2026 年 9 月 21 日的 Hermes 社区动态日报。

---

# Hermes 社区动态日报 — 2026-09-21

## 1. 今日速览

今日社区主要围绕**稳定性修复**展开：多个由社区提交的 bug 修复 PR 被合并或处于待审核状态，重点解决了速率限制冷却逻辑、Bot 模式配置隔离以及插件系统污染环境等关键问题。此外，模型供应商目录、多语言支持和跨平台支持也迎来了新进展，体现了社区在生态扩展上的活跃度。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 社区热点 Issues

以下为过去 24 小时内更新/创建的重点 Issue，涵盖运行时错误、配置管理和契约一致性问题：

1.  **Bot 模式将删除标记目录列为队友 Agent**
    - **Issue:** [#116905](https://github.com/NousResearch/hermes-agent/issues/116905)
    - **重要性:** 高。执行 `profile delete` 后，残留的 `.deleted` 目录会被 `_roster()` 识别为有效队友，导致 Bot 模式出现幽灵代理，影响会话路由与交互。
    - **社区反应:** 已关闭。由 PR [#117570](https://github.com/NousResearch/hermes-agent/pull/117570) 修复，该 PR 确保只有符合 ID 规则的目录才会被识别。

2.  **Desktop Bot 聊天中 GPT-Live 语音会话未使用 Bot 自身配置的语音**
    - **Issue:** [#117401](https://github.com/NousResearch/hermes-agent/issues/117401)
    - **重要性:** 中。GPT-Live 会话未遵循 Bot 所有者的配置，导致在多 Profile 场景下语音回复使用错误的声音。
    - **社区反应:** 已关闭。修复方案在 PR [#117636](https://github.com/NousResearch/hermes-agent/pull/117636) 中落地，通过为语音会话引入 `OwnerScope` 来确保正确路由。

3.  **DeepSeek 模型选择器展示已退役模型 ID**
    - **Issue:** [#117516](https://github.com/NousResearch/hermes-agent/issues/117516)
    - **重要性:** 中。选择器仍展示 DeepSeek 已退役的模型 ID，且未正确标注当前 V4.1 Flash 的版本号，可能导致用户误选无效模型。
    - **社区反应:** 开放中。该问题直接影响用户体验和模型调用成功率，社区正在等待修复。

4.  **`--ignore-existing` 标志无法阻止本地后端启动**
    - **Issue:** [#117682](https://github.com/NousResearch/hermes-agent/issues/117682)
    - **重要性:** 高。对于仅作为远程网关客户端的 Desktop 用户，该标志失效意味着每次启动都会拉起本地后端，违背了用户预期并造成资源浪费。
    - **社区反应:** 开放中。有多个相关 PR (如 [#117704](https://github.com/NousResearch/hermes-agent/pull/117704)、[#117705](https://github.com/NousResearch/hermes-agent/pull/117705)) 针对此问题，核心在于后端解析顺序的错误。

5.  **速率限制冷却时间错误使用指数退避而非 Provider 的重置时间**
    - **Issue:** [#117484](https://github.com/NousResearch/hermes-agent/issues/117484)
    - **重要性:** 中。当 429 错误发生时，系统未利用已解析的 `Retry-After` 等重置信息，而是采用指数猜测等待，导致不必要的长时间等待或过早重试。
    - **社区反应:** 已关闭。由 PR [#117604](https://github.com/NousResearch/hermes-agent/pull/117604) 修复，现冷却逻辑优先遵循 Provider 给出的重置窗口。

6.  **`profiles.list` 违反自身结果契约**
    - **Issue:** [#117696](https://github.com/NousResearch/hermes-agent/issues/117696)
    - **重要性:** 中。接口返回了未在 `ProfileRow` 模型中声明的 `previous_names` 字段，导致每次调用产生警告，在高测试隔离模式下会直接抛错。
    - **社区反应:** 开放中。PR [#117700](https://github.com/NousResearch/hermes-agent/pull/117700) 已提出修复方案，旨在对齐声明与实际返回的字段。

7.  **平台适配器在导入时将仓库根目录插入 `sys.path`**
    - **Issue:** [#117698](https://github.com/NousResearch/hermes-agent/issues/117698)
    - **重要性:** 高。这是一个系统级 bug，会导致仓库内的模块意外遮蔽 `site-packages` 中的已安装依赖，可能引发难以排查的运行时错误。
    - **社区反应:** 开放中。PR [#117699](https://github.com/NousResearch/hermes-agent/pull/117699) 正在修复此问题，核心是移除无条件的 `sys.path` 插入操作。

8.  **多路复用 Dashboard 未加载 Profile 本地插件**
    - **Issue:** [#117703](https://github.com/NousResearch/hermes-agent/issues/117703)
    - **重要性:** 中。当 Dashboard 路由到特定 Profile 时，无法发现该 Profile 下 `plugins/` 目录中的工具集，导致功能缺失。
    - **社区反应:** 开放中。该问题涉及 Profile 隔离与插件发现机制，需要调整 Dashboard 进程的资源发现路径。

## 4. 重要 PR 进展

以下为近期值得关注的 Pull Request，涵盖 Bug 修复、新功能与重构：

1.  **修复：速率限制冷却遵循 Provider 重置窗口**
    - **PR:** [#117604](https://github.com/NousResearch/hermes-agent/pull/117604)
    - **要点:** 修复 #117484。冷却时间现在优先使用 Provider 返回的 `Retry-After` / `resets_at` 等时间，而不是依靠指数退避猜测。

2.  **修复：Bot 模式不再将非 Profile 目录列为队友**
    - **PR:** [#117570](https://github.com/NousResearch/hermes-agent/pull/117570)
    - **要点:** 修复 #116905。为 `_roster()` 增加了与 Profile ID 相同的规则校验，过滤掉 `_backup_removed_*` 等非有效目录。

3.  **新功能：添加 `hermes-oc-free-provider` 至目录**
    - **PR:** [#117695](https://github.com/NousResearch/hermes-agent/pull/117695)
    - **要点:** 在社区模型提供商目录中新增 v0.2.1 版本，并详细记录了 OpenCode 与 Hermes 的双向工具与历史翻译机制。

4.  **修复：`hermes doctor` 在存在未解决问题时返回非零退出码**
    - **PR:** [#117708](https://github.com/NousResearch/hermes-agent/pull/117708)
    - **要点:** 解决 #117276。该改动对 CI/CD 或健康检查场景至关重要，确保问题能被及时发现，而不是永远显示成功。

5.  **修复：Desktop GPT-Live 使用 Bot 自身的 Profile 语音**
    - **PR:** [#117636](https://github.com/NousResearch/hermes-agent/pull/117636)
    - **要点:** 修复 #117401。为 `VoiceLiveSession` 增加 `OwnerScope`，确保会话正确绑定到 Bot 所有者的连接与配置。

6.  **修复：Gateway 行为环境变量按服务 Profile 解析**
    - **PR:** [#117593](https://github.com/NousResearch/hermes-agent/pull/117593)
    - **要点:** 修复多路复用下的配置泄露问题。行为相关的环境变量（如 `HERMES_TOOL_PROGRESS_MODE`）现在会按 Profile 的 Secret 作用域解析，而非读取进程级环境变量。

7.  **修复：插件系统停止将仓库根目录插入 `sys.path`**
    - **PR:** [#117699](https://github.com/NousResearch/hermes-agent/pull/117699)
    - **要点:** 修复 #117698。移除了平台适配器与核心模块中的 `sys.path.insert(0, checkout_root)` 操作，消除对 `site-packages` 的遮蔽风险。

8.  **修复：声明 Profile 重命名历史以符合契约**
    - **PR:** [#117700](https://github.com/NousResearch/hermes-agent/pull/117700)
    - **要点:** 修复 #117696。在 `ProfileRow` 结果模型中声明 `previous_names` 字段，使其与 Handler 实际输出一致，消除契约验证警告。

9.  **修复：`--ignore-existing` 跳过所有本地运行时**
    - **PR:** [#117705](https://github.com/NousResearch/hermes-agent/pull/117705)
    - **要点:** 修复 #117682。该改动扩展了 `HERMES_DESKTOP_IGNORE_EXISTING` 的检查范围，使其在解析过程中跳过所有已发现的本地运行时，而非仅仅 PATH 上的那个。

10. **重构：`cli.py` 分解以降低模块复杂度**
    - **PR:** [#117688](https://github.com/NousResearch/hermes-agent/pull/117688)
    - **要点:** 完成 #116911。将 `cli.py` 从 3,959 行拆分为 1,820 行，辅助函数被迁移至六个主题化的 `cli_*.py` 兄弟模块中，且不包含行为变更。

## 5. 功能需求趋势

从近期的 PR 与问题反馈中，可以提炼出社区关注的几个功能方向：

- **生态互操作性增强:** 社区正积极为插件目录（Plugin Catalog）贡献新成员，如 `hermes-oc-free-provider` (#117695) 与 Orbit Desktop (#117697)，显示出将 Hermes 与其他工具链（如 OpenCode、浏览器工作区）打通的需求。
- **跨平台与本地化支持:** 多个 PR 反映了对更广泛平台和语言的需求。例如，`claude-subscription-directsdk` 正扩展至 Windows (#117701)，并新增了完整的土耳其语本地化支持 (#117706)。
- **Web 化访问:** PR #93508 试图将完整的 Desktop 渲染器服务到浏览器中，而非仅限本地应用。这表明社区对于通过浏览器访问完整 Hermes 工作区的需求长期存在且未被满足。
- **配置与状态共享:** 针对模型选择器 (#117707) 的改进提议，反映出用户希望模型可见性配置能跨 UI 表面（TUI、Web、多客户端）同步，而非仅存储在单一 Desktop 的 `localStorage` 中。
- **代码健康度与可维护性:** 开发者正在积极推动核心模块的代码重构 (#117688)，并修复 `contract` 校验等潜在问题，体现出对代码质量与稳定性的重视。

## 6. 开发者关注点

综合以上 Issue 和 PR，开发者在实际使用中可能遇到以下痛点：

- **配置解析优先级混乱:** 多个 Issue 指向了配置解析顺序问题。从 `--ignore-existing` 标志失效 (#117682) 到 Gateway 行为环境变量错误继承 (#117593)，开发者难以预测本地与远程配置的生效规则。
- **多 Profile 隔离不彻底:** 无论是 `.deleted` 目录被误识别 (#116905)、Profile 本地插件未加载 (#117703)，还是 GPT-Live 语音未按 Profile 区分 (#117401)，都显示出多 Profile 场景下的资源与配置隔离仍是薄弱环节，容易造成上下文串扰。
- **环境变量与路径污染:** 插件或适配器在导入时修改 `sys.path` (#117698) 是一个非常隐蔽但危害巨大的问题，它会破坏 Python 环境的可预测性，导致“在我机器上能跑”的经典难题。
- **模型信息更新滞后:** DeepSeek 模型列表展示过时信息 (#117516) 反映出一个普遍需求——模型选择器需要更主动地同步上游提供商的模型变更，避免用户选择到无效或已退役的模型。
- **自动化场景的可靠性:** `hermes doctor` 退出码不正确 (#117708) 和速率限制冷却逻辑不准确 (#117484) 直接影响了 CI/CD 管道和自动化运维的可靠性，开发者在构建自动化流程时需额外关注这些“隐藏”的失败模式。

:::
