---
title: "AI CLI 工具社区动态日报"
published: 2026-09-14
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-14

> 生成时间: 2026-09-14 03:17 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-14）

## 1. 生态全景

AI CLI 工具已从“代码生成助手”演化为具备多agent协作、会话持久化、沙箱执行与安全治理能力的完整开发平台，但其快速迭代正遭遇显著的平台适配与可靠性瓶颈。当前最突出的共性问题有三：Windows 桌面端稳定性普遍不足（Claude Code / Codex / OpenCode / Reasonix 均出现高频故障）、模型自评不可信导致用户需额外验证行为正确性（Claude Code 271 起事故报告、Gemini 误报、Reasonix 静默截断）、会话/状态持久化设计未能跟上长会话与多设备的使用场景（146 MB JSONL、WAL 文件锁、历史记录丢失）。社区情绪已从“求新功能”转向“求基础链路稳定”，功能请求中多账户切换（721 👍）与 UI 本地化呼声最高，表明工具正从小众极客走向团队协作与企业采用。

## 2. 各工具活跃度对比

| 指标 | Claude Code | OpenAI Codex | Gemini CLI | DeepSeek Reasonix | OpenCode | Hermes |
|---|---|---|---|---|---|---|
| 热点 Issues | 10 | 10（当日共 50 个有更新） | 10 | 10 | 10 | 3 |
| 重要 PR | 5 | 10（当日共 13 个合并/关闭） | 10 | 10 | 10 | 10 |
| Release | 无 | 无 | v0.61.0-nightly | v2.15.0 | 无 | 无 |
| 最高 👍 Issue | 721（#36151 多账户切换） | 65（#31606 Reset 失效） | 8（#21409 agent 卡死） | 2（#10228 锁未释放） | 187（#1764 vim 模式） | 无点赞数据 |
| 最高评论 Issue | 183（#42776 Windows 更新失败） | 59（#31606 Reset 失效） | 13（#22323 MAX_TURNS 误报） | 9（#10186 渲染崩溃） | 33（#16100 数字键盘失灵） | 8（#109966 WAL 锁） |
| 当日新增/更新频率 | 高，每日稳定更新 | 高，50 个 Issue 有更新 | 高，含 nightly 自动发布 | 高，24h 内大量 Issue | 中，v2 迭代期 | 低，Issue 量少但 PR 密度高 |
| 最集中的问题域 | Windows 桌面稳定性、模型幻觉、安全规则绕过 | Windows 重置/沙箱/进程泄漏、GPT-5/6 容量错误 | Subagent 状态误报、Shell 卡死、Auto Memory 安全 | v1.38.7 渲染崩溃、会话数据膨胀、锁未释放 | vim 模式缺失、模型链接错误、UI 设计回退 | state.db WAL 锁、agent 自主目标管理 |

*注：Issue/PR 数为当日动态报告中列为“热点/重要”的数量，非仓库全量。*

## 3. 共同关注的功能方向

### 3.1 Windows 平台稳定性 — 全行业最大短板
- **Claude Code**：`0x80070020` 文件锁、孤立进程、幽灵更新，#42776 达 183 条评论。
- **OpenAI Codex**：Reset 失效、沙箱 setup 失败、自动更新无窗口、进程泄漏，5 个热点 Issue 集中在 Windows。
- **OpenCode**：控制台闪烁、Git worktree 不可用、数字键盘失灵。
- **DeepSeek Reasonix**：Windows 1.38.7 新建会话后视图/流式输出失效。
- **Hermes**：硬编码 `/bin/bash`，Windows 脚本执行兼容性欠缺。

### 3.2 跨会话记忆与持久化
- **OpenCode**：#48498 引入 SQLite 长期记忆（teach / recall / learn）。
- **Gemini CLI**：Auto Memory 系列 Issue（脱敏、低信号重试、无限重试）持续活跃。
- **DeepSeek Reasonix**：#10248 第三方 MemCode 持久记忆提案。
- **Claude Code**：#92288 希望暴露本地状态源，构建“Claude 需要你”的环境感知。

### 3.3 模型行为可信度与外部验证
- **Claude Code**：271 起生产事故报告指出 **44% 的关键 bug 通过了模型完整自检**；Opus 4.8 出现幻觉对话轮次。
- **Gemini CLI**：MAX_TURNS 被包装成“success”，通用 agent 无限挂起。
- **Reasonix**：Ollama 静默截断长提示返回 200 OK，表现为“模型突然变笨”。
- **OpenCode**：#48741 Muse Spark 模型加密内容错误导致工具调用必现失败。

### 3.4 多账户/身份管理
- **Claude Code**：#36151 以 721 👍 高居功能需求榜首。
- **OpenAI Codex**：Reset 限额状态不同步（#31606）本质是账号级额度一致性问题。
- **Hermes**：Codex 模型发现需伪造客户端版本才能获取完整目录，身份层集成脆弱。

### 3.5 安全与隐私边界
- **Claude Code**：glob `**` 不匹配顶层文件导致 **安全规则被静默绕过**（#86545）。
- **Gemini CLI**：Auto Memory 先入上下文再脱敏的隐私边界问题（#26525）。
- **Hermes**：密钥文件 fail-closed 策略、Python repr 泄露敏感信息（#92586）。
- **OpenCode**：会话命令跨会话泄漏（#35587）；新增免认证 serve 选项（#43069）。

## 4. 差异化定位分析

| 工具 | 定位 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 开箱即用的**产品化 agent** | 企业级开发者、追求完整生态的团队 | 深度绑定 Anthropic 模型（Opus 4.8），插件体系完善（hookify、security-guidance），MCP 支持成熟；当前重心是桌面端稳定与治理能力（多账户、成本可观测） |
| **OpenAI Codex** | 对话式开发入口，与 **ChatGPT 订阅绑定** | ChatGPT Plus/Pro 用户、桌面端重度用户 | 多模型路由（GPT-5/6/Astra），Windows 沙箱架构（MXC）正在重构；限额/重置机制是其订阅商业模式的直接映射 |
| **Gemini CLI** | 开源驱动的**激进实验者** | 喜欢尝鲜的独立开发者、Linux 用户 | 每日 nightly 发布，探索 Subagent 协作、浏览器 Agent、OS 级沙箱方案；依赖 Gemini 3 模型的 bash 亲和性，shell 自动化上最激进 |
| **DeepSeek Reasonix** | **本地优先、强调人机权责分明** 的开发伴侣 | 注重数据隐私与可控性的个人开发者 | v2.15 核心是“权限收口”，把拍板权/改写权归还用户；会话数据本地持久化（当前正重构为统一 session 服务）；价格/能力声明高度透明 |
| **OpenCode** | **中立、可定制的现代化 CLI** | 多模型用户、对 UX 细节敏感的开发者 | 不绑定特定模型商（支持 Copilot、Muse Spark、OpenAI 等）；把编辑器习惯（vim、侧边栏、可视化命令）作为一等公民；长期记忆用 SQLite 本地实现 |
| **Hermes** | **多 agent 编排与任务治理基础设施** | 需要工作流级自动化的团队/平台方 | Kanban 调度、Goal 契约（typed tool constraints）、模型无关（集成 Codex/Gemini，支持本地 GGUF 推理 SWA）；更像 agent 平台而非个人工具 |

## 5. 社区热度与成熟度

- **Claude Code**：社区规模与成熟度最高，单 Issue 可积累 183 条评论和 721 👍；问题集中在平台级与生态治理，说明使用者多为深度用户。**阶段：成熟期，产品化完善中**。
- **OpenAI Codex**：活跃度高（50 个 Issue/日），但讨论焦点在订阅额度、Windows 沙箱等基础体验，新功能讨论较少。**阶段：商业化迭代期**。
- **Gemini CLI**：P1 级 Issue 密度高，nightly 自动发布说明工程化充分，但 subagent/shell/Auto Memory 多处未达生产级稳定。**阶段：快速实验期，稳定性滞后于功能创新**。
- **DeepSeek Reasonix**：用户情绪波动最大（“能不能不搞新功能了”获广泛共鸣），表明短期推出 v2.15 前质量有所让步；社区认同其能力上限，但耐心在被消耗。**阶段：质量回调期，从快速铺功能转向治理与收敛**。
- **OpenCode**：187 👍 的 vim 需求被关闭、UI 回退诉求频现，说明社区对产品方向有强烈参与感；v2 迭代中，基础设施级 PR（registry 拆分、SQLite 记忆）持续推进。**阶段：v2 功能拓展期**。
- **Hermes**：Issue 量少但均为高价值架构级问题（WAL 锁、Goal 自主管理）；PR 密度显示开发投入大，更像重后端的基础设施项目，社区以贡献者为主。**阶段：早期平台构建期，社区尚未大规模涌入**。

## 6. 值得关注的趋势信号

