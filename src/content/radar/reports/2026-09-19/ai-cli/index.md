---
title: "AI CLI 工具社区动态日报"
published: 2026-09-19
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-19

> 生成时间: 2026-09-19 00:00 UTC | 覆盖工具: 7 个

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

## AI CLI 工具横向对比分析报告（2026-09-19）

> 本报告基于当日 Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenCode、DeepSeek Harness、Hermes 等工具的社区动态摘要生成。所有数据均来自公开 GitHub 信息整理。

---

### 1. 生态全景

当前 AI CLI 工具已进入“多强并立”的高速迭代期。主流工具均在持续释放新版本（Claude Code v2.1.277、Codex rust-v0.155.1、Gemini CLI v0.62.0-nightly、Reasonix v1.38.10），功能重心集中在代理/网关兼容性、会话可靠性、Agent 自治性与安全边界。但多个工具同时暴露出平台兼容性（尤其是 Windows）、数据迁移和发布质量方面的明显短板，社区用户的信任成本正在上升。整体来看，工具功能差异度正在缩小，**稳定性、安全性和生态完整性**成为下一阶段竞争焦点。

---

### 2. 各工具活跃度对比

| 工具 | 重点 Issues 数* | 重点 PR 数* | 最新 Release | 备注 |
|------|----------------|-------------|--------------|------|
| **Claude Code** | 10 | 7 | v2.1.277 | 新增 AGENTS.md 支持，修复代理 400 回归 |
| **OpenAI Codex** | 10 | 10 | rust-v0.155.1 | 另有 0.156.0-alpha.1~4 在推进 |
| **Gemini CLI** | 10 | 10 | v0.62.0-nightly.20260918 | 多个重量级 PR 集中于 Agent 核心机制 |
| **DeepSeek Reasonix** | 10 | 10 | v1.38.10 | 升级后出现大规模会话数据问题 |
| **OpenCode** | 10 | 10 | 1.3.17（提及） | 免费层错误集中爆发，桌面端性能优化 PR 批量合入 |
| **DeepSeek Harness** | 0 | 0 | 无活动 | 过去 24 小时无动态 |
| **Hermes** | 10 | 10 | 未发布新版本 | 多个 P1/P2 修复 PR 已提交，集中于消息交付与 MCP 生命周期 |

*注：此处为各工具日报中“重点列举”的 Issue/PR 数量，非社区全量数据，用于横向对比当日讨论热度。

**活跃度小结**  
- **开源/商业并进**：Codex、OpenCode、Gemini CLI、Hermes 均保持高 PR 产出，Reasonix 虽 PR 多但以修复为主。  
- **发布频率**：Codex 与 Gemini CLI 采用 nightly/alpha 通道加速迭代，Claude Code 稳定版节奏较快。  
- **异常信号**：Reasonix 的 v1.38.10 发布引发大量回归反馈，成为当日“负面活跃度”最高工具。

---

### 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|------|----------|----------|
| **代理 / 网关兼容性** | Claude Code、Codex、Gemini CLI、OpenCode | Claude Code 连续三版本修补 `ANTHROPIC_BASE_URL` 代理场景；Codex 修复 WebSocket 与 HTTP cookie 共享、TLS 拦截；Gemini CLI 修复 proxy-agent esbuild 互操作；OpenCode 的 `serve` 未转发 User-Agent 导致免费层失效。企业网关部署已成为标配场景，但跨工具互操作问题依然多发。 |
| **会话数据可靠性** | Claude Code、Codex、Reasonix、Hermes | Claude Code 会话被损坏、恢复时重复工具响应；Codex 持久任务重开后旧对话隐藏；Reasonix v4→v5 迁移引发“幽灵对话”、静默删除；Hermes turn 租约丢失、投递队列排空不彻底。用户对会话不丢失、不重复、可恢复有极高要求。 |
| **Agent 执行可控性与安全** | Gemini CLI、Hermes、Codex、Claude Code | Gemini CLI 要求强制用户“hold”指令、避免破坏性命令；Hermes 危险命令防护误触发，每次路径补全都调用 LLM 审批；Codex 管理员规则可被嵌套 shell 脚本绕过；Claude Code 分类器误报合法会话。安全机制需要在“不误伤”与“防绕过”之间取得平衡。 |
| **Windows 平台稳定性** | Codex、Reasonix、OpenCode、Hermes | Codex 遭遇 sandbox 回归、Defender 拦截 pwsh、Computer Use 截图失败；Reasonix v1.38.10 在 Windows 上出现自动更新崩溃、会话历史无法加载；OpenCode 桌面版 renderer 连接卡死；Hermes 更新流程在无 gateway 的 Windows 部署下失败。Windows 是最主要的不稳定平台。 |
| **桌面端 / TUI 体验精细化** | Claude Code、Codex、OpenCode、Hermes | 文件夹选择器、托盘图标、命令建议空格、diff 面板、prompt clip 单击交互、启动性能等细节持续被吐槽。基础功能稳定后，用户开始关注交互品质。 |
| **技能 / 插件生态健全** | Claude Code、Gemini CLI、Hermes、OpenCode | Claude Code 技能加载失败；Gemini 不主动调用已配置 skills；Hermes 插件注册早于配置校验导致误报；OpenCode 插件工具列表只读。扩展机制的可靠性和可发现性仍是短板。 |
| **自动化 / 无头模式可靠性** | OpenCode、Gemini CLI | `opencode run` 间歇性挂起、零-chunk 流停滞无超时；Gemini CLI session 恢复时重复 tool response。CI/Agent 自动化场景对超时、重试和流监控有强烈需求。 |
| **配额与计费透明度** | Codex、OpenCode | Codex 语音被错误计入 Codex/Work 配额、Reset 凭空消失；OpenCode 免费层访问限制混乱，与文档承诺矛盾。用户对额度边界和扣费逻辑的信任度下降。 |

---

### 4. 差异化定位分析

| 工具 | 开发者/生态 | 核心定位 | 技术路线 / 独特机制 |
|------|------------|----------|----------------------|
| **Claude Code** | Anthropic | 深度绑定 Claude 模型的企业级编码助手 | 强调 Claude 生态兼容性（AGENTS.md、网关代理、技能系统）；社区用户以专业开发者为主，对版本质量敏感。 |
| **OpenAI Codex** | OpenAI | 通用 AI 代理，强调多智能体协作与安全审查 | Rust 实现；TUI + 桌面双端；开发重心在 Multi-Agent V2、Guardian 检查点、模型 catalog 动态刷新；Windows 兼容性待加强。 |
| **Gemini CLI** | Google | 深度集成 Gemini 模型的自主 Agent 框架 | 注重 Agent 任务完成判定可靠性（修复 MAX_TURNS 误报）、AST 感知工具、Auto Memory 记忆系统；多 P1 级 bug 处于修复中。 |
| **DeepSeek Reasonix** | DeepSeek 生态 | 面向 DeepSeek 模型的高性价比 CLI/Desktop 工具 | 提供 YOLO 模式、v4/v5 存储迁移、多 provider 配置；当前最大问题是发布质量不稳定，社区信任受损。 |
| **OpenCode** | 开源社区（anomalyco） | 开放、无锁定的 AI 编码 Agent | 强调“可用任意模型”、插件系统与自定义 provider；桌面端基于 electron，正在集中优化冷启动性能；免费层策略引发争议。 |
| **Hermes** | NousResearch | 自主运行的 agent 网关/消息交付系统 | 架构核心是 gateway + profile + cron + bot-delivery 队列，适合构建自动化个人助理；MCP 子进程监督、投递排空机制是当前开发重点。 |
| **DeepSeek Harness** | DeepSeek AI | 暂无公开社区动态 | 当日无活动，定位不明确。 |

**差异化要点**  
- **生态绑定型**：Claude Code、Gemini CLI、Reasonix 分别绑定 Claude、Gemini、DeepSeek 模型；Codex 和 OpenCode 更强调“模型无关”或“默认模型+开放接入”。  
- **场景侧重**：Claude Code 偏向企业编码规范；Codex 偏向多智能体/安全审查；Gemini CLI 偏向 Agent 自我改进（记忆、AST）；OpenCode 偏向可插拔的开发者工具链；Hermes 则更接近“自动化网关/消息代理”而非纯编码工具。  
- **技术栈差异**：Codex 采用 Rust，OpenCode 使用 Electron，Gemini CLI 与 Hermes 基于 Node/TypeScript，Claude Code 闭源但提供开放扩展点。

---

### 5. 社区热度与成熟度

| 工具 | 社区热度 | 成熟度判断 |
|------|----------|------------|
| **Claude Code** | 高：多个 issue 点赞 26~49，评论活跃；但 6k+ issue 被自动关闭引发信任争议 | 功能覆盖面广、版本迭代快，但回归频发，社区对 issue 管理机制不满 |
| **OpenAI Codex** | 高：Windows 系列问题讨论热烈，PR 密集 | 处于快速迭代期（0.156.0-alpha 推进中），多智能体/Guardian 机制尚不成熟 |
| **Gemini CLI** | 中高：P1 bug 关注度高，PR 大量涉及 Agent 核心机制 | 技术前瞻性强，但稳定性待提升；Auto Memory 等新功能仍存在安全争议 |
| **DeepSeek Reasonix** | 中：讨论集中于升级故障，用户情绪强烈 | 发布质量失控，社区信任处于低谷，属于“高风险修复期” |
| **OpenCode** | 高：免费层问题 43 条评论，桌面端性能优化系列 PR 密集 | 功能活跃、方向正确，但免费层策略和稳定性是主要短板 |
| **Hermes** | 中：P1 缺陷明确，修复 PR 及时；整体讨论量中等 | 定位独特但用户群体较小；消息交付可靠性正在系统性补课 |
| **DeepSeek Harness** | 极低：无活动 | 暂不活跃 |

**综合判断**  
- **最成熟**：Claude Code 生态最完整，但“大公司病”初显（回归多、issue 管理僵化）。  
- **迭代最快**：OpenAI Codex 和 OpenCode 在 PR 数量、新功能试错上最激进。  
- **最需止血**：DeepSeek Reasonix 需优先解决数据迁移和更新机制，否则社区可能流失。  
- **最具前瞻性**：Gemini CLI 的 AST 感知、Auto Memory、持久任务追踪等方向值得关注，但需尽快解决可靠性问题。

---

### 6. 值得关注的趋势信号

1. **代理 / 网关部署成为企业标配，但互操作性成为共通短板**  
   Claude Code、Codex、Gemini CLI、OpenCode 均在修补代理环境下的请求头、Cookie、TLS 问题。若工具无法在企业标准网关下稳定工作，“AI 编码助手落地企业”将受阻。

2. **会话数据可靠性的权重已超过“能跑通”**  
   Reasonix 迁移事故、Codex 恢复 bug、Hermes 投递丢失、Claude Code 会话损坏，均在警示：用户已默认“功能可用”，但“数据不丢”才是信任基石。

