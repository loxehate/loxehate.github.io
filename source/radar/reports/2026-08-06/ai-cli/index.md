---
title: "AI CLI 工具社区动态日报"
date: 2026-08-06
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# AI CLI 工具社区动态日报 2026-08-06

> 生成时间: 2026-08-06 02:29 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告

**报告日期：2026-08-06** | **覆盖工具：Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenCode、Qwen Code、Hermes**


## 1. 生态全景

当前 AI CLI 工具赛道已整体进入"**功能深水区 + 稳定性补课期**"。各主流工具在持续迭代新版本（今日 6 个工具发布正式版/预览版更新）的同时，社区反馈重心已从"能用"转向"好用"——MCP 兼容性、会话可移植性、桌面端稳定性、权限安全与计费透明度成为跨工具的高频议题。头部工具（Claude Code、Codex）凭借先发优势在生态深度上领先，而 Qwen Code、OpenCode、Reasonix 等后发工具正以差异化定位快速追赶，行业竞争格局仍未固化。


## 2. 各工具活跃度对比

| 工具 | 热点 Issue 数 | 重要 PR 数 | 今日 Release | 最高赞 Issue | 整体活跃度信号 |
|---|---|---|---|---|---|
| Claude Code | 10 | 5 | v2.1.223（正式版） | 46 👍（Session URL 隐私） | 稳定迭代；Issue 覆盖面广，含多个新提交 |
| OpenAI Codex | 10 | 10 | v0.146.1（稳定版）+ 5 个 alpha | 143 👍（VS Code 多根工作区） | 高频迭代；0.147 分支密集开发中 |
| Gemini CLI | 10 | 10 | v0.54.0 + v0.55.0-preview.1 + nightly | 4 👍（Google One 权益） | 版本发布频繁；社区情绪焦虑（迁移争议） |
| DeepSeek Reasonix | 10 | 10 | v1.20.0（正式版） | 2 👍（上下文漂移） | Issue/PR 响应快；社区规模较小但活跃 |
| OpenCode | 10 | 10 | v1.18.14 | 126 👍（Go 套餐用量 API） | 社区需求强烈；V2 迁移带来阵痛 |
| Qwen Code | 10 | 10 | v0.21.6 + Desktop v0.1.0 首发 | P1 安全漏洞（#8582） | 快速迭代；桌面版首秀暴露稳定性短板 |
| Hermes | 10 | 10 | 无 | P1 回归（#79407） | 社区规模较小；修复 PR 响应及时 |

> 注：各工具 GitHub 仓库历史 Issue 总量差异较大，上述为日报收录的热点/重要项，活跃度信号综合发布频率、社区讨论深度、Issue 紧迫度评估。


## 3. 共同关注的功能方向

### 3.1 MCP 生态稳定性与兼容性（波及面最广）

| 工具 | 具体诉求 |
|---|---|
| Claude Code | 长参数静默丢弃（#72228）、tag-grammar 解析器吸收参数（#84362） |
| OpenAI Codex | 远程 MCP 握手超时（PR #37168）、session 来源暴露（PR #37167） |
| Gemini CLI | OAuth 动态客户端注册失败（#20990）、token 刷新 client ID 修复（PR #28481） |
| DeepSeek Reasonix | 仅支持 Streamable HTTP、不支持 JSON-RPC over HTTP（#7384）；不响应 tools/list_changed（#7635） |
| OpenCode | OAuth 动态客户端重复注册（#40767）、跨进程刷新竞争（#40768） |

**共性结论**：MCP 已从"能连就行"进入"全标准支持 + 数据完整性"阶段。参数静默丢失、OAuth 重复注册、动态工具通知失效是跨工具的高频缺陷。

### 3.2 会话与上下文可移植性

| 工具 | 具体诉求 |
|---|---|
| Claude Code | Session URL 默认附加到提交/PR（#66504）；`--continue` 跨模式失效（#82536） |
| OpenCode | 跨项目会话列表（#31932）；会话导出 JSON（PR #40781）；`/sessions` 切换丢上下文（#40759） |
| Gemini CLI | 上下文溢出自动压缩（PR #28488） |
| Reasonix | 会话恢复后编辑按钮禁用（#7632） |

**共性结论**：开发者要求会话数据既能跨项目/跨模式携带，又不污染共享仓库；上下文管理从"手动清理"走向"自动压缩 + 可导出"。

### 3.3 桌面端稳定性（新增主战场）

| 工具 | 具体问题 |
|---|---|
| Claude Code | GPU 进程崩溃（#83744）、5 小时限制崩溃（#83403） |
| OpenAI Codex | macOS Dock 插件崩溃（#27694） |
| Reasonix | Windows 空闲 CPU 过高（#7619）、macOS Monterey 崩溃（#7624） |
| Qwen Code | Desktop v0.1.0 Windows 启动崩溃 EISDIR（#8615） |
| Hermes | 0.20.0 桌面底部面板整体缺失（#79407，P1） |
| OpenCode | macOS 高内存使用（#40779） |

**共性结论**：AI CLI 厂商集体进军桌面端后，跨平台兼容性（尤其 Windows）成为系统性短板，首版质量普遍未达用户预期。

### 3.4 安全与权限控制精细化

| 工具 | 具体诉求 |
|---|---|
| Claude Code | 权限提示疲劳（#84355）、hook 异常 fail closed（PR #84364） |
| OpenAI Codex | cyber 模型自动审查收紧（v0.146.1） |
| Qwen Code | 只读 shell 分类器被绕过可执行任意代码（#8582，P1） |
| Hermes | 微信文本审批时序竞争（#79562） |

**共性结论**：安全不再停留在"提示用户确认"层面，而是深入命令执行边界（只读分类器绕过）、hook 失败语义（fail-open vs fail-closed）、审批机制可靠性等底层逻辑。

### 3.5 模型行为可配置性

Claude Code 社区反映 Opus 4.8/5.0"两头不讨好"（#77136）；Reasonix 存在执行模式串扰（#7634）；Gemini CLI 用户无法在旧版本选用新模型（#28485）；Qwen Code 缺 Anthropic dotted-minor 别名解析（#8584）。**开发者普遍要求更细粒度的模型行为控制，而非由系统（提示/策略）静默覆盖用户配置。**


## 4. 差异化定位分析

| 工具 | 核心定位 | 突出优势 | 当前短板 | 目标用户 |
|---|---|---|---|---|
| **Claude Code** | 企业级 AI 编程助手 | MCP 生态深度；企业托管策略（组织级通配符）；插件体系 | 模型风格争议；静默数据丢失问题高发；桌面稳定性 | 企业开发者、已有 Anthropic API 预算的团队 |
| **OpenAI Codex** | 多智能体编排平台 | MultiAgent V2 架构领先；高频迭代（0.147 分支）；Rust 核心性能 | 第三方模型兼容性差（加密 payload）；桌面端跨平台稳定性弱 | 深度使用 OpenAI 模型、需要复杂 agent 工作流的开发者 |
| **Gemini CLI** | Google 生态入口 | 与 Google One / Gemini 模型深度绑定；自动上下文压缩；MCP OAuth 修复积极 | **Antigravity 迁移引发信任危机**；OAuth 稳定性问题反复 | Google 生态用户、GCA 企业客户 |
| **DeepSeek Reasonix** | 多模型兼容工具 | 定价优势；MCP/Provider 适配广度；更新响应快（Issue→PR 周期 <24h） | 社区规模小；QQ Bot 等长尾平台支持不足；Windows 缺陷密度高 | 成本敏感型个人开发者、多模型切换用户 |
| **OpenCode** | 开源社区驱动 | 需求响应直接（Go 套餐 API 126👍）；V2 架构重构中；本地 LAN 发现 | V2 迁移阵痛（回归/兼容）；核心功能稳定性受质疑 | 开源爱好者、需要自托管/本地模型接入的团队 |
| **Qwen Code** | 阿里系全栈 AI 开发工具 | 背靠 Qwen 模型生态；CLI + Desktop 双轨推进；CI 审查管线投入大 | 桌面版首版问题多；/review 系统性超时；安全漏洞（只读 shell 绕过） | 使用 Qwen 模型的开发者、中文社区用户 |
| **Hermes** | 消息网关 + Agent 调度 | 多平台适配广度（微信、BlueBubbles 等）；成本治理机制 | 桌面回归风险；Docker 后端语义不一致；社区规模较小 | 需要通过 IM 管理 agent 的团队、桌面端重度用户 |


## 5. 社区热度与成熟度

**高活跃度 + 高成熟度（头部阵营）**：Claude Code 与 OpenAI Codex。两者拥有最大体量的 Issue 讨论和最高赞需求（Codex 143👍、Claude Code 46👍），社区反馈结构化程度高，功能需求已从基础可用转向精细治理（计费争议、策略配置、数据完整性）。

**高活跃度 + 转型期（值得关注）**：OpenCode 与 Gemini CLI。OpenCode 社区需求强度高（126👍 的 Go 套餐 API 需求跻身全榜前列），但 V2 迁移导致的回归问题和版本显示混乱正在消耗信任。Gemini CLI 的社区活跃更多体现在**情绪共振**——Antigravity 迁移争议（#27314 被反复引用）已成为核心话题，但独立 CLI 的迭代节奏未停，OAuth 修复 PR 持续合入。

**快速迭代 + 口碑积累期**：Qwen Code、DeepSeek Reasonix、Hermes。Qwen Code 以 v0.21.6 + Desktop 首版展示追赶速度，但安全漏洞（#8582）和桌面稳定性问题亟待修复。Reasonix 与 Hermes 社区规模虽小，但 Issue→PR 的响应链路短（Reasonix 当天关 Issue + 次日修 PR；Hermes 用户反馈 Docker 问题当日即出修复 PR），显示出后发项目的高响应效率。


## 6. 值得关注的趋势信号

### 6.1 安全性从"提示确认"走向"执行层硬约束"
Qwen Code 的只读 shell 分类器绕过（#8582）与 Claude Code 的 hook fail-closed 修复（#84364）指向同一方向：**安全边界不能依赖模型自觉或薄分类层，需要 seccomp/容器等底层兜底**。开发者在评估工具时，应关注其安全架构深度而非权限弹窗数量。

### 6.2 "静默数据丢失"是最不可接受的行为
Claude Code 的 MCP 参数丢弃、Reasonix 的上下文窗口数值漂移、OpenCode 的 /sessions 切换丢上下文——这些问题的共同特征是**"看似成功、实则失败"**，对开发者的信任消耗远大于明显报错。工具厂商需要优先建立完整的数据写入校验与用户可见的失败信号机制。

### 6.3 计费与配额透明度成为信任基石
本期出现多个计费相关 Issue：Claude Code 的 Pro 配额持续消耗与幽灵费用、Hermes 的确定性空响应重复计费（用户被扣 $2.33 却无回答）、OpenCode 的 Go 套餐用量 API 高票需求、Gemini CLI 的 429 循环耗尽 token。**使用量可视化与费用防护机制正在成为企业选型的关键评估维度。**

### 6.4 自定义模型与多智能体协作标准之争
OpenAI Codex 的 MultiAgent V2 对第三方提供商（DeepSeek、Ollama）发送加密 payload，直接导致混合模型编排不可用。这与 Reasonix 从第一天支持多 provider、Gemini CLI 对 MCP OAuth 合规性的追求形成鲜明对比。**开放协议 vs 私有格式之争，将决定未来多智能体生态的底层格局。**开发者在技术选型时，若有多模型混用需求，需优先验证私有格式兼容性。

### 6.5 Windows 平台是所有工具的"阿喀琉斯之踵"
从 Claude Code 的 GPU 崩溃、Codex 的 sandboxPolicy 缺失到 Qwen Code 的 EISDIR 崩溃、Reasonix 的 8/26 Issue 标注 Windows——**Windows 兼容性是当前 AI CLI 工具质量的最大短板**。对 Windows 开发者而言，建议选择近期有明确 Windows 修复记录的工具（如 Reasonix v1.20.0 的稳定性改进、Qwen Code 等待 hotfix），并持续跟踪更新节奏。