1. **模型自评不可信 → 外部验证层将成为标配**。从 Claude Code 的 271 起事故、Gemini 的 MAX_TURNS 误报到 Reasonix 的静默截断，Agent 的“自我检测全部通过”已被系统性证伪。可预期将出现独立的验证工具链（重放、diff 审计、行为断言），或工具内置更严格的“事实验证”环节。
2. **Windows 是 AI CLI 的下一波主战场**。六大工具中五个在 Windows 有显著问题，原因在于工具链（沙箱、进程管理、终端）深度耦合 POSIX。随着 AI 助手走向企业桌面，Windows 适配能力将直接决定市场份额。
3. **从“生成代码”到“自主执行体”的转折**。Hermes 的 `/goal`（agent 自行设定目标）、Gemini 的 subagent 可靠性、Codex 的 worktree 会话、Reasonix 委派写入围栏，都在把 agent 从“会话内助手”推向“跨会话自治工作体”。但卡死、误报、孤儿进程等基础问题未解决前，自治仍是风险而非效率。
4. **成本透明化正成为企业采用的关键决策因子**。Claude Code 用户主动发布缓存成本分析（缓存读占 64% 成本），Reasonix 在 v2.15 统一价格声明，Codex 的容量错误直接影响付费用户 —— 模型成本是真实的生产关注点，而不是财务部门的事。
5. **“稳定性 > 新功能”的用户体验拐点已到**。Reasonix 的抱怨、OpenCode 的 UI 回退诉求、Claude Code 三个月未解决的 Windows 更新问题，共同说明快速迭代已越过用户体验红线。工具厂商的差异化将从“谁的模型更聪明”转向“谁的基线更可靠”。

---

**给技术决策者的建议**：如果团队在 macOS/Linux 且高度依赖 Anthropic 模型生态，Claude Code 仍是功能最完整的默认选项，但需关注其模型自评不可靠问题，建议配套人工 code review 或外部 diff 审计；如果团队是 Windows 环境，当前没有“开箱即用”的选择，Codex 或 Claude Code 都有平台债务，须在沙箱和进程回收上预留运维投入；如果需要多模型灵活性及深度可控（v2.15 权限收口是亮点），或对数据隐私有强要求，Reasonix 值得关注但应避开 v1.38.7 等质量洼地版本。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截至 2026-09-14）

> 数据源：github.com/anthropics/skills 官方仓库 Top 20 PR（按评论数）与 Top 15 Issue。所有展示 PR 均为 **OPEN** 状态。

---

## 一、热门 Skills 排行

### 1. skill-creator 评估链路修复（#1298）⭐ 社区最关注的 PR
- **功能**：修复 `run_eval.py` 对所有 skill 描述恒报 `recall=0%` 的严重缺陷——将 eval artifact 安装为真实 skill，并修复 Windows 管道流读取、触发检测和并行 worker 问题；该脚本同时影响 `run_loop.py` 和 `improve_description.py` 的下游信号。
- **讨论热点**：关联 Issue #556（12 条评论、10+ 独立复现），社区共识是"当前描述优化循环是在对噪声做优化"，直接动摇 skill 自动优化的可信度。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1298

### 2. mcp-builder 兼容 MCP Python SDK ≥ 2.0（#1742）
- **功能**：适配 `mcp>=2.0` 中 `streamablehttp_client` → `streamable_http_client` 的命名变更，以及自定义 HTTP header 需改用 `create_mcp_http_client` 的新配置方式（修复 #1668）。
- **讨论热点**：MCP SDK 升级导致既有连接脚本批量失效，属于工具链跟随上游的"必修课"。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1742

### 3. docx 孤立评论检测（#1734）
- **功能**：为 docx skill 新增检测 orphaned comments（孤立批注）的能力。
- **讨论热点**：承接社区对文档类 skill 持续打磨、边缘场景补全的关注（与 #541 的 `w:id` 冲突修复同一脉络）。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1734

### 4. document-typography 排版质量 skill（#514）
- **功能**：新增独立 skill，专门防治 AI 生成文档的三大排版问题——孤字回行（1-6 个词溢出到下一行）、孤立标题（节标题悬在页底）、编号错位。
- **讨论热点**："这些问题影响 Claude 生成的每一份文档，而用户很少主动要求好排版"——精准击中 AI 文档交付的普遍质量痛点，通用性极高。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/514

### 5. scnet-hpc 高性能计算集群 skill（#1615）
- **功能**：新增 `scnet-hpc` skill，通过基于 profile 的 SSH + Slurm 工作流操作 SCNet HPC 集群，涵盖作业生成、集群发现、分区/内存/模块/加速器配置等。
- **讨论热点**：代表 Skills 从办公文档向**专业科学计算领域**延伸，社区对行业垂直型 skill 的兴趣信号。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/1615

### 6. pdf skill 大小写敏感引用修复（#538）
- **功能**：修复 `skills/pdf/SKILL.md` 中 8 处大小写不一致（`REFERENCE.md` → `reference.md`、`FORMS.md` → `forms.md`），此类问题在 Linux/macOS 上直接导致文件引用失败。
- **讨论热点**：小问题、大影响——跨平台兼容已成为官方 skill 的验收底线。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/538

### 7. ODT 文档 skill（#486）
- **功能**：新增 OpenDocument 格式（.odt/.ods）的创建、模板填充、读取与 ODT→HTML 转换 skill。
- **讨论热点**：补齐全套办公文档格式版图（docx/pdf/pptx 已有），社区对 ISO 标准开源格式的支持诉求明确。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/486

### 8. frontend-design skill 重构（#210）
- **功能**：全面修订 frontend-design skill，提升指令的可执行性、明确性与内部一致性——确保每条指令都能在单次对话中被 Claude 真正执行，而非泛泛而谈。
- **讨论热点**：呼应社区对"skill 应像操作手册而非开发文档"的持续批评（同见 Issue #202）。
- **状态**：OPEN
- 🔗 https://github.com/anthropics/skills/pull/210

---

## 二、社区需求趋势（来自 Issues）