3. **模型调用被滥用在非必要环节，token 成本成为众矢之的**  
   Hermes 路径补全触发 LLM 审批、Codex 恢复时克隆大型 reasoning payload、Gemini Auto Memory 对无效补丁反复读取，均属于“无脑烧 token”。工具必须优化调用时机与上下文管理。

4. **“让 Agent 更克制”正在成为共识**  
   多个社区要求 Agent 尊重用户“wait/先解释”的指令、避免破坏性命令、减少非必要技能调用。安全机制不仅要防外部攻击，也要防 Agent 自身的“行动偏置”。

5. **记忆功能（Memory）走向台前，但安全边界模糊**  
   Gemini Auto Memory 的脱敏缺陷、Hermes 记忆收件箱、Claude Code 会话恢复，均涉及“模型记住什么、何时写入”。隐私与效率的权衡是下一波竞争点。

6. **多智能体（Multi-Agent）与任务编排成为新战场，但误报/挂起问题突出**  
   Codex 的 Multi-Agent V2、Gemini 的 subagent 误报成功、Claude Code 的 advisor 注入 400 错误——多代理的“可靠性”远未达标，这将是决定工具上限的核心能力。

7. **Windows 与 Linux 桌面端的稳定性成为“大众化”的门槛**  
   Windows sandbox、Defender 误报、Wayland 兼容性、桌面 UI 细节，均直接影响非服务器场景的真实使用。谁能先解决跨平台问题，谁就能获取更大用户基数。

8. **发布质量与回归控制正在成为社区核心情绪**  
   Reasonix 的“强烈抗议”、Claude Code 的“6k issue 被关”、Codex 的“连续回归”，都指向同一个信号：用户希望看到更严格的 CI 门禁、更充分的回归测试，而不是“发布后靠社区报 bug”。

---