### 6.6 桌面端是下一个主战场，但仍在"补课期"
Qwen Code Desktop v0.1.0 首版发布即暴露出语言切换、链接点击、Windows 崩溃等问题，Hermes 0.20.0 桌面回归，Reasonix 桌面端 CPU 性能问题——**各家的桌面化进程尚处于"可用但不可靠"阶段**。技术决策者可关注桌面版与 CLI 的功能对齐度与稳定性记录，而非仅看功能清单。

### 6.7 社区驱动的本地化与全球化并行
OpenCode 新增瑞典语翻译、Reasonix 提交俄语完整本地化、Gemini CLI 出现中文社区的迁移焦虑、Qwen Code 钉钉集成——**工具的国际化能力已从"英语优先"转向多语言同步，本地化质量正在成为非英语地区用户采用率的直接影响因素。**

---

*本报告基于 2026-08-06 各工具 GitHub 社区公开数据整理，仅供技术决策参考。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**：github.com/anthropics/skills · 截止 2026-08-06
**说明**：全部热门前 20 PR 均为 OPEN 状态；"评论数"字段缺失，以下排序依据官方数据排序规则。

---

## 1. 热门 Skills 排行

### 🥇 #1298 skill-creator 评估脚本修复（评论热度第一）
**作者** @MartinCajiao · [链接](https://github.com/anthropics/skills/pull/1298) · **状态** OPEN
修复 `run_eval.py` 对任何内容都报 recall=0% 的致命 bug（关联 #556，已有 10+ 独立复现）。由于 `run_loop.py` 和 `improve_description.py` 都消费该脚本信号，整个描述优化循环实际上是在"优化噪声"。同时覆盖 Windows 流读取、触发检测及并行 worker 问题。
**讨论焦点**：官方评估链路的可信度、Windows 平台支持。

### 🥈 #514 document-typography 文档排版技能
**作者** @PGTBoos · [链接](https://github.com/anthropics/skills/pull/514) · **状态** OPEN
新增技能，解决 AI 生成文档的三类高频排版缺陷：孤行（1–6 个词溢出到下一行）、寡行（标题滞留页底）、编号错位。该类问题影响每份 Claude 生成的文档，属于通用痛点的 Skill 化。
**讨论焦点**：排版规则如何用指令精准表达而不过度干预。

### 🥉 #486 ODT 文档技能
**作者** @GitHubNewbie0 · [链接](https://github.com/anthropics/skills/pull/486) · **状态** OPEN
新增 OpenDocument（.odt/.ods）的创建、模板填充、读取及转 HTML 能力，覆盖 LibreOffice / ISO 标准格式，与既有 docx、pdf 技能构成文档矩阵。
**讨论焦点**：与 LibreOffice 生态的兼容边界、模板变量替换的可靠性。

### #210 frontend-design 技能重构
**作者** @justinwetch · [链接](https://github.com/anthropics/skills/pull/210) · **状态** OPEN
整体修订 frontend-design 技能，目标是让每条指令都能在单次对话中实际执行、内部逻辑自洽、指导足够具体以约束模型行为。
**讨论焦点**：技能指令可执行性与"过度说教"之间的平衡。

### #83 skill-quality-analyzer + skill-security-analyzer 元技能
**作者** @eovidiu · [链接](https://github.com/anthropics/skills/pull/83) · **状态** OPEN
新增两个分析型元技能：质量分析器按五维评估（结构/文档 20%、示例、资源……）、安全分析器专查 Skill 的信任边界风险。直接呼应社区对 Skill 质量与安全的双重诉求。
**讨论焦点**：元技能是否应纳入官方 marketplace、五维权重合理性。

### #723 testing-patterns 测试模式技能
**作者** @4444J99 · [链接](https://github.com/anthropics/skills/pull/723) · **状态** OPEN
覆盖完整测试栈：Testing Trophy 取舍模型、单元测试 AAA 模式与命名规范、React 组件测试（Testing Library 查询优先级）、边界用例设计。
**讨论焦点**："该测什么 vs 不该测什么"的哲学指导是否够实操。

### #1367 self-audit 自审计技能（v1.3.0）
**作者** @YuhaoLin2005 · [链接](https://github.com/anthropics/skills/pull/1367) · **状态** OPEN
先做机械性产出文件验证，再按损害严重度排序执行四维推理审计（跨项目/技术栈/模型通用）。作者随后追加 #1385 提案扩展为三闸流水线，迭代活跃。
**讨论焦点**：交付前质量门能否作为通用 Skill 形态沉淀。

### #1302 color-expert 颜色专家技能
**作者** @meodai · [链接](https://github.com/anthropics/skills/pull/1302) · **状态** OPEN
自包含颜色知识库：色名系统（ISCC-NBS、Munsell、XKCD、RAL、Ridgway 1912）、色彩空间选型表（OKLCH 做刻度、OKLAB 做渐变、CAM16 做感知建模）。
**讨论焦点**：设计类技能的领域知识密度与可检索性。

---

## 2. 社区需求趋势（来自 Issues）

- **技能开发工具链可靠性（呼声最强）**：#556「run_eval.py 触发率恒为 0%」（12 评论 👍7）、#1169「连字面量 slash 命令查询都 recall=0%」。社区最大的存量痛点不是缺 Skill，而是评估工具坏了。
- **信任边界与安全**：#492（43 评论，全场最高）曝光社区 Skills 混入 `anthropic/` 命名空间冒充官方，造成权限授予的信任边界漏洞；#1175 关注 SharePoint 文档的访问控制设计。
- **企业级共享与协作**：#228 要求组织级 Skill 库/分享链接（👍8），打破"下载—IM 传输—手动上传"的低效链路。
- **上下文窗口与记忆管理**：#1487 报告 claude-api 技能单次注入 ~156k tokens 撑爆上下文；#1329 提议 compact-memory 符号化紧凑记忆技能；#12 反馈 docx 空白符污染文档。
- **Agent 治理与质量门**：#412 提议 agent-governance（策略执行/威胁检测/审计轨迹）；#1385 提出"任务前校准→对抗性审查→交付验证"三闸流水线。
- **去重与生态治理**：#189（👍9）指出 document-skills 与 example-skills 插件内容相同导致重复注入。

---

## 3. 高潜力待合并 Skills

- **#1298 / #1099 / #1050 / #1323 / #1261 / #539**（skill-creator 修复群）：6 个 PR 从不同角度攻打同一批 bug（评估恒 0% 召回、Windows 子进程崩溃、YAML 未加引号截断、评估文件污染用户项目），官方需尽快收敛合并以解锁生态建设能力。首选 **#1298**（定位最全）：<https://github.com/anthropics/skills/pull/1298>
- **#1367 self-audit**：功能完整已迭代到 v1.3.0，作者同步提交 #1385 生态提案，属于"有体系"的贡献，落地概率高：<https://github.com/anthropics/skills/pull/1367>
- **#1479 plan-file-hygiene**：快速响应 #1417「规划产物无生命周期」问题，7 月底新建即获多位贡献者协作，代表新兴需求：<https://github.com/anthropics/skills/pull/1479>
- **#1302 color-expert**：更新持续至 07-21，与文档类技能互补，作者为领域知名开发者（meodai）：<https://github.com/anthropics/skills/pull/1302>

---

## 4. Skills 生态洞察

**当前社区最集中的诉求是：先把 Skill 的"元工程"做扎实——评估工具可靠、分发渠道可信、共享机制可扩展；新 Skill 的数量已经不少，瓶颈在质量验证与生态治理。**

---

# Claude Code 社区动态日报 2026-08-06

## 今日速览

v2.1.223 发布，新增 marketplace 组织级通配符管理能力，并引入工作流代理等场景的警告机制。社区讨论焦点集中在 MCP 参数静默丢失、Cloud/Cowork git 代理阻断推送，以及 Claude-in-Chrome 权限提示循环等稳定性和数据完整性问题，与此同时新提交的计费争议 Issue 也值得官方关注。

## 版本发布

**v2.1.223** 更新内容：

- **Marketplace 管理增强**：`strictKnownMarketplaces` 与 `blockedMarketplaces` 托管设置新增所有者通配符条目（`"owner/*"`），支持按 GitHub 组织统一放行或屏蔽全部 marketplace 仓库。
- **新增使用警告**：当工作流代理（workflow agents）、forked skills、斜杠命令或后台恢复代理被触发时，会显示相应警告提示。

## 社区热点 Issues

1. **【Feature】Session URL 默认追加到提交消息与 PR 描述——应改为 opt-in**  
   #66504 | 46 👍 | 12 评论  
   开发者在提交信息和 PR 描述中发现自动附带的 Session URL 造成信息噪音与隐私顾虑，要求默认关闭。该话题以 46 赞成为本期社区关注度最高的议题。  
   https://github.com/anthropics/claude-code/issues/66504

2. **【Bug】Cloud/Cowork 会话 git 代理阻断所有推送，PAT 透传失效**  
   #76248 | 5 👍 | 11 评论  
   自 7 月 10 日起，Cowork 远程会话无法推送到"授权仓库集"之外的 GitHub 仓库，即使用户自带 fine-grained PAT 也被拦截。变化发生在会话中途，影响难以追溯。  
   https://github.com/anthropics/claude-code/issues/76248

3. **【Bug】Opus 4.8 语言风格令人不适，Opus 5.0 又导致输出不连贯**  
   #77136 | 8 👍 | 8 评论  
   用户抱怨 Opus 4.8 的语言选择"toxic"，而 Opus 5.0 则产生高度 incoherent 的输出，两个模型在风格与质量上"两头不讨好"，引发多人共鸣。  
   https://github.com/anthropics/claude-code/issues/77136

4. **【Bug】Claude Desktop 接近 5 小时使用限制时崩溃，且需完全重装才能恢复**  
   #83403 | 0 👍 | 7 评论  
   长时间使用 Desktop 开发时，应用在接近 5 小时限制处崩溃，且无法重新打开，只能通过完整重装恢复，影响严重。  
   https://github.com/anthropics/claude-code/issues/83403

5. **【Bug】`--continue` 无法找到 `-p` 创建的会话**  
   #82536 | 0 👍 | 7 评论  
   用户通过 `claude -p`（print 模式）创建的会话无法被 `--continue` 在交互模式下恢复，跨模式会话接续行为与预期不符。  
   https://github.com/anthropics/claude-code/issues/82536

6. **【Bug】MCP 工具调用静默丢弃长参数值之后的所有参数**  
   #72228 | 1 👍 | 5 评论  
   当一个参数值足够长时，其后的所有参数会在请求离开客户端前被丢弃，服务器收到不完整参数集。若目标工具为缺失字段提供默认值，调用会"成功"但产生静默数据丢失。  
   https://github.com/anthropics/claude-code/issues/72228

7. **【Bug】tag-grammar 解析器在畸形闭合标签下静默吸收参数块**  
   #84362 | 新提交  
   当模型输出不匹配的闭合标签时，后续参数块会被吞入前序字符串字段，实测 6.2% 的参数丰富型 MCP 调用发生静默字段丢失（重新提出 #44826）。  
   https://github.com/anthropics/claude-code/issues/84362

8. **【Bug】Claude-in-Chrome 每次浏览器动作都弹权限提示，所有配置方式均无效**  
   #84355 | 新提交  
   单会话 90 分钟内产生 813 条权限提示；settings.json 允许规则、所有权限模式、扩展已批准站点列表以及 `CLAUDE_CHROME_PERMISSION_MODE` 环境变量全部失效。  
   https://github.com/anthropics/claude-code/issues/84355

9. **【Bug】内置 ugrep 编译 bounded-interval BRE 时 RSS 飙至 9–14 GB**  
   #83342 | 0 👍 | 4 评论  
   Claude Code 的 shell 集成将普通 grep 调用透明路由到内置 ugrep，编译特定正则时内存膨胀至 9-14 GB，对大型代码库环境构成严重压力。  
   https://github.com/anthropics/claude-code/issues/83342

10. **【Bug】Claude Desktop Windows 版 GPU 进程崩溃（exitCode 101457950）导致整个应用退出**  
    #83744 | 0 👍 | 4 评论  
    Windows 上 GPU 进程崩溃直接拖垮整个桌面应用，复现路径尚不明确，依赖 GPU 渲染的桌面用户体验受损。  
    https://github.com/anthropics/claude-code/issues/83744

## 重要 PR 进展

1. **fix(scripts): 允许任意用户以 thumbs down 阻止自动关闭 Issue**  
   #84365 | 修复 #79146，与去重机器人（dedupe bot）的承诺对齐：任何用户的 thumbs down 都可阻止自动关闭流程。  
   https://github.com/anthropics/claude-code/pull/84365

2. **fix(hookify): 在 pretooluse hook 异常时 fail closed**  
   #84364 | 修复安全漏洞：此前 hook 内异常（如 ImportError）会导致退出码 0 并放行被门控的工具执行；现在异常将返回 `permissionDecision: 'deny'`，阻止未授权操作。  
   https://github.com/anthropics/claude-code/pull/84364

3. **Add 14 Revolutionary Claude Code Plugins**  
   #41661 | 新增 14 个插件（含 README 与命令定义），将 marketplace.json 扩展到 27 个插件，覆盖安全、性能、架构、全栈自动化方向。  
   https://github.com/anthropics/claude-code/pull/41661

4. **fix(code-review): 默认输出到终端，仅显式传 `--comment` 时才发布 GitHub 评论**  
   #16929 | 修复 #16606：`/code-review` 此前默认内联评论到 GitHub，与 README 声明的终端输出行为相矛盾，现已对齐文档。  
   https://github.com/anthropics/claude-code/pull/16929

5. **fix: Cowork 在 Bun 运行时下的自签名证书错误变通方案**  
   #84138 | 关闭 #24470：Bun 不加载系统证书导致 macOS 用户看到 "Self-signed certificate detected" 错误，此 PR 为 PostToolUse hook 增加证书处理逻辑。  
   https://github.com/anthropics/claude-code/pull/84138

## 功能需求趋势

- **会话与上下文可移植性**：多个 Issue（#81946、#66504、#82536）关注会话记录、临时文件与提交元数据的跨项目/跨模式管理，社区希望 session 数据既能便携又不污染共享仓库。
- **模型行为可配置性**：模型选择、语言风格、委托策略等方向出现多起争议（#77136、#84053、#76660），开发者要求更细粒度的模型行为控制，而非由系统提示静默覆盖用户配置。
- **MCP 生态稳定性**：MCP 参数传递完整性（#72228、#84362）、stdio 服务器自动重连（#84363）成为高频痛点，期望对 MCP 调用有更严格的输入校验与故障恢复机制。
- **权限与安全精细化**：浏览器扩展权限持久化（#74715、#84355）、设备识别（#77605）、Marketplace 组织级通配符（v2.1.223 已响应）等领域出现集中需求。
- **桌面端稳定性**：GPU 崩溃（#83744）、5 小时限制崩溃（#83403）、MSIX 状态异常（#84333）等桌面应用稳定性问题占比上升。

## 开发者关注点

- **静默数据丢失类问题高发**：MCP 参数丢弃（#72228）、tag-grammar 解析器吸收参数（#84362）等"看似成功实则失败"的行为被反复报告，开发者对此类问题容忍度最低。
- **权限提示疲劳**：Claude-in-Chrome 反复弹窗（#84355）与 "Always allow" 不持久化（#74715）严重影响自动化流程，多个配置渠道均失效。
- **模型体验争议**：模型降级（#84340）、模型间风格差异（#77136）、系统提示覆盖用户策略（#84053）、用量统计错误（#84359）等问题说明新模型与策略的推出节奏快于社区适应预期。
- **计费与配额疑虑**：#84360（Pro 配额持续消耗）、#84358（未经授权的 Max 升级与幽灵费用）等新提交的计费相关 Issue 值得官方及时澄清。
- **开发者工具链兼容性**：grep 路由到 ugrep 造成内存爆炸（#83342）、登录循环（#72875）、特定终端下快捷键失效（#72649）等环境兼容性问题影响核心开发流程的可靠性。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-06

## 一、今日速览

今日 Codex 发布稳定版 0.146.1，针对 cyber 能力模型收紧自动审查默认策略，并在终端界面增加权限变更说明；0.147.0-alpha 系列同步密集迭代（alpha.10 ~ alpha.13）。社区层面，多智能体 v2 与自定义模型提供方（DeepSeek、Ollama 等）的兼容性问题构成当前最集中的开放问题簇；此前批量报告的 "sandboxPolicy missing" 故障（涉及 Chrome/Computer Use）相关 Issue 均已关闭，疑似已修复。

## 二、版本发布

- **rust-v0.146.1（稳定版）**
  - 修复：为具备 cyber 能力的模型应用更安全的自动审查默认值
  - 改进：在终端界面中解释权限变更原因
  - 变更对比：[rust-v0.146.0...rust-v0.146.1](https://github.com/openai/codex/compare/rust-v0.146.0...rust-v0.146.1) | 关联 PR：[#37057](https://github.com/openai/codex/pull/37057)

- **rust-v0.147.0-alpha.13 / alpha.12 / alpha.11 / alpha.10 / alpha.6.5**
  过去 24 小时连续发布多个 alpha 迭代，均未附带详细更新说明，表明 0.147 功能分支正处于高频开发阶段。

## 三、社区热点 Issues（10 个）

1. **[#2909] VS Code 扩展多根工作区支持（Multi-root Workspaces）**
   143 👍，全榜最高票需求。多根工作区场景下扩展行为异常，专业开发者对复杂工程结构支持呼声强烈。
   https://github.com/openai/codex/issues/2909

2. **[#2880] 以 Markdown 复制/导出消息**
   78 👍。开发者希望将 Codex 对话导出为 Markdown 用于外部文档或 GitHub Issue，目前只能复制纯文本。
   https://github.com/openai/codex/issues/2880

3. **[#2020] 浅色背景终端支持**
   60 👍。当前硬编码深色配色导致浅色终端下提示、补全和菜单几乎不可见，影响大量用户。
   https://github.com/openai/codex/issues/2020

4. **[#25203] Windows 上 GitHub OAuth 回调失败**
   37 条评论、21 👍。桌面应用关联 GitHub 时出现 "Unable to find Electron app" 错误，核心认证流程受阻。
   https://github.com/openai/codex/issues/25203

5. **[#34833] MultiAgentV2 跨提供方子代理无法消费加密任务分配（开放中）**
   OpenAI 父代理向非 OpenAI 自定义子代理下发任务时，payload 以加密内容传输导致子代理无法解析，阻碍混合模型编排。
   https://github.com/openai/codex/issues/34833

6. **[#33551] Multi-Agent V2 向外部 Responses 提供方发送 OpenAI 专用 agent_message（开放中）**
   Ollama 等外部 Responses 兼容提供方无法识别 `agent_message` 类型及其 `encrypted_content` 字段。
   https://github.com/openai/codex/issues/33551

7. **[#36586] DeepSeek 子代理完全看不到任务 payload（开放中）**
   自定义非 OpenAI 提供方（DeepSeek）下，`spawn_agent` / `followup_task` 派发的任务对子代理不可见，直接回复"无新任务输入"。
   https://github.com/openai/codex/issues/36586

8. **[#27694] macOS Dock 插件崩溃（CodexDockTilePlugin setDockTile 递归）**
   17 条评论。Dock 图标插件崩溃已影响 LaunchServices，且多个版本反复回归，桌面端稳定性受质疑。
   https://github.com/openai/codex/issues/27694

9. **[#29242] Windows 10 上 Chrome/Computer Use 报 "missing field sandboxPolicy"**
   同类问题在 6 月 20 日版本集中爆发（#29211、#29238、#29254、#29258、#29539 等 10+ 个），现已全部关闭，是 Windows 平台最高频故障模式。
   https://github.com/openai/codex/issues/29242

10. **[#26452] codex exec 仍不派发 hooks**
    即使 hooks.json 格式正确，exec 模式依然不触发 hooks，影响 CI 自动化场景，属于对 #25875 的跟进。
    https://github.com/openai/codex/issues/26452

## 四、重要 PR 进展（10 个）

1. **[#37190] cyber 模型遇一次 Guardian 拒绝即中断回合**
   针对 cyber 专业模型引入熔断策略，保留其他模型现有阈值，与 0.146.1 安全修复相呼应。
   https://github.com/openai/codex/pull/37190

2. **[#37198] 读取本地线程时优先使用持久化 cwd**
   修复 rollout 中记录的 cwd 过期导致线程读取与列表不一致的问题。
   https://github.com/openai/codex/pull/37198

3. **[#37191] 回滚迁移时保留遗留语义**
   避免历史 rollback、压缩检查点及子代理历史副本在迁移后改变可见对话或模型上下文。
   https://github.com/openai/codex/pull/37191

4. **[#37189] 在世界状态中跟踪多智能体使用提示**
   会话恢复时若配置变更或历史记录早于 usage-hint 跟踪，可正确获取当前多智能体使用指令。
   https://github.com/openai/codex/pull/37189

5. **[#37168] 限制远程 MCP 握手 HTTP 请求时长**
   修复流式 HTTP MCP 握手超时后底层请求仍继续运行、阻塞串行 executor 的问题。
   https://github.com/openai/codex/pull/37168

6. **[#37167] 向 MCP 贡献者暴露 session 来源**
   新增 `session_source()` 接口，支持线程级 MCP 解析，并贯穿初始化与运行时刷新。
   https://github.com/openai/codex/pull/37167

7. **[#37166] 文本域光标与渲染保持在视口内**
   修复逻辑行恰好占满文本域宽度时的换行显示与光标错位问题，涉及明文/掩码/粘贴内容。
   https://github.com/openai/codex/pull/37166

8. **[#37157] 强化 TUI 命名会话查找**
   resume/archive 共享精确名称候选查找逻辑，优先 SQLite 合法名称并增加多重 identity/source/role 校验。
   https://github.com/openai/codex/pull/37157

9. **[#37151] 合并并发 Git status 扫描**
   同一仓库的并发 workspace 元数据请求共享一次 `git status --porcelain` 调用，降低 IO 开销。
   https://github.com/openai/codex/pull/37151

10. **[#37149] 通过世界状态管理 orchestrator 技能**
    将技能目录从线程上下文移入独立 world-state 分区，未变更目录可跨轮增量复用，属于技能系统近期系列重构之一。
    https://github.com/openai/codex/pull/37149

## 五、功能需求趋势

1. **多智能体 v2 开放生态兼容性**：当前最集中的开放问题方向。社区明确要求 MultiAgentV2 对非 OpenAI 提供方（DeepSeek、Ollama 等）使用标准 Responses 协议，任务 payload 不应采用 OpenAI 私有的加密格式。
2. **TUI/UX 可定制性**：浅色背景支持（60 👍）、Markdown 导出（78 👍）、文本域渲染细节等高票需求显示，终端交互体验与可定制性关注度持续上升。
3. **IDE 扩展能力**：VS Code 多根工作区支持以 143 👍 位居需求榜首，说明专业开发者对复杂工程结构场景的诉求最为强烈。
4. **Windows 平台稳定性**：sandboxPolicy 缺失、OAuth 回调失败、沙箱安装异常、路径兼容等 Windows 专属问题密集出现，平台适配仍是质量短板。
5. **自动化与 CI 集成**：hooks 在 exec 模式不生效、命名会话查找等影响无人值守工作流的问题被反复提及。

## 六、开发者关注点

- **自定义模型 + 多智能体不可用**：多个开放 Issue（#34833、#33551、#36586、#36321）指向同一根因——子代理任务以加密/私有格式传递，导致第三方提供方无法消费。这是当前对非 OpenAI 模型用户影响最严重的功能缺陷。
- **"sandboxPolicy missing" 批量故障**：6 月中旬版本在 Windows 与 macOS 上集中爆发 node_repl/Chrome/Computer Use 无法初始化问题，10+ 个 Issue 共享同一报错。虽已关闭，但社区对同类回归的测试覆盖表示担忧。
- **安全策略变更需更透明**：0.146.1 对 cyber 模型收紧自动审查并新增权限变更说明，开发者关注此类安全默认值变化对既有自动化流程的影响。
- **桌面端稳定性仍是痛点**：macOS Dock 崩溃、Windows UI 渲染异常、非 ASCII 路径兼容（韩文用户名）等问题反复出现，桌面 App 的跨平台稳定性亟待加强。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-06）

## 1. 今日速览

今日发布三个版本：正式版 v0.54.0 与预览版 v0.55.0-preview.1，以及最新 nightly。社区讨论焦点依然围绕「Gemini CLI 向 Antigravity CLI 迁移」的争议，多个高赞 issue 持续抗议独立 CLI 被弱化。PR 方面，MCP OAuth 修复、上下文自动压缩、新模型支持等成为核心看点。

## 2. 版本发布

过去 24 小时共有三个版本更新：

- **v0.54.0（正式版）**：包含此前 v0.53.0-preview.0 与 v0.52.0 的变更日志，属于阶段性稳定发布。
  https://github.com/google-gemini/gemini-cli/releases/tag/v0.54.0

- **v0.55.0-preview.1（预览版）**：主要为版本号推进与变更日志更新。
  https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-preview.1

- **v0.55.0-nightly.20260806.g761f604c1（Nightly）**：包含两项值得关注的改动——当 macOS 系统缺少 seatbelt profile 时回退到内置文件（修复沙箱兼容问题）；为 PR 生成器核心新增环境配置解析器、命令执行器与 GitHub 集成逻辑。
  https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-nightly.20260806.g761f604c1

---

## 3. 社区热点 Issues（10 个）

**1. #27314 恢复独立 Gemini CLI 或支持完整 legacy 工作流（12 评论 / 👍3）**  
用户强烈抗议 CLI 与 Antigravity 生态强制合并，认为这损害了开发体验与生产力。该 issue 虽已关闭但被大量引用，是当前社区情绪的最集中代表。  
https://github.com/google-gemini/gemini-cli/issues/27314

**2. #27265 Gemini CLI 是否会被 Antigravity CLI 取代？（8 评论）**  
中文用户提问，直接关切 CLI 项目前景与免费额度缩水问题，反映出非英文社区同样存在迁移焦虑。  
https://github.com/google-gemini/gemini-cli/issues/27265

**3. #21956 [P1] OAuth token 刷新静默失败导致挂起（6 评论）**  
长会话运行超过 token 有效期后，CLI 无提示地无限挂起。涉及 Ubuntu/macOS/Windows 三平台，是企业用户的高频痛点。  
https://github.com/google-gemini/gemini-cli/issues/21956

**4. #20990 MCP OAuth 2.1 动态客户端注册失败（10 评论）**  
`registrationUrl` 在 WWW-Authenticate 发现路径中被丢弃，导致连接符合 RFC 8414 的 MCP 服务器时失败，影响生态互操作性。  
https://github.com/google-gemini/gemini-cli/issues/20990

**5. #27097 Windows PowerShell 5.1 下错误使用 `&&`（7 评论）**  
Agent 无视 GEMINI.md 中的指示，在 PowerShell 5.1 中硬编码使用 `&&` 连接命令，被迫重复执行。Windows 用户的高频兼容性 bug。  
https://github.com/google-gemini/gemini-cli/issues/27097

**6. #27160 [OPEN] 支持 `@filename 起始行-结束行` 引用形式（5 评论）**  
用户希望 `@` 引用文件时能指定行范围（如 `@file 20-50`），避免让模型读取上千行文件，提升大文件场景下的效率与精度。  
https://github.com/google-gemini/gemini-cli/issues/27160

**7. #21783 [OPEN][P1] ACP 模式缺少 tool_call 会话更新（5 评论）**  
在 ACP 模式下调用需确认的工具时，`runTool()` 直接发送 `session/request_permission`，但未先发送 `tool_call` 更新，导致客户端状态机不同步。  
https://github.com/google-gemini/gemini-cli/issues/21783

**8. #27187 客户端 429 路由循环导致 token 快速耗尽（4 评论）**  
触发服务器限流时，客户端进入 429 重试循环，不仅没有优雅降级，反而持续消耗 token，直至触发计费上限。  
https://github.com/google-gemini/gemini-cli/issues/27187

**9. #28698 [OPEN] 高内存使用（4 评论）**  
创建于 8 月 5 日的较新 issue，用户报告在空闲时间内进程循环导致内存持续增长。涉及 CLI 0.53.1，尚未关闭，值得关注后续定位。  
https://github.com/google-gemini/gemini-cli/issues/28698

**10. #27356 保留 Google One 对 Gemini CLI 的支持（4 评论 / 👍4）**  
用户要求现有 Google One 订阅继续包含 Gemini CLI 访问权，认为 Antigravity 的新额度“不可用”。代表了个人用户对订阅权益缩水的直接不满。  
https://github.com/google-gemini/gemini-cli/issues/27356

---

## 4. 重要 PR 进展（10 个）

**1. #28485 模型选择器加入 gemini-3.5-flash（已合并）**  
修复用户在 v0.51.0 无法在模型选择器中选用 `gemini-3.5-flash`/`gemini-3.6-flash` 的问题，补上了新版模型的后台配置缺口。  
https://github.com/google-gemini/gemini-cli/pull/28485

**2. #28488 上下文溢出时自动压缩聊天历史（已合并）**  
新增 `model.autoCompressOnOverflow` 配置，当上下文窗口即将溢出时自动压缩历史而非报错中止，对长会话用户意义重大。  
https://github.com/google-gemini/gemini-cli/pull/28488

**3. #28481 修复 MCP OAuth token 刷新使用已存储 client ID（已合并）**  
解决通过 discovery + 动态客户端注册方式接入的 MCP 服务器在刷新 token 时本地校验失败、凭证被删除导致每次重新认证的问题。  
https://github.com/google-gemini/gemini-cli/pull/28481

**4. #28586 + #28607 保留 functionCall 的 thoughtSignature（1 open / 1 closed）**  
两个 PR 目标一致：修复 v0.53.0 引入的 400 错误——平行工具调用时 `thoughtSignature` 被意外剥离，API 返回 `Function call is missing a thought_signature`。  
https://github.com/google-gemini/gemini-cli/pull/28586  
https://github.com/google-gemini/gemini-cli/pull/28607

**5. #28581 跳过 `@` 处理中的 diff hunk 标记（Open）**  
防止 unified/combined diff 的 `@@` 标记被误判为 `@file` 引用，消除大 diff 场景下递归全工作区 glob 搜索导致的 `minimatch`/`path-scurry` 堆增长。  
https://github.com/google-gemini/gemini-cli/pull/28581

**6. #28676 将终止信号转发给子进程（Open）**  
`relaunchAppInChildProcess` 现在会把 SIGTERM、SIGHUP、SIGINT 等信号转发给子进程，避免 `kill -TERM` 引导进程后留下孤儿进程。  
https://github.com/google-gemini/gemini-cli/pull/28676

**7. #28695 + #28660 SDK 对畸形 tool arguments 容错（1 closed / 1 open）**  
`sendStream()` 对 string 型工具参数使用未加保护的 `JSON.parse()`，一旦模型输出非法 JSON 就会使整个流中断。两个 PR 均改为防御性解析，将错误转换为结构化 `functionResponse`。  
https://github.com/google-gemini/gemini-cli/pull/28695  
https://github.com/google-gemini/gemini-cli/pull/28660

**8. #28689 解析嵌套 gaxios 流式错误（已合并）**  
增强对底层 HTTP 嵌套异常的解析，让配额/限流等结构化错误能被正确识别、分类和格式化的兜底，改善 Gemini Code Assist 的错误反馈。  
https://github.com/google-gemini/gemini-cli/pull/28689

**9. #28688 Cloud Workstations 下动态解析 OAuth 代理重定向 URI（Open）**  
修复 OAuth 回调被静态配置为 `localhost` 导致的认证失败——在 Cloud Workstations 中浏览器运行在远程环境，需要动态解析代理地址。  
https://github.com/google-gemini/gemini-cli/pull/28688

**10. #28494 修复 VS Code IDE Companion 的 Disposable 泄漏（已合并）**  
移除 `activate()` 中使用逗号运算符包裹注册命令的问题，确保 `gemini.diff.accept` 与 `onDidChangeWorkspaceFolders` 的 Disposables 能被正确清理。  
https://github.com/google-gemini/gemini-cli/pull/28494

---

## 5. 功能需求趋势

从近 24 小时更新的 Issues 中，可以提炼出以下社区关注方向：

- **Antigravity 迁移阻力与 "Legacy" 工作流保留**：多个高热度 issue（#27314、#27265、#27327、#27356）均指向用户对强制迁移的抵制，核心诉求是保留独立 Gemini CLI、稳定 OAuth 以及原有 Google One 权益。
- **OAuth / 认证稳定性**：#21956、#20990、#28473 等涉及 token 刷新失败、动态客户端注册、登录弃用报错，认证链路是当前最大稳定性短板。
- **上下文与内存管理**：#28488 的自动上下文压缩、#28698 的高内存占用、#21066 的会话恢复丢失 shell 命令，均反映长会话场景下的资源管理需求。
- **Agent 能力精确化**：#27160（`@` 指定行范围）、#19259（技能支持正则表达式）显示用户希望更精准地控制模型读取范围与数据处理方式。
- **配额 / 限流可见性**：#27181、#27187、#22519 显示用户对单模型限额影响全局、429 重试循环、重置时间错误等问题高度敏感。
- **企业级策略与治理**：#19979（TOML 迁移至 CUELang）、#27185（自定义外部安全检查器）表明企业用户在推动更强大、可扩展的策略体系。

---

## 6. 开发者关注点

- **替代品焦虑（高频）**：开发者普遍担心 Gemini CLI 被 Antigravity CLI 取代后，现有工作流、自动化和脚本失效。多个 issue 已被机器人标记为 Stale 并自动关闭，进一步加重了社区“无人维护”的担忧。
- **OAuth 稳定性直接影响生产力**：无论是个人免费用户还是企业 GCA 用户，token 刷新失败导致挂起/重登是反馈最集中的问题，开发者希望 CLI 在认证失败时给出明确报错而非静默卡死。
- **默认行为不够“聪明”**：Windows 下 `&&` 误用、`.venv` 目录被强行扫描、diff hunk 被误识别为文件引用等，开发者期望 CLI 更智能地识别环境与文件类型，而不是机械地套用既有规则。
- **长会话体验是刚需**：上下文溢出、内存增长、历史压缩、会话恢复丢失 shell 输出等问题的反复出现，说明 Gemini CLI 在持续数小时的深度任务中体验还不够可靠。
- **新模型支持要跟上节奏**：v0.51.0 用户无法选择 gemini-3.5-flash 的 issue 说明，模型更新与 CLI 版本解耦不够，用户希望新模型尽快在旧版本中也可选，而不是必须升级。

---
*本日报由 AI 技术分析师根据 GitHub 公开数据自动整理生成，仅供参考。*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报

**日期：2026-08-06** · 数据来源：[esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)


## 1. 今日速览

Reasonix 发布 **v1.20.0 稳定版**，重点改进决策弹窗压缩、本地决策回执、统一扩展内核，并新增原生任务监视器与有界子代理进度。社区侧，**QQ 机器人频道无法连接**（#7512，12 条评论）持续发酵，成为本周最热 Issue；同时上下文窗口数值漂移（#7620）与更新器卡死（#7630）两个问题均已有对应修复 PR 提交，社区响应积极。


## 2. 版本发布

### [Reasonix v1.20.0（稳定版）](https://github.com/esengine/DeepSeek-Reasonix/releases)

CLI 与 Desktop 同步发布，主要更新：

- **压缩决策弹窗**：精简交互层级，减少决策打断
- **本地决策回执**：决策记录本地化存储，便于审计与追溯
- **统一扩展内核**：整合 Extension Protocol v1，提升扩展一致性
- **原生任务监视器**：桌面端内置任务状态监控，无需第三方工具
- **有界子代理进度**：子代理任务进度可控可观测
- **Goal 安全完成**：目标达成判定增加安全校验
- **MiMo 与 DashScope Responses 修复**：修复长思考输出截断及响应格式兼容问题
- **SSH 远程访问简化**：降低远程连接配置门槛
- **多项桌面稳定性改进**：含 Windows 任务栏适配等修复

🔗 [英文更新日志](https://reasonix.io/changelog/v1.20.0/?lang=en) · [完整更新日志](https://reasonix.io/changelog/v1.20.0/)


## 3. 社区热点 Issues（Top 10）

### 🔥 最热门

**[#7512 — QQ Bot 频道无法连接：identify 被拒 op=9 Invalid Session（未授权 GUILD_MESSAGES intent）](https://github.com/esengine/DeepSeek-Reasonix/issues/7512)**
- 作者：@JACOB-DENG | 评论：12 | 状态：OPEN
- 影响：Windows 平台 v2 版本 QQ 机器人频道完全不可用，原因是 identify 握手缺少 GUILD_MESSAGES intent 授权。12 条评论表明影响面较大，为社区当前最关注 Bug。

**[#7620 — 疑似偶发上下文窗口数值漂移](https://github.com/esengine/DeepSeek-Reasonix/issues/7620)**
- 作者：@HaoyueQin | 评论：3 | 👍：2 | 状态：OPEN
- 影响：三个会话并行使用 DeepSeek-v4-flash 时，上下文窗口数值偶发两倍以上暴涨，构成中"提示词"或"其他"异常翻倍。直接导致自动压缩在真实用量一半时误触发——已有对应修复 PR #7631，社区关注度高。

### 🐛 功能缺陷

**[#7632 — 会话恢复后 Edit 消息按钮永久禁用："Conversation boundary is unavailable"](https://github.com/esengine/DeepSeek-Reasonix/issues/7632)**
- 作者：@aaateh | 评论：4 | 状态：OPEN
- 影响：Windows 桌面端从 stale runtime 恢复会话（rewrite conflict）后，该会话所有轮次的消息编辑功能不可用，直接影响日常使用。

**[#7630 — 更新器在 handoff 成功后卡死，finalization 永不完成，遗留 pending 记录强制进入 Safe Mode](https://github.com/esengine/DeepSeek-Reasonix/issues/7630)**
- 作者：@PanySmit | 👍：1 | 状态：OPEN
- 影响：macOS 稳定版自动更新机制存在连环失败链路，从 7 月 26 日到 8 月 5 日持续阻塞后续更新，且遗留记录会强制进入 Safe Mode，属于更新链路严重缺陷。

**[#7384 — MCP HTTP 类型仅支持 Streamable HTTP，无法连接纯 JSON-RPC over HTTP 的 MCP 服务器（Dify MCP）](https://github.com/esengine/DeepSeek-Reasonix/issues/7384)**
- 作者：@ljs20182018 | 评论：1 | 状态：OPEN
- 影响：MCP 生态兼容性短板。Python 直连 Dify MCP 端点正常，但 Reasonix 仅实现 Streamable HTTP 标准，拒绝纯 JSON-RPC over HTTP 服务器，影响 Dify 等常见 MCP 服务接入。

**[#7619 — 桌面端空闲 CPU/功耗过高（v1.19.7 Windows）：Tab 状态动画 + bot 轮询](https://github.com/esengine/DeepSeek-Reasonix/issues/7619)**
- 作者：@Jonasren1911 | 评论：1 | 状态：OPEN
- 影响：Windows 11 上 WebView2 的 Tab 状态动画持续渲染导致空闲 CPU 占用异常，长时间挂机场景功耗明显，属于桌面端性能问题。

**[#7624 — 桌面版在 macOS Monterey 12.7.6 崩溃：markdownRemarkPlugins 使用 lookbehind 正则，WebKit 不支持](https://github.com/esengine/DeepSeek-Reasonix/issues/7624)**
- 作者：@xuesong8768 | 评论：1 | 状态：OPEN
- 影响：macOS Monterey 12.7.6（WebKit 不支持 lookbehind 正则）直接崩溃无法启动，旧版本 macOS 兼容性缺失。

**[#7635/#7636 — MCP 客户端不响应 notifications/tools/list_changed，动态加载的工具一直报 "unknown tool"](https://github.com/esengine/DeepSeek-Reasonix/issues/7635)**
- 作者：@seahome45 | 状态：OPEN
- 影响：中英双语双提交。MCP 动态工具加载机制存在协议缺陷，服务器推送 tools/list_changed 通知后被忽略，动态注册的工具无法调用。

**[#7626 — opencode zen 端点请求被拒："tools[N].function.name missing"（opencode go 正常）](https://github.com/esengine/DeepSeek-Reasonix/issues/7626)**
- 作者：@Dicklee18 | 状态：OPEN
- 影响：使用 opencode zen 网关的模型全部请求失败，请求体缺少 tools[N].function.name 字段，共 46 个请求校验错误，属于协议兼容性问题。

**[#7649 — 多选选项不是真的多选，只能单选](https://github.com/esengine/DeepSeek-Reasonix/issues/7649)**
- 作者：@JesonChou | 状态：OPEN
- 影响：v1.20.0 新增的"压缩决策弹窗"中，多选对话框实际只能单选，直接影响新版本的 Agent 决策交互。

### 💡 值得关注

**[#7637 — Ctrl+D 退出 TUI 而非向前删除字符（已关闭）](https://github.com/esengine/DeepSeek-Reasonix/issues/7637)**
- 作者：@elonwoo | 状态：CLOSED
- 说明：提交后即被关闭，24 小时内已有对应修复 PR #7638，体现了项目组对 TUI 细节体验的快速响应。


## 4. 重要 PR 进展（Top 10）

### 🔧 核心修复

**[#7631 — fix(agent): 重试尝试单独计费，上下文窗口与压缩判定不再被翻倍 usage 污染](https://github.com/esengine/DeepSeek-Reasonix/pull/7631)**
- 作者：@HaoyueQin | 标签：v2, agent | 状态：OPEN
- 内容：直接修复 #7620 上下文窗口数值双倍暴涨问题。恢复重试（recovery retries）的 usage 被合并计入上下文窗口，导致 gauge 翻倍、自动压缩在真实用量一半时误触发。修复后将重试单独计费。
- 意义：解决了一个隐蔽但影响面大的数值污染 Bug，社区反馈积极。

**[#7638 — fix(tui): 让 Ctrl+D 变为向前删除而非退出会话](https://github.com/esengine/DeepSeek-Reasonix/pull/7638)**
- 作者：@elonwoo | 标签：tui, v2 | 状态：OPEN
- 内容：移除 TUI 层对 Ctrl+D 的拦截，让按键落到 bubbletea textarea 的默认键位绑定（DeleteCharacterForward）。
- 意义：修复 #7637，恢复主流 shell/编辑器习惯，提升 TUI 可用性。

**[#7443 — fix(desktop): 持久化 provider 草稿，避免设置面板关闭后丢失](https://github.com/esengine/DeepSeek-Reasonix/pull/7443)**
- 作者：@ashishexee | 标签：desktop, v2 | 状态：OPEN
- 内容：关闭 #4549。provider 编辑器有 14+ 字段（base URL、API key、model list、vision models、headers、extra body、context window、reasoning protocol 等），误触关闭面板后所有草稿丢失。此 PR 在面板关闭/重开后持久化草稿。

**[#7651 — fix(desktop): 使用 visualViewport 高度适配 Windows 任务栏（#6798）](https://github.com/esengine/DeepSeek-Reasonix/pull/7651)**
- 作者：@CCharlie-xiu | 标签：desktop, v2 | 状态：OPEN
- 内容：将 `window.innerHeight` 替换为 `window.visualViewport.height`，排除 Windows 任务栏、屏幕键盘和浏览器 UI 的遮挡。直接修复 #6798。

**[#7427 — fix(hooks): 诊断功能在 Windows 上正确识别 Reasonix home](https://github.com/esengine/DeepSeek-Reasonix/pull/7427)**
- 作者：@ZhiyaoWen999 | 标签：v2 | 状态：OPEN
- 内容：让 hook 加载和检查接受精确解析的 Reasonix home（Windows 下为 `%APPDATA%\reasonix\settings.json`），并打通能力诊断到 hook 检查的路径。

**[#7644 — fix(responses): MiMo vendor 配置与 MiMo-Code SDK 对齐](https://github.com/esengine/DeepSeek-Reasonix/pull/7644)**
- 作者：@clearnature | 标签：v2, provider | 状态：OPEN
- 内容：对齐 MiMo（api.xiaomimimo.com）Responses 线上参数与 MiMo-Code SDK/codex-configuration.md，修复长思考轮次的输出截断问题。

### ✨ 新功能

**[#7522 — Session-scoped 定时任务：/loop 命令、cron 工具、NEXT JOB 状态指示器、回合中途转向](https://github.com/esengine/DeepSeek-Reasonix/pull/7522)**
- 作者：@cyberofficial | 标签：tui, skills, v2, agent, config | 状态：OPEN
- 内容：恢复 v1 的 `/loop` 能力：固定间隔（`/loop 5m <prompt>`）、5 字段 cron（`/loop "0 9 * * 1-5" <prompt>`）、Agent 动态延迟（`schedule_wakeup`）、`--forever` 无限循环，并新增 NEXT JOB 状态指示。
- 意义：补齐 v2 Agent 的会话级定时任务能力，适合自动化工作流场景。

**[#7488 — feat(retrieval): 本地知识缓存 + 服务端 web_search 检索系统（#7410）](https://github.com/esengine/DeepSeek-Reasonix/pull/7488)**
- 作者：@clearnature | 标签：desktop, tui, skills, v2, agent, config, provider | 状态：OPEN
- 内容：实现完整的检索系统：`retrieve_info` 工具、本地知识缓存、护栏（guardrails）、编排逻辑、服务端 web_search 蒸馏，基于 #7466（服务端 web 搜索控制）构建。
- 意义：显著增强 Agent 的知识获取和检索能力，是社区关注度较高的功能方向。

**[#7633 — feat(i18n): 添加俄语（ru）完整本地化](https://github.com/esengine/DeepSeek-Reasonix/pull/7633)**
- 作者：@Ostanin-app | 标签：desktop, tui, v2, agent, config | 状态：CLOSED
- 内容：新增 CLI 和 Desktop 的完整俄语翻译：`internal/i18n/messages_ru.go` 和 `desktop/frontend/src/locales/ru.ts`（278KB，2987 个 key，100% 覆盖，手动审校）。
- 另见：[#7609 Add Russian (ru) desktop UI locale](https://github.com/esengine/DeepSeek-Reasonix/pull/7609)

**[#7650 — test(boundedllm): 覆盖 Call fail-closed 契约](https://github.com/esengine/DeepSeek-Reasonix/pull/7650)**
- 作者：@ChenZaoD | 标签：v2 | 状态：OPEN
- 内容：为 `internal/boundedllm`（Auto Guard recovery reviewer 和 Goal evaluator 共用的有界无工具 provider 调用）添加首个单元测试，覆盖 nil/typed-nil provider 和错误下的 fail-closed 行为。纯测试变更。

**[#6845 — Add Atlas Cloud provider preset](https://github.com/esengine/DeepSeek-Reasonix/pull/6845)**
- 作者：@binyangzhu000-sudo | 标签：v2, config | 状态：OPEN
- 内容：新增 Atlas Cloud 的 OpenAI 兼容 provider 预设，接入 `ATLASCLOUD_API_KEY`、`https://api.atlascloud.ai/v1`、`/v1/models` 发现机制，默认模型为 `qwen/qwen3.5-flash`。另支持 `deepseek-ai/deepseek-v4-pro` 及 DeepSeek 风格 effort 元数据。


## 5. 功能需求趋势

### 🔮 MCP 生态兼容性（呼声最高）
- [#7384](https://github.com/esengine/DeepSeek-Reasonix/issues/7384)：MCP HTTP 仅支持 Streamable HTTP，无法连接纯 JSON-RPC over HTTP（Dify MCP）
- [#7635](https://github.com/esengine/DeepSeek-Reasonix/issues/7635)：MCP 不响应 `notifications/tools/list_changed`，动态工具无法使用

社区对 MCP 服务器兼容性的要求已从"能连"升级到"全标准支持"。Streamable HTTP 之外，JSON-RPC over HTTP 是 Dify 等主流平台广泛采用的标准。此外工具动态注册/更新（`tools/list_changed`）的协议完整性也是刚需。

### 🔍 检索与知识能力
- [#7484](https://github.com/esengine/DeepSeek-Reasonix/issues/7484)：接入官方 Responses API 的 web_search 工具
- [#7488](https://github.com/esengine/DeepSeek-Reasonix/pull/7488)：本地知识缓存 + 服务端 web_search 检索系统（PR 已实现）

Agent 的知识获取正在从单一 web_fetch 向系统化检索演进，本地缓存 + 服务端搜索蒸馏是社区明确期待的方向。

### 🔁 会话与定时任务
- [#7522](https://github.com/esengine/DeepSeek-Reasonix/pull/7522)：/loop 定时任务、cron 工具、NEXT JOB 状态指示
- [#7647](https://github.com/esengine/DeepSeek-Reasonix/issues/7647)：左侧会话列可折叠/隐藏
- [#7614](https://github.com/esengine/DeepSeek-Reasonix/issues/7614)：思考过程默认折叠或提供设置选项

Agent 工作流正在从单次交互走向**持续运行**（定时、循环），同时 UI 层面需要更强的信息密度控制（折叠思考过程、会话列），以适配长时间值守场景。

### 🌐 多语言与国际化
- [#7633](https://github.com/esengine/DeepSeek-Reasonix/pull/7633)、[#7609](https://github.com/esengine/DeepSeek-Reasonix/pull/7609)：俄语完整本地化（CLI + Desktop）

社区国际化需求开始向长尾语言延伸，说明用户基础已从英语/中文扩展到更广的区域。

### 🖥️ 桌面端体验
- 窗口管理：[#7552](https://github.com/esengine/DeepSeek-Reasonix/issues/7552) Linux/GNOME 最小化后无法恢复、[#4754](https://github.com/esengine/DeepSeek-Reasonix/pull/4754) macOS 双击标题栏缩放
- 性能：[#7619](https://github.com/esengine/DeepSeek-Reasonix/issues/7619) 空闲 CPU 占用过高
- UI 细节：[#7652](https://github.com/esengine/DeepSeek-Reasonix/issues/7652) 图标重绘、[#7647](https://github.com/esengine/DeepSeek-Reasonix/issues/7647) 侧栏折叠

### ⏳ /tmp 生命周期
- [#7575](https://github.com/esengine/DeepSeek-Reasonix/issues/7575)：建议延长 bash 沙盒 /tmp 生命周期

AI 习惯在 /tmp 创建一次性脚本和备忘文件，但当前沙盒 /tmp 在下一命令前就消失。社区建议延长生命周期或提供持久化临时目录，以减少 AI 将临时文件写入工作区污染项目。


## 6. 开发者关注点

### 高频痛点

**1. Windows 平台问题密度最高**
本期 26 个 Issue 中有 8 个标注 `windows` 标签。典型代表：
- QQ 机器人频道连接失败（#7512）
- 会话恢复后编辑功能禁用（#7632）
- 桌面端空闲 CPU 功耗过高（#7619）
- 启动时 "already open" 误报（#7627）

说明 Windows 仍是稳定性短板最集中的平台，建议 Windows 用户关注 v1.20.0 的稳定性改进清单。

**2. 更新机制可靠性**
两个 Issue 直指更新器问题（#7630、#7646）：
- macOS 更新器 handoff 后卡死，finalization 永不完成并阻塞后续更新
- "prepare update: handoff backup path already exists" 错误导致更新失败

更新链路是用户最容易感知的"最后一公里"，反复失败会严重消耗信任。

**3. 请求体格式兼容性**
- #7626：opencode zen 网关报 "tools[N].function.name missing"（46 个校验错误）
- #7648：GLM 模型通过额外请求头接入报 "Malformed request (HTTP 400)"

自定义模型和第三方网关的请求体格式兼容存在问题，opencode 下相同配置正常，说明 Reasonix 在 OpenAI 兼容层上仍有格式漂移。

**4. 模式串扰**
- #7634：均衡模式仍会串到交付完整验证的模式

Agent 执行模式（均衡/交付完整验收）切换不严格，用户预期与实际行为不一致。

**5. 沙盒环境与文件操作**
- #7575：/tmp 生命周期过短，AI 写入的临时文件下一条命令就消失，导致 AI 绕道在工作区创建临时文件

### 社区整体情绪

- **积极面**：热门 Issue #7620 在 24 小时内就有对应修复 PR #7631；TUI Ctrl+D 问题提交当天即被关闭并有修复 PR #7638。说明项目组对社区反馈响应迅速，修复链路顺畅。
- **关注点**：MCP 兼容性、Windows 稳定性、更新器可靠性是当前三大痛点，且都有多日未闭合的 Issue，建议社区用户优先关注 v1.20.0 的"MiMo 与 DashScope Responses 修复"和"桌面稳定性改进"是否缓解相关问题。

---

*本报告由 AI 技术分析师根据 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-06

## 今日速览

昨日发布 **v1.18.14**，核心改进是简化 xAI 登录流程并增强错误恢复能力。社区方面，**#16017（Go 套餐用量 API）** 以 126 个 👍 成为最受关注的需求；同时 **macOS 26 上 Bash 工具因 Bun WASM 崩溃完全不可用（#40789）** 和 **/sessions 命令回归（#40759）** 是当前最严重的问题。

---

## 版本发布

### v1.18.14

**核心改进**
- 简化 xAI 登录为单一设备码流程，在无头/远程环境下更可靠

**Bug 修复**
- 保留流式传输中提供商的中间错误结构，支持兼容提供商重试失败响应
- 增加对更多瞬时提供商及网络错误的重试

👉 [查看 Release](https://github.com/anomalyco/opencode/releases/tag/v1.18.14)

---

## 社区热点 Issues（10 个）

### 1. #16017 — Go 套餐用量/余额 API 端点（🔥 126 👍）
作者 [@StephanMeijer](https://github.com/StephanMeijer) 建议为 Go 套餐订阅开放公共 API 端点，支持滚动/每周/每月时间窗口。目前数据仅能在 Dashboard 查看，无法被外部工具消费。

- [GitHub Issue #16017](https://github.com/anomalyco/opencode/issues/16017)

### 2. #40789 — macOS 26 上 Bash 工具完全损坏（Bun WASM 崩溃）
每个 Bash 调用都报 `H.loadWebAssemblyModule` 错误，TUI 和 headless 模式均受影响，连 `echo hello` 都会失败。环境为 macOS 26.6 (arm64)。

- [GitHub Issue #40789](https://github.com/anomalyco/opencode/issues/40789)

### 3. #40759 — /sessions 命令在 v1.18.14 后失效
升级后，通过 `/sessions` 切换会话会在输入新消息时清空聊天历史和上下文。会话选择器能列出旧会话，但选中后状态没有被正确加载。

- [GitHub Issue #40759](https://github.com/anomalyco/opencode/issues/40759)

### 4. #31932 — TUI 跨项目会话列表/选择器
内置 `/sessions` 命令仅限定当前项目，跨多个仓库工作时很不方便。该需求已有 14 条评论，与 #35581 互补（#35581 聚焦 TUI picker 交互模型）。

- [GitHub Issue #31932](https://github.com/anomalyco/opencode/issues/31932)

### 5. #40627 — 无法点击打开运行中的子代理
当子代理仍在执行时，点击其任务条目无法打开子代理视图，只能通过已完成的子代理 + 上/下导航键切换到达。影响调试效率。

- [GitHub Issue #40627](https://github.com/anomalyco/opencode/issues/40627)

### 6. #40786 — 桌面端会话列表无删除/归档入口
macOS 桌面版 (v1.18.14) 的 Home 页会话列表没有三点菜单、右键菜单或悬停按钮，用户无法管理历史会话。

- [GitHub Issue #40786](https://github.com/anomalyco/opencode/issues/40786)

### 7. #40782 — 增加计算机/浏览器自动化能力（类似 Codex）
社区希望内置控制桌面和浏览器的能力，目前需依赖外部工具。这是 AI 编程工具向 agentic automation 演进的重要方向。

- [GitHub Issue #40782](https://github.com/anomalyco/opencode/issues/40782)

### 8. #40779 — macOS 高内存使用问题
在 Apple Air M2 16GB 上出现多个进程占用大量内存（与 #9239 的单一进程问题不同，现在是分散在多个进程中）。附有截图证据。

- [GitHub Issue #40779](https://github.com/anomalyco/opencode/issues/40779)

### 9. #40778 — V2 忽略 Plan Mode
用户在 V2 版本使用 `/report` 时发现 Agent 绕过计划模式继续实现功能，且 UI 显示版本号为 1.17 与实际的 v2 不符。涉及模式约束可靠性。

- [GitHub Issue #40778](https://github.com/anomalyco/opencode/issues/40778)

### 10. #40767 — V2 MCP OAuth 每次登录注册新的动态客户端
每次登录远程 MCP 服务器都会注册全新的 OAuth 客户端，产生不同的 `client_id` 和完整授权页面，导致授权服务器累积大量无效客户端注册。

- [GitHub Issue #40767](https://github.com/anomalyco/opencode/issues/40767)

---

## 重要 PR 进展（10 个）

### 1. #40784 — [contributor] Hosted Workspace 执行（feature）
为 V2 引入 Hosted Workspace 执行模型：Workspace 是持久化的执行环境（有自己的根目录而非仓库），沙箱是其一种形式。基于现有 runner graph 构建。

- [GitHub PR #40784](https://github.com/anomalyco/opencode/pull/40784)

### 2. #35311 — 修复同仓库多克隆被识别为不同项目
一次关闭 15 个相关 Issue（#17940 #19348 #29869 #29871 等）。通过改进项目识别逻辑解决多克隆场景下的项目不一致问题。

- [GitHub PR #35311](https://github.com/anomalyco/opencode/pull/35311)

### 3. #40723 — [已合并] v1 数据迁移至 v2
添加 REST 触发的 V1 会话历史迁移，支持可恢复进度；导入旧版 V2 会话数据和 legacy JSON 凭据；更新 TUI 迁移流程。

- [GitHub PR #40723](https://github.com/anomalyco/opencode/pull/40723)

### 4. #40781 — [已合并] 从 UI 导出会话为 JSON
在会话三点菜单新增 "Export..." 选项，Context 页签新增导出按钮，同时加入 `/export` 命令面板操作。

- [GitHub PR #40781](https://github.com/anomalyco/opencode/pull/40781)

### 5. #27554 — 本地 LAN Provider 发现 + 模型自动发现
在 `/connect` 中添加 Local (LAN) 发现，支持 mDNS/HTTP 探测本地 OpenAI 兼容服务器并自动发现模型。关闭 #6231 和 #27553。

- [GitHub PR #27554](https://github.com/anomalyco/opencode/pull/27554)

### 6. #40772 — 缺失 auth method 时返回类型化错误而非崩溃
`ProviderAuth.authorize` 直接索引 hook 表未做保护，现在改为返回类型化错误。关闭 #40774。

- [GitHub PR #40772](https://github.com/anomalyco/opencode/pull/40772)

### 7. #40769 — 重新登录时复用已注册的 MCP 动态客户端
修复 V2 引擎中 MCP OAuth 每次登录重复注册动态客户端的问题。关闭 #40767。

- [GitHub PR #40769](https://github.com/anomalyco/opencode/pull/40769)

### 8. #40768 — 修复 MCP 跨进程 OAuth 刷新竞争
两个进程同时持有相同 refresh token 时，第一个刷新会轮换 token，第二个进程需要能够优雅地处理竞争。关闭 #34520。

- [GitHub PR #40768](https://github.com/anomalyco/opencode/pull/40768)

### 9. #40717 — 添加瑞典语社区翻译
新增瑞典语 README、术语表，并在语言列表中添加链接。关闭 #40785。

- [GitHub PR #40717](https://github.com/anomalyco/opencode/pull/40717)

### 10. #40590 — 安装脚本支持 GITHUB_TOKEN 认证
安装脚本目前对 GitHub API 做三次匿名请求，在受限网络环境下容易失败。此 PR 允许用户通过 `GITHUB_TOKEN` 环境变量绕过速率限制。

- [GitHub PR #40590](https://github.com/anomalyco/opencode/pull/40590)

---

## 功能需求趋势

### 🔥 会话管理增强
- 跨项目会话列表/选择器（#31932、#35581）
- 桌面端会话删除/归档入口（#40786）
- 会话导出为 JSON（已由 #40781 实现）
- `/sessions` 命令稳定性（#40759）

### 🔧 MCP 生态完善
- HTTP Streamable 传输支持（#8058，已关闭）
- OAuth 动态客户端复用（#40767、#40769）
- 跨进程 OAuth 刷新竞争（#40768）

### 🤖 新模型与 Provider 适配
- GPT-5.3 Codex thinking 内容显示（#12523，已关闭）
- Qwen 3.8 Max `max_tokens` 参数范围校验（#40770）
- DeepSeek V4 Flash Free `reasoning_effort` 行为异常（#40777）

### 🚀 Agentic 能力扩展
- 计算机/浏览器自动化（#40782）——社区希望获得类似 Codex 的完整 agent 能力
- Workspace 执行模型（#40784）——为远程/沙箱执行铺路

### 🌍 本地化与社区参与
- 瑞典语翻译（#40785 / #40717）——社区翻译体系持续扩展

---

## 开发者关注点

### 🚨 回归与稳定性（最多反馈）
- **Bash 工具在 macOS 26 上完全不可用**（#40789）——Bun WASM 崩溃，阻塞所有命令执行
- **/sessions 命令切换后丢上下文**（#40759）——v1.18.14 的回归
- 设置界面无法滚动导致无法更新（#40775）——笔记本上访问不到更新按钮

### 💾 性能与资源
- 高内存使用（#40779）——Apple Silicon 上多个进程占用资源
- 鼠标点击无响应（#40780）——可能与 TUI 渲染相关

### 🔐 OAuth 与认证
- MCP OAuth 动态客户端重复注册（#40767）
- 授权方法缺失时返回 500 而非类型化错误（#40774）
- macOS 26 环境下的 xAI 登录在 v1.18.14 已优化，但上游问题仍待观察

### 🧩 V2 迁移阵痛
- 计划模式被忽略（#40778）——模式约束语义未正确迁移
- 事件持久化行为变化导致测试失败（#40783，已修复）
- V1 → V2 数据迁移正在进行（#40723），预计仍会有兼容性问题浮出

---

> 数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode) | 日报生成时间：2026-08-06

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-06

## 今日速览

v0.21.6 正式版与 Desktop v0.1.0 双双落地：CLI 端新增 macOS Live Voice 原生语音能力，桌面版发布首个里程碑版本，但 Windows 端同步暴露出启动崩溃问题。社区安全方面，一个可绕过只读 shell 分类器执行任意命令的 P1 漏洞（#8582）获得高度关注；CI 侧 `/review` 自动审查超时问题（#8597）已确认成为拉低开发效率的主要瓶颈。

🔗 数据来源：[github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

## 版本发布

### v0.21.6 正式版
- ✨ **实验性 Live Voice 支持**：WebShell 在 macOS 上可通过全局快捷键进行实时语音交互（[#7859](https://github.com/QwenLM/qwen-code/pull/7859)）  
- 🔧 Web Shell 后台运行期间保持对话轮次展开

### desktop-v0.1.0（首个桌面版）
- 发布 Qwen Code Desktop 首个版本，包含 Web Shell 预选等基础修复

### v0.21.6-nightly.20260806.cb3dc107f
- 测试（core）：去抖动 glob external-path 测试，改用专用空目录而非 `/tmp`（[#8604](https://github.com/QwenLM/qwen-code/pull/8604)）

---

## 社区热点 Issues（10 个）

### 🔥 安全 · P1 — 只读 shell 分类器可被绕过执行任意代码（#8582）
- 作者：@yiliang114 | 评论 5 | [链接](https://github.com/QwenLM/qwen-code/issues/8582)
- **摘要**：只读 shell 分类器对「行延续符 + `${var@P}`」隐藏的命令替换存在自动放行漏洞，AST 分类器（`isShellCommandReadOnlyAST`）与运行时替换检测（`detectCommandSubstitution`）均被绕过，可导致任意代码执行。
- **为何重要**：这是当前最受关注的安全问题，直接影响沙箱/只读环境的命令拦截可信度，建议优先处理。

### 🔥 平台 · P1 — Desktop 0.1.0 Windows 启动崩溃：EISDIR lstat 'C:'（#8615）
- 作者：@orangewk | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/8615)
- **摘要**：Windows 11 上安装 Desktop v0.1.0 后打开任意工作区，应用崩溃，报错 `EISDIR lstat 'C:'`，与内置 Node.js v22.20.0 运行时路径解析有关。
- **为何重要**：首个桌面版本即面临平台级稳定性缺陷，Windows 用户无法正常使用核心工作区功能。

### 🔥 CI · P1 — `/review` reverse-audit fan-out 静默挂起直至超时（#8597）
- 作者：@wenshao | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/8597)
- **摘要**：GitHub 触发的 `/review` 运行大量超时（8月4日 12 次，8月5日截至 14:50 再添 9 次，多数耗尽 360 分钟预算）。分析最近 5 次超时日志，4/5 归因于 reverse-audit fan-out 启动阶段的静默挂起。
- **为何重要**：自动审查是项目核心协作流程，高频率超时直接拖慢整体 CI 效率。

### ⚠️ UI · P2 — TUI 在 tmux < 3.5 下持续闪烁（#8580）
- 作者：@jackichen | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/8580)
- **摘要**：tmux 3.4 环境中每次溢出帧都会触发全屏清空+重绘，每秒闪烁 2–3 次。根因是 Ink 渲染器的 overflow 处理与未查询的 DEC 2026 防护组合所致。
- **为何重要**：tmux 是 CLI 用户高频使用场景，直接影响流式输出和 spinner 期间的交互体验。

### ⚠️ 核心 · P2 — Anthropic 模型 ID 解析拒绝 dotted-minor 别名且缺 Opus 5 Token 限制（#8584）
- 作者：@netbrah | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/8584)
- **摘要**：`claude-opus-4.8` 这类带点号次版本号的模型别名无法正确解析，且缺失 Opus 5 的 token 上限配置，代理部署场景下兼容性受限。
- **为何重要**：代理部署用户接入 Anthropic 新模型时，配置无法正常工作。

### ⚠️ UI · P2 — 桌面版：设置中切换界面语言无效（#8592）
- 作者：@pomelo-nwu | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/8592)
- **摘要**：桌面版 Settings → Appearance 切换语言（如简体中文）后，界面完全无变化，仍保持英文。
- **为何重要**：桌面版发布初期国际化能力便失效，影响非英语用户采用。

### ⚠️ 工具 · P2 — VSCode 插件文件链接始终解析到 `<workspace-root>/<basename>`（#8606）
- 作者：@JonathanOrr | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/8606)
- **摘要**：模型执行 `edit_file`/`write_file` 后产生的链接，对于任何嵌套文件一律报「file not found —— 链接错误地指向工作区根目录+文件名，忽略了相对路径。
- **为何重要**：VSCode 插件用户无法从消息中的链接快速跳转到实际编辑的文件。

### ⚠️ UI · P3 — 终端窗口缩小导致滚动区重复输出（#8557）
- 作者：@pomelo-nwu | 评论 5 | [链接](https://github.com/QwenLM/qwen-code/issues/8557)
- **摘要**：macOS + Warp 下缩小终端窗口宽度后，已打印的 transcript 内容被重复输出到滚动区，同一内容多次堆叠。
- **为何重要**：属于高频操作触发的显示一致性缺陷，用户困惑度高。

### ⚠️ UI · P2 — 桌面版 Markdown 链接点击无响应（#8593）
- 作者：@pomelo-nwu | 评论 4 | [链接](https://github.com/QwenLM/qwen-code/issues/8593)
- **摘要**：桌面版中 AI 回复的 Markdown 链接有样式（强调色/下划线/手型光标），但点击后无任何反应——不打开浏览器、不报错。
- **为何重要**：核心交互缺失，用户无法通过链接跳转，桌面版信息获取能力受限。

### ⚠️ UI · P3 — VSCode 插件选择框遮挡内容（#8617）
- 作者：@SoulForest | 评论 2 | [链接](https://github.com/QwenLM/qwen-code/issues/8617)
- **摘要**：VSCode 插件的选择框会遮挡 AI 输出内容，用户不得不退出或直接盲选，体验受阻。（附截图）
- **为何重要**：选择框遮挡高频阻挡阅读流程，影响 VSCode 插件日常操作体验。

---

## 重要 PR 进展（10 个）

### [autofix/takeover] feat(review)：bundle 比审查代码旧时显式提示（#8390）
- 作者：@wenshao | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8390)
- **内容**：构建时在 bundle 中写入源码摘要；运行时比对树摘要，若审查所用 bundle 非当前工作树源码构建，则提前显式告知。提升 `/review` 结果可信度。

### [autofix/takeover] fix(cli)：零高度虚拟视口条目上报，折叠思考块释放空间（#8570）
- 作者：@chiga0 | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8570)
- **内容**：虚拟视口（VP）模式中，即使条目测量高度收缩为 0 也需上报，使折叠的思考块立即释放垂直空间，滚动行为恢复正常。

### [autofix/takeover] feat(voice)：支持可信私有 ASR Base URL（#8350）
- 作者：@rockybot2026 | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8350)
- **内容**：新增 `security.allowedInsecureVoiceBaseUrls`，默认空白的精确白名单，允许私有部署将语音转录路由到 HTTP/内网 ASR 网关，默认仍拒绝不安全地址。

### [autofix/takeover] ci(autofix)：重型 autofix 任务迁移至 ECS 自托管池（#8603）
- 作者：@wenshao | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8603)
- **内容**：将 issue 修复 agent、review CLI bundle 构建、review-feedback 地址 agent 三个重负载 job 从 GitHub-hosted 迁移到持久自托管 ECS 池，减少 CI 排队。

### [autofix/takeover] feat(channels)：支持群组配对（#8440）
- 作者：@qqqys | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8440)
- **内容**：新增 `pairing` 作为 `groupPolicy` 值，群聊按稳定 chat ID 审批一次后全体成员可用，审批记录保留发起者上下文并独立存储。

### [autofix/takeover] fix(channels)：管理钉钉交互卡片配置（#8517）
- 作者：@BenGuanRan | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8517)
- **内容**：将钉钉 `interactiveCards` 暴露为可管理的嵌套对象，持久化前校验嵌套布尔/对象/超时值，同步 TypeScript SDK 描述契约，Web Shell 保留对象值。

### [autofix/takeover] feat(workflows)：协作暂停与恢复（#8320）
- 作者：@qqqys | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8320)
- **内容**：为动态工作流加入全运行期协作暂停/恢复——pause-aware 调度器停止派发新 agent、等待未完成任务收敛、结果暂存至门控，恢复后继续。

### [autofix/takeover] feat(cli)：附件音频桥（#8332）
- 作者：@DragonnZhang | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8332)
- **内容**：当主模型不支持音频时，通过配置的批量语音模型转写交互式/无头 `@` 附件与 ACP 音频提示，并替换为显式标记不可信的转写文本。

### [autofix/takeover] fix(cli)：退出时在主动屏输出 resume 命令（#8455）
- 作者：@chiga0 | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8455)
- **内容**：VP 模式下退出提示画在交替缓冲上，退出即丢弃，用户根本看不到「恢复会话」提示。本 PR 将 resume 命令回显到主屏幕，保证退出后仍可见。

### fix(core)：信号终止的 shell 命令报告为错误（#8501）
- 作者：@daleselaji-dev | 更新：08-06 | [链接](https://github.com/QwenLM/qwen-code/pull/8501)
- **内容**：信号终止的前台 shell 命令目前可能被解析为 `{ exitCode: null, signal: 15, aborted: false }`，结果格式化器处理有误。修复后正确归类为工具错误，同时保留正常 PTY 退出与用户取消语义。

---

## 功能需求趋势

从近期 Issue 与 PR 中，社区关注的功能方向可归纳为五条主线：

1. **安全加固**：只读 shell 分类器绕过（#8582）、私有 ASR 白名单（#8350）、凭证清洗（#8408）——安全是当前最集中的精力投入方向，尤其是命令执行边界与语音数据链路。
2. **桌面版成熟化**：Desktop v0.1.0 首版即面临 Windows 崩溃（#8615）、语言切换失效（#8592）、Markdown 链接不可点（#8593）等问题，桌面端从「可用」到「好用」还有一段路要走。
3. **终端/TUI 稳定性**：tmux 闪烁（#8580）、WSL/ConPTY 重复输出（#7897）、窗口缩放滚动区错乱（#8557）、ESC 取消行为（#8353）——终端体验打磨仍是高频诉求。
4. **CI/自动化效率**：`/review` 超时（#8597）、autofix 迁移自托管（#8603）、bundle 版本可追溯（#8390）、Maven 多模块验证（#8394）——社区在持续投资审查管线的可靠性和速度。
5. **集成生态扩展**：钉钉交互卡片（#8517）、群组配对（#8440）、Anthropic 新模型兼容（#8584）、VSCode 文件链接（#8606）——多平台消息渠道与模型兼容性成为扩展重点。

## 开发者关注点

- **「审查超时」成最大效率痛点**：`/review` 高频超时（多数烧满 360 分钟）已被确认为系统性 CI 问题，开发者对自动化流程的可靠性提出强烈质疑。
- **安全边界不容乐观**：只读 shell 分类器被绕过并非孤例——具备代码执行能力的逃逸路径说明「只读」保证需要更底层（如 seccomp/容器）的兜底，而非仅靠 AST 检测。
- **桌面版首秀表现影响信心**：Windows 崩溃、语言切换无效、链接不可点等问题集中于首个桌面版本，用户对桌面端的稳定性预期尚未被满足。
- **终端体验细节决定口碑**：tmux/WSL/ConPTY 等场景的渲染问题持续消耗用户耐心，且这类问题通常难以靠用户侧 workaround 规避。
- **模型与平台兼容性需求上升**：代理部署场景下 Anthropic dotted-minor 别名解析失败、token 限制缺失，说明用户对「长尾模型/自建网关」的适配需求不容忽视。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

## 今日速览

今日 Hermes 无新版本发布。社区焦点集中在两件事：一是 0.20.0 桌面端回归（#79407，P1，底部操作面板整体缺失）引发用户强烈关注；二是 Docker 后端一系列行为不一致 Bug（#79816、#79817、#79818）由同一开发者集中反馈，其中容器复用配置冲突的修复 PR #79832 已提交。此外，桌面端 UI 问题（内联嵌入卡死、侧边栏图标缺失）与微信网关消息时序问题也值得留意。

## 社区热点 Issues

### 1. [P1] 0.20.0 回归：桌面底部操作面板完全缺失
**#79407** | @LAN-TINA-WS | 评论 2
升级 0.20.0 后，桌面应用底部操作面板整体消失，命令中心、网关控制、子代理状态等全部不可用，应用沦为"仅查看外壳"。这是今日唯一一个 P1 Issue，影响所有 Windows 桌面用户。
https://github.com/NousResearch/hermes-agent/issues/79407

### 2. [P2] 微信平台 /approve 文本回退首次批准后静默失效
**#79562** | @CN-42 | 评论 3
在微信/iLink Bot 适配器上，纯文本 `approve` / `approve session` 每轮只能生效一次，后续审批被当作普通消息送入 Agent。涉及时序竞争，存在安全操作被忽略的风险。
https://github.com/NousResearch/hermes-agent/issues/79562

### 3. [P2] 跨进程容器复用忽略镜像与挂载配置
**#79816** | @bob24sg | 评论 1
不同 `HERMES_HOME` profile 只要标签相同，就会错误复用同一个 Docker 容器，即使 `docker_image` 和 `docker_volumes` 完全不同也不会告警，可能造成文件系统状态错乱。
https://github.com/NousResearch/hermes-agent/issues/79816

### 4. [P2] API 服务器将虚拟模型别名固化为真实模型
**#79101** | @blazzbyte | 评论 2
通过 `POST /api/sessions` 创建会话时，若不显式指定模型，API 会持久化 `"hermes-agent"` 虚拟别名，后续 chat 调用将别名当作真实模型 ID 传给 Agent，破坏网关默认模型解析逻辑。
https://github.com/NousResearch/hermes-agent/issues/79101

### 5. [P2] Docker 后端下文件工具解析到宿主机
**#79817** | @bob24sg | 评论 1
使用 `terminal.backend: docker` 时，`read_file` / `search_files` 在容器环境实例化前始终解析宿主机路径，容器内实际存在的文件被误报为 "File not found"。
https://github.com/NousResearch/hermes-agent/issues/79817

### 6. [P2] 持久化工具输出无法用 read_file 分页读取
**#79818** | @bob24sg | 评论 0
工具结果写入 spill 文件时是单行转义 JSON，但提示模型用 `read_file` 的 `offset` / `limit` 分页读取——二者完全不兼容，大文件处理路径不可用。
https://github.com/NousResearch/hermes-agent/issues/79818

### 7. [Bug] 桌面消息侧边栏缺少 raft 等平台图标和会话入口
**#79836** | @Vocllum | 评论 0
即使 raft 等平台已在网关中启用并连接，其会话也不会出现在桌面消息侧边栏中。多个带网关适配器的平台受影响。
https://github.com/NousResearch/hermes-agent/issues/79836

### 8. [Bug] 内联嵌入卡片（X/Twitter）卡在 UI 上无法消除
**#79833** | @nscor56 | 评论 0
某个会话中自动加载的 X/Twitter 卡片在切换到其他会话后仍浮在界面上，聊天、工件、设置等视图都被覆盖。
https://github.com/NousResearch/hermes-agent/issues/79833

### 9. [Feature] 助手消息中的预览链接应路由到文件标签页
**#41736** | @iizus | 评论 3
目前只有 `file-browser` 和手动打开的文件走标签页路由，助手消息中显式链接（`[Preview: foo.md]`）开的预览不会新建标签页，交互不一致。
https://github.com/NousResearch/hermes-agent/issues/41736

### 10. [Feature] 预览面板支持弹出为独立窗口
**#71985** | @mr-NFA | 评论 1
预览面板嵌在右侧栏内，隐藏侧栏会同时隐藏预览。用户期望能弹出为独立窗口，保持网页预览/开发服务器/Agent 浏览器预览可见。
https://github.com/NousResearch/hermes-agent/issues/71985

## 重要 PR 进展

### 1. fix(tools): 将 Docker 复用限定到不可变配置
**#79832** | @ahamSel
修复跨进程容器复用仅匹配标签、忽略 image/mount 配置的问题。这是对 #79816 的直接修复，将复用范围限定到不可变配置。
https://github.com/NousResearch/hermes-agent/pull/79832

### 2. Fix: 回退激活时保留 anthropic_messages api_mode
**#79787** | @sjungwon03
启用回退 provider 时，`api_mode='anthropic_messages'` 的 URL 被错误地从 `/apps/anthropic` 重写为 `/apps/v1`，导致 404。PR 修复了 `try_activate_fallback()` 未传递 api_mode 的问题。
https://github.com/NousResearch/hermes-agent/pull/79787

### 3. fix(agent): 停止对确定性空响应重复计费（NS-503）
**#75115** | @shannonsands
此前空响应恢复路径最多重试 3 次并走完整回退链，且每次重试都按全价重新发送完整上下文，用户曾被扣 $2.33 却未得到任何回答。PR 阻止了对确定性空响应的重复计费。
https://github.com/NousResearch/hermes-agent/pull/75115

### 4. fix(async-delegation): 限制未送达完成的回放窗口
**#79829** | @ruochu88s
修复委托结果每次重启后反复出现的问题。`restore_undelivered_completions()` 把每个 `pending` 状态的行在进程启动时全部重新入队，PR 为重放窗口加上边界。
https://github.com/NousResearch/hermes-agent/pull/79829

### 5. feat(compression): 新增 proactive_prune_ratio 窗口比例触发器
**#79831** | @andrei-kiparuk
现有的工具结果主动修剪只有绝对 token 数触发器，运维很难预估合适的值。新 PR 增加 `compression.proactive_prune_ratio`，按上下文窗口比例触发，降低配置成本。
https://github.com/NousResearch/hermes-agent/pull/79831

### 6. fix: heredoc 正文化触发网关生命周期守卫误报
**#79835** | @portlandAF
`_iter_command_segments()` 使用 `shlex` 做 shell 分词，但 `shlex` 不理解 heredoc 语法，导致 heredoc 正文被误判为引用的脚本。PR 修复了该误报。
https://github.com/NousResearch/hermes-agent/pull/79835

### 7. fix(desktop): 上报激活结果，让被抑制的重复启动可见
**#79828** | @ruochu88s
首次启动慢时点击桌面图标无任何反馈，用户会反复点击导致多个后端在同一端口竞争。PR 让激活结果可见，抑制多余的重复启动。
https://github.com/NousResearch/hermes-agent/pull/79828

### 8. fix(plugins): 在发现阶段注册延迟的平台客户端工具
**#78842** | @thelonewander3r | needs-decision
修复 #78050：5 个 A2A 客户端工具（`a2a_call`、`a2a_discover` 等）在 CLI/TUI 中完全不可见，CLI 会话的工具集中缺失这些工具，而桌面端正常。
https://github.com/NousResearch/hermes-agent/pull/78842

### 9. fix(gateway): 支持堆叠技能命令
**#74876** | @lifeFedorovAlexey
让网关的 `command.dispatch` 路径识别堆叠的多个前导技能命令，复用 CLI 已有的 `split_stacked_skill_commands` 辅助函数，同时保留原有单技能分发路径。
https://github.com/NousResearch/hermes-agent/pull/74876

### 10. fix(bluebubbles): webhook 改用 127.0.0.1 并迁移过期 localhost 注册
**#69593** | @fluxkapacitor
修复 BlueBubbles 在 macOS 上入站 webhook 静默失败的问题。适配器注册的是 `http://localhost:<port>`，但 aiohttp 监听的是 IPv4 `127.0.0.1`，两者不同。PR 同时迁移历史遗留的 `localhost` 注册。
https://github.com/NousResearch/hermes-agent/pull/69593

## 功能需求趋势

从今日 Issues 中可以提炼出以下社区重点关注方向：

- **桌面端 UI/UX 增强**：多个需求集中在预览体验上——预览链接路由到文件标签页（#41736）、弹出独立预览窗口（#71985）、消息气泡颜色独立配置（#79822）。说明桌面端已进入精细化打磨阶段。
- **Docker 后端语义一致性**：#79816、#79817、#79818 分别暴露了容器复用、文件路径解析、工具输出格式三方面的不一致，是使用 Docker 后端的开发者最集中的痛点。
- **消息网关可靠性**：#79562 微信审批时序竞争、#79033 被拒 MEDIA 路径对模型不可见、#79829 异步委托重放——消息投递的端到端可观测性是高频话题。
- **Windows 平台支持**：#79407（P1 回归）与 #79827（cron 无窗口生成）说明 Windows 用户的体验问题正在形成合集。
- **成本控制**：#75115 停止对空响应重复计费呼应了社区对 usage/cost 的敏感度，配合 #79831 的压缩触发新机制，成本治理是持续热点。
- **新模型能力接入**：#79820 DeepSeek 原生 `web_search` 已出现重复 Issue，说明社区对模型服务端工具（如 RAG、Web Search）的接入需求上升。

## 开发者关注点

- **0.20.0 回归阻断升级**：底部面板整体缺失是 P1 问题，已影响实际使用，需要尽快给出修复版本。
- **Docker 后端"假文件不存在"**：文件工具在容器环境实例化前解析到宿主机，导致排查问题时极易误判，建议在文档中明确该时序行为。
- **容器复用缺乏警告**：多个 profile 配置不同却静默共享同一容器，存在生产环境数据错乱的风险，期望至少在差异时明确告警。
- **工具输出分页不可用**：持久化 JSON 单行格式与 `read_file` 分页语义不兼容，大文件工具输出成了"只能看不能翻"的鸡肋。
- **模型别名持久化污染**：API 创建的 session 固化了虚拟别名，绕过了网关模型解析，属于隐蔽的配置污染问题。
- **微信审批时序竞争**：/approve 首次生效后失效，对依赖文本审批的危险命令操作存在安全隐患，建议优先修复。

</details>

</div>