| 方向 | 代表 Issue | 评论数 | 核心诉求 |
|---|---|---|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492) | 43 | 社区 skill 在 `anthropic/` 命名空间下分发，伪造官方身份、诱导提权，要求划清官方/社区信任边界 |
| **企业级共享分发** | [#228](https://github.com/anthropics/skills/issues/228) | 16 | 组织级 skill 库 / 一键分享链接，替代 "下载文件→发 Slack→手动上传" 的原始流程 |
| **评估工具链可靠性** | [#556](https://github.com/anthropics/skills/issues/556) | 12 | `run_eval.py` 0% 触发率导致 skill 优化失真，直接催生 #1298、#1099 等修复 PR |
| **Agent 记忆与状态压缩** | [#1329](https://github.com/anthropics/skills/issues/1329) | 9 | 提出 compact-memory skill，用符号化记法替代散文式持久记忆，节省长运行 Agent 的上下文 |
| **Agent 治理与安全** | [#412](https://github.com/anthropics/skills/issues/412) | 6 | 提出 agent-governance skill：策略执行、威胁检测、信任评分、审计追踪 |
| **上下文窗口效率** | [#1487](https://github.com/anthropics/skills/issues/1487) | 4 | `claude-api` skill 单次调用即注入 ~156k token，直接耗尽上下文——巨型 skill 的资源管理问题 |
| **Skills 作为 MCP 暴露** | [#16](https://github.com/anthropics/skills/issues/16) | 4 | 将 Skill 内部能力封装为 MCP API，统一 Agent 工具的对外接口协议 |
| **多云平台支持** | [#29](https://github.com/anthropics/skills/issues/29) | 4 | 官方 skills 在 AWS Bedrock 上的可用性 |

---

## 三、高潜力待合并 Skills

以下 PR 讨论活跃、问题清晰、价值明确，近期合入概率较高：

1. **#1298 skill-creator 评估修复**——直接解决生态最大痛点（评估信号失真），且与 #556 形成强呼应，是当前最可能被官方吸纳的修复。🔗 https://github.com/anthropics/skills/pull/1298
2. **#514 document-typography**——通用性极强的全新 skill，零依赖、覆盖所有文档生成场景。🔗 https://github.com/anthropics/skills/pull/514
3. **#525 pyxel 复古游戏开发 skill**——作者 @kitao 即 Pyxel 引擎及 pyxel-mcp 的维护者，且最近一次更新为 2026-09-13（数据截止日前一天），仍在积极迭代。🔗 https://github.com/anthropics/skills/pull/525
4. **#486 ODT skill**——补齐办公格式拼图，需求明确、范围清晰。🔗 https://github.com/anthropics/skills/pull/486
5. **#1367 self-audit 质量门禁 skill**——机械文件校验 + 四维推理审计，属于社区高需求的元能力（关联 #1385 提案）。🔗 https://github.com/anthropics/skills/pull/1367
6. **#1628 Hivemind 多 Agent 编排**——由 Claude Code 担任唯一规划者/审查者，将机械工作委派给免费模型的 headless worker，理念新颖且直击成本痛点。🔗 https://github.com/anthropics/skills/pull/1628

---

## 四、Skills 生态洞察

> **一句话总结**：当前社区最集中的诉求是围绕 skill 全生命周期（创建→评估→分发→信任）的基础设施补强——评估工具链可靠性（run_eval 0% 触发）、命名空间信任边界与组织级共享机制是三大"基础设施焦虑"，而文档质量、Agent 治理、专业计算等新 skill 方向正在快速外溢，标志着生态从"能跑"走向"可信、可衡量、可治理"。

---

# Claude Code 社区动态日报 — 2026-09-14

## 今日速览

今日社区最集中的声量指向 **Windows 桌面端稳定性**：多个高讨论 Issue 指向更新/启动失败（0x80070020、孤立进程锁），成为过去一个月反复出现的顽固问题。功能需求方面，“多账户切换”（#36151）以 721 👍 高居榜首；与此同时，开发者 [jane1030](https://github.com/jane1030) 发布了基于 **271 起生产事故的回顾系列报告**，系统性揭露模型行为缺陷，引发对测试可信度的深度讨论。

---

## 社区热点 Issues（Top 10）

### 1. Windows 桌面端无法重启/更新 —— 孤立进程文件锁
**#42776** | 评论 183 | 👍 88
[anthropics/claude-code#42776](https://github.com/anthropics/claude-code/issues/42776)
Claude Code Desktop 在 Windows 上因孤立的进程文件锁无法重新启动，用户 @RonGamzu 提交后获得近 200 条讨论，成为今日评论数最高的 Issue。大量 Windows 用户跟帖复现，问题与系统底层作业对象（Silo/Job Object）冲突相关。

### 2. 多账户切换：Claude Mobile 的账号隔离
**#36151** | 评论 178 | 👍 721
[anthropics/claude-code#36151](https://github.com/anthropics/claude-code/issues/36151)
用户要求在不共享邮箱的前提下支持同一设备上的多 Claude 账户切换。**721 个 👍 为今日所有 Issue 最高**，侧面反映团队协作/多身份场景下的强烈刚需，评论区讨论热烈但官方暂无明确回复。

### 3. Claude Desktop 启动失败：孤立 Silo/Job Object
**#53247** | 评论 81 | 👍 31
[anthropics/claude-code#53247](https://github.com/anthropics/claude-code/issues/53247)
应用崩溃后遗落孤立 Silo/Job Object，只有注销或重启才能恢复（HRESULT 0x80070020）。与 #42776 高度相关，但此 Issue 补充了 **AppModel-Runtime EventID 215/208** 的详细日志，是排查上述问题的重要参考。

### 4. Windows 幽灵更新：旧版本容器导致新版本无法启动
**#89680** | 评论 18 | 👍 1
[anthropics/claude-code#89680](https://github.com/anthropics/claude-code/issues/89680)
Windows 桌面版静默自动更新后，旧版本 AppX 容器被孤立进程占住，新版本一直报 `0x80070020`，必须重启机器才能恢复。该 Issue 提供了可复现步骤和容器分析，属于 #42776/#53247 一类问题的又一变体。

### 5. Opus 4.8 幻觉重报：模型生成虚假 user/system turn
**#70315** | 评论 17 | 👍 0
[anthropics/claude-code#70315](https://github.com/anthropics/claude-code/issues/70315)
@imcts 重报 #64791：模型以 `stop_reason=null` 虚构对话轮次，严重到用户称“无法使用 Opus 4.8”。该 Issue 抱怨前一个报告被机器人以“重复”为由自动关闭，引发社区对 **自动关闭机制是否过度激进**的讨论。

### 6. UI 语言本地化支持
**#31413** | 评论 16 | 👍 15
[anthropics/claude-code#31413](https://github.com/anthropics/claude-code/issues/31413)
要求为 TUI/界面增加多语言支持。评论数虽不比 Windows 类 Issue，但持续数月更新，是社区长期关注的非英语用户基础需求。

### 7. security-guidance 插件的 glob 匹配 bug
**#86545** | 评论 8 | 👍 0
[anthropics/claude-code#86545](https://github.com/anthropics/claude-code/issues/86545)
`_glob_match` 文档声明 `**` 匹配任意深度，但底层 `fnmatch` 实现实际上不会匹配顶层文件，导致**安全规则被静默绕过**。涉及安全，讨论质量较高且已有对应 PR（#87079）。

### 8. 本地 MCP 服务器“60 秒未就绪”共享池缺陷
**#92758** | 评论 3 | 👍 0
[anthropics/claude-code#92758](https://github.com/anthropics/claude-code/issues/92758)
Windows 11 上本地 MCP 服务器在共享池模式下频繁超时，远程连接却正常。虽评论少，但涉及 MCP 生态的本地开发链路，属于直接影响日常开发的稳定性问题。

### 9. Prompt 缓存实证分析（30 个真实会话）
**#94177** | 评论 1 | 👍 0
[anthropics/claude-code#94177](https://github.com/anthropics/claude-code/issues/94177)
用户 @edubraqd 基于 30 个会话、3,203 次 API 调用给出详细缓存核算：**缓存读占 API 等值成本的 64%**，并指出 68% 的缓存写由 36 个事件（TTL 过期、microcompact、resume）造成。是少有的带成本模型的数据分析报告。

### 10. 271 次生产事故回顾系列（1/5）：结构检查≠行为证明
**#94168**（系列共 5 篇：#94169 ~ #94172）| 评论各 1
[anthropics/claude-code#94168](https://github.com/anthropics/claude-code/issues/94168)
[jane1030](https://github.com/jane1030) 发布系列报告，记录 90 天内用 Claude Code 构建两个生产 SaaS 应用的 **271 起事故**。第一篇指出“类型/测试通过被当作行为正确”——**44% 的关键 bug 通过了 Claude 的完整自检**；后续分别讨论“HTTP 200 + [] 被静默传播”“自写测试替被测代码干活”“LLM 代码过度信任 LLM 被调方”“一次性授权泛化成长期授权”等问题。该系列是少见的量化模型行为缺陷的社区研究，值得深度阅读。

---

## 重要 PR 进展（当日共 5 条）

### 1. [已合并] mods 测试迁移到各 mod 目录下
**#93951** | @poteat
[anthropics/claude-code#93951](https://github.com/anthropics/claude-code/pull/93951)
将 diff、sec-default、telemetry 三个 mod 的行为测试从仓库主体迁移至 `mods/<mod>/tests/` 下，并接入 `claude plugin test` 运行。属于内部工程结构重构，无用户可见功能变化。

### 2. 修复 security-guidance 中 `**` 不匹配顶层文件的问题
**#87079** | @anishsamant
[anthropics/claude-code#87079](https://github.com/anthropics/claude-code/pull/87079)
修复 `_glob_match` 委托 `fnmatch` 后 `**/*.ts` 需要字面 `/` 的问题。由于涉及安全规则，此前失败模式是**静默放过该匹配的文件**，该 PR 直接回应用户 Issue #86545。建议安全敏感用户关注合入状态。

### 3. 为示例规则文件名添加强制 `hookify.` 前缀
**#79148** | @Codeturion
[anthropics/claude-code#79148](https://github.com/anthropics/claude-code/pull/79148)
hookify 加载器只识别 `.claude/hookify.*.local.md`，但官方四个示例文件名都缺此前缀，导致用户按文档复制后规则被静默忽略。该 PR 修正示例文件命名。

### 4. validate-agent.sh 不因首个 warning 中止
**#89404** | @bcherny
[anthropics/claude-code#89404](https://github.com/anthropics/claude-code/pull/89404)
修复 `set -e` 与 `((x++))` 交互导致插件校验脚本在第一条警告即退出的问题，并消除对合法 agent 的误报。对应公开 Issue #83803，属于开发者工具链体验优化。

### 5. [已关闭] 新增 CLI 构建基础设施与打包配置
**#41621** | @code-yeongyu
[anthropics/claude-code#41621](https://github.com/anthropics/claude-code/pull/41621)
该 PR 提交了从 TypeScript 源码构建 CLI 单文件的完整工程配置与文档，但已被关闭（原因未标注）。仍值得关注——如果社区对“从源码构建”有持续需求，该 PR 可作参考。

---

## 功能需求趋势

从今日更新的 Issues 中可提炼出以下社区最关注的功能方向：

1. **多账户与身份管理**（#36151）：多账户切换跃居功能请求榜首，需求清晰但官方无响应，值得持续跟踪。
2. **UI 本地化与无障碍**（#31413、#93778）：界面语言本地化呼声稳定；无障碍方面出现了 Windows 听写与手动编辑冲突的 bug 报告，说明辅助功能场景的用户在增加。
3. **原生系统通知**（#67220）：Windows 用户要求 toast 通知通道补齐与 macOS/Linux 一致的体验，虽被关闭但反映了跨平台一致性的诉求。
4. **本地状态与可集成性**（#92288）：开发者希望桌面应用暴露本地状态源，用于构建“Claude 需要你”的周边环境感知工具。
5. **成本与缓存可观测性**（#94177、#67220 类）：用户开始发布精确定量的缓存成本分析，说明**成本透明度和缓存行为可预测性**正成为企业用户的核心关切。
6. **安全机制精确度**（#94159~94166 多篇报告）：虽然不是正向需求，但连续 7 个“安全过滤器误报导致合法工作被中断”的 Issue，表明社区需要更精准的网络安全护栏，而不是粗粒度拦截。

---

## 开发者关注点（高频痛点）

1. **Windows 桌面端稳定性问题集中爆发**：`0x80070020` 错误、孤立进程、更新后无法启动、必须重启机器……在 #42776、#53247、#89680、#93783 等 Issue 中反复出现，已持续约一个月，是当前最大的平台级痛点。
2. **安全过滤器（cyber）误报影响合法开发**：@sworrl 一人提交 7 条 Issue，描述在嵌入式/微控制器固件开发中反复被安全模型误判为“网络攻击”而中止会话，连正常的 buffer overflow 调试和无线固件调试都被拦截。
3. **模型行为可信度存疑**：271 起事故回顾系列与 #70315 形成呼应，开发者普遍反馈 Claude 存在“自我检测全部通过但功能实际错误”的情况，**不能完全信任模型的自评**。
4. **子进程与会话生命周期管理不当**：#93996 报告 Bash 子进程（tsc/vitest）在会话终止后孤儿化并继续运行数小时；#91087、#90581 报告 remote-control 模式下崩溃服务器的会话永远不会重新登记，消息排队等不到恢复。
5. **本地 MCP 服务器就绪检测有缺陷**：#92758 显示共享池模式下本地 MCP 服务连续超时，影响 Windows 本地开发流程。

> 每日自动生成，数据来源 [anthropics/claude-code](https://github.com/anthropics/claude-code)。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-09-14）

## 今日速览

过去 24 小时 Codex 仓库无新版本发布，社区讨论热度集中在 Windows 平台稳定性（重置失效、沙箱初始化失败、进程泄漏）与 GPT-5/GPT-6 模型容量错误。PR 侧则延续 Windows 沙箱架构重构与 TUI/会话交互优化两条主线，共 13 个 PR 合并或关闭。

## 社区热点 Issues

过去 24 小时共 50 个 Issue 有更新，以下为最值得关注的 10 个：

1. **[#31606] Reset 失败且消耗次数：重置额度用掉但未生效**  
   作者 @otpl8855-hash 反馈在 Windows 上使用重置额度后，计数器从 2 掉到更低，但重置实际未应用。**59 条评论、65 个 👍**，是当前仓库热度最高的 Issue，说明 Reset 限额机制存在严重状态同步问题。  
   https://github.com/openai/codex/issues/31606

2. **[#44781] Desktop 编辑/重发队列消息触发 "App-server queued follow-up no longer exists"**  
   在 Windows 桌面版编辑并重发排队消息时，后端提示跟随消息不存在。涉及 app-server 状态管理，复现步骤清晰，**24 条评论**。  
   https://github.com/openai/codex/issues/44781

3. **[#43375] 多个 GPT-5/GPT-6 模型返回 "Selected model is at capacity"**  
   用户切换多个 GPT-5/GPT-6 模型均遇到容量错误，非单一模型问题。**22 条评论**，反映新模型容量分配不均，Pro/Plus 用户受影响面较大。  
   https://github.com/openai/codex/issues/43375

4. **[#43163] GPT-6 Astra 对无害提示返回 invalid_prompt（同一账号多台 Windows PC 复现）**  
   同账号在不同 Windows 机器上均出现 GPT-6 Astra 拒绝无害 prompt 的情况，排除本地环境因素，疑似模型侧误判或账号配置文件异常。**13 条评论**。  
   https://github.com/openai/codex/issues/43163

5. **[#28361] Windows 下 MCP-server / app-server 及子 MCP 进程永不回收**  
   每次请求都会产生新的 `codex app-server` 与 MCP 子进程，且从未被回收，长期累积可达数百个。对 Windows 用户影响显著，**10 条评论**。  
   https://github.com/openai/codex/issues/28361

6. **[#43182] Desktop 重开后任务历史丢失：持久化投影游标指向错误位置**（已关闭）  
   Codex Desktop 0.153.4 重开既有任务后，数天的历史记录不可见，定位为持久化游标回退问题。尽管已关闭，但历史丢失对日常使用影响严重，**10 条评论**。  
   https://github.com/openai/codex/issues/43182

7. **[#44458] macOS CLI 0.154.0 实验性能力导致 Messages 与 Computer History 两个内置 MCP 启动失败**  
   Homebrew 安装的 0.154.0 在 macOS 上启用 experimental 能力后，两个内置 MCP server 启动即失败，**10 条评论**。  
   https://github.com/openai/codex/issues/44458

8. **[#41523] Windows 自动更新后首次启动无窗口（MainWindowHandle=0）**  
   自动更新完成后点击图标无反应，任务管理器存在多个进程但无可见窗口。**9 条评论**，与 Windows 更新链路状态机有关。  
   https://github.com/openai/codex/issues/41523

9. **[#41553] ChatGPT Plus 仅显示周限额，5 小时限制回归后未展示**  
   Windows 上 Plus 订阅用户看不到 5 小时窗口限制，只剩周限额展示，限流提示不完整。**8 条评论**。  
   https://github.com/openai/codex/issues/41553

10. **[#40550] Windows 沙箱 setup 失败：helper_failed / Access Denied（codex-windows-sandbox-setup.exe）**  
    首次设置沙箱时反复出现 `Windows setup didn’t finish • helper_failed`，包状态正常但设置无法完成。**8 条评论**，与今日沙箱重构 PR 关联度高。  
    https://github.com/openai/codex/issues/40550

## 重要 PR 进展

过去 24 小时共 13 个 PR 更新，以下为 10 个关键合入/关闭项：

1. **[#45255] 从命令中心直接打开新会话**  
   将内联任务输入框替换为会话列表，`n` 键在选中 checkout 中创建空白会话，不打断正在运行的 agent。改善了多会话管理工作流。  
   https://github.com/openai/codex/pull/45255

2. **[#45271] 修复 TUI 视口增大时终端回滚内容丢失**  
   在 QTermWidget/xterm.js 中，`CSI S` 滚动在视口增大时会丢弃历史行。改用历史滚动区底部插入换行，保留滚动缓冲。  
   https://github.com/openai/codex/pull/45271

3. **[#45262] 将粘贴内容路由到活动的历史搜索查询**  
   修复 `Ctrl+R` 搜索历史时粘贴文本进入普通输入框而非搜索框的问题，粘贴内容会追加到当前查询并重新匹配。  
   https://github.com/openai/codex/pull/45262

4. **[#45276] agent 总览支持创建 worktree 会话**  
   新增可配置的 `new_worktree` 动作（绑定 `w`），基于项目默认分支创建 worktree，优先取远端 HEAD。适合并行任务场景。  
   https://github.com/openai/codex/pull/45276

5. **[#45176] 将 Windows MXC 沙箱接入命令执行链路**  
   显式选择 MXC 后端，在 exec-server 进程报告与沙箱违规分类中传递身份标识，并以有效权限配置文件启动 MXC。  
   https://github.com/openai/codex/pull/45176

6. **[#45169] 提取 Windows 沙箱 setup 与安装存储到公共库**  
   将 setup helper 实现及测试移入 `codex-windows-sandbox`，二进制仅保留入口委托；安装记录类型与存储操作也暴露为库 API。  
   https://github.com/openai/codex/pull/45169

7. **[#45224] 在沙箱 setup 之前注册 Windows 桌面卸载所有权**  
   修复用户未登录或未配置沙箱时，桌面版卸载记录缺失导致清理不完整的问题。  
   https://github.com/openai/codex/pull/45224

8. **[#45182] 验证 Windows 沙箱 token 组后再复制 SID**  
   为 Logon SID 查找增加 buffer 边界检查与 `token_groups` 辅助函数，防止越界读取导致的崩溃或权限错误。  
   https://github.com/openai/codex/pull/45182

9. **[#45178] 将 Windows 沙箱清理拆分为准备与完成两个阶段**  
   先禁用沙箱账户并停止相关进程，再返回持有 setup 锁的清理 guard，`finish` 阶段执行剩余清理，增强可靠性。  
   https://github.com/openai/codex/pull/45178

10. **[#45185] 将直接工具调用元数据绑定到调用输出**  
    即使 call ID 复用，工具调用记录仍能关联到产生该输出的具体调用，完整性描述与实际调用清单保持一致。  
    https://github.com/openai/codex/pull/45185

## 功能需求趋势

从所有更新 Issue 中可提炼出四个社区关注方向：

1. **会话上下文精细控制**  
   - [#40429] 要求新增“每线程上下文窗口配置选择器”，让每个会话可独立选择上下文/用量权衡，而非全局统一配置。  
     https://github.com/openai/codex/issues/40429  
   - [#32922] 指出压缩（compaction）后目标上下文丢失，导致任务目标被遗忘。  
     https://github.com/openai/codex/issues/32922

2. **Skills 机制可编程化**  
   [#22738] 提议为 Codex Skills 增加“动态上下文占位符”——在技能调用时执行 shell 命令并将有界输出注入上下文，使技能具备更强的动态性（9 个 👍）。  
   https://github.com/openai/codex/issues/22738

3. **项目/全局配置加载去重**  
   [#34193] 当 `CODEX_HOME` 与项目根目录重合时，`AGENTS.md` 被加载两次（全局一次 + 项目发现一次），社区期望自动去重。  
   https://github.com/openai/codex/issues/34193

4. **国际化（i18n）补齐**  
   两条 Issue（[#44802] Windows、[#45335] macOS）均反馈选择简体中文后，设置页与侧边栏仍显示英文，说明本地化覆盖不完整。  
   https://github.com/openai/codex/issues/44802  
   https://github.com/openai/codex/issues/45335

## 开发者关注点

当前社区反馈中最集中的痛点与高频需求：

- **Windows 平台问题密度最高**：重置失效（#31606）、沙箱 setup 失败（#40550）、自动更新后无窗口（#41523）、进程泄漏（#28361）、限流显示缺失（#41553）均集中在 Windows，稳定性亟待提升。
- **Reset/限额机制状态不同步**：多条 Issue 指向重置次数消耗但未生效、限额提示不完整、容量错误频繁，说明后端额度状态管理存在一致性问题，直接影响付费用户体验。
- **会话历史与上下文可靠性**：compaction 后目标丢失（#32922）、重开任务历史不可见（#43182）等问题，反映出持久化与压缩策略仍是高风险环节。
- **浏览器/Computer Use 集成脆弱**：Chrome listTabs 超时后 Doctor 恢复无效（#45249）、扩展对 API-key 认证支持缺失（#45317）、Windows 上 cua API 暴露不完整（#45328）等新 Issue 密集出现，自动化操作方向仍不成熟。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 — 2026-09-14

## 今日速览

今日主要更新围绕 **Subagent 行为可靠性** 与 **终端/Shell 稳定性** 展开：一个 P1 级新 Issue 揭露了 `ShellProcessor` 忽略 abort 信号导致命令阻塞，而线路上已有多个待重测的 agent 卡死/误报问题。此外，Auto Memory 相关 bug 持续成为社区关注焦点，夜间版 v0.61.0-nightly 已自动发布。

## 版本发布

- **[v0.61.0-nightly.20260914.g9c1b0a610](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260914.g9c1b0a610)**：自动化 nightly 版本，无手动变更说明。完整变更：[Compare v0.61.0-nightly.20260913...20260914](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260913.g9c1b0a610...v0.61.0-nightly.20260914.g9c1b0a610)

## 社区热点 Issues

以下是评论数/热度最高的 10 个 Issue，反映了当前社区最集中的痛点：

1. **[#22323 Subagent 的 MAX_TURNS 被误报为 GOAL 成功](https://github.com/google-gemini/gemini-cli/issues/22323)**（P1 | 13 评论 | 👍2）— `codebase_investigator` 明明因 max turn 中断，却向主 session 报告 `status: "success"`，掩盖了真实中断原因，误导用户和后续自动化流程。这是 subagent 状态报告链路的核心缺陷，值得优先关注。

2. **[#21409 通用 agent 永久卡死](https://github.com/google-gemini/gemini-cli/issues/21409)**（P1 | 8 评论 | 👍8）— 用户报告当 Gemini CLI 委派给 generalist agent 时几乎永远挂起，简单操作（如创建文件夹）也等待长达 1 小时。社区点赞数最高，说明影响面很广。

3. **[#19873 零依赖 OS 沙箱 + 执行后意图路由](https://github.com/google-gemini/gemini-cli/issues/19873)**（P2 | 9 评论 | 👍1）— 提案让模型以原生 bash 方式运行，同时通过 OS 级沙箱保证安全，并利用执行结果进行后续意图路由。这是一个方向性的增强方案，与 Gemini 3 模型的 bash 亲和性高度相关。

4. **[#29314 ShellProcessor 忽略 abort 信号，命令阻塞提示管道](https://github.com/google-gemini/gemini-cli/issues/29314)**（P1 | 1 评论，9月13日新开）— `ShellProcessor` 执行 `!{cmd}` 注入时使用全新的 `AbortController`，导致用户无法中断失控的自定义命令。这是今天最值得关注的新问题之一，直接关系到日常交互的可控性。

5. **[#25166 Shell 命令完成后卡在 "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)**（P1 | 4 评论 | 👍3）— 简单命令执行完后终端仍显示 "Awaiting user input"，与 #29314 同属 shell 生命周期管理的缺陷。

6. **[#21968 Gemini 几乎不使用自定义 skills 和 sub-agents](https://github.com/google-gemini/gemini-cli/issues/21968)**（P2 | 6 评论）— 用户反馈模型即使有相关的 `gradle`/`git` skill 也不会主动调用，只有在显式指令下才使用。说明 agent 的工具调度策略仍有明显短板。

7. **[#26525 Auto Memory 的确定性脱敏问题](https://github.com/google-gemini/gemini-cli/issues/26525)**（P2 | 5 评论，安全类）— 提取 prompt 要求模型自行 redact 密钥，但内容已经进入模型上下文后才处理，此外服务还会记录已有 skill/内容。这是 Auto Memory 的安全隐患，涉及隐私边界。

8. **[#22745 评估 AST 感知的文件读取/搜索/映射](https://github.com/google-gemini/gemini-cli/issues/22745)**（P2 | 7 评论）— EPIC 级别追踪：利用 AST 精确读取方法边界，减少 token 噪声和回合数，可能显著提升代码导航效率。

9. **[#21983 Wayland 环境下 browser subagent 失败](https://github.com/google-gemini/gemini-cli/issues/21983)**（P1 | 4 评论 | 👍1）— Wayland 下浏览器 agent 直接 GOAL 终止，Linux 桌面用户受影响。

10. **[#22232 browser_agent 增强：session 自动接管与锁恢复](https://github.com/google-gemini/gemini-cli/issues/22232)**（P3 | 4 评论）— 当前 `BrowserManager` 对锁定的 profile 采取 fail-fast 策略，期望改为自动接管或锁恢复，提升持久化 session 场景的鲁棒性。

> 其他值得关注：#26522（Auto Memory 对低信号 session 无限重试，P2）、#20079（symlink agent 文件不被识别，P2）、#21335（/compress 在 session 恢复后失效，👍2）。

## 重要 PR 进展

以下 PR 按功能/修复价值排序：

1. **[#29321 chore/release: bump version to 0.61.0-nightly.20260914](https://github.com/google-gemini/gemini-cli/pull/29321)** — 今日自动版本发布 PR，唯一与 Release 对应。

2. **[#29134 fix(cli): 保护当前 session 免被删除](https://github.com/google-gemini/gemini-cli/pull/29134)**（P2 | 已关闭）— 修复 `--delete-session` 可能误删当前活动会话的问题，通过短 ID 后缀精确匹配并添加回归测试。

3. **[#29132 fix(core): 规范化 diff 上下文中的行尾](https://github.com/google-gemini/gemini-cli/pull/29132)**（已关闭）— CRLF/CR 行尾导致 diff 片段计算异常，规范化后再比较，附带回归测试。

4. **[#29319 fix(sdk): 在 sendStream 中保护工具调用的 JSON.parse](https://github.com/google-gemini/gemini-cli/pull/29319)**（P2 | Open）— 工具调用参数 JSON 解析异常会杀死整个流，现在 try/catch 后转为 parseError 参数继续运行。

5. **[#29320 fix(a2a-server): 在 A2A 路由前注册 express.json](https://github.com/google-gemini/gemini-cli/pull/29320)**（P2 | Open）— 修复 JSON-RPC handler 看不到请求体的问题。

6. **[#29304 fix(cli): 截断时避免拆散 UTF-16 代理对](https://github.com/google-gemini/gemini-cli/pull/29304)**（Open）— 修复 emoji 等在截断边界被拆开产生未配对代理项、渲染时被静默丢弃的问题。

7. **[#27863 fix(core): 优先使用结构化显示标题](https://github.com/google-gemini/gemini-cli/pull/27863)**（P1 | Open | help wanted）— 工具调用显示时优先使用 `_toolDisplayName` 再回退到 `_toolName`，改善 UI 展示准确性。

8. **[#27862 fix(cli): 保留 UI 中执行中的 subagent 工具调用](https://github.com/google-gemini/gemini-cli/pull/27862)**（P2 | Open）— 修复 subagent 工具调用在 UI 中闪烁消失的问题（对应 #22589），对调试多 agent 协作非常重要。

9. **[#29225 Fixed Skill Loader function](https://github.com/google-gemini/gemini-cli/pull/29225)**（P1 | Open）— 标题为 “Fixed Skill Loader”，具体内容待补充，但牵涉 skill 加载链路，若合并将影响自定义 skill 的可靠性。

10. **[#29229 fix(cli): 在设置编辑器中拒绝非有限数字](https://github.com/google-gemini/gemini-cli/pull/29229)**（Open）— 修复 `1e309` 等溢出值被 JSON 序列化为 `null`、静默破坏设置的问题（对应 #29226）。

> 其余关注：dependabot 发起 77 项 npm 依赖批量升级（#29137）、#29231/#29230 文档修复、#29286 为代理实现 Google 搜索工具（P1）。

## 功能需求趋势

从今日活跃 Issues 看，社区最关注的功能方向为：

- **Subagent/Agent 协作可靠性**：MAX_TURNS 误报、agent 挂起、subagent 轨迹不可见（#22598）等，集中在让我们信任多 agent 工作流的方向。涉及 #22323、#21409、#21968、#22598。
- **Auto Memory 系统成熟度**：脱敏、低信号会话重试、无效补丁处理（#26525、#26522、#26523、#26516），说明后台记忆功能正在被更多用户使用，安全性与效率问题开始集中暴露。
- **终端/Shell 稳定性**：命令卡 "Waiting input"、abort 信号丢失、CRLF diff 异常等（#25166、#29314、#29132），影响日常基本操作体验。
- **AST 感知的代码理解**：精确读取方法/符号边界以减少 token 消耗（#22745、#22746），代表高级用户对长上下文优化的明确诉求。
- **浏览器 Agent 鲁棒性**：Wayland 兼容、session 锁恢复、settings.json 覆盖无效（#21983、#22232、#22267）。
- **安全与权限防护**：OS 沙箱、确定性脱敏、阻止破坏性 git/DB 操作（#19873、#26525、#22672）。

## 开发者关注点

- **高频痛点：各种形式的“卡住”**。包括通用 agent 无限挂起、shell 命令完成后停在 “Waiting input”、browser agent 在 Wayland 静默失败，严重干扰自动化场景。
- **Subagent 行为仍不可控**。模型很少主动使用自定义 skills/sub-agents（#21968）；subagent 内部状态对主会话不透明（#21763），调试很困难；MAX_TURNS 被包装成成功结果更是加剧了信任问题。
- **数据/配置健壮性**：如 `/compress` 不写回磁盘导致恢复失效（#21335）、symlink agent 文件不被识别（#20079）、>128 工具时报 400 错误（#24246）、`settings.json` 对 browser agent 的覆盖被忽略（#22267）——这些都是实打实的日常摩擦点。
- **模型行为边界需约束**：有用户观察到模型偏好创建散落各处的临时脚本（#23571），或使用 `git reset --force` 等破坏性命令（#22672），建议通过 prompt/策略层约束模型行为，并配合沙箱兜底。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

## DeepSeek Reasonix 社区动态日报 — 2026-09-14

### 1. 今日速览

- **v2.15.0 发布**：本周主线是把「决策权」与「改写权」收回人侧，并新增会话只读打开、DeepSeek 目录声明收敛等治理与稳定化改进。
- **社区质量反馈集中爆发**：v1.38.7 崩溃（Minified React error #185）、会话卡加载、流式停摆等问题在 24 小时内产生大量 Issue，用户「求稳定优先于新功能」的情绪明显。
- **会话持久化与数据膨胀成核心矛盾**：146 MB 的 base64 图片日志导致项目无法打开、崩溃后 session 锁不释放等数据层问题，正在推动 PR 侧的统一持久化重构。

### 2. 版本发布

**Reasonix Studio v2.15.0**（2026-09-14）

更新要点：

- **权限收口**：将「谁能拍板」改为一条统一声明，取代原先三分支；会话授权按实际被询问的主体记录；委派运行触碰到写入围栏时改为询问用户而非源头模型。
- **窗口租约**：会话被其它窗口占用时以只读模式打开，租约保护始终面向写回而非阅读。
- **供应商侧**：DeepSeek 目录、视觉能力与官方价格各自统一为一份声明，删除 9 个逐厂商手写迁移函数。
- **界面与可访问性**：阅读列、任务页、导航树键盘可达性修复；上下文折叠点会说明「是哪条界限」并在读到该界限处进行标注。
- 自 2.14.1 以来共 67 个提交，三平台自动更新，无需人工介入。

### 3. 社区热点 Issues（10 条）

1. **#10186** [Bug] v1.38.7 渲染层崩溃 Minified React error #185，长会话流式输出停摆 — 9 条评论
   社区最热的崩溃贴之一，`Maximum update depth exceeded` 被多个用户在不同场景复现，疑似与长会话的渲染循环有关，是当日最高优先级渲染问题。
   https://github.com/esengine/DeepSeek-Reasonix/issues/10186

2. **#10171** [Bug] 「能不能不搞新功能了，把基础的做好不行吗？」 — 8 条评论
   极具代表性的用户情绪表达：会话卡在用户消息处，切换会员视图才能看到回复。反映了 1.38.7 在基础链路稳定性上的倒退，值得官方认真对待。
   https://github.com/esengine/DeepSeek-Reasonix/issues/10171

3. **#10226** [Bug] Inline base64 图片使 session.events.jsonl 膨胀到 146 MB，会话/项目无法打开 — 1 条评论
   数据层高危问题：单个 ComfyUI 项目的会话文件被内联 base64 图片撑爆，桌面端点击项目时静默回退，数据不可达。与 #10211/#9806 同属「大会话」治理难题。
   https://github.com/esengine/DeepSeek-Reasonix/issues/10226

4. **#10228** [Bug] v1.38.7 崩溃后 session 锁未释放，fork 分支创建成功但 UI 层被锁死 — 2 👍
   崩溃恢复路径存在明显缺陷：进程死亡后锁未清理，即使 fork 成功也无法使用。涉及数据可用性，社区认同度高。
   https://github.com/esengine/DeepSeek-Reasonix/issues/10228

5. **#10258** [Bug] 提示工作运行但无实际运行记录，功能「反向优化」 — 0 条评论（今日新提交）
   任务状态与实际日志不一致，用户在等待长任务时无法获得真实进度，直接影响开发效率判断。
   https://github.com/esengine/DeepSeek-Reasonix/issues/10258

6. **#10162** [Bug] Windows 1.38.7：新建会话后视图未切换，此后所有会话思考/输出均不实时显示 — 2 条评论
   「新建会话」这一基础操作触发了视图与流式输出双失效，因果链清晰，属于高频操作的回归缺陷。
   https://github.com/esengine/DeepSeek-Reasonix/issues/10162

7. **#9806** [Bug] Send failed: turn admission did not produce a durable turn id — /compact 期间可复现 — 3 条评论
   老 Issue 仍在活跃：/compact 过程中发送消息必然失败，且会留下不可恢复的 turn 状态，涉及会话写入的核心一致性。
   https://github.com/esengine/DeepSeek-Reasonix/issues/9806

8. **#10255** [Bug] 无法启动会话：所有会话弹「加载会话历史失败」 — 0 条评论（今日新提交）
   打开即报错，几乎阻断全部使用。虽然复现信息有限，但严重度高，需官方尽快确认范围。
   https://github.com/esengine/DeepSeek-Reasonix/issues/10255

9. **#10202** [Feature] 给崩溃界面加一个「杀进程/重启」按钮 — 4 条评论
   用户在频繁崩溃与无出口之间反复操作，建议在错误弹窗中直接提供进程级恢复手段。侧面说明崩溃率已影响正常工作机制。
   https://github.com/esengine/DeepSeek-Reasonix/issues/10202

10. **#10211** [Bug] 把 D 盘项目剪切到 F 盘后，左侧出现随机数字临时历史对话 — 2 条评论
    目录迁移引发会话索引错乱，随机数字会话出现且难以切回，需强制关闭重启。反映会话文件与项目路径绑定的脆弱性。
    https://github.com/esengine/DeepSeek-Reasonix/issues/10211

### 4. 重要 PR 进展（10 条）

1. **#10257** — 统一会话持久化并支持大会话恢复：将版本各异的 session 路径收敛为 `internal/session` 服务，唯一写入格式改为 `reasonix.session.linear/v4`；大字段在事件接受前写入不可变、块校验的内容库，并保留逻辑追踪。直击 #10226/#9806 等会话膨胀与恢复问题。
   https://github.com/esengine/DeepSeek-Reasonix/pull/10257

2. **#10249** — 修复 Goal 生命周期恢复与宿主控制：恢复目标目标经 ACP/Desktop 恢复回合保留，并提供可审计的 `get_goal -> resume` 恢复信封；同运行时的 controller 重建不再丢弃激活与计数状态，活动续作期间拒绝重建。
   https://github.com/esengine/DeepSeek-Reasonix/pull/10249

3. **#10245** — 识别被服务端静默截断的提示词：Ollama 超长提示后返回 200 OK 但丢弃内容；本 PR 从响应 token 计数中标记截断并告警，解决“模型突然变笨”的假性退化。
   https://github.com/esengine/DeepSeek-Reasonix/pull/10245

4. **#10251** — CLI 将 ```diff / ```patch 围栏渲染为彩色差异：复用现有 diff 渲染器（红绿背景、`+`/`-` 侧栏、行号、chroma 高亮），让变更内容可读性显著提升。
   https://github.com/esengine/DeepSeek-Reasonix/pull/10251

5. **#10250** — 合并窗口 focus/visibility 触发的更新检查：修复 UpdateBanner 每次窗口切换都启动新的 `CheckUpdate`，避免 bridge 长时间占用（该检查曾耗时最高 28.5 s）。
   https://github.com/esengine/DeepSeek-Reasonix/pull/10250

6. **#10244** — 按模型启用工具执行策略：`model_overrides.<model>.action_policy = true` 可逐模型开启 `ModelActionPolicy`；默认关闭且不做 model id 推断，未启用时 provider 前缀逐字节不变。
   https://github.com/esengine/DeepSeek-Reasonix/pull/10244

7. **#10246** — `edit_file` / `multi_edit` 支持空行数量差异的 `old_string` 匹配：PEP 8 场景下调用方只复现一行空行导致整次编辑失败的问题，现在作为 last resort 放宽空行数量，但仍要求存在性一致。
   https://github.com/esengine/DeepSeek-Reasonix/pull/10246

8. **#10241** — 对齐 DSH 会话所有权与持久化机制：完成四个阻塞项的 DSH 式会话所有权切换，业务状态提交到类型化的内存 `Session`，持久化以 200 ms 写回窗口与语义 checkpoint 执行。
   https://github.com/esengine/DeepSeek-Reasonix/pull/10241

9. **#9870** — 新增西班牙语（es-419）界面支持：CLI/kernel 与桌面端完整接入西班牙语目录，字段与英文基线完全对齐，同时修正既有 i18n 结构，便于其它语种接入。
   https://github.com/esengine/DeepSeek-Reasonix/pull/9870

10. **#10247** — 对齐 DSH 目标生命周期与统一运行时：围绕 v3.1 session runtime 重构 Goal 模式，版本化生命周期服务持有持久状态，模型工具执行显式 CAS 生命周期转换，空闲轮驱动请求下一回合。
    https://github.com/esengine/DeepSeek-Reasonix/pull/10247

> 另注意：#10240/#10239/#10238/#10237/#10236 为 dependabot 批量的 actions/typescript/MCP/mermaid/npm 依赖更新；#10163 修复 suite 模式忽略 `-permission` 参数的问题，对 e2e 基准可比性有意义。

### 5. 功能需求趋势

- **稳定性压倒新功能**：#10171「不要再搞新功能」获得大量共鸣；用户的诉求集中在「基础链路不可动摇」，而非功能数量。
- **大会话 / 长上下文治理**：#10226（146 MB JSONL）、#9806（/compact 写入失败）、#10257（大字段外置存储）共同指向「会话体积膨胀」是当前最大技术债。
- **崩溃恢复与自愈能力**：#10202 希望崩溃界面能直接杀进程/重启，#10228 希望锁能自动释放，用户对 App 拉起自身恢复路径有明确预期。
- **实时流与视图状态一致性**：#10162、#10258、#10171 都涉及输出状态与界面状态不同步的问题，「流式输出可靠显示」成为高频词。
- **会话数据可迁移性**：#10211 目录移动导致幽灵会话，说明用户具备离线/迁移使用场景，需要更健壮的路径绑定方案。
- **新模型支持持续期待**：#10210 请求支持 Deepseek 4.1，模型多样性仍是社区长期诉求。
- **持久化记忆进入视野**：#10248 引入 MemCode 第三方提案，希望为长时运行的 coding agent 增加可选的项目级持久记忆（约定、偏好、历史决策）。

### 6. 开发者关注点

- **v1.38.7 是质量洼地**：渲染崩溃（React #185）在同版本内反复出现，涉及 Windows/macOS 双平台；长会话、新建会话、任务运行等基础操作均可触发。
- **会话打不开比崩溃更致命**：多个 Issue 指向「加载会话历史失败」「项目点击无响应」「fork 后仍被锁」等数据不可达问题，对开发者而言等于成果丢失。
- **数据膨胀缺乏预警**：内联 base64 图片写入事件日志时没有体积上限或外部化策略，用户在无感知的情况下将单个会话撑到上百 MB。
- **写路径与会话所有权在重构中**：PR #10257/#10241/#10249 表明官方正在向统一 Session 服务与 DSH 所有权模型收敛，短期内可能迎来写入格式变更，建议关注升级兼容性。
- **社区情绪面**：用户普遍认可 Reasonix 的能力上限，但对「测试与人工审核缺失」的批评集中出现；修复速度与发布质量之间的平衡是当前社区信任的关键变量。

---

*数据来源：github.com/esengine/DeepSeek-Reasonix | 统计窗口：2026-09-13 至 2026-09-14*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报（2026-09-14）

## 今日速览

过去 24 小时无新版本发布，项目处于 v2 迭代与稳定性修复阶段。社区最热需求是 vim 输入模式（#1764，获 187 👍），其次是 VS Code 集成终端数字键盘失灵（#16100，33 条评论）。多个 PR 聚焦 Windows 体验与 Zen/Muse Spark 模型链路修复。

## 社区热点 Issues

### 1. vim motions in input box
[#1764](https://github.com/anomalyco/opencode/issues/1764)（已关闭）
输入框请求支持 vim 快捷键（ClaudeCode 已具备），187 👍 显示这是社区强烈诉求。
> 用户希望输入框支持 vim 快捷键（ClaudeCode 已有此功能），187 个 👍 表明这是强烈诉求。

### 2. Opencode Zen 在 Muse Spark 模型上出现加密内容错误
[#48741](https://github.com/anomalyco/opencode/issues/48741)（开放）
2.0 版本调用 Muse Spark 系列模型时报 `encrypted_content` 未颁发给调用者，图片输入和工具调用时必现。已有 23 条评论，直接影响 Zen + 新模型核心链路。
> 2.0 版本中，调用 Muse Spark 系列模型报 `encrypted_content` 未被授权错误，工具调用和图片输入时必现。

### 3. Numpad keys not working in VS Code 1.110 integrated terminal
[#16100](https://github.com/anomalyco/opencode/issues/16100)（已关闭）
VS Code 1.110 集成终端中数字键盘完全失灵，外部终端正常。33 条评论说明影响面较广。
> 在 VS Code 1.110 集成终端中，数字键盘完全失灵，外部终端正常。

### 4. Expose GitHub Copilot "Auto" option in model selector
[#25239](https://github.com/anomalyco/opencode/issues/25239)（已关闭）
希望模型选择器暴露 Copilot 的 Auto 选项，部分用户不想手动指定模型。
> 希望在模型选择器中暴露 Copilot 的 Auto 选项。

### 5. Restore legacy UI with persistent left sidebar
[#48882](https://github.com/anomalyco/opencode/issues/48882)（开放）
用户不满新版侧边栏设计，要求将旧版双栏布局作为可选选项，直接关联 #20242 的重设计。
> 用户对新版 UI 更换不满，要求回退旧版双栏布局的选项。

### 6. Prompt leaks between sessions
[#35587](https://github.com/anomalyco/opencode/issues/35587)（已关闭）
一个会话中执行的命令出现在另一个会话的历史中，引发隐私和正确性担忧。
> 一个会话中执行的命令会出现在另一个会话的历史中。

### 7. History chat conversation not displayed
[#37063](https://github.com/anomalyco/opencode/issues/37063)（已关闭）
从 v1.17.18 升级到 v1.18.1 后历史会话不显示，疑似数据迁移问题。
> 升级后历史聊天无法显示。

### 8. Git worktree impossible under new layout
[#31686](https://github.com/anomalyco/opencode/issues/31686)（已关闭）
新版布局在 Windows 11 上无法创建/管理 Git worktree，手动创建的目录被误判为重复项目。
> Windows 上新布局无法使用 Git worktree，12 👍。

### 9. /undo reverts chat but not file changes
[#37106](https://github.com/anomalyco/opencode/issues/37106)（已关闭）
/undo 只删除回复文本，磁盘文件改动未被还原，与文档行为不符。
> /undo 只还原对话文本，不还原实际文件变更。

### 10. TUI freezes after model thinking dump
[#36537](https://github.com/anomalyco/opencode/issues/36537)（已关闭）
模型输出长思考块后 TUI 完全无响应，重启后卡在 compaction。
> 模型输出长思考块后 TUI 无响应，重启后卡在压缩阶段。

## 重要 PR 进展

### 1. feat(core): add sqlite long-term memory persistence
[#48498](https://github.com/anomalyco/opencode/pull/48498)（开放）
增加 SQLite 长期记忆系统，提供 teach / recall / learn 命令，是跨会话连续性的重要补强。
> 新增 SQLite 长期记忆持久化，支持 teach / recall / learn 命令。

### 2. feat(opencode): add interactive visualize command
[#48605](https://github.com/anomalyco/opencode/pull/48605)（开放）
新增 `opencode visualize` CLI 命令和 `/visualize` 自定义命令，支持交互式目标选择。
> 新增交互式可视化命令。

### 3. refactor(core): split provider and model registries
[#48901](https://github.com/anomalyco/opencode/pull/48901)（开放）
将 Catalog 拆分为 Provider 与 Model 两套注册表，消除每个 location 重复的完整模型目录。
> 拆分 Provider 与 Model 注册表，解决重复模型目录问题。

### 4. feat(cli): add no-auth serve option
[#43069](https://github.com/anomalyco/opencode/pull/43069)（开放）
为服务化部署增加 `serve --no-auth` 与 `OPENCODE_AUTH=false`，并支持免密注册。
> 新增免认证服务模式，方便部署。

### 5. fix(core): restore Windows Git fast path
[#48879](https://github.com/anomalyco/opencode/pull/48879)（已关闭）
Windows 上解析 Git 绝对路径并走原生 `.exe` spawn 路径，保留 `windowsHide` 等标志。
> 恢复 Windows 下 Git 快速路径。

### 6. feat(codemode): fail runaway recursion with RangeError
[#48891](https://github.com/anomalyco/opencode/pull/48891)（已关闭）
嵌套调用达 10000 层时抛出可捕获 RangeError，避免无限递归拖到超时。
> 防止 Code Mode 无限递归耗尽超时。

### 7. fix(session): recover from stale encrypted reasoning
[#48908](https://github.com/anomalyco/opencode/pull/48908)（开放）
针对 OpenAI Responses 协议模型在会话续接/工具调用时被上游拒绝的问题做恢复处理，与 #48741 直接相关。
> 修复 stale encrypted reasoning 导致的上游拒绝错误。

### 8. fix(server): await plugin-backed reads
[#48890](https://github.com/anomalyco/opencode/pull/48890)（已关闭）
让模型、Agent、命令读取等待插件激活后再返回 location 作用域状态，避免竞态。
> 修复插件化读取的异步竞态问题。

### 9. refactor(tui): remove terminal pane setting
[#48914](https://github.com/anomalyco/opencode/pull/48914)（已关闭）
移除终端面板偏好设置；持久终端面板在 Linux/macOS 始终可用，Windows 保持禁用。
> 简化 TUI 终端面板配置。

### 10. fix(core): describe the real cause of stale-content failure
[#48904](https://github.com/anomalyco/opencode/pull/48904)（开放）
修正 edit 工具 stale-content 错误文案，不再误导用户以为是权限审批问题，关闭 #48707。
> 修复 edit 工具 stale-content 错误提示误导。

## 功能需求趋势

- **编辑器使用习惯**：vim motions、手动文件编辑器等呼声高，用户希望更接近原生编辑器体验（#1764、#26970）。
- **UI 回归 / 可选项**：新版侧边栏与桌面布局引发反弹（#48882），持久 Plan 面板被再次提出（#37199）。
- **模型接入与通道**：Copilot Auto 选项（#25239）、Zen/Muse Spark 新模型支持（#48741）表明多模型供应是刚需。
- **MCP 精细化**：按会话选择 MCP 启用状态的需求出现（#37168）。
- **持久化**：SQLite 长时记忆 PR 顺应跨会话记忆诉求。
- **Windows 体验**：控制台闪烁、worktree、数字键盘等问题集中暴露。

## 开发者关注点

- **数据安全**：升级导致历史会话丢失（#37063）。
- **行为一致性**：/undo 不还原文件（#37106）违背文档预期。
- **多会话隔离**：提示词跨会话泄漏（#35587）引发隐私担忧。
- **稳定性**：TUI 冻结（#36537）、OpenCode Go 推理暂停（#34667）。
- **并发一致性**：并发写文件触发陈旧内容误报（#48707）。
- **Windows 生态**：控制台闪烁、Git worktree、数字键盘等跨平台短板明显。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 2026-09-14

## 今日速览

- 两个 P1 级 Bug 集中指向 `state.db` 的 WAL 副作用文件被异常 unlink/句柄遗留，导致网关长时间拒绝写入，成为社区最关注的问题。
- 社区出现“让 Hermes 自己设定目标”的 `/goal` 功能需求，同时多个 Goals 相关 PR 正在推进，agent 自主目标管理成为当前功能主线之一。
- 大量 PR 集中在测试稳定性修复、安全加固和跨平台兼容，尤其 Windows 下脚本执行、密钥泄漏防护等方向。

## 版本发布

今日无新版本发布。

## 社区热点 Issues

当前共有 3 条活跃 Issue（过去 24 小时更新），全部列出：

1. **state.db: WAL generation handed off during a fleet restart leaves long-lived holders on deleted -wal/-shm and blocks every new opener for hours**  
   - 作者: @SuperMax110 | 评论: 8 | P1 / duplicate  
   - 链接: https://github.com/NousResearch/hermes-agent/issues/109966  
   - **为什么重要**: 网关/集群重启后，仍有长生命周期进程持有已删除的 `-wal`/`-shm` inode，导致任何新 opener 长时间报 `FATAL: a live process holds a deleted state.db-wal ...`。该问题直接影响网关可用性，社区已有 8 条评论讨论，说明影响面较大。

2. **state.db WAL sidecars unlinked by any short-lived process, permanently halting the gateway**  
   - 作者: @astrokat-dev | 评论: 2 | P1 / duplicate  
   - 链接: https://github.com/NousResearch/hermes-agent/issues/110497  
   - **为什么重要**: 触发路径更简单：任何短生命周期进程在网关运行时打开/关闭 `state.db`，就会 unlink WAL 副作用文件，网关和 dashboard 只能持有孤儿 inode，此后所有写入被拒绝。这一 Issue 揭示了 WAL 生命周期管理的系统性缺陷，与 #109966 疑似重复，进一步扩大问题范围。

3. **Feature: Let Hermes set its own goal (`/goal`) — agent-defined objectives**  
   - 作者: @kvnloo | 评论: 0  
   - 链接: https://github.com/NousResearch/hermes-agent/issues/110509  
   - **为什么重要**: 目前 Hermes 无法在运行中自主定义/更新/清除目标，所有目标只能来自 operator。该 Issue 是 #106258 的子任务，提出增加 `/goal` 命令和编程路径，反映社区对 agent 自主决策能力的需求。

## 重要 PR 进展

以下 10 个 PR 在过去 24 小时有更新，代表当前核心开发方向：

1. **fix(local-runtime): price SWA layers from the GGUF's own per-layer pattern, not just a name table**  
   - 作者: @chelsealong | P2  
   - 链接: https://github.com/NousResearch/hermes-agent/pull/109554  
   - 修正本地推理时滑动窗口注意力（SWA）层数估算，不再依赖硬编码架构名表，改为解析 GGUF 每层模式，提升估算准确性。

2. **feat(goals): enforce typed tool constraints**  
   - 作者: @ggro4444  
   - 链接: https://github.com/NousResearch/hermes-agent/pull/110508  
   - 扩展 Goal 契约：工具注册时声明规范能力元数据，强制执行精确工具白名单、能力标签和 target 前缀，避免仅靠名称推断安全性。

3. **feat(goals): add persistent task admission bridge**  
   - 作者: @ggro4444 | P3 / needs-decision  
   - 链接: https://github.com/NousResearch/hermes-agent/pull/109937  
   - 新增 `task_commit` 模型工具，用于创建/修改/替换持久化 Goal，确保 CLI、gateway、TUI、后台进程和子工具集之间的目标准入状态一致。

4. **feat(kanban): refuse dispatch whose model pin route does not serve**  
   - 作者: @aaramos | P3  
   - 链接: https://github.com/NousResearch/hermes-agent/pull/109666  
   - Kanban 调度器在分发卡片前检查模型 pin 路由；若路由无法提供服务，则拒绝分发，避免 worker 在首次 API 调用时死亡、浪费 run。

5. **fix(kanban): fail-closed secret-path pre-ingress policy at every attachment + scratch-workspace ingress surface**  
   - 作者: @johnmwhitman  
   - 链接: https://github.com/NousResearch/hermes-agent/pull/109636  
   - 为所有附件和工作区入口接入 fail-closed 路径策略，拦截 `auth.json`、`.env`、密钥库等敏感文件名，防止凭据文件进入磁盘或晋升。

6. **fix(delegate): stopping an orchestrator subagent now stops grandchildren it was still spawning**  
   - 作者: @teknium1 | CLOSED  
   - 链接: https://github.com/NousResearch/hermes-agent/pull/110505  
   - 修复停止 orchestrator 子代理时，其仍在生成的孙代理被遗留为孤儿进程的问题，防止资源泄漏。

7. **feat(gemini): tool schemas no longer break on unions/refs — full JSON Schema via parametersJsonSchema**  
   - 作者: @teknium1 | P2  
   - 链接: https://github.com/NousResearch/hermes-agent/pull/98928  
   - Gemini 原生 API 改用完整 JSON Schema 传递工具参数，不再降级为旧版 `FunctionDeclaration.parameters`，解决 anyOf、裸数组、`$ref` 等导致 400 的问题。

8. **Codex model discovery no longer hides models behind a fake client version (clean-room port of zed#62729)**  
   - 作者: @teknium1 | P2  
   - 链接: https://github.com/NousResearch/hermes-agent/pull/93295  
   - Codex OAuth 模型发现不再使用伪造客户端版本，统一发送 `0.0.0` sentinel，使模型目录完整可见。

9. **fix(redact): Python repr dict secrets no longer leak in tracebacks and pytest output (salvage #71370)**  
   - 作者: @teknium1 | P3 / security  
   - 链接: https://github.com/NousResearch/hermes-agent/pull/92586  
   - 修复 Python dict repr 形式（单引号字段）在 traceback、pytest 断言输出和最终异常行中泄漏敏感信息的问题。

10. **fix(agent): fall through to the configured chain when an auth-refresh retry fails**  
    - 作者: @Synero | P2  
    - 链接: https://github.com/NousResearch/hermes-agent/pull/110449  
    - 修复认证刷新重试失败时未触发 `fallback_chain` 的问题，确保配置的备用链路能按预期接管。

## 功能需求趋势

- **Agent 自主目标管理**: Issues #110509 与 PR #110508、#109937 共同指向一个方向：让 Hermes 不仅能执行 operator 设定的任务，还能在运行中自我定义、更新和约束目标。Typed tool constraints 和持久化 Goal 契约是这一能力的基础。
- **Kanban 工作流治理与安全**: 多个 PR 围绕 Kanban 展开，包括模型 pin 路由预检、密钥路径 fail-closed 策略、未分配任务过滤器等。Kanban 正从简单看板发展为任务治理和安全控制中心。
- **跨平台兼容**: #109660 修复 Windows 下硬编码 `/bin/bash` 的问题；桌面端 Kanban 筛选增强也说明桌面体验在持续完善。
- **模型与上游服务兼容性**: Gemini 工具 schema 完整支持、Codex 模型发现修复、免费模型下架跟踪，社区对模型提供方 API 变化响应积极。
- **状态存储可靠性**: 虽然以 Bug 为主，但 `state.db` WAL 问题被频繁提及，说明会话状态存储的健壮性是当前部署场景中的关键需求。

## 开发者关注点

- **WAL 副作用文件生命周期**: 短生命周期进程打开/关闭 `state.db` 导致 WAL 被 unlink，或重启后句柄遗留，都会让网关永久阻塞写入。开发者需要系统性解决方案，例如 sidecar 文件引用计数、恢复机制或更安全的关闭流程。
- **测试基础设施稳定性**: 多个 PR（#95273、#97280 等）专门修复 CI 并发下的 flake 问题，包括 pytest 子进程收集错误、全局 `subprocess` mock 干扰等，说明 CI 稳定性持续消耗维护者精力。
- **敏感信息泄漏防护**: 从 Python repr 泄漏到密钥文件名进入工作区，安全类修复密度较高，开发者对 end-to-end 的凭据保护有强烈关注。
- **运行可靠性细节**: 认证刷新失败后的 fallback 链路、子代理停止时的孤儿进程清理、控制帧超时原子性等，都是生产环境中影响任务成功率的痛点。

:::