**总结**  
2026 年 9 月中旬的 AI CLI 工具社区表现出两个鲜明特征：一是**功能军备竞赛**仍在继续（多智能体、记忆、AST 工具、网关支持）；二是**稳定性赤字**已经显现。对于开发者和技术决策者而言，选择工具时不应只看发布时间和功能清单，更需要关注其**发布质量、数据安全边界、企业环境兼容性**——这些因素正在成为真正分水岭。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据截至 2026-09-19 · 数据源：[anthropics/skills](https://github.com/anthropics/skills) · 分析范围：50 条热门 PR（前 20 展示）与 13 条 Issues
> 注：原始数据中 PR 评论数字段未标注，下列排名沿用仓库「按评论数排序」的口径。

## 1. 热门 Skills 排行（Top 8）

所有 PR 当前均为 **OPEN** 状态。

| Skill | 功能 | 社区关注焦点 |
|---|---|---|
| [fix(skill-creator)：隔离触发评估、适配 Windows](https://github.com/anthropics/skills/pull/1298) | 修复 skill 触发评估的误报/漏报：按 worker 隔离命令探针竞争、修复 `select()` 在 Windows 上的失败、防止无关工具中断扫描，并避免运行时失败被误当作「负例通过」 | 评估可靠性、跨平台一致性（与 #556、#1769 同源问题） |
| [proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771) | 面向 Web3 开发者的智能合约审计 skill：对 Solidity/Rust 合约做静态分析，并通过 ProofCore 零存储 Merkle 协议将审计密码学证明锚定到 TON 公链 | 合约审计结果的可验证性、Web3 垂直场景 |
| [md2video-audio](https://github.com/anthropics/skills/pull/1703) | 零成本将 Markdown 文档经 Marp 转为演示文稿，自动生成类人语音旁白并编译为 MP4 视频 | 「文档→视频」全自动内容管线 |
| [fix(mcp-builder)：适配 MCP SDK 2.x](https://github.com/anthropics/skills/pull/1742) | 修复 `mcp>=2.0.0` 中 `streamablehttp_client` 重命名以及自定义 headers 配置方式变更（对应 issue #1668） | 官方 skill 对上游 SDK 演进的跟随速度 |
| [pyxel 复古游戏开发](https://github.com/anthropics/skills/pull/525) | 指导 agent 使用 Python/Pyxel 创建与调试复古游戏：确定性 headless 运行、逐帧像素检查、任务级状态断言 | 游戏场景中 agent 行为的确定性验证（3 月创建、9 月仍在更新的长线 PR） |
| [document-typography 文档排版质量控制](https://github.com/anthropics/skills/pull/514) | 拦截 AI 生成文档三类高频排版问题：孤行（1–6 词溢出到下一行）、寡段（标题滞留页底）、编号错位 | AI 生成文档的「最后一公里」质量 |
| [blast-radius 爆炸半径检查](https://github.com/anthropics/skills/pull/1776) | 批量/破坏性写操作（归档用户、撤销权限、删除数据行、群发邮件）执行前的检查清单；核心思想是「查询选对行 ≠ 批量操作对现实世界正确」 | 高风险操作的护栏与可撤销性 |
| [Hivemind 多智能体编排](https://github.com/anthropics/skills/pull/1628) | Claude Code 仅担任规划/审查/合并者，将机械性工作委托给运行免费模型的 headless opencode worker | 降低昂贵模型上下文消耗——「稀缺资源是上下文而非智能」 |

## 2. 社区需求趋势

- **安全与信任边界（最热议题）**：[#492](https://github.com/anthropics/skills/issues/492)（43 评论）指出社区 skill 被放进 `anthropic/` 命名空间分发，冒充官方技能，制造信任边界漏洞，用户可能误授提升权限——安全是当前第一关切。
- **组织级协作与共享**：[#228](https://github.com/anthropics/skills/issues/228)（16 评论，8👍）呼吁 Claude.ai 提供组织内 skill 直接共享/库能力，替代「下载 .skill 文件 → Slack 传 → 手动上传」的低效链路。
- **官方工具链可靠性**：多起 issue 指向评估与注入机制失效——[#556](https://github.com/anthropics/skills/issues/556)（12 评论，7👍）`run_eval.py` 对所有查询 0% 触发率；[#1487](https://github.com/anthropics/skills/issues/1487) `claude-api` skill 单次注入约 156k tokens 直接撑爆上下文；[#1390](https://github.com/anthropics/skills/issues/1390) `evaluation.py` 对真实 MCP server 静默制造错误并误评 0/N。
- **上下文效率与记忆压缩**：[#1329](https://github.com/anthropics/skills/issues/1329) 提出 compact-memory（符号化紧凑 agent 状态表示），与 #1487 的上下文占用问题互为表里。
- **技能管理与去重**：[#189](https://github.com/anthropics/skills/issues/189)（9👍，全量最高）document-skills 与 example-skills 安装出相同内容导致上下文重复；[#62](https://github.com/anthropics/skills/issues/62) 技能文件无故消失。
- **治理与安全模式**：[#412](https://github.com/anthropics/skills/issues/412)（closed）agent-governance 安全模式提案、[#1385](https://github.com/anthropics/skills/issues/1385) 推理质量门禁管线、[#1175](https://github.com/anthropics/skills/issues/1175)（closed）SPO 文档访问控制疑虑——对 agent 行为治理的需求正在增长。

## 3. 高潜力待合并 Skills（均 OPEN）

- **[#1298 skill-creator 触发评估隔离修复](https://github.com/anthropics/skills/pull/1298)** —— 直击核心技能自身评估失效问题，且更新至 9/16，合并优先级最高。
- **[#1742 mcp-builder MCP SDK 2.x 适配](https://github.com/anthropics/skills/pull/1742)** —— 有明确对应 issue（#1668）、修复边界清晰，预计较快合入。
- **[#1769 skill-creator 触发检测 0% recall 修复](https://github.com/anthropics/skills/pull/1769)** —— 修复 #1721，与 #1298 属同一问题的不同切面，可能合并处理。
- **[#1765 office 三格式 UTF-8 解码修复](https://github.com/anthropics/skills/pull/1765)** —— 小型定向修复（Fixes #1707），DOCX/PPTX/XLSX 校验器同时受益，风险低。
- **[#1703 md2video-audio](https://github.com/anthropics/skills/pull/1703)** —— 功能完整、管线清晰（Marp→语音→MP4），贴近内容创作者需求。
- **[#1776 blast-radius](https://github.com/anthropics/skills/pull/1776)** —— 选型新颖、9/17 刚创建即获得关注，切中批处理操作的现实风险，有差异化价值。
- **[#525 pyxel](https://github.com/anthropics/skills/pull/525)** —— 存活超半年但持续更新，若作者积极回应 review 意见有望落地。
- **[#1771 proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771)** —— 垂直领域价值明确，但需评估与官方 skill 集定位的匹配度。

## 4. Skills 生态洞察

社区当前最集中的诉求是 **Skills 工具链自身的可靠性、安全边界与上下文效率**——从评估器 0% 触发率、官方命名空间信任漏洞到 156k token 上下文溢出，社区更关心让 skill 机制「可信、可控、不烧上下文」，而非单纯追求新 skill 种类的数量。

---

# Claude Code 社区动态日报 — 2026-09-19

## 1. 今日速览

今日发布 v2.1.277，正式加入 AGENTS.md 支持，并引入网关代理出口边界配置；此前 v2.1.275 引入的代理/网关请求回归已在 v2.1.276 中修复。社区方面，关于“超过 6k 个带 has repro 标签的 issue 被自动关闭”的争议持续发酵（👍 49），另有多个关于桌面端 UI 回归、技能加载失败与代理兼容性的 issue 获得较高关注。PR 侧主要围绕 diff 面板行为优化与 agents-md 模块的完善展开。

## 2. 版本发布

**v2.1.277**（最新）
- 新增 AGENTS.md 支持：在无 CLAUDE.md 的项目中自动读取 AGENTS.md；可在 `/config` 的 "Project instructions" 下调整（暂不支持 Bedrock、Vertex、Foundry）
- 新增 `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1` 环境变量，适用于仅提供出口的 Claude 应用网关代理

**v2.1.276**
- 修复 v2.1.275 回归：当 `ANTHROPIC_BASE_URL` 指向代理或网关时，所有请求以 `400 … Input tag 'advisor_20260301'` 失败的问题

官方发布页: https://github.com/anthropics/claude-code/releases

## 3. 社区热点 Issues

### 🔥 高热度争议
**#87647 [BUG] 自 2026 年 3 月以来，超 6k 个带 "has repro" 标签的 issue 被自动关闭**
作者: @marcindulak | 评论: 7 | 👍: 49
社区对自动关闭机制强烈不满，质疑标记为“可复现”的 issue 为何仍被批量关闭，严重影响对回归问题的追踪。该 issue 是今日社区情绪最集中的爆发点。
https://github.com/anthropics/claude-code/issues/87647

### 🖥️ 桌面端 UI 回归
**#76694 [BUG] Cowork 新项目丢失 "Choose a folder" — Chat/Cowork 合并后上下文菜单被替换为仅上传式知识菜单**
作者: @rexilx | 评论: 29 | 👍: 26
高赞高评论量，桌面端 Chat/Cowork 合并带来的功能回退，用户无法为新项目选择文件夹，影响核心工作流。创建于 7 月但至今未修复，用户耐心正在耗尽。
https://github.com/anthropics/claude-code/issues/76694

**#89398 [BUG] Slash-command 选择器不弹出，除非 "/" 是 composer 首字符，但提交时命令仍会执行**
作者: @AleksBiSonic | 评论: 13 | 👍: 7
Windows 桌面端输入体验问题：自动补全触发条件苛刻，但命令仍会在提交时运行，易导致误操作。
https://github.com/anthropics/claude-code/issues/89398

**#95472 [BUG] 桌面端文件夹选择器 "Recent" 列表上限降至 8 个，且定时任务挤占真实项目**
作者: @JimMcBubbles | 评论: 1
Windows 桌面端回归，用户无法快速访问常用项目目录。
https://github.com/anthropics/claude-code/issues/95472

### 🧩 功能回归与核心缺陷
**#52004 [BUG] Glob 和 Grep 工具从 2.1.117 的工具面板中消失（回归）**
作者: @ah4c | 评论: 15 | 👍: 8
虽已关闭，但作为长期高活跃度回归问题，社区关注度高。
https://github.com/anthropics/claude-code/issues/52004

**#86198 [BUG] 在 advisor 在途时运行 slash 命令会在消息中间注入 local_command 记录，导致会话永久 400**
作者: @diogocacarneiro-lang | 评论: 5
数据完整性被破坏的严重缺陷：正常操作即可导致整个会话不可用，且与 2.1.276 修复的 400 错误可能相关。
https://github.com/anthropics/claude-code/issues/86198

**#95455 [BUG] 2.1.277: excludedCommands 规则同时丢弃携带预子命令标志的单一命令 (git -C, -c, --git-dir)**
作者: @dannewman70 | 评论: 3
v2.1.277 引入的新回归，影响沙箱排除命令的精确匹配逻辑。
https://github.com/anthropics/claude-code/issues/95455

**#95367 [BUG] 2.1.271 中所有磁盘技能加载失败——用户技能与插件技能全部缺失，仅内置技能可用**
作者: @plaramee1 | 评论: 2
影响 Skills 生态的关键回归，用户自定义技能和插件技能均无法注册，破坏核心扩展机制。
https://github.com/anthropics/claude-code/issues/95367

### 📱 跨端同步与移动端
**#94735 [BUG] 会话意外归档/丢失，定时任务无法同步到 iOS 远程控制**
作者: @Jono-EFS | 评论: 2
远程控制功能可靠性问题，影响跨设备工作流。
https://github.com/anthropics/claude-code/issues/94735

### 🛡️ 安全与误报
**#95479 [BUG] Classifier 在工具执行验证中过度触发误报**
作者: @ariannamethod | 评论: 1
今日新增误报案例（`req_011CfBjvVkfDJU8QETaxWYVs`），合法的长时编码会话被标记为 `[cyber]`，反映安全分类器的假阳性问题。
https://github.com/anthropics/claude-code/issues/95479

## 4. 重要 PR 进展

**#95409 [merged/closed] agents-md: AGENTS.md 项目指令模块**
作者: @poteat
新增 `agents-md` mod 完整源码（manifest、hooks、测试与 README），支持通过 `instructionFiles` 选项控制 AGENTS.md 的读取行为。与今日 v2.1.277 的 AGENTS.md 功能直接呼应。
https://github.com/anthropics/claude-code/pull/95409

**#95417 [merged/closed] agents-md: Read 在引擎本身不附加任何内容的 turn 中不再嵌套附加 AGENTS.md**
作者: @poteat
修复 `--bare` 或 `CLAUDE_CODE_DISABLE_ATTACHMENTS` 模式下，Read 钩子不应附加 AGENTS.md 的行为一致性问题。
https://github.com/anthropics/claude-code/pull/95417

**#94847 [OPEN] diff: 首次编辑仅在存在可列出文件时才打开 pane**
作者: @bcherny
修复 diff pane 在编辑仓库外文件、被忽略文件或不同 worktree 时显示空白面板的问题，改善首次编辑体验。
https://github.com/anthropics/claude-code/pull/94847

**#95476 [merged/closed] diff: 首次编辑仅在主循环且开启 checkpointing 时打开面板，被挂起的打开操作将被撤回**
作者: @poteat
细化 diff 面板的打开条件，避免子代理编辑或关闭 checkpointing 时产生无关面板；同时解决窄终端下引擎等待的悬挂问题。
https://github.com/anthropics/claude-code/pull/95476

**#95423 [OPEN] diff: 对工具标记为只读的 shell 命令不重新拉取 diff**
作者: @poteat
优化 `diff` 模组：内置面板仅对可能写入的 shell 命令重新获取 diff，跳过 `ls`、`git status`、`cat` 等只读操作，减少不必要的刷新。
https://github.com/anthropics/claude-code/pull/95423

**#95198 [merged/closed] mods/diff: 将 openPane 返回类型声明为 unknown**
作者: @poteat
适配引擎 `$.ui.open` 即将返回结果对象的类型变更，保证前后向编译兼容，不改变运行时行为。
https://github.com/anthropics/claude-code/pull/95198

**#51452 [merged/closed] Update README.md**
作者: @Ewanjohndennis
重写 README，去除 AI 写作痕迹与营销性语言，精简安装区块和隐私章节，并修复损坏的 npm badge。
https://github.com/anthropics/claude-code/pull/51452

## 5. 功能需求趋势

- **AGENTS.md 生态**: v2.1.277 正式支持 AGENTS.md 后，社区围绕“项目指令文件”的扩展与对齐讨论显著增加，`agents-md` 模组的出现表明用户希望更细粒度地控制其加载行为
- **代理/网关兼容性**: 连续多个版本围绕 `ANTHROPIC_BASE_URL` 代理场景打补丁（2.1.275→276→277），说明企业网关部署已成为重要使用场景，用户对代理环境下的稳定性有持续需求
- **桌面端体验完善**: 多个高热度 issue（#76694、#89398、#95472）集中在桌面应用的文件夹选择、命令补全、Recent 列表等基础交互上，反映桌面端用户基数增长但 UI 细节打磨不足
- **技能系统可靠性**: #95367 等技能加载回归暴露了技能生态的脆弱性，社区对“磁盘技能”与“插件技能”的稳定性有较高期望
- **会话数据健壮性**: 会话被损坏（#86198）、超大文件导致会话无法加载（#95484）、后台子代理恢复丢失缓存（#94728）等问题显示，会话管理的可靠性是用户核心关切

## 6. 开发者关注点

- **Issue 管理信任危机**: #87647 以高赞成为社区情绪焦点，大量带 “has repro” 标签的 issue 被自动关闭，开发者担心问题未被真正解决就被“掩埋”，影响反馈积极性
- **回归频发**: 近几个版本频繁出现回归问题（2.1.275 代理 400、2.1.271 技能加载、2.1.277 excludedCommands），开发者对版本质量控制和回归测试覆盖提出质疑
- **会话损坏风险**: #86198 所示“正常操作导致会话永久不可用”的缺陷令人担忧，开发者希望核心数据路径有更强的保护机制
- **安全边界**: #95345（子代理修改生产认证信息）与 #95479（合法会话被误报为 cyber）两个方向的问题并存——既需要更严格的敏感操作防护，也需要更精准的安全分类
- **跨端功能一致性**: iOS 远程控制同步失败、VS Code 与桌面端行为差异等问题，说明多端体验一致性仍需加强

---
*本日报由 AI 技术分析师根据 GitHub 公开数据自动生成，数据截止 2026-09-19。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-09-19）

## 今日速览

昨日（截至 2026-09-19）Codex 发布了 `rust-v0.155.1` 正式版，修复了 TUI 新会话默认启用 reasoning summaries 导致部分 provider 拒绝请求的问题；同时 `0.156.0-alpha` 系列持续推进中。社区侧，Windows 平台问题集中爆发——sandbox 回归、Defender 误拦截、Computer Use 截图失败等高优先级 bug 引发大量讨论。PR 方面，Guardian 内部机制与 TUI 体验改进（新增 6 个自带主题、模型显示名称等）是主要方向。

---

## 版本发布

### rust-v0.155.1（最新正式版）
- **修复**：新建 TUI 本地会话时，reasoning summaries 现在默认禁用，避免被不支持该字段的 provider 拒绝请求。用户显式配置的 reasoning-summary 设置仍然生效。(#46467)
- 完整变更：https://github.com/openai/codex/compare/rust-v0.155.0...rust-v0.155.1

### rust-v0.156.0-alpha.1 ~ alpha.4
- 四个预发布版本，标记 0.156.0 系列开发进展，暂未包含公开变更说明。

---

## 社区热点 Issues（10 个）

1. **Windows Computer Use 截图失败（#25178）**
   - 链接：https://github.com/openai/codex/issues/25178
   - 69 条评论，28 👍，是当前社区热度最高的问题。Windows 10 22H2 上 `get_window_state` 请求截图时调用 `SetIsBorderRequired` 报 `0x80004002` 错误，影响 Computer Use 核心功能。

2. **TUI 命令建议多出两个前导空格（#9252）**
   - 链接：https://github.com/openai/codex/issues/9252
   - 17 条评论，89 👍，虽是小问题但社区呼声极高，希望去掉 cmd suggestion 中多余的 2 个空格。

3. **Windows 应用关闭时无法完全退出 + 侧边栏 hit-testing 问题（#17322）**
   - 链接：https://github.com/openai/codex/issues/17322
   - 22 条评论，19 👍。Windows 11 用户反馈点击窗口 X 后进程未彻底退出，且侧边栏 “New Chat” 存在 UI 点击穿透问题。

4. **TUI 根据 OS 偏好自动切换明暗主题（#12840）**
   - 链接：https://github.com/openai/codex/issues/12840
   - 16 条评论，3 👍。延续 #1618 的讨论，希望 CLI 能自动感知 macOS 的 light/dark 设置并应用对应主题。

5. **无法禁用极度侵入的托盘图标（#17442）**
   - 链接：https://github.com/openai/codex/issues/17442
   - 8 条评论，6 👍。Windows 桌面版强制显示托盘图标且没有禁用选项，影响用户体验。

6. **macOS 上 Voice 被 Codex/Work 配额错误拦截（#37619）**
   - 链接：https://github.com/openai/codex/issues/37619
   - 8 条评论，2 👍。Pro 20x/$200 用户反馈：从 Chat 发起的普通语音对话也被计入 Codex/Work 使用池，而网页版 Voice 不受此限制——配额边界划分混乱。

7. **macOS Voice 返回 403 “Voice session access denied”（#45752）**
   - 链接：https://github.com/openai/codex/issues/45752
   - 3 条评论。ChatGPT Pro 用户在 26.908.70816 版本上，`/v1/live` 接口返回 403，语音功能自 9 月 1 日起失效。

8. **管理员配置规则被嵌套 shell 脚本绕过（#44964）**
   - 链接：https://github.com/openai/codex/issues/44964
   - 2 条评论。企业版用户通过 MDM 配置的 `requirements.toml` 禁用规则（如 `rm`），可被 agent 默认的 `zsh -c` 风格嵌套脚本绕过，构成安全风险。

9. **CLI 0.155.x Windows sandbox 回归（#46515）**
   - 链接：https://github.com/openai/codex/issues/46515
   - 1 条评论。非管理员用户下 0.155.x 的 sandbox 启动失败（sandbox users 缺失或与 marker version 不兼容），0.154.0 在同一机器上正常——确认是新引入的回归。

10. **Defender/AMSI 误报拦截捆绑的 pwsh.exe（#46478）**
    - 链接：https://github.com/openai/codex/issues/46478
    - 1 条评论。Windows Desktop 的捆绑 PowerShell 7 运行时被 Defender 以 `HackTool:PowerShell/ApexToolkit.A` 拦截，且匹配内容未知，导致启动阶段即失败。

---

## 重要 PR 进展（10 个）

1. **MXC managed networking 默认启用本地绑定（#46523）**
   - 链接：https://github.com/openai/codex/pull/46523
   - MXC 主机回环访问是双向的，无法执行 `allow_local_binding = false`。将默认值改为 `true`，避免默认配置下 managed networking 不可用。

2. **Guardian parent-compaction 复用默认开启（#46522）**
   - 链接：https://github.com/openai/codex/pull/46522
   - 将 `guardian_reuse_parent_compaction` 转为 stable 并默认启用，恢复审查会话时可复用加密后的父级压缩数据，减少重复计算。

3. **macOS 进程组终止增加成员 fallback（#46521）**
   - 链接：https://github.com/openai/codex/pull/46521
   - macOS 上进程组信号可能被拒绝，即使组内成员可单独信号。现在终止清理时会对组成员逐个重试。

4. **HTTP 与 WebSocket 传输共享 ChatGPT cookies（#46506）**
   - 链接：https://github.com/openai/codex/pull/46506
   - WebSocket 握手此前不复用 HTTP cookie store，导致 `__oailb` 等路由 cookie 丢失。该 PR 统一了 cookie 管理。

5. **Multi-Agent V2 工具支持 catalog 参数 schema（#46505）**
   - 链接：https://github.com/openai/codex/pull/46505
   - 为六个 Multi-Agent V2 工具增加可选 JSON 编码 `parameters`，支持 plain、namespaced、code-mode 三种暴露方式，schema 依据当前模型动态选择。

6. **TUI 新增 6 个内置主题（#46504）**
   - 链接：https://github.com/openai/codex/pull/46504
   - 内置 `ada`、`babbage`、`curie`、`cushman`、`dali`、`davinci` 六款主题，并在主题选择器中提供；同时支持 `codex.accent` 强调色变量。

7. **TUI 全面使用 catalog 模型显示名称（#46503）**
   - 链接：https://github.com/openai/codex/pull/46503
   - 模型选择器、会话头部、状态栏、终端标题等位置不再显示原始模型 ID，改用 catalog 中的 display name，并保留 fallback。

8. **认证变化后刷新模型目录（#46508）**
   - 链接：https://github.com/openai/codex/pull/46508
   - 凭据切换可能导致内存中的 model catalog 仍属于旧身份。现在在每次 turn 前检查并刷新，避免使用错误的 bundled metadata。

9. **Guardian 审查完成后再投递决策（#46509）**
   - 链接：https://github.com/openai/codex/pull/46509
   - 修复父进程在 Guardian 审查终态事件未落盘前就收到决策的竞态，确保被审查动作不会在保存完成前启动。

10. **避免线程恢复时克隆被排除的 turn 项（#46511）**
    - 链接：https://github.com/openai/codex/pull/46511
    - 恢复运行中线程时，不再克隆完整 active-turn 项再丢弃 summary 外的内容，避免复制大型 reasoning payload 的性能浪费。

---

## 功能需求趋势

从近 24 小时 Issue 与 PR 中可提炼出以下社区关注方向：

- **平台支持扩展**：Arch Linux ARM64 和 Omarchy 桌面环境（#42193）、自托管 Codex Desktop Web UI（#45847）等需求，反映用户希望 Codex 突破官方支持列表，适配更多 Linux 发行版与局域网部署场景。
- **代理自治能力**：社区提出应允许 agent 读写当前项目自身的设置和指令文件（#46491），让 Codex 在项目上下文中具备更强的自配置能力。
- **TUI/桌面体验精细化**：主题自动切换（#12840）、命令建议格式（#9252）、托盘图标可配置（#17442）等 UI 细节持续受到关注，表明基础功能稳定后，用户开始追求品质打磨。
- **Windows 稳定性与安全兼容**：多个 Windows bug（sandbox 回归、Defender 误报、截图失败）构成当前最大的稳定性短板，安全软件兼容性问题也直接影响企业推广。
- **多智能体与 Guardian 机制持续演进**：PR 侧大量围绕 Multi-Agent V2、Guardian 检查点、会话恢复的性能与竞态修复，是当前内部开发的重心。

---

## 开发者关注点

- **Windows 平台问题高频爆发**：sandbox 启动失败（#46515）、Computer Use 截图失败（#25178）、Defender 拦截 pwsh（#46478）、托盘图标无法禁用（#17442）等多个独立问题同时活跃，Windows 用户整体体验受损。
- **配额与计费边界不透明**：macOS 语音被错误计入 Codex/Work 配额（#37619）、未使用的 Codex Reset 在过期前凭空消失（#32540），用户对额度展示与扣费逻辑的信任度下降。
- **企业代理与 TLS 互操作**：WebSocket 传输忽略 `SSL_CERT_FILE`（#46489），在 TLS 拦截代理环境中 HTTP 可用而 WebSocket 失败，是阻碍企业落地的重要技术债。
- **管理配置可被绕过**：非平凡 shell 脚本可绕过管理员设置的 `rm` 禁用规则（#44964），企业安全策略存在执行缝隙。
- **会话数据完整性问题**：持久任务重新打开后旧对话被隐藏（#46485）、网站站点文件丢失（#46502），用户对会话记录可靠性的信心受到影响。
- **测试与稳定性投资**：PR 侧大量测试稳定性修复（TUI 退出测试、Windows sandbox 测试、多智能体 resume 测试等），显示团队正在为 0.156.0 的发布夯实基础。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-19

## 1. 今日速览

昨日发布了 v0.62.0-nightly 版本，主要修复了 OAuth 令牌刷新与 UI 渲染边界问题。社区讨论焦点集中在 **Agent 可靠性** 上：Subagent 在达到 MAX_TURNS 时误报 GOAL 成功、Generalist agent 无限挂起等 bug 持续引发开发者共鸣。PR 方面，AST 感知工具、持久化任务追踪、中断恢复防上下文污染等多项重量级 PR 集中亮相，显示出团队在 Agent 核心机制上的系统性改进方向。

## 2. 版本发布

**v0.62.0-nightly.20260918.g9450ade79**（2026-09-18 发布）

主要更新：
- **fix(core)**: 修复刷新时 OAuth refresh token 保留问题，并确保凭证删除操作幂等
- **fix(ui)**: 修复边框渲染中负布局维度的防护逻辑

🔗 https://github.com/google-gemini/gemini-cli/releases

## 3. 社区热点 Issues

### 3.1 Subagent 达到 MAX_TURNS 后误报 GOAL 成功 🔥
[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — **P1, kind/bug**，评论 13，👍 2

`codebase_investigator` subagent 在达到最大轮数限制、未做任何分析时，仍上报 `status: "success"` 与 `Termination Reason: "GOAL"`，导致主 Agent 以为任务成功而中断后续逻辑。这是隐蔽的失败模式，比直接报错危害更大。社区持续跟进中（3月创建至今仍在讨论），说明修复难度较高。

### 3.2 Generalist agent 无限挂起
[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — **P1, kind/bug**，评论 8，👍 8

用户报告 Gemini CLI 在委托给 generalist agent 时无限挂起（用户称等待长达 1 小时），简单的文件夹创建也会触发。用户通过指示模型不使用 subagent 可规避。👍 8 的投票数说明这是一个影响面较广的高频痛点。

### 3.3 利用模型的原生 bash 能力：零依赖 OS 沙箱与意图路由
[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — **P2, kind/enhancement**，评论 9

核心观点：Gemini 3 模型天生擅长作为 bash 用户链式调用 `grep`/`cat`/`sed`/`awk` 等 POSIX 工具，建议通过零依赖沙箱机制释放这一原生能力，同时在执行后进行意图路由以保障安全。这条长期讨论的 issue 反映了社区对"模型能力发挥 vs 安全限制"平衡的持续关注。

### 3.4 AST 感知的文件读取、搜索与代码映射
[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — **P2, kind/feature**，评论 7

EPIC 级 issue，追踪 AST 感知工具的价值评估：精确读取方法边界以减少回合数、降低 token 噪声、改进代码库导航。**今日已有对应 PR #29396 提交**，从讨论走向实现。

### 3.5 Gemini 不主动使用 skills 和 sub-agents
[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — **P2, kind/bug**，评论 6

用户反映 Gemini CLI 几乎不会主动调用自定义 skills 和 sub-agents——即使已配置 gradle、git 等技能且任务高度相关。必须显式指示才会使用。这直接影响了自定义工作流的价值兑现。

### 3.6 Auto Memory：确定性脱敏与日志精简
[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — **P2, area/security, kind/bug**，评论 5

Auto Memory 将本地 transcript 发送给后台提取模型前依赖提示词要求脱敏，但此时机密内容已进入模型上下文。此外服务可能记录已有 skill 的内容。社区对安全边界敏感度显著提升。

### 3.7 Auto Memory 对低信号的会话无限重试
[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — **P2, kind/bug**，评论 4

当后台提取 agent 判定某会话为低信号而不读取时，该会话永远不会被标记为已处理，会反复出现。这是一个典型的资源浪费问题。

### 3.8 无效 Auto Memory 补丁需要隔离或上报
[#26523](https://github.com/google-gemini/gemini-cli/issues/26523) — **P2, kind/bug**，评论 3

内存收件箱静默跳过无效补丁（格式错误、无 hunks、目标越界），但后台的待处理摘要会逐一读取所有 `.patch` 文件，导致无效数据反复消耗上下文和 token。

### 3.9 Browser Agent 在 Wayland 下失败
[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — **P1, kind/bug, agent/browser**，评论 4

浏览器 subagent 在 Wayland 环境下执行失败，Termination Reason 为 GOAL 但实际未完成任务。P1 级别 + 浏览器 Agent 的广泛使用场景，说明 Linux 桌面用户受影响明显。

### 3.10 符号链接的 Agent 定义不被识别
[#20079](https://github.com/google-gemini/gemini-cli/issues/20079) — **P2, kind/bug**，评论 4

`~/.gemini/agents/filename.md` 如果是符号链接则不会被识别为 agent。对于使用 dotfiles 管理配置的开发者来说这是一个实际痛点，此问题已持续近 7 个月仍未修复。

## 4. 重要 PR 进展

### 4.1 AST 感知结构搜索工具
[#29396](https://github.com/google-gemini/gemini-cli/pull/29396) — **OPEN, P2, size/xl**

实现 #22745 中要求的 AST 感知工具。引入轻量级正则 AST 分析服务和新的 `ast_search` 工具，使 Agent 能做精确的符号级导航而非猜测行范围或读取整个文件。

### 4.2 持久化文件任务追踪替代 WriteToDo
[#29393](https://github.com/google-gemini/gemini-cli/pull/29393) — **OPEN, P3, size/l/xl**

用基于文件的持久化任务追踪系统替换上下文内 WriteToDo 工具，解决上下文腐烂、token 成本高和总内存问题。由 TrackerService 支撑，对齐 #18836。

### 4.3 修复 session 恢复时的重复工具响应
[#29400](https://github.com/google-gemini/gemini-cli/pull/29400) — **OPEN, P1, size/m**

修复 `-r` 恢复会话时 `functionResponse` 消息重复的问题。工具结果可能同时持久化在 `toolCalls[].result` 和 durable `user` 消息中，恢复时两个副本都被重放导致重复响应。

### 4.4 持久状态写入失败安全
[#29402](https://github.com/google-gemini/gemini-cli/pull/29402) — **OPEN, P1, size/m**

使 `PersistentState` 写入失败安全——中断的保存不会用截断的 JSON 覆盖 `state.json` 导致静默清除 CLI 持久状态。实现方式：写入临时文件 → fsync → 原子重命名。

### 4.5 规范化 proxy-agent esbuild 互操作
[#29401](https://github.com/google-gemini/gemini-cli/pull/29401) — **OPEN, P1, size/m/l**

修复 `https-proxy-agent` 和 `http-proxy-agent` 在 esbuild 打包管线中的 CJS/ESM 互操作处理，确保静态/动态/命名/默认导入时的构造器解析一致性。

### 4.6 MCP 初始工具发现超时保护
[#29398](https://github.com/google-gemini/gemini-cli/pull/29398) — **OPEN, P1, size/m**

当 MCP server 声明 `tools` 能力但返回 JSON-RPC id 不匹配的 `tools/list` 响应时，SDK 会丢弃该响应然后等待完整的 `MCP_DEFAULT_TIMEOUT_MSEC`（10 分钟）。本 PR 为初始发现绑定短超时，关闭 #28355。

### 4.7 防止中断回合导致的上下文中毒与死循环
[#29397](https://github.com/google-gemini/gemini-cli/pull/29397) — **OPEN, P2, size/xl**

当 agentic 循环被中断（SIGINT、超时或工具执行中止）时，CLI 会向会话历史追加合成 assistant 消息 "[The previous response was interrupted...]"。这会造成上下文中毒和潜在无限循环，本次修复阻断该行为。

### 4.8 强制执行用户 hold 指令
[#29394](https://github.com/google-gemini/gemini-cli/pull/29394) — **OPEN, P1, size/xl**

解决 #26390：Agent 存在激进的行动偏置，当用户说"wait"、"explain first"或"不要应用修复"时仍会调用破坏性工具（`replace`、`write_file`、`run_shell_command`）。本 PR 在调度器层面拦截这些工具的调用。

### 4.9 保留无关注释的编辑行为修复
[#29399](https://github.com/google-gemini/gemini-cli/pull/29399) — **OPEN, P2, size/m**

强化 replace 工具契约：无关注释和代码必须逐字保留，引导模型做最小化、独立的编辑而非重写大段中间代码块，并附带基于 OAuth 多部分编辑 issue 的回归 eval。

### 4.10 VSCode IDE 伴侣：关闭 diff 标签时保留终端焦点
[#29378](https://github.com/google-gemini/gemini-cli/pull/29378) — **CLOSED, P1, size/xl**

关闭 diff 预览编辑器时传递 `preserveFocus` 参数，避免键盘焦点从集成终端被抢到编辑器组。该 PR 已被合并（CLOSED 状态），提升 VSCode 扩展的使用体验。

## 5. 功能需求趋势

从本期所有 Issues 与 PR 中可提炼出社区最关注的五大方向：

### 5.1 Agent 自主性与任务完成判定可靠性 🔥
核心痛点集中在 Subagent 的**失败误报**（#22323）和**无限挂起**（#21409）。任务完成状态的可信判定直接影响整个 agentic 工作流的可靠性，是当前社区最强烈的诉求。

### 5.2 Browser Agent 稳定性
Wayland 兼容性（#21983）、锁定 profile 的自动接管与恢复（#22232）、settings.json 覆盖被忽略（#22267）——浏览器 Agent 在生产环境落地仍有较多稳定性隐患。

### 5.3 AST 感知与上下文效率
从 EPIC issue（#22745、#22746）到 PR 落地（#29396），社区对"更精确、更省 token"的代码导航方式有明确需求。Tactful Extraction（#19561）等 token 节约提案也颇受关注。

### 5.4 Auto Memory 系统质量
#26516 系列问题（脱敏、重试、无效补丁、日志）集中反映了 Auto Memory 功能从"可用"到"可靠"的成长阵痛，安全和效率是两大关键词。

### 5.5 Agent 安全意识与执行控制
用户希望 Agent 不要使用破坏性命令（#22672）、遵守用户的 hold 指令（#29394）、避免在随机位置创建临时脚本（#23571）。**"让 Agent 更克制"** 正在成为共识。

## 6. 开发者关注点

### 6.1 高频痛点
- **Subagent 状态误报**：多个 bug 显示 Subagent 在异常中断时仍上报成功（#22323、#21983），开发者难以信任 Agent 的自我报告
- **挂起与卡死**：Generalist agent 无限等待无超时机制（#21409），MCP 工具发现可能阻塞 10 分钟（#29398）
- **配置不生效**：Browser Agent 忽略 settings.json（#22267）、/compress 不持久化（#21335），配置和命令的**可预期性**不足

### 6.2 对"记忆"功能的担忧
Auto Memory 相关 issue 的密集出现（#26516、#26522、#26523、#26525）表明开发者关注记忆功能的安全边界与资源消耗，尤其是**敏感信息在脱敏前已进入模型上下文**这一设计缺陷。

### 6.3 Agent 执行边界控制
多个 issue 和 PR 围绕 "用户说停就停" 展开（#29394、#22672），反映出开发者对 Agent 行动偏置的普遍担忧，期待更明确的**用户意图优先级机制**。

### 6.4 高呼声未解决项
- **符号链接 Agent 文件不支持**（#20079）：review 近 7 个月未修复，dotfiles 用户持续受影响
- **Skills/Subagents 不被主动使用**（#21968）：即使配置完善，Gemini 默认也不会调用，自定义工作流价值大打折扣

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报（2026-09-19）

## 今日速览

昨日发布的 v1.38.10 虽在更新说明中强调“提升会话可靠性、Windows 升级与 Agent 执行”，但社区反馈显示该版本在 Windows 平台引入了大量回归：会话历史丢失/错乱、重复导入、工作区只读、Agent 工具全部失效等问题集中爆发，用户对发布质量表达了强烈不满。与此同时，CLI/Agent 方向有多个修复性 PR 正在推进，值得关注。

## 版本发布

**Reasonix CLI / Desktop v1.38.10（稳定版）**

官方更新要点：
- 提升会话可靠性
- 改进 Windows 升级与 Agent 执行
- 优化文件路径处理
- 增强对话记录稳定性

但结合当日 Issue 来看，实际体验与预期存在较大落差，尤其是 Windows 用户升级后遭遇多项会话存储迁移问题。

**更新日志**：https://reasonix.io/changelog/v1.38.10/

## 社区热点 Issues（10 个）

1. **升级后客户端不可用，历史会话丢失** — [#10513](https://github.com/esengine/DeepSeek-Reasonix/issues/10513)  
   用户升级到 v1.38.10 后，无法新建会话也无法查看历史会话，历史数据疑似丢失。该 Issue 已有 13 条评论，是当日讨论最集中的数据丢失报告。

2. **归档/清除对话后出现“幽灵对话”** — [#10489](https://github.com/esengine/DeepSeek-Reasonix/issues/10489)  
   归档操作后对话变成新对话、项目栏残留不可打开条目、切换对话时出现重复项。用户定位到 v4→v5 会话存储迁移未收敛。

3. **v5 迁移导致工作区永久只读，shell 工具永久失效** — [#10509](https://github.com/esengine/DeepSeek-Reasonix/issues/10509)  
   升级后 v5 存储迁移中断，工作区既不能打开也不能新建会话，连带 shell 工具不可用，属于高影响数据可用性事故。

4. **用户强烈抗议：所有会话历史全乱** — [#10527](https://github.com/esengine/DeepSeek-Reasonix/issues/10527)  
   用户从 v1.38.3 升级后，多个项目的会话时间、命名、顺序全部错乱，新会话也无法使用。用户明确表示“强烈级抗议”，要求谨慎合并 PR。

5. **恢复一个会话恢复两行，删除一个会静默删除全部** — [#10508](https://github.com/esengine/DeepSeek-Reasonix/issues/10508)  
   迁移后的工作区中，同一会话可出现多个侧边栏行；用户删除其中一个重复项时会级联删除整个会话，造成静默数据丢失。

6. **侧边栏标签迁移错误，旧会话被重复导入** — [#10495](https://github.com/esengine/DeepSeek-Reasonix/issues/10495)  
   侧边栏主题名被替换为注入的 host block 内容，且同一旧会话被导入 5 次，用户自定义主题名完全丢失。

7. **一个无法解析的沙箱写根导致所有工具调用失败** — [#10505](https://github.com/esengine/DeepSeek-Reasonix/issues/10505)  
   v1.38.10 中沙箱因无法规范化单个写路径而对每条命令返回 exit 126，且无回退机制，整个工具层在应用会话内持续不可用。

8. **启动后“会话历史无法加载”——工作区状态冲突** — [#10498](https://github.com/esengine/DeepSeek-Reasonix/issues/10498)  
   Windows 11 上 v1.38.10 启动后无法加载会话历史，用户详细报告了工作区状态冲突的日志信息。

9. **自动更新崩溃，只能彻底删除重装** — [#10526](https://github.com/esengine/DeepSeek-Reasonix/issues/10526)  
   用户从 v1.38.7 自动更新到 v1.38.10 后客户端崩溃，重新配置 API 提示无读写权限，只能完全删除重装。

10. **用户整体反馈：“太多问题了”** — [#10522](https://github.com/esengine/DeepSeek-Reasonix/issues/10522)  
    老用户表示 Reasonix 从“优秀的 DeepSeek 工具”变得“每次更新都极其不可靠”，建议团队审视内部流程，反映了社区的整体信任危机。

## 重要 PR 进展（10 个）

1. **fix(cli): resume 仅读取 v4 存储，启动时迁移旧会话** — [#10515](https://github.com/esengine/DeepSeek-Reasonix/pull/10515)  
   修复 CLI 的 `--continue`/`--resume` 在迁移到 v4 存储后无法枚举当前格式会话的问题，让恢复功能真正可用。

2. **fix(agent): 检测无意义重复循环并提示后重试一次** — [#10431](https://github.com/esengine/DeepSeek-Reasonix/pull/10431)  
   针对模型陷入“一直输出好”这类无工具调用的重复循环，新增客户端侧守卫，避免输出预算被耗尽。

3. **fix(provider): 普通 DeepSeek 回合重放 reasoning_content，修复重复 400 错误** — [#10084](https://github.com/esengine/DeepSeek-Reasonix/pull/10084)  
   在思考模式下，所有 assistant 历史回合序列化 `reasoning_content`，解决 DeepSeek 接口反复返回 400 的问题。

4. **fix(capability): 技能改由 use_capability 路由，不再使用已退役的 connect_tool_source** — [#10419](https://github.com/esengine/DeepSeek-Reasonix/pull/10419)  
   修复技能在生产环境中永远不可用的问题，因为 routing catalog 中未注册旧接口。

5. **fix(sandbox): 尊重 `[sandbox].bash="off"` 并跳过 bwrap 探测** — [#10297](https://github.com/esengine/DeepSeek-Reasonix/pull/10297)  
   此前即使配置关闭 bash 沙箱，强制执行模式仍会启用并运行 bubblewrap 探测；该 PR 让显式关闭真正生效。

6. **fix(tools): 在 bash 中强制标准 git 行为** — [#10368](https://github.com/esengine/DeepSeek-Reasonix/pull/10368)  
   让 Reasonix 启动的 git 子进程忽略用户 `~/.gitconfig` 中可能改变行为的配置，确保 Agent 看到的 git 语义与假设一致。

7. **feat(provider): 新增按供应商的 stream_idle_timeout_seconds 配置** — [#10344](https://github.com/esengine/DeepSeek-Reasonix/pull/10344)  
   允许为不同 provider 单独设置流空闲超时，未设置时沿用 300s 默认值，提升网络波动场景下的可控性。

8. **feat(cli): YOLO 模式下数字键直接选择模型/提供方/恢复会话行** — [#9491](https://github.com/esengine/DeepSeek-Reasonix/pull/9491)  
   搜索选择器已显示编号行，但数字键此前会作为过滤文本；本 PR 让数字键直接选中对应行，符合 YOLO 模式“无确认”的设计理念。

9. **feat(cli): YOLO 模式下自动提交已全部作答的 ask 批次** — [#9769](https://github.com/esengine/DeepSeek-Reasonix/pull/9769)  
   多问题 ask 批次全部回答完毕后，在 Submit 页按下回车即可自动提交，不再需要额外确认步骤。

10. **feat(cli): 为输入框添加 vi 命令模式** — [#10367](https://github.com/esengine/DeepSeek-Reasonix/pull/10367)  
    通过 `ui.commandmode = "vi"` 开启，Esc 进入命令模式而非中断运行，Ctrl+C 在已有文本时保存草稿，满足资深用户习惯。

## 功能需求趋势

- **会话数据可靠性与迁移安全**：今日大量 Issue 集中在 v4→v5 迁移、重复导入、静默删除和“幽灵会话”，社区对升级安全性提出强烈要求，期望有更平滑的迁移和回滚机制。
- **Windows 平台完善**：Agent 的 bash 解释器支持、自动更新稳定性、文件路径处理、沙箱兼容性均为 Windows 用户高频反馈方向，例如 [#10523](https://github.com/esengine/DeepSeek-Reasonix/issues/10523) 要求 Agent 能使用 MSYS2/Git Bash。
- **多模态模型支持**：[#10075](https://github.com/esengine/DeepSeek-Reasonix/issues/10075) 显示 `deepseek-v4.1-flash` 无法接收图片附件，图片输入能力是社区明确期待的功能。
- **Agent 执行可控性**：包括检测重复循环、沙箱开关生效、git 行为标准化、配置写入需人工审批等，均旨在让 Agent 行为更可预测、更安全。
- **TUI/CLI 效率操作**：YOLO 模式数字键、vi 命令模式、diff/patch 彩色渲染、半页/单行滚动等 PR 展示了社区对高效终端交互的兴趣。

## 开发者关注点

- **升级数据丢失是最大痛点**：多位用户报告会话名称、顺序、时间戳错乱，甚至工作区只读、历史消失。用户表示“只有会话内容是正常的，但自定义标识和时间顺序全乱了”，要求维护团队充分验证后再合并迁移相关 PR。
- **Agent 工具链路脆弱**：沙箱路径解析失败导致所有工具 exit 126、shell 工作区永久失效等问题，使核心自动化能力不可用，影响严重。
- **自动更新机制不靠谱**：更新后崩溃且无法恢复，用户被迫全量重装，说明更新流程需要更完善的回滚/验证机制。
- **对发布质量的信任危机**：从 #10522 “TOO MANY ISSUES!!!” 到 #10527 的“强烈级抗议”，社区情绪明显焦躁，希望项目方收紧 PR 审核与回归测试流程。

---

以上为今日日报。请继续关注 v1.38.10 相关问题的后续修复 PR 与补丁发布。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

## OpenCode 社区动态日报 — 2026-09-19

---

### 1. 今日速览

**免费层访问限制错误集中爆发**，多个用户反映 `OpenCode's free tier can only be used from within OpenCode`，成为今日社区最大痛点；**桌面端启动性能优化系列 PR 批量合入**，通过减少 `require()` 依赖、懒加载浏览器面板、轮询加速等手段显著缩短打包版启动时间；**无头模式与 SSE 流传输稳定性问题**持续受关注，多个相关 Bug 与修复 PR 处于活跃状态。

---

### 3. 社区热点 Issues（Top 10）

**1. OpenCode 免费层报错集中爆发（多 Issue 关联）**
- [#49433](https://github.com/anomalyco/opencode/issues/49433) — 43 评论 | 👍 8，最新版 1.3.17 下所有模型均报此错，社区高度关注
- [#49678](https://github.com/anomalyco/opencode/issues/49678) — 更新最新版后问题依旧，用户抱怨版本信息不便于查取
- [#49858](https://github.com/anomalyco/opencode/issues/49858) — 用户指出错误与官方文档承诺（"use it with any other coding agent"）直接矛盾
- [#49736](https://github.com/anomalyco/opencode/issues/49736) / [#49698](https://github.com/anomalyco/opencode/issues/49698) — 多个独立用户报告同样错误

> 影响面极广，且涉及文档承诺与实际行为不符，是当前社区最强烈的负面反馈。

**2. [#35870](https://github.com/anomalyco/opencode/issues/35870) Headless 模式启动间歇性挂起** — `opencode run` 完成引导后主线程陷入 `epoll_wait`，既不创建会话也不退出，需手动 kill。根因指向 `InstanceStore.load` fork 引导路径，自动化场景可靠性受影响。

**3. [#48675](https://github.com/anomalyco/opencode/issues/48675) 零-chunk 流停滞无超时无重试** — 三个并行无头任务在 17 秒内先后停滞，日志停在流打开行。暴露当前流式传输在 0 数据场景下缺少保护机制。

**4. [#49800](https://github.com/anomalyco/opencode/issues/49800) Zen 流式输出 token 合并损坏** — 出现前后输出片段互相粘连、重复发射、非 ASCII 文本泄漏（如 `GPU is freecars`），影响托管 Zen 模型输出质量。

**5. [#47480](https://github.com/anomalyco/opencode/issues/47480) 自定义 provider 图片被静默替换为文本占位符** — 自定义 OpenAI 兼容模型默认 `attachment: false`，即使上游模型具备视觉能力也不会得到提示，用户感知为功能悄悄缺失。

**6. [#49756](https://github.com/anomalyco/opencode/issues/49756) `opencode serve` 未转发 User-Agent 导致免费层失败** — 服务器模式请求 Zen API 时缺少 User-Agent 头，直接阻断免费层使用，影响所有通过 serve 接入的用户。

**7. [#49861](https://github.com/anomalyco/opencode/issues/49861) SSE 事件流丢失 worktree 会话事件** — `event.ts:37` 的目录过滤条件会丢弃 worktree 会话的全部事件，dev 分支上仍未修复。

**8. [#49860](https://github.com/anomalyco/opencode/issues/49860) Windows 桌面版启动卡死** — 特定机器上 renderer 始终无法连接嵌入式服务器（观察 V8 zone OOM），但同机 TUI/serve 均正常，问题与桌面端独有的启动链路相关。

**9. [#49867](https://github.com/anomalyco/opencode/issues/49867) OpenCode Go 订阅未找到** — 账号系统刚经历重大更新，用户反馈订阅信息丢失，即使新建 API key 仍复现，疑似后端数据迁移问题。

**10. [#44055](https://github.com/anomalyco/opencode/issues/44055) TUI resize 监听器内存泄漏** — 终端尺寸变化时反复出现 `EventEmitter memory leak` 警告，长会话积累大量泄漏监听器，影响 TUI 长时间使用的稳定性。

---

### 4. 重要 PR 进展（Top 10）

**1. [#49838](https://github.com/anomalyco/opencode/pull/49838) [CLOSED] feat(plugin): tool 域增加 list 方法** — 插件现在可以读取已注册工具列表，并已在工具输入修复插件中使用，补全插件工具管理能力。

**2. [#48638](https://github.com/anomalyco/opencode/pull/48638) [OPEN] fix: 加固会话 diff、快照与写入路径** — 针对并行 agent 场景下的 worker-thread 停滞问题，对 `SessionSummary.summarize` 的全量 git patch 附加逻辑进行加固，修复 #48641。

**3. [#49791](https://github.com/anomalyco/opencode/pull/49791) [CLOSED] perf(desktop): 以纯 JSON 存储替代 electron-store** — 移除 `electron-store → conf → ajv/semver` 等一长串 require 链，Chromium 启动阶段加载时间显著下降。

**4. [#49762](https://github.com/anomalyco/opencode/pull/49762) [CLOSED] perf(desktop): 不再为获取版本号 spawn 240MB CLI** — 每次启动等待 CLI 版本输出的 ~380ms 被消除，首次启动窗口展示更快。

**5. [#49780](https://github.com/anomalyco/opencode/pull/49780) [OPEN] perf(client): 服务启动轮询间隔 100ms → 25ms** — 服务注册约 250ms、就绪应答约 270ms，25ms 轮询可将感知启动延迟压低一个数量级。

**6. [#49866](https://github.com/anomalyco/opencode/pull/49866) [CLOSED] revert(core): 移除 autonomous `/goal` 命令** — 应维护者要求回退合成标题行为相关提交，核心功能策略调整。

**7. [#21627](https://github.com/anomalyco/opencode/pull/21627) [OPEN] fix(provider): 为自定义 OpenAI 兼容 provider 启用图片支持** — 长驻 PR，直接对应 #47480 用户诉求，覆盖 Ollama 视觉模型等场景。

**8. [#49865](https://github.com/anomalyco/opencode/pull/49865) [OPEN] feat(opencode): 内置 sysml-lsp LSP 服务** — 为 SysML v2 语言提供开箱即用的 LSP 支持，可自动 `go install` 回退安装。

**9. [#49863](https://github.com/anomalyco/opencode/pull/49863) [OPEN] fix(plugin): 支持包子路径导出** — 修复类似 `opencode-pty/v2` 的裸子路径无法被正确解析安装的问题。

**10. [#49862](https://github.com/anomalyco/opencode/pull/49862) [OPEN] fix(event): 移除 worktree 会话的 SSE 目录过滤** — 直接修复今日最热的 SSE 丢事件 Bug（#49861），与 #35913 同方案的重开 PR。

---

### 5. 功能需求趋势

| 方向 | 代表 Issue / PR | 热度 |
|------|----------------|------|
| **免费层与账号体系** | #49433、#49678、#49756、#49867 | 极高 — 多用户集中反馈，涉及服务端策略与客户端头转发 |
| **自定义 Provider 能力补齐** | #47480、#21627 | 高 — 自定义模型默认能力（图片）与声明不符，期待自动探测或显式配置 |
| **无头/自动化稳定性** | #35870、#48675 | 高 — 自动化场景要求更可靠的流式传输与超时保护 |
| **桌面端启动性能** | #49791、#49762、#49774、#49780、#49792、#49758 | 极高 — 系列 PR 持续优化打包版冷启动体验 |
| **插件系统扩展** | #49838、#49863 | 中 — 插件读取工具列表、包子路径解析，插件能力边界扩大 |
| **新模型/语言支持** | #49864、#49865 | 低 — SysML v2 作为系统工程领域语言，由开源项目驱动的集成请求 |
| **事件流完整性** | #49861、#49862 | 中 — worktree 会话 SSE 事件全部丢失，影响多工作区协作场景 |

---

### 6. 开发者关注点

**免费层访问限制是当前最大痛点。** 错误信息 "OpenCode's free tier can only be used from within OpenCode" 被多个用户在不同版本、不同平台（pacman 安装、最新版、desktop）上报告，#49433 评论数高达 43 条。开发者反馈集中为三点：一是文档承诺"无锁定、可在任何 agent 中使用 Zen"与实际不符；二是 `opencode serve` 不转发 User-Agent 导致服务器模式直接不可用；三是报错缺乏可操作的解决指引，用户不知道如何切换或升级。

**无头模式的可靠性是自动化用户的生存线问题。** `opencode run` 挂起和零数据流停滞直接导致 CI/agent 任务卡死，无法超时、无法重试、无法退出。用户期待更积极的流监控机制与可配置超时。

**自定义 Provider 的"静默能力降级"伤害信任。** 图片被替换为占位符、attachment 能力默认 false，且无任何警告提示。开发者希望模型能力能被自动探测或至少给出明确配置入口，而不是默默吞掉用户输入。

**桌面端启动体验正被集中优化。** Hona 的一系列 PR 表明官方已意识到打包版启动慢的问题（spawn CLI 读版本号、electron-store 重依赖、browser-pane 模块级加载等）。社区期待这些优化在下一个稳定版中落地。

**SSE 事件过滤逻辑的 Bug 揭示了测试盲区。** worktree 会话所有事件被静默丢弃的问题存在已久（#35917 曾被自动关闭），说明该场景缺乏基础的事件集成测试，建议在 CI 中增加会话类型覆盖。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-19

> 数据来源：github.com/NousResearch/hermes-agent

## 今日速览

今日社区主要围绕**消息交付可靠性**与**MCP 子进程生命周期管理**两大核心问题展开：P1 级 Telegram 消息泄漏与 MCP 死进程导致 gateway 饥饿的缺陷引发大量关注，对应的修复 PR 已提交。与此同时，一个四层 bot-delivery 交付队列系列 PR 进入收尾阶段，cron 调度与桌面端稳定性问题也持续发酵。

## 社区热点 Issues（10 条）

### 1. [P1] hardcoded `stream: True` 导致 DSML 工具调用标记泄漏到 Telegram
**作者**: @madoprivat | **评论**: 1 | **创建**: 2026-09-18
**标签**: `comp/gateway`, `platform/telegram`, `provider/nous`, `provider/deepseek`, `area/streaming`
**链接**: https://github.com/NousResearch/hermes-agent/issues/115475

**摘要**: Gateway API 调用中硬编码了 `stream: True`，导致 DSML 工具调用标记而非实际执行结果被发送到 Telegram 聊天中。**每次交互都会产生原始标记**，严重破坏所有 Telegram 用户的使用体验。这是目前唯一标记为 P1 且直接影响生产可用性的消息交付缺陷。

**社区反应**: 评论数不多但严重性极高，已有人提出流式返回与 DSML 渲染的兼容性问题。

---

### 2. [P1] 死亡的 stdio MCP 子进程导致零超时生命周期自旋，180 秒后饿死 gateway
**作者**: @cat5edopeHA | **评论**: 0 | **创建**: 2026-09-18
**标签**: `comp/tools`, `tool/mcp`, `sweeper:risk-session-state`
**链接**: https://github.com/NousResearch/hermes-agent/issues/115483

**摘要**: 已死亡的 stdio MCP 子进程在健康证明截止后使 MCP 生命周期循环进入**零超时忙循环**，`mcp-event-loop` 占满 CPU 核心并产生足够的 GIL 压力来饿死无关的 gateway 请求。这是一个会话状态管理层面的隐蔽故障，可能导致整个 gateway 不可用。

**社区反应**: 暂无评论，但对应的修复 PR #115485 已提交。

---

### 3. [P2] Agent 在琐碎任务上消耗 60k-100k tokens 却一无所获
**作者**: @SBA-Intelligence | **评论**: 0 | **创建**: 2026-09-18
**标签**: `comp/agent`, `tool/skills`, `area/docker`
**链接**: https://github.com/NousResearch/hermes-agent/issues/115482

**摘要**: 在 Docker 容器中运行 v2026.9.14 镜像，配置多 profile gateway 模式。简单且范围明确的任务消耗 6 万到 10 万 tokens，最终仍需要用户手工完成。报告者明确指出这**不是模型问题**，而是 agent 的任务规划与执行方式存在系统性低效。

**社区反应**: 尚无评论，但 token 成本问题是企业用户最敏感的痛点之一。

---

### 4. [P2] Checkpoint `git add -A` 在 root 拥有的 node-compile-cache 上失败
**作者**: @Datawav | **评论**: 3 | **创建**: 2026-08-04 | **更新**: 2026-09-18
**标签**: `comp/tools`, `tool/file`, `sweeper:risk-session-state`, `sweeper:risk-compatibility`
**链接**: https://github.com/NousResearch/hermes-agent/issues/78888

**摘要**: `tools/checkpoint_manager.py` 的 `DEFAULT_EXCLUDES` 缺少 Hermes 内部的 `node-compile-cache/` 目录。该缓存由桌面/TUI 启动器写入工作目录，可能为 root 所有或部分写入，导致 `git add -A` 中止，受影响目录无法生成 checkpoint。这是一个长期未修复的兼容性问题。

**社区反应**: 3 条评论，属于老 issue 但今天被再次更新，社区持续关注。

---

### 5. [P2] `hermes update` 成功更新后退出码 1："Fleet restart incomplete"
**作者**: @iAstroUnicorn | **评论**: 3 | **创建**: 2026-09-18
**标签**: `comp/cli`, `comp/gateway`, `area/install-update`, `sweeper:risk-compatibility`
**链接**: https://github.com/NousResearch/hermes-agent/issues/115311

**摘要**: Windows 桌面安装且无 gateway 服务（所有运行时均为 Desktop-hosted `serve`）时，`hermes update` 代码更新成功但退出码为 1，提示 "Fleet restart incomplete"。建议的恢复命令 `hermes gateway restart` 也不起作用——因为根本没有 gateway 服务。空的 `fleet_restart_pending` 义务永远无法被满足。

**社区反应**: 3 条评论，Windows 用户与无 gateway 部署场景均受影响。

---

### 6. [P2] Docker 后端的路径补全每次列出目录都触发智能审批 LLM 调用
**作者**: @tshaltout-rgb | **评论**: 0 | **创建**: 2026-09-18
**标签**: `comp/tui`, `tool/terminal`, `backend/docker`, `comp/desktop`, `sweeper:risk-security-boundary`
**链接**: https://github.com/NousResearch/hermes-agent/issues/115478

**摘要**: 自 #112971 合并后，composer 的非本地终端的路径补全通过 `terminal_tool()` 执行 `sh -c` 命令来列出目录。危险命令防护将该命令标记为 `shell` 类型，每次补全都触发 smart-approval LLM 审批。**空闲的 Desktop 每约 4 分钟产生一次模型调用**，造成无意义的 token 消耗与安全审计噪声。

**社区反应**: 暂无评论，但该 issue 引出了 PR #115480 的修复。

---

### 7. [P2] Cron 独立投递回退无界等待；挂起的 cron 作业无法被重启排空跳过
**作者**: @doit2002 | **评论**: 0 | **创建**: 2026-09-18
**标签**: `comp/gateway`, `comp/cron`, `sweeper:risk-session-state`, `sweeper:risk-message-delivery`
**链接**: https://github.com/NousResearch/hermes-agent/issues/115469

**摘要**: `no_agent` cron 作业可能在投递步骤中无限挂起，且挂起的作业永远钉在 `cron.scheduler.get_running_job_ids()` 中。重启/更新排空逻辑只覆盖 chat agent 的 "wedged" 情况，无法跳过这种挂起作业，导致 `hermes update` 卡死。

**社区反应**: 暂无评论，已由 PR #115477 修复。

---

### 8. [P2] Cron 作业经实时调度器分发时丢失 `--script` 的 Script Output 块
**作者**: @zxcould | **评论**: 0 | **创建**: 2026-09-18
**标签**: `comp/cron`, `needs-repro`
**链接**: https://github.com/NousResearch/hermes-agent/issues/115470

**摘要**: 通过 live scheduler 分发的 cron 作业不会注入预运行的 `## Script Output` fact 块，而同样的作业通过 `hermes cron tick` 到临时 `HERMES_HOME` 则工作正常。这意味着真实作业在缺少计算事实的情况下运行，可能产生错误结果。需要复现确认。

**社区反应**: 暂无评论，已由 PR #115484 修复。

---

### 9. [P3] 桌面端 prompt clip 单击时同时展开和折叠，干净状态在鼠标移动时折叠
**作者**: @AnselmD | **评论**: 2 | **创建**: 2026-09-18
**标签**: `comp/desktop`
**链接**: https://github.com/NousResearch/hermes-agent/issues/115462

**摘要**: 聊天历史中折叠的 prompt clip（长用户提示渲染为前 3 行 + 第 4 行灰显）同时兼作编辑器和 checkpoint 恢复，但交互模型存在缺陷：单击即展开又折叠；在干净状态移动鼠标也会触发折叠。阅读和鼠标操作体验受损。

**社区反应**: 2 条评论，桌面端 UI 交互细节问题获得一定关注。

---

### 10. [P3] 插件提供的 secret source 在插件注册前被报告为未知
**作者**: @AndreasBBS | **评论**: 2 | **创建**: 2026-08-18 | **更新**: 2026-09-18
**标签**: `comp/cli`, `comp/plugins`, `area/auth`
**链接**: https://github.com/NousResearch/hermes-agent/issues/89078

**摘要**: 当第三方插件提供的 secret source（如 `passbolt`）列在 `secrets.sources` 中时，Hermes 在启动阶段会报告 "unknown source(s)" 警告，尽管该插件实际上已启用。这是一个启动顺序问题：插件注册晚于配置校验。

**社区反应**: 2 条评论，作为老 issue 今日被更新，可能与近期插件系统改动相关。

---

## 重要 PR 进展（10 个）

### 1. fix(mcp): 死亡 stdio 子进程超过证明截止后重连而非自旋
**作者**: @whyyagswhy | **创建**: 2026-09-18
**标签**: `type/bug`, `comp/tools`, `tool/mcp`, `P1`, `sweeper:risk-session-state`
**链接**: https://github.com/NousResearch/hermes-agent/pull/115485

**摘要**: 修复 #115483。超过健康证明截止且 stdio 子进程已死亡时，supervisor 不再零超时等待自旋，而是走现有的重连逻辑（使过期的 in-flight 调用失败），活跃子进程路径仍将会话标记为已证明。附带 2 个红改绿测试。

---

### 2. fix(routing): 在分发时拒绝被禁止的模型路由
**作者**: @lkz-de | **创建**: 2026-09-18
**标签**: `type/feature`, `comp/agent`, `comp/cli`, `comp/gateway`, `comp/cron`, `P3`, `sweeper:risk-message-delivery` 等
**链接**: https://github.com/NousResearch/hermes-agent/pull/115486

**摘要**: 新增一个可选的路由策略，可拒绝 provider、model 和 endpoint-host 路由。该策略在解析、持久化以及内置主/流式/Codex/辅助/压缩/摘要/cron 分发前强制执行，且拒绝是终止性的。这为企业安全合规提供了精确的模型路由管控。

---

### 3. fix(bot-delivery): 排空每个 profile home，永不过期未尝试投递的记录（第 4/4 层）
**作者**: @yoyodine-industries | **创建**: 2026-09-18
**标签**: `type/bug`, `comp/gateway`, `comp/tools`, `P2`, `area/sessions`, `area/profiles`, `sweeper:risk-message-delivery`
**链接**: https://github.com/NousResearch/hermes-agent/pull/115013

**摘要**: 四层系列最后一层。后台排空器扫描并排空**每个** profile home（不只是默认的），且从不丢弃未提供给 live turn 的记录。已被占用的记录保持钉住状态直到可被安全处理。使整个交付存储真正排空。

---

### 4. feat(peer-send): 忙目标回执、持久投递队列、内容键去重（第 3/4 层）
**作者**: @yoyodine-industries | **创建**: 2026-09-18
**标签**: `type/bug`, `comp/agent`, `comp/cli`, `comp/gateway`, `comp/tools`, `P2`, `area/sessions`, `sweeper:risk-message-delivery`
**链接**: https://github.com/NousResearch/hermes-agent/pull/115010

**摘要**: 忙目标不再视为投递失败，发送方重试也不再产生重复消息。目标 Bot Chat 被其他 surface 持有时，返回 §3.1 回执（`status="queued"`, `retryable=false`），消息进入持久化投递队列。

---

### 5. feat(turn-lease): 等待窗口内失去租约的入站投递进入队列（第 2/4 层）
**作者**: @yoyodine-industries | **创建**: 2026-09-18
**标签**: `type/bug`, `comp/agent`, `comp/tools`, `P2`, `sweeper:risk-session-state`, `area/sessions`
**链接**: https://github.com/NousResearch/hermes-agent/pull/115009

**摘要**: 第 2 层。无法在等待窗口内取得会话 turn 租约的 turn 原本直接返回 `session_turn_lease_timeout` 并丢弃入站消息，现在改为将等待过程发布为可持久化的排队事件，保留消息而非丢失。

---

### 6. fix(bot-live-delivery): 投递目标必须可证明为活跃（存储第 1/4 层）
**作者**: @yoyodine-industries | **创建**: 2026-09-18
**标签**: `type/bug`, `comp/tools`, `P2`, `sweeper:risk-message-delivery`
**链接**: https://github.com/NousResearch/hermes-agent/pull/115003

**摘要**: 落地 Bot Chat 持有者邮箱投递存储，修复三种可能卡住邮件或阻塞通道的情况：活跃仅表示"进程存在"、一条不可读的记录杀死后续 spool 扫描、排队记录钉住等。这是四层系列的基石。

---

### 7. fix(cron): 为独立发送通道添加墙钟超时
**作者**: @liuhao1024 | **创建**: 2026-09-18
**标签**: `type/bug`, `comp/cron`, `P2`, `sweeper:risk-message-delivery`, `sweeper:risk-compatibility`
**链接**: https://github.com/NousResearch/hermes-agent/pull/115477

**摘要**: 修复 #115469 的 Defect A。`cron/scheduler_delivery.py::_standalone_send()` 原本在裸 `asyncio.run(coro)` 下无墙钟边界运行，现在为独立投递通道增加最大运行时间，避免挂起 cron 作业阻塞重启排空。

---

### 8. fix(tui): 预确认后端路径补全列表命令
**作者**: @liuhao1024 | **创建**: 2026-09-18
**标签**: `type/bug`, `comp/tui`, `tool/terminal`, `P2`, `sweeper:risk-security-boundary`, `comp/desktop`
**链接**: https://github.com/NousResearch/hermes-agent/pull/115480

**摘要**: 修复 #115478。composer 的远程后端路径补全通过 `terminal_tool()` 执行只读 `sh -c` 脚本，危险命令防护将其归类为 `shell` 类型。此 PR 在执行前预确认该命令，避免每次补全都触发 smart-approval LLM 审批，消除空闲 Desktop 每 4 分钟产生模型调用的问题。

---

### 9. fix(cron): 当分发快照缺少 script 时从存储中回填
**作者**: @whyyagswhy | **创建**: 2026-09-18
**标签**: `type/bug`, `comp/cron`, `P2`
**链接**: https://github.com/NousResearch/hermes-agent/pull/115484

**摘要**: 修复 #115470。盲 cron 运行（完全无 script 段）意味着 prompt 构建时 `job.get("script")` 为假值。现在 `_prepare_job_prompt` 在配置门控前先从存储记录中原位回填 script。完整快照跳过重读，仓库内路径行为一致；存储读取失败优雅降级为原始行为。

---

### 10. fix(desktop): 设置页配置标签页按 profile 重新播种并处理超时
**作者**: @xthezealot | **创建**: 2026-09-18
**标签**: `type/bug`, `area/config`, `P2`, `sweeper:risk-session-state`, `comp/desktop`
**链接**: https://github.com/NousResearch/hermes-agent/pull/115479

**摘要**: 配置驱动的设置标签页（Model、Chat、Safety、Browser、Memory & Context、Voice、Advanced）在切换 profile 后可能永远停留在骨架屏——包括切回已渲染过的 profile。React Query 不在 `isFetching` 状态导致重试不出现。此 PR 修复了跨 profile 切换时的重新播种与超时处理。

---

## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注的功能方向：

### 1. 消息交付可靠性（高频关键词）
四层 bot-delivery 系列（#115003 → #115009 → #115010 → #115013）完整覆盖了 **投递目标活跃性证明、turn 租约排队、忙目标回执、全 profile 排空** 四个层面。同时 `sweeper:risk-message-delivery` 标签在大量 issue 中反复出现。社区对**消息不丢失、不重复、不阻塞**有强烈诉求。

### 2. MCP 子进程生命周期管理
#115483 + #115485 组合拳显示社区对 **MCP 死进程检测、重连、健康证明** 机制的关注。stdio 子进程故障不应导致 gateway 整体饥饿，需要更健壮的进程监督模型。

### 3. Cron 调度健壮性
三条 cron 相关 issue 今日集中出现：无界等待（#115469）、script 快照丢失（#115470）、独立投递通道超时（#115477 PR）。社区需要 cron 作业在异常情况下**可超时、可跳过、可重试**，不能成为更新流程的阻塞点。

### 4. 桌面端与 TUI 的稳定性与性能
prompt clip 交互问题（#115462）、路径补全误触发 LLM 调用（#115478 + #115480）、设置页跨 profile 重新播种（#115479）——社区对 **桌面端体验细节** 的关注持续上升，特别是避免无意义的模型调用浪费。

### 5. 企业级安全与合规
模型路由策略（#115486）、凭据库 opt-in（#115438）、命令执行预确认（#115480）——这些 PR 反映社区需要**更精细的安全管控**，包括路由白名单/黑名单、敏感功能默认关闭、以及危险命令的可审计执行。

### 6. 插件生态扩展
`githermes`（#115488）和 `Locus`（#115476）两个插件目录 PR 同时出现，表明社区活跃地贡献插件。同时插件注册与配置校验的顺序问题（#89078）也受到关注。

---

## 开发者关注点

### 1. Token 成本失控是最核心的痛点
#115482 报告了简单任务消耗 6 万到 10 万 tokens 的极端案例。结合 #115478 中路径补全触发 LLM 审批调用的问题，开发者普遍反映 **Hermes 在非必要的环节产生了大量模型调用**。token 效率优化应成为最高优先级。

### 2. 更新/重启流程脆弱
`hermes update` 在成功更新后仍以退出码 1 结束（#115311）、cron 挂起作业阻塞重启排空（#115469）——**更新流程的可靠性**在多个平台（Windows 桌面、Docker VPS）上出现问题，直接影响用户对版本升级的信心。

### 3. 安全检查误报与安全边界冲突
危险命令防护将只读目录列举归类为 `shell` 命令并触发 LLM 审批（#115478）；`web_extract` 将 DNS 解析失败标记为私有地址阻断（#115487 PR）。开发者希望安全机制**精确区分真正的威胁与无害操作**，避免噪声淹没真实告警。

### 4. 平台兼容性缺口
Android/Termux 被错误映射到 glibc 目标三元组（#115481）、Windows 无 gateway 场景下的更新流程缺陷（#115311）——**非标准 Linux 环境和桌面优先的部署模式**需要更细致的平台检测与适配。

### 5. 配置与插件系统的启动顺序
插件提供的 secret source 在插件注册前被标记为未知（#89078）、API-only 模式下发出无意义的用户白名单警告（#115439）——**配置校验与插件加载顺序**需要协调，消除误导性的启动警告。

---

*本日报由 AI 自动生成，数据基于 GitHub 公开信息，仅供参考。*

:::
